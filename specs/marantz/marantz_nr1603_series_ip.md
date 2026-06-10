---
spec_id: admin/marantz-nr1603-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR1603 Series Control Spec"
manufacturer: Marantz
model_family: "NR1603 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "NR1603 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:57:15.634Z
last_checked_at: 2026-06-09T13:42:11.765Z
generated_at: 2026-06-09T13:42:11.765Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "Complete event catalog - source lists event types but full event taxonomy not enumerated"
  - "no safety warnings or interlock procedures in source."
  - "firmware version not stated. UNRESOLVED: specific model variant (NR1603 vs related models) compatibility not distinguished. UNRESOLVED: voltage/current/power specs not in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T13:42:11.765Z
  matched_actions: 271
  action_count: 271
  confidence: medium
  summary: "All 271 spec actions confirmed in source with matching wire tokens and shapes; transport parameters port 23 and 9600bps are verbatim in source; source command count equals spec count at spec granularity. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz NR1603 Series Control Spec

## Summary
Marantz NR1603 Series AV receiver supports both RS-232C and TCP/IP (Telnet) control. ASCII-based command protocol with 2-character commands + parameters + CR (0x0D). Supports power, volume, input routing, surround mode, multi-zone control, tuner, and network/Bluetooth playback. No authentication required.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (Telnet) stated in source
serial:
  baud_rate: 9600  # 9600bps stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWON/PWSTANDBY commands present
- levelable        # MV, CV, PS commands for volume/gain/bass/treble
- queryable        # ? suffix commands return status
- routable         # SI, ZM, Z2, Z3 for input/zone routing
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: PWON<CR>

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: PWSTANDBY<CR>

- id: power_status_query
  label: Power Status Query
  kind: query
  params: []
  command: PW?<CR>

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
  command: MVUP<CR>

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
  command: MVDOWN<CR>

- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: Volume 00-98, 80=0dB, 00=--- (MIN). e.g. MV80<CR> for 0dB
  command: MV{level}<CR>

- id: master_volume_query
  label: Master Volume Query
  kind: query
  params: []
  command: MV?<CR>

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: MUON<CR>

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: MUOFF<CR>

- id: mute_query
  label: Mute Status Query
  kind: query
  params: []
  command: MU?<CR>

- id: select_input
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
  command: SI{source}<CR>

- id: input_query
  label: Input Source Query
  kind: query
  params: []
  command: SI?<CR>

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
  command: ZMON<CR>

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
  command: ZMOFF<CR>

- id: main_zone_query
  label: Main Zone Query
  kind: query
  params: []
  command: ZM?<CR>

- id: surround_mode_set
  label: Surround Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, etc.
  command: MS{mode}<CR>

- id: surround_mode_query
  label: Surround Mode Query
  kind: query
  params: []
  command: MS?<CR>

- id: channel_volume
  label: Channel Volume Control
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (38-62, 50=0dB)
  command: CV{channel} {direction}<CR>

- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []
  command: CVZRL<CR>

- id: channel_volume_query
  label: Channel Volume Query
  kind: query
  params: []
  command: CV?<CR>

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120, 010=10min. 0=OFF
  command: SLP{minutes:03d}<CR>

- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  params: []
  command: SLP?<CR>

- id: auto_standby_set
  label: Auto Standby Setting
  kind: action
  params:
    - name: duration
      type: string
      description: 15M, 30M, 60M, OFF
  command: STBY{duration}<CR>

- id: auto_standby_query
  label: Auto Standby Query
  kind: query
  params: []
  command: STBY?<CR>

- id: eco_mode_set
  label: ECO Mode Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
  command: ECO{mode}<CR>

- id: eco_mode_query
  label: ECO Mode Query
  kind: query
  params: []
  command: ECO?<CR>

- id: tone_control_on
  label: Tone Control On
  kind: action
  params: []
  command: PSTONE CTRL ON<CR>

- id: tone_control_off
  label: Tone Control Off
  kind: action
  params: []
  command: PSTONE CTRL OFF<CR>

- id: tone_control_query
  label: Tone Control Query
  kind: query
  params: []
  command: PSTONE CTRL ?<CR>

- id: bass_adjust
  label: Bass Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (00-99, 50=0dB, range 44-56 = -6 to +6dB)
  command: PSBAS {direction}<CR>

- id: treble_adjust
  label: Treble Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (00-99, 50=0dB, range 44-56 = -6 to +6dB)
  command: PSTRE {direction}<CR>

- id: dialog_level_adjust
  label: Dialog Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, ON, OFF, or value (38-62, 50=0dB)
  command: PSDIL {direction}<CR>

- id: subwoofer_level_adjust
  label: Subwoofer Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, ON, OFF, SW2 UP/DOWN for subwoofer 2
  command: PSSWL {direction}<CR>

- id: cinema_eq_set
  label: Cinema EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSCINEMA EQ.{state}<CR>

- id: multieq_set
  label: MultEQ Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
  command: PSMULTEQ:{mode}<CR>

- id: dynamic_eq_set
  label: Dynamic EQ On/Off
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSDYNEQ {state}<CR>

- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED, LIT, OFF
  command: PSDYNVOL {level}<CR>

- id: digital_input_select
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO
  command: SD{mode}<CR>

- id: digital_input_codec_set
  label: Digital Input Codec Set
  kind: action
  params:
    - name: codec
      type: string
      description: AUTO, PCM, DTS
  command: DC{codec}<CR>

- id: video_select_set
  label: Video Select Set
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1-7, CD, SOURCE, ON, OFF
  command: SV{source}<CR>

- id: video_select_query
  label: Video Select Query
  kind: query
  params: []
  command: SV?<CR>

- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD, STM, CTM, DAY, NGT
  command: PV{mode}<CR>

- id: picture_contrast_set
  label: Picture Contrast
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 3-digit value (000-100, 050=0, range -50 to +50)
  command: PVCN {direction}<CR>

- id: picture_brightness_set
  label: Picture Brightness
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 3-digit value (000-100, 050=0, range -50 to +50)
  command: PVBR {direction}<CR>

- id: picture_saturation_set
  label: Picture Saturation
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 3-digit value (000-100, 050=0, range -50 to +50)
  command: PVST {direction}<CR>

- id: picture_hue_set
  label: Picture Hue
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (44-56, 50=0, range -6 to +6)
  command: PVHUE {direction}<CR>

- id: dimmer_set
  label: Display Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)
  command: DIM {level}<CR>

- id: dimmer_query
  label: Dimmer Query
  kind: query
  params: []
  command: DIM ?<CR>

- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: freq
      type: string
      description: 6-digit frequency. AM >050000, FM <050000. e.g. TFAN105000<CR>
  command: TFAN{freq}<CR>

- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
  command: TFANUP<CR>

- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
  command: TFANDOWN<CR>

- id: tuner_frequency_query
  label: Tuner Frequency Query
  kind: query
  params: []
  command: TFAN?<CR>

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
  command: TPANUP<CR>

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
  command: TPANDOWN<CR>

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
  command: TPAN{preset:02d}<CR>

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  params: []
  command: TPAN?<CR>

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
  command: TPANMEM{preset:02d}<CR>

- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM)
  command: TM{band}<CR>

- id: tuner_mode_set
  label: Tuner Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: ANAUTO (Auto), ANMANUAL (Manual)
  command: TM{mode}<CR>

- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
  command: Z2ON<CR>

- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
  command: Z2OFF<CR>

- id: zone2_source_select
  label: Zone2 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: SOURCE, PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1-7, BT, USB/IPOD, USB, IPD, IRP, FVP
  command: Z2{source}<CR>

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
  command: Z2UP<CR>

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
  command: Z2DOWN<CR>

- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: 00-98, 80=0dB, 00=---(MIN)
  command: Z2{level}<CR>

- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []
  command: Z2MUON<CR>

- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []
  command: Z2MUOFF<CR>

- id: zone2_query
  label: Zone2 Query
  kind: query
  params: []
  command: Z2?<CR>

- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
  command: Z3ON<CR>

- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
  command: Z3OFF<CR>

- id: zone3_source_select
  label: Zone3 Source Select
  kind: action
  params:
    - name: source
      type: string
      description: Same as Zone2 source list
  command: Z3{source}<CR>

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
  command: Z3UP<CR>

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
  command: Z3DOWN<CR>

- id: zone3_query
  label: Zone3 Query
  kind: query
  params: []
  command: Z3?<CR>

- id: trigger_set
  label: Trigger Set
  kind: action
  params:
    - name: num
      type: integer
      description: 1 or 2
    - name: state
      type: string
      description: ON, OFF
  command: TR{num} {state}<CR>

- id: trigger_query
  label: Trigger Query
  kind: query
  params: []
  command: TR?<CR>

- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
  command: SYREMOTE LOCK ON<CR>

- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
  command: SYREMOTE LOCK OFF<CR>

- id: panel_lock_on
  label: Panel Lock On
  kind: action
  params: []
  command: SYPANEL LOCK ON<CR>

- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
  command: SYPANEL LOCK OFF<CR>

- id: menu_on
  label: Setup Menu On
  kind: action
  params: []
  command: MNMEN ON<CR>

- id: menu_off
  label: Setup Menu Off
  kind: action
  params: []
  command: MNMEN OFF<CR>

- id: menu_query
  label: Menu Query
  kind: query
  params: []
  command: MNMEN?<CR>

- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
  command: MNZST ON<CR>

- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
  command: MNZST OFF<CR>

- id: all_zone_stereo_query
  label: All Zone Stereo Query
  kind: query
  params: []
  command: MNZST?<CR>

- id: network_cursor
  label: Network Cursor Control
  kind: action
  params:
    - name: direction
      type: string
      description: "90=Up, 91=Down, 92=Left, 93=Right, 94=Enter/Play/Pause, 9A-9D=other controls"
  command: NS{direction}<CR>

- id: network_repeat
  label: Network Repeat Toggle
  kind: action
  params: []
  command: NSRPT<CR>

- id: network_random
  label: Network Random Toggle
  kind: action
  params: []
  command: NSRND<CR>
- id: zm_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: ZMFAVORITE{num}<CR>

- id: zm_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: ZMFAVORITE{num} MEMORY<CR>

- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: MSQUICK{preset}<CR>

- id: quick_select_memory
  label: Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: MSQUICK{preset} MEMORY<CR>

- id: quick_select_query
  label: Quick Select Query
  kind: query
  params: []
  command: MSQUICK ?<CR>

- id: rec_select
  label: Record Select Source
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, NET, AUX1-7, BT, USB, IPD, IRP, FVP, SOURCE
  command: SR{source}<CR>

- id: rec_select_query
  label: Record Select Query
  kind: query
  params: []
  command: SR?<CR>

- id: vs_aspect_ratio_set
  label: VS Aspect Ratio Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"
  command: VS{mode}<CR>

- id: vs_aspect_ratio_query
  label: VS Aspect Ratio Query
  kind: query
  params: []
  command: VSASP ?<CR>

- id: vs_hdmi_monitor_set
  label: VS HDMI Monitor Set
  kind: action
  params:
    - name: mode
      type: string
      description: MONIAUTO, MONI1, MONI2
  command: VS{mode}<CR>

- id: vs_hdmi_monitor_query
  label: VS HDMI Monitor Query
  kind: query
  params: []
  command: VSMONI ?<CR>

- id: vs_resolution_set
  label: VS Resolution Set
  kind: action
  params:
    - name: mode
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO
  command: VS{mode}<CR>

- id: vs_resolution_query
  label: VS Resolution Query
  kind: query
  params: []
  command: VSSC ?<CR>

- id: vs_hdmi_resolution_set
  label: VS HDMI Resolution Set
  kind: action
  params:
    - name: mode
      type: string
      description: SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO
  command: VS{mode}<CR>

- id: vs_hdmi_resolution_query
  label: VS HDMI Resolution Query
  kind: query
  params: []
  command: VSSCH ?<CR>

- id: vs_hdmi_audio_set
  label: VS HDMI Audio Output Set
  kind: action
  params:
    - name: mode
      type: string
      description: AMP, TV
  command: VSAUDIO {mode}<CR>

- id: vs_hdmi_audio_query
  label: VS HDMI Audio Output Query
  kind: query
  params: []
  command: VSAUDIO ?<CR>

- id: vs_video_processing_mode_set
  label: VS Video Processing Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI
  command: VSVPM{mode}<CR>

- id: vs_video_processing_mode_query
  label: VS Video Processing Mode Query
  kind: query
  params: []
  command: VSVPM ?<CR>

- id: vs_vertical_stretch_set
  label: VS Vertical Stretch Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: VSVST {state}<CR>

- id: vs_vertical_stretch_query
  label: VS Vertical Stretch Query
  kind: query
  params: []
  command: VSVST ?<CR>

- id: pv_query
  label: Picture Mode Query
  kind: query
  params: []
  command: PV?<CR>

- id: pv_contrast_query
  label: Picture Contrast Query
  kind: query
  params: []
  command: PVCN ?<CR>

- id: pv_brightness_query
  label: Picture Brightness Query
  kind: query
  params: []
  command: PVBR ?<CR>

- id: pv_saturation_query
  label: Picture Saturation Query
  kind: query
  params: []
  command: PVST ?<CR>

- id: pv_hue_query
  label: Picture Hue Query
  kind: query
  params: []
  command: PVHUE ?<CR>

- id: pv_dnr_set
  label: Picture DNR Set
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, LOW, MID, HI
  command: PVDNR {mode}<CR>

- id: pv_dnr_query
  label: Picture DNR Query
  kind: query
  params: []
  command: PVDNR ?<CR>

- id: pv_enhancer_adjust
  label: Picture Enhancer Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-12
  command: PVENH {direction}<CR>

- id: pv_enhancer_query
  label: Picture Enhancer Query
  kind: query
  params: []
  command: PVENH ?<CR>

- id: digital_input_query
  label: Digital Input Query
  kind: query
  params: []
  command: SD?<CR>

- id: digital_input_codec_query
  label: Digital Input Codec Query
  kind: query
  params: []
  command: DC?<CR>

- id: tuner_band_query
  label: Tuner Band Mode Query
  kind: query
  params: []
  command: TMAN?<CR>

- id: tuner_rds_name_query
  label: Tuner RDS Station Name Query
  kind: query
  params: []
  command: TFANNAME?<CR>

- id: bass_query
  label: Bass Query
  kind: query
  params: []
  command: PSBAS ?<CR>

- id: treble_query
  label: Treble Query
  kind: query
  params: []
  command: PSTRE ?<CR>

- id: dialog_level_query
  label: Dialog Level Query
  kind: query
  params: []
  command: PSDIL ?<CR>

- id: subwoofer_level_query
  label: Subwoofer Level Query
  kind: query
  params: []
  command: PSSWL ?<CR>

- id: subwoofer2_level_adjust
  label: Subwoofer 2 Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (00,38-62, 50=0dB)
  command: PSSWL2 {direction}<CR>

- id: cinema_eq_query
  label: Cinema EQ Query
  kind: query
  params: []
  command: PSCINEMA EQ. ?<CR>

- id: multieq_query
  label: MultEQ Query
  kind: query
  params: []
  command: PSMULTEQ: ?<CR>

- id: dynamic_eq_query
  label: Dynamic EQ Query
  kind: query
  params: []
  command: PSDYNEQ ?<CR>

- id: dynamic_volume_query
  label: Dynamic Volume Query
  kind: query
  params: []
  command: PSDYNVOL ?<CR>

- id: ps_mode_set
  label: PS Surround Sub-mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: MUSIC, CINEMA, GAME, PRO LOGIC
  command: PSMODE:{mode}<CR>

- id: ps_mode_query
  label: PS Surround Sub-mode Query
  kind: query
  params: []
  command: PSMODE: ?<CR>

- id: ps_loudness_management_set
  label: Loudness Management Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSLOM {state}<CR>

- id: ps_loudness_management_query
  label: Loudness Management Query
  kind: query
  params: []
  command: PSLOM ?<CR>

- id: ps_front_height_set
  label: PS Front Height Output Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSFH:{state}<CR>

- id: ps_front_height_query
  label: PS Front Height Output Query
  kind: query
  params: []
  command: PSFH: ?<CR>

- id: ps_speaker_output_set
  label: PS Speaker Output Set
  kind: action
  params:
    - name: mode
      type: string
      description: FW, FH, SB, HW, BH, BW, FL, HF, FR
  command: PSSP:{mode}<CR>

- id: ps_speaker_output_query
  label: PS Speaker Output Query
  kind: query
  params: []
  command: PSSP: ?<CR>

- id: ps_pl2z_height_gain_set
  label: PS PL2z Height Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: LOW, MID, HI
  command: PSPHG {level}<CR>

- id: ps_pl2z_height_gain_query
  label: PS PL2z Height Gain Query
  kind: query
  params: []
  command: PSPHG ?<CR>

- id: ps_reference_level_offset_set
  label: PS Reference Level Offset Set
  kind: action
  params:
    - name: level
      type: string
      description: 0, 5, 10, 15
  command: PSREFLEV {level}<CR>

- id: ps_reference_level_offset_query
  label: PS Reference Level Offset Query
  kind: query
  params: []
  command: PSREFLEV ?<CR>

- id: ps_audyssey_lfc_set
  label: PS Audyssey LFC Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSLFC {state}<CR>

- id: ps_audyssey_lfc_query
  label: PS Audyssey LFC Query
  kind: query
  params: []
  command: PSLFC ?<CR>

- id: ps_containment_amount_adjust
  label: PS Containment Amount Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 01-07
  command: PSCNTAMT {direction}<CR>

- id: ps_containment_amount_query
  label: PS Containment Amount Query
  kind: query
  params: []
  command: PSCNTAMT ?<CR>

- id: ps_audyssey_dsx_set
  label: PS Audyssey DSX Set
  kind: action
  params:
    - name: mode
      type: string
      description: ONHW, ONH, ONW, OFF
  command: PSDSX {mode}<CR>

- id: ps_audyssey_dsx_query
  label: PS Audyssey DSX Query
  kind: query
  params: []
  command: PSDSX ?<CR>

- id: ps_stage_width_adjust
  label: PS Stage Width Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: PSSTW {direction}<CR>

- id: ps_stage_width_query
  label: PS Stage Width Query
  kind: query
  params: []
  command: PSSTW ?<CR>

- id: ps_stage_height_adjust
  label: PS Stage Height Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: PSSTH {direction}<CR>

- id: ps_stage_height_query
  label: PS Stage Height Query
  kind: query
  params: []
  command: PSSTH ?<CR>

- id: ps_graphic_eq_set
  label: PS Graphic EQ Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSGEQ {state}<CR>

- id: ps_graphic_eq_query
  label: PS Graphic EQ Query
  kind: query
  params: []
  command: PSGEQ ?<CR>

- id: ps_dynamic_compression_set
  label: PS Dynamic Compression Set
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, LOW, MID, HI, OFF
  command: PSDRC {mode}<CR>

- id: ps_dynamic_compression_query
  label: PS Dynamic Compression Query
  kind: query
  params: []
  command: PSDRC ?<CR>

- id: ps_bass_sync_adjust
  label: PS Bass Sync Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-16
  command: PSBSC {direction}<CR>

- id: ps_bass_sync_query
  label: PS Bass Sync Query
  kind: query
  params: []
  command: PSBSC ?<CR>

- id: ps_dialogue_enhancer_set
  label: PS Dialogue Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MED, HIGH
  command: PSDEH {level}<CR>

- id: ps_dialogue_enhancer_query
  label: PS Dialogue Enhancer Query
  kind: query
  params: []
  command: PSDEH ?<CR>

- id: ps_lfe_adjust
  label: PS LFE Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-10 (0 to -10dB)
  command: PSLFE {direction}<CR>

- id: ps_lfe_query
  label: PS LFE Level Query
  kind: query
  params: []
  command: PSLFE ?<CR>

- id: ps_lfe_filter_level_set
  label: PS LFE Filter Level Set
  kind: action
  params:
    - name: level
      type: string
      description: 00, 05, 10, 15
  command: PSLFL {level}<CR>

- id: ps_lfe_filter_level_query
  label: PS LFE Filter Level Query
  kind: query
  params: []
  command: PSLFL ?<CR>

- id: ps_effect_set
  label: PS Effect Set
  kind: action
  params:
    - name: value
      type: string
      description: ON, OFF, UP, DOWN, or 2-digit level 01-15
  command: PSEFF {value}<CR>

- id: ps_effect_query
  label: PS Effect Query
  kind: query
  params: []
  command: PSEFF ?<CR>

- id: ps_delay_adjust
  label: PS Delay Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 3-digit value 000-300 ms
  command: PSDEL {direction}<CR>

- id: ps_delay_query
  label: PS Delay Query
  kind: query
  params: []
  command: PSDEL ?<CR>

- id: ps_panorama_set
  label: PS Panorama Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSPAN {state}<CR>

- id: ps_panorama_query
  label: PS Panorama Query
  kind: query
  params: []
  command: PSPAN ?<CR>

- id: ps_dimension_adjust
  label: PS Dimension Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-06
  command: PSDIM {direction}<CR>

- id: ps_dimension_query
  label: PS Dimension Query
  kind: query
  params: []
  command: PSDIM ?<CR>

- id: ps_center_width_adjust
  label: PS Center Width Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-07
  command: PSCEN {direction}<CR>

- id: ps_center_width_query
  label: PS Center Width Query
  kind: query
  params: []
  command: PSCEN ?<CR>

- id: ps_center_image_adjust
  label: PS Center Image Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-10
  command: PSCEI {direction}<CR>

- id: ps_center_image_query
  label: PS Center Image Query
  kind: query
  params: []
  command: PSCEI ?<CR>

- id: ps_center_gain_adjust
  label: PS Center Gain Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 00-10
  command: PSCEG {direction}<CR>

- id: ps_center_gain_query
  label: PS Center Gain Query
  kind: query
  params: []
  command: PSCEG ?<CR>

- id: ps_center_spread_set
  label: PS Center Spread Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSCES {state}<CR>

- id: ps_center_spread_query
  label: PS Center Spread Query
  kind: query
  params: []
  command: PSCES ?<CR>

- id: ps_sw_direct_set
  label: PS SW Direct Mode Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: PSSWR {state}<CR>

- id: ps_sw_direct_query
  label: PS SW Direct Mode Query
  kind: query
  params: []
  command: PSSWR ?<CR>

- id: ps_room_size_set
  label: PS Room Size Set
  kind: action
  params:
    - name: size
      type: string
      description: S, MS, M, ML, L
  command: PSRSZ {size}<CR>

- id: ps_room_size_query
  label: PS Room Size Query
  kind: query
  params: []
  command: PSRSZ ?<CR>

- id: ps_audio_delay_adjust
  label: PS Audio Delay Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 3-digit value 000-200 ms
  command: PSDELAY {direction}<CR>

- id: ps_audio_delay_query
  label: PS Audio Delay Query
  kind: query
  params: []
  command: PSDELAY ?<CR>

- id: ps_audio_restorer_set
  label: PS Audio Restorer Set
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, LOW, MED, HI
  command: PSRSTR {mode}<CR>

- id: ps_audio_restorer_query
  label: PS Audio Restorer Query
  kind: query
  params: []
  command: PSRSTR ?<CR>

- id: ps_front_speaker_set
  label: PS Front Speaker Set
  kind: action
  params:
    - name: mode
      type: string
      description: SPA, SPB, A+B
  command: PSFRONT {mode}<CR>

- id: ps_front_speaker_query
  label: PS Front Speaker Query
  kind: query
  params: []
  command: PSFRONT?<CR>

- id: ps_auro_preset_set
  label: PS Auro-Matic 3D Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: SMA, MED, LAR, SPE
  command: PSAUROPR {preset}<CR>

- id: ps_auro_preset_query
  label: PS Auro-Matic 3D Preset Query
  kind: query
  params: []
  command: PSAUROPR ?<CR>

- id: ps_auro_strength_adjust
  label: PS Auro-Matic 3D Strength Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value 01-16
  command: PSAUROST {direction}<CR>

- id: ps_auro_strength_query
  label: PS Auro-Matic 3D Strength Query
  kind: query
  params: []
  command: PSAUROST ?<CR>

- id: zone2_mute_query
  label: Zone2 Mute Query
  kind: query
  params: []
  command: Z2MU?<CR>

- id: zone2_channel_set
  label: Zone2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO
  command: Z2CS{mode}<CR>

- id: zone2_channel_query
  label: Zone2 Channel Query
  kind: query
  params: []
  command: Z2CS?<CR>

- id: zone2_channel_volume
  label: Zone2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (38-62, 50=0dB)
  command: Z2CV{channel} {direction}<CR>

- id: zone2_channel_volume_query
  label: Zone2 Channel Volume Query
  kind: query
  params: []
  command: Z2CV?<CR>

- id: zone2_quick_select
  label: Zone2 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: Z2QUICK{preset}<CR>

- id: zone2_quick_select_memory
  label: Zone2 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: Z2QUICK{preset} MEMORY<CR>

- id: zone2_quick_select_query
  label: Zone2 Quick Select Query
  kind: query
  params: []
  command: Z2QUICK ?<CR>

- id: zone2_favorite_select
  label: Zone2 Favorite Select
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: Z2FAVORITE{num}<CR>

- id: zone2_favorite_memory
  label: Zone2 Favorite Memory
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: Z2FAVORITE{num} MEMORY<CR>

- id: zone2_hpf_set
  label: Zone2 HPF Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: Z2HPF{state}<CR>

- id: zone2_hpf_query
  label: Zone2 HPF Query
  kind: query
  params: []
  command: Z2HPF?<CR>

- id: zone2_bass_adjust
  label: Zone2 Bass Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: Z2PSBAS {direction}<CR>

- id: zone2_bass_query
  label: Zone2 Bass Query
  kind: query
  params: []
  command: Z2PSBAS ?<CR>

- id: zone2_treble_adjust
  label: Zone2 Treble Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: Z2PSTRE {direction}<CR>

- id: zone2_treble_query
  label: Zone2 Treble Query
  kind: query
  params: []
  command: Z2PSTRE ?<CR>

- id: zone2_hdmi_audio_set
  label: Zone2 HDMI Audio Set
  kind: action
  params:
    - name: mode
      type: string
      description: THR, PCM
  command: Z2HDA {mode}<CR>

- id: zone2_hdmi_audio_query
  label: Zone2 HDMI Audio Query
  kind: query
  params: []
  command: Z2HDA?<CR>

- id: zone2_sleep_timer_set
  label: Zone2 Sleep Timer Set
  kind: action
  params:
    - name: value
      type: string
      description: OFF, or 001-120 (minutes)
  command: Z2SLP{value}<CR>

- id: zone2_sleep_timer_query
  label: Zone2 Sleep Timer Query
  kind: query
  params: []
  command: Z2SLP?<CR>

- id: zone2_auto_standby_set
  label: Zone2 Auto Standby Set
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF
  command: Z2STBY{duration}<CR>

- id: zone2_auto_standby_query
  label: Zone2 Auto Standby Query
  kind: query
  params: []
  command: Z2STBY?<CR>

- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: 00-98, 80=0dB, 00=--- (MIN)
  command: Z3{level}<CR>

- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []
  command: Z3MUON<CR>

- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []
  command: Z3MUOFF<CR>

- id: zone3_mute_query
  label: Zone3 Mute Query
  kind: query
  params: []
  command: Z3MU?<CR>

- id: zone3_channel_set
  label: Zone3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: ST, MONO
  command: Z3CS{mode}<CR>

- id: zone3_channel_query
  label: Zone3 Channel Query
  kind: query
  params: []
  command: Z3CS?<CR>

- id: zone3_channel_volume
  label: Zone3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (38-62, 50=0dB)
  command: Z3CV{channel} {direction}<CR>

- id: zone3_channel_volume_query
  label: Zone3 Channel Volume Query
  kind: query
  params: []
  command: Z3CV?<CR>

- id: zone3_quick_select
  label: Zone3 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: Z3QUICK{preset}<CR>

- id: zone3_quick_select_memory
  label: Zone3 Quick Select Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-5
  command: Z3QUICK{preset} MEMORY<CR>

- id: zone3_quick_select_query
  label: Zone3 Quick Select Query
  kind: query
  params: []
  command: Z3QUICK ?<CR>

- id: zone3_favorite_select
  label: Zone3 Favorite Select
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: Z3FAVORITE{num}<CR>

- id: zone3_favorite_memory
  label: Zone3 Favorite Memory
  kind: action
  params:
    - name: num
      type: integer
      description: 1, 2, 3, or 4
  command: Z3FAVORITE{num} MEMORY<CR>

- id: zone3_hpf_set
  label: Zone3 HPF Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: Z3HPF{state}<CR>

- id: zone3_hpf_query
  label: Zone3 HPF Query
  kind: query
  params: []
  command: Z3HPF?<CR>

- id: zone3_bass_adjust
  label: Zone3 Bass Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: Z3PSBAS {direction}<CR>

- id: zone3_bass_query
  label: Zone3 Bass Query
  kind: query
  params: []
  command: Z3PSBAS ?<CR>

- id: zone3_treble_adjust
  label: Zone3 Treble Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: UP, DOWN, or 2-digit value (40-60, 50=0dB)
  command: Z3PSTRE {direction}<CR>

- id: zone3_treble_query
  label: Zone3 Treble Query
  kind: query
  params: []
  command: Z3PSTRE ?<CR>

- id: zone3_sleep_timer_set
  label: Zone3 Sleep Timer Set
  kind: action
  params:
    - name: value
      type: string
      description: OFF, or 001-120 (minutes)
  command: Z3SLP{value}<CR>

- id: zone3_sleep_timer_query
  label: Zone3 Sleep Timer Query
  kind: query
  params: []
  command: Z3SLP?<CR>

- id: zone3_auto_standby_set
  label: Zone3 Auto Standby Set
  kind: action
  params:
    - name: duration
      type: string
      description: 2H, 4H, 8H, OFF
  command: Z3STBY{duration}<CR>

- id: zone3_auto_standby_query
  label: Zone3 Auto Standby Query
  kind: query
  params: []
  command: Z3STBY?<CR>

- id: hd_frequency_up
  label: HD Radio Frequency Up
  kind: action
  params: []
  command: TFHDUP<CR>

- id: hd_frequency_down
  label: HD Radio Frequency Down
  kind: action
  params: []
  command: TFHDDOWN<CR>

- id: hd_frequency_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: freq
      type: string
      description: 6-digit frequency (AM >050000, FM <050000)
  command: TFHD{freq}<CR>

- id: hd_multicast_select
  label: HD Radio Multicast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: 1-8 (HD multicast), 0 (Analog)
  command: TFHDMC{channel}<CR>

- id: hd_frequency_multicast_set
  label: HD Radio Frequency and Multicast Set
  kind: action
  params:
    - name: freq
      type: string
      description: 6-digit frequency
    - name: channel
      type: integer
      description: multicast channel 0-8
  command: TFHD{freq}MC{channel}<CR>

- id: hd_frequency_query
  label: HD Radio Frequency Query
  kind: query
  params: []
  command: TFHD?<CR>

- id: hd_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
  command: TPHDUP<CR>

- id: hd_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
  command: TPHDDOWN<CR>

- id: hd_preset_select
  label: HD Radio Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
  command: TPHD{preset}<CR>

- id: hd_preset_query
  label: HD Radio Preset Query
  kind: query
  params: []
  command: TPHD?<CR>

- id: hd_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
  command: TPHDMEM{preset}<CR>

- id: hd_band_mode_set
  label: HD Radio Band and Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
  command: TM{mode}<CR>

- id: hd_band_mode_query
  label: HD Radio Band Mode Query
  kind: query
  params: []
  command: TMHD?<CR>

- id: hd_status_query
  label: HD Radio Status Query
  kind: query
  params: []
  command: HD?<CR>

- id: network_extended_control
  label: Network Extended Control
  kind: action
  params:
    - name: code
      type: string
      description: 9E (Skip-), 9F (Manual Search+/-), 9G, 9H (Repeat One), 9I (Repeat All), 9J (Repeat Off), 9K (Random On), 9M (Random Off), 9W (Toggle iPod/OSD), 9X (Page Next), 9Y (Page Prev), 9Z (Manual Search Stop)
  command: NS{code}<CR>

- id: ns_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: 00-35
  command: NSB{preset}<CR>

- id: ns_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: 00-35
  command: NSC{preset}<CR>

- id: ns_preset_name_query
  label: Network Preset Name Query
  kind: query
  params: []
  command: NSH<CR>

- id: ns_favorites_add
  label: Network Add Favorites Folder
  kind: action
  params: []
  command: NSFV MEM<CR>

- id: ns_display_info_ascii
  label: Network On-Screen Display Info ASCII
  kind: query
  params: []
  command: NSA<CR>

- id: ns_display_info_utf8
  label: Network On-Screen Display Info UTF-8
  kind: query
  params: []
  command: NSE<CR>

- id: mn_cursor_control
  label: Menu Cursor Control
  kind: action
  params:
    - name: direction
      type: string
      description: CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF
  command: MN{direction}<CR>

- id: mn_channel_level_menu
  label: Menu Channel Level Adjust
  kind: action
  params: []
  command: MNCHL<CR>

- id: mn_instaprevue_set
  label: Menu InstaPrevue Set
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
  command: MNPRV {state}<CR>

- id: mn_instaprevue_query
  label: Menu InstaPrevue Query
  kind: query
  params: []
  command: MNPRV?<CR>

- id: panel_volume_lock_on
  label: Panel and Volume Lock On
  kind: action
  params: []
  command: SYPANEL+V LOCK ON<CR>

- id: remote_maintenance_set
  label: Remote Maintenance Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: STA, END
  command: RM {mode}<CR>

- id: remote_maintenance_query
  label: Remote Maintenance Mode Query
  kind: query
  params: []
  command: RM ?<CR>

- id: upgrade_id_display
  label: Upgrade ID Number Display
  kind: action
  params: []
  command: UGIDN<CR>

- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []
  command: SLPOFF<CR>
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY

- id: master_volume_state
  label: Master Volume State
  type: string
  description: "MV{value}<CR>, e.g. MV80<CR> for 0dB. Range 00-98"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF

- id: input_state
  label: Input State
  type: string
  description: "SI{source}<CR>, e.g. SIDVD<CR>"

- id: surround_mode_state
  label: Surround Mode State
  type: string
  description: "MS{mode}<CR>, e.g. MSSTEREO<CR>"

- id: zone2_state
  label: Zone2 State
  type: string
  description: "Z2{source}<CR> or Z2ON/Z2OFF"

- id: zone3_state
  label: Zone3 State
  type: string
  description: "Z3{source}<CR> or Z3ON/Z3OFF"

- id: tuner_frequency_state
  label: Tuner Frequency State
  type: string
  description: "TFAN{freq}<CR>, e.g. TFAN105000<CR>"

- id: rds_station_name
  label: RDS Station Name
  type: string
  description: "TFANNAME{8chars}<CR> (EU/AP only)"
```

## Variables
```yaml
# No discrete variables - all parameters are passed via Actions.
# Query commands (?) return current state as Feedbacks.
```

## Events
```yaml
# Device sends EVENT messages when state changes (operated directly, not via IP control).
# EVENT format is identical to COMMAND.
# Within 5 seconds of state change, device sends EVENT.
- id: power_event
  label: Power State Change Event
  type: string
  description: "PWON<CR> or PWSTANDBY<CR> sent when power changed via front panel"

- id: input_change_event
  label: Input Change Event
  type: string
  description: "SI{source}<CR> sent when input changed"

- id: surround_mode_change_event
  label: Surround Mode Change Event
  type: string
  description: "MS{mode}<CR> sent when surround mode changed"

- id: volume_change_event
  label: Volume Change Event
  type: string
  description: "MV{value}<CR> sent when master volume changed. CV{channel} {value}<CR> for channel volume."

# UNRESOLVED: Complete event catalog - source lists event types but full event taxonomy not enumerated
```

## Macros
```yaml
# Source describes multi-step sequences:
- id: power_on_sequence
  label: Power On Sequence
  description: "Send PWON<CR>, then wait 1 second before next command (per source note J)"

- id: preset_memory_sequence
  label: Tuner Preset Memory Sequence
  description: "TPANMEM<CR> → TPANUP/TPANDOWN/TPAN**<CR> → TPANMEM<CR>"

- id: hd_preset_memory_sequence
  label: HD Radio Preset Memory Sequence
  description: "TPHDMEM<CR> → TPHDUP/TPHDDOWN/TPHD**<CR> → TPHDMEM<CR>"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
# Note: power on requires 1 second wait before subsequent commands.
```

## Notes
- Command interval: minimum 50ms between commands sent to device.
- RESPONSE timeout: device responds within 200ms to query commands.
- EVENT timeout: device sends event within 5 seconds of state change.
- Half duplex communication on both RS-232 and TCP.
- Maximum command/data length: 135 bytes.
- ASCII range 0x20-0x7F for commands. CR (0x0D) only for pause/termination.
- Channel volume values: 38-62 ASCII, 50=0dB. Master volume: 00-98, 80=0dB, 00=--- (MIN).
- 0.5dB step uses 3 ASCII characters in parameter (e.g. MV805 for +0.5dB).
- When input source changes, channel volume and surround mode may return as EVENT simultaneously.
- If surround mode or channel volume is unchanged before/after input switch, no EVENT returned.
- ZONE2 and ZONE3 control commands mirror MAIN ZONE structure.
- HD Radio commands include multi-cast channel selection (1-8, analog 0).
- Network/Bluetooth transport uses NS prefix with 2-digit hex codes for playback control.
<!-- UNRESOLVED: firmware version not stated. UNRESOLVED: specific model variant (NR1603 vs related models) compatibility not distinguished. UNRESOLVED: voltage/current/power specs not in source. -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T11:57:15.634Z
last_checked_at: 2026-06-09T13:42:11.765Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T13:42:11.765Z
matched_actions: 271
action_count: 271
confidence: medium
summary: "All 271 spec actions confirmed in source with matching wire tokens and shapes; transport parameters port 23 and 9600bps are verbatim in source; source command count equals spec count at spec granularity. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "Complete event catalog - source lists event types but full event taxonomy not enumerated"
- "no safety warnings or interlock procedures in source."
- "firmware version not stated. UNRESOLVED: specific model variant (NR1603 vs related models) compatibility not distinguished. UNRESOLVED: voltage/current/power specs not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
