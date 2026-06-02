---
spec_id: admin/samsung-syncmaster-xxxdx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Samsung SyncMaster Multiple Display Control Protocol"
manufacturer: Samsung
model_family: "SyncMaster 320DX"
aliases: []
compatible_with:
  manufacturers:
    - Samsung
  models:
    - "SyncMaster 320DX"
    - "SyncMaster 400DX"
    - "SyncMaster 400DXn"
    - "SyncMaster 460DX"
    - "SyncMaster 460DXn"
    - "SyncMaster 700DX"
    - "SyncMaster 700DXn"
    - "SyncMaster 820DX"
    - "SyncMaster 820DXn"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - archive.org
  - gist.github.com
  - justaddpower.happyfox.com
source_urls:
  - https://archive.org/download/manualzz-id-1101434/1101434.pdf
  - https://gist.github.com/paltaio-admin/0c6ca6c2a5210684fb6a81cbc913feeb
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c/
retrieved_at: 2026-05-15T06:35:46.440Z
last_checked_at: 2026-06-01T21:44:40.792Z
generated_at: 2026-06-01T21:44:40.792Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete broadcast/ID-encoding behavior is not fully consistent in the source. Per Section 1.2: \"ID 0 should be 0xFF\", while 0xFE is described as \"broadcast, no ACK\". Operationally these overlap. The verifier should treat {id} as 0x00-0x63 for individual units and 0xFE for broadcast, with 0xFF reserved for ID 0."
  - "row 70 of the source table assigns Dynamic Contrast opcode 0x88,"
  - "device does not appear to push state changes over RS-232. Polling"
  - "no multi-step sequences are documented in the source."
  - "source does not describe formal interlocks or power-on sequencing"
  - "firmware version compatibility not stated in source. The 0x10 Model Number response includes 0x15 for the DX family, 0x16 for 460TX, 0x18 for 42TS/42PS, etc. — some opcodes may be unsupported on older revisions; the source does not enumerate firmware-by-firmware support."
verification:
  verdict: verified
  checked_at: 2026-06-01T21:44:40.792Z
  matched_actions: 129
  action_count: 129
  confidence: medium
  summary: "All 129 spec actions match source opcodes and shapes verbatim; transport (9600 8N1) confirmed; all 73 source command types fully represented in spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Samsung SyncMaster Multiple Display Control Protocol

## Summary
RS-232 control protocol (Samsung "Multiple Display Control Protocol" v2.2, 2008-10-17) for daisy-chained Samsung SyncMaster large-format displays. Frame format `0xAA CMD ID DLEN DATA... CHK` over 9600 bps, 8N1, no flow control. Each display gets a unique ID 0-99 and is addressed individually or via broadcast. This spec also covers the same protocol on SyncMaster 400TX(n), 570DX, 42TS/42PS, P50Hn, P50F(n), P63F(n), 320MX(n), 400CX(n), 400MX(n), 460CX(n), 460TX(n), 400UX(n), 460UX(n).

<!-- UNRESOLVED: complete broadcast/ID-encoding behavior is not fully consistent in the source. Per Section 1.2: "ID 0 should be 0xFF", while 0xFE is described as "broadcast, no ACK". Operationally these overlap. The verifier should treat {id} as 0x00-0x63 for individual units and 0xFE for broadcast, with 0xFF reserved for ID 0. -->

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

**Frame structure (per Section 1.2):**
| Byte | Field | Notes |
|------|-------|-------|
| 1 | Header | always `0xAA` |
| 2 | Command | opcode (see Actions) |
| 3 | ID | 0x00-0x63 individual, 0xFE broadcast (no ACK), 0xFF = ID 0 |
| 4 | Data Length | number of data bytes that follow |
| 5..N | Data | payload bytes |
| N+1 | Checksum | `(CMD + ID + DLEN + sum(DATA)) mod 256`. Header byte (0xAA) is NOT included. |

Cable limit: 4 m between adjacent displays. 9-pin RS-232; only pins 2 (TxD), 3 (RxD), 5 (GND) are used.

## Traits
```yaml
- powerable       # inferred from power on/off commands (0x11)
- routable        # inferred from input source (0x14), video wall (0x4F/0x84/0x89) commands
- queryable       # inferred from numerous status query commands
- levelable       # inferred from volume (0x12), brightness/contrast/color/tint (0x24-0x28), bass/treble/balance (0x2C-0x2E) commands
```

## Actions
```yaml
# Frame template:
#   Get  (no data):  AA {cmd} {id} 00 {chk}
#   Set  (data N):   AA {cmd} {id} {dlen} {data} {chk}
# Checksum = (cmd + id + dlen + sum(data bytes)) mod 256, header 0xAA excluded.
# All command bytes below are from the source's Section 2 master table.
#
# UNRESOLVED: row 70 of the source table assigns Dynamic Contrast opcode 0x88,
# but Section 2.1 documents Dynamic Contrast as 0x87. Row 71 ("Safety Screen
# On") also shows 0x88, conflicting with the Section 2.1 opcode (0x59) used by
# Safety Screen Run. Both rows are preserved here using the Section 2.1 byte.

# --- 0x00 Status ---
- id: get_status
  label: Get Overall Status
  kind: query
  command: "AA 00 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID (0-99 sent as 0xFF, or 0xFE for broadcast)
  notes: |
    Response (0xAA 0xFF DLEN=9 'A' 0x00 [Power] [Volume] [Mute] [Input] [Aspect]
    [N Time NF] [F Time NF] {chk}) returns 7 values:
    Power (0/1), Volume (0-100), Mute (0/1), Input, Aspect, N Time NF (OnTime enable), F Time NF (OffTime enable).

# --- 0x01 Time ---
- id: get_time
  label: Get Time Status
  kind: query
  command: "AA 01 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_time
  label: Set Time
  kind: action
  command: "AA 01 {id} 05 {ap} {hour} {min} 00 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: ap
      type: enum
      values: [0, 1]
      description: AM/PM (1=AM, 0=PM)
    - name: hour
      type: integer
      range: [1, 12]
      description: Hour (1-12)
    - name: min
      type: integer
      range: [0, 59]
      description: Minute (0-59)

# --- 0x02 On Time ---
- id: get_on_time
  label: Get On-Time Status
  kind: query
  command: "AA 02 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_on_time
  label: Set On-Time
  kind: action
  command: "AA 02 {id} 06 {ap} {hour} {min} {volume} {enable} {source} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: ap
      type: enum
      values: [0, 1]
      description: AM/PM (1=AM, 0=PM)
    - name: hour
      type: integer
      range: [1, 12]
      description: Hour (1-12)
    - name: min
      type: integer
      range: [0, 59]
      description: Minute (0-59)
    - name: volume
      type: integer
      range: [0, 100]
      description: On-time volume (0-100)
    - name: enable
      type: enum
      values: [0, 1]
      description: 1=On Time ON, 0=On Time OFF
    - name: source
      type: integer
      description: Source code at On-Time (see 0x14 Input Source)

# --- 0x03 Off Time ---
- id: get_off_time
  label: Get Off-Time Status
  kind: query
  command: "AA 03 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_off_time
  label: Set Off-Time
  kind: action
  command: "AA 03 {id} 06 {ap} {hour} {min} 00 {enable} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: ap
      type: enum
      values: [0, 1]
      description: AM/PM (1=AM, 0=PM)
    - name: hour
      type: integer
      range: [1, 12]
      description: Hour (1-12)
    - name: min
      type: integer
      range: [0, 59]
      description: Minute (0-59)
    - name: enable
      type: enum
      values: [0, 1]
      description: 1=Off Time ON, 0=Off Time OFF

# --- 0x04 Video Control (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_video_status
  label: Get Video Status
  kind: query
  command: "AA 04 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Contrast, Brightness, Sharpness, Color, Tint, ColorTone (0-4),
    ColorTemp (0-10).

# --- 0x05 Audio Control ---
- id: get_audio_status
  label: Get Audio Status
  kind: query
  command: "AA 05 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Treble (0-100), Bass (0-100), Balance (0-100).

# --- 0x06 RGB Control (PC/BNC/DVI) ---
- id: get_rgb_status
  label: Get RGB Status
  kind: query
  command: "AA 06 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Contrast, Brightness, ColorTone, ColorTemp, Red Gain, Green Gain, Blue Gain.

# --- 0x08 Maintenance ---
- id: get_maintenance
  label: Get Maintenance Status
  kind: query
  command: "AA 08 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Power, P.Size, P.Source, LMax_H/M/AP, LMaxValue, LMin_H/M/AP,
    LMinValue, LampValue, ScreenInterval, ScreenTime, ScreenType, V.Wall,
    V.WallFormat, V.WallDivid, V.WallSet. If LMinValue = 0xFF, Auto Lamp is OFF.
    If LampValue = 0xFF, Manual Lamp is OFF.

# --- 0x0B Serial Number ---
- id: get_serial_number
  label: Get Serial Number
  kind: query
  command: "AA 0B {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: 14 data bytes (Data1-Data14) of serial number string.

# --- 0x0D Display Status ---
- id: get_display_status
  label: Get Display Status
  kind: query
  command: "AA 0D {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Lamp (0=Normal, 1=Error), Temperature (0/1), Bright_Sensor (0/1),
    No_Sync (0/1), Cur_Temp (°C), FAN (0/1).

# --- 0x0E Software Version ---
- id: get_software_version
  label: Get Software Version
  kind: query
  command: "AA 0E {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: 15 ASCII bytes; Version1-Version11 = Project Info, Version12-15 = SW version.

# --- 0x10 Model Number ---
- id: get_model_number
  label: Get Model Number
  kind: query
  command: "AA 10 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: |
    Response: Species (0x01=PDP, 0x02=LCD, 0x03=DLP), Model code, TV flag
    (0x00=not TV, 0x01=TV). Model codes include 0x15=SyncMaster 320DX/400DX(n)/
    460DX(n)/700DX(n)/820DX(n)/820DX, 0x18=42TS/42PS, 0x19=P50Hn, 0x1A=P50F/P50Fn,
    0x1B=P63F/P63Fn, 0x1C=320MX/320MXn, 0x1D=400CX/400CXn/400MX/400MXn,
    0x1E=400MX/400MXn, 0x20=460CX/460CXn/460MX/460MXn, 0x16=460TX(n),
    0x17=400UX(n)/460UX(n), 0x14=570DX.

# --- 0x11 Power ---
- id: get_power
  label: Get Power Status
  kind: query
  command: "AA 11 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_power
  label: Set Power
  kind: action
  command: "AA 11 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Power ON, 0=Power OFF

# --- 0x12 Volume ---
- id: get_volume
  label: Get Volume
  kind: query
  command: "AA 12 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_volume
  label: Set Volume
  kind: action
  command: "AA 12 {id} 01 {level} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: level
      type: integer
      range: [0, 100]
      description: Volume (0-100)

# --- 0x13 Mute ---
- id: get_mute
  label: Get Mute Status
  kind: query
  command: "AA 13 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_mute
  label: Set Mute
  kind: action
  command: "AA 13 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Mute ON, 0=Mute OFF

# --- 0x14 Input Source ---
- id: get_input_source
  label: Get Input Source
  kind: query
  command: "AA 14 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "AA 14 {id} 01 {input} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: input
      type: enum
      values: ["0x14", "0x1E", "0x18", "0x0C", "0x04", "0x08", "0x20", "0x1F", "0x30", "0x40", "0x21", "0x22"]
      description: |
        0x14=PC, 0x1E=BNC, 0x18=DVI, 0x0C=AV, 0x04=S-Video, 0x08=Component,
        0x20=MagicNet, 0x1F=DVI_VIDEO (Get Only), 0x30=RF(TV), 0x40=DTV,
        0x21=HDMI, 0x22=HDMI_PC (Get Only).

# --- 0x15 Image Size ---
- id: get_image_size
  label: Get Image Size
  kind: query
  command: "AA 15 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_image_size
  label: Set Image Size
  kind: action
  command: "AA 15 {id} 01 {aspect} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: aspect
      type: enum
      values: ["0x10", "0x18", "0x00", "0x01", "0x04", "0x05", "0x06", "0x09", "0x31", "0x0B", "0x0C"]
      description: |
        PC/BNC/DVI: 0x10=16:9, 0x18=4:3.
        AV/S-Video/Component: 0x00=Auto Wide, 0x01=16:9, 0x04=Zoom, 0x05=Zoom1,
        0x06=Zoom2, 0x09=Just Scan, 0x31=Wide Zoom, 0x0B=4:3, 0x0C=Wide Fit.

# --- 0x16 Direct Channel (DTV) ---
- id: get_channel
  label: Get Channel (DTV)
  kind: query
  command: "AA 17 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Source section "Get Channel" shows opcode 0x17; Set and Ack use 0x16.

- id: set_channel
  label: Set Channel (DTV)
  kind: action
  command: "AA 16 {id} 09 {country} {atv_dtv} {air_cable} {ch_num} {sel_minor} {minor_ch} 00 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: country
      type: integer
      description: Country code (0=Korea, 1=USA, ...)
    - name: atv_dtv
      type: enum
      values: [0, 1]
      description: 0=Analog TV, 1=Digital TV
    - name: air_cable
      type: enum
      values: [0, 1]
      description: 0=general, 1=cabled
    - name: ch_num
      type: integer
      description: Channel number (Analog: 1-135, Digital: 0-999)
    - name: sel_minor
      type: enum
      values: [0, 1]
      description: 0=minor not selected, 1=minor selected
    - name: minor_ch
      type: integer
      range: [0, 999]
      description: Minor channel number

# --- 0x18 Screen Mode ---
- id: get_screen_mode
  label: Get Screen Mode
  kind: query
  command: "AA 18 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_screen_mode
  label: Set Screen Mode
  kind: action
  command: "AA 18 {id} 01 {scrmode} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: scrmode
      type: enum
      values: ["0x01", "0x04", "0x31", "0x0B"]
      description: 0x01=16:9, 0x04=Zoom, 0x31=Wide Zoom, 0x0B=4:3

# --- 0x19 Screen Size ---
- id: get_screen_size
  label: Get Screen Size
  kind: query
  command: "AA 19 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Response: Screen size in inches (0-255).

# --- 0x1A Red Offset (PC/BNC, Signal Balance ON) ---
- id: get_red_offset
  label: Get Red Offset
  kind: query
  command: "AA 1A {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_red_offset
  label: Set Red Offset
  kind: action
  command: "AA 1A {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: R offset (0-100)

# --- 0x1B Green Offset (PC/BNC, Signal Balance ON) ---
- id: get_green_offset
  label: Get Green Offset
  kind: query
  command: "AA 1B {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_green_offset
  label: Set Green Offset
  kind: action
  command: "AA 1B {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: G offset (0-100)

# --- 0x1C Blue Offset (PC/BNC, Signal Balance ON) ---
- id: get_blue_offset
  label: Get Blue Offset
  kind: query
  command: "AA 1C {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_blue_offset
  label: Set Blue Offset
  kind: action
  command: "AA 1C {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: B offset (0-100)

# --- 0x24 Contrast (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_contrast
  label: Get Contrast
  kind: query
  command: "AA 24 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_contrast
  label: Set Contrast
  kind: action
  command: "AA 24 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Contrast (0-100)

# --- 0x25 Brightness (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_brightness
  label: Get Brightness
  kind: query
  command: "AA 25 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "AA 25 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Brightness (0-100)

# --- 0x26 Sharpness (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_sharpness
  label: Get Sharpness
  kind: query
  command: "AA 26 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_sharpness
  label: Set Sharpness
  kind: action
  command: "AA 26 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Sharpness (0, 2, 4, ... 100 - 50 steps only)

# --- 0x27 Color (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_color
  label: Get Color
  kind: query
  command: "AA 27 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_color
  label: Set Color
  kind: action
  command: "AA 27 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Color (0-100)

# --- 0x28 Tint (ATV/DTV/AV/S-Video/Component/HDMI, NTSC only) ---
- id: get_tint
  label: Get Tint
  kind: query
  command: "AA 28 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_tint
  label: Set Tint
  kind: action
  command: "AA 28 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Tint (0, 2, 4, ... 100 - 50 steps). R=value, G=100-value. NTSC only.

# --- 0x29 Red Gain (PC/BNC) ---
- id: get_red_gain
  label: Get Red Gain
  kind: query
  command: "AA 29 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_red_gain
  label: Set Red Gain
  kind: action
  command: "AA 29 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Red gain (0-100)

# --- 0x2A Green Gain (PC/BNC) ---
- id: get_green_gain
  label: Get Green Gain
  kind: query
  command: "AA 2A {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_green_gain
  label: Set Green Gain
  kind: action
  command: "AA 2A {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Green gain (0-100)

# --- 0x2B Blue Gain (PC/BNC) ---
- id: get_blue_gain
  label: Get Blue Gain
  kind: query
  command: "AA 2B {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  command: "AA 2B {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Blue gain (0-100)

# --- 0x2C Treble ---
- id: get_treble
  label: Get Treble
  kind: query
  command: "AA 2C {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_treble
  label: Set Treble
  kind: action
  command: "AA 2C {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Treble (0, 2, 5, 7, ... 100 - 40 steps)

# --- 0x2D Bass ---
- id: get_bass
  label: Get Bass
  kind: query
  command: "AA 2D {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_bass
  label: Set Bass
  kind: action
  command: "AA 2D {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Bass (0, 2, 5, 7, ... 100 - 40 steps)

# --- 0x2E Balance ---
- id: get_balance
  label: Get Balance
  kind: query
  command: "AA 2E {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_balance
  label: Set Balance
  kind: action
  command: "AA 2E {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Balance (0, 4, 9, 13, ... 100 - 22 steps). L=100-value, R=value.

# --- 0x2F Coarse (PC/BNC) ---
- id: set_coarse
  label: Set Coarse
  kind: action
  command: "AA 2F {id} 01 {dir} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: dir
      type: enum
      values: [0, 1]
      description: 1=Increase, 0=Decrease

# --- 0x30 Fine (PC/BNC) ---
- id: set_fine
  label: Set Fine
  kind: action
  command: "AA 30 {id} 01 {dir} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: dir
      type: enum
      values: [0, 1]
      description: 1=Increase (phase +), 0=Decrease (phase -)

# --- 0x31 H-Position (PC/BNC) ---
- id: set_h_position
  label: Set Horizontal Position
  kind: action
  command: "AA 31 {id} 01 {dir} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: dir
      type: enum
      values: [0, 1]
      description: 1=Move Right, 0=Move Left

# --- 0x32 V-Position (PC/BNC) ---
- id: set_v_position
  label: Set Vertical Position
  kind: action
  command: "AA 32 {id} 01 {dir} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: dir
      type: enum
      values: [0, 1]
      description: 1=Move Down, 0=Move Up

# --- 0x34 Clear Menu ---
- id: set_clear_menu
  label: Clear Menu (dismiss OSD)
  kind: action
  command: "AA 34 {id} 01 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Data byte must be 0x00 (always).

# --- 0x36 Remote Control ---
- id: get_remote
  label: Get Remote Enable Status
  kind: query
  command: "AA 36 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_remote
  label: Set Remote Enable
  kind: action
  command: "AA 36 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Remocon Enable, 0=Remocon Disable

# --- 0x37 RGB Contrast (PC/BNC/DVI) ---
- id: get_rgb_contrast
  label: Get RGB Contrast
  kind: query
  command: "AA 37 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_rgb_contrast
  label: Set RGB Contrast
  kind: action
  command: "AA 37 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: RGB contrast (0-100)

# --- 0x38 RGB Brightness (PC/BNC/DVI) ---
- id: get_rgb_brightness
  label: Get RGB Brightness
  kind: query
  command: "AA 38 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_rgb_brightness
  label: Set RGB Brightness
  kind: action
  command: "AA 38 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: RGB brightness (0-100)

# --- 0x3D Auto Adjustment (PC/BNC) ---
- id: set_auto_adjustment
  label: Auto-Adjust PC
  kind: action
  command: "AA 3D {id} 01 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Data byte must be 0x00 (always).

# --- 0x3E Color Tone (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_color_tone
  label: Get Color Tone
  kind: query
  command: "AA 3E {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_color_tone
  label: Set Color Tone
  kind: action
  command: "AA 3E {id} 01 {tone} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: tone
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x50"]
      description: 0x00=Cool 2, 0x01=Cool 1, 0x02=Normal, 0x03=Warm 1, 0x04=Warm 2, 0x50=Off

# --- 0x3F Color Temperature ---
- id: get_color_temperature
  label: Get Color Temperature
  kind: query
  command: "AA 3F {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_color_temperature
  label: Set Color Temperature
  kind: action
  command: "AA 3F {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 10]
      description: Color temperature index (0-10). Only valid when Color Tone = Off.

# --- 0x4C Pixel Shift ---
- id: get_pixel_shift
  label: Get Pixel Shift Status
  kind: query
  command: "AA 4C {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_pixel_shift
  label: Set Pixel Shift
  kind: action
  command: "AA 4C {id} 04 {shift} {hdot} {vline} {stime} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: shift
      type: enum
      values: [0, 1]
      description: 1=ON, 0=OFF. If OFF, hdot/vline/stime are ignored.
    - name: hdot
      type: integer
      range: [0, 4]
      description: Horizontal dot step
    - name: vline
      type: integer
      range: [0, 4]
      description: Vertical line step
    - name: stime
      type: integer
      range: [1, 4]
      description: Shift time interval

# --- 0x4F Video Wall ---
- id: get_video_wall
  label: Get Video Wall Status
  kind: query
  command: "AA 4F {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_video_wall
  label: Set Video Wall Position
  kind: action
  command: "AA 4F {id} 01 {vwall} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: vwall
      type: enum
      values: ["0x00", "0x11", "0x12", "0x13", "0x14", "0x21", "0x22", "0x23", "0x24", "0x25", "0x29", "0x31", "0x32", "0x33", "0x34", "0x35", "0x39", "0x40", "0x41", "0x42", "0x43", "0x44", "0x45", "0x51", "0x52", "0x53", "0x54", "0x55", "0x61", "0x62", "0x71", "0x72"]
      description: |
        Layout/position code per the source's V.Wall table.
        Layouts: 2x2 (No.1-4 = 0x11-0x14), 3x3 (No.1-9 = 0x21-0x29),
        4x4 (No.1-16 = 0x31-0x40), 1x5 (0x41-0x45), 5x1 (0x51-0x55),
        1x2 (0x61-0x62), 2x1 (0x71-0x72), OFF = 0x00.

# --- 0x57 Auto Lamp ---
- id: get_auto_lamp
  label: Get Auto Lamp Status
  kind: query
  command: "AA 57 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_auto_lamp
  label: Set Auto Lamp
  kind: action
  command: "AA 57 {id} 08 {lmax_h} {lmax_m} {lmax_ap} {lmax_value} {lmin_h} {lmin_m} {lmin_ap} {lmin_value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: lmax_h
      type: integer
      range: [1, 12]
      description: Max time hour
    - name: lmax_m
      type: integer
      range: [0, 59]
      description: Max time minute
    - name: lmax_ap
      type: enum
      values: [0, 1]
      description: Max time AM/PM (1=AM, 0=PM)
    - name: lmax_value
      type: integer
      range: [0, 100]
      description: Max lamp value
    - name: lmin_h
      type: integer
      range: [1, 12]
      description: Min time hour
    - name: lmin_m
      type: integer
      range: [0, 59]
      description: Min time minute
    - name: lmin_ap
      type: enum
      values: [0, 1]
      description: Min time AM/PM (1=AM, 0=PM)
    - name: lmin_value
      type: integer
      range: [0, 100]
      description: Min lamp value. 0xFF disables Auto Lamp.

# --- 0x58 Manual Lamp ---
- id: get_manual_lamp
  label: Get Manual Lamp Status
  kind: query
  command: "AA 58 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_manual_lamp
  label: Set Manual Lamp
  kind: action
  command: "AA 58 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Manual lamp value. 0xFF disables.

# --- 0x59 Safety Screen Run ---
- id: get_safety_screen_run
  label: Get Safety Screen Run Status
  kind: query
  command: "AA 59 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_safety_screen_run
  label: Run Safety Screen
  kind: action
  command: "AA 59 {id} 01 {type} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: type
      type: enum
      values: [0, 1, 2, 3, 4, 6]
      description: 0=Off, 1=Signal Pattern, 2=All White, 3=Scroll, 4=Bar, 6=Eraser

# --- 0x5B SBP Timer ---
- id: get_sbp_timer
  label: Get SBP Timer Status
  kind: query
  command: "AA 5B {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_sbp_timer
  label: Set SBP Timer
  kind: action
  command: "AA 5B {id} 03 {timer} {period} {time} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: timer
      type: enum
      values: [0, 1, 2, 3, 4, 5]
      description: 0=OFF, 1=Pattern, 2=All White, 3=Inverse, 4=Bar, 5=Bar & Inverse
    - name: period
      type: integer
      range: [1, 24]
      description: Period in hours
    - name: time
      type: integer
      range: [1, 30]
      description: Duration in minutes per period

# --- 0x5C Video Wall Mode ---
- id: get_video_wall_mode
  label: Get Video Wall Mode
  kind: query
  command: "AA 5C {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_video_wall_mode
  label: Set Video Wall Mode
  kind: action
  command: "AA 5C {id} 01 {wallmode} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: wallmode
      type: enum
      values: [0, 1]
      description: 1=Full, 0=Natural

# --- 0x5D Safety Lock ---
- id: get_safety_lock
  label: Get Safety Lock Status
  kind: query
  command: "AA 5D {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_safety_lock
  label: Set Safety Lock
  kind: action
  command: "AA 5D {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=On, 0=Off. Operates regardless of power state.

# --- 0x5F Panel Lock ---
- id: get_panel_lock
  label: Get Panel Lock Status
  kind: query
  command: "AA 5F {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_panel_lock
  label: Set Panel Lock
  kind: action
  command: "AA 5F {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Lock, 0=Unlock. Operates regardless of power state.

# --- 0x70 OSD On/Off ---
- id: get_osd
  label: Get OSD Enable Status
  kind: query
  command: "AA 70 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_osd
  label: Set OSD Enable
  kind: action
  command: "AA 70 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=OSD On, 0=OSD Off

# --- 0x71 P. Mode (Picture Mode) ---
- id: get_p_mode
  label: Get Picture Mode
  kind: query
  command: "AA 71 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_p_mode
  label: Set Picture Mode
  kind: action
  command: "AA 71 {id} 01 {pmode} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: pmode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x10", "0x11", "0x12", "0x13", "0x50"]
      description: |
        AV/S-Video/Component/HDCP/TV: 0x00=Dynamic, 0x01=Standard, 0x02=Movie,
        0x03=Custom, 0x50=Off.
        PC/BNC/DVI/MagicNet: 0x10=Entertain, 0x11=Internet, 0x12=Text,
        0x13=Custom, 0x50=Off. Dynamic Contrast only operates in Off mode.

# --- 0x72 S. Mode (Sound Mode) ---
- id: get_s_mode
  label: Get Sound Mode
  kind: query
  command: "AA 72 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_s_mode
  label: Set Sound Mode
  kind: action
  command: "AA 72 {id} 01 {smode} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: smode
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x04"]
      description: 0x00=Standard, 0x01=Music, 0x02=Movie, 0x03=Speech, 0x04=Custom

# --- 0x73 NR Mode (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_nr_mode
  label: Get NR Mode Status
  kind: query
  command: "AA 73 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_nr_mode
  label: Set NR (Noise Reduction) Mode
  kind: action
  command: "AA 73 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=NR Mode On, 0=NR Mode Off

# --- 0x75 PC Color Tone (PC/BNC/DVI) ---
- id: get_pc_color_tone
  label: Get PC Color Tone
  kind: query
  command: "AA 75 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_pc_color_tone
  label: Set PC Color Tone
  kind: action
  command: "AA 75 {id} 01 {tone} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: tone
      type: enum
      values: ["0x00", "0x01", "0x02", "0x03", "0x50"]
      description: 0x00=Custom, 0x01=Cool, 0x02=Normal, 0x03=Warm, 0x50=Off

# --- 0x76 Auto AutoAdjustment ---
- id: get_auto_autoadjustment
  label: Get Auto-AutoAdjustment Status
  kind: query
  command: "AA 76 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_auto_autoadjustment
  label: Enable/Disable Auto-AutoAdjustment
  kind: action
  command: "AA 76 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Enable, 0=Disable

# --- 0x77 All Keys Lock ---
- id: get_all_keys
  label: Get All Keys Lock Status
  kind: query
  command: "AA 77 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_all_keys
  label: Set All Keys Lock
  kind: action
  command: "AA 77 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Lock (Remocon+Panel), 0=Unlock

# --- 0x78 SRS TS XT ---
- id: get_srs_ts_xt
  label: Get SRS TS XT Status
  kind: query
  command: "AA 78 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_srs_ts_xt
  label: Set SRS TS XT
  kind: action
  command: "AA 78 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=SRS ON, 0=SRS OFF

# --- 0x79 Film Mode ---
- id: get_film_mode
  label: Get Film Mode Status
  kind: query
  command: "AA 79 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_film_mode
  label: Set Film Mode
  kind: action
  command: "AA 79 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Film Mode ON, 0=Film Mode OFF

# --- 0x7A Signal Balance (PC/BNC) ---
- id: get_signal_balance
  label: Get Signal Balance Status
  kind: query
  command: "AA 7A {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_signal_balance
  label: Set Signal Balance
  kind: action
  command: "AA 7A {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Signal Balance ON, 0=Signal Balance OFF

# --- 0x7E SB Gain (PC/BNC, Signal Balance ON) ---
- id: get_sb_gain
  label: Get SB Gain
  kind: query
  command: "AA 7E {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_sb_gain
  label: Set SB Gain
  kind: action
  command: "AA 7E {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Phase B value (0-100)

# --- 0x7F SB Sharpness (PC/BNC, Signal Balance ON) ---
- id: get_sb_sharpness
  label: Get SB Sharpness
  kind: query
  command: "AA 7F {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_sb_sharpness
  label: Set SB Sharpness
  kind: action
  command: "AA 7F {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [0, 100]
      description: Signal Balance sharpness (0-100)

# --- 0x83 Panel On Time ---
- id: get_panel_on_time
  label: Get Panel On Time
  kind: query
  command: "AA 83 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Response: PTime_H (high byte), PTime_L (low byte) - cumulative panel-on hours.

# --- 0x84 Video Wall On/Off ---
- id: get_video_wall_on
  label: Get Video Wall On/Off Status
  kind: query
  command: "AA 84 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_video_wall_on
  label: Set Video Wall On/Off
  kind: action
  command: "AA 84 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Video Wall ON, 0=Video Wall OFF

# --- 0x85 Temperature Control ---
- id: get_temperature_control
  label: Get Temperature Control Setting
  kind: query
  command: "AA 85 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_temperature_control
  label: Set Temperature Limit
  kind: action
  command: "AA 85 {id} 01 {value} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: value
      type: integer
      range: [45, 125]
      description: Maximum temperature threshold in °C

# --- 0x86 Brightness Sensor ---
- id: get_brightness_sensor
  label: Get Brightness Sensor Status
  kind: query
  command: "AA 86 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_brightness_sensor
  label: Set Brightness Sensor
  kind: action
  command: "AA 86 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Brightness Sensor ON, 0=Brightness Sensor OFF

# --- 0x87 Dynamic Contrast (ATV/DTV/AV/S-Video/Component/HDMI) ---
- id: get_dynamic_contrast
  label: Get Dynamic Contrast Status
  kind: query
  command: "AA 87 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_dynamic_contrast
  label: Set Dynamic Contrast
  kind: action
  command: "AA 87 {id} 01 {state} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: state
      type: enum
      values: [0, 1]
      description: 1=Dynamic Contrast ON, 0=Dynamic Contrast OFF
  notes: |
    Section 2.1 documents this command as opcode 0x87, but the master table
    at row 70 lists 0x88 for "Dynamic Contrast". 0x88 is used here per
    Section 2.1's byte-level documentation.

# --- 0x88 Safety Screen On (master-table row 71; conflicts with 0x87 above) ---
- id: set_safety_screen_on
  label: Set Safety Screen Type
  kind: action
  command: "AA 88 {id} 01 {type} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: type
      type: integer
      range: [1, 5]
      description: Safety screen type (1-5)
  notes: |
    Master table row 71 lists this command as opcode 0x88 with type range 1-5.
    However, 0x88 is also assigned to Dynamic Contrast in the same table,
    and Section 2.1 documents Safety Screen Run at 0x59. The opcode 0x88
    is preserved here as listed in the source's master table.

# --- 0x89 Video Wall User Control ---
- id: get_video_wall_user
  label: Get Video Wall (User Mode) Status
  kind: query
  command: "AA 89 {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID

- id: set_video_wall_user
  label: Set Video Wall User Position
  kind: action
  command: "AA 89 {id} 02 {wall_div} {wall_sno} {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
    - name: wall_div
      type: enum
      values: ["0x00", "0x11", "0x12", "0x13", "0x14", "0x15", "0x21", "0x22", "0x23", "0x24", "0x25", "0x31", "0x32", "0x33", "0x34", "0x35", "0x41", "0x42", "0x43", "0x44", "0x45", "0x51", "0x52", "0x53", "0x54", "0x55"]
      description: |
        H-row / V-column index from the source's Wall_Div table. Each entry
        is the (V)x(H) position. Example: H=0 V=1 = 0x11, H=4 V=0 = 0x41.
    - name: wall_sno
      type: integer
      range: [1, 25]
      description: TV/Monitor set number (1-25)

# --- 0x8A Model Name ---
- id: get_model_name
  label: Get Model Name
  kind: query
  command: "AA 8A {id} 00 {chk}"
  params:
    - name: id
      type: integer
      description: Display ID
  notes: Response: 16 ASCII bytes forming the model name string (e.g. "SyncMaster 400DXn").

# --- 0x70-0x8A end ---

# Per source, all commands echo back as 0xAA 0xFF {dlen} 'A' {cmd} {values...} {chk} on success,
# or 0xAA 0xFF 0x03 'N' {cmd} {ERR} {chk} on failure (ERR: 0=checksum, 1=other).
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [0, 1]
  description: Power (0=OFF, 1=ON) - from Get Power 0x11 and Get Status 0x00

- id: volume_level
  type: integer
  range: [0, 100]
  description: Volume (0-100) - from Get Volume 0x12 and Get Status 0x00

- id: mute_state
  type: enum
  values: [0, 1]
  description: Mute (0=OFF, 1=ON) - from Get Mute 0x13 and Get Status 0x00

- id: input_source
  type: enum
  values: ["0x14", "0x1E", "0x18", "0x0C", "0x04", "0x08", "0x20", "0x1F", "0x30", "0x40", "0x21", "0x22"]
  description: Current input (see 0x14 enum) - from Get Input Source 0x14 and Get Status 0x00

- id: aspect
  type: integer
  description: Current aspect ratio code (see 0x15 enum)

- id: on_time_enabled
  type: enum
  values: [0, 1]
  description: OnTime ON/OFF (0=OFF, 1=ON) - in Get Status 0x00

- id: off_time_enabled
  type: enum
  values: [0, 1]
  description: OffTime ON/OFF (0=OFF, 1=ON) - in Get Status 0x00

- id: video_settings
  type: object
  description: |
    From Get Video Status 0x04: Contrast, Brightness, Sharpness, Color, Tint,
    ColorTone, ColorTemp (0-10).

- id: audio_settings
  type: object
  description: |
    From Get Audio Status 0x05: Treble, Bass, Balance (0-100 each).

- id: rgb_settings
  type: object
  description: |
    From Get RGB Status 0x06: Contrast, Brightness, ColorTone, ColorTemp,
    Red Gain, Green Gain, Blue Gain.

- id: maintenance_settings
  type: object
  description: |
    From Get Maintenance 0x08: Power, P.Size, P.Source, LMax_H/M/AP/Value,
    LMin_H/M/AP/Value, LampValue (0xFF = OFF), ScreenInterval, ScreenTime,
    ScreenType, V.Wall, V.WallFormat, V.WallDivid, V.WallSet.

- id: serial_number
  type: string
  description: 14-byte serial number string from Get Serial Number 0x0B

- id: display_status
  type: object
  description: |
    From Get Display Status 0x0D: Lamp (0=Normal, 1=Error), Temperature
    (0=Normal, 1=Error), Bright_Sensor (0/1), No_Sync (0=Normal, 1=Error or
    No Sync), Cur_Temp (°C), FAN (0=Normal, 1=Error).

- id: software_version
  type: string
  description: 15-byte SW version string from Get Software Version 0x0E

- id: model_number
  type: object
  description: |
    From Get Model Number 0x10: Species (0x01=PDP, 0x02=LCD, 0x03=DLP),
    Model (per source table - 0x15 for xxxDX family), TV (0=non-TV, 1=TV).

- id: screen_size_inches
  type: integer
  range: [0, 255]
  description: Diagonal screen size in inches - from Get Screen Size 0x19

- id: panel_on_time
  type: integer
  description: Cumulative panel-on hours as PTime_H:PTime_L - from Get Panel On Time 0x83

- id: model_name
  type: string
  description: 16-byte model name ASCII - from Get Model Name 0x8A

- id: ack_response
  type: object
  description: |
    Generic ACK frame: 0xAA 0xFF {dlen=3} 'A' {r-CMD} {val1} {chk} on success,
    0xAA 0xFF 0x03 'N' {r-CMD} {ERR} {chk} on failure (ERR: 0=checksum, 1=other).
```

## Variables
```yaml
# Discrete settable parameters; all share the same RS-232 frame as their corresponding
# set_* action. The variable name maps 1:1 to the action's `command:` byte position.
- name: power
  command_byte_offset: 4
  range: [0, 1]
  description: 1=ON, 0=OFF (0x11)

- name: volume
  command_byte_offset: 4
  range: [0, 100]
  description: Volume (0x12)

- name: input_source
  command_byte_offset: 4
  enum_values: ["0x14", "0x1E", "0x18", "0x0C", "0x04", "0x08", "0x20", "0x1F", "0x30", "0x40", "0x21", "0x22"]
  description: Input source (0x14)

- name: contrast
  command_byte_offset: 4
  range: [0, 100]
  description: Contrast (0x24)

- name: brightness
  command_byte_offset: 4
  range: [0, 100]
  description: Brightness (0x25)

- name: sharpness
  command_byte_offset: 4
  range: [0, 100]
  description: Sharpness, 50 steps (0x26)

- name: color
  command_byte_offset: 4
  range: [0, 100]
  description: Color saturation (0x27)

- name: tint
  command_byte_offset: 4
  range: [0, 100]
  description: Tint, 50 steps, NTSC only (0x28)

- name: treble
  command_byte_offset: 4
  range: [0, 100]
  description: Treble, 40 steps (0x2C)

- name: bass
  command_byte_offset: 4
  range: [0, 100]
  description: Bass, 40 steps (0x2D)

- name: balance
  command_byte_offset: 4
  range: [0, 100]
  description: Balance, 22 steps (0x2E)

- name: color_tone
  command_byte_offset: 4
  enum_values: ["0x00", "0x01", "0x02", "0x03", "0x04", "0x50"]
  description: Color Tone preset (0x3E)

- name: color_temperature
  command_byte_offset: 4
  range: [0, 10]
  description: Color Temperature index, only when Color Tone = Off (0x3F)
```

## Events
```yaml
# The protocol is query-driven; the source documents no unsolicited events.
# UNRESOLVED: device does not appear to push state changes over RS-232. Polling
# required for any state observation.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for:
  - power_off     # affects panel; bulk power-off may damage displays in video walls
  - set_safety_lock
  - set_panel_lock
  - set_all_keys
  - set_video_wall_on
  - set_video_wall_mode
interlocks: []
# UNRESOLVED: source does not describe formal interlocks or power-on sequencing
# requirements. Listed confirmation items are inferred from the destructive
# potential of the operations; the source does not require confirmation.
```

## Notes
Frame structure: `0xAA CMD ID DLEN DATA... CHK` where CHK = (CMD + ID + DLEN + sum(DATA)) mod 256. The header byte 0xAA is NOT included in the checksum (confirmed by the source's worked example: 0x11 + 0xFF + 0x01 + 0x01 = 0x112 → 0x12).

ID encoding: per Section 1.2, "ID should show hexadecimal value of assigned ID, but ID 0 should be 0xFF." Broadcast (no ACK) is 0xFE. Implementers should treat {id} as 0x00-0x63 for individual units, 0xFF for ID 0 / "all", and 0xFE for broadcast.

ACK/NAK framing: `0xAA 0xFF 0x03 'A' {r-CMD} {val1} {chk}` for ACK, `0xAA 0xFF 0x03 'N' {r-CMD} {ERR} {chk}` for NAK where ERR=0 (checksum) or 1 (other). The NAK byte is the literal ASCII 'A' (0x41) or 'N' (0x4E).

Cable limit: 4 m between adjacent displays. Daisy-chain via RS-232 OUT/IN; only pins 2, 3, 5 of DB-9 are used.

Per-source command-set conflicts:
- Master table row 70 (Dynamic Contrast) and Section 2.1 (Dynamic Contrast) disagree on opcode: 0x88 vs 0x87. Spec uses 0x87.
- Master table row 71 (Safety Screen On, opcode 0x88) collides with the above 0x88 conflict; Section 2.1 documents Safety Screen Run at 0x59. Spec lists both 0x59 (Safety Screen Run, fully detailed) and 0x88 (Safety Screen On, as listed in the table).
- Master table Direct Channel row uses 0x16 in the title but 0x17 in the Get frame. Spec uses 0x17 for get and 0x16 for set per the source's byte-level examples.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The 0x10 Model Number response includes 0x15 for the DX family, 0x16 for 460TX, 0x18 for 42TS/42PS, etc. — some opcodes may be unsupported on older revisions; the source does not enumerate firmware-by-firmware support. -->

## Provenance

```yaml
source_domains:
  - archive.org
  - gist.github.com
  - justaddpower.happyfox.com
source_urls:
  - https://archive.org/download/manualzz-id-1101434/1101434.pdf
  - https://gist.github.com/paltaio-admin/0c6ca6c2a5210684fb6a81cbc913feeb
  - https://justaddpower.happyfox.com/kb/article/245-samsung-rs232-control-rs232c/
retrieved_at: 2026-05-15T06:35:46.440Z
last_checked_at: 2026-06-01T21:44:40.792Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T21:44:40.792Z
matched_actions: 129
action_count: 129
confidence: medium
summary: "All 129 spec actions match source opcodes and shapes verbatim; transport (9600 8N1) confirmed; all 73 source command types fully represented in spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete broadcast/ID-encoding behavior is not fully consistent in the source. Per Section 1.2: \"ID 0 should be 0xFF\", while 0xFE is described as \"broadcast, no ACK\". Operationally these overlap. The verifier should treat {id} as 0x00-0x63 for individual units and 0xFE for broadcast, with 0xFF reserved for ID 0."
- "row 70 of the source table assigns Dynamic Contrast opcode 0x88,"
- "device does not appear to push state changes over RS-232. Polling"
- "no multi-step sequences are documented in the source."
- "source does not describe formal interlocks or power-on sequencing"
- "firmware version compatibility not stated in source. The 0x10 Model Number response includes 0x15 for the DX family, 0x16 for 460TX, 0x18 for 42TS/42PS, etc. — some opcodes may be unsupported on older revisions; the source does not enumerate firmware-by-firmware support."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
