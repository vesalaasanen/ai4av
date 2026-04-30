---
schema_version: ai4av-public-spec-v1
device_id: sharp-nec/nec-digital-cinema-projector
entity_id: sharp_nec_nec_digital_cinema_projector
spec_id: admin/sharp-nec-nec-digital-cinema-projector
revision: 1
author: admin
title: "Sharp NEC NEC Digital Cinema Projector Control Spec"
status: published
manufacturer: "Sharp NEC"
manufacturer_key: sharp-nec
model_family: "NEC Digital Cinema Projector"
aliases: []
compatible_with:
  manufacturers:
    - "Sharp NEC"
  models:
    - "NEC Digital Cinema Projector"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
source_documents:
  - title: "Sharp NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:14.963Z
retrieved_at: 2026-04-29T10:09:14.963Z
last_checked_at: 2026-04-26T22:47:56.415Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T22:47:56.415Z
  matched_actions: 61
  action_count: 61
  confidence: high
  summary: "All 61 spec actions matched semantic mappings to source commands; transport parameters verified verbatim; spec comprehensively represents documented protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Sharp NEC NEC Digital Cinema Projector Control Spec

## Summary
Digital cinema projector supporting both RS-232C serial and TCP/IP network control. The projector accepts hexadecimal command packets with control ID, model code, data length, variable data, and checksum. Responses return acknowledgement with error codes or requested data. No authentication procedure is described in the source.

<!-- UNRESOLVED: specific model number not stated in source — "BDT140013" may be the manual number rather than model -->
<!-- UNRESOLVED: wireless LAN unit manual reference not available -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # stated: "Use TCP port number 7142 for sending and receiving commands"
serial:
  baud_rate: 115200  # stated: supports 115200/38400/19200/9600/4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not mentioned; RTS/CTS pins present in pinout but no protocol details
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from command examples:
- powerable      # POWER ON, POWER OFF commands present
- routable       # INPUT SW CHANGE command present
- queryable      # multiple information/status request commands present
- levelable      # PICTURE ADJUST, VOLUME ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector power. No other command accepted during execution.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector power including cooling time. No other command accepted during execution.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (hex). See appendix for values; example 06h = video port.

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Automatically cleared by input or video signal switch.

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Automatically cleared by input switch, video signal switch, or volume adjustment.

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Automatically cleared by input or video signal switch.

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
      description: "Adjustment target: 00h=brightness, 01h=contrast, 02h=color, 03h=hue, 04h=sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order byte first)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value (low-order byte first)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect ratio value. See appendix for values.

- id: other_adjust
  label: Other Adjust
  kind: action
  params:
    - name: target
      type: integer
      description: "96h=LAMP ADJUST / LIGHT ADJUST"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value
      type: integer
      description: 16-bit signed adjustment value

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: "Key code to send. Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 4Bh=COMPUTER1, 51h=S-VIDEO1, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT"

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  description: Closes the lens shutter.

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  description: Opens the lens shutter.

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: function
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=continuous+, 81h=continuous-, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: command
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value
      type: integer
      description: 16-bit position value

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
  description: Controls the profile number specified by LENS PROFILE SET command.

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
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: Eco mode value. See appendix for values.

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
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (varies by item; see spec for details)

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
    - name: state
      type: integer
      description: "01h=Turn freeze on, 02h=Turn freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal number. See appendix for values.
    - name: setting
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"
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
      type: object
      description: "Error status 1: Bit0=cover error, Bit1=temperature error, Bit2=reserved, Bit3=fan error, Bit4=fan error, Bit5=power error, Bit6=lamp off, Bit7=lamp moratorium"
    - name: data02
      type: object
      description: "Error status 2: Bit0=lamp time exceeded, Bit1=formatter error, Bit2=lamp2 off, Bit3=reserved, Bit4-7=see extended status"
    - name: data03
      type: object
      description: "Error status 3: Bit0=reserved, Bit1=FPGA error, Bit2=temp sensor error, Bit3=lamp not present, Bit4=lamp data error, Bit5=mirror cover error, Bit6=lamp2 moratorium, Bit7=lamp2 time exceeded"
    - name: data04
      type: object
      description: "Error status 4: Bit0=lamp2 not present, Bit1=lamp2 data error, Bit2=temp due to dust, Bit3=foreign matter sensor, Bit4=reserved, Bit5=ballast comm error, Bit6=iris calibration error, Bit7=lens not installed"
    - name: data09
      type: object
      description: "Extended status: Bit0=portrait cover side up, Bit1=interlock switch open, Bit2=system error (slave CPU), Bit3=system error (formatter)"

- id: information_request
  label: Information Request
  type: object
  properties:
    - name: projector_name
      type: string
      description: Up to 49 bytes, NUL-terminated
    - name: lamp_usage_time
      type: integer
      description: Seconds (DATA83-86), updated at 1-minute intervals
    - name: filter_usage_time
      type: integer
      description: Seconds (DATA87-90), updated at 1-minute intervals

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Seconds
    - name: filter_alarm_start_time
      type: integer
      description: Seconds (-1 if undefined)

- id: lamp_info
  label: Lamp Information
  type: object
  properties:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=usage time (seconds), 04h=remaining life (%)"
    - name: value
      type: integer
      description: Usage time or remaining life. Negative if deadline exceeded.

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  properties:
    - name: type
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"
    - name: kilograms
      type: integer
      description: Maximum 99999 kg
    - name: milligrams
      type: integer
      description: Maximum 999999 mg

- id: lens_control_request
  label: Lens Control Request
  type: object
  properties:
    - name: upper_limit
      type: integer
      description: 16-bit upper limit of adjustment range
    - name: lower_limit
      type: integer
      description: 16-bit lower limit of adjustment range
    - name: current_value
      type: integer
      description: 16-bit current lens position

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  properties:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: lens_information
  label: Lens Information
  type: object
  properties:
    - name: lens_memory_status
      type: integer
      description: Bit0=lens memory (0=stop, 1=operating)
    - name: zoom_status
      type: integer
      description: Bit1 (0=stop, 1=operating)
    - name: focus_status
      type: integer
      description: Bit2 (0=stop, 1=operating)
    - name: lens_shift_h_status
      type: integer
      description: Bit3 (0=stop, 1=operating)
    - name: lens_shift_v_status
      type: integer
      description: Bit4 (0=stop, 1=operating)

- id: lens_profile_request
  label: Lens Profile Request
  type: object
  properties:
    - name: profile_number
      type: integer
      description: "00h=Profile 1, 01h=Profile 2"

- id: gain_parameter_request
  label: Gain Parameter Request 3
  type: object
  properties:
    - name: status
      type: integer
      description: "00h=display not possible, 01h=adjustment not possible, 02h=adjustment possible, FFh=gain does not exist"
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
    - name: default_valid
      type: integer
      description: "00h=invalid, 01h=valid"

- id: setting_request
  label: Setting Request
  type: object
  properties:
    - name: base_model_type
      type: string
      description: 3 bytes
    - name: sound_function
      type: integer
      description: "00h=not available, 01h=available"
    - name: profile_number
      type: integer
      description: "00h=not available, 01h=clock, 02h=sleep timer, 03h=clock+sleep timer"

- id: running_status
  label: Running Status Request
  type: object
  properties:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on, FFh=not supported"
    - name: cooling_status
      type: integer
      description: "00h=not executed, 01h=during execution, FFh=not supported"
    - name: power_onoff_process
      type: integer
      description: "00h=not executed, 01h=during execution, FFh=not supported"
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby, FFh=not supported"

- id: input_status
  label: Input Status Request
  type: object
  properties:
    - name: signal_switch_process
      type: integer
      description: "00h=not executed, 01h=during execution, FFh=not supported"
    - name: signal_list_number
      type: integer
      description: 0-199 (returned value is actual-1)
    - name: signal_type_1
      type: integer
      description: "01h-05h=1-5"
    - name: signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input"
    - name: signal_list_type
      type: integer
      description: "00h=Default, 01h=User, FFh=not supported"
    - name: test_pattern_display
      type: integer
      description: "00h=not displayed, 01h=displayed, FFh=not supported"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN displayed, FFh=not supported"

- id: mute_status
  label: Mute Status Request
  type: object
  properties:
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
      description: "00h=not displayed, 01h=displayed"

- id: model_name_request
  label: Model Name Request
  type: string
  description: Up to 32 bytes, NUL-terminated

- id: cover_status
  label: Cover Status Request
  type: object
  properties:
    - name: status
      type: integer
      description: "00h=Normal (cover opened), 01h=Cover closed"

- id: information_string_request
  label: Information String Request
  type: object
  properties:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
    - name: string_length
      type: integer
      description: Excluding NUL character
    - name: string
      type: string
      description: NUL-terminated

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  description: Eco mode value. See appendix for values.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  description: Up to 17 bytes, NUL-terminated

- id: lan_mac_address_request
  label: LAN MAC Address Request
  type: string
  description: 6-byte MAC address

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  type: object
  properties:
    - name: item
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: integer
  description: "00h=OFF, 01h=ON"

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  properties:
    - name: base_model_type
      type: string
      description: 2 bytes
    - name: model_name
      type: string
      description: Up to 15 bytes, NUL-terminated

- id: serial_number_request
  label: Serial Number Request
  type: string
  description: Up to 16 bytes, NUL-terminated

- id: basic_information_request
  label: Basic Information Request
  type: object
  properties:
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN displayed, 05h=Test pattern(user), 10h=Signal being switched"
    - name: signal_type_1
      type: integer
    - name: signal_type_2
      type: integer
    - name: display_signal_type
      type: integer
      description: Various video standards; see spec for full list
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
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters documented separately from actions;
# many commands have both request and set variants (e.g., ECO MODE REQUEST/SET, LENS MEMORY OPTION REQUEST/SET)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described; all communication appears to be command-response
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described as macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements
# stated in source; "interlock switch" mentioned in error status (DATA09 Bit1) but no
# interlock procedure documented
```

## Notes
The projector uses a binary hexadecimal protocol with the following packet structure:

**Command packet:** `20h [ID1] [ID2] [LEN] [DATA...] [CKS]`
**Response packet:** `[A0h/A1h/A2h/A3h] [ID1] [ID2] [LEN] [DATA...] [CKS]`

Where:
- `ID1` = Control ID (set in projector)
- `ID2` = Model code (varies by model)
- `LEN` = Data length of data portion
- `CKS` = Checksum = low-order byte of sum of all preceding bytes

Response prefix indicates type: `A0h`/`A1h`/`A2h`/`A3h` = responses with error codes; `20h`-`23h` = responses with data.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included in source — input terminal values, aspect values, eco mode values, base model type values, sub input values all reference this appendix -->
<!-- UNRESOLVED: wireless LAN unit manual not available -->
<!-- UNRESOLVED: specific model identification not possible from source; "BDT140013 Rev 7.1" appears to be the manual revision number -->
<!-- UNRESOLVED: no authentication mechanism described, but LAN connection may have separate network-level security not covered in this control protocol manual -->

## Provenance

```yaml
source_urls:
  - https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
source_documents:
  - title: "Sharp NEC public source"
    url: https://sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:09:14.963Z
retrieved_at: 2026-04-29T10:09:14.963Z
last_checked_at: 2026-04-26T22:47:56.415Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:47:56.415Z
matched_actions: 61
action_count: 61
confidence: high
summary: "All 61 spec actions matched semantic mappings to source commands; transport parameters verified verbatim; spec comprehensively represents documented protocol."
```

## Known Gaps

```yaml
[]
```
