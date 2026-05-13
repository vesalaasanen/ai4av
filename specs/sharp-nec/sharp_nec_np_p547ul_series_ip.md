---
spec_id: admin/sharp_nec_np_p547ul_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp-NEC NP-P547UL Series Control Spec"
manufacturer: Sharp-NEC
model_family: "NP-P547UL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp-NEC
  models:
    - "NP-P547UL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-26T22:50:17.420Z
generated_at: 2026-04-26T22:50:17.420Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-26T22:50:17.420Z
  matched_actions: 58
  action_count: 58
  confidence: high
  summary: "All 58 spec actions matched to source commands one-to-one; all transport parameters (port 7142, baud 115200, serial 8N1) explicitly documented in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Sharp-NEC NP-P547UL Series Control Spec

## Summary
Laser projector supporting both RS-232C serial and wired TCP/IP control. Commands are sent as hexadecimal payloads over TCP port 7142 or RS-232C at configurable baud rates (up to 115200 bps). Supports power control, input routing, picture/sound adjustment, lens positioning, and comprehensive status queries.

<!-- UNRESOLVED: Lamp replacement countdown behavior not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial  # RS-232C also supported; see serial block
addressing:
  port: 7142  # stated: "Use TCP port number 7142"
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 115200  # max stated; supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits
```yaml
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # multiple status request commands present (ERROR STATUS, INFO REQUEST, etc.)
- levelable       # PICTURE ADJUST, VOLUME ADJUST, ASPECT ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  notes: "Hex: 02h 00h 00h 00h 00h 02h; no other commands accepted while power is turning on"

- id: power_off
  label: Power Off
  kind: action
  params: []
  notes: "Hex: 02h 01h 00h 00h 00h 03h; no other commands accepted during cooling"

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code (hex); see Appendix for model-specific codes (e.g., 06h = VIDEO)

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  notes: "Turns picture mute on; automatically clears on input switch or video signal switch"

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  notes: "Clears on input switch, video signal switch, or volume adjustment"

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  notes: "Automatically clears on input switch or video signal switch"

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed value (low-order byte first)"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed value (low-order byte first)"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: "Aspect ratio code; model-specific; see Appendix"

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: "16-bit signed value (low-order byte first)"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code value (e.g., 02h=POWER ON, 05h=AUTO, 0Bh=ENTER); see key code table"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  notes: "Closes the lens shutter"

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  notes: "Opens the lens shutter"

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), 06h=Periphery Focus"
    - name: content
      type: integer
      description: "00h=Stop, 01h/02h/03h=drive for 1/0.5/0.25s plus, 7Fh=continuous plus, 81h=minus, FDh/FEh/FFh=drive for 0.25/0.5/1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: "16-bit signed value (low-order byte first)"

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
  notes: "Controls profile number from LENS PROFILE SET"

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

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "Eco mode value; model-specific; see Appendix"

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: name
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: "Setting value; model-specific; see Appendix"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: "01h=On, 02h=Off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal code; see Appendix"
    - name: value
      type: integer
      description: "00h=terminal in DATA01, 02h=COMPUTER"
- id: error_status_request
  label: Error Status Request
  kind: action
  params: []
  description: "009. ERROR STATUS REQUEST - Gets information about errors occurring in the projector."

- id: information_request_cmd
  label: Information Request
  kind: action
  params: []
  description: "037. INFORMATION REQUEST - Gets the information of the projector including projector name, lamp usage time, filter usage time."

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []
  description: "037-3. FILTER USAGE INFORMATION REQUEST - Gets filter usage information such as usage time."

- id: lamp_info_request
  label: Lamp Information Request
  kind: action
  params: []
  description: "037-4. LAMP INFORMATION REQUEST 3 - Gets lamp information such as usage time and remaining life."

- id: carbon_savings_info_request
  label: Carbon Savings Information Request
  kind: action
  params: []
  description: "037-6. CARBON SAVINGS INFORMATION REQUEST - Gets the Carbon Saving values on the projector."

- id: lens_control_request_cmd
  label: Lens Control Request
  kind: action
  params: []
  description: "053-1. LENS CONTROL REQUEST - Gets adjusted values of the lens position."

- id: lens_memory_option_request_cmd
  label: Lens Memory Option Request
  kind: action
  params: []
  description: "053-5. LENS MEMORY OPTION REQUEST - Gets the value set for the lens memory."

- id: lens_information_request
  label: Lens Information Request
  kind: action
  params: []
  description: "053-7. LENS INFORMATION REQUEST - Gets information about the lens of the projector."

- id: lens_profile_request_cmd
  label: Lens Profile Request
  kind: action
  params: []
  description: "053-11. LENS PROFILE REQUEST - Gets the selected profile number of the reference lens memory."

- id: gain_parameter_request_cmd
  label: Gain Parameter Request
  kind: action
  params: []
  description: "060-1. GAIN PARAMETER REQUEST 3 - Gets adjusted values of the picture, volume, and backlight."

- id: setting_request_cmd
  label: Setting Request
  kind: action
  params: []
  description: "078-1. SETTING REQUEST - Gets information of the projector."

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []
  description: "078-2. RUNNING STATUS REQUEST - Gets the information about the operation status of the projector."

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []
  description: "078-3. INPUT STATUS REQUEST - Gets the information about the input signal status of the projector."

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []
  description: "078-4. MUTE STATUS REQUEST - Gets the mute status of the projector."

- id: model_name_request_cmd
  label: Model Name Request
  kind: action
  params: []
  description: "078-5. MODEL NAME REQUEST - Gets the model name of the projector."

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []
  description: "078-6. COVER STATUS REQUEST - Gets the status of the mirror cover or lens cover."

- id: information_string_request_cmd
  label: Information String Request
  kind: action
  params: []
  description: "084. INFORMATION STRING REQUEST - Gets information strings (English) displayed on the projector."

- id: eco_mode_request_cmd
  label: Eco Mode Request
  kind: action
  params: []
  description: "097-8. ECO MODE REQUEST - Gets the value set for the eco mode."

- id: lan_projector_name_request_cmd
  label: LAN Projector Name Request
  kind: action
  params: []
  description: "097-45. LAN PROJECTOR NAME REQUEST - Gets the projector name."
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: object
  properties:
    - name: data01
      type: bitfield
      description: "Bit0=Cover error, Bit1=Temperature error, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: bitfield
      description: "Bit0=Lamp usage time exceeded, Bit1=Formatter error, Bit2=Lamp2 off, Bit7=Extended status"
    - name: data03
      type: bitfield
      description: "Bit1=FPGA error, Bit2=Temperature sensor error, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover error, Bit6=Lamp2 moratorium, Bit7=Lamp2 usage exceeded"
    - name: data04
      type: bitfield
      description: "Bit0=Lamp2 not present, Bit1=Lamp2 data error, Bit2=Temperature due to dust, Bit3=Foreign matter sensor, Bit7=Lens not installed"
    - name: data09
      type: bitfield
      description: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: power_state
  label: Power State
  type: enum
  values:
    - 00h: Standby
    - 01h: Power on
    - 05h: Cooling
    - 06h: Standby (error)
    - 0Fh: Standby (Power saving)
    - 10h: Network standby

- id: input_status
  label: Input Status
  type: object
  properties:
    - name: signal_switch_process
      type: enum
      values:
        - 00h: Not executed
        - 01h: During execution
        - FFh: Not supported
    - name: signal_list_number
      type: integer
      description: "0-indexed; add 1 for practical value"
    - name: selection_signal_type_1
      type: integer
      description: "01h-05h"
    - name: selection_signal_type_2
      type: enum
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input"
    - name: content_displayed
      type: enum
      description: "00h=Video signal displayed, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern, 04h=LAN displayed"

- id: mute_status
  label: Mute Status
  type: object
  properties:
    - name: picture_mute
      type: enum
      values: [00h=Off, 01h=On, FFh=Not supported]
    - name: sound_mute
      type: enum
      values: [00h=Off, 01h=On, FFh=Not supported]
    - name: onscreen_mute
      type: enum
      values: [00h=Off, 01h=On, FFh=Not supported]
    - name: forced_onscreen_mute
      type: enum
      values: [00h=Off, 01h=On, FFh=Not supported]

- id: projector_info
  label: Projector Information
  type: object
  properties:
    - name: projector_name
      type: string
      description: "DATA01-49, NUL-terminated"
    - name: lamp_usage_time
      type: integer
      description: "DATA83-86, seconds; updated at 1-minute intervals"

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: "DATA01-04, seconds"
    - name: filter_alarm_start_time
      type: integer
      description: "DATA05-08, seconds; returns -1 if undefined"

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: target
      type: enum
      values: [00h=Lamp1, 01h=Lamp2]
    - name: content
      type: enum
      values: [01h=Usage time (seconds), 04h=Remaining life (%)]
    - name: value
      type: integer
      description: "DATA03-06; negative if replacement deadline exceeded"
  notes: "01h (Lamp 2) only effective for two-lamp models"

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - name: target
      type: enum
      values: [00h=Total Carbon Savings, 01h=Carbon Savings during operation]
    - name: carbon_kg
      type: number
      description: "DATA02-05, kilograms; max 99999"
    - name: carbon_mg
      type: integer
      description: "DATA06-09, milligrams; max 999999"

- id: eco_mode_status
  label: Eco Mode Status
  type: integer
  description: "Eco mode value; model-specific; see Appendix"

- id: projector_name_status
  label: Projector Name Status
  type: string
  description: "DATA01-17, NUL-terminated"

- id: mac_address_status
  label: MAC Address Status
  type: string
  description: "DATA01-06, six bytes"

- id: pip_pbp_status
  label: PIP/Picture by Picture Status
  type: object
  properties:
    - name: mode
      type: enum
      description: "00h=PIP, 01h=PICTURE BY PICTURE"
    - name: start_position
      type: enum
      description: "00h=TOP-LEFT, 01h=TOP-RIGHT, 02h=BOTTOM-LEFT, 03h=BOTTOM-RIGHT"
    - name: sub_input
      type: integer
      description: "Sub input setting value; see Appendix"

- id: edge_blending_mode_status
  label: Edge Blending Mode Status
  type: enum
  values: [00h=OFF, 01h=ON]

- id: model_name_status
  label: Model Name Status
  type: string
  description: "DATA01-32, NUL-terminated"

- id: cover_status
  label: Cover Status
  type: enum
  values: [00h=Normal (opened), 01h=Cover closed]

- id: lens_position_request
  label: Lens Position Request
  type: object
  properties:
    - name: target
      type: enum
      description: "00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V)"
    - name: upper_limit
      type: integer
      description: "16-bit value (DATA02-03)"
    - name: lower_limit
      type: integer
      description: "16-bit value (DATA04-05)"
    - name: current_value
      type: integer
      description: "16-bit value (DATA06-07)"

- id: lens_memory_option_status
  label: Lens Memory Option Status
  type: object
  properties:
    - name: target
      type: enum
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: enum
      description: "00h=OFF, 01h=ON"

- id: lens_profile_status
  label: Lens Profile Status
  type: object
  properties:
    - name: profile_number
      type: enum
      description: "00h=Profile 1, 01h=Profile 2"

- id: lens_info
  label: Lens Information
  type: bitfield
  description: "Bit0=Lens memory, Bit1=Zoom, Bit2=Focus, Bit3=Lens Shift(H), Bit4=Lens Shift(V); 0=Stop, 1=During operation"

- id: gain_parameter_request
  label: Gain Parameter Request
  type: object
  properties:
    - name: status
      type: enum
      description: "00h=Display not possible, 01h=Adjustment not possible, 02h=Adjustment possible, FFh=Specified gain does not exist"
    - name: upper_limit
      type: integer
      description: "16-bit (DATA02-03)"
    - name: lower_limit
      type: integer
      description: "16-bit (DATA04-05)"
    - name: default_value
      type: integer
      description: "16-bit (DATA06-07)"
    - name: current_value
      type: integer
      description: "16-bit (DATA08-09)"
    - name: default_valid
      type: enum
      description: "00h=Invalid, 01h=Valid"

- id: running_status
  label: Running Status
  type: object
  properties:
    - name: power_status
      type: enum
      description: "00h=Standby, 01h=Power on, FFh=Not supported"
    - name: cooling_process
      type: enum
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: power_on_off_process
      type: enum
      description: "00h=Not executed, 01h=During execution, FFh=Not supported"
    - name: operation_status
      type: enum
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby, FFh=Not supported"

- id: basic_information
  label: Basic Information
  type: object
  properties:
    - name: operation_status
      type: enum
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: enum
      description: "00h=Video signal displayed, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern displayed, 04h=LAN displayed, 05h=Test pattern (user), 10h=Signal being switched"
    - name: video_mute
      type: enum
      description: "00h=Off, 01h=On"
    - name: sound_mute
      type: enum
      description: "00h=Off, 01h=On"
    - name: onscreen_mute
      type: enum
      description: "00h=Off, 01h=On"
    - name: freeze_status
      type: enum
      description: "00h=Off, 01h=On"

- id: information_string
  label: Information String
  type: object
  properties:
    - name: type
      type: enum
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: string_length
      type: integer
      description: "DATA02, length excluding NUL"
    - name: string
      type: string
      description: "DATA03-??, NUL-terminated"

- id: serial_number_status
  label: Serial Number Status
  type: string
  description: "DATA01-16, NUL-terminated"

- id: base_model_type_status
  label: Base Model Type Status
  type: object
  properties:
    - name: base_model_type
      type: integer
      description: "DATA01-02 and DATA12-13"
    - name: model_name
      type: string
      description: "DATA03-11, NUL-terminated"
    - name: sound_function
      type: enum
      description: "00h=Not available, 01h=Available"
    - name: profile_number
      type: enum
      description: "00h=Not available, 01h=Clock function, 02h=Sleep timer, 03h=Clock+Sleep timer"

- id: command_execution_result
  label: Command Execution Result
  type: enum
  values:
    - 00h: Ended successfully
    - 01h: Ended with an error
    - FFh: Ended with an error (no signal switch for input)

- id: command_error
  label: Command Error
  type: object
  description: "Returned when command fails; ERR1/ERR2 combination"
  properties:
    - name: err1
      type: integer
    - name: err2
      type: integer
  lookup:
    - "00h/00h": "Command cannot be recognized"
    - "00h/01h": "Command not supported by model"
    - "01h/00h": "Specified value is invalid"
    - "01h/01h": "Specified input terminal is invalid"
    - "01h/02h": "Specified language is invalid"
    - "02h/00h": "Memory allocation error"
    - "02h/02h": "Memory in use"
    - "02h/03h": "Specified value cannot be set"
    - "02h/04h": "Forced onscreen mute on"
    - "02h/06h": "Viewer error"
    - "02h/07h": "No signal"
    - "02h/08h": "Test pattern or filter displayed"
    - "02h/09h": "No PC card inserted"
    - "02h/0Ah": "Memory operation error"
    - "02h/0Ch": "Entry list displayed"
    - "02h/0Dh": "Power is off; command cannot be accepted"
    - "02h/0Eh": "Command execution failed"
    - "02h/0Fh": "No authority necessary for operation"
    - "03h/00h": "Specified gain number is incorrect"
    - "03h/01h": "Specified gain is invalid"
    - "03h/02h": "Adjustment failed"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source;
# adjustment values are set via Actions (picture_adjust, volume_adjust, eco_mode_set, etc.)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source;
# all communication is request/response (polling mode)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
The command protocol uses a binary header format: `[PREAMBLE] [MODEL] [CMD] [DATA...] [CKS]`. Preamble bytes vary by command class. Checksum is low-order byte of sum of all preceding bytes. Responses follow the same structure with a result code (success 20h/22h/23h, error A0h/A2h/A3h) followed by the command code and optional data/error codes.

Key timing constraints from source: POWER ON and POWER OFF commands block all other commands until completion (including cooling time for power off). Lens position commands can be issued continuously without stop; send 00h to stop.

The INPUT SW CHANGE command returns FFh for "ended with error" when no signal switch occurs.

Model-specific appendix tables define valid values for input terminals, aspect ratios, and eco modes — these vary significantly across the NP-P series product line and must be consulted per deployment.
<!-- UNRESOLVED: Standby mode configuration for NP-P547UL specifically not listed in compatibility table; NP-P series models use varying standby mode settings -->
<!-- UNRESOLVED: Lamp count (single vs dual) for NP-P547UL not confirmed in source -->
<!-- UNRESOLVED: Authentication credentials / login procedure not stated (auth.type: none inferred from absence) -->
<!-- UNRESOLVED: Command timing/interval requirements not stated -->
<!-- UNRESOLVED: DHCP / static IP configuration not described -->
<!-- UNRESOLVED: Firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T10:09:32.506Z
last_checked_at: 2026-04-26T22:50:17.420Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:50:17.420Z
matched_actions: 58
action_count: 58
confidence: high
summary: "All 58 spec actions matched to source commands one-to-one; all transport parameters (port 7142, baud 115200, serial 8N1) explicitly documented in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
