---
spec_id: admin/denon-avr-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR Control Spec"
manufacturer: Denon
model_family: "Denon AVR"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "Denon AVR"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T21:58:50.831Z
last_checked_at: 2026-05-26T13:19:02.078Z
generated_at: 2026-05-26T13:19:02.078Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model compatibility matrix across AVR generations not fully specified in source"
verification:
  verdict: verified
  checked_at: 2026-05-26T13:19:02.078Z
  matched_actions: 907
  action_count: 907
  confidence: medium
  summary: "All 907 spec action units have verbatim wire-token matches in source; Z2/Z3 input variants (HDRADIO, LASTFM, FLICKR, AUX3-7, USB/IPOD, IPD, IRP, FVP plus Z3 PANDORA/SIRIUSXM/SPOTIFY) all documented in the Denon control protocol table; transport fully confirmed. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Denon AVR Control Spec

## Summary
Denon AVR receivers expose a text-based ASCII control protocol over both RS-232C (9600 baud, DB-9) and TCP/IP (port 23, Telnet). Commands follow the form `COMMAND + PARAMETER + CR (0x0D)`; the device replies with identically formatted EVENT or RESPONSE messages. This spec covers the full documented command set from the Denon Control Protocol Ver.06 reference manual, including main zone, Zone 2, Zone 3, tuner, HD Radio, online music/Bluetooth, and system control commands.

<!-- UNRESOLVED: exact model compatibility matrix across AVR generations not fully specified in source -->

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
- powerable       # inferred from PW ON/STANDBY commands
- routable        # inferred from SI input-select commands
- queryable       # inferred from ? query commands throughout
- levelable       # inferred from MV/CV volume commands
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  command: "PWON\r"

- id: power_standby
  label: Power Standby
  kind: action
  params: []
  command: "PWSTANDBY\r"

- id: power_query
  label: Power Status Query
  kind: query
  params: []
  command: "PW?\r"

- id: master_volume_up
  label: Master Volume Up
  kind: action
  params: []
  command: "MVUP\r"

- id: master_volume_down
  label: Master Volume Down
  kind: action
  params: []
  command: "MVDOWN\r"

- id: master_volume_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "Volume level 00-98 (80=0dB); use 3 chars for 0.5dB steps e.g. 795"
  command: "MV{level}\r"

- id: master_volume_query
  label: Master Volume Query
  kind: query
  params: []
  command: "MV?\r"

- id: mute_on
  label: Mute On
  kind: action
  params: []
  command: "MUON\r"

- id: mute_off
  label: Mute Off
  kind: action
  params: []
  command: "MUOFF\r"

- id: mute_query
  label: Mute Status Query
  kind: query
  params: []
  command: "MU?\r"

- id: main_zone_on
  label: Main Zone On
  kind: action
  params: []
  command: "ZMON\r"

- id: main_zone_off
  label: Main Zone Off
  kind: action
  params: []
  command: "ZMOFF\r"

- id: main_zone_query
  label: Main Zone Status Query
  kind: query
  params: []
  command: "ZM?\r"

- id: main_zone_favorite1
  label: Main Zone Favorite 1
  kind: action
  params: []
  command: "ZMFAVORITE1\r"

- id: main_zone_favorite2
  label: Main Zone Favorite 2
  kind: action
  params: []
  command: "ZMFAVORITE2\r"

- id: main_zone_favorite3
  label: Main Zone Favorite 3
  kind: action
  params: []
  command: "ZMFAVORITE3\r"

- id: main_zone_favorite4
  label: Main Zone Favorite 4
  kind: action
  params: []
  command: "ZMFAVORITE4\r"

- id: main_zone_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  params: []
  command: "ZMFAVORITE1 MEMORY\r"

- id: main_zone_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  params: []
  command: "ZMFAVORITE2 MEMORY\r"

- id: main_zone_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  params: []
  command: "ZMFAVORITE3 MEMORY\r"

- id: main_zone_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  params: []
  command: "ZMFAVORITE4 MEMORY\r"

- id: select_input_phono
  label: Select Input PHONO
  kind: action
  params: []
  command: "SIPHONO\r"

- id: select_input_cd
  label: Select Input CD
  kind: action
  params: []
  command: "SICD\r"

- id: select_input_tuner
  label: Select Input TUNER
  kind: action
  params: []
  command: "SITUNER\r"

- id: select_input_dvd
  label: Select Input DVD
  kind: action
  params: []
  command: "SIDVD\r"

- id: select_input_bd
  label: Select Input BD (Blu-ray)
  kind: action
  params: []
  command: "SIBD\r"

- id: select_input_tv
  label: Select Input TV
  kind: action
  params: []
  command: "SITV\r"

- id: select_input_sat_cbl
  label: Select Input SAT/CBL
  kind: action
  params: []
  command: "SISAT/CBL\r"

- id: select_input_mplay
  label: Select Input MEDIA PLAYER
  kind: action
  params: []
  command: "SIMPLAY\r"

- id: select_input_game
  label: Select Input GAME
  kind: action
  params: []
  command: "SIGAME\r"

- id: select_input_hdradio
  label: Select Input HD RADIO (North America only)
  kind: action
  params: []
  command: "SIHDRADIO\r"

- id: select_input_net
  label: Select Input NET
  kind: action
  params: []
  command: "SINET\r"

- id: select_input_pandora
  label: Select Input PANDORA (North America only)
  kind: action
  params: []
  command: "SIPANDORA\r"

- id: select_input_siriusxm
  label: Select Input SIRIUSXM
  kind: action
  params: []
  command: "SISIRIUSXM\r"

- id: select_input_spotify
  label: Select Input SPOTIFY (North America and Europe only)
  kind: action
  params: []
  command: "SISPOTIFY\r"

- id: select_input_lastfm
  label: Select Input LASTFM
  kind: action
  params: []
  command: "SILASTFM\r"

- id: select_input_flickr
  label: Select Input FLICKR
  kind: action
  params: []
  command: "SIFLICKR\r"

- id: select_input_iradio
  label: Select Input IRADIO
  kind: action
  params: []
  command: "SIIRADIO\r"

- id: select_input_server
  label: Select Input SERVER
  kind: action
  params: []
  command: "SISERVER\r"

- id: select_input_favorites
  label: Select Input FAVORITES
  kind: action
  params: []
  command: "SIFAVORITES\r"

- id: select_input_aux1
  label: Select Input AUX1
  kind: action
  params: []
  command: "SIAUX1\r"

- id: select_input_aux2
  label: Select Input AUX2
  kind: action
  params: []
  command: "SIAUX2\r"

- id: select_input_aux3
  label: Select Input AUX3
  kind: action
  params: []
  command: "SIAUX3\r"

- id: select_input_aux4
  label: Select Input AUX4
  kind: action
  params: []
  command: "SIAUX4\r"

- id: select_input_aux5
  label: Select Input AUX5
  kind: action
  params: []
  command: "SIAUX5\r"

- id: select_input_aux6
  label: Select Input AUX6
  kind: action
  params: []
  command: "SIAUX6\r"

- id: select_input_aux7
  label: Select Input AUX7
  kind: action
  params: []
  command: "SIAUX7\r"

- id: select_input_bt
  label: Select Input Bluetooth
  kind: action
  params: []
  command: "SIBT\r"

- id: select_input_usb_ipod
  label: Select Input USB/iPod
  kind: action
  params: []
  command: "SIUSB/IPOD\r"

- id: select_input_usb
  label: Select Input USB
  kind: action
  params: []
  command: "SIUSB\r"

- id: select_input_ipd
  label: Select Input iPod DIRECT
  kind: action
  params: []
  command: "SIIPD\r"

- id: select_input_irp
  label: Select Input iRadio Recent Play
  kind: action
  params: []
  command: "SIIRP\r"

- id: select_input_fvp
  label: Select Input Favorites Play
  kind: action
  params: []
  command: "SIFVP\r"

- id: select_input_query
  label: Input Source Query
  kind: query
  params: []
  command: "SI?\r"

- id: cv_fl_up
  label: Channel Volume FL Up
  kind: action
  params: []
  command: "CVFL UP\r"

- id: cv_fl_down
  label: Channel Volume FL Down
  kind: action
  params: []
  command: "CVFL DOWN\r"

- id: cv_fl_set
  label: Channel Volume FL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFL {level}\r"

- id: cv_fr_up
  label: Channel Volume FR Up
  kind: action
  params: []
  command: "CVFR UP\r"

- id: cv_fr_down
  label: Channel Volume FR Down
  kind: action
  params: []
  command: "CVFR DOWN\r"

- id: cv_fr_set
  label: Channel Volume FR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFR {level}\r"

- id: cv_c_up
  label: Channel Volume C Up
  kind: action
  params: []
  command: "CVC UP\r"

- id: cv_c_down
  label: Channel Volume C Down
  kind: action
  params: []
  command: "CVC DOWN\r"

- id: cv_c_set
  label: Channel Volume C Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVC {level}\r"

- id: cv_sw_up
  label: Channel Volume SW Up
  kind: action
  params: []
  command: "CVSW UP\r"

- id: cv_sw_down
  label: Channel Volume SW Down
  kind: action
  params: []
  command: "CVSW DOWN\r"

- id: cv_sw_set
  label: Channel Volume SW Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62, 50=0dB"
  command: "CVSW {level}\r"

- id: cv_sw2_up
  label: Channel Volume SW2 Up
  kind: action
  params: []
  command: "CVSW2 UP\r"

- id: cv_sw2_down
  label: Channel Volume SW2 Down
  kind: action
  params: []
  command: "CVSW2 DOWN\r"

- id: cv_sw2_set
  label: Channel Volume SW2 Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62, 50=0dB"
  command: "CVSW2 {level}\r"

- id: cv_sl_up
  label: Channel Volume SL Up
  kind: action
  params: []
  command: "CVSL UP\r"

- id: cv_sl_down
  label: Channel Volume SL Down
  kind: action
  params: []
  command: "CVSL DOWN\r"

- id: cv_sl_set
  label: Channel Volume SL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSL {level}\r"

- id: cv_sr_up
  label: Channel Volume SR Up
  kind: action
  params: []
  command: "CVSR UP\r"

- id: cv_sr_down
  label: Channel Volume SR Down
  kind: action
  params: []
  command: "CVSR DOWN\r"

- id: cv_sr_set
  label: Channel Volume SR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSR {level}\r"

- id: cv_sbl_up
  label: Channel Volume SBL Up
  kind: action
  params: []
  command: "CVSBL UP\r"

- id: cv_sbl_down
  label: Channel Volume SBL Down
  kind: action
  params: []
  command: "CVSBL DOWN\r"

- id: cv_sbl_set
  label: Channel Volume SBL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSBL {level}\r"

- id: cv_sbr_up
  label: Channel Volume SBR Up
  kind: action
  params: []
  command: "CVSBR UP\r"

- id: cv_sbr_down
  label: Channel Volume SBR Down
  kind: action
  params: []
  command: "CVSBR DOWN\r"

- id: cv_sbr_set
  label: Channel Volume SBR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSBR {level}\r"

- id: cv_sb_up
  label: Channel Volume SB Up
  kind: action
  params: []
  command: "CVSB UP\r"

- id: cv_sb_down
  label: Channel Volume SB Down
  kind: action
  params: []
  command: "CVSB DOWN\r"

- id: cv_sb_set
  label: Channel Volume SB Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSB {level}\r"

- id: cv_fhl_up
  label: Channel Volume FHL Up
  kind: action
  params: []
  command: "CVFHL UP\r"

- id: cv_fhl_down
  label: Channel Volume FHL Down
  kind: action
  params: []
  command: "CVFHL DOWN\r"

- id: cv_fhl_set
  label: Channel Volume FHL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFHL {level}\r"

- id: cv_fhr_up
  label: Channel Volume FHR Up
  kind: action
  params: []
  command: "CVFHR UP\r"

- id: cv_fhr_down
  label: Channel Volume FHR Down
  kind: action
  params: []
  command: "CVFHR DOWN\r"

- id: cv_fhr_set
  label: Channel Volume FHR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFHR {level}\r"

- id: cv_fwl_up
  label: Channel Volume FWL Up
  kind: action
  params: []
  command: "CVFWL UP\r"

- id: cv_fwl_down
  label: Channel Volume FWL Down
  kind: action
  params: []
  command: "CVFWL DOWN\r"

- id: cv_fwl_set
  label: Channel Volume FWL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFWL {level}\r"

- id: cv_fwr_up
  label: Channel Volume FWR Up
  kind: action
  params: []
  command: "CVFWR UP\r"

- id: cv_fwr_down
  label: Channel Volume FWR Down
  kind: action
  params: []
  command: "CVFWR DOWN\r"

- id: cv_fwr_set
  label: Channel Volume FWR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFWR {level}\r"

- id: cv_tfl_up
  label: Channel Volume TFL Up
  kind: action
  params: []
  command: "CVTFL UP\r"

- id: cv_tfl_down
  label: Channel Volume TFL Down
  kind: action
  params: []
  command: "CVTFL DOWN\r"

- id: cv_tfl_set
  label: Channel Volume TFL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTFL {level}\r"

- id: cv_tfr_up
  label: Channel Volume TFR Up
  kind: action
  params: []
  command: "CVTFR UP\r"

- id: cv_tfr_down
  label: Channel Volume TFR Down
  kind: action
  params: []
  command: "CVTFR DOWN\r"

- id: cv_tfr_set
  label: Channel Volume TFR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTFR {level}\r"

- id: cv_tml_up
  label: Channel Volume TML Up
  kind: action
  params: []
  command: "CVTML UP\r"

- id: cv_tml_down
  label: Channel Volume TML Down
  kind: action
  params: []
  command: "CVTML DOWN\r"

- id: cv_tml_set
  label: Channel Volume TML Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTML {level}\r"

- id: cv_tmr_up
  label: Channel Volume TMR Up
  kind: action
  params: []
  command: "CVTMR UP\r"

- id: cv_tmr_down
  label: Channel Volume TMR Down
  kind: action
  params: []
  command: "CVTMR DOWN\r"

- id: cv_tmr_set
  label: Channel Volume TMR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTMR {level}\r"

- id: cv_trl_up
  label: Channel Volume TRL Up
  kind: action
  params: []
  command: "CVTRL UP\r"

- id: cv_trl_down
  label: Channel Volume TRL Down
  kind: action
  params: []
  command: "CVTRL DOWN\r"

- id: cv_trl_set
  label: Channel Volume TRL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTRL {level}\r"

- id: cv_trr_up
  label: Channel Volume TRR Up
  kind: action
  params: []
  command: "CVTRR UP\r"

- id: cv_trr_down
  label: Channel Volume TRR Down
  kind: action
  params: []
  command: "CVTRR DOWN\r"

- id: cv_trr_set
  label: Channel Volume TRR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTRR {level}\r"

- id: cv_rhl_up
  label: Channel Volume RHL Up
  kind: action
  params: []
  command: "CVRHL UP\r"

- id: cv_rhl_down
  label: Channel Volume RHL Down
  kind: action
  params: []
  command: "CVRHL DOWN\r"

- id: cv_rhl_set
  label: Channel Volume RHL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVRHL {level}\r"

- id: cv_rhr_up
  label: Channel Volume RHR Up
  kind: action
  params: []
  command: "CVRHR UP\r"

- id: cv_rhr_down
  label: Channel Volume RHR Down
  kind: action
  params: []
  command: "CVRHR DOWN\r"

- id: cv_rhr_set
  label: Channel Volume RHR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVRHR {level}\r"

- id: cv_fdl_up
  label: Channel Volume FDL Up
  kind: action
  params: []
  command: "CVFDL UP\r"

- id: cv_fdl_down
  label: Channel Volume FDL Down
  kind: action
  params: []
  command: "CVFDL DOWN\r"

- id: cv_fdl_set
  label: Channel Volume FDL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFDL {level}\r"

- id: cv_fdr_up
  label: Channel Volume FDR Up
  kind: action
  params: []
  command: "CVFDR UP\r"

- id: cv_fdr_down
  label: Channel Volume FDR Down
  kind: action
  params: []
  command: "CVFDR DOWN\r"

- id: cv_fdr_set
  label: Channel Volume FDR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVFDR {level}\r"

- id: cv_sdl_up
  label: Channel Volume SDL Up
  kind: action
  params: []
  command: "CVSDL UP\r"

- id: cv_sdl_down
  label: Channel Volume SDL Down
  kind: action
  params: []
  command: "CVSDL DOWN\r"

- id: cv_sdl_set
  label: Channel Volume SDL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSDL {level}\r"

- id: cv_sdr_up
  label: Channel Volume SDR Up
  kind: action
  params: []
  command: "CVSDR UP\r"

- id: cv_sdr_down
  label: Channel Volume SDR Down
  kind: action
  params: []
  command: "CVSDR DOWN\r"

- id: cv_sdr_set
  label: Channel Volume SDR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSDR {level}\r"

- id: cv_bdl_up
  label: Channel Volume BDL Up
  kind: action
  params: []
  command: "CVBDL UP\r"

- id: cv_bdl_down
  label: Channel Volume BDL Down
  kind: action
  params: []
  command: "CVBDL DOWN\r"

- id: cv_bdl_set
  label: Channel Volume BDL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVBDL {level}\r"

- id: cv_bdr_up
  label: Channel Volume BDR Up
  kind: action
  params: []
  command: "CVBDR UP\r"

- id: cv_bdr_down
  label: Channel Volume BDR Down
  kind: action
  params: []
  command: "CVBDR DOWN\r"

- id: cv_bdr_set
  label: Channel Volume BDR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVBDR {level}\r"

- id: cv_shl_up
  label: Channel Volume SHL Up (Auro-3D)
  kind: action
  params: []
  command: "CVSHL UP\r"

- id: cv_shl_down
  label: Channel Volume SHL Down (Auro-3D)
  kind: action
  params: []
  command: "CVSHL DOWN\r"

- id: cv_shl_set
  label: Channel Volume SHL Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSHL {level}\r"

- id: cv_shr_up
  label: Channel Volume SHR Up (Auro-3D)
  kind: action
  params: []
  command: "CVSHR UP\r"

- id: cv_shr_down
  label: Channel Volume SHR Down (Auro-3D)
  kind: action
  params: []
  command: "CVSHR DOWN\r"

- id: cv_shr_set
  label: Channel Volume SHR Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVSHR {level}\r"

- id: cv_ts_up
  label: Channel Volume TS Up (Auro-3D)
  kind: action
  params: []
  command: "CVTS UP\r"

- id: cv_ts_down
  label: Channel Volume TS Down (Auro-3D)
  kind: action
  params: []
  command: "CVTS DOWN\r"

- id: cv_ts_set
  label: Channel Volume TS Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "CVTS {level}\r"

- id: cv_zrl
  label: Channel Volume Reset All to Factory Defaults
  kind: action
  params: []
  command: "CVZRL\r"

- id: cv_query
  label: Channel Volume Query
  kind: query
  params: []
  command: "CV?\r"

- id: surround_mode_movie
  label: Surround Mode MOVIE
  kind: action
  params: []
  command: "MSMOVIE\r"

- id: surround_mode_music
  label: Surround Mode MUSIC
  kind: action
  params: []
  command: "MSMUSIC\r"

- id: surround_mode_game
  label: Surround Mode GAME
  kind: action
  params: []
  command: "MSGAME\r"

- id: surround_mode_direct
  label: Surround Mode DIRECT
  kind: action
  params: []
  command: "MSDIRECT\r"

- id: surround_mode_pure_direct
  label: Surround Mode PURE DIRECT
  kind: action
  params: []
  command: "MSPURE DIRECT\r"

- id: surround_mode_stereo
  label: Surround Mode STEREO
  kind: action
  params: []
  command: "MSSTEREO\r"

- id: surround_mode_auto
  label: Surround Mode AUTO
  kind: action
  params: []
  command: "MSAUTO\r"

- id: surround_mode_dolby_digital
  label: Surround Mode DOLBY DIGITAL
  kind: action
  params: []
  command: "MSDOLBY DIGITAL\r"

- id: surround_mode_dolby_surround
  label: Surround Mode DOLBY SURROUND
  kind: action
  params: []
  command: "MSDOLBY SURROUND\r"

- id: surround_mode_dolby_atmos
  label: Surround Mode DOLBY ATMOS
  kind: action
  params: []
  command: "MSDOLBY ATMOS\r"

- id: surround_mode_dolby_d_ex
  label: Surround Mode DOLBY D EX
  kind: action
  params: []
  command: "MSDOLBY D EX\r"

- id: surround_mode_dolby_pro_logic
  label: Surround Mode DOLBY PRO LOGIC
  kind: action
  params: []
  command: "MSDOLBY PRO LOGIC\r"

- id: surround_mode_dolby_pl2_c
  label: Surround Mode DOLBY PL2 C
  kind: action
  params: []
  command: "MSDOLBY PL2 C\r"

- id: surround_mode_dolby_pl2_m
  label: Surround Mode DOLBY PL2 M
  kind: action
  params: []
  command: "MSDOLBY PL2 M\r"

- id: surround_mode_dolby_pl2_g
  label: Surround Mode DOLBY PL2 G
  kind: action
  params: []
  command: "MSDOLBY PL2 G\r"

- id: surround_mode_dolby_pl2x_c
  label: Surround Mode DOLBY PL2X C
  kind: action
  params: []
  command: "MSDOLBY PL2X C\r"

- id: surround_mode_dolby_pl2x_m
  label: Surround Mode DOLBY PL2X M
  kind: action
  params: []
  command: "MSDOLBY PL2X M\r"

- id: surround_mode_dolby_pl2x_g
  label: Surround Mode DOLBY PL2X G
  kind: action
  params: []
  command: "MSDOLBY PL2X G\r"

- id: surround_mode_dolby_pl2z_h
  label: Surround Mode DOLBY PL2Z H
  kind: action
  params: []
  command: "MSDOLBY PL2Z H\r"

- id: surround_mode_dolby_d_pl2x_c
  label: Surround Mode DOLBY D+PL2X C
  kind: action
  params: []
  command: "MSDOLBY D+PL2X C\r"

- id: surround_mode_dolby_d_pl2x_m
  label: Surround Mode DOLBY D+PL2X M
  kind: action
  params: []
  command: "MSDOLBY D+PL2X M\r"

- id: surround_mode_dolby_d_pl2z_h
  label: Surround Mode DOLBY D+PL2Z H
  kind: action
  params: []
  command: "MSDOLBY D+PL2Z H\r"

- id: surround_mode_dolby_d_ds
  label: Surround Mode DOLBY D+DS
  kind: action
  params: []
  command: "MSDOLBY D+DS\r"

- id: surround_mode_dolby_d_neo_x_c
  label: Surround Mode DOLBY D+NEO:X C
  kind: action
  params: []
  command: "MSDOLBY D+NEO:X C\r"

- id: surround_mode_dolby_d_neo_x_m
  label: Surround Mode DOLBY D+NEO:X M
  kind: action
  params: []
  command: "MSDOLBY D+NEO:X M\r"

- id: surround_mode_dolby_d_neo_x_g
  label: Surround Mode DOLBY D+NEO:X G
  kind: action
  params: []
  command: "MSDOLBY D+NEO:X G\r"

- id: surround_mode_dolby_d_plus
  label: Surround Mode DOLBY D+
  kind: action
  params: []
  command: "MSDOLBY D+\r"

- id: surround_mode_dolby_d_plus_ex
  label: Surround Mode DOLBY D+ +EX
  kind: action
  params: []
  command: "MSDOLBY D+ +EX\r"

- id: surround_mode_dolby_d_plus_pl2x_c
  label: Surround Mode DOLBY D+ +PL2X C
  kind: action
  params: []
  command: "MSDOLBY D+ +PL2X C\r"

- id: surround_mode_dolby_d_plus_pl2x_m
  label: Surround Mode DOLBY D+ +PL2X M
  kind: action
  params: []
  command: "MSDOLBY D+ +PL2X M\r"

- id: surround_mode_dolby_d_plus_pl2z_h
  label: Surround Mode DOLBY D+ +PL2Z H
  kind: action
  params: []
  command: "MSDOLBY D+ +PL2Z H\r"

- id: surround_mode_dolby_d_plus_ds
  label: Surround Mode DOLBY D+ +DS
  kind: action
  params: []
  command: "MSDOLBY D+ +DS\r"

- id: surround_mode_dolby_d_plus_neo_x_c
  label: Surround Mode DOLBY D+ +NEO:X C
  kind: action
  params: []
  command: "MSDOLBY D+ +NEO:X C\r"

- id: surround_mode_dolby_d_plus_neo_x_m
  label: Surround Mode DOLBY D+ +NEO:X M
  kind: action
  params: []
  command: "MSDOLBY D+ +NEO:X M\r"

- id: surround_mode_dolby_d_plus_neo_x_g
  label: Surround Mode DOLBY D+ +NEO:X G
  kind: action
  params: []
  command: "MSDOLBY D+ +NEO:X G\r"

- id: surround_mode_dolby_hd
  label: Surround Mode DOLBY HD
  kind: action
  params: []
  command: "MSDOLBY HD\r"

- id: surround_mode_dolby_hd_ex
  label: Surround Mode DOLBY HD+EX
  kind: action
  params: []
  command: "MSDOLBY HD+EX\r"

- id: surround_mode_dolby_hd_pl2x_c
  label: Surround Mode DOLBY HD+PL2X C
  kind: action
  params: []
  command: "MSDOLBY HD+PL2X C\r"

- id: surround_mode_dolby_hd_pl2x_m
  label: Surround Mode DOLBY HD+PL2X M
  kind: action
  params: []
  command: "MSDOLBY HD+PL2X M\r"

- id: surround_mode_dolby_hd_pl2z_h
  label: Surround Mode DOLBY HD+PL2Z H
  kind: action
  params: []
  command: "MSDOLBY HD+PL2Z H\r"

- id: surround_mode_dolby_hd_ds
  label: Surround Mode DOLBY HD+DS
  kind: action
  params: []
  command: "MSDOLBY HD+DS\r"

- id: surround_mode_dolby_hd_neo_x_c
  label: Surround Mode DOLBY HD+NEO:X C
  kind: action
  params: []
  command: "MSDOLBY HD+NEO:X C\r"

- id: surround_mode_dolby_hd_neo_x_m
  label: Surround Mode DOLBY HD+NEO:X M
  kind: action
  params: []
  command: "MSDOLBY HD+NEO:X M\r"

- id: surround_mode_dolby_hd_neo_x_g
  label: Surround Mode DOLBY HD+NEO:X G
  kind: action
  params: []
  command: "MSDOLBY HD+NEO:X G\r"

- id: surround_mode_dts_surround
  label: Surround Mode DTS SURROUND
  kind: action
  params: []
  command: "MSDTS SURROUND\r"

- id: surround_mode_dts_es_dscrt61
  label: Surround Mode DTS ES DSCRT6.1
  kind: action
  params: []
  command: "MSDTS ES DSCRT6.1\r"

- id: surround_mode_dts_es_mtrx61
  label: Surround Mode DTS ES MTRX6.1
  kind: action
  params: []
  command: "MSDTS ES MTRX6.1\r"

- id: surround_mode_dts_pl2x_c
  label: Surround Mode DTS+PL2X C
  kind: action
  params: []
  command: "MSDTS+PL2X C\r"

- id: surround_mode_dts_pl2x_m
  label: Surround Mode DTS+PL2X M
  kind: action
  params: []
  command: "MSDTS+PL2X M\r"

- id: surround_mode_dts_pl2z_h
  label: Surround Mode DTS+PL2Z H
  kind: action
  params: []
  command: "MSDTS+PL2Z H\r"

- id: surround_mode_dts_ds
  label: Surround Mode DTS+DS
  kind: action
  params: []
  command: "MSDTS+DS\r"

- id: surround_mode_dts9624
  label: Surround Mode DTS96/24
  kind: action
  params: []
  command: "MSDTS96/24\r"

- id: surround_mode_dts96_es_mtrx
  label: Surround Mode DTS96 ES MTRX
  kind: action
  params: []
  command: "MSDTS96 ES MTRX\r"

- id: surround_mode_dts_neo6
  label: Surround Mode DTS+NEO:6
  kind: action
  params: []
  command: "MSDTS+NEO:6\r"

- id: surround_mode_dts_neo_x_c
  label: Surround Mode DTS+NEO:X C
  kind: action
  params: []
  command: "MSDTS+NEO:X C\r"

- id: surround_mode_dts_neo_x_m
  label: Surround Mode DTS+NEO:X M
  kind: action
  params: []
  command: "MSDTS+NEO:X M\r"

- id: surround_mode_dts_neo_x_g
  label: Surround Mode DTS+NEO:X G
  kind: action
  params: []
  command: "MSDTS+NEO:X G\r"

- id: surround_mode_dts_hd
  label: Surround Mode DTS HD
  kind: action
  params: []
  command: "MSDTS HD\r"

- id: surround_mode_dts_hd_mstr
  label: Surround Mode DTS HD MSTR
  kind: action
  params: []
  command: "MSDTS HD MSTR\r"

- id: surround_mode_dts_hd_pl2x_c
  label: Surround Mode DTS HD+PL2X C
  kind: action
  params: []
  command: "MSDTS HD+PL2X C\r"

- id: surround_mode_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2X M
  kind: action
  params: []
  command: "MSDTS HD+PL2X M\r"

- id: surround_mode_dts_hd_pl2z_h
  label: Surround Mode DTS HD+PL2Z H
  kind: action
  params: []
  command: "MSDTS HD+PL2Z H\r"

- id: surround_mode_dts_hd_ds
  label: Surround Mode DTS HD+DS
  kind: action
  params: []
  command: "MSDTS HD+DS\r"

- id: surround_mode_dts_hd_neo6
  label: Surround Mode DTS HD+NEO:6
  kind: action
  params: []
  command: "MSDTS HD+NEO:6\r"

- id: surround_mode_dts_hd_neo_x_c
  label: Surround Mode DTS HD+NEO:X C
  kind: action
  params: []
  command: "MSDTS HD+NEO:X C\r"

- id: surround_mode_dts_hd_neo_x_m
  label: Surround Mode DTS HD+NEO:X M
  kind: action
  params: []
  command: "MSDTS HD+NEO:X M\r"

- id: surround_mode_dts_hd_neo_x_g
  label: Surround Mode DTS HD+NEO:X G
  kind: action
  params: []
  command: "MSDTS HD+NEO:X G\r"

- id: surround_mode_dts_express
  label: Surround Mode DTS EXPRESS
  kind: action
  params: []
  command: "MSDTS EXPRESS\r"

- id: surround_mode_dts_es_8ch_dscrt
  label: Surround Mode DTS ES 8CH DSCRT
  kind: action
  params: []
  command: "MSDTS ES 8CH DSCRT\r"

- id: surround_mode_dts_neo6_c
  label: Surround Mode DTS NEO:6 C
  kind: action
  params: []
  command: "MSDTS NEO:6 C\r"

- id: surround_mode_dts_neo6_m
  label: Surround Mode DTS NEO:6 M
  kind: action
  params: []
  command: "MSDTS NEO:6 M\r"

- id: surround_mode_dts_neo_x_c2
  label: Surround Mode DTS NEO:X C
  kind: action
  params: []
  command: "MSDTS NEO:X C\r"

- id: surround_mode_dts_neo_x_m2
  label: Surround Mode DTS NEO:X M
  kind: action
  params: []
  command: "MSDTS NEO:X M\r"

- id: surround_mode_dts_neo_x_g2
  label: Surround Mode DTS NEO:X G
  kind: action
  params: []
  command: "MSDTS NEO:X G\r"

- id: surround_mode_multi_ch_in
  label: Surround Mode MULTI CH IN
  kind: action
  params: []
  command: "MSMULTI CH IN\r"

- id: surround_mode_mch_in_dolby_ex
  label: Surround Mode M CH IN+DOLBY EX
  kind: action
  params: []
  command: "MSM CH IN+DOLBY EX\r"

- id: surround_mode_mch_in_pl2x_c
  label: Surround Mode M CH IN+PL2X C
  kind: action
  params: []
  command: "MSM CH IN+PL2X C\r"

- id: surround_mode_mch_in_pl2x_m
  label: Surround Mode M CH IN+PL2X M
  kind: action
  params: []
  command: "MSM CH IN+PL2X M\r"

- id: surround_mode_mch_in_pl2z_h
  label: Surround Mode M CH IN+PL2Z H
  kind: action
  params: []
  command: "MSM CH IN+PL2Z H\r"

- id: surround_mode_mch_in_ds
  label: Surround Mode M CH IN+DS
  kind: action
  params: []
  command: "MSM CH IN+DS\r"

- id: surround_mode_multi_ch_in_71
  label: Surround Mode MULTI CH IN 7.1
  kind: action
  params: []
  command: "MSMULTI CH IN 7.1\r"

- id: surround_mode_mch_in_neo_x_c
  label: Surround Mode M CH IN+NEO:X C
  kind: action
  params: []
  command: "MSM CH IN+NEO:X C\r"

- id: surround_mode_mch_in_neo_x_m
  label: Surround Mode M CH IN+NEO:X M
  kind: action
  params: []
  command: "MSM CH IN+NEO:X M\r"

- id: surround_mode_mch_in_neo_x_g
  label: Surround Mode M CH IN+NEO:X G
  kind: action
  params: []
  command: "MSM CH IN+NEO:X G\r"

- id: surround_mode_mpeg2_aac
  label: Surround Mode MPEG2 AAC
  kind: action
  params: []
  command: "MSMPEG2 AAC\r"

- id: surround_mode_aac_dolby_ex
  label: Surround Mode AAC+DOLBY EX
  kind: action
  params: []
  command: "MSAAC+DOLBY EX\r"

- id: surround_mode_aac_pl2x_c
  label: Surround Mode AAC+PL2X C
  kind: action
  params: []
  command: "MSAAC+PL2X C\r"

- id: surround_mode_aac_pl2x_m
  label: Surround Mode AAC+PL2X M
  kind: action
  params: []
  command: "MSAAC+PL2X M\r"

- id: surround_mode_aac_pl2z_h
  label: Surround Mode AAC+PL2Z H
  kind: action
  params: []
  command: "MSAAC+PL2Z H\r"

- id: surround_mode_aac_ds
  label: Surround Mode AAC+DS
  kind: action
  params: []
  command: "MSAAC+DS\r"

- id: surround_mode_aac_neo_x_c
  label: Surround Mode AAC+NEO:X C
  kind: action
  params: []
  command: "MSAAC+NEO:X C\r"

- id: surround_mode_aac_neo_x_m
  label: Surround Mode AAC+NEO:X M
  kind: action
  params: []
  command: "MSAAC+NEO:X M\r"

- id: surround_mode_aac_neo_x_g
  label: Surround Mode AAC+NEO:X G
  kind: action
  params: []
  command: "MSAAC+NEO:X G\r"

- id: surround_mode_pl_dsx
  label: Surround Mode PL DSX
  kind: action
  params: []
  command: "MSPL DSX\r"

- id: surround_mode_pl2_c_dsx
  label: Surround Mode PL2 C DSX
  kind: action
  params: []
  command: "MSPL2 C DSX\r"

- id: surround_mode_pl2_m_dsx
  label: Surround Mode PL2 M DSX
  kind: action
  params: []
  command: "MSPL2 M DSX\r"

- id: surround_mode_pl2_g_dsx
  label: Surround Mode PL2 G DSX
  kind: action
  params: []
  command: "MSPL2 G DSX\r"

- id: surround_mode_audyssey_dsx
  label: Surround Mode AUDYSSEY DSX
  kind: action
  params: []
  command: "MSAUDYSSEY DSX\r"

- id: surround_mode_auro3d
  label: Surround Mode AURO3D (Auro-3D Upgrade only)
  kind: action
  params: []
  command: "MSAURO3D\r"

- id: surround_mode_auro2dsurr
  label: Surround Mode AURO2DSURR
  kind: action
  params: []
  command: "MSAURO2DSURR\r"

- id: surround_mode_mch_stereo
  label: Surround Mode MCH STEREO
  kind: action
  params: []
  command: "MSMCH STEREO\r"

- id: surround_mode_wide_screen
  label: Surround Mode WIDE SCREEN
  kind: action
  params: []
  command: "MSWIDE SCREEN\r"

- id: surround_mode_super_stadium
  label: Surround Mode SUPER STADIUM
  kind: action
  params: []
  command: "MSSUPER STADIUM\r"

- id: surround_mode_rock_arena
  label: Surround Mode ROCK ARENA
  kind: action
  params: []
  command: "MSROCK ARENA\r"

- id: surround_mode_jazz_club
  label: Surround Mode JAZZ CLUB
  kind: action
  params: []
  command: "MSJAZZ CLUB\r"

- id: surround_mode_classic_concert
  label: Surround Mode CLASSIC CONCERT
  kind: action
  params: []
  command: "MSCLASSIC CONCERT\r"

- id: surround_mode_mono_movie
  label: Surround Mode MONO MOVIE
  kind: action
  params: []
  command: "MSMONO MOVIE\r"

- id: surround_mode_matrix
  label: Surround Mode MATRIX
  kind: action
  params: []
  command: "MSMATRIX\r"

- id: surround_mode_video_game
  label: Surround Mode VIDEO GAME
  kind: action
  params: []
  command: "MSVIDEO GAME\r"

- id: surround_mode_virtual
  label: Surround Mode VIRTUAL
  kind: action
  params: []
  command: "MSVIRTUAL\r"

- id: surround_mode_left
  label: Surround Mode LEFT
  kind: action
  params: []
  command: "MSLEFT\r"

- id: surround_mode_right
  label: Surround Mode RIGHT
  kind: action
  params: []
  command: "MSRIGHT\r"

- id: surround_mode_query
  label: Surround Mode Query
  kind: query
  params: []
  command: "MS?\r"

- id: surround_quick1
  label: Quick Select 1
  kind: action
  params: []
  command: "MSQUICK1\r"

- id: surround_quick2
  label: Quick Select 2
  kind: action
  params: []
  command: "MSQUICK2\r"

- id: surround_quick3
  label: Quick Select 3
  kind: action
  params: []
  command: "MSQUICK3\r"

- id: surround_quick4
  label: Quick Select 4
  kind: action
  params: []
  command: "MSQUICK4\r"

- id: surround_quick5
  label: Quick Select 5
  kind: action
  params: []
  command: "MSQUICK5\r"

- id: surround_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  params: []
  command: "MSQUICK1 MEMORY\r"

- id: surround_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  params: []
  command: "MSQUICK2 MEMORY\r"

- id: surround_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  params: []
  command: "MSQUICK3 MEMORY\r"

- id: surround_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  params: []
  command: "MSQUICK4 MEMORY\r"

- id: surround_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  params: []
  command: "MSQUICK5 MEMORY\r"

- id: surround_quick_query
  label: Quick Select Status Query
  kind: query
  params: []
  command: "MSQUICK ?\r"

- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  params: []
  command: "SLPOFF\r"

- id: sleep_timer_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120, e.g. 010=10min"
  command: "SLP{minutes}\r"

- id: sleep_timer_query
  label: Sleep Timer Query
  kind: query
  params: []
  command: "SLP?\r"

- id: auto_standby_15m
  label: Auto Standby 15 Minutes
  kind: action
  params: []
  command: "STBY15M\r"

- id: auto_standby_30m
  label: Auto Standby 30 Minutes
  kind: action
  params: []
  command: "STBY30M\r"

- id: auto_standby_60m
  label: Auto Standby 60 Minutes
  kind: action
  params: []
  command: "STBY60M\r"

- id: auto_standby_off
  label: Auto Standby Off
  kind: action
  params: []
  command: "STBYOFF\r"

- id: auto_standby_query
  label: Auto Standby Query
  kind: query
  params: []
  command: "STBY?\r"

- id: eco_on
  label: ECO Mode On
  kind: action
  params: []
  command: "ECOON\r"

- id: eco_auto
  label: ECO Mode Auto
  kind: action
  params: []
  command: "ECOAUTO\r"

- id: eco_off
  label: ECO Mode Off
  kind: action
  params: []
  command: "ECOOFF\r"

- id: eco_query
  label: ECO Mode Query
  kind: query
  params: []
  command: "ECO?\r"

- id: input_mode_auto
  label: Input Mode Auto
  kind: action
  params: []
  command: "SDAUTO\r"

- id: input_mode_hdmi
  label: Input Mode HDMI
  kind: action
  params: []
  command: "SDHDMI\r"

- id: input_mode_digital
  label: Input Mode Digital
  kind: action
  params: []
  command: "SDDIGITAL\r"

- id: input_mode_analog
  label: Input Mode Analog
  kind: action
  params: []
  command: "SDANALOG\r"

- id: input_mode_ext_in
  label: Input Mode EXT.IN
  kind: action
  params: []
  command: "SDEXT.IN\r"

- id: input_mode_71in
  label: Input Mode 7.1IN
  kind: action
  params: []
  command: "SD7.1IN\r"

- id: input_mode_no
  label: Input Mode NO
  kind: action
  params: []
  command: "SDNO\r"

- id: input_mode_query
  label: Input Mode Query
  kind: query
  params: []
  command: "SD?\r"

- id: digital_input_auto
  label: Digital Input Auto
  kind: action
  params: []
  command: "DCAUTO\r"

- id: digital_input_pcm
  label: Digital Input PCM
  kind: action
  params: []
  command: "DCPCM\r"

- id: digital_input_dts
  label: Digital Input DTS
  kind: action
  params: []
  command: "DCDTS\r"

- id: digital_input_query
  label: Digital Input Query
  kind: query
  params: []
  command: "DC?\r"

- id: video_select_dvd
  label: Video Select DVD
  kind: action
  params: []
  command: "SVDVD\r"

- id: video_select_bd
  label: Video Select BD
  kind: action
  params: []
  command: "SVBD\r"

- id: video_select_tv
  label: Video Select TV
  kind: action
  params: []
  command: "SVTV\r"

- id: video_select_sat_cbl
  label: Video Select SAT/CBL
  kind: action
  params: []
  command: "SVSAT/CBL\r"

- id: video_select_mplay
  label: Video Select MPLAY
  kind: action
  params: []
  command: "SVMPLAY\r"

- id: video_select_game
  label: Video Select GAME
  kind: action
  params: []
  command: "SVGAME\r"

- id: video_select_aux1
  label: Video Select AUX1
  kind: action
  params: []
  command: "SVAUX1\r"

- id: video_select_aux2
  label: Video Select AUX2
  kind: action
  params: []
  command: "SVAUX2\r"

- id: video_select_aux3
  label: Video Select AUX3
  kind: action
  params: []
  command: "SVAUX3\r"

- id: video_select_aux4
  label: Video Select AUX4
  kind: action
  params: []
  command: "SVAUX4\r"

- id: video_select_aux5
  label: Video Select AUX5
  kind: action
  params: []
  command: "SVAUX5\r"

- id: video_select_aux6
  label: Video Select AUX6
  kind: action
  params: []
  command: "SVAUX6\r"

- id: video_select_aux7
  label: Video Select AUX7
  kind: action
  params: []
  command: "SVAUX7\r"

- id: video_select_cd
  label: Video Select CD
  kind: action
  params: []
  command: "SVCD\r"

- id: video_select_source
  label: Video Select SOURCE (cancel)
  kind: action
  params: []
  command: "SVSOURCE\r"

- id: video_select_on
  label: Video Select ON
  kind: action
  params: []
  command: "SVON\r"

- id: video_select_off
  label: Video Select OFF
  kind: action
  params: []
  command: "SVOFF\r"

- id: video_select_query
  label: Video Select Query
  kind: query
  params: []
  command: "SV?\r"

- id: record_select_phono
  label: Record Select PHONO
  kind: action
  params: []
  command: "SRPHONO\r"

- id: record_select_cd
  label: Record Select CD
  kind: action
  params: []
  command: "SRCD\r"

- id: record_select_tuner
  label: Record Select TUNER
  kind: action
  params: []
  command: "SRTUNER\r"

- id: record_select_dvd
  label: Record Select DVD
  kind: action
  params: []
  command: "SRDVD\r"

- id: record_select_bd
  label: Record Select BD
  kind: action
  params: []
  command: "SRBD\r"

- id: record_select_tv
  label: Record Select TV
  kind: action
  params: []
  command: "SRTV\r"

- id: record_select_sat_cbl
  label: Record Select SAT/CBL
  kind: action
  params: []
  command: "SRSAT/CBL\r"

- id: record_select_mplay
  label: Record Select MPLAY
  kind: action
  params: []
  command: "SRMPLAY\r"

- id: record_select_game
  label: Record Select GAME
  kind: action
  params: []
  command: "SRGAME\r"

- id: record_select_aux1
  label: Record Select AUX1
  kind: action
  params: []
  command: "SRAUX1\r"

- id: record_select_aux2
  label: Record Select AUX2
  kind: action
  params: []
  command: "SRAUX2\r"

- id: record_select_net
  label: Record Select NET
  kind: action
  params: []
  command: "SRNET\r"

- id: record_select_source
  label: Record Select SOURCE (cancel)
  kind: action
  params: []
  command: "SRSOURCE\r"

- id: record_select_query
  label: Record Select Query
  kind: query
  params: []
  command: "SR?\r"

- id: tone_ctrl_on
  label: Tone Control On
  kind: action
  params: []
  command: "PSTONE CTRL ON\r"

- id: tone_ctrl_off
  label: Tone Control Off
  kind: action
  params: []
  command: "PSTONE CTRL OFF\r"

- id: tone_ctrl_query
  label: Tone Control Query
  kind: query
  params: []
  command: "PSTONE CTRL ?\r"

- id: bass_up
  label: Bass Up
  kind: action
  params: []
  command: "PSBAS UP\r"

- id: bass_down
  label: Bass Down
  kind: action
  params: []
  command: "PSBAS DOWN\r"

- id: bass_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB; AVR range 44-56 (-6 to +6)"
  command: "PSBAS {level}\r"

- id: bass_query
  label: Bass Query
  kind: query
  params: []
  command: "PSBAS ?\r"

- id: treble_up
  label: Treble Up
  kind: action
  params: []
  command: "PSTRE UP\r"

- id: treble_down
  label: Treble Down
  kind: action
  params: []
  command: "PSTRE DOWN\r"

- id: treble_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB; AVR range 44-56 (-6 to +6)"
  command: "PSTRE {level}\r"

- id: treble_query
  label: Treble Query
  kind: query
  params: []
  command: "PSTRE ?\r"

# --- PS sub-commands (pass 2) ---

- id: ps_dil_on
  label: Dialog Level Adjust On
  kind: action
  params: []
  command: "PSDIL ON\r"

- id: ps_dil_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
  command: "PSDIL OFF\r"

- id: ps_dil_up
  label: Dialog Level Up
  kind: action
  params: []
  command: "PSDIL UP\r"

- id: ps_dil_down
  label: Dialog Level Down
  kind: action
  params: []
  command: "PSDIL DOWN\r"

- id: ps_dil_set
  label: Dialog Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62, 50=0dB"
  command: "PSDIL {level}\r"

- id: ps_dil_query
  label: Dialog Level Query
  kind: query
  params: []
  command: "PSDIL ?\r"

- id: ps_swl_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
  command: "PSSWL ON\r"

- id: ps_swl_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
  command: "PSSWL OFF\r"

- id: ps_swl_up
  label: Subwoofer Level Up
  kind: action
  params: []
  command: "PSSWL UP\r"

- id: ps_swl_down
  label: Subwoofer Level Down
  kind: action
  params: []
  command: "PSSWL DOWN\r"

- id: ps_swl_set
  label: Subwoofer Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62, 50=0dB"
  command: "PSSWL {level}\r"

- id: ps_swl2_up
  label: Subwoofer 2 Level Up
  kind: action
  params: []
  command: "PSSWL2 UP\r"

- id: ps_swl2_down
  label: Subwoofer 2 Level Down
  kind: action
  params: []
  command: "PSSWL2 DOWN\r"

- id: ps_swl2_set
  label: Subwoofer 2 Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00,38-62, 50=0dB"
  command: "PSSWL2 {level}\r"

- id: ps_swl_query
  label: Subwoofer Level Query
  kind: query
  params: []
  command: "PSSWL ?\r"

- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
  command: "PSCINEMA EQ.ON\r"

- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
  command: "PSCINEMA EQ.OFF\r"

- id: ps_cinema_eq_query
  label: Cinema EQ Query
  kind: query
  params: []
  command: "PSCINEMA EQ. ?\r"

- id: ps_mode_music
  label: PS Mode Music
  kind: action
  params: []
  command: "PSMODE:MUSIC\r"

- id: ps_mode_cinema
  label: PS Mode Cinema
  kind: action
  params: []
  command: "PSMODE:CINEMA\r"

- id: ps_mode_game
  label: PS Mode Game
  kind: action
  params: []
  command: "PSMODE:GAME\r"

- id: ps_mode_pro_logic
  label: PS Mode Pro Logic
  kind: action
  params: []
  command: "PSMODE:PRO LOGIC\r"

- id: ps_mode_query
  label: PS Mode Query
  kind: query
  params: []
  command: "PSMODE: ?\r"

- id: ps_lom_on
  label: Loudness Management On
  kind: action
  params: []
  command: "PSLOM ON\r"

- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  params: []
  command: "PSLOM OFF\r"

- id: ps_lom_query
  label: Loudness Management Query
  kind: query
  params: []
  command: "PSLOM ?\r"

- id: ps_fh_on
  label: Front Height Output On
  kind: action
  params: []
  command: "PSFH:ON\r"

- id: ps_fh_off
  label: Front Height Output Off
  kind: action
  params: []
  command: "PSFH:OFF\r"

- id: ps_fh_query
  label: Front Height Output Query
  kind: query
  params: []
  command: "PSFH: ?\r"

- id: ps_sp_fw
  label: Speaker Output Front Wide
  kind: action
  params: []
  command: "PSSP:FW\r"

- id: ps_sp_fh
  label: Speaker Output Front Height
  kind: action
  params: []
  command: "PSSP:FH\r"

- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  params: []
  command: "PSSP:SB\r"

- id: ps_sp_hw
  label: Speaker Output Height & Wide
  kind: action
  params: []
  command: "PSSP:HW\r"

- id: ps_sp_bh
  label: Speaker Output Surround Back & Front Height
  kind: action
  params: []
  command: "PSSP:BH\r"

- id: ps_sp_bw
  label: Speaker Output Surround Back & Front Wide
  kind: action
  params: []
  command: "PSSP:BW\r"

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  params: []
  command: "PSSP:FL\r"

- id: ps_sp_hf
  label: Speaker Output Height & Floor
  kind: action
  params: []
  command: "PSSP:HF\r"

- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  params: []
  command: "PSSP:FR\r"

- id: ps_sp_query
  label: Speaker Output Query
  kind: query
  params: []
  command: "PSSP: ?\r"

- id: ps_phg_low
  label: PL2z Height Gain Low
  kind: action
  params: []
  command: "PSPHG LOW\r"

- id: ps_phg_mid
  label: PL2z Height Gain Mid
  kind: action
  params: []
  command: "PSPHG MID\r"

- id: ps_phg_hi
  label: PL2z Height Gain High
  kind: action
  params: []
  command: "PSPHG HI\r"

- id: ps_phg_query
  label: PL2z Height Gain Query
  kind: query
  params: []
  command: "PSPHG ?\r"

- id: ps_multeq_audyssey
  label: MultEQ Audyssey (Reference)
  kind: action
  params: []
  command: "PSMULTEQ:AUDYSSEY\r"

- id: ps_multeq_byp_lr
  label: MultEQ Bypass L/R
  kind: action
  params: []
  command: "PSMULTEQ:BYP.LR\r"

- id: ps_multeq_flat
  label: MultEQ Flat
  kind: action
  params: []
  command: "PSMULTEQ:FLAT\r"

- id: ps_multeq_manual
  label: MultEQ Manual
  kind: action
  params: []
  command: "PSMULTEQ:MANUAL\r"

- id: ps_multeq_off
  label: MultEQ Off
  kind: action
  params: []
  command: "PSMULTEQ:OFF\r"

- id: ps_multeq_query
  label: MultEQ Query
  kind: query
  params: []
  command: "PSMULTEQ: ?\r"

- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  params: []
  command: "PSDYNEQ ON\r"

- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  params: []
  command: "PSDYNEQ OFF\r"

- id: ps_dyneq_query
  label: Dynamic EQ Query
  kind: query
  params: []
  command: "PSDYNEQ ?\r"

- id: ps_reflev_0
  label: Reference Level Offset 0dB
  kind: action
  params: []
  command: "PSREFLEV 0\r"

- id: ps_reflev_5
  label: Reference Level Offset 5dB
  kind: action
  params: []
  command: "PSREFLEV 5\r"

- id: ps_reflev_10
  label: Reference Level Offset 10dB
  kind: action
  params: []
  command: "PSREFLEV 10\r"

- id: ps_reflev_15
  label: Reference Level Offset 15dB
  kind: action
  params: []
  command: "PSREFLEV 15\r"

- id: ps_reflev_query
  label: Reference Level Offset Query
  kind: query
  params: []
  command: "PSREFLEV ?\r"

- id: ps_dynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  params: []
  command: "PSDYNVOL HEV\r"

- id: ps_dynvol_med
  label: Dynamic Volume Medium
  kind: action
  params: []
  command: "PSDYNVOL MED\r"

- id: ps_dynvol_lit
  label: Dynamic Volume Light
  kind: action
  params: []
  command: "PSDYNVOL LIT\r"

- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  params: []
  command: "PSDYNVOL OFF\r"

- id: ps_dynvol_query
  label: Dynamic Volume Query
  kind: query
  params: []
  command: "PSDYNVOL ?\r"

- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
  command: "PSLFC ON\r"

- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
  command: "PSLFC OFF\r"

- id: ps_lfc_query
  label: Audyssey LFC Query
  kind: query
  params: []
  command: "PSLFC ?\r"

- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  params: []
  command: "PSCNTAMT UP\r"

- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  params: []
  command: "PSCNTAMT DOWN\r"

- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 01-07"
  command: "PSCNTAMT {level}\r"

- id: ps_cntamt_query
  label: Containment Amount Query
  kind: query
  params: []
  command: "PSCNTAMT ?\r"

- id: ps_dsx_onhw
  label: Audyssey DSX On (Height and Wide)
  kind: action
  params: []
  command: "PSDSX ONHW\r"

- id: ps_dsx_onh
  label: Audyssey DSX On (Height)
  kind: action
  params: []
  command: "PSDSX ONH\r"

- id: ps_dsx_onw
  label: Audyssey DSX On (Width)
  kind: action
  params: []
  command: "PSDSX ONW\r"

- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  params: []
  command: "PSDSX OFF\r"

- id: ps_dsx_query
  label: Audyssey DSX Query
  kind: query
  params: []
  command: "PSDSX ?\r"

- id: ps_stw_up
  label: Stage Width Up
  kind: action
  params: []
  command: "PSSTW UP\r"

- id: ps_stw_down
  label: Stage Width Down
  kind: action
  params: []
  command: "PSSTW DOWN\r"

- id: ps_stw_set
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB; AVR range 40-60"
  command: "PSSTW {level}\r"

- id: ps_stw_query
  label: Stage Width Query
  kind: query
  params: []
  command: "PSSTW ?\r"

- id: ps_sth_up
  label: Stage Height Up
  kind: action
  params: []
  command: "PSSTH UP\r"

- id: ps_sth_down
  label: Stage Height Down
  kind: action
  params: []
  command: "PSSTH DOWN\r"

- id: ps_sth_set
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99, 50=0dB; AVR range 40-60"
  command: "PSSTH {level}\r"

- id: ps_sth_query
  label: Stage Height Query
  kind: query
  params: []
  command: "PSSTH ?\r"

- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  params: []
  command: "PSGEQ ON\r"

- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  params: []
  command: "PSGEQ OFF\r"

- id: ps_geq_query
  label: Graphic EQ Query
  kind: query
  params: []
  command: "PSGEQ ?\r"

- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  params: []
  command: "PSDRC AUTO\r"

- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  params: []
  command: "PSDRC LOW\r"

- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  params: []
  command: "PSDRC MID\r"

- id: ps_drc_hi
  label: Dynamic Compression High
  kind: action
  params: []
  command: "PSDRC HI\r"

- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  params: []
  command: "PSDRC OFF\r"

- id: ps_drc_query
  label: Dynamic Compression Query
  kind: query
  params: []
  command: "PSDRC ?\r"

- id: ps_bsc_up
  label: Bass Sync Up
  kind: action
  params: []
  command: "PSBSC UP\r"

- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  params: []
  command: "PSBSC DOWN\r"

- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 0-16"
  command: "PSBSC {level}\r"

- id: ps_bsc_query
  label: Bass Sync Query
  kind: query
  params: []
  command: "PSBSC ?\r"

- id: ps_deh_off
  label: Dialogue Enhancer Off
  kind: action
  params: []
  command: "PSDEH OFF\r"

- id: ps_deh_low
  label: Dialogue Enhancer Low
  kind: action
  params: []
  command: "PSDEH LOW\r"

- id: ps_deh_med
  label: Dialogue Enhancer Medium
  kind: action
  params: []
  command: "PSDEH MED\r"

- id: ps_deh_high
  label: Dialogue Enhancer High
  kind: action
  params: []
  command: "PSDEH HIGH\r"

- id: ps_deh_query
  label: Dialogue Enhancer Query
  kind: query
  params: []
  command: "PSDEH ?\r"

- id: ps_lfe_up
  label: LFE Level Up
  kind: action
  params: []
  command: "PSLFE UP\r"

- id: ps_lfe_down
  label: LFE Level Down
  kind: action
  params: []
  command: "PSLFE DOWN\r"

- id: ps_lfe_set
  label: LFE Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; 00=0dB, 10=-10dB; AVR range 0 to -10"
  command: "PSLFE {level}\r"

- id: ps_lfe_query
  label: LFE Level Query
  kind: query
  params: []
  command: "PSLFE ?\r"

- id: ps_lfl_00
  label: LFE Level (EXT.IN/7.1CH IN) 0
  kind: action
  params: []
  command: "PSLFL 00\r"

- id: ps_lfl_05
  label: LFE Level (EXT.IN/7.1CH IN) 5
  kind: action
  params: []
  command: "PSLFL 05\r"

- id: ps_lfl_10
  label: LFE Level (EXT.IN/7.1CH IN) 10
  kind: action
  params: []
  command: "PSLFL 10\r"

- id: ps_lfl_15
  label: LFE Level (EXT.IN/7.1CH IN) 15
  kind: action
  params: []
  command: "PSLFL 15\r"

- id: ps_lfl_query
  label: LFE Level (EXT.IN) Query
  kind: query
  params: []
  command: "PSLFL ?\r"

- id: ps_eff_on
  label: Effect On
  kind: action
  params: []
  command: "PSEFF ON\r"

- id: ps_eff_off
  label: Effect Off
  kind: action
  params: []
  command: "PSEFF OFF\r"

- id: ps_eff_up
  label: Effect Level Up
  kind: action
  params: []
  command: "PSEFF UP\r"

- id: ps_eff_down
  label: Effect Level Down
  kind: action
  params: []
  command: "PSEFF DOWN\r"

- id: ps_eff_set
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 1-15"
  command: "PSEFF {level}\r"

- id: ps_eff_query
  label: Effect Level Query
  kind: query
  params: []
  command: "PSEFF ?\r"

- id: ps_del_up
  label: Delay Up
  kind: action
  params: []
  command: "PSDEL UP\r"

- id: ps_del_down
  label: Delay Down
  kind: action
  params: []
  command: "PSDEL DOWN\r"

- id: ps_del_set
  label: Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ms; AVR range 0-300"
  command: "PSDEL {ms}\r"

- id: ps_del_query
  label: Delay Query
  kind: query
  params: []
  command: "PSDEL ?\r"

- id: ps_pan_on
  label: Panorama On
  kind: action
  params: []
  command: "PSPAN ON\r"

- id: ps_pan_off
  label: Panorama Off
  kind: action
  params: []
  command: "PSPAN OFF\r"

- id: ps_pan_query
  label: Panorama Query
  kind: query
  params: []
  command: "PSPAN ?\r"

- id: ps_dim_up
  label: Dimension Up
  kind: action
  params: []
  command: "PSDIM UP\r"

- id: ps_dim_down
  label: Dimension Down
  kind: action
  params: []
  command: "PSDIM DOWN\r"

- id: ps_dim_set
  label: Dimension Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 0-6"
  command: "PSDIM {level}\r"

- id: ps_dim_query
  label: Dimension Query
  kind: query
  params: []
  command: "PSDIM ?\r"

- id: ps_cen_up
  label: Center Width Up
  kind: action
  params: []
  command: "PSCEN UP\r"

- id: ps_cen_down
  label: Center Width Down
  kind: action
  params: []
  command: "PSCEN DOWN\r"

- id: ps_cen_set
  label: Center Width Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 0-7"
  command: "PSCEN {level}\r"

- id: ps_cen_query
  label: Center Width Query
  kind: query
  params: []
  command: "PSCEN ?\r"

- id: ps_cei_up
  label: Center Image Up
  kind: action
  params: []
  command: "PSCEI UP\r"

- id: ps_cei_down
  label: Center Image Down
  kind: action
  params: []
  command: "PSCEI DOWN\r"

- id: ps_cei_set
  label: Center Image Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range 0.0-1.0"
  command: "PSCEI {level}\r"

- id: ps_cei_query
  label: Center Image Query
  kind: query
  params: []
  command: "PSCEI ?\r"

- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  params: []
  command: "PSCEG UP\r"

- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  params: []
  command: "PSCEG DOWN\r"

- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range 0.0-1.0"
  command: "PSCEG {level}\r"

- id: ps_ceg_query
  label: Center Gain Query
  kind: query
  params: []
  command: "PSCEG ?\r"

- id: ps_ces_on
  label: Center Spread On
  kind: action
  params: []
  command: "PSCES ON\r"

- id: ps_ces_off
  label: Center Spread Off
  kind: action
  params: []
  command: "PSCES OFF\r"

- id: ps_ces_query
  label: Center Spread Query
  kind: query
  params: []
  command: "PSCES ?\r"

- id: ps_swr_on
  label: Subwoofer Output On (DIRECT/STEREO mode)
  kind: action
  params: []
  command: "PSSWR ON\r"

- id: ps_swr_off
  label: Subwoofer Output Off (DIRECT/STEREO mode)
  kind: action
  params: []
  command: "PSSWR OFF\r"

- id: ps_swr_query
  label: Subwoofer Output Query
  kind: query
  params: []
  command: "PSSWR ?\r"

- id: ps_rsz_s
  label: Room Size Small
  kind: action
  params: []
  command: "PSRSZ S\r"

- id: ps_rsz_ms
  label: Room Size Medium-Small
  kind: action
  params: []
  command: "PSRSZ MS\r"

- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  params: []
  command: "PSRSZ M\r"

- id: ps_rsz_ml
  label: Room Size Medium-Large
  kind: action
  params: []
  command: "PSRSZ ML\r"

- id: ps_rsz_l
  label: Room Size Large
  kind: action
  params: []
  command: "PSRSZ L\r"

- id: ps_rsz_query
  label: Room Size Query
  kind: query
  params: []
  command: "PSRSZ ?\r"

- id: ps_delay_up
  label: Audio Delay Up
  kind: action
  params: []
  command: "PSDELAY UP\r"

- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  params: []
  command: "PSDELAY DOWN\r"

- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: "000-999 ms; AVR range 0-200"
  command: "PSDELAY {ms}\r"

- id: ps_delay_query
  label: Audio Delay Query
  kind: query
  params: []
  command: "PSDELAY ?\r"

- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  params: []
  command: "PSRSTR OFF\r"

- id: ps_rstr_low
  label: Audio Restorer Low (Mode 3)
  kind: action
  params: []
  command: "PSRSTR LOW\r"

- id: ps_rstr_med
  label: Audio Restorer Medium (Mode 2)
  kind: action
  params: []
  command: "PSRSTR MED\r"

- id: ps_rstr_hi
  label: Audio Restorer High (Mode 1)
  kind: action
  params: []
  command: "PSRSTR HI\r"

- id: ps_rstr_query
  label: Audio Restorer Query
  kind: query
  params: []
  command: "PSRSTR ?\r"

- id: ps_front_spa
  label: Front Speaker A
  kind: action
  params: []
  command: "PSFRONT SPA\r"

- id: ps_front_spb
  label: Front Speaker B
  kind: action
  params: []
  command: "PSFRONT SPB\r"

- id: ps_front_apb
  label: Front Speaker A+B
  kind: action
  params: []
  command: "PSFRONT A+B\r"

- id: ps_front_query
  label: Front Speaker Query
  kind: query
  params: []
  command: "PSFRONT?\r"

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  params: []
  command: "PSAUROPR SMA\r"

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  params: []
  command: "PSAUROPR MED\r"

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  params: []
  command: "PSAUROPR LAR\r"

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Speech
  kind: action
  params: []
  command: "PSAUROPR SPE\r"

- id: ps_auropr_query
  label: Auro-Matic 3D Preset Query
  kind: query
  params: []
  command: "PSAUROPR ?\r"

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
  command: "PSAUROST UP\r"

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
  command: "PSAUROST DOWN\r"

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; AVR range 1-16"
  command: "PSAUROST {level}\r"

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Query
  kind: query
  params: []
  command: "PSAUROST ?\r"

# --- PV picture mode ---

- id: pv_off
  label: Picture Mode Off
  kind: action
  params: []
  command: "PVOFF\r"

- id: pv_std
  label: Picture Mode Standard
  kind: action
  params: []
  command: "PVSTD\r"

- id: pv_mov
  label: Picture Mode Movie
  kind: action
  params: []
  command: "PVMOV\r"

- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  params: []
  command: "PVVVD\r"

- id: pv_stm
  label: Picture Mode Stream
  kind: action
  params: []
  command: "PVSTM\r"

- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  params: []
  command: "PVCTM\r"

- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  params: []
  command: "PVDAY\r"

- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  params: []
  command: "PVNGT\r"

- id: pv_query
  label: Picture Mode Query
  kind: query
  params: []
  command: "PV?\r"

- id: pvcn_up
  label: Contrast Up
  kind: action
  params: []
  command: "PVCN UP\r"

- id: pvcn_down
  label: Contrast Down
  kind: action
  params: []
  command: "PVCN DOWN\r"

- id: pvcn_set
  label: Contrast Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100; 050=0; range -50 to +50"
  command: "PVCN {level}\r"

- id: pvcn_query
  label: Contrast Query
  kind: query
  params: []
  command: "PVCN ?\r"

- id: pvbr_up
  label: Brightness Up
  kind: action
  params: []
  command: "PVBR UP\r"

- id: pvbr_down
  label: Brightness Down
  kind: action
  params: []
  command: "PVBR DOWN\r"

- id: pvbr_set
  label: Brightness Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100; 050=0; range -50 to +50"
  command: "PVBR {level}\r"

- id: pvbr_query
  label: Brightness Query
  kind: query
  params: []
  command: "PVBR ?\r"

- id: pvst_up
  label: Saturation Up
  kind: action
  params: []
  command: "PVST UP\r"

- id: pvst_down
  label: Saturation Down
  kind: action
  params: []
  command: "PVST DOWN\r"

- id: pvst_set
  label: Saturation Set
  kind: action
  params:
    - name: level
      type: string
      description: "000-100; 050=0; range -50 to +50"
  command: "PVST {level}\r"

- id: pvst_query
  label: Saturation Query
  kind: query
  params: []
  command: "PVST ?\r"

- id: pvhue_up
  label: Hue Up
  kind: action
  params: []
  command: "PVHUE UP\r"

- id: pvhue_down
  label: Hue Down
  kind: action
  params: []
  command: "PVHUE DOWN\r"

- id: pvhue_set
  label: Hue Set
  kind: action
  params:
    - name: level
      type: string
      description: "44-56; 50=0; range -6 to +6"
  command: "PVHUE {level}\r"

- id: pvhue_query
  label: Hue Query
  kind: query
  params: []
  command: "PVHUE ?\r"

- id: pvdnr_off
  label: DNR Off
  kind: action
  params: []
  command: "PVDNR OFF\r"

- id: pvdnr_low
  label: DNR Low
  kind: action
  params: []
  command: "PVDNR LOW\r"

- id: pvdnr_mid
  label: DNR Mid
  kind: action
  params: []
  command: "PVDNR MID\r"

- id: pvdnr_hi
  label: DNR High
  kind: action
  params: []
  command: "PVDNR HI\r"

- id: pvdnr_query
  label: DNR Query
  kind: query
  params: []
  command: "PVDNR ?\r"

- id: pvenh_up
  label: Enhancer Up
  kind: action
  params: []
  command: "PVENH UP\r"

- id: pvenh_down
  label: Enhancer Down
  kind: action
  params: []
  command: "PVENH DOWN\r"

- id: pvenh_set
  label: Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-12"
  command: "PVENH {level}\r"

- id: pvenh_query
  label: Enhancer Query
  kind: query
  params: []
  command: "PVENH ?\r"

# --- VS (video scaling / signal) ---

- id: vs_asp_nrm
  label: Aspect Ratio 4:3
  kind: action
  params: []
  command: "VSASPNRM\r"

- id: vs_asp_ful
  label: Aspect Ratio 16:9
  kind: action
  params: []
  command: "VSASPFUL\r"

- id: vs_asp_query
  label: Aspect Ratio Query
  kind: query
  params: []
  command: "VSASP ?\r"

- id: vs_moni_auto
  label: HDMI Monitor Auto
  kind: action
  params: []
  command: "VSMONIAUTO\r"

- id: vs_moni1
  label: HDMI Monitor Out 1
  kind: action
  params: []
  command: "VSMONI1\r"

- id: vs_moni2
  label: HDMI Monitor Out 2
  kind: action
  params: []
  command: "VSMONI2\r"

- id: vs_moni_query
  label: HDMI Monitor Query
  kind: query
  params: []
  command: "VSMONI ?\r"

- id: vs_sc_48p
  label: Resolution 480p/576p
  kind: action
  params: []
  command: "VSSC48P\r"

- id: vs_sc_10i
  label: Resolution 1080i
  kind: action
  params: []
  command: "VSSC10I\r"

- id: vs_sc_72p
  label: Resolution 720p
  kind: action
  params: []
  command: "VSSC72P\r"

- id: vs_sc_10p
  label: Resolution 1080p
  kind: action
  params: []
  command: "VSSC10P\r"

- id: vs_sc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  params: []
  command: "VSSC10P24\r"

- id: vs_sc_4k
  label: Resolution 4K
  kind: action
  params: []
  command: "VSSC4K\r"

- id: vs_sc_4kf
  label: Resolution 4K 60/50Hz
  kind: action
  params: []
  command: "VSSC4KF\r"

- id: vs_sc_auto
  label: Resolution Auto
  kind: action
  params: []
  command: "VSSCAUTO\r"

- id: vs_sc_query
  label: Resolution Query
  kind: query
  params: []
  command: "VSSC ?\r"

- id: vs_sch_48p
  label: Resolution HDMI 480p/576p
  kind: action
  params: []
  command: "VSSCH48P\r"

- id: vs_sch_10i
  label: Resolution HDMI 1080i
  kind: action
  params: []
  command: "VSSCH10I\r"

- id: vs_sch_72p
  label: Resolution HDMI 720p
  kind: action
  params: []
  command: "VSSCH72P\r"

- id: vs_sch_10p
  label: Resolution HDMI 1080p
  kind: action
  params: []
  command: "VSSCH10P\r"

- id: vs_sch_10p24
  label: Resolution HDMI 1080p 24Hz
  kind: action
  params: []
  command: "VSSCH10P24\r"

- id: vs_sch_4k
  label: Resolution HDMI 4K
  kind: action
  params: []
  command: "VSSCH4K\r"

- id: vs_sch_4kf
  label: Resolution HDMI 4K 60/50Hz
  kind: action
  params: []
  command: "VSSCH4KF\r"

- id: vs_sch_auto
  label: Resolution HDMI Auto
  kind: action
  params: []
  command: "VSSCHAUTO\r"

- id: vs_sch_query
  label: Resolution HDMI Query
  kind: query
  params: []
  command: "VSSCH ?\r"

- id: vs_audio_amp
  label: HDMI Audio Output to AMP
  kind: action
  params: []
  command: "VSAUDIO AMP\r"

- id: vs_audio_tv
  label: HDMI Audio Output to TV
  kind: action
  params: []
  command: "VSAUDIO TV\r"

- id: vs_audio_query
  label: HDMI Audio Output Query
  kind: query
  params: []
  command: "VSAUDIO ?\r"

- id: vs_vpm_auto
  label: Video Processing Mode Auto
  kind: action
  params: []
  command: "VSVPMAUTO\r"

- id: vs_vpm_game
  label: Video Processing Mode Game
  kind: action
  params: []
  command: "VSVPMGAME\r"

- id: vs_vpm_movi
  label: Video Processing Mode Movie
  kind: action
  params: []
  command: "VSVPMMOVI\r"

- id: vs_vpm_query
  label: Video Processing Mode Query
  kind: query
  params: []
  command: "VSVPM ?\r"

- id: vs_vst_on
  label: Vertical Stretch On
  kind: action
  params: []
  command: "VSVST ON\r"

- id: vs_vst_off
  label: Vertical Stretch Off
  kind: action
  params: []
  command: "VSVST OFF\r"

- id: vs_vst_query
  label: Vertical Stretch Query
  kind: query
  params: []
  command: "VSVST ?\r"

# --- Zone 2 ---

- id: z2_source
  label: Zone 2 Source (follow main zone)
  kind: action
  params: []
  command: "Z2SOURCE\r"

- id: z2_phono
  label: Zone 2 Input PHONO
  kind: action
  params: []
  command: "Z2PHONO\r"

- id: z2_cd
  label: Zone 2 Input CD
  kind: action
  params: []
  command: "Z2CD\r"

- id: z2_tuner
  label: Zone 2 Input TUNER
  kind: action
  params: []
  command: "Z2TUNER\r"

- id: z2_dvd
  label: Zone 2 Input DVD
  kind: action
  params: []
  command: "Z2DVD\r"

- id: z2_bd
  label: Zone 2 Input BD
  kind: action
  params: []
  command: "Z2BD\r"

- id: z2_tv
  label: Zone 2 Input TV
  kind: action
  params: []
  command: "Z2TV\r"

- id: z2_sat_cbl
  label: Zone 2 Input SAT/CBL
  kind: action
  params: []
  command: "Z2SAT/CBL\r"

- id: z2_mplay
  label: Zone 2 Input MPLAY
  kind: action
  params: []
  command: "Z2MPLAY\r"

- id: z2_game
  label: Zone 2 Input GAME
  kind: action
  params: []
  command: "Z2GAME\r"

- id: z2_net
  label: Zone 2 Input NET
  kind: action
  params: []
  command: "Z2NET\r"

- id: z2_pandora
  label: Zone 2 Input PANDORA
  kind: action
  params: []
  command: "Z2PANDORA\r"

- id: z2_siriusxm
  label: Zone 2 Input SIRIUSXM
  kind: action
  params: []
  command: "Z2SIRIUSXM\r"

- id: z2_spotify
  label: Zone 2 Input SPOTIFY
  kind: action
  params: []
  command: "Z2SPOTIFY\r"

- id: z2_iradio
  label: Zone 2 Input IRADIO
  kind: action
  params: []
  command: "Z2IRADIO\r"

- id: z2_server
  label: Zone 2 Input SERVER
  kind: action
  params: []
  command: "Z2SERVER\r"

- id: z2_favorites
  label: Zone 2 Input FAVORITES
  kind: action
  params: []
  command: "Z2FAVORITES\r"

- id: z2_aux1
  label: Zone 2 Input AUX1
  kind: action
  params: []
  command: "Z2AUX1\r"

- id: z2_aux2
  label: Zone 2 Input AUX2
  kind: action
  params: []
  command: "Z2AUX2\r"

- id: z2_bt
  label: Zone 2 Input Bluetooth
  kind: action
  params: []
  command: "Z2BT\r"

- id: z2_usb
  label: Zone 2 Input USB
  kind: action
  params: []
  command: "Z2USB\r"

- id: z2_quick1
  label: Zone 2 Quick Select 1
  kind: action
  params: []
  command: "Z2QUICK1\r"

- id: z2_quick2
  label: Zone 2 Quick Select 2
  kind: action
  params: []
  command: "Z2QUICK2\r"

- id: z2_quick3
  label: Zone 2 Quick Select 3
  kind: action
  params: []
  command: "Z2QUICK3\r"

- id: z2_quick4
  label: Zone 2 Quick Select 4
  kind: action
  params: []
  command: "Z2QUICK4\r"

- id: z2_quick5
  label: Zone 2 Quick Select 5
  kind: action
  params: []
  command: "Z2QUICK5\r"

- id: z2_quick1_memory
  label: Zone 2 Quick Select 1 Memory
  kind: action
  params: []
  command: "Z2QUICK1 MEMORY\r"

- id: z2_quick2_memory
  label: Zone 2 Quick Select 2 Memory
  kind: action
  params: []
  command: "Z2QUICK2 MEMORY\r"

- id: z2_quick3_memory
  label: Zone 2 Quick Select 3 Memory
  kind: action
  params: []
  command: "Z2QUICK3 MEMORY\r"

- id: z2_quick4_memory
  label: Zone 2 Quick Select 4 Memory
  kind: action
  params: []
  command: "Z2QUICK4 MEMORY\r"

- id: z2_quick5_memory
  label: Zone 2 Quick Select 5 Memory
  kind: action
  params: []
  command: "Z2QUICK5 MEMORY\r"

- id: z2_quick_query
  label: Zone 2 Quick Select Query
  kind: query
  params: []
  command: "Z2QUICK ?\r"

- id: z2_favorite1
  label: Zone 2 Favorite 1
  kind: action
  params: []
  command: "Z2FAVORITE1\r"

- id: z2_favorite2
  label: Zone 2 Favorite 2
  kind: action
  params: []
  command: "Z2FAVORITE2\r"

- id: z2_favorite3
  label: Zone 2 Favorite 3
  kind: action
  params: []
  command: "Z2FAVORITE3\r"

- id: z2_favorite4
  label: Zone 2 Favorite 4
  kind: action
  params: []
  command: "Z2FAVORITE4\r"

- id: z2_favorite1_memory
  label: Zone 2 Favorite 1 Memory
  kind: action
  params: []
  command: "Z2FAVORITE1 MEMORY\r"

- id: z2_favorite2_memory
  label: Zone 2 Favorite 2 Memory
  kind: action
  params: []
  command: "Z2FAVORITE2 MEMORY\r"

- id: z2_favorite3_memory
  label: Zone 2 Favorite 3 Memory
  kind: action
  params: []
  command: "Z2FAVORITE3 MEMORY\r"

- id: z2_favorite4_memory
  label: Zone 2 Favorite 4 Memory
  kind: action
  params: []
  command: "Z2FAVORITE4 MEMORY\r"

- id: z2_vol_up
  label: Zone 2 Volume Up
  kind: action
  params: []
  command: "Z2UP\r"

- id: z2_vol_down
  label: Zone 2 Volume Down
  kind: action
  params: []
  command: "Z2DOWN\r"

- id: z2_vol_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98; 80=0dB"
  command: "Z2{level}\r"

- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
  command: "Z2ON\r"

- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
  command: "Z2OFF\r"

- id: z2_query
  label: Zone 2 Status Query
  kind: query
  params: []
  command: "Z2?\r"

- id: z2_mu_on
  label: Zone 2 Mute On
  kind: action
  params: []
  command: "Z2MUON\r"

- id: z2_mu_off
  label: Zone 2 Mute Off
  kind: action
  params: []
  command: "Z2MUOFF\r"

- id: z2_mu_query
  label: Zone 2 Mute Query
  kind: query
  params: []
  command: "Z2MU?\r"

- id: z2_cs_st
  label: Zone 2 Channel Stereo
  kind: action
  params: []
  command: "Z2CSST\r"

- id: z2_cs_mono
  label: Zone 2 Channel Mono
  kind: action
  params: []
  command: "Z2CSMONO\r"

- id: z2_cs_query
  label: Zone 2 Channel Setting Query
  kind: query
  params: []
  command: "Z2CS?\r"

- id: z2_cvfl_up
  label: Zone 2 Channel Volume FL Up
  kind: action
  params: []
  command: "Z2CVFL UP\r"

- id: z2_cvfl_down
  label: Zone 2 Channel Volume FL Down
  kind: action
  params: []
  command: "Z2CVFL DOWN\r"

- id: z2_cvfl_set
  label: Zone 2 Channel Volume FL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62; 50=0dB"
  command: "Z2CVFL {level}\r"

- id: z2_cvfr_up
  label: Zone 2 Channel Volume FR Up
  kind: action
  params: []
  command: "Z2CVFR UP\r"

- id: z2_cvfr_down
  label: Zone 2 Channel Volume FR Down
  kind: action
  params: []
  command: "Z2CVFR DOWN\r"

- id: z2_cvfr_set
  label: Zone 2 Channel Volume FR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62; 50=0dB"
  command: "Z2CVFR {level}\r"

- id: z2_cv_query
  label: Zone 2 Channel Volume Query
  kind: query
  params: []
  command: "Z2CV?\r"

- id: z2_hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
  command: "Z2HPFON\r"

- id: z2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
  command: "Z2HPFOFF\r"

- id: z2_hpf_query
  label: Zone 2 HPF Query
  kind: query
  params: []
  command: "Z2HPF?\r"

- id: z2_psbas_up
  label: Zone 2 Bass Up
  kind: action
  params: []
  command: "Z2PSBAS UP\r"

- id: z2_psbas_down
  label: Zone 2 Bass Down
  kind: action
  params: []
  command: "Z2PSBAS DOWN\r"

- id: z2_psbas_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range -10 to +10 (40-60)"
  command: "Z2PSBAS {level}\r"

- id: z2_psbas_query
  label: Zone 2 Bass Query
  kind: query
  params: []
  command: "Z2PSBAS ?\r"

- id: z2_pstre_up
  label: Zone 2 Treble Up
  kind: action
  params: []
  command: "Z2PSTRE UP\r"

- id: z2_pstre_down
  label: Zone 2 Treble Down
  kind: action
  params: []
  command: "Z2PSTRE DOWN\r"

- id: z2_pstre_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range -10 to +10 (40-60)"
  command: "Z2PSTRE {level}\r"

- id: z2_pstre_query
  label: Zone 2 Treble Query
  kind: query
  params: []
  command: "Z2PSTRE ?\r"

- id: z2_hda_thr
  label: Zone 2 HDMI Audio Through
  kind: action
  params: []
  command: "Z2HDA THR\r"

- id: z2_hda_pcm
  label: Zone 2 HDMI Audio PCM
  kind: action
  params: []
  command: "Z2HDA PCM\r"

- id: z2_hda_query
  label: Zone 2 HDMI Audio Query
  kind: query
  params: []
  command: "Z2HDA?\r"

- id: z2_slp_off
  label: Zone 2 Sleep Timer Off
  kind: action
  params: []
  command: "Z2SLPOFF\r"

- id: z2_slp_set
  label: Zone 2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120"
  command: "Z2SLP{minutes}\r"

- id: z2_slp_query
  label: Zone 2 Sleep Timer Query
  kind: query
  params: []
  command: "Z2SLP?\r"

- id: z2_stby_2h
  label: Zone 2 Auto Standby 2 Hours
  kind: action
  params: []
  command: "Z2STBY2H\r"

- id: z2_stby_4h
  label: Zone 2 Auto Standby 4 Hours
  kind: action
  params: []
  command: "Z2STBY4H\r"

- id: z2_stby_8h
  label: Zone 2 Auto Standby 8 Hours
  kind: action
  params: []
  command: "Z2STBY8H\r"

- id: z2_stby_off
  label: Zone 2 Auto Standby Off
  kind: action
  params: []
  command: "Z2STBYOFF\r"

- id: z2_stby_query
  label: Zone 2 Auto Standby Query
  kind: query
  params: []
  command: "Z2STBY?\r"

# --- Zone 3 ---

- id: z3_source
  label: Zone 3 Source (follow main zone)
  kind: action
  params: []
  command: "Z3SOURCE\r"

- id: z3_phono
  label: Zone 3 Input PHONO
  kind: action
  params: []
  command: "Z3PHONO\r"

- id: z3_cd
  label: Zone 3 Input CD
  kind: action
  params: []
  command: "Z3CD\r"

- id: z3_tuner
  label: Zone 3 Input TUNER
  kind: action
  params: []
  command: "Z3TUNER\r"

- id: z3_dvd
  label: Zone 3 Input DVD
  kind: action
  params: []
  command: "Z3DVD\r"

- id: z3_bd
  label: Zone 3 Input BD
  kind: action
  params: []
  command: "Z3BD\r"

- id: z3_tv
  label: Zone 3 Input TV
  kind: action
  params: []
  command: "Z3TV\r"

- id: z3_sat_cbl
  label: Zone 3 Input SAT/CBL
  kind: action
  params: []
  command: "Z3SAT/CBL\r"

- id: z3_mplay
  label: Zone 3 Input MPLAY
  kind: action
  params: []
  command: "Z3MPLAY\r"

- id: z3_game
  label: Zone 3 Input GAME
  kind: action
  params: []
  command: "Z3GAME\r"

- id: z3_net
  label: Zone 3 Input NET
  kind: action
  params: []
  command: "Z3NET\r"

- id: z3_iradio
  label: Zone 3 Input IRADIO
  kind: action
  params: []
  command: "Z3IRADIO\r"

- id: z3_server
  label: Zone 3 Input SERVER
  kind: action
  params: []
  command: "Z3SERVER\r"

- id: z3_favorites
  label: Zone 3 Input FAVORITES
  kind: action
  params: []
  command: "Z3FAVORITES\r"

- id: z3_aux1
  label: Zone 3 Input AUX1
  kind: action
  params: []
  command: "Z3AUX1\r"

- id: z3_aux2
  label: Zone 3 Input AUX2
  kind: action
  params: []
  command: "Z3AUX2\r"

- id: z3_bt
  label: Zone 3 Input Bluetooth
  kind: action
  params: []
  command: "Z3BT\r"

- id: z3_usb
  label: Zone 3 Input USB
  kind: action
  params: []
  command: "Z3USB\r"

- id: z3_quick1
  label: Zone 3 Quick Select 1
  kind: action
  params: []
  command: "Z3QUICK1\r"

- id: z3_quick2
  label: Zone 3 Quick Select 2
  kind: action
  params: []
  command: "Z3QUICK2\r"

- id: z3_quick3
  label: Zone 3 Quick Select 3
  kind: action
  params: []
  command: "Z3QUICK3\r"

- id: z3_quick4
  label: Zone 3 Quick Select 4
  kind: action
  params: []
  command: "Z3QUICK4\r"

- id: z3_quick5
  label: Zone 3 Quick Select 5
  kind: action
  params: []
  command: "Z3QUICK5\r"

- id: z3_quick1_memory
  label: Zone 3 Quick Select 1 Memory
  kind: action
  params: []
  command: "Z3QUICK1 MEMORY\r"

- id: z3_quick2_memory
  label: Zone 3 Quick Select 2 Memory
  kind: action
  params: []
  command: "Z3QUICK2 MEMORY\r"

- id: z3_quick3_memory
  label: Zone 3 Quick Select 3 Memory
  kind: action
  params: []
  command: "Z3QUICK3 MEMORY\r"

- id: z3_quick4_memory
  label: Zone 3 Quick Select 4 Memory
  kind: action
  params: []
  command: "Z3QUICK4 MEMORY\r"

- id: z3_quick5_memory
  label: Zone 3 Quick Select 5 Memory
  kind: action
  params: []
  command: "Z3QUICK5 MEMORY\r"

- id: z3_quick_query
  label: Zone 3 Quick Select Query
  kind: query
  params: []
  command: "Z3QUICK ?\r"

- id: z3_favorite1
  label: Zone 3 Favorite 1
  kind: action
  params: []
  command: "Z3FAVORITE1\r"

- id: z3_favorite2
  label: Zone 3 Favorite 2
  kind: action
  params: []
  command: "Z3FAVORITE2\r"

- id: z3_favorite3
  label: Zone 3 Favorite 3
  kind: action
  params: []
  command: "Z3FAVORITE3\r"

- id: z3_favorite4
  label: Zone 3 Favorite 4
  kind: action
  params: []
  command: "Z3FAVORITE4\r"

- id: z3_favorite1_memory
  label: Zone 3 Favorite 1 Memory
  kind: action
  params: []
  command: "Z3FAVORITE1 MEMORY\r"

- id: z3_favorite2_memory
  label: Zone 3 Favorite 2 Memory
  kind: action
  params: []
  command: "Z3FAVORITE2 MEMORY\r"

- id: z3_favorite3_memory
  label: Zone 3 Favorite 3 Memory
  kind: action
  params: []
  command: "Z3FAVORITE3 MEMORY\r"

- id: z3_favorite4_memory
  label: Zone 3 Favorite 4 Memory
  kind: action
  params: []
  command: "Z3FAVORITE4 MEMORY\r"

- id: z3_vol_up
  label: Zone 3 Volume Up
  kind: action
  params: []
  command: "Z3UP\r"

- id: z3_vol_down
  label: Zone 3 Volume Down
  kind: action
  params: []
  command: "Z3DOWN\r"

- id: z3_vol_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-98; 80=0dB"
  command: "Z3{level}\r"

- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
  command: "Z3ON\r"

- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
  command: "Z3OFF\r"

- id: z3_query
  label: Zone 3 Status Query
  kind: query
  params: []
  command: "Z3?\r"

- id: z3_mu_on
  label: Zone 3 Mute On
  kind: action
  params: []
  command: "Z3MUON\r"

- id: z3_mu_off
  label: Zone 3 Mute Off
  kind: action
  params: []
  command: "Z3MUOFF\r"

- id: z3_mu_query
  label: Zone 3 Mute Query
  kind: query
  params: []
  command: "Z3MU?\r"

- id: z3_cs_st
  label: Zone 3 Channel Stereo
  kind: action
  params: []
  command: "Z3CSST\r"

- id: z3_cs_mono
  label: Zone 3 Channel Mono
  kind: action
  params: []
  command: "Z3CSMONO\r"

- id: z3_cs_query
  label: Zone 3 Channel Setting Query
  kind: query
  params: []
  command: "Z3CS?\r"

- id: z3_cvfl_up
  label: Zone 3 Channel Volume FL Up
  kind: action
  params: []
  command: "Z3CVFL UP\r"

- id: z3_cvfl_down
  label: Zone 3 Channel Volume FL Down
  kind: action
  params: []
  command: "Z3CVFL DOWN\r"

- id: z3_cvfl_set
  label: Zone 3 Channel Volume FL Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62; 50=0dB"
  command: "Z3CVFL {level}\r"

- id: z3_cvfr_up
  label: Zone 3 Channel Volume FR Up
  kind: action
  params: []
  command: "Z3CVFR UP\r"

- id: z3_cvfr_down
  label: Zone 3 Channel Volume FR Down
  kind: action
  params: []
  command: "Z3CVFR DOWN\r"

- id: z3_cvfr_set
  label: Zone 3 Channel Volume FR Set
  kind: action
  params:
    - name: level
      type: string
      description: "38-62; 50=0dB"
  command: "Z3CVFR {level}\r"

- id: z3_cv_query
  label: Zone 3 Channel Volume Query
  kind: query
  params: []
  command: "Z3CV?\r"

- id: z3_hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
  command: "Z3HPFON\r"

- id: z3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
  command: "Z3HPFOFF\r"

- id: z3_hpf_query
  label: Zone 3 HPF Query
  kind: query
  params: []
  command: "Z3HPF?\r"

- id: z3_psbas_up
  label: Zone 3 Bass Up
  kind: action
  params: []
  command: "Z3PSBAS UP\r"

- id: z3_psbas_down
  label: Zone 3 Bass Down
  kind: action
  params: []
  command: "Z3PSBAS DOWN\r"

- id: z3_psbas_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range -10 to +10 (40-60)"
  command: "Z3PSBAS {level}\r"

- id: z3_psbas_query
  label: Zone 3 Bass Query
  kind: query
  params: []
  command: "Z3PSBAS ?\r"

- id: z3_pstre_up
  label: Zone 3 Treble Up
  kind: action
  params: []
  command: "Z3PSTRE UP\r"

- id: z3_pstre_down
  label: Zone 3 Treble Down
  kind: action
  params: []
  command: "Z3PSTRE DOWN\r"

- id: z3_pstre_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: "00-99; range -10 to +10 (40-60)"
  command: "Z3PSTRE {level}\r"

- id: z3_pstre_query
  label: Zone 3 Treble Query
  kind: query
  params: []
  command: "Z3PSTRE ?\r"

- id: z3_slp_off
  label: Zone 3 Sleep Timer Off
  kind: action
  params: []
  command: "Z3SLPOFF\r"

- id: z3_slp_set
  label: Zone 3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: string
      description: "001-120"
  command: "Z3SLP{minutes}\r"

- id: z3_slp_query
  label: Zone 3 Sleep Timer Query
  kind: query
  params: []
  command: "Z3SLP?\r"

- id: z3_stby_2h
  label: Zone 3 Auto Standby 2 Hours
  kind: action
  params: []
  command: "Z3STBY2H\r"

- id: z3_stby_4h
  label: Zone 3 Auto Standby 4 Hours
  kind: action
  params: []
  command: "Z3STBY4H\r"

- id: z3_stby_8h
  label: Zone 3 Auto Standby 8 Hours
  kind: action
  params: []
  command: "Z3STBY8H\r"

- id: z3_stby_off
  label: Zone 3 Auto Standby Off
  kind: action
  params: []
  command: "Z3STBYOFF\r"

- id: z3_stby_query
  label: Zone 3 Auto Standby Query
  kind: query
  params: []
  command: "Z3STBY?\r"

# --- Tuner Analog ---

- id: tfan_up
  label: Tuner FM/AM Frequency Up
  kind: action
  params: []
  command: "TFANUP\r"

- id: tfan_down
  label: Tuner FM/AM Frequency Down
  kind: action
  params: []
  command: "TFANDOWN\r"

- id: tfan_set
  label: Tuner FM/AM Frequency Set (6 digits)
  kind: action
  params:
    - name: freq
      type: string
      description: "6 digits e.g. 105000 = 1050.00kHz AM; <050000 = FM MHz"
  command: "TFAN{freq}\r"

- id: tfan_query
  label: Tuner FM/AM Frequency Query
  kind: query
  params: []
  command: "TFAN?\r"

- id: tfanname_query
  label: Tuner RDS Station Name Query (EU/AP only)
  kind: query
  params: []
  command: "TFANNAME?\r"

- id: tpan_up
  label: Tuner Preset Channel Up
  kind: action
  params: []
  command: "TPANUP\r"

- id: tpan_down
  label: Tuner Preset Channel Down
  kind: action
  params: []
  command: "TPANDOWN\r"

- id: tpan_set
  label: Tuner Preset Channel Set
  kind: action
  params:
    - name: ch
      type: string
      description: "01-56"
  command: "TPAN{ch}\r"

- id: tpan_query
  label: Tuner Preset Channel Query
  kind: query
  params: []
  command: "TPAN?\r"

- id: tpanmem
  label: Tuner Preset Memory
  kind: action
  params: []
  command: "TPANMEM\r"

- id: tpanmem_set
  label: Tuner Preset Memory to Channel
  kind: action
  params:
    - name: ch
      type: string
      description: "01-56"
  command: "TPANMEM{ch}\r"

- id: tmanam
  label: Tuner Band AM
  kind: action
  params: []
  command: "TMANAM\r"

- id: tmanfm
  label: Tuner Band FM
  kind: action
  params: []
  command: "TMANFM\r"

- id: tman_query
  label: Tuner Band/Mode Query
  kind: query
  params: []
  command: "TMAN?\r"

- id: tmanauto
  label: Tuner Mode Auto
  kind: action
  params: []
  command: "TMANAUTO\r"

- id: tmanmanual
  label: Tuner Mode Manual
  kind: action
  params: []
  command: "TMANMANUAL\r"

# --- HD Radio ---

- id: tfhd_up
  label: HD Radio Frequency Up
  kind: action
  params: []
  command: "TFHDUP\r"

- id: tfhd_down
  label: HD Radio Frequency Down
  kind: action
  params: []
  command: "TFHDDOWN\r"

- id: tfhd_set
  label: HD Radio Frequency Set (6 digits)
  kind: action
  params:
    - name: freq
      type: string
      description: "6 digits e.g. 105000"
  command: "TFHD{freq}\r"

- id: tfhd_mc
  label: HD Radio Multi Cast Channel Select
  kind: action
  params:
    - name: ch
      type: string
      description: "1 digit; 0=Analog, 1-8=HD MultiCast"
  command: "TFHDMC{ch}\r"

- id: tfhd_query
  label: HD Radio Frequency Query
  kind: query
  params: []
  command: "TFHD?\r"

- id: tphd_up
  label: HD Radio Preset Up
  kind: action
  params: []
  command: "TPHDUP\r"

- id: tphd_down
  label: HD Radio Preset Down
  kind: action
  params: []
  command: "TPHDDOWN\r"

- id: tphd_set
  label: HD Radio Preset Set
  kind: action
  params:
    - name: ch
      type: string
      description: "01-56"
  command: "TPHD{ch}\r"

- id: tphd_query
  label: HD Radio Preset Query
  kind: query
  params: []
  command: "TPHD?\r"

- id: tphdmem
  label: HD Radio Preset Memory
  kind: action
  params: []
  command: "TPHDMEM\r"

- id: tphdmem_set
  label: HD Radio Preset Memory to Channel
  kind: action
  params:
    - name: ch
      type: string
      description: "01-56"
  command: "TPHDMEM{ch}\r"

- id: tmhdam
  label: HD Radio Band AM
  kind: action
  params: []
  command: "TMHDAM\r"

- id: tmhdfm
  label: HD Radio Band FM
  kind: action
  params: []
  command: "TMHDFM\r"

- id: tmhd_autohd
  label: HD Radio Mode Auto-HD
  kind: action
  params: []
  command: "TMHDAUTOHD\r"

- id: tmhd_auto
  label: HD Radio Mode Auto
  kind: action
  params: []
  command: "TMHDAUTO\r"

- id: tmhd_manual
  label: HD Radio Mode Manual
  kind: action
  params: []
  command: "TMHDMANUAL\r"

- id: tmhd_anaauto
  label: HD Radio Mode Analog Auto
  kind: action
  params: []
  command: "TMHDANAAUTO\r"

- id: tmhd_anamanu
  label: HD Radio Mode Analog Manual
  kind: action
  params: []
  command: "TMHDANAMANU\r"

- id: tmhd_query
  label: HD Radio Band/Mode Query
  kind: query
  params: []
  command: "TMHD?\r"

- id: hd_status_query
  label: HD Radio Status Query (band/station/signal/artist/title)
  kind: query
  params: []
  command: "HD?\r"

# --- NS Network/Online/Bluetooth ---

- id: ns_cursor_up
  label: Network Cursor Up
  kind: action
  params: []
  command: "NS90\r"

- id: ns_cursor_down
  label: Network Cursor Down
  kind: action
  params: []
  command: "NS91\r"

- id: ns_cursor_left
  label: Network Cursor Left
  kind: action
  params: []
  command: "NS92\r"

- id: ns_cursor_right
  label: Network Cursor Right
  kind: action
  params: []
  command: "NS93\r"

- id: ns_enter
  label: Network Enter/Play/Pause
  kind: action
  params: []
  command: "NS94\r"

- id: ns_play
  label: Network Play
  kind: action
  params: []
  command: "NS9A\r"

- id: ns_pause
  label: Network Pause
  kind: action
  params: []
  command: "NS9B\r"

- id: ns_stop
  label: Network Stop
  kind: action
  params: []
  command: "NS9C\r"

- id: ns_skip_plus
  label: Network Skip Forward
  kind: action
  params: []
  command: "NS9D\r"

- id: ns_skip_minus
  label: Network Skip Back
  kind: action
  params: []
  command: "NS9E\r"

- id: ns_search_plus
  label: Network Manual Search Forward
  kind: action
  params: []
  command: "NS9F\r"

- id: ns_search_minus
  label: Network Manual Search Backward
  kind: action
  params: []
  command: "NS9G\r"

- id: ns_repeat_one
  label: Network Repeat One
  kind: action
  params: []
  command: "NS9H\r"

- id: ns_repeat_all
  label: Network Repeat All
  kind: action
  params: []
  command: "NS9I\r"

- id: ns_repeat_off
  label: Network Repeat Off
  kind: action
  params: []
  command: "NS9J\r"

- id: ns_random_on
  label: Network Random On
  kind: action
  params: []
  command: "NS9K\r"

- id: ns_random_off
  label: Network Random Off
  kind: action
  params: []
  command: "NS9M\r"

- id: ns_ipod_mode_toggle
  label: Network iPod/On Screen Mode Toggle
  kind: action
  params: []
  command: "NS9W\r"

- id: ns_page_next
  label: Network Page Next
  kind: action
  params: []
  command: "NS9X\r"

- id: ns_page_prev
  label: Network Page Previous
  kind: action
  params: []
  command: "NS9Y\r"

- id: ns_search_stop
  label: Network Manual Search Stop
  kind: action
  params: []
  command: "NS9Z\r"

- id: ns_repeat_toggle
  label: Network Repeat Toggle
  kind: action
  params: []
  command: "NSRPT\r"

- id: ns_random_toggle
  label: Network Random Toggle
  kind: action
  params: []
  command: "NSRND\r"

- id: ns_preset_call
  label: Network Preset Call
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"
  command: "NSB{preset}\r"

- id: ns_preset_memory
  label: Network Preset Memory
  kind: action
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"
  command: "NSC{preset}\r"

- id: ns_preset_name_query
  label: Network Preset Name Query
  kind: query
  params: []
  command: "NSH\r"

- id: ns_add_favorites
  label: Network Add Favorites
  kind: action
  params: []
  command: "NSFV MEM\r"

- id: ns_onscreen_ascii
  label: Network On-Screen Display (ASCII)
  kind: query
  params: []
  command: "NSA\r"

- id: ns_onscreen_utf8
  label: Network On-Screen Display (UTF-8)
  kind: query
  params: []
  command: "NSE\r"

# --- MN Menu ---

- id: mn_cup
  label: Menu Cursor Up
  kind: action
  params: []
  command: "MNCUP\r"

- id: mn_cdn
  label: Menu Cursor Down
  kind: action
  params: []
  command: "MNCDN\r"

- id: mn_clt
  label: Menu Cursor Left
  kind: action
  params: []
  command: "MNCLT\r"

- id: mn_crt
  label: Menu Cursor Right
  kind: action
  params: []
  command: "MNCRT\r"

- id: mn_ent
  label: Menu Enter
  kind: action
  params: []
  command: "MNENT\r"

- id: mn_rtn
  label: Menu Return
  kind: action
  params: []
  command: "MNRTN\r"

- id: mn_opt
  label: Menu Option
  kind: action
  params: []
  command: "MNOPT\r"

- id: mn_inf
  label: Menu Info
  kind: action
  params: []
  command: "MNINF\r"

- id: mn_chl
  label: Channel Level Adjust Menu Toggle
  kind: action
  params: []
  command: "MNCHL\r"

- id: mn_men_on
  label: Setup Menu On
  kind: action
  params: []
  command: "MNMEN ON\r"

- id: mn_men_off
  label: Setup Menu Off
  kind: action
  params: []
  command: "MNMEN OFF\r"

- id: mn_men_query
  label: Setup Menu Query
  kind: query
  params: []
  command: "MNMEN?\r"

- id: mn_prv_on
  label: InstaPrevue On
  kind: action
  params: []
  command: "MNPRV ON\r"

- id: mn_prv_off
  label: InstaPrevue Off
  kind: action
  params: []
  command: "MNPRV OFF\r"

- id: mn_prv_query
  label: InstaPrevue Query
  kind: query
  params: []
  command: "MNPRV?\r"

- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  params: []
  command: "MNZST ON\r"

- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  params: []
  command: "MNZST OFF\r"

- id: mn_zst_query
  label: All Zone Stereo Query
  kind: query
  params: []
  command: "MNZST?\r"

# --- SY system lock ---

- id: sy_remote_lock_on
  label: Remote Control Lock On
  kind: action
  params: []
  command: "SYREMOTE LOCK ON\r"

- id: sy_remote_lock_off
  label: Remote Control Lock Off
  kind: action
  params: []
  command: "SYREMOTE LOCK OFF\r"

- id: sy_panel_lock_on
  label: Panel Button Lock On (except Master Vol)
  kind: action
  params: []
  command: "SYPANEL LOCK ON\r"

- id: sy_panel_v_lock_on
  label: Panel Button and Master Vol Lock On
  kind: action
  params: []
  command: "SYPANEL+V LOCK ON\r"

- id: sy_panel_lock_off
  label: Panel Button Lock Off
  kind: action
  params: []
  command: "SYPANEL LOCK OFF\r"

# --- TR Trigger ---

- id: tr1_on
  label: Trigger 1 On
  kind: action
  params: []
  command: "TR1 ON\r"

- id: tr1_off
  label: Trigger 1 Off
  kind: action
  params: []
  command: "TR1 OFF\r"

- id: tr2_on
  label: Trigger 2 On
  kind: action
  params: []
  command: "TR2 ON\r"

- id: tr2_off
  label: Trigger 2 Off
  kind: action
  params: []
  command: "TR2 OFF\r"

- id: tr_query
  label: Trigger Status Query
  kind: query
  params: []
  command: "TR?\r"

# --- UG upgrade ---

- id: ug_idn
  label: Display Upgrade ID Number
  kind: action
  params: []
  command: "UGIDN\r"

# --- RM remote maintenance ---

- id: rm_sta
  label: Remote Maintenance Mode Start
  kind: action
  params: []
  command: "RM STA\r"

- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
  command: "RM END\r"

- id: rm_query
  label: Remote Maintenance Status Query
  kind: query
  params: []
  command: "RM ?\r"

# --- DIM dimmer ---

- id: dim_bri
  label: Dimmer Bright
  kind: action
  params: []
  command: "DIM BRI\r"

- id: dim_dim
  label: Dimmer Dim
  kind: action
  params: []
  command: "DIM DIM\r"

- id: dim_dar
  label: Dimmer Dark
  kind: action
  params: []
  command: "DIM DAR\r"

- id: dim_off
  label: Dimmer Off
  kind: action
  params: []
  command: "DIM OFF\r"

- id: dim_sel
  label: Dimmer Select Toggle
  kind: action
  params: []
  command: "DIM SEL\r"

- id: dim_query
  label: Dimmer Query
  kind: query
  params: []
  command: "DIM ?\r"
- id: z2_hdradio
  label: Zone 2 Input HD Radio
  kind: action
  params: []
  command: "Z2HDRADIO\r"

- id: z2_lastfm
  label: Zone 2 Input LastFM
  kind: action
  params: []
  command: "Z2LASTFM\r"

- id: z2_flickr
  label: Zone 2 Input Flickr
  kind: action
  params: []
  command: "Z2FLICKR\r"

- id: z2_aux3
  label: Zone 2 Input AUX3
  kind: action
  params: []
  command: "Z2AUX3\r"

- id: z2_aux4
  label: Zone 2 Input AUX4
  kind: action
  params: []
  command: "Z2AUX4\r"

- id: z2_aux5
  label: Zone 2 Input AUX5
  kind: action
  params: []
  command: "Z2AUX5\r"

- id: z2_aux6
  label: Zone 2 Input AUX6
  kind: action
  params: []
  command: "Z2AUX6\r"

- id: z2_aux7
  label: Zone 2 Input AUX7
  kind: action
  params: []
  command: "Z2AUX7\r"

- id: z2_usb_ipod
  label: Zone 2 Input USB/iPod
  kind: action
  params: []
  command: "Z2USB/IPOD\r"

- id: z2_ipd
  label: Zone 2 Input iPod DIRECT
  kind: action
  params: []
  command: "Z2IPD\r"

- id: z2_irp
  label: Zone 2 Input iRadio Recent Play
  kind: action
  params: []
  command: "Z2IRP\r"

- id: z2_fvp
  label: Zone 2 Input Favorites Play
  kind: action
  params: []
  command: "Z2FVP\r"

- id: z3_hdradio
  label: Zone 3 Input HD Radio
  kind: action
  params: []
  command: "Z3HDRADIO\r"

- id: z3_pandora
  label: Zone 3 Input Pandora
  kind: action
  params: []
  command: "Z3PANDORA\r"

- id: z3_siriusxm
  label: Zone 3 Input SiriusXM
  kind: action
  params: []
  command: "Z3SIRIUSXM\r"

- id: z3_spotify
  label: Zone 3 Input Spotify
  kind: action
  params: []
  command: "Z3SPOTIFY\r"

- id: z3_lastfm
  label: Zone 3 Input LastFM
  kind: action
  params: []
  command: "Z3LASTFM\r"

- id: z3_flickr
  label: Zone 3 Input Flickr
  kind: action
  params: []
  command: "Z3FLICKR\r"

- id: z3_aux3
  label: Zone 3 Input AUX3
  kind: action
  params: []
  command: "Z3AUX3\r"

- id: z3_aux4
  label: Zone 3 Input AUX4
  kind: action
  params: []
  command: "Z3AUX4\r"

- id: z3_aux5
  label: Zone 3 Input AUX5
  kind: action
  params: []
  command: "Z3AUX5\r"

- id: z3_aux6
  label: Zone 3 Input AUX6
  kind: action
  params: []
  command: "Z3AUX6\r"

- id: z3_aux7
  label: Zone 3 Input AUX7
  kind: action
  params: []
  command: "Z3AUX7\r"

- id: z3_usb_ipod
  label: Zone 3 Input USB/iPod
  kind: action
  params: []
  command: "Z3USB/IPOD\r"

- id: z3_ipd
  label: Zone 3 Input iPod DIRECT
  kind: action
  params: []
  command: "Z3IPD\r"

- id: z3_irp
  label: Zone 3 Input iRadio Recent Play
  kind: action
  params: []
  command: "Z3IRP\r"

- id: z3_fvp
  label: Zone 3 Input Favorites Play
  kind: action
  params: []
  command: "Z3FVP\r"
```

## Feedbacks
```yaml
- id: fb_power
  query_command: "PW?\r"

- id: fb_master_volume
  query_command: "MV?\r"

- id: fb_mute
  query_command: "MU?\r"

- id: fb_main_zone
  query_command: "ZM?\r"

- id: fb_input_source
  query_command: "SI?\r"

- id: fb_channel_volume
  query_command: "CV?\r"

- id: fb_surround_mode
  query_command: "MS?\r"

- id: fb_sleep_timer
  query_command: "SLP?\r"

- id: fb_auto_standby
  query_command: "STBY?\r"

- id: fb_eco_mode
  query_command: "ECO?\r"

- id: fb_tone_ctrl
  query_command: "PSTONE CTRL ?\r"

- id: fb_bass
  query_command: "PSBAS ?\r"

- id: fb_treble
  query_command: "PSTRE ?\r"

- id: fb_multeq
  query_command: "PSMULTEQ: ?\r"

- id: fb_dyneq
  query_command: "PSDYNEQ ?\r"

- id: fb_dynvol
  query_command: "PSDYNVOL ?\r"

- id: fb_drc
  query_command: "PSDRC ?\r"

- id: fb_signal_detect
  query_command: "SD?\r"

- id: fb_digital_input
  query_command: "DC?\r"

- id: fb_video_select
  query_command: "SV?\r"

- id: fb_record_select
  query_command: "SR?\r"

- id: fb_vs_aspect
  query_command: "VSASP ?\r"

- id: fb_vs_monitor
  query_command: "VSMONI ?\r"

- id: fb_vs_resolution
  query_command: "VSSC ?\r"

- id: fb_vs_audio
  query_command: "VSAUDIO ?\r"

- id: fb_vs_vpm
  query_command: "VSVPM ?\r"

- id: fb_picture_mode
  query_command: "PV?\r"

- id: fb_zone2
  query_command: "Z2?\r"

- id: fb_zone2_mute
  query_command: "Z2MU?\r"

- id: fb_zone3
  query_command: "Z3?\r"

- id: fb_zone3_mute
  query_command: "Z3MU?\r"

- id: fb_tuner_freq
  query_command: "TFAN?\r"

- id: fb_tuner_preset
  query_command: "TPAN?\r"

- id: fb_tuner_band_mode
  query_command: "TMAN?\r"

- id: fb_trigger
  query_command: "TR?\r"

- id: fb_dimmer
  query_command: "DIM ?\r"

- id: fb_hd_status
  query_command: "HD?\r"

- id: fb_rm_status
  query_command: "RM ?\r"

- id: fb_menu_status
  query_command: "MNMEN?\r"

- id: fb_zst_status
  query_command: "MNZST?\r"
```

## Variables
[]

## Events
[]

## Macros
[]

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Send commands at intervals of 50 ms or more; the AVR is half-duplex and will drop overlapping commands.
- All commands are terminated with CR (0x0D); maximum message length is 135 bytes.
- After sending PWON, wait at least 1 second before sending the next command to allow the unit to boot.

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-22T21:58:50.831Z
last_checked_at: 2026-05-26T13:19:02.078Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-26T13:19:02.078Z
matched_actions: 907
action_count: 907
confidence: medium
summary: "All 907 spec action units have verbatim wire-token matches in source; Z2/Z3 input variants (HDRADIO, LASTFM, FLICKR, AUX3-7, USB/IPOD, IPD, IRP, FVP plus Z3 PANDORA/SIRIUSXM/SPOTIFY) all documented in the Denon control protocol table; transport fully confirmed. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model compatibility matrix across AVR generations not fully specified in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
