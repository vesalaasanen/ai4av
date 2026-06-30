---
spec_id: admin/sharp-pn-g655u-ru
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp PN-G655U-RU Control Spec"
manufacturer: Sharp
model_family: PN-G655U-RU
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - PN-G655U-RU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - manualmachine.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNG655.pdf
  - https://manualmachine.com/sharp/png655u/560587-user-manual/
  - https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html
  - "https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html?page=32"
  - "https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html?page=33"
retrieved_at: 2026-06-15T03:07:18.125Z
last_checked_at: 2026-06-16T07:15:41.933Z
generated_at: 2026-06-16T07:15:41.933Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP / LAN control not described in source excerpt — only RS-232C documented."
  - "firmware version compatibility not stated in source."
  - "full model variant list (PN-G655U vs PN-G655U-RU vs PN-G655U-R) not enumerated in source."
  - "no async event mechanism described in source."
  - "no explicit power-on sequencing interlock, fuse, or mains procedure stated in source."
  - "full model variant matrix (PN-G655U vs -RU vs -R) not enumerated."
  - "TCP/IP / LAN / network control not described in this excerpt — only RS-232C."
  - "ALCK param values 1 vs 2 (lock modes) not described beyond \"0:OFF\"."
  - "LANG param value 6 (blank label in source table) — language unspecified."
  - "STCA cause code 5 and 7 not listed in source (gap in 0-8 enum)."
  - "exact ENLARGE \"Image Position\" semantics per EMAG mode — source references \"See page 21\" not in excerpt."
  - "mains power switch interlock procedure not stated in excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-16T07:15:41.933Z
  matched_actions: 100
  action_count: 100
  confidence: medium
  summary: "All 100 spec actions matched verbatim to source commands with correct parameters and shapes; transport settings verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sharp PN-G655U-RU Control Spec

## Summary
Sharp PN-G655U-RU is a professional large-format LCD monitor controllable from a PC via RS-232C (D-sub 9 pin, straight cable). This spec covers the full RS-232C command table: power control, input selection, picture/audio/setup/option/enlarge/PIP menus, and initialization/restriction settings. The monitor supports daisy-chain connection of up to 25 units with per-monitor ID assignment and repeater control.

<!-- UNRESOLVED: TCP/IP / LAN control not described in source excerpt — only RS-232C documented. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full model variant list (PN-G655U vs PN-G655U-RU vs PN-G655U-R) not enumerated in source. -->

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: POWR standby/return command
  - routable     # inferred: INPS input mode selection
  - queryable    # inferred: many R-direction commands (VOLM?, INPS?, etc.)
  - levelable    # inferred: VOLM, CONT, BLVL, TREBLE, BASS etc. continuous ranges
```

## Actions
```yaml
# Command format: 4-char command + 4-char parameter (padded with spaces if needed).
# Return code is 0DH, 0AH, or 0DH. Negative values in 3 digits e.g. AUTR-009.
# "?" in parameter queries current value when Direction includes R.
# Repeater control: 4th parameter character = "+" broadcasts to all daisy-chained monitors.

# --- Power control / Input mode selection ---
- id: power_set
  label: Power Control
  kind: action
  command: "POWR{value}"        # 0 = standby, 1 = return from standby
  params:
    - name: value
      type: integer
      enum: [0, 1]
      description: "0: standby mode; 1: return from standby"

- id: power_query
  label: Power Status Query
  kind: query
  command: "POWR????"
  params: []
  # Reply: 0=standby, 1=normal, 2=input signal waiting

- id: input_mode_set
  label: Input Mode Selection
  kind: action
  command: "INPS{value}"
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 6, 7]
      description: "0: toggle; 1: PC1 DIGITAL; 2: PC2 ANALOG; 3: AV2 COMPONENT; 4: AV3 VIDEO; 6: PC3 ANALOG; 7: AV1 DIGITAL"

- id: input_mode_query
  label: Input Mode Query
  kind: query
  command: "INPS????"
  params: []

# --- SCREEN menu (PC2/PC3) ---
- id: auto_sync
  label: Auto Sync (Screen)
  kind: action
  command: "ASNC0001"
  params: []

- id: clock_set
  label: Clock
  kind: action
  command: "CLCK{value}"        # 0-255 (3-digit zero-padded)
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: phase_set
  label: Phase
  kind: action
  command: "PHSE{value}"        # 0-63
  params:
    - name: value
      type: integer
      range: [0, 63]

- id: h_position_set
  label: Horizontal Position
  kind: action
  command: "HPOS{value}"        # 0-500 (max depends on resolution)
  params:
    - name: value
      type: integer
      range: [0, 500]

- id: v_position_set
  label: Vertical Position
  kind: action
  command: "VPOS{value}"        # 0-100
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: screen_reset
  label: Screen Reset
  kind: action
  command: "ARST0001"           # param 1 = screen reset
  params: []

# --- PICTURE menu ---
- id: auto_gain
  label: Auto (Picture)
  kind: action
  command: "AGIN0001"           # input mode PC2 or PC3
  params: []

- id: contrast_set
  label: Contrast
  kind: action
  command: "CONT{value}"        # 0-60 (0-127 on PC2/PC3)
  params:
    - name: value
      type: integer
      range: [0, 60]

- id: black_level_set
  label: Black Level
  kind: action
  command: "BLVL{value}"        # 0-60 (0-127 on PC2/PC3)
  params:
    - name: value
      type: integer
      range: [0, 60]

- id: tint_set
  label: Tint
  kind: action
  command: "TINT{value}"        # 0-60 (AV input mode only)
  params:
    - name: value
      type: integer
      range: [0, 60]

- id: color_set
  label: Color
  kind: action
  command: "COLR{value}"        # 0-60
  params:
    - name: value
      type: integer
      range: [0, 60]

- id: sharpness_set
  label: Sharpness
  kind: action
  command: "SHRP{value}"        # 0-24
  params:
    - name: value
      type: integer
      range: [0, 24]

- id: flesh_tone_set
  label: Flesh Tone
  kind: action
  command: "FLES{value}"        # 0:OFF 1:LOW 2:HIGH
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: three_d_nr_set
  label: 3D-NR
  kind: action
  command: "TDNR{value}"        # 0:OFF 1:LOW 2:HIGH
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: mpeg_nr_set
  label: MPEG-NR
  kind: action
  command: "MPNR{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: three_d_yc_set
  label: 3D-Y/C
  kind: action
  command: "YCSP{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: color_mode_set
  label: Color Mode
  kind: action
  command: "BMOD{value}"        # 0:STD 2:VIVID 3:sRGB (PC only)
  params:
    - name: value
      type: integer
      enum: [0, 2, 3]

- id: color_temp_set
  label: White Balance / Color Temperature
  kind: action
  command: "CTMP{value}"        # 0:THRU(PC1) 1-15:preset(~3000K..~10000K) 99:USER
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 99]

- id: r_contrast_set
  label: R-Contrast
  kind: action
  command: "CRTR{value}"        # 0-512 (ERR if CTMP != 99)
  params:
    - name: value
      type: integer
      range: [0, 512]

- id: g_contrast_set
  label: G-Contrast
  kind: action
  command: "CRTG{value}"        # 0-512
  params:
    - name: value
      type: integer
      range: [0, 512]

- id: b_contrast_set
  label: B-Contrast
  kind: action
  command: "CRTB{value}"        # 0-512
  params:
    - name: value
      type: integer
      range: [0, 512]

- id: gamma_set
  label: Gamma
  kind: action
  command: "GAMM{value}"        # 0:1.8 1:2.2 2:2.4
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: picture_reset
  label: Picture Reset
  kind: action
  command: "ARST0002"           # param 2 = picture reset
  params: []

# --- AUDIO menu ---
- id: treble_set
  label: Treble
  kind: action
  command: "AUTR{value}"        # -10..10 (3-digit signed e.g. AUTR-009)
  params:
    - name: value
      type: integer
      range: [-10, 10]

- id: bass_set
  label: Bass
  kind: action
  command: "AUBS{value}"        # -10..10
  params:
    - name: value
      type: integer
      range: [-10, 10]

- id: balance_set
  label: Balance
  kind: action
  command: "AUBL{value}"        # -10..10
  params:
    - name: value
      type: integer
      range: [-10, 10]

- id: audio_reset
  label: Audio Reset
  kind: action
  command: "ARST0003"           # param 3 = audio reset
  params: []

# --- SETUP menu ---
- id: screen_motion_set
  label: Screen Motion (Anti-Burn)
  kind: action
  command: "SCSV{value}"        # 0:OFF 1-4:PATTERN 1-4
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: motion_time_1_set
  label: Motion Time 1
  kind: action
  command: "MTIM{value}"        # 0-20
  params:
    - name: value
      type: integer
      range: [0, 20]

- id: motion_time_2_set
  label: Motion Time 2 (Pattern 1)
  kind: action
  command: "MINT{value}"        # 10-990 per 10 sec (pattern 1)
  params:
    - name: value
      type: integer
      range: [10, 990]

- id: motion_time_2_pattern_2_4_set
  label: Motion Time 2 (Pattern 2-4)
  kind: action
  command: "MINT{value}"        # 5-20 per second (pattern 2-4)
  params:
    - name: value
      type: integer
      range: [5, 20]

- id: language_set
  label: Language
  kind: action
  command: "LANG{value}"        # 1:DE 2:FR 3:IT 4:ES 5:RU 14:EN
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5, 14]

- id: id_set
  label: ID Number Set
  kind: action
  command: "IDST{value}"        # 0-255 (0 = no ID)
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: id_query
  label: ID Number Query
  kind: query
  command: "IDST????"
  params: []

- id: id_select_once
  label: ID Select (Once)
  kind: action
  command: "IDSL{value}"        # 1-255; 0 clears
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: id_lock
  label: ID Lock (Subsequent)
  kind: action
  command: "IDLK{value}"        # 1-255; 0 cancels
  params:
    - name: value
      type: integer
      range: [0, 255]

- id: id_check
  label: ID Check
  kind: action
  command: "IDCK0000"           # param has no meaning
  params: []

- id: picture_flip_set
  label: Picture Flip
  kind: action
  command: "PFIL{value}"        # 0:OFF 1:MIRROR 2:UPSIDE DOWN 3:ROTATE
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: power_on_delay_set
  label: Power On Delay
  kind: action
  command: "PWOD{value}"        # 0:OFF 1-60 sec ON
  params:
    - name: value
      type: integer
      range: [0, 60]

# --- OPTION menu ---
- id: date_time_set
  label: Date/Time Setting
  kind: action
  command: "DATEAABBCCDDEE"     # AA:year BB:month CC:day DD:hour EE:min (no spaces)
  params:
    - name: year
      type: integer
    - name: month
      type: integer
    - name: day
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer

- id: schedule_01_set
  label: Schedule 1
  kind: action
  command: "SC01ABCDEFFGGH"     # 9-char schedule (no spaces). A:enable B:power C:day-of-week-1 D:day-of-week-2 E:day-of-week-3 F:hour G:min H:input
  params:
    - name: spec
      type: string
      description: "A:0/1 enable; B:0/1 power; C:0 once/1 weekly/2 daily; D:0 Sun..6 Sat/9 none; E:0 Sun..6 Sat/9 none; F:00-23; G:00-59; H:0 none/1 PC1,AV1/2 PC2/3 PC3,AV2/4 AV3"

- id: schedule_02_set
  label: Schedule 2
  kind: action
  command: "SC02ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_03_set
  label: Schedule 3
  kind: action
  command: "SC03ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_04_set
  label: Schedule 4
  kind: action
  command: "SC04ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_05_set
  label: Schedule 5
  kind: action
  command: "SC05ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_06_set
  label: Schedule 6
  kind: action
  command: "SC06ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_07_set
  label: Schedule 7
  kind: action
  command: "SC07ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: schedule_08_set
  label: Schedule 8
  kind: action
  command: "SC08ABCDEFFGGH"
  params:
    - name: spec
      type: string

- id: dvi_select_set
  label: DVI Select
  kind: action
  command: "DVSL{value}"        # 0:PC(DIGITAL) 1:AV(DIGITAL)
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: bnc_select_set
  label: BNC Select
  kind: action
  command: "BNSL{value}"        # 0:PC(ANALOG) 1:AV(COMPONENT)
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: quick_shoot_pc_set
  label: Quick Shoot (PC)
  kind: action
  command: "QSPC{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: quick_shoot_av_set
  label: Quick Shoot (AV)
  kind: action
  command: "QSAV{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: color_system_set
  label: Color System
  kind: action
  command: "CSYS{value}"        # 0:AUTO 1:PAL 2:PAL-60 3:SECAM 4:NTSC3.58 5:NTSC4.43
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4, 5]

- id: audio_output_set
  label: Audio Output
  kind: action
  command: "AOUT{value}"        # 0:VARIABLE 1:FIXED
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: resolution_check_pc
  label: Resolution Check (PC)
  kind: query
  command: "PXCK????"
  params: []
  # Returns hhh,vvv

- id: pixel_setting_set
  label: Pixel Setting (PC2/PC3)
  kind: action
  command: "PXSL{value}"        # 1:1360x768 2:1280x768 3:1024x768 5:848x480 6:640x480
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 5, 6]

- id: resolution_check_av
  label: Resolution Check (AV)
  kind: query
  command: "RESO????"
  params: []
  # Returns 480i/480p/1080i/720p/1080p/VGA etc.

- id: self_adjust_set
  label: Self Adjust
  kind: action
  command: "AADJ{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: power_management_set
  label: Power Management
  kind: action
  command: "PMNG{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

# --- ENLARGE menu (PC input mode) ---
- id: enlarge_mode_set
  label: Enlarge Mode
  kind: action
  command: "EMAG{value}"        # 0:OFF 1:2x2 2:3x3 3:4x4 4:5x5
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3, 4]

- id: bezel_width_h_set
  label: Bezel Width (Shorter Side)
  kind: action
  command: "BEZH{value}"        # 0-100
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: bezel_width_v_set
  label: Bezel Width (Longer Side)
  kind: action
  command: "BEZV{value}"        # 0-100
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: image_position_2x2_set
  label: Image Position (2x2)
  kind: action
  command: "EPOS{value}"        # 0-3
  params:
    - name: value
      type: integer
      range: [0, 3]

- id: image_position_3x3_set
  label: Image Position (3x3)
  kind: action
  command: "EPOS{value}"        # 0-8
  params:
    - name: value
      type: integer
      range: [0, 8]

- id: image_position_4x4_set
  label: Image Position (4x4)
  kind: action
  command: "EPOS{value}"        # 0-15
  params:
    - name: value
      type: integer
      range: [0, 15]

- id: image_position_5x5_set
  label: Image Position (5x5)
  kind: action
  command: "EPOS{value}"        # 0-24
  params:
    - name: value
      type: integer
      range: [0, 24]

- id: enlarge_image_position_set
  label: Enlarge/Image Position Combined
  kind: action
  command: "ESTGXXYY"           # XX=enlarge mode (see EMAG), YY=image position (see EPOS). No spaces.
  params:
    - name: enlarge_mode
      type: integer
    - name: image_position
      type: integer

# --- PIP/PbyP menu ---
- id: pip_mode_set
  label: PIP Modes
  kind: action
  command: "MWIN{value}"        # 0:OFF 1:PIP 2:PbyP 3:PbyP2
  params:
    - name: value
      type: integer
      enum: [0, 1, 2, 3]

- id: pip_size_set
  label: PIP Size
  kind: action
  command: "MPSZ{value}"        # 1-12
  params:
    - name: value
      type: integer
      range: [1, 12]

- id: pip_pos_h_set
  label: PIP Pos (Longest Direction)
  kind: action
  command: "MHPS{value}"        # 0-100
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pip_pos_h_query
  label: PIP Pos (Longest Direction) Query
  kind: query
  command: "MHPS????"
  params: []

- id: pip_pos_v_set
  label: PIP Pos (Shortest Direction)
  kind: action
  command: "MVPS{value}"        # 0-100
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pip_pos_v_query
  label: PIP Pos (Shortest Direction) Query
  kind: query
  command: "MVPS????"
  params: []

- id: pip_vh_pos_set
  label: PIP V/H-Pos
  kind: action
  command: "MPOSxxxyyy"         # xxx:longer 0-100, yyy:shorter 0-100. No spaces.
  params:
    - name: longer
      type: integer
      range: [0, 100]
    - name: shorter
      type: integer
      range: [0, 100]

- id: pip_vh_pos_query
  label: PIP V/H-Pos Query
  kind: query
  command: "MPOS????"
  params: []
  # Returns (xxx,yyy)

- id: pip_blend_set
  label: PIP Blend
  kind: action
  command: "MWBL{value}"        # 0-15
  params:
    - name: value
      type: integer
      range: [0, 15]

- id: pip_source_set
  label: PIP Source
  kind: action
  command: "MWIP{value}"        # 1:PC1 DIGITAL 2:PC2 ANALOG 3:AV2 COMPONENT 4:AV3 VIDEO 6:PC3 ANALOG 7:AV1 DIGITAL
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 6, 7]

- id: sound_change_set
  label: Sound Change
  kind: action
  command: "MWAD{value}"        # 1:MAIN 2:SUB
  params:
    - name: value
      type: integer
      enum: [1, 2]

- id: main_pos_set
  label: Main Pos (Main Screen)
  kind: action
  command: "MWPP{value}"        # 0:POS1 1:POS2
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: pbyp2_pos_set
  label: PbyP2 Pos (Sub Screen)
  kind: action
  command: "MW2P{value}"        # 0:POS1 1:POS2 2:POS3
  params:
    - name: value
      type: integer
      enum: [0, 1, 2]

- id: auto_off_set
  label: PIP Auto Off
  kind: action
  command: "MOFF{value}"        # 0:MANUAL 1:AUTO
  params:
    - name: value
      type: integer
      enum: [0, 1]

# --- FUNCTION (Initialization/Restriction) menu ---
- id: screen_size_pc_set
  label: Screen Size (PC)
  kind: action
  command: "WIDE{value}"        # 1:WIDE 2:NORMAL 3:DotbyDot 4:ZOOM1 5:ZOOM2
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5]

- id: screen_size_av_set
  label: Screen Size (AV)
  kind: action
  command: "WIDE{value}"        # 1:WIDE 2:ZOOM1 3:ZOOM2 4:NORMAL 5:DotbyDot
  params:
    - name: value
      type: integer
      enum: [1, 2, 3, 4, 5]

- id: volume_set
  label: Volume
  kind: action
  command: "VOLM{value}"        # 0-31 (zero-padded 3-digit e.g. VOLM0030)
  params:
    - name: value
      type: integer
      range: [0, 31]

- id: mute_set
  label: Mute
  kind: action
  command: "MUTE{value}"        # 0:OFF 1:ON
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: model_info_query
  label: Model Information Query
  kind: query
  command: "INF1????"
  params: []

- id: serial_no_query
  label: Serial Number Query
  kind: query
  command: "SRNO????"
  params: []

- id: brightness_set
  label: Brightness (Backlight)
  kind: action
  command: "VLMP{value}"        # 0-31
  params:
    - name: value
      type: integer
      range: [0, 31]

- id: temperature_sensor_query
  label: Temperature Sensor Status Query
  kind: query
  command: "DSTA????"
  params: []
  # 0:normal 1:abnormal(standby) 2:abnormal(resumed) 3:abnormal(backlight dim) 4:sensor abnormal

- id: temperature_acquisition_query
  label: Temperature Acquisition Query
  kind: query
  command: "ERRT????"
  params: []
  # Returns [Sensor1],[Sensor2],[Sensor3]

- id: standby_cause_init
  label: Standby Cause Initialize
  kind: action
  command: "STCA0000"           # param 0 = initialization
  params: []

- id: standby_cause_query
  label: Cause of Last Standby Query
  kind: query
  command: "STCA????"
  params: []
  # 0:no error 1:POWER btn 2:main switch off 3:RS-232C 4:no signal 6:temp 8:schedule

- id: all_reset
  label: All Reset
  kind: action
  command: "RSET0000"           # param 0
  params: []

- id: adjustment_lock_set
  label: Adjustment Lock
  kind: action
  command: "ALCK{value}"        # 0:OFF 1-2:lock (per source 0-2 range; only 0:OFF described)
  params:
    - name: value
      type: integer
      range: [0, 2]

- id: osd_display_set
  label: OSD Display
  kind: action
  command: "LOSD{value}"        # 0:ON 1:OFF
  params:
    - name: value
      type: integer
      enum: [0, 1]

- id: led_set
  label: LED (Front Panel)
  kind: action
  command: "OFLD{value}"        # 0:ON 1:OFF
  params:
    - name: value
      type: integer
      enum: [0, 1]
```

## Feedbacks
```yaml
# Unsolicited / response-format feedback patterns documented in source.

- id: ok_response
  type: string
  values: ["OK"]                # Returned with optional trailing ID number when command succeeds.

- id: err_response
  type: string
  values: ["ERR"]               # Returned when no relevant command or command unusable in current state.

- id: wait_response
  type: string
  values: ["WAIT"]              # Returned for slow commands (repeater, IDSL/IDLK, RSET, INPS, ASNC,
                               # WIDE, EMAG, EPOS, PXSL, POWR, AGIN, MWIN, MWIP, MWPP, ESTG).
                               # No ID number attached. Do not send new command until final reply.

- id: locked_response
  type: string
  values: ["LOCKED"]            # Returned when RS-232C control locked via operation lock function.

- id: power_state
  type: enum
  values: [standby, normal, input_signal_waiting]

- id: input_mode
  type: enum
  values: [PC1_DIGITAL, PC2_ANALOG, AV2_COMPONENT, AV3_VIDEO, PC3_ANALOG, AV1_DIGITAL]

- id: temperature_state
  type: enum
  values: [normal, abnormal_standby, abnormal_resumed, abnormal_backlight_dim, sensor_abnormal]

- id: standby_cause
  type: enum
  values: [none, power_button, main_power_switch_off, rs232c, no_signal, abnormal_temperature, schedule]
```

## Variables
```yaml
# Reusable named state variables queryable via R-direction commands.

- id: volume
  range: [0, 31]
  unit: level
  query_command: "VOLM????"

- id: contrast
  range: [0, 60]
  unit: level
  query_command: "CONT????"

- id: black_level
  range: [0, 60]
  unit: level
  query_command: "BLVL????"

- id: tint
  range: [0, 60]
  unit: level
  query_command: "TINT????"

- id: color
  range: [0, 60]
  unit: level
  query_command: "COLR????"

- id: sharpness
  range: [0, 24]
  unit: level
  query_command: "SHRP????"

- id: treble
  range: [-10, 10]
  unit: level
  query_command: "AUTR????"

- id: bass
  range: [-10, 10]
  unit: level
  query_command: "AUBS????"

- id: balance
  range: [-10, 10]
  unit: level
  query_command: "AUBL????"

- id: brightness
  range: [0, 31]
  unit: level
  query_command: "VLMP????"

- id: monitor_id
  range: [0, 255]
  unit: integer
  query_command: "IDST????"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are replies to PC-initiated commands.
# UNRESOLVED: no async event mechanism described in source.
```

## Macros
```yaml
# Repeater control pattern documented in source (broadcast a single set command to all
# daisy-chained monitors by setting 4th parameter character to "+").

- id: repeater_broadcast_example
  steps:
    - command: "VOLM030+"        # Sets volume of ALL chained monitors to 30
    - await: "WAIT"
    - collect: ["OK001", "OK002", "OK003", "OK004"]  # one OK per assigned monitor

- id: idst_auto_assign
  description: "Auto-assign sequential IDs to all chained monitors via IDST + repeater."
  steps:
    - command: "IDST001+"        # ID setting command with repeater control
    - await: "WAIT"
    - collect: ["OK001", "OK002", "OK003", "OK004"]
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: POWR
    note: "Power-on commands affect display state; provide >=100ms interval after OK before next command."
  - command: INPS
    note: "Returns WAIT; do not send new command until final OK received."
temperature_monitoring:
  - query_command: "DSTA????"
    note: "Returns 0-4 temperature state. Values 1-3 indicate prior/active thermal abnormality; value 4 indicates sensor fault."
# UNRESOLVED: no explicit power-on sequencing interlock, fuse, or mains procedure stated in source.
```

## Notes
- **Command format**: 4-char command field + 4-char parameter field. Parameter MUST be 4 characters — pad with spaces if needed (e.g. `VOLM   30`, not `VOLM30`). Exception: `MPOS`, `DATE`, `SC01`-`SC08` do NOT use spaces; parameters are fixed-width per spec.
- **Negative values**: 3-digit signed form, e.g. `AUTR-009`.
- **Return code terminator**: `0DH`, `0AH`, or `0DH` (per source).
- **Response codes**: `OK` (success), `ERR` (unknown command / unusable in current state), `WAIT` (processing — do not send next command), `LOCKED` (RS-232C operation lock active).
- **ID-suffixed responses**: when an ID is assigned, OK/ERR/WAIT may be followed by space + 3-digit monitor ID (e.g. `OK 001`). WAIT has no ID attached.
- **No response scenarios**: bad physical connection returns nothing; targeting a non-existent ID returns nothing.
- **WAIT-producing commands**: repeater control, `IDSL`, `IDLK`, `RSET`, `INPS`, `ASNC`, `WIDE`, `EMAG`, `EPOS`, `PXSL`, `POWR`, `AGIN`, `MWIN`, `MWIP`, `MWPP`, `ESTG`.
- **Timing**: command-response timeout ≥ 10 seconds; inter-command interval ≥ 100 ms after response.
- **Daisy chain**: up to 25 monitors, RS-232C IN→OUT straight cable. Each monitor may have an assigned ID (0-255, 0 = unassigned).
- **Repeater control**: 4th parameter character `+` broadcasts to all chained monitors. Cancels any active `IDSL`/`IDLK` designation. Cannot be used with commands whose parameter exceeds 4 characters.
- **RS-232C lock**: when the operation lock function is set to LOCKED, all RS-232C control is disabled and returns `LOCKED`.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: full model variant matrix (PN-G655U vs -RU vs -R) not enumerated. -->
<!-- UNRESOLVED: TCP/IP / LAN / network control not described in this excerpt — only RS-232C. -->
<!-- UNRESOLVED: ALCK param values 1 vs 2 (lock modes) not described beyond "0:OFF". -->
<!-- UNRESOLVED: LANG param value 6 (blank label in source table) — language unspecified. -->
<!-- UNRESOLVED: STCA cause code 5 and 7 not listed in source (gap in 0-8 enum). -->
<!-- UNRESOLVED: exact ENLARGE "Image Position" semantics per EMAG mode — source references "See page 21" not in excerpt. -->
<!-- UNRESOLVED: mains power switch interlock procedure not stated in excerpt. -->
````

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - manualmachine.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_PNG655.pdf
  - https://manualmachine.com/sharp/png655u/560587-user-manual/
  - https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html
  - "https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html?page=32"
  - "https://www.manualslib.com/manual/151721/Sharp-Pn-G655u.html?page=33"
retrieved_at: 2026-06-15T03:07:18.125Z
last_checked_at: 2026-06-16T07:15:41.933Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:15:41.933Z
matched_actions: 100
action_count: 100
confidence: medium
summary: "All 100 spec actions matched verbatim to source commands with correct parameters and shapes; transport settings verified; complete coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP / LAN control not described in source excerpt — only RS-232C documented."
- "firmware version compatibility not stated in source."
- "full model variant list (PN-G655U vs PN-G655U-RU vs PN-G655U-R) not enumerated in source."
- "no async event mechanism described in source."
- "no explicit power-on sequencing interlock, fuse, or mains procedure stated in source."
- "full model variant matrix (PN-G655U vs -RU vs -R) not enumerated."
- "TCP/IP / LAN / network control not described in this excerpt — only RS-232C."
- "ALCK param values 1 vs 2 (lock modes) not described beyond \"0:OFF\"."
- "LANG param value 6 (blank label in source table) — language unspecified."
- "STCA cause code 5 and 7 not listed in source (gap in 0-8 enum)."
- "exact ENLARGE \"Image Position\" semantics per EMAG mode — source references \"See page 21\" not in excerpt."
- "mains power switch interlock procedure not stated in excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
