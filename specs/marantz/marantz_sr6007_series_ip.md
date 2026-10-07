---
spec_id: admin/marantz-sr6007-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR6007 Series Control Spec"
manufacturer: Marantz
model_family: SR6007
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR6007
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:19:33.374Z
last_checked_at: 2026-10-07T20:56:34.329Z
generated_at: 2026-10-07T20:56:34.329Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated"
  - "which specific models in the \"Series\" share this protocol"
  - "no distinct settable parameters beyond those covered in Actions"
  - "no multi-step sequences explicitly defined in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "exact model variants within SR6007 \"Series\" not specified"
  - "firmware version compatibility range not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:56:34.329Z
  matched_actions: 378
  action_count: 378
  confidence: medium
  summary: "All 378 action units match source commands with correct shapes and transport (TCP 23, 9600 8N1); only status or event-only tokens are unlisted; source never names SR6007. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR6007 Series Control Spec

## Summary
Marantz SR6007 Series AV Receiver with RS-232C and Ethernet (TCP port 23 telnet) control. ASCII-based command protocol using 2-character command codes with parameters terminated by carriage return. Supports multi-zone (Zone 2, Zone 3), surround mode selection, volume/channel level control, tuner, network/USB playback, and picture adjustment.

<!-- UNRESOLVED: exact firmware version compatibility not stated -->
<!-- UNRESOLVED: which specific models in the "Series" share this protocol -->

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
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
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
  command: MV**
  params:
    - name: level
      type: string
      description: "Two-digit ASCII 00-98 (80=0dB, 00=MIN). Three digits for 0.5dB steps e.g. 805=+0.5dB"

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: CV<channel> UP
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      description: Speaker channel identifier

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: CV<channel> DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
      description: Speaker channel identifier

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  command: CV<channel> **
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: channel_volume_reset
  label: Channel Volume Reset All
  kind: action
  command: CVZRL
  params: []

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

- id: select_input
  label: Select Input Source
  kind: action
  command: SI<source>
  params:
    - name: source
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]
      description: Input source name

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

- id: input_mode_set
  label: Input Mode Set
  kind: action
  command: SD<mode>
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, "7.1IN", NO]
      description: Input signal detection mode

- id: digital_input_set
  label: Digital Input Mode Set
  kind: action
  command: DC<mode>
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  command: MS<mode>
  params:
    - name: mode
      type: enum
      values: [MOVIE, MUSIC, GAME, DIRECT, "PURE DIRECT", STEREO, AUTO, "DOLBY DIGITAL", "DTS SURROUND", AURO3D, AURO2DSURR, "MCH STEREO", "WIDE SCREEN", "SUPER STADIUM", "ROCK ARENA", "JAZZ CLUB", "CLASSIC CONCERT", "MONO MOVIE", MATRIX, "VIDEO GAME", VIRTUAL, LEFT, RIGHT]
      description: Surround sound mode

- id: video_select_set
  label: Video Select Source
  kind: action
  command: SV<source>
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: SLP<value>
  params:
    - name: value
      type: string
      description: "OFF or 001-120 minutes by ASCII (010=10min)"

- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  command: STBY<value>
  params:
    - name: value
      type: enum
      values: [15M, 30M, 60M, OFF]

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: ECO<mode>
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]

- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  command: PSTONE CTRL <state>
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
      description: "00-99 ASCII, 50=0dB (AVR range 44-56 = -6 to +6)"

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
      description: "00-99 ASCII, 50=0dB (AVR range 44-56 = -6 to +6)"

- id: dynamic_eq_set
  label: Dynamic EQ Set
  kind: action
  command: PSDYNEQ <state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  command: PSDYNVOL <mode>
  params:
    - name: mode
      type: enum
      values: [HEV, MED, LIT, OFF]

- id: multeq_set
  label: MultEQ Mode Set
  kind: action
  command: PSMULTEQ:<mode>
  params:
    - name: mode
      type: enum
      values: [AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF]

- id: cinema_eq_set
  label: Cinema EQ Set
  kind: action
  command: PSCINEMA EQ.<state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: drc_set
  label: Dynamic Compression Set
  kind: action
  command: PSDRC <mode>
  params:
    - name: mode
      type: enum
      values: [AUTO, LOW, MID, HI, OFF]

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
    - name: delay_ms
      type: string
      description: "000-999 ASCII, 000=0ms, 200=200ms (0-200ms range)"

- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  command: PSSWL ON
  params: []

- id: subwoofer_level_off
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
      description: "00,38-62 ASCII, 50=0dB"

- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  command: VSASP<mode>
  params:
    - name: mode
      type: enum
      values: [NRM, FUL]

- id: hdmi_monitor_set
  label: HDMI Monitor Set
  kind: action
  command: VSMONI<output>
  params:
    - name: output
      type: enum
      values: [AUTO, "1", "2"]

- id: resolution_set
  kind: action
  label: Resolution Set
  command: VSSC<value>
  params:
    - name: value
      type: enum
      values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

- id: hdmi_resolution_set
  kind: action
  label: HDMI Resolution Set
  command: VSSCH<value>
  params:
    - name: value
      type: enum
      values: [48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO]

- id: hdmi_audio_output_set
  label: HDMI Audio Output Set
  kind: action
  command: VSAUDIO <output>
  params:
    - name: output
      type: enum
      values: [AMP, TV]

- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  command: VSVPM<mode>
  params:
    - name: mode
      type: enum
      values: [AUTO, GAME, MOVI]

- id: vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  command: VSVST <state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: PV<mode>
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]

- id: contrast_set
  label: Contrast Set
  kind: action
  command: PVCN ***
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50)"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: PVBR ***
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50)"

- id: saturation_set
  label: Saturation Set
  kind: action
  command: PVST ***
  params:
    - name: value
      type: string
      description: "000-100 ASCII, 050=0 (-50 to +50)"

- id: hue_set
  label: Hue Set
  kind: action
  command: PVHUE **
  params:
    - name: value
      type: string
      description: "44-56 ASCII, 50=0 (-6 to +6)"

- id: dnr_set
  label: DNR Set
  kind: action
  command: PVDNR <mode>
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MID, HI]

- id: enhancer_set
  label: Enhancer Set
  kind: action
  command: PVENH **
  params:
    - name: value
      type: string
      description: "00-12 ASCII, 00=0 (0 to 12)"

- id: zone2_source_set
  label: Zone 2 Source Set
  kind: action
  command: Z2<source>
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

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
      description: "00-98 ASCII, 80=0dB, 00=MIN"

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

- id: zone2_channel_set
  label: Zone 2 Channel Setting
  kind: action
  command: Z2CS<mode>
  params:
    - name: mode
      type: enum
      values: [ST, MONO]

- id: zone2_hpf_set
  label: Zone 2 HPF Set
  kind: action
  command: Z2HPF<state>
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
      description: "00-99 ASCII, 50=0dB (range 40-60)"

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
      description: "00-99 ASCII, 50=0dB (range 40-60)"

- id: zone2_sleep_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: Z2SLP<value>
  params:
    - name: value
      type: string
      description: "OFF or 001-120 minutes"

- id: zone2_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  command: Z2STBY<value>
  params:
    - name: value
      type: enum
      values: ["2H", "4H", "8H", OFF]

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Set
  kind: action
  command: Z2HDA <mode>
  params:
    - name: mode
      type: enum
      values: [THR, PCM]

- id: zone3_source_set
  label: Zone 3 Source Set
  kind: action
  command: Z3<source>
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP]

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
      description: "00-98 ASCII, 80=0dB, 00=MIN"

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

- id: zone3_channel_set
  label: Zone 3 Channel Setting
  kind: action
  command: Z3CS<mode>
  params:
    - name: mode
      type: enum
      values: [ST, MONO]

- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  command: Z3PSBAS **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB"

- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  command: Z3PSTRE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB"

- id: zone3_sleep_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: Z3SLP<value>
  params:
    - name: value
      type: string
      description: "OFF or 001-120 minutes"

- id: zone3_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  command: Z3STBY<value>
  params:
    - name: value
      type: enum
      values: ["2H", "4H", "8H", OFF]

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
  label: Tuner Frequency Set
  kind: action
  command: TFAN******
  params:
    - name: frequency
      type: string
      description: "6-digit ASCII. >050000=AM kHz, <050000=FM MHz"

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

- id: tuner_preset_call
  label: Tuner Preset Call
  kind: action
  command: TPAN**
  params:
    - name: preset
      type: string
      description: "01-56"

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: TPANMEM**
  params:
    - name: preset
      type: string
      description: "01-56"

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  command: TMAN<band>
  params:
    - name: band
      type: enum
      values: [AM, FM]

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  command: TMAN<mode>
  params:
    - name: mode
      type: enum
      values: [AUTO, MANUAL]

- id: network_cursor_up
  label: Network Cursor Up
  kind: action
  command: NS90
  params: []

- id: network_cursor_down
  label: Network Cursor Down
  kind: action
  command: NS91
  params: []

- id: network_cursor_left
  label: Network Cursor Left
  kind: action
  command: NS92
  params: []

- id: network_cursor_right
  label: Network Cursor Right
  kind: action
  command: NS93
  params: []

- id: network_enter
  label: Network Enter
  kind: action
  command: NS94
  params: []

- id: network_play
  label: Network Play
  kind: action
  command: NS9A
  params: []

- id: network_pause
  label: Network Pause
  kind: action
  command: NS9B
  params: []

- id: network_stop
  label: Network Stop
  kind: action
  command: NS9C
  params: []

- id: network_skip_plus
  label: Network Skip Forward
  kind: action
  command: NS9D
  params: []

- id: network_skip_minus
  label: Network Skip Back
  kind: action
  command: NS9E
  params: []

- id: network_search_plus
  label: Network Search Forward
  kind: action
  command: NS9F
  params: []

- id: network_search_minus
  label: Network Search Back
  kind: action
  command: NS9G
  params: []

- id: network_repeat_one
  label: Network Repeat One
  kind: action
  command: NS9H
  params: []

- id: network_repeat_all
  label: Network Repeat All
  kind: action
  command: NS9I
  params: []

- id: network_repeat_off
  label: Network Repeat Off
  kind: action
  command: NS9J
  params: []

- id: network_random_on
  label: Network Random On
  kind: action
  command: NS9K
  params: []

- id: network_random_off
  label: Network Random Off
  kind: action
  command: NS9M
  params: []

- id: network_preset_call
  label: Network Preset Call
  kind: action
  command: NSB**
  params:
    - name: preset
      type: string
      description: "00-35"

- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  command: NSC**
  params:
    - name: preset
      type: string
      description: "00-35"

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
  label: Panel Lock On
  kind: action
  command: SYPANEL LOCK ON
  params: []

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  command: SYPANEL LOCK OFF
  params: []

- id: panel_vol_lock_on
  label: Panel + Volume Lock On
  kind: action
  command: SYPANEL+V LOCK ON
  params: []

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

- id: dimmer_set
  label: Dimmer Set
  kind: action
  command: DIM <level>
  params:
    - name: level
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
      description: "SEL = toggle through Bright→Dim→Dark→Off"

- id: rec_select_set
  label: REC Select Source
  kind: action
  command: SR<source>
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, NET, IRADIO, SERVER, FAVORITES, USB/IPOD, USB, IPD]

- id: quick_select
  label: Quick Select
  kind: action
  command: MSQUICK<n>
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]

- id: quick_select_memory
  label: Quick Select Memory
  kind: action
  command: MSQUICK<n> MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]

- id: lfe_set
  label: LFE Level Set
  kind: action
  command: PSLFE **
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 00=0dB, 10=-10dB (0 to -10)"

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
      description: "00-99 ASCII, 00=0dB (1-15 range)"

- id: room_size_set
  label: Room Size Set
  kind: action
  command: PSRSZ <size>
  params:
    - name: size
      type: enum
      values: [S, MS, M, ML, L]

- id: restorer_set
  label: Audio Restorer Set
  kind: action
  command: PSRSTR <mode>
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MED, HI]

- id: front_speaker_set
  label: Front Speaker Set
  kind: action
  command: PSFRONT <config>
  params:
    - name: config
      type: enum
      values: [SPA, SPB, "A+B"]

- id: lfc_set
  label: Audyssey LFC Set
  kind: action
  command: PSLFC <state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  command: PSCNTAMT **
  params:
    - name: amount
      type: string
      description: "00-99 ASCII (01-07 range)"

- id: ref_level_offset_set
  label: Reference Level Offset Set
  kind: action
  command: PSREFLEV <value>
  params:
    - name: value
      type: enum
      values: ["0", "5", "10", "15"]
      description: Offset in dB

- id: loudness_set
  label: Loudness Management Set
  kind: action
  command: PSLOM <state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  command: PSGEQ <state>
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  command: ZMFAVORITE1
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the trailing 1 in the documented command with preset.

- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: ZMFAVORITE1 MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the 1 following FAVORITE with preset; retain the space before MEMORY.

- id: rec_select_additional_source_set
  label: REC Select Additional Source Set
  kind: action
  command: SRIPOD
  params:
    - name: source
      type: enum
      values: [IPOD, "USB DIRECT", "IPOD DIRECT"]
  notes: Replace IPOD after SR with source.

- id: zone2_direct_source_set
  label: Zone 2 Direct Source Set
  kind: action
  command: Z2USB DIRECT
  params:
    - name: source
      type: enum
      values: ["USB DIRECT", "IPOD DIRECT"]
  notes: Replace USB DIRECT after Z2 with source.

- id: surround_mode_variant_set
  label: Surround Mode Variant Set
  kind: action
  command: MSDSD DIRECT
  params:
    - name: mode
      type: enum
      values: ["DSD DIRECT", "DSD PURE DIRECT", "DOLBY PRO LOGIC", "DOLBY PL2 C", "DOLBY PL2 M", "DOLBY PL2 G", "DOLBY PL2X C", "DOLBY PL2X M", "DOLBY PL2X G", "DOLBY PL2Z H", "DOLBY SURROUND", "DOLBY ATMOS", "DOLBY D EX", "DOLBY D+PL2X C", "DOLBY D+PL2X M", "DOLBY D+PL2Z H", "DOLBY D+DS", "DOLBY D+NEO:X C", "DOLBY D+NEO:X M", "DOLBY D+NEO:X G", "DTS ES DSCRT6.1", "DTS ES MTRX6.1", "DTS+PL2X C", "DTS+PL2X M", "DTS+PL2Z H", "DTS+DS", "DTS96/24", "DTS96 ES MTRX", "DTS+NEO:6", "DTS+NEO:X C", "DTS+NEO:X M", "DTS+NEO:X G", "MULTI CH IN", "M CH IN+DOLBY EX", "M CH IN+PL2X C", "M CH IN+PL2X M", "M CH IN+PL2Z H", "M CH IN+DS", "MULTI CH IN 7.1", "M CH IN+NEO:X C", "M CH IN+NEO:X M", "M CH IN+NEO:X G", "DOLBY D+", "DOLBY D+ +EX", "DOLBY D+ +PL2X C", "DOLBY D+ +PL2X M", "DOLBY D+ +PL2Z H", "DOLBY D+ +DS", "DOLBY D+ +NEO:X C", "DOLBY D+ +NEO:X M", "DOLBY D+ +NEO:X G", "DOLBY HD", "DOLBY HD+EX", "DOLBY HD+PL2X C", "DOLBY HD+PL2X M", "DOLBY HD+PL2Z H", "DOLBY HD+DS", "DOLBY HD+NEO:X C", "DOLBY HD+NEO:X M", "DOLBY HD+NEO:X G", "DTS HD", "DTS HD MSTR", "DTS HD+PL2X C", "DTS HD+PL2X M", "DTS HD+PL2Z H", "DTS HD+DS", "DTS HD+NEO:6", "DTS HD+NEO:X C", "DTS HD+NEO:X M", "DTS HD+NEO:X G", "DTS EXPRESS", "DTS ES 8CH DSCRT", "MPEG2 AAC", "AAC+DOLBY EX", "AAC+PL2X C", "AAC+PL2X M", "AAC+PL2Z H", "AAC+DS", "AAC+NEO:X C", "AAC+NEO:X M", "AAC+NEO:X G", "PL DSX", "PL2 C DSX", "PL2 M DSX", "PL2 G DSX", "AUDYSSEY DSX", "DTS NEO:6 C", "DTS NEO:6 M", "DTS NEO:X C", "DTS NEO:X M", "DTS NEO:X G"]
  notes: Replace DSD DIRECT after MS with mode. Model availability follows the source table.

- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  command: PSDIL ON
  params: []

- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  command: PSDIL OFF
  params: []

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
  command: PSDIL 50
  params:
    - name: level
      type: string
      description: "**:38 to 62 by ASCII , 50=0dB"
  notes: Replace 50 with level.

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
  command: PSSWL2 50
  params:
    - name: level
      type: string
      description: "**:00,38 to 62 by ASCII , 50=0dB"
  notes: Replace 50 with level.

- id: surround_parameter_mode_set
  label: Surround Parameter Mode Set
  kind: action
  command: PSMODE:MUSIC
  params:
    - name: mode
      type: enum
      values: [MUSIC, CINEMA, GAME, "PRO LOGIC"]
  notes: Replace MUSIC after the colon with mode. This parameter can change DOLBY PL2, PL2x and NEO:6 mode; GAME can change DOLBY PL2 and PL2x; PRO LOGIC can change only DOLBY PL2. HEIGHT is EVENT only.

- id: front_height_on
  label: Front Height Output On
  kind: action
  command: PSFH:ON
  params: []

- id: front_height_off
  label: Front Height Output Off
  kind: action
  command: PSFH:OFF
  params: []

- id: speaker_output_set
  label: Speaker Output Set
  kind: action
  command: PSSP:FW
  params:
    - name: output
      type: enum
      values: [FW, FH, SB, HW, BH, BW, FL, HF, FR]
  notes: Replace FW after the colon with output.

- id: height_gain_set
  label: PL2z Height Gain Set
  kind: action
  command: PSPHG LOW
  params:
    - name: level
      type: enum
      values: [LOW, MID, HI]
  notes: Replace LOW with level.

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

- id: audyssey_dsx_set
  label: Audyssey DSX Set
  kind: action
  command: PSDSX ONHW
  params:
    - name: mode
      type: enum
      values: [ONHW, ONH, ONW, OFF]
  notes: Replace ONHW with mode.

- id: stage_width_up
  label: Stage Width Up
  kind: action
  command: PSSTW UP
  params: []

- id: stage_width_down
  label: Stage Width Down
  kind: action
  command: PSSTW DOWN
  params: []

- id: stage_width_set
  label: Stage Width Set
  kind: action
  command: PSSTW 50
  params:
    - name: level
      type: string
      description: "**:00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  notes: Replace 50 with level.

- id: stage_height_up
  label: Stage Height Up
  kind: action
  command: PSSTH UP
  params: []

- id: stage_height_down
  label: Stage Height Down
  kind: action
  command: PSSTH DOWN
  params: []

- id: stage_height_set
  label: Stage Height Set
  kind: action
  command: PSSTH 50
  params:
    - name: level
      type: string
      description: "**:00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  notes: Replace 50 with level.

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
  command: PSBSC 10
  params:
    - name: level
      type: string
      description: "**:00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 16"
  notes: Replace 10 with level.

- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  command: PSDEH OFF
  params:
    - name: mode
      type: enum
      values: [OFF, LOW, MED, HIGH]
  notes: Replace OFF with mode.

- id: lfe_up
  label: LFE Level Up
  kind: action
  command: PSLEE UP
  params: []
  notes: The source labels this parameter LFE UP but prints the command example as PSLEE UP; the literal example is preserved.

- id: lfe_down
  label: LFE Level Down
  kind: action
  command: PSLFE DOWN
  params: []

- id: external_input_lfe_set
  label: External Input LFE Level Set
  kind: action
  command: PSLFL 00
  params:
    - name: level
      type: enum
      values: ["00", "05", "10", "15"]
  notes: Replace 00 with level. Applies when EXT.IN/7.1CH IN.

- id: effect_level_up
  label: Effect Level Up
  kind: action
  command: PSEFF UP
  params: []

- id: effect_level_down
  label: Effect Level Down
  kind: action
  command: PSEFF DOWN
  params: []

- id: surround_delay_up
  label: Surround Delay Up
  kind: action
  command: PSDEL UP
  params: []

- id: surround_delay_down
  label: Surround Delay Down
  kind: action
  command: PSDEL DOWN
  params: []

- id: surround_delay_set
  label: Surround Delay Set
  kind: action
  command: PSDEL 000
  params:
    - name: delay_ms
      type: string
      description: "***:000 to 999 by ASCII , 000=0ms, 300=300ms; AVR can be operated from 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"
  notes: Replace 000 with delay_ms. This is the DEL parameter, distinct from AUDIO DELAY.

- id: panorama_on
  label: Panorama On
  kind: action
  command: PSPAN ON
  params: []

- id: panorama_off
  label: Panorama Off
  kind: action
  command: PSPAN OFF
  params: []

- id: dimension_up
  label: Dimension Up
  kind: action
  command: PSDIM UP
  params: []

- id: dimension_down
  label: Dimension Down
  kind: action
  command: PSDIM DOWN
  params: []

- id: dimension_set
  label: Dimension Set
  kind: action
  command: PSDIM 00
  params:
    - name: value
      type: string
      description: "**:00 to 99 by ASCII , 00=0,; AVR can be operated from 0 to 6"
  notes: Replace 00 with value.

- id: center_width_up
  label: Center Width Up
  kind: action
  command: PSCEN UP
  params: []

- id: center_width_down
  label: Center Width Down
  kind: action
  command: PSCEN DOWN
  params: []

- id: center_width_set
  label: Center Width Set
  kind: action
  command: PSCEN 07
  params:
    - name: value
      type: string
      description: "**:00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"
  notes: Replace 07 with value.

- id: center_image_up
  label: Center Image Up
  kind: action
  command: PSCEI UP
  params: []

- id: center_image_down
  label: Center Image Down
  kind: action
  command: PSCEI DOWN
  params: []

- id: center_image_set
  label: Center Image Set
  kind: action
  command: PSCEI 10
  params:
    - name: value
      type: string
      description: "**:00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  notes: Replace 10 with value.

- id: center_gain_up
  label: Center Gain Up
  kind: action
  command: PSCEG UP
  params: []

- id: center_gain_down
  label: Center Gain Down
  kind: action
  command: PSCEG DOWN
  params: []

- id: center_gain_set
  label: Center Gain Set
  kind: action
  command: PSCEG 10
  params:
    - name: value
      type: string
      description: "**:00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  notes: Replace 10 with value.

- id: center_spread_on
  label: Center Spread On
  kind: action
  command: PSCES ON
  params: []

- id: center_spread_off
  label: Center Spread Off
  kind: action
  command: PSCES OFF
  params: []

- id: subwoofer_output_on
  label: Subwoofer Output On
  kind: action
  command: PSSWR ON
  params: []
  notes: DIRECT,STEREO(2ch) mode.

- id: subwoofer_output_off
  label: Subwoofer Output Off
  kind: action
  command: PSSWR OFF
  params: []
  notes: DIRECT,STEREO(2ch) mode.

- id: auro_preset_set
  label: Auro-Matic 3D Preset Set
  kind: action
  command: PSAUROPR SMA
  params:
    - name: preset
      type: enum
      values: [SMA, MED, LAR, SPE]
  notes: Replace SMA with preset. Auro-3D Upgrade only.

- id: auro_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: PSAUROST UP
  params: []
  notes: Auro-3D Upgrade only.

- id: auro_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: PSAUROST DOWN
  params: []
  notes: Auro-3D Upgrade only.

- id: auro_strength_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: PSAUROST**
  params:
    - name: strength
      type: string
      description: "**:00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16"
  notes: Replace ** with strength. Auro-3D Upgrade only.

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

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: Z2QUICK1
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]
  notes: Replace the trailing 1 with preset.

- id: zone2_quick_select_memory
  label: Zone 2 Quick Select Memory
  kind: action
  command: Z2QUICK1 MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]
  notes: Replace the 1 following QUICK with preset; retain the space before MEMORY.

- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  command: Z2FAVORITE1
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the trailing 1 with preset.

- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  command: Z2FAVORITE1 MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the 1 following FAVORITE with preset; retain the space before MEMORY.

- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  command: Z2CVFL UP
  params:
    - name: channel
      type: enum
      values: [FL, FR]
  notes: Replace FL after Z2CV with channel.

- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  command: Z2CVFL DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR]
  notes: Replace FL after Z2CV with channel.

- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  command: Z2CVFL 50
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "**:38 to 62 by ASCII , 50=0dB"
  notes: Replace FL after Z2CV with channel and 50 with level.

- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  command: Z3QUICK1
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]
  notes: Replace the trailing 1 with preset.

- id: zone3_quick_select_memory
  label: Zone 3 Quick Select Memory
  kind: action
  command: Z3QUICK1 MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4", "5"]
  notes: Replace the 1 following QUICK with preset; retain the space before MEMORY.

- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  command: Z3FAVORITE1
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the trailing 1 with preset.

- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  command: Z3FAVORITE1 MEMORY
  params:
    - name: preset
      type: enum
      values: ["1", "2", "3", "4"]
  notes: Replace the 1 following FAVORITE with preset; retain the space before MEMORY.

- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  command: Z3CVFL UP
  params:
    - name: channel
      type: enum
      values: [FL, FR]
  notes: Replace FL after Z3CV with channel.

- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  command: Z3CVFL DOWN
  params:
    - name: channel
      type: enum
      values: [FL, FR]
  notes: Replace FL after Z3CV with channel.

- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  command: Z3CVFL 50
  params:
    - name: channel
      type: enum
      values: [FL, FR]
    - name: level
      type: string
      description: "**:38 to 62 by ASCII , 50=0dB"
  notes: Replace FL after Z3CV with channel and 50 with level.

- id: zone3_hpf_set
  label: Zone 3 HPF Set
  kind: action
  command: Z3HPFON
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  notes: Replace ON after Z3HPF with state.

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

- id: tuner_preset_memory_mode
  label: Tuner Preset Memory Mode
  kind: action
  command: TPANMEM
  params: []
  notes: The source uses TPANMEM before preset selection and again after selection.

- id: hd_radio_frequency_up
  label: HD Radio Frequency Up
  kind: action
  command: TFHDUP
  params: []

- id: hd_radio_frequency_down
  label: HD Radio Frequency Down
  kind: action
  command: TFHDDOWN
  params: []

- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  command: TFHD105000
  params:
    - name: frequency
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
  notes: Replace 105000 with frequency.

- id: hd_radio_multicast_set
  label: HD Radio Multicast Set
  kind: action
  command: TFHDMC2
  params:
    - name: channel
      type: string
      description: "1 digit; *：Multi Cast 1～8, Analog 0"
  notes: Replace the trailing 2 with channel.

- id: hd_radio_frequency_multicast_set
  label: HD Radio Frequency And Multicast Set
  kind: action
  command: TFHD008750MC5
  params:
    - name: frequency
      type: string
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
    - name: channel
      type: string
      description: "1 digit; *：Multi Cast 1～8, Analog 0"
  notes: Replace 008750 with frequency and the trailing 5 with channel. Command only.

- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  command: TPHDUP
  params: []

- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  command: TPHDDOWN
  params: []

- id: hd_radio_preset_call
  label: HD Radio Preset Call
  kind: action
  command: TPHD01
  params:
    - name: preset
      type: string
      description: "**：01-56 01=CH01,56=CH56"
  notes: Replace 01 with preset.

- id: hd_radio_preset_memory_mode
  label: HD Radio Preset Memory Mode
  kind: action
  command: TPHDMEM
  params: []
  notes: The source documents preset selection after this command.

- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  command: TPHDMEM01
  params:
    - name: preset
      type: string
      description: "**：01-56 01=CH01,56=CH56"
  notes: Replace 01 with preset.

- id: hd_radio_band_set
  label: HD Radio Band Set
  kind: action
  command: TMHDAM
  params:
    - name: band
      type: enum
      values: [AM, FM]
  notes: Replace AM after TMHD with band.

- id: hd_radio_mode_set
  label: HD Radio Mode Set
  kind: action
  command: TMHDAUTOHD
  params:
    - name: mode
      type: enum
      values: [AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU]
  notes: Replace AUTOHD after TMHD with mode.

- id: network_ipod_mode_toggle
  label: Network iPod Mode Toggle
  kind: action
  command: NS9W
  params: []
  notes: Toggle From iPod Mode/On Screen Mode.

- id: network_page_next
  label: Network Page Next
  kind: action
  command: NS9X
  params: []
  notes: Except Bluetooth, AirPlay, Spotify remote.

- id: network_page_previous
  label: Network Page Previous
  kind: action
  command: NS9Y
  params: []
  notes: Except Bluetooth, AirPlay, Spotify remote.

- id: network_search_stop
  label: Network Search Stop
  kind: action
  command: NS9Z
  params: []
  notes: USB/iPod, Media Server, Bluetooth.

- id: network_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  command: NSRPT
  params: []

- id: network_random_toggle
  label: Network Random Toggle
  kind: action
  command: NSRND
  params: []

- id: network_favorite_add
  label: Network Favorite Add
  kind: action
  command: NSFV MEM
  params: []
  notes: Add Favorites folder.

- id: channel_level_menu_toggle
  label: Channel Level Menu Toggle
  kind: action
  command: MNCHL
  params: []

- id: instaprevue_on
  label: InstaPrevue On
  kind: action
  command: MNPRV ON
  params: []

- id: instaprevue_off
  label: InstaPrevue Off
  kind: action
  command: MNPRV OFF
  params: []

- id: upgrade_id_display
  label: Upgrade ID Display
  kind: action
  command: UGIDN
  params: []
  notes: ID Number for UPGRADE is displayed on FL Display; source states a 12-digit ID Number.

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
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  query_command: PW?
  response_prefix: PW

- id: master_volume
  type: string
  query_command: MV?
  response_prefix: MV
  description: "Two or three digit ASCII level (80=0dB, 00=MIN)"

- id: mute_state
  type: enum
  values: [ON, OFF]
  query_command: MU?
  response_prefix: MU

- id: input_source
  type: string
  query_command: SI?
  response_prefix: SI
  description: Returns current input source name

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  query_command: ZM?
  response_prefix: ZM

- id: surround_mode
  type: string
  query_command: MS?
  response_prefix: MS
  description: Returns current surround mode name

- id: input_mode
  type: string
  query_command: SD?
  response_prefix: SD

- id: digital_input_mode
  type: string
  query_command: DC?
  response_prefix: DC

- id: video_select
  type: string
  query_command: SV?
  response_prefix: SV

- id: sleep_timer
  type: string
  query_command: SLP?
  response_prefix: SLP
  description: "OFF or 001-120"

- id: auto_standby
  type: string
  query_command: STBY?
  response_prefix: STBY

- id: eco_mode
  type: string
  query_command: ECO?
  response_prefix: ECO

- id: tone_control
  type: string
  query_command: PSTONE CTRL ?
  response_prefix: PSTONE CTRL

- id: bass_level
  type: string
  query_command: PSBAS ?
  response_prefix: PSBAS
  description: "00-99, 50=0dB"

- id: treble_level
  type: string
  query_command: PSTRE ?
  response_prefix: PSTRE
  description: "00-99, 50=0dB"

- id: channel_volume
  type: string
  query_command: CV?
  response_prefix: CV
  description: Returns levels for all configured speakers, terminated with CVEND

- id: dynamic_eq_state
  type: string
  query_command: PSDYNEQ ?
  response_prefix: PSDYNEQ

- id: dynamic_volume_state
  type: string
  query_command: PSDYNVOL ?
  response_prefix: PSDYNVOL

- id: multeq_state
  type: string
  query_command: "PSMULTEQ: ?"
  response_prefix: PSMULTEQ

- id: cinema_eq_state
  type: string
  query_command: PSCINEMA EQ. ?
  response_prefix: PSCINEMA EQ.

- id: drc_state
  type: string
  query_command: PSDRC ?
  response_prefix: PSDRC

- id: subwoofer_level_state
  type: string
  query_command: PSSWL ?
  response_prefix: PSSWL

- id: audio_delay
  type: string
  query_command: PSDELAY ?
  response_prefix: PSDELAY
  description: "000-999 ms"

- id: aspect_ratio
  type: string
  query_command: VSASP ?
  response_prefix: VSASP

- id: hdmi_monitor
  type: string
  query_command: VSMONI ?
  response_prefix: VSMONI

- id: resolution
  type: string
  query_command: VSSC ?
  response_prefix: VSSC

- id: hdmi_resolution
  type: string
  query_command: VSSCH ?
  response_prefix: VSSCH

- id: hdmi_audio_output
  type: string
  query_command: VSAUDIO ?
  response_prefix: VSAUDIO

- id: video_processing_mode
  type: string
  query_command: VSVPM ?
  response_prefix: VSVPM

- id: vertical_stretch
  type: string
  query_command: VSVST ?
  response_prefix: VSVST

- id: picture_mode
  type: string
  query_command: PV?
  response_prefix: PV

- id: contrast
  type: string
  query_command: PVCN ?
  response_prefix: PVCN

- id: brightness
  type: string
  query_command: PVBR ?
  response_prefix: PVBR

- id: saturation
  type: string
  query_command: PVST ?
  response_prefix: PVST

- id: hue
  type: string
  query_command: PVHUE ?
  response_prefix: PVHUE

- id: dnr_state
  type: string
  query_command: PVDNR ?
  response_prefix: PVDNR

- id: enhancer_level
  type: string
  query_command: PVENH ?
  response_prefix: PVENH

- id: zone2_state
  type: string
  query_command: Z2?
  response_prefix: Z2

- id: zone2_mute_state
  type: string
  query_command: Z2MU?
  response_prefix: Z2MU

- id: zone2_channel_setting
  type: string
  query_command: Z2CS?
  response_prefix: Z2CS

- id: zone2_hpf_state
  type: string
  query_command: Z2HPF?
  response_prefix: Z2HPF

- id: zone2_bass
  type: string
  query_command: Z2PSBAS ?
  response_prefix: Z2PSBAS

- id: zone2_treble
  type: string
  query_command: Z2PSTRE ?
  response_prefix: Z2PSTRE

- id: zone2_sleep
  type: string
  query_command: Z2SLP?
  response_prefix: Z2SLP

- id: zone2_standby
  type: string
  query_command: Z2STBY?
  response_prefix: Z2STBY

- id: zone2_hdmi_audio
  type: string
  query_command: Z2HDA?
  response_prefix: Z2HDA

- id: zone3_state
  type: string
  query_command: Z3?
  response_prefix: Z3

- id: zone3_mute_state
  type: string
  query_command: Z3MU?
  response_prefix: Z3MU

- id: zone3_channel_setting
  type: string
  query_command: Z3CS?
  response_prefix: Z3CS

- id: zone3_hpf_state
  type: string
  query_command: Z3HPF?
  response_prefix: Z3HPF

- id: zone3_bass
  type: string
  query_command: Z3PSBAS ?
  response_prefix: Z3PSBAS

- id: zone3_treble
  type: string
  query_command: Z3PSTRE ?
  response_prefix: Z3PSTRE

- id: zone3_sleep
  type: string
  query_command: Z3SLP?
  response_prefix: Z3SLP

- id: zone3_standby
  type: string
  query_command: Z3STBY?
  response_prefix: Z3STBY

- id: tuner_frequency
  type: string
  query_command: TFAN?
  response_prefix: TFAN
  description: 6-digit frequency value

- id: tuner_preset
  type: string
  query_command: TPAN?
  response_prefix: TPAN

- id: tuner_band_mode
  type: string
  query_command: TMAN?
  response_prefix: TMAN

- id: tuner_station_name
  type: string
  query_command: TFANNAME?
  response_prefix: TFANNAME
  description: RDS station name (EU/AP only)

- id: trigger_state
  type: string
  query_command: TR?
  response_prefix: TR
  description: Returns TR1 and TR2 states

- id: setup_menu_state
  type: string
  query_command: MNMEN?
  response_prefix: MNMEN

- id: all_zone_stereo_state
  type: string
  query_command: MNZST?
  response_prefix: MNZST

- id: rec_select_state
  type: string
  query_command: SR?
  response_prefix: SR

- id: dimmer_state
  type: string
  query_command: DIM ?
  response_prefix: DIM

- id: quick_select_state
  type: string
  query_command: MSQUICK ?
  response_prefix: MSQUICK

- id: lfe_level
  type: string
  query_command: PSLFE ?
  response_prefix: PSLFE

- id: effect_state
  type: string
  query_command: PSEFF ?
  response_prefix: PSEFF

- id: room_size
  type: string
  query_command: PSRSZ ?
  response_prefix: PSRSZ

- id: restorer_state
  type: string
  query_command: PSRSTR ?
  response_prefix: PSRSTR

- id: front_speaker
  type: string
  query_command: PSFRONT?
  response_prefix: PSFRONT

- id: lfc_state
  type: string
  query_command: PSLFC ?
  response_prefix: PSLFC

- id: containment_amount
  type: string
  query_command: PSCNTAMT ?
  response_prefix: PSCNTAMT

- id: ref_level_offset
  type: string
  query_command: PSREFLEV ?
  response_prefix: PSREFLEV

- id: loudness_state
  type: string
  query_command: PSLOM ?
  response_prefix: PSLOM

- id: graphic_eq_state
  type: string
  query_command: PSGEQ ?
  response_prefix: PSGEQ

- id: network_onscreen_ascii
  type: string
  query_command: NSA
  response_prefix: NSA
  description: Returns onscreen display lines NSA0-NSA8 (ASCII, max 96 bytes each)

- id: network_onscreen_utf8
  type: string
  query_command: NSE
  response_prefix: NSE
  description: Returns onscreen display lines NSE0-NSE8 (UTF-8, max 96 bytes each)

- id: network_preset_names
  type: string
  query_command: NSH
  response_prefix: NSH
  description: Returns preset names NSH00-NSH35 (UTF-8, 20 chars each)

- id: hd_radio_status
  type: string
  query_command: HD?
  response_prefix: HD
  description: Returns band, station name, multicast, signal level, artist, title, album, genre

- id: remote_maintenance_state
  type: string
  query_command: RM ?
  response_prefix: RM

- id: dialog_level_state
  type: string
  query_command: PSDIL ?
  response_prefix: PSDIL
  description: Returns dialog level adjustment state and level.

- id: surround_parameter_mode
  type: string
  query_command: PSMODE: ?
  response_prefix: PSMODE:

- id: front_height_state
  type: string
  query_command: PSFH: ?
  response_prefix: PSFH:

- id: speaker_output
  type: string
  query_command: PSSP: ?
  response_prefix: PSSP:

- id: height_gain
  type: string
  query_command: PSPHG ?
  response_prefix: PSPHG

- id: audyssey_dsx_state
  type: string
  query_command: PSDSX ?
  response_prefix: PSDSX

- id: stage_width
  type: string
  query_command: PSSTW ?
  response_prefix: PSSTW

- id: stage_height
  type: string
  query_command: PSSTH ?
  response_prefix: PSSTH

- id: bass_sync
  type: string
  query_command: PSBSC ?
  response_prefix: PSBSC

- id: dialogue_enhancer
  type: string
  query_command: PSDEH ?
  response_prefix: PSDEH

- id: external_input_lfe_level
  type: string
  query_command: PSLFL ?
  response_prefix: PSLFL

- id: surround_delay
  type: string
  query_command: PSDEL ?
  response_prefix: PSDEL

- id: panorama_state
  type: string
  query_command: PSPAN ?
  response_prefix: PSPAN

- id: dimension
  type: string
  query_command: PSDIM ?
  response_prefix: PSDIM

- id: center_width
  type: string
  query_command: PSCEN ?
  response_prefix: PSCEN

- id: center_image
  type: string
  query_command: PSCEI ?
  response_prefix: PSCEI

- id: center_gain
  type: string
  query_command: PSCEG ?
  response_prefix: PSCEG

- id: center_spread_state
  type: string
  query_command: PSCES ?
  response_prefix: PSCES

- id: subwoofer_output_state
  type: string
  query_command: PSSWR ?
  response_prefix: PSSWR

- id: auro_preset
  type: string
  query_command: PSAUROPR ?
  response_prefix: PSAUROPR
  description: Auro-3D Upgrade only.

- id: auro_strength
  type: string
  query_command: PSAUROST ?
  response_prefix: PSAUROST
  description: Auro-3D Upgrade only.

- id: zone2_quick_select_state
  type: string
  query_command: Z2QUICK ?
  response_prefix: Z2QUICK

- id: zone2_channel_volume
  type: string
  query_command: Z2CV?
  response_prefix: Z2CV

- id: zone3_quick_select_state
  type: string
  query_command: Z3QUICK ?
  response_prefix: Z3QUICK

- id: zone3_channel_volume
  type: string
  query_command: Z3CV?
  response_prefix: Z3CV

- id: hd_radio_frequency
  type: string
  query_command: TFHD?
  response_prefix: TFHD

- id: hd_radio_preset
  type: string
  query_command: TPHD?
  response_prefix: TPHD

- id: hd_radio_band_mode
  type: string
  query_command: TMHD?
  response_prefix: TMHD

- id: network_onscreen_ascii_request_zero
  type: string
  query_command: NSA0
  response_prefix: NSA
  description: Additional onscreen display request form documented by the NSA0 command example.

- id: network_onscreen_utf8_request_zero
  type: string
  query_command: NSE0
  response_prefix: NSE
  description: Additional onscreen display request form documented by the NSE0 command example.

- id: instaprevue_state
  type: string
  query_command: MNPRV?
  response_prefix: MNPRV
  description: ON or OFF; NG is status only when InstaPrevue is not available.
```

## Variables
```yaml
# UNRESOLVED: no distinct settable parameters beyond those covered in Actions
```

## Events
```yaml
- id: event_general
  description: >
    Device sends EVENT messages when state changes from front panel or remote.
    Format is same as COMMAND. Should be sent within 5 seconds of state change.
    Examples: PWON, PWSTANDBY, MV80, MUON, MUOFF, SIDVD, MSSTEREO, etc.

- id: event_channel_volume_on_input_change
  description: >
    When input source changes, channel volume values for active speakers
    return as EVENTs. Surround mode also returns if it changed.

- id: event_response
  description: >
    RESPONSE to query commands (COMMAND+?+CR) sent within 200ms.
    Format same as EVENT.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after PWON before sending next command"
    source: "Source note J"
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command interval: send commands at 50ms or more intervals.
- All commands use ASCII, terminated with CR (0x0D). Command codes are 2 characters followed by parameter.
- Volume encoding: two-digit ASCII 00-98, where 80=0dB and 00=MIN (---). For 0.5dB steps, use three digits (e.g. 805=+0.5dB, 795=-0.5dB).
- Channel volume range: 38-62 ASCII, 50=0dB.
- Max communication data length: 135 bytes.
- Half-duplex communication on both serial and Ethernet.
- COMMAND is receivable during EVENT transmission.
- When surround mode is set again to the current mode, surround mode EVENT returns but channel volume EVENT does NOT.
- REC SELECT (SR) and ZONE2 share some command space — response prefix indicates which mode is active.
- Many surround mode sub-variants exist beyond the primary modes listed; full list in source table.
- Some commands marked as specific to certain models (e.g. X1100, S700, X4100) or regions (North America, Europe).
- Auro-3D features require Auro-3D Upgrade option.
<!-- UNRESOLVED: exact model variants within SR6007 "Series" not specified -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:19:33.374Z
last_checked_at: 2026-10-07T20:56:34.329Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:56:34.329Z
matched_actions: 378
action_count: 378
confidence: medium
summary: "All 378 action units match source commands with correct shapes and transport (TCP 23, 9600 8N1); only status or event-only tokens are unlisted; source never names SR6007. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated"
- "which specific models in the \"Series\" share this protocol"
- "no distinct settable parameters beyond those covered in Actions"
- "no multi-step sequences explicitly defined in source"
- "no explicit safety warnings or interlock procedures in source"
- "exact model variants within SR6007 \"Series\" not specified"
- "firmware version compatibility range not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
