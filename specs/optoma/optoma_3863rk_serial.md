---
spec_id: admin/optoma-3863rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 3863Rk Control Spec"
manufacturer: Optoma
model_family: 3863Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 3863Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web-resource.optoma.com
source_urls:
  - "https://web-resource.optoma.com/IFP33/User%20Manual-en.pdf"
retrieved_at: 2026-07-13T19:46:47.435Z
last_checked_at: 2026-07-22T00:20:39.148Z
generated_at: 2026-07-22T00:20:39.148Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source mentions \"port 23\" in the header note but the LAN Control Settings table lists Port 4023 — conflicting; 4023 used below as the detailed setting. Power/electrical specs not in source."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "port conflict (23 vs 4023); electrical/power specs not in source; firmware compatibility range not stated; auth/token format not documented (assumed none)."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:20:39.148Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match verbatim commands in the source; transport parameters verified; parameter ranges and enum values all correct. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Optoma 3863Rk Control Spec

## Summary
Optoma 3863Rk is an IFP (Interactive Flat Panel) display controllable via RS-232C (DB9, pins 2/3/5) and RJ45 LAN. This spec covers the RS-232 serial command set and the LAN control commands documented in the vendor RS232 Protocol Function List, including power, picture, audio, input source, OSD, and status query commands.

<!-- UNRESOLVED: source mentions "port 23" in the header note but the LAN Control Settings table lists Port 4023 — conflicting; 4023 used below as the detailed setting. Power/electrical specs not in source. -->

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
  port: 4023  # from LAN Control Settings table; header note also says "port 23" - conflicting
auth:
  type: none  # inferred: no auth procedure in source
```

Command framing (from source): `~` lead code + `xx` Device ID (default 01) + `NNN` command + space + `n` variable + `CR` (0x0D). Hex payloads in source use device ID `01` (ASCII `30 30`). Example: `~0030 1` = `7E 30 30 30 30 20 31 0d` (power on).

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/restart commands present
  - queryable    # inferred: extensive GET command set present
  - levelable    # inferred: volume, brightness, contrast, treble, bass, color, backlight ranges
  - routable     # inferred: input source selection commands present
```

## Actions
```yaml
# Command format: ~xxNNN n  (xx = Device ID, default 01; NNN = command code; n = parameter; CR terminator)
# Hex column is the verbatim device-ID-01 payload from source. ASCII command uses ~xx placeholder.

# --- Power ---
- id: set_power
  label: Set Power
  kind: action
  command: "~xx00 n"
  params:
    - name: n
      type: integer
      enum: [0, 1, 3]
      description: "0=Power off, 1=Power on, 3=Restart"
  notes: "Hex (n=0): 7E 30 30 30 30 20 30 0d | (n=1): 7E 30 30 30 30 20 31 0d | (n=3): 7E 30 30 30 30 20 33 0d"

- id: set_power_mode_standby
  label: Set Power Mode (Standby)
  kind: action
  command: "~xx114 n"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0=Eco, 1=Active"
  notes: "Hex (n=0): 7E 30 30 31 31 34 20 30 0d | (n=1): 7E 30 30 31 31 34 20 31 0d"

# --- Audio levels ---
- id: set_treble
  label: Set Treble
  kind: action
  command: "~xx95 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 39 35 20 30 0d to 7E 30 30 39 35 20 31 30 30 0d"

- id: set_bass
  label: Set Bass
  kind: action
  command: "~xx96 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 39 36 20 30 0d to 7E 30 30 39 36 20 31 30 30 0d"

- id: set_balance
  label: Set Balance
  kind: action
  command: "~xx99 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Source labels n=50-50; hex range shown 7E 30 30 39 39 20 30 0d to 7E 30 30 39 39 20 31 30 30 0d"

- id: set_volume
  label: Set Volume
  kind: action
  command: "~xx81 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 38 31 20 30 0d to 7E 30 30 38 31 20 31 30 30 0d"

- id: set_mute
  label: Set Mute
  kind: action
  command: "~xx80 n"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
  notes: "Hex (n=0): 7E 30 30 38 30 20 30 0d | (n=1): 7E 30 30 38 30 20 31 0d"

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "~xx13 n"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
  notes: "Hex (n=0): 7E 30 30 31 33 20 30 0d | (n=1): 7E 30 30 31 33 20 31 0d"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "~xx252 n"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5]
      description: "1=Standard, 2=User, 3=Classroom, 4=Meeting, 5=Movie"
  notes: "Hex: 7E 30 30 32 35 32 20 {n} 0d"

# --- Picture ---
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "~xx22 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 32 32 20 30 0d to 7E 30 30 32 32 20 31 30 30 0d"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "~xx21 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 32 31 20 30 0d to 7E 30 30 32 31 20 31 30 30 0d"

- id: set_color
  label: Set Color
  kind: action
  command: "~xx45 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 34 35 20 30 0d to 7E 30 30 34 35 20 31 30 30 0d"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "~xx251 n"
  params:
    - name: n
      type: integer
      range: [0, 100]
  notes: "Hex range: 7E 30 30 32 35 31 20 30 0d to 7E 30 30 32 35 31 20 31 30 30 0d"

- id: set_color_temp
  label: Set Color Temperature
  kind: action
  command: "~xx36 n"
  params:
    - name: n
      type: integer
      enum: [1, 2, 4]
      description: "1=Standard, 2=Cool, 4=Warm"
  notes: "Hex: 7E 30 30 33 36 20 {n} 0d"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "~xx20 n"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 5, 13, 21]
      description: "1=Presentation, 2=Bright, 3=Cinema, 5=User, 13=DICOM SIM., 21=HDR"
  notes: "Hex: 7E 30 30 32 30 20 {n} 0d (DICOM row source shows 21 33 variant: 7E 30 30 32 30 21 33 0d)"

# --- Input source ---
- id: set_input_source
  label: Set Input Source
  kind: action
  command: "~xx12 n"
  params:
    - name: n
      type: integer
      enum: [1, 5, 15, 20, 24, 25, 26, 31, 32]
      description: "1=HDMI1, 5=VGA, 15=HDMI2, 20=DisplayPort, 24=Android, 25=Slot in PC, 26=HDMI Front, 31=Type-C Front, 32=Type-C"
  notes: "Hex: 7E 30 30 31 32 20 {n} 0d"

# --- Language ---
- id: set_language
  label: Set Language
  kind: action
  command: "~xx70 n"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 14, 17, 18, 19, 20, 22, 24, 27]
      description: "1=English,2=German,3=Français,4=Italian,5=Español,6=Português,7=Polish,8=Dutch,9=Swedish,10=Norge,11=Finnish,13=Traditional Chinese,14=Simplified Chinese,17=Russian,18=Hungarian,19=Czech,20=Arabic,22=Turkish,24=Danish,27=Romanian"
  notes: "Hex: 7E 30 30 37 30 20 {n} 0d"

# --- Display control ---
- id: set_freeze
  label: Set Freeze
  kind: action
  command: "~xx04 n"
  params:
    - name: n
      type: integer
      enum: [0, 1]
      description: "0=Unfreeze, 1=Freeze"
  notes: "Hex (n=0): 7E 30 30 30 34 20 30 0d | (n=1): 7E 30 30 30 34 20 31 0d"

- id: set_pixel_shift_interval
  label: Set Pixel Shift Interval
  kind: action
  command: "~xx250 n"
  params:
    - name: n
      type: integer
      enum: [0, 2, 3, 5, 30, 60]
      description: "0=Off, others = minutes"
  notes: "Hex: 7E 30 30 32 35 30 20 {n} 0d"

# --- Remote emulation ---
- id: remote_control_command
  label: Remote Control Command
  kind: action
  command: "~xx140 n"
  params:
    - name: n
      type: integer
      enum: [10, 11, 12, 13, 14, 17, 18, 20, 47, 74]
      description: "10=UP,11=LEFT,12=OK,13=RIGHT,14=DOWN,17=Vol+,18=Vol-,20=Menu Key,47=Input source,74=Exit"
  notes: "Hex: 7E 30 30 31 34 30 20 {n} 0d"

# --- OSD / system ---
- id: display_osd_message
  label: Display Message on OSD
  kind: action
  command: "~xx210 nn...n"
  params:
    - name: message
      type: string
      description: "Message characters nn...n"
  notes: "Hex: 7E 30 30 32 31 30 20 nn...n 0d"

- id: reset_to_default
  label: Reset To Default
  kind: action
  command: "~xx112 1"
  params: []
  notes: "Hex: 7E 30 30 31 31 32 20 31 0d"

- id: set_osd_lock
  label: Set OSD Lock
  kind: action
  command: "~xx239 m a"
  params:
    - name: m
      type: integer
      enum: [1, 2]
      description: "1=OSD lock On with password, 2=OSD lock Off with password"
    - name: a
      type: string
      description: "4-digit password ~0000 to ~9999 (hex 7E 30 30 30 30 to 7E 39 39 39 39)"
  notes: "Hex: 7E 30 30 32 33 39 20 {m} 20 {a} 0d"

# --- Queries (GET commands) ---
- id: query_power
  label: Query Power
  kind: query
  command: "~xx124 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 34 20 31 0D. Response OK0=Power off, OK1=Power on"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~xx126 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 36 20 31 0D. Response OK0-100"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~xx125 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 35 20 31 0D. Response OK0-100"

- id: query_volume
  label: Query Volume
  kind: query
  command: "~xx120 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 30 20 31 0D. Response OK0-100"

- id: query_video_mute
  label: Query Video Mute
  kind: query
  command: "~xx363 1"
  params: []
  notes: "Hex: 7E 30 30 33 36 33 20 31 0D. Response OK0=Off, OK1=On"

- id: query_mute
  label: Query Mute
  kind: query
  command: "~xx356 1"
  params: []
  notes: "Hex: 7E 30 30 33 35 36 20 31 0D. Response OK0=Off, OK1=On"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "~xx139 1"
  params: []
  notes: "Hex: 7E 30 30 31 33 39 20 31 0D. Response OK1=Standard,OK2=User,OK3=Classroom,OK4=Meeting,OK5=Movie"

- id: query_input_source
  label: Query Input Source
  kind: query
  command: "~xx121 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 31 20 31 0D. Response OK2=VGA,OK7=HDMI1,OK8=HDMI2,OK15=DisplayPort,OK20=Android,OK21=Slot in PC,OK22=HDMIFront,OK28=Type-C Front,OK29=Type-C"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~xx127 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 37 20 31 0D. Response OK1=4:3,OK2=16:9,OK14=PTP"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "~xx123 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 33 20 31 0D. Response OK1=Presentation,OK2=Bright,OK3=Cinema,OK5=User,OK10=DICOM SIM.,OK21=HDR"

- id: query_color_temp
  label: Query Color Temp
  kind: query
  command: "~xx128 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 38 20 31 0D. Response OK0=Standard,OK1=Cool,OK3=Warm"

- id: query_wlan_status_or_ip
  label: Query WLAN Status or IP
  kind: query
  command: "~xx451 n"
  params:
    - name: n
      type: integer
      enum: [1, 2]
      description: "1=WLAN status (OK0=Disconnected,OK1=Connected), 2=WLAN IP address"
  notes: "Hex (n=1): 7E 30 30 34 35 31 20 31 0D | (n=2): 7E 30 30 34 35 31 20 32 0D"

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "~xx555 n"
  params:
    - name: n
      type: integer
      enum: [1, 2]
      description: "1=LAN MAC, 2=WLAN MAC. Response Oknn:nn:nn:nn:nn:nn"
  notes: "Hex (n=1): 7E 30 30 35 35 35 20 31 0D | (n=2): 7E 30 30 35 35 35 20 32 0D"

- id: query_lan_status_or_ip
  label: Query LAN Status or IP
  kind: query
  command: "~xx87 n"
  params:
    - name: n
      type: integer
      enum: [1, 3]
      description: "1=LAN status (OK0=Disconnected,OK1=Connected), 3=LAN IP address"
  notes: "Hex (n=1): 7E 30 30 38 37 20 31 0D | (n=3): 7E 30 30 38 37 20 33 0D"

- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "~xx122 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 32 20 31 0D. Response Oknnnnnnnnnnnnnn (ex. 20190926164814)"

- id: query_usage_hour
  label: Query Usage Hour
  kind: query
  command: "~xx108 1"
  params: []
  notes: "Hex: 7E 30 30 31 30 38 20 31 0D. Response Oknnnnn (usage hours)"

- id: query_device_type
  label: Query Device Type
  kind: query
  command: "~xx149 1"
  params: []
  notes: "Hex: 7E 30 30 31 34 39 20 31 0D. Response OK2=IFP"

- id: query_information_string
  label: Query Information String
  kind: query
  command: "~xx150 n"
  params:
    - name: n
      type: integer
      enum: [1, 2, 3, 4, 16, 17, 18, 19]
      description: "1=info string (power/runtime/source/FW/mode), 2=native resolution, 3=input source, 4=source resolution, 16=power mode standby (OK0=Eco/OK1=Active), 17=DHCP (OK0=Off/OK1=On), 18=system temperature, 19=source refresh rate"
  notes: "Hex: 7E 30 30 31 35 30 20 {n} 0D. n=1 response format: OKabbbbbccddddee (see Note*1)"

- id: query_regulatory_model_name
  label: Query Regulatory Model Name
  kind: query
  command: "~xx151 3"
  params: []
  notes: "Hex: 7E 30 30 31 35 31 20 33 0d. Response Oknnn (ex. SLUGRK)"

- id: query_osd_lock
  label: Query OSD Lock
  kind: query
  command: "~xx229 1"
  params: []
  notes: "Hex: 7E 30 30 32 32 39 20 31 0D. Response OK0=Off, OK1=On"

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "~xx353 1"
  params: []
  notes: "Hex: 7E 30 30 33 35 33 20 31 0D. Response Okaaaaaaaaaaaaaaaa (serial string)"
```

## Feedbacks
```yaml
feedbacks:
  - id: set_ack
    type: enum
    values: ["P", "F"]
    description: "SET command acknowledgement: P=Success, F=Failed"
  - id: get_status
    type: string
    description: "GET command response: OK<string> on success, F on failure"
  - id: system_info
    type: enum
    values: ["INFO0", "INFO1", "INFO2", "INFO7"]
    description: "Unsolicited system status: INFO0=Standby, INFO1=Warming up, INFO2=Cooling down, INFO7=Over temperature"
  - id: led_indicator
    type: enum
    values: ["solid_red", "solid_white", "flash_white"]
    description: "Power LED: Solid Red=Standby, Solid White=Power on, Flash White continuously=Backlight off"
```

## Variables
```yaml
# Discrete settable ranges are represented as parameterized Actions above (volume,
# brightness, contrast, color, backlight, treble, bass, balance). No additional
# non-action variables documented.
```

## Events
```yaml
events:
  - id: system_auto_send_standby
    description: "Unsolicited: device entered Standby Mode"
    payload: "INFO0"
  - id: system_auto_send_warming_up
    description: "Unsolicited: device warming up"
    payload: "INFO1"
  - id: system_auto_send_cooling_down
    description: "Unsolicited: device cooling down"
    payload: "INFO2"
  - id: system_auto_send_over_temperature
    description: "Unsolicited: over-temperature condition"
    payload: "INFO7"
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements. Over-temperature event (INFO7) is reported
# but no recovery procedure documented.
```

## Notes
- Command framing: lead `~` (0x7E) + Device ID `xx` (ASCII, default `01`) + command code + space (0x20) + parameter + CR (0x0D).
- RS-232 DB9 pinout (from IFP side): pin 2=TXD, pin 3=RXD, pin 5=GND; all others N/A.
- Both RS-232 and RJ45 (LAN) control supported. Source header says "RJ45 (port 23)" but the LAN Control Settings table states Port 4023 — **conflicting values**; 4023 used in Transport as the detailed setting. Verify against device.
- Balance row labelled "n=50-50" in source (likely a typo for 0-100); hex range confirms 0 to 100.
- DICOM SIM. picture mode hex row shows `7E 30 30 32 30 21 33 0d` (space byte 0x21 instead of 0x20) — possible source typo; other picture-mode rows use 0x20.
- "Suage hours" in source GET table is a typo for "Usage hours".
<!-- UNRESOLVED: port conflict (23 vs 4023); electrical/power specs not in source; firmware compatibility range not stated; auth/token format not documented (assumed none). -->

## Provenance

```yaml
source_domains:
  - web-resource.optoma.com
source_urls:
  - "https://web-resource.optoma.com/IFP33/User%20Manual-en.pdf"
retrieved_at: 2026-07-13T19:46:47.435Z
last_checked_at: 2026-07-22T00:20:39.148Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:20:39.148Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match verbatim commands in the source; transport parameters verified; parameter ranges and enum values all correct. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source mentions \"port 23\" in the header note but the LAN Control Settings table lists Port 4023 — conflicting; 4023 used below as the detailed setting. Power/electrical specs not in source."
- "source contains no explicit safety warnings, interlock procedures,"
- "port conflict (23 vs 4023); electrical/power specs not in source; firmware compatibility range not stated; auth/token format not documented (assumed none)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
