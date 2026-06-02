---
spec_id: admin/atlona-at-line-pro4-gen2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-LINE-PRO4-Gen2 Control Spec"
manufacturer: Atlona
model_family: AT-LINE-PRO4-Gen2
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-LINE-PRO4-Gen2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2_V3.pdf
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2.pdf
retrieved_at: 2026-05-27T13:13:49.365Z
last_checked_at: 2026-06-02T21:47:51.706Z
generated_at: 2026-06-02T21:47:51.706Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "no settable variables beyond those covered by Actions (all params are discrete values or ranges passed via S commands)"
  - "no unsolicited notification events documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "Set commands for OSDHPOSITION, OSDVPOSITION, OSDTIMEOUT, OSDBACKGROUND, AUDIOMUTE not documented in source"
  - "power command value mapping may be swapped (S POWER 0 = ON, S POWER 1 = OFF per source text) — verify on device"
  - "firmware version compatibility not stated in source"
  - "no IP/TCP control documented — source covers RS-232 only"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:47:51.706Z
  matched_actions: 78
  action_count: 78
  confidence: medium
  summary: "All 78 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Atlona AT-LINE-PRO4-Gen2 Control Spec

## Summary
Multi-format video scaler/switcher with RS-232 serial control via 9-pin D-sub connector. Supports 10 inputs (CV, SV, COMP, PC1–3, HDMI1–4), output EDID selection, picture adjustments, and scaling modes.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
  pinout:
    connector: DB9-female
    pins:
      2: TX
      3: RX
      5: GND
auth:
  type: none  # inferred: no auth procedure in source
command_terminator: "\r\n"
feedback_terminator: "\r\n"
```

## Traits
```yaml
traits:
  - powerable    # S POWER commands
  - routable     # S SOURCE input selection
  - queryable    # R status commands
  - levelable    # contrast, brightness, hue, saturation, sharpness
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "S POWER 1"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "S POWER 0"
    params: []

  - id: select_source
    label: Select Input Source
    kind: action
    command: "S SOURCE {input}"
    params:
      - name: input
        type: integer
        values:
          0: CV
          1: SV
          2: COMP
          3: PC1
          4: PC2
          5: PC3
          6: HDMI1
          7: HDMI2
          8: HDMI3
          9: HDMI4
        description: Input source index

  - id: set_output_edid
    label: Set Output EDID
    kind: action
    command: "S OUTPUT {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: NATIVE
          1: VGA 640x480@60
          2: SVGA 800x600@60
          3: XGA 1024x768@60
          4: SXGA 1280x1024@60
          5: UXGA 1600x1200@60
          6: 480i
          7: 480p
          8: 720p@60
          9: 1080i@60
          10: 1080p@60
          11: 576i@60
          12: 576p@60
          13: 720p@50
          14: 1080i@50
          15: 1080p@50
          16: WXGA 1280x800@60
          17: WSXGA 1680x1050@60
          18: WUXGA 1920x1200@60
          19: WXGA+ 1440x900@60
          20: SXGA+ 1400x1050@60
        description: Output EDID resolution mode

  - id: set_size
    label: Set Scaling Mode
    kind: action
    command: "S SIZE {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: FULL
          1: OVERSCAN
          2: UNDERSCAN
          3: LETTERBOX
          4: PANSCAN
        description: Scaling mode

  - id: set_picture_mode
    label: Set Picture Mode
    kind: action
    command: "S PICTUREMODE {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: STANDARD
          1: MOVIE
          2: VIVID
          3: USER
        description: Picture mode preset

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "S CONTRAST {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Contrast level

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "S BRIGHTNESS {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Brightness level

  - id: set_hue
    label: Set Hue
    kind: action
    command: "S HUE {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Hue level

  - id: set_saturation
    label: Set Saturation
    kind: action
    command: "S SATURATION {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Saturation level

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "S SHARPNESS {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Sharpness level

  - id: set_noise_reduction
    label: Set Noise Reduction
    kind: action
    command: "S NR {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: LOW
          2: MIDDLE
          3: HIGH
        description: Noise reduction level

  - id: set_pc_phase
    label: Set PC Phase
    kind: action
    command: "S PCPHASE {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 63
        description: PC phase adjustment

  - id: set_pc_clock
    label: Set PC Clock
    kind: action
    command: "S PCCLOCK {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: PC clock adjustment

  - id: set_pc_h_position
    label: Set PC Horizontal Position
    kind: action
    command: "S PCHPOSITION {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Horizontal position

  - id: set_pc_v_position
    label: Set PC Vertical Position
    kind: action
    command: "S PCVPOSITION {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Vertical position

  - id: set_color_temp
    label: Set Color Temperature
    kind: action
    command: "S COLORTEMP {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: NORMAL
          1: WARM
          2: COOL
          3: USER
        description: Color temperature preset

  - id: set_red
    label: Set Red Gain
    kind: action
    command: "S RED {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Red color level

  - id: set_green
    label: Set Green Gain
    kind: action
    command: "S GREEN {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Green color level

  - id: set_blue
    label: Set Blue Gain
    kind: action
    command: "S BLUE {value}"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Blue color level

  - id: set_audio_delay
    label: Set Audio Delay
    kind: action
    command: "S AUDIODELAY {mode}"
    params:
      - name: mode
        type: integer
        values:
          0: OFF
          1: 40ms
          2: 110ms
          3: 150ms
        description: Audio delay preset

  - id: key_power
    label: Key Power Toggle
    kind: action
    command: "K POWER"
    params: []

  - id: key_cv
    label: Key CV
    kind: action
    command: "K CV"
    params: []

  - id: key_sv
    label: Key SV
    kind: action
    command: "K SV"
    params: []

  - id: key_comp
    label: Key COMP
    kind: action
    command: "K COMP"
    params: []

  - id: key_pc1
    label: Key PC1
    kind: action
    command: "K PC1"
    params: []

  - id: key_pc2
    label: Key PC2
    kind: action
    command: "K PC2"
    params: []

  - id: key_pc3
    label: Key PC3
    kind: action
    command: "K PC3"
    params: []

  - id: key_hdmi1
    label: Key HDMI1
    kind: action
    command: "K HDMI1"
    params: []

  - id: key_hdmi2
    label: Key HDMI2
    kind: action
    command: "K HDMI2"
    params: []

  - id: key_hdmi3
    label: Key HDMI3
    kind: action
    command: "K HDMI3"
    params: []

  - id: key_hdmi4
    label: Key HDMI4
    kind: action
    command: "K HDMI4"
    params: []

  - id: key_menu
    label: Key Menu
    kind: action
    command: "K MENU"
    params: []

  - id: key_dec
    label: Key Decrease
    kind: action
    command: "K DEC"
    params: []

  - id: key_inc
    label: Key Increase
    kind: action
    command: "K INC"
    params: []

  - id: key_enter
    label: Key Enter
    kind: action
    command: "K ENTER"
    params: []

  - id: key_source
    label: Key Source
    kind: action
    command: "K SOURCE"
    params: []

  - id: key_vga
    label: Key VGA
    kind: action
    command: "K VGA"
    params: []

  - id: key_svga
    label: Key SVGA
    kind: action
    command: "K SVGA"
    params: []

  - id: key_xga
    label: Key XGA
    kind: action
    command: "K XGA"
    params: []

  - id: key_sxga
    label: Key SXGA
    kind: action
    command: "K SXGA"
    params: []

  - id: key_uxga
    label: Key UXGA
    kind: action
    command: "K UXGA"
    params: []

  - id: key_1080i60
    label: Key 1080i60
    kind: action
    command: "K 1080i60"
    params: []

  - id: key_480p
    label: Key 480p
    kind: action
    command: "K 480p"
    params: []

  - id: key_720p60
    label: Key 720p60
    kind: action
    command: "K 720P60"
    params: []

  - id: key_1080p60
    label: Key 1080p60
    kind: action
    command: "K 1080P60"
    params: []

  - id: key_up
    label: Key Up
    kind: action
    command: "K UP"
    params: []

  - id: key_down
    label: Key Down
    kind: action
    command: "K DOWN"
    params: []

  - id: key_left
    label: Key Left
    kind: action
    command: "K LEFT"
    params: []

  - id: key_right
    label: Key Right
    kind: action
    command: "K RIGHT"
    params: []

  - id: key_exit
    label: Key Exit
    kind: action
    command: "K EXIT"
    params: []

  - id: key_auto
    label: Key Auto
    kind: action
    command: "K AUTO"
    params: []

  - id: key_reset
    label: Key Reset
    kind: action
    command: "K RESET"
    params: []
  - id: query_power_status
    label: POWER Status
    kind: action
    command: "R POWER"
    params: []

  - id: query_source_status
    label: SOURCE Status
    kind: action
    command: "R SOURCE"
    params: []

  - id: query_output_status
    label: OUTPUT Status
    kind: action
    command: "R OUTPUT"
    params: []

  - id: query_size_status
    label: SIZE Status
    kind: action
    command: "R SIZE"
    params: []

  - id: query_picturemode_status
    label: PICTUREMODE Status
    kind: action
    command: "R PICTUREMODE"
    params: []

  - id: query_contrast_value
    label: CONTRAST Value
    kind: action
    command: "R CONTRAST"
    params: []

  - id: query_brightness_value
    label: BRIGHTNESS Value
    kind: action
    command: "R BRIGHTNESS"
    params: []

  - id: query_hue_value
    label: HUE Value
    kind: action
    command: "R HUE"
    params: []

  - id: query_saturation_value
    label: SATURATION Value
    kind: action
    command: "R SATURATION"
    params: []

  - id: query_sharpness_value
    label: SHARPNESS Value
    kind: action
    command: "R SHARPNESS"
    params: []

  - id: query_nr_status
    label: NR Status
    kind: action
    command: "R NR"
    params: []

  - id: query_pchposition_value
    label: PCHPOSITION Value
    kind: action
    command: "R PCHPOSITION"
    params: []

  - id: query_pcvposition_value
    label: PCVPOSITION Value
    kind: action
    command: "R PCVPOSITION"
    params: []

  - id: query_pcclock_value
    label: PCCLOCK Value
    kind: action
    command: "R PCCLOCK"
    params: []

  - id: query_pcphase_value
    label: PCPHASE Value
    kind: action
    command: "R PCPHASE"
    params: []

  - id: query_colortemp_status
    label: COLORTEMP Status
    kind: action
    command: "R COLORTEMP"
    params: []

  - id: query_red_value
    label: RED Value
    kind: action
    command: "R RED"
    params: []

  - id: query_green_value
    label: GREEN Value
    kind: action
    command: "R GREEN"
    params: []

  - id: query_blue_value
    label: BLUE Value
    kind: action
    command: "R BLUE"
    params: []

  - id: query_osdhposition_value
    label: OSDHPOSITION Value
    kind: action
    command: "R OSDHPOSITION"
    params: []

  - id: query_osdvposition_value
    label: OSDVPOSITION Value
    kind: action
    command: "R OSDVPOSITION"
    params: []

  - id: query_osdtimeout_value
    label: OSDTIMEOUT Value
    kind: action
    command: "R OSDTIMEOUT"
    params: []

  - id: query_osdbackground_status
    label: OSDBACKGROUND Status
    kind: action
    command: "R OSDBACKGROUND"
    params: []

  - id: query_audiomute_status
    label: AUDIOMUTE Status
    kind: action
    command: "R AUDIOMUTE"
    params: []

  - id: query_audiodelay_status
    label: AUDIODELAY Status
    kind: action
    command: "R AUDIODELAY"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: "R POWER"
    type: enum
    values: [OFF, ON]

  - id: source_state
    label: Source State
    command: "R SOURCE"
    type: enum
    values: [CV, SV, COMP, PC1, PC2, PC3, HDMI1, HDMI2, HDMI3, HDMI4]

  - id: output_state
    label: Output EDID State
    command: "R OUTPUT"
    type: enum
    values: [NATIVE, VGA, SVGA, XGA, SXGA, UXGA, 480i, 480p, 720p, 1080i, 1080p, 576i, 576p, 720p50, 1080i50, 1080p50, WXGA, WSXGA, WUXGA, WXGA+, SXGA+]

  - id: size_state
    label: Scaling Mode State
    command: "R SIZE"
    type: enum
    values: [FULL, OVERSCAN, UNDERSCAN, LETTERBOX, PANSCAN]

  - id: picture_mode_state
    label: Picture Mode State
    command: "R PICTUREMODE"
    type: enum
    values: [STANDARD, MOVIE, VIVID, USER]

  - id: contrast_value
    label: Contrast Value
    command: "R CONTRAST"
    type: integer
    min: 0
    max: 100

  - id: brightness_value
    label: Brightness Value
    command: "R BRIGHTNESS"
    type: integer
    min: 0
    max: 100

  - id: hue_value
    label: Hue Value
    command: "R HUE"
    type: integer
    min: 0
    max: 100

  - id: saturation_value
    label: Saturation Value
    command: "R SATURATION"
    type: integer
    min: 0
    max: 100

  - id: sharpness_value
    label: Sharpness Value
    command: "R SHARPNESS"
    type: integer
    min: 0
    max: 100

  - id: nr_state
    label: Noise Reduction State
    command: "R NR"
    type: enum
    values: [OFF, LOW, MIDDLE, HIGH]

  - id: pc_h_position
    label: PC Horizontal Position
    command: "R PCHPOSITION"
    type: integer
    min: 0
    max: 100

  - id: pc_v_position
    label: PC Vertical Position
    command: "R PCVPOSITION"
    type: integer
    min: 0
    max: 100

  - id: pc_clock
    label: PC Clock Value
    command: "R PCCLOCK"
    type: integer
    min: 0
    max: 100

  - id: pc_phase
    label: PC Phase Value
    command: "R PCPHASE"
    type: integer
    min: 0
    max: 63

  - id: color_temp_state
    label: Color Temperature State
    command: "R COLORTEMP"
    type: enum
    values: [NORMAL, WARM, COOL, USER]

  - id: red_value
    label: Red Gain Value
    command: "R RED"
    type: integer
    min: 0
    max: 100

  - id: green_value
    label: Green Gain Value
    command: "R GREEN"
    type: integer
    min: 0
    max: 100

  - id: blue_value
    label: Blue Gain Value
    command: "R BLUE"
    type: integer
    min: 0
    max: 100

  - id: osd_h_position
    label: OSD Horizontal Position
    command: "R OSDHPOSITION"
    type: integer
    min: 0
    max: 100

  - id: osd_v_position
    label: OSD Vertical Position
    command: "R OSDVPOSITION"
    type: integer
    min: 0
    max: 100

  - id: osd_timeout
    label: OSD Timeout
    command: "R OSDTIMEOUT"
    type: integer
    min: 0
    max: 100

  - id: osd_background
    label: OSD Background
    command: "R OSDBACKGROUND"
    type: integer
    min: 0
    max: 8

  - id: audio_mute_state
    label: Audio Mute State
    command: "R AUDIOMUTE"
    type: enum
    values: [OFF, ON]

  - id: audio_delay_state
    label: Audio Delay State
    command: "R AUDIODELAY"
    type: enum
    values: [OFF, 40ms, 110ms, 150ms]

error_feedback: "Command FAILED"
```

## Variables
```yaml
# UNRESOLVED: no settable variables beyond those covered by Actions (all params are discrete values or ranges passed via S commands)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are case sensitive — do not alter capitalization, spacing, or lettering.
- All commands and feedbacks terminated with `\r\n` (carriage return + linefeed).
- Failed or incorrect commands return `Command FAILED`.
- Source describes S POWER 0 as "Power on" and S POWER 1 as "Power off" — this is reversed from common convention. Commands follow source literally but the labeling may be swapped in the original document. Verify on actual device.
- OSD parameters (OSDHPOSITION, OSDVPOSITION, OSDTIMEOUT, OSDBACKGROUND, AUDIOMUTE) appear in Status commands but have no corresponding Set commands in source.
<!-- UNRESOLVED: Set commands for OSDHPOSITION, OSDVPOSITION, OSDTIMEOUT, OSDBACKGROUND, AUDIOMUTE not documented in source -->
<!-- UNRESOLVED: power command value mapping may be swapped (S POWER 0 = ON, S POWER 1 = OFF per source text) — verify on device -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no IP/TCP control documented — source covers RS-232 only -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2_V3.pdf
  - https://atlona.com/pdf/manuals/AT-LINE-PRO4-GEN2.pdf
retrieved_at: 2026-05-27T13:13:49.365Z
last_checked_at: 2026-06-02T21:47:51.706Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:47:51.706Z
matched_actions: 78
action_count: 78
confidence: medium
summary: "All 78 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "no settable variables beyond those covered by Actions (all params are discrete values or ranges passed via S commands)"
- "no unsolicited notification events documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "Set commands for OSDHPOSITION, OSDVPOSITION, OSDTIMEOUT, OSDBACKGROUND, AUDIOMUTE not documented in source"
- "power command value mapping may be swapped (S POWER 0 = ON, S POWER 1 = OFF per source text) — verify on device"
- "firmware version compatibility not stated in source"
- "no IP/TCP control documented — source covers RS-232 only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
