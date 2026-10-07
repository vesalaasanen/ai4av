---
spec_id: admin/marantz-sr7010_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR7010 Series Control Spec"
manufacturer: Marantz
model_family: SR7010
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR7010
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:05:03.853Z
last_checked_at: 2026-10-07T20:56:46.561Z
generated_at: 2026-10-07T20:56:46.561Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - Z3UP
  - Z3DOWN
  - NSH
  - TPANOFF
  - "firmware compatibility range not stated in source"
  - "flow control not stated in source"
  - "no discrete settable parameters beyond Actions above"
  - "complete event list not enumerated in source"
  - "no explicit multi-step macros documented in source"
  - "no explicit safety warnings or interlock procedures beyond timing note above"
  - "firmware version compatibility not stated"
  - "voltage/power specifications not in source"
  - "error code definitions not in source"
  - "Ethernet Auto-IP or DHCP configuration not described"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:56:46.561Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 units match source commands and transport; only a few minor extras (e.g. Zone3 volume). Source never names the SR7010, so applicability is generic. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR7010 Series Control Spec

## Summary
Marantz SR7010 Series AV receiver supports both RS-232C and Ethernet (TCP/IP) control via ASCII commands terminated with CR (0x0D). Protocol is half-duplex, command interval minimum 50ms. Power-on command requires 1 second delay before subsequent commands.

<!-- UNRESOLVED: firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) stated in source
serial:
  baud_rate: 9600  # stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # PWON, PWSTANDBY commands present
- routable         # SI input selection commands present
- queryable        # ? suffix commands return status
- levelable        # MV, CV volume commands present
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: power_status
  label: Get Power Status
  kind: action
  params: []
- id: volume_up
  label: Master Volume Up
  kind: action
  params: []
- id: volume_down
  label: Master Volume Down
  kind: action
  params: []
- id: volume_set
  label: Set Master Volume (dB)
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 00-98 (80=0dB, 00=---MIN)
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: input_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: |
        PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME,
        HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM,
        FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT,
        USB/IPOD, USB, IPD, IRP, FVP
- id: surround_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO,
        DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR,
        MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA,
        JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX,
        VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO,
        QUICK1-5, QUICK1-5 MEMORY, 7.1IN, PURE DIRECT EXT
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: tone_ctrl_on
  label: Tone Control On
  kind: action
  params: []
- id: tone_ctrl_off
  label: Tone Control Off
  kind: action
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: channel_volume
  label: Set Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: |
        FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB,
        FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR,
        RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: level
      type: integer
      description: "38-62 (50=0dB), SW/SW2 also accept 00"
- id: sleep_timer
  label: Set Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (010=10min), or OFF"
- id: eco_mode
  label: Set ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: video_resolution
  label: Set Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: |
        SC48P (480p/576p), SC10I (1080i), SC72P (720p),
        SC10P (1080p), SC10P24 (1080p:24Hz), SC4K, SC4KF (4K 60/50),
        SCAUTO
- id: hdmi_monitor
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: AUTO, MONI1, MONI2
- id: multieq_mode
  label: Set MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
- id: dynamic_eq
  label: Set Dynamic EQ
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: dynamic_volume
  label: Set Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_volume
  label: Zone2 Volume
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or direct level 00-98 (80=0dB)
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: tuner_frequency
  label: Set Tuner Frequency
  kind: action
  params:
    - name: band
      type: string
      description: AM or FM frequency in kHz (6 digits)
- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: channel
      type: integer
      description: "01-56"
- id: hd_radio_channel
  label: HD Radio Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: "1-8 (MultiCast), 0=Analog"
- id: picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT
- id: menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: trigger_set
  label: Set Trigger
  kind: action
  params:
    - name: number
      type: integer
      description: "1 or 2"
    - name: state
      type: string
      description: ON, OFF
- id: dimmer
  label: Set Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (Toggle)
- id: remote_lock
  label: Remote Lock
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: panel_lock
  label: Panel Lock
  kind: action
  params:
    - name: mode
      type: string
      description: LOCK ON, LOCK OFF, PANEL+V LOCK ON
- id: channel_volume_adjust
  label: Adjust Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP or DOWN
- id: channel_volume_reset
  label: Reset Channel Volumes
  kind: action
  params: []
- id: recording_select
  label: Set Recording Select
  kind: action
  params:
    - name: source
      type: string
      description: |
        PHONO, IPOD, SOURCE, or the same parameter names as SI COMMAND
- id: input_signal_mode
  label: Set Input Signal Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: digital_input_mode
  label: Set Digital Input Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS
- id: video_select
  label: Set Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF
- id: main_zone_auto_standby
  label: Set Main Zone Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 15M, 30M, 60M, OFF
- id: favorite_select
  label: Select Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: 1-4
- id: favorite_memory
  label: Store Favorite
  kind: action
  params:
    - name: number
      type: integer
      description: 1-4
- id: quick_select
  label: Select Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: 1-5
- id: quick_memory
  label: Store Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: 1-5
- id: quick_zero
  label: Select Quick Select Zero
  kind: action
  params: []
- id: surround_mode_extended
  label: Set Extended Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: |
        DOLBY PRO LOGIC, DOLBY PL2 C, DOLBY PL2 M, DOLBY PL2 G,
        DOLBY PL2X C, DOLBY PL2X M, DOLBY PL2X G, DOLBY PL2Z H,
        DOLBY SURROUND, DOLBY ATMOS, DOLBY D EX, DOLBY D+PL2X C,
        DOLBY D+PL2X M, DOLBY D+PL2Z H, DOLBY D+DS,
        DOLBY D+NEO:X C, DOLBY D+NEO:X M, DOLBY D+NEO:X G,
        DTS ES DSCRT6.1, DTS ES MTRX6.1, DTS+PL2X C, DTS+PL2X M,
        DTS+PL2Z H, DTS+DS, DTS96/24, DTS96 ES MTRX, DTS+NEO:6,
        DTS+NEO:X C, DTS+NEO:X M, DTS+NEO:X G, MULTI CH IN,
        M CH IN+DOLBY EX, M CH IN+PL2X C, M CH IN+PL2X M,
        M CH IN+PL2Z H, M CH IN+DS, MULTI CH IN 7.1,
        M CH IN+NEO:X C, M CH IN+NEO:X M, M CH IN+NEO:X G,
        DOLBY D+, DOLBY D+ +EX, DOLBY D+ +PL2X C,
        DOLBY D+ +PL2X M, DOLBY D+ +PL2Z H, DOLBY D+ +DS,
        DOLBY D+ +NEO:X C, DOLBY D+ +NEO:X M, DOLBY D+ +NEO:X G,
        DOLBY HD, DOLBY HD+EX, DOLBY HD+PL2X C, DOLBY HD+PL2X M,
        DOLBY HD+PL2Z H, DOLBY HD+DS, DOLBY HD+NEO:X C,
        DOLBY HD+NEO:X M, DOLBY HD+NEO:X G, DTS HD, DTS HD MSTR,
        DTS HD+PL2X C, DTS HD+PL2X M, DTS HD+PL2Z H, DTS HD+DS,
        DTS HD+NEO:6, DTS HD+NEO:X C, DTS HD+NEO:X M,
        DTS HD+NEO:X G, DTS EXPRESS, DTS ES 8CH DSCRT, MPEG2 AAC,
        AAC+DOLBY EX, AAC+PL2X C, AAC+PL2X M, AAC+PL2Z H, AAC+DS,
        AAC+NEO:X C, AAC+NEO:X M, AAC+NEO:X G, PL DSX, PL2 C DSX,
        PL2 M DSX, PL2 G DSX, AUDYSSEY DSX, DTS NEO:6 C,
        DTS NEO:6 M, DTS NEO:X C, DTS NEO:X M, DTS NEO:X G
- id: surround_quick_zero
  label: Select Surround Quick Zero
  kind: action
  params: []
- id: audio_adjustment
  label: Set Audio Adjustment
  kind: action
  params:
    - name: setting
      type: string
      description: |
        BAS, TRE, DIL, SWL, SWL2, CINEMA EQ., MODE:, PSLOM, FH:,
        SP:, PHG, MULTEQ:, DYNEQ, REFLEV, DYNVOL, LFC, CNTAMT,
        DSX, STW, STH, GEQ, DRC, BSC, DEH, LFE, LFL, EFF, DEL,
        PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, DELAY, RSTR,
        FRONT, AUROPR, AUROST
    - name: value
      type: string
      description: |
        UP, DOWN, ON, OFF, ?, 00 to 99, 000 to 999, LOW, MID, HI,
        HEV, MED, LIT, AUTO, 0, 5, 10, 15, MUSIC, CINEMA, GAME,
        PRO LOGIC, HEIGHT, FW, FH, SB, HW, BH, BW, FL, HF, FR,
        SMA, LAR, SPE, S, MS, M, ML, L, SPA, SPB, A+B
- id: video_processing_mode
  label: Set Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI
- id: hdmi_resolution
  label: Set HDMI Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO
- id: hdmi_audio_output
  label: Set HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP, TV
- id: video_aspect_ratio
  label: Set Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM, ASPFUL
- id: vertical_stretch
  label: Set Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: video_picture_adjustment
  label: Set Video Picture Adjustment
  kind: action
  params:
    - name: setting
      type: string
      description: CN, BR, ST, HUE, DNR, ENH
    - name: value
      type: string
      description: UP, DOWN, OFF, LOW, MID, HI, or documented direct parameter values
- id: zone_channel_setting
  label: Set Zone Channel Setting
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: setting
      type: string
      description: ST or MONO
- id: zone_channel_volume
  label: Set Zone Channel Volume
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: channel
      type: string
      description: FL or FR
    - name: level
      type: integer
      description: 38 to 62 by ASCII, 50=0dB
- id: zone_channel_volume_adjust
  label: Adjust Zone Channel Volume
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: channel
      type: string
      description: FL or FR
    - name: direction
      type: string
      description: UP or DOWN
- id: zone_high_pass_filter
  label: Set Zone High Pass Filter
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: state
      type: string
      description: ON or OFF
- id: zone_tone
  label: Set Zone Tone
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: setting
      type: string
      description: BAS or TRE
    - name: value
      type: string
      description: UP, DOWN, or direct change to **dB; **:00 to 99 by ASCII, 00=0dB from -10 to +10(40 to 60), from -14 to +14 /2dBstep (36 to 64)※X4100 only
- id: zone_sleep_timer
  label: Set Zone Sleep Timer
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: minutes
      type: string
      description: OFF or 001 to 120 by ASCII, 010=10min
- id: zone_auto_standby
  label: Set Zone Auto Standby
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF
- id: zone_mute
  label: Set Zone Mute
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: state
      type: string
      description: ON or OFF
- id: zone_source_select
  label: Select Zone Source
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: source
      type: string
      description: |
        SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY,
        GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM,
        FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4,
        AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: zone_quick_select
  label: Select Zone Quick Select
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: number
      type: integer
      description: 1-5
- id: zone_quick_memory
  label: Store Zone Quick Select
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: number
      type: integer
      description: 1-5
- id: zone_quick_zero
  label: Select Zone Quick Zero
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
- id: zone_favorite_select
  label: Select Zone Favorite
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: number
      type: integer
      description: 1-4
- id: zone_favorite_memory
  label: Store Zone Favorite
  kind: action
  params:
    - name: zone
      type: integer
      description: 2 or 3
    - name: number
      type: integer
      description: 1-4
- id: zone2_channel_mode
  label: Set Zone2 Channel Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ST or MONO
- id: zone2_hdmi_audio
  label: Set Zone2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: THR or PCM
- id: tuner_frequency_adjust
  label: Adjust Tuner Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP or ANDOWN
- id: tuner_station_name
  label: Request Tuner Station Name
  kind: action
  params: []
- id: tuner_preset_adjust
  label: Adjust Tuner Preset
  kind: action
  params:
    - name: direction
      type: string
      description: ANUP or ANDOWN
- id: tuner_preset_memory
  label: Store Tuner Preset
  kind: action
  params:
    - name: preset
      type: string
      description: ANMEM or ANMEM**(PRESET No.), **: 01-56 01=CH01,56=CH56
- id: tuner_mode
  label: Set Tuner Band and Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ANAM, ANFM, ANAUTO, ANMANUAL
- id: hd_radio_frequency_adjust
  label: Adjust HD Radio Frequency
  kind: action
  params:
    - name: direction
      type: string
      description: HDUP or HDDOWN
- id: hd_radio_preset_adjust
  label: Adjust HD Radio Preset
  kind: action
  params:
    - name: direction
      type: string
      description: HDUP or HDDOWN
- id: hd_radio_preset_memory
  label: Store HD Radio Preset
  kind: action
  params:
    - name: preset
      type: string
      description: HDMEM or HDMEM**(PRESET No.), **: 01-56 01=CH01,56=CH56
- id: hd_radio_mode
  label: Set HD Radio Band and Mode
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
- id: hd_radio_frequency_channel
  label: Set HD Radio Frequency and Multicast Channel
  kind: action
  params:
    - name: frequency_channel
      type: string
      description: HD******MC*, frequency and HD Multi Cast CH Select; Multi Cast 1～8, Analog 0
- id: online_music_control
  label: Control Online Music and USB Playback
  kind: action
  params:
    - name: command
      type: string
      description: |
        90, 91, 92, 93, 94, 9A, 9B, 9C, 9D, 9E, 9F, 9G, 9H,
        9I, 9J, 9K, 9M, 9W, 9X, 9Y, 9Z, RPT, RND
- id: online_music_preset_call
  label: Call Online Music Preset
  kind: action
  params:
    - name: preset
      type: string
      description: B** (PRESET No.), **: 00-35(2014 AVR)
- id: online_music_preset_memory
  label: Store Online Music Preset
  kind: action
  params:
    - name: preset
      type: string
      description: C** (PRESET No.), **: 00-35(2014 AVR)
- id: online_music_favorite
  label: Add Online Music Favorite
  kind: action
  params: []
- id: online_music_display_request
  label: Request Onscreen Display Information
  kind: action
  params:
    - name: command
      type: string
      description: NSA or NSE
- id: system_navigation
  label: Control System Navigation
  kind: action
  params:
    - name: command
      type: string
      description: CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL
- id: instaprevue
  label: Set InstaPrevue
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF
- id: remote_maintenance
  label: Set Remote Maintenance Mode
  kind: action
  params:
    - name: state
      type: string
      description: STA or END
- id: upgrade_id_display
  label: Display Upgrade ID Number
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [PWON, PWSTANDBY]
  query_command: PW?
- id: volume_state
  label: Master Volume State
  type: string
  description: "MV00-MV98 (80=0dB, 00=---MIN)"
  query_command: MV?
- id: input_state
  label: Input Source State
  type: string
  description: "SI*** (e.g., SIDVD, SITUNER)"
  query_command: SI?
- id: mute_state
  label: Mute State
  type: enum
  values: [MUON, MUOFF]
  query_command: MU?
- id: surround_state
  label: Surround Mode State
  type: string
  description: "MS*** (e.g., MSSTEREO, MSDOLBY DIGITAL)"
  query_command: MS?
- id: main_zone_state
  label: Main Zone State
  type: enum
  values: [ZMON, ZMOFF]
  query_command: ZM?
- id: zone2_state
  label: Zone2 State
  type: enum
  values: [Z2ON, Z2OFF]
  query_command: Z2?
- id: zone3_state
  label: Zone3 State
  type: enum
  values: [Z3ON, Z3OFF]
  query_command: Z3?
- id: channel_volume_state
  label: Channel Volume State
  type: string
  description: "CVFL 50, CVFR 50, etc. (38-62, 50=0dB)"
  query_command: CV?
- id: tuner_state
  label: Tuner State
  type: string
  description: "TFAN*** (frequency in kHz)"
  query_command: TFAN?
- id: hd_radio_state
  label: HD Radio State
  type: string
  description: "TFHD*** (frequency), HDMLT CURRCH*, HDARTIST, HDTITLE, etc."
  query_command: HD?
- id: menu_state
  label: Menu State
  type: enum
  values: [MNMEN ON, MNMEN OFF]
  query_command: MNMEN?
- id: trigger_state
  label: Trigger State
  type: string
  description: "TR1 ON, TR2 ON"
  query_command: TR?
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond Actions above
```

## Events
```yaml
# Device sends unsolicited EVENT messages when state changes.
# EVENT format same as COMMAND structure.
# Timing: within 5 seconds of state change.
# No explicit event subscription mechanism described in source.
# UNRESOLVED: complete event list not enumerated in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Power on command (PWON): wait 1 second before sending next command"
  - "COMMAND receivable during EVENT transmission (half duplex)"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond timing note above
```

## Notes
- ASCII characters 0x20-0x7F used for commands
- Command structure: COMMAND + PARAMETER + CR (0x0D)
- Minimum command interval: 50ms (send commands 50ms or more apart)
- RESPONSE within 200ms of request command
- EVENT within 5 seconds of state change
- Half duplex communication
- Maximum data length: 135 bytes per message
- Volume uses 0.5dB steps; master volume 00-98 (80=0dB, 00=---)
- Channel volume 38-62 (50=0dB), subwoofer also accepts 00
- Input source changes may trigger unsolicited CV/MS events
- If SURROUND MODE or CHANNEL VOLUME unchanged before/after input switch, no EVENT returned
- Minimum level for MASTER VOLUME and CHANNEL VOLUME is "00" in parameter field
- 0.5dB step volume uses 3 ASCII characters in parameter field
- Authentication: not stated in source

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specifications not in source -->
<!-- UNRESOLVED: error code definitions not in source -->
<!-- UNRESOLVED: Ethernet Auto-IP or DHCP configuration not described -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T20:05:03.853Z
last_checked_at: 2026-10-07T20:56:46.561Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:56:46.561Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 units match source commands and transport; only a few minor extras (e.g. Zone3 volume). Source never names the SR7010, so applicability is generic. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- Z3UP
- Z3DOWN
- NSH
- TPANOFF
- "firmware compatibility range not stated in source"
- "flow control not stated in source"
- "no discrete settable parameters beyond Actions above"
- "complete event list not enumerated in source"
- "no explicit multi-step macros documented in source"
- "no explicit safety warnings or interlock procedures beyond timing note above"
- "firmware version compatibility not stated"
- "voltage/power specifications not in source"
- "error code definitions not in source"
- "Ethernet Auto-IP or DHCP configuration not described"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
