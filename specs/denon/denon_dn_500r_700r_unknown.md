---
spec_id: admin/denon-dn-500r-700r
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR Control Spec"
manufacturer: Denon
model_family: "Denon AVR-X1100"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - "Denon AVR-X1100"
    - "Denon AVR-S700"
    - "Denon AVR-X4100"
    - "Denon AVR 2014 models"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - cdn.inmusicbrands.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - "https://cdn.inmusicbrands.com/DenonPro/cdn/1109/documents/DN-700R%20-%20Serial%20Command%20Protocol%20Guide%20-%20v1.1.pdf"
retrieved_at: 2026-05-27T18:33:00.286Z
last_checked_at: 2026-06-02T21:41:26.859Z
generated_at: 2026-06-02T21:41:26.859Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "user-supplied identifier \"DN 500R 700R\" does not match source content; the document is titled \"Control Protocol Ver.06\" and lists AVR-X1100, AVR-S700, AVR-X4100, and 2014 AVR models."
  - "flow control not stated in source"
  - "no multi-step macro sequences are explicitly described in the source."
  - "firmware version compatibility not stated in source (compatible_with.firmware left blank)"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:26.859Z
  matched_actions: 924
  action_count: 924
  confidence: medium
  summary: "All 924 spec actions have literal matches in the source command table; transport (9600bps serial, TCP port 23) confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Denon AVR Control Spec

## Summary

ASCII-based control protocol for Denon AV receivers over RS-232C and TCP/Telnet (port 23). Commands are 2-character ASCII opcodes followed by an optional parameter and a CR (0x0D) terminator. Supports power, master/channel volume, input selection, surround mode, video/scaler settings, parameter/EQ settings, picture controls, multi-zone control (Z2, Z3), tuner, HD Radio, online music/USB/iPod/Bluetooth, and system commands.

<!-- UNRESOLVED: user-supplied identifier "DN 500R 700R" does not match source content; the document is titled "Control Protocol Ver.06" and lists AVR-X1100, AVR-S700, AVR-X4100, and 2014 AVR models. -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source
addressing:
  port: 23
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PWON/PWSTANDBY commands
- routable  # inferred from SI/Z2/Z3 source-select commands
- queryable  # inferred from PW?/MV?/CV?/SI? and other query commands
- levelable  # inferred from MV/CV/PS volume and level commands
```

## Actions
```yaml
- id: pw_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: pw_standby
  label: Power Standby
  kind: action
  command: "PWSTANDBY"
  params: []

- id: pw_query
  label: Power Status Query
  kind: query
  command: "PW?"
  params: []

- id: mv_up
  label: Master Volume Up
  kind: action
  command: "MVUP"
  params: []

- id: mv_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN"
  params: []

- id: mv_set
  label: Master Volume Set
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: 2 ASCII chars (80=0dB) or 3 ASCII chars for 0.5dB step (805=+0.5dB); range 00 to 98
  notes: 0.5dB step uses 3 ASCII chars (e.g. MV805=+0.5dB, MV795=-0.5dB); 1dB step uses 2 ASCII chars (e.g. MV80=0dB, MV00=MUTE/- -)

- id: mv_query
  label: Master Volume Query
  kind: query
  command: "MV?"
  params: []

- id: cv_fl_up
  label: Channel Volume Front L Up
  kind: action
  command: "CVFL UP"
  params: []

- id: cv_fl_down
  label: Channel Volume Front L Down
  kind: action
  command: "CVFL DOWN"
  params: []

- id: cv_fl_set
  label: Channel Volume Front L Set
  kind: action
  command: "CVFL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fr_up
  label: Channel Volume Front R Up
  kind: action
  command: "CVFR UP"
  params: []

- id: cv_fr_down
  label: Channel Volume Front R Down
  kind: action
  command: "CVFR DOWN"
  params: []

- id: cv_fr_set
  label: Channel Volume Front R Set
  kind: action
  command: "CVFR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_c_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP"
  params: []

- id: cv_c_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN"
  params: []

- id: cv_c_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_sw_up
  label: Channel Volume Subwoofer Up
  kind: action
  command: "CVSW UP"
  params: []

- id: cv_sw_down
  label: Channel Volume Subwoofer Down
  kind: action
  command: "CVSW DOWN"
  params: []

- id: cv_sw_set
  label: Channel Volume Subwoofer Set
  kind: action
  command: "CVSW {value}"
  params:
    - name: value
      type: string
      description: 00, 38-62 ASCII; 50=0dB
  notes: Subwoofer 1 ch; 00 in addition to 38-62 range

- id: cv_sw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP"
  params: []

- id: cv_sw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN"
  params: []

- id: cv_sw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  command: "CVSW2 {value}"
  params:
    - name: value
      type: string
      description: 00, 38-62 ASCII; 50=0dB

- id: cv_sl_up
  label: Channel Volume Surround L Up
  kind: action
  command: "CVSL UP"
  params: []

- id: cv_sl_down
  label: Channel Volume Surround L Down
  kind: action
  command: "CVSL DOWN"
  params: []

- id: cv_sl_set
  label: Channel Volume Surround L Set
  kind: action
  command: "CVSL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_sr_up
  label: Channel Volume Surround R Up
  kind: action
  command: "CVSR UP"
  params: []

- id: cv_sr_down
  label: Channel Volume Surround R Down
  kind: action
  command: "CVSR DOWN"
  params: []

- id: cv_sr_set
  label: Channel Volume Surround R Set
  kind: action
  command: "CVSR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_sbl_up
  label: Channel Volume Surround Back L Up
  kind: action
  command: "CVSBL UP"
  params: []

- id: cv_sbl_down
  label: Channel Volume Surround Back L Down
  kind: action
  command: "CVSBL DOWN"
  params: []

- id: cv_sbl_set
  label: Channel Volume Surround Back L Set
  kind: action
  command: "CVSBL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: SBch 2SP mode

- id: cv_sbr_up
  label: Channel Volume Surround Back R Up
  kind: action
  command: "CVSBR UP"
  params: []

- id: cv_sbr_down
  label: Channel Volume Surround Back R Down
  kind: action
  command: "CVSBR DOWN"
  params: []

- id: cv_sbr_set
  label: Channel Volume Surround Back R Set
  kind: action
  command: "CVSBR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: SBch 2SP mode

- id: cv_sb_up
  label: Channel Volume Surround Back Up
  kind: action
  command: "CVSB UP"
  params: []

- id: cv_sb_down
  label: Channel Volume Surround Back Down
  kind: action
  command: "CVSB DOWN"
  params: []

- id: cv_sb_set
  label: Channel Volume Surround Back Set
  kind: action
  command: "CVSB {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: SBch 1SP mode

- id: cv_fhl_up
  label: Channel Volume Front Height L Up
  kind: action
  command: "CVFHL UP"
  params: []

- id: cv_fhl_down
  label: Channel Volume Front Height L Down
  kind: action
  command: "CVFHL DOWN"
  params: []

- id: cv_fhl_set
  label: Channel Volume Front Height L Set
  kind: action
  command: "CVFHL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fhr_up
  label: Channel Volume Front Height R Up
  kind: action
  command: "CVFHR UP"
  params: []

- id: cv_fhr_down
  label: Channel Volume Front Height R Down
  kind: action
  command: "CVFHR DOWN"
  params: []

- id: cv_fhr_set
  label: Channel Volume Front Height R Set
  kind: action
  command: "CVFHR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fwl_up
  label: Channel Volume Front Wide L Up
  kind: action
  command: "CVFWL UP"
  params: []

- id: cv_fwl_down
  label: Channel Volume Front Wide L Down
  kind: action
  command: "CVFWL DOWN"
  params: []

- id: cv_fwl_set
  label: Channel Volume Front Wide L Set
  kind: action
  command: "CVFWL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fwr_up
  label: Channel Volume Front Wide R Up
  kind: action
  command: "CVFWR UP"
  params: []

- id: cv_fwr_down
  label: Channel Volume Front Wide R Down
  kind: action
  command: "CVFWR DOWN"
  params: []

- id: cv_fwr_set
  label: Channel Volume Front Wide R Set
  kind: action
  command: "CVFWR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_tfl_up
  label: Channel Volume Top Front L Up
  kind: action
  command: "CVTFL UP"
  params: []

- id: cv_tfl_down
  label: Channel Volume Top Front L Down
  kind: action
  command: "CVTFL DOWN"
  params: []

- id: cv_tfl_set
  label: Channel Volume Top Front L Set
  kind: action
  command: "CVTFL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_tfr_up
  label: Channel Volume Top Front R Up
  kind: action
  command: "CVTFR UP"
  params: []

- id: cv_tfr_down
  label: Channel Volume Top Front R Down
  kind: action
  command: "CVTFR DOWN"
  params: []

- id: cv_tfr_set
  label: Channel Volume Top Front R Set
  kind: action
  command: "CVTFR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_tml_up
  label: Channel Volume Top Middle L Up
  kind: action
  command: "CVTML UP"
  params: []

- id: cv_tml_down
  label: Channel Volume Top Middle L Down
  kind: action
  command: "CVTML DOWN"
  params: []

- id: cv_tml_set
  label: Channel Volume Top Middle L Set
  kind: action
  command: "CVTML {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_tmr_up
  label: Channel Volume Top Middle R Up
  kind: action
  command: "CVTMR UP"
  params: []

- id: cv_tmr_down
  label: Channel Volume Top Middle R Down
  kind: action
  command: "CVTMR DOWN"
  params: []

- id: cv_tmr_set
  label: Channel Volume Top Middle R Set
  kind: action
  command: "CVTMR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_trl_up
  label: Channel Volume Top Rear L Up
  kind: action
  command: "CVTRL UP"
  params: []

- id: cv_trl_down
  label: Channel Volume Top Rear L Down
  kind: action
  command: "CVTRL DOWN"
  params: []

- id: cv_trl_set
  label: Channel Volume Top Rear L Set
  kind: action
  command: "CVTRL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_trr_up
  label: Channel Volume Top Rear R Up
  kind: action
  command: "CVTRR UP"
  params: []

- id: cv_trr_down
  label: Channel Volume Top Rear R Down
  kind: action
  command: "CVTRR DOWN"
  params: []

- id: cv_trr_set
  label: Channel Volume Top Rear R Set
  kind: action
  command: "CVTRR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_rhl_up
  label: Channel Volume Rear Height L Up
  kind: action
  command: "CVRHL UP"
  params: []

- id: cv_rhl_down
  label: Channel Volume Rear Height L Down
  kind: action
  command: "CVRHL DOWN"
  params: []

- id: cv_rhl_set
  label: Channel Volume Rear Height L Set
  kind: action
  command: "CVRHL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_rhr_up
  label: Channel Volume Rear Height R Up
  kind: action
  command: "CVRHR UP"
  params: []

- id: cv_rhr_down
  label: Channel Volume Rear Height R Down
  kind: action
  command: "CVRHR DOWN"
  params: []

- id: cv_rhr_set
  label: Channel Volume Rear Height R Set
  kind: action
  command: "CVRHR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fdl_up
  label: Channel Volume Front Dolby L Up
  kind: action
  command: "CVFDL UP"
  params: []

- id: cv_fdl_down
  label: Channel Volume Front Dolby L Down
  kind: action
  command: "CVFDL DOWN"
  params: []

- id: cv_fdl_set
  label: Channel Volume Front Dolby L Set
  kind: action
  command: "CVFDL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_fdr_up
  label: Channel Volume Front Dolby R Up
  kind: action
  command: "CVFDR UP"
  params: []

- id: cv_fdr_down
  label: Channel Volume Front Dolby R Down
  kind: action
  command: "CVFDR DOWN"
  params: []

- id: cv_fdr_set
  label: Channel Volume Front Dolby R Set
  kind: action
  command: "CVFDR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_sdl_up
  label: Channel Volume Surround Dolby L Up
  kind: action
  command: "CVSDL UP"
  params: []

- id: cv_sdl_down
  label: Channel Volume Surround Dolby L Down
  kind: action
  command: "CVSDL DOWN"
  params: []

- id: cv_sdl_set
  label: Channel Volume Surround Dolby L Set
  kind: action
  command: "CVSDL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_sdr_up
  label: Channel Volume Surround Dolby R Up
  kind: action
  command: "CVSDR UP"
  params: []

- id: cv_sdr_down
  label: Channel Volume Surround Dolby R Down
  kind: action
  command: "CVSDR DOWN"
  params: []

- id: cv_sdr_set
  label: Channel Volume Surround Dolby R Set
  kind: action
  command: "CVSDR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_bdl_up
  label: Channel Volume Back Dolby L Up
  kind: action
  command: "CVBDL UP"
  params: []

- id: cv_bdl_down
  label: Channel Volume Back Dolby L Down
  kind: action
  command: "CVBDL DOWN"
  params: []

- id: cv_bdl_set
  label: Channel Volume Back Dolby L Set
  kind: action
  command: "CVBDL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_bdr_up
  label: Channel Volume Back Dolby R Up
  kind: action
  command: "CVBDR UP"
  params: []

- id: cv_bdr_down
  label: Channel Volume Back Dolby R Down
  kind: action
  command: "CVBDR DOWN"
  params: []

- id: cv_bdr_set
  label: Channel Volume Back Dolby R Set
  kind: action
  command: "CVBDR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: cv_shl_up
  label: Channel Volume Surround Height L Up
  kind: action
  command: "CVSHL UP"
  params: []

- id: cv_shl_down
  label: Channel Volume Surround Height L Down
  kind: action
  command: "CVSHL DOWN"
  params: []

- id: cv_shl_set
  label: Channel Volume Surround Height L Set
  kind: action
  command: "CVSHL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: Auro-3D Upgrade only

- id: cv_shr_up
  label: Channel Volume Surround Height R Up
  kind: action
  command: "CVSHR UP"
  params: []

- id: cv_shr_down
  label: Channel Volume Surround Height R Down
  kind: action
  command: "CVSHR DOWN"
  params: []

- id: cv_shr_set
  label: Channel Volume Surround Height R Set
  kind: action
  command: "CVSHR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: Auro-3D Upgrade only

- id: cv_ts_up
  label: Channel Volume Top Surround Up
  kind: action
  command: "CVTS UP"
  params: []

- id: cv_ts_down
  label: Channel Volume Top Surround Down
  kind: action
  command: "CVTS DOWN"
  params: []

- id: cv_ts_set
  label: Channel Volume Top Surround Set
  kind: action
  command: "CVTS {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB
  notes: Auro-3D Upgrade only

- id: cv_zrl
  label: Channel Volume Reset All to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Channel Volume Status Query
  kind: query
  command: "CV?"
  params: []
  notes: Only speakers present in the speaker configuration reply; response ends with CVEND

- id: mu_on
  label: Mute On
  kind: action
  command: "MUON"
  params: []

- id: mu_off
  label: Mute Off
  kind: action
  command: "MUOFF"
  params: []

- id: mu_query
  label: Mute Status Query
  kind: query
  command: "MU?"
  params: []

- id: si_phono
  label: Select Input Phono
  kind: action
  command: "SIPHONO"
  params: []

- id: si_cd
  label: Select Input CD
  kind: action
  command: "SICD"
  params: []

- id: si_tuner
  label: Select Input Tuner
  kind: action
  command: "SITUNER"
  params: []

- id: si_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD"
  params: []
  notes: "X1100, S700: DVD/Blu-ray"

- id: si_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD"
  params: []

- id: si_tv
  label: Select Input TV
  kind: action
  command: "SITV"
  params: []

- id: si_sat_cbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL"
  params: []

- id: si_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY"
  params: []

- id: si_game
  label: Select Input Game
  kind: action
  command: "SIGAME"
  params: []

- id: si_hdradio
  label: Select Input HD Radio
  kind: action
  command: "SIHDRADIO"
  params: []
  notes: North America model only

- id: si_net
  label: Select Input NET
  kind: action
  command: "SINET"
  params: []
  notes: "2014 AVR: Online Music"

- id: si_pandora
  label: Select Input Pandora
  kind: action
  command: "SIPANDORA"
  params: []
  notes: North America model only

- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: si_spotify
  label: Select Input Spotify
  kind: action
  command: "SISPOTIFY"
  params: []
  notes: North America & Europe model only

- id: si_lastfm
  label: Select Input LastFM
  kind: action
  command: "SILASTFM"
  params: []

- id: si_flickr
  label: Select Input Flickr
  kind: action
  command: "SIFLICKR"
  params: []

- id: si_iradio
  label: Select Input iRadio
  kind: action
  command: "SIIRADIO"
  params: []

- id: si_server
  label: Select Input Server
  kind: action
  command: "SISERVER"
  params: []

- id: si_favorites
  label: Select Input Favorites
  kind: action
  command: "SIFAVORITES"
  params: []

- id: si_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1"
  params: []
  notes: "X1100, S700: AUX"

- id: si_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2"
  params: []

- id: si_aux3
  label: Select Input AUX3
  kind: action
  command: "SIAUX3"
  params: []
  notes: When Additional Source is set to On

- id: si_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4"
  params: []

- id: si_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5"
  params: []

- id: si_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6"
  params: []

- id: si_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7"
  params: []

- id: si_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT"
  params: []

- id: si_usb_ipod
  label: Select Input USB/iPod and Start Playback
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: si_usb
  label: Select Input USB and Start Playback
  kind: action
  command: "SIUSB"
  params: []

- id: si_ipd
  label: Select Input USB and iPod Direct Start Playback
  kind: action
  command: "SIIPD"
  params: []

- id: si_irp
  label: Select Input NET/USB and iRadio Recent Play
  kind: action
  command: "SIIRP"
  params: []

- id: si_fvp
  label: Select Input NET/USB and Favorites Play
  kind: action
  command: "SIFVP"
  params: []

- id: si_query
  label: Input Source Status Query
  kind: query
  command: "SI?"
  params: []

- id: zm_on
  label: Main Zone On
  kind: action
  command: "ZMON"
  params: []

- id: zm_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF"
  params: []

- id: zm_query
  label: Main Zone Status Query
  kind: query
  command: "ZM?"
  params: []

- id: zm_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1"
  params: []

- id: zm_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2"
  params: []

- id: zm_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3"
  params: []

- id: zm_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4"
  params: []

- id: zm_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY"
  params: []

- id: zm_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY"
  params: []

- id: zm_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY"
  params: []

- id: zm_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action

- id: sr_phono
  label: Rec Select Phono
  kind: action
  command: "SRPHONO"
  params: []

- id: sr_cd
  label: Rec Select CD
  kind: action
  command: "SRCD"
  params: []

- id: sr_tuner
  label: Rec Select Tuner
  kind: action
  command: "SRTUNER"
  params: []

- id: sr_dvd
  label: Rec Select DVD
  kind: action
  command: "SRDVD"
  params: []

- id: sr_bd
  label: Rec Select Blu-ray
  kind: action
  command: "SRBD"
  params: []

- id: sr_tv
  label: Rec Select TV
  kind: action
  command: "SRTV"
  params: []

- id: sr_sat_cbl
  label: Rec Select SAT/CBL
  kind: action
  command: "SRSAT/CBL"
  params: []

- id: sr_mplay
  label: Rec Select Media Player
  kind: action
  command: "SRMPLAY"
  params: []

- id: sr_game
  label: Rec Select Game
  kind: action
  command: "SRGAME"
  params: []

- id: sr_hdradio
  label: Rec Select HD Radio
  kind: action
  command: "SRHDRADIO"
  params: []
  notes: North America model only

- id: sr_net
  label: Rec Select NET
  kind: action
  command: "SRNET"
  params: []

- id: sr_pandora
  label: Rec Select Pandora
  kind: action
  command: "SRPANDORA"
  params: []
  notes: North America model only

- id: sr_siriusxm
  label: Rec Select SiriusXM
  kind: action
  command: "SRSIRIUSXM"
  params: []

- id: sr_spotify
  label: Rec Select Spotify
  kind: action
  command: "SRSPOTIFY"
  params: []
  notes: North America & Europe model only

- id: sr_lastfm
  label: Rec Select LastFM
  kind: action
  command: "SRLASTFM"
  params: []

- id: sr_flickr
  label: Rec Select Flickr
  kind: action
  command: "SRFLICKR"
  params: []

- id: sr_iradio
  label: Rec Select iRadio
  kind: action
  command: "SRIRADIO"
  params: []

- id: sr_server
  label: Rec Select Server
  kind: action
  command: "SRSERVER"
  params: []

- id: sr_favorites
  label: Rec Select Favorites
  kind: action
  command: "SRFAVORITES"
  params: []

- id: sr_aux1
  label: Rec Select AUX1
  kind: action
  command: "SRAUX1"
  params: []

- id: sr_aux2
  label: Rec Select AUX2
  kind: action
  command: "SRAUX2"
  params: []

- id: sr_aux3
  label: Rec Select AUX3
  kind: action
  command: "SRAUX3"
  params: []
  notes: When Additional Source is set to On

- id: sr_aux4
  label: Rec Select AUX4
  kind: action
  command: "SRAUX4"
  params: []

- id: sr_aux5
  label: Rec Select AUX5
  kind: action
  command: "SRAUX5"
  params: []

- id: sr_aux6
  label: Rec Select AUX6
  kind: action
  command: "SRAUX6"
  params: []

- id: sr_aux7
  label: Rec Select AUX7
  kind: action
  command: "SRAUX7"
  params: []

- id: sr_bt
  label: Rec Select Bluetooth
  kind: action
  command: "SRBT"
  params: []

- id: sr_usb_ipod
  label: Rec Select USB/iPod
  kind: action
  command: "SRUSB/IPOD"
  params: []

- id: sr_usb_direct
  label: Rec Select USB Direct
  kind: action
  command: "SRUSB DIRECT"
  params: []

- id: sr_ipod
  label: Rec Select iPod
  kind: action
  command: "SRIPOD"
  params: []

- id: sr_ipod_direct
  label: Rec Select iPod Direct
  kind: action
  command: "SRIPOD DIRECT"
  params: []

- id: sr_source
  label: Rec Select Mode Cancel
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_query
  label: Rec Select Status Query
  kind: query
  command: "SR?"
  params: []
  notes: If REC mode selected, SR status returns; if ZONE2 mode selected, Z2 status returns

- id: sd_auto
  label: "Input Mode Auto (HDMI>DIGITAL>ANALOG)"
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Input Mode Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Input Mode Force DIGITAL (Optical/Coaxial)
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Input Mode Force ANALOG
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Input Mode External In
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1_in
  label: Input Mode 7.1CH In
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Input Mode No
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Input Mode Status Query
  kind: query
  command: "SD?"
  params: []

- id: sd_arc
  label: Input Mode ARC
  kind: action
  command: "SDARC"
  params: []

- id: dc_auto
  label: Digital Input Auto Mode
  kind: action
  command: "DCAUTO"
  params: []

- id: dc_pcm
  label: Digital Input Force PCM Mode
  kind: action
  command: "DCPCM"
  params: []

- id: dc_dts
  label: Digital Input Force DTS Mode
  kind: action
  command: "DCDTS"
  params: []

- id: dc_query
  label: Digital Input Status Query
  kind: query
  command: "DC?"
  params: []

- id: sv_dvd
  label: Video Select DVD On
  kind: action
  command: "SVDVD"
  params: []

- id: sv_bd
  label: Video Select Blu-ray On
  kind: action
  command: "SVBD"
  params: []

- id: sv_tv
  label: Video Select TV On
  kind: action
  command: "SVTV"
  params: []

- id: sv_sat_cbl
  label: Video Select SAT/CBL On
  kind: action
  command: "SVSAT/CBL"
  params: []

- id: sv_mplay
  label: Video Select Media Player On
  kind: action
  command: "SVMPLAY"
  params: []

- id: sv_game
  label: Video Select Game On
  kind: action
  command: "SVGAME"
  params: []

- id: sv_aux1
  label: Video Select AUX1 On
  kind: action
  command: "SVAUX1"
  params: []

- id: sv_aux2
  label: Video Select AUX2 On
  kind: action
  command: "SVAUX2"
  params: []

- id: sv_aux3
  label: Video Select AUX3 On
  kind: action
  command: "SVAUX3"
  params: []
  notes: When Additional Source is set to On

- id: sv_aux4
  label: Video Select AUX4 On
  kind: action
  command: "SVAUX4"
  params: []

- id: sv_aux5
  label: Video Select AUX5 On
  kind: action
  command: "SVAUX5"
  params: []

- id: sv_aux6
  label: Video Select AUX6 On
  kind: action
  command: "SVAUX6"
  params: []

- id: sv_aux7
  label: Video Select AUX7 On
  kind: action
  command: "SVAUX7"
  params: []

- id: sv_cd
  label: Video Select CD On
  kind: action
  command: "SVCD"
  params: []

- id: sv_source
  label: Video Select Mode Cancel
  kind: action
  command: "SVSOURCE"
  params: []

- id: sv_on
  label: Video Select On
  kind: action
  command: "SVON"
  params: []

- id: sv_off
  label: Video Select Off
  kind: action
  command: "SVOFF"
  params: []

- id: sv_query
  label: Video Select Status Query
  kind: query
  command: "SV?"
  params: []

- id: slp_off
  label: Main Zone Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_set
  label: Main Zone Sleep Timer Set
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: 001-120 by ASCII; 010=10min
  notes: Parameter is 3 ASCII chars

- id: slp_query
  label: Main Zone Sleep Timer Status Query
  kind: query
  command: "SLP?"
  params: []

- id: stby_15m
  label: Main Zone Auto Standby 15min
  kind: action
  command: "STBY15M"
  params: []

- id: stby_30m
  label: Main Zone Auto Standby 30min
  kind: action
  command: "STBY30M"
  params: []

- id: stby_60m
  label: Main Zone Auto Standby 60min
  kind: action
  command: "STBY60M"
  params: []

- id: stby_off
  label: Main Zone Auto Standby Off
  kind: action
  command: "STBYOFF"
  params: []

- id: stby_query
  label: Main Zone Auto Standby Status Query
  kind: query
  command: "STBY?"
  params: []

- id: eco_on
  label: Main Zone Eco Mode On
  kind: action
  command: "ECOON"
  params: []

- id: eco_auto
  label: Main Zone Eco Mode Auto
  kind: action
  command: "ECOAUTO"
  params: []

- id: eco_off
  label: Main Zone Eco Mode Off
  kind: action
  command: "ECOOFF"
  params: []

- id: eco_query
  label: Main Zone Eco Mode Status Query
  kind: query
  command: "ECO?"
  params: []
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE"
  params: []

- id: ms_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC"
  params: []

- id: ms_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME"
  params: []

- id: ms_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT"
  params: []

- id: ms_dsd_direct
  label: Surround Mode DSD Direct
  kind: action
  command: "MSDSD DIRECT"
  params: []

- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT"
  params: []

- id: ms_dsd_pure_direct
  label: Surround Mode DSD Pure Direct
  kind: action
  command: "MSDSD PURE DIRECT"
  params: []

- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO"
  params: []

- id: ms_auto
  label: Surround Mode Auto
  kind: action
  command: "MSAUTO"
  params: []

- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL"
  params: []

- id: ms_dolby_pro_logic
  label: Surround Mode Dolby Pro Logic
  kind: action
  command: "MSDOLBY PRO LOGIC"
  params: []

- id: ms_dolby_pl2_c
  label: Surround Mode Dolby PL2 C
  kind: action
  command: "MSDOLBY PL2 C"
  params: []

- id: ms_dolby_pl2_m
  label: Surround Mode Dolby PL2 M
  kind: action
  command: "MSDOLBY PL2 M"
  params: []

- id: ms_dolby_pl2_g
  label: Surround Mode Dolby PL2 G
  kind: action
  command: "MSDOLBY PL2 G"
  params: []

- id: ms_dolby_pl2x_c
  label: Surround Mode Dolby PL2x C
  kind: action
  command: "MSDOLBY PL2X C"
  params: []

- id: ms_dolby_pl2x_m
  label: Surround Mode Dolby PL2x M
  kind: action
  command: "MSDOLBY PL2X M"
  params: []

- id: ms_dolby_pl2x_g
  label: Surround Mode Dolby PL2x G
  kind: action
  command: "MSDOLBY PL2X G"
  params: []

- id: ms_dolby_pl2z_h
  label: Surround Mode Dolby PL2z Height
  kind: action
  command: "MSDOLBY PL2Z H"
  params: []

- id: ms_dolby_surround
  label: Surround Mode Dolby Surround
  kind: action
  command: "MSDOLBY SURROUND"
  params: []

- id: ms_dolby_atmos
  label: Surround Mode Dolby Atmos
  kind: action
  command: "MSDOLBY ATMOS"
  params: []

- id: ms_dolby_d_ex
  label: Surround Mode Dolby D EX
  kind: action
  command: "MSDOLBY D EX"
  params: []

- id: ms_dolby_d_pl2x_c
  label: Surround Mode Dolby D+PL2x C
  kind: action
  command: "MSDOLBY D+PL2X C"
  params: []

- id: ms_dolby_d_pl2x_m
  label: Surround Mode Dolby D+PL2x M
  kind: action
  command: "MSDOLBY D+PL2X M"
  params: []

- id: ms_dolby_d_pl2x_g
  label: Surround Mode Dolby D+PL2x G
  kind: action
  command: "MSDOLBY D+PL2X G"
  params: []

- id: ms_dolby_d_pl2z_h
  label: Surround Mode Dolby D+PL2z Height
  kind: action
  command: "MSDOLBY D+PL2Z H"
  params: []

- id: ms_dolby_d_ds
  label: Surround Mode Dolby D+DS
  kind: action
  command: "MSDOLBY D+DS"
  params: []

- id: ms_dolby_d_neo_x_c
  label: "Surround Mode Dolby D+NEO:X C"
  kind: action
  command: "MSDOLBY D+NEO:X C"
  params: []

- id: ms_dolby_d_neo_x_m
  label: "Surround Mode Dolby D+NEO:X M"
  kind: action
  command: "MSDOLBY D+NEO:X M"
  params: []

- id: ms_dolby_d_neo_x_g
  label: "Surround Mode Dolby D+NEO:X G"
  kind: action
  command: "MSDOLBY D+NEO:X G"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: ms_dts_es_dscrt6_1
  label: Surround Mode DTS ES DSCRT6.1
  kind: action
  command: "MSDTS ES DSCRT6.1"
  params: []

- id: ms_dts_es_mtrx6_1
  label: Surround Mode DTS ES MTRX6.1
  kind: action
  command: "MSDTS ES MTRX6.1"
  params: []

- id: ms_dts_pl2x_c
  label: Surround Mode DTS+PL2x C
  kind: action
  command: "MSDTS+PL2X C"
  params: []

- id: ms_dts_pl2x_m
  label: Surround Mode DTS+PL2x M
  kind: action
  command: "MSDTS+PL2X M"
  params: []

- id: ms_dts_pl2x_g
  label: Surround Mode DTS+PL2x G
  kind: action
  command: "MSDTS+PL2X G"
  params: []

- id: ms_dts_pl2z_h
  label: Surround Mode DTS+PL2z Height
  kind: action
  command: "MSDTS+PL2Z H"
  params: []

- id: ms_dts_ds
  label: Surround Mode DTS+DS
  kind: action
  command: "MSDTS+DS"
  params: []

- id: ms_dts96_24
  label: Surround Mode DTS96/24
  kind: action
  command: "MSDTS96/24"
  params: []

- id: ms_dts96_es_mtrx
  label: Surround Mode DTS96 ES MTRX
  kind: action
  command: "MSDTS96 ES MTRX"
  params: []

- id: ms_dts_neo6
  label: "Surround Mode DTS+NEO:6"
  kind: action
  command: "MSDTS+NEO:6"
  params: []

- id: ms_dts_neo_x_c
  label: "Surround Mode DTS+NEO:X C"
  kind: action
  command: "MSDTS+NEO:X C"
  params: []

- id: ms_dts_neo_x_m
  label: "Surround Mode DTS+NEO:X M"
  kind: action
  command: "MSDTS+NEO:X M"
  params: []

- id: ms_dts_neo_x_g
  label: "Surround Mode DTS+NEO:X G"
  kind: action
  command: "MSDTS+NEO:X G"
  params: []

- id: ms_multi_ch_in
  label: Surround Mode Multi CH In
  kind: action
  command: "MSMULTI CH IN"
  params: []

- id: ms_m_ch_in_dolby_ex
  label: Surround Mode M CH IN+Dolby EX
  kind: action
  command: "MSM CH IN+DOLBY EX"
  params: []

- id: ms_m_ch_in_pl2x_c
  label: Surround Mode M CH IN+PL2x C
  kind: action
  command: "MSM CH IN+PL2X C"
  params: []

- id: ms_m_ch_in_pl2x_m
  label: Surround Mode M CH IN+PL2x M
  kind: action
  command: "MSM CH IN+PL2X M"
  params: []

- id: ms_m_ch_in_pl2x_g
  label: Surround Mode M CH IN+PL2x G
  kind: action
  command: "MSM CH IN+PL2X G"
  params: []

- id: ms_m_ch_in_pl2z_h
  label: Surround Mode M CH IN+PL2z Height
  kind: action
  command: "MSM CH IN+PL2Z H"
  params: []

- id: ms_m_ch_in_ds
  label: Surround Mode M CH IN+DS
  kind: action
  command: "MSM CH IN+DS"
  params: []

- id: ms_multi_ch_in_7_1
  label: Surround Mode Multi CH In 7.1
  kind: action
  command: "MSMULTI CH IN 7.1"
  params: []

- id: ms_m_ch_in_neo_x_c
  label: "Surround Mode M CH IN+NEO:X C"
  kind: action
  command: "MSM CH IN+NEO:X C"
  params: []

- id: ms_m_ch_in_neo_x_m
  label: "Surround Mode M CH IN+NEO:X M"
  kind: action
  command: "MSM CH IN+NEO:X M"
  params: []

- id: ms_m_ch_in_neo_x_g
  label: "Surround Mode M CH IN+NEO:X G"
  kind: action
  command: "MSM CH IN+NEO:X G"
  params: []

- id: ms_dolby_d_plus
  label: Surround Mode Dolby D+
  kind: action
  command: "MSDOLBY D+"
  params: []

- id: ms_dolby_d_plus_ex
  label: Surround Mode Dolby D++EX
  kind: action
  command: "MSDOLBY D+ +EX"
  params: []

- id: ms_dolby_d_plus_pl2x_c
  label: Surround Mode Dolby D++PL2x C
  kind: action
  command: "MSDOLBY D+ +PL2X C"
  params: []

- id: ms_dolby_d_plus_pl2x_m
  label: Surround Mode Dolby D++PL2x M
  kind: action
  command: "MSDOLBY D+ +PL2X M"
  params: []

- id: ms_dolby_d_plus_pl2x_g
  label: Surround Mode Dolby D++PL2x G
  kind: action
  command: "MSDOLBY D+ +PL2X G"
  params: []

- id: ms_dolby_d_plus_pl2z_h
  label: Surround Mode Dolby D++PL2z Height
  kind: action
  command: "MSDOLBY D+ +PL2Z H"
  params: []

- id: ms_dolby_d_plus_ds
  label: Surround Mode Dolby D++DS
  kind: action
  command: "MSDOLBY D+ +DS"
  params: []

- id: ms_dolby_d_plus_neo_x_c
  label: "Surround Mode Dolby D++NEO:X C"
  kind: action
  command: "MSDOLBY D+ +NEO:X C"
  params: []

- id: ms_dolby_d_plus_neo_x_m
  label: "Surround Mode Dolby D++NEO:X M"
  kind: action
  command: "MSDOLBY D+ +NEO:X M"
  params: []

- id: ms_dolby_d_plus_neo_x_g
  label: "Surround Mode Dolby D++NEO:X G"
  kind: action
  command: "MSDOLBY D+ +NEO:X G"
  params: []

- id: ms_dolby_hd
  label: Surround Mode Dolby HD
  kind: action
  command: "MSDOLBY HD"
  params: []

- id: ms_dolby_hd_ex
  label: Surround Mode Dolby HD+EX
  kind: action
  command: "MSDOLBY HD+EX"
  params: []

- id: ms_dolby_hd_pl2x_c
  label: Surround Mode Dolby HD+PL2x C
  kind: action
  command: "MSDOLBY HD+PL2X C"
  params: []

- id: ms_dolby_hd_pl2x_m
  label: Surround Mode Dolby HD+PL2x M
  kind: action
  command: "MSDOLBY HD+PL2X M"
  params: []

- id: ms_dolby_hd_pl2x_g
  label: Surround Mode Dolby HD+PL2x G
  kind: action
  command: "MSDOLBY HD+PL2X G"
  params: []

- id: ms_dolby_hd_pl2z_h
  label: Surround Mode Dolby HD+PL2z Height
  kind: action
  command: "MSDOLBY HD+PL2Z H"
  params: []

- id: ms_dolby_hd_ds
  label: Surround Mode Dolby HD+DS
  kind: action
  command: "MSDOLBY HD+DS"
  params: []

- id: ms_dolby_hd_neo_x_c
  label: "Surround Mode Dolby HD+NEO:X C"
  kind: action
  command: "MSDOLBY HD+NEO:X C"
  params: []

- id: ms_dolby_hd_neo_x_m
  label: "Surround Mode Dolby HD+NEO:X M"
  kind: action
  command: "MSDOLBY HD+NEO:X M"
  params: []

- id: ms_dolby_hd_neo_x_g
  label: "Surround Mode Dolby HD+NEO:X G"
  kind: action
  command: "MSDOLBY HD+NEO:X G"
  params: []

- id: ms_dts_hd
  label: Surround Mode DTS HD
  kind: action
  command: "MSDTS HD"
  params: []

- id: ms_dts_hd_mstr
  label: Surround Mode DTS HD Master
  kind: action
  command: "MSDTS HD MSTR"
  params: []

- id: ms_dts_hd_pl2x_c
  label: Surround Mode DTS HD+PL2x C
  kind: action
  command: "MSDTS HD+PL2X C"
  params: []

- id: ms_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2x M
  kind: action
  command: "MSDTS HD+PL2X M"
  params: []

- id: ms_dts_hd_pl2x_g
  label: Surround Mode DTS HD+PL2x G
  kind: action
  command: "MSDTS HD+PL2X G"
  params: []

- id: ms_dts_hd_pl2z_h
  label: Surround Mode DTS HD+PL2z Height
  kind: action
  command: "MSDTS HD+PL2Z H"
  params: []

- id: ms_dts_hd_ds
  label: Surround Mode DTS HD+DS
  kind: action
  command: "MSDTS HD+DS"
  params: []

- id: ms_dts_hd_neo6
  label: "Surround Mode DTS HD+NEO:6"
  kind: action
  command: "MSDTS HD+NEO:6"
  params: []

- id: ms_dts_hd_neo_x_c
  label: "Surround Mode DTS HD+NEO:X C"
  kind: action
  command: "MSDTS HD+NEO:X C"
  params: []

- id: ms_dts_hd_neo_x_m
  label: "Surround Mode DTS HD+NEO:X M"
  kind: action
  command: "MSDTS HD+NEO:X M"
  params: []

- id: ms_dts_hd_neo_x_g
  label: "Surround Mode DTS HD+NEO:X G"
  kind: action
  command: "MSDTS HD+NEO:X G"
  params: []

- id: ms_dts_express
  label: Surround Mode DTS Express
  kind: action
  command: "MSDTS EXPRESS"
  params: []

- id: ms_dts_es_8ch_dscrt
  label: Surround Mode DTS ES 8CH DSCRT
  kind: action
  command: "MSDTS ES 8CH DSCRT"
  params: []

- id: ms_mpeg2_aac
  label: Surround Mode MPEG2 AAC
  kind: action
  command: "MSMPEG2 AAC"
  params: []

- id: ms_aac_dolby_ex
  label: Surround Mode AAC+Dolby EX
  kind: action
  command: "MSAAC+DOLBY EX"
  params: []

- id: ms_aac_pl2x_c
  label: Surround Mode AAC+PL2x C
  kind: action
  command: "MSAAC+PL2X C"
  params: []

- id: ms_aac_pl2x_m
  label: Surround Mode AAC+PL2x M
  kind: action
  command: "MSAAC+PL2X M"
  params: []

- id: ms_aac_pl2x_g
  label: Surround Mode AAC+PL2x G
  kind: action
  command: "MSAAC+PL2X G"
  params: []

- id: ms_aac_pl2z_h
  label: Surround Mode AAC+PL2z Height
  kind: action
  command: "MSAAC+PL2Z H"
  params: []

- id: ms_aac_ds
  label: Surround Mode AAC+DS
  kind: action
  command: "MSAAC+DS"
  params: []

- id: ms_aac_neo_x_c
  label: "Surround Mode AAC+NEO:X C"
  kind: action
  command: "MSAAC+NEO:X C"
  params: []

- id: ms_aac_neo_x_m
  label: "Surround Mode AAC+NEO:X M"
  kind: action
  command: "MSAAC+NEO:X M"
  params: []

- id: ms_aac_neo_x_g
  label: "Surround Mode AAC+NEO:X G"
  kind: action
  command: "MSAAC+NEO:X G"
  params: []

- id: ms_pl_dsx
  label: Surround Mode PL DSX
  kind: action
  command: "MSPL DSX"
  params: []

- id: ms_pl2_c_dsx
  label: Surround Mode PL2 C DSX
  kind: action
  command: "MSPL2 C DSX"
  params: []

- id: ms_pl2_m_dsx
  label: Surround Mode PL2 M DSX
  kind: action
  command: "MSPL2 M DSX"
  params: []

- id: ms_pl2_g_dsx
  label: Surround Mode PL2 G DSX
  kind: action
  command: "MSPL2 G DSX"
  params: []

- id: ms_audyssey_dsx
  label: Surround Mode Audyssey DSX
  kind: action
  command: "MSAUDYSSEY DSX"
  params: []

- id: ms_dts_neo6_c
  label: "Surround Mode DTS NEO:6 C"
  kind: action
  command: "MSDTS NEO:6 C"
  params: []

- id: ms_dts_neo6_m
  label: "Surround Mode DTS NEO:6 M"
  kind: action
  command: "MSDTS NEO:6 M"
  params: []

- id: ms_dts_neo_x_c_alias
  label: "Surround Mode DTS NEO:X C"
  kind: action
  command: "MSDTS NEO:X C"
  params: []

- id: ms_dts_neo_x_m_alias
  label: "Surround Mode DTS NEO:X M"
  kind: action
  command: "MSDTS NEO:X M"
  params: []

- id: ms_dts_neo_x_g_alias
  label: "Surround Mode DTS NEO:X G"
  kind: action
  command: "MSDTS NEO:X G"
  params: []

- id: ms_auro3d
  label: Surround Mode Auro-3D
  kind: action
  command: "MSAURO3D"
  params: []
  notes: Auro-3D Upgrade only

- id: ms_auro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  command: "MSAURO2DSURR"
  params: []
  notes: Auro-3D Upgrade only

- id: ms_mch_stereo
  label: Surround Mode MCH Stereo
  kind: action
  command: "MSMCH STEREO"
  params: []

- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  command: "MSWIDE SCREEN"
  params: []

- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  command: "MSSUPER STADIUM"
  params: []

- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA"
  params: []

- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB"
  params: []

- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  command: "MSCLASSIC CONCERT"
  params: []

- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE"
  params: []

- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX"
  params: []

- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME"
  params: []

- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL"
  params: []

- id: ms_left
  label: Surround Mode Left
  kind: action
  command: "MSLEFT"
  params: []

- id: ms_right
  label: Surround Mode Right
  kind: action
  command: "MSRIGHT"
  params: []

- id: ms_all_zone_stereo
  label: All Zone Stereo Mode
  kind: action
  command: "MSALL ZONE STEREO"
  params: []

- id: ms_7_1in
  label: Surround Mode 7.1IN
  kind: action
  command: "MS7.1IN"
  params: []

- id: ms_pure_direct_ext
  label: Surround Mode Pure Direct Ext
  kind: action
  command: "MSPURE DIRECT EXT"
  params: []

- id: ms_query
  label: Surround Mode Status Query
  kind: query
  command: "MS?"
  params: []

- id: ms_quick1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1"
  params: []

- id: ms_quick2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2"
  params: []

- id: ms_quick3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3"
  params: []

- id: ms_quick4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4"
  params: []

- id: ms_quick5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5"
  params: []

- id: ms_quick0
  label: Quick Select 0
  kind: action
  command: "MSQUICK0"
  params: []

- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY"
  params: []

- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY"
  params: []

- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY"
  params: []

- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY"
  params: []

- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY"
  params: []

- id: ms_quick_query
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK ?"
  params: []
- id: vs_aspnrm
  label: "Aspect Ratio 4:3"
  kind: action
  command: "VSASPNRM"
  params: []

- id: vs_aspful
  label: "Aspect Ratio 16:9"
  kind: action
  command: "VSASPFUL"
  params: []

- id: vs_asp_query
  label: Aspect Ratio Status Query
  kind: query
  command: "VSASP ?"
  params: []

- id: vs_moniauto
  label: HDMI Monitor Auto Detect
  kind: action
  command: "VSMONIAUTO"
  params: []

- id: vs_moni1
  label: HDMI Monitor Out-1
  kind: action
  command: "VSMONI1"
  params: []

- id: vs_moni2
  label: HDMI Monitor Out-2
  kind: action
  command: "VSMONI2"
  params: []

- id: vs_moni_query
  label: HDMI Monitor Status Query
  kind: query
  command: "VSMONI ?"
  params: []

- id: vs_sc48p
  label: Resolution 480p/576p
  kind: action
  command: "VSSC48P"
  params: []

- id: vs_sc10i
  label: Resolution 1080i
  kind: action
  command: "VSSC10I"
  params: []

- id: vs_sc72p
  label: Resolution 720p
  kind: action
  command: "VSSC72P"
  params: []

- id: vs_sc10p
  label: Resolution 1080p
  kind: action
  command: "VSSC10P"
  params: []

- id: vs_sc10p24
  label: "Resolution 1080p:24Hz"
  kind: action
  command: "VSSC10P24"
  params: []

- id: vs_sc4k
  label: Resolution 4K
  kind: action
  command: "VSSC4K"
  params: []

- id: vs_sc4kf
  label: Resolution 4K(60/50)
  kind: action
  command: "VSSC4KF"
  params: []

- id: vs_scauto
  label: Resolution AUTO
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vs_sc_query
  label: Resolution Status Query
  kind: query
  command: "VSSC ?"
  params: []

- id: vs_sch48p
  label: Resolution 480p/576p (HDMI)
  kind: action
  command: "VSSCH48P"
  params: []

- id: vs_sch10i
  label: Resolution 1080i (HDMI)
  kind: action
  command: "VSSCH10I"
  params: []

- id: vs_sch72p
  label: Resolution 720p (HDMI)
  kind: action
  command: "VSSCH72P"
  params: []

- id: vs_sch10p
  label: Resolution 1080p (HDMI)
  kind: action
  command: "VSSCH10P"
  params: []

- id: vs_sch10p24
  label: "Resolution 1080p:24Hz (HDMI)"
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vs_sch4k
  label: Resolution 4K (HDMI)
  kind: action
  command: "VSSCH4K"
  params: []

- id: vs_sch4kf
  label: Resolution 4K(60/50) (HDMI)
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_schauto
  label: Resolution AUTO (HDMI)
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_sch_query
  label: Resolution Status Query (HDMI)
  kind: query
  command: "VSSCH ?"
  params: []

- id: vs_audio_amp
  label: HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []

- id: vs_audio_tv
  label: HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV"
  params: []

- id: vs_audio_query
  label: HDMI Audio Output Status Query
  kind: query
  command: "VSAUDIO ?"
  params: []

- id: vs_vpmauto
  label: Video Processing Mode AUTO
  kind: action
  command: "VSVPMAUTO"
  params: []

- id: vs_vpmgame
  label: Video Processing Mode GAME
  kind: action
  command: "VSVPMGAME"
  params: []

- id: vs_vpmmovi
  label: Video Processing Mode MOVIE
  kind: action
  command: "VSVPMMOVI"
  params: []

- id: vs_vpm_query
  label: Video Processing Mode Status Query
  kind: query
  command: "VSVPM ?"
  params: []

- id: vs_vst_on
  label: Vertical Stretch On
  kind: action
  command: "VSVST ON"
  params: []

- id: vs_vst_off
  label: Vertical Stretch Off
  kind: action
  command: "VSVST OFF"
  params: []

- id: vs_vst_query
  label: Vertical Stretch Status Query
  kind: query
  command: "VSVST ?"
  params: []
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  command: "PSTONE CTRL ON"
  params: []

- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  command: "PSTONE CTRL OFF"
  params: []

- id: ps_tone_ctrl_query
  label: Tone Control Status Query
  kind: query
  command: "PSTONE CTRL ?"
  params: []

- id: ps_bas_up
  label: Bass Up
  kind: action
  command: "PSBAS UP"
  params: []

- id: ps_bas_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN"
  params: []

- id: ps_bas_set
  label: Bass Set
  kind: action
  command: "PSBAS {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 50=0dB; operable range 44-56 (-6 to +6 dB)
  notes: AVR operates 44-56 only

- id: ps_bas_query
  label: Bass Status Query
  kind: query
  command: "PSBAS ?"
  params: []

- id: ps_tre_up
  label: Treble Up
  kind: action
  command: "PSTRE UP"
  params: []

- id: ps_tre_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN"
  params: []

- id: ps_tre_set
  label: Treble Set
  kind: action
  command: "PSTRE {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 50=0dB; operable range 44-56 (-6 to +6 dB)

- id: ps_tre_query
  label: Treble Status Query
  kind: query
  command: "PSTRE ?"
  params: []

- id: ps_dil_on
  label: Dialog Level Adjust On
  kind: action
  command: "PSDIL ON"
  params: []

- id: ps_dil_off
  label: Dialog Level Adjust Off
  kind: action
  command: "PSDIL OFF"
  params: []

- id: ps_dil_up
  label: Dialog Level Adjust Up
  kind: action
  command: "PSDIL UP"
  params: []

- id: ps_dil_down
  label: Dialog Level Adjust Down
  kind: action
  command: "PSDIL DOWN"
  params: []

- id: ps_dil_set
  label: Dialog Level Adjust Set
  kind: action
  command: "PSDIL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: ps_dil_query
  label: Dialog Level Adjust Status Query
  kind: query
  command: "PSDIL ?"
  params: []

- id: ps_swl_on
  label: Subwoofer Level Adjust On
  kind: action
  command: "PSSWL ON"
  params: []

- id: ps_swl_off
  label: Subwoofer Level Adjust Off
  kind: action
  command: "PSSWL OFF"
  params: []

- id: ps_swl_up
  label: Subwoofer Level Adjust Up
  kind: action
  command: "PSSWL UP"
  params: []

- id: ps_swl_down
  label: Subwoofer Level Adjust Down
  kind: action
  command: "PSSWL DOWN"
  params: []

- id: ps_swl_set
  label: Subwoofer Level Adjust Set
  kind: action
  command: "PSSWL {value}"
  params:
    - name: value
      type: string
      description: 00, 38-62 ASCII; 50=0dB
  notes: SUBWOOFER(1) ch

- id: ps_swl2_up
  label: Subwoofer 2 Level Adjust Up
  kind: action
  command: "PSSWL2 UP"
  params: []

- id: ps_swl2_down
  label: Subwoofer 2 Level Adjust Down
  kind: action
  command: "PSSWL2 DOWN"
  params: []

- id: ps_swl2_set
  label: Subwoofer 2 Level Adjust Set
  kind: action
  command: "PSSWL2 {value}"
  params:
    - name: value
      type: string
      description: 00, 38-62 ASCII; 50=0dB

- id: ps_swl_query
  label: Subwoofer Level Status Query
  kind: query
  command: "PSSWL ?"
  params: []
  notes: If SW2 absent, PSSWL2 not output

- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  command: "PSCINEMA EQ.ON"
  params: []

- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  command: "PSCINEMA EQ.OFF"
  params: []

- id: ps_cinema_eq_query
  label: Cinema EQ Status Query
  kind: query
  command: "PSCINEMA EQ. ?"
  params: []

- id: ps_mode_music
  label: PL Mode Music
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: PL Mode Cinema
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: PL Mode Game
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: PL Mode Pro Logic
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []

- id: ps_mode_height
  label: PL Mode PL2z Height (EVENT only)
  kind: action
  command: "PSMODE:HEIGHT"
  params: []

- id: ps_mode_query
  label: PL Mode Status Query
  kind: query
  command: "PSMODE: ?"
  params: []

- id: ps_lom_on
  label: Loudness Management On
  kind: action
  command: "PSLOM ON"
  params: []

- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  command: "PSLOM OFF"
  params: []

- id: ps_lom_query
  label: Loudness Management Status Query
  kind: query
  command: "PSLOM ?"
  params: []

- id: ps_fh_on
  label: Front Height (PLIIx Height) Output On
  kind: action
  command: "PSFH:ON"
  params: []

- id: ps_fh_off
  label: Front Height (PLIIx Height) Output Off
  kind: action
  command: "PSFH:OFF"
  params: []

- id: ps_fh_query
  label: Front Height Status Query
  kind: query
  command: "PSFH: ?"
  params: []

- id: ps_sp_fw
  label: Speaker Output F.Wide
  kind: action
  command: "PSSP:FW"
  params: []

- id: ps_sp_fh
  label: Speaker Output F.Height
  kind: action
  command: "PSSP:FH"
  params: []

- id: ps_sp_sb
  label: Speaker Output S.Back
  kind: action
  command: "PSSP:SB"
  params: []

- id: ps_sp_hw
  label: Speaker Output Front Height & Front Wide
  kind: action
  command: "PSSP:HW"
  params: []

- id: ps_sp_bh
  label: Speaker Output Surround Back & Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output Surround Back & Front Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: ps_sp_hf
  label: Speaker Output Height & Floor
  kind: action
  command: "PSSP:HF"
  params: []

- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  command: "PSSP:FR"
  params: []

- id: ps_sp_query
  label: Speaker Output Status Query
  kind: query
  command: "PSSP: ?"
  params: []

- id: ps_phg_low
  label: PL2z Height Gain Low
  kind: action
  command: "PSPHG LOW"
  params: []

- id: ps_phg_mid
  label: PL2z Height Gain Mid
  kind: action
  command: "PSPHG MID"
  params: []

- id: ps_phg_hi
  label: PL2z Height Gain High
  kind: action
  command: "PSPHG HI"
  params: []

- id: ps_phg_query
  label: PL2z Height Gain Status Query
  kind: query
  command: "PSPHG ?"
  params: []

- id: ps_multeq_audyssey
  label: MultEQ Mode Audyssey (Reference)
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ Mode L/R Bypass
  kind: action
  command: "PSMULTEQ:BYP.LR"
  params: []

- id: ps_multeq_flat
  label: MultEQ Mode Flat
  kind: action
  command: "PSMULTEQ:FLAT"
  params: []

- id: ps_multeq_manual
  label: MultEQ Mode Manual
  kind: action
  command: "PSMULTEQ:MANUAL"
  params: []

- id: ps_multeq_off
  label: MultEQ Mode Off
  kind: action
  command: "PSMULTEQ:OFF"
  params: []

- id: ps_multeq_query
  label: MultEQ Status Query
  kind: query
  command: "PSMULTEQ: ?"
  params: []

- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  command: "PSDYNEQ ON"
  params: []

- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  command: "PSDYNEQ OFF"
  params: []

- id: ps_dyneq_query
  label: Dynamic EQ Status Query
  kind: query
  command: "PSDYNEQ ?"
  params: []

- id: ps_reflev_0
  label: Reference Level Offset 0dB
  kind: action
  command: "PSREFLEV 0"
  params: []

- id: ps_reflev_5
  label: Reference Level Offset 5dB
  kind: action
  command: "PSREFLEV 5"
  params: []

- id: ps_reflev_10
  label: Reference Level Offset 10dB
  kind: action
  command: "PSREFLEV 10"
  params: []

- id: ps_reflev_15
  label: Reference Level Offset 15dB
  kind: action
  command: "PSREFLEV 15"
  params: []

- id: ps_reflev_query
  label: Reference Level Offset Status Query
  kind: query
  command: "PSREFLEV ?"
  params: []

- id: ps_dynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV"
  params: []

- id: ps_dynvol_med
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED"
  params: []

- id: ps_dynvol_lit
  label: Dynamic Volume Light
  kind: action
  command: "PSDYNVOL LIT"
  params: []

- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  command: "PSDYNVOL OFF"
  params: []

- id: ps_dynvol_query
  label: Dynamic Volume Status Query
  kind: query
  command: "PSDYNVOL ?"
  params: []

- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  command: "PSLFC ON"
  params: []

- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  command: "PSLFC OFF"
  params: []

- id: ps_lfc_query
  label: Audyssey LFC Status Query
  kind: query
  command: "PSLFC ?"
  params: []

- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  command: "PSCNTAMT UP"
  params: []

- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  command: "PSCNTAMT DOWN"
  params: []

- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; operable range 01-07
  notes: AVR operates 01-07 only

- id: ps_cntamt_query
  label: Containment Amount Status Query
  kind: query
  command: "PSCNTAMT ?"
  params: []

- id: ps_dsx_onhw
  label: Audyssey DSX On Height & Wide
  kind: action
  command: "PSDSX ONHW"
  params: []

- id: ps_dsx_onh
  label: Audyssey DSX On Height
  kind: action
  command: "PSDSX ONH"
  params: []

- id: ps_dsx_onw
  label: Audyssey DSX On Width
  kind: action
  command: "PSDSX ONW"
  params: []

- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF"
  params: []

- id: ps_dsx_query
  label: Audyssey DSX Status Query
  kind: query
  command: "PSDSX ?"
  params: []

- id: ps_stw_up
  label: Stage Width Up
  kind: action
  command: "PSSTW UP"
  params: []

- id: ps_stw_down
  label: Stage Width Down
  kind: action
  command: "PSSTW DOWN"
  params: []

- id: ps_stw_set
  label: Stage Width Set
  kind: action
  command: "PSSTW {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 50=0dB; operable range 40-60 (-10 to +10)

- id: ps_stw_query
  label: Stage Width Status Query
  kind: query
  command: "PSSTW ?"
  params: []

- id: ps_sth_up
  label: Stage Height Up
  kind: action
  command: "PSSTH UP"
  params: []

- id: ps_sth_down
  label: Stage Height Down
  kind: action
  command: "PSSTH DOWN"
  params: []

- id: ps_sth_set
  label: Stage Height Set
  kind: action
  command: "PSSTH {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 50=0dB; operable range 40-60 (-10 to +10)

- id: ps_sth_query
  label: Stage Height Status Query
  kind: query
  command: "PSSTH ?"
  params: []

- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  command: "PSGEQ ON"
  params: []

- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  command: "PSGEQ OFF"
  params: []

- id: ps_geq_query
  label: Graphic EQ Status Query
  kind: query
  command: "PSGEQ ?"
  params: []

- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  command: "PSDRC AUTO"
  params: []

- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  command: "PSDRC LOW"
  params: []

- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  command: "PSDRC MID"
  params: []

- id: ps_drc_hi
  label: Dynamic Compression High
  kind: action
  command: "PSDRC HI"
  params: []

- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  command: "PSDRC OFF"
  params: []

- id: ps_drc_query
  label: Dynamic Compression Status Query
  kind: query
  command: "PSDRC ?"
  params: []

- id: ps_bsc_up
  label: Bass Sync Up
  kind: action
  command: "PSBSC UP"
  params: []

- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  command: "PSBSC DOWN"
  params: []

- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  command: "PSBSC {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0; operable range 00-16

- id: ps_bsc_query
  label: Bass Sync Status Query
  kind: query
  command: "PSBSC ?"
  params: []

- id: ps_deh_off
  label: Dialogue Enhancer Off
  kind: action
  command: "PSDEH OFF"
  params: []

- id: ps_deh_low
  label: Dialogue Enhancer Low
  kind: action
  command: "PSDEH LOW"
  params: []

- id: ps_deh_med
  label: Dialogue Enhancer Medium
  kind: action
  command: "PSDEH MED"
  params: []

- id: ps_deh_high
  label: Dialogue Enhancer High
  kind: action
  command: "PSDEH HIGH"
  params: []

- id: ps_deh_query
  label: Dialogue Enhancer Status Query
  kind: query
  command: "PSDEH ?"
  params: []

- id: ps_lfe_up
  label: LFE Up
  kind: action
  command: "PSLFE UP"
  params: []

- id: ps_lfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN"
  params: []

- id: ps_lfe_set
  label: LFE Set
  kind: action
  command: "PSLFE {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0dB; 10=-10dB; operable range 0 to -10

- id: ps_lfe_query
  label: LFE Status Query
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level 00 (When EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []

- id: ps_lfl_05
  label: LFE Level 05
  kind: action
  command: "PSLFL 05"
  params: []

- id: ps_lfl_10
  label: LFE Level 10
  kind: action
  command: "PSLFL 10"
  params: []

- id: ps_lfl_15
  label: LFE Level 15
  kind: action
  command: "PSLFL 15"
  params: []

- id: ps_lfl_query
  label: LFL Status Query
  kind: query
  command: "PSLFL ?"
  params: []

- id: ps_eff_on
  label: Effect On
  kind: action
  command: "PSEFF ON"
  params: []

- id: ps_eff_off
  label: Effect Off
  kind: action
  command: "PSEFF OFF"
  params: []

- id: ps_eff_up
  label: Effect Level Up
  kind: action
  command: "PSEFF UP"
  params: []

- id: ps_eff_down
  label: Effect Level Down
  kind: action
  command: "PSEFF DOWN"
  params: []

- id: ps_eff_set
  label: Effect Level Set
  kind: action
  command: "PSEFF {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0dB; 10=10dB; operable range 1-15

- id: ps_eff_query
  label: Effect Status Query
  kind: query
  command: "PSEFF ?"
  params: []

- id: ps_del_up
  label: Delay Up
  kind: action
  command: "PSDEL UP"
  params: []

- id: ps_del_down
  label: Delay Down
  kind: action
  command: "PSDEL DOWN"
  params: []

- id: ps_del_set
  label: Delay Set
  kind: action
  command: "PSDEL {ms}"
  params:
    - name: ms
      type: string
      description: "000-999 ASCII; 000=0ms, 300=300ms; operable 0-300ms; 0-60ms:3ms/step, over 60ms:10ms/step"

- id: ps_del_query
  label: Delay Status Query
  kind: query
  command: "PSDEL ?"
  params: []

- id: ps_pan_on
  label: Panorama On
  kind: action
  command: "PSPAN ON"
  params: []

- id: ps_pan_off
  label: Panorama Off
  kind: action
  command: "PSPAN OFF"
  params: []

- id: ps_pan_query
  label: Panorama Status Query
  kind: query
  command: "PSPAN ?"
  params: []

- id: ps_dim_up
  label: Dimension Up
  kind: action
  command: "PSDIM UP"
  params: []

- id: ps_dim_down
  label: Dimension Down
  kind: action
  command: "PSDIM DOWN"
  params: []

- id: ps_dim_set
  label: Dimension Set
  kind: action
  command: "PSDIM {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0; operable 0-6

- id: ps_dim_query
  label: Dimension Status Query
  kind: query
  command: "PSDIM ?"
  params: []

- id: ps_cen_up
  label: Center Width Up
  kind: action
  command: "PSCEN UP"
  params: []

- id: ps_cen_down
  label: Center Width Down
  kind: action
  command: "PSCEN DOWN"
  params: []

- id: ps_cen_set
  label: Center Width Set
  kind: action
  command: "PSCEN {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0; operable 0-7

- id: ps_cen_query
  label: Center Width Status Query
  kind: query
  command: "PSCEN ?"
  params: []

- id: ps_cei_up
  label: Center Image Up
  kind: action
  command: "PSCEI UP"
  params: []

- id: ps_cei_down
  label: Center Image Down
  kind: action
  command: "PSCEI DOWN"
  params: []

- id: ps_cei_set
  label: Center Image Set
  kind: action
  command: "PSCEI {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0.0; operable 0.0-1.0

- id: ps_cei_query
  label: Center Image Status Query
  kind: query
  command: "PSCEI ?"
  params: []

- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  command: "PSCEG UP"
  params: []

- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  command: "PSCEG DOWN"
  params: []

- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  command: "PSCEG {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 00=0.0; operable 0.0-1.0

- id: ps_ceg_query
  label: Center Gain Status Query
  kind: query
  command: "PSCEG ?"
  params: []

- id: ps_ces_on
  label: Center Spread On
  kind: action
  command: "PSCES ON"
  params: []

- id: ps_ces_off
  label: Center Spread Off
  kind: action
  command: "PSCES OFF"
  params: []

- id: ps_ces_query
  label: Center Spread Status Query
  kind: query
  command: "PSCES ?"
  params: []

- id: ps_swr_on
  label: Subwoofer On (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR ON"
  params: []
  notes: In DIRECT, STEREO (2ch) mode

- id: ps_swr_off
  label: Subwoofer Off
  kind: action
  command: "PSSWR OFF"
  params: []

- id: ps_swr_query
  label: Subwoofer Status Query
  kind: query
  command: "PSSWR ?"
  params: []

- id: ps_rsz_s
  label: Room Size Small
  kind: action
  command: "PSRSZ S"
  params: []

- id: ps_rsz_ms
  label: Room Size Medium-Small
  kind: action
  command: "PSRSZ MS"
  params: []

- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M"
  params: []

- id: ps_rsz_ml
  label: Room Size Medium-Large
  kind: action
  command: "PSRSZ ML"
  params: []

- id: ps_rsz_l
  label: Room Size Large
  kind: action
  command: "PSRSZ L"
  params: []

- id: ps_rsz_query
  label: Room Size Status Query
  kind: query
  command: "PSRSZ ?"
  params: []

- id: ps_delay_up
  label: Audio Delay Up
  kind: action
  command: "PSDELAY UP"
  params: []

- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  command: "PSDELAY DOWN"
  params: []

- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {ms}"
  params:
    - name: ms
      type: string
      description: 000-999 ASCII; 000=0ms, 200=200ms; operable 0-200

- id: ps_delay_query
  label: Audio Delay Status Query
  kind: query
  command: "PSDELAY ?"
  params: []

- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF"
  params: []

- id: ps_rstr_low
  label: Audio Restorer Low (MODE3)
  kind: action
  command: "PSRSTR LOW"
  params: []

- id: ps_rstr_med
  label: Audio Restorer Medium (MODE2)
  kind: action
  command: "PSRSTR MED"
  params: []

- id: ps_rstr_hi
  label: Audio Restorer High (MODE1)
  kind: action
  command: "PSRSTR HI"
  params: []

- id: ps_rstr_query
  label: Audio Restorer Status Query
  kind: query
  command: "PSRSTR ?"
  params: []

- id: ps_front_spa
  label: Front Speaker A
  kind: action
  command: "PSFRONT SPA"
  params: []

- id: ps_front_spb
  label: Front Speaker B
  kind: action
  command: "PSFRONT SPB"
  params: []

- id: ps_front_a_b
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B"
  params: []

- id: ps_front_query
  label: Front Speaker Status Query
  kind: query
  command: "PSFRONT ?"
  params: []

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  command: "PSAUROPR SMA"
  params: []
  notes: Auro-3D Upgrade only

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  command: "PSAUROPR MED"
  params: []

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  command: "PSAUROPR LAR"
  params: []

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Speech
  kind: action
  command: "PSAUROPR SPE"
  params: []

- id: ps_auropr_query
  label: Auro-Matic 3D Preset Status Query
  kind: query
  command: "PSAUROPR ?"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP"
  params: []
  notes: Auro-3D Upgrade only

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN"
  params: []

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  command: "PSAUROST {value}"
  params:
    - name: value
      type: string
      description: 00-99 ASCII; 01=1, 10=10; operable 1-16

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Status Query
  kind: query
  command: "PSAUROST ?"
  params: []
- id: pv_off
  label: Picture Mode Off
  kind: action
  command: "PVOFF"
  params: []

- id: pv_std
  label: Picture Mode Standard
  kind: action
  command: "PVSTD"
  params: []

- id: pv_mov
  label: Picture Mode Movie
  kind: action
  command: "PVMOV"
  params: []

- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  command: "PVVVD"
  params: []

- id: pv_stm
  label: Picture Mode Stream
  kind: action
  command: "PVSTM"
  params: []

- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  command: "PVCTM"
  params: []

- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  command: "PVDAY"
  params: []

- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  command: "PVNGT"
  params: []

- id: pv_query
  label: Picture Mode Status Query
  kind: query
  command: "PV?"
  params: []

- id: pv_cn_up
  label: Contrast Up
  kind: action
  command: "PVCN UP"
  params: []

- id: pv_cn_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN"
  params: []

- id: pv_cn_set
  label: Contrast Set
  kind: action
  command: "PVCN {value}"
  params:
    - name: value
      type: string
      description: 000-100 ASCII; 050=0; operable -50 to +50 (000 to 100)

- id: pv_cn_query
  label: Contrast Status Query
  kind: query
  command: "PVCN ?"
  params: []

- id: pv_br_up
  label: Brightness Up
  kind: action
  command: "PVBR UP"
  params: []

- id: pv_br_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN"
  params: []

- id: pv_br_set
  label: Brightness Set
  kind: action
  command: "PVBR {value}"
  params:
    - name: value
      type: string
      description: 000-100 ASCII; 050=0; operable -50 to +50

- id: pv_br_query
  label: Brightness Status Query
  kind: query
  command: "PVBR ?"
  params: []

- id: pv_st_up
  label: Saturation Up
  kind: action
  command: "PVST UP"
  params: []

- id: pv_st_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN"
  params: []

- id: pv_st_set
  label: Saturation Set
  kind: action
  command: "PVST {value}"
  params:
    - name: value
      type: string
      description: 000-100 ASCII; 050=0; operable -50 to +50

- id: pv_st_query
  label: Saturation Status Query
  kind: query
  command: "PVST ?"
  params: []

- id: pv_hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP"
  params: []

- id: pv_hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN"
  params: []

- id: pv_hue_set
  label: Hue Set
  kind: action
  command: "PVHUE {value}"
  params:
    - name: value
      type: string
      description: 44-56 ASCII; 50=0; operable -6 to +6

- id: pv_hue_query
  label: Hue Status Query
  kind: query
  command: "PVHUE ?"
  params: []

- id: pv_dnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF"
  params: []

- id: pv_dnr_low
  label: DNR Low
  kind: action
  command: "PVDNR LOW"
  params: []

- id: pv_dnr_mid
  label: DNR Mid
  kind: action
  command: "PVDNR MID"
  params: []

- id: pv_dnr_hi
  label: DNR High
  kind: action
  command: "PVDNR HI"
  params: []

- id: pv_dnr_query
  label: DNR Status Query
  kind: query
  command: "PVDNR ?"
  params: []

- id: pv_enh_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP"
  params: []

- id: pv_enh_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN"
  params: []

- id: pv_enh_set
  label: Enhancer Set
  kind: action
  command: "PVENH {value}"
  params:
    - name: value
      type: string
      description: 00-12 ASCII; 00=0; operable 0-12

- id: pv_enh_query
  label: Enhancer Status Query
  kind: query
  command: "PVENH ?"
  params: []

- id: z2_source
  label: Zone2 Source Same As Main Zone (cancel)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone2 Source Phono
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone2 Source CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone2 Source Tuner
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone2 Source DVD
  kind: action
  command: "Z2DVD"
  params: []
  notes: "X1100, S700: DVD/Blu-ray"

- id: z2_bd
  label: Zone2 Source Blu-ray
  kind: action
  command: "Z2BD"
  params: []

- id: z2_tv
  label: Zone2 Source TV
  kind: action
  command: "Z2TV"
  params: []

- id: z2_sat_cbl
  label: Zone2 Source SAT/CBL
  kind: action
  command: "Z2SAT/CBL"
  params: []

- id: z2_mplay
  label: Zone2 Source Media Player
  kind: action
  command: "Z2MPLAY"
  params: []
  notes: North America model only

- id: z2_game
  label: Zone2 Source Game
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone2 Source HD Radio
  kind: action
  command: "Z2HDRADIO"
  params: []
  notes: North America model only

- id: z2_net
  label: Zone2 Source NET
  kind: action
  command: "Z2NET"
  params: []
  notes: "2014 AVR: Online Music"

- id: z2_pandora
  label: Zone2 Source Pandora
  kind: action
  command: "Z2PANDORA"
  params: []
  notes: North America model only

- id: z2_siriusxm
  label: Zone2 Source SiriusXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone2 Source Spotify
  kind: action
  command: "Z2SPOTIFY"
  params: []
  notes: North America & Europe model only

- id: z2_lastfm
  label: Zone2 Source LastFM
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone2 Source Flickr
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone2 Source iRadio
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone2 Source Server
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone2 Source Favorites
  kind: action
  command: "Z2FAVORITES"
  params: []

- id: z2_aux1
  label: Zone2 Source AUX1
  kind: action
  command: "Z2AUX1"
  params: []
  notes: "X1100, S700: AUX"

- id: z2_aux2
  label: Zone2 Source AUX2
  kind: action
  command: "Z2AUX2"
  params: []

- id: z2_aux3
  label: Zone2 Source AUX3
  kind: action
  command: "Z2AUX3"
  params: []
  notes: When Additional Source is set to On

- id: z2_aux4
  label: Zone2 Source AUX4
  kind: action
  command: "Z2AUX4"
  params: []

- id: z2_aux5
  label: Zone2 Source AUX5
  kind: action
  command: "Z2AUX5"
  params: []

- id: z2_aux6
  label: Zone2 Source AUX6
  kind: action
  command: "Z2AUX6"
  params: []

- id: z2_aux7
  label: Zone2 Source AUX7
  kind: action
  command: "Z2AUX7"
  params: []

- id: z2_bt
  label: Zone2 Source Bluetooth
  kind: action
  command: "Z2BT"
  params: []

- id: z2_usb_ipod
  label: Zone2 Source USB/iPod
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone2 Source USB and Start Playback
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone2 Source USB and iPod Direct Start Playback
  kind: action
  command: "Z2IPD"
  params: []

- id: z2_irp
  label: Zone2 Source NET/USB and iRadio Recent Play
  kind: action
  command: "Z2IRP"
  params: []

- id: z2_fvp
  label: Zone2 Source NET/USB and Favorites Play
  kind: action
  command: "Z2FVP"
  params: []

- id: z2_quick1
  label: Zone2 Quick Select 1
  kind: action
  command: "Z2QUICK1"
  params: []

- id: z2_quick2
  label: Zone2 Quick Select 2
  kind: action
  command: "Z2QUICK2"
  params: []

- id: z2_quick3
  label: Zone2 Quick Select 3
  kind: action
  command: "Z2QUICK3"
  params: []

- id: z2_quick4
  label: Zone2 Quick Select 4
  kind: action
  command: "Z2QUICK4"
  params: []

- id: z2_quick5
  label: Zone2 Quick Select 5
  kind: action
  command: "Z2QUICK5"
  params: []

- id: z2_quick0
  label: Zone2 Quick Select 0
  kind: action
  command: "Z2QUICK0"
  params: []

- id: z2_quick1_memory
  label: Zone2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY"
  params: []

- id: z2_quick2_memory
  label: Zone2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY"
  params: []

- id: z2_quick3_memory
  label: Zone2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY"
  params: []

- id: z2_quick4_memory
  label: Zone2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY"
  params: []

- id: z2_quick5_memory
  label: Zone2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY"
  params: []

- id: z2_quick_query
  label: Zone2 Quick Select Status Query
  kind: query
  command: "Z2QUICK ?"
  params: []

- id: z2_favorite1
  label: Zone2 Favorite 1
  kind: action
  command: "Z2FAVORITE1"
  params: []

- id: z2_favorite2
  label: Zone2 Favorite 2
  kind: action
  command: "Z2FAVORITE2"
  params: []

- id: z2_favorite3
  label: Zone2 Favorite 3
  kind: action
  command: "Z2FAVORITE3"
  params: []

- id: z2_favorite4
  label: Zone2 Favorite 4
  kind: action
  command: "Z2FAVORITE4"
  params: []

- id: z2_favorite1_memory
  label: Zone2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY"
  params: []

- id: z2_favorite2_memory
  label: Zone2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY"
  params: []

- id: z2_favorite3_memory
  label: Zone2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY"
  params: []

- id: z2_favorite4_memory
  label: Zone2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY"
  params: []

- id: z2_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP"
  params: []

- id: z2_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []

- id: z2_vol_set
  label: Zone2 Volume Set
  kind: action
  command: "Z2{value}"
  params:
    - name: value
      type: string
      description: 00-98 ASCII; 80=0dB, 00=MIN
  notes: 2 ASCII chars

- id: z2_on
  label: Zone2 On
  kind: action
  command: "Z2ON"
  params: []

- id: z2_off
  label: Zone2 Off
  kind: action
  command: "Z2OFF"
  params: []

- id: z2_query
  label: Zone2 Status Query
  kind: query
  command: "Z2?"
  params: []
  notes: If ZONE2 mode selected, Z2 status returns; if REC mode selected, SR status returns

- id: z2mu_on
  label: Zone2 Mute On
  kind: action
  command: "Z2MUON"
  params: []

- id: z2mu_off
  label: Zone2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []

- id: z2mu_query
  label: Zone2 Mute Status Query
  kind: query
  command: "Z2MU?"
  params: []

- id: z2cs_st
  label: Zone2 Channel Stereo
  kind: action
  command: "Z2CSST"
  params: []

- id: z2cs_mono
  label: Zone2 Channel Mono
  kind: action
  command: "Z2CSMONO"
  params: []

- id: z2cs_query
  label: Zone2 Channel Status Query
  kind: query
  command: "Z2CS?"
  params: []

- id: z2cv_fl_up
  label: Zone2 Channel Volume FL Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2cv_fl_down
  label: Zone2 Channel Volume FL Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2cv_fl_set
  label: Zone2 Channel Volume FL Set
  kind: action
  command: "Z2CVFL {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: z2cv_fr_up
  label: Zone2 Channel Volume FR Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2cv_fr_down
  label: Zone2 Channel Volume FR Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2cv_fr_set
  label: Zone2 Channel Volume FR Set
  kind: action
  command: "Z2CVFR {value}"
  params:
    - name: value
      type: string
      description: 38-62 ASCII; 50=0dB

- id: z2cv_query
  label: Zone2 Channel Volume Status Query
  kind: query
  command: "Z2CV?"
  params: []

- id: z2hpf_on
  label: Zone2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []

- id: z2hpf_off
  label: Zone2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []

- id: z2hpf_query
  label: Zone2 HPF Status Query
  kind: query
  command: "Z2HPF?"
  params: []

- id: z2ps_bas_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []
  notes: "X4100: 36-64 / 2dB step"

- id: z2ps_bas_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []

- id: z2ps_bas_set
  label: Zone2 Bass Set
  kind: action
  command: "Z2PSBAS {value}"
  params:
    - name: value
      type: string
      description: "00-99 ASCII; 50=0dB; range -10 to +10 (40-60) typical; X4100: -14 to +14 (36-64) / 2dB step"

- id: z2ps_bas_query
  label: Zone2 Bass Status Query
  kind: query
  command: "Z2PSBAS ?"
  params: []

- id: z2ps_tre_up
  label: Zone2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []

- id: z2ps_tre_down
  label: Zone2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []

- id: z2ps_tre_set
  label: Zone2 Treble Set
  kind: action
  command: "Z2PSTRE {value}"
  params:
    - name: value
      type: string
      description: "00-99 ASCII; 50=0dB; range -10 to +10 (40-60) typical; X4100: -14 to +14 (36-64) / 2dB step"

- id: z2ps_tre_query
  label: Zone2 Treble Status Query
  kind: query
  command: "Z2PSTRE ?"
  params: []

- id: z2hda_thr
  label: Zone2 HDMI Out Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2hda_pcm
  label: Zone2 HDMI Out PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2hda_query
  label: Zone2 HDMI Out Status Query
  kind: query
  command: "Z2HDA?"
  params: []

- id: z2slp_off
  label: Zone2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []

- id: z2slp_set
  label: Zone2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: 001-120 by ASCII; 010=10min

- id: z2slp_query
  label: Zone2 Sleep Timer Status Query
  kind: query
  command: "Z2SLP?"
  params: []

- id: z2stby_2h
  label: Zone2 Auto Standby 2H
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2stby_4h
  label: Zone2 Auto Standby 4H
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2stby_8h
  label: Zone2 Auto Standby 8H
  kind: action
  command: "Z2STBY8H"
  params: []

- id: z2stby_off
  label: Zone2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []

- id: z2stby_query
  label: Zone2 Auto Standby Status Query
  kind: query
  command: "Z2STBY?"
  params: []
- id: z3_source
  label: Zone3 Source (cancel to main)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone3 Select Phono
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone3 Select CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone3 Select Tuner
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone3 Select DVD
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone3 Select Blu-ray
  kind: action
  command: "Z3BD"
  params: []

- id: z3_tv
  label: Zone3 Select TV
  kind: action
  command: "Z3TV"
  params: []

- id: z3_sat_cbl
  label: Zone3 Select SAT/CBL
  kind: action
  command: "Z3SAT/CBL"
  params: []

- id: z3_mplay
  label: Zone3 Select Media Player
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone3 Select Game
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone3 Select HD Radio (NA only)
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone3 Select NET
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone3 Select Pandora (NA only)
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone3 Select SiriusXM (NA only)
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone3 Select Spotify (NA & EU only)
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone3 Select LastFM
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone3 Select Flickr
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone3 Select iRadio
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone3 Select Server
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone3 Select Favorites
  kind: action
  command: "Z3FAVORITES"
  params: []

- id: z3_aux1
  label: Zone3 Select AUX1
  kind: action
  command: "Z3AUX1"
  params: []

- id: z3_aux2
  label: Zone3 Select AUX2
  kind: action
  command: "Z3AUX2"
  params: []

- id: z3_aux3
  label: Zone3 Select AUX3 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX3"
  params: []

- id: z3_aux4
  label: Zone3 Select AUX4 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX4"
  params: []

- id: z3_aux5
  label: Zone3 Select AUX5 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX5"
  params: []

- id: z3_aux6
  label: Zone3 Select AUX6 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX6"
  params: []

- id: z3_aux7
  label: Zone3 Select AUX7 (when Additional Source is set to On)
  kind: action
  command: "Z3AUX7"
  params: []

- id: z3_bt
  label: Zone3 Select Bluetooth
  kind: action
  command: "Z3BT"
  params: []

- id: z3_usb_ipod
  label: Zone3 Select USB/iPod
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone3 Select USB + Start Playback
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone3 Select iPod DIRECT Start Playback
  kind: action
  command: "Z3IPD"
  params: []

- id: z3_irp
  label: Zone3 Select iRadio Recent Play
  kind: action
  command: "Z3IRP"
  params: []

- id: z3_fvp
  label: Zone3 Select Favorites Play
  kind: action
  command: "Z3FVP"
  params: []

- id: z3_quick1
  label: Zone3 Quick Select 1
  kind: action
  command: "Z3QUICK1"
  params: []

- id: z3_quick2
  label: Zone3 Quick Select 2
  kind: action
  command: "Z3QUICK2"
  params: []

- id: z3_quick3
  label: Zone3 Quick Select 3
  kind: action
  command: "Z3QUICK3"
  params: []

- id: z3_quick4
  label: Zone3 Quick Select 4
  kind: action
  command: "Z3QUICK4"
  params: []

- id: z3_quick5
  label: Zone3 Quick Select 5
  kind: action
  command: "Z3QUICK5"
  params: []

- id: z3_quick0
  label: Zone3 Quick Select Off
  kind: action
  command: "Z3QUICK0"
  params: []

- id: z3_quick1_memory
  label: Zone3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY"
  params: []

- id: z3_quick2_memory
  label: Zone3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY"
  params: []

- id: z3_quick3_memory
  label: Zone3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY"
  params: []

- id: z3_quick4_memory
  label: Zone3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY"
  params: []

- id: z3_quick5_memory
  label: Zone3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY"
  params: []

- id: z3_quick_query
  label: Zone3 Quick Select Status Query
  kind: query
  command: "Z3QUICK ?"
  params: []

- id: z3_favorite1
  label: Zone3 Favorite 1
  kind: action
  command: "Z3FAVORITE1"
  params: []

- id: z3_favorite2
  label: Zone3 Favorite 2
  kind: action
  command: "Z3FAVORITE2"
  params: []

- id: z3_favorite3
  label: Zone3 Favorite 3
  kind: action
  command: "Z3FAVORITE3"
  params: []

- id: z3_favorite4
  label: Zone3 Favorite 4
  kind: action
  command: "Z3FAVORITE4"
  params: []

- id: z3_favorite1_memory
  label: Zone3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY"
  params: []

- id: z3_favorite2_memory
  label: Zone3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY"
  params: []

- id: z3_favorite3_memory
  label: Zone3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY"
  params: []

- id: z3_favorite4_memory
  label: Zone3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY"
  params: []

- id: z3_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP"
  params: []

- id: z3_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []

- id: z3_set
  label: Zone3 Volume Set
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: 00-98 by ASCII, 80=0dB, 00=--- (MIN)
  notes: same 2/3-ASCII format as MV (0.5dB step)

- id: z3_on
  label: Zone3 Power On
  kind: action
  command: "Z3ON"
  params: []

- id: z3_off
  label: Zone3 Power Off
  kind: action
  command: "Z3OFF"
  params: []

- id: z3_query
  label: Zone3 Status Query
  kind: query
  command: "Z3?"
  params: []

- id: z3mu_on
  label: Zone3 Mute On
  kind: action
  command: "Z3MUON"
  params: []

- id: z3mu_off
  label: Zone3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []

- id: z3mu_query
  label: Zone3 Mute Status Query
  kind: query
  command: "Z3MU?"
  params: []

- id: z3cs_st
  label: Zone3 Channel Setting Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3cs_mono
  label: Zone3 Channel Setting Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3cs_query
  label: Zone3 Channel Setting Status Query
  kind: query
  command: "Z3CS?"
  params: []

- id: z3cv_fl_up
  label: Zone3 Channel Volume Front L Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3cv_fl_down
  label: Zone3 Channel Volume Front L Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3cv_fl_set
  label: Zone3 Channel Volume Front L Set
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: string
      description: 38-62 by ASCII, 50=0dB

- id: z3cv_fr_up
  label: Zone3 Channel Volume Front R Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3cv_fr_down
  label: Zone3 Channel Volume Front R Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3cv_fr_set
  label: Zone3 Channel Volume Front R Set
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: string
      description: 38-62 by ASCII, 50=0dB

- id: z3cv_query
  label: Zone3 Channel Volume Status Query
  kind: query
  command: "Z3CV?"
  params: []

- id: z3hpf_on
  label: Zone3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []

- id: z3hpf_off
  label: Zone3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []

- id: z3hpf_query
  label: Zone3 HPF Status Query
  kind: query
  command: "Z3HPF?"
  params: []

- id: z3ps_bas_up
  label: Zone3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []

- id: z3ps_bas_down
  label: Zone3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []

- id: z3ps_bas_set
  label: Zone3 Bass Set
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: string
      description: 00-99 by ASCII, 50=0dB (X4100 supports 36-64 / 2dB step)

- id: z3ps_bas_query
  label: Zone3 Bass Status Query
  kind: query
  command: "Z3PSBAS ?"
  params: []

- id: z3ps_tre_up
  label: Zone3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []

- id: z3ps_tre_down
  label: Zone3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []

- id: z3ps_tre_set
  label: Zone3 Treble Set
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: string
      description: 00-99 by ASCII, 50=0dB (X4100 supports 36-64 / 2dB step)

- id: z3ps_tre_query
  label: Zone3 Treble Status Query
  kind: query
  command: "Z3PSTRE ?"
  params: []

- id: z3slp_off
  label: Zone3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []

- id: z3slp_set
  label: Zone3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: 001-120 by ASCII; 010=10min

- id: z3slp_query
  label: Zone3 Sleep Timer Status Query
  kind: query
  command: "Z3SLP?"
  params: []

- id: z3stby_2h
  label: Zone3 Auto Standby 2H
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3stby_4h
  label: Zone3 Auto Standby 4H
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3stby_8h
  label: Zone3 Auto Standby 8H
  kind: action
  command: "Z3STBY8H"
  params: []

- id: z3stby_off
  label: Zone3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []

- id: z3stby_query
  label: Zone3 Auto Standby Status Query
  kind: query
  command: "Z3STBY?"
  params: []

- id: tf_anup
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP"
  params: []

- id: tf_andown
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN"
  params: []

- id: tf_an_set
  label: Tuner Frequency Direct Set
  kind: action
  command: "TFAN{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits, e.g. 105000; >050000 is AM kHz, <050000 is FM MHz (e.g. TFAN105000 = 1050.00kHz AM)"

- id: tf_an_query
  label: Tuner Frequency Status Query
  kind: query
  command: "TFAN?"
  params: []

- id: tf_anname_query
  label: Tuner RDS Station Name Query (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

- id: tp_anup
  label: Tuner Preset Channel Up
  kind: action
  command: "TPANUP"
  params: []

- id: tp_andown
  label: Tuner Preset Channel Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tp_an_set
  label: Tuner Preset Channel Direct Set
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: 01-56, e.g. TPAN01

- id: tp_an_query
  label: Tuner Preset Channel Status Query
  kind: query
  command: "TPAN?"
  params: []

- id: tp_anoff
  label: Tuner Preset Mode Off
  kind: action
  command: "TPANOFF"
  params: []

- id: tp_anmem
  label: Tuner Preset Memory (interactive)
  kind: action
  command: "TPANMEM"
  params: []
  notes: "Interactive sequence: TPANMEM → select channel (TPANUP/TPANDOWN/TPAN**) → TPANMEM to confirm"

- id: tp_anmem_set
  label: Tuner Preset Memory Direct
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: 01-56

- id: tm_anam
  label: Tuner Band AM
  kind: action
  command: "TMANAM"
  params: []

- id: tm_anfm
  label: Tuner Band FM
  kind: action
  command: "TMANFM"
  params: []

- id: tm_an_query
  label: Tuner Band Status Query
  kind: query
  command: "TMAN?"
  params: []

- id: tm_anauto
  label: Tuner Tuning Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []

- id: tm_anmanual
  label: Tuner Tuning Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []

- id: tfhd_hdup
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP"
  params: []

- id: tfhd_hddown
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: tfhd_hd_set
  label: HD Radio Channel Direct Set
  kind: action
  command: "TFHD{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits; >050000 AM kHz, <050000 FM MHz"

- id: tfhd_hdmc_set
  label: HD Radio Multicast CH Select
  kind: action
  command: "TFHDMC{channel}"
  params:
    - name: channel
      type: string
      description: 1 digit, 1-8 multicast or 0 analog

- id: tfhd_freq_mc_set
  label: HD Radio Frequency + Multicast CH Set
  kind: action
  command: "TFHD{freq}MC{channel}"
  params:
    - name: freq
      type: string
      description: 6 digits
    - name: channel
      type: string
      description: 1 digit, 1-8 multicast

- id: tfhd_hd_query
  label: HD Radio Channel Status Query
  kind: query
  command: "TFHD?"
  params: []

- id: tphd_hdup
  label: HD Radio Preset Channel Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tphd_hddown
  label: HD Radio Preset Channel Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tphd_hd_set
  label: HD Radio Preset Channel Direct Set
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: 01-56

- id: tphd_hd_query
  label: HD Radio Preset Status Query
  kind: query
  command: "TPHD?"
  params: []

- id: tphd_hdoff
  label: HD Radio Preset Mode Off
  kind: action
  command: "TPHDOFF"
  params: []

- id: tphd_hdmem
  label: HD Radio Preset Memory (interactive)
  kind: action
  command: "TPHDMEM"
  params: []
  notes: "Interactive sequence: TPHDMEM → select channel (TPHDUP/TPHDDOWN/TPHD**) → TPHDMEM to confirm"

- id: tphd_hdmem_set
  label: HD Radio Preset Memory Direct
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: 01-56

- id: tmhd_hdam
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []

- id: tmhd_hdfm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

- id: tmhd_hdautohd
  label: HD Radio Tuning Mode Auto-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: tmhd_hdauto
  label: HD Radio Tuning Mode Auto
  kind: action
  command: "TMHDAUTO"
  params: []

- id: tmhd_hdmanual
  label: HD Radio Tuning Mode Manual
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: tmhd_hdanaauto
  label: HD Radio Tuning Mode Analog Auto
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tmhd_hdanamanu
  label: HD Radio Tuning Mode Analog Manual
  kind: action
  command: "TMHDANAMANU"
  params: []

- id: tmhd_hd_query
  label: HD Radio Band/Mode Status Query
  kind: query
  command: "TMHD?"
  params: []

- id: hd_query
  label: HD Radio Full Status Query
  kind: query
  command: "HD?"
  params: []
  notes: Returns band, station name, multicast current/cast CH, signal level, artist, title, album, genre, program type

- id: hd_st_name
  label: HD Radio Station Name
  kind: action
  command: "HDST NAME"
  params: []

- id: hd_sig_lev_0
  label: HD Radio Signal Level 0
  kind: action
  command: "HDSIG LEV 0"
  params: []

- id: hd_sig_lev_1
  label: HD Radio Signal Level 1
  kind: action
  command: "HDSIG LEV 1"
  params: []

- id: hd_sig_lev_2
  label: HD Radio Signal Level 2
  kind: action
  command: "HDSIG LEV 2"
  params: []

- id: hd_sig_lev_3
  label: HD Radio Signal Level 3
  kind: action
  command: "HDSIG LEV 3"
  params: []

- id: hd_sig_lev_4
  label: HD Radio Signal Level 4
  kind: action
  command: "HDSIG LEV 4"
  params: []

- id: hd_sig_lev_5
  label: HD Radio Signal Level 5
  kind: action
  command: "HDSIG LEV 5"
  params: []

- id: hd_sig_lev_6
  label: HD Radio Signal Level 6
  kind: action
  command: "HDSIG LEV 6"
  params: []

- id: hd_mlt_currch
  label: HD Radio Multicast Current Channel
  kind: action
  command: "HDMLT CURRCH{channel}"
  params:
    - name: channel
      type: string
      description: 1 digit

- id: hd_mlt_castch
  label: HD Radio Multicast Cast Channel
  kind: action
  command: "HDMLT CAST CH{channel}"
  params:
    - name: channel
      type: string
      description: 1 digit

- id: hd_pty
  label: HD Radio Program Type
  kind: action
  command: "HDPTY {program_type}"
  params:
    - name: program_type
      type: string
      description: 18 ASCII digits

- id: hd_artist
  label: HD Radio Artist
  kind: action
  command: "HDARTIST {artist}"
  params:
    - name: artist
      type: string
      description: 40 ASCII digits

- id: hd_title
  label: HD Radio Title
  kind: action
  command: "HDTITLE {title}"
  params:
    - name: title
      type: string
      description: 40 ASCII digits

- id: hd_album
  label: HD Radio Album
  kind: action
  command: "HDALBUM {album}"
  params:
    - name: album
      type: string
      description: 40 ASCII digits

- id: hd_genre
  label: HD Radio Genre
  kind: action
  command: "HDGENRE {genre}"
  params:
    - name: genre
      type: string
      description: 23 ASCII digits

- id: hd_mode_digital
  label: HD Radio Mode Digital
  kind: action
  command: "HDMODE DIGITAL"
  params: []

- id: hd_mode_analog
  label: HD Radio Mode Analog
  kind: action
  command: "HDMODE ANALOG"
  params: []

- id: ns_90
  label: NS Cursor Up
  kind: action
  command: "NS90"
  params: []
  notes: cursor/playback controls for Online Music / USB / iPod / Bluetooth

- id: ns_91
  label: NS Cursor Down
  kind: action
  command: "NS91"
  params: []

- id: ns_92
  label: NS Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_93
  label: NS Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_94
  label: NS Enter (Play/Pause)
  kind: action
  command: "NS94"
  params: []

- id: ns_9a
  label: NS Play
  kind: action
  command: "NS9A"
  params: []

- id: ns_9b
  label: NS Pause
  kind: action
  command: "NS9B"
  params: []

- id: ns_9c
  label: NS Stop
  kind: action
  command: "NS9C"
  params: []

- id: ns_9d
  label: NS Skip Plus
  kind: action
  command: "NS9D"
  params: []

- id: ns_9e
  label: NS Skip Minus
  kind: action
  command: "NS9E"
  params: []

- id: ns_9f
  label: NS Manual Search Plus
  kind: action
  command: "NS9F"
  params: []
  notes: USB/iPod, Media Server, Bluetooth

- id: ns_9g
  label: NS Manual Search Minus
  kind: action
  command: "NS9G"
  params: []
  notes: USB/iPod, Media Server, Bluetooth

- id: ns_9h
  label: NS Repeat One
  kind: action
  command: "NS9H"
  params: []
  notes: Media Server, USB, iPod Direct, Bluetooth

- id: ns_9i
  label: NS Repeat All
  kind: action
  command: "NS9I"
  params: []
  notes: Media Server, USB, iPod Direct, Bluetooth

- id: ns_9j
  label: NS Repeat Off
  kind: action
  command: "NS9J"
  params: []
  notes: Media Server, USB, iPod Direct, Bluetooth

- id: ns_9k
  label: NS Random On / Shuffle Songs
  kind: action
  command: "NS9K"
  params: []
  notes: Random for Media Server/USB/Bluetooth; Shuffle Songs for iPod Direct

- id: ns_9m
  label: NS Random Off / Shuffle Off
  kind: action
  command: "NS9M"
  params: []
  notes: Random for Media Server/USB/Bluetooth; Shuffle Off for iPod Direct

- id: ns_9w
  label: NS Toggle iPod / On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_9x
  label: NS Page Next
  kind: action
  command: "NS9X"
  params: []
  notes: except Bluetooth, AirPlay, Spotify remote

- id: ns_9y
  label: NS Page Previous
  kind: action
  command: "NS9Y"
  params: []
  notes: except Bluetooth, AirPlay, Spotify remote

- id: ns_9z
  label: NS Manual Search Stop
  kind: action
  command: "NS9Z"
  params: []
  notes: USB/iPod, Media Server, Bluetooth

- id: ns_rpt
  label: NS Repeat Toggle
  kind: action
  command: "NSRPT"
  params: []
  notes: Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth

- id: ns_rnd
  label: NS Random Toggle
  kind: action
  command: "NSRND"
  params: []
  notes: Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth

- id: ns_b_preset
  label: NS Preset Call
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: 00-35 (2014 AVR); except Bluetooth/USB/iPod

- id: ns_c_preset
  label: NS Preset Memory
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: 00-35 (2014 AVR); except Bluetooth/USB/iPod
  notes: Returns NSC{preset} then NSCOK

- id: ns_h
  label: NS Net Audio Preset Names
  kind: action
  command: "NSH"
  params: []
  notes: Returns 36 lines of 20-digit UTF-8 preset names (NSH00...NSH35...); except Bluetooth/USB/iPod

- id: ns_fv_mem
  label: NS Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_nsa
  label: NS Request Onscreen Info List (ASCII)
  kind: query
  command: "NSA"
  params: []
  notes: Returns NSA0-NSA8 ASCII rows; max 96 bytes each

- id: ns_nse
  label: NS Request Onscreen Info List (UTF-8)
  kind: query
  command: "NSE"
  params: []
  notes: Returns NSE0-NSE8 UTF-8 rows; max 96 bytes each

- id: mn_cup
  label: System Cursor Up
  kind: action
  command: "MNCUP"
  params: []

- id: mn_cdn
  label: System Cursor Down
  kind: action
  command: "MNCDN"
  params: []

- id: mn_clt
  label: System Cursor Left
  kind: action
  command: "MNCLT"
  params: []

- id: mn_crt
  label: System Cursor Right
  kind: action
  command: "MNCRT"
  params: []

- id: mn_ent
  label: System Enter
  kind: action
  command: "MNENT"
  params: []

- id: mn_rtn
  label: System Return
  kind: action
  command: "MNRTN"
  params: []

- id: mn_opt
  label: System Option
  kind: action
  command: "MNOPT"
  params: []

- id: mn_inf
  label: System Info
  kind: action
  command: "MNINF"
  params: []

- id: mn_chl
  label: System Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL"
  params: []

- id: mn_men_on
  label: System Setup Menu On
  kind: action
  command: "MNMEN ON"
  params: []

- id: mn_men_off
  label: System Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  params: []

- id: mn_men_query
  label: System Setup Menu Status Query
  kind: query
  command: "MNMEN?"
  params: []

- id: mn_prv_on
  label: System InstaPrevue On
  kind: action
  command: "MNPRV ON"
  params: []

- id: mn_prv_off
  label: System InstaPrevue Off
  kind: action
  command: "MNPRV OFF"
  params: []

- id: mn_prv_ng
  label: System InstaPrevue Not Available
  kind: action
  command: "MNPRV NG"
  params: []

- id: mn_prv_query
  label: System InstaPrevue Status Query
  kind: query
  command: "MNPRV?"
  params: []

- id: mn_zst_on
  label: System All Zone Stereo On
  kind: action
  command: "MNZST ON"
  params: []

- id: mn_zst_off
  label: System All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  params: []

- id: mn_zst_query
  label: System All Zone Stereo Status Query
  kind: query
  command: "MNZST?"
  params: []

- id: sy_remote_lock_on
  label: System Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON"
  params: []

- id: sy_remote_lock_off
  label: System Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF"
  params: []

- id: sy_panel_lock_on
  label: System Panel Button Lock On (except Master Vol)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: System Panel + Master Vol Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: System Panel + Master Vol Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

- id: tr1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON"
  params: []

- id: tr1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF"
  params: []

- id: tr2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON"
  params: []

- id: tr2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF"
  params: []

- id: tr_query
  label: Trigger Status Query
  kind: query
  command: "TR?"
  params: []

- id: ug_idn
  label: Upgrade ID Number
  kind: action
  command: "UGIDN"
  params: []
  notes: Returns UGIDN followed by 12-digit ID number on FL display; UGIDN NG if unavailable

- id: rm_sta
  label: Remote Maintenance Mode Start
  kind: action
  command: "RM STA"
  params: []

- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  command: "RM END"
  params: []

- id: rm_query
  label: Remote Maintenance Mode Status Query
  kind: query
  command: "RM ?"
  params: []

- id: dim_bri
  label: Dimmer Bright
  kind: action
  command: "DIM BRI"
  params: []

- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM"
  params: []

- id: dim_dar
  label: Dimmer Dark
  kind: action
  command: "DIM DAR"
  params: []

- id: dim_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF"
  params: []

- id: dim_sel
  label: Dimmer Cycle (toggle)
  kind: action
  command: "DIM SEL"
  params: []

- id: dim_query
  label: Dimmer Status Query
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  notes: Returned by PW? as "PWON" or "PWSTANDBY"

- id: mv_level
  type: integer
  range: [0, 98]
  notes: Master Volume in 0.5dB step; 2 ASCII chars (00-98, 80=0dB) or 3 ASCII chars (e.g. 805=+0.5dB). 00 = mute/--. Returned by MV?.

- id: cv_levels
  type: object
  description: Channel volume levels per speaker channel
  notes: "Returned by CV? in 38-62 range (50=0dB). Only configured speakers reply. Format: \"CVFL 62<CR>...CVEND<CR>\""

- id: mu_state
  type: enum
  values: [on, off]
  notes: Returned by MU? as "MUON" or "MUOFF"

- id: si_state
  type: string
  description: Current input source mnemonic (e.g. SIPHONO, SITUNER, SIBD, SINET)
  notes: Returned by SI?

- id: z2_state
  type: enum
  values: [on, off]
  notes: Returned by Z2?; also returns "Z2" status when zone2 is selected, "SR" when REC mode is selected

- id: z2mu_state
  type: enum
  values: [on, off]

- id: z2cs_state
  type: enum
  values: [stereo, mono]

- id: z3_state
  type: enum
  values: [on, off]

- id: z3mu_state
  type: enum
  values: [on, off]

- id: z3cs_state
  type: enum
  values: [stereo, mono]

- id: zm_state
  type: enum
  values: [on, off, source]
  notes: Returned by ZM?; ZMSOURCE means ZONE source same as MAIN

- id: surround_mode
  type: string
  description: Current surround mode mnemonic (e.g. MSMOVIE, MSSTANDARD, MSDOLBY ATMOS)
  notes: Returned by MS?

- id: vs_state
  type: string
  description: Current video select mode
  notes: Returned by VSVST? and similar queries

- id: pv_state
  type: string
  description: Current picture mode (OFF/STD/MOV/VVD/STM)

- id: eco_state
  type: string
  description: Current ECO mode
  notes: Returned by ECO?

- id: stby_state
  type: string
  description: Auto standby setting (OFF/15M/30M/60M)
  notes: Returned by STBY?

- id: slp_state
  type: string
  description: Sleep timer remaining or OFF
  notes: Returned by SLP?; 001-120

- id: sv_state
  type: string
  description: Video mute state (ON/OFF)
  notes: Returned by SV?

- id: sr_state
  type: string
  description: REC select source (SRCD/SRUSB DIRECT/SRIPOD DIRECT/SRSOURCE)

- id: tuner_freq
  type: string
  description: 6-digit tuner frequency (AM kHz >050000 or FM MHz <050000)
  notes: Returned by TFAN?

- id: tuner_preset
  type: string
  description: 2-digit preset channel 01-56
  notes: Returned by TPAN?; TPANOFF when preset mode off

- id: rds_station_name
  type: string
  description: RDS station name (8 ASCII chars)
  notes: Returned by TFANNAME?; empty if NULL

- id: hd_full_status
  type: object
  description: HD Radio full status (band, station name, multicast CH, signal level, artist, title, album, genre, PTY)
  notes: Returned by HD? and unsolicited HDST NAME/HDSIG LEV 0-6/HDMLT CURRCH*/CAST CH*/HDPTY/HDARTIST/HDTITLE/HDALBUM/HDGENRE/HDMODE DIGITAL|ANALOG

- id: net_preset_names
  type: object
  description: 36 net audio preset names (UTF-8, 20 digits each)
  notes: Returned by NSH as NSH00...NSH35

- id: net_onscreen_info
  type: object
  description: 9 lines of onscreen info (NSA0-NSA8 ASCII or NSE0-NSE8 UTF-8, 96 bytes each)

- id: trigger_state
  type: object
  description: Trigger 1 and 2 ON/OFF state
  notes: "Returned by TR? as \"TR1 ON<CR>TR2 ON<CR>\""

- id: remote_maint_state
  type: enum
  values: [on, off]
  notes: Returned by RM ? as "RM ON" or "RM OFF"

- id: dim_state
  type: string
  description: Current dimmer setting (BRI/DIM/DAR/OFF)
  notes: Returned by DIM ?

- id: menu_state
  type: enum
  values: [on, off]
  notes: Returned by MNMEN? as "MNMEN ON" or "MNMEN OFF"

- id: prv_state
  type: enum
  values: [on, off, not_available]
  notes: Returned by MNPRV?; MNPRV NG when InstaPrevue not available

- id: zst_state
  type: enum
  values: [on, off]
  notes: Returned by MNZST?; All Zone Stereo

- id: panel_lock_state
  type: string
  description: Lock state from SY commands
  notes: PANEL LOCK ON, PANEL+V LOCK ON, PANEL LOCK OFF (covers both)

- id: upgrade_id
  type: string
  description: 12-digit upgrade ID number on FL display
  notes: Returned by UGIDN; UGIDN NG if unavailable
```

## Variables
```yaml
- id: mv_level
  type: integer
  description: Master volume level
  range: [0, 98]
  unit: 0.5dB step (0.5dB uses 3 ASCII chars)
  notes: 80=0dB, 00=mute/--. Set via MV{level}.

- id: cv_fl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: 50=0dB. Set via CVFL {level}.

- id: cv_fr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: 50=0dB. Set via CVFR {level}.

- id: cv_c_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: 50=0dB. Set via CVC {level}.

- id: cv_sw_level
  type: integer
  range: [0, 62]
  unit: 0.5dB
  notes: 00 or 38-62, 50=0dB. Set via CVSW {level}.

- id: cv_sw2_level
  type: integer
  range: [0, 62]
  unit: 0.5dB
  notes: 00 or 38-62, 50=0dB. Set via CVSW2 {level}.

- id: cv_sl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB

- id: cv_sr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB

- id: cv_sbl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: SBL (Surround Back L for 2SP SB)

- id: cv_sbr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB

- id: cv_sb_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: SB (single Surround Back, 1SP)

- id: cv_fhl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Height L

- id: cv_fhr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Height R

- id: cv_fwl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Wide L

- id: cv_fwr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Wide R

- id: cv_tfl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Front L

- id: cv_tfr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Front R

- id: cv_tml_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Middle L

- id: cv_tmr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Middle R

- id: cv_trl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Rear L

- id: cv_trr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Top Rear R

- id: cv_rhl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Rear Height L

- id: cv_rhr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Rear Height R

- id: cv_fdl_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Dolby L

- id: cv_fdr_level
  type: integer
  range: [38, 62]
  unit: 0.5dB
  notes: Front Dolby R
```

## Events
```yaml
# Unsolicited notifications (EVENTs) the device sends.
# The source documents that some commands return the new state as an EVENT in
# addition to the response, including: PW, MV, MU, SI, ZM, Z2 (when zone2 selected),
# Z3, MS, CV (when input source changes), DC, SLP, STBY, SV, ECO, Z2STBY, SR, PS.
# Also: CHANNEL VOLUME EVENT returns when input source changes (Notes A-E).
# SURROUND MODE EVENT returns when input source changes (Notes C, D, F).
- id: pw_event
  description: Power state changed (PWON/PWSTANDBY)

- id: mv_event
  description: Master volume changed

- id: mu_event
  description: Mute state changed (MUON/MUOFF)

- id: si_event
  description: Input source changed

- id: zm_event
  description: Main zone state changed (ZMON/ZMOFF/ZMSOURCE)

- id: z2_event
  description: Zone2 state changed (Z2ON/Z2OFF)

- id: z3_event
  description: Zone3 state changed (Z3ON/Z3OFF)

- id: ms_event
  description: Surround mode changed

- id: cv_event
  description: Channel volume changed (per configured channel)

- id: dc_event
  description: Digital input mode changed (AC/DC/PCM)

- id: slp_event
  description: Sleep timer state changed

- id: stby_event
  description: Auto standby setting changed

- id: sv_event
  description: Video mute state changed (SVON/SVOFF)

- id: eco_event
  description: ECO mode changed

- id: z2stby_event
  description: Zone2 auto standby setting changed

- id: sr_event
  description: REC select source changed (SRCD/SRUSB DIRECT/SRIPOD DIRECT/SRSOURCE)

- id: ps_event
  description: PS parameter setting changed (per sub-mnemonic)

- id: hd_event
  description: HD Radio status changed (band/station/multicast/signal level/artist/title/album/genre/PTY/mode)

- id: ns_event
  description: NS cursor/playback position changed (e.g. NS**)

- id: dim_event
  description: Dimmer state changed
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are explicitly described in the source.
# The TPANMEM/TPHDMEM interactive preset memory is a 3-step sequence but the source
# documents it inline; not a separate macro.
```

## Safety
```yaml
[]
```

## Notes
- **Model coverage:** Source explicitly identifies this protocol as applying to X1100, S700, X4100, and "2014 AVR" model lines (per the SI table footnotes). Entity bootstrap token "DN 500R 700R" does not match any model in the source — the spec was generated from the Denon AVR control protocol document because no other refined source was available for the DN 500R/700R entity. Operators should treat this spec as a Denon AVR family reference, not as verified DN 500R/700R documentation.
- **Inter-command timing (rule J):** Wait 1 second after PWON before sending the next command.
- **EVENT/COMMAND interaction (rules A–I):** (A) COMMAND is receivable during EVENT transmission. (B) Channel volume changes simultaneously with input source change and returns as EVENT. (C) Surround mode and channel volume change with input source change and return as EVENT. (D) If surround mode or channel volume is the same before/after input source change, no EVENT is returned. (E) When surround mode is set to the current mode again, surround mode EVENT returns but channel volume does not. (F) When surround mode is changed, the present mode is returned before the new mode is returned. (G) RESPONSE is required for all commands with an EVENT (e.g. SV command has no EVENT, so no RESPONSE needed). (H) The minimum level of master volume is defined as "00" in PARAMETER. (I) When 0.5dB step is used for MV/CV, the PARAMETER is 3 ASCII characters.
- **Response vs EVENT:** RESPONSE is sent in reply to a request command. EVENT is unsolicited and sent when state changes.
- **Volume format:** MV/CV use 2 ASCII chars for 1dB step; 3 ASCII chars (0.5dB step) where the third digit is 0 or 5 (e.g. MV805 = +0.5dB, MV795 = -0.5dB).
- **Z2 status semantics:** Z2? returns "Z2" when zone2 is selected, "SR" when REC mode is selected.
- **NS9F/NS9G manual search:** valid for USB/iPod, Media Server, and Bluetooth only.
- **NS cursor mapping (NS90-NS93):** NS90=Up, NS91=Down, NS92=Left, NS93=Right.
- **Auro-3D channels (CVSHL, CVSHR, CVTS):** These channels are only available on Auro-3D Upgrade.
- **NSH preset range:** 00-35 on 2014 AVR (older models had 00-55).
- **Preset channel range (Tuner):** TPAN** and TPHD** accept 01-56.
- **Z2/Z3 source parameter set:** Most inputs (PHONO through FVP) apply to Z2 and Z3; MPLAY, HDRADIO, PANDORA, SIRIUSXM, SPOTIFY, LASTFM, FLICKR, IRADIO, SERVER, FAVORITES appear in all three (Z2/Z3/MAIN). AUX3-7 require "Additional Source is set to On" on the device.
- **HD Radio:** North America model only (denoted by "(North America model Only)" footnote in source).
- **Trigger outputs:** 2 trigger outputs (TR1, TR2) only. Source does not document TR3+.
- **Dimmer cycle (DIM SEL):** toggles Bright → Dim → Dark → Off.

<!-- UNRESOLVED: firmware version compatibility not stated in source (compatible_with.firmware left blank) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - cdn.inmusicbrands.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - "https://cdn.inmusicbrands.com/DenonPro/cdn/1109/documents/DN-700R%20-%20Serial%20Command%20Protocol%20Guide%20-%20v1.1.pdf"
retrieved_at: 2026-05-27T18:33:00.286Z
last_checked_at: 2026-06-02T21:41:26.859Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:26.859Z
matched_actions: 924
action_count: 924
confidence: medium
summary: "All 924 spec actions have literal matches in the source command table; transport (9600bps serial, TCP port 23) confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "user-supplied identifier \"DN 500R 700R\" does not match source content; the document is titled \"Control Protocol Ver.06\" and lists AVR-X1100, AVR-S700, AVR-X4100, and 2014 AVR models."
- "flow control not stated in source"
- "no multi-step macro sequences are explicitly described in the source."
- "firmware version compatibility not stated in source (compatible_with.firmware left blank)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
