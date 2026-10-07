---
spec_id: admin/onkyo-tx-nr708-nr808-rz800-rz900-rz810
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-NR708 TX-NR808 RZ800 RZ900 RZ810 Control Spec"
manufacturer: Onkyo
model_family: TX-NR708
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-NR708
    - TX-NR808
    - RZ800
    - RZ900
    - RZ810
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-27T10:49:11.715Z
last_checked_at: 2026-10-07T13:37:27.826Z
generated_at: 2026-10-07T13:37:27.826Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility per model — source covers TX-SR707/NR807 and later for some commands; target models TX-NR708/NR808/RZ800/RZ900/RZ810 may not support all listed commands."
  - "applicable range per target model'"
  - "precise response value schemas not fully enumerated in source."
  - "formal variable/parameter schemas not provided in source."
  - "complete event catalogue not enumerated; source describes"
  - "multi-step macro sequences not documented in source."
  - "no explicit safety warnings or interlock procedures in source beyond zone dependencies."
  - "firmware version compatibility for individual commands — source covers protocol v1.15 which added TX-NR1007/TX-NR3007/TX-NR5007; target models NR708/NR808/RZ800/RZ900/RZ810 may be older silicon and not support all v1.15 additions."
  - "video output resolution (VOS) command only available on Japanese model — applicability to target models unclear."
  - "video format temporary display (DIF03) shows \"No\" for all models in source — may not be implemented on target models."
  - "precise fault behavior and error recovery sequences not documented."
  - "authentication is not specified in the source."
verification:
  verdict: verified
  checked_at: 2026-10-07T13:37:27.826Z
  matched_actions: 556
  action_count: 556
  confidence: medium
  summary: "All 556 action units map one-to-one to ISCP command rows; transport matches; nothing missing; source is generic ISCP (model applicability inferred). (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Onkyo TX-NR708 TX-NR808 RZ800 RZ900 RZ810 Control Spec

## Summary
Onkyo AV receiver ISCP (Integra Serial Control Protocol) control spec covering RS-232C and Ethernet (eISCP) transport. Supports multi-zone power, volume, tone, input routing, tuner, XM/SIRIUS/HD Radio, network streaming, and ONKYO RI-connected device control. Protocol v1.15 dated 31 August 2009. Message format: `!1{cmd}{param}[CR]` for main zone, `{zone_prefix}{cmd}{param}[CR]` for zones. Response: `{cmd}{param}[EOF]`.

<!-- UNRESOLVED: firmware version compatibility per model — source covers TX-SR707/NR807 and later for some commands; target models TX-NR708/NR808/RZ800/RZ900/RZ810 may not support all listed commands. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 60128  # eISCP default; configurable 49152-65535 via setup menu
auth:
  type: UNRESOLVED
```

## Traits
```yaml
# inferred from command catalogue:
- powerable      # PWR/ZPW/PW3/PW4 on/off commands present
- routable       # SLI selector commands, SLR RECOUT, SLA audio selector, HDO/RES video routing present
- queryable      # QSTN variants present for most commands
- levelable      # MVL/ZVL/VL3/VL4 master volume; SWL/CTL subwoofer/center temp level; TFR/TFW/TFH/TCT/TSR/TSB/TSW/ZTN tone commands present
```

## Actions
```yaml
# System Power
- id: pwr_standby
  label: System Standby
  kind: action
  params: []

- id: pwr_on
  label: System On
  kind: action
  params: []

- id: pwr_status_query
  label: System Power Status Query
  kind: query
  params: []

# Audio Muting
- id: mtl_muting_off
  command: AMT
  label: Audio Muting Off
  kind: action
  params: []

- id: mtl_muting_on
  command: AMT
  label: Audio Muting On
  kind: action
  params: []

- id: mtl_muting_toggle
  command: AMT
  label: Audio Muting Wrap-Around
  kind: action
  params: []

- id: mtl_status_query
  command: AMT
  label: Audio Muting Status Query
  kind: query
  params: []

# Master Volume
- id: mvl_set
  label: Set Master Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (hex 00-64) for newer models; 0-80 (hex 00-50) for older models

- id: mvl_up
  label: Master Volume Up
  kind: action
  params: []

- id: mvl_down
  label: Master Volume Down
  kind: action
  params: []

- id: mvl_up_1db
  label: Master Volume Up 1dB Step
  kind: action
  params: []

- id: mvl_down_1db
  label: Master Volume Down 1dB Step
  kind: action
  params: []

- id: mvl_status_query
  label: Master Volume Status Query
  kind: query
  params: []

# Tone (Front)
- id: tfr_set_bass
  label: Set Front Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfr_set_treble
  label: Set Front Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfr_bass_up
  label: Front Bass Up 2 Step
  kind: action
  params: []

- id: tfr_bass_down
  label: Front Bass Down 2 Step
  kind: action
  params: []

- id: tfr_treble_up
  label: Front Treble Up 2 Step
  kind: action
  params: []

- id: tfr_treble_down
  label: Front Treble Down 2 Step
  kind: action
  params: []

- id: tfr_status_query
  label: Front Tone Status Query
  kind: query
  params: []

# Tone (Front Wide)
- id: tfw_set_bass
  label: Set Front Wide Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfw_set_treble
  label: Set Front Wide Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfw_bass_up
  label: Front Wide Bass Up 2 Step
  kind: action
  params: []

- id: tfw_bass_down
  label: Front Wide Bass Down 2 Step
  kind: action
  params: []

- id: tfw_treble_up
  label: Front Wide Treble Up 2 Step
  kind: action
  params: []

- id: tfw_treble_down
  label: Front Wide Treble Down 2 Step
  kind: action
  params: []

- id: tfw_status_query
  label: Front Wide Tone Status Query
  kind: query
  params: []

# Tone (Front High)
- id: tfh_set_bass
  label: Set Front High Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfh_set_treble
  label: Set Front High Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tfh_bass_up
  label: Front High Bass Up 2 Step
  kind: action
  params: []

- id: tfh_bass_down
  label: Front High Bass Down 2 Step
  kind: action
  params: []

- id: tfh_treble_up
  label: Front High Treble Up 2 Step
  kind: action
  params: []

- id: tfh_treble_down
  label: Front High Treble Down 2 Step
  kind: action
  params: []

- id: tfh_status_query
  label: Front High Tone Status Query
  kind: query
  params: []

# Tone (Center)
- id: tct_set_bass
  label: Set Center Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tct_set_treble
  label: Set Center Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tct_bass_up
  label: Center Bass Up 2 Step
  kind: action
  params: []

- id: tct_bass_down
  label: Center Bass Down 2 Step
  kind: action
  params: []

- id: tct_treble_up
  label: Center Treble Up 2 Step
  kind: action
  params: []

- id: tct_treble_down
  label: Center Treble Down 2 Step
  kind: action
  params: []

- id: tct_status_query
  label: Center Tone Status Query
  kind: query
  params: []

# Tone (Surround)
- id: tsr_set_bass
  label: Set Surround Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tsr_set_treble
  label: Set Surround Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tsr_bass_up
  label: Surround Bass Up 2 Step
  kind: action
  params: []

- id: tsr_bass_down
  label: Surround Bass Down 2 Step
  kind: action
  params: []

- id: tsr_treble_up
  label: Surround Treble Up 2 Step
  kind: action
  params: []

- id: tsr_treble_down
  label: Surround Treble Down 2 Step
  kind: action
  params: []

- id: tsr_status_query
  label: Surround Tone Status Query
  kind: query
  params: []

# Tone (Surround Back)
- id: tsb_set_bass
  label: Set Surround Back Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tsb_set_treble
  label: Set Surround Back Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tsb_bass_up
  label: Surround Back Bass Up 2 Step
  kind: action
  params: []

- id: tsb_bass_down
  label: Surround Back Bass Down 2 Step
  kind: action
  params: []

- id: tsb_treble_up
  label: Surround Back Treble Up 2 Step
  kind: action
  params: []

- id: tsb_treble_down
  label: Surround Back Treble Down 2 Step
  kind: action
  params: []

- id: tsb_status_query
  label: Surround Back Tone Status Query
  kind: query
  params: []

# Tone (Subwoofer)
- id: tsw_set_bass
  label: Set Subwoofer Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass value "-A"..."00"..."+A" (hex, -10...0...+10 in 2-step increments)

- id: tsw_bass_up
  label: Subwoofer Bass Up 2 Step
  kind: action
  params: []

- id: tsw_bass_down
  label: Subwoofer Bass Down 2 Step
  kind: action
  params: []

- id: tsw_status_query
  label: Subwoofer Tone Status Query
  kind: query
  params: []

# Sleep Timer
- id: slp_set_sleep
  label: Set Sleep Time
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time in minutes 1-90 (hex 01-5A)

- id: slp_off
  label: Sleep Timer Off
  kind: action
  params: []

- id: slp_up
  label: Sleep Timer Wrap-Around Up
  kind: action
  params: []

- id: slp_status_query
  label: Sleep Timer Status Query
  kind: query
  params: []

# Speaker Level Calibration
- id: slc_test
  label: Speaker Level Calibration Test
  kind: action
  params: []

- id: slc_chsel
  label: Speaker Level Calibration Channel Select
  kind: action
  params: []

- id: slc_level_up
  label: Speaker Level Calibration Level Up
  kind: action
  params: []

- id: slc_level_down
  label: Speaker Level Calibration Level Down
  kind: action
  params: []

# Subwoofer Level
- id: swl_set
  label: Set Subwoofer Level
  kind: action
  params:
    - name: level
      type: integer
      description: Subwoofer level -15dB to +12dB (hex -F to +C)

- id: swl_up
  label: Subwoofer Level Up
  kind: action
  params: []

- id: swl_down
  label: Subwoofer Level Down
  kind: action
  params: []

- id: swl_status_query
  label: Subwoofer Level Status Query
  kind: query
  params: []

# Center Level
- id: ctl_set
  label: Set Center Level
  kind: action
  params:
    - name: level
      type: integer
      description: Center level -12dB to +12dB (hex -C to +C)

- id: ctl_up
  label: Center Level Up
  kind: action
  params: []

- id: ctl_down
  label: Center Level Down
  kind: action
  params: []

- id: ctl_status_query
  label: Center Level Status Query
  kind: query
  params: []

# Display Information Query
- id: dif_program_format_query
  label: Display Program Format Query
  kind: query
  params: []

- id: dif_digital_input_query
  label: Display Digital Input Position Query
  kind: query
  params: []

- id: dif_digital_format_query
  label: Display Digital Format Query
  kind: query
  params: []

- id: dif_bass_level_query
  label: Display Bass Level Query
  kind: query
  params: []

- id: dif_treble_level_query
  label: Display Treble Level Query
  kind: query
  params: []

# Display Mode
- id: dif_selector_volume_mode
  label: Set Selector + Volume Display Mode
  kind: action
  params: []

- id: dif_selector_listening_mode
  label: Set Selector + Listening Mode Display Mode
  kind: action
  params: []

- id: dif_digital_format_temporary
  label: Display Digital Format Temporary
  kind: action
  params: []

- id: dif_video_format_temporary
  label: Display Video Format Temporary
  kind: action
  params: []

- id: dif_mode_up
  label: Display Mode Wrap-Around Up
  kind: action
  params: []

- id: dif_mode_status_query
  label: Display Mode Status Query
  kind: query
  params: []

# Dimmer
- id: dim_bright
  label: Dimmer Level Bright
  kind: action
  params: []

- id: dim_dim
  label: Dimmer Level Dim
  kind: action
  params: []

- id: dim_dark
  label: Dimmer Level Dark
  kind: action
  params: []

- id: dim_shutoff
  label: Dimmer Level Shut-Off
  kind: action
  params: []

- id: dim_bright_led_off
  label: Dimmer Level Bright and LED Off
  kind: action
  params: []

- id: dim_up
  label: Dimmer Level Wrap-Around Up
  kind: action
  params: []

- id: dim_status_query
  label: Dimmer Level Status Query
  kind: query
  params: []

# OSD Setup Operations
- id: osd_menu
  label: OSD Menu Key
  kind: action
  params: []

- id: osd_up
  label: OSD Up Key
  kind: action
  params: []

- id: osd_down
  label: OSD Down Key
  kind: action
  params: []

- id: osd_right
  label: OSD Right Key
  kind: action
  params: []

- id: osd_left
  label: OSD Left Key
  kind: action
  params: []

- id: osd_enter
  label: OSD Enter Key
  kind: action
  params: []

- id: osd_exit
  label: OSD Exit Key
  kind: action
  params: []

# Memory Setup
- id: mem_store
  label: Memory Store
  kind: action
  params: []

- id: mem_recall
  label: Memory Recall
  kind: action
  params: []

- id: mem_lock
  label: Memory Lock
  kind: action
  params: []

- id: mem_unlock
  label: Memory Unlock
  kind: action
  params: []

# Audio/Video Info Query
- id: ifa_query
  label: Audio Information Query
  kind: query
  params: []

- id: ifv_query
  label: Video Information Query
  kind: query
  params: []

# Input Selector (Main Zone)
- id: sli_select
  label: Input Selector
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # VIDEO1 VCR/DVR
        - "01"  # VIDEO2 CBL/SAT
        - "02"  # VIDEO3 GAME/TV GAME
        - "03"  # VIDEO4 AUX1(AUX)
        - "04"  # VIDEO5 AUX2
        - "10"  # DVD
        - "20"  # TAPE(1) TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "40"  # Universal PORT
        - "30"  # MULTI CH

- id: sli_up
  label: Input Selector Wrap-Around Up
  kind: action
  params: []

- id: sli_down
  label: Input Selector Wrap-Around Down
  kind: action
  params: []

- id: sli_status_query
  label: Input Selector Status Query
  kind: query
  params: []

# RECOUT Selector
- id: slr_select
  label: RECOUT Selector
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # VIDEO1
        - "01"  # VIDEO2
        - "02"  # VIDEO3
        - "03"  # VIDEO4
        - "04"  # VIDEO5
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "30"  # MULTI CH
        - "7F"  # OFF
        - "80"  # SOURCE

- id: slr_status_query
  label: RECOUT Selector Status Query
  kind: query
  params: []

# Audio Selector
- id: sla_select
  label: Audio Selector
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # AUTO
        - "01"  # MULTI-CHANNEL
        - "02"  # ANALOG
        - "06"  # BALANCE

- id: sla_up
  label: Audio Selector Wrap-Around Up
  kind: action
  params: []

- id: sla_status_query
  label: Audio Selector Status Query
  kind: query
  params: []

# 12V Trigger A
- id: tga_off
  label: 12V Trigger A Off
  kind: action
  params: []

- id: tga_on
  label: 12V Trigger A On
  kind: action
  params: []

# 12V Trigger B
- id: tgb_off
  label: 12V Trigger B Off
  kind: action
  params: []

- id: tgb_on
  label: 12V Trigger B On
  kind: action
  params: []

# 12V Trigger C
- id: tgc_off
  label: 12V Trigger C Off
  kind: action
  params: []

- id: tgc_on
  label: 12V Trigger C On
  kind: action
  params: []

# HDMI Output Selector
- id: hdo_select
  label: HDMI Output Selector
  kind: action
  params:
    - name: output
      type: enum
      values:
        - "00"  # No Analog
        - "01"  # Yes/Out Main HDMI Main
        - "02"  # Out Sub HDMI Sub
        - "03"  # Both
        - "04"  # Both(Main)
        - "05"  # Both(Sub)

- id: hdo_up
  label: HDMI Output Selector Wrap-Around Up
  kind: action
  params: []

- id: hdo_status_query
  label: HDMI Output Selector Status Query
  kind: query
  params: []

# Monitor Out Resolution
- id: res_select
  label: Monitor Out Resolution
  kind: action
  params:
    - name: resolution
      type: enum
      values:
        - "00"  # Through
        - "01"  # Auto(HDMI Output Only)
        - "02"  # 480p
        - "03"  # 720p
        - "04"  # 1080i
        - "05"  # 1080p(HDMI Output Only)
        - "06"  # Source
        - "07"  # 1080p/24fs(HDMI Output Only)

- id: res_up
  label: Monitor Out Resolution Wrap-Around Up
  kind: action
  params: []

- id: res_status_query
  label: Monitor Out Resolution Status Query
  kind: query
  params: []

# Listening Mode
- id: lmd_select
  label: Listening Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"   # STEREO
        - "01"   # DIRECT
        - "02"   # SURROUND
        - "03"   # FILM/Game-RPG
        - "04"   # THX
        - "05"   # ACTION/Game-Action
        - "06"   # MUSICAL/Game-Rock
        - "07"   # MONO MOVIE
        - "08"   # ORCHESTRA
        - "09"   # UNPLUGGED
        - "0A"   # STUDIO-MIX
        - "0B"   # TV LOGIC
        - "0C"   # ALL CH STEREO
        - "0D"   # THEATER-DIMENSIONAL
        - "0E"   # ENHANCED 7/ENHANCE/Game-Sports
        - "0F"   # MONO
        - "11"   # PURE AUDIO
        - "12"   # MULTIPLEX
        - "13"   # FULL MONO
        - "14"   # DOLBY VIRTUAL
        - "15"   # DTS Surround Sensation
        - "16"   # Audyssey DSX
        - "80"   # PLII/PLIIx Movie
        - "81"   # PLII/PLIIx Music
        - "82"   # Neo:6 Cinema
        - "83"   # Neo:6 Music
        - "87"   # Neural Surr
        - "88"   # Neural THX/Neural Surround
        - "90"   # PLIIz Height
        - "91"   # Neo:6 Cinema DTS Surround Sensation
        - "92"   # Neo:6 Music DTS Surround Sensation

- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  params: []

- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  params: []

- id: lmd_movie
  label: Listening Mode Movie Wrap-Around Up
  kind: action
  params: []

- id: lmd_music
  label: Listening Mode Music Wrap-Around Up
  kind: action
  params: []

- id: lmd_game
  label: Listening Mode Game Wrap-Around Up
  kind: action
  params: []

- id: lmd_status_query
  label: Listening Mode Status Query
  kind: query
  params: []

# Late Night
- id: ltn_select
  label: Late Night
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low (Dolby Digital) / On (Dolby TrueHD)
        - "02"  # High (Dolby Digital) / On (Dolby TrueHD)
        - "03"  # Auto (Dolby TrueHD)

- id: ltn_up
  label: Late Night Wrap-Around Up
  kind: action
  params: []

- id: ltn_status_query
  label: Late Night Status Query
  kind: query
  params: []

# Re-EQ / Academy Filter
- id: ras_select
  label: Re-EQ / Academy Filter
  kind: action
  params:
    - name: setting
      type: enum
      values:
        - "00"  # Both Off
        - "01"  # Re-EQ On
        - "02"  # Academy On

- id: ras_up
  label: Re-EQ / Academy State Wrap-Around Up
  kind: action
  params: []

- id: ras_status_query
  label: Re-EQ / Academy State Query
  kind: query
  params: []

# Cinema Filter
- id: ras_cinema_filter
  label: Cinema Filter
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On

- id: ras_cinema_filter_up
  label: Cinema Filter Wrap-Around Up
  kind: action
  params: []

- id: ras_cinema_filter_query
  label: Cinema Filter Status Query
  kind: query
  params: []

# Audyssey 2EQ/MultEQ/MultEQ XT
- id: ady_off
  label: Audyssey 2EQ/MultEQ/MultEQ XT Off
  kind: action
  params: []

- id: ady_on
  label: Audyssey 2EQ/MultEQ/MultEQ XT On
  kind: action
  params: []

- id: ady_up
  label: Audyssey 2EQ/MultEQ/MultEQ XT Wrap-Around Up
  kind: action
  params: []

- id: ady_status_query
  label: Audyssey 2EQ/MultEQ/MultEQ XT Status Query
  kind: query
  params: []

# Audyssey Dynamic EQ
- id: adq_off
  label: Audyssey Dynamic EQ Off
  kind: action
  params: []

- id: adq_on
  label: Audyssey Dynamic EQ On
  kind: action
  params: []

- id: adq_up
  label: Audyssey Dynamic EQ Wrap-Around Up
  kind: action
  params: []

- id: adq_status_query
  label: Audyssey Dynamic EQ Status Query
  kind: query
  params: []

# Audyssey Dynamic Volume
- id: adv_select
  label: Audyssey Dynamic Volume
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Light
        - "02"  # Medium
        - "03"  # Heavy

- id: adv_up
  label: Audyssey Dynamic Volume Wrap-Around Up
  kind: action
  params: []

- id: adv_status_query
  label: Audyssey Dynamic Volume Status Query
  kind: query
  params: []

# Dolby Volume
- id: dvl_select
  label: Dolby Volume
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low
        - "02"  # Mid
        - "03"  # High

- id: dvl_up
  label: Dolby Volume Wrap-Around Up
  kind: action
  params: []

- id: dvl_status_query
  label: Dolby Volume Status Query
  kind: query
  params: []

# Music Optimizer
- id: mot_off
  label: Music Optimizer Off
  kind: action
  params: []

- id: mot_on
  label: Music Optimizer On
  kind: action
  params: []

- id: mot_up
  label: Music Optimizer Wrap-Around Up
  kind: action
  params: []

- id: mot_status_query
  label: Music Optimizer Status Query
  kind: query
  params: []

# Tuner - Tuning
- id: tun_direct
  label: Directly Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (zero-padded 5 digits; XM uses 0 in first two digits)

- id: tun_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  params: []

- id: tun_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  params: []

- id: tun_status_query
  label: Tuning Frequency Status Query
  kind: query
  params: []

# Tuner - Preset
- id: prs_set
  label: Set Preset Number
  kind: action
  params:
    - name: number
      type: integer
      description: Preset number 1-40 (hex 01-28) for newer models; 1-30 (hex 01-1E) for older models

- id: prs_up
  label: Preset Number Wrap-Around Up
  kind: action
  params: []

- id: prs_down
  label: Preset Number Wrap-Around Down
  kind: action
  params: []

- id: prs_status_query
  label: Preset Number Status Query
  kind: query
  params: []

# RDS Information
- id: rds_rt
  label: Display RT Information
  kind: action
  params: []

- id: rds_pty
  label: Display PTY Information
  kind: action
  params: []

- id: rds_tp
  label: Display TP Information
  kind: action
  params: []

- id: rds_up
  label: RDS Information Wrap-Around Change
  kind: action
  params: []

# PTY Scan
- id: pts_scan
  label: PTY Scan
  kind: action
  params:
    - name: number
      type: integer
      description: PTY number 0-30 (hex 00-1E)

- id: pts_enter
  label: Finish PTY Scan
  kind: action
  params: []

# TP Scan
- id: tps_start
  label: Start TP Scan
  kind: action
  params: []

- id: tps_enter
  label: Finish TP Scan
  kind: action
  params: []

# XM Channel Name Info
- id: xcn_query
  label: XM Channel Name Query
  kind: query
  params: []

# XM Artist Name Info
- id: xat_query
  label: XM Artist Name Query
  kind: query
  params: []

# XM Title Info
- id: xti_query
  label: XM Title Query
  kind: query
  params: []

# XM Channel Number
- id: xch_set
  label: Set XM Channel Number
  kind: action
  params:
    - name: channel
      type: integer
      description: XM channel 000-255

- id: xch_up
  label: XM Channel Wrap-Around Up
  kind: action
  params: []

- id: xch_down
  label: XM Channel Wrap-Around Down
  kind: action
  params: []

- id: xch_status_query
  label: XM Channel Number Query
  kind: query
  params: []

# XM Category
- id: xct_set
  label: Set XM Category
  kind: action
  params:
    - name: category
      type: string
      description: XM category name (up to 10 characters)

- id: xct_up
  label: XM Category Wrap-Around Up
  kind: action
  params: []

- id: xct_down
  label: XM Category Wrap-Around Down
  kind: action
  params: []

- id: xct_status_query
  label: XM Category Query
  kind: query
  params: []

# HD Radio Artist Name
- id: hat_query
  label: HD Radio Artist Name Query
  kind: query
  params: []

# HD Radio Channel Name
- id: hcn_query
  label: HD Radio Channel Name Query
  kind: query
  params: []

# HD Radio Title
- id: hti_query
  label: HD Radio Title Query
  kind: query
  params: []

# HD Radio Detail Info
- id: hds_query
  label: HD Radio Detail Info Query
  kind: query
  params: []

# HD Radio Channel Program
- id: hpr_set
  label: Set HD Radio Channel Program
  kind: action
  params:
    - name: program
      type: integer
      description: HD Radio program number 1-8 (hex 01-08)

- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  params: []

# HD Radio Blend Mode
- id: hbl_set
  label: Set HD Radio Blend Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Auto
        - "01"  # Analog

- id: hbl_query
  label: HD Radio Blend Mode Status Query
  kind: query
  params: []

# HD Radio Tuner Status
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  params: []

# Network/USB Transport Controls
- id: ntc_play
  label: Network/USB Play
  kind: action
  params: []

- id: ntc_stop
  label: Network/USB Stop
  kind: action
  params: []

- id: ntc_pause
  label: Network/USB Pause
  kind: action
  params: []

- id: ntc_track_up
  label: Network/USB Track Up
  kind: action
  params: []

- id: ntc_track_down
  label: Network/USB Track Down
  kind: action
  params: []

- id: ntc_ff
  label: Network/USB FF (continuous)
  kind: action
  params: []

- id: ntc_rew
  label: Network/USB REW (continuous)
  kind: action
  params: []

- id: ntc_repeat
  label: Network/USB Repeat
  kind: action
  params: []

- id: ntc_random
  label: Network/USB Random
  kind: action
  params: []

- id: ntc_display
  label: Network/USB Display
  kind: action
  params: []

- id: ntc_album
  label: Network/USB Album Key
  kind: action
  params: []

- id: ntc_artist
  label: Network/USB Artist Key
  kind: action
  params: []

- id: ntc_genre
  label: Network/USB Genre Key
  kind: action
  params: []

- id: ntc_playlist
  label: Network/USB Playlist Key
  kind: action
  params: []

- id: ntc_right
  label: Network/USB Right Key
  kind: action
  params: []

- id: ntc_left
  label: Network/USB Left Key
  kind: action
  params: []

- id: ntc_up
  label: Network/USB Up Key
  kind: action
  params: []

- id: ntc_down
  label: Network/USB Down Key
  kind: action
  params: []

- id: ntc_select
  label: Network/USB Select Key
  kind: action
  params: []

- id: ntc_0
  label: Network/USB 0 Key
  kind: action
  params: []

- id: ntc_1
  label: Network/USB 1 Key
  kind: action
  params: []

- id: ntc_2
  label: Network/USB 2 Key
  kind: action
  params: []

- id: ntc_3
  label: Network/USB 3 Key
  kind: action
  params: []

- id: ntc_4
  label: Network/USB 4 Key
  kind: action
  params: []

- id: ntc_5
  label: Network/USB 5 Key
  kind: action
  params: []

- id: ntc_6
  label: Network/USB 6 Key
  kind: action
  params: []

- id: ntc_7
  label: Network/USB 7 Key
  kind: action
  params: []

- id: ntc_8
  label: Network/USB 8 Key
  kind: action
  params: []

- id: ntc_9
  label: Network/USB 9 Key
  kind: action
  params: []

- id: ntc_delete
  label: Network/USB Delete Key
  kind: action
  params: []

- id: ntc_caps
  label: Network/USB Caps Key
  kind: action
  params: []

- id: ntc_setup
  label: Network/USB Setup Key
  kind: action
  params: []

- id: ntc_return
  label: Network/USB Return Key
  kind: action
  params: []

- id: ntc_chup
  label: Network/USB Channel Up (for iRadio)
  kind: action
  params: []

- id: ntc_chdn
  label: Network/USB Channel Down (for iRadio)
  kind: action
  params: []

# Net/USB Info Queries
- id: nat_query
  label: Net/USB Artist Name Query
  kind: query
  params: []

- id: nal_query
  label: Net/USB Album Name Query
  kind: query
  params: []

- id: nti_query
  label: Net/USB Title Name Query
  kind: query
  params: []

- id: ntm_query
  label: Net/USB Time Info Query
  kind: query
  params: []

- id: ntr_query
  label: Net/USB Track Info Query
  kind: query
  params: []

- id: nst_query
  label: Net/USB Play Status Query
  kind: query
  params: []

# Internet Radio Preset (Main Zone)
- id: npr_set
  label: Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-40 (hex 01-28)

# CD Player Operations (via RI)
- id: ccd_track
  label: CD Track+
  kind: action
  params: []

- id: ccd_play
  label: CD Play
  kind: action
  params: []

- id: ccd_stop
  label: CD Stop
  kind: action
  params: []

- id: ccd_pause
  label: CD Pause
  kind: action
  params: []

- id: ccd_skip_fwd
  label: CD Skip Forward
  kind: action
  params: []

- id: ccd_skip_rev
  label: CD Skip Reverse
  kind: action
  params: []

- id: ccd_memory
  label: CD Memory
  kind: action
  params: []

- id: ccd_clear
  label: CD Clear
  kind: action
  params: []

- id: ccd_repeat
  label: CD Repeat
  kind: action
  params: []

- id: ccd_random
  label: CD Random
  kind: action
  params: []

- id: ccd_display
  label: CD Display
  kind: action
  params: []

- id: ccd_ff
  label: CD FF
  kind: action
  params: []

- id: ccd_rew
  label: CD REW
  kind: action
  params: []

- id: ccd_open_close
  label: CD Open/Close
  kind: action
  params: []

- id: ccd_disc_fwd
  label: CD Disc Forward
  kind: action
  params: []

- id: ccd_disc_rev
  label: CD Disc Reverse
  kind: action
  params: []

- id: ccd_stby
  label: CD Standby
  kind: action
  params: []

- id: ccd_pon
  label: CD Power On
  kind: action
  params: []

# TAPE1 Operations (via RI)
- id: ct1_play_fwd
  label: TAPE1 Play Forward
  kind: action
  params: []

- id: ct1_play_rev
  label: TAPE1 Play Reverse
  kind: action
  params: []

- id: ct1_stop
  label: TAPE1 Stop
  kind: action
  params: []

- id: ct1_rec_pause
  label: TAPE1 Rec/Pause
  kind: action
  params: []

- id: ct1_ff
  label: TAPE1 FF
  kind: action
  params: []

- id: ct1_rew
  label: TAPE1 REW
  kind: action
  params: []

# TAPE2 Operations (via RI)
- id: ct2_play_fwd
  label: TAPE2 Play Forward
  kind: action
  params: []

- id: ct2_play_rev
  label: TAPE2 Play Reverse
  kind: action
  params: []

- id: ct2_stop
  label: TAPE2 Stop
  kind: action
  params: []

- id: ct2_rec_pause
  label: TAPE2 Rec/Pause
  kind: action
  params: []

- id: ct2_ff
  label: TAPE2 FF
  kind: action
  params: []

- id: ct2_rew
  label: TAPE2 REW
  kind: action
  params: []

- id: ct2_open_close
  label: TAPE2 Open/Close
  kind: action
  params: []

- id: ct2_skip_fwd
  label: TAPE2 Skip Forward
  kind: action
  params: []

- id: ct2_skip_rev
  label: TAPE2 Skip Reverse
  kind: action
  params: []

- id: ct2_rec
  label: TAPE2 Rec
  kind: action
  params: []

# Dock Operations (via RI)
- id: cds_pwron
  label: Dock Power On
  kind: action
  params: []

- id: cds_pwroff
  label: Dock Standby
  kind: action
  params: []

- id: cds_ply_res
  label: Dock Play/Resume
  kind: action
  params: []

- id: cds_stop
  label: Dock Stop
  kind: action
  params: []

- id: cds_skip_fwd
  label: Dock Track Up
  kind: action
  params: []

- id: cds_skip_rev
  label: Dock Track Down
  kind: action
  params: []

- id: cds_pause
  label: Dock Pause
  kind: action
  params: []

- id: cds_ply_pau
  label: Dock Play/Pause
  kind: action
  params: []

- id: cds_ff
  label: Dock FF
  kind: action
  params: []

- id: cds_rew
  label: Dock FR
  kind: action
  params: []

- id: cds_album_up
  label: Dock Album Up
  kind: action
  params: []

- id: cds_album_down
  label: Dock Album Down
  kind: action
  params: []

- id: cds_plist_up
  label: Dock Playlist Up
  kind: action
  params: []

- id: cds_plist_down
  label: Dock Playlist Down
  kind: action
  params: []

- id: cds_chapt_up
  label: Dock Chapter Up
  kind: action
  params: []

- id: cds_chapt_down
  label: Dock Chapter Down
  kind: action
  params: []

- id: cds_random
  label: Dock Shuffle
  kind: action
  params: []

- id: cds_repeat
  label: Dock Repeat
  kind: action
  params: []

- id: cds_mute
  label: Dock Mute
  kind: action
  params: []

- id: cds_blight
  label: Dock Backlight
  kind: action
  params: []

- id: cds_menu
  label: Dock Menu
  kind: action
  params: []

- id: cds_enter
  label: Dock Select
  kind: action
  params: []

- id: cds_up
  label: Dock Cursor Up
  kind: action
  params: []

- id: cds_down
  label: Dock Cursor Down
  kind: action
  params: []

# Zone 2 Power
- id: zpw_standby
  label: Zone 2 Standby
  kind: action
  params: []

- id: zpw_on
  label: Zone 2 On
  kind: action
  params: []

- id: zpw_status_query
  label: Zone 2 Power Status Query
  kind: query
  params: []

# Zone 2 Muting
- id: zmt_off
  label: Zone 2 Muting Off
  kind: action
  params: []

- id: zmt_on
  label: Zone 2 Muting On
  kind: action
  params: []

- id: zmt_toggle
  label: Zone 2 Muting Wrap-Around
  kind: action
  params: []

- id: zmt_status_query
  label: Zone 2 Muting Status Query
  kind: query
  params: []

# Zone 2 Volume
- id: zvl_set
  label: Zone 2 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (hex 00-64) for newer; 0-80 (hex 00-50) for older

- id: zvl_up
  label: Zone 2 Volume Up
  kind: action
  params: []

- id: zvl_down
  label: Zone 2 Volume Down
  kind: action
  params: []

- id: zvl_status_query
  label: Zone 2 Volume Query
  kind: query
  params: []

# Zone 2 Tone
- id: ztn_set_bass
  label: Zone 2 Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: ztn_set_treble
  label: Zone 2 Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: ztn_bup
  label: Zone 2 Bass Up 2 Step
  kind: action
  params: []

- id: ztn_bdown
  label: Zone 2 Bass Down 2 Step
  kind: action
  params: []

- id: ztn_tup
  label: Zone 2 Treble Up 2 Step
  kind: action
  params: []

- id: ztn_tdown
  label: Zone 2 Treble Down 2 Step
  kind: action
  params: []

- id: ztn_status_query
  label: Zone 2 Tone Status Query
  kind: query
  params: []

# Zone 2 Balance
- id: zbl_set
  label: Zone 2 Balance
  kind: action
  params:
    - name: value
      type: string
      description: Balance "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: zbl_up
  label: Zone 2 Balance Up 2 Step
  kind: action
  params: []

- id: zbl_down
  label: Zone 2 Balance Down 2 Step
  kind: action
  params: []

- id: zbl_status_query
  label: Zone 2 Balance Query
  kind: query
  params: []

# Zone 2 Selector
- id: slz_select
  label: Zone 2 Input Selector
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # VIDEO1
        - "01"  # VIDEO2
        - "02"  # VIDEO3
        - "03"  # VIDEO4
        - "04"  # VIDEO5
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "40"  # Universal PORT
        - "30"  # MULTI CH
        - "80"  # SOURCE

- id: slz_status_query
  label: Zone 2 Selector Query
  kind: query
  params: []

# Zone 2 Tuner
- id: tuz_direct
  label: Zone 2 Directly Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz

- id: tuz_up
  label: Zone 2 Tuning Up
  kind: action
  params: []

- id: tuz_down
  label: Zone 2 Tuning Down
  kind: action
  params: []

- id: tuz_status_query
  label: Zone 2 Tuning Query
  kind: query
  params: []

# Zone 2 Preset
- id: prz_set
  label: Zone 2 Preset Number
  kind: action
  params:
    - name: number
      type: integer
      description: Preset 1-40 (hex 01-28) or 1-30 (hex 01-1E) depending on model

- id: prz_up
  label: Zone 2 Preset Up
  kind: action
  params: []

- id: prz_down
  label: Zone 2 Preset Down
  kind: action
  params: []

- id: prz_status_query
  label: Zone 2 Preset Query
  kind: query
  params: []

# Zone 2 Net-Tune/Network
- id: ntz_play
  label: Zone 2 Network Play
  kind: action
  params: []

- id: ntz_stop
  label: Zone 2 Network Stop
  kind: action
  params: []

- id: ntz_pause
  label: Zone 2 Network Pause
  kind: action
  params: []

- id: ntz_trup
  label: Zone 2 Network Track Up
  kind: action
  params: []

- id: ntz_trdn
  label: Zone 2 Network Track Down
  kind: action
  params: []

- id: ntz_chup
  label: Zone 2 Network CH Up
  kind: action
  params: []

- id: ntz_chdn
  label: Zone 2 Network CH Down
  kind: action
  params: []

# Zone 2 Internet Radio Preset
- id: npz_set
  label: Zone 2 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# Zone 2 Listening Mode
- id: lmz_select
  label: Zone 2 Listening Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # STEREO
        - "01"  # DIRECT
        - "0F"  # MONO
        - "12"  # MULTIPLEX
        - "87"  # DVS (PL2)
        - "88"  # DVS (NEO6)

- id: lmz_status_query
  label: Zone 2 Listening Mode Query
  kind: query
  params: []

# Zone 2 Late Night
- id: ltz_select
  label: Zone 2 Late Night
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low
        - "02"  # High

- id: ltz_up
  label: Zone 2 Late Night Up
  kind: action
  params: []

- id: ltz_status_query
  label: Zone 2 Late Night Query
  kind: query
  params: []

# Zone 2 Re-EQ
- id: raz_select
  label: Zone 2 Re-EQ / Academy Filter
  kind: action
  params:
    - name: setting
      type: enum
      values:
        - "00"  # Both Off
        - "01"  # Re-EQ On
        - "02"  # Academy On

- id: raz_up
  label: Zone 2 Re-EQ Up
  kind: action
  params: []

- id: raz_status_query
  label: Zone 2 Re-EQ Query
  kind: query
  params: []

# Zone 3 Power
- id: pw3_standby
  label: Zone 3 Standby
  kind: action
  params: []

- id: pw3_on
  label: Zone 3 On
  kind: action
  params: []

- id: pw3_status_query
  label: Zone 3 Power Query
  kind: query
  params: []

# Zone 3 Muting
- id: mt3_off
  label: Zone 3 Muting Off
  kind: action
  params: []

- id: mt3_on
  label: Zone 3 Muting On
  kind: action
  params: []

- id: mt3_toggle
  label: Zone 3 Muting Wrap-Around
  kind: action
  params: []

- id: mt3_status_query
  label: Zone 3 Muting Query
  kind: query
  params: []

# Zone 3 Volume
- id: vl3_set
  label: Zone 3 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 00-64) or 0-80 (hex 00-50) depending on model

- id: vl3_up
  label: Zone 3 Volume Up
  kind: action
  params: []

- id: vl3_down
  label: Zone 3 Volume Down
  kind: action
  params: []

- id: vl3_status_query
  label: Zone 3 Volume Query
  kind: query
  params: []

# Zone 3 Tone
- id: tn3_set_bass
  label: Zone 3 Bass
  kind: action
  params:
    - name: value
      type: string
      description: Bass "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: tn3_set_treble
  label: Zone 3 Treble
  kind: action
  params:
    - name: value
      type: string
      description: Treble "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: tn3_bup
  label: Zone 3 Bass Up 2 Step
  kind: action
  params: []

- id: tn3_bdown
  label: Zone 3 Bass Down 2 Step
  kind: action
  params: []

- id: tn3_tup
  label: Zone 3 Treble Up 2 Step
  kind: action
  params: []

- id: tn3_tdown
  label: Zone 3 Treble Down 2 Step
  kind: action
  params: []

- id: tn3_status_query
  label: Zone 3 Tone Query
  kind: query
  params: []

# Zone 3 Balance
- id: bl3_set
  label: Zone 3 Balance
  kind: action
  params:
    - name: value
      type: string
      description: Balance "-A"..."00"..."+A" (-10...0...+10 2-step hex)

- id: bl3_up
  label: Zone 3 Balance Up 2 Step
  kind: action
  params: []

- id: bl3_down
  label: Zone 3 Balance Down 2 Step
  kind: action
  params: []

- id: bl3_status_query
  label: Zone 3 Balance Query
  kind: query
  params: []

# Zone 3 Selector
- id: sl3_select
  label: Zone 3 Input Selector
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # VIDEO1
        - "01"  # VIDEO2
        - "02"  # VIDEO3
        - "03"  # VIDEO4
        - "04"  # VIDEO5
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "40"  # Universal PORT
        - "30"  # MULTI CH
        - "80"  # SOURCE

- id: sl3_status_query
  label: Zone 3 Selector Query
  kind: query
  params: []

# Zone 3 Tuner
- id: tu3_direct
  label: Zone 3 Directly Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz

- id: tu3_up
  label: Zone 3 Tuning Up
  kind: action
  params: []

- id: tu3_down
  label: Zone 3 Tuning Down
  kind: action
  params: []

- id: tu3_status_query
  label: Zone 3 Tuning Query
  kind: query
  params: []

# Zone 3 Preset
- id: pr3_set
  label: Zone 3 Preset Number
  kind: action
  params:
    - name: number
      type: integer
      description: Preset 1-40 (hex 01-28) or 1-30 (hex 01-1E) depending on model

- id: pr3_up
  label: Zone 3 Preset Up
  kind: action
  params: []

- id: pr3_down
  label: Zone 3 Preset Down
  kind: action
  params: []

- id: pr3_status_query
  label: Zone 3 Preset Query
  kind: query
  params: []

# Zone 3 Network Operations
- id: nt3_play
  label: Zone 3 Network Play
  kind: action
  params: []

- id: nt3_stop
  label: Zone 3 Network Stop
  kind: action
  params: []

- id: nt3_pause
  label: Zone 3 Network Pause
  kind: action
  params: []

- id: nt3_trup
  label: Zone 3 Network Track Up
  kind: action
  params: []

- id: nt3_trdn
  label: Zone 3 Network Track Down
  kind: action
  params: []

- id: nt3_chup
  label: Zone 3 Network CH Up
  kind: action
  params: []

- id: nt3_chdn
  label: Zone 3 Network CH Down
  kind: action
  params: []

# Zone 3 Internet Radio Preset
- id: np3_set
  label: Zone 3 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# Zone 4 Power
- id: pw4_standby
  label: Zone 4 Standby
  kind: action
  params: []

- id: pw4_on
  label: Zone 4 On
  kind: action
  params: []

- id: pw4_status_query
  label: Zone 4 Power Query
  kind: query
  params: []

# Zone 4 Muting
- id: mt4_off
  label: Zone 4 Muting Off
  kind: action
  params: []

- id: mt4_on
  label: Zone 4 Muting On
  kind: action
  params: []

- id: mt4_toggle
  label: Zone 4 Muting Wrap-Around
  kind: action
  params: []

- id: mt4_status_query
  label: Zone 4 Muting Query
  kind: query
  params: []

# Zone 4 Volume
- id: vl4_set
  label: Zone 4 Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 00-64) or 0-80 (hex 00-50) depending on model

- id: vl4_up
  label: Zone 4 Volume Up
  kind: action
  params: []

- id: vl4_down
  label: Zone 4 Volume Down
  kind: action
  params: []

- id: vl4_status_query
  label: Zone 4 Volume Query
  kind: query
  params: []

# Zone 4 Selector
- id: sl4_select
  label: Zone 4 Input Selector
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "00"  # VIDEO1
        - "01"  # VIDEO2
        - "02"  # VIDEO3
        - "03"  # VIDEO4
        - "04"  # VIDEO5
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "40"  # Universal PORT
        - "30"  # MULTI CH
        - "80"  # SOURCE

- id: sl4_status_query
  label: Zone 4 Selector Query
  kind: query
  params: []

# Zone 4 Tuner
- id: tu4_direct
  label: Zone 4 Directly Set Tuning Frequency
  kind: action
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz

- id: tu4_up
  label: Zone 4 Tuning Up
  kind: action
  params: []

- id: tu4_down
  label: Zone 4 Tuning Down
  kind: action
  params: []

- id: tu4_status_query
  label: Zone 4 Tuning Query
  kind: query
  params: []

# Zone 4 Preset
- id: pr4_set
  label: Zone 4 Preset Number
  kind: action
  params:
    - name: number
      type: integer
      description: Preset 1-40 (hex 01-28) or 1-30 (hex 01-1E) depending on model

- id: pr4_up
  label: Zone 4 Preset Up
  kind: action
  params: []

- id: pr4_down
  label: Zone 4 Preset Down
  kind: action
  params: []

- id: pr4_status_query
  label: Zone 4 Preset Query
  kind: query
  params: []

# Zone 4 Network Operations
- id: nt4_play
  label: Zone 4 Network Play
  kind: action
  params: []

- id: nt4_stop
  label: Zone 4 Network Stop
  kind: action
  params: []

- id: nt4_pause
  label: Zone 4 Network Pause
  kind: action
  params: []

- id: nt4_trup
  label: Zone 4 Network Track Up
  kind: action
  params: []

- id: nt4_trdn
  label: Zone 4 Network Track Down
  kind: action
  params: []

# Zone 4 Internet Radio Preset
- id: np4_set
  label: Zone 4 Internet Radio Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# Speaker A/B: speaker selects the command characters SPA or SPB.
# Source: SPA=MAIN A/SPB=MAIN B; SPA=Front A/SPB=Front B(Exclucive use).
- id: spa_spb_set
  command: SPA
  label: Set Speaker A/B State
  kind: action
  params:
    - name: speaker
      type: enum
      values:
        - "SPA"
        - "SPB"
    - name: state
      type: enum
      values:
        - "00"  # sets Speaker Off
        - "01"  # sets Speaker On

# Parameter: UP
- id: spa_spb_up
  command: SPA
  label: Speaker A/B Switch Wrap-Around
  kind: action
  params:
    - name: speaker
      type: enum
      values:
        - "SPA"
        - "SPB"

# Parameter: QSTN
- id: spa_spb_status_query
  command: SPA
  label: Speaker A/B State Query
  kind: query
  params:
    - name: speaker
      type: enum
      values:
        - "SPA"
        - "SPB"

# Speaker Layout
- id: spl_select
  command: SPL
  label: Set Speaker Layout
  kind: action
  params:
    - name: layout
      type: enum
      values:
        - "SB"  # sets SurrBack Speaker
        - "FH"  # sets Front High Speaker / SurrBack+Front High Speakers
        - "FW"  # sets Front Wide Speaker / SurrBack+Front Wide Speakers

# Parameter: UP
- id: spl_up
  command: SPL
  label: Speaker Layout Switch Wrap-Around
  kind: action
  params: []

# Parameter: QSTN
- id: spl_status_query
  command: SPL
  label: Speaker Layout State Query
  kind: query
  params: []

# Additional OSD Keys
# Parameter: AUDIO
- id: osd_audio
  command: OSD
  label: OSD Audio Adjust Key
  kind: action
  params: []

# Parameter: VIDEO
- id: osd_video
  command: OSD
  label: OSD Video Adjust Key
  kind: action
  params: []

# Additional Input Selector Values
- id: sli_select_additional
  command: SLI
  label: Select Additional Main Zone Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "31"  # XM; Only available XM/SIRIUS Model
        - "32"  # SIRIUS; Only available XM/SIRIUS Model

- id: slr_select_additional
  command: SLR
  label: Select Additional RECOUT Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "31"  # XM

- id: sla_select_additional
  command: SLA
  label: Select Additional Audio Input Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "03"  # iLINK
        - "04"  # HDMI
        - "05"  # COAX/OPT

# Video Output Selector (Japanese Model Only)
- id: vos_select
  command: VOS
  label: Set Video Output Selector
  kind: action
  params:
    - name: output
      type: enum
      values:
        - "00"  # D4
        - "01"  # Component

# Parameter: QSTN
- id: vos_status_query
  command: VOS
  label: Video Output Selector Query
  kind: query
  params: []

# ISF Mode
- id: isf_select
  command: ISF
  label: Set ISF Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Custom
        - "01"  # Day
        - "02"  # Night

# Parameter: UP
- id: isf_up
  command: ISF
  label: ISF Mode Wrap-Around Up
  kind: action
  params: []

# Parameter: QSTN
- id: isf_status_query
  command: ISF
  label: ISF Mode State Query
  kind: query
  params: []

# Additional Listening Mode Values
- id: lmd_select_additional
  command: LMD
  label: Select Additional Listening Mode
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "40"  # 5.1ch Surround / Straight Decode; model-dependent
        - "41"  # Dolby EX/DTS ES / Dolby EX; model-dependent
        - "42"  # THX Cinema
        - "43"  # THX Surround EX
        - "44"  # THX Music
        - "45"  # THX Games
        - "50"  # U2/S2 Cinema/Cinema2
        - "51"  # MusicMode,U2/S2 Music
        - "52"  # Games Mode,U2/S2 Games
        - "84"  # PLII/PLIIx THX Cinema
        - "85"  # Neo:6 THX Cinema
        - "86"  # PLII/PLIIx Game
        - "89"  # PLII/PLIIx THX Games
        - "8A"  # Neo:6 THX Games
        - "8B"  # PLII/PLIIx THX Music
        - "8C"  # Neo:6 THX Music
        - "8D"  # Neural THX Cinema
        - "8E"  # Neural THX Music
        - "8F"  # Neural THX Games
        - "93"  # Neural Digital Music
        - "94"  # PLIIz Height + THX Cinema
        - "95"  # PLIIz Height + THX Music
        - "96"  # PLIIz Height + THX Games
        - "97"  # PLIIz Height + THX U2/S2 Cinema
        - "98"  # PLIIz Height + THX U2/S2 Music
        - "99"  # PLIIz Height + THX U2/S2 Games
        - "A0"  # PLIIx/PLII Movie + Audyssey DSX
        - "A1"  # PLIIx/PLII Music + Audyssey DSX
        - "A2"  # PLIIx/PLII Game + Audyssey DSX
        - "A3"  # Neo:6 Cinema + Audyssey DSX
        - "A4"  # Neo:6 Music + Audyssey DSX
        - "A5"  # Neural Surround + Audyssey DSX
        - "A6"  # Neural Digital Music + Audyssey DSX
        - "A7"  # Dolby EX + Audyssey DSX

# Tuner Preset Memory (Include Tuner Pack Model Only)
- id: prm_set
  command: PRM
  label: Store Tuner Preset Memory
  kind: action
  params:
    - name: number
      type: integer
      description: 'sets Preset No. 1-40 ( In hexadecimal representation), "01"-"28"; sets Preset No. 1-30 ( In hexadecimal representation), "01"-"1E"; UNRESOLVED: applicable range per target model'

# SIRIUS (SIRIUS Model Only)
# Parameter: QSTN
- id: scn_query
  command: SCN
  label: SIRIUS Channel Name Query
  kind: query
  params: []

# Parameter: QSTN
- id: sat_query
  command: SAT
  label: SIRIUS Artist Name Query
  kind: query
  params: []

# Parameter: QSTN
- id: sti_query
  command: STI
  label: SIRIUS Title Query
  kind: query
  params: []

- id: sch_set
  command: SCH
  label: Set SIRIUS Channel Number
  kind: action
  params:
    - name: channel
      type: integer
      description: 'SIRIUS Channel Number"000-255"; "000"-"255"'

# Parameter: UP
- id: sch_up
  command: SCH
  label: SIRIUS Channel Wrap-Around Up
  kind: action
  params: []

# Parameter: DOWN
- id: sch_down
  command: SCH
  label: SIRIUS Channel Wrap-Around Down
  kind: action
  params: []

# Parameter: QSTN
- id: sch_status_query
  command: SCH
  label: SIRIUS Channel Number Query
  kind: query
  params: []

# Parameter: UP
- id: sct_up
  command: SCT
  label: SIRIUS Category Wrap-Around Up
  kind: action
  params: []

# Parameter: DOWN
- id: sct_down
  command: SCT
  label: SIRIUS Category Wrap-Around Down
  kind: action
  params: []

# Parameter: QSTN
- id: sct_status_query
  command: SCT
  label: SIRIUS Category Query
  kind: query
  params: []

# Parameter: nnnn
- id: slk_password
  command: SLK
  label: Submit SIRIUS Lock Password
  kind: action
  params:
    - name: password
      type: string
      description: Lock Password (4Digits)

# Additional Network/USB Keys
# Parameter: LOCATION
- id: ntc_location
  command: NTC
  label: Network/USB Location Key
  kind: action
  params: []

# Parameter: LANGUAGE
- id: ntc_language
  command: NTC
  label: Network/USB Language Key
  kind: action
  params: []

# Additional CD Player Operations (via RI)
# Parameter: D.MODE
- id: ccd_d_mode
  command: CCD
  label: CD D Mode
  kind: action
  params: []

- id: ccd_number_key
  command: CCD
  label: CD Number Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "0"
        - "10"
        - "+10"

# Parameter: D.SKIP
- id: ccd_d_skip
  command: CCD
  label: CD Disc Skip
  kind: action
  params: []

- id: ccd_disc_select
  command: CCD
  label: CD Disc Select
  kind: action
  params:
    - name: disc
      type: enum
      values:
        - "DISC1"
        - "DISC2"
        - "DISC3"
        - "DISC4"
        - "DISC5"
        - "DISC6"

# Graphics Equalizer (via RI)
# Parameter: PRESET
- id: ceq_preset
  command: CEQ
  label: Graphics Equalizer Preset
  kind: action
  params: []

# DAT Recorder (via RI)
# Parameter: PLAY
- id: cdt_play
  command: CDT
  label: DAT Play
  kind: action
  params: []

# Parameter: RC/PAU
- id: cdt_rec_pause
  command: CDT
  label: DAT Rec/Pause
  kind: action
  params: []

# Parameter: STOP
- id: cdt_stop
  command: CDT
  label: DAT Stop
  kind: action
  params: []

# Parameter: SKIP.F
- id: cdt_skip_fwd
  command: CDT
  label: DAT Skip Forward
  kind: action
  params: []

# Parameter: SKIP.R
- id: cdt_skip_rev
  command: CDT
  label: DAT Skip Reverse
  kind: action
  params: []

# Parameter: FF
- id: cdt_ff
  command: CDT
  label: DAT FF
  kind: action
  params: []

# Parameter: REW
- id: cdt_rew
  command: CDT
  label: DAT REW
  kind: action
  params: []

# DVD Player (via RI)
# Parameter: PWRON
- id: cdv_pwron
  command: CDV
  label: DVD Power On
  kind: action
  params: []

# Parameter: PWROFF
- id: cdv_pwroff
  command: CDV
  label: DVD Power Off
  kind: action
  params: []

# Parameter: PLAY
- id: cdv_play
  command: CDV
  label: DVD Play
  kind: action
  params: []

# Parameter: STOP
- id: cdv_stop
  command: CDV
  label: DVD Stop
  kind: action
  params: []

# Parameter: SKIP.F
- id: cdv_skip_fwd
  command: CDV
  label: DVD Skip Forward
  kind: action
  params: []

# Parameter: SKIP.R
- id: cdv_skip_rev
  command: CDV
  label: DVD Skip Reverse
  kind: action
  params: []

# Parameter: FF
- id: cdv_ff
  command: CDV
  label: DVD FF
  kind: action
  params: []

# Parameter: REW
- id: cdv_rew
  command: CDV
  label: DVD REW
  kind: action
  params: []

# Parameter: PAUSE
- id: cdv_pause
  command: CDV
  label: DVD Pause
  kind: action
  params: []

# Parameter: LASTPLAY
- id: cdv_lastplay
  command: CDV
  label: DVD Last Play
  kind: action
  params: []

# Parameter: SUBTON/OFF
- id: cdv_subtitle_on_off
  command: CDV
  label: DVD Subtitle On/Off
  kind: action
  params: []

# Parameter: SUBTITLE
- id: cdv_subtitle
  command: CDV
  label: DVD Subtitle
  kind: action
  params: []

# Parameter: SETUP
- id: cdv_setup
  command: CDV
  label: DVD Setup
  kind: action
  params: []

# Parameter: TOPMENU
- id: cdv_topmenu
  command: CDV
  label: DVD Top Menu
  kind: action
  params: []

# Parameter: MENU
- id: cdv_menu
  command: CDV
  label: DVD Menu
  kind: action
  params: []

# Parameter: UP
- id: cdv_up
  command: CDV
  label: DVD Up
  kind: action
  params: []

# Parameter: DOWN
- id: cdv_down
  command: CDV
  label: DVD Down
  kind: action
  params: []

# Parameter: LEFT
- id: cdv_left
  command: CDV
  label: DVD Left
  kind: action
  params: []

# Parameter: RIGHT
- id: cdv_right
  command: CDV
  label: DVD Right
  kind: action
  params: []

# Parameter: ENTER
- id: cdv_enter
  command: CDV
  label: DVD Enter
  kind: action
  params: []

# Parameter: RETURN
- id: cdv_return
  command: CDV
  label: DVD Return
  kind: action
  params: []

# Parameter: DISC.F
- id: cdv_disc_fwd
  command: CDV
  label: DVD Disc Forward
  kind: action
  params: []

# Parameter: DISC.R
- id: cdv_disc_rev
  command: CDV
  label: DVD Disc Reverse
  kind: action
  params: []

# Parameter: AUDIO
- id: cdv_audio
  command: CDV
  label: DVD Audio
  kind: action
  params: []

# Parameter: RANDOM
- id: cdv_random
  command: CDV
  label: DVD Random
  kind: action
  params: []

# Parameter: OP/CL
- id: cdv_open_close
  command: CDV
  label: DVD Open/Close
  kind: action
  params: []

# Parameter: ANGLE
- id: cdv_angle
  command: CDV
  label: DVD Angle
  kind: action
  params: []

- id: cdv_number_key
  command: CDV
  label: DVD Number Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "10"
        - "0"

# Parameter: SEARCH
- id: cdv_search
  command: CDV
  label: DVD Search
  kind: action
  params: []

# Parameter: DISP
- id: cdv_display
  command: CDV
  label: DVD Display
  kind: action
  params: []

# Parameter: REPEAT
- id: cdv_repeat
  command: CDV
  label: DVD Repeat
  kind: action
  params: []

# Parameter: MEMORY
- id: cdv_memory
  command: CDV
  label: DVD Memory
  kind: action
  params: []

# Parameter: CLEAR
- id: cdv_clear
  command: CDV
  label: DVD Clear
  kind: action
  params: []

# Parameter: ABR
- id: cdv_ab_repeat
  command: CDV
  label: DVD A-B Repeat
  kind: action
  params: []

# Parameter: STEP.F
- id: cdv_step_fwd
  command: CDV
  label: DVD Step Forward
  kind: action
  params: []

# Parameter: STEP.R
- id: cdv_step_rev
  command: CDV
  label: DVD Step Back
  kind: action
  params: []

# Parameter: SLOW.F
- id: cdv_slow_fwd
  command: CDV
  label: DVD Slow Forward
  kind: action
  params: []

# Parameter: SLOW.R
- id: cdv_slow_rev
  command: CDV
  label: DVD Slow Back
  kind: action
  params: []

# Parameter: ZOOMTG
- id: cdv_zoom_toggle
  command: CDV
  label: DVD Zoom
  kind: action
  params: []

# Parameter: ZOOMUP
- id: cdv_zoom_up
  command: CDV
  label: DVD Zoom Up
  kind: action
  params: []

# Parameter: ZOOMDN
- id: cdv_zoom_down
  command: CDV
  label: DVD Zoom Down
  kind: action
  params: []

# Parameter: PROGRE
- id: cdv_progressive
  command: CDV
  label: DVD Progressive
  kind: action
  params: []

# Parameter: VDOFF
- id: cdv_video_on_off
  command: CDV
  label: DVD Video On/Off
  kind: action
  params: []

# Parameter: CONMEM
- id: cdv_condition_memory
  command: CDV
  label: DVD Condition Memory
  kind: action
  params: []

# Parameter: FUNMEM
- id: cdv_function_memory
  command: CDV
  label: DVD Function Memory
  kind: action
  params: []

- id: cdv_disc_select
  command: CDV
  label: DVD Disc Select
  kind: action
  params:
    - name: disc
      type: enum
      values:
        - "DISC1"
        - "DISC2"
        - "DISC3"
        - "DISC4"
        - "DISC5"
        - "DISC6"

# Parameter: FOLDUP
- id: cdv_folder_up
  command: CDV
  label: DVD Folder Up
  kind: action
  params: []

# Parameter: FOLDDN
- id: cdv_folder_down
  command: CDV
  label: DVD Folder Down
  kind: action
  params: []

# Parameter: P.MODE
- id: cdv_play_mode
  command: CDV
  label: DVD Play Mode
  kind: action
  params: []

# Parameter: ASCTG
- id: cdv_aspect_toggle
  command: CDV
  label: DVD Aspect Toggle
  kind: action
  params: []

# Parameter: CDPCD
- id: cdv_cd_chain_repeat
  command: CDV
  label: DVD CD Chain Repeat
  kind: action
  params: []

# Parameter: MSPUP
- id: cdv_multi_speed_up
  command: CDV
  label: DVD Multi Speed Up
  kind: action
  params: []

# Parameter: MSPDN
- id: cdv_multi_speed_down
  command: CDV
  label: DVD Multi Speed Down
  kind: action
  params: []

# Parameter: PCT
- id: cdv_picture_control
  command: CDV
  label: DVD Picture Control
  kind: action
  params: []

# Parameter: RSCTG
- id: cdv_resolution_toggle
  command: CDV
  label: DVD Resolution Toggle
  kind: action
  params: []

# Parameter: INIT
- id: cdv_factory_settings
  command: CDV
  label: DVD Return To Factory Settings
  kind: action
  params: []

# MD Recorder (via RI)
# Parameter: PLAY
- id: cmd_play
  command: CMD
  label: MD Play
  kind: action
  params: []

# Parameter: STOP
- id: cmd_stop
  command: CMD
  label: MD Stop
  kind: action
  params: []

# Parameter: FF
- id: cmd_ff
  command: CMD
  label: MD FF
  kind: action
  params: []

# Parameter: REW
- id: cmd_rew
  command: CMD
  label: MD REW
  kind: action
  params: []

# Parameter: P.MODE
- id: cmd_play_mode
  command: CMD
  label: MD Play Mode
  kind: action
  params: []

# Parameter: SKIP.F
- id: cmd_skip_fwd
  command: CMD
  label: MD Skip Forward
  kind: action
  params: []

# Parameter: SKIP.R
- id: cmd_skip_rev
  command: CMD
  label: MD Skip Reverse
  kind: action
  params: []

# Parameter: PAUSE
- id: cmd_pause
  command: CMD
  label: MD Pause
  kind: action
  params: []

# Parameter: REC
- id: cmd_rec
  command: CMD
  label: MD Rec
  kind: action
  params: []

# Parameter: MEMORY
- id: cmd_memory
  command: CMD
  label: MD Memory
  kind: action
  params: []

# Parameter: DISP
- id: cmd_display
  command: CMD
  label: MD Display
  kind: action
  params: []

# Parameter: SCROLL
- id: cmd_scroll
  command: CMD
  label: MD Scroll
  kind: action
  params: []

# Parameter: M.SCAN
- id: cmd_music_scan
  command: CMD
  label: MD Music Scan
  kind: action
  params: []

# Parameter: CLEAR
- id: cmd_clear
  command: CMD
  label: MD Clear
  kind: action
  params: []

# Parameter: RANDOM
- id: cmd_random
  command: CMD
  label: MD Random
  kind: action
  params: []

# Parameter: REPEAT
- id: cmd_repeat
  command: CMD
  label: MD Repeat
  kind: action
  params: []

# Parameter: ENTER
- id: cmd_enter
  command: CMD
  label: MD Enter
  kind: action
  params: []

# Parameter: EJECT
- id: cmd_eject
  command: CMD
  label: MD Eject
  kind: action
  params: []

- id: cmd_number_key
  command: CMD
  label: MD Number Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "10/0"

# Parameter: nn/nnn; source key: --/---
- id: cmd_digit_mode
  command: CMD
  label: MD Double/Triple Digit Key
  kind: action
  params: []

# Parameter: NAME
- id: cmd_name
  command: CMD
  label: MD Name
  kind: action
  params: []

# Parameter: GROUP
- id: cmd_group
  command: CMD
  label: MD Group
  kind: action
  params: []

# Parameter: STBY
- id: cmd_stby
  command: CMD
  label: MD Standby
  kind: action
  params: []

# CD-R Recorder (via RI)
# Parameter: P.MODE
- id: ccr_play_mode
  command: CCR
  label: CD-R Play Mode
  kind: action
  params: []

# Parameter: PLAY
- id: ccr_play
  command: CCR
  label: CD-R Play
  kind: action
  params: []

# Parameter: STOP
- id: ccr_stop
  command: CCR
  label: CD-R Stop
  kind: action
  params: []

# Parameter: SKIP.F
- id: ccr_skip_fwd
  command: CCR
  label: CD-R Skip Forward
  kind: action
  params: []

# Parameter: SKIP.R
- id: ccr_skip_rev
  command: CCR
  label: CD-R Skip Reverse
  kind: action
  params: []

# Parameter: PAUSE
- id: ccr_pause
  command: CCR
  label: CD-R Pause
  kind: action
  params: []

# Parameter: REC
- id: ccr_rec
  command: CCR
  label: CD-R Rec
  kind: action
  params: []

# Parameter: CLEAR
- id: ccr_clear
  command: CCR
  label: CD-R Clear
  kind: action
  params: []

# Parameter: REPEAT
- id: ccr_repeat
  command: CCR
  label: CD-R Repeat
  kind: action
  params: []

- id: ccr_number_key
  command: CCR
  label: CD-R Number Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "10/0"

# Parameter: nn/nnn; source key: --/---
- id: ccr_digit_mode
  command: CCR
  label: CD-R Double/Triple Digit Key
  kind: action
  params: []

# Parameter: SCROLL
- id: ccr_scroll
  command: CCR
  label: CD-R Scroll
  kind: action
  params: []

# Parameter: OP/CL
- id: ccr_open_close
  command: CCR
  label: CD-R Open/Close
  kind: action
  params: []

# Parameter: DISP
- id: ccr_display
  command: CCR
  label: CD-R Display
  kind: action
  params: []

# Parameter: RANDOM
- id: ccr_random
  command: CCR
  label: CD-R Random
  kind: action
  params: []

# Parameter: MEMORY
- id: ccr_memory
  command: CCR
  label: CD-R Memory
  kind: action
  params: []

# Parameter: FF
- id: ccr_ff
  command: CCR
  label: CD-R FF
  kind: action
  params: []

# Parameter: REW
- id: ccr_rew
  command: CCR
  label: CD-R REW
  kind: action
  params: []

# Parameter: STBY
- id: ccr_stby
  command: CCR
  label: CD-R Standby
  kind: action
  params: []

# Additional Zone Input Selector Values
- id: slz_select_additional
  command: SLZ
  label: Select Additional Zone 2 Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "31"  # XM
        - "32"  # SIRIUS

- id: sl3_select_additional
  command: SL3
  label: Select Additional Zone 3 Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "31"  # XM
        - "32"  # SIRIUS

- id: sl4_select_additional
  command: SL4
  label: Select Additional Zone 4 Input
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "31"  # XM
        - "32"  # SIRIUS
```

## Feedbacks
```yaml
# Device sends status messages in response to queries and unsolicited on state changes.
# Response format: {Command}{Parameter}[EOF] e.g. "SLI03[EOF]"
# Most query commands (QSTN) return current state as the feedback.

# UNRESOLVED: precise response value schemas not fully enumerated in source.
# Source documents command/response pairs but does not provide formal response schemas.

# SIRIUS Parental Lock: source documents display indications, not a query.
- id: slk_prompt
  command: SLK
  label: SIRIUS Parental Lock Prompt
  kind: feedback
  params:
    - name: status
      type: enum
      values:
        - "INPUT"  # displays"Please input the Lock password"
        - "WRONG"  # displays"The Lock password is wrong"
```

## Variables
```yaml
# UNRESOLVED: formal variable/parameter schemas not provided in source.
# Source describes settable values as part of action parameter documentation.
# No separate Variables section in source.
```

## Events
```yaml
# The device sends unsolicited status notifications when state changes:
# Format: {Command}{Parameter}[EOF]
# Examples from source:
# - Power state change: "PWR01" or "PWR00"
# - Input selector change: "SLI03"
# - Volume change: "MVL45"
# UNRESOLVED: complete event catalogue not enumerated; source describes
# event communication pattern but does not list all possible event types.
```

## Macros
```yaml
# UNRESOLVED: multi-step macro sequences not documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: zone2_requires_main_on
    description: Zone 2 volume and tone control only works when main unit is ON (from source: "only works when main is ON")
  - id: zone3_requires_main_on
    description: Zone 3 tone control only works when main unit is ON and Zone 3 is powered or variable (from source: "only works when main is ON and Zone3 is powered or variable")
# UNRESOLVED: no explicit safety warnings or interlock procedures in source beyond zone dependencies.
```

## Notes
ISCP message format: `!1{cmd}{param}[CR]` for main zone commands. Zone 2/3/4 use zone-specific command prefixes (ZPW/ZMT/ZVL/ZTN/ZBL/SLZ/TUZ/PRZ/NTZ/NPZ/LMZ/LTZ/RAZ for Z2; PW3/MT3/VL3/TN3/BL3/SL3/TU3/PR3/NT3/NP3 for Z3; PW4/MT4/VL4/SL4/TU4/PR4/NT4/NP4 for Z4).

RS-232C: 9600 baud / 8 data bits / 1 stop bit / no parity / no flow control. 9-pin female D-type connector (pin 2 TX, pin 3 RX, pin 5 GND). Straight-through cable. End character: `[CR]` or `[LF]` or `[CR][LF]`.

TCP (eISCP): Destination port 60128 default; configurable 49152-65535. eISCP header 16 bytes (size 0x00000010, version 0x01). ISCP message within eISCP data. End character: `[EOF]` or `[EOF][CR]` or `[EOF][CR][LF]` depending on model.

Minimum message interval: 50msec between receiver and controller. Device responds to commands within 50msec. Ethernet connections must be maintained continuously.

Tuner/Network/USB function shared across MAIN and ZONE sides, but control is separated per zone. XM/SIRIUS requires appropriate model variant. HD Radio requires HD Radio model variant.

FFW/REW Net-Tune commands must be sent continuously with no more than 100ms delay between codes. TGA/TGB/TGC 12V triggers only available when each trigger parameter is set to "OFF" in setup menu.

<!-- UNRESOLVED: firmware version compatibility for individual commands — source covers protocol v1.15 which added TX-NR1007/TX-NR3007/TX-NR5007; target models NR708/NR808/RZ800/RZ900/RZ810 may be older silicon and not support all v1.15 additions. -->
<!-- UNRESOLVED: video output resolution (VOS) command only available on Japanese model — applicability to target models unclear. -->
<!-- UNRESOLVED: video format temporary display (DIF03) shows "No" for all models in source — may not be implemented on target models. -->
<!-- UNRESOLVED: precise fault behavior and error recovery sequences not documented. -->
<!-- UNRESOLVED: authentication is not specified in the source. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-27T10:49:11.715Z
last_checked_at: 2026-10-07T13:37:27.826Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:37:27.826Z
matched_actions: 556
action_count: 556
confidence: medium
summary: "All 556 action units map one-to-one to ISCP command rows; transport matches; nothing missing; source is generic ISCP (model applicability inferred). (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility per model — source covers TX-SR707/NR807 and later for some commands; target models TX-NR708/NR808/RZ800/RZ900/RZ810 may not support all listed commands."
- "applicable range per target model'"
- "precise response value schemas not fully enumerated in source."
- "formal variable/parameter schemas not provided in source."
- "complete event catalogue not enumerated; source describes"
- "multi-step macro sequences not documented in source."
- "no explicit safety warnings or interlock procedures in source beyond zone dependencies."
- "firmware version compatibility for individual commands — source covers protocol v1.15 which added TX-NR1007/TX-NR3007/TX-NR5007; target models NR708/NR808/RZ800/RZ900/RZ810 may be older silicon and not support all v1.15 additions."
- "video output resolution (VOS) command only available on Japanese model — applicability to target models unclear."
- "video format temporary display (DIF03) shows \"No\" for all models in source — may not be implemented on target models."
- "precise fault behavior and error recovery sequences not documented."
- "authentication is not specified in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
