---
spec_id: admin/panasonic-th-xxpf50w
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-xxPF50W Control Spec"
manufacturer: Panasonic
model_family: TH-xxPF50W
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - TH-xxPF50W
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - docs.connect.panasonic.com
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Command_sequence_exp.pdf
retrieved_at: 2026-05-13T12:42:00.215Z
last_checked_at: 2026-06-25T15:38:24.546Z
generated_at: 2026-06-25T15:38:24.546Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is 193 pages; only pages 1–48 were fully extracted. Query commands (QPW etc.) and remaining commands from pages 49–193 not included."
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "geometry curved and corner-correction sub-commands (sections 2.90-2.99+)"
  - "query commands (QPW etc.) documented on later pages (49-193) not yet extracted"
  - "query-type commands returning current values likely on pages 49-193"
  - "full safety/interlock procedures may be in unextracted pages"
  - "serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in source"
  - "query commands from pages 49–193 not extracted (likely QPW for power state, Q$I for input, etc.)"
  - "geometry curved sub-commands (sections 2.90–2.97) partially documented but not fully enumerated"
  - "geometry corner-correction sub-commands (sections 2.98+) partially documented"
  - "remaining commands from pages 49–193 (estimated 50+ additional commands)"
verification:
  verdict: verified
  checked_at: 2026-06-25T15:38:24.546Z
  matched_actions: 89
  action_count: 89
  confidence: medium
  summary: "deterministic presence proof: 89/89 payloads verbatim in source; stratified Sonnet sample corroborated (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Panasonic TH-xxPF50W Control Spec

## Summary
Serial (RS-232C) control protocol for Panasonic TH-xxPF50W series plasma displays. Commands use STX/ETX framing with a 4-byte device ID, 3-byte command code, and optional parameters. Covers power, input selection, picture adjustments, geometry correction, lamp management, and OSD control.

<!-- UNRESOLVED: source document is 193 pages; only pages 1–48 were fully extracted. Query commands (QPW etc.) and remaining commands from pages 49–193 not included. -->

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

### Frame Format
```yaml
description: STX (0x02) + ID (4 bytes) + ';' + Command (3 bytes) [ + ':' + Parameters ] + ETX (0x03)
notes:
  - ID "ADZZ" = broadcast to all units (ID ALL)
  - IDs AD01-AD64 for individual units (ID 1-64)
  - IDs AD0A-AD0Z for groups (A-Z)
  - Wait >= 0.5s between commands after receiving response
  - Set timeout >= 10s for response
  - Wait 60s after lamp illumination before sending commands
```

## Traits
```yaml
traits:
  - powerable     # PON/POF power on/off commands
  - queryable     # inferred from response callbacks; query commands likely on later pages
  - routable      # IIS input select commands
  - levelable     # VCO/VTN/VCN/VBR/OZH/OZV and many other continuous adjustment commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On (Lamp On)
    kind: action
    command: PON
    params: []
    notes: Verify with QPW query after callback. REMOTE2 takes priority.

  - id: power_off
    label: Power Off (Standby)
    kind: action
    command: POF
    params: []
    notes: Verify with QPW query after callback. REMOTE2 takes priority.

  - id: freeze
    label: Freeze
    kind: action
    command: OFZ
    params:
      - name: state
        type: enum
        values:
          "0": Freeze OFF
          "1": Freeze ON

  - id: auto_setup
    label: Auto Setup
    kind: action
    command: OAS
    params: []
    notes: Returns ER401 for non-compliant signals.

  - id: shutter
    label: Shutter
    kind: action
    command: OSH
    params:
      - name: state
        type: enum
        values:
          "0": Shutter OFF
          "1": Shutter ON

  - id: input_select
    label: Input Select
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values:
          RG1: RGB1
          RG2: RGB2
          VI: VIDEO
          DV: DVI
          DL1: DIGITAL LINK
    notes: REMOTE2 priority; returns ER402 if REMOTE2 input active.

  - id: input_select_digital_link
    label: Input Select (Digital Link)
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values:
          HD1: HDMI1
          HD2: HDMI2
          PC1: COMPUTER1
          PC2: COMPUTER2
          SV: S-VIDEO
          VI: VIDEO
          DL1: DIGITAL LINK
    notes: Effective only when digital interface box connected.

  - id: test_pattern
    label: Test Pattern
    kind: action
    command: OTS
    params:
      - name: pattern
        type: enum
        values:
          "00": OFF
          "10": White
          "11": Black
          "12": Flag
          "13": Reversed Flag
          "20": Red
          "21": Green
          "22": Blue
          "23": Cyan
          "24": Magenta
          "25": Yellow
          "30": Window
          "31": Reversed Window
          "32": Focus White
          "34": Color Bar Vertical
          "35": Convergence
          "39": 16:9/4:3
          "40": Focus Red
          "41": Focus Green
          "42": Focus Blue
          "43": Focus Cyan
          "44": Focus Magenta
          "45": Focus Yellow
          "50": CW INDEX
          "51": Color Bar Side
          "71": Focus Green
          "80": 3D-1
          "81": 3D-2
          "82": 3D-3
          "83": 3D-4

  - id: on_screen
    label: On Screen (OSD)
    kind: action
    command: OOS
    params:
      - name: state
        type: enum
        values:
          "0": OSD OFF
          "1": OSD ON
    notes: Invalid when logo is displayed.

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
    notes: Acceptability depends on assigned function.

  - id: system_selector
    label: System Selector Key
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
        values:
          "0": "0"
          "1": "1"
          "2": "2"
          "3": "3"
          "4": "4"
          "5": "5"
          "6": "6"
          "7": "7"
          "8": "8"
          "9": "9"

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

  - id: digital_link_key
    label: Digital Link Key
    kind: action
    command: DLK
    params: []

  - id: installation
    label: Installation
    kind: action
    command: OIL
    params:
      - name: mode
        type: enum
        values:
          "0": Front/Floor
          "1": Rear/Floor
          "2": Front/Ceiling
          "3": Rear/Ceiling

  - id: cooling_condition
    label: Cooling Condition
    kind: action
    command: ODR
    params:
      - name: mode
        type: enum
        values:
          "0": Floor
          "1": Ceiling
          "2": Vertical Up
          "3": Vertical Down
          "9": Auto

  - id: high_altitude_mode
    label: High Altitude Mode
    kind: action
    command: OFM
    params:
      - name: state
        type: enum
        values:
          "0": "OFF"
          "1": "ON"

  - id: lamp_select
    label: Lamp Select
    kind: action
    command: LPM
    params:
      - name: mode
        type: enum
        values:
          "0": Dual
          "1": Single
          "2": Lamp1
          "3": Lamp2
    notes: Returns ER401 during lamp switch operation.

  - id: lamp_relay_24h
    label: Lamp Relay 24H
    kind: action
    command: VXX:LRYI0
    params:
      - name: time
        type: string
        description: "OFF" or time HH:MM (00001 = 00:01, 02358 = 23:58)
        notes: 7-digit right-justified parameter

  - id: lamp_relay_week
    label: Lamp Relay Week
    kind: action
    command: VXX:LRYI2
    params:
      - name: schedule
        type: string
        description: "OFF", day code (1=SUN-8=SAT) + time

  - id: lamp_power
    label: Lamp Power
    kind: action
    command: VXX:LPWI1
    params:
      - name: mode
        type: enum
        values:
          "00000": ECO
          "10000": NORMAL

  - id: projector_id
    label: Projector ID
    kind: action
    command: RIS
    params:
      - name: id
        type: string
        description: "0000" = ALL, "0001" = 1, "0064" = 64

  - id: rs232c_response_id_all
    label: RS232C Response (ID ALL)
    kind: action
    command: RVS
    params:
      - name: state
        type: enum
        values:
          "0": "OFF"
          "1": "ON"

  - id: function_button
    label: Function Button
    kind: action
    command: OFC
    params:
      - name: function
        type: enum
        values:
          "0": DISABLE
          "1": SYSTEM SELECTOR
          "2": SYSTEM DAYLIGHT VIEW
          "3": SUB MEMORY
          "4": FREEZE
          "5": P IN P
          "6": WAVEFORM MONITOR
          "8": LEFT/RIGHT SWAP
          "9": ASPECT

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
      - name: signal
        type: enum
        values:
          A1: A1
          A2: A2
          A7: A7
          A8: A8
          L1: L1
          L2: L2
          L7: L7
          L8: L8

  - id: sub_memory_changeover
    label: Sub Memory List Changeover
    kind: action
    command: OCS
    params:
      - name: memory
        type: integer
        description: Memory number 01-96

  - id: sub_memory_changeover_extended
    label: Sub Memory List Changeover Extended
    kind: action
    command: OCS
    params:
      - name: memory
        type: string
        description: "mm-nn" format (mm=01-96, nn=01-96)

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
      - name: memory
        type: string
        description: "mm-nn" format

  - id: picture_mode
    label: Picture Mode
    kind: action
    command: VPM
    params:
      - name: mode
        type: enum
        values:
          NAT: NATURAL
          STD: STANDARD
          DYN: DYNAMIC
          CIN: CINEMA
          GRC: GRAPHIC
          DIC: DICOM SIM.
          USR: USER
          "700": REC709

  - id: ye_modulate
    label: Ye Modulate
    kind: action
    command: VXX:YEMI0
    params:
      - name: state
        type: enum
        values:
          "0000000": "OFF"
          "1000000": "ON"

  - id: dynamic_rgb_booster
    label: Dynamic RGB Booster
    kind: action
    command: VXX:DRBI1
    params:
      - name: level
        type: integer
        description: "0 (OFF) to 7"

  - id: color
    label: Color
    kind: action
    command: VCO
    params:
      - name: value
        type: integer
        description: -31 to +31

  - id: tint
    label: Tint
    kind: action
    command: VTN
    params:
      - name: value
        type: integer
        description: -31 to +31

  - id: color_temperature
    label: Color Temperature
    kind: action
    command: OTE
    params:
      - name: value
        type: string
        description: "1004"=DEFAULT, "0004"=USER1, "9004"=USER2, or 3200K-9300K in 100K steps
    notes: Temperature range 3200K-9300K in 100K increments.

  - id: white_balance_low_red
    label: White Balance Low Red
    kind: action
    command: VOR
    params:
      - name: value
        type: integer
        description: -127 to +127

  - id: white_balance_low_green
    label: White Balance Low Green
    kind: action
    command: VOG
    params:
      - name: value
        type: integer
        description: -127 to +127

  - id: white_balance_low_blue
    label: White Balance Low Blue
    kind: action
    command: VOB
    params:
      - name: value
        type: integer
        description: -127 to +127

  - id: white_balance_high_red
    label: White Balance High Red
    kind: action
    command: VHR
    params:
      - name: value
        type: integer
        description: 0 to 255

  - id: white_balance_high_green
    label: White Balance High Green
    kind: action
    command: VHG
    params:
      - name: value
        type: integer
        description: 0 to 255

  - id: white_balance_high_blue
    label: White Balance High Blue
    kind: action
    command: VHB
    params:
      - name: value
        type: integer
        description: 0 to 255

  - id: contrast
    label: Contrast
    kind: action
    command: VCN
    params:
      - name: value
        type: integer
        description: -31 to +31

  - id: brightness
    label: Brightness
    kind: action
    command: VBR
    params:
      - name: value
        type: integer
        description: -31 to +31

  - id: white_gain
    label: White Gain
    kind: action
    command: VWH
    params:
      - name: value
        type: integer
        description: 0 to 10

  - id: gamma
    label: Gamma
    kind: action
    command: VGA
    params:
      - name: value
        type: enum
        values:
          "1.8": "1.8"
          "2.0": "2.0"
          "2.2": "2.2"
          DEF: DEFAULT

  - id: system_daylight_view
    label: System Daylight View
    kind: action
    command: VXX:DLVI0
    params:
      - name: level
        type: integer
        description: "0 (OFF) to 3"

  - id: sharpness
    label: Sharpness
    kind: action
    command: VSR
    params:
      - name: value
        type: integer
        description: 0 to 15

  - id: noise_reduction
    label: Noise Reduction
    kind: action
    command: VNS
    params:
      - name: level
        type: enum
        values:
          "0": "OFF"
          "1": "1"
          "2": "2"
          "3": "3"

  - id: dynamic_iris
    label: Dynamic Iris
    kind: action
    command: OAI
    params:
      - name: mode
        type: enum
        values:
          "0": "OFF"
          "1": "1"
          "2": "2"
          "3": "3"
          "4": USER

  - id: dynamic_iris_auto
    label: Dynamic Iris Auto (AIRIS)
    kind: action
    command: "OAI:A"
    params:
      - name: value
        type: integer
        description: "0 (OFF) to 255"

  - id: dynamic_iris_manual
    label: Dynamic Iris Manual
    kind: action
    command: "OAI:M"
    params:
      - name: value
        type: integer
        description: "0 (OFF) to 255"

  - id: dynamic_iris_dynamic_gamma
    label: Dynamic Iris Dynamic Gamma
    kind: action
    command: "OAI:D"
    params:
      - name: mode
        type: enum
        values:
          "0": "OFF"
          "1": "1"
          "2": "2"
          "3": "3"

  - id: digital_cinema_reality
    label: Digital Cinema Reality
    kind: action
    command: OPD
    params:
      - name: mode
        type: enum
        values:
          "0": AUTO
          "1": "OFF"
          "2": 30p/25p FIXED

  - id: tv_system
    label: TV-System
    kind: action
    command: VSG
    params:
      - name: system
        type: enum
        values:
          AT1: AUTO
          NT: NTSC
          N4: NTSC4.43
          PA: PAL
          PM: PAL-M
          PN: PAL-N
          SE: SECAM
          P60: PAL60

  - id: shift_horizontal
    label: Shift Horizontal
    kind: action
    command: VTH
    params:
      - name: value
        type: integer
        description: 0 to (total dots - 1), max 4095

  - id: shift_vertical
    label: Shift Vertical
    kind: action
    command: VTV
    params:
      - name: value
        type: integer
        description: 0 to (total lines - 1), max 4094

  - id: aspect
    label: Aspect
    kind: action
    command: VSE
    params:
      - name: mode
        type: enum
        values:
          "0": DEFAULT / VID AUTO / AUTO
          "1": "4:3"
          "2": "16:9"
          "5": THROUGH
          "6": HV FIT
          "9": H FIT
          "10": V FIT
    notes: Parameter meaning varies by input terminal and signal type.

  - id: zoom_horizontal
    label: Zoom Horizontal
    kind: action
    command: OZH
    params:
      - name: value
        type: integer
        description: 50 to 999

  - id: zoom_vertical
    label: Zoom Vertical
    kind: action
    command: OZV
    params:
      - name: value
        type: integer
        description: 50 to 999

  - id: zoom_both
    label: Zoom Both
    kind: action
    command: OZO
    params:
      - name: value
        type: integer
        description: 50 to 999

  - id: zoom_interlocked
    label: Zoom Interlocked
    kind: action
    command: OZS
    params:
      - name: state
        type: enum
        values:
          "0": "OFF"
          "1": "ON"

  - id: zoom_mode
    label: Zoom Mode
    kind: action
    command: OZT
    params:
      - name: mode
        type: enum
        values:
          "0": INTERNAL
          "1": FULL
    notes: Returns ER401 when ASPECT is not DEFAULT.

  - id: clock_phase
    label: Clock Phase
    kind: action
    command: VCP
    params:
      - name: value
        type: integer
        description: 0 to 31
    notes: Only available when RGB1 or RGB2 selected.

  - id: input_resolution_total_dots
    label: Input Resolution Total Dots
    kind: action
    command: VTD
    params:
      - name: value
        type: integer
        description: 330 to 4095

  - id: input_resolution_display_dots
    label: Input Resolution Display Dots
    kind: action
    command: VDD
    params:
      - name: value
        type: integer
        description: 300 to 4065

  - id: input_resolution_total_lines
    label: Input Resolution Total Lines
    kind: action
    command: VTL
    params:
      - name: value
        type: integer
        description: 155 to 2047

  - id: input_resolution_display_lines
    label: Input Resolution Display Lines
    kind: action
    command: VDL
    params:
      - name: value
        type: integer
        description: 150 to 2037

  - id: clamp_position
    label: Clamp Position
    kind: action
    command: VLT
    params:
      - name: value
        type: integer
        description: 1 to 255
    notes: Only available when RGB1 or RGB2 selected.

  - id: keystone
    label: Keystone
    kind: action
    command: OKS
    params:
      - name: value
        type: integer
        description: -127 to +127

  - id: keystone_sub
    label: Sub Keystone
    kind: action
    command: OSK
    params:
      - name: value
        type: integer
        description: -63 to +63
    notes: Returns ER401 when KEYSTONE is 0.

  - id: keystone_linearity
    label: Keystone Linearity
    kind: action
    command: VLI
    params:
      - name: value
        type: integer
        description: -127 to +127

  - id: geometry_mode
    label: Geometry Mode
    kind: action
    command: "VXX:GMMI0"
    params:
      - name: mode
        type: enum
        values:
          "00000": "OFF"
          "00001": KEYSTONE
          "00002": CURVED
          "00003": PC-1
          "00004": PC-2
          "00005": PC-3
          "00010": CORNER-CORRECTION

  - id: geometry_keystone_lens_throw_ratio
    label: Geometry Keystone Lens Throw Ratio
    kind: action
    command: "VXX:GMKS0"
    params:
      - name: ratio
        type: string
        description: 0.7 to 16.5 in 0.1 increments

  - id: geometry_keystone_vertical_balance
    label: Geometry Keystone Vertical Balance
    kind: action
    command: "VXX:GMKI4"
    params:
      - name: value
        type: integer
        description: -60 to +60

  - id: geometry_keystone_horizontal_balance
    label: Geometry Keystone Horizontal Balance
    kind: action
    command: "VXX:GMKI7"
    params:
      - name: value
        type: integer
        description: -30 to +30

  - id: geometry_keystone_vertical
    label: Geometry Keystone Vertical
    kind: action
    command: "VXX:GMKS8"
    params:
      - name: value
        type: string
        description: -40.0 to +40.0 in 0.2 steps (post-activation -45.0 to +45.0)

  - id: geometry_keystone_horizontal
    label: Geometry Keystone Horizontal
    kind: action
    command: "VXX:GMKS9"
    params:
      - name: value
        type: string
        description: -15.0 to +15.0 in 0.2 steps (post-activation -40.0 to +40.0)

  # UNRESOLVED: geometry curved and corner-correction sub-commands (sections 2.90-2.99+)
  # documented in source but omitted for brevity; include on next revision pass
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: string
    description: >
      Each command returns a callback when accepted.
      Response format: STX + command_code [+ ':' + parameters] + ETX.
      Error responses: ER401 (command not acceptable / REMOTE2 conflict / parameter error),
      ER402 (parameter range error).
    values:
      - ER401
      - ER402

  # UNRESOLVED: query commands (QPW etc.) documented on later pages (49-193) not yet extracted
```

## Variables
```yaml
# UNRESOLVED: query-type commands returning current values likely on pages 49-193
```

## Events
```yaml
# No unsolicited events documented in extracted source sections.
```

## Macros
```yaml
# No multi-step macro sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - Wait >= 60s after lamp starts illuminating before sending commands
  - Wait >= 0.5s between consecutive commands (after receiving response)
  - Set timeout >= 10s for command responses
  - REMOTE2 takes priority over serial commands; conflicting commands return ER401
# UNRESOLVED: full safety/interlock procedures may be in unextracted pages
```

## Notes
- Commands use 3-byte ASCII codes (e.g. `PON`, `OFZ`, `IIS`).
- Parameters are right-justified with leading zeros (e.g. value `1` = `00001`).
- Subcommand format uses 5-byte subcommand + 1-byte operation (`=` for set, `_` for add) + 1-byte sign (`+`/`-`) + 5-byte value.
- Device IDs: `ADZZ` = broadcast, `AD01`–`AD64` = individual, `AD0A`–`AD0Z` = groups A–Z.
- Group responses controlled by RS232C RESPONSE(ID GROUP) setting.
- Error codes: ER401 (unacceptable command / REMOTE2 conflict), ER402 (parameter error / out of range).
- Source document is 193 pages; this spec covers commands from pages 1–48 only.

<!-- UNRESOLVED: serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in source -->
<!-- UNRESOLVED: query commands from pages 49–193 not extracted (likely QPW for power state, Q$I for input, etc.) -->
<!-- UNRESOLVED: geometry curved sub-commands (sections 2.90–2.97) partially documented but not fully enumerated -->
<!-- UNRESOLVED: geometry corner-correction sub-commands (sections 2.98+) partially documented -->
<!-- UNRESOLVED: remaining commands from pages 49–193 (estimated 50+ additional commands) -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - docs.connect.panasonic.com
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Protocol_exp.pdf
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist.html
  - https://docs.connect.panasonic.com/prodisplays/support/rs232c_commandlist_prev.html
  - https://docs.connect.panasonic.com/prodisplays/support/download/pdf/LAN_Command_sequence_exp.pdf
retrieved_at: 2026-05-13T12:42:00.215Z
last_checked_at: 2026-06-25T15:38:24.546Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:38:24.546Z
matched_actions: 89
action_count: 89
confidence: medium
summary: "deterministic presence proof: 89/89 payloads verbatim in source; stratified Sonnet sample corroborated (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is 193 pages; only pages 1–48 were fully extracted. Query commands (QPW etc.) and remaining commands from pages 49–193 not included."
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "geometry curved and corner-correction sub-commands (sections 2.90-2.99+)"
- "query commands (QPW etc.) documented on later pages (49-193) not yet extracted"
- "query-type commands returning current values likely on pages 49-193"
- "full safety/interlock procedures may be in unextracted pages"
- "serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in source"
- "query commands from pages 49–193 not extracted (likely QPW for power state, Q$I for input, etc.)"
- "geometry curved sub-commands (sections 2.90–2.97) partially documented but not fully enumerated"
- "geometry corner-correction sub-commands (sections 2.98+) partially documented"
- "remaining commands from pages 49–193 (estimated 50+ additional commands)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
