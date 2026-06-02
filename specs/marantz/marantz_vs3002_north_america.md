---
spec_id: admin/marantz-vs3002-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz VS3002 (North America) Control Spec"
manufacturer: Marantz
model_family: "VS3002 (North America)"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "VS3002 (North America)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:54.096Z
last_checked_at: 2026-06-02T17:23:28.895Z
generated_at: 2026-06-02T17:23:28.895Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete command set coverage not verified against device"
  - "no safety warnings or interlock procedures stated in source"
  - "firmware version compatibility not stated in source"
  - "binary command byte encodings not provided (ASCII only)"
  - "REST API not covered in source (only RS-232C and TCP/Telnet documented)"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:28.895Z
  matched_actions: 767
  action_count: 767
  confidence: medium
  summary: "All 767 spec actions have literal matches in the source command table; transport (9600 baud serial, TCP port 23) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz VS3002 (North America) Control Spec

## Summary
AV surround receiver supporting both RS-232C serial and TCP/IP (Telnet) control. Commands are ASCII-based with CR (0x0D) termination. Supports multi-zone control (Zone2, Zone3, All Zone Stereo), HD Radio, surround mode selection, video processing, and Audyssey room correction. Command interval minimum 50ms; response within 200ms; events sent within 5 seconds of state changes.

<!-- UNRESOLVED: complete command set coverage not verified against device -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # TCP port 23 (Telnet) - stated in source
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
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# ── POWER ──────────────────────────────────────────────────────────────────
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

- id: power_query
  label: Query Power Status
  kind: query
  command: "PW?"
  params: []

# ── MASTER VOLUME ───────────────────────────────────────────────────────────
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
  label: Set Master Volume
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "00-98 by ASCII, 80=0dB, 00=--- (MIN); 0.5dB step uses 3 chars e.g. 805=+0.5dB"

- id: master_volume_query
  label: Query Master Volume
  kind: query
  command: "MV?"
  params: []

# ── CHANNEL VOLUME ──────────────────────────────────────────────────────────
- id: cv_fl_up
  label: Channel Volume Front Left Up
  kind: action
  command: "CVFL UP"
  params: []

- id: cv_fl_down
  label: Channel Volume Front Left Down
  kind: action
  command: "CVFL DOWN"
  params: []

- id: cv_fl_set
  label: Set Channel Volume Front Left
  kind: action
  command: "CVFL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fr_up
  label: Channel Volume Front Right Up
  kind: action
  command: "CVFR UP"
  params: []

- id: cv_fr_down
  label: Channel Volume Front Right Down
  kind: action
  command: "CVFR DOWN"
  params: []

- id: cv_fr_set
  label: Set Channel Volume Front Right
  kind: action
  command: "CVFR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Center
  kind: action
  command: "CVC {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Subwoofer
  kind: action
  command: "CVSW {level}"
  params:
    - name: level
      type: string
      description: "00,38-62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Subwoofer 2
  kind: action
  command: "CVSW2 {level}"
  params:
    - name: level
      type: string
      description: "00,38-62 by ASCII, 50=0dB"

- id: cv_sl_up
  label: Channel Volume Surround Left Up
  kind: action
  command: "CVSL UP"
  params: []

- id: cv_sl_down
  label: Channel Volume Surround Left Down
  kind: action
  command: "CVSL DOWN"
  params: []

- id: cv_sl_set
  label: Set Channel Volume Surround Left
  kind: action
  command: "CVSL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sr_up
  label: Channel Volume Surround Right Up
  kind: action
  command: "CVSR UP"
  params: []

- id: cv_sr_down
  label: Channel Volume Surround Right Down
  kind: action
  command: "CVSR DOWN"
  params: []

- id: cv_sr_set
  label: Set Channel Volume Surround Right
  kind: action
  command: "CVSR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sbl_up
  label: Channel Volume Surround Back Left Up
  kind: action
  command: "CVSBL UP"
  params: []

- id: cv_sbl_down
  label: Channel Volume Surround Back Left Down
  kind: action
  command: "CVSBL DOWN"
  params: []

- id: cv_sbl_set
  label: Set Channel Volume Surround Back Left
  kind: action
  command: "CVSBL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sbr_up
  label: Channel Volume Surround Back Right Up
  kind: action
  command: "CVSBR UP"
  params: []

- id: cv_sbr_down
  label: Channel Volume Surround Back Right Down
  kind: action
  command: "CVSBR DOWN"
  params: []

- id: cv_sbr_set
  label: Set Channel Volume Surround Back Right
  kind: action
  command: "CVSBR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sb_up
  label: Channel Volume Surround Back (1SP) Up
  kind: action
  command: "CVSB UP"
  params: []

- id: cv_sb_down
  label: Channel Volume Surround Back (1SP) Down
  kind: action
  command: "CVSB DOWN"
  params: []

- id: cv_sb_set
  label: Set Channel Volume Surround Back (1SP)
  kind: action
  command: "CVSB {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fhl_up
  label: Channel Volume Front Height Left Up
  kind: action
  command: "CVFHL UP"
  params: []

- id: cv_fhl_down
  label: Channel Volume Front Height Left Down
  kind: action
  command: "CVFHL DOWN"
  params: []

- id: cv_fhl_set
  label: Set Channel Volume Front Height Left
  kind: action
  command: "CVFHL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fhr_up
  label: Channel Volume Front Height Right Up
  kind: action
  command: "CVFHR UP"
  params: []

- id: cv_fhr_down
  label: Channel Volume Front Height Right Down
  kind: action
  command: "CVFHR DOWN"
  params: []

- id: cv_fhr_set
  label: Set Channel Volume Front Height Right
  kind: action
  command: "CVFHR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fwl_up
  label: Channel Volume Front Wide Left Up
  kind: action
  command: "CVFWL UP"
  params: []

- id: cv_fwl_down
  label: Channel Volume Front Wide Left Down
  kind: action
  command: "CVFWL DOWN"
  params: []

- id: cv_fwl_set
  label: Set Channel Volume Front Wide Left
  kind: action
  command: "CVFWL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fwr_up
  label: Channel Volume Front Wide Right Up
  kind: action
  command: "CVFWR UP"
  params: []

- id: cv_fwr_down
  label: Channel Volume Front Wide Right Down
  kind: action
  command: "CVFWR DOWN"
  params: []

- id: cv_fwr_set
  label: Set Channel Volume Front Wide Right
  kind: action
  command: "CVFWR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_tfl_up
  label: Channel Volume Top Front Left Up
  kind: action
  command: "CVTFL UP"
  params: []

- id: cv_tfl_down
  label: Channel Volume Top Front Left Down
  kind: action
  command: "CVTFL DOWN"
  params: []

- id: cv_tfl_set
  label: Set Channel Volume Top Front Left
  kind: action
  command: "CVTFL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_tfr_up
  label: Channel Volume Top Front Right Up
  kind: action
  command: "CVTFR UP"
  params: []

- id: cv_tfr_down
  label: Channel Volume Top Front Right Down
  kind: action
  command: "CVTFR DOWN"
  params: []

- id: cv_tfr_set
  label: Set Channel Volume Top Front Right
  kind: action
  command: "CVTFR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_tml_up
  label: Channel Volume Top Middle Left Up
  kind: action
  command: "CVTML UP"
  params: []

- id: cv_tml_down
  label: Channel Volume Top Middle Left Down
  kind: action
  command: "CVTML DOWN"
  params: []

- id: cv_tml_set
  label: Set Channel Volume Top Middle Left
  kind: action
  command: "CVTML {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_tmr_up
  label: Channel Volume Top Middle Right Up
  kind: action
  command: "CVTMR UP"
  params: []

- id: cv_tmr_down
  label: Channel Volume Top Middle Right Down
  kind: action
  command: "CVTMR DOWN"
  params: []

- id: cv_tmr_set
  label: Set Channel Volume Top Middle Right
  kind: action
  command: "CVTMR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_trl_up
  label: Channel Volume Top Rear Left Up
  kind: action
  command: "CVTRL UP"
  params: []

- id: cv_trl_down
  label: Channel Volume Top Rear Left Down
  kind: action
  command: "CVTRL DOWN"
  params: []

- id: cv_trl_set
  label: Set Channel Volume Top Rear Left
  kind: action
  command: "CVTRL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_trr_up
  label: Channel Volume Top Rear Right Up
  kind: action
  command: "CVTRR UP"
  params: []

- id: cv_trr_down
  label: Channel Volume Top Rear Right Down
  kind: action
  command: "CVTRR DOWN"
  params: []

- id: cv_trr_set
  label: Set Channel Volume Top Rear Right
  kind: action
  command: "CVTRR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_rhl_up
  label: Channel Volume Rear Height Left Up
  kind: action
  command: "CVRHL UP"
  params: []

- id: cv_rhl_down
  label: Channel Volume Rear Height Left Down
  kind: action
  command: "CVRHL DOWN"
  params: []

- id: cv_rhl_set
  label: Set Channel Volume Rear Height Left
  kind: action
  command: "CVRHL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_rhr_up
  label: Channel Volume Rear Height Right Up
  kind: action
  command: "CVRHR UP"
  params: []

- id: cv_rhr_down
  label: Channel Volume Rear Height Right Down
  kind: action
  command: "CVRHR DOWN"
  params: []

- id: cv_rhr_set
  label: Set Channel Volume Rear Height Right
  kind: action
  command: "CVRHR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fdl_up
  label: Channel Volume Front Dolby Left Up
  kind: action
  command: "CVFDL UP"
  params: []

- id: cv_fdl_down
  label: Channel Volume Front Dolby Left Down
  kind: action
  command: "CVFDL DOWN"
  params: []

- id: cv_fdl_set
  label: Set Channel Volume Front Dolby Left
  kind: action
  command: "CVFDL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_fdr_up
  label: Channel Volume Front Dolby Right Up
  kind: action
  command: "CVFDR UP"
  params: []

- id: cv_fdr_down
  label: Channel Volume Front Dolby Right Down
  kind: action
  command: "CVFDR DOWN"
  params: []

- id: cv_fdr_set
  label: Set Channel Volume Front Dolby Right
  kind: action
  command: "CVFDR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sdl_up
  label: Channel Volume Surround Dolby Left Up
  kind: action
  command: "CVSDL UP"
  params: []

- id: cv_sdl_down
  label: Channel Volume Surround Dolby Left Down
  kind: action
  command: "CVSDL DOWN"
  params: []

- id: cv_sdl_set
  label: Set Channel Volume Surround Dolby Left
  kind: action
  command: "CVSDL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_sdr_up
  label: Channel Volume Surround Dolby Right Up
  kind: action
  command: "CVSDR UP"
  params: []

- id: cv_sdr_down
  label: Channel Volume Surround Dolby Right Down
  kind: action
  command: "CVSDR DOWN"
  params: []

- id: cv_sdr_set
  label: Set Channel Volume Surround Dolby Right
  kind: action
  command: "CVSDR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_bdl_up
  label: Channel Volume Back Dolby Left Up
  kind: action
  command: "CVBDL UP"
  params: []

- id: cv_bdl_down
  label: Channel Volume Back Dolby Left Down
  kind: action
  command: "CVBDL DOWN"
  params: []

- id: cv_bdl_set
  label: Set Channel Volume Back Dolby Left
  kind: action
  command: "CVBDL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_bdr_up
  label: Channel Volume Back Dolby Right Up
  kind: action
  command: "CVBDR UP"
  params: []

- id: cv_bdr_down
  label: Channel Volume Back Dolby Right Down
  kind: action
  command: "CVBDR DOWN"
  params: []

- id: cv_bdr_set
  label: Set Channel Volume Back Dolby Right
  kind: action
  command: "CVBDR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_shl_up
  label: Channel Volume Surround Height Left Up (Auro-3D)
  kind: action
  command: "CVSHL UP"
  params: []

- id: cv_shl_down
  label: Channel Volume Surround Height Left Down (Auro-3D)
  kind: action
  command: "CVSHL DOWN"
  params: []

- id: cv_shl_set
  label: Set Channel Volume Surround Height Left (Auro-3D)
  kind: action
  command: "CVSHL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_shr_up
  label: Channel Volume Surround Height Right Up (Auro-3D)
  kind: action
  command: "CVSHR UP"
  params: []

- id: cv_shr_down
  label: Channel Volume Surround Height Right Down (Auro-3D)
  kind: action
  command: "CVSHR DOWN"
  params: []

- id: cv_shr_set
  label: Set Channel Volume Surround Height Right (Auro-3D)
  kind: action
  command: "CVSHR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_ts_up
  label: Channel Volume Top Surround Up (Auro-3D)
  kind: action
  command: "CVTS UP"
  params: []

- id: cv_ts_down
  label: Channel Volume Top Surround Down (Auro-3D)
  kind: action
  command: "CVTS DOWN"
  params: []

- id: cv_ts_set
  label: Set Channel Volume Top Surround (Auro-3D)
  kind: action
  command: "CVTS {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: cv_zrl
  label: Reset All Channel Volumes to Factory Default
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Query Channel Volume Status
  kind: query
  command: "CV?"
  params: []

# ── MUTE ────────────────────────────────────────────────────────────────────
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
  label: Query Mute Status
  kind: query
  command: "MU?"
  params: []

# ── INPUT SELECT ─────────────────────────────────────────────────────────────
- id: si_phono
  label: Select Input PHONO
  kind: action
  command: "SIPHONO"
  params: []

- id: si_cd
  label: Select Input CD
  kind: action
  command: "SICD"
  params: []

- id: si_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER"
  params: []

- id: si_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD"
  params: []

- id: si_bd
  label: Select Input BD (Blu-ray)
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
  label: Select Input MPLAY (Media Player)
  kind: action
  command: "SIMPLAY"
  params: []

- id: si_game
  label: Select Input GAME
  kind: action
  command: "SIGAME"
  params: []

- id: si_hdradio
  label: Select Input HD RADIO (North America only)
  kind: action
  command: "SIHDRADIO"
  params: []

- id: si_net
  label: Select Input NET
  kind: action
  command: "SINET"
  params: []

- id: si_pandora
  label: Select Input PANDORA (North America only)
  kind: action
  command: "SIPANDORA"
  params: []

- id: si_siriusxm
  label: Select Input SIRIUSXM
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: si_spotify
  label: Select Input SPOTIFY (North America and Europe)
  kind: action
  command: "SISPOTIFY"
  params: []

- id: si_lastfm
  label: Select Input LASTFM
  kind: action
  command: "SILASTFM"
  params: []

- id: si_flickr
  label: Select Input FLICKR
  kind: action
  command: "SIFLICKR"
  params: []

- id: si_iradio
  label: Select Input IRADIO
  kind: action
  command: "SIIRADIO"
  params: []

- id: si_server
  label: Select Input SERVER
  kind: action
  command: "SISERVER"
  params: []

- id: si_favorites
  label: Select Input FAVORITES
  kind: action
  command: "SIFAVORITES"
  params: []

- id: si_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1"
  params: []

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
  label: Select Input BT (Bluetooth)
  kind: action
  command: "SIBT"
  params: []

- id: si_usb_ipod
  label: Select Input USB/IPOD
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: si_usb
  label: Select Input USB (start playback)
  kind: action
  command: "SIUSB"
  params: []

- id: si_ipd
  label: Select Input USB and iPod DIRECT Start Playback
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
  label: Query Input Source
  kind: query
  command: "SI?"
  params: []

# ── MAIN ZONE ────────────────────────────────────────────────────────────────
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
  label: Query Main Zone Status
  kind: query
  command: "ZM?"
  params: []

- id: zm_favorite1
  label: Main Zone Favorite 1 Select
  kind: action
  command: "ZMFAVORITE1"
  params: []

- id: zm_favorite2
  label: Main Zone Favorite 2 Select
  kind: action
  command: "ZMFAVORITE2"
  params: []

- id: zm_favorite3
  label: Main Zone Favorite 3 Select
  kind: action
  command: "ZMFAVORITE3"
  params: []

- id: zm_favorite4
  label: Main Zone Favorite 4 Select
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
  command: "ZMFAVORITE4 MEMORY"
  params: []

# ── REC SELECT ───────────────────────────────────────────────────────────────
- id: sr_source
  label: REC SELECT Mode Cancel
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_query
  label: Query REC SELECT Status
  kind: query
  command: "SR?"
  params: []

# ── DIGITAL INPUT SELECT ─────────────────────────────────────────────────────
- id: sd_auto
  label: Digital Input Auto Mode
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Digital Input Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Digital Input Force Digital (Optical/Coaxial)
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Digital Input Force Analog
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Digital Input External IN Mode
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1in
  label: Digital Input 7.1CH IN Mode
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Digital Input No Input
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Query Digital Input Status
  kind: query
  command: "SD?"
  params: []

# ── DIGITAL CONTENT CONTROL ──────────────────────────────────────────────────
- id: dc_auto
  label: Digital Input Auto Mode (PCM/DTS)
  kind: action
  command: "DCAUTO"
  params: []

- id: dc_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM"
  params: []

- id: dc_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS"
  params: []

- id: dc_query
  label: Query Digital Content Control Status
  kind: query
  command: "DC?"
  params: []

# ── VIDEO SELECT ─────────────────────────────────────────────────────────────
- id: sv_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD"
  params: []

- id: sv_bd
  label: Video Select BD
  kind: action
  command: "SVBD"
  params: []

- id: sv_tv
  label: Video Select TV
  kind: action
  command: "SVTV"
  params: []

- id: sv_sat_cbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL"
  params: []

- id: sv_mplay
  label: Video Select MPLAY
  kind: action
  command: "SVMPLAY"
  params: []

- id: sv_game
  label: Video Select GAME
  kind: action
  command: "SVGAME"
  params: []

- id: sv_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1"
  params: []

- id: sv_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2"
  params: []

- id: sv_aux3
  label: Video Select AUX3
  kind: action
  command: "SVAUX3"
  params: []

- id: sv_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4"
  params: []

- id: sv_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5"
  params: []

- id: sv_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6"
  params: []

- id: sv_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7"
  params: []

- id: sv_cd
  label: Video Select CD
  kind: action
  command: "SVCD"
  params: []

- id: sv_source
  label: Video Select SOURCE (cancel)
  kind: action
  command: "SVSOURCE"
  params: []

- id: sv_on
  label: Video Select ON
  kind: action
  command: "SVON"
  params: []

- id: sv_off
  label: Video Select OFF
  kind: action
  command: "SVOFF"
  params: []

- id: sv_query
  label: Query Video Select Status
  kind: query
  command: "SV?"
  params: []

# ── SLEEP TIMER ──────────────────────────────────────────────────────────────
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_set
  label: Set Sleep Timer
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001-120 by ASCII, 010=10min"

- id: slp_query
  label: Query Sleep Timer Status
  kind: query
  command: "SLP?"
  params: []

# ── AUTO STANDBY ─────────────────────────────────────────────────────────────
- id: stby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M"
  params: []

- id: stby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M"
  params: []

- id: stby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M"
  params: []

- id: stby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF"
  params: []

- id: stby_query
  label: Query Auto Standby Status
  kind: query
  command: "STBY?"
  params: []

# ── ECO MODE ─────────────────────────────────────────────────────────────────
- id: eco_on
  label: ECO Mode On
  kind: action
  command: "ECOON"
  params: []

- id: eco_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO"
  params: []

- id: eco_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF"
  params: []

- id: eco_query
  label: Query ECO Mode Status
  kind: query
  command: "ECO?"
  params: []

# ── SURROUND MODE ────────────────────────────────────────────────────────────
- id: ms_movie
  label: Surround Mode MOVIE
  kind: action
  command: "MSMOVIE"
  params: []

- id: ms_music
  label: Surround Mode MUSIC
  kind: action
  command: "MSMUSIC"
  params: []

- id: ms_game
  label: Surround Mode GAME
  kind: action
  command: "MSGAME"
  params: []

- id: ms_direct
  label: Surround Mode DIRECT
  kind: action
  command: "MSDIRECT"
  params: []

- id: ms_pure_direct
  label: Surround Mode PURE DIRECT
  kind: action
  command: "MSPURE DIRECT"
  params: []

- id: ms_stereo
  label: Surround Mode STEREO
  kind: action
  command: "MSSTEREO"
  params: []

- id: ms_auto
  label: Surround Mode AUTO
  kind: action
  command: "MSAUTO"
  params: []

- id: ms_dolby_digital
  label: Surround Mode DOLBY DIGITAL
  kind: action
  command: "MSDOLBY DIGITAL"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS SURROUND
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: ms_auro3d
  label: Surround Mode AURO3D (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO3D"
  params: []

- id: ms_auro2dsurr
  label: Surround Mode AURO2DSURR
  kind: action
  command: "MSAURO2DSURR"
  params: []

- id: ms_mch_stereo
  label: Surround Mode MCH STEREO
  kind: action
  command: "MSMCH STEREO"
  params: []

- id: ms_wide_screen
  label: Surround Mode WIDE SCREEN
  kind: action
  command: "MSWIDE SCREEN"
  params: []

- id: ms_super_stadium
  label: Surround Mode SUPER STADIUM
  kind: action
  command: "MSSUPER STADIUM"
  params: []

- id: ms_rock_arena
  label: Surround Mode ROCK ARENA
  kind: action
  command: "MSROCK ARENA"
  params: []

- id: ms_jazz_club
  label: Surround Mode JAZZ CLUB
  kind: action
  command: "MSJAZZ CLUB"
  params: []

- id: ms_classic_concert
  label: Surround Mode CLASSIC CONCERT
  kind: action
  command: "MSCLASSIC CONCERT"
  params: []

- id: ms_mono_movie
  label: Surround Mode MONO MOVIE
  kind: action
  command: "MSMONO MOVIE"
  params: []

- id: ms_matrix
  label: Surround Mode MATRIX
  kind: action
  command: "MSMATRIX"
  params: []

- id: ms_video_game
  label: Surround Mode VIDEO GAME
  kind: action
  command: "MSVIDEO GAME"
  params: []

- id: ms_virtual
  label: Surround Mode VIRTUAL
  kind: action
  command: "MSVIRTUAL"
  params: []

- id: ms_left
  label: Surround Mode LEFT
  kind: action
  command: "MSLEFT"
  params: []

- id: ms_right
  label: Surround Mode RIGHT
  kind: action
  command: "MSRIGHT"
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
  label: Query Quick Select Status
  kind: query
  command: "MSQUICK ?"
  params: []

- id: ms_query
  label: Query Surround Mode Status
  kind: query
  command: "MS?"
  params: []

# ── VIDEO SIGNAL PROCESSING (VS) ─────────────────────────────────────────────
- id: vs_asp_nrm
  label: Aspect Ratio 4:3 Mode
  kind: action
  command: "VSASPNRM"
  params: []

- id: vs_asp_ful
  label: Aspect Ratio 16:9 Mode
  kind: action
  command: "VSASPFUL"
  params: []

- id: vs_asp_query
  label: Query Aspect Ratio Status
  kind: query
  command: "VSASP ?"
  params: []

- id: vs_moni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO"
  params: []

- id: vs_moni1
  label: HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1"
  params: []

- id: vs_moni2
  label: HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2"
  params: []

- id: vs_moni_query
  label: Query HDMI Monitor Status
  kind: query
  command: "VSMONI ?"
  params: []

- id: vs_sc_48p
  label: Resolution 480p/576p
  kind: action
  command: "VSSC48P"
  params: []

- id: vs_sc_10i
  label: Resolution 1080i
  kind: action
  command: "VSSC10I"
  params: []

- id: vs_sc_72p
  label: Resolution 720p
  kind: action
  command: "VSSC72P"
  params: []

- id: vs_sc_10p
  label: Resolution 1080p
  kind: action
  command: "VSSC10P"
  params: []

- id: vs_sc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  command: "VSSC10P24"
  params: []

- id: vs_sc_4k
  label: Resolution 4K
  kind: action
  command: "VSSC4K"
  params: []

- id: vs_sc_4kf
  label: Resolution 4K (60/50)
  kind: action
  command: "VSSC4KF"
  params: []

- id: vs_sc_auto
  label: Resolution AUTO
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vs_sc_query
  label: Query Resolution Status
  kind: query
  command: "VSSC ?"
  params: []

- id: vs_sch_48p
  label: HDMI Resolution 480p/576p
  kind: action
  command: "VSSCH48P"
  params: []

- id: vs_sch_10i
  label: HDMI Resolution 1080i
  kind: action
  command: "VSSCH10I"
  params: []

- id: vs_sch_72p
  label: HDMI Resolution 720p
  kind: action
  command: "VSSCH72P"
  params: []

- id: vs_sch_10p
  label: HDMI Resolution 1080p
  kind: action
  command: "VSSCH10P"
  params: []

- id: vs_sch_10p24
  label: HDMI Resolution 1080p 24Hz
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vs_sch_4k
  label: HDMI Resolution 4K
  kind: action
  command: "VSSCH4K"
  params: []

- id: vs_sch_4kf
  label: HDMI Resolution 4K (60/50)
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_sch_auto
  label: HDMI Resolution AUTO
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_sch_query
  label: Query HDMI Resolution Status
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
  label: Query HDMI Audio Output Status
  kind: query
  command: "VSAUDIO ?"
  params: []

- id: vs_vpm_auto
  label: Video Processing Mode AUTO
  kind: action
  command: "VSVPMAUTO"
  params: []

- id: vs_vpm_game
  label: Video Processing Mode GAME
  kind: action
  command: "VSVPMGAME"
  params: []

- id: vs_vpm_movi
  label: Video Processing Mode MOVIE
  kind: action
  command: "VSVPMMOVI"
  params: []

- id: vs_vpm_query
  label: Query Video Processing Mode Status
  kind: query
  command: "VSVPM ?"
  params: []

- id: vs_vst_on
  label: Vertical Stretch ON
  kind: action
  command: "VSVST ON"
  params: []

- id: vs_vst_off
  label: Vertical Stretch OFF
  kind: action
  command: "VSVST OFF"
  params: []

- id: vs_vst_query
  label: Query Vertical Stretch Status
  kind: query
  command: "VSVST ?"
  params: []

# ── PARAMETER SETTINGS (PS) ──────────────────────────────────────────────────
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
  label: Query Tone Control Status
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
  label: Set Bass Level
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 50=0dB; AVR operates 44-56 (-6 to +6dB)"

- id: ps_bas_query
  label: Query Bass Status
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
  label: Set Treble Level
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 50=0dB; AVR operates 44-56 (-6 to +6dB)"

- id: ps_tre_query
  label: Query Treble Status
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
  label: Dialog Level Up
  kind: action
  command: "PSDIL UP"
  params: []

- id: ps_dil_down
  label: Dialog Level Down
  kind: action
  command: "PSDIL DOWN"
  params: []

- id: ps_dil_set
  label: Set Dialog Level
  kind: action
  command: "PSDIL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: ps_dil_query
  label: Query Dialog Level Status
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
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP"
  params: []

- id: ps_swl_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN"
  params: []

- id: ps_swl_set
  label: Set Subwoofer Level
  kind: action
  command: "PSSWL {level}"
  params:
    - name: level
      type: string
      description: "00,38-62 by ASCII, 50=0dB"

- id: ps_swl2_up
  label: Subwoofer 2 Level Up
  kind: action
  command: "PSSWL2 UP"
  params: []

- id: ps_swl2_down
  label: Subwoofer 2 Level Down
  kind: action
  command: "PSSWL2 DOWN"
  params: []

- id: ps_swl2_set
  label: Set Subwoofer 2 Level
  kind: action
  command: "PSSWL2 {level}"
  params:
    - name: level
      type: string
      description: "00,38-62 by ASCII, 50=0dB"

- id: ps_swl_query
  label: Query Subwoofer Level Status
  kind: query
  command: "PSSWL ?"
  params: []

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
  label: Query Cinema EQ Status
  kind: query
  command: "PSCINEMA EQ. ?"
  params: []

- id: ps_mode_music
  label: PS Mode MUSIC
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: PS Mode CINEMA
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: PS Mode GAME
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: PS Mode PRO LOGIC
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []

- id: ps_mode_query
  label: Query PS Mode Status
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
  label: Query Loudness Management Status
  kind: query
  command: "PSLOM ?"
  params: []

- id: ps_fh_on
  label: Front Height Output On
  kind: action
  command: "PSFH:ON"
  params: []

- id: ps_fh_off
  label: Front Height Output Off
  kind: action
  command: "PSFH:OFF"
  params: []

- id: ps_fh_query
  label: Query Front Height Output Status
  kind: query
  command: "PSFH: ?"
  params: []

- id: ps_sp_fw
  label: Speaker Output Front Wide
  kind: action
  command: "PSSP:FW"
  params: []

- id: ps_sp_fh
  label: Speaker Output Front Height
  kind: action
  command: "PSSP:FH"
  params: []

- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  command: "PSSP:SB"
  params: []

- id: ps_sp_hw
  label: Speaker Output Height and Wide
  kind: action
  command: "PSSP:HW"
  params: []

- id: ps_sp_bh
  label: Speaker Output Surround Back and Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output Surround Back and Front Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: ps_sp_hf
  label: Speaker Output Height and Floor
  kind: action
  command: "PSSP:HF"
  params: []

- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  command: "PSSP:FR"
  params: []

- id: ps_sp_query
  label: Query Speaker Output Status
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
  label: Query PL2z Height Gain Status
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
  label: Query MultEQ Mode Status
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
  label: Query Dynamic EQ Status
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
  label: Query Reference Level Offset Status
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
  label: Query Dynamic Volume Status
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
  label: Query Audyssey LFC Status
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
  label: Set Containment Amount
  kind: action
  command: "PSCNTAMT {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 01-07"

- id: ps_cntamt_query
  label: Query Containment Amount Status
  kind: query
  command: "PSCNTAMT ?"
  params: []

- id: ps_dsx_onhw
  label: Audyssey DSX On (Height and Wide)
  kind: action
  command: "PSDSX ONHW"
  params: []

- id: ps_dsx_onh
  label: Audyssey DSX On (Height)
  kind: action
  command: "PSDSX ONH"
  params: []

- id: ps_dsx_onw
  label: Audyssey DSX On (Width)
  kind: action
  command: "PSDSX ONW"
  params: []

- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  command: "PSDSX OFF"
  params: []

- id: ps_dsx_query
  label: Query Audyssey DSX Status
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
  label: Set Stage Width
  kind: action
  command: "PSSTW {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 50=0dB; AVR operates 40-60 (-10 to +10dB)"

- id: ps_stw_query
  label: Query Stage Width Status
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
  label: Set Stage Height
  kind: action
  command: "PSSTH {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 50=0dB; AVR operates 40-60 (-10 to +10dB)"

- id: ps_sth_query
  label: Query Stage Height Status
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
  label: Query Graphic EQ Status
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
  label: Query Dynamic Compression Status
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
  label: Set Bass Sync
  kind: action
  command: "PSBSC {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 0-16"

- id: ps_bsc_query
  label: Query Bass Sync Status
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
  label: Query Dialogue Enhancer Status
  kind: query
  command: "PSDEH ?"
  params: []

- id: ps_lfe_up
  label: LFE Level Up
  kind: action
  command: "PSLEE UP"
  params: []

- id: ps_lfe_down
  label: LFE Level Down
  kind: action
  command: "PSLFE DOWN"
  params: []

- id: ps_lfe_set
  label: Set LFE Level
  kind: action
  command: "PSLFE {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 00=0dB, 10=-10dB; AVR operates 0 to -10"

- id: ps_lfe_query
  label: Query LFE Level Status
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level (EXT.IN/7.1CH IN) Set to 0.0
  kind: action
  command: "PSLFL 00"
  params: []

- id: ps_lfl_05
  label: LFE Level (EXT.IN/7.1CH IN) Set to 0.5
  kind: action
  command: "PSLFL 05"
  params: []

- id: ps_lfl_10
  label: LFE Level (EXT.IN/7.1CH IN) Set to 1.0
  kind: action
  command: "PSLFL 10"
  params: []

- id: ps_lfl_15
  label: LFE Level (EXT.IN/7.1CH IN) Set to 1.5
  kind: action
  command: "PSLFL 15"
  params: []

- id: ps_lfl_query
  label: Query LFE Level (EXT.IN/7.1CH IN) Status
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
  label: Set Effect Level
  kind: action
  command: "PSEFF {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII, 00=0dB, 10=10dB; AVR operates 1-15"

- id: ps_eff_query
  label: Query Effect Status
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
  label: Set Delay
  kind: action
  command: "PSDEL {ms}"
  params:
    - name: ms
      type: string
      description: "000-999 by ASCII, 000=0ms, 300=300ms; 0-60ms in 3ms steps, over 60ms in 10ms steps"

- id: ps_del_query
  label: Query Delay Status
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
  label: Query Panorama Status
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
  label: Set Dimension
  kind: action
  command: "PSDIM {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 0-6"

- id: ps_dim_query
  label: Query Dimension Status
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
  label: Set Center Width
  kind: action
  command: "PSCEN {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 0-7"

- id: ps_cen_query
  label: Query Center Width Status
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
  label: Set Center Image
  kind: action
  command: "PSCEI {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 0.0-1.0"

- id: ps_cei_query
  label: Query Center Image Status
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
  label: Set Center Gain
  kind: action
  command: "PSCEG {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 0.0-1.0"

- id: ps_ceg_query
  label: Query Center Gain Status
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
  label: Query Center Spread Status
  kind: query
  command: "PSCES ?"
  params: []

- id: ps_swr_on
  label: Subwoofer On (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR ON"
  params: []

- id: ps_swr_off
  label: Subwoofer Off (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR OFF"
  params: []

- id: ps_swr_query
  label: Query Subwoofer Status
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
  label: Query Room Size Status
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
  label: Set Audio Delay
  kind: action
  command: "PSDELAY {ms}"
  params:
    - name: ms
      type: string
      description: "000-999 by ASCII, 000=0ms, 200=200ms; AVR operates 0-200"

- id: ps_delay_query
  label: Query Audio Delay Status
  kind: query
  command: "PSDELAY ?"
  params: []

- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  command: "PSRSTR OFF"
  params: []

- id: ps_rstr_low
  label: Audio Restorer Low (Mode 3)
  kind: action
  command: "PSRSTR LOW"
  params: []

- id: ps_rstr_med
  label: Audio Restorer Medium (Mode 2)
  kind: action
  command: "PSRSTR MED"
  params: []

- id: ps_rstr_hi
  label: Audio Restorer High (Mode 1)
  kind: action
  command: "PSRSTR HI"
  params: []

- id: ps_rstr_query
  label: Query Audio Restorer Status
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

- id: ps_front_ab
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B"
  params: []

- id: ps_front_query
  label: Query Front Speaker Status
  kind: query
  command: "PSFRONT?"
  params: []

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  command: "PSAUROPR SMA"
  params: []

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
  label: Auro-Matic 3D Preset Special
  kind: action
  command: "PSAUROPR SPE"
  params: []

- id: ps_auropr_query
  label: Query Auro-Matic 3D Preset Status
  kind: query
  command: "PSAUROPR ?"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  command: "PSAUROST UP"
  params: []

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  command: "PSAUROST DOWN"
  params: []

- id: ps_aurost_set
  label: Set Auro-Matic 3D Strength
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; AVR operates 1-16"

- id: ps_aurost_query
  label: Query Auro-Matic 3D Strength Status
  kind: query
  command: "PSAUROST ?"
  params: []

# ── PICTURE / VIDEO (PV) ─────────────────────────────────────────────────────
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
  label: Query Picture Mode Status
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
  label: Set Contrast
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: string
      description: "000-100 by ASCII, 050=0; AVR operates -50 to +50"

- id: pv_cn_query
  label: Query Contrast Status
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
  label: Set Brightness
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: string
      description: "000-100 by ASCII, 050=0; AVR operates -50 to +50"

- id: pv_br_query
  label: Query Brightness Status
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
  label: Set Saturation
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: string
      description: "000-100 by ASCII, 050=0; AVR operates -50 to +50"

- id: pv_st_query
  label: Query Saturation Status
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
  label: Set Hue
  kind: action
  command: "PVHUE {level}"
  params:
    - name: level
      type: string
      description: "44-56 by ASCII, 50=0; AVR operates -6 to +6"

- id: pv_hue_query
  label: Query Hue Status
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
  label: Query DNR Status
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
  label: Set Enhancer
  kind: action
  command: "PVENH{level}"
  params:
    - name: level
      type: string
      description: "00-12 by ASCII, 00=0"

- id: pv_enh_query
  label: Query Enhancer Status
  kind: query
  command: "PVENH ?"
  params: []

# ── ZONE 2 ───────────────────────────────────────────────────────────────────
- id: z2_source
  label: Zone2 Source Mode Cancel (same as Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone2 Input PHONO
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone2 Input CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone2 Input TUNER
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone2 Input DVD
  kind: action
  command: "Z2DVD"
  params: []

- id: z2_bd
  label: Zone2 Input BD
  kind: action
  command: "Z2BD"
  params: []

- id: z2_tv
  label: Zone2 Input TV
  kind: action
  command: "Z2TV"
  params: []

- id: z2_sat_cbl
  label: Zone2 Input SAT/CBL
  kind: action
  command: "Z2SAT/CBL"
  params: []

- id: z2_mplay
  label: Zone2 Input MPLAY (North America only)
  kind: action
  command: "Z2MPLAY"
  params: []

- id: z2_game
  label: Zone2 Input GAME
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone2 Input HDRADIO
  kind: action
  command: "Z2HDRADIO"
  params: []

- id: z2_net
  label: Zone2 Input NET
  kind: action
  command: "Z2NET"
  params: []

- id: z2_pandora
  label: Zone2 Input PANDORA (North America only)
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone2 Input SIRIUSXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone2 Input SPOTIFY (North America and Europe)
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone2 Input LASTFM
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone2 Input FLICKR
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone2 Input IRADIO
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone2 Input SERVER
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone2 Input FAVORITES
  kind: action
  command: "Z2FAVORITES"
  params: []

- id: z2_aux1
  label: Zone2 Input AUX1
  kind: action
  command: "Z2AUX1"
  params: []

- id: z2_aux2
  label: Zone2 Input AUX2
  kind: action
  command: "Z2AUX2"
  params: []

- id: z2_aux3
  label: Zone2 Input AUX3
  kind: action
  command: "Z2AUX3"
  params: []

- id: z2_aux4
  label: Zone2 Input AUX4
  kind: action
  command: "Z2AUX4"
  params: []

- id: z2_aux5
  label: Zone2 Input AUX5
  kind: action
  command: "Z2AUX5"
  params: []

- id: z2_aux6
  label: Zone2 Input AUX6
  kind: action
  command: "Z2AUX6"
  params: []

- id: z2_aux7
  label: Zone2 Input AUX7
  kind: action
  command: "Z2AUX7"
  params: []

- id: z2_bt
  label: Zone2 Input BT (Bluetooth)
  kind: action
  command: "Z2BT"
  params: []

- id: z2_usb_ipod
  label: Zone2 Input USB/IPOD
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone2 Input USB (start playback)
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone2 Input USB and iPod DIRECT
  kind: action
  command: "Z2IPD"
  params: []

- id: z2_irp
  label: Zone2 Input NET/USB iRadio Recent Play
  kind: action
  command: "Z2IRP"
  params: []

- id: z2_fvp
  label: Zone2 Input NET/USB Favorites Play
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
  label: Zone2 Quick Select Query
  kind: query
  command: "Z2QUICK ?"
  params: []

- id: z2_favorite1
  label: Zone2 Favorite 1 Select
  kind: action
  command: "Z2FAVORITE1"
  params: []

- id: z2_favorite2
  label: Zone2 Favorite 2 Select
  kind: action
  command: "Z2FAVORITE2"
  params: []

- id: z2_favorite3
  label: Zone2 Favorite 3 Select
  kind: action
  command: "Z2FAVORITE3"
  params: []

- id: z2_favorite4
  label: Zone2 Favorite 4 Select
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

- id: z2_vol_up
  label: Zone2 Volume Up
  kind: action
  command: "Z2UP"
  params: []

- id: z2_vol_down
  label: Zone2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []

- id: z2_vol_set
  label: Set Zone2 Volume
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00-98 by ASCII, 80=0dB, 00=--- (MIN)"

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
  label: Query Zone2 Status
  kind: query
  command: "Z2?"
  params: []

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
  label: Query Zone2 Mute Status
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
  label: Query Zone2 Channel Setting
  kind: query
  command: "Z2CS?"
  params: []

- id: z2cv_fl_up
  label: Zone2 Channel Volume Front Left Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2cv_fl_down
  label: Zone2 Channel Volume Front Left Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2cv_fl_set
  label: Set Zone2 Channel Volume Front Left
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: z2cv_fr_up
  label: Zone2 Channel Volume Front Right Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2cv_fr_down
  label: Zone2 Channel Volume Front Right Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2cv_fr_set
  label: Set Zone2 Channel Volume Front Right
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: z2cv_query
  label: Query Zone2 Channel Volume Status
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
  label: Query Zone2 HPF Status
  kind: query
  command: "Z2HPF?"
  params: []

- id: z2ps_bas_up
  label: Zone2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []

- id: z2ps_bas_down
  label: Zone2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []

- id: z2ps_bas_set
  label: Set Zone2 Bass Level
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; operates -10 to +10 (40-60) or -14 to +14 (36-64) for X4100"

- id: z2ps_bas_query
  label: Query Zone2 Bass Status
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
  label: Set Zone2 Treble Level
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; operates -10 to +10 (40-60) or -14 to +14 (36-64) for X4100"

- id: z2ps_tre_query
  label: Query Zone2 Treble Status
  kind: query
  command: "Z2PSTRE ?"
  params: []

- id: z2hda_thr
  label: Zone2 HDMI Audio Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2hda_pcm
  label: Zone2 HDMI Audio PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2hda_query
  label: Query Zone2 HDMI Audio Status
  kind: query
  command: "Z2HDA?"
  params: []

- id: z2slp_off
  label: Zone2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []

- id: z2slp_set
  label: Set Zone2 Sleep Timer
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001-120 by ASCII, 010=10min"

- id: z2slp_query
  label: Query Zone2 Sleep Timer Status
  kind: query
  command: "Z2SLP?"
  params: []

- id: z2stby_2h
  label: Zone2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2stby_4h
  label: Zone2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2stby_8h
  label: Zone2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H"
  params: []

- id: z2stby_off
  label: Zone2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []

- id: z2stby_query
  label: Query Zone2 Auto Standby Status
  kind: query
  command: "Z2STBY?"
  params: []

# ── ZONE 3 ───────────────────────────────────────────────────────────────────
- id: z3_source
  label: Zone3 Source Mode Cancel (same as Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone3 Input PHONO
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone3 Input CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone3 Input TUNER
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone3 Input DVD
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone3 Input BD
  kind: action
  command: "Z3BD"
  params: []

- id: z3_tv
  label: Zone3 Input TV
  kind: action
  command: "Z3TV"
  params: []

- id: z3_sat_cbl
  label: Zone3 Input SAT/CBL
  kind: action
  command: "Z3SAT/CBL"
  params: []

- id: z3_mplay
  label: Zone3 Input MPLAY
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone3 Input GAME
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone3 Input HDRADIO (North America only)
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone3 Input NET
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone3 Input PANDORA (North America only)
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone3 Input SIRIUSXM (North America only)
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone3 Input SPOTIFY (North America and Europe)
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone3 Input LASTFM
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone3 Input FLICKR
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone3 Input IRADIO
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone3 Input SERVER
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone3 Input FAVORITES
  kind: action
  command: "Z3FAVORITES"
  params: []

- id: z3_aux1
  label: Zone3 Input AUX1
  kind: action
  command: "Z3AUX1"
  params: []

- id: z3_aux2
  label: Zone3 Input AUX2
  kind: action
  command: "Z3AUX2"
  params: []

- id: z3_aux3
  label: Zone3 Input AUX3
  kind: action
  command: "Z3AUX3"
  params: []

- id: z3_aux4
  label: Zone3 Input AUX4
  kind: action
  command: "Z3AUX4"
  params: []

- id: z3_aux5
  label: Zone3 Input AUX5
  kind: action
  command: "Z3AUX5"
  params: []

- id: z3_aux6
  label: Zone3 Input AUX6
  kind: action
  command: "Z3AUX6"
  params: []

- id: z3_aux7
  label: Zone3 Input AUX7
  kind: action
  command: "Z3AUX7"
  params: []

- id: z3_bt
  label: Zone3 Input BT (Bluetooth)
  kind: action
  command: "Z3BT"
  params: []

- id: z3_usb_ipod
  label: Zone3 Input USB/IPOD
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone3 Input USB (start playback)
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone3 Input USB and iPod DIRECT
  kind: action
  command: "Z3IPD"
  params: []

- id: z3_irp
  label: Zone3 Input NET/USB iRadio Recent Play
  kind: action
  command: "Z3IRP"
  params: []

- id: z3_fvp
  label: Zone3 Input NET/USB Favorites Play
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
  label: Zone3 Quick Select Query
  kind: query
  command: "Z3QUICK ?"
  params: []

- id: z3_favorite1
  label: Zone3 Favorite 1 Select
  kind: action
  command: "Z3FAVORITE1"
  params: []

- id: z3_favorite2
  label: Zone3 Favorite 2 Select
  kind: action
  command: "Z3FAVORITE2"
  params: []

- id: z3_favorite3
  label: Zone3 Favorite 3 Select
  kind: action
  command: "Z3FAVORITE3"
  params: []

- id: z3_favorite4
  label: Zone3 Favorite 4 Select
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

- id: z3_vol_up
  label: Zone3 Volume Up
  kind: action
  command: "Z3UP"
  params: []

- id: z3_vol_down
  label: Zone3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []

- id: z3_vol_set
  label: Set Zone3 Volume
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00-98 by ASCII, 80=0dB, 00=--- (MIN)"

- id: z3_on
  label: Zone3 On
  kind: action
  command: "Z3ON"
  params: []

- id: z3_off
  label: Zone3 Off
  kind: action
  command: "Z3OFF"
  params: []

- id: z3_query
  label: Query Zone3 Status
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
  label: Query Zone3 Mute Status
  kind: query
  command: "Z3MU?"
  params: []

- id: z3cs_st
  label: Zone3 Channel Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3cs_mono
  label: Zone3 Channel Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3cs_query
  label: Query Zone3 Channel Setting
  kind: query
  command: "Z3CS?"
  params: []

- id: z3cv_fl_up
  label: Zone3 Channel Volume Front Left Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3cv_fl_down
  label: Zone3 Channel Volume Front Left Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3cv_fl_set
  label: Set Zone3 Channel Volume Front Left
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: z3cv_fr_up
  label: Zone3 Channel Volume Front Right Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3cv_fr_down
  label: Zone3 Channel Volume Front Right Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3cv_fr_set
  label: Set Zone3 Channel Volume Front Right
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: string
      description: "38-62 by ASCII, 50=0dB"

- id: z3cv_query
  label: Query Zone3 Channel Volume Status
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
  label: Query Zone3 HPF Status
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
  label: Set Zone3 Bass Level
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; operates -10 to +10 (40-60) or -14 to +14 (36-64) for X4100"

- id: z3ps_bas_query
  label: Query Zone3 Bass Status
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
  label: Set Zone3 Treble Level
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00-99 by ASCII; operates -10 to +10 (40-60) or -14 to +14 (36-64) for X4100"

- id: z3ps_tre_query
  label: Query Zone3 Treble Status
  kind: query
  command: "Z3PSTRE ?"
  params: []

- id: z3slp_off
  label: Zone3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []

- id: z3slp_set
  label: Set Zone3 Sleep Timer
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001-120 by ASCII, 010=10min"

- id: z3slp_query
  label: Query Zone3 Sleep Timer Status
  kind: query
  command: "Z3SLP?"
  params: []

- id: z3stby_2h
  label: Zone3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3stby_4h
  label: Zone3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3stby_8h
  label: Zone3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H"
  params: []

- id: z3stby_off
  label: Zone3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []

- id: z3stby_query
  label: Query Zone3 Auto Standby Status
  kind: query
  command: "Z3STBY?"
  params: []

# ── TUNER CONTROL ────────────────────────────────────────────────────────────
- id: tf_an_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP"
  params: []

- id: tf_an_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN"
  params: []

- id: tf_an_set
  label: Set Tuner Frequency
  kind: action
  command: "TFAN{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits: ****.**kHz AM (>050000), ****.** MHz FM (<050000)"

- id: tf_an_query
  label: Query Tuner Frequency Status
  kind: query
  command: "TFAN?"
  params: []

- id: tf_an_name_query
  label: Query RDS Station Name (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

- id: tp_an_up
  label: Tuner Preset Up
  kind: action
  command: "TPANUP"
  params: []

- id: tp_an_down
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tp_an_set
  label: Select Tuner Preset
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01-56; 01=CH01, 56=CH56"

- id: tp_an_query
  label: Query Tuner Preset Status
  kind: query
  command: "TPAN?"
  params: []

- id: tp_an_mem
  label: Tuner Preset Memory (enter memory mode)
  kind: action
  command: "TPANMEM"
  params: []

- id: tp_an_mem_set
  label: Store Tuner Preset
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56; 01=CH01, 56=CH56"

- id: tm_an_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM"
  params: []

- id: tm_an_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM"
  params: []

- id: tm_an_query
  label: Query Tuner Band/Mode Status
  kind: query
  command: "TMAN?"
  params: []

- id: tm_an_auto
  label: Tuner Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []

- id: tm_an_manual
  label: Tuner Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []

# ── HD RADIO CONTROL ─────────────────────────────────────────────────────────
- id: tf_hd_up
  label: HD Channel Up
  kind: action
  command: "TFHDUP"
  params: []

- id: tf_hd_down
  label: HD Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: tf_hd_set
  label: Set HD Frequency
  kind: action
  command: "TFHD{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits: ****.**kHz AM (>050000), ****.** MHz FM (<050000)"

- id: tf_hd_mc_set
  label: Set HD Multi Cast Channel
  kind: action
  command: "TFHDMC{ch}"
  params:
    - name: ch
      type: string
      description: "1 digit: Multi Cast 1-8, Analog 0"

- id: tf_hd_freq_mc_set
  label: Set HD Frequency and Multi Cast Channel
  kind: action
  command: "TFHD{freq}MC{ch}"
  params:
    - name: freq
      type: string
      description: "6 digits frequency"
    - name: ch
      type: string
      description: "1 digit Multi Cast channel"

- id: tf_hd_query
  label: Query HD Radio Frequency Status
  kind: query
  command: "TFHD?"
  params: []

- id: tp_hd_up
  label: HD Preset Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tp_hd_down
  label: HD Preset Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tp_hd_set
  label: Select HD Preset
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01-56; 01=CH01, 56=CH56"

- id: tp_hd_query
  label: Query HD Preset Status
  kind: query
  command: "TPHD?"
  params: []

- id: tp_hd_mem
  label: HD Preset Memory (enter memory mode)
  kind: action
  command: "TPHDMEM"
  params: []

- id: tp_hd_mem_set
  label: Store HD Preset
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56; 01=CH01, 56=CH56"

- id: tm_hd_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []

- id: tm_hd_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

- id: tm_hd_autohd
  label: HD Radio Tuning Mode AUTO-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: tm_hd_auto
  label: HD Radio Tuning Mode AUTO
  kind: action
  command: "TMHDAUTO"
  params: []

- id: tm_hd_manual
  label: HD Radio Tuning Mode MANUAL
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: tm_hd_anaauto
  label: HD Radio Tuning Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tm_hd_anamanu
  label: HD Radio Tuning Mode ANALOG MANUAL
  kind: action
  command: "TMHDANAMANU"
  params: []

- id: tm_hd_query
  label: Query HD Radio Band/Mode Status
  kind: query
  command: "TMHD?"
  params: []

- id: hd_query
  label: Query HD Radio Full Status
  kind: query
  command: "HD?"
  params: []

# ── ONLINE MUSIC / USB / BLUETOOTH (NS) ──────────────────────────────────────
- id: ns_cursor_up
  label: Cursor Up (Online/USB/BT)
  kind: action
  command: "NS90"
  params: []

- id: ns_cursor_down
  label: Cursor Down (Online/USB/BT)
  kind: action
  command: "NS91"
  params: []

- id: ns_cursor_left
  label: Cursor Left (Online/USB/BT)
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: Cursor Right (Online/USB/BT)
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: Enter/Play/Pause (Online/USB/BT)
  kind: action
  command: "NS94"
  params: []

- id: ns_play
  label: Play (Online/USB/BT)
  kind: action
  command: "NS9A"
  params: []

- id: ns_pause
  label: Pause (Online/USB/BT)
  kind: action
  command: "NS9B"
  params: []

- id: ns_stop
  label: Stop (Online/USB/BT)
  kind: action
  command: "NS9C"
  params: []

- id: ns_skip_plus
  label: Skip Plus (Online/USB/BT)
  kind: action
  command: "NS9D"
  params: []

- id: ns_skip_minus
  label: Skip Minus (Online/USB/BT)
  kind: action
  command: "NS9E"
  params: []

- id: ns_search_plus
  label: Manual Search Plus (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9F"
  params: []

- id: ns_search_minus
  label: Manual Search Minus (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9G"
  params: []

- id: ns_repeat_one
  label: Repeat One (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9H"
  params: []

- id: ns_repeat_all
  label: Repeat All (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9I"
  params: []

- id: ns_repeat_off
  label: Repeat Off (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9J"
  params: []

- id: ns_random_on
  label: Random On / Shuffle Songs (Media Server/USB/BT/iPod Direct)
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: Random Off / Shuffle Off (Media Server/USB/BT/iPod Direct)
  kind: action
  command: "NS9M"
  params: []

- id: ns_ipod_toggle
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: Page Next (except BT/AirPlay/Spotify remote)
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_prev
  label: Page Previous (except BT/AirPlay/Spotify remote)
  kind: action
  command: "NS9Y"
  params: []

- id: ns_search_stop
  label: Manual Search Stop (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9Z"
  params: []

- id: ns_repeat_toggle
  label: Repeat Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/BT)
  kind: action
  command: "NSRPT"
  params: []

- id: ns_random_toggle
  label: Random Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/BT)
  kind: action
  command: "NSRND"
  params: []

- id: ns_preset_call
  label: Preset Call (except BT/USB/iPod)
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_memory
  label: Preset Memory (except BT/USB/iPod)
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_name_query
  label: Query Net Audio Preset Names (UTF-8, except BT/USB/iPod)
  kind: query
  command: "NSH"
  params: []

- id: ns_fv_mem
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_display_ascii
  label: Request Onscreen Display Info (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: ns_display_utf8
  label: Request Onscreen Display Info (UTF-8)
  kind: query
  command: "NSE"
  params: []

# ── SYSTEM MENU NAVIGATION (MN) ──────────────────────────────────────────────
- id: mn_cup
  label: System Menu Cursor Up
  kind: action
  command: "MNCUP"
  params: []

- id: mn_cdn
  label: System Menu Cursor Down
  kind: action
  command: "MNCDN"
  params: []

- id: mn_clt
  label: System Menu Cursor Left
  kind: action
  command: "MNCLT"
  params: []

- id: mn_crt
  label: System Menu Cursor Right
  kind: action
  command: "MNCRT"
  params: []

- id: mn_ent
  label: System Menu Enter
  kind: action
  command: "MNENT"
  params: []

- id: mn_rtn
  label: System Menu Return
  kind: action
  command: "MNRTN"
  params: []

- id: mn_opt
  label: System Menu Option
  kind: action
  command: "MNOPT"
  params: []

- id: mn_inf
  label: System Menu Info
  kind: action
  command: "MNINF"
  params: []

- id: mn_chl
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL"
  params: []

- id: mn_men_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON"
  params: []

- id: mn_men_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF"
  params: []

- id: mn_men_query
  label: Query Setup Menu Status
  kind: query
  command: "MNMEN?"
  params: []

- id: mn_prv_on
  label: InstaPrevue On
  kind: action
  command: "MNPRV ON"
  params: []

- id: mn_prv_off
  label: InstaPrevue Off
  kind: action
  command: "MNPRV OFF"
  params: []

- id: mn_prv_query
  label: Query InstaPrevue Status
  kind: query
  command: "MNPRV?"
  params: []

- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON"
  params: []

- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  params: []

- id: mn_zst_query
  label: Query All Zone Stereo Status
  kind: query
  command: "MNZST?"
  params: []

# ── SYSTEM LOCK / SECURITY (SY) ──────────────────────────────────────────────
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  command: "SYREMOTE LOCK ON"
  params: []

- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  command: "SYREMOTE LOCK OFF"
  params: []

- id: sy_panel_lock_on
  label: Panel Lock On (except Master Volume)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel and Master Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# ── TRIGGER ──────────────────────────────────────────────────────────────────
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
  label: Query Trigger Status
  kind: query
  command: "TR?"
  params: []

# ── UPGRADE / MAINTENANCE ────────────────────────────────────────────────────
- id: ug_idn
  label: Display ID Number for Upgrade on FL Display
  kind: action
  command: "UGIDN"
  params: []

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
  label: Query Remote Maintenance Status
  kind: query
  command: "RM ?"
  params: []

# ── DISPLAY DIMMER ───────────────────────────────────────────────────────────
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
  label: Dimmer Toggle (Bright→Dim→Dark→Off)
  kind: action
  command: "DIM SEL"
  params: []

- id: dim_query
  label: Query Dimmer Status
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  response_example: "PWON or PWSTANDBY"

- id: volume_state
  type: string
  description: "MV{level} e.g. MV80 (master volume, 0dB)"

- id: mute_state
  type: enum
  values: [on, off]
  response_example: "MUON or MUOFF"

- id: input_state
  type: string
  description: "SI{source} e.g. SIDVD"

- id: zone_main_state
  type: enum
  values: [on, off]
  response_example: "ZMON or ZMOFF"

- id: surround_mode_state
  type: string
  description: "MS{mode} e.g. MSSTEREO; previous mode returned before new mode on change"

- id: channel_volume_state
  type: string
  description: "CV{channel} {level} e.g. CVFL 50; CVEND marks end of CV? response list"

- id: digital_input_state
  type: string
  description: "SD{mode} e.g. SDAUTO, SDARC, SDNO"

- id: video_select_state
  type: string
  description: "SV{source} and SV{on/off} e.g. SVDVD, SVON"

- id: sleep_timer_state
  type: string
  description: "SLP{minutes} e.g. SLP120; or SLPOFF"

- id: auto_standby_state
  type: string
  description: "STBY{duration} e.g. STBY15M or STBYOFF"

- id: eco_state
  type: string
  description: "ECO{mode} e.g. ECOON, ECOAUTO, ECOOFF"

- id: tuner_frequency_state
  type: string
  description: "TFAN{freq} e.g. TFAN105000 (1050.00kHz AM)"

- id: tuner_preset_state
  type: string
  description: "TPAN{preset} e.g. TPAN01; TPANOFF if no preset"

- id: tuner_band_mode_state
  type: string
  description: "TMAN{band/mode} e.g. TMANAM, TMANFM"

- id: hd_frequency_state
  type: string
  description: "TFHD{freq} e.g. TFHD105000"

- id: hd_preset_state
  type: string
  description: "TPHD{preset} e.g. TPHD01; TPHDOFF if no preset"

- id: hd_status
  type: object
  description: >
    Returns multiple lines: HDST NAME{name}, HDSIG LEV {0-6},
    HDMLT CURRCH{ch}, HDMLT CAST CH{ch}, HDPTY{type},
    HDARTIST{name}, HDTITLE{title}, HDALBUM{album},
    HDGENRE{genre}, HDMODE DIGITAL or HDMODE ANALOG

- id: zone2_state
  type: enum
  values: [on, off]
  response_example: "Z2ON or Z2OFF"

- id: zone2_volume_state
  type: string
  description: "Z2{level} e.g. Z280"

- id: zone2_mute_state
  type: enum
  values: [on, off]
  response_example: "Z2MUON or Z2MUOFF"

- id: zone3_state
  type: enum
  values: [on, off]
  response_example: "Z3ON or Z3OFF"

- id: zone3_volume_state
  type: string
  description: "Z3{level} e.g. Z380"

- id: zone3_mute_state
  type: enum
  values: [on, off]
  response_example: "Z3MUON or Z3MUOFF"

- id: trigger_state
  type: string
  description: "TR1 ON/OFF and TR2 ON/OFF returned together on TR? query"

- id: dimmer_state
  type: string
  description: "DIM {BRI|DIM|DAR|OFF}"

- id: menu_state
  type: enum
  values: [on, off]
  response_example: "MNMEN ON or MNMEN OFF"

- id: all_zone_stereo_state
  type: enum
  values: [on, off]
  response_example: "MNZST ON or MNZST OFF"

- id: remote_maintenance_state
  type: enum
  values: [on, off]
  response_example: "RM ON or RM OFF"

- id: onscreen_display_ascii
  type: string
  description: "NSA0-NSA8 lines, max 96 bytes each; cursor/playable flags in bit field byte"

- id: onscreen_display_utf8
  type: string
  description: "NSE0-NSE8 lines, max 96 bytes each (UTF-8 encoding)"
```

## Variables
```yaml
- id: master_volume
  type: string
  description: "00-98 ASCII, 80=0dB (+18 to ---); 3 chars for 0.5dB steps"

- id: channel_volume_per_speaker
  type: string
  description: "38-62 ASCII, 50=0dB; subwoofer allows 00 also"

- id: bass_level
  type: string
  description: "44-56 operational range (50=0dB, -6 to +6dB)"

- id: treble_level
  type: string
  description: "44-56 operational range (50=0dB, -6 to +6dB)"

- id: sleep_timer_minutes
  type: string
  description: "001-120 by ASCII"

- id: zone2_sleep_timer_minutes
  type: string
  description: "001-120 by ASCII"

- id: zone3_sleep_timer_minutes
  type: string
  description: "001-120 by ASCII"

- id: contrast
  type: string
  description: "000-100 ASCII, 050=0; range -50 to +50"

- id: brightness
  type: string
  description: "000-100 ASCII, 050=0; range -50 to +50"

- id: saturation
  type: string
  description: "000-100 ASCII, 050=0; range -50 to +50"

- id: hue
  type: string
  description: "44-56 ASCII, 50=0; range -6 to +6"

- id: enhancer_level
  type: string
  description: "00-12 ASCII"

- id: audio_delay_ms
  type: string
  description: "000-999 ASCII (ms); 0-60ms 3ms/step, over 60ms 10ms/step"

- id: audio_delay_psdelay_ms
  type: string
  description: "000-999 ASCII (ms)"
```

## Events
```yaml
# Device sends unsolicited EVENT messages identical in form to RESPONSE when state changes:
# - Power: PWON<CR> or PWSTANDBY<CR>
# - Input change: SI{source}<CR> plus CV and MS events (if changed)
# - Surround mode: current MS returned first, then new MS
# - Volume: MV{level}<CR>
# - Channel volume per speaker: CV{ch} {level}<CR> on input change or direct CV change
# - Zone2/Zone3 state changes return Z2/Z3 equivalent events
# All EVENTs sent within 5 seconds of state change
# CVEND<CR> terminates CV? response list (only speaker configs present reply)
```

## Macros
```yaml
- id: power_on_sequence
  description: "Send PWON<CR>, then wait 1 second before transmitting next command (per source note J)"

- id: tuner_preset_store_sequence
  description: "1) TPANMEM<CR> (enter memory mode); 2) TPANUP<CR> or TPANDOWN<CR> or TPAN{preset}<CR> (select channel); 3) TPANMEM<CR> (confirm)"

- id: hd_preset_store_sequence
  description: "1) TPHDMEM<CR> (enter memory mode); 2) TPHDUP<CR> or TPHDDOWN<CR> or TPHD{preset}<CR> (select channel); 3) TPHDMEM{preset}<CR> (confirm)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Command structure: `COMMAND + PARAMETER + CR (0x0D)`, ASCII 0x20–0x7F only. Maximum data length 135 bytes. Minimum 50ms between commands. RESPONSE within 200ms of request. EVENT within 5 seconds of state change. Half duplex on both serial and TCP.

Volume encoding: MASTER VOLUME +18.0dB = MV98, 0dB = MV80, -0.5dB = MV795 (3 chars), minimum = MV00. 0.5dB steps use 3-character parameters.

Power-on: wait 1 second after PWON before next command.

Input source change simultaneously triggers CV and MS EVENT responses (if values changed); if unchanged, events not returned. Surround mode EVENT returns old mode before new mode.

Zone2/Zone3 operate independently with full input, volume, mute, bass/treble, HPF, channel volume, sleep timer, and auto-standby command sets. All Zone Stereo (MNZST ON) enables synchronized playback across all zones.

REC SELECT (SR) mode and ZONE2 mode share the status response; SR? returns Z2{source} when ZONE2 is active, SR{source} when REC mode is active.

NS command set covers Online Music (NET), USB, iPod, and Bluetooth transport controls with identical command codes across all these sources; some commands are BT-specific or exclude BT as noted.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: binary command byte encodings not provided (ASCII only) -->
<!-- UNRESOLVED: REST API not covered in source (only RS-232C and TCP/Telnet documented) -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:54.096Z
last_checked_at: 2026-06-02T17:23:28.895Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:28.895Z
matched_actions: 767
action_count: 767
confidence: medium
summary: "All 767 spec actions have literal matches in the source command table; transport (9600 baud serial, TCP port 23) confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete command set coverage not verified against device"
- "no safety warnings or interlock procedures stated in source"
- "firmware version compatibility not stated in source"
- "binary command byte encodings not provided (ASCII only)"
- "REST API not covered in source (only RS-232C and TCP/Telnet documented)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
