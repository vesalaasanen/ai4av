---
spec_id: admin/denon-avc-a10h-eu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVC-A10H_EU Control Spec"
manufacturer: Denon
model_family: AVC-A10H_EU
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVC-A10H_EU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T20:59:05.284Z
last_checked_at: 2026-06-09T09:36:02.883Z
generated_at: 2026-06-09T09:36:02.883Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "video processing mode specifics, network streaming protocol details beyond telnet"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated"
  - "voltage/power specs not stated"
  - "error recovery sequences not stated"
verification:
  verdict: verified
  checked_at: 2026-06-09T09:36:02.883Z
  matched_actions: 56
  action_count: 56
  confidence: medium
  summary: "All 56 spec action units matched verbatim in source; transport (port 23, 9600 baud) confirmed; source catalogue fully represented at the spec's parameterized granularity. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-20
---

# Denon AVC-A10H_EU Control Spec

## Summary
AV receiver with multi-zone audio/video control. Supports RS-232C and Ethernet (TCP/IP) control via ASCII commands terminated with CR (0x0D). Telnet on port 23. No authentication required. Supports power, volume, input routing, surround mode, tuner, USB/iPod, Bluetooth, HD Radio, and system menu control across Main Zone, Zone 2, and Zone 3.

<!-- UNRESOLVED: video processing mode specifics, network streaming protocol details beyond telnet -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated: 9600bps
  data_bits: 8  # stated: 8 bits
  parity: none  # stated
  stop_bits: 1  # stated
  flow_control: none  # stated: non procedural
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: PWON/PWSTANDBY commands present
- levelable  # inferred: MV, CV, PS, PV commands for volume/level
- routable  # inferred: SI, SD, Z2, Z3 source selection commands present
- queryable  # inferred: ? suffix commands return current state
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
  label: Query Power Status
  kind: action
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
  label: Set Master Volume (dB)
  kind: action
  params:
    - name: level
      type: string
      description: 00-98 ASCII, 80=0dB, 00=MIN (---dB). 0.5dB steps use 3 chars (e.g., MV805=+0.5dB)
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
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: ms_mode
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, and many others
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_favorite
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: num
      type: integer
      description: 1-4
- id: cv_channel
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit dB value (38-62 ASCII, 50=0dB)
- id: ps_tone
  label: Tone Control
  kind: action
  params:
    - name: control
      type: string
      description: BASS UP/DOWN/**, TRE UP/DOWN/**, TONE CTRL ON/OFF/?
- id: ps_param
  label: Parameter Setting
  kind: action
  params:
    - name: param
      type: string
      description: Many sub-params - DIL, SWL, SWL2, CINEMA EQ., MODE:, PSLOM, FH:, SP:, PHG, MULTEQ:, DYNEQ, REFLEV, DYNVOL, LFC, CNTAMT, DSX, STW, STH, GEQ, DRC, BSC, DEH, LFE, LFL, EFF, DEL, PAN, DIM, CEN, CEI, CEG, CES, SWR, RSZ, DELAY, RSTR, FRONT, AUROPR, AUROST
- id: pv_picture
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT, or CN/BR/ST/HUE/DNR/ENH with UP/DOWN/**
- id: sd_input
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
- id: dc_input
  label: Digital Input Codec
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS
- id: sv_video
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF
- id: slp_sleep
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: 001-120 (ASCII), OFF
- id: stby_auto
  label: Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 15M, 30M, 60M, OFF
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: vs_video
  label: Video Settings
  kind: action
  params:
    - name: param
      type: string
      description: ASPNRM, ASPFUL, ASP?, MONIAUTO/MONI1/MONI2/MONI?, SC48P/SC10I/SC72P/SC10P/SC10P24/SC4K/SC4KF/SCAUTO/SC?, SCH48P/SCH10I/SCH72P/SCH10P/SCH10P24/SCH4K/SCH4KF/SCHAUTO/SCH?, AUDIO AMP/TV/AUDIO?, VPMAUTO/VPMGAME/VPMMOVI/VPM?, VST ON/OFF/VST?
- id: tf_tuner
  label: Tuner Frequency
  kind: action
  params:
    - name: freq
      type: string
      description: ANUP, ANDOWN, or 6-digit frequency (AN******)
- id: tp_preset
  label: Tuner Preset
  kind: action
  params:
    - name: cmd
      type: string
      description: ANUP, ANDOWN, AN**, ANMEM, ANMEM**
- id: tm_tuner_mode
  label: Tuner Band/Mode
  kind: action
  params:
    - name: cmd
      type: string
      description: ANAM, ANFM, ANAUTO, ANMANUAL
- id: tf_hd
  label: HD Radio Frequency
  kind: action
  params:
    - name: cmd
      type: string
      description: HDUP, HDDOWN, HD******, HDMC*, HD****MC*
- id: tp_hd_preset
  label: HD Radio Preset
  kind: action
  params:
    - name: cmd
      type: string
      description: HDUP, HDDOWN, HD**, HDMEM, HDMEM**
- id: tm_hd_mode
  label: HD Radio Band/Mode
  kind: action
  params:
    - name: cmd
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
- id: ns_net
  label: USB/iPod/Bluetooth/Online Control
  kind: action
  params:
    - name: cmd
      type: string
      description: "90-9Z codes, RPT, RND, B**, C**, H, FV MEM, NSA, NSE"
- id: mn_menu
  label: System/Menu Control
  kind: action
  params:
    - name: cmd
      type: string
      description: CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL, MEN ON/OFF/?, PRV ON/OFF/?, ZST ON/OFF/?
- id: sy_system
  label: System Control
  kind: action
  params:
    - name: cmd
      type: string
      description: REMOTE LOCK ON/OFF, PANEL LOCK ON/OFF, PANEL+V LOCK ON/OFF
- id: tr_trigger
  label: Trigger Control
  kind: action
  params:
    - name: num
      type: integer
      description: "1-2"
    - name: state
      type: string
      description: ON, OFF
- id: dim_control
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI, DIM, DAR, OFF, SEL
- id: z2_control
  label: Zone 2 Control
  kind: action
  params:
    - name: cmd
      type: string
      description: SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP, QUICK1-5, UP, DOWN, ON, OFF, Z2MU ON/OFF/?
- id: z3_control
  label: Zone 3 Control
  kind: action
  params:
    - name: cmd
      type: string
      description: Same as Z2
- id: sr_rec
  label: Record Source Select
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, IPOD, USB DIRECT, IPOD DIRECT, SOURCE
- id: ug_upgrade
  label: Upgrade ID Display
  kind: action
  params: []
- id: rm_maint
  label: Remote Maintenance
  kind: action
  params:
    - name: cmd
      type: string
      description: STA, END
- id: cvzrl
  label: Reset All Channel Levels
  kind: action
  params: []
- id: z2_cs
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO, or ? to query
- id: z2_cv
  label: Zone 2 Channel Volume
  kind: action
  params:
    - name: channel_direction
      type: string
      description: FL UP, FL DOWN, FL** (38-62 ASCII, 50=0dB), FR UP, FR DOWN, FR**, or ? to query
- id: z2_hpf
  label: Zone 2 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF, or ? to query
- id: z2_ps
  label: Zone 2 Bass/Treble
  kind: action
  params:
    - name: param
      type: string
      description: BAS UP, BAS DOWN, BAS ** (00-99 ASCII, 50=0dB), BAS ?, TRE UP, TRE DOWN, TRE **, TRE ?
- id: z2_hda
  label: Zone 2 HDMI Audio Output
  kind: action
  params:
    - name: mode
      type: string
      description: THR (Through), PCM, or ? to query
- id: z2_slp
  label: Zone 2 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: OFF, 001-120 (ASCII, 010=10min), or ? to query
- id: z2_stby
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF, or ? to query
- id: z3_mu
  label: Zone 3 Mute
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF, or ? to query
- id: z3_cs
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO, or ? to query
- id: z3_cv
  label: Zone 3 Channel Volume
  kind: action
  params:
    - name: channel_direction
      type: string
      description: FL UP, FL DOWN, FL** (38-62 ASCII, 50=0dB), FR UP, FR DOWN, FR**, or ? to query
- id: z3_hpf
  label: Zone 3 High Pass Filter
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF, or ? to query
- id: z3_ps
  label: Zone 3 Bass/Treble
  kind: action
  params:
    - name: param
      type: string
      description: BAS UP, BAS DOWN, BAS ** (00-99 ASCII, 50=0dB), BAS ?, TRE UP, TRE DOWN, TRE **, TRE ?
- id: z3_slp
  label: Zone 3 Sleep Timer
  kind: action
  params:
    - name: value
      type: string
      description: OFF, 001-120 (ASCII, 010=10min), or ? to query
- id: z3_stby
  label: Zone 3 Auto Standby
  kind: action
  params:
    - name: time
      type: string
      description: 2H, 4H, 8H, OFF, or ? to query
- id: hd_query
  label: HD Radio Status Query
  kind: action
  params:
    - name: cmd
      type: string
      description: ? to return HD Status (band, station name, multi cast channel, signal level, artist, title, album, genre, program type)
```

## Feedbacks
```yaml
# Responses to ? query commands and unsolicited EVENT messages
# Device returns same command format with current value as response
- id: pw_status
  type: enum
  values: [PWON, PWSTANDBY]
- id: mv_status
  type: string
  description: "MV + 2-digit value (80=0dB, 00=MIN) or 3-digit for 0.5dB steps"
- id: mu_status
  type: enum
  values: [MUON, MUOFF]
- id: si_status
  type: string
  description: Current input source name
- id: ms_status
  type: string
  description: Current surround mode name
- id: zm_status
  type: enum
  values: [ZMON, ZMOFF]
- id: cv_status
  type: string
  description: "CVFL/CVFR/etc. + value (38-62 ASCII, 50=0dB), ends with CVEND"
- id: mu_z2_status
  type: enum
  values: [Z2MUON, Z2MUOFF]
- id: z2_status
  type: string
  description: Zone 2 on/off and source
- id: z3_status
  type: string
  description: Zone 3 on/off and source
- id: tf_status
  type: string
  description: TFAN + 6-digit frequency
- id: tp_status
  type: string
  description: TPAN + preset number
- id: tm_status
  type: string
  description: Current band and tuning mode
- id: hd_status
  type: string
  description: HD band, station, signal level, artist, title, album, genre
- id: ns_status
  type: string
  description: NSA/NSE on-screen display info
- id: mn_status
  type: string
  description: Menu and InstaPrevue status
- id: tr_status
  type: string
  description: TR1/TR2 on/off status
- id: dim_status
  type: enum
  values: [DIM BRI, DIM DIM, DIM DAR, DIM OFF]
- id: ps_status
  type: string
  description: Tone/parameter status from PSBAS?, PSTRE?, etc.
- id: pv_status
  type: string
  description: Picture mode and adjustment values
- id: sd_status
  type: string
  description: Digital input mode
- id: dc_status
  type: string
  description: Digital codec mode
- id: sv_status
  type: string
  description: Video select status
- id: slp_status
  type: string
  description: Sleep timer value SLP***
- id: stby_status
  type: string
  description: Auto standby setting
- id: eco_status
  type: string
  description: ECO mode setting
- id: vs_status
  type: string
  description: Video settings status
```

## Variables
```yaml
# Settable parameters not discrete actions
- id: master_volume_db
  type: number
  description: Master volume in dB. Range: -79.5dB to +18dB. 0.5dB steps encoded as 3 ASCII digits (e.g., 805=+0.5dB, 795=-0.5dB)
- id: channel_volume
  type: number
  description: Per-channel volume. Range: 38-62 ASCII (50=0dB). Subwoofer supports 00 in addition.
- id: tuner_frequency
  type: number
  description: Tuner frequency. AM in kHz (6 digits), FM in MHz (5 digits decimal notation)
```

## Events
```yaml
# Unsolicited messages device sends on state change
# Same format as COMMAND + CR - sent within 5 seconds of state change
- id: power_event
  description: PWON or PWSTANDBY on direct operator action
- id: volume_event
  description: MV, CV channel values on change
- id: input_event
  description: SI new source on input change
- id: surround_event
  description: MS new mode on surround change
- id: mute_event
  description: MU on/off on mute toggle
- id: zone2_event
  description: Z2 status on zone 2 change
- id: zone3_event
  description: Z3 status on zone 3 change
- id: tuner_event
  description: TFAN, TPAN on tuner change
- id: hd_radio_event
  description: TFHD, TPHD, HD on HD Radio change
- id: net_event
  description: NSA/NSE on network playback info change
- id: menu_event
  description: MNPRV, MNMENU on menu/preview toggle
```

## Macros
```yaml
# Multi-step sequences from source
- id: power_on_sequence
  description: Transmit PWON, wait 1 second before next command (J: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)")
- id: zone2_rec_mode
  description: "When ZONE2 selected, Z2 commands return Z2 prefix; when REC mode selected, SR status returns"
- id: input_change_cascade
  description: "Input source change triggers simultaneous CV and MS events for used channels"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Serial and TCP share same command set and protocol. Command interval: send commands 50ms+ apart. Response within 200ms of request. EVENT within 5s of state change. Max data length 135 bytes. ASCII 0x20–0x7F only. CR (0x0D) terminator. Half duplex on both interfaces. No login/password required.
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specs not stated -->
<!-- UNRESOLVED: error recovery sequences not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T20:59:05.284Z
last_checked_at: 2026-06-09T09:36:02.883Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T09:36:02.883Z
matched_actions: 56
action_count: 56
confidence: medium
summary: "All 56 spec action units matched verbatim in source; transport (port 23, 9600 baud) confirmed; source catalogue fully represented at the spec's parameterized granularity. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "video processing mode specifics, network streaming protocol details beyond telnet"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated"
- "voltage/power specs not stated"
- "error recovery sequences not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
