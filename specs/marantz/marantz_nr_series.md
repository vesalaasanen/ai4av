---
spec_id: admin/marantz-nr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz NR Series AVR Control Spec"
manufacturer: Marantz
model_family: "NR Series"
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - "NR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:42.330Z
last_checked_at: 2026-06-02T17:23:26.235Z
generated_at: 2026-06-02T17:23:26.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "MSALL ZONE STEREO"
  - MS7.1IN
  - "MSPURE DIRECT EXT"
  - MSQUICK0
  - Z2QUICK0
  - Z3QUICK0
  - TPANOFF
  - TPHDOFF
  - "MSDSD DIRECT"
  - "MSDSD PURE DIRECT"
  - "source documents the protocol family used across multiple Marantz NR-series AVRs; specific per-model support (e.g. ZONE3, Auro-3D Upgrade, HD Radio) is conditional on the exact model."
  - "source states volume levels use 0.5 dB step which uses 3 ASCII chars (e.g. MV805=+0.5dB) but most examples show 2-char level; behaviour for any given model should be confirmed before use."
  - "populate from source, or remove section if not applicable"
  - "no multi-step sequences explicitly described in source"
  - "firmware version compatibility not stated in source"
  - "exact per-model support matrix (which NR model supports which commands) is not enumerated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:26.235Z
  matched_actions: 853
  action_count: 853
  confidence: medium
  summary: "All 853 spec actions found verbatim in source command table; transport (9600 8N1 DB-9 DCE, TCP port 23) confirmed; extra_in_source entries are response/event-only tokens not sendable commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Marantz NR Series AVR Control Spec

## Summary
Control spec for Marantz NR Series AV receivers covering RS-232C (DB-9 female DCE, 9600 8N1 half-duplex, max 135-byte messages) and Ethernet (RJ-45 10/100, TCP port 23 telnet, max 135-byte messages). Command set is ASCII: 2-character opcode + ASCII parameter + terminating CR (0x0D). Covers power, master and per-speaker channel volume, mute, main/zone input select, Zone 2 / Zone 3, surround mode (Dolby/DTS/Auro-3D variants), video/scaler/HDMI output routing, picture parameters, parameter settings (tone/EQ/dynamics/decode), tuner, HD Radio, online music/USB/iPod/Bluetooth cursor, system menu, lock, trigger, dimmer, and remote maintenance.

<!-- UNRESOLVED: source documents the protocol family used across multiple Marantz NR-series AVRs; specific per-model support (e.g. ZONE3, Auro-3D Upgrade, HD Radio) is conditional on the exact model. -->
<!-- UNRESOLVED: source states volume levels use 0.5 dB step which uses 3 ASCII chars (e.g. MV805=+0.5dB) but most examples show 2-char level; behaviour for any given model should be confirmed before use. -->

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
  connector: DB-9 female (DCE)
  pinout: "1=GND, 2=TxD, 3=RxD, 5=Common(GND), 4/6/7/8/9=NC"
  max_message_bytes: 135
  half_duplex: true
addressing:
  port: 23
  connector: RJ-45 10BASE-T/100BASE-TX
  max_message_bytes: 135
  half_duplex: true
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PWON/PWSTANDBY examples
- routable        # inferred from SI/Z2/Z3 input select examples
- queryable       # inferred from PW?/MV?/MU?/etc. query examples
- levelable       # inferred from MV/CV volume examples
```

## Actions
```yaml
# --- POWER ---
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
  label: Power Status Query
  kind: query
  command: "PW?"
  params: []

# --- MASTER VOLUME ---
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
      type: string
      description: "00 to 98 by ASCII; 80=0dB, 00=MIN(---dB). 0.5dB step uses 3 chars (e.g. 795=-0.5dB, 805=+0.5dB)."

- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?"
  params: []

# --- MUTE ---
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

# --- CHANNEL VOLUME (CV) ---
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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "00,38 to 62 by ASCII; 50=0dB"

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
      description: "00,38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

- id: cv_reset_all
  label: Channel Volume Reset All to Factory Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Channel Volume Query
  kind: query
  command: "CV?"
  params: []

# --- INPUT SELECT (SI) ---
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

- id: si_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD"
  params: []

- id: si_tv
  label: Select Input TV Audio
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
  label: Select Input HD Radio (North America only)
  kind: action
  command: "SIHDRADIO"
  params: []

- id: si_net
  label: Select Input Online Music / NET
  kind: action
  command: "SINET"
  params: []

- id: si_pandora
  label: Select Input Pandora (North America only)
  kind: action
  command: "SIPANDORA"
  params: []

- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  command: "SISIRIUSXM"
  params: []

- id: si_spotify
  label: Select Input Spotify (North America and Europe only)
  kind: action
  command: "SISPOTIFY"
  params: []

- id: si_lastfm
  label: Select Input Last.fm
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
  label: Select Input USB and iPod Direct Playback
  kind: action
  command: "SIIPD"
  params: []

- id: si_irp
  label: Select Input NET/USB iRadio Recent Play
  kind: action
  command: "SIIRP"
  params: []

- id: si_fvp
  label: Select Input NET/USB Favorites Play
  kind: action
  command: "SIFVP"
  params: []

- id: si_query
  label: Input Select Query
  kind: query
  command: "SI?"
  params: []

# --- MAIN ZONE (ZM) ---
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
  command: "ZMFAVORITE4 MEMORY"
  params: []

# --- REC SELECT (SR) ---
- id: sr_source
  label: REC Select Mode Cancel
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_query
  label: REC Select Query
  kind: query
  command: "SR?"
  params: []

# --- SIGNAL SELECT (SD) ---
- id: sd_auto
  label: Signal Select Auto (HDMI>>DIGITAL>>ANALOG)
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Signal Select Force HDMI Input
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Signal Select Force Digital Input
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Signal Select Force Analog Input
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Signal Select External In
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1in
  label: Signal Select 7.1CH In
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Signal Select No Input
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Signal Select Query
  kind: query
  command: "SD?"
  params: []

# --- DIGITAL INPUT (DC) ---
- id: dc_auto
  label: Digital Input Auto
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
  label: Digital Input Query
  kind: query
  command: "DC?"
  params: []

# --- VIDEO SELECT (SV) ---
- id: sv_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD"
  params: []

- id: sv_bd
  label: Video Select Blu-ray
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
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY"
  params: []

- id: sv_game
  label: Video Select Game
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
  label: Video Select Query
  kind: query
  command: "SV?"
  params: []

# --- SLEEP TIMER (SLP) ---
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
      description: "001 to 120 by ASCII; 010=10min"

- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?"
  params: []

# --- AUTO STANDBY (STBY) ---
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
  label: Auto Standby Query
  kind: query
  command: "STBY?"
  params: []

# --- ECO MODE ---
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
  label: ECO Mode Query
  kind: query
  command: "ECO?"
  params: []

# --- SURROUND MODE (MS) ---
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

- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT"
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

- id: ms_dolby_pl2_c
  label: Surround Mode Dolby PL2 Cinema
  kind: action
  command: "MSDOLBY PL2 C"
  params: []

- id: ms_dolby_pl2_m
  label: Surround Mode Dolby PL2 Music
  kind: action
  command: "MSDOLBY PL2 M"
  params: []

- id: ms_dolby_pl2_g
  label: Surround Mode Dolby PL2 Game
  kind: action
  command: "MSDOLBY PL2 G"
  params: []

- id: ms_dolby_pl2x_c
  label: Surround Mode Dolby PL2x Cinema
  kind: action
  command: "MSDOLBY PL2X C"
  params: []

- id: ms_dolby_pl2x_m
  label: Surround Mode Dolby PL2x Music
  kind: action
  command: "MSDOLBY PL2X M"
  params: []

- id: ms_dolby_pl2x_g
  label: Surround Mode Dolby PL2x Game
  kind: action
  command: "MSDOLBY PL2X G"
  params: []

- id: ms_dolby_pl2z_h
  label: Surround Mode Dolby PL2z Height
  kind: action
  command: "MSDOLBY PL2Z H"
  params: []

- id: ms_dolby_d_pl2x_c
  label: Surround Mode Dolby D+PL2x Cinema
  kind: action
  command: "MSDOLBY D+PL2X C"
  params: []

- id: ms_dolby_d_pl2x_m
  label: Surround Mode Dolby D+PL2x Music
  kind: action
  command: "MSDOLBY D+PL2X M"
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
  label: Surround Mode Dolby D+NEO:X Cinema
  kind: action
  command: "MSDOLBY D+NEO:X C"
  params: []

- id: ms_dolby_d_neo_x_m
  label: Surround Mode Dolby D+NEO:X Music
  kind: action
  command: "MSDOLBY D+NEO:X M"
  params: []

- id: ms_dolby_d_neo_x_g
  label: Surround Mode Dolby D+NEO:X Game
  kind: action
  command: "MSDOLBY D+NEO:X G"
  params: []

- id: ms_dolby_d_plus
  label: Surround Mode Dolby D+
  kind: action
  command: "MSDOLBY D+"
  params: []

- id: ms_dolby_d_plus_ex
  label: Surround Mode Dolby D+ +EX
  kind: action
  command: "MSDOLBY D+ +EX"
  params: []

- id: ms_dolby_d_plus_pl2x_c
  label: Surround Mode Dolby D+ +PL2x Cinema
  kind: action
  command: "MSDOLBY D+ +PL2X C"
  params: []

- id: ms_dolby_d_plus_pl2x_m
  label: Surround Mode Dolby D+ +PL2x Music
  kind: action
  command: "MSDOLBY D+ +PL2X M"
  params: []

- id: ms_dolby_d_plus_pl2z_h
  label: Surround Mode Dolby D+ +PL2z Height
  kind: action
  command: "MSDOLBY D+ +PL2Z H"
  params: []

- id: ms_dolby_d_plus_ds
  label: Surround Mode Dolby D+ +DS
  kind: action
  command: "MSDOLBY D+ +DS"
  params: []

- id: ms_dolby_d_plus_neo_x_c
  label: Surround Mode Dolby D+ +NEO:X Cinema
  kind: action
  command: "MSDOLBY D+ +NEO:X C"
  params: []

- id: ms_dolby_d_plus_neo_x_m
  label: Surround Mode Dolby D+ +NEO:X Music
  kind: action
  command: "MSDOLBY D+ +NEO:X M"
  params: []

- id: ms_dolby_d_plus_neo_x_g
  label: Surround Mode Dolby D+ +NEO:X Game
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
  label: Surround Mode Dolby HD+PL2x Cinema
  kind: action
  command: "MSDOLBY HD+PL2X C"
  params: []

- id: ms_dolby_hd_pl2x_m
  label: Surround Mode Dolby HD+PL2x Music
  kind: action
  command: "MSDOLBY HD+PL2X M"
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
  label: Surround Mode Dolby HD+NEO:X Cinema
  kind: action
  command: "MSDOLBY HD+NEO:X C"
  params: []

- id: ms_dolby_hd_neo_x_m
  label: Surround Mode Dolby HD+NEO:X Music
  kind: action
  command: "MSDOLBY HD+NEO:X M"
  params: []

- id: ms_dolby_hd_neo_x_g
  label: Surround Mode Dolby HD+NEO:X Game
  kind: action
  command: "MSDOLBY HD+NEO:X G"
  params: []

- id: ms_dolby_pro_logic
  label: Surround Mode Dolby Pro Logic
  kind: action
  command: "MSDOLBY PRO LOGIC"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND"
  params: []

- id: ms_dts_es_dscrt61
  label: Surround Mode DTS ES Discrete 6.1
  kind: action
  command: "MSDTS ES DSCRT6.1"
  params: []

- id: ms_dts_es_mtrx61
  label: Surround Mode DTS ES Matrix 6.1
  kind: action
  command: "MSDTS ES MTRX6.1"
  params: []

- id: ms_dts_pl2x_c
  label: Surround Mode DTS+PL2x Cinema
  kind: action
  command: "MSDTS+PL2X C"
  params: []

- id: ms_dts_pl2x_m
  label: Surround Mode DTS+PL2x Music
  kind: action
  command: "MSDTS+PL2X M"
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

- id: ms_dts_9624
  label: Surround Mode DTS 96/24
  kind: action
  command: "MSDTS96/24"
  params: []

- id: ms_dts_96_es_mtrx
  label: Surround Mode DTS 96 ES Matrix
  kind: action
  command: "MSDTS96 ES MTRX"
  params: []

- id: ms_dts_neo6
  label: Surround Mode DTS+NEO:6
  kind: action
  command: "MSDTS+NEO:6"
  params: []

- id: ms_dts_neo_x_c
  label: Surround Mode DTS+NEO:X Cinema
  kind: action
  command: "MSDTS+NEO:X C"
  params: []

- id: ms_dts_neo_x_m
  label: Surround Mode DTS+NEO:X Music
  kind: action
  command: "MSDTS+NEO:X M"
  params: []

- id: ms_dts_neo_x_g
  label: Surround Mode DTS+NEO:X Game
  kind: action
  command: "MSDTS+NEO:X G"
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
  label: Surround Mode DTS HD+PL2x Cinema
  kind: action
  command: "MSDTS HD+PL2X C"
  params: []

- id: ms_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2x Music
  kind: action
  command: "MSDTS HD+PL2X M"
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
  label: Surround Mode DTS HD+NEO:6
  kind: action
  command: "MSDTS HD+NEO:6"
  params: []

- id: ms_dts_hd_neo_x_c
  label: Surround Mode DTS HD+NEO:X Cinema
  kind: action
  command: "MSDTS HD+NEO:X C"
  params: []

- id: ms_dts_hd_neo_x_m
  label: Surround Mode DTS HD+NEO:X Music
  kind: action
  command: "MSDTS HD+NEO:X M"
  params: []

- id: ms_dts_hd_neo_x_g
  label: Surround Mode DTS HD+NEO:X Game
  kind: action
  command: "MSDTS HD+NEO:X G"
  params: []

- id: ms_dts_express
  label: Surround Mode DTS Express
  kind: action
  command: "MSDTS EXPRESS"
  params: []

- id: ms_dts_es_8ch_dscrt
  label: Surround Mode DTS ES 8CH Discrete
  kind: action
  command: "MSDTS ES 8CH DSCRT"
  params: []

- id: ms_multi_ch_in
  label: Surround Mode Multi CH In
  kind: action
  command: "MSMULTI CH IN"
  params: []

- id: ms_m_ch_in_dolby_ex
  label: Surround Mode Multi CH In+Dolby EX
  kind: action
  command: "MSM CH IN+DOLBY EX"
  params: []

- id: ms_m_ch_in_pl2x_c
  label: Surround Mode Multi CH In+PL2x Cinema
  kind: action
  command: "MSM CH IN+PL2X C"
  params: []

- id: ms_m_ch_in_pl2x_m
  label: Surround Mode Multi CH In+PL2x Music
  kind: action
  command: "MSM CH IN+PL2X M"
  params: []

- id: ms_m_ch_in_pl2z_h
  label: Surround Mode Multi CH In+PL2z Height
  kind: action
  command: "MSM CH IN+PL2Z H"
  params: []

- id: ms_m_ch_in_ds
  label: Surround Mode Multi CH In+DS
  kind: action
  command: "MSM CH IN+DS"
  params: []

- id: ms_multi_ch_in_71
  label: Surround Mode Multi CH In 7.1
  kind: action
  command: "MSMULTI CH IN 7.1"
  params: []

- id: ms_m_ch_in_neo_x_c
  label: Surround Mode Multi CH In+NEO:X Cinema
  kind: action
  command: "MSM CH IN+NEO:X C"
  params: []

- id: ms_m_ch_in_neo_x_m
  label: Surround Mode Multi CH In+NEO:X Music
  kind: action
  command: "MSM CH IN+NEO:X M"
  params: []

- id: ms_m_ch_in_neo_x_g
  label: Surround Mode Multi CH In+NEO:X Game
  kind: action
  command: "MSM CH IN+NEO:X G"
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
  label: Surround Mode AAC+PL2x Cinema
  kind: action
  command: "MSAAC+PL2X C"
  params: []

- id: ms_aac_pl2x_m
  label: Surround Mode AAC+PL2x Music
  kind: action
  command: "MSAAC+PL2X M"
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
  label: Surround Mode AAC+NEO:X Cinema
  kind: action
  command: "MSAAC+NEO:X C"
  params: []

- id: ms_aac_neo_x_m
  label: Surround Mode AAC+NEO:X Music
  kind: action
  command: "MSAAC+NEO:X M"
  params: []

- id: ms_aac_neo_x_g
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
  label: Surround Mode Audyssey DSX
  kind: action
  command: "MSAUDYSSEY DSX"
  params: []

- id: ms_auro3d
  label: Surround Mode Auro-3D (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO3D"
  params: []

- id: ms_auro2dsurr
  label: Surround Mode Auro 2D Surround (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO2DSURR"
  params: []

- id: ms_mch_stereo
  label: Surround Mode Multi-Ch Stereo
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

- id: ms_query
  label: Surround Mode Query
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
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK ?"
  params: []

# --- VIDEO PARAMETERS (VS) ---
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
  label: Aspect Ratio Query
  kind: query
  command: "VSASP ?"
  params: []

- id: vs_moni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO"
  params: []

- id: vs_moni1
  label: HDMI Monitor Out 1
  kind: action
  command: "VSMONI1"
  params: []

- id: vs_moni2
  label: HDMI Monitor Out 2
  kind: action
  command: "VSMONI2"
  params: []

- id: vs_moni_query
  label: HDMI Monitor Query
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
  label: Resolution 4K 60/50
  kind: action
  command: "VSSC4KF"
  params: []

- id: vs_sc_auto
  label: Resolution Auto
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vs_sc_query
  label: Resolution Query
  kind: query
  command: "VSSC ?"
  params: []

- id: vs_sch_48p
  label: Resolution 480p/576p (HDMI)
  kind: action
  command: "VSSCH48P"
  params: []

- id: vs_sch_10i
  label: Resolution 1080i (HDMI)
  kind: action
  command: "VSSCH10I"
  params: []

- id: vs_sch_72p
  label: Resolution 720p (HDMI)
  kind: action
  command: "VSSCH72P"
  params: []

- id: vs_sch_10p
  label: Resolution 1080p (HDMI)
  kind: action
  command: "VSSCH10P"
  params: []

- id: vs_sch_10p24
  label: Resolution 1080p 24Hz (HDMI)
  kind: action
  command: "VSSCH10P24"
  params: []

- id: vs_sch_4k
  label: Resolution 4K (HDMI)
  kind: action
  command: "VSSCH4K"
  params: []

- id: vs_sch_4kf
  label: Resolution 4K 60/50 (HDMI)
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_sch_auto
  label: Resolution Auto (HDMI)
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_sch_query
  label: Resolution Query (HDMI)
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
  label: HDMI Audio Output Query
  kind: query
  command: "VSAUDIO ?"
  params: []

- id: vs_vpm_auto
  label: Video Processing Mode Auto
  kind: action
  command: "VSVPMAUTO"
  params: []

- id: vs_vpm_game
  label: Video Processing Mode Game
  kind: action
  command: "VSVPMGAME"
  params: []

- id: vs_vpm_movi
  label: Video Processing Mode Movie
  kind: action
  command: "VSVPMMOVI"
  params: []

- id: vs_vpm_query
  label: Video Processing Mode Query
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
  label: Vertical Stretch Query
  kind: query
  command: "VSVST ?"
  params: []

# --- PARAMETER SETTINGS (PS) ---
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
  label: Tone Control Query
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
      description: "00 to 99 by ASCII; 50=0dB; AVR range 44 to 56 (-6 to +6dB)"

- id: ps_bas_query
  label: Bass Query
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
      description: "00 to 99 by ASCII; 50=0dB; AVR range 44 to 56 (-6 to +6dB)"

- id: ps_tre_query
  label: Treble Query
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
      description: "38 to 62 by ASCII; 50=0dB"

- id: ps_dil_query
  label: Dialog Level Query
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
      description: "00,38 to 62 by ASCII; 50=0dB"

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
      description: "00,38 to 62 by ASCII; 50=0dB"

- id: ps_swl_query
  label: Subwoofer Level Query
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
  label: Cinema EQ Query
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

- id: ps_mode_query
  label: PL Mode Query
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
  label: Loudness Management Query
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
  label: Front Height Output Query
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
  label: Speaker Output Surround Back+Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output Surround Back+Front Wide
  kind: action
  command: "PSSP:BW"
  params: []

- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  command: "PSSP:FL"
  params: []

- id: ps_sp_hf
  label: Speaker Output Height+Floor
  kind: action
  command: "PSSP:HF"
  params: []

- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  command: "PSSP:FR"
  params: []

- id: ps_sp_query
  label: Speaker Output Query
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
  label: PL2z Height Gain Query
  kind: query
  command: "PSPHG ?"
  params: []

- id: ps_multeq_audyssey
  label: MultEQ Audyssey Reference
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ L/R Bypass
  kind: action
  command: "PSMULTEQ:BYP.LR"
  params: []

- id: ps_multeq_flat
  label: MultEQ Flat
  kind: action
  command: "PSMULTEQ:FLAT"
  params: []

- id: ps_multeq_manual
  label: MultEQ Manual
  kind: action
  command: "PSMULTEQ:MANUAL"
  params: []

- id: ps_multeq_off
  label: MultEQ Off
  kind: action
  command: "PSMULTEQ:OFF"
  params: []

- id: ps_multeq_query
  label: MultEQ Query
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
  label: Dynamic EQ Query
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
  label: Reference Level Offset Query
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
  label: Dynamic Volume Query
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
  label: Audyssey LFC Query
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
      description: "00 to 99 by ASCII; AVR range 01 to 07"

- id: ps_cntamt_query
  label: Containment Amount Query
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
  label: Audyssey DSX Query
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
      description: "00 to 99 by ASCII; 50=0dB; AVR range 40 to 60"

- id: ps_stw_query
  label: Stage Width Query
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
      description: "00 to 99 by ASCII; 50=0dB; AVR range 40 to 60"

- id: ps_sth_query
  label: Stage Height Query
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
  label: Graphic EQ Query
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
  label: Dynamic Compression Query
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
      description: "00 to 99 by ASCII; AVR range 0 to 16"

- id: ps_bsc_query
  label: Bass Sync Query
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
  label: Dialogue Enhancer Query
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
      description: "00 to 99 by ASCII; 00=0dB, 10=-10dB; AVR range 0 to -10"

- id: ps_lfe_query
  label: LFE Query
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level 0dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00"
  params: []

- id: ps_lfl_05
  label: LFE Level 5dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05"
  params: []

- id: ps_lfl_10
  label: LFE Level 10dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10"
  params: []

- id: ps_lfl_15
  label: LFE Level 15dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 15"
  params: []

- id: ps_lfl_query
  label: LFE Level Query (EXT.IN/7.1CH IN)
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
      description: "00 to 99 by ASCII; AVR range 1 to 15"

- id: ps_eff_query
  label: Effect Query
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
      description: "000 to 999 by ASCII; 000=0ms, 300=300ms; AVR range 0-300; 0-60ms:3ms/step, >60ms:10ms/step"

- id: ps_del_query
  label: Delay Query
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
  label: Panorama Query
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
      description: "00 to 99 by ASCII; AVR range 0 to 6"

- id: ps_dim_query
  label: Dimension Query
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
      description: "00 to 99 by ASCII; AVR range 0 to 7"

- id: ps_cen_query
  label: Center Width Query
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
      description: "00 to 99 by ASCII; AVR range 0.0 to 1.0"

- id: ps_cei_query
  label: Center Image Query
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
      description: "00 to 99 by ASCII; AVR range 0.0 to 1.0"

- id: ps_ceg_query
  label: Center Gain Query
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
  label: Center Spread Query
  kind: query
  command: "PSCES ?"
  params: []

- id: ps_swr_on
  label: Subwoofer On (Direct/Stereo 2ch mode)
  kind: action
  command: "PSSWR ON"
  params: []

- id: ps_swr_off
  label: Subwoofer Off (Direct/Stereo 2ch mode)
  kind: action
  command: "PSSWR OFF"
  params: []

- id: ps_swr_query
  label: Subwoofer Query
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
  label: Room Size Query
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
      description: "000 to 999 by ASCII; 000=0ms, 200=200ms; AVR range 0 to 200"

- id: ps_delay_query
  label: Audio Delay Query
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
  label: Audio Restorer Query
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

- id: ps_front_apb
  label: Front Speaker A+B
  kind: action
  command: "PSFRONT A+B"
  params: []

- id: ps_front_query
  label: Front Speaker Query
  kind: query
  command: "PSFRONT?"
  params: []

- id: ps_auropr_sma
  label: Auro-Matic 3D Preset Small (Auro-3D only)
  kind: action
  command: "PSAUROPR SMA"
  params: []

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium (Auro-3D only)
  kind: action
  command: "PSAUROPR MED"
  params: []

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large (Auro-3D only)
  kind: action
  command: "PSAUROPR LAR"
  params: []

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Special (Auro-3D only)
  kind: action
  command: "PSAUROPR SPE"
  params: []

- id: ps_auropr_query
  label: Auro-Matic 3D Preset Query
  kind: query
  command: "PSAUROPR ?"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up (Auro-3D only)
  kind: action
  command: "PSAUROST UP"
  params: []

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down (Auro-3D only)
  kind: action
  command: "PSAUROST DOWN"
  params: []

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set (Auro-3D only)
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "00 to 99 by ASCII; AVR range 1 to 16"

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Query
  kind: query
  command: "PSAUROST ?"
  params: []

# --- PICTURE (PV) ---
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
  label: Picture Mode Query
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
      description: "000 to 100 by ASCII; 050=0; AVR range 000 to 100 (-50 to +50)"

- id: pv_cn_query
  label: Contrast Query
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
      description: "000 to 100 by ASCII; 050=0; AVR range 000 to 100 (-50 to +50)"

- id: pv_br_query
  label: Brightness Query
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
      description: "000 to 100 by ASCII; 050=0; AVR range 000 to 100 (-50 to +50)"

- id: pv_st_query
  label: Saturation Query
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
      description: "44 to 56 by ASCII; 50=0; AVR range -6 to +6"

- id: pv_hue_query
  label: Hue Query
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
  label: DNR Query
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
      description: "00 to 12 by ASCII; 00=0; AVR range 0 to 12"

- id: pv_enh_query
  label: Enhancer Query
  kind: query
  command: "PVENH ?"
  params: []

# --- ZONE 2 (Z2) ---
- id: z2_source
  label: Zone 2 Source (follow Main Zone)
  kind: action
  command: "Z2SOURCE"
  params: []

- id: z2_phono
  label: Zone 2 Input Phono
  kind: action
  command: "Z2PHONO"
  params: []

- id: z2_cd
  label: Zone 2 Input CD
  kind: action
  command: "Z2CD"
  params: []

- id: z2_tuner
  label: Zone 2 Input Tuner
  kind: action
  command: "Z2TUNER"
  params: []

- id: z2_dvd
  label: Zone 2 Input DVD
  kind: action
  command: "Z2DVD"
  params: []

- id: z2_bd
  label: Zone 2 Input Blu-ray
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
  label: Zone 2 Input Media Player
  kind: action
  command: "Z2MPLAY"
  params: []

- id: z2_game
  label: Zone 2 Input Game
  kind: action
  command: "Z2GAME"
  params: []

- id: z2_hdradio
  label: Zone 2 Input HD Radio
  kind: action
  command: "Z2HDRADIO"
  params: []

- id: z2_net
  label: Zone 2 Input Online Music / NET
  kind: action
  command: "Z2NET"
  params: []

- id: z2_pandora
  label: Zone 2 Input Pandora
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone 2 Input SiriusXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone 2 Input Spotify
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone 2 Input Last.fm
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone 2 Input Flickr
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone 2 Input iRadio
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone 2 Input Server
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone 2 Input Favorites
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
  label: Zone 2 Input USB/iPod
  kind: action
  command: "Z2USB/IPOD"
  params: []

- id: z2_usb
  label: Zone 2 Input USB and Start Playback
  kind: action
  command: "Z2USB"
  params: []

- id: z2_ipd
  label: Zone 2 Input iPod Direct Playback
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
  label: Zone 2 Quick Select Query
  kind: query
  command: "Z2QUICK ?"
  params: []

- id: z2_favorite1
  label: Zone 2 Favorite 1
  kind: action
  command: "Z2FAVORITE1"
  params: []

- id: z2_favorite2
  label: Zone 2 Favorite 2
  kind: action
  command: "Z2FAVORITE2"
  params: []

- id: z2_favorite3
  label: Zone 2 Favorite 3
  kind: action
  command: "Z2FAVORITE3"
  params: []

- id: z2_favorite4
  label: Zone 2 Favorite 4
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
  label: Zone 2 Volume Set
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00 to 98 by ASCII; 80=0dB, 00=MIN"

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
  label: Zone 2 Mute Query
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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

- id: z2cv_query
  label: Zone 2 Channel Volume Query
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
  label: Zone 2 HPF Query
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
      description: "00 to 99 by ASCII; 50=0dB; range -10 to +10 (40 to 60)"

- id: z2ps_bas_query
  label: Zone 2 Bass Query
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
      description: "00 to 99 by ASCII; 50=0dB; range -10 to +10 (40 to 60)"

- id: z2ps_tre_query
  label: Zone 2 Treble Query
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
  label: Zone 2 HDMI Out Query
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
      description: "001 to 120 by ASCII; 010=10min"

- id: z2slp_query
  label: Zone 2 Sleep Timer Query
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
  label: Zone 2 Auto Standby Query
  kind: query
  command: "Z2STBY?"
  params: []

# --- ZONE 3 (Z3) ---
- id: z3_source
  label: Zone 3 Source (follow Main Zone)
  kind: action
  command: "Z3SOURCE"
  params: []

- id: z3_phono
  label: Zone 3 Input Phono
  kind: action
  command: "Z3PHONO"
  params: []

- id: z3_cd
  label: Zone 3 Input CD
  kind: action
  command: "Z3CD"
  params: []

- id: z3_tuner
  label: Zone 3 Input Tuner
  kind: action
  command: "Z3TUNER"
  params: []

- id: z3_dvd
  label: Zone 3 Input DVD
  kind: action
  command: "Z3DVD"
  params: []

- id: z3_bd
  label: Zone 3 Input Blu-ray
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
  label: Zone 3 Input Media Player
  kind: action
  command: "Z3MPLAY"
  params: []

- id: z3_game
  label: Zone 3 Input Game
  kind: action
  command: "Z3GAME"
  params: []

- id: z3_hdradio
  label: Zone 3 Input HD Radio
  kind: action
  command: "Z3HDRADIO"
  params: []

- id: z3_net
  label: Zone 3 Input Online Music / NET
  kind: action
  command: "Z3NET"
  params: []

- id: z3_pandora
  label: Zone 3 Input Pandora
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone 3 Input SiriusXM
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone 3 Input Spotify
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone 3 Input Last.fm
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone 3 Input Flickr
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone 3 Input iRadio
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone 3 Input Server
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone 3 Input Favorites
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
  label: Zone 3 Input USB/iPod
  kind: action
  command: "Z3USB/IPOD"
  params: []

- id: z3_usb
  label: Zone 3 Input USB and Start Playback
  kind: action
  command: "Z3USB"
  params: []

- id: z3_ipd
  label: Zone 3 Input iPod Direct Playback
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
  label: Zone 3 Quick Select Query
  kind: query
  command: "Z3QUICK ?"
  params: []

- id: z3_favorite1
  label: Zone 3 Favorite 1
  kind: action
  command: "Z3FAVORITE1"
  params: []

- id: z3_favorite2
  label: Zone 3 Favorite 2
  kind: action
  command: "Z3FAVORITE2"
  params: []

- id: z3_favorite3
  label: Zone 3 Favorite 3
  kind: action
  command: "Z3FAVORITE3"
  params: []

- id: z3_favorite4
  label: Zone 3 Favorite 4
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
  label: Zone 3 Volume Set
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00 to 98 by ASCII; 80=0dB, 00=MIN"

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
  label: Zone 3 Mute Query
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
      description: "38 to 62 by ASCII; 50=0dB"

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
      description: "38 to 62 by ASCII; 50=0dB"

- id: z3cv_query
  label: Zone 3 Channel Volume Query
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
  label: Zone 3 HPF Query
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
      description: "00 to 99 by ASCII; 50=0dB; range -10 to +10 (40 to 60)"

- id: z3ps_bas_query
  label: Zone 3 Bass Query
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
      description: "00 to 99 by ASCII; 50=0dB; range -10 to +10 (40 to 60)"

- id: z3ps_tre_query
  label: Zone 3 Treble Query
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
      description: "001 to 120 by ASCII; 010=10min"

- id: z3slp_query
  label: Zone 3 Sleep Timer Query
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
  label: Zone 3 Auto Standby Query
  kind: query
  command: "Z3STBY?"
  params: []

# --- TUNER (TF/TP/TM) ---
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
  command: "TFAN{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits; >050000 is AM (kHz×10 e.g. 105000=1050.00kHz), <050000 is FM (MHz×100 e.g. 009150=91.50MHz)"

- id: tf_an_query
  label: Tuner Frequency Query
  kind: query
  command: "TFAN?"
  params: []

- id: tf_anname_query
  label: Tuner RDS Station Name Query (EU/AP only)
  kind: query
  command: "TFANNAME?"
  params: []

- id: tp_an_up
  label: Tuner Preset Ch Up
  kind: action
  command: "TPANUP"
  params: []

- id: tp_an_down
  label: Tuner Preset Ch Down
  kind: action
  command: "TPANDOWN"
  params: []

- id: tp_an_set
  label: Tuner Preset Ch Set
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01 to 56; 01=CH01"

- id: tp_an_query
  label: Tuner Preset Ch Query
  kind: query
  command: "TPAN?"
  params: []

- id: tp_an_mem
  label: Tuner Preset Memory (select slot then send again)
  kind: action
  command: "TPANMEM"
  params: []

- id: tp_an_mem_set
  label: Tuner Preset Memory Direct
  kind: action
  command: "TPANMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01 to 56"

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
  label: Tuner Band/Mode Query
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

# --- HD RADIO (TF/TP/TM/HD) ---
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
  command: "TFHD{freq}"
  params:
    - name: freq
      type: string
      description: "6 digits; same encoding as TFAN"

- id: tf_hd_mc_set
  label: HD Radio Multicast Channel Select
  kind: action
  command: "TFHDMC{ch}"
  params:
    - name: ch
      type: string
      description: "1 digit; Multicast 1-8, Analog=0"

- id: tf_hd_freq_mc_set
  label: HD Radio Frequency + Multicast CH Set
  kind: action
  command: "TFHD{freq}MC{ch}"
  params:
    - name: freq
      type: string
      description: "6 digits"
    - name: ch
      type: string
      description: "1 digit"

- id: tf_hd_query
  label: HD Radio Frequency Query
  kind: query
  command: "TFHD?"
  params: []

- id: tp_hd_up
  label: HD Radio Preset Ch Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tp_hd_down
  label: HD Radio Preset Ch Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tp_hd_set
  label: HD Radio Preset Ch Set
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01 to 56"

- id: tp_hd_query
  label: HD Radio Preset Ch Query
  kind: query
  command: "TPHD?"
  params: []

- id: tp_hd_mem
  label: HD Radio Preset Memory
  kind: action
  command: "TPHDMEM"
  params: []

- id: tp_hd_mem_set
  label: HD Radio Preset Memory Direct
  kind: action
  command: "TPHDMEM{preset}"
  params:
    - name: preset
      type: string
      description: "01 to 56"

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
  label: HD Radio Tuning Mode Auto-HD
  kind: action
  command: "TMHDAUTOHD"
  params: []

- id: tm_hd_auto
  label: HD Radio Tuning Mode Auto
  kind: action
  command: "TMHDAUTO"
  params: []

- id: tm_hd_manual
  label: HD Radio Tuning Mode Manual
  kind: action
  command: "TMHDMANUAL"
  params: []

- id: tm_hd_anaauto
  label: HD Radio Tuning Mode Analog Auto
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tm_hd_anamanu
  label: HD Radio Tuning Mode Analog Manual
  kind: action
  command: "TMHDANAMANU"
  params: []

- id: tm_hd_query
  label: HD Radio Band/Mode Query
  kind: query
  command: "TMHD?"
  params: []

- id: hd_query
  label: HD Radio Full Status Query
  kind: query
  command: "HD?"
  params: []

# --- ONLINE MUSIC / USB / iPod / BLUETOOTH CURSOR (NS) ---
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
  label: Enter / Play-Pause (Online/USB/BT)
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

- id: ns_manual_search_plus
  label: Manual Search Plus (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9F"
  params: []

- id: ns_manual_search_minus
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

- id: ns_toggle_ipod_mode
  label: Toggle iPod Mode / On Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: Page Next (except BT/AirPlay/Spotify remote)
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_previous
  label: Page Previous (except BT/AirPlay/Spotify remote)
  kind: action
  command: "NS9Y"
  params: []

- id: ns_manual_search_stop
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
  label: Preset Call (Online Music; not BT/USB/iPod)
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_memory
  label: Preset Memory (Online Music; not BT/USB/iPod)
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00-35 (2014 AVR)"

- id: ns_preset_name_query
  label: Net Audio Preset Name Status Query (not BT/USB/iPod)
  kind: query
  command: "NSH"
  params: []

- id: ns_fv_mem
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_osd_ascii_query
  label: Onscreen Display Info List Query (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: ns_osd_utf8_query
  label: Onscreen Display Info List Query (UTF-8)
  kind: query
  command: "NSE"
  params: []

# --- SYSTEM MENU (MN) ---
- id: mn_cursor_up
  label: System Cursor Up
  kind: action
  command: "MNCUP"
  params: []

- id: mn_cursor_down
  label: System Cursor Down
  kind: action
  command: "MNCDN"
  params: []

- id: mn_cursor_left
  label: System Cursor Left
  kind: action
  command: "MNCLT"
  params: []

- id: mn_cursor_right
  label: System Cursor Right
  kind: action
  command: "MNCRT"
  params: []

- id: mn_enter
  label: System Enter
  kind: action
  command: "MNENT"
  params: []

- id: mn_return
  label: System Return
  kind: action
  command: "MNRTN"
  params: []

- id: mn_option
  label: System Option
  kind: action
  command: "MNOPT"
  params: []

- id: mn_info
  label: System Info
  kind: action
  command: "MNINF"
  params: []

- id: mn_chl
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
  label: Setup Menu Query
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
  label: InstaPrevue Query
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
  label: All Zone Stereo Query
  kind: query
  command: "MNZST?"
  params: []

# --- LOCK (SY) ---
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
  label: Panel Lock On (except Master Vol)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel+Volume Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# --- TRIGGER (TR) ---
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

# --- UPGRADE (UG) ---
- id: ug_idn
  label: Display Upgrade ID Number on FL Display
  kind: action
  command: "UGIDN"
  params: []

# --- REMOTE MAINTENANCE (RM) ---
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
  label: Remote Maintenance Status Query
  kind: query
  command: "RM ?"
  params: []

# --- DIMMER (DIM) ---
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
  label: Dimmer Query
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  response_pattern: "PW{state}"

- id: master_volume_state
  type: string
  description: "MV{level} where level is 00-98 or 3-char (e.g. 795)"
  response_pattern: "MV{level}"

- id: mute_state
  type: enum
  values: [ON, OFF]
  response_pattern: "MU{state}"

- id: input_state
  type: string
  description: "SI{source} — current input source"
  response_pattern: "SI{source}"

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  response_pattern: "ZM{state}"

- id: surround_mode_state
  type: string
  description: "MS{mode} — current surround mode"
  response_pattern: "MS{mode}"

- id: channel_volume_state
  type: string
  description: "CV{channel} {level} — e.g. CVFL 50; terminates with CVEND"
  response_pattern: "CV{channel} {level}"

- id: zone2_state
  type: string
  description: "Z2{source_or_volume} — Zone 2 input or volume"
  response_pattern: "Z2{value}"

- id: zone3_state
  type: string
  description: "Z3{source_or_volume} — Zone 3 input or volume"
  response_pattern: "Z3{value}"

- id: tuner_frequency_state
  type: string
  description: "TFAN{freq} — 6-digit frequency"
  response_pattern: "TFAN{freq}"

- id: hd_radio_frequency_state
  type: string
  description: "TFHD{freq}"
  response_pattern: "TFHD{freq}"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
- id: state_change_event
  description: "EVENT messages are identical in format to COMMAND/RESPONSE. Sent within 5 seconds of a direct panel operation. See protocol spec § Communication forms."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Send PWON then wait at least 1 second before transmitting the next command."
    source: "Protocol spec note J: 1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)."
```

## Notes
- Commands are terminated with CR (0x0D). No LF.
- Minimum 50ms interval between commands.
- Half-duplex on both RS-232 and TCP; do not overlap command/response windows.
- Maximum message length 135 bytes on both transports.
- MASTER VOLUME range: 00 (min/---) to 98 (+18dB); 80=0dB. 0.5dB steps use 3-digit param (e.g. 795=-0.5dB, 805=+0.5dB).
- CHANNEL VOLUME range: 38 to 62; 50=0dB. Subwoofer additionally allows 00 (OFF).
- CV? query returns only channels present in the current speaker config, terminated by CVEND.
- Zone 3 availability is model-dependent.
- Auro-3D commands (MSAURO3D, MSAURO2DSURR, CV SHL/SHR/TS, PS AUROPR/AUROST) require Auro-3D Upgrade.
- HD Radio commands require an HD Radio-capable model (North America).
- PANDORA, SIRIUSXM commands: North America models only. SPOTIFY: North America and Europe models only.
- InstaPrevue (MNPRV) returns MNPRV NG when the feature is unavailable.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact per-model support matrix (which NR model supports which commands) is not enumerated in source -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T11:13:42.330Z
last_checked_at: 2026-06-02T17:23:26.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:26.235Z
matched_actions: 853
action_count: 853
confidence: medium
summary: "All 853 spec actions found verbatim in source command table; transport (9600 8N1 DB-9 DCE, TCP port 23) confirmed; extra_in_source entries are response/event-only tokens not sendable commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "MSALL ZONE STEREO"
- MS7.1IN
- "MSPURE DIRECT EXT"
- MSQUICK0
- Z2QUICK0
- Z3QUICK0
- TPANOFF
- TPHDOFF
- "MSDSD DIRECT"
- "MSDSD PURE DIRECT"
- "source documents the protocol family used across multiple Marantz NR-series AVRs; specific per-model support (e.g. ZONE3, Auro-3D Upgrade, HD Radio) is conditional on the exact model."
- "source states volume levels use 0.5 dB step which uses 3 ASCII chars (e.g. MV805=+0.5dB) but most examples show 2-char level; behaviour for any given model should be confirmed before use."
- "populate from source, or remove section if not applicable"
- "no multi-step sequences explicitly described in source"
- "firmware version compatibility not stated in source"
- "exact per-model support matrix (which NR model supports which commands) is not enumerated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
