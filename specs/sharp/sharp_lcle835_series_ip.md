---
spec_id: admin/sharp-lcle835-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCLE835 Series Control Spec"
manufacturer: Sharp
model_family: "LCLE835 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCLE835 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:32:05.392Z
last_checked_at: 2026-06-10T02:08:21.607Z
generated_at: 2026-06-10T02:08:21.607Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents a \"NEC LCD monitor\" in header but device is Sharp LCLE835 Series; possible private-label docs"
  - "no unsolicited event notifications documented; device only responds to commands"
  - "voltage/current/power specifications not stated in source"
  - "fault behavior and error recovery sequences not documented"
  - "firmware version compatibility ranges not stated"
verification:
  verdict: verified
  checked_at: 2026-06-10T02:08:21.607Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec action-units map 1-to-1 to documented CTL and VCP commands in the source; transport parameters (port 7142, baud 9600, 8N1) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCLE835 Series Control Spec

## Summary
Sharp LCLE835 Series commercial LCD display supporting both RS-232C and TCP/IP control interfaces. The protocol uses a binary-encoded ASCII command structure with header, message, check code, and delimiter. Power control, VCP-style parameter get/set, and CTL system commands are documented.

<!-- UNRESOLVED: source documents a "NEC LCD monitor" in header but device is Sharp LCLE835 Series; possible private-label docs -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: CTL-C203-D6 with power mode 0001
  note: "Command code: C203D6, power mode: 0001=ON, 0002/0003=do not set, 0004=OFF"

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: CTL-C203-D6 with power mode 0004

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "0C" command code

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "07" command code

- id: get_power_status
  label: Get Power Status
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "01D6"

- id: read_serial_number
  label: Read Serial Number
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "C216"

- id: read_model_name
  label: Read Model Name
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "C217"

- id: read_mac_address
  label: Read MAC Address
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "C220"

- id: read_firmware_version
  label: Read Firmware Version
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: firmware_type
      type: string
      description: "00 = F/W Revision"
  command: "CA02"

- id: send_remote_control_code
  label: Send Remote Control Code
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: data_code
      type: string
      description: Remote control data code (hex string)
    - name: repeat_times
      type: integer
      description: Repeat count (HL format)
  command: "C210"

- id: set_vcp_parameter
  label: Set VCP Parameter
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: op_code_page
      type: integer
      description: VCP opcode page (hex)
    - name: op_code
      type: integer
      description: VCP opcode (hex)
    - name: value
      type: integer
      description: 16-bit value to set
  note: "Message type E, format: STX OP_PAGE OP_CODE VALUE ETX"

- id: get_vcp_parameter
  label: Get VCP Parameter
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: op_code_page
      type: integer
      description: VCP opcode page (hex)
    - name: op_code
      type: integer
      description: VCP opcode (hex)
  note: "Message type C, format: STX OP_PAGE OP_CODE ETX"
- id: read_direct_tv_channel
  label: Read Direct TV Channel
  kind: query
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
  command: "C22C"
  note: "CTL-C22C; reply D05-D08=Major Channel High, D09-D12=Major Channel Low, D13-D16=Minor Channel"

- id: write_direct_tv_channel
  label: Write Direct TV Channel
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: major_channel_high
      type: string
      description: Major Channel High (HL format, 4 ASCII hex chars)
    - name: major_channel_low
      type: string
      description: Major Channel Low (HL format, 4 ASCII hex chars)
    - name: minor_channel
      type: string
      description: Minor Channel (HL format, 4 ASCII hex chars)
  command: "C22D"

- id: read_input_name
  label: Read Input Name of Designated Terminal
  kind: query
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: input_terminal
      type: string
      description: "01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
  command: "CA04"
  note: "CTL-CA04-03; sub-operation 03=Designated Terminal Read; reply Input Name max 14 characters"

- id: write_input_name
  label: Write Input Name of Designated Terminal
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: input_terminal
      type: string
      description: "01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
    - name: input_name
      type: string
      description: Input Name string (max 14 characters)
  command: "CA04"
  note: "CTL-CA04-04; sub-operation 04=Designated Terminal Write"

- id: reset_input_name
  label: Reset Input Name of Designated Terminal
  kind: action
  params:
    - name: monitor_id
      type: integer
      description: Monitor ID (1-100)
    - name: input_terminal
      type: string
      description: "00=ALL Terminal, 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
  command: "CA04"
  note: "CTL-CA04-05; sub-operation 05=Designated Terminal Reset; 00 resets all terminals"
```

## Feedbacks
```yaml
- id: power_status_response
  type: enum
  values:
    - "0001: ON"
    - "0002: Stand-by (power save)"
    - "0003: Reserved"
    - "0004: OFF (same as IR power off)"
  note: "Returned in CTL-01D6 reply D13-D16"

- id: command_result
  type: enum
  values:
    - "00: No Error"
    - "01: Unsupported operation or unsupported under current condition"
  note: "Present in all reply messages"

- id: timing_report
  type: object
  fields:
    - name: status
      type: object
      description: Bit7=Sync freq out of range, Bit6=Unstable, Bit1=H sync polarity, Bit0=V sync polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units

- id: serial_number_response
  type: string
  note: "Max 30 ASCII characters"

- id: model_name_response
  type: string
  note: "Max 36 ASCII characters"

- id: mac_address_response
  type: string
  note: "Max 12 hex characters"

- id: firmware_version_response
  type: string
  note: "Format: RMajor.Minor1Minor2Minor3Branch1Branch2"

- id: vcp_parameter_response
  type: object
  fields:
    - name: result
      type: enum
      values: ["00: No Error", "01: Unsupported"]
    - name: op_code_page
      type: integer
      description: Echoed back
    - name: op_code
      type: integer
      description: Echoed back
    - name: type
      type: enum
      values: ["00: Set parameter", "01: Momentary"]
    - name: max_value
      type: integer
      description: 16-bit maximum
    - name: current_value
      type: integer
      description: 16-bit current value
```

## Variables
```yaml
- id: backlight
  label: Backlight
  type: integer
  range: [0, 100]
  vcp: VCP-00-10

- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
  vcp: VCP-00-10

- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
  vcp: VCP-00-12

- id: color_temperature
  label: Color Temperature
  type: enum
  values: ["0023H: Warm", "003FH: Normal", "005AH: Cool"]
  vcp: VCP-00-0C

- id: color_temperature_native
  label: Color Temperature Native
  type: enum
  values: ["0002H: Native", "000BH: Custom"]
  vcp: VCP-00-14

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 100]
  vcp: VCP-00-87

- id: color
  label: Color
  type: integer
  range: [0, 100]
  vcp: VCP-00-8A

- id: tint
  label: Tint
  type: integer
  range: [0, 100]
  vcp: VCP-00-90

- id: video_black_level
  label: Video Black Level
  type: integer
  range: [0, 100]
  vcp: VCP-00-92

- id: audio_balance
  label: Audio Balance
  type: integer
  range: [0, 100]
  vcp: VCP-00-93

- id: input_select
  label: Input Select
  type: enum
  values:
    - "0001H: VGA(RGB)"
    - "0005H: Video1(AV)"
    - "0009H: Tuner1(TV)"
    - "000CH: DVD/HD1 (VGA YPbPr)"
    - "0011H: HDMI1"
    - "0012H: HDMI2"
    - "0082H: HDMI3"
    - "0087H: MP (Media Player)"
  vcp: VCP-00-60

- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values: ["0001H: NORMAL", "0002H: FULL", "0004H: ZOOM", "0007H: 1:1"]
  vcp: VCP-02-70

- id: power_mode
  label: Power Mode
  type: enum
  values: ["0001: ON", "0002: Stand-by", "0004: OFF"]
  vcp: CTL-C203-D6

- id: control_interface
  label: Control Interface
  type: enum
  values: ["0001H: RS-232C", "0002H: LAN"]
  vcp: VCP-10-3E

- id: monitor_id
  label: Monitor ID
  type: integer
  range: [1, 100]
  vcp: VCP-02-3E

- id: key_lock
  label: Key Lock Settings
  type: enum
  values: ["0000H: Off", "0001H: Mode2", "0002H: Mode1"]
  vcp: VCP-00-FB

- id: ir_lock_settings
  label: IR Lock Settings
  type: enum
  values: ["0001H: Off", "0004H: Mode2", "0005H: Mode1"]
  vcp: VCP-02-3F

- id: picture_mode
  label: Picture Mode
  type: enum
  values:
    - "0003H: HighBright"
    - "0004H: Standard"
    - "0008H: Custom"
    - "0017H: Dynamic"
    - "0018H: Energy Savings"
    - "001BH: HDR Video"
    - "001DH: Conferencing"
  vcp: VCP-02-1A

- id: dimming_setting
  label: Dimming Setting
  type: enum
  values: ["0001H: OFF", "0002H: Dynamic Backlight", "0003H: Local Dimming"]
  vcp: VCP-11-4E

- id: gamma
  label: Gamma
  type: enum
  values:
    - "0001H: Native"
    - "0004H: 2.2"
    - "0008H: 2.4"
    - "0010H: HDR-Hybrid Log"
    - "0011H: HDR-ST2084(PQ)"
  vcp: VCP-02-68

- id: cec
  label: CEC
  type: enum
  values: ["0001H: Off", "0002H: On"]
  vcp: VCP-11-76

- id: auto_input_change
  label: Auto Input Change
  type: enum
  values: ["0000H: First", "0002H: None", "0004H: Custom"]
  vcp: VCP-02-40

- id: led_indicator
  label: LED Indicator
  type: enum
  values: ["0001H: ON", "0002H: OFF"]
  vcp: VCP-02-BE
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented; device only responds to commands
```

## Macros
```yaml
- id: backlight_adjust
  label: Adjust Backlight
  steps:
    - action: get_vcp_parameter
      params:
        op_code_page: 0
        op_code: 16
    - action: set_vcp_parameter
      params:
        op_code_page: 0
        op_code: 16
        value: "{value}"
    - action: save_current_settings
  note: "Recommended sequence from section 6.1"

- id: temperature_read
  label: Read Built-in Temperature Sensor
  steps:
    - action: set_vcp_parameter
      params:
        op_code_page: 2
        op_code: 120
        value: "{sensor_num}"
    - action: get_vcp_parameter
      params:
        op_code_page: 2
        op_code: 121
  note: "Temperature readout is 2's complement; max 3 sensors"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Protocol uses ASCII-encoded binary payload within TCP/Serial frames
- Packet interval must exceed 600ms between commands
- Monitor disconnects TCP connection after 15 minutes of inactivity
- Check code (BCC) calculated as XOR from bytes D1 through D16
- Header structure: SOH(1) + Reserved(1) + Destination(1) + Source(1) + MessageType(1) + MessageLength(2)
- VCP and CTL command types share same transport framing but differ in message format
- Some commands (Power ON/OFF, Auto Setup, Factory Reset) return NULL message if received during execution due to processing time required
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:32:05.392Z
last_checked_at: 2026-06-10T02:08:21.607Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T02:08:21.607Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec action-units map 1-to-1 to documented CTL and VCP commands in the source; transport parameters (port 7142, baud 9600, 8N1) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents a \"NEC LCD monitor\" in header but device is Sharp LCLE835 Series; possible private-label docs"
- "no unsolicited event notifications documented; device only responds to commands"
- "voltage/current/power specifications not stated in source"
- "fault behavior and error recovery sequences not documented"
- "firmware version compatibility ranges not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
