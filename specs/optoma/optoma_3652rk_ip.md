---
spec_id: admin/optoma-3652rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 3652RK Control Spec"
manufacturer: Optoma
model_family: 3652RK
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 3652RK
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/c19f3412-7e82-4032-a4c1-c7ae9ec8aecf.pdf
retrieved_at: 2026-07-14T18:18:45.662Z
last_checked_at: 2026-07-22T00:15:42.816Z
generated_at: 2026-07-22T00:15:42.816Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic IFP RS232 protocol sheet; it does not state firmware version, power/voltage/current specs, or model-specific exclusions. Wake-on-LAN behaviour and OMS remote power-on depend on Power Mode (Standby) = Active (see Notes)."
  - "source row is garbled/ambiguous; opcode and response format not clearly documented"
  - "numeric feedbacks (volume/brightness/contrast/color/backlight/treble/bass/balance 0-100, usage hours, temperature, firmware version, MAC/IP addresses) are returned as OK<value> strings; model as variables where a tracked-state store is needed."
  - "units for usage_hours and system_temperature not stated in source"
  - "no explicit multi-step sequences described in source."
  - "source contains no explicit safety interlock procedures or power-on sequencing warnings."
  - "firmware version compatibility range not stated."
  - "maximum command rate / inter-command delay not stated."
  - "precise WoL packet format not documented here."
  - "the \"~00155 1\" LED-status row and Note*1 info-string sub-field codes are partially ambiguous in the source."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:15:42.816Z
  matched_actions: 46
  action_count: 46
  confidence: medium
  summary: "All 46 spec actions matched verbatim in source; every transport parameter (9600/8/N/1, port 23, TCP, serial, no auth) verified in source tables. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-14
---

# Optoma 3652RK Control Spec

## Summary
Optoma 3652RK is a Creative Touch 3 Series Interactive Flat Panel (IFP). This spec covers its serial (RS-232) and LAN (RJ45, TCP port 23) control protocol as documented in Optoma's "RS232 Protocol Function List". Commands use an ASCII frame `~<device_id><opcode> <value><CR>` (lead byte 0x7E `~`, 2-digit ASCII device ID, opcode, space, variable, carriage return 0x0D). Both RS232 and RJ45 accept the same command set.

<!-- UNRESOLVED: source is a generic IFP RS232 protocol sheet; it does not state firmware version, power/voltage/current specs, or model-specific exclusions. Wake-on-LAN behaviour and OMS remote power-on depend on Power Mode (Standby) = Active (see Notes). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # RJ45 / LAN control (telnet-style), stated in source
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
traits:
  - powerable       # inferred: power on/off/restart commands present (opcode 00)
  - queryable       # inferred: extensive GET / status queries present
  - levelable       # inferred: volume, brightness, contrast, treble, bass, balance, color, backlight ranges
  - routable        # inferred: input source selection (opcode 12)
```

## Actions
```yaml
# Command frame: ~<device_id><opcode> <value><CR>
#   ~            = lead byte 0x7E
#   <device_id>  = 2-digit ASCII device ID ("xx"); source examples use 00, note states 01 selects device 01
#   <opcode>     = 2-or-3-digit command ID from the CMD column
#   <value>      = variable n (one or more ASCII digits)
#   <CR>         = carriage return 0x0D (terminate every command)
# SET commands acknowledge with ASCII "P" (success) or "F" (failed).
# Hex shown is the canonical device_id=00 example from the source (value bytes vary).

# ---------------- SET commands ----------------

- id: set_power
  label: Set Power
  kind: action
  command: "~xx00 {state}"
  # hex (on): 7E 30 30 30 30 20 31 0d ; (off): 7E 30 30 30 30 20 30 0d ; (restart): 7E 30 30 30 30 20 33 0d
  params:
    - name: state
      type: integer
      description: "0=Power off, 1=Power on, 3=Restart"

- id: set_power_mode_standby
  label: Set Power Mode (Standby)
  kind: action
  command: "~xx114 {mode}"
  # hex (eco): 7E 30 30 31 31 34 20 30 0d ; (active): 7E 30 30 31 31 34 20 31 0d
  params:
    - name: mode
      type: integer
      description: "0=Eco (WoL enabled), 1=Active (LAN/OMS remote power-on enabled)"

- id: set_treble
  label: Set Treble
  kind: action
  command: "~xx95 {level}"
  # hex: 7E 30 30 39 35 20 30 0d to 7E 30 30 39 35 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Treble level 0-100"

- id: set_bass
  label: Set Bass
  kind: action
  command: "~xx96 {level}"
  # hex: 7E 30 30 39 36 20 30 0d to 7E 30 30 39 36 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Bass level 0-100"

- id: set_balance
  label: Set Balance
  kind: action
  command: "~xx99 {level}"
  # hex: 7E 30 30 39 39 20 30 0d to 7E 30 30 39 39 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Balance level 0-100"

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "~xx22 {level}"
  # hex: 7E 30 30 32 32 20 30 0d to 7E 30 30 32 32 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Contrast level 0-100"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "~xx21 {level}"
  # hex: 7E 30 30 32 31 20 30 0d to 7E 30 30 32 31 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Brightness level 0-100"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "~xx252 {mode}"
  # hex: 7E 30 30 32 35 32 20 31 0d (standard) .. 7E 30 30 32 35 32 20 35 0d (movie)
  params:
    - name: mode
      type: integer
      description: "1=Standard, 2=User, 3=Classroom, 4=Meeting, 5=Movie"

- id: set_volume
  label: Set Volume
  kind: action
  command: "~xx81 {level}"
  # hex: 7E 30 30 38 31 20 30 0d to 7E 30 30 38 31 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Volume level 0-100"

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "~xx13 {state}"
  # hex (off): 7E 30 30 31 33 20 30 0d ; (on): 7E 30 30 31 33 20 31 0d
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_mute
  label: Set Audio Mute
  kind: action
  command: "~xx80 {state}"
  # hex (off): 7E 30 30 38 30 20 30 0d ; (on): 7E 30 30 38 30 20 31 0d
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "~xx12 {source}"
  # hex (hdmi1): 7E 30 30 31 32 20 31 0d ; (vga): 7E 30 30 31 32 20 35 0d ; etc.
  params:
    - name: source
      type: integer
      description: "1=HDMI1, 5=VGA, 15=HDMI2, 20=DisplayPort, 24=Android, 25=Slot in PC, 26=HDMIFront, 27=USB Type C"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "~xx60 {ratio}"
  # hex (4:3): 7E 30 30 36 30 20 31 0d ; (16:9): 7E 30 30 36 30 20 32 0d ; (ptp): 7E 30 30 36 30 20 31 34 0d
  params:
    - name: ratio
      type: integer
      description: "1=4:3, 2=16:9, 14=PTP"

- id: set_language
  label: Set OSD Language
  kind: action
  command: "~xx70 {language}"
  # hex (english): 7E 30 30 37 30 20 31 0d ; etc.
  params:
    - name: language
      type: integer
      description: "1=English, 2=German, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Dutch, 9=Swedish, 10=Norge, 11=Finnish, 13=Traditional Chinese, 14=Simplified Chinese, 17=Russian, 18=Hungarian, 19=Czech, 20=Arabic, 22=Turkish, 24=Danish, 27=Romanian"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "~xx20 {mode}"
  # hex (presentation): 7E 30 30 32 30 20 31 0d ; (hdr): 7E 30 30 32 30 20 32 31 0d
  params:
    - name: mode
      type: integer
      description: "1=Presentation, 2=Bright, 3=Cinema, 5=User, 13=DICOM SIM., 21=HDR"

- id: set_color
  label: Set Color
  kind: action
  command: "~xx45 {level}"
  # hex: 7E 30 30 34 35 20 30 0d to 7E 30 30 34 35 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Color level 0-100"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "~xx251 {level}"
  # hex: 7E 30 30 32 35 31 20 30 0d to 7E 30 30 32 35 31 20 31 30 30 0d
  params:
    - name: level
      type: integer
      description: "Backlight level 0-100"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "~xx36 {temp}"
  # hex (standard): 7E 30 30 33 36 20 31 0d ; (cool): 7E 30 30 33 36 20 32 0d ; (warm): 7E 30 30 33 36 20 34 0d
  params:
    - name: temp
      type: integer
      description: "1=Standard, 2=Cool, 4=Warm"

- id: set_freeze
  label: Set Freeze
  kind: action
  command: "~xx04 {state}"
  # hex (unfreeze): 7E 30 30 30 34 20 30 0d ; (freeze): 7E 30 30 30 34 20 31 0d
  params:
    - name: state
      type: integer
      description: "0=Unfreeze, 1=Freeze"

- id: set_pixel_shift_interval
  label: Set Pixel Shift Interval
  kind: action
  command: "~xx250 {minutes}"
  # hex (off): 7E 30 30 32 35 30 20 30 0d ; (60): 7E 30 30 32 35 30 20 36 30 0d
  params:
    - name: minutes
      type: integer
      description: "0=Off, 2, 3, 5, 30, 60 (minutes)"

- id: remote_control_command
  label: Remote Control Emulation
  kind: action
  command: "~xx140 {key}"
  # hex (vol+): 7E 30 30 31 34 30 20 31 38 0d ; etc.
  params:
    - name: key
      type: integer
      description: "10=UP, 11=LEFT, 12=OK, 13=RIGHT, 14=DOWN, 17=Vol-, 18=Vol+, 20=Menu, 47=Input source, 74=Exit"

- id: display_osd_message
  label: Display Message On OSD
  kind: action
  command: "~xx210 {text}"
  # hex: 7E 30 30 32 31 30 20 nn..n 0d
  params:
    - name: text
      type: string
      description: "ASCII message string (nn…n) to show on the OSD"

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~xx112 1"
  # hex: 7E 30 30 31 31 32 20 31 0d
  params: []

- id: set_osd_lock
  label: Set OSD Lock
  kind: action
  command: "~xx239 {mode} {password}"
  # hex (on): 7E 30 30 32 33 39 20 31 20 a 0d ; (off): 7E 30 30 32 33 39 20 32 20 a 0d ; a = 4-digit password bytes (~0000 .. ~9999)
  params:
    - name: mode
      type: integer
      description: "1=OSD lock On with password, 2=OSD lock Off with password"
    - name: password
      type: string
      description: "4-digit password 0000-9999 (a = encoded 4-digit value)"

# ---------------- GET / query commands ----------------

- id: query_power
  label: Query Power
  kind: query
  command: "~xx124 1"
  # hex: 7E 30 30 31 32 34 20 31 0D ; response OK0=Power off, OK1=Power on
  params: []

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~xx126 1"
  # hex: 7E 30 30 31 32 36 20 31 0D ; response OK0-100
  params: []

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~xx125 1"
  # hex: 7E 30 30 31 32 35 20 31 0D ; response OK0-100
  params: []

- id: query_volume
  label: Query Volume
  kind: query
  command: "~xx120 1"
  # hex: 7E 30 30 31 32 30 20 31 0D ; response OK0-100
  params: []

- id: query_video_mute
  label: Query Video Mute
  kind: query
  command: "~xx363 1"
  # hex: 7E 30 30 33 36 33 20 31 0D ; response OK0=Off, OK1=On
  params: []

- id: query_mute
  label: Query Audio Mute
  kind: query
  command: "~xx356 1"
  # hex: 7E 30 30 33 35 36 20 31 0D ; response OK0=Off, OK1=On
  params: []

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "~xx139 1"
  # hex: 7E 30 30 31 33 39 20 31 0D ; response OK1=Standard, OK2=User, OK3=Classroom, OK4=Meeting, OK5=Movie
  params: []

- id: query_input_source
  label: Query Input Source
  kind: query
  command: "~xx121 1"
  # hex: 7E 30 30 31 32 31 20 31 0D ; response OK2=VGA, OK7=HDMI1, OK8=HDMI2, OK15=DisplayPort, OK20=Android, OK21=Slot in PC, OK22=HDMIFront, OK23=USB Type C
  params: []

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~xx127 1"
  # hex: 7E 30 30 31 32 37 20 31 0D ; response OK1=4:3, OK2=16:9, OK14=PTP
  params: []

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "~xx123 1"
  # hex: 7E 30 30 31 32 33 20 31 0D ; response OK1=Presentation, OK2=Bright, OK3=Cinema, OK5=User, OK21=HDR
  params: []

- id: query_color_temp
  label: Query Color Temperature
  kind: query
  command: "~xx128 1"
  # hex: 7E 30 30 31 32 38 20 31 0D ; response OK0=Standard, OK1=Cool, OK3=Warm
  params: []

- id: query_wlan
  label: Query WLAN Status / IP
  kind: query
  command: "~xx451 {n}"
  # hex (n=1): 7E 30 30 34 35 31 20 31 0D ; (n=2): 7E 30 30 34 35 31 20 32 0D
  params:
    - name: n
      type: integer
      description: "1=WLAN status (OK0=Disconnected, OK1=Connected), 2=WLAN IP address (Oknnn:nnn:nnn:nnn)"

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "~xx555 {n}"
  # hex (n=1 LAN): 7E 30 30 35 35 35 20 31 0D ; (n=2 WLAN): 7E 30 30 35 35 35 20 32 0D ; response Oknn:nn:nn:nn:nn:nn
  params:
    - name: n
      type: integer
      description: "1=LAN MAC address, 2=WLAN MAC address"

- id: query_lan
  label: Query LAN Status / IP
  kind: query
  command: "~xx87 {n}"
  # hex (n=1): 7E 30 30 38 37 20 31 0D ; (n=3): 7E 30 30 38 37 20 33 0D
  params:
    - name: n
      type: integer
      description: "1=LAN status (OK0=Disconnected, OK1=Connected), 3=LAN IP address (Oknnn:nnn:nnn:nnn)"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "~xx122 1"
  # hex: 7E 30 30 31 32 32 20 31 0D ; response Oknnnnnnnnnnnnnn (ex. 20190926164814)
  params: []

- id: query_usage_hours
  label: Query Usage Hours
  kind: query
  command: "~xx108 1"
  # hex: 7E 30 30 31 30 38 20 31 0D ; response Oknnnnn
  params: []

- id: query_device_type
  label: Query Device Type
  kind: query
  command: "~xx149 1"
  # hex: 7E 30 30 31 34 39 20 31 0D ; response OK2 = IFP
  params: []

- id: query_information
  label: Query Information String
  kind: query
  command: "~xx150 {n}"
  # hex (n=1): 7E 30 30 31 35 30 20 31 0D ; (n=2): 7E 30 30 31 35 30 20 32 0D ; (n=3): 7E 30 30 31 35 30 20 33 0D ; (n=4): 7E 30 30 31 35 30 20 34 0D ; (n=16): 7E 30 30 31 35 30 20 31 36 0D ; (n=17): 7E 30 30 31 35 30 20 31 37 0D ; (n=18): 7E 30 30 31 35 30 20 31 38 0D ; (n=19): 7E 30 30 31 35 30 20 31 39 0D
  params:
    - name: n
      type: integer
      description: "1=info string (power/run-time/source/firmware/display mode, see Note*1), 2=device native resolution, 3=input source (ex. OKHDMI1), 4=source resolution (ex. OK1920x1080), 16=power mode standby (OK0=Eco, OK1=Active), 17=DHCP (OK0=Off, OK1=On), 18=system temperature (ex. OK48), 19=source refresh rate (ex. OK60Hz)"

- id: query_regulatory_model_name
  label: Query Regulatory Model Name
  kind: query
  command: "~xx151 3"
  # hex: 7E 30 30 31 35 31 20 33 0d ; response Oknnn (ex. SLUGRK)
  params: []

- id: query_osd_lock
  label: Query OSD Lock
  kind: query
  command: "~xx229 1"
  # hex: 7E 30 30 32 32 39 20 31 0D ; response OK0=Off, OK1=On
  params: []

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "~xx353 1"
  # hex: 7E 30 30 33 35 33 20 31 0D ; response Okaaaaaaaaaaaaaaaa (serial number string)
  params: []

# Source also lists an ambiguous LED/status row "~00155 1" mapped to a=1 Green/Normal, a=2 Orange/Notice, a=3 Red/Warming.
- id: query_led_status
  label: Query LED / Status Indicator
  kind: query
  command: "~xx155 1"  # UNRESOLVED: source row is garbled/ambiguous; opcode and response format not clearly documented
  params: []
```

## Feedbacks
```yaml
- id: set_ack
  type: enum
  values: [P, F]
  description: "SET-command acknowledgement: P=success, F=failed"

- id: power_state
  type: enum
  values: [off, on]
  description: "From query_power: OK0=off, OK1=on"

- id: video_mute_state
  type: enum
  values: [off, on]

- id: mute_state
  type: enum
  values: [off, on]

- id: osd_lock_state
  type: enum
  values: [off, on]

- id: wlan_state
  type: enum
  values: [disconnected, connected]

- id: lan_state
  type: enum
  values: [disconnected, connected]

- id: sound_mode
  type: enum
  values: [Standard, User, Classroom, Meeting, Movie]

- id: picture_mode
  type: enum
  values: [Presentation, Bright, Cinema, User, "DICOM SIM.", HDR]

- id: color_temp
  type: enum
  values: [Standard, Cool, Warm]

- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", PTP]

- id: input_source
  type: enum
  values: [HDMI1, HDMI2, HDMIFront, "USB Type C", DisplayPort, VGA, "Slot in PC", Android]

# UNRESOLVED: numeric feedbacks (volume/brightness/contrast/color/backlight/treble/bass/balance 0-100, usage hours, temperature, firmware version, MAC/IP addresses) are returned as OK<value> strings; model as variables where a tracked-state store is needed.
```

## Variables
```yaml
- id: volume
  type: integer
  range: [0, 100]
  description: "Volume level (opcode 81 set / 120 query)"
- id: brightness
  type: integer
  range: [0, 100]
- id: contrast
  type: integer
  range: [0, 100]
- id: color
  type: integer
  range: [0, 100]
- id: backlight
  type: integer
  range: [0, 100]
- id: treble
  type: integer
  range: [0, 100]
- id: bass
  type: integer
  range: [0, 100]
- id: balance
  type: integer
  range: [0, 100]
- id: usage_hours
  type: integer
  description: "Lamp/panel usage hours (read-only)"
- id: system_temperature
  type: integer
  description: "System temperature, ex. 48 (read-only)"
# UNRESOLVED: units for usage_hours and system_temperature not stated in source
```

## Events
```yaml
# Unsolicited "System Auto send" status messages pushed by the IFP.
- id: info_standby
  type: notification
  payload: "INFO0"
  description: "IFP entered Standby Mode"
- id: info_warming_up
  type: notification
  payload: "INFO1"
  description: "IFP is warming up"
- id: info_cooling_down
  type: notification
  payload: "INFO2"
  description: "IFP is cooling down"
- id: info_over_temperature
  type: notification
  payload: "INFO7"
  description: "Over-temperature warning"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlock procedures or power-on sequencing warnings.
# Note: the IFP does emit an over-temperature notification (INFO7, see Events) but no documented recovery/interlock sequence.
```

## Notes
- **Command frame:** `~<device_id><opcode> <value><CR>`. Lead byte `~` = 0x7E; terminator CR = 0x0D. `<device_id>` is a 2-digit ASCII ID (`xx`); source examples encode it as `00` (bytes `30 30`), and the doc notes `01` selects device ID 01 — useful for daisy-chained/multi-device RS-232.
- **RS-232 pins (IFP side, DB9):** pin 2 = TXD, pin 3 = RXD, pin 5 = GND; all others N/A.
- **Both RS-232 and RJ45 (LAN port 23) accept the same command set** and return the same acknowledgements.
- **Power Mode (Standby) trade-off (from source):**
  - `Active` standby is required for OMS and LAN remote power-on (set_power opcode 00 → on). Active standby consumes more power (backlight off, mainboard awake).
  - `Eco` standby is required for Wake-on-LAN; WoL is greyed out when Power Mode (Standby) = Active.
- **SET acknowledgement:** ASCII `P` = success, `F` = failed. **GET** responses are `OK<value>` (success) or `F` (failed).
- **OSD lock password** is a 4-digit value 0000–9999 encoded as `a` in the frame (e.g. 0000 → `7E 30 30 30 30`, 9999 → `7E 39 39 39 39`).
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: maximum command rate / inter-command delay not stated. -->
<!-- UNRESOLVED: precise WoL packet format not documented here. -->
<!-- UNRESOLVED: the "~00155 1" LED-status row and Note*1 info-string sub-field codes are partially ambiguous in the source. -->
````

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/c19f3412-7e82-4032-a4c1-c7ae9ec8aecf.pdf
retrieved_at: 2026-07-14T18:18:45.662Z
last_checked_at: 2026-07-22T00:15:42.816Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:15:42.816Z
matched_actions: 46
action_count: 46
confidence: medium
summary: "All 46 spec actions matched verbatim in source; every transport parameter (9600/8/N/1, port 23, TCP, serial, no auth) verified in source tables. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic IFP RS232 protocol sheet; it does not state firmware version, power/voltage/current specs, or model-specific exclusions. Wake-on-LAN behaviour and OMS remote power-on depend on Power Mode (Standby) = Active (see Notes)."
- "source row is garbled/ambiguous; opcode and response format not clearly documented"
- "numeric feedbacks (volume/brightness/contrast/color/backlight/treble/bass/balance 0-100, usage hours, temperature, firmware version, MAC/IP addresses) are returned as OK<value> strings; model as variables where a tracked-state store is needed."
- "units for usage_hours and system_temperature not stated in source"
- "no explicit multi-step sequences described in source."
- "source contains no explicit safety interlock procedures or power-on sequencing warnings."
- "firmware version compatibility range not stated."
- "maximum command rate / inter-command delay not stated."
- "precise WoL packet format not documented here."
- "the \"~00155 1\" LED-status row and Note*1 info-string sub-field codes are partially ambiguous in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
