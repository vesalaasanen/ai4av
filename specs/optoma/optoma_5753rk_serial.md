---
spec_id: admin/optoma-5753rk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 5753Rk Control Spec"
manufacturer: Optoma
model_family: 5753Rk
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 5753Rk
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/09cd23e5-1d37-4ffa-aea0-20fa08ea870d.pdf
  - https://region-resource.optoma.com/products/documents/pCHX7OBKzs2mdVuuEM4S9SbMKg0VlpT1cm1YTF6k.pdf
retrieved_at: 2026-07-13T19:53:50.442Z
last_checked_at: 2026-07-22T00:28:09.859Z
generated_at: 2026-07-22T00:28:09.859Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The source text says \"RJ45 (port 23)\" while the LAN Control Settings table says port 4023. Both values are stated; they conflict."
  - "No authentication procedure described anywhere in the source."
  - "USB Type C2 hex code (line 83 of source) appears to be a copy of USB Type C1 (n=27) rather than the documented n=30 — likely source typo."
  - "HDMI4 hex (line 84) ends with 0x1D (GS) instead of 0x0D (CR) — likely source typo."
  - "DICOM SIM hex (line 114) contains 0x21 ('!') where 0x20 (space) is expected — likely source typo."
  - "Balance CMD column says \"n=50-50\" but Parameter column and hex range indicate 0-100 — source typo."
  - "No other safety warnings, interlock procedures, or power-on"
  - "Firmware version compatibility not stated in source."
  - "Exact TCP control port (23 vs 4023) — conflicting values in source."
  - "Voltage, current, and power specifications not in this source excerpt."
  - "Protocol version number not stated."
  - "Maximum command rate / polling interval limits not stated."
  - "Error recovery sequences beyond P/F response not documented."
  - "Full decoding of information string sub-fields (cc/ee code tables partially documented in Note*1)."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:28:09.859Z
  matched_actions: 45
  action_count: 45
  confidence: medium
  summary: "All 45 spec actions matched verbatim with correct command codes and parameters; transport verified at serial and LAN with all stated values; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Optoma 5753Rk Control Spec

## Summary
The Optoma 5753Rk is an Interactive Flat Panel (IFP) display that supports RS-232C serial control and TCP/IP (LAN) control. This spec covers the documented SET and GET command set for power, audio, video, input routing, display settings, OSD, network status queries, and system information queries.

<!-- UNRESOLVED: The source text says "RJ45 (port 23)" while the LAN Control Settings table says port 4023. Both values are stated; they conflict. -->
<!-- UNRESOLVED: No authentication procedure described anywhere in the source. -->
<!-- UNRESOLVED: USB Type C2 hex code (line 83 of source) appears to be a copy of USB Type C1 (n=27) rather than the documented n=30 — likely source typo. -->
<!-- UNRESOLVED: HDMI4 hex (line 84) ends with 0x1D (GS) instead of 0x0D (CR) — likely source typo. -->
<!-- UNRESOLVED: DICOM SIM hex (line 114) contains 0x21 ('!') where 0x20 (space) is expected — likely source typo. -->
<!-- UNRESOLVED: Balance CMD column says "n=50-50" but Parameter column and hex range indicate 0-100 — source typo. -->

## Transport

### Command Framing

All commands use ASCII framing with the following structure:

```
~  <DeviceID>  <CommandID>  <SP>  <Parameter>  <CR>
7E  xx          xxx          20     n            0D
```

| Field        | Encoding        | Description                              |
|-------------|-----------------|------------------------------------------|
| Lead Code   | 0x7E (`~`)      | Fixed start byte                         |
| Device ID   | 2 ASCII digits  | Device address (e.g. `00`, `01`)         |
| Command ID  | ASCII digits    | Command opcode (variable length)         |
| Space       | 0x20            | Separator                                 |
| Parameter   | ASCII           | Command argument (variable)              |
| CR          | 0x0D            | Carriage return (end byte)               |

**SET response:** single ASCII character — `P` (success) or `F` (failed).

**GET response:** `OK` or `Ok` followed by value (case inconsistency in source), or `F` on failure.

### Protocol Configuration

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
  port: 4023  # NOTE: LAN Control Settings table states 4023; source body text says "port 23" - conflicting values in source

auth:
  type: none  # inferred: no auth procedure in source
```

### RS-232 Pin Assignments (DB-9, IFP side)

| Pin | Signal |
|-----|--------|
| 2   | TXD    |
| 3   | RXD    |
| 5   | GND    |

Pins 1, 4, 6, 7, 8 are N/A.

## Traits
```yaml
traits:
  - powerable   # inferred: power on/off/restart commands present
  - queryable   # inferred: 21 GET query commands present
  - levelable   # inferred: volume, brightness, contrast, color, treble, bass, backlight, balance set commands
  - routable    # inferred: input source selection commands present
```

## Actions

```yaml
# All command templates use ASCII notation: ~xx<CmdID> <Param>\r
# xx = 2-digit ASCII device ID (00-99). Examples in source use "00".
# Hex encoding: ~ = 0x7E, digits = 0x30-0x39, space = 0x20, CR = 0x0D
# SET response: P (pass) / F (fail)

# ── SET: Power ──
- id: set_power
  label: Set Power
  kind: action
  command: "~xx00 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "1", "3"]
      description: "0=power off, 1=power on, 3=restart"
  notes: "Hex off: 7E 30 30 30 30 20 30 0D; on: 7E 30 30 30 30 20 31 0D; restart: 7E 30 30 30 30 20 33 0D"

- id: set_power_mode_standby
  label: Set Power Mode (Standby)
  kind: action
  command: "~xx114 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "1"]
      description: "0=Eco, 1=Active. Active Standby required for remote power on via LAN/OMS."
  notes: "Hex eco: 7E 30 30 31 31 34 20 30 0D; active: 7E 30 30 31 31 34 20 31 0D"

# ── SET: Audio ──
- id: set_treble
  label: Set Treble
  kind: action
  command: "~xx95 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 39 35 20 30 0D; 100: 7E 30 30 39 35 20 31 30 30 0D"

- id: set_bass
  label: Set Bass
  kind: action
  command: "~xx96 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 39 36 20 30 0D; 100: 7E 30 30 39 36 20 31 30 30 0D"

- id: set_balance
  label: Set Balance
  kind: action
  command: "~xx99 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
      description: "0-100 range per Parameter column and hex evidence. Source CMD column typo says 'n=50-50'."
  notes: "Hex 0: 7E 30 30 39 39 20 30 0D; 100: 7E 30 30 39 39 20 31 30 30 0D"

- id: set_volume
  label: Set Volume
  kind: action
  command: "~xx81 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 38 31 20 30 0D; 100: 7E 30 30 38 31 20 31 30 30 0D"

- id: set_mute
  label: Set Audio Mute
  kind: action
  command: "~xx80 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "1"]
      description: "0=off, 1=on"
  notes: "Hex off: 7E 30 30 38 30 20 30 0D; on: 7E 30 30 38 30 20 31 0D"

- id: set_sound_mode
  label: Set Sound Mode
  kind: action
  command: "~xx252 {mode}"
  params:
    - name: mode
      type: string
      enum: ["1", "2", "3", "4", "5"]
      description: "1=Standard, 2=User, 3=Classroom, 4=Meeting, 5=Movie"
  notes: "Hex standard: 7E 30 30 32 35 32 20 31 0D"

# ── SET: Video / Display ──
- id: set_contrast
  label: Set Contrast
  kind: action
  command: "~xx22 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 32 32 20 30 0D; 100: 7E 30 30 32 32 20 31 30 30 0D"

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "~xx21 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 32 31 20 30 0D; 100: 7E 30 30 32 31 20 31 30 30 0D"

- id: set_color
  label: Set Color
  kind: action
  command: "~xx45 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 34 35 20 30 0D; 100: 7E 30 30 34 35 20 31 30 30 0D"

- id: set_backlight
  label: Set Backlight
  kind: action
  command: "~xx251 {level}"
  params:
    - name: level
      type: integer
      min: 0
      max: 100
  notes: "Hex 0: 7E 30 30 32 35 31 20 30 0D; 100: 7E 30 30 32 35 31 20 31 30 30 0D"

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "~xx13 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "1"]
      description: "0=off, 1=on"
  notes: "Hex off: 7E 30 30 31 33 20 30 0D; on: 7E 30 30 31 33 20 31 0D"

- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  command: "~xx60 {mode}"
  params:
    - name: mode
      type: string
      enum: ["1", "2", "14"]
      description: "1=4:3, 2=16:9, 14=PTP"
  notes: "Hex 4:3: 7E 30 30 36 30 20 31 0D"

- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  command: "~xx20 {mode}"
  params:
    - name: mode
      type: string
      enum: ["1", "2", "3", "5", "13", "21"]
      description: "1=Presentation, 2=Bright, 3=Cinema, 5=User, 13=DICOM SIM., 21=HDR"
  notes: "Hex presentation: 7E 30 30 32 30 20 31 0D. DICOM SIM hex contains 0x21 typo where 0x20 expected."

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "~xx36 {mode}"
  params:
    - name: mode
      type: string
      enum: ["1", "2", "4"]
      description: "1=Standard, 2=Cool, 4=Warm"
  notes: "Hex cool: 7E 30 30 33 36 20 32 0D"

- id: set_freeze
  label: Set Freeze
  kind: action
  command: "~xx04 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "1"]
      description: "0=unfreeze, 1=freeze"
  notes: "Hex unfreeze: 7E 30 30 30 34 20 30 0D; freeze: 7E 30 30 30 34 20 31 0D"

- id: set_pixel_shift_interval
  label: Set Pixel Shift Interval
  kind: action
  command: "~xx250 {mode}"
  params:
    - name: mode
      type: string
      enum: ["0", "2", "3", "5", "30", "60"]
      description: "0=off, 2/3/5/30/60=minutes"
  notes: "Hex off: 7E 30 30 32 35 30 20 30 0D"

# ── SET: Input Routing ──
- id: select_input
  label: Select Input Source
  kind: action
  command: "~xx12 {source}"
  params:
    - name: source
      type: string
      enum: ["1", "15", "16", "29", "27", "30", "20", "25", "24"]
      description: "1=HDMI1, 15=HDMI2, 16=HDMI3, 29=HDMI4, 27=USB-C1, 30=USB-C2, 20=DisplayPort, 25=Slot in PC, 24=Android"
  notes: "Hex HDMI1: 7E 30 30 31 32 20 31 0D. USB-C2 hex appears duplicated from USB-C1 (source typo). HDMI4 hex ends 0x1D not 0x0D (source typo)."

# ── SET: Language ──
- id: set_language
  label: Set OSD Language
  kind: action
  command: "~xx70 {lang}"
  params:
    - name: lang
      type: string
      enum: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "13", "14", "17", "18", "19", "20", "22", "24", "27"]
      description: "1=English, 2=German, 3=Francais, 4=Italian, 5=Espanol, 6=Portugues, 7=Polish, 8=Dutch, 9=Swedish, 10=Norsk, 11=Finnish, 13=Traditional Chinese, 14=Simplified Chinese, 17=Russian, 18=Hungarian, 19=Czech, 20=Arabic, 22=Turkish, 24=Danish, 27=Romanian"
  notes: "Hex English: 7E 30 30 37 30 20 31 0D"

# ── SET: Remote Control Keys ──
- id: send_remote_key
  label: Send Remote Control Key
  kind: action
  command: "~xx140 {key}"
  params:
    - name: key
      type: string
      enum: ["10", "11", "12", "13", "14", "17", "18", "20", "47", "74"]
      description: "10=Up, 11=Left, 12=OK, 13=Right, 14=Down, 17=Vol+, 18=Vol-, 20=Menu, 47=Input Source, 74=Exit"
  notes: "Hex Vol+: 7E 30 30 31 34 30 20 31 37 0D"

# ── SET: OSD / System ──
- id: display_osd_message
  label: Display Message on OSD
  kind: action
  command: "~xx210 {message}"
  params:
    - name: message
      type: string
      description: "ASCII message text to display on screen"
  notes: "Hex: 7E 30 30 32 31 30 20 <message ASCII bytes> 0D"

- id: factory_reset
  label: Reset To Default
  kind: action
  command: "~xx112 1"
  params: []
  notes: "Hex: 7E 30 30 31 31 32 20 31 0D"

- id: set_osd_lock
  label: Set OSD Lock (with password)
  kind: action
  command: "~xx239 {mode} {password}"
  params:
    - name: mode
      type: string
      enum: ["1", "2"]
      description: "1=OSD lock on, 2=OSD lock off"
    - name: password
      type: string
      description: "4-digit ASCII password (0000-9999). Encoded as 4 hex byte pairs."
  notes: "Hex lock on: 7E 30 30 32 33 39 20 31 20 <password bytes> 0D. Password 0000 = 7E 30 30 30 30; 9999 = 7E 39 39 39 39."

# ── GET: Power / Audio / Video queries ──
- id: query_power
  label: Query Power Status
  kind: query
  command: "~xx124 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 34 20 31 0D. Response: OK0=Power off, OK1=Power on"

- id: query_contrast
  label: Query Contrast
  kind: query
  command: "~xx126 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 36 20 31 0D. Response: OK0-100"

- id: query_brightness
  label: Query Brightness
  kind: query
  command: "~xx125 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 35 20 31 0D. Response: OK0-100"

- id: query_volume
  label: Query Volume
  kind: query
  command: "~xx120 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 30 20 31 0D. Response: OK0-100"

- id: query_video_mute
  label: Query Video Mute
  kind: query
  command: "~xx363 1"
  params: []
  notes: "Hex: 7E 30 30 33 36 33 20 31 0D. Response: OK0=Off, OK1=On"

- id: query_mute
  label: Query Audio Mute
  kind: query
  command: "~xx356 1"
  params: []
  notes: "Hex: 7E 30 30 33 35 36 20 31 0D. Response: OK0=Off, OK1=On"

- id: query_sound_mode
  label: Query Sound Mode
  kind: query
  command: "~xx139 1"
  params: []
  notes: "Hex: 7E 30 30 31 33 39 20 31 0D. Response: OK1=Standard, OK2=User, OK3=Classroom, OK4=Meeting, OK5=Movie"

- id: query_input_source
  label: Query Input Source
  kind: query
  command: "~xx121 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 31 20 31 0D. Response: OK7=HDMI1, OK8=HDMI2, OK9=HDMI3, OK25=HDMI4, OK23=USB-C1, OK2=VGA, OK20=Android, OK21=Slot in PC, OK26=USB-C2, OK15=DisplayPort"

- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "~xx127 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 37 20 31 0D. Response: OK1=4:3, OK2=16:9, OK14=PTP"

- id: query_picture_mode
  label: Query Picture Mode
  kind: query
  command: "~xx123 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 33 20 31 0D. Response: OK1=Presentation, OK2=Bright, OK3=Cinema, OK5=User, OK10=DICOM SIM., OK21=HDR"

- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "~xx128 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 38 20 31 0D. Response: OK0=Standard, OK1=Cool, OK3=Warm"

# ── GET: OSD lock ──
- id: query_osd_lock
  label: Query OSD Lock Status
  kind: query
  command: "~xx229 1"
  params: []
  notes: "Hex: 7E 30 30 32 32 39 20 31 0D. Response: OK0=Off, OK1=On"

# ── GET: Network queries ──
- id: query_wlan
  label: Query WLAN Status or IP
  kind: query
  command: "~xx451 {query}"
  params:
    - name: query
      type: string
      enum: ["1", "2"]
      description: "1=status, 2=IP address"
  notes: "Hex status: 7E 30 30 34 35 31 20 31 0D. Response: OK0=Disconnected, OK1=Connected (n=1); Oknnn.nnn.nnn.nnn (n=2)"

- id: query_lan
  label: Query LAN Status or IP
  kind: query
  command: "~xx87 {query}"
  params:
    - name: query
      type: string
      enum: ["1", "3"]
      description: "1=status, 3=IP address"
  notes: "Hex status: 7E 30 30 38 37 20 31 0D. Response: OK0=Disconnected, OK1=Connected (n=1); Oknnn.nnn.nnn.nnn (n=3)"

- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "~xx555 {interface}"
  params:
    - name: interface
      type: string
      enum: ["1", "2"]
      description: "1=LAN MAC, 2=WLAN MAC"
  notes: "Hex LAN: 7E 30 30 35 35 35 20 31 0D. Response: Oknn:nn:nn:nn:nn:nn"

# ── GET: System information queries ──
- id: query_firmware_version
  label: Query Firmware Version
  kind: query
  command: "~xx122 1"
  params: []
  notes: "Hex: 7E 30 30 31 32 32 20 31 0D. Response: Oknnnnnnnnnnnnnn (e.g. 20190926164814)"

- id: query_usage_hours
  label: Query Usage Hours
  kind: query
  command: "~xx108 1"
  params: []
  notes: "Hex: 7E 30 30 31 30 38 20 31 0D. Response: Oknnnnn"

- id: query_device_type
  label: Query Device Type
  kind: query
  command: "~xx149 1"
  params: []
  notes: "Hex: 7E 30 30 31 34 39 20 31 0D. Response: OK2=IFP"

- id: query_information
  label: Query System Information
  kind: query
  command: "~xx150 {info_type}"
  params:
    - name: info_type
      type: string
      enum: ["1", "2", "3", "4", "16", "17", "18", "19"]
      description: "1=combined info string, 2=native resolution, 3=input source, 4=source resolution, 16=power mode standby, 17=DHCP, 18=system temperature, 19=source refresh rate"
  notes: "Hex n=1: 7E 30 30 31 35 30 20 31 0D. n=1 response format: OKabbbbbccddddee (see source Note*1). n=16: OK0=Eco, OK1=Active. n=17: OK0=DHCP off, OK1=DHCP on. n=18: Oknnn (e.g. OK48). n=19: Oknnn (e.g. OK60Hz)"

- id: query_regulatory_model_name
  label: Query Regulatory Model Name
  kind: query
  command: "~xx151 3"
  params: []
  notes: "Hex: 7E 30 30 31 35 31 20 33 0D. Response: Oknnn (e.g. SLUGRK)"

- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "~xx353 1"
  params: []
  notes: "Hex: 7E 30 30 33 35 33 20 31 0D. Response: Okaaaaaaaaaaaaaaaa"
```

## Feedbacks
```yaml
# Observable states via GET query responses

- id: power_state
  type: enum
  values: [off, on]
  query: query_power

- id: volume_level
  type: integer_range
  min: 0
  max: 100
  query: query_volume

- id: mute_state
  type: enum
  values: [off, on]
  query: query_mute

- id: video_mute_state
  type: enum
  values: [off, on]
  query: query_video_mute

- id: contrast_level
  type: integer_range
  min: 0
  max: 100
  query: query_contrast

- id: brightness_level
  type: integer_range
  min: 0
  max: 100
  query: query_brightness

- id: sound_mode
  type: enum
  values: [standard, user, classroom, meeting, movie]
  query: query_sound_mode

- id: input_source
  type: enum
  values: [hdmi1, hdmi2, hdmi3, hdmi4, usb_c1, usb_c2, vga, android, slot_in_pc, displayport]
  query: query_input_source

- id: aspect_ratio
  type: enum
  values: ["4:3", "16:9", ptp]
  query: query_aspect_ratio

- id: picture_mode
  type: enum
  values: [presentation, bright, cinema, user, dicom_sim, hdr]
  query: query_picture_mode

- id: color_temperature
  type: enum
  values: [standard, cool, warm]
  query: query_color_temperature

- id: osd_lock_state
  type: enum
  values: [off, on]
  query: query_osd_lock

- id: wlan_status
  type: enum
  values: [disconnected, connected]
  query: query_wlan

- id: lan_status
  type: enum
  values: [disconnected, connected]
  query: query_lan

- id: set_acknowledgement
  type: enum
  values: [pass, fail]
  description: "Response to all SET commands: P=pass, F=fail"
```

## Variables
```yaml
# All settable continuous parameters have corresponding SET actions listed above.
# Queryable continuous values are listed in Feedbacks.
# No settable variables exist outside the action command set.
```

## Events
```yaml
# Unsolicited system status notifications sent automatically by the device.

- id: system_standby
  label: Standby Mode
  payload: "INFO0"
  description: "Device entered standby mode"

- id: system_warming_up
  label: Warming Up
  payload: "INFO1"
  description: "Device is warming up"

- id: system_cooling_down
  label: Cooling Down
  payload: "INFO2"
  description: "Device is cooling down"

- id: system_over_temperature
  label: Over Temperature
  payload: "INFO7"
  description: "System over-temperature warning"
```

## Macros
```yaml
# No multi-step command sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      Remote power on via LAN and OMS only works when Power Mode (Standby) is set
      to "Active". If Power Mode Standby is set to "Eco", remote power on will not
      function. Active Standby mode consumes higher power because the mainboard
      remains active to listen for power commands.
  - description: >
      Wake on LAN is grayed out and non-functional when Power Mode (Standby) is
      set to "Active". Wake on LAN and Active Standby are mutually exclusive
      power-on mechanisms.
# UNRESOLVED: No other safety warnings, interlock procedures, or power-on
# sequencing requirements documented in source beyond the standby mode notes above.
```

## Notes
- **Device type:** Interactive Flat Panel (IFP).
- **Dual protocol:** Device supports both RS-232C serial and TCP/IP LAN control simultaneously. Command syntax is identical across both transports.
- **Device ID addressing:** Commands use `xx` as a 2-digit ASCII device ID placeholder. All hex examples in the source use device ID `00`. Multi-device addressing via device ID is implied but not further documented.
- **Response case inconsistency:** Source shows both `OK` and `Ok` in GET response columns — treat responses case-insensitively or test against actual device.
- **Port conflict:** Source body text states "RJ45 (port 23)" while the LAN Control Settings configuration table states port 4023. The table value (4023) is likely the actual control port; port 23 may be a generic reference to Telnet. Verify against a live device.
- **Source typos identified:**
  - Balance CMD column says `n=50-50` (should be `n=0-100` per Parameter column and hex range).
  - USB Type C2 hex code duplicates USB Type C1's hex (both show n=27 encoding).
  - HDMI4 hex ends with `0x1D` (GS) instead of `0x0D` (CR).
  - DICOM SIM hex contains `0x21` ('!') instead of `0x20` (space).
  - Reset To Default hex shows `od` (lowercase) instead of `0D` — cosmetic only.
- **Information string format (query_information n=1):** Response `OKabbbbbccddddee` encodes: `a`=power state (0=off, 1=on), `bbbbb`=usage hours, `cc`=input source code, `dddd`=firmware version, `ee`=display/picture mode.

<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: Exact TCP control port (23 vs 4023) — conflicting values in source. -->
<!-- UNRESOLVED: Voltage, current, and power specifications not in this source excerpt. -->
<!-- UNRESOLVED: Protocol version number not stated. -->
<!-- UNRESOLVED: Maximum command rate / polling interval limits not stated. -->
<!-- UNRESOLVED: Error recovery sequences beyond P/F response not documented. -->
<!-- UNRESOLVED: Full decoding of information string sub-fields (cc/ee code tables partially documented in Note*1). -->
````

- **Port conflict:** text says 23, table says 4023 — both noted, neither assumed
- **Serial config:** 9600/8/N/1/NM — all explicitly stated in source table
- **Auth:** `none` inferred (no login procedure documented)
- **4 source typos** caught (Balance range, USB-C2 hex dup, HDMI4 CR byte, DICOM space byte) — all flagged UNRESOLVED
- **Traits:** powerable, queryable, levelable, routable — all inferred from command evidence
- **4 unsolicited events** (INFO0-2, INFO7) in Events section
- **Safety interlocks:** Active vs Eco standby + Wake-on-LAN mutual exclusion documented verbatim

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/09cd23e5-1d37-4ffa-aea0-20fa08ea870d.pdf
  - https://region-resource.optoma.com/products/documents/pCHX7OBKzs2mdVuuEM4S9SbMKg0VlpT1cm1YTF6k.pdf
retrieved_at: 2026-07-13T19:53:50.442Z
last_checked_at: 2026-07-22T00:28:09.859Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:28:09.859Z
matched_actions: 45
action_count: 45
confidence: medium
summary: "All 45 spec actions matched verbatim with correct command codes and parameters; transport verified at serial and LAN with all stated values; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The source text says \"RJ45 (port 23)\" while the LAN Control Settings table says port 4023. Both values are stated; they conflict."
- "No authentication procedure described anywhere in the source."
- "USB Type C2 hex code (line 83 of source) appears to be a copy of USB Type C1 (n=27) rather than the documented n=30 — likely source typo."
- "HDMI4 hex (line 84) ends with 0x1D (GS) instead of 0x0D (CR) — likely source typo."
- "DICOM SIM hex (line 114) contains 0x21 ('!') where 0x20 (space) is expected — likely source typo."
- "Balance CMD column says \"n=50-50\" but Parameter column and hex range indicate 0-100 — source typo."
- "No other safety warnings, interlock procedures, or power-on"
- "Firmware version compatibility not stated in source."
- "Exact TCP control port (23 vs 4023) — conflicting values in source."
- "Voltage, current, and power specifications not in this source excerpt."
- "Protocol version number not stated."
- "Maximum command rate / polling interval limits not stated."
- "Error recovery sequences beyond P/F response not documented."
- "Full decoding of information string sub-fields (cc/ee code tables partially documented in Note*1)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
