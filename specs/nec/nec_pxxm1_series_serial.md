---
spec_id: admin/nec-pxxm1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC PXXM1 Series Control Spec"
manufacturer: NEC
model_family: "PXXM1 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "PXXM1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:46:43.278Z
last_checked_at: 2026-06-11T13:44:54.483Z
generated_at: 2026-06-11T13:44:54.483Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "appendix \"Supplementary Information by Command\" referenced but not included — input terminal values, aspect values, eco mode values, base model type values, sub input values not fully enumerated"
  - "exact model names within PXXM1 Series not stated"
  - "wireless LAN communication specifics not stated (referred to wireless LAN unit manual)"
  - "source lists multiple rates (115200/38400/19200/9600/4800); default unknown"
  - "flow control not stated"
  - "min not stated"
  - "max not stated"
  - "no unsolicited notification events described in source"
  - "no multi-step sequences described in source"
  - "source notes \"no other command can be accepted\" during power on/off"
  - "appendix \"Supplementary Information by Command\" not provided — input terminal byte values, aspect values, eco mode enum values, base model type values, sub input values cannot be fully populated"
  - "exact range limits for picture/volume/lamp adjust parameters — GAIN PARAMETER REQUEST 3 returns these dynamically per device"
  - "flow_control setting for serial"
  - "default baud rate — source lists 5 rates (115200/38400/19200/9600/4800) but does not specify which is default"
verification:
  verdict: verified
  checked_at: 2026-06-11T13:44:54.483Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# NEC PXXM1 Series Control Spec

## Summary

NEC PXXM1 Series projectors controlled via RS-232C serial or TCP/IP (wired/wireless LAN). Binary command protocol with hex payloads, checksum bytes, and parameterized data fields. Covers power, input switching, picture/sound/onscreen mute, lens control, lens memory, eco mode, edge blending, PIP/PbP, freeze, volume/picture adjust, and various status queries.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" referenced but not included — input terminal values, aspect values, eco mode values, base model type values, sub input values not fully enumerated -->
<!-- UNRESOLVED: exact model names within PXXM1 Series not stated -->
<!-- UNRESOLVED: wireless LAN communication specifics not stated (referred to wireless LAN unit manual) -->

## Transport

```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # UNRESOLVED: source lists multiple rates (115200/38400/19200/9600/4800); default unknown
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands
  - routable     # inferred from INPUT SW CHANGE command
  - queryable    # inferred from multiple REQUEST commands
  - levelable    # inferred from VOLUME ADJUST / PICTURE ADJUST commands
```

## Actions

```yaml
actions:
  - id: error_status_request
    label: Error Status Request
    kind: query
    command: "00h 88h 00h 00h 00h 88h"
    params: []
    notes: "Returns 12 bytes of error bitfield (DATA01-DATA12). Command code 009."

  - id: power_on
    label: Power On
    kind: action
    command: "02h 00h 00h 00h 00h 02h"
    params: []
    notes: "No other commands accepted during power-on sequence. Command code 015."

  - id: power_off
    label: Power Off
    kind: action
    command: "02h 01h 00h 00h 00h 03h"
    params: []
    notes: "No other commands accepted during power-off including cooling time. Command code 016."

  - id: input_sw_change
    label: Input Switch Change
    kind: action
    command: "02h 03h 00h 00h 02h 01h {input} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte (e.g. 06h for Video). See appendix."
    notes: "Command code 018. Input terminal values defined in appendix Supplementary Information by Command."

  - id: picture_mute_on
    label: Picture Mute On
    kind: action
    command: "02h 10h 00h 00h 00h 12h"
    params: []
    notes: "Command code 020. Mute cancelled by input/signal switch."

  - id: picture_mute_off
    label: Picture Mute Off
    kind: action
    command: "02h 11h 00h 00h 00h 13h"
    params: []
    notes: "Command code 021."

  - id: sound_mute_on
    label: Sound Mute On
    kind: action
    command: "02h 12h 00h 00h 00h 14h"
    params: []
    notes: "Command code 022. Mute cancelled by input/signal switch or volume adjust."

  - id: sound_mute_off
    label: Sound Mute Off
    kind: action
    command: "02h 13h 00h 00h 00h 15h"
    params: []
    notes: "Command code 023."

  - id: onscreen_mute_on
    label: Onscreen Mute On
    kind: action
    command: "02h 14h 00h 00h 00h 16h"
    params: []
    notes: "Command code 024. Mute cancelled by input/signal switch."

  - id: onscreen_mute_off
    label: Onscreen Mute Off
    kind: action
    command: "02h 15h 00h 00h 00h 17h"
    params: []
    notes: "Command code 025."

  - id: picture_adjust
    label: Picture Adjust
    kind: action
    command: "03h 10h 00h 00h 05h {target} FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits"
    notes: "Command code 030-1."

  - id: volume_adjust
    label: Volume Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 05h 00h {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits"
    notes: "Command code 030-2."

  - id: aspect_adjust
    label: Aspect Adjust
    kind: action
    command: "03h 10h 00h 00h 05h 18h 00h 00h {value} 00h {checksum}"
    params:
      - name: value
        type: integer
        description: "Aspect value. See appendix Supplementary Information by Command."
    notes: "Command code 030-12."

  - id: other_adjust_lamp_light
    label: Other Adjust (Lamp/Light Adjust)
    kind: action
    command: "03h 10h 00h 00h 05h 96h FFh {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: mode
        type: integer
        description: "00h=Absolute, 01h=Relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits"
    notes: "Command code 030-15. DATA01=96h DATA02=FFh for LAMP ADJUST / LIGHT ADJUST."

  - id: information_request
    label: Information Request
    kind: query
    command: "03h 8Ah 00h 00h 00h 8Dh"
    params: []
    notes: "Command code 037. Returns projector name (DATA01-49), lamp usage time in seconds (DATA83-86), filter usage time (DATA87-90)."

  - id: filter_usage_info_request
    label: Filter Usage Information Request
    kind: query
    command: "03h 95h 00h 00h 00h 98h"
    params: []
    notes: "Command code 037-3. Returns filter usage time (DATA01-04) and filter alarm start time (DATA05-08) in seconds."

  - id: lamp_info_request_3
    label: Lamp Information Request 3
    kind: query
    command: "03h 96h 00h 00h 02h {lamp} {content} {checksum}"
    params:
      - name: lamp
        type: integer
        description: "00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
      - name: content
        type: integer
        description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"
    notes: "Command code 037-4."

  - id: carbon_savings_info_request
    label: Carbon Savings Information Request
    kind: query
    command: "03h 9Ah 00h 00h 01h {type} {checksum}"
    params:
      - name: type
        type: integer
        description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    notes: "Command code 037-6. Returns kg (DATA02-05) and mg (DATA06-09)."

  - id: remote_key_code
    label: Remote Key Code
    kind: action
    command: "02h 0Fh 00h 00h 02h {key_lo} {key_hi} {checksum}"
    params:
      - name: key_lo
        type: integer
        description: "Key code low byte (see key code list in source)"
      - name: key_hi
        type: integer
        description: "Key code high byte (see key code list in source)"
    notes: "Command code 050. Key codes include POWER ON(02h/00h), POWER OFF(03h/00h), AUTO(05h/00h), MENU(06h/00h), UP(07h/00h), DOWN(08h/00h), RIGHT(09h/00h), LEFT(0Ah/00h), ENTER(0Bh/00h), EXIT(0Ch/00h), HELP(0Dh/00h), MAGNIFY UP(0Fh/00h), MAGNIFY DOWN(10h/00h), MUTE(13h/00h), PICTURE(29h/00h), COMPUTER1(4Bh/00h), COMPUTER2(4Ch/00h), VIDEO1(4Fh/00h), S-VIDEO1(51h/00h), VOLUME UP(84h/00h), VOLUME DOWN(85h/00h), FREEZE(8Ah/00h), ASPECT(A3h/00h), SOURCE(D7h/00h), LAMP MODE/ECO(EEh/00h)."

  - id: shutter_close
    label: Shutter Close
    kind: action
    command: "02h 16h 00h 00h 00h 18h"
    params: []
    notes: "Command code 051."

  - id: shutter_open
    label: Shutter Open
    kind: action
    command: "02h 17h 00h 00h 00h 19h"
    params: []
    notes: "Command code 052."

  - id: lens_control
    label: Lens Control
    kind: action
    command: "02h 18h 00h 00h 02h {target} {action} {checksum}"
    params:
      - name: target
        type: integer
        description: "06h=Periphery Focus"
      - name: action
        type: integer
        description: "00h=Stop, 01h=Drive +1s, 02h=Drive +0.5s, 03h=Drive +0.25s, 7Fh=Drive +continuous, 81h=Drive -continuous, FDh=Drive -0.25s, FEh=Drive -0.5s, FFh=Drive -1s"
    notes: "Command code 053. Can issue same command to redirect without stopping."

  - id: lens_control_request
    label: Lens Control Request
    kind: query
    command: "02h 1Ch 00h 00h 02h {target} 00h {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens adjustment target byte"
    notes: "Command code 053-1. Returns upper limit, lower limit, current value (16-bit each)."

  - id: lens_control_2
    label: Lens Control 2
    kind: action
    command: "02h 1Dh 00h 00h 04h {target} {mode} {value_lo} {value_hi} {checksum}"
    params:
      - name: target
        type: integer
        description: "Lens target (FFh=Stop)"
      - name: mode
        type: integer
        description: "00h=Absolute, 02h=Relative"
      - name: value_lo
        type: integer
        description: "Adjustment value low-order 8 bits"
      - name: value_hi
        type: integer
        description: "Adjustment value high-order 8 bits"
    notes: "Command code 053-2. If Stop (FFh), mode and value not referenced."

  - id: lens_memory_control
    label: Lens Memory Control
    kind: action
    command: "02h 1Eh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Command code 053-3."

  - id: reference_lens_memory_control
    label: Reference Lens Memory Control
    kind: action
    command: "02h 1Fh 00h 00h 01h {operation} {checksum}"
    params:
      - name: operation
        type: integer
        description: "00h=MOVE, 01h=STORE, 02h=RESET"
    notes: "Command code 053-4. Controls profile number set via LENS PROFILE SET."

  - id: lens_memory_option_request
    label: Lens Memory Option Request
    kind: query
    command: "02h 20h 00h 00h 01h {option} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    notes: "Command code 053-5. Returns setting value (00h=OFF, 01h=ON)."

  - id: lens_memory_option_set
    label: Lens Memory Option Set
    kind: action
    command: "02h 21h 00h 00h 02h {option} {value} {checksum}"
    params:
      - name: option
        type: integer
        description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"
    notes: "Command code 053-6."

  - id: lens_information_request
    label: Lens Information Request
    kind: query
    command: "02h 22h 00h 00h 01h 00h 25h"
    params: []
    notes: "Command code 053-7. Returns byte with bitfield: Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V (0=Stop, 1=During operation)."

  - id: lens_profile_set
    label: Lens Profile Set
    kind: action
    command: "02h 27h 00h 00h 01h {profile} {checksum}"
    params:
      - name: profile
        type: integer
        description: "00h=Profile 1, 01h=Profile 2"
    notes: "Command code 053-10. Selects profile for reference lens memory."

  - id: lens_profile_request
    label: Lens Profile Request
    kind: query
    command: "02h 28h 00h 00h 00h 2Ah"
    params: []
    notes: "Command code 053-11. Returns current profile number (00h=Profile 1, 01h=Profile 2)."

  - id: gain_parameter_request_3
    label: Gain Parameter Request 3
    kind: query
    command: "03h 05h 00h 00h 03h {name} 00h 00h {checksum}"
    params:
      - name: name
        type: integer
        description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness, 05h=Volume, 96h=Lamp/Light Adjust"
    notes: "Command code 060-1. Returns status, upper/lower/default/current values, adjustment widths."

  - id: setting_request
    label: Setting Request
    kind: query
    command: "00h 85h 00h 00h 01h 00h 86h"
    params: []
    notes: "Command code 078-1. Returns base model type, sound function, profile number."

  - id: running_status_request
    label: Running Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 01h 87h"
    params: []
    notes: "Command code 078-2. Returns power status, cooling status, power on/off process, operation status."

  - id: input_status_request
    label: Input Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 02h 88h"
    params: []
    notes: "Command code 078-3. Returns signal switch process, signal list number, selection signal types, test pattern status, content displayed."

  - id: mute_status_request
    label: Mute Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 03h 89h"
    params: []
    notes: "Command code 078-4. Returns picture mute, sound mute, onscreen mute, forced onscreen mute, OSD display status."

  - id: model_name_request
    label: Model Name Request
    kind: query
    command: "00h 85h 00h 00h 01h 04h 8Ah"
    params: []
    notes: "Command code 078-5. Returns model name as NUL-terminated string."

  - id: cover_status_request
    label: Cover Status Request
    kind: query
    command: "00h 85h 00h 00h 01h 05h 8Bh"
    params: []
    notes: "Command code 078-6. Returns 00h=Normal (cover open), 01h=Cover closed."

  - id: freeze_control
    label: Freeze Control
    kind: action
    command: "01h 98h 00h 00h 01h {state} {checksum}"
    params:
      - name: state
        type: integer
        description: "01h=Freeze On, 02h=Freeze Off"
    notes: "Command code 079."

  - id: information_string_request
    label: Information String Request
    kind: query
    command: "00h D0h 00h 00h 03h 00h {type} 01h {checksum}"
    params:
      - name: type
        type: integer
        description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    notes: "Command code 084. Returns label + information string."

  - id: eco_mode_request
    label: Eco Mode Request
    kind: query
    command: "03h B0h 00h 00h 01h 07h BBh"
    params: []
    notes: "Command code 097-8. Returns eco/light/lamp mode value. See appendix."

  - id: lan_projector_name_request
    label: LAN Projector Name Request
    kind: query
    command: "03h B0h 00h 00h 01h 2Ch E0h"
    params: []
    notes: "Command code 097-45. Returns projector name as NUL-terminated string (up to 17 bytes)."

  - id: lan_mac_address_request
    label: LAN MAC Address Request
    kind: query
    command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
    params: []
    notes: "Command code 097-155. Returns 6-byte MAC address."

  - id: pip_pbp_request
    label: PIP/Picture by Picture Request
    kind: query
    command: "03h B0h 00h 00h 02h C5h {param} {checksum}"
    params:
      - name: param
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    notes: "Command code 097-198."

  - id: edge_blending_mode_request
    label: Edge Blending Mode Request
    kind: query
    command: "03h B0h 00h 00h 02h DFh 00h 94h"
    params: []
    notes: "Command code 097-243-1. Returns 00h=OFF, 01h=ON."

  - id: eco_mode_set
    label: Eco Mode Set
    kind: action
    command: "03h B1h 00h 00h 02h 07h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "Eco mode value. See appendix Supplementary Information by Command."
    notes: "Command code 098-8."

  - id: lan_projector_name_set
    label: LAN Projector Name Set
    kind: action
    command: "03h B1h 00h 00h 12h 2Ch {name_bytes} 00h {checksum}"
    params:
      - name: name_bytes
        type: string
        description: "Projector name, up to 16 bytes"
    notes: "Command code 098-45."

  - id: pip_pbp_set
    label: PIP/Picture by Picture Set
    kind: action
    command: "03h B1h 00h 00h 03h C5h {param} {value} {checksum}"
    params:
      - name: param
        type: integer
        description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
      - name: value
        type: integer
        description: "MODE: 00h=PIP/01h=PbP; START POSITION: 00h=TL/01h=TR/02h=BL/03h=BR; SUB INPUT: see appendix"
    notes: "Command code 098-198."

  - id: edge_blending_mode_set
    label: Edge Blending Mode Set
    kind: action
    command: "03h B1h 00h 00h 03h DFh 00h {value} {checksum}"
    params:
      - name: value
        type: integer
        description: "00h=OFF, 01h=ON"
    notes: "Command code 098-243-1."

  - id: base_model_type_request
    label: Base Model Type Request
    kind: query
    command: "00h BFh 00h 00h 01h 00h C0h"
    params: []
    notes: "Command code 305-1. Returns base model type and model name."

  - id: serial_number_request
    label: Serial Number Request
    kind: query
    command: "00h BFh 00h 00h 02h 01h 06h C8h"
    params: []
    notes: "Command code 305-2. Returns serial number as NUL-terminated string."

  - id: basic_information_request
    label: Basic Information Request
    kind: query
    command: "00h BFh 00h 00h 01h 02h C2h"
    params: []
    notes: "Command code 305-3. Returns operation status, content displayed, signal types, mute/freeze status."

  - id: audio_select_set
    label: Audio Select Set
    kind: action
    command: "03h C9h 00h 00h 03h 09h {input} {value} {checksum}"
    params:
      - name: input
        type: integer
        description: "Input terminal byte. See appendix."
      - name: value
        type: integer
        description: "00h=Terminal specified in input, 01h=BNC, 02h=COMPUTER"
    notes: "Command code 319-10."
```

## Feedbacks

```yaml
feedbacks:
  - id: error_status
    type: binary_bitfield
    description: "12-byte error bitfield from ERROR STATUS REQUEST. Bits encode cover error, fan error, temperature error, power error, lamp status, formatter error, FPGA error, mirror cover error, ballast comm error, iris calibration error, lens error, interlock switch, system errors."
    notes: "See error information list in source for full bit mapping."

  - id: power_status
    type: enum
    values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
    notes: "From RUNNING STATUS REQUEST DATA06."

  - id: mute_status
    type: composite
    description: "Picture mute, sound mute, onscreen mute, forced onscreen mute - each on/off"
    notes: "From MUTE STATUS REQUEST DATA01-04."

  - id: input_status
    type: composite
    description: "Signal switch process, signal list number, selection signal types 1 & 2, signal list type, test pattern, content displayed"
    notes: "From INPUT STATUS REQUEST."

  - id: cover_status
    type: enum
    values: [normal_open, closed]

  - id: lens_operation_status
    type: binary_bitfield
    description: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift H, Bit4=Lens Shift V. 0=Stop, 1=During operation."
    notes: "From LENS INFORMATION REQUEST."

  - id: execution_result
    type: enum
    values: [success, error]
    description: "Generic execution result returned in DATA01+DATA02 of many command responses. 0000h=success, other=error."
```

## Variables

```yaml
variables:
  - id: brightness
    type: integer
    min: null  # UNRESOLVED: min not stated
    max: null  # UNRESOLVED: max not stated
    description: "Picture brightness"

  - id: contrast
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Picture contrast"

  - id: color
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Picture color"

  - id: hue
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Picture hue"

  - id: sharpness
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Picture sharpness"

  - id: volume
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Sound volume"

  - id: lamp_adjust
    type: integer
    min: null  # UNRESOLVED
    max: null  # UNRESOLVED
    description: "Lamp/Light adjust value"

  - id: lamp_usage_time
    type: integer
    unit: seconds
    description: "Lamp usage time in seconds, updated at one-minute intervals"

  - id: lamp_remaining_life
    type: integer
    unit: percent
    description: "Lamp remaining life percentage. Negative if replacement deadline exceeded."

  - id: filter_usage_time
    type: integer
    unit: seconds
    description: "Filter usage time in seconds"

  - id: eco_mode
    type: integer
    description: "Eco/Light/Lamp mode setting"
    notes: "Values defined in appendix Supplementary Information by Command."

  - id: projector_name
    type: string
    max_length: 16
    description: "LAN projector name"
```

## Events

```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes "no other command can be accepted" during power on/off
# sequences, but no explicit safety interlocks or confirmation requirements stated.
```

## Notes

- Binary protocol: all commands and responses are hex byte sequences. Commands include embedded checksum (CKS) computed as low-order byte of sum of all preceding bytes.
- Response format distinguishes success (response with data or no-data) from failure (ERR1+ERR2 error codes).
- Commands use `<ID1>` (control ID) and `<ID2>` (model code) parameters in responses — values are model-dependent.
- Many command references point to an appendix ("Supplementary Information by Command") for input terminal values, aspect values, eco mode values, and base model types — this appendix was not included in the source.
- Power On and Power Off commands block all other commands during their execution (including cooling period for power off).
- Picture mute, sound mute, and onscreen mute are automatically cancelled by input/signal switch. Sound mute also cancelled by volume adjustment.
- Lamp usage time obtained in one-second units but updated at one-minute intervals.
- Two-lamp models: Lamp 2 addressed via DATA01=01h in lamp information requests.
- Wireless LAN details deferred to wireless LAN unit's operation manual.
- Document revision: BDT140013 Revision 7.1.

<!-- UNRESOLVED: appendix "Supplementary Information by Command" not provided — input terminal byte values, aspect values, eco mode enum values, base model type values, sub input values cannot be fully populated -->
<!-- UNRESOLVED: exact range limits for picture/volume/lamp adjust parameters — GAIN PARAMETER REQUEST 3 returns these dynamically per device -->
<!-- UNRESOLVED: flow_control setting for serial -->
<!-- UNRESOLVED: default baud rate — source lists 5 rates (115200/38400/19200/9600/4800) but does not specify which is default -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-22T22:46:43.278Z
last_checked_at: 2026-06-11T13:44:54.483Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:44:54.483Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally in source; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "appendix \"Supplementary Information by Command\" referenced but not included — input terminal values, aspect values, eco mode values, base model type values, sub input values not fully enumerated"
- "exact model names within PXXM1 Series not stated"
- "wireless LAN communication specifics not stated (referred to wireless LAN unit manual)"
- "source lists multiple rates (115200/38400/19200/9600/4800); default unknown"
- "flow control not stated"
- "min not stated"
- "max not stated"
- "no unsolicited notification events described in source"
- "no multi-step sequences described in source"
- "source notes \"no other command can be accepted\" during power on/off"
- "appendix \"Supplementary Information by Command\" not provided — input terminal byte values, aspect values, eco mode enum values, base model type values, sub input values cannot be fully populated"
- "exact range limits for picture/volume/lamp adjust parameters — GAIN PARAMETER REQUEST 3 returns these dynamically per device"
- "flow_control setting for serial"
- "default baud rate — source lists 5 rates (115200/38400/19200/9600/4800) but does not specify which is default"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
