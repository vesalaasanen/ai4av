---
spec_id: admin/sony-kea89-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KEA89 Series BRAVIA Control Spec"
manufacturer: Sony
model_family: "KEA89 series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KEA89 series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-05-27T09:15:13.977Z
last_checked_at: 2026-05-31T22:41:23.905Z
generated_at: 2026-05-31T22:41:23.905Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source describes Simple IP Control for BRAVIA Professional Displays generally, not the KEA89 model specifically. Spec is family-level until per-model confirmation. EU-area models have 3 RED-DA specification tiers; available commands differ per tier."
  - "max volume value not stated"
  - "source does not describe multi-step sequences."
  - "no safety warnings or interlock procedures in source."
  - "- Source does not name the KEA89 model family explicitly; spec is family-level for BRAVIA Pro Displays until per-model confirmation."
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:23.905Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched to source FourCC codes; transport port 20060 verified; one-to-one coverage of complete command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KEA89 Series BRAVIA Control Spec

## Summary
The Sony KEA89 series is a line of BRAVIA Professional Displays. This spec covers Sony's "Simple IP Control" protocol (SSIP), a proprietary TCP-based control interface intended for developers integrating with CIS and commercial AV control systems. Every command and response is a fixed 24-byte ASCII frame.

<!-- UNRESOLVED: source describes Simple IP Control for BRAVIA Professional Displays generally, not the KEA89 model specifically. Spec is family-level until per-model confirmation. EU-area models have 3 RED-DA specification tiers; available commands differ per tier. -->

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
powerable: true   # setPowerStatus / getPowerStatus / togglePowerStatus / firePowerChange
levelable: true   # setAudioVolume / getAudioVolume / fireVolumeChange
queryable: true   # get* commands
routable: true    # setInput / getInput / fireInputChange (HDMI, Composite, Component, Screen Mirroring)
```

## Actions
```yaml
# Every message is a 24-byte ASCII frame:
#   byte[0-1]  header  "*S"            (0x2A 0x53, fixed)
#   byte[2]    type    "C" "E" "A" "N" (Control / Enquiry / Answer / Notify)
#   byte[3-6]  FourCC  e.g. "POWR"
#   byte[7-22] params  16 bytes; numeric params pad with "0", strings pad with "#"
#   byte[23]   footer  "\n"            (0x0A, fixed)
# The command strings below are the literal 24-byte payload (header + body + footer).

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ircc_param}\n"
  params:
    - name: ircc_param
      type: string
      description: 16 ASCII decimal digits (left-padded with "0"); see IR Commands table for code values.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}\n"
  params:
    - name: state
      type: string
      enum: ["0", "1"]
      description: 0 = Standby (Off), 1 = Active (On). Sits in the last parameter byte.

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}\n"
  params:
    - name: volume
      type: string
      description: Volume as 16 ASCII decimal digits, left-padded with "0" (e.g. 29 -> "0000000000000029"). Maximum value not stated in source.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}\n"
  params:
    - name: state
      type: string
      enum: ["0", "1"]
      description: 0 = Unmute, 1 = Mute. Sits in the last parameter byte.

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000{type}0000{input_number}\n"
  params:
    - name: type
      type: string
      enum: ["1", "3", "4", "5"]
      description: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring (per source). Single ASCII digit.
    - name: input_number
      type: string
      description: 4 ASCII decimal digits, left-padded with "0"; source range 1-9999.

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}\n"
  params:
    - name: state
      type: string
      enum: ["0", "1"]
      description: 0 = Disabled (picture mute off), 1 = Enabled (screen black). Sits in the last parameter byte.

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded}\n"
  params:
    - name: scene_padded
      type: string
      description: 16-byte case-sensitive string right-padded with "#". Allowed values: "auto", "auto24pSync", "general" (e.g. "auto24pSync#####").

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"

- id: get_broadcast_address
  label: Get Broadcast Address (eth0)
  kind: query
  command: "*SEBADREth0############\n"
  notes: 'eth0' literal ASCII then 12 '#' padding bytes. EU-area models only (per source footnote).

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*SEMADREth0############\n"
  notes: 'eth0' literal ASCII then 12 '#' padding bytes. EU-area models only (per source footnote).
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  notes: From getPowerStatus answer (0 = Standby, 1 = Active) or firePowerChange notification.

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  notes: From getAudioMute answer (0 = Not Muted, 1 = Muted) or fireMuteChange.

- id: picture_mute
  type: enum
  values: [off, on]
  notes: From getPictureMute answer (0 = Disabled, 1 = Enabled).

- id: current_input
  type: object
  description: |
    Composite of (type, number) from getInput / fireInputChange.
    type: hdmi (1) | composite (3) | component (4) | screen_mirroring (5)
    number: 1-9999

- id: scene_setting
  type: enum
  values: [auto, auto24pSync, general]
  notes: From getSceneSetting answer; strings are case-sensitive.

- id: broadcast_address
  type: string
  description: IPv4 broadcast address (e.g. "192.168.0.14") from getBroadcastAddress answer. EU models only.

- id: mac_address
  type: string
  description: MAC address from getMacAddress answer. EU models only.

- id: volume
  type: integer
  description: Audio volume. Minimum 0; maximum not stated in source (example given: 29).  # UNRESOLVED: max volume value not stated
```

## Variables
```yaml
- id: volume
  type: integer
  description: Audio volume. Minimum 0; maximum not stated in source.  # UNRESOLVED: max volume value not stated
  set_action: set_audio_volume
  get_action: get_audio_volume
```

## Events
```yaml
- id: fire_power_change
  type: notification
  fourcc: POWR
  description: "Sent by monitor on power state change. Param last byte: 0 = powering off, 1 = powering on."

- id: fire_input_change
  type: notification
  fourcc: INPT
  description: "Sent by monitor on input change. Param format mirrors getInput (type marker + 4-digit number)."

- id: fire_volume_change
  type: notification
  fourcc: VOLU
  description: "Sent by monitor on volume change. Param is the new volume value (16 ASCII decimal digits)."

- id: fire_mute_change
  type: notification
  fourcc: AMUT
  description: "Sent by monitor on audio mute change. Param last byte: 0 = unmuting, 1 = muting."

- id: fire_picture_mute_change
  type: notification
  fourcc: PMUT
  description: "Sent by monitor on picture mute change. Param last byte: 0 = enabling, 1 = disabling."
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Every frame is 24 ASCII bytes: `*S` header + msg type + FourCC + 16-byte params + `\n` footer. Header and footer are fixed; only msg type, FourCC, and 16-byte param field vary.
- Parameter padding: numeric params right-pad (or, for `setAudioVolume`, left-pad) with ASCII `0`; string params right-pad with `#` (0x23). Enquiry (`E`) commands use `#` padding throughout the param area since they carry no value.
- Message types: `C` (Control) client→monitor, `E` (Enquiry) client→monitor, `A` (Answer) monitor→client, `N` (Notify) monitor→client for unsolicited state changes.
- The `setIrccCode` command forwards consumer remote-control key codes (HDMI 1-4, Volume Up/Down, Mute, Channel Up/Down, Play/Pause/Stop, etc.). The source enumerates 30+ IR codes by 16-digit param value.
- `getBroadcastAddress` and `getMacAddress` are marked EU-models-only in the source. EU-area models have 3 RED-DA specification tiers; available commands differ per tier (see https://pro-bravia.sony.net/setup/device-settings/red-da/).
- The toggle variants use distinct FourCCs: `TPOW` (toggle power) and `TPMU` (toggle picture mute), not the base `POWR`/`PMUT` mnemonics with no params.

<!-- UNRESOLVED:
- Source does not name the KEA89 model family explicitly; spec is family-level for BRAVIA Pro Displays until per-model confirmation.
- Maximum volume value not stated (source example: 29).
- Firmware version compatibility not stated in source.
- No safety warnings or interlock procedures in source.
- No multi-step macros described in source.
- EU RED-DA tier command-availability matrix not in source.
-->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-05-27T09:15:13.977Z
last_checked_at: 2026-05-31T22:41:23.905Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:23.905Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched to source FourCC codes; transport port 20060 verified; one-to-one coverage of complete command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source describes Simple IP Control for BRAVIA Professional Displays generally, not the KEA89 model specifically. Spec is family-level until per-model confirmation. EU-area models have 3 RED-DA specification tiers; available commands differ per tier."
- "max volume value not stated"
- "source does not describe multi-step sequences."
- "no safety warnings or interlock procedures in source."
- "- Source does not name the KEA89 model family explicitly; spec is family-level for BRAVIA Pro Displays until per-model confirmation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
