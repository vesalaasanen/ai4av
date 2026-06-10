---
spec_id: admin/marantz-sr5012-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5012 Series Control Spec"
manufacturer: Marantz
model_family: SR5012
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR5012
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:00:43.736Z
last_checked_at: 2026-06-09T19:28:54.639Z
generated_at: 2026-06-09T19:28:54.639Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TFANNAME?"
  - "HD?"
  - NSH
  - "TFHD******MC*"
  - "zone video/HDMI routing commands not fully enumerated in source"
  - "full variable enumerate from source - many PS (parameter setup) commands"
  - "complete list of unsolicited event codes not enumerated in source"
  - "multi-step macros not explicitly described in source"
  - "firmware version compatibility not stated"
  - "zone video output routing (VS commands) full parameter list"
  - "complete HD Radio / Online Music feedback event list"
  - "authentication mechanism for IP control if any"
verification:
  verdict: verified
  checked_at: 2026-06-09T19:28:54.639Z
  matched_actions: 246
  action_count: 246
  confidence: medium
  summary: "All 246 spec actions match source wire commands with correct shapes and transport is verified; only 4 source-only tokens (TFANNAME?, HD?, NSH, TFHD******MC*) fall below the 5-token short threshold yielding 0.984 coverage. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5012 Series Control Spec

## Summary
Marantz SR5012 Series AV receiver. Control via RS-232C (9600bps 8N1) or Ethernet TCP port 23 (Telnet). ASCII command protocol with 2-char command codes + parameters + CR (0x0D). Supports power, volume, input selection, surround mode, multi-zone, tuner, and system control.

<!-- UNRESOLVED: zone video/HDMI routing commands not fully enumerated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # stated: TCP port 23 (telnet)
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: pw_on
  label: Power On
  kind: action
  params: []
- id: pw_standby
  label: Power Standby
  kind: action
  params: []
- id: pw_query
  label: Power Status Query
  kind: query
  params: []
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=--- (min). 0.5dB steps use 3 ASCII chars (e.g. MV805 for +0.5dB)"
- id: mu_on
  label: Mute On
  kind: action
  params: []
- id: mu_off
  label: Mute Off
  kind: action
  params: []
- id: si_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: ms_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5"
- id: sd_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: sv_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF"
- id: slp_set
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, 010=10min. Use 0 or OFF to cancel."
- id: stby_set
  label: Auto Standby
  kind: action
  params:
    - name: minutes
      type: string
      description: "15M, 30M, 60M, OFF"
- id: eco_set
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: ps_tone_on
  label: Tone Control On
  kind: action
  params: []
- id: ps_tone_off
  label: Tone Control Off
  kind: action
  params: []
- id: ps_bas_up
  label: Bass Up
  kind: action
  params: []
- id: ps_bas_down
  label: Bass Down
  kind: action
  params: []
- id: ps_bas_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -6 to +6dB (44-56)."
- id: ps_tre_up
  label: Treble Up
  kind: action
  params: []
- id: ps_tre_down
  label: Treble Down
  kind: action
  params: []
- id: ps_tre_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -6 to +6dB (44-56)."
- id: ps_multieq
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: ps_dyneeq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_reflev
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: "0, 5, 10, 15 dB"
- id: ps_dynvol
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: "HEV (Heavy), MED (Medium), LIT (Light), OFF"
- id: psdel_set
  label: Audio Delay
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms, 300=300ms. Range 0-200ms."
- id: pv_picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: tr_set
  label: Trigger
  kind: action
  params:
    - name: trigger
      type: integer
      description: "1 or 2"
    - name: state
      type: string
      description: "ON, OFF"
- id: dim_set
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: "BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)"
- id: mn_menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: cv_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
- id: cv_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
- id: cv_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB. SW/SW2 also accept 00."
- id: cv_reset
  label: Channel Volume Reset All
  kind: action
  params: []
- id: zm_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: ms_quick_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: sr_source
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"
- id: dc_mode
  label: Digital Input Auto/PCM/DTS Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: vs_aspect
  label: Video Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"
- id: vs_monitor
  label: HDMI Monitor Output
  kind: action
  params:
    - name: mode
      type: string
      description: "MONIAUTO, MONI1, MONI2"
- id: vs_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
- id: vs_hdmi_resolution
  label: HDMI Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: vs_audio
  label: HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDIO AMP, AUDIO TV"
- id: vs_video_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: vs_vstretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: "VST ON, VST OFF"
- id: ps_dil_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: ps_dil_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: ps_dil_up
  label: Dialog Level Up
  kind: action
  params: []
- id: ps_dil_down
  label: Dialog Level Down
  kind: action
  params: []
- id: ps_dil_set
  label: Dialog Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: ps_swl_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: ps_swl_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: ps_swl_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: ps_swl_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: ps_swl_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"
- id: ps_swl2_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
- id: ps_swl2_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
- id: ps_swl2_set
  label: Subwoofer 2 Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"
- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: ps_mode
  label: PL2/PL2x/NEO:6 Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
- id: ps_loudness_on
  label: Loudness Management On
  kind: action
  params: []
- id: ps_loudness_off
  label: Loudness Management Off
  kind: action
  params: []
- id: ps_front_height_on
  label: Front Height Output On
  kind: action
  params: []
- id: ps_front_height_off
  label: Front Height Output Off
  kind: action
  params: []
- id: ps_speaker
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: ps_phg
  label: PL2z Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  params: []
- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  params: []
- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  params:
    - name: amount
      type: string
      description: "01-07 ASCII, range 1-7"
- id: ps_dsx
  label: Audyssey DSX
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
- id: ps_stw_up
  label: Stage Width Up
  kind: action
  params: []
- id: ps_stw_down
  label: Stage Width Down
  kind: action
  params: []
- id: ps_stw_set
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: ps_sth_up
  label: Stage Height Up
  kind: action
  params: []
- id: ps_sth_down
  label: Stage Height Down
  kind: action
  params: []
- id: ps_sth_set
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: ps_drc
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: ps_bsc_up
  label: Bass Sync Up
  kind: action
  params: []
- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  params: []
- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, range 0-16"
- id: ps_deh
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: ps_lfe_up
  label: LFE Up
  kind: action
  params: []
- id: ps_lfe_down
  label: LFE Down
  kind: action
  params: []
- id: ps_lfe_set
  label: LFE Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB, 10=-10dB. Range 0 to -10dB."
- id: ps_lfl
  label: LFE Level
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"
- id: ps_eff_on
  label: Effect On
  kind: action
  params: []
- id: ps_eff_off
  label: Effect Off
  kind: action
  params: []
- id: ps_eff_up
  label: Effect Level Up
  kind: action
  params: []
- id: ps_eff_down
  label: Effect Level Down
  kind: action
  params: []
- id: ps_eff_set
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0, 10=10dB. Range 1-15."
- id: ps_del_up
  label: PS Delay Up
  kind: action
  params: []
- id: ps_del_down
  label: PS Delay Down
  kind: action
  params: []
- id: ps_del_set
  label: PS Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ASCII, 000=0ms. Range 0-300ms."
- id: ps_pan_on
  label: Panorama On
  kind: action
  params: []
- id: ps_pan_off
  label: Panorama Off
  kind: action
  params: []
- id: ps_dim_up
  label: Dimension Up
  kind: action
  params: []
- id: ps_dim_down
  label: Dimension Down
  kind: action
  params: []
- id: ps_dim_set
  label: Dimension Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0. Range 0-6."
- id: ps_cen_up
  label: Center Width Up
  kind: action
  params: []
- id: ps_cen_down
  label: Center Width Down
  kind: action
  params: []
- id: ps_cen_set
  label: Center Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0. Range 0-7."
- id: ps_cei_up
  label: Center Image Up
  kind: action
  params: []
- id: ps_cei_down
  label: Center Image Down
  kind: action
  params: []
- id: ps_cei_set
  label: Center Image Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0. Range 0.0-1.0."
- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  params: []
- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  params: []
- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0.0. Range 0.0-1.0."
- id: ps_ces_on
  label: Center Spread On
  kind: action
  params: []
- id: ps_ces_off
  label: Center Spread Off
  kind: action
  params: []
- id: ps_swr_on
  label: Subwoofer Direct/Stereo Mode On
  kind: action
  params: []
- id: ps_swr_off
  label: Subwoofer Direct/Stereo Mode Off
  kind: action
  params: []
- id: ps_rsz
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: ps_rstr
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
- id: ps_front_sp
  label: Front Speaker
  kind: action
  params:
    - name: config
      type: string
      description: "SPA, SPB, A+B"
- id: ps_auropr
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: level
      type: string
      description: "01-99 ASCII, range 1-16"
- id: pv_contrast_up
  label: Picture Contrast Up
  kind: action
  params: []
- id: pv_contrast_down
  label: Picture Contrast Down
  kind: action
  params: []
- id: pv_contrast_set
  label: Picture Contrast Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0. Range -50 to +50."
- id: pv_brightness_up
  label: Picture Brightness Up
  kind: action
  params: []
- id: pv_brightness_down
  label: Picture Brightness Down
  kind: action
  params: []
- id: pv_brightness_set
  label: Picture Brightness Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0. Range -50 to +50."
- id: pv_saturation_up
  label: Picture Saturation Up
  kind: action
  params: []
- id: pv_saturation_down
  label: Picture Saturation Down
  kind: action
  params: []
- id: pv_saturation_set
  label: Picture Saturation Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0. Range -50 to +50."
- id: pv_hue_up
  label: Picture Hue Up
  kind: action
  params: []
- id: pv_hue_down
  label: Picture Hue Down
  kind: action
  params: []
- id: pv_hue_set
  label: Picture Hue Set
  kind: action
  params:
    - name: level
      type: string
      description: "44-56 ASCII, 50=0. Range -6 to +6."
- id: pv_dnr
  label: DNR
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MID, HI"
- id: pv_enhancer_up
  label: Picture Enhancer Up
  kind: action
  params: []
- id: pv_enhancer_down
  label: Picture Enhancer Down
  kind: action
  params: []
- id: pv_enhancer_set
  label: Picture Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-12 ASCII, range 0-12"
- id: z2_source
  label: Zone 2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: z2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=--- (min)"
- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: z2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: z2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: z2_channel
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: z2_cv_up
  label: Zone 2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: z2_cv_down
  label: Zone 2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: z2_cv_set
  label: Zone 2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
- id: z2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
- id: z2_bass_up
  label: Zone 2 Bass Up
  kind: action
  params: []
- id: z2_bass_down
  label: Zone 2 Bass Down
  kind: action
  params: []
- id: z2_bass_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: z2_treble_up
  label: Zone 2 Treble Up
  kind: action
  params: []
- id: z2_treble_down
  label: Zone 2 Treble Down
  kind: action
  params: []
- id: z2_treble_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: z2_hda
  label: Zone 2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: "THR, PCM"
- id: z2_sleep
  label: Zone 2 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: "OFF, 001-120 ASCII, 010=10min"
- id: z2_standby
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: "2H, 4H, 8H, OFF"
- id: z2_quick
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: z2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: z2_favorite
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: z2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: z3_source
  label: Zone 3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: z3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: z3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: z3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=--- (min)"
- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: z3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
- id: z3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
- id: z3_channel
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: z3_cv_up
  label: Zone 3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: z3_cv_down
  label: Zone 3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: z3_cv_set
  label: Zone 3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: z3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
- id: z3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
- id: z3_bass_up
  label: Zone 3 Bass Up
  kind: action
  params: []
- id: z3_bass_down
  label: Zone 3 Bass Down
  kind: action
  params: []
- id: z3_bass_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: z3_treble_up
  label: Zone 3 Treble Up
  kind: action
  params: []
- id: z3_treble_down
  label: Zone 3 Treble Down
  kind: action
  params: []
- id: z3_treble_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB. Range -10 to +10 (40-60)."
- id: z3_sleep
  label: Zone 3 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: "OFF, 001-120 ASCII, 010=10min"
- id: z3_standby
  label: Zone 3 Auto Standby
  kind: action
  params:
    - name: hours
      type: string
      description: "2H, 4H, 8H, OFF"
- id: z3_quick
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: z3_quick_memory
  label: Zone 3 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
- id: z3_favorite
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: z3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
- id: tf_freq_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tf_freq_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tf_freq_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII: ****.**MHz FM (<050000) or ****.** kHz AM (>050000)"
- id: tp_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tp_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tp_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"
- id: tp_preset_mem
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tp_preset_mem_set
  label: Tuner Preset Memory Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"
- id: tm_band
  label: Tuner Band Select
  kind: action
  params:
    - name: band
      type: string
      description: "ANAM (AM), ANFM (FM)"
- id: tm_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ANAUTO, ANMANUAL"
- id: tf_hd_up
  label: HD Radio Frequency Up
  kind: action
  params: []
- id: tf_hd_down
  label: HD Radio Frequency Down
  kind: action
  params: []
- id: tf_hd_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII: ****.**MHz FM or ****.** kHz AM"
- id: tf_hd_mc
  label: HD Radio Multicast Channel Select
  kind: action
  params:
    - name: channel
      type: string
      description: "1-digit ASCII: 1-8 HD multicast, 0=Analog"
- id: tp_hd_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: tp_hd_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: tp_hd_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"
- id: tp_hd_mem
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: tp_hd_mem_set
  label: HD Radio Preset Memory Set
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"
- id: tm_hd_band
  label: HD Radio Band Select
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM (AM), HDFM (FM)"
- id: tm_hd_mode
  label: HD Radio Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
- id: ns_control
  label: Online Music / Bluetooth Navigation
  kind: action
  params:
    - name: code
      type: string
      description: "90 (up), 91 (down), 92 (left), 93 (right), 94 (enter), 9A (play), 9B (pause), 9C (stop), 9D (skip+), 9E (skip-), 9F (search+), 9G (search-), 9H (repeat1), 9I (repeatAll), 9J (repeatOff), 9K (randomOn), 9M (randomOff), 9W (toggle), 9X (pageNext), 9Y (pagePrev), 9Z (searchStop), RPT (repeat toggle), RND (random toggle)"
- id: ns_preset_call
  label: Online Music Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 ASCII"
- id: ns_preset_memory
  label: Online Music Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 ASCII"
- id: ns_fav_add
  label: Add Favorites Folder
  kind: action
  params: []
- id: ns_display_ascii
  label: Online Music Display ASCII
  kind: action
  params: []
- id: ns_display_utf8
  label: Online Music Display UTF-8
  kind: action
  params: []
- id: mn_cursor_up
  label: Menu Cursor Up
  kind: action
  params: []
- id: mn_cursor_down
  label: Menu Cursor Down
  kind: action
  params: []
- id: mn_cursor_left
  label: Menu Cursor Left
  kind: action
  params: []
- id: mn_cursor_right
  label: Menu Cursor Right
  kind: action
  params: []
- id: mn_enter
  label: Menu Enter
  kind: action
  params: []
- id: mn_return
  label: Menu Return
  kind: action
  params: []
- id: mn_option
  label: Menu Option
  kind: action
  params: []
- id: mn_info
  label: Menu Info
  kind: action
  params: []
- id: mn_channel_level
  label: Channel Level Adjust Menu
  kind: action
  params: []
- id: mn_instaprevue_on
  label: InstaPrevue On
  kind: action
  params: []
- id: mn_instaprevue_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: mn_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: mn_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: sy_panel_lock_on
  label: Panel Lock On (Except Master Volume)
  kind: action
  params: []
- id: sy_panel_v_lock_on
  label: Panel And Volume Lock On
  kind: action
  params: []
- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
- id: ug_idn
  label: Display ID Number for Upgrade
  kind: action
  params: []
- id: rm_start
  label: Remote Maintenance Mode Start
  kind: action
  params: []
- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: pw_status
  type: enum
  values: [PWON, PWSTANDBY]
- id: mv_status
  type: string
  description: "MV ASCII value, 80=0dB"
- id: mu_status
  type: enum
  values: [MUON, MUOFF]
- id: si_status
  type: string
  description: "Current input source code"
- id: ms_status
  type: string
  description: "Current surround mode"
- id: cv_status
  type: string
  description: "Channel volume status per speaker"
- id: zm_status
  type: enum
  values: [ZMON, ZMOFF]
- id: slp_status
  type: string
  description: "SLP timer value 001-120"
- id: eco_status
  type: enum
  values: [ECOON, ECOAUTO, ECOOFF]
- id: mnmen_status
  type: enum
  values: [MNMEN ON, MNMEN OFF]
```

## Variables
```yaml
# UNRESOLVED: full variable enumerate from source - many PS (parameter setup) commands
# are effectively settable variables but source does not enumerate all response values
```

## Events
```yaml
# Device sends EVENT messages when state changes directly (not via IP control)
# EVENT format matches COMMAND format (same 2-char code + parameter + CR)
# Sent within 5 seconds of state change
# UNRESOLVED: complete list of unsolicited event codes not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: multi-step macros not explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 1 second after PWON command before sending next command (source note J)"
  - "Maintain 50ms minimum interval between commands sent to device"
```

## Notes
- Half duplex communication on both RS-232 and Ethernet
- Max data length: 135 bytes per message
- TCP port 23 (telnet) for IP control
- RS-232: 9600bps, 8 data bits, no parity, 1 stop bit, DB-9 female DCE
- RESPONSE to query commands must be sent within 200ms
- EVENT sent within 5 seconds of state change
- ASCII characters 0x20-0x7F only; CR (0x0D) as terminator
- Volume 0.5dB steps use 3 ASCII chars (e.g., MV805 = +0.5dB)
- Device responds to commands during EVENT transmission
- Power on command (PWON) requires 1 second wait before next command
- Minimum 50ms between commands to device
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: zone video output routing (VS commands) full parameter list -->
<!-- UNRESOLVED: complete HD Radio / Online Music feedback event list -->
<!-- UNRESOLVED: authentication mechanism for IP control if any -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:00:43.736Z
last_checked_at: 2026-06-09T19:28:54.639Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T19:28:54.639Z
matched_actions: 246
action_count: 246
confidence: medium
summary: "All 246 spec actions match source wire commands with correct shapes and transport is verified; only 4 source-only tokens (TFANNAME?, HD?, NSH, TFHD******MC*) fall below the 5-token short threshold yielding 0.984 coverage. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TFANNAME?"
- "HD?"
- NSH
- "TFHD******MC*"
- "zone video/HDMI routing commands not fully enumerated in source"
- "full variable enumerate from source - many PS (parameter setup) commands"
- "complete list of unsolicited event codes not enumerated in source"
- "multi-step macros not explicitly described in source"
- "firmware version compatibility not stated"
- "zone video output routing (VS commands) full parameter list"
- "complete HD Radio / Online Music feedback event list"
- "authentication mechanism for IP control if any"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
