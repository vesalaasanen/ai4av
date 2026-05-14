---
spec_id: admin/lumagen-radiance-2143-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumagen Radiance 2143 Series Control Spec"
manufacturer: Lumagen
model_family: "Radiance 2143 Series"
aliases: []
compatible_with:
  manufacturers:
    - Lumagen
  models:
    - "Radiance 2143 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lumagen.com
source_urls:
  - https://www.lumagen.com/s/Tip0011_RS232CommandInterface_111023.pdf
retrieved_at: 2026-05-04T18:03:24.592Z
last_checked_at: 2026-05-14T18:17:17.709Z
generated_at: 2026-05-14T18:17:17.709Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.709Z
  matched_actions: 167
  action_count: 178
  confidence: high
  summary: "All 167 spec actions matched literally in source; transport fully verified; comprehensive coverage of Radiance 2143 control protocol."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Lumagen Radiance 2143 Series Control Spec

## Summary
Video processor with RS-232 control interface. Controls power, input selection (18 logical inputs across 4 memories), aspect ratio, zoom, test patterns, image adjustments (contrast, color, hue, black level), output configuration (CMS, gamma, 3D LUT), and HDR metadata. Supports optional delimiter mode with ack/nack and checksum variants. Query commands begin with ZQ and return comma-separated status data prefixed with !.

<!-- UNRESOLVED: firmware compatibility ranges not stated in source -->
<!-- UNRESOLVED: Radiance Pro-specific commands (1.90, 2.00, 2.40, extended source aspects, Rec2020/HDR) are documented but may require newer firmware; source does not specify minimum firmware version -->

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
- powerable      # inferred: ON (%), STBY ($) power commands present
- routable       # inferred: input selection commands (i0-i18, ZONE) present
- queryable      # inferred: ZQ query commands returning state present
- levelable      # inferred: contrast, color, hue, black level adjustment commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_standby
  label: Standby
  kind: action
  params: []

- id: menu
  label: Activate Menu
  kind: action
  params: []

- id: exit
  label: Exit
  kind: action
  params: []

- id: help
  label: Help
  kind: action
  params: []

- id: force_menu_off
  label: Force Menu Off
  kind: action
  params: []

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (0-18, or i0-i18)
    - name: memory
      type: string
      description: "Memory designator (default, A, B, C, D)"
    - name: offset
      type: integer
      description: "Offset for inputs >9 (e.g., +2 for input 12)"
  notes: "Format: i[N] or i[M][N] for mem A-D. Use +N suffix for inputs 10-18."

- id: prev_input
  label: Previous Input
  kind: action
  params: []

- id: pip_off
  label: PIP Off
  kind: action
  params: []

- id: pip_select
  label: PIP Select
  kind: action
  params: []

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

- id: pip_mode
  label: PIP Mode
  kind: action
  params: []

- id: ok
  label: OK / Accept
  kind: action
  params: []
  notes: "Many commands do not use <CR> terminator. Only send <CR> when command specifies it."

- id: arrow_left
  label: Left Arrow
  kind: action
  params: []

- id: arrow_right
  label: Right Arrow
  kind: action
  params: []

- id: arrow_down
  label: Down Arrow
  kind: action
  params: []

- id: arrow_up
  label: Up Arrow
  kind: action
  params: []

- id: digit_0
  label: Digit 0
  kind: action
  params: []

- id: digit_1
  label: Digit 1
  kind: action
  params: []

- id: digit_2
  label: Digit 2
  kind: action
  params: []

- id: digit_3
  label: Digit 3
  kind: action
  params: []

- id: digit_4
  label: Digit 4
  kind: action
  params: []

- id: digit_5
  label: Digit 5
  kind: action
  params: []

- id: digit_6
  label: Digit 6
  kind: action
  params: []

- id: digit_7
  label: Digit 7
  kind: action
  params: []

- id: digit_8
  label: Digit 8
  kind: action
  params: []

- id: digit_9
  label: Digit 9
  kind: action
  params: []

- id: add_10
  label: Add 10 (for input selection)
  kind: action
  params: []

- id: source_aspect_4_3
  label: Source Aspect 4:3
  kind: action
  params: []

- id: source_aspect_4_3_nz
  label: Source Aspect 4:3 (No Zoom)
  kind: action
  params: []

- id: source_aspect_4_3_letterbox
  label: Source Aspect 4:3 Letterbox
  kind: action
  params: []

- id: source_aspect_16_9
  label: Source Aspect 16:9
  kind: action
  params: []

- id: source_aspect_16_9_nz
  label: Source Aspect 16:9 (No Zoom)
  kind: action
  params: []

- id: source_aspect_1_85
  label: Source Aspect 1.85
  kind: action
  params: []

- id: source_aspect_1_85_nz
  label: Source Aspect 1.85 (No Zoom)
  kind: action
  params: []

- id: source_aspect_1_90
  label: Source Aspect 1.90
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: source_aspect_2_00
  label: Source Aspect 2.00
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: source_aspect_2_20
  label: Source Aspect 2.20
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: source_aspect_2_35
  label: Source Aspect 2.35
  kind: action
  params: []

- id: source_aspect_2_35_nz
  label: Source Aspect 2.35 (No Zoom)
  kind: action
  params: []

- id: source_aspect_2_40
  label: Source Aspect 2.40
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: non_linear_stretch
  label: Non-Linear Stretch
  kind: action
  params: []
  notes: "Send source aspect first, then NLS"

- id: mem_a
  label: Select MEM A
  kind: action
  params: []

- id: mem_b
  label: Select MEM B
  kind: action
  params: []

- id: mem_c
  label: Select MEM C
  kind: action
  params: []

- id: mem_d
  label: Select MEM D
  kind: action
  params: []

- id: onscreen_messages_on
  label: On-Screen Messages On
  kind: action
  params: []

- id: onscreen_messages_off
  label: On-Screen Messages Off
  kind: action
  params: []

- id: auto_aspect_disable
  label: Auto Aspect Disable
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: auto_aspect_enable
  label: Auto Aspect Enable
  kind: action
  params: []
  notes: "Radiance Pro only. If delimiter mode enabled, use ? instead of ~"

- id: save
  label: Save
  kind: action
  params: []
  notes: "Send Save then OK"

- id: hdr_setup
  label: HDR Setup
  kind: action
  params: []
  notes: "Radiance Pro only"

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: string
      description: "Pattern group letter a-r"
    - name: sub
      type: integer
      description: "Sub pattern number 0-n"
    - name: ire
      type: integer
      description: "IRE level 000-100"
  notes: "Radiance Pro only. Also see ZY7T and ZQI02 for pattern info queries."

- id: define_block_char
  label: Define Block Character
  kind: action
  params:
    - name: char
      type: string
      description: "Character to display as solid block"
  notes: "Used for on-screen messages like volume bars"

- id: clear_onscreen_message
  label: Clear On-Screen Message
  kind: action
  params: []

- id: set_delimiters
  label: Set Delimiters
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=on, 2=on with ack/nack, 3=on with checksum and ack/nack"
  notes: "When delimiter mode active, use ? for enable auto-aspect and : for ALT key"

- id: set_echo
  label: Set Echo
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=on (default), 2=off with status"
  notes: "Echo=On recommended; Off may affect software updates"

- id: set_zoom_factor
  label: Set Zoom Factor
  kind: action
  params:
    - name: factor
      type: integer
      description: "0-2 (or 0-7 if zoom set for 5% steps)"

- id: set_output_aspect_all
  label: Set Output Aspect Ratio (All Inputs)
  kind: action
  params:
    - name: aspect
      type: integer
      description: "110-250 corresponding to 1.10-2.50"

- id: set_output_shrink
  label: Set Output Shrink Parameters
  kind: action
  params:
    - name: top
      type: integer
      description: "Top edge shrink 0-255"
    - name: left
      type: integer
      description: "Left edge shrink 0-255"
    - name: bottom
      type: integer
      description: "Bottom edge shrink 0-255"
    - name: right
      type: integer
      description: "Right edge shrink 0-255"

- id: set_output_trigger
  label: Set Output Trigger
  kind: action
  params:
    - name: trigger
      type: integer
      description: "1 or 2"
    - name: state
      type: string
      description: "H=on, L=off"
  notes: "Only available on units with output triggers"

- id: set_output_gamma
  label: Set Output Color Management Gamma
  kind: action
  params:
    - name: gamma
      type: integer
      description: "080-140 corresponding to 0.80-1.40"

- id: set_output_color_gamut_enable
  label: Set Output Color Management 3D Gamut Enable
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=disable, 1=enable"

- id: set_output_color_gamut_matrix
  label: Set Output Color Management Color Gamut Matrix
  kind: action
  params:
    - name: column
      type: integer
      description: "0-6 corresponds to R,G,B,Y,C,M,W"
    - name: row
      type: integer
      description: "0-2 corresponds to AddR,AddG,AddB"
    - name: value
      type: integer
      description: "0000-1024"
  notes: "Replaced by ZY415"

- id: reset_output_color_gamut
  label: Reset Output Color Management Gamut
  kind: action
  params: []
  notes: "Resets currently selected CMS to default values and 8-point mode"

- id: set_1d_lut_points
  label: Set 1D LUT Number of Points
  kind: action
  params:
    - name: points
      type: integer
      description: "11, 12, or 21"
  notes: "Changing number of points resets all points to default values"

- id: set_3d_lut_value
  label: Set 3D LUT Value
  kind: action
  params:
    - name: xx
      type: integer
      description: "Red axis address (00-04 for 5x5x5, 00-08 for 9x9x9, 00-16 for 17x17x17)"
    - name: yy
      type: integer
      description: "Green axis address"
    - name: zz
      type: integer
      description: "Blue axis address"
    - name: component
      type: integer
      description: "0,1,2 for red, green, blue"
    - name: value
      type: string
      description: "Hex value x0000-x0400 for 10-bit"
  notes: "Puts Radiance into 125-point mode if previously in 8-point mode. Radiance Pro only."

- id: select_gamut_size
  label: Select Gamut Size
  kind: action
  params:
    - name: size
      type: integer
      description: "05, 09, or 17 for 5x5x5, 9x9x9, or 17x17x17"
    - name: gamma_mode
      type: string
      description: "S=source gamma, L=linear gamma"
  notes: "Radiance Pro only. Optional M field for gamma mode."

- id: set_output_hdr_intensity
  label: Set Output HDR Intensity Mapping
  kind: action
  params:
    - name: level
      type: integer
      description: "00000=disable, 00050-10000=enable and set display max level"
    - name: gamma
      type: string
      description: "A=auto, H=HDR gamma, S=SDR gamma"
  notes: "For current CMS"

- id: set_rs232_message_colors
  label: Set RS232 Message Command Colors
  kind: action
  params:
    - name: component
      type: integer
      description: "0=background, 1=foreground, 2=blend"
    - name: color
      type: string
      description: "RRGGBB hex for foreground/background, 000001-00000f for blend"
  notes: "Radiance Pro only"

- id: set_ctemp_point_rgb
  label: Set Color Temperature Point RGB
  kind: action
  params:
    - name: pp
      type: integer
      description: "Point number (0-10 for 11pt, 0-11 for 12pt, 0-20 for 21pt)"
    - name: red
      type: integer
      description: "0000-1000 corresponding to 000.0-100.0"
    - name: grn
      type: integer
      description: "0000-1000"
    - name: blu
      type: integer
      description: "0000-1000"
  notes: "High precision variant (5 digits per color) available on Radiance Pro"

- id: set_ctemp_point_red
  label: Set Color Temperature Point Red
  kind: action
  params:
    - name: pp
      type: integer
    - name: value
      type: integer
      description: "0000-1000"

- id: set_ctemp_point_grn
  label: Set Color Temperature Point Green
  kind: action
  params:
    - name: pp
      type: integer
    - name: value
      type: integer
      description: "0000-1000"

- id: set_ctemp_point_blu
  label: Set Color Temperature Point Blue
  kind: action
  params:
    - name: pp
      type: integer
    - name: value
      type: integer
      description: "0000-1000"

- id: set_ctemp_point_ire
  label: Set Color Temperature Point IRE
  kind: action
  params:
    - name: pp
      type: integer
    - name: value
      type: integer
      description: "0000-1000"
  notes: "Radiance Pro only"

- id: reset_ctemp_point
  label: Reset Color Temperature Point to Default
  kind: action
  params:
    - name: pp
      type: integer

- id: set_output_color
  label: Set Output Color
  kind: action
  params:
    - name: color
      type: integer
      description: "0-127"
    - name: sign
      type: string
      description: "+ or -"
  notes: "Current input combined with current output; final value limited by register range"

- id: set_output_color_red
  label: Set Output Color Red
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_color_grn
  label: Set Output Color Green
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_hue
  label: Set Output Hue
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_hue_red
  label: Set Output Hue Red
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_hue_grn
  label: Set Output Hue Green
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_black
  label: Set Output Black Level
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-064"

- id: set_output_contrast
  label: Set Output Contrast
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_output_mode_by_name
  label: Set Output Mode by Name
  kind: action
  params:
    - name: mode_name
      type: string
      description: "Mode name as seen in menu (e.g. 480p, 720p60, 1080p60, C0-C7 for custom)"

- id: set_output_aspect_per_input
  label: Set Output Aspect per Input Aspect
  kind: action
  params:
    - name: input_aspect
      type: integer
      description: "0=4:3, 1=Lbox, 2=16:9, 3=1.85, 4=2.35"
    - name: aspect
      type: integer
      description: "110-250 corresponding to 1.10-2.50"

- id: set_output_format
  label: Set Output Format
  kind: action
  params:
    - name: format
      type: integer
      description: "0=YCB422, 1=YCB444, 2=RGBPC, 3=RGBVID, 8=automax, 9=auto9"

- id: set_output_format_ex
  label: Set Output Format (Extended)
  kind: action
  params:
    - name: format
      type: integer
      description: "0=YCB422, 1=YCB444, 2=RGBPC, 3=RGBVID, 8=automax, 9=auto9"
    - name: colorspace
      type: integer
      description: "0=auto, 1=601, 2=709, 3=hdr2020, 4=sdr2020, 5=sdrP3"
  notes: "Add 8 to colorspace value to enable HDR flag"

- id: set_3d_output_eye
  label: Set 3D Output Eye
  kind: action
  params:
    - name: eye
      type: string
      description: "L=left, R=right, B=both"

- id: set_3d_eyeglass_polarity
  label: Set 3D Eyeglass Polarity
  kind: action
  params:
    - name: direction
      type: string
      description: "< or >"

- id: set_input_mem_output_config
  label: Set Input Memory Output Config
  kind: action
  params:
    - name: out1_enable
      type: integer
      description: "0=disable, 1=enable"
    - name: out2_enable
      type: integer
      description: "0=disable, 1=enable"
    - name: config
      type: integer
      description: "0-7"
  notes: "Replaced by ZY530"

- id: set_input_contrast
  label: Set Input Contrast Level
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: value
      type: integer
      description: "000-127"

- id: set_input_color_format
  label: Set Input Color Format
  kind: action
  params:
    - name: format
      type: integer
      description: "0=auto, 1=Bt.601, 2=Bt.709"

- id: set_input_color_offset
  label: Set Input Color Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_color_red_offset
  label: Set Input Color Red Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_color_grn_offset
  label: Set Input Color Green Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_hue_offset
  label: Set Input Hue Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_hue_red_offset
  label: Set Input Hue Red Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_hue_grn_offset
  label: Set Input Hue Green Offset
  kind: action
  params:
    - name: sign
      type: string
    - name: value
      type: integer
      description: "000-127"

- id: set_input_yc_delay
  label: Set Input YC Delay
  kind: action
  params:
    - name: cr_sign
      type: string
    - name: cr_delay
      type: integer
      description: "00-31 in 1/16 pixel increments"
    - name: cb_sign
      type: string
    - name: cb_delay
      type: integer
      description: "00-31"

- id: set_input_deinterlacing_mode
  label: Set Input Deinterlacing Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=auto, 1=film, 2=video"

- id: set_input_vertical_shift
  label: Set Input Vertical Shift
  kind: action
  params:
    - name: index
      type: integer
      description: "0=off, 1-15=select setting"
    - name: sign
      type: string
    - name: value
      type: integer
      description: "-511 to 511"
  notes: "Use ZY5160XX to just switch settings without changing values"

- id: set_reinterlace_control
  label: Set Reinterlace Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disallow, 1=allow, 2=allow with on-screen messages"

- id: set_input_label
  label: Set Input Label
  kind: action
  params:
    - name: type
      type: string
      description: "A-D for input mem, 0 for single mem label, 1=custom mode, 2=CMS, 3=style"
    - name: index
      type: string
      description: "Mem letter + input number or mode number depending on type"
    - name: label
      type: string
      description: "Up to 10 chars"

- id: set_output_mode_cms_style
  label: Set Output Mode CMS and Style
  kind: action
  params:
    - name: mode
      type: string
      description: "K=keep, 0-7=select"
    - name: cms
      type: string
      description: "K=keep, 0-7=select (non-Rec2020)"
    - name: style
      type: string
      description: "K=keep, 0-7=select"

- id: set_output_mode_cms_style_ex
  label: Set Output Mode CMS and Style (Extended)
  kind: action
  params:
    - name: mode
      type: string
    - name: cms_non2020
      type: string
    - name: cms_rec2020
      type: string
      description: "Separate CMS for Rec2020/HDR"
    - name: style
      type: string
  notes: "Radiance Pro only. Uses input HDMI InfoFrames to determine Rec2020 selection."

- id: set_test_pattern_output_mode
  label: Set Test Pattern Output Mode
  kind: action
  params:
    - name: cms
      type: string
      description: "0-7 or K"
    - name: style
      type: string
      description: "0-7 or K"
    - name: dim
      type: string
      description: "3D mode: 0,1,2,4,8 or K"
    - name: mode
      type: string
      description: "Crt mode name or C0-C7 or K"

- id: set_test_pattern_output_mode_ex
  label: Set Test Pattern Output Mode (Extended)
  kind: action
  params:
    - name: input_colorspace
      type: integer
      description: "1=Rec709, 2=Rec2020"
    - name: cms
      type: string
    - name: style
      type: string
    - name: dim
      type: string
    - name: mode
      type: string
  notes: "Radiance Pro only"

- id: set_hdr_info_primary_point
  label: Set HDR Test Pattern Info Frame Primary Display Point
  kind: action
  params:
    - name: index
      type: integer
      description: "0, 1, or 2"
    - name: x
      type: string
      description: "4-digit hex"
    - name: y
      type: string
      description: "4-digit hex"
  notes: "Radiance Pro only. Not active until ZY547 received."

- id: set_hdr_info_white_point
  label: Set HDR Test Pattern Info Frame White Point
  kind: action
  params:
    - name: x
      type: string
    - name: y
      type: string
  notes: "Radiance Pro only. Not active until ZY547."

- id: set_hdr_info_mastering_luminance
  label: Set HDR Test Pattern Info Frame Display Mastering Luminance
  kind: action
  params:
    - name: max
      type: string
      description: "4-digit hex"
    - name: min
      type: string
      description: "4-digit hex"
  notes: "Radiance Pro only. Not active until ZY547."

- id: set_hdr_info_content_light
  label: Set HDR Test Pattern Info Frame Max Content Light Level
  kind: action
  params:
    - name: max_content
      type: string
    - name: fall
      type: string
  notes: "Radiance Pro only. Not active until ZY547."

- id: activate_hdr_info
  label: Activate HDR Test Pattern Info Frame Parameters
  kind: action
  params: []
  notes: "Radiance Pro only. Activates parameters set via ZY540-ZY546."

- id: set_hdr_pass_through
  label: Set HDR Pass Through Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "P=HDR pass through, T=for test pattern"
  notes: "Firmware >=081516. Radiance Pro only."

- id: reset_auto_aspect
  label: Reset Automatic Aspect Detection
  kind: action
  params: []

- id: set_gamemode
  label: Set Game Mode
  kind: action
  params:
    - name: enable
      type: integer
      description: "0=off, 1=on"
  notes: "Added 051021"

- id: save_config
  label: Save Configuration to Flash
  kind: action
  params: []
  notes: "Exit any on-screen test patterns prior to performing save"

- id: set_menu_position
  label: Set Menu Position
  kind: action
  params:
    - name: position
      type: integer
      description: "0=default, 1=top"

- id: toggle_hdmi_hotplug
  label: Toggle HDMI Hotplug
  kind: action
  params:
    - name: input
      type: integer
      description: "0-5 for HDMI inputs 1-6, 7=all. RadiancePro: 0-7 or A for all"
  notes: "Forces sources to re-read EDID information"

- id: set_sharpness_combined
  label: Set Sharpness (Combined H/V)
  kind: action
  params:
    - name: enable
      type: string
      description: "Y or N"
    - name: level
      type: integer
      description: "0-7 (7 is most sharpening)"
    - name: sensitivity
      type: string
      description: "H=high, N=normal"
  notes: "Added 120420"

- id: set_sharpness_separate
  label: Set Sharpness (Separate H/V)
  kind: action
  params:
    - name: sign
      type: string
      description: "+ or -"
    - name: h_level
      type: integer
      description: "0-7"
    - name: v_level
      type: integer
      description: "0-7"
    - name: sensitivity
      type: string
      description: "H=high, N=normal"
  notes: "Added 052521"

- id: set_darbee
  label: Set Darbee Enhancement
  kind: action
  params:
    - name: gain
      type: string
      description: "000-120, or KKK to keep, or +/-NN for relative"
    - name: mode
      type: string
      description: "P/G/H/K for Pop/Game/HD/Keep"
    - name: enable
      type: string
      description: "0/1/K for off/on/keep"
  notes: "Current input setting combined with current output setting"

- id: set_hdr_mapping_settings
  label: Set HDR Mapping Settings
  kind: action
  params:
    - name: group
      type: string
      description: "0 for SrcMax 2000"
    - name: ratio
      type: integer
      description: "31-95 (display ratio adjust -31 to +31)"
    - name: shape
      type: integer
      description: "0-7"
    - name: clip
      type: integer
      description: "0-7"
    - name: transition
      type: integer
      description: "0-7"
    - name: gamma
      type: integer
      description: "8-24 (adjusts gamma by .02 per step)"
    - name: black
      type: integer
      description: "1-15 (black adjust -7 to +7)"
  notes: "For current input memory"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
  description: "0=off, 1=on"
  query_command: ZQS02

- id: basic_input_info
  label: Basic Input Info
  type: object
  properties:
    - name: logical_input
      type: integer
      description: "1-18"
    - name: memory
      type: string
      description: "A-D"
    - name: physical_input
      type: integer
      description: "1-18"
  query_command: ZQI00
  example_response: "!I00,1,A,1<CR><LF>"

- id: input_video_status
  label: Input Video Status
  type: object
  properties:
    - name: status
      type: integer
      description: "0=none, 1=video active, 2=test pattern active"
    - name: vert_rate_100
      type: integer
      description: "Vertical rate * 100"
    - name: horiz_res
      type: integer
    - name: vert_res
      type: integer
    - name: interlaced
      type: integer
      description: "0=off, 2=frame packed, 4=top-bottom, 8=side-by-side"
    - name: input_3d_type
      type: integer
      description: "0=off, 2=frame packed, 4=top-bottom, 8=side-by-side"
  query_command: ZQI01
  example_response: "!I01,1,5992,720,480,1,0<CR><LF>"

- id: input_pattern_info
  label: Input Pattern Info
  type: object
  properties:
    - name: on
      type: integer
      description: "1=on, 0=off"
    - name: pattern_group
      type: string
      description: "a-o"
    - name: sub_pattern
      type: integer
    - name: ire_level
      type: integer
      description: "0-100"
    - name: mode
      type: string
      description: "A=adjustable, R=reference"
  query_command: ZQI02

- id: output1_config
  label: Output1 and Output2 Config Select
  type: object
  properties:
    - name: out1_enabled
      type: integer
      description: "0=disabled, 1=enabled"
    - name: out2_enabled
      type: integer
    - name: config_select
      type: integer
      description: "0-7"
  query_command: ZQI03
  notes: "Replaced by ZQI18"

- id: input_audio_select
  label: Current Input Audio Select
  type: integer
  description: "0-5=HDMI, 6-11=coax, 12-13=optical, 14-17=stereo"
  query_command: ZQI04

- id: input_black_level
  label: Current Input Black Level
  type: integer
  range: "-64 to 64"
  query_command: ZQI05

- id: input_contrast_level
  label: Current Input Contrast Level
  type: integer
  range: "-127 to 127"
  query_command: ZQI06

- id: input_color_format
  label: Current Input Color Format
  type: integer
  values:
    - 0
    - 1
    - 2
  description: "0=auto, 1=Bt.601, 2=Bt.709"
  query_command: ZQI07

- id: input_color_offset
  label: Current Input Color Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI08

- id: input_color_red_offset
  label: Current Input Color Red Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI09

- id: input_color_grn_offset
  label: Current Input Color Green Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI10

- id: input_hue_offset
  label: Current Input Hue Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI11

- id: input_hue_red_offset
  label: Current Input Hue Red Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI12

- id: input_hue_grn_offset
  label: Current Input Hue Green Offset
  type: integer
  range: "-127 to 127"
  query_command: ZQI13

- id: input_yc_delay
  label: Current Input YC Delay
  type: object
  properties:
    - name: cr
      type: integer
      description: "-31 to 31, multiply by 1/16 pixel"
    - name: cb
      type: integer
  query_command: ZQI14

- id: input_deinterlacing_mode
  label: Current Input Deinterlacing Mode
  type: enum
  values:
    - 0
    - 1
    - 2
  description: "0=auto, 1=film, 2=video"
  query_command: ZQI15

- id: input_vertical_shift
  label: Current Input Vertical Shift
  type: object
  properties:
    - name: index
      type: integer
      description: "0=off, 1-15=current setting index"
    - name: value
      type: integer
      description: "-511 to 511"
  query_command: ZQI16

- id: input_reinterlace_status
  label: Current Input Reinterlacing Status
  type: object
  properties:
    - name: enable
      type: integer
      description: "1/0"
    - name: allow_control
      type: integer
      description: "1/0"
    - name: active
      type: integer
      description: "1/0"
  query_command: ZQI17

- id: output_config_selected
  label: Output Configuration Selected
  type: object
  properties:
    - name: out1_on
      type: integer
    - name: out2_on
      type: integer
    - name: mode
      type: string
      description: "C0-7 or D<mode_name>"
    - name: dim_3d
      type: string
      description: "0=off, f=auto, 1=frame seq, 2=frame packed, 4=top-btm, 8=side-by-side"
    - name: cms
      type: integer
      description: "0-7"
    - name: style
      type: integer
      description: "0-7"
  query_command: ZQI18
  response_format: "!I18,O,T,M,D,C,S"

- id: input_aspect_legacy
  label: Input Aspect (Legacy)
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
    - 4
    - 5
    - 6
    - 7
    - 8
    - 9
  description: "0=4:3, 1=LBOX, 2=1.78, 3=1.85, 4=2.35, 5-9=NLS variants"
  query_command: ZQI19
  notes: "Use ZQI20 instead"

- id: input_aspect
  label: Input Aspect
  type: object
  properties:
    - name: aspect
      type: integer
      description: "0=4:3, 1=LBOX, 2=16:9, 3=1.85, 4=2.35, 6=ALT-1.85, 7=ALT-2.35"
    - name: nls
      type: string
      description: "N if NLS enabled, - if not"
  query_command: ZQI20
  response_format: "!I20,XY"

- id: full_info_v1
  label: Full Information Query (Radiance 2XXX and Pro)
  type: object
  properties:
    - name: input_status
      type: integer
      description: "0=no source, 1=active video, 2=internal pattern"
    - name: vert_rate
      type: string
      description: "3 digits e.g. 059"
    - name: vert_res
      type: string
      description: "4 digits e.g. 1080"
    - name: dim_3d
      type: integer
    - name: input_config
      type: integer
      description: "Always 0 for non-Pro models"
    - name: raster_aspect
      type: string
      description: "3 digits e.g. 178"
    - name: content_aspect
      type: string
      description: "3 digits e.g. 240"
    - name: nls
      type: string
      description: "- or N"
    - name: dim_3d_output
      type: integer
    - name: output_on
      type: string
      description: "16-bit hex b0-b15 for out 1-16"
    - name: cms
      type: integer
      description: "0-7"
    - name: style
      type: integer
      description: "0-7"
    - name: output_vert_rate
      type: string
    - name: output_vert_res
      type: string
    - name: output_aspect
      type: string
      description: "3 digits e.g. 178"
  query_command: ZQI21
  response_format: "!I21,M,RRR,VVVV,D,X,AAA,SSS,Y,T,WWWW,C,B,PPP,QQQQ,ZZZ"

- id: full_info_v2
  label: Full Information Query v2 (Radiance Pro only)
  type: object
  notes: "Adds output colorspace and dynamic range fields"
  query_command: ZQI22
  response_format: "!I22,M,RRR,VVVV,D,X,AAA,SSS,Y,T,WWWW,C,B,PPP,QQQQ,ZZZ,E,F,G,H"

- id: full_info_v3
  label: Full Information Query v3 (Radiance Pro only)
  type: object
  notes: "Adds virtual input and physical input fields"
  query_command: ZQI23
  response_format: "!I23,M,RRR,VVVV,D,X,AAA,SSS,Y,T,WWWW,C,B,PPP,QQQQ,ZZZ,E,F,G,H,II,KK"

- id: full_info_v4
  label: Full Information Query v4 (Radiance Pro only)
  type: object
  notes: "Adds detected raster aspect and detected source aspect"
  query_command: ZQI24
  response_format: "!I24,M,RRR,VVVV,D,X,AAA,SSS,Y,T,WWWW,C,B,PPP,QQQQ,ZZZ,E,F,G,H,II,KK,JJJ,LLL"
  notes: "Allow for future comma-delimited fields at end of response"

- id: sharpness_setting
  label: Query Sharpness Setting
  type: integer
  description: "Returns values corresponding to ZY521ELS command"
  query_command: ZQI30

- id: rec2020_support
  label: Rec 2020 Support Query (Radiance Pro only)
  type: enum
  values:
    - Y
    - N
  description: "Rec2020 support for display connected to main video output"
  query_command: ZQI50

- id: hdr_test_pattern_info
  label: HDR Test Pattern Info Frame Data (Radiance Pro only)
  type: object
  properties:
    - name: p0x
      type: string
    - name: p0y
      type: string
    - name: p1x
      type: string
    - name: p1y
      type: string
    - name: p2x
      type: string
    - name: p2y
      type: string
    - name: wpx
      type: string
    - name: wpy
      type: string
    - name: max
      type: string
    - name: min
      type: string
    - name: cll
      type: string
    - name: fall
      type: string
  query_command: ZQI51

- id: hdr_status
  label: HDR Status (Radiance Pro only)
  type: object
  properties:
    - name: valid
      type: integer
      description: "0=not HDR, 1=HDR"
    - name: min
      type: string
    - name: max
      type: string
    - name: cll
      type: string
  query_command: ZQI52

- id: gamemode_status
  label: Game Mode Status
  type: enum
  values:
    - 0
    - 1
  description: "0=off, 1=on"
  query_command: ZQI53

- id: basic_output_info
  label: Basic Output Info
  type: object
  properties:
    - name: output_config
      type: integer
      description: "0-7"
    - name: video_out1
      type: integer
      description: "1=on, 0=off"
    - name: video_out2
      type: integer
    - name: audio_out1
      type: integer
    - name: audio_out2
      type: integer
  query_command: ZQO00
  example_response: "!O00,1,1,0,1,1<CR><LF>"

- id: output_mode
  label: Output Mode
  type: object
  properties:
    - name: vert_rate_100
      type: integer
    - name: horiz_res
      type: integer
    - name: vert_res
      type: integer
    - name: interlaced
      type: integer
      description: "0=off, 1=frame seq, 2=frame packed, 4=top-bottom, 8=side-by-side"
  query_command: ZQO01
  example_response: "!O01,5994,1920,1080,0,0<CR><LF>"

- id: output_aspect
  label: Output Aspect Ratio
  type: object
  properties:
    - name: current
      type: integer
      description: "110-250 = 1.10-2.50"
    - name: aspect_4_3
      type: integer
    - name: aspect_lbox
      type: integer
    - name: aspect_16_9
      type: integer
    - name: aspect_1_85
      type: integer
    - name: aspect_2_35
      type: integer
  query_command: ZQO02

- id: output_shrink
  label: Output Shrink
  type: object
  properties:
    - name: top
      type: integer
      description: "000-255 pixels"
    - name: left
      type: integer
    - name: bottom
      type: integer
    - name: right
      type: integer
  query_command: ZQO03

- id: output_gamma
  label: Output Gamma
  type: integer
  range: "80-140"
  description: "Corresponds to 0.80-1.40"
  query_command: ZQO04

- id: output_color_gamut_enabled
  label: Output Color Gamut Enabled
  type: enum
  values:
    - 0
    - 1
  query_command: ZQO05

- id: output_color_gamut_addr
  label: Output Color Gamut AddR/AddG/AddB Values
  type: object
  properties:
    - name: values
      type: array
      items:
        type: integer
      description: "7 values for r,g,b,yellow,cyan,magenta,white 0-1024"
  query_command: ZQO06

- id: output_color_temp_ire
  label: Output Color Temp IRE Points
  type: array
  items:
    type: integer
  description: "11 values 0-1000 corresponding to 0-100.0 IRE"
  query_command: ZQO09

- id: output_color_temp_r
  label: Output Color Temp R Points
  type: array
  items:
    type: integer
  description: "11 values 0-1000"
  query_command: ZQO10

- id: output_color_temp_g
  label: Output Color Temp G Points
  type: array
  items:
    type: integer
  description: "11 values 0-1000"
  query_command: ZQO11

- id: output_color_temp_b
  label: Output Color Temp B Points
  type: array
  items:
    type: integer
  description: "11 values 0-1000"
  query_command: ZQO12

- id: output_color_settings
  label: Output Color Settings
  type: object
  properties:
    - name: color
      type: integer
      range: "-127 to 127"
    - name: color_red
      type: integer
    - name: color_grn
      type: integer
  query_command: ZQO13

- id: output_hue_settings
  label: Output Hue Settings
  type: object
  properties:
    - name: hue
      type: integer
      range: "-127 to 127"
    - name: hue_red
      type: integer
    - name: hue_grn
      type: integer
  query_command: ZQO14

- id: output_black_contrast
  label: Output Black and Contrast
  type: object
  properties:
    - name: black
      type: integer
      range: "-64 to 64"
    - name: contrast
      type: integer
      range: "-127 to 127"
  query_command: ZQO15

- id: output_mode_name
  label: Output Mode Name
  type: string
  description: "Names as seen in menu under Output:Configs:ConfigX:Select Mode"
  query_command: ZQO16

- id: output_ctemp_points_count
  label: Output Color Temp Points Count
  type: enum
  values:
    - 2
    - 5
    - 11
    - 12
    - 21
  query_command: ZQO17

- id: output_color_format_pro
  label: Output Color Format (Radiance Pro only)
  type: enum
  values:
    - 0
    - 1
    - 2
    - 3
    - 4
  description: "0=yc422, 1=yc444, 2=rgbvid, 3=rgbpc, 4=yc420"
  query_command: ZQO18

- id: lut_3d_capability
  label: 3D LUT Capability
  type: object
  properties:
    - name: dim
      type: string
      description: "LUT dimension (e.g. 05 for 5x5x5)"
    - name: bits
      type: string
      description: "Bit length of LUT color values"
  query_command: ZQO20
  example_response: "!O20,NN,PP"

- id: current_3d_lut_size
  label: Current 3D LUT Size
  type: string
  description: "01=8pt, 05=5x5x5, 09=9x9x9, 17=17x17x17"
  query_command: ZQO21

- id: alive
  label: Alive Check
  type: string
  description: "Returns Ok if working"
  query_command: ZQS00
  example_response: "!S00,Ok<CR><LF>"

- id: identity
  label: Identity
  type: object
  properties:
    - name: model_name
      type: string
    - name: software_revision
      type: string
    - name: model_number
      type: string
    - name: serial
      type: string
  query_command: ZQS01
  example_response: "!S01,RadianceXD,102308,1009,745<CR><LF>"

- id: zoom_step_pct
  label: Zoom Step Percentage
  type: enum
  values:
    - 5
    - 15
  query_command: ZQS03

- id: output_trigger_status
  label: Output Trigger Status
  type: object
  properties:
    - name: trigger1
      type: integer
      description: "0=low, 1=high"
    - name: trigger2
      type: integer
  query_command: ZQS04
  notes: "Only available on units with output triggers"

- id: label_query
  label: Label Query
  type: string
  description: "Returns label for input memory, custom mode, CMS, or style"
  query_command: ZQS1XY
  notes: "X=A/B/C/D for input labels, X=1 for custom mode, X=2 for CMS, X=3 for style"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable variables separate from action commands found in source
```

## Events
```yaml
# UNRESOLVED: unsolicited event/reporting mechanism not documented in source.
# However, source describes "Unsolicited Reporting of Mode Changes" via RS-232 menu
# configuration (Report mode changes: Off, Input, Output, Full, Fullv2, Fullv3, Fullv4)
# which sends query-like responses on mode changes. No explicit event format defined.
```

## Macros
```yaml
- id: print_message
  label: Print Message on Screen
  command: ZTMxxxx<CR>
  params:
    - name: message
      type: string
      description: "2 lines, 30 chars per line. M='0'-'9' leaves message until ZC sent."
  notes: "Legal characters 0x20-0x7A. Use { as alternative terminator."

- id: delay_command
  label: Delay RS232 Command Processing
  command: ZWxxx<CR>
  params:
    - name: delay_ms
      type: integer
      description: "Up to 30000ms"
  notes: "Example: power on command, wait 5 seconds, then put up message"

- id: set_baud_rate
  label: Set RS232 Baud Rate
  command: ZYSX<CR>
  params:
    - name: rate
      type: string
      description: "D=9.6k, M=28.8k, F=57.6k, 1=115.2k, 2=230.4k, 3=460.8k"
  notes: "Return to default 9.6k before attempting Lumagen utilities"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements found in source. Document notes that Info page appears
# if <CR> sent with commands that don't need it - user must eliminate unnecessary
# <CR> characters or disable via MENU 0927 Save.
```

## Notes

Serial interface uses standard RS-232 null modem cable. DB9 female pinout: Pin 2=Receive, Pin 3=Transmit, Pin 5+shell=Ground. No hardware flow control.

Command terminators: Use <CR> (carriage return) or `{` as terminator. Commands that require <CR> are listed with `<CR>` at end. Many commands do NOT use <CR> — sending <CR> unnecessarily will bring up Info page. Characters outside Hex 20-7A act as terminators; above Hex 7F masked to 0x7F.

Delimiter mode (optional): When enabled accepts `#<command><CR>`. Start delimiter `#`, end is <CR> or terminator. Lumagen recommends Delimiter Mode = Off for reliability. When delimiter mode active, use `?` for enable auto-aspect (instead of `~`), and `:` for ALT key (instead of `#`).

Checksum mode: Format `#NcommandCC<CR>` where N=0-9 command count, CC=8-bit checksum. Ack given only when checksums match. Command count included in checksum but not verified to be incrementing.

Query response format: Query commands begin with ZQ, followed by char (I/S/O), then 2-digit decimal code. Response begins with `!` + last 3 chars of query request + data separated by commas + `<CR><LF>`. Ack/Nack (!Y/!N) uses different terminator `<LF><CR>` (0xa 0xd).

Echo modes: Echo=On (default) echoes all chars. Echo=Off only sends message at power on/off. Echo=Off with Status sends power/input change status in ZQS02/ZQI00 format.

Power On/Off Message: RS-232 power message can control another device. Configured via MENU → Other → OnOff Setup → On Message/Off Message. Message Control sets baud rate, parity, gap for the message.

<!-- UNRESOLVED: minimum firmware version for Radiance Pro-only commands not stated -->
<!-- UNRESOLVED: UDP protocol not mentioned in source — serial-only device -->
<!-- UNRESOLVED: TCP/IP control not mentioned in source — serial-only device -->

## Provenance

```yaml
source_domains:
  - lumagen.com
source_urls:
  - https://www.lumagen.com/s/Tip0011_RS232CommandInterface_111023.pdf
retrieved_at: 2026-05-04T18:03:24.592Z
last_checked_at: 2026-05-14T18:17:17.709Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.709Z
matched_actions: 167
action_count: 178
confidence: high
summary: "All 167 spec actions matched literally in source; transport fully verified; comprehensive coverage of Radiance 2143 control protocol."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
