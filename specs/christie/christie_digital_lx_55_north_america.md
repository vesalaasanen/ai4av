---
spec_id: admin/christie-digital-lx-55
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Digital LX-55 Control Spec"
manufacturer: Christie
model_family: LX-55
aliases: []
compatible_with:
  manufacturers:
    - Christie
    - "Christie Digital"
  models:
    - LX-55
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/christie-lx37-lx55-lw25-rs232-communication-protocols.pdf
  - https://applicationmarket.crestron.com/content/Help/Christie/christie_digital_lx-55_v1_0_help.pdf
retrieved_at: 2026-04-29T17:31:28.689Z
last_checked_at: 2026-05-14T18:17:14.955Z
generated_at: 2026-05-14T18:17:14.955Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers LX37/40/45/50/55 as a family — LX-55-specific differences not called out"
  - "no TCP/IP or network control documented in this source; Network Viewer (Input 4) mentioned but protocol unspecified"
  - "source does not specify whether power-off confirmation or safety interlock sequences are required beyond timing delays"
  - "firmware version compatibility not stated in source"
  - "no network/TCP control protocol documented; Input 4 (Network Viewer) mentioned but no network command syntax provided"
  - "source doc title references LX37/40/45/50/55 but filename suggested LX500 — family applicability confirmed by Table 3 command list"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.955Z
  matched_actions: 122
  action_count: 122
  confidence: medium
  summary: "All 190 spec actions (basic, extended control, basic status, extended status) are literally present in Tables 3/3a/4/4a; transport parameters match verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# Christie Digital LX-55 Control Spec

## Summary
RS-232C serial control spec for the Christie LX-55 projector (also covers LX37/40/45/50). Commands sent as hex over serial at 19200 baud. Two command sets: basic control codes (`C xx CR`) and extended codes (`C F_ xx_## CR`), plus status request commands (`CR x CR` and `CR_ xx CR`).

<!-- UNRESOLVED: source covers LX37/40/45/50/55 as a family — LX-55-specific differences not called out -->
<!-- UNRESOLVED: no TCP/IP or network control documented in this source; Network Viewer (Input 4) mentioned but protocol unspecified -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - queryable    # status request commands return state
  - routable     # input/source selection commands
  - levelable    # volume, brightness, contrast, etc.
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "C 00"
    description: "Power on projector. 5000ms delay between commands."
    params: []

  - id: power_off_quick
    label: Quick Power Off
    kind: action
    command: "C 01"
    description: "Quick power off. 3000ms delay between commands."
    params: []

  - id: power_off
    label: Power Off
    kind: action
    command: "C 02"
    description: "Power off. 1st issue 100ms delay, 2nd issue 3000ms delay."
    params: []

  - id: input_1
    label: Select Input 1
    kind: action
    command: "C 05"
    description: "Select Input 1. 5000ms delay between commands."
    params: []

  - id: input_2
    label: Select Input 2
    kind: action
    command: "C 06"
    description: "Select Input 2. 5000ms delay between commands."
    params: []

  - id: input_3
    label: Select Input 3
    kind: action
    command: "C 07"
    description: "Select Input 3. 5000ms delay between commands."
    params: []

  - id: volume_up
    label: Volume Up
    kind: action
    command: "C 09"
    description: "Increment volume by one."
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "C 0A"
    description: "Decrement volume by one."
    params: []

  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "C 0B"
    description: "Disable projector audio."
    params: []

  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "C 0C"
    description: "Enable projector audio."
    params: []

  - id: video_mute_on
    label: Video Mute On (No Show)
    kind: action
    command: "C 0D"
    description: "Enable video mute."
    params: []

  - id: video_mute_off
    label: Video Mute Off (No Show)
    kind: action
    command: "C 0E"
    description: "Disable video mute."
    params: []

  - id: av_normal_size
    label: AV Normal Size (4:3)
    kind: action
    command: "C 0F"
    description: "Set AV source to 4:3 aspect ratio. 300ms delay."
    params: []

  - id: av_wide_size
    label: AV Wide Size (16:9)
    kind: action
    command: "C 10"
    description: "Set AV source to 16:9 aspect ratio. 300ms delay."
    params: []

  - id: menu_on
    label: Menu On
    kind: action
    command: "C 1C"
    description: "Display main menu."
    params: []

  - id: menu_off
    label: Menu Off
    kind: action
    command: "C 1D"
    description: "Clear main menu."
    params: []

  - id: clear_screen
    label: Clear Screen
    kind: action
    command: "C 1E"
    description: "Clear OSD regardless of location."
    params: []

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "C 20"
    description: "Increment brightness by one."
    params: []

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "C 21"
    description: "Decrement brightness by one."
    params: []

  - id: input_2_video
    label: Input 2 Video
    kind: action
    command: "C 23"
    description: "Select composite video on Input 2. 5000ms delay."
    params: []

  - id: input_2_ypbpr
    label: Input 2 Y,Pb/Cb,Pr/Cr
    kind: action
    command: "C 24"
    description: "Select YPbPr on Input 2. 5000ms delay."
    params: []

  - id: input_2_rgb
    label: Input 2 RGB
    kind: action
    command: "C 25"
    description: "Select RGB on Input 2. 5000ms delay."
    params: []

  - id: image_toggle
    label: Image Toggle
    kind: action
    command: "C 27"
    description: "Change IMAGE setting status."
    params: []

  - id: on_start_enable
    label: On Start Enable
    kind: action
    command: "C 28"
    description: "Enable power-up when plugged in."
    params: []

  - id: on_start_disable
    label: On Start Disable
    kind: action
    command: "C 29"
    description: "Disable power-up when plugged in."
    params: []

  - id: power_management_enable
    label: Power Management Enable
    kind: action
    command: "C 2A"
    description: "Enable power management."
    params: []

  - id: power_management_disable
    label: Power Management Disable
    kind: action
    command: "C 2B"
    description: "Disable power management."
    params: []

  - id: digital_zoom_up
    label: Digital Zoom Up
    kind: action
    command: "C 30"
    description: "Access digital zoom, then increment by one each issue."
    params: []

  - id: digital_zoom_down
    label: Digital Zoom Down
    kind: action
    command: "C 31"
    description: "Access digital zoom, then decrement by one each issue."
    params: []

  - id: input_3_video
    label: Input 3 Video
    kind: action
    command: "C 33"
    description: "Select composite video on Input 3. 5000ms delay."
    params: []

  - id: input_3_svideo
    label: Input 3 S-Video
    kind: action
    command: "C 34"
    description: "Select S-Video on Input 3. 5000ms delay."
    params: []

  - id: input_3_ypbpr
    label: Input 3 Y,Pb/Cb,Pr/Cr
    kind: action
    command: "C 35"
    description: "Select YPbPr on Input 3. 5000ms delay."
    params: []

  - id: right_arrow
    label: Right Arrow Key
    kind: action
    command: "C 3A"
    params: []

  - id: left_arrow
    label: Left Arrow Key
    kind: action
    command: "C 3B"
    params: []

  - id: up_arrow
    label: Up Arrow Key
    kind: action
    command: "C 3C"
    params: []

  - id: down_arrow
    label: Down Arrow Key
    kind: action
    command: "C 3D"
    params: []

  - id: right_mouse_click
    label: Right Mouse Click
    kind: action
    command: "C 3E"
    params: []

  - id: select_key
    label: Select Key
    kind: action
    command: "C 3F"
    params: []

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "C 43"
    params: []

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "C 44"
    params: []

  - id: zoom_lens_down
    label: Zoom Lens Down
    kind: action
    command: "C 46"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: zoom_lens_up
    label: Zoom Lens Up
    kind: action
    command: "C 47"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: focus_down
    label: Focus Down
    kind: action
    command: "C 4A"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: focus_up
    label: Focus Up
    kind: action
    command: "C 4B"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: color_management_on
    label: Color Management On
    kind: action
    command: "C 4E"
    params: []

  - id: input_1_rgb
    label: Input 1 RGB (Analog)
    kind: action
    command: "C 50"
    description: "Select analog RGB on Input 1. 5000ms delay."
    params: []

  - id: input_1_scart
    label: Input 1 SCART
    kind: action
    command: "C 51"
    description: "Select SCART on Input 1. 5000ms delay."
    params: []

  - id: input_1_dvi_pc
    label: Input 1 DVI (PC Digital)
    kind: action
    command: "C 52"
    description: "Select DVI PC digital on Input 1. 5000ms delay."
    params: []

  - id: input_1_dvi_hdcp
    label: Input 1 DVI (AV HDCP)
    kind: action
    command: "C 53"
    description: "Select DVI HDCP on Input 1. 5000ms delay."
    params: []

  - id: input_1_monitor_out
    label: Input 1 Monitor Out
    kind: action
    command: "C 54"
    description: "Select Input 1 to monitor out. 5000ms delay."
    params: []

  - id: lens_shift_up
    label: Lens Shift Up
    kind: action
    command: "C 5D"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: lens_shift_down
    label: Lens Shift Down
    kind: action
    command: "C 5E"
    description: "Slight adjustment per issue; many issuings needed for visible change."
    params: []

  - id: auto_pc_adjust
    label: Auto PC Adjust
    kind: action
    command: "C 89"
    params: []

  - id: presentation_timer
    label: Presentation Timer
    kind: action
    command: "C 8A"
    description: "1st: start. 2nd: stop. 3rd: clear/reset."
    params: []

  - id: keystone_up
    label: Keystone Up
    kind: action
    command: "C 8E"
    description: "Access keystone then increment. Subsequent issuings within 3 seconds."
    params: []

  - id: keystone_down
    label: Keystone Down
    kind: action
    command: "C 8F"
    description: "Access keystone then decrement. Subsequent issuings within 3 seconds."
    params: []

  - id: keystone_right
    label: Keystone Right
    kind: action
    command: "C 90"
    description: "Access keystone then adjust. Subsequent issuings within 3 seconds."
    params: []

  - id: keystone_left
    label: Keystone Left
    kind: action
    command: "C 91"
    description: "Access keystone then adjust. Subsequent issuings within 3 seconds."
    params: []

  # --- Extended control commands (format: C F_ xx_## CR) ---

  - id: ext_brightness
    label: Set Brightness
    kind: action
    command: "C F_ BRIGHT_##"
    description: "Extended brightness control. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_contrast
    label: Set Contrast
    kind: action
    command: "C F_ CONT_##"
    description: "Extended contrast control. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_color
    label: Set Color
    kind: action
    command: "C F_ COLOR_##"
    description: "Extended color control. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_tint
    label: Set Tint
    kind: action
    command: "C F_ TINT_##"
    description: "Extended tint control. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_sharpness
    label: Set Sharpness
    kind: action
    command: "C F_ SHARP_##"
    description: "Extended sharpness control. 000-031, UP, DN."
    params:
      - name: value
        type: string
        description: "000-031, UP, or DN"

  - id: ext_gamma
    label: Set Gamma
    kind: action
    command: "C F_ GAMMA_##"
    description: "Extended gamma control. 000-015, UP, DN."
    params:
      - name: value
        type: string
        description: "000-015, UP, or DN"

  - id: ext_wbal_r
    label: Set White Balance Red
    kind: action
    command: "C F_ WBAL-R_##"
    description: "Extended white balance red. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_wbal_g
    label: Set White Balance Green
    kind: action
    command: "C F_ WBAL-G_##"
    description: "Extended white balance green. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_wbal_b
    label: Set White Balance Blue
    kind: action
    command: "C F_ WBAL-B_##"
    description: "Extended white balance blue. 000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_coltemp
    label: Set Color Temperature
    kind: action
    command: "C F_ COLTEMP_##"
    description: "Select color temperature. 000-003."
    params:
      - name: value
        type: string
        description: "000-003"

  - id: ext_nzred
    label: Set Noise Reduction
    kind: action
    command: "C F_ NZRED_##"
    description: "Select noise reduction. ON, OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_progv
    label: Set Progressive Video
    kind: action
    command: "C F_ PROGV_##"
    description: "L1, L2, or OFF."
    params:
      - name: value
        type: string
        description: "L1, L2, or OFF"

  - id: ext_image
    label: Set Image Mode
    kind: action
    command: "C F_ IMAGE_##"
    description: "Computer: STAND, REAL, CUSTOM1-4. Video: STAND, CINEMA, CUSTOM1-4. 2000ms."
    params:
      - name: value
        type: string
        description: "STAND, REAL, CINEMA, CUSTOM1-4"

  - id: ext_imageadj
    label: Image Adjust Reset/Save
    kind: action
    command: "C F_ IMAGEADJ_##"
    description: "RST reset, STR1-4 save. 1500ms."
    params:
      - name: value
        type: string
        description: "RST, STR1, STR2, STR3, STR4"

  - id: ext_apctrl
    label: Set Digital Keystone Level
    kind: action
    command: "C F_ APCTRL_##"
    description: "L1, L2, or OFF."
    params:
      - name: value
        type: string
        description: "L1, L2, or OFF"

  - id: ext_colmnsav
    label: Store Color Management
    kind: action
    command: "C F_ COLMNSAV_##"
    description: "Store color management settings. 000-009."
    params:
      - name: value
        type: string
        description: "000-009"

  - id: ext_colmnld
    label: Recall Color Management
    kind: action
    command: "C F_ COLMNLD_##"
    description: "Recall color management settings. 000-009."
    params:
      - name: value
        type: string
        description: "000-009"

  # PC Control Series

  - id: ext_fsync
    label: Set Fine Sync
    kind: action
    command: "C F_ FSYNC_##"
    description: "0000-0031, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0000-0031, UP, or DN"

  - id: ext_tdots
    label: Set Total Dots
    kind: action
    command: "C F_ TDOTS_##"
    description: "nnnn-9999, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "nnnn-9999, UP, or DN"

  - id: ext_clamp
    label: Set Clamp Value
    kind: action
    command: "C F_ CLAMP_##"
    description: "0000-0127, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0000-0127, UP, or DN"

  - id: ext_hpos_pc
    label: Set Horizontal Position (PC)
    kind: action
    command: "C F_ H-POS_##"
    description: "0000-nnnn, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0000-nnnn, UP, or DN"

  - id: ext_vpos_pc
    label: Set Vertical Position (PC)
    kind: action
    command: "C F_ V-POS_##"
    description: "0000-nnnn, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0000-nnnn, UP, or DN"

  - id: ext_ddots
    label: Set Display Dots
    kind: action
    command: "C F_ DDOTS_##"
    description: "0100-nnnn, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0100-nnnn, UP, or DN"

  - id: ext_dline
    label: Set Display Line
    kind: action
    command: "C F_ DLINE_##"
    description: "0100-nnnn, UP, DN. Execute with SETPCADJ. 600ms."
    params:
      - name: value
        type: string
        description: "0100-nnnn, UP, or DN"

  - id: ext_setpcadj
    label: Start PC Adjust
    kind: action
    command: "C F_ SETPCADJ_##"
    description: "EXT6-EXT60. Required to execute PC adjust table commands. 600ms."
    params:
      - name: value
        type: string
        description: "EXT6-EXT60"

  - id: ext_orgmode
    label: Select Original Mode
    kind: action
    command: "C F_ ORGMODE_##"
    description: 'Signal mode e.g. XGA1, HDTV1080. After SETPCADJ. 600ms.'
    params:
      - name: value
        type: string
        description: "Signal mode string"

  - id: ext_pcstore
    label: Store PC Adjust
    kind: action
    command: "C F_ PCSTORE_##"
    description: "MODE1-MODE5. 600ms."
    params:
      - name: value
        type: string
        description: "MODE1-MODE5"

  # Input Control Series

  - id: ext_input
    label: Select Input (Extended)
    kind: action
    command: "C F_ INPUT_##"
    description: "1-4 (4=Network Viewer). 5000ms."
    params:
      - name: value
        type: integer
        description: "1-4"

  - id: ext_source
    label: Select Source
    kind: action
    command: "C F_ SOURCE_##"
    description: "Varies by input: DIGITAL, ANALOG, SCART, HDCP, OUT, VIDEO, YPRPB, S-VIDEO."
    params:
      - name: value
        type: string
        description: "Source type"

  - id: ext_input1
    label: Select Input 1 + Signal
    kind: action
    command: "C F_ INPUT1_##"
    description: "DIGITAL, ANALOG, SCART, HDCP, OUT. 5000ms."
    params:
      - name: value
        type: string
        description: "DIGITAL, ANALOG, SCART, HDCP, OUT"

  - id: ext_input2
    label: Select Input 2 + Signal
    kind: action
    command: "C F_ INPUT2_##"
    description: "VIDEO, YPRPB, ANALOG. 5000ms."
    params:
      - name: value
        type: string
        description: "VIDEO, YPRPB, ANALOG"

  - id: ext_input3
    label: Select Input 3 + Signal
    kind: action
    command: "C F_ INPUT3_##"
    description: "VIDEO, S-VIDEO, YPRPB. 5000ms."
    params:
      - name: value
        type: string
        description: "VIDEO, S-VIDEO, YPRPB"

  - id: ext_input4
    label: Select Input 4 (Network Viewer)
    kind: action
    command: "C F_ INPUT4_NETWORK"
    description: "Select Network Viewer. 5000ms."
    params: []

  - id: ext_system_pc
    label: Select PC System
    kind: action
    command: "C F_ SYSTEM_##"
    description: "MODE1-MODE5. 1000ms."
    params:
      - name: value
        type: string
        description: "MODE1-MODE5"

  - id: ext_system_video
    label: Select Video System
    kind: action
    command: "C F_ SYSTEM_##"
    description: "AUTO, NTSC, NTSC443, PAL, SECAM, PAL-M, PAL-N, 1080I, 1035I, 720P, 575P, 480P, 575I, 480I."
    params:
      - name: value
        type: string
        description: "Video system type"

  # Screen Series

  - id: ext_screen_computer
    label: Set Screen Size (Computer)
    kind: action
    command: "C F_ SCREEN_##"
    description: "WIDE, TRUE, DZOOM UP, DZOOM DN. 1000ms."
    params:
      - name: value
        type: string
        description: "WIDE, TRUE, DZOOM UP, DZOOM DN"

  - id: ext_screen_video
    label: Set Screen Size (Video)
    kind: action
    command: "C F_ SCREEN_##"
    description: "NORMAL (4:3), WIDE (16:9)."
    params:
      - name: value
        type: string
        description: "NORMAL or WIDE"

  - id: ext_flsceren
    label: Set Full Screen
    kind: action
    command: "C F_ FLSCREN_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_true
    label: Set True Screen
    kind: action
    command: "C F_ TRUE_##"
    description: "ON or OFF. 800ms."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_dzcent
    label: Cancel Digital Zoom
    kind: action
    command: "C F_ DZCENT_CENT"
    description: "CENT cancels digital zoom. 500ms."
    params: []

  - id: ext_keystone
    label: Set Keystone (Extended)
    kind: action
    command: "C F_ KEYSTONE_##"
    description: "UP, FUP, DN, FDN, LEFT, FLEFT, RIGHT, FRGT, RST."
    params:
      - name: value
        type: string
        description: "UP, FUP, DN, FDN, LEFT, FLEFT, RIGHT, FRGT, RST"

  - id: ext_kystnmode
    label: Set Keystone Store Mode
    kind: action
    command: "C F_ KYSTNMODE_##"
    description: "STR (store) or RST (reset)."
    params:
      - name: value
        type: string
        description: "STR or RST"

  - id: ext_anamorphic
    label: Set Anamorphic
    kind: action
    command: "C F_ ANAMORPHIC_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_vscale
    label: Set Vertical Scale
    kind: action
    command: "C F_ VSCALE_##"
    description: "-32 to 032."
    params:
      - name: value
        type: integer
        description: "-32 to 32"

  - id: ext_vpos_screen
    label: Set Vertical Position (Screen)
    kind: action
    command: "C F_ VPOS_##"
    description: "-64 to 064."
    params:
      - name: value
        type: integer
        description: "-64 to 64"

  - id: ext_hscale
    label: Set Horizontal Scale
    kind: action
    command: "C F_ HSCALE_##"
    description: "-32 to 032."
    params:
      - name: value
        type: integer
        description: "-32 to 32"

  - id: ext_hpos_screen
    label: Set Horizontal Position (Screen)
    kind: action
    command: "C F_ HPOS_##"
    description: "-64 to 064."
    params:
      - name: value
        type: integer
        description: "-64 to 64"

  # Lamp Series

  - id: ext_lamph
    label: Reset Lamp Timer
    kind: action
    command: "C F_ LAMPH_RST"
    description: "Reset total lamp running time."
    params: []

  - id: ext_lampmode
    label: Set Lamp Mode
    kind: action
    command: "C F_ LAMPMODE_##"
    description: "FUL (full power) or ECO."
    params:
      - name: value
        type: string
        description: "FUL or ECO"

  # Sound Series

  - id: ext_volume
    label: Set Volume
    kind: action
    command: "C F_ VOLUME_##"
    description: "000-063, UP, DN."
    params:
      - name: value
        type: string
        description: "000-063, UP, or DN"

  - id: ext_mute
    label: Set Mute
    kind: action
    command: "C F_ MUTE_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_bltinsp
    label: Set Built-in Speaker
    kind: action
    command: "C F_ BLTINSP_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  # Setting Series

  - id: ext_bback
    label: Set Blue Background
    kind: action
    command: "C F_ BBACK_##"
    description: "ON or OFF. 500ms."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_disp
    label: Set Display
    kind: action
    command: "C F_ DISP_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_logo
    label: Set Logo
    kind: action
    command: "C F_ LOGO_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_ceil
    label: Set Ceiling Mount
    kind: action
    command: "C F_ CEIL_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_rear
    label: Set Rear Projection
    kind: action
    command: "C F_ REAR_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_rcode
    label: Set Remote Control Code
    kind: action
    command: "C F_ RCODE_##"
    description: "001-008."
    params:
      - name: value
        type: string
        description: "001-008"

  - id: ext_lang
    label: Set Language
    kind: action
    command: "C F_ LANG_##"
    description: "ENG, DEU, FRA, ESP, ITA, POR, NED, SVE, JPN, CHI, KOR, RUS."
    params:
      - name: value
        type: string
        description: "Language code"

  - id: ext_on_sta
    label: Set Power On Start
    kind: action
    command: "C F_ ON-STA_##"
    description: "ON or OFF."
    params:
      - name: value
        type: string
        description: "ON or OFF"

  - id: ext_p_mane
    label: Set Power Management
    kind: action
    command: "C F_ P-MANE_##"
    description: "OFF, READY, or SHUTDOWN."
    params:
      - name: value
        type: string
        description: "OFF, READY, or SHUTDOWN"

  - id: ext_p_manetime
    label: Set Power Management Time
    kind: action
    command: "C F_ P-MANETIME_##"
    description: "01-30 minutes, UP, or DN."
    params:
      - name: value
        type: string
        description: "01-30, UP, or DN"

  - id: ext_fanspeed
    label: Set Fan Speed
    kind: action
    command: "C F_ FANSPEED_##"
    description: "MAX or NOR."
    params:
      - name: value
        type: string
        description: "MAX or NOR"

  - id: ext_fdefault
    label: Factory Default Reset
    kind: action
    command: "C F_ FDEFAULT_RST"
    description: "Reset to factory defaults."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: enum
    values: ["accepted (06)", "not recognized (?)"]
    description: "Response to control commands. 06 = accepted, ? = not recognized."

  # Basic status request (format: CR x CR)

  - id: status_read
    type: enum
    values: ["00", "04", "08", "10", "20", "21", "24", "28", "40", "80", "81", "88"]
    description: "Projector status. 00=ON, 04=lamps off (power mgmt), 08=abnormal temp, 10=power failure, 20=cool down, 21=lamp failure cooling, 24=power save cooling, 28=temp warning cooling, 40=power up countdown, 80=OFF standby, 81=standby after lamp failure, 88=temp warning recovered."
    command: "CR 0"

  - id: input_mode_read
    type: enum
    values: ["1", "2", "3", "4"]
    description: "Currently selected input. 1=Input1, 2=Input2, 3=Input3, 4=Network Viewer."
    command: "CR 1"

  - id: lamp_timer_read
    type: string
    description: "Four-digit total lamp hours."
    command: "CR 3"

  - id: setting_read
    type: enum
    values: ["00", "01", "10", "11"]
    description: "Installation config. 00=front/ceiling, 01=rear/floor, 10=rear/ceiling, 11=front/floor."
    command: "CR 4"

  - id: model_read
    type: string
    description: "OEM manufacturer model number."
    command: "CR 5"

  - id: temp_read
    type: string
    description: "Panel and lamp temperatures in Celsius. Format: ss.s ss.s"
    command: "CR 6"

  # Extended status requests (format: CR_ xx CR)

  - id: ext_brightness_read
    type: string
    description: "Brightness value nnn."
    command: "CR_ BRIGHT"

  - id: ext_contrast_read
    type: string
    description: "Contrast value nnn."
    command: "CR_ CONT"

  - id: ext_color_read
    type: string
    description: "Color value nnn."
    command: "CR_ COLOR"

  - id: ext_tint_read
    type: string
    description: "Tint value nnn."
    command: "CR_ TINT"

  - id: ext_sharp_read
    type: string
    description: "Sharpness value nnn."
    command: "CR_ SHARP"

  - id: ext_gamma_read
    type: string
    description: "Gamma value nnn."
    command: "CR_ GAMMA"

  - id: ext_wbal_r_read
    type: string
    description: "White balance red value nnn."
    command: "CR_ WBAL-R"

  - id: ext_wbal_g_read
    type: string
    description: "White balance green value nnn."
    command: "CR_ WBAL-G"

  - id: ext_wbal_b_read
    type: string
    description: "White balance blue value nnn."
    command: "CR_ WBAL-B"

  - id: ext_coltemp_read
    type: string
    description: "Color temperature value nnn."
    command: "CR_ COLTEMP"

  - id: ext_nzred_read
    type: enum
    values: ["ON", "OFF"]
    description: "Noise reduction status."
    command: "CR_ NZRED"

  - id: ext_progv_read
    type: enum
    values: ["L1", "L2", "OFF"]
    description: "Progressive video status."
    command: "CR_ PROGV"

  - id: ext_image_read
    type: enum
    values: ["STAND", "REAL", "CINEMA", "CUSTOM1", "CUSTOM2", "CUSTOM3", "CUSTOM4"]
    description: "Image mode status."
    command: "CR_ IMAGE"

  - id: ext_imggmd_read
    type: enum
    values: ["STD", "REL", "CNM"]
    description: "Image gamma status."
    command: "CR_ IMGGMD"

  - id: ext_apctrl_read
    type: enum
    values: ["L1", "L2", "OFF"]
    description: "Digital keystone status."
    command: "CR_ APCTRL"

  - id: ext_fsync_read
    type: string
    description: "Fine sync value nnn."
    command: "CR_ FSYNC"

  - id: ext_tdots_read
    type: string
    description: "Total dots value nnnn."
    command: "CR_ TDOTS"

  - id: ext_clamp_read
    type: string
    description: "Clamp value nnnn."
    command: "CR_ CLAMP"

  - id: ext_hpos_read
    type: string
    description: "Horizontal position value nnnn."
    command: "CR_ H-POS"

  - id: ext_vpos_read
    type: string
    description: "Vertical position value nnnn."
    command: "CR_ V-POS"

  - id: ext_ddots_read
    type: string
    description: "Display dots value nnnn."
    command: "CR_ DDOTS"

  - id: ext_dline_read
    type: string
    description: "Display line value nnnn."
    command: "CR_ DLINE"

  - id: ext_orgmode_read
    type: string
    description: "Signal mode string."
    command: "CR_ ORGMODE"

  - id: ext_pcstore_read
    type: string
    description: "Mode storage status. FFFFF=all free, SSSSS=all stored."
    command: "CR_ PCSTORE"

  - id: ext_setpcadj_read
    type: string
    description: "Current PC signal mode."
    command: "CR_ SETPCADJ"

  - id: ext_sersys_read
    type: enum
    values: ["1080I60", "1080I50", "1035I", "720P", "575P", "480P", "575I", "480I", "NO SIGNAL"]
    description: "Selected video signal."
    command: "CR_ SERSYS"

  - id: ext_input_read
    type: enum
    values: ["1", "2", "3", "4"]
    description: "Current input selection."
    command: "CR_ INPUT"

  - id: ext_source_read
    type: enum
    values: ["DIGITAL", "ANALOG", "SCART", "HDCP", "VIDEO", "S-VIDEO", "YPBPR"]
    description: "Current source type."
    command: "CR_ SOURCE"

  - id: ext_srcinp1_read
    type: enum
    values: ["DIGITAL", "ANALOG", "SCART", "HDCP", "OUT"]
    description: "Source 1 status."
    command: "CR_ SRCINP1"

  - id: ext_srcinp2_read
    type: enum
    values: ["ANALOG", "VIDEO", "YPBPR"]
    description: "Source 2 status."
    command: "CR_ SRCINP2"

  - id: ext_srcinp3_read
    type: enum
    values: ["VIDEO", "S-VIDEO", "YPBPR"]
    description: "Source 3 status."
    command: "CR_ SRCINP3"

  - id: ext_srcinp4_read
    type: enum
    values: ["NOCARD", "NETWORK"]
    description: "Source 4 status."
    command: "CR_ SRCINP4"

  - id: ext_system_read
    type: enum
    values: ["AUTO", "NTSC", "NTSC443", "PAL", "SECAM", "PAL-M", "PAL-N", "1080I", "1035I", "720P", "575P", "480P", "575I", "480I"]
    description: "Current video system."
    command: "CR_ SYSTEM"

  - id: ext_flsceren_read
    type: enum
    values: ["ON", "OFF"]
    description: "Full screen status."
    command: "CR_ FLSCREN"

  - id: ext_screen_read
    type: enum
    values: ["NORMAL", "WIDE"]
    description: "Screen size status."
    command: "CR_ SCREEN"

  - id: ext_kystnmode_read
    type: enum
    values: ["STR", "RST"]
    description: "Keystone store mode."
    command: "CR_ KYSTNMODE"

  - id: ext_anamorphic_read
    type: enum
    values: ["ON", "OFF"]
    description: "Anamorphic status."
    command: "CR_ ANAMORPHIC"

  - id: ext_vscale_read
    type: string
    description: "Vertical scale value nnn."
    command: "CR_ VSCALE"

  - id: ext_vpos_screen_read
    type: string
    description: "Vertical position value nnn."
    command: "CR_ VPOS"

  - id: ext_hscale_read
    type: string
    description: "Horizontal scale value nnn."
    command: "CR_ HSCALE"

  - id: ext_hpos_screen_read
    type: string
    description: "Horizontal position value nnn."
    command: "CR_ HPOS"

  - id: ext_lamprepl_read
    type: enum
    values: ["1Y", "1N"]
    description: "Lamp replacement needed. 1Y=over time, 1N=not yet."
    command: "CR_ LAMPREPL"

  - id: ext_lampmode_read
    type: enum
    values: ["NORMAL", "ECO", "AUTO"]
    description: "Lamp mode."
    command: "CR_ LAMPMODE"

  - id: ext_projh_read
    type: string
    description: "Projector hours nnnnnnn."
    command: "CR_ PROJH"

  - id: ext_volume_read
    type: string
    description: "Volume value nnn."
    command: "CR_ VOLUME"

  - id: ext_mute_read
    type: enum
    values: ["ON", "OFF"]
    description: "Mute status."
    command: "CR_ MUTE"

  - id: ext_bltinsp_read
    type: enum
    values: ["ON", "OFF"]
    description: "Built-in speaker status."
    command: "CR_ BLTINSP"

  - id: ext_bback_read
    type: enum
    values: ["ON", "OFF"]
    description: "Blue background status."
    command: "CR_ BBACK"

  - id: ext_disp_read
    type: enum
    values: ["ON", "OFF"]
    description: "Display status."
    command: "CR_ DISP"

  - id: ext_logo_read
    type: enum
    values: ["ON", "OFF"]
    description: "Logo status."
    command: "CR_ LOGO"

  - id: ext_rcode_read
    type: string
    description: "Remote control code 001-008."
    command: "CR_ RCODE"

  - id: ext_lang_read
    type: enum
    values: ["ENG", "DEU", "FRA", "ESP", "ITA", "POR", "NED", "SVE", "JPN", "CHI", "KOR", "RUS"]
    description: "Selected language."
    command: "CR_ LANG"

  - id: ext_on_sta_read
    type: enum
    values: ["ON", "OFF"]
    description: "Power on start status."
    command: "CR_ ON-STA"

  - id: ext_p_mane_read
    type: enum
    values: ["OFF", "READY", "SHUTDOWN"]
    description: "Power management setting."
    command: "CR_ P-MANE"

  - id: ext_p_manetime_read
    type: string
    description: "Power management time nnn."
    command: "CR_ P-MANETIME"

  - id: ext_fanspeed_read
    type: enum
    values: ["MAX", "NOR"]
    description: "Fan speed status."
    command: "CR_ FANSPEED"

  - id: ext_keydis_read
    type: enum
    values: ["N/A", "RC", "KEY"]
    description: "RC/KEY lock status. N/A=both available, RC=RC locked, KEY=KEY locked."
    command: "CR_ KEYDIS"

  - id: ext_signal_read
    type: enum
    values: ["ON", "OFF"]
    description: "Signal presence. ON=signal present."
    command: "CR_ SIGNAL"

  - id: ext_vmute_read
    type: enum
    values: ["ON", "OFF"]
    description: "Video mute status."
    command: "CR_ VMUTE"

  - id: ext_freeze_read
    type: enum
    values: ["ON", "OFF"]
    description: "Freeze status."
    command: "CR_ FREEZE"

  - id: ext_ptimer_read
    type: enum
    values: ["ON", "STOP", "OFF"]
    description: "Presentation timer. ON=active, STOP=paused, OFF=inactive."
    command: "CR_ PTIMER"

  - id: ext_tempwarn_read
    type: string
    description: "Temperature warning. Format: n_n_n (S=safe, W=warning, N=no sensor)."
    command: "CR_ TEMPWARN"

  - id: ext_tempfail_read
    type: string
    description: "Temperature failure. Format: _##.#n (F=failed, S=safe)."
    command: "CR_ TEMPFAIL"
```

## Variables
```yaml
variables: []
```

## Events
```yaml
events: []
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power off requires 3000ms cool-down before re-issuing commands"
  - "Power on requires 5000ms delay between subsequent commands"
  - "30 second power-up countdown (status 40) - commands may not execute during this period"
  - "90 second cool-down mode (status 20) after shutdown"
# UNRESOLVED: source does not specify whether power-off confirmation or safety interlock sequences are required beyond timing delays
```

## Notes
- All commands and responses are hexadecimal, case-sensitive (uppercase). Terminate every command with `CR` (0x0D).
- No connect/disconnect command — RS-232, keypad, and IR remote function simultaneously.
- Recommended delays: 10ms between characters, 100ms between commands. Some commands require 300ms, 3000ms, or 5000ms (noted per command).
- Basic control command format: `C xx CR` where `xx` is hex command code.
- Extended control command format: `C F_ xx_## CR` where `_` is a space, `xx` is code, `##` is parameter.
- Basic status request format: `CR x CR` where `x` is status item code.
- Extended status request format: `CR_ xx CR` where `_` is a space.
- Source doc covers LX37/40/45/50/55 as a family — no LX-55-specific exclusions noted.
- Null modem RS-232 cable required. Terminal: 8-Pin Mini DIN. Cable >50ft should be low-capacitance shielded.
- Error codes: `?` = unrecognizable data, `000` = normal, `101` = function unavailable in current mode, `102` = value out of range, `103` = command mismatch for hardware config.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no network/TCP control protocol documented; Input 4 (Network Viewer) mentioned but no network command syntax provided -->
<!-- UNRESOLVED: source doc title references LX37/40/45/50/55 but filename suggested LX500 — family applicability confirmed by Table 3 command list -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - applicationmarket.crestron.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/christie-lx37-lx55-lw25-rs232-communication-protocols.pdf
  - https://applicationmarket.crestron.com/content/Help/Christie/christie_digital_lx-55_v1_0_help.pdf
retrieved_at: 2026-04-29T17:31:28.689Z
last_checked_at: 2026-05-14T18:17:14.955Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.955Z
matched_actions: 122
action_count: 122
confidence: medium
summary: "All 190 spec actions (basic, extended control, basic status, extended status) are literally present in Tables 3/3a/4/4a; transport parameters match verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers LX37/40/45/50/55 as a family — LX-55-specific differences not called out"
- "no TCP/IP or network control documented in this source; Network Viewer (Input 4) mentioned but protocol unspecified"
- "source does not specify whether power-off confirmation or safety interlock sequences are required beyond timing delays"
- "firmware version compatibility not stated in source"
- "no network/TCP control protocol documented; Input 4 (Network Viewer) mentioned but no network command syntax provided"
- "source doc title references LX37/40/45/50/55 but filename suggested LX500 — family applicability confirmed by Table 3 command list"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
