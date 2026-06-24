---
spec_id: admin/denon-avr-xxx00h-series-avr-sx30h-series-avc-8500h
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR-X__00H / AVR-S30H / AVC-8500H Series Control Spec"
manufacturer: Denon
model_family: AVR-X__00H
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - AVR-X__00H
    - AVR-S30H
    - AVC-8500H
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-28T07:57:24.786Z
last_checked_at: 2026-06-23T11:10:47.150Z
generated_at: 2026-06-23T11:10:47.150Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated in source; model-specific command availability noted inline where documented"
verification:
  verdict: verified
  checked_at: 2026-06-23T11:10:47.150Z
  matched_actions: 757
  action_count: 757
  confidence: medium
  summary: "All 757 spec actions confirmed verbatim in Denon Ver.06 source; transport port 23 / 9600-8N1 match; full bidirectional coverage. (1 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# Denon AVR-X__00H / AVR-S30H / AVC-8500H Series Control Spec

## Summary

The Denon AVR-X__00H / AVR-S30H / AVC-8500H series are multi-zone AV receivers supporting IP control via Telnet (TCP port 23) and RS-232C serial at 9600 8N1. Commands are ASCII mnemonics (2-character opcode + parameter + CR 0x0D); the device echoes events and responds to queries in the same format. This spec covers the full COMMAND/RESPONSE catalogue from the Ver.06 protocol document, including Main Zone, Zone 2, Zone 3, Tuner, Online/USB/Bluetooth media, and System Control groups.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source; model-specific command availability noted inline where documented -->

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
- powerable      # inferred from PW ON/STANDBY commands
- routable       # inferred from SI source-select and Z2/Z3 zone-source commands
- queryable      # inferred from ?-request commands throughout
- levelable      # inferred from MV master volume, CV channel volume, and Z2/Z3 volume commands
```

## Actions

```yaml
# ── PW — System Power ──────────────────────────────────────────────────────
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

# ── MV — Master Volume ─────────────────────────────────────────────────────
- id: mv_up
  label: Master Volume Up
  kind: action
  command: "MVUP\r"
  params: []

- id: mv_down
  label: Master Volume Down
  kind: action
  command: "MVDOWN\r"
  params: []

- id: mv_set
  label: Master Volume Set (direct dB)
  kind: action
  command: "MV{level}\r"
  params:
    - name: level
      type: string
      description: "00-98 ASCII (80=0dB, 00=MIN); half-dB steps use 3 digits e.g. MV795"

- id: mv_query
  label: Master Volume Query
  kind: query
  command: "MV?\r"
  params: []

# ── CV — Channel Volume ────────────────────────────────────────────────────
- id: cv_fl_up
  label: Channel Volume FL Up
  kind: action
  command: "CVFL UP\r"
  params: []

- id: cv_fl_down
  label: Channel Volume FL Down
  kind: action
  command: "CVFL DOWN\r"
  params: []

- id: cv_fl_set
  label: Channel Volume FL Set
  kind: action
  command: "CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fr_up
  label: Channel Volume FR Up
  kind: action
  command: "CVFR UP\r"
  params: []

- id: cv_fr_down
  label: Channel Volume FR Down
  kind: action
  command: "CVFR DOWN\r"
  params: []

- id: cv_fr_set
  label: Channel Volume FR Set
  kind: action
  command: "CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_c_up
  label: Channel Volume Center Up
  kind: action
  command: "CVC UP\r"
  params: []

- id: cv_c_down
  label: Channel Volume Center Down
  kind: action
  command: "CVC DOWN\r"
  params: []

- id: cv_c_set
  label: Channel Volume Center Set
  kind: action
  command: "CVC {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sw_up
  label: Channel Volume Subwoofer Up
  kind: action
  command: "CVSW UP\r"
  params: []

- id: cv_sw_down
  label: Channel Volume Subwoofer Down
  kind: action
  command: "CVSW DOWN\r"
  params: []

- id: cv_sw_set
  label: Channel Volume Subwoofer Set
  kind: action
  command: "CVSW {level}\r"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB, 00=OFF"

- id: cv_sw2_up
  label: Channel Volume Subwoofer 2 Up
  kind: action
  command: "CVSW2 UP\r"
  params: []

- id: cv_sw2_down
  label: Channel Volume Subwoofer 2 Down
  kind: action
  command: "CVSW2 DOWN\r"
  params: []

- id: cv_sw2_set
  label: Channel Volume Subwoofer 2 Set
  kind: action
  command: "CVSW2 {level}\r"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB, 00=OFF"

- id: cv_sl_up
  label: Channel Volume Surround L Up
  kind: action
  command: "CVSL UP\r"
  params: []

- id: cv_sl_down
  label: Channel Volume Surround L Down
  kind: action
  command: "CVSL DOWN\r"
  params: []

- id: cv_sl_set
  label: Channel Volume Surround L Set
  kind: action
  command: "CVSL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sr_up
  label: Channel Volume Surround R Up
  kind: action
  command: "CVSR UP\r"
  params: []

- id: cv_sr_down
  label: Channel Volume Surround R Down
  kind: action
  command: "CVSR DOWN\r"
  params: []

- id: cv_sr_set
  label: Channel Volume Surround R Set
  kind: action
  command: "CVSR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sbl_up
  label: Channel Volume Surround Back L Up
  kind: action
  command: "CVSBL UP\r"
  params: []

- id: cv_sbl_down
  label: Channel Volume Surround Back L Down
  kind: action
  command: "CVSBL DOWN\r"
  params: []

- id: cv_sbl_set
  label: Channel Volume Surround Back L Set
  kind: action
  command: "CVSBL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sbr_up
  label: Channel Volume Surround Back R Up
  kind: action
  command: "CVSBR UP\r"
  params: []

- id: cv_sbr_down
  label: Channel Volume Surround Back R Down
  kind: action
  command: "CVSBR DOWN\r"
  params: []

- id: cv_sbr_set
  label: Channel Volume Surround Back R Set
  kind: action
  command: "CVSBR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sb_up
  label: Channel Volume Surround Back (1SP) Up
  kind: action
  command: "CVSB UP\r"
  params: []

- id: cv_sb_down
  label: Channel Volume Surround Back (1SP) Down
  kind: action
  command: "CVSB DOWN\r"
  params: []

- id: cv_sb_set
  label: Channel Volume Surround Back (1SP) Set
  kind: action
  command: "CVSB {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fhl_up
  label: Channel Volume Front Height L Up
  kind: action
  command: "CVFHL UP\r"
  params: []

- id: cv_fhl_down
  label: Channel Volume Front Height L Down
  kind: action
  command: "CVFHL DOWN\r"
  params: []

- id: cv_fhl_set
  label: Channel Volume Front Height L Set
  kind: action
  command: "CVFHL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fhr_up
  label: Channel Volume Front Height R Up
  kind: action
  command: "CVFHR UP\r"
  params: []

- id: cv_fhr_down
  label: Channel Volume Front Height R Down
  kind: action
  command: "CVFHR DOWN\r"
  params: []

- id: cv_fhr_set
  label: Channel Volume Front Height R Set
  kind: action
  command: "CVFHR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fwl_up
  label: Channel Volume Front Wide L Up
  kind: action
  command: "CVFWL UP\r"
  params: []

- id: cv_fwl_down
  label: Channel Volume Front Wide L Down
  kind: action
  command: "CVFWL DOWN\r"
  params: []

- id: cv_fwl_set
  label: Channel Volume Front Wide L Set
  kind: action
  command: "CVFWL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fwr_up
  label: Channel Volume Front Wide R Up
  kind: action
  command: "CVFWR UP\r"
  params: []

- id: cv_fwr_down
  label: Channel Volume Front Wide R Down
  kind: action
  command: "CVFWR DOWN\r"
  params: []

- id: cv_fwr_set
  label: Channel Volume Front Wide R Set
  kind: action
  command: "CVFWR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_tfl_up
  label: Channel Volume Top Front L Up
  kind: action
  command: "CVTFL UP\r"
  params: []

- id: cv_tfl_down
  label: Channel Volume Top Front L Down
  kind: action
  command: "CVTFL DOWN\r"
  params: []

- id: cv_tfl_set
  label: Channel Volume Top Front L Set
  kind: action
  command: "CVTFL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_tfr_up
  label: Channel Volume Top Front R Up
  kind: action
  command: "CVTFR UP\r"
  params: []

- id: cv_tfr_down
  label: Channel Volume Top Front R Down
  kind: action
  command: "CVTFR DOWN\r"
  params: []

- id: cv_tfr_set
  label: Channel Volume Top Front R Set
  kind: action
  command: "CVTFR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_tml_up
  label: Channel Volume Top Middle L Up
  kind: action
  command: "CVTML UP\r"
  params: []

- id: cv_tml_down
  label: Channel Volume Top Middle L Down
  kind: action
  command: "CVTML DOWN\r"
  params: []

- id: cv_tml_set
  label: Channel Volume Top Middle L Set
  kind: action
  command: "CVTML {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_tmr_up
  label: Channel Volume Top Middle R Up
  kind: action
  command: "CVTMR UP\r"
  params: []

- id: cv_tmr_down
  label: Channel Volume Top Middle R Down
  kind: action
  command: "CVTMR DOWN\r"
  params: []

- id: cv_tmr_set
  label: Channel Volume Top Middle R Set
  kind: action
  command: "CVTMR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_trl_up
  label: Channel Volume Top Rear L Up
  kind: action
  command: "CVTRL UP\r"
  params: []

- id: cv_trl_down
  label: Channel Volume Top Rear L Down
  kind: action
  command: "CVTRL DOWN\r"
  params: []

- id: cv_trl_set
  label: Channel Volume Top Rear L Set
  kind: action
  command: "CVTRL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_trr_up
  label: Channel Volume Top Rear R Up
  kind: action
  command: "CVTRR UP\r"
  params: []

- id: cv_trr_down
  label: Channel Volume Top Rear R Down
  kind: action
  command: "CVTRR DOWN\r"
  params: []

- id: cv_trr_set
  label: Channel Volume Top Rear R Set
  kind: action
  command: "CVTRR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_rhl_up
  label: Channel Volume Rear Height L Up
  kind: action
  command: "CVRHL UP\r"
  params: []

- id: cv_rhl_down
  label: Channel Volume Rear Height L Down
  kind: action
  command: "CVRHL DOWN\r"
  params: []

- id: cv_rhl_set
  label: Channel Volume Rear Height L Set
  kind: action
  command: "CVRHL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_rhr_up
  label: Channel Volume Rear Height R Up
  kind: action
  command: "CVRHR UP\r"
  params: []

- id: cv_rhr_down
  label: Channel Volume Rear Height R Down
  kind: action
  command: "CVRHR DOWN\r"
  params: []

- id: cv_rhr_set
  label: Channel Volume Rear Height R Set
  kind: action
  command: "CVRHR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fdl_up
  label: Channel Volume Front Dolby L Up
  kind: action
  command: "CVFDL UP\r"
  params: []

- id: cv_fdl_down
  label: Channel Volume Front Dolby L Down
  kind: action
  command: "CVFDL DOWN\r"
  params: []

- id: cv_fdl_set
  label: Channel Volume Front Dolby L Set
  kind: action
  command: "CVFDL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_fdr_up
  label: Channel Volume Front Dolby R Up
  kind: action
  command: "CVFDR UP\r"
  params: []

- id: cv_fdr_down
  label: Channel Volume Front Dolby R Down
  kind: action
  command: "CVFDR DOWN\r"
  params: []

- id: cv_fdr_set
  label: Channel Volume Front Dolby R Set
  kind: action
  command: "CVFDR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sdl_up
  label: Channel Volume Surround Dolby L Up
  kind: action
  command: "CVSDL UP\r"
  params: []

- id: cv_sdl_down
  label: Channel Volume Surround Dolby L Down
  kind: action
  command: "CVSDL DOWN\r"
  params: []

- id: cv_sdl_set
  label: Channel Volume Surround Dolby L Set
  kind: action
  command: "CVSDL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_sdr_up
  label: Channel Volume Surround Dolby R Up
  kind: action
  command: "CVSDR UP\r"
  params: []

- id: cv_sdr_down
  label: Channel Volume Surround Dolby R Down
  kind: action
  command: "CVSDR DOWN\r"
  params: []

- id: cv_sdr_set
  label: Channel Volume Surround Dolby R Set
  kind: action
  command: "CVSDR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_bdl_up
  label: Channel Volume Back Dolby L Up
  kind: action
  command: "CVBDL UP\r"
  params: []

- id: cv_bdl_down
  label: Channel Volume Back Dolby L Down
  kind: action
  command: "CVBDL DOWN\r"
  params: []

- id: cv_bdl_set
  label: Channel Volume Back Dolby L Set
  kind: action
  command: "CVBDL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_bdr_up
  label: Channel Volume Back Dolby R Up
  kind: action
  command: "CVBDR UP\r"
  params: []

- id: cv_bdr_down
  label: Channel Volume Back Dolby R Down
  kind: action
  command: "CVBDR DOWN\r"
  params: []

- id: cv_bdr_set
  label: Channel Volume Back Dolby R Set
  kind: action
  command: "CVBDR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: cv_shl_up
  label: Channel Volume Surround Height L Up (Auro-3D)
  kind: action
  command: "CVSHL UP\r"
  params: []

- id: cv_shl_down
  label: Channel Volume Surround Height L Down (Auro-3D)
  kind: action
  command: "CVSHL DOWN\r"
  params: []

- id: cv_shl_set
  label: Channel Volume Surround Height L Set (Auro-3D)
  kind: action
  command: "CVSHL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB; Auro-3D Upgrade only"

- id: cv_shr_up
  label: Channel Volume Surround Height R Up (Auro-3D)
  kind: action
  command: "CVSHR UP\r"
  params: []

- id: cv_shr_down
  label: Channel Volume Surround Height R Down (Auro-3D)
  kind: action
  command: "CVSHR DOWN\r"
  params: []

- id: cv_shr_set
  label: Channel Volume Surround Height R Set (Auro-3D)
  kind: action
  command: "CVSHR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB; Auro-3D Upgrade only"

- id: cv_ts_up
  label: Channel Volume Top Surround Up (Auro-3D)
  kind: action
  command: "CVTS UP\r"
  params: []

- id: cv_ts_down
  label: Channel Volume Top Surround Down (Auro-3D)
  kind: action
  command: "CVTS DOWN\r"
  params: []

- id: cv_ts_set
  label: Channel Volume Top Surround Set (Auro-3D)
  kind: action
  command: "CVTS {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB; Auro-3D Upgrade only"

- id: cv_zrl
  label: Channel Volume Reset All to Factory Default
  kind: action
  command: "CVZRL\r"
  params: []

- id: cv_query
  label: Channel Volume Query
  kind: query
  command: "CV?\r"
  params: []

# ── MU — Mute ─────────────────────────────────────────────────────────────
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

# ── SI — Input Source Select ───────────────────────────────────────────────
- id: si_phono
  label: Select Input PHONO
  kind: action
  command: "SIPHONO\r"
  params: []

- id: si_cd
  label: Select Input CD
  kind: action
  command: "SICD\r"
  params: []

- id: si_tuner
  label: Select Input TUNER
  kind: action
  command: "SITUNER\r"
  params: []

- id: si_dvd
  label: Select Input DVD
  kind: action
  command: "SIDVD\r"
  params: []

- id: si_bd
  label: Select Input Blu-ray
  kind: action
  command: "SIBD\r"
  params: []

- id: si_tv
  label: Select Input TV Audio
  kind: action
  command: "SITV\r"
  params: []

- id: si_sat_cbl
  label: Select Input SAT/CBL
  kind: action
  command: "SISAT/CBL\r"
  params: []

- id: si_mplay
  label: Select Input Media Player
  kind: action
  command: "SIMPLAY\r"
  params: []

- id: si_game
  label: Select Input GAME
  kind: action
  command: "SIGAME\r"
  params: []

- id: si_net
  label: Select Input NET
  kind: action
  command: "SINET\r"
  params: []

- id: si_flickr
  label: Select Input Flickr
  kind: action
  command: "SIFLICKR\r"
  params: []

- id: si_iradio
  label: Select Input iRadio
  kind: action
  command: "SIIRADIO\r"
  params: []

- id: si_server
  label: Select Input Server
  kind: action
  command: "SISERVER\r"
  params: []

- id: si_favorites
  label: Select Input Favorites
  kind: action
  command: "SIFAVORITES\r"
  params: []

- id: si_aux1
  label: Select Input AUX1
  kind: action
  command: "SIAUX1\r"
  params: []

- id: si_aux2
  label: Select Input AUX2
  kind: action
  command: "SIAUX2\r"
  params: []

- id: si_aux3
  label: Select Input AUX3
  kind: action
  command: "SIAUX3\r"
  params: []

- id: si_aux4
  label: Select Input AUX4
  kind: action
  command: "SIAUX4\r"
  params: []

- id: si_aux5
  label: Select Input AUX5
  kind: action
  command: "SIAUX5\r"
  params: []

- id: si_aux6
  label: Select Input AUX6
  kind: action
  command: "SIAUX6\r"
  params: []

- id: si_aux7
  label: Select Input AUX7
  kind: action
  command: "SIAUX7\r"
  params: []

- id: si_bt
  label: Select Input Bluetooth
  kind: action
  command: "SIBT\r"
  params: []

- id: si_usb_ipod
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD\r"
  params: []

- id: si_usb
  label: Select Input USB (start playback)
  kind: action
  command: "SIUSB\r"
  params: []

- id: si_ipd
  label: Select Input iPod Direct
  kind: action
  command: "SIIPD\r"
  params: []

- id: si_irp
  label: Select Input iRadio Recent Play
  kind: action
  command: "SIIRP\r"
  params: []

- id: si_fvp
  label: Select Input Favorites Play
  kind: action
  command: "SIFVP\r"
  params: []

- id: si_query
  label: Input Source Query
  kind: query
  command: "SI?\r"
  params: []

# ── ZM — Main Zone Power ───────────────────────────────────────────────────
- id: zm_on
  label: Main Zone On
  kind: action
  command: "ZMON\r"
  params: []

- id: zm_off
  label: Main Zone Off
  kind: action
  command: "ZMOFF\r"
  params: []

- id: zm_query
  label: Main Zone Status Query
  kind: query
  command: "ZM?\r"
  params: []

- id: zm_favorite1
  label: Main Zone Favorite 1
  kind: action
  command: "ZMFAVORITE1\r"
  params: []

- id: zm_favorite2
  label: Main Zone Favorite 2
  kind: action
  command: "ZMFAVORITE2\r"
  params: []

- id: zm_favorite3
  label: Main Zone Favorite 3
  kind: action
  command: "ZMFAVORITE3\r"
  params: []

- id: zm_favorite4
  label: Main Zone Favorite 4
  kind: action
  command: "ZMFAVORITE4\r"
  params: []

- id: zm_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  command: "ZMFAVORITE1 MEMORY\r"
  params: []

- id: zm_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  command: "ZMFAVORITE2 MEMORY\r"
  params: []

- id: zm_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  command: "ZMFAVORITE3 MEMORY\r"
  params: []

- id: zm_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  command: "ZMFAVORITE4 MEMORY\r"
  params: []

# ── SD — Input Mode ────────────────────────────────────────────────────────
- id: sd_auto
  label: Input Mode Auto
  kind: action
  command: "SDAUTO\r"
  params: []

- id: sd_hdmi
  label: Input Mode Force HDMI
  kind: action
  command: "SDHDMI\r"
  params: []

- id: sd_digital
  label: Input Mode Force Digital
  kind: action
  command: "SDDIGITAL\r"
  params: []

- id: sd_analog
  label: Input Mode Force Analog
  kind: action
  command: "SDANALOG\r"
  params: []

- id: sd_ext_in
  label: Input Mode External In
  kind: action
  command: "SDEXT.IN\r"
  params: []

- id: sd_7_1in
  label: Input Mode 7.1CH IN
  kind: action
  command: "SD7.1IN\r"
  params: []

- id: sd_no
  label: Input Mode No Input
  kind: action
  command: "SDNO\r"
  params: []

- id: sd_query
  label: Input Mode Query
  kind: query
  command: "SD?\r"
  params: []

# ── DC — Digital Input Mode ────────────────────────────────────────────────
- id: dc_auto
  label: Digital Input Auto Mode
  kind: action
  command: "DCAUTO\r"
  params: []

- id: dc_pcm
  label: Digital Input Force PCM
  kind: action
  command: "DCPCM\r"
  params: []

- id: dc_dts
  label: Digital Input Force DTS
  kind: action
  command: "DCDTS\r"
  params: []

- id: dc_query
  label: Digital Input Mode Query
  kind: query
  command: "DC?\r"
  params: []

# ── SV — Video Select ──────────────────────────────────────────────────────
- id: sv_dvd
  label: Video Select DVD
  kind: action
  command: "SVDVD\r"
  params: []

- id: sv_bd
  label: Video Select BD
  kind: action
  command: "SVBD\r"
  params: []

- id: sv_tv
  label: Video Select TV
  kind: action
  command: "SVTV\r"
  params: []

- id: sv_sat_cbl
  label: Video Select SAT/CBL
  kind: action
  command: "SVSAT/CBL\r"
  params: []

- id: sv_mplay
  label: Video Select Media Player
  kind: action
  command: "SVMPLAY\r"
  params: []

- id: sv_game
  label: Video Select Game
  kind: action
  command: "SVGAME\r"
  params: []

- id: sv_aux1
  label: Video Select AUX1
  kind: action
  command: "SVAUX1\r"
  params: []

- id: sv_aux2
  label: Video Select AUX2
  kind: action
  command: "SVAUX2\r"
  params: []

- id: sv_aux3
  label: Video Select AUX3
  kind: action
  command: "SVAUX3\r"
  params: []

- id: sv_aux4
  label: Video Select AUX4
  kind: action
  command: "SVAUX4\r"
  params: []

- id: sv_aux5
  label: Video Select AUX5
  kind: action
  command: "SVAUX5\r"
  params: []

- id: sv_aux6
  label: Video Select AUX6
  kind: action
  command: "SVAUX6\r"
  params: []

- id: sv_aux7
  label: Video Select AUX7
  kind: action
  command: "SVAUX7\r"
  params: []

- id: sv_cd
  label: Video Select CD
  kind: action
  command: "SVCD\r"
  params: []

- id: sv_source
  label: Video Select Cancel (follow audio source)
  kind: action
  command: "SVSOURCE\r"
  params: []

- id: sv_on
  label: Video Select ON
  kind: action
  command: "SVON\r"
  params: []

- id: sv_off
  label: Video Select OFF
  kind: action
  command: "SVOFF\r"
  params: []

- id: sv_query
  label: Video Select Query
  kind: query
  command: "SV?\r"
  params: []

# ── SLP — Sleep Timer ──────────────────────────────────────────────────────
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF\r"
  params: []

- id: slp_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001-120 ASCII (e.g. 010=10 min, 120=120 min)"

- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?\r"
  params: []

# ── STBY — Auto Standby ────────────────────────────────────────────────────
- id: stby_15m
  label: Auto Standby 15 Minutes
  kind: action
  command: "STBY15M\r"
  params: []

- id: stby_30m
  label: Auto Standby 30 Minutes
  kind: action
  command: "STBY30M\r"
  params: []

- id: stby_60m
  label: Auto Standby 60 Minutes
  kind: action
  command: "STBY60M\r"
  params: []

- id: stby_off
  label: Auto Standby Off
  kind: action
  command: "STBYOFF\r"
  params: []

- id: stby_query
  label: Auto Standby Query
  kind: query
  command: "STBY?\r"
  params: []

# ── ECO — ECO Mode ─────────────────────────────────────────────────────────
- id: eco_on
  label: ECO Mode On
  kind: action
  command: "ECOON\r"
  params: []

- id: eco_auto
  label: ECO Mode Auto
  kind: action
  command: "ECOAUTO\r"
  params: []

- id: eco_off
  label: ECO Mode Off
  kind: action
  command: "ECOOFF\r"
  params: []

- id: eco_query
  label: ECO Mode Query
  kind: query
  command: "ECO?\r"
  params: []

# ── MS — Surround Mode ─────────────────────────────────────────────────────
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  command: "MSMOVIE\r"
  params: []

- id: ms_music
  label: Surround Mode Music
  kind: action
  command: "MSMUSIC\r"
  params: []

- id: ms_game
  label: Surround Mode Game
  kind: action
  command: "MSGAME\r"
  params: []

- id: ms_direct
  label: Surround Mode Direct
  kind: action
  command: "MSDIRECT\r"
  params: []

- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  command: "MSPURE DIRECT\r"
  params: []

- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  command: "MSSTEREO\r"
  params: []

- id: ms_auto
  label: Surround Mode Auto
  kind: action
  command: "MSAUTO\r"
  params: []

- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  command: "MSDOLBY DIGITAL\r"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  command: "MSDTS SURROUND\r"
  params: []

- id: ms_auro3d
  label: Surround Mode Auro-3D (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO3D\r"
  params: []

- id: ms_auro2dsurr
  label: Surround Mode Auro 2D Surround (Auro-3D Upgrade only)
  kind: action
  command: "MSAURO2DSURR\r"
  params: []

- id: ms_mch_stereo
  label: Surround Mode Multi-Channel Stereo
  kind: action
  command: "MSMCH STEREO\r"
  params: []

- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  command: "MSWIDE SCREEN\r"
  params: []

- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  command: "MSSUPER STADIUM\r"
  params: []

- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  command: "MSROCK ARENA\r"
  params: []

- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  command: "MSJAZZ CLUB\r"
  params: []

- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  command: "MSCLASSIC CONCERT\r"
  params: []

- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  command: "MSMONO MOVIE\r"
  params: []

- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  command: "MSMATRIX\r"
  params: []

- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  command: "MSVIDEO GAME\r"
  params: []

- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  command: "MSVIRTUAL\r"
  params: []

- id: ms_left
  label: Surround Mode Left (mono)
  kind: action
  command: "MSLEFT\r"
  params: []

- id: ms_right
  label: Surround Mode Right (mono)
  kind: action
  command: "MSRIGHT\r"
  params: []

- id: ms_query
  label: Surround Mode Query
  kind: query
  command: "MS?\r"
  params: []

- id: ms_quick1
  label: Quick Select 1
  kind: action
  command: "MSQUICK1\r"
  params: []

- id: ms_quick2
  label: Quick Select 2
  kind: action
  command: "MSQUICK2\r"
  params: []

- id: ms_quick3
  label: Quick Select 3
  kind: action
  command: "MSQUICK3\r"
  params: []

- id: ms_quick4
  label: Quick Select 4
  kind: action
  command: "MSQUICK4\r"
  params: []

- id: ms_quick5
  label: Quick Select 5
  kind: action
  command: "MSQUICK5\r"
  params: []

- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  command: "MSQUICK1 MEMORY\r"
  params: []

- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  command: "MSQUICK2 MEMORY\r"
  params: []

- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  command: "MSQUICK3 MEMORY\r"
  params: []

- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  command: "MSQUICK4 MEMORY\r"
  params: []

- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  command: "MSQUICK5 MEMORY\r"
  params: []

- id: ms_quick_query
  label: Quick Select Status Query
  kind: query
  command: "MSQUICK ?\r"
  params: []

# ── VS — Video Parameters ──────────────────────────────────────────────────
- id: vs_asp_nrm
  label: Aspect Ratio 4:3
  kind: action
  command: "VSASPNRM\r"
  params: []

- id: vs_asp_ful
  label: Aspect Ratio 16:9
  kind: action
  command: "VSASPFUL\r"
  params: []

- id: vs_asp_query
  label: Aspect Ratio Query
  kind: query
  command: "VSASP ?\r"
  params: []

- id: vs_moni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  command: "VSMONIAUTO\r"
  params: []

- id: vs_moni1
  label: HDMI Monitor OUT-1
  kind: action
  command: "VSMONI1\r"
  params: []

- id: vs_moni2
  label: HDMI Monitor OUT-2
  kind: action
  command: "VSMONI2\r"
  params: []

- id: vs_moni_query
  label: HDMI Monitor Query
  kind: query
  command: "VSMONI ?\r"
  params: []

- id: vs_sc_48p
  label: Resolution 480p/576p
  kind: action
  command: "VSSC48P\r"
  params: []

- id: vs_sc_10i
  label: Resolution 1080i
  kind: action
  command: "VSSC10I\r"
  params: []

- id: vs_sc_72p
  label: Resolution 720p
  kind: action
  command: "VSSC72P\r"
  params: []

- id: vs_sc_10p
  label: Resolution 1080p
  kind: action
  command: "VSSC10P\r"
  params: []

- id: vs_sc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  command: "VSSC10P24\r"
  params: []

- id: vs_sc_4k
  label: Resolution 4K
  kind: action
  command: "VSSC4K\r"
  params: []

- id: vs_sc_4kf
  label: Resolution 4K(60/50)
  kind: action
  command: "VSSC4KF\r"
  params: []

- id: vs_sc_auto
  label: Resolution Auto
  kind: action
  command: "VSSCAUTO\r"
  params: []

- id: vs_sc_query
  label: Resolution Query
  kind: query
  command: "VSSC ?\r"
  params: []

- id: vs_sch_48p
  label: Resolution HDMI 480p/576p
  kind: action
  command: "VSSCH48P\r"
  params: []

- id: vs_sch_10i
  label: Resolution HDMI 1080i
  kind: action
  command: "VSSCH10I\r"
  params: []

- id: vs_sch_72p
  label: Resolution HDMI 720p
  kind: action
  command: "VSSCH72P\r"
  params: []

- id: vs_sch_10p
  label: Resolution HDMI 1080p
  kind: action
  command: "VSSCH10P\r"
  params: []

- id: vs_sch_10p24
  label: Resolution HDMI 1080p 24Hz
  kind: action
  command: "VSSCH10P24\r"
  params: []

- id: vs_sch_4k
  label: Resolution HDMI 4K
  kind: action
  command: "VSSCH4K\r"
  params: []

- id: vs_sch_4kf
  label: Resolution HDMI 4K(60/50)
  kind: action
  command: "VSSCH4KF\r"
  params: []

- id: vs_sch_auto
  label: Resolution HDMI Auto
  kind: action
  command: "VSSCHAUTO\r"
  params: []

- id: vs_sch_query
  label: Resolution HDMI Query
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

- id: vs_vpm_movi
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

# ── PS — Parameter Setting ─────────────────────────────────────────────────
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

- id: ps_bas_up
  label: Bass Up
  kind: action
  command: "PSBAS UP\r"
  params: []

- id: ps_bas_down
  label: Bass Down
  kind: action
  command: "PSBAS DOWN\r"
  params: []

- id: ps_bas_set
  label: Bass Set
  kind: action
  command: "PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 44-56 (-6 to +6dB)"

- id: ps_bas_query
  label: Bass Query
  kind: query
  command: "PSBAS ?\r"
  params: []

- id: ps_tre_up
  label: Treble Up
  kind: action
  command: "PSTRE UP\r"
  params: []

- id: ps_tre_down
  label: Treble Down
  kind: action
  command: "PSTRE DOWN\r"
  params: []

- id: ps_tre_set
  label: Treble Set
  kind: action
  command: "PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 44-56 (-6 to +6dB)"

- id: ps_tre_query
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
      description: "38-62 ASCII, 50=0dB"

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
  label: Subwoofer Level Up
  kind: action
  command: "PSSWL UP\r"
  params: []

- id: ps_swl_down
  label: Subwoofer Level Down
  kind: action
  command: "PSSWL DOWN\r"
  params: []

- id: ps_swl_set
  label: Subwoofer Level Set
  kind: action
  command: "PSSWL {level}\r"
  params:
    - name: level
      type: string
      description: "00,38-62 ASCII, 50=0dB, 00=OFF"

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
      description: "00,38-62 ASCII, 50=0dB, 00=OFF"

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
  label: PL2 Mode Pro Logic
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
  label: MultEQ Audyssey Reference
  kind: action
  command: "PSMULTEQ:AUDYSSEY\r"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ L/R Bypass
  kind: action
  command: "PSMULTEQ:BYP.LR\r"
  params: []

- id: ps_multeq_flat
  label: MultEQ Flat
  kind: action
  command: "PSMULTEQ:FLAT\r"
  params: []

- id: ps_multeq_manual
  label: MultEQ Manual
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

- id: ps_dynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  command: "PSDYNVOL HEV\r"
  params: []

- id: ps_dynvol_med
  label: Dynamic Volume Medium
  kind: action
  command: "PSDYNVOL MED\r"
  params: []

- id: ps_dynvol_lit
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
      description: "00-99 ASCII; AVR range 01-07"

- id: ps_cntamt_query
  label: Containment Amount Query
  kind: query
  command: "PSCNTAMT ?\r"
  params: []

- id: ps_dsx_onhw
  label: Audyssey DSX On (Height+Wide)
  kind: action
  command: "PSDSX ONHW\r"
  params: []

- id: ps_dsx_onh
  label: Audyssey DSX On (Height)
  kind: action
  command: "PSDSX ONH\r"
  params: []

- id: ps_dsx_onw
  label: Audyssey DSX On (Width)
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
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

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
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

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
      description: "00-99 ASCII; AVR range 0-16"

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
  label: LFE Up
  kind: action
  command: "PSLFE UP\r"
  params: []

- id: ps_lfe_down
  label: LFE Down
  kind: action
  command: "PSLFE DOWN\r"
  params: []

- id: ps_lfe_set
  label: LFE Set
  kind: action
  command: "PSLFE {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; 00=0dB, 10=-10dB; AVR range 0 to -10"

- id: ps_lfe_query
  label: LFE Query
  kind: query
  command: "PSLFE ?\r"
  params: []

- id: ps_lfl_00
  label: LFE Level 0dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 00\r"
  params: []

- id: ps_lfl_05
  label: LFE Level 5dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 05\r"
  params: []

- id: ps_lfl_10
  label: LFE Level 10dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 10\r"
  params: []

- id: ps_lfl_15
  label: LFE Level 15dB (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL 15\r"
  params: []

- id: ps_lfl_query
  label: LFE Level Query
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
      description: "00-99 ASCII; AVR range 1-15"

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
      description: "000-999 ASCII ms; AVR range 0-300; 0-60ms in 3ms steps, over 60ms in 10ms steps"

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
      description: "00-99 ASCII; AVR range 0-6"

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
      description: "00-99 ASCII; AVR range 0-7"

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
      description: "00-99 ASCII; AVR range 0.0-1.0"

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
      description: "00-99 ASCII; AVR range 0.0-1.0"

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
  label: Subwoofer On (Direct/Stereo 2ch mode)
  kind: action
  command: "PSSWR ON\r"
  params: []

- id: ps_swr_off
  label: Subwoofer Off (Direct/Stereo 2ch mode)
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
  label: Room Size Medium-Small
  kind: action
  command: "PSRSZ MS\r"
  params: []

- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  command: "PSRSZ M\r"
  params: []

- id: ps_rsz_ml
  label: Room Size Medium-Large
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
      description: "000-999 ASCII ms; AVR range 0-200"

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
  label: Audio Restorer Low (Mode 3)
  kind: action
  command: "PSRSTR LOW\r"
  params: []

- id: ps_rstr_med
  label: Audio Restorer Med (Mode 2)
  kind: action
  command: "PSRSTR MED\r"
  params: []

- id: ps_rstr_hi
  label: Audio Restorer High (Mode 1)
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

- id: ps_front_ab
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
  label: Auro-Matic 3D Preset Small (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR SMA\r"
  params: []

- id: ps_auropr_med
  label: Auro-Matic 3D Preset Medium (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR MED\r"
  params: []

- id: ps_auropr_lar
  label: Auro-Matic 3D Preset Large (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR LAR\r"
  params: []

- id: ps_auropr_spe
  label: Auro-Matic 3D Preset Speech (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROPR SPE\r"
  params: []

- id: ps_auropr_query
  label: Auro-Matic 3D Preset Query
  kind: query
  command: "PSAUROPR ?\r"
  params: []

- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST UP\r"
  params: []

- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST DOWN\r"
  params: []

- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set (Auro-3D Upgrade only)
  kind: action
  command: "PSAUROST {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII; AVR range 1-16"

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Query
  kind: query
  command: "PSAUROST ?\r"
  params: []

# ── PV — Picture Adjust ────────────────────────────────────────────────────
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

- id: pv_cn_up
  label: Contrast Up
  kind: action
  command: "PVCN UP\r"
  params: []

- id: pv_cn_down
  label: Contrast Down
  kind: action
  command: "PVCN DOWN\r"
  params: []

- id: pv_cn_set
  label: Contrast Set
  kind: action
  command: "PVCN {level}\r"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50"

- id: pv_cn_query
  label: Contrast Query
  kind: query
  command: "PVCN ?\r"
  params: []

- id: pv_br_up
  label: Brightness Up
  kind: action
  command: "PVBR UP\r"
  params: []

- id: pv_br_down
  label: Brightness Down
  kind: action
  command: "PVBR DOWN\r"
  params: []

- id: pv_br_set
  label: Brightness Set
  kind: action
  command: "PVBR {level}\r"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50"

- id: pv_br_query
  label: Brightness Query
  kind: query
  command: "PVBR ?\r"
  params: []

- id: pv_st_up
  label: Saturation Up
  kind: action
  command: "PVST UP\r"
  params: []

- id: pv_st_down
  label: Saturation Down
  kind: action
  command: "PVST DOWN\r"
  params: []

- id: pv_st_set
  label: Saturation Set
  kind: action
  command: "PVST {level}\r"
  params:
    - name: level
      type: string
      description: "000-100 ASCII, 050=0; AVR range -50 to +50"

- id: pv_st_query
  label: Saturation Query
  kind: query
  command: "PVST ?\r"
  params: []

- id: pv_hue_up
  label: Hue Up
  kind: action
  command: "PVHUE UP\r"
  params: []

- id: pv_hue_down
  label: Hue Down
  kind: action
  command: "PVHUE DOWN\r"
  params: []

- id: pv_hue_set
  label: Hue Set
  kind: action
  command: "PVHUE {level}\r"
  params:
    - name: level
      type: string
      description: "44-56 ASCII, 50=0; AVR range -6 to +6"

- id: pv_hue_query
  label: Hue Query
  kind: query
  command: "PVHUE ?\r"
  params: []

- id: pv_dnr_off
  label: DNR Off
  kind: action
  command: "PVDNR OFF\r"
  params: []

- id: pv_dnr_low
  label: DNR Low
  kind: action
  command: "PVDNR LOW\r"
  params: []

- id: pv_dnr_mid
  label: DNR Mid
  kind: action
  command: "PVDNR MID\r"
  params: []

- id: pv_dnr_hi
  label: DNR High
  kind: action
  command: "PVDNR HI\r"
  params: []

- id: pv_dnr_query
  label: DNR Query
  kind: query
  command: "PVDNR ?\r"
  params: []

- id: pv_enh_up
  label: Enhancer Up
  kind: action
  command: "PVENH UP\r"
  params: []

- id: pv_enh_down
  label: Enhancer Down
  kind: action
  command: "PVENH DOWN\r"
  params: []

- id: pv_enh_set
  label: Enhancer Set
  kind: action
  command: "PVENH {level}\r"
  params:
    - name: level
      type: string
      description: "00-12 ASCII, 00=0"

- id: pv_enh_query
  label: Enhancer Query
  kind: query
  command: "PVENH ?\r"
  params: []

# ── Z2 — Zone 2 ───────────────────────────────────────────────────────────
- id: z2_source
  label: Zone 2 Source (follow Main Zone)
  kind: action
  command: "Z2SOURCE\r"
  params: []

- id: z2_phono
  label: Zone 2 Input PHONO
  kind: action
  command: "Z2PHONO\r"
  params: []

- id: z2_cd
  label: Zone 2 Input CD
  kind: action
  command: "Z2CD\r"
  params: []

- id: z2_tuner
  label: Zone 2 Input TUNER
  kind: action
  command: "Z2TUNER\r"
  params: []

- id: z2_dvd
  label: Zone 2 Input DVD
  kind: action
  command: "Z2DVD\r"
  params: []

- id: z2_bd
  label: Zone 2 Input BD
  kind: action
  command: "Z2BD\r"
  params: []

- id: z2_tv
  label: Zone 2 Input TV
  kind: action
  command: "Z2TV\r"
  params: []

- id: z2_sat_cbl
  label: Zone 2 Input SAT/CBL
  kind: action
  command: "Z2SAT/CBL\r"
  params: []

- id: z2_mplay
  label: Zone 2 Input Media Player
  kind: action
  command: "Z2MPLAY\r"
  params: []

- id: z2_game
  label: Zone 2 Input Game
  kind: action
  command: "Z2GAME\r"
  params: []

- id: z2_net
  label: Zone 2 Input NET
  kind: action
  command: "Z2NET\r"
  params: []

- id: z2_flickr
  label: Zone 2 Input Flickr
  kind: action
  command: "Z2FLICKR\r"
  params: []

- id: z2_iradio
  label: Zone 2 Input iRadio
  kind: action
  command: "Z2IRADIO\r"
  params: []

- id: z2_server
  label: Zone 2 Input Server
  kind: action
  command: "Z2SERVER\r"
  params: []

- id: z2_favorites
  label: Zone 2 Input Favorites
  kind: action
  command: "Z2FAVORITES\r"
  params: []

- id: z2_aux1
  label: Zone 2 Input AUX1
  kind: action
  command: "Z2AUX1\r"
  params: []

- id: z2_aux2
  label: Zone 2 Input AUX2
  kind: action
  command: "Z2AUX2\r"
  params: []

- id: z2_aux3
  label: Zone 2 Input AUX3
  kind: action
  command: "Z2AUX3\r"
  params: []

- id: z2_aux4
  label: Zone 2 Input AUX4
  kind: action
  command: "Z2AUX4\r"
  params: []

- id: z2_aux5
  label: Zone 2 Input AUX5
  kind: action
  command: "Z2AUX5\r"
  params: []

- id: z2_aux6
  label: Zone 2 Input AUX6
  kind: action
  command: "Z2AUX6\r"
  params: []

- id: z2_aux7
  label: Zone 2 Input AUX7
  kind: action
  command: "Z2AUX7\r"
  params: []

- id: z2_bt
  label: Zone 2 Input Bluetooth
  kind: action
  command: "Z2BT\r"
  params: []

- id: z2_usb_ipod
  label: Zone 2 Input USB/iPod
  kind: action
  command: "Z2USB/IPOD\r"
  params: []

- id: z2_usb
  label: Zone 2 Input USB (start playback)
  kind: action
  command: "Z2USB\r"
  params: []

- id: z2_ipd
  label: Zone 2 Input iPod Direct
  kind: action
  command: "Z2IPD\r"
  params: []

- id: z2_irp
  label: Zone 2 Input iRadio Recent Play
  kind: action
  command: "Z2IRP\r"
  params: []

- id: z2_fvp
  label: Zone 2 Input Favorites Play
  kind: action
  command: "Z2FVP\r"
  params: []

- id: z2_quick1
  label: Zone 2 Quick Select 1
  kind: action
  command: "Z2QUICK1\r"
  params: []

- id: z2_quick2
  label: Zone 2 Quick Select 2
  kind: action
  command: "Z2QUICK2\r"
  params: []

- id: z2_quick3
  label: Zone 2 Quick Select 3
  kind: action
  command: "Z2QUICK3\r"
  params: []

- id: z2_quick4
  label: Zone 2 Quick Select 4
  kind: action
  command: "Z2QUICK4\r"
  params: []

- id: z2_quick5
  label: Zone 2 Quick Select 5
  kind: action
  command: "Z2QUICK5\r"
  params: []

- id: z2_quick1_memory
  label: Zone 2 Quick Select 1 Memory
  kind: action
  command: "Z2QUICK1 MEMORY\r"
  params: []

- id: z2_quick2_memory
  label: Zone 2 Quick Select 2 Memory
  kind: action
  command: "Z2QUICK2 MEMORY\r"
  params: []

- id: z2_quick3_memory
  label: Zone 2 Quick Select 3 Memory
  kind: action
  command: "Z2QUICK3 MEMORY\r"
  params: []

- id: z2_quick4_memory
  label: Zone 2 Quick Select 4 Memory
  kind: action
  command: "Z2QUICK4 MEMORY\r"
  params: []

- id: z2_quick5_memory
  label: Zone 2 Quick Select 5 Memory
  kind: action
  command: "Z2QUICK5 MEMORY\r"
  params: []

- id: z2_quick_query
  label: Zone 2 Quick Select Query
  kind: query
  command: "Z2QUICK ?\r"
  params: []

- id: z2_favorite1
  label: Zone 2 Favorite 1
  kind: action
  command: "Z2FAVORITE1\r"
  params: []

- id: z2_favorite2
  label: Zone 2 Favorite 2
  kind: action
  command: "Z2FAVORITE2\r"
  params: []

- id: z2_favorite3
  label: Zone 2 Favorite 3
  kind: action
  command: "Z2FAVORITE3\r"
  params: []

- id: z2_favorite4
  label: Zone 2 Favorite 4
  kind: action
  command: "Z2FAVORITE4\r"
  params: []

- id: z2_favorite1_memory
  label: Zone 2 Favorite 1 Memory
  kind: action
  command: "Z2FAVORITE1 MEMORY\r"
  params: []

- id: z2_favorite2_memory
  label: Zone 2 Favorite 2 Memory
  kind: action
  command: "Z2FAVORITE2 MEMORY\r"
  params: []

- id: z2_favorite3_memory
  label: Zone 2 Favorite 3 Memory
  kind: action
  command: "Z2FAVORITE3 MEMORY\r"
  params: []

- id: z2_favorite4_memory
  label: Zone 2 Favorite 4 Memory
  kind: action
  command: "Z2FAVORITE4 MEMORY\r"
  params: []

- id: z2_vol_up
  label: Zone 2 Volume Up
  kind: action
  command: "Z2UP\r"
  params: []

- id: z2_vol_down
  label: Zone 2 Volume Down
  kind: action
  command: "Z2DOWN\r"
  params: []

- id: z2_vol_set
  label: Zone 2 Volume Set
  kind: action
  command: "Z2{level}\r"
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=MIN"

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
  label: Zone 2 Status Query
  kind: query
  command: "Z2?\r"
  params: []

- id: z2_mu_on
  label: Zone 2 Mute On
  kind: action
  command: "Z2MUON\r"
  params: []

- id: z2_mu_off
  label: Zone 2 Mute Off
  kind: action
  command: "Z2MUOFF\r"
  params: []

- id: z2_mu_query
  label: Zone 2 Mute Query
  kind: query
  command: "Z2MU?\r"
  params: []

- id: z2_cs_st
  label: Zone 2 Channel Setting Stereo
  kind: action
  command: "Z2CSST\r"
  params: []

- id: z2_cs_mono
  label: Zone 2 Channel Setting Mono
  kind: action
  command: "Z2CSMONO\r"
  params: []

- id: z2_cs_query
  label: Zone 2 Channel Setting Query
  kind: query
  command: "Z2CS?\r"
  params: []

- id: z2_cv_fl_up
  label: Zone 2 Channel Volume FL Up
  kind: action
  command: "Z2CVFL UP\r"
  params: []

- id: z2_cv_fl_down
  label: Zone 2 Channel Volume FL Down
  kind: action
  command: "Z2CVFL DOWN\r"
  params: []

- id: z2_cv_fl_set
  label: Zone 2 Channel Volume FL Set
  kind: action
  command: "Z2CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z2_cv_fr_up
  label: Zone 2 Channel Volume FR Up
  kind: action
  command: "Z2CVFR UP\r"
  params: []

- id: z2_cv_fr_down
  label: Zone 2 Channel Volume FR Down
  kind: action
  command: "Z2CVFR DOWN\r"
  params: []

- id: z2_cv_fr_set
  label: Zone 2 Channel Volume FR Set
  kind: action
  command: "Z2CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

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

- id: z2_ps_bas_up
  label: Zone 2 Bass Up
  kind: action
  command: "Z2PSBAS UP\r"
  params: []

- id: z2_ps_bas_down
  label: Zone 2 Bass Down
  kind: action
  command: "Z2PSBAS DOWN\r"
  params: []

- id: z2_ps_bas_set
  label: Zone 2 Bass Set
  kind: action
  command: "Z2PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

- id: z2_ps_bas_query
  label: Zone 2 Bass Query
  kind: query
  command: "Z2PSBAS ?\r"
  params: []

- id: z2_ps_tre_up
  label: Zone 2 Treble Up
  kind: action
  command: "Z2PSTRE UP\r"
  params: []

- id: z2_ps_tre_down
  label: Zone 2 Treble Down
  kind: action
  command: "Z2PSTRE DOWN\r"
  params: []

- id: z2_ps_tre_set
  label: Zone 2 Treble Set
  kind: action
  command: "Z2PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

- id: z2_ps_tre_query
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

- id: z2_slp_off
  label: Zone 2 Sleep Timer Off
  kind: action
  command: "Z2SLPOFF\r"
  params: []

- id: z2_slp_set
  label: Zone 2 Sleep Timer Set
  kind: action
  command: "Z2SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001-120 ASCII"

- id: z2_slp_query
  label: Zone 2 Sleep Timer Query
  kind: query
  command: "Z2SLP?\r"
  params: []

- id: z2_stby_2h
  label: Zone 2 Auto Standby 2 Hours
  kind: action
  command: "Z2STBY2H\r"
  params: []

- id: z2_stby_4h
  label: Zone 2 Auto Standby 4 Hours
  kind: action
  command: "Z2STBY4H\r"
  params: []

- id: z2_stby_8h
  label: Zone 2 Auto Standby 8 Hours
  kind: action
  command: "Z2STBY8H\r"
  params: []

- id: z2_stby_off
  label: Zone 2 Auto Standby Off
  kind: action
  command: "Z2STBYOFF\r"
  params: []

- id: z2_stby_query
  label: Zone 2 Auto Standby Query
  kind: query
  command: "Z2STBY?\r"
  params: []

# ── Z3 — Zone 3 ───────────────────────────────────────────────────────────
- id: z3_source
  label: Zone 3 Source (follow Main Zone)
  kind: action
  command: "Z3SOURCE\r"
  params: []

- id: z3_phono
  label: Zone 3 Input PHONO
  kind: action
  command: "Z3PHONO\r"
  params: []

- id: z3_cd
  label: Zone 3 Input CD
  kind: action
  command: "Z3CD\r"
  params: []

- id: z3_tuner
  label: Zone 3 Input TUNER
  kind: action
  command: "Z3TUNER\r"
  params: []

- id: z3_dvd
  label: Zone 3 Input DVD
  kind: action
  command: "Z3DVD\r"
  params: []

- id: z3_bd
  label: Zone 3 Input BD
  kind: action
  command: "Z3BD\r"
  params: []

- id: z3_tv
  label: Zone 3 Input TV
  kind: action
  command: "Z3TV\r"
  params: []

- id: z3_sat_cbl
  label: Zone 3 Input SAT/CBL
  kind: action
  command: "Z3SAT/CBL\r"
  params: []

- id: z3_mplay
  label: Zone 3 Input Media Player
  kind: action
  command: "Z3MPLAY\r"
  params: []

- id: z3_game
  label: Zone 3 Input Game
  kind: action
  command: "Z3GAME\r"
  params: []

- id: z3_net
  label: Zone 3 Input NET
  kind: action
  command: "Z3NET\r"
  params: []

- id: z3_flickr
  label: Zone 3 Input Flickr
  kind: action
  command: "Z3FLICKR\r"
  params: []

- id: z3_iradio
  label: Zone 3 Input iRadio
  kind: action
  command: "Z3IRADIO\r"
  params: []

- id: z3_server
  label: Zone 3 Input Server
  kind: action
  command: "Z3SERVER\r"
  params: []

- id: z3_favorites
  label: Zone 3 Input Favorites
  kind: action
  command: "Z3FAVORITES\r"
  params: []

- id: z3_aux1
  label: Zone 3 Input AUX1
  kind: action
  command: "Z3AUX1\r"
  params: []

- id: z3_aux2
  label: Zone 3 Input AUX2
  kind: action
  command: "Z3AUX2\r"
  params: []

- id: z3_aux3
  label: Zone 3 Input AUX3
  kind: action
  command: "Z3AUX3\r"
  params: []

- id: z3_aux4
  label: Zone 3 Input AUX4
  kind: action
  command: "Z3AUX4\r"
  params: []

- id: z3_aux5
  label: Zone 3 Input AUX5
  kind: action
  command: "Z3AUX5\r"
  params: []

- id: z3_aux6
  label: Zone 3 Input AUX6
  kind: action
  command: "Z3AUX6\r"
  params: []

- id: z3_aux7
  label: Zone 3 Input AUX7
  kind: action
  command: "Z3AUX7\r"
  params: []

- id: z3_bt
  label: Zone 3 Input Bluetooth
  kind: action
  command: "Z3BT\r"
  params: []

- id: z3_usb_ipod
  label: Zone 3 Input USB/iPod
  kind: action
  command: "Z3USB/IPOD\r"
  params: []

- id: z3_usb
  label: Zone 3 Input USB (start playback)
  kind: action
  command: "Z3USB\r"
  params: []

- id: z3_ipd
  label: Zone 3 Input iPod Direct
  kind: action
  command: "Z3IPD\r"
  params: []

- id: z3_irp
  label: Zone 3 Input iRadio Recent Play
  kind: action
  command: "Z3IRP\r"
  params: []

- id: z3_fvp
  label: Zone 3 Input Favorites Play
  kind: action
  command: "Z3FVP\r"
  params: []

- id: z3_quick1
  label: Zone 3 Quick Select 1
  kind: action
  command: "Z3QUICK1\r"
  params: []

- id: z3_quick2
  label: Zone 3 Quick Select 2
  kind: action
  command: "Z3QUICK2\r"
  params: []

- id: z3_quick3
  label: Zone 3 Quick Select 3
  kind: action
  command: "Z3QUICK3\r"
  params: []

- id: z3_quick4
  label: Zone 3 Quick Select 4
  kind: action
  command: "Z3QUICK4\r"
  params: []

- id: z3_quick5
  label: Zone 3 Quick Select 5
  kind: action
  command: "Z3QUICK5\r"
  params: []

- id: z3_quick1_memory
  label: Zone 3 Quick Select 1 Memory
  kind: action
  command: "Z3QUICK1 MEMORY\r"
  params: []

- id: z3_quick2_memory
  label: Zone 3 Quick Select 2 Memory
  kind: action
  command: "Z3QUICK2 MEMORY\r"
  params: []

- id: z3_quick3_memory
  label: Zone 3 Quick Select 3 Memory
  kind: action
  command: "Z3QUICK3 MEMORY\r"
  params: []

- id: z3_quick4_memory
  label: Zone 3 Quick Select 4 Memory
  kind: action
  command: "Z3QUICK4 MEMORY\r"
  params: []

- id: z3_quick5_memory
  label: Zone 3 Quick Select 5 Memory
  kind: action
  command: "Z3QUICK5 MEMORY\r"
  params: []

- id: z3_quick_query
  label: Zone 3 Quick Select Query
  kind: query
  command: "Z3QUICK ?\r"
  params: []

- id: z3_favorite1
  label: Zone 3 Favorite 1
  kind: action
  command: "Z3FAVORITE1\r"
  params: []

- id: z3_favorite2
  label: Zone 3 Favorite 2
  kind: action
  command: "Z3FAVORITE2\r"
  params: []

- id: z3_favorite3
  label: Zone 3 Favorite 3
  kind: action
  command: "Z3FAVORITE3\r"
  params: []

- id: z3_favorite4
  label: Zone 3 Favorite 4
  kind: action
  command: "Z3FAVORITE4\r"
  params: []

- id: z3_favorite1_memory
  label: Zone 3 Favorite 1 Memory
  kind: action
  command: "Z3FAVORITE1 MEMORY\r"
  params: []

- id: z3_favorite2_memory
  label: Zone 3 Favorite 2 Memory
  kind: action
  command: "Z3FAVORITE2 MEMORY\r"
  params: []

- id: z3_favorite3_memory
  label: Zone 3 Favorite 3 Memory
  kind: action
  command: "Z3FAVORITE3 MEMORY\r"
  params: []

- id: z3_favorite4_memory
  label: Zone 3 Favorite 4 Memory
  kind: action
  command: "Z3FAVORITE4 MEMORY\r"
  params: []

- id: z3_vol_up
  label: Zone 3 Volume Up
  kind: action
  command: "Z3UP\r"
  params: []

- id: z3_vol_down
  label: Zone 3 Volume Down
  kind: action
  command: "Z3DOWN\r"
  params: []

- id: z3_vol_set
  label: Zone 3 Volume Set
  kind: action
  command: "Z3{level}\r"
  params:
    - name: level
      type: string
      description: "00-98 ASCII, 80=0dB, 00=MIN"

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
  label: Zone 3 Status Query
  kind: query
  command: "Z3?\r"
  params: []

- id: z3_mu_on
  label: Zone 3 Mute On
  kind: action
  command: "Z3MUON\r"
  params: []

- id: z3_mu_off
  label: Zone 3 Mute Off
  kind: action
  command: "Z3MUOFF\r"
  params: []

- id: z3_mu_query
  label: Zone 3 Mute Query
  kind: query
  command: "Z3MU?\r"
  params: []

- id: z3_cs_st
  label: Zone 3 Channel Setting Stereo
  kind: action
  command: "Z3CSST\r"
  params: []

- id: z3_cs_mono
  label: Zone 3 Channel Setting Mono
  kind: action
  command: "Z3CSMONO\r"
  params: []

- id: z3_cs_query
  label: Zone 3 Channel Setting Query
  kind: query
  command: "Z3CS?\r"
  params: []

- id: z3_cv_fl_up
  label: Zone 3 Channel Volume FL Up
  kind: action
  command: "Z3CVFL UP\r"
  params: []

- id: z3_cv_fl_down
  label: Zone 3 Channel Volume FL Down
  kind: action
  command: "Z3CVFL DOWN\r"
  params: []

- id: z3_cv_fl_set
  label: Zone 3 Channel Volume FL Set
  kind: action
  command: "Z3CVFL {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

- id: z3_cv_fr_up
  label: Zone 3 Channel Volume FR Up
  kind: action
  command: "Z3CVFR UP\r"
  params: []

- id: z3_cv_fr_down
  label: Zone 3 Channel Volume FR Down
  kind: action
  command: "Z3CVFR DOWN\r"
  params: []

- id: z3_cv_fr_set
  label: Zone 3 Channel Volume FR Set
  kind: action
  command: "Z3CVFR {level}\r"
  params:
    - name: level
      type: string
      description: "38-62 ASCII, 50=0dB"

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

- id: z3_ps_bas_up
  label: Zone 3 Bass Up
  kind: action
  command: "Z3PSBAS UP\r"
  params: []

- id: z3_ps_bas_down
  label: Zone 3 Bass Down
  kind: action
  command: "Z3PSBAS DOWN\r"
  params: []

- id: z3_ps_bas_set
  label: Zone 3 Bass Set
  kind: action
  command: "Z3PSBAS {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

- id: z3_ps_bas_query
  label: Zone 3 Bass Query
  kind: query
  command: "Z3PSBAS ?\r"
  params: []

- id: z3_ps_tre_up
  label: Zone 3 Treble Up
  kind: action
  command: "Z3PSTRE UP\r"
  params: []

- id: z3_ps_tre_down
  label: Zone 3 Treble Down
  kind: action
  command: "Z3PSTRE DOWN\r"
  params: []

- id: z3_ps_tre_set
  label: Zone 3 Treble Set
  kind: action
  command: "Z3PSTRE {level}\r"
  params:
    - name: level
      type: string
      description: "00-99 ASCII, 50=0dB; AVR range 40-60 (-10 to +10)"

- id: z3_ps_tre_query
  label: Zone 3 Treble Query
  kind: query
  command: "Z3PSTRE ?\r"
  params: []

- id: z3_slp_off
  label: Zone 3 Sleep Timer Off
  kind: action
  command: "Z3SLPOFF\r"
  params: []

- id: z3_slp_set
  label: Zone 3 Sleep Timer Set
  kind: action
  command: "Z3SLP{minutes}\r"
  params:
    - name: minutes
      type: string
      description: "001-120 ASCII"

- id: z3_slp_query
  label: Zone 3 Sleep Timer Query
  kind: query
  command: "Z3SLP?\r"
  params: []

- id: z3_stby_2h
  label: Zone 3 Auto Standby 2 Hours
  kind: action
  command: "Z3STBY2H\r"
  params: []

- id: z3_stby_4h
  label: Zone 3 Auto Standby 4 Hours
  kind: action
  command: "Z3STBY4H\r"
  params: []

- id: z3_stby_8h
  label: Zone 3 Auto Standby 8 Hours
  kind: action
  command: "Z3STBY8H\r"
  params: []

- id: z3_stby_off
  label: Zone 3 Auto Standby Off
  kind: action
  command: "Z3STBYOFF\r"
  params: []

- id: z3_stby_query
  label: Zone 3 Auto Standby Query
  kind: query
  command: "Z3STBY?\r"
  params: []

# ── TF / TP / TM — Tuner Control ──────────────────────────────────────────
- id: tf_an_up
  label: Tuner Frequency Up
  kind: action
  command: "TFANUP\r"
  params: []

- id: tf_an_down
  label: Tuner Frequency Down
  kind: action
  command: "TFANDOWN\r"
  params: []

- id: tf_an_set
  label: Tuner Frequency Set
  kind: action
  command: "TFAN{freq}\r"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII; <050000=FM MHz x100, >=050000=AM kHz x100 (e.g. TFAN105000=1050.00kHz AM)"

- id: tf_an_query
  label: Tuner Frequency Query
  kind: query
  command: "TFAN?\r"
  params: []

- id: tf_an_name_query
  label: Tuner RDS Station Name Query (EU/AP only)
  kind: query
  command: "TFANNAME?\r"
  params: []

- id: tp_an_up
  label: Tuner Preset Up
  kind: action
  command: "TPANUP\r"
  params: []

- id: tp_an_down
  label: Tuner Preset Down
  kind: action
  command: "TPANDOWN\r"
  params: []

- id: tp_an_set
  label: Tuner Preset Set
  kind: action
  command: "TPAN{preset}\r"
  params:
    - name: preset
      type: string
      description: "01-56 ASCII (CH01-CH56)"

- id: tp_an_query
  label: Tuner Preset Query
  kind: query
  command: "TPAN?\r"
  params: []

- id: tp_an_mem
  label: Tuner Preset Memory
  kind: action
  command: "TPANMEM\r"
  params: []

- id: tp_an_mem_set
  label: Tuner Preset Memory to Channel
  kind: action
  command: "TPANMEM{preset}\r"
  params:
    - name: preset
      type: string
      description: "01-56 ASCII"

- id: tm_an_am
  label: Tuner Band AM
  kind: action
  command: "TMANAM\r"
  params: []

- id: tm_an_fm
  label: Tuner Band FM
  kind: action
  command: "TMANFM\r"
  params: []

- id: tm_an_query
  label: Tuner Band/Mode Query
  kind: query
  command: "TMAN?\r"
  params: []

- id: tm_an_auto
  label: Tuner Tuning Mode Auto
  kind: action
  command: "TMANAUTO\r"
  params: []

- id: tm_an_manual
  label: Tuner Tuning Mode Manual
  kind: action
  command: "TMANMANUAL\r"
  params: []

# ── NS — Online/USB/iPod/Bluetooth Media Control ───────────────────────────
- id: ns_cursor_up
  label: Online/Media Cursor Up
  kind: action
  command: "NS90\r"
  params: []

- id: ns_cursor_down
  label: Online/Media Cursor Down
  kind: action
  command: "NS91\r"
  params: []

- id: ns_cursor_left
  label: Online/Media Cursor Left
  kind: action
  command: "NS92\r"
  params: []

- id: ns_cursor_right
  label: Online/Media Cursor Right
  kind: action
  command: "NS93\r"
  params: []

- id: ns_enter
  label: Online/Media Enter (Play/Pause)
  kind: action
  command: "NS94\r"
  params: []

- id: ns_play
  label: Online/Media Play
  kind: action
  command: "NS9A\r"
  params: []

- id: ns_pause
  label: Online/Media Pause
  kind: action
  command: "NS9B\r"
  params: []

- id: ns_stop
  label: Online/Media Stop
  kind: action
  command: "NS9C\r"
  params: []

- id: ns_skip_plus
  label: Online/Media Skip Forward
  kind: action
  command: "NS9D\r"
  params: []

- id: ns_skip_minus
  label: Online/Media Skip Back
  kind: action
  command: "NS9E\r"
  params: []

- id: ns_search_plus
  label: Online/Media Manual Search Forward (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9F\r"
  params: []

- id: ns_search_minus
  label: Online/Media Manual Search Backward (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9G\r"
  params: []

- id: ns_repeat_one
  label: Online/Media Repeat One (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9H\r"
  params: []

- id: ns_repeat_all
  label: Online/Media Repeat All (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9I\r"
  params: []

- id: ns_repeat_off
  label: Online/Media Repeat Off (Media Server/USB/iPod Direct/BT)
  kind: action
  command: "NS9J\r"
  params: []

- id: ns_random_on
  label: Online/Media Random On / Shuffle Songs (Media Server/USB/BT / iPod Direct)
  kind: action
  command: "NS9K\r"
  params: []

- id: ns_random_off
  label: Online/Media Random Off / Shuffle Off (Media Server/USB/BT / iPod Direct)
  kind: action
  command: "NS9M\r"
  params: []

- id: ns_ipod_toggle
  label: Toggle iPod Mode / On Screen Mode (iPod Direct only)
  kind: action
  command: "NS9W\r"
  params: []

- id: ns_page_next
  label: Online/Media Page Next (except BT/AirPlay/Spotify)
  kind: action
  command: "NS9X\r"
  params: []

- id: ns_page_prev
  label: Online/Media Page Previous (except BT/AirPlay/Spotify)
  kind: action
  command: "NS9Y\r"
  params: []

- id: ns_search_stop
  label: Online/Media Manual Search Stop (USB/iPod/Media Server/BT)
  kind: action
  command: "NS9Z\r"
  params: []

- id: ns_repeat_toggle
  label: Online/Media Repeat Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/BT)
  kind: action
  command: "NSRPT\r"
  params: []

- id: ns_random_toggle
  label: Online/Media Random Toggle (Media Server/USB/iPod Direct/Spotify/AirPlay/BT)
  kind: action
  command: "NSRND\r"
  params: []

- id: ns_preset_call
  label: Net Audio Preset Call (except BT/USB/iPod)
  kind: action
  command: "NSB{preset}\r"
  params:
    - name: preset
      type: string
      description: "00-35 ASCII (2014 AVR)"

- id: ns_preset_memory
  label: Net Audio Preset Memory (except BT/USB/iPod)
  kind: action
  command: "NSC{preset}\r"
  params:
    - name: preset
      type: string
      description: "00-35 ASCII (2014 AVR)"

- id: ns_preset_name_query
  label: Net Audio Preset Name Query (UTF-8)
  kind: query
  command: "NSH\r"
  params: []

- id: ns_fv_mem
  label: Add Favorites Folder
  kind: action
  command: "NSFV MEM\r"
  params: []

- id: nsa_query
  label: On-Screen Display Info Query (ASCII)
  kind: query
  command: "NSA\r"
  params: []

- id: nse_query
  label: On-Screen Display Info Query (UTF-8)
  kind: query
  command: "NSE\r"
  params: []

# ── MN — System Navigation ─────────────────────────────────────────────────
- id: mn_cup
  label: System Cursor Up
  kind: action
  command: "MNCUP\r"
  params: []

- id: mn_cdn
  label: System Cursor Down
  kind: action
  command: "MNCDN\r"
  params: []

- id: mn_clt
  label: System Cursor Left
  kind: action
  command: "MNCLT\r"
  params: []

- id: mn_crt
  label: System Cursor Right
  kind: action
  command: "MNCRT\r"
  params: []

- id: mn_ent
  label: System Enter
  kind: action
  command: "MNENT\r"
  params: []

- id: mn_rtn
  label: System Return
  kind: action
  command: "MNRTN\r"
  params: []

- id: mn_opt
  label: System Option
  kind: action
  command: "MNOPT\r"
  params: []

- id: mn_inf
  label: System Info
  kind: action
  command: "MNINF\r"
  params: []

- id: mn_chl
  label: Channel Level Adjust Menu Toggle
  kind: action
  command: "MNCHL\r"
  params: []

- id: mn_men_on
  label: Setup Menu On
  kind: action
  command: "MNMEN ON\r"
  params: []

- id: mn_men_off
  label: Setup Menu Off
  kind: action
  command: "MNMEN OFF\r"
  params: []

- id: mn_men_query
  label: Setup Menu Query
  kind: query
  command: "MNMEN?\r"
  params: []

- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  command: "MNZST ON\r"
  params: []

- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  command: "MNZST OFF\r"
  params: []

- id: mn_zst_query
  label: All Zone Stereo Query
  kind: query
  command: "MNZST?\r"
  params: []

# ── SY — System Control ────────────────────────────────────────────────────
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
  label: Panel Lock On (except Master Vol)
  kind: action
  command: "SYPANEL LOCK ON\r"
  params: []

- id: sy_panel_v_lock_on
  label: Panel Lock On (including Master Vol)
  kind: action
  command: "SYPANEL+V LOCK ON\r"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF\r"
  params: []

# ── TR — Trigger ───────────────────────────────────────────────────────────
- id: tr1_on
  label: Trigger 1 On
  kind: action
  command: "TR1 ON\r"
  params: []

- id: tr1_off
  label: Trigger 1 Off
  kind: action
  command: "TR1 OFF\r"
  params: []

- id: tr2_on
  label: Trigger 2 On
  kind: action
  command: "TR2 ON\r"
  params: []

- id: tr2_off
  label: Trigger 2 Off
  kind: action
  command: "TR2 OFF\r"
  params: []

- id: tr_query
  label: Trigger Status Query
  kind: query
  command: "TR?\r"
  params: []

# ── UG — Upgrade ───────────────────────────────────────────────────────────
- id: ug_idn
  label: Display Upgrade ID Number on FL Display
  kind: action
  command: "UGIDN\r"
  params: []

# ── RM — Remote Maintenance ────────────────────────────────────────────────
- id: rm_sta
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
  label: Remote Maintenance Status Query
  kind: query
  command: "RM ?\r"
  params: []

# ── DIM — Front Display Dimmer ─────────────────────────────────────────────
- id: dim_bri
  label: Dimmer Bright
  kind: action
  command: "DIM BRI\r"
  params: []

- id: dim_dim
  label: Dimmer Dim
  kind: action
  command: "DIM DIM\r"
  params: []

- id: dim_dar
  label: Dimmer Dark
  kind: action
  command: "DIM DAR\r"
  params: []

- id: dim_off
  label: Dimmer Off
  kind: action
  command: "DIM OFF\r"
  params: []

- id: dim_sel
  label: Dimmer Select (Toggle)
  kind: action
  command: "DIM SEL\r"
  params: []

- id: dim_query
  label: Dimmer Status Query
  kind: query
  command: "DIM ?\r"
  params: []
```

## Feedbacks

```yaml
- id: fb_power
  query_command: "PW?\r"
  description: "Returns PWON or PWSTANDBY"

- id: fb_master_volume
  query_command: "MV?\r"
  description: "Returns MV<level> (e.g. MV80)"

- id: fb_mute
  query_command: "MU?\r"
  description: "Returns MUON or MUOFF"

- id: fb_input_source
  query_command: "SI?\r"
  description: "Returns SI<source> (e.g. SICD)"

- id: fb_surround_mode
  query_command: "MS?\r"
  description: "Returns MS<mode> (e.g. MSSTEREO)"

- id: fb_main_zone
  query_command: "ZM?\r"
  description: "Returns ZMON or ZMOFF"

- id: fb_channel_volume
  query_command: "CV?\r"
  description: "Returns CVFL 50 ... CVEND sequence for all active channels"

- id: fb_zone2
  query_command: "Z2?\r"
  description: "Returns Z2<source> and Z2<level>"

- id: fb_zone3
  query_command: "Z3?\r"
  description: "Returns Z3<source> and Z3<level>"

- id: fb_zone2_mute
  query_command: "Z2MU?\r"
  description: "Returns Z2MUON or Z2MUOFF"

- id: fb_zone3_mute
  query_command: "Z3MU?\r"
  description: "Returns Z3MUON or Z3MUOFF"

- id: fb_input_mode
  query_command: "SD?\r"
  description: "Returns SD<mode> (e.g. SDAUTO)"

- id: fb_digital_input_mode
  query_command: "DC?\r"
  description: "Returns DC<mode> (e.g. DCAUTO)"

- id: fb_video_select
  query_command: "SV?\r"
  description: "Returns SV<source> and SVON/SVOFF"

- id: fb_sleep_timer
  query_command: "SLP?\r"
  description: "Returns SLP<minutes> or SLPOFF"

- id: fb_auto_standby
  query_command: "STBY?\r"
  description: "Returns STBY<setting>"

- id: fb_eco_mode
  query_command: "ECO?\r"
  description: "Returns ECOON, ECOAUTO, or ECOOFF"

- id: fb_quick_select
  query_command: "MSQUICK ?\r"
  description: "Returns MSQUICK<n>"

- id: fb_tuner_freq
  query_command: "TFAN?\r"
  description: "Returns TFAN<6-digit-freq>"

- id: fb_tuner_preset
  query_command: "TPAN?\r"
  description: "Returns TPAN<preset-no>"

- id: fb_tuner_band
  query_command: "TMAN?\r"
  description: "Returns TMANAM or TMANFM"

- id: fb_dimmer
  query_command: "DIM ?\r"
  description: "Returns DIM BRI, DIM DIM, DIM DAR, or DIM OFF"

- id: fb_trigger
  query_command: "TR?\r"
  description: "Returns TR1 ON/OFF and TR2 ON/OFF"

- id: fb_all_zone_stereo
  query_command: "MNZST?\r"
  description: "Returns MNZST ON or MNZST OFF"

- id: fb_setup_menu
  query_command: "MNMEN?\r"
  description: "Returns MNMEN ON or MNMEN OFF"

- id: fb_picture_mode
  query_command: "PV?\r"
  description: "Returns PV<mode>"

- id: fb_tone_control
  query_command: "PSTONE CTRL ?\r"
  description: "Returns PSTONE CTRL ON or PSTONE CTRL OFF"

- id: fb_multeq
  query_command: "PSMULTEQ: ?\r"
  description: "Returns PSMULTEQ:<mode>"

- id: fb_dynamic_eq
  query_command: "PSDYNEQ ?\r"
  description: "Returns PSDYNEQ ON or PSDYNEQ OFF"

- id: fb_dynamic_volume
  query_command: "PSDYNVOL ?\r"
  description: "Returns PSDYNVOL <level>"

- id: fb_remote_maintenance
  query_command: "RM ?\r"
  description: "Returns RM ON or RM OFF"
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

Commands are sent as ASCII text terminated by CR (0x0D) over TCP port 23 (Telnet) or RS-232C at 9600 8N1. The device echoes state changes as unsolicited EVENTs in the same format as commands; status queries append `?` to the opcode and receive a RESPONSE within 200 ms. A minimum 50 ms inter-command interval is required, and after a power-on command (PWON) the controller must wait at least 1 second before sending the next command.

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-05-28T07:57:24.786Z
last_checked_at: 2026-06-23T11:10:47.150Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T11:10:47.150Z
matched_actions: 757
action_count: 757
confidence: medium
summary: "All 757 spec actions confirmed verbatim in Denon Ver.06 source; transport port 23 / 9600-8N1 match; full bidirectional coverage. (1 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated in source; model-specific command availability noted inline where documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
