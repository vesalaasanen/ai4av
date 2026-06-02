---
spec_id: admin/sony-kdxh8096-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KD-XH8096 Series BRAVIA Control Spec"
manufacturer: Sony
model_family: "KD-XH8096 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KD-XH8096 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
retrieved_at: 2026-05-27T08:23:51.823Z
last_checked_at: 2026-06-02T07:36:15.672Z
generated_at: 2026-06-02T07:36:15.672Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full command coverage is derived from the public Sony \"Simple IP control\" reference; behaviour on EU RED-DA variant firmware may differ (see Notes)."
  - "no safety warnings, interlocks, or power-on sequencing"
  - "maximum audio volume value not stated in source (only example 0x29=41 given)."
  - "discoverable broadcast interval, keepalive, or socket-reconnect behaviour not stated in source."
  - "authentication / pairing procedure not stated in source (auth.type inferred as none)."
  - "firmware version compatibility range not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:36:15.672Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim in source with correct command mnemonics, parameters, and transport (TCP port 20060, 24-byte framing). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KD-XH8096 Series BRAVIA Control Spec

## Summary
Control spec for Sony BRAVIA Professional Displays (KD-XH8096 Series) using Sony's "Simple IP Control" protocol (SSIP). The monitor exposes a TCP listener on port 20060 and exchanges 24-byte fixed-size frames for power, input, volume, mute, picture-mute, and scene-setting control.

<!-- UNRESOLVED: full command coverage is derived from the public Sony "Simple IP control" reference; behaviour on EU RED-DA variant firmware may differ (see Notes). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  framing:
    header: "0x2A 0x53"   # ASCII "*S"
    footer: "0x0A"         # LF
    total_length_bytes: 24
    layout:
      - "Byte[0-1]   : Header (fixed 0x2A 0x53)"
      - "Byte[2]     : Message Type (C=Control 0x43, E=Enquiry 0x45, A=Answer 0x41, N=Notify 0x4E)"
      - "Byte[3-6]   : FourCC command (4 ASCII chars)"
      - "Byte[7-22]  : Parameters (16 bytes, ASCII digits or '#' padding)"
      - "Byte[23]    : Footer (fixed 0x0A / LF)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # setPowerStatus, togglePowerStatus, firePowerChange
- routable        # setInput, getInput, fireInputChange
- queryable       # get* commands (POWR, VOLU, AMUT, INPT, PMUT, SCEN, BADR, MADR)
- levelable       # setAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Send IRCC Remote Code
  kind: action
  command: "*SCIRCC{ircc_code:016d}\n"
  params:
    - name: ircc_code
      type: integer
      description: |
        Right-aligned decimal IR code in 16-byte param field. Examples:
        Display=5, Home=6, VolumeUp=30, VolumeDown=31, Mute=32,
        HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, TVPower=98.
        Full list in the source IR Commands table.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Standby (Off), 1=Active (On)"

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
  command: "*SCVOLU000000000000{volume:02X}\n"
  params:
    - name: volume
      type: integer
      description: |
        Volume value as 2-digit hex (right-aligned in 16-byte param field).
        Source example: 0x29 (= 41 decimal). Max value not specified in source.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Unmute, 1=Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000{input_type}0000{input_number:04d}\n"
  params:
    - name: input_type
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: input_number
      type: integer
      description: "Input number, 1-9999, zero-padded to 4 digits in the trailing param bytes."

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Disable picture mute, 1=Enable picture mute (screen black)"

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
  command: "*SCSCEN{scene:<16}#\n"
  params:
    - name: scene
      type: string
      enum: ["auto", "auto24pSync", "general"]
      description: |
        Case-sensitive scene name, left-aligned and right-padded with '#'
        to fill 16 param bytes. Examples: "auto############",
        "auto24pSync###", "general#########".

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{interface:<16}#\n"
  params:
    - name: interface
      type: string
      description: |
        Interface name left-aligned, right-padded with '#' to 16 bytes.
        Source example: "eth0############" (10 '#' fill).

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface:<16}#\n"
  params:
    - name: interface
      type: string
      description: |
        Interface name left-aligned, right-padded with '#' to 16 bytes.
        Source example: "eth0############" (10 '#' fill).
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "getPowerStatus answer byte[22]: 0=Standby, 1=Active"

- id: audio_volume
  type: integer
  source: "getAudioVolume answer bytes[7-22] as hex, e.g. 0x29 = 41"

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: "getAudioMute answer byte[22]: 0=Unmuted, 1=Muted"

- id: current_input
  type: object
  source: |
    getInput answer bytes[7-22]: input type code at byte[14]
    (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring), 4-digit
    input number in bytes[19-22].

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: "getPictureMute answer byte[22]: 0=Disabled, 1=Enabled"

- id: scene_setting
  type: enum
  values: ["auto", "auto24pSync", "general"]
  source: "getSceneSetting answer bytes[7-22] as scene name"

- id: broadcast_address
  type: string
  source: "getBroadcastAddress answer bytes[7-22] as IPv4, e.g. 192.168.0.14"

- id: mac_address
  type: string
  source: "getMacAddress answer bytes[7-22] padded with '#' on the right"
```

## Events
```yaml
- id: power_change
  trigger: "N type message, FourCC POWR"
  payload:
    - "byte[22]=0: monitor is powering off"
    - "byte[22]=1: monitor is powering on"

- id: input_change
  trigger: "N type message, FourCC INPT"
  payload:
    - "byte[22]=0: input change (generic)"
    - "byte[14]=1 + bytes[19-22]=NNNN: HDMI N"
    - "byte[14]=3 + bytes[19-22]=NNNN: Composite N"
    - "byte[14]=4 + bytes[19-22]=NNNN: Component N"
    - "byte[14]=5 + bytes[19-22]=NNNN: Screen Mirroring N"

- id: volume_change
  trigger: "N type message, FourCC VOLU"
  payload: "bytes[7-22] as hex volume value, e.g. 0x29"

- id: mute_change
  trigger: "N type message, FourCC AMUT"
  payload:
    - "byte[22]=0: unmuting"
    - "byte[22]=1: muting"

- id: picture_mute_change
  trigger: "N type message, FourCC PMUT"
  payload:
    - "byte[22]=0: picture mute enabled"
    - "byte[22]=1: picture mute disabled"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing
# requirements stated in the source. Nothing populated.
```

## Notes
- Protocol is Sony's "Simple IP control" (SSIP), exchanged as fixed 24-byte frames over TCP. The exact 24-byte example in the source is `*SCPOWR0000000000000000` (23 visible ASCII bytes plus the LF footer at byte 23).
- Two settings must be enabled on the monitor before commands will be accepted: **Settings → Network & Internet → Remote device settings → Control remothely** (sic, as printed in source) and **Settings → Network & Internet → Home network → IP control → Simple IP control**.
- Both wired and wireless LANs are supported; the monitor and controller must share the same network.
- EU-area models ship in three RED-DA compliance variants; available commands and setting paths may differ between variants. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for the per-variant table.
- The full IR command table (Display, Home, Options, Return, Up/Down/Left/Right, Confirm, colour keys, Num0–9, Volume/Channel, Mute, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, transport keys, TV Power, Audio, Input, Sleep, Video 2, Picture Mode, Demo Surround, HDMI 1–4, Action Menu, Help) is a parameter table for `setIrccCode` — it is **not** a separate set of protocol commands. Codes are right-aligned decimal in the 16-byte param field.
- Hex values in the source are stated using `0x` prefix only for the header/footer/message-type table. Command mnemonics and param values are shown in the source as bare digits; treated as ASCII digits here.
- Source: https://pro-bravia.sony.net/remote-display-control/simple-ip-control/

<!-- UNRESOLVED: maximum audio volume value not stated in source (only example 0x29=41 given). -->
<!-- UNRESOLVED: discoverable broadcast interval, keepalive, or socket-reconnect behaviour not stated in source. -->
<!-- UNRESOLVED: authentication / pairing procedure not stated in source (auth.type inferred as none). -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
retrieved_at: 2026-05-27T08:23:51.823Z
last_checked_at: 2026-06-02T07:36:15.672Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:36:15.672Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim in source with correct command mnemonics, parameters, and transport (TCP port 20060, 24-byte framing). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full command coverage is derived from the public Sony \"Simple IP control\" reference; behaviour on EU RED-DA variant firmware may differ (see Notes)."
- "no safety warnings, interlocks, or power-on sequencing"
- "maximum audio volume value not stated in source (only example 0x29=41 given)."
- "discoverable broadcast interval, keepalive, or socket-reconnect behaviour not stated in source."
- "authentication / pairing procedure not stated in source (auth.type inferred as none)."
- "firmware version compatibility range not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
