---
spec_id: admin/denon-dn-a7100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DN-A7100 Control Spec"
manufacturer: Denon
model_family: DN-A7100
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DN-A7100
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
retrieved_at: 2026-05-14T23:00:23.780Z
last_checked_at: 2026-06-02T22:05:53.570Z
generated_at: 2026-06-02T22:05:53.570Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware version compatibility not stated"
  - "maximum concurrent connection count not stated"
  - "variables not separately documented; all settable parameters"
  - "no multi-step macro sequences described in source"
  - "no explicit safety interlock procedures documented in source"
  - "maximum concurrent TCP connections not stated"
  - "protocol version number not stated (document titled \"Control Protocol Ver.06\")"
  - "firmware version compatibility not stated"
  - "network discovery / IP configuration method not stated"
  - "specific DN-A7100 feature differences vs other models in the protocol document not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:53.570Z
  matched_actions: 182
  action_count: 182
  confidence: medium
  summary: "All 182 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Denon DN-A7100 Control Spec

## Summary
Denon DN-A7100 AV surround receiver with RS-232C and TCP/IP (telnet) control. ASCII protocol using 2-character command codes with parameters terminated by CR (0x0D). Supports main zone, zone 2, zone 3, multi-channel volume, surround modes, tuner, HD radio, network/USB playback, and system management.

<!-- UNRESOLVED: exact firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  connector: DB-9pin female (DCE/slave straight)
  pinout:
    1: GND
    2: TxD
    3: RxD
    5: Common (GND)
    4: NC
    6: NC
    7: NC
    8: NC
    9: NC
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  duplex: half
  max_data_length: 135
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable     # PW ON/STANDBY commands
- queryable     # ? suffix query commands return state
- levelable     # MV, CV volume commands with dB steps
- routable      # SI input source selection
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: PWON
  description: "Power ON. Wait 1 second before sending next command."
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: PWSTANDBY
  description: "Power STANDBY"
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
  command: "MV{level}"
  description: "Direct volume set. 80=0dB, 00=---(MIN), 98=+18dB. 0.5dB steps use 3 chars e.g. MV805=+0.5dB"
  params:
    - name: level
      type: string
      description: "Volume level (00-98, 80=0dB). 0.5dB step uses 3 digits."

- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  command: "CV{channel} UP"
  description: "Channel volume up. Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS. Range 38-62, 50=0dB."
  params:
    - name: channel
      type: string
      description: "Channel code (FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS)"

- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  command: "CV{channel} DOWN"
  params:
    - name: channel
      type: string
      description: "Channel code"

- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  command: "CV{channel} {level}"
  description: "Direct channel volume set. Range 38-62, 50=0dB."
  params:
    - name: channel
      type: string
      description: "Channel code"
    - name: level
      type: integer
      description: "Level value (38-62, 50=0dB)"

- id: channel_volume_reset
  label: Channel Volume Reset All
  kind: action
  command: CVZRL
  description: "Reset all channel levels to factory defaults. Returns CVFL 50 through CVEND."

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
  command: "SI{source}"
  description: "Select input source."
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"

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

- id: main_zone_favorite
  label: Main Zone Favorite Select
  kind: action
  command: "ZMFAVORITE{n}"
  description: "Select favorite 1-4."
  params:
    - name: n
      type: integer
      description: "Favorite number (1-4)"

- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  command: "ZMFAVORITE{n} MEMORY"
  params:
    - name: n
      type: integer
      description: "Favorite number (1-4)"

- id: rec_select
  label: REC OUT Select
  kind: action
  command: "SR{source}"
  description: "Set REC OUT source. SRSOURCE cancels REC mode."
  params:
    - name: source
      type: string
      description: "Source name (same as SI command) or SOURCE to cancel"

- id: input_mode_set
  label: Input Mode Set
  kind: action
  command: "SD{mode}"
  description: "Set input signal mode."
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"

- id: digital_input_mode_set
  label: Digital Input Mode Set
  kind: action
  command: "DC{mode}"
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"

- id: video_select
  label: Video Select
  kind: action
  command: "SV{source}"
  description: "Set video select source. SVSOURCE cancels. SVON/SVOFF enable/disable."
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-AUX7, CD, SOURCE, ON, OFF"

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}"
  description: "Set sleep timer. SLPOFF disables. 001-120 minutes."
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  command: "STBY{setting}"
  params:
    - name: setting
      type: string
      description: "15M, 30M, 60M, OFF"

- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  command: "ECO{mode}"
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  command: "MS{mode}"
  description: "Select surround mode. Many modes available including MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, etc."
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DOLBY SURROUND, DOLBY ATMOS, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-QUICK5"

- id: surround_mode_memory
  label: Surround Mode Quick Select Memory
  kind: action
  command: "MSQUICK{n} MEMORY"
  params:
    - name: n
      type: integer
      description: "Quick select number (1-5)"

- id: video_aspect_set
  label: Video Aspect Ratio Set
  kind: action
  command: "VSASP{mode}"
  params:
    - name: mode
      type: string
      description: "NRM (4:3), FUL (16:9)"

- id: video_monitor_set
  label: Video HDMI Monitor Set
  kind: action
  command: "VSMONI{output}"
  params:
    - name: output
      type: string
      description: "AUTO, 1, 2"

- id: video_resolution_set
  kind: action
  label: Video Resolution Set
  command: "VSSC{resolution}"
  params:
    - name: resolution
      type: string
      description: "48P (480p/576p), 10I (1080i), 72P (720p), 10P (1080p), 10P24 (1080p 24Hz), 4K, 4KF (4K 60/50), AUTO"

- id: video_resolution_hdmi_set
  kind: action
  label: Video Resolution HDMI Set
  command: "VSSCH{resolution}"
  params:
    - name: resolution
      type: string
      description: "48P, 10I, 72P, 10P, 10P24, 4K, 4KF, AUTO"

- id: video_hdmi_audio_set
  label: HDMI Audio Output Set
  kind: action
  command: "VSAUDIO {output}"
  params:
    - name: output
      type: string
      description: "AMP, TV"

- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  command: "VSVPM{mode}"
  params:
    - name: mode
      type: string
      description: "AUTO, GAME, MOVI"

- id: video_vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  command: "VSVST {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: tone_control_set
  label: Tone Control Set
  kind: action
  command: "PSTONE CTRL {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: bass_set
  label: Bass Level Set
  kind: action
  command: "PSBAS {level}"
  description: "Range 00-99, 50=0dB. AVR range -6 to +6 (44-56)."
  params:
    - name: level
      type: string
      description: "00-99, UP, DOWN, or direct value"

- id: treble_set
  label: Treble Level Set
  kind: action
  command: "PSTRE {level}"
  description: "Range 00-99, 50=0dB. AVR range -6 to +6 (44-56)."
  params:
    - name: level
      type: string
      description: "00-99, UP, DOWN, or direct value"

- id: dialog_level_set
  label: Dialog Level Adjust
  kind: action
  command: "PSDIL {param}"
  description: "ON/OFF or direct level. Range 38-62, 50=0dB."
  params:
    - name: param
      type: string
      description: "ON, OFF, UP, DOWN, or direct level value"

- id: subwoofer_level_set
  label: Subwoofer Level Adjust
  kind: action
  command: "PSSWL {param}"
  description: "ON/OFF or direct level. SW(1) range 00,38-62. SW2 range 00,38-62. 50=0dB."
  params:
    - name: param
      type: string
      description: "ON, OFF, UP, DOWN, 2 UP, 2 DOWN, or direct level value"

- id: cinema_eq_set
  label: Cinema EQ Set
  kind: action
  command: "PSCINEMA EQ.{state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: pl2_mode_set
  label: PL2/PL2x/NEO Mode Set
  kind: action
  command: "PSMODE:{mode}"
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"

- id: loudness_management_set
  label: Loudness Management Set
  kind: action
  command: "PSLOM {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: front_height_set
  label: Front Height Output Set
  kind: action
  command: "PSFH:{state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: speaker_output_set
  label: Speaker Output Set
  kind: action
  command: "PSSP:{config}"
  description: "Set speaker configuration (Front Height/Front Wide/Surround Back)."
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"

- id: pl2z_height_gain_set
  label: PL2z Height Gain Set
  kind: action
  command: "PSPHG {level}"
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"

- id: multeq_set
  label: Audyssey MultEQ Set
  kind: action
  command: "PSMULTEQ:{mode}"
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"

- id: dynamic_eq_set
  label: Dynamic EQ Set
  kind: action
  command: "PSDYNEQ {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: reference_level_offset_set
  label: Reference Level Offset Set
  kind: action
  command: "PSREFLEV {offset}"
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15"

- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  command: "PSDYNVOL {mode}"
  params:
    - name: mode
      type: string
      description: "HEV, MED, LIT, OFF"

- id: lfc_set
  label: Audyssey LFC Set
  kind: action
  command: "PSLFC {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {param}"
  description: "Range 00-99. AVR range 1-7 (01-07)."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: audyssey_dsx_set
  label: Audyssey DSX Set
  kind: action
  command: "PSDSX {mode}"
  params:
    - name: mode
      type: string
      description: "ONHW (Height+Wide), ONH (Height), ONW (Width), OFF"

- id: stage_width_set
  label: Stage Width Set
  kind: action
  command: "PSSTW {param}"
  description: "Range 00-99, 50=0dB. AVR range -10 to +10 (40-60)."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: stage_height_set
  label: Stage Height Set
  kind: action
  command: "PSSTH {param}"
  description: "Range 00-99, 50=0dB. AVR range -10 to +10 (40-60)."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: graphic_eq_set
  label: Graphic EQ Set
  kind: action
  command: "PSGEQ {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: dynamic_compression_set
  label: Dynamic Compression Set
  kind: action
  command: "PSDRC {mode}"
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"

- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC {param}"
  description: "Range 00-99, 00=0. AVR range 0-16."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  command: "PSDEH {mode}"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HIGH"

- id: lfe_set
  label: LFE Level Set
  kind: action
  command: "PSLFE {param}"
  description: "Range 00-99, 00=0dB, 10=-10dB. AVR range 0 to -10."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: lfe_level_ext_set
  label: LFE Level External In Set
  kind: action
  command: "PSLFL {level}"
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"

- id: effect_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {param}"
  description: "ON/OFF or level. Range 00-99, 00=0dB. AVR range 1-15."
  params:
    - name: param
      type: string
      description: "ON, OFF, UP, DOWN, or direct value"

- id: delay_set
  label: Delay Set
  kind: action
  command: "PSDEL {param}"
  description: "Range 000-999 (ms). AVR range 0-300ms. 0-60ms: 3ms/step, over 60ms: 10ms/step."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct 3-digit value"

- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {param}"
  description: "Range 000-999 (ms). AVR range 0-200ms."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct 3-digit value"

- id: restorer_set
  label: Audio Restorer Set
  kind: action
  command: "PSRSTR {mode}"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"

- id: front_speaker_set
  label: Front Speaker Set
  kind: action
  command: "PSFRONT {config}"
  params:
    - name: config
      type: string
      description: "SPA, SPB, A+B"

- id: drc_set
  label: Dynamic Range Control Set
  kind: action
  command: "PSDRC {mode}"
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  command: "PV{mode}"
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"

- id: contrast_set
  label: Contrast Set
  kind: action
  command: "PVCN {param}"
  description: "Range 000-100, 050=0. AVR range -50 to +50."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct 3-digit value"

- id: brightness_set
  label: Brightness Set
  kind: action
  command: "PVBR {param}"
  description: "Range 000-100, 050=0. AVR range -50 to +50."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct 3-digit value"

- id: saturation_set
  label: Saturation Set
  kind: action
  command: "PVST {param}"
  description: "Range 000-100, 050=0. AVR range -50 to +50."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct 3-digit value"

- id: hue_set
  label: Hue Set
  kind: action
  command: "PVHUE {param}"
  description: "Range 44-56, 50=0. AVR range -6 to +6."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: dnr_set
  label: DNR Set
  kind: action
  command: "PVDNR {mode}"
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"

- id: enhancer_set
  label: Enhancer Set
  kind: action
  command: "PVENH {param}"
  description: "Range 00-12, 00=0. AVR range 0-12."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone2_source_set
  label: Zone 2 Source Set
  kind: action
  command: "Z2{source}"
  description: "Select zone 2 source. Z2SOURCE cancels (same as main zone)."
  params:
    - name: source
      type: string
      description: "SOURCE or source name (same as SI command values)"

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
  command: "Z2{level}"
  description: "Range 00-98, 80=0dB, 00=---(MIN). Same encoding as master volume."
  params:
    - name: level
      type: string
      description: "Volume level"

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

- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  command: "Z2QUICK{n}"
  params:
    - name: n
      type: integer
      description: "Quick select number (1-5)"

- id: zone2_quick_memory
  label: Zone 2 Quick Select Memory
  kind: action
  command: "Z2QUICK{n} MEMORY"
  params:
    - name: n
      type: integer
      description: "Quick select number (1-5)"

- id: zone2_favorite
  label: Zone 2 Favorite Select
  kind: action
  command: "Z2FAVORITE{n}"
  params:
    - name: n
      type: integer
      description: "Favorite number (1-4)"

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
  command: "Z2CS{mode}"
  params:
    - name: mode
      type: string
      description: "ST, MONO"

- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  command: "Z2CV{channel} {param}"
  description: "FL/FR only. Range 38-62, 50=0dB."
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone2_hpf_set
  label: Zone 2 HPF Set
  kind: action
  command: "Z2HPF{state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: zone2_bass_set
  label: Zone 2 Bass Set
  kind: action
  command: "Z2PSBAS {param}"
  description: "Range 00-99, 50=0dB. AVR range -10 to +10 (40-60)."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone2_treble_set
  label: Zone 2 Treble Set
  kind: action
  command: "Z2PSTRE {param}"
  description: "Range 00-99, 50=0dB. AVR range -10 to +10 (40-60)."
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Set
  kind: action
  command: "Z2HDA {mode}"
  params:
    - name: mode
      type: string
      description: "THR, PCM"

- id: zone2_sleep_timer_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

- id: zone2_auto_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  command: "Z2STBY{setting}"
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"

- id: zone3_source_set
  label: Zone 3 Source Set
  kind: action
  command: "Z3{source}"
  description: "Select zone 3 source. Z3SOURCE cancels."
  params:
    - name: source
      type: string
      description: "SOURCE or source name"

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
  command: "Z3{level}"
  description: "Range 00-98, 80=0dB, 00=---(MIN)."
  params:
    - name: level
      type: string
      description: "Volume level"

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
  command: "Z3CS{mode}"
  params:
    - name: mode
      type: string
      description: "ST, MONO"

- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  command: "Z3CV{channel} {param}"
  description: "FL/FR only. Range 38-62, 50=0dB."
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone3_hpf_set
  label: Zone 3 HPF Set
  kind: action
  command: "Z3HPF{state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  command: "Z3PSBAS {param}"
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  command: "Z3PSTRE {param}"
  params:
    - name: param
      type: string
      description: "UP, DOWN, or direct value"

- id: zone3_sleep_timer_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "OFF or 001-120"

- id: zone3_auto_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  command: "Z3STBY{setting}"
  params:
    - name: setting
      type: string
      description: "2H, 4H, 8H, OFF"

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
  command: "TFAN{freq}"
  description: "6-digit frequency. <050000=FM MHz, >050000=AM kHz."
  params:
    - name: freq
      type: string
      description: "6-digit frequency value"

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
  label: Tuner Preset Set
  kind: action
  command: "TPAN{n}"
  description: "Preset 01-56."
  params:
    - name: n
      type: string
      description: "Preset number (01-56)"

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: TPANMEM
  params: []

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  command: "TMAN{band}"
  params:
    - name: band
      type: string
      description: "AM, FM"

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  command: "TMAN{mode}"
  params:
    - name: mode
      type: string
      description: "AUTO, MANUAL"

- id: hd_radio_freq_set
  label: HD Radio Frequency Set
  kind: action
  command: "TFHD{freq}"
  description: "6-digit frequency for HD radio."
  params:
    - name: freq
      type: string
      description: "6-digit frequency"

- id: hd_radio_multicast_set
  label: HD Radio Multicast Select
  kind: action
  command: "TFHDMC{n}"
  description: "Select multicast channel 1-8, 0=analog."
  params:
    - name: n
      type: string
      description: "Multicast channel (0-8)"

- id: hd_radio_band_set
  label: HD Radio Band Set
  kind: action
  command: "TMHD{band}"
  params:
    - name: band
      type: string
      description: "AM, FM"

- id: hd_radio_mode_set
  label: HD Radio Mode Set
  kind: action
  command: "TMHD{mode}"
  params:
    - name: mode
      type: string
      description: "AUTOHD, AUTO, MANUAL, ANAAUTO, ANAMANU"

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
  label: Network Skip Backward
  kind: action
  command: NS9E
  params: []

- id: network_search_plus
  label: Network Search Forward
  kind: action
  command: NS9F
  params: []

- id: network_search_minus
  label: Network Search Backward
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

- id: network_preset_call
  label: Network Preset Call
  kind: action
  command: "NSB{n}"
  description: "Call preset 00-35 (2014 AVR)."
  params:
    - name: n
      type: string
      description: "Preset number"

- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  command: "NSC{n}"
  params:
    - name: n
      type: string
      description: "Preset number"

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
  description: "Lock panel buttons except master volume."
  params: []

- id: panel_volume_lock_on
  label: Panel and Volume Lock On
  kind: action
  command: SYPANEL+V LOCK ON
  description: "Lock panel buttons and master volume."
  params: []

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  command: SYPANEL LOCK OFF
  params: []

- id: trigger1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON"
  params: []

- id: trigger1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF"
  params: []

- id: trigger2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON"
  params: []

- id: trigger2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF"
  params: []

- id: dimmer_set
  label: Dimmer Set
  kind: action
  command: "DIM {level}"
  description: "SEL toggles through Bright→Dim→Dark→Off."
  params:
    - name: level
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"

- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  command: "RM STA"
  params: []

- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  command: "RM END"
  params: []
- id: panorama_set
  label: Panorama Set
  kind: action
  command: "PSPAN {state}"
  params:
    - name: state
      type: string
      description: "ON, OFF"

- id: dimension_set
  label: Dimension Set
  kind: action
  command: "PSDIM {param}"
  params:
    - name: param
      type: string

- id: center_width_set
  label: Center Width Set
  kind: action
  command: "PSCEN {param}"
  params:
    - name: param
      type: string

- id: center_image_set
  label: Center Image Set
  kind: action
  command: "PSCEI {param}"
  params:
    - name: param
      type: string

- id: center_gain_set
  label: Center Gain Set
  kind: action
  command: "PSCEG {param}"
  params:
    - name: param
      type: string

- id: center_spread_set
  label: Center Spread Set
  kind: action
  command: "PSCES {state}"
  params:
    - name: state
      type: string

- id: subwoofer_sw_set
  label: Subwoofer SW On/Off
  kind: action
  command: "PSSWR {state}"
  params:
    - name: state
      type: string

- id: room_size_set
  label: Room Size Set
  kind: action
  command: "PSRSZ {size}"
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"

- id: auro_matic_preset_set
  label: Auro-Matic 3D Preset
  kind: action
  command: "PSAUROPR {preset}"
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"

- id: auro_matic_strength_set
  label: Auro-Matic 3D Strength
  kind: action
  command: "PSAUROST {param}"
  params:
    - name: param
      type: string

- id: channel_level_menu
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: MNCHL
  params: []

- id: insta_prevue_set
  label: InstaPrevue Set
  kind: action
  command: "MNPRV {state}"
  params:
    - name: state
      type: string

- id: network_ipod_mode_toggle
  label: Network iPod/On-Screen Mode Toggle
  kind: action
  command: NS9W
  params: []

- id: network_page_next
  label: Network Page Next
  kind: action
  command: NS9X
  params: []

- id: network_page_previous
  label: Network Page Previous
  kind: action
  command: NS9Y
  params: []

- id: network_search_stop
  label: Network Manual Search Stop
  kind: action
  command: NS9Z
  params: []

- id: network_favorites_add
  label: Network Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  command: "TPHDMEM{n}"
  params:
    - name: n
      type: string

- id: upgrade_id_display
  label: Upgrade ID Number Display
  kind: action
  command: UGIDN
  params: []
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
  command: MV?
  description: "Returns MV level. 80=0dB, 00=---(MIN). 3-char for 0.5dB steps."

- id: channel_volume
  type: string
  command: CV?
  description: "Returns CV status for all configured speakers ending with CVEND. Each line: CV{channel} {level}."

- id: mute_state
  type: enum
  values: [ON, OFF]
  command: MU?
  response_prefix: MU

- id: input_source
  type: string
  command: SI?
  response_prefix: SI

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  command: ZM?
  response_prefix: ZM

- id: surround_mode
  type: string
  command: MS?
  response_prefix: MS

- id: input_mode
  type: string
  command: SD?
  response_prefix: SD

- id: digital_input_mode
  type: string
  command: DC?
  response_prefix: DC

- id: video_select
  type: string
  command: SV?
  description: "Returns two lines: SV{source} and SVON/SVOFF."

- id: sleep_timer
  type: string
  command: SLP?
  response_prefix: SLP

- id: auto_standby
  type: string
  command: STBY?
  response_prefix: STBY

- id: eco_mode
  type: string
  command: ECO?
  response_prefix: ECO

- id: video_aspect
  type: string
  command: VSASP ?
  response_prefix: VSASP

- id: video_monitor
  type: string
  command: VSMONI ?
  response_prefix: VSMONI

- id: video_resolution
  type: string
  command: VSSC ?
  response_prefix: VSSC

- id: video_resolution_hdmi
  type: string
  command: VSSCH ?
  response_prefix: VSSCH

- id: hdmi_audio_output
  type: string
  command: VSAUDIO ?
  response_prefix: VSAUDIO

- id: video_processing_mode
  type: string
  command: VSVPM ?
  response_prefix: VSVPM

- id: vertical_stretch
  type: string
  command: VSVST ?
  response_prefix: VSVST

- id: tone_control
  type: string
  command: PSTONE CTRL ?
  response_prefix: PSTONE CTRL

- id: bass_level
  type: string
  command: PSBAS ?
  response_prefix: PSBAS

- id: treble_level
  type: string
  command: PSTRE ?
  response_prefix: PSTRE

- id: cinema_eq
  type: string
  command: PSCINEMA EQ. ?
  response_prefix: PSCINEMA EQ.

- id: loudness_management
  type: string
  command: PSLOM ?
  response_prefix: PSLOM

- id: multeq_mode
  type: string
  command: PSMULTEQ ?
  response_prefix: PSMULTEQ

- id: dynamic_eq
  type: string
  command: PSDYNEQ ?
  response_prefix: PSDYNEQ

- id: reference_level_offset
  type: string
  command: PSREFLEV ?
  response_prefix: PSREFLEV

- id: dynamic_volume
  type: string
  command: PSDYNVOL ?
  response_prefix: PSDYNVOL

- id: lfc_state
  type: string
  command: PSLFC ?
  response_prefix: PSLFC

- id: containment_amount
  type: string
  command: PSCNTAMT ?
  response_prefix: PSCNTAMT

- id: picture_mode
  type: string
  command: PV?
  response_prefix: PV

- id: contrast_level
  type: string
  command: PVCN ?
  response_prefix: PVCN

- id: brightness_level
  type: string
  command: PVBR ?
  response_prefix: PVBR

- id: saturation_level
  type: string
  command: PVST ?
  response_prefix: PVST

- id: hue_level
  type: string
  command: PVHUE ?
  response_prefix: PVHUE

- id: dnr_state
  type: string
  command: PVDNR ?
  response_prefix: PVDNR

- id: enhancer_level
  type: string
  command: PVENH ?
  response_prefix: PVENH

- id: zone2_state
  type: enum
  values: [ON, OFF]
  command: Z2?
  response_prefix: Z2

- id: zone2_mute
  type: enum
  values: [ON, OFF]
  command: Z2MU?
  response_prefix: Z2MU

- id: zone2_channel
  type: string
  command: Z2CS?
  response_prefix: Z2CS

- id: zone2_channel_volume
  type: string
  command: Z2CV?
  response_prefix: Z2CV

- id: zone2_hpf
  type: string
  command: Z2HPF?
  response_prefix: Z2HPF

- id: zone2_bass
  type: string
  command: Z2PSBAS ?
  response_prefix: Z2PSBAS

- id: zone2_treble
  type: string
  command: Z2PSTRE ?
  response_prefix: Z2PSTRE

- id: zone2_hdmi_audio
  type: string
  command: Z2HDA?
  response_prefix: Z2HDA

- id: zone2_sleep_timer
  type: string
  command: Z2SLP?
  response_prefix: Z2SLP

- id: zone2_auto_standby
  type: string
  command: Z2STBY?
  response_prefix: Z2STBY

- id: zone3_state
  type: enum
  values: [ON, OFF]
  command: Z3?
  response_prefix: Z3

- id: zone3_mute
  type: enum
  values: [ON, OFF]
  command: Z3MU?
  response_prefix: Z3MU

- id: zone3_channel
  type: string
  command: Z3CS?
  response_prefix: Z3CS

- id: zone3_channel_volume
  type: string
  command: Z3CV?
  response_prefix: Z3CV

- id: zone3_hpf
  type: string
  command: Z3HPF?
  response_prefix: Z3HPF

- id: zone3_bass
  type: string
  command: Z3PSBAS ?
  response_prefix: Z3PSBAS

- id: zone3_treble
  type: string
  command: Z3PSTRE ?
  response_prefix: Z3PSTRE

- id: zone3_sleep_timer
  type: string
  command: Z3SLP?
  response_prefix: Z3SLP

- id: zone3_auto_standby
  type: string
  command: Z3STBY?
  response_prefix: Z3STBY

- id: tuner_frequency
  type: string
  command: TFAN?
  response_prefix: TFAN
  description: "Returns 6-digit frequency."

- id: tuner_preset
  type: string
  command: TPAN?
  response_prefix: TPAN

- id: tuner_band
  type: string
  command: TMAN?
  response_prefix: TMAN

- id: tuner_rds_name
  type: string
  command: TFANNAME?
  description: "Returns RDS station name (EU/AP only)."

- id: hd_radio_status
  type: string
  command: HD?
  description: "Returns band, station name, multicast channel, signal level, artist, title, album, genre."

- id: trigger_status
  type: string
  command: TR?
  description: "Returns TR1 ON/OFF and TR2 ON/OFF."

- id: dimmer_state
  type: string
  command: DIM ?
  response_prefix: DIM

- id: remote_maintenance_state
  type: enum
  values: [ON, OFF]
  command: "RM ?"
  description: "Returns RM ON or RM OFF."

- id: setup_menu_state
  type: string
  command: MNMEN?
  response_prefix: MNMEN

- id: all_zone_stereo_state
  type: string
  command: MNZST?
  response_prefix: MNZST

- id: speaker_output_config
  type: string
  command: "PSSP: ?"
  response_prefix: "PSSP:"

- id: front_speaker_config
  type: string
  command: PSFRONT?
  response_prefix: PSFRONT

- id: network_onscreen_ascii
  type: string
  command: NSA
  description: "Returns onscreen display info as ASCII (NSA0-NSA8)."

- id: network_onscreen_utf8
  type: string
  command: NSE
  description: "Returns onscreen display info as UTF-8 (NSE0-NSE8)."

- id: network_preset_names
  type: string
  command: NSH
  description: "Returns preset names NSH00-NSH35."
```

## Variables
```yaml
# UNRESOLVED: variables not separately documented; all settable parameters
# are captured as Actions with direct-value params.
```

## Events
```yaml
- id: power_event
  description: "Sent when power state changes. Format: PWON or PWSTANDBY."
  prefix: PW

- id: master_volume_event
  description: "Sent when master volume changes. Format: MV{level}."
  prefix: MV

- id: channel_volume_event
  description: "Sent when channel volume(s) change (e.g. on input source change). Multiple CV lines ending with CVEND."
  prefix: CV

- id: mute_event
  description: "Sent when mute state changes. Format: MUON or MUOFF."
  prefix: MU

- id: input_source_event
  description: "Sent when input source changes. Format: SI{source}."
  prefix: SI

- id: main_zone_event
  description: "Sent when main zone on/off changes. Format: ZMON or ZMOFF."
  prefix: ZM

- id: surround_mode_event
  description: "Sent when surround mode changes. Before returning new mode, present mode is returned first."
  prefix: MS

- id: zone2_event
  description: "Sent when zone 2 state changes."
  prefix: Z2

- id: zone3_event
  description: "Sent when zone 3 state changes."
  prefix: Z3

- id: tuner_frequency_event
  description: "Sent when tuner frequency changes."
  prefix: TF

- id: tuner_preset_event
  description: "Sent when tuner preset changes."
  prefix: TP
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Wait 1 second after PWON before sending next command (source note J)."
  - "Send commands at 50ms minimum intervals."
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- Commands are ASCII, format: `COMMAND + PARAMETER + CR (0x0D)`. Commands are 2 characters, parameters up to 25 characters.
- Query format: `COMMAND + ? + CR`. Response sent within 200ms.
- Events are unsolicited, sent within 5 seconds of state change.
- COMMAND is receivable during EVENT transmission.
- Channel volume and surround mode events fire on input source change if the values differ from previous source.
- Volume encoding: 80=0dB, 00=---(MIN), 98=+18dB. 0.5dB steps use 3 ASCII characters (e.g. MV805=+0.5dB, MV795=-0.5dB).
- Channel volume range: 38-62, 50=0dB.
- Maximum data length: 135 bytes per message.
- Half-duplex communication on both RS-232 and Ethernet.

<!-- UNRESOLVED: maximum concurrent TCP connections not stated -->
<!-- UNRESOLVED: protocol version number not stated (document titled "Control Protocol Ver.06") -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: network discovery / IP configuration method not stated -->
<!-- UNRESOLVED: specific DN-A7100 feature differences vs other models in the protocol document not stated -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - assets.denon.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://assets.denon.com/documentmaster/us/heos_cli_protocol_specification_290616.pdf
retrieved_at: 2026-05-14T23:00:23.780Z
last_checked_at: 2026-06-02T22:05:53.570Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:53.570Z
matched_actions: 182
action_count: 182
confidence: medium
summary: "All 182 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware version compatibility not stated"
- "maximum concurrent connection count not stated"
- "variables not separately documented; all settable parameters"
- "no multi-step macro sequences described in source"
- "no explicit safety interlock procedures documented in source"
- "maximum concurrent TCP connections not stated"
- "protocol version number not stated (document titled \"Control Protocol Ver.06\")"
- "firmware version compatibility not stated"
- "network discovery / IP configuration method not stated"
- "specific DN-A7100 feature differences vs other models in the protocol document not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
