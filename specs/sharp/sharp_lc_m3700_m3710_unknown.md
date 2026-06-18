---
spec_id: admin/sharp-lc-m3700-m3710
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp LC-M3700 / LC-M3700P / LC-M3710 / LC-M3710P Control Spec"
manufacturer: Sharp
model_family: LC-M3700
aliases: []
compatible_with:
  manufacturers:
    - Sharp
  models:
    - LC-M3700
    - LC-M3700P
    - LC-M3710
    - LC-M3710P
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - business.sharpusa.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_LCM3700.pdf
  - "https://www.manualslib.com/manual/151442/Sharp-Lc-M3700.html?page=47"
retrieved_at: 2026-06-15T12:48:59.649Z
last_checked_at: 2026-06-16T07:15:41.064Z
generated_at: 2026-06-16T07:15:41.064Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not list firmware version compatibility ranges"
  - "source does not document any unsolicited event messages from the monitor"
  - "no high-voltage / electrical safety interlocks documented in RS-232C spec"
  - "firmware version compatibility not stated; recovery from invalid/bad cable conditions (source only says \"nothing is returned\"); DC/AC power specifications of the monitor itself"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:15:41.064Z
  matched_actions: 153
  action_count: 153
  confidence: medium
  summary: "All 153 spec actions match verbatim source commands; transport params verified; bidirectional coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Sharp LC-M3700 / LC-M3710 Control Spec

## Summary
RS-232C command set for Sharp LC-M3700, LC-M3700P, LC-M3710, and LC-M3710P LCD monitors. Control is achieved via a PC connected to the monitor's RS-232C INPUT (and chained via RS-232C OUTPUT for up to ~20 monitors). The spec covers power, input selection, picture/audio adjustment, geometry, wide mode, enlarge, ID assignment/repeater, control lock/PIN, and status query commands.

<!-- UNRESOLVED: source does not list firmware version compatibility ranges -->

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
  type: none  # inferred: no login/password procedure in source
```

## Traits
```yaml
- powerable       # POWR 0/1 power setting
- routable        # INP1/INP2/INP3/INPC input selection
- queryable       # "?" parameter returns current value (WR commands)
- levelable       # VOLM, CONT, BLVL, COLR, TINT, SHRP, TRBL, BASS, BLNC, REDG, GREN, BLUE
- controllable    # CMHR/CMHY/CMHG/CMHC/CMHB/CMHM CMS H/S/V; PXSL resolution; WIDE; PFLP; EMAG; EPOS; DNR; QSDV; MOSP; PMNG; CTMP; BLAK; 3DYC; MNCR; FILM; IPST; ODSP; FINP; SNDS; COVR
```

## Actions
```yaml
# Power control, etc.
- id: power_setting
  label: Power Setting
  kind: action
  command: "POWR{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0 = Switches to standby; 1 = Returns from standby"
- id: power_status
  label: Power Status
  kind: query
  command: "POWR????"
- id: channel_display
  label: Channel Display
  kind: action
  command: "DISP    "
  params: []
  notes: "Parameter is fixed to '-' (dash) in source; no parameter field value listed."
- id: volume
  label: Volume
  kind: action
  command: "VOLM{level}"
  params:
    - name: level
      type: integer
      range: 0-60
- id: volume_query
  label: Volume Query
  kind: query
  command: "VOLM????"
- id: mute
  label: Mute
  kind: action
  command: "MUTE{state}"
  params:
    - name: state
      type: integer
      values: [0, 1]
      description: "0 = Off; 1 = On"
- id: mute_query
  label: Mute Query
  kind: query
  command: "MUTE????"
- id: sync_check
  label: Sync Check
  kind: action
  command: "SYNC{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0 = returns Yes/No; 1 = returns frequency"
- id: cause_of_last_standby_reset
  label: Cause Of Last Standby (Reset)
  kind: action
  command: "STCA0000"
  notes: "Content initialization"
- id: cause_of_last_standby_query
  label: Cause Of Last Standby (Query)
  kind: query
  command: "STCA????"
- id: cause_of_last_error_reset
  label: Cause Of Last Error (Reset)
  kind: action
  command: "ERCA0000"
  notes: "Content initialization"
- id: cause_of_last_error_query
  label: Cause Of Last Error (Query)
  kind: query
  command: "ERCA????"
- id: brightness_vlamp
  label: Brightness (VLMP)
  kind: action
  command: "VLMP{value}"
  params:
    - name: value
      type: integer
      range: -8 to 8
- id: brightness_vlamp_query
  label: Brightness Query
  kind: query
  command: "VLMP????"
- id: power_management
  label: Power Management
  kind: action
  command: "PMNG{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0 = Off; 1 = Mode1; 2 = Mode2"
- id: power_management_query
  label: Power Management Query
  kind: query
  command: "PMNG????"
- id: language
  label: Language
  kind: action
  command: "LANG{code}"
  params:
    - name: code
      type: integer
      values: [1, 2, 4, 13, 14]
      description: "1=German; 2=French; 4=Spanish; 13=Japanese; 14=English"
- id: language_query
  label: Language Query
  kind: query
  command: "LANG????"
- id: reset
  label: Reset
  kind: action
  command: "RSET{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN"
- id: reset_repeater
  label: Reset (Repeater)
  kind: action
  command: "RSE+{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; repeater control"

# Input selection, etc.
- id: inp1_select
  label: INPUT1 Selection
  kind: action
  command: "INP1{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0=Leaves selection, switches to INPUT1; 1=AV; 2=Y/C"
- id: inp1_query
  label: INPUT1 Selection Query
  kind: query
  command: "INP1????"
- id: inp2_select
  label: INPUT2 Selection
  kind: action
  command: "INP2{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 9]
      description: "0=Leaves, switches to INPUT2; 1=Input; 9=Output (ERR if INPUT set to output)"
- id: inp2_query
  label: INPUT2 Selection Query
  kind: query
  command: "INP2????"
- id: inp3_select
  label: INPUT3 Selection
  kind: action
  command: "INP3{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0=Leaves, switches to INPUT3; 1=COMPONENT; 2=RGB"
- id: inp3_query
  label: INPUT3 Selection Query
  kind: query
  command: "INP3????"
- id: inpc_select
  label: PC Input Selection
  kind: action
  command: "INPC{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0=Leaves, switches to PC; 1=Analog; 2=Digital"
- id: inpc_query
  label: PC Input Selection Query
  kind: query
  command: "INPC????"
- id: inps_select
  label: Input Select
  kind: action
  command: "INPS{source}"
  params:
    - name: source
      type: integer
      values: [0, 1, 2, 4, 5, 6, 7]
      description: "0=Toggle; 1=INPUT1 video; 2=INPUT1 S-video; 4=INPUT2 video; 5=INPUT3; 6=PC D-sub; 7=PC DVI"
- id: inps_query
  label: Input Select Query
  kind: query
  command: "INPS????"
- id: itgd_toggle
  label: Input Toggle
  kind: action
  command: "ITGD0000"
  notes: "Toggle operation"
- id: iavd_select
  label: Input AV/VIDEO Direct Select
  kind: action
  command: "IAVD{source}"
  params:
    - name: source
      type: integer
      values: [1, 2, 3]
      description: "1=INPUT1; 2=INPUT2; 3=INPUT3"
- id: ipcd_select
  label: Input PC Direct Select
  kind: action
  command: "IPCD    "
  notes: "Parameter field is '-' (dash); switches input to PC"
- id: imod_query
  label: Input Source Display Query
  kind: query
  command: "IMOD????"
  notes: "Reply: 1=INPUT1; 2=INPUT2; 3=INPUT3; 5=PC"

# Picture adjustment
- id: contrast
  label: Contrast
  kind: action
  command: "CONT{value}"
  params:
    - name: value
      type: integer
      range: 0-40
- id: contrast_query
  label: Contrast Query
  kind: query
  command: "CONT????"
- id: black_level
  label: Black Level
  kind: action
  command: "BLVL{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: black_level_query
  label: Black Level Query
  kind: query
  command: "BLVL????"
- id: color
  label: Color
  kind: action
  command: "COLR{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: color_query
  label: Color Query
  kind: query
  command: "COLR????"
- id: tint
  label: Tint
  kind: action
  command: "TINT{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: tint_query
  label: Tint Query
  kind: query
  command: "TINT????"
- id: sharpness
  label: Sharpness
  kind: action
  command: "SHRP{value}"
  params:
    - name: value
      type: integer
      range: -10 to 10
- id: sharpness_query
  label: Sharpness Query
  kind: query
  command: "SHRP????"
- id: red_gain
  label: Red Gain
  kind: action
  command: "REDG{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: red_gain_query
  label: Red Gain Query
  kind: query
  command: "REDG????"
- id: green_gain
  label: Green Gain
  kind: action
  command: "GREN{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: green_gain_query
  label: Green Gain Query
  kind: query
  command: "GREN????"
- id: blue_gain
  label: Blue Gain
  kind: action
  command: "BLUE{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: blue_gain_query
  label: Blue Gain Query
  kind: query
  command: "BLUE????"

# C.M.S. Hue
- id: cms_hue_red
  label: C.M.S. Hue Red
  kind: action
  command: "CMHR{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_hue_yellow
  label: C.M.S. Hue Yellow
  kind: action
  command: "CMHY{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_hue_green
  label: C.M.S. Hue Green
  kind: action
  command: "CMHG{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_hue_cyan
  label: C.M.S. Hue Cyan
  kind: action
  command: "CMHC{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_hue_blue
  label: C.M.S. Hue Blue
  kind: action
  command: "CMHB{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_hue_magenta
  label: C.M.S. Hue Magenta
  kind: action
  command: "CMHM{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30

# C.M.S. Saturation
- id: cms_sat_red
  label: C.M.S. Saturation Red
  kind: action
  command: "CMSR{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_sat_yellow
  label: C.M.S. Saturation Yellow
  kind: action
  command: "CMSY{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_sat_green
  label: C.M.S. Saturation Green
  kind: action
  command: "CMSG{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_sat_cyan
  label: C.M.S. Saturation Cyan
  kind: action
  command: "CMSC{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_sat_blue
  label: C.M.S. Saturation Blue
  kind: action
  command: "CMSB{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_sat_magenta
  label: C.M.S. Saturation Magenta
  kind: action
  command: "CMSM{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30

# C.M.S. Value
- id: cms_val_red
  label: C.M.S. Value Red
  kind: action
  command: "CMVR{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_val_yellow
  label: C.M.S. Value Yellow
  kind: action
  command: "CMVY{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_val_green
  label: C.M.S. Value Green
  kind: action
  command: "CMVG{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_val_cyan
  label: C.M.S. Value Cyan
  kind: action
  command: "CMVC{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_val_blue
  label: C.M.S. Value Blue
  kind: action
  command: "CMVB{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: cms_val_magenta
  label: C.M.S. Value Magenta
  kind: action
  command: "CMVM{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30

- id: color_temp
  label: Color Temperature
  kind: action
  command: "CTMP{value}"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0=Low; 1=Mid-Low; 2=Mid; 3=Mid-High; 4=High"
- id: color_temp_query
  label: Color Temperature Query
  kind: query
  command: "CTMP????"
- id: black
  label: Black (Backlight Emphasis)
  kind: action
  command: "BLAK{value}"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off; 1=High; 2=Low"
- id: black_query
  label: Black Query
  kind: query
  command: "BLAK????"
- id: yc_3d
  label: 3D-Y/C
  kind: action
  command: "3DYC{value}"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Standard; 1=Fast; 2=Slow"
- id: yc_3d_query
  label: 3D-Y/C Query
  kind: query
  command: "3DYC????"
- id: monochrome
  label: Monochrome
  kind: action
  command: "MNCR{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off; 1=On"
- id: monochrome_query
  label: Monochrome Query
  kind: query
  command: "MNCR????"
- id: film_mode
  label: Film Mode
  kind: action
  command: "FILM{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off; 1=On"
- id: film_mode_query
  label: Film Mode Query
  kind: query
  command: "FILM????"
- id: ip_setting
  label: I/P Setting
  kind: action
  command: "IPST{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Interlace; 1=Progressive"
- id: ip_setting_query
  label: I/P Setting Query
  kind: query
  command: "IPST????"

# Audio adjustment
- id: treble
  label: Treble
  kind: action
  command: "TRBL{value}"
  params:
    - name: value
      type: integer
      range: -15 to 15
- id: treble_query
  label: Treble Query
  kind: query
  command: "TRBL????"
- id: bass
  label: Bass
  kind: action
  command: "BASS{value}"
  params:
    - name: value
      type: integer
      range: -15 to 15
- id: bass_query
  label: Bass Query
  kind: query
  command: "BASS????"
- id: balance
  label: Balance
  kind: action
  command: "BLNC{value}"
  params:
    - name: value
      type: integer
      range: -30 to 30
- id: balance_query
  label: Balance Query
  kind: query
  command: "BLNC????"
- id: color_system
  label: Color System
  kind: action
  command: "CLSY{sys}"
  params:
    - name: sys
      type: integer
      values: [0, 1, 3, 4, 5]
      description: "0=AUTO; 1=PAL; 3=SECAM; 4=NTSC358; 5=NTSC443"
- id: color_system_query
  label: Color System Query
  kind: query
  command: "CLSY????"

# Position / Fine sync
- id: hpos_av
  label: H-Position (AV)
  kind: action
  command: "HPOS{value}"
  params:
    - name: value
      type: integer
      range: -10 to 10
- id: hpos_av_query
  label: H-Position (AV) Query
  kind: query
  command: "HPOS????"
- id: hpos_pc
  label: H-Position (PC)
  kind: action
  command: "HPOS{value}"
  params:
    - name: value
      type: integer
      range: 0-180
- id: vpos_av
  label: V-Position (AV)
  kind: action
  command: "VPOS{value}"
  params:
    - name: value
      type: integer
      range: -20 to 20
- id: vpos_av_query
  label: V-Position (AV) Query
  kind: query
  command: "VPOS????"
- id: vpos_pc
  label: V-Position (PC)
  kind: action
  command: "VPOS{value}"
  params:
    - name: value
      type: integer
      range: 0-99
- id: clock
  label: Clock
  kind: action
  command: "CLCK{value}"
  params:
    - name: value
      type: integer
      range: 0-180
  notes: "Returns ERR in case of a video signal"
- id: clock_query
  label: Clock Query
  kind: query
  command: "CLCK????"
- id: phase
  label: Phase
  kind: action
  command: "PHSE{value}"
  params:
    - name: value
      type: integer
      range: 0-40
  notes: "Returns ERR in case of a video signal"
- id: phase_query
  label: Phase Query
  kind: query
  command: "PHSE????"
- id: auto_sync
  label: Auto Sync
  kind: action
  command: "ASNC{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0=Abort; 1=Start"
- id: auto_sync_asae
  label: Auto Sync (ASAE)
  kind: action
  command: "ASAE{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Setting cancel; 1=Automatic execution when PC sync is input"
- id: auto_sync_asae_query
  label: Auto Sync (ASAE) Query
  kind: query
  command: "ASAE????"

# Wide mode (AV)
- id: wide_av
  label: Wide Mode (AV)
  kind: action
  command: "WIDE{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      description: "0=Toggle; 1=Normal; 2=Full 14:9; 3=Zoom 14:9; 4=Panorama; 5=Cinema 14:9; 6=Cinema 16:9; 7=Full; 8=Underscan"
- id: wide_av_query
  label: Wide Mode (AV) Query
  kind: query
  command: "WIDE????"

# Wide mode (PC)
- id: wide_pc
  label: Wide Mode (PC)
  kind: action
  command: "WIDE{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4]
      description: "0=Toggle; 1=Normal; 2=Full; 3=Cinema; 4=D by D"
- id: picture_flip
  label: Picture Flip
  kind: action
  command: "PFLP{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]
      description: "0=Normal; 1=Mirror; 2=Upside Down; 3=Rotate"
- id: picture_flip_query
  label: Picture Flip Query
  kind: query
  command: "PFLP????"

# Enlarge
- id: enlarge_setting
  label: Enlarge Setting
  kind: action
  command: "EMAG{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0=Off; 1=2x2; 2=3x3"
- id: enlarge_setting_query
  label: Enlarge Setting Query
  kind: query
  command: "EMAG????"
- id: enlarge_position
  label: Enlarged Image Position
  kind: action
  command: "EPOS{pos}"
  params:
    - name: pos
      type: integer
      range: 0-8
      description: "Position depends on EMAG mode: 2x2=0-3; 3x3=0-8"
- id: enlarge_position_query
  label: Enlarged Image Position Query
  kind: query
  command: "EPOS????"

# Other picture
- id: dnr
  label: DNR
  kind: action
  command: "DNR {value}"
  params:
    - name: value
      type: integer
      values: [0, 1, 2]
      description: "0=Off; 1=Low; 2=High"
- id: dnr_query
  label: DNR Query
  kind: query
  command: "DNR ???? "
  notes: "Mnemonic is DNR_ (4-char) in source table; underscore represents trailing space per source"
- id: quick_shoot
  label: Quick Shoot
  kind: action
  command: "QSDV{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Off; 1=On"
- id: quick_shoot_query
  label: Quick Shoot Query
  kind: query
  command: "QSDV????"
- id: monitor_speaker_output
  label: Monitor Speaker Output
  kind: action
  command: "MOSP{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0=Fixed; 1=Variable"
- id: monitor_speaker_output_query
  label: Monitor Speaker Output Query
  kind: query
  command: "MOSP????"
- id: input_signal_query
  label: Input Signal Resolution Query
  kind: query
  command: "PXCK????"
  notes: "Returns current resolution in form xxx,xxx"
- id: pixel_resolution
  label: Pixel Resolution Select
  kind: action
  command: "PXSL{mode}"
  params:
    - name: mode
      type: integer
      description: "V=400 (640x400, 720x400); V=480 (640x480, 848x480, 852x480); V=768 (1024x768, 1280x768, 1366x768)"
- id: pixel_resolution_query
  label: Pixel Resolution Query
  kind: query
  command: "PXSL????"

# ID numbers
- id: id_set
  label: ID No. Setting
  kind: action
  command: "IDST{nnn}"
  params:
    - name: nnn
      type: integer
      range: 0-255
      description: "Assigns monitor ID. 'IDST001+' is repeater form to auto-assign."
- id: id_query
  label: ID No. Query
  kind: query
  command: "IDST????"
- id: id_select
  label: ID No. Setting (Once)
  kind: action
  command: "IDSL{nnn}"
  params:
    - name: nnn
      type: integer
      range: 0-255
      description: "0=Clears ID; 1-255 sets ID effective for next command only"
- id: id_lock
  label: ID No. Setting (Subsequent)
  kind: action
  command: "IDLK{nnn}"
  params:
    - name: nnn
      type: integer
      range: 0-255
      description: "0=Clears; 1-255 sets ID effective for all subsequent commands until cleared or power off"
- id: id_check
  label: ID Check
  kind: action
  command: "IDCK    "
  notes: "Parameter is '-'; displays selected ID and own ID on screen"

# Control lock
- id: lock_menu
  label: Lock Menu Display
  kind: action
  command: "LMNU{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=Menu Display not available"
- id: lock_menu_query
  label: Lock Menu Display Query
  kind: query
  command: "LMNU????"
- id: lock_remote
  label: Lock Remote Control
  kind: action
  command: "LREM{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=Disabled"
- id: lock_remote_query
  label: Lock Remote Query
  kind: query
  command: "LREM????"
- id: lock_buttons
  label: Lock Control Buttons
  kind: action
  command: "LBTN{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=Disabled"
- id: lock_buttons_query
  label: Lock Control Buttons Query
  kind: query
  command: "LBTN????"
- id: lock_power
  label: Lock Power
  kind: action
  command: "LPOW{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=Disabled"
- id: lock_power_query
  label: Lock Power Query
  kind: query
  command: "LPOW????"
- id: lock_rs232
  label: Lock RS-232C
  kind: action
  command: "LCOM{value}"
  params:
    - name: value
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=Disabled"
- id: lock_rs232_query
  label: Lock RS-232C Query
  kind: query
  command: "LCOM????"

# PIN
- id: set_pin
  label: Set PIN
  kind: action
  command: "PSET{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; activates lock function"
- id: set_pin_repeater
  label: Set PIN (Repeater)
  kind: action
  command: "PSE+{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; for repeater control"
- id: input_pin
  label: Input PIN (Temporary Unlock)
  kind: action
  command: "PINP{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; temporary unlock"
- id: input_pin_repeater
  label: Input PIN (Repeater)
  kind: action
  command: "PIN+{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; repeater temporary unlock"
- id: clear_pin
  label: Clear PIN
  kind: action
  command: "PCLR{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; permanent unlock (single monitor)"
- id: clear_pin_repeater
  label: Clear PIN (Repeater)
  kind: action
  command: "PCL+{pin}"
  params:
    - name: pin
      type: string
      description: "4-digit PIN; permanent unlock (multi-monitor)"

# Power-on method, etc.
- id: max_volume
  label: Maximum Volume Limit
  kind: action
  command: "MVOL{value}"
  params:
    - name: value
      type: integer
      range: 1-60
- id: max_volume_query
  label: Max Volume Query
  kind: query
  command: "MVOL????"
- id: fix_volume
  label: Fix Volume
  kind: action
  command: "FVOL{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0=Off; 1=Fixes volume at constant value"
- id: fix_volume_query
  label: Fix Volume Query
  kind: query
  command: "FVOL????"
- id: osd_setting
  label: OSD Setting
  kind: action
  command: "ODSP{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0=Normal; 1=No OSD displayed"
- id: osd_setting_query
  label: OSD Setting Query
  kind: query
  command: "ODSP????"
- id: display_boot_option
  label: Display Boot Option
  kind: action
  command: "FINP{value}"
  params:
    - name: value
      type: integer
      values: [0, 1, 2, 4, 5, 6, 7, 11, 12, 14, 15, 16, 17]
      description: "0=Normal; 1=INPUT1+AV; 2=INPUT1+Y/C; 4=INPUT2; 5=INPUT3; 6=PC+Analog; 7=PC+Digital; 11-17=fixed-start variants"
- id: display_boot_option_query
  label: Display Boot Option Query
  kind: query
  command: "FINP????"
- id: sound_input_select
  label: Sound Input Select
  kind: action
  command: "SNDS{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2]
      description: "0=Normal; 1=INPUT1 audio fixed; 2=INPUT2 audio fixed"
- id: sound_input_select_query
  label: Sound Input Select Query
  kind: query
  command: "SNDS????"
- id: panel_protection_cover
  label: Panel Protection Cover
  kind: action
  command: "COVR{mode}"
  params:
    - name: mode
      type: integer
      values: [0, 1]
      description: "0=Detached; 1=Attached"
- id: panel_protection_cover_query
  label: Panel Protection Cover Query
  kind: query
  command: "COVR????"

# Repeater control (composite helper)
- id: repeater_apply
  label: Repeater Control (4th char '+')
  kind: helper
  command: "{CMD}{params}+"
  notes: "Any W command becomes a repeater broadcast by replacing the 4th parameter char with '+'. E.g. VOLM030+ sets volume of all monitors to 30."
```

## Feedbacks
```yaml
- id: response_ok
  type: enum
  values: [ok]
  description: "OK (with optional ' 001' ID suffix) returned when command executed correctly"
- id: response_err
  type: enum
  values: [err]
  description: "ERR (with optional ID suffix) returned when command not executed correctly (unknown command, invalid state, or unreachable ID)"
- id: response_wait
  type: enum
  values: [wait]
  description: "WAIT returned while command is being processed; new commands are ignored until OK/ERR arrives"
- id: response_locked
  type: enum
  values: [locked]
  description: "LOCKED returned when RS-232C control is locked; only PINP/PIN+/PCLR/PCL+ accepted in this state"
- id: carriage_return
  type: string
  values: ["0x0D, 0x0A"]
  description: "All response terminators are CR LF (0DH 0AH) per source"
```

## Variables
```yaml
# Discrete parameter ranges are captured as enum/int params on each Action.
# No standalone continuous variables are documented separately in the source.
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited event messages from the monitor
```

## Macros
```yaml
- id: lock_remote_buttons_power_daisy
  label: Lock remote + monitor buttons + power (daisy chain, no ID)
  steps:
    - "PCL+{pin}"      # clear PIN (repeater)
    - "LREM001+"       # lock remote (repeater)
    - "LBTN001+"       # lock monitor buttons (repeater)
    - "LPOW001+"       # lock power (repeater)
    - "PSE+{pin}"      # set new PIN (repeater)
  notes: "Per source Example 4"
- id: lock_remote_buttons_power_id2
  label: Lock remote + monitor buttons + power for monitor ID=2
  steps:
    - "IDLK0002"       # target monitor with ID=2
    - "PCLR{oldPin}"   # clear PIN (may be empty)
    - "LREM0001"       # lock remote
    - "LBTN0001"       # lock monitor buttons
    - "LPOW0001"       # lock power
    - "PSET{newPin}"   # set new PIN
    - "IDLK0000"       # exit IDLK targeting
  notes: "Per source Example 5"
- id: auto_assign_ids_repeater
  label: Auto-assign sequential IDs 1..N via repeater
  steps:
    - "IDST001+"       # repeater command assigns IDs 1,2,3,4 in order
  notes: "After linking monitors, send IDST001+ and wait for OK 001..OK 00N responses"
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "RS-232C LOCKED state: only PINP/PIN+/PCLR/PCL+ are accepted; IDSL and IDLK are NOT accepted (source: 'If the RS-232C function is locked, the IDSL and IDLK commands cannot be used')"
  - "Power LPOW lock: locking power prevents switching from operating state to standby, but still allows standby->operating (per source)"
  - "Temporary PIN unlock auto-re-locks on: monitor entering standby, main POWER turned off, PIN changed, or lock items modified"
  - "Repeater control '+' on POFR (POWR) OFF returns response only from the monitor closest to the PC (per source)"
# UNRESOLVED: no high-voltage / electrical safety interlocks documented in RS-232C spec
```

## Notes
- Cable requirement: RS-232C **cross** cable (null-modem). Straight cable will not transmit data.
- Daisy chain: connect PC COM -> monitor1 RS-232C INPUT; then monitor1 OUTPUT -> monitor2 INPUT, etc. Up to ~20 monitors, cable-length / environment dependent.
- Command format: 4-char command + 4-char parameter, then CR (0DH). Parameter must be 4 chars (pad with spaces if needed). Parameter alphabet: 0-9, +, -, space, ?.
- Query: send `????` (or `???+` for repeater) in the parameter field for any command whose Direction is R in the table. Reply is decimal number for numeric values; `0` and `1` are used for MUTE-style bools.
- Repeater control: setting 4th character of parameter to `+` broadcasts to all daisy-chained monitors. Each connected monitor returns its own response; the caller should wait for N replies before sending the next command.
- Inter-command interval: leave ~100ms between OK/ERR and the next command. New commands sent before OK/ERR are ignored (exception: ASNC forced end).
- WAIT cases: repeater control; IDSL/IDLK; or one of RSET, INP1, INP2, INP3, INPC, INPS, ITGD, IAVD, IPCD, CLSY, ASNC, WIDE, EMAG, EPOS, PXSL, POWR.
- IDSL is one-shot; IDLK persists across commands until cleared (IDLK0000) or power off.
- LANG code mapping: 1=German, 2=French, 4=Spanish, 13=Japanese, 14=English.
- Cause-of-last-standby codes: 0=No standby (after init), 1=Error standby, 2=Invalid input (PC), 3=PC Mode1, 4=PC Mode2, 6=RS-232C command standby.
- Cause-of-last-error codes: 0=None, 1=Invalid input (PC), 2=Internal bus, 3=Abnormal temp, 4=Board connection, 5=Lamp, 7=Electrical system, 8=Microcomputer comm.
- PIXEL RESOLUTION table (PXSL): three V-tiers (V=400, V=480, V=768) each with multiple sub-modes; source uses mode 0/1/2/3 per tier.
- MNCR "Mnemonic" for MONOCHROME; DNR is shown as "DNR " in source (4-char with trailing space/underscore).
- Source notes CAUSE OF LAST STANDBY/ERROR are read-only history; STCA W=0 and ERCA W=0 reset/initialize the log content.

<!-- UNRESOLVED: firmware version compatibility not stated; recovery from invalid/bad cable conditions (source only says "nothing is returned"); DC/AC power specifications of the monitor itself -->

## Provenance

```yaml
source_domains:
  - business.sharpusa.com
  - manualslib.com
source_urls:
  - https://business.sharpusa.com/portals/0/downloads/Manuals/mon_man_LCM3700.pdf
  - "https://www.manualslib.com/manual/151442/Sharp-Lc-M3700.html?page=47"
retrieved_at: 2026-06-15T12:48:59.649Z
last_checked_at: 2026-06-16T07:15:41.064Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:15:41.064Z
matched_actions: 153
action_count: 153
confidence: medium
summary: "All 153 spec actions match verbatim source commands; transport params verified; bidirectional coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not list firmware version compatibility ranges"
- "source does not document any unsolicited event messages from the monitor"
- "no high-voltage / electrical safety interlocks documented in RS-232C spec"
- "firmware version compatibility not stated; recovery from invalid/bad cable conditions (source only says \"nothing is returned\"); DC/AC power specifications of the monitor itself"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
