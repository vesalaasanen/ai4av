---
spec_id: admin/denon-dn-v500bd
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DN-V500BD Control Spec"
manufacturer: Denon
model_family: DN-V500BD
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DN-V500BD
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:19:49.200Z
last_checked_at: 2026-06-03T06:35:55.593Z
generated_at: 2026-06-03T06:35:55.593Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact DN-V500BD feature subset not stated — source is a generic Denon AVR protocol doc covering many models; which commands the DN-V500BD actually responds to is not specified"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock or power-on sequencing beyond the 1s PWON delay"
  - "exact DN-V500BD command subset — source is a multi-model AVR protocol doc, not DN-V500BD-specific"
  - "firmware version compatibility not stated"
  - "which surround modes and zone commands the DN-V500BD supports specifically"
  - "whether DN-V500BD supports Zone 2/3, HD Radio, network streaming commands"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:35:55.593Z
  matched_actions: 164
  action_count: 164
  confidence: medium
  summary: "All 164 spec actions present and match source protocol (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Denon DN-V500BD Control Spec

## Summary

Denon DN-V500BD Blu-ray disc player controllable via RS-232C serial and Ethernet (TCP port 23 / telnet). ASCII-based command protocol with 2-character command codes and up to 25-character parameters, terminated by CR (0x0D). Commands include power, input selection, volume, mute, surround mode, channel volume, tuner, and Zone 2/3 control.

<!-- UNRESOLVED: exact DN-V500BD feature subset not stated — source is a generic Denon AVR protocol doc covering many models; which commands the DN-V500BD actually responds to is not specified -->

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
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # PW ON / PW STANDBY commands
- queryable     # ? parameter returns status for most commands
- levelable     # MV, CV volume/bass/treble control
- routable      # SI input source selection
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
      description: "Volume level 00-98 (80=0dB, 00=---MIN). 0.5dB step uses 3 chars e.g. 805"
  command: MV{level}

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: enum
      description: "Channel code: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS"
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
  command: CV{channel} UP

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
  command: CV{channel} DOWN

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: enum
      values: [FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS]
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
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, "USB/IPOD", USB, IPD, IRP, FVP]
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
  label: Favorite Select (1-4)
  kind: action
  params:
    - name: number
      type: integer
      description: "Favorite number 1-4"
  command: ZMFAVORITE{number}

- id: rec_select
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: enum
      values: [PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, USB, IPD, SOURCE]
  command: SR{source}

- id: input_mode_set
  label: Input Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, HDMI, DIGITAL, ANALOG, "EXT.IN", "7.1IN", NO]
  command: SD{mode}

- id: digital_input_set
  label: Digital Input Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, PCM, DTS]
  command: DC{mode}

- id: video_select
  label: Video Select Source
  kind: action
  params:
    - name: source
      type: enum
      values: [DVD, BD, TV, "SAT/CBL", MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF]
  command: SV{source}

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120 (010=10min)"
  command: SLP{minutes}

- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [15M, 30M, 60M, OFF]
  command: STBY{mode}

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [ON, AUTO, OFF]
  command: ECO{mode}

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [MOVIE, MUSIC, GAME, DIRECT, "PURE DIRECT", STEREO, AUTO, "DOLBY DIGITAL", "DTS SURROUND", AURO3D, AURO2DSURR, "MCH STEREO", "WIDE SCREEN", "SUPER STADIUM", "ROCK ARENA", "JAZZ CLUB", "CLASSIC CONCERT", "MONO MOVIE", MATRIX, "VIDEO GAME", VIRTUAL, LEFT, RIGHT]
  command: MS{mode}

- id: quick_select
  label: Quick Select (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select 1-5"
  command: MSQUICK{number}

- id: quick_select_memory
  label: Quick Select Memory (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "Quick select 1-5"
  command: MSQUICK{number} MEMORY

- id: aspect_ratio_set
  label: Aspect Ratio Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [ASPNRM, ASPFUL]
  command: VS{mode}

- id: hdmi_monitor_set
  label: HDMI Monitor Select
  kind: action
  params:
    - name: output
      type: enum
      values: [MONIAUTO, MONI1, MONI2]
  command: VS{output}

- id: resolution_set
  kind: action
  label: Resolution Set
  params:
    - name: resolution
      type: enum
      values: [SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO]
  command: VS{resolution}

- id: hdmi_resolution_set
  kind: action
  label: HDMI Resolution Set
  params:
    - name: resolution
      type: enum
      values: [SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO]
  command: VS{resolution}

- id: hdmi_audio_output_set
  label: HDMI Audio Output Set
  kind: action
  params:
    - name: target
      type: enum
      values: ["AUDIO AMP", "AUDIO TV"]
  command: VS{target}

- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [VPMAUTO, VPMGAME, VPMMOVI]
  command: VS{mode}

- id: vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  params:
    - name: state
      type: enum
      values: ["VST ON", "VST OFF"]
  command: VS{state}

- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: ["TONE CTRL ON", "TONE CTRL OFF"]
  command: PS{state}

- id: bass_up
  label: Bass Up
  kind: action
  params: []
  command: PSBAS UP

- id: bass_down
  label: Bass Down
  kind: action
  params: []
  command: PSBAS DOWN

- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB, AVR range -6 to +6 (44-56)"
  command: PSBAS {level}

- id: treble_up
  label: Treble Up
  kind: action
  params: []
  command: PSTRE UP

- id: treble_down
  label: Treble Down
  kind: action
  params: []
  command: PSTRE DOWN

- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB, AVR range -6 to +6 (44-56)"
  command: PSTRE {level}

- id: dynamic_eq_set
  label: Dynamic EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [ON, OFF]
  command: PSDYNEQ {state}

- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [HEV, MED, LIT, OFF]
  command: PSDYNVOL {mode}

- id: multeq_set
  label: MultEQ Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUDYSSEY, BYP.LR, FLAT, OFF]
  command: PSMULTEQ:{mode}

- id: drc_set
  label: Dynamic Compression Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [AUTO, LOW, MID, HI, OFF]
  command: PSDRC {mode}

- id: cinema_eq_set
  label: Cinema EQ On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: ["CINEMA EQ.ON", "CINEMA EQ.OFF"]
  command: PS{state}

- id: audio_delay_up
  label: Audio Delay Up
  kind: action
  params: []
  command: PSDELAY UP

- id: audio_delay_down
  label: Audio Delay Down
  kind: action
  params: []
  command: PSDELAY DOWN

- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: value
      type: string
      description: "000-999 (000=0ms, 200=200ms), 0-200ms range"
  command: PSDELAY{value}

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [OFF, STD, MOV, VVD, STM, CTM, DAY, NGT]
  command: PV{mode}

- id: contrast_set
  label: Contrast Set
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
  command: PVCN {value}

- id: brightness_set
  label: Brightness Set
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
  command: PVBR {value}

- id: saturation_set
  label: Saturation Set
  kind: action
  params:
    - name: value
      type: string
      description: "000-100, 050=0, range -50 to +50"
  command: PVST {value}

- id: hue_set
  label: Hue Set
  kind: action
  params:
    - name: value
      type: string
      description: "44-56, 50=0, range -6 to +6"
  command: PVHUE {value}

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

- id: zone2_source
  label: Zone 2 Select Source
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB, IPD, IRP, FVP]
  command: Z2{source}

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
      description: "00-98, 80=0dB, 00=---(MIN)"
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

- id: zone2_quick_select
  label: Zone 2 Quick Select (1-5)
  kind: action
  params:
    - name: number
      type: integer
      description: "1-5"
  command: Z2QUICK{number}

- id: zone2_channel_set
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: enum
      values: [ST, MONO]
  command: Z2CS{mode}

- id: zone2_sleep_timer
  label: Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"
  command: Z2SLP{minutes}

- id: zone2_auto_standby
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [2H, 4H, 8H, OFF]
  command: Z2STBY{mode}

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

- id: zone3_source
  label: Zone 3 Select Source
  kind: action
  params:
    - name: source
      type: enum
      values: [SOURCE, PHONO, CD, TUNER, DVD, BD, TV, "SAT/CBL", MPLAY, GAME, NET, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB, IPD, IRP, FVP]
  command: Z3{source}

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
      description: "00-98, 80=0dB, 00=---(MIN)"
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
  label: Tuner Frequency Direct
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits; >050000=AM kHz, <050000=FM MHz"
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

- id: tuner_preset_select
  label: Tuner Preset Select
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
      type: enum
      values: [ANAM, ANFM]
  command: TM{band}

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  params:
    - name: mode
      type: enum
      values: [ANAUTO, ANMANUAL]
  command: TM{mode}

- id: network_cursor_up
  label: Network Cursor Up
  kind: action
  params: []
  command: NS90

- id: network_cursor_down
  label: Network Cursor Down
  kind: action
  params: []
  command: NS91

- id: network_cursor_left
  label: Network Cursor Left
  kind: action
  params: []
  command: NS92

- id: network_cursor_right
  label: Network Cursor Right
  kind: action
  params: []
  command: NS93

- id: network_enter
  label: Network Enter (Play/Pause)
  kind: action
  params: []
  command: NS94

- id: network_play
  label: Network Play
  kind: action
  params: []
  command: NS9A

- id: network_pause
  label: Network Pause
  kind: action
  params: []
  command: NS9B

- id: network_stop
  label: Network Stop
  kind: action
  params: []
  command: NS9C

- id: network_skip_plus
  label: Network Skip Forward
  kind: action
  params: []
  command: NS9D

- id: network_skip_minus
  label: Network Skip Backward
  kind: action
  params: []
  command: NS9E

- id: network_search_plus
  label: Network Search Forward
  kind: action
  params: []
  command: NS9F

- id: network_search_minus
  label: Network Search Backward
  kind: action
  params: []
  command: NS9G

- id: network_repeat_one
  label: Network Repeat One
  kind: action
  params: []
  command: NS9H

- id: network_repeat_all
  label: Network Repeat All
  kind: action
  params: []
  command: NS9I

- id: network_repeat_off
  label: Network Repeat Off
  kind: action
  params: []
  command: NS9J

- id: network_random_on
  label: Network Random On
  kind: action
  params: []
  command: NS9K

- id: network_random_off
  label: Network Random Off
  kind: action
  params: []
  command: NS9M

- id: network_page_next
  label: Network Page Next
  kind: action
  params: []
  command: NS9X

- id: network_page_prev
  label: Network Page Previous
  kind: action
  params: []
  command: NS9Y

- id: network_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  params: []
  command: NSRPT

- id: network_random_toggle
  label: Network Random Toggle
  kind: action
  params: []
  command: NSRND

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

- id: menu_setup_on
  label: Setup Menu On
  kind: action
  params: []
  command: MNMEN ON

- id: menu_setup_off
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
  label: Panel Lock On
  kind: action
  params: []
  command: SYPANEL LOCK ON

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
      type: enum
      values: [BRI, DIM, DAR, OFF, SEL]
  command: DIM {level}

- id: upgrade_idn
  label: Upgrade ID Number Display
  kind: action
  params: []
  command: UGIDN

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
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  params: []
  command: PSDIL ON

- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
  command: PSDIL OFF

- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  params: []
  command: PSDIL UP

- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  params: []
  command: PSDIL DOWN

- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
  command: PSSWL ON

- id: subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
  command: PSSWL OFF

- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
  command: PSSWL UP

- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
  command: PSSWL DOWN

- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
  command: PSSWL2 UP

- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
  command: PSSWL2 DOWN

- id: ps_mode_set
  label: PS Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
  command: "PSMODE:{mode}"

- id: loudness_management_set
  label: Loudness Management Set
  kind: action
  params:
    - name: state
      type: string
  command: "PSLOM {state}"

- id: front_height_set
  label: Front Height Output Set
  kind: action
  params:
    - name: state
      type: string
      description: "FH:ON or FH:OFF"
  command: "PS{state}"

- id: speaker_output_set
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: string
      description: "SP:FW, SP:FH, SP:SB, SP:HW, SP:BH, SP:BW, SP:FL, SP:HF, SP:FR"
  command: "PS{config}"

- id: plz_height_gain_set
  label: PL2z Height Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
  command: "PSPHG {level}"

- id: reference_level_set
  label: Reference Level Offset Set
  kind: action
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15"
  command: "PSREFLEV {offset}"

- id: audyssey_lfc_set
  label: Audyssey LFC Set
  kind: action
  params:
    - name: state
      type: string
  command: "PSLFC {state}"

- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  params: []
  command: PSCNTAMT UP

- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  params: []
  command: PSCNTAMT DOWN

- id: audyssey_dsx_set
  label: Audyssey DSX Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
  command: "PSDSX {mode}"

- id: stage_width_up
  label: Stage Width Up
  kind: action
  params: []
  command: PSSTW UP

- id: stage_width_down
  label: Stage Width Down
  kind: action
  params: []
  command: PSSTW DOWN

- id: stage_height_up
  label: Stage Height Up
  kind: action
  params: []
  command: PSSTH UP

- id: stage_height_down
  label: Stage Height Down
  kind: action
  params: []
  command: PSSTH DOWN

- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  params:
    - name: state
      type: string
  command: "PSGEQ {state}"

- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  params: []
  command: PSBSC UP

- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  params: []
  command: PSBSC DOWN

- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH"
  command: "PSDEH {level}"

- id: lfe_up
  label: LFE Up
  kind: action
  params: []
  command: PSLFE UP

- id: lfe_down
  label: LFE Down
  kind: action
  params: []
  command: PSLFE DOWN

- id: effect_on
  label: Effect On
  kind: action
  params: []
  command: PSEFF ON

- id: effect_off
  label: Effect Off
  kind: action
  params: []
  command: PSEFF OFF

- id: effect_level_up
  label: Effect Level Up
  kind: action
  params: []
  command: PSEFF UP

- id: effect_level_down
  label: Effect Level Down
  kind: action
  params: []
  command: PSEFF DOWN

- id: ps_delay_up
  label: PS Delay Up
  kind: action
  params: []
  command: PSDEL UP

- id: ps_delay_down
  label: PS Delay Down
  kind: action
  params: []
  command: PSDEL DOWN
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  query: PW?
  response_prefix: PW

- id: master_volume
  type: string
  description: "Volume level 00-98 (80=0dB)"
  query: MV?
  response_prefix: MV

- id: channel_volume
  type: string
  description: "Returns channel volumes for configured speakers, terminated by CVEND"
  query: CV?
  response_prefix: CV

- id: mute_state
  type: enum
  values: [ON, OFF]
  query: MU?
  response_prefix: MU

- id: input_source
  type: string
  description: "Current input source name"
  query: SI?
  response_prefix: SI

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  query: ZM?
  response_prefix: ZM

- id: input_mode
  type: string
  query: SD?
  response_prefix: SD

- id: digital_input_mode
  type: string
  query: DC?
  response_prefix: DC

- id: video_select_state
  type: string
  query: SV?
  response_prefix: SV

- id: sleep_timer
  type: string
  query: SLP?
  response_prefix: SLP

- id: auto_standby
  type: string
  query: STBY?
  response_prefix: STBY

- id: eco_mode
  type: string
  query: ECO?
  response_prefix: ECO

- id: surround_mode
  type: string
  query: MS?
  response_prefix: MS

- id: quick_select_state
  type: string
  query: MSQUICK ?
  response_prefix: MSQUICK

- id: aspect_ratio
  type: string
  query: VSASP ?
  response_prefix: VSASP

- id: hdmi_monitor
  type: string
  query: VSMONI ?
  response_prefix: VSMONI

- id: resolution
  type: string
  query: VSSC ?
  response_prefix: VSSC

- id: hdmi_resolution
  type: string
  query: VSSCH ?
  response_prefix: VSSCH

- id: hdmi_audio_output
  type: string
  query: VSAUDIO ?
  response_prefix: VSAUDIO

- id: video_processing_mode
  type: string
  query: VSVPM ?
  response_prefix: VSVPM

- id: vertical_stretch
  type: string
  query: VSVST ?
  response_prefix: VSVST

- id: tone_control
  type: string
  query: PSTONE CTRL ?
  response_prefix: PSTONE CTRL

- id: bass_level
  type: string
  query: PSBAS ?
  response_prefix: PSBAS

- id: treble_level
  type: string
  query: PSTRE ?
  response_prefix: PSTRE

- id: dynamic_eq
  type: string
  query: PSDYNEQ ?
  response_prefix: PSDYNEQ

- id: dynamic_volume
  type: string
  query: PSDYNVOL ?
  response_prefix: PSDYNVOL

- id: multeq_mode
  type: string
  query: PSMULTEQ ?
  response_prefix: PSMULTEQ

- id: drc_mode
  type: string
  query: PSDRC ?
  response_prefix: PSDRC

- id: cinema_eq
  type: string
  query: PSCINEMA EQ. ?
  response_prefix: PSCINEMA EQ

- id: audio_delay
  type: string
  query: PSDELAY?
  response_prefix: PSDELAY

- id: picture_mode
  type: string
  query: PV?
  response_prefix: PV

- id: contrast
  type: string
  query: PVCN ?
  response_prefix: PVCN

- id: brightness
  type: string
  query: PVBR ?
  response_prefix: PVBR

- id: saturation
  type: string
  query: PVST ?
  response_prefix: PVST

- id: hue
  type: string
  query: PVHUE ?
  response_prefix: PVHUE

- id: zone2_state
  type: enum
  values: [ON, OFF]
  query: Z2?
  response_prefix: Z2

- id: zone2_mute
  type: enum
  values: [ON, OFF]
  query: Z2MU?
  response_prefix: Z2MU

- id: zone2_channel
  type: string
  query: Z2CS?
  response_prefix: Z2CS

- id: zone2_channel_volume
  type: string
  query: Z2CV?
  response_prefix: Z2CV

- id: zone2_hpf
  type: string
  query: Z2HPF?
  response_prefix: Z2HPF

- id: zone2_sleep
  type: string
  query: Z2SLP?
  response_prefix: Z2SLP

- id: zone2_auto_standby
  type: string
  query: Z2STBY?
  response_prefix: Z2STBY

- id: zone3_state
  type: enum
  values: [ON, OFF]
  query: Z3?
  response_prefix: Z3

- id: zone3_mute
  type: enum
  values: [ON, OFF]
  query: Z3MU?
  response_prefix: Z3MU

- id: zone3_channel
  type: string
  query: Z3CS?
  response_prefix: Z3CS

- id: zone3_channel_volume
  type: string
  query: Z3CV?
  response_prefix: Z3CV

- id: zone3_sleep
  type: string
  query: Z3SLP?
  response_prefix: Z3SLP

- id: zone3_auto_standby
  type: string
  query: Z3STBY?
  response_prefix: Z3STBY

- id: tuner_frequency
  type: string
  query: TFAN?
  response_prefix: TFAN

- id: tuner_preset
  type: string
  query: TPAN?
  response_prefix: TPAN

- id: tuner_mode
  type: string
  query: TMAN?
  response_prefix: TMAN

- id: trigger_state
  type: string
  query: TR?
  response_prefix: TR

- id: menu_state
  type: enum
  values: ["ON", "OFF"]
  query: MNMEN?
  response_prefix: MNMEN

- id: dimmer_state
  type: string
  query: DIM ?
  response_prefix: DIM

- id: remote_maintenance_state
  type: string
  query: RM ?
  response_prefix: RM

- id: all_zone_stereo_state
  type: string
  query: MNZST?
  response_prefix: MNZST

- id: network_onscreen_ascii
  type: string
  description: "Returns NSA0-NSA8 with onscreen display lines"
  query: NSA
  response_prefix: NSA

- id: network_onscreen_utf8
  type: string
  description: "Returns NSE0-NSE8 with onscreen display lines (UTF-8)"
  query: NSE
  response_prefix: NSE
```

## Variables
```yaml
- id: master_volume_db
  type: string
  description: "Direct volume set in Denon encoding: 80=0dB, 00=---(MIN), 805=-0.5dB"
  set_command: MV{value}

- id: zone2_volume_db
  type: string
  description: "Zone 2 volume in Denon encoding: 80=0dB, 00=---(MIN)"
  set_command: Z2{value}

- id: zone3_volume_db
  type: string
  description: "Zone 3 volume in Denon encoding: 80=0dB, 00=---(MIN)"
  set_command: Z3{value}
```

## Events
```yaml
- id: power_event
  description: "Sent when power state changes via front panel or remote"
  format: PWON|PWSTANDBY

- id: volume_event
  description: "Sent when master volume changes"
  format: MV<level>

- id: channel_volume_event
  description: "Sent when input source changes and channel volume updates; terminates with CVEND"
  format: CV<channel> <level> ... CVEND

- id: mute_event
  description: "Sent when mute state changes"
  format: MUON|MUOFF

- id: input_source_event
  description: "Sent when input source changes"
  format: SI<source>

- id: surround_mode_event
  description: "Sent when surround mode changes; previous mode sent before new mode"
  format: MS<mode>

- id: zone2_event
  description: "Sent when Zone 2 state changes"
  format: Z2<status>

- id: zone3_event
  description: "Sent when Zone 3 state changes"
  format: Z3<status>
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after sending PWON before transmitting next command"
    source: "Source note J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
  - description: "Send commands at 50ms or greater intervals"
    source: "Source: Send the COMMAND in 50ms or more intervals"
# UNRESOLVED: no explicit safety interlock or power-on sequencing beyond the 1s PWON delay
```

## Notes
- Command structure: 2-character ASCII command code + parameter (up to 25 chars) + CR (0x0D).
- Request/response pattern: append `?` to command to query current state; response returned within 200ms.
- Events are unsolicited messages sent within 5 seconds of a state change (front panel / remote operation).
- Volume encoding: 80=0dB, 00=---(MIN), 98=+18dB. 0.5dB steps use 3-character parameters (e.g. 805=-0.5dB).
- Channel volume range: 38-62 ASCII, 50=0dB.
- Max communication data length: 135 bytes.
- RS-232C connector: DB-9pin female (DCE), pins 1=GND, 2=TxD, 3=RxD, 5=Common(GND).
- Ethernet: RJ-45 10BASE-T/100BASE-TX, TCP port 23 (telnet).
- Commands are receivable during EVENT transmission (full note A in source).
- Channel volume events return automatically when input source changes if channel volumes differ between sources (notes B-F).

<!-- UNRESOLVED: exact DN-V500BD command subset — source is a multi-model AVR protocol doc, not DN-V500BD-specific -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: which surround modes and zone commands the DN-V500BD supports specifically -->
<!-- UNRESOLVED: whether DN-V500BD supports Zone 2/3, HD Radio, network streaming commands -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T15:19:49.200Z
last_checked_at: 2026-06-03T06:35:55.593Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:35:55.593Z
matched_actions: 164
action_count: 164
confidence: medium
summary: "All 164 spec actions present and match source protocol (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact DN-V500BD feature subset not stated — source is a generic Denon AVR protocol doc covering many models; which commands the DN-V500BD actually responds to is not specified"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock or power-on sequencing beyond the 1s PWON delay"
- "exact DN-V500BD command subset — source is a multi-model AVR protocol doc, not DN-V500BD-specific"
- "firmware version compatibility not stated"
- "which surround modes and zone commands the DN-V500BD supports specifically"
- "whether DN-V500BD supports Zone 2/3, HD Radio, network streaming commands"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
