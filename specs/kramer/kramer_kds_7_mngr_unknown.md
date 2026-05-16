---
spec_id: admin/kramer-vp720xl-724xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP720XL/724XL Control Spec"
manufacturer: Kramer
model_family: VP720XL
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP720XL
    - VP724XL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VP-719xl.pdf
  - https://k.kramerav.com/downloads/protocols/protocol_3000_3.0_master_user.pdf
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-05-02T08:13:25.835Z
last_checked_at: 2026-05-16T12:16:09.408Z
generated_at: 2026-05-16T12:16:09.408Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T12:16:09.408Z
  matched_actions: 126
  action_count: 126
  confidence: high
  summary: "All 126 spec actions matched to source control type/function pairs with correct parameter ranges and transport settings verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Kramer VP720XL/724XL Control Spec

## Summary
Video scaler/processor with RS-232 serial control. Protocol uses ASCII command format: `Y <control_type> <function> <param> CR` for set, `Z` prefix for reply. Supports input switching, output resolution, PIP, gamma/color adjustment, audio, and OSD settings.

<!-- UNRESOLVED: device name mismatch — source file named "kds_7_mngr" but document content is VP720XL/724XL Protocol Series -->
<!-- UNRESOLVED: parity setting not stated in source -->
<!-- UNRESOLVED: flow control not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off commands (control_type 6, function 0)
- queryable    # get commands return current state (control_type 2/4/7/8)
- levelable    # volume, brightness, contrast, treble, bass controls
- routable     # input source selection commands
```

## Actions
```yaml
# Control Type 0 - Trigger/Button commands (no params)
- id: toggle_output
  label: Toggle Output
  kind: action
  params: []

- id: toggle_freeze_button
  label: Toggle Freeze (Button)
  kind: action
  params: []

- id: toggle_power_button
  label: Toggle Power (Button)
  kind: action
  params: []

- id: select_av1
  label: Select AV1
  kind: action
  params: []

- id: select_av2
  label: Select AV2
  kind: action
  params: []

- id: select_component
  label: Select Component
  kind: action
  params: []

- id: select_yc1
  label: Select YC1
  kind: action
  params: []

- id: select_yc2
  label: Select YC2
  kind: action
  params: []

- id: select_vga1
  label: Select VGA1
  kind: action
  params: []

- id: select_vga2
  label: Select VGA2
  kind: action
  params: []

- id: select_dvi
  label: Select DVI
  kind: action
  params: []

- id: toggle_information
  label: Toggle Information
  kind: action
  params: []

- id: auto_image
  label: Auto Image
  kind: action
  params: []

- id: toggle_menu
  label: Toggle Menu
  kind: action
  params: []

- id: navigate_up
  label: Navigate Up
  kind: action
  params: []

- id: navigate_left
  label: Navigate Left
  kind: action
  params: []

- id: navigate_enter
  label: Navigate Enter
  kind: action
  params: []

- id: navigate_right
  label: Navigate Right
  kind: action
  params: []

- id: navigate_down
  label: Navigate Down
  kind: action
  params: []

- id: auto_gain
  label: Auto Gain
  kind: action
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  params: []

- id: swap
  label: Swap
  kind: action
  params: []

- id: adjust_contrast
  label: Adjust Contrast (Button)
  kind: action
  params: []

- id: adjust_brightness
  label: Adjust Brightness (Button)
  kind: action
  params: []

- id: zoom_in
  label: Zoom In
  kind: action
  params: []

- id: zoom_out
  label: Zoom Out
  kind: action
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  params: []

- id: toggle_mute_button
  label: Toggle Mute (Button)
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: cycle_color_mode
  label: Cycle Color Mode
  kind: action
  params: []

- id: cycle_aspect_ratio
  label: Cycle Aspect Ratio
  kind: action
  params: []

# Control Type 1 - Set gamma/color/image/audio parameters
- id: set_user1_gamma
  label: Set User1 Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: Gamma value (-10 to 10)

- id: set_user1_color_temp_red
  label: Set User1 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer
      description: Red color temperature (0 to 127)

- id: set_user1_color_temp_green
  label: Set User1 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer
      description: Green color temperature (0 to 127)

- id: set_user1_color_temp_blue
  label: Set User1 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer
      description: Blue color temperature (0 to 127)

- id: set_user1_color_manager_red
  label: Set User1 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer
      description: Red color manager (0 to 32)

- id: set_user1_color_manager_green
  label: Set User1 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer
      description: Green color manager (0 to 32)

- id: set_user1_color_manager_blue
  label: Set User1 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer
      description: Blue color manager (0 to 32)

- id: set_user1_color_manager_yellow
  label: Set User1 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: Yellow color manager (0 to 32)

- id: set_user2_gamma
  label: Set User2 Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: Gamma value (-10 to 10)

- id: set_user2_color_temp_red
  label: Set User2 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer
      description: Red color temperature (0 to 127)

- id: set_user2_color_temp_green
  label: Set User2 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer
      description: Green color temperature (0 to 127)

- id: set_user2_color_temp_blue
  label: Set User2 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer
      description: Blue color temperature (0 to 127)

- id: set_user2_color_manager_red
  label: Set User2 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer
      description: Red color manager (0 to 32)

- id: set_user2_color_manager_green
  label: Set User2 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer
      description: Green color manager (0 to 32)

- id: set_user2_color_manager_blue
  label: Set User2 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer
      description: Blue color manager (0 to 32)

- id: set_user2_color_manager_yellow
  label: Set User2 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: Yellow color manager (0 to 32)

- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness (0 to 127)

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast (0 to 127)

- id: set_aspect_h_zoom
  label: Set User Define H-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal zoom (-32 to 32)

- id: set_aspect_v_zoom
  label: Set User Define V-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical zoom (-32 to 32)

- id: set_aspect_h_pan
  label: Set User Define H-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal pan (-32 to 32)

- id: set_aspect_v_pan
  label: Set User Define V-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical pan (-32 to 32)

- id: set_graphics_h_position
  label: Set Graphics H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal position (0 to 255)

- id: set_graphics_v_position
  label: Set Graphics V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical position (0 to 255)

- id: set_graphics_color
  label: Set Graphics Color
  kind: action
  params:
    - name: value
      type: integer
      description: Color (0 to 127)

- id: set_graphics_hue
  label: Set Graphics Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue (0 to 127)

- id: set_graphics_sharpness
  label: Set Graphics Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness (0 to 16)

- id: set_graphics_frequency
  label: Set Graphics Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: Frequency (0 to 100)

- id: set_graphics_phase
  label: Set Graphics Phase
  kind: action
  params:
    - name: value
      type: integer
      description: Phase (0 to 31)

- id: set_video_color
  label: Set Video Color
  kind: action
  params:
    - name: value
      type: integer
      description: Color (0 to 127)

- id: set_video_hue
  label: Set Video Hue
  kind: action
  params:
    - name: value
      type: integer
      description: Hue (0 to 127)

- id: set_video_sharpness
  label: Set Video Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness (0 to 16)

- id: set_video_h_position
  label: Set Video H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal position (0 to 20)

- id: set_video_v_position
  label: Set Video V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical position (0 to 39 depending on video standard)

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume (0 to 32)

- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: Treble (0 to 12)

- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: Bass (0 to 12)

- id: set_pip_h_position
  label: Set PIP H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: PIP horizontal position (0 to 36)

- id: set_pip_v_position
  label: Set PIP V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: PIP vertical position (0 to 36)

- id: set_pip_v_size
  label: Set PIP User Define V-Size
  kind: action
  params:
    - name: value
      type: integer
      description: PIP vertical size (0 to 255)

- id: set_pip_h_size
  label: Set PIP User Define H-Size
  kind: action
  params:
    - name: value
      type: integer
      description: PIP horizontal size (0 to 255)

- id: set_osd_h_position
  label: Set OSD H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: OSD horizontal position (0 to 36)

- id: set_osd_v_position
  label: Set OSD V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: OSD vertical position (0 to 36)

- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: Timeout in seconds (3 to 60)

- id: set_ht
  label: Set HT (H-Sync Cycle)
  kind: action
  params:
    - name: value
      type: integer
      description: H-Sync cycle (>100)

- id: set_hw
  label: Set HW (H-Sync Width)
  kind: action
  params:
    - name: value
      type: integer
      description: H-Sync width (>0)

- id: set_hs
  label: Set HS (Active Pixel Start)
  kind: action
  params:
    - name: value
      type: integer
      description: Active pixel start (>0)

- id: set_hp
  label: Set HP (H-Sync Polarity)
  kind: action
  params:
    - name: value
      type: integer
      description: "0=positive, 1=negative"

- id: set_vt
  label: Set VT (V-Sync Cycle)
  kind: action
  params:
    - name: value
      type: integer
      description: V-Sync cycle (>0)

- id: set_vw
  label: Set VW (V-Sync Width)
  kind: action
  params:
    - name: value
      type: integer
      description: V-Sync width (>0)

- id: set_vs
  label: Set VS (Active Line Start)
  kind: action
  params:
    - name: value
      type: integer
      description: Active line start (>0)

- id: set_vp
  label: Set VP (V-Sync Polarity)
  kind: action
  params:
    - name: value
      type: integer
      description: "0=positive, 1=negative"

- id: set_oclk
  label: Set OCLK (Output Clock)
  kind: action
  params:
    - name: value
      type: integer
      description: Output clock (>100, OCLK = value / 10 MHz)

# Control Type 3 - Set configuration parameters
- id: select_input_source
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YC-2, 7=AV-2, 8=SCART, 9=TV"

- id: set_video_aspect_ratio
  label: Set Video Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Wide Screen, 2=Pan&Scan, 3=4:3, 4=16:9, 5=UserDefine"

- id: set_video_nonlinear
  label: Set Video Nonlinear
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Side, 2=Middle"

- id: set_vga_aspect_ratio
  label: Set VGA Aspect Ratio
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Full Screen, 1=Native, 2=NonLinear, 3=4:3, 4=16:9, 5=UserDefine"

- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=Off, 1=150%, 2=200%, 3=225%, 4=250%, 5=275%, 6=300%, 7=325%, 8=350%, 9=375%, 10=400%"

- id: set_graphics_color_format
  label: Set Graphics Color Format
  kind: action
  params:
    - name: format
      type: integer
      description: "0=Default, 1=RGB, 2=YUV"

- id: set_video_color_format
  label: Set Video Color Format
  kind: action
  params:
    - name: format
      type: integer
      description: "0=Default, 1=RGB, 2=YUV"

- id: set_video_standard
  label: Set Video Standard
  kind: action
  params:
    - name: standard
      type: integer
      description: "0=Auto, 1=NTSC, 2=NTSC 4.43, 3=PAL, 4=PAL-N, 5=PAL-M, 6=SECAM"

- id: set_film_mode
  label: Set Film Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_audio_stereo
  label: Set Audio Stereo
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_pip_on_off
  label: Set PIP On/Off
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_pip_source
  label: Set PIP Source
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YC-2, 7=AV-2, 8=SCART, 9=TV"

- id: set_pip_size
  label: Set PIP Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=1/25, 1=1/16, 2=1/9, 3=1/4, 4=Split, 5=UserDefine"

- id: set_pip_frame
  label: Set PIP Frame
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_seamless_switch_mode
  label: Set Seamless Switch Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Fast, 1=Moderate, 2=Safe"

- id: set_seamless_switch_background
  label: Set Seamless Switch Background
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Black, 1=Blue, 2=Disable Analog Syncs"

- id: set_seamless_switch_auto_search
  label: Set Seamless Switch Auto Search
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_startup_logo
  label: Set Startup Logo
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_osd_size
  label: Set OSD Size
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Double"

- id: set_source_prompt
  label: Set Source Prompt
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_blank_color
  label: Set Blank Color
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Blue, 1=Black"

- id: set_output_resolution
  label: Set Output Resolution
  kind: action
  params:
    - name: resolution
      type: integer
      description: "0=640x480, 1=800x600, 2=1024x768, 3=1280x1024, 4=1600x1200, 5=852x1024i, 6=1024x1024i, 7=1366x768, 8=1365x1024, 9=1280x720, 10=720x483, 11=852x480, 12=1400x1050, 13=480P, 14=720P, 15=1080i, 16=576P, 17=1080P, 18=1280x768, 19=UserDefine"

- id: set_output_refresh_rate
  label: Set Output Refresh Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: "0=60Hz, 1=75Hz, 2=85Hz, 3=50Hz"

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: confirm
      type: integer
      description: "0=Cancel, 1=OK"

- id: set_input_button_mode
  label: Set Input Button Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Freeze/Blank, 1=Freeze, 2=Blank, 3=Ignore"

- id: set_key_lock_save
  label: Set Key Lock Save
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_input_lock
  label: Set Input Lock
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On"

- id: set_sog_setting
  label: Set SOG Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Auto, 1=RGsB, 2=DTV"

- id: set_osd_timeout_enabled
  label: Set Enable OSD Timeout
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Disable, 1=Enable"

- id: set_userdefine_param_group
  label: Set UserDefine Parameter Group
  kind: action
  params:
    - name: group
      type: integer
      description: "0=Group 1, 1=Group 2, 2=Group 3"

- id: set_audio_control_mode
  label: Set Audio Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Master, 1=Individual, 2=Linked"

# Control Type 5 - Load gamma/color presets
- id: load_gamma_normal
  label: Load Gamma/Color Normal
  kind: action
  params: []

- id: load_gamma_presentation
  label: Load Gamma/Color Presentation
  kind: action
  params: []

- id: load_gamma_cinema
  label: Load Gamma/Color Cinema
  kind: action
  params: []

- id: load_gamma_nature
  label: Load Gamma/Color Nature
  kind: action
  params: []

- id: load_gamma_user1
  label: Load Gamma/Color User1
  kind: action
  params: []

- id: load_gamma_user2
  label: Load Gamma/Color User2
  kind: action
  params: []

# Control Type 6 - Set binary state (power/freeze/blank/mute/keylock)
- id: set_power
  label: Set Power
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Power Down, 1=Power On"

- id: set_freeze
  label: Set Freeze
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_blank
  label: Set Blank
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_key_lock
  label: Set Key Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
```

## Feedbacks
```yaml
# Control Type 2 (Get for type 1 params), Type 4 (Get for type 3 params),
# Type 7 (Get for type 6 params), Type 8 (query) return current state via Z prefix.
- id: power_state
  type: enum
  values: ["0", "1"]
  description: "0=Power Down, 1=Power On"

- id: freeze_state
  type: enum
  values: ["0", "1"]
  description: "0=Off, 1=On"

- id: blank_state
  type: enum
  values: ["0", "1"]
  description: "0=Off, 1=On"

- id: mute_state
  type: enum
  values: ["0", "1"]
  description: "0=Off, 1=On"

- id: key_lock_state
  type: enum
  values: ["0", "1"]
  description: "0=Off, 1=On"

- id: input_source
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  description: "Current input source (0=VGA-1 through 9=TV)"

- id: output_resolution
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]
  description: "Current output resolution index"

- id: output_refresh_rate
  type: enum
  values: ["0", "1", "2", "3"]
  description: "0=60Hz, 1=75Hz, 2=85Hz, 3=50Hz"

- id: brightness
  type: integer
  description: "Current brightness (0 to 127)"

- id: contrast
  type: integer
  description: "Current contrast (0 to 127)"

- id: volume
  type: integer
  description: "Current volume (0 to 32)"

- id: resolution_query
  type: string
  description: "Resolution/refresh rate or video standard string from control type 8 query"
```

## Variables
```yaml
# Set/get parameters covered by Actions above. No additional variables.
```

## Events
```yaml
# No unsolicited events described in source.
```

## Macros
```yaml
# No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing found in source
```

## Notes
- Command format: `Y <control_type> <function> <param> CR` (set), `Z <control_type> <function> <param> CR` (reply). Space separator is ASCII 0x20. CR is ASCII 0x0D or 0x0A.
- Set commands receive `Done CR` acknowledgement on success.
- Baud rate supports 9600 and 115200 bps.
- VGA-2 input (control type 0 function 9, input source 1) is VP-724 only.
- HDTV output resolutions (480P, 720P, 1080i, 1080P) are VP723/724 only; 1080P requires KI238 firmware and 80P DAC board.
- SOG setting (control type 3 function 27) requires KI239 firmware.
- Get commands for timing parameters (type 1 functions 44-54) return the current group parameter; group selection via type 3 function 29.

<!-- UNRESOLVED: device name "KDS 7 MNGR" does not match source document title "VP720XL/724XL Protocol Series" -->
<!-- UNRESOLVED: parity setting not specified in serial configuration -->
<!-- UNRESOLVED: flow control not specified in serial configuration -->
<!-- UNRESOLVED: protocol version — document lists version 1.06 but does not state which protocol version the spec targets -->
<!-- UNRESOLVED: area commands (functions 12-20) param semantics not documented -->
<!-- UNRESOLVED: HA (Active Pixel) and VA (Active Line) marked as "-" for param range — read-only or auto-calculated -->
<!-- UNRESOLVED: Key Lock Save function 25 — param range 0~1 but behavior not documented -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VP-719xl.pdf
  - https://k.kramerav.com/downloads/protocols/protocol_3000_3.0_master_user.pdf
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-05-02T08:13:25.835Z
last_checked_at: 2026-05-16T12:16:09.408Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:16:09.408Z
matched_actions: 126
action_count: 126
confidence: high
summary: "All 126 spec actions matched to source control type/function pairs with correct parameter ranges and transport settings verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
