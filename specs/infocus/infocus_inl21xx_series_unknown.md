---
spec_id: admin/infocus-inl21xx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "InFocus INL21xx Series Control Spec"
manufacturer: InFocus
model_family: "INL21xx Series"
aliases: []
compatible_with:
  manufacturers:
    - InFocus
  models:
    - "INL21xx Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-15T02:06:44.135Z
last_checked_at: 2026-06-01T22:35:52.402Z
generated_at: 2026-06-01T22:35:52.402Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact models in the INL21xx series not enumerated in source; S036 notes mention INL2156, INL2158, INL2159 specifically."
  - "UART16550 FIFO disable stated as \"Disable\" in source; not a standard config knob, noted here."
  - "source has a typo here (7E 30 30 32 30 30) - opcode 0200 collides with S072; S072 also 0200."
  - "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements. Source mentions projector ID 00=99 addressing and a power-on password (S002) but no safety-critical interlocks."
  - "firmware version compatibility not stated in source. The \"INL21xx series\" model range is named only in S036's range note; the source does not enumerate which model numbers belong to the series."
verification:
  verdict: verified
  checked_at: 2026-06-01T22:35:52.402Z
  matched_actions: 136
  action_count: 136
  confidence: medium
  summary: "Every spec action matched its hex opcode in the source table; all 109 send commands, 28 read queries, and 1 unsolicited event are represented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# InFocus INL21xx Series Control Spec

## Summary
RS-232 control protocol for the InFocus INL21xx series DLP projectors. The source is a "Std DLP" command sheet covering 109 send commands, 28 read queries, and 1 unsolicited event, with hex payloads transmitted at 9600 baud 8N1 terminated by `<CR>` (0x0D).

<!-- UNRESOLVED: exact models in the INL21xx series not enumerated in source; S036 notes mention INL2156, INL2158, INL2159 specifically. -->

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
  # UNRESOLVED: UART16550 FIFO disable stated as "Disable" in source; not a standard config knob, noted here.
auth:
  type: none  # inferred: no transport auth procedure in source
```

**Projector addressing:** commands default to projector ID 00 (all projectors); IDs 00-99 supported (set via S047).

## Traits
```yaml
powerable: true  # inferred from S001 power on/off
routable: true   # inferred from S010 source select
queryable: true  # inferred from R001-R028 query commands
levelable: true  # inferred from S049 volume, S012/S013/S027/S028 brightness/contrast
```

## Actions
```yaml
# S001 - Power
- id: power
  label: Power
  kind: action
  command: "7E 30 30 30 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S002 - Power ON with Password
- id: power_on_with_password
  label: Power ON with Password
  kind: action
  command: "7E 30 30 30 30 20 31 7E {password} 0D"
  params:
    - name: password
      type: string
      description: "4-digit password as ASCII; e.g. ~0000 to ~9999"

# S003 - Resync
- id: resync
  label: Resync
  kind: action
  command: "7E 30 30 30 31 20 31 0D"
  params: []

# S004 - AV Mute
- id: av_mute
  label: AV Mute
  kind: action
  command: "7E 30 30 30 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S005 - Mute
- id: mute_v3
  label: Mute (legacy opcode ~0003)
  kind: action
  command: "7E 30 30 30 33 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S006 - Freeze / Unfreeze
- id: freeze
  label: Freeze
  kind: action
  command: "7E 30 30 30 34 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Unfreeze, 1=Freeze, 2=Unfreeze (backward compatible)"

# S007 - Zoom Plus
- id: zoom_plus
  label: Zoom Plus
  kind: action
  command: "7E 30 30 30 35 20 31 0D"
  params: []

# S008 - Zoom Minus
- id: zoom_minus
  label: Zoom Minus
  kind: action
  command: "7E 30 30 30 36 20 31 0D"
  params: []

# S009 - IR Function On/Off
- id: ir_function
  label: IR Function
  kind: action
  command: "7E 30 30 31 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off, 1=On"

# S010 - Direct Source Commands
- id: select_source
  label: Direct Source
  kind: action
  command: "7E 30 30 31 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 5, 6, 9, 10, 15, 21]
      description: "1=HDMI1, 5=VGA, 6=VGA2, 9=S-Video, 10=Video, 15=HDMI2, 21=HDBaseT"

# S011 - Picture Mode
- id: picture_mode
  label: Picture Mode
  kind: action
  command: "7E 30 30 32 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4, 5, 9, 12, 13, 14, 15, 22, 26, 27, 28, 29]
      description: "1=Presentation, 2=Bright, 3=Movie(Cinema), 4=sRGB, 5=User, 9=3D, 12=Game(Football), 13=DICOM SIM., 14=ISF Day, 15=ISF Night, 22=HDR SIM., 26=HLG SIM., 27=Rec.709, 28=Dark Cinema, 29=Football"

# S012 - Brightness (range)
- id: brightness_set
  label: Brightness
  kind: action
  command: "7E 30 30 32 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]
      description: "Signed integer, ASCII-encoded (e.g. -50 = 2D 35 30)"

# S013 - Contrast (range)
- id: contrast_set
  label: Contrast
  kind: action
  command: "7E 30 30 32 32 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S014 - Sharpness (range)
- id: sharpness_set
  label: Sharpness
  kind: action
  command: "7E 30 30 32 33 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [1, 15]

# S015 - RGB Red Gain
- id: rgb_red_gain
  label: RGB Red Gain
  kind: action
  command: "7E 30 30 32 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S016 - RGB Green Gain
- id: rgb_green_gain
  label: RGB Green Gain
  kind: action
  command: "7E 30 30 32 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S017 - RGB Blue Gain
- id: rgb_blue_gain
  label: RGB Blue Gain
  kind: action
  command: "7E 30 30 32 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S018 - RGB Red Bias
- id: rgb_red_bias
  label: RGB Red Bias
  kind: action
  command: "7E 30 30 32 37 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S019 - RGB Green Bias
- id: rgb_green_bias
  label: RGB Green Bias
  kind: action
  command: "7E 30 30 32 38 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S020 - RGB Blue Bias
- id: rgb_blue_bias
  label: RGB Blue Bias
  kind: action
  command: "7E 30 30 32 39 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S021 - BrilliantColor
- id: brilliant_color
  label: BrilliantColor
  kind: action
  command: "7E 30 30 33 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [1, 10]

# S022 - Gamma
- id: gamma
  label: Gamma
  kind: action
  command: "7E 30 30 33 35 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4, 5, 6, 8, 12]
      description: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 8=2.6, 12=2.4"

# S023 - Color Temperature
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "7E 30 30 33 36 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4]
      description: "1=Warm, 2=Medium(Standard), 3=Cold, 4=Cool"

# S024 - Color Space
- id: color_space
  label: Color Space
  kind: action
  command: "7E 30 30 33 37 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4]
      description: "1=Auto, 2=RGB(0-255), 3=YUV, 4=RGB(16-235)"

# S025 - Tint
- id: tint
  label: Tint
  kind: action
  command: "7E 30 30 34 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S026 - Saturation
- id: saturation
  label: Saturation (Colour)
  kind: action
  command: "7E 30 30 34 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S027 - Brightness +/- (step)
- id: brightness_step
  label: Brightness Step
  kind: action
  command: "7E 30 30 34 36 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2]
      description: "1=Brightness -, 2=Brightness +"

# S028 - Contrast +/- (step)
- id: contrast_step
  label: Contrast Step
  kind: action
  command: "7E 30 30 34 37 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2]
      description: "1=Contrast -, 2=Contrast +"

# S029 - Four Corners Adjustment (16 sub-positions under one opcode)
- id: four_corners
  label: Four Corners Adjustment
  kind: action
  command: "7E 30 30 35 39 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
      description: "1-4=top-left {right+,left+,up+,down+}, 5-8=top-right, 9-12=bottom-left, 13-16=bottom-right"

# S030 - Format (Aspect Ratio)
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "7E 30 30 36 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 5, 6, 7, 16, 19]
      description: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto, 16=21:9, 19=FULL"

# S031 - Edge Mask
- id: edge_mask
  label: Edge Mask
  kind: action
  command: "7E 30 30 36 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 10]

# S032 - Zoom
- id: zoom
  label: Zoom
  kind: action
  command: "7E 30 30 36 32 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-5, 25]

# S033 - H Image Shift
- id: h_image_shift
  label: Horizontal Image Shift
  kind: action
  command: "7E 30 30 36 33 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-100, 100]

# S034 - V Image Shift
- id: v_image_shift
  label: Vertical Image Shift
  kind: action
  command: "7E 30 30 36 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-100, 100]

# S035 - H Keystone
- id: h_keystone
  label: Horizontal Keystone
  kind: action
  command: "7E 30 30 36 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-30, 30]

# S036 - V Keystone
- id: v_keystone
  label: Vertical Keystone
  kind: action
  command: "7E 30 30 36 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-40, 40]
      description: "RT/ST: -40..+40 typical; -30..+30 for INL2156, INL2158, INL2159; ST others: -20..+20"

# S037 - Auto Keystone
- id: auto_keystone
  label: Auto Keystone
  kind: action
  command: "7E 30 30 36 39 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S038 - Language
- id: language
  label: Language
  kind: action
  command: "7E 30 30 37 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      range: [1, 34]
      description: "1=English, 2=Deutsch, 3=Français, 4=Italiana, 5=Español, 6=Português, 7=Polski, 8=Nederlands, 9=Svenska, 10=Norsk/Dansk, 11=Suomi, 12=ελληνικά, 13=繁體中文, 14=簡体中文, 15=日本語, 16=한국어, 17=Русский, 18=Magyar, 19=Čeština, 20=عربي, 21=ไทย, 22=Türkçe, 23=فارسی, 24=हिंदी, 25=Tiếng Việt, 26=Bahasa Indonesia, 27=Română, 28=Slovenčina, 29=Pilipino, 30=Melayu, 31=বাংলা, 32=Norsk, 33=Dansk, 34=(unlabeled)"

# S039 - Projection
- id: projection_orientation
  label: Projection Orientation
  kind: action
  command: "7E 30 30 37 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4]
      description: "1=Front, 2=Rear, 3=Front-Ceiling, 4=Rear-Ceiling"

# S040 - Menu Location
- id: menu_location
  label: Menu Location
  kind: action
  command: "7E 30 30 37 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3, 4, 5]
      description: "1=Top Left, 2=Top Right, 3=Centre, 4=Bottom Left, 5=Bottom Right"

# S041 - Signal Frequency
- id: signal_frequency
  label: Signal Frequency
  kind: action
  command: "7E 30 30 37 33 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-5, 5]
      description: "By signal"

# S042 - Signal Phase
- id: signal_phase
  label: Signal Phase
  kind: action
  command: "7E 30 30 37 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 63]
      description: "By signal"

# S043 - Signal H. Position
- id: signal_h_position
  label: Signal Horizontal Position
  kind: action
  command: "7E 30 30 37 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-5, 5]
      description: "By timing"

# S044 - Signal V. Position
- id: signal_v_position
  label: Signal Vertical Position
  kind: action
  command: "7E 30 30 37 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-5, 5]
      description: "By timing"

# S045 - Security Timer (Month/Day/Hour)
- id: security_timer
  label: Security Timer
  kind: action
  command: "7E 30 30 37 37 20 {mm} {dd} {hh} 0D"
  params:
    - name: mm
      type: integer
      range: [0, 12]
      description: "Month"
    - name: dd
      type: integer
      range: [0, 30]
      description: "Day"
    - name: hh
      type: integer
      range: [0, 24]
      description: "Hour"

# S046 - Security On/Off
- id: security
  label: Security
  kind: action
  command: "7E 30 30 37 38 20 {value} 7E {password} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"
    - name: password
      type: string
      description: "4-digit password as ASCII; e.g. ~0000 to ~9999"

# S047 - Projector ID
- id: projector_id
  label: Projector ID
  kind: action
  command: "7E 30 30 37 39 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 99]
      description: "00=all projectors, 01-99=individual"

# S048 - Mute (alternate opcode)
- id: mute_v80
  label: Mute (opcode ~0080)
  kind: action
  command: "7E 30 30 38 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S049 - Volume
- id: volume_set
  label: Volume
  kind: action
  command: "7E 30 30 38 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 10]

# S050 - Logo
- id: logo
  label: Logo
  kind: action
  command: "7E 30 30 38 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 3]
      description: "1=Default, 2=User, 3=Neutral"

# S051 - Projection Location
- id: projection_location
  label: Projection Location
  kind: action
  command: "7E 30 30 38 34 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Auto, 1=Desktop, 2=Ceiling"

# S052 - Closed Captioning
- id: closed_captioning
  label: Closed Captioning
  kind: action
  command: "7E 30 30 38 38 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=CC1, 2=CC2"

# S053 - Screen Type (WXGA/WUXGA only)
- id: screen_type
  label: Screen Type
  kind: action
  command: "7E 30 30 39 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=16:9, 1=16:10"

# S054 - Signal Automatic
- id: signal_automatic
  label: Signal Automatic
  kind: action
  command: "7E 30 30 39 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off, 1=On"

# S055 - High Altitude
- id: high_altitude
  label: High Altitude
  kind: action
  command: "7E 30 30 31 30 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S056 - Information Hide
- id: information_hide
  label: Information Hide
  kind: action
  command: "7E 30 30 31 30 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S057 - Keypad Lock
- id: keypad_lock
  label: Keypad Lock
  kind: action
  command: "7E 30 30 31 30 33 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S058 - Background Color
- id: background_color
  label: Background Color
  kind: action
  command: "7E 30 30 31 30 34 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=None, 1=Blue, 2=Black, 3=Red, 4=Green, 5=White, 6=Gray, 7=Logo"

# S059 - Direct Power On
- id: direct_power_on
  label: Direct Power On
  kind: action
  command: "7E 30 30 31 30 35 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S060 - Auto Power Off
- id: auto_power_off
  label: Auto Power Off
  kind: action
  command: "7E 30 30 31 30 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 180]
      description: "Minutes; 5 minutes per step"

# S061 - Sleep Timer
- id: sleep_timer
  label: Sleep Timer
  kind: action
  command: "7E 30 30 31 30 37 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 990]
      description: "Minutes; 30 minutes per step"

# S062 - Lamp Reminder
- id: lamp_reminder
  label: Lamp Reminder
  kind: action
  command: "7E 30 30 31 30 39 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S063 - Brightness Mode (lamp power)
- id: brightness_mode
  label: Brightness Mode
  kind: action
  command: "7E 30 30 31 31 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [1, 2, 4, 6]
      description: "1=Bright, 2=Eco, 4=Dynamic, 6=Power"

# S064 - Lamp Reset
- id: lamp_reset
  label: Lamp Reset
  kind: action
  command: "7E 30 30 31 31 31 20 31 0D"
  params: []

# S065 - Reset to Default (no password, security off)
- id: reset_to_default
  label: Reset to Default
  kind: action
  command: "7E 30 30 31 31 32 20 31 0D"
  params: []
  # Note: source lists this row twice (S065 and S066) with identical command bytes; one entry retained.

# S067 - Signal Power On
- id: signal_power_on
  label: Signal Power On
  kind: action
  command: "7E 30 30 31 31 33 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S068 - Power Mode (Standby)
- id: power_mode_standby
  label: Power Mode (Standby)
  kind: action
  command: "7E 30 30 31 31 34 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Eco. (<0.5W), 1=Active, 2=ErP Off"

# S069 - Quick Resume
- id: quick_resume
  label: Quick Resume
  kind: action
  command: "7E 30 30 31 31 35 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S070 - IR Function (remote control codes)
- id: ir_function_key
  label: IR Function Key
  kind: action
  command: "7E 30 30 31 34 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 28, 47]
      description: "10=Up, 11=Left, 12=Enter, 13=Right, 14=Down, 15=Keystone+, 16=Keystone-, 17=Volume-, 18=Volume+, 19=Brightness, 20=Menu, 21=Zoom, 28=Contrast, 47=Source"

# S071 - Test Pattern
- id: test_pattern
  label: Test Pattern
  kind: action
  command: "7E 30 30 31 39 35 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3, 4, 9]
      description: "0=Off, 1=Grid(Red), 2=White, 3=Grid(Green), 4=Grid(Blue), 9=Test Card"

# S072 - White Level
- id: white_level
  label: White Level
  kind: action
  command: "7E 30 30 32 30 30 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [0, 31]

# S073 - Black Level
- id: black_level
  label: Black Level
  kind: action
  command: "7E 30 30 32 30 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-5, 5]

# S074 - IRE
- id: ire
  label: IRE
  kind: action
  command: "7E 30 30 32 30 34 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=7.5, 1=0"

# S075 - Display message on OSD
- id: osd_message
  label: Display Message on OSD
  kind: action
  command: "7E 30 30 32 30 30 20 {n} 0D"
  # UNRESOLVED: source has a typo here (7E 30 30 32 30 30) - opcode 0200 collides with S072; S072 also 0200.
  # Two S-rows share the same hex payload prefix; the source appears to have a transcription error.
  params:
    - name: n
      type: string
      description: "1-30 character ASCII message"

# S076 - Color Setting Reset
- id: color_setting_reset
  label: Color Setting Reset
  kind: action
  command: "7E 30 30 32 31 35 20 31 0D"
  params: []

# S077 - 3D Mode
- id: 3d_mode
  label: 3D Mode
  kind: action
  command: "7E 30 30 32 33 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off, 1=DLP-Link"

# S078 - 3D Sync Invert
- id: 3d_sync_invert
  label: 3D Sync Invert
  kind: action
  command: "7E 30 30 32 33 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off, 1=On"

# S079 - Information Menu
- id: information_menu
  label: Information Menu
  kind: action
  command: "7E 30 30 33 31 33 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S080 - Optional Filter Installed
- id: optional_filter_installed
  label: Optional Filter Installed
  kind: action
  command: "7E 30 30 33 32 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=No, 1=Yes, 2=No (backward compatible)"

# S081 - Filter Reminder
- id: filter_reminder
  label: Filter Reminder
  kind: action
  command: "7E 30 30 33 32 32 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0=Off, 1=300hr, 2=500hr, 3=800hr, 4=1000hr"

# S082 - Filter Reset
- id: filter_reset
  label: Filter Reset
  kind: action
  command: "7E 30 30 33 32 33 20 31 0D"
  params: []

# S083-S100 - Color Setting Hue/Saturation/Gain (6 colors x 3 = 18 actions, all share opcode range 0327-0344)
- id: color_setting_red_hue
  label: Color Setting - Red Hue
  kind: action
  command: "7E 30 30 33 32 37 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_green_hue
  label: Color Setting - Green Hue
  kind: action
  command: "7E 30 30 33 32 38 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_blue_hue
  label: Color Setting - Blue Hue
  kind: action
  command: "7E 30 30 33 32 39 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_cyan_hue
  label: Color Setting - Cyan Hue
  kind: action
  command: "7E 30 30 33 33 30 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_yellow_hue
  label: Color Setting - Yellow Hue
  kind: action
  command: "7E 30 30 33 33 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_magenta_hue
  label: Color Setting - Magenta Hue
  kind: action
  command: "7E 30 30 33 33 32 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_red_saturation
  label: Color Setting - Red Saturation
  kind: action
  command: "7E 30 30 33 33 33 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_green_saturation
  label: Color Setting - Green Saturation
  kind: action
  command: "7E 30 30 33 33 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_blue_saturation
  label: Color Setting - Blue Saturation
  kind: action
  command: "7E 30 30 33 33 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_cyan_saturation
  label: Color Setting - Cyan Saturation
  kind: action
  command: "7E 30 30 33 33 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_yellow_saturation
  label: Color Setting - Yellow Saturation
  kind: action
  command: "7E 30 30 33 33 37 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_magenta_saturation
  label: Color Setting - Magenta Saturation
  kind: action
  command: "7E 30 30 33 33 38 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_red_gain
  label: Color Setting - Red Gain
  kind: action
  command: "7E 30 30 33 33 39 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_green_gain
  label: Color Setting - Green Gain
  kind: action
  command: "7E 30 30 33 34 30 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_blue_gain
  label: Color Setting - Blue Gain
  kind: action
  command: "7E 30 30 33 34 31 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_cyan_gain
  label: Color Setting - Cyan Gain
  kind: action
  command: "7E 30 30 33 34 32 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_yellow_gain
  label: Color Setting - Yellow Gain
  kind: action
  command: "7E 30 30 33 34 33 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: color_setting_magenta_gain
  label: Color Setting - Magenta Gain
  kind: action
  command: "7E 30 30 33 34 34 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S101-S103 - White R/G/B
- id: white_red
  label: White - Red
  kind: action
  command: "7E 30 30 33 34 35 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: white_green
  label: White - Green
  kind: action
  command: "7E 30 30 33 34 36 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

- id: white_blue
  label: White - Blue
  kind: action
  command: "7E 30 30 33 34 37 20 {n} 0D"
  params:
    - name: n
      type: integer
      range: [-50, 50]

# S104 - Display Mode Lock
- id: display_mode_lock
  label: Display Mode Lock
  kind: action
  command: "7E 30 30 33 34 38 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off, 1=On"

# S105 - 3D->2D
- id: 3d_to_2d
  label: 3D to 2D
  kind: action
  command: "7E 30 30 34 30 30 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=3D, 1=L, 2=R"

# S106 - 3D Format
- id: 3d_format
  label: 3D Format
  kind: action
  command: "7E 30 30 34 30 35 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3]
      description: "0=Auto, 1=SBS, 2=Top and Bottom, 3=Frame Sequential"

# S107 - Wall Color
- id: wall_color
  label: Wall Color
  kind: action
  command: "7E 30 30 35 30 36 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Whiteboard, 1=Blackboard, 2=Light Yellow, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray"

# S108 - HDMI Link (CEC)
- id: hdmi_link_cec
  label: HDMI Link (CEC)
  kind: action
  command: "7E 30 30 35 31 31 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# S109 - Auto Source
- id: auto_source
  label: Auto Source
  kind: action
  command: "7E 30 30 35 36 33 20 {value} 0D"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Off (backward compatible)"

# R001 - LAN Network State query
- id: query_network_state
  label: Query Network State
  kind: query
  command: "7E 30 30 38 37 20 31 0D"
  params: []

# R002 - LAN IP Address query
- id: query_ip_address
  label: Query IP Address
  kind: query
  command: "7E 30 30 38 37 20 33 0D"
  params: []

# R003 - Lamp Hours query
- id: query_lamp_hours
  label: Query Lamp Hours
  kind: query
  command: "7E 30 30 31 30 38 20 31 0D"
  params: []

# R004 - Input Source query
- id: query_input_source
  label: Query Input Source
  kind: query
  command: "7E 30 30 31 32 31 20 31 0D"
  params: []

# R005 - Software Version query
- id: query_software_version
  label: Query Software Version
  kind: query
  command: "7E 30 30 31 32 32 20 31 0D"
  params: []

# R006 - Display Mode query
- id: query_display_mode
  label: Query Display Mode
  kind: query
  command: "7E 30 30 31 32 33 20 31 0D"
  params: []

# R007 - Power State query
- id: query_power_state
  label: Query Power State
  kind: query
  command: "7E 30 30 31 32 34 20 31 0D"
  params: []

# R008 - Brightness query
- id: query_brightness
  label: Query Brightness
  kind: query
  command: "7E 30 30 31 32 35 20 31 0D"
  params: []

# R009 - Contrast query
- id: query_contrast
  label: Query Contrast
  kind: query
  command: "7E 30 30 31 32 36 20 31 0D"
  params: []

# R010 - Aspect Ratio query
- id: query_aspect_ratio
  label: Query Aspect Ratio
  kind: query
  command: "7E 30 30 31 32 37 20 31 0D"
  params: []

# R011 - Color Temperature query
- id: query_color_temperature
  label: Query Color Temperature
  kind: query
  command: "7E 30 30 31 32 38 20 31 0D"
  params: []

# R012 - Projection Mode query
- id: query_projection_mode
  label: Query Projection Mode
  kind: query
  command: "7E 30 30 31 32 39 20 31 0D"
  params: []

# R013 - Information query
- id: query_information
  label: Query Information
  kind: query
  command: "7E 30 30 31 35 30 20 31 0D"
  params: []

# R014 - Resolution query
- id: query_resolution
  label: Query Resolution
  kind: query
  command: "7E 30 30 31 35 30 20 34 0D"
  params: []

# R015 - Standby Power Mode query
- id: query_standby_power_mode
  label: Query Standby Power Mode
  kind: query
  command: "7E 30 30 31 35 30 20 31 36 0D"
  params: []

# R016 - Refresh rate query
- id: query_refresh_rate
  label: Query Refresh Rate
  kind: query
  command: "7E 30 30 31 35 30 20 31 39 0D"
  params: []

# R017 - Model Name query
- id: query_model_name
  label: Query Model Name
  kind: query
  command: "7E 30 30 31 35 31 20 31 0D"
  params: []

# R018 - Filter Usage Hours query
- id: query_filter_usage_hours
  label: Query Filter Usage Hours
  kind: query
  command: "7E 30 30 33 32 31 20 31 0D"
  params: []

# R019 - System Temperature query
- id: query_system_temperature
  label: Query System Temperature
  kind: query
  command: "7E 30 30 33 35 32 20 31 0D"
  params: []

# R020 - Serial Number query
- id: query_serial_number
  label: Query Serial Number
  kind: query
  command: "7E 30 30 33 35 33 20 31 0D"
  params: []

# R021 - AV Mute query
- id: query_av_mute
  label: Query AV Mute
  kind: query
  command: "7E 30 30 33 35 35 20 31 0D"
  params: []

# R022 - Mute query
- id: query_mute
  label: Query Mute
  kind: query
  command: "7E 30 30 33 35 36 20 31 0D"
  params: []

# R023 - H Image Shift query
- id: query_h_image_shift
  label: Query H Image Shift
  kind: query
  command: "7E 30 30 35 34 33 20 31 0D"
  params: []

# R024 - V Image Shift query
- id: query_v_image_shift
  label: Query V Image Shift
  kind: query
  command: "7E 30 30 35 34 33 20 32 0D"
  params: []

# R025 - V Keystone query
- id: query_v_keystone
  label: Query V Keystone
  kind: query
  command: "7E 30 30 35 34 33 20 33 0D"
  params: []

# R026 - H Keystone query
- id: query_h_keystone
  label: Query H Keystone
  kind: query
  command: "7E 30 30 35 34 33 20 34 0D"
  params: []

# R027 - LAN MAC Address query
- id: query_mac_address
  label: Query MAC Address
  kind: query
  command: "7E 30 30 35 35 35 20 31 0D"
  params: []

# R028 - Projector ID query
- id: query_projector_id
  label: Query Projector ID
  kind: query
  command: "7E 30 30 35 35 38 20 31 0D"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  notes: "Per R007: 0=Off, 1=On"

- id: projector_information
  type: object
  notes: "Per A001 unsolicited event 'INFOa' where a encodes Standby/Warming/Cooling/Out of Range/Lamp Fail/Fan Lock/Over Temperature/Lamp Hours Running Out"

- id: network_state
  type: enum
  values: [disconnected, connected]
  notes: "Per R001: a=0 Disconnected, a=1 Connected"

- id: ip_address
  type: string
  format: aaa_bbb_ccc_ddd
  notes: "Per R002"

- id: lamp_hours
  type: integer
  range: [0, 99999]
  notes: "5-digit value per R003"

- id: input_source
  type: enum
  values: [none, hdmi1, vga, s_video, video, hdmi2, vga2, hdbaseT]
  notes: "Per R004; encoding varies by model variant"

- id: software_version
  type: string
  notes: "Per R005"

- id: display_mode
  type: enum
  values: [none, presentation, bright, movie, srgb, user, 3d, game, dicom_sim, isf_day, isf_night, hdr_sim, hlg_sim]
  notes: "Per R006"

- id: brightness
  type: integer
  range: [-50, 50]
  notes: "Per R008"

- id: contrast
  type: integer
  range: [-50, 50]
  notes: "Per R009"

- id: aspect_ratio
  type: enum
  values: [none, 4_3, 16_9, 16_10, lbx, native, auto, 21_9, full]
  notes: "Per R010"

- id: color_temperature
  type: enum
  values: [warm, medium, cold, cool]
  notes: "Per R011"

- id: projection_mode
  type: enum
  values: [front, rear, front_ceiling, rear_ceiling]
  notes: "Per R012"

- id: resolution
  type: string
  notes: "Per R014; e.g. Ok1920x1080; Ok0x0 means no signal"

- id: standby_power_mode
  type: enum
  values: [eco, active, erp_off]
  notes: "Per R015"

- id: refresh_rate
  type: string
  notes: "Per R016; e.g. Ok60Hz; Ok0Hz means no signal"

- id: model_name
  type: enum
  values: [svga, xga, wxga, 1080p, wuxga]
  notes: "Per R017"

- id: filter_usage_hours
  type: integer
  range: [0, 99999]
  notes: "Per R018"

- id: system_temperature
  type: integer
  range: [0, 999]
  notes: "Per R019"

- id: serial_number
  type: string
  notes: "Per R020"

- id: av_mute
  type: enum
  values: [off, on]
  notes: "Per R021"

- id: mute
  type: enum
  values: [off, on]
  notes: "Per R022"

- id: h_image_shift
  type: integer
  range: [-100, 100]
  notes: "Per R023"

- id: v_image_shift
  type: integer
  range: [-100, 100]
  notes: "Per R024"

- id: v_keystone
  type: integer
  range: [-40, 40]
  notes: "Per R025"

- id: h_keystone
  type: integer
  range: [-40, 40]
  notes: "Per R026"

- id: mac_address
  type: string
  format: "##:##:##:##:##:##"
  notes: "Per R027"

- id: projector_id
  type: integer
  range: [0, 99]
  notes: "Per R028"
```

## Events
```yaml
- id: projector_status
  trigger: unsolicited
  format: "INFO{a}"
  description: "Sent by projector asynchronously; a encodes: 0=Projector Information, 1=Standby, 2=Warming, 3=Cooling, 4=Out of Range, 6=Lamp Fail, 7=Fan Lock, 8=Over Temperature, 9=Lamp Hours Running Out"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements. Source mentions projector ID 00=99 addressing and a power-on password (S002) but no safety-critical interlocks.
```

## Notes
- **Frame format:** every command terminated by `<CR>` (0x0D). Projector returns P (pass) or F (fail, sometimes `F 00`).
- **Projector ID addressing:** ID 00 broadcasts to all projectors; 01-99 targets a specific unit. ID is set via S047.
- **Backward-compatible values:** many On/Off commands accept 2 as an alias for Off (legacy firmware compatibility). Listed in the `value` enum for each.
- **Multi-sheet source:** the source document contains three protocol sheets. This spec covers the first sheet ("Std DLP"), which the source flags as the protocol for the INL21xx series (S036 specifically notes INL2156, INL2158, INL2159). Sheets 2 (IN13xST, IN213x, INL314x, INL412x) and 3 (IN102x-105x) describe a different protocol family using `(CMD arg)` syntax at 19200 baud with a different timing model (20s lamp ignition, 10s power down, 8s source change, 5ms intercommand, 2ms intercharacter); they are NOT covered by this spec.
- **Source typos (not auto-corrected):**
  - S054 has a blank ASCII Code cell in the on-row; the hex column is repeated from S053 (Signal Automatic On shares opcode 0091 with Screen Type).
  - S075 ("Display message on the OSD") hex column repeats S072's 0200 opcode — likely a transcription error in the source.
  - S065 and S066 are duplicate rows with identical payload but different "P.S" notes about security state; only one action retained.
  - R013 lists two projection-info block variants (different source-encoding tables) with no clear criterion for choosing; both shown in source notes.
  - R004 has two source-encoding mappings within one row (legacy vs current model variants).
- **Source format convention:** each ASCII command begins with `~` followed by a 4- or 5-digit opcode, a space, the value, and `<CR>`. The "HEX Code" column encodes the ASCII bytes (so `7E` = `~`, `30` = `0`, `20` = space, `0D` = CR).
- **Security password:** S002 (power on with password) and S046 (security on/off) require a 4-digit password appended as `~nnnn`. When security is enabled, password is required on protected commands (per source Note 1).

<!-- UNRESOLVED: firmware version compatibility not stated in source. The "INL21xx series" model range is named only in S036's range note; the source does not enumerate which model numbers belong to the series. -->

## Provenance

```yaml
source_domains:
  - cdn.infocus.com
source_urls:
  - https://cdn.infocus.com/2026/02/b7RCq21d-InFocus_Generic_RS232_Commands.xlsx
retrieved_at: 2026-05-15T02:06:44.135Z
last_checked_at: 2026-06-01T22:35:52.402Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T22:35:52.402Z
matched_actions: 136
action_count: 136
confidence: medium
summary: "Every spec action matched its hex opcode in the source table; all 109 send commands, 28 read queries, and 1 unsolicited event are represented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact models in the INL21xx series not enumerated in source; S036 notes mention INL2156, INL2158, INL2159 specifically."
- "UART16550 FIFO disable stated as \"Disable\" in source; not a standard config knob, noted here."
- "source has a typo here (7E 30 30 32 30 30) - opcode 0200 collides with S072; S072 also 0200."
- "source does not contain explicit safety warnings, interlock procedures, or power-on sequencing requirements. Source mentions projector ID 00=99 addressing and a power-on password (S002) but no safety-critical interlocks."
- "firmware version compatibility not stated in source. The \"INL21xx series\" model range is named only in S036's range note; the source does not enumerate which model numbers belong to the series."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
