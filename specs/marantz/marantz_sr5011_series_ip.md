---
spec_id: admin/marantz-sr5011-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5011 Series Control Spec"
manufacturer: Marantz
model_family: "SR5011 Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "SR5011 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:09:51.571Z
last_checked_at: 2026-06-09T19:21:14.351Z
generated_at: 2026-06-09T19:21:14.351Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no authentication procedure described in source"
  - "front speaker A/B selection (PSFRONT) - treat as action parameter"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware compatibility range not stated"
  - "error codes / fault behavior not described in source"
  - "voltage/power specifications not in source"
  - "authentication token format — not applicable (no auth in source)"
verification:
  verdict: verified
  checked_at: 2026-06-09T19:21:14.351Z
  matched_actions: 171
  action_count: 171
  confidence: medium
  summary: "All 171 spec actions match distinct source command units via semantic-id convention with correct shapes and exhaustive coverage; transport confirmed; coverage ratio 1.0. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5011 Series Control Spec

## Summary
Marantz SR5011 Series AV receiver. Serial RS-232C (DB-9, 9600bps, 8N1) and Ethernet TCP/IP (port 23, Telnet) control interfaces. ASCII command protocol ending with CR (0x0D). Supports power, volume, input/route selection, surround modes, zone control, tuner, HD Radio, and USB/Bluetooth playback.

<!-- UNRESOLVED: no authentication procedure described in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: TCP port 23 (telnet)
serial:
  baud_rate: 9600  # stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB-9pin female, DCE straight
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
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  params: []
- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: 2-digit ASCII; 80=0dB, 00=---dB (MIN). 0.5dB steps use 3 digits (e.g. MV805=-0.5dB)
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: channel_volume_up
  label: Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: Channel code e.g. FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
- id: channel_volume_down
  label: Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: Channel code
- id: channel_volume_set
  label: Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
    - name: level
      type: string
      description: "2-digit ASCII; 50=0dB. Range 38-62 (FL/FR/C/SL/SR/SBL/SBR/SB/FHL/FHR/FWL/FWR/TFL/TFR/TML/TMR/TRL/TRR/RHL/RHR/FDL/FDR/SDL/SDR/BDL/BDR/SHL/SHR/TS); 00,38-62 for SW/SW2"
- id: channel_volume_reset
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
- id: input_select
  label: Select Input Source
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP"
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120, ASCII 3 digits. e.g. 010=10min
- id: auto_standby_set
  label: Auto Standby Set
  kind: action
  params:
    - name: mode
      type: string
      description: "15M, 30M, 60M, OFF"
- id: eco_mode_set
  label: ECO Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ON, AUTO, OFF"
- id: surround_mode_set
  label: Set Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, ALL ZONE STEREO, 7.1IN, MULTI CH IN, + many others per spec table"
- id: quick_select
  label: Quick Select
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-5, or 0 to recall"
    - name: action
      type: string
      description: "QUICK1-QUICK5 (select), QUICK1 MEMORY-QUICK5 MEMORY (save)"
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: mode
      type: string
      description: "ASPNRM (4:3), ASPFUL (16:9)"
- id: hdmi_monitor_set
  label: Set HDMI Monitor
  kind: action
  params:
    - name: monitor
      type: string
      description: "MONIAUTO (auto), MONI1 (OUT-1), MONI2 (OUT-2)"
- id: resolution_set
  label: Set Resolution (Main)
  kind: action
  params:
    - name: res
      type: string
      description: "SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO"
- id: resolution_hdmi_set
  label: Set Resolution (HDMI)
  kind: action
  params:
    - name: res
      type: string
      description: "SCH48P, SCH10I, SCH72P, SCH10P, SCH10P24, SCH4K, SCH4KF, SCHAUTO"
- id: hdmi_audio_output_set
  label: HDMI Audio Output Set
  kind: action
  params:
    - name: target
      type: string
      description: "AUDIO AMP, AUDIO TV"
- id: video_processing_mode_set
  label: Video Processing Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "VPMAUTO, VPMGAME, VPMMOVI"
- id: vertical_stretch_set
  label: Vertical Stretch Set
  kind: action
  params:
    - name: state
      type: string
      description: "VST ON, VST OFF"
- id: tone_control_set
  label: Tone Control On/Off
  kind: action
  params:
    - name: state
      type: string
      description: "TONE CTRL ON, TONE CTRL OFF"
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
- id: dialog_level_adjust_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: dialog_level_adjust_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: subwoofer_level_adjust_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: subwoofer_level_adjust_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: loudness_management_set
  label: Loudness Management Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: reference_level_offset_set
  label: Reference Level Offset Set
  kind: action
  params:
    - name: offset
      type: string
      description: "0, 5, 10, 15 (dB)"
- id: dynamic_volume_set
  label: Dynamic Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "HEV (Heavy), MED (Medium), LIT (Light), OFF"
- id: picture_mode_set
  label: Picture Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, STD, MOV, VVD, STM, CTM, DAY, NGT"
- id: contrast_adjust
  label: Contrast Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "000-100, 050=0. Range -50 to +50"
- id: brightness_adjust
  label: Brightness Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "000-100, 050=0. Range -50 to +50"
- id: saturation_adjust
  label: Saturation Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "000-100, 050=0. Range -50 to +50"
- id: hue_adjust
  label: Hue Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "44-56, 50=0. Range -6 to +6"
- id: enhancer_adjust
  label: Enhancer Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-12, 00=0. Range 0 to 12"
- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: zone2_input_select
  label: Zone 2 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same as main zone input sources"
- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: zone3_volume_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: zone3_mute_on
  label: Zone 3 Mute On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone 3 Mute Off
  kind: action
  params: []
- id: zone3_input_select
  label: Zone 3 Input Select
  kind: action
  params:
    - name: source
      type: string
      description: "Same as main zone input sources"
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits; >050000=AM (kHz), <050000=FM (MHz)"
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_band_set
  label: Tuner Band Set
  kind: action
  params:
    - name: band
      type: string
      description: "ANAM (AM), ANFM (FM)"
- id: tuner_tuning_mode_set
  label: Tuner Tuning Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ANAUTO (Auto), ANMANUAL (Manual)"
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: "6 digits + optional MC* for multi-cast channel"
- id: network_usb_control
  label: Network/USB/iPod/Bluetooth Control
  kind: action
  params:
    - name: command
      type: string
      description: "90-9Z, RPT, RND, B**, C**, H, FV MEM, NSA, NSE - cursor, play/pause/stop/skip, search, repeat, shuffle, preset call/memory, favorites, display info"
- id: main_zone_favorite
  label: Main Zone Favorite
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
    - name: action
      type: string
      description: "select (recall) or memory (save)"
- id: rec_source_select
  label: Record Source Select
  kind: action
  params:
    - name: source
      type: string
      description: "PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP, SOURCE"
- id: input_signal_mode_set
  label: Input Signal Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO"
- id: digital_input_mode_set
  label: Digital Input Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, PCM, DTS"
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: "DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF"
- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 44-56 (-6 to +6dB)"
- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 44-56 (-6 to +6dB)"
- id: dialog_level_adjust_up
  label: Dialog Level Adjust Up
  kind: action
  params: []
- id: dialog_level_adjust_down
  label: Dialog Level Adjust Down
  kind: action
  params: []
- id: dialog_level_adjust_set
  label: Dialog Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: subwoofer_level_adjust_up
  label: Subwoofer Level Adjust Up
  kind: action
  params: []
- id: subwoofer_level_adjust_down
  label: Subwoofer Level Adjust Down
  kind: action
  params: []
- id: subwoofer_level_adjust_set
  label: Subwoofer Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"
- id: subwoofer2_level_adjust_up
  label: Subwoofer 2 Level Adjust Up
  kind: action
  params: []
- id: subwoofer2_level_adjust_down
  label: Subwoofer 2 Level Adjust Down
  kind: action
  params: []
- id: subwoofer2_level_adjust_set
  label: Subwoofer 2 Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: "00, 38-62 ASCII, 50=0dB"
- id: ps_mode_set
  label: PS Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
- id: ps_front_height_set
  label: Front Height Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_speaker_output_set
  label: Speaker Output Set
  kind: action
  params:
    - name: config
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
- id: ps_plz_height_gain_set
  label: PL2z Height Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
- id: ps_multeq_set
  label: MultEQ Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF"
- id: ps_lfc_set
  label: Audyssey LFC Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_dsx_set
  label: Audyssey DSX Set
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
- id: ps_graphic_eq_set
  label: Graphic EQ Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_drc_set
  label: Dynamic Compression Set
  kind: action
  params:
    - name: mode
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
- id: ps_dialogue_enhancer_set
  label: Dialogue Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH"
- id: ps_lfe_level_set
  label: LFE Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"
- id: ps_effect_set
  label: Effect Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_panorama_set
  label: Panorama Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_center_spread_set
  label: Center Spread Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_subwoofer_direct_set
  label: Subwoofer Direct Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: ps_room_size_set
  label: Room Size Set
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
- id: ps_audio_restorer_set
  label: Audio Restorer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
- id: ps_front_speaker_set
  label: Front Speaker Set
  kind: action
  params:
    - name: config
      type: string
      description: "SPA, SPB, A+B"
- id: ps_auro3d_preset_set
  label: Auro-3D Preset Set
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
- id: ps_containment_amount_adjust
  label: Containment Amount Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII; AVR range 01-07"
- id: ps_stage_width_adjust
  label: Stage Width Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60"
- id: ps_stage_height_adjust
  label: Stage Height Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60"
- id: ps_bass_sync_adjust
  label: Bass Sync Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-16"
- id: ps_lfe_adjust
  label: LFE Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 0 to -10dB"
- id: ps_effect_level_adjust
  label: Effect Level Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0dB; AVR range 1-15"
- id: ps_delay_adjust
  label: Delay Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "000-999 ASCII, 000=0ms; AVR range 0-300ms"
- id: ps_dimension_adjust
  label: Dimension Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-6"
- id: ps_center_width_adjust
  label: Center Width Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0; AVR range 0-7"
- id: ps_center_image_adjust
  label: Center Image Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"
- id: ps_center_gain_adjust
  label: Center Gain Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII, 00=0.0; AVR range 0.0-1.0"
- id: ps_audio_delay_adjust
  label: Audio Delay Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "000-999 ASCII, 000=0ms; AVR range 0-200ms"
- id: ps_auro3d_strength_adjust
  label: Auro-3D Strength Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "UP, DOWN"
    - name: value
      type: string
      description: "00-99 ASCII; AVR range 1-16"
- id: pv_dnr_set
  label: DNR Set
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MID, HI"
- id: mn_cursor_control
  label: Menu Cursor Control
  kind: action
  params:
    - name: command
      type: string
      description: "CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL"
- id: mn_menu_set
  label: Setup Menu Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: mn_instaprevue_set
  label: InstaPrevue Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: mn_all_zone_stereo_set
  label: All Zone Stereo Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: system_lock_set
  label: System Lock Set
  kind: action
  params:
    - name: mode
      type: string
      description: "REMOTE LOCK ON, REMOTE LOCK OFF, PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF"
- id: trigger_set
  label: Trigger Set
  kind: action
  params:
    - name: trigger
      type: string
      description: "1, 2"
    - name: state
      type: string
      description: "ON, OFF"
- id: dimmer_set
  label: Dimmer Set
  kind: action
  params:
    - name: mode
      type: string
      description: "BRI, DIM, DAR, OFF, SEL"
- id: upgrade_display_id
  label: Display Upgrade ID
  kind: action
  params: []
- id: remote_maintenance_set
  label: Remote Maintenance Set
  kind: action
  params:
    - name: state
      type: string
      description: "STA, END"
- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=--- (MIN)"
- id: zone2_channel_setting
  label: Zone 2 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone2_channel_volume_up
  label: Zone 2 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_down
  label: Zone 2 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone2_channel_volume_set
  label: Zone 2 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: zone2_hpf_set
  label: Zone 2 HPF Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone2_bass_up
  label: Zone 2 Bass Up
  kind: action
  params: []
- id: zone2_bass_down
  label: Zone 2 Bass Down
  kind: action
  params: []
- id: zone2_bass_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; range -10 to +10 (40-60)"
- id: zone2_treble_up
  label: Zone 2 Treble Up
  kind: action
  params: []
- id: zone2_treble_down
  label: Zone 2 Treble Down
  kind: action
  params: []
- id: zone2_treble_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; range -10 to +10 (40-60)"
- id: zone2_hdmi_audio_set
  label: Zone 2 HDMI Audio Set
  kind: action
  params:
    - name: mode
      type: string
      description: "THR, PCM"
- id: zone2_sleep_timer_set
  label: Zone 2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF, or 001-120 ASCII 3 digits"
- id: zone2_auto_standby_set
  label: Zone 2 Auto Standby Set
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
    - name: action
      type: string
      description: "select (recall) or memory (save)"
- id: zone2_favorite
  label: Zone 2 Favorite
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
    - name: action
      type: string
      description: "select (recall) or memory (save)"
- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=--- (MIN)"
- id: zone3_channel_setting
  label: Zone 3 Channel Setting
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
- id: zone3_channel_volume_up
  label: Zone 3 Channel Volume Up
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_down
  label: Zone 3 Channel Volume Down
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
- id: zone3_channel_volume_set
  label: Zone 3 Channel Volume Set
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"
- id: zone3_hpf_set
  label: Zone 3 HPF Set
  kind: action
  params:
    - name: state
      type: string
      description: "ON, OFF"
- id: zone3_bass_up
  label: Zone 3 Bass Up
  kind: action
  params: []
- id: zone3_bass_down
  label: Zone 3 Bass Down
  kind: action
  params: []
- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; range -10 to +10 (40-60)"
- id: zone3_treble_up
  label: Zone 3 Treble Up
  kind: action
  params: []
- id: zone3_treble_down
  label: Zone 3 Treble Down
  kind: action
  params: []
- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; range -10 to +10 (40-60)"
- id: zone3_sleep_timer_set
  label: Zone 3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "OFF, or 001-120 ASCII 3 digits"
- id: zone3_auto_standby_set
  label: Zone 3 Auto Standby Set
  kind: action
  params:
    - name: mode
      type: string
      description: "2H, 4H, 8H, OFF"
- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: slot
      type: string
      description: "QUICK1, QUICK2, QUICK3, QUICK4, QUICK5"
    - name: action
      type: string
      description: "select (recall) or memory (save)"
- id: zone3_favorite
  label: Zone 3 Favorite
  kind: action
  params:
    - name: slot
      type: string
      description: "FAVORITE1, FAVORITE2, FAVORITE3, FAVORITE4"
    - name: action
      type: string
      description: "select (recall) or memory (save)"
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "blank for interactive store, or 01-56 for direct memory"
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_radio_preset_select
  label: HD Radio Preset Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "blank for interactive store, or 01-56 for direct memory"
- id: hd_radio_band_mode_set
  label: HD Radio Band Mode Set
  kind: action
  params:
    - name: mode
      type: string
      description: "HDAM, HDFM, HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values: [PWON, PWSTANDBY]
- id: master_volume_status
  label: Master Volume Status
  type: string
  description: MV** response format; 80=0dB, 00=---dB (MIN)
- id: mute_status
  label: Mute Status
  type: enum
  values: [MUON, MUOFF]
- id: channel_volume_status
  label: Channel Volume Status
  type: string
  description: CVFL 50 format per channel
- id: input_source_status
  label: Input Source Status
  type: string
  description: SI*** response
- id: main_zone_status
  label: Main Zone Status
  type: enum
  values: [ZMON, ZMOFF]
- id: surround_mode_status
  label: Surround Mode Status
  type: string
  description: MS*** response
- id: sleep_timer_status
  label: Sleep Timer Status
  type: string
  description: SLP*** response, 001-120
- id: auto_standby_status
  label: Auto Standby Status
  type: string
  description: "STBY*** response: 15M, 30M, 60M, OFF"
- id: eco_mode_status
  label: ECO Mode Status
  type: string
  description: "ECO*** response: ON, AUTO, OFF"
- id: tuner_status
  label: Tuner Status
  type: string
  description: TFAN response including frequency and RDS station name
- id: hd_radio_status
  label: HD Radio Status
  type: string
  description: Returns band, station name, multi-cast channel, signal level, artist, title, album, genre, program type
- id: zone2_status
  label: Zone 2 Status
  type: enum
  values: [Z2ON, Z2OFF]
- id: zone3_status
  label: Zone 3 Status
  type: enum
  values: [Z3ON, Z3OFF]
- id: video_select_status
  label: Video Select Status
  type: string
  description: SV response
- id: hdmi_monitor_status
  label: HDMI Monitor Status
  type: string
  description: VSMONI response
- id: resolution_status
  label: Resolution Status
  type: string
  description: VSSC / VSSCH response
- id: hdmi_audio_status
  label: HDMI Audio Status
  type: string
  description: VSAUDIO response
- id: video_processing_mode_status
  label: Video Processing Mode Status
  type: string
  description: VSVPM response
- id: picture_mode_status
  label: Picture Mode Status
  type: string
  description: PV response
- id: tone_control_status
  label: Tone Control Status
  type: string
  description: PSTONE CTRL response
- id: bass_status
  label: Bass Status
  type: string
  description: PSBAS response, 00-99 (50=0dB)
- id: treble_status
  label: Treble Status
  type: string
  description: PSTRE response, 00-99 (50=0dB)
- id: onscreen_display_info
  label: Onscreen Display Information
  type: string
  description: NSA response - up to 9 lines (Now Playing, Song, Artist, Album, bitrate, elapsed time, track index)
```

## Variables
```yaml
# Tuner frequency is set via action, not a discrete variable.
# All channel volumes are settable via CV command - covered in Actions.
# UNRESOLVED: front speaker A/B selection (PSFRONT) - treat as action parameter
```

## Events
```yaml
# Device sends EVENT messages when state changes via direct operation.
# Event format is identical to COMMAND format.
# Key event sources:
- id: power_state_changed
  description: PWON / PWSTANDBY event when power is toggled directly on the unit
- id: input_source_changed
  description: SI*** event when input is changed directly; returns channel volume EVENT simultaneously
- id: surround_mode_changed
  description: MS*** event when surround mode is changed directly; returns prior mode before change
- id: master_volume_changed
  description: MV*** event when master volume is adjusted directly
- id: channel_volume_changed
  description: CVFL/CVFR/etc. events when channel volumes change (e.g. on input source change)
- id: mute_state_changed
  description: MUON/MUOFF event when mute is toggled directly
- id: zone2_state_changed
  description: Z2ON/Z2OFF event when Zone 2 is toggled directly
- id: zone3_state_changed
  description: Z3ON/Z3OFF event when Zone 3 is toggled directly
# EVENT timing: must be sent within 5 seconds of state change.
# RESPONSE timing: must be sent within 200ms of receiving a ? (query) command.
```

## Macros
```yaml
# Power on sequence (per doc note J): transmit PWON then wait 1 second before next command.
# Channel volume reset: CVZRL → returns CVFL 50 ... CVEND sequence
# All zone stereo: MSALL ZONE STEREO - operates all zones simultaneously
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

Command timing: minimum 50ms interval between consecutive commands. After PWON (power on), wait 1 second before transmitting next command.

Volume encoding: standard commands use 2 ASCII digits; 0.5dB step values use 3 ASCII digits (e.g. MV805 = -0.5dB). MV80 = 0dB. MV00 = --- (minimum).

ASCII range: 0x20–0x7F only. CR (0x0D) used as end-of-command delimiter.

Half-duplex on both interfaces. COMMANDs are receivable during EVENT transmission.

Response vs Event distinction: query commands ending with ? return RESPONSE within 200ms. State changes from direct unit operation return EVENT within 5 seconds.

<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: error codes / fault behavior not described in source -->
<!-- UNRESOLVED: voltage/power specifications not in source -->
<!-- UNRESOLVED: authentication token format — not applicable (no auth in source) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:09:51.571Z
last_checked_at: 2026-06-09T19:21:14.351Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T19:21:14.351Z
matched_actions: 171
action_count: 171
confidence: medium
summary: "All 171 spec actions match distinct source command units via semantic-id convention with correct shapes and exhaustive coverage; transport confirmed; coverage ratio 1.0. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no authentication procedure described in source"
- "front speaker A/B selection (PSFRONT) - treat as action parameter"
- "no safety warnings or interlock procedures stated in source"
- "firmware compatibility range not stated"
- "error codes / fault behavior not described in source"
- "voltage/power specifications not in source"
- "authentication token format — not applicable (no auth in source)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
