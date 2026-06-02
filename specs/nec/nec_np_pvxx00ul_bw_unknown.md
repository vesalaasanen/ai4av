---
spec_id: admin/nec-np-pvxx00ul-bw
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP PVxx00UL BW Control Spec"
manufacturer: NEC
model_family: "NEC NP PVxx00UL BW"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NEC NP PVxx00UL BW"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:44:45.608Z
last_checked_at: 2026-05-18T16:37:59.335Z
generated_at: 2026-05-18T16:37:59.335Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN unit spec outside scope of this doc"
  - "appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, key codes referenced but full tables not in source)"
  - "no unsolicited notifications described; all responses are synchronous to commands."
  - "no explicit safety interlock procedure in source. Command notes warn against issuing commands during power on/off transitions (\"While this command is turning on the power, no other command can be accepted.\" / \"While this command is turning off the power (including the cooling time), no other command can be accepted.\")"
  - "appendix tables (input terminal codes, aspect values, eco mode values, signal type values, key code full list beyond partial table shown) not included in source"
  - "wireless LAN unit specs delegated to separate operation manual"
  - "firmware version compatibility not stated"
  - "error recovery sequences not described"
verification:
  verdict: verified
  checked_at: 2026-05-18T16:37:59.335Z
  matched_actions: 33
  action_count: 33
  confidence: medium
  summary: "All 33 spec actions verified against source with exact hex matches; transport parameters fully supported; bidirectional command coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC NP PVxx00UL BW Control Spec

## Summary
NEC NP PVxx00UL BW projector. RS-232C serial and wired TCP/IP control via port 7142. No authentication procedure described.

<!-- UNRESOLVED: wireless LAN unit spec outside scope of this doc -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: TCP port 7142 for command sending/receiving
serial:
  baud_rate: 115200  # stated: 115200/38400/19200/9600/4800 bps (selectable)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # RTS/CTS hardware handshake noted in pinout; flow_control field describes software flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # 015 POWER ON, 016 POWER OFF
- routable        # 018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET
- queryable       # 009, 037, 037-3, 037-4, 037-6, 078-1/2/3/4/5/6, 084, 097-*, 305-*, 060-1
- levelable       # 030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-12 ASPECT ADJUST, 030-15 OTHER ADJUST
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  protocol: serial
  hex: "02h 00h 00h 00h 00h 02h"
  notes: "No other command accepted while power is turning on."

- id: power_off
  label: Power Off
  kind: action
  params: []
  protocol: serial
  hex: "02h 01h 00h 00h 00h 03h"
  notes: "No other command accepted during cooling time."

- id: input_sw_change
  label: Input SW Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code (e.g. 06h for video port per appendix)
  protocol: serial
  hex: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  notes: "Response FFh indicates error (no signal switch)."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  protocol: serial
  hex: "02h 10h 00h 00h 00h 12h"
  notes: "Cleared by input terminal switch or video signal switch."

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  protocol: serial
  hex: "02h 11h 00h 00h 00h 13h"

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  protocol: serial
  hex: "02h 12h 00h 00h 00h 14h"
  notes: "Cleared by input switch, video signal switch, or volume adjust."

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  protocol: serial
  hex: "02h 13h 00h 00h 00h 15h"

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  protocol: serial
  hex: "02h 14h 00h 00h 00h 16h"
  notes: "Cleared by input terminal switch or video signal switch."

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  protocol: serial
  hex: "02h 15h 00h 00h 00h 17h"

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order 8 bits then high-order 8 bits)
  protocol: serial
  hex: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  protocol: serial
  hex: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect ratio value per appendix
  protocol: serial
  hex: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  protocol: serial
  hex: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code per table (e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, etc.)"
  protocol: serial
  hex: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  notes: "Key code table lists 30+ codes including SOURCE (D7h), LAMP MODE/ECO (EEh), VOLUME UP/DOWN, etc."

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  protocol: serial
  hex: "02h 16h 00h 00h 00h 18h"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  protocol: serial
  hex: "02h 17h 00h 00h 00h 19h"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=drives 1/0.5/0.25s plus, 7Fh=cont plus, 81h=minus, FDh/FEh/FFh=drives 0.25/0.5/1s minus"
  protocol: serial
  hex: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  notes: "After sending 7Fh or 81h, send 00h to stop. Continuous drive allowed without stop."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus (same as LENS CONTROL)"
  protocol: serial
  hex: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  response: "22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02>-<DATA07> <CKS>"
  notes: "Returns upper/lower limits and current value as 16-bit pairs."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value
  protocol: serial
  hex: "02h 1Dh 00h 00h 04h <DATA01>-<DATA04> <CKS>"

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  protocol: serial
  hex: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  notes: "Controls lens memory; see also 053-4 REFERENCE LENS MEMORY CONTROL."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  protocol: serial
  hex: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  notes: "Controls profile number specified by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  protocol: serial
  hex: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  response: "22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  notes: "DATA02: 00h=OFF, 01h=ON."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  protocol: serial
  hex: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  response: "23h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
  protocol: serial
  hex: "02h 22h 00h 00h 01h 00h 25h"
  response: "22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"
  notes: "DATA01 bitfield: Bit0=Lens Memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V)."

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"
  protocol: serial
  hex: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  response: "22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  protocol: serial
  hex: "02h 28h 00h 00h 00h 2Ah"
  response: "22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  notes: "DATA01: 00h=Profile 1, 01h=Profile 2."

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"
  protocol: serial
  hex: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  response: "23h 05h <ID1> <ID2> 10h <DATA01>-<DATA16> <CKS>"
  notes: "Returns adjustment range (upper/lower), default value, current value, wide/narrow adjustment width."

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"
  protocol: serial
  hex: "01h 98h 00h 00h 01h <DATA01> <CKS>"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: Eco mode value per appendix
  protocol: serial
  hex: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  response: "23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated
  protocol: tcp
  hex: "03h B1h 00h 00h 12h 2Ch <DATA01>-<DATA16> 00h <CKS>"
  response: "23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: "Per target: MODE 00h=PIP 01h=PICTURE BY PICTURE; POSITION 00h=TOP-LEFT 01h=TOP-RIGHT 02h=BOTTOM-LEFT 03h=BOTTOM-RIGHT"
  protocol: serial
  hex: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"
  protocol: serial
  hex: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  response: "23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code per appendix
    - name: setting_value
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
  protocol: serial
  hex: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  response: "23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>"
  notes: "Response DATA02: 00h=success, 01h=error."
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  kind: feedback
  type: bitfield
  fields:
    DATA01: "Bit0=Cover error, Bit1=Temperature error, Bit2=None, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    DATA02: "Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp2 off, Bit3=Reserved, Bit4=None, Bit5=None, Bit6=None, Bit7=Extend status"
    DATA03: "Bit0=None, Bit1=FPGA error, Bit2=Temp sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp2 moratorium, Bit7=Lamp2 time exceeded"
    DATA04: "Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Dust temp error, Bit3=Foreign matter sensor, Bit4=None, Bit5=Ballast comm error, Bit6=Iris calibration error, Bit7=Lens not installed"
    DATA09: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"
  notes: "Query: 00h 88h 00h 00h 00h 88h; Response: A0h 88h ..."

- id: power_state
  label: Power State
  kind: feedback
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  notes: "From 078-2 RUNNING STATUS REQUEST and 305-3 BASIC INFORMATION REQUEST."

- id: input_status
  label: Input Status
  kind: feedback
  type: object
  fields:
    signal_switch_process: enum [not_executed, during_execution]
    signal_list_number: integer
    selection_signal_type_1: integer
    selection_signal_type_2: integer
    signal_list_type: enum [default, user]
    test_pattern_display: enum [not_displayed, displayed]
    content_displayed: enum [video_signal, no_signal, viewer, test_pattern, lan_displayed]
  notes: "From 078-3 INPUT STATUS REQUEST."

- id: mute_status
  label: Mute Status
  kind: feedback
  type: object
  fields:
    picture_mute: enum [off, on]
    sound_mute: enum [off, on]
    onscreen_mute: enum [off, on]
    forced_onscreen_mute: enum [off, on]
    onscreen_display: enum [not_displayed, displayed]
  notes: "From 078-4 MUTE STATUS REQUEST."

- id: projector_info
  label: Projector Info
  kind: feedback
  type: object
  fields:
    projector_name: string
    lamp_usage_time_seconds: integer
    filter_usage_time_seconds: integer
  notes: "From 037 INFORMATION REQUEST. Usage times updated at 1-minute intervals."

- id: lamp_info
  label: Lamp Info
  kind: feedback
  type: object
  fields:
    lamp: enum [lamp_1, lamp_2]
    content: enum [usage_time_seconds, remaining_life_percent]
    value: integer
  notes: "From 037-4 LAMP INFORMATION REQUEST 3. Lamp 2 only for two-lamp models. Negative value if deadline exceeded."

- id: eco_mode
  label: Eco Mode
  kind: feedback
  type: integer
  notes: "From 097-8 ECO MODE REQUEST."

- id: lan_projector_name
  label: LAN Projector Name
  kind: feedback
  type: string
  notes: "From 097-45 LAN PROJECTOR NAME REQUEST."

- id: mac_address
  label: MAC Address
  kind: feedback
  type: string
  notes: "From 097-155 LAN MAC ADDRESS STATUS REQUEST2. 6 bytes hex."

- id: pip_pbp_status
  label: PIP/PBP Status
  kind: feedback
  type: object
  notes: "From 097-198 PIP/PICTURE BY PICTURE REQUEST."

- id: edge_blending_mode
  label: Edge Blending Mode
  kind: feedback
  type: enum [off, on]
  notes: "From 097-243-1 EDGE BLENDING MODE REQUEST."

- id: model_name
  label: Model Name
  kind: feedback
  type: string
  notes: "From 078-5 MODEL NAME REQUEST. NUL-terminated string."

- id: serial_number
  label: Serial Number
  kind: feedback
  type: string
  notes: "From 305-2 SERIAL NUMBER REQUEST. NUL-terminated string."

- id: basic_info
  label: Basic Info
  kind: feedback
  type: object
  notes: "From 305-3 BASIC INFORMATION REQUEST. Power status, input signal type, video/sound/onscreen mute, freeze status."

- id: gain_parameters
  label: Gain Parameters
  kind: feedback
  type: object
  notes: "From 060-1 GAIN PARAMETER REQUEST 3. Adjustment range, default, current, wide/narrow width."

- id: lens_position
  label: Lens Position
  kind: feedback
  type: object
  notes: "From 053-1 LENS CONTROL REQUEST. Upper/lower limits, current value."

- id: lens_info
  label: Lens Info
  kind: feedback
  type: bitfield
  notes: "From 053-7 LENS INFORMATION REQUEST. Lens memory, zoom, focus, shift H/V status."

- id: lens_profile
  label: Lens Profile
  kind: feedback
  type: enum [profile_1, profile_2]
  notes: "From 053-11 LENS PROFILE REQUEST."

- id: lens_memory_option
  label: Lens Memory Option
  kind: feedback
  type: enum [off, on]
  notes: "From 053-5 LENS MEMORY OPTION REQUEST."
```

## Variables
```yaml
# No discrete variable parameters outside action params - all settable via commands above.
# UNRESOLVED: appendix "Supplementary Information by Command" values not included (input terminal codes, aspect values, eco mode values, key codes referenced but full tables not in source)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described; all responses are synchronous to commands.
```

## Macros
```yaml
# No explicit macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety interlock procedure in source. Command notes warn against issuing commands during power on/off transitions ("While this command is turning on the power, no other command can be accepted." / "While this command is turning off the power (including the cooling time), no other command can be accepted.")
```

## Notes
Command packet format: `20h/02h/03h/01h <ID1> <ID2> <LEN/DATA...> <CKS]` — first byte indicates protocol class. All commands include ID1 (control ID set on projector), ID2 (model code), and CKS (checksum = low-order byte of sum of all preceding bytes).

Serial: 9-pin D-SUB RS-232C, full duplex. TCP: port 7142. No login/auth described.

<!-- UNRESOLVED: appendix tables (input terminal codes, aspect values, eco mode values, signal type values, key code full list beyond partial table shown) not included in source -->
<!-- UNRESOLVED: wireless LAN unit specs delegated to separate operation manual -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: error recovery sequences not described -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
  - assets.sharpnecdisplays.us
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
  - https://assets.sharpnecdisplays.us/documents/miscellaneous/pj-control-command-codes.pdf
retrieved_at: 2026-05-13T08:44:45.608Z
last_checked_at: 2026-05-18T16:37:59.335Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-18T16:37:59.335Z
matched_actions: 33
action_count: 33
confidence: medium
summary: "All 33 spec actions verified against source with exact hex matches; transport parameters fully supported; bidirectional command coverage confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN unit spec outside scope of this doc"
- "appendix \"Supplementary Information by Command\" values not included (input terminal codes, aspect values, eco mode values, key codes referenced but full tables not in source)"
- "no unsolicited notifications described; all responses are synchronous to commands."
- "no explicit safety interlock procedure in source. Command notes warn against issuing commands during power on/off transitions (\"While this command is turning on the power, no other command can be accepted.\" / \"While this command is turning off the power (including the cooling time), no other command can be accepted.\")"
- "appendix tables (input terminal codes, aspect values, eco mode values, signal type values, key code full list beyond partial table shown) not included in source"
- "wireless LAN unit specs delegated to separate operation manual"
- "firmware version compatibility not stated"
- "error recovery sequences not described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
