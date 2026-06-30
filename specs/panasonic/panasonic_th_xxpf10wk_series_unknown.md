---
spec_id: admin/panasonic-th-xxpf10wk-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Panasonic TH-xxPF10WK Series Control Spec"
manufacturer: Panasonic
model_family: "TH-xxPF10WK Series"
aliases: []
compatible_with:
  manufacturers:
    - Panasonic
  models:
    - "TH-xxPF10WK Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - na.panasonic.com
  - docs.connect.panasonic.com
  - manualshelf.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://www.manualshelf.com/manual/panasonic/rs232-protocols/rs-232c-protocol-document-english.html
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T12:23:04.656Z
last_checked_at: 2026-06-25T15:38:22.780Z
generated_at: 2026-06-25T15:38:22.780Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model family overlap unclear — source doc covers projector-specific features (lens, keystone, edge blending) that may not apply to all TH-xxPF10WK models"
  - "serial port pinout and connector type not in refined source"
  - "baud rate, data bits, parity, stop bits, flow control not explicitly stated in refined source"
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "most adjustable parameters are represented as action params above."
  - "no macro sequences explicitly documented in source"
  - "power-on sequencing requirements not fully documented"
  - "extended control commands (section 3: lens control, self-check) not fully extracted"
  - "remaining query commands (2.328-2.400+) not individually listed — source has 269+ query commands"
  - "geometry curved/corner-correction sub-commands partially documented — source has ~20 geometry sub-commands"
  - "edge blending width/marker/black-level sub-commands not individually listed"
  - "audio control commands if any exist in later pages"
verification:
  verdict: verified
  checked_at: 2026-06-25T15:38:22.780Z
  matched_actions: 105
  action_count: 105
  confidence: medium
  summary: "deterministic presence proof: 105/105 payloads verbatim in source; stratified Sonnet sample corroborated (16 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Panasonic TH-xxPF10WK Series Control Spec

## Summary
Serial (RS-232C) control protocol for Panasonic TH-xxPF10WK series displays. Commands use a framed format with STX/ETX delimiters, a 4-byte projectable ID, 3-byte command codes, and optional parameters. Covers power control, input selection, picture adjustment, geometry correction, edge blending, and extensive query commands. Source document also references projector models PT-DZ870, PT-DW830, and PT-DX100.

<!-- UNRESOLVED: exact model family overlap unclear — source doc covers projector-specific features (lens, keystone, edge blending) that may not apply to all TH-xxPF10WK models -->
<!-- UNRESOLVED: serial port pinout and connector type not in refined source -->
<!-- UNRESOLVED: baud rate, data bits, parity, stop bits, flow control not explicitly stated in refined source -->

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
  - powerable     # inferred from PON/POF power commands
  - queryable     # inferred from extensive QUERY commands (QPW, QFZ, QSH, QIN, etc.)
  - routable       # inferred from input select commands (IIS)
  - levelable      # inferred from brightness, contrast, color, tint adjustment commands
```

## Actions
```yaml
actions:
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
        values:
          - "0"
          - "1"
        description: "0 = off, 1 = on"

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
        values:
          - "0"
          - "1"
        description: "0 = off, 1 = on"

  - id: input_select
    label: Input Select
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values:
          - RG1
          - RG2
          - VID
          - DVI
          - HDMI
          - DL1
          - SD1
        description: "RGB1, RGB2, VIDEO, DVI, HDMI, DIGITAL LINK, SDI"

  - id: input_select_digital_link
    label: Input Select (Digital Link)
    kind: action
    command: IIS
    params:
      - name: input
        type: enum
        values:
          - HD1
          - HD2
          - PC1
          - PC2
          - SVI
          - VID
        description: "HDMI1, HDMI2, COMPUTER1, COMPUTER2, S-VIDEO, VIDEO (via digital interface box)"

  - id: test_pattern
    label: Test Pattern
    kind: action
    command: OTS
    params:
      - name: pattern
        type: enum
        values:
          - "00"
          - "01"
          - "02"
          - "03"
          - "04"
          - "05"
          - "06"
          - "07"
          - "08"
          - "09"
          - "10"
          - "11"
          - "22"
          - "30"
          - "31"
          - "32"
          - "33"
          - "34"
          - "35"
          - "36"
          - "38"
          - "39"
          - "50"
          - "51"
          - "71"
          - "80"
          - "81"
          - "82"
          - "83"
        description: "Two-digit pattern code. 00=off, includes crosshatch, color bars, convergence, focus, etc."

  - id: on_screen
    label: On Screen Display
    kind: action
    command: OOS
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0 = off, 1 = on"

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

  - id: system_selector_key
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
          - "0"
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"
          - "6"
          - "7"
          - "8"
          - "9"

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
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "0=front/floor, 1=rear/floor, 2=front/ceiling, 3=rear/ceiling"

  - id: cooling_condition
    label: Cooling Condition
    kind: action
    command: ODR
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
          - "9"
        description: "0=floor, 1=ceiling, 2=vertical up, 3=vertical down, 9=auto"

  - id: high_altitude_mode
    label: High Altitude Mode
    kind: action
    command: OFM
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: lamp_select
    label: Lamp Select
    kind: action
    command: LPM
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "0=dual, 1=single, 2=lamp1, 3=lamp2"

  - id: lamp_relay_24h
    label: Lamp Relay 24H
    kind: action
    command: "VXX:LRYI0"
    params:
      - name: time
        type: string
        description: "Time value (0000000=off, or HH:MM format). 7-digit zero-padded right-justified."

  - id: lamp_relay_week
    label: Lamp Relay Week
    kind: action
    command: "VXX:LRYI2"
    params:
      - name: day
        type: string
        description: "000000000=off, 000000001=every day, or day-specific code."

  - id: lamp_power
    label: Lamp Power
    kind: action
    command: "VXX:LPWI1"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
        description: "0=eco, 1=normal"

  - id: projector_id
    label: Projector ID
    kind: action
    command: RIS
    params:
      - name: id
        type: string
        description: "4-character ID string (00=ALL, 01-64=individual, 01-99 range)"

  - id: rs232c_response_id_all
    label: RS232C Response ID ALL
    kind: action
    command: RVS
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: function_button
    label: Function Button
    kind: action
    command: OFC
    params:
      - name: function
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
          - "4"
          - "5"
          - "6"
          - "8"
          - "9"
        description: "0=disable, 1=system selector, 2=system daylight view, 3=sub memory, 4=freeze, 5=p-in-p, 6=waveform monitor, 8=left/right swap, 9=aspect"

  - id: picture_mode
    label: Picture Mode
    kind: action
    command: VPM
    params:
      - name: mode
        type: enum
        values:
          - NAT
          - STN
          - DYN
          - CIN
          - GRA
          - DIC
          - USR
          - "700"
          - "900"
        description: "NAT=natural, STN=standard, DYN=dynamic, CIN=cinema, GRA=graphic, DIC=dicom sim, USR=user, 700=rec709, 900=rec709 variant"

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
        description: "Preset names (DEFAULT, USER1, USER2) or Kelvin value 3200-9300 in 100K steps (4 chars right-justified)"

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
        type: enum
        values:
          - "1.8"
          - "2.0"
          - "2.2"
          - DEF
        description: "Gamma preset values. DEF=default"

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
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "0=off, 1-3=increasing levels"

  - id: dynamic_iris
    label: Dynamic Iris
    kind: action
    command: OAI
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
          - "4"
        description: "0=off, 1-3=levels, 4=user"

  - id: dynamic_iris_auto
    label: Dynamic Iris Auto Iris
    kind: action
    command: "OAI:A"
    params:
      - name: value
        type: integer
        description: "Range 0 (off) to 255"

  - id: dynamic_iris_manual
    label: Dynamic Iris Manual Iris
    kind: action
    command: "OAI:M"
    params:
      - name: value
        type: integer
        description: "Range 0 (off) to 255"

  - id: dynamic_iris_dynamic_gamma
    label: Dynamic Iris Dynamic Gamma
    kind: action
    command: "OAI:D"
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "0=off, 1-3=levels"

  - id: digital_cinema_reality
    label: Digital Cinema Reality
    kind: action
    command: OPD
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "1"
          - "2"
        description: "0=auto, 1=off, 2=30p/25p fixed"

  - id: tv_system
    label: TV System
    kind: action
    command: VSG
    params:
      - name: value
        type: enum
        values:
          - AT1
          - AT2
          - NTS
          - N44
          - PAL
          - PLM
          - PLN
          - SEC
          - P60
        description: "AT1/AT2=auto, NTS=NTSC, N44=NTSC4.43, PAL, PLM=PAL-M, PLN=PAL-N, SEC=SECAM, P60=PAL60"

  - id: shift_horizontal
    label: Shift Horizontal
    kind: action
    command: VTH
    params:
      - name: value
        type: integer
        description: "Range 0 to (total dots - 1), typically 0-4095"

  - id: shift_vertical
    label: Shift Vertical
    kind: action
    command: VTV
    params:
      - name: value
        type: integer
        description: "Range 0 to (total lines - 1), typically 0-4094"

  - id: aspect
    label: Aspect
    kind: action
    command: VSE
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "5"
          - "6"
          - "9"
          - "10"
        description: "0=default/auto, 1=4:3, 2=16:9, 5=through, 6=HV fit, 9=H fit, 10=V fit"

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
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: zoom_mode
    label: Zoom Mode
    kind: action
    command: OZT
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
        description: "0=internal, 1=full"

  - id: clock_phase
    label: Clock Phase
    kind: action
    command: VCP
    params:
      - name: value
        type: integer
        description: "Range 0 to 31"

  - id: input_resolution_total_dots
    label: Input Resolution Total Dots
    kind: action
    command: VTD
    params:
      - name: value
        type: integer
        description: "Range 330 to 4095"

  - id: input_resolution_display_dots
    label: Input Resolution Display Dots
    kind: action
    command: VDD
    params:
      - name: value
        type: integer
        description: "Range 300 to 4065"

  - id: input_resolution_total_lines
    label: Input Resolution Total Lines
    kind: action
    command: VTL
    params:
      - name: value
        type: integer
        description: "Range 155 to 2047"

  - id: input_resolution_display_lines
    label: Input Resolution Display Lines
    kind: action
    command: VDL
    params:
      - name: value
        type: integer
        description: "Range 150 to 2037"

  - id: clamp_position
    label: Clamp Position
    kind: action
    command: VLT
    params:
      - name: value
        type: integer
        description: "Range 1 to 255"

  - id: keystone
    label: Keystone
    kind: action
    command: OKS
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: keystone_sub
    label: Keystone Sub
    kind: action
    command: OSK
    params:
      - name: value
        type: integer
        description: "Range -63 to +63"

  - id: keystone_linearity
    label: Keystone Linearity
    kind: action
    command: VLI
    params:
      - name: value
        type: integer
        description: "Range -127 to +127"

  - id: geometry
    label: Geometry
    kind: action
    command: "VXX:GMMI0"
    params:
      - name: mode
        type: enum
        values:
          - "00000"
          - "00001"
          - "00002"
          - "00003"
          - "00004"
          - "00005"
        description: "0=off, 1=keystone, 2=curved, 3=PC-1, 4=PC-2, 5=PC-3"

  - id: display_language
    label: Display Language
    kind: action
    command: OLG
    params:
      - name: language
        type: enum
        values:
          - EN
          - GD
          - EU
          - FR
          - ES
          - PI
          - TL
          - PO
          - JP
          - NC
          - HI
          - RU
          - KO
        description: "EN=English, GD=German, EU=French, ES=Spanish, PI=Italian, TL=Portuguese, JP=Japanese, NC=Chinese, HI=Hindi, RU=Russian, KO=Korean"

  - id: system_selector
    label: System Selector
    kind: action
    command: ORF
    params:
      - name: value
        type: enum
        values:
          - "0"
          - "1"
          - "2"
          - "3"
        description: "RGB(VGA/480P): 0=VGA60, 1=480P(YCbCr), 3=480pRGB; RGB(Other)/DVI: 0=RGB, 1=YPbPr; HDMI/DIGITAL LINK: 0=RGB, 1=YPbPr, 2=AUTO"

  - id: system_selector_sdi
    label: System Selector SDI
    kind: action
    command: VSD
    params:
      - name: value
        type: string
        description: "Signal format code (0=AUTO, 1=480i, 3=576i, 4=1080/60i, 5=1035/60i, 6=720/60p, 7=1080/24p, 8=1080/50i, 9=1080/30p, 10=1080/25p, 11=1080/24sF, 12=720/50p, 15=1080/50pYpbPr, 16=1080/60pYpbPr, 21=1080/24pRGB, 22=1080/24sF RGB, 23=1080/25pRGB, 24=1080/30pRGB, 25=1080/50i RGB, 26=1080/60i RGB)"

  - id: blanking_upper
    label: Blanking Upper
    kind: action
    command: DBU
    params:
      - name: value
        type: integer
        description: "Range 0 to model-dependent max (PT-DZ870: 597, PT-DW830: 397, PT-DX100: 381)"

  - id: blanking_lower
    label: Blanking Lower
    kind: action
    command: DBB
    params:
      - name: value
        type: integer
        description: "Range 0 to model-dependent max"

  - id: blanking_right
    label: Blanking Right
    kind: action
    command: DBR
    params:
      - name: value
        type: integer
        description: "Range 0 to model-dependent max (PT-DZ870: 957, PT-DW830: 637, PT-DX100: 509)"

  - id: blanking_left
    label: Blanking Left
    kind: action
    command: DBL
    params:
      - name: value
        type: integer
        description: "Range 0 to model-dependent max"

  - id: edge_blending
    label: Edge Blending
    kind: action
    command: "VXX:EDBI0"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "2"
        description: "0=off, 1=on, 2=user"

  - id: edge_blending_upper
    label: Edge Blending Upper On/Off
    kind: action
    command: VGU
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: edge_blending_lower
    label: Edge Blending Lower On/Off
    kind: action
    command: VGB
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: edge_blending_left
    label: Edge Blending Left On/Off
    kind: action
    command: VGL
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: edge_blending_right
    label: Edge Blending Right On/Off
    kind: action
    command: VGR
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"

  - id: frame_response
    label: Frame Response
    kind: action
    command: "VXX:FDYI0"
    params:
      - name: mode
        type: enum
        values:
          - "0"
          - "1"
          - "5"
        description: "0=normal, 1=fast, 5=fixed"

  - id: frame_lock
    label: Frame Lock
    kind: action
    command: VFL
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: raster_position_horizontal
    label: Raster Position Horizontal
    kind: action
    command: VRH
    params:
      - name: value
        type: integer
        description: "Range -2048 to +2047"

  - id: raster_position_vertical
    label: Raster Position Vertical
    kind: action
    command: VRV
    params:
      - name: value
        type: integer
        description: "Range -2048 to +2047"

  - id: ye_modulate
    label: Ye Modulate
    kind: action
    command: "VXX:YEMI0"
    params:
      - name: state
        type: enum
        values:
          - "0"
          - "1"
        description: "0=off, 1=on"

  - id: dynamic_rgb_booster
    label: Dynamic RGB Booster
    kind: action
    command: "VXX:DRBI1"
    params:
      - name: value
        type: integer
        description: "0=off, range 1-7"

  - id: system_daylight_view
    label: System Daylight View
    kind: action
    command: "VXX:DLVI0"
    params:
      - name: value
        type: integer
        description: "0=off, 1-3=levels"

  - id: custom_masking
    label: Custom Masking
    kind: action
    command: "VXX:MSKI1"
    params:
      - name: value
        type: integer
        description: "0=off, 1=PC-1, 2=PC-2, 3=PC-3"

  - id: geometry_keystone_lens_throw_ratio
    label: Geometry Keystone Lens Throw Ratio
    kind: action
    command: "VXX:GMKS0"
    params:
      - name: value
        type: string
        description: "Range 0.7 to 16.5 in 0.1 increments"

  - id: geometry_keystone_vertical_balance
    label: Geometry Keystone Vertical Balance
    kind: action
    command: "VXX:GMKI4"
    params:
      - name: value
        type: integer
        description: "Range -60 to +60"

  - id: geometry_keystone_horizontal_balance
    label: Geometry Keystone Horizontal Balance
    kind: action
    command: "VXX:GMKI7"
    params:
      - name: value
        type: integer
        description: "Range -30 to +30"

  - id: geometry_keystone_vertical_keystone
    label: Geometry Keystone Vertical Keystone
    kind: action
    command: "VXX:GMKS8"
    params:
      - name: value
        type: string
        description: "Range -40.0 to +40.0 in 0.2 increments"

  - id: geometry_keystone_horizontal_keystone
    label: Geometry Keystone Horizontal Keystone
    kind: action
    command: "VXX:GMKS9"
    params:
      - name: value
        type: string
        description: "Range -15.0 to +15.0 in 0.2 increments"

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
        description: "Signal slot identifier (A1-A8, L1-L8)"

  - id: sub_memory_changeover
    label: Sub Memory Changeover
    kind: action
    command: OCS
    params:
      - name: memory_number
        type: string
        description: "2-digit memory number (01-96)"

  - id: sub_memory_registration
    label: Sub Memory Registration
    kind: action
    command: OES
    params: []

  - id: sub_memory_delete
    label: Sub Memory Delete
    kind: action
    command: ODS
    params:
      - name: memory_number
        type: string
        description: "Memory number in mm-nn format"

  - id: digital_link_key
    label: Digital Link Key
    kind: action
    command: DLK
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: query_power
    label: Query Power
    command: QPW
    type: enum
    values:
      - "0"
      - "1"
    description: "0=off/standby, 1=on"

  - id: query_freeze
    label: Query Freeze
    command: QFZ
    type: enum
    values:
      - "0"
      - "1"

  - id: query_shutter
    label: Query Shutter
    command: QSH
    type: enum
    values:
      - "0"
      - "1"

  - id: query_input_select
    label: Query Input Select
    command: QIN
    type: string
    description: "Returns current input designation string"

  - id: query_test_pattern
    label: Query Test Pattern
    command: QTS
    type: string
    description: "Returns current test pattern code"

  - id: query_on_screen
    label: Query On Screen
    command: QOS
    type: enum
    values:
      - "0"
      - "1"

  - id: query_installation
    label: Query Installation
    command: QSP
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"

  - id: query_cooling_condition
    label: Query Cooling Condition
    command: QDR
    type: string
    description: "Returns cooling condition mode"

  - id: query_high_altitude_mode
    label: Query High Altitude Mode
    command: QFM
    type: enum
    values:
      - "0"
      - "1"

  - id: query_projector_runtime
    label: Query Projector Runtime
    command: QST
    type: string
    description: "Returns total runtime hours"

  - id: query_lamp1_runtime
    label: Query Lamp 1 Runtime
    command: "Q$L:1"
    type: string
    description: "Returns lamp 1 runtime hours"

  - id: query_lamp2_runtime
    label: Query Lamp 2 Runtime
    command: "Q$L:2"
    type: string
    description: "Returns lamp 2 runtime hours"

  - id: query_lamp_select
    label: Query Lamp Select
    command: QSL
    type: enum
    values:
      - "0"
      - "1"
      - "2"
      - "3"
    description: "0=dual, 1=single, 2=lamp1, 3=lamp2"

  - id: query_lamp_control_status
    label: Query Lamp Control Status
    command: "Q$S"
    type: string

  - id: query_lamp_status
    label: Query Lamp Status
    command: QLS
    type: string

  - id: query_picture_mode
    label: Query Picture Mode
    command: QPM
    type: string
    description: "Returns current picture mode designation"

  - id: query_color
    label: Query Color
    command: QVC
    type: integer
    description: "Returns color value"

  - id: query_tint
    label: Query Tint
    command: QVT
    type: integer
    description: "Returns tint value"

  - id: query_color_temperature
    label: Query Color Temperature
    command: QTE
    type: string
    description: "Returns color temperature value"

  - id: query_contrast
    label: Query Contrast
    command: QVR
    type: integer

  - id: query_brightness
    label: Query Brightness
    command: QVB
    type: integer

  - id: query_gamma
    label: Query Gamma
    command: QGA
    type: string

  - id: query_sharpness
    label: Query Sharpness
    command: QVS
    type: integer

  - id: query_noise_reduction
    label: Query Noise Reduction
    command: QNS
    type: integer

  - id: query_aspect
    label: Query Aspect
    command: QSE
    type: string

  - id: query_zoom_horizontal
    label: Query Zoom Horizontal
    command: QZH
    type: integer

  - id: query_zoom_vertical
    label: Query Zoom Vertical
    command: QZV
    type: integer

  - id: query_edge_blending
    label: Query Edge Blending
    command: "QVX:EDBI0"
    type: string

  - id: query_white_gain
    label: Query White Gain
    command: QWH
    type: integer

  - id: query_dynamic_iris
    label: Query Dynamic Iris
    command: QAI
    type: string
```

## Variables
```yaml
# UNRESOLVED: most adjustable parameters are represented as action params above.
# The protocol uses a subcommand format with operation (=set, _add) and sign (+/-) bytes
# for incremental adjustments. This is not easily mapped to a simple variable model.
```

## Events
```yaml
# Device sends callback responses after each command.
# Error responses: ER401 (command not acceptable / parameter error),
# ER402 (parameter error / input select conflict).
# No unsolicited event notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no macro sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 60 seconds after lamp illumination before sending commands"
  - description: "Minimum 0.5s between consecutive commands after receiving response"
  - description: "Set timeout to 10 seconds or longer for command responses"
  - description: "REMOTE2 priority: conflicting commands return ER401"
# UNRESOLVED: power-on sequencing requirements not fully documented
```

## Notes
- Command frame format: `STX (0x02) + ID (4 bytes) + ';' + Command (3 bytes) + [':' + Parameters] + ETX (0x03)`
- ID addressing: individual units AD01-AD64, all units ADZZ, groups AD0A-AD0Z
- Subcommand format uses 5-byte subcommand + 1-byte operation (= or _) + 1-byte sign (+ or -) + 5-byte parameter
- Operation '=' sets absolute value; '_' adds to current value
- Parameters are right-justified and zero-padded
- Many commands have model-dependent availability (PT-DZ870, PT-DW830, PT-DX100)
- Error codes: ER401 (command not acceptable), ER402 (parameter error)
- Geometry and edge blending sub-commands use extended VXX: prefix format
- Source document is 193 pages; this spec covers the primary control and query commands
<!-- UNRESOLVED: extended control commands (section 3: lens control, self-check) not fully extracted -->
<!-- UNRESOLVED: remaining query commands (2.328-2.400+) not individually listed — source has 269+ query commands -->
<!-- UNRESOLVED: geometry curved/corner-correction sub-commands partially documented — source has ~20 geometry sub-commands -->
<!-- UNRESOLVED: edge blending width/marker/black-level sub-commands not individually listed -->
<!-- UNRESOLVED: audio control commands if any exist in later pages -->

## Provenance

```yaml
source_domains:
  - na.panasonic.com
  - docs.connect.panasonic.com
  - manualshelf.com
  - eww.pass.panasonic.co.jp
source_urls:
  - https://na.panasonic.com/ns/35519_PT-DZ870DW830DX100_RS-232C_control_spec_-_.pdf
  - https://docs.connect.panasonic.com/projector/download/command/
  - https://www.manualshelf.com/manual/panasonic/rs232-protocols/rs-232c-protocol-document-english.html
  - https://eww.pass.panasonic.co.jp/pro-av/support/content/guide/DEF/InterfaceSpecifications_CompatibleModelTable_E.pdf
retrieved_at: 2026-05-13T12:23:04.656Z
last_checked_at: 2026-06-25T15:38:22.780Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T15:38:22.780Z
matched_actions: 105
action_count: 105
confidence: medium
summary: "deterministic presence proof: 105/105 payloads verbatim in source; stratified Sonnet sample corroborated (16 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model family overlap unclear — source doc covers projector-specific features (lens, keystone, edge blending) that may not apply to all TH-xxPF10WK models"
- "serial port pinout and connector type not in refined source"
- "baud rate, data bits, parity, stop bits, flow control not explicitly stated in refined source"
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "most adjustable parameters are represented as action params above."
- "no macro sequences explicitly documented in source"
- "power-on sequencing requirements not fully documented"
- "extended control commands (section 3: lens control, self-check) not fully extracted"
- "remaining query commands (2.328-2.400+) not individually listed — source has 269+ query commands"
- "geometry curved/corner-correction sub-commands partially documented — source has ~20 geometry sub-commands"
- "edge blending width/marker/black-level sub-commands not individually listed"
- "audio control commands if any exist in later pages"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
