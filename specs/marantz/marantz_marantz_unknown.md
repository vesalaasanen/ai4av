---
spec_id: admin/marantz-marantz_unknown
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz Marantz Unknown Control Spec"
manufacturer: Marantz
model_family: "Marantz Unknown"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "Marantz Unknown"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-06-02T08:46:06.621Z
generated_at: 2026-06-02T08:46:06.621Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SDARC
  - MS7.1IN
  - "MSPURE DIRECT EXT"
  - MSQUICK0
  - Z2QUICK0
  - Z3QUICK0
  - PSMODE:HEIGHT
  - "specific model name/number not stated in source; document is a generic Marantz AVR protocol reference"
  - "no safety warnings or interlock procedures stated in source"
  - "specific model number(s) covered by this protocol document"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T08:46:06.621Z
  matched_actions: 857
  action_count: 857
  confidence: medium
  summary: "All 857 spec actions match verbatim in the source; transport values (9600 baud, TCP port 23) confirmed; only 7 edge-case/event-only tokens in source not represented in spec. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz Marantz Unknown Control Spec

## Summary
Marantz AV receiver supporting both RS-232C and Ethernet (TCP/IP) control. ASCII-based command protocol; commands are COMMAND + PARAMETER + CR (0x0D). Covers power, volume, input selection, channel volume, surround mode, video settings, picture controls, multi-zone (Zone 2 / Zone 3), tuner, HD Radio, online music / USB / Bluetooth navigation, and system utilities.

<!-- UNRESOLVED: specific model name/number not stated in source; document is a generic Marantz AVR protocol reference -->

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
  port: 23  # TCP port 23 (telnet) — stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # PWON/PWSTANDBY commands present
- routable     # SI (input selection) commands present
- queryable    # ? suffix queries present (PW?, MV?, SI?, etc.)
- levelable    # MV, CV, PS tone, Z2/Z3 volume controls present
```

## Actions
```yaml
# ── Power (PW) ──────────────────────────────────────────────────────────────
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

# ── Master Volume (MV) ───────────────────────────────────────────────────────
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
  label: Set Master Volume (direct dB)
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "2-digit ASCII (00–98, 80=0dB, 00=MIN); 0.5dB steps use 3-digit (e.g. 805=+0.5dB)"

- id: master_volume_query
  label: Query Master Volume
  kind: query
  command: "MV?"
  params: []

# ── Channel Volume (CV) ──────────────────────────────────────────────────────
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
  label: Channel Volume Front Left Set
  kind: action
  command: "CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Right Set
  kind: action
  command: "CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  command: "CVC {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  command: "CVSW {level}"
  params:
    - name: level
      type: string
      description: "00 or 38–62 ASCII, 50=0dB"

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
  command: "CVSW2 {level}"
  params:
    - name: level
      type: string
      description: "00 or 38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Left Set
  kind: action
  command: "CVSL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Right Set
  kind: action
  command: "CVSR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Back Left Set
  kind: action
  command: "CVSBL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Back Right Set
  kind: action
  command: "CVSBR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Back (1SP) Set
  kind: action
  command: "CVSB {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Height Left Set
  kind: action
  command: "CVFHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Height Right Set
  kind: action
  command: "CVFHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Wide Left Set
  kind: action
  command: "CVFWL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Wide Right Set
  kind: action
  command: "CVFWR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Front Left Set
  kind: action
  command: "CVTFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Front Right Set
  kind: action
  command: "CVTFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Middle Left Set
  kind: action
  command: "CVTML {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Middle Right Set
  kind: action
  command: "CVTMR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Rear Left Set
  kind: action
  command: "CVTRL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Rear Right Set
  kind: action
  command: "CVTRR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Rear Height Left Set
  kind: action
  command: "CVRHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Rear Height Right Set
  kind: action
  command: "CVRHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Dolby Left Set
  kind: action
  command: "CVFDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Front Dolby Right Set
  kind: action
  command: "CVFDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Dolby Left Set
  kind: action
  command: "CVSDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Dolby Right Set
  kind: action
  command: "CVSDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Back Dolby Left Set
  kind: action
  command: "CVBDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Back Dolby Right Set
  kind: action
  command: "CVBDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Height Left Set (Auro-3D)
  kind: action
  command: "CVSHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Surround Height Right Set (Auro-3D)
  kind: action
  command: "CVSHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Channel Volume Top Surround Set (Auro-3D)
  kind: action
  command: "CVTS {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

- id: cv_zrl
  label: Channel Volume Reset All to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Query Channel Volume Status
  kind: query
  command: "CV?"
  params: []

# ── Mute (MU) ────────────────────────────────────────────────────────────────
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

# ── Input Select (SI) ────────────────────────────────────────────────────────
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
  label: Select Input MEDIA PLAYER
  kind: action
  command: "SIMPLAY"
  params: []

- id: si_game
  label: Select Input GAME
  kind: action
  command: "SIGAME"
  params: []

- id: si_hdradio
  label: Select Input HD Radio (North America only)
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
  label: Select Input SPOTIFY (North America and Europe only)
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
  label: Select Input Bluetooth
  kind: action
  command: "SIBT"
  params: []

- id: si_usb_ipod
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: si_usb
  label: Select Input USB and Start Playback
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
  label: Query Input Source Status
  kind: query
  command: "SI?"
  params: []

# ── Main Zone (ZM) ──────────────────────────────────────────────────────────
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

# ── Record Select (SR) ───────────────────────────────────────────────────────
- id: sr_source
  label: REC SELECT Cancel (source same as main zone)
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_select
  label: REC SELECT Set Source
  kind: action
  command: "SR{source}"
  params:
    - name: source
      type: string
      description: "Same parameter names as SI command (e.g. PHONO, CD, DVD, etc.)"

- id: sr_query
  label: Query REC SELECT Status
  kind: query
  command: "SR?"
  params: []

# ── Input Signal Select (SD) ─────────────────────────────────────────────────
- id: sd_auto
  label: Input Signal Auto (HDMI>>DIGITAL>>ANALOG)
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Input Signal Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Input Signal Force DIGITAL (Optical/Coaxial)
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Input Signal Force ANALOG
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Input Signal Set EXTERNAL IN
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1in
  label: Input Signal Set 7.1CH IN
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Input Signal No Input
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Query Input Signal Status
  kind: query
  command: "SD?"
  params: []

# ── Digital Input (DC) ───────────────────────────────────────────────────────
- id: dc_auto
  label: Digital Input AUTO
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
  label: Query Digital Input Status
  kind: query
  command: "DC?"
  params: []

# ── Video Select (SV) ────────────────────────────────────────────────────────
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
  label: Video Select Cancel (SOURCE)
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

# ── Sleep Timer (SLP) ────────────────────────────────────────────────────────
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001–120 by ASCII (3 digits), 010=10min"

- id: slp_query
  label: Query Sleep Timer Status
  kind: query
  command: "SLP?"
  params: []

# ── Auto Standby (STBY) ──────────────────────────────────────────────────────
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

# ── ECO Mode (ECO) ───────────────────────────────────────────────────────────
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

# ── Surround Mode (MS) ───────────────────────────────────────────────────────
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

- id: ms_dolby_pro_logic
  label: Surround Mode DOLBY PRO LOGIC
  kind: action
  command: "MSDOLBY PRO LOGIC"
  params: []

- id: ms_dolby_pl2_c
  label: Surround Mode DOLBY PL2 Cinema
  kind: action
  command: "MSDOLBY PL2 C"
  params: []

- id: ms_dolby_pl2_m
  label: Surround Mode DOLBY PL2 Music
  kind: action
  command: "MSDOLBY PL2 M"
  params: []

- id: ms_dolby_pl2_g
  label: Surround Mode DOLBY PL2 Game
  kind: action
  command: "MSDOLBY PL2 G"
  params: []

- id: ms_dolby_pl2x_c
  label: Surround Mode DOLBY PL2x Cinema
  kind: action
  command: "MSDOLBY PL2X C"
  params: []

- id: ms_dolby_pl2x_m
  label: Surround Mode DOLBY PL2x Music
  kind: action
  command: "MSDOLBY PL2X M"
  params: []

- id: ms_dolby_pl2x_g
  label: Surround Mode DOLBY PL2x Game
  kind: action
  command: "MSDOLBY PL2X G"
  params: []

- id: ms_dolby_pl2z_h
  label: Surround Mode DOLBY PL2z Height
  kind: action
  command: "MSDOLBY PL2Z H"
  params: []

- id: ms_dolby_surround
  label: Surround Mode DOLBY SURROUND
  kind: action
  command: "MSDOLBY SURROUND"
  params: []

- id: ms_dolby_atmos
  label: Surround Mode DOLBY ATMOS
  kind: action
  command: "MSDOLBY ATMOS"
  params: []

- id: ms_dolby_d_ex
  label: Surround Mode DOLBY D EX
  kind: action
  command: "MSDOLBY D EX"
  params: []

- id: ms_dolby_d_pl2x_c
  label: Surround Mode DOLBY D+PL2X Cinema
  kind: action
  command: "MSDOLBY D+PL2X C"
  params: []

- id: ms_dolby_d_pl2x_m
  label: Surround Mode DOLBY D+PL2X Music
  kind: action
  command: "MSDOLBY D+PL2X M"
  params: []

- id: ms_dolby_d_pl2z_h
  label: Surround Mode DOLBY D+PL2Z Height
  kind: action
  command: "MSDOLBY D+PL2Z H"
  params: []

- id: ms_dolby_d_ds
  label: Surround Mode DOLBY D+DS
  kind: action
  command: "MSDOLBY D+DS"
  params: []

- id: ms_dolby_d_neox_c
  label: Surround Mode DOLBY D+NEO:X Cinema
  kind: action
  command: "MSDOLBY D+NEO:X C"
  params: []

- id: ms_dolby_d_neox_m
  label: Surround Mode DOLBY D+NEO:X Music
  kind: action
  command: "MSDOLBY D+NEO:X M"
  params: []

- id: ms_dolby_d_neox_g
  label: Surround Mode DOLBY D+NEO:X Game
  kind: action
  command: "MSDOLBY D+NEO:X G"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS SURROUND
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: ms_dts_es_dscrt61
  label: Surround Mode DTS ES DSCRT 6.1
  kind: action
  command: "MSDTS ES DSCRT6.1"
  params: []

- id: ms_dts_es_mtrx61
  label: Surround Mode DTS ES MTRX 6.1
  kind: action
  command: "MSDTS ES MTRX6.1"
  params: []

- id: ms_dts_pl2x_c
  label: Surround Mode DTS+PL2X Cinema
  kind: action
  command: "MSDTS+PL2X C"
  params: []

- id: ms_dts_pl2x_m
  label: Surround Mode DTS+PL2X Music
  kind: action
  command: "MSDTS+PL2X M"
  params: []

- id: ms_dts_pl2z_h
  label: Surround Mode DTS+PL2Z Height
  kind: action
  command: "MSDTS+PL2Z H"
  params: []

- id: ms_dts_ds
  label: Surround Mode DTS+DS
  kind: action
  command: "MSDTS+DS"
  params: []

- id: ms_dts_9624
  label: Surround Mode DTS 96/24
  kind: action
  command: "MSDTS96/24"
  params: []

- id: ms_dts_96_es_mtrx
  label: Surround Mode DTS 96 ES MTRX
  kind: action
  command: "MSDTS96 ES MTRX"
  params: []

- id: ms_dts_neo6
  label: Surround Mode DTS+NEO:6
  kind: action
  command: "MSDTS+NEO:6"
  params: []

- id: ms_dts_neox_c
  label: Surround Mode DTS+NEO:X Cinema
  kind: action
  command: "MSDTS+NEO:X C"
  params: []

- id: ms_dts_neox_m
  label: Surround Mode DTS+NEO:X Music
  kind: action
  command: "MSDTS+NEO:X M"
  params: []

- id: ms_dts_neox_g
  label: Surround Mode DTS+NEO:X Game
  kind: action
  command: "MSDTS+NEO:X G"
  params: []

- id: ms_multi_ch_in
  label: Surround Mode MULTI CH IN
  kind: action
  command: "MSMULTI CH IN"
  params: []

- id: ms_mch_in_dolby_ex
  label: Surround Mode M CH IN+DOLBY EX
  kind: action
  command: "MSM CH IN+DOLBY EX"
  params: []

- id: ms_mch_in_pl2x_c
  label: Surround Mode M CH IN+PL2X Cinema
  kind: action
  command: "MSM CH IN+PL2X C"
  params: []

- id: ms_mch_in_pl2x_m
  label: Surround Mode M CH IN+PL2X Music
  kind: action
  command: "MSM CH IN+PL2X M"
  params: []

- id: ms_mch_in_pl2z_h
  label: Surround Mode M CH IN+PL2Z Height
  kind: action
  command: "MSM CH IN+PL2Z H"
  params: []

- id: ms_mch_in_ds
  label: Surround Mode M CH IN+DS
  kind: action
  command: "MSM CH IN+DS"
  params: []

- id: ms_multi_ch_in_71
  label: Surround Mode MULTI CH IN 7.1
  kind: action
  command: "MSMULTI CH IN 7.1"
  params: []

- id: ms_mch_in_neox_c
  label: Surround Mode M CH IN+NEO:X Cinema
  kind: action
  command: "MSM CH IN+NEO:X C"
  params: []

- id: ms_mch_in_neox_m
  label: Surround Mode M CH IN+NEO:X Music
  kind: action
  command: "MSM CH IN+NEO:X M"
  params: []

- id: ms_mch_in_neox_g
  label: Surround Mode M CH IN+NEO:X Game
  kind: action
  command: "MSM CH IN+NEO:X G"
  params: []

- id: ms_dolby_dplus
  label: Surround Mode DOLBY D+
  kind: action
  command: "MSDOLBY D+"
  params: []

- id: ms_dolby_dplus_ex
  label: Surround Mode DOLBY D+ +EX
  kind: action
  command: "MSDOLBY D+ +EX"
  params: []

- id: ms_dolby_dplus_pl2x_c
  label: Surround Mode DOLBY D+ +PL2X Cinema
  kind: action
  command: "MSDOLBY D+ +PL2X C"
  params: []

- id: ms_dolby_dplus_pl2x_m
  label: Surround Mode DOLBY D+ +PL2X Music
  kind: action
  command: "MSDOLBY D+ +PL2X M"
  params: []

- id: ms_dolby_dplus_pl2z_h
  label: Surround Mode DOLBY D+ +PL2Z Height
  kind: action
  command: "MSDOLBY D+ +PL2Z H"
  params: []

- id: ms_dolby_dplus_ds
  label: Surround Mode DOLBY D+ +DS
  kind: action
  command: "MSDOLBY D+ +DS"
  params: []

- id: ms_dolby_dplus_neox_c
  label: Surround Mode DOLBY D+ +NEO:X Cinema
  kind: action
  command: "MSDOLBY D+ +NEO:X C"
  params: []

- id: ms_dolby_dplus_neox_m
  label: Surround Mode DOLBY D+ +NEO:X Music
  kind: action
  command: "MSDOLBY D+ +NEO:X M"
  params: []

- id: ms_dolby_dplus_neox_g
  label: Surround Mode DOLBY D+ +NEO:X Game
  kind: action
  command: "MSDOLBY D+ +NEO:X G"
  params: []

- id: ms_dolby_hd
  label: Surround Mode DOLBY HD
  kind: action
  command: "MSDOLBY HD"
  params: []

- id: ms_dolby_hd_ex
  label: Surround Mode DOLBY HD+EX
  kind: action
  command: "MSDOLBY HD+EX"
  params: []

- id: ms_dolby_hd_pl2x_c
  label: Surround Mode DOLBY HD+PL2X Cinema
  kind: action
  command: "MSDOLBY HD+PL2X C"
  params: []

- id: ms_dolby_hd_pl2x_m
  label: Surround Mode DOLBY HD+PL2X Music
  kind: action
  command: "MSDOLBY HD+PL2X M"
  params: []

- id: ms_dolby_hd_pl2z_h
  label: Surround Mode DOLBY HD+PL2Z Height
  kind: action
  command: "MSDOLBY HD+PL2Z H"
  params: []

- id: ms_dolby_hd_ds
  label: Surround Mode DOLBY HD+DS
  kind: action
  command: "MSDOLBY HD+DS"
  params: []

- id: ms_dolby_hd_neox_c
  label: Surround Mode DOLBY HD+NEO:X Cinema
  kind: action
  command: "MSDOLBY HD+NEO:X C"
  params: []

- id: ms_dolby_hd_neox_m
  label: Surround Mode DOLBY HD+NEO:X Music
  kind: action
  command: "MSDOLBY HD+NEO:X M"
  params: []

- id: ms_dolby_hd_neox_g
  label: Surround Mode DOLBY HD+NEO:X Game
  kind: action
  command: "MSDOLBY HD+NEO:X G"
  params: []

- id: ms_dts_hd
  label: Surround Mode DTS HD
  kind: action
  command: "MSDTS HD"
  params: []

- id: ms_dts_hd_mstr
  label: Surround Mode DTS HD MSTR
  kind: action
  command: "MSDTS HD MSTR"
  params: []

- id: ms_dts_hd_pl2x_c
  label: Surround Mode DTS HD+PL2X Cinema
  kind: action
  command: "MSDTS HD+PL2X C"
  params: []

- id: ms_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2X Music
  kind: action
  command: "MSDTS HD+PL2X M"
  params: []

- id: ms_dts_hd_pl2z_h
  label: Surround Mode DTS HD+PL2Z Height
  kind: action
  command: "MSDTS HD+PL2Z H"
  params: []

- id: ms_dts_hd_ds
  label: Surround Mode DTS HD+DS
  kind: action
  command: "MSDTS HD+DS"
  params: []

- id: ms_dts_hd_neo6
  label: Surround Mode DTS HD+NEO:6
  kind: action
  command: "MSDTS HD+NEO:6"
  params: []

- id: ms_dts_hd_neox_c
  label: Surround Mode DTS HD+NEO:X Cinema
  kind: action
  command: "MSDTS HD+NEO:X C"
  params: []

- id: ms_dts_hd_neox_m
  label: Surround Mode DTS HD+NEO:X Music
  kind: action
  command: "MSDTS HD+NEO:X M"
  params: []

- id: ms_dts_hd_neox_g
  label: Surround Mode DTS HD+NEO:X Game
  kind: action
  command: "MSDTS HD+NEO:X G"
  params: []

- id: ms_dts_express
  label: Surround Mode DTS EXPRESS
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
  label: Surround Mode AAC+DOLBY EX
  kind: action
  command: "MSAAC+DOLBY EX"
  params: []

- id: ms_aac_pl2x_c
  label: Surround Mode AAC+PL2X Cinema
  kind: action
  command: "MSAAC+PL2X C"
  params: []

- id: ms_aac_pl2x_m
  label: Surround Mode AAC+PL2X Music
  kind: action
  command: "MSAAC+PL2X M"
  params: []

- id: ms_aac_pl2z_h
  label: Surround Mode AAC+PL2Z Height
  kind: action
  command: "MSAAC+PL2Z H"
  params: []

- id: ms_aac_ds
  label: Surround Mode AAC+DS
  kind: action
  command: "MSAAC+DS"
  params: []

- id: ms_aac_neox_c
  label: Surround Mode AAC+NEO:X Cinema
  kind: action
  command: "MSAAC+NEO:X C"
  params: []

- id: ms_aac_neox_m
  label: Surround Mode AAC+NEO:X Music
  kind: action
  command: "MSAAC+NEO:X M"
  params: []

- id: ms_aac_neox_g
  label: Surround Mode AAC+NEO:X Game
  kind: action
  command: "MSAAC+NEO:X G"
  params: []

- id: ms_pl_dsx
  label: Surround Mode PL DSX
  kind: action
  command: "MSPL DSX"
  params: []

- id: ms_pl2_c_dsx
  label: Surround Mode PL2 Cinema DSX
  kind: action
  command: "MSPL2 C DSX"
  params: []

- id: ms_pl2_m_dsx
  label: Surround Mode PL2 Music DSX
  kind: action
  command: "MSPL2 M DSX"
  params: []

- id: ms_pl2_g_dsx
  label: Surround Mode PL2 Game DSX
  kind: action
  command: "MSPL2 G DSX"
  params: []

- id: ms_audyssey_dsx
  label: Surround Mode AUDYSSEY DSX
  kind: action
  command: "MSAUDYSSEY DSX"
  params: []

- id: ms_dts_neo6_c
  label: Surround Mode DTS NEO:6 Cinema
  kind: action
  command: "MSDTS NEO:6 C"
  params: []

- id: ms_dts_neo6_m
  label: Surround Mode DTS NEO:6 Music
  kind: action
  command: "MSDTS NEO:6 M"
  params: []

- id: ms_dts_neox_c_standalone
  label: Surround Mode DTS NEO:X Cinema
  kind: action
  command: "MSDTS NEO:X C"
  params: []

- id: ms_dts_neox_m_standalone
  label: Surround Mode DTS NEO:X Music
  kind: action
  command: "MSDTS NEO:X M"
  params: []

- id: ms_dts_neox_g_standalone
  label: Surround Mode DTS NEO:X Game
  kind: action
  command: "MSDTS NEO:X G"
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

- id: ms_query
  label: Query Surround Mode Status
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

# ── Video Settings (VS) ──────────────────────────────────────────────────────
- id: vs_asp_nrm
  label: Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM"
  params: []

- id: vs_asp_ful
  label: Aspect Ratio 16:9
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
  label: Resolution HDMI 480p/576p
  kind: action
  command: "VSSCH48P"
  params: []

- id: vs_sch_10i
  label: Resolution HDMI 1080i
  kind: action
  command: "VSSCH10I"
  params: []

- id: vs_sch_72p
  label: Resolution HDMI 720p
  kind: action
  command: "VSSCH72P"
  params: []

- id: vs_sch_10p
  label: Resolution HDMI 1080p
  kind: action
  command: "VSSCH10P"
  params: []

- id: vs_sch_10p24
  label: Resolution HDMI 1080p 24Hz
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vs_sch_4k
  label: Resolution HDMI 4K
  kind: action
  command: "VSSCH4K"
  params: []

- id: vs_sch_4kf
  label: Resolution HDMI 4K (60/50)
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_sch_auto
  label: Resolution HDMI AUTO
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_sch_query
  label: Query Resolution HDMI Status
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

- id: vs_vpm_movie
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
  label: Query Vertical Stretch Status
  kind: query
  command: "VSVST ?"
  params: []

# ── Parameter Settings (PS) ──────────────────────────────────────────────────
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
  label: Bass Set
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII, 50=0dB; AVR range -6 to +6 (44–56)"

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
  label: Treble Set
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII, 50=0dB; AVR range -6 to +6 (44–56)"

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
  label: Dialog Level Set
  kind: action
  command: "PSDIL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

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
  label: Subwoofer Level Set
  kind: action
  command: "PSSWL {level}"
  params:
    - name: level
      type: string
      description: "00 or 38–62 ASCII, 50=0dB"

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
  label: Subwoofer 2 Level Set
  kind: action
  command: "PSSWL2 {level}"
  params:
    - name: level
      type: string
      description: "00 or 38–62 ASCII, 50=0dB"

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
  label: PL Mode MUSIC
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: PL Mode CINEMA
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: PL Mode GAME
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: PL Mode PRO LOGIC
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []

- id: ps_mode_query
  label: Query PL Mode Status
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
  label: Front Height (PLIIx) Output On
  kind: action
  command: "PSFH:ON"
  params: []

- id: ps_fh_off
  label: Front Height (PLIIx) Output Off
  kind: action
  command: "PSFH:OFF"
  params: []

- id: ps_fh_query
  label: Query Front Height Status
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
  label: Speaker Output Height+Wide
  kind: action
  command: "PSSP:HW"
  params: []

- id: ps_sp_bh
  label: Speaker Output Surround Back + Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output Surround Back + Front Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: ps_sp_hf
  label: Speaker Output Height + Floor
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
  label: PL2z Height Gain LOW
  kind: action
  command: "PSPHG LOW"
  params: []

- id: ps_phg_mid
  label: PL2z Height Gain MID
  kind: action
  command: "PSPHG MID"
  params: []

- id: ps_phg_hi
  label: PL2z Height Gain HI
  kind: action
  command: "PSPHG HI"
  params: []

- id: ps_phg_query
  label: Query PL2z Height Gain Status
  kind: query
  command: "PSPHG ?"
  params: []

- id: ps_multeq_audyssey
  label: MultEQ Mode AUDYSSEY
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ Mode BYP.LR (L/R Bypass)
  kind: action
  command: "PSMULTEQ:BYP.LR"
  params: []

- id: ps_multeq_flat
  label: MultEQ Mode FLAT
  kind: action
  command: "PSMULTEQ:FLAT"
  params: []

- id: ps_multeq_manual
  label: MultEQ Mode MANUAL
  kind: action
  command: "PSMULTEQ:MANUAL"
  params: []

- id: ps_multeq_off
  label: MultEQ Mode OFF
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
  label: Containment Amount Set
  kind: action
  command: "PSCNTAMT {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 01–07"

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
  label: Stage Width Set
  kind: action
  command: "PSSTW {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII, 50=0dB; AVR range -10 to +10 (40–60)"

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
  label: Stage Height Set
  kind: action
  command: "PSSTH {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII, 50=0dB; AVR range -10 to +10 (40–60)"

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
  label: Dynamic Compression AUTO
  kind: action
  command: "PSDRC AUTO"
  params: []

- id: ps_drc_low
  label: Dynamic Compression LOW
  kind: action
  command: "PSDRC LOW"
  params: []

- id: ps_drc_mid
  label: Dynamic Compression MID
  kind: action
  command: "PSDRC MID"
  params: []

- id: ps_drc_hi
  label: Dynamic Compression HI
  kind: action
  command: "PSDRC HI"
  params: []

- id: ps_drc_off
  label: Dynamic Compression OFF
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
  label: Bass Sync Set
  kind: action
  command: "PSBSC {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 0–16"

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
  command: "PSLFE {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; 00=0dB, 10=-10dB; AVR range 0 to -10"

- id: ps_lfe_query
  label: Query LFE Status
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level 0dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []

- id: ps_lfl_05
  label: LFE Level -5dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05"
  params: []

- id: ps_lfl_10
  label: LFE Level -10dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10"
  params: []

- id: ps_lfl_15
  label: LFE Level -15dB (EXT.IN/7.1CH IN)
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
  label: Effect Level Set
  kind: action
  command: "PSEFF {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 1–15"

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
  label: Delay Set
  kind: action
  command: "PSDEL {delay}"
  params:
    - name: delay
      type: string
      description: "000–999 ASCII, 000=0ms, 300=300ms; AVR range 0–300ms"

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
  label: Dimension Set
  kind: action
  command: "PSDIM {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 0–6"

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
  label: Center Width Set
  kind: action
  command: "PSCEN {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 0–7"

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
  label: Center Image Set
  kind: action
  command: "PSCEI {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 0.0–1.0"

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
  label: Center Gain Set
  kind: action
  command: "PSCEG {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 0.0–1.0"

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
  label: Subwoofer Output On (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR ON"
  params: []

- id: ps_swr_off
  label: Subwoofer Output Off (DIRECT/STEREO 2ch mode)
  kind: action
  command: "PSSWR OFF"
  params: []

- id: ps_swr_query
  label: Query Subwoofer Output Status
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
  label: Audio Delay Set
  kind: action
  command: "PSDELAY {delay}"
  params:
    - name: delay
      type: string
      description: "000–999 ASCII, 000=0ms, 200=200ms; AVR range 0–200ms"

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
  label: Query Audio Restorer Status
  kind: query
  command: "PSRSTR ?"
  params: []

- id: ps_front_spa
  label: Front Speaker Output A
  kind: action
  command: "PSFRONT SPA"
  params: []

- id: ps_front_spb
  label: Front Speaker Output B
  kind: action
  command: "PSFRONT SPB"
  params: []

- id: ps_front_apb
  label: Front Speaker Output A+B
  kind: action
  command: "PSFRONT A+B"
  params: []

- id: ps_front_query
  label: Query Front Speaker Status
  kind: query
  command: "PSFRONT?"
  params: []

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small (Auro-3D)
  kind: action
  command: "PSAUROPR SMA"
  params: []

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium (Auro-3D)
  kind: action
  command: "PSAUROPR MED"
  params: []

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large (Auro-3D)
  kind: action
  command: "PSAUROPR LAR"
  params: []

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Special (Auro-3D)
  kind: action
  command: "PSAUROPR SPE"
  params: []

- id: ps_auropr_query
  label: Query Auro-Matic 3D Preset Status (Auro-3D)
  kind: query
  command: "PSAUROPR ?"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up (Auro-3D)
  kind: action
  command: "PSAUROST UP"
  params: []

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down (Auro-3D)
  kind: action
  command: "PSAUROST DOWN"
  params: []

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set (Auro-3D)
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; AVR range 1–16"

- id: ps_aurost_query
  label: Query Auro-Matic 3D Strength Status (Auro-3D)
  kind: query
  command: "PSAUROST ?"
  params: []

# ── Picture Mode (PV) ────────────────────────────────────────────────────────
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
  label: Contrast Set
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: string
      description: "000–100 ASCII, 050=0; AVR range -50 to +50"

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
  label: Brightness Set
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: string
      description: "000–100 ASCII, 050=0; AVR range -50 to +50"

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
  label: Saturation Set
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: string
      description: "000–100 ASCII, 050=0; AVR range -50 to +50"

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
  label: Hue Set
  kind: action
  command: "PVHUE {level}"
  params:
    - name: level
      type: string
      description: "44–56 ASCII, 50=0; AVR range -6 to +6"

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
  label: Enhancer Set
  kind: action
  command: "PVENH {level}"
  params:
    - name: level
      type: string
      description: "00–12 ASCII; AVR range 0–12"

- id: pv_enh_query
  label: Query Enhancer Status
  kind: query
  command: "PVENH ?"
  params: []

# ── Zone 2 Control (Z2) ──────────────────────────────────────────────────────
- id: z2_source
  label: Zone 2 Source = Main Zone (cancel Zone 2 mode)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone 2 Select PHONO
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone 2 Select CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone 2 Select TUNER
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone 2 Select DVD
  kind: action
  command: "Z2DVD"
  params: []

- id: z2_bd
  label: Zone 2 Select BD
  kind: action
  command: "Z2BD"
  params: []

- id: z2_tv
  label: Zone 2 Select TV
  kind: action
  command: "Z2TV"
  params: []

- id: z2_sat_cbl
  label: Zone 2 Select SAT/CBL
  kind: action
  command: "Z2SAT/CBL"
  params: []

- id: z2_mplay
  label: Zone 2 Select MPLAY
  kind: action
  command: "Z2MPLAY"
  params: []

- id: z2_game
  label: Zone 2 Select GAME
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone 2 Select HD Radio
  kind: action
  command: "Z2HDRADIO"
  params: []

- id: z2_net
  label: Zone 2 Select NET
  kind: action
  command: "Z2NET"
  params: []

- id: z2_pandora
  label: Zone 2 Select PANDORA
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone 2 Select SIRIUSXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone 2 Select SPOTIFY
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone 2 Select LASTFM
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone 2 Select FLICKR
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone 2 Select IRADIO
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone 2 Select SERVER
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone 2 Select FAVORITES
  kind: action
  command: "Z2FAVORITES"
  params: []

- id: z2_aux1
  label: Zone 2 Select AUX1
  kind: action
  command: "Z2AUX1"
  params: []

- id: z2_aux2
  label: Zone 2 Select AUX2
  kind: action
  command: "Z2AUX2"
  params: []

- id: z2_aux3
  label: Zone 2 Select AUX3
  kind: action
  command: "Z2AUX3"
  params: []

- id: z2_aux4
  label: Zone 2 Select AUX4
  kind: action
  command: "Z2AUX4"
  params: []

- id: z2_aux5
  label: Zone 2 Select AUX5
  kind: action
  command: "Z2AUX5"
  params: []

- id: z2_aux6
  label: Zone 2 Select AUX6
  kind: action
  command: "Z2AUX6"
  params: []

- id: z2_aux7
  label: Zone 2 Select AUX7
  kind: action
  command: "Z2AUX7"
  params: []

- id: z2_bt
  label: Zone 2 Select Bluetooth
  kind: action
  command: "Z2BT"
  params: []

- id: z2_usb_ipod
  label: Zone 2 Select USB/iPod
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone 2 Select USB
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone 2 Select iPod DIRECT
  kind: action
  command: "Z2IPD"
  params: []

- id: z2_irp
  label: Zone 2 Select iRadio Recent Play
  kind: action
  command: "Z2IRP"
  params: []

- id: z2_fvp
  label: Zone 2 Select Favorites Play
  kind: action
  command: "Z2FVP"
  params: []

- id: z2_quick1
  label: Zone 2 Quick Select 1
  kind: action
  command: "Z2QUICK1"
  params: []

- id: z2_quick2
  label: Zone 2 Quick Select 2
  kind: action
  command: "Z2QUICK2"
  params: []

- id: z2_quick3
  label: Zone 2 Quick Select 3
  kind: action
  command: "Z2QUICK3"
  params: []

- id: z2_quick4
  label: Zone 2 Quick Select 4
  kind: action
  command: "Z2QUICK4"
  params: []

- id: z2_quick5
  label: Zone 2 Quick Select 5
  kind: action
  command: "Z2QUICK5"
  params: []

- id: z2_quick1_memory
  label: Zone 2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY"
  params: []

- id: z2_quick2_memory
  label: Zone 2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY"
  params: []

- id: z2_quick3_memory
  label: Zone 2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY"
  params: []

- id: z2_quick4_memory
  label: Zone 2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY"
  params: []

- id: z2_quick5_memory
  label: Zone 2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY"
  params: []

- id: z2_quick_query
  label: Zone 2 Quick Select Status Query
  kind: query
  command: "Z2QUICK ?"
  params: []

- id: z2_favorite1
  label: Zone 2 Favorite 1 Select
  kind: action
  command: "Z2FAVORITE1"
  params: []

- id: z2_favorite2
  label: Zone 2 Favorite 2 Select
  kind: action
  command: "Z2FAVORITE2"
  params: []

- id: z2_favorite3
  label: Zone 2 Favorite 3 Select
  kind: action
  command: "Z2FAVORITE3"
  params: []

- id: z2_favorite4
  label: Zone 2 Favorite 4 Select
  kind: action
  command: "Z2FAVORITE4"
  params: []

- id: z2_favorite1_memory
  label: Zone 2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY"
  params: []

- id: z2_favorite2_memory
  label: Zone 2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY"
  params: []

- id: z2_favorite3_memory
  label: Zone 2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY"
  params: []

- id: z2_favorite4_memory
  label: Zone 2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY"
  params: []

- id: z2_vol_up
  label: Zone 2 Volume Up
  kind: action
  command: "Z2UP"
  params: []

- id: z2_vol_down
  label: Zone 2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []

- id: z2_vol_set
  label: Zone 2 Volume Set
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00–98 ASCII, 80=0dB, 00=MIN"

- id: z2_on
  label: Zone 2 On
  kind: action
  command: "Z2ON"
  params: []

- id: z2_off
  label: Zone 2 Off
  kind: action
  command: "Z2OFF"
  params: []

- id: z2_query
  label: Zone 2 Status Query
  kind: query
  command: "Z2?"
  params: []

- id: z2mu_on
  label: Zone 2 Mute On
  kind: action
  command: "Z2MUON"
  params: []

- id: z2mu_off
  label: Zone 2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []

- id: z2mu_query
  label: Zone 2 Mute Status Query
  kind: query
  command: "Z2MU?"
  params: []

- id: z2cs_st
  label: Zone 2 Channel Setting Stereo
  kind: action
  command: "Z2CSST"
  params: []

- id: z2cs_mono
  label: Zone 2 Channel Setting Mono
  kind: action
  command: "Z2CSMONO"
  params: []

- id: z2cs_query
  label: Zone 2 Channel Setting Query
  kind: query
  command: "Z2CS?"
  params: []

- id: z2cv_fl_up
  label: Zone 2 Channel Volume Front Left Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2cv_fl_down
  label: Zone 2 Channel Volume Front Left Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2cv_fl_set
  label: Zone 2 Channel Volume Front Left Set
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

- id: z2cv_fr_up
  label: Zone 2 Channel Volume Front Right Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2cv_fr_down
  label: Zone 2 Channel Volume Front Right Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2cv_fr_set
  label: Zone 2 Channel Volume Front Right Set
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

- id: z2cv_query
  label: Zone 2 Channel Volume Status Query
  kind: query
  command: "Z2CV?"
  params: []

- id: z2hpf_on
  label: Zone 2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []

- id: z2hpf_off
  label: Zone 2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []

- id: z2hpf_query
  label: Zone 2 HPF Status Query
  kind: query
  command: "Z2HPF?"
  params: []

- id: z2ps_bas_up
  label: Zone 2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []

- id: z2ps_bas_down
  label: Zone 2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []

- id: z2ps_bas_set
  label: Zone 2 Bass Set
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; range -10 to +10 (40–60) or -14 to +14 (36–64) for X4100"

- id: z2ps_bas_query
  label: Zone 2 Bass Status Query
  kind: query
  command: "Z2PSBAS ?"
  params: []

- id: z2ps_tre_up
  label: Zone 2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []

- id: z2ps_tre_down
  label: Zone 2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []

- id: z2ps_tre_set
  label: Zone 2 Treble Set
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; range -10 to +10 (40–60) or -14 to +14 (36–64) for X4100"

- id: z2ps_tre_query
  label: Zone 2 Treble Status Query
  kind: query
  command: "Z2PSTRE ?"
  params: []

- id: z2hda_thr
  label: Zone 2 HDMI Out Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2hda_pcm
  label: Zone 2 HDMI Out PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2hda_query
  label: Zone 2 HDMI Audio Status Query
  kind: query
  command: "Z2HDA?"
  params: []

- id: z2slp_off
  label: Zone 2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []

- id: z2slp_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001–120 ASCII, 010=10min"

- id: z2slp_query
  label: Zone 2 Sleep Timer Status Query
  kind: query
  command: "Z2SLP?"
  params: []

- id: z2stby_2h
  label: Zone 2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2stby_4h
  label: Zone 2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2stby_8h
  label: Zone 2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H"
  params: []

- id: z2stby_off
  label: Zone 2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []

- id: z2stby_query
  label: Zone 2 Auto Standby Status Query
  kind: query
  command: "Z2STBY?"
  params: []

# ── Zone 3 Control (Z3) ──────────────────────────────────────────────────────
- id: z3_source
  label: Zone 3 Source = Main Zone (cancel Zone 3 mode)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone 3 Select PHONO
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone 3 Select CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone 3 Select TUNER
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone 3 Select DVD
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone 3 Select BD
  kind: action
  command: "Z3BD"
  params: []

- id: z3_tv
  label: Zone 3 Select TV
  kind: action
  command: "Z3TV"
  params: []

- id: z3_sat_cbl
  label: Zone 3 Select SAT/CBL
  kind: action
  command: "Z3SAT/CBL"
  params: []

- id: z3_mplay
  label: Zone 3 Select MPLAY
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone 3 Select GAME
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone 3 Select HD Radio
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone 3 Select NET
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone 3 Select PANDORA
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone 3 Select SIRIUSXM
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone 3 Select SPOTIFY
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone 3 Select LASTFM
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone 3 Select FLICKR
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone 3 Select IRADIO
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone 3 Select SERVER
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone 3 Select FAVORITES
  kind: action
  command: "Z3FAVORITES"
  params: []

- id: z3_aux1
  label: Zone 3 Select AUX1
  kind: action
  command: "Z3AUX1"
  params: []

- id: z3_aux2
  label: Zone 3 Select AUX2
  kind: action
  command: "Z3AUX2"
  params: []

- id: z3_aux3
  label: Zone 3 Select AUX3
  kind: action
  command: "Z3AUX3"
  params: []

- id: z3_aux4
  label: Zone 3 Select AUX4
  kind: action
  command: "Z3AUX4"
  params: []

- id: z3_aux5
  label: Zone 3 Select AUX5
  kind: action
  command: "Z3AUX5"
  params: []

- id: z3_aux6
  label: Zone 3 Select AUX6
  kind: action
  command: "Z3AUX6"
  params: []

- id: z3_aux7
  label: Zone 3 Select AUX7
  kind: action
  command: "Z3AUX7"
  params: []

- id: z3_bt
  label: Zone 3 Select Bluetooth
  kind: action
  command: "Z3BT"
  params: []

- id: z3_usb_ipod
  label: Zone 3 Select USB/iPod
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone 3 Select USB
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone 3 Select iPod DIRECT
  kind: action
  command: "Z3IPD"
  params: []

- id: z3_irp
  label: Zone 3 Select iRadio Recent Play
  kind: action
  command: "Z3IRP"
  params: []

- id: z3_fvp
  label: Zone 3 Select Favorites Play
  kind: action
  command: "Z3FVP"
  params: []

- id: z3_quick1
  label: Zone 3 Quick Select 1
  kind: action
  command: "Z3QUICK1"
  params: []

- id: z3_quick2
  label: Zone 3 Quick Select 2
  kind: action
  command: "Z3QUICK2"
  params: []

- id: z3_quick3
  label: Zone 3 Quick Select 3
  kind: action
  command: "Z3QUICK3"
  params: []

- id: z3_quick4
  label: Zone 3 Quick Select 4
  kind: action
  command: "Z3QUICK4"
  params: []

- id: z3_quick5
  label: Zone 3 Quick Select 5
  kind: action
  command: "Z3QUICK5"
  params: []

- id: z3_quick1_memory
  label: Zone 3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY"
  params: []

- id: z3_quick2_memory
  label: Zone 3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY"
  params: []

- id: z3_quick3_memory
  label: Zone 3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY"
  params: []

- id: z3_quick4_memory
  label: Zone 3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY"
  params: []

- id: z3_quick5_memory
  label: Zone 3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY"
  params: []

- id: z3_quick_query
  label: Zone 3 Quick Select Status Query
  kind: query
  command: "Z3QUICK ?"
  params: []

- id: z3_favorite1
  label: Zone 3 Favorite 1 Select
  kind: action
  command: "Z3FAVORITE1"
  params: []

- id: z3_favorite2
  label: Zone 3 Favorite 2 Select
  kind: action
  command: "Z3FAVORITE2"
  params: []

- id: z3_favorite3
  label: Zone 3 Favorite 3 Select
  kind: action
  command: "Z3FAVORITE3"
  params: []

- id: z3_favorite4
  label: Zone 3 Favorite 4 Select
  kind: action
  command: "Z3FAVORITE4"
  params: []

- id: z3_favorite1_memory
  label: Zone 3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY"
  params: []

- id: z3_favorite2_memory
  label: Zone 3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY"
  params: []

- id: z3_favorite3_memory
  label: Zone 3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY"
  params: []

- id: z3_favorite4_memory
  label: Zone 3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY"
  params: []

- id: z3_vol_up
  label: Zone 3 Volume Up
  kind: action
  command: "Z3UP"
  params: []

- id: z3_vol_down
  label: Zone 3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []

- id: z3_vol_set
  label: Zone 3 Volume Set
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00–98 ASCII, 80=0dB, 00=MIN"

- id: z3_on
  label: Zone 3 On
  kind: action
  command: "Z3ON"
  params: []

- id: z3_off
  label: Zone 3 Off
  kind: action
  command: "Z3OFF"
  params: []

- id: z3_query
  label: Zone 3 Status Query
  kind: query
  command: "Z3?"
  params: []

- id: z3mu_on
  label: Zone 3 Mute On
  kind: action
  command: "Z3MUON"
  params: []

- id: z3mu_off
  label: Zone 3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []

- id: z3mu_query
  label: Zone 3 Mute Status Query
  kind: query
  command: "Z3MU?"
  params: []

- id: z3cs_st
  label: Zone 3 Channel Setting Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3cs_mono
  label: Zone 3 Channel Setting Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3cs_query
  label: Zone 3 Channel Setting Query
  kind: query
  command: "Z3CS?"
  params: []

- id: z3cv_fl_up
  label: Zone 3 Channel Volume Front Left Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3cv_fl_down
  label: Zone 3 Channel Volume Front Left Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3cv_fl_set
  label: Zone 3 Channel Volume Front Left Set
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

- id: z3cv_fr_up
  label: Zone 3 Channel Volume Front Right Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3cv_fr_down
  label: Zone 3 Channel Volume Front Right Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3cv_fr_set
  label: Zone 3 Channel Volume Front Right Set
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 ASCII, 50=0dB"

- id: z3cv_query
  label: Zone 3 Channel Volume Status Query
  kind: query
  command: "Z3CV?"
  params: []

- id: z3hpf_on
  label: Zone 3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []

- id: z3hpf_off
  label: Zone 3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []

- id: z3hpf_query
  label: Zone 3 HPF Status Query
  kind: query
  command: "Z3HPF?"
  params: []

- id: z3ps_bas_up
  label: Zone 3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []

- id: z3ps_bas_down
  label: Zone 3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []

- id: z3ps_bas_set
  label: Zone 3 Bass Set
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; range -10 to +10 (40–60) or -14 to +14 (36–64) for X4100"

- id: z3ps_bas_query
  label: Zone 3 Bass Status Query
  kind: query
  command: "Z3PSBAS ?"
  params: []

- id: z3ps_tre_up
  label: Zone 3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []

- id: z3ps_tre_down
  label: Zone 3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []

- id: z3ps_tre_set
  label: Zone 3 Treble Set
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 ASCII; range -10 to +10 (40–60) or -14 to +14 (36–64) for X4100"

- id: z3ps_tre_query
  label: Zone 3 Treble Status Query
  kind: query
  command: "Z3PSTRE ?"
  params: []

- id: z3slp_off
  label: Zone 3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []

- id: z3slp_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001–120 ASCII, 010=10min"

- id: z3slp_query
  label: Zone 3 Sleep Timer Status Query
  kind: query
  command: "Z3SLP?"
  params: []

- id: z3stby_2h
  label: Zone 3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3stby_4h
  label: Zone 3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3stby_8h
  label: Zone 3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H"
  params: []

- id: z3stby_off
  label: Zone 3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []

- id: z3stby_query
  label: Zone 3 Auto Standby Status Query
  kind: query
  command: "Z3STBY?"
  params: []

# ── Tuner Control (TF/TP/TM) ─────────────────────────────────────────────────
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
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: >050000 = AM kHz, <050000 = FM MHz*100 (e.g. TFAN105000 = 1050.00kHz AM)"

- id: tf_an_query
  label: Query Tuner Frequency Status
  kind: query
  command: "TFAN?"
  params: []

- id: tf_anname_query
  label: Query RDS Station Name (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

- id: tp_an_up
  label: Tuner Preset Channel Up
  kind: action
  command: "TPANUP"
  params: []

- id: tp_an_down
  label: Tuner Preset Channel Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tp_an_set
  label: Tuner Preset Channel Set
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 (CH01–CH56)"

- id: tp_an_query
  label: Query Tuner Preset Status
  kind: query
  command: "TPAN?"
  params: []

- id: tp_anmem
  label: Tuner Preset Memory (enter memory mode)
  kind: action
  command: "TPANMEM"
  params: []

- id: tp_anmem_set
  label: Tuner Preset Memory Store to Preset Number
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 (CH01–CH56)"

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
  label: Query Tuner Band Status
  kind: query
  command: "TMAN?"
  params: []

- id: tm_anauto
  label: Tuner Mode Auto
  kind: action
  command: "TMANAUTO"
  params: []

- id: tm_anmanual
  label: Tuner Mode Manual
  kind: action
  command: "TMANMANUAL"
  params: []

# ── HD Radio Control (TF/TP/TM/HD) ──────────────────────────────────────────
- id: tf_hd_up
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP"
  params: []

- id: tf_hd_down
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: tf_hd_set
  label: HD Radio Frequency Set
  kind: action
  command: "TFHD{frequency}"
  params:
    - name: frequency
      type: string
      description: "6 digits: >050000 = AM kHz, <050000 = FM MHz*100"

- id: tf_hd_mc_set
  label: HD Radio Multi Cast CH Select
  kind: action
  command: "TFHDMC{channel}"
  params:
    - name: channel
      type: string
      description: "1 digit: 1–8 = Multi Cast, 0 = Analog"

- id: tf_hd_freq_mc_set
  label: HD Radio Frequency and Multi Cast CH Select
  kind: action
  command: "TFHD{frequency}MC{channel}"
  params:
    - name: frequency
      type: string
      description: "6 digits frequency"
    - name: channel
      type: string
      description: "1 digit Multi Cast channel"

- id: tf_hd_query
  label: Query HD Radio Frequency Status
  kind: query
  command: "TFHD?"
  params: []

- id: tp_hd_up
  label: HD Radio Preset Channel Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tp_hd_down
  label: HD Radio Preset Channel Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tp_hd_set
  label: HD Radio Preset Channel Set
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 (CH01–CH56)"

- id: tp_hd_query
  label: Query HD Radio Preset Status
  kind: query
  command: "TPHD?"
  params: []

- id: tp_hdmem
  label: HD Radio Preset Memory (enter memory mode)
  kind: action
  command: "TPHDMEM"
  params: []

- id: tp_hdmem_set
  label: HD Radio Preset Memory Store to Preset Number
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 (CH01–CH56)"

- id: tm_hdam
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []

- id: tm_hdfm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

- id: tm_hdautohd
  label: HD Radio Tuning Mode AUTO-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: tm_hdauto
  label: HD Radio Tuning Mode AUTO
  kind: action
  command: "TMHDAUTO"
  params: []

- id: tm_hdmanual
  label: HD Radio Tuning Mode MANUAL
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: tm_hdanaauto
  label: HD Radio Tuning Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tm_hdanamanu
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

# ── Online Music / USB / Bluetooth Navigation (NS) ──────────────────────────
- id: ns_cursor_up
  label: Cursor Up (Online Music / USB / Bluetooth)
  kind: action
  command: "NS90"
  params: []

- id: ns_cursor_down
  label: Cursor Down
  kind: action
  command: "NS91"
  params: []

- id: ns_cursor_left
  label: Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: Enter / Play / Pause
  kind: action
  command: "NS94"
  params: []

- id: ns_play
  label: Play
  kind: action
  command: "NS9A"
  params: []

- id: ns_pause
  label: Pause
  kind: action
  command: "NS9B"
  params: []

- id: ns_stop
  label: Stop
  kind: action
  command: "NS9C"
  params: []

- id: ns_skip_plus
  label: Skip Plus
  kind: action
  command: "NS9D"
  params: []

- id: ns_skip_minus
  label: Skip Minus
  kind: action
  command: "NS9E"
  params: []

- id: ns_manual_search_plus
  label: Manual Search Plus (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9F"
  params: []

- id: ns_manual_search_minus
  label: Manual Search Minus (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9G"
  params: []

- id: ns_repeat_one
  label: Repeat One (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9H"
  params: []

- id: ns_repeat_all
  label: Repeat All (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9I"
  params: []

- id: ns_repeat_off
  label: Repeat Off (Media Server, USB, iPod Direct, Bluetooth)
  kind: action
  command: "NS9J"
  params: []

- id: ns_random_on
  label: Random On / Shuffle Songs (Media Server, USB, Bluetooth / iPod Direct)
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: Random Off / Shuffle Off (Media Server, USB, Bluetooth / iPod Direct)
  kind: action
  command: "NS9M"
  params: []

- id: ns_ipod_mode_toggle
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: Page Next
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_prev
  label: Page Previous
  kind: action
  command: "NS9Y"
  params: []

- id: ns_manual_search_stop
  label: Manual Search Stop (USB/iPod, Media Server, Bluetooth)
  kind: action
  command: "NS9Z"
  params: []

- id: ns_repeat_toggle
  label: Repeat Toggle (Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth)
  kind: action
  command: "NSRPT"
  params: []

- id: ns_random_toggle
  label: Random Toggle (Media Server, USB, iPod Direct, Spotify, AirPlay, Bluetooth)
  kind: action
  command: "NSRND"
  params: []

- id: ns_preset_call
  label: Net Audio Preset Call
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00–35 (2014 AVR); preset channels"

- id: ns_preset_memory
  label: Net Audio Preset Memory
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00–35 (2014 AVR)"

- id: ns_preset_name_query
  label: Net Audio Preset Name Status Query (UTF-8)
  kind: query
  command: "NSH"
  params: []

- id: ns_fv_mem
  label: Add to Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_display_ascii_query
  label: Request Onscreen Display Information (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: ns_display_utf8_query
  label: Request Onscreen Display Information (UTF-8)
  kind: query
  command: "NSE"
  params: []

# ── System / Navigation (MN) ─────────────────────────────────────────────────
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

# ── System Lock (SY) ─────────────────────────────────────────────────────────
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
  label: Panel Lock On (except Master Vol.)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel + Master Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# ── Trigger (TR) ─────────────────────────────────────────────────────────────
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

# ── Upgrade (UG) ─────────────────────────────────────────────────────────────
- id: ug_idn
  label: Display ID Number for Upgrade
  kind: action
  command: "UGIDN"
  params: []

# ── Remote Maintenance (RM) ──────────────────────────────────────────────────
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

# ── Dimmer (DIM) ─────────────────────────────────────────────────────────────
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
  label: Power State
  type: enum
  values:
    - PWON
    - PWSTANDBY

- id: master_volume_state
  label: Master Volume State
  type: string
  description: "MV{level} — 2-digit (00–98) or 3-digit (e.g. 805) ASCII; 80=0dB, 00=MIN"

- id: mute_state
  label: Mute State
  type: enum
  values:
    - MUON
    - MUOFF

- id: input_state
  label: Input Source State
  type: string
  description: "SI{source} — current input source string"

- id: zone_main_state
  label: Main Zone State
  type: enum
  values:
    - ZMON
    - ZMOFF

- id: surround_mode_state
  label: Surround Mode State
  type: string
  description: "MS{mode} — current surround mode string"

- id: channel_volume_state
  label: Channel Volume State
  type: string
  description: "CV{channel} {level} — e.g. CVFL 50; query returns all active speakers ending with CVEND"

- id: sleep_timer_state
  label: Sleep Timer State
  type: string
  description: "SLP{minutes} or SLPOFF"

- id: auto_standby_state
  label: Auto Standby State
  type: string
  description: "STBY15M, STBY30M, STBY60M, or STBYOFF"

- id: eco_state
  label: ECO Mode State
  type: enum
  values:
    - ECOON
    - ECOAUTO
    - ECOOFF

- id: zone2_state
  label: Zone 2 State
  type: string
  description: "Z2ON, Z2OFF, Z2{source}, Z2{volume}"

- id: zone2_mute_state
  label: Zone 2 Mute State
  type: enum
  values:
    - Z2MUON
    - Z2MUOFF

- id: zone3_state
  label: Zone 3 State
  type: string
  description: "Z3ON, Z3OFF, Z3{source}, Z3{volume}"

- id: zone3_mute_state
  label: Zone 3 Mute State
  type: enum
  values:
    - Z3MUON
    - Z3MUOFF

- id: tuner_frequency_state
  label: Tuner Frequency State
  type: string
  description: "TFAN{6-digit frequency}"

- id: tuner_preset_state
  label: Tuner Preset State
  type: string
  description: "TPAN{preset} or TPANOFF"

- id: hd_radio_state
  label: HD Radio Status
  type: string
  description: "HDST NAME{name}, HDSIG LEV {0-6}, HDMLT CURRCH{ch}, HDMLT CAST CH{ch}, HDARTIST{text}, HDTITLE{text}, HDALBUM{text}, HDGENRE{text}, HDPTY{text}, HDMODE DIGITAL/ANALOG"

- id: trigger_state
  label: Trigger State
  type: string
  description: "TR1 ON/OFF, TR2 ON/OFF"

- id: remote_maintenance_state
  label: Remote Maintenance State
  type: enum
  values:
    - "RM ON"
    - "RM OFF"

- id: dimmer_state
  label: Dimmer State
  type: string
  description: "DIM BRI, DIM DIM, DIM DAR, or DIM OFF"

- id: menu_state
  label: Setup Menu State
  type: enum
  values:
    - "MNMEN ON"
    - "MNMEN OFF"

- id: all_zone_stereo_state
  label: All Zone Stereo State
  type: enum
  values:
    - "MNZST ON"
    - "MNZST OFF"
```

## Events
```yaml
# The device sends EVENT messages asynchronously when state changes.
# EVENT format is identical to COMMAND format: COMMAND + PARAMETER + CR (0x0D)
# EVENT is sent within 5 seconds of the state change.
# When input source changes, channel volume and surround mode may also return as EVENTs.
# When SURROUND MODE or CHANNEL VOLUME is unchanged before/after input switch, no EVENT is returned.
# COMMAND is receivable during transmission of EVENT (half-duplex).
```

## Macros
```yaml
# Power-on sequence: after sending PWON, wait 1 second before sending the next command.
# (Documented in source note J)
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
- Command terminator: CR (0x0D) only; no LF.
- Minimum command interval: 50ms between consecutive commands.
- RESPONSE timing: within 200ms of receiving a request command.
- Half-duplex: COMMAND is receivable during EVENT transmission.
- Volume 0.5dB steps use 3-digit ASCII parameter (e.g. MV805 = +0.5dB); integer steps use 2-digit.
- MASTER VOLUME minimum level (MV00) represents ---dB (silence).
- Channel volume range: 38–62 ASCII, 50=0dB; subwoofer accepts 00 (off) as well.
- Zone 2 and Zone 3 support independent power, input, volume, mute, bass/treble, HPF, sleep, and standby.
- NS* (Online/USB/Bluetooth navigation) commands are command-only; no RESPONSE is returned.
- MN* (system navigation: CUP, CDN, CLT, CRT, ENT, RTN, OPT, INF, CHL) are command-only.
- HD Radio commands are North America only unless otherwise noted.
- RDS Station Name query (TFANNAME?) is EU/AP only.

<!-- UNRESOLVED: specific model number(s) covered by this protocol document -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:34.167Z
last_checked_at: 2026-06-02T08:46:06.621Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T08:46:06.621Z
matched_actions: 857
action_count: 857
confidence: medium
summary: "All 857 spec actions match verbatim in the source; transport values (9600 baud, TCP port 23) confirmed; only 7 edge-case/event-only tokens in source not represented in spec. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SDARC
- MS7.1IN
- "MSPURE DIRECT EXT"
- MSQUICK0
- Z2QUICK0
- Z3QUICK0
- PSMODE:HEIGHT
- "specific model name/number not stated in source; document is a generic Marantz AVR protocol reference"
- "no safety warnings or interlock procedures stated in source"
- "specific model number(s) covered by this protocol document"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
