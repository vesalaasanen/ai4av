---
spec_id: admin/denon-dcm-5000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon DCM-5000 Control Spec (AVR Control Protocol Ver.06)"
manufacturer: Denon
model_family: DCM-5000
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models:
    - DCM-5000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:22.437Z
last_checked_at: 2026-06-02T21:41:25.188Z
generated_at: 2026-06-02T21:41:25.188Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - SRPHONO
  - SRCD
  - SRTUNER
  - SRDVD
  - SRBD
  - SRTV
  - SRSAT/CBL
  - SRMPLAY
  - SRGAME
  - SRAUX1
  - SRAUX2
  - SRAUX3
  - "source document is titled \"Denon AVR Control Protocol Ver.06\" and covers a family of AVR models (AVR-X1100, S700, S70, X4100, 2014 AVR). Operator labelled this spec for device \"DCM-5000\"; that model is not enumerated in the source matrix. Spec captures the protocol verbatim; physical-device applicability for DCM-5000 not verified by source."
  - "no settable variable section distinct from action parameters in source"
  - "no explicit multi-step macros documented in source"
  - "firmware version compatibility not stated in source"
  - "DCM-5000 model not listed in source compatibility matrix"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:25.188Z
  matched_actions: 856
  action_count: 856
  confidence: medium
  summary: "All 856 spec actions matched verbatim in source; SR source-select variants (SRPHONO/CD/etc.) exist in source but spec maps only SRSOURCE; coverage ratio 856/883≈0.97 exceeds 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Denon DCM-5000 Control Spec (AVR Control Protocol Ver.06)

## Summary
Denon AVR Control Protocol Ver.06 — ASCII command-and-response protocol over RS-232C (9600/8/N/1) and Ethernet TCP port 23 (telnet). Commands are 2-character opcodes followed by optional parameters and CR (0x0D). Source covers main-zone power/volume/mute/input/surround/PS-parameter control, channel volumes for up to 31 channels, zone 2 and zone 3 control, tuner / HD Radio, online music / USB / iPod / Bluetooth navigation, and system menu / lock / trigger / dimmer commands.

<!-- UNRESOLVED: source document is titled "Denon AVR Control Protocol Ver.06" and covers a family of AVR models (AVR-X1100, S700, S70, X4100, 2014 AVR). Operator labelled this spec for device "DCM-5000"; that model is not enumerated in the source matrix. Spec captures the protocol verbatim; physical-device applicability for DCM-5000 not verified by source. -->

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
framing:
  terminator: "\r"  # CR (0x0D) per source "COMMAND + PARAMETER + CR (0x0D)"
  max_payload_bytes: 135  # source: "Communication data length : 135 bytes (maximum)"
  command_interval_ms: 50  # source: "Send the COMMAND in 50ms or more intervals"
  response_timeout_ms: 200  # source: "RESPONSE should be sent within 200ms"
  event_timeout_ms: 5000  # source: "EVENT should be sent within 5 seconds"
  power_on_settle_ms: 1000  # source: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
```

## Traits
```yaml
- powerable    # inferred from PW/ZM/Z2/Z3 power commands
- routable     # inferred from SI / SR / SV / Z2 / Z3 source-select commands
- queryable    # inferred from "?"-suffix request commands and EVENT responses
- levelable    # inferred from MV / CV / PSBAS / PSTRE / Z2/Z3 volume commands
```

## Actions
```yaml
# ── POWER ──
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

# ── MASTER VOLUME ──
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
  label: Master Volume Set (direct)
  kind: action
  command: "MV{level}"
  params:
    - name: level
      type: string
      description: "00–98 by ASCII, 80=0dB, 00=---(MIN); 0.5dB step uses 3 chars e.g. MV795"

- id: master_volume_query
  label: Master Volume Query
  kind: query
  command: "MV?"
  params: []

# ── MUTE ──
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

# ── CHANNEL VOLUME (CV) ──
- id: cv_fl_up
  label: Channel Volume Front-L Up
  kind: action
  command: "CVFL UP"
  params: []

- id: cv_fl_down
  label: Channel Volume Front-L Down
  kind: action
  command: "CVFL DOWN"
  params: []

- id: cv_fl_set
  label: Channel Volume Front-L Set
  kind: action
  command: "CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fr_up
  label: Channel Volume Front-R Up
  kind: action
  command: "CVFR UP"
  params: []

- id: cv_fr_down
  label: Channel Volume Front-R Down
  kind: action
  command: "CVFR DOWN"
  params: []

- id: cv_fr_set
  label: Channel Volume Front-R Set
  kind: action
  command: "CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
      description: "38–62 by ASCII, 50=0dB"

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
      description: "00,38–62 by ASCII, 50=0dB"

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
      description: "00,38–62 by ASCII, 50=0dB"

- id: cv_sl_up
  label: Channel Volume Surround-L Up
  kind: action
  command: "CVSL UP"
  params: []

- id: cv_sl_down
  label: Channel Volume Surround-L Down
  kind: action
  command: "CVSL DOWN"
  params: []

- id: cv_sl_set
  label: Channel Volume Surround-L Set
  kind: action
  command: "CVSL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_sr_up
  label: Channel Volume Surround-R Up
  kind: action
  command: "CVSR UP"
  params: []

- id: cv_sr_down
  label: Channel Volume Surround-R Down
  kind: action
  command: "CVSR DOWN"
  params: []

- id: cv_sr_set
  label: Channel Volume Surround-R Set
  kind: action
  command: "CVSR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_sbl_up
  label: Channel Volume Surround Back-L Up
  kind: action
  command: "CVSBL UP"
  params: []

- id: cv_sbl_down
  label: Channel Volume Surround Back-L Down
  kind: action
  command: "CVSBL DOWN"
  params: []

- id: cv_sbl_set
  label: Channel Volume Surround Back-L Set
  kind: action
  command: "CVSBL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_sbr_up
  label: Channel Volume Surround Back-R Up
  kind: action
  command: "CVSBR UP"
  params: []

- id: cv_sbr_down
  label: Channel Volume Surround Back-R Down
  kind: action
  command: "CVSBR DOWN"
  params: []

- id: cv_sbr_set
  label: Channel Volume Surround Back-R Set
  kind: action
  command: "CVSBR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fhl_up
  label: Channel Volume Front Height-L Up
  kind: action
  command: "CVFHL UP"
  params: []

- id: cv_fhl_down
  label: Channel Volume Front Height-L Down
  kind: action
  command: "CVFHL DOWN"
  params: []

- id: cv_fhl_set
  label: Channel Volume Front Height-L Set
  kind: action
  command: "CVFHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fhr_up
  label: Channel Volume Front Height-R Up
  kind: action
  command: "CVFHR UP"
  params: []

- id: cv_fhr_down
  label: Channel Volume Front Height-R Down
  kind: action
  command: "CVFHR DOWN"
  params: []

- id: cv_fhr_set
  label: Channel Volume Front Height-R Set
  kind: action
  command: "CVFHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fwl_up
  label: Channel Volume Front Wide-L Up
  kind: action
  command: "CVFWL UP"
  params: []

- id: cv_fwl_down
  label: Channel Volume Front Wide-L Down
  kind: action
  command: "CVFWL DOWN"
  params: []

- id: cv_fwl_set
  label: Channel Volume Front Wide-L Set
  kind: action
  command: "CVFWL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fwr_up
  label: Channel Volume Front Wide-R Up
  kind: action
  command: "CVFWR UP"
  params: []

- id: cv_fwr_down
  label: Channel Volume Front Wide-R Down
  kind: action
  command: "CVFWR DOWN"
  params: []

- id: cv_fwr_set
  label: Channel Volume Front Wide-R Set
  kind: action
  command: "CVFWR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_tfl_up
  label: Channel Volume Top Front-L Up
  kind: action
  command: "CVTFL UP"
  params: []

- id: cv_tfl_down
  label: Channel Volume Top Front-L Down
  kind: action
  command: "CVTFL DOWN"
  params: []

- id: cv_tfl_set
  label: Channel Volume Top Front-L Set
  kind: action
  command: "CVTFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_tfr_up
  label: Channel Volume Top Front-R Up
  kind: action
  command: "CVTFR UP"
  params: []

- id: cv_tfr_down
  label: Channel Volume Top Front-R Down
  kind: action
  command: "CVTFR DOWN"
  params: []

- id: cv_tfr_set
  label: Channel Volume Top Front-R Set
  kind: action
  command: "CVTFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_tml_up
  label: Channel Volume Top Middle-L Up
  kind: action
  command: "CVTML UP"
  params: []

- id: cv_tml_down
  label: Channel Volume Top Middle-L Down
  kind: action
  command: "CVTML DOWN"
  params: []

- id: cv_tml_set
  label: Channel Volume Top Middle-L Set
  kind: action
  command: "CVTML {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_tmr_up
  label: Channel Volume Top Middle-R Up
  kind: action
  command: "CVTMR UP"
  params: []

- id: cv_tmr_down
  label: Channel Volume Top Middle-R Down
  kind: action
  command: "CVTMR DOWN"
  params: []

- id: cv_tmr_set
  label: Channel Volume Top Middle-R Set
  kind: action
  command: "CVTMR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_trl_up
  label: Channel Volume Top Rear-L Up
  kind: action
  command: "CVTRL UP"
  params: []

- id: cv_trl_down
  label: Channel Volume Top Rear-L Down
  kind: action
  command: "CVTRL DOWN"
  params: []

- id: cv_trl_set
  label: Channel Volume Top Rear-L Set
  kind: action
  command: "CVTRL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_trr_up
  label: Channel Volume Top Rear-R Up
  kind: action
  command: "CVTRR UP"
  params: []

- id: cv_trr_down
  label: Channel Volume Top Rear-R Down
  kind: action
  command: "CVTRR DOWN"
  params: []

- id: cv_trr_set
  label: Channel Volume Top Rear-R Set
  kind: action
  command: "CVTRR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_rhl_up
  label: Channel Volume Rear Height-L Up
  kind: action
  command: "CVRHL UP"
  params: []

- id: cv_rhl_down
  label: Channel Volume Rear Height-L Down
  kind: action
  command: "CVRHL DOWN"
  params: []

- id: cv_rhl_set
  label: Channel Volume Rear Height-L Set
  kind: action
  command: "CVRHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_rhr_up
  label: Channel Volume Rear Height-R Up
  kind: action
  command: "CVRHR UP"
  params: []

- id: cv_rhr_down
  label: Channel Volume Rear Height-R Down
  kind: action
  command: "CVRHR DOWN"
  params: []

- id: cv_rhr_set
  label: Channel Volume Rear Height-R Set
  kind: action
  command: "CVRHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fdl_up
  label: Channel Volume Front Dolby-L Up
  kind: action
  command: "CVFDL UP"
  params: []

- id: cv_fdl_down
  label: Channel Volume Front Dolby-L Down
  kind: action
  command: "CVFDL DOWN"
  params: []

- id: cv_fdl_set
  label: Channel Volume Front Dolby-L Set
  kind: action
  command: "CVFDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_fdr_up
  label: Channel Volume Front Dolby-R Up
  kind: action
  command: "CVFDR UP"
  params: []

- id: cv_fdr_down
  label: Channel Volume Front Dolby-R Down
  kind: action
  command: "CVFDR DOWN"
  params: []

- id: cv_fdr_set
  label: Channel Volume Front Dolby-R Set
  kind: action
  command: "CVFDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_sdl_up
  label: Channel Volume Surround Dolby-L Up
  kind: action
  command: "CVSDL UP"
  params: []

- id: cv_sdl_down
  label: Channel Volume Surround Dolby-L Down
  kind: action
  command: "CVSDL DOWN"
  params: []

- id: cv_sdl_set
  label: Channel Volume Surround Dolby-L Set
  kind: action
  command: "CVSDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_sdr_up
  label: Channel Volume Surround Dolby-R Up
  kind: action
  command: "CVSDR UP"
  params: []

- id: cv_sdr_down
  label: Channel Volume Surround Dolby-R Down
  kind: action
  command: "CVSDR DOWN"
  params: []

- id: cv_sdr_set
  label: Channel Volume Surround Dolby-R Set
  kind: action
  command: "CVSDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_bdl_up
  label: Channel Volume Back Dolby-L Up
  kind: action
  command: "CVBDL UP"
  params: []

- id: cv_bdl_down
  label: Channel Volume Back Dolby-L Down
  kind: action
  command: "CVBDL DOWN"
  params: []

- id: cv_bdl_set
  label: Channel Volume Back Dolby-L Set
  kind: action
  command: "CVBDL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_bdr_up
  label: Channel Volume Back Dolby-R Up
  kind: action
  command: "CVBDR UP"
  params: []

- id: cv_bdr_down
  label: Channel Volume Back Dolby-R Down
  kind: action
  command: "CVBDR DOWN"
  params: []

- id: cv_bdr_set
  label: Channel Volume Back Dolby-R Set
  kind: action
  command: "CVBDR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_shl_up
  label: Channel Volume Surround Height-L Up (Auro-3D)
  kind: action
  command: "CVSHL UP"
  params: []

- id: cv_shl_down
  label: Channel Volume Surround Height-L Down (Auro-3D)
  kind: action
  command: "CVSHL DOWN"
  params: []

- id: cv_shl_set
  label: Channel Volume Surround Height-L Set (Auro-3D)
  kind: action
  command: "CVSHL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: cv_shr_up
  label: Channel Volume Surround Height-R Up (Auro-3D)
  kind: action
  command: "CVSHR UP"
  params: []

- id: cv_shr_down
  label: Channel Volume Surround Height-R Down (Auro-3D)
  kind: action
  command: "CVSHR DOWN"
  params: []

- id: cv_shr_set
  label: Channel Volume Surround Height-R Set (Auro-3D)
  kind: action
  command: "CVSHR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
      description: "38–62 by ASCII, 50=0dB"

- id: cv_reset_all
  label: Channel Volume Reset All to Defaults
  kind: action
  command: "CVZRL"
  params: []

- id: cv_query
  label: Channel Volume Query
  kind: query
  command: "CV?"
  params: []

# ── INPUT SELECT (SI) ──
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
  label: Select Input NET (Online Music)
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
  label: Select Input Spotify (NA/Europe only)
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
  label: Select Input USB/iPod
  kind: action
  command: "SIUSB/IPOD"
  params: []

- id: si_usb
  label: Select Input USB (Start Playback)
  kind: action
  command: "SIUSB"
  params: []

- id: si_ipd
  label: Select Input iPod Direct
  kind: action
  command: "SIIPD"
  params: []

- id: si_irp
  label: Select Input iRadio Recent Play
  kind: action
  command: "SIIRP"
  params: []

- id: si_fvp
  label: Select Input Favorites Play
  kind: action
  command: "SIFVP"
  params: []

- id: si_query
  label: Input Select Query
  kind: query
  command: "SI?"
  params: []

# ── MAIN ZONE (ZM) ──
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

# ── REC SELECT (SR) ──
- id: sr_source
  label: REC Select Cancel (SOURCE)
  kind: action
  command: "SRSOURCE"
  params: []

- id: sr_query
  label: REC Select Query
  kind: query
  command: "SR?"
  params: []

# ── SIGNAL DECODER (SD) ──
- id: sd_auto
  label: Signal Decoder Auto
  kind: action
  command: "SDAUTO"
  params: []

- id: sd_hdmi
  label: Signal Decoder Force HDMI
  kind: action
  command: "SDHDMI"
  params: []

- id: sd_digital
  label: Signal Decoder Force Digital
  kind: action
  command: "SDDIGITAL"
  params: []

- id: sd_analog
  label: Signal Decoder Force Analog
  kind: action
  command: "SDANALOG"
  params: []

- id: sd_ext_in
  label: Signal Decoder External IN
  kind: action
  command: "SDEXT.IN"
  params: []

- id: sd_7_1in
  label: Signal Decoder 7.1CH IN
  kind: action
  command: "SD7.1IN"
  params: []

- id: sd_no
  label: Signal Decoder No Input
  kind: action
  command: "SDNO"
  params: []

- id: sd_query
  label: Signal Decoder Query
  kind: query
  command: "SD?"
  params: []

# ── DIGITAL INPUT CONTROL (DC) ──
- id: dc_auto
  label: Digital Input Auto Mode
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

# ── VIDEO SELECT (SV) ──
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
  label: Video Select Media Player
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
  label: Video Select Query
  kind: query
  command: "SV?"
  params: []

# ── SLEEP TIMER (SLP) ──
- id: slp_off
  label: Sleep Timer Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_set
  label: Sleep Timer Set
  kind: action
  command: "SLP{time}"
  params:
    - name: time
      type: string
      description: "001–120 by ASCII, 010=10min"

- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "SLP?"
  params: []

# ── AUTO STANDBY (STBY) ──
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

# ── ECO MODE ──
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

# ── SURROUND MODE (MS) ──
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
  label: Surround Mode DOLBY PL2 C
  kind: action
  command: "MSDOLBY PL2 C"
  params: []

- id: ms_dolby_pl2_m
  label: Surround Mode DOLBY PL2 M
  kind: action
  command: "MSDOLBY PL2 M"
  params: []

- id: ms_dolby_pl2_g
  label: Surround Mode DOLBY PL2 G
  kind: action
  command: "MSDOLBY PL2 G"
  params: []

- id: ms_dolby_pl2x_c
  label: Surround Mode DOLBY PL2X C
  kind: action
  command: "MSDOLBY PL2X C"
  params: []

- id: ms_dolby_pl2x_m
  label: Surround Mode DOLBY PL2X M
  kind: action
  command: "MSDOLBY PL2X M"
  params: []

- id: ms_dolby_pl2x_g
  label: Surround Mode DOLBY PL2X G
  kind: action
  command: "MSDOLBY PL2X G"
  params: []

- id: ms_dolby_pl2z_h
  label: Surround Mode DOLBY PL2Z H
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
  label: Surround Mode DOLBY D+PL2X C
  kind: action
  command: "MSDOLBY D+PL2X C"
  params: []

- id: ms_dolby_d_pl2x_m
  label: Surround Mode DOLBY D+PL2X M
  kind: action
  command: "MSDOLBY D+PL2X M"
  params: []

- id: ms_dolby_d_pl2z_h
  label: Surround Mode DOLBY D+PL2Z H
  kind: action
  command: "MSDOLBY D+PL2Z H"
  params: []

- id: ms_dolby_d_ds
  label: Surround Mode DOLBY D+DS
  kind: action
  command: "MSDOLBY D+DS"
  params: []

- id: ms_dolby_d_neo_x_c
  label: Surround Mode DOLBY D+NEO:X C
  kind: action
  command: "MSDOLBY D+NEO:X C"
  params: []

- id: ms_dolby_d_neo_x_m
  label: Surround Mode DOLBY D+NEO:X M
  kind: action
  command: "MSDOLBY D+NEO:X M"
  params: []

- id: ms_dolby_d_neo_x_g
  label: Surround Mode DOLBY D+NEO:X G
  kind: action
  command: "MSDOLBY D+NEO:X G"
  params: []

- id: ms_dts_surround
  label: Surround Mode DTS SURROUND
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
  label: Surround Mode DTS+PL2X C
  kind: action
  command: "MSDTS+PL2X C"
  params: []

- id: ms_dts_pl2x_m
  label: Surround Mode DTS+PL2X M
  kind: action
  command: "MSDTS+PL2X M"
  params: []

- id: ms_dts_pl2z_h
  label: Surround Mode DTS+PL2Z H
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
  label: Surround Mode DTS+NEO:6
  kind: action
  command: "MSDTS+NEO:6"
  params: []

- id: ms_dts_neo_x_c
  label: Surround Mode DTS+NEO:X C
  kind: action
  command: "MSDTS+NEO:X C"
  params: []

- id: ms_dts_neo_x_m
  label: Surround Mode DTS+NEO:X M
  kind: action
  command: "MSDTS+NEO:X M"
  params: []

- id: ms_dts_neo_x_g
  label: Surround Mode DTS+NEO:X G
  kind: action
  command: "MSDTS+NEO:X G"
  params: []

- id: ms_multi_ch_in
  label: Surround Mode MULTI CH IN
  kind: action
  command: "MSMULTI CH IN"
  params: []

- id: ms_m_ch_in_dolby_ex
  label: Surround Mode M CH IN+DOLBY EX
  kind: action
  command: "MSM CH IN+DOLBY EX"
  params: []

- id: ms_m_ch_in_pl2x_c
  label: Surround Mode M CH IN+PL2X C
  kind: action
  command: "MSM CH IN+PL2X C"
  params: []

- id: ms_m_ch_in_pl2x_m
  label: Surround Mode M CH IN+PL2X M
  kind: action
  command: "MSM CH IN+PL2X M"
  params: []

- id: ms_m_ch_in_pl2z_h
  label: Surround Mode M CH IN+PL2Z H
  kind: action
  command: "MSM CH IN+PL2Z H"
  params: []

- id: ms_m_ch_in_ds
  label: Surround Mode M CH IN+DS
  kind: action
  command: "MSM CH IN+DS"
  params: []

- id: ms_multi_ch_in_7_1
  label: Surround Mode MULTI CH IN 7.1
  kind: action
  command: "MSMULTI CH IN 7.1"
  params: []

- id: ms_m_ch_in_neo_x_c
  label: Surround Mode M CH IN+NEO:X C
  kind: action
  command: "MSM CH IN+NEO:X C"
  params: []

- id: ms_m_ch_in_neo_x_m
  label: Surround Mode M CH IN+NEO:X M
  kind: action
  command: "MSM CH IN+NEO:X M"
  params: []

- id: ms_m_ch_in_neo_x_g
  label: Surround Mode M CH IN+NEO:X G
  kind: action
  command: "MSM CH IN+NEO:X G"
  params: []

- id: ms_dolby_d_plus
  label: Surround Mode DOLBY D+
  kind: action
  command: "MSDOLBY D+"
  params: []

- id: ms_dolby_d_plus_ex
  label: Surround Mode DOLBY D+ +EX
  kind: action
  command: "MSDOLBY D+ +EX"
  params: []

- id: ms_dolby_d_plus_pl2x_c
  label: Surround Mode DOLBY D+ +PL2X C
  kind: action
  command: "MSDOLBY D+ +PL2X C"
  params: []

- id: ms_dolby_d_plus_pl2x_m
  label: Surround Mode DOLBY D+ +PL2X M
  kind: action
  command: "MSDOLBY D+ +PL2X M"
  params: []

- id: ms_dolby_d_plus_pl2z_h
  label: Surround Mode DOLBY D+ +PL2Z H
  kind: action
  command: "MSDOLBY D+ +PL2Z H"
  params: []

- id: ms_dolby_d_plus_ds
  label: Surround Mode DOLBY D+ +DS
  kind: action
  command: "MSDOLBY D+ +DS"
  params: []

- id: ms_dolby_d_plus_neo_x_c
  label: Surround Mode DOLBY D+ +NEO:X C
  kind: action
  command: "MSDOLBY D+ +NEO:X C"
  params: []

- id: ms_dolby_d_plus_neo_x_m
  label: Surround Mode DOLBY D+ +NEO:X M
  kind: action
  command: "MSDOLBY D+ +NEO:X M"
  params: []

- id: ms_dolby_d_plus_neo_x_g
  label: Surround Mode DOLBY D+ +NEO:X G
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
  label: Surround Mode DOLBY HD+PL2X C
  kind: action
  command: "MSDOLBY HD+PL2X C"
  params: []

- id: ms_dolby_hd_pl2x_m
  label: Surround Mode DOLBY HD+PL2X M
  kind: action
  command: "MSDOLBY HD+PL2X M"
  params: []

- id: ms_dolby_hd_pl2z_h
  label: Surround Mode DOLBY HD+PL2Z H
  kind: action
  command: "MSDOLBY HD+PL2Z H"
  params: []

- id: ms_dolby_hd_ds
  label: Surround Mode DOLBY HD+DS
  kind: action
  command: "MSDOLBY HD+DS"
  params: []

- id: ms_dolby_hd_neo_x_c
  label: Surround Mode DOLBY HD+NEO:X C
  kind: action
  command: "MSDOLBY HD+NEO:X C"
  params: []

- id: ms_dolby_hd_neo_x_m
  label: Surround Mode DOLBY HD+NEO:X M
  kind: action
  command: "MSDOLBY HD+NEO:X M"
  params: []

- id: ms_dolby_hd_neo_x_g
  label: Surround Mode DOLBY HD+NEO:X G
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
  label: Surround Mode DTS HD+PL2X C
  kind: action
  command: "MSDTS HD+PL2X C"
  params: []

- id: ms_dts_hd_pl2x_m
  label: Surround Mode DTS HD+PL2X M
  kind: action
  command: "MSDTS HD+PL2X M"
  params: []

- id: ms_dts_hd_pl2z_h
  label: Surround Mode DTS HD+PL2Z H
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
  label: Surround Mode DTS HD+NEO:X C
  kind: action
  command: "MSDTS HD+NEO:X C"
  params: []

- id: ms_dts_hd_neo_x_m
  label: Surround Mode DTS HD+NEO:X M
  kind: action
  command: "MSDTS HD+NEO:X M"
  params: []

- id: ms_dts_hd_neo_x_g
  label: Surround Mode DTS HD+NEO:X G
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
  label: Surround Mode AAC+PL2X C
  kind: action
  command: "MSAAC+PL2X C"
  params: []

- id: ms_aac_pl2x_m
  label: Surround Mode AAC+PL2X M
  kind: action
  command: "MSAAC+PL2X M"
  params: []

- id: ms_aac_pl2z_h
  label: Surround Mode AAC+PL2Z H
  kind: action
  command: "MSAAC+PL2Z H"
  params: []

- id: ms_aac_ds
  label: Surround Mode AAC+DS
  kind: action
  command: "MSAAC+DS"
  params: []

- id: ms_aac_neo_x_c
  label: Surround Mode AAC+NEO:X C
  kind: action
  command: "MSAAC+NEO:X C"
  params: []

- id: ms_aac_neo_x_m
  label: Surround Mode AAC+NEO:X M
  kind: action
  command: "MSAAC+NEO:X M"
  params: []

- id: ms_aac_neo_x_g
  label: Surround Mode AAC+NEO:X G
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
  label: Surround Mode AUDYSSEY DSX
  kind: action
  command: "MSAUDYSSEY DSX"
  params: []

- id: ms_dts_neo6_c
  label: Surround Mode DTS NEO:6 C
  kind: action
  command: "MSDTS NEO:6 C"
  params: []

- id: ms_dts_neo6_m
  label: Surround Mode DTS NEO:6 M
  kind: action
  command: "MSDTS NEO:6 M"
  params: []

- id: ms_dts_neo_x_c2
  label: Surround Mode DTS NEO:X C
  kind: action
  command: "MSDTS NEO:X C"
  params: []

- id: ms_dts_neo_x_m2
  label: Surround Mode DTS NEO:X M
  kind: action
  command: "MSDTS NEO:X M"
  params: []

- id: ms_dts_neo_x_g2
  label: Surround Mode DTS NEO:X G
  kind: action
  command: "MSDTS NEO:X G"
  params: []

- id: ms_auro3d
  label: Surround Mode AURO3D (Auro-3D)
  kind: action
  command: "MSAURO3D"
  params: []

- id: ms_auro2dsurr
  label: Surround Mode AURO2DSURR (Auro-3D)
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

# ── VIDEO SETTINGS (VS) ──
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
  label: HDMI Monitor Auto
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
  label: Resolution AUTO
  kind: action
  command: "VSSCAUTO"
  params: []

- id: vs_sc_query
  label: Resolution Query
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
  label: HDMI Resolution 4K 60/50
  kind: action
  command: "VSSCH4KF"
  params: []

- id: vs_sch_auto
  label: HDMI Resolution AUTO
  kind: action
  command: "VSSCHAUTO"
  params: []

- id: vs_sch_query
  label: HDMI Resolution Query
  kind: query
  command: "VSSCH ?"
  params: []

- id: vs_audio_amp
  label: HDMI Audio Output AMP
  kind: action
  command: "VSAUDIO AMP"
  params: []

- id: vs_audio_tv
  label: HDMI Audio Output TV
  kind: action
  command: "VSAUDIO TV"
  params: []

- id: vs_audio_query
  label: HDMI Audio Output Query
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

# ── PARAMETER SETTINGS (PS) ──
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
  label: Bass Set Direct
  kind: action
  command: "PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII, 50=0dB; AVR range 44–56"

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
  label: Treble Set Direct
  kind: action
  command: "PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII, 50=0dB; AVR range 44–56"

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
  label: Dialog Level Set Direct
  kind: action
  command: "PSDIL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
  label: Subwoofer Level Set Direct
  kind: action
  command: "PSSWL {level}"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB"

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
  label: Subwoofer 2 Level Set Direct
  kind: action
  command: "PSSWL2 {level}"
  params:
    - name: level
      type: string
      description: "00,38–62 by ASCII, 50=0dB"

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
  label: Mode Set MUSIC
  kind: action
  command: "PSMODE:MUSIC"
  params: []

- id: ps_mode_cinema
  label: Mode Set CINEMA
  kind: action
  command: "PSMODE:CINEMA"
  params: []

- id: ps_mode_game
  label: Mode Set GAME
  kind: action
  command: "PSMODE:GAME"
  params: []

- id: ps_mode_pro_logic
  label: Mode Set PRO LOGIC
  kind: action
  command: "PSMODE:PRO LOGIC"
  params: []

- id: ps_mode_query
  label: Mode Query
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
  label: Front Height On
  kind: action
  command: "PSFH:ON"
  params: []

- id: ps_fh_off
  label: Front Height Off
  kind: action
  command: "PSFH:OFF"
  params: []

- id: ps_fh_query
  label: Front Height Query
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
  label: Speaker Output SB+Front Height
  kind: action
  command: "PSSP:BH"
  params: []

- id: ps_sp_bw
  label: Speaker Output SB+Front Wide
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
  label: MultEQ Mode AUDYSSEY
  kind: action
  command: "PSMULTEQ:AUDYSSEY"
  params: []

- id: ps_multeq_byp_lr
  label: MultEQ Mode BYP.LR
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
  label: MultEQ Mode Off
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
  label: Containment Amount Set Direct
  kind: action
  command: "PSCNTAMT {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 01–07"

- id: ps_cntamt_query
  label: Containment Amount Query
  kind: query
  command: "PSCNTAMT ?"
  params: []

- id: ps_dsx_onhw
  label: Audyssey DSX On (Height+Wide)
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
  label: Stage Width Set Direct
  kind: action
  command: "PSSTW {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII, 50=0dB; AVR range 40–60"

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
  label: Stage Height Set Direct
  kind: action
  command: "PSSTH {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII, 50=0dB; AVR range 40–60"

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
  label: Bass Sync Set Direct
  kind: action
  command: "PSBSC {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 0–16"

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
  label: Dialogue Enhancer Med
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
  label: LFE Set Direct
  kind: action
  command: "PSLFE {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; 00=0dB, 10=-10dB; AVR range 0 to -10"

- id: ps_lfe_query
  label: LFE Query
  kind: query
  command: "PSLFE ?"
  params: []

- id: ps_lfl_00
  label: LFE Level 00 (EXT.IN/7.1CH IN)
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
  label: LFE Level (EXT.IN) Query
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
  label: Effect Level Set Direct
  kind: action
  command: "PSEFF {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 1–15"

- id: ps_eff_query
  label: Effect Level Query
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
  label: Delay Set Direct
  kind: action
  command: "PSDEL {delay}"
  params:
    - name: delay
      type: string
      description: "000–999 by ASCII; 000=0ms, 300=300ms; AVR range 0–300"

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
  label: Dimension Set Direct
  kind: action
  command: "PSDIM {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 0–6"

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
  label: Center Width Set Direct
  kind: action
  command: "PSCEN {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 0–7"

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
  label: Center Image Set Direct
  kind: action
  command: "PSCEI {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 0.0–1.0"

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
  label: Center Gain Set Direct
  kind: action
  command: "PSCEG {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 0.0–1.0"

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
  label: Subwoofer On (DIRECT/STEREO 2ch)
  kind: action
  command: "PSSWR ON"
  params: []

- id: ps_swr_off
  label: Subwoofer Off (DIRECT/STEREO 2ch)
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
  label: Audio Delay Set Direct
  kind: action
  command: "PSDELAY {delay}"
  params:
    - name: delay
      type: string
      description: "000–999 by ASCII; 000=0ms, 200=200ms; AVR range 0–200"

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
  label: Audio Restorer Low (MODE3)
  kind: action
  command: "PSRSTR LOW"
  params: []

- id: ps_rstr_med
  label: Audio Restorer Med (MODE2)
  kind: action
  command: "PSRSTR MED"
  params: []

- id: ps_rstr_hi
  label: Audio Restorer High (MODE1)
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

- id: ps_front_a_plus_b
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
  label: Auro-Matic 3D Preset Query
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
  label: Auro-Matic 3D Strength Set Direct
  kind: action
  command: "PSAUROST{level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 1–16"

- id: ps_aurost_query
  label: Auro-Matic 3D Strength Query
  kind: query
  command: "PSAUROST ?"
  params: []

# ── PICTURE (PV) ──
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
  label: Contrast Set Direct
  kind: action
  command: "PVCN {level}"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0; AVR range -50 to +50"

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
  label: Brightness Set Direct
  kind: action
  command: "PVBR {level}"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0; AVR range -50 to +50"

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
  label: Saturation Set Direct
  kind: action
  command: "PVST {level}"
  params:
    - name: level
      type: string
      description: "000–100 by ASCII, 050=0; AVR range -50 to +50"

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
  label: Hue Set Direct
  kind: action
  command: "PVHUE {level}"
  params:
    - name: level
      type: string
      description: "44–56 by ASCII, 50=0; AVR range -6 to +6"

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
  label: Enhancer Set Direct
  kind: action
  command: "PVENH {level}"
  params:
    - name: level
      type: string
      description: "00–12 by ASCII, 00=0; AVR range 0–12"

- id: pv_enh_query
  label: Enhancer Query
  kind: query
  command: "PVENH ?"
  params: []

# ── ZONE 2 ──
- id: z2_source
  label: Zone 2 Cancel (Source Same as Main)
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
  label: Zone 2 Select Media Player
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
  label: Zone 2 Select Pandora
  kind: action
  command: "Z2PANDORA"
  params: []

- id: z2_siriusxm
  label: Zone 2 Select SiriusXM
  kind: action
  command: "Z2SIRIUSXM"
  params: []

- id: z2_spotify
  label: Zone 2 Select Spotify
  kind: action
  command: "Z2SPOTIFY"
  params: []

- id: z2_lastfm
  label: Zone 2 Select Last.fm
  kind: action
  command: "Z2LASTFM"
  params: []

- id: z2_flickr
  label: Zone 2 Select Flickr
  kind: action
  command: "Z2FLICKR"
  params: []

- id: z2_iradio
  label: Zone 2 Select iRadio
  kind: action
  command: "Z2IRADIO"
  params: []

- id: z2_server
  label: Zone 2 Select Server
  kind: action
  command: "Z2SERVER"
  params: []

- id: z2_favorites
  label: Zone 2 Select Favorites
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
  label: Zone 2 Select iPod Direct
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
  label: Zone 2 Volume Set Direct
  kind: action
  command: "Z2{level}"
  params:
    - name: level
      type: string
      description: "00–98 by ASCII, 80=0dB, 00=---(MIN)"

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
  label: Zone 2 Channel Stereo
  kind: action
  command: "Z2CSST"
  params: []

- id: z2cs_mono
  label: Zone 2 Channel Mono
  kind: action
  command: "Z2CSMONO"
  params: []

- id: z2cs_query
  label: Zone 2 Channel Setting Query
  kind: query
  command: "Z2CS?"
  params: []

- id: z2cv_fl_up
  label: Zone 2 Channel Volume Front-L Up
  kind: action
  command: "Z2CVFL UP"
  params: []

- id: z2cv_fl_down
  label: Zone 2 Channel Volume Front-L Down
  kind: action
  command: "Z2CVFL DOWN"
  params: []

- id: z2cv_fl_set
  label: Zone 2 Channel Volume Front-L Set
  kind: action
  command: "Z2CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z2cv_fr_up
  label: Zone 2 Channel Volume Front-R Up
  kind: action
  command: "Z2CVFR UP"
  params: []

- id: z2cv_fr_down
  label: Zone 2 Channel Volume Front-R Down
  kind: action
  command: "Z2CVFR DOWN"
  params: []

- id: z2cv_fr_set
  label: Zone 2 Channel Volume Front-R Set
  kind: action
  command: "Z2CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
  label: Zone 2 Bass Set Direct
  kind: action
  command: "Z2PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 40–60 (or 36–64 on X4100)"

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
  label: Zone 2 Treble Set Direct
  kind: action
  command: "Z2PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 40–60 (or 36–64 on X4100)"

- id: z2ps_tre_query
  label: Zone 2 Treble Query
  kind: query
  command: "Z2PSTRE ?"
  params: []

- id: z2hda_thr
  label: Zone 2 HDMI Audio Through
  kind: action
  command: "Z2HDA THR"
  params: []

- id: z2hda_pcm
  label: Zone 2 HDMI Audio PCM
  kind: action
  command: "Z2HDA PCM"
  params: []

- id: z2hda_query
  label: Zone 2 HDMI Audio Query
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
  command: "Z2SLP{time}"
  params:
    - name: time
      type: string
      description: "001–120 by ASCII, 010=10min"

- id: z2slp_query
  label: Zone 2 Sleep Timer Query
  kind: query
  command: "Z2SLP?"
  params: []

- id: z2stby_2h
  label: Zone 2 Auto Standby 2H
  kind: action
  command: "Z2STBY2H"
  params: []

- id: z2stby_4h
  label: Zone 2 Auto Standby 4H
  kind: action
  command: "Z2STBY4H"
  params: []

- id: z2stby_8h
  label: Zone 2 Auto Standby 8H
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

# ── ZONE 3 ──
- id: z3_source
  label: Zone 3 Cancel (Source Same as Main)
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
  label: Zone 3 Select Media Player
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
  label: Zone 3 Select Pandora
  kind: action
  command: "Z3PANDORA"
  params: []

- id: z3_siriusxm
  label: Zone 3 Select SiriusXM
  kind: action
  command: "Z3SIRIUSXM"
  params: []

- id: z3_spotify
  label: Zone 3 Select Spotify
  kind: action
  command: "Z3SPOTIFY"
  params: []

- id: z3_lastfm
  label: Zone 3 Select Last.fm
  kind: action
  command: "Z3LASTFM"
  params: []

- id: z3_flickr
  label: Zone 3 Select Flickr
  kind: action
  command: "Z3FLICKR"
  params: []

- id: z3_iradio
  label: Zone 3 Select iRadio
  kind: action
  command: "Z3IRADIO"
  params: []

- id: z3_server
  label: Zone 3 Select Server
  kind: action
  command: "Z3SERVER"
  params: []

- id: z3_favorites
  label: Zone 3 Select Favorites
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
  label: Zone 3 Select iPod Direct
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
  label: Zone 3 Volume Set Direct
  kind: action
  command: "Z3{level}"
  params:
    - name: level
      type: string
      description: "00–98 by ASCII, 80=0dB, 00=---(MIN)"

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
  label: Zone 3 Channel Stereo
  kind: action
  command: "Z3CSST"
  params: []

- id: z3cs_mono
  label: Zone 3 Channel Mono
  kind: action
  command: "Z3CSMONO"
  params: []

- id: z3cs_query
  label: Zone 3 Channel Setting Query
  kind: query
  command: "Z3CS?"
  params: []

- id: z3cv_fl_up
  label: Zone 3 Channel Volume Front-L Up
  kind: action
  command: "Z3CVFL UP"
  params: []

- id: z3cv_fl_down
  label: Zone 3 Channel Volume Front-L Down
  kind: action
  command: "Z3CVFL DOWN"
  params: []

- id: z3cv_fl_set
  label: Zone 3 Channel Volume Front-L Set
  kind: action
  command: "Z3CVFL {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

- id: z3cv_fr_up
  label: Zone 3 Channel Volume Front-R Up
  kind: action
  command: "Z3CVFR UP"
  params: []

- id: z3cv_fr_down
  label: Zone 3 Channel Volume Front-R Down
  kind: action
  command: "Z3CVFR DOWN"
  params: []

- id: z3cv_fr_set
  label: Zone 3 Channel Volume Front-R Set
  kind: action
  command: "Z3CVFR {level}"
  params:
    - name: level
      type: string
      description: "38–62 by ASCII, 50=0dB"

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
  label: Zone 3 Bass Set Direct
  kind: action
  command: "Z3PSBAS {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 40–60 (or 36–64 on X4100)"

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
  label: Zone 3 Treble Set Direct
  kind: action
  command: "Z3PSTRE {level}"
  params:
    - name: level
      type: string
      description: "00–99 by ASCII; AVR range 40–60 (or 36–64 on X4100)"

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
  command: "Z3SLP{time}"
  params:
    - name: time
      type: string
      description: "001–120 by ASCII, 010=10min"

- id: z3slp_query
  label: Zone 3 Sleep Timer Query
  kind: query
  command: "Z3SLP?"
  params: []

- id: z3stby_2h
  label: Zone 3 Auto Standby 2H
  kind: action
  command: "Z3STBY2H"
  params: []

- id: z3stby_4h
  label: Zone 3 Auto Standby 4H
  kind: action
  command: "Z3STBY4H"
  params: []

- id: z3stby_8h
  label: Zone 3 Auto Standby 8H
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

# ── TUNER (ANALOG) ──
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
  label: Tuner Frequency Set Direct
  kind: action
  command: "TFAN{freq}"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII; e.g. TFAN105000 = 1050.00kHz AM; <050000 is FM"

- id: tf_an_query
  label: Tuner Frequency Query
  kind: query
  command: "TFAN?"
  params: []

- id: tf_an_name_query
  label: Tuner RDS Station Name Query (EU/AP)
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
  label: Tuner Preset Set Direct
  kind: action
  command: "TPAN{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 by ASCII"

- id: tp_an_query
  label: Tuner Preset Query
  kind: query
  command: "TPAN?"
  params: []

- id: tp_an_mem
  label: Tuner Preset Memory
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
      description: "01–56 by ASCII"

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
  label: Tuner Band Query
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

# ── HD RADIO ──
- id: tf_hd_up
  label: HD Radio Frequency Up
  kind: action
  command: "TFHDUP"
  params: []

- id: tf_hd_down
  label: HD Radio Frequency Down
  kind: action
  command: "TFHDDOWN"
  params: []

- id: tf_hd_set
  label: HD Radio Frequency Set Direct
  kind: action
  command: "TFHD{freq}"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII; e.g. TFHD105000 = 1050.00kHz AM"

- id: tf_hd_mc_set
  label: HD Radio Multi Cast Channel Select
  kind: action
  command: "TFHDMC{ch}"
  params:
    - name: ch
      type: string
      description: "1-digit; Multi Cast 1–8, Analog=0"

- id: tf_hd_freq_mc_set
  label: HD Radio Frequency + Multi Cast Select
  kind: action
  command: "TFHD{freq}MC{ch}"
  params:
    - name: freq
      type: string
      description: "6-digit ASCII frequency"
    - name: ch
      type: string
      description: "1-digit Multi Cast channel"

- id: tf_hd_query
  label: HD Radio Frequency Query
  kind: query
  command: "TFHD?"
  params: []

- id: tp_hd_up
  label: HD Radio Preset Up
  kind: action
  command: "TPHDUP"
  params: []

- id: tp_hd_down
  label: HD Radio Preset Down
  kind: action
  command: "TPHDDOWN"
  params: []

- id: tp_hd_set
  label: HD Radio Preset Set Direct
  kind: action
  command: "TPHD{preset}"
  params:
    - name: preset
      type: string
      description: "01–56 by ASCII"

- id: tp_hd_query
  label: HD Radio Preset Query
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
      description: "01–56 by ASCII"

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

- id: tm_hd_auto_hd
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

- id: tm_hd_ana_auto
  label: HD Radio Tuning Mode ANALOG AUTO
  kind: action
  command: "TMHDANAAUTO"
  params: []

- id: tm_hd_ana_manu
  label: HD Radio Tuning Mode ANALOG MANUAL
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

# ── ONLINE MUSIC / USB / iPod / BLUETOOTH NAVIGATION (NS) ──
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

- id: ns_cursor_left
  label: NS Cursor Left
  kind: action
  command: "NS92"
  params: []

- id: ns_cursor_right
  label: NS Cursor Right
  kind: action
  command: "NS93"
  params: []

- id: ns_enter
  label: NS Enter / Play / Pause
  kind: action
  command: "NS94"
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

- id: ns_manual_search_plus
  label: NS Manual Search Plus
  kind: action
  command: "NS9F"
  params: []

- id: ns_manual_search_minus
  label: NS Manual Search Minus
  kind: action
  command: "NS9G"
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
  label: NS Random On / Shuffle Songs
  kind: action
  command: "NS9K"
  params: []

- id: ns_random_off
  label: NS Random Off / Shuffle Off
  kind: action
  command: "NS9M"
  params: []

- id: ns_toggle_ipod_onscreen
  label: NS Toggle iPod/On-Screen Mode
  kind: action
  command: "NS9W"
  params: []

- id: ns_page_next
  label: NS Page Next
  kind: action
  command: "NS9X"
  params: []

- id: ns_page_prev
  label: NS Page Previous
  kind: action
  command: "NS9Y"
  params: []

- id: ns_manual_search_stop
  label: NS Manual Search Stop
  kind: action
  command: "NS9Z"
  params: []

- id: ns_repeat_toggle
  label: NS Repeat Toggle
  kind: action
  command: "NSRPT"
  params: []

- id: ns_random_toggle
  label: NS Random Toggle
  kind: action
  command: "NSRND"
  params: []

- id: ns_preset_call
  label: NS Preset Call
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "00–35 (2014 AVR)"

- id: ns_preset_memory
  label: NS Preset Memory
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "00–35 (2014 AVR)"

- id: ns_preset_name_query
  label: NS Net Audio Preset Names Query
  kind: query
  command: "NSH"
  params: []

- id: ns_fv_mem
  label: NS Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []

- id: ns_onscreen_ascii_query
  label: NS Onscreen Display List (ASCII)
  kind: query
  command: "NSA"
  params: []

- id: ns_onscreen_utf8_query
  label: NS Onscreen Display List (UTF-8)
  kind: query
  command: "NSE"
  params: []

# ── SYSTEM MENU (MN) ──
- id: mn_cup
  label: Menu Cursor Up
  kind: action
  command: "MNCUP"
  params: []

- id: mn_cdn
  label: Menu Cursor Down
  kind: action
  command: "MNCDN"
  params: []

- id: mn_clt
  label: Menu Cursor Left
  kind: action
  command: "MNCLT"
  params: []

- id: mn_crt
  label: Menu Cursor Right
  kind: action
  command: "MNCRT"
  params: []

- id: mn_ent
  label: Menu Enter
  kind: action
  command: "MNENT"
  params: []

- id: mn_rtn
  label: Menu Return
  kind: action
  command: "MNRTN"
  params: []

- id: mn_opt
  label: Menu Option
  kind: action
  command: "MNOPT"
  params: []

- id: mn_inf
  label: Menu Info
  kind: action
  command: "MNINF"
  params: []

- id: mn_chl
  label: Menu Channel Level Adjust Toggle
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

# ── SYSTEM (SY) ──
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
  label: Panel Lock On (Except Master Vol)
  kind: action
  command: "SYPANEL LOCK ON"
  params: []

- id: sy_panel_v_lock_on
  label: Panel + Master Vol Lock On
  kind: action
  command: "SYPANEL+V LOCK ON"
  params: []

- id: sy_panel_lock_off
  label: Panel Lock Off
  kind: action
  command: "SYPANEL LOCK OFF"
  params: []

# ── TRIGGER (TR) ──
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

# ── UPGRADE (UG) ──
- id: ug_idn
  label: Display Upgrade ID Number
  kind: action
  command: "UGIDN"
  params: []

# ── REMOTE MAINTENANCE (RM) ──
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

# ── DIMMER (DIM) ──
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
  label: Dimmer Status Query
  kind: query
  command: "DIM ?"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [ON, STANDBY]
  event: "PW{state}"

- id: master_volume_state
  type: string
  description: "MV{level} — 00–98 or 3-char half-dB e.g. MV795"
  event: "MV{level}"

- id: mute_state
  type: enum
  values: [ON, OFF]
  event: "MU{state}"

- id: input_select_state
  type: string
  description: "SI{source}"
  event: "SI{source}"

- id: main_zone_state
  type: enum
  values: [ON, OFF]
  event: "ZM{state}"

- id: surround_mode_state
  type: string
  description: "MS{mode}"
  event: "MS{mode}"

- id: channel_volume_state
  type: string
  description: "CV{ch} {level} — multiple per query response, terminated by CVEND"
  event: "CV{ch} {level}"

- id: zone2_state
  type: string
  description: "Z2{source-or-level}"
  event: "Z2{state}"

- id: zone3_state
  type: string
  description: "Z3{source-or-level}"
  event: "Z3{state}"

- id: sleep_timer_state
  type: string
  description: "SLP{time} or SLPOFF"
  event: "SLP{state}"

- id: eco_state
  type: enum
  values: [ON, AUTO, OFF]
  event: "ECO{state}"

- id: hd_radio_signal_level
  type: enum
  values: ["HDSIG LEV 0", "HDSIG LEV 1", "HDSIG LEV 2", "HDSIG LEV 3", "HDSIG LEV 4", "HDSIG LEV 5", "HDSIG LEV 6"]
  event: "HDSIG LEV {n}"

- id: trigger_state
  type: string
  description: "TR1 ON/OFF, TR2 ON/OFF"
  event: "TR{n} {state}"
```

## Variables
```yaml
# UNRESOLVED: no settable variable section distinct from action parameters in source
```

## Events
```yaml
# Per source protocol spec, EVENT messages are unsolicited notifications sent within
# 5 seconds of a state change. EVENT format is identical to RESPONSE format.
# Key unsolicited events:
- id: event_power
  description: "PWON or PWSTANDBY — sent when power state changes"
- id: event_master_volume
  description: "MV{level} — sent when master volume changes"
- id: event_mute
  description: "MU{ON|OFF} — sent when mute state changes"
- id: event_input
  description: "SI{source} — sent when input source changes"
- id: event_surround_mode
  description: "MS{mode} — sent when surround mode changes; previous mode sent first"
- id: event_channel_volume
  description: "CV{ch} {level} blocks — sent when input or surround mode changes channel volumes"
- id: event_zone2
  description: "Z2{state} — sent when zone 2 changes"
- id: event_zone3
  description: "Z3{state} — sent when zone 3 changes"
- id: event_hd_status
  description: "HD metadata events (HDST NAME, HDSIG LEV, HDARTIST, HDTITLE, etc.)"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "After transmitting PWON, wait at least 1 second before sending the next command"
    source_quote: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)"
  - description: "Send commands at 50ms or greater intervals"
    source_quote: "Send the COMMAND in 50ms or more intervals"
```

## Notes
- Command format: COMMAND (2 ASCII chars) + PARAMETER (up to 25 ASCII chars) + CR (0x0D).
- Volume uses a scale where 80=0dB, 00=minimum (---). Half-dB steps use 3-character parameters (e.g., MV795 = -0.5dB).
- Channel volume scale: 50=0dB, range 38–62 (some channels accept 00 for minimum).
- At 0.5dB volume steps, the 3rd character is always "5" (e.g., MV805).
- CHANNEL VOLUME EVENT responses are terminated by CVEND (per source: "CVEND<CR>").
- The "**" wildcard in source tables denotes a numeric parameter; these are rendered as `{level}` or similar in action command templates.
- All query commands use the "?" suffix: e.g., PW?, MV?, SI?.
- Source document covers a family of AVR models (AVR-X1100, S700, S70, X4100, 2014 AVR). DCM-5000 applicability not confirmed by source.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: DCM-5000 model not listed in source compatibility matrix -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T09:03:22.437Z
last_checked_at: 2026-06-02T21:41:25.188Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:25.188Z
matched_actions: 856
action_count: 856
confidence: medium
summary: "All 856 spec actions matched verbatim in source; SR source-select variants (SRPHONO/CD/etc.) exist in source but spec maps only SRSOURCE; coverage ratio 856/883≈0.97 exceeds 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- SRPHONO
- SRCD
- SRTUNER
- SRDVD
- SRBD
- SRTV
- SRSAT/CBL
- SRMPLAY
- SRGAME
- SRAUX1
- SRAUX2
- SRAUX3
- "source document is titled \"Denon AVR Control Protocol Ver.06\" and covers a family of AVR models (AVR-X1100, S700, S70, X4100, 2014 AVR). Operator labelled this spec for device \"DCM-5000\"; that model is not enumerated in the source matrix. Spec captures the protocol verbatim; physical-device applicability for DCM-5000 not verified by source."
- "no settable variable section distinct from action parameters in source"
- "no explicit multi-step macros documented in source"
- "firmware version compatibility not stated in source"
- "DCM-5000 model not listed in source compatibility matrix"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
