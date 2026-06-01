---
spec_id: admin/sharp-lcd6_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCD6 Series Control Spec"
manufacturer: Sharp
model_family: "LCD6 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCD6 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-31T21:05:30.324Z
generated_at: 2026-05-31T21:05:30.324Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:05:30.324Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions confirmed verbatim against source CTL command sections and VCP format specification; transport parameters match exactly."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCD6 Series Control Spec

## Summary
Sharp LCD6 Series commercial display supporting both RS-232C and TCP/IP (LAN) control. Protocol uses a proprietary binary-ASCII hybrid format with Header + Message + BCC + Delimiter structure. Two command classes: VCP (Virtual Control Pro) for settings, CTL for system operations. No authentication required.

<!-- UNRESOLVED: document states "NEC LCD monitor" in text but Sharp LCD6 Series in filename; model name not explicitly stated in document body -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
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
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: power_status_read
  label: Power Status Read
  kind: query
  params: []
  description: "CTL-01D6. Returns power mode: 0001=ON, 0002=Stand-by, 0003=Reserved, 0004=OFF"

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0001=ON, 0004=OFF (0002/0003=do not set)"
  description: "CTL-C203-D6. Controls monitor power state."

- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  description: "CTL-0C. Stores adjusted values to non-volatile memory."

- id: get_timing_report
  label: Get Timing Report
  kind: query
  params: []
  description: "CTL-07. Returns horizontal/vertical sync frequencies and polarity status."

- id: serial_number_read
  label: Serial Number Read
  kind: query
  params: []
  description: "CTL-C216. Returns display serial number (max 30 ASCII chars)."

- id: model_name_read
  label: Model Name Read
  kind: query
  params: []
  description: "CTL-C217. Returns model name (max 36 ASCII chars)."

- id: mac_address_read
  label: MAC Address Read
  kind: query
  params: []
  description: "CTL-C220. Returns MAC address (max 12 hex chars)."

- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: query
  params: []
  description: "CTL-C22C. Returns major/minor channel numbers."

- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer
  description: "CTL-C22D. Sets direct TV channel."

- id: remote_control_data_send
  label: Remote Control Data Send
  kind: action
  params:
    - name: data_code
      type: integer
      description: "IR key code (hex). PICTURE=1D, ASPECT=29, SOUND=43, 1=08, 2=09, 3=0A, 4=0B, 5=0C, 6=0D, 7=0E, 8=0F, 9=10, 0=12, DASH=44, INFO=19, MENU=20, EXIT=1F, UP=15, DOWN=14, LEFT=21, RIGHT=22, OK=23, VOL+=17, VOL-=16, CH+=33, CH-=32, MUTE=1B, FREEZE=27, CC=2C, MTS=1A"
    - name: repeat_times
      type: integer
  description: "CTL-C210. Sends IR remote control code via RS-232C."

- id: firmware_version_read
  label: Firmware Version Read
  kind: query
  params:
    - name: firmware_type
      type: integer
      default: 0
      description: "00=Firmware Revision"
  description: "CTL-CA02. Returns firmware version string."

- id: input_name_read
  label: Input Name Read
  kind: query
  params:
    - name: terminal
      type: integer
      description: "01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
  description: "CTL-CA04-03. Reads custom input name."

- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: terminal
      type: integer
      description: "01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
    - name: name
      type: string
      description: "Max 14 characters"
  description: "CTL-CA04-04. Writes custom input name."

- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: terminal
      type: integer
      description: "00=ALL, 01=VGA(RGB), 05=AV, 09=Tuner, 0C=VGA(YPbPr), 11=HDMI1, 12=HDMI2, 82=HDMI3, 87=MP"
  description: "CTL-CA04-05. Resets input name to default."

- id: vcpm_get
  label: VCP Get Parameter
  kind: query
  params:
    - name: page
      type: integer
      description: "VCP code page (hex, 0-padded to 2 digits)"
    - name: code
      type: integer
      description: "VCP operation code (hex, 0-padded to 2 digits)"
  description: "Generic VCP read. Returns current value and max."

- id: vcpm_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: page
      type: integer
      description: "VCP code page"
    - name: code
      type: integer
      description: "VCP operation code"
    - name: value
      type: integer
      description: "16-bit value to set"
  description: "Generic VCP write. Sets parameter value."

- id: temperature_sensor_select
  label: Temperature Sensor Select
  kind: action
  params:
    - name: sensor
      type: integer
      description: "Sensor number (1-based)"
  description: "Selects built-in temperature sensor for reading."

- id: temperature_read
  label: Temperature Read
  kind: query
  params: []
  description: "Reads selected temperature sensor. Value is 2's complement, divide by 2 for Celsius."
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
  description: "0001=ON, 0002=Stand-by, 0003=Reserved, 0004=OFF"

- id: command_result
  label: Command Result
  type: enum
  values:
    - "00"
    - "01"
  description: "00=No Error, 01=Unsupported or Error"

- id: timing_report
  label: Timing Report
  type: object
  properties:
    - name: sync_status
      type: object
      description: "Bit7=Sync out of range, Bit6=Unstable, Bit1=HSync polarity, Bit0=VSync polarity"
    - name: h_freq
      type: integer
      description: "Horizontal frequency in 0.01kHz"
    - name: v_freq
      type: integer
      description: "Vertical frequency in 0.01Hz"

- id: null_message
  label: NULL Message
  type: enum
  values:
    - timeout
    - unsupported
    - bcc_error
    - not_ready
    - busy
  description: "Monitor returns NULL (BE) when unable to respond normally."

- id: temperature_value
  label: Temperature Value
  type: integer
  description: "2's complement. Divide by 2 for Celsius. Range +125C to -55C."

- id: input_name
  label: Input Name
  type: string
  description: "Custom input label, max 14 characters."

- id: firmware_version
  label: Firmware Version
  type: string
  description: "Format: R[Major].XXXX[Branch] e.g. R1.0234AB"

- id: serial_number
  label: Serial Number
  type: string
  description: "Display serial number, max 30 ASCII characters."

- id: model_name
  label: Model Name
  type: string
  description: "Display model name, max 36 ASCII characters."

- id: mac_address
  label: MAC Address
  type: string
  description: "Ethernet MAC address."

- id: tv_channel
  label: TV Channel
  type: object
  properties:
    - name: major_high
      type: integer
    - name: major_low
      type: integer
    - name: minor
      type: integer
```

## Variables
```yaml
- id: backlight
  label: Backlight
  type: integer
  range: [0, 100]
  page: 0
  code: 0x10
  description: "VCP-00-10. Display brightness."

- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
  page: 0
  code: 0x12
  description: "VCP-00-12."

- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
  page: 0
  code: 0x10
  description: "VCP-00-10 (same as backlight)."

- id: video_black_level
  label: Video Black Level
  type: integer
  range: [0, 100]
  page: 0
  code: 0x92
  description: "VCP-00-92."

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 100]
  page: 0
  code: 0x87
  description: "VCP-00-87."

- id: color
  label: Color
  type: integer
  range: [0, 100]
  page: 0
  code: 0x8A
  description: "VCP-00-8A."

- id: tint
  label: Tint
  type: integer
  range: [0, 100]
  page: 0
  code: 0x90
  description: "VCP-00-90. 0=Purplish, 100=Greenish."

- id: color_temp
  label: Color Temperature
  type: enum
  values:
    - "0x23"
    - "0x3F"
    - "0x5A"
  labels:
    - Warm
    - Normal
    - Cool
  page: 0
  code: 0x0C
  description: "VCP-00-0C."

- id: red_gain
  label: Red Gain
  type: integer
  range: [0, 100]
  page: 0
  code: 0x16
  description: "VCP-00-16."

- id: green_gain
  label: Green Gain
  type: integer
  range: [0, 100]
  page: 0
  code: 0x18
  description: "VCP-00-18."

- id: blue_gain
  label: Blue Gain
  type: integer
  range: [0, 100]
  page: 0
  code: 0x1A
  description: "VCP-00-1A."

- id: audio_balance
  label: Audio Balance
  type: integer
  range: [0, 100]
  page: 0
  code: 0x93
  description: "VCP-00-93. 0=Left, 100=Right."

- id: bass
  label: Bass
  type: integer
  range: [0, 100]
  page: 0
  code: 0x82
  description: "VCP-00-82."

- id: treble
  label: Treble
  type: integer
  range: [0, 100]
  page: 0
  code: 0x84
  description: "VCP-00-84."

- id: mute
  label: Mute
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - Audio
    - Video
    - Audio & Video
  page: 0
  code: 0x8D
  description: "VCP-00-8D. Audio & Video mute."

- id: volume
  label: Volume
  type: integer
  range: [0, 100]
  page: 0
  code: 0x62
  description: "VCP-00-62."

- id: power_mode
  label: Power Mode
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
  labels:
    - ON
    - Stand-by
    - Reserved
    - OFF
  page: 0
  code: 0xD6
  description: "VCP-00-D6. Read via CTL-01D6 preferred."

- id: input_select
  label: Input Select
  type: enum
  values:
    - "0000"
    - "0001"
    - "0005"
    - "0009"
    - "000C"
    - "0011"
    - "0012"
    - "0082"
    - "0087"
  labels:
    - No mean
    - VGA(RGB)
    - Video1(AV)
    - Tuner1(TV)
    - DVD/HD1(VGA-YPbPr)
    - HDMI1
    - HDMI2
    - HDMI3
    - MP(Media Player)
  page: 0
  code: 0x60
  description: "VCP-00-60."

- id: picture_mode
  label: Picture Mode
  type: enum
  values:
    - "0003"
    - "0004"
    - "0008"
    - "0017"
    - "0018"
    - "001B"
    - "001D"
  labels:
    - HighBright
    - Standard
    - Custom
    - Dynamic
    - Energy Savings
    - HDR Video
    - Conferencing
  page: 2
  code: 0x1A
  description: "VCP-02-1A."

- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values:
    - "0001"
    - "0002"
    - "0004"
    - "0007"
  labels:
    - NORMAL
    - FULL
    - ZOOM
    - "1:1"
  page: 2
  code: 0x70
  description: "VCP-02-70."

- id: overscan
  label: Overscan
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - Off
    - On
    - Auto
  page: 2
  code: 0xE3
  description: "VCP-02-E3."

- id: dimming_mode
  label: Dimming Mode
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - OFF
    - Dynamic Backlight
    - Local Dimming
  page: 11
  code: 0x4E
  description: "VCP-11-4E."

- id: noise_reduction
  label: Noise Reduction
  type: enum
  values:
    - "0000"
    - "0001"
    - "0002"
    - "0003"
  labels:
    - OFF
    - Low
    - Mid
    - High
  page: 2
  code: 0x20
  description: "VCP-02-20."

- id: adaptive_contrast
  label: Adaptive Contrast
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
  labels:
    - Off
    - Low
    - Mid
    - High
  page: 2
  code: 0x8D
  description: "VCP-02-8D."

- id: gamma
  label: Gamma
  type: enum
  values:
    - "0001"
    - "0004"
    - "0008"
    - "0010"
    - "0011"
  labels:
    - Native
    - "2.2"
    - "2.4"
    - HDR-Hybrid Log
    - HDR-ST2084(PQ)
  page: 2
  code: 0x68
  description: "VCP-02-68."

- id: ambient_light_sensing
  label: Ambient Light Sensing
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Off
    - On
  page: 10
  code: 0xC8
  description: "VCP-10-C8."

- id: color_enhance
  label: Color Enhance
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - Off
    - Vivid
    - Wide
  page: 11
  code: 0xEC
  description: "VCP-11-EC."

- id: hdr_mode
  label: HDR Mode
  type: enum
  values:
    - "0004"
    - "0005"
    - "0006"
  labels:
    - Low
    - Mid
    - High
  page: 11
  code: 0xE5
  description: "VCP-11-E5."

- id: sound_mode
  label: Sound Mode
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0005"
  labels:
    - Standard
    - Movie
    - Music
    - Custom
  page: 10
  code: 0xB2
  description: "VCP-10-B2."

- id: surround
  label: Surround
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Off
    - On
  page: 2
  code: 0x34
  description: "VCP-02-34."

- id: internal_speakers
  label: Internal Speakers
  type: enum
  values:
    - "0000"
    - "0001"
    - "0002"
    - "0003"
  labels:
    - No mean
    - Off
    - On
    - Auto
  page: 11
  code: 0xBA
  description: "VCP-11-BA."

- id: audio_input
  label: Audio Input
  type: enum
  values:
    - "0001"
    - "0002"
    - "0004"
    - "000A"
    - "000B"
    - "000D"
    - "0006"
  labels:
    - Audio1
    - Audio2
    - HDMI1
    - HDMI2
    - HDMI3
    - MP
    - TV
  page: 2
  code: 0x2E
  description: "VCP-02-2E."

- id: osd_language
  label: OSD Language
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
  labels:
    - English
    - Deutsch
    - Francais
    - Espanol
  page: 0
  code: 0x68
  description: "VCP-00-68."

- id: osd_transparency
  label: OSD Transparency
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
  labels:
    - Off
    - "30%"
    - "50%"
    - "70%"
  page: 2
  code: 0xB8
  description: "VCP-02-B8."

- id: information_osd
  label: Information OSD
  type: enum
  values:
    - "0000"
    - "0005"
  labels:
    - Off
    - On
  page: 2
  code: 0x3D
  description: "VCP-02-3D."

- id: closed_caption
  label: Closed Caption
  type: enum
  values:
    - "0000"
    - "0001"
    - "0002"
    - "0003"
    - "0004"
    - "0005"
    - "0006"
    - "0007"
    - "0008"
    - "0009"
  labels:
    - No mean
    - Off
    - CC1
    - CC2
    - CC3
    - CC4
    - Text1
    - Text2
    - Text3
    - Text4
  page: 10
  code: 0x84
  description: "VCP-10-84."

- id: quick_start
  label: Quick Start
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Off
    - On
  page: 11
  code: 0xEA
  description: "VCP-11-EA."

- id: auto_input_change
  label: Auto Input Change
  type: enum
  values:
    - "0000"
    - "0002"
    - "0004"
  labels:
    - First
    - None
    - Custom
  page: 2
  code: 0x40
  description: "VCP-02-40."

- id: cec
  label: CEC
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Off
    - On
  page: 11
  code: 0x76
  description: "VCP-11-76."

- id: cec_auto_turn_off
  label: CEC Auto Turn Off
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Disable
    - Enable
  page: 11
  code: 0x77
  description: "VCP-11-77."

- id: cec_audio_receiver
  label: CEC Audio Receiver
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Disable
    - Enable
  page: 11
  code: 0x78
  description: "VCP-11-78."

- id: vga_mode
  label: VGA Mode
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - RGB
    - YPbPr
  page: 10
  code: 0x8E
  description: "VCP-10-8E."

- id: key_lock
  label: Key Lock
  type: enum
  values:
    - "0000"
    - "0001"
    - "0002"
  labels:
    - Off
    - Mode2
    - Mode1
  page: 0
  code: 0xFB
  description: "VCP-00-FB."

- id: ir_lock
  label: IR Lock
  type: enum
  values:
    - "0001"
    - "0004"
    - "0005"
  labels:
    - Off
    - Mode2
    - Mode1
  page: 2
  code: 0x3F
  description: "VCP-02-3F."

- id: power_supply
  label: Power Supply
  type: enum
  values:
    - "0001"
    - "0003"
  labels:
    - ON
    - OFF
  page: 11
  code: 0x75
  description: "VCP-11-75."

- id: led_indicator
  label: LED Indicator
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - ON
    - OFF
  page: 2
  code: 0xBE
  description: "VCP-02-BE."

- id: thermal_warning
  label: Thermal Warning Message
  type: enum
  values:
    - "0000"
    - "0001"
    - "0002"
  labels:
    - No mean
    - Off
    - On
  page: 11
  code: 0xED
  description: "VCP-11-ED."

- id: thermal_shutdown
  label: Thermal Shutdown
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - Off
    - On
  page: 10
  code: 0x8A
  description: "VCP-10-8A."

- id: monitor_id
  label: Monitor ID
  type: integer
  range: [1, 100]
  page: 2
  code: 0x3E
  description: "VCP-02-3E."

- id: control_interface
  label: Control Interface
  type: enum
  values:
    - "0001"
    - "0002"
  labels:
    - RS-232C
    - LAN
  page: 10
  code: 0x3E
  description: "VCP-10-3E."

- id: edid_mode
  label: EDID Mode
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - Mode 0
    - Mode 1
    - Mode 2
  page: 10
  code: 0xAA
  description: "VCP-10-AA."

- id: video_range
  label: HDMI Video Range
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
  labels:
    - Expanded Signal
    - Raw Signal
    - Auto
  page: 10
  code: 0x40
  description: "VCP-10-40."

- id: vga_h_position
  label: VGA Horizontal Position
  type: integer
  range: [0, 100]
  page: 0
  code: 0x20
  description: "VCP-00-20."

- id: vga_v_position
  label: VGA Vertical Position
  type: integer
  range: [0, 100]
  page: 0
  code: 0x30
  description: "VCP-00-30."

- id: vga_clock
  label: VGA Clock
  type: integer
  range: [0, 100]
  page: 0
  code: 0x0E
  description: "VCP-00-0E."

- id: vga_phase
  label: VGA Phase
  type: integer
  range: [0, 100]
  page: 0
  code: 0x3E
  description: "VCP-00-3E."

- id: factory_reset
  label: Factory Reset
  type: enum
  values:
    - "0001"
    - "0002"
    - "0003"
    - "0004"
    - "0010"
  labels:
    - All
    - Picture
    - Adjust
    - Audio
    - Network
  page: 2
  code: 0xCB
  description: "VCP-02-CB. Note: 0001=All performs full factory reset."
```

## Events
```yaml

```

## Macros
```yaml

```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power state changes (ON/OFF) may require 600msec packet interval before next command"
    source: "Section 3.1.1 / 3.2.1"
  - description: "NULL message returned during: Power ON, Power OFF, Auto Setup, Input change, PIP Input, Factory reset - wait before retrying"
    source: "Section 5.5.3"
  - description: "LAN connection disconnects after 15 minutes of no packet data; must reconnect"
    source: "Section 3.2"
```

## Notes
- Protocol uses ASCII-encoded hex for data bytes. Value 1234h sent as '1''2''3''4' (31h 32h 33h 34h).
- BCC (Block Check Code) = XOR of all bytes from D1 to D16.
- Packet interval: wait 600msec between commands.
- Monitor ID range: 1-100; Group ID: A-I; Broadcast: * (2Ah).
- Temperature readout is 2's complement; divide by 2 for Celsius.
- TV tuner commands (*1) only on US tuner models.
- Local Dimming (E328 model not supported).
- DHCP default; IP settings via User's manual.
<!-- UNRESOLVED: DHCP/TCP settings not in source; section references User's manual -->
<!-- UNRESOLVED: precise firmware version not stated in source -->
<!-- UNRESOLVED: voltage/power specs not stated in source -->

## Provenance

```yaml
source_domains:
  - assets.sharpnecdisplays.us
  - sharp-displays.jp.sharp
  - business.sharpusa.com
source_urls:
  - https://assets.sharpnecdisplays.us/documents/usermanuals/4tb-series-operation-manual.pdf
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
  - https://business.sharpusa.com/portals/0/downloads/Manuals/PN_B501_B401_Operation_Manual.pdf
retrieved_at: 2026-04-30T10:43:39.739Z
last_checked_at: 2026-05-31T21:05:30.324Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:05:30.324Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions confirmed verbatim against source CTL command sections and VCP format specification; transport parameters match exactly."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
