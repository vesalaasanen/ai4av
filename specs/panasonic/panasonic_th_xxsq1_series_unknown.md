---
spec_id: admin/panasonic-th-xxsq1-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-xxSQ1 Series Control Spec"
manufacturer: Panasonic
model_family: "TH-xxSQ1 Series"
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - "TH-xxSQ1 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/275503_EQ1_SerialCommandList_Ver_2_01_en.pdf
  - https://docs.connect.panasonic.com/prodisplays
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T12:51:55.610Z
last_checked_at: 2026-06-25T15:38:26.551Z
generated_at: 2026-06-25T15:38:26.551Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial port parameters (baud rate, data bits, parity, stop bits, flow control) not stated in refined source"
  - "no TCP/IP or network control protocol documented in this extract"
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no distinct settable variable types identified beyond action params and query responses"
  - "no multi-step macro sequences documented in source"
  - "serial port configuration (baud rate, data bits, parity, stop bits) not in refined extract"
  - "full list of 493 commands spans 193 pages; this spec covers the primary control and query subset"
  - "extended control command details (section 3) not fully enumerated"
  - "3D settings, edge blending, P-in-P, masking, brightness calibration sub-commands documented but not fully enumerated here"
verification:
  verdict: verified
  checked_at: 2026-06-25T15:38:26.551Z
  matched_actions: 98
  action_count: 98
  confidence: medium
  summary: "deterministic presence proof: 98/98 payloads verbatim in source; stratified Sonnet sample corroborated (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Panasonic TH-xxSQ1 Series Control Spec

## Summary
Panasonic TH-xxSQ1 Series projector with RS-232C serial control. Protocol uses STX/ETX-framed ASCII commands with 3-byte command codes, 4-byte ID addressing (single, group, or broadcast), and optional parameters. Source covers basic control commands (sections 2.1–2.253), query commands (sections 2.262–2.493), and extended control commands (section 3).

<!-- UNRESOLVED: serial port parameters (baud rate, data bits, parity, stop bits, flow control) not stated in refined source -->
<!-- UNRESOLVED: no TCP/IP or network control protocol documented in this extract -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from PON/POF power on/off commands
  - queryable    # inferred from extensive Qxx query command set
  - routable     # inferred from IIS input select commands
  - levelable    # inferred from VCO/VTN/VBR/VCN color/tint/brightness/contrast controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On (Lamp On)
    kind: action
    command: PON
    params: []

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: POF
    params: []

  - id: freeze
    label: Freeze
    kind: action
    command: OFZ
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: auto_setup
    label: Auto Setup
    kind: action
    command: OAS
    params: []

  - id: shutter
    label: Shutter
    kind: action
    command: OSH
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: input_select
    label: Input Select
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values: [RGB1, RGB2, VIDEO, DIGITAL LINK, DVI, HDMI, SDI]
        description: Input source selection

  - id: input_select_digital_link
    label: Input Select (Digital Link)
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values: [HDMI1, HDMI2, COMPUTER1, COMPUTER2, S-VIDEO, VIDEO]
        description: Digital Link input selection

  - id: test_pattern
    label: Test Pattern
    kind: action
    command: OTS
    params:
      - name: pattern
        type: string
        description: "Two-digit pattern code (00=OFF, 05=Window, 22=Red, etc.)"

  - id: on_screen
    label: On Screen (OSD)
    kind: action
    command: OOS
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: menu_key
    label: Menu Key
    kind: action
    command: OMN
    params: []

  - id: enter_key
    label: Enter Key
    kind: action
    command: OEN
    params: []

  - id: up_key
    label: Up Key
    kind: action
    command: OCU
    params: []

  - id: down_key
    label: Down Key
    kind: action
    command: OCD
    params: []

  - id: left_key
    label: Left Key
    kind: action
    command: OCL
    params: []

  - id: right_key
    label: Right Key
    kind: action
    command: OCR
    params: []

  - id: default_key
    label: Default Key
    kind: action
    command: OST
    params: []

  - id: function_key
    label: Function Key
    kind: action
    command: FC1
    params: []

  - id: system_selector
    label: System Selector
    kind: action
    command: OSL
    params: []

  - id: aspect_key
    label: Aspect Key
    kind: action
    command: VS1
    params: []

  - id: numeric_key
    label: Numeric Key
    kind: action
    command: ONK
    params:
      - name: digit
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

  - id: status_key
    label: Status Key
    kind: action
    command: STS
    params: []

  - id: lens_focus_key
    label: Lens Focus Key
    kind: action
    command: OLF
    params: []

  - id: lens_shift_key
    label: Lens Shift Key
    kind: action
    command: OLH
    params: []

  - id: lens_zoom_key
    label: Lens Zoom Key
    kind: action
    command: OLZ
    params: []

  - id: installation
    label: Installation
    kind: action
    command: OIL
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=FRONT/FLOOR, 1=REAR/FLOOR, 2=FRONT/CEILING, 3=REAR/CEILING"

  - id: cooling_condition
    label: Cooling Condition
    kind: action
    command: ODR
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2", "3", "9"]
        description: "0=FLOOR, 1=CEILING, 2=VERTICAL UP, 3=VERTICAL DOWN, 9=AUTO"

  - id: high_altitude_mode
    label: High Altitude Mode
    kind: action
    command: OFM
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: lamp_select
    label: Lamp Select
    kind: action
    command: LPM
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=DUAL, 1=SINGLE, 2=LAMP1, 3=LAMP2"

  - id: lamp_relay_24h
    label: Lamp Relay 24H
    kind: action
    command: VXX:LRYI0
    params:
      - name: time
        type: string
        description: "7-digit time value (0000000=OFF, or HH:MM format e.g. 0235802=23:58)"

  - id: lamp_relay_week
    label: Lamp Relay Week
    kind: action
    command: VXX:LRYI2
    params:
      - name: day_time
        type: string
        description: "Day code + time (000000000=OFF, every day, or specific day)"

  - id: lamp_power
    label: Lamp Power
    kind: action
    command: VXX:LPWI1
    params:
      - name: mode
        type: string
        description: "00000=ECO, 00001=NORMAL, etc."

  - id: projector_id
    label: Projector ID
    kind: action
    command: RIS
    params:
      - name: id
        type: string
        description: "4-char ID (00=ALL, 01-64=individual, 0A-0Z=groups)"

  - id: rs232c_response_id_all
    label: RS232C Response (ID ALL)
    kind: action
    command: RVS
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: function_button
    label: Function Button
    kind: action
    command: OFC
    params:
      - name: function
        type: enum
        values: ["0", "1", "2", "3", "4", "5", "6", "8", "9"]
        description: "0=DISABLE, 1=SYSTEM SELECTOR, 2=SYSTEM DAYLIGHT VIEW, 3=SUB MEMORY, 4=FREEZE, 5=P IN P, 6=WAVEFORM MONITOR, 8=LEFT/RIGHT SWAP, 9=ASPECT"

  - id: signal_list_registration
    label: Signal List Registration
    kind: action
    command: OEM
    params: []

  - id: signal_list_delete
    label: Signal List Delete
    kind: action
    command: ODM
    params:
      - name: slot
        type: string
        description: "Slot ID (A1-A8, L1-L8)"

  - id: sub_memory_changeover
    label: Sub Memory List Changeover
    kind: action
    command: OCS
    params:
      - name: number
        type: string
        description: "Two-digit sub memory number (01-96)"

  - id: sub_memory_changeover_extended
    label: Sub Memory List Changeover (Extended)
    kind: action
    command: OCS
    params:
      - name: number
        type: string
        description: "mm-nn format sub memory number"

  - id: sub_memory_registration
    label: Sub Memory List Registration
    kind: action
    command: OES
    params: []

  - id: sub_memory_delete
    label: Sub Memory List Delete
    kind: action
    command: ODS
    params:
      - name: number
        type: string
        description: "mm-nn format sub memory number"

  - id: picture_mode
    label: Picture Mode
    kind: action
    command: VPM
    params:
      - name: mode
        type: enum
        values: [NAT, STD, DYN, CIN, GRA, DIC, USR, 709]
        description: "NAT=NATURAL, STD=STANDARD, DYN=DYNAMIC, CIN=CINEMA, GRA=GRAPHIC, DIC=DICOM SIM., USR=USER, 709=REC709"

  - id: color
    label: Color
    kind: action
    command: VCO
    params:
      - name: value
        type: integer
        description: "Range -31 to +31"

  - id: tint
    label: Tint
    kind: action
    command: VTN
    params:
      - name: value
        type: integer
        description: "Range -31 to +31"

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: OTE
    params:
      - name: value
        type: string
        description: "DEFAULT=1004, USER1=0009, USER2=0039; or Kelvin 3200-9300 in 100K steps"

  - id: white_balance_low_red
    label: White Balance Low Red
    kind: action
    command: VOR
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: white_balance_low_green
    label: White Balance Low Green
    kind: action
    command: VOG
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: white_balance_low_blue
    label: White Balance Low Blue
    kind: action
    command: VOB
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: white_balance_high_red
    label: White Balance High Red
    kind: action
    command: VHR
    params:
      - name: value
        type: integer
        description: "Range 0 to 255"

  - id: white_balance_high_green
    label: White Balance High Green
    kind: action
    command: VHG
    params:
      - name: value
        type: integer
        description: "Range 0 to 255"

  - id: white_balance_high_blue
    label: White Balance High Blue
    kind: action
    command: VHB
    params:
      - name: value
        type: integer
        description: "Range 0 to 255"

  - id: contrast
    label: Contrast
    kind: action
    command: VCN
    params:
      - name: value
        type: integer
        description: "Range -31 to +31"

  - id: brightness
    label: Brightness
    kind: action
    command: VBR
    params:
      - name: value
        type: integer
        description: "Range -31 to +31"

  - id: white_gain
    label: White Gain
    kind: action
    command: VWH
    params:
      - name: value
        type: integer
        description: "Range 0 to 10"

  - id: gamma
    label: Gamma
    kind: action
    command: VGA
    params:
      - name: value
        type: string
        description: "1.8, 2.0, 2.2, DEFAULT, DEF"

  - id: sharpness
    label: Sharpness
    kind: action
    command: VSR
    params:
      - name: value
        type: integer
        description: "Range 0 to 15"

  - id: noise_reduction
    label: Noise Reduction
    kind: action
    command: VNS
    params:
      - name: value
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=OFF, 1-3=levels"

  - id: dynamic_iris
    label: Dynamic Iris
    kind: action
    command: OAI
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2", "3", "4"]
        description: "0=OFF, 1-3=levels, 4=USER"

  - id: dynamic_iris_auto
    label: Dynamic Iris Auto Iris
    kind: action
    command: OAI:A
    params:
      - name: value
        type: integer
        description: "Range 0-255 for manual iris level"

  - id: dynamic_iris_manual
    label: Dynamic Iris Manual Iris
    kind: action
    command: OAI:M
    params:
      - name: value
        type: integer
        description: "Range 0-255"

  - id: dynamic_iris_dynamic_gamma
    label: Dynamic Iris Dynamic Gamma
    kind: action
    command: OAI:D
    params:
      - name: value
        type: enum
        values: ["0", "1", "2", "3"]
        description: "0=OFF, 1-3=levels"

  - id: digital_cinema_reality
    label: Digital Cinema Reality
    kind: action
    command: OPD
    params:
      - name: mode
        type: enum
        values: ["0", "1", "2"]
        description: "0=AUTO, 1=OFF, 2=30p/25pFIXED"

  - id: tv_system
    label: TV System
    kind: action
    command: VSG
    params:
      - name: system
        type: string
        description: "AT1=NTSC, AT2=NTSC4.43, NTS=PAL, NAL=PAL-M, PAN=PAL-N, SEC=SECAM, P60=PAL60, etc."

  - id: shift_horizontal
    label: Shift Horizontal
    kind: action
    command: VTH
    params:
      - name: value
        type: integer
        description: "Range 0 to (total dots - 1)"

  - id: shift_vertical
    label: Shift Vertical
    kind: action
    command: VTV
    params:
      - name: value
        type: integer
        description: "Range 0 to (total lines - 1)"

  - id: aspect
    label: Aspect
    kind: action
    command: VSE
    params:
      - name: mode
        type: string
        description: "Varies by input: 0=AUTO/DEFAULT/VID AUTO, 1=4:3, 2=16:9, 5=THROUGH, 6=HV FIT, 9=H FIT, 10=V FIT"

  - id: zoom_horizontal
    label: Zoom Horizontal
    kind: action
    command: OZH
    params:
      - name: value
        type: integer
        description: "Range 50 to 999"

  - id: zoom_vertical
    label: Zoom Vertical
    kind: action
    command: OZV
    params:
      - name: value
        type: integer
        description: "Range 50 to 999"

  - id: zoom_both
    label: Zoom Both
    kind: action
    command: OZO
    params:
      - name: value
        type: integer
        description: "Range 50 to 999"

  - id: zoom_interlocked
    label: Zoom Interlocked
    kind: action
    command: OZS
    params:
      - name: state
        type: enum
        values: ["0", "1"]
        description: "0=OFF, 1=ON"

  - id: zoom_mode
    label: Zoom Mode
    kind: action
    command: OZT
    params:
      - name: mode
        type: enum
        values: ["0", "1"]
        description: "0=INTERNAL, 1=FULL"

  - id: clock_phase
    label: Clock Phase
    kind: action
    command: VCP
    params:
      - name: value
        type: integer
        description: "Range 0 to 31"

  - id: keystone
    label: Keystone
    kind: action
    command: OKS
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: geometry
    label: Geometry
    kind: action
    command: VXX:GMMI0
    params:
      - name: mode
        type: string
        description: "00000=OFF, 00001=KEYSTONE, 00002=CURVED, 00003=PC-1, 00004=PC-2, 00005=PC-3, 00010=CORNER-CORRECTION"

  - id: display_language
    label: Display Language
    kind: action
    command: OLG
    params:
      - name: language
        type: string
        description: "Language code"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: [ON, OFF, "00", "01", "02", "03"]
    query_command: QPW
    description: "Returns current power state. 00=on, 01=standby, 02=eco standby, 03=cooling"

  - id: freeze_state
    label: Freeze State
    type: enum
    values: ["0", "1"]
    query_command: QFZ
    description: "0=OFF, 1=ON"

  - id: shutter_state
    label: Shutter State
    type: enum
    values: ["0", "1"]
    query_command: QSH

  - id: input_select
    label: Input Select
    type: string
    query_command: QIN

  - id: test_pattern
    label: Test Pattern State
    type: string
    query_command: QTS

  - id: on_screen
    label: On Screen State
    type: enum
    values: ["0", "1"]
    query_command: QOS

  - id: installation
    label: Installation Mode
    type: string
    query_command: QSP

  - id: lamp_select
    label: Lamp Select
    type: enum
    values: ["0", "1", "2", "3"]
    query_command: QSL
    description: "0=DUAL, 1=SINGLE, 2=LAMP1, 3=LAMP2"

  - id: lamp_status
    label: Lamp Status
    type: string
    query_command: QLS

  - id: projector_runtime
    label: Projector Runtime
    type: string
    query_command: QST

  - id: lamp1_runtime
    label: Lamp1 Runtime
    type: string
    query_command: "Q$L:1"

  - id: lamp2_runtime
    label: Lamp2 Runtime
    type: string
    query_command: "Q$L:2"

  - id: picture_mode
    label: Picture Mode
    type: string
    query_command: QPM

  - id: color
    label: Color
    type: string
    query_command: QVC

  - id: tint
    label: Tint
    type: string
    query_command: QVT

  - id: color_temperature
    label: Color Temperature
    type: string
    query_command: QTE

  - id: contrast
    label: Contrast
    type: string
    query_command: QVR

  - id: brightness
    label: Brightness
    type: string
    query_command: QVB

  - id: gamma
    label: Gamma
    type: string
    query_command: QGA

  - id: sharpness
    label: Sharpness
    type: string
    query_command: QVS

  - id: noise_reduction
    label: Noise Reduction
    type: string
    query_command: QNS

  - id: dynamic_iris
    label: Dynamic Iris
    type: string
    query_command: QAI

  - id: aspect
    label: Aspect
    type: string
    query_command: QSE

  - id: keystone
    label: Keystone
    type: string
    query_command: QKS
```

## Variables
```yaml
# UNRESOLVED: no distinct settable variable types identified beyond action params and query responses
```

## Events
```yaml
# Device returns callbacks (responses) after each command acceptance/rejection.
# Error responses: ER401 (parameter error / REMOTE2 effective), ER402 (invalid parameter range).
# No unsolicited event notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: Commands may return ER401 when REMOTE2 has priority.
# After lamp illumination starts, wait 60 seconds before sending commands.
# 0.5 second minimum gap between commands after receiving response.
# Set timeout to 10 seconds or longer for command responses.
```

## Notes
- Command format: `STX` + 4-byte ID + `;` + 3-byte command + [`:` + parameters] + `ETX`
- ID addressing: ADZZ=broadcast all, AD01-AD64=individual, AD0A-AD0Z=groups A-Z
- Subcommand format adds 5-byte subcommand + 1-byte operation (`=` set, `_` add) + 1-byte sign (`+`/`-`) + 5-byte parameter
- Parameters are right-justified, zero-padded (e.g. value 1 = `00001`)
- Response includes echo of command with result parameters
- Error codes: ER401 (parameter error or REMOTE2 conflict), ER402 (out-of-range)
- Extended control command format (section 3) uses 1-byte ID with `|` (0x7C) separator prefix
- Extended command header byte is 0xFE for heartbeat/ping

<!-- UNRESOLVED: serial port configuration (baud rate, data bits, parity, stop bits) not in refined extract -->
<!-- UNRESOLVED: full list of 493 commands spans 193 pages; this spec covers the primary control and query subset -->
<!-- UNRESOLVED: extended control command details (section 3) not fully enumerated -->
<!-- UNRESOLVED: 3D settings, edge blending, P-in-P, masking, brightness calibration sub-commands documented but not fully enumerated here -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - pna-b2b-storage-mkt.s3.amazonaws.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://pna-b2b-storage-mkt.s3.amazonaws.com/production/275503_EQ1_SerialCommandList_Ver_2_01_en.pdf
  - https://docs.connect.panasonic.com/prodisplays
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T12:51:55.610Z
last_checked_at: 2026-06-25T15:38:26.551Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:38:26.551Z
matched_actions: 98
action_count: 98
confidence: medium
summary: "deterministic presence proof: 98/98 payloads verbatim in source; stratified Sonnet sample corroborated (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial port parameters (baud rate, data bits, parity, stop bits, flow control) not stated in refined source"
- "no TCP/IP or network control protocol documented in this extract"
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no distinct settable variable types identified beyond action params and query responses"
- "no multi-step macro sequences documented in source"
- "serial port configuration (baud rate, data bits, parity, stop bits) not in refined extract"
- "full list of 493 commands spans 193 pages; this spec covers the primary control and query subset"
- "extended control command details (section 3) not fully enumerated"
- "3D settings, edge blending, P-in-P, masking, brightness calibration sub-commands documented but not fully enumerated here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
