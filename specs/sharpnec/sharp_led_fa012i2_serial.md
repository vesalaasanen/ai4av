---
spec_id: admin/sharp-nec-led-fa012i2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LED-FA012i2 Control Spec"
manufacturer: Sharp/NEC
model_family: LED-FA012i2
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - LED-FA012i2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:18:22.757Z
last_checked_at: 2026-07-22T07:42:01.576Z
generated_at: 2026-07-22T07:42:01.576Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic projector command reference and does not explicitly identify LED-FA012i2 compatibility. Model code and supported command subset are not stated."
  - "unsolicited notifications are not documented in source"
  - "no multi-step command sequences are documented as macros"
  - "LED-FA012i2 model code, command-support matrix, input codes, aspect codes, eco-mode codes, PIP sub-input codes, and complete lens target codes are not present in source."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:42:01.576Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim in source with correct opcodes and parameter structures; transport parameters confirmed (port 7142, baud rates, full duplex serial RS-232C); source command catalogue fully represented by spec. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sharp/NEC LED-FA012i2 Control Spec

## Summary

Control spec for Sharp/NEC LED-FA012i2 using RS-232C serial or TCP network communication. Commands use binary hexadecimal frames with model/control identifiers, variable data, and an additive checksum.

<!-- UNRESOLVED: source is a generic projector command reference and does not explicitly identify LED-FA012i2 compatibility. Model code and supported command subset are not stated. -->

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
  duplex: full
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable  # inferred from power commands
- routable  # inferred from input switching command
- queryable  # inferred from query commands
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
      description: Input-terminal code in DATA01; model-specific values are in omitted supplementary information
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: DATA03 is low-order byte; DATA04 is high-order byte
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: DATA02 is low-order byte; DATA03 is high-order byte
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h  10h  00h  00h  05h  18h  00h  00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: byte
      description: Model-specific aspect code in DATA01; values are in omitted supplementary information
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: DATA04 is low-order byte; DATA05 is high-order byte
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h  9Ah  00h  00h  01h <DATA01> <CKS>"
  params:
    - name: content
      type: enum
      values:
        total_carbon_savings: "00h"
        operation_carbon_savings: "01h"
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
      description: Source excerpt explicitly documents periphery focus as 06h; other target values are unresolved
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
      description: Low-order byte of sum of all preceding bytes

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h  1Ch  00h  00h  02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: byte
      description: Lens adjustment target; values not fully present in source excerpt
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h  1Dh  00h  00h  04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: target
      type: byte
      description: Lens target or FFh to stop; target values not fully present in source excerpt
    - name: mode
      type: enum
      values:
        absolute: "00h"
        relative: "02h"
    - name: value
      type: int16_le
      description: DATA03 is low-order byte; DATA04 is high-order byte
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
    - name: value
      type: enum
      values:
        off: "00h"
        on: "01h"
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h  28h  00h  00h  00h  2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h  05h  00h  00h  03h <DATA01> 00h 00h <CKS>"
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
      description: Low-order byte of sum of all preceding bytes

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
        on: "01h"
        off: "02h"
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
      description: Low-order byte of sum of all preceding bytes

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
      description: Model-specific eco, light, or lamp mode code; values are in omitted supplementary information
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h  B1h  00h  00h  12h  2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Value selected for setting; model-specific sub-input values are in omitted supplementary information
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h  B1h  00h  00h  03h  DFh  00h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      values:
        off: "00h"
        on: "01h"
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes

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
      description: Model-specific input-terminal code; values are in omitted supplementary information
    - name: audio_source
      type: enum
      values:
        selected_input_terminal: "00h"
        bnc: "01h"
        computer: "02h"
    - name: checksum
      type: byte
      description: Low-order byte of sum of all preceding bytes
```

## Feedbacks

```yaml
- id: command_success
  type: binary_frame
  description: Successful non-query responses contain no data part; successful queries include returned data
- id: command_error
  type: binary_frame
  description: Failed responses contain ERR1 and ERR2 error bytes
- id: error_status
  type: bitfield
  description: Twelve-byte projector error-status response
- id: projector_information
  type: object
  fields:
    - projector_name
    - lamp_usage_time_seconds
    - filter_usage_time_seconds
- id: filter_usage
  type: object
  fields:
    - usage_time_seconds
    - alarm_start_time_seconds
- id: lamp_information
  type: object
  fields:
    - lamp
    - content
    - value
- id: carbon_savings
  type: object
  fields:
    - content
    - kilograms
    - milligrams
- id: lens_position
  type: object
  fields:
    - upper_limit
    - lower_limit
    - current_value
- id: lens_memory_option
  type: enum
  values:
    - off
    - on
- id: lens_operation_status
  type: bitfield
  description: Reports lens memory, zoom, focus, horizontal shift, and vertical shift operation status
- id: lens_profile
  type: enum
  values:
    - profile_1
    - profile_2
- id: gain_parameter
  type: object
  fields:
    - status
    - upper_limit
    - lower_limit
    - default_value
    - current_value
    - wide_adjustment_width
    - narrow_adjustment_width
- id: projector_setting
  type: object
  fields:
    - base_model_type
    - sound_function
    - profile_number
- id: running_status
  type: object
  fields:
    - power_status
    - cooling_process
    - power_process
    - operation_status
- id: input_status
  type: object
  fields:
    - signal_switch_process
    - signal_list_number
    - selection_signal_type
    - signal_list_type
    - test_pattern_display
    - displayed_content
- id: mute_status
  type: object
  fields:
    - picture_mute
    - sound_mute
    - onscreen_mute
    - forced_onscreen_mute
    - onscreen_display
- id: model_name
  type: string
- id: cover_status
  type: enum
  values:
    - normal_cover_opened
    - cover_closed
- id: information_string
  type: string
- id: eco_mode
  type: byte
  description: Model-specific value
- id: projector_name
  type: string
- id: mac_address
  type: bytes
- id: pip_picture_by_picture
  type: object
  fields:
    - setting
    - value
- id: edge_blending_mode
  type: enum
  values:
    - off
    - on
- id: base_model_type
  type: object
  fields:
    - base_model_type
    - model_name
- id: serial_number
  type: string
- id: basic_information
  type: object
  fields:
    - operation_status
    - displayed_content
    - selection_signal_type
    - display_signal_type
    - video_mute
    - sound_mute
    - onscreen_mute
    - freeze_status
```

## Variables

```yaml
- id: control_id
  type: byte
  description: Control ID configured on projector
- id: model_code
  type: byte
  description: Model-dependent ID2 value
- id: checksum
  type: byte
  description: Low-order byte of sum of all preceding bytes
- id: picture_brightness
  type: int16
- id: picture_contrast
  type: int16
- id: picture_color
  type: int16
- id: picture_hue
  type: int16
- id: picture_sharpness
  type: int16
- id: volume
  type: int16
- id: light_adjust
  type: int16
- id: eco_mode
  type: byte
- id: projector_name
  type: string
  max_bytes: 16
```

## Events

```yaml
# UNRESOLVED: unsolicited notifications are not documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step command sequences are documented as macros
```

## Safety

```yaml
confirmation_required_for:
  - power_off
interlocks:
  - command: power_on
    condition: While power-on processing is active, projector accepts no other command
  - command: power_off
    condition: While power-off processing, including cooling, is active, projector accepts no other command
  - command: lens_control
    condition: Continuous movement values 7Fh and 81h must be stopped by sending 00h
```

## Notes

Commands are represented in hexadecimal notation. `ID1` is projector control ID, `ID2` is model-specific code, `LEN` is data length, and `CKS` is low-order byte of sum of all preceding bytes. Picture, sound, and onscreen mute may be cleared by input or video signal switching; sound mute may also be cleared by volume adjustment. Lamp usage information updates once per minute despite one-second resolution.

<!-- UNRESOLVED: LED-FA012i2 model code, command-support matrix, input codes, aspect codes, eco-mode codes, PIP sub-input codes, and complete lens target codes are not present in source. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-07-22T05:18:22.757Z
last_checked_at: 2026-07-22T07:42:01.576Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:42:01.576Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim in source with correct opcodes and parameter structures; transport parameters confirmed (port 7142, baud rates, full duplex serial RS-232C); source command catalogue fully represented by spec. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic projector command reference and does not explicitly identify LED-FA012i2 compatibility. Model code and supported command subset are not stated."
- "unsolicited notifications are not documented in source"
- "no multi-step command sequences are documented as macros"
- "LED-FA012i2 model code, command-support matrix, input codes, aspect codes, eco-mode codes, PIP sub-input codes, and complete lens target codes are not present in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
