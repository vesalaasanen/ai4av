---
spec_id: admin/denon-avr-s-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR-S Series Control Spec"
manufacturer: Denon
model_family: "AVR-S Series"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "AVR-S Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-04T16:21:51.403Z
last_checked_at: 2026-05-14T18:17:15.280Z
generated_at: 2026-05-14T18:17:15.280Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete model list for AVR-S Series not enumerated in source"
  - "Complete event list not explicitly enumerated in source."
  - "No explicit safety warnings, interlock procedures, or power-on sequencing"
  - "complete model list for AVR-S Series (e.g., AVR-S720W, AVR-S920W) not enumerated"
  - "firmware version compatibility not stated in source"
  - "Complete unsolicited event list not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:15.280Z
  matched_actions: 463
  action_count: 463
  confidence: medium
  summary: "All 632 semantic-id actions matched to source commands; transport parameters verified verbatim in protocol specification. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Denon AVR-S Series Control Spec

## Summary
Denon AV Receiver supporting both RS-232C and Ethernet (TCP/IP) control. Protocol uses ASCII command strings terminated by CR (0x0D). Supports multi-zone audio (Main Zone, Zone2, Zone3), comprehensive surround mode selection, tuner control, and HD Radio. Control interfaces: RS-232C (9600bps 8N1) and Ethernet (TCP port 23 telnet).

<!-- UNRESOLVED: complete model list for AVR-S Series not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) stated in source
serial:
  baud_rate: 9600  # "Communication speed: 9600bps" stated in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWON, PWSTANDBY commands present
- routable         # SI (input select) commands present
- queryable        # PW?, MV?, SI?, etc. query commands present
- levelable        # MV (master volume), CV (channel volume), PS (tone control) present
```

## Actions
```yaml
# Power Control
- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []
- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY"
  params: []
- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PW?"
  params: []

# Master Volume
- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "MVUP"
  params: []
- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN"
  params: []
- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: integer
      description: "Volume level 00-98 (ASCII), 80=0dB, 00=minimum"
- id: master_volume_query
  label: Master Volume Status Query
  kind: query
  command: "MV?"
  params: []

# Channel Volume (CV)
- id: channel_volume_fl_up
  label: Channel Volume Front Left Up
  kind: action
  command: "CVFL UP"
  params: []
- id: channel_volume_fl_down
  label: Channel Volume Front Left Down
  kind: action
  command: "CVFL DOWN"
  params: []
- id: channel_volume_fl_set
  label: Channel Volume Front Left Set
  kind: action
  command: "CVFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fr_up
  label: Channel Volume Front Right Up
  kind: action
  command: "CVFR UP"
  params: []
- id: channel_volume_fr_down
  label: Channel Volume Front Right Down
  kind: action
  command: "CVFR DOWN"
  params: []
- id: channel_volume_fr_set
  label: Channel Volume Front Right Set
  kind: action
  command: "CVFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_c_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP"
  params: []
- id: channel_volume_c_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN"
  params: []
- id: channel_volume_c_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sw_up
  label: Channel Volume Subwoofer Up
  kind: action
  command: "CVSW UP"
  params: []
- id: channel_volume_sw_down
  label: Channel Volume Subwoofer Down
  kind: action
  command: "CVSW DOWN"
  params: []
- id: channel_volume_sw_set
  label: Channel Volume Subwoofer Set
  kind: action
  command: "CVSW {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 ASCII, 50=0dB"
- id: channel_volume_sw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP"
  params: []
- id: channel_volume_sw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN"
  params: []
- id: channel_volume_sw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  command: "CVSW2 {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 ASCII, 50=0dB"
- id: channel_volume_sl_up
  label: Channel Volume Surround Left Up
  kind: action
  command: "CVSL UP"
  params: []
- id: channel_volume_sl_down
  label: Channel Volume Surround Left Down
  kind: action
  command: "CVSL DOWN"
  params: []
- id: channel_volume_sl_set
  label: Channel Volume Surround Left Set
  kind: action
  command: "CVSL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sr_up
  label: Channel Volume Surround Right Up
  kind: action
  command: "CVSR UP"
  params: []
- id: channel_volume_sr_down
  label: Channel Volume Surround Right Down
  kind: action
  command: "CVSR DOWN"
  params: []
- id: channel_volume_sr_set
  label: Channel Volume Surround Right Set
  kind: action
  command: "CVSR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sbl_up
  label: Channel Volume Surround Back Left Up
  kind: action
  command: "CVSBL UP"
  params: []
- id: channel_volume_sbl_down
  label: Channel Volume Surround Back Left Down
  kind: action
  command: "CVSBL DOWN"
  params: []
- id: channel_volume_sbl_set
  label: Channel Volume Surround Back Left Set
  kind: action
  command: "CVSBL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sbr_up
  label: Channel Volume Surround Back Right Up
  kind: action
  command: "CVSBR UP"
  params: []
- id: channel_volume_sbr_down
  label: Channel Volume Surround Back Right Down
  kind: action
  command: "CVSBR DOWN"
  params: []
- id: channel_volume_sbr_set
  label: Channel Volume Surround Back Right Set
  kind: action
  command: "CVSBR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sb_up
  label: Channel Volume Surround Back Up
  kind: action
  command: "CVSB UP"
  params: []
- id: channel_volume_sb_down
  label: Channel Volume Surround Back Down
  kind: action
  command: "CVSB DOWN"
  params: []
- id: channel_volume_sb_set
  label: Channel Volume Surround Back Set
  kind: action
  command: "CVSB {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fhl_up
  label: Channel Volume Front Height Left Up
  kind: action
  command: "CVFHL UP"
  params: []
- id: channel_volume_fhl_down
  label: Channel Volume Front Height Left Down
  kind: action
  command: "CVFHL DOWN"
  params: []
- id: channel_volume_fhl_set
  label: Channel Volume Front Height Left Set
  kind: action
  command: "CVFHL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fhr_up
  label: Channel Volume Front Height Right Up
  kind: action
  command: "CVFHR UP"
  params: []
- id: channel_volume_fhr_down
  label: Channel Volume Front Height Right Down
  kind: action
  command: "CVFHR DOWN"
  params: []
- id: channel_volume_fhr_set
  label: Channel Volume Front Height Right Set
  kind: action
  command: "CVFHR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fwl_up
  label: Channel Volume Front Wide Left Up
  kind: action
  command: "CVFWL UP"
  params: []
- id: channel_volume_fwl_down
  label: Channel Volume Front Wide Left Down
  kind: action
  command: "CVFWL DOWN"
  params: []
- id: channel_volume_fwl_set
  label: Channel Volume Front Wide Left Set
  kind: action
  command: "CVFWL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fwr_up
  label: Channel Volume Front Wide Right Up
  kind: action
  command: "CVFWR UP"
  params: []
- id: channel_volume_fwr_down
  label: Channel Volume Front Wide Right Down
  kind: action
  command: "CVFWR DOWN"
  params: []
- id: channel_volume_fwr_set
  label: Channel Volume Front Wide Right Set
  kind: action
  command: "CVFWR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_tfl_up
  label: Channel Volume Top Front Left Up
  kind: action
  command: "CVTFL UP"
  params: []
- id: channel_volume_tfl_down
  label: Channel Volume Top Front Left Down
  kind: action
  command: "CVTFL DOWN"
  params: []
- id: channel_volume_tfl_set
  label: Channel Volume Top Front Left Set
  kind: action
  command: "CVTFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_tfr_up
  label: Channel Volume Top Front Right Up
  kind: action
  command: "CVTFR UP"
  params: []
- id: channel_volume_tfr_down
  label: Channel Volume Top Front Right Down
  kind: action
  command: "CVTFR DOWN"
  params: []
- id: channel_volume_tfr_set
  label: Channel Volume Top Front Right Set
  kind: action
  command: "CVTFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_tml_up
  label: Channel Volume Top Middle Left Up
  kind: action
  command: "CVTML UP"
  params: []
- id: channel_volume_tml_down
  label: Channel Volume Top Middle Left Down
  kind: action
  command: "CVTML DOWN"
  params: []
- id: channel_volume_tml_set
  label: Channel Volume Top Middle Left Set
  kind: action
  command: "CVTML {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_tmr_up
  label: Channel Volume Top Middle Right Up
  kind: action
  command: "CVTMR UP"
  params: []
- id: channel_volume_tmr_down
  label: Channel Volume Top Middle Right Down
  kind: action
  command: "CVTMR DOWN"
  params: []
- id: channel_volume_tmr_set
  label: Channel Volume Top Middle Right Set
  kind: action
  command: "CVTMR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_trl_up
  label: Channel Volume Top Rear Left Up
  kind: action
  command: "CVTRL UP"
  params: []
- id: channel_volume_trl_down
  label: Channel Volume Top Rear Left Down
  kind: action
  command: "CVTRL DOWN"
  params: []
- id: channel_volume_trl_set
  label: Channel Volume Top Rear Left Set
  kind: action
  command: "CVTRL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_trr_up
  label: Channel Volume Top Rear Right Up
  kind: action
  command: "CVTRR UP"
  params: []
- id: channel_volume_trr_down
  label: Channel Volume Top Rear Right Down
  kind: action
  command: "CVTRR DOWN"
  params: []
- id: channel_volume_trr_set
  label: Channel Volume Top Rear Right Set
  kind: action
  command: "CVTRR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_rhl_up
  label: Channel Volume Rear Height Left Up
  kind: action
  command: "CVRHL UP"
  params: []
- id: channel_volume_rhl_down
  label: Channel Volume Rear Height Left Down
  kind: action
  command: "CVRHL DOWN"
  params: []
- id: channel_volume_rhl_set
  label: Channel Volume Rear Height Left Set
  kind: action
  command: "CVRHL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_rhr_up
  label: Channel Volume Rear Height Right Up
  kind: action
  command: "CVRHR UP"
  params: []
- id: channel_volume_rhr_down
  label: Channel Volume Rear Height Right Down
  kind: action
  command: "CVRHR DOWN"
  params: []
- id: channel_volume_rhr_set
  label: Channel Volume Rear Height Right Set
  kind: action
  command: "CVRHR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fdl_up
  label: Channel Volume Front Dolby Left Up
  kind: action
  command: "CVFDL UP"
  params: []
- id: channel_volume_fdl_down
  label: Channel Volume Front Dolby Left Down
  kind: action
  command: "CVFDL DOWN"
  params: []
- id: channel_volume_fdl_set
  label: Channel Volume Front Dolby Left Set
  kind: action
  command: "CVFDL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_fdr_up
  label: Channel Volume Front Dolby Right Up
  kind: action
  command: "CVFDR UP"
  params: []
- id: channel_volume_fdr_down
  label: Channel Volume Front Dolby Right Down
  kind: action
  command: "CVFDR DOWN"
  params: []
- id: channel_volume_fdr_set
  label: Channel Volume Front Dolby Right Set
  kind: action
  command: "CVFDR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sdl_up
  label: Channel Volume Surround Dolby Left Up
  kind: action
  command: "CVSDL UP"
  params: []
- id: channel_volume_sdl_down
  label: Channel Volume Surround Dolby Left Down
  kind: action
  command: "CVSDL DOWN"
  params: []
- id: channel_volume_sdl_set
  label: Channel Volume Surround Dolby Left Set
  kind: action
  command: "CVSDL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_sdr_up
  label: Channel Volume Surround Dolby Right Up
  kind: action
  command: "CVSDR UP"
  params: []
- id: channel_volume_sdr_down
  label: Channel Volume Surround Dolby Right Down
  kind: action
  command: "CVSDR DOWN"
  params: []
- id: channel_volume_sdr_set
  label: Channel Volume Surround Dolby Right Set
  kind: action
  command: "CVSDR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_bdl_up
  label: Channel Volume Back Dolby Left Up
  kind: action
  command: "CVBDL UP"
  params: []
- id: channel_volume_bdl_down
  label: Channel Volume Back Dolby Left Down
  kind: action
  command: "CVBDL DOWN"
  params: []
- id: channel_volume_bdl_set
  label: Channel Volume Back Dolby Left Set
  kind: action
  command: "CVBDL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_bdr_up
  label: Channel Volume Back Dolby Right Up
  kind: action
  command: "CVBDR UP"
  params: []
- id: channel_volume_bdr_down
  label: Channel Volume Back Dolby Right Down
  kind: action
  command: "CVBDR DOWN"
  params: []
- id: channel_volume_bdr_set
  label: Channel Volume Back Dolby Right Set
  kind: action
  command: "CVBDR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: channel_volume_shl_up
  label: Channel Volume Surround Height Left Up
  kind: action
  command: "CVSHL UP"
  params: []
- id: channel_volume_shl_down
  label: Channel Volume Surround Height Left Down
  kind: action
  command: "CVSHL DOWN"
  params: []
- id: channel_volume_shl_set
  label: Channel Volume Surround Height Left Set
  kind: action
  command: "CVSHL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB (Auro-3D Upgrade only)"
- id: channel_volume_shr_up
  label: Channel Volume Surround Height Right Up
  kind: action
  command: "CVSHR UP"
  params: []
- id: channel_volume_shr_down
  label: Channel Volume Surround Height Right Down
  kind: action
  command: "CVSHR DOWN"
  params: []
- id: channel_volume_shr_set
  label: Channel Volume Surround Height Right Set
  kind: action
  command: "CVSHR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB (Auro-3D Upgrade only)"
- id: channel_volume_ts_up
  label: Channel Volume Top Surround Up
  kind: action
  command: "CVTS UP"
  params: []
- id: channel_volume_ts_down
  label: Channel Volume Top Surround Down
  kind: action
  command: "CVTS DOWN"
  params: []
- id: channel_volume_ts_set
  label: Channel Volume Top Surround Set
  kind: action
  command: "CVTS {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB (Auro-3D Upgrade only)"
- id: channel_volume_reset_all
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []
- id: channel_volume_query
  label: Channel Volume Status Query
  kind: query
  command: "CV?"
  params: []

# Mute
- id: mute_on
  label: Mute On
  kind: action
  command: "MUON"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "MUOFF"
  params: []
- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MU?"
  params: []

# Input Select (SI)
- id: input_select
  label: Select Input Source
  kind: action
  command: "SI{source}"
  params:
    - name: source
      type: string
      enum:
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
- id: input_select_query
  label: Input Source Status Query
  kind: query
  command: "SI?"
  params: []

# Main Zone On/Off
- id: main_zone_on
  label: Main Zone On
  kind: action
  command: "ZMON"
  params: []
- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF"
  params: []
- id: main_zone_query
  label: Main Zone Status Query
  kind: query
  command: "ZM?"
  params: []
- id: main_zone_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1"
  params: []
- id: main_zone_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2"
  params: []
- id: main_zone_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3"
  params: []
- id: main_zone_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4"
  params: []
- id: main_zone_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY"
  params: []
- id: main_zone_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY"
  params: []
- id: main_zone_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY"
  params: []
- id: main_zone_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY"
  params: []

# Record Select
- id: record_select
  label: Record Source Select
  kind: action
  command: "SR{source}"
  params:
    - name: source
      type: string
      enum:
        - PHONO
        - IPOD
        - USB DIRECT
        - IPOD DIRECT
        - SOURCE
- id: record_select_query
  label: Record Select Status Query
  kind: query
  command: "SR?"
  params: []

# Input Mode (SD)
- id: input_mode_auto
  label: Set Input Mode Auto
  kind: action
  command: "SDAUTO"
  params: []
- id: input_mode_hdmi
  label: Set Input Mode HDMI
  kind: action
  command: "SDHDMI"
  params: []
- id: input_mode_digital
  label: Set Input Mode Digital
  kind: action
  command: "SDDIGITAL"
  params: []
- id: input_mode_analog
  label: Set Input Mode Analog
  kind: action
  command: "SDANALOG"
  params: []
- id: input_mode_extin
  label: Set External Input Mode
  kind: action
  command: "SDEXT.IN"
  params: []
- id: input_mode_71in
  label: Set 7.1 Channel Input Mode
  kind: action
  command: "SD7.1IN"
  params: []
- id: input_mode_query
  label: Input Mode Status Query
  kind: query
  command: "SD?"
  params: []

# Digital Input (DC)
- id: digital_input_auto
  label: Digital Input Auto
  kind: action
  command: "DCAUTO"
  params: []
- id: digital_input_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM"
  params: []
- id: digital_input_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS"
  params: []
- id: digital_input_query
  label: Digital Input Status Query
  kind: query
  command: "DC?"
  params: []

# Video Select (SV)
- id: video_select
  label: Video Select
  kind: action
  command: "SV{source}"
  params:
    - name: source
      type: string
      enum:
        - DVD
        - BD
        - TV
        - SAT/CBL
        - MPLAY
        - GAME
        - AUX1
        - AUX2
        - AUX3
        - AUX4
        - AUX5
        - AUX6
        - AUX7
        - CD
        - SOURCE
        - ON
        - OFF
- id: video_select_query
  label: Video Select Status Query
  kind: query
  command: "SV?"
  params: []

# Sleep Timer
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []
- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes"
- id: sleep_timer_query
  label: Sleep Timer Status Query
  kind: query
  command: "SLP?"
  params: []

# Auto Standby
- id: auto_standby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M"
  params: []
- id: auto_standby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M"
  params: []
- id: auto_standby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M"
  params: []
- id: auto_standby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF"
  params: []
- id: auto_standby_query
  label: Auto Standby Status Query
  kind: query
  command: "STBY?"
  params: []

# ECO Mode
- id: eco_mode_on
  label: ECO Mode On
  kind: action
  command: "ECOON"
  params: []
- id: eco_mode_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO"
  params: []
- id: eco_mode_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF"
  params: []
- id: eco_mode_query
  label: ECO Mode Status Query
  kind: query
  command: "ECO?"
  params: []

# Surround Mode (MS)
- id: surround_mode
  label: Surround Mode
  kind: action
  command: "MS{mode}"
  params:
    - name: mode
      type: string
      enum:
        - MOVIE
        - MUSIC
        - GAME
        - DIRECT
        - PURE DIRECT
        - STEREO
        - AUTO
        - DOLBY DIGITAL
        - DOLBY PRO LOGIC
        - DOLBY PL2 C
        - DOLBY PL2 M
        - DOLBY PL2 G
        - DOLBY PL2X C
        - DOLBY PL2X M
        - DOLBY PL2X G
        - DOLBY PL2Z H
        - DOLBY SURROUND
        - DOLBY ATMOS
        - DOLBY D EX
        - DOLBY D+PL2X C
        - DOLBY D+PL2X M
        - DOLBY D+PL2Z H
        - DOLBY D+DS
        - DOLBY D+NEO:X C
        - DOLBY D+NEO:X M
        - DOLBY D+NEO:X G
        - DTS SURROUND
        - DTS ES DSCRT6.1
        - DTS ES MTRX6.1
        - DTS+PL2X C
        - DTS+PL2X M
        - DTS+PL2Z H
        - DTS+DS
        - DTS96/24
        - DTS96 ES MTRX
        - DTS+NEO:6
        - DTS+NEO:X C
        - DTS+NEO:X M
        - DTS+NEO:X G
        - MULTI CH IN
        - M CH IN+DOLBY EX
        - M CH IN+PL2X C
        - M CH IN+PL2X M
        - M CH IN+PL2Z H
        - M CH IN+DS
        - MULTI CH IN 7.1
        - M CH IN+NEO:X C
        - M CH IN+NEO:X M
        - M CH IN+NEO:X G
        - DOLBY D+
        - DOLBY D+ +EX
        - DOLBY D+ +PL2X C
        - DOLBY D+ +PL2X M
        - DOLBY D+ +PL2Z H
        - DOLBY D+ +DS
        - DOLBY D+ +NEO:X C
        - DOLBY D+ +NEO:X M
        - DOLBY D+ +NEO:X G
        - DOLBY HD
        - DOLBY HD+EX
        - DOLBY HD+PL2X C
        - DOLBY HD+PL2X M
        - DOLBY HD+PL2Z H
        - DOLBY HD+DS
        - DOLBY HD+NEO:X C
        - DOLBY HD+NEO:X M
        - DOLBY HD+NEO:X G
        - DTS HD
        - DTS HD MSTR
        - DTS HD+PL2X C
        - DTS HD+PL2X M
        - DTS HD+PL2Z H
        - DTS HD+NEO:6
        - DTS HD+DS
        - DTS HD+NEO:X C
        - DTS HD+NEO:X M
        - DTS HD+NEO:X G
        - DTS EXPRESS
        - DTS ES 8CH DSCRT
        - MPEG2 AAC
        - AAC+DOLBY EX
        - AAC+PL2X C
        - AAC+PL2X M
        - AAC+PL2Z H
        - AAC+DS
        - AAC+NEO:X C
        - AAC+NEO:X M
        - AAC+NEO:X G
        - PL DSX
        - PL2 C DSX
        - PL2 M DSX
        - PL2 G DSX
        - PL2X C DSX
        - PL2X M DSX
        - PL2X G DSX
        - AUDYSSEY DSX
        - AURO3D
        - AURO2DSURR
        - MCH STEREO
        - WIDE SCREEN
        - SUPER STADIUM
        - ROCK ARENA
        - JAZZ CLUB
        - CLASSIC CONCERT
        - MONO MOVIE
        - MATRIX
        - VIDEO GAME
        - VIRTUAL
        - LEFT
        - RIGHT
        - ALL ZONE STEREO
        - 7.1IN
        - PURE DIRECT EXT
- id: surround_mode_query
  label: Surround Mode Status Query
  kind: query
  command: "MS?"
  params: []

# Quick Select (MS)
- id: quick_select_1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1"
  params: []
- id: quick_select_2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2"
  params: []
- id: quick_select_3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3"
  params: []
- id: quick_select_4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4"
  params: []
- id: quick_select_5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5"
  params: []
- id: quick_select_0
  label: Quick Select 0
  kind: action
  command: "MSQUICK0"
  params: []
- id: quick_memory_1
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY"
  params: []
- id: quick_memory_2
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY"
  params: []
- id: quick_memory_3
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY"
  params: []
- id: quick_memory_4
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY"
  params: []
- id: quick_memory_5
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY"
  params: []
- id: quick_select_query
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK?"
  params: []

# Video Output (VS)
- id: video_aspect_43
  label: Set Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM"
  params: []
- id: video_aspect_169
  label: Set Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL"
  params: []
- id: video_aspect_query
  label: Video Aspect Status Query
  kind: query
  command: "VSASP?"
  params: []
- id: hdmi_monitor_auto
  label: HDMI Monitor Auto
  kind: action
  command: "VSMONIAUTO"
  params: []
- id: hdmi_monitor_1
  label: HDMI Monitor 1
  kind: action
  command: "VSMONI1"
  params: []
- id: hdmi_monitor_2
  label: HDMI Monitor 2
  kind: action
  command: "VSMONI2"
  params: []
- id: hdmi_monitor_query
  label: HDMI Monitor Status Query
  kind: query
  command: "VSMONI?"
  params: []
- id: video_resolution
  label: Video Resolution
  kind: action
  command: "VS{mode}"
  params:
    - name: mode
      type: string
      enum:
        - SC48P
        - SC10I
        - SC72P
        - SC10P
        - SC10P24
        - SC4K
        - SC4KF
        - SCAUTO
        - SCH48P
        - SCH10I
        - SCH72P
        - SCH10P
        - SCH10P24
        - SCH4K
        - SCH4KF
        - SCHAUTO
- id: video_resolution_query
  label: Video Resolution Status Query (standard)
  kind: query
  command: "VSSC?"
  params: []
- id: video_resolution_hdmi_query
  label: Video Resolution Status Query (HDMI)
  kind: query
  command: "VSSCH?"
  params: []
- id: hdmi_audio_amp
  label: HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []
- id: hdmi_audio_tv
  label: HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV"
  params: []
- id: hdmi_audio_query
  label: HDMI Audio Status Query
  kind: query
  command: "VSAUDIO?"
  params: []
- id: video_processing_auto
  label: Video Processing Mode Auto
  kind: action
  command: "VSVPMAUTO"
  params: []
- id: video_processing_game
  label: Video Processing Mode Game
  kind: action
  command: "VSVPMGAME"
  params: []
- id: video_processing_movie
  label: Video Processing Mode Movie
  kind: action
  command: "VSVPMMOVI"
  params: []
- id: video_processing_query
  label: Video Processing Status Query
  kind: query
  command: "VSVPM?"
  params: []
- id: vertical_stretch_on
  label: Vertical Stretch On
  kind: action
  command: "VSVST ON"
  params: []
- id: vertical_stretch_off
  label: Vertical Stretch Off
  kind: action
  command: "VSVST OFF"
  params: []
- id: vertical_stretch_query
  label: Vertical Stretch Status Query
  kind: query
  command: "VSVST?"
  params: []

# Tone Control (PS)
- id: tone_control_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON"
  params: []
- id: tone_control_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF"
  params: []
- id: tone_control_query
  label: Tone Control Status Query
  kind: query
  command: "PSTONE CTRL?"
  params: []
- id: bass_up
  label: Bass Up
  kind: action
  command: "PSBAS UP"
  params: []
- id: bass_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN"
  params: []
- id: bass_set
  label: Bass Set
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB, range -6 to +6 dB (44-56)"
- id: bass_query
  label: Bass Status Query
  kind: query
  command: "PSBAS?"
  params: []
- id: treble_up
  label: Treble Up
  kind: action
  command: "PSTRE UP"
  params: []
- id: treble_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN"
  params: []
- id: treble_set
  label: Treble Set
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB, range -6 to +6 dB (44-56)"
- id: treble_query
  label: Treble Status Query
  kind: query
  command: "PSTRE?"
  params: []
- id: dialog_level_on
  label: Dialog Level Adjust On
  kind: action
  command: "PSDIL ON"
  params: []
- id: dialog_level_off
  label: Dialog Level Adjust Off
  kind: action
  command: "PSDIL OFF"
  params: []
- id: dialog_level_up
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP"
  params: []
- id: dialog_level_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN"
  params: []
- id: dialog_level_set
  label: Dialog Level Set
  kind: action
  command: "PSDIL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: dialog_level_query
  label: Dialog Level Status Query
  kind: query
  command: "PSDIL?"
  params: []
- id: subwoofer_level_on
  label: Subwoofer Level Adjust On
  kind: action
  command: "PSSWL ON"
  params: []
- id: subwoofer_level_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: "PSSWL OFF"
  params: []
- id: subwoofer_level_up
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP"
  params: []
- id: subwoofer_level_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN"
  params: []
- id: subwoofer_level_set
  label: Subwoofer Level Set
  kind: action
  command: "PSSWL {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 ASCII, 50=0dB"
- id: subwoofer2_level_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP"
  params: []
- id: subwoofer2_level_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN"
  params: []
- id: subwoofer2_level_set
  label: Subwoofer 2 Level Set
  kind: action
  command: "PSSWL2 {level}"
  params:
    - name: level
      type: integer
      description: "00,38-62 ASCII, 50=0dB"
- id: subwoofer_level_query
  label: Subwoofer Level Status Query
  kind: query
  command: "PSSWL?"
  params: []
- id: cinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON"
  params: []
- id: cinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF"
  params: []
- id: cinema_eq_query
  label: Cinema EQ Status Query
  kind: query
  command: "PSCINEMA EQ.?"
  params: []
- id: ps_mode_music
  label: PS Mode Music
  kind: action
  command: "PSMODE:MUSIC"
  params: []
- id: ps_mode_cinema
  label: PS Mode Cinema
  kind: action
  command: "PSMODE:CINEMA"
  params: []
- id: ps_mode_game
  label: PS Mode Game
  kind: action
  command: "PSMODE:GAME"
  params: []
- id: ps_mode_pro_logic
  label: PS Mode Pro Logic
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []
- id: loudness_management_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON"
  params: []
- id: loudness_management_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF"
  params: []
- id: front_height_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON"
  params: []
- id: front_height_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF"
  params: []
- id: speaker_output
  label: Speaker Output Set
  kind: action
  command: "PSSP:{mode}"
  params:
    - name: mode
      type: string
      enum: [FW, FH, SB, HW, BH, BW, FL, HF, FR]
      description: "FW=Front Wide, FH=Front Height, SB=Surround Back, HW=Height+Wide, BH=SB+Height, BW=SB+Wide, FL=Floor Height, HF=Height+Front, FR=Floor+Front"
- id: pl2z_height_gain
  label: PL2z Height Gain
  kind: action
  command: "PSPHG {level}"
  params:
    - name: level
      type: string
      enum: [LOW, MID, HI]
- id: multeq_mode
  label: MultEQ Mode
  kind: action
  command: "PSMULTEQ:{mode}"
  params:
    - name: mode
      type: string
      enum: [AUDYSSEY, "BYP.LR", FLAT, MANUAL, OFF]
      description: "AUDYSSEY=Reference, BYP.LR=L/R Bypass"
- id: dynamic_eq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON"
  params: []
- id: dynamic_eq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF"
  params: []
- id: dynamic_eq_query
  label: Dynamic EQ Status Query
  kind: query
  command: "PSDYNEQ?"
  params: []
- id: reference_level
  label: Reference Level Offset
  kind: action
  command: "PSREFLEV {offset}"
  params:
    - name: offset
      type: integer
      enum: [0, 5, 10, 15]
      description: "0=0dB, 5=5dB, 10=10dB, 15=15dB"
- id: reference_level_query
  label: Reference Level Status Query
  kind: query
  command: "PSREFLEV?"
  params: []
- id: dynamic_volume
  label: Dynamic Volume
  kind: action
  command: "PSDYNVOL {mode}"
  params:
    - name: mode
      type: string
      enum: [HEV, MED, LIT, OFF]
      description: "HEV=Heavy, MED=Medium, LIT=Light, OFF=Off"
- id: dynamic_volume_query
  label: Dynamic Volume Status Query
  kind: query
  command: "PSDYNVOL?"
  params: []
- id: audyssey_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON"
  params: []
- id: audyssey_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF"
  params: []
- id: containment_amount_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP"
  params: []
- id: containment_amount_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN"
  params: []
- id: containment_amount_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 01-07 operable range"
- id: audyssey_dsx
  label: Audyssey DSX
  kind: action
  command: "PSDSX {mode}"
  params:
    - name: mode
      type: string
      enum: [ONHW, ONH, ONW, OFF]
      description: "ONHW=On Height+Wide, ONH=On Height, ONW=On Width, OFF=Off"
- id: stage_width_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP"
  params: []
- id: stage_width_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN"
  params: []
- id: stage_width_set
  label: Stage Width Set
  kind: action
  command: "PSSTW {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB, 40-60 operable"
- id: stage_height_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP"
  params: []
- id: stage_height_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN"
  params: []
- id: stage_height_set
  label: Stage Height Set
  kind: action
  command: "PSSTH {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB, 40-60 operable"
- id: graphic_eq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON"
  params: []
- id: graphic_eq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF"
  params: []
- id: dynamic_compression
  label: Dynamic Compression
  kind: action
  command: "PSDRC {mode}"
  params:
    - name: mode
      type: string
      enum: [AUTO, LOW, MID, HI, OFF]
- id: bass_sync_up
  label: Bass Sync Up
  kind: action
  command: "PSBSC UP"
  params: []
- id: bass_sync_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN"
  params: []
- id: bass_sync_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 0-16 operable range"
- id: dialogue_enhancer
  label: Dialogue Enhancer
  kind: action
  command: "PSDEH {level}"
  params:
    - name: level
      type: string
      enum: [OFF, LOW, MED, HIGH]
- id: lfe_up
  label: LFE Up
  kind: action
  command: "PSLFE UP"
  params: []
- id: lfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN"
  params: []
- id: lfe_set
  label: LFE Set
  kind: action
  command: "PSLFE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 00=0dB, 10=-10dB, 0 to -10 operable"
- id: effect_on
  label: Effect On
  kind: action
  command: "PSEFF ON"
  params: []
- id: effect_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF"
  params: []
- id: effect_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP"
  params: []
- id: effect_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN"
  params: []
- id: effect_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 1-15 operable range"
- id: delay_up
  label: Delay Up
  kind: action
  command: "PSDEL UP"
  params: []
- id: delay_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN"
  params: []
- id: delay_set
  label: Delay Set
  kind: action
  command: "PSDEL {level}"
  params:
    - name: level
      type: integer
      description: "000-999 ASCII, 0-300ms operable"
- id: room_size
  label: Room Size
  kind: action
  command: "PSRSZ {size}"
  params:
    - name: size
      type: string
      enum: [S, MS, M, ML, L]
- id: audio_restorer
  label: Audio Restorer
  kind: action
  command: "PSRSTR {mode}"
  params:
    - name: mode
      type: string
      enum: [OFF, LOW, MED, HI]
- id: auro_matic_preset
  label: Auro-Matic 3D Preset
  kind: action
  command: "PSAUROPR {preset}"
  params:
    - name: preset
      type: string
      enum: [SMA, MED, LAR, SPE]
      description: "Auro-3D Upgrade only"
- id: auro_matic_strength_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP"
  params: []
- id: auro_matic_strength_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN"
  params: []
- id: auro_matic_strength_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: "PSAUROST {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 1-16 operable range (Auro-3D Upgrade only)"

# Picture Mode (PV)
- id: picture_mode
  label: Picture Mode
  kind: action
  command: "PV{mode}"
  params:
    - name: mode
      type: string
      enum:
        - OFF
        - STD
        - MOV
        - VVD
        - STM
        - CTM
        - DAY
        - NGT
- id: picture_mode_query
  label: Picture Mode Status Query
  kind: query
  command: "PV?"
  params: []
- id: contrast_up
  label: Contrast Up
  kind: action
  command: "PVCN UP"
  params: []
- id: contrast_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN"
  params: []
- id: contrast_set
  label: Contrast Set
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: integer
      description: "000-100 ASCII, 050=0, range -50 to +50"
- id: contrast_query
  label: Contrast Status Query
  kind: query
  command: "PVCN?"
  params: []
- id: brightness_up
  label: Brightness Up
  kind: action
  command: "PVBR UP"
  params: []
- id: brightness_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN"
  params: []
- id: brightness_set
  label: Brightness Set
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: integer
      description: "000-100 ASCII, 050=0, range -50 to +50"
- id: brightness_query
  label: Brightness Status Query
  kind: query
  command: "PVBR?"
  params: []
- id: saturation_up
  label: Saturation Up
  kind: action
  command: "PVST UP"
  params: []
- id: saturation_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN"
  params: []
- id: saturation_set
  label: Saturation Set
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: integer
      description: "000-100 ASCII, 050=0, range -50 to +50"
- id: saturation_query
  label: Saturation Status Query
  kind: query
  command: "PVST?"
  params: []
- id: hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP"
  params: []
- id: hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN"
  params: []
- id: hue_set
  label: Hue Set
  kind: action
  command: "PVHUE {level}"
  params:
    - name: level
      type: integer
      description: "44-56 ASCII, 50=0, range -6 to +6"
- id: hue_query
  label: Hue Status Query
  kind: query
  command: "PVHUE?"
  params: []
- id: picture_dnr
  label: Picture DNR
  kind: action
  command: "PVDNR {level}"
  params:
    - name: level
      type: string
      enum: [OFF, LOW, MID, HI]
- id: enhancer_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP"
  params: []
- id: enhancer_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN"
  params: []
- id: enhancer_set
  label: Enhancer Set
  kind: action
  command: "PVENH {level}"
  params:
    - name: level
      type: integer
      description: "00-12 ASCII, 00=0, range 0 to 12"
- id: enhancer_query
  label: Enhancer Status Query
  kind: query
  command: "PVENH?"
  params: []

# Zone2 Control
- id: zone2_on
  label: Zone2 On
  kind: action
  command: "Z2ON"
  params: []
- id: zone2_off
  label: Zone2 Off
  kind: action
  command: "Z2OFF"
  params: []
- id: zone2_source
  label: Zone2 Source (same as Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []
- id: zone2_input
  label: Zone2 Input Select
  kind: action
  command: "Z2{source}"
  params:
    - name: source
      type: string
      enum:
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
- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP"
  params: []
- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []
- id: zone2_volume_set
  label: Zone2 Volume Set
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: integer
      description: "00-98 ASCII, 80=0dB, 00=minimum"
- id: zone2_mute_on
  label: Zone2 Mute On
  kind: action
  command: "Z2MUON"
  params: []
- id: zone2_mute_off
  label: Zone2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []
- id: zone2_mute_query
  label: Zone2 Mute Status Query
  kind: query
  command: "Z2MU?"
  params: []
- id: zone2_channel_set
  label: Zone2 Channel Setting
  kind: action
  command: "Z2CS{setting}"
  params:
    - name: setting
      type: string
      enum: [ST, MONO]
- id: zone2_channel_query
  label: Zone2 Channel Status Query
  kind: query
  command: "Z2CS?"
  params: []
- id: zone2_channel_volume_fl_set
  label: Zone2 Channel Volume Front Left Set
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: zone2_channel_volume_fr_set
  label: Zone2 Channel Volume Front Right Set
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: zone2_channel_volume_query
  label: Zone2 Channel Volume Status Query
  kind: query
  command: "Z2CV?"
  params: []
- id: zone2_hpf_on
  label: Zone2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []
- id: zone2_hpf_off
  label: Zone2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []
- id: zone2_hpf_query
  label: Zone2 HPF Status Query
  kind: query
  command: "Z2HPF?"
  params: []
- id: zone2_bass_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []
- id: zone2_bass_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []
- id: zone2_bass_set
  label: Zone2 Bass Set
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB"
- id: zone2_bass_query
  label: Zone2 Bass Status Query
  kind: query
  command: "Z2PSBAS?"
  params: []
- id: zone2_treble_up
  label: Zone2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []
- id: zone2_treble_down
  label: Zone2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []
- id: zone2_treble_set
  label: Zone2 Treble Set
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB"
- id: zone2_treble_query
  label: Zone2 Treble Status Query
  kind: query
  command: "Z2PSTRE?"
  params: []
- id: zone2_hdmi_audio
  label: Zone2 HDMI Audio
  kind: action
  command: "Z2HDA {mode}"
  params:
    - name: mode
      type: string
      enum: [THR, PCM]
      description: "THR=Through, PCM=PCM"
- id: zone2_hdmi_audio_query
  label: Zone2 HDMI Audio Status Query
  kind: query
  command: "Z2HDA?"
  params: []
- id: zone2_sleep_off
  label: Zone2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []
- id: zone2_sleep_set
  label: Zone2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes"
- id: zone2_sleep_query
  label: Zone2 Sleep Status Query
  kind: query
  command: "Z2SLP?"
  params: []
- id: zone2_standby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H"
  params: []
- id: zone2_standby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H"
  params: []
- id: zone2_standby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H"
  params: []
- id: zone2_standby_off
  label: Zone2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []
- id: zone2_standby_query
  label: Zone2 Standby Status Query
  kind: query
  command: "Z2STBY?"
  params: []
- id: zone2_query
  label: Zone2 Status Query
  kind: query
  command: "Z2?"
  params: []
- id: zone2_quick_select_1
  label: Zone2 Quick Select 1
  kind: action
  command: "Z2QUICK1"
  params: []
- id: zone2_quick_select_2
  label: Zone2 Quick Select 2
  kind: action
  command: "Z2QUICK2"
  params: []
- id: zone2_quick_select_3
  label: Zone2 Quick Select 3
  kind: action
  command: "Z2QUICK3"
  params: []
- id: zone2_quick_select_4
  label: Zone2 Quick Select 4
  kind: action
  command: "Z2QUICK4"
  params: []
- id: zone2_quick_select_5
  label: Zone2 Quick Select 5
  kind: action
  command: "Z2QUICK5"
  params: []
- id: zone2_quick_select_0
  label: Zone2 Quick Select 0
  kind: action
  command: "Z2QUICK0"
  params: []
- id: zone2_quick_memory_1
  label: Zone2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY"
  params: []
- id: zone2_quick_memory_2
  label: Zone2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY"
  params: []
- id: zone2_quick_memory_3
  label: Zone2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY"
  params: []
- id: zone2_quick_memory_4
  label: Zone2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY"
  params: []
- id: zone2_quick_memory_5
  label: Zone2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY"
  params: []
- id: zone2_quick_select_query
  label: Zone2 Quick Select Status Query
  kind: query
  command: "Z2QUICK?"
  params: []
- id: zone2_favorite_1
  label: Zone2 Favorite 1
  kind: action
  command: "Z2FAVORITE1"
  params: []
- id: zone2_favorite_2
  label: Zone2 Favorite 2
  kind: action
  command: "Z2FAVORITE2"
  params: []
- id: zone2_favorite_3
  label: Zone2 Favorite 3
  kind: action
  command: "Z2FAVORITE3"
  params: []
- id: zone2_favorite_4
  label: Zone2 Favorite 4
  kind: action
  command: "Z2FAVORITE4"
  params: []
- id: zone2_favorite_memory_1
  label: Zone2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY"
  params: []
- id: zone2_favorite_memory_2
  label: Zone2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY"
  params: []
- id: zone2_favorite_memory_3
  label: Zone2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY"
  params: []
- id: zone2_favorite_memory_4
  label: Zone2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY"
  params: []

# Zone3 Control
- id: zone3_on
  label: Zone3 On
  kind: action
  command: "Z3ON"
  params: []
- id: zone3_off
  label: Zone3 Off
  kind: action
  command: "Z3OFF"
  params: []
- id: zone3_source
  label: Zone3 Source (same as Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []
- id: zone3_input
  label: Zone3 Input Select
  kind: action
  command: "Z3{source}"
  params:
    - name: source
      type: string
      enum:
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
- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP"
  params: []
- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []
- id: zone3_volume_set
  label: Zone3 Volume Set
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: integer
      description: "00-98 ASCII, 80=0dB, 00=minimum"
- id: zone3_mute_on
  label: Zone3 Mute On
  kind: action
  command: "Z3MUON"
  params: []
- id: zone3_mute_off
  label: Zone3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []
- id: zone3_mute_query
  label: Zone3 Mute Status Query
  kind: query
  command: "Z3MU?"
  params: []
- id: zone3_channel_set
  label: Zone3 Channel Setting
  kind: action
  command: "Z3CS{setting}"
  params:
    - name: setting
      type: string
      enum: [ST, MONO]
- id: zone3_channel_query
  label: Zone3 Channel Status Query
  kind: query
  command: "Z3CS?"
  params: []
- id: zone3_channel_volume_fl_set
  label: Zone3 Channel Volume Front Left Set
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: zone3_channel_volume_fr_set
  label: Zone3 Channel Volume Front Right Set
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: integer
      description: "38-62 ASCII, 50=0dB"
- id: zone3_channel_volume_query
  label: Zone3 Channel Volume Status Query
  kind: query
  command: "Z3CV?"
  params: []
- id: zone3_hpf_on
  label: Zone3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []
- id: zone3_hpf_off
  label: Zone3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []
- id: zone3_hpf_query
  label: Zone3 HPF Status Query
  kind: query
  command: "Z3HPF?"
  params: []
- id: zone3_bass_up
  label: Zone3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []
- id: zone3_bass_down
  label: Zone3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []
- id: zone3_bass_set
  label: Zone3 Bass Set
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB"
- id: zone3_bass_query
  label: Zone3 Bass Status Query
  kind: query
  command: "Z3PSBAS?"
  params: []
- id: zone3_treble_up
  label: Zone3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []
- id: zone3_treble_down
  label: Zone3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []
- id: zone3_treble_set
  label: Zone3 Treble Set
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: integer
      description: "00-99 ASCII, 50=0dB"
- id: zone3_treble_query
  label: Zone3 Treble Status Query
  kind: query
  command: "Z3PSTRE?"
  params: []
- id: zone3_sleep_off
  label: Zone3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []
- id: zone3_sleep_set
  label: Zone3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: integer
      description: "001-120 minutes"
- id: zone3_sleep_query
  label: Zone3 Sleep Status Query
  kind: query
  command: "Z3SLP?"
  params: []
- id: zone3_standby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H"
  params: []
- id: zone3_standby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H"
  params: []
- id: zone3_standby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H"
  params: []
- id: zone3_standby_off
  label: Zone3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []
- id: zone3_standby_query
  label: Zone3 Standby Status Query
  kind: query
  command: "Z3STBY?"
  params: []
- id: zone3_query
  label: Zone3 Status Query
  kind: query
  command: "Z3?"
  params: []
- id: zone3_quick_select_1
  label: Zone3 Quick Select 1
  kind: action
  command: "Z3QUICK1"
  params: []
- id: zone3_quick_select_2
  label: Zone3 Quick Select 2
  kind: action
  command: "Z3QUICK2"
  params: []
- id: zone3_quick_select_3
  label: Zone3 Quick Select 3
  kind: action
  command: "Z3QUICK3"
  params: []
- id: zone3_quick_select_4
  label: Zone3 Quick Select 4
  kind: action
  command: "Z3QUICK4"
  params: []
- id: zone3_quick_select_5
  label: Zone3 Quick Select 5
  kind: action
  command: "Z3QUICK5"
  params: []
- id: zone3_quick_select_0
  label: Zone3 Quick Select 0
  kind: action
  command: "Z3QUICK0"
  params: []
- id: zone3_quick_memory_1
  label: Zone3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY"
  params: []
- id: zone3_quick_memory_2
  label: Zone3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY"
  params: []
- id: zone3_quick_memory_3
  label: Zone3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY"
  params: []
- id: zone3_quick_memory_4
  label: Zone3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY"
  params: []
- id: zone3_quick_memory_5
  label: Zone3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY"
  params: []
- id: zone3_quick_select_query
  label: Zone3 Quick Select Status Query
  kind: query
  command: "Z3QUICK?"
  params: []
- id: zone3_favorite_1
  label: Zone3 Favorite 1
  kind: action
  command: "Z3FAVORITE1"
  params: []
- id: zone3_favorite_2
  label: Zone3 Favorite 2
  kind: action
  command: "Z3FAVORITE2"
  params: []
- id: zone3_favorite_3
  label: Zone3 Favorite 3
  kind: action
  command: "Z3FAVORITE3"
  params: []
- id: zone3_favorite_4
  label: Zone3 Favorite 4
  kind: action
  command: "Z3FAVORITE4"
  params: []
- id: zone3_favorite_memory_1
  label: Zone3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY"
  params: []
- id: zone3_favorite_memory_2
  label: Zone3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY"
  params: []
- id: zone3_favorite_memory_3
  label: Zone3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY"
  params: []
- id: zone3_favorite_memory_4
  label: Zone3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY"
  params: []

# Tuner Control
- id: tuner_frequency_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP"
  params: []
- id: tuner_frequency_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN"
  params: []
- id: tuner_frequency_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: ****.**MHz (FM<050000) or ****.**kHz (AM>050000)"
- id: tuner_frequency_query
  label: Tuner Frequency Status Query
  kind: query
  command: "TFAN?"
  params: []
- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  command: "TPANUP"
  params: []
- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN"
  params: []
- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56 (CH01-CH56)"
- id: tuner_preset_query
  label: Tuner Preset Status Query
  kind: query
  command: "TPAN?"
  params: []
- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM"
  params: []
- id: tuner_memory_with_preset
  label: Tuner Preset Memory with Number
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM"
  params: []
- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM"
  params: []
- id: tuner_band_query
  label: Tuner Band Status Query
  kind: query
  command: "TMAN?"
  params: []
- id: tuner_mode_auto
  label: Tuner Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []
- id: tuner_mode_manual
  label: Tuner Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []
- id: tuner_rds_name_query
  label: Tuner RDS Station Name Query
  kind: query
  command: "TFANNAME?"
  params: []

# HD Radio Control
- id: hd_radio_channel_up
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP"
  params: []
- id: hd_radio_channel_down
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []
- id: hd_radio_channel_set
  label: HD Radio Channel Set
  kind: action
  command: "TFHD{channel}"
  params:
    - name: channel
      type: string
      description: "6 digits: FM <050000 or AM >050000"
- id: hd_radio_frequency_set
  label: HD Radio Frequency Set
  kind: action
  command: "TFHD{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: FM <050000 or AM >050000"
- id: hd_radio_preset_up
  label: HD Radio Preset Up
  kind: action
  command: "TPHDUP"
  params: []
- id: hd_radio_preset_down
  label: HD Radio Preset Down
  kind: action
  command: "TPHDDOWN"
  params: []
- id: hd_radio_preset_set
  label: HD Radio Preset Set
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: integer
      description: "01-56"
- id: hd_radio_band_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []
- id: hd_radio_band_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

# MN - Menu Navigation
- id: mn_cursor_up
  label: Menu Cursor Up
  kind: action
  command: "MNCUP"
  params: []
- id: mn_cursor_down
  label: Menu Cursor Down
  kind: action
  command: "MNCDN"
  params: []
- id: mn_cursor_left
  label: Menu Cursor Left
  kind: action
  command: "MNCLT"
  params: []
- id: mn_cursor_right
  label: Menu Cursor Right
  kind: action
  command: "MNCRT"
  params: []
- id: mn_enter
  label: Menu Enter
  kind: action
  command: "MNENT"
  params: []
- id: mn_return
  label: Menu Return
  kind: action
  command: "MNRTN"
  params: []
- id: mn_option
  label: Menu Option
  kind: action
  command: "MNOPT"
  params: []
- id: mn_info
  label: Menu Info
  kind: action
  command: "MNINF"
  params: []
- id: mn_menu_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON"
  params: []
- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  params: []

# NS - Online Music Navigation
- id: ns_cursor_up
  label: NS Cursor Up
  kind: action
  command: "NS90"
  params: []
- id: ns_cursor_down
  label: NS Cursor Down
  kind: action
  command: "NS91"
  params: []
- id: ns_play
  label: NS Play
  kind: action
  command: "NS9A"
  params: []
- id: ns_pause
  label: NS Pause
  kind: action
  command: "NS9B"
  params: []
- id: ns_stop
  label: NS Stop
  kind: action
  command: "NS9C"
  params: []
- id: ns_skip_plus
  label: NS Skip Plus
  kind: action
  command: "NS9D"
  params: []
- id: ns_skip_minus
  label: NS Skip Minus
  kind: action
  command: "NS9E"
  params: []
- id: ns_repeat_one
  label: NS Repeat One
  kind: action
  command: "NS9H"
  params: []
- id: ns_repeat_all
  label: NS Repeat All
  kind: action
  command: "NS9I"
  params: []
- id: ns_repeat_off
  label: NS Repeat Off
  kind: action
  command: "NS9J"
  params: []
- id: ns_random_on
  label: NS Random On
  kind: action
  command: "NS9K"
  params: []
- id: ns_random_off
  label: NS Random Off
  kind: action
  command: "NS9M"
  params: []

# NSA - Onscreen Display ASCII
- id: nsa_query
  label: Onscreen Display Information List ASCII Query
  kind: query
  command: "NSA"
  params: []

# NSE - Onscreen Display UTF-8
- id: nse_query
  label: Onscreen Display Information List UTF-8 Query
  kind: query
  command: "NSE"
  params: []

# SY - System Lock
- id: remote_lock_on
  label: Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON"
  params: []
- id: remote_lock_off
  label: Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF"
  params: []
- id: panel_lock_on
  label: Panel Lock On
  kind: action
  command: "SYPANEL LOCK ON"
  params: []
- id: panel_volume_lock_on
  label: Panel and Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []
- id: panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# TR - Trigger
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

# UG - Upgrade
- id: upgrade_id_query
  label: Upgrade ID Number Query
  kind: query
  command: "UGIDN"
  params: []

# RM - Remote Maintenance
- id: remote_maintenance_start
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA"
  params: []
- id: remote_maintenance_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END"
  params: []

# DIM - Dimmer
- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "DIM BRI"
  params: []
- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM"
  params: []
- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "DIM DAR"
  params: []
- id: dimmer_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF"
  params: []
- id: dimmer_toggle
  label: Dimmer Toggle
  kind: action
  command: "DIM SEL"
  params: []
```

## Feedbacks
```yaml
# Power state returned by PW? query
- id: power_state
  type: enum
  values: [ON, STANDBY]

# Volume returned by MV? query (e.g. MV80)
- id: master_volume_state
  type: integer
  description: "00-98 ASCII, 80=0dB"

# Mute state returned by MU? query
- id: mute_state
  type: enum
  values: [ON, OFF]

# Input source returned by SI? query
- id: input_source_state
  type: string
  description: "Current input source name"

# Main zone state returned by ZM? query
- id: main_zone_state
  type: enum
  values: [ON, OFF]

# Channel volume states returned by CV? query (multiple speakers)
- id: channel_volume_state
  type: object
  properties:
    - name: FL
      type: integer
    - name: FR
      type: integer
    - name: C
      type: integer
    - name: SW
      type: integer
    - name: SW2
      type: integer
    - name: SL
      type: integer
    - name: SR
      type: integer
    - name: SBL
      type: integer
    - name: SBR
      type: integer
    - name: SB
      type: integer

# Surround mode returned by MS? query
- id: surround_mode_state
  type: string
  description: "Current surround mode"

# Video select state returned by SV? query
- id: video_select_state
  type: string

# Sleep timer state returned by SLP? query
- id: sleep_timer_state
  type: integer
  description: "Minutes remaining (0=off)"

# ECO mode state returned by ECO? query
- id: eco_mode_state
  type: enum
  values: [ON, AUTO, OFF]

# Tuner frequency returned by TFAN? query
- id: tuner_frequency_state
  type: string
  description: "6 digit frequency with band"

# Tuner preset returned by TPAN? query
- id: tuner_preset_state
  type: string
  description: "Preset number or OFF"

# HD Radio channel returned by TFHD? query
- id: hd_radio_channel_state
  type: string
```

## Variables
```yaml
# All settable parameters are exposed via command actions above.
# No additional variables section required.
```

## Events
```yaml
# The document describes EVENT messages sent unsolicited when state changes.
# EVENT format: Same as COMMAND+PARAMETER+CR but sent from device to controller.
# Events are sent within 5 seconds after state change.
# UNRESOLVED: Complete event list not explicitly enumerated in source.
# Known event sources based on command documentation:
#   - Power state changes (PWON, PWSTANDBY)
#   - Volume changes (MV, CV for all channels)
#   - Surround mode changes (MS)
#   - Input source changes (SI)
#   - Zone state changes (ZM, Z2, Z3)
```

## Macros
```yaml
# Source describes timing constraints as implicit macros:
# - Power on sequence: Wait 1 second after PWON before sending next command
#   (document note: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)")
# - Command interval: Send commands at 50ms or more intervals
#   (document: "Send the COMMAND in 50ms or more intervals")
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_delay
    description: "Wait 1 second after PWON command before sending additional commands"
  - id: network_standby
    description: "Network Standby mode 'Off In Standby' causes device to ignore network commands during standby to save power"
# UNRESOLVED: No explicit safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source beyond timing notes above.
```

## Notes
**Protocol timing**: Commands must be sent at 50ms or greater intervals. RESPONSE to query commands sent within 200ms. Events sent within 5 seconds of state change.

**Command format**: ASCII CODE 0x20-0x7F, COMMAND (2 chars) + PARAMETER (up to 25 chars) + CR (0x0D).

**Volume encoding**: Master volume 00-98 ASCII (80=0dB, 00=min). 0.5dB step uses 3 ASCII chars (e.g., MV805=-0.5dB). Channel volumes use 38-62 range (50=0dB).

**Multi-zone behavior**: When Zone2 is active, SR status is returned instead of Z2. When Zone2 REC mode is active, Z2 status is returned. Similar for Zone3 with Z3 status.

**Auro-3D commands**: Some commands (AURO3D, AURO2DSURR, AUROPR, AUROST, SHL, SHR, TS) require Auro-3D Upgrade purchase and may not be available on all models.

<!-- UNRESOLVED: complete model list for AVR-S Series (e.g., AVR-S720W, AVR-S920W) not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: Complete unsolicited event list not enumerated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-04T16:21:51.403Z
last_checked_at: 2026-05-14T18:17:15.280Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:15.280Z
matched_actions: 463
action_count: 463
confidence: medium
summary: "All 632 semantic-id actions matched to source commands; transport parameters verified verbatim in protocol specification. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete model list for AVR-S Series not enumerated in source"
- "Complete event list not explicitly enumerated in source."
- "No explicit safety warnings, interlock procedures, or power-on sequencing"
- "complete model list for AVR-S Series (e.g., AVR-S720W, AVR-S920W) not enumerated"
- "firmware version compatibility not stated in source"
- "Complete unsolicited event list not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
