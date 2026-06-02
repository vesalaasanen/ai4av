---
spec_id: admin/nec-ex38-e498-ex58-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC Ex38 E498 Ex58 Series Control Spec"
manufacturer: NEC
model_family: Ex38
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - Ex38
    - E498
    - "Ex58 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:01:25.457Z
last_checked_at: 2026-06-02T22:10:23.100Z
generated_at: 2026-06-02T22:10:23.100Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless LAN control not documented beyond noting a wireless LAN unit can be connected"
  - "multiple baud rates supported (115200/38400/19200/9600/4800); no single default stated"
  - "hardware flow control (RTS/CTS) pinout defined but flow_control setting not specified"
  - "many settable parameters exist but source organizes them as action param spaces."
  - "no unsolicited notification mechanism described in source - projector only responds to commands."
  - "no explicit multi-step macro sequences defined in source."
  - "specific voltage/current/power specifications not stated in source."
  - "lamp replacement moratorium periods not detailed beyond bit-flag naming."
  - "serial baud rate default not stated; source lists 115200/38400/19200/9600/4800 as options with no single default"
  - "data_rate for wired LAN is auto-switchable (10/100 Mbps) — no explicit configuration"
  - "input terminal numeric codes (DATA01 for INPUT SW CHANGE) defined in appendix not present in source"
  - "aspect value codes and eco mode value codes defined in appendix not present in source"
  - "sub input setting values for PIP/PbP defined in appendix not present in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:10:23.100Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# NEC Ex38 E498 Ex58 Series Control Spec

## Summary
Projector supporting both serial (RS-232C) and wired TCP/IP control interfaces. Port 7142 for TCP/IP; configurable serial baud rates from 4800 to 115200 bps. Full command set includes power control, input routing, picture/sound mute, lens positioning, eco mode, and comprehensive status queries.

<!-- UNRESOLVED: wireless LAN control not documented beyond noting a wireless LAN unit can be connected -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port number stated in source
serial:
  baud_rate: null  # UNRESOLVED: multiple baud rates supported (115200/38400/19200/9600/4800); no single default stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: hardware flow control (RTS/CTS) pinout defined but flow_control setting not specified
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# inferred from documented commands:
- powerable       # POWER ON / POWER OFF commands present
- routable        # INPUT SW CHANGE command present
- queryable       # multiple status/information request commands present
- levelable       # VOLUME ADJUST, PICTURE ADJUST, ASPECT ADJUST commands present
```

## Actions
```yaml
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
      description: Input terminal value (hex; actual values defined in appendix "Supplementary Information by Command" not included in source)

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
      description: "00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: value
      type: integer
      description: Aspect value (actual values in appendix "Supplementary Information by Command" not included in source)

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: "96h/FFh = Lamp Adjust / Light Adjust"
    - name: mode
      type: integer
      description: "00h=absolute value, 01h=relative value"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: 16-bit key code (see key code table; e.g. 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU)

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
      description: "00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continue, 81h=-continue, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: stop_or_adjust
      type: integer
      description: "FFh=Stop, otherwise adjustment mode"
    - name: mode
      type: integer
      description: "00h=absolute value, 02h=relative value"
    - name: value_low
      type: integer
      description: Adjustment value low-order 8 bits
    - name: value_high
      type: integer
      description: Adjustment value high-order 8 bits

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
      description: Eco mode value (actual values in appendix "Supplementary Information by Command" not included in source)

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
      description: Setting value dependent on target (see source for full enumeration)

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00h=OFF, 01h=ON"

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal value (actual values in appendix "Supplementary Information by Command" not included in source)
    - name: setting_value
      type: integer
      description: "00h=terminal specified in DATA01, 01h=BNC, 02h=COMPUTER"

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: state
      type: integer
      description: "01h=Freeze on, 02h=Freeze off"

- id: error_status_request
  label: Error Status Request
  kind: action
  params: []

- id: information_request
  label: Information Request
  kind: action
  params: []

- id: filter_usage_info_request
  label: Filter Usage Information Request
  kind: action
  params: []

- id: lamp_info_request_3
  label: Lamp Information Request 3
  kind: action
  params:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time (seconds), 04h=Lamp remaining life (%)"

- id: carbon_savings_request
  label: Carbon Savings Information Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: lens_control_request
  label: Lens Control Request
  kind: action
  params:
    - name: target
      type: integer
      description: "06h=Periphery Focus"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: action
  params:
    - name: option
      type: integer
      description: "00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_profile_request
  label: Lens Profile Request
  kind: action
  params: []

- id: lens_info_request
  label: Lens Information Request
  kind: action
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: action
  params:
    - name: adjusted_value_name
      type: integer
      description: "00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST/LIGHT ADJUST"

- id: setting_request
  label: Setting Request
  kind: action
  params: []

- id: running_status_request
  label: Running Status Request
  kind: action
  params: []

- id: input_status_request
  label: Input Status Request
  kind: action
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: action
  params: []

- id: model_name_request
  label: Model Name Request
  kind: action
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: action
  params: []

- id: information_string_request
  label: Information String Request
  kind: action
  params:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync frequency, 04h=Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: action
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: action
  params: []

- id: lan_mac_address_request
  label: LAN MAC Address Request
  kind: action
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: action
  params:
    - name: target
      type: integer
      description: "00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: action
  params: []

- id: base_model_type_request
  label: Base Model Type Request
  kind: action
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: action
  params: []

- id: basic_info_request
  label: Basic Information Request
  kind: action
  params: []
```

## Feedbacks
```yaml
# Success responses have ERR1=00h and ERR2=00h.
# Error codes (ERR1/ERR2) define specific failure conditions.
# Data responses vary by command - see command details.
- id: error_status_response
  label: Error Status Response
  type: object
  properties:
    - name: data01
      type: integer
      description: "Bit0=Cover error, Bit1=Temperature error, Bit2=None, Bit3=Fan error, Bit4=Fan error, Bit5=Power error, Bit6=Lamp off, Bit7=Lamp moratorium"
    - name: data02
      type: integer
      description: "Bit0=Lamp usage exceeded, Bit1=Formatter error, Bit2=Lamp 2 off, Bit3=None, Bit4=None, Bit7=Extended status"
    - name: data03
      type: integer
      description: "Bit0=None, Bit1=FPGA error, Bit2=Temperature sensor, Bit3=Lamp not present, Bit4=Lamp data error, Bit5=Mirror cover, Bit6=Lamp 2 moratorium, Bit7=Lamp 2 limit"
    - name: data04
      type: integer
      description: "Bit0=Lamp 2 not present, Bit1=Lamp 2 data error, Bit2=Dust temp error, Bit3=Foreign matter, Bit7=Lens not installed"
    - name: data09
      type: integer
      description: "Bit0=Portrait cover side up, Bit1=Interlock switch open, Bit2=System error (Slave CPU), Bit3=System error (Formatter)"

- id: power_response
  label: Power On/Off Response
  type: enum
  values:
    - "01h": Power on
    - "02h": Power off
  notes: Response includes ERR1/ERR2 for error indication

- id: mute_status_response
  label: Mute Status Response
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
      description: "00h=Not displayed, 01h=Displayed"

- id: input_status_response
  label: Input Status Response
  type: object
  properties:
    - name: signal_switch_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: signal_list_number
      type: integer
      description: Signal list number (returned value + 1 = practical number)
    - name: signal_type_1
      type: integer
      description: "01h-05h, 07h=VIEWER(1-5)"
    - name: signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10)"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer, 03h=Test pattern, 04h=LAN displayed"

- id: running_status_response
  label: Running Status Response
  type: object
  properties:
    - name: power_status
      type: integer
      description: "00h=Standby, 01h=Power on"
    - name: cooling_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: power_on_off_process
      type: integer
      description: "00h=Not executed, 01h=During execution"
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"

- id: model_name_response
  label: Model Name Response
  type: string
  description: Up to 32 characters NUL-terminated

- id: serial_number_response
  label: Serial Number Response
  type: string
  description: Up to 16 characters NUL-terminated

- id: lamp_usage_response
  label: Lamp Information Response
  type: object
  properties:
    - name: lamp_number
      type: integer
      description: "00h=Lamp 1, 01h=Lamp 2"
    - name: content
      type: integer
      description: "01h=Lamp usage time, 04h=Lamp remaining life"
    - name: value
      type: integer
      description: Usage time in seconds (updated at 1-minute intervals) or remaining life percentage (negative if deadline exceeded)

- id: filter_usage_response
  label: Filter Usage Response
  type: object
  properties:
    - name: filter_usage_time
      type: integer
      description: Filter usage time in seconds
    - name: filter_alarm_start_time
      type: integer
      description: Filter alarm start time in seconds; -1 if not defined

- id: info_string_response
  label: Information String Response
  type: object
  properties:
    - name: info_type
      type: integer
      description: "03h=Horizontal sync freq, 04h=Vertical sync freq"
    - name: string_length
      type: integer
      description: Length of string excluding NUL
    - name: string
      type: string
      description: Information string (NUL-terminated)

- id: basic_info_response
  label: Basic Information Response
  type: object
  properties:
    - name: operation_status
      type: integer
      description: "00h=Standby(Sleep), 04h=Power on, 05h=Cooling, 06h=Standby(error), 0Fh=Standby(Power saving), 10h=Network standby"
    - name: content_displayed
      type: integer
      description: "00h=Video signal, 01h=No signal, 02h=Viewer displayed, 03h=Test pattern displayed, 04h=LAN displayed, 05h=Test pattern(user), 10h=Signal being switched"
    - name: signal_type_1
      type: integer
      description: "01h-05h"
    - name: signal_type_2
      type: integer
      description: "01h=COMPUTER, 02h=VIDEO, 03h=S-VIDEO, 04h=COMPONENT, 05h=Reserved, 07h=VIEWER(1-5), 20h=DVI-D, 21h=HDMI, 22h=DisplayPort, 23h=VIEWER(6-10), FFh=Not Source Input"
    - name: display_signal_type
      type: integer
      description: "00h-0Fh, FFh=Not Video Input"
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

- id: execution_result
  label: Execution Result (common)
  type: object
  properties:
    - name: execution_result_code
      type: integer
      description: "0000h=success, other=error"
    - name: err1
      type: integer
      description: Error code high byte
    - name: err2
      type: integer
      description: Error code low byte
```

## Variables
```yaml
# UNRESOLVED: many settable parameters exist but source organizes them as action param spaces.
# Variables that can be queried (read) are represented by Feedbacks entries above.
# Specific variable ranges (min/max/default) are only documented for GAIN PARAMETER REQUEST 3.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification mechanism described in source - projector only responds to commands.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "While POWER ON command is executing, no other command can be accepted."
  - "While POWER OFF command is executing (including cooling time), no other command can be accepted."
  - "Interlock switch open (Bit1 of DATA09 in error status) indicates a safety interlock is open."
# UNRESOLVED: specific voltage/current/power specifications not stated in source.
# UNRESOLVED: lamp replacement moratorium periods not detailed beyond bit-flag naming.
```

## Notes
- Protocol uses hex notation throughout. Commands follow format: `[PAD] [CLASS] [CLASS2] [ID1] [ID2] [LEN] [DATA...] [CKS]` with responses in `[RESPONSE_PREFIX] [CLASS] [ID1] [ID2] [LEN] [DATA...] [CKS]`.
- Checksum (CKS): add all preceding bytes, use low-order 8 bits of result.
- Control ID (ID1) and Model code (ID2) must be set appropriately for the target projector.
- Multiple appendix values (input terminal codes, aspect values, eco mode values, signal type values) are referenced as "Supplementary Information by Command" but not included in this source document.
- Lens control supports both immediate-direction drive (7Fh/81h) and timed drive modes.
- Wireless LAN unit is optional; commands for wireless LAN control are not documented in this source.
<!-- UNRESOLVED: serial baud rate default not stated; source lists 115200/38400/19200/9600/4800 as options with no single default -->
<!-- UNRESOLVED: data_rate for wired LAN is auto-switchable (10/100 Mbps) — no explicit configuration -->
<!-- UNRESOLVED: input terminal numeric codes (DATA01 for INPUT SW CHANGE) defined in appendix not present in source -->
<!-- UNRESOLVED: aspect value codes and eco mode value codes defined in appendix not present in source -->
<!-- UNRESOLVED: sub input setting values for PIP/PbP defined in appendix not present in source -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-05-13T08:01:25.457Z
last_checked_at: 2026-06-02T22:10:23.100Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:10:23.100Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions traced to source (dip-safe re-verify). (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless LAN control not documented beyond noting a wireless LAN unit can be connected"
- "multiple baud rates supported (115200/38400/19200/9600/4800); no single default stated"
- "hardware flow control (RTS/CTS) pinout defined but flow_control setting not specified"
- "many settable parameters exist but source organizes them as action param spaces."
- "no unsolicited notification mechanism described in source - projector only responds to commands."
- "no explicit multi-step macro sequences defined in source."
- "specific voltage/current/power specifications not stated in source."
- "lamp replacement moratorium periods not detailed beyond bit-flag naming."
- "serial baud rate default not stated; source lists 115200/38400/19200/9600/4800 as options with no single default"
- "data_rate for wired LAN is auto-switchable (10/100 Mbps) — no explicit configuration"
- "input terminal numeric codes (DATA01 for INPUT SW CHANGE) defined in appendix not present in source"
- "aspect value codes and eco mode value codes defined in appendix not present in source"
- "sub input setting values for PIP/PbP defined in appendix not present in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
