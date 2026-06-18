---
spec_id: admin/sharp-nec-ld-fa122-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa122 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa122 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa122 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:25:27.650Z
last_checked_at: 2026-06-17T20:04:02.596Z
generated_at: 2026-06-17T20:04:02.596Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model \"Ld Fa122 U\" not named verbatim inside the source manual (generic projector command reference); model supplied by operator. Default serial baud rate not stated (only supported list). Flow control not explicitly named."
  - "default not stated in source; supported rates: 4800 / 9600 / 19200 / 38400 / 115200 bps"
  - "not explicitly named in source (full-duplex; RTS/CTS pins present on PC CONTROL D-SUB 9P)"
  - "full numeric ranges for picture/volume gain come from 060-1 GAIN PARAMETER REQUEST 3 response (upper/lower/default/current) - device-reported at runtime, not fixed in source."
  - "fixed min/max/default bounds not stated in source (device-reported per-gain)"
  - "populate if source documents async/event notifications (none found)."
  - "no explicit multi-step sequences documented in source."
  - "no explicit power-on sequencing voltage/current spec or full interlock procedure beyond command-acceptance notes."
  - "Default baud rate not stated (only supported list 4800–115200). Flow control not explicitly named. Firmware version compatibility not stated. Full enum value lists for input terminal, aspect, eco mode, and PIP sub-input deferred to source Appendix \"Supplementary Information by Command\" (not included in this excerpt). Model name \"Ld Fa122 U\" supplied by operator, not printed verbatim in source body."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:04:02.596Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec action-units matched with literal hexadecimal commands found in source. Transport values verified. Complete one-to-one coverage of source command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ld Fa122 U Control Spec

## Summary
Projector control spec for the Sharp/NEC Ld Fa122 U, derived from the NEC "Projector Control Command Reference Manual" (doc BDT140013 Revision 7.1). The device supports control over RS-232C serial and over LAN (wired/wireless) using a binary hex command framing with a trailing checksum byte. Covers power, input switching, picture/volume/aspect/gain adjust, mutes, shutter, lens control and memory, freeze, status/error queries, eco/PIP/edge-blending set and request, and identity information requests.

<!-- UNRESOLVED: specific model "Ld Fa122 U" not named verbatim inside the source manual (generic projector command reference); model supplied by operator. Default serial baud rate not stated (only supported list). Flow control not explicitly named. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: null  # UNRESOLVED: default not stated in source; supported rates: 4800 / 9600 / 19200 / 38400 / 115200 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: not explicitly named in source (full-duplex; RTS/CTS pins present on PC CONTROL D-SUB 9P)
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWER ON (015) / POWER OFF (016) commands present
  - queryable    # inferred: many status/information request commands present
  - levelable    # inferred: PICTURE ADJUST / VOLUME ADJUST / OTHER ADJUST gain commands present
```

## Actions
```yaml
# All payloads are hexadecimal byte sequences VERBATIM from the source.
# Command framing: <lead> <cmd> 00h 00h <LEN> [DATA...] <CKS>. <CKS> = low byte of
# sum of all preceding bytes. <ID1> = control ID, <ID2> = model code (set on device).
# Success response lead bytes: 20h/21h/22h/23h. Error response: A0h/A1h/A2h/A3h
# with <ERR1> <ERR2>. Parameterized commands carry <DATA> placeholders; checksum
# computed at runtime.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (e.g. 06h = video port); see Appendix "Supplementary Information by Command" for full value list
  # literal example from source: 02h 03h 00h 00h 02h 01h 06h 0Eh  (switches to video port)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits
  # literal example (set brightness to 10): 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h
  # literal example (set brightness to -10): 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits
  # literal example (set volume to 10): 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect_value
      type: integer
      description: Aspect value; see Appendix "Supplementary Information by Command" for value list

- id: other_adjust
  label: Other Adjust (Lamp/Light Gain)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: target
      type: integer
      description: "Adjustment target: DATA01=96h with DATA02=FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute, 01h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: content
      type: integer
      description: "01h=lamp usage time (seconds), 04h=lamp remaining life (%)"
  # literal example (lamp 1 usage time): 03h 96h 00h 00h 02h 00h 01h 9Ch

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: content
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "WORD key code (DATA01 DATA02); examples: 02h 00h=POWER ON, 03h 00h=POWER OFF, 05h 00h=AUTO, 06h 00h=MENU, 07h 00h=UP, 08h 00h=DOWN, 09h 00h=RIGHT, 0Ah 00h=LEFT, 0Bh 00h=ENTER, 0Ch 00h=EXIT, 0Dh 00h=HELP, 0Fh 00h=MAGNIFY UP, 10h 00h=MAGNIFY DOWN, 13h 00h=MUTE, 29h 00h=PICTURE, 4Bh 00h=COMPUTER1, 4Ch 00h=COMPUTER2, 4Fh 00h=VIDEO1, 51h 00h=S-VIDEO1, 84h 00h=VOLUME UP, 85h 00h=VOLUME DOWN, 8Ah 00h=FREEZE, A3h 00h=ASPECT, D7h 00h=SOURCE, EEh 00h=LAMP MODE/ECO"
  # literal example (AUTO): 02h 0Fh 00h 00h 02h 05h 00h 18h

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=drive 1s plus, 02h=drive 0.5s plus, 03h=drive 0.25s plus, 7Fh=drive plus (continuous), 81h=drive minus (continuous), FDh=drive 0.25s minus, FEh=drive 0.5s minus, FFh=drive 1s minus. Send 00h to stop after 7Fh/81h."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "FFh=Stop (mode/value ignored)"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET (acts on profile set via LENS PROFILE SET 053-10)"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: integer
      description: "00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"
  # literal example (brightness): 03h 05h 00h 00h 03h 00h 00h 00h 0Bh

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: integer
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: eco_mode
      type: integer
      description: Eco/light/lamp mode value; see Appendix "Supplementary Information by Command" for value list

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: Projector name, up to 16 bytes (NUL terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "MODE: 00h=PIP, 01h=PICTURE BY PICTURE. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. Sub input values: see Appendix."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: setting
      type: integer
      description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value; see Appendix "Supplementary Information by Command"
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmap
  description: "12-byte error bitmap (DATA01-DATA12) from 009 ERROR STATUS REQUEST; bit=1 = error"

- id: power_state
  type: enum
  values: [standby, power_on, cooling]
  description: "DATA03 of 078-2 RUNNING STATUS REQUEST: 00h=Standby, 01h=Power on, 05h=Cooling"

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  description: "DATA06 of 078-2 RUNNING STATUS REQUEST: 00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: input_terminal_status
  type: integer
  description: "DATA01-DATA04 of 078-3 INPUT STATUS REQUEST (signal type 1/2, list number)"

- id: picture_mute_state
  type: enum
  values: [off, on]

- id: sound_mute_state
  type: enum
  values: [off, on]

- id: onscreen_mute_state
  type: enum
  values: [off, on]

- id: freeze_state
  type: enum
  values: [off, on]

- id: cover_status
  type: enum
  values: [normal_open, closed]

- id: lamp_usage_time
  type: integer
  unit: seconds
  description: "From 037-4 LAMP INFORMATION REQUEST 3 (DATA03-06); updated at 1-minute intervals"

- id: lamp_remaining_life
  type: integer
  unit: percent
  description: "From 037-4 (content 04h); negative if replacement deadline exceeded"

- id: filter_usage_time
  type: integer
  unit: seconds
  description: "From 037-3 FILTER USAGE INFORMATION REQUEST (DATA01-04); -1 if undefined"

- id: eco_mode_state
  type: integer
  description: "From 097-8 ECO MODE REQUEST; value list in Appendix"

- id: edge_blending_state
  type: enum
  values: [off, on]

- id: lens_operation_status
  type: bitmap
  description: "DATA01 of 053-7 LENS INFORMATION REQUEST: bits for lens memory/zoom/focus/lens-shift(H/V) stop vs in-operation"

- id: projector_name
  type: string

- id: mac_address
  type: string

- id: model_name
  type: string

- id: serial_number
  type: string

- id: horizontal_sync_frequency
  type: string
  description: "From 084 INFORMATION STRING REQUEST (info type 03h)"

- id: vertical_sync_frequency
  type: string
  description: "From 084 INFORMATION STRING REQUEST (info type 04h)"

- id: carbon_savings
  type: number
  unit: kilogram
  description: "From 037-6 (DATA02-05 kg, DATA06-09 mg)"

# UNRESOLVED: full numeric ranges for picture/volume gain come from 060-1 GAIN PARAMETER REQUEST 3 response (upper/lower/default/current) - device-reported at runtime, not fixed in source.
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness, set via 030-1 (target 00h); range queried via 060-1
- id: contrast
  type: integer
  description: Picture contrast, set via 030-1 (target 01h)
- id: color
  type: integer
  description: Picture color, set via 030-1 (target 02h)
- id: hue
  type: integer
  description: Picture hue, set via 030-1 (target 03h)
- id: sharpness
  type: integer
  description: Picture sharpness, set via 030-1 (target 04h)
- id: volume
  type: integer
  description: Sound volume, set via 030-2 VOLUME ADJUST
- id: lamp_light_adjust
  type: integer
  description: Lamp/Light adjust gain, set via 030-15 (target 96h FFh)
# UNRESOLVED: fixed min/max/default bounds not stated in source (device-reported per-gain)
```

## Events
```yaml
# The device returns solicited responses only. No unsolicited notification frames are documented.
# UNRESOLVED: populate if source documents async/event notifications (none found).
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off  # source: during power-off (incl. cooling time) no other command accepted
interlocks:
  - "Power On (015): while turning on, no other command can be accepted."
  - "Power Off (016): during power-off and cooling time, no other command can be accepted."
  - "Many commands rejected with ERR ERR2=0Dh when power is off ('command cannot be accepted because the power is off')."
  - "Interlock switch open is reported as an error (DATA09 Bit1 of 009 ERROR STATUS REQUEST)."
# UNRESOLVED: no explicit power-on sequencing voltage/current spec or full interlock procedure beyond command-acceptance notes.
```

## Notes
- Manual revision: BDT140013 Revision 7.1.
- Binary framing. Each command/response is a hex byte series ending in a checksum byte `<CKS>`.
- **Checksum rule (verbatim):** (1) add all preceding bytes; (2) use the low-order one byte (8 bits) of the sum as the checksum. Worked example: `20h 81h 01h 60h 01h 00h` → sum `103h` → CKS `03h`.
- Common parameters: `ID1` = control ID set on projector; `ID2` = model code (model-dependent); `LEN` = data length in bytes following LEN; `DATA??` = variable-length data.
- Response success lead byte mirrors command lead with high nibble 2→2xh (e.g. cmd lead 02h → ack 22h); error lead uses Axh. Full mapping: 00h→20h/A0h, 01h→21h/A1h, 02h→22h/A2h, 03h→23h/A3h.
- Usage-time values returned in seconds, updated at one-minute intervals.
- Serial cable: cross cable on PC CONTROL port (D-SUB 9P); pins 2/3 cross RX/TX, 5=GND, 7/8 RTS/CTS crossed.
- LAN: wired (10/100 Mbps auto, RJ-45) or wireless (optional wireless LAN unit).

<!-- UNRESOLVED: Default baud rate not stated (only supported list 4800–115200). Flow control not explicitly named. Firmware version compatibility not stated. Full enum value lists for input terminal, aspect, eco mode, and PIP sub-input deferred to source Appendix "Supplementary Information by Command" (not included in this excerpt). Model name "Ld Fa122 U" supplied by operator, not printed verbatim in source body. -->
````

Spec done. 53 actions, all literal hex payloads verbatim incl checksum. Transport = serial + tcp:7142. Baud default left unresolved (only supported list in source). Enum appendix values noted as gap.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:25:27.650Z
last_checked_at: 2026-06-17T20:04:02.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:04:02.596Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec action-units matched with literal hexadecimal commands found in source. Transport values verified. Complete one-to-one coverage of source command catalogue. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model \"Ld Fa122 U\" not named verbatim inside the source manual (generic projector command reference); model supplied by operator. Default serial baud rate not stated (only supported list). Flow control not explicitly named."
- "default not stated in source; supported rates: 4800 / 9600 / 19200 / 38400 / 115200 bps"
- "not explicitly named in source (full-duplex; RTS/CTS pins present on PC CONTROL D-SUB 9P)"
- "full numeric ranges for picture/volume gain come from 060-1 GAIN PARAMETER REQUEST 3 response (upper/lower/default/current) - device-reported at runtime, not fixed in source."
- "fixed min/max/default bounds not stated in source (device-reported per-gain)"
- "populate if source documents async/event notifications (none found)."
- "no explicit multi-step sequences documented in source."
- "no explicit power-on sequencing voltage/current spec or full interlock procedure beyond command-acceptance notes."
- "Default baud rate not stated (only supported list 4800–115200). Flow control not explicitly named. Firmware version compatibility not stated. Full enum value lists for input terminal, aspect, eco mode, and PIP sub-input deferred to source Appendix \"Supplementary Information by Command\" (not included in this excerpt). Model name \"Ld Fa122 U\" supplied by operator, not printed verbatim in source body."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
