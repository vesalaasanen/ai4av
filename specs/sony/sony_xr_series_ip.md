---
spec_id: admin/sony-xr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XR Series Simple IP Control Spec"
manufacturer: Sony
model_family: "Sony XR Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.982Z
generated_at: 2026-05-14T18:17:20.982Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated; EU models have 3 RED-DA specifications with differing settings and command availability, source does not enumerate which commands are restricted"
  - "no settable parameter pool documented beyond the discrete Actions above; remove this section if not applicable"
  - "source documents no multi-step sequences; remove section if not applicable"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "source provides no timing/latency guidance, no keepalive/heartbeat info, and no defined behavior on connection drop. Protocol is documented as plaintext TCP with no encryption, no auth, and no firmware version dependency table."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:20.982Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 17 spec actions matched literal FourCC codes in source command table with correct parameter shapes and encoding; transport port verified; no undocumented commands in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony XR Series Simple IP Control Spec

## Summary
Sony XR Series display monitors expose a 24-byte fixed-size ASCII TCP control protocol ("Simple IP control") on TCP port 20060 for network control of power, input selection, volume, mute, picture mute, and scene setting. The protocol uses Four-CC commands and supports control, enquiry, answer, and notify message types.

<!-- UNRESOLVED: firmware version compatibility not stated; EU models have 3 RED-DA specifications with differing settings and command availability, source does not enumerate which commands are restricted -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}\n"  # state: 16 ASCII zeros + 0 (standby/off) or 1 (active/on); e.g. "*SCPOWR0000000000000000\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded}\n"  # volume as 16 ASCII digit chars, zero-padded on left, e.g. 41 = "0000000000000029"
  params:
    - name: volume
      type: integer
      description: "Volume value (decimal), right-aligned in 16-char field with '0' padding"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}\n"  # state: 15 ASCII zeros + 0 (unmute) or 1 (mute)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000{kind}0000{input}\n"  # kind: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; input: 4-digit zero-padded 1-9999
  params:
    - name: kind
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: input
      type: integer
      description: "Input number 1-9999, zero-padded to 4 digits"

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}\n"  # state: 15 ASCII zeros + 0 (disable) or 1 (enable)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Disabled (picture on), 1 = Enabled (screen black)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value_padded_hash}\n"  # value: 16 chars, "auto", "auto24pSync", "general" right-padded with "#", case-sensitive
  params:
    - name: value
      type: string
      enum: [auto, auto24pSync, general]
      description: "Scene name right-padded to 16 chars with '#'; e.g. 'auto24pSync#####'"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADREth0############\n"  # interface name "eth0" right-padded with "#" to 16 chars; EU models only
  params:
    - name: interface
      type: string
      description: "Interface name (e.g. 'eth0'), right-padded with '#' to 16 chars"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADREth0############\n"  # EU models only
  params:
    - name: interface
      type: string
      description: "Interface name (e.g. 'eth0'), right-padded with '#' to 16 chars"

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ir_code_padded}\n"  # 16 ASCII digit chars (or value from IR Commands table), right-padded with 0s
  params:
    - name: code
      type: integer
      description: "IR code value (e.g. 5=Display, 6=Home, 30=Volume Up, 98=TV Power); see IR Commands table"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: "Returned in getPowerStatus answer; 0=Standby, 1=Active"

- id: audio_volume
  type: integer
  description: "Volume value returned in getAudioVolume answer (16 ASCII digit chars, decimal)"

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "0=Not Muted, 1=Muted"

- id: current_input
  type: object
  description: "Current input returned by getInput; kind (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) and 4-digit input number 1-9999"

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "0=Disabled, 1=Enabled"

- id: scene_setting
  type: string
  description: "Current scene name returned by getSceneSetting (e.g. 'auto', 'auto24pSync', 'general')"

- id: broadcast_address
  type: string
  description: "IPv4 broadcast address of named interface, returned by getBroadcastAddress; e.g. '192.168.0.14'"

- id: mac_address
  type: string
  description: "MAC address of named interface, returned by getMacAddress; right-padded with '#'"
```

## Variables
```yaml
# UNRESOLVED: no settable parameter pool documented beyond the discrete Actions above; remove this section if not applicable
```

## Events
```yaml
- id: fire_power_change
  source: monitor
  message_type: N
  command: "*SNPOWR{state}\n"
  description: "Sent on power change; state 0=powering off, 1=powering on"

- id: fire_input_change
  source: monitor
  message_type: N
  command: "*SNINPT{kind_padded}{input}\n"
  description: "Sent on input change; 16-byte param = 7 zeros + kind (1/3/4/5) + 4 zeros + 4-digit input number"

- id: fire_volume_change
  source: monitor
  message_type: N
  command: "*SNVOLU{volume_padded}\n"
  description: "Sent on volume change; 16 ASCII digit chars (decimal)"

- id: fire_mute_change
  source: monitor
  message_type: N
  command: "*SNAMUT{state}\n"
  description: "Sent on mute change; state 0=unmuting, 1=muting"

- id: fire_picture_mute_change
  source: monitor
  message_type: N
  command: "*SNPMUT{state}\n"
  description: "Sent on picture mute change; state 0=enabled, 1=disabled (note: source labels appear inverted from the control direction - confirm on hardware)"
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences; remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Source documents an explicit 24-byte message frame: header `*S` (0x2A 0x53), type byte (`C`=Control, `E`=Enquiry, `A`=Answer, `N`=Notify), Four-CC command, 16-byte ASCII parameter field, footer `\n` (0x0A). The header/footer are fixed and the parameter field is always 16 bytes (digit `0`, `#`, or `.` for IP addresses) regardless of whether the field is fully used. Answer messages for success fill the 16-byte param with ASCII `0`; error answers fill it with ASCII `F`. Not-Found answer uses ASCII `N` padding.

Source example for power off: client sends `*SCPOWR0000000000000000` (then `\n`), monitor replies `*SAPOWR0000000000000000\n` (accept) and `*SNPOWR0000000000000000\n` (notify of current OFF state). The "\n" in the example is the 24th byte (footer) and is not visible in the literal text but is part of every frame.

EU area models have 3 RED-DA specification variants; settings and available commands differ per variant. `getBroadcastAddress` and `getMacAddress` are flagged with an asterisk indicating EU-only availability.

Required monitor settings: Settings → Network & Internet → Remote device settings → Control remotely (enable); Settings → Network & Internet → Home network → IP control → Simple IP control (enable). Both wired and wireless LANs supported; computer and monitor must be on the same network.

Source includes an extensive IR command table (Display, Home, Options, Return, Up/Down/Left/Right, Confirm, Red/Green/Yellow/Blue, Num0-9, Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, Forward, Play, Rewind, Prev, Stop, Next, Pause, Flash Plus/Minus, TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help) — each maps to a numeric code in the `setIrccCode` parameter field.

<!-- UNRESOLVED: source provides no timing/latency guidance, no keepalive/heartbeat info, and no defined behavior on connection drop. Protocol is documented as plaintext TCP with no encryption, no auth, and no firmware version dependency table. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-14T18:17:20.982Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:20.982Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 17 spec actions matched literal FourCC codes in source command table with correct parameter shapes and encoding; transport port verified; no undocumented commands in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated; EU models have 3 RED-DA specifications with differing settings and command availability, source does not enumerate which commands are restricted"
- "no settable parameter pool documented beyond the discrete Actions above; remove this section if not applicable"
- "source documents no multi-step sequences; remove section if not applicable"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "source provides no timing/latency guidance, no keepalive/heartbeat info, and no defined behavior on connection drop. Protocol is documented as plaintext TCP with no encryption, no auth, and no firmware version dependency table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
