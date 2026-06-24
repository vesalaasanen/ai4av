---
spec_id: admin/denon-avc-a110-eu
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVC-A110 Control Spec"
manufacturer: Denon
model_family: AVC-A110
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVC-A110
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:02:20.508Z
last_checked_at: 2026-06-23T11:10:45.348Z
generated_at: 2026-06-23T11:10:45.348Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-23T11:10:45.348Z
  matched_actions: 753
  action_count: 753
  confidence: medium
  summary: "All 753 spec actions matched verbatim; transport port 23 / 9600 8N1 confirmed; full coverage of Denon Ver.06 catalogue. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Denon AVC-A110 Control Spec

## Summary

The Denon AVC-A110 is a flagship AV receiver controllable via Ethernet (Telnet TCP port 23) and RS-232C serial. This spec covers the full ASCII command set (Ver.06) for power, volume, source selection, surround mode, channel volume, zone control, tuner, media navigation, and system functions. Commands are ASCII strings terminated with CR (0x0D); send commands at 50 ms or greater intervals.

<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable       # power on/off commands present (PW)
- routable        # input/output routing commands present (SI, Z2, Z3, VS)
- queryable       # query commands returning state present (PW?, MV?, SI?, MS?, etc.)
- levelable       # volume and channel level control present (MV, CV, Z2, Z3)
```

## Actions

```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWON\r"
  params: []

- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY\r"
  params: []

- id: power_query
  label: Power Status Query
  kind: query
  command: "PW?\r"
  params: []

- id: master_volume_up
  label: Master Volume Up
  kind: action
  command: "MVUP\r"
  params: []

- id: master_volume_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN\r"
  params: []

- id: master_volume_set
  label: Master Volume Set
  kind: action
  command: "MV{level}\r"
  params:
    - name: level
      type: string
      description: "Volume level 00–98 by ASCII (80=0dB, 00=MIN); use 3 chars for 0.5dB steps e.g. MV795"

- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?\r"
  params: []

- id: channel_volume_fl_up
  label: Channel Volume Front Left Up
  kind: action
  command: "CVFL UP\r"
  params: []

- id: channel_volume_fl_down
  label: Channel Volume Front Left Down
  kind: action
  command: "CVFL DOWN\r"
  params: []

- id: channel_volume_fl_set
  label: Channel Volume Front Left Set
  kind: action
  command: "CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fr_up
  label: Channel Volume Front Right Up
  kind: action
  command: "CVFR UP\r"
  params: []

- id: channel_volume_fr_down
  label: Channel Volume Front Right Down
  kind: action
  command: "CVFR DOWN\r"
  params: []

- id: channel_volume_fr_set
  label: Channel Volume Front Right Set
  kind: action
  command: "CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_c_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP\r"
  params: []

- id: channel_volume_c_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN\r"
  params: []

- id: channel_volume_c_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sw_up
  label: Channel Volume Subwoofer Up
  kind: action
  command: "CVSW UP\r"
  params: []

- id: channel_volume_sw_down
  label: Channel Volume Subwoofer Down
  kind: action
  command: "CVSW DOWN\r"
  params: []

- id: channel_volume_sw_set
  label: Channel Volume Subwoofer Set
  kind: action
  command: "CVSW {level}\r"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB, 00=OFF"

- id: channel_volume_sw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP\r"
  params: []

- id: channel_volume_sw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN\r"
  params: []

- id: channel_volume_sw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  command: "CVSW2 {level}\r"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB, 00=OFF"

- id: channel_volume_sl_up
  label: Channel Volume Surround Left Up
  kind: action
  command: "CVSL UP\r"
  params: []

- id: channel_volume_sl_down
  label: Channel Volume Surround Left Down
  kind: action
  command: "CVSL DOWN\r"
  params: []

- id: channel_volume_sl_set
  label: Channel Volume Surround Left Set
  kind: action
  command: "CVSL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sr_up
  label: Channel Volume Surround Right Up
  kind: action
  command: "CVSR UP\r"
  params: []

- id: channel_volume_sr_down
  label: Channel Volume Surround Right Down
  kind: action
  command: "CVSR DOWN\r"
  params: []

- id: channel_volume_sr_set
  label: Channel Volume Surround Right Set
  kind: action
  command: "CVSR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sbl_up
  label: Channel Volume Surround Back Left Up
  kind: action
  command: "CVSBL UP\r"
  params: []

- id: channel_volume_sbl_down
  label: Channel Volume Surround Back Left Down
  kind: action
  command: "CVSBL DOWN\r"
  params: []

- id: channel_volume_sbl_set
  label: Channel Volume Surround Back Left Set
  kind: action
  command: "CVSBL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sbr_up
  label: Channel Volume Surround Back Right Up
  kind: action
  command: "CVSBR UP\r"
  params: []

- id: channel_volume_sbr_down
  label: Channel Volume Surround Back Right Down
  kind: action
  command: "CVSBR DOWN\r"
  params: []

- id: channel_volume_sbr_set
  label: Channel Volume Surround Back Right Set
  kind: action
  command: "CVSBR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sb_up
  label: Channel Volume Surround Back (1SP) Up
  kind: action
  command: "CVSB UP\r"
  params: []

- id: channel_volume_sb_down
  label: Channel Volume Surround Back (1SP) Down
  kind: action
  command: "CVSB DOWN\r"
  params: []

- id: channel_volume_sb_set
  label: Channel Volume Surround Back (1SP) Set
  kind: action
  command: "CVSB {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fhl_up
  label: Channel Volume Front Height Left Up
  kind: action
  command: "CVFHL UP\r"
  params: []

- id: channel_volume_fhl_down
  label: Channel Volume Front Height Left Down
  kind: action
  command: "CVFHL DOWN\r"
  params: []

- id: channel_volume_fhl_set
  label: Channel Volume Front Height Left Set
  kind: action
  command: "CVFHL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fhr_up
  label: Channel Volume Front Height Right Up
  kind: action
  command: "CVFHR UP\r"
  params: []

- id: channel_volume_fhr_down
  label: Channel Volume Front Height Right Down
  kind: action
  command: "CVFHR DOWN\r"
  params: []

- id: channel_volume_fhr_set
  label: Channel Volume Front Height Right Set
  kind: action
  command: "CVFHR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fwl_up
  label: Channel Volume Front Wide Left Up
  kind: action
  command: "CVFWL UP\r"
  params: []

- id: channel_volume_fwl_down
  label: Channel Volume Front Wide Left Down
  kind: action
  command: "CVFWL DOWN\r"
  params: []

- id: channel_volume_fwl_set
  label: Channel Volume Front Wide Left Set
  kind: action
  command: "CVFWL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fwr_up
  label: Channel Volume Front Wide Right Up
  kind: action
  command: "CVFWR UP\r"
  params: []

- id: channel_volume_fwr_down
  label: Channel Volume Front Wide Right Down
  kind: action
  command: "CVFWR DOWN\r"
  params: []

- id: channel_volume_fwr_set
  label: Channel Volume Front Wide Right Set
  kind: action
  command: "CVFWR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_tfl_up
  label: Channel Volume Top Front Left Up
  kind: action
  command: "CVTFL UP\r"
  params: []

- id: channel_volume_tfl_down
  label: Channel Volume Top Front Left Down
  kind: action
  command: "CVTFL DOWN\r"
  params: []

- id: channel_volume_tfl_set
  label: Channel Volume Top Front Left Set
  kind: action
  command: "CVTFL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_tfr_up
  label: Channel Volume Top Front Right Up
  kind: action
  command: "CVTFR UP\r"
  params: []

- id: channel_volume_tfr_down
  label: Channel Volume Top Front Right Down
  kind: action
  command: "CVTFR DOWN\r"
  params: []

- id: channel_volume_tfr_set
  label: Channel Volume Top Front Right Set
  kind: action
  command: "CVTFR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_tml_up
  label: Channel Volume Top Middle Left Up
  kind: action
  command: "CVTML UP\r"
  params: []

- id: channel_volume_tml_down
  label: Channel Volume Top Middle Left Down
  kind: action
  command: "CVTML DOWN\r"
  params: []

- id: channel_volume_tml_set
  label: Channel Volume Top Middle Left Set
  kind: action
  command: "CVTML {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_tmr_up
  label: Channel Volume Top Middle Right Up
  kind: action
  command: "CVTMR UP\r"
  params: []

- id: channel_volume_tmr_down
  label: Channel Volume Top Middle Right Down
  kind: action
  command: "CVTMR DOWN\r"
  params: []

- id: channel_volume_tmr_set
  label: Channel Volume Top Middle Right Set
  kind: action
  command: "CVTMR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_trl_up
  label: Channel Volume Top Rear Left Up
  kind: action
  command: "CVTRL UP\r"
  params: []

- id: channel_volume_trl_down
  label: Channel Volume Top Rear Left Down
  kind: action
  command: "CVTRL DOWN\r"
  params: []

- id: channel_volume_trl_set
  label: Channel Volume Top Rear Left Set
  kind: action
  command: "CVTRL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_trr_up
  label: Channel Volume Top Rear Right Up
  kind: action
  command: "CVTRR UP\r"
  params: []

- id: channel_volume_trr_down
  label: Channel Volume Top Rear Right Down
  kind: action
  command: "CVTRR DOWN\r"
  params: []

- id: channel_volume_trr_set
  label: Channel Volume Top Rear Right Set
  kind: action
  command: "CVTRR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_rhl_up
  label: Channel Volume Rear Height Left Up
  kind: action
  command: "CVRHL UP\r"
  params: []

- id: channel_volume_rhl_down
  label: Channel Volume Rear Height Left Down
  kind: action
  command: "CVRHL DOWN\r"
  params: []

- id: channel_volume_rhl_set
  label: Channel Volume Rear Height Left Set
  kind: action
  command: "CVRHL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_rhr_up
  label: Channel Volume Rear Height Right Up
  kind: action
  command: "CVRHR UP\r"
  params: []

- id: channel_volume_rhr_down
  label: Channel Volume Rear Height Right Down
  kind: action
  command: "CVRHR DOWN\r"
  params: []

- id: channel_volume_rhr_set
  label: Channel Volume Rear Height Right Set
  kind: action
  command: "CVRHR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fdl_up
  label: Channel Volume Front Dolby Left Up
  kind: action
  command: "CVFDL UP\r"
  params: []

- id: channel_volume_fdl_down
  label: Channel Volume Front Dolby Left Down
  kind: action
  command: "CVFDL DOWN\r"
  params: []

- id: channel_volume_fdl_set
  label: Channel Volume Front Dolby Left Set
  kind: action
  command: "CVFDL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_fdr_up
  label: Channel Volume Front Dolby Right Up
  kind: action
  command: "CVFDR UP\r"
  params: []

- id: channel_volume_fdr_down
  label: Channel Volume Front Dolby Right Down
  kind: action
  command: "CVFDR DOWN\r"
  params: []

- id: channel_volume_fdr_set
  label: Channel Volume Front Dolby Right Set
  kind: action
  command: "CVFDR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sdl_up
  label: Channel Volume Surround Dolby Left Up
  kind: action
  command: "CVSDL UP\r"
  params: []

- id: channel_volume_sdl_down
  label: Channel Volume Surround Dolby Left Down
  kind: action
  command: "CVSDL DOWN\r"
  params: []

- id: channel_volume_sdl_set
  label: Channel Volume Surround Dolby Left Set
  kind: action
  command: "CVSDL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_sdr_up
  label: Channel Volume Surround Dolby Right Up
  kind: action
  command: "CVSDR UP\r"
  params: []

- id: channel_volume_sdr_down
  label: Channel Volume Surround Dolby Right Down
  kind: action
  command: "CVSDR DOWN\r"
  params: []

- id: channel_volume_sdr_set
  label: Channel Volume Surround Dolby Right Set
  kind: action
  command: "CVSDR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_bdl_up
  label: Channel Volume Back Dolby Left Up
  kind: action
  command: "CVBDL UP\r"
  params: []

- id: channel_volume_bdl_down
  label: Channel Volume Back Dolby Left Down
  kind: action
  command: "CVBDL DOWN\r"
  params: []

- id: channel_volume_bdl_set
  label: Channel Volume Back Dolby Left Set
  kind: action
  command: "CVBDL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_bdr_up
  label: Channel Volume Back Dolby Right Up
  kind: action
  command: "CVBDR UP\r"
  params: []

- id: channel_volume_bdr_down
  label: Channel Volume Back Dolby Right Down
  kind: action
  command: "CVBDR DOWN\r"
  params: []

- id: channel_volume_bdr_set
  label: Channel Volume Back Dolby Right Set
  kind: action
  command: "CVBDR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_shl_up
  label: Channel Volume Surround Height Left Up (Auro-3D)
  kind: action
  command: "CVSHL UP\r"
  params: []

- id: channel_volume_shl_down
  label: Channel Volume Surround Height Left Down (Auro-3D)
  kind: action
  command: "CVSHL DOWN\r"
  params: []

- id: channel_volume_shl_set
  label: Channel Volume Surround Height Left Set (Auro-3D)
  kind: action
  command: "CVSHL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_shr_up
  label: Channel Volume Surround Height Right Up (Auro-3D)
  kind: action
  command: "CVSHR UP\r"
  params: []

- id: channel_volume_shr_down
  label: Channel Volume Surround Height Right Down (Auro-3D)
  kind: action
  command: "CVSHR DOWN\r"
  params: []

- id: channel_volume_shr_set
  label: Channel Volume Surround Height Right Set (Auro-3D)
  kind: action
  command: "CVSHR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_ts_up
  label: Channel Volume Top Surround Up (Auro-3D)
  kind: action
  command: "CVTS UP\r"
  params: []

- id: channel_volume_ts_down
  label: Channel Volume Top Surround Down (Auro-3D)
  kind: action
  command: "CVTS DOWN\r"
  params: []

- id: channel_volume_ts_set
  label: Channel Volume Top Surround Set (Auro-3D)
  kind: action
  command: "CVTS {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: channel_volume_reset
  label: Channel Volume Reset All to Factory Default
  kind: action
  command: "CVZRL\r"
  params: []

- id: channel_volume_query
  label: Channel Volume Query
  kind: query
  command: "CV?\r"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUON\r"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUOFF\r"
  params: []

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "MU?\r"
  params: []

- id: select_input_phono
  label: Select Input PHONO
  kind: action
  command: "SIPHONO\r"
  params: []

- id: select_input_cd
  label: Select Input CD
  kind: action
  command: "SICD\r"
  params: []

- id: select_input_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER\r"
  params: []

- id: select_input_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD\r"
  params: []

- id: select_input_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD\r"
  params: []

- id: select_input_tv
  label: Select Input TV Audio
  kind: action
  command: "SITV\r"
  params: []

- id: select_input_sat_cbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL\r"
  params: []

- id: select_input_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY\r"
  params: []

- id: select_input_game
  label: Select Input GAME
  kind: action
  command: "SIGAME\r"
  params: []

- id: select_input_net
  label: Select Input NET
  kind: action
  command: "SINET\r"
  params: []

- id: select_input_flickr
  label: Select Input FLICKR
  kind: action
  command: "SIFLICKR\r"
  params: []

- id: select_input_iradio
  label: Select Input iRadio
  kind: action
  command: "SIIRADIO\r"
  params: []

- id: select_input_server
  label: Select Input SERVER
  kind: action
  command: "SISERVER\r"
  params: []

- id: select_input_favorites
  label: Select Input FAVORITES
  kind: action
  command: "SIFAVORITES\r"
  params: []

- id: select_input_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1\r"
  params: []

- id: select_input_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2\r"
  params: []

- id: select_input_aux3
  label: Select Input AUX3
  kind: action
  command: "SIAUX3\r"
  params: []

- id: select_input_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4\r"
  params: []

- id: select_input_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5\r"
  params: []

- id: select_input_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6\r"
  params: []

- id: select_input_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7\r"
  params: []

- id: select_input_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT\r"
  params: []

- id: select_input_usb_ipod
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD\r"
  params: []

- id: select_input_usb
  label: Select Input USB (Start Playback)
  kind: action
  command: "SIUSB\r"
  params: []

- id: select_input_ipd
  label: Select Input iPod Direct
  kind: action
  command: "SIIPD\r"
  params: []

- id: select_input_irp
  label: Select Input iRadio Recent Play
  kind: action
  command: "SIIRP\r"
  params: []

- id: select_input_fvp
  label: Select Input Favorites Play
  kind: action
  command: "SIFVP\r"
  params: []

- id: select_input_query
  label: Input Source Query
  kind: query
  command: "SI?\r"
  params: []

- id: main_zone_on
  label: Main Zone On
  kind: action
  command: "ZMON\r"
  params: []

- id: main_zone_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF\r"
  params: []

- id: main_zone_query
  label: Main Zone Status Query
  kind: query
  command: "ZM?\r"
  params: []

- id: main_zone_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1\r"
  params: []

- id: main_zone_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2\r"
  params: []

- id: main_zone_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3\r"
  params: []

- id: main_zone_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4\r"
  params: []

- id: main_zone_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY\r"
  params: []

- id: main_zone_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY\r"
  params: []

- id: main_zone_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY\r"
  params: []

- id: main_zone_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY\r"
  params: []

- id: signal_detect_auto
  label: Signal Detect Auto
  kind: action
  command: "SDAUTO\r"
  params: []

- id: signal_detect_hdmi
  label: Signal Detect Force HDMI
  kind: action
  command: "SDHDMI\r"
  params: []

- id: signal_detect_digital
  label: Signal Detect Force Digital
  kind: action
  command: "SDDIGITAL\r"
  params: []

- id: signal_detect_analog
  label: Signal Detect Force Analog
  kind: action
  command: "SDANALOG\r"
  params: []

- id: signal_detect_ext_in
  label: Signal Detect External In
  kind: action
  command: "SDEXT.IN\r"
  params: []

- id: signal_detect_7_1_in
  label: Signal Detect 7.1CH In
  kind: action
  command: "SD7.1IN\r"
  params: []

- id: signal_detect_no
  label: Signal Detect No Input
  kind: action
  command: "SDNO\r"
  params: []

- id: signal_detect_query
  label: Signal Detect Status Query
  kind: query
  command: "SD?\r"
  params: []

- id: digital_input_auto
  label: Digital Input Auto Mode
  kind: action
  command: "DCAUTO\r"
  params: []

- id: digital_input_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM\r"
  params: []

- id: digital_input_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS\r"
  params: []

- id: digital_input_query
  label: Digital Input Status Query
  kind: query
  command: "DC?\r"
  params: []

- id: video_select_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD\r"
  params: []

- id: video_select_bd
  label: Video Select Blu-ray
  kind: action
  command: "SVBD\r"
  params: []

- id: video_select_tv
  label: Video Select TV
  kind: action
  command: "SVTV\r"
  params: []

- id: video_select_sat_cbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL\r"
  params: []

- id: video_select_mplay
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY\r"
  params: []

- id: video_select_game
  label: Video Select GAME
  kind: action
  command: "SVGAME\r"
  params: []

- id: video_select_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1\r"
  params: []

- id: video_select_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2\r"
  params: []

- id: video_select_aux3
  label: Video Select AUX3
  kind: action
  command: "SVAUX3\r"
  params: []

- id: video_select_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4\r"
  params: []

- id: video_select_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5\r"
  params: []

- id: video_select_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6\r"
  params: []

- id: video_select_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7\r"
  params: []

- id: video_select_cd
  label: Video Select CD
  kind: action
  command: "SVCD\r"
  params: []

- id: video_select_source
  label: Video Select Cancel (Source)
  kind: action
  command: "SVSOURCE\r"
  params: []

- id: video_select_on
  label: Video Select On
  kind: action
  command: "SVON\r"
  params: []

- id: video_select_off
  label: Video Select Off
  kind: action
  command: "SVOFF\r"
  params: []

- id: video_select_query
  label: Video Select Status Query
  kind: query
  command: "SV?\r"
  params: []

- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF\r"
  params: []

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001–120 by ASCII, 010=10min"

- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?\r"
  params: []

- id: auto_standby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M\r"
  params: []

- id: auto_standby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M\r"
  params: []

- id: auto_standby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M\r"
  params: []

- id: auto_standby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF\r"
  params: []

- id: auto_standby_query
  label: Auto Standby Query
  kind: query
  command: "STBY?\r"
  params: []

- id: eco_mode_on
  label: ECO Mode On
  kind: action
  command: "ECOON\r"
  params: []

- id: eco_mode_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO\r"
  params: []

- id: eco_mode_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF\r"
  params: []

- id: eco_mode_query
  label: ECO Mode Query
  kind: query
  command: "ECO?\r"
  params: []

- id: surround_mode_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE\r"
  params: []

- id: surround_mode_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC\r"
  params: []

- id: surround_mode_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME\r"
  params: []

- id: surround_mode_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT\r"
  params: []

- id: surround_mode_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT\r"
  params: []

- id: surround_mode_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO\r"
  params: []

- id: surround_mode_auto
  label: Surround Mode Auto
  kind: action
  command: "MSAUTO\r"
  params: []

- id: surround_mode_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL\r"
  params: []

- id: surround_mode_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND\r"
  params: []

- id: surround_mode_auro3d
  label: Surround Mode Auro-3D
  kind: action
  command: "MSAURO3D\r"
  params: []

- id: surround_mode_auro2dsurr
  label: Surround Mode Auro 2D Surround
  kind: action
  command: "MSAURO2DSURR\r"
  params: []

- id: surround_mode_mch_stereo
  label: Surround Mode Multi-Channel Stereo
  kind: action
  command: "MSMCH STEREO\r"
  params: []

- id: surround_mode_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  command: "MSWIDE SCREEN\r"
  params: []

- id: surround_mode_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  command: "MSSUPER STADIUM\r"
  params: []

- id: surround_mode_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA\r"
  params: []

- id: surround_mode_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB\r"
  params: []

- id: surround_mode_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  command: "MSCLASSIC CONCERT\r"
  params: []

- id: surround_mode_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE\r"
  params: []

- id: surround_mode_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX\r"
  params: []

- id: surround_mode_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME\r"
  params: []

- id: surround_mode_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL\r"
  params: []

- id: surround_mode_left
  label: Surround Mode Left
  kind: action
  command: "MSLEFT\r"
  params: []

- id: surround_mode_right
  label: Surround Mode Right
  kind: action
  command: "MSRIGHT\r"
  params: []

- id: surround_mode_query
  label: Surround Mode Query
  kind: query
  command: "MS?\r"
  params: []

- id: quick_select_1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1\r"
  params: []

- id: quick_select_2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2\r"
  params: []

- id: quick_select_3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3\r"
  params: []

- id: quick_select_4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4\r"
  params: []

- id: quick_select_5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5\r"
  params: []

- id: quick_select_1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY\r"
  params: []

- id: quick_select_2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY\r"
  params: []

- id: quick_select_3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY\r"
  params: []

- id: quick_select_4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY\r"
  params: []

- id: quick_select_5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY\r"
  params: []

- id: quick_select_query
  label: Quick Select Query
  kind: query
  command: "MSQUICK ?\r"
  params: []


# VS — Video/HDMI settings

- id: vs_aspect_normal
  label: Video Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM\r"
  params: []

- id: vs_aspect_full
  label: Video Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL\r"
  params: []

- id: vs_aspect_query
  label: Video Aspect Query
  kind: query
  command: "VSASP ?\r"
  params: []

- id: vs_monitor_auto
  label: HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO\r"
  params: []

- id: vs_monitor_1
  label: HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1\r"
  params: []

- id: vs_monitor_2
  label: HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2\r"
  params: []

- id: vs_monitor_query
  label: HDMI Monitor Query
  kind: query
  command: "VSMONI ?\r"
  params: []

- id: vs_resolution_480p
  label: Video Resolution 480p/576p
  kind: action
  command: "VSSC48P\r"
  params: []

- id: vs_resolution_1080i
  label: Video Resolution 1080i
  kind: action
  command: "VSSC10I\r"
  params: []

- id: vs_resolution_720p
  label: Video Resolution 720p
  kind: action
  command: "VSSC72P\r"
  params: []

- id: vs_resolution_1080p
  label: Video Resolution 1080p
  kind: action
  command: "VSSC10P\r"
  params: []

- id: vs_resolution_1080p24
  label: Video Resolution 1080p 24Hz
  kind: action
  command: "VSSC10P24\r"
  params: []

- id: vs_resolution_4k
  label: Video Resolution 4K
  kind: action
  command: "VSSC4K\r"
  params: []

- id: vs_resolution_4kf
  label: Video Resolution 4K 60/50Hz
  kind: action
  command: "VSSC4KF\r"
  params: []

- id: vs_resolution_auto
  label: Video Resolution Auto
  kind: action
  command: "VSSCAUTO\r"
  params: []

- id: vs_resolution_query
  label: Video Resolution Query
  kind: query
  command: "VSSC ?\r"
  params: []

- id: vs_hdmi_resolution_480p
  label: HDMI Resolution 480p/576p
  kind: action
  command: "VSSCH48P\r"
  params: []

- id: vs_hdmi_resolution_1080i
  label: HDMI Resolution 1080i
  kind: action
  command: "VSSCH10I\r"
  params: []

- id: vs_hdmi_resolution_720p
  label: HDMI Resolution 720p
  kind: action
  command: "VSSCH72P\r"
  params: []

- id: vs_hdmi_resolution_1080p
  label: HDMI Resolution 1080p
  kind: action
  command: "VSSCH10P\r"
  params: []

- id: vs_hdmi_resolution_1080p24
  label: HDMI Resolution 1080p 24Hz
  kind: action
  command: "VSSCH10P24\r"
  params: []

- id: vs_hdmi_resolution_4k
  label: HDMI Resolution 4K
  kind: action
  command: "VSSCH4K\r"
  params: []

- id: vs_hdmi_resolution_4kf
  label: HDMI Resolution 4K 60/50Hz
  kind: action
  command: "VSSCH4KF\r"
  params: []

- id: vs_hdmi_resolution_auto
  label: HDMI Resolution Auto
  kind: action
  command: "VSSCHAUTO\r"
  params: []

- id: vs_hdmi_resolution_query
  label: HDMI Resolution Query
  kind: query
  command: "VSSCH ?\r"
  params: []

- id: vs_audio_amp
  label: HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP\r"
  params: []

- id: vs_audio_tv
  label: HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV\r"
  params: []

- id: vs_audio_query
  label: HDMI Audio Output Query
  kind: query
  command: "VSAUDIO ?\r"
  params: []

- id: vs_vpm_auto
  label: Video Processing Mode Auto
  kind: action
  command: "VSVPMAUTO\r"
  params: []

- id: vs_vpm_game
  label: Video Processing Mode Game
  kind: action
  command: "VSVPMGAME\r"
  params: []

- id: vs_vpm_movie
  label: Video Processing Mode Movie
  kind: action
  command: "VSVPMMOVI\r"
  params: []

- id: vs_vpm_query
  label: Video Processing Mode Query
  kind: query
  command: "VSVPM ?\r"
  params: []

- id: vs_vst_on
  label: Vertical Stretch On
  kind: action
  command: "VSVST ON\r"
  params: []

- id: vs_vst_off
  label: Vertical Stretch Off
  kind: action
  command: "VSVST OFF\r"
  params: []

- id: vs_vst_query
  label: Vertical Stretch Query
  kind: query
  command: "VSVST ?\r"
  params: []

# PS — Parameter Settings

- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON\r"
  params: []

- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF\r"
  params: []

- id: ps_tone_ctrl_query
  label: Tone Control Query
  kind: query
  command: "PSTONE CTRL ?\r"
  params: []

- id: ps_bass_up
  label: Bass Up
  kind: action
  command: "PSBAS UP\r"
  params: []

- id: ps_bass_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN\r"
  params: []

- id: ps_bass_set
  label: Bass Set
  kind: action
  command: "PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "44–56 by ASCII, 50=0dB (±6dB range)"

- id: ps_bass_query
  label: Bass Query
  kind: query
  command: "PSBAS ?\r"
  params: []

- id: ps_treble_up
  label: Treble Up
  kind: action
  command: "PSTRE UP\r"
  params: []

- id: ps_treble_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN\r"
  params: []

- id: ps_treble_set
  label: Treble Set
  kind: action
  command: "PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "44–56 by ASCII, 50=0dB (±6dB range)"

- id: ps_treble_query
  label: Treble Query
  kind: query
  command: "PSTRE ?\r"
  params: []

- id: ps_dil_on
  label: Dialog Level Adjust On
  kind: action
  command: "PSDIL ON\r"
  params: []

- id: ps_dil_off
  label: Dialog Level Adjust Off
  kind: action
  command: "PSDIL OFF\r"
  params: []

- id: ps_dil_up
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP\r"
  params: []

- id: ps_dil_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN\r"
  params: []

- id: ps_dil_set
  label: Dialog Level Set
  kind: action
  command: "PSDIL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: ps_dil_query
  label: Dialog Level Query
  kind: query
  command: "PSDIL ?\r"
  params: []

- id: ps_swl_on
  label: Subwoofer Level Adjust On
  kind: action
  command: "PSSWL ON\r"
  params: []

- id: ps_swl_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: "PSSWL OFF\r"
  params: []

- id: ps_swl_up
  label: Subwoofer 1 Level Up
  kind: action
  command: "PSSWL UP\r"
  params: []

- id: ps_swl_down
  label: Subwoofer 1 Level Down
  kind: action
  command: "PSSWL DOWN\r"
  params: []

- id: ps_swl_set
  label: Subwoofer 1 Level Set
  kind: action
  command: "PSSWL {level}\r"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB, 00=OFF"

- id: ps_swl2_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP\r"
  params: []

- id: ps_swl2_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN\r"
  params: []

- id: ps_swl2_set
  label: Subwoofer 2 Level Set
  kind: action
  command: "PSSWL2 {level}\r"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB, 00=OFF"

- id: ps_swl_query
  label: Subwoofer Level Query
  kind: query
  command: "PSSWL ?\r"
  params: []

- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON\r"
  params: []

- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF\r"
  params: []

- id: ps_cinema_eq_query
  label: Cinema EQ Query
  kind: query
  command: "PSCINEMA EQ. ?\r"
  params: []

- id: ps_mode_music
  label: PL2/PL2x Mode Music
  kind: action
  command: "PSMODE:MUSIC\r"
  params: []

- id: ps_mode_cinema
  label: PL2/PL2x Mode Cinema
  kind: action
  command: "PSMODE:CINEMA\r"
  params: []

- id: ps_mode_game
  label: PL2/PL2x Mode Game
  kind: action
  command: "PSMODE:GAME\r"
  params: []

- id: ps_mode_pro_logic
  label: PL2/PL2x Mode Pro Logic
  kind: action
  command: "PSMODE:PRO LOGIC\r"
  params: []

- id: ps_mode_query
  label: PL2/PL2x Mode Query
  kind: query
  command: "PSMODE: ?\r"
  params: []

- id: ps_lom_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON\r"
  params: []

- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF\r"
  params: []

- id: ps_lom_query
  label: Loudness Management Query
  kind: query
  command: "PSLOM ?\r"
  params: []

- id: ps_fh_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON\r"
  params: []

- id: ps_fh_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF\r"
  params: []

- id: ps_fh_query
  label: Front Height Output Query
  kind: query
  command: "PSFH: ?\r"
  params: []

- id: ps_sp_fw
  label: Speaker Output Front Wide
  kind: action
  command: "PSSP:FW\r"
  params: []

- id: ps_sp_fh
  label: Speaker Output Front Height
  kind: action
  command: "PSSP:FH\r"
  params: []

- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  command: "PSSP:SB\r"
  params: []

- id: ps_sp_hw
  label: Speaker Output Height+Wide
  kind: action
  command: "PSSP:HW\r"
  params: []

- id: ps_sp_bh
  label: Speaker Output Back+Height
  kind: action
  command: "PSSP:BH\r"
  params: []

- id: ps_sp_bw
  label: Speaker Output Back+Wide
  kind: action
  command: "PSSP:BW\r"
  params: []

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL\r"
  params: []

- id: ps_sp_hf
  label: Speaker Output Height+Floor
  kind: action
  command: "PSSP:HF\r"
  params: []

- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  command: "PSSP:FR\r"
  params: []

- id: ps_sp_query
  label: Speaker Output Query
  kind: query
  command: "PSSP: ?\r"
  params: []

- id: ps_phg_low
  label: PL2z Height Gain Low
  kind: action
  command: "PSPHG LOW\r"
  params: []

- id: ps_phg_mid
  label: PL2z Height Gain Mid
  kind: action
  command: "PSPHG MID\r"
  params: []

- id: ps_phg_hi
  label: PL2z Height Gain High
  kind: action
  command: "PSPHG HI\r"
  params: []

- id: ps_phg_query
  label: PL2z Height Gain Query
  kind: query
  command: "PSPHG ?\r"
  params: []

- id: ps_multeq_audyssey
  label: MultEQ Mode Audyssey Reference
  kind: action
  command: "PSMULTEQ:AUDYSSEY\r"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ Mode L/R Bypass
  kind: action
  command: "PSMULTEQ:BYP.LR\r"
  params: []

- id: ps_multeq_flat
  label: MultEQ Mode Flat
  kind: action
  command: "PSMULTEQ:FLAT\r"
  params: []

- id: ps_multeq_manual
  label: MultEQ Mode Manual
  kind: action
  command: "PSMULTEQ:MANUAL\r"
  params: []

- id: ps_multeq_off
  label: MultEQ Off
  kind: action
  command: "PSMULTEQ:OFF\r"
  params: []

- id: ps_multeq_query
  label: MultEQ Query
  kind: query
  command: "PSMULTEQ: ?\r"
  params: []

- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON\r"
  params: []

- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF\r"
  params: []

- id: ps_dyneq_query
  label: Dynamic EQ Query
  kind: query
  command: "PSDYNEQ ?\r"
  params: []

- id: ps_reflev_0
  label: Reference Level Offset 0dB
  kind: action
  command: "PSREFLEV 0\r"
  params: []

- id: ps_reflev_5
  label: Reference Level Offset 5dB
  kind: action
  command: "PSREFLEV 5\r"
  params: []

- id: ps_reflev_10
  label: Reference Level Offset 10dB
  kind: action
  command: "PSREFLEV 10\r"
  params: []

- id: ps_reflev_15
  label: Reference Level Offset 15dB
  kind: action
  command: "PSREFLEV 15\r"
  params: []

- id: ps_reflev_query
  label: Reference Level Offset Query
  kind: query
  command: "PSREFLEV ?\r"
  params: []

- id: ps_dynvol_heavy
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV\r"
  params: []

- id: ps_dynvol_medium
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED\r"
  params: []

- id: ps_dynvol_light
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT\r"
  params: []

- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF\r"
  params: []

- id: ps_dynvol_query
  label: Dynamic Volume Query
  kind: query
  command: "PSDYNVOL ?\r"
  params: []

- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON\r"
  params: []

- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF\r"
  params: []

- id: ps_lfc_query
  label: Audyssey LFC Query
  kind: query
  command: "PSLFC ?\r"
  params: []

- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP\r"
  params: []

- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN\r"
  params: []

- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {level}\r"
  params:
    - name: level
      type: string
      description: "01–07 by ASCII"

- id: ps_cntamt_query
  label: Containment Amount Query
  kind: query
  command: "PSCNTAMT ?\r"
  params: []

- id: ps_dsx_onhw
  label: Audyssey DSX On Height+Wide
  kind: action
  command: "PSDSX ONHW\r"
  params: []

- id: ps_dsx_onh
  label: Audyssey DSX On Height
  kind: action
  command: "PSDSX ONH\r"
  params: []

- id: ps_dsx_onw
  label: Audyssey DSX On Width
  kind: action
  command: "PSDSX ONW\r"
  params: []

- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF\r"
  params: []

- id: ps_dsx_query
  label: Audyssey DSX Query
  kind: query
  command: "PSDSX ?\r"
  params: []

- id: ps_stw_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP\r"
  params: []

- id: ps_stw_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN\r"
  params: []

- id: ps_stw_set
  label: Stage Width Set
  kind: action
  command: "PSSTW {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: ps_stw_query
  label: Stage Width Query
  kind: query
  command: "PSSTW ?\r"
  params: []

- id: ps_sth_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP\r"
  params: []

- id: ps_sth_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN\r"
  params: []

- id: ps_sth_set
  label: Stage Height Set
  kind: action
  command: "PSSTH {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: ps_sth_query
  label: Stage Height Query
  kind: query
  command: "PSSTH ?\r"
  params: []

- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON\r"
  params: []

- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF\r"
  params: []

- id: ps_geq_query
  label: Graphic EQ Query
  kind: query
  command: "PSGEQ ?\r"
  params: []

- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  command: "PSDRC AUTO\r"
  params: []

- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  command: "PSDRC LOW\r"
  params: []

- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  command: "PSDRC MID\r"
  params: []

- id: ps_drc_hi
  label: Dynamic Compression High
  kind: action
  command: "PSDRC HI\r"
  params: []

- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  command: "PSDRC OFF\r"
  params: []

- id: ps_drc_query
  label: Dynamic Compression Query
  kind: query
  command: "PSDRC ?\r"
  params: []

- id: ps_bsc_up
  label: Bass Sync Up
  kind: action
  command: "PSBSC UP\r"
  params: []

- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN\r"
  params: []

- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC {level}\r"
  params:
    - name: level
      type: string
      description: "00–16 by ASCII"

- id: ps_bsc_query
  label: Bass Sync Query
  kind: query
  command: "PSBSC ?\r"
  params: []

- id: ps_deh_off
  label: Dialogue Enhancer Off
  kind: action
  command: "PSDEH OFF\r"
  params: []

- id: ps_deh_low
  label: Dialogue Enhancer Low
  kind: action
  command: "PSDEH LOW\r"
  params: []

- id: ps_deh_med
  label: Dialogue Enhancer Medium
  kind: action
  command: "PSDEH MED\r"
  params: []

- id: ps_deh_high
  label: Dialogue Enhancer High
  kind: action
  command: "PSDEH HIGH\r"
  params: []

- id: ps_deh_query
  label: Dialogue Enhancer Query
  kind: query
  command: "PSDEH ?\r"
  params: []

- id: ps_lfe_up
  label: LFE Level Up
  kind: action
  command: "PSLFE UP\r"
  params: []

- id: ps_lfe_down
  label: LFE Level Down
  kind: action
  command: "PSLFE DOWN\r"
  params: []

- id: ps_lfe_set
  label: LFE Level Set
  kind: action
  command: "PSLFE {level}\r"
  params:
    - name: level
      type: string
      description: "00–10 by ASCII, 00=0dB, 10=-10dB"

- id: ps_lfe_query
  label: LFE Level Query
  kind: query
  command: "PSLFE ?\r"
  params: []

- id: ps_lfl_00
  label: LFE Level EXT.IN 0dB
  kind: action
  command: "PSLFL 00\r"
  params: []

- id: ps_lfl_05
  label: LFE Level EXT.IN -5dB
  kind: action
  command: "PSLFL 05\r"
  params: []

- id: ps_lfl_10
  label: LFE Level EXT.IN -10dB
  kind: action
  command: "PSLFL 10\r"
  params: []

- id: ps_lfl_15
  label: LFE Level EXT.IN -15dB
  kind: action
  command: "PSLFL 15\r"
  params: []

- id: ps_lfl_query
  label: LFE Level EXT.IN Query
  kind: query
  command: "PSLFL ?\r"
  params: []

- id: ps_eff_on
  label: Effect On
  kind: action
  command: "PSEFF ON\r"
  params: []

- id: ps_eff_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF\r"
  params: []

- id: ps_eff_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP\r"
  params: []

- id: ps_eff_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN\r"
  params: []

- id: ps_eff_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {level}\r"
  params:
    - name: level
      type: string
      description: "01–15 by ASCII"

- id: ps_eff_query
  label: Effect Level Query
  kind: query
  command: "PSEFF ?\r"
  params: []

- id: ps_del_up
  label: Delay Up
  kind: action
  command: "PSDEL UP\r"
  params: []

- id: ps_del_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN\r"
  params: []

- id: ps_del_set
  label: Delay Set
  kind: action
  command: "PSDEL {ms}\r"
  params:
    - name: ms
      type: string
      description: "000–300 by ASCII in milliseconds; 0-60ms steps 3ms, over 60ms steps 10ms"

- id: ps_del_query
  label: Delay Query
  kind: query
  command: "PSDEL ?\r"
  params: []

- id: ps_pan_on
  label: Panorama On
  kind: action
  command: "PSPAN ON\r"
  params: []

- id: ps_pan_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF\r"
  params: []

- id: ps_pan_query
  label: Panorama Query
  kind: query
  command: "PSPAN ?\r"
  params: []

- id: ps_dim_up
  label: Dimension Up
  kind: action
  command: "PSDIM UP\r"
  params: []

- id: ps_dim_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN\r"
  params: []

- id: ps_dim_set
  label: Dimension Set
  kind: action
  command: "PSDIM {level}\r"
  params:
    - name: level
      type: string
      description: "00–06 by ASCII"

- id: ps_dim_query
  label: Dimension Query
  kind: query
  command: "PSDIM ?\r"
  params: []

- id: ps_cen_up
  label: Center Width Up
  kind: action
  command: "PSCEN UP\r"
  params: []

- id: ps_cen_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN\r"
  params: []

- id: ps_cen_set
  label: Center Width Set
  kind: action
  command: "PSCEN {level}\r"
  params:
    - name: level
      type: string
      description: "00–07 by ASCII"

- id: ps_cen_query
  label: Center Width Query
  kind: query
  command: "PSCEN ?\r"
  params: []

- id: ps_cei_up
  label: Center Image Up
  kind: action
  command: "PSCEI UP\r"
  params: []

- id: ps_cei_down
  label: Center Image Down
  kind: action
  command: "PSCEI DOWN\r"
  params: []

- id: ps_cei_set
  label: Center Image Set
  kind: action
  command: "PSCEI {level}\r"
  params:
    - name: level
      type: string
      description: "00–10 by ASCII (0.0–1.0)"

- id: ps_cei_query
  label: Center Image Query
  kind: query
  command: "PSCEI ?\r"
  params: []

- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  command: "PSCEG UP\r"
  params: []

- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN\r"
  params: []

- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  command: "PSCEG {level}\r"
  params:
    - name: level
      type: string
      description: "00–10 by ASCII (0.0–1.0)"

- id: ps_ceg_query
  label: Center Gain Query
  kind: query
  command: "PSCEG ?\r"
  params: []

- id: ps_ces_on
  label: Center Spread On
  kind: action
  command: "PSCES ON\r"
  params: []

- id: ps_ces_off
  label: Center Spread Off
  kind: action
  command: "PSCES OFF\r"
  params: []

- id: ps_ces_query
  label: Center Spread Query
  kind: query
  command: "PSCES ?\r"
  params: []

- id: ps_swr_on
  label: Subwoofer On (Direct/Stereo)
  kind: action
  command: "PSSWR ON\r"
  params: []

- id: ps_swr_off
  label: Subwoofer Off (Direct/Stereo)
  kind: action
  command: "PSSWR OFF\r"
  params: []

- id: ps_swr_query
  label: Subwoofer Query
  kind: query
  command: "PSSWR ?\r"
  params: []

- id: ps_rsz_s
  label: Room Size Small
  kind: action
  command: "PSRSZ S\r"
  params: []

- id: ps_rsz_ms
  label: Room Size Medium Small
  kind: action
  command: "PSRSZ MS\r"
  params: []

- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M\r"
  params: []

- id: ps_rsz_ml
  label: Room Size Medium Large
  kind: action
  command: "PSRSZ ML\r"
  params: []

- id: ps_rsz_l
  label: Room Size Large
  kind: action
  command: "PSRSZ L\r"
  params: []

- id: ps_rsz_query
  label: Room Size Query
  kind: query
  command: "PSRSZ ?\r"
  params: []

- id: ps_delay_up
  label: Audio Delay Up
  kind: action
  command: "PSDELAY UP\r"
  params: []

- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  command: "PSDELAY DOWN\r"
  params: []

- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {ms}\r"
  params:
    - name: ms
      type: string
      description: "000–200 by ASCII in milliseconds"

- id: ps_delay_query
  label: Audio Delay Query
  kind: query
  command: "PSDELAY ?\r"
  params: []

- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF\r"
  params: []

- id: ps_rstr_low
  label: Audio Restorer Low (Mode3)
  kind: action
  command: "PSRSTR LOW\r"
  params: []

- id: ps_rstr_med
  label: Audio Restorer Medium (Mode2)
  kind: action
  command: "PSRSTR MED\r"
  params: []

- id: ps_rstr_hi
  label: Audio Restorer High (Mode1)
  kind: action
  command: "PSRSTR HI\r"
  params: []

- id: ps_rstr_query
  label: Audio Restorer Query
  kind: query
  command: "PSRSTR ?\r"
  params: []

- id: ps_front_spa
  label: Front Speaker A
  kind: action
  command: "PSFRONT SPA\r"
  params: []

- id: ps_front_spb
  label: Front Speaker B
  kind: action
  command: "PSFRONT SPB\r"
  params: []

- id: ps_front_apb
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B\r"
  params: []

- id: ps_front_query
  label: Front Speaker Query
  kind: query
  command: "PSFRONT?\r"
  params: []

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  command: "PSAUROPR SMA\r"
  params: []

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  command: "PSAUROPR MED\r"
  params: []

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  command: "PSAUROPR LAR\r"
  params: []

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Speech
  kind: action
  command: "PSAUROPR SPE\r"
  params: []

- id: ps_auropr_query
  label: Auro-Matic 3D Preset Query
  kind: query
  command: "PSAUROPR ?\r"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP\r"
  params: []

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN\r"
  params: []

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: "PSAUROST {level}\r"
  params:
    - name: level
      type: string
      description: "01–16 by ASCII"

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Query
  kind: query
  command: "PSAUROST ?\r"
  params: []

# PV — Picture Video settings

- id: pv_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF\r"
  params: []

- id: pv_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD\r"
  params: []

- id: pv_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV\r"
  params: []

- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD\r"
  params: []

- id: pv_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM\r"
  params: []

- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM\r"
  params: []

- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  command: "PVDAY\r"
  params: []

- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  command: "PVNGT\r"
  params: []

- id: pv_query
  label: Picture Mode Query
  kind: query
  command: "PV?\r"
  params: []

- id: pv_contrast_up
  label: Picture Contrast Up
  kind: action
  command: "PVCN UP\r"
  params: []

- id: pv_contrast_down
  label: Picture Contrast Down
  kind: action
  command: "PVCN DOWN\r"
  params: []

- id: pv_contrast_set
  label: Picture Contrast Set
  kind: action
  command: "PVCN {level}\r"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0 (range -50 to +50)"

- id: pv_contrast_query
  label: Picture Contrast Query
  kind: query
  command: "PVCN ?\r"
  params: []

- id: pv_brightness_up
  label: Picture Brightness Up
  kind: action
  command: "PVBR UP\r"
  params: []

- id: pv_brightness_down
  label: Picture Brightness Down
  kind: action
  command: "PVBR DOWN\r"
  params: []

- id: pv_brightness_set
  label: Picture Brightness Set
  kind: action
  command: "PVBR {level}\r"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0 (range -50 to +50)"

- id: pv_brightness_query
  label: Picture Brightness Query
  kind: query
  command: "PVBR ?\r"
  params: []

- id: pv_saturation_up
  label: Picture Saturation Up
  kind: action
  command: "PVST UP\r"
  params: []

- id: pv_saturation_down
  label: Picture Saturation Down
  kind: action
  command: "PVST DOWN\r"
  params: []

- id: pv_saturation_set
  label: Picture Saturation Set
  kind: action
  command: "PVST {level}\r"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0 (range -50 to +50)"

- id: pv_saturation_query
  label: Picture Saturation Query
  kind: query
  command: "PVST ?\r"
  params: []

- id: pv_hue_up
  label: Picture Hue Up
  kind: action
  command: "PVHUE UP\r"
  params: []

- id: pv_hue_down
  label: Picture Hue Down
  kind: action
  command: "PVHUE DOWN\r"
  params: []

- id: pv_hue_set
  label: Picture Hue Set
  kind: action
  command: "PVHUE {level}\r"
  params:
    - name: level
      type: string
      description: "44–56 by ASCII, 50=0 (±6 range)"

- id: pv_hue_query
  label: Picture Hue Query
  kind: query
  command: "PVHUE ?\r"
  params: []

- id: pv_dnr_off
  label: Picture DNR Off
  kind: action
  command: "PVDNR OFF\r"
  params: []

- id: pv_dnr_low
  label: Picture DNR Low
  kind: action
  command: "PVDNR LOW\r"
  params: []

- id: pv_dnr_mid
  label: Picture DNR Mid
  kind: action
  command: "PVDNR MID\r"
  params: []

- id: pv_dnr_hi
  label: Picture DNR High
  kind: action
  command: "PVDNR HI\r"
  params: []

- id: pv_dnr_query
  label: Picture DNR Query
  kind: query
  command: "PVDNR ?\r"
  params: []

- id: pv_enhancer_up
  label: Picture Enhancer Up
  kind: action
  command: "PVENH UP\r"
  params: []

- id: pv_enhancer_down
  label: Picture Enhancer Down
  kind: action
  command: "PVENH DOWN\r"
  params: []

- id: pv_enhancer_set
  label: Picture Enhancer Set
  kind: action
  command: "PVENH {level}\r"
  params:
    - name: level
      type: string
      description: "00–12 by ASCII"

- id: pv_enhancer_query
  label: Picture Enhancer Query
  kind: query
  command: "PVENH ?\r"
  params: []

# ZONE2 Control

- id: z2_source
  label: Zone 2 Source (same as Main)
  kind: action
  command: "Z2SOURCE\r"
  params: []

- id: z2_select_phono
  label: Zone 2 Select PHONO
  kind: action
  command: "Z2PHONO\r"
  params: []

- id: z2_select_cd
  label: Zone 2 Select CD
  kind: action
  command: "Z2CD\r"
  params: []

- id: z2_select_tuner
  label: Zone 2 Select TUNER
  kind: action
  command: "Z2TUNER\r"
  params: []

- id: z2_select_dvd
  label: Zone 2 Select DVD
  kind: action
  command: "Z2DVD\r"
  params: []

- id: z2_select_bd
  label: Zone 2 Select Blu-ray
  kind: action
  command: "Z2BD\r"
  params: []

- id: z2_select_tv
  label: Zone 2 Select TV
  kind: action
  command: "Z2TV\r"
  params: []

- id: z2_select_sat_cbl
  label: Zone 2 Select SAT/CBL
  kind: action
  command: "Z2SAT/CBL\r"
  params: []

- id: z2_select_mplay
  label: Zone 2 Select Media Player
  kind: action
  command: "Z2MPLAY\r"
  params: []

- id: z2_select_game
  label: Zone 2 Select GAME
  kind: action
  command: "Z2GAME\r"
  params: []

- id: z2_select_net
  label: Zone 2 Select NET
  kind: action
  command: "Z2NET\r"
  params: []

- id: z2_select_flickr
  label: Zone 2 Select FLICKR
  kind: action
  command: "Z2FLICKR\r"
  params: []

- id: z2_select_iradio
  label: Zone 2 Select iRadio
  kind: action
  command: "Z2IRADIO\r"
  params: []

- id: z2_select_server
  label: Zone 2 Select SERVER
  kind: action
  command: "Z2SERVER\r"
  params: []

- id: z2_select_favorites
  label: Zone 2 Select FAVORITES
  kind: action
  command: "Z2FAVORITES\r"
  params: []

- id: z2_select_aux1
  label: Zone 2 Select AUX1
  kind: action
  command: "Z2AUX1\r"
  params: []

- id: z2_select_aux2
  label: Zone 2 Select AUX2
  kind: action
  command: "Z2AUX2\r"
  params: []

- id: z2_select_aux3
  label: Zone 2 Select AUX3
  kind: action
  command: "Z2AUX3\r"
  params: []

- id: z2_select_aux4
  label: Zone 2 Select AUX4
  kind: action
  command: "Z2AUX4\r"
  params: []

- id: z2_select_aux5
  label: Zone 2 Select AUX5
  kind: action
  command: "Z2AUX5\r"
  params: []

- id: z2_select_aux6
  label: Zone 2 Select AUX6
  kind: action
  command: "Z2AUX6\r"
  params: []

- id: z2_select_aux7
  label: Zone 2 Select AUX7
  kind: action
  command: "Z2AUX7\r"
  params: []

- id: z2_select_bt
  label: Zone 2 Select Bluetooth
  kind: action
  command: "Z2BT\r"
  params: []

- id: z2_select_usb_ipod
  label: Zone 2 Select USB/iPod
  kind: action
  command: "Z2USB/IPOD\r"
  params: []

- id: z2_select_usb
  label: Zone 2 Select USB (Start Playback)
  kind: action
  command: "Z2USB\r"
  params: []

- id: z2_select_ipd
  label: Zone 2 Select iPod Direct
  kind: action
  command: "Z2IPD\r"
  params: []

- id: z2_select_irp
  label: Zone 2 Select iRadio Recent Play
  kind: action
  command: "Z2IRP\r"
  params: []

- id: z2_select_fvp
  label: Zone 2 Select Favorites Play
  kind: action
  command: "Z2FVP\r"
  params: []

- id: z2_quick_select_1
  label: Zone 2 Quick Select 1
  kind: action
  command: "Z2QUICK1\r"
  params: []

- id: z2_quick_select_2
  label: Zone 2 Quick Select 2
  kind: action
  command: "Z2QUICK2\r"
  params: []

- id: z2_quick_select_3
  label: Zone 2 Quick Select 3
  kind: action
  command: "Z2QUICK3\r"
  params: []

- id: z2_quick_select_4
  label: Zone 2 Quick Select 4
  kind: action
  command: "Z2QUICK4\r"
  params: []

- id: z2_quick_select_5
  label: Zone 2 Quick Select 5
  kind: action
  command: "Z2QUICK5\r"
  params: []

- id: z2_quick_select_1_memory
  label: Zone 2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY\r"
  params: []

- id: z2_quick_select_2_memory
  label: Zone 2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY\r"
  params: []

- id: z2_quick_select_3_memory
  label: Zone 2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY\r"
  params: []

- id: z2_quick_select_4_memory
  label: Zone 2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY\r"
  params: []

- id: z2_quick_select_5_memory
  label: Zone 2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY\r"
  params: []

- id: z2_quick_select_query
  label: Zone 2 Quick Select Query
  kind: query
  command: "Z2QUICK ?\r"
  params: []

- id: z2_favorite_1
  label: Zone 2 Favorite 1
  kind: action
  command: "Z2FAVORITE1\r"
  params: []

- id: z2_favorite_2
  label: Zone 2 Favorite 2
  kind: action
  command: "Z2FAVORITE2\r"
  params: []

- id: z2_favorite_3
  label: Zone 2 Favorite 3
  kind: action
  command: "Z2FAVORITE3\r"
  params: []

- id: z2_favorite_4
  label: Zone 2 Favorite 4
  kind: action
  command: "Z2FAVORITE4\r"
  params: []

- id: z2_favorite_1_memory
  label: Zone 2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY\r"
  params: []

- id: z2_favorite_2_memory
  label: Zone 2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY\r"
  params: []

- id: z2_favorite_3_memory
  label: Zone 2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY\r"
  params: []

- id: z2_favorite_4_memory
  label: Zone 2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY\r"
  params: []

- id: z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "Z2UP\r"
  params: []

- id: z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "Z2DOWN\r"
  params: []

- id: z2_volume_set
  label: Zone 2 Volume Set
  kind: action
  command: "Z2{level}\r"
  params:
    - name: level
      type: string
      description: "00–98 by ASCII, 80=0dB, 00=MIN"

- id: z2_on
  label: Zone 2 On
  kind: action
  command: "Z2ON\r"
  params: []

- id: z2_off
  label: Zone 2 Off
  kind: action
  command: "Z2OFF\r"
  params: []

- id: z2_query
  label: Zone 2 Query
  kind: query
  command: "Z2?\r"
  params: []

- id: z2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "Z2MUON\r"
  params: []

- id: z2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "Z2MUOFF\r"
  params: []

- id: z2_mute_query
  label: Zone 2 Mute Query
  kind: query
  command: "Z2MU?\r"
  params: []

- id: z2_channel_stereo
  label: Zone 2 Channel Stereo
  kind: action
  command: "Z2CSST\r"
  params: []

- id: z2_channel_mono
  label: Zone 2 Channel Mono
  kind: action
  command: "Z2CSMONO\r"
  params: []

- id: z2_channel_query
  label: Zone 2 Channel Query
  kind: query
  command: "Z2CS?\r"
  params: []

- id: z2_cv_fl_up
  label: Zone 2 Channel Volume Front Left Up
  kind: action
  command: "Z2CVFL UP\r"
  params: []

- id: z2_cv_fl_down
  label: Zone 2 Channel Volume Front Left Down
  kind: action
  command: "Z2CVFL DOWN\r"
  params: []

- id: z2_cv_fl_set
  label: Zone 2 Channel Volume Front Left Set
  kind: action
  command: "Z2CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z2_cv_fr_up
  label: Zone 2 Channel Volume Front Right Up
  kind: action
  command: "Z2CVFR UP\r"
  params: []

- id: z2_cv_fr_down
  label: Zone 2 Channel Volume Front Right Down
  kind: action
  command: "Z2CVFR DOWN\r"
  params: []

- id: z2_cv_fr_set
  label: Zone 2 Channel Volume Front Right Set
  kind: action
  command: "Z2CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z2_cv_query
  label: Zone 2 Channel Volume Query
  kind: query
  command: "Z2CV?\r"
  params: []

- id: z2_hpf_on
  label: Zone 2 HPF On
  kind: action
  command: "Z2HPFON\r"
  params: []

- id: z2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  command: "Z2HPFOFF\r"
  params: []

- id: z2_hpf_query
  label: Zone 2 HPF Query
  kind: query
  command: "Z2HPF?\r"
  params: []

- id: z2_bass_up
  label: Zone 2 Bass Up
  kind: action
  command: "Z2PSBAS UP\r"
  params: []

- id: z2_bass_down
  label: Zone 2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN\r"
  params: []

- id: z2_bass_set
  label: Zone 2 Bass Set
  kind: action
  command: "Z2PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: z2_bass_query
  label: Zone 2 Bass Query
  kind: query
  command: "Z2PSBAS ?\r"
  params: []

- id: z2_treble_up
  label: Zone 2 Treble Up
  kind: action
  command: "Z2PSTRE UP\r"
  params: []

- id: z2_treble_down
  label: Zone 2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN\r"
  params: []

- id: z2_treble_set
  label: Zone 2 Treble Set
  kind: action
  command: "Z2PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: z2_treble_query
  label: Zone 2 Treble Query
  kind: query
  command: "Z2PSTRE ?\r"
  params: []

- id: z2_hda_thr
  label: Zone 2 HDMI Out Through
  kind: action
  command: "Z2HDA THR\r"
  params: []

- id: z2_hda_pcm
  label: Zone 2 HDMI Out PCM
  kind: action
  command: "Z2HDA PCM\r"
  params: []

- id: z2_hda_query
  label: Zone 2 HDMI Out Query
  kind: query
  command: "Z2HDA?\r"
  params: []

- id: z2_sleep_off
  label: Zone 2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF\r"
  params: []

- id: z2_sleep_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001–120 by ASCII"

- id: z2_sleep_query
  label: Zone 2 Sleep Timer Query
  kind: query
  command: "Z2SLP?\r"
  params: []

- id: z2_standby_2h
  label: Zone 2 Auto Standby 2H
  kind: action
  command: "Z2STBY2H\r"
  params: []

- id: z2_standby_4h
  label: Zone 2 Auto Standby 4H
  kind: action
  command: "Z2STBY4H\r"
  params: []

- id: z2_standby_8h
  label: Zone 2 Auto Standby 8H
  kind: action
  command: "Z2STBY8H\r"
  params: []

- id: z2_standby_off
  label: Zone 2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF\r"
  params: []

- id: z2_standby_query
  label: Zone 2 Auto Standby Query
  kind: query
  command: "Z2STBY?\r"
  params: []

# ZONE3 Control

- id: z3_source
  label: Zone 3 Source (same as Main)
  kind: action
  command: "Z3SOURCE\r"
  params: []

- id: z3_select_phono
  label: Zone 3 Select PHONO
  kind: action
  command: "Z3PHONO\r"
  params: []

- id: z3_select_cd
  label: Zone 3 Select CD
  kind: action
  command: "Z3CD\r"
  params: []

- id: z3_select_tuner
  label: Zone 3 Select TUNER
  kind: action
  command: "Z3TUNER\r"
  params: []

- id: z3_select_dvd
  label: Zone 3 Select DVD
  kind: action
  command: "Z3DVD\r"
  params: []

- id: z3_select_bd
  label: Zone 3 Select Blu-ray
  kind: action
  command: "Z3BD\r"
  params: []

- id: z3_select_tv
  label: Zone 3 Select TV
  kind: action
  command: "Z3TV\r"
  params: []

- id: z3_select_sat_cbl
  label: Zone 3 Select SAT/CBL
  kind: action
  command: "Z3SAT/CBL\r"
  params: []

- id: z3_select_mplay
  label: Zone 3 Select Media Player
  kind: action
  command: "Z3MPLAY\r"
  params: []

- id: z3_select_game
  label: Zone 3 Select GAME
  kind: action
  command: "Z3GAME\r"
  params: []

- id: z3_select_net
  label: Zone 3 Select NET
  kind: action
  command: "Z3NET\r"
  params: []

- id: z3_select_flickr
  label: Zone 3 Select FLICKR
  kind: action
  command: "Z3FLICKR\r"
  params: []

- id: z3_select_iradio
  label: Zone 3 Select iRadio
  kind: action
  command: "Z3IRADIO\r"
  params: []

- id: z3_select_server
  label: Zone 3 Select SERVER
  kind: action
  command: "Z3SERVER\r"
  params: []

- id: z3_select_favorites
  label: Zone 3 Select FAVORITES
  kind: action
  command: "Z3FAVORITES\r"
  params: []

- id: z3_select_aux1
  label: Zone 3 Select AUX1
  kind: action
  command: "Z3AUX1\r"
  params: []

- id: z3_select_aux2
  label: Zone 3 Select AUX2
  kind: action
  command: "Z3AUX2\r"
  params: []

- id: z3_select_aux3
  label: Zone 3 Select AUX3
  kind: action
  command: "Z3AUX3\r"
  params: []

- id: z3_select_aux4
  label: Zone 3 Select AUX4
  kind: action
  command: "Z3AUX4\r"
  params: []

- id: z3_select_aux5
  label: Zone 3 Select AUX5
  kind: action
  command: "Z3AUX5\r"
  params: []

- id: z3_select_aux6
  label: Zone 3 Select AUX6
  kind: action
  command: "Z3AUX6\r"
  params: []

- id: z3_select_aux7
  label: Zone 3 Select AUX7
  kind: action
  command: "Z3AUX7\r"
  params: []

- id: z3_select_bt
  label: Zone 3 Select Bluetooth
  kind: action
  command: "Z3BT\r"
  params: []

- id: z3_select_usb_ipod
  label: Zone 3 Select USB/iPod
  kind: action
  command: "Z3USB/IPOD\r"
  params: []

- id: z3_select_usb
  label: Zone 3 Select USB (Start Playback)
  kind: action
  command: "Z3USB\r"
  params: []

- id: z3_select_ipd
  label: Zone 3 Select iPod Direct
  kind: action
  command: "Z3IPD\r"
  params: []

- id: z3_select_irp
  label: Zone 3 Select iRadio Recent Play
  kind: action
  command: "Z3IRP\r"
  params: []

- id: z3_select_fvp
  label: Zone 3 Select Favorites Play
  kind: action
  command: "Z3FVP\r"
  params: []

- id: z3_quick_select_1
  label: Zone 3 Quick Select 1
  kind: action
  command: "Z3QUICK1\r"
  params: []

- id: z3_quick_select_2
  label: Zone 3 Quick Select 2
  kind: action
  command: "Z3QUICK2\r"
  params: []

- id: z3_quick_select_3
  label: Zone 3 Quick Select 3
  kind: action
  command: "Z3QUICK3\r"
  params: []

- id: z3_quick_select_4
  label: Zone 3 Quick Select 4
  kind: action
  command: "Z3QUICK4\r"
  params: []

- id: z3_quick_select_5
  label: Zone 3 Quick Select 5
  kind: action
  command: "Z3QUICK5\r"
  params: []

- id: z3_quick_select_1_memory
  label: Zone 3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY\r"
  params: []

- id: z3_quick_select_2_memory
  label: Zone 3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY\r"
  params: []

- id: z3_quick_select_3_memory
  label: Zone 3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY\r"
  params: []

- id: z3_quick_select_4_memory
  label: Zone 3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY\r"
  params: []

- id: z3_quick_select_5_memory
  label: Zone 3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY\r"
  params: []

- id: z3_quick_select_query
  label: Zone 3 Quick Select Query
  kind: query
  command: "Z3QUICK ?\r"
  params: []

- id: z3_favorite_1
  label: Zone 3 Favorite 1
  kind: action
  command: "Z3FAVORITE1\r"
  params: []

- id: z3_favorite_2
  label: Zone 3 Favorite 2
  kind: action
  command: "Z3FAVORITE2\r"
  params: []

- id: z3_favorite_3
  label: Zone 3 Favorite 3
  kind: action
  command: "Z3FAVORITE3\r"
  params: []

- id: z3_favorite_4
  label: Zone 3 Favorite 4
  kind: action
  command: "Z3FAVORITE4\r"
  params: []

- id: z3_favorite_1_memory
  label: Zone 3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY\r"
  params: []

- id: z3_favorite_2_memory
  label: Zone 3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY\r"
  params: []

- id: z3_favorite_3_memory
  label: Zone 3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY\r"
  params: []

- id: z3_favorite_4_memory
  label: Zone 3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY\r"
  params: []

- id: z3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "Z3UP\r"
  params: []

- id: z3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "Z3DOWN\r"
  params: []

- id: z3_volume_set
  label: Zone 3 Volume Set
  kind: action
  command: "Z3{level}\r"
  params:
    - name: level
      type: string
      description: "00–98 by ASCII, 80=0dB, 00=MIN"

- id: z3_on
  label: Zone 3 On
  kind: action
  command: "Z3ON\r"
  params: []

- id: z3_off
  label: Zone 3 Off
  kind: action
  command: "Z3OFF\r"
  params: []

- id: z3_query
  label: Zone 3 Query
  kind: query
  command: "Z3?\r"
  params: []

- id: z3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "Z3MUON\r"
  params: []

- id: z3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "Z3MUOFF\r"
  params: []

- id: z3_mute_query
  label: Zone 3 Mute Query
  kind: query
  command: "Z3MU?\r"
  params: []

- id: z3_channel_stereo
  label: Zone 3 Channel Stereo
  kind: action
  command: "Z3CSST\r"
  params: []

- id: z3_channel_mono
  label: Zone 3 Channel Mono
  kind: action
  command: "Z3CSMONO\r"
  params: []

- id: z3_channel_query
  label: Zone 3 Channel Query
  kind: query
  command: "Z3CS?\r"
  params: []

- id: z3_cv_fl_up
  label: Zone 3 Channel Volume Front Left Up
  kind: action
  command: "Z3CVFL UP\r"
  params: []

- id: z3_cv_fl_down
  label: Zone 3 Channel Volume Front Left Down
  kind: action
  command: "Z3CVFL DOWN\r"
  params: []

- id: z3_cv_fl_set
  label: Zone 3 Channel Volume Front Left Set
  kind: action
  command: "Z3CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z3_cv_fr_up
  label: Zone 3 Channel Volume Front Right Up
  kind: action
  command: "Z3CVFR UP\r"
  params: []

- id: z3_cv_fr_down
  label: Zone 3 Channel Volume Front Right Down
  kind: action
  command: "Z3CVFR DOWN\r"
  params: []

- id: z3_cv_fr_set
  label: Zone 3 Channel Volume Front Right Set
  kind: action
  command: "Z3CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z3_cv_query
  label: Zone 3 Channel Volume Query
  kind: query
  command: "Z3CV?\r"
  params: []

- id: z3_hpf_on
  label: Zone 3 HPF On
  kind: action
  command: "Z3HPFON\r"
  params: []

- id: z3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  command: "Z3HPFOFF\r"
  params: []

- id: z3_hpf_query
  label: Zone 3 HPF Query
  kind: query
  command: "Z3HPF?\r"
  params: []

- id: z3_bass_up
  label: Zone 3 Bass Up
  kind: action
  command: "Z3PSBAS UP\r"
  params: []

- id: z3_bass_down
  label: Zone 3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN\r"
  params: []

- id: z3_bass_set
  label: Zone 3 Bass Set
  kind: action
  command: "Z3PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: z3_bass_query
  label: Zone 3 Bass Query
  kind: query
  command: "Z3PSBAS ?\r"
  params: []

- id: z3_treble_up
  label: Zone 3 Treble Up
  kind: action
  command: "Z3PSTRE UP\r"
  params: []

- id: z3_treble_down
  label: Zone 3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN\r"
  params: []

- id: z3_treble_set
  label: Zone 3 Treble Set
  kind: action
  command: "Z3PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "40–60 by ASCII, 50=0dB (±10dB range)"

- id: z3_treble_query
  label: Zone 3 Treble Query
  kind: query
  command: "Z3PSTRE ?\r"
  params: []

- id: z3_sleep_off
  label: Zone 3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF\r"
  params: []

- id: z3_sleep_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001–120 by ASCII"

- id: z3_sleep_query
  label: Zone 3 Sleep Timer Query
  kind: query
  command: "Z3SLP?\r"
  params: []

- id: z3_standby_2h
  label: Zone 3 Auto Standby 2H
  kind: action
  command: "Z3STBY2H\r"
  params: []

- id: z3_standby_4h
  label: Zone 3 Auto Standby 4H
  kind: action
  command: "Z3STBY4H\r"
  params: []

- id: z3_standby_8h
  label: Zone 3 Auto Standby 8H
  kind: action
  command: "Z3STBY8H\r"
  params: []

- id: z3_standby_off
  label: Zone 3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF\r"
  params: []

- id: z3_standby_query
  label: Zone 3 Auto Standby Query
  kind: query
  command: "Z3STBY?\r"
  params: []

# Tuner Control

- id: tuner_freq_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP\r"
  params: []

- id: tuner_freq_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN\r"
  params: []

- id: tuner_freq_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{freq}\r"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII; <050000 = FM MHz, >050000 = AM kHz (e.g. TFAN105000 = 1050.00kHz AM)"

- id: tuner_freq_query
  label: Tuner Frequency Query
  kind: query
  command: "TFAN?\r"
  params: []

- id: tuner_rds_name_query
  label: Tuner RDS Station Name Query (EU/AP)
  kind: query
  command: "TFANNAME?\r"
  params: []

- id: tuner_preset_up
  label: Tuner Preset Up
  kind: action
  command: "TPANUP\r"
  params: []

- id: tuner_preset_down
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN\r"
  params: []

- id: tuner_preset_set
  label: Tuner Preset Set
  kind: action
  command: "TPAN{no}\r"
  params:
    - name: no
      type: string
      description: "01–56 by ASCII"

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  command: "TPAN?\r"
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM\r"
  params: []

- id: tuner_preset_memory_set
  label: Tuner Preset Memory to Channel
  kind: action
  command: "TPANMEM{no}\r"
  params:
    - name: no
      type: string
      description: "01–56 by ASCII"

- id: tuner_band_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM\r"
  params: []

- id: tuner_band_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM\r"
  params: []

- id: tuner_band_query
  label: Tuner Band Query
  kind: query
  command: "TMAN?\r"
  params: []

- id: tuner_mode_auto
  label: Tuner Mode Auto
  kind: action
  command: "TMANAUTO\r"
  params: []

- id: tuner_mode_manual
  label: Tuner Mode Manual
  kind: action
  command: "TMANMANUAL\r"
  params: []

# Online Music / USB / Bluetooth Navigation (NS)

- id: ns_cursor_up
  label: NS Cursor Up
  kind: action
  command: "NS90\r"
  params: []

- id: ns_cursor_down
  label: NS Cursor Down
  kind: action
  command: "NS91\r"
  params: []

- id: ns_cursor_left
  label: NS Cursor Left
  kind: action
  command: "NS92\r"
  params: []

- id: ns_cursor_right
  label: NS Cursor Right
  kind: action
  command: "NS93\r"
  params: []

- id: ns_enter
  label: NS Enter / Play-Pause
  kind: action
  command: "NS94\r"
  params: []

- id: ns_play
  label: NS Play
  kind: action
  command: "NS9A\r"
  params: []

- id: ns_pause
  label: NS Pause
  kind: action
  command: "NS9B\r"
  params: []

- id: ns_stop
  label: NS Stop
  kind: action
  command: "NS9C\r"
  params: []

- id: ns_skip_plus
  label: NS Skip Forward
  kind: action
  command: "NS9D\r"
  params: []

- id: ns_skip_minus
  label: NS Skip Back
  kind: action
  command: "NS9E\r"
  params: []

- id: ns_search_plus
  label: NS Manual Search Forward
  kind: action
  command: "NS9F\r"
  params: []

- id: ns_search_minus
  label: NS Manual Search Back
  kind: action
  command: "NS9G\r"
  params: []

- id: ns_repeat_one
  label: NS Repeat One
  kind: action
  command: "NS9H\r"
  params: []

- id: ns_repeat_all
  label: NS Repeat All
  kind: action
  command: "NS9I\r"
  params: []

- id: ns_repeat_off
  label: NS Repeat Off
  kind: action
  command: "NS9J\r"
  params: []

- id: ns_random_on
  label: NS Random / Shuffle On
  kind: action
  command: "NS9K\r"
  params: []

- id: ns_random_off
  label: NS Random / Shuffle Off
  kind: action
  command: "NS9M\r"
  params: []

- id: ns_ipod_toggle
  label: NS iPod Mode Toggle (iPod Direct)
  kind: action
  command: "NS9W\r"
  params: []

- id: ns_page_next
  label: NS Page Next
  kind: action
  command: "NS9X\r"
  params: []

- id: ns_page_prev
  label: NS Page Previous
  kind: action
  command: "NS9Y\r"
  params: []

- id: ns_search_stop
  label: NS Manual Search Stop
  kind: action
  command: "NS9Z\r"
  params: []

- id: ns_repeat_toggle
  label: NS Repeat Toggle
  kind: action
  command: "NSRPT\r"
  params: []

- id: ns_random_toggle
  label: NS Random Toggle
  kind: action
  command: "NSRND\r"
  params: []

- id: ns_preset_call
  label: NS Net Audio Preset Call
  kind: action
  command: "NSB{no}\r"
  params:
    - name: no
      type: string
      description: "00–35 by ASCII"

- id: ns_preset_memory
  label: NS Net Audio Preset Memory
  kind: action
  command: "NSC{no}\r"
  params:
    - name: no
      type: string
      description: "00–35 by ASCII"

- id: ns_preset_name_query
  label: NS Net Audio Preset Names Query
  kind: query
  command: "NSH\r"
  params: []

- id: ns_add_favorites
  label: NS Add Favorites Folder
  kind: action
  command: "NSFV MEM\r"
  params: []

- id: ns_display_ascii
  label: NS Display Info ASCII
  kind: query
  command: "NSA\r"
  params: []

- id: ns_display_utf8
  label: NS Display Info UTF-8
  kind: query
  command: "NSE\r"
  params: []

# System / Menu Navigation (MN)

- id: mn_cursor_up
  label: Menu Cursor Up
  kind: action
  command: "MNCUP\r"
  params: []

- id: mn_cursor_down
  label: Menu Cursor Down
  kind: action
  command: "MNCDN\r"
  params: []

- id: mn_cursor_left
  label: Menu Cursor Left
  kind: action
  command: "MNCLT\r"
  params: []

- id: mn_cursor_right
  label: Menu Cursor Right
  kind: action
  command: "MNCRT\r"
  params: []

- id: mn_enter
  label: Menu Enter
  kind: action
  command: "MNENT\r"
  params: []

- id: mn_return
  label: Menu Return
  kind: action
  command: "MNRTN\r"
  params: []

- id: mn_option
  label: Menu Option
  kind: action
  command: "MNOPT\r"
  params: []

- id: mn_info
  label: Menu Info
  kind: action
  command: "MNINF\r"
  params: []

- id: mn_channel_level
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL\r"
  params: []

- id: mn_menu_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON\r"
  params: []

- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF\r"
  params: []

- id: mn_menu_query
  label: Setup Menu Query
  kind: query
  command: "MNMEN?\r"
  params: []

- id: mn_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON\r"
  params: []

- id: mn_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF\r"
  params: []

- id: mn_all_zone_stereo_query
  label: All Zone Stereo Query
  kind: query
  command: "MNZST?\r"
  params: []

# System (SY) — Panel/Remote Lock

- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON\r"
  params: []

- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF\r"
  params: []

- id: sy_panel_lock_on
  label: Panel Lock On (excl. Master Vol)
  kind: action
  command: "SYPANEL LOCK ON\r"
  params: []

- id: sy_panel_v_lock_on
  label: Panel + Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON\r"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF\r"
  params: []

# Trigger (TR)

- id: trigger_1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON\r"
  params: []

- id: trigger_1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF\r"
  params: []

- id: trigger_2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON\r"
  params: []

- id: trigger_2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF\r"
  params: []

- id: trigger_query
  label: Trigger Status Query
  kind: query
  command: "TR?\r"
  params: []

# Display Dimmer (DIM)

- id: dimmer_bright
  label: Dimmer Bright
  kind: action
  command: "DIM BRI\r"
  params: []

- id: dimmer_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM\r"
  params: []

- id: dimmer_dark
  label: Dimmer Dark
  kind: action
  command: "DIM DAR\r"
  params: []

- id: dimmer_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF\r"
  params: []

- id: dimmer_select
  label: Dimmer Toggle (Bright→Dim→Dark→Off)
  kind: action
  command: "DIM SEL\r"
  params: []

- id: dimmer_query
  label: Dimmer Query
  kind: query
  command: "DIM ?\r"
  params: []

# Remote Maintenance (RM)

- id: rm_start
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA\r"
  params: []

- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END\r"
  params: []

- id: rm_query
  label: Remote Maintenance Query
  kind: query
  command: "RM ?\r"
  params: []

# Upgrade (UG)

- id: ug_idn
  label: Display Upgrade ID Number
  kind: action
  command: "UGIDN\r"
  params: []
```

## Feedbacks

```yaml
- id: fb_power
  query_command: "PW?\r"
  description: Returns PWON or PWSTANDBY

- id: fb_master_volume
  query_command: "MV?\r"
  description: Returns MV** (2-digit) or MV*** (3-digit for 0.5dB steps)

- id: fb_mute
  query_command: "MU?\r"
  description: Returns MUON or MUOFF

- id: fb_input_source
  query_command: "SI?\r"
  description: Returns SI followed by current input name

- id: fb_surround_mode
  query_command: "MS?\r"
  description: Returns MS followed by current surround mode string

- id: fb_main_zone
  query_command: "ZM?\r"
  description: Returns ZMON or ZMOFF

- id: fb_zone2
  query_command: "Z2?\r"
  description: Returns Z2ON or Z2OFF and current source

- id: fb_zone3
  query_command: "Z3?\r"
  description: Returns Z3ON or Z3OFF and current source

- id: fb_channel_volume
  query_command: "CV?\r"
  description: Returns per-channel CV values; only configured speakers reply; ends with CVEND

- id: fb_signal_detect
  query_command: "SD?\r"
  description: Returns SDAUTO, SDHDMI, SDDIGITAL, SDANALOG, SDEXT.IN, SD7.1IN, or SDNO

- id: fb_digital_input
  query_command: "DC?\r"
  description: Returns DCAUTO, DCPCM, or DCDTS

- id: fb_video_select
  query_command: "SV?\r"
  description: Returns SVDVD, SVON, etc.

- id: fb_sleep_timer
  query_command: "SLP?\r"
  description: Returns SLP*** (001-120) or SLPOFF

- id: fb_auto_standby
  query_command: "STBY?\r"
  description: Returns STBY15M, STBY30M, STBY60M, or STBYOFF

- id: fb_eco_mode
  query_command: "ECO?\r"
  description: Returns ECOON, ECOAUTO, or ECOOFF

- id: fb_quick_select
  query_command: "MSQUICK ?\r"
  description: Returns MSQUICK1–5 or MSQUICK0

- id: fb_tuner_freq
  query_command: "TFAN?\r"
  description: Returns TFAN followed by 6-digit frequency

- id: fb_tuner_preset
  query_command: "TPAN?\r"
  description: Returns TPAN** (01-56) or TPANOFF

- id: fb_tuner_band
  query_command: "TMAN?\r"
  description: Returns TMANAM or TMANFM

- id: fb_dimmer
  query_command: "DIM ?\r"
  description: Returns DIM BRI, DIM DIM, DIM DAR, or DIM OFF

- id: fb_trigger
  query_command: "TR?\r"
  description: Returns TR1 ON/OFF and TR2 ON/OFF

- id: fb_menu
  query_command: "MNMEN?\r"
  description: Returns MNMEN ON or MNMEN OFF

- id: fb_all_zone_stereo
  query_command: "MNZST?\r"
  description: Returns MNZST ON or MNZST OFF

- id: fb_z2_mute
  query_command: "Z2MU?\r"
  description: Returns Z2MUON or Z2MUOFF

- id: fb_z3_mute
  query_command: "Z3MU?\r"
  description: Returns Z3MUON or Z3MUOFF

- id: fb_ns_display_ascii
  query_command: "NSA\r"
  description: Returns NSA0–NSA8 onscreen display lines (ASCII, max 96 bytes each)

- id: fb_ns_display_utf8
  query_command: "NSE\r"
  description: Returns NSE0–NSE8 onscreen display lines (UTF-8, max 96 bytes each)
```

## Variables

```yaml
[]
```

## Events

```yaml
[]
```

## Macros

```yaml
[]
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

## Notes

Commands are ASCII strings (0x20–0x7F) terminated with CR (0x0D). Send commands at intervals of 50 ms or greater; after a PWON command, wait at least 1 second before sending the next command. Ethernet connection uses Telnet on TCP port 23 (10BASE-T/100BASE-TX); RS-232C uses 9600 baud, 8N1, no flow control, max 135-byte command length. The AVR emits EVENT notifications (same form as COMMAND) within 5 seconds of a state change; RESPONSE to a request command arrives within 200 ms.

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-20T21:02:20.508Z
last_checked_at: 2026-06-23T11:10:45.348Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:10:45.348Z
matched_actions: 753
action_count: 753
confidence: medium
summary: "All 753 spec actions matched verbatim; transport port 23 / 9600 8N1 confirmed; full coverage of Denon Ver.06 catalogue. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
