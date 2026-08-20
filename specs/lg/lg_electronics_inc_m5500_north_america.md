---
spec_id: admin/lg-m5500
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG M5500 Control Spec"
manufacturer: LG
model_family: M5500
aliases: []
compatible_with:
  manufacturers:
    - LG
    - "LG Electronics"
  models:
    - M5500
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - gscs-b2c.lge.com
  - lg.com
  - proaudioinc.com
  - manualslib.com
  - files.remotecentral.com
source_urls:
  - "https://gscs-b2c.lge.com/downloadFile?fileId=of0WZ51DxT0g4GfCl7oBRA"
  - https://www.lg.com/ca_en/support/product-support/troubleshoot/help-library/cs-CT20098005-20153058982994/
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/2672303/Lg-M5500c.html
  - https://files.remotecentral.com/browser/brand-1/lg/television/index.html
retrieved_at: 2026-08-16T23:33:52.994Z
last_checked_at: 2026-08-05T08:31:50.840Z
generated_at: 2026-08-05T08:31:50.840Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source document is the generic LG M-series External Control reference, not M5500-specific. Command availability on M5500 hardware is conditional. Some commands may not be supported on certain models."
  - "TCP/IP port for LG network control (often 9761 / 9762) not stated in source. SNMP/UDP control not covered. Network-related commands (sn 80/81/82, Wake On LAN) operate via RS-232C path described above; no separate IP port documentation provided."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:31:50.840Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 spec action units map to the 111 source command-reference rows; transport parameters (9600/8N1) are verbatim in source. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# LG M5500 Control Spec

## Summary
LG M5500 is a 55-inch commercial LCD signage display controlled via RS-232C serial protocol. This spec covers the LG external control command set for the M-series signage family, including power, input, picture, sound, timer, network, tile, and lock functions. Communication uses ASCII commands framed with Set ID and carriage return.

<!-- UNRESOLVED: Source document is the generic LG M-series External Control reference, not M5500-specific. Command availability on M5500 hardware is conditional. Some commands may not be supported on certain models. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: power on/off/restart commands present
- routable        # inferred: input select commands present
- queryable       # inferred: status query commands present
- levelable       # inferred: volume, brightness, backlight control present
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  command: "ka {set_id} {data}"  # Command1=k, Command2=a; Data 00=Off, 01=On, 02=Restart
  params:
    - name: set_id
      type: integer
      description: Set ID (01-FE; 00=broadcast)
    - name: data
      type: enum
      values: [00, 01, 02]
      description: "00=Off, 01=On, 02=Restart"

- id: select_input
  label: Select Input
  kind: action
  command: "xb {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["20", "40", "60", "70", "80", "90", "A0", "91", "A1", "92", "A2", "95", "A5", "96", "A6", "97", "A7", "98", "A8", "99", "A9", "C0", "D0", "C1", "D1", "C2", "D2", "C3", "D3", "E0", "E1", "E2", "E3"]
      description: "20=AV, 40=Component, 60=RGB, 70=DVI-D PC, 80=DVI-D DTV, 90=HDMI1 DTV, A0=HDMI1 PC, 91=HDMI2 DTV, A1=HDMI2 PC, 92=OPS/HDMI3/DVI-D DTV, A2=OPS/HDMI3/DVI-D PC, 95=OPS/DVI-D DTV, A5=OPS/DVI-D PC, 96=HDMI3/DVI-D DTV, A6=HDMI3/DVI-D PC, 97=HDMI3/HDMI2/DVI-D DTV, A7=HDMI3/HDMI2/DVI-D PC, 98=OPS DTV, A8=OPS PC, 99=HDMI2/OPS DTV, A9=HDMI2/OPS PC, C0=DisplayPort DTV, D0=DisplayPort PC, C1=DisplayPort/USB-C DTV, D1=DisplayPort/USB-C PC, C2=HDMI3 DTV, D2=HDMI3 PC, C3=HDBaseT DTV, D3=HDBaseT PC, E0=SuperSign webOS Player, E1=Others, E2=Multi Screen, E3=Play via URL"

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "kc {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["02", "06"]
      description: "02=Full Screen, 06=Original"

- id: brightness_control
  label: Brightness Control (preset)
  kind: action
  command: "jq {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04"]
      description: "00=Off, 01=Min, 02=Medium, 03=Max, 04=Auto"

- id: picture_mode
  label: Picture Mode
  kind: action
  command: "dx {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "08", "11", "12"]
      description: "00=Mall/QSR, 01=General, 02=Gov./Corp., 03=Transportation, 04=Education, 05=Expert1, 08=APS, 11=Calibration, 12=Hospital"

- id: contrast
  label: Contrast
  kind: action
  command: "kg {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: brightness
  label: Brightness
  kind: action
  command: "kh {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: sharpness
  label: Sharpness
  kind: action
  command: "kk {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-32 (0-50)

- id: color
  label: Color
  kind: action
  command: "ki {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: tint
  label: Tint
  kind: action
  command: "kj {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (Red 50-Green 50)

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "xu {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 70-D2 (3200K-13000K)

- id: balance
  label: Balance
  kind: action
  command: "kt {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (Left 50-Right 50)

- id: sound_mode
  label: Sound Mode
  kind: action
  command: "dy {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["01", "02", "03", "04", "05", "07"]
      description: "01=Standard, 02=Music, 03=Cinema, 04=Sports, 05=Game, 07=News (Clear Voice III)"

- id: mute
  label: Mute
  kind: action
  command: "ke {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Mute on, 01=Mute off"

- id: volume
  label: Volume Control
  kind: action
  command: "kf {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: set_clock_1
  label: Current Time 1 (year/month/day)
  kind: action
  command: "fa {set_id} {data1} {data2} {data3}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: integer
      description: Year offset (00-; 2010 base)
    - name: data2
      type: integer
      description: 01-0C (January-December)
    - name: data3
      type: integer
      description: 01-1F (1-31)

- id: set_auto_time
  label: Auto Time
  kind: action
  command: "fa {set_id} 00 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Auto, 01=Manual"

- id: set_clock_2
  label: Current Time 2 (hour/minute/second)
  kind: action
  command: "fx {set_id} {data1} {data2} {data3}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: integer
      description: 00-17 (00-23 hours)
    - name: data2
      type: integer
      description: 00-3B (00-59 minutes)
    - name: data3
      type: integer
      description: 00-3B (00-59 seconds)

- id: no_signal_power_off
  label: No Signal Power Off (15 min)
  kind: action
  command: "fg {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: no_ir_power_off
  label: No IR Power Off (4 hour)
  kind: action
  command: "mn {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: language
  label: OSD Language
  kind: action
  command: "fi {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "10", "11", "12", "13", "14"]
      description: "00=Czech, 01=Danish, 02=German, 03=English, 04=Spanish (EU), 05=Greek, 06=French, 07=Italian, 08=Dutch, 09=Norwegian, 0A=Portuguese, 0B=Portuguese (Brazil), 0C=Russian, 0D=Finnish, 0E=Swedish, 0F=Korean, 10=Chinese (Mandarin), 11=Japanese, 12=Chinese (Cantonese), 13=Arabic, 14=Turkish"

- id: default_settings
  label: Default Settings
  kind: action
  command: "fk {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "02"]
      description: "00=Picture Reset, 02=Reset to Initial Settings"

- id: current_temperature
  label: Current Temperature
  kind: query
  command: "dn {set_id} FF"
  params: []

- id: remote_key
  label: IR Remote Key
  kind: action
  command: "mc {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: string
      description: IR_KEY_CODE (2 hex digits, see IR CODE table)

- id: time_elapsed
  label: Time Elapsed Since Power On
  kind: query
  command: "dl {set_id} FF"
  params: []

- id: product_serial_number
  label: Product Serial Number
  kind: query
  command: "fy {set_id} FF"
  params: []

- id: software_version
  label: Software Version
  kind: query
  command: "fz {set_id} FF"
  params: []

- id: white_balance_red_gain
  label: White Balance Red Gain
  kind: action
  command: "jm {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-FE (0-254); FF=query"

- id: white_balance_green_gain
  label: White Balance Green Gain
  kind: action
  command: "jn {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-FE (0-254); FF=query"

- id: white_balance_blue_gain
  label: White Balance Blue Gain
  kind: action
  command: "jo {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-FE (0-254); FF=query"

- id: white_balance_red_offset
  label: White Balance Red Offset
  kind: action
  command: "sx {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-7F (0-127); FF=query"

- id: white_balance_green_offset
  label: White Balance Green Offset
  kind: action
  command: "sy {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-7F (0-127); FF=query"

- id: white_balance_blue_offset
  label: White Balance Blue Offset
  kind: action
  command: "sz {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: "00-7F (0-127); FF=query"

- id: backlight
  label: Backlight
  kind: action
  command: "mg {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: screen_off
  label: Screen Off
  kind: action
  command: "kd {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Screen On, 01=Screen Off"

- id: tile_mode
  label: Tile Mode
  kind: action
  command: "dd {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: string
      description: 2-byte hex: byte1=tile column, byte2=tile row (00-FF each)

- id: tile_mode_check
  label: Tile Mode Check
  kind: query
  command: "dz {set_id} FF"
  params: []

- id: tile_id
  label: Tile ID
  kind: action
  command: "di {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 01-E1 (Tile ID 1-225); FF=query

- id: natural_mode
  label: Natural Mode (Tile Bezel Compensation)
  kind: action
  command: "dj {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: dpm
  label: DPM (Display Power Management)
  kind: action
  command: "fj {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "04", "05", "06", "07"]
      description: "00=Off, 04=1 min, 05=3 min, 06=5 min, 07=10 min"

- id: remote_local_key_lock
  label: Remote Control / Local Key Lock
  kind: action
  command: "km {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Lock Off, 01=Lock On"

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "fh {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-FA (0-250 seconds)

- id: fail_over_mode
  label: Fail Over Mode
  kind: action
  command: "mi {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Off, 01=Auto, 02=User Setting"

- id: fail_over_input
  label: Fail Over Input Select
  kind: action
  command: "mj {set_id} {data1} {data2} ... {dataN}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: string
      description: Variable list of input priority codes (60, 70, 90, 91, 92, 95, 96, 97, 98, 99, C0, C1, C2, C3)

- id: remote_control_key_lock
  label: Remote Control Key Lock
  kind: action
  command: "tp {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Unlock all, 01=Lock all except Power, 02=Lock all"

- id: local_key_lock
  label: Local Key Lock
  kind: action
  command: "to {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Unlock all, 01=Lock all except Power, 02=Lock all"

- id: status_check
  label: Status Check
  kind: query
  command: "sv {set_id} {data} FF"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["02", "03", "07", "09", "10", "16", "17", "18"]
      description: "02=signal present, 03=PM Mode, 07=temperature sensors, 09=fan speed, 10=RGB sensing/screen fault, 16=humidity, 17=illumination, 18=slope"

- id: daylight_saving_time
  label: Daylight Saving Time
  kind: action
  command: "sd {set_id} {data1} {data2} {data3} {data4} {data5}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["00", "01", "02"]
      description: "00=Off, 01=Start Time, 02=End Time"
    - name: data2
      type: integer
      description: 01-0C (Jan-Dec)
    - name: data3
      type: integer
      description: 01-06 (Week 1-6)
    - name: data4
      type: integer
      description: 00-06 (Sun-Sat)
    - name: data5
      type: integer
      description: 00-17 (00-23 hours)

- id: pm_mode
  label: PM Mode
  kind: action
  command: "sn {set_id} 0c {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03", "04", "05"]
      description: "00=Power Off, 01=Sustain Aspect Ratio, 02=Screen Off, 03=Screen Off Always, 04=Screen Off & Backlight On, 05=Network Ready"

- id: ism_method
  label: ISM Method
  kind: action
  command: "jp {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["02", "04", "08", "90", "91"]
      description: "02=Orbiter, 04=White Wash, 08=Off, 90=User Image, 91=User Video"

- id: network_setting
  label: Network Setting
  kind: action
  command: "sn {set_id} {data1} {data2} {data3} {data4} {data5}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["80", "81", "82"]
      description: "80=IP mode/subnet/gateway, 81=DNS, 82=Apply/read current"
    - name: data2
      type: string
      description: Sub-parameter (mode/address bytes)
    - name: data3
      type: string
      description: Sub-parameter
    - name: data4
      type: string
      description: Sub-parameter
    - name: data5
      type: string
      description: Sub-parameter

- id: power_on_status
  label: Power On Status
  kind: action
  command: "tr {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Last Status, 01=Standby, 02=Power On"

- id: wired_wake_on_lan
  label: Wired Wake On LAN
  kind: action
  command: "fw {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: screen_rotation
  label: Screen Rotation
  kind: action
  command: "th {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=90°, 02=270°, 03=180°"

- id: time_sync
  label: Time Sync
  kind: action
  command: "sn {set_id} 16 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: contents_sync
  label: Contents Sync
  kind: action
  command: "tg {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: lan_daisy_chain
  label: LAN Daisy Chain
  kind: action
  command: "sn {set_id} 84 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: external_input_rotation
  label: External Input Rotation
  kind: action
  command: "sn {set_id} 85 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=90°, 02=270°, 03=180°"

- id: beacon
  label: Beacon
  kind: action
  command: "sn {set_id} 88 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: brightness_scheduling_mode
  label: Brightness Scheduling Mode
  kind: action
  command: "sm {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: brightness_scheduling
  label: Brightness Scheduling
  kind: action
  command: "ss {set_id} {data1} {data2} {data3}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: string
      description: "Index code: f1-f6 (read), FF (read all), e1-e6/e0 (delete), or 00-17 (hour)"
    - name: data2
      type: integer
      description: 00-3B (00-59 minutes) or FF
    - name: data3
      type: integer
      description: 00-64 (backlight 0-100) or FF

- id: multi_screen_mode_input
  label: Multi Screen Mode & Input
  kind: action
  command: "xc {set_id} {data1} {data2} {data3} {data4} {data5}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["10", "22", "23", "24", "25"]
      description: "10=PIP, 22=PBP2, 23=PBP3, 24=PBP4, 25=PBP3 (1:2:1)"
    - name: data2
      type: string
      description: Main input code
    - name: data3
      type: string
      description: Sub1 input code
    - name: data4
      type: string
      description: Sub2 input code
    - name: data5
      type: string
      description: Sub3 input code

- id: multi_screen_aspect_ratio
  label: Multi Screen Aspect Ratio
  kind: action
  command: "xd {set_id} {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["01", "02", "03", "04"]
      description: "01=Main, 02=Sub1, 03=Sub2, 04=Sub3"
    - name: data2
      type: enum
      values: ["00", "01"]
      description: "00=Full Screen, 01=Original"

- id: multi_screen_off
  label: Multi Screen Screen Off
  kind: action
  command: "xe {set_id} {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["01", "02", "03", "04"]
      description: "01=Main, 02=Sub1, 03=Sub2, 04=Sub3"
    - name: data2
      type: enum
      values: ["00", "01"]
      description: "00=Screen On, 01=Screen Off"

- id: screen_off_always
  label: Screen Off Always
  kind: action
  command: "sn {set_id} 0d {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: stop_video
  label: Stop Video
  kind: action
  command: "kx {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Stop Video on, 01=Stop Video off"

- id: wireless_wake_on_lan
  label: Wireless Wake On LAN
  kind: action
  command: "sn {set_id} 90 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: osd_lock
  label: OSD Lock
  kind: action
  command: "kl {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Lock, 01=Unlock"

- id: hdmi_it_content
  label: HDMI IT Content
  kind: action
  command: "sn {set_id} 99 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: holiday_setting
  label: Holiday Setting
  kind: action
  command: "sn {set_id} 9b {data1} {data2} ..."
  params:
    - name: set_id
      type: integer
    - name: data1
      type: string
      description: "Schedule selector (F1-F7 read, E0-E7 delete) or start year"
    - name: data2
      type: string
      description: Sub-parameter depending on Data1

- id: upnp
  label: UPnP
  kind: action
  command: "sn {set_id} 9c {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On (reboots device)"

- id: home_dashboard_lock
  label: Home Dashboard Lock
  kind: action
  command: "sn {set_id} 9d {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Unlock, 01=Lock"

- id: usb_lock
  label: USB Lock
  kind: action
  command: "sn {set_id} 9e {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Unlock, 01=Lock"

- id: wifi_lock
  label: Wi-Fi Lock
  kind: action
  command: "sn {set_id} 9f {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Unlock, 01=Lock"

- id: screen_share_lock
  label: Screen Share Lock
  kind: action
  command: "sn {set_id} a0 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Unlock, 01=Lock"

- id: backup_via_storage
  label: Backup via Storage
  kind: action
  command: "sn {set_id} a1 {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["00", "01", "02", "03", "04"]
      description: "00=Off, 01=Auto (30 min), 02=Manual, 03=SuperSign Contents, 04=SI App / Play via URL"
    - name: data2
      type: integer
      description: End time (01-04) for Auto mode

- id: digital_audio_input
  label: Digital Audio Input
  kind: action
  command: "sn {set_id} a2 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Digital, 01=Analog"

- id: booting_logo_image
  label: Booting Logo Image
  kind: action
  command: "sn {set_id} a3 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: softap
  label: SoftAP Mode
  kind: action
  command: "sn {set_id} a4 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: natural_size
  label: Natural Size
  kind: action
  command: "sn {set_id} a5 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 00-64 (0-100)

- id: play_saved_internal_media
  label: Play Saved Internal Media
  kind: action
  command: "sn {set_id} a8 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["01"]
      description: 01=Play

- id: no_signal_image
  label: No Signal Image
  kind: action
  command: "sn {set_id} a9 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: audio_out
  label: Audio Out
  kind: action
  command: "sn {set_id} aa {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Off, 01=Variable, 02=Fixed"

- id: dpm_wake_up_control
  label: DPM Wake Up Control
  kind: action
  command: "sn {set_id} 0b {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Clock, 01=Clock+DATA"

- id: fan_failure_check
  label: Fan Failure Check
  kind: query
  command: "dw {set_id} FF"
  params: []

- id: apply_to_all_inputs
  label: Apply to All Inputs
  kind: action
  command: "sn {set_id} 52 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["01"]
      description: 01=Apply

- id: timer_power_on
  label: Timer Power On Scheduling
  kind: action
  command: "fd {set_id} {data1} {data2} {data3}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: string
      description: "Index code (f1-f7 read, e1-e7/e0 delete) or 01-0C day setting"
    - name: data2
      type: string
      description: 00-17 (hour) or 01-0C day, or FF
    - name: data3
      type: string
      description: 00-3B (minutes) or FF

- id: timer_power_off
  label: Timer Power Off Scheduling
  kind: action
  command: "fe {set_id} {data1} {data2} {data3}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: string
      description: "Index code (f1-f7 read, e1-e7/e0 delete) or 01-0C day setting"
    - name: data2
      type: string
      description: 00-17 (hour) or 01-0C day, or FF
    - name: data3
      type: string
      description: 00-3B (minutes) or FF

- id: lcin008_control
  label: LCIN008 Control
  kind: action
  command: "sn {set_id} b8 {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["00", "01"]
      description: "00=LCIN008 Power, 01=LCIN008 Brightness"
    - name: data2
      type: string
      description: "For Power: 00=Off, 01=On. For Brightness: ff=Read, 00-64=Set."

- id: transfer_control
  label: Transfer Control (RS-232C Out)
  kind: action
  command: "sn {set_id} cb {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: string
      description: Data bytes to forward to RS232C out

- id: multichannel
  label: Multichannel
  kind: action
  command: "sn {set_id} 76 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: integer
      description: 01-09 (Channel)

- id: change_setid
  label: Change Set ID
  kind: action
  command: "jx {set_id} {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: integer
      description: 00-03 (sets high byte of new Set ID)
    - name: data2
      type: integer
      description: 01-e8 (sets low byte of new Set ID; combined with Data1 yields 1-1000)

- id: gamma
  label: Gamma Mode
  kind: action
  command: "sn {set_id} ad {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Low (1.9), 01=Medium (2.2), 02=High1 (2.4), 03=High2 (BT.1886)"

- id: black_level
  label: Black Level
  kind: action
  command: "sn {set_id} ae {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Low, 01=High, 02=Auto"

- id: uhd_deep_color
  label: UHD Deep Color
  kind: action
  command: "sn {set_id} af {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["70", "90", "91", "92", "95", "96", "97", "98", "99", "C0", "C1", "C2", "C3"]
      description: Input selector
    - name: data2
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: sync_mode
  label: Sync Mode
  kind: action
  command: "sn {set_id} b0 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Slave, 01=Master"

- id: input_manager
  label: Input Manager
  kind: action
  command: "sn {set_id} b1 {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["90", "91", "92", "95", "96", "97", "98", "99", "C0", "C1", "C2", "C3"]
      description: Input selector
    - name: data2
      type: enum
      values: ["00", "01"]
      description: "00=DTV, 01=PC"

- id: pc_ops_power_control
  label: PC/OPS Power Control
  kind: action
  command: "sn {set_id} 8b {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Disable, 01=Sync(On), 02=Sync(On/Off)"

- id: led_local_dimming_v1
  label: LED Local Dimming (Expert Controls)
  kind: action
  command: "sn {set_id} c1 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: scan_inversion
  label: Scan Inversion
  kind: action
  command: "sn {set_id} 87 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: frame_control
  label: Frame Control
  kind: action
  command: "sn {set_id} b7 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: average_picture_level_auto_control
  label: Average Picture Level Auto Control
  kind: action
  command: "sn {set_id} be {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: read_brightness_value
  label: Read Brightness Value
  kind: query
  command: "mu {set_id} FF"
  params: []

- id: screen_fault_detection
  label: Screen Fault Detection
  kind: action
  command: "tz {set_id} {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: stereo_mode
  label: Stereo Mode
  kind: action
  command: "sn {set_id} c2 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02"]
      description: "00=Left/Right, 01=Left/Left, 02=Right/Right"

- id: hdr_picture_mode
  label: HDR Picture Mode
  kind: action
  command: "sn {set_id} c4 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "04"]
      description: "00=Mall/QSR, 01=General, 02=Gov./Corp., 04=Education"

- id: dynamic_tone_mapping
  label: Dynamic Tone Mapping
  kind: action
  command: "sn {set_id} c5 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: led_local_dimming_v2
  label: LED Local Dimming (Picture Options)
  kind: action
  command: "sn {set_id} c6 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01", "02", "03"]
      description: "00=Off, 01=Low, 02=Medium, 03=High"

- id: usb2_to_hdbaset
  label: USB2 to HDBaseT
  kind: action
  command: "sn {set_id} c3 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"

- id: change_password
  label: Change Password
  kind: action
  command: "sn {set_id} a7 {data1} {data2} ... {data12}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: string
      description: 0-9 (digit 1 of 6-digit previous password)
    - name: data2
      type: string
      description: 0-9 (digit 2 of previous password)
    - name: data3
      type: string
      description: 0-9 (digit 3 of previous password)
    - name: data4
      type: string
      description: 0-9 (digit 4 of previous password)
    - name: data5
      type: string
      description: 0-9 (digit 5 of previous password)
    - name: data6
      type: string
      description: 0-9 (digit 6 of previous password)
    - name: data7
      type: string
      description: 0-9 (digit 1 of 6-digit new password)
    - name: data8
      type: string
      description: 0-9 (digit 2 of new password)
    - name: data9
      type: string
      description: 0-9 (digit 3 of new password)
    - name: data10
      type: string
      description: 0-9 (digit 4 of new password)
    - name: data11
      type: string
      description: 0-9 (digit 5 of new password)
    - name: data12
      type: string
      description: 0-9 (digit 6 of new password)

- id: brightness_range_adjustment
  label: Brightness Range Adjustment
  kind: action
  command: "sn {set_id} ab {data1} {data2}"
  params:
    - name: set_id
      type: integer
    - name: data1
      type: enum
      values: ["00", "01"]
      description: "00=Minimum brightness, 01=Maximum brightness"
    - name: data2
      type: integer
      description: 00-64 (must be hex multiple of 5)

- id: color_calibration
  label: Color Calibration
  kind: action
  command: "sn {set_id} d6 {data}"
  params:
    - name: set_id
      type: integer
    - name: data
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]

- id: fault_state
  type: enum
  values: [ok, ng]

- id: temperature_sensor_state
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07"]
  description: 00=all faulty, 07=all normal; bit pattern of Top/Bottom/Main sensor health

- id: pm_mode_state
  type: enum
  values: ["00", "01", "02", "03", "04"]
  description: From status check data 03: 00=screen on, 01=screen off, 02=Screen Off Always, 03=Sustain Aspect Ratio, 04=Screen Off & Backlight On

- id: signal_state
  type: enum
  values: ["00", "01"]
  description: 00=No signal, 01=Signal present

- id: fan_state
  type: enum
  values: ["00", "01"]
  description: 00=Fan failure, 01=Fan normal

- id: fan_speed
  type: integer
  description: Hex 0-2008, Decimal 0-8200 (2 bytes per fan)

- id: humidity_percent
  type: integer
  description: 0-100 %RH (hex)

- id: illumination_lux
  type: integer
  description: 1-1000 Lux (hex)

- id: product_slope
  type: enum
  values: ["00", "01", "02", "03", "04", "05"]
  description: 00=0°, 01=90°, 02=180°, 03=270°, 04=Fallen forward, 05=Fallen backward

- id: screen_fault_detection
  type: enum
  values: ["00", "07"]
  description: 00=NG, 07=OK
```

## Notes
- LG M5500 uses ASCII RS-232C framing: `(Command1)(Command2)( )(SetID)( )(Data)(Cr)`. Set ID 00 broadcasts to all connected displays (no ACK returned). Set ID 01-FE (or 01-E8 for 1-1000 range) addresses individual units.
- Carrier parameter: `(Cr) = 0x0D`, `( ) = 0x20` (space).
- Acknowledgment format: `(Command2)( )(SetID)( )(OK/NG)(Data)(x)` where `x` is the literal character 'x'.
- Reading a value: send `Data = FF` to control mode command to read the current value (not supported by all commands).
- Daisy-chain caveat: rapid power toggling on master may leave some displays off; use MONITOR ON IR code (0xC4) for recovery.
- Source document is the generic LG external-control reference, not M5500-specific. Many commands are model-conditional; the M5500 family is documented here as a baseline.

<!-- UNRESOLVED: TCP/IP port for LG network control (often 9761 / 9762) not stated in source. SNMP/UDP control not covered. Network-related commands (sn 80/81/82, Wake On LAN) operate via RS-232C path described above; no separate IP port documentation provided. -->

## Provenance

```yaml
source_domains:
  - gscs-b2c.lge.com
  - lg.com
  - proaudioinc.com
  - manualslib.com
  - files.remotecentral.com
source_urls:
  - "https://gscs-b2c.lge.com/downloadFile?fileId=of0WZ51DxT0g4GfCl7oBRA"
  - https://www.lg.com/ca_en/support/product-support/troubleshoot/help-library/cs-CT20098005-20153058982994/
  - https://www.proaudioinc.com/Dealer_Area/RS232C_EN_160526.pdf
  - https://www.manualslib.com/manual/2672303/Lg-M5500c.html
  - https://files.remotecentral.com/browser/brand-1/lg/television/index.html
retrieved_at: 2026-08-16T23:33:52.994Z
last_checked_at: 2026-08-05T08:31:50.840Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:31:50.840Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 spec action units map to the 111 source command-reference rows; transport parameters (9600/8N1) are verbatim in source. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source document is the generic LG M-series External Control reference, not M5500-specific. Command availability on M5500 hardware is conditional. Some commands may not be supported on certain models."
- "TCP/IP port for LG network control (often 9761 / 9762) not stated in source. SNMP/UDP control not covered. Network-related commands (sn 80/81/82, Wake On LAN) operate via RS-232C path described above; no separate IP port documentation provided."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
