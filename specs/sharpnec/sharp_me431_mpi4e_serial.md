---
spec_id: admin/sharp-nec-me431-mpi4e
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Me431 Mpi4E Control Spec"
manufacturer: Sharp/NEC
model_family: "Me431 Mpi4E"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Me431 Mpi4E"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:26:38.514Z
last_checked_at: 2026-06-18T08:28:25.862Z
generated_at: 2026-06-18T08:28:25.862Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Me431 Mpi4E\" supplied by operator; source document titled generically \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not print the model name in-text. Input terminal value table, aspect value table, eco mode value table, and base model type value table are referenced as \"Supplementary Information by Command\" appendix not included in this source."
  - "flow control not stated (full duplex stated)"
  - "no event/notification mechanism described in source."
  - "no multi-step command sequences described in source."
  - "no additional safety warnings or interlock procedures stated beyond power-on/off command lockout."
  - "appendix value tables for input terminal, aspect, eco mode, base model type, and sub input not present in source."
  - "firmware version compatibility not stated in source."
  - "wireless LAN unit specifications not detailed in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:28:25.862Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Me431 Mpi4E Control Spec

## Summary
Sharp/NEC projector control spec covering the Me431 Mpi4E model. Supports RS-232C serial and TCP/IP (wired/wireless LAN) control using a binary hex command protocol with checksums. Covers power, input switching, picture/volume adjustment, lens control, lens memory, mute, freeze, shutter, eco mode, edge blending, PiP/PbP, and numerous status/information query commands.

<!-- UNRESOLVED: model name "Me431 Mpi4E" supplied by operator; source document titled generically "Projector Control Command Reference Manual" (BDT140013 Rev 7.1) and does not print the model name in-text. Input terminal value table, aspect value table, eco mode value table, and base model type value table are referenced as "Supplementary Information by Command" appendix not included in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists switchable: 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated (full duplex stated)
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from POWER ON/OFF commands (015/016)
  - queryable    # inferred from numerous REQUEST commands
  - routable     # inferred from INPUT SW CHANGE command (018)
  - levelable    # inferred from VOLUME ADJUST / PICTURE ADJUST commands (030-1/030-2)
```

## Actions
```yaml
actions:
  # 009. ERROR STATUS REQUEST
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []

  # 015. POWER ON
  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []

  # 016. POWER OFF
  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []

  # 018. INPUT SW CHANGE
  - id: input_sw_change
    label: Input SW Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Input terminal value (e.g. 06h = video port). See appendix 'Supplementary Information by Command' for full value table."
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 020. PICTURE MUTE ON
  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []

  # 021. PICTURE MUTE OFF
  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []

  # 022. SOUND MUTE ON
  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []

  # 023. SOUND MUTE OFF
  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []

  # 024. ONSCREEN MUTE ON
  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []

  # 025. ONSCREEN MUTE OFF
  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []

  # 030-1. PICTURE ADJUST
  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 030-2. VOLUME ADJUST
  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data02
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data03
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 030-12. ASPECT ADJUST
  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Aspect value. See appendix 'Supplementary Information by Command' for value table."
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 030-15. OTHER ADJUST
  - id: other_adjust
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {checksum}"
    params:
      - name: data01
        type: string
        description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
      - name: data02
        type: string
        description: "Adjustment target low byte: FFh (fixed for LAMP ADJUST)"
      - name: data03
        type: string
        description: "Adjustment mode: 00h=absolute, 01h=relative"
      - name: data04
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data05
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 037. INFORMATION REQUEST
  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []

  # 037-3. FILTER USAGE INFORMATION REQUEST
  - id: filter_usage_information_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []

  # 037-4. LAMP INFORMATION REQUEST 3
  - id: lamp_information_request
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lamp number: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: data02
        type: string
        description: "Content: 01h=usage time (seconds), 04h=remaining life (%)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 037-6. CARBON SAVINGS INFORMATION REQUEST
  - id: carbon_savings_information_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 050. REMOTE KEY CODE
  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Key code low byte. Key code list: POWER ON=02h, POWER OFF=03h, AUTO=05h, MENU=06h, UP=07h, DOWN=08h, RIGHT=09h, LEFT=0Ah, ENTER=0Bh, EXIT=0Ch, HELP=0Dh, MAGNIFY UP=0Fh, MAGNIFY DOWN=10h, MUTE=13h, PICTURE=29h, COMPUTER1=4Bh, COMPUTER2=4Ch, VIDEO1=4Fh, S-VIDEO1=51h, VOLUME UP=84h, VOLUME DOWN=85h, FREEZE=8Ah, ASPECT=A3h, SOURCE=D7h, LAMP MODE/ECO=EEh"
      - name: data02
        type: string
        description: "Key code high byte (00h for all listed keys)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 051. SHUTTER CLOSE
  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []

  # 052. SHUTTER OPEN
  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []

  # 053. LENS CONTROL
  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lens target (e.g. 06h=Periphery Focus)"
      - name: data02
        type: string
        description: "Drive: 00h=Stop, 01h=1s plus, 02h=0.5s plus, 03h=0.25s plus, 7Fh=plus continuous, 81h=minus continuous, FDh=0.25s minus, FEh=0.5s minus, FFh=1s minus"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-1. LENS CONTROL REQUEST
  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {data01} 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Lens target (same values as LENS CONTROL data01)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-2. LENS CONTROL 2
  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {checksum}"
    params:
      - name: data01
        type: string
        description: "Lens target (FFh=Stop)"
      - name: data02
        type: string
        description: "Adjustment mode: 00h=absolute, 02h=relative"
      - name: data03
        type: integer
        description: "Adjustment value (low-order 8 bits)"
      - name: data04
        type: integer
        description: "Adjustment value (high-order 8 bits)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-3. LENS MEMORY CONTROL
  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-4. REFERENCE LENS MEMORY CONTROL
  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Operation: 00h=MOVE, 01h=STORE, 02h=RESET"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-5. LENS MEMORY OPTION REQUEST
  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-6. LENS MEMORY OPTION SET
  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: data02
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-7. LENS INFORMATION REQUEST
  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []

  # 053-10. LENS PROFILE SET
  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Profile number: 00h=Profile 1, 01h=Profile 2"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 053-11. LENS PROFILE REQUEST
  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []

  # 060-1. GAIN PARAMETER REQUEST 3
  - id: gain_parameter_request
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {data01} 00h 00h {checksum}"
    params:
      - name: data01
        type: string
        description: "Value name: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 078-1. SETTING REQUEST
  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []

  # 078-2. RUNNING STATUS REQUEST
  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []

  # 078-3. INPUT STATUS REQUEST
  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []

  # 078-4. MUTE STATUS REQUEST
  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []

  # 078-5. MODEL NAME REQUEST
  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []

  # 078-6. COVER STATUS REQUEST
  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []

  # 079. FREEZE CONTROL
  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "01h=Freeze on, 02h=Freeze off"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 084. INFORMATION STRING REQUEST
  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {data01} 01h {checksum}"
    params:
      - name: data01
        type: string
        description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 097-8. ECO MODE REQUEST
  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []

  # 097-45. LAN PROJECTOR NAME REQUEST
  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []

  # 097-155. LAN MAC ADDRESS STATUS REQUEST2
  - id: lan_mac_address_request
    label: LAN MAC Address Status Request 2
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []

  # 097-198. PIP/PICTURE BY PICTURE REQUEST
  - id: pip_pbp_request
    label: PIP/Picture By Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 097-243-1. EDGE BLENDING MODE REQUEST
  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []

  # 098-8. ECO MODE SET
  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Eco mode value. See appendix 'Supplementary Information by Command' for value table."
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 098-45. LAN PROJECTOR NAME SET
  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {data01-16} 00h {checksum}"
    params:
      - name: data01-16
        type: string
        description: "Projector name (up to 16 bytes)"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 098-198. PIP/PICTURE BY PICTURE SET
  - id: pip_pbp_set
    label: PIP/Picture By Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: data02
        type: string
        description: "Setting value. MODE: 00h=PIP, 01h=PbP. START POSITION: 00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT. SUB INPUT: see appendix."
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 098-243-1. EDGE BLENDING MODE SET
  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {data01} {checksum}"
    params:
      - name: data01
        type: string
        description: "Setting value: 00h=OFF, 01h=ON"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."

  # 305-1. BASE MODEL TYPE REQUEST
  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []

  # 305-2. SERIAL NUMBER REQUEST
  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []

  # 305-3. BASIC INFORMATION REQUEST
  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []

  # 319-10. AUDIO SELECT SET
  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {data01} {data02} {checksum}"
    params:
      - name: data01
        type: string
        description: "Input terminal. See appendix 'Supplementary Information by Command' for value table."
      - name: data02
        type: string
        description: "Setting value: 00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
      - name: checksum
        type: string
        description: "Checksum byte = low-order 8 bits of sum of all preceding bytes."
```

## Feedbacks
```yaml
feedbacks:
  - id: error_status
    type: bitmask
    description: >
      12-byte error information (DATA01-DATA12). Bit set to 0 = normal, 1 = error.
      Covers cover error, fan error, temperature error, power error, lamp off,
      lamp replacement moratorium, lamp usage time exceeded, formatter error,
      lamp 2 errors, ballast communication error, iris calibration error,
      lens not installed, interlock switch open, system errors.

  - id: power_state
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
    description: "From RUNNING STATUS REQUEST DATA03/DATA06 and BASIC INFORMATION REQUEST DATA01."

  - id: cooling_process
    type: enum
    values: [not_executed, during_execution]
    description: "From RUNNING STATUS REQUEST DATA04."

  - id: power_on_off_process
    type: enum
    values: [not_executed, during_execution]
    description: "From RUNNING STATUS REQUEST DATA05."

  - id: input_signal_status
    type: composite
    description: >
      Multi-field input signal status from INPUT STATUS REQUEST: signal switch
      process, signal list number, selection signal type, signal list type,
      test pattern display, content displayed.

  - id: picture_mute_state
    type: enum
    values: [off, on]
    description: "From MUTE STATUS REQUEST DATA01."

  - id: sound_mute_state
    type: enum
    values: [off, on]
    description: "From MUTE STATUS REQUEST DATA02."

  - id: onscreen_mute_state
    type: enum
    values: [off, on]
    description: "From MUTE STATUS REQUEST DATA03."

  - id: cover_status
    type: enum
    values: [normal_opened, cover_closed]
    description: "From COVER STATUS REQUEST DATA01."

  - id: lens_operation_status
    type: bitmask
    description: >
      From LENS INFORMATION REQUEST DATA01. Bit0=Lens memory, Bit1=Zoom,
      Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V). 0=Stop, 1=During operation.

  - id: eco_mode_value
    type: enum
    description: "Eco/Light/Lamp mode value. See appendix for enum values."

  - id: edge_blending_state
    type: enum
    values: [off, on]

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "From INFORMATION REQUEST or LAMP INFORMATION REQUEST 3. Updated at 1-minute intervals."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "From INFORMATION REQUEST or FILTER USAGE INFORMATION REQUEST. -1 if undefined."

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "From LAMP INFORMATION REQUEST 3. Negative if replacement deadline exceeded."

  - id: error_response
    type: composite
    description: >
      ERR1/ERR2 error code pair returned on command failure. See error code list:
      00h/00h=unrecognized, 00h/01h=not supported, 01h/00h=invalid value,
      01h/01h=invalid input terminal, 01h/02h=invalid language, 02h/00h=memory
      allocation error, 02h/02h=memory in use, 02h/03h=value cannot be set,
      02h/04h=forced onscreen mute on, 02h/06h=viewer error, 02h/07h=no signal,
      02h/08h=test pattern/filter displayed, 02h/09h=no PC card, 02h/0Ah=memory
      operation error, 02h/0Ch=entry list displayed, 02h/0Dh=power off,
      02h/0Eh=execution failed, 02h/0Fh=no authority, 03h/00h=incorrect gain
      number, 03h/01h=invalid gain, 03h/02h=adjustment failed.
```

## Variables
```yaml
variables:
  - id: brightness
    type: integer
    description: "Picture brightness. Set via PICTURE ADJUST (030-1, DATA01=00h). Query via GAIN PARAMETER REQUEST 3 (DATA01=00h)."

  - id: contrast
    type: integer
    description: "Picture contrast. Set via PICTURE ADJUST (030-1, DATA01=01h). Query via GAIN PARAMETER REQUEST 3 (DATA01=01h)."

  - id: color
    type: integer
    description: "Picture color. Set via PICTURE ADJUST (030-1, DATA01=02h). Query via GAIN PARAMETER REQUEST 3 (DATA01=02h)."

  - id: hue
    type: integer
    description: "Picture hue. Set via PICTURE ADJUST (030-1, DATA01=03h). Query via GAIN PARAMETER REQUEST 3 (DATA01=03h)."

  - id: sharpness
    type: integer
    description: "Picture sharpness. Set via PICTURE ADJUST (030-1, DATA01=04h). Query via GAIN PARAMETER REQUEST 3 (DATA01=04h)."

  - id: volume
    type: integer
    description: "Sound volume. Set via VOLUME ADJUST (030-2). Query via GAIN PARAMETER REQUEST 3 (DATA01=05h)."

  - id: lamp_adjust
    type: integer
    description: "Lamp/Light adjust. Set via OTHER ADJUST (030-15, DATA01=96h). Query via GAIN PARAMETER REQUEST 3 (DATA01=96h)."

  - id: projector_name
    type: string
    max_length: 16
    description: "LAN projector name. Set via LAN PROJECTOR NAME SET (098-45). Query via LAN PROJECTOR NAME REQUEST (097-45)."
```

## Events
```yaml
# No unsolicited notifications documented in source. All responses are command-driven.
# UNRESOLVED: no event/notification mechanism described in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on
    note: "While power-on is in progress, no other command can be accepted."
  - command: power_off
    note: "While power-off is in progress (including cooling time), no other command can be accepted."
# UNRESOLVED: no additional safety warnings or interlock procedures stated beyond power-on/off command lockout.
```

## Notes
- Manual reference: BDT140013 Revision 7.1.
- Binary protocol: all commands are hex byte sequences. Checksum (CKS) = low-order 8 bits of sum of all preceding bytes. Commands do not include ID1/ID2 (control ID / model code); responses include them.
- Response format: success responses use headers 20h/21h/22h/23h; error responses use A0h/A1h/A2h/A3h with ERR1/ERR2 fields.
- Serial connection uses a cross cable to the PC CONTROL port (D-SUB 9P). Pin assignment: 2=RxD, 3=TxD, 5=GND, 7=RTS, 8=CTS.
- LAN connection supports wired (10/100 Mbps, RJ-45) and wireless (via optional wireless LAN unit). TCP port 7142 for command send/receive over both.
- Usage time information (lamp, filter) is obtainable in one-second units but updated at one-minute intervals.
- LENS CONTROL: after sending 7Fh (plus continuous) or 81h (minus continuous), send 00h to stop. While lens is being driven, the same command can re-issue without a stop.
- Several value tables (input terminal, aspect, eco mode, base model type, sub input) are referenced as appendix "Supplementary Information by Command" which is not included in this source document.
<!-- UNRESOLVED: appendix value tables for input terminal, aspect, eco mode, base model type, and sub input not present in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: wireless LAN unit specifications not detailed in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T13:26:38.514Z
last_checked_at: 2026-06-18T08:28:25.862Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:28:25.862Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Me431 Mpi4E\" supplied by operator; source document titled generically \"Projector Control Command Reference Manual\" (BDT140013 Rev 7.1) and does not print the model name in-text. Input terminal value table, aspect value table, eco mode value table, and base model type value table are referenced as \"Supplementary Information by Command\" appendix not included in this source."
- "flow control not stated (full duplex stated)"
- "no event/notification mechanism described in source."
- "no multi-step command sequences described in source."
- "no additional safety warnings or interlock procedures stated beyond power-on/off command lockout."
- "appendix value tables for input terminal, aspect, eco mode, base model type, and sub input not present in source."
- "firmware version compatibility not stated in source."
- "wireless LAN unit specifications not detailed in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
