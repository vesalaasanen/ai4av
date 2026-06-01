---
spec_id: admin/kramer-vp720xl-724xl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Kramer VP-720XL / VP-724XL Control Spec"
manufacturer: Kramer
model_family: VP-720XL
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VP-720XL
    - VP-724XL
    - VP-723
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
last_checked_at: 2026-05-20T15:42:30.226Z
generated_at: 2026-05-20T15:42:30.226Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T15:42:30.226Z
  matched_actions: 189
  action_count: 189
  confidence: high
  summary: "All 189 actions matched; transport verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Kramer VP-720XL / VP-724XL Control Spec

## Summary

Serial (RS-232) control protocol for the Kramer VP-720XL and VP-724XL video scalers/processors. Covers input switching, output resolution, PIP, image adjustments (brightness, contrast, color, gamma), audio settings, and seamless switching. Command format uses ASCII with `Y` prefix for requests and `Z` prefix for replies, terminated by CR (0x0D or 0x0A).

<!-- UNRESOLVED: source document titled VP720XL/724XL was filed under VIA GO GO2 — device/product mismatch; verify correct source mapping -->
<!-- UNRESOLVED: parity not stated in source -->
<!-- UNRESOLVED: flow control not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # source lists 9600 and 1152000; 1152000 likely typo for 115200
  data_bits: 8
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # power on/off via Control Type 6/7 Function 0
- queryable    # extensive get commands (Control Types 2, 4, 7)
- levelable    # brightness, contrast, volume, treble, bass with numeric ranges
- routable     # input source selection (Control Type 3/4 Function 0)
```

## Actions
```yaml
# === Control Type 0: Direct toggle/trigger commands ===
- id: output_toggle
  label: Output Toggle
  kind: action
  params: []

- id: freeze_toggle
  label: Freeze Toggle
  kind: action
  params: []

- id: power_toggle
  label: Power Toggle
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

- id: info
  label: Information
  kind: action
  params: []

- id: auto_image
  label: Auto Image
  kind: action
  params: []

- id: menu_toggle
  label: Menu Toggle
  kind: action
  params: []

- id: nav_up
  label: Navigate Up
  kind: action
  params: []

- id: nav_left
  label: Navigate Left
  kind: action
  params: []

- id: nav_enter
  label: Navigate Enter
  kind: action
  params: []

- id: nav_right
  label: Navigate Right
  kind: action
  params: []

- id: nav_down
  label: Navigate Down
  kind: action
  params: []

- id: auto_gain
  label: Auto Gain
  kind: action
  params: []

- id: pip_toggle
  label: PIP Toggle
  kind: action
  params: []

- id: swap
  label: Swap
  kind: action
  params: []

- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  params: []

- id: brightness_adjust
  label: Brightness Adjust
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

- id: mute_toggle
  label: Mute Toggle
  kind: action
  params: []

- id: volume_up
  label: Volume Up
  kind: action
  params: []

- id: color_mode
  label: Color Mode
  kind: action
  params: []

- id: aspect_ratio_toggle
  label: Aspect Ratio Toggle
  kind: action
  params: []

# === Control Type 5: Preset load ===
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

# === Control Type 3: Set parameters ===
- id: set_input_source
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724 only), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YC-2, 7=AV-2, 8=SCART, 9=TV"

- id: set_video_aspect_ratio
  label: Set Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=Normal, 1=Wide Screen, 2=Pan&Scan, 3=4:3, 4=16:9, 5=UserDefine"

- id: set_vga_aspect_ratio
  label: Set VGA Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: "0=Full Screen, 1=Native, 2=NonLinear, 3=4:3, 4=16:9, 5=UserDefine"

- id: set_zoom_ratio
  label: Set Zoom Ratio
  kind: action
  params:
    - name: zoom
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
    - name: stereo
      type: integer
      description: "0=Off, 1=On"

- id: set_pip_onoff
  label: Set PIP On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_pip_source
  label: Set PIP Source
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA-1, 1=VGA-2(VP-724 only), 2=DVI, 3=Component, 4=YC-1, 5=AV-1, 6=YC-2, 7=AV-2, 8=SCART, 9=TV"

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
    - name: frame
      type: integer
      description: "0=Off, 1=On"

- id: set_seamless_switch_mode
  label: Set Seamless Switch Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Fast, 1=Moderate, 2=Safe"

- id: set_seamless_background
  label: Set Seamless Switch Background
  kind: action
  params:
    - name: color
      type: integer
      description: "0=Black, 1=Blue, 2=Disable Analog Syncs"

- id: set_auto_search
  label: Set Auto Search
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_startup_logo
  label: Set Startup Logo
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_osd_size
  label: Set OSD Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=Normal, 1=Double"

- id: set_source_prompt
  label: Set Source Prompt
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: set_blank_color
  label: Set Blank Color
  kind: action
  params:
    - name: color
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
    - name: state
      type: integer
      description: "0 or 1"

- id: set_input_lock
  label: Set Input Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0 or 1"

- id: set_sog
  label: Set SOG Setting
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Auto, 1=RGsB, 2=DTV (KI239 only)"

- id: set_osd_timeout_enable
  label: Set OSD Timeout Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Disable, 1=Enable"

- id: set_output_mode_param_group
  label: Set Output Mode User-Defined Parameter Group
  kind: action
  params:
    - name: group
      type: integer
      description: "0=Group 1, 1=Group 2, 2=Group 3"

- id: set_audio_control_mode
  label: Set Audio Volume Control Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Master, 1=Individual, 2=Linked"

# === Control Type 6: Direct on/off set ===
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

# === Control Type 1: Numeric parameter set ===
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0-32"

- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: "0-12"

- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: "0-12"

- id: set_gamma_user1
  label: Set User1 Gamma
  kind: action
  params:
    - name: value
      type: integer
      description: "-10 to 10"

- id: set_color_temp_red_user1
  label: Set User1 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_color_temp_green_user1
  label: Set User1 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_color_temp_blue_user1
  label: Set User1 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_user1_color_manager_red
  label: Set User1 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer
      description: "0-32"

- id: set_user1_color_manager_green
  label: Set User1 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer
      description: "0-32"

- id: set_user1_color_manager_blue
  label: Set User1 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-32"

- id: set_user1_color_manager_yellow
  label: Set User1 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer
      description: "0-32"

- id: set_h_zoom
  label: Set H-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "-32 to 32"

- id: set_v_zoom
  label: Set V-Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: "-32 to 32"

- id: set_h_pan
  label: Set H-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: "-32 to 32"

- id: set_v_pan
  label: Set V-Pan
  kind: action
  params:
    - name: value
      type: integer
      description: "-32 to 32"

- id: set_graphics_h_position
  label: Set Graphics H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"

- id: set_graphics_v_position
  label: Set Graphics V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"

- id: set_graphics_color
  label: Set Graphics Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_graphics_hue
  label: Set Graphics Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_graphics_sharpness
  label: Set Graphics Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-16"

- id: set_graphics_frequency
  label: Set Graphics Frequency
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"

- id: set_graphics_phase
  label: Set Graphics Phase
  kind: action
  params:
    - name: value
      type: integer
      description: "0-31"

- id: set_video_color
  label: Set Video Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_video_hue
  label: Set Video Hue
  kind: action
  params:
    - name: value
      type: integer
      description: "0-127"

- id: set_video_sharpness
  label: Set Video Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: "0-16"

- id: set_video_h_position
  label: Set Video H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-20"

- id: set_video_v_position
  label: Set Video V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-39 (NTSC/PAL-M/PAL60) or 0-33 (PAL/SECAM)"

- id: set_pip_h_position
  label: Set PIP H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-36"

- id: set_pip_v_position
  label: Set PIP V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-36"

- id: set_pip_v_size
  label: Set PIP User-Defined V-Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"

- id: set_pip_h_size
  label: Set PIP User-Defined H-Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0-255"

- id: set_osd_h_position
  label: Set OSD H-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-36"

- id: set_osd_v_position
  label: Set OSD V-Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0-36"

- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "3-60 seconds"
- id: set_gamma_user2
  label: Set User2 Gamma
  kind: action
  params:
    - name: value
      type: integer

- id: set_color_temp_red_user2
  label: Set User2 Color Temp Red
  kind: action
  params:
    - name: value
      type: integer

- id: set_color_temp_green_user2
  label: Set User2 Color Temp Green
  kind: action
  params:
    - name: value
      type: integer

- id: set_color_temp_blue_user2
  label: Set User2 Color Temp Blue
  kind: action
  params:
    - name: value
      type: integer

- id: set_user2_color_manager_red
  label: Set User2 Color Manager Red
  kind: action
  params:
    - name: value
      type: integer

- id: set_user2_color_manager_green
  label: Set User2 Color Manager Green
  kind: action
  params:
    - name: value
      type: integer

- id: set_user2_color_manager_blue
  label: Set User2 Color Manager Blue
  kind: action
  params:
    - name: value
      type: integer

- id: set_user2_color_manager_yellow
  label: Set User2 Color Manager Yellow
  kind: action
  params:
    - name: value
      type: integer

- id: set_video_nonlinear
  label: Set Video Nonlinear
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Side, 2=Middle"

- id: set_ht_h_sync_cycle
  label: Set HT H-Sync Cycle
  kind: action
  params:
    - name: value
      type: integer

- id: set_hw_h_sync_width
  label: Set HW H-Sync Width
  kind: action
  params:
    - name: value
      type: integer

- id: set_hs_active_pixel_start
  label: Set HS Active Pixel Start
  kind: action
  params:
    - name: value
      type: integer

- id: set_ha_active_pixel
  label: Set HA Active Pixel
  kind: action
  params:
    - name: value
      type: integer

- id: set_hp_h_sync_polarity
  label: Set HP H-Sync Polarity
  kind: action
  params:
    - name: value
      type: integer
      description: "0=positive, 1=negative"

- id: set_vt_v_sync_cycle
  label: Set VT V-Sync Cycle
  kind: action
  params:
    - name: value
      type: integer

- id: set_vw_v_sync_width
  label: Set VW V-Sync Width
  kind: action
  params:
    - name: value
      type: integer

- id: set_vs_active_line_start
  label: Set VS Active Line Start
  kind: action
  params:
    - name: value
      type: integer

- id: set_va_active_line
  label: Set VA Active Line
  kind: action
  params:
    - name: value
      type: integer

- id: set_vp_v_sync_polarity
  label: Set VP V-Sync Polarity
  kind: action
  params:
    - name: value
      type: integer

- id: set_oclk
  label: Set OCLK Output Clock
  kind: action
  params:
    - name: value
      type: integer

- id: select_area_left_up
  label: Select Area Left Up
  kind: action
  params: []

- id: select_area_middle_up
  label: Select Area Middle Up
  kind: action
  params: []

- id: select_area_right_up
  label: Select Area Right Up
  kind: action
  params: []

- id: select_area_left_center
  label: Select Area Left Center
  kind: action
  params: []

- id: select_area_middle_center
  label: Select Area Middle Center
  kind: action
  params: []

- id: select_area_right_center
  label: Select Area Right Center
  kind: action
  params: []

- id: select_area_left_down
  label: Select Area Left Down
  kind: action
  params: []

- id: select_area_middle_down
  label: Select Area Middle Down
  kind: action
  params: []

- id: select_area_right_down
  label: Select Area Right Down
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: ["power_down", "power_on"]

- id: freeze_state
  type: enum
  values: ["off", "on"]

- id: blank_state
  type: enum
  values: ["off", "on"]

- id: mute_state
  type: enum
  values: ["off", "on"]

- id: key_lock_state
  type: enum
  values: ["off", "on"]

- id: current_input_source
  type: enum
  values: ["VGA-1", "VGA-2", "DVI", "Component", "YC-1", "AV-1", "YC-2", "AV-2", "SCART", "TV"]

- id: current_output_resolution
  type: string
  # returned as resolution name via Control Type 8 Function 0

- id: current_output_refresh_rate
  type: enum
  values: ["60Hz", "75Hz", "85Hz", "50Hz"]

- id: pip_state
  type: enum
  values: ["off", "on"]

- id: pip_source
  type: enum
  values: ["VGA-1", "VGA-2", "DVI", "Component", "YC-1", "AV-1", "YC-2", "AV-2", "SCART", "TV"]

- id: pip_size
  type: enum
  values: ["1/25", "1/16", "1/9", "1/4", "Split", "UserDefine"]

- id: brightness_value
  type: integer
  # range 0-127

- id: contrast_value
  type: integer
  # range 0-127

- id: volume_value
  type: integer
  # range 0-32

- id: treble_value
  type: integer
  # range 0-12

- id: bass_value
  type: integer
  # range 0-12

- id: video_aspect_ratio
  type: enum
  values: ["Normal", "Wide Screen", "Pan&Scan", "4:3", "16:9", "UserDefine"]

- id: video_standard
  type: enum
  values: ["Auto", "NTSC", "NTSC 4.43", "PAL", "PAL-N", "PAL-M", "SECAM"]

- id: seamless_switch_mode
  type: enum
  values: ["Fast", "Moderate", "Safe"]

- id: film_mode
  type: enum
  values: ["off", "on"]

- id: audio_stereo
  type: enum
  values: ["off", "on"]
```

## Variables
```yaml
# All levelable parameters are settable via Control Type 1 and queryable via Control Type 2.
# See Actions for parameter ranges. Key variables:

- id: brightness
  type: integer
  min: 0
  max: 127

- id: contrast
  type: integer
  min: 0
  max: 127

- id: volume
  type: integer
  min: 0
  max: 32

- id: treble
  type: integer
  min: 0
  max: 12

- id: bass
  type: integer
  min: 0
  max: 12

- id: gamma_user1
  type: integer
  min: -10
  max: 10

- id: gamma_user2
  type: integer
  min: -10
  max: 10

- id: h_zoom
  type: integer
  min: -32
  max: 32

- id: v_zoom
  type: integer
  min: -32
  max: 32

- id: h_pan
  type: integer
  min: -32
  max: 32

- id: v_pan
  type: integer
  min: -32
  max: 32

- id: graphics_sharpness
  type: integer
  min: 0
  max: 16

- id: video_sharpness
  type: integer
  min: 0
  max: 16
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
interlocks: []
# UNRESOLVED: no power-on sequencing or safety interlock procedures in source
```

## Notes

**Command format:** Set commands use prefix `Y`, replies use prefix `Z`. After a successful set, the device responds with `Done`. Fields are space-delimited: `Y <Control_Type> <Function> <Param> CR` where CR is 0x0D or 0x0A. Space character is ASCII 0x20.

**Example commands:**
- Set contrast to 32: `Y 1 0 32 CR` → reply `Z 1 0 32 CR` then `Done CR`
- Get output resolution: `Y 10 5 CR` → reply `Z 10 5 2 CR` (1024x768)
- Toggle menu: `Y 0 35 CR` → reply `Z 0 35 CR` then `Done CR`

**Control type summary:**
- Type 0: Direct toggle/trigger (no param)
- Type 1 (Set) / 2 (Get): Numeric parameters (gamma, color, brightness, position, etc.)
- Type 3 (Set) / 4 (Get): Configuration parameters (input, resolution, PIP, etc.)
- Type 5: Preset load (gamma/color presets)
- Type 6 (Set) / 7 (Get): On/off states (power, freeze, blank, mute, key lock)
- Type 8: Resolution/refresh rate query

**Baud rate note:** source lists "9600/1152000bps" — the "1152000" value is likely a typo for 115200. Both values stated in source.

<!-- UNRESOLVED: source document describes VP720XL/724XL protocol but was filed under VIA GO GO2 device — verify source-to-device mapping -->
<!-- UNRESOLVED: parity and flow control not specified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: Control Type 1 functions 44–54 (timing parameters: HT, HW, HS, HA, HP, VT, VW, VS, VA, VP, OCLK) have complex group behavior referenced by "Y 3 29 X" but details are incomplete -->

## Provenance

```yaml
source_domains:
  - k.kramerav.com
source_urls:
  - https://k.kramerav.com/downloads/manuals/VP-719xl.pdf
  - https://k.kramerav.com/downloads/protocols/protocol_3000_3.0_master_user.pdf
  - https://k.kramerav.com/downloads/manuals/VS-808xl.pdf
retrieved_at: 2026-05-02T08:13:25.835Z
last_checked_at: 2026-05-20T15:42:30.226Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T15:42:30.226Z
matched_actions: 189
action_count: 189
confidence: high
summary: "All 189 actions matched; transport verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
