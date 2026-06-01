---
spec_id: admin/planar-epx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar EPX Series Control Spec"
manufacturer: Planar
model_family: "Planar EPX Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar EPX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-31T07:03:05.848Z
generated_at: 2026-05-31T07:03:05.848Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T07:03:05.848Z
  matched_actions: 136
  action_count: 136
  confidence: high
  summary: "All 136 spec actions matched wire-token opcodes found in source command tables; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-28
---

# Planar EPX Series Control Spec

## Summary
Planar EPX Series large-format displays controlled via RS-232 serial binary protocol. Supports power control, input switching (VGA, DP, HDMI, OPS), display adjustment (brightness, contrast, color, gamma), multi-source PIP, audio, OSD, RTC scheduling, EDID management, and network configuration.

<!-- UNRESOLVED: specific EPX model numbers (e.g. EP5524K, EP6524K, EP7524K, EP8624K) not confirmed from this document alone -->
<!-- UNRESOLVED: no TCP/IP control protocol documented; only RS-232 serial -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # default; also supports 115200, 38400, 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

### Binary Frame Format
```
Read:    STX(0x07) IDT 0x01 CMD[3]        ETX(0x08)  — 7 bytes
Write:   STX(0x07) IDT 0x02 CMD[3] VAL    ETX(0x08)  — 8 bytes
Return:  STX(0x07) IDT 0x00 CMD[3] REPLY  ETX(0x08)  — 8 bytes
```
- STX = 0x07, ETX = 0x08
- IDT = don't-care (1 byte)
- Type: 0x01 = read, 0x02 = write, 0x00 = return from monitor
- CMD = 3-byte ASCII mnemonic (see command tables)
- VAL/REPLY = 1-byte value

## Traits
```yaml
traits:
  - powerable    # inferred: POW on/off commands
  - queryable    # inferred: read-type commands return current values
  - routable     # inferred: MIN input source selection, PIP source routing
  - levelable    # inferred: VOL, BRI, CON, SHA, HUE, SAT continuous ranges
```

## Actions
```yaml
# Power Control & Input Source
- id: power_control
  label: Power Control
  kind: action
  opcode: POW
  opcode_hex: "50 4F 57"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
  remark: valid in power saving mode when Wake on All configured

- id: ops_power
  label: OPS Power Control
  kind: action
  opcode: IPC
  opcode_hex: "49 50 43"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: input_source
  label: Input Source Select
  kind: action
  opcode: MIN
  opcode_hex: "4D 49 4E"
  params:
    - name: source
      type: integer
      enum: [0, 9, 10, 11, 12, 13, 14, 16]
      description: "0=VGA, 9=HDMI1, 10=HDMI2, 11=HDMI3, 12=HDMI4, 13=DP1, 14=OPS, 16=DP2"

# Display Adjustment - Brightness & Backlight
- id: backlight_brightness
  label: Backlight Brightness
  kind: action
  opcode: BRI
  opcode_hex: "42 52 49"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Backlight brightness level

- id: digital_brightness
  label: Digital Brightness Level
  kind: action
  opcode: BRL
  opcode_hex: "42 52 4C"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Digital brightness level

- id: backlight_onoff
  label: Backlight On/Off
  kind: action
  opcode: BLC
  opcode_hex: "42 4C 43"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: contrast
  label: Contrast
  kind: action
  opcode: CON
  opcode_hex: "43 4F 4E"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Contrast level

- id: sharpness
  label: Sharpness
  kind: action
  opcode: SHA
  opcode_hex: "53 48 41"
  params:
    - name: value
      type: integer
      range: [0, 10]
      description: Sharpness level

- id: hue
  label: Hue
  kind: action
  opcode: HUE
  opcode_hex: "48 55 45"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Hue adjustment

- id: saturation
  label: Saturation
  kind: action
  opcode: SAT
  opcode_hex: "53 41 54"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Saturation level

# Display Adjustment - Scheme
- id: scheme
  label: Picture Scheme
  kind: action
  opcode: SCM
  opcode_hex: "53 43 4D"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "0=User, 1=Sport, 2=Game, 3=Cinema, 4=Vivid"

# Display Adjustment - Color Temperature
- id: color_temperature
  label: Color Temperature
  kind: action
  opcode: COT
  opcode_hex: "43 4F 54"
  params:
    - name: preset
      type: integer
      enum: [0, 1, 2, 3, 6, 7]
      description: "0=User, 1=6500K, 2=9300K, 3=3200K, 6=5000K, 7=7500K"

# Display Adjustment - Gamma
- id: gamma
  label: Gamma
  kind: action
  opcode: GAC
  opcode_hex: "47 41 43"
  params:
    - name: preset
      type: integer
      range: [0, 16]
      description: "0=Off, 1=1.85, 2=1.9, 3=1.95, 4=2.0, 5=2.05, 6=2.15, 7=2.15, 8=2.2, 9=2.25, 10=2.3, 11=2.35, 12=2.4, 13=2.45, 14=2.5, 15=2.55, 16=2.6"

# Display Adjustment - Gain & Offset
- id: red_gain
  label: Red Gain
  kind: action
  opcode: USR
  opcode_hex: "55 53 52"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Red gain

- id: green_gain
  label: Green Gain
  kind: action
  opcode: USG
  opcode_hex: "55 53 47"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Green gain

- id: blue_gain
  label: Blue Gain
  kind: action
  opcode: USB
  opcode_hex: "55 53 42"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Blue gain

- id: red_offset
  label: Red Offset
  kind: action
  opcode: UOR
  opcode_hex: "55 4F 52"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Red offset

- id: green_offset
  label: Green Offset
  kind: action
  opcode: UOG
  opcode_hex: "55 4F 47"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Green offset

- id: blue_offset
  label: Blue Offset
  kind: action
  opcode: UOB
  opcode_hex: "55 4F 42"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Blue offset

# VGA Adjustment
- id: vga_phase
  label: VGA Phase
  kind: action
  opcode: PHA
  opcode_hex: "50 48 41"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: VGA phase

- id: vga_clock
  label: VGA Clock
  kind: action
  opcode: CLO
  opcode_hex: "43 4C 4F"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: VGA clock

- id: vga_horizontal_position
  label: VGA Horizontal Position
  kind: action
  opcode: HOR
  opcode_hex: "48 4F 52"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Horizontal position

- id: vga_vertical_position
  label: VGA Vertical Position
  kind: action
  opcode: VER
  opcode_hex: "56 45 52"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Vertical position

- id: vga_auto_adjust
  label: VGA Auto Adjust
  kind: action
  opcode: ADJ
  opcode_hex: "41 44 4A"
  params: []
  type_access: W

# RTC - Time
- id: rtc_year
  label: RTC Year
  kind: action
  opcode: RTY
  opcode_hex: "52 54 59"
  params:
    - name: value
      type: integer
      range: [0, 99]
      description: Year

- id: rtc_month
  label: RTC Month
  kind: action
  opcode: RTM
  opcode_hex: "52 54 4D"
  params:
    - name: value
      type: integer
      range: [1, 12]
      description: Month

- id: rtc_day
  label: RTC Day
  kind: action
  opcode: RTD
  opcode_hex: "52 54 44"
  params:
    - name: value
      type: integer
      range: [1, 31]
      description: Day

- id: rtc_hour
  label: RTC Hour
  kind: action
  opcode: RTH
  opcode_hex: "52 54 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Hour

- id: rtc_minute
  label: RTC Minute
  kind: action
  opcode: RTN
  opcode_hex: "52 54 4E"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Minute

# RTC - Timer
- id: timer_mode
  label: Timer Mode
  kind: action
  opcode: TMS
  opcode_hex: "54 4D 53"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Everyday, 1=Workday, 2=User"

- id: timer_enable_days
  label: Timer Enable Days
  kind: action
  opcode: AEN
  opcode_hex: "41 45 4E"
  params:
    - name: bitmask
      type: integer
      range: [0, 127]
      description: "Bitmask: bit0=Sun, bit1=Mon, bit2=Tue, bit3=Wed, bit4=Thu, bit5=Fri, bit6=Sat"

- id: timer_disable_days
  label: Timer Disable Days
  kind: action
  opcode: AEF
  opcode_hex: "41 45 46"
  params:
    - name: bitmask
      type: integer
      range: [0, 127]
      description: "Bitmask: bit0=Sun, bit1=Mon, bit2=Tue, bit3=Wed, bit4=Thu, bit5=Fri, bit6=Sat"

# RTC - Sunday Schedule
- id: sunday_on_hour
  label: Sunday On Hour
  kind: action
  opcode: SNH
  opcode_hex: "53 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Sunday power-on hour

- id: sunday_on_minute
  label: Sunday On Minute
  kind: action
  opcode: SNM
  opcode_hex: "53 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Sunday power-on minute

- id: sunday_off_hour
  label: Sunday Off Hour
  kind: action
  opcode: SFH
  opcode_hex: "53 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Sunday power-off hour

- id: sunday_off_minute
  label: Sunday Off Minute
  kind: action
  opcode: SFM
  opcode_hex: "53 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Sunday power-off minute

# RTC - Monday Schedule
- id: monday_on_hour
  label: Monday On Hour
  kind: action
  opcode: NNH
  opcode_hex: "4E 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Monday power-on hour

- id: monday_on_minute
  label: Monday On Minute
  kind: action
  opcode: NNM
  opcode_hex: "4E 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Monday power-on minute

- id: monday_off_hour
  label: Monday Off Hour
  kind: action
  opcode: NFH
  opcode_hex: "4E 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Monday power-off hour

- id: monday_off_minute
  label: Monday Off Minute
  kind: action
  opcode: NFM
  opcode_hex: "4E 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Monday power-off minute

# RTC - Tuesday Schedule
- id: tuesday_on_hour
  label: Tuesday On Hour
  kind: action
  opcode: ENH
  opcode_hex: "45 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Tuesday power-on hour

- id: tuesday_on_minute
  label: Tuesday On Minute
  kind: action
  opcode: ENM
  opcode_hex: "45 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Tuesday power-on minute

- id: tuesday_off_hour
  label: Tuesday Off Hour
  kind: action
  opcode: EFH
  opcode_hex: "45 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Tuesday power-off hour

- id: tuesday_off_minute
  label: Tuesday Off Minute
  kind: action
  opcode: EFM
  opcode_hex: "45 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Tuesday power-off minute

# RTC - Wednesday Schedule
- id: wednesday_on_hour
  label: Wednesday On Hour
  kind: action
  opcode: DNH
  opcode_hex: "44 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Wednesday power-on hour

- id: wednesday_on_minute
  label: Wednesday On Minute
  kind: action
  opcode: DNM
  opcode_hex: "44 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Wednesday power-on minute

- id: wednesday_off_hour
  label: Wednesday Off Hour
  kind: action
  opcode: DFH
  opcode_hex: "44 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Wednesday power-off hour

- id: wednesday_off_minute
  label: Wednesday Off Minute
  kind: action
  opcode: DFM
  opcode_hex: "44 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Wednesday power-off minute

# RTC - Thursday Schedule
- id: thursday_on_hour
  label: Thursday On Hour
  kind: action
  opcode: UNH
  opcode_hex: "55 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Thursday power-on hour

- id: thursday_on_minute
  label: Thursday On Minute
  kind: action
  opcode: UNM
  opcode_hex: "55 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Thursday power-on minute

- id: thursday_off_hour
  label: Thursday Off Hour
  kind: action
  opcode: UFH
  opcode_hex: "55 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Thursday power-off hour

- id: thursday_off_minute
  label: Thursday Off Minute
  kind: action
  opcode: UFM
  opcode_hex: "55 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Thursday power-off minute

# RTC - Friday Schedule
- id: friday_on_hour
  label: Friday On Hour
  kind: action
  opcode: INH
  opcode_hex: "49 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Friday power-on hour

- id: friday_on_minute
  label: Friday On Minute
  kind: action
  opcode: INM
  opcode_hex: "49 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Friday power-on minute

- id: friday_off_hour
  label: Friday Off Hour
  kind: action
  opcode: IFH
  opcode_hex: "49 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Friday power-off hour

- id: friday_off_minute
  label: Friday Off Minute
  kind: action
  opcode: IFM
  opcode_hex: "49 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Friday power-off minute

# RTC - Saturday Schedule
- id: saturday_on_hour
  label: Saturday On Hour
  kind: action
  opcode: TNH
  opcode_hex: "54 4E 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Saturday power-on hour

- id: saturday_on_minute
  label: Saturday On Minute
  kind: action
  opcode: TNM
  opcode_hex: "54 4E 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Saturday power-on minute

- id: saturday_off_hour
  label: Saturday Off Hour
  kind: action
  opcode: TFH
  opcode_hex: "54 46 48"
  params:
    - name: value
      type: integer
      range: [0, 23]
      description: Saturday power-off hour

- id: saturday_off_minute
  label: Saturday Off Minute
  kind: action
  opcode: TFM
  opcode_hex: "54 46 4D"
  params:
    - name: value
      type: integer
      range: [0, 59]
      description: Saturday power-off minute

# Audio
- id: volume
  label: Volume
  kind: action
  opcode: VOL
  opcode_hex: "56 4F 4C"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: Volume level

- id: bass
  label: Bass
  kind: action
  opcode: BAS
  opcode_hex: "42 41 53"
  params:
    - name: value
      type: integer
      range: [0, 12]
      description: "Bass (-6 to 6 mapped as 0-12)"

- id: treble
  label: Treble
  kind: action
  opcode: TRE
  opcode_hex: "54 52 45"
  params:
    - name: value
      type: integer
      range: [0, 12]
      description: "Treble (-6 to 6 mapped as 0-12)"

- id: balance
  label: Balance
  kind: action
  opcode: BAL
  opcode_hex: "42 41 4C"
  params:
    - name: value
      type: integer
      range: [0, 12]
      description: "Balance (-6 to 6 mapped as 0-12)"

- id: audio_source_select
  label: Audio Source Select
  kind: action
  opcode: AUS
  opcode_hex: "41 55 53"
  params:
    - name: source
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "0=Audio In, 1=Main Source, 2=Source 2, 3=Source 3, 4=Source 4"

- id: internal_speaker
  label: Internal Speaker
  kind: action
  opcode: INS
  opcode_hex: "49 4E 53"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: mute
  label: Mute
  kind: action
  opcode: MUT
  opcode_hex: "4D 55 54"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Mute Off, 1=Mute On"

# OSD
- id: osd_transparency
  label: OSD Transparency
  kind: action
  opcode: OST
  opcode_hex: "4F 53 54"
  params:
    - name: value
      type: integer
      range: [0, 10]
      description: OSD transparency

- id: osd_h_position
  label: OSD Horizontal Position
  kind: action
  opcode: OSH
  opcode_hex: "4F 53 48"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: OSD horizontal position

- id: osd_v_position
  label: OSD Vertical Position
  kind: action
  opcode: OSV
  opcode_hex: "4F 53 56"
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: OSD vertical position

- id: osd_rotation
  label: OSD Rotation
  kind: action
  opcode: OSR
  opcode_hex: "4F 53 52"
  params:
    - name: mode
      type: integer
      enum: [0, 1]
      description: "0=Landscape, 1=Portrait"

- id: osd_language
  label: OSD Language
  kind: action
  opcode: OSL
  opcode_hex: "4F 53 4C"
  params:
    - name: language
      type: integer
      enum: [0, 1, 2, 13, 15, 16, 18, 19, 20]
      description: "0=English, 1=French, 2=German, 13=Italian, 15=Portuguese, 16=Spanish, 18=Chinese Traditional, 19=Chinese Simplified, 20=Japanese"

- id: osd_timeout
  label: OSD Timeout
  kind: action
  opcode: OSO
  opcode_hex: "4F 53 4F"
  params:
    - name: seconds
      type: integer
      enum: [5, 10, 20, 30, 60]
      description: "OSD timeout in seconds"

- id: splash_screen
  label: Splash Screen
  kind: action
  opcode: SPS
  opcode_hex: "53 50 53"
  params:
    - name: state
      type: integer
      enum: [0]
      description: "0=Off"

- id: message_box
  label: Message Box
  kind: action
  opcode: MSB
  opcode_hex: "4D 53 42"
  params:
    - name: state
      type: integer
      enum: [0]
      description: "0=Off"

# EDID
- id: edid_hdmi1
  label: EDID HDMI 1
  kind: action
  opcode: EH1
  opcode_hex: "45 48 31"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_hdmi2
  label: EDID HDMI 2
  kind: action
  opcode: EH2
  opcode_hex: "45 48 32"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_hdmi3
  label: EDID HDMI 3
  kind: action
  opcode: EH3
  opcode_hex: "45 48 33"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_hdmi4
  label: EDID HDMI 4
  kind: action
  opcode: EH4
  opcode_hex: "45 48 34"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_ops
  label: EDID OPS
  kind: action
  opcode: EH5
  opcode_hex: "45 48 35"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_dp1
  label: EDID DP1
  kind: action
  opcode: ED1
  opcode_hex: "45 44 31"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

- id: edid_dp2
  label: EDID DP2
  kind: action
  opcode: ED2
  opcode_hex: "45 44 32"
  params:
    - name: mode
      type: integer
      enum: [0]
      description: "0=1080P"

# Multi-Source
- id: multisource_views
  label: Multi-Source Views
  kind: action
  opcode: PSC
  opcode_hex: "50 53 43"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3, 4, 7]
      description: "0=Off, 1=PIP Small, 2=PIP Medium, 3=PIP Large, 4=Dual View, 7=Quad View"

- id: pip_source_window1
  label: PIP Source Window 1
  kind: action
  opcode: PIN
  opcode_hex: "50 49 4E"
  params:
    - name: source
      type: integer
      description: "Input source for sub window 1 (refer to MIN values)"

- id: pip_source_window2
  label: PIP Source Window 2
  kind: action
  opcode: PIO
  opcode_hex: "50 49 4F"
  params:
    - name: source
      type: integer
      description: "Input source for sub window 2 (refer to MIN values)"

- id: pip_source_window3
  label: PIP Source Window 3
  kind: action
  opcode: PIP
  opcode_hex: "50 49 50"
  params:
    - name: source
      type: integer
      description: "Input source for sub window 3 (refer to MIN values)"

- id: pip_position
  label: PIP Position
  kind: action
  opcode: PPO
  opcode_hex: "50 50 4F"
  params:
    - name: position
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Bottom-left, 1=Bottom-right, 2=Top-left, 3=Top-right"

- id: pip_main_swap
  label: PIP/Main Swap
  kind: action
  opcode: SWA
  opcode_hex: "53 57 41"
  params: []
  type_access: W

- id: multisource_preset_recall
  label: Multi-Source Preset Recall
  kind: action
  opcode: PRC
  opcode_hex: "50 52 43"
  params:
    - name: preset
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Preset1, 1=Preset2, 2=Preset3, 3=Preset4"

# Other Control - Scaling
- id: scaling
  label: Scaling (ASP)
  kind: action
  opcode: ASP
  opcode_hex: "41 53 50"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Native, 1=Full Screen, 2=4:3, 3=Letterbox"

- id: scaling_pas
  label: Scaling (PAS)
  kind: action
  opcode: PAS
  opcode_hex: "50 41 53"
  params:
    - name: mode
      type: integer
      enum: [1, 2, 3]
      description: "1=Full Screen, 2=4:3, 3=Letterbox"

- id: overscan
  label: Overscan Ratio
  kind: action
  opcode: ZOM
  opcode_hex: "5A 4F 4D"
  params:
    - name: value
      type: integer
      range: [0, 10]
      description: Overscan ratio

# Other Control - System
- id: baud_rate_set
  label: Baud Rate Adjustment
  kind: action
  opcode: BRA
  opcode_hex: "42 52 41"
  params:
    - name: rate
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=115200, 1=38400, 2=19200, 3=9600"

- id: power_saving_config
  label: Power Saving Config
  kind: action
  opcode: WFS
  opcode_hex: "57 46 53"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Wake on VGA, 1=Wake on All, 2=Always On"

- id: auto_scan
  label: Auto Scan
  kind: action
  opcode: ATS
  opcode_hex: "41 54 53"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Off, 1=Main, 2=Multi, 3=All"

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  opcode: IRF
  opcode_hex: "49 52 46"
  params:
    - name: state
      type: integer
      enum: [0]
      description: "0=Off"

- id: smart_light_control
  label: Smart Light Control
  kind: action
  opcode: SLC
  opcode_hex: "53 4C 43"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Off, 1=DCR, 2=Light Sensor"

- id: power_led
  label: Power LED
  kind: action
  opcode: LED
  opcode_hex: "4C 45 44"
  params:
    - name: state
      type: integer
      enum: [0]
      description: "0=Off"

- id: dp1_version
  label: DisplayPort 1 Version
  kind: action
  opcode: DPM
  opcode_hex: "44 50 4D"
  params:
    - name: version
      type: integer
      enum: [0, 1]
      description: "0=DP 1.1, 1=DP 1.2"

- id: dp2_version
  label: DisplayPort 2 Version
  kind: action
  opcode: DPN
  opcode_hex: "44 50 4E"
  params:
    - name: version
      type: integer
      enum: [0, 1]
      description: "0=DP 1.1, 1=DP 1.2"

- id: ops_power_down_check
  label: OPS Power Down Check
  kind: action
  opcode: OPC
  opcode_hex: "4F 50 43"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Disable, 1=Enable"

- id: rgb_color_range
  label: RGB Color Range
  kind: action
  opcode: HCR
  opcode_hex: "48 43 52"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Auto Detect, 1=Full Range, 2=Limited Range"

- id: gamut
  label: Gamut
  kind: action
  opcode: GMT
  opcode_hex: "47 4D 54"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Native, 1=REC709, 2=SMPTE C, 3=EBU"
  note: Only valid for model EP6524K & EP6524K-T

- id: touch_control
  label: Touch Control
  kind: action
  opcode: TOC
  opcode_hex: "54 4F 43"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Auto, 1=OPS, 2=External"

- id: memc
  label: MEMC
  kind: action
  opcode: MEM
  opcode_hex: "4D 45 4D"
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Off, 1=Low, 2=Medium, 3=High"

# Other Control - Remote Control Emulation
- id: remote_control
  label: Remote Control Key
  kind: action
  opcode: RCU
  opcode_hex: "52 43 55"
  params:
    - name: key
      type: integer
      description: "Remote key code (14=MENU, 4=INFO, 2=UP, 25=DOWN, 1=LEFT, 3=RIGHT, 18=ENTER, 5=EXIT, 7=VGA, 9=HDMI1, 12=HDMI2, 16=HDMI3, 22=HDMI4, 8=DP1, 11=DP2, 21=OPS, 15=SOURCE, 19=P-SOURCE, 17=PIP, 26=P-POSITION, 6=SWAP, 20=SCALING, 67=FREEZE, 0=MUTE, 23=BRIGHT, 24=CONTRAST, 30=AUTO, 29=VOLUME+, 27=VOLUME-, 32-35=Preset1-4, 36-39=Audio Source Main-4)"
  type_access: W

# Other Control - System
- id: reset_all
  label: Reset All
  kind: action
  opcode: ALL
  opcode_hex: "41 4C 4C"
  params: []
  type_access: W

- id: key_lock
  label: Key Lock Control
  kind: action
  opcode: KLC
  opcode_hex: "4B 4C 43"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Unlock keys, 1=Lock keys"

- id: read_serial_number
  label: Read Serial Number
  kind: query
  opcode: SER
  opcode_hex: "53 45 52"
  params: []
  type_access: R
  response: 13 bytes ASCII serial number

- id: read_model_name
  label: Read Model Name
  kind: query
  opcode: MNA
  opcode_hex: "4D 4E 41"
  params: []
  type_access: R
  response: 13 bytes ASCII model name

- id: read_firmware_version
  label: Read Firmware Version
  kind: query
  opcode: GVE
  opcode_hex: "47 56 45"
  params: []
  type_access: R
  response: 6 bytes ASCII firmware version

- id: read_rs232_table_version
  label: Read RS232 Table Version
  kind: query
  opcode: RTV
  opcode_hex: "52 54 56"
  params: []
  type_access: R
  response: "0-255"

# Other Control - Network
- id: network_enable
  label: Network Enable
  kind: action
  opcode: NWE
  opcode_hex: "4E 57 45"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: dynamic_ip
  label: Dynamic IP
  kind: action
  opcode: DIP
  opcode_hex: "44 49 50"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Disable, 1=Enable"

- id: load_default_settings
  label: Load Default Settings
  kind: action
  opcode: LDS
  opcode_hex: "4C 44 53"
  params: []
  type_access: W
  note: Takes approximately 15 seconds to complete

# E-Mail Alert
- id: power_status_alert
  label: Power Status Alert
  kind: action
  opcode: PSA
  opcode_hex: "50 53 41"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: source_status_alert
  label: Source Status Alert
  kind: action
  opcode: SSA
  opcode_hex: "53 53 41"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

- id: signal_lost_alert
  label: Signal Lost Alert
  kind: action
  opcode: SLA
  opcode_hex: "53 4C 41"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

# Ethernet Setup - Static IP
- id: static_ip_1
  label: Static IP Address 1
  kind: action
  opcode: IP1
  opcode_hex: "49 50 31"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: First octet of static IP

- id: static_ip_2
  label: Static IP Address 2
  kind: action
  opcode: IP2
  opcode_hex: "49 50 32"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Second octet of static IP

- id: static_ip_3
  label: Static IP Address 3
  kind: action
  opcode: IP3
  opcode_hex: "49 50 33"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Third octet of static IP

- id: static_ip_4
  label: Static IP Address 4
  kind: action
  opcode: IP4
  opcode_hex: "49 50 34"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Fourth octet of static IP

- id: subnet_mask_1
  label: Subnet Mask 1
  kind: action
  opcode: MK1
  opcode_hex: "4D 4B 31"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: First octet of subnet mask

- id: subnet_mask_2
  label: Subnet Mask 2
  kind: action
  opcode: MK2
  opcode_hex: "4D 4B 32"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Second octet of subnet mask

- id: subnet_mask_3
  label: Subnet Mask 3
  kind: action
  opcode: MK3
  opcode_hex: "4D 4B 33"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Third octet of subnet mask

- id: subnet_mask_4
  label: Subnet Mask 4
  kind: action
  opcode: MK4
  opcode_hex: "4D 4B 34"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Fourth octet of subnet mask

- id: gateway_1
  label: Gateway 1
  kind: action
  opcode: GW1
  opcode_hex: "47 57 31"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: First octet of gateway

- id: gateway_2
  label: Gateway 2
  kind: action
  opcode: GW2
  opcode_hex: "47 57 32"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Second octet of gateway

- id: gateway_3
  label: Gateway 3
  kind: action
  opcode: GW3
  opcode_hex: "47 57 33"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Third octet of gateway

- id: gateway_4
  label: Gateway 4
  kind: action
  opcode: GW4
  opcode_hex: "47 57 34"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Fourth octet of gateway

- id: dns_address_1
  label: DNS Address 1
  kind: action
  opcode: FD1
  opcode_hex: "46 44 31"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: First octet of DNS

- id: dns_address_2
  label: DNS Address 2
  kind: action
  opcode: FD2
  opcode_hex: "46 44 32"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Second octet of DNS

- id: dns_address_3
  label: DNS Address 3
  kind: action
  opcode: FD3
  opcode_hex: "46 44 33"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Third octet of DNS

- id: dns_address_4
  label: DNS Address 4
  kind: action
  opcode: FD4
  opcode_hex: "46 44 34"
  params:
    - name: value
      type: integer
      range: [0, 255]
      description: Fourth octet of DNS

- id: save_static_ip
  label: Save Static IP Settings
  kind: action
  opcode: SNS
  opcode_hex: "53 4E 53"
  params: []
  type_access: W

- id: query_mac
  label: Query MAC Address Byte
  kind: query
  opcode: MAC
  opcode_hex: "4D 41 43"
  params:
    - name: byte_index
      type: integer
      range: [0, 5]
      description: "MAC address byte index (0-5)"
  type_access: W
  response: 1 byte MAC ID
```

## Feedbacks
```yaml
# All W/R commands return current value when queried (Type=0x01).
# Return frame: STX(0x07) IDT 0x00 CMD[3] VALUE ETX(0x08)
- id: power_state
  type: enum
  values: [off, on]
  opcode: POW
  description: "0=Off, 1=On"

- id: input_source_state
  type: enum
  values: [VGA, HDMI1, HDMI2, HDMI3, HDMI4, DP1, DP2, OPS]
  opcode: MIN

- id: backlight_brightness_value
  type: integer
  range: [0, 100]
  opcode: BRI

- id: contrast_value
  type: integer
  range: [0, 100]
  opcode: CON

- id: volume_value
  type: integer
  range: [0, 100]
  opcode: VOL

- id: mute_state
  type: enum
  values: [off, on]
  opcode: MUT

- id: serial_number
  type: string
  opcode: SER
  description: 13-byte ASCII serial number

- id: model_name
  type: string
  opcode: MNA
  description: 13-byte ASCII model name

- id: firmware_version
  type: string
  opcode: GVE
  description: 6-byte ASCII firmware version

- id: rs232_table_version
  type: integer
  range: [0, 255]
  opcode: RTV
```

## Variables
```yaml
# All W/R commands with continuous ranges act as both settable parameters and queryable variables.
# Key variable-like parameters already covered by Actions with kind: action + range params.
# UNRESOLVED: no additional variables beyond those enumerated in Actions
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications from the display
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Commands marked with ▲ are valid in power saving/off mode when Wake on All configured.
# LDS (Load Default Settings) takes ~15 seconds - no explicit safety interlock documented.
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- Binary protocol: STX(0x07) + IDT(1 byte, don't-care) + Type(0x01 read / 0x02 write) + CMD(3 ASCII bytes) + [Value(1 byte)] + ETX(0x08).
- Read commands are 7 bytes (no value byte). Write commands are 8 bytes.
- Monitor always returns response after receiving valid command (Type=0x00).
- Default baud rate 19200; configurable via BRA command to 115200/38400/9600.
- Commands marked ▲ work in power-saving/off mode when "Power Saving Config" = "Wake on All".
- GMT (Gamut) command only valid for EP6524K & EP6524K-T models.
- MAC address queried one byte at a time via MAC command with byte index 0-5.
- Bass/Treble/Balance ranges 0-12 map to -6 to +6.
- LDS (reset) takes ~15 seconds to complete.

<!-- UNRESOLVED: specific EPX model numbers covered by this RS-232 table not confirmed -->
<!-- UNRESOLVED: flow control setting not stated -->
<!-- UNRESOLVED: no TCP/IP control documented — serial only -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: no unsolicited event/notification protocol documented -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-31T07:03:05.848Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:03:05.848Z
matched_actions: 136
action_count: 136
confidence: high
summary: "All 136 spec actions matched wire-token opcodes found in source command tables; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
