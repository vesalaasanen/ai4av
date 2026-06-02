---
spec_id: admin/nec-xm4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC XM4 Series Control Spec"
manufacturer: NEC
model_family: "XM4 Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "XM4 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T17:31:51.780Z
last_checked_at: 2026-05-31T06:52:59.690Z
generated_at: 2026-05-31T06:52:59.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default serial baud rate not stated in source"
  - "wireless LAN unit specifications not included in source"
  - "Appendix \"Supplementary Information by Command\" not available in source"
  - "input terminal numeric values and aspect ratio values not fully enumerated in source"
  - "model code (ID2) values not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:52:59.690Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions match source commands one-to-one; all transport parameters verified in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# NEC XM4 Series Control Spec

## Summary
NEC XM4 Series projector supporting both RS-232C serial and wired LAN control interfaces. Serial communication uses RS-232C with configurable baud rates. LAN uses TCP port 7142 for command transmission. No authentication required.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 7142
auth:
  type: none
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: error_status_request
  label: Error Status Request
  kind: query
  params: []

- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed adjustment value

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed adjustment value

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect ratio value

- id: other_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 01h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed adjustment value

- id: information_request
  label: Information Request
  kind: query
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: content_type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code (see key code table)

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: periphery_focus
      type: integer
      description: "06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=drive+, 81h=drive-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: periphery_focus
      type: integer
      description: "06h=Periphery Focus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop
      type: integer
      description: "FFh=Stop"
    - name: adjustment_mode
      type: integer
      description: "00h=Absolute value, 02h=Relative value"
    - name: adjustment_value
      type: integer
      description: 16-bit signed adjustment value

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

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST"

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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: freeze
      type: integer
      description: "01h=ON, 02h=OFF"

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: information_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: content
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: Eco mode setting value

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: content
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: setting_value
      type: integer
      description: Setting value per content type

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: setting_value
      type: integer
      description: "00h=OFF, 01h=ON"

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

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value
    - name: setting_value
      type: integer
      description: "00h=Terminal specified in DATA01, 02h=COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: object
  description: Error information bitfield (12 bytes)
  properties:
    - data01: Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium
    - data02: Bit0=Lamp time exceeded, Bit1=Formatter error, Bit2=Lamp 2 off
    - data03: Bit0=None, Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 time exceeded
    - data04: Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temperature error, Bit3=Foreign matter sensor, Bit4=None, Bit5=Ballast comm error, Bit6=Iris calibration error, Bit7=Lens not installed
    - data05_08: Reserved
    - data09: Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)

- id: power_response
  type: enum
  values: [success, error]
  description: Response to power commands

- id: ack_response
  type: object
  description: Standard acknowledgement with ERR1/ERR2 error codes

- id: data_response
  type: object
  description: Data response with execution result

- id: projector_name
  type: string
  description: Projector name from information request

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life percentage

- id: carbon_savings
  type: object
  properties:
    - kilograms: integer
    - milligrams: integer

- id: mute_status
  type: object
  properties:
    - picture_mute: enum [on, off]
    - sound_mute: enum [on, off]
    - onscreen_mute: enum [on, off]
    - forced_onscreen_mute: enum [on, off]

- id: input_status
  type: object
  properties:
    - signal_switch_process: enum [not_executed, during_execution]
    - signal_list_number: integer
    - selection_signal_type_1: integer
    - selection_signal_type_2: integer

- id: running_status
  type: object
  properties:
    - power_status: enum [standby, power_on]
    - cooling_process: enum [not_executed, during_execution]
    - power_on_off_process: enum [not_executed, during_execution]
    - operation_status: enum [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: model_name
  type: string
  description: Model name string

- id: serial_number
  type: string
  description: Serial number string

- id: mac_address
  type: string
  description: MAC address (hex format)

- id: eco_mode
  type: integer
  description: Eco mode value

- id: lens_position
  type: object
  description: Lens position values
  properties:
    - upper_limit: integer
    - lower_limit: integer
    - current_value: integer

- id: lens_memory_option
  type: object
  properties:
    - target: enum [load_by_signal, forced_mute]
    - setting_value: enum [off, on]

- id: lens_profile
  type: integer
  description: Profile number (0 or 1)

- id: pip_picture_by_picture
  type: object
  description: PIP/PBP settings

- id: edge_blending_mode
  type: enum [off, on]

- id: audio_select
  type: object
  description: Audio select settings
```

## Variables
```yaml
- id: brightness
  type: integer
  description: Picture brightness (adjustable via picture_adjust)

- id: contrast
  type: integer
  description: Picture contrast (adjustable via picture_adjust)

- id: color
  type: integer
  description: Picture color (adjustable via picture_adjust)

- id: hue
  type: integer
  description: Picture hue (adjustable via picture_adjust)

- id: sharpness
  type: integer
  description: Picture sharpness (adjustable via picture_adjust)

- id: volume
  type: integer
  description: Sound volume level (adjustable via volume_adjust)

- id: lamp_adjust
  type: integer
  description: Lamp/light adjustment (adjustable via other_adjust)

- id: aspect
  type: integer
  description: Aspect ratio setting (adjustable via aspect_adjust)

- id: freeze
  type: enum [on, off]
  description: Freeze function state (settable via freeze_control)
```

## Events
```yaml
# No unsolicited event notifications documented in source
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "While power is turning on (POWER ON command), no other command can be accepted."
  - description: "While power is turning off (including cooling time), no other command can be accepted."
  - description: "The portrait cover side should not be facing up (interlock switch open condition)."
```

## Notes
Serial baud rate is configurable: 115200/38400/19200/9600/4800 bps. Default baud rate not stated in source. TCP port 7142 used for LAN command communication. Projector supports both wired and wireless LAN connections. Input terminal values and aspect values are documented in the Appendix "Supplementary Information by Command" which is not included in this source document. Key code list includes power, menu navigation, source selection, and eco mode keys.
<!-- UNRESOLVED: default serial baud rate not stated in source -->
<!-- UNRESOLVED: wireless LAN unit specifications not included in source -->
<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not available in source -->
<!-- UNRESOLVED: input terminal numeric values and aspect ratio values not fully enumerated in source -->
<!-- UNRESOLVED: model code (ID2) values not stated in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-26T17:31:51.780Z
last_checked_at: 2026-05-31T06:52:59.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:52:59.690Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions match source commands one-to-one; all transport parameters verified in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default serial baud rate not stated in source"
- "wireless LAN unit specifications not included in source"
- "Appendix \"Supplementary Information by Command\" not available in source"
- "input terminal numeric values and aspect ratio values not fully enumerated in source"
- "model code (ID2) values not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
