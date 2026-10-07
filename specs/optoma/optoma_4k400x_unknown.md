---
spec_id: admin/optoma-4k400x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma 4K400X Control Spec"
manufacturer: Optoma
model_family: 4K400X
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - 4K400X
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://region-resource.optoma.com/products/import/Documents/13cdc4ab-4017-4930-a4fd-d023d407c4fe.pdf
retrieved_at: 2026-07-14T01:41:39.059Z
last_checked_at: 2026-10-07T12:40:55.690Z
generated_at: 2026-10-07T12:40:55.690Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document title says \"RS232 Protocol Function List\" but does not name the 4K400X model explicitly — model name taken from user input. Firmware version range not stated."
  - "no explicit safety warnings or interlock procedures found in source."
  - "Source document is titled \"RS232 Protocol Function List\" and does not explicitly name the 4K400X model. Model name taken from user-supplied input."
  - "Firmware version compatibility not stated in source."
  - "No explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source."
  - "EDID settings (HDMI 1/2, HDBaseT) listed in source table but no write/read command codes provided."
  - "Change Password function listed under Security but no command codes provided in source."
  - "Network Reset, Regulatory, and several Info items (F-MCU/S-MCU/F-Image/Formatter/LAN Version, Brightness Mode, Power Level read) listed in source but no command codes provided."
  - "WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS listed with example values but no command codes provided. Apply button listed but no command code."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:40:55.690Z
  matched_actions: 217
  action_count: 217
  confidence: medium
  summary: "All 217 action units match source command codes and values; transport serial params verified; no unrepresented source commands found. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Optoma 4K400X Control Spec

## Summary
RS-232 serial control spec for the Optoma 4K400X 4K projector. Covers image settings, geometric correction, 3D, PIP/PBP, lens control, power management, network control toggles, security, input source selection, and system status queries. Command format is ASCII: `~{pid}{cmd} {value}\r` where pid is a 2-digit projector ID (00=all), cmd is a 3-digit command code, and value is a parameter. All commands terminate with CR (0x0D).

<!-- UNRESOLVED: source document title says "RS232 Protocol Function List" but does not name the 4K400X model explicitly — model name taken from user input. Firmware version range not stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# Note: device supports baud rates 9600, 14400, 19200, 38400, 57600, 115200.
# Default is 19200. Lower baud rates may be recommended for long cable runs.
# UART16550 FIFO: Disable
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred: power on/off commands present (~000)
- queryable    # inferred: many read/query commands present
- levelable    # inferred: brightness, contrast, color, and other 0-100 ranges
- routable     # inferred: input source selection commands present
```

## Actions
```yaml
# Command format: ~{pid}{cmd} {value}\r
# {pid} = 2-digit projector ID (00 = all projectors, 01-99 = individual).
# Default pid "00" used in all command templates below.
# Write response: P = pass, F = fail.
# All commands terminate with CR (0x0D).
#
# Common parameter:
#   pid - string - Projector ID 00-99 (00=all). Replace "00" in commands to target specific unit.

# ── Power & System ──
- id: power
  label: Power
  kind: action
  command: "~00000 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: resync
  label: Re-Sync
  kind: action
  command: "~00001 1\r"
  params: []

- id: av_mute
  label: AV Mute
  kind: action
  command: "~00002 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: freeze
  label: Freeze
  kind: action
  command: "~00004 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Unfreeze, 1=Freeze"

# ── Input Source ──
- id: input_source
  label: Input Source
  kind: action
  command: "~00012 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=HDMI1, 15=HDMI2, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI"

# ── Display Mode ──
- id: display_mode
  label: Display Mode
  kind: action
  command: "~00020 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Presentation, 2=Bright, 3=Cinema, 4=sRGB, 5=User, 9=3D, 13=DICOM SIM., 19=Blending, 21=HDR"

# ── Image Adjustment ──
- id: brightness_set
  label: Brightness Set
  kind: action
  command: "~00021 {value}\r"
  params:
    - name: value
      type: integer
      description: "Brightness level 0-100"

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "~00022 {value}\r"
  params:
    - name: value
      type: integer
      description: "Contrast level 0-100"

- id: sharpness
  label: Sharpness
  kind: action
  command: "~00023 {value}\r"
  params:
    - name: value
      type: integer
      description: "Sharpness 1-15"

- id: red_gain
  label: Red Gain
  kind: action
  command: "~00024 {value}\r"
  params:
    - name: value
      type: integer
      description: "Red gain 0-100"

- id: green_gain
  label: Green Gain
  kind: action
  command: "~00025 {value}\r"
  params:
    - name: value
      type: integer
      description: "Green gain 0-100"

- id: blue_gain
  label: Blue Gain
  kind: action
  command: "~00026 {value}\r"
  params:
    - name: value
      type: integer
      description: "Blue gain 0-100"

- id: red_bias
  label: Red Bias
  kind: action
  command: "~00027 {value}\r"
  params:
    - name: value
      type: integer
      description: "Red bias 0-100"

- id: green_bias
  label: Green Bias
  kind: action
  command: "~00028 {value}\r"
  params:
    - name: value
      type: integer
      description: "Green bias 0-100"

- id: blue_bias
  label: Blue Bias
  kind: action
  command: "~00029 {value}\r"
  params:
    - name: value
      type: integer
      description: "Blue bias 0-100"

- id: brilliant_color
  label: BrilliantColor
  kind: action
  command: "~00034 {value}\r"
  params:
    - name: value
      type: integer
      description: "BrilliantColor 0-10"

- id: gamma
  label: Gamma
  kind: action
  command: "~00035 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 11=DICOM SIM., 12=2.4"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "~00036 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Standard, 2=Cool, 4=Warm"

- id: color_space
  label: Color Space
  kind: action
  command: "~00037 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Auto, 2=RGB, 3=YUV, 4=RGB(16-235)"

- id: ultradetail
  label: UltraDetail
  kind: action
  command: "~00041 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 4=1, 5=2, 6=3"

- id: pure_color
  label: PureColor
  kind: action
  command: "~00042 {value}\r"
  params:
    - name: value
      type: integer
      description: "PureColor 0-5"

- id: tint
  label: Tint
  kind: action
  command: "~00044 {value}\r"
  params:
    - name: value
      type: integer
      description: "Tint 0-100"

- id: color
  label: Color
  kind: action
  command: "~00045 {value}\r"
  params:
    - name: value
      type: integer
      description: "Color 0-100"

- id: brightness_step_down
  label: Brightness Step Down
  kind: action
  command: "~00046 1\r"
  params: []

- id: brightness_step_up
  label: Brightness Step Up
  kind: action
  command: "~00046 2\r"
  params: []

- id: contrast_step_down
  label: Contrast Step Down
  kind: action
  command: "~00047 1\r"
  params: []

- id: contrast_step_up
  label: Contrast Step Up
  kind: action
  command: "~00047 2\r"
  params: []

# ── Aspect Ratio ──
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "~00060 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto"

# ── Image Shift ──
- id: image_shift_h
  label: Image Shift H
  kind: action
  command: "~00063 {value}\r"
  params:
    - name: value
      type: integer
      description: "Horizontal image shift 0-100"

- id: image_shift_v
  label: Image Shift V
  kind: action
  command: "~00064 {value}\r"
  params:
    - name: value
      type: integer
      description: "Vertical image shift 0-100"

# ── Keystone ──
- id: h_keystone
  label: H Keystone
  kind: action
  command: "~00065 {value}\r"
  params:
    - name: value
      type: integer
      description: "Horizontal keystone 0-40"

- id: v_keystone
  label: V Keystone
  kind: action
  command: "~00066 {value}\r"
  params:
    - name: value
      type: integer
      description: "Vertical keystone 0-40"

# ── IR Function ──
- id: ir_function
  label: IR Function
  kind: action
  command: "~00011 {value}\r"
  params:
    - name: value
      type: enum
      description: "Front: 4=Off 5=On; Top: 6=Off 7=On; HDBaseT: 9=On 10=Off"

# ── Options ──
- id: language
  label: Language
  kind: action
  command: "~00070 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=English, 2=Deutsch, 3=Français, 4=Italiano, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 21=ไทย, 22=Türkçe, 25=TiếngViệt, 26=Bahasa Indonesia, 27=Română, 28=Slovakian"

- id: projection
  label: Projection
  kind: action
  command: "~00071 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Front, 2=Rear, 3=Ceiling-top, 4=Rear-top"

- id: menu_location
  label: Menu Location
  kind: action
  command: "~00072 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Top-left, 2=Top-right, 3=Center, 4=Bottom-left, 5=Bottom-right"

- id: security_timer_mmd_dd_hh
  label: Security Timer MM/DD/HH
  kind: action
  command: "~00077 {value}\r"
  params:
    - name: value
      type: string
      description: "MMDDHH format (RS232 only)"

- id: security
  label: Security
  kind: action
  command: "~00078 {value}\r"
  params:
    - name: value
      type: string
      description: "0=Off, 1=On, followed by nnnn PIN"

- id: projector_id_set
  label: Projector ID Set
  kind: action
  command: "~00079 {value}\r"
  params:
    - name: value
      type: integer
      description: "Projector ID 0-99"

- id: logo
  label: Logo
  kind: action
  command: "~00082 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Default, 3=Neutral"

- id: lens_shift
  label: Lens Shift
  kind: action
  command: "~00084 {value}\r"
  params:
    - name: value
      type: enum
      description: "3=Up, 4=Down, 5=Left, 6=Right"

# ── Power Settings ──
- id: source_lock
  label: Source Lock
  kind: action
  command: "~00100 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: high_altitude
  label: High Altitude
  kind: action
  command: "~00101 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: information_hide
  label: Information Hide
  kind: action
  command: "~00102 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: background_color
  label: Background Color
  kind: action
  command: "~00104 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=None, 1=Blue, 3=Red, 4=Green, 6=Gray, 7=Logo"

- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "~00105 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: auto_power_off
  label: Auto Power Off
  kind: action
  command: "~00106 {value}\r"
  params:
    - name: value
      type: integer
      description: "Minutes 0-180 (5 min increments)"

- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "~00107 {value}\r"
  params:
    - name: value
      type: integer
      description: "Minutes 0-990 (30 min increments)"

- id: brightness_mode
  label: Brightness Mode
  kind: action
  command: "~00110 {value}\r"
  params:
    - name: value
      type: enum
      description: "2=Eco Mode, 6=Constant Power, 7=Constant Luminance"

- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "~00112 1\r"
  params: []

- id: power_mode_standby
  label: Power Mode (Standby)
  kind: action
  command: "~00114 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Eco, 1=Active, 3=Communications"

- id: hot_key_settings
  label: Hot-Key Settings
  kind: action
  command: "~00117 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Aspect Ratio, 2=Freeze Screen"

# ── Remote Control Simulation ──
- id: remote_control_simulation
  label: Remote Control Simulation
  kind: action
  command: "~00140 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Power, 2=Power Off, 10=Up, 11=Left, 12=Enter, 13=Right, 14=Down, 15=V Keystone+, 16=V Keystone-, 19=Brightness, 20=Menu, 21=Zoom, 24=AV Mute, 28=Contrast, 31=Lens shift, 32=Zoom+, 33=Zoom-, 34=Focus+, 35=Focus-, 36=Mode, 40=Info, 41=Auto(Re-sync), 47=Input(Source), 51-60=Digits 1-0, 61=Gamma, 63=PIP, 64=Lens H(left), 65=Lens H(Right), 66=Lens V(Up), 67=Lens V(Down), 68=H Keystone+, 69=H Keystone-, 70=Hot Key(F1), 73=Pattern, 74=Exit"

# ── Warp and Blend ──
- id: warp_blend_settings
  label: Warp and Blend Settings
  kind: action
  command: "~00142 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=All Off, 3=All On, 4=Blend Off"

- id: warp_blend_memory
  label: Warp and Blend Memory
  kind: action
  command: "~00147 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=User1, 2=User2, 3=User3"

# ── System Update ──
- id: system_update
  label: System Update
  kind: action
  command: "~00168 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Notification Off, 1=Notification On, 9=Execute Update"

# ── PureEngine ──
- id: pure_motion
  label: PureMotion
  kind: action
  command: "~00190 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=Level 1, 2=Level 2, 3=Level 3"

- id: dynamic_black
  label: Dynamic Black
  kind: action
  command: "~00191 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: trigger_12v
  label: 12V Trigger
  kind: action
  command: "~00192 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "~00195 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=White Grid, 2=White, 3=Green Grid, 4=Magenta Grid, 5=Red, 6=Green, 7=Blue, 8=Yellow, 9=Magenta, 10=Cyan, 11=Black"

- id: pure_motion_demo
  label: PureMotion Demo
  kind: action
  command: "~00197 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=H Split, 2=V Split"

# ── Reset Commands ──
- id: color_matching_reset
  label: Color Matching Reset
  kind: action
  command: "~00215 1\r"
  params: []

- id: extreme_black
  label: Extreme Black
  kind: action
  command: "~00218 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: pure_contrast
  label: PureContrast
  kind: action
  command: "~00219 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

# ── 3D Settings ──
- id: three_d_mode
  label: 3D Mode
  kind: action
  command: "~00230 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 4=On"

- id: three_d_sync_invert
  label: 3D Sync Invert
  kind: action
  command: "~00231 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: three_d_sync_out
  label: 3D Sync Out
  kind: action
  command: "~00232 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=To Emitter, 1=To Next Projector"

- id: three_d_frame_delay
  label: 3D Frame Delay
  kind: action
  command: "~00233 {value}\r"
  params:
    - name: value
      type: integer
      description: "Frame delay 1-200"

- id: three_d_reset
  label: 3D Reset
  kind: action
  command: "~00234 1\r"
  params: []

- id: lr_reference
  label: L/R Reference
  kind: action
  command: "~00236 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Field GPIO, 1=1ST FRAME"

# ── Geometric Correction ──
- id: h_arc
  label: H Arc
  kind: action
  command: "~00300 {value}\r"
  params:
    - name: value
      type: integer
      description: "H Arc 0-100"

- id: v_arc
  label: V Arc
  kind: action
  command: "~00301 {value}\r"
  params:
    - name: value
      type: integer
      description: "V Arc 0-100"

# ── PIP/PBP ──
- id: pip_pbp_screen
  label: PIP/PBP Screen
  kind: action
  command: "~00302 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=PIP, 2=PBP"

- id: pip_location
  label: PIP Location
  kind: action
  command: "~00303 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=PIP-TopLeft, 2=PIP-TopRight, 3=PIP-BottomLeft, 4=PIP-BottomRight, 5=PBP Main Left, 6=PBP Main Top, 7=PBP Main Right, 8=PBP Main Bottom"

- id: pip_size
  label: PIP Size
  kind: action
  command: "~00304 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Large, 2=Medium, 3=Small"

- id: pip_sub_source
  label: PIP Sub Source
  kind: action
  command: "~00305 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=HDMI1, 4=HDMI2, 10=HDBaseT, 11=3G-SDI, 17=DisplayPort"

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "~00306 1\r"
  params: []

# ── Lens ──
- id: lens_zoom
  label: Lens Zoom
  kind: action
  command: "~00307 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Zoom In(+), 2=Zoom Out(-)"

- id: lens_focus
  label: Lens Focus
  kind: action
  command: "~00308 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Focus(+), 2=Focus(-)"

# ── Power Level ──
- id: power_level
  label: Power Level
  kind: action
  command: "~00326 {value}\r"
  params:
    - name: value
      type: integer
      description: "Power level 1-100"

# ── Color Matching (R/G/B/C/Y/M Hue/Saturation/Gain) ──
- id: cm_red_hue
  label: Color Matching Red Hue
  kind: action
  command: "~00327 {value}\r"
  params:
    - name: value
      type: integer
      description: "Red hue 0-254"

- id: cm_green_hue
  label: Color Matching Green Hue
  kind: action
  command: "~00328 {value}\r"
  params:
    - name: value
      type: integer
      description: "Green hue 0-254"

- id: cm_blue_hue
  label: Color Matching Blue Hue
  kind: action
  command: "~00329 {value}\r"
  params:
    - name: value
      type: integer
      description: "Blue hue 0-254"

- id: cm_cyan_hue
  label: Color Matching Cyan Hue
  kind: action
  command: "~00330 {value}\r"
  params:
    - name: value
      type: integer
      description: "Cyan hue 0-254"

- id: cm_yellow_hue
  label: Color Matching Yellow Hue
  kind: action
  command: "~00331 {value}\r"
  params:
    - name: value
      type: integer
      description: "Yellow hue 0-254"

- id: cm_magenta_hue
  label: Color Matching Magenta Hue
  kind: action
  command: "~00332 {value}\r"
  params:
    - name: value
      type: integer
      description: "Magenta hue 0-254"

- id: cm_red_saturation
  label: Color Matching Red Saturation
  kind: action
  command: "~00333 {value}\r"
  params:
    - name: value
      type: integer
      description: "Red saturation 0-254"

- id: cm_green_saturation
  label: Color Matching Green Saturation
  kind: action
  command: "~00334 {value}\r"
  params:
    - name: value
      type: integer
      description: "Green saturation 0-254"

- id: cm_blue_saturation
  label: Color Matching Blue Saturation
  kind: action
  command: "~00335 {value}\r"
  params:
    - name: value
      type: integer
      description: "Blue saturation 0-254"

- id: cm_cyan_saturation
  label: Color Matching Cyan Saturation
  kind: action
  command: "~00336 {value}\r"
  params:
    - name: value
      type: integer
      description: "Cyan saturation 0-254"

- id: cm_yellow_saturation
  label: Color Matching Yellow Saturation
  kind: action
  command: "~00337 {value}\r"
  params:
    - name: value
      type: integer
      description: "Yellow saturation 0-254"

- id: cm_magenta_saturation
  label: Color Matching Magenta Saturation
  kind: action
  command: "~00338 {value}\r"
  params:
    - name: value
      type: integer
      description: "Magenta saturation 0-254"

- id: cm_red_gain
  label: Color Matching Red Gain
  kind: action
  command: "~00339 {value}\r"
  params:
    - name: value
      type: integer
      description: "Red gain 0-254"

- id: cm_green_gain
  label: Color Matching Green Gain
  kind: action
  command: "~00340 {value}\r"
  params:
    - name: value
      type: integer
      description: "Green gain 0-254"

- id: cm_blue_gain
  label: Color Matching Blue Gain
  kind: action
  command: "~00341 {value}\r"
  params:
    - name: value
      type: integer
      description: "Blue gain 0-254"

- id: cm_cyan_gain
  label: Color Matching Cyan Gain
  kind: action
  command: "~00342 {value}\r"
  params:
    - name: value
      type: integer
      description: "Cyan gain 0-254"

- id: cm_yellow_gain
  label: Color Matching Yellow Gain
  kind: action
  command: "~00343 {value}\r"
  params:
    - name: value
      type: integer
      description: "Yellow gain 0-254"

- id: cm_magenta_gain
  label: Color Matching Magenta Gain
  kind: action
  command: "~00344 {value}\r"
  params:
    - name: value
      type: integer
      description: "Magenta gain 0-254"

- id: cm_white_red
  label: Color Matching White Red
  kind: action
  command: "~00345 {value}\r"
  params:
    - name: value
      type: integer
      description: "White red 0-254"

- id: cm_white_green
  label: Color Matching White Green
  kind: action
  command: "~00346 {value}\r"
  params:
    - name: value
      type: integer
      description: "White green 0-254"

- id: cm_white_blue
  label: Color Matching White Blue
  kind: action
  command: "~00347 {value}\r"
  params:
    - name: value
      type: integer
      description: "White blue 0-254"

# ── Lens Function ──
- id: lens_function
  label: Lens Function
  kind: action
  command: "~00349 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=Lock, 2=Unlock"

- id: remote_code_set
  label: Remote Code Set
  kind: action
  command: "~00350 {value}\r"
  params:
    - name: value
      type: integer
      description: "Remote code 0-99"

# ── Lens Memory ──
- id: lens_memory_apply
  label: Lens Memory Apply Position
  kind: action
  command: "~00359 {value}\r"
  params:
    - name: value
      type: integer
      description: "Memory slot 1-5"

- id: lens_memory_save
  label: Lens Memory Save Current Position
  kind: action
  command: "~00360 {value}\r"
  params:
    - name: value
      type: integer
      description: "Memory slot 1-5"

- id: lens_memory_reset
  label: Lens Memory Reset
  kind: action
  command: "~00361 1\r"
  params: []

# ── Keypad LED ──
- id: keypad_led
  label: Keypad LED Settings
  kind: action
  command: "~00362 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

# ── 3D-2D ──
- id: three_d_to_two_d
  label: 3D-2D
  kind: action
  command: "~00400 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=3D, 1=L, 2=R"

# ── 3D Format ──
- id: three_d_format
  label: 3D Format
  kind: action
  command: "~00405 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Auto, 1=Side by Side, 2=Top and Bottom, 3=Frame Sequential, 7=Frame Packing"

# ── Network Control Toggles ──
- id: wlan
  label: WLAN
  kind: action
  command: "~00450 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: crestron
  label: Crestron Control
  kind: action
  command: "~00454 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: extron
  label: Extron Control
  kind: action
  command: "~00455 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: pj_link
  label: PJ Link Control
  kind: action
  command: "~00456 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: amx_device_discovery
  label: AMX Device Discovery
  kind: action
  command: "~00457 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: telnet_control
  label: Telnet Control
  kind: action
  command: "~00458 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

- id: http_control
  label: HTTP Control
  kind: action
  command: "~00459 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

# ── Digital Zoom ──
- id: digital_zoom_h
  label: Digital Zoom H
  kind: action
  command: "~00504 {value}\r"
  params:
    - name: value
      type: integer
      description: "Horizontal zoom 50-400 (%)"

- id: digital_zoom_v
  label: Digital Zoom V
  kind: action
  command: "~00505 {value}\r"
  params:
    - name: value
      type: integer
      description: "Vertical zoom 50-400 (%)"

# ── Wall Color ──
- id: wall_color
  label: Wall Color
  kind: action
  command: "~00506 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=Blackboard, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray, 7=Light Yellow"

# ── Always On ──
- id: always_on
  label: Sleep Timer Always On
  kind: action
  command: "~00507 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=No, 1=Yes"

# ── Image Reset ──
- id: image_reset
  label: Image Reset
  kind: action
  command: "~00509 1\r"
  params: []

# ── Menu Settings ──
- id: menu_timer
  label: Menu Timer
  kind: action
  command: "~00515 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=5sec, 3=10sec, 4=15sec"

- id: rgb_reset
  label: RGB Gain/Bias Reset
  kind: action
  command: "~00517 1\r"
  params: []

# ── Lens Calibration ──
- id: lens_calibration
  label: Lens Calibration
  kind: action
  command: "~00525 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=No, 1=Yes"

- id: menu_transparency
  label: Menu Transparency
  kind: action
  command: "~00526 {value}\r"
  params:
    - name: value
      type: integer
      description: "Menu transparency 0-9"

# ── Wheel Index ──
- id: filter_wheel_index
  label: Filter Wheel Index
  kind: action
  command: "~00528 {value}\r"
  params:
    - name: value
      type: integer
      description: "Filter wheel index 0-9999"

- id: phosphor_wheel_index
  label: Phosphor Wheel Index
  kind: action
  command: "~00529 {value}\r"
  params:
    - name: value
      type: integer
      description: "Phosphor wheel index 0-9999"

# ── Security Timer ──
- id: security_timer_month
  label: Security Timer Month
  kind: action
  command: "~00537 {value}\r"
  params:
    - name: value
      type: integer
      description: "Month 0-12"

- id: security_timer_day
  label: Security Timer Day
  kind: action
  command: "~00538 {value}\r"
  params:
    - name: value
      type: integer
      description: "Day 0-29"

- id: security_timer_hour
  label: Security Timer Hour
  kind: action
  command: "~00539 {value}\r"
  params:
    - name: value
      type: integer
      description: "Hour 0-23"

# ── OSD / Display Resets ──
- id: reset_osd
  label: Reset OSD
  kind: action
  command: "~00546 1\r"
  params: []

# ── Light Sensor ──
- id: light_sensor
  label: Light Sensor
  kind: action
  command: "~00552 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Default, 2=Manual"

# ── Serial Port Path ──
- id: serial_port_path
  label: Serial Port Path
  kind: action
  command: "~00557 {value}\r"
  params:
    - name: value
      type: enum
      description: "1=RS232, 2=HDBaseT"

# ── Geometric Reset ──
- id: geometric_reset
  label: Geometric Correction Reset
  kind: action
  command: "~00561 1\r"
  params: []

# ── Auto Source ──
- id: auto_source
  label: Auto Source
  kind: action
  command: "~00563 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=On"

# ── HDR Settings ──
- id: dynamic_range_hdr
  label: DynamicRange HDR
  kind: action
  command: "~00565 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Off, 1=Auto"

- id: hdr_picture_mode
  label: HDR Picture Mode
  kind: action
  command: "~00566 {value}\r"
  params:
    - name: value
      type: enum
      description: "0=Bright, 1=Standard, 2=Film, 3=Detail, 4=SMPTE 2084"

# ── Four Corners (each corner has H and V position commands) ──
- id: four_corners_top_left_h
  label: Four Corners Top-left H
  kind: action
  command: "~00581 {value}\r"
  params:
    - name: value
      type: integer
      description: "Top-left horizontal 0-120"

- id: four_corners_top_left_v
  label: Four Corners Top-left V
  kind: action
  command: "~00582 {value}\r"
  params:
    - name: value
      type: integer
      description: "Top-left vertical 0-80"

- id: four_corners_top_right_h
  label: Four Corners Top-right H
  kind: action
  command: "~00583 {value}\r"
  params:
    - name: value
      type: integer
      description: "Top-right horizontal 0-120"

- id: four_corners_top_right_v
  label: Four Corners Top-right V
  kind: action
  command: "~00584 {value}\r"
  params:
    - name: value
      type: integer
      description: "Top-right vertical 0-80"

- id: four_corners_bottom_left_h
  label: Four Corners Bottom-left H
  kind: action
  command: "~00585 {value}\r"
  params:
    - name: value
      type: integer
      description: "Bottom-left horizontal 0-120"

- id: four_corners_bottom_left_v
  label: Four Corners Bottom-left V
  kind: action
  command: "~00586 {value}\r"
  params:
    - name: value
      type: integer
      description: "Bottom-left vertical 0-80"

- id: four_corners_bottom_right_h
  label: Four Corners Bottom-right H
  kind: action
  command: "~00587 {value}\r"
  params:
    - name: value
      type: integer
      description: "Bottom-right horizontal 0-120"

- id: four_corners_bottom_right_v
  label: Four Corners Bottom-right V
  kind: action
  command: "~00588 {value}\r"
  params:
    - name: value
      type: integer
      description: "Bottom-right vertical 0-80"

- id: four_corners_selector
  label: Four Corners Position Selector
  kind: action
  command: "~00059 {value}\r"
  params:
    - name: value
      type: integer
      description: "Corner position selector 1-16 (1-4=Top-left, 5-8=Top-right, 9-12=Bottom-left, 13-16=Bottom-right)"

# Source literal ~XX150 also documents Sub Vert Refresh with command value 14.
# For this source-token entry, replace XX with the projector ID, append a space,
# the value, and CR. This is a read command; pass response is Ok followed by nnn..nn.
- id: sub_vertical_refresh_query
  label: Sub Vertical Refresh Query
  kind: action
  command: "~XX150"
  params:
    - name: value
      type: integer
      description: "14"
```

## Feedbacks
```yaml
# Read command format: ~{pid}{cmd} {subparam}\r
# Read response: Ok{value} (pass) or F (fail)
# {pid} = 2-digit projector ID (00=all). Default "00" used below.

# ── Power Status ──
- id: power_status_query
  label: Power Status Query
  type: query
  command: "~00124 1\r"
  query_command: "~00124 1\r"
  response: "Ok{0|1}"
  description: "0=Off, 1=On"

# ── Display Mode ──
- id: display_mode_query
  label: Display Mode Query
  type: query
  command: "~00123 1\r"
  query_command: "~00123 1\r"
  response: "Ok{value}"
  description: "See display_mode action for value mapping"

# ── Image Adjustment Queries ──
- id: brightness_query
  label: Brightness Query
  type: query
  command: "~00125 1\r"
  query_command: "~00125 1\r"
  response: "Ok{0-100}"

- id: contrast_query
  label: Contrast Query
  type: query
  command: "~00126 1\r"
  query_command: "~00126 1\r"
  response: "Ok{0-100}"

- id: aspect_ratio_query
  label: Aspect Ratio Query
  type: query
  command: "~00127 1\r"
  query_command: "~00127 1\r"
  response: "Ok{value}"
  description: "See aspect_ratio action for value mapping"

- id: color_temperature_query
  label: Color Temperature Query
  type: query
  command: "~00128 1\r"
  query_command: "~00128 1\r"
  response: "Ok{value}"
  description: "0=Standard, 1=Cool, 3=Warm"

- id: projection_query
  label: Projection Query
  type: query
  command: "~00129 1\r"
  query_command: "~00129 1\r"
  response: "Ok{0-3}"
  description: "0=Front, 1=Rear, 2=Ceiling-top, 3=Rear-top"

- id: output_3d_state_query
  label: Output 3D State Query
  type: query
  command: "~00130 1\r"
  query_command: "~00130 1\r"
  response: "Ok{0|1}"
  description: "0=2D, 1=3D"

# ── Input Source Queries ──
- id: main_source_query
  label: Main Source Query
  type: query
  command: "~00121 1\r"
  query_command: "~00121 1\r"
  response: "Ok{value}"
  description: "7=HDMI1, 8=HDMI2, 15=DisplayPort, 16=HDBaseT, 18=3G-SDI"

- id: sub_source_query
  label: Sub Source Query
  type: query
  command: "~00131 1\r"
  query_command: "~00131 1\r"
  response: "Ok{value}"

# ── Warp and Blend Queries ──
- id: warp_blend_pc_connection_query
  label: Warp/Blend PC Connection Query
  type: query
  command: "~00132 3\r"
  query_command: "~00132 3\r"
  response: "Ok{0|1}"
  description: "0=No, 1=Yes"

- id: warp_blend_settings_query
  label: Warp/Blend Settings Query
  type: query
  command: "~00132 1\r"
  query_command: "~00132 1\r"
  response: "Ok{value}"
  description: "0=All Off, 3=All On, 4=Blend Off"

- id: warp_blend_memory_query
  label: Warp/Blend Memory Query
  type: query
  command: "~00137 1\r"
  query_command: "~00137 1\r"
  response: "Ok{0-3}"
  description: "0=Off, 1=User1, 2=User2, 3=User3"

# ── IR Function Query ──
- id: ir_function_front_query
  label: IR Function Front Query
  type: query
  command: "~00542 1\r"
  query_command: "~00542 1\r"
  response: "Ok{0|1}"

- id: ir_function_top_query
  label: IR Function Top Query
  type: query
  command: "~00542 2\r"
  query_command: "~00542 2\r"
  response: "Ok{0|1}"

# ── Geometric/Zoom Queries (via ~543) ──
- id: image_shift_h_query
  label: Image Shift H Query
  type: query
  command: "~00543 1\r"
  query_command: "~00543 1\r"
  response: "Ok{0-100}"

- id: image_shift_v_query
  label: Image Shift V Query
  type: query
  command: "~00543 2\r"
  query_command: "~00543 2\r"
  response: "Ok{0-100}"

- id: v_keystone_query
  label: V Keystone Query
  type: query
  command: "~00543 3\r"
  query_command: "~00543 3\r"
  response: "Ok{0-40}"

- id: h_keystone_query
  label: H Keystone Query
  type: query
  command: "~00543 4\r"
  query_command: "~00543 4\r"
  response: "Ok{0-40}"

- id: v_arc_query
  label: V Arc Query
  type: query
  command: "~00543 5\r"
  query_command: "~00543 5\r"
  response: "Ok{0-100}"

- id: h_arc_query
  label: H Arc Query
  type: query
  command: "~00543 6\r"
  query_command: "~00543 6\r"
  response: "Ok{0-100}"

- id: digital_zoom_v_query
  label: Digital Zoom V Query
  type: query
  command: "~00543 7\r"
  query_command: "~00543 7\r"
  response: "Ok{50-400}"

- id: digital_zoom_h_query
  label: Digital Zoom H Query
  type: query
  command: "~00543 8\r"
  query_command: "~00543 8\r"
  response: "Ok{50-400}"

# ── Security Timer Queries ──
- id: security_timer_month_query
  label: Security Timer Month Query
  type: query
  command: "~00544 1\r"
  query_command: "~00544 1\r"
  response: "Ok{00-12}"

- id: security_timer_day_query
  label: Security Timer Day Query
  type: query
  command: "~00544 2\r"
  query_command: "~00544 2\r"
  response: "Ok{00-29}"

- id: security_timer_hour_query
  label: Security Timer Hour Query
  type: query
  command: "~00544 3\r"
  query_command: "~00544 3\r"
  response: "Ok{00-23}"

# ── Lens Function Query ──
- id: lens_function_query
  label: Lens Function Query
  type: query
  command: "~00545 4\r"
  query_command: "~00545 4\r"
  response: "Ok{0|1}"
  description: "0=Lock, 1=Unlock"

# ── System Information Queries (via ~150) ──
- id: info_string_query
  label: Info String Query
  type: query
  command: "~00150 1\r"
  query_command: "~00150 1\r"
  response: "Ok{string}"

- id: native_resolution_query
  label: Native Resolution Query
  type: query
  command: "~00150 2\r"
  query_command: "~00150 2\r"
  response: "Ok{e.g. 1920x1080}"

- id: main_source_info_query
  label: Main Source Info Query
  type: query
  command: "~00150 3\r"
  query_command: "~00150 3\r"
  response: "Ok{e.g. HDMI}"

- id: main_resolution_query
  label: Main Resolution Query
  type: query
  command: "~00150 4\r"
  query_command: "~00150 4\r"
  response: "Ok{e.g. 1920x1080}"

- id: main_signal_format_query
  label: Main Signal Format Query
  type: query
  command: "~00150 5\r"
  query_command: "~00150 5\r"
  response: "Ok{e.g. DVI-D}"

- id: main_pixel_clock_query
  label: Main Pixel Clock Query
  type: query
  command: "~00150 6\r"
  query_command: "~00150 6\r"
  response: "Ok{string}"

- id: main_horz_refresh_query
  label: Main Horizontal Refresh Query
  type: query
  command: "~00150 7\r"
  query_command: "~00150 7\r"
  response: "Ok{e.g. 00x00}"

- id: main_vert_refresh_query
  label: Main Vertical Refresh Query
  type: query
  command: "~00150 8\r"
  query_command: "~00150 8\r"
  response: "Ok{e.g. 60Hz}"

- id: sub_source_info_query
  label: Sub Source Info Query
  type: query
  command: "~00150 9\r"
  query_command: "~00150 9\r"
  response: "Ok{string}"

- id: sub_resolution_query
  label: Sub Resolution Query
  type: query
  command: "~00150 10\r"
  query_command: "~00150 10\r"
  response: "Ok{e.g. 1920x1080}"

- id: sub_signal_format_query
  label: Sub Signal Format Query
  type: query
  command: "~00150 11\r"
  query_command: "~00150 11\r"
  response: "Ok{e.g. DVI-D}"

- id: sub_pixel_clock_query
  label: Sub Pixel Clock Query
  type: query
  command: "~00150 12\r"
  query_command: "~00150 12\r"
  response: "Ok{string}"

- id: sub_horz_refresh_query
  label: Sub Horizontal Refresh Query
  type: query
  command: "~00150 13\r"
  query_command: "~00150 13\r"
  response: "Ok{e.g. 00x00}"

- id: sub_vert_refresh_query
  label: Sub Vertical Refresh Query
  type: query
  command: "~00545 14\r"
  query_command: "~00545 14\r"
  response: "Ok{e.g. 60Hz}"

- id: light_source_mode_query
  label: Light Source Mode Query
  type: query
  command: "~00150 15\r"
  query_command: "~00150 15\r"
  response: "Ok{string}"

- id: standby_power_mode_query
  label: Standby Power Mode Query
  type: query
  command: "~00150 16\r"
  query_command: "~00150 16\r"
  response: "Ok{0|1|3}"
  description: "0=Off, 1=Active, 2=Eco, 3=Communications"

- id: dhcp_query
  label: DHCP Query
  type: query
  command: "~00150 17\r"
  query_command: "~00150 17\r"
  response: "Ok{0|1}"

- id: system_temperature_query
  label: System Temperature Query
  type: query
  command: "~00150 18\r"
  query_command: "~00150 18\r"
  response: "Ok{e.g. 48}"

# ── Standalone System Queries ──
- id: model_name_query
  label: Model Name Query
  type: query
  command: "~00151 1\r"
  query_command: "~00151 1\r"
  response: "Ok{value}"
  description: "5=Optoma WUXGA, 6=Optoma UHD"

- id: software_version_query
  label: Software Version Query
  type: query
  command: "~00122 1\r"
  query_command: "~00122 1\r"
  response: "Ok{version string}"

- id: fw_version_query
  label: Firmware Version Query
  type: query
  command: "~00122 1\r"
  query_command: "~00122 1\r"
  response: "Ok{version string}"

- id: lan_fw_version_query
  label: LAN FW Version Query
  type: query
  command: "~00357 1\r"
  query_command: "~00357 1\r"
  response: "Ok{version string}"

- id: serial_port_baud_rate_query
  label: Serial Port Baud Rate Query
  type: query
  command: "~00153 1\r"
  query_command: "~00153 1\r"
  response: "Ok{9600|14400|19200|38400|57600|115200}"

- id: system_update_notification_query
  label: System Update Notification Query
  type: query
  command: "~00158 1\r"
  query_command: "~00158 1\r"
  response: "Ok{0|1}"

- id: av_mute_query
  label: AV Mute Query
  type: query
  command: "~00355 1\r"
  query_command: "~00355 1\r"
  response: "Ok{0|1}"

# ── Fan Speed Queries ──
- id: fan1_speed_query
  label: Fan 1 Speed Query
  type: query
  command: "~00351 1\r"
  query_command: "~00351 1\r"
  response: "Ok{0000-9999}"

- id: fan2_speed_query
  label: Fan 2 Speed Query
  type: query
  command: "~00351 2\r"
  query_command: "~00351 2\r"
  response: "Ok{0000-9999}"

- id: fan3_speed_query
  label: Fan 3 Speed Query
  type: query
  command: "~00351 3\r"
  query_command: "~00351 3\r"
  response: "Ok{0000-9999}"

- id: fan4_speed_query
  label: Fan 4 Speed Query
  type: query
  command: "~00351 4\r"
  query_command: "~00351 4\r"
  response: "Ok{0000-9999}"

# ── Temperature ──
- id: system_temperature_direct_query
  label: System Temperature Direct Query
  type: query
  command: "~00352 1\r"
  query_command: "~00352 1\r"
  response: "Ok{0000-9999}"

# ── Serial Number ──
- id: serial_number_query
  label: Serial Number Query
  type: query
  command: "~00353 1\r"
  query_command: "~00353 1\r"
  response: "Ok{serial string}"

# ── Network Queries ──
- id: lan_ip_query
  label: LAN IP Address Query
  type: query
  command: "~00087 3\r"
  query_command: "~00087 3\r"
  response: "Ok{nnn.nnn.nnn.nnn}"

- id: mac_address_query
  label: MAC Address Query
  type: query
  command: "~00555 1\r"
  query_command: "~00555 1\r"
  response: "Ok{nn:nn:nn:nn:nn:nn}"

- id: wlan_ip_query
  label: WLAN IP Address Query
  type: query
  command: "~00451 2\r"
  query_command: "~00451 2\r"
  response: "Ok{nnn.nnn.nnn.nnn}"

- id: wlan_ssid_query
  label: WLAN SSID Query
  type: query
  command: "~00451 3\r"
  query_command: "~00451 3\r"
  response: "Ok{SSID string}"

- id: wlan_start_ip_query
  label: WLAN Start IP Query
  type: query
  command: "~00451 5\r"
  query_command: "~00451 5\r"
  response: "Ok{nnn.nnn.nnn.nnn}"

- id: wlan_end_ip_query
  label: WLAN End IP Query
  type: query
  command: "~00451 6\r"
  query_command: "~00451 6\r"
  response: "Ok{nnn.nnn.nnn.nnn}"

# ── Projection Hours ──
- id: projection_hours_query
  label: Projection Hours Query
  type: query
  command: "~00108 1\r"
  query_command: "~00108 1\r"
  response: "Ok{hour digits}"

# ── Projector ID ──
- id: projector_id_query
  label: Projector ID Query
  type: query
  command: "~00558 1\r"
  query_command: "~00558 1\r"
  response: "Ok{00-99}"

# ── Color Info Queries ──
- id: color_depth_query
  label: Color Depth Query
  type: query
  command: "~00156 1\r"
  query_command: "~00156 1\r"
  response: "Ok{e.g. 8bit RGB}"

- id: color_format_query
  label: Color Format Query
  type: query
  command: "~00157 1\r"
  query_command: "~00157 1\r"
  response: "Ok{e.g. BT.2020 HDR}"

# ── Wheel Index Queries ──
- id: filter_wheel_index_query
  label: Filter Wheel Index Query
  type: query
  command: "~00530 1\r"
  query_command: "~00530 1\r"
  response: "Ok{0000-9999}"

- id: phosphor_wheel_index_query
  label: Phosphor Wheel Index Query
  type: query
  command: "~00531 1\r"
  query_command: "~00531 1\r"
  response: "Ok{0000-9999}"
```

## Variables
```yaml
# No settable continuous variables beyond those already represented as Actions.
```

## Events
```yaml
# Unsolicited system auto-response. Device sends INFO{state} without polling.
- id: system_auto_response
  label: System Auto Response
  type: notification
  command: "INFO{state}\r"
  description: "0=Standby, 1=Warming up, 2=Cooling Down, 3=Out of Range, 4=Lamp Fail (LED Fail), 5=Thermal Switch Error, 6=Fan Lock, 7=Over Temperature, 8=Lamp Hours Running Out, 9=Cover Open, 10=Lamp Ignite Fail, 11=Format Board Power On Fail, 12=Color Wheel Unexpected Stop, 13=Over Temperature, 14=FAN 1 Lock, 15=FAN 2 Lock, 16=FAN 3 Lock, 17=FAN 4 Lock, 18=FAN 5 Lock, 19=LAN fail then restart, 20=LD lower than 60%, 21=LD NTC (1) Over Temperature, 22=LD NTC (2) Over Temperature, 23=High Ambient Temperature, 24=System Ready"
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source.
```

## Notes
- **Command format:** `~{pid}{cmd} {value}\r`. Lead code `~` (0x7E), 2-digit projector ID (00=all), 3-digit command code, space (0x20), variable value, CR (0x0D).
- **Write response:** `P` = pass, `F` = fail.
- **Read response:** `Ok{value}` = pass, `F` = fail.
- **System auto-response:** `INFO{state}` — unsolicited, device pushes state changes.
- **Baud rate:** Default 19200. Device supports 9600, 14400, 19200, 38400, 57600, 115200. Lower rates recommended for long cable runs.
- **UART16550 FIFO:** Disabled.
- **Freeze release:** Freeze can be released by menu key, exit key, and direct source key (Note 1 in source).
- **Projector ID:** First 2 digits after `~` select target projector (00 = broadcast to all). Replace `00` in command templates with 01-99 for individual control.
- **Telnet/HTTP/PJ-Link/Crestron/Extron/AMX:** The device supports enabling these control protocols via RS-232 commands (~454-459), but the source document only describes the RS-232 command syntax. Command syntax for those alternative transports is not documented here.

<!-- UNRESOLVED: Source document is titled "RS232 Protocol Function List" and does not explicitly name the 4K400X model. Model name taken from user-supplied input. -->
<!-- UNRESOLVED: Firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: No explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source. -->
<!-- UNRESOLVED: EDID settings (HDMI 1/2, HDBaseT) listed in source table but no write/read command codes provided. -->
<!-- UNRESOLVED: Change Password function listed under Security but no command codes provided in source. -->
<!-- UNRESOLVED: Network Reset, Regulatory, and several Info items (F-MCU/S-MCU/F-Image/Formatter/LAN Version, Brightness Mode, Power Level read) listed in source but no command codes provided. -->
<!-- UNRESOLVED: WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS listed with example values but no command codes provided. Apply button listed but no command code. -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
  - optomaeurope.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://www.optomaeurope.com/ContentStorage/Documents/731aa26e-4842-4414-999a-422879b17cee.pdf
  - https://region-resource.optoma.com/products/import/Documents/13cdc4ab-4017-4930-a4fd-d023d407c4fe.pdf
retrieved_at: 2026-07-14T01:41:39.059Z
last_checked_at: 2026-10-07T12:40:55.690Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:40:55.690Z
matched_actions: 217
action_count: 217
confidence: medium
summary: "All 217 action units match source command codes and values; transport serial params verified; no unrepresented source commands found. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document title says \"RS232 Protocol Function List\" but does not name the 4K400X model explicitly — model name taken from user input. Firmware version range not stated."
- "no explicit safety warnings or interlock procedures found in source."
- "Source document is titled \"RS232 Protocol Function List\" and does not explicitly name the 4K400X model. Model name taken from user-supplied input."
- "Firmware version compatibility not stated in source."
- "No explicit safety warnings, interlock procedures, or power-on sequencing requirements found in source."
- "EDID settings (HDMI 1/2, HDBaseT) listed in source table but no write/read command codes provided."
- "Change Password function listed under Security but no command codes provided in source."
- "Network Reset, Regulatory, and several Info items (F-MCU/S-MCU/F-Image/Formatter/LAN Version, Brightness Mode, Power Level read) listed in source but no command codes provided."
- "WLAN Subnet Mask, LAN Subnet Mask/Gateway/DNS listed with example values but no command codes provided. Apply button listed but no command code."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
