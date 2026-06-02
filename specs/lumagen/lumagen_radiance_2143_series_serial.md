---
spec_id: admin/lumagen-radiance-2143-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumagen Radiance 2143 Series Control Spec"
manufacturer: Lumagen
model_family: "Radiance 2143"
aliases: []
compatible_with:
  manufacturers:
    - Lumagen
  models:
    - "Radiance 2143"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lumagen.com
source_urls:
  - https://www.lumagen.com/s/Tip0011_RS232CommandInterface_111023.pdf
retrieved_at: 2026-04-30T04:31:52.314Z
last_checked_at: 2026-06-02T03:24:56.958Z
generated_at: 2026-06-02T03:24:56.958Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version mapping for which commands are supported on the Radiance 2143 specifically vs Radiance Pro"
  - "many more variables exist (input/output offsets, ctemp pts, LUT entries) but follow the same set_via/query_via pattern; see ZY/ZQ Actions and Feedbacks above for full coverage."
  - "no macros defined in source"
  - "source contains no explicit safety warnings, interlock procedures,"
  - "firmware version compatibility ranges per command (source notes \"for Radiance Pro... in latest posted software revision\" and \"Older commands that have been superceded are shown grayed out\", but specific Radiance 2143 firmware revisions and command support cutoffs are not stated)."
  - "behavior on power loss, error recovery sequences, fault behavior are not described in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T03:24:56.958Z
  matched_actions: 215
  action_count: 215
  confidence: medium
  summary: "All 215 spec actions match verbatim source command tokens and all transport parameters (9600 baud, 8N1, no flow) are confirmed in source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Lumagen Radiance 2143 Series Control Spec

## Summary
RS-232 serial control interface for the Lumagen Radiance 2143 video processor. The protocol uses single-character and multi-character ASCII commands (mostly without terminators) plus a family of multi-character `ZQ`/`ZY`/`ZT`/`ZW`/`ZB`/`ZC`/`ZD`/`ZE` commands for queries, configuration, color management, test patterns, and on-screen messaging. Many advanced commands are tagged "Radiance Pro only" in the source; this spec enumerates the full documented command set but applicability to the 2143 may be partial.

<!-- UNRESOLVED: firmware version mapping for which commands are supported on the Radiance 2143 specifically vs Radiance Pro -->

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
- powerable        # inferred from power on/standby command examples (% and $)
- routable         # inferred from input selection (i) and zone selection (L)
- queryable        # inferred from ZQI/ZQO/ZQS query command family
- levelable        # inferred from level-set commands (color, hue, contrast, gamma, ctemp)
```

## Actions
```yaml
# --- Power / basic navigation (single-char ASCII command list) ---
- id: power_on
  label: Power On
  kind: action
  command: "%"
  params: []

- id: standby
  label: Power to Standby
  kind: action
  command: "$"
  params: []

- id: menu
  label: Activate Menu
  kind: action
  command: "M"
  params: []

- id: exit
  label: Exit / Cancel
  kind: action
  command: "X"
  params: []

- id: help
  label: On-screen Help
  kind: action
  command: "U"
  params: []

- id: clear_menu
  label: Force Menu Off
  kind: action
  command: "!"
  params: []

- id: input_select
  label: Select Input
  kind: action
  command: "i{input}"
  params:
    - name: input
      type: string
      description: |
        Input number. For 1-9 send the digit (e.g. "i2" for input 2). For
        input 10+ use the "+" prefix (e.g. "i+2" for input 12). Source: "Choose
        input (i.e. i2 for input 2 and i+2 for input 12)."

- id: zone_select
  label: Output Zone Select
  kind: action
  command: "L"
  params: []

- id: alt_key
  label: ALT Key
  kind: action
  command: "#"
  params: []
  # NOTE: source: "If delimiter mode enabled instead use :(colon) character"

- id: previous_input
  label: Display Previous Input
  kind: action
  command: "P"
  params: []

- id: pip_off
  label: PIP Off
  kind: action
  command: "e"
  params: []

- id: pip_select
  label: PIP Select
  kind: action
  command: "p"
  params: []

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "r"
  params: []

- id: pip_mode
  label: PIP Mode
  kind: action
  command: "m"
  params: []

- id: ok
  label: Accept Command (OK)
  kind: action
  command: "k"
  params: []

- id: ok_cr
  label: Accept Command (CR variant)
  kind: action
  command: "<CR>"
  params: []
  # NOTE: source: "Many RS232 commands do not use a <CR> terminator. Do not send the <CR> unless the command specifies it as the terminator."

- id: arrow_left
  label: Left Arrow
  kind: action
  command: "<"
  params: []

- id: arrow_right
  label: Right Arrow
  kind: action
  command: ">"
  params: []

- id: arrow_down
  label: Down Arrow
  kind: action
  command: "v"
  params: []

- id: arrow_up
  label: Up Arrow
  kind: action
  command: "^"
  params: []

- id: digit_0
  label: Enter digit 0
  kind: action
  command: "0"
  params: []

- id: digit_1
  label: Enter digit 1
  kind: action
  command: "1"
  params: []

- id: digit_2
  label: Enter digit 2
  kind: action
  command: "2"
  params: []

- id: digit_3
  label: Enter digit 3
  kind: action
  command: "3"
  params: []

- id: digit_4
  label: Enter digit 4
  kind: action
  command: "4"
  params: []

- id: digit_5
  label: Enter digit 5
  kind: action
  command: "5"
  params: []

- id: digit_6
  label: Enter digit 6
  kind: action
  command: "6"
  params: []

- id: digit_7
  label: Enter digit 7
  kind: action
  command: "7"
  params: []

- id: digit_8
  label: Enter digit 8
  kind: action
  command: "8"
  params: []

- id: digit_9
  label: Enter digit 9
  kind: action
  command: "9"
  params: []

- id: add_10
  label: Add 10 to Next Digit (10+)
  kind: action
  command: "+"
  params: []

# --- Source aspect selection commands ---
- id: nls
  label: Non-Linear Stretch
  kind: action
  command: "N"
  params: []

- id: aspect_4_3
  label: Select 4:3 Source Aspect (prev zoom)
  kind: action
  command: "n"
  params: []

- id: aspect_4_3_nz
  label: Select 4:3 Source Aspect (no zoom)
  kind: action
  command: "["
  params: []

- id: aspect_4_3_nz_nls
  label: Select 4:3 Source Aspect with NLS (no zoom)
  kind: action
  command: "[N"
  params: []

- id: aspect_lbox
  label: Select 4:3 Letterbox Source Aspect (prev zoom)
  kind: action
  command: "l"
  params: []

- id: aspect_lbox_nz
  label: Select 4:3 Letterbox Source Aspect (no zoom)
  kind: action
  command: "]"
  params: []

- id: aspect_lbox_nz_nls
  label: Select 4:3 Letterbox Source Aspect with NLS (no zoom)
  kind: action
  command: "]N"
  params: []

- id: aspect_16_9
  label: Select 16:9 Source Aspect (prev zoom)
  kind: action
  command: "w"
  params: []

- id: aspect_16_9_nz
  label: Select 16:9 Source Aspect (no zoom)
  kind: action
  command: "*"
  params: []

- id: aspect_16_9_nz_nls
  label: Select 16:9 Source Aspect with NLS (no zoom)
  kind: action
  command: "*N"
  params: []

- id: aspect_1_85
  label: Select 1.85 Source Aspect (prev zoom)
  kind: action
  command: "j"
  params: []

- id: aspect_1_85_nz
  label: Select 1.85 Source Aspect (no zoom)
  kind: action
  command: "/"
  params: []

- id: aspect_1_85_nz_nls
  label: Select 1.85 Source Aspect with NLS (no zoom)
  kind: action
  command: "/N"
  params: []

- id: aspect_1_90
  label: Select 1.90 Source Aspect (Radiance Pro only)
  kind: action
  command: "A"
  params: []

- id: aspect_1_90_nls
  label: Select 1.90 Source Aspect with NLS (Radiance Pro only)
  kind: action
  command: "AN"
  params: []

- id: aspect_2_00
  label: Select 2.00 Source Aspect (Radiance Pro only)
  kind: action
  command: "C"
  params: []

- id: aspect_2_00_nls
  label: Select 2.00 Source Aspect with NLS (Radiance Pro only)
  kind: action
  command: "CN"
  params: []

- id: aspect_2_20
  label: Select 2.20 Source Aspect (Radiance Pro only)
  kind: action
  command: "E"
  params: []

- id: aspect_2_20_nls
  label: Select 2.20 Source Aspect with NLS (Radiance Pro only)
  kind: action
  command: "EN"
  params: []

- id: aspect_2_35
  label: Select 2.35 Source Aspect (prev zoom)
  kind: action
  command: "W"
  params: []

- id: aspect_2_35_nz
  label: Select 2.35 Source Aspect (no zoom)
  kind: action
  command: "K"
  params: []

- id: aspect_2_40
  label: Select 2.40 Source Aspect (Radiance Pro only)
  kind: action
  command: "G"
  params: []

- id: aspect_4_3_pillarbox
  label: Select 4:3 Pillarbox Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+n"
  params: []

- id: aspect_1_375_pillarbox
  label: Select 1.375 Pillarbox Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+l"
  params: []

- id: aspect_1_66_pillarbox
  label: Select 1.66 Pillarbox Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+w"
  params: []

- id: aspect_2_10
  label: Select 2.10 Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+j"
  params: []

- id: aspect_2_55
  label: Select 2.55 Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+W"
  params: []

- id: aspect_2_76
  label: Select 2.76 Source Aspect (Radiance Pro only, Extended)
  kind: action
  command: "+N"
  params: []

# --- Input memory selection ---
- id: mema
  label: Select Input Memory A (MEMA)
  kind: action
  command: "a"
  params: []

- id: memb
  label: Select Input Memory B (MEMB)
  kind: action
  command: "b"
  params: []

- id: memc
  label: Select Input Memory C (MEMC)
  kind: action
  command: "c"
  params: []

- id: memd
  label: Select Input Memory D (MEMD)
  kind: action
  command: "d"
  params: []

# --- OSD / aspect detect / misc single-char ---
- id: osd_messages_on
  label: Onscreen Messages On
  kind: action
  command: "g"
  params: []

- id: osd_messages_off
  label: Onscreen Messages Off
  kind: action
  command: "s"
  params: []

- id: auto_aspect_disable
  label: Auto Aspect Disable (Radiance Pro only)
  kind: action
  command: "V"
  params: []

- id: auto_aspect_enable
  label: Auto Aspect Enable (Radiance Pro only)
  kind: action
  command: "~"
  params: []
  # NOTE: source: "If delimiter mode enabled instead use ?(question mark) character"

- id: save_shortcut
  label: Save Shortcut
  kind: action
  command: "S"
  params: []
  # NOTE: send "S" then "k" (OK) to confirm save

- id: hdr_setup
  label: Show HDR Parameter Menu (Radiance Pro only)
  kind: action
  command: "Y"
  params: []

- id: pattern_menu
  label: Show Test Pattern Menu (Radiance Pro only)
  kind: action
  command: "H"
  params: []

- id: noop_underscore
  label: No-Operation
  kind: action
  command: "_"
  params: []
  # NOTE: source: "Underscore is a no-operation character and is always ignored"

# --- Legacy test pattern command tXMM (use ZY7T instead per source) ---
- id: test_pattern_legacy
  label: Test Pattern (legacy, use ZY7T instead)
  kind: action
  command: "t{group}{level}"
  params:
    - name: group
      type: string
      description: |
        Test pattern group letter 'a'-'p' (a=Crosshatch, b=Overscan,
        c=Contrast, d=Every other Hline, e=Every other Vline, f=Ramp,
        g=White Window, h=White Solid, i=75% Colorbars, j=Red Solid,
        k=Green Solid, l=Blue Solid, m=Yellow Solid, n=Cyan Solid,
        o=Magenta Solid, p=Contrast2, q=Red Window, r=Green Window,
        s=Blue Window, t=Yellow Window, u=Cyan Window, v=Magenta Window).
        Send capital letter 'X' to exit.
    - name: level
      type: integer
      description: |
        MM=00-10 corresponds to 10%-100% in 10% steps. MM=11-20 corresponds
        to 5%-95% in 10% steps.

- id: test_pattern_adjustable
  label: Set Adjustable Test Pattern Mode
  kind: action
  command: "tA"
  params: []

- id: test_pattern_reference
  label: Set Reference Test Pattern Mode
  kind: action
  command: "tR"
  params: []

# --- ZB / ZC / ZD / ZE config commands ---
- id: define_block_character
  label: Define Block Character
  kind: action
  command: "ZB{X}"
  params:
    - name: X
      type: string
      description: Character to be displayed as a solid block in onscreen messages.

- id: clear_onscreen_message
  label: Clear Onscreen Message
  kind: action
  command: "ZC"
  params: []

- id: set_delimiters
  label: Set Delimiters Mode
  kind: action
  command: "ZD{mode}"
  params:
    - name: mode
      type: integer
      description: |
        0=off, 1=on, 2=on with ack/nack, 3=on with checksum and ack/nack.

- id: set_echo
  label: Set Echo Mode
  kind: action
  command: "ZE{mode}"
  params:
    - name: mode
      type: integer
      description: 0=echo off, 1=echo on (default), 2=echo off with status.

# --- ZT / ZW print / delay commands ---
- id: print_message
  label: Print On-screen Message
  kind: action
  command: "ZTM{text}<CR>"
  params:
    - name: M
      type: string
      description: |
        Message slot '0'-'9'. '9' leaves message until "ZC" sent. 2 lines,
        30 chars per line, legal chars 0x20-0x7A. Terminator <CR> or '{'.

- id: delay_command_processing
  label: Delay RS-232 Command Processing
  kind: action
  command: "ZW{ms}<CR>"
  params:
    - name: ms
      type: integer
      description: Delay in milliseconds, up to 30000 (30 seconds).

# --- ZY system / config set commands ---
- id: set_baud_rate
  label: Set RS-232 Baud Rate
  kind: action
  command: "ZYS{X}<CR>"
  params:
    - name: X
      type: string
      description: |
        'D'=9.6k (default), 'M'=28.8k, 'F'=57.6k, '1'=115.2k, '2'=230.4k,
        '3'=460.8k. Return to default 9.6k before using Lumagen utilities.

- id: set_zoom_factor
  label: Set Zoom Factor
  kind: action
  command: "ZY0{M}<CR>"
  params:
    - name: M
      type: integer
      description: |
        Zoom factor 0-2 (or 0-7 if zoom is set for 5% steps).

- id: set_output_aspect_all
  label: Set Output Aspect for All Input Aspects
  kind: action
  command: "ZY1{MMM}<CR>"
  params:
    - name: MMM
      type: integer
      description: 110-250 corresponds to 1.10-2.50.

- id: set_output_shrink
  label: Set Output Shrink Parameters
  kind: action
  command: "ZY2{top}{left}{bottom}{right}<CR>"
  params:
    - name: top
      type: integer
      description: 000-255 pixels
    - name: left
      type: integer
      description: 000-255 pixels
    - name: bottom
      type: integer
      description: 000-255 pixels
    - name: right
      type: integer
      description: 000-255 pixels

- id: set_trigger
  label: Set Trigger Output (units with output triggers only)
  kind: action
  command: "ZY3{trigger}{state}<CR>"
  params:
    - name: trigger
      type: integer
      description: 1 or 2
    - name: state
      type: string
      description: H=on, L=off

- id: set_output_gamma
  label: Set Output Color Mgmt Gamma
  kind: action
  command: "ZY40{XXX}<CR>"
  params:
    - name: XXX
      type: integer
      description: 080-140 corresponds to 0.80-1.40

- id: set_output_color_gamut_matrix_legacy
  label: Set Output Color Mgmt Gamut Matrix (legacy, use ZY415 instead)
  kind: action
  command: "ZY410{C}{R}{XXXX}<CR>"
  params:
    - name: C
      type: integer
      description: Column 0-6 corresponds to R,G,B,Y,C,M,W
    - name: R
      type: integer
      description: Row 0-2 corresponds to AddR,AddG,AddB
    - name: XXXX
      type: integer
      description: Value 0000-1024 (leading zeros required)

- id: reset_color_gamut
  label: Reset Color Gamut to Defaults (8-point mode)
  kind: action
  command: "ZY411<CR>"
  params: []

- id: set_3d_gamut_enable
  label: 3D Color Gamut Enable
  kind: action
  command: "ZY412{state}<CR>"
  params:
    - name: state
      type: integer
      description: 0=disable, 1=enable

- id: set_1d_lut_points
  label: Set 1D LUT (Grayscale) Point Count
  kind: action
  command: "ZY413{XX}<CR>"
  params:
    - name: XX
      type: integer
      description: 11, 12 or 21 points. Changing pts resets all to default.

- id: set_3d_lut_value
  label: Set 3D LUT Value
  kind: action
  command: "ZY415{XX}{YY}{ZZ}{C}{VVVV}<CR>"
  params:
    - name: XX
      type: string
      description: Address on red axis (range depends on LUT size)
    - name: YY
      type: string
      description: Address on green axis
    - name: ZZ
      type: string
      description: Address on blue axis
    - name: C
      type: integer
      description: 0=red, 1=green, 2=blue component at this location
    - name: VVVV
      type: string
      description: Hex value for the color component (x0000-x0400 for 10-bit)

- id: select_gamut_size
  label: Select Gamut Size (5x5x5, 9x9x9, 17x17x17)
  kind: action
  command: "ZY416{XX}{M}<CR>"
  params:
    - name: XX
      type: integer
      description: 05=5x5x5, 09=9x9x9, 17=17x17x17
    - name: M
      type: string
      description: |
        Optional, Radiance Pro only: 'S'=source gamma (recommended) or
        'L'=linear gamma.

- id: set_hdr_intensity_mapping
  label: Set Output HDR Intensity Mapping for Current CMS
  kind: action
  command: "ZY417{XXXXX}{G}<CR>"
  params:
    - name: XXXXX
      type: integer
      description: |
        00000=disable; 00050-10000 enables and sets display max level.
    - name: G
      type: string
      description: |
        Gamma into 3D LUT. 'A'=auto, 'H'=HDR gamma, 'S'=SDR gamma.

- id: set_message_colors
  label: Set RS-232 Message Colors and Transparency (Radiance Pro only)
  kind: action
  command: "ZY418{C}{RR}{GG}{BB}<CR>"
  params:
    - name: C
      type: integer
      description: |
        0=set background color, 1=set foreground color, 2=set blend value.
    - name: RR
      type: string
      description: Red hex (00-ff)
    - name: GG
      type: string
      description: Green hex (00-ff)
    - name: BB
      type: string
      description: |
        Blue hex (00-ff). When C=2, only last digit used: 000001-00000f
        (f=opaque, 1=near-transparent).

- id: set_3d_lut_value_short
  label: Set 3D LUT Value (shorter form)
  kind: action
  command: "ZYG{X}{Y}{Z}{RRR}{GGG}{BBB}<CR>"
  params:
    - name: X
      type: string
      description: |
        Red-axis address. 10-16 represented by ':;<=>?@' respectively.
    - name: Y
      type: string
      description: Green-axis address
    - name: Z
      type: string
      description: Blue-axis address
    - name: RRR
      type: string
      description: Hex red value 000-400
    - name: GGG
      type: string
      description: Hex green value 000-400
    - name: BBB
      type: string
      description: Hex blue value 000-400

- id: set_output_ctemp_rgb
  label: Set Output Red, Green, Blue for Ctemp Point (combined)
  kind: action
  command: "ZY42A{PP}{RRRR}{GGGG}{BBBB}<CR>"
  params:
    - name: PP
      type: integer
      description: |
        Color-temp point. 11pt: 0-10, 12pt: 0-11, 21pt: 0-20 (depends on
        ZY413 setting).
    - name: RRRR
      type: integer
      description: |
        Red value 0000-1000 corresponds to 000.0-100.0. Radiance Pro
        optionally supports 5 digits (hundredths precision).
    - name: GGGG
      type: integer
      description: Green value 0000-1000
    - name: BBBB
      type: integer
      description: Blue value 0000-1000

- id: set_output_ctemp_blue
  label: Set Output Blue for Ctemp Point
  kind: action
  command: "ZY42B{PP}{XXXX}<CR>"
  params:
    - name: PP
      type: integer
      description: Color-temp point (see ZY413).
    - name: XXXX
      type: integer
      description: |
        Value 0000-1000. Radiance Pro optionally supports 5 digits.

- id: set_output_ctemp_default
  label: Set Output Default for Ctemp Point
  kind: action
  command: "ZY42D{PP}<CR>"
  params:
    - name: PP
      type: integer
      description: Color-temp point (see ZY413).

- id: set_output_ctemp_green
  label: Set Output Green for Ctemp Point
  kind: action
  command: "ZY42G{PP}{XXXX}<CR>"
  params:
    - name: PP
      type: integer
      description: Color-temp point (see ZY413).
    - name: XXXX
      type: integer
      description: |
        Value 0000-1000. Radiance Pro optionally supports 5 digits.

- id: set_output_ctemp_ire
  label: Set Output IRE for Ctemp Point
  kind: action
  command: "ZY42I{PP}{XXXXX}<CR>"
  params:
    - name: PP
      type: integer
      description: Color-temp point (see ZY413).
    - name: XXXXX
      type: integer
      description: Value 0000-1000

- id: set_output_ctemp_red
  label: Set Output Red for Ctemp Point
  kind: action
  command: "ZY42R{PP}{XXXX}<CR>"
  params:
    - name: PP
      type: integer
      description: Color-temp point (see ZY413).
    - name: XXXX
      type: integer
      description: |
        Value 0000-1000. Radiance Pro optionally supports 5 digits.

- id: set_output_color
  label: Set Output Color
  kind: action
  command: "ZY43CC{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_color_red
  label: Set Output Color Red
  kind: action
  command: "ZY43CR{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_color_grn
  label: Set Output Color Green
  kind: action
  command: "ZY43CG{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_hue
  label: Set Output Hue
  kind: action
  command: "ZY43HH{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_hue_red
  label: Set Output Hue Red
  kind: action
  command: "ZY43HR{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_hue_grn
  label: Set Output Hue Green
  kind: action
  command: "ZY43HG{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_black
  label: Set Output Black
  kind: action
  command: "ZY43BL{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-064

- id: set_output_contrast
  label: Set Output Contrast
  kind: action
  command: "ZY43CO{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_output_mode_by_name
  label: Set Output Mode by Name
  kind: action
  command: "ZY44{ModeName}<CR>"
  params:
    - name: ModeName
      type: string
      description: |
        Name as seen in Output:Configs:ConfigX:Select Mode menu (e.g.
        480p, 720p60, 1080p, etc.).

- id: set_output_aspect_per_input
  label: Set Output Aspect for Specific Input Aspect
  kind: action
  command: "ZY45{X}{MMM}<CR>"
  params:
    - name: X
      type: integer
      description: 0=4:3, 1=Lbox, 2=16:9, 3=1.85, 4=2.35
    - name: MMM
      type: integer
      description: 110-250 corresponds to 1.10-2.50

- id: set_output_format
  label: Set Output Format
  kind: action
  command: "ZY46{F}{C}<CR>"
  params:
    - name: F
      type: integer
      description: |
        0=YCB422, 1=YCB444, 2=RGBPC, 3=RGBVID, 8=automax, 9=auto9
    - name: C
      type: string
      description: |
        Optional colorspace: 0=auto, 1=601, 2=709, 3=hdr2020, 4=sdr2020,
        5=sdrP3. Add x8 to enable HDR flag with 601/709/sdr2020 (9, b, c).

- id: set_3d_eye_output
  label: Set 3D Output for Left, Right or Both Eyes
  kind: action
  command: "ZY47{X}<CR>"
  params:
    - name: X
      type: string
      description: L=Left, R=Right, B=Both

- id: set_3d_eyeglass_polarity
  label: Set 3D Eyeglass Polarity
  kind: action
  command: "ZY48{X}<CR>"
  params:
    - name: X
      type: string
      description: '-' or '+'

- id: set_input_mem_output_config_legacy
  label: Set Input Memory Output Config Select (legacy, use ZY530)
  kind: action
  command: "ZY503{X}{Y}{Z}<CR>"
  params:
    - name: X
      type: integer
      description: Output1 enable (0=disable, 1=enable)
    - name: Y
      type: integer
      description: Output2 enable (0=disable, 1=enable)
    - name: Z
      type: integer
      description: Output Config 0-7

- id: set_input_contrast
  label: Set Input Contrast Level
  kind: action
  command: "ZY506{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_color_format
  label: Set Input Color Format
  kind: action
  command: "ZY507{X}<CR>"
  params:
    - name: X
      type: integer
      description: 0=auto, 1=Bt.601, 2=Bt.709 (SD inputs fixed to Bt.601)

- id: set_input_color_offset
  label: Set Input Color Offset
  kind: action
  command: "ZY508{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_color_red_offset
  label: Set Input Color Red Offset
  kind: action
  command: "ZY509{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_color_grn_offset
  label: Set Input Color Green Offset
  kind: action
  command: "ZY510{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_hue_offset
  label: Set Input Hue Offset
  kind: action
  command: "ZY511{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_hue_red_offset
  label: Set Input Hue Red Offset
  kind: action
  command: "ZY512{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_hue_grn_offset
  label: Set Input Hue Green Offset
  kind: action
  command: "ZY513{S}{VVV}<CR>"
  params:
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Value 000-127

- id: set_input_yc_delay
  label: Set Input YC Delay
  kind: action
  command: "ZY514{S1}{XX}{S2}{YY}<CR>"
  params:
    - name: S1
      type: string
      description: Sign + or -
    - name: XX
      type: integer
      description: Cr delay 00-31 (1/16 pixel units)
    - name: S2
      type: string
      description: Sign + or -
    - name: YY
      type: integer
      description: Cb delay 00-31 (1/16 pixel units)

- id: set_input_deinterlacing_mode
  label: Set Input Deinterlacing Mode
  kind: action
  command: "ZY515{X}<CR>"
  params:
    - name: X
      type: integer
      description: 0=auto, 1=film, 2=video

- id: set_input_vertical_shift_select
  label: Set Input Vertical Shift Setting
  kind: action
  command: "ZY5160{XX}<CR>"
  params:
    - name: XX
      type: integer
      description: |
        0=off, 1-15=index of current vertical shift setting being used.

- id: set_input_vertical_shift_value
  label: Set Input Vertical Shift Setting Value
  kind: action
  command: "ZY5161{XX}{S}{VVV}<CR>"
  params:
    - name: XX
      type: integer
      description: Shift setting index to use
    - name: S
      type: string
      description: Sign + or -
    - name: VVV
      type: integer
      description: Shift value -511 to 511

- id: set_darbee_enhancement
  label: Darbee Enhancement Control
  kind: action
  command: "ZY517{GGG}{M}{E}<CR>"
  params:
    - name: GGG
      type: string
      description: |
        Gain 000-120, or "KKK" to keep current, or "+01"-"+99"/"-01"-"-99"
        for relative changes.
    - name: M
      type: string
      description: |
        Mode: 'P'=Pop, 'G'=Game, 'H'=HD, 'K'=keep current.
    - name: E
      type: string
      description: |
        Enable: '0'=off, '1'=on, 'K'=keep current.

- id: set_hdr_mapping
  label: Set HDR Mapping for Current Input Memory
  kind: action
  command: "ZY518{P}{RR}{S}{C}{T}{GG}{BB}<CR>"
  params:
    - name: P
      type: integer
      description: |
        Settings group selector. 0=load settings for SrcMax 2000.
    - name: RR
      type: integer
      description: |
        Display ratio adjust 31-95 (corresponds to onscreen -31 to +31).
    - name: S
      type: integer
      description: Shape parameter 0-7
    - name: C
      type: integer
      description: Clip parameter 0-7
    - name: T
      type: integer
      description: Transition parameter 0-7
    - name: GG
      type: integer
      description: |
        Gamma adjust 8-24 (corresponds to onscreen -8 to +8, each step 0.02).
    - name: BB
      type: integer
      description: |
        Black adjust 1-15 (corresponds to onscreen -7 to +7).

- id: toggle_hdmi_hotplug
  label: Toggle HDMI Hotplug
  kind: action
  command: "ZY520{X}<CR>"
  params:
    - name: X
      type: string
      description: |
        0-5=HDMI input 1-6, 7=all HDMI inputs. Radiance Pro: 0-7 or 'A' for all.

- id: set_sharpness_combined
  label: Set Horizontal+Vertical Sharpness
  kind: action
  command: "ZY521{E}{L}{S}<CR>"
  params:
    - name: E
      type: string
      description: Y or N
    - name: L
      type: integer
      description: Level 0-7 (7 is most sharpening)
    - name: S
      type: string
      description: H=high or N=normal sensitivity

- id: set_sharpness_separate
  label: Set Separate Horizontal/Vertical Sharpness
  kind: action
  command: "ZY522{E}{Hn}{H}{Vn}{V}{S}<CR>"
  params:
    - name: E
      type: string
      description: Enable
    - name: Hn
      type: string
      description: Sign for H (+ or -)
    - name: H
      type: integer
      description: Horizontal level 0-7
    - name: Vn
      type: string
      description: Sign for V (+ or -)
    - name: V
      type: integer
      description: Vertical level 0-7
    - name: S
      type: string
      description: H=high or N=normal sensitivity

- id: set_reinterlace_arrow_control
  label: Allow Remote Arrow Buttons for Reinterlace Control
  kind: action
  command: "ZY523{X}<CR>"
  params:
    - name: X
      type: integer
      description: |
        0=disallows, 1=allows, 2=allows with onscreen messages.

- id: set_label
  label: Set Input / Custom Mode / CMS / Style Label
  kind: action
  command: "ZY524{X}{Y}{label}<CR>"
  params:
    - name: X
      type: string
      description: |
        'A'-'D'=input mem label (single); '0'=set mem A-D label; '1'=custom
        mode label; '2'=CMS label; '3'=style label.
    - name: Y
      type: string
      description: |
        '0'-'7' meaning input 1-8 or memory/mode/CMS/style index 0-7.
    - name: label
      type: string
      description: |
        Label string, up to 10 chars (input) / 7 chars (custom mode) /
        8 chars (CMS, style).

- id: set_output_mode_cms_style
  label: Set Output Mode, CMS, Style
  kind: action
  command: "ZY530{M}{C}{D}{S}<CR>"
  params:
    - name: M
      type: string
      description: K=keep current, 0-7 to select Output Mode 0-7
    - name: C
      type: string
      description: |
        K=keep current, 0-7 to select Output CMS 0-7 (for non Rec2020).
    - name: D
      type: string
      description: |
        Optional, Radiance Pro: K=keep, 0-7 to select Output CMS 0-7 for
        Rec2020/HDR.
    - name: S
      type: string
      description: K=keep current, 0-7 to select Output Style 0-7

- id: set_test_pattern_output_mode
  label: Test Pattern Output Mode
  kind: action
  command: "ZY532{C}{S}{D}{M}<CR>"
  params:
    - name: C
      type: string
      description: CMS 0-7 or K
    - name: S
      type: string
      description: Style 0-7 or K
    - name: D
      type: string
      description: |
        3D mode 0,1,2,4,8 or K (0=off, 1=frame seq, 2=frame packed,
        4=top-btm, 8=side-by-side).
    - name: M
      type: string
      description: |
        Output mode name (480p, 720p60 etc.), C0-C7 for custom mode, or K.

- id: set_test_pattern_output_mode_pro
  label: Test Pattern Output Mode (Radiance Pro)
  kind: action
  command: "ZY533{I}{C}{S}{D}{M}<CR>"
  params:
    - name: I
      type: integer
      description: Input colorspace, 1=Rec709, 2=Rec2020
    - name: C
      type: string
      description: CMS 0-7 or K
    - name: S
      type: string
      description: Style 0-7 or K
    - name: D
      type: string
      description: 3D mode 0,1,2,4,8 or K
    - name: M
      type: string
      description: Output mode name, C0-C7, or K

- id: set_hdr_infoframe_primary_0
  label: Set Test Pattern HDR Info Frame Primary Display Point 0 (Pro only)
  kind: action
  command: "ZY540{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: x[0] hex value
    - name: YYYY
      type: string
      description: y[0] hex value
  # NOTE: not active until ZY547 received

- id: set_hdr_infoframe_primary_1
  label: Set Test Pattern HDR Info Frame Primary Display Point 1 (Pro only)
  kind: action
  command: "ZY541{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: x[1] hex value
    - name: YYYY
      type: string
      description: y[1] hex value

- id: set_hdr_infoframe_primary_2
  label: Set Test Pattern HDR Info Frame Primary Display Point 2 (Pro only)
  kind: action
  command: "ZY542{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: x[2] hex value
    - name: YYYY
      type: string
      description: y[2] hex value

- id: set_hdr_infoframe_white_point
  label: Set Test Pattern HDR Info Frame White Point (Pro only)
  kind: action
  command: "ZY543{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: WPx hex value
    - name: YYYY
      type: string
      description: WPy hex value

- id: set_hdr_infoframe_mastering_lum
  label: Set Test Pattern HDR Info Frame Mastering Luminance (Pro only)
  kind: action
  command: "ZY544{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: Max luminance hex value
    - name: YYYY
      type: string
      description: Min luminance hex value

- id: set_hdr_infoframe_cll_fall
  label: Set Test Pattern HDR Info Frame CLL and FALL (Pro only)
  kind: action
  command: "ZY545{XXXX}{YYYY}<CR>"
  params:
    - name: XXXX
      type: string
      description: Max content light level hex
    - name: YYYY
      type: string
      description: Max frame average light level hex

- id: set_hdr_infoframe_default
  label: Reset Test Pattern HDR Info Frame to Default (Pro only)
  kind: action
  command: "ZY546<CR>"
  params: []

- id: activate_hdr_infoframe
  label: Activate HDR Info Frame Params Set via ZY540-ZY546 (Pro only)
  kind: action
  command: "ZY547<CR>"
  params: []

- id: set_hdr_pass_through
  label: HDR Pass Through Selection
  kind: action
  command: "ZY548{X}<CR>"
  params:
    - name: X
      type: string
      description: |
        P=HDR pass through, T=use HDR info programmed with ZY540-5 (active
        or test pattern video).

- id: reset_auto_aspect
  label: Reset Automatic Aspect Detection
  kind: action
  command: "ZY550<CR>"
  params: []

- id: set_game_mode
  label: Set Game Mode
  kind: action
  command: "ZY551{X}<CR>"
  params:
    - name: X
      type: integer
      description: 0=off, 1=on

- id: save_configuration
  label: Save Configuration to Flash
  kind: action
  command: "ZY6SAVECONFIG<CR>"
  params: []
  # NOTE: Exit any onscreen test patterns prior to performing a save.

- id: set_menu_position
  label: Set Menu Position
  kind: action
  command: "ZY7M{X}<CR>"
  params:
    - name: X
      type: integer
      description: 0=default menu, 1=menu at top

- id: test_pattern_v2
  label: Test Pattern Command (preferred, replaces tXMM)
  kind: action
  command: "ZY7T{G}{S}{III}<CR>"
  params:
    - name: G
      type: string
      description: |
        Test pattern group 'a'-'r' (e.g. a=Crosshatch/Overscan/Squares;
        b=Contrast/Ramp variants; c=Lines; d=Ramp; e=Gray windows;
        f=Color bars; g/h/i/j/k/l=R/G/B/Y/C/M windows; m/n/o/p/q/r=
        desaturated R/G/B/Y/C/M windows).
    - name: S
      type: integer
      description: Subpattern number (depends on group).
    - name: III
      type: integer
      description: IRE 000-100, rounded to nearest 5.

- id: test_pattern_user_size
  label: Test Pattern User-Defined Size Pattern
  kind: action
  command: "ZY7Ts{S}{RRR}{GGG}{BBB}<CR>"
  params:
    - name: S
      type: integer
      description: 0-2 for medium, small, full-field size
    - name: RRR
      type: integer
      description: Red 0-255 (3 digits)
    - name: GGG
      type: integer
      description: Green 0-255
    - name: BBB
      type: integer
      description: Blue 0-255

- id: test_pattern_user_size_apl
  label: Test Pattern User-Defined Size + APL Pattern
  kind: action
  command: "ZY7Ts{SSS}{AAA}{RRR}{GGG}{BBB}<CR>"
  params:
    - name: SSS
      type: integer
      description: Area 000-999 (0-99.9% of screen)
    - name: AAA
      type: integer
      description: APL 000-100 (0-100%)
    - name: RRR
      type: integer
      description: Red 0-255
    - name: GGG
      type: integer
      description: Green 0-255
    - name: BBB
      type: integer
      description: Blue 0-255

# --- Queries (ZQI / ZQO / ZQS) ---
- id: query_input_basic
  label: Basic Input Info
  kind: query
  command: "ZQI00"
  params: []

- id: query_input_video
  label: Input Video Status
  kind: query
  command: "ZQI01"
  params: []

- id: query_input_pattern
  label: Input Pattern Info
  kind: query
  command: "ZQI02"
  params: []

- id: query_output_config_select_legacy
  label: Output1/Output2 Config Select for Current Input Memory (legacy, replaced by ZQI18)
  kind: query
  command: "ZQI03"
  params: []

- id: query_input_audio_select
  label: Current Input Audio Select
  kind: query
  command: "ZQI04"
  params: []

- id: query_input_black_level
  label: Current Input Black Level
  kind: query
  command: "ZQI05"
  params: []

- id: query_input_contrast
  label: Current Input Contrast Level
  kind: query
  command: "ZQI06"
  params: []

- id: query_input_color_format
  label: Current Input Color Format
  kind: query
  command: "ZQI07"
  params: []

- id: query_input_color_offset
  label: Current Input Color Offset
  kind: query
  command: "ZQI08"
  params: []

- id: query_input_color_red_offset
  label: Current Input Color Red Offset
  kind: query
  command: "ZQI09"
  params: []

- id: query_input_color_grn_offset
  label: Current Input Color Green Offset
  kind: query
  command: "ZQI10"
  params: []

- id: query_input_hue_offset
  label: Current Input Hue Offset
  kind: query
  command: "ZQI11"
  params: []

- id: query_input_hue_red_offset
  label: Current Input Hue Red Offset
  kind: query
  command: "ZQI12"
  params: []

- id: query_input_hue_grn_offset
  label: Current Input Hue Green Offset
  kind: query
  command: "ZQI13"
  params: []

- id: query_input_yc_delay
  label: Current Input YC Delay
  kind: query
  command: "ZQI14"
  params: []

- id: query_input_deinterlace_mode
  label: Current Input Deinterlacing Mode
  kind: query
  command: "ZQI15"
  params: []

- id: query_input_vertical_shift
  label: Current Input Vertical Shift
  kind: query
  command: "ZQI16"
  params: []

- id: query_input_reinterlace_status
  label: Current Input Reinterlacing Status
  kind: query
  command: "ZQI17"
  params: []

- id: query_output_config
  label: Output Configuration by Input Resolution and Memory
  kind: query
  command: "ZQI18"
  params: []

- id: query_input_aspect_legacy
  label: Input Aspect (legacy, use ZQI20)
  kind: query
  command: "ZQI19"
  params: []

- id: query_input_aspect
  label: Input Aspect (recommended)
  kind: query
  command: "ZQI20"
  params: []

- id: query_full_info_v1
  label: Full Information Query (Radiance 2XXX and Radiance Pro)
  kind: query
  command: "ZQI21"
  params: []

- id: query_full_info_v2
  label: Full Information Query v2 (Radiance Pro only)
  kind: query
  command: "ZQI22"
  params: []

- id: query_full_info_v3
  label: Full Information Query v3 (Radiance Pro only)
  kind: query
  command: "ZQI23"
  params: []

- id: query_full_info_v4
  label: Full Information Query v4 (Radiance Pro only)
  kind: query
  command: "ZQI24"
  params: []

- id: query_sharpness
  label: Sharpness Setting Query
  kind: query
  command: "ZQI30"
  params: []

- id: query_rec_2020_support
  label: Display Rec 2020 Support (Radiance Pro only)
  kind: query
  command: "ZQI50"
  params: []

- id: query_hdr_test_pattern_infoframe
  label: HDR Test Pattern Info Frame Data (Radiance Pro only)
  kind: query
  command: "ZQI51"
  params: []

- id: query_hdr_status
  label: HDR Status (Radiance Pro only)
  kind: query
  command: "ZQI52"
  params: []

- id: query_game_mode
  label: Game Mode Status
  kind: query
  command: "ZQI53"
  params: []

- id: query_output_basic
  label: Basic Output Info
  kind: query
  command: "ZQO00"
  params: []

- id: query_output_mode
  label: Output Mode
  kind: query
  command: "ZQO01"
  params: []

- id: query_output_aspect
  label: Output Aspect
  kind: query
  command: "ZQO02"
  params: []

- id: query_output_shrink
  label: Output Shrink
  kind: query
  command: "ZQO03"
  params: []

- id: query_output_gamma
  label: Output Gamma
  kind: query
  command: "ZQO04"
  params: []

- id: query_output_gamut_enabled
  label: Output Color Gamut Enabled
  kind: query
  command: "ZQO05"
  params: []

- id: query_output_gamut_addr
  label: Output Color Gamut AddR Values (legacy, use ZQO30)
  kind: query
  command: "ZQO06"
  params: []

- id: query_output_gamut_addg
  label: Output Color Gamut AddG Values (legacy, use ZQO30)
  kind: query
  command: "ZQO07"
  params: []

- id: query_output_gamut_addb
  label: Output Color Gamut AddB Values (legacy, use ZQO30)
  kind: query
  command: "ZQO08"
  params: []

- id: query_output_ctemp_ire_low
  label: Output Color Temp IRE Points 0-10
  kind: query
  command: "ZQO09"
  params: []

- id: query_output_ctemp_r_low
  label: Output Color Temp R Points 0-10
  kind: query
  command: "ZQO10"
  params: []

- id: query_output_ctemp_g_low
  label: Output Color Temp G Points 0-10
  kind: query
  command: "ZQO11"
  params: []

- id: query_output_ctemp_b_low
  label: Output Color Temp B Points 0-10
  kind: query
  command: "ZQO12"
  params: []

- id: query_output_color_settings
  label: Output Color Settings
  kind: query
  command: "ZQO13"
  params: []

- id: query_output_hue_settings
  label: Output Hue Settings
  kind: query
  command: "ZQO14"
  params: []

- id: query_output_black_contrast
  label: Output Black and Contrast
  kind: query
  command: "ZQO15"
  params: []

- id: query_output_mode_name
  label: Output Mode Name
  kind: query
  command: "ZQO16"
  params: []

- id: query_output_ctemp_points
  label: Output Color Temp Points Count
  kind: query
  command: "ZQO17"
  params: []

- id: query_output_color_format
  label: Output Color Format (Radiance Pro only)
  kind: query
  command: "ZQO18"
  params: []

- id: query_3d_lut_capability
  label: 3D LUT Capability
  kind: query
  command: "ZQO20"
  params: []

- id: query_3d_lut_size
  label: Current 3D LUT Size
  kind: query
  command: "ZQO21"
  params: []

- id: query_3d_lut_value
  label: 3D LUT Value at Address
  kind: query
  command: "ZQO30{XX}{YY}{ZZ}"
  params:
    - name: XX
      type: string
      description: Red-axis address (in current LUT size range)
    - name: YY
      type: string
      description: Green-axis address
    - name: ZZ
      type: string
      description: Blue-axis address

- id: query_output_ctemp_ire_high
  label: Output Color Temp IRE Points 11-20 (or point 12 in 12pt mode)
  kind: query
  command: "ZQO89"
  params: []

- id: query_output_ctemp_r_high
  label: Output Color Temp R Points 11-20 (or point 12 in 12pt mode)
  kind: query
  command: "ZQO90"
  params: []

- id: query_output_ctemp_g_high
  label: Output Color Temp G Points 11-20 (or point 12 in 12pt mode)
  kind: query
  command: "ZQO91"
  params: []

- id: query_output_ctemp_b_high
  label: Output Color Temp B Points 11-20 (or point 12 in 12pt mode)
  kind: query
  command: "ZQO92"
  params: []

- id: query_alive
  label: Alive Check
  kind: query
  command: "ZQS00"
  params: []

- id: query_id
  label: ID (Model Name, Software Revision, Model#, Serial#)
  kind: query
  command: "ZQS01"
  params: []

- id: query_power
  label: Power Status
  kind: query
  command: "ZQS02"
  params: []

- id: query_zoom_step
  label: Zoom Step Percentage
  kind: query
  command: "ZQS03"
  params: []

- id: query_trigger_status
  label: Output Trigger Status (triggers 1 and 2; units with output triggers only)
  kind: query
  command: "ZQS04"
  params: []

- id: query_label
  label: Label Query (input mem / custom mode / CMS / style)
  kind: query
  command: "ZQS1{X}{Y}"
  params:
    - name: X
      type: string
      description: |
        'A'-'D'=input label (memory A-D); '1'=custom mode label; '2'=CMS
        label; '3'=style label.
    - name: Y
      type: string
      description: |
        Input number-1 ('0'=input 1), or '0'-'7' for custom mode / CMS /
        style index.
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ack, nack]
  # Source: "!Y" = Ack, "!N" = Nack. Terminated as <LF><CR> (0x0a 0x0d).
  # Only sent when Delimiter Mode is set to "On with Ack/Nack" or
  # "On with Csum & Ack/Nack".

- id: power_state
  type: enum
  values: [on, off]
  # ZQS02 response: "!S02,0<CR><LF>" = Off, "!S02,1<CR><LF>" = On.

- id: alive_response
  type: string
  # ZQS00 response: "!S00,Ok<CR><LF>" if working.

- id: device_id
  type: string
  # ZQS01 response: "!S01,<model_name>,<software_rev>,<model#>,<serial#><CR><LF>".
  # Example: "!S01,RadianceXD,102308,1009,745<CR><LF>"

- id: input_info
  type: string
  # ZQI00 response: "!I00,<logical_input 1-18>,<input_memory A-D>,<physical_input 1-18>"

- id: input_video_status
  type: string
  # ZQI01 response: "!I01,<state>,<vrate*100>,<hres>,<vres>,<interlaced>,<3D_input>,<3D_type>"
  # state: 0=none, 1=video active, 2=test pattern active

- id: input_aspect_state
  type: string
  # ZQI20 response: "!I20,XY" where X=0-9 aspect code, Y='N' (NLS) or '-' (no NLS).

- id: output_mode
  type: string
  # ZQO01 response: "!O01,<vrate*100>,<hres>,<vres>,<interlaced>,<3D>"

- id: full_status_v1
  type: string
  # ZQI21 response: see source for "!I21,M,RRR,VVVV,D,X,AAA,SSS,Y,C,B,PPP,QQQQ,ZZZ"

- id: trigger_state
  type: string
  # ZQS04 response: per-trigger 0=low, 1=high

- id: hdr_status
  type: string
  # ZQI52 response: "V,Min,Max,Cll" where V=0 (not HDR) or V=1 (HDR with metadata).
  # Radiance Pro only.

- id: game_mode
  type: enum
  values: [on, off]
  # ZQI53 response: 0=off, 1=on.

- id: rec_2020_support
  type: enum
  values: ["Y", "N"]
  # ZQI50 response: "!I50,R" where R='Y' or 'N'. Radiance Pro only.
```

## Variables
```yaml
# Most settable parameters are exposed via ZY-set commands (see Actions). The
# following variables represent state that is both queryable and settable.

- id: input_contrast
  type: integer
  range: [-127, 127]
  set_via: set_input_contrast       # ZY506
  query_via: query_input_contrast   # ZQI06

- id: input_color_format
  type: enum
  values: [auto, bt_601, bt_709]
  set_via: set_input_color_format   # ZY507
  query_via: query_input_color_format # ZQI07

- id: input_deinterlace_mode
  type: enum
  values: [auto, film, video]
  set_via: set_input_deinterlacing_mode # ZY515
  query_via: query_input_deinterlace_mode # ZQI15

- id: output_gamma
  type: integer
  range: [80, 140]
  description: 0.80 to 1.40 (value * 0.01)
  set_via: set_output_gamma         # ZY40
  query_via: query_output_gamma     # ZQO04

- id: zoom_factor
  type: integer
  range: [0, 7]
  set_via: set_zoom_factor          # ZY0
  query_via: query_zoom_step        # ZQS03

- id: game_mode_state
  type: enum
  values: [on, off]
  set_via: set_game_mode            # ZY551
  query_via: query_game_mode        # ZQI53

# <!-- UNRESOLVED: many more variables exist (input/output offsets, ctemp pts, LUT entries) but follow the same set_via/query_via pattern; see ZY/ZQ Actions and Feedbacks above for full coverage. -->
```

## Events
```yaml
# Unsolicited Reporting of Mode Changes -- enabled in menu under:
# Other -> I/O Setup -> RS-232 Setup -> Report mode changes.
#
# When enabled, on a mode change the unit sends a string in the same format
# as the corresponding query response.

- id: mode_change_output
  description: |
    "Output" mode-change report. Uses ZQO01 response format on output mode
    change. Triggered when "Report mode changes" = "Output".

- id: mode_change_input
  description: |
    "Input" mode-change report. Sends two responses: ZQI01 followed by
    ZQI18. Triggered when "Report mode changes" = "Input".

- id: mode_change_full
  description: |
    "Full" mode-change report (Radiance 2XXX and Radiance Pro). Uses ZQI21
    response format. Triggered when "Report mode changes" = "Full".

- id: mode_change_full_v2
  description: |
    "Full v2" mode-change report (Radiance Pro only). Uses ZQI22 response
    format.

- id: mode_change_full_v3
  description: |
    "Full v3" mode-change report (Radiance Pro only). Uses ZQI23 response
    format.

- id: mode_change_full_v4
  description: |
    "Full v4" mode-change report (Radiance Pro only). Uses ZQI24 response
    format.

- id: power_message_out
  description: |
    Power On/Off Message can be sent out the RS-232 port at power on/off
    transitions to control another device. Strings are user-configurable
    via menu under Other -> OnOff Setup -> (On Message, Off Message).
    NOTE: Enabling Power On/Off Message turns off echoing of the original
    query command (query responses still sent).
```

## Macros
```yaml
# No multi-step macros are explicitly documented in source.
# <!-- UNRESOLVED: no macros defined in source -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# <!-- UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements that demand structured safety modeling. -->
```

## Notes

**Command terminators.** Most ASCII commands do not require a terminator. Commands that explicitly require a terminator are shown with `<CR>` in this spec. Either a carriage return or `{` may be used as a terminator. Sending an unnecessary `<CR>` will bring up the Info page (this behavior can be disabled with `MENU 0927` + Save).

**Character range.** Any character outside the legal range (Hex 20 to Hex 7A) acts as a terminator. Characters above Hex 7F are masked with `0x7F`. The underscore character `_` is a no-operation and is always ignored.

**Query format.** All query commands begin with `ZQ`, followed by one of `I`/`S`/`O`, then a two-digit decimal code. No terminating characters are used on query requests. Query responses always begin with `!` followed by the last 3 characters of the request, followed by comma-separated data, followed by `<CR><LF>`. Exception: Ack/Nack responses (`!Y`/`!N`) terminate as `<LF><CR>` (0x0a 0x0d).

**Echo modes.** Echo defaults to `On` (recommended). `Off with Status` sends power/input change status in ZQS02/ZQI00 format. Lumagen recommends leaving Echo On — turning Off may affect software-update capability. See `ZE` command (action `set_echo`).

**Delimiter modes.** When enabled, commands are sent as `#<command><CR>` or with checksum as `#NcommandCC<CR>`. When delimiter mode is active, two character substitutions apply: `?` is used for "enable auto-aspect" (instead of `~`), and `:` (colon) is used in place of `#` for the ALT key. Lumagen recommends Delimiter Mode = Off (default). See `ZD` command (action `set_delimiters`).

**Multi-character commands.** Some single-row commands require multiple ASCII characters sent in sequence with no inter-character delay (e.g. `*N` for "16:9NZ NLS"). These are listed verbatim in the Actions section.

**Radiance Pro vs Radiance 2XXX scoping.** The source covers Radiance Pro and older Radiance models in the same document, with Pro-only commands tagged "Radiance Pro only" in their descriptions. For the Radiance 2143 (a 2XXX-series unit), the Pro-only commands (e.g. ZY540-547, ZQI22/23/24, ZQI50/51/52, ZY418, ZY533, extended aspect ratios `+n`/`+l`/`+w`/`+j`/`+W`/`+N`, 1.90/2.00/2.20/2.40 aspects, ZY42x 5-digit precision) are unlikely to apply. Actions are retained in this spec for completeness; the implementer should test before depending on Pro-only commands on a 2143.

**Connector pinout.** DB9 Female 9-pin D connector, same pinout as a PC, without hardware flow control. Pin 2 = Receive, Pin 3 = Transmit, Pin 5 + connector shell = Ground.

**Save flow.** Most settings persist only after a save. Use action `save_shortcut` (`S`) followed by `ok` (`k`), or `save_configuration` (`ZY6SAVECONFIG<CR>`). Exit any onscreen test pattern before saving.

**Older / superseded commands.** Several commands marked "use X instead" in the source (e.g. ZQI03 → ZQI18, ZQI19 → ZQI20, ZQO06/07/08 → ZQO30, ZY410 → ZY415, ZY503 → ZY530, tXMM → ZY7T) are retained in this spec because the source still lists them as separate command rows. New integrations should prefer the recommended replacements.

<!-- UNRESOLVED: firmware version compatibility ranges per command (source notes "for Radiance Pro... in latest posted software revision" and "Older commands that have been superceded are shown grayed out", but specific Radiance 2143 firmware revisions and command support cutoffs are not stated). -->
<!-- UNRESOLVED: behavior on power loss, error recovery sequences, fault behavior are not described in source. -->

## Provenance

```yaml
source_domains:
  - lumagen.com
source_urls:
  - https://www.lumagen.com/s/Tip0011_RS232CommandInterface_111023.pdf
retrieved_at: 2026-04-30T04:31:52.314Z
last_checked_at: 2026-06-02T03:24:56.958Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T03:24:56.958Z
matched_actions: 215
action_count: 215
confidence: medium
summary: "All 215 spec actions match verbatim source command tokens and all transport parameters (9600 baud, 8N1, no flow) are confirmed in source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version mapping for which commands are supported on the Radiance 2143 specifically vs Radiance Pro"
- "many more variables exist (input/output offsets, ctemp pts, LUT entries) but follow the same set_via/query_via pattern; see ZY/ZQ Actions and Feedbacks above for full coverage."
- "no macros defined in source"
- "source contains no explicit safety warnings, interlock procedures,"
- "firmware version compatibility ranges per command (source notes \"for Radiance Pro... in latest posted software revision\" and \"Older commands that have been superceded are shown grayed out\", but specific Radiance 2143 firmware revisions and command support cutoffs are not stated)."
- "behavior on power loss, error recovery sequences, fault behavior are not described in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
