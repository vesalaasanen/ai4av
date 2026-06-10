---
spec_id: admin/marantz-nr1607-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR1607 Series Control Spec"
manufacturer: Marantz
model_family: NR1607
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NR1607
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T19:58:56.773Z
last_checked_at: 2026-06-09T13:30:39.951Z
generated_at: 2026-06-09T13:30:39.951Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - MSLEFT
  - MSRIGHT
  - "HDMI-CEC, trigger, IR remote, firmware update protocol not covered in source"
  - "many PS sub-commands (CINEMA EQ, LFC, DELAY, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, AUROPR, AUROST, etc.) - consult source for complete parameter sets"
  - "complete event list - source mentions events for many state changes"
  - "no explicit safety warnings in source; standard AVR handling implied"
  - "command timing beyond 50ms minimum not specified; network retry behavior not documented; error code definitions absent"
verification:
  verdict: verified
  checked_at: 2026-06-09T13:30:39.951Z
  matched_actions: 225
  action_count: 225
  confidence: medium
  summary: "All 225 spec actions match source commands with correct shapes and full transport support; only MSLEFT and MSRIGHT are unrepresented source MS modes (ratio 225/227=0.991). (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz NR1607 Series Control Spec

## Summary
AV receiver with TCP/IP (port 23 telnet) and RS-232C (DB-9, 9600bps, 8N1) control. ASCII command protocol with CR-terminated strings. Supports multi-zone operation (Main, Zone2, Zone3), audio/video routing, surround modes, tuner, and network/Bluetooth playback.

<!-- UNRESOLVED: HDMI-CEC, trigger, IR remote, firmware update protocol not covered in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # PWON/PWSTANDBY present
- routable       # SI input select, SD video input, Z2/Z3 zone source
- queryable      # ? query commands present throughout
- levelable      # MV master vol, CV channel vol, PS parametric EQ, PV picture
```

## Actions
```yaml
# Power
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status_query
  label: Power Status Query
  kind: action
  params: []

# Master Volume
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_set
  label: Master Volume Set (dB)
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 (ASCII), 80=0dB, 00=MIN"
- id: mv_status_query
  label: Master Volume Status Query
  kind: action
  params: []

# Mute
- id: mu_on
  label: Mute On
  kind: action
  params: []
- id: mu_off
  label: Mute Off
  kind: action
  params: []
- id: mu_status_query
  label: Mute Status Query
  kind: action
  params: []

# Input Select (SI)
- id: si_status_query
  label: Input Source Status Query
  kind: action
  params: []
# SI parameters (source, not discrete actions - list valid input values):
# PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET,
# PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES,
# AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP

# Main Zone (ZM)
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_status_query
  label: Main Zone Status Query
  kind: action
  params: []

# Surround Mode (MS) - many modes; representative set:
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  params: []
- id: ms_music
  label: Surround Mode Music
  kind: action
  params: []
- id: ms_game
  label: Surround Mode Game
  kind: action
  params: []
- id: ms_direct
  label: Surround Mode Direct
  kind: action
  params: []
- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  params: []
- id: ms_auto
  label: Surround Mode Auto
  kind: action
  params: []
- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  params: []
- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  params: []
- id: ms_status_query
  label: Surround Mode Status Query
  kind: action
  params: []

# Channel Volume (CV) - per-channel level control
- id: cvfl_up/down/set
  label: Front Left Channel Volume
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
    - name: action
      type: enum
      values: [UP, DOWN]
- id: cv_status_query
  label: Channel Volume Status Query
  kind: action
  params: []
- id: cvzrl
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []

# Tuner (TF/TP/TM)
- id: tfan_up/down
  label: Tuner Frequency Up/Down
  kind: action
  params: []
- id: tfan_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit frequency (e.g. 105000 for AM 1050kHz, 99900 for FM 99.90MHz)
- id: tfan_status_query
  label: Tuner Frequency Status Query
  kind: action
  params: []
- id: tp_preset_up/down
  label: Tuner Preset Up/Down
  kind: action
  params: []
- id: tp_preset_set
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tm_band_select
  label: Tuner Band Select (AM/FM)
  kind: action
  params:
    - name: band
      type: enum
      values: [ANAM (AM), ANFM (FM)]
- id: tm_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ANAUTO, ANMANUAL]

# Zone 2 (Z2) - mirrors main zone controls
- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: z2_up/down
  label: Zone 2 Volume Up/Down
  kind: action
  params: []
- id: z2mu_on/off
  label: Zone 2 Mute On/Off
  kind: action
  params: []

# Zone 3 (Z3) - mirrors zone 2
- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: z3_up/down
  label: Zone 3 Volume Up/Down
  kind: action
  params: []
- id: z3mu_on/off
  label: Zone 3 Mute On/Off
  kind: action
  params: []

# Sleep Timer
- id: slp_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: slp_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (ASCII)"
- id: slp_status_query
  label: Sleep Timer Status Query
  kind: action
  params: []

# ECO Mode
- id: eco_on/auto/off
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]

# Video Select (SV)
- id: sv_dvd/tv/sat_cbl/mplay/game/aux1-7/cd
  label: Video Select
  kind: action
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD]
- id: sv_on/off
  label: Video Select On/Off
  kind: action
  params: []
- id: sv_source
  label: Video Select Cancel
  kind: action
  params: []

# Digital Input (SD)
- id: sd_auto/hdmi/digital/analog/ext_in/7_1_in
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN]
- id: sd_status_query
  label: Digital Input Status Query
  kind: action
  params: []

# Video Scaler (VS)
- id: vs_asp_ful/nrm
  label: Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [ASPFUL, ASPNRM]
- id: vs_mon_auto/1/2
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: enum
      values: [MONIAUTO, MONI1, MONI2]
- id: vs_sc_resolution
  label: Scaler Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]
- id: vs_audio_amp/tv
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: enum
      values: [AUDIO AMP, AUDIO TV]
- id: vs_vpm_auto/game/movi
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [VPMAUTO, VPMGAME, VPMMOVI]

# Picture (PV)
- id: pv_off/std/mov/vvd/stm/ctm/day/ngt
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
- id: pv_cn_up/down/set
  label: Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 (050=0)"
- id: pv_br_up/down/set
  label: Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 (050=0)"
- id: pv_st_up/down/set
  label: Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: "000-100 (050=0)"
- id: pv_hue_up/down/set
  label: Hue
  kind: action
  params:
    - name: level
      type: integer
      description: "44-56 (50=0, range -6 to +6)"
- id: pv_dnr_off/low/mid/hi
  label: DNR Level
  kind: action
  params:
    - name: level
      type: enum
      values: [DNR OFF, DNR LOW, DNR MID, DNR HI]
- id: pv_enh_up/down/set
  label: Enhancer
  kind: action
  params:
    - name: level
      type: integer
      description: "00-12 (00=0)"

# Parameter Settings (PS) - EQ, Audyssey, etc.
- id: ps_tone_ctrl_on/off
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [TONE CTRL ON, TONE CTRL OFF]
- id: ps_bas_up/down/set
  label: Bass
  kind: action
  params:
    - name: action
      type: enum
      values: [BAS UP, BAS DOWN]
    - name: level
      type: integer
      description: "00-99 (50=0dB, range -10 to +10)"
- id: ps_tre_up/down/set
  label: Treble
  kind: action
  params:
    - name: action
      type: enum
      values: [TRE UP, TRE DOWN]
    - name: level
      type: integer
      description: "00-99 (50=0dB, range -10 to +10)"
- id: ps_mult_eq
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF]
- id: ps_dyneq_on/off
  label: Dynamic EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [DYNEQ ON, DYNEQ OFF]
- id: ps_dyn_vol
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: enum
      values: [DYNVOL HEV, DYNVOL MED, DYNVOL LIT, DYNVOL OFF]
- id: ps_reflev
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: "0, 5, 10, 15 (dB)"
- id: ps_graphic_eq_on/off
  label: Graphic EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [GEQ ON, GEQ OFF]
- id: ps_drc_auto/low/mid/hi/off
  label: Dynamic Compression
  kind: action
  params:
    - name: level
      type: enum
      values: [DRC AUTO, DRC LOW, DRC MID, DRC HI, DRC OFF]
- id: ps_dely_up/down/set
  label: Audio Delay
  kind: action
  params:
    - name: ms
      type: integer
      description: "000-999ms (000=0ms, range 0-300ms)"
- id: ps_front_speaker
  label: Front Speaker Select
  kind: action
  params:
    - name: speaker
      type: enum
      values: [FRONT SPA, FRONT SPB, FRONT A+B]

# UNRESOLVED: many PS sub-commands (CINEMA EQ, LFC, DELAY, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, AUROPR, AUROST, etc.) - consult source for complete parameter sets
- id: si_select
  label: Input Source Select
  kind: action
  params:
    - name: source
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
- id: zm_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  params: []
- id: ms_mch_stereo
  label: Surround Mode Multi Channel Stereo
  kind: action
  params: []
- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  params: []
- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  params: []
- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  params: []
- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  params: []
- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  params: []
- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  params: []
- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  params: []
- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  params: []
- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  params: []
- id: ms_auro3d
  label: Surround Mode Auro-3D
  kind: action
  params: []
- id: ms_auro2dsurr
  label: Surround Mode Auro 2D Surround
  kind: action
  params: []
- id: ms_quick_select
  label: Quick Select Mode
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]
- id: ms_quick_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: ms_quick_status_query
  label: Quick Select Status Query
  kind: action
  params: []
- id: stby_set
  label: Auto Standby Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [15M, 30M, 60M, OFF]
- id: stby_status_query
  label: Auto Standby Status Query
  kind: action
  params: []
- id: sv_status_query
  label: Video Select Status Query
  kind: action
  params: []
- id: sd_no
  label: Digital Input No Signal
  kind: action
  params: []
- id: dc_set
  label: Digital Input Conversion Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]
- id: dc_status_query
  label: Digital Input Conversion Status Query
  kind: action
  params: []
- id: sr_select
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE]
- id: sr_status_query
  label: Record Select Status Query
  kind: action
  params: []
- id: vs_sch_resolution
  label: HDMI Scaler Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO]
- id: vs_sch_status_query
  label: HDMI Scaler Resolution Status Query
  kind: action
  params: []
- id: vs_vst_on/off
  label: Vertical Stretch On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: vs_vst_status_query
  label: Vertical Stretch Status Query
  kind: action
  params: []
- id: vs_asp_status_query
  label: Aspect Ratio Status Query
  kind: action
  params: []
- id: vs_mon_status_query
  label: HDMI Monitor Status Query
  kind: action
  params: []
- id: vs_sc_status_query
  label: Scaler Resolution Status Query
  kind: action
  params: []
- id: vs_audio_status_query
  label: HDMI Audio Output Status Query
  kind: action
  params: []
- id: vs_vpm_status_query
  label: Video Processing Mode Status Query
  kind: action
  params: []
- id: ps_dil_on/off
  label: Dialog Level Adjust On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [DIL ON, DIL OFF]
- id: ps_dil_up/down/set
  label: Dialog Level
  kind: action
  params:
    - name: action
      type: enum
      values: [DIL UP, DIL DOWN]
    - name: level
      type: integer
      description: "38-62 by ASCII, 50=0dB"
- id: ps_swl_on/off
  label: Subwoofer Level Adjust On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [SWL ON, SWL OFF]
- id: ps_swl_up/down/set
  label: Subwoofer Level
  kind: action
  params:
    - name: action
      type: enum
      values: [SWL UP, SWL DOWN]
    - name: level
      type: integer
      description: "00,38-62 by ASCII, 50=0dB"
- id: ps_swl2_up/down/set
  label: Subwoofer 2 Level
  kind: action
  params:
    - name: action
      type: enum
      values: [SWL2 UP, SWL2 DOWN]
    - name: level
      type: integer
      description: "00,38-62 by ASCII, 50=0dB"
- id: ps_cinema_eq_on/off
  label: Cinema EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [CINEMA EQ.ON, CINEMA EQ.OFF]
- id: ps_mode_set
  label: Dolby PL Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC]
- id: ps_lom_on/off
  label: Loudness Management On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [PSLOM ON, PSLOM OFF]
- id: ps_fh_on/off
  label: Front Height Output On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [FH:ON, FH:OFF]
- id: ps_sp_set
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: enum
      values: [SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR]
- id: ps_phg_set
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: enum
      values: [PHG LOW, PHG MID, PHG HI]
- id: ps_lfc_on/off
  label: Audyssey LFC On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [LFC ON, LFC OFF]
- id: ps_cntamt_up/down/set
  label: Containment Amount
  kind: action
  params:
    - name: action
      type: enum
      values: [CNTAMT UP, CNTAMT DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, range 1-7"
- id: ps_dsx_set
  label: Audyssey DSX Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DSX ONHW, DSX ONH, DSX ONW, DSX OFF]
- id: ps_stw_up/down/set
  label: Stage Width
  kind: action
  params:
    - name: action
      type: enum
      values: [STW UP, STW DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: ps_sth_up/down/set
  label: Stage Height
  kind: action
  params:
    - name: action
      type: enum
      values: [STH UP, STH DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: ps_pan_on/off
  label: Panorama On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [PAN ON, PAN OFF]
- id: ps_dim_up/down/set
  label: Dimension
  kind: action
  params:
    - name: action
      type: enum
      values: [DIM UP, DIM DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0, range 0-6"
- id: ps_cen_up/down/set
  label: Center Width
  kind: action
  params:
    - name: action
      type: enum
      values: [CEN UP, CEN DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0, range 0-7"
- id: ps_cei_up/down/set
  label: Center Image
  kind: action
  params:
    - name: action
      type: enum
      values: [CEI UP, CEI DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0.0, range 0.0-1.0"
- id: ps_ceg_up/down/set
  label: Center Gain
  kind: action
  params:
    - name: action
      type: enum
      values: [CEG UP, CEG DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0.0, range 0.0-1.0"
- id: ps_ces_on/off
  label: Center Spread On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [CES ON, CES OFF]
- id: ps_swr_on/off
  label: Subwoofer On/Off Direct/Stereo Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [SWR ON, SWR OFF]
- id: ps_rsz_set
  label: Room Size
  kind: action
  params:
    - name: size
      type: enum
      values: [RSZ S, RSZ MS, RSZ M, RSZ ML, RSZ L]
- id: ps_bsc_up/down/set
  label: Bass Sync
  kind: action
  params:
    - name: action
      type: enum
      values: [BSC UP, BSC DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, range 0-16"
- id: ps_deh_set
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: enum
      values: [DEH OFF, DEH LOW, DEH MED, DEH HIGH]
- id: ps_lfe_up/down/set
  label: LFE Level
  kind: action
  params:
    - name: action
      type: enum
      values: [LFE UP, LFE DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 00=0dB, range 0 to -10"
- id: ps_lfl_set
  label: LFE Level EXT.IN Mode
  kind: action
  params:
    - name: level
      type: enum
      values: [LFL 00, LFL 05, LFL 10, LFL 15]
- id: ps_eff_on/off
  label: Effect On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [EFF ON, EFF OFF]
- id: ps_eff_up/down/set
  label: Effect Level
  kind: action
  params:
    - name: action
      type: enum
      values: [EFF UP, EFF DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, range 1-15"
- id: ps_delay_up/down/set
  label: Audio Delay PSDELAY
  kind: action
  params:
    - name: action
      type: enum
      values: [DELAY UP, DELAY DOWN]
    - name: ms
      type: integer
      description: "000-999 by ASCII, 000=0ms, range 0-200ms"
- id: ps_rstr_set
  label: Audio Restorer
  kind: action
  params:
    - name: level
      type: enum
      values: [RSTR OFF, RSTR LOW, RSTR MED, RSTR HI]
- id: ps_auropr_set
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: enum
      values: [AUROPR SMA, AUROPR MED, AUROPR LAR, AUROPR SPE]
- id: ps_aurost_up/down/set
  label: Auro-Matic 3D Strength
  kind: action
  params:
    - name: action
      type: enum
      values: [AUROST UP, AUROST DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, range 1-16"
- id: z2_source_select
  label: Zone 2 Input Source Select
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
- id: z2_status_query
  label: Zone 2 Status Query
  kind: action
  params: []
- id: z2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 by ASCII, 80=0dB"
- id: z2mu_status_query
  label: Zone 2 Mute Status Query
  kind: action
  params: []
- id: z2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]
- id: z2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: z2_quick_status_query
  label: Zone 2 Quick Select Status Query
  kind: action
  params: []
- id: z2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: z2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: z2cs_set
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
- id: z2cs_status_query
  label: Zone 2 Channel Setting Status Query
  kind: action
  params: []
- id: z2cv_up/down/set
  label: Zone 2 Channel Volume
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: action
      type: enum
      values: [UP, DOWN]
- id: z2cv_status_query
  label: Zone 2 Channel Volume Status Query
  kind: action
  params: []
- id: z2hpf_on/off
  label: Zone 2 HPF On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: z2hpf_status_query
  label: Zone 2 HPF Status Query
  kind: action
  params: []
- id: z2ps_bas_up/down/set
  label: Zone 2 Bass
  kind: action
  params:
    - name: action
      type: enum
      values: [BAS UP, BAS DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: z2ps_tre_up/down/set
  label: Zone 2 Treble
  kind: action
  params:
    - name: action
      type: enum
      values: [TRE UP, TRE DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: z2hda_set
  label: Zone 2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: enum
      values: [THR, PCM]
- id: z2hda_status_query
  label: Zone 2 HDMI Audio Status Query
  kind: action
  params: []
- id: z2slp_set
  label: Zone 2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "OFF or 001-120 by ASCII"
- id: z2slp_status_query
  label: Zone 2 Sleep Timer Status Query
  kind: action
  params: []
- id: z2stby_set
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [2H, 4H, 8H, OFF]
- id: z2stby_status_query
  label: Zone 2 Auto Standby Status Query
  kind: action
  params: []
- id: z3_source_select
  label: Zone 3 Input Source Select
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
- id: z3_status_query
  label: Zone 3 Status Query
  kind: action
  params: []
- id: z3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98 by ASCII, 80=0dB"
- id: z3mu_status_query
  label: Zone 3 Mute Status Query
  kind: action
  params: []
- id: z3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]
- id: z3_quick_memory
  label: Zone 3 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: z3_quick_status_query
  label: Zone 3 Quick Select Status Query
  kind: action
  params: []
- id: z3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: z3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: z3cs_set
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
- id: z3cs_status_query
  label: Zone 3 Channel Setting Status Query
  kind: action
  params: []
- id: z3cv_up/down/set
  label: Zone 3 Channel Volume
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: action
      type: enum
      values: [UP, DOWN]
- id: z3cv_status_query
  label: Zone 3 Channel Volume Status Query
  kind: action
  params: []
- id: z3hpf_on/off
  label: Zone 3 HPF On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: z3hpf_status_query
  label: Zone 3 HPF Status Query
  kind: action
  params: []
- id: z3ps_bas_up/down/set
  label: Zone 3 Bass
  kind: action
  params:
    - name: action
      type: enum
      values: [BAS UP, BAS DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: z3ps_tre_up/down/set
  label: Zone 3 Treble
  kind: action
  params:
    - name: action
      type: enum
      values: [TRE UP, TRE DOWN]
    - name: level
      type: integer
      description: "00-99 by ASCII, 50=0dB, range -10 to +10"
- id: z3slp_set
  label: Zone 3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: "OFF or 001-120 by ASCII"
- id: z3slp_status_query
  label: Zone 3 Sleep Timer Status Query
  kind: action
  params: []
- id: z3stby_set
  label: Zone 3 Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [2H, 4H, 8H, OFF]
- id: z3stby_status_query
  label: Zone 3 Auto Standby Status Query
  kind: action
  params: []
- id: tfan_name_query
  label: Tuner RDS Station Name Query
  kind: action
  params: []
- id: tpan_mem
  label: Tuner Preset Memory Toggle
  kind: action
  params: []
- id: tpan_mem_set
  label: Tuner Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tfhd_up/down
  label: HD Radio Frequency Up/Down
  kind: action
  params: []
- id: tfhd_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6-digit frequency e.g. TFHD105000"
- id: tfhd_mc_set
  label: HD Radio Multicast Channel Set
  kind: action
  params:
    - name: channel
      type: integer
      description: "1 digit: 1-8 multicast, 0 analog"
- id: tfhd_status_query
  label: HD Radio Frequency Status Query
  kind: action
  params: []
- id: tphd_up/down
  label: HD Radio Preset Up/Down
  kind: action
  params: []
- id: tphd_set
  label: HD Radio Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tphd_mem
  label: HD Radio Preset Memory Toggle
  kind: action
  params: []
- id: tphd_mem_set
  label: HD Radio Preset Memory Direct
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tphd_status_query
  label: HD Radio Preset Status Query
  kind: action
  params: []
- id: tmhd_band_select
  label: HD Radio Band Select
  kind: action
  params:
    - name: band
      type: enum
      values: [HDAM, HDFM]
- id: tmhd_tuning_mode
  label: HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU]
- id: tmhd_status_query
  label: HD Radio Band/Mode Status Query
  kind: action
  params: []
- id: hd_status_query
  label: HD Radio Status Query
  kind: action
  params: []
- id: ns_nav
  label: Online/USB/BT Navigation Control
  kind: action
  params:
    - name: code
      type: enum
      values: ["90", "91", "92", "93", "94", 9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H, 9I, 9J, 9K, 9M, 9W, 9X, 9Y, 9Z, RPT, RND]
- id: ns_preset_call
  label: Net/USB Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: ns_preset_memory
  label: Net/USB Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35"
- id: ns_preset_name_query
  label: Net/USB Preset Name Query
  kind: action
  params: []
- id: ns_fv_mem
  label: Net/USB Add Favorites Folder
  kind: action
  params: []
- id: nsa_query
  label: Onscreen Display Query ASCII
  kind: action
  params: []
- id: nse_query
  label: Onscreen Display Query UTF-8
  kind: action
  params: []
- id: mn_nav
  label: System Menu Navigation
  kind: action
  params:
    - name: code
      type: enum
      values: [CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL]
- id: mn_men_on/off
  label: Setup Menu On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [MEN ON, MEN OFF]
- id: mn_men_status_query
  label: Setup Menu Status Query
  kind: action
  params: []
- id: mn_prv_on/off
  label: InstaPrevue On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [PRV ON, PRV OFF]
- id: mn_prv_status_query
  label: InstaPrevue Status Query
  kind: action
  params: []
- id: mn_zst_on/off
  label: All Zone Stereo On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ZST ON, ZST OFF]
- id: mn_zst_status_query
  label: All Zone Stereo Status Query
  kind: action
  params: []
- id: sy_remote_lock_on/off
  label: Remote Lock On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [REMOTE LOCK ON, REMOTE LOCK OFF]
- id: sy_panel_lock_set
  label: Panel Lock Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF]
- id: tr_set
  label: Trigger On/Off
  kind: action
  params:
    - name: trigger
      type: enum
      values: ["1 ON", "1 OFF", "2 ON", "2 OFF"]
- id: tr_status_query
  label: Trigger Status Query
  kind: action
  params: []
- id: dim_set
  label: Dimmer Set
  kind: action
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
- id: ug_idn
  label: Upgrade ID Number Display
  kind: action
  params: []
- id: rm_set
  label: Remote Maintenance Mode
  kind: action
  params:
    - name: state
      type: enum
      values: [STA, END]
- id: rm_status_query
  label: Remote Maintenance Status Query
  kind: action
  params: []
```

## Feedbacks
```yaml
# Responses mirror command+parameter format with ? suffix
# Example patterns from source:
- id: pw_status
  type: enum
  values: [PWON, PWSTANDBY]
- id: mv_status
  type: string
  description: "MVnnn<CR> where nnn=00-98 (80=0dB)"
- id: si_status
  type: string
  description: "SI<source><CR>"
- id: mu_status
  type: enum
  values: [MUON, MUOFF]
- id: zm_status
  type: enum
  values: [ZMON, ZMOFF]
- id: ms_status
  type: string
  description: "MS<mode><CR>"
- id: cv_status
  type: string
  description: "CV<channel> <level><CR> e.g. CVFL 50"
- id: cv_end
  type: string
  description: "CVEND<CR> - terminator for multi-channel CV response"
- id: slp_status
  type: string
  description: "SLPnnn<CR> (001-120 minutes)"
- id: eco_status
  type: enum
  values: [ECOON, ECOAUTO, ECOOFF]
- id: tf_status
  type: string
  description: "TFANffffff<CR> (6-digit frequency)"
- id: tp_status
  type: string
  description: "TPANnn<CR> (preset 01-56) or TPANOFF"
- id: tm_status
  type: string
  description: "TMAN<band><CR>"

# HD Radio feedback fields (from HD? response):
- id: hd_station_name
  type: string
  description: "HDST NAME********"
- id: hd_signal_level
  type: integer
  description: "HDSIG LEV 0-6"
- id: hd_artist
  type: string
  description: "HDARTIST (40 digits)"
- id: hd_title
  type: string
  description: "HDTITLE (40 digits)"
- id: hd_album
  type: string
  description: "HDALBUM (40 digits)"
- id: hd_genre
  type: string
  description: "HDGENRE (23 digits)"
```

## Variables
```yaml
# Tuner frequency is a settable/readable variable
- id: tuner_frequency
  type: integer
  description: "AM: kHz (e.g. 1050 = 1050kHz), FM: MHz*100 (e.g. 9990 = 99.90MHz)"
- id: tuner_preset
  type: integer
  description: "01-56"
- id: hd_multi_cast_channel
  type: integer
  description: "HDMLT CURRCH/Hnn"
```

## Events
```yaml
# Device sends EVENT messages when state changes directly (not via IP command)
# Format same as COMMAND; sent within 5 seconds of state change
- id: power_event
  type: enum
  values: [PWON, PWSTANDBY]
- id: input_changed_event
  type: string
  description: "SI<source><CR>"
- id: volume_changed_event
  type: string
  description: "MVnnn<CR> or CV<ch> <level><CR>"
- id: mute_changed_event
  type: enum
  values: [MUON, MUOFF]
- id: surround_mode_changed_event
  type: string
  description: "MS<mode><CR>"
# UNRESOLVED: complete event list - source mentions events for many state changes
```

## Macros
```yaml
# Source describes power-on sequencing:
- id: power_on_sequence
  description: "Wait 1 second after PWON before sending next command"
  steps:
    - command: PWON
    - delay: 1000ms
    - note: "1 second later, please transmit the next COMMAND"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings in source; standard AVR handling implied
```

## Notes
- Commands terminator: CR (0x0D); send commands at 50ms+ intervals
- RESPONSE within 200ms of request; EVENT within 5 seconds of state change
- Half duplex on both serial and TCP
- ASCII range: 0x20-0x7F; parameter max 25 chars
- Volume 0.5dB step uses 3 ASCII chars (e.g. MV805 = +0.5dB)
- Zone2 and Zone3 control independently mirror main zone commands with Z2/Z3 prefix
- HD Radio metadata (artist/title/album) returned via NSH command
- Auro-3D commands only on upgraded units
<!-- UNRESOLVED: command timing beyond 50ms minimum not specified; network retry behavior not documented; error code definitions absent -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T19:58:56.773Z
last_checked_at: 2026-06-09T13:30:39.951Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T13:30:39.951Z
matched_actions: 225
action_count: 225
confidence: medium
summary: "All 225 spec actions match source commands with correct shapes and full transport support; only MSLEFT and MSRIGHT are unrepresented source MS modes (ratio 225/227=0.991). (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- MSLEFT
- MSRIGHT
- "HDMI-CEC, trigger, IR remote, firmware update protocol not covered in source"
- "many PS sub-commands (CINEMA EQ, LFC, DELAY, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, RSTR, AUROPR, AUROST, etc.) - consult source for complete parameter sets"
- "complete event list - source mentions events for many state changes"
- "no explicit safety warnings in source; standard AVR handling implied"
- "command timing beyond 50ms minimum not specified; network retry behavior not documented; error code definitions absent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
