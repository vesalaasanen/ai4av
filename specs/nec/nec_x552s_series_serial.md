---
spec_id: admin/nec-x552s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC X552S Series Control Spec"
manufacturer: NEC
model_family: "X552S Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "X552S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-06T17:20:02.972Z
generated_at: 2026-05-06T17:20:02.972Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-06T17:20:02.972Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions verified against numbered command reference; audio_select_request marked UNRESOLVED in spec correctly reflects source omission of a Request variant."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC X552S Series Control Spec

## Summary
NEC X552S Series projector supporting both RS-232C serial and wired LAN (TCP/IP) control. Supports power on/off, input routing, picture/sound mute, volume, lens control, eco mode, and query commands for status, lamp usage, filter usage, and model information. Uses a binary checksum-based protocol with Control ID and Model code parameters.

<!-- UNRESOLVED: full list of supported input terminals for all models not provided; Appendix references external supplementary information -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN commands
serial:
  baud_rate: 115200  # highest common; also supports 38400/19200/9600/4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not explicitly stated; RTS/CTS pins present per pin assignment table
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- powerable       # POWER ON/OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable      # INFORMATION REQUEST, STATUS REQUEST, MODEL NAME REQUEST, etc. present
- levelable      # VOLUME ADJUST, PICTURE ADJUST (brightness/contrast/color/hue/sharpness), LAMP ADJUST present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted during power-on sequence.

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during cooling period.

- id: input_sw_change
  label: Input Switch Change
  kind: action
  params:
    - name: input
      type: integer
      description: Input terminal hex code (e.g., 06h=VIDEO, 01h=COMPUTER, A1h=HDMI, 20h=LAN/NETWORK, C4h=SDI)

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
    - name: target
      type: integer
      description: Adjustment target (00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness)
    - name: mode
      type: integer
      description: "0=Specify absolute value, 1=Specify relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Specify absolute value, 1=Specify relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit, low-order then high-order)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect mode hex code (see Appendix for values)

- id: lamp_adjust
  label: Lamp/Light Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Specify absolute value, 1=Specify relative value"
    - name: value
      type: integer
      description: Adjustment value (16-bit)

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Key code from remote control (e.g., 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)

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
    - name: target
      type: integer
      description: "06h=Periphery Focus"
    - name: direction
      type: integer
      description: "00h=Stop, 01h/02h/03h=Drive 1s/0.5s/0.25s plus, 7Fh=Drive plus, 81h=Drive minus, FDh/FEh/FFh=Drive 0.25s/0.5s/1s minus"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: action
      type: integer
      description: "FFh=Stop"
    - name: mode
      type: integer
      description: "0=Specify absolute value, 2=Specify relative value"
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

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: mode
      type: integer
      description: Eco mode hex code (see Appendix; 00h=OFF, 01h=ON/NORMAL, 02h/03h=ECO, 04h=LONG LIFE, 05h=BOOST, 06h=SILENT)

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
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: value
      type: integer
      description: Setting value (varies by target)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
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

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: terminal
      type: integer
      description: Input terminal hex code
    - name: source
      type: integer
      description: "00h=Terminal in DATA01, 01h=BNC, 02h=COMPUTER"

- id: error_status_request
  label: Error Status Request
  kind: query
  params: []
  description: Gets current error information. Returns 12 bytes of bitmapped error status.

- id: information_request
  label: Information Request
  kind: query
  params: []
  description: Gets projector name, lamp usage time (seconds), filter usage time (seconds).

- id: filter_usage_request
  label: Filter Usage Information Request
  kind: query
  params: []
  description: Gets filter usage time and alarm start time in seconds.

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  params:
    - name: lamp
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"
  description: Gets current lens position adjustment range limits and current value.

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
  description: Gets current lens memory option setting.

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  params: []
  description: Gets currently selected lens profile number.

- id: lens_information_request
  label: Lens Information Request
  kind: query
  params: []
  description: Gets lens operational status (memory, zoom, focus, lens shift H/V).

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  params:
    - name: parameter
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT"
  description: Gets adjustment range and current value for picture, volume, or lamp parameters.

- id: setting_request
  label: Setting Request
  kind: query
  params: []
  description: Gets base model type, sound function availability, clock/sleep timer function availability.

- id: running_status_request
  label: Running Status Request
  kind: query
  params: []
  description: Gets power status, cooling process, power on/off process, operation status.

- id: input_status_request
  label: Input Status Request
  kind: query
  params: []
  description: Gets signal switch process, signal list number, signal type, test pattern display, content displayed.

- id: mute_status_request
  label: Mute Status Request
  kind: query
  params: []
  description: Gets picture mute, sound mute, onscreen mute, forced onscreen mute, onscreen display status.

- id: model_name_request
  label: Model Name Request
  kind: query
  params: []
  description: Gets the model name as a NUL-terminated string (up to 32 bytes).

- id: cover_status_request
  label: Cover Status Request
  kind: query
  params: []
  description: Gets mirror/lens cover status (00h=Normal/open, 01h=Cover closed).

- id: information_string_request
  label: Information String Request
  kind: query
  params:
    - name: type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"
  description: Gets specified information string in English.

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  params: []
  description: Gets current eco mode setting.

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  params: []
  description: Gets the projector name.

- id: lan_mac_address_request
  label: LAN MAC Address Status Request 2
  kind: query
  params: []
  description: Gets the MAC address (6 bytes).

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
  description: Gets current PIP/PBP setting.

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  params: []
  description: Gets edge blending mode setting.

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  params: []
  description: Gets base model type, model name, and base model type.

- id: serial_number_request
  label: Serial Number Request
  kind: query
  params: []
  description: Gets the serial number as a NUL-terminated string (up to 16 bytes).

- id: basic_information_request
  label: Basic Information Request
  kind: query
  params: []
  description: Gets operation status, content displayed, signal type, video/sound/onscreen mute, freeze status.

- id: audio_select_request
  label: Audio Select Request
  kind: query
  params: []
  description: UNRESOLVED: audio select request command not found in source; audio select values documented only for SET command [319-10]
```

## Feedbacks
```yaml
# Standard response format for most commands:
# Success (no data): A2h <ID1> <ID2> 02h <ERR1=00h> <ERR2=00h> <CKS>
# Success (with data): 22h/23h <ID1> <ID2> <LEN> <DATA...> <CKS>
# Error: A3h/A0h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>
#
# Error code list:
# ERR1|ERR2|Meaning
# 00h|00h|Command not recognized
# 00h|01h|Command not supported by model
# 01h|00h|Invalid value specified
# 01h|01h|Invalid input terminal specified
# 01h|02h|Invalid language specified
# 02h|00h|Memory allocation error
# 02h|02h|Memory in use
# 02h|03h|Value cannot be set
# 02h|04h|Forced onscreen mute on
# 02h|06h|Viewer error
# 02h|07h|No signal
# 02h|08h|Test pattern or filter displayed
# 02h|09h|No PC card inserted
# 02h|0Ah|Memory operation error
# 02h|0Ch|Entry list displayed
# 02h|0Dh|Command cannot be accepted (power off)
# 02h|0Eh|Command execution failed
# 02h|0Fh|No authority for operation
# 03h|00h|Incorrect gain number
# 03h|01h|Invalid gain specified
# 03h|02h|Adjustment failed
```

## Variables
```yaml
# UNRESOLVED: the protocol uses setter/query commands rather than discrete settable variables.
# All adjustable parameters are controlled via action commands with encoded parameter data.
# Variables captured here represent queryable state:
- id: power_status
  type: enum
  values: [standby, power_on, cooling, standby_sleep, standby_power_saving, standby_error, network_standby]
  description: From RUNNING STATUS REQUEST DATA03/DATA06

- id: input_signal_status
  type: object
  description: From INPUT STATUS REQUEST — signal list number, signal type 1/2, test pattern, content displayed

- id: mute_status
  type: object
  description: From MUTE STATUS REQUEST — picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display

- id: lamp_usage_time
  type: integer
  description: Lamp usage time in seconds from LAMP INFORMATION REQUEST 3

- id: lamp_remaining_life
  type: integer
  description: Lamp remaining life percentage from LAMP INFORMATION REQUEST 3

- id: filter_usage_time
  type: integer
  description: Filter usage time in seconds from FILTER USAGE INFORMATION REQUEST

- id: eco_mode
  type: enum
  values: [off, normal, eco, auto_eco, long_life, boost, silent]
  description: From ECO MODE REQUEST

- id: projector_name
  type: string
  description: From LAN PROJECTOR NAME REQUEST or INFORMATION REQUEST

- id: model_name
  type: string
  description: From MODEL NAME REQUEST

- id: serial_number
  type: string
  description: From SERIAL NUMBER REQUEST
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source.
# The device only responds to commands; no push-style events are documented.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
# Standby mode requirements vary by model for receiving serial/LAN commands.
# Some models require specific standby modes (Normal, Active, Eco, NETWORK STANDBY, SLEEP, etc.)
# for serial or LAN control — varies per model, not stated for X552S Series specifically.
```

## Notes
- **Protocol structure**: Binary protocol with header byte (02h for most commands, 00h/01h/03h for requests), followed by command byte, then ID1, ID2, data length, data bytes, and checksum (low-order byte of sum of all preceding bytes).
- **Control ID and Model code**: ID1 (Control ID) and ID2 (Model code) are required parameters set for the projector; their values are not stated in this document.
- **Baud rate selection**: The highest common baud rate is 115200; 38400, 19200, 9600, and 4800 are also supported. No auto-baud detection is mentioned.
- **LAN standby**: TCP port 7142 is used for sending and receiving commands over wired LAN.
- **Input terminal values**: Multiple hex codes are model-dependent (e.g., HDMI=A1h or 1Ah, COMPUTER3=1Ah or 03h). Appendix "Supplementary Information by Command" is referenced but not included in full.
- **Aspect, eco mode, audio select values**: Full lookup tables are in the Appendix which is referenced but not included in this source excerpt.
- **Power-on/power-off blocking**: No other commands accepted while power is turning on or during cooling period.
- **Lens stop commands**: After sending 7Fh or 81h to drive lens continuously, stop by sending 00h.
- **Lamp/filter update interval**: Usage times obtained in 1-second units but updated at 1-minute intervals.
- **Lamp remaining life**: Returns negative value if replacement deadline exceeded.
- <!-- UNRESOLVED: full Appendix tables (input terminal hex codes by model, aspect values, eco mode values, signal type codes) not included in source excerpt — these are referenced as external appendix -->
- <!-- UNRESOLVED: HDBaseT standby mode support mentioned but not detailed -->
- <!-- UNRESOLVED: which specific standby mode the X552S requires for serial/LAN command reception -->
- <!-- UNRESOLVED: flow control configuration (hardware flow control pins are mapped in pin assignment but never referenced in communication conditions) -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
retrieved_at: 2026-04-29T13:51:21.081Z
last_checked_at: 2026-05-06T17:20:02.972Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-06T17:20:02.972Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions verified against numbered command reference; audio_select_request marked UNRESOLVED in spec correctly reflects source omission of a Request variant."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
