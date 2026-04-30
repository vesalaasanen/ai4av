---
schema_version: ai4av-public-spec-v1
device_id: nec/gt2000
entity_id: nec_gt2000
spec_id: admin/nec-gt2000
revision: 1
author: admin
title: "NEC GT2000 Control Spec"
status: published
manufacturer: NEC
manufacturer_key: nec
model_family: GT2000
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - GT2000
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: nec_gt2000_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:43:55.013Z
retrieved_at: 2026-04-24T14:43:55.013Z
last_checked_at: 2026-04-24T14:43:55.013Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-24T14:43:55.013Z
  matched_actions: 53
  action_count: 53
  confidence: high
  summary: "Complete match: all actions verified against source; transport section fully resolved with no UNRESOLVED values remaining."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# NEC GT2000 Control Spec

## Summary
NEC RS-232C and TCP/IP projector supporting full duplex serial and wired LAN control on port 7142. Supports power control, input routing, picture/sound/onscreen mute, lens positioning, volume and picture adjustment, eco mode, and comprehensive status queries.

<!-- UNRESOLVED: this generic command reference (BDT140013 Rev 7.1) is shared across multiple NEC projector models; actual GT2000 command support may vary -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # LAN command port
serial:
  baud_rate: 115200  # also supports 38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from POWER ON/OFF commands
- routable        # inferred from INPUT SW CHANGE command
- queryable       # inferred from information request commands
- levelable       # inferred from VOLUME ADJUST, PICTURE ADJUST commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on projector power. No other commands accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off projector power. No other commands accepted during power-off sequence including cooling time.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex). See Appendix for values (e.g., 06h = video).

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cleared by input terminal switch or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cleared by input terminal switch or video signal switch.

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: Adjustment target (00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness)
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Volume level (16-bit signed)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value. See Appendix for values.

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit signed)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (16-bit). See key code table for values (e.g., 0200h=POWER ON, 0500h=AUTO).

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=drive plus for 1/0.5/0.25s, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=drive minus for 0.25/0.5/1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute, 02h=relative"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"
  description: Controls profile number specified by LENS PROFILE SET command.

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode value. See Appendix for values.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes, NUL-terminated)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value depends on target. See Appendix for sub input values.

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal. See Appendix for values.
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=ON, 02h=OFF"
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
- id: information_request
  label: Information Request
  kind: query
  params: []
- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []
- id: lamp_information_request
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=usage time, 04h=remaining life
- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: type
      type: integer
      description: 00h=Total, 01h=During operation
- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: 06h=Periphery Focus
- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: option
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
- id: gain_parameter_request
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: gain_name
      type: integer
      description: 00h-05h, 96h
- id: setting_request
  label: Setting Request
  kind: query
  params: []
- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: 03h=H sync, 04h=V sync
- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
- id: lan_mac_address_status_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: 00h-02h, 09h-0Ah
- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: error_status
  type: bitfield
  description: Error information. DATA01 bits: Bit0=cover error, Bit1=temperature error, Bit3=fan error, Bit4=fan error, Bit5=power error, Bit6=lamp off, Bit7=lamp replacement moratorium. DATA02-DATA04 contain additional error fields. DATA09 extended status includes interlock switch and system errors.

- id: power_status
  type: enum
  values:
    - "00h Standby"
    - "01h Power on"
    - "05h Cooling"
    - "06h Standby (error)"
    - "0Fh Standby (Power saving)"
    - "10h Network standby"

- id: running_status
  type: object
  fields:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on"
    - name: cooling
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: power_on_off_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: operation_status
      type: integer
      description: "00h=Standby (Sleep), 04h=Power on, 05h=Cooling, 06h=Standby (error), 0Fh=Standby (Power saving), 10h=Network standby"

- id: input_status
  type: object
  fields:
    - name: signal_switch_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: signal_list_number
      type: integer
      description: 0-199 (add 1 to get practical number)
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h"
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - name: signal_list_type
      type: integer
      description: "00h=Default, 01h=User"
    - name: test_pattern_display
      type: integer
      description: "00h=Not displayed, 01h=Displayed"
    - name: content_displayed
      type: integer
      description: "00h=Video signal displayed, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern displayed, 04h=LAN displayed"

- id: mute_status
  type: object
  fields:
    - name: picture_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: forced_onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_display
      type: integer
      description: "00h=Not displayed, 01h=Displayed"

- id: model_name
  type: string
  description: Model name (NUL-terminated, up to 32 bytes)

- id: cover_status
  type: enum
  values:
    - "00h Normal (cover opened)"
    - "01h Cover closed"

- id: projector_information
  type: object
  fields:
    - name: projector_name
      type: string
      description: Up to 49 bytes NUL-terminated
    - name: lamp_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)
    - name: filter_usage_time
      type: integer
      description: Seconds (updated at 1-minute intervals)

- id: filter_usage_info
  type: object
  fields:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds, or -1 if undefined

- id: lamp_info
  type: object
  fields:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"
    - name: value
      type: integer
      description: Usage time in seconds or remaining life percentage (negative if deadline exceeded)

- id: carbon_savings_info
  type: object
  fields:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: kilogram
      type: integer
      description: Maximum 99999 kg
    - name: milligram
      type: integer
      description: Maximum 999999 mg

- id: eco_mode
  type: integer
  description: Eco mode value. See Appendix for values.

- id: lan_projector_name
  type: string
  description: Projector name (NUL-terminated, up to 17 bytes)

- id: mac_address
  type: string
  description: MAC address as hex bytes (e.g., "01h-23h-45h-67h-89h-ABh")

- id: pip_picture_by_picture
  type: object
  fields:
    - name: mode
      type: integer
      description: "00h=PIP, 01h=PICTURE BY PICTURE"
    - name: start_position
      type: integer
      description: "00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"
    - name: sub_input_1
      type: integer
      description: Sub input setting value
    - name: sub_input_2
      type: integer
      description: Sub input setting value
    - name: sub_input_3
      type: integer
      description: Sub input setting value

- id: edge_blending_mode
  type: enum
  values:
    - "00h OFF"
    - "01h ON"

- id: base_model_type
  type: object
  fields:
    - name: base_model_type
      type: integer
      description: Base model type code
    - name: model_name
      type: string
      description: Model name (NUL-terminated)

- id: serial_number
  type: string
  description: Serial number (NUL-terminated, up to 16 bytes)

- id: basic_information
  type: object
  fields:
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: integer
      description: "00h=Video signal displayed, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern displayed, 04h=LAN displayed, 05h=Test pattern(user), 10h=Signal being switched"
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h"
    - name: selection_signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - name: display_signal_type
      type: integer
      description: "00h-0Fh various formats, FFh=Not Video Input"
    - name: video_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: integer
      description: "00h=Off, 01h=On"
    - name: freeze_status
      type: integer
      description: "00h=Off, 01h=On"

- id: lens_position
  type: object
  fields:
    - name: upper_limit
      type: integer
      description: 16-bit value
    - name: lower_limit
      type: integer
      description: 16-bit value
    - name: current_value
      type: integer
      description: 16-bit value

- id: lens_memory_option
  type: object
  fields:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_profile
  type: enum
  values:
    - "00h Profile 1"
    - "01h Profile 2"

- id: gain_parameter
  type: object
  fields:
    - name: status
      type: integer
      description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Specified gain does not exist"
    - name: upper_limit
      type: integer
      description: 16-bit
    - name: lower_limit
      type: integer
      description: 16-bit
    - name: default_value
      type: integer
      description: 16-bit
    - name: current_value
      type: integer
      description: 16-bit
    - name: wide_adjustment_width
      type: integer
      description: 16-bit
    - name: narrow_adjustment_width
      type: integer
      description: 16-bit
    - name: default_value_valid
      type: integer
      description: "00h=Invalid, 01h=Valid"

- id: lens_information
  type: bitfield
  description: Lens operation status bits. Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift (H), Bit4=Lens Shift (V).

- id: information_string
  type: object
  fields:
    - name: type
      type: integer
      description: "03h=Horizontal synchronous frequency, 04h=Vertical synchronous frequency"
    - name: length
      type: integer
      description: Label/information string length (excluding NUL)
    - name: string
      type: string
      description: NUL-terminated string

- id: setting_info
  type: object
  fields:
    - name: base_model_type
      type: string
      description: 3 bytes
    - name: sound_function
      type: integer
      description: "00h=Not available, 01h=Available"
    - name: clock_function
      type: integer
      description: "00h=Not available, 01h=Clock function, 02h=Sleep timer function, 03h=Clock and Sleep timer"

- id: lens_control_response
  type: enum
  values:
    - "00h Stop"
    - "01h During operation (periphery focus)"

- id: freeze_status_response
  type: enum
  values:
    - "01h Freeze on"
    - "02h Freeze off"
```

## Variables
```yaml
# UNRESOLVED: the source describes settable parameters as action commands (030-1, 030-2, etc.)
# rather than as independent variables. No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: source describes only query-response interaction; no unsolicited event notifications documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - During power-on sequence (command 015), no other commands are accepted.
  - During power-off sequence (command 016), no other commands are accepted including cooling time.
  - Power cannot be turned on during certain error states (see error code 02h-0Dh).
# UNRESOLVED: detailed fault recovery sequences not provided in source.
```

## Notes
The source document (BDT140013 Rev 7.1) is a generic NEC projector command reference used across multiple models. The GT2000-specific command support should be verified against actual device. Appendix "Supplementary Information by Command" values (input terminal codes, aspect values, eco mode values, signal types, sub input values, base model types) are referenced but not included in this extracted section.

Command protocol structure: Each command is a sequence of bytes in hexadecimal. Common structure: `[HEADER] [MODEL CODE] [COMMAND] [DATA LENGTH] [DATA] [CHECKSUM]`. Responses follow a similar structure with result/error codes.

Checksum calculation: Add all preceding bytes, use low-order one byte of the sum.
<!-- UNRESOLVED: Appendix values for input terminals, aspect ratios, eco modes, signal types, sub input settings, and base model types not included in extracted source text. -->
<!-- UNRESOLVED: wireless LAN control not documented; manual references wireless LAN unit operation manual. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: nec_gt2000_ir.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:43:55.013Z
retrieved_at: 2026-04-24T14:43:55.013Z
last_checked_at: 2026-04-24T14:43:55.013Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-24T14:43:55.013Z
matched_actions: 53
action_count: 53
confidence: high
summary: "Complete match: all actions verified against source; transport section fully resolved with no UNRESOLVED values remaining."
```

## Known Gaps

```yaml
[]
```
