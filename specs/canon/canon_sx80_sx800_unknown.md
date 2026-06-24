---
spec_id: admin/canon-sx80-sx800
schema_version: ai4av-public-spec-v1
revision: 1
title: "Canon SX80 / SX800 Control Spec"
manufacturer: Canon
model_family: "SX80 MarkII"
aliases: []
compatible_with:
  manufacturers:
    - Canon
  models:
    - "SX80 MarkII"
    - "SX80 MarkIIM"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atec.ro
  - cdn.marketing-cloud.io
  - manuallib.com
  - asset.fujifilm.com
  - manualshelf.com
source_urls:
  - https://atec.ro/upload/produse/specs/Canon_XEED_SX80_Mark_II_Commands.pdf
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - https://www.manuallib.com/download//CANON-SX80-USER-MANUAL.PDF
  - https://asset.fujifilm.com/global/files/2026-04/7189d8e374796e6a81045986a72ad99e/pelco-d_protocol_specification_for_sx800_v3.20.0_en.pdf
  - https://www.manualshelf.com/manual/canon/realis-sx80/realis-sx80-commands.html
retrieved_at: 2026-05-14T13:47:40.948Z
last_checked_at: 2026-06-23T10:13:52.295Z
generated_at: 2026-06-23T10:13:52.295Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "LAN TCP port number not stated in source; serial port number for LAN connection not provided"
  - "TCP port number not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-23T10:13:52.295Z
  matched_actions: 199
  action_count: 199
  confidence: medium
  summary: "All 199 spec action units match verbatim source commands; serial transport (19200/8/N/2) confirmed; source catalogue fully represented. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Canon SX80 / SX800 Control Spec

## Summary
The Canon SX80 MarkII (and SX800 series) is a projector controllable from a PC via RS-232C serial or LAN (TCP/IP) connection. This spec covers the full ASCII command-set for power, input, image, lens, and system control as documented in the Canon User Commands specification revision 1. Commands are variable-length ASCII strings terminated by CR, LF, CR+LF, or Null; responses are prefixed with `i:`, `w:`, `e:`, or `g:`.

<!-- UNRESOLVED: LAN TCP port number not stated in source; serial port number for LAN connection not provided -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 2
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from POWER ON/OFF command
- queryable       # inferred from GET/? query commands returning state
- routable        # inferred from INPUT selection command
- levelable       # inferred from AVOL, BRI, CONT, SHARP, GAMMA, SAT commands
```

## Actions
```yaml
- id: six_axis_adjustment_set
  label: 6-Axis Adjustment ON/OFF
  kind: action
  command: "6AXADJ={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: six_axis_adjustment_get
  label: Get 6-Axis Adjustment State
  kind: query
  command: "GET 6AXADJ"
  params: []

- id: six_axis_r_set
  label: Set 6-Axis R Hue/Saturation
  kind: action
  command: "6AXR={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: R hue -20 to 20
    - name: saturation
      type: integer
      description: R saturation -20 to 20

- id: six_axis_r_get
  label: Get 6-Axis R Hue/Saturation
  kind: query
  command: "GET 6AXR"
  params: []

- id: six_axis_g_set
  label: Set 6-Axis G Hue/Saturation
  kind: action
  command: "6AXG={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: G hue -20 to 20
    - name: saturation
      type: integer
      description: G saturation -20 to 20

- id: six_axis_g_get
  label: Get 6-Axis G Hue/Saturation
  kind: query
  command: "GET 6AXG"
  params: []

- id: six_axis_b_set
  label: Set 6-Axis B Hue/Saturation
  kind: action
  command: "6AXB={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: B hue -20 to 20
    - name: saturation
      type: integer
      description: B saturation -20 to 20

- id: six_axis_b_get
  label: Get 6-Axis B Hue/Saturation
  kind: query
  command: "GET 6AXB"
  params: []

- id: six_axis_c_set
  label: Set 6-Axis C Hue/Saturation
  kind: action
  command: "6AXC={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: C hue -20 to 20
    - name: saturation
      type: integer
      description: C saturation -20 to 20

- id: six_axis_c_get
  label: Get 6-Axis C Hue/Saturation
  kind: query
  command: "GET 6AXC"
  params: []

- id: six_axis_m_set
  label: Set 6-Axis M Hue/Saturation
  kind: action
  command: "6AXM={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: M hue -20 to 20
    - name: saturation
      type: integer
      description: M saturation -20 to 20

- id: six_axis_m_get
  label: Get 6-Axis M Hue/Saturation
  kind: query
  command: "GET 6AXM"
  params: []

- id: six_axis_y_set
  label: Set 6-Axis Y Hue/Saturation
  kind: action
  command: "6AXY={hue},{saturation}"
  params:
    - name: hue
      type: integer
      description: Y hue -20 to 20
    - name: saturation
      type: integer
      description: Y saturation -20 to 20

- id: six_axis_y_get
  label: Get 6-Axis Y Hue/Saturation
  kind: query
  command: "GET 6AXY"
  params: []

- id: ascombo_af_set
  label: Set Auto Setup Combination AF
  kind: action
  command: "ASCOMBO_AF={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: ascombo_af_get
  label: Get Auto Setup Combination AF
  kind: query
  command: "GET ASCOMBO_AF"
  params: []

- id: ascombo_avk_set
  label: Set Auto Setup Combination AVK
  kind: action
  command: "ASCOMBO_AVK={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: ascombo_avk_get
  label: Get Auto Setup Combination AVK
  kind: query
  command: "GET ASCOMBO_AVK"
  params: []

- id: ascombo_ainp_set
  label: Set Auto Setup Combination AINP
  kind: action
  command: "ASCOMBO_AINP={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: ascombo_ainp_get
  label: Get Auto Setup Combination AINP
  kind: query
  command: "GET ASCOMBO_AINP"
  params: []

- id: ascombo_asc_set
  label: Set Auto Setup Combination ASC
  kind: action
  command: "ASCOMBO_ASC={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: ascombo_asc_get
  label: Get Auto Setup Combination ASC
  kind: query
  command: "GET ASCOMBO_ASC"
  params: []

- id: aspect_set
  label: Set Screen Aspect
  kind: action
  command: "ASPECT={value}"
  params:
    - name: value
      type: enum
      values: [AUTO, "4:3", "16:9", FULL, ZOOM, TRUE]

- id: aspect_get
  label: Get Screen Aspect
  kind: query
  command: "GET ASPECT"
  params: []

- id: autopc
  label: Auto PC
  kind: action
  command: "AUTOPC"
  params: []

- id: autosetexe_focus
  label: Auto Setup — Focus
  kind: action
  command: "AUTOSETEXE FOCUS"
  params: []

- id: autosetexe_vks
  label: Auto Setup — Vertical Keystone
  kind: action
  command: "AUTOSETEXE VKS"
  params: []

- id: autosetexe_scrn
  label: Auto Setup — Screen Color Correction
  kind: action
  command: "AUTOSETEXE SCRN"
  params: []

- id: autosetexe_input
  label: Auto Setup — Auto Signal Sensing
  kind: action
  command: "AUTOSETEXE INPUT"
  params: []

- id: avol_set
  label: Set Audio Volume
  kind: action
  command: "AVOL={level}"
  params:
    - name: level
      type: integer
      description: 0 to 20

- id: avol_get
  label: Get Audio Volume
  kind: query
  command: "GET AVOL"
  params: []

- id: blank_set
  label: Set Blank
  kind: action
  command: "BLANK={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: blank_get
  label: Get Blank State
  kind: query
  command: "GET BLANK"
  params: []

- id: blankcolor_set
  label: Set Blank Screen Color
  kind: action
  command: "BLANKCOLOR={value}"
  params:
    - name: value
      type: enum
      values: [BLACK, BLUE]

- id: blankcolor_get
  label: Get Blank Screen Color
  kind: query
  command: "GET BLANKCOLOR"
  params: []

- id: bri_set
  label: Set Brightness
  kind: action
  command: "BRI={value}"
  params:
    - name: value
      type: integer
      description: -20 to 20

- id: bri_get
  label: Get Brightness
  kind: query
  command: "GET BRI"
  params: []

- id: bvol_set
  label: Set Beep Sound
  kind: action
  command: "BVOL={value}"
  params:
    - name: value
      type: enum
      values: ["0", "1"]
      description: "0=mute, 1=output"

- id: bvol_get
  label: Get Beep Sound Setting
  kind: query
  command: "GET BVOL"
  params: []

- id: comver_get
  label: Get User Command Version
  kind: query
  command: "GET COMVER"
  params: []

- id: cont_set
  label: Set Contrast
  kind: action
  command: "CONT={value}"
  params:
    - name: value
      type: integer
      description: -20 to 20

- id: cont_get
  label: Get Contrast
  kind: query
  command: "GET CONT"
  params: []

- id: dgamma_set
  label: Set Dynamic Gamma
  kind: action
  command: "DGAMMA={value}"
  params:
    - name: value
      type: enum
      values: [OFF, WEAK, STRONG]

- id: dgamma_get
  label: Get Dynamic Gamma
  kind: query
  command: "GET DGAMMA"
  params: []

- id: dots_set
  label: Set Total Number of Dots
  kind: action
  command: "DOTS={value}"
  params:
    - name: value
      type: integer
      description: Number of dots (A-RGB1/A-RGB2 input only)

- id: dots_get
  label: Get Total Number of Dots
  kind: query
  command: "GET DOTS"
  params: []

- id: dpon_set
  label: Set Direct Power-On
  kind: action
  command: "DPON={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: dpon_get
  label: Get Direct Power-On Setting
  kind: query
  command: "GET DPON"
  params: []

- id: err_get
  label: Get Error Information
  kind: query
  command: "GET ERR"
  params: []

- id: fcontdrv_set
  label: Focus Lens Continuous Drive
  kind: action
  command: "FCONTDRV={value}"
  params:
    - name: value
      type: enum
      values: [STOP, FAR, NEAR]

- id: freeze_set
  label: Set Freeze
  kind: action
  command: "FREEZE={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: freeze_get
  label: Get Freeze State
  kind: query
  command: "GET FREEZE"
  params: []

- id: fstepdrv_set
  label: Focus Lens Step Drive
  kind: action
  command: "FSTEPDRV={value}"
  params:
    - name: value
      type: enum
      values: [FAR, NEAR]

- id: gamma_set
  label: Set Gamma Adjustment
  kind: action
  command: "GAMMA={value}"
  params:
    - name: value
      type: integer
      description: -10 to 10

- id: gamma_get
  label: Get Gamma Adjustment
  kind: query
  command: "GET GAMMA"
  params: []

- id: guide_set
  label: Set Guide Display
  kind: action
  command: "GUIDE={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: guide_get
  label: Get Guide Display Setting
  kind: query
  command: "GET GUIDE"
  params: []

- id: hpix_set
  label: Set Horizontal Resolution
  kind: action
  command: "HPIX={value}"
  params:
    - name: value
      type: integer
      description: Horizontal resolution (D-RGB/A-RGB1/A-RGB2 input only)

- id: hpix_get
  label: Get Horizontal Resolution
  kind: query
  command: "GET HPIX"
  params: []

- id: vpix_set
  label: Set Vertical Resolution
  kind: action
  command: "VPIX={value}"
  params:
    - name: value
      type: integer
      description: Vertical resolution (D-RGB/A-RGB1/A-RGB2 input only)

- id: vpix_get
  label: Get Vertical Resolution
  kind: query
  command: "GET VPIX"
  params: []

- id: hpos_set
  label: Set Horizontal Position
  kind: action
  command: "HPOS={value}"
  params:
    - name: value
      type: integer
      description: Horizontal position (A-RGB1/A-RGB2 input only)

- id: hpos_get
  label: Get Horizontal Position
  kind: query
  command: "GET HPOS"
  params: []

- id: vpos_set
  label: Set Vertical Position
  kind: action
  command: "VPOS={value}"
  params:
    - name: value
      type: integer
      description: Vertical position (A-RGB1/A-RGB2 input only)

- id: vpos_get
  label: Get Vertical Position
  kind: query
  command: "GET VPOS"
  params: []

- id: hue_set
  label: Set Hue
  kind: action
  command: "HUE={value}"
  params:
    - name: value
      type: integer
      description: -20 to 20 (COMP/VIDEO/S-VIDEO/HDMI input only)

- id: hue_get
  label: Get Hue
  kind: query
  command: "GET HUE"
  params: []

- id: image_set
  label: Set Image Mode
  kind: action
  command: "IMAGE={value}"
  params:
    - name: value
      type: enum
      values: [STANDARD, PRESENTATION, SRGB, MOVIE, PHOTO, DCM_SIM]

- id: image_get
  label: Get Image Mode
  kind: query
  command: "GET IMAGE"
  params: []

- id: imageflip_set
  label: Set Flip Display
  kind: action
  command: "IMAGEFLIP={value}"
  params:
    - name: value
      type: enum
      values: [NONE, CEILING, REAR, REAR_CEILING]

- id: imageflip_get
  label: Get Flip Display Setting
  kind: query
  command: "GET IMAGEFLIP"
  params: []

- id: input_set
  label: Set Input Selection
  kind: action
  command: "INPUT={value}"
  params:
    - name: value
      type: enum
      values: [D-RGB, A-RGB1, A-RGB2, COMP, VIDEO, S-VIDEO, HDMI, USB]

- id: input_get
  label: Get Input Selection
  kind: query
  command: "GET INPUT"
  params: []

- id: keylock_set
  label: Set Keylock
  kind: action
  command: "KEYLOCK={value}"
  params:
    - name: value
      type: enum
      values: [OFF, MAIN, RC]

- id: keylock_get
  label: Get Keylock Setting
  kind: query
  command: "GET KEYLOCK"
  params: []

- id: lamp_set
  label: Set Lamp Output
  kind: action
  command: "LAMP={value}"
  params:
    - name: value
      type: enum
      values: [NORMAL, SILENT]

- id: lamp_get
  label: Get Lamp Output Setting
  kind: query
  command: "GET LAMP"
  params: []

- id: lampcounter_get
  label: Get Lamp ON Time
  kind: query
  command: "GET LAMPCOUNTER"
  params: []

- id: lang_set
  label: Set Language
  kind: action
  command: "LANG={value}"
  params:
    - name: value
      type: enum
      values: [ENG, DUT, NOR, FRA, RUS, TUR, GER, CHS, POL, ITA, CHT, HUN, SPA, KOR, CZE, POR, JPN, ARA, SWE, FIN, DAN]

- id: lang_get
  label: Get Language
  kind: query
  command: "GET LANG"
  params: []

- id: ledilluminate_set
  label: Set LED Illumination
  kind: action
  command: "LEDILLUMINATE={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: ledilluminate_get
  label: Get LED Illumination Setting
  kind: query
  command: "GET LEDILLUMINATE"
  params: []

- id: lmpt_get
  label: Get Lamp Time
  kind: query
  command: "GET LMPT"
  params: []

- id: main_power
  label: Front Panel — POWER
  kind: action
  command: "MAIN POWER"
  params: []

- id: main_power_off
  label: Front Panel — POWER OFF (double press)
  kind: action
  command: "MAIN POWER_OFF"
  params: []

- id: main_menu
  label: Front Panel — MENU
  kind: action
  command: "MAIN MENU"
  params: []

- id: main_autoset
  label: Front Panel — AUTO SET
  kind: action
  command: "MAIN AUTOSET"
  params: []

- id: main_input
  label: Front Panel — INPUT
  kind: action
  command: "MAIN INPUT"
  params: []

- id: main_autopc
  label: Front Panel — AUTOPC
  kind: action
  command: "MAIN AUTOPC"
  params: []

- id: main_keystone
  label: Front Panel — KEYSTONE
  kind: action
  command: "MAIN KEYSTONE"
  params: []

- id: main_up
  label: Front Panel — UP
  kind: action
  command: "MAIN UP"
  params: []

- id: main_up_rep
  label: Front Panel — UP Button Press Start
  kind: action
  command: "MAIN UP+REP"
  params: []

- id: main_down
  label: Front Panel — DOWN
  kind: action
  command: "MAIN DOWN"
  params: []

- id: main_down_rep
  label: Front Panel — DOWN Button Press Start
  kind: action
  command: "MAIN DOWN+REP"
  params: []

- id: main_left
  label: Front Panel — LEFT
  kind: action
  command: "MAIN LEFT"
  params: []

- id: main_left_rep
  label: Front Panel — LEFT Button Press Start
  kind: action
  command: "MAIN LEFT+REP"
  params: []

- id: main_right
  label: Front Panel — RIGHT
  kind: action
  command: "MAIN RIGHT"
  params: []

- id: main_right_rep
  label: Front Panel — RIGHT Button Press Start
  kind: action
  command: "MAIN RIGHT+REP"
  params: []

- id: main_ok
  label: Front Panel — OK
  kind: action
  command: "MAIN OK"
  params: []

- id: main_focus
  label: Front Panel — FOCUS
  kind: action
  command: "MAIN FOCUS"
  params: []

- id: main_zoom
  label: Front Panel — ZOOM
  kind: action
  command: "MAIN ZOOM"
  params: []

- id: main_rep_end
  label: Front Panel — Button Press End
  kind: action
  command: "MAIN *-REP"
  params: []

- id: memcadj_set
  label: Set Memory Color Adjustment
  kind: action
  command: "MEMCADJ={value}"
  params:
    - name: value
      type: enum
      values: [OFF, MEM_L, MEM_M, MEM_H]

- id: memcadj_get
  label: Get Memory Color Adjustment
  kind: query
  command: "GET MEMCADJ"
  params: []

- id: mode_remote
  label: Set Control Mode REMOTE (compatibility)
  kind: action
  command: "REMOTE"
  params: []

- id: mode_local
  label: Set Control Mode LOCAL (compatibility)
  kind: action
  command: "LOCAL"
  params: []

- id: mode_get
  label: Get Control Mode
  kind: query
  command: "GET MODE"
  params: []

- id: mute_set
  label: Set Mute
  kind: action
  command: "MUTE={value}"
  params:
    - name: value
      type: enum
      values: [ON, OFF]

- id: mute_get
  label: Get Mute State
  kind: query
  command: "GET MUTE"
  params: []

- id: nosig_set
  label: Set No-Signal Screen
  kind: action
  command: "NOSIG={value}"
  params:
    - name: value
      type: enum
      values: [BLACK, BLUE]

- id: nosig_get
  label: Get No-Signal Screen Setting
  kind: query
  command: "GET NOSIG"
  params: []

- id: pjon_set
  label: Set Startup Display Screen
  kind: action
  command: "PJON={value}"
  params:
    - name: value
      type: enum
      values: [CANON, SKIP]

- id: pjon_get
  label: Get Startup Display Screen Setting
  kind: query
  command: "GET PJON"
  params: []

- id: pmm_set
  label: Set Power Management
  kind: action
  command: "PMM={value}"
  params:
    - name: value
      type: enum
      values: [OFF, STANDBY, EXIT]

- id: pmm_get
  label: Get Power Management Setting
  kind: query
  command: "GET PMM"
  params: []

- id: power_on
  label: Power ON
  kind: action
  command: "POWER ON"
  params: []

- id: power_off
  label: Power OFF
  kind: action
  command: "POWER OFF"
  params: []

- id: power_get
  label: Get Power State
  kind: query
  command: "GET POWER"
  params: []

- id: prodcode_get
  label: Get Product Code
  kind: query
  command: "GET PRODCODE"
  params: []

- id: prog_set
  label: Set Progressive Conversion
  kind: action
  command: "PROG={value}"
  params:
    - name: value
      type: enum
      values: ["0", "1", "2"]
      description: "0=OFF, 1=ON, 2=AUTO"

- id: prog_get
  label: Get Progressive Conversion Setting
  kind: query
  command: "GET PROG"
  params: []

- id: rc_power
  label: Remote Control — POWER
  kind: action
  command: "RC POWER"
  params: []

- id: rc_power_off
  label: Remote Control — POWER OFF (double press)
  kind: action
  command: "RC POWER_OFF"
  params: []

- id: rc_menu
  label: Remote Control — MENU
  kind: action
  command: "RC MENU"
  params: []

- id: rc_autoset
  label: Remote Control — AUTO SET
  kind: action
  command: "RC AUTOSET"
  params: []

- id: rc_input
  label: Remote Control — INPUT
  kind: action
  command: "RC INPUT"
  params: []

- id: rc_aspect
  label: Remote Control — ASPECT
  kind: action
  command: "RC ASPECT"
  params: []

- id: rc_autopc
  label: Remote Control — AUTOPC
  kind: action
  command: "RC AUTOPC"
  params: []

- id: rc_keystone
  label: Remote Control — KEYSTONE
  kind: action
  command: "RC KEYSTONE"
  params: []

- id: rc_up
  label: Remote Control — UP
  kind: action
  command: "RC UP"
  params: []

- id: rc_up_rep
  label: Remote Control — UP Button Press Start
  kind: action
  command: "RC UP+REP"
  params: []

- id: rc_down
  label: Remote Control — DOWN
  kind: action
  command: "RC DOWN"
  params: []

- id: rc_down_rep
  label: Remote Control — DOWN Button Press Start
  kind: action
  command: "RC DOWN+REP"
  params: []

- id: rc_left
  label: Remote Control — LEFT
  kind: action
  command: "RC LEFT"
  params: []

- id: rc_left_rep
  label: Remote Control — LEFT Button Press Start
  kind: action
  command: "RC LEFT+REP"
  params: []

- id: rc_right
  label: Remote Control — RIGHT
  kind: action
  command: "RC RIGHT"
  params: []

- id: rc_right_rep
  label: Remote Control — RIGHT Button Press Start
  kind: action
  command: "RC RIGHT+REP"
  params: []

- id: rc_ok
  label: Remote Control — OK
  kind: action
  command: "RC OK"
  params: []

- id: rc_image
  label: Remote Control — IMAGE
  kind: action
  command: "RC IMAGE"
  params: []

- id: rc_freeze
  label: Remote Control — FREEZE
  kind: action
  command: "RC FREEZE"
  params: []

- id: rc_vol_p
  label: Remote Control — VOL+
  kind: action
  command: "RC VOL_P"
  params: []

- id: rc_vol_p_rep
  label: Remote Control — VOL+ Button Press Start
  kind: action
  command: "RC VOL_P+REP"
  params: []

- id: rc_vol_m
  label: Remote Control — VOL-
  kind: action
  command: "RC VOL_M"
  params: []

- id: rc_vol_m_rep
  label: Remote Control — VOL- Button Press Start
  kind: action
  command: "RC VOL_M+REP"
  params: []

- id: rc_blank
  label: Remote Control — BLANK
  kind: action
  command: "RC BLANK"
  params: []

- id: rc_mute
  label: Remote Control — MUTE
  kind: action
  command: "RC MUTE"
  params: []

- id: rc_p_timer
  label: Remote Control — P-TIMER
  kind: action
  command: "RC P_TIMER"
  params: []

- id: rc_lamp
  label: Remote Control — LAMP
  kind: action
  command: "RC LAMP"
  params: []

- id: rc_dzoom_p
  label: Remote Control — DZOOM+
  kind: action
  command: "RC DZOOM_P"
  params: []

- id: rc_dzoom_p_rep
  label: Remote Control — DZOOM+ Button Press Start
  kind: action
  command: "RC DZOOM_P+REP"
  params: []

- id: rc_dzoom_m
  label: Remote Control — DZOOM-
  kind: action
  command: "RC DZOOM_M"
  params: []

- id: rc_dzoom_m_rep
  label: Remote Control — DZOOM- Button Press Start
  kind: action
  command: "RC DZOOM_M+REP"
  params: []

- id: rc_focus
  label: Remote Control — FOCUS
  kind: action
  command: "RC FOCUS"
  params: []

- id: rc_zoom
  label: Remote Control — ZOOM
  kind: action
  command: "RC ZOOM"
  params: []

- id: rc_rep_end
  label: Remote Control — Button Press End
  kind: action
  command: "RC *-REP"
  params: []

- id: rcch_set
  label: Set Remote Control Channel
  kind: action
  command: "RCCH={value}"
  params:
    - name: value
      type: enum
      values: ["1", "2"]

- id: rcch_get
  label: Get Remote Control Channel
  kind: query
  command: "GET RCCH"
  params: []

- id: reset_lamptime
  label: Reset Lamp Time
  kind: action
  command: "RESET LAMPTIME"
  params: []

- id: reset_image
  label: Reset Current Image Adjustment
  kind: action
  command: "RESET IMAGE"
  params: []

- id: reset_system
  label: Reset System to Factory Settings
  kind: action
  command: "RESET SYSTEM"
  params: []

- id: reset_all
  label: Reset All Settings
  kind: action
  command: "RESET ALL"
  params: []

- id: rgbgain_set
  label: Set RGB Gain Adjustment
  kind: action
  command: "RGBGAIN={r},{g},{b}"
  params:
    - name: r
      type: integer
      description: R gain -60 to 60
    - name: g
      type: integer
      description: G gain -60 to 60
    - name: b
      type: integer
      description: B gain -60 to 60

- id: rgbgain_get
  label: Get RGB Gain Adjustment
  kind: query
  command: "GET RGBGAIN"
  params: []

- id: rgboffset_set
  label: Set RGB Offset Adjustment
  kind: action
  command: "RGBOFFSET={r},{g},{b}"
  params:
    - name: r
      type: integer
      description: R offset -60 to 60
    - name: g
      type: integer
      description: G offset -60 to 60
    - name: b
      type: integer
      description: B offset -60 to 60

- id: rgboffset_get
  label: Get RGB Offset Adjustment
  kind: query
  command: "GET RGBOFFSET"
  params: []

- id: romver_get
  label: Get ROM Version
  kind: query
  command: "GET ROMVER"
  params: []

- id: sat_set
  label: Set Color Saturation
  kind: action
  command: "SAT={value}"
  params:
    - name: value
      type: integer
      description: -20 to 20

- id: sat_get
  label: Get Color Saturation
  kind: query
  command: "GET SAT"
  params: []

- id: scrnaspect_set
  label: Set Screen Aspect
  kind: action
  command: "SCRNASPECT={value}"
  params:
    - name: value
      type: enum
      values: ["4:3", "16:9", "16:9_DIS"]

- id: scrnaspect_get
  label: Get Screen Aspect Setting
  kind: query
  command: "GET SCRNASPECT"
  params: []

- id: sel_set
  label: Set Input Signal Selection
  kind: action
  command: "SEL={value}"
  params:
    - name: value
      type: enum
      values: [AUTO]

- id: sel_get
  label: Get Detected Input Signal
  kind: query
  command: "GET SEL"
  params: []

- id: sharp_set
  label: Set Sharpness
  kind: action
  command: "SHARP={value}"
  params:
    - name: value
      type: integer
      description: -10 to 10

- id: sharp_get
  label: Get Sharpness
  kind: query
  command: "GET SHARP"
  params: []

- id: signalstatus_get
  label: Get Signal Status
  kind: query
  command: "GET SIGNALSTATUS"
  params: []

- id: track_set
  label: Set Tracking Adjustment
  kind: action
  command: "TRACK={value}"
  params:
    - name: value
      type: integer
      description: Tracking value (A-RGB1/A-RGB2 input only)

- id: track_get
  label: Get Tracking Adjustment
  kind: query
  command: "GET TRACK"
  params: []

- id: vks_set
  label: Set Vertical Keystone
  kind: action
  command: "VKS={value}"
  params:
    - name: value
      type: integer
      description: Vertical keystone distortion value

- id: vks_get
  label: Get Vertical Keystone Setting
  kind: query
  command: "GET VKS"
  params: []

- id: wb_set
  label: Set Screen Color Correction
  kind: action
  command: "WB={value}"
  params:
    - name: value
      type: enum
      values: [NORMAL, GREENBOARD, ADJUST]

- id: wb_get
  label: Get Screen Color Correction
  kind: query
  command: "GET WB"
  params: []

- id: wbrgb_set
  label: Set Screen Color Correction RGB Adjustment
  kind: action
  command: "WBRGB={r},{g},{b}"
  params:
    - name: r
      type: integer
      description: R adjustment -20 to 20
    - name: g
      type: integer
      description: G adjustment -20 to 20
    - name: b
      type: integer
      description: B adjustment -20 to 20

- id: wbrgb_get
  label: Get Screen Color Correction RGB Adjustment
  kind: query
  command: "GET WBRGB"
  params: []

- id: zcontdrv_set
  label: Zoom Lens Continuous Drive
  kind: action
  command: "ZCONTDRV={value}"
  params:
    - name: value
      type: enum
      values: [STOP, WIDE, TELE]

- id: zstepdrv_set
  label: Zoom Lens Step Drive
  kind: action
  command: "ZSTEPDRV={value}"
  params:
    - name: value
      type: enum
      values: [WIDE, TELE]
```

## Feedbacks

```yaml
- id: power_status
  query_command: "GET POWER"
  description: Returns g:POWER=OFF|OFF2ON|ON|ON2PMM|PMM|PMM2ON|ON2OFF

- id: input_status
  query_command: "GET INPUT"
  description: Returns g:INPUT=<current input selection>

- id: error_status
  query_command: "GET ERR"
  description: Returns g:ERR=NO_ERROR|ABNORMAL_TEMPERATURE|FAULTY_LAMP|FAULTY_LAMP_COVER|FAULTY_COOLING_FAN|FAULTY_POWER_SUPPLY|FAULTY_AK|FAULTY_ASC|FAULTY_AF|FAULTY_POWER_ZOOM|FAULTY_POWER_FOCUS

- id: signal_status
  query_command: "GET SIGNALSTATUS"
  description: Returns g:SIGNALSTATUS=NO_SIGNAL|DISPLAYING|SETTING

- id: lamp_counter
  query_command: "GET LAMPCOUNTER"
  description: Returns g:LAMPCOUNTER="<encoded string indicating lamp hours>"

- id: lamp_time
  query_command: "GET LMPT"
  description: Returns g:LMPT=<hhhh>:<mm> (hours:minutes)

- id: product_code
  query_command: "GET PRODCODE"
  description: Returns g:PRODCODE="SX80MarkII" or "SX80MarkIIM"

- id: rom_version
  query_command: "GET ROMVER"
  description: Returns g:ROMVER="<version string>"

- id: command_version
  query_command: "GET COMVER"
  description: Returns g:COMVER="<version string>"

- id: image_mode
  query_command: "GET IMAGE"
  description: Returns g:IMAGE=STANDARD|PRESENTATION|SRGB|MOVIE|PHOTO|DCM_SIM

- id: blank_state
  query_command: "GET BLANK"
  description: Returns g:BLANK=ON|OFF

- id: freeze_state
  query_command: "GET FREEZE"
  description: Returns g:FREEZE=ON|OFF

- id: mute_state
  query_command: "GET MUTE"
  description: Returns g:MUTE=ON|OFF

- id: volume_level
  query_command: "GET AVOL"
  description: Returns g:AVOL=<0-20>
```

## Variables

[]

## Events

[]

## Macros

[]

## Safety

```yaml
confirmation_required_for: []
interlocks:
  - DPON=ON cannot be set when PMM=OFF (projector returns e:1004 POWER_MANAGEMENT_OFF)
  - PMM=OFF cannot be set when DPON=ON (projector returns e:1005 DIRECT_POWER_ON)
  - RESET SYSTEM and RESET ALL require power cycle after execution
  - FCONTDRV and ZCONTDRV continuous drives must be stopped with STOP before issuing most other commands
```

## Notes

Commands are ASCII strings terminated by CR, LF, CR+LF, or Null (00h); the projector auto-detects the delimiter type and mirrors it in responses. Serial connection uses RS-232C at 19200 baud, 8N2, no flow control; LAN uses TCP/IP (port unspecified in source). Responses are prefixed: `i:` for status (OK/BUSY), `w:` for warnings, `e:` for errors, `g:` for GET query replies. Commands may also use the `?` prefix as an alternative to `GET` for reference queries (e.g., `?POWER` is equivalent to `GET POWER`).

## Provenance

```yaml
source_domains:
  - atec.ro
  - cdn.marketing-cloud.io
  - manuallib.com
  - asset.fujifilm.com
  - manualshelf.com
source_urls:
  - https://atec.ro/upload/produse/specs/Canon_XEED_SX80_Mark_II_Commands.pdf
  - https://cdn.marketing-cloud.io/wp-content/canon_rebranding/uploads/2025/03/24155528/XC_Control_Protocol_specification_008.pdf
  - https://www.manuallib.com/download//CANON-SX80-USER-MANUAL.PDF
  - https://asset.fujifilm.com/global/files/2026-04/7189d8e374796e6a81045986a72ad99e/pelco-d_protocol_specification_for_sx800_v3.20.0_en.pdf
  - https://www.manualshelf.com/manual/canon/realis-sx80/realis-sx80-commands.html
retrieved_at: 2026-05-14T13:47:40.948Z
last_checked_at: 2026-06-23T10:13:52.295Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T10:13:52.295Z
matched_actions: 199
action_count: 199
confidence: medium
summary: "All 199 spec action units match verbatim source commands; serial transport (19200/8/N/2) confirmed; source catalogue fully represented. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "LAN TCP port number not stated in source; serial port number for LAN connection not provided"
- "TCP port number not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
