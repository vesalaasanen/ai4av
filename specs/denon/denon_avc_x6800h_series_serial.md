---
spec_id: admin/denon-avc-x6800h-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVC-X6800H Series Control Spec"
manufacturer: Denon
model_family: "AVC-X6800H Series"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "AVC-X6800H Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:18:27.021Z
last_checked_at: 2026-10-07T13:18:27.021Z
generated_at: 2026-10-07T13:18:27.021Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete command set for network/API control; detailed event taxonomy for unsolicited notifications; firmware version compatibility"
  - "populate from source if applicable, or remove section"
  - "detailed event taxonomy not fully specified in source"
  - "no explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "complete event list with parameter ranges; firmware compatibility; network standby behavior details"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:18:27.021Z
  matched_actions: 304
  action_count: 304
  confidence: medium
  summary: "All 304 action units match source command tables; transport (9600 8N1, TCP 23) supported; source is a generic Denon protocol doc so model applicability is inferred. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Denon AVC-X6800H Series Control Spec

## Summary
Denon AVC-X6800H Series AV receiver with multi-zone power, volume, input routing, surround mode, and tuner control. Supports RS-232C and TCP/IP (Telnet) control with ASCII command protocol terminated by CR (0x0D). Max message length 135 bytes. Authentication requirements are UNRESOLVED.

<!-- UNRESOLVED: complete command set for network/API control; detailed event taxonomy for unsolicited notifications; firmware version compatibility -->

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
  flow_control: UNRESOLVED  # source does not specify flow control
addressing:
  port: 23  # TCP port 23 (Telnet)
auth:
  type: UNRESOLVED  # source does not state authentication requirements
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
  label: Master Volume Set (dB)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-98, 80=0dB, 00=---MIN
- id: mv_query
  label: Master Volume Query
  kind: query
  params: []
- id: cv_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: enum
      values:
        - FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: cv_set_direct
  label: Channel Volume Direct (dB)
  kind: action
  params:
    - name: channel
      type: string
    - name: level
      type: string
      description: ASCII 38-62 or 00/38-62 for SW, 50=0dB
- id: cv_query
  label: Channel Volume Query
  kind: query
  params: []
- id: mu_on
  label: Mute On
  kind: action
  params: []
- id: mu_off
  label: Mute Off
  kind: action
  params: []
- id: mu_query
  label: Mute Query
  kind: query
  params: []
- id: si_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: si_query
  label: Input Source Query
  kind: query
  params: []
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_query
  label: Main Zone Query
  kind: query
  params: []
- id: zm_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: sr_select
  label: Record Select
  kind: action
  params:
    - name: source
      type: enum
      values:
        - PHONO, IPOD, USB DIRECT, IPOD DIRECT, SOURCE
- id: sd_mode
  label: Input Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO]
- id: sd_query
  label: Input Mode Query
  kind: query
  params: []
- id: dc_mode
  label: Digital Input Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]
- id: dc_query
  label: Digital Input Query
  kind: query
  params: []
- id: sv_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]
- id: sv_query
  label: Video Select Query
  kind: query
  params: []
- id: slp_set
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120 by ASCII, 010=10min, OFF to cancel"
- id: slp_query
  label: Sleep Timer Query
  kind: query
  params: []
- id: stby_set
  label: Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [15M, 30M, 60M, OFF]
- id: stby_query
  label: Auto Standby Query
  kind: query
  params: []
- id: eco_set
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]
- id: eco_query
  label: ECO Mode Query
  kind: query
  params: []
- id: ms_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DOLBY PRO LOGIC, DOLBY PL2 C, DOLBY PL2 M, DOLBY PL2 G, DOLBY PL2X C, DOLBY PL2X M, DOLBY PL2X G, DOLBY PL2Z H, DOLBY SURROUND, DOLBY ATMOS, DOLBY D EX, DOLBY D+PL2X C, DOLBY D+PL2X M, DOLBY D+PL2X G, DOLBY D+PL2Z H, DOLBY D+DS, DOLBY D+NEO:X C, DOLBY D+NEO:X M, DOLBY D+NEO:X G, DTS SURROUND, DTS ES DSCRT6.1, DTS ES MTRX6.1, DTS+PL2X C, DTS+PL2X M, DTS+PL2Z H, DTS+DS, DTS96/24, DTS96 ES MTRX, DTS+NEO:6, DTS+NEO:X C, DTS+NEO:X M, DTS+NEO:X G, MULTI CH IN, M CH IN+DOLBY EX, M CH IN+PL2X C, M CH IN+PL2X M, M CH IN+PL2Z H, M CH IN+DS, MULTI CH IN 7.1, M CH IN+NEO:X C, M CH IN+NEO:X M, M CH IN+NEO:X G, DOLBY D+, DOLBY D+ +EX, DOLBY D+ +PL2X C, DOLBY D+ +PL2X M, DOLBY D+ +PL2Z H, DOLBY D+ +DS, DOLBY D+ +NEO:X C, DOLBY D+ +NEO:X M, DOLBY D+ +NEO:X G, DOLBY HD, DOLBY HD+EX, DOLBY HD+PL2X C, DOLBY HD+PL2X M, DOLBY HD+PL2Z H, DOLBY HD+DS, DOLBY HD+NEO:X C, DOLBY HD+NEO:X M, DOLBY HD+NEO:X G, DTS HD, DTS HD MSTR, DTS HD+PL2X C, DTS HD+PL2X M, DTS HD+PL2Z H, DTS HD+NEO:6, DTS HD+DS, DTS HD+NEO:X C, DTS HD+NEO:X M, DTS HD+NEO:X G, DTS EXPRESS, DTS ES 8CH DSCRT, MPEG2 AAC, AAC+DOLBY EX, AAC+PL2X C, AAC+PL2X M, AAC+PL2Z H, AAC+DS, AAC+NEO:X C, AAC+NEO:X M, AAC+NEO:X G, PL DSX, PL2 C DSX, PL2 M DSX, PL2 G DSX, PL2X C DSX, PL2X M DSX, PL2X G DSX, AUDYSSEY DSX, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, PURE DIRECT EXT, QUICK1, QUICK2, QUICK3, QUICK4, QUICK5, QUICK0]
- id: ms_query
  label: Surround Mode Query
  kind: query
  params: []
- id: vs_aspect
  label: Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values: [ASPNRM, ASPFUL]
- id: vs_resolution
  label: Video Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]
- id: vs_resolution_hdmi
  label: HDMI Resolution
  kind: action
  params:
    - name: res
      type: enum
      values: [SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO]
- id: vs_audio
  label: HDMI Audio Output
  kind: action
  params:
    - name: dest
      type: enum
      values: [AUDIO AMP, AUDIO TV]
- id: vs_query
  label: Video Output Query
  kind: query
  params: []
- id: ps_tone_ctrl
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [TONE CTRL ON, TONE CTRL OFF]
- id: ps_bas
  label: Bass Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [BAS UP, BAS DOWN]
- id: ps_bas_set
  label: Bass Set (dB)
  kind: action
  params:
    - name: value
      type: string
      description: "00-99 ASCII, 50=0dB, range -6 to +6 (44-56)"
- id: ps_tre
  label: Treble Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [TRE UP, TRE DOWN]
- id: ps_tre_set
  label: Treble Set (dB)
  kind: action
  params:
    - name: value
      type: string
      description: "00-99 ASCII, 50=0dB, range -6 to +6 (44-56)"
- id: ps_dil
  label: Dialog Level Adjust
  kind: action
  params:
    - name: mode
      type: enum
      values: [DIL ON, DIL OFF, DIL UP, DIL DOWN]
- id: ps_swl
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: mode
      type: enum
      values: [SWL ON, SWL OFF, SWL UP, SWL DOWN]
- id: ps_multeq
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF]
- id: ps_dyneq
  label: Dynamic EQ
  kind: action
  params:
    - name: state
      type: enum
      values: [DYNEQ ON, DYNEQ OFF]
- id: ps_dynvol
  label: Dynamic Volume
  kind: action
  params:
    - name: mode
      type: enum
      values: [DYNVOL HEV, DYNVOL MED, DYNVOL LIT, DYNVOL OFF]
- id: ps_query
  label: Tone Control Query
  kind: query
  params: []
- id: pv_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
- id: pv_contrast
  label: Picture Contrast
  kind: action
  params:
    - name: direction
      type: enum
      values: [CN UP, CN DOWN]
- id: pv_brightness
  label: Picture Brightness
  kind: action
  params:
    - name: direction
      type: enum
      values: [BR UP, BR DOWN]
- id: z2_on
  label: Zone2 On
  kind: action
  params: []
- id: z2_off
  label: Zone2 Off
  kind: action
  params: []
- id: z2_select
  label: Zone2 Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
- id: z2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: z2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=---MIN"
- id: z2mu
  label: Zone2 Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: z3_on
  label: Zone3 On
  kind: action
  params: []
- id: z3_off
  label: Zone3 Off
  kind: action
  params: []
- id: z3_select
  label: Zone3 Input Select
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
- id: z3_volume
  label: Zone3 Volume
  kind: action
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: z3mu
  label: Zone3 Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: tf_tune
  label: Tuner Tune
  kind: action
  params:
    - name: freq
      type: string
      description: "6-digit frequency: AN****** kHz(AM>050000) or MHz(FM<050000)"
- id: tf_query
  label: Tuner Frequency Query
  kind: query
  params: []
- id: tp_preset
  label: Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"
- id: tp_query
  label: Tuner Preset Query
  kind: query
  params: []
- id: tm_band
  label: Tuner Band/Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [ANAM, ANFM, ANAUTO, ANMANUAL]
- id: tm_query
  label: Tuner Band Query
  kind: query
  params: []
- id: ns_cursor
  label: Network Cursor Control
  kind: action
  params:
    - name: key
      type: enum
      values: [90, 91, 92, 93, 94, 9A, 9B, 9C, 9D, 9E]
- id: ns_playback
  label: Network Playback Control
  kind: action
  params:
    - name: cmd
      type: enum
      values: [9F, 9G, 9H, 9I, 9J, 9K, 9M, 9W, 9X, 9Y, 9Z, RPT, RND]
- id: mn_menu
  label: Menu On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [MEN ON, MEN OFF]
- id: mn_query
  label: Menu Query
  kind: query
  params: []
- id: sy_remote_lock
  label: Remote Lock On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [REMOTE LOCK ON, REMOTE LOCK OFF]
- id: sy_panel_lock
  label: Panel Lock On/Off
  kind: action
  params:
    - name: mode
      type: enum
      values: [PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF]
- id: tr_set
  label: Trigger Control
  kind: action
  params:
    - name: num
      type: enum
      values: [1, 2]
    - name: state
      type: enum
      values: [ON, OFF]
- id: tr_query
  label: Trigger Query
  kind: query
  params: []
- id: dim_set
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
- id: cvzrl
  label: Reset All Channel Levels
  kind: action
  params: []
- id: ps_cntamt
  label: Containment Amount Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [CNTAMT UP, CNTAMT DOWN]
- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 00=0, 1 to 7 (01 to 07)"
- id: ps_dsx
  label: Audyssey DSX Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DSX ONHW, DSX ONH, DSX ONW, DSX OFF]
- id: ps_stw
  label: Stage Width Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [STW UP, STW DOWN]
- id: ps_stw_set
  label: Stage Width Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 50=0dB, -10 to +10 (40 to 60)"
- id: ps_sth
  label: Stage Height Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [STH UP, STH DOWN]
- id: ps_sth_set
  label: Stage Height Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 50=0dB, -10 to +10 (40 to 60)"
- id: ps_del
  label: Delay Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [DEL UP, DEL DOWN]
- id: ps_del_set
  label: Delay Set
  kind: action
  params:
    - name: value
      type: string
      description: "000 to 999 by ASCII, 000=0ms, 300=300ms, 0-60ms:3ms/Step Over 60ms:10ms/Step, 0 to 300"
- id: ps_delay
  label: Audio Delay Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [DELAY UP, DELAY DOWN]
- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: value
      type: string
      description: "000 to 999 by ASCII, 000=0ms, 200=200ms, 0 to 200"
- id: ps_eff
  label: Effect Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [EFF ON, EFF OFF, EFF UP, EFF DOWN]
- id: ps_eff_set
  label: Effect Level Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 00=0dB, 10=10dB, 1 to 15"
- id: ps_lfe
  label: LFE Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [LFE UP, LFE DOWN]
- id: ps_lfe_set
  label: LFE Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 00=0dB, 10=-10dB, 0 to -10"
- id: ps_rsz
  label: Room Size
  kind: action
  params:
    - name: size
      type: enum
      values: [RSZ S, RSZ MS, RSZ M, RSZ ML, RSZ L]
- id: ps_auropr
  label: Auro-Matic 3D Preset
  kind: action
  params:
    - name: preset
      type: enum
      values: [AUROPR SMA, AUROPR MED, AUROPR LAR, AUROPR SPE]
- id: z2cs
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
- id: z2hpf
  label: Zone2 High Pass Filter
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: z2ps_bas
  label: Zone2 Bass Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [BAS UP, BAS DOWN]
- id: z2ps_bas_set
  label: Zone2 Bass Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 00=0dB from -10 to +10 (40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: z2ps_tre
  label: Zone2 Treble Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [TRE UP, TRE DOWN]
- id: z2ps_tre_set
  label: Zone2 Treble Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 99 by ASCII, 00=0dB from -10 to +10 (40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: z2hda
  label: Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: enum
      values: [THR, PCM]
- id: z2slp
  label: Zone2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min, OFF"
- id: z2stby
  label: Zone2 Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [2H, 4H, 8H, OFF]
- id: z3cv
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: tf_hd_tune
  label: HD Radio Tune
  kind: action
  params:
    - name: frequency
      type: string
      description: "HD****** (6 digits), ****.** kHz at AM (>050000 is AM.) ****.** MHz at FM (<050000 is FM.)"
- id: tf_hd_multicast
  label: HD Radio Multicast Channel
  kind: action
  params:
    - name: channel
      type: string
      description: "HDMC*(1 digit), Multi Cast 1～8, Analog 0"
- id: tf_hd_frequency_multicast
  label: HD Radio Frequency and Multicast Select
  kind: action
  params:
    - name: value
      type: string
      description: HD******MC*
- id: tp_hd_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "01-56"
- id: tp_hd_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "HDMEM** (PRESET No.), 01-56"
- id: tm_hd_mode
  label: HD Radio Band and Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU]
- id: hd_query
  label: HD Radio Status Query
  kind: query
  params: []
- id: nsa_query
  label: Onscreen Display Information Query (ASCII)
  kind: query
  params: []
- id: nse_query
  label: Onscreen Display Information Query (UTF-8)
  kind: query
  params: []
- id: mn_cursor
  label: Menu Cursor Control
  kind: action
  params:
    - name: key
      type: enum
      values: [CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF]
- id: mn_channel_level_menu
  label: Channel Level Adjust Menu
  kind: action
  params: []
- id: mn_instaprevue
  label: InstaPrevue Control
  kind: action
  params:
    - name: state
      type: enum
      values: [PRV ON, PRV OFF, PRV NG]
- id: mn_zone_stereo
  label: All Zone Stereo Control
  kind: action
  params:
    - name: state
      type: enum
      values: [ZST ON, ZST OFF]
- id: ug_idn
  label: Upgrade ID Number
  kind: action
  params: []
- id: rm_control
  label: Remote Maintenance Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [STA, END]
- id: vs_monitor
  label: HDMI Monitor Output
  kind: action
  params:
    - name: output
      type: enum
      values: [MONIAUTO, MONI1, MONI2]
- id: vs_video_processing
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [VPMAUTO, VPMGAME, VPMMOVI]
- id: vs_vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: enum
      values: [VST ON, VST OFF]
- id: pv_saturation
  label: Picture Saturation Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [ST UP, ST DOWN]
- id: pv_saturation_set
  label: Picture Saturation Set
  kind: action
  params:
    - name: value
      type: string
      description: "000 to 100 by ASCII, 050=0, -50 to +50 (000 to 100)"
- id: pv_hue
  label: Picture Hue Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [HUE UP, HUE DOWN]
- id: pv_hue_set
  label: Picture Hue Set
  kind: action
  params:
    - name: value
      type: string
      description: "44 to 56 by ASCII, 50=0, -6 to +6 (44 to 56)"
- id: pv_dnr
  label: Digital Noise Reduction
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MID, HI]
- id: pv_enh
  label: Picture Enhancer Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [ENH UP, ENH DOWN]
- id: pv_enh_set
  label: Picture Enhancer Set
  kind: action
  params:
    - name: value
      type: string
      description: "00 to 12 by ASCII, 00=0, 0 to 12"
- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: ms_dsd_mode
  label: DSD Surround Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [DSD DIRECT, DSD PURE DIRECT]
- id: ms_quick_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: ps_dil_set
  label: Dialog Level Set
  kind: action
  params:
    - name: value
      type: string
      description: "DIL**; 38 to 62 by ASCII, 50=0dB"
- id: ps_swl_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: channel
      type: enum
      values: [SWL, SWL2]
    - name: value
      type: string
      description: "SWL** or SWL2**; 00,38 to 62 by ASCII, 50=0dB"
- id: ps_swl2
  label: Subwoofer 2 Level Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [SWL2 UP, SWL2 DOWN]
- id: ps_cinema_eq
  label: Cinema EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [CINEMA EQ.ON, CINEMA EQ.OFF]
- id: ps_mode
  label: Surround Parameter Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC]
- id: ps_lom
  label: Loudness Management On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [PSLOM ON, PSLOM OFF]
- id: ps_fh
  label: Front Height Output On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [FH:ON, FH:OFF]
- id: ps_sp
  label: Speaker Output Select
  kind: action
  params:
    - name: mode
      type: enum
      values: [SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR]
- id: ps_phg
  label: Height Gain
  kind: action
  params:
    - name: level
      type: enum
      values: [PHG LOW, PHG MID, PHG HI]
- id: ps_reflev
  label: Reference Level Offset
  kind: action
  params:
    - name: level
      type: enum
      values: [REFLEV 0, REFLEV 5, REFLEV 10, REFLEV 15]
- id: ps_lfc
  label: Audyssey LFC On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [LFC ON, LFC OFF]
- id: ps_geq
  label: Graphic EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [GEQ ON, GEQ OFF]
- id: ps_drc
  label: Dynamic Compression
  kind: action
  params:
    - name: mode
      type: enum
      values: [DRC AUTO, DRC LOW, DRC MID, DRC HI, DRC OFF]
- id: ps_bsc
  label: Bass Sync Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [BSC UP, BSC DOWN]
- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  params:
    - name: value
      type: string
      description: "BSC**; 00 to 99 by ASCII, 00=0 ---AVR can be operated from 0 to 16"
- id: ps_deh
  label: Dialogue Enhancer
  kind: action
  params:
    - name: mode
      type: enum
      values: [DEH OFF, DEH LOW, DEH MED, DEH HIGH]
- id: ps_lfl
  label: External Input LFE Level
  kind: action
  params:
    - name: level
      type: enum
      values: [LFL 00, LFL 05, LFL 10, LFL 15]
- id: ps_pan
  label: Panorama On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [PAN ON, PAN OFF]
- id: ps_dim
  label: Dimension Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [DIM UP, DIM DOWN]
- id: ps_dim_set
  label: Dimension Set
  kind: action
  params:
    - name: value
      type: string
      description: "DIM**; 00 to 99 by ASCII, 00=0, ---AVR can be operated from 0 to 6"
- id: ps_cen
  label: Center Width Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [CEN UP, CEN DOWN]
- id: ps_cen_set
  label: Center Width Set
  kind: action
  params:
    - name: value
      type: string
      description: "CEN**; 00 to 99 by ASCII, 00=0 ---AVR can be operated from 0 to 7"
- id: ps_cei
  label: Center Image Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [CEI UP, CEI DOWN]
- id: ps_cei_set
  label: Center Image Set
  kind: action
  params:
    - name: value
      type: string
      description: "CEI**; 00 to 99 by ASCII, 00=0.0 ---AVR can be operated from 0.0 to 1.0"
- id: ps_ceg
  label: Center Gain Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [CEG UP, CEG DOWN]
- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  params:
    - name: value
      type: string
      description: "CEG**; 00 to 99 by ASCII, 00=0.0 ---AVR can be operated from 0.0 to 1.0"
- id: ps_ces
  label: Center Spread On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [CES ON, CES OFF]
- id: ps_swr
  label: Subwoofer On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [SWR ON, SWR OFF]
- id: ps_rstr
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: enum
      values: [RSTR OFF, RSTR LOW, RSTR MED, RSTR HI]
- id: ps_front
  label: Front Speaker Select
  kind: action
  params:
    - name: speaker
      type: enum
      values: [FRONT SPA, FRONT SPB, FRONT A+B]
- id: ps_aurost
  label: Auro-Matic 3D Strength Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [AUROST UP, AUROST DOWN]
- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: value
      type: string
      description: "AUROST**; 00 to 99 by ASCII, 01=1, 10=10 ---AVR can be operated from 1 to 16"
- id: pv_contrast_set
  label: Picture Contrast Set
  kind: action
  params:
    - name: value
      type: string
      description: "CN ***; 000 to 100 by ASCII, 050=0 ---AVR can be operated from -50 to +50 (000 to 100)"
- id: pv_brightness_set
  label: Picture Brightness Set
  kind: action
  params:
    - name: value
      type: string
      description: "BR ***; 000 to 100 by ASCII, 050=0 ---AVR can be operated from -50 to +50 (000 to 100)"
- id: z2_quick
  label: Zone2 Quick Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5, QUICK0]
- id: z2_quick_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: z2_favorite
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: z2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: z2cv
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: direction
      type: enum
      values: [UP, DOWN]
- id: z2cv_set
  label: Zone2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "FL** or FR**; 38 to 62 by ASCII, 50=0dB"
- id: z3_quick
  label: Zone3 Quick Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5, QUICK0]
- id: z3_quick_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [QUICK1 MEMORY, QUICK2 MEMORY, QUICK3 MEMORY, QUICK4 MEMORY, QUICK5 MEMORY]
- id: z3_favorite
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4]
- id: z3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: slot
      type: enum
      values: [FAVORITE1 MEMORY, FAVORITE2 MEMORY, FAVORITE3 MEMORY, FAVORITE4 MEMORY]
- id: z3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "Z380<CR>; 00 to 98 by ASCII, 80=0dB, 00=---(MIN)"
- id: z3cs
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
- id: z3cv_set
  label: Zone3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "FL** or FR**; 38 to 62 by ASCII, 50=0dB"
- id: z3hpf
  label: Zone3 High Pass Filter
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
- id: z3ps_bas
  label: Zone3 Bass Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [BAS UP, BAS DOWN]
- id: z3ps_bas_set
  label: Zone3 Bass Set
  kind: action
  params:
    - name: value
      type: string
      description: "BAS **; 00 to 99 by ASCII, 00=0dB from -10 to +10 (40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: z3ps_tre
  label: Zone3 Treble Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [TRE UP, TRE DOWN]
- id: z3ps_tre_set
  label: Zone3 Treble Set
  kind: action
  params:
    - name: value
      type: string
      description: "TRE **; 00 to 99 by ASCII, 00=0dB from -10 to +10 (40 to 60) from -14 to +14 /2dBstep (36 to 64)※X4100 only"
- id: z3slp
  label: Zone3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "Z3SLP; 001 to 120 by ASCII, 010=10min, OFF"
- id: z3stby
  label: Zone3 Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [2H, 4H, 8H, OFF]
- id: tf_adjust
  label: Tuner Frequency Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [ANUP, ANDOWN]
- id: tp_adjust
  label: Tuner Preset Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [ANUP, ANDOWN]
- id: tp_anmem
  label: Tuner Preset Memory Mode
  kind: action
  params: []
- id: tp_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "ANMEM**; 01-56 01=CH01, 56=CH56"
- id: tf_hd_adjust
  label: HD Radio Channel Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [HDUP, HDDOWN]
- id: tp_hd_adjust
  label: HD Radio Preset Adjust
  kind: action
  params:
    - name: direction
      type: enum
      values: [HDUP, HDDOWN]
- id: tp_hdmem
  label: HD Radio Preset Memory Mode
  kind: action
  params: []
- id: ns_preset
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: "B** (PRESET No.); 00-35 (2014 AVR)"
- id: ns_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "C** (PRESET No.); 00-35 (2014 AVR)"
- id: ns_fv_mem
  label: Add Favorites Folder
  kind: action
  params: []
```

## Feedbacks
```yaml
# Device sends RESPONSE to ? queries within 200ms
# Device sends EVENT for unsolicited state changes within 5s
- id: pw_status
  type: enum
  values: [ON, STANDBY]
  query_command: PW?
- id: mv_status
  type: string
  description: "Master volume value 00-98 ASCII"
  query_command: MV?
- id: mu_status
  type: enum
  values: [ON, OFF]
  query_command: MU?
- id: si_status
  type: enum
  values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
  query_command: SI?
- id: zm_status
  type: enum
  values: [ON, OFF]
  query_command: ZM?
- id: ms_status
  type: string
  description: Surround mode string
  query_command: MS?
- id: cv_status
  type: string
  description: "Channel volume per speaker: CVFL 50<CR>...CVEND<CR>"
  query_command: CV?
- id: slp_status
  type: string
  description: "Sleep timer value 001-120 or OFF"
  query_command: SLP?
- id: stby_status
  type: enum
  values: [15M, 30M, 60M, OFF]
  query_command: STBY?
- id: eco_status
  type: enum
  values: [ON, AUTO, OFF]
  query_command: ECO?
- id: sv_status
  type: string
  description: "Video select source and ON/OFF"
  query_command: SV?
- id: sd_status
  type: string
  description: Input mode
  query_command: SD?
- id: dc_status
  type: enum
  values: [AUTO, PCM, DTS]
  query_command: DC?
- id: ps_status
  type: string
  description: Tone control parameters
  query_command: PSTONE CTRL?
- id: z2_status
  type: enum
  values: [ON, OFF]
  query_command: Z2?
- id: z2mu_status
  type: enum
  values: [ON, OFF]
  query_command: Z2MU?
- id: z3_status
  type: enum
  values: [ON, OFF]
  query_command: Z3?
- id: z3mu_status
  type: enum
  values: [ON, OFF]
  query_command: Z3MU?
- id: tf_status
  type: string
  description: "Tuner frequency AN105000<CR> for 1050.00kHz AM"
  query_command: TFAN?
- id: tp_status
  type: string
  description: "Tuner preset AN01-AN56 or ANOFF"
  query_command: TPAN?
- id: tm_status
  type: string
  description: Tuner band/mode
  query_command: TMAN?
- id: hd_status
  type: string
  description: "HD Radio status: station name, signal level, artist, title, album, genre"
  query_command: HD?
- id: tr_status
  type: string
  description: "Trigger status: TR1 ON<CR>TR2 ON<CR>"
  query_command: TR?
- id: dim_status
  type: enum
  values: [BRI, DIM, DAR, OFF, SEL]
  query_command: DIM?
- id: sr_status
  type: string
  description: "Record select status"
  query_command: SR?
- id: ms_quick_status
  type: string
  description: "Quick select status"
  query_command: MSQUICK?
- id: vs_aspect_status
  type: string
  description: "Video aspect ratio status"
  query_command: VSASP?
- id: vs_monitor_status
  type: string
  description: "HDMI monitor output status"
  query_command: VSMONI?
- id: vs_resolution_status
  type: string
  description: "Video resolution status"
  query_command: VSSC?
- id: vs_resolution_hdmi_status
  type: string
  description: "HDMI resolution status"
  query_command: VSSCH?
- id: vs_audio_status
  type: string
  description: "HDMI audio output status"
  query_command: VSAUDIO?
- id: vs_video_processing_status
  type: string
  description: "Video processing mode status"
  query_command: VSVPM?
- id: vs_vertical_stretch_status
  type: string
  description: "Vertical stretch status"
  query_command: VSVST?
- id: ps_bas_status
  type: string
  description: "Bass status"
  query_command: PSBAS?
- id: ps_tre_status
  type: string
  description: "Treble status"
  query_command: PSTRE?
- id: ps_dil_status
  type: string
  description: "Dialog level adjust status"
  query_command: PSDIL?
- id: ps_swl_status
  type: string
  description: "Subwoofer level adjust status; PSSWL2 is not output if SW2 is none"
  query_command: PSSWL?
- id: ps_cinema_eq_status
  type: string
  description: "Cinema EQ status"
  query_command: PSCINEMA EQ.?
- id: ps_mode_status
  type: string
  description: "Surround parameter mode status"
  query_command: PSMODE:?
- id: ps_lom_status
  type: string
  description: "Loudness management status"
  query_command: PSLOM?
- id: ps_fh_status
  type: string
  description: "Front height output status"
  query_command: PSFH:?
- id: ps_sp_status
  type: string
  description: "Speaker output status"
  query_command: PSSP?
- id: ps_phg_status
  type: string
  description: "Height gain status"
  query_command: PSPHG?
- id: ps_multeq_status
  type: string
  description: "MultEQ status"
  query_command: PSMULTEQ?
- id: ps_dyneq_status
  type: string
  description: "Dynamic EQ status"
  query_command: PSDYNEQ?
- id: ps_reflev_status
  type: string
  description: "Reference level offset status"
  query_command: PSREFLEV?
- id: ps_dynvol_status
  type: string
  description: "Dynamic volume status"
  query_command: PSDYNVOL?
- id: ps_lfc_status
  type: string
  description: "Audyssey LFC status"
  query_command: PSLFC?
- id: ps_cntamt_status
  type: string
  description: "Containment amount status"
  query_command: PSCNTAMT?
- id: ps_dsx_status
  type: string
  description: "Audyssey DSX status"
  query_command: PSDSX?
- id: ps_stw_status
  type: string
  description: "Stage width status"
  query_command: PSSTW?
- id: ps_sth_status
  type: string
  description: "Stage height status"
  query_command: PSSTH?
- id: ps_geq_status
  type: string
  description: "Graphic EQ status"
  query_command: PSGEQ?
- id: ps_drc_status
  type: string
  description: "Dynamic compression status"
  query_command: PSDRC?
- id: ps_bsc_status
  type: string
  description: "Bass sync status"
  query_command: PSBSC?
- id: ps_deh_status
  type: string
  description: "Dialogue enhancer status"
  query_command: PSDEH?
- id: ps_lfe_status
  type: string
  description: "LFE status"
  query_command: PSLFE?
- id: ps_lfl_status
  type: string
  description: "External input LFE level status"
  query_command: PSLFL?
- id: ps_eff_status
  type: string
  description: "Effect status"
  query_command: PSEFF?
- id: ps_del_status
  type: string
  description: "Delay status"
  query_command: PSDEL?
- id: ps_pan_status
  type: string
  description: "Panorama status"
  query_command: PSPAN?
- id: ps_dim_status
  type: string
  description: "Dimension status"
  query_command: PSDIM?
- id: ps_cen_status
  type: string
  description: "Center width status"
  query_command: PSCEN?
- id: ps_cei_status
  type: string
  description: "Center image status"
  query_command: PSCEI?
- id: ps_ceg_status
  type: string
  description: "Center gain status"
  query_command: PSCEG?
- id: ps_ces_status
  type: string
  description: "Center spread status"
  query_command: PSCES?
- id: ps_swr_status
  type: string
  description: "Subwoofer on/off status"
  query_command: PSSWR?
- id: ps_rsz_status
  type: string
  description: "Room size status"
  query_command: PSRSZ?
- id: ps_delay_status
  type: string
  description: "Audio delay status"
  query_command: PSDELAY?
- id: ps_rstr_status
  type: string
  description: "Audio restorer status"
  query_command: PSRSTR?
- id: ps_front_status
  type: string
  description: "Front speaker status"
  query_command: PSFRONT?
- id: ps_auropr_status
  type: string
  description: "Auro-Matic 3D preset status"
  query_command: PSAUROPR?
- id: ps_aurost_status
  type: string
  description: "Auro-Matic 3D strength status"
  query_command: PSAUROST?
- id: pv_status
  type: string
  description: "Picture mode status"
  query_command: PV?
- id: pv_contrast_status
  type: string
  description: "Picture contrast status"
  query_command: PVCN?
- id: pv_brightness_status
  type: string
  description: "Picture brightness status"
  query_command: PVBR?
- id: pv_saturation_status
  type: string
  description: "Picture saturation status"
  query_command: PVST?
- id: pv_hue_status
  type: string
  description: "Picture hue status"
  query_command: PVHUE?
- id: pv_dnr_status
  type: string
  description: "Digital noise reduction status"
  query_command: PVDNR?
- id: pv_enh_status
  type: string
  description: "Picture enhancer status"
  query_command: PVENH?
- id: z2_quick_status
  type: string
  description: "Zone2 quick select status"
  query_command: Z2QUICK?
- id: z2cs_status
  type: string
  description: "Zone2 channel setting status"
  query_command: Z2CS?
- id: z2cv_status
  type: string
  description: "Zone2 channel volume status"
  query_command: Z2CV?
- id: z2hpf_status
  type: string
  description: "Zone2 high pass filter status"
  query_command: Z2HPF?
- id: z2ps_bas_status
  type: string
  description: "Zone2 bass status"
  query_command: Z2PSBAS?
- id: z2ps_tre_status
  type: string
  description: "Zone2 treble status"
  query_command: Z2PSTRE?
- id: z2hda_status
  type: string
  description: "Zone2 HDMI audio output status"
  query_command: Z2HDA?
- id: z2slp_status
  type: string
  description: "Zone2 sleep timer status"
  query_command: Z2SLP?
- id: z2stby_status
  type: string
  description: "Zone2 auto standby status"
  query_command: Z2STBY?
- id: z3_quick_status
  type: string
  description: "Zone3 quick select status"
  query_command: Z3QUICK?
- id: z3cs_status
  type: string
  description: "Zone3 channel setting status"
  query_command: Z3CS?
- id: z3cv_status
  type: string
  description: "Zone3 channel volume status"
  query_command: Z3CV?
- id: z3hpf_status
  type: string
  description: "Zone3 high pass filter status"
  query_command: Z3HPF?
- id: z3ps_bas_status
  type: string
  description: "Zone3 bass status"
  query_command: Z3PSBAS?
- id: z3ps_tre_status
  type: string
  description: "Zone3 treble status"
  query_command: Z3PSTRE?
- id: z3slp_status
  type: string
  description: "Zone3 sleep timer status"
  query_command: Z3SLP?
- id: z3stby_status
  type: string
  description: "Zone3 auto standby status"
  query_command: Z3STBY?
- id: tf_anname_status
  type: string
  description: "RDS station name (EU,AP Only)"
  query_command: TFANNAME?
- id: tf_hd_status
  type: string
  description: "HD radio frequency status"
  query_command: TFHD?
- id: tp_hd_status
  type: string
  description: "HD radio preset status"
  query_command: TPHD?
- id: tm_hd_status
  type: string
  description: "HD radio band/mode status"
  query_command: TMHD?
- id: ns_preset_name_status
  type: string
  description: "Net-Audio preset names (UTF-8), except Bluetooth, USB/iPod"
  query_command: NSH
- id: mn_instaprevue_status
  type: string
  description: "InstaPrevue status"
  query_command: MNPRV?
- id: mn_zone_stereo_status
  type: string
  description: "All zone stereo status"
  query_command: MNZST?
- id: rm_status
  type: string
  description: "Remote maintenance status"
  query_command: RM?
```

## Variables
```yaml
# UNRESOLVED: populate from source if applicable, or remove section
```

## Events
```yaml
# Unsolicited EVENT messages sent within 5 seconds of state change
# UNRESOLVED: detailed event taxonomy not fully specified in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Command interval: send next command ≥50ms after previous; ≥1 second after PWON
- RESPONSE within 200ms of receiving ? query
- EVENT within 5 seconds of state change
- Half duplex on both RS-232 and TCP
- Volume 0.5dB step uses 3 ASCII chars (e.g. MV805 for +0.5dB); 0.0dB step uses 2 chars (MV80)
- Channel volume 38-62 ASCII, 50=0dB; SW/SW2 also allow 00
- Tone bass/treble 00-99 ASCII, 50=0dB, usable range 44-56 (-6 to +6dB)
- Authentication requirements are UNRESOLVED
<!-- UNRESOLVED: complete event list with parameter ranges; firmware compatibility; network standby behavior details -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T13:18:27.021Z
last_checked_at: 2026-10-07T13:18:27.021Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:18:27.021Z
matched_actions: 304
action_count: 304
confidence: medium
summary: "All 304 action units match source command tables; transport (9600 8N1, TCP 23) supported; source is a generic Denon protocol doc so model applicability is inferred. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete command set for network/API control; detailed event taxonomy for unsolicited notifications; firmware version compatibility"
- "populate from source if applicable, or remove section"
- "detailed event taxonomy not fully specified in source"
- "no explicit multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "complete event list with parameter ranges; firmware compatibility; network standby behavior details"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
