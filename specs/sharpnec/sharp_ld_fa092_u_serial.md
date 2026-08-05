---
spec_id: admin/sharp-nec-ld-fa092-u
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ld Fa092 U Control Spec"
manufacturer: Sharp/NEC
model_family: "Ld Fa092 U"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ld Fa092 U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:24:38.998Z
last_checked_at: 2026-07-22T07:42:00.795Z
generated_at: 2026-07-22T07:42:00.795Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is generic projector command reference; model-specific command support and model code are not stated."
  - "model-specific ID2 value not stated in source"
  - "unsolicited notifications not documented in source"
  - "no multi-step macros documented in source"
  - "model-specific ID2 code, supported-command subset, input codes, aspect values, eco-mode values, sub-input codes, and firmware compatibility require supplementary model documentation."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:42:00.795Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched with exact command codes in the source; transport parameters verified; source command inventory matches spec coverage exactly. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sharp/NEC Ld Fa092 U Control Spec

## Summary

Control spec for Sharp/NEC Ld Fa092 U projector. Source documents binary command control over RS-232C serial and TCP network connections.

<!-- UNRESOLVED: source is generic projector command reference; model-specific command support and model code are not stated. -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate:
    - 115200
    - 38400
    - 19200
    - 9600
    - 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  mode: full_duplex
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable  # inferred from power commands
- routable  # inferred from input switching command
- queryable  # inferred from request commands
- levelable  # inferred from picture, volume, and light adjustment commands
```

## Actions

```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h  88h  00h  00h  00h  88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h  00h  00h  00h  00h  02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h  01h  00h  00h  00h  03h"
  params: []

- id: input_switch
  label: Input Switch
  kind: action
  command: "02h  03h  00h  00h  02h  01h <DATA01> <CKS>"
  params:
    - name: input
      type: byte
      description: "Input-terminal code in DATA01; model-specific values are not included in source."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h  10h  00h  00h  00h  12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h  11h  00h  00h  00h  13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h  12h  00h  00h  00h  14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h  13h  00h  00h  00h  15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h  14h  00h  00h  00h  16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h  15h  00h  00h  00h  17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h  10h  00h  00h  05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      values:
        brightness: "00h"
        contrast: "01h"
        color: "02h"
        hue: "03h"
        sharpness: "04h"
    - name: mode
      type: enum
      values:
        absolute: "00h"
        relative: "01h"
    - name: value
      type: int16_le
      description: "DATA03 is low-order byte; DATA04 is high-order byte."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  05h  00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      values:
        absolute: "00h"
        relative: "01h"
    - name: value
      type: int16_le
      description: "DATA02 is low-order byte; DATA03 is high-order byte."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: byte
      description: "Model-specific aspect value; supplementary table absent from source."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: light_adjust
  label: Lamp or Light Adjust
  kind: action
  command: "03h  10h  00h  00h  05h 96h FFh <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: mode
      type: enum
      values:
        absolute: "00h"
        relative: "01h"
    - name: value
      type: int16_le
      description: "DATA04 is low-order byte; DATA05 is high-order byte."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: information_request
  label: Information Request
  kind: query
  command: "03h  8Ah  00h  00h  00h  8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h  95h  00h  00h  00h  98h"
  params: []

- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  command: "03h  96h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: enum
      values:
        lamp_1: "00h"
        lamp_2: "01h"
    - name: content
      type: enum
      values:
        usage_time_seconds: "01h"
        remaining_life_percent: "04h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h  9Ah  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: scope
      type: enum
      values:
        total: "00h"
        during_operation: "01h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h  0Fh  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key
      type: enum
      values:
        power_on: "02h 00h"
        power_off: "03h 00h"
        auto: "05h 00h"
        menu: "06h 00h"
        up: "07h 00h"
        down: "08h 00h"
        right: "09h 00h"
        left: "0Ah 00h"
        enter: "0Bh 00h"
        exit: "0Ch 00h"
        help: "0Dh 00h"
        magnify_up: "0Fh 00h"
        magnify_down: "10h 00h"
        mute: "13h 00h"
        picture: "29h 00h"
        computer_1: "4Bh 00h"
        computer_2: "4Ch 00h"
        video_1: "4Fh 00h"
        s_video_1: "51h 00h"
        volume_up: "84h 00h"
        volume_down: "85h 00h"
        freeze: "8Ah 00h"
        aspect: "A3h 00h"
        source: "D7h 00h"
        lamp_mode_eco: "EEh 00h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h  16h  00h  00h  00h  18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h  17h  00h  00h  00h  19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h  18h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: byte
      values:
        periphery_focus: "06h"
    - name: movement
      type: enum
      values:
        stop: "00h"
        plus_1_second: "01h"
        plus_half_second: "02h"
        plus_quarter_second: "03h"
        plus_continuous: "7Fh"
        minus_continuous: "81h"
        minus_quarter_second: "FDh"
        minus_half_second: "FEh"
        minus_1_second: "FFh"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h  1Ch  00h  00h  02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: byte
      description: "Lens adjustment target."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h  1Dh  00h  00h  04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: target
      type: byte
      description: "FFh stops movement; other target values are not present in source."
    - name: mode
      type: enum
      values:
        absolute: "00h"
        relative: "02h"
    - name: value
      type: int16_le
      description: "DATA03 is low-order byte; DATA04 is high-order byte."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h  1Eh  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      values:
        move: "00h"
        store: "01h"
        reset: "02h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h  1Fh  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      values:
        move: "00h"
        store: "01h"
        reset: "02h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h  20h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: option
      type: enum
      values:
        load_by_signal: "00h"
        forced_mute: "01h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h  21h  00h  00h  02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      values:
        load_by_signal: "00h"
        forced_mute: "01h"
    - name: enabled
      type: enum
      values:
        "off": "00h"
        "on": "01h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h  22h  00h  00h  01h  00h  25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h  27h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      values:
        profile_1: "00h"
        profile_2: "01h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h  05h  00h  00h  03h <DATA01> 00h  00h <CKS>"
  params:
    - name: target
      type: enum
      values:
        brightness: "00h"
        contrast: "01h"
        color: "02h"
        hue: "03h"
        sharpness: "04h"
        volume: "05h"
        lamp_or_light_adjust: "96h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h  85h  00h  00h  01h  00h  86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  01h  87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  02h  88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  03h  89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h  85h  00h  00h  01h  04h  8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h  85h  00h  00h  01h  05h  8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h  98h  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      values:
        "on": "01h"
        "off": "02h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h  D0h  00h  00h  03h  00h <DATA01> 01h <CKS>"
  params:
    - name: information_type
      type: enum
      values:
        horizontal_synchronous_frequency: "03h"
        vertical_synchronous_frequency: "04h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h  B0h  00h  00h  01h  07h  BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h  B0h  00h  00h  01h  2Ch  E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h  B0h  00h  00h  02h  9Ah  00h  4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP or Picture by Picture Request
  kind: query
  command: "03h  B0h  00h  00h  02h  C5h <DATA01> <CKS>"
  params:
    - name: setting
      type: enum
      values:
        mode: "00h"
        start_position: "01h"
        sub_input_1: "02h"
        sub_input_2: "09h"
        sub_input_3: "0Ah"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h  B0h  00h  00h  02h  DFh  00h  94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h  B1h  00h  00h  02h  07h <DATA01> <CKS>"
  params:
    - name: mode
      type: byte
      description: "Model-specific eco, light, or lamp mode value; supplementary table absent from source."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      max_bytes: 16
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: pip_picture_by_picture_set
  label: PIP or Picture by Picture Set
  kind: action
  command: "03h  B1h  00h  00h  03h  C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: setting
      type: enum
      values:
        mode: "00h"
        start_position: "01h"
        sub_input_1: "02h"
        sub_input_2: "09h"
        sub_input_3: "0Ah"
    - name: value
      type: byte
      description: "Mode, position, or model-specific sub-input value."
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      values:
        "off": "00h"
        "on": "01h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h  BFh  00h  00h  01h  00h  C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h  BFh  00h  00h  02h  01h  06h  C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h  BFh  00h  00h  01h  02h  C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h  C9h  00h  00h  03h  09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input
      type: byte
      description: "Input-terminal code; supplementary table absent from source."
    - name: audio_source
      type: enum
      values:
        specified_input_terminal: "00h"
        bnc: "01h"
        computer: "02h"
    - name: checksum
      type: byte
      description: "Low-order byte of sum of all preceding command bytes."
```

## Feedbacks

```yaml
- id: command_error
  type: object
  response: "A0h/A1h/A2h/A3h <opcode> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  description: "Failed-command response containing ERR1 and ERR2."

- id: error_status
  type: bitfield
  response: "20h  88h <ID1> <ID2> 0Ch <DATA01> - <DATA12> <CKS>"

- id: input_switch_result
  type: enum
  response: "22h  03h <ID1> <ID2> 01h <DATA01> <CKS>"
  values:
    success: "requested input code"
    error: "FFh"

- id: picture_adjust_result
  type: enum
  response: "23h  10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  values:
    success: "0000h"
    error: "other than 0000h"

- id: projector_information
  type: object
  response: "23h  8Ah <ID1> <ID2> 62h <DATA01> - <DATA98> <CKS>"

- id: filter_usage_information
  type: object
  response: "23h  95h <ID1> <ID2> 08h <DATA01> - <DATA08> <CKS>"

- id: lamp_information
  type: object
  response: "23h  96h <ID1> <ID2> 06h <DATA01> - <DATA06> <CKS>"

- id: carbon_savings_information
  type: object
  response: "23h  9Ah <ID1> <ID2> 09h <DATA01> - <DATA09> <CKS>"

- id: lens_position
  type: object
  response: "22h  1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> - <DATA07> <CKS>"

- id: lens_memory_option
  type: enum
  response: "22h  20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  values:
    "off": "00h"
    "on": "01h"

- id: lens_operation_status
  type: bitfield
  response: "22h  22h <ID1> <ID2> 02h 00h <DATA01> <CKS>"

- id: lens_profile
  type: enum
  response: "22h  28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>"
  values:
    profile_1: "00h"
    profile_2: "01h"

- id: gain_parameter
  type: object
  response: "23h  05h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: projector_settings
  type: object
  response: "20h  85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"

- id: running_status
  type: object
  response: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: power_state
  type: enum
  source: running_status.DATA03
  values:
    standby: "00h"
    power_on: "01h"
    unsupported: "FFh"

- id: input_status
  type: object
  response: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: mute_status
  type: object
  response: "20h  85h <ID1> <ID2> 10h <DATA01> - <DATA16> <CKS>"

- id: picture_mute_state
  type: enum
  source: mute_status.DATA01
  values:
    "off": "00h"
    "on": "01h"

- id: sound_mute_state
  type: enum
  source: mute_status.DATA02
  values:
    "off": "00h"
    "on": "01h"

- id: onscreen_mute_state
  type: enum
  source: mute_status.DATA03
  values:
    "off": "00h"
    "on": "01h"

- id: model_name
  type: string
  response: "20h  85h <ID1> <ID2> 20h <DATA01> - <DATA32> <CKS>"

- id: cover_status
  type: enum
  response: "20h  85h <ID1> <ID2> 01h <DATA01> <CKS>"
  values:
    normal_open: "00h"
    closed: "01h"

- id: information_string
  type: string
  response: "20h  D0h <ID1> <ID2> <LEN> <DATA01> 01h <DATA02> - <DATA??> <CKS>"

- id: eco_mode
  type: byte
  response: "23h  B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>"

- id: projector_name
  type: string
  response: "23h  B0h <ID1> <ID2> 12h 2Ch <DATA01> - <DATA17> <CKS>"

- id: mac_address
  type: bytes
  response: "23h  B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> - <DATA06> <CKS>"

- id: pip_picture_by_picture_setting
  type: byte
  response: "23h  B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>"

- id: edge_blending_state
  type: enum
  response: "23h  B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>"
  values:
    "off": "00h"
    "on": "01h"

- id: base_model_type
  type: object
  response: "20h  BFh <ID1> <ID2> 10h 00h <DATA01> - <DATA15> <CKS>"

- id: serial_number
  type: string
  response: "20h  BFh <ID1> <ID2> 12h 01h 06h <DATA01> - <DATA16> <CKS>"

- id: basic_information
  type: object
  response: "20h  BFh <ID1> <ID2> 10h 02h <DATA01> - <DATA15> <CKS>"
```

## Variables

```yaml
- id: control_id
  type: byte
  description: "ID1 value set for projector."

- id: model_code
  type: byte
  value: null  # UNRESOLVED: model-specific ID2 value not stated in source

- id: checksum
  type: byte
  description: "Low-order byte of sum of all preceding bytes."

- id: projector_name
  type: string
  max_bytes: 16

- id: lens_profile
  type: enum
  values:
    profile_1: "00h"
    profile_2: "01h"

- id: lens_memory_load_by_signal
  type: boolean
  values:
    false: "00h"
    true: "01h"

- id: lens_memory_forced_mute
  type: boolean
  values:
    false: "00h"
    true: "01h"
```

## Events

```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step macros documented in source
```

## Safety

```yaml
confirmation_required_for:
  - power_off
interlocks:
  - action: power_on
    condition: "While power-on processing runs, projector accepts no other commands."
  - action: power_off
    condition: "While power-off processing and cooling run, projector accepts no other commands."
  - action: lens_control
    condition: "Continuous plus or minus movement must be stopped by sending DATA02 00h."
```

## Notes

Commands and responses use hexadecimal byte notation. `ID1` is projector control ID, `ID2` is model-dependent code, `LEN` is data length, and `CKS` is low-order byte of sum of all preceding bytes. Command failures return `ERR1` and `ERR2`; source lists recognition, unsupported-command, invalid-value, unavailable-state, authority, and hardware-related errors.

Picture, sound, and onscreen mute can be cleared by input or video signal switching; sound mute can also be cleared by volume adjustment. Lamp 2 selection applies only to two-lamp models. Usage-time data updates once per minute even when returned in seconds.

<!-- UNRESOLVED: model-specific ID2 code, supported-command subset, input codes, aspect values, eco-mode values, sub-input codes, and firmware compatibility require supplementary model documentation. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:24:38.998Z
last_checked_at: 2026-07-22T07:42:00.795Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:42:00.795Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched with exact command codes in the source; transport parameters verified; source command inventory matches spec coverage exactly. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is generic projector command reference; model-specific command support and model code are not stated."
- "model-specific ID2 value not stated in source"
- "unsolicited notifications not documented in source"
- "no multi-step macros documented in source"
- "model-specific ID2 code, supported-command subset, input codes, aspect values, eco-mode values, sub-input codes, and firmware compatibility require supplementary model documentation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
