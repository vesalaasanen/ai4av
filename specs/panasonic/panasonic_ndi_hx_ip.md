---
spec_id: admin/panasonic-aw-ue80-ue50-ue40-ue30
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic AW-UE80/UE50/UE40/UE30 Control Spec"
manufacturer: Panasonic
model_family: AW-UE80
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - AW-UE80
    - AW-UE50
    - AW-UE40
    - AW-UE30
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE80/AW-UE80UE50UE40_InterfaceSpecification_E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE150/AW-UE150HE145_InterfaceSpecification_E.pdf
retrieved_at: 2026-07-02T03:26:43.269Z
last_checked_at: 2026-07-07T11:48:29.872Z
generated_at: 2026-07-07T11:48:29.872Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP TCP port number not stated in source (only CGI paths given)"
  - "TCP port not stated in source"
  - "no explicit safety warnings, interlocks, or power-on sequencing procedures found in source"
  - "TCP port number for HTTP CGI endpoint not stated in source"
  - "firmware version compatibility not stated in source"
  - "serial-only devices and full half-duplex wiring details beyond 9600/8/N/1/none not stated"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:48:29.872Z
  matched_actions: 256
  action_count: 256
  confidence: medium
  summary: "All 256 spec actions matched verbatim commands in source; transport parameters fully documented; comprehensive coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-02
---

# Panasonic AW-UE80/UE50/UE40/UE30 Control Spec

## Summary
Panasonic AW-UE80/UE50/UE40/UE30 PTZ cameras. Spec covers TCP/IP (HTTP CGI) and RS-232 control of pan/tilt, camera (image/white balance/exposure/lens/system/output/preset/OSD/remote controller/maintenance) commands. Commands split into `ptz` (prefix `#`, terminator `[CR]`) and `cam` (prefix `[STX]`, terminator `[ETX]`); over IP, both framing formats are not required.

<!-- UNRESOLVED: HTTP TCP port number not stated in source (only CGI paths given) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  base_url: "http://<IP Address>/cgi-bin/"  # UNRESOLVED: TCP port not stated in source
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
- powerable       # inferred from #O (Standby/PowerOn)
- routable        # inferred from output routing (OSE:7B output destination)
- queryable       # inferred from Q* request commands throughout catalogue
```

## Actions
```yaml
# Camera Control Commands (cam type)
# Frame: [STX]:Command[ETX] - bracketing optional over IP
# URL form: http://<IP>/cgi-bin/aw_cam?cmd=<Command>&res=1

# --- Scene ---
- id: scene_file_select
  label: Scene File Select
  kind: action
  command: "XSF:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "0=Full Auto, 1=Scene1, 2=Scene2, 3=Scene3, 4=Scene4"
- id: scene_file_query
  label: Scene File Query
  kind: query
  command: "QSF"
  params: []
- id: scene_file_copy
  label: Scene File Copy
  kind: action
  command: "OSJ:D6:{Data1}:{Data2}"
  params:
    - name: Data1
      type: integer
      enum: [1, 2, 3, 4]
      description: Source scene
    - name: Data2
      type: integer
      enum: [1, 2, 3, 4]
      description: Destination scene

# --- Brightness ---
- id: brightness_level
  label: Brightness Level
  kind: action
  command: "OSD:48:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-64h"
      description: "-50 to 0 to +50"
- id: iris_mode
  label: Iris Mode (Auto/Manual)
  kind: action
  command: "ORS:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Manual, 1=Auto"
- id: iris_mode_ptz
  label: Iris Mode (PTZ)
  kind: action
  command: "#D3{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Manual, 1=Auto"
- id: auto_iris_speed
  label: Auto Iris Speed
  kind: action
  command: "OSJ:01:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "0=Slow, 1=Normal, 2=Fast"
- id: auto_iris_window
  label: Auto Iris Window
  kind: action
  command: "OSJ:02:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 4]
      description: "0=Normal1, 1=Normal2, 2=Center, 4=Full"
- id: backlight_comp
  label: Backlight Compensation
  kind: action
  command: "OSJ:90:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: shutter_mode
  label: Shutter Mode
  kind: action
  command: "OSJ:03:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Off, 1=Step, 2=Synchro, 3=ELC"
- id: shutter_step_position
  label: Shutter Step Position
  kind: action
  command: "OSJ:04:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
      description: "1 to 100"
- id: shutter_step_in_synchro
  label: Shutter Step in Synchro
  kind: action
  command: "OSJ:05:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
      description: "1 to 100"
- id: shutter_speed_step
  label: Shutter Speed (Step)
  kind: action
  command: "OSJ:06:{Data}"
  params:
    - name: Data
      type: hex
      range: "0001h-2710h"
      description: "1/1 to 1/10000"
- id: shutter_step_in_elc
  label: Shutter Step in ELC
  kind: action
  command: "OSJ:07:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
      description: "1 to 100"
- id: shutter_speed_elc
  label: Shutter Speed (ELC)
  kind: action
  command: "OSJ:08:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
      description: "1 to 100"
- id: shutter_speed_synchro
  label: Shutter Speed (Synchro)
  kind: action
  command: "OSJ:09:{Data}"
  params:
    - name: Data
      type: hex
      range: "00000h-186A0h"
      description: "0.0 to 10000.0 Hz"
- id: shutter_speed_presets
  label: Shutter Speed Presets
  kind: action
  command: "OSD:BF:{Data}"
  params:
    - name: Data
      type: integer
      enum: [2, 3, 4, 5, 6, 7]
      description: "2=1/100, 3=1/120, 4=1/250, 5=1/500, 6=1/1000, 7=1/2000"
- id: gain_value
  label: Gain Value
  kind: action
  command: "OGU:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["08h", "09h", "0Ah", "0Bh", "0Ch", "0Dh", "0Eh", "0Fh", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h", "18h", "19h", "1Ah", "1Bh", "1Ch", "1Dh", "1Eh", "1Fh", "20h", "21h", "22h", "23h", "24h", "25h", "26h", "27h", "28h", "29h", "2Ah", "2Bh", "2Ch", "2Dh", "2Eh", "2Fh", "30h", "31h", "32h", "80h"]
      description: "0dB-9dB-18dB-42dB or AGC On (80h)"
- id: frame_mix
  label: Frame Mix
  kind: action
  command: "OSI:28:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: gain_boost_ae
  label: AE Gain Boost
  kind: action
  command: "OSD:69:{Data}"
  params:
    - name: Data
      type: integer
      enum: ["01", "02", "03", "04", "05", "06"]
      description: "6dB, 12dB, 18dB, 24dB, 30dB, 36dB"
- id: ae_gain_offset
  label: AE Gain Offset
  kind: action
  command: "OSA:65:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["00h", "06h", "0Ch", "12h", "18h", "80h"]
      description: "Off, +6dB, +12dB, +18dB, +24dB, Auto"
- id: ae_gain_limit
  label: AE Gain Limit
  kind: action
  command: "OSE:74:{Data}"
  params:
    - name: Data
      type: integer
      enum: ["00", "01", "02", "03"]
      description: "Off, 6dB, 12dB, 18dB"
- id: ae_gain_limit_enable
  label: AE Gain Limit Enable
  kind: action
  command: "OSE:73:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: dnr_level
  label: DNR Level
  kind: action
  command: "OSM:40:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "LOW, MID, HIGH"
- id: dnr_axis_x
  label: DNR Axis X
  kind: action
  command: "OSJ:D0:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: dnr_axis_y
  label: DNR Axis Y
  kind: action
  command: "OSJ:D1:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: nd_filter
  label: ND Filter
  kind: action
  command: "OFT:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3, 8]
      description: "Through, 1/4 ND, 1/16 ND, 1/64 ND, Auto"
- id: nd_filter_query
  label: ND Filter Query
  kind: query
  command: "OSJ:D2"
  params: []
- id: day_night_ptz
  label: Day/Night (PTZ)
  kind: action
  command: "#D6{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"

# --- Picture (White Balance, Detail, Gamma) ---
- id: white_balance_mode
  label: White Balance Mode
  kind: action
  command: "OAW:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 9]
      description: "0=ATW, 1=AWC A, 2=AWC B, 4=PRESET 3200K, 5=PRESET 5600K, 9=VAR"
- id: awb_trigger
  label: AWB Trigger
  kind: action
  command: "OWS"
  params: []
- id: abb_trigger
  label: ABB Trigger
  kind: action
  command: "OAS"
  params: []
- id: red_gain
  label: Red Gain
  kind: action
  command: "OSI:1E:{Data}"
  params:
    - name: Data
      type: hex
      range: "1h-Ah"
      description: "1 to 10"
- id: blue_gain
  label: Blue Gain
  kind: action
  command: "OSI:1F:{Data}"
  params:
    - name: Data
      type: hex
      range: "1h-Ah"
      description: "1 to 10"
- id: color_temp
  label: Color Temperature
  kind: action
  command: "OSI:20:{Data1}:{Data2}"
  params:
    - name: Data1
      type: hex
      range: "007D0h-03A98h"
      description: "2000K to 15000K"
    - name: Data2
      type: hex
      enum: ["0h", "1h", "2h"]
      description: "Valid, Under, Over"
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "QSJ:4A"
  params: []
- id: r_gain_fine
  label: R Gain Fine
  kind: action
  command: "OSG:39:{Data}"
  params:
    - name: Data
      type: hex
      range: "738h-8C8h"
      description: "-200 to 0 to +200"
- id: b_gain_fine
  label: B Gain Fine
  kind: action
  command: "OSG:3A:{Data}"
  params:
    - name: Data
      type: hex
      range: "738h-8C8h"
      description: "-200 to 0 to +200"
- id: atw_speed
  label: ATW Speed
  kind: action
  command: "OSJ:0C:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: atw_tracking_speed
  label: ATW Tracking Speed
  kind: action
  command: "OSI:25:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "0=Normal, 1=Slow, 2=Fast"
- id: master_pedestal
  label: Master Pedestal
  kind: action
  command: "OSJ:0D:{Data}"
  params:
    - name: Data
      type: hex
      range: "76h-8Ah"
      description: "-10 to 0 to +10"
- id: r_pedestal
  label: R Pedestal
  kind: action
  command: "OSJ:0E:{Data}"
  params:
    - name: Data
      type: hex
      range: "76h-8Ah"
      description: "-10 to 0 to +10"
- id: detail_gain
  label: Detail Gain
  kind: action
  command: "OSD:B0:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h, 1Dh-80h-E3h"
      description: "OFF, -99% to 0 to 99%"
- id: detail_crisp
  label: Detail Crisp
  kind: action
  command: "OSJ:0B:{Data}"
  params:
    - name: Data
      type: hex
      range: "61h-9Fh"
      description: "-31 to 0 to +31"
- id: detail_frequency
  label: Detail Frequency
  kind: action
  command: "OSJ:0F:{Data}"
  params:
    - name: Data
      type: hex
      range: "738h-8C8h"
      description: "-200 to 0 to +200"
- id: detail
  label: Detail
  kind: action
  command: "ODT:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Off, On, On"
- id: v_detail_level
  label: V Detail Level
  kind: action
  command: "OSA:30:{Data}"
  params:
    - name: Data
      type: hex
      range: "61h-9Fh"
      description: "-31 to 0 to +31"
- id: detail_bandwidth
  label: Detail Bandwidth
  kind: action
  command: "OSJ:12:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-3Ch"
      description: "0 to 60"
- id: noise_suppress
  label: Noise Suppress
  kind: action
  command: "OSD:A1:{Data}"
  params:
    - name: Data
      type: hex
      range: "79h-87h"
      description: "-7 to 0 to +7"
- id: skin_tone_detail
  label: Skin Tone Detail
  kind: action
  command: "OSA:40:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: skin_tone_crisp
  label: Skin Tone Crisp
  kind: action
  command: "OSD:A3:{Data}"
  params:
    - name: Data
      type: hex
      range: "80h-9Fh"
      description: "0 to +31"
- id: gamma_type
  label: Gamma Type
  kind: action
  command: "OSJ:D7:{Data}"
  params:
    - name: Data
      type: integer
      enum: ["00", "01", "02", "03", "04"]
      description: "HD, Normal, Cinema1, Cinema2, Still Like"
- id: gamma_correction
  label: Gamma Correction
  kind: action
  command: "OSA:6A:{Data}"
  params:
    - name: Data
      type: hex
      range: "67h-94h"
      description: "0.30 to 0.35 to 0.55 to 0.75"
- id: black_gamma
  label: Black Gamma
  kind: action
  command: "OSE:33:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "OFF, LOW, MID, HIGH"
- id: black_gamma_range
  label: Black Gamma Range
  kind: action
  command: "OSA:2D:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 2, 3, 4, 5]
      description: "Off, Auto, Low, Mid, High"
- id: black_gamma_point
  label: Black Gamma Point
  kind: action
  command: "OSA:2E:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: knee_point
  label: Knee Point
  kind: action
  command: "OSA:2A:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-13h"
      description: "90% to 109%"
- id: knee_mode
  label: Knee Mode
  kind: action
  command: "OSD:3A:{Data}"
  params:
    - name: Data
      type: integer
      enum: ["00", "01", "02"]
      description: "Off, Low, High"

# --- Matrix (color phase/saturation per pair) ---
- id: matrix_type
  label: Matrix Type
  kind: action
  command: "OSE:31:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 3, 4]
      description: "NORMAL, USER, Professional"
- id: matrix_linear_table
  label: Matrix Linear Table
  kind: action
  command: "OSJ:4F:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: matrix_axis_rb
  label: Matrix R-G/B R-B
  kind: action
  command: "OSD:A4:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
      description: "-63 to 0 to 63 (R-G, R-B)"
- id: matrix_axis_gr
  label: Matrix G-R/G-B
  kind: action
  command: "OSD:A5:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_axis_br
  label: Matrix B-R/B-G
  kind: action
  command: "OSD:A6:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_axis_mg
  label: Matrix B_Mg Saturation/Phase
  kind: action
  command: "OSD:80:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_phase
  label: Matrix B_Mg Phase
  kind: action
  command: "OSD:81:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_sat
  label: Matrix Mg Saturation
  kind: action
  command: "OSD:82:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_phase_b
  label: Matrix Mg Phase
  kind: action
  command: "OSD:83:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_r_sat
  label: Matrix Mg_R Saturation
  kind: action
  command: "OSD:84:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_r_phase
  label: Matrix Mg_R Phase
  kind: action
  command: "OSD:85:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_r_r_sat
  label: Matrix Mg_R_R Saturation
  kind: action
  command: "OSD:9A:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_mg_r_r_phase
  label: Matrix Mg_R_R Phase
  kind: action
  command: "OSD:9B:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_sat
  label: Matrix R Saturation
  kind: action
  command: "OSD:86:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_phase
  label: Matrix R Phase
  kind: action
  command: "OSD:87:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_r_yl_sat
  label: Matrix R_R_Yl Saturation
  kind: action
  command: "OSD:9C:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_r_yl_phase
  label: Matrix R_R_Yl Phase
  kind: action
  command: "OSD:9D:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_yl_sat
  label: Matrix R_Yl Saturation
  kind: action
  command: "OSD:88:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_yl_phase
  label: Matrix R_Yl Phase
  kind: action
  command: "OSD:89:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_yl_yl_sat
  label: Matrix R_Yl_Yl Saturation
  kind: action
  command: "OSD:9E:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_r_yl_yl_phase
  label: Matrix R_Yl_Yl Phase
  kind: action
  command: "OSD:9F:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_sat
  label: Matrix Yl Saturation
  kind: action
  command: "OSD:8A:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_phase
  label: Matrix Yl Phase
  kind: action
  command: "OSD:8B:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_yl_g_sat
  label: Matrix Yl_Yl_G Saturation
  kind: action
  command: "OSJ:1C:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_yl_g_phase
  label: Matrix Yl_Yl_G Phase
  kind: action
  command: "OSJ:1D:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_g_sat
  label: Matrix Yl_G Saturation
  kind: action
  command: "OSD:8C:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_yl_g_phase
  label: Matrix Yl_G Phase
  kind: action
  command: "OSD:8D:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_g_sat
  label: Matrix G Saturation
  kind: action
  command: "OSD:8E:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_g_phase
  label: Matrix G Phase
  kind: action
  command: "OSD:8F:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_g_cy_sat
  label: Matrix G_Cy Saturation
  kind: action
  command: "OSD:90:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_g_cy_phase
  label: Matrix G_Cy Phase
  kind: action
  command: "OSD:91:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_cy_sat
  label: Matrix Cy Saturation
  kind: action
  command: "OSD:92:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_cy_phase
  label: Matrix Cy Phase
  kind: action
  command: "OSD:93:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_cy_b_sat
  label: Matrix Cy_B Saturation
  kind: action
  command: "OSD:94:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_cy_b_phase
  label: Matrix Cy_B Phase
  kind: action
  command: "OSD:95:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_b_sat
  label: Matrix B Saturation
  kind: action
  command: "OSD:96:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"
- id: matrix_b_phase
  label: Matrix B Phase
  kind: action
  command: "OSD:97:{Data}"
  params:
    - name: Data
      type: hex
      range: "41h-BFh"

# --- Lens ---
- id: focus_mode
  label: Focus Mode (Auto/Manual)
  kind: action
  command: "OAF:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Manual, 1=Auto"
- id: focus_mode_ptz
  label: Focus Mode (PTZ)
  kind: action
  command: "#D1{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Manual, 1=Auto"
- id: focus_adjustment
  label: Focus Adjustment Mode
  kind: action
  command: "OSJ:D8:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Normal, Stable, Stable2"
- id: af_response
  label: AF Response
  kind: action
  command: "OSE:70:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Disable, Enable"
- id: af_sensitivity
  label: AF Sensitivity
  kind: action
  command: "OSD:B3:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Disable, Enable"
- id: digital_zoom_max
  label: Digital Zoom Max
  kind: action
  command: "OSE:7A:{Data}"
  params:
    - name: Data
      type: integer
      range: "02-10"
      description: "x2 to x10"
- id: digital_extender
  label: Digital Extender
  kind: action
  command: "OSJ:4E:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "OFF, x1.4, x2.0"
- id: focus_position_query
  label: Focus Position Query
  kind: query
  command: "QSJ:3D"
  params: []
- id: digital_zoom_ratio
  label: Digital Zoom Ratio
  kind: action
  command: "OSE:76:{Data}"
  params:
    - name: Data
      type: integer
      range: "0100-9999"
      description: "x1.00 to x99.99"
- id: ois_mode
  label: OIS Mode
  kind: action
  command: "OIS:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "UE30/UE40/UE50: 0=Off, 1=O.I.S; UE80: 0=Off, 1=OIS STABLE (or 2=OIS PAN/TILT)"
- id: zoom_drive_ptz
  label: Zoom Drive (PTZ)
  kind: action
  command: "#Z{Data}"
  params:
    - name: Data
      type: integer
      range: "01-99"
      description: "01-49=Wide Max to Wide Min, 50=Stop, 51-99=Tele Min to Tele Max"
- id: zoom_drive_absolute_ptz
  label: Zoom Drive Absolute (PTZ)
  kind: action
  command: "#AXZ{Data}"
  params:
    - name: Data
      type: hex
      range: "555h-FFFh"
      description: "Wide to Tele"
- id: focus_drive_ptz
  label: Focus Drive (PTZ)
  kind: action
  command: "#F{Data}"
  params:
    - name: Data
      type: integer
      range: "01-99"
      description: "01-49=Near Max to Near Min, 50=Stop, 51-99=Far Min to Far Max"
- id: focus_drive_absolute_ptz
  label: Focus Drive Absolute (PTZ)
  kind: action
  command: "#AXF{Data}"
  params:
    - name: Data
      type: hex
      range: "555h-FFFh"
      description: "Near to Far"
- id: focus_push_auto
  label: Focus Push Auto
  kind: action
  command: "OSE:69:1"
  params: []
- id: af_area_position
  label: AF Area Position
  kind: action
  command: "OSJ:28:{Data1}:{Data2}"
  params:
    - name: Data1
      type: hex
      range: "00h-64h"
      description: "H Pos 0% to 100%"
    - name: Data2
      type: hex
      range: "00h-64h"
      description: "V Pos 0% to 100%"
- id: iris_absolute_ptz
  label: Iris Drive Absolute (PTZ)
  kind: action
  command: "#AXI{Data}"
  params:
    - name: Data
      type: hex
      range: "555h-FFFh"
      description: "Iris Close to Iris Open"
- id: iris_drive_ptz
  label: Iris Drive (PTZ)
  kind: action
  command: "#I{Data}"
  params:
    - name: Data
      type: integer
      range: "01-99"
      description: "01=Iris Close, 99=Iris Open"
- id: iris_drive
  label: Iris Drive
  kind: action
  command: "ORV:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-3FFh"
      description: "Iris Close to Iris Open"
- id: iris_query
  label: Iris Query
  kind: query
  command: "QSD:4F"
  params: []
- id: lens_position_request
  label: Lens Position Request (PTZ)
  kind: query
  command: "#LPI"
  params: []
- id: lens_position_continuous
  label: Lens Position Continuous (PTZ)
  kind: action
  command: "#LPC{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "0=Off, 1=On"
- id: iris_f_value_query
  label: Iris F-Value Query
  kind: query
  command: "QIF"
  params: []
- id: zoom_position_query_ptz
  label: Zoom Position Query (PTZ)
  kind: query
  command: "#GZ"
  params: []
- id: focus_position_query_ptz
  label: Focus Position Query (PTZ)
  kind: query
  command: "#GF"
  params: []
- id: iris_position_query_ptz
  label: Iris Position Query (PTZ)
  kind: query
  command: "#GI"
  params: []

# --- System ---
- id: frequency
  label: Frequency
  kind: action
  command: "OSE:77:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "59.94Hz, 50.00Hz, 24Hz, 23.98Hz"
- id: format
  label: Format
  kind: action
  command: "OSA:87:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["1h", "2h", "4h", "5h", "7h", "8h", "Ah", "10h", "11h", "14h", "15h", "16h", "17h", "18h", "19h", "1Ah", "1Bh", "21h", "22h", "23h"]
      description: "Various 720p/1080i/1080p/2160p frame rates"
- id: horizontal_phase
  label: Horizontal Phase
  kind: action
  command: "OHP:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-3FFh"
      description: "-206 to +49"
- id: installation_tally
  label: Installation Tally
  kind: action
  command: "OSJ:54:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: hdmi_color_space
  label: HDMI Color Space
  kind: action
  command: "OSJ:55:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: rgb_range
  label: RGB Range
  kind: action
  command: "OSJ:C1:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: audio_level_adjust
  label: Audio Level Adjust
  kind: action
  command: "OSJ:F4:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-FFh"
- id: wireless_remote_control_ptz
  label: Wireless Remote Control (PTZ)
  kind: action
  command: "#WLC{Data1}"
  params:
    - name: Data1
      type: integer
      enum: [0, 1]
      description: "Disable, Enable"
- id: remote_id_ptz
  label: Remote ID (PTZ)
  kind: action
  command: "#RID{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "Cam1, Cam2, Cam3, Cam4"
- id: fan_speed_ptz
  label: Fan Speed (PTZ)
  kind: action
  command: "#FAN{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "Auto, High, Mid, Low"
- id: fan_status_query_ptz
  label: Fan Status Query (PTZ)
  kind: query
  command: "#FS1"
  params: []
- id: osd_status
  label: OSD Status
  kind: action
  command: "OSJ:D3:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: osd_tally
  label: OSD Tally
  kind: action
  command: "OSJ:D4:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: privacy_mode
  label: Privacy Mode
  kind: action
  command: "OSJ:DC:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: audio_send
  label: Audio Send
  kind: action
  command: "OSJ:F3:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: auto_tracking_enable
  label: Auto Tracking Enable
  kind: action
  command: "OSL:B6:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: auto_tracking_mode
  label: Auto Tracking Mode
  kind: action
  command: "OSL:B7:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Off, Full Body, Upper Body"
- id: auto_tracking_display
  label: Auto Tracking Display
  kind: action
  command: "OSL:B8:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: auto_tracking_status_query
  label: Auto Tracking Status Query
  kind: query
  command: "QSL:BB"
  params: []
- id: auto_tracking_start_stop
  label: Auto Tracking Start/Stop
  kind: action
  command: "OSL:BC:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Stop, Start"
- id: auto_tracking_setting
  label: Auto Tracking Setting
  kind: action
  command: "OSL:BD:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Disable, Enable"
- id: auto_tracking_mask_h_start
  label: Auto Tracking Mask H Start
  kind: action
  command: "OSL:BE:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-438h"
      description: "0 (No Mask) to 1080"
- id: auto_tracking_mask_h_end
  label: Auto Tracking Mask H End
  kind: action
  command: "OSL:BF:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-438h"
- id: auto_tracking_mask_v_start
  label: Auto Tracking Mask V Start
  kind: action
  command: "OSL:C0:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-780h"
      description: "0 (No Mask) to 1920"
- id: auto_tracking_mask_v_end
  label: Auto Tracking Mask V End
  kind: action
  command: "OSL:C1:{Data}"
  params:
    - name: Data
      type: hex
      range: "000h-780h"
- id: auto_tracking_target
  label: Auto Tracking Target
  kind: action
  command: "OSL:C2:{Data}"
  params:
    - name: Data
      type: integer
      enum: [1, 2, 3]
      description: "Preset2, Preset3, None"
- id: cropping_enable
  label: Cropping Enable
  kind: action
  command: "OSM:3D:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "DISABLE, ENABLE"
- id: cropping_output
  label: Cropping Output
  kind: action
  command: "OSM:3E:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "OFF, ON"

# --- Output ---
- id: hdmi_output_format
  label: HDMI Output Format
  kind: action
  command: "OSJ:21:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["1h", "2h", "4h", "5h", "7h", "8h", "Ah", "10h", "11h", "14h", "15h", "16h", "22h", "23h"]
      description: "Various HDMI frame rates"
- id: hdmi_sdi_output_level
  label: HDMI/SDI Output Level
  kind: action
  command: "OSI:29:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Level A, Level B"
- id: sdi_output_format
  label: SDI Output Format
  kind: action
  command: "OSJ:25:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["1h", "2h", "4h", "5h", "10h", "11h", "14h", "15h", "16h", "17h", "18h", "19h", "1Ah", "1Bh", "21h", "22h", "23h"]
      description: "Various SDI frame rates"
- id: sdi_color_format
  label: SDI Color Format
  kind: action
  command: "OSE:68:{Data}"
  params:
    - name: Data
      type: integer
      enum: [2, 4]
      description: "YPbPr(422), YPbPr(420)"
- id: color_bar
  label: Color Bar
  kind: action
  command: "DCB:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Camera, Colorbar"
- id: color_bar_type
  label: Color Bar Type
  kind: action
  command: "OSD:BA:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Type2 (Full Bar/EBU), Type1 (SMPTE)"
- id: audio_emphasis
  label: Audio Emphasis
  kind: action
  command: "OSJ:27:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Off, Low, Normal"
- id: audio_overlay
  label: Audio Overlay
  kind: action
  command: "OSA:D0:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: audio_input_select
  label: Audio Input Select
  kind: action
  command: "OSA:D1:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 3]
      description: "Mic, Line"
- id: audio_input_level
  label: Audio Input Level
  kind: action
  command: "OSA:D5:{Data1}:{Data2}"
  params:
    - name: Data1
      type: integer
      enum: [0, 1]
      description: "CH1, CH2"
    - name: Data2
      type: hex
      range: "5Ch-8Ch"
      description: "-36dB to 0dB to +12dB"
- id: audio_alc
  label: Audio ALC
  kind: action
  command: "OSA:D2:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: osd_mix_output
  label: OSD Mix Output
  kind: action
  command: "OSE:7B:{Data}"
  params:
    - name: Data
      type: hex
      enum: ["00h", "01h", "02h", "10h", "20h", "80h"]
      description: "OSD Mix Off, 3G SDI On, HDMI On, IP/NDI|HX On, 12G SDI On, NDI On"
- id: osd_mix_ip
  label: OSD Mix IP
  kind: action
  command: "OSE:75:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: osd_mix_ndi_hx
  label: OSD Mix NDI|HX
  kind: action
  command: "OSA:88:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_enable_ptz
  label: Tally Enable (PTZ)
  kind: action
  command: "#TAE{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Disable, Enable"
- id: tally_pan_limit
  label: Tally Pan Limit
  kind: action
  command: "OSJ:D9:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_tilt_limit
  label: Tally Tilt Limit
  kind: action
  command: "OSJ:DA:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_zoom_limit
  label: Tally Zoom Limit
  kind: action
  command: "OSJ:DB:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_brightness
  label: Tally Brightness
  kind: action
  command: "OSA:D3:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Low, Mid, High"
- id: tally_red
  label: Tally Red
  kind: action
  command: "TLR:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_ptz_da
  label: Tally DA (PTZ)
  kind: action
  command: "#DA{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_green
  label: Tally Green
  kind: action
  command: "TLG:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_request_ptz
  label: Tally Request (PTZ)
  kind: query
  command: "#TAA"
  params: []
- id: tally_lamp_ptz
  label: Tally Lamp (PTZ)
  kind: action
  command: "#LMP{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: tally_led_r
  label: Tally LED Red
  kind: action
  command: "OSJ:41:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
- id: tally_led_g
  label: Tally LED Green
  kind: action
  command: "OSJ:42:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]

# --- Pan/Tilt ---
- id: install_position
  label: Install Position
  kind: action
  command: "#INS{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Desktop, Hanging"
- id: pan_tilt_speed_mode
  label: Pan/Tilt Speed Mode
  kind: action
  command: "OSJ:2D:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "Normal (60deg/s), Fast1 (90deg/s), Fast2 (180deg/s)"
- id: pt_speed_adjust_auto
  label: P/T Speed Adjust Auto
  kind: action
  command: "OSJ:A2:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: pt_speed_adjust_ramp_curve
  label: P/T Speed Adjust Ramp Curve
  kind: action
  command: "OSJ:A3:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-1Eh"
- id: pt_speed_adjust_ramp_curve_2
  label: P/T Speed Adjust Ramp Curve 2
  kind: action
  command: "OSJ:A4:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-1Eh"
- id: pt_speed_pan_max
  label: P/T Pan Max Speed
  kind: action
  command: "OSJ:A5:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-FFh"
- id: pt_speed_tilt_max
  label: P/T Tilt Max Speed
  kind: action
  command: "OSJ:A6:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-FFh"
- id: slow_pan_tilt_ptz
  label: Slow Pan/Tilt (PTZ)
  kind: action
  command: "#SWZ{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: auto_pan
  label: Auto Pan
  kind: action
  command: "OAZ:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: auto_pan_dwell
  label: Auto Pan Dwell
  kind: action
  command: "OSJ:A7:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: standby_function
  label: Standby Function
  kind: action
  command: "OSJ:45:{Data}"
  params:
    - name: Data
      type: integer
      enum: [1, 2, 3]
      description: "Standby, Home, Preset"
- id: standby_preset_number
  label: Standby Preset Number
  kind: action
  command: "OSJ:46:{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
      description: "Preset001 to Preset100"
- id: pan_drive_ptz
  label: Pan Drive (PTZ)
  kind: action
  command: "#P{Data}"
  params:
    - name: Data
      type: integer
      range: "01-99"
      description: "01-49 Left Max to Stop, 50 Stop, 51-99 Stop to Right Max"
- id: tilt_drive_ptz
  label: Tilt Drive (PTZ)
  kind: action
  command: "#T{Data}"
  params:
    - name: Data
      type: integer
      range: "01-99"
      description: "01-49 Down Max to Stop, 50 Stop, 51-99 Stop to Up Max"
- id: pan_tilt_drive_ptz
  label: Pan/Tilt Drive (PTZ)
  kind: action
  command: "#PTS{Data1}{Data2}"
  params:
    - name: Data1
      type: integer
      range: "01-99"
    - name: Data2
      type: integer
      range: "01-99"
- id: pan_tilt_absolute_position_ptz
  label: Pan/Tilt Absolute Position (PTZ)
  kind: action
  command: "#APC{Data1}{Data2}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
      description: "Pan CCW Limit to CW Limit (center 8000h)"
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
      description: "Tilt UP to DOWN Limit"
- id: pan_tilt_relative_position_ptz
  label: Pan/Tilt Relative Position (PTZ)
  kind: action
  command: "#RPC{Data1}{Data2}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
- id: absolute_preset_set_ptz
  label: Absolute Preset Set (PTZ)
  kind: action
  command: "#APS{Data1}{Data2}{Data3}{Data4}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
      description: Pan position
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
      description: Tilt position
    - name: Data3
      type: hex
      range: "00h-1Dh"
      description: Preset Speed 1-30
    - name: Data4
      type: integer
      enum: [0, 1, 2]
      description: Speed Table SLOW/MID/FAST
- id: relative_preset_set_ptz
  label: Relative Preset Set (PTZ)
  kind: action
  command: "#RPS{Data1}{Data2}{Data3}{Data4}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
    - name: Data3
      type: hex
      range: "00h-1Dh"
    - name: Data4
      type: integer
      enum: [0, 1, 2]
- id: limit_clear_ptz
  label: Limit Clear/Set (PTZ)
  kind: action
  command: "#LC{Data1}{Data2}"
  params:
    - name: Data1
      type: integer
      enum: [1, 2, 3, 4]
      description: "Tilt Up, Tilt Down, Pan Left, Pan Right"
    - name: Data2
      type: integer
      enum: [0, 1]
      description: "Release, Set"
- id: limit_drive_ptz
  label: Limit Drive (PTZ)
  kind: action
  command: "#L{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3, 4]
      description: "Release, Tilt Up, Tilt Down, Pan Left, Pan Right"
- id: high_speed_pan_ptz
  label: High Speed Pan (PTZ)
  kind: action
  command: "#HP{Data}"
  params:
    - name: Data
      type: hex
      range: "7F00h-8100h"
      description: "-256 Left Max, 8000h Stop, +256 Right Max"
- id: high_speed_tilt_ptz
  label: High Speed Tilt (PTZ)
  kind: action
  command: "#HT{Data}"
  params:
    - name: Data
      type: hex
      range: "7F00h-8100h"
      description: "-256 Down Max, 8000h Stop, +256 Up Max"
- id: high_speed_pan_tilt_ptz
  label: High Speed Pan/Tilt (PTZ)
  kind: action
  command: "#HPT{Data1}{Data2}"
  params:
    - name: Data1
      type: hex
      range: "7F00h-8100h"
    - name: Data2
      type: hex
      range: "7F00h-8100h"
- id: high_speed_absolute_ptz
  label: High Speed Absolute Move (PTZ)
  kind: action
  command: "#HAC{Data1}{Data2}{Data3}{Data4}{Data5}{Data6}{Data7}{Data8}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
      description: Pan position
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
      description: Tilt position
    - name: Data3
      type: hex
      range: "01h-FFh"
      description: Pan speed
    - name: Data4
      type: hex
      range: "01h-FFh"
      description: Tilt speed
    - name: Data5
      type: hex
      range: "01h-FFh"
      description: Pan Rise Accel
    - name: Data6
      type: hex
      range: "01h-FFh"
      description: Pan Fall Accel
    - name: Data7
      type: hex
      range: "01h-FFh"
      description: Tilt Rise Accel
    - name: Data8
      type: hex
      range: "01h-FFh"
      description: Tilt Fall Accel

# --- Preset ---
- id: preset_speed_table
  label: Preset Speed Table/Time
  kind: action
  command: "OSJ:29:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_speed_table_ptz
  label: Preset Speed Table (PTZ)
  kind: action
  command: "#PST{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 2]
- id: preset_speed_unit_ptz
  label: Preset Speed Unit (PTZ)
  kind: action
  command: "#UPVS{Data}"
  params:
    - name: Data
      type: integer
      range: "000, 250-999, 001-063"
      description: "Speed Unit: 30 Max (000) or 1-30 Slow-Fast (250-999); Time: 1-99s (001h-063h)"
- id: preset_speed_auto
  label: Preset Speed Auto
  kind: action
  command: "OSJ:A8:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_speed_pan_ramp
  label: Preset Speed Pan Ramp
  kind: action
  command: "OSJ:A9:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-1Eh"
- id: preset_speed_tilt_ramp
  label: Preset Speed Tilt Ramp
  kind: action
  command: "OSJ:AA:{Data}"
  params:
    - name: Data
      type: hex
      range: "00h-1Eh"
- id: preset_speed_pan_max
  label: Preset Speed Pan Max
  kind: action
  command: "OSJ:AB:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-FFh"
- id: preset_speed_tilt_max
  label: Preset Speed Tilt Max
  kind: action
  command: "OSJ:AC:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-FFh"
- id: preset_pan_accel_time
  label: Preset Pan Accel Time
  kind: action
  command: "OSJ:AD:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
      description: "0.1s to 10.0s"
- id: preset_tilt_accel_time
  label: Preset Tilt Accel Time
  kind: action
  command: "OSJ:AE:{Data}"
  params:
    - name: Data
      type: hex
      range: "01h-64h"
- id: preset_play_mode
  label: Preset Play Mode
  kind: action
  command: "OSE:71:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2]
      description: "MODE A, MODE B, MODE C"
- id: preset_freeze_during_recall
  label: Preset Freeze During Recall
  kind: action
  command: "OSE:7C:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_recall_position_update
  label: Preset Recall Position Update
  kind: action
  command: "OSJ:2B:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_recall_reset_hold
  label: Preset Recall Reset/Hold
  kind: action
  command: "OSJ:2C:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_position_update
  label: Preset Position Update
  kind: action
  command: "OSJ:5B:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_playback_complete
  label: Preset Playback Complete Setting
  kind: action
  command: "OSJ:D5:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_recall_complete_notify
  label: Preset Recall Complete Notify
  kind: action
  command: "OSE:7D:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Mode A, Mode B"
- id: preset_refresh_ptz
  label: Preset Refresh (PTZ)
  kind: action
  command: "#PRF{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: preset_recall_ptz
  label: Preset Recall (PTZ)
  kind: action
  command: "#R{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_set_ptz
  label: Preset Set/Store (PTZ)
  kind: action
  command: "#M{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_clear_ptz
  label: Preset Clear (PTZ)
  kind: action
  command: "#C{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_entry_status_ptz
  label: Preset Entry Status (PTZ)
  kind: query
  command: "#PE{Data1}"
  params:
    - name: Data1
      type: hex
      range: "00h-02h"
      description: Multiple (40 preset blocks)
- id: preset_play_status_ptz
  label: Preset Play Status (PTZ)
  kind: query
  command: "#S"
  params: []
- id: preset_name_set
  label: Preset Name Set
  kind: action
  command: "OSJ:35:{Data1}:{Data2}"
  params:
    - name: Data1
      type: integer
      range: "00-99"
    - name: Data2
      type: string
      description: 15-char ASCII preset name
- id: preset_recall_cam
  label: Preset Recall
  kind: action
  command: "OSJ:36:{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_set_cam
  label: Preset Set
  kind: action
  command: "OSJ:37"
  params: []
- id: preset_delete_cam
  label: Preset Delete
  kind: action
  command: "OSJ:39:{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_speed_set_cam
  label: Preset Speed Set
  kind: action
  command: "OSJ:3A:{Data}"
  params:
    - name: Data
      type: integer
      range: "00-99"
- id: preset_clear_all_cam
  label: Preset Clear All
  kind: action
  command: "OSJ:3B"
  params: []
- id: preset_group_status_query
  label: Preset Group Status Query
  kind: query
  command: "QSJ:3C:{Data1}"
  params:
    - name: Data1
      type: hex
      range: "00h-0Bh"

# --- OSD ---
- id: osd_menu_status
  label: OSD Menu Status
  kind: action
  command: "DUS:{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Off, On"
- id: osd_menu_page
  label: OSD Menu Page
  kind: action
  command: "DPG:1"
  params: []
- id: osd_menu_enter
  label: OSD Menu Enter
  kind: action
  command: "DIT:1"
  params: []
- id: osd_menu_up
  label: OSD Menu Up
  kind: action
  command: "DUP:1"
  params: []
- id: osd_menu_down
  label: OSD Menu Down
  kind: action
  command: "DDW:1"
  params: []
- id: osd_menu_right
  label: OSD Menu Right
  kind: action
  command: "DRT:1"
  params: []
- id: osd_menu_left
  label: OSD Menu Left
  kind: action
  command: "DLT:1"
  params: []

# --- Remote Controller ---
- id: remote_controller_info
  label: Remote Controller Info Display
  kind: action
  command: "OSJ:3E:{Data}"
  params:
    - name: Data
      type: string
      description: Up to 40 chars
- id: remote_controller_clear
  label: Remote Controller Info Clear
  kind: action
  command: "OSJ:3F"
  params: []
- id: remote_controller_query
  label: Remote Controller Info Query
  kind: query
  command: "QSJ:40"
  params: []

# --- Maintenance ---
- id: error_status_query
  label: Error Status Query
  kind: query
  command: "QER"
  params: []
- id: error_detail_query
  label: Error Detail Query
  kind: query
  command: "QSI:46"
  params: []
- id: detailed_error_query_ptz
  label: Detailed Error Query (PTZ)
  kind: query
  command: "#RER"
  params: []

# --- Others ---
- id: model_id_query
  label: Model ID Query
  kind: query
  command: "QID"
  params: []
- id: software_version_query
  label: Software Version Query
  kind: query
  command: "QSV"
  params: []
- id: software_version_query_ptz
  label: Software Version Query (PTZ)
  kind: query
  command: "#QSV{Data1}"
  params:
    - name: Data1
      type: integer
      range: "0-9"
      description: "CPU subsystem selector"
- id: power_ptz
  label: Power (PTZ)
  kind: action
  command: "#O{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
      description: "Standby, PowerOn"
- id: power_status
  label: Power Status Update Notification
  kind: feedback
  command: "p{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1]
- id: resolution_ptz
  label: Resolution (PTZ)
  kind: action
  command: "#RZL{Data}"
  params:
    - name: Data
      type: integer
      enum: [0, 1, 2, 3]
      description: "640x360, 320x180, 1280x720, 1920x1080"
- id: camera_title
  label: Camera Title
  kind: action
  command: "OSJ:5C:{Data}"
  params:
    - name: Data
      type: string
      description: Up to 40 chars ASCII

# --- Convenient Commands (PTZ) ---
- id: convenient_ptz_gain
  label: Convenient PTZ Gain/Color Temp/Shutter
  kind: query
  command: "#PTG"
  params: []
- id: convenient_ptz_video
  label: Convenient PTZ Video Status
  kind: query
  command: "#PTV"
  params: []
- id: convenient_ptz_detail
  label: Convenient PTZ Lens Detail
  kind: query
  command: "#PTD"
  params: []
- id: convenient_ptz_speed_low
  label: Convenient PTZ Speed (Low Precision)
  kind: action
  command: "#HV1{Data1}{Data2}{Data3}{Data4}"
  params:
    - name: Data1
      type: integer
      range: "00-99"
      description: Pan speed
    - name: Data2
      type: integer
      range: "00-99"
      description: Tilt speed
    - name: Data3
      type: integer
      range: "00-99"
      description: Zoom speed
    - name: Data4
      type: integer
      range: "00-99"
      description: Focus speed
- id: convenient_ptz_speed_high
  label: Convenient PTZ Speed (High Precision)
  kind: action
  command: "#HV2{Data1}{Data2}{Data3}{Data4}"
  params:
    - name: Data1
      type: hex
      range: "0000h, 7F00h-8100h"
      description: Pan high-precision speed
    - name: Data2
      type: hex
      range: "0000h, 7F00h-8100h"
      description: Tilt high-precision speed
    - name: Data3
      type: hex
      range: "0000h, 7F00h-8100h"
      description: Zoom high-precision speed
    - name: Data4
      type: integer
      range: "00-99"
      description: Focus speed
- id: convenient_ptz_absolute_move
  label: Convenient PTZ Absolute Move
  kind: action
  command: "#HA1{Data1}{Data2}{Data3}{Data4}{Data5}{Data6}{Data7}"
  params:
    - name: Data1
      type: hex
      range: "0000h-FFFFh"
      description: Pan position
    - name: Data2
      type: hex
      range: "0000h-FFFFh"
      description: Tilt position
    - name: Data3
      type: hex
      range: "00h-1Dh"
      description: Preset Speed 1-30
    - name: Data4
      type: integer
      enum: [0, 2]
      description: "Speed Table SLOW/FAST"
    - name: Data5
      type: hex
      range: "555h-FFFh"
      description: Zoom Wide to Tele
    - name: Data6
      type: hex
      range: "01h-64h"
      description: Zoom Speed 1-100
    - name: Data7
      type: hex
      range: "555h-FFFh"
      description: Focus Near to Far
```

## Feedbacks
```yaml
- id: power_state_update
  type: enum
  values: [on, off]
  description: Update notification `p1` (on), `p0` (off)
- id: scene_file_update
  type: enum
  values: ["full_auto", "scene1", "scene2", "scene3", "scene4"]
  description: Update notification `OSF:[Data]`
- id: color_bar_update
  type: enum
  values: [camera, colorbar]
  description: Update notification `DCB:[Data]`
- id: awb_complete
  type: enum
  values: [success, error]
  description: Update notification `OWS` (success) or `ER3:OWS` (error)
- id: abb_complete
  type: enum
  values: [success, error]
  description: Update notification `OAS` (success) or `ER3:OAS` (error)
- id: lens_position_update
  type: string
  description: Update notification `lPI[ZZZ][FFF][III]` (3-digit zoom, focus, iris positions)
- id: preset_playback_complete
  type: integer
  description: Update notification `q<Preset-1>` after preset recall finishes
- id: error_info
  type: string
  description: `#RER` response - 00h (no error) or various error codes (03h, 21h, 22h, 24h, 25h, 29h, 31h, 33h, 36h, 40h, 41h, 42h, 43h, 45h, 47h, 50h, 52h, 57h, 58h)
- id: error_status
  type: enum
  values: [normal, fan_error, other_error]
  description: `QER` response
- id: error_detail
  type: flags
  description: `QSI:46` - bit flags for Fan, High Temp, Lens, Pan/Tilt, Sensor errors
```

## Variables
```yaml
- id: pan_tilt_absolute_position
  type: hex_pair
  range: "0000h-FFFFh"
  description: Pan and tilt 16-bit absolute positions
- id: zoom_position
  type: hex
  range: "555h-FFFh"
  description: Absolute zoom position
- id: focus_position
  type: hex
  range: "555h-FFFh"
  description: Absolute focus position
- id: iris_position
  type: hex
  range: "555h-FFFh"
  description: Absolute iris position
- id: color_temperature_kelvin
  type: integer
  range: "2000-15000"
  description: Color temperature in K
- id: gain_db
  type: hex
  range: "08h-32h, 80h"
  description: Gain 0dB to 42dB or AGC On (80h)
```

## Events
```yaml
- id: version_info_post
  description: Version information posted in 60-second cycles
  payload: "#QSV response"
- id: error_info_post
  description: Error information posted in 30-second cycles when camera detects error
  payload: "#RER response; restored notification `Error Code 00:Normal`"
- id: lens_position_post
  description: Lens position posted in 300ms cycles when enabled via `#LPC1`
  payload: "lPI[ZZZ][FFF][III] format"
- id: preset_playback_complete_post
  description: Posted when preset playback completes (immediate HTTP response was `s<Preset-1>`)
  payload: "q<Preset-1>"
- id: awb_abb_complete_post
  description: Posted when AWB/ABB completes
  payload: "OWS (AWB success), OAS (ABB success), ER3:OWS/ER3:OAS (error)"
- id: event_session_start
  description: Camera returns 204 No Content in response to event start
  trigger: "POST /cgi-bin/event?connect=start&my_port=<Port>&uid=0"
- id: event_session_stop
  description: Camera returns 204 No Content in response to event stop
  trigger: "POST /cgi-bin/event?connect=stop&my_port=<Port>&uid=0"
- id: session_count
  description: `GET /cgi-bin/man_session?command=get` returns `Event session:<count>`; max 5 terminals
```

## Macros
```yaml
# Camera information batch acquisition
- id: camera_info_batch
  description: Fetch camera info in a single HTTP request
  url: "http://<IP Address>/live/camdata.html"
  response: "200 OK with camera information body"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing procedures found in source -->
```

## Notes
Command framing: `ptz` commands use `#` prefix (0x23) and `[CR]` (0x0D) terminator; `cam` commands use `[STX]` (0x02) prefix and `[ETX]` (0x03) terminator with `:` before data. Over IP (HTTP CGI), neither framing wrapper is required.

Over IP: two CGI endpoints. PTZ commands go to `http://<IP>/cgi-bin/aw_ptz?cmd=<Command>&res=1`. Camera commands go to `http://<IP>/cgi-bin/aw_cam?cmd=<Command>&res=1`. Response is `200 OK "<Command>"` in HTTP message body. `#` characters may need to be URL-encoded as `%23`.

Pan/Tilt commands require 40ms gap between commands. Keep-Alive cannot be set on HTTP connections. Commands that change settings should not be sent at regular intervals.

Update notifications: device pushes to a TCP port specified by the client in the `/cgi-bin/event?connect=start` request. Update notification info wrapped in a variable-length frame (max 504 bytes) with reserve bytes, then `[CR][LF]<Command Response>[CR][LF]`. Maximum 5 simultaneous terminal sessions.

Error codes: ER1 (unsupported command — `eR1:<cmd>` for ptz, `ER1:<cmd>` for cam), ER2 (busy — standby or busy, same pattern), ER3 (outside acceptable range — `eR3:<cmd>` / `ER3:<cmd>`).

Power is only controlled via the PTZ `#O` command (Standby=0, PowerOn=1); no `cam`-type power command in the catalogue.

<!-- UNRESOLVED: TCP port number for HTTP CGI endpoint not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial-only devices and full half-duplex wiring details beyond 9600/8/N/1/none not stated -->

## Provenance

```yaml
source_domains:
  - eww.pass.panasonic.co.jp
source_urls:
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE80/AW-UE80UE50UE40_InterfaceSpecification_E.pdf
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/UE150/AW-UE150HE145_InterfaceSpecification_E.pdf
retrieved_at: 2026-07-02T03:26:43.269Z
last_checked_at: 2026-07-07T11:48:29.872Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:48:29.872Z
matched_actions: 256
action_count: 256
confidence: medium
summary: "All 256 spec actions matched verbatim commands in source; transport parameters fully documented; comprehensive coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP TCP port number not stated in source (only CGI paths given)"
- "TCP port not stated in source"
- "no explicit safety warnings, interlocks, or power-on sequencing procedures found in source"
- "TCP port number for HTTP CGI endpoint not stated in source"
- "firmware version compatibility not stated in source"
- "serial-only devices and full half-duplex wiring details beyond 9600/8/N/1/none not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
