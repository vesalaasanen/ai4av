---
spec_id: admin/sony-kdxh9196-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXH9196 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDXH9196 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXH9196 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-09-02T17:46:43.275Z
last_checked_at: 2026-09-22T11:44:50.720Z
generated_at: 2026-09-22T11:44:50.720Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full EU RED-DA command availability matrix not in source"
  - "max/min range not stated in source."
  - "source defines commands as fixed-format 4-byte ASCII opcode + 16-byte parameter; no persistent named variables beyond Feedbacks above."
  - "source describes only individual commands; no multi-step macros documented."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source. Full EU RED-DA command availability matrix not in source. Volume numeric range not bounded in source."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:44:50.720Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions have matching wire-literal FourCC commands in the source; transport (TCP 20060) verified; 5 source notifies represented as Events. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Sony KDXH9196 Series Control Spec

## Summary
Sony KDXH9196 Series professional display monitor. This spec covers the Simple IP Control protocol over TCP port 20060 using fixed-length 24-byte messages. Supports power, volume, mute, input, picture mute, scene setting, and IR pass-through commands, plus unsolicited notify events. EU models have three RED-DA compliance variants with differing settings and available commands.

<!-- UNRESOLVED: full EU RED-DA command availability matrix not in source -->

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
# - powerable       (setPowerStatus, togglePowerStatus present)
# - levelable       (setAudioVolume present)
# - routable        (setInput present)
# - queryable       (getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress present)
```

## Actions
```yaml
# Simple IP Control uses 24-byte fixed messages:
#   Byte[0-1]   = 0x2A 0x53   ("*S" header)
#   Byte[2]     = 0x43 'C' (Control), 0x45 'E' (Enquiry), 0x4E 'N' (Notify)
#   Byte[3-6]   = 4-char FourCC command
#   Byte[7-22]  = 16 ASCII parameter bytes (right-padded with '0' for numbers or '#' for strings)
#   Byte[23]    = 0x0A (LF footer)
# Commands below use ASCII templates of byte[2..22] (16-byte command+param string), LF footer appended.

- id: set_ircc_code
  label: Send IR Remote Code (setIrccCode)
  kind: action
  command: "*SCIRCC{ir_code}00000000000000"
  params:
    - name: ir_code
      type: string
      description: 2-digit ASCII IR code (e.g. "98" for TV Power, "30" for Volume Up). See IR Commands table in source.

- id: set_power_status
  label: Set Power (setPowerStatus)
  kind: action
  command: "*SCPOWR000000000000000{state}"
  params:
    - name: state
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power (getPowerStatus)
  kind: query
  command: "*SEPOWR0000000000000000"

- id: toggle_power_status
  label: Toggle Power (togglePowerStatus)
  kind: action
  command: "*SCTPOW0000000000000000"

- id: set_audio_volume
  label: Set Volume (setAudioVolume)
  kind: action
  command: "*SCVOLU{volume}000000000000"
  params:
    - name: volume
      type: string
      description: Volume as right-justified 2-digit decimal zero-padded within bytes[7..22] (e.g. "29" -> "0000000000000029"). UNRESOLVED: max/min range not stated in source.

- id: get_audio_volume
  label: Get Volume (getAudioVolume)
  kind: query
  command: "*SEVOLU0000000000000000"

- id: set_audio_mute
  label: Set Audio Mute (setAudioMute)
  kind: action
  command: "*SCAMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute (getAudioMute)
  kind: query
  command: "*SEAMUT0000000000000000"

- id: set_input_hdmi
  label: Set Input to HDMI (setInput)
  kind: action
  command: "*SCINPT000000000001000{port}"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999

- id: set_input_composite
  label: Set Input to Composite (setInput)
  kind: action
  command: "*SCINPT000000000003000{port}"
  params:
    - name: port
      type: integer
      description: Composite input number 1-9999

- id: set_input_component
  label: Set Input to Component (setInput)
  kind: action
  command: "*SCINPT000000000004000{port}"
  params:
    - name: port
      type: integer
      description: Component input number 1-9999

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (setInput)
  kind: action
  command: "*SCINPT000000000005000{port}"
  params:
    - name: port
      type: integer
      description: Screen Mirroring input number 1-9999

- id: get_input
  label: Get Input (getInput)
  kind: query
  command: "*SEINPT0000000000000000"

- id: set_picture_mute
  label: Set Picture Mute (setPictureMute)
  kind: action
  command: "*SCPMUT000000000000000{state}"
  params:
    - name: state
      type: integer
      description: 0 = Disable picture mute, 1 = Turn screen black

- id: get_picture_mute
  label: Get Picture Mute (getPictureMute)
  kind: query
  command: "*SEPMUT0000000000000000"

- id: toggle_picture_mute
  label: Toggle Picture Mute (togglePictureMute)
  kind: action
  command: "*SCTPMU0000000000000000"

- id: set_scene_setting
  label: Set Scene Setting (setSceneSetting)
  kind: action
  command: "*SCSCEN{value_padded}00000000000"
  params:
    - name: value
      type: string
      description: One of 'auto', 'auto24pSync', 'general' (case-sensitive), right-padded with '#' to fill bytes[7..22].

- id: get_scene_setting
  label: Get Scene Setting (getSceneSetting)
  kind: query
  command: "*SESCEN0000000000000000"

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (getBroadcastAddress, EU only)
  kind: query
  command: "*SEBADRETH0000000000000"

- id: get_mac_address
  label: Get MAC Address (getMacAddress, EU only)
  kind: query
  command: "*SEMADRETH0000000000000"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]

- id: audio_volume
  type: integer
  description: Current volume level returned by getAudioVolume (2-digit decimal, right-justified in last 2 bytes of parameter).

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]

- id: input_state
  type: string
  description: Current input. Encoded in bytes[11..22] of getInput reply (input class byte at [11], port number at bytes[18..22]).

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]

- id: scene_setting
  type: string
  description: Current Scene Setting value from getSceneSetting reply bytes[7..22] (right-padded with '#').

- id: broadcast_address
  type: string
  description: IPv4 broadcast address from getBroadcastAddress reply (right-padded with '#').

- id: mac_address
  type: string
  description: MAC address from getMacAddress reply (right-padded with '#').
```

## Variables
```yaml
# UNRESOLVED: source defines commands as fixed-format 4-byte ASCII opcode + 16-byte parameter; no persistent named variables beyond Feedbacks above.
```

## Events
```yaml
- id: fire_power_change
  type: notify
  fourcc: POWR
  description: Sent when power state changes. Parameter last byte: 0 = powered off, 1 = powered on.

- id: fire_input_change
  type: notify
  fourcc: INPT
  description: Sent when input changes. Parameter bytes[11..22] describe input class + port (0=unknown, 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; last 4 digits are port number).

- id: fire_volume_change
  type: notify
  fourcc: VOLU
  description: Sent when volume changes. Parameter carries current volume in last 2 bytes.

- id: fire_mute_change
  type: notify
  fourcc: AMUT
  description: Sent when mute state changes. Parameter last byte: 0 = unmuted, 1 = muted.

- id: fire_picture_mute_change
  type: notify
  fourcc: PMUT
  description: Sent when picture mute state changes. Parameter last byte: 0 = enabled (screen black), 1 = disabled. (Note: source row labels are inverted relative to setPictureMute; emitted as documented.)
```

## Macros
```yaml
# UNRESOLVED: source describes only individual commands; no multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Protocol is text-based 24-byte fixed frames. Header `*S` (0x2A 0x53) and footer LF (0x0A) are mandatory.
- Parameter padding rules: numeric fields right-justified and zero-padded within bytes[7..22] (e.g. "29" -> "0000000000000029"); string fields right-padded with '#'.
- `getBroadcastAddress` and `getMacAddress` queries take an interface specifier in bytes[7..10] (source example uses "eth0"); response is the address with '#' padding.
- EU-area models (KDXH9196 series in RED-DA scope) have three specification variants; available commands and menu paths differ per variant. Reference: https://pro-bravia.sony.net/setup/device-settings/red-da/
- The `firePictureMuteChange` notify's success/error byte mapping in the source is documented with 0=enabled, 1=disabled (opposite of the setPictureMute payload). This is reproduced as-is per source; verify on-device.
- Volume scale maximum/minimum values and the exact encoding width for `setAudioVolume` (the example "29" occupies 2 digits) are not explicitly bounded in the source — implementer should determine range empirically.
<!-- UNRESOLVED: firmware version compatibility not stated in source. Full EU RED-DA command availability matrix not in source. Volume numeric range not bounded in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-09-02T17:46:43.275Z
last_checked_at: 2026-09-22T11:44:50.720Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:44:50.720Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions have matching wire-literal FourCC commands in the source; transport (TCP 20060) verified; 5 source notifies represented as Events. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full EU RED-DA command availability matrix not in source"
- "max/min range not stated in source."
- "source defines commands as fixed-format 4-byte ASCII opcode + 16-byte parameter; no persistent named variables beyond Feedbacks above."
- "source describes only individual commands; no multi-step macros documented."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source. Full EU RED-DA command availability matrix not in source. Volume numeric range not bounded in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
