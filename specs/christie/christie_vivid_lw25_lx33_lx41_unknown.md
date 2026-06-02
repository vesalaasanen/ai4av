---
spec_id: admin/christie-vivid-lw25-lx33-lx41
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie Vivid LW25 LX33 LX41 Control Spec"
manufacturer: Christie
model_family: LX37
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - LX37
    - LX40
    - LX45
    - LX50
    - LX55
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - qed-productions.com
  - purelandsupply.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/christie-lx37-lx55-lw25-rs232-communication-protocols.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000507-01-christie-lx41_lw41-user-manual-technical-guide-multi-language.pdf
  - https://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - "https://www.purelandsupply.com/Images/OwnersManuals/Christie/CHRISTIE%20LW25.pdf"
retrieved_at: 2026-05-14T15:07:04.005Z
last_checked_at: 2026-06-02T22:05:19.009Z
generated_at: 2026-06-02T22:05:19.009Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers LX37/40/45/50/55 but entity is named Vivid LW25/LX33/LX41 — model overlap not confirmed"
  - "firmware version compatibility not stated"
  - "source does not document unsolicited notifications from projector"
  - "source mentions abnormal temperature, lamp failure, and 90-second cooldown"
  - "source document covers LX37/40/45/50/55 models but entity assigned to Vivid LW25/LX33/LX41 — model-to-protocol mapping not confirmed"
  - "exact hex encoding format for extended commands partially ambiguous (underscore placement in C F_ xx_##)"
  - "whether unsolicited event notifications exist"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:19.009Z
  matched_actions: 120
  action_count: 120
  confidence: medium
  summary: "All 120 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie Vivid LW25 LX33 LX41 Control Spec

## Summary
RS-232 serial control spec for Christie LX-series projectors (LX37/40/45/50/55). Covers power, input selection, image adjustment, audio, screen sizing, lamp management, and status queries via hexadecimal command protocol. No connect/disconnect handshake; simultaneous keypad, IR, and RS-232 control supported.

<!-- UNRESOLVED: source document covers LX37/40/45/50/55 but entity is named Vivid LW25/LX33/LX41 — model overlap not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

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
  connector: "8-Pin Mini DIN"
  cable_type: "null modem"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands
  - routable     # input/source selection commands
  - queryable    # status request commands return state
  - levelable    # volume, brightness, contrast, color, tint, sharpness, gamma controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "C 00 (CR)"
    hex: "43h 30h 30h 0Dh"
    notes: "5000ms between commands"

  - id: power_off_quick
    label: Quick Power Off
    kind: action
    command: "C 01 (CR)"
    notes: "3000ms between commands"

  - id: power_off
    label: Power Off
    kind: action
    command: "C 02 (CR)"
    notes: "1st issue 100ms delay; 2nd issue 3000ms delay"

  - id: input_1
    label: Select Input 1
    kind: action
    command: "C 05 (CR)"
    notes: "5000ms between commands"

  - id: input_2
    label: Select Input 2
    kind: action
    command: "C 06 (CR)"
    notes: "5000ms between commands"

  - id: input_3
    label: Select Input 3
    kind: action
    command: "C 07 (CR)"
    notes: "5000ms between commands"

  - id: volume_up
    label: Volume Up
    kind: action
    command: "C 09 (CR)"
    notes: "Increments by one"

  - id: volume_down
    label: Volume Down
    kind: action
    command: "C 0A (CR)"
    notes: "Decrements by one"

  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "C 0B (CR)"

  - id: audio_mute_off
    label: Audio Mute Off
    kind: action
    command: "C 0C (CR)"

  - id: video_mute_on
    label: Video Mute On (No Show)
    kind: action
    command: "C 0D (CR)"

  - id: video_mute_off
    label: Video Mute Off (No Show)
    kind: action
    command: "C 0E (CR)"

  - id: av_normal_size
    label: AV Normal Size (4:3)
    kind: action
    command: "C 0F (CR)"
    notes: "300ms between commands"

  - id: av_wide_size
    label: AV Wide Size (16:9)
    kind: action
    command: "C 10 (CR)"
    notes: "300ms between commands"

  - id: menu_on
    label: Menu On
    kind: action
    command: "C 1C (CR)"

  - id: menu_off
    label: Menu Off
    kind: action
    command: "C 1D (CR)"

  - id: clear_screen
    label: Clear Screen
    kind: action
    command: "C 1E (CR)"
    notes: "Clears OSD regardless of location"

  - id: brightness_up
    label: Brightness Up
    kind: action
    command: "C 20 (CR)"

  - id: brightness_down
    label: Brightness Down
    kind: action
    command: "C 21 (CR)"

  - id: input_2_video
    label: Input 2 Video
    kind: action
    command: "C 23 (CR)"
    notes: "5000ms between commands"

  - id: input_2_yprpb
    label: Input 2 Y,Pb/Cb,Pr/Cr
    kind: action
    command: "C 24 (CR)"
    notes: "5000ms between commands"

  - id: input_2_rgb
    label: Input 2 RGB
    kind: action
    command: "C 25 (CR)"
    notes: "5000ms between commands"

  - id: image_toggle
    label: Image Toggle
    kind: action
    command: "C 27 (CR)"

  - id: on_start_enable
    label: On Start Enable
    kind: action
    command: "C 28 (CR)"

  - id: on_start_disable
    label: On Start Disable
    kind: action
    command: "C 29 (CR)"

  - id: power_management_enable
    label: Power Management Enable
    kind: action
    command: "C 2A (CR)"

  - id: power_management_disable
    label: Power Management Disable
    kind: action
    command: "C 2B (CR)"

  - id: digital_zoom_up
    label: Digital Zoom Up
    kind: action
    command: "C 30 (CR)"
    notes: "First issue activates; subsequent issues increment"

  - id: digital_zoom_down
    label: Digital Zoom Down
    kind: action
    command: "C 31 (CR)"
    notes: "First issue activates; subsequent issues decrement"

  - id: input_3_video
    label: Input 3 Video
    kind: action
    command: "C 33 (CR)"
    notes: "5000ms between commands"

  - id: input_3_svideo
    label: Input 3 S-Video
    kind: action
    command: "C 34 (CR)"
    notes: "5000ms between commands"

  - id: input_3_yprpb
    label: Input 3 Y,Pb/Cb,Pr/Cr
    kind: action
    command: "C 35 (CR)"
    notes: "5000ms between commands"

  - id: arrow_right
    label: Arrow Right
    kind: action
    command: "C 3A (CR)"

  - id: arrow_left
    label: Arrow Left
    kind: action
    command: "C 3B (CR)"

  - id: arrow_up
    label: Arrow Up
    kind: action
    command: "C 3C (CR)"

  - id: arrow_down
    label: Arrow Down
    kind: action
    command: "C 3D (CR)"

  - id: right_mouse_click
    label: Right Mouse Click
    kind: action
    command: "C 3E (CR)"

  - id: select_key
    label: Select Key
    kind: action
    command: "C 3F (CR)"

  - id: freeze_on
    label: Freeze On
    kind: action
    command: "C 43 (CR)"

  - id: freeze_off
    label: Freeze Off
    kind: action
    command: "C 44 (CR)"

  - id: zoom_lens_down
    label: Zoom Lens Down
    kind: action
    command: "C 46 (CR)"
    notes: "Slight adjustment per issue; many issues needed for visible change"

  - id: zoom_lens_up
    label: Zoom Lens Up
    kind: action
    command: "C 47 (CR)"
    notes: "Slight adjustment per issue; many issues needed for visible change"

  - id: focus_down
    label: Focus Down
    kind: action
    command: "C 4A (CR)"
    notes: "Slight adjustment per issue"

  - id: focus_up
    label: Focus Up
    kind: action
    command: "C 4B (CR)"
    notes: "Slight adjustment per issue"

  - id: color_management_on
    label: Color Management On
    kind: action
    command: "C 4E (CR)"

  - id: input_1_rgb
    label: Input 1 RGB (Analog)
    kind: action
    command: "C 50 (CR)"
    notes: "5000ms between commands"

  - id: input_1_scart
    label: Input 1 SCART
    kind: action
    command: "C 51 (CR)"
    notes: "5000ms between commands"

  - id: input_1_dvi_pc
    label: Input 1 DVI (PC Digital)
    kind: action
    command: "C 52 (CR)"
    notes: "5000ms between commands"

  - id: input_1_dvi_hdcp
    label: Input 1 DVI (AV HDCP)
    kind: action
    command: "C 53 (CR)"
    notes: "5000ms between commands"

  - id: input_1_monitor_out
    label: Input 1 Monitor Out
    kind: action
    command: "C 54 (CR)"
    notes: "5000ms between commands"

  - id: lens_shift_up
    label: Lens Shift Up
    kind: action
    command: "C 5D (CR)"
    notes: "Slight adjustment per issue"

  - id: lens_shift_down
    label: Lens Shift Down
    kind: action
    command: "C 5E (CR)"
    notes: "Slight adjustment per issue"

  - id: auto_pc_adjust
    label: Auto PC Adjust
    kind: action
    command: "C 89 (CR)"

  - id: presentation_timer
    label: Presentation Timer
    kind: action
    command: "C 8A (CR)"
    notes: "1st=start, 2nd=stop, 3rd=clear/reset"

  - id: keystone_up
    label: Keystone Up
    kind: action
    command: "C 8E (CR)"
    notes: "Subsequent issues within 3 seconds increment"

  - id: keystone_down
    label: Keystone Down
    kind: action
    command: "C 8F (CR)"
    notes: "Subsequent issues within 3 seconds increment"

  - id: keystone_right
    label: Keystone Right
    kind: action
    command: "C 90 (CR)"
    notes: "Subsequent issues within 3 seconds increment"

  - id: keystone_left
    label: Keystone Left
    kind: action
    command: "C 91 (CR)"
    notes: "Subsequent issues within 3 seconds increment"

  # Extended Control Commands (format: C F_ xx_## (CR))

  - id: ext_brightness
    label: Set Brightness
    kind: action
    command: "CF_BRIGHT_### (CR)"
    params:
      - name: value
        type: integer
        description: "Brightness value 000-063, or UP/DN"

  - id: ext_contrast
    label: Set Contrast
    kind: action
    command: "CF_CONT_### (CR)"
    params:
      - name: value
        type: integer
        description: "Contrast value 000-063, or UP/DN"

  - id: ext_color
    label: Set Color
    kind: action
    command: "CF_COLOR_### (CR)"
    params:
      - name: value
        type: integer
        description: "Color value 000-063, or UP/DN"

  - id: ext_tint
    label: Set Tint
    kind: action
    command: "CF_TINT_### (CR)"
    params:
      - name: value
        type: integer
        description: "Tint value 000-063, or UP/DN"

  - id: ext_sharpness
    label: Set Sharpness
    kind: action
    command: "CF_SHARP_### (CR)"
    params:
      - name: value
        type: integer
        description: "Sharpness value 000-031, or UP/DN"

  - id: ext_gamma
    label: Set Gamma
    kind: action
    command: "CF_GAMMA_### (CR)"
    params:
      - name: value
        type: integer
        description: "Gamma value 000-015, or UP/DN"

  - id: ext_wbal_r
    label: Set White Balance Red
    kind: action
    command: "CF_WBAL-R_### (CR)"
    params:
      - name: value
        type: integer
        description: "White balance red 000-063, or UP/DN"

  - id: ext_wbal_g
    label: Set White Balance Green
    kind: action
    command: "CF_WBAL-G_### (CR)"
    params:
      - name: value
        type: integer
        description: "White balance green 000-063, or UP/DN"

  - id: ext_wbal_b
    label: Set White Balance Blue
    kind: action
    command: "CF_WBAL-B_### (CR)"
    params:
      - name: value
        type: integer
        description: "White balance blue 000-063, or UP/DN"

  - id: ext_coltemp
    label: Set Color Temperature
    kind: action
    command: "CF_COLTEMP_### (CR)"
    params:
      - name: value
        type: integer
        description: "Color temperature 000-003"

  - id: ext_noise_reduction
    label: Set Noise Reduction
    kind: action
    command: "CF_NZRED_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_progressive
    label: Set Progressive Video
    kind: action
    command: "CF_PROGV_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "L1, L2, or OFF"

  - id: ext_image
    label: Set Image Mode
    kind: action
    command: "CF_IMAGE_XXXX (CR)"
    params:
      - name: mode
        type: string
        description: "Computer: STAND/REAL/CUSTOM1-4. Video: STAND/CINEMA/CUSTOM1-4"

  - id: ext_image_adj
    label: Image Adjust Reset/Save
    kind: action
    command: "CF_IMAGEADJ_XXXX (CR)"
    params:
      - name: action
        type: string
        description: "RST (reset), STR1-STR4 (save to slot 1-4)"

  - id: ext_apctrl
    label: Set Digital Keystone Level
    kind: action
    command: "CF_APCTRL_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "L1, L2, or OFF"

  - id: ext_colmnsave
    label: Store Color Management
    kind: action
    command: "CF_COLMNSAV_### (CR)"
    params:
      - name: slot
        type: integer
        description: "Slot 000-009"

  - id: ext_colmnload
    label: Recall Color Management
    kind: action
    command: "CF_COLMNLD_### (CR)"
    params:
      - name: slot
        type: integer
        description: "Slot 000-009"

  - id: ext_input_select
    label: Select Input (Extended)
    kind: action
    command: "CF_INPUT_# (CR)"
    params:
      - name: input
        type: integer
        description: "1=Input1, 2=Input2, 3=Input3, 4=Network Viewer"
    notes: "5000ms between commands"

  - id: ext_source
    label: Select Source (Extended)
    kind: action
    command: "CF_SOURCE_XXXXXXX (CR)"
    params:
      - name: source
        type: string
        description: "Varies by input. Input1: DIGITAL/ANALOG/SCART/HDCP/OUT. Input2: VIDEO/YPRPB/ANALOG. Input3: VIDEO/S-VIDEO/YPRPB"

  - id: ext_input1
    label: Select Input 1 and Source
    kind: action
    command: "CF_INPUT1_XXXXXXX (CR)"
    params:
      - name: source
        type: string
        description: "DIGITAL, ANALOG, SCART, HDCP, OUT"
    notes: "5000ms between commands"

  - id: ext_input2
    label: Select Input 2 and Source
    kind: action
    command: "CF_INPUT2_XXXXXXX (CR)"
    params:
      - name: source
        type: string
        description: "VIDEO, YPRPB, ANALOG"
    notes: "5000ms between commands"

  - id: ext_input3
    label: Select Input 3 and Source
    kind: action
    command: "CF_INPUT3_XXXXXXX (CR)"
    params:
      - name: source
        type: string
        description: "VIDEO, S-VIDEO, YPRPB"
    notes: "5000ms between commands"

  - id: ext_input4
    label: Select Network Viewer
    kind: action
    command: "CF_INPUT4_NETWORK (CR)"
    notes: "5000ms between commands"

  - id: ext_system
    label: Set Video System
    kind: action
    command: "CF_SYSTEM_XXXXXXX (CR)"
    params:
      - name: system
        type: string
        description: "PC: MODE1-5/AUTO. SD: NTSC/NTSC443/PAL/SECAM/PAL-M/PAL-N. HD: 1080I/1035I/720P/575P/480P/575I/480I"

  - id: ext_screen
    label: Set Screen Size
    kind: action
    command: "CF_SCREEN_XXXXXXXX (CR)"
    params:
      - name: mode
        type: string
        description: "Computer: WIDE/TRUE/DZOOM UP/DZOOM DN. Video: NORMAL/WIDE"

  - id: ext_fullscreen
    label: Set Full Screen
    kind: action
    command: "CF_FLSCREN_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_true_size
    label: Set True Screen
    kind: action
    command: "CF_TRUE_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_dzcent
    label: Cancel Digital Zoom
    kind: action
    command: "CF_DZCENT_CENT (CR)"

  - id: ext_keystone
    label: Set Keystone (Extended)
    kind: action
    command: "CF_KEYSTONE_XXXX (CR)"
    params:
      - name: direction
        type: string
        description: "UP/FUP/DN/FDN/LEFT/FLEFT/RIGHT/FRGT/RST"

  - id: ext_keystone_mode
    label: Set Keystone Store Mode
    kind: action
    command: "CF_KYSTNMODE_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "STR (store) or RST (reset)"

  - id: ext_anamorphic
    label: Set Anamorphic
    kind: action
    command: "CF_ANAMORPHIC_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_vscale
    label: Set Vertical Scale
    kind: action
    command: "CF_VSCALE_### (CR)"
    params:
      - name: value
        type: integer
        description: "-32 to 032"

  - id: ext_vpos
    label: Set Vertical Position
    kind: action
    command: "CF_VPOS_### (CR)"
    params:
      - name: value
        type: integer
        description: "-64 to 064"

  - id: ext_hscale
    label: Set Horizontal Scale
    kind: action
    command: "CF_HSCALE_### (CR)"
    params:
      - name: value
        type: integer
        description: "-32 to 032"

  - id: ext_hpos
    label: Set Horizontal Position
    kind: action
    command: "CF_HPOS_### (CR)"
    params:
      - name: value
        type: integer
        description: "-64 to 064"

  - id: ext_lamp_reset
    label: Reset Lamp Timer
    kind: action
    command: "CF_LAMPH_RST (CR)"

  - id: ext_lamp_mode
    label: Set Lamp Mode
    kind: action
    command: "CF_LAMPMODE_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "FUL (full) or ECO (whisper)"

  - id: ext_volume
    label: Set Volume
    kind: action
    command: "CF_VOLUME_### (CR)"
    params:
      - name: value
        type: integer
        description: "000-063, or UP/DN"

  - id: ext_mute
    label: Set Audio Mute
    kind: action
    command: "CF_MUTE_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_builtin_speaker
    label: Set Built-in Speaker
    kind: action
    command: "CF_BLTINSP_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_blue_background
    label: Set Blue Background
    kind: action
    command: "CF_BBACK_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_display
    label: Set Display
    kind: action
    command: "CF_DISP_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_logo
    label: Set Logo
    kind: action
    command: "CF_LOGO_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_ceiling
    label: Set Ceiling Mode
    kind: action
    command: "CF_CEIL_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_rear
    label: Set Rear Projection
    kind: action
    command: "CF_REAR_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_remote_code
    label: Set Remote Control Code
    kind: action
    command: "CF_RCODE_### (CR)"
    params:
      - name: code
        type: integer
        description: "001-008"

  - id: ext_language
    label: Set Language
    kind: action
    command: "CF_LANG_XXX (CR)"
    params:
      - name: language
        type: string
        description: "ENG/DEU/FRA/ESP/ITA/POR/NED/SVE/JPN/CHI/KOR/RUS"

  - id: ext_on_start
    label: Set On Start
    kind: action
    command: "CF_ON-STA_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "ON or OFF"

  - id: ext_power_management
    label: Set Power Management
    kind: action
    command: "CF_P-MANE_XXXXXXX (CR)"
    params:
      - name: mode
        type: string
        description: "OFF, READY, or SHUTDOWN"

  - id: ext_power_management_time
    label: Set Power Management Time
    kind: action
    command: "CF_P-MANETIME_### (CR)"
    params:
      - name: minutes
        type: integer
        description: "01-30 minutes, or UP/DN"

  - id: ext_fan_speed
    label: Set Fan Speed
    kind: action
    command: "CF_FANSPEED_XXX (CR)"
    params:
      - name: mode
        type: string
        description: "MAX or NOR"

  - id: ext_factory_default
    label: Factory Default Reset
    kind: action
    command: "CF_FDEFAULT_RST (CR)"

  # PC Adjust series (require CF_SETPCADJ to execute)

  - id: ext_fsync
    label: Set Fine Sync
    kind: action
    command: "CF_FSYNC_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0000-0031, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_tdots
    label: Set Total Dots
    kind: action
    command: "CF_TDOTS_#### (CR)"
    params:
      - name: value
        type: integer
        description: "nnnn-9999, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_clamp
    label: Set Clamp Value
    kind: action
    command: "CF_CLAMP_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0000-0127, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_hpos_pc
    label: Set Horizontal Position (PC)
    kind: action
    command: "CF_H-POS_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0000-nnnn, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_vpos_pc
    label: Set Vertical Position (PC)
    kind: action
    command: "CF_V-POS_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0000-nnnn, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_ddots
    label: Set Display Dots
    kind: action
    command: "CF_DDOTS_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0100-nnnn, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_dline
    label: Set Display Line
    kind: action
    command: "CF_DLINE_#### (CR)"
    params:
      - name: value
        type: integer
        description: "0100-nnnn, or UP/DN"
    notes: "Execute with CF_SETPCADJ afterward"

  - id: ext_setpcadj
    label: Execute PC Adjust
    kind: action
    command: "CF_SETPCADJ_EXT6 (CR)"
    notes: "Triggers pending PC adjust changes. EXT6-EXT60 range"

  - id: ext_orgmode
    label: Select Original Mode
    kind: action
    command: "CF_ORGMODE_XXXXXXX (CR)"
    params:
      - name: mode
        type: string
        description: "e.g. XGA1, HDTV1080"
    notes: "After CF_SETPCADJ"

  - id: ext_pcstore
    label: Store PC Adjust
    kind: action
    command: "CF_PCSTORE_XXXXX (CR)"
    params:
      - name: slot
        type: string
        description: "MODE1-MODE5"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_response
    type: enum
    values: ["06 (CR) - accepted", "? (CR) - not recognized"]
    description: "Response to any control command"

  - id: status_read
    type: enum
    command: "CR 0 (CR)"
    values: ["00=ON", "04=Power Management off", "08=Abnormal Temperature", "10=Power failure", "20=Cooling down", "21=Lamp failure cooling", "24=Power save cooling", "28=Temperature warning cooling", "40=Powering up (30s countdown)", "80=OFF Standby", "81=Standby after lamp failure", "88=Temperature warning recovered"]

  - id: input_mode_read
    type: integer
    command: "CR 1 (CR)"
    values: ["1=Input1", "2=Input2", "3=Input3", "4=Input4 Network Viewer"]

  - id: lamp_time_read
    type: integer
    command: "CR 3 (CR)"
    description: "Four-digit total lamp hours"

  - id: setting_read
    type: enum
    command: "CR 4 (CR)"
    values: ["00=Front/Ceiling", "01=Rear/Floor", "10=Rear/Ceiling", "11=Front/Floor"]

  - id: model_read
    type: string
    command: "CR 5 (CR)"
    description: "OEM manufacturer model number"

  - id: temp_read
    type: string
    command: "CR 6 (CR)"
    description: "Panel and lamp temperatures in Celsius (format: ss.s_ss.s)"

  # Extended status reads (format: CR_ xx (CR))

  - id: ext_brightness_read
    type: integer
    command: "CR_ BRIGHT (CR)"
    description: "Current brightness value nnn"

  - id: ext_contrast_read
    type: integer
    command: "CR_ CONT (CR)"
    description: "Current contrast value nnn"

  - id: ext_color_read
    type: integer
    command: "CR_ COLOR (CR)"
    description: "Current color value nnn"

  - id: ext_tint_read
    type: integer
    command: "CR_ TINT (CR)"
    description: "Current tint value nnn"

  - id: ext_sharp_read
    type: integer
    command: "CR_ SHARP (CR)"
    description: "Current sharpness value nnn"

  - id: ext_gamma_read
    type: integer
    command: "CR_ GAMMA (CR)"
    description: "Current gamma value nnn"

  - id: ext_wbal_r_read
    type: integer
    command: "CR_ WBAL-R (CR)"
    description: "White balance red value nnn"

  - id: ext_wbal_g_read
    type: integer
    command: "CR_ WBAL-G (CR)"
    description: "White balance green value nnn"

  - id: ext_wbal_b_read
    type: integer
    command: "CR_ WBAL-B (CR)"
    description: "White balance blue value nnn"

  - id: ext_coltemp_read
    type: integer
    command: "CR_ COLTEMP (CR)"
    description: "Color temperature value nnn"

  - id: ext_nzred_read
    type: enum
    command: "CR_ NZRED (CR)"
    values: ["ON", "OFF"]

  - id: ext_progv_read
    type: enum
    command: "CR_ PROGV (CR)"
    values: ["L1", "L2", "OFF"]

  - id: ext_image_read
    type: enum
    command: "CR_ IMAGE (CR)"
    values: ["STAND", "REAL", "CINEMA", "CUSTOM1", "CUSTOM2", "CUSTOM3", "CUSTOM4"]

  - id: ext_imggmd_read
    type: enum
    command: "CR_ IMGGMD (CR)"
    values: ["STD", "REL", "CNM"]

  - id: ext_apctrl_read
    type: enum
    command: "CR_ APCTRL (CR)"
    values: ["L1", "L2", "OFF"]

  - id: ext_fsync_read
    type: integer
    command: "CR_ FSYNC (CR)"

  - id: ext_tdots_read
    type: integer
    command: "CR_ TDOTS (CR)"

  - id: ext_clamp_read
    type: integer
    command: "CR_ CLAMP (CR)"

  - id: ext_hpos_pc_read
    type: integer
    command: "CR_ H-POS (CR)"

  - id: ext_vpos_pc_read
    type: integer
    command: "CR_ V-POS (CR)"

  - id: ext_ddots_read
    type: integer
    command: "CR_ DDOTS (CR)"

  - id: ext_dline_read
    type: integer
    command: "CR_ DLINE (CR)"

  - id: ext_orgmode_read
    type: string
    command: "CR_ ORGMODE (CR)"
    description: "e.g. XGA1, HDTV1080"

  - id: ext_pcstore_read
    type: string
    command: "CR_ PCSTORE (CR)"
    description: "FFFFF=all free, SFFFF=Mode1 stored, SSSSS=all stored"

  - id: ext_setpcadj_read
    type: string
    command: "CR_ SETPCADJ (CR)"
    description: "Current system and mode info"

  - id: ext_sersys_read
    type: enum
    command: "CR_ SERSYS (CR)"
    values: ["1080I60", "1080I50", "1035I", "720P", "575P", "480P", "575I", "480I", "NO SIGNAL"]

  - id: ext_input_read
    type: integer
    command: "CR_ INPUT (CR)"
    values: ["1", "2", "3", "4"]

  - id: ext_source_read
    type: enum
    command: "CR_ SOURCE (CR)"
    values: ["DIGITAL", "ANALOG", "SCART", "HDCP", "VIDEO", "S-VIDEO", "YPBPR"]

  - id: ext_srcinp1_read
    type: enum
    command: "CR_ SRCINP1 (CR)"
    values: ["DIGITAL", "ANALOG", "SCART", "HDCP", "OUT"]

  - id: ext_srcinp2_read
    type: enum
    command: "CR_ SRCINP2 (CR)"
    values: ["ANALOG", "VIDEO", "YPBPR"]

  - id: ext_srcinp3_read
    type: enum
    command: "CR_ SRCINP3 (CR)"
    values: ["VIDEO", "S-VIDEO", "YPBPR"]

  - id: ext_srcinp4_read
    type: enum
    command: "CR_ SRCINP4 (CR)"
    values: ["NOCARD", "NETWORK"]

  - id: ext_system_read
    type: enum
    command: "CR_ SYSTEM (CR)"
    values: ["AUTO", "NTSC", "NTSC443", "PAL", "SECAM", "PAL-M", "PAL-N", "1080I", "1035I", "720P", "575P", "480P", "575I", "480I"]

  - id: ext_flscren_read
    type: enum
    command: "CR_ FLSCREN (CR)"
    values: ["ON", "OFF"]

  - id: ext_screen_read
    type: enum
    command: "CR_ SCREEN (CR)"
    values: ["NORMAL", "WIDE"]

  - id: ext_kystnmode_read
    type: enum
    command: "CR_ KYSTNMODE (CR)"
    values: ["STR", "RST"]

  - id: ext_anamorphic_read
    type: enum
    command: "CR_ ANAMORPHIC (CR)"
    values: ["ON", "OFF"]

  - id: ext_vscale_read
    type: integer
    command: "CR_ VSCALE (CR)"

  - id: ext_vpos_read
    type: integer
    command: "CR_ VPOS (CR)"

  - id: ext_hscale_read
    type: integer
    command: "CR_ HSCALE (CR)"

  - id: ext_hpos_read
    type: integer
    command: "CR_ HPOS (CR)"

  - id: ext_lamprepl_read
    type: enum
    command: "CR_ LAMPREPL (CR)"
    values: ["1Y - over replacement time", "1N - below replacement time"]

  - id: ext_lampmode_read
    type: enum
    command: "CR_ LAMPMODE (CR)"
    values: ["NORMAL", "ECO", "AUTO"]

  - id: ext_projh_read
    type: integer
    command: "CR_ PROJH (CR)"
    description: "Projector total hours nnnnnnn"

  - id: ext_volume_read
    type: integer
    command: "CR_ VOLUME (CR)"
    description: "Current volume nnn"

  - id: ext_mute_read
    type: enum
    command: "CR_ MUTE (CR)"
    values: ["ON", "OFF"]

  - id: ext_bltinsp_read
    type: enum
    command: "CR_ BLTINSP (CR)"
    values: ["ON", "OFF"]

  - id: ext_bback_read
    type: enum
    command: "CR_ BBACK (CR)"
    values: ["ON", "OFF"]

  - id: ext_disp_read
    type: enum
    command: "CR_ DISP (CR)"
    values: ["ON", "OFF"]

  - id: ext_logo_read
    type: enum
    command: "CR_ LOGO (CR)"
    values: ["ON", "OFF"]

  - id: ext_rcode_read
    type: integer
    command: "CR_ RCODE (CR)"
    values: ["001-008"]

  - id: ext_lang_read
    type: enum
    command: "CR_ LANG (CR)"
    values: ["ENG", "DEU", "FRA", "ESP", "ITA", "POR", "NED", "SVE", "JPN", "CHI", "KOR", "RUS"]

  - id: ext_on_sta_read
    type: enum
    command: "CR_ ON-STA (CR)"
    values: ["ON", "OFF"]

  - id: ext_p_mane_read
    type: enum
    command: "CR_ P-MANE (CR)"
    values: ["OFF", "READY", "SHUTDOWN"]

  - id: ext_p_manetime_read
    type: integer
    command: "CR_ P-MANETIME (CR)"
    description: "Minutes until power management activates"

  - id: ext_fanspeed_read
    type: enum
    command: "CR_ FANSPEED (CR)"
    values: ["MAX", "NOR"]

  - id: ext_keydis_read
    type: enum
    command: "CR_ KEYDIS (CR)"
    values: ["N/A - both available", "RC - RC locked", "KEY - KEY locked"]

  - id: ext_signal_read
    type: enum
    command: "CR_ SIGNAL (CR)"
    values: ["ON", "OFF"]

  - id: ext_vmute_read
    type: enum
    command: "CR_ VMUTE (CR)"
    values: ["ON", "OFF"]

  - id: ext_freeze_read
    type: enum
    command: "CR_ FREEZE (CR)"
    values: ["ON", "OFF"]

  - id: ext_ptimer_read
    type: enum
    command: "CR_ PTIMER (CR)"
    values: ["ON - active", "STOP - paused", "OFF - inactive"]

  - id: ext_tempwarn_read
    type: string
    command: "CR_ TEMPWARN (CR)"
    description: "Format n_n_n. W=exceeded critical, S=safe, N=not related"

  - id: ext_tempfail_read
    type: string
    command: "CR_ TEMPFAIL (CR)"
    description: "Format ##.#X. F=exceeded critical, S=safe"
```

## Variables
```yaml
variables: []
# All settable parameters are represented as Actions (extended control commands).
```

## Events
```yaml
events: []
# UNRESOLVED: source does not document unsolicited notifications from projector
```

## Macros
```yaml
macros: []
# PC Adjust workflow requires sequential commands (set value then CF_SETPCADJ) but
# no explicit multi-step macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions abnormal temperature, lamp failure, and 90-second cooldown
# but no explicit safety interlock sequences documented. Power off (C 02) requires two
# issuances - unclear if this is a safety interlock or UI design.
```

## Notes
- All commands and replies are hexadecimal. Commands are case sensitive — always use uppercase.
- No connect/disconnect command. RS-232, keypad, and IR operate simultaneously.
- Recommended delays: 10ms between characters, 100ms between commands. Specific commands require 300ms, 3000ms, or 5000ms delays (see individual action notes).
- Cable must be null modem type. Cables longer than 50 feet should be low-capacitance, shielded, grounded.
- Unless Display is set to OFF in Setting Menu, most commands cause OSD to appear.
- Error codes: `?` = undecodable, `000` = normal, `101` = function unavailable in current mode, `102` = value out of range, `103` = command mismatch for hardware configuration.

<!-- UNRESOLVED: source document covers LX37/40/45/50/55 models but entity assigned to Vivid LW25/LX33/LX41 — model-to-protocol mapping not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact hex encoding format for extended commands partially ambiguous (underscore placement in C F_ xx_##) -->
<!-- UNRESOLVED: whether unsolicited event notifications exist -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - qed-productions.com
  - purelandsupply.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/christie-lx37-lx55-lw25-rs232-communication-protocols.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000507-01-christie-lx41_lw41-user-manual-technical-guide-multi-language.pdf
  - https://www.qed-productions.com/downloads/christie/serial-communications.pdf
  - "https://www.purelandsupply.com/Images/OwnersManuals/Christie/CHRISTIE%20LW25.pdf"
retrieved_at: 2026-05-14T15:07:04.005Z
last_checked_at: 2026-06-02T22:05:19.009Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:19.009Z
matched_actions: 120
action_count: 120
confidence: medium
summary: "All 120 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers LX37/40/45/50/55 but entity is named Vivid LW25/LX33/LX41 — model overlap not confirmed"
- "firmware version compatibility not stated"
- "source does not document unsolicited notifications from projector"
- "source mentions abnormal temperature, lamp failure, and 90-second cooldown"
- "source document covers LX37/40/45/50/55 models but entity assigned to Vivid LW25/LX33/LX41 — model-to-protocol mapping not confirmed"
- "exact hex encoding format for extended commands partially ambiguous (underscore placement in C F_ xx_##)"
- "whether unsolicited event notifications exist"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
