---
spec_id: admin/denon-avc-s670h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVC-S670H Control Spec"
manufacturer: Denon
model_family: AVC-S670H
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVC-S670H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:14.487Z
last_checked_at: 2026-06-02T08:46:03.112Z
generated_at: 2026-06-02T08:46:03.112Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Denon AVR protocol reference; S670H-specific firmware behavior not separately confirmed."
  - "source states \"Non procedural\" only, no explicit flow control"
  - "no multi-step macro sequences documented in source."
  - "source contains no safety warnings, interlock procedures, or"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:46:03.112Z
  matched_actions: 864
  action_count: 864
  confidence: medium
  summary: "All 864 spec actions are present verbatim in the source command tables; transport (TCP port 23, 9600-8-N-1 serial) is confirmed; source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Denon AVC-S670H Control Spec

## Summary
AV receiver supporting RS-232C (DB-9 female DCE, 9600-8-N-1) and Ethernet (RJ-45, TCP port 23 / telnet). Control is ASCII text command/response terminated by carriage return (0x0D). Protocol covers power, master and per-channel volume, mute, input select, surround mode, video/HDMI output, multi-zone (Zone2/Zone3), AM/FM/HD Radio tuner, network streaming / USB / iPod / Bluetooth, picture mode, and system commands.

<!-- UNRESOLVED: source is a generic Denon AVR protocol reference; S670H-specific firmware behavior not separately confirmed. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # TCP port 23 (telnet) per source §Ethernet
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: source states "Non procedural" only, no explicit flow control
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred: PW ON/STANDBY
- levelable   # inferred: MV, CV, tone, channel volume commands
- routable    # inferred: SI input select, Z2/Z3 zone routing, SV video select
- queryable   # inferred: all COMMAND? request forms
- zoneable    # inferred: Z2/Z3 zone control surface
```

## Actions
```yaml
# Each entry: id, label, kind (action|query), command (literal ASCII string from source, \r = literal 0x0D terminator).
# Source uses COMMAND+PARAMETER+CR. All commands are flat ASCII with no checksums.
- id: power_on
  label: Power On
  kind: action
  command: "PWON\r"
- id: power_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY\r"
- id: power_status
  label: Power Status Query
  kind: query
  command: "PW?\r"
- id: mv_up
  label: Master Volume Up
  kind: action
  command: "MVUP\r"
- id: mv_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN\r"
- id: mv_set
  label: Master Volume Set (00-98, 80=0dB)
  kind: action
  command: "MV{level}\r"
- id: mv_status
  label: Master Volume Query
  kind: query
  command: "MV?\r"
- id: cv_fl_up
  label: CV Front L Up
  kind: action
  command: "CVFL UP\r"
- id: cv_fl_down
  label: CV Front L Down
  kind: action
  command: "CVFL DOWN\r"
- id: cv_fl_set
  label: CV Front L Set (38-62)
  kind: action
  command: "CVFL {value}\r"
- id: cv_fr_up
  label: CV Front R Up
  kind: action
  command: "CVFR UP\r"
- id: cv_fr_down
  label: CV Front R Down
  kind: action
  command: "CVFR DOWN\r"
- id: cv_fr_set
  label: CV Front R Set
  kind: action
  command: "CVFR {value}\r"
- id: cv_c_up
  label: CV Center Up
  kind: action
  command: "CVC UP\r"
- id: cv_c_down
  label: CV Center Down
  kind: action
  command: "CVC DOWN\r"
- id: cv_c_set
  label: CV Center Set
  kind: action
  command: "CVC {value}\r"
- id: cv_sw_up
  label: CV Subwoofer Up
  kind: action
  command: "CVSW UP\r"
- id: cv_sw_down
  label: CV Subwoofer Down
  kind: action
  command: "CVSW DOWN\r"
- id: cv_sw_set
  label: CV Subwoofer Set (00,38-62)
  kind: action
  command: "CVSW {value}\r"
- id: cv_sw2_up
  label: CV Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP\r"
- id: cv_sw2_down
  label: CV Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN\r"
- id: cv_sw2_set
  label: CV Subwoofer 2 Set
  kind: action
  command: "CVSW2 {value}\r"
- id: cv_sl_up
  label: CV Surround L Up
  kind: action
  command: "CVSL UP\r"
- id: cv_sl_down
  label: CV Surround L Down
  kind: action
  command: "CVSL DOWN\r"
- id: cv_sl_set
  label: CV Surround L Set
  kind: action
  command: "CVSL {value}\r"
- id: cv_sr_up
  label: CV Surround R Up
  kind: action
  command: "CVSR UP\r"
- id: cv_sr_down
  label: CV Surround R Down
  kind: action
  command: "CVSR DOWN\r"
- id: cv_sr_set
  label: CV Surround R Set
  kind: action
  command: "CVSR {value}\r"
- id: cv_sbl_up
  label: CV Surround Back L Up (2SP)
  kind: action
  command: "CVSBL UP\r"
- id: cv_sbl_down
  label: CV Surround Back L Down
  kind: action
  command: "CVSBL DOWN\r"
- id: cv_sbl_set
  label: CV Surround Back L Set
  kind: action
  command: "CVSBL {value}\r"
- id: cv_sbr_up
  label: CV Surround Back R Up (2SP)
  kind: action
  command: "CVSBR UP\r"
- id: cv_sbr_down
  label: CV Surround Back R Down
  kind: action
  command: "CVSBR DOWN\r"
- id: cv_sbr_set
  label: CV Surround Back R Set
  kind: action
  command: "CVSBR {value}\r"
- id: cv_sb_up
  label: CV Surround Back Up (1SP)
  kind: action
  command: "CVSB UP\r"
- id: cv_sb_down
  label: CV Surround Back Down
  kind: action
  command: "CVSB DOWN\r"
- id: cv_sb_set
  label: CV Surround Back Set
  kind: action
  command: "CVSB {value}\r"
- id: cv_fhl_up
  label: CV Front Height L Up
  kind: action
  command: "CVFHL UP\r"
- id: cv_fhl_down
  label: CV Front Height L Down
  kind: action
  command: "CVFHL DOWN\r"
- id: cv_fhl_set
  label: CV Front Height L Set
  kind: action
  command: "CVFHL {value}\r"
- id: cv_fhr_up
  label: CV Front Height R Up
  kind: action
  command: "CVFHR UP\r"
- id: cv_fhr_down
  label: CV Front Height R Down
  kind: action
  command: "CVFHR DOWN\r"
- id: cv_fhr_set
  label: CV Front Height R Set
  kind: action
  command: "CVFHR {value}\r"
- id: cv_fwl_up
  label: CV Front Wide L Up
  kind: action
  command: "CVFWL UP\r"
- id: cv_fwl_down
  label: CV Front Wide L Down
  kind: action
  command: "CVFWL DOWN\r"
- id: cv_fwl_set
  label: CV Front Wide L Set
  kind: action
  command: "CVFWL {value}\r"
- id: cv_fwr_up
  label: CV Front Wide R Up
  kind: action
  command: "CVFWR UP\r"
- id: cv_fwr_down
  label: CV Front Wide R Down
  kind: action
  command: "CVFWR DOWN\r"
- id: cv_fwr_set
  label: CV Front Wide R Set
  kind: action
  command: "CVFWR {value}\r"
- id: cv_tfl_up
  label: CV Top Front L Up
  kind: action
  command: "CVTFL UP\r"
- id: cv_tfl_down
  label: CV Top Front L Down
  kind: action
  command: "CVTFL DOWN\r"
- id: cv_tfl_set
  label: CV Top Front L Set
  kind: action
  command: "CVTFL {value}\r"
- id: cv_tfr_up
  label: CV Top Front R Up
  kind: action
  command: "CVTFR UP\r"
- id: cv_tfr_down
  label: CV Top Front R Down
  kind: action
  command: "CVTFR DOWN\r"
- id: cv_tfr_set
  label: CV Top Front R Set
  kind: action
  command: "CVTFR {value}\r"
- id: cv_tml_up
  label: CV Top Middle L Up
  kind: action
  command: "CVTML UP\r"
- id: cv_tml_down
  label: CV Top Middle L Down
  kind: action
  command: "CVTML DOWN\r"
- id: cv_tml_set
  label: CV Top Middle L Set
  kind: action
  command: "CVTML {value}\r"
- id: cv_tmr_up
  label: CV Top Middle R Up
  kind: action
  command: "CVTMR UP\r"
- id: cv_tmr_down
  label: CV Top Middle R Down
  kind: action
  command: "CVTMR DOWN\r"
- id: cv_tmr_set
  label: CV Top Middle R Set
  kind: action
  command: "CVTMR {value}\r"
- id: cv_trl_up
  label: CV Top Rear L Up
  kind: action
  command: "CVTRL UP\r"
- id: cv_trl_down
  label: CV Top Rear L Down
  kind: action
  command: "CVTRL DOWN\r"
- id: cv_trl_set
  label: CV Top Rear L Set
  kind: action
  command: "CVTRL {value}\r"
- id: cv_trr_up
  label: CV Top Rear R Up
  kind: action
  command: "CVTRR UP\r"
- id: cv_trr_down
  label: CV Top Rear R Down
  kind: action
  command: "CVTRR DOWN\r"
- id: cv_trr_set
  label: CV Top Rear R Set
  kind: action
  command: "CVTRR {value}\r"
- id: cv_rhl_up
  label: CV Rear Height L Up
  kind: action
  command: "CVRHL UP\r"
- id: cv_rhl_down
  label: CV Rear Height L Down
  kind: action
  command: "CVRHL DOWN\r"
- id: cv_rhl_set
  label: CV Rear Height L Set
  kind: action
  command: "CVRHL {value}\r"
- id: cv_rhr_up
  label: CV Rear Height R Up
  kind: action
  command: "CVRHR UP\r"
- id: cv_rhr_down
  label: CV Rear Height R Down
  kind: action
  command: "CVRHR DOWN\r"
- id: cv_rhr_set
  label: CV Rear Height R Set
  kind: action
  command: "CVRHR {value}\r"
- id: cv_fdl_up
  label: CV Front Dolby L Up
  kind: action
  command: "CVFDL UP\r"
- id: cv_fdl_down
  label: CV Front Dolby L Down
  kind: action
  command: "CVFDL DOWN\r"
- id: cv_fdl_set
  label: CV Front Dolby L Set
  kind: action
  command: "CVFDL {value}\r"
- id: cv_fdr_up
  label: CV Front Dolby R Up
  kind: action
  command: "CVFDR UP\r"
- id: cv_fdr_down
  label: CV Front Dolby R Down
  kind: action
  command: "CVFDR DOWN\r"
- id: cv_fdr_set
  label: CV Front Dolby R Set
  kind: action
  command: "CVFDR {value}\r"
- id: cv_sdl_up
  label: CV Surround Dolby L Up
  kind: action
  command: "CVSDL UP\r"
- id: cv_sdl_down
  label: CV Surround Dolby L Down
  kind: action
  command: "CVSDL DOWN\r"
- id: cv_sdl_set
  label: CV Surround Dolby L Set
  kind: action
  command: "CVSDL {value}\r"
- id: cv_sdr_up
  label: CV Surround Dolby R Up
  kind: action
  command: "CVSDR UP\r"
- id: cv_sdr_down
  label: CV Surround Dolby R Down
  kind: action
  command: "CVSDR DOWN\r"
- id: cv_sdr_set
  label: CV Surround Dolby R Set
  kind: action
  command: "CVSDR {value}\r"
- id: cv_bdl_up
  label: CV Back Dolby L Up
  kind: action
  command: "CVBDL UP\r"
- id: cv_bdl_down
  label: CV Back Dolby L Down
  kind: action
  command: "CVBDL DOWN\r"
- id: cv_bdl_set
  label: CV Back Dolby L Set
  kind: action
  command: "CVBDL {value}\r"
- id: cv_bdr_up
  label: CV Back Dolby R Up
  kind: action
  command: "CVBDR UP\r"
- id: cv_bdr_down
  label: CV Back Dolby R Down
  kind: action
  command: "CVBDR DOWN\r"
- id: cv_bdr_set
  label: CV Back Dolby R Set
  kind: action
  command: "CVBDR {value}\r"
- id: cv_shl_up
  label: CV Surround Height L Up (Auro-3D)
  kind: action
  command: "CVSHL UP\r"
- id: cv_shl_down
  label: CV Surround Height L Down
  kind: action
  command: "CVSHL DOWN\r"
- id: cv_shl_set
  label: CV Surround Height L Set
  kind: action
  command: "CVSHL {value}\r"
- id: cv_shr_up
  label: CV Surround Height R Up (Auro-3D)
  kind: action
  command: "CVSHR UP\r"
- id: cv_shr_down
  label: CV Surround Height R Down
  kind: action
  command: "CVSHR DOWN\r"
- id: cv_shr_set
  label: CV Surround Height R Set
  kind: action
  command: "CVSHR {value}\r"
- id: cv_ts_up
  label: CV Top Surround Up (Auro-3D)
  kind: action
  command: "CVTS UP\r"
- id: cv_ts_down
  label: CV Top Surround Down
  kind: action
  command: "CVTS DOWN\r"
- id: cv_ts_set
  label: CV Top Surround Set
  kind: action
  command: "CVTS {value}\r"
- id: cv_reset_all
  label: Reset All Channel Levels
  kind: action
  command: "CVZRL\r"
- id: cv_status
  label: Channel Volume Status Query
  kind: query
  command: "CV?\r"
- id: mute_on
  label: Mute On
  kind: action
  command: "MUON\r"
- id: mute_off
  label: Mute Off
  kind: action
  command: "MUOFF\r"
- id: mute_status
  label: Mute Status Query
  kind: query
  command: "MU?\r"
- id: si_phono
  label: Select Input Phono
  kind: action
  command: "SIPHONO\r"
- id: si_cd
  label: Select Input CD
  kind: action
  command: "SICD\r"
- id: si_tuner
  label: Select Input Tuner
  kind: action
  command: "SITUNER\r"
- id: si_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD\r"
- id: si_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD\r"
- id: si_tv
  label: Select Input TV Audio
  kind: action
  command: "SITV\r"
- id: si_satcbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL\r"
- id: si_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY\r"
- id: si_game
  label: Select Input Game
  kind: action
  command: "SIGAME\r"
- id: si_hdradio
  label: Select Input HD Radio
  kind: action
  command: "SIHDRADIO\r"
- id: si_net
  label: Select Input Network
  kind: action
  command: "SINET\r"
- id: si_pandora
  label: Select Input Pandora
  kind: action
  command: "SIPANDORA\r"
- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  command: "SISIRIUSXM\r"
- id: si_spotify
  label: Select Input Spotify
  kind: action
  command: "SISPOTIFY\r"
- id: si_lastfm
  label: Select Input Last.fm
  kind: action
  command: "SILASTFM\r"
- id: si_flickr
  label: Select Input Flickr
  kind: action
  command: "SIFLICKR\r"
- id: si_iradio
  label: Select Input iRadio
  kind: action
  command: "SIIRADIO\r"
- id: si_server
  label: Select Input Media Server
  kind: action
  command: "SISERVER\r"
- id: si_favorites
  label: Select Input Favorites
  kind: action
  command: "SIFAVORITES\r"
- id: si_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1\r"
- id: si_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2\r"
- id: si_aux3
  label: Select Input AUX3
  kind: action
  command: "SIAUX3\r"
- id: si_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4\r"
- id: si_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5\r"
- id: si_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6\r"
- id: si_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7\r"
- id: si_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT\r"
- id: si_usb_ipod
  label: Select Input USB/iPod + Play
  kind: action
  command: "SIUSB/IPOD\r"
- id: si_usb
  label: Select Input USB
  kind: action
  command: "SIUSB\r"
- id: si_ipd
  label: Select Input iPod Direct
  kind: action
  command: "SIIPD\r"
- id: si_irp
  label: Select Input iRadio Recent Play
  kind: action
  command: "SIIRP\r"
- id: si_fvp
  label: Select Input Favorites Play
  kind: action
  command: "SIFVP\r"
- id: si_status
  label: Input Status Query
  kind: query
  command: "SI?\r"
- id: zm_on
  label: Main Zone On
  kind: action
  command: "ZMON\r"
- id: zm_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF\r"
- id: zm_status
  label: Main Zone Status Query
  kind: query
  command: "ZM?\r"
- id: zm_favorite1
  label: Favorite 1 Recall
  kind: action
  command: "ZMFAVORITE1\r"
- id: zm_favorite2
  label: Favorite 2 Recall
  kind: action
  command: "ZMFAVORITE2\r"
- id: zm_favorite3
  label: Favorite 3 Recall
  kind: action
  command: "ZMFAVORITE3\r"
- id: zm_favorite4
  label: Favorite 4 Recall
  kind: action
  command: "ZMFAVORITE4\r"
- id: zm_favorite1_memory
  label: Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY\r"
- id: zm_favorite2_memory
  label: Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY\r"
- id: zm_favorite3_memory
  label: Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY\r"
- id: zm_favorite4_memory
  label: Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY\r"
- id: sr_phono
  label: REC Select Phono
  kind: action
  command: "SRPHONO\r"
- id: sr_ipod
  label: REC Select iPod
  kind: action
  command: "SRIPOD\r"
- id: sr_usb_direct
  label: REC Select USB Direct
  kind: action
  command: "SRUSB DIRECT\r"
- id: sr_ipod_direct
  label: REC Select iPod Direct
  kind: action
  command: "SRIPOD DIRECT\r"
- id: sr_source
  label: REC Select Source (cancel)
  kind: action
  command: "SRSOURCE\r"
- id: sr_status
  label: REC Select Status Query
  kind: query
  command: "SR?\r"
- id: sd_auto
  label: Input Mode Auto
  kind: action
  command: "SDAUTO\r"
- id: sd_hdmi
  label: Input Mode HDMI
  kind: action
  command: "SDHDMI\r"
- id: sd_digital
  label: Input Mode Digital
  kind: action
  command: "SDDIGITAL\r"
- id: sd_analog
  label: Input Mode Analog
  kind: action
  command: "SDANALOG\r"
- id: sd_ext_in
  label: Input Mode Ext In
  kind: action
  command: "SDEXT.IN\r"
- id: sd_71in
  label: Input Mode 7.1 In
  kind: action
  command: "SD7.1IN\r"
- id: sd_no
  label: Input Mode No
  kind: action
  command: "SDNO\r"
- id: sd_status
  label: Input Mode Status Query
  kind: query
  command: "SD?\r"
- id: dc_auto
  label: Digital Input Auto
  kind: action
  command: "DCAUTO\r"
- id: dc_pcm
  label: Digital Input PCM
  kind: action
  command: "DCPCM\r"
- id: dc_dts
  label: Digital Input DTS
  kind: action
  command: "DCDTS\r"
- id: dc_status
  label: Digital Input Status Query
  kind: query
  command: "DC?\r"
- id: sv_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD\r"
- id: sv_bd
  label: Video Select Blu-ray
  kind: action
  command: "SVBD\r"
- id: sv_tv
  label: Video Select TV
  kind: action
  command: "SVTV\r"
- id: sv_satcbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL\r"
- id: sv_mplay
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY\r"
- id: sv_game
  label: Video Select Game
  kind: action
  command: "SVGAME\r"
- id: sv_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1\r"
- id: sv_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2\r"
- id: sv_aux3
  label: Video Select AUX3
  kind: action
  command: "SVAUX3\r"
- id: sv_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4\r"
- id: sv_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5\r"
- id: sv_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6\r"
- id: sv_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7\r"
- id: sv_cd
  label: Video Select CD
  kind: action
  command: "SVCD\r"
- id: sv_source
  label: Video Select Source (cancel)
  kind: action
  command: "SVSOURCE\r"
- id: sv_on
  label: Video Select On
  kind: action
  command: "SVON\r"
- id: sv_off
  label: Video Select Off
  kind: action
  command: "SVOFF\r"
- id: sv_status
  label: Video Select Status Query
  kind: query
  command: "SV?\r"
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF\r"
- id: slp_set
  label: Sleep Timer Set (001-120 min)
  kind: action
  command: "SLP{minutes}\r"
- id: slp_status
  label: Sleep Timer Status Query
  kind: query
  command: "SLP?\r"
- id: stby_15m
  label: Auto Standby 15M
  kind: action
  command: "STBY15M\r"
- id: stby_30m
  label: Auto Standby 30M
  kind: action
  command: "STBY30M\r"
- id: stby_60m
  label: Auto Standby 60M
  kind: action
  command: "STBY60M\r"
- id: stby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF\r"
- id: stby_status
  label: Auto Standby Status Query
  kind: query
  command: "STBY?\r"
- id: eco_on
  label: ECO Mode On
  kind: action
  command: "ECOON\r"
- id: eco_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO\r"
- id: eco_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF\r"
- id: eco_status
  label: ECO Mode Status Query
  kind: query
  command: "ECO?\r"
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE\r"
- id: ms_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC\r"
- id: ms_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME\r"
- id: ms_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT\r"
- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT\r"
- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO\r"
- id: ms_auto
  label: Surround Mode Auto
  kind: action
  command: "MSAUTO\r"
- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL\r"
- id: ms_dolby_pro_logic
  label: Surround Mode Dolby Pro Logic
  kind: action
  command: "MSDOLBY PRO LOGIC\r"
- id: ms_dolby_pl2_c
  label: Surround Mode Dolby PL2 C
  kind: action
  command: "MSDOLBY PL2 C\r"
- id: ms_dolby_pl2_m
  label: Surround Mode Dolby PL2 M
  kind: action
  command: "MSDOLBY PL2 M\r"
- id: ms_dolby_pl2_g
  label: Surround Mode Dolby PL2 G
  kind: action
  command: "MSDOLBY PL2 G\r"
- id: ms_dolby_pl2x_c
  label: Surround Mode Dolby PL2x C
  kind: action
  command: "MSDOLBY PL2X C\r"
- id: ms_dolby_pl2x_m
  label: Surround Mode Dolby PL2x M
  kind: action
  command: "MSDOLBY PL2X M\r"
- id: ms_dolby_pl2x_g
  label: Surround Mode Dolby PL2x G
  kind: action
  command: "MSDOLBY PL2X G\r"
- id: ms_dolby_pl2z_h
  label: Surround Mode Dolby PL2z H
  kind: action
  command: "MSDOLBY PL2Z H\r"
- id: ms_dolby_surround
  label: Surround Mode Dolby Surround
  kind: action
  command: "MSDOLBY SURROUND\r"
- id: ms_dolby_atmos
  label: Surround Mode Dolby Atmos
  kind: action
  command: "MSDOLBY ATMOS\r"
- id: ms_dolby_d_ex
  label: Surround Mode Dolby D EX
  kind: action
  command: "MSDOLBY D EX\r"
- id: ms_dolby_d_pl2x_c
  label: Surround Mode Dolby D+PL2x C
  kind: action
  command: "MSDOLBY D+PL2X C\r"
- id: ms_dolby_d_pl2x_m
  label: Surround Mode Dolby D+PL2x M
  kind: action
  command: "MSDOLBY D+PL2X M\r"
- id: ms_dolby_d_pl2z_h
  label: Surround Mode Dolby D+PL2z H
  kind: action
  command: "MSDOLBY D+PL2Z H\r"
- id: ms_dolby_d_ds
  label: Surround Mode Dolby D+DS
  kind: action
  command: "MSDOLBY D+DS\r"
- id: ms_dolby_d_neo_x_c
  label: Surround Mode Dolby D+NEO:X C
  kind: action
  command: "MSDOLBY D+NEO:X C\r"
- id: ms_dolby_d_neo_x_m
  label: Surround Mode Dolby D+NEO:X M
  kind: action
  command: "MSDOLBY D+NEO:X M\r"
- id: ms_dolby_d_neo_x_g
  label: Surround Mode Dolby D+NEO:X G
  kind: action
  command: "MSDOLBY D+NEO:X G\r"
- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND\r"
- id: ms_dts_es_dscrt61
  label: Surround Mode DTS ES DSCRT6.1
  kind: action
  command: "MSDTS ES DSCRT6.1\r"
- id: ms_dts_es_mtrx61
  label: Surround Mode DTS ES MTRX6.1
  kind: action
  command: "MSDTS ES MTRX6.1\r"
- id: ms_dts_pl2x_c
  label: Surround Mode DTS+PL2x C
  kind: action
  command: "MSDTS+PL2X C\r"
- id: ms_dts_pl2x_m
  label: Surround Mode DTS+PL2x M
  kind: action
  command: "MSDTS+PL2X M\r"
- id: ms_dts_pl2z_h
  label: Surround Mode DTS+PL2z H
  kind: action
  command: "MSDTS+PL2Z H\r"
- id: ms_dts_ds
  label: Surround Mode DTS+DS
  kind: action
  command: "MSDTS+DS\r"
- id: ms_dts96_24
  label: Surround Mode DTS96/24
  kind: action
  command: "MSDTS96/24\r"
- id: ms_dts96_es_mtrx
  label: Surround Mode DTS96 ES MTRX
  kind: action
  command: "MSDTS96 ES MTRX\r"
- id: ms_dts_neo6
  label: Surround Mode DTS+NEO:6
  kind: action
  command: "MSDTS+NEO:6\r"
- id: ms_dts_neo_x_c
  label: Surround Mode DTS+NEO:X C
  kind: action
  command: "MSDTS+NEO:X C\r"
- id: ms_dts_neo_x_m
  label: Surround Mode DTS+NEO:X M
  kind: action
  command: "MSDTS+NEO:X M\r"
- id: ms_dts_neo_x_g
  label: Surround Mode DTS+NEO:X G
  kind: action
  command: "MSDTS+NEO:X G\r"
- id: ms_multi_ch_in
  label: Surround Mode Multi Ch In
  kind: action
  command: "MSMULTI CH IN\r"
- id: ms_mch_in_dolby_ex
  label: Surround Mode M CH IN+Dolby EX
  kind: action
  command: "MSM CH IN+DOLBY EX\r"
- id: ms_mch_in_pl2x_c
  label: Surround Mode M CH IN+PL2x C
  kind: action
  command: "MSM CH IN+PL2X C\r"
- id: ms_mch_in_pl2x_m
  label: Surround Mode M CH IN+PL2x M
  kind: action
  command: "MSM CH IN+PL2X M\r"
- id: ms_mch_in_pl2z_h
  label: Surround Mode M CH IN+PL2z H
  kind: action
  command: "MSM CH IN+PL2Z H\r"
- id: ms_mch_in_ds
  label: Surround Mode M CH IN+DS
  kind: action
  command: "MSM CH IN+DS\r"
- id: ms_multi_ch_in_71
  label: Surround Mode Multi Ch In 7.1
  kind: action
  command: "MSMULTI CH IN 7.1\r"
- id: ms_mch_in_neo_x_c
  label: Surround Mode M CH IN+NEO:X C
  kind: action
  command: "MSM CH IN+NEO:X C\r"
- id: ms_mch_in_neo_x_m
  label: Surround Mode M CH IN+NEO:X M
  kind: action
  command: "MSM CH IN+NEO:X M\r"
- id: ms_mch_in_neo_x_g
  label: Surround Mode M CH IN+NEO:X G
  kind: action
  command: "MSM CH IN+NEO:X G\r"
- id: ms_dolby_dplus
  label: Surround Mode Dolby D+
  kind: action
  command: "MSDOLBY D+\r"
- id: ms_dolby_dplus_ex
  label: Surround Mode Dolby D+ +EX
  kind: action
  command: "MSDOLBY D+ +EX\r"
- id: ms_dolby_dplus_pl2x_c
  label: Surround Mode Dolby D+ +PL2x C
  kind: action
  command: "MSDOLBY D+ +PL2X C\r"
- id: ms_dolby_dplus_pl2x_m
  label: Surround Mode Dolby D+ +PL2x M
  kind: action
  command: "MSDOLBY D+ +PL2X M\r"
- id: ms_dolby_dplus_pl2z_h
  label: Surround Mode Dolby D+ +PL2z H
  kind: action
  command: "MSDOLBY D+ +PL2Z H\r"
- id: ms_dolby_dplus_ds
  label: Surround Mode Dolby D+ +DS
  kind: action
  command: "MSDOLBY D+ +DS\r"
- id: ms_dolby_dplus_neo_x_c
  label: Surround Mode Dolby D+ +NEO:X C
  kind: action
  command: "MSDOLBY D+ +NEO:X C\r"
- id: ms_dolby_dplus_neo_x_m
  label: Surround Mode Dolby D+ +NEO:X M
  kind: action
  command: "MSDOLBY D+ +NEO:X M\r"
- id: ms_dolby_dplus_neo_x_g
  label: Surround Mode Dolby D+ +NEO:X G
  kind: action
  command: "MSDOLBY D+ +NEO:X G\r"
- id: ms_dolby_hd
  label: Surround Mode Dolby HD
  kind: action
  command: "MSDOLBY HD\r"
- id: ms_dolby_hd_ex
  label: Surround Mode Dolby HD+EX
  kind: action
  command: "MSDOLBY HD+EX\r"
- id: ms_dolby_hd_pl2x_c
  label: Surround Mode Dolby HD+PL2x C
  kind: action
  command: "MSDOLBY HD+PL2X C\r"
- id: ms_dolby_hd_pl2x_m
  label: Surround Mode Dolby HD+PL2x M
  kind: action
  command: "MSDOLBY HD+PL2X M\r"
- id: ms_dolby_hd_pl2z_h
  label: Surround Mode Dolby HD+PL2z H
  kind: action
  command: "MSDOLBY HD+PL2Z H\r"
- id: ms_dolby_hd_ds
  label: Surround Mode Dolby HD+DS
  kind: action
  command: "MSDOLBY HD+DS\r"
- id: ms_dolby_hd_neo_x_c
  label: Surround Mode Dolby HD+NEO:X C
  kind: action
  command: "MSDOLBY HD+NEO:X C\r"
- id: ms_dolby_hd_neo_x_m
  label: Surround Mode Dolby HD+NEO:X M
  kind: action
  command: "MSDOLBY HD+NEO:X M\r"
- id: ms_dolby_hd_neo_x_g
  label: Surround Mode Dolby HD+NEO:X G
  kind: action
  command: "MSDOLBY HD+NEO:X G\r"
- id: ms_dts_hd
  label: Surround Mode DTS HD
  kind: action
  command: "MSDTS HD\r"
- id: ms_dts_hd_mstr
  label: Surround Mode DTS HD MSTR
  kind: action
  command: "MSDTS HD MSTR\r"
- id: ms_dts_hd_pl2x_c
  label: Surround Mode DTS HD+PL2x C
  kind: action
  command: "MSDTS HD+PL2X C\r"
- id: ms_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2x M
  kind: action
  command: "MSDTS HD+PL2X M\r"
- id: ms_dts_hd_pl2z_h
  label: Surround Mode DTS HD+PL2z H
  kind: action
  command: "MSDTS HD+PL2Z H\r"
- id: ms_dts_hd_neo6
  label: Surround Mode DTS HD+NEO:6
  kind: action
  command: "MSDTS HD+NEO:6\r"
- id: ms_dts_hd_ds
  label: Surround Mode DTS HD+DS
  kind: action
  command: "MSDTS HD+DS\r"
- id: ms_dts_hd_neo_x_c
  label: Surround Mode DTS HD+NEO:X C
  kind: action
  command: "MSDTS HD+NEO:X C\r"
- id: ms_dts_hd_neo_x_m
  label: Surround Mode DTS HD+NEO:X M
  kind: action
  command: "MSDTS HD+NEO:X M\r"
- id: ms_dts_hd_neo_x_g
  label: Surround Mode DTS HD+NEO:X G
  kind: action
  command: "MSDTS HD+NEO:X G\r"
- id: ms_dts_express
  label: Surround Mode DTS Express
  kind: action
  command: "MSDTS EXPRESS\r"
- id: ms_dts_es_8ch_dscrt
  label: Surround Mode DTS ES 8CH DSCRT
  kind: action
  command: "MSDTS ES 8CH DSCRT\r"
- id: ms_mpeg2_aac
  label: Surround Mode MPEG2 AAC
  kind: action
  command: "MSMPEG2 AAC\r"
- id: ms_aac_dolby_ex
  label: Surround Mode AAC+Dolby EX
  kind: action
  command: "MSAAC+DOLBY EX\r"
- id: ms_aac_pl2x_c
  label: Surround Mode AAC+PL2x C
  kind: action
  command: "MSAAC+PL2X C\r"
- id: ms_aac_pl2x_m
  label: Surround Mode AAC+PL2x M
  kind: action
  command: "MSAAC+PL2X M\r"
- id: ms_aac_pl2z_h
  label: Surround Mode AAC+PL2z H
  kind: action
  command: "MSAAC+PL2Z H\r"
- id: ms_aac_ds
  label: Surround Mode AAC+DS
  kind: action
  command: "MSAAC+DS\r"
- id: ms_aac_neo_x_c
  label: Surround Mode AAC+NEO:X C
  kind: action
  command: "MSAAC+NEO:X C\r"
- id: ms_aac_neo_x_m
  label: Surround Mode AAC+NEO:X M
  kind: action
  command: "MSAAC+NEO:X M\r"
- id: ms_aac_neo_x_g
  label: Surround Mode AAC+NEO:X G
  kind: action
  command: "MSAAC+NEO:X G\r"
- id: ms_pl_dsx
  label: Surround Mode PL DSX
  kind: action
  command: "MSPL DSX\r"
- id: ms_pl2_c_dsx
  label: Surround Mode PL2 C DSX
  kind: action
  command: "MSPL2 C DSX\r"
- id: ms_pl2_m_dsx
  label: Surround Mode PL2 M DSX
  kind: action
  command: "MSPL2 M DSX\r"
- id: ms_pl2_g_dsx
  label: Surround Mode PL2 G DSX
  kind: action
  command: "MSPL2 G DSX\r"
- id: ms_pl2x_c_dsx
  label: Surround Mode PL2x C DSX
  kind: action
  command: "MSPL2X C DSX\r"
- id: ms_pl2x_m_dsx
  label: Surround Mode PL2x M DSX
  kind: action
  command: "MSPL2X M DSX\r"
- id: ms_pl2x_g_dsx
  label: Surround Mode PL2x G DSX
  kind: action
  command: "MSPL2X G DSX\r"
- id: ms_audyssey_dsx
  label: Surround Mode Audyssey DSX
  kind: action
  command: "MSAUDYSSEY DSX\r"
- id: ms_auro3d
  label: Surround Mode Auro-3D
  kind: action
  command: "MSAURO3D\r"
- id: ms_auro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  command: "MSAURO2DSURR\r"
- id: ms_mch_stereo
  label: Surround Mode MCH Stereo
  kind: action
  command: "MSMCH STEREO\r"
- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  command: "MSWIDE SCREEN\r"
- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  command: "MSSUPER STADIUM\r"
- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA\r"
- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB\r"
- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  command: "MSCLASSIC CONCERT\r"
- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE\r"
- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX\r"
- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME\r"
- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL\r"
- id: ms_all_zone_stereo
  label: Surround Mode All Zone Stereo
  kind: action
  command: "MSALL ZONE STEREO\r"
- id: ms_71in
  label: Surround Mode 7.1 In
  kind: action
  command: "MS7.1IN\r"
- id: ms_pure_direct_ext
  label: Surround Mode Pure Direct Ext
  kind: action
  command: "MSPURE DIRECT EXT\r"
- id: ms_left
  label: Surround Mode Left (mono left ch)
  kind: action
  command: "MSLEFT\r"
- id: ms_right
  label: Surround Mode Right (mono right ch)
  kind: action
  command: "MSRIGHT\r"
- id: ms_status
  label: Surround Mode Status Query
  kind: query
  command: "MS?\r"
- id: ms_quick1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1\r"
- id: ms_quick2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2\r"
- id: ms_quick3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3\r"
- id: ms_quick4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4\r"
- id: ms_quick5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5\r"
- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY\r"
- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY\r"
- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY\r"
- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY\r"
- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY\r"
- id: ms_quick_status
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK?\r"
- id: vs_asp_nrm
  label: Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM\r"
- id: vs_asp_ful
  label: Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL\r"
- id: vs_asp_status
  label: Aspect Status Query
  kind: query
  command: "VSASP?\r"
- id: vs_moni_auto
  label: HDMI Monitor Auto
  kind: action
  command: "VSMONIAUTO\r"
- id: vs_moni1
  label: HDMI Monitor Out 1
  kind: action
  command: "VSMONI1\r"
- id: vs_moni2
  label: HDMI Monitor Out 2
  kind: action
  command: "VSMONI2\r"
- id: vs_moni_status
  label: Monitor Status Query
  kind: query
  command: "VSMONI?\r"
- id: vs_sc48p
  label: Resolution 480p/576p
  kind: action
  command: "VSSC48P\r"
- id: vs_sc10i
  label: Resolution 1080i
  kind: action
  command: "VSSC10I\r"
- id: vs_sc72p
  label: Resolution 720p
  kind: action
  command: "VSSC72P\r"
- id: vs_sc10p
  label: Resolution 1080p
  kind: action
  command: "VSSC10P\r"
- id: vs_sc10p24
  label: Resolution 1080p:24
  kind: action
  command: "VSSC10P24\r"
- id: vs_sc4k
  label: Resolution 4K
  kind: action
  command: "VSSC4K\r"
- id: vs_sc4kf
  label: Resolution 4K 60/50
  kind: action
  command: "VSSC4KF\r"
- id: vs_scauto
  label: Resolution Auto
  kind: action
  command: "VSSCAUTO\r"
- id: vs_sc_status
  label: Resolution Status Query
  kind: query
  command: "VSSC?\r"
- id: vs_sch48p
  label: HDMI Resolution 480p/576p
  kind: action
  command: "VSSCH48P\r"
- id: vs_sch10i
  label: HDMI Resolution 1080i
  kind: action
  command: "VSSCH10I\r"
- id: vs_sch72p
  label: HDMI Resolution 720p
  kind: action
  command: "VSSCH72P\r"
- id: vs_sch10p
  label: HDMI Resolution 1080p
  kind: action
  command: "VSSCH10P\r"
- id: vs_sch10p24
  label: HDMI Resolution 1080p:24
  kind: action
  command: "VSSCH10P24\r"
- id: vs_sch4k
  label: HDMI Resolution 4K
  kind: action
  command: "VSSCH4K\r"
- id: vs_sch4kf
  label: HDMI Resolution 4K 60/50
  kind: action
  command: "VSSCH4KF\r"
- id: vs_schauto
  label: HDMI Resolution Auto
  kind: action
  command: "VSSCHAUTO\r"
- id: vs_sch_status
  label: HDMI Resolution Status Query
  kind: query
  command: "VSSCH?\r"
- id: vs_audio_amp
  label: HDMI Audio Out to AMP
  kind: action
  command: "VSAUDIO AMP\r"
- id: vs_audio_tv
  label: HDMI Audio Out to TV
  kind: action
  command: "VSAUDIO TV\r"
- id: vs_audio_status
  label: HDMI Audio Out Status Query
  kind: query
  command: "VSAUDIO?\r"
- id: vs_vpm_auto
  label: VPM Auto
  kind: action
  command: "VSVPMAUTO\r"
- id: vs_vpm_game
  label: VPM Game
  kind: action
  command: "VSVPMGAME\r"
- id: vs_vpm_movi
  label: VPM Movie
  kind: action
  command: "VSVPMMOVI\r"
- id: vs_vpm_status
  label: VPM Status Query
  kind: query
  command: "VSVPM?\r"
- id: vs_vst_on
  label: Vertical Stretch On
  kind: action
  command: "VSVST ON\r"
- id: vs_vst_off
  label: Vertical Stretch Off
  kind: action
  command: "VSVST OFF\r"
- id: vs_vst_status
  label: VST Status Query
  kind: query
  command: "VSVST?\r"
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON\r"
- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF\r"
- id: ps_tone_ctrl_status
  label: Tone Control Status Query
  kind: query
  command: "PSTONE CTRL?\r"
- id: ps_bas_up
  label: Bass Up
  kind: action
  command: "PSBAS UP\r"
- id: ps_bas_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN\r"
- id: ps_bas_set
  label: Bass Set (00-99, 50=0dB)
  kind: action
  command: "PSBAS {value}\r"
- id: ps_bas_status
  label: Bass Status Query
  kind: query
  command: "PSBAS?\r"
- id: ps_tre_up
  label: Treble Up
  kind: action
  command: "PSTRE UP\r"
- id: ps_tre_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN\r"
- id: ps_tre_set
  label: Treble Set (00-99, 50=0dB)
  kind: action
  command: "PSTRE {value}\r"
- id: ps_tre_status
  label: Treble Status Query
  kind: query
  command: "PSTRE?\r"
- id: ps_dil_on
  label: Dialog Level On
  kind: action
  command: "PSDIL ON\r"
- id: ps_dil_off
  label: Dialog Level Off
  kind: action
  command: "PSDIL OFF\r"
- id: ps_dil_up
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP\r"
- id: ps_dil_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN\r"
- id: ps_dil_set
  label: Dialog Level Set (38-62)
  kind: action
  command: "PSDIL {value}\r"
- id: ps_dil_status
  label: Dialog Level Status Query
  kind: query
  command: "PSDIL?\r"
- id: ps_swl_on
  label: Subwoofer Level On
  kind: action
  command: "PSSWL ON\r"
- id: ps_swl_off
  label: Subwoofer Level Off
  kind: action
  command: "PSSWL OFF\r"
- id: ps_swl_up
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP\r"
- id: ps_swl_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN\r"
- id: ps_swl_set
  label: Subwoofer Level Set (00,38-62)
  kind: action
  command: "PSSWL {value}\r"
- id: ps_swl2_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP\r"
- id: ps_swl2_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN\r"
- id: ps_swl2_set
  label: Subwoofer 2 Level Set
  kind: action
  command: "PSSWL2 {value}\r"
- id: ps_swl_status
  label: Subwoofer Level Status Query
  kind: query
  command: "PSSWL?\r"
- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON\r"
- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF\r"
- id: ps_cinema_eq_status
  label: Cinema EQ Status Query
  kind: query
  command: "PSCINEMA EQ.?\r"
- id: ps_mode_music
  label: Decoder Mode Music
  kind: action
  command: "PSMODE:MUSIC\r"
- id: ps_mode_cinema
  label: Decoder Mode Cinema
  kind: action
  command: "PSMODE:CINEMA\r"
- id: ps_mode_game
  label: Decoder Mode Game
  kind: action
  command: "PSMODE:GAME\r"
- id: ps_mode_pro_logic
  label: Decoder Mode Pro Logic
  kind: action
  command: "PSMODE:PRO LOGIC\r"
- id: ps_mode_status
  label: Decoder Mode Status Query
  kind: query
  command: "PSMODE:?\r"
- id: ps_lom_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON\r"
- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF\r"
- id: ps_lom_status
  label: Loudness Management Status Query
  kind: query
  command: "PSLOM?\r"
- id: ps_fh_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON\r"
- id: ps_fh_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF\r"
- id: ps_fh_status
  label: Front Height Status Query
  kind: query
  command: "PSFH:?\r"
- id: ps_sp_fw
  label: Speaker Output F.Wide
  kind: action
  command: "PSSP:FW\r"
- id: ps_sp_fh
  label: Speaker Output F.Height
  kind: action
  command: "PSSP:FH\r"
- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  command: "PSSP:SB\r"
- id: ps_sp_hw
  label: Speaker Output SB + F.Height
  kind: action
  command: "PSSP:HW\r"
- id: ps_sp_bh
  label: Speaker Output SB + F.Height (alt)
  kind: action
  command: "PSSP:BH\r"
- id: ps_sp_bw
  label: Speaker Output SB + F.Wide
  kind: action
  command: "PSSP:BW\r"
- id: ps_sp_fl
  label: Speaker Output Floor Sp Layout
  kind: action
  command: "PSSP:FL\r"
- id: ps_sp_hf
  label: Speaker Output Floor Sp Layout (alt)
  kind: action
  command: "PSSP:HF\r"
- id: ps_sp_fr
  label: Speaker Output Floor Front
  kind: action
  command: "PSSP:FR\r"
- id: ps_sp_status
  label: Speaker Output Status Query
  kind: query
  command: "PSSP?\r"
- id: ps_phg_low
  label: PL2z Height Gain Low
  kind: action
  command: "PSPHG LOW\r"
- id: ps_phg_mid
  label: PL2z Height Gain Mid
  kind: action
  command: "PSPHG MID\r"
- id: ps_phg_hi
  label: PL2z Height Gain Hi
  kind: action
  command: "PSPHG HI\r"
- id: ps_phg_status
  label: PL2z Height Gain Status Query
  kind: query
  command: "PSPHG?\r"
- id: ps_multeq_audyssey
  label: MultEQ Audyssey
  kind: action
  command: "PSMULTEQ:AUDYSSEY\r"
- id: ps_multeq_byplr
  label: MultEQ Bypass L/R
  kind: action
  command: "PSMULTEQ:BYP.LR\r"
- id: ps_multeq_flat
  label: MultEQ Flat
  kind: action
  command: "PSMULTEQ:FLAT\r"
- id: ps_multeq_manual
  label: MultEQ Manual
  kind: action
  command: "PSMULTEQ:MANUAL\r"
- id: ps_multeq_off
  label: MultEQ Off
  kind: action
  command: "PSMULTEQ:OFF\r"
- id: ps_multeq_status
  label: MultEQ Status Query
  kind: query
  command: "PSMULTEQ?\r"
- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON\r"
- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF\r"
- id: ps_dyneq_status
  label: Dynamic EQ Status Query
  kind: query
  command: "PSDYNEQ?\r"
- id: ps_reflev_0
  label: Reference Level 0dB
  kind: action
  command: "PSREFLEV 0\r"
- id: ps_reflev_5
  label: Reference Level 5dB
  kind: action
  command: "PSREFLEV 5\r"
- id: ps_reflev_10
  label: Reference Level 10dB
  kind: action
  command: "PSREFLEV 10\r"
- id: ps_reflev_15
  label: Reference Level 15dB
  kind: action
  command: "PSREFLEV 15\r"
- id: ps_reflev_status
  label: Reference Level Status Query
  kind: query
  command: "PSREFLEV?\r"
- id: ps_dynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV\r"
- id: ps_dynvol_med
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED\r"
- id: ps_dynvol_lit
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT\r"
- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF\r"
- id: ps_dynvol_status
  label: Dynamic Volume Status Query
  kind: query
  command: "PSDYNVOL?\r"
- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON\r"
- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF\r"
- id: ps_lfc_status
  label: Audyssey LFC Status Query
  kind: query
  command: "PSLFC?\r"
- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP\r"
- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN\r"
- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {value}\r"
- id: ps_cntamt_status
  label: Containment Amount Status Query
  kind: query
  command: "PSCNTAMT?\r"
- id: ps_dsx_onhw
  label: Audyssey DSX On (Height+Wide)
  kind: action
  command: "PSDSX ONHW\r"
- id: ps_dsx_onh
  label: Audyssey DSX On (Height)
  kind: action
  command: "PSDSX ONH\r"
- id: ps_dsx_onw
  label: Audyssey DSX On (Wide)
  kind: action
  command: "PSDSX ONW\r"
- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF\r"
- id: ps_dsx_status
  label: Audyssey DSX Status Query
  kind: query
  command: "PSDSX?\r"
- id: ps_stw_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP\r"
- id: ps_stw_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN\r"
- id: ps_stw_set
  label: Stage Width Set (40-60)
  kind: action
  command: "PSSTW {value}\r"
- id: ps_stw_status
  label: Stage Width Status Query
  kind: query
  command: "PSSTW?\r"
- id: ps_sth_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP\r"
- id: ps_sth_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN\r"
- id: ps_sth_set
  label: Stage Height Set (40-60)
  kind: action
  command: "PSSTH {value}\r"
- id: ps_sth_status
  label: Stage Height Status Query
  kind: query
  command: "PSSTH?\r"
- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON\r"
- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF\r"
- id: ps_geq_status
  label: Graphic EQ Status Query
  kind: query
  command: "PSGEQ?\r"
- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  command: "PSDRC AUTO\r"
- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  command: "PSDRC LOW\r"
- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  command: "PSDRC MID\r"
- id: ps_drc_hi
  label: Dynamic Compression Hi
  kind: action
  command: "PSDRC HI\r"
- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  command: "PSDRC OFF\r"
- id: ps_drc_status
  label: Dynamic Compression Status Query
  kind: query
  command: "PSDRC?\r"
- id: ps_bsc_up
  label: Bass Sync Up (0-16)
  kind: action
  command: "PSBSC UP\r"
- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN\r"
- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC {value}\r"
- id: ps_bsc_status
  label: Bass Sync Status Query
  kind: query
  command: "PSBSC?\r"
- id: ps_deh_off
  label: Dialogue Enhancer Off
  kind: action
  command: "PSDEH OFF\r"
- id: ps_deh_low
  label: Dialogue Enhancer Low
  kind: action
  command: "PSDEH LOW\r"
- id: ps_deh_med
  label: Dialogue Enhancer Medium
  kind: action
  command: "PSDEH MED\r"
- id: ps_deh_high
  label: Dialogue Enhancer High
  kind: action
  command: "PSDEH HIGH\r"
- id: ps_deh_status
  label: Dialogue Enhancer Status Query
  kind: query
  command: "PSDEH?\r"
- id: ps_lfe_up
  label: LFE Up (0..-10dB)
  kind: action
  command: "PSLFE UP\r"
- id: ps_lfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN\r"
- id: ps_lfe_set
  label: LFE Set
  kind: action
  command: "PSLFE {value}\r"
- id: ps_lfe_status
  label: LFE Status Query
  kind: query
  command: "PSLFE?\r"
- id: ps_lfl_00
  label: LFE Level (EXT.IN/7.1) 00
  kind: action
  command: "PSLFL 00\r"
- id: ps_lfl_05
  label: LFE Level (EXT.IN/7.1) 05
  kind: action
  command: "PSLFL 05\r"
- id: ps_lfl_10
  label: LFE Level (EXT.IN/7.1) 10
  kind: action
  command: "PSLFL 10\r"
- id: ps_lfl_15
  label: LFE Level (EXT.IN/7.1) 15
  kind: action
  command: "PSLFL 15\r"
- id: ps_lfl_status
  label: LFE Level (EXT.IN/7.1) Status Query
  kind: query
  command: "PSLFL?\r"
- id: ps_eff_on
  label: Effect On
  kind: action
  command: "PSEFF ON\r"
- id: ps_eff_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF\r"
- id: ps_eff_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP\r"
- id: ps_eff_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN\r"
- id: ps_eff_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {value}\r"
- id: ps_eff_status
  label: Effect Status Query
  kind: query
  command: "PSEFF?\r"
- id: ps_del_up
  label: Delay Up (0-300ms)
  kind: action
  command: "PSDEL UP\r"
- id: ps_del_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN\r"
- id: ps_del_set
  label: Delay Set
  kind: action
  command: "PSDEL {value}\r"
- id: ps_del_status
  label: Delay Status Query
  kind: query
  command: "PSDEL?\r"
- id: ps_pan_on
  label: Panorama On
  kind: action
  command: "PSPAN ON\r"
- id: ps_pan_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF\r"
- id: ps_pan_status
  label: Panorama Status Query
  kind: query
  command: "PSPAN?\r"
- id: ps_dim_up
  label: Dimension Up (0-6)
  kind: action
  command: "PSDIM UP\r"
- id: ps_dim_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN\r"
- id: ps_dim_set
  label: Dimension Set
  kind: action
  command: "PSDIM {value}\r"
- id: ps_dim_status
  label: Dimension Status Query
  kind: query
  command: "PSDIM?\r"
- id: ps_cen_up
  label: Center Width Up (0-7)
  kind: action
  command: "PSCEN UP\r"
- id: ps_cen_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN\r"
- id: ps_cen_set
  label: Center Width Set
  kind: action
  command: "PSCEN {value}\r"
- id: ps_cen_status
  label: Center Width Status Query
  kind: query
  command: "PSCEN?\r"
- id: ps_cei_up
  label: Center Image Up (0.0-1.0)
  kind: action
  command: "PSCEI UP\r"
- id: ps_cei_down
  label: Center Image Down
  kind: action
  command: "PSCEI DOWN\r"
- id: ps_cei_set
  label: Center Image Set
  kind: action
  command: "PSCEI {value}\r"
- id: ps_cei_status
  label: Center Image Status Query
  kind: query
  command: "PSCEI?\r"
- id: ps_ceg_up
  label: Center Gain Up (0.0-1.0)
  kind: action
  command: "PSCEG UP\r"
- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN\r"
- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  command: "PSCEG {value}\r"
- id: ps_ceg_status
  label: Center Gain Status Query
  kind: query
  command: "PSCEG?\r"
- id: ps_ces_on
  label: Center Spread On
  kind: action
  command: "PSCES ON\r"
- id: ps_ces_off
  label: Center Spread Off
  kind: action
  command: "PSCES OFF\r"
- id: ps_ces_status
  label: Center Spread Status Query
  kind: query
  command: "PSCES?\r"
- id: ps_swr_on
  label: Subwoofer On (DIRECT/STEREO 2ch)
  kind: action
  command: "PSSWR ON\r"
- id: ps_swr_off
  label: Subwoofer Off
  kind: action
  command: "PSSWR OFF\r"
- id: ps_swr_status
  label: Subwoofer (DIRECT/STEREO) Status Query
  kind: query
  command: "PSSWR?\r"
- id: ps_rsz_s
  label: Room Size Small
  kind: action
  command: "PSRSZ S\r"
- id: ps_rsz_ms
  label: Room Size Medium-Small
  kind: action
  command: "PSRSZ MS\r"
- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M\r"
- id: ps_rsz_ml
  label: Room Size Medium-Large
  kind: action
  command: "PSRSZ ML\r"
- id: ps_rsz_l
  label: Room Size Large
  kind: action
  command: "PSRSZ L\r"
- id: ps_rsz_status
  label: Room Size Status Query
  kind: query
  command: "PSRSZ?\r"
- id: ps_delay_up
  label: Audio Delay Up (0-200ms)
  kind: action
  command: "PSDELAY UP\r"
- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  command: "PSDELAY DOWN\r"
- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {value}\r"
- id: ps_delay_status
  label: Audio Delay Status Query
  kind: query
  command: "PSDELAY?\r"
- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF\r"
- id: ps_rstr_low
  label: Audio Restorer Low
  kind: action
  command: "PSRSTR LOW\r"
- id: ps_rstr_med
  label: Audio Restorer Medium
  kind: action
  command: "PSRSTR MED\r"
- id: ps_rstr_hi
  label: Audio Restorer Hi
  kind: action
  command: "PSRSTR HI\r"
- id: ps_rstr_status
  label: Audio Restorer Status Query
  kind: query
  command: "PSRSTR?\r"
- id: ps_front_spa
  label: Front Speaker A
  kind: action
  command: "PSFRONT SPA\r"
- id: ps_front_spb
  label: Front Speaker B
  kind: action
  command: "PSFRONT SPB\r"
- id: ps_front_ab
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B\r"
- id: ps_front_status
  label: Front Speaker Status Query
  kind: query
  command: "PSFRONT?\r"
- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  command: "PSAUROPR SMA\r"
- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  command: "PSAUROPR MED\r"
- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  command: "PSAUROPR LAR\r"
- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Speech
  kind: action
  command: "PSAUROPR SPE\r"
- id: ps_auropr_status
  label: Auro-Matic 3D Preset Status Query
  kind: query
  command: "PSAUROPR?\r"
- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP\r"
- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN\r"
- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: "PSAUROST {value}\r"
- id: ps_aurost_status
  label: Auro-Matic 3D Strength Status Query
  kind: query
  command: "PSAUROST?\r"
- id: pv_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF\r"
- id: pv_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD\r"
- id: pv_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV\r"
- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD\r"
- id: pv_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM\r"
- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM\r"
- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  command: "PVDAY\r"
- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  command: "PVNGT\r"
- id: pv_status
  label: Picture Mode Status Query
  kind: query
  command: "PV?\r"
- id: pv_cn_up
  label: Picture Contrast Up
  kind: action
  command: "PVCN UP\r"
- id: pv_cn_down
  label: Picture Contrast Down
  kind: action
  command: "PVCN DOWN\r"
- id: pv_cn_set
  label: Picture Contrast Set (000-100, 050=0)
  kind: action
  command: "PVCN {value}\r"
- id: pv_cn_status
  label: Picture Contrast Status Query
  kind: query
  command: "PVCN?\r"
- id: pv_br_up
  label: Picture Brightness Up
  kind: action
  command: "PVBR UP\r"
- id: pv_br_down
  label: Picture Brightness Down
  kind: action
  command: "PVBR DOWN\r"
- id: pv_br_set
  label: Picture Brightness Set (000-100, 050=0)
  kind: action
  command: "PVBR {value}\r"
- id: pv_br_status
  label: Picture Brightness Status Query
  kind: query
  command: "PVBR?\r"
- id: pv_st_up
  label: Picture Saturation Up
  kind: action
  command: "PVST UP\r"
- id: pv_st_down
  label: Picture Saturation Down
  kind: action
  command: "PVST DOWN\r"
- id: pv_st_set
  label: Picture Saturation Set (000-100, 050=0)
  kind: action
  command: "PVST {value}\r"
- id: pv_st_status
  label: Picture Saturation Status Query
  kind: query
  command: "PVST?\r"
- id: pv_hue_up
  label: Picture Hue Up
  kind: action
  command: "PVHUE UP\r"
- id: pv_hue_down
  label: Picture Hue Down
  kind: action
  command: "PVHUE DOWN\r"
- id: pv_hue_set
  label: Picture Hue Set (44-56)
  kind: action
  command: "PVHUE {value}\r"
- id: pv_hue_status
  label: Picture Hue Status Query
  kind: query
  command: "PVHUE?\r"
- id: pv_dnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF\r"
- id: pv_dnr_low
  label: DNR Low
  kind: action
  command: "PVDNR LOW\r"
- id: pv_dnr_mid
  label: DNR Mid
  kind: action
  command: "PVDNR MID\r"
- id: pv_dnr_hi
  label: DNR Hi
  kind: action
  command: "PVDNR HI\r"
- id: pv_dnr_status
  label: DNR Status Query
  kind: query
  command: "PVDNR?\r"
- id: pv_enh_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP\r"
- id: pv_enh_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN\r"
- id: pv_enh_set
  label: Enhancer Set
  kind: action
  command: "PVENH {value}\r"
- id: pv_enh_status
  label: Enhancer Status Query
  kind: query
  command: "PVENH?\r"
- id: z2_source
  label: Z2 Source (cancel, follow Main)
  kind: action
  command: "Z2SOURCE\r"
- id: z2_phono
  label: Z2 Select Phono
  kind: action
  command: "Z2PHONO\r"
- id: z2_cd
  label: Z2 Select CD
  kind: action
  command: "Z2CD\r"
- id: z2_tuner
  label: Z2 Select Tuner
  kind: action
  command: "Z2TUNER\r"
- id: z2_dvd
  label: Z2 Select DVD
  kind: action
  command: "Z2DVD\r"
- id: z2_bd
  label: Z2 Select Blu-ray
  kind: action
  command: "Z2BD\r"
- id: z2_tv
  label: Z2 Select TV
  kind: action
  command: "Z2TV\r"
- id: z2_satcbl
  label: Z2 Select SAT/CBL
  kind: action
  command: "Z2SAT/CBL\r"
- id: z2_mplay
  label: Z2 Select Media Player
  kind: action
  command: "Z2MPLAY\r"
- id: z2_game
  label: Z2 Select Game
  kind: action
  command: "Z2GAME\r"
- id: z2_hdradio
  label: Z2 Select HD Radio
  kind: action
  command: "Z2HDRADIO\r"
- id: z2_net
  label: Z2 Select Network
  kind: action
  command: "Z2NET\r"
- id: z2_pandora
  label: Z2 Select Pandora
  kind: action
  command: "Z2PANDORA\r"
- id: z2_siriusxm
  label: Z2 Select SiriusXM
  kind: action
  command: "Z2SIRIUSXM\r"
- id: z2_spotify
  label: Z2 Select Spotify
  kind: action
  command: "Z2SPOTIFY\r"
- id: z2_lastfm
  label: Z2 Select Last.fm
  kind: action
  command: "Z2LASTFM\r"
- id: z2_flickr
  label: Z2 Select Flickr
  kind: action
  command: "Z2FLICKR\r"
- id: z2_iradio
  label: Z2 Select iRadio
  kind: action
  command: "Z2IRADIO\r"
- id: z2_server
  label: Z2 Select Media Server
  kind: action
  command: "Z2SERVER\r"
- id: z2_favorites
  label: Z2 Select Favorites
  kind: action
  command: "Z2FAVORITES\r"
- id: z2_aux1
  label: Z2 Select AUX1
  kind: action
  command: "Z2AUX1\r"
- id: z2_aux2
  label: Z2 Select AUX2
  kind: action
  command: "Z2AUX2\r"
- id: z2_aux3
  label: Z2 Select AUX3
  kind: action
  command: "Z2AUX3\r"
- id: z2_aux4
  label: Z2 Select AUX4
  kind: action
  command: "Z2AUX4\r"
- id: z2_aux5
  label: Z2 Select AUX5
  kind: action
  command: "Z2AUX5\r"
- id: z2_aux6
  label: Z2 Select AUX6
  kind: action
  command: "Z2AUX6\r"
- id: z2_aux7
  label: Z2 Select AUX7
  kind: action
  command: "Z2AUX7\r"
- id: z2_bt
  label: Z2 Select Bluetooth
  kind: action
  command: "Z2BT\r"
- id: z2_usb_ipod
  label: Z2 Select USB/iPod
  kind: action
  command: "Z2USB/IPOD\r"
- id: z2_usb
  label: Z2 Select USB + Play
  kind: action
  command: "Z2USB\r"
- id: z2_ipd
  label: Z2 Select iPod Direct
  kind: action
  command: "Z2IPD\r"
- id: z2_irp
  label: Z2 Select iRadio Recent
  kind: action
  command: "Z2IRP\r"
- id: z2_fvp
  label: Z2 Select Favorites Play
  kind: action
  command: "Z2FVP\r"
- id: z2_quick1
  label: Z2 Quick Select 1
  kind: action
  command: "Z2QUICK1\r"
- id: z2_quick2
  label: Z2 Quick Select 2
  kind: action
  command: "Z2QUICK2\r"
- id: z2_quick3
  label: Z2 Quick Select 3
  kind: action
  command: "Z2QUICK3\r"
- id: z2_quick4
  label: Z2 Quick Select 4
  kind: action
  command: "Z2QUICK4\r"
- id: z2_quick5
  label: Z2 Quick Select 5
  kind: action
  command: "Z2QUICK5\r"
- id: z2_quick1_memory
  label: Z2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY\r"
- id: z2_quick2_memory
  label: Z2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY\r"
- id: z2_quick3_memory
  label: Z2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY\r"
- id: z2_quick4_memory
  label: Z2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY\r"
- id: z2_quick5_memory
  label: Z2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY\r"
- id: z2_quick_status
  label: Z2 Quick Status Query
  kind: query
  command: "Z2QUICK?\r"
- id: z2_favorite1
  label: Z2 Favorite 1 Recall
  kind: action
  command: "Z2FAVORITE1\r"
- id: z2_favorite2
  label: Z2 Favorite 2 Recall
  kind: action
  command: "Z2FAVORITE2\r"
- id: z2_favorite3
  label: Z2 Favorite 3 Recall
  kind: action
  command: "Z2FAVORITE3\r"
- id: z2_favorite4
  label: Z2 Favorite 4 Recall
  kind: action
  command: "Z2FAVORITE4\r"
- id: z2_favorite1_memory
  label: Z2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY\r"
- id: z2_favorite2_memory
  label: Z2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY\r"
- id: z2_favorite3_memory
  label: Z2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY\r"
- id: z2_favorite4_memory
  label: Z2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY\r"
- id: z2_vol_up
  label: Z2 Volume Up
  kind: action
  command: "Z2UP\r"
- id: z2_vol_down
  label: Z2 Volume Down
  kind: action
  command: "Z2DOWN\r"
- id: z2_vol_set
  label: Z2 Volume Set (00-98, 80=0dB)
  kind: action
  command: "Z2{level}\r"
- id: z2_on
  label: Z2 On
  kind: action
  command: "Z2ON\r"
- id: z2_off
  label: Z2 Off
  kind: action
  command: "Z2OFF\r"
- id: z2_status
  label: Z2 Status Query
  kind: query
  command: "Z2?\r"
- id: z2_mute_on
  label: Z2 Mute On
  kind: action
  command: "Z2MUON\r"
- id: z2_mute_off
  label: Z2 Mute Off
  kind: action
  command: "Z2MUOFF\r"
- id: z2_mute_status
  label: Z2 Mute Status Query
  kind: query
  command: "Z2MU?\r"
- id: z2_cs_st
  label: Z2 Channel Stereo
  kind: action
  command: "Z2CSST\r"
- id: z2_cs_mono
  label: Z2 Channel Mono
  kind: action
  command: "Z2CSMONO\r"
- id: z2_cs_status
  label: Z2 Channel Status Query
  kind: query
  command: "Z2CS?\r"
- id: z2_cv_fl_up
  label: Z2 CV Front L Up
  kind: action
  command: "Z2CVFL UP\r"
- id: z2_cv_fl_down
  label: Z2 CV Front L Down
  kind: action
  command: "Z2CVFL DOWN\r"
- id: z2_cv_fl_set
  label: Z2 CV Front L Set (38-62)
  kind: action
  command: "Z2CVFL {value}\r"
- id: z2_cv_fr_up
  label: Z2 CV Front R Up
  kind: action
  command: "Z2CVFR UP\r"
- id: z2_cv_fr_down
  label: Z2 CV Front R Down
  kind: action
  command: "Z2CVFR DOWN\r"
- id: z2_cv_fr_set
  label: Z2 CV Front R Set
  kind: action
  command: "Z2CVFR {value}\r"
- id: z2_cv_status
  label: Z2 CV Status Query
  kind: query
  command: "Z2CV?\r"
- id: z2_hpf_on
  label: Z2 HPF On
  kind: action
  command: "Z2HPFON\r"
- id: z2_hpf_off
  label: Z2 HPF Off
  kind: action
  command: "Z2HPFOFF\r"
- id: z2_hpf_status
  label: Z2 HPF Status Query
  kind: query
  command: "Z2HPF?\r"
- id: z2_ps_bas_up
  label: Z2 Bass Up
  kind: action
  command: "Z2PSBAS UP\r"
- id: z2_ps_bas_down
  label: Z2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN\r"
- id: z2_ps_bas_set
  label: Z2 Bass Set
  kind: action
  command: "Z2PSBAS {value}\r"
- id: z2_ps_bas_status
  label: Z2 Bass Status Query
  kind: query
  command: "Z2PSBAS?\r"
- id: z2_ps_tre_up
  label: Z2 Treble Up
  kind: action
  command: "Z2PSTRE UP\r"
- id: z2_ps_tre_down
  label: Z2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN\r"
- id: z2_ps_tre_set
  label: Z2 Treble Set
  kind: action
  command: "Z2PSTRE {value}\r"
- id: z2_ps_tre_status
  label: Z2 Treble Status Query
  kind: query
  command: "Z2PSTRE?\r"
- id: z2_hda_thr
  label: Z2 HDMI Audio Through
  kind: action
  command: "Z2HDA THR\r"
- id: z2_hda_pcm
  label: Z2 HDMI Audio PCM
  kind: action
  command: "Z2HDA PCM\r"
- id: z2_hda_status
  label: Z2 HDA Status Query
  kind: query
  command: "Z2HDA?\r"
- id: z2_slp_off
  label: Z2 Sleep Off
  kind: action
  command: "Z2SLPOFF\r"
- id: z2_slp_set
  label: Z2 Sleep Set (001-120)
  kind: action
  command: "Z2SLP{minutes}\r"
- id: z2_slp_status
  label: Z2 Sleep Status Query
  kind: query
  command: "Z2SLP?\r"
- id: z2_stby_2h
  label: Z2 Auto Standby 2H
  kind: action
  command: "Z2STBY2H\r"
- id: z2_stby_4h
  label: Z2 Auto Standby 4H
  kind: action
  command: "Z2STBY4H\r"
- id: z2_stby_8h
  label: Z2 Auto Standby 8H
  kind: action
  command: "Z2STBY8H\r"
- id: z2_stby_off
  label: Z2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF\r"
- id: z2_stby_status
  label: Z2 Auto Standby Status Query
  kind: query
  command: "Z2STBY?\r"
- id: z3_source
  label: Z3 Source (cancel, follow Main)
  kind: action
  command: "Z3SOURCE\r"
- id: z3_phono
  label: Z3 Select Phono
  kind: action
  command: "Z3PHONO\r"
- id: z3_cd
  label: Z3 Select CD
  kind: action
  command: "Z3CD\r"
- id: z3_tuner
  label: Z3 Select Tuner
  kind: action
  command: "Z3TUNER\r"
- id: z3_dvd
  label: Z3 Select DVD
  kind: action
  command: "Z3DVD\r"
- id: z3_bd
  label: Z3 Select Blu-ray
  kind: action
  command: "Z3BD\r"
- id: z3_tv
  label: Z3 Select TV
  kind: action
  command: "Z3TV\r"
- id: z3_satcbl
  label: Z3 Select SAT/CBL
  kind: action
  command: "Z3SAT/CBL\r"
- id: z3_mplay
  label: Z3 Select Media Player
  kind: action
  command: "Z3MPLAY\r"
- id: z3_game
  label: Z3 Select Game
  kind: action
  command: "Z3GAME\r"
- id: z3_hdradio
  label: Z3 Select HD Radio
  kind: action
  command: "Z3HDRADIO\r"
- id: z3_net
  label: Z3 Select Network
  kind: action
  command: "Z3NET\r"
- id: z3_pandora
  label: Z3 Select Pandora
  kind: action
  command: "Z3PANDORA\r"
- id: z3_siriusxm
  label: Z3 Select SiriusXM
  kind: action
  command: "Z3SIRIUSXM\r"
- id: z3_spotify
  label: Z3 Select Spotify
  kind: action
  command: "Z3SPOTIFY\r"
- id: z3_lastfm
  label: Z3 Select Last.fm
  kind: action
  command: "Z3LASTFM\r"
- id: z3_flickr
  label: Z3 Select Flickr
  kind: action
  command: "Z3FLICKR\r"
- id: z3_iradio
  label: Z3 Select iRadio
  kind: action
  command: "Z3IRADIO\r"
- id: z3_server
  label: Z3 Select Media Server
  kind: action
  command: "Z3SERVER\r"
- id: z3_favorites
  label: Z3 Select Favorites
  kind: action
  command: "Z3FAVORITES\r"
- id: z3_aux1
  label: Z3 Select AUX1
  kind: action
  command: "Z3AUX1\r"
- id: z3_aux2
  label: Z3 Select AUX2
  kind: action
  command: "Z3AUX2\r"
- id: z3_aux3
  label: Z3 Select AUX3
  kind: action
  command: "Z3AUX3\r"
- id: z3_aux4
  label: Z3 Select AUX4
  kind: action
  command: "Z3AUX4\r"
- id: z3_aux5
  label: Z3 Select AUX5
  kind: action
  command: "Z3AUX5\r"
- id: z3_aux6
  label: Z3 Select AUX6
  kind: action
  command: "Z3AUX6\r"
- id: z3_aux7
  label: Z3 Select AUX7
  kind: action
  command: "Z3AUX7\r"
- id: z3_bt
  label: Z3 Select Bluetooth
  kind: action
  command: "Z3BT\r"
- id: z3_usb_ipod
  label: Z3 Select USB/iPod
  kind: action
  command: "Z3USB/IPOD\r"
- id: z3_usb
  label: Z3 Select USB + Play
  kind: action
  command: "Z3USB\r"
- id: z3_ipd
  label: Z3 Select iPod Direct
  kind: action
  command: "Z3IPD\r"
- id: z3_irp
  label: Z3 Select iRadio Recent
  kind: action
  command: "Z3IRP\r"
- id: z3_fvp
  label: Z3 Select Favorites Play
  kind: action
  command: "Z3FVP\r"
- id: z3_quick1
  label: Z3 Quick Select 1
  kind: action
  command: "Z3QUICK1\r"
- id: z3_quick2
  label: Z3 Quick Select 2
  kind: action
  command: "Z3QUICK2\r"
- id: z3_quick3
  label: Z3 Quick Select 3
  kind: action
  command: "Z3QUICK3\r"
- id: z3_quick4
  label: Z3 Quick Select 4
  kind: action
  command: "Z3QUICK4\r"
- id: z3_quick5
  label: Z3 Quick Select 5
  kind: action
  command: "Z3QUICK5\r"
- id: z3_quick1_memory
  label: Z3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY\r"
- id: z3_quick2_memory
  label: Z3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY\r"
- id: z3_quick3_memory
  label: Z3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY\r"
- id: z3_quick4_memory
  label: Z3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY\r"
- id: z3_quick5_memory
  label: Z3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY\r"
- id: z3_quick_status
  label: Z3 Quick Status Query
  kind: query
  command: "Z3QUICK?\r"
- id: z3_favorite1
  label: Z3 Favorite 1 Recall
  kind: action
  command: "Z3FAVORITE1\r"
- id: z3_favorite2
  label: Z3 Favorite 2 Recall
  kind: action
  command: "Z3FAVORITE2\r"
- id: z3_favorite3
  label: Z3 Favorite 3 Recall
  kind: action
  command: "Z3FAVORITE3\r"
- id: z3_favorite4
  label: Z3 Favorite 4 Recall
  kind: action
  command: "Z3FAVORITE4\r"
- id: z3_favorite1_memory
  label: Z3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY\r"
- id: z3_favorite2_memory
  label: Z3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY\r"
- id: z3_favorite3_memory
  label: Z3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY\r"
- id: z3_favorite4_memory
  label: Z3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY\r"
- id: z3_vol_up
  label: Z3 Volume Up
  kind: action
  command: "Z3UP\r"
- id: z3_vol_down
  label: Z3 Volume Down
  kind: action
  command: "Z3DOWN\r"
- id: z3_vol_set
  label: Z3 Volume Set (00-98, 80=0dB)
  kind: action
  command: "Z3{level}\r"
- id: z3_on
  label: Z3 On
  kind: action
  command: "Z3ON\r"
- id: z3_off
  label: Z3 Off
  kind: action
  command: "Z3OFF\r"
- id: z3_status
  label: Z3 Status Query
  kind: query
  command: "Z3?\r"
- id: z3_mute_on
  label: Z3 Mute On
  kind: action
  command: "Z3MUON\r"
- id: z3_mute_off
  label: Z3 Mute Off
  kind: action
  command: "Z3MUOFF\r"
- id: z3_mute_status
  label: Z3 Mute Status Query
  kind: query
  command: "Z3MU?\r"
- id: z3_cs_st
  label: Z3 Channel Stereo
  kind: action
  command: "Z3CSST\r"
- id: z3_cs_mono
  label: Z3 Channel Mono
  kind: action
  command: "Z3CSMONO\r"
- id: z3_cs_status
  label: Z3 Channel Status Query
  kind: query
  command: "Z3CS?\r"
- id: z3_cv_fl_up
  label: Z3 CV Front L Up
  kind: action
  command: "Z3CVFL UP\r"
- id: z3_cv_fl_down
  label: Z3 CV Front L Down
  kind: action
  command: "Z3CVFL DOWN\r"
- id: z3_cv_fl_set
  label: Z3 CV Front L Set (38-62)
  kind: action
  command: "Z3CVFL {value}\r"
- id: z3_cv_fr_up
  label: Z3 CV Front R Up
  kind: action
  command: "Z3CVFR UP\r"
- id: z3_cv_fr_down
  label: Z3 CV Front R Down
  kind: action
  command: "Z3CVFR DOWN\r"
- id: z3_cv_fr_set
  label: Z3 CV Front R Set
  kind: action
  command: "Z3CVFR {value}\r"
- id: z3_cv_status
  label: Z3 CV Status Query
  kind: query
  command: "Z3CV?\r"
- id: z3_hpf_on
  label: Z3 HPF On
  kind: action
  command: "Z3HPFON\r"
- id: z3_hpf_off
  label: Z3 HPF Off
  kind: action
  command: "Z3HPFOFF\r"
- id: z3_hpf_status
  label: Z3 HPF Status Query
  kind: query
  command: "Z3HPF?\r"
- id: z3_ps_bas_up
  label: Z3 Bass Up
  kind: action
  command: "Z3PSBAS UP\r"
- id: z3_ps_bas_down
  label: Z3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN\r"
- id: z3_ps_bas_set
  label: Z3 Bass Set
  kind: action
  command: "Z3PSBAS {value}\r"
- id: z3_ps_bas_status
  label: Z3 Bass Status Query
  kind: query
  command: "Z3PSBAS?\r"
- id: z3_ps_tre_up
  label: Z3 Treble Up
  kind: action
  command: "Z3PSTRE UP\r"
- id: z3_ps_tre_down
  label: Z3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN\r"
- id: z3_ps_tre_set
  label: Z3 Treble Set
  kind: action
  command: "Z3PSTRE {value}\r"
- id: z3_ps_tre_status
  label: Z3 Treble Status Query
  kind: query
  command: "Z3PSTRE?\r"
- id: z3_slp_off
  label: Z3 Sleep Off
  kind: action
  command: "Z3SLPOFF\r"
- id: z3_slp_set
  label: Z3 Sleep Set (001-120)
  kind: action
  command: "Z3SLP{minutes}\r"
- id: z3_slp_status
  label: Z3 Sleep Status Query
  kind: query
  command: "Z3SLP?\r"
- id: z3_stby_2h
  label: Z3 Auto Standby 2H
  kind: action
  command: "Z3STBY2H\r"
- id: z3_stby_4h
  label: Z3 Auto Standby 4H
  kind: action
  command: "Z3STBY4H\r"
- id: z3_stby_8h
  label: Z3 Auto Standby 8H
  kind: action
  command: "Z3STBY8H\r"
- id: z3_stby_off
  label: Z3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF\r"
- id: z3_stby_status
  label: Z3 Auto Standby Status Query
  kind: query
  command: "Z3STBY?\r"
- id: tf_an_up
  label: Tuner Freq Up
  kind: action
  command: "TFANUP\r"
- id: tf_an_down
  label: Tuner Freq Down
  kind: action
  command: "TFANDOWN\r"
- id: tf_an_set
  label: Tuner Freq Set (6 digits)
  kind: action
  command: "TFAN{xxxxxx}\r"
- id: tf_an_status
  label: Tuner Freq Status Query
  kind: query
  command: "TFAN?\r"
- id: tf_an_name
  label: RDS Station Name Query
  kind: query
  command: "TFANNAME?\r"
- id: tp_an_up
  label: Tuner Preset Up
  kind: action
  command: "TPANUP\r"
- id: tp_an_down
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN\r"
- id: tp_an_set
  label: Tuner Preset Set (01-56)
  kind: action
  command: "TPAN{nn}\r"
- id: tp_an_status
  label: Tuner Preset Status Query
  kind: query
  command: "TPAN?\r"
- id: tp_an_off
  label: Tuner Preset Off
  kind: action
  command: "TPANOFF\r"
- id: tp_an_mem
  label: Tuner Preset Memory (interactive)
  kind: action
  command: "TPANMEM\r"
- id: tp_an_mem_set
  label: Tuner Preset Memory (01-56)
  kind: action
  command: "TPANMEM{nn}\r"
- id: tm_an_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM\r"
- id: tm_an_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM\r"
- id: tm_an_status
  label: Tuner Band Status Query
  kind: query
  command: "TMAN?\r"
- id: tm_an_auto
  label: Tuner Tuning Auto
  kind: action
  command: "TMANAUTO\r"
- id: tm_an_manual
  label: Tuner Tuning Manual
  kind: action
  command: "TMANMANUAL\r"
- id: tf_hd_up
  label: HD Radio Freq Up
  kind: action
  command: "TFHDUP\r"
- id: tf_hd_down
  label: HD Radio Freq Down
  kind: action
  command: "TFHDDOWN\r"
- id: tf_hd_set
  label: HD Radio Freq Set (6 digits)
  kind: action
  command: "TFHD{xxxxxx}\r"
- id: tf_hd_mc
  label: HD Radio Multicast CH (1-8, 0=Analog)
  kind: action
  command: "TFHDMC{n}\r"
- id: tf_hd_combo
  label: HD Radio Freq + MC
  kind: action
  command: "TFHD{xxxxxx}MC{n}\r"
- id: tf_hd_status
  label: HD Radio Freq Status Query
  kind: query
  command: "TFHD?\r"
- id: tp_hd_up
  label: HD Radio Preset Up
  kind: action
  command: "TPHDUP\r"
- id: tp_hd_down
  label: HD Radio Preset Down
  kind: action
  command: "TPHDDOWN\r"
- id: tp_hd_set
  label: HD Radio Preset Set (01-56)
  kind: action
  command: "TPHD{nn}\r"
- id: tp_hd_status
  label: HD Radio Preset Status Query
  kind: query
  command: "TPHD?\r"
- id: tp_hd_off
  label: HD Radio Preset Off
  kind: action
  command: "TPHDOFF\r"
- id: tp_hd_mem
  label: HD Radio Preset Memory (interactive)
  kind: action
  command: "TPHDMEM\r"
- id: tp_hd_mem_set
  label: HD Radio Preset Memory (01-56)
  kind: action
  command: "TPHDMEM{nn}\r"
- id: tm_hd_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM\r"
- id: tm_hd_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM\r"
- id: tm_hd_auto_hd
  label: HD Radio Tuning Auto-HD
  kind: action
  command: "TMHDAUTOHD\r"
- id: tm_hd_auto
  label: HD Radio Tuning Auto
  kind: action
  command: "TMHDAUTO\r"
- id: tm_hd_manual
  label: HD Radio Tuning Manual
  kind: action
  command: "TMHDMANUAL\r"
- id: tm_hd_ana_auto
  label: HD Radio Tuning Analog Auto
  kind: action
  command: "TMHDANAAUTO\r"
- id: tm_hd_ana_manu
  label: HD Radio Tuning Analog Manual
  kind: action
  command: "TMHDANAMANU\r"
- id: tm_hd_status
  label: HD Radio Mode Status Query
  kind: query
  command: "TMHD?\r"
- id: hd_status
  label: HD Radio Full Status Query
  kind: query
  command: "HD?\r"
- id: ns_cursor_up
  label: NS Cursor Up
  kind: action
  command: "NS90\r"
- id: ns_cursor_down
  label: NS Cursor Down
  kind: action
  command: "NS91\r"
- id: ns_cursor_left
  label: NS Cursor Left
  kind: action
  command: "NS92\r"
- id: ns_cursor_right
  label: NS Cursor Right
  kind: action
  command: "NS93\r"
- id: ns_enter
  label: NS Enter (Play/Pause)
  kind: action
  command: "NS94\r"
- id: ns_play
  label: NS Play
  kind: action
  command: "NS9A\r"
- id: ns_pause
  label: NS Pause
  kind: action
  command: "NS9B\r"
- id: ns_stop
  label: NS Stop
  kind: action
  command: "NS9C\r"
- id: ns_skip_plus
  label: NS Skip Plus
  kind: action
  command: "NS9D\r"
- id: ns_skip_minus
  label: NS Skip Minus
  kind: action
  command: "NS9E\r"
- id: ns_manual_search_plus
  label: NS Manual Search Plus
  kind: action
  command: "NS9F\r"
- id: ns_manual_search_minus
  label: NS Manual Search Minus
  kind: action
  command: "NS9G\r"
- id: ns_repeat_one
  label: NS Repeat One
  kind: action
  command: "NS9H\r"
- id: ns_repeat_all
  label: NS Repeat All
  kind: action
  command: "NS9I\r"
- id: ns_repeat_off
  label: NS Repeat Off
  kind: action
  command: "NS9J\r"
- id: ns_random_on
  label: NS Random On
  kind: action
  command: "NS9K\r"
- id: ns_random_off
  label: NS Random Off
  kind: action
  command: "NS9M\r"
- id: ns_ios_mode_toggle
  label: NS iPod/On-Screen Toggle
  kind: action
  command: "NS9W\r"
- id: ns_page_next
  label: NS Page Next
  kind: action
  command: "NS9X\r"
- id: ns_page_prev
  label: NS Page Previous
  kind: action
  command: "NS9Y\r"
- id: ns_manual_search_stop
  label: NS Manual Search Stop
  kind: action
  command: "NS9Z\r"
- id: ns_repeat_toggle
  label: NS Repeat Toggle
  kind: action
  command: "NSRPT\r"
- id: ns_random_toggle
  label: NS Random Toggle
  kind: action
  command: "NSRND\r"
- id: ns_preset_call
  label: NS Net Preset Call (00-35)
  kind: action
  command: "NSB{nn}\r"
- id: ns_preset_memory
  label: NS Net Preset Memory (00-35)
  kind: action
  command: "NSC{nn}\r"
- id: ns_preset_names
  label: NS Net Preset Names (UTF-8)
  kind: query
  command: "NSH\r"
- id: ns_fv_add
  label: NS Add Favorites Folder
  kind: action
  command: "NSFV MEM\r"
- id: nsa_list
  label: NS On-Screen Info List (ASCII)
  kind: query
  command: "NSA\r"
- id: nse_list
  label: NS On-Screen Info List (UTF-8)
  kind: query
  command: "NSE\r"
- id: mn_cursor_up
  label: MN Cursor Up
  kind: action
  command: "MNCUP\r"
- id: mn_cursor_down
  label: MN Cursor Down
  kind: action
  command: "MNCDN\r"
- id: mn_cursor_left
  label: MN Cursor Left
  kind: action
  command: "MNCLT\r"
- id: mn_cursor_right
  label: MN Cursor Right
  kind: action
  command: "MNCRT\r"
- id: mn_enter
  label: MN Enter
  kind: action
  command: "MNENT\r"
- id: mn_return
  label: MN Return
  kind: action
  command: "MNRTN\r"
- id: mn_option
  label: MN Option
  kind: action
  command: "MNOPT\r"
- id: mn_info
  label: MN Info
  kind: action
  command: "MNINF\r"
- id: mn_chl
  label: MN Channel Level Adjust Toggle
  kind: action
  command: "MNCHL\r"
- id: mn_men_on
  label: MN Setup Menu On
  kind: action
  command: "MNMEN ON\r"
- id: mn_men_off
  label: MN Setup Menu Off
  kind: action
  command: "MNMEN OFF\r"
- id: mn_men_status
  label: MN Menu Status Query
  kind: query
  command: "MNMEN?\r"
- id: mn_prv_on
  label: MN InstaPrevue On
  kind: action
  command: "MNPRV ON\r"
- id: mn_prv_off
  label: MN InstaPrevue Off
  kind: action
  command: "MNPRV OFF\r"
- id: mn_prv_ng
  label: MN InstaPrevue NG
  kind: action
  command: "MNPRV NG\r"
- id: mn_prv_status
  label: MN InstaPrevue Status Query
  kind: query
  command: "MNPRV?\r"
- id: mn_zst_on
  label: MN All Zone Stereo On
  kind: action
  command: "MNZST ON\r"
- id: mn_zst_off
  label: MN All Zone Stereo Off
  kind: action
  command: "MNZST OFF\r"
- id: mn_zst_status
  label: MN ZST Status Query
  kind: query
  command: "MNZST?\r"
- id: sy_remote_lock_on
  label: SY Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON\r"
- id: sy_remote_lock_off
  label: SY Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF\r"
- id: sy_panel_lock_on
  label: SY Panel Lock On
  kind: action
  command: "SYPANEL LOCK ON\r"
- id: sy_panel_v_lock_on
  label: SY Panel+Vol Lock On
  kind: action
  command: "SYPANEL+V LOCK ON\r"
- id: sy_panel_lock_off
  label: SY Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF\r"
- id: tr1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON\r"
- id: tr1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF\r"
- id: tr2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON\r"
- id: tr2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF\r"
- id: tr_status
  label: Trigger Status Query
  kind: query
  command: "TR?\r"
- id: ug_idn
  label: UG Firmware ID Number
  kind: query
  command: "UGIDN\r"
- id: rm_sta
  label: Remote Maintenance Start
  kind: action
  command: "RM STA\r"
- id: rm_end
  label: Remote Maintenance End
  kind: action
  command: "RM END\r"
- id: rm_status
  label: RM Status Query
  kind: query
  command: "RM?\r"
- id: dim_bri
  label: Dimmer Bright
  kind: action
  command: "DIM BRI\r"
- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM\r"
- id: dim_dar
  label: Dimmer Dark
  kind: action
  command: "DIM DAR\r"
- id: dim_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF\r"
- id: dim_sel
  label: Dimmer Select (cycle)
  kind: action
  command: "DIM SEL\r"
- id: dim_status
  label: Dimmer Status Query
  kind: query
  command: "DIM?\r"
```

## Feedbacks
```yaml
# Response shapes inferred from the response column of the source's query rows.
# All values are ASCII strings terminated by CR (0x0D).
- id: power_state
  type: enum
  values: [on, standby]
  example: ["PWON\r", "PWSTANDBY\r"]
- id: master_volume
  type: integer
  range: "00-98 (80=0dB)"
  example: "MV80\r"
- id: mute_state
  type: enum
  values: [on, off]
  example: ["MUON\r", "MUOFF\r"]
- id: input_source
  type: string
  example: "SIPHONO\r"
  description: "One of the SI* tokens documented as Actions"
- id: surround_mode
  type: string
  example: "MSDOLBY ATMOS\r"
  description: "One of the MS* tokens documented as Actions"
- id: zone2_state
  type: enum
  values: [on, off]
  example: ["Z2ON\r", "Z2OFF\r"]
- id: zone3_state
  type: enum
  values: [on, off]
  example: ["Z3ON\r", "Z3OFF\r"]
- id: tuner_freq
  type: string
  format: "6-digit ASCII, ****.**kHz AM / ****.**MHz FM"
  example: "TFAN105000\r"
- id: rds_station_name
  type: string
  example: "TFANNAME12345678\r"
- id: hd_radio_full
  type: object
  description: "HD?<CR> returns multiple sub-fields, one CR-terminated line each: HDST NAME, HDSIG LEV 0-6, HDMLT CURRCH, HDMLT CAST CH, HDPTY, HDARTIST, HDTITLE, HDALBUM, HDGENRE, HDMODE DIGITAL/ANALOG"
- id: ns_osd_list_ascii
  type: string
  description: "NSA0-8 lines, 96-byte payload each (ASCII), with flag byte and `_` null separator"
- id: ns_osd_list_utf8
  type: string
  description: "NSE0-8 lines, 96-byte payload each (UTF-8), with flag byte and `_` null separator"
- id: trigger_state
  type: object
  description: "TR?<CR> returns one TR1 ON/OFF and one TR2 ON/OFF line"
- id: firmware_id
  type: string
  description: "UGIDN?<CR> returns 12-digit ID number, or UGIDN NG on failure"
- id: remote_maint_state
  type: enum
  values: [on, off]
  example: ["RM ON\r", "RM OFF\r"]
- id: dimmer_state
  type: enum
  values: [bright, dim, dark, off]
  example: ["DIM BRI\r", "DIM DIM\r", "DIM DAR\r", "DIM OFF\r"]
```

## Variables
```yaml
# Settable parameters that are not discrete actions. All ranges copied verbatim from source.
- id: master_volume_level
  type: integer
  range: "00-98"
  scale: "80 = 0dB, 00 = MIN"
- id: channel_volume_level
  type: integer
  range: "38-62 (some channels 00 = OFF, e.g. CVSW)"
  scale: "50 = 0dB"
- id: sleep_timer_minutes
  type: integer
  range: "001-120"
- id: picture_contrast
  type: integer
  range: "000-100"
  scale: "050 = 0"
- id: picture_brightness
  type: integer
  range: "000-100"
  scale: "050 = 0"
- id: picture_saturation
  type: integer
  range: "000-100"
  scale: "050 = 0"
- id: picture_hue
  type: integer
  range: "44-56"
- id: bass_level
  type: integer
  range: "00-99"
  scale: "50 = 0dB"
- id: treble_level
  type: integer
  range: "00-99"
  scale: "50 = 0dB"
- id: lfe_level
  type: integer
  range: "0..-10dB (negative offsets in dB)"
- id: lfe_level_ext
  type: integer
  range: "00-15 (for EXT.IN / 7.1 IN)"
- id: audio_delay_ms
  type: integer
  range: "0-200"
- id: delay_ms
  type: integer
  range: "0-300"
- id: dialog_level
  type: integer
  range: "38-62"
- id: subwoofer_level
  type: integer
  range: "00 (off), 38-62"
- id: center_width
  type: integer
  range: "0-7"
- id: dimension
  type: integer
  range: "0-6"
- id: center_image
  type: integer
  range: "0.0-1.0"
- id: center_gain
  type: integer
  range: "0.0-1.0"
- id: stage_width
  type: integer
  range: "40-60"
- id: stage_height
  type: integer
  range: "40-60"
- id: containment_amount
  type: integer
  description: "Audyssey LFC containment; range not specified in source"
- id: auro_strength
  type: integer
  description: "Auro-Matic 3D strength; range not specified in source"
- id: bass_sync
  type: integer
  range: "0-16"
- id: tuner_freq
  type: string
  format: "6 digits, ****.**kHz AM (>= 050000) or ****.**MHz FM (< 050000)"
- id: tuner_preset
  type: integer
  range: "01-56"
- id: hd_multicast_ch
  type: integer
  range: "0-8 (0 = analog)"
- id: ns_net_preset
  type: integer
  range: "00-35"
```

## Events
```yaml
# The source explicitly documents unsolicited EVENT messages the device sends
# when state changes occur from direct panel operation.
- id: mode_height_event
  label: PL2z Height Mode Event
  description: "PSMODE:HEIGHT<CR> — device sends this EVENT when PL2z HEIGHT mode is active; this is an EVENT-only token, not a sendable command."
- id: ms_dsd_direct_event
  label: DSD Direct Mode Event
  description: "MSDSD DIRECT<CR> — device reports this as EVENT/RESPONSE when surround mode is DIRECT during DSD playback; not a sendable command."
- id: ms_dsd_pure_direct_event
  label: DSD Pure Direct Mode Event
  description: "MSDSD PURE DIRECT<CR> — device reports this as EVENT/RESPONSE when surround mode is PURE DIRECT during DSD playback; not a sendable command."
- id: ms_quick0_event
  label: Quick Select 0 Event
  description: "MSQUICK0<CR> / Z2QUICK0<CR> / Z3QUICK0<CR> — device returns these as status responses when no Quick Select is active; not sendable commands."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source.
# The TRIGGER (TR1/TR2 ON/OFF) commands could be used as building blocks for
# installer-authored macros, but the device itself does not document a macro
# recording/playback feature.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- All commands are ASCII, terminated by CR (0x0D). No checksums, no length-prefix framing.
- TCP port 23 (telnet, no auth). RS-232 9600-8-N-1, DB-9 female DCE.
- Send commands at 50ms or more intervals per source. After PWON, wait 1 second before sending the next command.
- Two-character command mnemonic (e.g. `PW`, `MV`, `SI`, `MS`, `VS`, `PS`, `PV`, `Z2`, `Z3`, `TF`, `TP`, `TM`, `NS`, `MN`, `SY`, `TR`, `UG`, `RM`, `DIM`) with optional space-separated parameter; status queries use the `?` suffix.
- Zone3 control exists in the protocol surface but the AVC-S670H (a 5.1-ch receiver) does not support a third powered zone; Z3 commands will return an error on this model. They are included verbatim from the source for completeness.
- Several `*2014 AVR` source annotations mark commands that are 2014-era features (e.g. Online Music, Netflix). Whether each such feature is present in the S670H firmware is not separately confirmed.
- The `NS9*` parameter set uses single hex digits as positional codes (90=CursorUp ... 9Z=ManualSearchStop). The "9W" (iPod/On-Screen mode toggle) is iPod Direct only.
- The `HD?` query streams ~16 CR-terminated sub-fields; a control system must parse line-by-line.
- `MSDSD DIRECT` and `MSDSD PURE DIRECT` are EVENT-only response tokens the device sends when playing DSD content in DIRECT or PURE DIRECT surround mode; they are not sendable commands.
- `MSQUICK0`, `Z2QUICK0`, `Z3QUICK0` are status response tokens returned when no Quick Select is active; they are not documented as sendable commands.
- `PSMODE:HEIGHT` is an EVENT-only token (PL2z height mode active); the source explicitly marks it "(EVENT only)".

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:14.487Z
last_checked_at: 2026-06-02T08:46:03.112Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:46:03.112Z
matched_actions: 864
action_count: 864
confidence: medium
summary: "All 864 spec actions are present verbatim in the source command tables; transport (TCP port 23, 9600-8-N-1 serial) is confirmed; source catalogue is fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Denon AVR protocol reference; S670H-specific firmware behavior not separately confirmed."
- "source states \"Non procedural\" only, no explicit flow control"
- "no multi-step macro sequences documented in source."
- "source contains no safety warnings, interlock procedures, or"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
