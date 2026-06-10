---
spec_id: admin/sharp-lcd85-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LCD85 Series Control Spec"
manufacturer: Sharp
model_family: "LCD85 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - "LCD85 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:11:52.709Z
last_checked_at: 2026-06-10T00:41:37.795Z
generated_at: 2026-06-10T00:41:37.795Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document header states \"NEC LCD monitor\" — manufacturer attribution to Sharp is based on user input; document internal title conflicts"
  - "port stated for LAN; RS-232 has no port number"
  - "source does not document unsolicited event messages from monitor"
  - "no explicit multi-step macros documented"
  - "source contains no safety warnings or interlock procedures"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:41:37.795Z
  matched_actions: 77
  action_count: 77
  confidence: medium
  summary: "All 77 spec action units (14 CTL opcodes + 61 specific VCP page/code pairs + generic vcp_set/vcp_get) match verbatim source entries in sections 7 and 8; transport values baud/port/timing all confirmed; 9 VCP codes only in Variables are represented by generic vcp_set/vcp_get, leaving no uncovered source commands. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sharp LCD85 Series Control Spec

## Summary
LCD monitor supporting RS-232C and TCP/IP (LAN) control interfaces. Communication uses a proprietary packet format with Header, Message, Check Code (BCC), and Delimiter. VCP (Virtual Control Panel) and CTL (Control) command sets for get/set operations, power control, and status queries. Packet interval must exceed 600msec between commands.

<!-- UNRESOLVED: source document header states "NEC LCD monitor" — manufacturer attribution to Sharp is based on user input; document internal title conflicts -->

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
  port: 7142  # UNRESOLVED: port stated for LAN; RS-232 has no port number
auth:
  type: none  # inferred: no auth procedure in source
timing:
  packet_interval_ms: 600
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
- id: save_current_settings
  label: Save Current Settings
  kind: action
  params: []
  description: Store adjusted values to non-volatile memory
  opcode: "0C"

- id: get_timing_report
  label: Get Timing Report
  kind: action
  params: []
  description: Report displayed image timing (H/V frequency, sync polarity)
  opcode: "07"

- id: power_status_read
  label: Power Status Read
  kind: query
  params: []
  description: Read current power status
  opcode: "01D6"

- id: power_control
  label: Power Control
  kind: action
  params:
    - name: power_mode
      type: integer
      description: 0001h=ON, 0002h=Do not set, 0003h=Do not set, 0004h=OFF
  opcode: "C203D6"

- id: serial_no_read
  label: Serial Number Read
  kind: query
  params: []
  opcode: "C216"

- id: model_name_read
  label: Model Name Read
  kind: query
  params: []
  opcode: "C217"

- id: mac_address_read
  label: MAC Address Read
  kind: query
  params: []
  opcode: "C220"

- id: direct_tv_channel_read
  label: Direct TV Channel Read
  kind: query
  params: []
  opcode: "C22C"

- id: direct_tv_channel_write
  label: Direct TV Channel Write
  kind: action
  params:
    - name: major_channel_high
      type: integer
    - name: major_channel_low
      type: integer
    - name: minor_channel
      type: integer
  opcode: "C22D"

- id: remote_control_data_code
  label: Remote Control Data Code
  kind: action
  params:
    - name: data_code
      type: string
      description: "Hex code e.g. 1D=PICTURE, 10=9, 17=VOL+, 16=VOL-"
    - name: repeat_times
      type: integer
  opcode: "C210"

- id: firmware_version_read
  label: Firmware Version Read
  kind: query
  params:
    - name: firmware_type
      type: string
      description: "00h=FW Revision"
  opcode: "CA02"

- id: input_name_read
  label: Input Name Read
  kind: query
  params:
    - name: input_terminal
      type: string
      description: "01h=VGA(RGB), 05h=AV, 09h=Tuner, 0Ch=VGA(YPbPr), 11h=HDMI1, 12h=HDMI2, 82h=HDMI3, 87h=MP"
  subcode: "03"

- id: input_name_write
  label: Input Name Write
  kind: action
  params:
    - name: input_terminal
      type: string
    - name: input_name
      type: string
      description: Max 14 characters
  subcode: "04"

- id: input_name_reset
  label: Input Name Reset
  kind: action
  params:
    - name: input_terminal
      type: string
      description: "00h=ALL, 01h=VGA(RGB), 05h=AV, 09h=Tuner, 0Ch=VGA(YPbPr), 11h=HDMI1, 12h=HDMI2, 82h=HDMI3, 87h=MP"
  subcode: "05"

- id: vcp_set
  label: VCP Set Parameter
  kind: action
  params:
    - name: op_code_page
      type: string
      description: Two ASCII hex digits (e.g. "00", "02")
    - name: op_code
      type: string
      description: Two ASCII hex digits (e.g. "10" for backlight)
    - name: value
      type: integer
      description: 16-bit value as 4 hex digits
  description: Generic VCP parameter set (see VCP table for codes)

- id: vcp_get
  label: VCP Get Parameter
  kind: query
  params:
    - name: op_code_page
      type: string
    - name: op_code
      type: string
- id: overscan
  label: Overscan
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On, 0003h=Auto'
  vcp_page: "02"
  vcp_code: "E3"

- id: dimming_setting
  label: Dimming Setting
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=OFF, 0002h=Dynamic Backlight, 0003h=Local Dimming'
  vcp_page: "11"
  vcp_code: "4E"

- id: color_temperature_mode
  label: Color Temperature Mode
  kind: action
  params:
    - name: value
      type: string
      description: '0002h=Native, 000Bh=Custom'
  vcp_page: "00"
  vcp_code: "14"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=OFF, 0001h=Low, 0002h=Mid, 0003h=High'
  vcp_page: "02"
  vcp_code: "20"

- id: noise_reduction_2
  label: Noise Reduction 2
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=OFF, 0001h=Low, 0002h=Mid, 0003h=High'
  vcp_page: "02"
  vcp_code: "26"

- id: adaptive_contrast
  label: Adaptive Contrast
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=Low, 0003h=Mid, 0004h=High'
  vcp_page: "02"
  vcp_code: "8D"

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Native, 0004h=2.2, 0008h=2.4, 0010h=HDR-Hybrid Log, 0011h=HDR-ST2084(PQ)'
  vcp_page: "02"
  vcp_code: "68"

- id: ambient_light_sensing
  label: Ambient Light Sensing
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On'
  vcp_page: "10"
  vcp_code: "C8"

- id: color_enhance
  label: Color Enhance
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=Vivid, 0003h=Wide'
  vcp_page: "11"
  vcp_code: "EC"

- id: hdr_mode
  label: HDR Mode
  kind: action
  params:
    - name: value
      type: string
      description: '0004h=Low, 0005h=Mid, 0006h=High'
  vcp_page: "11"
  vcp_code: "E5"

- id: video_black_level
  label: Video Black Level
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=To Dark, 0064h=To Bright'
  vcp_page: "00"
  vcp_code: "92"

- id: sharpness_h
  label: Sharpness H
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Dull, 0064h=Sharp'
  vcp_page: "00"
  vcp_code: "87"

- id: sharpness_v
  label: Sharpness V
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Dull, 0064h=Sharp'
  vcp_page: "00"
  vcp_code: "8C"

- id: color_saturation
  label: Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Pale, 0064h=To Deep'
  vcp_page: "00"
  vcp_code: "8A"

- id: color_saturation_2
  label: Color Saturation 2
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Pale, 0064h=To Deep'
  vcp_page: "02"
  vcp_code: "1F"

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=To Purplish, 0064h=To Greenish'
  vcp_page: "00"
  vcp_code: "90"

- id: reset_settings
  label: Reset Settings
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=All/Factory Reset, 0002h=Picture, 0003h=Adjust, 0004h=Audio, 0010h=Network'
  vcp_page: "02"
  vcp_code: "CB"

- id: sound_mode
  label: Sound Mode
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Standard, 0002h=Movie, 0003h=Music, 0005h=Custom'
  vcp_page: "10"
  vcp_code: "B2"

- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=To Left, 0064h=To Right'
  vcp_page: "00"
  vcp_code: "93"

- id: surround
  label: Surround
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On'
  vcp_page: "02"
  vcp_code: "34"

- id: internal_speakers
  label: Internal Speakers
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=No mean, 0001h=Off, 0002h=On, 0003h=Auto'
  vcp_page: "11"
  vcp_code: "BA"

- id: audio_input
  label: Audio Input
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Audio1, 0002h=Audio2(AV), 0004h=HDMI1, 0006h=TV, 000Ah=HDMI2, 000Bh=HDMI3, 000Dh=MP'
  vcp_page: "02"
  vcp_code: "2E"

- id: audio_delay
  label: Audio Delay
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Small, 0064h=Large'
  vcp_page: "10"
  vcp_code: "CB"

- id: audio_source_mts
  label: Audio Source MTS
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=No mean, 0001h=main, 0002h=sub, 0003h=main+sub, 0004h=stereo, 0005h=mono, 0006h=dual, 0007h=SAP'
  vcp_page: "02"
  vcp_code: "2C"

- id: audio_language
  label: Audio Language
  kind: action
  params:
    - name: value
      type: string
      description: '0002h=English, 0003h=Francais, 000Ah=Espanol'
  vcp_page: "10"
  vcp_code: "B3"

- id: reset_audio
  label: Reset Audio Settings
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Reset'
  vcp_page: "02"
  vcp_code: "31"

- id: osd_language
  label: OSD Language
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=English, 0002h=Deutsch, 0003h=Francais, 0004h=Espanol'
  vcp_page: "00"
  vcp_code: "68"

- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=30%, 0003h=50%, 0004h=70%'
  vcp_page: "02"
  vcp_code: "B8"

- id: information_osd
  label: Information OSD
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=Off, 0005h=On'
  vcp_page: "02"
  vcp_code: "3D"

- id: caption_display
  label: Caption Display
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=No mean, 0001h=Off, 0002h=CC1, 0003h=CC2, 0004h=CC3, 0005h=CC4, 0006h=Text1, 0007h=Text2, 0008h=Text3, 0009h=Text4'
  vcp_page: "10"
  vcp_code: "84"

- id: digital_captions
  label: Digital Captions
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=No mean, 0001h=Off, 0002h=CS1, 0003h=CS2, 0004h=CS3, 0005h=CS4, 0006h=CS5, 0007h=CS6'
  vcp_page: "10"
  vcp_code: "A1"

- id: quick_start
  label: Quick Start
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On'
  vcp_page: "11"
  vcp_code: "EA"

- id: auto_input_change
  label: Auto Input Change
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=First, 0002h=None, 0004h=Custom'
  vcp_page: "02"
  vcp_code: "40"

- id: auto_input_1
  label: Auto Input 1
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=VGA, 0005h=Video1(AV), 000Ch=DVD/HD1, 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3'
  vcp_page: "10"
  vcp_code: "2E"

- id: auto_input_2
  label: Auto Input 2
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=VGA, 0005h=Video1(AV), 000Ch=DVD/HD1, 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3'
  vcp_page: "10"
  vcp_code: "2F"

- id: auto_input_3
  label: Auto Input 3
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=VGA, 0005h=Video1(AV), 000Ch=DVD/HD1, 0011h=HDMI1, 0012h=HDMI2, 0082h=HDMI3'
  vcp_page: "10"
  vcp_code: "30"

- id: cec
  label: CEC
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On'
  vcp_page: "11"
  vcp_code: "76"

- id: cec_auto_turn_off
  label: CEC Auto Turn Off
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Disable, 0002h=Enable'
  vcp_page: "11"
  vcp_code: "77"

- id: cec_audio_receiver
  label: CEC Audio Receiver
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Disable, 0002h=Enable'
  vcp_page: "11"
  vcp_code: "78"

- id: cec_device_list
  label: CEC Device List
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=NO, 0002h=YES'
  vcp_page: "11"
  vcp_code: "79"

- id: edid
  label: EDID
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Mode 0, 0002h=Mode 1, 0003h=Mode 2'
  vcp_page: "10"
  vcp_code: "AA"

- id: video_range
  label: Video Range
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Expanded Signal, 0002h=Raw Signal, 0003h=Auto'
  vcp_page: "10"
  vcp_code: "40"

- id: vga_mode
  label: VGA Mode
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=RGB, 0002h=YPbPr'
  vcp_page: "10"
  vcp_code: "8E"

- id: auto_adjust
  label: Auto Adjust
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Execute'
  vcp_page: "00"
  vcp_code: "1E"

- id: h_position
  label: H Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Left Side, 0064h=Right Side'
  vcp_page: "00"
  vcp_code: "20"

- id: v_position
  label: V Position
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Bottom Side, 0064h=Top Side'
  vcp_page: "00"
  vcp_code: "30"

- id: clock
  label: Clock
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h-0064h'
  vcp_page: "00"
  vcp_code: "0E"

- id: phase
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h-0064h'
  vcp_page: "00"
  vcp_code: "3E"

- id: h_resolution
  label: H Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Low, FFFFh=High'
  vcp_page: "02"
  vcp_code: "50"

- id: v_resolution
  label: V Resolution
  kind: action
  params:
    - name: value
      type: integer
      description: '0000h=Low, FFFFh=High'
  vcp_page: "02"
  vcp_code: "51"

- id: key_lock
  label: Key Lock Settings
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=Off, 0001h=Mode2, 0002h=Mode1'
  vcp_page: "00"
  vcp_code: "FB"

- id: ir_lock
  label: IR Lock Settings
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0004h=Mode2, 0005h=Mode1'
  vcp_page: "02"
  vcp_code: "3F"

- id: power_supply
  label: Power Supply
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=ON, 0003h=OFF'
  vcp_page: "11"
  vcp_code: "75"

- id: led_indicator
  label: LED Indicator
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=ON, 0002h=OFF'
  vcp_page: "02"
  vcp_code: "BE"

- id: mute_settings
  label: Mute Settings
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Audio, 0002h=Video, 0003h=Audio & Video'
  vcp_page: "11"
  vcp_code: "E9"

- id: thermal_warning
  label: Thermal Warning Message
  kind: action
  params:
    - name: value
      type: string
      description: '0000h=No mean, 0001h=Off, 0002h=On'
  vcp_page: "11"
  vcp_code: "ED"

- id: thermal_shutdown
  label: Thermal Shutdown
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=Off, 0002h=On'
  vcp_page: "10"
  vcp_code: "8A"

- id: control_interface
  label: Control Interface
  kind: action
  params:
    - name: value
      type: string
      description: '0001h=RS-232C, 0002h=LAN'
  vcp_page: "10"
  vcp_code: "3E"

- id: monitor_id
  label: Monitor ID
  kind: action
  params:
    - name: value
      type: integer
      description: '0001h-0064h: Monitor ID 1-100'
  vcp_page: "02"
  vcp_code: "3E"

- id: temperature_sensor_select
  label: Temperature Sensor Select
  kind: action
  params:
    - name: sensor_number
      type: integer
      description: 'Sensor index (1-based); reply byte indicates max sensor count'
  vcp_page: "02"
  vcp_code: "78"

- id: temperature_read
  label: Temperature Read
  kind: query
  params: []
  description: Read temperature from previously selected sensor; value is 2s complement in 0.5C units
  vcp_page: "02"
  vcp_code: "79"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - "0001"  # ON
    - "0002"  # Stand-by (power save)
    - "0003"  # Reserved
    - "0004"  # OFF
  description: Power mode state

- id: command_result
  type: enum
  values:
    - "00"  # No Error
    - "01"  # Unsupported operation or condition

- id: timing_report
  type: object
  properties:
    - name: sync_status
      type: object
      description: Bitfield - Bit7=sync out of range, Bit6=unstable, Bit1=H polarity, Bit0=V polarity
    - name: h_freq
      type: integer
      description: Horizontal frequency in 0.01kHz units
    - name: v_freq
      type: integer
      description: Vertical frequency in 0.01Hz units
```

## Variables
```yaml
# VCP Read/Write parameters from OSD table
# Page 00h
- id: backlight
  vcp_page: "00"
  vcp_code: "10"
  type: integer
  range: [0, 100]
  description: Backlight / Brightness

- id: contrast
  vcp_page: "00"
  vcp_code: "12"
  type: integer
  range: [0, 100]

- id: color_temperature
  vcp_page: "00"
  vcp_code: "0C"
  type: enum
  values:
    - "0023"  # Warm
    - "003F"  # Normal
    - "005A"  # Cool

- id: red_gain
  vcp_page: "00"
  vcp_code: "16"
  type: integer
  range: [0, 100]

- id: green_gain
  vcp_page: "00"
  vcp_code: "18"
  type: integer
  range: [0, 100]

- id: blue_gain
  vcp_page: "00"
  vcp_code: "1A"
  type: integer
  range: [0, 100]

- id: input_select
  vcp_page: "00"
  vcp_code: "60"
  type: enum
  values:
    - "0001"  # VGA(RGB)
    - "0005"  # Video1(AV)
    - "0009"  # Tuner1(TV)
    - "000C"  # DVD/HD1 (VGA(YPbPr))
    - "0011"  # HDMI1
    - "0012"  # HDMI2
    - "0082"  # HDMI3
    - "0087"  # MP(Media Player)

# Page 02h
- id: picture_mode
  vcp_page: "02"
  vcp_code: "1A"
  type: enum
  values:
    - "0003"  # HighBright
    - "0004"  # Standard
    - "0008"  # Custom
    - "0017"  # Dynamic
    - "0018"  # Energy Savings
    - "001B"  # HDR Video
    - "001D"  # Conferencing

- id: aspect_ratio
  vcp_page: "02"
  vcp_code: "70"
  type: enum
  values:
    - "0001"  # NORMAL
    - "0002"  # FULL
    - "0004"  # ZOOM
    - "0007"  # 1:1
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event messages from monitor
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures
```

## Notes

Packet structure: SOH(01h) + Reserved + Destination + Source + MessageType + MessageLength(2 bytes) + STX + MessageData + ETX + BCC + CR(0Dh)

BCC (Block Check Code) calculated as XOR of all bytes from Reserved through ETX.

Monitor ID range: 1-100 (address 41h-A4h), ALL=*(2Ah). Group ID: 1-9 (31h-39h).

Command packet

## Provenance

```yaml
source_domains:
  - sharp-displays.jp.sharp
source_urls:
  - https://sharp-displays.jp.sharp/support/webdl/dl_service/data/display/manual/e658/eu/External_Control_Exx8_Series_EN_Rev1.0.pdf
retrieved_at: 2026-05-26T01:11:52.709Z
last_checked_at: 2026-06-10T00:41:37.795Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:41:37.795Z
matched_actions: 77
action_count: 77
confidence: medium
summary: "All 77 spec action units (14 CTL opcodes + 61 specific VCP page/code pairs + generic vcp_set/vcp_get) match verbatim source entries in sections 7 and 8; transport values baud/port/timing all confirmed; 9 VCP codes only in Variables are represented by generic vcp_set/vcp_get, leaving no uncovered source commands. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document header states \"NEC LCD monitor\" — manufacturer attribution to Sharp is based on user input; document internal title conflicts"
- "port stated for LAN; RS-232 has no port number"
- "source does not document unsolicited event messages from monitor"
- "no explicit multi-step macros documented"
- "source contains no safety warnings or interlock procedures"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
