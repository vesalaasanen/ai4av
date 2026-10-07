---
spec_id: admin/marantz-sr5009-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz SR5009 Series Control Spec"
manufacturer: Marantz
model_family: SR5009
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - SR5009
    - "SR5009 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:07:55.573Z
last_checked_at: 2026-10-07T15:51:51.201Z
generated_at: 2026-10-07T15:51:51.201Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - TPANOFF
  - TPHDOFF
  - "firmware compatibility ranges not stated"
  - "parameter and example disagree; exact wire spelling needs clarification.\""
  - "explanatory text says MID but the command row and example say MED.\""
  - "many PS commands set parameters that could be treated as variables."
  - "complete event taxonomy not fully enumerated from source"
  - "no safety warnings or interlock procedures beyond timing note"
  - "firmware version compatibility, exact event taxonomy for all status changes, binary encoding details beyond ASCII"
verification:
  verdict: verified
  checked_at: 2026-10-07T15:51:51.201Z
  matched_actions: 375
  action_count: 375
  confidence: medium
  summary: "All 375 action units match source command rows and the transport values are supported. Only two off-state responses are unrepresented. The source is a generic Denon/Marantz protocol doc that names no SR5009. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Marantz SR5009 Series Control Spec

## Summary
AV receiver with both RS-232C and Ethernet (TCP/IP) control interfaces. Protocol is ASCII-based, 2-character command codes with parameters, terminated by CR (0x0D). Supports multi-zone operation (Main Zone, Zone 2, Zone 3), audio routing, volume/mute control, surround mode selection, tuner control, and network/USB playback control. Both serial (9600bps 8N1) and Telnet (TCP port 23) are documented.

<!-- UNRESOLVED: firmware compatibility ranges not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) - stated in source
serial:
  baud_rate: 9600  # stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # source does not explicitly state flow control
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
- muteable
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
- id: power_status_query
  label: Power Status Query
  kind: query
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
      type: integer
      description: 0-98 (80=0dB, 00=---/MIN)
- id: master_volume_status_query
  label: Master Volume Status Query
  kind: query
  params: []
- id: mute_on
  label: Mute On
  kind: action
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  params: []
- id: mute_status_query
  label: Mute Status Query
  kind: query
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: source
      type: string
      description: PHONO, CD, TUNER, DVD, BD, TV, SAT/CBL, MPLAY, GAME, HDRADIO, NET, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, BT, USB/IPOD, USB, IPD, IRP, FVP
- id: input_status_query
  label: Input Status Query
  kind: query
  params: []
- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
- id: main_zone_status_query
  label: Main Zone Status Query
  kind: query
  params: []
- id: digital_input_select
  label: Digital Input Select
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, HDMI, DIGITAL, ANALOG, EXT.IN, 7.1IN, NO, ARC
- id: digital_input_status_query
  label: Digital Input Status Query
  kind: query
  params: []
- id: dc_input_mode
  label: Digital Input Mode (PCM/DTS/AUTO)
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, PCM, DTS
- id: dc_status_query
  label: DC Status Query
  kind: query
  params: []
- id: video_select
  label: Video Select
  kind: action
  params:
    - name: source
      type: string
      description: DVD, BD, TV, SAT/CBL, MPLAY, GAME, AUX1, AUX2, AUX3, AUX4, AUX5, AUX6, AUX7, CD, SOURCE, ON, OFF
- id: video_select_status_query
  label: Video Select Status Query
  kind: query
  params: []
- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120 (010=10min), or OFF"
- id: sleep_timer_status_query
  label: Sleep Timer Status Query
  kind: query
  params: []
- id: auto_standby
  label: Auto Standby Setting
  kind: action
  params:
    - name: duration
      type: string
      description: "15M, 30M, 60M, OFF"
- id: auto_standby_status_query
  label: Auto Standby Status Query
  kind: query
  params: []
- id: eco_mode
  label: ECO Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ON, AUTO, OFF
- id: eco_mode_status_query
  label: ECO Mode Status Query
  kind: query
  params: []
- id: surround_mode
  label: Surround Mode
  kind: action
  params:
    - name: mode
      type: string
      description: MOVIE, MUSIC, GAME, DIRECT, PURE DIRECT, STEREO, AUTO, DOLBY DIGITAL, DTS SURROUND, AURO3D, AURO2DSURR, MCH STEREO, WIDE SCREEN, SUPER STADIUM, ROCK ARENA, JAZZ CLUB, CLASSIC CONCERT, MONO MOVIE, MATRIX, VIDEO GAME, VIRTUAL, LEFT, RIGHT, QUICK1-5, QUICK1-5 MEMORY, or many others per spec table
- id: surround_mode_status_query
  label: Surround Mode Status Query
  kind: query
  params: []
- id: video_aspect_ratio
  label: Video Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: string
      description: ASPNRM (4:3), ASPFUL (16:9)
- id: video_aspect_status_query
  label: Video Aspect Status Query
  kind: query
  params: []
- id: hdmi_monitor_select
  label: HDMI Monitor Select
  kind: action
  params:
    - name: monitor
      type: string
      description: MONIAUTO, MONI1, MONI2
- id: hdmi_monitor_status_query
  label: HDMI Monitor Status Query
  kind: query
  params: []
- id: video_resolution
  label: Video Resolution
  kind: action
  params:
    - name: resolution
      type: string
      description: SC48P, SC10I, SC72P, SC10P, SC10P24, SC4K, SC4KF, SCAUTO (MAIN), SCH48P-SCH4KF (HDMI)
- id: video_resolution_status_query
  label: Video Resolution Status Query
  kind: query
  params: []
- id: hdmi_audio_output
  label: HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: AMP, TV
- id: hdmi_audio_status_query
  label: HDMI Audio Status Query
  kind: query
  params: []
- id: video_processing_mode
  label: Video Processing Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUTO, GAME, MOVI (movie)
- id: video_processing_status_query
  label: Video Processing Status Query
  kind: query
  params: []
- id: vertical_stretch
  label: Vertical Stretch
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: vertical_stretch_status_query
  label: Vertical Stretch Status Query
  kind: query
  params: []
- id: tone_control
  label: Tone Control
  kind: action
  params:
    - name: state
      type: string
      description: ON, OFF
- id: tone_control_status_query
  label: Tone Control Status Query
  kind: query
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  params: []
- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99, 50=0dB, range -6 to +6dB (44-56)"
- id: bass_status_query
  label: Bass Status Query
  kind: query
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  params: []
- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-99, 50=0dB, range -6 to +6dB (44-56)"
- id: treble_status_query
  label: Treble Status Query
  kind: query
  params: []
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  params: []
- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  params: []
- id: dialog_level_set
  label: Dialog Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "38-62, 50=0dB"
- id: dialog_level_status_query
  label: Dialog Level Status Query
  kind: query
  params: []
- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  params: []
- id: subwoofer_level_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00, 38-62, 50=0dB"
- id: subwoofer_level_status_query
  label: Subwoofer Level Status Query
  kind: query
  params: []
- id: cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: cinema_eq_status_query
  label: Cinema EQ Status Query
  kind: query
  params: []
- id: multieq_mode
  label: MultEQ Mode
  kind: action
  params:
    - name: mode
      type: string
      description: AUDYSSEY, BYP.LR, FLAT, MANUAL, OFF
- id: multieq_status_query
  label: MultEQ Status Query
  kind: query
  params: []
- id: dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: dynamic_eq_status_query
  label: Dynamic EQ Status Query
  kind: query
  params: []
- id: reference_level
  label: Reference Level Offset
  kind: action
  params:
    - name: offset
      type: integer
      description: 0, 5, 10, 15 (dB)
- id: reference_level_status_query
  label: Reference Level Status Query
  kind: query
  params: []
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  params:
    - name: level
      type: string
      description: HEV (Heavy), MED (Medium), LIT (Light), OFF
- id: dynamic_volume_status_query
  label: Dynamic Volume Status Query
  kind: query
  params: []
- id: lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: lfc_status_query
  label: Audyssey LFC Status Query
  kind: query
  params: []
- id: picture_mode
  label: Picture Mode
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, STD, MOV, VVD (Vivid), STM (Stream), CTM (Custom), DAY, NGT
- id: picture_mode_status_query
  label: Picture Mode Status Query
  kind: query
  params: []
- id: picture_contrast_up
  label: Picture Contrast Up
  kind: action
  params: []
- id: picture_contrast_down
  label: Picture Contrast Down
  kind: action
  params: []
- id: picture_contrast_set
  label: Picture Contrast Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: picture_brightness_up
  label: Picture Brightness Up
  kind: action
  params: []
- id: picture_brightness_down
  label: Picture Brightness Down
  kind: action
  params: []
- id: picture_brightness_set
  label: Picture Brightness Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: picture_saturation_up
  label: Picture Saturation Up
  kind: action
  params: []
- id: picture_saturation_down
  label: Picture Saturation Down
  kind: action
  params: []
- id: picture_saturation_set
  label: Picture Saturation Set
  kind: action
  params:
    - name: value
      type: integer
      description: "000-100, 050=0, range -50 to +50"
- id: picture_hue_up
  label: Picture Hue Up
  kind: action
  params: []
- id: picture_hue_down
  label: Picture Hue Down
  kind: action
  params: []
- id: picture_hue_set
  label: Picture Hue Set
  kind: action
  params:
    - name: value
      type: integer
      description: "44-56, 50=0, range -6 to +6"
- id: picture_dnr
  label: Picture DNR
  kind: action
  params:
    - name: level
      type: string
      description: OFF, LOW, MID, HI
- id: picture_enhancer_up
  label: Picture Enhancer Up
  kind: action
  params: []
- id: picture_enhancer_down
  label: Picture Enhancer Down
  kind: action
  params: []
- id: picture_enhancer_set
  label: Picture Enhancer Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00-12, 00=0"
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
      type: integer
      description: "6 digits: ****.** kHz (AM, >050000) or ****.** MHz (FM, <050000)"
- id: tuner_frequency_status_query
  label: Tuner Frequency Status Query
  kind: query
  params: []
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  params: []
- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_preset_status_query
  label: Tuner Preset Status Query
  kind: query
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_band
  label: Tuner Band
  kind: action
  params:
    - name: band
      type: string
      description: ANAM (AM), ANFM (FM)
- id: tuner_band_status_query
  label: Tuner Band Status Query
  kind: query
  params: []
- id: tuner_tuning_mode
  label: Tuner Tuning Mode
  kind: action
  params:
    - name: mode
      type: string
      description: ANAUTO (Auto), ANMANUAL (Manual)
- id: hd_radio_band
  label: HD Radio Band
  kind: action
  params:
    - name: band
      type: string
      description: HDAM (AM), HDFM (FM), HDAUTOHD, HDAUTO, HDMANUAL, HDANAAUTO, HDANAMANU
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  params: []
- id: hd_radio_channel_set
  label: HD Radio Channel Set
  kind: action
  params:
    - name: channel
      type: integer
      description: "6 digits: frequency + multicast channel"
- id: hd_radio_multicast_select
  label: HD Radio Multicast Select
  kind: action
  params:
    - name: multicast
      type: integer
      description: "1-8 (multicast), 0 (analog)"
- id: hd_radio_status_query
  label: HD Radio Status Query
  kind: query
  params: []
- id: zone2_on
  label: Zone 2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: zone2_status_query
  label: Zone 2 Status Query
  kind: query
  params: []
- id: zone2_source
  label: Zone 2 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources for Zone 2
- id: zone2_volume_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: zone2_volume_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00-98, 80=0dB, 00=---/MIN"
- id: zone2_mute_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: zone2_mute_status_query
  label: Zone 2 Mute Status Query
  kind: query
  params: []
- id: zone2_channel_setup
  label: Zone 2 Channel Setup
  kind: action
  params:
    - name: mode
      type: string
      description: ST (Stereo), MONO
- id: zone2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
- id: zone2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
- id: zone2_sleep_timer
  label: Zone 2 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or OFF"
- id: zone3_on
  label: Zone 3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: zone3_status_query
  label: Zone 3 Status Query
  kind: query
  params: []
- id: zone3_source
  label: Zone 3 Source
  kind: action
  params:
    - name: source
      type: string
      description: Same as SI command sources for Zone 3
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
- id: zone3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
- id: zone3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
- id: zone3_sleep_timer
  label: Zone 3 Sleep Timer
  kind: action
  params:
    - name: minutes
      type: integer
      description: "001-120, or OFF"
- id: menu_on
  label: Menu On
  kind: action
  params: []
- id: menu_off
  label: Menu Off
  kind: action
  params: []
- id: menu_status_query
  label: Menu Status Query
  kind: query
  params: []
- id: all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: all_zone_stereo_status_query
  label: All Zone Stereo Status Query
  kind: query
  params: []
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
    - name: state
      type: string
      description: ON, OFF, ON+V (with volume)
- id: trigger
  label: Trigger Output
  kind: action
  params:
    - name: output
      type: integer
      description: "1 or 2"
    - name: state
      type: string
      description: ON, OFF
- id: trigger_status_query
  label: Trigger Status Query
  kind: query
  params: []
- id: dimmer
  label: Dimmer
  kind: action
  params:
    - name: level
      type: string
      description: BRI (Bright), DIM, DAR (Dark), OFF, SEL (toggle)
- id: dimmer_status_query
  label: Dimmer Status Query
  kind: query
  params: []
- id: channel_volume
  label: Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR, TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
    - name: direction
      type: string
      description: UP, DOWN, or absolute value (38-62, 50=0dB; SW/SW2 also 00)
- id: channel_volume_status_query
  label: Channel Volume Status Query
  kind: query
  params: []
- id: channel_volume_reset
  label: Reset All Channel Levels
  kind: action
  params: []
- id: main_zone_favorite_select
  label: Main Zone Favorite Select
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "ZMFAVORITE1; ZMFAVORITE2; ZMFAVORITE3; ZMFAVORITE4"
- id: main_zone_favorite_memory
  label: Main Zone Favorite Memory
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "ZMFAVORITE1 MEMORY; ZMFAVORITE2 MEMORY; ZMFAVORITE3 MEMORY; ZMFAVORITE4 MEMORY"
- id: record_select
  label: Record Select
  kind: action
  params:
    - name: source
      type: string
      description: "The name of PARAMETER is the same as that of the time of SI COMMAND. Additional documented tokens: IPOD, USB DIRECT, IPOD DIRECT, SOURCE"
  description: "SRPHONO; SRIPOD; SRUSB DIRECT; SRIPOD DIRECT; SRSOURCE"
- id: record_select_status_query
  label: Record Select Status Query
  kind: query
  params: []
  description: "SR?"
- id: quick_select_status_query
  label: Quick Select Status Query
  kind: query
  params: []
  description: "MSQUICK ?"
- id: hdmi_video_resolution_auto
  label: HDMI Video Resolution Auto
  kind: action
  params: []
  description: "VSSCHAUTO"
- id: hdmi_video_resolution_status_query
  label: HDMI Video Resolution Status Query
  kind: query
  params: []
  description: "VSSCH ?"
- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
  description: "PSSWL2 UP"
- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
  description: "PSSWL2 DOWN"
- id: subwoofer2_level_set
  label: Subwoofer 2 Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00,38 to 62 by ASCII , 50=0dB"
  description: "PS parameter SWL2**; example PSSWL2 50"
- id: surround_parameter_mode
  label: Surround Parameter Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "MUSIC, CINEMA, GAME, PRO LOGIC"
  description: "PSMODE:MUSIC; PSMODE:CINEMA; PSMODE:GAME; PSMODE:PRO LOGIC. HEIGHT is EVENT only."
- id: surround_parameter_mode_status_query
  label: Surround Parameter Mode Status Query
  kind: query
  params: []
  description: "PSMODE: ?"
- id: loudness_management_on
  label: Loudness Management On
  kind: action
  params: []
  description: "PSLOM ON"
- id: loudness_management_off
  label: Loudness Management Off
  kind: action
  params: []
  description: "PSLOM OFF"
- id: loudness_management_status_query
  label: Loudness Management Status Query
  kind: query
  params: []
  description: "PSLOM ?"
- id: front_height_on
  label: Front Height On
  kind: action
  params: []
  description: "PSFH:ON"
- id: front_height_off
  label: Front Height Off
  kind: action
  params: []
  description: "PSFH:OFF"
- id: front_height_status_query
  label: Front Height Status Query
  kind: query
  params: []
  description: "PSFH: ?"
- id: speaker_output_select
  label: Speaker Output Select
  kind: action
  params:
    - name: output
      type: string
      description: "FW, FH, SB, HW, BH, BW, FL, HF, FR"
  description: "PSSP:FW; PSSP:FH; PSSP:SB; PSSP:HW; PSSP:BH; PSSP:BW; PSSP:FL; PSSP:HF; PSSP:FR"
- id: speaker_output_status_query
  label: Speaker Output Status Query
  kind: query
  params: []
  description: "PSSP: ?"
- id: height_gain
  label: Height Gain
  kind: action
  params:
    - name: level
      type: string
      description: "LOW, MID, HI"
  description: "PSPHG LOW; PSPHG MID; PSPHG HI"
- id: height_gain_status_query
  label: Height Gain Status Query
  kind: query
  params: []
  description: "PSPHG ?"
- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  params: []
  description: "PSCNTAMT UP"
- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  params: []
  description: "PSCNTAMT DOWN"
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 1 to 7 (01 to 07)"
  description: "PS parameter CNTAMT**; example PSCNTAMT 01"
- id: containment_amount_status_query
  label: Containment Amount Status Query
  kind: query
  params: []
  description: "PSCNTAMT ?"
- id: audyssey_dsx_mode
  label: Audyssey DSX Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "ONHW, ONH, ONW, OFF"
  description: "PSDSX ONHW; PSDSX ONH; PSDSX ONW; PSDSX OFF"
- id: audyssey_dsx_status_query
  label: Audyssey DSX Status Query
  kind: query
  params: []
  description: "PSDSX ?"
- id: stage_width_up
  label: Stage Width Up
  kind: action
  params: []
  description: "PSSTW UP"
- id: stage_width_down
  label: Stage Width Down
  kind: action
  params: []
  description: "PSSTW DOWN"
- id: stage_width_set
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  description: "PS parameter STW**; example PSSTW 50"
- id: stage_width_status_query
  label: Stage Width Status Query
  kind: query
  params: []
  description: "PSSTW ?"
- id: stage_height_up
  label: Stage Height Up
  kind: action
  params: []
  description: "PSSTH UP"
- id: stage_height_down
  label: Stage Height Down
  kind: action
  params: []
  description: "PSSTH DOWN"
- id: stage_height_set
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 50=0dB; AVR can be operated from -10 to +10(40 to 60)"
  description: "PS parameter STH**; example PSSTH 50"
- id: stage_height_status_query
  label: Stage Height Status Query
  kind: query
  params: []
  description: "PSSTH ?"
- id: graphic_eq_on
  label: Graphic EQ On
  kind: action
  params: []
  description: "PSGEQ ON"
- id: graphic_eq_off
  label: Graphic EQ Off
  kind: action
  params: []
  description: "PSGEQ OFF"
- id: graphic_eq_status_query
  label: Graphic EQ Status Query
  kind: query
  params: []
  description: "PSGEQ ?"
- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  params:
    - name: level
      type: string
      description: "AUTO, LOW, MID, HI, OFF"
  description: "PSDRC AUTO; PSDRC LOW; PSDRC MID; PSDRC HI; PSDRC OFF"
- id: dynamic_compression_status_query
  label: Dynamic Compression Status Query
  kind: query
  params: []
  description: "PSDRC ?"
- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  params: []
  description: "PSBSC UP"
- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  params: []
  description: "PSBSC DOWN"
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 16"
  description: "PS parameter BSC**; example PSBSC 10"
- id: bass_sync_status_query
  label: Bass Sync Status Query
  kind: query
  params: []
  description: "PSBSC ?"
- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  params:
    - name: level
      type: string
      description: "OFF, LOW, MED, HIGH"
  description: "PSDEH OFF; PSDEH LOW; PSDEH MED; PSDEH HIGH"
- id: dialogue_enhancer_status_query
  label: Dialogue Enhancer Status Query
  kind: query
  params: []
  description: "PSDEH ?"
- id: lfe_up
  label: LFE Up
  kind: action
  params: []
  description: "PS parameter LFE UP; source example PSLEE UP. UNRESOLVED: parameter and example disagree; exact wire spelling needs clarification."
- id: lfe_down
  label: LFE Down
  kind: action
  params: []
  description: "PSLFE DOWN"
- id: lfe_set
  label: LFE Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB, 10=-10dB; AVR can be operated from 0 to -10"
  description: "PS parameter LFE**; example PSLFE 10"
- id: lfe_status_query
  label: LFE Status Query
  kind: query
  params: []
  description: "PSLFE ?"
- id: external_input_lfe_level
  label: External Input LFE Level
  kind: action
  params:
    - name: level
      type: string
      description: "00, 05, 10, 15"
  description: "PSLFL 00; PSLFL 05; PSLFL 10; PSLFL 15. When EXT.IN/7.1CH IN."
- id: external_input_lfe_status_query
  label: External Input LFE Status Query
  kind: query
  params: []
  description: "PSLFL ?"
- id: effect_on
  label: Effect On
  kind: action
  params: []
  description: "PSEFF ON"
- id: effect_off
  label: Effect Off
  kind: action
  params: []
  description: "PSEFF OFF"
- id: effect_level_up
  label: Effect Level Up
  kind: action
  params: []
  description: "PSEFF UP"
- id: effect_level_down
  label: Effect Level Down
  kind: action
  params: []
  description: "PSEFF DOWN"
- id: effect_level_set
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB, 10=10dB; AVR can be operated from 1 to 15"
  description: "PS parameter EFF**; example PSEFF 10"
- id: effect_status_query
  label: Effect Status Query
  kind: query
  params: []
  description: "PSEFF ?"
- id: surround_delay_up
  label: Surround Delay Up
  kind: action
  params: []
  description: "PSDEL UP"
- id: surround_delay_down
  label: Surround Delay Down
  kind: action
  params: []
  description: "PSDEL DOWN"
- id: surround_delay_set
  label: Surround Delay Set
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: "000 to 999 by ASCII , 000=0ms, 300=300ms; AVR can be operated from 0 to 300; 0-60ms:3ms/Step Over 60ms:10ms/Step"
  description: "PS parameter DEL ***; example PSDEL 000"
- id: surround_delay_status_query
  label: Surround Delay Status Query
  kind: query
  params: []
  description: "PSDEL ?"
- id: panorama_on
  label: Panorama On
  kind: action
  params: []
  description: "PSPAN ON"
- id: panorama_off
  label: Panorama Off
  kind: action
  params: []
  description: "PSPAN OFF"
- id: panorama_status_query
  label: Panorama Status Query
  kind: query
  params: []
  description: "PSPAN ?"
- id: dimension_up
  label: Dimension Up
  kind: action
  params: []
  description: "PSDIM UP"
- id: dimension_down
  label: Dimension Down
  kind: action
  params: []
  description: "PSDIM DOWN"
- id: dimension_set
  label: Dimension Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 6"
  description: "PS parameter DIM**; example PSDIM 00"
- id: dimension_status_query
  label: Dimension Status Query
  kind: query
  params: []
  description: "PSDIM ?"
- id: center_width_up
  label: Center Width Up
  kind: action
  params: []
  description: "PSCEN UP"
- id: center_width_down
  label: Center Width Down
  kind: action
  params: []
  description: "PSCEN DOWN"
- id: center_width_set
  label: Center Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0; AVR can be operated from 0 to 7"
  description: "PS parameter CEN**; example PSCEN 07"
- id: center_width_status_query
  label: Center Width Status Query
  kind: query
  params: []
  description: "PSCEN ?"
- id: center_image_up
  label: Center Image Up
  kind: action
  params: []
  description: "PSCEI UP"
- id: center_image_down
  label: Center Image Down
  kind: action
  params: []
  description: "PSCEI DOWN"
- id: center_image_set
  label: Center Image Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  description: "PS parameter CEI**; example PSCEI 10"
- id: center_image_status_query
  label: Center Image Status Query
  kind: query
  params: []
  description: "PSCEI ?"
- id: center_gain_up
  label: Center Gain Up
  kind: action
  params: []
  description: "PSCEG UP"
- id: center_gain_down
  label: Center Gain Down
  kind: action
  params: []
  description: "PSCEG DOWN"
- id: center_gain_set
  label: Center Gain Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 00=0.0; AVR can be operated from 0.0 to 1.0"
  description: "PS parameter CEG**; example PSCEG 10"
- id: center_gain_status_query
  label: Center Gain Status Query
  kind: query
  params: []
  description: "PSCEG ?"
- id: center_spread_on
  label: Center Spread On
  kind: action
  params: []
  description: "PSCES ON"
- id: center_spread_off
  label: Center Spread Off
  kind: action
  params: []
  description: "PSCES OFF"
- id: center_spread_status_query
  label: Center Spread Status Query
  kind: query
  params: []
  description: "PSCES ?"
- id: direct_stereo_subwoofer_on
  label: Direct Stereo Subwoofer On
  kind: action
  params: []
  description: "PSSWR ON; DIRECT,STEREO(2ch) mode"
- id: direct_stereo_subwoofer_off
  label: Direct Stereo Subwoofer Off
  kind: action
  params: []
  description: "PSSWR OFF; DIRECT,STEREO(2ch) mode"
- id: direct_stereo_subwoofer_status_query
  label: Direct Stereo Subwoofer Status Query
  kind: query
  params: []
  description: "PSSWR ?"
- id: room_size
  label: Room Size
  kind: action
  params:
    - name: size
      type: string
      description: "S, MS, M, ML, L"
  description: "PSRSZ S; PSRSZ MS; PSRSZ M; PSRSZ ML; PSRSZ L"
- id: room_size_status_query
  label: Room Size Status Query
  kind: query
  params: []
  description: "PSRSZ ?"
- id: audio_delay_up
  label: Audio Delay Up
  kind: action
  params: []
  description: "PSDELAY UP"
- id: audio_delay_down
  label: Audio Delay Down
  kind: action
  params: []
  description: "PSDELAY DOWN"
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: milliseconds
      type: integer
      description: "000 to 999 by ASCII , 000=0ms, 200=200ms; AVR can be operated from 0 to 200"
  description: "PS parameter DELAY***; example PSDELAY 200"
- id: audio_delay_status_query
  label: Audio Delay Status Query
  kind: query
  params: []
  description: "PSDELAY ?"
- id: audio_restorer
  label: Audio Restorer
  kind: action
  params:
    - name: mode
      type: string
      description: "OFF, LOW, MED, HI"
  description: "PSRSTR OFF; PSRSTR LOW; PSRSTR MED; PSRSTR HI. UNRESOLVED: explanatory text says MID but the command row and example say MED."
- id: audio_restorer_status_query
  label: Audio Restorer Status Query
  kind: query
  params: []
  description: "PSRSTR ?"
- id: front_speaker_select
  label: Front Speaker Select
  kind: action
  params:
    - name: speaker
      type: string
      description: "SPA, SPB, A+B"
  description: "PSFRONT SPA; PSFRONT SPB; PSFRONT A+B"
- id: front_speaker_status_query
  label: Front Speaker Status Query
  kind: query
  params: []
  description: "PSFRONT?"
- id: auro_matic_preset
  label: Auro-Matic Preset
  kind: action
  params:
    - name: preset
      type: string
      description: "SMA, MED, LAR, SPE"
  description: "PSAUROPR SMA; PSAUROPR MED; PSAUROPR LAR; PSAUROPR SPE. Auro-3D Upgrade only."
- id: auro_matic_preset_status_query
  label: Auro-Matic Preset Status Query
  kind: query
  params: []
  description: "PSAUROPR ?"
- id: auro_matic_strength_up
  label: Auro-Matic Strength Up
  kind: action
  params: []
  description: "PSAUROST UP; Auro-3D Upgrade only"
- id: auro_matic_strength_down
  label: Auro-Matic Strength Down
  kind: action
  params: []
  description: "PSAUROST DOWN; Auro-3D Upgrade only"
- id: auro_matic_strength_set
  label: Auro-Matic Strength Set
  kind: action
  params:
    - name: value
      type: integer
      description: "00 to 99 by ASCII , 01=1, 10=10; AVR can be operated from 1 to 16"
  description: "PSAUROST**; Auro-3D Upgrade only"
- id: auro_matic_strength_status_query
  label: Auro-Matic Strength Status Query
  kind: query
  params: []
  description: "PSAUROST ?"
- id: picture_contrast_status_query
  label: Picture Contrast Status Query
  kind: query
  params: []
  description: "PVCN ?"
- id: picture_brightness_status_query
  label: Picture Brightness Status Query
  kind: query
  params: []
  description: "PVBR ?"
- id: picture_saturation_status_query
  label: Picture Saturation Status Query
  kind: query
  params: []
  description: "PVST ?"
- id: picture_hue_status_query
  label: Picture Hue Status Query
  kind: query
  params: []
  description: "PVHUE ?"
- id: picture_dnr_status_query
  label: Picture DNR Status Query
  kind: query
  params: []
  description: "PVDNR ?"
- id: picture_enhancer_status_query
  label: Picture Enhancer Status Query
  kind: query
  params: []
  description: "PVENH ?"
- id: zone2_quick_select
  label: Zone 2 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
  description: "Z2QUICK1; Z2QUICK2; Z2QUICK3; Z2QUICK4; Z2QUICK5"
- id: zone2_quick_memory
  label: Zone 2 Quick Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
  description: "Z2QUICK1 MEMORY; Z2QUICK2 MEMORY; Z2QUICK3 MEMORY; Z2QUICK4 MEMORY; Z2QUICK5 MEMORY"
- id: zone2_quick_status_query
  label: Zone 2 Quick Status Query
  kind: query
  params: []
  description: "Z2QUICK ?"
- id: zone2_favorite_select
  label: Zone 2 Favorite Select
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "Z2FAVORITE1; Z2FAVORITE2; Z2FAVORITE3; Z2FAVORITE4"
- id: zone2_favorite_memory
  label: Zone 2 Favorite Memory
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "Z2FAVORITE1 MEMORY; Z2FAVORITE2 MEMORY; Z2FAVORITE3 MEMORY; Z2FAVORITE4 MEMORY"
- id: zone2_channel_setup_status_query
  label: Zone 2 Channel Setup Status Query
  kind: query
  params: []
  description: "Z2CS?"
- id: zone2_channel_volume
  label: Zone 2 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or absolute value: 38 to 62 by ASCII , 50=0dB"
  description: "Z2CVFL UP; Z2CVFL DOWN; Z2CVFL 50; Z2CVFR UP; Z2CVFR DOWN; Z2CVFR 50"
- id: zone2_channel_volume_status_query
  label: Zone 2 Channel Volume Status Query
  kind: query
  params: []
  description: "Z2CV?"
- id: zone2_hpf_status_query
  label: Zone 2 HPF Status Query
  kind: query
  params: []
  description: "Z2HPF?"
- id: zone2_bass_up
  label: Zone 2 Bass Up
  kind: action
  params: []
  description: "Z2PSBAS UP"
- id: zone2_bass_down
  label: Zone 2 Bass Down
  kind: action
  params: []
  description: "Z2PSBAS DOWN"
- id: zone2_bass_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
  description: "Z2PS parameter BAS **; example Z2PSBAS 50"
- id: zone2_bass_status_query
  label: Zone 2 Bass Status Query
  kind: query
  params: []
  description: "Z2PSBAS ?"
- id: zone2_treble_up
  label: Zone 2 Treble Up
  kind: action
  params: []
  description: "Z2PSTRE UP"
- id: zone2_treble_down
  label: Zone 2 Treble Down
  kind: action
  params: []
  description: "Z2PSTRE DOWN"
- id: zone2_treble_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
  description: "Z2PS parameter TRE **; example Z2PSTRE 50"
- id: zone2_treble_status_query
  label: Zone 2 Treble Status Query
  kind: query
  params: []
  description: "Z2PSTRE ?"
- id: zone2_hdmi_audio_output
  label: Zone 2 HDMI Audio Output
  kind: action
  params:
    - name: output
      type: string
      description: "THR, PCM"
  description: "Z2HDA THR; Z2HDA PCM"
- id: zone2_hdmi_audio_status_query
  label: Zone 2 HDMI Audio Status Query
  kind: query
  params: []
  description: "Z2HDA?"
- id: zone2_sleep_timer_status_query
  label: Zone 2 Sleep Timer Status Query
  kind: query
  params: []
  description: "Z2SLP?"
- id: zone2_auto_standby
  label: Zone 2 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "2H, 4H, 8H, OFF"
  description: "Z2STBY2H; Z2STBY4H; Z2STBY8H; Z2STBYOFF"
- id: zone2_auto_standby_status_query
  label: Zone 2 Auto Standby Status Query
  kind: query
  params: []
  description: "Z2STBY?"
- id: zone3_quick_select
  label: Zone 3 Quick Select
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
  description: "Z3QUICK1; Z3QUICK2; Z3QUICK3; Z3QUICK4; Z3QUICK5"
- id: zone3_quick_memory
  label: Zone 3 Quick Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-5"
  description: "Z3QUICK1 MEMORY; Z3QUICK2 MEMORY; Z3QUICK3 MEMORY; Z3QUICK4 MEMORY; Z3QUICK5 MEMORY"
- id: zone3_quick_status_query
  label: Zone 3 Quick Status Query
  kind: query
  params: []
  description: "Z3QUICK ?"
- id: zone3_favorite_select
  label: Zone 3 Favorite Select
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "Z3FAVORITE1; Z3FAVORITE2; Z3FAVORITE3; Z3FAVORITE4"
- id: zone3_favorite_memory
  label: Zone 3 Favorite Memory
  kind: action
  params:
    - name: favorite
      type: integer
      description: "1-4"
  description: "Z3FAVORITE1 MEMORY; Z3FAVORITE2 MEMORY; Z3FAVORITE3 MEMORY; Z3FAVORITE4 MEMORY"
- id: zone3_volume_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 98 by ASCII , 80=0dB, 00=---(MIN)"
  description: "Z3 parameter **; example Z380; Refer to Volume_CMD sheet"
- id: zone3_mute_status_query
  label: Zone 3 Mute Status Query
  kind: query
  params: []
  description: "Z3MU?"
- id: zone3_channel_setup
  label: Zone 3 Channel Setup
  kind: action
  params:
    - name: mode
      type: string
      description: "ST, MONO"
  description: "Z3CSST; Z3CSMONO"
- id: zone3_channel_setup_status_query
  label: Zone 3 Channel Setup Status Query
  kind: query
  params: []
  description: "Z3CS?"
- id: zone3_channel_volume
  label: Zone 3 Channel Volume
  kind: action
  params:
    - name: channel
      type: string
      description: "FL, FR"
    - name: direction
      type: string
      description: "UP, DOWN, or absolute value: 38 to 62 by ASCII , 50=0dB"
  description: "Z3CVFL UP; Z3CVFL DOWN; Z3CVFL 50; Z3CVFR UP; Z3CVFR DOWN; Z3CVFR 50"
- id: zone3_channel_volume_status_query
  label: Zone 3 Channel Volume Status Query
  kind: query
  params: []
  description: "Z3CV?"
- id: zone3_hpf_status_query
  label: Zone 3 HPF Status Query
  kind: query
  params: []
  description: "Z3HPF?"
- id: zone3_bass_up
  label: Zone 3 Bass Up
  kind: action
  params: []
  description: "Z3PSBAS UP"
- id: zone3_bass_down
  label: Zone 3 Bass Down
  kind: action
  params: []
  description: "Z3PSBAS DOWN"
- id: zone3_bass_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
  description: "Z3PS parameter BAS **; example Z3PSBAS 50"
- id: zone3_bass_status_query
  label: Zone 3 Bass Status Query
  kind: query
  params: []
  description: "Z3PSBAS ?"
- id: zone3_treble_up
  label: Zone 3 Treble Up
  kind: action
  params: []
  description: "Z3PSTRE UP"
- id: zone3_treble_down
  label: Zone 3 Treble Down
  kind: action
  params: []
  description: "Z3PSTRE DOWN"
- id: zone3_treble_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: level
      type: integer
      description: "00 to 99 by ASCII , 00=0dB from -10 to +10(40 to 60); from -14 to +14 /2dBstep (36 to 64)※X4100 only"
  description: "Z3PS parameter TRE **; example Z3PSTRE 50"
- id: zone3_treble_status_query
  label: Zone 3 Treble Status Query
  kind: query
  params: []
  description: "Z3PSTRE ?"
- id: zone3_sleep_timer_status_query
  label: Zone 3 Sleep Timer Status Query
  kind: query
  params: []
  description: "Z3SLP?"
- id: zone3_auto_standby
  label: Zone 3 Auto Standby
  kind: action
  params:
    - name: duration
      type: string
      description: "2H, 4H, 8H, OFF"
  description: "Z3STBY2H; Z3STBY4H; Z3STBY8H; Z3STBYOFF"
- id: zone3_auto_standby_status_query
  label: Zone 3 Auto Standby Status Query
  kind: query
  params: []
  description: "Z3STBY?"
- id: tuner_station_name_query
  label: Tuner Station Name Query
  kind: query
  params: []
  description: "TFANNAME?; RDS Station Name (EU,AP Only)"
- id: tuner_preset_memory_set
  label: Tuner Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
  description: "TPANMEM01; parameter ANMEM**"
- id: hd_radio_frequency_multicast_set
  label: HD Radio Frequency Multicast Set
  kind: action
  params:
    - name: frequency
      type: integer
      description: "6 digits; ****.** kHz at AM band (>050000 is AM.); ****.** MHz at FM band (<050000 is FM.)"
    - name: multicast
      type: integer
      description: "Multi Cast 1～8, Analog 0"
  description: "TF parameter HD******MC*; example TFHD008750MC5; command only"
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
  description: "TPHDUP"
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
  description: "TPHDDOWN"
- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
  description: "TP parameter HD**; example TPHD01"
- id: hd_radio_preset_status_query
  label: HD Radio Preset Status Query
  kind: query
  params: []
  description: "TPHD?"
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params: []
  description: "TPHDMEM"
- id: hd_radio_preset_memory_set
  label: HD Radio Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: "01-56 01=CH01,56=CH56"
  description: "TPHDMEM01; parameter HDMEM**"
- id: hd_radio_band_status_query
  label: HD Radio Band Status Query
  kind: query
  params: []
  description: "TMHD?"
- id: network_cursor_up
  label: Network Cursor Up
  kind: action
  params: []
  description: "NS90"
- id: network_cursor_down
  label: Network Cursor Down
  kind: action
  params: []
  description: "NS91"
- id: network_cursor_left
  label: Network Cursor Left
  kind: action
  params: []
  description: "NS92"
- id: network_cursor_right
  label: Network Cursor Right
  kind: action
  params: []
  description: "NS93"
- id: network_enter_play_pause
  label: Network Enter Play Pause
  kind: action
  params: []
  description: "NS94"
- id: network_play
  label: Network Play
  kind: action
  params: []
  description: "NS9A"
- id: network_pause
  label: Network Pause
  kind: action
  params: []
  description: "NS9B"
- id: network_stop
  label: Network Stop
  kind: action
  params: []
  description: "NS9C"
- id: network_skip_plus
  label: Network Skip Plus
  kind: action
  params: []
  description: "NS9D"
- id: network_skip_minus
  label: Network Skip Minus
  kind: action
  params: []
  description: "NS9E"
- id: network_manual_search_plus
  label: Network Manual Search Plus
  kind: action
  params: []
  description: "NS9F; USB/iPod,Media Server,Bluetooth"
- id: network_manual_search_minus
  label: Network Manual Search Minus
  kind: action
  params: []
  description: "NS9G; USB/iPod,Media Server,Bluetooth"
- id: network_repeat_one
  label: Network Repeat One
  kind: action
  params: []
  description: "NS9H; Media Server,USB,iPod Direct,Bluetooth"
- id: network_repeat_all
  label: Network Repeat All
  kind: action
  params: []
  description: "NS9I; Media Server,USB,iPod Direct,Bluetooth"
- id: network_repeat_off
  label: Network Repeat Off
  kind: action
  params: []
  description: "NS9J; Media Server,USB,iPod Direct,Bluetooth"
- id: network_random_on
  label: Network Random On
  kind: action
  params: []
  description: "NS9K; Random On for Media Server, USB, Bluetooth; Shuffle Songs for iPod Direct"
- id: network_random_off
  label: Network Random Off
  kind: action
  params: []
  description: "NS9M; Random Off for Media Server, USB, Bluetooth; Shuffle Off for iPod Direct"
- id: ipod_display_mode_toggle
  label: iPod Display Mode Toggle
  kind: action
  params: []
  description: "NS9W; From iPod Mode/On Screen Mode"
- id: network_page_next
  label: Network Page Next
  kind: action
  params: []
  description: "NS9X; except Bluetooth, AirPlay, Spotify remote"
- id: network_page_previous
  label: Network Page Previous
  kind: action
  params: []
  description: "NS9Y; except Bluetooth, AirPlay, Spotify remote"
- id: network_manual_search_stop
  label: Network Manual Search Stop
  kind: action
  params: []
  description: "NS9Z; USB/iPod,Media Server,Bluetooth"
- id: network_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  params: []
  description: "NSRPT; Media Server,USB,iPod Direct,Spotify,AirPlay,Bluetooth"
- id: network_random_toggle
  label: Network Random Toggle
  kind: action
  params: []
  description: "NSRND; Media Server,USB,iPod Direct,Spotify,AirPlay,Bluetooth"
- id: network_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35(2014 AVR)"
  description: "NS parameter B**; example NSB00; except Bluetooth, USB/iPod"
- id: network_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: "00-35(2014 AVR)"
  description: "NS parameter C**; example NSC00; except Bluetooth, USB/iPod"
- id: network_preset_names_query
  label: Network Preset Names Query
  kind: query
  params: []
  description: "NSH; Audio Preset Name status（UTF-8）; except Bluetooth, USB/iPod"
- id: network_favorite_add
  label: Network Favorite Add
  kind: action
  params: []
  description: "NSFV MEM; Add Favorites folder"
- id: network_display_ascii_query
  label: Network Display ASCII Query
  kind: query
  params: []
  description: "NSA; Return Onscreen Display Information List (ASCII CODE Character); MAX96byte"
- id: network_display_utf8_query
  label: Network Display UTF-8 Query
  kind: query
  params: []
  description: "NSE; Request Onscreen Display Information List (UTF-8 CODE Character); MAX96byte"
- id: system_cursor_up
  label: System Cursor Up
  kind: action
  params: []
  description: "MNCUP"
- id: system_cursor_down
  label: System Cursor Down
  kind: action
  params: []
  description: "MNCDN"
- id: system_cursor_left
  label: System Cursor Left
  kind: action
  params: []
  description: "MNCLT"
- id: system_cursor_right
  label: System Cursor Right
  kind: action
  params: []
  description: "MNCRT"
- id: system_enter
  label: System Enter
  kind: action
  params: []
  description: "MNENT"
- id: system_return
  label: System Return
  kind: action
  params: []
  description: "MNRTN"
- id: system_option
  label: System Option
  kind: action
  params: []
  description: "MNOPT"
- id: system_info
  label: System Info
  kind: action
  params: []
  description: "MNINF"
- id: channel_level_menu_toggle
  label: Channel Level Menu Toggle
  kind: action
  params: []
  description: "MNCHL; Channel Level Adjust menu on/off"
- id: insta_prevue_on
  label: InstaPrevue On
  kind: action
  params: []
  description: "MNPRV ON"
- id: insta_prevue_off
  label: InstaPrevue Off
  kind: action
  params: []
  description: "MNPRV OFF"
- id: insta_prevue_status_query
  label: InstaPrevue Status Query
  kind: query
  params: []
  description: "MNPRV?"
- id: upgrade_id_display
  label: Upgrade ID Display
  kind: action
  params: []
  description: "UGIDN; ID Number for UPGRADE is displayed on FL Display; 12-digit ID Number"
- id: remote_maintenance_start
  label: Remote Maintenance Start
  kind: action
  params: []
  description: "RM STA"
- id: remote_maintenance_end
  label: Remote Maintenance End
  kind: action
  params: []
  description: "RM END"
- id: remote_maintenance_status_query
  label: Remote Maintenance Status Query
  kind: query
  params: []
  description: "RM ?"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [PWON, PWSTANDBY]
  query_command: "PW?"
- id: master_volume_state
  type: string
  description: MV** format (e.g. MV80 for 0dB)
  query_command: "MV?"
- id: mute_state
  type: enum
  values: [MUON, MUOFF]
  query_command: "MU?"
- id: input_state
  type: string
  description: SI* format (e.g. SIDVD)
  query_command: "SI?"
- id: main_zone_state
  type: string
  description: ZM* format (e.g. ZMON, ZMOFF)
  query_command: "ZM?"
- id: surround_mode_state
  type: string
  description: MS* format (e.g. MSSTEREO)
  query_command: "MS?"
- id: zone2_state
  type: string
  description: Z2* format (e.g. Z2ON, Z2OFF, Z2SOURCE)
  query_command: "Z2?"
- id: zone3_state
  type: string
  description: Z3* format (e.g. Z3ON, Z3OFF, Z3SOURCE)
  query_command: "Z3?"
- id: tuner_state
  type: string
  description: TFAN* format (frequency)
  query_command: "TFAN?"
- id: hd_radio_state
  type: string
  description: TFHD* with nested fields for band, station, artist, title, album, genre, signal level
  query_command: "TFHD?"
- id: hd_radio_metadata_state
  type: string
  description: "HDST NAME, HDSIG LEV, HDMLT CURRCH, HDMLT CAST CH, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE DIGITAL, HDMODE ANALOG; response to HD?"
  query_command: "HD?"
```

## Variables
```yaml
# UNRESOLVED: many PS commands set parameters that could be treated as variables.
# Source treats them as setter+query pairs. Full enumeration left as unresolved.
```

## Events
```yaml
# The device sends unsolicited EVENT messages when:
# - State changes occur (input, volume, surround mode, power)
# - Events are sent within 5 seconds of state change
# - EVENT format mirrors COMMAND format
# - Channel volume events fire when input source changes (if channel config changes)
# - Surround mode events fire when input source changes (if surround mode changes)
# UNRESOLVED: complete event taxonomy not fully enumerated from source
```

## Macros
```yaml
# No explicit multi-step macros described in source.
# Note: After PWON, wait 1 second before sending next command (documented timing requirement)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Wait 1 second after PWON before sending next command"
    reference: "Volume command note section, item J"
# UNRESOLVED: no safety warnings or interlock procedures beyond timing note
```

## Notes
Command timing: 50ms minimum interval between commands. Responses within 200ms of query. Events within 5 seconds of state change. Maximum data length 135 bytes per message. ASCII characters 0x20–0x7F plus CR (0x0D). Device supports both RS-232C (9600bps 8N1) and TCP/IP (port 23 telnet). Half-duplex communication on both interfaces. Authentication: UNRESOLVED; the source does not explicitly state authentication requirements. Power-on command requires 1 second wait before next command. Channel volume events fire on input change only when channel configuration changes. Surround mode events fire on input change only when surround mode changes. Setting same surround mode again does not return channel volume event, only surround mode event.
<!-- UNRESOLVED: firmware version compatibility, exact event taxonomy for all status changes, binary encoding details beyond ASCII -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T12:07:55.573Z
last_checked_at: 2026-10-07T15:51:51.201Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T15:51:51.201Z
matched_actions: 375
action_count: 375
confidence: medium
summary: "All 375 action units match source command rows and the transport values are supported. Only two off-state responses are unrepresented. The source is a generic Denon/Marantz protocol doc that names no SR5009. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- TPANOFF
- TPHDOFF
- "firmware compatibility ranges not stated"
- "parameter and example disagree; exact wire spelling needs clarification.\""
- "explanatory text says MID but the command row and example say MED.\""
- "many PS commands set parameters that could be treated as variables."
- "complete event taxonomy not fully enumerated from source"
- "no safety warnings or interlock procedures beyond timing note"
- "firmware version compatibility, exact event taxonomy for all status changes, binary encoding details beyond ASCII"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
