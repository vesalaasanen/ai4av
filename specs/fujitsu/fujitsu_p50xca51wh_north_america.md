---
spec_id: admin/fujitsu-p50xca51wh-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Fujitsu P50XCA51WH Control Spec"
manufacturer: Fujitsu
model_family: P50XCA51WH
aliases: []
compatible_with:
  manufacturers:
    - Fujitsu
  models:
    - P50XCA51WH
    - P50XHA10WS
    - P50XHA10AS
    - P50XHA10US
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - 2150.com
  - customremotecontrol.com
source_urls:
  - https://www.2150.com/files/rs232_commands_P50XHA10.pdf
  - http://www.customremotecontrol.com/infrared-receiver-rs232-device-tables/Fujitsu-P50XCA-Plasma-RS232-Codes.html
retrieved_at: 2026-04-30T13:42:36.975Z
last_checked_at: 2026-06-02T21:41:44.255Z
generated_at: 2026-06-02T21:41:44.255Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "P50XCA51WH-specific RS-232 protocol not confirmed; source covers P50XHA10 series only"
  - "no unsolicited notification mechanism described in source"
  - "no named macros in source"
  - "no explicit safety interlock procedures beyond key disable priority"
  - "P50XCA51WH-specific validation not performed — source covers P50XHA10 series"
  - "firmware version compatibility not stated in source"
  - "no IP/TCP control mentioned in source — serial only"
  - "port number not stated — RS-232 only, no IP port applicable"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:44.255Z
  matched_actions: 207
  action_count: 207
  confidence: medium
  summary: "All 207 actions verified against source. Amend added 8 new entries covering the prior verifier's exact extras list: video horizontal/vertical position+size set (%A1400-1403) and query (%A1480-1483), traced to source functions 28-31. Transport 4800 8N1 RTS/CTS ASCII confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Fujitsu P50XCA51WH Control Spec

## Summary
50-inch wide plasma display panel controlled via RS-232C serial protocol. Communication uses a handshaking scheme (starts with `@G`, terminates with `@Q`) with ASCII-encoded commands and status responses. The source documents the P50XHA10 series (same-era Fujitsu plasma); commands are likely compatible with P50XCA51WH based on structural similarity.

<!-- UNRESOLVED: P50XCA51WH-specific RS-232 protocol not confirmed; source covers P50XHA10 series only -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: rts_cts
  character_encoding: ASCII
  reception_timeout_ms: 8000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Add only traits supported by evidence from source:
# - powerable       (power on/off commands present)
# - routable        (input/output routing commands present)
# - queryable       (query commands returning state present)
# - levelable       (volume, gain, brightness control present)
powerable: true  # from power supply On/Off commands (function 01)
routable: true   # from video input selection commands (function 07)
queryable: true  # from condition reading commands throughout function list
levelable: true  # from contrast, brightness, color, volume adjustments (functions 10-14, 39)
```

## Actions
```yaml
# Protocol: ASCII command string sent over RS-232C
# Format: %A{opcode}{operand}Cr
# All commands terminate with Carriage Return (0x0D)
# Session starts with @GCr, ends with @QCr

actions:

  # --- Session control ---
  - id: session_start
    label: Session Start
    kind: action
    description: Initiate communication session. Must be sent before any command.
    command: "@GCr"
    hex: "40 47 0D"

  - id: session_end
    label: Session End
    kind: action
    description: Terminate communication session. Re-enables local (IR/key) control.
    command: "@QCr"
    hex: "40 51 0D"

  # --- Power (function 01) ---
  - id: power_off
    label: Power Off
    kind: action
    description: Turn off display power.
    command: "%A0000Cr"
    hex: "25 41 30 30 30 30 0D"

  - id: power_on
    label: Power On
    kind: action
    description: Turn on display power.
    command: "%A0001Cr"
    hex: "25 41 30 30 30 31 0D"

  - id: power_query
    label: Power Condition Reading
    kind: query
    description: Returns current power state. Response @S00 = off, @S01 = on.
    command: "%A0080Cr"

  # --- OSD (functions 02-03) ---
  - id: osd_auto_display_off
    label: On Screen Auto Display Off
    kind: action
    command: "%A0100Cr"
  - id: osd_auto_display_on
    label: On Screen Auto Display On
    kind: action
    command: "%A0101Cr"
  - id: osd_auto_display_query
    label: On Screen Auto Display Condition Reading
    kind: query
    command: "%A0180Cr"
  - id: osd_clear
    label: On Screen Character Clear
    kind: action
    command: "%A02Cr"

  # --- On screen character display (function 04) ---
  - id: osd_character_display
    label: On Screen Character Display
    kind: action
    params:
      - name: operand0  # horizontal coordinate 00-1D
        type: string
      - name: operand1  # vertical coordinate 00-0F
        type: string
      - name: operand2  # background color / character color (2 hex digits)
        type: string
      - name: operand3  # number of characters 01-0F
        type: string
      - name: operand4  # character code low byte
        type: string
      - name: operand5  # character code high byte + flashing flag
        type: string
    command_pattern: "%A03{operand0}{operand1}{operand2}{operand3}{operand4}{operand5}Cr"

  # --- Remote/key lock (function 05) ---
  - id: keylock_rc_invalid_main_invalid
    label: Disable Remote and Main Unit Keylock
    kind: action
    command: "%A0400Cr"
  - id: keylock_rc_invalid_main_valid
    label: Disable Remote, Enable Main Unit Keylock
    kind: action
    command: "%A0401Cr"
  - id: keylock_rc_valid_main_invalid
    label: Enable Remote, Disable Main Unit Keylock
    kind: action
    command: "%A0402Cr"
  - id: keylock_rc_valid_main_valid
    label: Enable Remote and Main Unit Keylock
    kind: action
    command: "%A0403Cr"
  - id: keylock_query
    label: Remote/Main Unit Keylock Setting Reading
    kind: query
    command: "%A0480Cr"

  # --- User adjustment initialization (function 06) ---
  - id: init_user_adjustment
    label: Initialize User Adjustable Value (Factory Default)
    kind: action
    command: "%A05Cr"
  - id: init_rgb_dsub
    label: RGB D-SUB Input Initialization
    kind: action
    command: "%A1000Cr"

  # --- Video input selection (function 07) ---
  - id: input_rgb_dsub
    label: Select RGB D-SUB Input (RGB2)
    kind: action
    command: "%A1000Cr"
  - id: input_rgb_dvi
    label: Select RGB DVI Input (RGB1)
    kind: action
    command: "%A1002Cr"
  - id: input_comp_video_rca_v4
    label: Select Comp. Video RCA (Video4)
    kind: action
    command: "%A1010Cr"
  - id: input_comp_video_rca_v3
    label: Select Comp. Video RCA (Video3)
    kind: action
    command: "%A1011Cr"
  - id: input_video_rca_v1
    label: Select Video RCA (Video1)
    kind: action
    command: "%A1012Cr"
  - id: input_s_video_v2
    label: Select S-Video (Video2)
    kind: action
    command: "%A1014Cr"
  - id: input_query
    label: Video Input Select Condition Reading
    kind: query
    command: "%A1080Cr"

  # --- Display aspect (function 08) ---
  - id: aspect_normal
    label: Display Aspect Normal
    kind: action
    command: "%A1100Cr"
  - id: aspect_wide1
    label: Display Aspect Wide1
    kind: action
    command: "%A1101Cr"
  - id: aspect_wide2
    label: Display Aspect Wide2
    kind: action
    command: "%A1102Cr"
  - id: aspect_zoom1
    label: Display Aspect Zoom1
    kind: action
    command: "%A1103Cr"
  - id: aspect_zoom2
    label: Display Aspect Zoom2
    kind: action
    command: "%A1104Cr"
  - id: aspect_auto
    label: Display Aspect Auto
    kind: action
    command: "%A1108Cr"
  - id: aspect_query
    label: Display Aspect Select Condition Reading
    kind: query
    command: "%A1180Cr"

  # --- Video system (function 09) ---
  - id: video_system
    label: Video System Setting
    kind: action
    params:
      - name: video_input
        type: integer
        description: 0=NTSC, 1=PAL60, 2=4.43NTSC, 3=M-PAL, 4=PAL, 5=N-PAL, 6=SECAM, 8=AUTO
      - name: s_video_input
        type: integer
        description: Same values; applies to S-video input
    command_pattern: "%A12{video_input}{s_video_input}Cr"

  # --- Video adjustments (functions 10-27) ---
  - id: contrast_set
    label: Contrast Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 62-9E (hex); PDP adjustable range -30 to +30; reference %A130080
    command_pattern: "%A130{hex}Cr"
  - id: contrast_query
    label: Contrast Condition Reading
    kind: query
    command: "%A1380Cr"

  - id: brightness_set
    label: Brightness Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 144-1BC (hex); PDP adjustable range -60 to +60; reference %A130180
    command_pattern: "%A130{hex}Cr"
  - id: brightness_query
    label: Brightness Condition Reading
    kind: query
    command: "%A1381Cr"

  - id: color_set
    label: Color Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 244-2BC (hex); PDP adjustable range -60 to +60; reference %A130280
    command_pattern: "%A130{hex}Cr"
  - id: color_query
    label: Color Condition Reading
    kind: query
    command: "%A1382Cr"

  - id: tint_set_video
    label: Tint Setting (Video or S-video)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 62-9E (hex); PDP adjustable range -30 to +30; reference %A130380
    command_pattern: "%A130{hex}Cr"
  - id: tint_set_rgb
    label: Tint Setting (RGB, C-Video)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 44-BC (hex); PDP adjustable range -60 to +60; reference %A130380
    command_pattern: "%A130{hex}Cr"
  - id: tint_query
    label: Tint Condition Reading
    kind: query
    command: "%A1383Cr"

  - id: sharpness_set_video
    label: Sharpness Setting (Video or S-video)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 70-90 (hex); PDP adjustable range -16 to +16; reference %A130480
    command_pattern: "%A130{hex}Cr"
  - id: sharpness_set_rgb
    label: Sharpness Setting (RGB, C-Video)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 7C-84 (hex); PDP adjustable range -4 to +4; reference %A130480
    command_pattern: "%A130{hex}Cr"
  - id: sharpness_query
    label: Sharpness Condition Reading
    kind: query
    command: "%A1384Cr"

  - id: noise_reduction_off
    label: Noise Reduction Off
    kind: action
    command: "%A130500Cr"
  - id: noise_reduction_min
    label: Noise Reduction Minimum
    kind: action
    command: "%A130501Cr"
  - id: noise_reduction_std
    label: Noise Reduction Standard
    kind: action
    command: "%A130502Cr"
  - id: noise_reduction_max
    label: Noise Reduction Maximum
    kind: action
    command: "%A130503Cr"
  - id: noise_reduction_query
    label: Noise Reduction Condition Reading
    kind: query
    command: "%A1385Cr"

  # --- Color temperature (function 16) ---
  - id: color_temp_warm
    label: Color Temperature -3500K (Warm)
    kind: action
    command: "%A130600Cr"
  - id: color_temp_standard
    label: Color Temperature Standard
    kind: action
    command: "%A130607Cr"
  - id: color_temp_cool
    label: Color Temperature +3500K (Cool)
    kind: action
    command: "%A13060ECr"
  - id: color_temp_user
    label: Color Temperature User
    kind: action
    command: "%A130680Cr"
  - id: color_temp_query
    label: Color Temperature Condition Reading
    kind: query
    command: "%A1386Cr"

  # --- User color temperature R/G/B (functions 17-19) ---
  - id: color_temp_r_set
    label: User Color Temperature (R) Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 00-FF (hex); PDP adjustable range 0-255
    command_pattern: "%A130{hex}Cr"
  - id: color_temp_r_query
    label: User Color Temperature (R) Condition Reading
    kind: query
    command: "%A1387Cr"

  - id: color_temp_g_set
    label: User Color Temperature (G) Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 00-FF (hex); PDP adjustable range 0-255
    command_pattern: "%A130{hex}Cr"
  - id: color_temp_g_query
    label: User Color Temperature (G) Condition Reading
    kind: query
    command: "%A1388Cr"

  - id: color_temp_b_set
    label: User Color Temperature (B) Setting
    kind: action
    params:
      - name: value
        type: integer
        description: Range 00-FF (hex); PDP adjustable range 0-255
    command_pattern: "%A130{hex}Cr"
  - id: color_temp_b_query
    label: User Color Temperature (B) Condition Reading
    kind: query
    command: "%A1389Cr"

  # --- Advanced picture adjustments (functions 20-27) ---
  - id: dot_clock_set
    label: Dot Clock Setting (RGB only, except DVI)
    kind: action
    params:
      - name: value
        type: integer
        description: Range A44-ABC (hex); PDP adjustable range -60 to +60; reference %A130A80
    command_pattern: "%A130{hex}Cr"
  - id: dot_clock_query
    label: Dot Clock Condition Reading
    kind: query
    command: "%A138ACr"

  - id: clock_phase_set
    label: Clock Phase Setting (RGB only, except DVI)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 00-1F (hex); PDP adjustable range 1-32; reference %A130B80 (auto)
    command_pattern: "%A130{hex}Cr"
  - id: clock_phase_auto
    label: Clock Phase Automatic Adjustment
    kind: action
    command: "%A130B80Cr"
  - id: clock_phase_query
    label: Clock Phase Condition Reading
    kind: query
    command: "%A138BCr"

  - id: clamp_position_set
    label: Clamp Pulse Position Setting (RGB and Comp.Video, except DVI)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 78-88 (hex); PDP adjustable range -8 to +8; reference %A130D80
    command_pattern: "%A130{hex}Cr"
  - id: clamp_position_query
    label: Clamp Pulse Position Condition Reading
    kind: query
    command: "%A138DCr"

  - id: picture_mode_dynamic
    label: Picture Mode Dynamic
    kind: action
    command: "%A130F00Cr"
  - id: picture_mode_fine
    label: Picture Mode Fine
    kind: action
    command: "%A130F01Cr"
  - id: picture_mode_real1
    label: Picture Mode Real 1
    kind: action
    command: "%A130F02Cr"
  - id: picture_mode_real2
    label: Picture Mode Real 2
    kind: action
    command: "%A130F03Cr"
  - id: picture_mode_static
    label: Picture Mode Static
    kind: action
    command: "%A130F04Cr"
  - id: picture_mode_query
    label: Picture Mode Condition Reading
    kind: query
    command: "%A138FCr"

  - id: frame_mode_off
    label: 24 Frame Mode Off
    kind: action
    command: "%A131100Cr"
  - id: frame_mode_on
    label: 24 Frame Mode On
    kind: action
    command: "%A131101Cr"
  - id: frame_mode_query
    label: 24 Frame Mode Condition Reading
    kind: query
    command: "%A1391Cr"

  - id: auto_calibration_execute
    label: Auto Calibration Execute (RGB except DVI)
    kind: action
    command: "%A131200Cr"
  - id: auto_calibration_original
    label: Auto Calibration Original (Factory Shipping Value)
    kind: action
    command: "%A131201Cr"

  - id: luminance_set
    label: Luminance Setting (Picture Mode Fine)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 08-14 (hex); PDP adjustable range 40-100%
    command_pattern: "%A131{hex}Cr"
  - id: luminance_query
    label: Luminance Condition Reading
    kind: query
    command: "%A1393Cr"

  - id: black_level_set
    label: Black Level Setting (Picture Mode Fine)
    kind: action
    params:
      - name: value
        type: integer
        description: Range 71-8F (hex); PDP adjustable range -15 to +15; reference %A131480
    command_pattern: "%A131{hex}Cr"
  - id: black_level_query
    label: Black Level Condition Reading
    kind: query
    command: "%A1394Cr"

  # --- Picture memory (function 32) ---
  - id: picture_memory_save
    label: Picture Memory Save (Memory 1-8)
    kind: action
    params:
      - name: slot
        type: integer
        description: Memory slot 0-7
    command_pattern: "%A150{slot}Cr"
  - id: picture_memory_load
    label: Picture Memory Load (Memory 1-8)
    kind: action
    params:
      - name: slot
        type: integer
        description: Memory slot 0-7
    command_pattern: "%A1501{slot}Cr"

  # --- Audio input settings (functions 33-38) ---
  - id: audio_input_rgb2_none
    label: Audio Input RGB2 - No Audio
    kind: action
    command: "%A200000Cr"
  - id: audio_input_rgb2_1
    label: Audio Input RGB2 - Audio Input 1
    kind: action
    command: "%A200001Cr"
  - id: audio_input_rgb2_2
    label: Audio Input RGB2 - Audio Input 2
    kind: action
    command: "%A200002Cr"
  - id: audio_input_rgb2_3
    label: Audio Input RGB2 - Audio Input 3
    kind: action
    command: "%A200003Cr"
  - id: audio_input_rgb2_query
    label: Audio Input RGB2 Condition Reading
    kind: query
    command: "%A200080Cr"

  - id: audio_input_rgb1_none
    label: Audio Input DVI (RGB1) - No Audio
    kind: action
    command: "%A200200Cr"
  - id: audio_input_rgb1_1
    label: Audio Input DVI (RGB1) - Audio Input 1
    kind: action
    command: "%A200201Cr"
  - id: audio_input_rgb1_2
    label: Audio Input DVI (RGB1) - Audio Input 2
    kind: action
    command: "%A200202Cr"
  - id: audio_input_rgb1_3
    label: Audio Input DVI (RGB1) - Audio Input 3
    kind: action
    command: "%A200203Cr"
  - id: audio_input_rgb1_query
    label: Audio Input DVI (RGB1) Condition Reading
    kind: query
    command: "%A200280Cr"

  - id: audio_input_cvbs_v4_none
    label: Audio Input C-Video (Video4) - No Audio
    kind: action
    command: "%A200300Cr"
  - id: audio_input_cvbs_v4_1
    label: Audio Input C-Video (Video4) - Audio Input 1
    kind: action
    command: "%A200301Cr"
  - id: audio_input_cvbs_v4_2
    label: Audio Input C-Video (Video4) - Audio Input 2
    kind: action
    command: "%A200302Cr"
  - id: audio_input_cvbs_v4_3
    label: Audio Input C-Video (Video4) - Audio Input 3
    kind: action
    command: "%A200303Cr"
  - id: audio_input_cvbs_v4_query
    label: Audio Input C-Video (Video4) Condition Reading
    kind: query
    command: "%A200380Cr"

  - id: audio_input_cvbs_v3_none
    label: Audio Input C-Video (Video3) - No Audio
    kind: action
    command: "%A200400Cr"
  - id: audio_input_cvbs_v3_1
    label: Audio Input C-Video (Video3) - Audio Input 1
    kind: action
    command: "%A200401Cr"
  - id: audio_input_cvbs_v3_2
    label: Audio Input C-Video (Video3) - Audio Input 2
    kind: action
    command: "%A200402Cr"
  - id: audio_input_cvbs_v3_3
    label: Audio Input C-Video (Video3) - Audio Input 3
    kind: action
    command: "%A200403Cr"
  - id: audio_input_cvbs_v3_query
    label: Audio Input C-Video (Video3) Condition Reading
    kind: query
    command: "%A200480Cr"

  - id: audio_input_v1_none
    label: Audio Input Video1 - No Audio
    kind: action
    command: "%A200500Cr"
  - id: audio_input_v1_1
    label: Audio Input Video1 - Audio Input 1
    kind: action
    command: "%A200501Cr"
  - id: audio_input_v1_2
    label: Audio Input Video1 - Audio Input 2
    kind: action
    command: "%A200502Cr"
  - id: audio_input_v1_3
    label: Audio Input Video1 - Audio Input 3
    kind: action
    command: "%A200503Cr"
  - id: audio_input_v1_query
    label: Audio Input Video1 Condition Reading
    kind: query
    command: "%A200580Cr"

  - id: audio_input_v2_none
    label: Audio Input S-Video (Video2) - No Audio
    kind: action
    command: "%A200600Cr"
  - id: audio_input_v2_1
    label: Audio Input S-Video (Video2) - Audio Input 1
    kind: action
    command: "%A200601Cr"
  - id: audio_input_v2_2
    label: Audio Input S-Video (Video2) - Audio Input 2
    kind: action
    command: "%A200602Cr"
  - id: audio_input_v2_3
    label: Audio Input S-Video (Video2) - Audio Input 3
    kind: action
    command: "%A200603Cr"
  - id: audio_input_v2_query
    label: Audio Input S-Video (Video2) Condition Reading
    kind: query
    command: "%A200680Cr"

  # --- Volume and tone (function 39) ---
  - id: volume_set
    label: Volume Setting
    kind: action
    params:
      - name: level
        type: integer
        description: "Range 00-28 (hex); 0 = low, 40 = high; separate mute command %A2240"
    command_pattern: "%A22{hex}Cr"
  - id: audio_mute_on
    label: Audio Mute On
    kind: action
    command: "%A2240Cr"
  - id: audio_mute_off
    label: Audio Mute Off (use volume command with level)
    kind: action
    command: "%A2200Cr"  # lowest volume, mute implicitly off
  - id: volume_query
    label: Volume Setting Condition Reading
    kind: query
    command: "%A2280Cr"

  # --- Tone balance (function 40) ---
  - id: tone_balance_set
    label: Tone Balance Setting
    kind: action
    params:
      - name: value
        type: integer
        description: "Balance: 06-1A (hex), left to right; reference %A23010"
    command_pattern: "%A230{hex}Cr"
  - id: bass_set
    label: Bass Setting
    kind: action
    params:
      - name: value
        type: integer
        description: "Range 0A-16 (hex); PDP adjustable range -6 to +6; reference %A23110"
    command_pattern: "%A231{hex}Cr"
  - id: treble_set
    label: Treble Setting
    kind: action
    params:
      - name: value
        type: integer
        description: "Range 0A-16 (hex); PDP adjustable range -6 to +6; reference %A23210"
    command_pattern: "%A232{hex}Cr"
  - id: loudness_off
    label: Loudness Off
    kind: action
    command: "%A23300Cr"
  - id: loudness_on
    label: Loudness On
    kind: action
    command: "%A23301Cr"
  - id: tone_balance_query
    label: Tone Balance Condition Reading
    kind: query
    command: "%A2380Cr"
  - id: bass_query
    label: Bass Condition Reading
    kind: query
    command: "%A2381Cr"
  - id: treble_query
    label: Treble Condition Reading
    kind: query
    command: "%A2382Cr"
  - id: loudness_query
    label: Loudness Condition Reading
    kind: query
    command: "%A2383Cr"

  # --- Extended features (functions 41-50) ---
  - id: language_select
    label: Language Selection
    kind: action
    params:
      - name: lang
        type: integer
        description: "0=Japanese, 1=English, 2=German, 3=Spanish, 4=French, 5=Italian, 6=Portuguese"
    command_pattern: "%A3101{lang}Cr"
  - id: language_query
    label: Language Select Condition Reading
    kind: query
    command: "%A3181Cr"

  - id: dpms_off
    label: DPMS Off
    kind: action
    command: "%A310200Cr"
  - id: dpms_black_1min
    label: DPMS Black Background 1 Minute
    kind: action
    command: "%A310201Cr"
  - id: dpms_black_15min
    label: DPMS Black Background 15 Minutes
    kind: action
    command: "%A310202Cr"
  - id: dpms_black_45min
    label: DPMS Black Background 45 Minutes
    kind: action
    command: "%A310203Cr"
  - id: dpms_black_60min
    label: DPMS Black Background 60 Minutes
    kind: action
    command: "%A310204Cr"
  - id: dpms_white_1min
    label: DPMS White Background 1 Minute
    kind: action
    command: "%A310281Cr"
  - id: dpms_white_15min
    label: DPMS White Background 15 Minutes
    kind: action
    command: "%A310282Cr"
  - id: dpms_white_45min
    label: DPMS White Background 45 Minutes
    kind: action
    command: "%A310283Cr"
  - id: dpms_white_60min
    label: DPMS White Background 60 Minutes
    kind: action
    command: "%A310284Cr"
  - id: dpms_query
    label: DPMS Setting Condition Reading
    kind: query
    command: "%A3182Cr"

  - id: white_screen_off
    label: White Screen Display Off
    kind: action
    command: "%A310300Cr"
  - id: white_screen_on
    label: White Screen Display On
    kind: action
    command: "%A310301Cr"
  - id: white_screen_query
    label: White Screen Display Condition Reading
    kind: query
    command: "%A3183Cr"

  - id: screen_orbiter_off
    label: Screen Orbiter Off
    kind: action
    command: "%A310401Cr"
  - id: screen_orbiter_min_interval
    label: Screen Orbiter Minimum Turn at Constant Intervals (~5 dots)
    kind: action
    command: "%A310410Cr"
  - id: screen_orbiter_std_interval
    label: Screen Orbiter Standard Turn at Constant Intervals (~10 dots)
    kind: action
    command: "%A310411Cr"
  - id: screen_orbiter_max_interval
    label: Screen Orbiter Maximum Turn at Constant Intervals (~15 dots)
    kind: action
    command: "%A310412Cr"
  - id: screen_orbiter_min_mode
    label: Screen Orbiter Minimum Turn at Each Mode Change (~5 dots)
    kind: action
    command: "%A310420Cr"
  - id: screen_orbiter_std_mode
    label: Screen Orbiter Standard Turn at Each Mode Change (~10 dots)
    kind: action
    command: "%A310421Cr"
  - id: screen_orbiter_max_mode
    label: Screen Orbiter Maximum Turn at Each Mode Change (~15 dots)
    kind: action
    command: "%A310422Cr"
  - id: screen_orbiter_query
    label: Screen Orbiter Condition Reading
    kind: query
    command: "%A3184Cr"

  - id: code_setting_auto
    label: Code Setting Auto (RGB only, except DVI)
    kind: action
    command: "%A310780Cr"
  - id: code_setting_manual
    label: Code Setting Manual RGB Parameter
    kind: action
    params:
      - name: value
        type: integer
        description: Range 00-2A (hex)
    command_pattern: "%A3107{hex}Cr"
  - id: code_setting_query
    label: Code Setting Condition Reading (RGB only)
    kind: query
    command: "%A3187Cr"

  - id: direct_setting_auto
    label: Direct Setting Auto
    kind: action
    command: "%A310800Cr"
  - id: direct_setting_vga
    label: Direct Setting VGA
    kind: action
    command: "%A310801Cr"
  - id: direct_setting_wvga
    label: Direct Setting WVGA
    kind: action
    command: "%A310802Cr"
  - id: direct_setting_480p
    label: Direct Setting 480P (except DVI)
    kind: action
    command: "%A310803Cr"
  - id: direct_setting_xga
    label: Direct Setting XGA
    kind: action
    command: "%A310804Cr"
  - id: direct_setting_wxga
    label: Direct Setting WXGA
    kind: action
    command: "%A310805Cr"
  - id: direct_setting_sxga
    label: Direct Setting SXGA (except DVI)
    kind: action
    command: "%A310806Cr"
  - id: direct_setting_sxga_plus
    label: Direct Setting SXGA+ (except DVI)
    kind: action
    command: "%A310807Cr"
  - id: direct_setting_query
    label: Direct Set Condition Reading (Only RGB)
    kind: query
    command: "%A3188Cr"

  - id: rgb_dsub_mask_off
    label: RGB D-SUB Input - RGB-PC Mask Off
    kind: action
    command: "%A310B00Cr"
  - id: rgb_decoder_mask_off
    label: RGB D-SUB Input - RGB Decoder Mask Off
    kind: action
    command: "%A310B10Cr"
  - id: rgb_decoder_mask_5
    label: RGB D-SUB Input - RGB Decoder Mask 5 dots
    kind: action
    command: "%A310B11Cr"
  - id: rgb_decoder_mask_10
    label: RGB D-SUB Input - RGB Decoder Mask 10 dots
    kind: action
    command: "%A310B12Cr"
  - id: rgb_decoder_mask_15
    label: RGB D-SUB Input - RGB Decoder Mask 15 dots
    kind: action
    command: "%A310B13Cr"
  - id: rgb_dsub_input_query
    label: RGB D-SUB Input Setting Condition Reading
    kind: query
    command: "%A318BCr"

  - id: exhibition_mode_off
    label: Exhibition Mode Off
    kind: action
    command: "%A310C00Cr"
  - id: exhibition_mode_on
    label: Exhibition Mode On
    kind: action
    command: "%A310C01Cr"
  - id: exhibition_mode_query
    label: Exhibition Mode Setting Condition Reading
    kind: query
    command: "%A318CCr"

  - id: name_select_rgb
    label: Selection of Indications (Name Select) - RGB Input
    kind: action
    params:
      - name: indication
        type: integer
        description: "00=RGB1-RGB2, 01=PC1, 02=PC2, 03=DVD1, 04=DVD2, 05=STB, 06=Satellite, 07=Cable TV"
      - name: input
        type: integer
        description: "10=RGB1, 11=RGB2"
    command_pattern: "%A31{indication}{input}Cr"
  - id: name_select_rgb_query
    label: Selection of Indications Condition Reading (RGB Input)
    kind: query
    command: "%A3190Cr"  # RGB1
  - id: name_select_rgb_query2
    label: Selection of Indications Condition Reading (RGB2)
    kind: query
    command: "%A3191Cr"

  - id: name_select_video
    label: Selection of Indications (Name Select) - Video Input
    kind: action
    params:
      - name: indication
        type: integer
        description: "00=Video1-Video4, 01=DVD1, 02=DVD2, 03=VCR1, 04=VCR2, 05=GAME, 06=Camcorder, 07=STB, 08=Satellite, 09=Cable TV"
      - name: input
        type: integer
        description: "13=Video1, 14=Video2, 15=Video3, 16=Video4"
    command_pattern: "%A31{indication}{input}Cr"
  - id: name_select_video_query
    label: Selection of Indications Condition Reading (Video1)
    kind: query
    command: "%A3193Cr"
  - id: name_select_video_query2
    label: Selection of Indications Condition Reading (Video2)
    kind: query
    command: "%A3194Cr"
  - id: name_select_video_query3
    label: Selection of Indications Condition Reading (Video3)
    kind: query
    command: "%A3195Cr"
  - id: name_select_video_query4
    label: Selection of Indications Condition Reading (Video4)
    kind: query
    command: "%A3196Cr"

  # --- Remote control codes (functions 51-70) ---
  # Note: these do not function when remote control is prohibited
  - id: rc_power
    label: Remote Control - Power On/Off
    kind: action
    command: "%A328A00Cr"
  - id: rc_audio_mute
    label: Remote Control - Audio Mute On/Off
    kind: action
    command: "%A328C12Cr"
  - id: rc_osd_display
    label: Remote Control - OSD Display On/Off
    kind: action
    command: "%A328A08Cr"
  - id: rc_picture_mode
    label: Remote Control - Picture Mode
    kind: action
    command: "%A328A44Cr"
  - id: rc_picture_memory
    label: Remote Control - Picture Memory
    kind: action
    command: "%A328A48Cr"
  - id: rc_wide_button
    label: Remote Control - Wide Button
    kind: action
    command: "%A328A10Cr"
  - id: rc_rgb1
    label: Remote Control - RGB1 Input
    kind: action
    command: "%A328B68Cr"
  - id: rc_rgb2
    label: Remote Control - RGB2 Input
    kind: action
    command: "%A328B69Cr"
  - id: rc_video4
    label: Remote Control - Video4 Input
    kind: action
    command: "%A328B6ACr"
  - id: rc_video1
    label: Remote Control - Video1 Input
    kind: action
    command: "%A328B40Cr"
  - id: rc_video2
    label: Remote Control - Video2 Input
    kind: action
    command: "%A328B41Cr"
  - id: rc_video3
    label: Remote Control - Video3 Input
    kind: action
    command: "%A328B42Cr"
  - id: rc_volume_up
    label: Remote Control - Volume Up
    kind: action
    command: "%A328C10Cr"
  - id: rc_volume_down
    label: Remote Control - Volume Down
    kind: action
    command: "%A328C11Cr"
  - id: rc_menu_button
    label: Remote Control - Menu Button
    kind: action
    command: "%A328A22Cr"
  - id: rc_menu_up
    label: Remote Control - Menu Cursor Up
    kind: action
    command: "%A328A23Cr"
  - id: rc_menu_left
    label: Remote Control - Menu Cursor Left
    kind: action
    command: "%A328A20Cr"
  - id: rc_menu_right
    label: Remote Control - Menu Cursor Right
    kind: action
    command: "%A328A21Cr"
  - id: rc_menu_down
    label: Remote Control - Menu Cursor Down
    kind: action
    command: "%A328A24Cr"
  - id: rc_enter
    label: Remote Control - Enter
    kind: action
    command: "%A328A26Cr"

  # --- Video Position / Size (functions 28-31) ---
  # Each set opcode appears verbatim in source (refined doc rows 28-31).
  # Operand format and adjustable range depend on the selected input
  # (RGB_PC vs Component vs Video/S-video) and the current screen size;
  # see source for exact per-input ranges (e.g. RGB_PC H-Pos
  # %A1400076A-%A14000896 ref %A14000800; etc.).
  - id: video_horizontal_position_set
    label: Video Horizontal Position Set
    kind: action
    description: "Sets video horizontal position (function 28). 4-digit hex operand, range depends on input format; reference value 0x0800. Source: %A1400076A-%A14000896 (RGB_PC), %A140007F0-%A14000810 (Comp SDTV/525P/625P), %A140007E0-%A14000820 (Comp 720P/HDTV), %A140007E2-%A1400081E (Video/S-video)."
    command: "%A1400{value}Cr"

  - id: video_horizontal_position_query
    label: Video Horizontal Position Condition Reading
    kind: query
    description: "Queries current horizontal position. Returns @S{value} in the same 4-digit hex range as the set command (e.g. @S076A..@S0896)."
    command: "%A1480Cr"

  - id: video_vertical_position_set
    label: Video Vertical Position Set
    kind: action
    description: "Sets video vertical position (function 29). 4-digit hex operand, range depends on input format; reference value 0x0800. Source: %A1401076A-%A14010896 (RGB_PC), %A140107F0-%A14010810 (Comp SDTV/525P/625P), %A140107E0-%A14010820 (Comp 720P/HDTV), %A140107F9-%A14010807 (Video/S-video Normal/Wide), %A140107F1-%A1401080F (Video/S-video Zoom)."
    command: "%A1401{value}Cr"

  - id: video_vertical_position_query
    label: Video Vertical Position Condition Reading
    kind: query
    description: "Queries current vertical position. Returns @S{value} in 4-digit hex range matching the set command."
    command: "%A1481Cr"

  - id: video_horizontal_width_set
    label: Video Horizontal Width Set
    kind: action
    description: "Sets horizontal size / width (function 30). 2-digit hex operand, range depends on input format; reference value 0x80. Source: %A140267-%A1402B2 (RGB_PC except DVI), %A14027C-%A140290 (Comp Video), %A140279-%A14028C (Video/S-video)."
    command: "%A1402{value}Cr"

  - id: video_horizontal_width_query
    label: Video Horizontal Width Condition Reading
    kind: query
    description: "Queries current horizontal size. Returns @S{value} in 2-digit hex range (e.g. @S67..@SB2)."
    command: "%A1482Cr"

  - id: video_vertical_height_set
    label: Video Vertical Height Set
    kind: action
    description: "Sets vertical size / height (function 31). 2-digit hex operand, range depends on input format; reference value 0x80. Source: %A140367-%A1403B2 (RGB_PC except DVI), %A14037C-%A140390 (C-Video), %A140379-%A14038C (Video/S-video)."
    command: "%A1403{value}Cr"

  - id: video_vertical_height_query
    label: Video Vertical Height Condition Reading
    kind: query
    description: "Queries current vertical size. Returns @S{value} in 2-digit hex range matching the set command."
    command: "%A1483Cr"
```

## Feedbacks
```yaml
# Status response format:
#   Normal:       @SCr
#   Normal+data:  @S{value}Cr
#   Error:        @E{error_code}Cr

feedbacks:

  - id: status_normal
    label: Normal Termination Status
    description: Command executed successfully.
    response_pattern: "@SCr"
    hex: "40 53 0D"

  - id: status_condition_data
    label: Normal Termination with Condition Data
    description: PDP sends operating condition in response to condition-reading commands.
    response_pattern: "@S{value}Cr"

  - id: status_error
    label: Abnormal Termination Status
    description: Command execution failed. ST code indicates error type.
    response_pattern: "@E{error_code}Cr"
    values:
      - "01: Communication error (cable not connected)"
      - "02: Setting error (command format incorrect)"
      - "03: Function execute error (command execution failed)"

  # Query responses by function

  - id: power_state_response
    label: Power Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Power supply condition Off"
      - "@S01: Power supply condition On"

  - id: osd_auto_display_response
    label: On Screen Auto Display Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Automatic display condition Off"
      - "@S01: Automatic display condition On"

  - id: keylock_response
    label: Remote/Main Unit Keylock Setting Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Remote control keylock invalid, Main unit keylock invalid"
      - "@S01: Remote control keylock invalid, Main unit keylock valid"
      - "@S02: Remote control keylock valid, Main unit keylock invalid"
      - "@S03: Remote control keylock valid, Main unit keylock valid"

  - id: video_input_response
    label: Video Input Select Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: RGB_D-SUB input"
      - "@S02: RGB_DVI input"
      - "@S10: Comp. Video_RCA input"
      - "@S11: Comp. Video_RCA input"
      - "@S12: Video_RCA input"
      - "@S14: S-video input"

  - id: aspect_response
    label: Display Aspect Select Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Normal"
      - "@S01: Wide1"
      - "@S02: Wide2"
      - "@S03: Zoom1"
      - "@S04: Zoom2"
      - "@S08-@S0F: Auto"

  - id: audio_input_response
    label: Audio Input Setting Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: No audio"
      - "@S01: Audio input 1"
      - "@S02: Audio input 2"
      - "@S03: Audio input 3"

  - id: volume_response
    label: Volume Setting Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00-@S28: Volume level (low to high)"
      - "@S40-@S68: Audio mute on"

  - id: tone_balance_response
    label: Tone Balance Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - balance: "@S06 (Left) - @S1A (Right)"
      - bass: "@S0A (Down) - @S16 (Up)"
      - treble: "@S0A (Down) - @S16 (Up)"
      - loudness: "@S00 (OFF), @S01 (ON)"

  - id: picture_mode_response
    label: Picture Mode Setting Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Dynamic"
      - "@S01: Fine"
      - "@S02: Real 1"
      - "@S03: Real 2"
      - "@S04: Static"

  - id: color_temp_response
    label: Color Temperature Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Warm"
      - "@S01: Standard"
      - "@S02: Cool"
      - "@S80-@S9F: User"

  - id: language_response
    label: Language Select Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: Japanese"
      - "@S01: English"
      - "@S02: German"
      - "@S03: Spanish"
      - "@S04: French"
      - "@S05: Italian"
      - "@S06: Portuguese"

  - id: dpms_response
    label: DPMS Setting Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S00: DPMS Off"
      - "@S01: Black background. 1 minute"
      - "@S02: Black background. 15 minutes"
      - "@S03: Black background. 45 minutes"
      - "@S04: Black background. 60 minutes"
      - "@S81: White background. 1 minute"
      - "@S82: White background. 15 minutes"
      - "@S83: White background. 45 minutes"
      - "@S84: White background. 60 minutes"

  - id: screen_orbiter_response
    label: Screen Orbiter Condition Reading Response
    response_pattern: "@S{value}Cr"
    values:
      - "@S01: Off"
      - "@S10: Minimum turn at constant intervals"
      - "@S11: Standard turn at constant intervals"
      - "@S12: Maximum turn at constant intervals"
      - "@S20: Minimum turn at each mode change"
      - "@S21: Standard turn at each mode change"
      - "@S22: Maximum turn at each mode change"
```

## Variables
```yaml
# No standalone Variables section - all parameters are action-based (set/get pairs).
# Video adjustment ranges are embedded in action parameter definitions.
```

## Events
```yaml
# The device does not send unsolicited events. All responses are synchronous to commands.
# UNRESOLVED: no unsolicited notification mechanism described in source
```

## Macros
```yaml
# Source describes a protocol procedure example but no explicit named macros.
# UNRESOLVED: no named macros in source

# Protocol sequence example (documented in section 4-2):
# 1. @GCr          → session start
# 2. %A0400Cr      → disable keys (remote + main unit)
# 3. @SCr          → normal status (keys disabled)
# 4. cable disconnect / reconnect
# 5. @GCr          → session restart
# 6. %A0000Cr      → power off
# 7. @SCr          → normal status
# 8. power switch OFF→ON
# 9. @GCr          → session start
# 10. %A0001Cr     → power on
# 11. @SCr         → normal status
# 12. @QCr         → session end
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Remote control and main unit keys are disabled during active RS-232C communication session (priority enforced)"
  - "Power supply On/Off and Power supply condition reading are only commands controllable from standby state"
  - "OSD character display: caution for screen burn-in with fixed display for long duration"
# UNRESOLVED: no explicit safety interlock procedures beyond key disable priority
```

## Notes

RS-232C protocol with ASCII command encoding. Session structure: send `@GCr` to start, send commands, send `@QCr` to end. Resend start command if no response within 8 seconds. Keys disabled for duration of communication session.

Pinout: straight D-SUB 9-pin cable (PC DTE to PDP DTE). Flow control: RTS/CTS. Reception timeout: 8 seconds.

Command format: `%A{opcode}{operand}Cr` — all commands are ASCII, terminated with Carriage Return (0x0D).

Response types:
- `@SCr` — normal execution
- `@S{value}Cr` — condition data (query responses)
- `@E{code}Cr` — error; codes 01=comm error, 02=setting error, 03=function execute error

Remote control codes (51-70) do not function when remote control is prohibited via keylock.

<!-- UNRESOLVED: P50XCA51WH-specific validation not performed — source covers P50XHA10 series -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no IP/TCP control mentioned in source — serial only -->
<!-- UNRESOLVED: port number not stated — RS-232 only, no IP port applicable -->

## Provenance

```yaml
source_domains:
  - 2150.com
  - customremotecontrol.com
source_urls:
  - https://www.2150.com/files/rs232_commands_P50XHA10.pdf
  - http://www.customremotecontrol.com/infrared-receiver-rs232-device-tables/Fujitsu-P50XCA-Plasma-RS232-Codes.html
retrieved_at: 2026-04-30T13:42:36.975Z
last_checked_at: 2026-06-02T21:41:44.255Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:44.255Z
matched_actions: 207
action_count: 207
confidence: medium
summary: "All 207 actions verified against source. Amend added 8 new entries covering the prior verifier's exact extras list: video horizontal/vertical position+size set (%A1400-1403) and query (%A1480-1483), traced to source functions 28-31. Transport 4800 8N1 RTS/CTS ASCII confirmed verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "P50XCA51WH-specific RS-232 protocol not confirmed; source covers P50XHA10 series only"
- "no unsolicited notification mechanism described in source"
- "no named macros in source"
- "no explicit safety interlock procedures beyond key disable priority"
- "P50XCA51WH-specific validation not performed — source covers P50XHA10 series"
- "firmware version compatibility not stated in source"
- "no IP/TCP control mentioned in source — serial only"
- "port number not stated — RS-232 only, no IP port applicable"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
