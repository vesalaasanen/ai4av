---
spec_id: admin/nec-pxm5-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PXM5 Series Projector Control Spec"
manufacturer: NEC
model_family: "PXM5 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PXM5 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-24T00:28:47.205Z
last_checked_at: 2026-10-01T10:41:17.924Z
generated_at: 2026-10-01T10:41:17.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source references an Appendix \"Supplementary Information by Command\" for input terminal, aspect, eco mode, base model type, and sub-input values; that appendix is not included, so enum values for those sub-mnemonics are not enumerated here. ID1 (control ID) and ID2 (model code) values are device-specific and not provided."
  - "enum values in Appendix"
  - "source describes only command/response pairs, no unsolicited notifications."
  - "source does not describe multi-step sequences."
  - "source does not state confirmation requirements"
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-10-01T10:41:17.924Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source command bytes verbatim; transport (port 7142, baud list) is in source; source's 53-command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# NEC PXM5 Series Projector Control Spec

## Summary
RS-232C and wired/wireless LAN control reference for the NEC PXM5 Series projector family, covering power, input switching, picture/sound/onscreen mute, picture adjust, volume, aspect, shutter, lens, eco/edge-blending/PIP modes, and information/status requests. Commands are binary frames with a low-order byte checksum and 115200/38400/19200/9600/4800 bps serial settings, or TCP port 7142 on the LAN interface.

<!-- UNRESOLVED: source references an Appendix "Supplementary Information by Command" for input terminal, aspect, eco mode, base model type, and sub-input values; that appendix is not included, so enum values for those sub-mnemonics are not enumerated here. ID1 (control ID) and ID2 (model code) values are device-specific and not provided. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source also lists 38400, 19200, 9600, 4800 as supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
powerable: true   # POWER ON, POWER OFF commands
routable: true    # INPUT SW CHANGE, AUDIO SELECT SET, PIP/PICTURE BY PICTURE SET
queryable: true   # extensive status/request commands (ERROR STATUS, RUNNING STATUS, BASIC INFORMATION, etc.)
levelable: true   # PICTURE ADJUST (brightness/contrast/color/hue/sharpness), VOLUME ADJUST
```

## Actions
```yaml
# Commands are binary frames per NEC projector protocol.
# Frame shape: <CMD_HIGH> <CMD_LOW> 00h 00h <LEN> <DATA...> <CKS>
# CKS = low-order byte of the sum of all preceding bytes.
# <ID1> (control ID) and <ID2> (model code) are device-specific and inserted
# between the response header and LEN; the source uses 00h 00h placeholders
# in command frames.
# Many DATA fields reference an external Appendix "Supplementary Information by
# Command" that is not included in the source; affected enum values are marked
# unresolved.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_switch_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"  # DATA01 = input terminal, see Appendix
  params:
    - name: DATA01
      type: hex
      description: "Input terminal code (see Appendix Supplementary Information by Command)"

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  # DATA01: 00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness
  # DATA02: 00h absolute, 01h relative
  # DATA03/DATA04: 16-bit adjustment value
  params:
    - name: DATA01
      type: hex
      description: "Adjustment target"
    - name: DATA02
      type: hex
      description: "Adjustment mode (00h absolute, 01h relative)"
    - name: DATA03
      type: hex
      description: "Adjustment value low-order 8 bits"
    - name: DATA04
      type: hex
      description: "Adjustment value high-order 8 bits"

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  # DATA01: 00h absolute, 01h relative
  # DATA02/DATA03: 16-bit adjustment value
  params:
    - name: DATA01
      type: hex
      description: "Adjustment mode (00h absolute, 01h relative)"
    - name: DATA02
      type: hex
      description: "Adjustment value low-order 8 bits"
    - name: DATA03
      type: hex
      description: "Adjustment value high-order 8 bits"

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  # DATA01: aspect value, see Appendix
  params:
    - name: DATA01
      type: hex
      description: "Aspect value (see Appendix Supplementary Information by Command)"

- id: other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  # LAMP ADJUST / LIGHT ADJUST: DATA01=96h, DATA02=FFh
  # DATA03: 00h absolute, 01h relative
  # DATA04/DATA05: 16-bit adjustment value
  params:
    - name: DATA01
      type: hex
      description: "Adjustment target high byte"
    - name: DATA02
      type: hex
      description: "Adjustment target low byte"
    - name: DATA03
      type: hex
      description: "Adjustment mode (00h absolute, 01h relative)"
    - name: DATA04
      type: hex
      description: "Adjustment value low-order 8 bits"
    - name: DATA05
      type: hex
      description: "Adjustment value high-order 8 bits"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  # DATA01: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)
  # DATA02: 01h usage time (seconds), 04h remaining life (%)
  params:
    - name: DATA01
      type: hex
      description: "Lamp number (00h Lamp 1, 01h Lamp 2)"
    - name: DATA02
      type: hex
      description: "Content (01h usage time, 04h remaining life)"

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 00h Total Carbon Savings, 01h Carbon Savings during operation
  params:
    - name: DATA01
      type: hex
      description: "Carbon savings type (00h total, 01h during operation)"

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  # DATA01/DATA02: 16-bit key code, see Key code list (POWER ON, POWER OFF, AUTO,
  # MENU, UP, DOWN, RIGHT, LEFT, ENTER, EXIT, HELP, MAGNIFY UP/DOWN, MUTE,
  # PICTURE, COMPUTER1/2, VIDEO1, S-VIDEO1, VOLUME UP/DOWN, FREEZE, ASPECT,
  # SOURCE, LAMP MODE/ECO)
  params:
    - name: DATA01
      type: hex
      description: "Key code low byte (see Key code list)"
    - name: DATA02
      type: hex
      description: "Key code high byte"

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  # DATA01: 06h Periphery Focus
  # DATA02: 00h stop; 01h/02h/03h/7Fh plus direction; 81h/FDh/FEh/FFh minus direction
  params:
    - name: DATA01
      type: hex
      description: "Lens control target (06h Periphery Focus)"
    - name: DATA02
      type: hex
      description: "Lens drive direction/duration"

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: hex
      description: "Lens control target"

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  # DATA01: FFh Stop
  # DATA02: 00h absolute, 02h relative
  # DATA03/DATA04: 16-bit adjustment value
  params:
    - name: DATA01
      type: hex
      description: "Lens control flag (FFh Stop)"
    - name: DATA02
      type: hex
      description: "Adjustment mode (00h absolute, 02h relative)"
    - name: DATA03
      type: hex
      description: "Adjustment value low-order 8 bits"
    - name: DATA04
      type: hex
      description: "Adjustment value high-order 8 bits"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 00h MOVE, 01h STORE, 02h RESET
  params:
    - name: DATA01
      type: hex
      description: "Lens memory operation (00h MOVE, 01h STORE, 02h RESET)"

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 00h MOVE, 01h STORE, 02h RESET
  params:
    - name: DATA01
      type: hex
      description: "Reference lens memory operation (00h MOVE, 01h STORE, 02h RESET)"

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE
  params:
    - name: DATA01
      type: hex
      description: "Lens memory option (00h LOAD BY SIGNAL, 01h FORCED MUTE)"

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  # DATA01: 00h LOAD BY SIGNAL, 01h FORCED MUTE
  # DATA02: 00h OFF, 01h ON
  params:
    - name: DATA01
      type: hex
      description: "Lens memory option (00h LOAD BY SIGNAL, 01h FORCED MUTE)"
    - name: DATA02
      type: hex
      description: "Setting value (00h OFF, 01h ON)"

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 00h Profile 1, 01h Profile 2
  params:
    - name: DATA01
      type: hex
      description: "Profile number (00h Profile 1, 01h Profile 2)"

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  # DATA01: 00h PICTURE/BRIGHTNESS, 01h PICTURE/CONTRAST, 02h PICTURE/COLOR,
  #         03h PICTURE/HUE, 04h PICTURE/SHARPNESS, 05h VOLUME,
  #         96h LAMP ADJUST/LIGHT ADJUST
  params:
    - name: DATA01
      type: hex
      description: "Adjusted value name"

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  # DATA01: 01h freeze on, 02h freeze off
  params:
    - name: DATA01
      type: hex
      description: "Freeze state (01h on, 02h off)"

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  # DATA01: 03h horizontal synchronous frequency, 04h vertical synchronous frequency
  params:
    - name: DATA01
      type: hex
      description: "Information type (03h H-sync, 04h V-sync)"

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  # DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1,
  #         09h SUB INPUT 2, 0Ah SUB INPUT 3
  params:
    - name: DATA01
      type: hex
      description: "PIP/PBP target item"

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  # DATA01: eco mode value, see Appendix
  params:
    - name: DATA01
      type: hex
      description: "Eco mode value (see Appendix Supplementary Information by Command)"

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  # DATA01-DATA16: projector name (up to 16 bytes, NUL-terminated)
  params:
    - name: projector_name
      type: string
      description: "Up to 16 bytes, NUL-terminated"

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  # DATA01: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1,
  #         09h SUB INPUT 2, 0Ah SUB INPUT 3
  # DATA02: per DATA01 mode (00h PIP / 01h PICTURE BY PICTURE for MODE; etc.)
  params:
    - name: DATA01
      type: hex
      description: "PIP/PBP target item"
    - name: DATA02
      type: hex
      description: "Setting value (depends on DATA01)"

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  # DATA01: 00h OFF, 01h ON
  params:
    - name: DATA01
      type: hex
      description: "Edge blending setting (00h OFF, 01h ON)"

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  # DATA01: input terminal, see Appendix
  # DATA02: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER
  params:
    - name: DATA01
      type: hex
      description: "Input terminal (see Appendix Supplementary Information by Command)"
    - name: DATA02
      type: hex
      description: "Audio source (00h DATA01, 01h BNC, 02h COMPUTER)"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, network_standby, power_saving]  # from RUNNING STATUS / BASIC INFORMATION
- id: picture_mute_state
  type: enum
  values: [off, on]
- id: sound_mute_state
  type: enum
  values: [off, on]
- id: onscreen_mute_state
  type: enum
  values: [off, on]
- id: forced_onscreen_mute_state
  type: enum
  values: [off, on]
- id: cover_state
  type: enum
  values: [normal, cover_closed]
- id: freeze_state
  type: enum
  values: [off, on]
- id: lamp1_usage_seconds
  type: integer
  description: "Lamp 1 usage time in seconds (LAMP INFORMATION REQUEST 3)"
- id: lamp1_remaining_life_percent
  type: integer
  description: "Lamp 1 remaining life percentage (LAMP INFORMATION REQUEST 3)"
- id: lamp2_usage_seconds
  type: integer
  description: "Lamp 2 usage time in seconds (two-lamp models only)"
- id: lamp2_remaining_life_percent
  type: integer
  description: "Lamp 2 remaining life percentage (two-lamp models only)"
- id: filter_usage_seconds
  type: integer
  description: "Filter usage time in seconds"
- id: filter_alarm_start_seconds
  type: integer
  description: "Filter alarm start time in seconds (-1 if undefined)"
- id: total_carbon_savings_kg
  type: number
  description: "Total carbon savings in kilograms (max 99999)"
- id: carbon_savings_during_operation_kg
  type: number
  description: "Carbon savings during operation in kilograms (max 99999)"
- id: projector_name
  type: string
  description: "Projector name (up to 16 bytes, NUL-terminated)"
- id: model_name
  type: string
  description: "Model name string (NUL-terminated)"
- id: serial_number
  type: string
  description: "Serial number string (NUL-terminated)"
- id: mac_address
  type: string
  description: "6-byte MAC address"
- id: h_sync_hz
  type: string
  description: "Horizontal synchronous frequency label string"
- id: v_sync_hz
  type: string
  description: "Vertical synchronous frequency label string"
- id: eco_mode
  type: enum
  description: "Eco/Light/Lamp mode (specific values in Appendix)"
  values: []  # UNRESOLVED: enum values in Appendix
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
- id: pip_pbp_start_position
  type: enum
  values: [top_left, top_right, bottom_left, bottom_right]
- id: edge_blending
  type: enum
  values: [off, on]
- id: lens_memory_load_by_signal
  type: enum
  values: [off, on]
- id: lens_memory_forced_mute
  type: enum
  values: [off, on]
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
- id: error_status
  type: object
  description: "12-byte error status bitmap (cover, fan, temperature, lamp, formatter, ballast, interlock, etc.)"
```

## Variables
```yaml
# None defined; all settable values are discrete actions.
```

## Events
```yaml
# UNRESOLVED: source describes only command/response pairs, no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source does not state confirmation requirements
interlocks:
  - id: power_on_in_progress
    description: "While POWER ON is in progress, no other command can be accepted."
    source: "3.2 [015. POWER ON]"
  - id: power_off_in_progress
    description: "While POWER OFF is in progress (including cooling time), no other command can be accepted."
    source: "3.3 [016. POWER OFF]"
```

## Notes
- Frame format: every command frame is `CMD_HIGH CMD_LOW 00h 00h LEN DATA... CKS` (with some exceptions that omit LEN for zero-data commands). Response frames begin with the high nibble of CMD_HIGH ORed with 0x20 (e.g. `02h 00h` command → `22h 00h` completion response, `A2h 00h` error response).
- Checksum: low-order byte of the sum of all preceding bytes. Example: `20h + 81h + 01h + 60h + 01h + 00h = 103h` → CKS = `03h`.
- The response header contains `<ID1>` (control ID) and `<ID2>` (model code) before the LEN field; these are device-specific and not provided in the source.
- All command frames use `00h 00h` in the position the source labels as "ID1 ID2". Real deployments must substitute the actual device control ID and model code.
- Some parameter values (input terminal, aspect, eco mode, base model type, sub-input) reference an Appendix "Supplementary Information by Command" that is not included in the source — those specific enum codes are not enumerated here.
- PIP/PICTURE BY PICTURE sub-input selection has three variants: SUB INPUT / SUB INPUT 1, SUB INPUT 2, SUB INPUT 3.
- Source lists five supported serial baud rates: 115200, 38400, 19200, 9600, 4800 bps.
- The LAN connection is full TCP/IP (no UDP) at 10/100 Mbps; only TCP port 7142 is documented.
- Lamp usage time is reported in seconds, but internally updated at one-minute intervals; filter usage is reported in seconds.
- Document revision: BDT140013 Revision 7.1.
- UNRESOLVED: firmware version compatibility not stated in source.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-24T00:28:47.205Z
last_checked_at: 2026-10-01T10:41:17.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T10:41:17.924Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source command bytes verbatim; transport (port 7142, baud list) is in source; source's 53-command catalogue is fully represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source references an Appendix \"Supplementary Information by Command\" for input terminal, aspect, eco mode, base model type, and sub-input values; that appendix is not included, so enum values for those sub-mnemonics are not enumerated here. ID1 (control ID) and ID2 (model code) values are device-specific and not provided."
- "enum values in Appendix"
- "source describes only command/response pairs, no unsolicited notifications."
- "source does not describe multi-step sequences."
- "source does not state confirmation requirements"
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
