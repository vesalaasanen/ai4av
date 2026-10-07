---
spec_id: admin/denon-dnp2000-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DNP2000 Series Control Spec"
manufacturer: Denon
model_family: "DNP2000 Series"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "DNP2000 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:06:39.318Z
last_checked_at: 2026-10-01T08:34:48.149Z
generated_at: 2026-10-01T08:34:48.149Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact DNP2000 model variants not specified in source"
  - "source appears to be a general Denon AVR protocol doc (Ver.06); applicability to specific DNP2000 models unconfirmed"
  - "PL2z height gain (PHG), Audyssey DSX (DSX), stage width/height (STW/STH),"
  - "feedback responses for Audyssey params (MULTEQ, DYNEQ, DYNVOL, LFC, CNTAMT),"
  - "no explicit multi-step macros described in source"
  - "no other safety interlocks or power-on sequencing documented"
  - "exact DNP2000 model identifiers and firmware versions not stated"
  - "which specific Denon AVR models this protocol doc covers (appears to span multiple model years)"
  - "serial flow_control not explicitly stated in source (set to none as typical for Denon)"
  - "TCP connection persistence / keepalive behavior not documented"
  - "maximum concurrent TCP connections not stated"
  - "whether DNP2000 is an AVR or network player — source contains AVR commands (zones, surround, video)"
verification:
  verdict: verified
  checked_at: 2026-10-01T08:34:48.149Z
  matched_actions: 206
  action_count: 206
  confidence: medium
  summary: "All 206 spec actions verified against the Denon Ver.06 protocol reference; transport matches (RS-232C 9600/8N1 + TCP/23, ASCII+CR, half-duplex). (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Denon DNP2000 Series Control Spec

## Summary
Denon DNP2000 Series AV receiver controllable via RS-232C serial and TCP/IP (telnet). ASCII-based protocol with 2-character command codes, parameters, and CR terminator. Supports power, volume, input selection, surround modes, multi-zone, tuner, network/USB playback, video settings, and extensive audio parameter control.

<!-- UNRESOLVED: exact DNP2000 model variants not specified in source -->
<!-- UNRESOLVED: source appears to be a general Denon AVR protocol doc (Ver.06); applicability to specific DNP2000 models unconfirmed -->

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
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable    # inferred from PW ON/STANDBY commands
- queryable    # inferred from ? query commands on most command groups
- routable     # inferred from SI input selection and Z2/Z3 zone routing
- levelable    # inferred from MV, CV volume/bass/treble commands
```

## Actions
```yaml
# === Power ===
- id: power_on
  label: Power On
  kind: action
  command: PWON
  params: []
  notes: Wait 1 second before sending next command after PWON

- id: power_standby
  label: Power Standby
  kind: action
  command: PWSTANDBY
  params: []

# === Master Volume ===
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: MVUP
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: MVDOWN
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: MV**  # 00=MIN(---), 80=0dB, 98=+18dB; half-dB uses 3 chars e.g. 805=+0.5dB
  params:
    - name: level
      type: string
      description: "00-98 ASCII (80=0dB, 00=---), or 3-char half-dB step (e.g. 805)"

# === Mute ===
- id: mute_on
  label: Mute On
  kind: action
  command: MUON
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: MUOFF
  params: []

# === Input Select ===
- id: select_input
  label: Select Input Source
  kind: action
  command: SI***
  params:
    - name: source
      type: enum
      description: "Input source name"
      values:
        - PHONO
        - CD
        - TUNER
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - HDRADIO
        - NET
        - PANDORA
        - SIRIUSXM
        - SPOTIFY
        - LASTFM
        - FLICKR
        - IRADIO
        - SERVER
        - FAVORITES
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - BT
        - USB/IPOD
        - USB
        - IPD
        - IRP
        - FVP

# === Main Zone ===
- id: main_zone_on
  label: Main Zone On
  kind: action
  command: ZMON
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: ZMOFF
  params: []

# === Input Mode ===
- id: input_mode_set
  label: Set Input Mode
  kind: action
  command: SD***
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN", NO]

# === Digital Input Mode ===
- id: digital_input_mode_set
  label: Set Digital Input Mode
  kind: action
  command: DC***
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]

# === Surround Mode ===
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  command: MS***
  params:
    - name: mode
      type: enum
      values:
        - MOVIE
        - MUSIC
        - GAME
        - DIRECT
        - "PURE DIRECT"
        - STEREO
        - AUTO
        - "DOLBY DIGITAL"
        - "DTS SURROUND"
        - AURO3D
        - AURO2DSURR
        - "MCH STEREO"
        - "WIDE SCREEN"
        - "SUPER STADIUM"
        - "ROCK ARENA"
        - "JAZZ CLUB"
        - "CLASSIC CONCERT"
        - "MONO MOVIE"
        - MATRIX
        - "VIDEO GAME"
        - VIRTUAL
        - LEFT
        - RIGHT

# === Channel Volume ===
# CV commands cover: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB,
# FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR,
# FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: CV{ch} UP
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      description: Speaker channel abbreviation

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: CV{ch} DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  command: CV{ch} **
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  command: CVZRL
  params: []

# === Video Select ===
- id: video_select_set
  label: Set Video Select Source
  kind: action
  command: SV***
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, "SAT/CBL", MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]

# === Sleep Timer ===
- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  command: SLP***
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 ASCII (010=10min)"

# === Auto Standby ===
- id: auto_standby_set
  label: Set Auto Standby
  kind: action
  command: STBY***
  params:
    - name: timeout
      type: enum
      values: ["15M", "30M", "60M", OFF]

# === ECO Mode ===
- id: eco_mode_set
  label: Set ECO Mode
  kind: action
  command: ECO***
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]

# === Tone Control ===
- id: tone_control_set
  label: Set Tone Control
  kind: action
  command: PSTONE CTRL ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: bass_up
  label: Bass Up
  kind: action
  command: PSBAS UP
  params: []

- id: bass_down
  label: Bass Down
  kind: action
  command: PSBAS DOWN
  params: []

- id: bass_set
  label: Bass Set
  kind: action
  command: PSBAS **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-6 to +6 = 44 to 56)"

- id: treble_up
  label: Treble Up
  kind: action
  command: PSTRE UP
  params: []

- id: treble_down
  label: Treble Down
  kind: action
  command: PSTRE DOWN
  params: []

- id: treble_set
  label: Treble Set
  kind: action
  command: PSTRE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-6 to +6 = 44 to 56)"

# === Quick Select ===
- id: quick_select
  label: Quick Select Mode
  kind: action
  command: MSQUICK*
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

- id: quick_select_memory
  label: Quick Select Memory
  kind: action
  command: MSQUICK* MEMORY
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

# === Video Settings ===
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  command: VSASP***
  params:
    - name: mode
      type: enum
      values: [ASPNRM, ASPFUL]

- id: monitor_select
  label: Select HDMI Monitor
  kind: action
  command: VSMONI***
  params:
    - name: output
      type: enum
      values: [MONIAUTO, MONI1, MONI2]

- id: resolution_set
  kind: action
  label: Set Resolution
  command: VSSC***
  params:
    - name: resolution
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]

- id: hdmi_resolution_set
  label: Set HDMI Resolution
  kind: action
  command: VSSCH***
  params:
    - name: resolution
      type: enum
      values: [SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO]

- id: hdmi_audio_output_set
  label: Set HDMI Audio Output
  kind: action
  command: VSAUDIO ***
  params:
    - name: output
      type: enum
      values: [AMP, TV]

- id: video_processing_mode_set
  label: Set Video Processing Mode
  kind: action
  command: VSVPM***
  params:
    - name: mode
      type: enum
      values: [VPMAUTO, VPMGAME, VPMMOVI]

- id: vertical_stretch_set
  label: Set Vertical Stretch
  kind: action
  command: VSVST ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

# === Audyssey / EQ Parameters ===
- id: multeq_set
  label: Set MultEQ Mode
  kind: action
  command: PSMULTEQ:***
  params:
    - name: mode
      type: enum
      values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]

- id: dynamic_eq_set
  label: Set Dynamic EQ
  kind: action
  command: PSDYNEQ ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: ref_level_offset_set
  label: Set Reference Level Offset
  kind: action
  command: PSREFLEV ***
  params:
    - name: offset
      type: enum
      values: ["0", "5", "10", "15"]

- id: dynamic_volume_set
  label: Set Dynamic Volume
  kind: action
  command: PSDYNVOL ***
  params:
    - name: mode
      type: enum
      values: [HEV, MED, LIT, OFF]

- id: cinema_eq_set
  label: Set Cinema EQ
  kind: action
  command: PSCINEMA EQ.***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: drc_set
  label: Set Dynamic Compression
  kind: action
  command: PSDRC ***
  params:
    - name: mode
      type: enum
      values: [AUTO, LOW, MID, HI, OFF]

- id: graphic_eq_set
  label: Set Graphic EQ
  kind: action
  command: PSGEQ ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: loudness_management_set
  label: Set Loudness Management
  kind: action
  command: PSLOM ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: lfc_set
  label: Set Audyssey LFC
  kind: action
  command: PSLFC ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  command: PSCNTAMT UP
  params: []

- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  command: PSCNTAMT DOWN
  params: []

- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  command: PSCNTAMT **
  params:
    - name: level
      type: string
      description: "00-99 ASCII (01-07 operational range)"

# === Subwoofer Level ===
- id: subwoofer_level_adjust_on
  label: Subwoofer Level Adjust On
  kind: action
  command: PSSWL ON
  params: []

- id: subwoofer_level_adjust_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: PSSWL OFF
  params: []

- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  command: PSSWL UP
  params: []

- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  command: PSSWL DOWN
  params: []

- id: subwoofer_level_set
  label: Subwoofer Level Set
  kind: action
  command: PSSWL **
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"

- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  command: PSSWL2 UP
  params: []

- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  command: PSSWL2 DOWN
  params: []

- id: subwoofer2_level_set
  label: Subwoofer 2 Level Set
  kind: action
  command: PSSWL2 **
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"

# === Dialog Level ===
- id: dialog_level_adjust_set
  label: Set Dialog Level Adjust
  kind: action
  command: PSDIL ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  command: PSDIL UP
  params: []

- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  command: PSDIL DOWN
  params: []

- id: dialog_level_set
  label: Dialog Level Set
  kind: action
  command: PSDIL **
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

# === Speaker Configuration ===
- id: speaker_output_set
  label: Set Speaker Output Configuration
  kind: action
  command: PSSP:***
  params:
    - name: config
      type: enum
      values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]

- id: front_speaker_set
  label: Set Front Speaker
  kind: action
  command: PSFRONT ***
  params:
    - name: config
      type: enum
      values: [SPA, SPB, "A+B"]

# === Effect / Room Size ===
- id: effect_on
  label: Effect On
  kind: action
  command: PSEFF ON
  params: []

- id: effect_off
  label: Effect Off
  kind: action
  command: PSEFF OFF
  params: []

- id: effect_level_set
  label: Effect Level Set
  kind: action
  command: PSEFF **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB (1-15 operational range)"

- id: room_size_set
  label: Set Room Size
  kind: action
  command: PSRSZ ***
  params:
    - name: size
      type: enum
      values: [S, MS, M, ML, L]

- id: audio_delay_up
  label: Audio Delay Up
  kind: action
  command: PSDELAY UP
  params: []

- id: audio_delay_down
  label: Audio Delay Down
  kind: action
  command: PSDELAY DOWN
  params: []

- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  command: PSDELAY***
  params:
    - name: delay
      type: string
      description: "000-999 ASCII, 000=0ms, 200=200ms (0-200ms range)"

# === LFE ===
- id: lfe_level_up
  label: LFE Level Up
  kind: action
  command: PSLFE UP
  params: []

- id: lfe_level_down
  label: LFE Level Down
  kind: action
  command: PSLFE DOWN
  params: []

- id: lfe_level_set
  label: LFE Level Set
  kind: action
  command: PSLFE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB, 10=-10dB (0 to -10 range)"

# === Picture Mode ===
- id: picture_mode_set
  label: Set Picture Mode
  kind: action
  command: PV***
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

- id: contrast_up
  label: Contrast Up
  kind: action
  command: PVCN UP
  params: []

- id: contrast_down
  label: Contrast Down
  kind: action
  command: PVCN DOWN
  params: []

- id: contrast_set
  label: Contrast Set
  kind: action
  command: PVCN ***
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50 range)"

- id: brightness_up
  label: Brightness Up
  kind: action
  command: PVBR UP
  params: []

- id: brightness_down
  label: Brightness Down
  kind: action
  command: PVBR DOWN
  params: []

- id: brightness_set
  label: Brightness Set
  kind: action
  command: PVBR ***
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50 range)"

- id: saturation_up
  label: Saturation Up
  kind: action
  command: PVST UP
  params: []

- id: saturation_down
  label: Saturation Down
  kind: action
  command: PVST DOWN
  params: []

- id: saturation_set
  label: Saturation Set
  kind: action
  command: PVST ***
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50 range)"

- id: hue_up
  label: Hue Up
  kind: action
  command: PVHUE UP
  params: []

- id: hue_down
  label: Hue Down
  kind: action
  command: PVHUE DOWN
  params: []

- id: hue_set
  label: Hue Set
  kind: action
  command: PVHUE **
  params:
    - name: level
      type: string
      description: "44-56 ASCII, 50=0 (-6 to +6 range)"

- id: enhancer_up
  label: Enhancer Up
  kind: action
  command: PVENH UP
  params: []

- id: enhancer_down
  label: Enhancer Down
  kind: action
  command: PVENH DOWN
  params: []

- id: enhancer_set
  label: Enhancer Set
  kind: action
  command: PVENH ***
  params:
    - name: level
      type: string
      description: "00-12 ASCII (0-12 range)"

- id: dnr_set
  label: Set DNR
  kind: action
  command: PVDNR ***
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MID, HI]

# === Zone 2 ===
- id: zone2_on
  label: Zone 2 On
  kind: action
  command: Z2ON
  params: []

- id: zone2_off
  label: Zone 2 Off
  kind: action
  command: Z2OFF
  params: []

- id: zone2_source_set
  label: Zone 2 Select Source
  kind: action
  command: Z2***
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]

- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: Z2UP
  params: []

- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: Z2DOWN
  params: []

- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: Z2**
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: Z2MUON
  params: []

- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: Z2MUOFF
  params: []

- id: zone2_channel_setting_set
  label: Zone 2 Channel Setting
  kind: action
  command: Z2CS***
  params:
    - name: mode
      type: enum
      values: [ST, MONO]

- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  command: Z2CV{ch} UP
  params:
    - name: channel
      type: enum
      values: [FL, FR]

- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  command: Z2CV{ch} DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR]

- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  command: Z2CV{ch} **
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: zone2_hpf_set
  label: Zone 2 HPF On/Off
  kind: action
  command: Z2HPF***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: zone2_bass_up
  label: Zone 2 Bass Up
  kind: action
  command: Z2PSBAS UP
  params: []

- id: zone2_bass_down
  label: Zone 2 Bass Down
  kind: action
  command: Z2PSBAS DOWN
  params: []

- id: zone2_bass_set
  label: Zone 2 Bass Set
  kind: action
  command: Z2PSBAS **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-10 to +10 = 40 to 60)"

- id: zone2_treble_up
  label: Zone 2 Treble Up
  kind: action
  command: Z2PSTRE UP
  params: []

- id: zone2_treble_down
  label: Zone 2 Treble Down
  kind: action
  command: Z2PSTRE DOWN
  params: []

- id: zone2_treble_set
  label: Zone 2 Treble Set
  kind: action
  command: Z2PSTRE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-10 to +10 = 40 to 60)"

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Output
  kind: action
  command: Z2HDA ***
  params:
    - name: mode
      type: enum
      values: [THR, PCM]

- id: zone2_sleep_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: Z2SLP***
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 ASCII"

- id: zone2_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  command: Z2STBY***
  params:
    - name: timeout
      type: enum
      values: [2H, 4H, 8H, OFF]

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: Z2QUICK*
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

- id: zone2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  command: Z2QUICK* MEMORY
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

# === Zone 3 ===
- id: zone3_on
  label: Zone 3 On
  kind: action
  command: Z3ON
  params: []

- id: zone3_off
  label: Zone 3 Off
  kind: action
  command: Z3OFF
  params: []

- id: zone3_source_set
  label: Zone 3 Select Source
  kind: action
  command: Z3***
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]

- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: Z3UP
  params: []

- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: Z3DOWN
  params: []

- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  command: Z3**
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=---(MIN)"

- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: Z3MUON
  params: []

- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: Z3MUOFF
  params: []

- id: zone3_channel_setting_set
  label: Zone 3 Channel Setting
  kind: action
  command: Z3CS***
  params:
    - name: mode
      type: enum
      values: [ST, MONO]

- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  command: Z3CV{ch} UP
  params:
    - name: channel
      type: enum
      values: [FL, FR]

- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  command: Z3CV{ch} DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR]

- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  command: Z3CV{ch} **
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: zone3_hpf_set
  label: Zone 3 HPF On/Off
  kind: action
  command: Z3HPF***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: zone3_bass_up
  label: Zone 3 Bass Up
  kind: action
  command: Z3PSBAS UP
  params: []

- id: zone3_bass_down
  label: Zone 3 Bass Down
  kind: action
  command: Z3PSBAS DOWN
  params: []

- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  command: Z3PSBAS **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-10 to +10 = 40 to 60)"

- id: zone3_treble_up
  label: Zone 3 Treble Up
  kind: action
  command: Z3PSTRE UP
  params: []

- id: zone3_treble_down
  label: Zone 3 Treble Down
  kind: action
  command: Z3PSTRE DOWN
  params: []

- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  command: Z3PSTRE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB (-10 to +10 = 40 to 60)"

- id: zone3_sleep_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: Z3SLP***
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 ASCII"

- id: zone3_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  command: Z3STBY***
  params:
    - name: timeout
      type: enum
      values: [2H, 4H, 8H, OFF]

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: Z3QUICK*
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

- id: zone3_quick_memory
  label: Zone 3 Quick Select Memory
  kind: action
  command: Z3QUICK* MEMORY
  params:
    - name: preset
      type: enum
      values: [QUICK1, QUICK2, QUICK3, QUICK4, QUICK5]

# === Tuner ===
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  command: TFANUP
  params: []

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  command: TFANDOWN
  params: []

- id: tuner_frequency_set
  label: Tuner Set Frequency
  kind: action
  command: TFAN******
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII; <050000=FM MHz, >050000=AM kHz"

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  command: TPANUP
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  command: TPANDOWN
  params: []

- id: tuner_preset_set
  label: Tuner Set Preset
  kind: action
  command: TPAN**
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: TPANMEM
  params: []

- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: TMANAM
  params: []

- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: TMANFM
  params: []

- id: tuner_mode_auto
  label: Tuner Mode Auto
  kind: action
  command: TMANAUTO
  params: []

- id: tuner_mode_manual
  label: Tuner Mode Manual
  kind: action
  command: TMANMANUAL
  params: []

# === Network/USB/iPod/Bluetooth ===
- id: ns_cursor_up
  label: Network Cursor Up
  kind: action
  command: NS90
  params: []

- id: ns_cursor_down
  label: Network Cursor Down
  kind: action
  command: NS91
  params: []

- id: ns_cursor_left
  label: Network Cursor Left
  kind: action
  command: NS92
  params: []

- id: ns_cursor_right
  label: Network Cursor Right
  kind: action
  command: NS93
  params: []

- id: ns_enter
  label: Network Enter (Play/Pause)
  kind: action
  command: NS94
  params: []

- id: ns_play
  label: Network Play
  kind: action
  command: NS9A
  params: []

- id: ns_pause
  label: Network Pause
  kind: action
  command: NS9B
  params: []

- id: ns_stop
  label: Network Stop
  kind: action
  command: NS9C
  params: []

- id: ns_skip_plus
  label: Network Skip Forward
  kind: action
  command: NS9D
  params: []

- id: ns_skip_minus
  label: Network Skip Backward
  kind: action
  command: NS9E
  params: []

- id: ns_search_plus
  label: Network Search Forward
  kind: action
  command: NS9F
  params: []

- id: ns_search_minus
  label: Network Search Backward
  kind: action
  command: NS9G
  params: []

- id: ns_repeat_one
  label: Network Repeat One
  kind: action
  command: NS9H
  params: []

- id: ns_repeat_all
  label: Network Repeat All
  kind: action
  command: NS9I
  params: []

- id: ns_repeat_off
  label: Network Repeat Off
  kind: action
  command: NS9J
  params: []

- id: ns_random_on
  label: Network Random On
  kind: action
  command: NS9K
  params: []

- id: ns_random_off
  label: Network Random Off
  kind: action
  command: NS9M
  params: []

- id: ns_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  command: NSRPT
  params: []

- id: ns_random_toggle
  label: Network Random Toggle
  kind: action
  command: NSRND
  params: []

- id: ns_preset_call
  label: Network Preset Call
  kind: action
  command: NSB**
  params:
    - name: preset
      type: string
      description: "00-35 ASCII (2014 AVR range)"

- id: ns_preset_memory
  label: Network Preset Memory
  kind: action
  command: NSC**
  params:
    - name: preset
      type: string
      description: "00-35 ASCII (2014 AVR range)"

- id: ns_favorites_add
  label: Network Add Favorites Folder
  kind: action
  command: NSFV MEM
  params: []

- id: ns_page_next
  label: Network Page Next
  kind: action
  command: NS9X
  params: []

- id: ns_page_previous
  label: Network Page Previous
  kind: action
  command: NS9Y
  params: []

- id: ns_search_stop
  label: Network Search Stop
  kind: action
  command: NS9Z
  params: []

- id: ns_ipod_mode_toggle
  label: Network iPod Mode Toggle
  kind: action
  command: NS9W
  params: []

# === System Control ===
- id: setup_menu_on
  label: Setup Menu On
  kind: action
  command: MNMEN ON
  params: []

- id: setup_menu_off
  label: Setup Menu Off
  kind: action
  command: MNMEN OFF
  params: []

- id: menu_cursor_up
  label: Menu Cursor Up
  kind: action
  command: MNCUP
  params: []

- id: menu_cursor_down
  label: Menu Cursor Down
  kind: action
  command: MNCDN
  params: []

- id: menu_cursor_left
  label: Menu Cursor Left
  kind: action
  command: MNCLT
  params: []

- id: menu_cursor_right
  label: Menu Cursor Right
  kind: action
  command: MNCRT
  params: []

- id: menu_enter
  label: Menu Enter
  kind: action
  command: MNENT
  params: []

- id: menu_return
  label: Menu Return
  kind: action
  command: MNRTN
  params: []

- id: menu_option
  label: Menu Option
  kind: action
  command: MNOPT
  params: []

- id: menu_info
  label: Menu Info
  kind: action
  command: MNINF
  params: []

- id: channel_level_menu_toggle
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: MNCHL
  params: []

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: MNZST ON
  params: []

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: MNZST OFF
  params: []

# === Lock Control ===
- id: remote_lock_on
  label: Remote Lock On
  kind: action
  command: SYREMOTE LOCK ON
  params: []

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  command: SYREMOTE LOCK OFF
  params: []

- id: panel_lock_on
  label: Panel Lock On (except master vol)
  kind: action
  command: SYPANEL LOCK ON
  params: []

- id: panel_vol_lock_on
  label: Panel and Volume Lock On
  kind: action
  command: SYPANEL+V LOCK ON
  params: []

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  command: SYPANEL LOCK OFF
  params: []

# === Trigger ===
- id: trigger1_on
  label: Trigger 1 On
  kind: action
  command: TR1 ON
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  command: TR1 OFF
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  command: TR2 ON
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  command: TR2 OFF
  params: []

# === Dimmer ===
- id: dimmer_set
  label: Set Dimmer
  kind: action
  command: DIM ***
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]

# === Remote Maintenance ===
- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  command: RM STA
  params: []

- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  command: RM END
  params: []

# === Additional PS commands (misc) ===
- id: restorer_set
  label: Set Audio Restorer
  kind: action
  command: PSRSTR ***
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MED, HI]

- id: dialogue_enhancer_set
  label: Set Dialogue Enhancer
  kind: action
  command: PSDEH ***
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MED, HIGH]

- id: pl_mode_set
  label: Set PL2/PL2x/NEO Mode
  kind: action
  command: PSMODE:***
  params:
    - name: mode
      type: enum
      values: [MUSIC, CINEMA, GAME, "PRO LOGIC"]

- id: sw_on_off
  label: Subwoofer On/Off (Direct/Stereo 2ch)
  kind: action
  command: PSSWR ***
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  command: PSBSC UP
  params: []

- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  command: PSBSC DOWN
  params: []

- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  command: PSBSC **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0 (0-16 range)"

# UNRESOLVED: PL2z height gain (PHG), Audyssey DSX (DSX), stage width/height (STW/STH),
#   center width (CEN), center image (CEI), center gain (CEG), center spread (CES),
#   panorama (PAN), dimension (DIM), Auro-3D preset/strength (AUROPR/AUROST),
#   delay (DEL for surround), front height output (FH), LFE for EXT.IN (LFL),
#   InstaPrevue (PRV), upgrade ID (UG), record select (SR),
#   HD Radio commands, RDS station name query, network onscreen display (NSA/NSE)
#   - all present in source but abbreviated here for draft. Full expansion on verification.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  command: PW?
  response_prefix: PW

- id: master_volume
  type: string
  description: "00=MIN(---), 80=0dB, up to 98=+18dB; 3-char for half-dB"
  command: MV?
  response_prefix: MV

- id: mute_state
  type: enum
  values: [ON, OFF]
  command: MU?
  response_prefix: MU

- id: input_source
  type: string
  description: Current input source name
  command: SI?
  response_prefix: SI

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  command: ZM?
  response_prefix: ZM

- id: surround_mode
  type: string
  description: Current surround mode name
  command: MS?
  response_prefix: MS

- id: input_mode
  type: string
  description: Current input mode
  command: SD?
  response_prefix: SD

- id: digital_input_mode
  type: string
  description: Current digital input mode
  command: DC?
  response_prefix: DC

- id: video_select
  type: string
  description: Current video select state
  command: SV?
  response_prefix: SV

- id: channel_volume
  type: string
  description: "Channel levels for configured speakers, terminated with CVEND"
  command: CV?
  response_prefix: CV

- id: sleep_timer
  type: string
  description: "OFF or 001-120 minutes"
  command: SLP?
  response_prefix: SLP

- id: auto_standby
  type: string
  description: "15M, 30M, 60M, or OFF"
  command: STBY?
  response_prefix: STBY

- id: eco_mode
  type: string
  description: "ON, AUTO, or OFF"
  command: ECO?
  response_prefix: ECO

- id: zone2_state
  type: enum
  values: [ON, OFF]
  command: Z2?
  response_prefix: Z2

- id: zone2_volume
  type: string
  description: "00-98 ASCII, 80=0dB"
  command: Z2?  # returns via Z2** response
  response_prefix: Z2

- id: zone2_mute
  type: enum
  values: [ON, OFF]
  command: Z2MU?
  response_prefix: Z2MU

- id: zone3_state
  type: enum
  values: [ON, OFF]
  command: Z3?
  response_prefix: Z3

- id: zone3_volume
  type: string
  description: "00-98 ASCII, 80=0dB"
  command: Z3?
  response_prefix: Z3

- id: zone3_mute
  type: enum
  values: [ON, OFF]
  command: Z3MU?
  response_prefix: Z3MU

- id: tuner_frequency
  type: string
  description: "6-digit frequency; <050000=FM, >050000=AM"
  command: TFAN?
  response_prefix: TF

- id: tuner_preset
  type: string
  description: Preset number
  command: TPAN?
  response_prefix: TP

- id: trigger_state
  type: string
  description: "Returns TR1 and TR2 state"
  command: TR?
  response_prefix: TR

- id: dimmer_state
  type: string
  description: "BRI, DIM, DAR, OFF"
  command: DIM ?
  response_prefix: DIM

- id: setup_menu_state
  type: enum
  values: [ON, OFF]
  command: MNMEN?
  response_prefix: MNMEN

- id: all_zone_stereo_state
  type: enum
  values: [ON, OFF]
  command: MNZST?
  response_prefix: MNZST

- id: tone_control_state
  type: enum
  values: [ON, OFF]
  command: PSTONE CTRL ?
  response_prefix: PSTONE

- id: bass_level
  type: string
  description: "00-99 ASCII, 50=0dB"
  command: PSBAS ?
  response_prefix: PSBAS

- id: treble_level
  type: string
  description: "00-99 ASCII, 50=0dB"
  command: PSTRE ?
  response_prefix: PSTRE

- id: network_onscreen_ascii
  type: string
  description: "Multi-line ASCII onscreen display (NSA0-NSA8)"
  command: NSA
  response_prefix: NSA

- id: network_onscreen_utf8
  type: string
  description: "Multi-line UTF-8 onscreen display (NSE0-NSE8)"
  command: NSE
  response_prefix: NSE

- id: hd_radio_status
  type: string
  description: "Returns band, station name, multicast channel, signal level, artist, title, album, genre, mode"
  command: HD?
  response_prefix: HD

# UNRESOLVED: feedback responses for Audyssey params (MULTEQ, DYNEQ, DYNVOL, LFC, CNTAMT),
#   video params (aspect, monitor, resolution, HDMI audio, VPM, VST),
#   picture mode params (contrast, brightness, saturation, hue, enhancer, DNR),
#   speaker config (SP, FRONT), subwoofer level (SWL), dialog level (DIL),
#   zone2/zone3 channel setting, HPF, bass, treble, HDMI audio, sleep, standby,
#   tuner band/mode, quick select states, record select, favorite states
```

## Variables
```yaml
- id: master_volume_db
  type: string
  description: "Direct set: 00-98 (2-char) or 3-char half-dB (e.g. 805). 80=0dB, 00=---MIN"
  set_command: MV**
  query_command: MV?

- id: zone2_volume_db
  type: string
  description: "00-98 ASCII, 80=0dB, 00=---MIN"
  set_command: Z2**
  query_command: Z2?

- id: zone3_volume_db
  type: string
  description: "00-98 ASCII, 80=0dB, 00=---MIN"
  set_command: Z3**
  query_command: Z3?

- id: bass_level
  type: string
  description: "00-99 ASCII, 50=0dB (-6 to +6 = 44 to 56)"
  set_command: PSBAS **
  query_command: PSBAS ?

- id: treble_level
  type: string
  description: "00-99 ASCII, 50=0dB (-6 to +6 = 44 to 56)"
  set_command: PSTRE **
  query_command: PSTRE ?

- id: audio_delay
  type: string
  description: "000-999 ASCII ms, 000=0ms (0-200ms range)"
  set_command: PSDELAY***
  query_command: PSDELAY?

- id: lfe_level
  type: string
  description: "00-99 ASCII, 00=0dB, 10=-10dB (0 to -10)"
  set_command: PSLFE **
  query_command: PSLFE ?

- id: effect_level
  type: string
  description: "00-99 ASCII, 00=0dB (1-15 operational)"
  set_command: PSEFF **
  query_command: PSEFF ?

- id: contrast
  type: string
  description: "000-100 ASCII, 050=0 (-50 to +50)"
  set_command: PVCN ***
  query_command: PVCN ?

- id: brightness
  type: string
  description: "000-100 ASCII, 050=0 (-50 to +50)"
  set_command: PVBR ***
  query_command: PVBR ?

- id: saturation
  type: string
  description: "000-100 ASCII, 050=0 (-50 to +50)"
  set_command: PVST ***
  query_command: PVST ?

- id: hue
  type: string
  description: "44-56 ASCII, 50=0 (-6 to +6)"
  set_command: PVHUE **
  query_command: PVHUE ?

- id: enhancer
  type: string
  description: "00-12 ASCII (0-12 range)"
  set_command: PVENH ***
  query_command: PVENH ?

- id: containment_amount
  type: string
  description: "00-99 ASCII (01-07 operational)"
  set_command: PSCNTAMT **
  query_command: PSCNTAMT ?

- id: sleep_timer_minutes
  type: string
  description: "OFF or 001-120 ASCII"
  set_command: SLP***
  query_command: SLP?
```

## Events
```yaml
- id: state_change_event
  description: >
    Sent within 5 seconds when device state changes from front-panel or IR control.
    Same format as COMMAND. Covers: PW, MV, CV, MU, SI, ZM, MS, SR, SD, DC, SV,
    SLP, STBY, ECO, VS, PS, PV, Z2, Z3, TF, TP, TM, NS, TR, DIM, MN.
  format: "COMMAND+PARAMETER+CR (0x0D)"

- id: channel_volume_change_event
  description: >
    When input source changes, CHANNEL VOLUME for all active channels returns as EVENT.
    SURROUND MODE also returns if it changes. If unchanged, no EVENT for that parameter.

- id: surround_mode_preevent
  description: >
    When surround mode changes, current mode is returned BEFORE new mode EVENT.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after PWON before sending next command"
    source: "Source note J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
# UNRESOLVED: no other safety interlocks or power-on sequencing documented
```

## Notes
- All commands use ASCII encoding, 2-character command prefix + parameter + CR (0x0D).
- Commands must be sent at 50ms or greater intervals.
- Maximum communication data length: 135 bytes.
- Half-duplex communication on both serial and TCP.
- Response to query commands returned within 200ms.
- Events returned within 5 seconds of state change.
- Volume uses non-linear encoding: 00=MIN(---), 80=0dB, 98=+18dB. Half-dB steps use 3 ASCII characters (e.g. MV805 = +0.5dB).
- Channel volume range: 38-62 ASCII, 50=0dB.
- CV? query only returns speakers configured in current speaker setup, terminated with CVEND.
- When surround mode is set again to current mode, surround mode EVENT returns but channel volume does not.
- Some commands are region-specific (HDRADIO, PANDORA, SIRIUSXM, SPOTIFY — North America; LASTFM — select markets).
- Some commands are model-specific (noted with model ranges like X1100, S700, X4100 in source).
- Network preset range changed to 00-35 on 2014 AVR models (was 00-55).
- Auro-3D commands (AURO3D, AUROPR, AUROST, SHL, SHR, TS) require Auro-3D Upgrade option.

<!-- UNRESOLVED: exact DNP2000 model identifiers and firmware versions not stated -->
<!-- UNRESOLVED: which specific Denon AVR models this protocol doc covers (appears to span multiple model years) -->
<!-- UNRESOLVED: serial flow_control not explicitly stated in source (set to none as typical for Denon) -->
<!-- UNRESOLVED: TCP connection persistence / keepalive behavior not documented -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: whether DNP2000 is an AVR or network player — source contains AVR commands (zones, surround, video) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:06:39.318Z
last_checked_at: 2026-10-01T08:34:48.149Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T08:34:48.149Z
matched_actions: 206
action_count: 206
confidence: medium
summary: "All 206 spec actions verified against the Denon Ver.06 protocol reference; transport matches (RS-232C 9600/8N1 + TCP/23, ASCII+CR, half-duplex). (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact DNP2000 model variants not specified in source"
- "source appears to be a general Denon AVR protocol doc (Ver.06); applicability to specific DNP2000 models unconfirmed"
- "PL2z height gain (PHG), Audyssey DSX (DSX), stage width/height (STW/STH),"
- "feedback responses for Audyssey params (MULTEQ, DYNEQ, DYNVOL, LFC, CNTAMT),"
- "no explicit multi-step macros described in source"
- "no other safety interlocks or power-on sequencing documented"
- "exact DNP2000 model identifiers and firmware versions not stated"
- "which specific Denon AVR models this protocol doc covers (appears to span multiple model years)"
- "serial flow_control not explicitly stated in source (set to none as typical for Denon)"
- "TCP connection persistence / keepalive behavior not documented"
- "maximum concurrent TCP connections not stated"
- "whether DNP2000 is an AVR or network player — source contains AVR commands (zones, surround, video)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
