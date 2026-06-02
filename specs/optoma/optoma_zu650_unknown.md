---
spec_id: admin/optoma-zu650
schema_version: ai4av-public-spec-v1
revision: 1
title: "Optoma ZU650 Control Spec"
manufacturer: Optoma
model_family: ZU650
aliases: []
compatible_with:
  manufacturers:
    - Optoma
  models:
    - ZU650
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
retrieved_at: 2026-05-15T02:07:53.142Z
last_checked_at: 2026-06-02T22:12:50.034Z
generated_at: 2026-06-02T22:12:50.034Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet/HTTP/Crestron/PJ Link/AMX transport details (ports, auth, command syntax) not provided in source"
  - "firmware version compatibility not stated in source"
  - "TCP port for Telnet or HTTP interfaces not stated"
  - "no multi-step macro sequences described in source"
  - "no explicit safety warnings or interlock procedures found in source"
  - "TCP/IP control port not stated (Telnet/HTTP interfaces exist but port numbers not documented)"
  - "Crestron/PJ Link/AMX/Extron integration details not documented"
  - "WLAN IP configuration write commands not fully specified (read-only responses shown)"
  - "EDID settings (HDMI1/2, HDBaseT) have no command codes in source"
  - "Network Reset has no command code in source"
  - "ProService menu has no commands documented"
  - "Change Password procedure not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:50.034Z
  matched_actions: 152
  action_count: 152
  confidence: medium
  summary: "All 152 spec actions traced to source (dip-safe re-verify). (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Optoma ZU650 Control Spec

## Summary
RS-232 serial control spec for the Optoma ZU650 laser projector. Commands use tilde-prefixed ASCII with carriage-return termination, projector ID addressing (00–99), and write/read response patterns (P/F for writes, Ok\<param\>/F for reads). The device also exposes optional Telnet, HTTP, Crestron, Extron, PJ Link, and AMX control interfaces (toggleable via RS-232) but those transport details and command sets are not documented here.

<!-- UNRESOLVED: Telnet/HTTP/Crestron/PJ Link/AMX transport details (ports, auth, command syntax) not provided in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP port for Telnet or HTTP interfaces not stated -->

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
  # supported baud rates: 9600, 14400, 19200, 38400, 57600, 115200
  # default is 19200; serial port path configurable: RS232 or HDBaseT
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/off commands
  - queryable     # extensive read/status commands
  - levelable     # brightness, contrast, color, tint, sharpness, zoom
  - routable      # input source selection (HDMI1/2, DisplayPort, HDBaseT, 3G-SDI)
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "~XX00 1"
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "~XX00 0"
    params: []

  - id: re_sync
    label: Re-Sync
    kind: action
    command: "~XX01 1"
    params: []

  - id: av_mute
    label: AV Mute
    kind: action
    command: "~XX02 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Off, 1=On"

  - id: freeze
    label: Freeze
    kind: action
    command: "~XX04 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Unfreeze, 1=Freeze"

  - id: set_display_mode
    label: Set Display Mode
    kind: action
    command: "~XX20 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4, 5, 9, 10, 13, 19, 21]
        description: "1=Presentation, 2=Bright, 3=Cinema, 4=sRGB, 5=User, 9=3D, 10=DICOM SIM., 13=DICOM SIM.(alt), 19=Blending, 21=HDR"

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "~XX21 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: "Brightness level 0-100"

  - id: brightness_step_up
    label: Brightness Step Up
    kind: action
    command: "~XX46 2"
    params: []

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "~XX22 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: "Contrast level 0-100"

  - id: contrast_step_up
    label: Contrast Step Up
    kind: action
    command: "~XX47 2"
    params: []

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "~XX23 <value>"
    params:
      - name: value
        type: integer
        range: [1, 15]
        description: "Sharpness level 1-15"

  - id: set_color
    label: Set Color
    kind: action
    command: "~XX45 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: "Color level 0-100"

  - id: set_tint
    label: Set Tint
    kind: action
    command: "~XX44 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]
        description: "Tint level 0-100"

  - id: set_wall_color
    label: Set Wall Color
    kind: action
    command: "~XX506 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 3, 4, 5, 6, 7]
        description: "0=Off, 1=Blackboard, 3=Light Green, 4=Light Blue, 5=Pink, 6=Gray, 7=Light Yellow"

  - id: set_gamma
    label: Set Gamma
    kind: action
    command: "~XX35 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4, 5, 6, 11, 12]
        description: "1=Film, 2=Video, 3=Graphics, 4=Standard(2.2), 5=1.8, 6=2.0, 11=DICOM SIM., 12=2.4"

  - id: set_brilliant_color
    label: Set BrilliantColor
    kind: action
    command: "~XX34 <value>"
    params:
      - name: value
        type: integer
        range: [0, 10]
        description: "BrilliantColor level 0-10"

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "~XX36 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 4]
        description: "1=Standard, 2=Cool, 4=Warm"

  - id: set_color_space
    label: Set Color Space
    kind: action
    command: "~XX37 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4]
        description: "1=Auto, 2=RGB(0-255), 3=YUV, 4=RGB(16-235)"

  - id: set_rgb_gain_bias
    label: Set RGB Gain/Bias
    kind: action
    command: "~XX<code> <value>"
    params:
      - name: channel
        type: string
        values: [red_gain, green_gain, blue_gain, red_bias, green_bias, blue_bias]
        description: "Command codes: R Gain=24, G Gain=25, B Gain=26, R Bias=27, G Bias=28, B Bias=29"
      - name: value
        type: integer
        range: [0, 100]

  - id: set_ultra_detail
    label: Set UltraDetail
    kind: action
    command: "~XX41 <value>"
    params:
      - name: value
        type: integer
        values: [0, 4, 5, 6]
        description: "0=Off, 4=1, 5=2, 6=3"

  - id: set_extreme_black
    label: Set Extreme Black
    kind: action
    command: "~XX218 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Off, 1=On"

  - id: set_dynamic_black
    label: Set Dynamic Black
    kind: action
    command: "~XX191 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Off, 1=On"

  - id: set_brightness_mode
    label: Set Brightness Mode
    kind: action
    command: "~XX110 <value>"
    params:
      - name: value
        type: integer
        values: [2, 6, 7]
        description: "2=Eco Mode, 6=Constant Power, 7=Constant Luminance"

  - id: set_power_level
    label: Set Power Level
    kind: action
    command: "~XX326 <value>"
    params:
      - name: value
        type: integer
        range: [1, 100]

  - id: set_pure_contrast
    label: Set PureContrast
    kind: action
    command: "~XX219 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_pure_color
    label: Set PureColor
    kind: action
    command: "~XX42 <value>"
    params:
      - name: value
        type: integer
        range: [0, 5]

  - id: set_pure_motion
    label: Set PureMotion
    kind: action
    command: "~XX190 <value>"
    params:
      - name: value
        type: integer
        range: [0, 3]

  - id: set_pure_motion_demo
    label: Set PureMotion Demo
    kind: action
    command: "~XX197 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2]
        description: "0=Off, 1=H Split, 2=V Split"

  - id: set_3d_mode
    label: Set 3D Mode
    kind: action
    command: "~XX230 <value>"
    params:
      - name: value
        type: integer
        values: [0, 4]
        description: "0=Off, 4=On"

  - id: set_3d_format
    label: Set 3D Format
    kind: action
    command: "~XX405 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2, 3, 7]
        description: "0=Auto, 1=Side by Side, 2=Top and Bottom, 3=Frame Sequential, 7=Frame Packing"

  - id: set_3d_2d
    label: Set 3D-2D
    kind: action
    command: "~XX400 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2]
        description: "0=3D, 1=L, 2=R"

  - id: set_3d_sync_invert
    label: Set 3D Sync Invert
    kind: action
    command: "~XX231 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_3d_sync_out
    label: Set 3D Sync Out
    kind: action
    command: "~XX232 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=To Emitter, 1=To Next Projector"

  - id: set_3d_frame_delay
    label: Set 3D Frame Delay
    kind: action
    command: "~XX233 <value>"
    params:
      - name: value
        type: integer
        range: [1, 200]

  - id: set_3d_lr_reference
    label: Set L/R Reference
    kind: action
    command: "~XX236 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Field GPIO, 1=1ST Frame"

  - id: reset_3d
    label: Reset 3D Settings
    kind: action
    command: "~XX234 1"
    params: []

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "~XX60 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 5, 6, 7]
        description: "1=4:3, 2=16:9, 3=16:10, 5=LBX, 6=Native, 7=Auto"

  - id: set_h_zoom
    label: Set Horizontal Zoom
    kind: action
    command: "~XX504 <value>"
    params:
      - name: value
        type: integer
        range: [50, 400]
        description: "Horizontal zoom percentage 50-400%"

  - id: set_v_zoom
    label: Set Vertical Zoom
    kind: action
    command: "~XX505 <value>"
    params:
      - name: value
        type: integer
        range: [50, 400]
        description: "Vertical zoom percentage 50-400%"

  - id: set_image_shift_h
    label: Set Image Shift Horizontal
    kind: action
    command: "~XX63 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]

  - id: set_image_shift_v
    label: Set Image Shift Vertical
    kind: action
    command: "~XX64 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]

  - id: set_h_arc
    label: Set H Arc
    kind: action
    command: "~XX300 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]

  - id: set_v_arc
    label: Set V Arc
    kind: action
    command: "~XX301 <value>"
    params:
      - name: value
        type: integer
        range: [0, 100]

  - id: set_h_keystone
    label: Set Horizontal Keystone
    kind: action
    command: "~XX65 <value>"
    params:
      - name: value
        type: integer
        range: [0, 40]

  - id: set_v_keystone
    label: Set Vertical Keystone
    kind: action
    command: "~XX66 <value>"
    params:
      - name: value
        type: integer
        range: [0, 40]

  - id: set_input_source
    label: Set Input Source
    kind: action
    command: "~XX12 <value>"
    params:
      - name: value
        type: integer
        values: [1, 15, 20, 21, 22]
        description: "1=HDMI1, 15=HDMI2, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI"

  - id: set_projection
    label: Set Projection Mode
    kind: action
    command: "~XX71 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4]
        description: "1=Front, 2=Rear, 3=Ceiling-top, 4=Rear-top"

  - id: set_pip_pbp_screen
    label: Set PIP/PBP Screen
    kind: action
    command: "~XX302 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2]
        description: "0=Off, 1=PIP, 2=PBP"

  - id: set_pip_location
    label: Set PIP Location
    kind: action
    command: "~XX303 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4, 5, 6, 7, 8]
        description: "1=PIP-TopLeft, 2=PIP-TopRight, 3=PIP-BottomLeft, 4=PIP-BottomRight, 5=PBP Main Left, 6=PBP Main Top, 7=PBP Main Right, 8=PBP Main Bottom"

  - id: set_pip_size
    label: Set PIP Size
    kind: action
    command: "~XX304 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3]
        description: "1=Large, 2=Medium, 3=Small"

  - id: set_pip_main_source
    label: Set PIP Main Source
    kind: action
    command: "~XX12 <value>"
    params:
      - name: value
        type: integer
        values: [1, 15, 20, 21, 22]
        description: "1=HDMI1, 15=HDMI2, 20=DisplayPort, 21=HDBaseT, 22=3G-SDI"

  - id: set_pip_sub_source
    label: Set PIP Sub Source
    kind: action
    command: "~XX305 <value>"
    params:
      - name: value
        type: integer
        values: [1, 4, 10, 11, 17]
        description: "1=HDMI1, 4=HDMI2, 10=HDBaseT, 11=3G-SDI, 17=DisplayPort"

  - id: pip_swap
    label: PIP Swap
    kind: action
    command: "~XX306 1"
    params: []

  - id: lens_zoom_in
    label: Lens Zoom In
    kind: action
    command: "~XX307 1"
    params: []

  - id: lens_zoom_out
    label: Lens Zoom Out
    kind: action
    command: "~XX307 2"
    params: []

  - id: lens_focus_near
    label: Lens Focus Near
    kind: action
    command: "~XX308 1"
    params: []

  - id: lens_focus_far
    label: Lens Focus Far
    kind: action
    command: "~XX308 2"
    params: []

  - id: lens_lock
    label: Lens Lock
    kind: action
    command: "~XX349 1"
    params: []

  - id: lens_unlock
    label: Lens Unlock
    kind: action
    command: "~XX349 2"
    params: []

  - id: lens_shift_up
    label: Lens Shift Up
    kind: action
    command: "~XX84 3"
    params: []

  - id: lens_shift_down
    label: Lens Shift Down
    kind: action
    command: "~XX84 4"
    params: []

  - id: lens_shift_left
    label: Lens Shift Left
    kind: action
    command: "~XX84 5"
    params: []

  - id: lens_shift_right
    label: Lens Shift Right
    kind: action
    command: "~XX84 6"
    params: []

  - id: lens_calibration
    label: Lens Calibration
    kind: action
    command: "~XX525 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=No, 1=Yes"

  - id: lens_memory_apply
    label: Lens Memory Apply Position
    kind: action
    command: "~XX359 <value>"
    params:
      - name: value
        type: integer
        range: [1, 5]
        description: "Position slot 1-5"

  - id: lens_memory_save
    label: Lens Memory Save Current Position
    kind: action
    command: "~XX360 <value>"
    params:
      - name: value
        type: integer
        range: [1, 5]
        description: "Position slot 1-5"

  - id: lens_memory_reset
    label: Lens Memory Reset
    kind: action
    command: "~XX361 1"
    params: []

  - id: set_warp_blend_settings
    label: Set Warp and Blend Settings
    kind: action
    command: "~XX142 <value>"
    params:
      - name: value
        type: integer
        values: [0, 3, 4]
        description: "0=All Off, 3=All On, 4=Blend Off"

  - id: set_warp_blend_memory
    label: Set Warp and Blend Memory
    kind: action
    command: "~XX147 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2, 3]
        description: "0=Off, 1=User1, 2=User2, 3=User3"

  - id: reset_warp_blend
    label: Reset Warp and Blend
    kind: action
    command: "~XX561 1"
    params: []

  - id: set_direct_power_on
    label: Set Direct Power On
    kind: action
    command: "~XX105 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_auto_power_off
    label: Set Auto Power Off
    kind: action
    command: "~XX106 <value>"
    params:
      - name: value
        type: integer
        range: [0, 180]
        description: "Minutes in 5-min increments"

  - id: set_sleep_timer
    label: Set Sleep Timer
    kind: action
    command: "~XX107 <value>"
    params:
      - name: value
        type: integer
        range: [0, 990]
        description: "Minutes in 30-min increments"

  - id: set_always_on
    label: Set Always On
    kind: action
    command: "~XX507 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_standby_mode
    label: Set Standby Power Mode
    kind: action
    command: "~XX114 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 3]
        description: "0=Eco, 1=Active, 3=Communications"

  - id: set_security
    label: Set Security
    kind: action
    command: "~XX78 <value>"
    params:
      - name: value
        type: integer
        description: "0=Off (with PIN), 1=On (with PIN)"

  - id: set_security_timer
    label: Set Security Timer
    kind: action
    command: "~XX77 <MMDDHH>"
    params:
      - name: mmddhh
        type: string
        description: "Month/Day/Hour format (RS232 only)"

  - id: set_test_pattern
    label: Set Test Pattern
    kind: action
    command: "~XX195 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
        description: "0=Off, 1=White Grid, 2=White, 3=Green Grid, 4=Magenta Grid, 5=Red, 6=Green, 7=Blue, 8=Yellow, 9=Magenta, 10=Cyan, 11=Black"

  - id: set_ir_front
    label: Set IR Front
    kind: action
    command: "~XX11 <value>"
    params:
      - name: value
        type: integer
        values: [4, 5]
        description: "4=Off, 5=On"

  - id: set_ir_top
    label: Set IR Top
    kind: action
    command: "~XX11 <value>"
    params:
      - name: value
        type: integer
        values: [6, 7]
        description: "6=Off, 7=On"

  - id: set_ir_hdbaset
    label: Set IR HDBaseT
    kind: action
    command: "~XX11 <value>"
    params:
      - name: value
        type: integer
        values: [9, 10]
        description: "9=On, 10=Off"

  - id: set_remote_code
    label: Set Remote Code
    kind: action
    command: "~XX350 <value>"
    params:
      - name: value
        type: integer
        range: [0, 99]

  - id: set_hot_key
    label: Set Hot-Key Settings
    kind: action
    command: "~XX117 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2]
        description: "1=Aspect Ratio, 2=Freeze Screen"

  - id: set_12v_trigger
    label: Set 12V Trigger
    kind: action
    command: "~XX192 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_projector_id
    label: Set Projector ID
    kind: action
    command: "~XX79 <value>"
    params:
      - name: value
        type: integer
        range: [0, 99]
        description: "00=All projectors"

  - id: set_light_sensor
    label: Set Light Sensor
    kind: action
    command: "~XX552 <value>"
    params:
      - name: value
        type: integer
        values: [0, 2]
        description: "0=Default, 2=Manual"

  - id: set_language
    label: Set Language
    kind: action
    command: "~XX70 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 25, 26, 27, 28]

  - id: set_menu_location
    label: Set Menu Location
    kind: action
    command: "~XX72 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2, 3, 4, 5]
        description: "1=Top left, 2=Top right, 3=Center, 4=Bottom left, 5=Bottom right"

  - id: set_menu_transparency
    label: Set Menu Transparency
    kind: action
    command: "~XX526 <value>"
    params:
      - name: value
        type: integer
        range: [0, 9]

  - id: set_menu_timer
    label: Set Menu Timer
    kind: action
    command: "~XX515 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 3, 4]
        description: "0=Off, 1=5sec, 3=10sec, 4=15sec"

  - id: set_auto_source
    label: Set Auto Source
    kind: action
    command: "~XX563 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_high_altitude
    label: Set High Altitude
    kind: action
    command: "~XX101 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_information_hide
    label: Set Information Hide
    kind: action
    command: "~XX102 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_logo
    label: Set Logo
    kind: action
    command: "~XX82 <value>"
    params:
      - name: value
        type: integer
        values: [1, 3]
        description: "1=Default, 3=Neutral"

  - id: set_background_color
    label: Set Background Color
    kind: action
    command: "~XX104 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 3, 4, 6, 7]
        description: "0=None, 1=Blue, 3=Red, 4=Green, 6=Gray, 7=Logo"

  - id: set_serial_port_path
    label: Set Serial Port Path
    kind: action
    command: "~XX557 <value>"
    params:
      - name: value
        type: integer
        values: [1, 2]
        description: "1=RS232, 2=HDBaseT"

  - id: set_source_lock
    label: Set Source Lock
    kind: action
    command: "~XX100 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_keypad_led
    label: Set Keypad LED
    kind: action
    command: "~XX362 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_dynamic_range_hdr
    label: Set Dynamic Range HDR
    kind: action
    command: "~XX565 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]
        description: "0=Off, 1=Auto"

  - id: set_hdr_picture_mode
    label: Set HDR Picture Mode
    kind: action
    command: "~XX566 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1, 2, 3, 4]
        description: "0=Bright, 1=Standard, 2=Film, 3=Detail, 4=SMPTE 2084"

  - id: set_crestron
    label: Set Crestron Control
    kind: action
    command: "~XX454 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_extron
    label: Set Extron Control
    kind: action
    command: "~XX455 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_pj_link
    label: Set PJ Link
    kind: action
    command: "~XX456 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_amx_discovery
    label: Set AMX Device Discovery
    kind: action
    command: "~XX457 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_telnet
    label: Set Telnet Control
    kind: action
    command: "~XX458 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_http
    label: Set HTTP Control
    kind: action
    command: "~XX459 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_wlan
    label: Set WLAN
    kind: action
    command: "~XX450 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: set_system_update_notification
    label: Set System Update Notification
    kind: action
    command: "~XX168 <value>"
    params:
      - name: value
        type: integer
        values: [0, 1]

  - id: system_update
    label: System Update
    kind: action
    command: "~XX168 9"
    params: []

  - id: reset_osd
    label: Reset OSD
    kind: action
    command: "~XX546 1"
    params: []

  - id: reset_to_default
    label: Reset to Default
    kind: action
    command: "~XX112 1"
    params: []

  - id: reset_image
    label: Reset Image Settings
    kind: action
    command: "~XX509 1"
    params: []

  - id: reset_color_matching
    label: Reset Color Matching
    kind: action
    command: "~XX215 1"
    params: []

  - id: reset_rgb_gain_bias
    label: Reset RGB Gain/Bias
    kind: action
    command: "~XX517 1"
    params: []

  - id: light_sensor_calibration
    label: Light Sensor Calibration
    kind: action
    command: "~XX552 2"
    params: []

  - id: set_filter_wheel_index
    label: Set Filter Wheel Index
    kind: action
    command: "~XX528 <value>"
    params:
      - name: value
        type: integer
        range: [0, 9999]

  - id: set_phosphor_wheel_index
    label: Set Phosphor Wheel Index
    kind: action
    command: "~XX529 <value>"
    params:
      - name: value
        type: integer
        range: [0, 9999]

  - id: remote_power
    label: Remote - Power
    kind: action
    command: "~XX140 1"
    params: []

  - id: remote_power_off
    label: Remote - Power Off
    kind: action
    command: "~XX140 2"
    params: []

  - id: remote_up
    label: Remote - Up
    kind: action
    command: "~XX140 10"
    params: []

  - id: remote_down
    label: Remote - Down
    kind: action
    command: "~XX140 14"
    params: []

  - id: remote_left
    label: Remote - Left
    kind: action
    command: "~XX140 11"
    params: []

  - id: remote_right
    label: Remote - Right
    kind: action
    command: "~XX140 13"
    params: []

  - id: remote_enter
    label: Remote - Enter (Menu)
    kind: action
    command: "~XX140 12"
    params: []

  - id: remote_menu
    label: Remote - Menu
    kind: action
    command: "~XX140 20"
    params: []

  - id: remote_exit
    label: Remote - Exit
    kind: action
    command: "~XX140 74"
    params: []

  - id: remote_brightness
    label: Remote - Brightness
    kind: action
    command: "~XX140 19"
    params: []

  - id: remote_contrast
    label: Remote - Contrast
    kind: action
    command: "~XX140 28"
    params: []

  - id: remote_zoom
    label: Remote - Zoom
    kind: action
    command: "~XX140 21"
    params: []

  - id: remote_zoom_plus
    label: Remote - Zoom +
    kind: action
    command: "~XX140 32"
    params: []

  - id: remote_zoom_minus
    label: Remote - Zoom -
    kind: action
    command: "~XX140 33"
    params: []

  - id: remote_focus_plus
    label: Remote - Focus +
    kind: action
    command: "~XX140 34"
    params: []

  - id: remote_focus_minus
    label: Remote - Focus -
    kind: action
    command: "~XX140 35"
    params: []

  - id: remote_av_mute
    label: Remote - AV Mute
    kind: action
    command: "~XX140 24"
    params: []

  - id: remote_lens_shift
    label: Remote - Lens Shift
    kind: action
    command: "~XX140 31"
    params: []

  - id: remote_v_keystone_plus
    label: Remote - V Keystone +
    kind: action
    command: "~XX140 15"
    params: []

  - id: remote_v_keystone_minus
    label: Remote - V Keystone -
    kind: action
    command: "~XX140 16"
    params: []

  - id: remote_h_keystone_plus
    label: Remote - H Keystone +
    kind: action
    command: "~XX140 68"
    params: []

  - id: remote_h_keystone_minus
    label: Remote - H Keystone -
    kind: action
    command: "~XX140 69"
    params: []

  - id: remote_mode
    label: Remote - Mode
    kind: action
    command: "~XX140 36"
    params: []

  - id: remote_info
    label: Remote - Info
    kind: action
    command: "~XX140 40"
    params: []

  - id: remote_auto_resync
    label: Remote - Auto (Re-sync)
    kind: action
    command: "~XX140 41"
    params: []

  - id: remote_input_source
    label: Remote - Input (Source)
    kind: action
    command: "~XX140 47"
    params: []

  - id: remote_gamma
    label: Remote - Gamma
    kind: action
    command: "~XX140 61"
    params: []

  - id: remote_pip
    label: Remote - PIP
    kind: action
    command: "~XX140 63"
    params: []

  - id: remote_pattern
    label: Remote - Pattern
    kind: action
    command: "~XX140 73"
    params: []

  - id: remote_lens_h_left
    label: Remote - Lens H Left
    kind: action
    command: "~XX140 64"
    params: []

  - id: remote_lens_h_right
    label: Remote - Lens H Right
    kind: action
    command: "~XX140 65"
    params: []

  - id: remote_lens_v_up
    label: Remote - Lens V Up
    kind: action
    command: "~XX140 66"
    params: []

  - id: remote_lens_v_down
    label: Remote - Lens V Down
    kind: action
    command: "~XX140 67"
    params: []

  - id: remote_hot_key_user1
    label: Remote - Hot Key User1 (F1)
    kind: action
    command: "~XX140 70"
    params: []

  - id: set_serial_port_baud_rate
    label: Set Serial Port Baud Rate
    kind: action
    command: "~XX153 <value>"
    params:
      - name: value
        type: integer
        description: "Read-only via RS232; reports current baud rate"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    read_command: "~XX124 1"
    response: "Ok0=Off, Ok1=On"
    values: [off, on]

  - id: input_source
    label: Input Source
    type: enum
    read_command: "~XX121 1"
    response: "Ok7=HDMI1, Ok8=HDMI2, Ok15=DisplayPort, Ok16=HDBaseT, Ok18=3G-SDI"
    values: [hdmi1, hdmi2, displayport, hdbaset, 3g_sdi]

  - id: brightness
    label: Brightness
    type: integer
    read_command: "~XX125 1"
    response: "Ok0~100"

  - id: contrast
    label: Contrast
    type: integer
    read_command: "~XX126 1"
    response: "Ok0~100"

  - id: aspect_ratio
    label: Aspect Ratio
    type: enum
    read_command: "~XX127 1"
    response: "Ok1=4:3, Ok2=16:9, Ok3=16:10, Ok5=LBX, Ok6=Native, Ok7=Auto"
    values: ["4:3", "16:9", "16:10", lbx, native, auto]

  - id: color_temperature
    label: Color Temperature
    type: enum
    read_command: "~XX128 1"
    response: "Ok0=Standard, Ok1=Cool, Ok3=Warm"
    values: [standard, cool, warm]

  - id: projection_mode
    label: Projection Mode
    type: enum
    read_command: "~XX129 1"
    response: "Ok0=Front, Ok1=Rear, Ok2=Ceiling-top, Ok3=Rear-top"
    values: [front, rear, ceiling_top, rear_top]

  - id: output_3d_state
    label: Output 3D State
    type: enum
    read_command: "~XX130 1"
    response: "Ok0=2D, Ok1=3D"
    values: ["2d", "3d"]

  - id: system_temperature
    label: System Temperature
    type: string
    read_command: "~XX150 18"
    response: "Ok<nnn>"

  - id: main_resolution
    label: Main Resolution
    type: string
    read_command: "~XX150 4"
    response: "Ok<nnnn> (e.g. Ok1920x1080)"

  - id: main_signal_format
    label: Main Signal Format
    type: string
    read_command: "~XX150 5"
    response: "Ok<nnnn> (e.g. OkDVI-D)"

  - id: main_vert_refresh
    label: Main Vertical Refresh
    type: string
    read_command: "~XX150 8"
    response: "Ok<nnnn> (e.g. Ok60Hz)"

  - id: main_pixel_clock
    label: Main Pixel Clock
    type: string
    read_command: "~XX150 6"

  - id: main_horz_refresh
    label: Main Horizontal Refresh
    type: string
    read_command: "~XX150 7"

  - id: sub_source
    label: Sub Source
    type: string
    read_command: "~XX131 1"

  - id: sub_resolution
    label: Sub Resolution
    type: string
    read_command: "~XX150 10"

  - id: sub_signal_format
    label: Sub Signal Format
    type: string
    read_command: "~XX150 11"

  - id: projection_hours
    label: Projection Hours
    type: integer
    read_command: "~XX108 1"
    response: "Ok<nnnnn>"

  - id: fw_version
    label: Firmware Version
    type: string
    read_command: "~XX122 1"

  - id: serial_number
    label: Serial Number
    type: string
    read_command: "~XX353 1"

  - id: model_name
    label: Model Name
    type: enum
    read_command: "~XX151 1"
    response: "Ok5=Optoma WUXGA, Ok6=Optoma UHD"

  - id: fan_speed
    label: Fan Speed
    type: integer
    read_command: "~XX351 <fan_id>"
    response: "Ok0000~9999"
    params:
      - name: fan_id
        type: integer
        values: [1, 2, 3, 4]

  - id: system_temp_raw
    label: System Temperature Raw
    type: integer
    read_command: "~XX352 1"
    response: "Ok0000~9999"

  - id: projector_id
    label: Projector ID
    type: integer
    read_command: "~XX558 1"
    response: "Ok00~99"

  - id: dhcp_state
    label: DHCP State
    type: enum
    read_command: "~XX150 17"
    response: "Ok0=Off, Ok1=On"
    values: [off, on]

  - id: standby_power_mode
    label: Standby Power Mode
    type: enum
    read_command: "~XX150 16"
    response: "Ok1=Active, Ok2=Eco, Ok3=Communications"

  - id: serial_baud_rate
    label: Serial Port Baud Rate
    type: integer
    read_command: "~XX153 1"
    response: "Ok9600|Ok14400|Ok19200|Ok38400|Ok57600|Ok115200"

  - id: warp_blend_pc_connection
    label: Warp and Blend PC Connection
    type: enum
    read_command: "~XX132 3"
    response: "Ok0=No, Ok1=Yes"

  - id: warp_blend_settings
    label: Warp and Blend Settings
    type: enum
    read_command: "~XX132 1"
    response: "Ok0=All Off, Ok3=All On, Ok4=Blend Off"

  - id: warp_blend_memory
    label: Warp and Blend Memory
    type: enum
    read_command: "~XX137 1"
    response: "Ok0=Off, Ok1=User1, Ok2=User2, Ok3=User3"

  - id: h_zoom
    label: Horizontal Zoom
    type: integer
    read_command: "~XX543 8"
    response: "Ok50~400"

  - id: v_zoom
    label: Vertical Zoom
    type: integer
    read_command: "~XX543 7"
    response: "Ok50~400"

  - id: image_shift_h
    label: Image Shift Horizontal
    type: integer
    read_command: "~XX543 1"
    response: "Ok0~100"

  - id: image_shift_v
    label: Image Shift Vertical
    type: integer
    read_command: "~XX543 2"
    response: "Ok0~100"

  - id: h_keystone
    label: Horizontal Keystone
    type: integer
    read_command: "~XX543 4"
    response: "Ok0~40"

  - id: v_keystone
    label: Vertical Keystone
    type: integer
    read_command: "~XX543 3"
    response: "Ok0~40"

  - id: h_arc
    label: H Arc
    type: integer
    read_command: "~XX543 6"
    response: "Ok0~100"

  - id: v_arc
    label: V Arc
    type: integer
    read_command: "~XX543 5"
    response: "Ok0~100"

  - id: lens_function
    label: Lens Lock State
    type: enum
    read_command: "~XX545 4"
    response: "Ok0=Locked, Ok1=Unlocked"

  - id: lan_ip_address
    label: LAN IP Address
    type: string
    read_command: "~XX87 3"
    response: "Ok<nnn.nnn.nnn.nnn>"

  - id: ssid
    label: SSID
    type: string
    read_command: "~XX451 3"

  - id: mac_address
    label: MAC Address
    type: string
    read_command: "~XX555 1"
    response: "Ok<nn:nn:nn:nn:nn:nn>"

  - id: info_string
    type: string
    read_command: "~XX150 1"
    response: "Ok<abbbbbccddddee>"

  - id: native_resolution
    type: string
    read_command: "~XX150 2"
    response: "Ok<nnn..nn> (e.g. Ok1920x1080)"

  - id: light_source_mode
    type: string
    read_command: "~XX150 15"

  - id: color_depth
    type: string
    read_command: "~XX156 1"
    response: "Ok<n>bit <nnn> (e.g. 8bit RGB)"

  - id: color_format
    type: string
    read_command: "~XX157 1"
    response: "Ok<nnnn> (e.g. BT.2020 HDR)"

  - id: display_mode
    type: enum
    read_command: "~XX123 1"

  - id: serial_port_path
    type: enum
    read_command: "~XX557 1"
    response: "Ok1=RS232, Ok2=HDBaseT"

  - id: filter_wheel_index
    type: integer
    read_command: "~XX530 1"
    response: "Ok0000~9999"

  - id: phosphor_wheel_index
    type: integer
    read_command: "~XX531 1"
    response: "Ok0000~9999"

  - id: ir_front
    type: enum
    read_command: "~XX542 1"
    response: "Ok0=Off, Ok1=On"

  - id: ir_top
    type: enum
    read_command: "~XX542 2"
    response: "Ok0=Off, Ok1=On"

  - id: security_month
    type: integer
    read_command: "~XX544 1"

  - id: security_day
    type: integer
    read_command: "~XX544 2"

  - id: security_hour
    type: integer
    read_command: "~XX544 3"
```

## Variables
```yaml
variables:
  - id: brightness_level
    label: Brightness
    type: integer
    range: [0, 100]
    write_command: "~XX21 <value>"
    read_command: "~XX125 1"

  - id: contrast_level
    label: Contrast
    type: integer
    range: [0, 100]
    write_command: "~XX22 <value>"
    read_command: "~XX126 1"

  - id: sharpness_level
    label: Sharpness
    type: integer
    range: [1, 15]
    write_command: "~XX23 <value>"

  - id: color_level
    label: Color
    type: integer
    range: [0, 100]
    write_command: "~XX45 <value>"

  - id: tint_level
    label: Tint
    type: integer
    range: [0, 100]
    write_command: "~XX44 <value>"

  - id: h_keystone
    label: Horizontal Keystone
    type: integer
    range: [0, 40]
    write_command: "~XX65 <value>"
    read_command: "~XX543 4"

  - id: v_keystone
    label: Vertical Keystone
    type: integer
    range: [0, 40]
    write_command: "~XX66 <value>"
    read_command: "~XX543 3"

  - id: h_zoom
    label: Horizontal Zoom
    type: integer
    range: [50, 400]
    write_command: "~XX504 <value>"
    read_command: "~XX543 8"

  - id: v_zoom
    label: Vertical Zoom
    type: integer
    range: [50, 400]
    write_command: "~XX505 <value>"
    read_command: "~XX543 7"

  - id: power_level
    label: Power Level
    type: integer
    range: [1, 100]
    write_command: "~XX326 <value>"

  - id: color_matching_hue
    label: Color Matching Hue
    type: integer
    range: [0, 254]
    write_command: "~XX<327-332> <value>"
    description: "Per-channel (R/G/B/C/M/Y) hue; command codes 327-332"

  - id: color_matching_saturation
    label: Color Matching Saturation
    type: integer
    range: [0, 254]
    write_command: "~XX<333-338> <value>"
    description: "Per-channel (R/G/B/C/M/Y) saturation; command codes 333-338"

  - id: color_matching_gain
    label: Color Matching Gain
    type: integer
    range: [0, 254]
    write_command: "~XX<339-344> <value>"
    description: "Per-channel (R/G/B/C/M/Y) gain; command codes 339-344"
```

## Events
```yaml
events:
  - id: standby_mode
    label: Standby Mode
    code: "INFO 0"
    description: "Projector entered standby"

  - id: warming_up
    label: Warming Up
    code: "INFO 1"
    description: "Lamp/source warming up"

  - id: cooling_down
    label: Cooling Down
    code: "INFO 2"
    description: "Projector cooling down"

  - id: out_of_range
    label: Out of Range
    code: "INFO 3"

  - id: lamp_fail
    label: Lamp/LED Fail
    code: "INFO 4"

  - id: thermal_switch_error
    label: Thermal Switch Error
    code: "INFO 5"

  - id: fan_lock
    label: Fan Lock
    code: "INFO 6"

  - id: over_temperature
    label: Over Temperature
    code: "INFO 7"

  - id: lamp_hours_running_out
    label: Lamp Hours Running Out
    code: "INFO 8"

  - id: cover_open
    label: Cover Open
    code: "INFO 9"

  - id: lamp_ignite_fail
    label: Lamp Ignite Fail
    code: "INFO 10"

  - id: format_board_power_on_fail
    label: Format Board Power On Fail
    code: "INFO 11"

  - id: color_wheel_stop
    label: Color Wheel Unexpected Stop
    code: "INFO 12"

  - id: over_temperature_2
    label: Over Temperature (alternate)
    code: "INFO 13"

  - id: fan_1_lock
    label: Fan 1 Lock
    code: "INFO 14"

  - id: fan_2_lock
    label: Fan 2 Lock
    code: "INFO 15"

  - id: fan_3_lock
    label: Fan 3 Lock
    code: "INFO 16"

  - id: fan_4_lock
    label: Fan 4 Lock
    code: "INFO 17"

  - id: fan_5_lock
    label: Fan 5 Lock
    code: "INFO 18"

  - id: lan_fail_restart
    label: LAN Fail Then Restart
    code: "INFO 19"

  - id: ld_below_60
    label: LD Lower Than 60%
    code: "INFO 20"

  - id: ld_ntc1_over_temp
    label: LD NTC (1) Over Temperature
    code: "INFO 21"

  - id: ld_ntc2_over_temp
    label: LD NTC (2) Over Temperature
    code: "INFO 22"

  - id: high_ambient_temp
    label: High Ambient Temperature
    code: "INFO 23"

  - id: system_ready
    label: System Ready
    code: "INFO 24"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures found in source
```

## Notes
- Command format: `~XX<command> <param><CR>` where `XX` is two-digit projector ID (00 = all projectors), `<command>` is a 3-digit code, and `<CR>` is carriage return (0x0D).
- Write response: `P` for pass, `F` for fail.
- Read response: `Ok<param>` for pass, `F` for fail.
- System auto responses use format `INFO<code>` sent unsolicited.
- Freeze can be released by menu key, exit key, and direct source key.
- The device supports optional Telnet, HTTP, Crestron, Extron, PJ Link, and AMX Device Discovery control interfaces — these are toggleable via RS-232 commands (~XX454–~XX459) but their transport details, ports, and command syntax are not documented in this source.
- Color matching supports per-channel hue/saturation/gain for R, G, B, C, M, Y plus white RGB gain (command codes 327–347).
- Four Corners geometric correction uses multiple sub-parameters per corner (command code ~XX59 with parameters 1–16, plus ~XX581–~XX588 for offsets).
- Security timer can only be set via RS-232 (not via menu).

<!-- UNRESOLVED: TCP/IP control port not stated (Telnet/HTTP interfaces exist but port numbers not documented) -->
<!-- UNRESOLVED: Crestron/PJ Link/AMX/Extron integration details not documented -->
<!-- UNRESOLVED: WLAN IP configuration write commands not fully specified (read-only responses shown) -->
<!-- UNRESOLVED: EDID settings (HDMI1/2, HDBaseT) have no command codes in source -->
<!-- UNRESOLVED: Network Reset has no command code in source -->
<!-- UNRESOLVED: ProService menu has no commands documented -->
<!-- UNRESOLVED: Change Password procedure not documented -->

## Provenance

```yaml
source_domains:
  - region-resource.optoma.com
source_urls:
  - https://region-resource.optoma.com/products/import/Documents/fcc27c8d-3ab3-462f-a7f3-ee35633fdb8c.pdf
  - https://region-resource.optoma.com/products/import/Documents/cf45148a-8c4b-4489-8689-b9b1c8d09d14.pdf
retrieved_at: 2026-05-15T02:07:53.142Z
last_checked_at: 2026-06-02T22:12:50.034Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:50.034Z
matched_actions: 152
action_count: 152
confidence: medium
summary: "All 152 spec actions traced to source (dip-safe re-verify). (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet/HTTP/Crestron/PJ Link/AMX transport details (ports, auth, command syntax) not provided in source"
- "firmware version compatibility not stated in source"
- "TCP port for Telnet or HTTP interfaces not stated"
- "no multi-step macro sequences described in source"
- "no explicit safety warnings or interlock procedures found in source"
- "TCP/IP control port not stated (Telnet/HTTP interfaces exist but port numbers not documented)"
- "Crestron/PJ Link/AMX/Extron integration details not documented"
- "WLAN IP configuration write commands not fully specified (read-only responses shown)"
- "EDID settings (HDMI1/2, HDBaseT) have no command codes in source"
- "Network Reset has no command code in source"
- "ProService menu has no commands documented"
- "Change Password procedure not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
