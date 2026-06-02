---
spec_id: admin/marantz-na7004
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NA7004 Control Spec"
manufacturer: Marantz
model_family: NA7004
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - NA7004
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:40.220Z
last_checked_at: 2026-06-02T17:23:25.423Z
generated_at: 2026-06-02T17:23:25.423Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is \"Control Protocol Ver.06\" and lists commands for full AV receiver models (X1100, S700); commands beyond the NA7004 network audio player feature set (multi-zone Z2/Z3, video processing VS, extensive surround MS list) are included as documented in the source."
  - "populate from source, or remove section if not applicable"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:25.423Z
  matched_actions: 767
  action_count: 767
  confidence: medium
  summary: "All 767 spec actions match literal commands in the source; transport (port 23, baud 9600) confirmed; source command catalogue fully covered. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Marantz NA7004 Control Spec

## Summary
Network audio player with RS-232C and Ethernet (TCP/IP) control interfaces. ASCII-based command protocol (Control Protocol Ver.06) with 2-character commands followed by parameters and CR (0x0D) terminator. Supports query commands (via `?`), power control, input selection, volume/mute, surround mode, multi-zone, tuner, online music/USB/Bluetooth navigation, and system control operations.

<!-- UNRESOLVED: source document is "Control Protocol Ver.06" and lists commands for full AV receiver models (X1100, S700); commands beyond the NA7004 network audio player feature set (multi-zone Z2/Z3, video processing VS, extensive surround MS list) are included as documented in the source. -->

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
- powerable       # PWON/PWSTANDBY commands present
- queryable       # query commands (e.g. PW?, MV?, SI?) present
- levelable       # MV (master volume), CV (channel volume) commands present
- routable        # SI (input selection) commands present
```

## Actions
```yaml
# ── PW: Power ──────────────────────────────────────────────────────────────
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

# ── MV: Master Volume ───────────────────────────────────────────────────────
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
  label: Set Master Volume (direct)
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "00 to 98 by ASCII, 80=0dB, 00=---(MIN). 0.5dB step uses 3 chars (e.g. MV805=+0.5dB, MV795=-0.5dB, MV005=-79.5dB)"

- id: master_volume_query
  label: Query Master Volume
  kind: query
  command: "MV?"
  params: []

# ── CV: Channel Volume ───────────────────────────────────────────────────────
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
  label: Set Channel Volume Front Left
  kind: action
  command: "CVFL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Right
  kind: action
  command: "CVFR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Center
  kind: action
  command: "CVC {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Subwoofer
  kind: action
  command: "CVSW {level}"
  params:
    - name: level
      type: string
      description: "00,38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Subwoofer 2
  kind: action
  command: "CVSW2 {level}"
  params:
    - name: level
      type: string
      description: "00,38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Left
  kind: action
  command: "CVSL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Right
  kind: action
  command: "CVSR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Back Left
  kind: action
  command: "CVSBL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Back Right
  kind: action
  command: "CVSBR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: channel_volume_sb_up
  label: Channel Volume Surround Back (1SP) Up
  kind: action
  command: "CVSB UP"
  params: []

- id: channel_volume_sb_down
  label: Channel Volume Surround Back (1SP) Down
  kind: action
  command: "CVSB DOWN"
  params: []

- id: channel_volume_sb_set
  label: Set Channel Volume Surround Back (1SP)
  kind: action
  command: "CVSB {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Height Left
  kind: action
  command: "CVFHL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Height Right
  kind: action
  command: "CVFHR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Wide Left
  kind: action
  command: "CVFWL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Wide Right
  kind: action
  command: "CVFWR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Front Left
  kind: action
  command: "CVTFL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Front Right
  kind: action
  command: "CVTFR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Middle Left
  kind: action
  command: "CVTML {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Middle Right
  kind: action
  command: "CVTMR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Rear Left
  kind: action
  command: "CVTRL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Top Rear Right
  kind: action
  command: "CVTRR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Rear Height Left
  kind: action
  command: "CVRHL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Rear Height Right
  kind: action
  command: "CVRHR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Dolby Left
  kind: action
  command: "CVFDL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Front Dolby Right
  kind: action
  command: "CVFDR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Dolby Left
  kind: action
  command: "CVSDL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Surround Dolby Right
  kind: action
  command: "CVSDR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Back Dolby Left
  kind: action
  command: "CVBDL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

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
  label: Set Channel Volume Back Dolby Right
  kind: action
  command: "CVBDR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: channel_volume_shl_up
  label: Channel Volume Surround Height Left Up (Auro-3D)
  kind: action
  command: "CVSHL UP"
  params: []

- id: channel_volume_shl_down
  label: Channel Volume Surround Height Left Down (Auro-3D)
  kind: action
  command: "CVSHL DOWN"
  params: []

- id: channel_volume_shl_set
  label: Set Channel Volume Surround Height Left (Auro-3D)
  kind: action
  command: "CVSHL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: channel_volume_shr_up
  label: Channel Volume Surround Height Right Up (Auro-3D)
  kind: action
  command: "CVSHR UP"
  params: []

- id: channel_volume_shr_down
  label: Channel Volume Surround Height Right Down (Auro-3D)
  kind: action
  command: "CVSHR DOWN"
  params: []

- id: channel_volume_shr_set
  label: Set Channel Volume Surround Height Right (Auro-3D)
  kind: action
  command: "CVSHR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: channel_volume_ts_up
  label: Channel Volume Top Surround Up (Auro-3D)
  kind: action
  command: "CVTS UP"
  params: []

- id: channel_volume_ts_down
  label: Channel Volume Top Surround Down (Auro-3D)
  kind: action
  command: "CVTS DOWN"
  params: []

- id: channel_volume_ts_set
  label: Set Channel Volume Top Surround (Auro-3D)
  kind: action
  command: "CVTS {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: channel_volume_reset
  label: Reset All Channel Volume to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: channel_volume_query
  label: Query Channel Volume Status
  kind: query
  command: "CV?"
  params: []

# ── MU: Mute ────────────────────────────────────────────────────────────────
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

# ── SI: Input Select ─────────────────────────────────────────────────────────
- id: input_select_phono
  label: Select Input PHONO
  kind: action
  command: "SIPHONO"
  params: []

- id: input_select_cd
  label: Select Input CD
  kind: action
  command: "SICD"
  params: []

- id: input_select_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER"
  params: []

- id: input_select_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD"
  params: []

- id: input_select_bd
  label: Select Input BD (Blu-ray)
  kind: action
  command: "SIBD"
  params: []

- id: input_select_tv
  label: Select Input TV AUDIO
  kind: action
  command: "SITV"
  params: []

- id: input_select_sat_cbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL"
  params: []

- id: input_select_mplay
  label: Select Input MEDIA PLAYER
  kind: action
  command: "SIMPLAY"
  params: []

- id: input_select_game
  label: Select Input GAME
  kind: action
  command: "SIGAME"
  params: []

- id: input_select_hdradio
  label: Select Input HD RADIO (North America only)
  kind: action
  command: "SIHDRADIO"
  params: []

- id: input_select_net
  label: Select Input NET (Online Music)
  kind: action
  command: "SINET"
  params: []

- id: input_select_pandora
  label: Select Input PANDORA (North America only)
  kind: action
  command: "SIPANDORA"
  params: []

- id: input_select_siriusxm
  label: Select Input SIRIUSXM
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: input_select_spotify
  label: Select Input SPOTIFY (North America and Europe only)
  kind: action
  command: "SISPOTIFY"
  params: []

- id: input_select_lastfm
  label: Select Input LASTFM
  kind: action
  command: "SILASTFM"
  params: []

- id: input_select_flickr
  label: Select Input FLICKR
  kind: action
  command: "SIFLICKR"
  params: []

- id: input_select_iradio
  label: Select Input IRADIO
  kind: action
  command: "SIIRADIO"
  params: []

- id: input_select_server
  label: Select Input SERVER
  kind: action
  command: "SISERVER"
  params: []

- id: input_select_favorites
  label: Select Input FAVORITES
  kind: action
  command: "SIFAVORITES"
  params: []

- id: input_select_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1"
  params: []

- id: input_select_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2"
  params: []

- id: input_select_aux3
  label: Select Input AUX3
  kind: action
  command: "SIAUX3"
  params: []

- id: input_select_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4"
  params: []

- id: input_select_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5"
  params: []

- id: input_select_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6"
  params: []

- id: input_select_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7"
  params: []

- id: input_select_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT"
  params: []

- id: input_select_usb_ipod
  label: Select Input USB/IPOD and Start Playback
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: input_select_usb
  label: Select Input USB and Start Playback
  kind: action
  command: "SIUSB"
  params: []

- id: input_select_ipd
  label: Select Input USB and iPod DIRECT Start Playback
  kind: action
  command: "SIIPD"
  params: []

- id: input_select_irp
  label: Select Input NET/USB and iRadio Recent Play
  kind: action
  command: "SIIRP"
  params: []

- id: input_select_fvp
  label: Select Input NET/USB and Favorites Play
  kind: action
  command: "SIFVP"
  params: []

- id: input_query
  label: Query Input Status
  kind: query
  command: "SI?"
  params: []

# ── ZM: Main Zone ───────────────────────────────────────────────────────────
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
  label: Query Main Zone Status
  kind: query
  command: "ZM?"
  params: []

- id: main_zone_favorite1
  label: Main Zone Favorite 1 Select
  kind: action
  command: "ZMFAVORITE1"
  params: []

- id: main_zone_favorite2
  label: Main Zone Favorite 2 Select
  kind: action
  command: "ZMFAVORITE2"
  params: []

- id: main_zone_favorite3
  label: Main Zone Favorite 3 Select
  kind: action
  command: "ZMFAVORITE3"
  params: []

- id: main_zone_favorite4
  label: Main Zone Favorite 4 Select
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

# ── SR: Record Select ────────────────────────────────────────────────────────
- id: rec_select_source
  label: REC SELECT Mode Cancel (source same as main)
  kind: action
  command: "SRSOURCE"
  params: []

- id: rec_select_query
  label: Query REC SELECT Status
  kind: query
  command: "SR?"
  params: []

# ── SD: Signal Input Mode ────────────────────────────────────────────────────
- id: signal_input_auto
  label: Set Signal Input Auto Mode
  kind: action
  command: "SDAUTO"
  params: []

- id: signal_input_hdmi
  label: Set Signal Input Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: signal_input_digital
  label: Set Signal Input Force Digital
  kind: action
  command: "SDDIGITAL"
  params: []

- id: signal_input_analog
  label: Set Signal Input Force Analog
  kind: action
  command: "SDANALOG"
  params: []

- id: signal_input_ext_in
  label: Set Signal Input External In
  kind: action
  command: "SDEXT.IN"
  params: []

- id: signal_input_7_1_in
  label: Set Signal Input 7.1CH In
  kind: action
  command: "SD7.1IN"
  params: []

- id: signal_input_no
  label: Set Signal Input No
  kind: action
  command: "SDNO"
  params: []

- id: signal_input_query
  label: Query Signal Input Mode Status
  kind: query
  command: "SD?"
  params: []

# ── DC: Digital Input Mode ───────────────────────────────────────────────────
- id: digital_input_auto
  label: Set Digital Input Auto Mode
  kind: action
  command: "DCAUTO"
  params: []

- id: digital_input_pcm
  label: Set Digital Input Force PCM
  kind: action
  command: "DCPCM"
  params: []

- id: digital_input_dts
  label: Set Digital Input Force DTS
  kind: action
  command: "DCDTS"
  params: []

- id: digital_input_query
  label: Query Digital Input Mode Status
  kind: query
  command: "DC?"
  params: []

# ── SV: Video Select ─────────────────────────────────────────────────────────
- id: video_select_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD"
  params: []

- id: video_select_bd
  label: Video Select BD
  kind: action
  command: "SVBD"
  params: []

- id: video_select_tv
  label: Video Select TV
  kind: action
  command: "SVTV"
  params: []

- id: video_select_sat_cbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL"
  params: []

- id: video_select_mplay
  label: Video Select MPLAY
  kind: action
  command: "SVMPLAY"
  params: []

- id: video_select_game
  label: Video Select GAME
  kind: action
  command: "SVGAME"
  params: []

- id: video_select_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1"
  params: []

- id: video_select_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2"
  params: []

- id: video_select_aux3
  label: Video Select AUX3
  kind: action
  command: "SVAUX3"
  params: []

- id: video_select_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4"
  params: []

- id: video_select_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5"
  params: []

- id: video_select_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6"
  params: []

- id: video_select_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7"
  params: []

- id: video_select_cd
  label: Video Select CD
  kind: action
  command: "SVCD"
  params: []

- id: video_select_source
  label: Video Select Cancel (SOURCE)
  kind: action
  command: "SVSOURCE"
  params: []

- id: video_select_on
  label: Video Select ON
  kind: action
  command: "SVON"
  params: []

- id: video_select_off
  label: Video Select OFF
  kind: action
  command: "SVOFF"
  params: []

- id: video_select_query
  label: Query Video Select Status
  kind: query
  command: "SV?"
  params: []

# ── SLP: Sleep Timer ─────────────────────────────────────────────────────────
- id: sleep_timer_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: sleep_timer_set
  label: Set Sleep Timer
  kind: action
  command: "SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII (e.g. SLP120 = 120 min, SLP010 = 10 min)"

- id: sleep_timer_query
  label: Query Sleep Timer Status
  kind: query
  command: "SLP?"
  params: []

# ── STBY: Auto Standby ───────────────────────────────────────────────────────
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
  label: Query Auto Standby Status
  kind: query
  command: "STBY?"
  params: []

# ── ECO: ECO Mode ────────────────────────────────────────────────────────────
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

# ── MS: Surround Mode ────────────────────────────────────────────────────────
- id: surround_mode_movie
  label: Surround Mode MOVIE
  kind: action
  command: "MSMOVIE"
  params: []

- id: surround_mode_music
  label: Surround Mode MUSIC
  kind: action
  command: "MSMUSIC"
  params: []

- id: surround_mode_game
  label: Surround Mode GAME
  kind: action
  command: "MSGAME"
  params: []

- id: surround_mode_direct
  label: Surround Mode DIRECT
  kind: action
  command: "MSDIRECT"
  params: []

- id: surround_mode_pure_direct
  label: Surround Mode PURE DIRECT
  kind: action
  command: "MSPURE DIRECT"
  params: []

- id: surround_mode_stereo
  label: Surround Mode STEREO
  kind: action
  command: "MSSTEREO"
  params: []

- id: surround_mode_auto
  label: Surround Mode AUTO
  kind: action
  command: "MSAUTO"
  params: []

- id: surround_mode_dolby_digital
  label: Surround Mode DOLBY DIGITAL
  kind: action
  command: "MSDOLBY DIGITAL"
  params: []

- id: surround_mode_dts_surround
  label: Surround Mode DTS SURROUND
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: surround_mode_auro3d
  label: Surround Mode AURO3D (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO3D"
  params: []

- id: surround_mode_auro2dsurr
  label: Surround Mode AURO2DSURR (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO2DSURR"
  params: []

- id: surround_mode_mch_stereo
  label: Surround Mode MCH STEREO
  kind: action
  command: "MSMCH STEREO"
  params: []

- id: surround_mode_wide_screen
  label: Surround Mode WIDE SCREEN
  kind: action
  command: "MSWIDE SCREEN"
  params: []

- id: surround_mode_super_stadium
  label: Surround Mode SUPER STADIUM
  kind: action
  command: "MSSUPER STADIUM"
  params: []

- id: surround_mode_rock_arena
  label: Surround Mode ROCK ARENA
  kind: action
  command: "MSROCK ARENA"
  params: []

- id: surround_mode_jazz_club
  label: Surround Mode JAZZ CLUB
  kind: action
  command: "MSJAZZ CLUB"
  params: []

- id: surround_mode_classic_concert
  label: Surround Mode CLASSIC CONCERT
  kind: action
  command: "MSCLASSIC CONCERT"
  params: []

- id: surround_mode_mono_movie
  label: Surround Mode MONO MOVIE
  kind: action
  command: "MSMONO MOVIE"
  params: []

- id: surround_mode_matrix
  label: Surround Mode MATRIX
  kind: action
  command: "MSMATRIX"
  params: []

- id: surround_mode_video_game
  label: Surround Mode VIDEO GAME
  kind: action
  command: "MSVIDEO GAME"
  params: []

- id: surround_mode_virtual
  label: Surround Mode VIRTUAL
  kind: action
  command: "MSVIRTUAL"
  params: []

- id: surround_mode_left
  label: Surround Mode LEFT
  kind: action
  command: "MSLEFT"
  params: []

- id: surround_mode_right
  label: Surround Mode RIGHT
  kind: action
  command: "MSRIGHT"
  params: []

- id: surround_mode_query
  label: Query Surround Mode Status
  kind: query
  command: "MS?"
  params: []

- id: surround_mode_quick1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1"
  params: []

- id: surround_mode_quick2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2"
  params: []

- id: surround_mode_quick3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3"
  params: []

- id: surround_mode_quick4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4"
  params: []

- id: surround_mode_quick5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5"
  params: []

- id: surround_mode_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY"
  params: []

- id: surround_mode_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY"
  params: []

- id: surround_mode_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY"
  params: []

- id: surround_mode_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY"
  params: []

- id: surround_mode_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY"
  params: []

- id: surround_mode_quick_query
  label: Query Quick Select Status
  kind: query
  command: "MSQUICK ?"
  params: []

# ── VS: Video Select/Processing ──────────────────────────────────────────────
- id: vs_aspect_normal
  label: Set Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM"
  params: []

- id: vs_aspect_full
  label: Set Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL"
  params: []

- id: vs_aspect_query
  label: Query Aspect Ratio Status
  kind: query
  command: "VSASP ?"
  params: []

- id: vs_monitor_auto
  label: Set HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO"
  params: []

- id: vs_monitor_1
  label: Set HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1"
  params: []

- id: vs_monitor_2
  label: Set HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2"
  params: []

- id: vs_monitor_query
  label: Query HDMI Monitor Status
  kind: query
  command: "VSMONI ?"
  params: []

- id: vs_resolution_480p
  label: Set Resolution 480p/576p
  kind: action
  command: "VSSC48P"
  params: []

- id: vs_resolution_1080i
  label: Set Resolution 1080i
  kind: action
  command: "VSSC10I"
  params: []

- id: vs_resolution_720p
  label: Set Resolution 720p
  kind: action
  command: "VSSC72P"
  params: []

- id: vs_resolution_1080p
  label: Set Resolution 1080p
  kind: action
  command: "VSSC10P"
  params: []

- id: vs_resolution_1080p24
  label: Set Resolution 1080p:24Hz
  kind: action
  command: "VSSC10P24"
  params: []

- id: vs_resolution_4k
  label: Set Resolution 4K
  kind: action
  command: "VSSC4K"
  params: []

- id: vs_resolution_4kf
  label: Set Resolution 4K(60/50)
  kind: action
  command: "VSSC4KF"
  params: []

- id: vs_resolution_auto
  label: Set Resolution AUTO
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vs_resolution_query
  label: Query Resolution Status
  kind: query
  command: "VSSC ?"
  params: []

- id: vs_resolution_hdmi_480p
  label: Set Resolution 480p/576p (HDMI)
  kind: action
  command: "VSSCH48P"
  params: []

- id: vs_resolution_hdmi_1080i
  label: Set Resolution 1080i (HDMI)
  kind: action
  command: "VSSCH10I"
  params: []

- id: vs_resolution_hdmi_720p
  label: Set Resolution 720p (HDMI)
  kind: action
  command: "VSSCH72P"
  params: []

- id: vs_resolution_hdmi_1080p
  label: Set Resolution 1080p (HDMI)
  kind: action
  command: "VSSCH10P"
  params: []

- id: vs_resolution_hdmi_1080p24
  label: Set Resolution 1080p:24Hz (HDMI)
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vs_resolution_hdmi_4k
  label: Set Resolution 4K (HDMI)
  kind: action
  command: "VSSCH4K"
  params: []

- id: vs_resolution_hdmi_4kf
  label: Set Resolution 4K(60/50) (HDMI)
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_resolution_hdmi_auto
  label: Set Resolution AUTO (HDMI)
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_resolution_hdmi_query
  label: Query Resolution Status (HDMI)
  kind: query
  command: "VSSCH ?"
  params: []

- id: vs_audio_amp
  label: Set HDMI Audio Output to AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []

- id: vs_audio_tv
  label: Set HDMI Audio Output to TV
  kind: action
  command: "VSAUDIO TV"
  params: []

- id: vs_audio_query
  label: Query HDMI Audio Output Status
  kind: query
  command: "VSAUDIO ?"
  params: []

- id: vs_vpm_auto
  label: Set Video Processing Mode AUTO
  kind: action
  command: "VSVPMAUTO"
  params: []

- id: vs_vpm_game
  label: Set Video Processing Mode GAME
  kind: action
  command: "VSVPMGAME"
  params: []

- id: vs_vpm_movie
  label: Set Video Processing Mode MOVIE
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

# ── PS: Parameter Setting ────────────────────────────────────────────────────
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

- id: ps_bass_up
  label: Bass Up
  kind: action
  command: "PSBAS UP"
  params: []

- id: ps_bass_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN"
  params: []

- id: ps_bass_set
  label: Set Bass Level
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; AVR range -6 to +6 (44 to 56)"

- id: ps_bass_query
  label: Query Bass Status
  kind: query
  command: "PSBAS ?"
  params: []

- id: ps_treble_up
  label: Treble Up
  kind: action
  command: "PSTRE UP"
  params: []

- id: ps_treble_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN"
  params: []

- id: ps_treble_set
  label: Set Treble Level
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; AVR range -6 to +6 (44 to 56)"

- id: ps_treble_query
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
      description: "38 to 62 by ASCII, 50=0dB"

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
      description: "00,38 to 62 by ASCII, 50=0dB"

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
      description: "00,38 to 62 by ASCII, 50=0dB"

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
  label: Set PL Mode MUSIC
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: Set PL Mode CINEMA
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: Set PL Mode GAME
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: Set PL Mode PRO LOGIC
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
  label: Front Height Output On (PLIIx Height)
  kind: action
  command: "PSFH:ON"
  params: []

- id: ps_fh_off
  label: Front Height Output Off (PLIIx Height)
  kind: action
  command: "PSFH:OFF"
  params: []

- id: ps_fh_query
  label: Query Front Height Output Status
  kind: query
  command: "PSFH: ?"
  params: []

- id: ps_sp_fw
  label: Speaker Output Set Front Wide
  kind: action
  command: "PSSP:FW"
  params: []

- id: ps_sp_fh
  label: Speaker Output Set Front Height
  kind: action
  command: "PSSP:FH"
  params: []

- id: ps_sp_sb
  label: Speaker Output Set Surround Back
  kind: action
  command: "PSSP:SB"
  params: []

- id: ps_sp_hw
  label: Speaker Output Set Height and Wide
  kind: action
  command: "PSSP:HW"
  params: []

- id: ps_sp_bh
  label: Speaker Output Set Surround Back and Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output Set Surround Back and Front Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: ps_sp_fl
  label: Speaker Output Set Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: ps_sp_hf
  label: Speaker Output Set Height and Floor
  kind: action
  command: "PSSP:HF"
  params: []

- id: ps_sp_fr
  label: Speaker Output Set Front
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
  label: PL2z Height Gain Hi
  kind: action
  command: "PSPHG HI"
  params: []

- id: ps_phg_query
  label: Query PL2z Height Gain Status
  kind: query
  command: "PSPHG ?"
  params: []

- id: ps_multeq_audyssey
  label: MultEQ Mode AUDYSSEY (Reference)
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

- id: ps_dynvol_heavy
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV"
  params: []

- id: ps_dynvol_medium
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED"
  params: []

- id: ps_dynvol_light
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
      description: "00 to 99 by ASCII; AVR range 1 to 7 (01 to 07)"

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
      description: "00 to 99 by ASCII, 50=0dB; AVR range -10 to +10 (40 to 60)"

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
      description: "00 to 99 by ASCII, 50=0dB; AVR range -10 to +10 (40 to 60)"

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
  label: Dynamic Compression Hi
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
      description: "00 to 99 by ASCII; AVR range 0 to 16"

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
  command: "PSLFE UP"
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
      description: "00 to 99 by ASCII, 00=0dB, 10=-10dB; AVR range 0 to -10"

- id: ps_lfe_query
  label: Query LFE Level Status
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level 0 (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []

- id: ps_lfl_05
  label: LFE Level 5 (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05"
  params: []

- id: ps_lfl_10
  label: LFE Level 10 (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10"
  params: []

- id: ps_lfl_15
  label: LFE Level 15 (EXT.IN/7.1CH IN)
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
      description: "00 to 99 by ASCII; AVR range 1 to 15"

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
      description: "000 to 999 by ASCII, 000=0ms, 300=300ms; AVR range 0 to 300; 3ms/step 0-60ms, 10ms/step over 60ms"

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
      description: "00 to 99 by ASCII; AVR range 0 to 6"

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
      description: "00 to 99 by ASCII; AVR range 0 to 7"

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
      description: "00 to 99 by ASCII; AVR range 0.0 to 1.0"

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
      description: "00 to 99 by ASCII; AVR range 0.0 to 1.0"

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
  label: Query Subwoofer On/Off Status
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
      description: "000 to 999 by ASCII, 000=0ms, 200=200ms; AVR range 0 to 200"

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
  label: Audio Restorer Hi (MODE1)
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
  label: Query Auro-Matic 3D Preset Status
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
  label: Set Auro-Matic 3D Strength (Auro-3D)
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII; AVR range 1 to 16"

- id: ps_aurost_query
  label: Query Auro-Matic 3D Strength Status
  kind: query
  command: "PSAUROST ?"
  params: []

# ── PV: Picture Mode ─────────────────────────────────────────────────────────
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

- id: pv_contrast_up
  label: Contrast Up
  kind: action
  command: "PVCN UP"
  params: []

- id: pv_contrast_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN"
  params: []

- id: pv_contrast_set
  label: Set Contrast
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: string
      description: "000 to 100 by ASCII, 050=0; AVR range -50 to +50"

- id: pv_contrast_query
  label: Query Contrast Status
  kind: query
  command: "PVCN ?"
  params: []

- id: pv_brightness_up
  label: Brightness Up
  kind: action
  command: "PVBR UP"
  params: []

- id: pv_brightness_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN"
  params: []

- id: pv_brightness_set
  label: Set Brightness
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: string
      description: "000 to 100 by ASCII, 050=0; AVR range -50 to +50"

- id: pv_brightness_query
  label: Query Brightness Status
  kind: query
  command: "PVBR ?"
  params: []

- id: pv_saturation_up
  label: Saturation Up
  kind: action
  command: "PVST UP"
  params: []

- id: pv_saturation_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN"
  params: []

- id: pv_saturation_set
  label: Set Saturation
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: string
      description: "000 to 100 by ASCII, 050=0; AVR range -50 to +50"

- id: pv_saturation_query
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
  command: "PVHUE{level}"
  params:
    - name: level
      type: string
      description: "44 to 56 by ASCII, 50=0; AVR range -6 to +6"

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
  label: DNR Hi
  kind: action
  command: "PVDNR HI"
  params: []

- id: pv_dnr_query
  label: Query DNR Status
  kind: query
  command: "PVDNR ?"
  params: []

- id: pv_enhancer_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP"
  params: []

- id: pv_enhancer_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN"
  params: []

- id: pv_enhancer_set
  label: Set Enhancer Level
  kind: action
  command: "PVENH{level}"
  params:
    - name: level
      type: string
      description: "00 to 12 by ASCII; AVR range 0 to 12"

- id: pv_enhancer_query
  label: Query Enhancer Status
  kind: query
  command: "PVENH ?"
  params: []

# ── Z2: Zone 2 Control ───────────────────────────────────────────────────────
- id: z2_source
  label: Zone 2 Source (same as Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone 2 Input PHONO
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone 2 Input CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone 2 Input TUNER
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone 2 Input DVD
  kind: action
  command: "Z2DVD"
  params: []

- id: z2_bd
  label: Zone 2 Input BD
  kind: action
  command: "Z2BD"
  params: []

- id: z2_tv
  label: Zone 2 Input TV
  kind: action
  command: "Z2TV"
  params: []

- id: z2_sat_cbl
  label: Zone 2 Input SAT/CBL
  kind: action
  command: "Z2SAT/CBL"
  params: []

- id: z2_mplay
  label: Zone 2 Input MPLAY (North America only)
  kind: action
  command: "Z2MPLAY"
  params: []

- id: z2_game
  label: Zone 2 Input GAME
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone 2 Input HD RADIO
  kind: action
  command: "Z2HDRADIO"
  params: []

- id: z2_net
  label: Zone 2 Input NET (Online Music)
  kind: action
  command: "Z2NET"
  params: []

- id: z2_pandora
  label: Zone 2 Input PANDORA (North America only)
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone 2 Input SIRIUSXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone 2 Input SPOTIFY (North America and Europe only)
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone 2 Input LASTFM
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone 2 Input FLICKR
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone 2 Input IRADIO
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone 2 Input SERVER
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone 2 Input FAVORITES
  kind: action
  command: "Z2FAVORITES"
  params: []

- id: z2_aux1
  label: Zone 2 Input AUX1
  kind: action
  command: "Z2AUX1"
  params: []

- id: z2_aux2
  label: Zone 2 Input AUX2
  kind: action
  command: "Z2AUX2"
  params: []

- id: z2_aux3
  label: Zone 2 Input AUX3
  kind: action
  command: "Z2AUX3"
  params: []

- id: z2_aux4
  label: Zone 2 Input AUX4
  kind: action
  command: "Z2AUX4"
  params: []

- id: z2_aux5
  label: Zone 2 Input AUX5
  kind: action
  command: "Z2AUX5"
  params: []

- id: z2_aux6
  label: Zone 2 Input AUX6
  kind: action
  command: "Z2AUX6"
  params: []

- id: z2_aux7
  label: Zone 2 Input AUX7
  kind: action
  command: "Z2AUX7"
  params: []

- id: z2_bt
  label: Zone 2 Input Bluetooth
  kind: action
  command: "Z2BT"
  params: []

- id: z2_usb_ipod
  label: Zone 2 Input USB/IPOD
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone 2 Input USB
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone 2 Input iPod DIRECT
  kind: action
  command: "Z2IPD"
  params: []

- id: z2_irp
  label: Zone 2 Input iRadio Recent Play
  kind: action
  command: "Z2IRP"
  params: []

- id: z2_fvp
  label: Zone 2 Input Favorites Play
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
  label: Query Zone 2 Quick Select Status
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

- id: z2_volume_up
  label: Zone 2 Volume Up
  kind: action
  command: "Z2UP"
  params: []

- id: z2_volume_down
  label: Zone 2 Volume Down
  kind: action
  command: "Z2DOWN"
  params: []

- id: z2_volume_set
  label: Set Zone 2 Volume
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00 to 98 by ASCII, 80=0dB, 00=---(MIN)"

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
  label: Query Zone 2 Status
  kind: query
  command: "Z2?"
  params: []

# ── Z2MU: Zone 2 Mute ────────────────────────────────────────────────────────
- id: z2_mute_on
  label: Zone 2 Mute On
  kind: action
  command: "Z2MUON"
  params: []

- id: z2_mute_off
  label: Zone 2 Mute Off
  kind: action
  command: "Z2MUOFF"
  params: []

- id: z2_mute_query
  label: Query Zone 2 Mute Status
  kind: query
  command: "Z2MU?"
  params: []

# ── Z2CS: Zone 2 Channel Setting ─────────────────────────────────────────────
- id: z2_channel_stereo
  label: Zone 2 Channel Stereo
  kind: action
  command: "Z2CSST"
  params: []

- id: z2_channel_mono
  label: Zone 2 Channel Mono
  kind: action
  command: "Z2CSMONO"
  params: []

- id: z2_channel_query
  label: Query Zone 2 Channel Status
  kind: query
  command: "Z2CS?"
  params: []

# ── Z2CV: Zone 2 Channel Volume ──────────────────────────────────────────────
- id: z2_cv_fl_up
  label: Zone 2 Channel Volume Front Left Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2_cv_fl_down
  label: Zone 2 Channel Volume Front Left Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2_cv_fl_set
  label: Set Zone 2 Channel Volume Front Left
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: z2_cv_fr_up
  label: Zone 2 Channel Volume Front Right Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2_cv_fr_down
  label: Zone 2 Channel Volume Front Right Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2_cv_fr_set
  label: Set Zone 2 Channel Volume Front Right
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: z2_cv_query
  label: Query Zone 2 Channel Volume Status
  kind: query
  command: "Z2CV?"
  params: []

# ── Z2HPF: Zone 2 HPF ────────────────────────────────────────────────────────
- id: z2_hpf_on
  label: Zone 2 HPF On
  kind: action
  command: "Z2HPFON"
  params: []

- id: z2_hpf_off
  label: Zone 2 HPF Off
  kind: action
  command: "Z2HPFOFF"
  params: []

- id: z2_hpf_query
  label: Query Zone 2 HPF Status
  kind: query
  command: "Z2HPF?"
  params: []

# ── Z2PS: Zone 2 Parameter Setting ───────────────────────────────────────────
- id: z2_bass_up
  label: Zone 2 Bass Up
  kind: action
  command: "Z2PSBAS UP"
  params: []

- id: z2_bass_down
  label: Zone 2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN"
  params: []

- id: z2_bass_set
  label: Set Zone 2 Bass
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; range -10 to +10 (40-60), or -14 to +14 /2dBstep (36-64) on X4100"

- id: z2_bass_query
  label: Query Zone 2 Bass Status
  kind: query
  command: "Z2PSBAS ?"
  params: []

- id: z2_treble_up
  label: Zone 2 Treble Up
  kind: action
  command: "Z2PSTRE UP"
  params: []

- id: z2_treble_down
  label: Zone 2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN"
  params: []

- id: z2_treble_set
  label: Set Zone 2 Treble
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; range -10 to +10 (40-60), or -14 to +14 /2dBstep (36-64) on X4100"

- id: z2_treble_query
  label: Query Zone 2 Treble Status
  kind: query
  command: "Z2PSTRE ?"
  params: []

# ── Z2HDA: Zone 2 HDMI Audio ─────────────────────────────────────────────────
- id: z2_hda_thr
  label: Zone 2 HDMI Out Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2_hda_pcm
  label: Zone 2 HDMI Out PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2_hda_query
  label: Query Zone 2 HDMI Audio Status
  kind: query
  command: "Z2HDA?"
  params: []

# ── Z2SLP: Zone 2 Sleep Timer ────────────────────────────────────────────────
- id: z2_sleep_off
  label: Zone 2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF"
  params: []

- id: z2_sleep_set
  label: Set Zone 2 Sleep Timer
  kind: action
  command: "Z2SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min"

- id: z2_sleep_query
  label: Query Zone 2 Sleep Timer Status
  kind: query
  command: "Z2SLP?"
  params: []

# ── Z2STBY: Zone 2 Auto Standby ──────────────────────────────────────────────
- id: z2_stby_2h
  label: Zone 2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2_stby_4h
  label: Zone 2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2_stby_8h
  label: Zone 2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H"
  params: []

- id: z2_stby_off
  label: Zone 2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF"
  params: []

- id: z2_stby_query
  label: Query Zone 2 Auto Standby Status
  kind: query
  command: "Z2STBY?"
  params: []

# ── Z3: Zone 3 Control ───────────────────────────────────────────────────────
- id: z3_source
  label: Zone 3 Source (same as Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone 3 Input PHONO
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone 3 Input CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone 3 Input TUNER
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone 3 Input DVD
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone 3 Input BD
  kind: action
  command: "Z3BD"
  params: []

- id: z3_tv
  label: Zone 3 Input TV
  kind: action
  command: "Z3TV"
  params: []

- id: z3_sat_cbl
  label: Zone 3 Input SAT/CBL
  kind: action
  command: "Z3SAT/CBL"
  params: []

- id: z3_mplay
  label: Zone 3 Input MPLAY
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone 3 Input GAME
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone 3 Input HD RADIO (North America only)
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone 3 Input NET (Online Music)
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone 3 Input PANDORA (North America only)
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone 3 Input SIRIUSXM (North America only)
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone 3 Input SPOTIFY (North America and Europe only)
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone 3 Input LASTFM
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone 3 Input FLICKR
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone 3 Input IRADIO
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone 3 Input SERVER
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone 3 Input FAVORITES
  kind: action
  command: "Z3FAVORITES"
  params: []

- id: z3_aux1
  label: Zone 3 Input AUX1
  kind: action
  command: "Z3AUX1"
  params: []

- id: z3_aux2
  label: Zone 3 Input AUX2
  kind: action
  command: "Z3AUX2"
  params: []

- id: z3_aux3
  label: Zone 3 Input AUX3
  kind: action
  command: "Z3AUX3"
  params: []

- id: z3_aux4
  label: Zone 3 Input AUX4
  kind: action
  command: "Z3AUX4"
  params: []

- id: z3_aux5
  label: Zone 3 Input AUX5
  kind: action
  command: "Z3AUX5"
  params: []

- id: z3_aux6
  label: Zone 3 Input AUX6
  kind: action
  command: "Z3AUX6"
  params: []

- id: z3_aux7
  label: Zone 3 Input AUX7
  kind: action
  command: "Z3AUX7"
  params: []

- id: z3_bt
  label: Zone 3 Input Bluetooth
  kind: action
  command: "Z3BT"
  params: []

- id: z3_usb_ipod
  label: Zone 3 Input USB/IPOD
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone 3 Input USB
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone 3 Input iPod DIRECT
  kind: action
  command: "Z3IPD"
  params: []

- id: z3_irp
  label: Zone 3 Input iRadio Recent Play
  kind: action
  command: "Z3IRP"
  params: []

- id: z3_fvp
  label: Zone 3 Input Favorites Play
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
  label: Query Zone 3 Quick Select Status
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

- id: z3_volume_up
  label: Zone 3 Volume Up
  kind: action
  command: "Z3UP"
  params: []

- id: z3_volume_down
  label: Zone 3 Volume Down
  kind: action
  command: "Z3DOWN"
  params: []

- id: z3_volume_set
  label: Set Zone 3 Volume
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00 to 98 by ASCII, 80=0dB, 00=---(MIN)"

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
  label: Query Zone 3 Status
  kind: query
  command: "Z3?"
  params: []

# ── Z3MU: Zone 3 Mute ────────────────────────────────────────────────────────
- id: z3_mute_on
  label: Zone 3 Mute On
  kind: action
  command: "Z3MUON"
  params: []

- id: z3_mute_off
  label: Zone 3 Mute Off
  kind: action
  command: "Z3MUOFF"
  params: []

- id: z3_mute_query
  label: Query Zone 3 Mute Status
  kind: query
  command: "Z3MU?"
  params: []

# ── Z3CS: Zone 3 Channel Setting ─────────────────────────────────────────────
- id: z3_channel_stereo
  label: Zone 3 Channel Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3_channel_mono
  label: Zone 3 Channel Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3_channel_query
  label: Query Zone 3 Channel Status
  kind: query
  command: "Z3CS?"
  params: []

# ── Z3CV: Zone 3 Channel Volume ──────────────────────────────────────────────
- id: z3_cv_fl_up
  label: Zone 3 Channel Volume Front Left Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3_cv_fl_down
  label: Zone 3 Channel Volume Front Left Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3_cv_fl_set
  label: Set Zone 3 Channel Volume Front Left
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: z3_cv_fr_up
  label: Zone 3 Channel Volume Front Right Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3_cv_fr_down
  label: Zone 3 Channel Volume Front Right Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3_cv_fr_set
  label: Set Zone 3 Channel Volume Front Right
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: string
      description: "38 to 62 by ASCII, 50=0dB"

- id: z3_cv_query
  label: Query Zone 3 Channel Volume Status
  kind: query
  command: "Z3CV?"
  params: []

# ── Z3HPF: Zone 3 HPF ────────────────────────────────────────────────────────
- id: z3_hpf_on
  label: Zone 3 HPF On
  kind: action
  command: "Z3HPFON"
  params: []

- id: z3_hpf_off
  label: Zone 3 HPF Off
  kind: action
  command: "Z3HPFOFF"
  params: []

- id: z3_hpf_query
  label: Query Zone 3 HPF Status
  kind: query
  command: "Z3HPF?"
  params: []

# ── Z3PS: Zone 3 Parameter Setting ───────────────────────────────────────────
- id: z3_bass_up
  label: Zone 3 Bass Up
  kind: action
  command: "Z3PSBAS UP"
  params: []

- id: z3_bass_down
  label: Zone 3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN"
  params: []

- id: z3_bass_set
  label: Set Zone 3 Bass
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; range -10 to +10 (40-60)"

- id: z3_bass_query
  label: Query Zone 3 Bass Status
  kind: query
  command: "Z3PSBAS ?"
  params: []

- id: z3_treble_up
  label: Zone 3 Treble Up
  kind: action
  command: "Z3PSTRE UP"
  params: []

- id: z3_treble_down
  label: Zone 3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN"
  params: []

- id: z3_treble_set
  label: Set Zone 3 Treble
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII, 50=0dB; range -10 to +10 (40-60)"

- id: z3_treble_query
  label: Query Zone 3 Treble Status
  kind: query
  command: "Z3PSTRE ?"
  params: []

# ── Z3SLP: Zone 3 Sleep Timer ────────────────────────────────────────────────
- id: z3_sleep_off
  label: Zone 3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF"
  params: []

- id: z3_sleep_set
  label: Set Zone 3 Sleep Timer
  kind: action
  command: "Z3SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: "001 to 120 by ASCII, 010=10min"

- id: z3_sleep_query
  label: Query Zone 3 Sleep Timer Status
  kind: query
  command: "Z3SLP?"
  params: []

# ── Z3STBY: Zone 3 Auto Standby ──────────────────────────────────────────────
- id: z3_stby_2h
  label: Zone 3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3_stby_4h
  label: Zone 3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3_stby_8h
  label: Zone 3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H"
  params: []

- id: z3_stby_off
  label: Zone 3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF"
  params: []

- id: z3_stby_query
  label: Query Zone 3 Auto Standby Status
  kind: query
  command: "Z3STBY?"
  params: []

# ── TF: Tuner Frequency ──────────────────────────────────────────────────────
- id: tuner_freq_up
  label: Tuner Frequency Up (Analog)
  kind: action
  command: "TFANUP"
  params: []

- id: tuner_freq_down
  label: Tuner Frequency Down (Analog)
  kind: action
  command: "TFANDOWN"
  params: []

- id: tuner_freq_set
  label: Set Tuner Frequency (Analog)
  kind: action
  command: "TFAN{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits: e.g. TFAN105000 = 1050.00kHz AM (>050000 is AM, <050000 is FM)"

- id: tuner_freq_query
  label: Query Tuner Frequency (Analog)
  kind: query
  command: "TFAN?"
  params: []

- id: tuner_rds_name_query
  label: Query RDS Station Name (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

# ── TP: Tuner Preset ─────────────────────────────────────────────────────────
- id: tuner_preset_up
  label: Tuner Preset Channel Up (Analog)
  kind: action
  command: "TPANUP"
  params: []

- id: tuner_preset_down
  label: Tuner Preset Channel Down (Analog)
  kind: action
  command: "TPANDOWN"
  params: []

- id: tuner_preset_set
  label: Set Tuner Preset Channel (Analog)
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01-56 (e.g. TPAN01 = CH01)"

- id: tuner_preset_query
  label: Query Tuner Preset Status (Analog)
  kind: query
  command: "TPAN?"
  params: []

- id: tuner_preset_memory
  label: Tuner Preset Memory (Analog)
  kind: action
  command: "TPANMEM"
  params: []

- id: tuner_preset_memory_set
  label: Set Tuner Preset Memory to Number (Analog)
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56"

# ── TM: Tuner Band/Mode ───────────────────────────────────────────────────────
- id: tuner_band_am
  label: Tuner Band AM (Analog)
  kind: action
  command: "TMANAM"
  params: []

- id: tuner_band_fm
  label: Tuner Band FM (Analog)
  kind: action
  command: "TMANFM"
  params: []

- id: tuner_band_query
  label: Query Tuner Band/Mode Status (Analog)
  kind: query
  command: "TMAN?"
  params: []

- id: tuner_mode_auto
  label: Tuner Tuning Mode AUTO (Analog)
  kind: action
  command: "TMANAUTO"
  params: []

- id: tuner_mode_manual
  label: Tuner Tuning Mode MANUAL (Analog)
  kind: action
  command: "TMANMANUAL"
  params: []

# ── HD Radio Control ─────────────────────────────────────────────────────────
- id: hd_freq_up
  label: HD Radio Channel Up
  kind: action
  command: "TFHDUP"
  params: []

- id: hd_freq_down
  label: HD Radio Channel Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: hd_freq_set
  label: Set HD Radio Frequency
  kind: action
  command: "TFHD{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits: e.g. TFHD105000 = 1050.00kHz AM"

- id: hd_multicast_set
  label: Set HD Multicast Channel
  kind: action
  command: "TFHDMC{ch}"
  params:
    - name: ch
      type: string
      description: "1 digit: 1-8 for multicast, 0 for analog"

- id: hd_freq_multicast_set
  label: Set HD Frequency and Multicast Channel
  kind: action
  command: "TFHD{freq}MC{ch}"
  params:
    - name: freq
      type: string
      description: "6 digit frequency"
    - name: ch
      type: string
      description: "1 digit multicast channel"

- id: hd_freq_query
  label: Query HD Radio Frequency Status
  kind: query
  command: "TFHD?"
  params: []

- id: hd_preset_up
  label: HD Radio Preset Channel Up
  kind: action
  command: "TPHDUP"
  params: []

- id: hd_preset_down
  label: HD Radio Preset Channel Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: hd_preset_set
  label: Set HD Radio Preset Channel
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01-56"

- id: hd_preset_query
  label: Query HD Radio Preset Status
  kind: query
  command: "TPHD?"
  params: []

- id: hd_preset_memory
  label: HD Radio Preset Memory
  kind: action
  command: "TPHDMEM"
  params: []

- id: hd_preset_memory_set
  label: Set HD Radio Preset Memory to Number
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01-56"

- id: hd_band_am
  label: HD Radio Band AM
  kind: action
  command: "TMHDAM"
  params: []

- id: hd_band_fm
  label: HD Radio Band FM
  kind: action
  command: "TMHDFM"
  params: []

- id: hd_mode_auto_hd
  label: HD Radio Tuning Mode AUTO-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: hd_mode_auto
  label: HD Radio Tuning Mode AUTO
  kind: action
  command: "TMHDAUTO"
  params: []

- id: hd_mode_manual
  label: HD Radio Tuning Mode MANUAL
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: hd_mode_analog_auto
  label: HD Radio Tuning Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: hd_mode_analog_manual
  label: HD Radio Tuning Mode ANALOG MANUAL
  kind: action
  command: "TMHDANAMANU"
  params: []

- id: hd_mode_query
  label: Query HD Radio Band/Mode Status
  kind: query
  command: "TMHD?"
  params: []

- id: hd_status_query
  label: Query HD Radio Full Status
  kind: query
  command: "HD?"
  params: []

# ── NS: Online Music / USB / iPod / Bluetooth Control ───────────────────────
- id: ns_cursor_up
  label: Online Music Cursor Up
  kind: action
  command: "NS90"
  params: []

- id: ns_cursor_down
  label: Online Music Cursor Down
  kind: action
  command: "NS91"
  params: []

- id: ns_cursor_left
  label: Online Music Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: Online Music Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: Online Music Enter (Play/Pause)
  kind: action
  command: "NS94"
  params: []

- id: ns_play
  label: Online Music Play
  kind: action
  command: "NS9A"
  params: []

- id: ns_pause
  label: Online Music Pause
  kind: action
  command: "NS9B"
  params: []

- id: ns_stop
  label: Online Music Stop
  kind: action
  command: "NS9C"
  params: []

- id: ns_skip_plus
  label: Online Music Skip Plus
  kind: action
  command: "NS9D"
  params: []

- id: ns_skip_minus
  label: Online Music Skip Minus
  kind: action
  command: "NS9E"
  params: []

- id: ns_manual_search_plus
  label: Online Music Manual Search Plus (USB/iPod/Media Server/Bluetooth)
  kind: action
  command: "NS9F"
  params: []

- id: ns_manual_search_minus
  label: Online Music Manual Search Minus (USB/iPod/Media Server/Bluetooth)
  kind: action
  command: "NS9G"
  params: []

- id: ns_repeat_one
  label: Online Music Repeat One (Media Server/USB/iPod Direct/Bluetooth)
  kind: action
  command: "NS9H"
  params: []

- id: ns_repeat_all
  label: Online Music Repeat All (Media Server/USB/iPod Direct/Bluetooth)
  kind: action
  command: "NS9I"
  params: []

- id: ns_repeat_off
  label: Online Music Repeat Off (Media Server/USB/iPod Direct/Bluetooth)
  kind: action
  command: "NS9J"
  params: []

- id: ns_random_on
  label: Online Music Random On / Shuffle Songs (Media Server/USB/Bluetooth/iPod)
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: Online Music Random Off / Shuffle Off (Media Server/USB/Bluetooth/iPod)
  kind: action
  command: "NS9M"
  params: []

- id: ns_ipod_mode_toggle
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: Online Music Page Next
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_previous
  label: Online Music Page Previous
  kind: action
  command: "NS9Y"
  params: []

- id: ns_manual_search_stop
  label: Online Music Manual Search Stop (USB/iPod/Media Server/Bluetooth)
  kind: action
  command: "NS9Z"
  params: []

- id: ns_repeat_toggle
  label: Online Music Repeat Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/Bluetooth)
  kind: action
  command: "NSRPT"
  params: []

- id: ns_random_toggle
  label: Online Music Random Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/Bluetooth)
  kind: action
  command: "NSRND"
  params: []

- id: ns_preset_call
  label: Online Music Preset Call (except Bluetooth/USB/iPod)
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_memory
  label: Online Music Preset Memory (except Bluetooth/USB/iPod)
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_name_query
  label: Query Net Audio Preset Names (UTF-8, except Bluetooth/USB/iPod)
  kind: query
  command: "NSH"
  params: []

- id: ns_favorites_memory
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_display_ascii
  label: Request Onscreen Display Information (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: ns_display_utf8
  label: Request Onscreen Display Information (UTF-8)
  kind: query
  command: "NSE"
  params: []

# ── MN: System Control ────────────────────────────────────────────────────────
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

- id: mn_channel_level
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL"
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

- id: mn_menu_query
  label: Query Setup Menu Status
  kind: query
  command: "MNMEN?"
  params: []

- id: mn_instaprevue_on
  label: InstaPrevue On
  kind: action
  command: "MNPRV ON"
  params: []

- id: mn_instaprevue_off
  label: InstaPrevue Off
  kind: action
  command: "MNPRV OFF"
  params: []

- id: mn_instaprevue_query
  label: Query InstaPrevue Status
  kind: query
  command: "MNPRV?"
  params: []

- id: mn_all_zone_stereo_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON"
  params: []

- id: mn_all_zone_stereo_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF"
  params: []

- id: mn_all_zone_stereo_query
  label: Query All Zone Stereo Status
  kind: query
  command: "MNZST?"
  params: []

# ── SY: System Lock ────────────────────────────────────────────────────────────
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
  label: Panel Button Lock On (except Master Volume)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel Button and Master Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Button Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# ── TR: Trigger ────────────────────────────────────────────────────────────────
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

- id: trigger_query
  label: Query Trigger Status
  kind: query
  command: "TR?"
  params: []

# ── UG: Upgrade ────────────────────────────────────────────────────────────────
- id: ug_idn
  label: Display Upgrade ID Number on FL Display
  kind: action
  command: "UGIDN"
  params: []

# ── RM: Remote Maintenance ─────────────────────────────────────────────────────
- id: rm_start
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
  label: Query Remote Maintenance Mode Status
  kind: query
  command: "RM ?"
  params: []

# ── DIM: Display Dimmer ────────────────────────────────────────────────────────
- id: dim_bright
  label: Dimmer Bright
  kind: action
  command: "DIM BRI"
  params: []

- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM"
  params: []

- id: dim_dark
  label: Dimmer Dark
  kind: action
  command: "DIM DAR"
  params: []

- id: dim_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF"
  params: []

- id: dim_select
  label: Dimmer Select Toggle (Bright > Dim > Dark > Off)
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
  values: [PWON, PWSTANDBY]
  description: "Response to PW? or EVENT on power change"

- id: master_volume_state
  type: string
  description: "MV followed by 2-digit level (e.g. MV80) or 3-digit at 0.5dB step (e.g. MV805)"

- id: mute_state
  type: enum
  values: [MUON, MUOFF]
  description: "Response to MU? or EVENT on mute change"

- id: input_state
  type: string
  description: "SI followed by source name (e.g. SICD, SINET)"

- id: main_zone_state
  type: enum
  values: [ZMON, ZMOFF]
  description: "Response to ZM?"

- id: channel_volume_state
  type: string
  description: "CV channel states returned in response to CV?; only speakers in config reply. Final line: CVEND"

- id: surround_mode_state
  type: string
  description: "MS followed by mode name (e.g. MSSTEREO)"

- id: sleep_timer_state
  type: string
  description: "SLP followed by minutes or SLPOFF"

- id: auto_standby_state
  type: string
  description: "STBY followed by setting (15M/30M/60M/OFF)"

- id: eco_state
  type: string
  description: "ECO followed by ON/AUTO/OFF"

- id: zone2_state
  type: string
  description: "Z2 source/volume state; returns as Z2 or SR status depending on mode"

- id: zone3_state
  type: string
  description: "Z3 source/volume state"

- id: trigger_state
  type: string
  description: "TR1 ON/OFF and TR2 ON/OFF returned in response to TR?"

- id: dimmer_state
  type: string
  description: "DIM BRI/DIM/DAR/OFF"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
- id: state_change_event
  description: "EVENT messages are sent unsolicited within 5 seconds of state change triggered by direct operation. EVENT format is identical to COMMAND format. Major categories: power (PWON/PWSTANDBY), volume (MV**), mute (MUON/MUOFF), input (SI***), channel volume (CV***), surround mode (MS***), zone states (Z2*, Z3*)."
  note: "EVENT is triggered on state changes from front panel or other sources. RESPONSE is triggered by request commands (COMMAND+?+CR)."
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_delay
    description: "Wait 1 second before transmitting next command after PWON (power on)"
    reference: "Section J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
```

## Notes

**Command Format:** `COMMAND + PARAMETER + CR (0x0D)` where COMMAND is 2 ASCII characters, PARAMETER is up to 25 ASCII characters. Maximum communication data length is 135 bytes.

**Timing Requirements:**
- Commands must be sent at 50ms or greater intervals
- RESPONSE to query commands within 200ms
- EVENT sent within 5 seconds of state change

**Character Set:** ASCII 0x20-0x7F (printable characters and space 0x20); CR 0x0D used only as terminator.

**Volume Encoding (0.5dB steps):** When using 0.5dB step, PARAMETER uses 3 ASCII characters. `MV98`=+18.0dB, `MV81`=+1.0dB, `MV805`=+0.5dB, `MV80`=0dB, `MV795`=-0.5dB, `MV79`=-1.0dB, `MV005`=-79.5dB, `MV00`=minimum (---dB).

**RS-232C Connector:** DB-9pin female DCE type. Pin 1=GND, Pin 2=TxD, Pin 3=RxD, Pin 5=Common(GND), Pins 4/6/7/8/9=NC.

**Ethernet:** RJ-45 (10BASE-T/100BASE-TX), TCP port 23 (telnet), half duplex.

**No Authentication:** No login, password, or authentication procedure described in source.

**Channel Volume Response:** `CV?` returns only the speakers present in the speaker configuration; final line is `CVEND`.

**Zone2 vs REC Mode:** When Zone 2 mode is selected, Z2 status returns; when REC mode is selected, SR status returns.

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:40.220Z
last_checked_at: 2026-06-02T17:23:25.423Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:25.423Z
matched_actions: 767
action_count: 767
confidence: medium
summary: "All 767 spec actions match literal commands in the source; transport (port 23, baud 9600) confirmed; source command catalogue fully covered. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is \"Control Protocol Ver.06\" and lists commands for full AV receiver models (X1100, S700); commands beyond the NA7004 network audio player feature set (multi-zone Z2/Z3, video processing VS, extensive surround MS list) are included as documented in the source."
- "populate from source, or remove section if not applicable"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
