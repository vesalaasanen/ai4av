---
spec_id: admin/marantz-sr7011-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR7011 Series Control Spec"
manufacturer: Marantz
model_family: SR7011
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR7011
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:34:19.477Z
last_checked_at: 2026-10-07T20:56:37.705Z
generated_at: 2026-10-07T20:56:37.705Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "protocol version (Ver.06) applicability to specific firmware not stated"
  - "flow control not stated, \"Non procedural\" communication procedure"
  - "HD Radio commands (TFHD*, TPHD*, TMHD*, HD?) present but regional availability varies"
  - "Auro-3D commands (MSAURO3D, PSAUROPR, PSAUROST) require Auro-3D Upgrade"
  - "NS9W, NS9X, NS9Y, NS9Z, NSRPT, NSRND, NSFV MEM commands present but not fully parameterized"
  - "NSA/NSE onscreen display info commands return multi-line structured data not fully modeled"
  - "MNPRV InstaPrevue commands not parameterized"
  - "UGIDN upgrade ID display command not parameterized"
  - "HD Radio feedbacks (TFHD?, TPHD?, TMHD?, HD?) not fully modeled"
  - "NSA/NSE onscreen display info feedbacks not modeled (multi-line UTF-8)"
  - "NSH audio preset name list feedback not modeled"
  - "RDS station name feedback (TFANNAME?) for EU/AP models not modeled"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated"
  - "exact list of surround modes available for SR7011 (source covers multiple AVR models)"
  - "regional feature availability (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM are region-locked)"
  - "Auro-3D commands require optional upgrade"
  - "speaker configuration determines which channel volume commands are active"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:56:37.705Z
  matched_actions: 312
  action_count: 312
  confidence: medium
  summary: "All 312 action units match source commands with correct shapes and transport; source covers a Denon/Marantz family but never names SR7011 (generic-guide caveat). (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR7011 Series Control Spec

## Summary
AV surround receiver controllable via RS-232C serial and TCP/IP (Telnet). ASCII command protocol with 2-character command codes and variable-length parameters. Supports multi-zone (Zone 2, Zone 3), channel volume, surround mode selection, tuner control, online music/USB playback navigation, and system-level functions.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version (Ver.06) applicability to specific firmware not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # UNRESOLVED: flow control not stated, "Non procedural" communication procedure
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred from PW command
- routable     # inferred from SI (input select), SV (video select) commands
- queryable    # inferred from ? parameter on most commands
- levelable    # inferred from MV, CV, PS volume/tone commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: PWON

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: PWSTANDBY

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
  command: MVUP

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
  command: MVDOWN

- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "Volume level 00-98 (80=0dB, 00=---MIN). 0.5dB step uses 3 chars e.g. 805=+0.5dB"
  command: MV{level}

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel code: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
  command: CV{channel} UP

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel code (same as channel_volume_up)"
  command: CV{channel} DOWN

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "Channel code"
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"
  command: CV{channel} {level}

- id: channel_volume_reset
  label: Channel Volume Reset All
  kind: action
  params: []
  command: CVZRL

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: MUON

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: MUOFF

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
  command: SI{source}

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
  command: ZMON

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
  command: ZMOFF

- id: favorite_select
  label: Favorite Select
  kind: action
  params:
    - name: number
      type: integer
      description: "Favorite number 1-4"
  command: ZMFAVORITE{number}

- id: favorite_memory
  label: Favorite Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "Favorite number 1-4"
  command: ZMFAVORITE{number} MEMORY

- id: rec_select
  label: Record Select
  kind: action
  params:
    - name: source
      type: string
      description: "Source name (same as SI) or SOURCE to cancel"
  command: SR{source}

- id: input_mode_set
  label: Input Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
  command: SD{mode}

- id: digital_input_set
  label: Digital Input Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
  command: DC{mode}

- id: video_select
  label: Video Select Source
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE(cancel)"
  command: SV{source}

- id: video_select_on
  label: Video Select On
  kind: action
  params: []
  command: SVON

- id: video_select_off
  label: Video Select Off
  kind: action
  params: []
  command: SVOFF

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII (010=10min)"
  command: SLP{minutes}

- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  params:
    - name: timeout
      type: string
      description: "15M, 30M, 60M, OFF"
  command: STBY{timeout}

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
  command: ECO{mode}

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-QUICK5, and many Dolby/DTS variants"
  command: MS{mode}

- id: surround_quick_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select number 1-5"
  command: MSQUICK{number} MEMORY

- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"
  command: VS{mode}

- id: hdmi_monitor_set
  label: HDMI Monitor Set
  kind: action
  params:
    - name: output
      type: string
      description: "MONIAUTO, MONI1, MONI2"
  command: VS{output}

- id: resolution_set
  kind: action
  label: Resolution Set
  params:
    - name: resolution
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
  command: VS{resolution}

- id: hdmi_resolution_set
  label: HDMI Resolution Set
  kind: action
  params:
    - name: resolution
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
  command: VS{resolution}

- id: hdmi_audio_output_set
  label: HDMI Audio Output Set
  kind: action
  params:
    - name: output
      type: string
      description: "AUDIO AMP, AUDIO TV"
  command: VS{output}

- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
  command: VS{mode}

- id: vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  params:
    - name: state
      type: string
      description: "VST ON, VST OFF"
  command: VS{state}

- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "TONE CTRL ON, TONE CTRL OFF"
  command: PS{state}

- id: bass_adjust
  label: Bass Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "BAS UP, BAS DOWN, or BAS{level} (00-99, 50=0dB, range 44-56)"
  command: PS{direction}

- id: treble_adjust
  label: Treble Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "TRE UP, TRE DOWN, or TRE{level} (00-99, 50=0dB, range 44-56)"
  command: PS{direction}

- id: dialog_level_set
  label: Dialog Level Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "DIL ON, DIL OFF, DIL UP, DIL DOWN, or DIL{level} (38-62, 50=0dB)"
  command: PS{param}

- id: subwoofer_level_set
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "SWL ON, SWL OFF, SWL UP, SWL DOWN, SWL{level}, SWL2 UP, SWL2 DOWN, SWL2{level} (00,38-62, 50=0dB)"
  command: PS{param}

- id: cinema_eq_set
  label: Cinema EQ Set
  kind: action
  params:
    - name: state
      type: string
      description: "CINEMA EQ.ON, CINEMA EQ.OFF"
  command: PS{state}

- id: pl_mode_set
  label: Pro Logic Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MODE:MUSIC, MODE:CINEMA, MODE:GAME, MODE:PRO LOGIC"
  command: PS{mode}

- id: loudness_management_set
  label: Loudness Management Set
  kind: action
  params:
    - name: state
      type: string
      description: "PSLOM ON, PSLOM OFF"
  command: PS{state}

- id: front_height_set
  label: Front Height Output Set
  kind: action
  params:
    - name: state
      type: string
      description: "FH:ON, FH:OFF"
  command: PS{state}

- id: speaker_output_set
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: string
      description: "SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR"
  command: PS{config}

- id: pl2z_height_gain_set
  label: PL2z Height Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "PHG LOW, PHG MID, PHG HI"
  command: PS{level}

- id: multeq_set
  label: MultEQ Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MULTEQ:AUDYSSEY, MULTEQ:BYP.LR, MULTEQ:FLAT, MULTEQ:MANUAL, MULTEQ:OFF"
  command: PS{mode}

- id: dynamic_eq_set
  label: Dynamic EQ Set
  kind: action
  params:
    - name: state
      type: string
      description: "DYNEQ ON, DYNEQ OFF"
  command: PS{state}

- id: reference_level_offset_set
  label: Reference Level Offset Set
  kind: action
  params:
    - name: offset
      type: string
      description: "REFLEV 0, REFLEV 5, REFLEV 10, REFLEV 15"
  command: PS{offset}

- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DYNVOL HEV, DYNVOL MED, DYNVOL LIT, DYNVOL OFF"
  command: PS{mode}

- id: lfc_set
  label: Audyssey LFC Set
  kind: action
  params:
    - name: state
      type: string
      description: "LFC ON, LFC OFF"
  command: PS{state}

- id: containment_amount_adjust
  label: Containment Amount Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "CNTAMT UP, CNTAMT DOWN, CNTAMT{level} (00-99, 01-07 usable)"
  command: PS{param}

- id: audyssey_dsx_set
  label: Audyssey DSX Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DSX ONHW, DSX ONH, DSX ONW, DSX OFF"
  command: PS{mode}

- id: dynamic_compression_set
  label: Dynamic Compression Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DRC AUTO, DRC LOW, DRC MID, DRC HI, DRC OFF"
  command: PS{mode}

- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  params:
    - name: state
      type: string
      description: "GEQ ON, GEQ OFF"
  command: PS{state}

- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DEH OFF, DEH LOW, DEH MED, DEH HIGH"
  command: PS{mode}

- id: lfe_level_adjust
  label: LFE Level Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "LFE UP, LFE DOWN, LFE{level} (00-99, 00=0dB, 10=-10dB, range 0 to -10)"
  command: PS{param}

- id: lfe_level_ext_in_set
  label: LFE Level for EXT.IN/7.1CH IN Set
  kind: action
  params:
    - name: level
      type: string
      description: "LFL 00, LFL 05, LFL 10, LFL 15"
  command: PS{level}

- id: effect_set
  label: Effect On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "EFF ON, EFF OFF"
  command: PS{state}

- id: effect_level_adjust
  label: Effect Level Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "EFF UP, EFF DOWN, EFF{level} (00-99, range 1-15)"
  command: PS{param}

- id: delay_adjust
  label: Delay Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "DEL UP, DEL DOWN, DEL{value} (000-999, 000=0ms, 300=300ms)"
  command: PS{param}

- id: audio_delay_adjust
  label: Audio Delay Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "DELAY UP, DELAY DOWN, DELAY{value} (000-999, 000=0ms, 200=200ms)"
  command: PS{param}

- id: bass_sync_adjust
  label: Bass Sync Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "BSC UP, BSC DOWN, BSC{level} (00-99, range 0-16)"
  command: PS{param}

- id: audio_restorer_set
  label: Audio Restorer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "RSTR OFF, RSTR LOW, RSTR MED, RSTR HI"
  command: PS{mode}

- id: front_speaker_set
  label: Front Speaker Set
  kind: action
  params:
    - name: config
      type: string
      description: "FRONT SPA, FRONT SPB, FRONT A+B"
  command: PS{config}

- id: room_size_set
  label: Room Size Set
  kind: action
  params:
    - name: size
      type: string
      description: "RSZ S, RSZ MS, RSZ M, RSZ ML, RSZ L"
  command: PS{size}

- id: subwoofer_on_off
  label: Subwoofer On/Off (Direct/Stereo 2ch)
  kind: action
  params:
    - name: state
      type: string
      description: "SWR ON, SWR OFF"
  command: PS{state}

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
  command: PV{mode}

- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "CN UP, CN DOWN, CN{value} (000-100, 050=0, range -50 to +50)"
  command: PV{param}

- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "BR UP, BR DOWN, BR{value} (000-100, 050=0, range -50 to +50)"
  command: PV{param}

- id: saturation_adjust
  label: Saturation Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "ST UP, ST DOWN, ST{value} (000-100, 050=0, range -50 to +50)"
  command: PV{param}

- id: hue_adjust
  label: Hue Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "HUE UP, HUE DOWN, HUE{value} (44-56, 50=0, range -6 to +6)"
  command: PV{param}

- id: dnr_set
  label: DNR Set
  kind: action
  params:
    - name: mode
      type: string
      description: "DNR OFF, DNR LOW, DNR MID, DNR HI"
  command: PV{mode}

- id: enhancer_adjust
  label: Enhancer Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "ENH UP, ENH DOWN, ENH{value} (00-12, range 0-12)"
  command: PV{param}

- id: zone2_source_set
  label: Zone 2 Source Set
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE(cancel), PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
  command: Z2{source}

- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []
  command: Z2ON

- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []
  command: Z2OFF

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: Z2UP

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: Z2DOWN

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 (80=0dB, 00=---MIN)"
  command: Z2{level}

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
  command: Z2MUON

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  command: Z2MUOFF

- id: zone2_channel_set
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
  command: Z2CS{mode}

- id: zone2_channel_volume_adjust
  label: Zone 2 Channel Volume Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "FL UP, FL DOWN, FL{level}, FR UP, FR DOWN, FR{level} (38-62, 50=0dB)"
  command: Z2CV{param}

- id: zone2_hpf_set
  label: Zone 2 HPF On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
  command: Z2HPF{state}

- id: zone2_bass_adjust
  label: Zone 2 Bass Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "BAS UP, BAS DOWN, BAS{level} (40-60, 50=0dB)"
  command: Z2PS{param}

- id: zone2_treble_adjust
  label: Zone 2 Treble Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "TRE UP, TRE DOWN, TRE{level} (40-60, 50=0dB)"
  command: Z2PS{param}

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Output Set
  kind: action
  params:
    - name: mode
      type: string
      description: "THR (Through), PCM"
  command: Z2HDA {mode}

- id: zone2_sleep_timer_set
  label: Zone 2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII"
  command: Z2SLP{minutes}

- id: zone2_auto_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  params:
    - name: timeout
      type: string
      description: "2H, 4H, 8H, OFF"
  command: Z2STBY{timeout}

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select number 1-5"
  command: Z2QUICK{number}

- id: zone2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select number 1-5"
  command: Z2QUICK{number} MEMORY

- id: zone3_source_set
  label: Zone 3 Source Set
  kind: action
  params:
    - name: source
      type: string
      description: "SOURCE(cancel), PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
  command: Z3{source}

- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []
  command: Z3ON

- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []
  command: Z3OFF

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
  command: Z3UP

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
  command: Z3DOWN

- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 (80=0dB, 00=---MIN)"
  command: Z3{level}

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
  command: Z3MUON

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
  command: Z3MUOFF

- id: zone3_channel_set
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
  command: Z3CS{mode}

- id: zone3_channel_volume_adjust
  label: Zone 3 Channel Volume Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "FL UP, FL DOWN, FL{level}, FR UP, FR DOWN, FR{level} (38-62, 50=0dB)"
  command: Z3CV{param}

- id: zone3_hpf_set
  label: Zone 3 HPF On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
  command: Z3HPF{state}

- id: zone3_bass_adjust
  label: Zone 3 Bass Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "BAS UP, BAS DOWN, BAS{level} (40-60, 50=0dB)"
  command: Z3PS{param}

- id: zone3_treble_adjust
  label: Zone 3 Treble Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "TRE UP, TRE DOWN, TRE{level} (40-60, 50=0dB)"
  command: Z3PS{param}

- id: zone3_sleep_timer_set
  label: Zone 3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 by ASCII"
  command: Z3SLP{minutes}

- id: zone3_auto_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  params:
    - name: timeout
      type: string
      description: "2H, 4H, 8H, OFF"
  command: Z3STBY{timeout}

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select number 1-5"
  command: Z3QUICK{number}

- id: zone3_quick_memory
  label: Zone 3 Quick Select Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select number 1-5"
  command: Z3QUICK{number} MEMORY

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
  command: TFANUP

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
  command: TFANDOWN

- id: tuner_frequency_set
  label: Tuner Frequency Direct Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits; <050000=FM MHz, >050000=AM kHz"
  command: TFAN{frequency}

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
  command: TPANUP

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
  command: TPANDOWN

- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: number
      type: string
      description: "01-56"
  command: TPAN{number}

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: number
      type: string
      description: "01-56"
  command: TPANMEM{number}

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  params:
    - name: band
      type: string
      description: "ANAM (AM), ANFM (FM)"
  command: TM{band}

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ANAUTO, ANMANUAL"
  command: TM{mode}

- id: network_cursor_up
  label: Network/USB Cursor Up
  kind: action
  params: []
  command: NS90

- id: network_cursor_down
  label: Network/USB Cursor Down
  kind: action
  params: []
  command: NS91

- id: network_cursor_left
  label: Network/USB Cursor Left
  kind: action
  params: []
  command: NS92

- id: network_cursor_right
  label: Network/USB Cursor Right
  kind: action
  params: []
  command: NS93

- id: network_enter
  label: Network/USB Enter (Play/Pause)
  kind: action
  params: []
  command: NS94

- id: network_play
  label: Network/USB Play
  kind: action
  params: []
  command: NS9A

- id: network_pause
  label: Network/USB Pause
  kind: action
  params: []
  command: NS9B

- id: network_stop
  label: Network/USB Stop
  kind: action
  params: []
  command: NS9C

- id: network_skip_plus
  label: Network/USB Skip Plus
  kind: action
  params: []
  command: NS9D

- id: network_skip_minus
  label: Network/USB Skip Minus
  kind: action
  params: []
  command: NS9E

- id: network_manual_search_plus
  label: Network/USB Manual Search Plus
  kind: action
  params: []
  command: NS9F

- id: network_manual_search_minus
  label: Network/USB Manual Search Minus
  kind: action
  params: []
  command: NS9G

- id: network_repeat_one
  label: Network/USB Repeat One
  kind: action
  params: []
  command: NS9H

- id: network_repeat_all
  label: Network/USB Repeat All
  kind: action
  params: []
  command: NS9I

- id: network_repeat_off
  label: Network/USB Repeat Off
  kind: action
  params: []
  command: NS9J

- id: network_random_on
  label: Network/USB Random On
  kind: action
  params: []
  command: NS9K

- id: network_random_off
  label: Network/USB Random Off
  kind: action
  params: []
  command: NS9M

- id: network_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: number
      type: string
      description: "00-35"
  command: NSB{number}

- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: number
      type: string
      description: "00-35"
  command: NSC{number}

- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  params: []
  command: MNCUP

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  params: []
  command: MNCDN

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  params: []
  command: MNCLT

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  params: []
  command: MNCRT

- id: menu_enter
  label: Menu Enter
  kind: action
  params: []
  command: MNENT

- id: menu_return
  label: Menu Return
  kind: action
  params: []
  command: MNRTN

- id: menu_option
  label: Menu Option
  kind: action
  params: []
  command: MNOPT

- id: menu_info
  label: Menu Info
  kind: action
  params: []
  command: MNINF

- id: channel_level_menu
  label: Channel Level Adjust Menu Toggle
  kind: action
  params: []
  command: MNCHL

- id: setup_menu_on
  label: Setup Menu On
  kind: action
  params: []
  command: MNMEN ON

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  params: []
  command: MNMEN OFF

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
  command: MNZST ON

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
  command: MNZST OFF

- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
  command: SYREMOTE LOCK ON

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
  command: SYREMOTE LOCK OFF

- id: panel_lock_on
  label: Panel Lock On (except Master Vol)
  kind: action
  params: []
  command: SYPANEL LOCK ON

- id: panel_vol_lock_on
  label: Panel + Volume Lock On
  kind: action
  params: []
  command: SYPANEL+V LOCK ON

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
  command: SYPANEL LOCK OFF

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  params: []
  command: TR1 ON

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  params: []
  command: TR1 OFF

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  params: []
  command: TR2 ON

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  params: []
  command: TR2 OFF

- id: dimmer_set
  label: Dimmer Set
  kind: action
  params:
    - name: level
      type: string
      description: "BRI, DIM, DAR, OFF, SEL (toggle Bright->Dim->Dark->Off)"
  command: DIM {level}

- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  params: []
  command: RM STA

- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  params: []
  command: RM END

# UNRESOLVED: HD Radio commands (TFHD*, TPHD*, TMHD*, HD?) present but regional availability varies
# UNRESOLVED: Auro-3D commands (MSAURO3D, PSAUROPR, PSAUROST) require Auro-3D Upgrade
# UNRESOLVED: NS9W, NS9X, NS9Y, NS9Z, NSRPT, NSRND, NSFV MEM commands present but not fully parameterized
# UNRESOLVED: NSA/NSE onscreen display info commands return multi-line structured data not fully modeled
# UNRESOLVED: MNPRV InstaPrevue commands not parameterized
# UNRESOLVED: UGIDN upgrade ID display command not parameterized

- id: stage_width_adjust
  label: Stage Width Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "STW UP, STW DOWN, or STW {level}; 00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  command: PS{param}

- id: stage_height_adjust
  label: Stage Height Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "STH UP, STH DOWN, or STH {level}; 00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  command: PS{param}

- id: panorama_set
  label: Panorama Set
  kind: action
  params:
    - name: state
      type: string
      description: "PAN ON, PAN OFF"
  command: PS{state}

- id: dimension_adjust
  label: Dimension Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "DIM UP, DIM DOWN, or DIM {level}; 00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 6"
  command: PS{param}

- id: center_width_adjust
  label: Center Width Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "CEN UP, CEN DOWN, or CEN {level}; 00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"
  command: PS{param}

- id: center_image_adjust
  label: Center Image Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "CEI UP, CEI DOWN, or CEI {level}; 00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  command: PS{param}

- id: center_gain_adjust
  label: Center Gain Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "CEG UP, CEG DOWN, or CEG {level}; 00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  command: PS{param}

- id: center_spread_set
  label: Center Spread Set
  kind: action
  params:
    - name: state
      type: string
      description: "CES ON, CES OFF"
  command: PS{state}

- id: auro_preset_set
  label: Auro-Matic 3D Preset Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUROPR SMA, AUROPR MED, AUROPR LAR, AUROPR SPE; Auro-3D Upgrade only"
  command: PS{mode}

- id: auro_strength_adjust
  label: Auro-Matic 3D Strength Adjust
  kind: action
  params:
    - name: param
      type: string
      description: "AUROST UP, AUROST DOWN, or AUROST {level}; 00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16; Auro-3D Upgrade only"
  command: PS{param}

- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: number
      type: integer
      description: "Z2 favorite 1-4 Mode select."
  command: Z2FAVORITE{number}

- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
  command: Z2FAVORITE{number} MEMORY

- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: number
      type: integer
      description: "Z3 favorite 1-4 Mode select."
  command: Z3FAVORITE{number}

- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: number
      type: integer
      description: "1-4"
  command: Z3FAVORITE{number} MEMORY

- id: tuner_preset_memory_toggle
  label: Tuner Preset Memory Toggle
  kind: action
  params: []
  command: TPANMEM

- id: hd_radio_frequency_up
  label: HD Radio Frequency Up
  kind: action
  params: []
  command: TFHDUP

- id: hd_radio_frequency_down
  label: HD Radio Frequency Down
  kind: action
  params: []
  command: TFHDDOWN

- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.); numeric bounds UNRESOLVED"
  command: TFHD{frequency}

- id: hd_radio_multicast_set
  label: HD Radio Multicast Set
  kind: action
  params:
    - name: channel
      type: string
      description: "1 digit; Multi Cast 1～8, Analog 0"
  command: TFHDMC{channel}

- id: hd_radio_frequency_multicast_set
  label: HD Radio Frequency And Multicast Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.); numeric bounds UNRESOLVED"
    - name: channel
      type: string
      description: "1 digit; Multi Cast 1～8, Analog 0"
  command: TFHD{frequency}MC{channel}

- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
  command: TPHDUP

- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
  command: TPHDDOWN

- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: number
      type: string
      description: "01-56 01=CH01,56=CH56"
  command: TPHD{number}

- id: hd_radio_preset_memory_toggle
  label: HD Radio Preset Memory Toggle
  kind: action
  params: []
  command: TPHDMEM

- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: number
      type: string
      description: "01-56 01=CH01,56=CH56"
  command: TPHDMEM{number}

- id: hd_radio_band_set
  label: HD Radio Band Set
  kind: action
  params:
    - name: band
      type: string
      description: "HDAM, HDFM"
  command: TM{band}

- id: hd_radio_mode_set
  label: HD Radio Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
  command: TM{mode}

- id: network_ipod_mode_toggle
  label: Network/USB IPod Mode Toggle
  kind: action
  params: []
  command: NS9W

- id: network_page_next
  label: Network/USB Page Next
  kind: action
  params: []
  command: NS9X

- id: network_page_previous
  label: Network/USB Page Previous
  kind: action
  params: []
  command: NS9Y

- id: network_manual_search_stop
  label: Network/USB Manual Search Stop
  kind: action
  params: []
  command: NS9Z

- id: network_repeat_toggle
  label: Network/USB Repeat Toggle
  kind: action
  params: []
  command: NSRPT

- id: network_random_toggle
  label: Network/USB Random Toggle
  kind: action
  params: []
  command: NSRND

- id: network_favorite_add
  label: Network Favorite Add
  kind: action
  params: []
  command: NSFV MEM

- id: instaprevue_on
  label: InstaPrevue On
  kind: action
  params: []
  command: MNPRV ON

- id: instaprevue_off
  label: InstaPrevue Off
  kind: action
  params: []
  command: MNPRV OFF

- id: upgrade_id_display
  label: Upgrade ID Display
  kind: action
  params: []
  command: UGIDN
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  command: PW?
  query_command: PW?
  response: PWON | PWSTANDBY

- id: master_volume
  type: string
  description: "00-98 or 3-char 0.5dB step (e.g. 805). 80=0dB, 00=---MIN"
  command: MV?
  query_command: MV?
  response: MV{level}

- id: channel_volume
  type: string
  description: "Returns levels for all configured speakers, terminated by CVEND"
  command: CV?
  query_command: CV?
  response: "CV{channel} {level} ... CVEND"

- id: mute_state
  type: enum
  values: [ON, OFF]
  command: MU?
  query_command: MU?
  response: MUON | MUOFF

- id: input_source
  type: string
  description: "Current input source name"
  command: SI?
  query_command: SI?
  response: SI{source}

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  command: ZM?
  query_command: ZM?
  response: ZMON | ZMOFF

- id: surround_mode
  type: string
  description: "Current surround mode name"
  command: MS?
  query_command: MS?
  response: MS{mode}

- id: input_mode
  type: string
  command: SD?
  query_command: SD?
  response: SD{mode}

- id: digital_input_mode
  type: string
  command: DC?
  query_command: DC?
  response: DC{mode}

- id: video_select_state
  type: string
  command: SV?
  query_command: SV?
  response: "SV{source} and/or SVON"

- id: sleep_timer
  type: string
  command: SLP?
  query_command: SLP?
  response: SLP{minutes}

- id: auto_standby
  type: string
  command: STBY?
  query_command: STBY?
  response: STBY{timeout}

- id: eco_mode
  type: string
  command: ECO?
  query_command: ECO?
  response: ECO{mode}

- id: aspect_ratio
  type: string
  command: VSASP ?
  query_command: VSASP ?
  response: VSASPNRM | VSASPFUL

- id: hdmi_monitor
  type: string
  command: VSMONI ?
  query_command: VSMONI ?
  response: VSMONIAUTO | VSMONI1 | VSMONI2

- id: resolution
  type: string
  command: VSSC ?
  query_command: VSSC ?
  response: VS{resolution}

- id: hdmi_resolution
  type: string
  command: VSSCH ?
  query_command: VSSCH ?
  response: VS{resolution}

- id: hdmi_audio_output
  type: string
  command: VSAUDIO ?
  query_command: VSAUDIO ?
  response: VSAUDIO AMP | VSAUDIO TV

- id: video_processing_mode
  type: string
  command: VSVPM ?
  query_command: VSVPM ?
  response: VSVPM{mode}

- id: vertical_stretch
  type: string
  command: VSVST ?
  query_command: VSVST ?
  response: VSVST ON | VSVST OFF

- id: tone_control
  type: string
  command: PSTONE CTRL ?
  query_command: PSTONE CTRL ?
  response: PSTONE CTRL ON | PSTONE CTRL OFF

- id: bass_level
  type: string
  command: PSBAS ?
  query_command: PSBAS ?
  response: PSBAS {level}

- id: treble_level
  type: string
  command: PSTRE ?
  query_command: PSTRE ?
  response: PSTRE {level}

- id: cinema_eq
  type: string
  command: PSCINEMA EQ. ?
  query_command: PSCINEMA EQ. ?
  response: PSCINEMA EQ.ON | PSCINEMA EQ.OFF

- id: loudness_management
  type: string
  command: PSLOM ?
  query_command: PSLOM ?
  response: PSLOM ON | PSLOM OFF

- id: dynamic_eq
  type: string
  command: PSDYNEQ ?
  query_command: PSDYNEQ ?
  response: PSDYNEQ ON | PSDYNEQ OFF

- id: reference_level_offset
  type: string
  command: PSREFLEV ?
  query_command: PSREFLEV ?
  response: PSREFLEV {offset}

- id: dynamic_volume
  type: string
  command: PSDYNVOL ?
  query_command: PSDYNVOL ?
  response: PSDYNVOL {mode}

- id: lfc_state
  type: string
  command: PSLFC ?
  query_command: PSLFC ?
  response: PSLFC ON | PSLFC OFF

- id: containment_amount
  type: string
  command: PSCNTAMT ?
  query_command: PSCNTAMT ?
  response: PSCNTAMT {level}

- id: audyssey_dsx
  type: string
  command: PSDSX ?
  query_command: PSDSX ?
  response: PSDSX {mode}

- id: graphic_eq
  type: string
  command: PSGEQ ?
  query_command: PSGEQ ?
  response: PSGEQ ON | PSGEQ OFF

- id: dynamic_compression
  type: string
  command: PSDRC ?
  query_command: PSDRC ?
  response: PSDRC {mode}

- id: dialogue_enhancer
  type: string
  command: PSDEH ?
  query_command: PSDEH ?
  response: PSDEH {mode}

- id: lfe_level
  type: string
  command: PSLFE ?
  query_command: PSLFE ?
  response: PSLFE {level}

- id: effect_state
  type: string
  command: PSEFF ?
  query_command: PSEFF ?
  response: "PSEFF ON and/or PSEFF {level}"

- id: delay_value
  type: string
  command: PSDEL ?
  query_command: PSDEL ?
  response: PSDEL {value}

- id: audio_delay_value
  type: string
  command: PSDELAY ?
  query_command: PSDELAY ?
  response: PSDELAY {value}

- id: audio_restorer
  type: string
  command: PSRSTR ?
  query_command: PSRSTR ?
  response: PSRSTR {mode}

- id: front_speaker
  type: string
  command: PSFRONT?
  query_command: PSFRONT?
  response: PSFRONT {config}

- id: room_size
  type: string
  command: PSRSZ ?
  query_command: PSRSZ ?
  response: PSRSZ {size}

- id: subwoofer_state
  type: string
  command: PSSWR ?
  query_command: PSSWR ?
  response: PSSWR ON | PSSWR OFF

- id: picture_mode
  type: string
  command: PV?
  query_command: PV?
  response: PV{mode}

- id: contrast
  type: string
  command: PVCN ?
  query_command: PVCN ?
  response: PVCN {value}

- id: brightness
  type: string
  command: PVBR ?
  query_command: PVBR ?
  response: PVBR {value}

- id: saturation
  type: string
  command: PVST ?
  query_command: PVST ?
  response: PVST {value}

- id: hue
  type: string
  command: PVHUE ?
  query_command: PVHUE ?
  response: PVHUE {value}

- id: dnr
  type: string
  command: PVDNR ?
  query_command: PVDNR ?
  response: PVDNR {mode}

- id: enhancer
  type: string
  command: PVENH ?
  query_command: PVENH ?
  response: PVENH {value}

- id: zone2_state
  type: enum
  values: [ON, OFF]
  command: Z2?
  query_command: Z2?
  response: Z2ON | Z2OFF

- id: zone2_source
  type: string
  command: Z2?
  query_command: Z2?
  response: Z2{source}

- id: zone2_volume
  type: string
  command: Z2?
  query_command: Z2?
  response: Z2{level}

- id: zone2_mute
  type: enum
  values: [ON, OFF]
  command: Z2MU?
  query_command: Z2MU?
  response: Z2MUON | Z2MUOFF

- id: zone3_state
  type: enum
  values: [ON, OFF]
  command: Z3?
  query_command: Z3?
  response: Z3ON | Z3OFF

- id: zone3_source
  type: string
  command: Z3?
  query_command: Z3?
  response: Z3{source}

- id: zone3_volume
  type: string
  command: Z3?
  query_command: Z3?
  response: Z3{level}

- id: zone3_mute
  type: enum
  values: [ON, OFF]
  command: Z3MU?
  query_command: Z3MU?
  response: Z3MUON | Z3MUOFF

- id: tuner_frequency
  type: string
  command: TFAN?
  query_command: TFAN?
  response: TFAN{frequency}

- id: tuner_preset
  type: string
  command: TPAN?
  query_command: TPAN?
  response: TPAN{number}

- id: tuner_band_mode
  type: string
  command: TMAN?
  query_command: TMAN?
  response: TM{mode}

- id: trigger_state
  type: string
  command: TR?
  query_command: TR?
  response: "TR1 ON|OFF and TR2 ON|OFF"

- id: setup_menu_state
  type: string
  command: MNMEN?
  query_command: MNMEN?
  response: MNMEN ON | MNMEN OFF

- id: all_zone_stereo_state
  type: string
  command: MNZST?
  query_command: MNZST?
  response: MNZST ON | MNZST OFF

- id: dimmer_state
  type: string
  command: DIM ?
  query_command: DIM ?
  response: DIM {level}

- id: remote_maintenance_state
  type: string
  command: RM ?
  query_command: RM ?
  response: RM ON | RM OFF

# UNRESOLVED: HD Radio feedbacks (TFHD?, TPHD?, TMHD?, HD?) not fully modeled
# UNRESOLVED: NSA/NSE onscreen display info feedbacks not modeled (multi-line UTF-8)
# UNRESOLVED: NSH audio preset name list feedback not modeled
# UNRESOLVED: RDS station name feedback (TFANNAME?) for EU/AP models not modeled

- id: rec_select_state
  type: string
  description: "REC mode returns SR status; ZONE2 mode returns Z2 status"
  command: SR?
  query_command: SR?
  response: "SR{source} | Z2{source}"

- id: surround_quick_state
  type: string
  description: "Quick Select status; source includes status-only MSQUICK0"
  command: MSQUICK ?
  query_command: MSQUICK ?
  response: MSQUICK{number}

- id: dialog_level
  type: string
  description: "Dialog Level Adjust state and level"
  command: PSDIL ?
  query_command: PSDIL ?
  response: "PSDIL ON | PSDIL OFF | PSDIL {level}"

- id: subwoofer_level
  type: string
  description: "Subwoofer Level Adjust state and levels; PSSWL2 is omitted when SW2 is none"
  command: PSSWL ?
  query_command: PSSWL ?
  response: "PSSWL ON | PSSWL OFF | PSSWL {level} | PSSWL2 {level}"

- id: pl_mode
  type: string
  description: "Pro Logic mode; HEIGHT is EVENT only"
  command: PSMODE: ?
  query_command: PSMODE: ?
  response: "PSMODE:MUSIC | PSMODE:CINEMA | PSMODE:GAME | PSMODE:PRO LOGIC | PSMODE:HEIGHT"

- id: front_height
  type: string
  command: PSFH: ?
  query_command: PSFH: ?
  response: PSFH:ON | PSFH:OFF

- id: speaker_output
  type: string
  command: PSSP: ?
  query_command: PSSP: ?
  response: PSSP:{config}

- id: pl2z_height_gain
  type: string
  command: PSPHG ?
  query_command: PSPHG ?
  response: PSPHG LOW | PSPHG MID | PSPHG HI

- id: multeq_mode
  type: string
  command: PSMULTEQ: ?
  query_command: PSMULTEQ: ?
  response: PSMULTEQ:{mode}

- id: stage_width
  type: string
  command: PSSTW ?
  query_command: PSSTW ?
  response: PSSTW {level}

- id: stage_height
  type: string
  command: PSSTH ?
  query_command: PSSTH ?
  response: PSSTH {level}

- id: bass_sync
  type: string
  command: PSBSC ?
  query_command: PSBSC ?
  response: PSBSC {level}

- id: lfe_level_ext_in
  type: string
  command: PSLFL ?
  query_command: PSLFL ?
  response: PSLFL {level}

- id: panorama
  type: string
  command: PSPAN ?
  query_command: PSPAN ?
  response: PSPAN ON | PSPAN OFF

- id: dimension
  type: string
  command: PSDIM ?
  query_command: PSDIM ?
  response: PSDIM {level}

- id: center_width
  type: string
  command: PSCEN ?
  query_command: PSCEN ?
  response: PSCEN {level}

- id: center_image
  type: string
  command: PSCEI ?
  query_command: PSCEI ?
  response: PSCEI {level}

- id: center_gain
  type: string
  command: PSCEG ?
  query_command: PSCEG ?
  response: PSCEG {level}

- id: center_spread
  type: string
  command: PSCES ?
  query_command: PSCES ?
  response: PSCES ON | PSCES OFF

- id: auro_preset
  type: string
  description: "Auro-3D Upgrade only"
  command: PSAUROPR ?
  query_command: PSAUROPR ?
  response: PSAUROPR SMA | PSAUROPR MED | PSAUROPR LAR | PSAUROPR SPE

- id: auro_strength
  type: string
  description: "Auro-3D Upgrade only"
  command: PSAUROST ?
  query_command: PSAUROST ?
  response: PSAUROST {level}

- id: zone2_quick_state
  type: string
  description: "Zone 2 Quick Select status; source includes status-only Z2QUICK0"
  command: Z2QUICK ?
  query_command: Z2QUICK ?
  response: Z2QUICK{number}

- id: zone2_channel_mode
  type: string
  command: Z2CS?
  query_command: Z2CS?
  response: Z2CSST | Z2CSMONO

- id: zone2_channel_volume
  type: string
  command: Z2CV?
  query_command: Z2CV?
  response: Z2CV{channel} {level}

- id: zone2_hpf
  type: string
  command: Z2HPF?
  query_command: Z2HPF?
  response: Z2HPFON | Z2HPFOFF

- id: zone2_bass_level
  type: string
  command: Z2PSBAS ?
  query_command: Z2PSBAS ?
  response: Z2PSBAS {level}

- id: zone2_treble_level
  type: string
  command: Z2PSTRE ?
  query_command: Z2PSTRE ?
  response: Z2PSTRE {level}

- id: zone2_hdmi_audio_output
  type: string
  command: Z2HDA?
  query_command: Z2HDA?
  response: Z2HDA THR | Z2HDA PCM

- id: zone2_sleep_timer
  type: string
  command: Z2SLP?
  query_command: Z2SLP?
  response: Z2SLP{minutes}

- id: zone2_auto_standby
  type: string
  command: Z2STBY?
  query_command: Z2STBY?
  response: Z2STBY{timeout}

- id: zone3_quick_state
  type: string
  description: "Zone 3 Quick Select status; source includes status-only Z3QUICK0"
  command: Z3QUICK ?
  query_command: Z3QUICK ?
  response: Z3QUICK{number}

- id: zone3_channel_mode
  type: string
  command: Z3CS?
  query_command: Z3CS?
  response: Z3CSST | Z3CSMONO

- id: zone3_channel_volume
  type: string
  command: Z3CV?
  query_command: Z3CV?
  response: Z3CV{channel} {level}

- id: zone3_hpf
  type: string
  command: Z3HPF?
  query_command: Z3HPF?
  response: Z3HPFON | Z3HPFOFF

- id: zone3_bass_level
  type: string
  command: Z3PSBAS ?
  query_command: Z3PSBAS ?
  response: Z3PSBAS {level}

- id: zone3_treble_level
  type: string
  command: Z3PSTRE ?
  query_command: Z3PSTRE ?
  response: Z3PSTRE {level}

- id: zone3_sleep_timer
  type: string
  command: Z3SLP?
  query_command: Z3SLP?
  response: Z3SLP{minutes}

- id: zone3_auto_standby
  type: string
  command: Z3STBY?
  query_command: Z3STBY?
  response: Z3STBY{timeout}

- id: rds_station_name
  type: string
  description: "Return RDS Station Name (EU,AP Only); empty-name encoding UNRESOLVED"
  command: TFANNAME?
  query_command: TFANNAME?
  response: TFANNAME{name}

- id: hd_radio_frequency
  type: string
  command: TFHD?
  query_command: TFHD?
  response: TFHD{frequency}

- id: hd_radio_preset
  type: string
  command: TPHD?
  query_command: TPHD?
  response: TPHD{number} | TPHDOFF

- id: hd_radio_band_mode
  type: string
  command: TMHD?
  query_command: TMHD?
  response: TM{mode}

- id: hd_radio_status
  type: string
  description: "Returns HD status: BAND, STATION NAME, MULTI CAST CURRENT CHANNEL, MULTI CAST NUMBER, SIGNAL LEVEL, ARTIST, TITLE, ALBUM, GENRE, PROGRAM TYPE. Source also lists HDMODE DIGITAL and HDMODE ANALOG. Complete response framing UNRESOLVED."
  command: HD?
  query_command: HD?
  response: UNRESOLVED

- id: network_preset_names
  type: string
  description: "Audio Preset Name status (UTF-8), except Bluetooth and USB/iPod; NSH00 through NSH35, preset names 20 digits"
  command: NSH
  query_command: NSH
  response: NSH{number}{name}

- id: network_onscreen_ascii
  type: string
  description: "Onscreen Display Information List, ASCII Character(MAX96byte); returns NSA0-NSA8. Null marker _, trailing ? bytes ignored. Flag byte: Bit1 playable music, Bit2 directory, Bit4 cursor select, Bit7 picture."
  command: NSA
  query_command: NSA
  response: NSA{line}{data}

- id: network_onscreen_utf8
  type: string
  description: "Onscreen Display Information List, UTF-8 Character(MAX96byte); returns NSE0-NSE8. Null marker _, trailing ? bytes ignored. Flag byte: Bit1 playable music, Bit2 directory, Bit4 cursor select, Bit7 picture."
  command: NSE
  query_command: NSE
  response: NSE{line}{data}

- id: network_onscreen_ascii_zero_request
  type: string
  description: "Source also documents NSA0 as a request returning the onscreen information list; distinction from NSA UNRESOLVED"
  command: NSA0
  query_command: NSA0
  response: NSA{line}{data}

- id: network_onscreen_utf8_zero_request
  type: string
  description: "Source also documents NSE0 as a request returning the onscreen information list; distinction from NSE UNRESOLVED"
  command: NSE0
  query_command: NSE0
  response: NSE{line}{data}

- id: instaprevue_state
  type: string
  description: "NG is status only when InstaPrevue is not available"
  command: MNPRV?
  query_command: MNPRV?
  response: MNPRV ON | MNPRV OFF | MNPRV NG
```

## Variables
```yaml
# Volume and level parameters are set via direct commands (MV, CV, Z2, Z3 etc.)
# No separate variable namespace in this protocol.
```

## Events
```yaml
- id: power_event
  description: "Unsolicited PWON or PWSTANDBY when power state changes via front panel or remote"

- id: volume_event
  description: "Unsolicited MV{level} when master volume changes"

- id: channel_volume_event
  description: "Unsolicited CV{channel} {level} when channel volume changes; CVEND terminates multi-channel response"

- id: mute_event
  description: "Unsolicited MUON or MUOFF when mute state changes"

- id: input_source_event
  description: "Unsolicited SI{source} when input source changes; may also trigger surround mode and channel volume events"

- id: surround_mode_event
  description: "Unsolicited MS{mode} when surround mode changes; present mode returned before new mode"

- id: zone2_event
  description: "Unsolicited Z2{state|source|level} when Zone 2 state changes"

- id: zone3_event
  description: "Unsolicited Z3{state|source|level} when Zone 3 state changes"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
# Note: source states 1-second wait required after PWON before sending next command
```

## Notes
- Commands use ASCII format: `{COMMAND}{PARAMETER}{CR (0x0D)}`. Command codes are 2 characters; parameters up to 25 characters.
- Send commands at >= 50ms intervals.
- RESPONSE to query commands (`COMMAND?`) sent within 200ms.
- EVENTs sent within 5 seconds of state change.
- Max communication data length: 135 bytes.
- Volume encoding: 80=0dB, 00=---(MIN), 98=+18dB. 0.5dB step uses 3 ASCII characters (e.g. MV805=+0.5dB, MV795=-0.5dB).
- Channel volume range: 38-62, where 50=0dB. Subwoofer also accepts 00.
- Bass/Treble range: 00-99, 50=0dB. AVR usable range -6 to +6 (44-56).
- After PWON, wait 1 second before sending next command.
- When input source changes, channel volume and surround mode events are sent if they differ from previous source.
- REC SELECT (SR) shares response namespace with Zone 2 (Z2) — if REC mode selected, "SR" status returns; if ZONE2 mode selected, "Z2" status returns.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: exact list of surround modes available for SR7011 (source covers multiple AVR models) -->
<!-- UNRESOLVED: regional feature availability (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM are region-locked) -->
<!-- UNRESOLVED: Auro-3D commands require optional upgrade -->
<!-- UNRESOLVED: speaker configuration determines which channel volume commands are active -->
<!-- UNRESOLVED: NS9W iPod mode toggle, NS9X/9Y page navigation, NSRPT/RND toggle commands not fully detailed -->
<!-- UNRESOLVED: flow_control value not explicitly stated (source says "Non procedural" communication procedure) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:34:19.477Z
last_checked_at: 2026-10-07T20:56:37.705Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:56:37.705Z
matched_actions: 312
action_count: 312
confidence: medium
summary: "All 312 action units match source commands with correct shapes and transport; source covers a Denon/Marantz family but never names SR7011 (generic-guide caveat). (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "protocol version (Ver.06) applicability to specific firmware not stated"
- "flow control not stated, \"Non procedural\" communication procedure"
- "HD Radio commands (TFHD*, TPHD*, TMHD*, HD?) present but regional availability varies"
- "Auro-3D commands (MSAURO3D, PSAUROPR, PSAUROST) require Auro-3D Upgrade"
- "NS9W, NS9X, NS9Y, NS9Z, NSRPT, NSRND, NSFV MEM commands present but not fully parameterized"
- "NSA/NSE onscreen display info commands return multi-line structured data not fully modeled"
- "MNPRV InstaPrevue commands not parameterized"
- "UGIDN upgrade ID display command not parameterized"
- "HD Radio feedbacks (TFHD?, TPHD?, TMHD?, HD?) not fully modeled"
- "NSA/NSE onscreen display info feedbacks not modeled (multi-line UTF-8)"
- "NSH audio preset name list feedback not modeled"
- "RDS station name feedback (TFANNAME?) for EU/AP models not modeled"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated"
- "exact list of surround modes available for SR7011 (source covers multiple AVR models)"
- "regional feature availability (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM are region-locked)"
- "Auro-3D commands require optional upgrade"
- "speaker configuration determines which channel volume commands are active"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
