---
spec_id: admin/marantz-pd4250d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz PD4250D Control Spec"
manufacturer: Marantz
model_family: PD4250D
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - PD4250D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-27T06:51:54.512Z
generated_at: 2026-05-27T06:51:54.512Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:54.512Z
  matched_actions: 524
  action_count: 524
  confidence: high
  summary: "All 524 spec actions map 1:1 to source commands via semantic-id; transport matches verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Marantz PD4250D Control Spec

## Summary
Marantz AVR with RS-232C and TCP/IP (Telnet) control interfaces. Supports multi-zone audio/video switching, surround sound processing, volume control across multiple channels, and system configuration. Protocols: serial RS-232C at 9600bps 8N1, TCP on port 23.

<!-- UNRESOLVED: firmware version not stated in source -->

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
  type: none
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
    - name: value
      type: integer
      description: Volume value 00-98, 80=0dB, 00=minimum (---dB)
- id: master_volume_query
  label: Master Volume Query
  kind: query
  params: []
- id: channel_volume_fl_up
  label: Front Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fl_down
  label: Front Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fl_set
  label: Front Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fr_up
  label: Front Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fr_down
  label: Front Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fr_set
  label: Front Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_c_up
  label: Center Channel Volume Up
  kind: action
  params: []
- id: channel_volume_c_down
  label: Center Channel Volume Down
  kind: action
  params: []
- id: channel_volume_c_set
  label: Center Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sw_up
  label: Subwoofer Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sw_down
  label: Subwoofer Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sw_set
  label: Subwoofer Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 00,38-62, 50=0dB
- id: channel_volume_sw2_up
  label: Subwoofer 2 Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sw2_down
  label: Subwoofer 2 Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sw2_set
  label: Subwoofer 2 Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 00,38-62, 50=0dB
- id: channel_volume_sl_up
  label: Surround Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sl_down
  label: Surround Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sl_set
  label: Surround Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sr_up
  label: Surround Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sr_down
  label: Surround Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sr_set
  label: Surround Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sbl_up
  label: Surround Back Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sbl_down
  label: Surround Back Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sbl_set
  label: Surround Back Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sbr_up
  label: Surround Back Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sbr_down
  label: Surround Back Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sbr_set
  label: Surround Back Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sb_up
  label: Surround Back Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sb_down
  label: Surround Back Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sb_set
  label: Surround Back Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fhl_up
  label: Front Height Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fhl_down
  label: Front Height Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fhl_set
  label: Front Height Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fhr_up
  label: Front Height Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fhr_down
  label: Front Height Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fhr_set
  label: Front Height Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fwl_up
  label: Front Wide Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fwl_down
  label: Front Wide Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fwl_set
  label: Front Wide Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fwr_up
  label: Front Wide Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fwr_down
  label: Front Wide Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fwr_set
  label: Front Wide Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_tfl_up
  label: Top Front Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_tfl_down
  label: Top Front Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_tfl_set
  label: Top Front Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_tfr_up
  label: Top Front Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_tfr_down
  label: Top Front Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_tfr_set
  label: Top Front Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_tml_up
  label: Top Middle Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_tml_down
  label: Top Middle Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_tml_set
  label: Top Middle Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_tmr_up
  label: Top Middle Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_tmr_down
  label: Top Middle Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_tmr_set
  label: Top Middle Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_trl_up
  label: Top Rear Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_trl_down
  label: Top Rear Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_trl_set
  label: Top Rear Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_trr_up
  label: Top Rear Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_trr_down
  label: Top Rear Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_trr_set
  label: Top Rear Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_rhl_up
  label: Rear Height Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_rhl_down
  label: Rear Height Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_rhl_set
  label: Rear Height Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_rhr_up
  label: Rear Height Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_rhr_down
  label: Rear Height Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_rhr_set
  label: Rear Height Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fdl_up
  label: Front Dolby Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fdl_down
  label: Front Dolby Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fdl_set
  label: Front Dolby Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_fdr_up
  label: Front Dolby Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_fdr_down
  label: Front Dolby Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_fdr_set
  label: Front Dolby Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sdl_up
  label: Surround Dolby Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sdl_down
  label: Surround Dolby Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sdl_set
  label: Surround Dolby Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_sdr_up
  label: Surround Dolby Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_sdr_down
  label: Surround Dolby Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_sdr_set
  label: Surround Dolby Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_bdl_up
  label: Back Dolby Left Channel Volume Up
  kind: action
  params: []
- id: channel_volume_bdl_down
  label: Back Dolby Left Channel Volume Down
  kind: action
  params: []
- id: channel_volume_bdl_set
  label: Back Dolby Left Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_bdr_up
  label: Back Dolby Right Channel Volume Up
  kind: action
  params: []
- id: channel_volume_bdr_down
  label: Back Dolby Right Channel Volume Down
  kind: action
  params: []
- id: channel_volume_bdr_set
  label: Back Dolby Right Channel Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_shl_up
  label: Surround Height Left Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: channel_volume_shl_down
  label: Surround Height Left Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: channel_volume_shl_set
  label: Surround Height Left Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_shr_up
  label: Surround Height Right Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: channel_volume_shr_down
  label: Surround Height Right Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: channel_volume_shr_set
  label: Surround Height Right Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_ts_up
  label: Top Surround Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: channel_volume_ts_down
  label: Top Surround Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: channel_volume_ts_set
  label: Top Surround Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 38-62, 50=0dB
- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
- id: channel_volume_query
  label: Channel Volume Status Query
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
- id: mute_query
  label: Mute Status Query
  kind: query
  params: []
- id: input_select_phono
  label: Select Input Phono
  kind: action
  params: []
- id: input_select_cd
  label: Select Input CD
  kind: action
  params: []
- id: input_select_tuner
  label: Select Input Tuner
  kind: action
  params: []
- id: input_select_dvd
  label: Select Input DVD
  kind: action
  params: []
- id: input_select_bd
  label: Select Input Blu-ray
  kind: action
  params: []
- id: input_select_tv
  label: Select Input TV Audio
  kind: action
  params: []
- id: input_select_sat_cbl
  label: Select Input Sat/Cable
  kind: action
  params: []
- id: input_select_mplay
  label: Select Input Media Player
  kind: action
  params: []
- id: input_select_game
  label: Select Input Game
  kind: action
  params: []
- id: input_select_hdradio
  label: Select Input HD Radio
  kind: action
  params: []
- id: input_select_net
  label: Select Input Network
  kind: action
  params: []
- id: input_select_pandora
  label: Select Input Pandora
  kind: action
  params: []
- id: input_select_siriusxm
  label: Select Input SiriusXM
  kind: action
  params: []
- id: input_select_spotify
  label: Select Input Spotify
  kind: action
  params: []
- id: input_select_lastfm
  label: Select Input LastFM
  kind: action
  params: []
- id: input_select_flickr
  label: Select Input Flickr
  kind: action
  params: []
- id: input_select_iradio
  label: Select Input Internet Radio
  kind: action
  params: []
- id: input_select_server
  label: Select Input Server
  kind: action
  params: []
- id: input_select_favorites
  label: Select Input Favorites
  kind: action
  params: []
- id: input_select_aux1
  label: Select Input Aux1
  kind: action
  params: []
- id: input_select_aux2
  label: Select Input Aux2
  kind: action
  params: []
- id: input_select_aux3
  label: Select Input Aux3
  kind: action
  params: []
- id: input_select_aux4
  label: Select Input Aux4
  kind: action
  params: []
- id: input_select_aux5
  label: Select Input Aux5
  kind: action
  params: []
- id: input_select_aux6
  label: Select Input Aux6
  kind: action
  params: []
- id: input_select_aux7
  label: Select Input Aux7
  kind: action
  params: []
- id: input_select_bt
  label: Select Input Bluetooth
  kind: action
  params: []
- id: input_select_usb
  label: Select Input USB
  kind: action
  params: []
- id: input_select_usb_ipod
  label: Select Input USB/iPod
  kind: action
  params: []
- id: input_select_ipd
  label: Select Input iPod Direct
  kind: action
  params: []
- id: input_select_irp
  label: Select Input iRadio Recent Play
  kind: action
  params: []
- id: input_select_fvp
  label: Select Input Favorites Play
  kind: action
  params: []
- id: input_select_query
  label: Input Select Status Query
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
- id: main_zone_query
  label: Main Zone Status Query
  kind: query
  params: []
- id: main_zone_favorite1
  label: Main Zone Favorite 1
  kind: action
  params: []
- id: main_zone_favorite2
  label: Main Zone Favorite 2
  kind: action
  params: []
- id: main_zone_favorite3
  label: Main Zone Favorite 3
  kind: action
  params: []
- id: main_zone_favorite4
  label: Main Zone Favorite 4
  kind: action
  params: []
- id: main_zone_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  params: []
- id: main_zone_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  params: []
- id: main_zone_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  params: []
- id: main_zone_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  params: []
- id: rec_select_phono
  label: Rec Select Phono
  kind: action
  params: []
- id: rec_select_cd
  label: Rec Select CD
  kind: action
  params: []
- id: rec_select_tuner
  label: Rec Select Tuner
  kind: action
  params: []
- id: rec_select_dvd
  label: Rec Select DVD
  kind: action
  params: []
- id: rec_select_bd
  label: Rec Select Blu-ray
  kind: action
  params: []
- id: rec_select_usb_direct
  label: Rec Select USB Direct
  kind: action
  params: []
- id: rec_select_ipod_direct
  label: Rec Select iPod Direct
  kind: action
  params: []
- id: rec_select_source
  label: Rec Select Source
  kind: action
  params: []
- id: rec_select_query
  label: Rec Select Status Query
  kind: query
  params: []
- id: sd_auto
  label: Set Digital Input Auto Mode
  kind: action
  params: []
- id: sd_hdmi
  label: Set Digital Input Force HDMI
  kind: action
  params: []
- id: sd_digital
  label: Set Digital Input Force Digital
  kind: action
  params: []
- id: sd_analog
  label: Set Digital Input Force Analog
  kind: action
  params: []
- id: sd_extin
  label: Set External Input Mode
  kind: action
  params: []
- id: sd_71in
  label: Set 7.1 Channel Input Mode
  kind: action
  params: []
- id: sd_no
  label: Digital Input Off
  kind: action
  params: []
- id: sd_query
  label: Digital Input Status Query
  kind: query
  params: []
- id: dc_auto
  label: Digital Input Auto Mode
  kind: action
  params: []
- id: dc_pcm
  label: Digital Input Force PCM
  kind: action
  params: []
- id: dc_dts
  label: Digital Input Force DTS
  kind: action
  params: []
- id: dc_query
  label: Digital Input Status Query
  kind: query
  params: []
- id: sv_dvd
  label: Video Select DVD
  kind: action
  params: []
- id: sv_bd
  label: Video Select Blu-ray
  kind: action
  params: []
- id: sv_tv
  label: Video Select TV
  kind: action
  params: []
- id: sv_sat_cbl
  label: Video Select Sat/Cable
  kind: action
  params: []
- id: sv_mplay
  label: Video Select Media Player
  kind: action
  params: []
- id: sv_game
  label: Video Select Game
  kind: action
  params: []
- id: sv_aux1
  label: Video Select Aux1
  kind: action
  params: []
- id: sv_aux2
  label: Video Select Aux2
  kind: action
  params: []
- id: sv_aux3
  label: Video Select Aux3
  kind: action
  params: []
- id: sv_aux4
  label: Video Select Aux4
  kind: action
  params: []
- id: sv_aux5
  label: Video Select Aux5
  kind: action
  params: []
- id: sv_aux6
  label: Video Select Aux6
  kind: action
  params: []
- id: sv_aux7
  label: Video Select Aux7
  kind: action
  params: []
- id: sv_cd
  label: Video Select CD
  kind: action
  params: []
- id: sv_source
  label: Video Select Cancel
  kind: action
  params: []
- id: sv_on
  label: Video Select On
  kind: action
  params: []
- id: sv_off
  label: Video Select Off
  kind: action
  params: []
- id: sv_query
  label: Video Select Status Query
  kind: query
  params: []
- id: sleep_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: sleep_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: Sleep time 001-120 minutes
- id: sleep_query
  label: Sleep Timer Status Query
  kind: query
  params: []
- id: standby_15m
  label: Auto Standby 15 Minutes
  kind: action
  params: []
- id: standby_30m
  label: Auto Standby 30 Minutes
  kind: action
  params: []
- id: standby_60m
  label: Auto Standby 60 Minutes
  kind: action
  params: []
- id: standby_off
  label: Auto Standby Off
  kind: action
  params: []
- id: standby_query
  label: Auto Standby Status Query
  kind: query
  params: []
- id: eco_on
  label: ECO Mode On
  kind: action
  params: []
- id: eco_auto
  label: ECO Mode Auto
  kind: action
  params: []
- id: eco_off
  label: ECO Mode Off
  kind: action
  params: []
- id: eco_query
  label: ECO Mode Status Query
  kind: query
  params: []
- id: surround_movie
  label: Surround Mode Movie
  kind: action
  params: []
- id: surround_music
  label: Surround Mode Music
  kind: action
  params: []
- id: surround_game
  label: Surround Mode Game
  kind: action
  params: []
- id: surround_direct
  label: Surround Mode Direct
  kind: action
  params: []
- id: surround_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  params: []
- id: surround_stereo
  label: Surround Mode Stereo
  kind: action
  params: []
- id: surround_auto
  label: Surround Mode Auto
  kind: action
  params: []
- id: surround_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  params: []
- id: surround_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  params: []
- id: surround_auro3d
  label: Surround Mode Auro-3D
  kind: action
  params: []
- id: surround_auro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  params: []
- id: surround_multi_channel_stereo
  label: Surround Mode Multi Channel Stereo
  kind: action
  params: []
- id: surround_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  params: []
- id: surround_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  params: []
- id: surround_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  params: []
- id: surround_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  params: []
- id: surround_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  params: []
- id: surround_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  params: []
- id: surround_matrix
  label: Surround Mode Matrix
  kind: action
  params: []
- id: surround_video_game
  label: Surround Mode Video Game
  kind: action
  params: []
- id: surround_virtual
  label: Surround Mode Virtual
  kind: action
  params: []
- id: surround_left
  label: Surround Mode Left
  kind: action
  params: []
- id: surround_right
  label: Surround Mode Right
  kind: action
  params: []
- id: surround_all_zone_stereo
  label: All Zone Stereo
  kind: action
  params: []
- id: surround_71in
  label: Surround Mode 7.1 Input
  kind: action
  params: []
- id: surround_pure_direct_ext
  label: Surround Mode Pure Direct Ext
  kind: action
  params: []
- id: surround_query
  label: Surround Mode Status Query
  kind: query
  params: []
- id: surround_quick1
  label: Quick Select 1
  kind: action
  params: []
- id: surround_quick2
  label: Quick Select 2
  kind: action
  params: []
- id: surround_quick3
  label: Quick Select 3
  kind: action
  params: []
- id: surround_quick4
  label: Quick Select 4
  kind: action
  params: []
- id: surround_quick5
  label: Quick Select 5
  kind: action
  params: []
- id: surround_quick0
  label: Quick Select 0
  kind: action
  params: []
- id: surround_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  params: []
- id: surround_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  params: []
- id: surround_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  params: []
- id: surround_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  params: []
- id: surround_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  params: []
- id: surround_quick_query
  label: Quick Select Status Query
  kind: query
  params: []
- id: video_aspect_normal
  label: Aspect Ratio 4:3
  kind: action
  params: []
- id: video_aspect_full
  label: Aspect Ratio 16:9
  kind: action
  params: []
- id: video_aspect_query
  label: Aspect Ratio Status Query
  kind: query
  params: []
- id: hdmi_monitor_auto
  label: HDMI Monitor Auto
  kind: action
  params: []
- id: hdmi_monitor_1
  label: HDMI Monitor Out-1
  kind: action
  params: []
- id: hdmi_monitor_2
  label: HDMI Monitor Out-2
  kind: action
  params: []
- id: hdmi_monitor_query
  label: HDMI Monitor Status Query
  kind: query
  params: []
- id: video_resolution_48p
  label: Resolution 480p/576p
  kind: action
  params: []
- id: video_resolution_10i
  label: Resolution 1080i
  kind: action
  params: []
- id: video_resolution_72p
  label: Resolution 720p
  kind: action
  params: []
- id: video_resolution_10p
  label: Resolution 1080p
  kind: action
  params: []
- id: video_resolution_10p24
  label: Resolution 1080p 24Hz
  kind: action
  params: []
- id: video_resolution_4k
  label: Resolution 4K
  kind: action
  params: []
- id: video_resolution_4kf
  label: Resolution 4K 60/50Hz
  kind: action
  params: []
- id: video_resolution_auto
  label: Resolution Auto
  kind: action
  params: []
- id: video_resolution_query
  label: Resolution Status Query
  kind: query
  params: []
- id: video_resolution_hdmi_48p
  label: Resolution HDMI 480p/576p
  kind: action
  params: []
- id: video_resolution_hdmi_10i
  label: Resolution HDMI 1080i
  kind: action
  params: []
- id: video_resolution_hdmi_72p
  label: Resolution HDMI 720p
  kind: action
  params: []
- id: video_resolution_hdmi_10p
  label: Resolution HDMI 1080p
  kind: action
  params: []
- id: video_resolution_hdmi_10p24
  label: Resolution HDMI 1080p 24Hz
  kind: action
  params: []
- id: video_resolution_hdmi_4k
  label: Resolution HDMI 4K
  kind: action
  params: []
- id: video_resolution_hdmi_4kf
  label: Resolution HDMI 4K 60/50Hz
  kind: action
  params: []
- id: video_resolution_hdmi_auto
  label: Resolution HDMI Auto
  kind: action
  params: []
- id: video_resolution_hdmi_query
  label: Resolution HDMI Status Query
  kind: query
  params: []
- id: hdmi_audio_amp
  label: HDMI Audio Output AMP
  kind: action
  params: []
- id: hdmi_audio_tv
  label: HDMI Audio Output TV
  kind: action
  params: []
- id: hdmi_audio_query
  label: HDMI Audio Status Query
  kind: query
  params: []
- id: video_processing_auto
  label: Video Processing Mode Auto
  kind: action
  params: []
- id: video_processing_game
  label: Video Processing Mode Game
  kind: action
  params: []
- id: video_processing_movie
  label: Video Processing Mode Movie
  kind: action
  params: []
- id: video_processing_query
  label: Video Processing Status Query
  kind: query
  params: []
- id: vertical_stretch_on
  label: Vertical Stretch On
  kind: action
  params: []
- id: vertical_stretch_off
  label: Vertical Stretch Off
  kind: action
  params: []
- id: vertical_stretch_query
  label: Vertical Stretch Status Query
  kind: query
  params: []
- id: tone_control_on
  label: Tone Control On
  kind: action
  params: []
- id: tone_control_off
  label: Tone Control Off
  kind: action
  params: []
- id: tone_control_query
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
    - name: value
      type: integer
      description: Bass 00-99, 50=0dB, range 44-56 (-6 to +6dB)
- id: bass_query
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
    - name: value
      type: integer
      description: Treble 00-99, 50=0dB, range 44-56 (-6 to +6dB)
- id: treble_query
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
    - name: value
      type: integer
      description: Dialog level 38-62, 50=0dB
- id: dialog_level_query
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
    - name: value
      type: integer
      description: Subwoofer level 00,38-62, 50=0dB
- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
- id: subwoofer2_level_set
  label: Subwoofer 2 Level Set
  kind: action
  params:
    - name: value
      type: integer
      description: Subwoofer 2 level 00,38-62, 50=0dB
- id: subwoofer_level_query
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
- id: cinema_eq_query
  label: Cinema EQ Status Query
  kind: query
  params: []
- id: mode_music
  label: Parameter Mode Music
  kind: action
  params: []
- id: mode_cinema
  label: Parameter Mode Cinema
  kind: action
  params: []
- id: mode_game
  label: Parameter Mode Game
  kind: action
  params: []
- id: mode_pro_logic
  label: Parameter Mode Pro Logic
  kind: action
  params: []
- id: mode_height
  label: Parameter Mode Height
  kind: action
  params: []
- id: mode_query
  label: Parameter Mode Status Query
  kind: query
  params: []
- id: loudness_on
  label: Loudness Management On
  kind: action
  params: []
- id: loudness_off
  label: Loudness Management Off
  kind: action
  params: []
- id: loudness_query
  label: Loudness Management Status Query
  kind: query
  params: []
- id: front_height_on
  label: Front Height Output On
  kind: action
  params: []
- id: front_height_off
  label: Front Height Output Off
  kind: action
  params: []
- id: front_height_query
  label: Front Height Status Query
  kind: query
  params: []
- id: speaker_floor
  label: Speaker Output Floor
  kind: action
  params: []
- id: speaker_front_height
  label: Speaker Output Front Height
  kind: action
  params: []
- id: speaker_front_wide
  label: Speaker Output Front Wide
  kind: action
  params: []
- id: speaker_surround_back
  label: Speaker Output Surround Back
  kind: action
  params: []
- id: speaker_height_wide
  label: Speaker Output Height and Wide
  kind: action
  params: []
- id: speaker_back_height
  label: Speaker Output Back and Height
  kind: action
  params: []
- id: speaker_back_wide
  label: Speaker Output Back and Wide
  kind: action
  params: []
- id: speaker_query
  label: Speaker Output Status Query
  kind: query
  params: []
- id: pl2z_height_gain_low
  label: PL2z Height Gain Low
  kind: action
  params: []
- id: pl2z_height_gain_mid
  label: PL2z Height Gain Mid
  kind: action
  params: []
- id: pl2z_height_gain_hi
  label: PL2z Height Gain High
  kind: action
  params: []
- id: pl2z_height_gain_query
  label: PL2z Height Gain Status Query
  kind: query
  params: []
- id: muteq_audyssey
  label: MultEQ Audyssey
  kind: action
  params: []
- id: muteq_bypass_lr
  label: MultEQ Bypass L/R
  kind: action
  params: []
- id: muteq_flat
  label: MultEQ Flat
  kind: action
  params: []
- id: muteq_manual
  label: MultEQ Manual
  kind: action
  params: []
- id: muteq_off
  label: MultEQ Off
  kind: action
  params: []
- id: muteq_query
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
- id: dynamic_eq_query
  label: Dynamic EQ Status Query
  kind: query
  params: []
- id: ref_level_0
  label: Reference Level Offset 0dB
  kind: action
  params: []
- id: ref_level_5
  label: Reference Level Offset 5dB
  kind: action
  params: []
- id: ref_level_10
  label: Reference Level Offset 10dB
  kind: action
  params: []
- id: ref_level_15
  label: Reference Level Offset 15dB
  kind: action
  params: []
- id: ref_level_query
  label: Reference Level Status Query
  kind: query
  params: []
- id: dynamic_volume_heavy
  label: Dynamic Volume Heavy
  kind: action
  params: []
- id: dynamic_volume_medium
  label: Dynamic Volume Medium
  kind: action
  params: []
- id: dynamic_volume_light
  label: Dynamic Volume Light
  kind: action
  params: []
- id: dynamic_volume_off
  label: Dynamic Volume Off
  kind: action
  params: []
- id: dynamic_volume_query
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
- id: lfc_query
  label: Audyssey LFC Status Query
  kind: query
  params: []
- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  params: []
- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  params: []
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  params:
    - name: value
      type: integer
      description: Containment 00-99, 01-07 operational range
- id: containment_amount_query
  label: Containment Amount Status Query
  kind: query
  params: []
- id: dsx_on_height_wide
  label: Audyssey DSX On Height and Wide
  kind: action
  params: []
- id: dsx_on_height
  label: Audyssey DSX On Height
  kind: action
  params: []
- id: dsx_on_wide
  label: Audyssey DSX On Wide
  kind: action
  params: []
- id: dsx_off
  label: Audyssey DSX Off
  kind: action
  params: []
- id: dsx_query
  label: Audyssey DSX Status Query
  kind: query
  params: []
- id: stage_width_up
  label: Stage Width Up
  kind: action
  params: []
- id: stage_width_down
  label: Stage Width Down
  kind: action
  params: []
- id: stage_width_set
  label: Stage Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: Stage width 00-99, 50=0dB, 40-60 operational range
- id: stage_width_query
  label: Stage Width Status Query
  kind: query
  params: []
- id: stage_height_up
  label: Stage Height Up
  kind: action
  params: []
- id: stage_height_down
  label: Stage Height Down
  kind: action
  params: []
- id: stage_height_set
  label: Stage Height Set
  kind: action
  params:
    - name: value
      type: integer
      description: Stage height 00-99, 50=0dB, 40-60 operational range
- id: stage_height_query
  label: Stage Height Status Query
  kind: query
  params: []
- id: graphic_eq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: graphic_eq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: graphic_eq_query
  label: Graphic EQ Status Query
  kind: query
  params: []
- id: dynamic_compression_auto
  label: Dynamic Compression Auto
  kind: action
  params: []
- id: dynamic_compression_low
  label: Dynamic Compression Low
  kind: action
  params: []
- id: dynamic_compression_mid
  label: Dynamic Compression Mid
  kind: action
  params: []
- id: dynamic_compression_high
  label: Dynamic Compression High
  kind: action
  params: []
- id: dynamic_compression_off
  label: Dynamic Compression Off
  kind: action
  params: []
- id: dynamic_compression_query
  label: Dynamic Compression Status Query
  kind: query
  params: []
- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  params: []
- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  params: []
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  params:
    - name: value
      type: integer
      description: Bass sync 00-99, 0-16 operational range
- id: bass_sync_query
  label: Bass Sync Status Query
  kind: query
  params: []
- id: dialogue_enhancer_off
  label: Dialogue Enhancer Off
  kind: action
  params: []
- id: dialogue_enhancer_low
  label: Dialogue Enhancer Low
  kind: action
  params: []
- id: dialogue_enhancer_med
  label: Dialogue Enhancer Medium
  kind: action
  params: []
- id: dialogue_enhancer_high
  label: Dialogue Enhancer High
  kind: action
  params: []
- id: dialogue_enhancer_query
  label: Dialogue Enhancer Status Query
  kind: query
  params: []
- id: lfe_up
  label: LFE Up
  kind: action
  params: []
- id: lfe_down
  label: LFE Down
  kind: action
  params: []
- id: lfe_set
  label: LFE Set
  kind: action
  params:
    - name: value
      type: integer
      description: LFE 00-99, 0 to -10dB operational range
- id: lfe_query
  label: LFE Status Query
  kind: query
  params: []
- id: lfe_level_00
  label: LFE Level 00 (Ext In / 7.1CH In)
  kind: action
  params: []
- id: lfe_level_05
  label: LFE Level 05 (Ext In / 7.1CH In)
  kind: action
  params: []
- id: lfe_level_10
  label: LFE Level 10 (Ext In / 7.1CH In)
  kind: action
  params: []
- id: lfe_level_15
  label: LFE Level 15 (Ext In / 7.1CH In)
  kind: action
  params: []
- id: lfe_level_query
  label: LFE Level Status Query
  kind: query
  params: []
- id: effect_on
  label: Effect On
  kind: action
  params: []
- id: effect_off
  label: Effect Off
  kind: action
  params: []
- id: effect_up
  label: Effect Level Up
  kind: action
  params: []
- id: effect_down
  label: Effect Level Down
  kind: action
  params: []
- id: effect_set
  label: Effect Level Set
  kind: action
  params:
    - name: value
      type: integer
      description: Effect 00-99, 1-15 operational range
- id: effect_query
  label: Effect Status Query
  kind: query
  params: []
- id: delay_up
  label: Delay Up
  kind: action
  params: []
- id: delay_down
  label: Delay Down
  kind: action
  params: []
- id: delay_set
  label: Delay Set
  kind: action
  params:
    - name: value
      type: integer
      description: Delay 000-999ms, 0-300ms operational range
- id: delay_query
  label: Delay Status Query
  kind: query
  params: []
- id: panorama_on
  label: Panorama On
  kind: action
  params: []
- id: panorama_off
  label: Panorama Off
  kind: action
  params: []
- id: panorama_query
  label: Panorama Status Query
  kind: query
  params: []
- id: dimension_up
  label: Dimension Up
  kind: action
  params: []
- id: dimension_down
  label: Dimension Down
  kind: action
  params: []
- id: dimension_set
  label: Dimension Set
  kind: action
  params:
    - name: value
      type: integer
      description: Dimension 00-99, 0-6 operational range
- id: dimension_query
  label: Dimension Status Query
  kind: query
  params: []
- id: center_width_up
  label: Center Width Up
  kind: action
  params: []
- id: center_width_down
  label: Center Width Down
  kind: action
  params: []
- id: center_width_set
  label: Center Width Set
  kind: action
  params:
    - name: value
      type: integer
      description: Center width 00-99, 0-7 operational range
- id: center_width_query
  label: Center Width Status Query
  kind: query
  params: []
- id: center_image_up
  label: Center Image Up
  kind: action
  params: []
- id: center_image_down
  label: Center Image Down
  kind: action
  params: []
- id: center_image_set
  label: Center Image Set
  kind: action
  params:
    - name: value
      type: integer
      description: Center image 00-99, 0.0-1.0 operational range
- id: center_image_query
  label: Center Image Status Query
  kind: query
  params: []
- id: center_gain_up
  label: Center Gain Up
  kind: action
  params: []
- id: center_gain_down
  label: Center Gain Down
  kind: action
  params: []
- id: center_gain_set
  label: Center Gain Set
  kind: action
  params:
    - name: value
      type: integer
      description: Center gain 00-99, 0.0-1.0 operational range
- id: center_gain_query
  label: Center Gain Status Query
  kind: query
  params: []
- id: center_spread_on
  label: Center Spread On
  kind: action
  params: []
- id: center_spread_off
  label: Center Spread Off
  kind: action
  params: []
- id: center_spread_query
  label: Center Spread Status Query
  kind: query
  params: []
- id: subwoofer_mode_on
  label: Subwoofer Mode On
  kind: action
  params: []
- id: subwoofer_mode_off
  label: Subwoofer Mode Off
  kind: action
  params: []
- id: subwoofer_mode_query
  label: Subwoofer Mode Status Query
  kind: query
  params: []
- id: room_size_small
  label: Room Size Small
  kind: action
  params: []
- id: room_size_medium_small
  label: Room Size Medium Small
  kind: action
  params: []
- id: room_size_medium
  label: Room Size Medium
  kind: action
  params: []
- id: room_size_medium_large
  label: Room Size Medium Large
  kind: action
  params: []
- id: room_size_large
  label: Room Size Large
  kind: action
  params: []
- id: room_size_query
  label: Room Size Status Query
  kind: query
  params: []
- id: audio_delay_up
  label: Audio Delay Up
  kind: action
  params: []
- id: audio_delay_down
  label: Audio Delay Down
  kind: action
  params: []
- id: audio_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: value
      type: integer
      description: Audio delay 000-999ms, 0-200ms operational range
- id: audio_delay_query
  label: Audio Delay Status Query
  kind: query
  params: []
- id: audio_restorer_off
  label: Audio Restorer Off
  kind: action
  params: []
- id: audio_restorer_low
  label: Audio Restorer Low
  kind: action
  params: []
- id: audio_restorer_med
  label: Audio Restorer Medium
  kind: action
  params: []
- id: audio_restorer_high
  label: Audio Restorer High
  kind: action
  params: []
- id: audio_restorer_query
  label: Audio Restorer Status Query
  kind: query
  params: []
- id: front_speaker_a
  label: Front Speaker A
  kind: action
  params: []
- id: front_speaker_b
  label: Front Speaker B
  kind: action
  params: []
- id: front_speaker_ab
  label: Front Speaker A+B
  kind: action
  params: []
- id: front_speaker_query
  label: Front Speaker Status Query
  kind: query
  params: []
- id: auropr_small
  label: Auro-Matic 3D Preset Small
  kind: action
  params: []
- id: auropr_medium
  label: Auro-Matic 3D Preset Medium
  kind: action
  params: []
- id: auropr_large
  label: Auro-Matic 3D Preset Large
  kind: action
  params: []
- id: auropr_speaker
  label: Auro-Matic 3D Preset Speaker
  kind: action
  params: []
- id: auropr_query
  label: Auro-Matic 3D Preset Status Query
  kind: query
  params: []
- id: aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: value
      type: integer
      description: Auro strength 01-99, 1-16 operational range
- id: aurost_query
  label: Auro-Matic 3D Strength Status Query
  kind: query
  params: []
- id: picture_off
  label: Picture Mode Off
  kind: action
  params: []
- id: picture_standard
  label: Picture Mode Standard
  kind: action
  params: []
- id: picture_movie
  label: Picture Mode Movie
  kind: action
  params: []
- id: picture_vivid
  label: Picture Mode Vivid
  kind: action
  params: []
- id: picture_stream
  label: Picture Mode Stream
  kind: action
  params: []
- id: picture_custom
  label: Picture Mode Custom
  kind: action
  params: []
- id: picture_isf_day
  label: Picture Mode ISF Day
  kind: action
  params: []
- id: picture_isf_night
  label: Picture Mode ISF Night
  kind: action
  params: []
- id: picture_query
  label: Picture Mode Status Query
  kind: query
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast 000-100, 050=0, -50 to +50 operational range
- id: contrast_query
  label: Contrast Status Query
  kind: query
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 000-100, 050=0, -50 to +50 operational range
- id: brightness_query
  label: Brightness Status Query
  kind: query
  params: []
- id: saturation_up
  label: Saturation Up
  kind: action
  params: []
- id: saturation_down
  label: Saturation Down
  kind: action
  params: []
- id: saturation_set
  label: Saturation Set
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation 000-100, 050=0, -50 to +50 operational range
- id: saturation_query
  label: Saturation Status Query
  kind: query
  params: []
- id: hue_up
  label: Hue Up
  kind: action
  params: []
- id: hue_down
  label: Hue Down
  kind: action
  params: []
- id: hue_set
  label: Hue Set
  kind: action
  params:
    - name: value
      type: integer
      description: Hue 44-56, 50=0, -6 to +6 operational range
- id: hue_query
  label: Hue Status Query
  kind: query
  params: []
- id: dnr_off
  label: DNR Off
  kind: action
  params: []
- id: dnr_low
  label: DNR Low
  kind: action
  params: []
- id: dnr_mid
  label: DNR Mid
  kind: action
  params: []
- id: dnr_high
  label: DNR High
  kind: action
  params: []
- id: dnr_query
  label: DNR Status Query
  kind: query
  params: []
- id: enhancer_up
  label: Enhancer Up
  kind: action
  params: []
- id: enhancer_down
  label: Enhancer Down
  kind: action
  params: []
- id: enhancer_set
  label: Enhancer Set
  kind: action
  params:
    - name: value
      type: integer
      description: Enhancer 00-12, 0-12 operational range
- id: enhancer_query
  label: Enhancer Status Query
  kind: query
  params: []
- id: zone2_on
  label: Zone2 On
  kind: action
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  params: []
- id: zone2_query
  label: Zone2 Status Query
  kind: query
  params: []
- id: zone2_source_phono
  label: Zone2 Select Phono
  kind: action
  params: []
- id: zone2_source_cd
  label: Zone2 Select CD
  kind: action
  params: []
- id: zone2_source_tuner
  label: Zone2 Select Tuner
  kind: action
  params: []
- id: zone2_source_dvd
  label: Zone2 Select DVD
  kind: action
  params: []
- id: zone2_source_bd
  label: Zone2 Select Blu-ray
  kind: action
  params: []
- id: zone2_source_tv
  label: Zone2 Select TV
  kind: action
  params: []
- id: zone2_source_sat_cbl
  label: Zone2 Select Sat/Cable
  kind: action
  params: []
- id: zone2_source_mplay
  label: Zone2 Select Media Player
  kind: action
  params: []
- id: zone2_source_game
  label: Zone2 Select Game
  kind: action
  params: []
- id: zone2_source_hdradio
  label: Zone2 Select HD Radio
  kind: action
  params: []
- id: zone2_source_net
  label: Zone2 Select Network
  kind: action
  params: []
- id: zone2_source_pandora
  label: Zone2 Select Pandora
  kind: action
  params: []
- id: zone2_source_siriusxm
  label: Zone2 Select SiriusXM
  kind: action
  params: []
- id: zone2_source_spotify
  label: Zone2 Select Spotify
  kind: action
  params: []
- id: zone2_source_lastfm
  label: Zone2 Select LastFM
  kind: action
  params: []
- id: zone2_source_flickr
  label: Zone2 Select Flickr
  kind: action
  params: []
- id: zone2_source_iradio
  label: Zone2 Select Internet Radio
  kind: action
  params: []
- id: zone2_source_server
  label: Zone2 Select Server
  kind: action
  params: []
- id: zone2_source_favorites
  label: Zone2 Select Favorites
  kind: action
  params: []
- id: zone2_source_aux1
  label: Zone2 Select Aux1
  kind: action
  params: []
- id: zone2_source_aux2
  label: Zone2 Select Aux2
  kind: action
  params: []
- id: zone2_source_aux3
  label: Zone2 Select Aux3
  kind: action
  params: []
- id: zone2_source_aux4
  label: Zone2 Select Aux4
  kind: action
  params: []
- id: zone2_source_aux5
  label: Zone2 Select Aux5
  kind: action
  params: []
- id: zone2_source_aux6
  label: Zone2 Select Aux6
  kind: action
  params: []
- id: zone2_source_aux7
  label: Zone2 Select Aux7
  kind: action
  params: []
- id: zone2_source_bt
  label: Zone2 Select Bluetooth
  kind: action
  params: []
- id: zone2_source_usb
  label: Zone2 Select USB
  kind: action
  params: []
- id: zone2_source_ipd
  label: Zone2 Select iPod Direct
  kind: action
  params: []
- id: zone2_source_irp
  label: Zone2 Select iRadio Recent Play
  kind: action
  params: []
- id: zone2_source_fvp
  label: Zone2 Select Favorites Play
  kind: action
  params: []
- id: zone2_quick1
  label: Zone2 Quick Select 1
  kind: action
  params: []
- id: zone2_quick2
  label: Zone2 Quick Select 2
  kind: action
  params: []
- id: zone2_quick3
  label: Zone2 Quick Select 3
  kind: action
  params: []
- id: zone2_quick4
  label: Zone2 Quick Select 4
  kind: action
  params: []
- id: zone2_quick5
  label: Zone2 Quick Select 5
  kind: action
  params: []
- id: zone2_quick0
  label: Zone2 Quick Select 0
  kind: action
  params: []
- id: zone2_quick1_memory
  label: Zone2 Quick Select 1 Memory
  kind: action
  params: []
- id: zone2_quick2_memory
  label: Zone2 Quick Select 2 Memory
  kind: action
  params: []
- id: zone2_quick3_memory
  label: Zone2 Quick Select 3 Memory
  kind: action
  params: []
- id: zone2_quick4_memory
  label: Zone2 Quick Select 4 Memory
  kind: action
  params: []
- id: zone2_quick5_memory
  label: Zone2 Quick Select 5 Memory
  kind: action
  params: []
- id: zone2_quick_query
  label: Zone2 Quick Select Query
  kind: query
  params: []
- id: zone2_favorite1
  label: Zone2 Favorite 1
  kind: action
  params: []
- id: zone2_favorite2
  label: Zone2 Favorite 2
  kind: action
  params: []
- id: zone2_favorite3
  label: Zone2 Favorite 3
  kind: action
  params: []
- id: zone2_favorite4
  label: Zone2 Favorite 4
  kind: action
  params: []
- id: zone2_favorite1_memory
  label: Zone2 Favorite 1 Memory
  kind: action
  params: []
- id: zone2_favorite2_memory
  label: Zone2 Favorite 2 Memory
  kind: action
  params: []
- id: zone2_favorite3_memory
  label: Zone2 Favorite 3 Memory
  kind: action
  params: []
- id: zone2_favorite4_memory
  label: Zone2 Favorite 4 Memory
  kind: action
  params: []
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone2 volume 00-98, 80=0dB, 00=minimum
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  params: []
- id: zone2_mute_query
  label: Zone2 Mute Status Query
  kind: query
  params: []
- id: zone2_channel_stereo
  label: Zone2 Channel Stereo
  kind: action
  params: []
- id: zone2_channel_mono
  label: Zone2 Channel Mono
  kind: action
  params: []
- id: zone2_channel_query
  label: Zone2 Channel Status Query
  kind: query
  params: []
- id: zone2_channel_volume_fl_up
  label: Zone2 Front Left Volume Up
  kind: action
  params: []
- id: zone2_channel_volume_fl_down
  label: Zone2 Front Left Volume Down
  kind: action
  params: []
- id: zone2_channel_volume_fl_set
  label: Zone2 Front Left Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone2 FL volume 38-62, 50=0dB
- id: zone2_channel_volume_fr_up
  label: Zone2 Front Right Volume Up
  kind: action
  params: []
- id: zone2_channel_volume_fr_down
  label: Zone2 Front Right Volume Down
  kind: action
  params: []
- id: zone2_channel_volume_fr_set
  label: Zone2 Front Right Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone2 FR volume 38-62, 50=0dB
- id: zone2_channel_volume_query
  label: Zone2 Channel Volume Query
  kind: query
  params: []
- id: zone2_hpf_on
  label: Zone2 HPF On
  kind: action
  params: []
- id: zone2_hpf_off
  label: Zone2 HPF Off
  kind: action
  params: []
- id: zone2_hpf_query
  label: Zone2 HPF Status Query
  kind: query
  params: []
- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  params: []
- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  params: []
- id: zone2_bass_set
  label: Zone2 Bass Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone2 bass 00-99, 40-60 operational range
- id: zone2_bass_query
  label: Zone2 Bass Status Query
  kind: query
  params: []
- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  params: []
- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  params: []
- id: zone2_treble_set
  label: Zone2 Treble Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone2 treble 00-99, 40-60 operational range
- id: zone2_treble_query
  label: Zone2 Treble Status Query
  kind: query
  params: []
- id: zone2_hdmi_auto
  label: Zone2 HDMI Output Through
  kind: action
  params: []
- id: zone2_hdmi_pcm
  label: Zone2 HDMI Output PCM
  kind: action
  params: []
- id: zone2_hdmi_query
  label: Zone2 HDMI Status Query
  kind: query
  params: []
- id: zone2_sleep_off
  label: Zone2 Sleep Off
  kind: action
  params: []
- id: zone2_sleep_set
  label: Zone2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: Zone2 sleep 001-120 minutes
- id: zone2_sleep_query
  label: Zone2 Sleep Status Query
  kind: query
  params: []
- id: zone2_standby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  params: []
- id: zone2_standby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  params: []
- id: zone2_standby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  params: []
- id: zone2_standby_off
  label: Zone2 Auto Standby Off
  kind: action
  params: []
- id: zone2_standby_query
  label: Zone2 Auto Standby Status Query
  kind: query
  params: []
- id: zone3_on
  label: Zone3 On
  kind: action
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  params: []
- id: zone3_query
  label: Zone3 Status Query
  kind: query
  params: []
- id: zone3_source_phono
  label: Zone3 Select Phono
  kind: action
  params: []
- id: zone3_source_cd
  label: Zone3 Select CD
  kind: action
  params: []
- id: zone3_source_tuner
  label: Zone3 Select Tuner
  kind: action
  params: []
- id: zone3_source_dvd
  label: Zone3 Select DVD
  kind: action
  params: []
- id: zone3_source_bd
  label: Zone3 Select Blu-ray
  kind: action
  params: []
- id: zone3_source_tv
  label: Zone3 Select TV
  kind: action
  params: []
- id: zone3_source_sat_cbl
  label: Zone3 Select Sat/Cable
  kind: action
  params: []
- id: zone3_source_mplay
  label: Zone3 Select Media Player
  kind: action
  params: []
- id: zone3_source_game
  label: Zone3 Select Game
  kind: action
  params: []
- id: zone3_source_hdradio
  label: Zone3 Select HD Radio
  kind: action
  params: []
- id: zone3_source_net
  label: Zone3 Select Network
  kind: action
  params: []
- id: zone3_source_pandora
  label: Zone3 Select Pandora
  kind: action
  params: []
- id: zone3_source_siriusxm
  label: Zone3 Select SiriusXM
  kind: action
  params: []
- id: zone3_source_spotify
  label: Zone3 Select Spotify
  kind: action
  params: []
- id: zone3_source_lastfm
  label: Zone3 Select LastFM
  kind: action
  params: []
- id: zone3_source_flickr
  label: Zone3 Select Flickr
  kind: action
  params: []
- id: zone3_source_iradio
  label: Zone3 Select Internet Radio
  kind: action
  params: []
- id: zone3_source_server
  label: Zone3 Select Server
  kind: action
  params: []
- id: zone3_source_favorites
  label: Zone3 Select Favorites
  kind: action
  params: []
- id: zone3_source_aux1
  label: Zone3 Select Aux1
  kind: action
  params: []
- id: zone3_source_aux2
  label: Zone3 Select Aux2
  kind: action
  params: []
- id: zone3_source_aux3
  label: Zone3 Select Aux3
  kind: action
  params: []
- id: zone3_source_aux4
  label: Zone3 Select Aux4
  kind: action
  params: []
- id: zone3_source_aux5
  label: Zone3 Select Aux5
  kind: action
  params: []
- id: zone3_source_aux6
  label: Zone3 Select Aux6
  kind: action
  params: []
- id: zone3_source_aux7
  label: Zone3 Select Aux7
  kind: action
  params: []
- id: zone3_source_bt
  label: Zone3 Select Bluetooth
  kind: action
  params: []
- id: zone3_source_usb
  label: Zone3 Select USB
  kind: action
  params: []
- id: zone3_source_ipd
  label: Zone3 Select iPod Direct
  kind: action
  params: []
- id: zone3_source_irp
  label: Zone3 Select iRadio Recent Play
  kind: action
  params: []
- id: zone3_source_fvp
  label: Zone3 Select Favorites Play
  kind: action
  params: []
- id: zone3_quick1
  label: Zone3 Quick Select 1
  kind: action
  params: []
- id: zone3_quick2
  label: Zone3 Quick Select 2
  kind: action
  params: []
- id: zone3_quick3
  label: Zone3 Quick Select 3
  kind: action
  params: []
- id: zone3_quick4
  label: Zone3 Quick Select 4
  kind: action
  params: []
- id: zone3_quick5
  label: Zone3 Quick Select 5
  kind: action
  params: []
- id: zone3_quick0
  label: Zone3 Quick Select 0
  kind: action
  params: []
- id: zone3_quick1_memory
  label: Zone3 Quick Select 1 Memory
  kind: action
  params: []
- id: zone3_quick2_memory
  label: Zone3 Quick Select 2 Memory
  kind: action
  params: []
- id: zone3_quick3_memory
  label: Zone3 Quick Select 3 Memory
  kind: action
  params: []
- id: zone3_quick4_memory
  label: Zone3 Quick Select 4 Memory
  kind: action
  params: []
- id: zone3_quick5_memory
  label: Zone3 Quick Select 5 Memory
  kind: action
  params: []
- id: zone3_quick_query
  label: Zone3 Quick Select Query
  kind: query
  params: []
- id: zone3_favorite1
  label: Zone3 Favorite 1
  kind: action
  params: []
- id: zone3_favorite2
  label: Zone3 Favorite 2
  kind: action
  params: []
- id: zone3_favorite3
  label: Zone3 Favorite 3
  kind: action
  params: []
- id: zone3_favorite4
  label: Zone3 Favorite 4
  kind: action
  params: []
- id: zone3_favorite1_memory
  label: Zone3 Favorite 1 Memory
  kind: action
  params: []
- id: zone3_favorite2_memory
  label: Zone3 Favorite 2 Memory
  kind: action
  params: []
- id: zone3_favorite3_memory
  label: Zone3 Favorite 3 Memory
  kind: action
  params: []
- id: zone3_favorite4_memory
  label: Zone3 Favorite 4 Memory
  kind: action
  params: []
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone3 volume 00-98, 80=0dB, 00=minimum
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  params: []
- id: zone3_mute_query
  label: Zone3 Mute Status Query
  kind: query
  params: []
- id: zone3_channel_stereo
  label: Zone3 Channel Stereo
  kind: action
  params: []
- id: zone3_channel_mono
  label: Zone3 Channel Mono
  kind: action
  params: []
- id: zone3_channel_query
  label: Zone3 Channel Status Query
  kind: query
  params: []
- id: zone3_channel_volume_fl_up
  label: Zone3 Front Left Volume Up
  kind: action
  params: []
- id: zone3_channel_volume_fl_down
  label: Zone3 Front Left Volume Down
  kind: action
  params: []
- id: zone3_channel_volume_fl_set
  label: Zone3 Front Left Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone3 FL volume 38-62, 50=0dB
- id: zone3_channel_volume_fr_up
  label: Zone3 Front Right Volume Up
  kind: action
  params: []
- id: zone3_channel_volume_fr_down
  label: Zone3 Front Right Volume Down
  kind: action
  params: []
- id: zone3_channel_volume_fr_set
  label: Zone3 Front Right Volume Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone3 FR volume 38-62, 50=0dB
- id: zone3_channel_volume_query
  label: Zone3 Channel Volume Query
  kind: query
  params: []
- id: zone3_hpf_on
  label: Zone3 HPF On
  kind: action
  params: []
- id: zone3_hpf_off
  label: Zone3 HPF Off
  kind: action
  params: []
- id: zone3_hpf_query
  label: Zone3 HPF Status Query
  kind: query
  params: []
- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  params: []
- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  params: []
- id: zone3_bass_set
  label: Zone3 Bass Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone3 bass 00-99, 40-60 operational range
- id: zone3_bass_query
  label: Zone3 Bass Status Query
  kind: query
  params: []
- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  params: []
- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  params: []
- id: zone3_treble_set
  label: Zone3 Treble Set
  kind: action
  params:
    - name: value
      type: integer
      description: Zone3 treble 00-99, 40-60 operational range
- id: zone3_treble_query
  label: Zone3 Treble Status Query
  kind: query
  params: []
- id: zone3_sleep_off
  label: Zone3 Sleep Off
  kind: action
  params: []
- id: zone3_sleep_set
  label: Zone3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: Zone3 sleep 001-120 minutes
- id: zone3_sleep_query
  label: Zone3 Sleep Status Query
  kind: query
  params: []
- id: zone3_standby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  params: []
- id: zone3_standby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  params: []
- id: zone3_standby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  params: []
- id: zone3_standby_off
  label: Zone3 Auto Standby Off
  kind: action
  params: []
- id: zone3_standby_query
  label: Zone3 Auto Standby Status Query
  kind: query
  params: []
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
      description: Frequency in kHz (AM) or MHz x100 (FM)
- id: tuner_frequency_query
  label: Tuner Frequency Query
  kind: query
  params: []
- id: tuner_rds_name_query
  label: Tuner RDS Station Name Query
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
      description: Preset number 01-56
- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tuner_preset_memory_set
  label: Tuner Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 01-56
- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  params: []
- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  params: []
- id: tuner_band_query
  label: Tuner Band Query
  kind: query
  params: []
- id: tuner_mode_auto
  label: Tuner Mode Auto
  kind: action
  params: []
- id: tuner_mode_manual
  label: Tuner Mode Manual
  kind: action
  params: []
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
    - name: frequency
      type: integer
      description: Frequency in kHz (AM) or MHz x100 (FM)
- id: hd_radio_multicast_set
  label: HD Radio Multicast Channel Set
  kind: action
  params:
    - name: channel
      type: integer
      description: Multicast channel 0-8
- id: hd_radio_query
  label: HD Radio Status Query
  kind: query
  params: []
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  params: []
- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset 01-56
- id: hd_radio_preset_query
  label: HD Radio Preset Query
  kind: query
  params: []
- id: hd_radio_preset_memory
  label: HD Radio Preset Memory
  kind: action
  params: []
- id: hd_radio_preset_memory_set
  label: HD Radio Preset Memory Set
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset 01-56
- id: hd_radio_band
  label: HD Radio Band Select
  kind: action
  params: []
- id: hd_radio_mode_query
  label: HD Radio Mode Query
  kind: query
  params: []
- id: online_nav_up
  label: Navigation Cursor Up
  kind: action
  params: []
- id: online_nav_down
  label: Navigation Cursor Down
  kind: action
  params: []
- id: online_nav_left
  label: Navigation Cursor Left
  kind: action
  params: []
- id: online_nav_right
  label: Navigation Cursor Right
  kind: action
  params: []
- id: online_nav_enter
  label: Navigation Enter
  kind: action
  params: []
- id: online_nav_play_pause
  label: Navigation Play/Pause
  kind: action
  params: []
- id: online_nav_stop
  label: Navigation Stop
  kind: action
  params: []
- id: online_nav_skip_plus
  label: Navigation Skip Plus
  kind: action
  params: []
- id: online_nav_skip_minus
  label: Navigation Skip Minus
  kind: action
  params: []
- id: online_nav_manual_search_plus
  label: Manual Search Plus
  kind: action
  params: []
- id: online_nav_manual_search_minus
  label: Manual Search Minus
  kind: action
  params: []
- id: online_nav_repeat_one
  label: Repeat One
  kind: action
  params: []
- id: online_nav_repeat_all
  label: Repeat All
  kind: action
  params: []
- id: online_nav_repeat_off
  label: Repeat Off
  kind: action
  params: []
- id: online_nav_random_on
  label: Random On
  kind: action
  params: []
- id: online_nav_random_off
  label: Random Off
  kind: action
  params: []
- id: online_nav_toggle_ipod_mode
  label: Toggle iPod Mode
  kind: action
  params: []
- id: online_nav_page_next
  label: Page Next
  kind: action
  params: []
- id: online_nav_page_previous
  label: Page Previous
  kind: action
  params: []
- id: online_nav_manual_search_stop
  label: Manual Search Stop
  kind: action
  params: []
- id: online_nav_repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: online_nav_random_toggle
  label: Random Toggle
  kind: action
  params: []
- id: online_preset_call
  label: Preset Call
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 00-35
- id: online_preset_memory
  label: Preset Memory
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 00-35
- id: online_preset_name_query
  label: Online Preset Name Status Query
  kind: query
  params: []
- id: online_favorites_add
  label: Add to Favorites
  kind: action
  params: []
- id: online_onscreen_display
  label: Onscreen Display Information
  kind: query
  params: []
- id: online_onscreen_display_query
  label: Onscreen Display Information Query
  kind: query
  params: []
- id: menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: menu_query
  label: Menu Status Query
  kind: query
  params: []
- id: instaprevue_on
  label: InstaPrevue On
  kind: action
  params: []
- id: instaprevue_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: instaprevue_query
  label: InstaPrevue Status Query
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
- id: all_zone_stereo_query
  label: All Zone Stereo Status Query
  kind: query
  params: []
- id: remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: panel_lock_on
  label: Panel Lock On
  kind: action
  params: []
- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  params: []
- id: panel_master_lock_on
  label: Panel + Master Volume Lock On
  kind: action
  params: []
- id: panel_master_lock_off
  label: Panel + Master Volume Lock Off
  kind: action
  params: []
- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  params: []
- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  params: []
- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  params: []
- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  params: []
- id: trigger_query
  label: Trigger Status Query
  kind: query
  params: []
- id: upgrade_id_query
  label: Upgrade ID Number Query
  kind: query
  params: []
- id: remote_maintenance_start
  label: Remote Maintenance Mode Start
  kind: action
  params: []
- id: remote_maintenance_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
- id: remote_maintenance_query
  label: Remote Maintenance Status Query
  kind: query
  params: []
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  params: []
- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  params: []
- id: dimmer_off
  label: Dimmer Off
  kind: action
  params: []
- id: dimmer_select
  label: Dimmer Select Toggle
  kind: action
  params: []
- id: dimmer_query
  label: Dimmer Status Query
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - PWON
    - PWSTANDBY
- id: master_volume_state
  type: string
  description: MV followed by 2-digit value (00-98), 80=0dB, 00=minimum
- id: mute_state
  type: enum
  values:
    - MUON
    - MUOFF
- id: input_state
  type: string
  description: SI followed by source name
- id: main_zone_state
  type: enum
  values:
    - ZMON
    - ZMOFF
- id: surround_state
  type: string
  description: MS followed by mode name
- id: channel_volume_state
  type: string
  description: CVFL/CVFR/etc followed by 2-digit value
- id: tuner_state
  type: string
  description: TFAN or TPAN response format
- id: hd_radio_state
  type: string
  description: TFHD response format
- id: trigger_state
  type: string
  description: TR1 ON/TR2 ON format
- id: dimmer_state
  type: enum
  values:
    - DIM BRI
    - DIM DIM
    - DIM DAR
    - DIM OFF
```

## Variables
```yaml
# UNRESOLVED: power-on sequencing requires 1 second wait after PWON command
# UNRESOLVED: volume parameter encoding - 0.5dB steps use 3 ASCII chars (e.g., MV805 for +0.5dB)
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited events when state changes (surround mode, input, volume)
# Event format same as COMMAND + CR
# Events sent within 5 seconds of state change
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
[]
```

## Notes
Command interval: 50ms minimum between commands. Response within 200ms of query command. Event within 5 seconds of state change. Power on requires 1 second wait before next command. Maximum data length 135 bytes per message.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: error code definitions not fully enumerated in source -->
<!-- UNRESOLVED: Ethernet auth type not explicitly stated (no login procedure found in source, inferred none) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-05-27T06:51:54.512Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:54.512Z
matched_actions: 524
action_count: 524
confidence: high
summary: "All 524 spec actions map 1:1 to source commands via semantic-id; transport matches verbatim."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
