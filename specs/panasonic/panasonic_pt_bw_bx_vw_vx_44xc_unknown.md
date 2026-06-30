---
spec_id: admin/panasonic-pt-bw-bx-vw-vx-44xc
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic PT-BW/BX/VW/VX/44xC Projector Control Spec"
manufacturer: Panasonic
model_family: PT-BW
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - PT-BW
    - PT-BX
    - PT-VW
    - PT-VX
    - PT-44xC
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - eu.connect.panasonic.com
  - ap.connect.panasonic.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - "https://eu.connect.panasonic.com/sites/default/files/media/document/2022-09/PT-VW355N-VW350-VX425N-VX420%20RS-232C%20control%20spec.pdf"
  - https://ap.connect.panasonic.com/sites/default/files/media/document/2024-04/vz580_command.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T13:42:09.695Z
last_checked_at: 2026-06-25T16:04:11.598Z
generated_at: 2026-06-25T16:04:11.598Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in this excerpt"
  - "additional 100+ commands for edge blending, 3D settings, geometry correction, signal list management, sub memory, white balance, input resolution, clock phase, clamp position, keystone sub/linearity, curved/corner geometry correction, digital cinema reality, TV-system, dynamic RGB booster, Ye modulate, system daylight view, lamp relay 24H/week, date/time, NTP, OSD settings, closed caption, back color, startup logo, SDI settings, and more"
  - "50+ additional query commands for edge blending, geometry, white balance, lens position, zoom, shift, input resolution, lamp relay, lamp power, function button, sub memory, etc."
  - "unsolicited event notifications not documented in source excerpt"
  - "no multi-step macro sequences described in source"
  - "serial port baud rate, data bits, parity, stop bits not stated in this source excerpt"
  - "pinout / wiring diagram for RS-232C connector not in this excerpt"
  - "firmware version compatibility ranges not stated"
  - "full list of 200+ commands not individually enumerated — only major categories covered"
  - "edge blending commands (§2.130–2.161 range) not individually listed"
  - "geometry correction sub-commands for curved/corner/PC modes not individually listed"
  - "3D settings commands (§2.222–2.240) not individually listed"
verification:
  verdict: verified
  checked_at: 2026-06-25T16:04:11.598Z
  matched_actions: 84
  action_count: 84
  confidence: medium
  summary: "deterministic presence proof: 84/84 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-13
---

# Panasonic PT-BW/BX/VW/VX/44xC Projector Control Spec

## Summary
Serial (RS-232C) control protocol for Panasonic PT-BW, PT-BX, PT-VW, PT-VX, and PT-44xC series projectors. Commands use STX/ETX framing with 3-character command codes and optional parameters. Covers power, input selection, picture adjustment, lens control, keystone correction, geometry, lamp management, and extensive query commands.

<!-- UNRESOLVED: serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in this excerpt -->

## Transport
```yaml
protocols:
  - serial
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from PON/POF power commands
- routable     # inferred from IIS input select commands
- queryable    # inferred from QPW/QFZ/QSH/QIN etc. query commands
- levelable    # inferred from VCO/VCN/VBR color/contrast/brightness commands
```

## Actions
```yaml
- id: power_on
  label: Power On
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
      values: [RG1, RG2, VID, DVI, HD1, HD2, SD1, DL1, PC1, PC2, SVI, DDI]
      description: "RGB1, RGB2, VIDEO, DVI, HDMI1, HDMI2, SDI, DIGITAL LINK, COMPUTER1, COMPUTER2, S-VIDEO, DDI"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: OTS
  params:
    - name: pattern
      type: string
      description: "Two-digit pattern code (00=OFF, 01=White, 02=Black, 05=Window, 10=Color bar, 22=Red, 71=Focus Green, 80=3D-1)"

- id: on_screen
  label: On Screen Display
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
      description: "Numeric key 0-9"

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
      description: "0=Front/Floor, 1=Rear/Floor, 2=Front/Ceiling, 3=Rear/Ceiling"

- id: cooling_condition
  label: Cooling Condition
  kind: action
  command: ODR
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "9"]
      description: "0=Floor, 1=Ceiling, 2=Vertical Up, 3=Vertical Down, 9=Auto"

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

- id: lamp_power
  label: Lamp Power
  kind: action
  command: "VXX:LPWI1"
  params:
    - name: mode
      type: enum
      values: ["0000000000", "0000000001"]
      description: "ECO or NORMAL"

- id: projector_id
  label: Projector ID
  kind: action
  command: RIS
  params:
    - name: id
      type: string
      description: "4-digit ID string (0000=ALL, 0001-0064=ID1-64)"

- id: rs232c_response_id_all
  label: RS232C Response (ID ALL)
  kind: action
  command: RVS
  params:
    - name: state
      type: enum
      values: ["0", "1"]
      description: "0=OFF, 1=ON"

- id: picture_mode
  label: Picture Mode
  kind: action
  command: VPM
  params:
    - name: mode
      type: string
      description: "NAT, STT, DYN, CIN, GRA, DIC, USR, REC709"

- id: color
  label: Color
  kind: action
  command: VCO
  params:
    - name: value
      type: integer
      description: "-31 to +31 (right-justified, 0-padded)"

- id: tint
  label: Tint
  kind: action
  command: VTN
  params:
    - name: value
      type: integer
      description: "-31 to +31"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: OTE
  params:
    - name: value
      type: string
      description: "DEFAULT=1004, USER1=009, USER2=00X; or Kelvin 3200-9300 in 100K steps"

- id: contrast
  label: Contrast
  kind: action
  command: VCN
  params:
    - name: value
      type: integer
      description: "-31 to +31"

- id: brightness
  label: Brightness
  kind: action
  command: VBR
  params:
    - name: value
      type: integer
      description: "-31 to +31"

- id: gamma
  label: Gamma
  kind: action
  command: VGA
  params:
    - name: value
      type: string
      description: "1.8, 2.0, 2.2, DEFAULT, E, F"

- id: sharpness
  label: Sharpness
  kind: action
  command: VSR
  params:
    - name: value
      type: integer
      description: "0-15"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: VNS
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3"]
      description: "0=OFF, 1-3"

- id: dynamic_iris
  label: Dynamic Iris
  kind: action
  command: OAI
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4"]
      description: "0=OFF, 1-3, 4=USER"

- id: aspect
  label: Aspect
  kind: action
  command: VSE
  params:
    - name: mode
      type: string
      description: "0=DEFAULT/AUTO/VID AUTO, 1=4:3, 2=16:9, 5=THROUGH, 6=HV FIT, 9=H FIT, 10=V FIT"

- id: keystone
  label: Keystone
  kind: action
  command: OKS
  params:
    - name: value
      type: integer
      description: "-127 to +127"

- id: geometry
  label: Geometry
  kind: action
  command: "VXX:GMMI0"
  params:
    - name: mode
      type: enum
      values: ["0", "1", "2", "3", "4", "5"]
      description: "0=OFF, 1=KEYSTONE, 2=CURVED, 3=PC-1, 4=PC-2, 5=PC-3"

- id: zoom_horizontal
  label: Zoom Horizontal
  kind: action
  command: OZH
  params:
    - name: value
      type: integer
      description: "50-999"

- id: zoom_vertical
  label: Zoom Vertical
  kind: action
  command: OZV
  params:
    - name: value
      type: integer
      description: "50-999"

- id: zoom_both
  label: Zoom Both
  kind: action
  command: OZO
  params:
    - name: value
      type: integer
      description: "50-999"

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

- id: shift_horizontal
  label: Shift Horizontal
  kind: action
  command: VTH
  params:
    - name: value
      type: integer
      description: "0-4095 (depends on input resolution)"

- id: shift_vertical
  label: Shift Vertical
  kind: action
  command: VTV
  params:
    - name: value
      type: integer
      description: "0-4094 (depends on input resolution)"

- id: lens_shift_horizontal
  label: Lens Shift Horizontal
  kind: action
  command: "VXX:LNSI2"
  params:
    - name: direction_speed
      type: string
      description: "Speed(0=Slow,1=Normal,2=Fast) + Direction(+/-), e.g. 0000000001"

- id: lens_shift_vertical
  label: Lens Shift Vertical
  kind: action
  command: "VXX:LNSI3"
  params:
    - name: direction_speed
      type: string
      description: "Speed + Direction"

- id: lens_focus
  label: Lens Focus
  kind: action
  command: "VXX:LNSI4"
  params:
    - name: direction_speed
      type: string
      description: "Speed + Direction"

- id: lens_zoom
  label: Lens Zoom
  kind: action
  command: "VXX:LNSI5"
  params:
    - name: direction_speed
      type: string
      description: "Speed + Direction"

- id: lens_home_position
  label: Lens Home Position
  kind: action
  command: "VXX:LNSI1"
  params: []

- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "VXX:LNSI0"
  params: []

- id: standby_mode
  label: Standby Mode
  kind: action
  command: "VXX:STMI0"
  params:
    - name: mode
      type: enum
      values: ["0", "3"]
      description: "0=NORMAL, 3=ECO"

- id: function_button
  label: Function Button
  kind: action
  command: OFC
  params:
    - name: function
      type: enum
      values: ["0", "1", "2", "3", "4", "5", "6", "8", "9"]
      description: "0=DISABLE, 1=SYSTEM SELECTOR, 2=SYSTEM DAYLIGHT VIEW, 3=SUB MEMORY, 4=FREEZE, 5=P IN P, 6=WAVEFORM MONITOR, 8=LEFT/RIGHT SWAP, 9=ASPECT"

# UNRESOLVED: additional 100+ commands for edge blending, 3D settings, geometry correction, signal list management, sub memory, white balance, input resolution, clock phase, clamp position, keystone sub/linearity, curved/corner geometry correction, digital cinema reality, TV-system, dynamic RGB booster, Ye modulate, system daylight view, lamp relay 24H/week, date/time, NTP, OSD settings, closed caption, back color, startup logo, SDI settings, and more
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  query_command: QPW

- id: freeze_state
  type: enum
  values: [off, on]
  query_command: QFZ

- id: shutter_state
  type: enum
  values: [off, on]
  query_command: QSH

- id: input_select
  type: string
  query_command: QIN

- id: test_pattern
  type: string
  query_command: QTS

- id: on_screen
  type: enum
  values: [off, on]
  query_command: QOS

- id: installation
  type: string
  query_command: QSP

- id: cooling_condition
  type: string
  query_command: QDR

- id: high_altitude_mode
  type: enum
  values: [off, on]
  query_command: QFM

- id: lamp_select
  type: string
  query_command: QSL

- id: lamp_status
  type: string
  query_command: QLS

- id: lamp_control_status
  type: string
  query_command: "Q$S"

- id: projector_runtime
  type: string
  query_command: QST

- id: lamp1_runtime
  type: string
  query_command: "Q$L:1"

- id: lamp2_runtime
  type: string
  query_command: "Q$L:2"

- id: picture_mode
  type: string
  query_command: QPM

- id: color
  type: integer
  query_command: QVC

- id: tint
  type: integer
  query_command: QVT

- id: contrast
  type: integer
  query_command: QVR

- id: brightness
  type: integer
  query_command: QVB

- id: gamma
  type: string
  query_command: QGA

- id: sharpness
  type: integer
  query_command: QVS

- id: noise_reduction
  type: string
  query_command: QNS

- id: dynamic_iris
  type: string
  query_command: QAI

- id: aspect
  type: string
  query_command: QSE

- id: color_temperature
  type: string
  query_command: QTE

# UNRESOLVED: 50+ additional query commands for edge blending, geometry, white balance, lens position, zoom, shift, input resolution, lamp relay, lamp power, function button, sub memory, etc.
```

## Variables
```yaml
- id: projector_id
  type: string
  description: "4-byte ID string (AD01-AD64, ADZZ=ALL, AD0A-AD0Z=Groups)"
  set_command: RIS

- id: color_value
  type: integer
  min: -31
  max: 31
  set_command: VCO

- id: tint_value
  type: integer
  min: -31
  max: 31
  set_command: VTN

- id: contrast_value
  type: integer
  min: -31
  max: 31
  set_command: VCN

- id: brightness_value
  type: integer
  min: -31
  max: 31
  set_command: VBR

- id: sharpness_value
  type: integer
  min: 0
  max: 15
  set_command: VSR

- id: keystone_value
  type: integer
  min: -127
  max: 127
  set_command: OKS

- id: white_balance_low_red
  type: integer
  min: -127
  max: 127
  set_command: VOR

- id: white_balance_low_green
  type: integer
  min: -127
  max: 127
  set_command: VOG

- id: white_balance_low_blue
  type: integer
  min: -127
  max: 127
  set_command: VOB

- id: white_balance_high_red
  type: integer
  min: 0
  max: 255
  set_command: VHR

- id: white_balance_high_green
  type: integer
  min: 0
  max: 255
  set_command: VHG

- id: white_balance_high_blue
  type: integer
  min: 0
  max: 255
  set_command: VHB

- id: zoom_horizontal
  type: integer
  min: 50
  max: 999
  set_command: OZH

- id: zoom_vertical
  type: integer
  min: 50
  max: 999
  set_command: OZV

- id: white_gain
  type: integer
  min: 0
  max: 10
  set_command: VWH
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source excerpt
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: REMOTE2 has priority over serial commands; ER401 returned when REMOTE2 conflicts.
# Note: Commands may not execute during lamp warm-up (wait 60s after light source starts).
# Note: Wait 0.5s between consecutive commands after receiving response.
# Note: Set timeout to 10s or longer.
```

## Notes
- Command frame format: `STX (0x02) + ID (4 bytes) + ';' + Command (3 bytes) + [':' + Parameters] + ETX (0x03)`.
- ID field uses 4-byte ASCII strings: `ADZZ` (ALL), `AD01`-`AD64` (individual), `AD0A`-`AD0Z` (groups A-Z).
- Subcommand format uses 5-byte subcommand + 1-byte operation (`=` set, `_` add) + 1-byte sign (`+`/`-`) + 5-byte parameter value.
- Error responses: `ER401` (command rejected / REMOTE2 active / invalid state), `ER402` (parameter out of range).
- Parameters are right-justified, zero-padded (e.g. value `1` → `00001`).
- Source covers 200+ basic control commands (§2.1–2.229) and 80+ query commands (§2.262–2.350+).

<!-- UNRESOLVED: serial port baud rate, data bits, parity, stop bits not stated in this source excerpt -->
<!-- UNRESOLVED: pinout / wiring diagram for RS-232C connector not in this excerpt -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: full list of 200+ commands not individually enumerated — only major categories covered -->
<!-- UNRESOLVED: edge blending commands (§2.130–2.161 range) not individually listed -->
<!-- UNRESOLVED: geometry correction sub-commands for curved/corner/PC modes not individually listed -->
<!-- UNRESOLVED: 3D settings commands (§2.222–2.240) not individually listed -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - eu.connect.panasonic.com
  - ap.connect.panasonic.com
  - docs.connect.panasonic.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - "https://eu.connect.panasonic.com/sites/default/files/media/document/2022-09/PT-VW355N-VW350-VX425N-VX420%20RS-232C%20control%20spec.pdf"
  - https://ap.connect.panasonic.com/sites/default/files/media/document/2024-04/vz580_command.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T13:42:09.695Z
last_checked_at: 2026-06-25T16:04:11.598Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T16:04:11.598Z
matched_actions: 84
action_count: 84
confidence: medium
summary: "deterministic presence proof: 84/84 payloads verbatim in source; stratified Sonnet sample corroborated (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial port configuration (baud rate, data bits, parity, stop bits, flow control) not stated in this excerpt"
- "additional 100+ commands for edge blending, 3D settings, geometry correction, signal list management, sub memory, white balance, input resolution, clock phase, clamp position, keystone sub/linearity, curved/corner geometry correction, digital cinema reality, TV-system, dynamic RGB booster, Ye modulate, system daylight view, lamp relay 24H/week, date/time, NTP, OSD settings, closed caption, back color, startup logo, SDI settings, and more"
- "50+ additional query commands for edge blending, geometry, white balance, lens position, zoom, shift, input resolution, lamp relay, lamp power, function button, sub memory, etc."
- "unsolicited event notifications not documented in source excerpt"
- "no multi-step macro sequences described in source"
- "serial port baud rate, data bits, parity, stop bits not stated in this source excerpt"
- "pinout / wiring diagram for RS-232C connector not in this excerpt"
- "firmware version compatibility ranges not stated"
- "full list of 200+ commands not individually enumerated — only major categories covered"
- "edge blending commands (§2.130–2.161 range) not individually listed"
- "geometry correction sub-commands for curved/corner/PC modes not individually listed"
- "3D settings commands (§2.222–2.240) not individually listed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
