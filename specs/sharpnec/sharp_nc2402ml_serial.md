---
spec_id: admin/sharp-nec-nc2402ml
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NC2402ML Control Spec"
manufacturer: Sharp/NEC
model_family: NC2402ML
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NC2402ML
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:53:56.082Z
last_checked_at: 2026-06-18T08:33:27.178Z
generated_at: 2026-06-18T08:33:27.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "manufacturer entity/bootstrap token not verified against Convex"
  - "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) was not included in the refined source excerpt — several DATA value enumerations referenced but not listed inline"
  - "appendix not in source excerpt.\""
  - "appendix not in source excerpt).\""
  - "no event/notification mechanism documented."
  - "no macros documented in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "input terminal value list (used by 018, 319-10) lives in appendix \"Supplementary Information by Command\" not present in the refined excerpt"
  - "aspect value list (030-12) lives in the same appendix"
  - "eco-mode value list (097-8 / 098-8) lives in the same appendix"
  - "base-model-type values (078-1 / 305-1) and sub-input setting values (097-198 / 098-198) live in the same appendix"
  - "firmware version compatibility not stated in source"
  - "flow_control not explicitly named (Full-duplex stated; RTS/CTS pins wired on D-SUB 9P)"
  - "default baud rate not stated — source lists five supported rates without indicating the default"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:33:27.178Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NC2402ML Control Spec

## Summary
Sharp/NEC NC2402ML projector control spec covering the binary protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1). The device is controllable via an RS-232C serial port (PC CONTROL, D-SUB 9P) and over a wired/wireless LAN using TCP port 7142. Commands are framed hex bytes with a trailing additive checksum (low-order byte).

<!-- UNRESOLVED: manufacturer entity/bootstrap token not verified against Convex -->
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) was not included in the refined source excerpt — several DATA value enumerations referenced but not listed inline -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # source lists all as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source states Full duplex; RTS/CTS pins present on D-SUB 9P but no flow-control setting stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON / POWER OFF commands present
  - queryable      # inferred: many *REQUEST commands return state
  - levelable      # inferred: PICTURE/VOLUME/LAMP adjust + gain parameter requests
```

## Actions
```yaml
# Frame legend (from source §2.1): each command is a hex byte stream with
# <ID1>=control ID, <ID2>=model code, <CKS>=additive checksum (low-order byte
# of the sum of all preceding bytes). Fixed command payloads reproduced verbatim.
# Parameterized commands show the variable DATA bytes as placeholders.

- id: error_status_request_009
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning power on, no other command accepted.

- id: power_off_016
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning power off (incl. cooling time), no other command accepted.

- id: input_sw_change_018
  label: Input SW Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value list in appendix 'Supplementary Information by Command' - UNRESOLVED: appendix not in source excerpt."
  notes: "Example (video): 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on_020
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off_021
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off_023
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off_025
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)"
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust_030_2
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust_030_12
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Value set for the aspect - full list in appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source excerpt)."

- id: other_adjust_030_15
  label: Other Adjust / Lamp-Light Adjust (030-15)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target high byte - 96h when DATA02=FFh (LAMP ADJUST / LIGHT ADJUST)"
    - name: DATA02
      type: integer
      description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode (00h=absolute, 01h=relative)"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request_037
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name (DATA01-49), lamp usage seconds (DATA83-86), filter usage seconds (DATA87-90). Updated at 1-minute intervals."

- id: filter_usage_information_request_037_3
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []
  notes: "Returns filter usage seconds (DATA01-04) and filter alarm start seconds (DATA05-08). '-1' if undefined."

- id: lamp_information_request_3_037_4
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector (00h=Lamp 1, 01h=Lamp 2 - Lamp 2 only on two-lamp models)"
    - name: DATA02
      type: integer
      description: "Content (01h=usage seconds, 04h=remaining life %)"

- id: carbon_savings_information_request_037_6
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code_050
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list in Notes)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"

- id: shutter_close_051
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h=Periphery Focus)"
    - name: DATA02
      type: integer
      description: "Drive content (00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=plus, 81h=minus, FDh=-0.25s, FEh=-0.5s, FFh=-1s)"
  notes: After 7Fh/81h, send 00h to stop.

- id: lens_control_request_053_1
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target (same set as 053 LENS CONTROL)

- id: lens_control_2_053_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh=Stop - when Stop, mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode (00h=absolute, 02h=relative)"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control_053_3
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Operation (00h=MOVE, 01h=STORE, 02h=RESET)"
  notes: Operates on the profile selected via 053-10 LENS PROFILE SET.

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option (00h=LOAD BY SIGNAL, 01h=FORCED MUTE)"
    - name: DATA02
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: lens_information_request_053_7
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set_053_10
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number (00h=Profile 1, 01h=Profile 2)"

- id: lens_profile_request_053_11
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjusted value name (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust)"

- id: setting_request_078_1
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request_078_2
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request_078_3
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request_078_4
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request_078_5
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request_078_6
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control_079
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: information_string_request_084
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type (03h=Horizontal sync frequency, 04h=Vertical sync frequency)"

- id: eco_mode_request_097_8
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2_097_155
  label: LAN MAC Address Status Request 2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request_097_198
  label: PIP/Picture-by-Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value - full enum in appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source excerpt)."

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: DATA01-16
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set_098_198
  label: PIP/Picture-by-Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (MODE: 00h=PIP,01h=PbP; START POSITION: 00h=TL,01h=TR,02h=BL,03h=BR; sub-input values in appendix - UNRESOLVED)."

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value (00h=OFF, 01h=ON)"

- id: base_model_type_request_305_1
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request_305_2
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set_319_10
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal - values in appendix 'Supplementary Information by Command' (UNRESOLVED: appendix not in source excerpt)."
    - name: DATA02
      type: integer
      description: "Setting value (00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER)"
```

## Feedbacks
```yaml
# Query responses - observable state returned by the device.
- id: power_state
  type: enum
  values: [standby, power_on]
  source: 078-2 DATA03 (00h=Standby, 01h=Power on)

- id: cooling_status
  type: enum
  values: [not_executed, during_execution]
  source: 078-2 DATA04

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: 078-2 DATA06 / 305-3 DATA01

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA01

- id: sound_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA02

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source: 078-4 DATA03

- id: cover_state
  type: enum
  values: [normal_opened, closed]
  source: 078-6 DATA01

- id: error_status
  type: bitmask
  source: 009 DATA01-12 (per-bit error flags; see Notes)

- id: lamp_usage_seconds
  type: integer
  source: 037 DATA83-86 / 037-4

- id: lamp_remaining_life_percent
  type: integer
  source: 037-4 (DATA02=04h); negative if past replacement deadline

- id: filter_usage_seconds
  type: integer
  source: 037-3 DATA01-04

- id: eco_mode_value
  type: raw
  source: 097-8 DATA01

- id: model_name
  type: string
  source: 078-5

- id: serial_number
  type: string
  source: 305-2

- id: mac_address
  type: string
  source: 097-155

- id: lens_profile_selected
  type: enum
  values: [profile_1, profile_2]
  source: 053-11

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: 097-243-1
```

## Variables
```yaml
# Settable parameters exposed via dedicated gain-parameter request (060-1)
# with upper/lower/default/current bounds returned by the device.
- id: brightness
  type: integer
  source: 060-1 DATA01=00h / 030-1 DATA01=00h
- id: contrast
  type: integer
  source: 060-1 DATA01=01h / 030-1 DATA01=01h
- id: color
  type: integer
  source: 060-1 DATA01=02h / 030-1 DATA01=02h
- id: hue
  type: integer
  source: 060-1 DATA01=03h / 030-1 DATA01=03h
- id: sharpness
  type: integer
  source: 060-1 DATA01=04h / 030-1 DATA01=04h
- id: volume
  type: integer
  source: 060-1 DATA01=05h / 030-2
- id: lamp_light_adjust
  type: integer
  source: 060-1 DATA01=96h / 030-15
- id: aspect
  type: enum
  source: 030-12 (enum values UNRESOLVED - in appendix)
- id: eco_mode
  type: enum
  source: 098-8 (enum values UNRESOLVED - in appendix)
- id: lan_projector_name
  type: string
  max_length: 16
  source: 098-45
```

## Events
```yaml
# Source documents no unsolicited notifications - device only replies to commands.
# UNRESOLVED: no event/notification mechanism documented.
```

## Macros
```yaml
# Source documents no multi-step command sequences.
# UNRESOLVED: no macros documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond the note that POWER ON / POWER OFF
# block other commands during execution. Error-status bit 03 (interlock switch
# open) and cover-status (078-6) are reported but no interlock sequence is
# prescribed in the source excerpt.
```

## Notes
- **Checksum (CKS):** additive — sum all preceding bytes, take low-order 8 bits. Example from source: `20h+81h+01h+60h+01h+00h = 103h → CKS=03h`.
- **Power-on/off blocking:** while POWER ON is executing, or POWER OFF is executing (incl. cooling), no other command is accepted.
- **Picture/Sound/Onscreen mute auto-reset:** input-terminal switch, video-signal switch (and volume adjust for sound mute) cancel the respective mute.
- **Lens drive:** after sending continuous-drive bytes (7Fh plus / 81h minus), a `00h` (Stop) must be sent to halt. While the lens is driven, re-issuing the same command continues motion without stopping.
- **Lamp/usage-time granularity:** usage seconds are stored in 1-second units but refreshed at 1-minute intervals.
- **Two-lamp models:** DATA01=01h (Lamp 2) is only valid on two-lamp projectors.
- **Key code list (050 REMOTE KEY CODE):**
  | Key | DATA01 DATA02 | Name |
  |----|---------------|------|
  | 2  | 02h 00h | POWER ON |
  | 3  | 03h 00h | POWER OFF |
  | 5  | 05h 00h | AUTO |
  | 6  | 06h 00h | MENU |
  | 7  | 07h 00h | UP |
  | 8  | 08h 00h | DOWN |
  | 9  | 09h 00h | RIGHT |
  | 10 | 0Ah 00h | LEFT |
  | 11 | 0Bh 00h | ENTER |
  | 12 | 0Ch 00h | EXIT |
  | 13 | 0Dh 00h | HELP |
  | 15 | 0Fh 00h | MAGNIFY UP |
  | 16 | 10h 00h | MAGNIFY DOWN |
  | 19 | 13h 00h | MUTE |
  | 41 | 29h 00h | PICTURE |
  | 75 | 4Bh 00h | COMPUTER1 |
  | 76 | 4Ch 00h | COMPUTER2 |
  | 79 | 4Fh 00h | VIDEO1 |
  | 81 | 51h 00h | S-VIDEO1 |
  | 132 | 84h 00h | VOLUME UP |
  | 133 | 85h 00h | VOLUME DOWN |
  | 138 | 8Ah 00h | FREEZE |
  | 163 | A3h 00h | ASPECT |
  | 215 | D7h 00h | SOURCE |
  | 238 | EEh 00h | LAMP MODE/ECO |
- **Error code list (ERR1/ERR2):** see source §2.4; combinations span unrecognized command (00h/00h), unsupported (00h/01h), invalid value (01h/00h), invalid input terminal (01h/01h), power-off rejection (02h/0Dh), no authority (02h/0Fh), etc.
- **Source manual revision:** BDT140013 Rev 7.1.

<!-- UNRESOLVED: input terminal value list (used by 018, 319-10) lives in appendix "Supplementary Information by Command" not present in the refined excerpt -->
<!-- UNRESOLVED: aspect value list (030-12) lives in the same appendix -->
<!-- UNRESOLVED: eco-mode value list (097-8 / 098-8) lives in the same appendix -->
<!-- UNRESOLVED: base-model-type values (078-1 / 305-1) and sub-input setting values (097-198 / 098-198) live in the same appendix -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: flow_control not explicitly named (Full-duplex stated; RTS/CTS pins wired on D-SUB 9P) -->
<!-- UNRESOLVED: default baud rate not stated — source lists five supported rates without indicating the default -->
````

Spec above. Caveman: 52 commands done, hex verbatim, checksum kept. Both transports in (serial + TCP 7142). Appendix enums marked UNRESOLVED — not in refined excerpt.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:53:56.082Z
last_checked_at: 2026-06-18T08:33:27.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:33:27.178Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "manufacturer entity/bootstrap token not verified against Convex"
- "appendix \"Supplementary Information by Command\" (input terminal values, aspect values, eco-mode values, base-model-type values, sub-input values) was not included in the refined source excerpt — several DATA value enumerations referenced but not listed inline"
- "appendix not in source excerpt.\""
- "appendix not in source excerpt).\""
- "no event/notification mechanism documented."
- "no macros documented in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "input terminal value list (used by 018, 319-10) lives in appendix \"Supplementary Information by Command\" not present in the refined excerpt"
- "aspect value list (030-12) lives in the same appendix"
- "eco-mode value list (097-8 / 098-8) lives in the same appendix"
- "base-model-type values (078-1 / 305-1) and sub-input setting values (097-198 / 098-198) live in the same appendix"
- "firmware version compatibility not stated in source"
- "flow_control not explicitly named (Full-duplex stated; RTS/CTS pins wired on D-SUB 9P)"
- "default baud rate not stated — source lists five supported rates without indicating the default"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
