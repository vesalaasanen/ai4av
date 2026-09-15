---
spec_id: admin/kramer-electronics-vp-728
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer Electronics VP-728 Control Spec"
manufacturer: Kramer
model_family: VP-728
aliases: []
compatible_with:
  manufacturers:
    - Kramer
    - "Kramer Electronics"
  models:
    - VP-728
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/protocols/vp-728_729_rs-232_command_set_2014-0521.pdf
  - https://k.kramerav.com/downloads/manuals/vp-728.pdf
retrieved_at: 2026-09-02T16:57:35.919Z
last_checked_at: 2026-09-12T22:16:53.648Z
generated_at: 2026-09-12T22:16:53.648Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/ethernet control, power specifications, and firmware compatibility not covered in source document"
  - "flow control not stated in source"
  - "source contains no safety warnings or interlock procedures."
  - "firmware version compatibility not stated in source"
  - "whether device also supports TCP/ethernet control — not covered in this source document"
verification:
  verdict: verified
  checked_at: 2026-09-12T22:16:53.648Z
  matched_actions: 159
  action_count: 159
  confidence: medium
  summary: "All 159 spec actions map to functions 0–156 in source; transport values9600/8/N/1 all literal; no source command missing. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Kramer Electronics VP-728 Control Spec

## Summary
Kramer Electronics VP-728 presentation switcher/scaler controlled over RS-232C serial. Spec covers the full serial command set: input/source selection, picture adjustment, output resolution and aspect, PIP, audio, geometry, OSD, HDCP/EDID, slideshow, and factory/maintenance functions (functions 0–156), plus error codes.

<!-- UNRESOLVED: TCP/ethernet control, power specifications, and firmware compatibility not covered in source document -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable    (inferred: function 91 Power on/off)
# - routable     (inferred: function 0 Input Source, 38 PIP Source, 55/150/151 audio input routing)
# - queryable    (inferred: Get command format + get-only functions 76, 103, 104, 155, 156)
# - levelable    (inferred: functions 12-16 picture levels, 47-51 audio levels)
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
# Framing (from source section 2):
#   Set command: "Y<SP>Control_Type<SP>Function<SP>Param" + CR  (Control_Type 0 = set)
#   Get command: "Y<SP>Control_Type<SP>Function" + CR           (Control_Type 1 = get)
#   Reply:       "Z<SP>Control_Type<SP>Function<SP>Param" + CRLF + ">"
#   <SP> = ASCII 0x20, CR = 0x0D, CRLF = 0x0D 0x0A
#   Device replies CRLF + ">" after each command; next command sent after ">" received.
# Any settable function below can also be queried as "Y 1 {function}" (get column = 1 in source).
# Functions with param "n/a" in source are sent without a parameter value.
actions:
  - id: input_source
    label: Input Source
    kind: action
    command: "Y 0 0 {source}"
    params:
      - name: source
        type: integer
        description: "0: Input 1, 1: Input 2, 2: Input 3, 3: Input 4, 4: VGA 1, 5: VGA 2, 6: HDMI 1, 7: HDMI 2, 8: USB"

  - id: input_1_source_type
    label: Input 1 Source Type
    kind: action
    command: "Y 0 1 {type}"
    params:
      - name: type
        type: integer
        description: "0: Component, 1: YC, 2: Video"

  - id: input_2_source_type
    label: Input 2 Source Type
    kind: action
    command: "Y 0 2 {type}"
    params:
      - name: type
        type: integer
        description: "0: Component, 1: YC, 2: Video"

  - id: input_3_source_type
    label: Input 3 Source Type
    kind: action
    command: "Y 0 3 {type}"
    params:
      - name: type
        type: integer
        description: "0: Component, 1: YC, 2: Video"

  - id: input_4_source_type
    label: Input 4 Source Type
    kind: action
    command: "Y 0 4 {type}"
    params:
      - name: type
        type: integer
        description: "0: Component, 1: YC, 2: Video"

  - id: input_color_format
    label: Input Color Format
    kind: action
    command: "Y 0 5 {format}"
    params:
      - name: format
        type: integer
        description: "0: Auto, 1: RGB, 2: YUV"

  - id: input_video_standard
    label: Input Video Standard
    kind: action
    command: "Y 0 6 {standard}"
    params:
      - name: standard
        type: integer
        description: "0: Auto, 1: NTSC, 2: PAL, 3: PAL-M, 4: PAL-N, 5: NTSC 4.43, 6: SECAM, 7: PAL-60"

  - id: input_h_position_1
    label: Input H-Position (function 7)
    kind: action
    command: "Y 0 7 {value}"
    params:
      - name: value
        type: integer
        description: "1 ~ N; N changes with different input modes"

  - id: input_h_position_2
    label: Input H-Position (function 8)
    kind: action
    command: "Y 0 8 {value}"
    params:
      - name: value
        type: integer
        description: "2 ~ N; N changes with different input modes"

  - id: input_h_position_3
    label: Input H-Position (function 9)
    kind: action
    command: "Y 0 9 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ N; N changes with different input modes"

  - id: input_phase
    label: Input Phase
    kind: action
    command: "Y 0 10 {phase}"
    params:
      - name: phase
        type: integer
        description: "0 ~ 31"

  - id: input_auto_image
    label: Input Auto Image
    kind: action
    command: "Y 0 11"
    params: []

  - id: picture_brightness
    label: Picture Brightness
    kind: action
    command: "Y 0 12 {level}"
    params:
      - name: level
        type: integer
        description: "0 ~ 100"

  - id: picture_contrast
    label: Picture Contrast
    kind: action
    command: "Y 0 13 {level}"
    params:
      - name: level
        type: integer
        description: "0 ~ 100"

  - id: picture_color
    label: Picture Color
    kind: action
    command: "Y 0 14 {level}"
    params:
      - name: level
        type: integer
        description: "0 ~ 100"

  - id: picture_hue
    label: Picture Hue
    kind: action
    command: "Y 0 15 {level}"
    params:
      - name: level
        type: integer
        description: "0 ~ 360"

  - id: picture_sharpness
    label: Picture Sharpness
    kind: action
    command: "Y 0 16 {level}"
    params:
      - name: level
        type: integer
        description: "0 ~ 100"

  - id: picture_output_gamma
    label: Picture Output Gamma
    kind: action
    command: "Y 0 17 {gamma}"
    params:
      - name: gamma
        type: integer
        description: "0: Gamma 1, 1: Gamma 2, 2: Gamma 3, 3: Gamma 4, 4: Gamma 5"

  - id: picture_film_mode
    label: Picture Film Mode
    kind: action
    command: "Y 0 18 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Auto, 1: Video, 2: Film"

  - id: picture_temporal_nr
    label: Picture Temporal NR
    kind: action
    command: "Y 0 19 {level}"
    params:
      - name: level
        type: integer
        description: "0: Off, 1: Low, 2: Medium, 3: High"

  - id: picture_mosquito_nr
    label: Picture Mosquito NR
    kind: action
    command: "Y 0 20 {level}"
    params:
      - name: level
        type: integer
        description: "0: Off, 1: Low, 2: Medium, 3: High"

  - id: picture_block_nr
    label: Picture Block NR
    kind: action
    command: "Y 0 21 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: picture_detail_enhancement
    label: Picture Detail Enhancement
    kind: action
    command: "Y 0 22 {level}"
    params:
      - name: level
        type: integer
        description: "0: Off, 1: Low, 2: Medium, 3: High"

  - id: picture_luma_transition_enhance
    label: Picture Luma Transition Enhance
    kind: action
    command: "Y 0 23 {level}"
    params:
      - name: level
        type: integer
        description: "0: Off, 1: Low, 2: High"

  - id: picture_chroma_transition_enhance
    label: Picture Chroma Transition Enhance
    kind: action
    command: "Y 0 24 {level}"
    params:
      - name: level
        type: integer
        description: "0: Off, 1: Low, 2: High"

  - id: output_resolution
    label: Output Resolution
    kind: action
    command: "Y 0 25 {resolution}"
    params:
      - name: resolution
        type: integer
        description: "0: Native HDMI, 1: 640x480@60Hz, 2: 640x480@75Hz, 3: 800x600@50Hz, 4: 800x600@60Hz, 5: 800x600@75Hz, 6: 1024x768@50Hz, 7: 1024x768@60Hz, 8: 1024x768@75Hz, 9: 1280x768@50Hz, 10: 1280x768@60Hz, 11: 1280x720@60Hz, 12: 1280x800@60Hz, 13: 1280x1024@50Hz, 14: 1280x1024@60Hz, 15: 1280x1024@75Hz, 16: 1366x768@50Hz, 17: 1366x768@60Hz, 18: 1400x1050@50Hz, 19: 1400x1050@60Hz, 20: 1600x1200@50Hz, 21: 1600x1200@60Hz, 22: 1680x1050@60Hz, 23: 1920x1080@60Hz, 24: 1920x1200@60Hz, 25: 480p@60Hz, 26: 576p@60Hz, 27: 720p@50Hz, 28: 720p@60Hz, 29: 1080i@50Hz, 30: 1080i@60Hz, 31: 1080p@50Hz, 32: 1080p@60Hz, 33: 480P@59.94Hz, 34: 720P@59.94Hz, 35: 1080i@59.94Hz, 36: 1080P@23.98Hz, 37: 1080P@29.97Hz, 38: 1080P@59.94Hz, 96: Custom1, 97: Custom2, 98: Custom3, 99: Custom4"

  - id: output_hdmi_type
    label: Output HDMI Type
    kind: action
    command: "Y 0 26 {type}"
    params:
      - name: type
        type: integer
        description: "0: Auto, 1: HDMI, 2: DVI"

  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    command: "Y 0 27 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Best Fit, 1: Letterbox, 2: Follow Output, 3: Virtual Wide, 4: Follow Input, 5: Custom"

  - id: h_pan
    label: H-Pan
    kind: action
    command: "Y 0 28 {value}"
    params:
      - name: value
        type: integer
        description: "-16 ~ 16"

  - id: v_pan
    label: V-Pan
    kind: action
    command: "Y 0 29 {value}"
    params:
      - name: value
        type: integer
        description: "-16 ~ 16"

  - id: h_zoom
    label: H-Zoom
    kind: action
    command: "Y 0 30 {value}"
    params:
      - name: value
        type: integer
        description: "-8 ~ 8"

  - id: v_zoom
    label: V-Zoom
    kind: action
    command: "Y 0 31 {value}"
    params:
      - name: value
        type: integer
        description: "-8 ~ 8"

  - id: zoom
    label: Zoom
    kind: action
    command: "Y 0 32 {zoom}"
    params:
      - name: zoom
        type: integer
        description: "0: 100%, 1: 150%, 2: 200%, 3: 225%, 4: 250%, 5: 275%, 6: 300%, 7: 325%, 8: 350%, 9: 375%, 10: 400%, 11: Custom"

  - id: custom_zoom
    label: Custom Zoom
    kind: action
    command: "Y 0 33 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 32"

  - id: zoom_h_pan
    label: Zoom H-Pan
    kind: action
    command: "Y 0 34 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 31"

  - id: zoom_v_pan
    label: Zoom V-Pan
    kind: action
    command: "Y 0 35 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 31"

  - id: pip_on_off
    label: PIP On/Off
    kind: action
    command: "Y 0 36 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: pip_type
    label: PIP Type
    kind: action
    command: "Y 0 37 {type}"
    params:
      - name: type
        type: integer
        description: "0: Picture-In-Picture, 1: Picture + Picture, 2: Split"

  - id: pip_source
    label: PIP Source
    kind: action
    command: "Y 0 38 {source}"
    params:
      - name: source
        type: integer
        description: "0: Input 1, 1: Input 2, 2: Input 3, 3: Input 4, 4: VGA 1, 5: VGA 2, 6: HDMI 1, 7: HDMI 2"

  - id: pip_size
    label: PIP Size
    kind: action
    command: "Y 0 39 {size}"
    params:
      - name: size
        type: integer
        description: "0: 1/25, 1: 1/16, 2: 1/9, 3: 1/4, 4: Custom"

  - id: pip_h_position
    label: PIP H-Position
    kind: action
    command: "Y 0 40 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 128"

  - id: pip_v_position
    label: PIP V-Position
    kind: action
    command: "Y 0 41 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 128"

  - id: pip_h_size
    label: PIP H-Size
    kind: action
    command: "Y 0 42 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 255"

  - id: pip_v_size
    label: PIP V-Size
    kind: action
    command: "Y 0 43 {value}"
    params:
      - name: value
        type: integer
        description: "0 ~ 255"

  - id: pip_frame
    label: PIP Frame
    kind: action
    command: "Y 0 44 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: pip_frame_color
    label: PIP Frame Color
    kind: action
    command: "Y 0 45 {color}"
    params:
      - name: color
        type: integer
        description: "0: Red, 1: Green, 2: Blue"

  - id: audio_input_type
    label: Audio Input Type
    kind: action
    command: "Y 0 46 {type}"
    params:
      - name: type
        type: integer
        description: "0: Analog, 1: S/PDIF"

  - id: audio_input_volume
    label: Audio Input Volume
    kind: action
    command: "Y 0 47 {level}"
    params:
      - name: level
        type: integer
        description: "-22 ~ 0 ~ +22"

  - id: audio_output_volume
    label: Audio Output Volume
    kind: action
    command: "Y 0 48 {level}"
    params:
      - name: level
        type: integer
        description: "-100 ~ 24"

  - id: audio_output_volume_up
    label: Volume Up (function 48, param 111)
    kind: action
    command: "Y 0 48 111"
    params: []

  - id: audio_output_volume_down
    label: Volume Down (function 48, param -111)
    kind: action
    command: "Y 0 48 -111"
    params: []

  - id: audio_bass
    label: Audio Bass
    kind: action
    command: "Y 0 49 {level}"
    params:
      - name: level
        type: integer
        description: "-36 ~ 0 ~ +36"

  - id: audio_treble
    label: Audio Treble
    kind: action
    command: "Y 0 50 {level}"
    params:
      - name: level
        type: integer
        description: "-36 ~ 0 ~ +36"

  - id: audio_balance
    label: Audio Balance
    kind: action
    command: "Y 0 51 {value}"
    params:
      - name: value
        type: integer
        description: "-10 ~ 10"

  - id: audio_loudness
    label: Audio Loudness
    kind: action
    command: "Y 0 52 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: audio_delay
    label: Audio Delay
    kind: action
    command: "Y 0 53 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Dynamic, 1: User Define"

  - id: user_delay
    label: User Delay
    kind: action
    command: "Y 0 54 {delay}"
    params:
      - name: delay
        type: integer
        description: "0 ~ 340, step 2"

  - id: audio_input_for_usb
    label: Audio Input For USB
    kind: action
    command: "Y 0 55 {source}"
    params:
      - name: source
        type: integer
        description: "0: No audio, 1: Input 1, 2: Input 2, 3: Input 3, 4: Input 4, 5: VGA1, 6: VGA2"

  - id: geometry_application
    label: Geometry Application
    kind: action
    command: "Y 0 56 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Keystone, 1: Anyplace, 2: Rotation"

  - id: geometry_location
    label: Geometry Location
    kind: action
    command: "Y 0 57 {location}"
    params:
      - name: location
        type: integer
        description: "0: Front, 1: Ceiling, 2: Rear, 3: Rear ceiling"

  - id: geometry_horizontal_keystone
    label: Geometry Horizontal Keystone
    kind: action
    command: "Y 0 58 {value}"
    params:
      - name: value
        type: integer
        description: "-40 ~ 40"

  - id: geometry_vertical_keystone
    label: Geometry Vertical Keystone
    kind: action
    command: "Y 0 59 {value}"
    params:
      - name: value
        type: integer
        description: "-30 ~ 30"

  - id: geometry_diag_proj_top_left_h
    label: Geometry Diagonal Projection - TopLeft H
    kind: action
    command: "Y 0 60 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_top_left_v
    label: Geometry Diagonal Projection - TopLeft V
    kind: action
    command: "Y 0 61 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_top_right_h
    label: Geometry Diagonal Projection - TopRight H
    kind: action
    command: "Y 0 62 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_top_right_v
    label: Geometry Diagonal Projection - TopRight V
    kind: action
    command: "Y 0 63 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_bottom_left_h
    label: Geometry Diagonal Projection - Bottom Left H
    kind: action
    command: "Y 0 64 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_bottom_left_v
    label: Geometry Diagonal Projection - Bottom Left V
    kind: action
    command: "Y 0 65 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_bottom_right_h
    label: Geometry Diagonal Projection - Bottom Right H
    kind: action
    command: "Y 0 66 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diag_proj_bottom_right_v
    label: Geometry Diagonal Projection - Bottom Right V
    kind: action
    command: "Y 0 67 {value}"
    params:
      - name: value
        type: integer
        description: "-2000 ~ 2000"

  - id: geometry_diagonal_projection_reset
    label: Geometry Diagonal Projection - Reset
    kind: action
    command: "Y 0 68"
    params: []

  - id: geometry_pincushion_barrel
    label: Geometry Pincushion/Barrel
    kind: action
    command: "Y 0 69 {value}"
    params:
      - name: value
        type: integer
        description: "-20 ~ 20"

  - id: geometry_rotation
    label: Geometry Rotation
    kind: action
    command: "Y 0 70 {value}"
    params:
      - name: value
        type: integer
        description: "-180 ~ 180"

  - id: geometry_reset_all
    label: Geometry Reset all
    kind: action
    command: "Y 0 71"
    params: []

  - id: save_setting
    label: Save Setting
    kind: action
    command: "Y 0 72 {profile}"
    params:
      - name: profile
        type: integer
        description: "0: Profile 1, 1: Profile 2, 2: Profile 3, 3: Profile 4, 4: Profile 5, 5: Profile 6, 6: Profile 7, 7: Profile 8"

  - id: recall_setting
    label: Recall Setting
    kind: action
    command: "Y 0 73 {profile}"
    params:
      - name: profile
        type: integer
        description: "0: Profile 1, 1: Profile 2, 2: Profile 3, 3: Profile 4, 4: Profile 5, 5: Profile 6, 6: Profile 7, 7: Profile 8"

  - id: frame_lock
    label: Frame Lock
    kind: action
    command: "Y 0 74 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "Y 0 75"
    params: []

  - id: firmware_revision_query
    label: Firmware Revision Query
    kind: query
    command: "Y 1 76"
    params: []

  - id: mode_set_mode_1
    label: Mode Set - Mode 1
    kind: action
    command: "Y 0 77 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: 1400x1050x60, 1: 1680x1050x60"

  - id: mode_set_mode_2
    label: Mode Set - Mode 2
    kind: action
    command: "Y 0 78 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: 1280x1024x75, 1: 1280x1024x76"

  - id: osd_menu_position
    label: OSD Menu Position
    kind: action
    command: "Y 0 79 {position}"
    params:
      - name: position
        type: integer
        description: "0: Center, 1: Top Left, 2: Top Right, 3: Bottom Left, 4: Bottom Right"

  - id: osd_time_out
    label: OSD Time Out
    kind: action
    command: "Y 0 80 {timeout}"
    params:
      - name: timeout
        type: integer
        description: "0: 5 sec, 1: 10 sec, 2: 20 sec, 3: 30 sec, 4: 60 sec, 5: 90 sec, 6: Off"

  - id: logo
    label: Logo
    kind: action
    command: "Y 0 81 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Off, 1: On, 2: Custom"

  - id: blank_color
    label: Blank Color
    kind: action
    command: "Y 0 82 {color}"
    params:
      - name: color
        type: integer
        description: "0: Black, 1: Blue"

  - id: capture
    label: Capture
    kind: action
    command: "Y 0 83"
    params: []

  - id: background
    label: Background
    kind: action
    command: "Y 0 84 {background}"
    params:
      - name: background
        type: integer
        description: "0: Black, 1: Blue, 2: Custom, 3: Disable AnalogSync"

  - id: save_lock
    label: Save Lock
    kind: action
    command: "Y 0 85 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: input_lock
    label: Input Lock
    kind: action
    command: "Y 0 86 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: blank_key_function
    label: Blank key function
    kind: action
    command: "Y 0 87 {function}"
    params:
      - name: function
        type: integer
        description: "0: Blank & Mute, 1: Blank, 2: Mute"

  - id: freeze_key_function
    label: Freeze key function
    kind: action
    command: "Y 0 88 {function}"
    params:
      - name: function
        type: integer
        description: "0: Freeze & Mute, 1: Freeze, 2: Mute"

  - id: freeze
    label: Freeze
    kind: action
    command: "Y 0 89 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: blank
    label: Blank
    kind: action
    command: "Y 0 90 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: power
    label: Power
    kind: action
    command: "Y 0 91 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: info
    label: Info
    kind: action
    command: "Y 0 92"
    params: []

  - id: menu
    label: Menu
    kind: action
    command: "Y 0 93"
    params: []

  - id: osd_top
    label: OSD Top
    kind: action
    command: "Y 0 94"
    params: []

  - id: osd_down
    label: OSD Down
    kind: action
    command: "Y 0 95"
    params: []

  - id: osd_left
    label: OSD Left
    kind: action
    command: "Y 0 96"
    params: []

  - id: osd_right
    label: OSD Right
    kind: action
    command: "Y 0 97"
    params: []

  - id: osd_enter
    label: OSD Enter
    kind: action
    command: "Y 0 98"
    params: []

  - id: picture_key
    label: Picture
    kind: action
    command: "Y 0 99"
    params: []

  - id: swap
    label: Swap
    kind: action
    command: "Y 0 100"
    params: []

  - id: mute
    label: Mute
    kind: action
    command: "Y 0 101 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: lock
    label: Lock
    kind: action
    command: "Y 0 102 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: main_input_status_query
    label: Main Input Status Query
    kind: query
    command: "Y 1 103"
    params: []

  - id: pip_input_status_query
    label: PIP Input Status Query
    kind: query
    command: "Y 1 104"
    params: []

  - id: adv_input_ht
    label: Advance Input Mode HT
    kind: action
    command: "Y 0 105 {value}"
    params:
      - name: value
        type: integer
        description: "512 ~ 3071"

  - id: adv_input_hw
    label: Advance Input Mode HW
    kind: action
    command: "Y 0 106 {value}"
    params:
      - name: value
        type: integer
        description: "32 ~ (HS-48)"

  - id: adv_input_hs
    label: Advance Input Mode HS
    kind: action
    command: "Y 0 107 {value}"
    params:
      - name: value
        type: integer
        description: "80 ~ (HT-HA-12)"

  - id: adv_input_ha
    label: Advance Input Mode HA
    kind: action
    command: "Y 0 108 {value}"
    params:
      - name: value
        type: integer
        description: "640 ~ 1920, <= (HT-92)"

  - id: adv_input_hp
    label: Advance Input Mode HP
    kind: action
    command: "Y 0 109 {polarity}"
    params:
      - name: polarity
        type: integer
        description: "0: Negative polarity, 1: Positive polarity"

  - id: adv_input_vt
    label: Advance Input Mode VT
    kind: action
    command: "Y 0 110 {value}"
    params:
      - name: value
        type: integer
        description: "384 ~ 2047"

  - id: adv_input_vw
    label: Advance Input Mode VW
    kind: action
    command: "Y 0 111 {value}"
    params:
      - name: value
        type: integer
        description: "2 ~ (HS-13)"

  - id: adv_input_vs
    label: Advance Input Mode VS
    kind: action
    command: "Y 0 112 {value}"
    params:
      - name: value
        type: integer
        description: "15 ~ (VT-VA-1)"

  - id: adv_input_va
    label: Advance Input Mode VA
    kind: action
    command: "Y 0 113 {value}"
    params:
      - name: value
        type: integer
        description: "480 ~ 1200, <= (VT-16)"

  - id: adv_input_vp
    label: Advance Input Mode VP
    kind: action
    command: "Y 0 114 {polarity}"
    params:
      - name: polarity
        type: integer
        description: "0: Negative polarity, 1: Positive polarity"

  - id: adv_input_oclock_integer
    label: Advance Input Mode OCLK (Integer)
    kind: action
    command: "Y 0 115 {value}"
    params:
      - name: value
        type: integer
        description: "25 < OCLK < 165"

  - id: adv_input_oclock_decimal
    label: Advance Input Mode OCLK (Decimal)
    kind: action
    command: "Y 0 116 {value}"
    params:
      - name: value
        type: integer
        description: "25 < OCLK < 165"

  - id: adv_input_mode_enable
    label: Advance Input Mode Enable
    kind: action
    command: "Y 0 117 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: adv_input_mode_save
    label: Advance Input Mode Save
    kind: action
    command: "Y 0 118"
    params: []

  - id: adv_output_ht
    label: Advance Output Mode HT
    kind: action
    command: "Y 0 119 {value}"
    params:
      - name: value
        type: integer
        description: "512 ~ 3071"

  - id: adv_output_hw
    label: Advance Output Mode HW
    kind: action
    command: "Y 0 120 {value}"
    params:
      - name: value
        type: integer
        description: "32 ~ (HS-48)"

  - id: adv_output_hs
    label: Advance Output Mode HS
    kind: action
    command: "Y 0 121 {value}"
    params:
      - name: value
        type: integer
        description: "80 ~ (HT-HA-12)"

  - id: adv_output_ha
    label: Advance Output Mode HA
    kind: action
    command: "Y 0 122 {value}"
    params:
      - name: value
        type: integer
        description: "640 ~ 1920, <= (HT-92)"

  - id: adv_output_hp
    label: Advance Output Mode HP
    kind: action
    command: "Y 0 123 {polarity}"
    params:
      - name: polarity
        type: integer
        description: "0: Negative polarity, 1: Positive polarity"

  - id: adv_output_vt
    label: Advance Output Mode VT
    kind: action
    command: "Y 0 124 {value}"
    params:
      - name: value
        type: integer
        description: "384 ~ 2047"

  - id: adv_output_vw
    label: Advance Output Mode VW
    kind: action
    command: "Y 0 125 {value}"
    params:
      - name: value
        type: integer
        description: "2 ~ (HS-13)"

  - id: adv_output_vs
    label: Advance Output Mode VS
    kind: action
    command: "Y 0 126 {value}"
    params:
      - name: value
        type: integer
        description: "15 ~ (VT-VA-1)"

  - id: adv_output_va
    label: Advance Output Mode VA
    kind: action
    command: "Y 0 127 {value}"
    params:
      - name: value
        type: integer
        description: "480 ~ 1200, <= (VT-16)"

  - id: adv_output_vp
    label: Advance Output Mode VP
    kind: action
    command: "Y 0 128 {polarity}"
    params:
      - name: polarity
        type: integer
        description: "0: Negative polarity, 1: Positive polarity"

  - id: adv_output_oclock_integer
    label: Advance Output Mode OCLK (Integer)
    kind: action
    command: "Y 0 129 {value}"
    params:
      - name: value
        type: integer
        description: "25 < OCLK < 165"

  - id: adv_output_oclock_decimal
    label: Advance Output Mode OCLK (Decimal)
    kind: action
    command: "Y 0 130 {value}"
    params:
      - name: value
        type: integer
        description: "25 < OCLK < 165"

  - id: adv_output_mode_save
    label: Advance Output Mode Save
    kind: action
    command: "Y 0 131"
    params: []

  - id: adv_output_mode_set_current
    label: Advance Output Mode Set Current
    kind: action
    command: "Y 0 132"
    params: []

  - id: volume_up_key
    label: Volume Up (function 133)
    kind: action
    command: "Y 0 133"
    params: []

  - id: volume_down_key
    label: Volume Down (function 134)
    kind: action
    command: "Y 0 134"
    params: []

  - id: hdcp_setting
    label: HDCP Setting
    kind: action
    command: "Y 0 135 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Follow Output, 1: Follow Input"

  - id: adv_input_custom_input
    label: Advance Input Mode Custom Input
    kind: action
    command: "Y 0 136 {slot}"
    params:
      - name: slot
        type: integer
        description: "0: Custom1, 1: Custom2, 2: Custom3, 3: Custom4"

  - id: adv_output_custom_output
    label: Advance Output Mode Custom Output
    kind: action
    command: "Y 0 137 {slot}"
    params:
      - name: slot
        type: integer
        description: "0: Custom1, 1: Custom2, 2: Custom3, 3: Custom4"

  - id: overscan
    label: Overscan
    kind: action
    command: "Y 0 138 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: switching_mode
    label: Switching Mode
    kind: action
    command: "Y 0 139 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Seamless, 1: Fast"

  - id: auto_image_mode
    label: Auto Image Mode
    kind: action
    command: "Y 0 140 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: Manual, 1: Auto"

  - id: slideshow_start
    label: Slideshow Start
    kind: action
    command: "Y 0 141"
    params: []

  - id: slideshow_stop
    label: Slideshow Stop
    kind: action
    command: "Y 0 142"
    params: []

  - id: slideshow_pause
    label: Slideshow Pause
    kind: action
    command: "Y 0 143"
    params: []

  - id: slideshow_next
    label: Slideshow Next
    kind: action
    command: "Y 0 144"
    params: []

  - id: slideshow_previous
    label: Slideshow Previous
    kind: action
    command: "Y 0 145"
    params: []

  - id: slideshow_interval
    label: Slideshow
    kind: action
    command: "Y 0 146 {interval}"
    params:
      - name: interval
        type: integer
        description: "0: Min, 1: Low, 2: Mid, 3: Long, 4: Max, 5: Off"

  - id: mode_set_mode_3
    label: Mode Set - Mode 3
    kind: action
    command: "Y 0 147 {mode}"
    params:
      - name: mode
        type: integer
        description: "0: 1280x768x60, 1: 1366x768x60"

  - id: hdmi1_hot_plug
    label: HDMI1 Hot Plug
    kind: action
    command: "Y 0 148 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: hdmi2_hot_plug
    label: HDMI2 Hot Plug
    kind: action
    command: "Y 0 149 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: hdmi1_audio_input
    label: HDMI1 Audio Input
    kind: action
    command: "Y 0 150 {source}"
    params:
      - name: source
        type: integer
        description: "0: Input 1, 1: Input 2, 2: Input 3, 3: Input 4, 4: VGA 1, 5: VGA 2, 6: HDMI 1"

  - id: hdmi2_audio_input
    label: HDMI2 Audio Input
    kind: action
    command: "Y 0 151 {source}"
    params:
      - name: source
        type: integer
        description: "0: Input 1, 1: Input 2, 2: Input 3, 3: Input 4, 4: VGA 1, 5: VGA 2, 6: HDMI 2"

  - id: custom_output_read_hdmi_edid_prefer_timing
    label: Custom Output Read HDMI EDID Prefer Timing
    kind: action
    command: "Y 0 152"
    params: []

  - id: hdmi1_input_hdcp
    label: HDMI1 Input HDCP On/Off
    kind: action
    command: "Y 0 153 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: hdmi2_input_hdcp
    label: HDMI2 Input HDCP On/Off
    kind: action
    command: "Y 0 154 {state}"
    params:
      - name: state
        type: integer
        description: "0: Off, 1: On"

  - id: input_hdcp_status_query
    label: Input HDCP Status Query
    kind: query
    command: "Y 1 155"
    params: []

  - id: output_hdcp_status_query
    label: Output HDCP Status Query
    kind: query
    command: "Y 1 156"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: communication_confirm
    type: enum
    values: ["CRLF>"]
    description: 'Send CR (0x0D) alone; device replies CRLF + ">" prompt'

  - id: set_command_ack
    type: string
    description: 'Reply to a set command: "Z<SP>Control_Type<SP>Function<SP>Param" + CRLF + ">" (echoes the set values)'

  - id: get_command_response
    type: string
    description: 'Reply to a get command: "Z<SP>Control_Type<SP>Function<SP>Param" + CRLF + ">" (Param holds the queried value)'

  - id: firmware_revision
    type: string
    description: "Value returned by get function 76 (Firmware Revision)"

  - id: main_input_status
    type: enum
    description: "Get function 103 response. Codes: 0-4: 640x480 60/67 Mac13/72/75/85, 5-6: 720x400 70/85, 7-11: 800x600 56/60/72/75/85, 12: 832x624 75 Mac16, 13-17: 1024x768 60/70/75/75 Mac19/85, 18: 1024x800 84 Sun, 19: 1152x864 75, 20: 1152x870 75 Mac21, 21-22: 1152x900 66/76 Sun, 23-24: 1280x960 60/85, 25: 1280x768 60, 26-29: 1280x1024 60/75/76 Sun/85, 30-31: 1400x1050 60/75, 32: 1600x1200 60, 33: 1680x1050 60, 34-35: 1080i 60/50, 36-37: 1080p 60/50, 38-39: 720p 60/50, 40: 480i, 41: 480p, 42: 576i, 43: 576p, 44: 1280x800 60 (Reduce blank), 45: 1920x1200 60, 46: 1920x1080 60, 47: 1280x720 60, 48: 1080p 24, 49: 1280x800 60, 50: 1440x900 60, 51: 1440x900 60 (Reduce blank), 52: 1280x768_60 (Reduce blank), 53: 1680x1050 60 (Reduce blank), 54: 1366x768 60, 55: 1366x768_60 (Reduce blank), 94-97: Custom1-4, 98: No Input detected, 99: other, 101: NTSC, 102: PAL, 103: PAL-M, 104: PAL-N, 105: NTSC 4.43, 106: SECAM, 107: PAL-60"
    values: []

  - id: pip_input_status
    type: enum
    description: "Get function 104 response. Same code table as main_input_status (0-107: see main_input_status mapping)"
    values: []

  - id: input_hdcp_status
    type: enum
    values: ["0: Off", "1: On"]
    description: "Get function 155 response"

  - id: output_hdcp_status
    type: enum
    values: ["0: Off", "1: On"]
    description: "Get function 156 response"

  - id: error_code
    type: enum
    values: ["ERR 1: Unknown command", "ERR 2: Unknown function", "ERR 3: Unavailable function", "ERR 4: Unknown control type", "ERR 5: Unavailable get function", "ERR 6: Unavailable set function", "ERR 7: Unavailable parameter", "ERR 8: Too few arguments"]
```

## Variables
```yaml
# All settable parameters in this source are expressed as discrete Actions
# (Y 0 {function} {param} commands above); no separate variable model documented.
variables: []
```

## Events
```yaml
# No unsolicited notifications documented in source.
events: []
```

## Macros
```yaml
# No multi-step sequences documented in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: factory_reset (function 75) exists but source documents no safety interlock for it.
```

## Notes
- Command framing: fields separated by space (ASCII 0x20, written △ in source). All commands terminated CR (0x0D). All replies terminated CRLF (0x0D 0x0A) followed by ">" prompt. Next command should be sent only after ">" is received (communication flow, source section 2.9–2.10).
- Control_Type 0 = set, Control_Type 1 = get (confirmed by source examples 2.4/2.5: `Y 0 1 0` sets Input 1 Source Type to Component; `Y 1 1` queries it, reply `Z 1 1 0`).
- Source command-list columns give set availability (0) and get availability (1) per function; "-" = unavailable. Functions marked "n/a" param are sent as `Y 0 {function}` with no parameter — exact wire form for n/a-param set commands not explicitly exemplified in source.
- Source lists functions 7, 8, 9 all labeled "Input H-Position" with different ranges (1~N, 2~N, 0~N) — labels reproduced verbatim; likely contains an OCR/source typo (possibly H/V/Position variants).
- Source lists Volume Up/Down twice: as special params 111/-111 under function 48, and as standalone functions 133/134. Both reproduced.
- Function 54 (User Delay) row has an empty set column in source; param range 0~340 (step 2) given, treated as settable.
- Error replies ERR 1–8 documented (see Feedbacks).
<!-- UNRESOLVED: flow control not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: whether device also supports TCP/ethernet control — not covered in this source document -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/protocols/vp-728_729_rs-232_command_set_2014-0521.pdf
  - https://k.kramerav.com/downloads/manuals/vp-728.pdf
retrieved_at: 2026-09-02T16:57:35.919Z
last_checked_at: 2026-09-12T22:16:53.648Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-12T22:16:53.648Z
matched_actions: 159
action_count: 159
confidence: medium
summary: "All 159 spec actions map to functions 0–156 in source; transport values9600/8/N/1 all literal; no source command missing. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/ethernet control, power specifications, and firmware compatibility not covered in source document"
- "flow control not stated in source"
- "source contains no safety warnings or interlock procedures."
- "firmware version compatibility not stated in source"
- "whether device also supports TCP/ethernet control — not covered in this source document"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
