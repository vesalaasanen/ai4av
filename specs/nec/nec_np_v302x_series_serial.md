---
spec_id: admin/nec-np-v302x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "NEC NP-V302X Series Control Spec"
manufacturer: NEC
model_family: "NP-V302X Series"
aliases: []
compatible_with:
  manufacturers:
    - NEC
  models:
    - "NP-V302X Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:48.163Z
last_checked_at: 2026-04-25T21:23:58.703Z
generated_at: 2026-04-25T21:23:58.703Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "lamp/filter replacement moratorium safety warnings not explicitly documented in command reference section"
  - "baud rate configurable (115200/38400/19200/9600/4800); default not stated"
  - "flow control not documented"
  - "all parameters are command-driven with discrete actions;"
  - "no unsolicited event notifications documented in source;"
  - "lamp replacement moratorium warnings are documented as bit flags"
  - "default serial baud rate not explicitly stated; selectable from 115200/38400/19200/9600/4800"
  - "flow control (RTS/CTS) pinout documented but software flow control not specified"
  - "concrete input terminal codes for V302X model not in appendix tables (appendix lists other NP models)"
  - "concrete aspect ratio values for V302X model not in appendix tables"
  - "concrete eco mode values for V302X model not in appendix tables"
  - "standby mode settings table does not include V302X series explicitly"
verification:
  verdict: verified
  checked_at: 2026-04-25T21:23:58.703Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 spec commands matched with hex-level fidelity in NEC V302X source; transport parameters verified; comprehensive coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# NEC NP-V302X Series Control Spec

## Summary
NEC NP-V302X Series LCD projector supporting both RS-232C serial and wired TCP/IP control. Supports power on/off, input routing, picture/sound mute, volume, lens control, eco mode, and comprehensive status queries via hex-based command protocol with checksum.

<!-- UNRESOLVED: lamp/filter replacement moratorium safety warnings not explicitly documented in command reference section -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142  # TCP port for LAN commands
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable (115200/38400/19200/9600/4800); default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not documented
auth:
  type: none  # inferred: no auth procedure in source
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
- id: power_on
  label: Power On
  kind: action
  params: []
  description: Turns on the projector. No other command accepted during power-on sequence.
  command_hex: 02h 00h 00h 00h 00h 02h
  response_hex_success: 22h 00h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 00h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: Turns off the projector. No other command accepted during cooling period.
  command_hex: 02h 01h 00h 00h 00h 03h
  response_hex_success: 22h 01h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 01h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: input_sw_change
  label: Input Switch
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code (model-dependent; see appendix for code tables)
  command_hex: 02h 03h 00h 00h 02h 01h <DATA01> <CKS>
  response_hex_success: 22h 03h <ID1> <ID2> 01h <DATA01> <CKS>
  response_hex_error: A2h 03h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  params: []
  description: Turns picture mute on. Cancelled by input switch or video signal switch.
  command_hex: 02h 10h 00h 00h 00h 12h
  response_hex_success: 22h 10h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 10h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  params: []
  command_hex: 02h 11h 00h 00h 00h 13h
  response_hex_success: 22h 11h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 11h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  params: []
  description: Turns sound mute on. Cancelled by input switch, video signal switch, or volume adjustment.
  command_hex: 02h 12h 00h 00h 00h 14h
  response_hex_success: 22h 12h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 12h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  params: []
  command_hex: 02h 13h 00h 00h 00h 15h
  response_hex_success: 22h 13h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 13h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  params: []
  description: Turns onscreen mute on. Cancelled by input switch or video signal switch.
  command_hex: 02h 14h 00h 00h 00h 16h
  response_hex_success: 22h 14h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 14h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  params: []
  command_hex: 02h 15h 00h 00h 00h 17h
  response_hex_success: 22h 15h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 15h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: picture_adjust
  label: Picture Adjust
  kind: action
  params:
    - name: adjustment_target
      type: integer
      description: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order 8 bits then high-order 8 bits)
  command_hex: 03h 10h 00h 00h 05h <DATA01> <FFh> <DATA02> <DATA03> <DATA04> <CKS>
  response_hex_success: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: volume_adjust
  label: Volume Adjust
  kind: action
  params:
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value (low-order 8 bits then high-order 8 bits)
  command_hex: 03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>
  response_hex_success: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  params:
    - name: aspect_value
      type: integer
      description: Aspect value (model-dependent; see appendix)
  command_hex: 03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>
  response_hex_success: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  params:
    - name: target
      type: integer
      description: 96h=Lamp Adjust/Light Adjust
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 01h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit signed value
  command_hex: 03h 10h 00h 00h 05h <DATA01> <FFh> <DATA02> <DATA03> <DATA04> <CKS>
  response_hex_success: 23h 10h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: remote_key_code
  label: Remote Key Code
  kind: action
  params:
    - name: key_code
      type: integer
      description: Word-type key code (e.g., 02h=POWER ON, 03h=POWER OFF, 0Dh=HELP, etc.)
  command_hex: 02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>
  response_hex_success: 22h 0Fh <ID1> <ID2> 01h <DATA01> <CKS>
  response_hex_error: A2h 0Fh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: shutter_close
  label: Shutter Close
  kind: action
  params: []
  command_hex: 02h 16h 00h 00h 00h 18h
  response_hex_success: 22h 16h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 16h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: shutter_open
  label: Shutter Open
  kind: action
  params: []
  command_hex: 02h 17h 00h 00h 00h 19h
  response_hex_success: 22h 17h <ID1> <ID2> 00h <CKS>
  response_hex_error: A2h 17h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: lens_control
  label: Lens Control
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), 06h=Periphery Focus
    - name: direction
      type: integer
      description: 00h=Stop, 01h/02h/03h=timed drive plus, 7Fh=continuous plus, 81h=continuous minus, FDh/FEh/FFh=timed drive minus
  command_hex: 02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>
  response_hex_success: 22h 18h <ID1> <ID2> 01h <DATA01> <CKS>
  response_hex_error: A2h 18h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: lens_control_2
  label: Lens Control 2
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V), FFh=Stop
    - name: adjustment_mode
      type: integer
      description: 00h=absolute value, 02h=relative value
    - name: adjustment_value
      type: integer
      description: 16-bit value
  command_hex: 02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>
  response_hex_success: 22h 1Dh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>
  response_hex_error: A2h 1Dh <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET
  command_hex: 02h 1Eh 00h 00h 01h <DATA01> <CKS>
  response_hex_success: 22h 1Eh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 00h=MOVE, 01h=STORE, 02h=RESET
  command_hex: 02h 1Fh 00h 00h 01h <DATA01> <CKS>
  response_hex_success: 22h 1Fh <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
    - name: setting_value
      type: integer
      description: 00h=OFF, 01h=ON
  command_hex: 02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>
  response_hex_success: 22h 21h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  params:
    - name: profile_number
      type: integer
      description: 00h=Profile 1, 01h=Profile 2
  command_hex: 02h 27h 00h 00h 01h <DATA01> <CKS>
  response_hex_success: 22h 27h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>

- id: freeze_control
  label: Freeze Control
  kind: action
  params:
    - name: operation
      type: integer
      description: 01h=Freeze on, 02h=Freeze off
  command_hex: 01h 98h 00h 00h 01h <DATA01> <CKS>
  response_hex_success: 21h 98h <ID1> <ID2> 01h <DATA01> <CKS>
  response_hex_error: A1h 98h <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  params:
    - name: eco_mode_value
      type: integer
      description: Eco mode value (model-dependent; see appendix)
  command_hex: 03h B1h 00h 00h 02h 07h <DATA01> <CKS>
  response_hex_success: 23h B1h <ID1> <ID2> 02h 07h <DATA01> <CKS>

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  params:
    - name: projector_name
      type: string
      description: Up to 16 bytes, NUL-terminated
  command_hex: 03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA16> 00h <CKS>
  response_hex_success: 23h B1h <ID1> <ID2> 02h 2Ch <DATA01> <CKS>

- id: pip_pbP_set
  label: PIP/Picture by Picture Set
  kind: action
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
    - name: setting_value
      type: integer
      description: Target-dependent value
  command_hex: 03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>
  response_hex_success: 23h B1h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  params:
    - name: setting_value
      type: integer
      description: 00h=OFF, 01h=ON
  command_hex: 03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>
  response_hex_success: 23h B1h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>

- id: audio_select_set
  label: Audio Select Set
  kind: action
  params:
    - name: input_terminal
      type: integer
      description: Input terminal code
    - name: setting_value
      type: integer
      description: 00h=specified terminal, 02h=COMPUTER
  command_hex: 03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>
  response_hex_success: 23h C9h <ID1> <ID2> 03h 09h <DATA01> <DATA02> <CKS>
```

## Feedbacks
```yaml
- id: error_status
  label: Error Status
  type: bitmask
  query_command: 009
  query_hex: 00h 88h 00h 00h 00h 88h
  response_hex: 20h 88h <ID1> <ID2> 0Ch <DATA01> <DATA12> <CKS>
  values:
    DATA01:
      Bit0: Cover error
      Bit1: Temperature error (bi-metallic strip)
      Bit2: Reserved (0)
      Bit3: Fan error
      Bit4: Fan error
      Bit5: Power error
      Bit6: Lamp off or backlight off
      Bit7: Lamp replacement moratorium
    DATA02:
      Bit0: Lamp usage time exceeded
      Bit1: Formatter error
      Bit2: Lamp 2 off
      Bit4: Reserved (0)
      Bit7: Extended status flag
    DATA03:
      Bit0: Reserved (0)
      Bit1: FPGA error
      Bit2: Temperature sensor error
      Bit3: Lamp not present
      Bit4: Lamp data error
      Bit5: Mirror cover error
      Bit6: Lamp 2 replacement moratorium
      Bit7: Lamp 2 usage time exceeded
    DATA04:
      Bit0: Lamp 2 not present
      Bit1: Lamp 2 data error
      Bit2: Temperature error due to dust
      Bit3: Foreign matter sensor error
      Bit7: Lens not installed properly
    DATA05-DATA09: Reserved for system

- id: power_state
  label: Power State
  type: enum
  query_command: 078-2
  query_hex: 00h 85h 00h 00h 01h 01h 87h
  response_hex: 20h 85h <ID1> <ID2> 10h <DATA01> <DATA16> <CKS>
  values:
    DATA03:
      00h: Standby
      01h: Power on
      FFh: Not supported
    DATA04:
      00h: Not executed
      01h: During execution
      FFh: Not supported
    DATA05:
      00h: Not executed
      01h: During execution
      FFh: Not supported
    DATA06:
      00h: Standby (Sleep)
      04h: Power on
      05h: Cooling
      06h: Standby (error)
      0Fh: Standby (Power saving)
      10h: Network standby
      FFh: Not supported

- id: input_status
  label: Input Status
  type: object
  query_command: 078-3
  query_hex: 00h 85h 00h 00h 01h 02h 88h
  response_hex: 20h 85h <ID1> <ID2> 10h <DATA01> <DATA16> <CKS>
  fields:
    - name: signal_switch_process
      type: enum
      values:
        00h: Not executed
        01h: During execution
        FFh: Not supported
    - name: signal_list_number
      type: integer
      description: Returned value is n-1; add 1 for actual number
    - name: selection_signal_type_1
      type: integer
      values:
        01h-05h: Signal type 1-5
    - name: selection_signal_type_2
      type: enum
      values:
        01h: COMPUTER
        02h: VIDEO
        03h: S-VIDEO
        04h: COMPONENT
        05h: Reserved
        07h: VIEWER(1-5)
        20h: DVI-D
        21h: HDMI
        22h: DisplayPort
        23h: VIEWER(6-10)
        FFh: Not Source Input

- id: mute_status
  label: Mute Status
  type: object
  query_command: 078-4
  query_hex: 00h 85h 00h 00h 01h 03h 89h
  response_hex: 20h 85h <ID1> <ID2> 10h <DATA01> <DATA16> <CKS>
  fields:
    - name: picture_mute
      type: enum
      values:
        00h: Off
        01h: On
        FFh: Not supported
    - name: sound_mute
      type: enum
      values:
        00h: Off
        01h: On
        FFh: Not supported
    - name: onscreen_mute
      type: enum
      values:
        00h: Off
        01h: On
        FFh: Not supported
    - name: forced_onscreen_mute
      type: enum
      values:
        00h: Off
        01h: On
        FFh: Not supported
    - name: onscreen_display
      type: enum
      values:
        00h: Not displayed
        01h: Displayed
        FFh: Not supported

- id: model_name
  label: Model Name
  type: string
  query_command: 078-5
  query_hex: 00h 85h 00h 00h 01h 04h 8Ah
  response_hex: 20h 85h <ID1> <ID2> 20h <DATA01> <DATA32> <CKS>
  description: NUL-terminated string, up to 32 bytes

- id: cover_status
  label: Cover Status
  type: enum
  query_command: 078-6
  query_hex: 00h 85h 00h 00h 01h 05h 8Bh
  response_hex: 20h 85h <ID1> <ID2> 01h <DATA01> <CKS>
  values:
    00h: Normal (cover opened)
    01h: Cover closed

- id: information_request
  label: Information Request
  type: object
  query_command: 037
  query_hex: 03h 8Ah 00h 00h 00h 8Dh
  response_hex: 23h 8Ah <ID1> <ID2> 62h <DATA01> <DATA98> <CKS>
  fields:
    - name: projector_name
      type: string
      data_range: DATA01-DATA49
      description: NUL-terminated
    - name: lamp_usage_time
      type: integer
      data_range: DATA83-DATA86
      unit: seconds
      description: Updated at 1-minute intervals
    - name: filter_usage_time
      type: integer
      data_range: DATA87-DATA90
      unit: seconds
      description: Updated at 1-minute intervals

- id: filter_usage_info
  label: Filter Usage Information
  type: object
  query_command: 037-3
  query_hex: 03h 95h 00h 00h 00h 98h
  response_hex: 23h 95h <ID1> <ID2> 08h <DATA01> <DATA08> <CKS>
  fields:
    - name: filter_usage_time
      type: integer
      data_range: DATA01-DATA04
      unit: seconds
    - name: filter_alarm_start_time
      type: integer
      data_range: DATA05-DATA08
      unit: seconds
      description: Returns -1 if not defined

- id: lamp_info
  label: Lamp Information
  type: object
  query_command: 037-4
  query_hex: 03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>
  params:
    - name: target
      type: integer
      description: 00h=Lamp 1, 01h=Lamp 2
    - name: content
      type: integer
      description: 01h=usage time, 04h=remaining life
  response_hex: 23h 96h <ID1> <ID2> 06h <DATA01> <DATA06> <CKS>
  fields:
    - name: lamp_usage_time
      type: integer
      data_range: DATA03-DATA06
      unit: seconds
      description: Updated at 1-minute intervals
    - name: lamp_remaining_life
      type: integer
      data_range: DATA03-DATA06
      unit: percent
      description: Negative value if replacement deadline exceeded

- id: carbon_savings_info
  label: Carbon Savings Information
  type: object
  query_command: 037-6
  query_hex: 03h 9Ah 00h 00h 01h <DATA01> <CKS>
  params:
    - name: target
      type: integer
      description: 00h=Total, 01h=During operation
  response_hex: 23h 9Ah <ID1> <ID2> 09h <DATA01> <DATA09> <CKS>
  fields:
    - name: carbon_savings_kg
      type: integer
      data_range: DATA02-DATA05
      unit: kg
      max: 99999
    - name: carbon_savings_mg
      type: integer
      data_range: DATA06-DATA09
      unit: mg
      max: 999999

- id: eco_mode_request
  label: Eco Mode Request
  type: integer
  query_command: 097-8
  query_hex: 03h B0h 00h 00h 01h 07h BBh
  response_hex: 23h B0h <ID1> <ID2> 02h 07h <DATA01> <CKS>
  description: Returns eco mode value (model-dependent values in appendix)

- id: lan_projector_name_request
  label: LAN Projector Name Request
  type: string
  query_command: 097-45
  query_hex: 03h B0h 00h 00h 01h 2Ch E0h
  response_hex: 23h B0h <ID1> <ID2> 12h 2Ch <DATA01> <DATA17> <CKS>
  description: NUL-terminated string, up to 17 bytes

- id: lan_mac_address
  label: LAN MAC Address
  type: string
  query_command: 097-155
  query_hex: 03h B0h 00h 00h 02h 9Ah 00h 4Fh
  response_hex: 23h B0h <ID1> <ID2> 08h 9Ah 00h <DATA01> <DATA06> <CKS>
  description: 6-byte MAC address

- id: pip_pbP_request
  label: PIP/PbP Request
  type: object
  query_command: 097-198
  query_hex: 03h B0h 00h 00h 02h C5h <DATA01> <CKS>
  params:
    - name: target
      type: integer
      description: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3
  response_hex: 23h B0h <ID1> <ID2> 03h C5h <DATA01> <DATA02> <CKS>

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  type: enum
  query_command: 097-243-1
  query_hex: 03h B0h 00h 00h 02h DFh 00h 94h
  response_hex: 23h B0h <ID1> <ID2> 03h DFh 00h <DATA01> <CKS>
  values:
    00h: OFF
    01h: ON

- id: serial_number_request
  label: Serial Number Request
  type: string
  query_command: 305-2
  query_hex: 00h BFh 00h 00h 02h 01h 06h C8h
  response_hex: 20h BFh <ID1> <ID2> 12h 01h 06h <DATA01> <DATA16> <CKS>
  description: NUL-terminated string, up to 16 bytes

- id: basic_information_request
  label: Basic Information Request
  type: object
  query_command: 305-3
  query_hex: 00h BFh 00h 00h 01h 02h C2h
  response_hex: 20h BFh <ID1> <ID2> 10h 02h <DATA01> <DATA15> <CKS>
  fields:
    - name: operation_status
      type: enum
      values:
        00h: Standby (Sleep)
        04h: Power on
        05h: Cooling
        06h: Standby (error)
        0Fh: Standby (Power saving)
        10h: Network standby
    - name: content_displayed
      type: enum
      values:
        00h: Video signal displayed
        01h: No signal
        02h: Viewer displayed
        03h: Test pattern displayed
        04h: LAN displayed
        05h: Test pattern (user) displayed
        10h: Signal being switched
    - name: video_mute
      type: enum
      values:
        00h: Off
        01h: On
    - name: sound_mute
      type: enum
      values:
        00h: Off
        01h: On
    - name: onscreen_mute
      type: enum
      values:
        00h: Off
        01h: On
    - name: freeze_status
      type: enum
      values:
        00h: Off
        01h: On

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  type: object
  query_command: 060-1
  query_hex: 03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>
  params:
    - name: adjusted_value_name
      type: integer
      description: 00h=PICTURE/BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP ADJUST
  response_hex: 23h 05h <ID1> <ID2> 10h <DATA01> <DATA16> <CKS>
  fields:
    - name: adjustment_status
      type: enum
      values:
        00h: Display not possible
        01h: Adjustment not possible
        02h: Adjustment possible
        FFh: Gain does not exist
    - name: upper_limit
      type: integer
      data_range: DATA02-DATA03
    - name: lower_limit
      type: integer
      data_range: DATA04-DATA05
    - name: default_value
      type: integer
      data_range: DATA06-DATA07
    - name: current_value
      type: integer
      data_range: DATA08-DATA09

- id: lens_control_request
  label: Lens Control Request
  type: object
  query_command: 053-1
  query_hex: 02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>
  params:
    - name: target
      type: integer
      description: 00h=Zoom, 01h=Focus, 02h=Lens Shift(H), 03h=Lens Shift(V)
  response_hex: 22h 1Ch <ID1> <ID2> 08h <DATA01> 00h <DATA02> <DATA07> <CKS>
  fields:
    - name: upper_limit
      type: integer
      data_range: DATA02-DATA03
    - name: lower_limit
      type: integer
      data_range: DATA04-DATA05
    - name: current_value
      type: integer
      data_range: DATA06-DATA07

- id: lens_memory_option_request
  label: Lens Memory Option Request
  type: object
  query_command: 053-5
  query_hex: 02h 20h 00h 00h 01h <DATA01> <CKS>
  params:
    - name: target
      type: integer
      description: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE
  response_hex: 22h 20h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>
  fields:
    - name: setting_value
      type: enum
      values:
        00h: OFF
        01h: ON

- id: lens_profile_request
  label: Lens Profile Request
  type: enum
  query_command: 053-11
  query_hex: 02h 28h 00h 00h 00h 2Ah
  response_hex: 22h 28h <ID1> <ID2> 02h <DATA01> <DATA02> <CKS>
  values:
    00h: Profile 1
    01h: Profile 2

- id: lens_info_request
  label: Lens Information Request
  type: bitmask
  query_command: 053-7
  query_hex: 02h 22h 00h 00h 01h 00h 25h
  response_hex: 22h 22h <ID1> <ID2> 02h 00h <DATA01> <CKS>
  values:
    Bit0: Lens memory operation status
    Bit1: Zoom operation status
    Bit2: Focus operation status
    Bit3: Lens Shift(H) operation status
    Bit4: Lens Shift(V) operation status

- id: setting_request
  label: Setting Request
  type: object
  query_command: 078-1
  query_hex: 00h 85h 00h 00h 01h 00h 86h
  response_hex: 20h 85h <ID1> <ID2> 20h <DATA01> <DATA32> <CKS>
  fields:
    - name: base_model_type
      type: integer
      data_range: DATA01-DATA03
    - name: sound_function
      type: enum
      values:
        00h: Not available
        01h: Available
    - name: profile_number
      type: enum
      values:
        00h: Not available
        01h: Clock function
        02h: Sleep timer function
        03h: Clock and Sleep timer function

- id: information_string_request
  label: Information String Request
  type: string
  query_command: 084
  query_hex: 00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>
  params:
    - name: information_type
      type: integer
      description: 03h=Horizontal sync frequency, 04h=Vertical sync frequency
  response_hex: 20h D0h <ID1> <ID2> LEN <DATA01> 01h <DATA02> <DATA??> <CKS>
  description: NUL-terminated string

- id: base_model_type_request
  label: Base Model Type Request
  type: object
  query_command: 305-1
  query_hex: 00h BFh 00h 00h 01h 00h C0h
  response_hex: 20h BFh <ID1> <ID2> 10h 00h <DATA01> <DATA15> <CKS>
  fields:
    - name: base_model_type
      type: integer
      data_range: DATA01-DATA02
    - name: model_name
      type: string
      data_range: DATA03-DATA11
      description: NUL-terminated
```

## Variables
```yaml
# UNRESOLVED: all parameters are command-driven with discrete actions;
# no standalone settable variables identified in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source;
# all communication is query-response based
```

## Macros
```yaml
# None explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: lamp replacement moratorium warnings are documented as bit flags
# in error status responses but no explicit safety interlock procedure stated
```

## Notes
- Command protocol uses hex encoding with checksums calculated as low-order byte of sum of all preceding bytes
- Each command includes Control ID (ID1) and Model code (ID2) parameters
- Power on/off commands block other commands during execution sequence
- Input terminal codes vary by model; appendix tables provide model-specific mappings
- Eco mode values vary by model; appendix tables provide model-specific mappings
- Standby mode command reception varies by model; see section 2 appendix table
- Lamp and filter usage times update at 1-minute intervals despite 1-second resolution
- Some models cannot receive commands while in standby mode
- LAN TCP port 7142 is used for command communication over wired LAN

<!-- UNRESOLVED: default serial baud rate not explicitly stated; selectable from 115200/38400/19200/9600/4800 -->
<!-- UNRESOLVED: flow control (RTS/CTS) pinout documented but software flow control not specified -->
<!-- UNRESOLVED: concrete input terminal codes for V302X model not in appendix tables (appendix lists other NP models) -->
<!-- UNRESOLVED: concrete aspect ratio values for V302X model not in appendix tables -->
<!-- UNRESOLVED: concrete eco mode values for V302X model not in appendix tables -->
<!-- UNRESOLVED: standby mode settings table does not include V302X series explicitly -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-04-29T13:52:48.163Z
last_checked_at: 2026-04-25T21:23:58.703Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:23:58.703Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 spec commands matched with hex-level fidelity in NEC V302X source; transport parameters verified; comprehensive coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "lamp/filter replacement moratorium safety warnings not explicitly documented in command reference section"
- "baud rate configurable (115200/38400/19200/9600/4800); default not stated"
- "flow control not documented"
- "all parameters are command-driven with discrete actions;"
- "no unsolicited event notifications documented in source;"
- "lamp replacement moratorium warnings are documented as bit flags"
- "default serial baud rate not explicitly stated; selectable from 115200/38400/19200/9600/4800"
- "flow control (RTS/CTS) pinout documented but software flow control not specified"
- "concrete input terminal codes for V302X model not in appendix tables (appendix lists other NP models)"
- "concrete aspect ratio values for V302X model not in appendix tables"
- "concrete eco mode values for V302X model not in appendix tables"
- "standby mode settings table does not include V302X series explicitly"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
