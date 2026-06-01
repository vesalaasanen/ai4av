---
spec_id: admin/denon-dn-500r-700r
schema_version: ai4av-public-spec-v1
revision: 1
title: "Denon AVR Control Spec"
manufacturer: Denon
model_family: "denon dn 500r 700r"
aliases: []
compatible_with:
  manufacturers:
    - Denon
  models: []
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-27T06:51:55.254Z
generated_at: 2026-05-27T06:51:55.254Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-27T06:51:55.254Z
  matched_actions: 865
  action_count: 865
  confidence: high
  summary: "All 865 spec actions have literal wire matches in source; transport confirmed; comprehensive coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Denon AVR Control Spec

## Summary
Denon AV receiver control protocol via RS-232C and Ethernet (TCP port 23, Telnet). ASCII command-based, half-duplex, 9600bps serial. Commands terminated by CR (0x0D). Supports main zone, zone2, zone3, tuner, HD Radio, network streaming, and system control. No authentication required.

<!-- UNRESOLVED: source document is an AVR protocol (multi-zone receiver with surround modes); input model "DN 500R/700R" does not appear in source — models field left empty. -->

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
- powerable       # PW, ZM, Z2, Z3 power commands present
- routable        # SI, Z2, Z3 input routing commands present
- queryable       # ? suffix commands (PW?, MV?, SI?, etc.) present
- levelable       # MV, CV, PS tone controls present
```

## Actions

### Power (PW)
```yaml
- id: pw_on
  label: Power On
  kind: action
  params: []
- id: pw_standby
  label: Power Standby
  kind: action
  params: []
- id: pw_status_query
  label: Power Status Query
  kind: query
  params: []
```

### Master Volume (MV)
```yaml
- id: mv_up
  label: Master Volume Up
  kind: action
  params: []
- id: mv_down
  label: Master Volume Down
  kind: action
  params: []
- id: mv_set
  label: Master Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char: 00 (min) to 98 (+18dB), 80=0dB. 0.5dB steps use 3-char (e.g. MV805 = +0.5dB, MV795 = -0.5dB)
- id: mv_status_query
  label: Master Volume Status Query
  kind: query
  params: []
```

### Channel Volume (CV) — Main Zone
```yaml
# Each channel: UP / DOWN / ** (set) / ? (query)
# Range: 38-62 ASCII (50=0dB); SUBWOOFER SW also accepts 00.
# Channels: FL, FR, C, SW, SW2, SL, SR, SBL, SBR, SB, FHL, FHR, FWL, FWR,
#           TFL, TFR, TML, TMR, TRL, TRR, RHL, RHR, FDL, FDR, SDL, SDR, BDL, BDR, SHL, SHR, TS
- id: cvfl_up
  label: Front Left Channel Volume Up
  kind: action
  params: []
- id: cvfl_down
  label: Front Left Channel Volume Down
  kind: action
  params: []
- id: cvfl_set
  label: Front Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfl_query
  label: Front Left Channel Volume Query
  kind: query
  params: []
- id: cvfr_up
  label: Front Right Channel Volume Up
  kind: action
  params: []
- id: cvfr_down
  label: Front Right Channel Volume Down
  kind: action
  params: []
- id: cvfr_set
  label: Front Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfr_query
  label: Front Right Channel Volume Query
  kind: query
  params: []
- id: cvc_up
  label: Center Channel Volume Up
  kind: action
  params: []
- id: cvc_down
  label: Center Channel Volume Down
  kind: action
  params: []
- id: cvc_set
  label: Center Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvc_query
  label: Center Channel Volume Query
  kind: query
  params: []
- id: cvsw_up
  label: Subwoofer Channel Volume Up
  kind: action
  params: []
- id: cvsw_down
  label: Subwoofer Channel Volume Down
  kind: action
  params: []
- id: cvsw_set
  label: Subwoofer Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 00,38-62, 50=0dB
- id: cvsw_query
  label: Subwoofer Channel Volume Query
  kind: query
  params: []
- id: cvsw2_up
  label: Subwoofer 2 Channel Volume Up
  kind: action
  params: []
- id: cvsw2_down
  label: Subwoofer 2 Channel Volume Down
  kind: action
  params: []
- id: cvsw2_set
  label: Subwoofer 2 Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 00,38-62, 50=0dB
- id: cvsw2_query
  label: Subwoofer 2 Channel Volume Query
  kind: query
  params: []
- id: cvsl_up
  label: Surround Left Channel Volume Up
  kind: action
  params: []
- id: cvsl_down
  label: Surround Left Channel Volume Down
  kind: action
  params: []
- id: cvsl_set
  label: Surround Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsl_query
  label: Surround Left Channel Volume Query
  kind: query
  params: []
- id: cvsr_up
  label: Surround Right Channel Volume Up
  kind: action
  params: []
- id: cvsr_down
  label: Surround Right Channel Volume Down
  kind: action
  params: []
- id: cvsr_set
  label: Surround Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsr_query
  label: Surround Right Channel Volume Query
  kind: query
  params: []
- id: cvsbl_up
  label: Surround Back Left Channel Volume Up
  kind: action
  params: []
- id: cvsbl_down
  label: Surround Back Left Channel Volume Down
  kind: action
  params: []
- id: cvsbl_set
  label: Surround Back Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsbl_query
  label: Surround Back Left Channel Volume Query
  kind: query
  params: []
- id: cvsbr_up
  label: Surround Back Right Channel Volume Up
  kind: action
  params: []
- id: cvsbr_down
  label: Surround Back Right Channel Volume Down
  kind: action
  params: []
- id: cvsbr_set
  label: Surround Back Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsbr_query
  label: Surround Back Right Channel Volume Query
  kind: query
  params: []
- id: cvsb_up
  label: Surround Back Channel Volume Up
  kind: action
  params: []
- id: cvsb_down
  label: Surround Back Channel Volume Down
  kind: action
  params: []
- id: cvsb_set
  label: Surround Back Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsb_query
  label: Surround Back Channel Volume Query
  kind: query
  params: []
- id: cvfhl_up
  label: Front Height Left Channel Volume Up
  kind: action
  params: []
- id: cvfhl_down
  label: Front Height Left Channel Volume Down
  kind: action
  params: []
- id: cvfhl_set
  label: Front Height Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfhl_query
  label: Front Height Left Channel Volume Query
  kind: query
  params: []
- id: cvfhr_up
  label: Front Height Right Channel Volume Up
  kind: action
  params: []
- id: cvfhr_down
  label: Front Height Right Channel Volume Down
  kind: action
  params: []
- id: cvfhr_set
  label: Front Height Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfhr_query
  label: Front Height Right Channel Volume Query
  kind: query
  params: []
- id: cvfwl_up
  label: Front Wide Left Channel Volume Up
  kind: action
  params: []
- id: cvfwl_down
  label: Front Wide Left Channel Volume Down
  kind: action
  params: []
- id: cvfwl_set
  label: Front Wide Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfwl_query
  label: Front Wide Left Channel Volume Query
  kind: query
  params: []
- id: cvfwr_up
  label: Front Wide Right Channel Volume Up
  kind: action
  params: []
- id: cvfwr_down
  label: Front Wide Right Channel Volume Down
  kind: action
  params: []
- id: cvfwr_set
  label: Front Wide Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfwr_query
  label: Front Wide Right Channel Volume Query
  kind: query
  params: []
- id: cvtfl_up
  label: Top Front Left Channel Volume Up
  kind: action
  params: []
- id: cvtfl_down
  label: Top Front Left Channel Volume Down
  kind: action
  params: []
- id: cvtfl_set
  label: Top Front Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtfl_query
  label: Top Front Left Channel Volume Query
  kind: query
  params: []
- id: cvtfr_up
  label: Top Front Right Channel Volume Up
  kind: action
  params: []
- id: cvtfr_down
  label: Top Front Right Channel Volume Down
  kind: action
  params: []
- id: cvtfr_set
  label: Top Front Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtfr_query
  label: Top Front Right Channel Volume Query
  kind: query
  params: []
- id: cvtml_up
  label: Top Middle Left Channel Volume Up
  kind: action
  params: []
- id: cvtml_down
  label: Top Middle Left Channel Volume Down
  kind: action
  params: []
- id: cvtml_set
  label: Top Middle Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtml_query
  label: Top Middle Left Channel Volume Query
  kind: query
  params: []
- id: cvtmr_up
  label: Top Middle Right Channel Volume Up
  kind: action
  params: []
- id: cvtmr_down
  label: Top Middle Right Channel Volume Down
  kind: action
  params: []
- id: cvtmr_set
  label: Top Middle Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtmr_query
  label: Top Middle Right Channel Volume Query
  kind: query
  params: []
- id: cvtrl_up
  label: Top Rear Left Channel Volume Up
  kind: action
  params: []
- id: cvtrl_down
  label: Top Rear Left Channel Volume Down
  kind: action
  params: []
- id: cvtrl_set
  label: Top Rear Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtrl_query
  label: Top Rear Left Channel Volume Query
  kind: query
  params: []
- id: cvtrr_up
  label: Top Rear Right Channel Volume Up
  kind: action
  params: []
- id: cvtrr_down
  label: Top Rear Right Channel Volume Down
  kind: action
  params: []
- id: cvtrr_set
  label: Top Rear Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvtrr_query
  label: Top Rear Right Channel Volume Query
  kind: query
  params: []
- id: cvrhl_up
  label: Rear Height Left Channel Volume Up
  kind: action
  params: []
- id: cvrhl_down
  label: Rear Height Left Channel Volume Down
  kind: action
  params: []
- id: cvrhl_set
  label: Rear Height Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvrhl_query
  label: Rear Height Left Channel Volume Query
  kind: query
  params: []
- id: cvrhr_up
  label: Rear Height Right Channel Volume Up
  kind: action
  params: []
- id: cvrhr_down
  label: Rear Height Right Channel Volume Down
  kind: action
  params: []
- id: cvrhr_set
  label: Rear Height Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvrhr_query
  label: Rear Height Right Channel Volume Query
  kind: query
  params: []
- id: cvfdl_up
  label: Front Dolby Left Channel Volume Up
  kind: action
  params: []
- id: cvfdl_down
  label: Front Dolby Left Channel Volume Down
  kind: action
  params: []
- id: cvfdl_set
  label: Front Dolby Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfdl_query
  label: Front Dolby Left Channel Volume Query
  kind: query
  params: []
- id: cvfdr_up
  label: Front Dolby Right Channel Volume Up
  kind: action
  params: []
- id: cvfdr_down
  label: Front Dolby Right Channel Volume Down
  kind: action
  params: []
- id: cvfdr_set
  label: Front Dolby Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvfdr_query
  label: Front Dolby Right Channel Volume Query
  kind: query
  params: []
- id: cvsdl_up
  label: Surround Dolby Left Channel Volume Up
  kind: action
  params: []
- id: cvsdl_down
  label: Surround Dolby Left Channel Volume Down
  kind: action
  params: []
- id: cvsdl_set
  label: Surround Dolby Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsdl_query
  label: Surround Dolby Left Channel Volume Query
  kind: query
  params: []
- id: cvsdr_up
  label: Surround Dolby Right Channel Volume Up
  kind: action
  params: []
- id: cvsdr_down
  label: Surround Dolby Right Channel Volume Down
  kind: action
  params: []
- id: cvsdr_set
  label: Surround Dolby Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvsdr_query
  label: Surround Dolby Right Channel Volume Query
  kind: query
  params: []
- id: cvbdl_up
  label: Back Dolby Left Channel Volume Up
  kind: action
  params: []
- id: cvbdl_down
  label: Back Dolby Left Channel Volume Down
  kind: action
  params: []
- id: cvbdl_set
  label: Back Dolby Left Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvbdl_query
  label: Back Dolby Left Channel Volume Query
  kind: query
  params: []
- id: cvbdr_up
  label: Back Dolby Right Channel Volume Up
  kind: action
  params: []
- id: cvbdr_down
  label: Back Dolby Right Channel Volume Down
  kind: action
  params: []
- id: cvbdr_set
  label: Back Dolby Right Channel Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvbdr_query
  label: Back Dolby Right Channel Volume Query
  kind: query
  params: []
- id: cvshl_up
  label: Surround Height Left Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: cvshl_down
  label: Surround Height Left Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: cvshl_set
  label: Surround Height Left Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvshl_query
  label: Surround Height Left Channel Volume Query (Auro-3D)
  kind: query
  params: []
- id: cvshr_up
  label: Surround Height Right Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: cvshr_down
  label: Surround Height Right Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: cvshr_set
  label: Surround Height Right Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvshr_query
  label: Surround Height Right Channel Volume Query (Auro-3D)
  kind: query
  params: []
- id: cvts_up
  label: Top Surround Channel Volume Up (Auro-3D)
  kind: action
  params: []
- id: cvts_down
  label: Top Surround Channel Volume Down (Auro-3D)
  kind: action
  params: []
- id: cvts_set
  label: Top Surround Channel Volume Set (Auro-3D)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 2-char 38-62, 50=0dB
- id: cvts_query
  label: Top Surround Channel Volume Query (Auro-3D)
  kind: query
  params: []
- id: cvzrl_reset
  label: Reset All Channel Levels to Factory Defaults
  kind: action
  params: []
- id: cv_query
  label: Channel Volume Status Query
  kind: query
  params: []
```

### Mute (MU)
```yaml
- id: mu_on
  label: Mute On
  kind: action
  params: []
- id: mu_off
  label: Mute Off
  kind: action
  params: []
- id: mu_query
  label: Mute Status Query
  kind: query
  params: []
```

### Select Input (SI)
```yaml
- id: si_phono
  label: Select Input Phono
  kind: action
  params: []
- id: si_cd
  label: Select Input CD
  kind: action
  params: []
- id: si_tuner
  label: Select Input Tuner
  kind: action
  params: []
- id: si_dvd
  label: Select Input DVD
  kind: action
  params: []
- id: si_bd
  label: Select Input Blu-ray
  kind: action
  params: []
- id: si_tv
  label: Select Input TV Audio
  kind: action
  params: []
- id: si_sat_cbl
  label: Select Input Cable/Satellite
  kind: action
  params: []
- id: si_mplay
  label: Select Input Media Player
  kind: action
  params: []
- id: si_game
  label: Select Input Game
  kind: action
  params: []
- id: si_hdradio
  label: Select Input HD Radio
  kind: action
  params: []
- id: si_net
  label: Select Input Network/Online Music
  kind: action
  params: []
- id: si_pandora
  label: Select Input Pandora
  kind: action
  params: []
- id: si_siriusxm
  label: Select Input SiriusXM
  kind: action
  params: []
- id: si_spotify
  label: Select Input Spotify
  kind: action
  params: []
- id: si_lastfm
  label: Select Input Last.fm
  kind: action
  params: []
- id: si_flickr
  label: Select Input Flickr
  kind: action
  params: []
- id: si_iradio
  label: Select Input Internet Radio
  kind: action
  params: []
- id: si_server
  label: Select Input Media Server
  kind: action
  params: []
- id: si_favorites
  label: Select Input Favorites
  kind: action
  params: []
- id: si_aux1
  label: Select Input Aux 1
  kind: action
  params: []
- id: si_aux2
  label: Select Input Aux 2
  kind: action
  params: []
- id: si_aux3
  label: Select Input Aux 3
  kind: action
  params: []
- id: si_aux4
  label: Select Input Aux 4
  kind: action
  params: []
- id: si_aux5
  label: Select Input Aux 5
  kind: action
  params: []
- id: si_aux6
  label: Select Input Aux 6
  kind: action
  params: []
- id: si_aux7
  label: Select Input Aux 7
  kind: action
  params: []
- id: si_bt
  label: Select Input Bluetooth
  kind: action
  params: []
- id: si_usb_ipod
  label: Select Input USB/iPod
  kind: action
  params: []
- id: si_ipd
  label: Select Input iPod Direct
  kind: action
  params: []
- id: si_irp
  label: Select Input iRadio Recent Play
  kind: action
  params: []
- id: si_fvp
  label: Select Input Favorites Play
  kind: action
  params: []
- id: si_query
  label: Input Source Status Query
  kind: query
  params: []
```

### Main Zone (ZM)
```yaml
- id: zm_on
  label: Main Zone On
  kind: action
  params: []
- id: zm_off
  label: Main Zone Off
  kind: action
  params: []
- id: zm_query
  label: Main Zone Status Query
  kind: query
  params: []
- id: zm_favorite1
  label: Main Zone Favorite 1
  kind: action
  params: []
- id: zm_favorite2
  label: Main Zone Favorite 2
  kind: action
  params: []
- id: zm_favorite3
  label: Main Zone Favorite 3
  kind: action
  params: []
- id: zm_favorite4
  label: Main Zone Favorite 4
  kind: action
  params: []
- id: zm_favorite1_memory
  label: Main Zone Favorite 1 Memory
  kind: action
  params: []
- id: zm_favorite2_memory
  label: Main Zone Favorite 2 Memory
  kind: action
  params: []
- id: zm_favorite3_memory
  label: Main Zone Favorite 3 Memory
  kind: action
  params: []
- id: zm_favorite4_memory
  label: Main Zone Favorite 4 Memory
  kind: action
  params: []
```

### Record Select (SR)
```yaml
- id: sr_phono
  label: Record Select Phono
  kind: action
  params: []
- id: sr_ipod
  label: Record Select iPod
  kind: action
  params: []
- id: sr_usb_direct
  label: Record Select USB Direct
  kind: action
  params: []
- id: sr_ipod_direct
  label: Record Select iPod Direct
  kind: action
  params: []
- id: sr_source
  label: Record Select Source
  kind: action
  params: []
- id: sr_query
  label: Record Select Status Query
  kind: query
  params: []
```

### Select Digital Input (SD)
```yaml
- id: sd_auto
  label: Digital Input Auto
  kind: action
  params: []
- id: sd_hdmi
  label: Digital Input Force HDMI
  kind: action
  params: []
- id: sd_digital
  label: Digital Input Force Digital
  kind: action
  params: []
- id: sd_analog
  label: Digital Input Force Analog
  kind: action
  params: []
- id: sd_ext_in
  label: Digital Input External In
  kind: action
  params: []
- id: sd_7_1in
  label: Digital Input 7.1ch In
  kind: action
  params: []
- id: sd_no
  label: Digital Input Off
  kind: action
  params: []
- id: sd_query
  label: Digital Input Status Query
  kind: query
  params: []
- id: sd_arc
  label: Digital Input ARC
  kind: action
  params: []
```

### Digital Input Codec (DC)
```yaml
- id: dc_auto
  label: Digital Input Codec Auto
  kind: action
  params: []
- id: dc_pcm
  label: Digital Input Codec Force PCM
  kind: action
  params: []
- id: dc_dts
  label: Digital Input Codec Force DTS
  kind: action
  params: []
- id: dc_query
  label: Digital Input Codec Status Query
  kind: query
  params: []
```

### Video Select (SV)
```yaml
- id: sv_dvd
  label: Video Select DVD
  kind: action
  params: []
- id: sv_bd
  label: Video Select Blu-ray
  kind: action
  params: []
- id: sv_tv
  label: Video Select TV
  kind: action
  params: []
- id: sv_sat_cbl
  label: Video Select Cable/Satellite
  kind: action
  params: []
- id: sv_mplay
  label: Video Select Media Player
  kind: action
  params: []
- id: sv_game
  label: Video Select Game
  kind: action
  params: []
- id: sv_aux1
  label: Video Select Aux 1
  kind: action
  params: []
- id: sv_aux2
  label: Video Select Aux 2
  kind: action
  params: []
- id: sv_aux3
  label: Video Select Aux 3
  kind: action
  params: []
- id: sv_aux4
  label: Video Select Aux 4
  kind: action
  params: []
- id: sv_aux5
  label: Video Select Aux 5
  kind: action
  params: []
- id: sv_aux6
  label: Video Select Aux 6
  kind: action
  params: []
- id: sv_aux7
  label: Video Select Aux 7
  kind: action
  params: []
- id: sv_cd
  label: Video Select CD
  kind: action
  params: []
- id: sv_source
  label: Video Select Source (cancel)
  kind: action
  params: []
- id: sv_on
  label: Video Select On
  kind: action
  params: []
- id: sv_off
  label: Video Select Off
  kind: action
  params: []
- id: sv_query
  label: Video Select Status Query
  kind: query
  params: []
```

### Sleep Timer (SLP)
```yaml
- id: slp_off
  label: Sleep Timer Off
  kind: action
  params: []
- id: slp_set
  label: Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120 (ASCII), 010=10min
- id: slp_query
  label: Sleep Timer Status Query
  kind: query
  params: []
```

### Auto Standby (STBY)
```yaml
- id: stby_15m
  label: Auto Standby 15 Minutes
  kind: action
  params: []
- id: stby_30m
  label: Auto Standby 30 Minutes
  kind: action
  params: []
- id: stby_60m
  label: Auto Standby 60 Minutes
  kind: action
  params: []
- id: stby_off
  label: Auto Standby Off
  kind: action
  params: []
- id: stby_query
  label: Auto Standby Status Query
  kind: query
  params: []
```

### ECO Mode (ECO)
```yaml
- id: eco_on
  label: ECO Mode On
  kind: action
  params: []
- id: eco_auto
  label: ECO Mode Auto
  kind: action
  params: []
- id: eco_off
  label: ECO Mode Off
  kind: action
  params: []
- id: eco_query
  label: ECO Mode Status Query
  kind: query
  params: []
```

### Surround Mode (MS)
```yaml
- id: ms_movie
  label: Surround Mode Movie
  kind: action
  params: []
- id: ms_music
  label: Surround Mode Music
  kind: action
  params: []
- id: ms_game
  label: Surround Mode Game
  kind: action
  params: []
- id: ms_direct
  label: Surround Mode Direct
  kind: action
  params: []
- id: ms_dsd_direct
  label: Surround Mode DSD Direct
  kind: action
  params: []
- id: ms_pure_direct
  label: Surround Mode Pure Direct
  kind: action
  params: []
- id: ms_dsd_pure_direct
  label: Surround Mode DSD Pure Direct
  kind: action
  params: []
- id: ms_stereo
  label: Surround Mode Stereo
  kind: action
  params: []
- id: ms_auto
  label: Surround Mode Auto
  kind: action
  params: []
- id: ms_dolby_digital
  label: Surround Mode Dolby Digital
  kind: action
  params: []
- id: ms_dolby_pl
  label: Surround Mode Dolby Pro Logic
  kind: action
  params: []
- id: ms_dolby_pl2x
  label: Surround Mode Dolby PL2x
  kind: action
  params: []
- id: ms_dolby_pl2z_h
  label: Surround Mode Dolby PL2z Height
  kind: action
  params: []
- id: ms_dolby_surround
  label: Surround Mode Dolby Surround
  kind: action
  params: []
- id: ms_dolby_atmos
  label: Surround Mode Dolby Atmos
  kind: action
  params: []
- id: ms_dolby_d_ex
  label: Surround Mode Dolby D-EX
  kind: action
  params: []
- id: ms_dolby_d_pl2x
  label: Surround Mode Dolby D+PL2x
  kind: action
  params: []
- id: ms_dolby_d_pl2z_h
  label: Surround Mode Dolby D+PL2z H
  kind: action
  params: []
- id: ms_dolby_d_ds
  label: Surround Mode Dolby D+DS
  kind: action
  params: []
- id: ms_dolby_d_neo_x
  label: Surround Mode Dolby D+NEO:X
  kind: action
  params: []
- id: ms_dts_surround
  label: Surround Mode DTS Surround
  kind: action
  params: []
- id: ms_dts_es
  label: Surround Mode DTS ES
  kind: action
  params: []
- id: ms_dts_pl2x
  label: Surround Mode DTS+PL2x
  kind: action
  params: []
- id: ms_dts_ds
  label: Surround Mode DTS+DS
  kind: action
  params: []
- id: ms_dts96_24
  label: Surround Mode DTS 96/24
  kind: action
  params: []
- id: ms_dts_neo6
  label: Surround Mode DTS+NEO:6
  kind: action
  params: []
- id: ms_dts_neo_x
  label: Surround Mode DTS+NEO:X
  kind: action
  params: []
- id: ms_multi_ch_in
  label: Surround Mode Multi Channel In
  kind: action
  params: []
- id: ms_multi_ch_in_7_1
  label: Surround Mode Multi Channel In 7.1
  kind: action
  params: []
- id: ms_dolby_dplus
  label: Surround Mode Dolby D+
  kind: action
  params: []
- id: ms_dolby_hd
  label: Surround Mode Dolby HD
  kind: action
  params: []
- id: ms_dts_hd
  label: Surround Mode DTS HD
  kind: action
  params: []
- id: ms_dts_hd_mstr
  label: Surround Mode DTS HD MSTR
  kind: action
  params: []
- id: ms_dts_express
  label: Surround Mode DTS Express
  kind: action
  params: []
- id: ms_dts_es_8ch
  label: Surround Mode DTS ES 8ch Discrete
  kind: action
  params: []
- id: ms_mpeg2_aac
  label: Surround Mode MPEG2 AAC
  kind: action
  params: []
- id: ms_aac
  label: Surround Mode AAC
  kind: action
  params: []
- id: ms_audyssey_dsx
  label: Surround Mode Audyssey DSX
  kind: action
  params: []
- id: ms_auro3d
  label: Surround Mode Auro-3D
  kind: action
  params: []
- id: ms_auro2dsurr
  label: Surround Mode Auro-2D Surround
  kind: action
  params: []
- id: ms_mch_stereo
  label: Surround Mode Multi-Channel Stereo
  kind: action
  params: []
- id: ms_wide_screen
  label: Surround Mode Wide Screen
  kind: action
  params: []
- id: ms_super_stadium
  label: Surround Mode Super Stadium
  kind: action
  params: []
- id: ms_rock_arena
  label: Surround Mode Rock Arena
  kind: action
  params: []
- id: ms_jazz_club
  label: Surround Mode Jazz Club
  kind: action
  params: []
- id: ms_classic_concert
  label: Surround Mode Classic Concert
  kind: action
  params: []
- id: ms_mono_movie
  label: Surround Mode Mono Movie
  kind: action
  params: []
- id: ms_matrix
  label: Surround Mode Matrix
  kind: action
  params: []
- id: ms_video_game
  label: Surround Mode Video Game
  kind: action
  params: []
- id: ms_virtual
  label: Surround Mode Virtual
  kind: action
  params: []
- id: ms_left
  label: Surround Mode Left
  kind: action
  params: []
- id: ms_right
  label: Surround Mode Right
  kind: action
  params: []
- id: ms_all_zone_stereo
  label: All Zone Stereo
  kind: action
  params: []
- id: ms_quick1
  label: Quick Select 1
  kind: action
  params: []
- id: ms_quick2
  label: Quick Select 2
  kind: action
  params: []
- id: ms_quick3
  label: Quick Select 3
  kind: action
  params: []
- id: ms_quick4
  label: Quick Select 4
  kind: action
  params: []
- id: ms_quick5
  label: Quick Select 5
  kind: action
  params: []
- id: ms_quick1_memory
  label: Quick Select 1 Memory
  kind: action
  params: []
- id: ms_quick2_memory
  label: Quick Select 2 Memory
  kind: action
  params: []
- id: ms_quick3_memory
  label: Quick Select 3 Memory
  kind: action
  params: []
- id: ms_quick4_memory
  label: Quick Select 4 Memory
  kind: action
  params: []
- id: ms_quick5_memory
  label: Quick Select 5 Memory
  kind: action
  params: []
- id: ms_quick_query
  label: Quick Select Status Query
  kind: query
  params: []
- id: ms_query
  label: Surround Mode Status Query
  kind: query
  params: []
```

### Video Settings (VS)
```yaml
- id: vs_aspect_normal
  label: Aspect Ratio Normal (4:3)
  kind: action
  params: []
- id: vs_aspect_full
  label: Aspect Ratio Full (16:9)
  kind: action
  params: []
- id: vs_aspect_query
  label: Aspect Ratio Status Query
  kind: query
  params: []
- id: vs_moni_auto
  label: HDMI Monitor Auto Detection
  kind: action
  params: []
- id: vs_moni1
  label: HDMI Monitor Out-1
  kind: action
  params: []
- id: vs_moni2
  label: HDMI Monitor Out-2
  kind: action
  params: []
- id: vs_moni_query
  label: HDMI Monitor Status Query
  kind: query
  params: []
- id: vs_sc_48p
  label: Resolution 480p/576p
  kind: action
  params: []
- id: vs_sc_10i
  label: Resolution 1080i
  kind: action
  params: []
- id: vs_sc_72p
  label: Resolution 720p
  kind: action
  params: []
- id: vs_sc_10p
  label: Resolution 1080p
  kind: action
  params: []
- id: vs_sc_10p24
  label: Resolution 1080p 24Hz
  kind: action
  params: []
- id: vs_sc_4k
  label: Resolution 4K
  kind: action
  params: []
- id: vs_sc_4kf
  label: Resolution 4K (60/50Hz)
  kind: action
  params: []
- id: vs_sc_auto
  label: Resolution Auto
  kind: action
  params: []
- id: vs_sc_query
  label: Resolution Status Query
  kind: query
  params: []
- id: vs_sch_48p
  label: Resolution 480p/576p (HDMI)
  kind: action
  params: []
- id: vs_sch_10i
  label: Resolution 1080i (HDMI)
  kind: action
  params: []
- id: vs_sch_72p
  label: Resolution 720p (HDMI)
  kind: action
  params: []
- id: vs_sch_10p
  label: Resolution 1080p (HDMI)
  kind: action
  params: []
- id: vs_sch_10p24
  label: Resolution 1080p 24Hz (HDMI)
  kind: action
  params: []
- id: vs_sch_4k
  label: Resolution 4K (HDMI)
  kind: action
  params: []
- id: vs_sch_4kf
  label: Resolution 4K 60/50Hz (HDMI)
  kind: action
  params: []
- id: vs_sch_auto
  label: Resolution Auto (HDMI)
  kind: action
  params: []
- id: vs_sch_query
  label: Resolution HDMI Status Query
  kind: query
  params: []
- id: vs_audio_amp
  label: HDMI Audio Output to AMP
  kind: action
  params: []
- id: vs_audio_tv
  label: HDMI Audio Output to TV
  kind: action
  params: []
- id: vs_audio_query
  label: HDMI Audio Status Query
  kind: query
  params: []
- id: vs_vpm_auto
  label: Video Processing Mode Auto
  kind: action
  params: []
- id: vs_vpm_game
  label: Video Processing Mode Game
  kind: action
  params: []
- id: vs_vpm_movi
  label: Video Processing Mode Movie
  kind: action
  params: []
- id: vs_vpm_query
  label: Video Processing Mode Status Query
  kind: query
  params: []
- id: vs_vst_on
  label: Vertical Stretch On
  kind: action
  params: []
- id: vs_vst_off
  label: Vertical Stretch Off
  kind: action
  params: []
- id: vs_vst_query
  label: Vertical Stretch Status Query
  kind: query
  params: []
```

### Parameter Settings (PS)
```yaml
- id: ps_tone_ctrl_on
  label: Tone Control On
  kind: action
  params: []
- id: ps_tone_ctrl_off
  label: Tone Control Off
  kind: action
  params: []
- id: ps_tone_ctrl_query
  label: Tone Control Status Query
  kind: query
  params: []
- id: ps_bas_up
  label: Bass Up
  kind: action
  params: []
- id: ps_bas_down
  label: Bass Down
  kind: action
  params: []
- id: ps_bas_set
  label: Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 50=0dB. Range -6 to +6dB (44-56)
- id: ps_bas_query
  label: Bass Status Query
  kind: query
  params: []
- id: ps_tre_up
  label: Treble Up
  kind: action
  params: []
- id: ps_tre_down
  label: Treble Down
  kind: action
  params: []
- id: ps_tre_set
  label: Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 50=0dB. Range -6 to +6dB (44-56)
- id: ps_tre_query
  label: Treble Status Query
  kind: query
  params: []
- id: ps_dil_on
  label: Dialog Level Adjust On
  kind: action
  params: []
- id: ps_dil_off
  label: Dialog Level Adjust Off
  kind: action
  params: []
- id: ps_dil_up
  label: Dialog Level Adjust Up
  kind: action
  params: []
- id: ps_dil_down
  label: Dialog Level Adjust Down
  kind: action
  params: []
- id: ps_dil_set
  label: Dialog Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 38-62, 50=0dB
- id: ps_dil_query
  label: Dialog Level Adjust Status Query
  kind: query
  params: []
- id: ps_swl_on
  label: Subwoofer Level Adjust On
  kind: action
  params: []
- id: ps_swl_off
  label: Subwoofer Level Adjust Off
  kind: action
  params: []
- id: ps_swl_up
  label: Subwoofer Level Adjust Up
  kind: action
  params: []
- id: ps_swl_down
  label: Subwoofer Level Adjust Down
  kind: action
  params: []
- id: ps_swl_set
  label: Subwoofer Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00,38-62, 50=0dB
- id: ps_swl_query
  label: Subwoofer Level Adjust Status Query
  kind: query
  params: []
- id: ps_swl2_up
  label: Subwoofer 2 Level Adjust Up
  kind: action
  params: []
- id: ps_swl2_down
  label: Subwoofer 2 Level Adjust Down
  kind: action
  params: []
- id: ps_swl2_set
  label: Subwoofer 2 Level Adjust Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00,38-62, 50=0dB
- id: ps_swl2_query
  label: Subwoofer 2 Level Adjust Status Query
  kind: query
  params: []
- id: ps_cinema_eq_on
  label: Cinema EQ On
  kind: action
  params: []
- id: ps_cinema_eq_off
  label: Cinema EQ Off
  kind: action
  params: []
- id: ps_cinema_eq_query
  label: Cinema EQ Status Query
  kind: query
  params: []
- id: ps_mode_music
  label: Cinema/Music/Game/PL Mode Music
  kind: action
  params: []
- id: ps_mode_cinema
  label: Cinema/Music/Game/PL Mode Cinema
  kind: action
  params: []
- id: ps_mode_game
  label: Cinema/Music/Game/PL Mode Game
  kind: action
  params: []
- id: ps_mode_pro_logic
  label: Cinema/Music/Game/PL Mode Pro Logic
  kind: action
  params: []
- id: ps_mode_height
  label: Cinema/Music/Game/PL Mode Height (PL2z)
  kind: action
  params: []
- id: ps_mode_query
  label: Cinema/Music/Game/PL Mode Status Query
  kind: query
  params: []
- id: ps_lom_on
  label: Loudness Management On
  kind: action
  params: []
- id: ps_lom_off
  label: Loudness Management Off
  kind: action
  params: []
- id: ps_lom_query
  label: Loudness Management Status Query
  kind: query
  params: []
- id: ps_fh_on
  label: Front Height Output On
  kind: action
  params: []
- id: ps_fh_off
  label: Front Height Output Off
  kind: action
  params: []
- id: ps_fh_query
  label: Front Height Output Status Query
  kind: query
  params: []
- id: ps_sp_fw
  label: Speaker Output Front Wide
  kind: action
  params: []
- id: ps_sp_fh
  label: Speaker Output Front Height
  kind: action
  params: []
- id: ps_sp_sb
  label: Speaker Output Surround Back
  kind: action
  params: []
- id: ps_sp_hw
  label: Speaker Output Height/Wide
  kind: action
  params: []
- id: ps_sp_bh
  label: Speaker Output Back/Height
  kind: action
  params: []
- id: ps_sp_bw
  label: Speaker Output Back/Wide
  kind: action
  params: []
- id: ps_sp_fl
  label: Speaker Output Floor
  kind: action
  params: []
- id: ps_sp_hf
  label: Speaker Output Height Floor
  kind: action
  params: []
- id: ps_sp_fr
  label: Speaker Output Front
  kind: action
  params: []
- id: ps_sp_query
  label: Speaker Output Status Query
  kind: query
  params: []
- id: ps_phg_low
  label: PL2z Height Gain Low
  kind: action
  params: []
- id: ps_phg_mid
  label: PL2z Height Gain Mid
  kind: action
  params: []
- id: ps_phg_hi
  label: PL2z Height Gain High
  kind: action
  params: []
- id: ps_phg_query
  label: PL2z Height Gain Status Query
  kind: query
  params: []
- id: ps_multeq_audyssye
  label: MultEQ Audyssey
  kind: action
  params: []
- id: ps_multeq_byp_lr
  label: MultEQ L/R Bypass
  kind: action
  params: []
- id: ps_multeq_flat
  label: MultEQ Flat
  kind: action
  params: []
- id: ps_multeq_manual
  label: MultEQ Manual
  kind: action
  params: []
- id: ps_multeq_off
  label: MultEQ Off
  kind: action
  params: []
- id: ps_multeq_query
  label: MultEQ Status Query
  kind: query
  params: []
- id: ps_dyneq_on
  label: Dynamic EQ On
  kind: action
  params: []
- id: ps_dyneq_off
  label: Dynamic EQ Off
  kind: action
  params: []
- id: ps_dyneq_query
  label: Dynamic EQ Status Query
  kind: query
  params: []
- id: ps_reflev_0
  label: Reference Level Offset 0dB
  kind: action
  params: []
- id: ps_reflev_5
  label: Reference Level Offset 5dB
  kind: action
  params: []
- id: ps_reflev_10
  label: Reference Level Offset 10dB
  kind: action
  params: []
- id: ps_reflev_15
  label: Reference Level Offset 15dB
  kind: action
  params: []
- id: ps_reflev_query
  label: Reference Level Offset Status Query
  kind: query
  params: []
- id: ps_dynvol_hev
  label: Dynamic Volume Heavy
  kind: action
  params: []
- id: ps_dynvol_med
  label: Dynamic Volume Medium
  kind: action
  params: []
- id: ps_dynvol_lit
  label: Dynamic Volume Light
  kind: action
  params: []
- id: ps_dynvol_off
  label: Dynamic Volume Off
  kind: action
  params: []
- id: ps_dynvol_query
  label: Dynamic Volume Status Query
  kind: query
  params: []
- id: ps_lfc_on
  label: Audyssey LFC On
  kind: action
  params: []
- id: ps_lfc_off
  label: Audyssey LFC Off
  kind: action
  params: []
- id: ps_lfc_query
  label: Audyssey LFC Status Query
  kind: query
  params: []
- id: ps_cntamt_up
  label: Containment Amount Up
  kind: action
  params: []
- id: ps_cntamt_down
  label: Containment Amount Down
  kind: action
  params: []
- id: ps_cntamt_set
  label: Containment Amount Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0. Range 1-7 (01-07)
- id: ps_cntamt_query
  label: Containment Amount Status Query
  kind: query
  params: []
- id: ps_dsx_onhw
  label: Audyssey DSX On (Height+Wide)
  kind: action
  params: []
- id: ps_dsx_onh
  label: Audyssey DSX On (Height)
  kind: action
  params: []
- id: ps_dsx_onw
  label: Audyssey DSX On (Wide)
  kind: action
  params: []
- id: ps_dsx_off
  label: Audyssey DSX Off
  kind: action
  params: []
- id: ps_dsx_query
  label: Audyssey DSX Status Query
  kind: query
  params: []
- id: ps_stw_up
  label: Stage Width Up
  kind: action
  params: []
- id: ps_stw_down
  label: Stage Width Down
  kind: action
  params: []
- id: ps_stw_set
  label: Stage Width Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 50=0dB. Range -10 to +10dB (40-60)
- id: ps_stw_query
  label: Stage Width Status Query
  kind: query
  params: []
- id: ps_sth_up
  label: Stage Height Up
  kind: action
  params: []
- id: ps_sth_down
  label: Stage Height Down
  kind: action
  params: []
- id: ps_sth_set
  label: Stage Height Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 50=0dB. Range -10 to +10dB (40-60)
- id: ps_sth_query
  label: Stage Height Status Query
  kind: query
  params: []
- id: ps_geq_on
  label: Graphic EQ On
  kind: action
  params: []
- id: ps_geq_off
  label: Graphic EQ Off
  kind: action
  params: []
- id: ps_geq_query
  label: Graphic EQ Status Query
  kind: query
  params: []
- id: ps_drc_auto
  label: Dynamic Compression Auto
  kind: action
  params: []
- id: ps_drc_low
  label: Dynamic Compression Low
  kind: action
  params: []
- id: ps_drc_mid
  label: Dynamic Compression Mid
  kind: action
  params: []
- id: ps_drc_hi
  label: Dynamic Compression High
  kind: action
  params: []
- id: ps_drc_off
  label: Dynamic Compression Off
  kind: action
  params: []
- id: ps_drc_query
  label: Dynamic Compression Status Query
  kind: query
  params: []
- id: ps_bsc_up
  label: Bass Sync Up
  kind: action
  params: []
- id: ps_bsc_down
  label: Bass Sync Down
  kind: action
  params: []
- id: ps_bsc_set
  label: Bass Sync Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0. Range 0-16
- id: ps_bsc_query
  label: Bass Sync Status Query
  kind: query
  params: []
- id: ps_deh_off
  label: Dialog Enhancer Off
  kind: action
  params: []
- id: ps_deh_low
  label: Dialog Enhancer Low
  kind: action
  params: []
- id: ps_deh_med
  label: Dialog Enhancer Medium
  kind: action
  params: []
- id: ps_deh_high
  label: Dialog Enhancer High
  kind: action
  params: []
- id: ps_deh_query
  label: Dialog Enhancer Status Query
  kind: query
  params: []
- id: ps_lfe_up
  label: LFE Up
  kind: action
  params: []
- id: ps_lfe_down
  label: LFE Down
  kind: action
  params: []
- id: ps_lfe_set
  label: LFE Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range 0 to -10dB
- id: ps_lfe_query
  label: LFE Status Query
  kind: query
  params: []
- id: ps_lfl_set
  label: LFE Level Direct Set (EXT.IN/7.1CH IN)
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00,05,10,15
- id: ps_lfl_query
  label: LFE Level Status Query
  kind: query
  params: []
- id: ps_eff_on
  label: Effect On
  kind: action
  params: []
- id: ps_eff_off
  label: Effect Off
  kind: action
  params: []
- id: ps_eff_up
  label: Effect Level Up
  kind: action
  params: []
- id: ps_eff_down
  label: Effect Level Down
  kind: action
  params: []
- id: ps_eff_set
  label: Effect Level Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range 1-15
- id: ps_eff_query
  label: Effect Level Status Query
  kind: query
  params: []
- id: ps_del_up
  label: Delay Up
  kind: action
  params: []
- id: ps_del_down
  label: Delay Down
  kind: action
  params: []
- id: ps_del_set
  label: Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: ASCII 000-999ms, 000=0ms. Range 0-300ms (0-60ms: 3ms/step, over 60ms: 10ms/step)
- id: ps_del_query
  label: Delay Status Query
  kind: query
  params: []
- id: ps_pan_on
  label: Panorama On
  kind: action
  params: []
- id: ps_pan_off
  label: Panorama Off
  kind: action
  params: []
- id: ps_pan_query
  label: Panorama Status Query
  kind: query
  params: []
- id: ps_dim_up
  label: Dimension Up
  kind: action
  params: []
- id: ps_dim_down
  label: Dimension Down
  kind: action
  params: []
- id: ps_dim_set
  label: Dimension Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0. Range 0-6
- id: ps_dim_query
  label: Dimension Status Query
  kind: query
  params: []
- id: ps_cen_up
  label: Center Width Up
  kind: action
  params: []
- id: ps_cen_down
  label: Center Width Down
  kind: action
  params: []
- id: ps_cen_set
  label: Center Width Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0. Range 0-7
- id: ps_cen_query
  label: Center Width Status Query
  kind: query
  params: []
- id: ps_cei_up
  label: Center Image Up
  kind: action
  params: []
- id: ps_cei_down
  label: Center Image Down
  kind: action
  params: []
- id: ps_cei_set
  label: Center Image Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0.0. Range 0.0-1.0
- id: ps_cei_query
  label: Center Image Status Query
  kind: query
  params: []
- id: ps_ceg_up
  label: Center Gain Up
  kind: action
  params: []
- id: ps_ceg_down
  label: Center Gain Down
  kind: action
  params: []
- id: ps_ceg_set
  label: Center Gain Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0.0. Range 0.0-1.0
- id: ps_ceg_query
  label: Center Gain Status Query
  kind: query
  params: []
- id: ps_ces_on
  label: Center Spread On
  kind: action
  params: []
- id: ps_ces_off
  label: Center Spread Off
  kind: action
  params: []
- id: ps_ces_query
  label: Center Spread Status Query
  kind: query
  params: []
- id: ps_swr_on
  label: Subwoofer On/Off On
  kind: action
  params: []
- id: ps_swr_off
  label: Subwoofer On/Off Off
  kind: action
  params: []
- id: ps_swr_query
  label: Subwoofer On/Off Status Query
  kind: query
  params: []
- id: ps_rsz_s
  label: Room Size Small
  kind: action
  params: []
- id: ps_rsz_ms
  label: Room Size Medium Small
  kind: action
  params: []
- id: ps_rsz_m
  label: Room Size Medium
  kind: action
  params: []
- id: ps_rsz_ml
  label: Room Size Medium Large
  kind: action
  params: []
- id: ps_rsz_l
  label: Room Size Large
  kind: action
  params: []
- id: ps_rsz_query
  label: Room Size Status Query
  kind: query
  params: []
- id: ps_delay_up
  label: Audio Delay Up
  kind: action
  params: []
- id: ps_delay_down
  label: Audio Delay Down
  kind: action
  params: []
- id: ps_delay_set
  label: Audio Delay Set
  kind: action
  params:
    - name: ms
      type: string
      description: ASCII 000-999ms, 000=0ms. Range 0-200ms
- id: ps_delay_query
  label: Audio Delay Status Query
  kind: query
  params: []
- id: ps_rstr_off
  label: Audio Restorer Off
  kind: action
  params: []
- id: ps_rstr_low
  label: Audio Restorer Low (Mode 3)
  kind: action
  params: []
- id: ps_rstr_med
  label: Audio Restorer Medium (Mode 2)
  kind: action
  params: []
- id: ps_rstr_hi
  label: Audio Restorer High (Mode 1)
  kind: action
  params: []
- id: ps_rstr_query
  label: Audio Restorer Status Query
  kind: query
  params: []
- id: ps_front_spa
  label: Front Speaker A
  kind: action
  params: []
- id: ps_front_spb
  label: Front Speaker B
  kind: action
  params: []
- id: ps_front_ap
  label: Front Speaker A+B
  kind: action
  params: []
- id: ps_front_query
  label: Front Speaker Status Query
  kind: query
  params: []
- id: ps_aurop_sma
  label: Auro-Matic 3D Preset Small
  kind: action
  params: []
- id: ps_aurop_med
  label: Auro-Matic 3D Preset Medium
  kind: action
  params: []
- id: ps_aurop_lar
  label: Auro-Matic 3D Preset Large
  kind: action
  params: []
- id: ps_aurop_spe
  label: Auro-Matic 3D Preset Speech
  kind: action
  params: []
- id: ps_aurop_query
  label: Auro-Matic 3D Preset Status Query
  kind: query
  params: []
- id: ps_aurost_up
  label: Auro-Matic 3D Strength Up
  kind: action
  params: []
- id: ps_aurost_down
  label: Auro-Matic 3D Strength Down
  kind: action
  params: []
- id: ps_aurost_set
  label: Auro-Matic 3D Strength Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 01-99, 01=1, 10=10. Range 1-16
- id: ps_aurost_query
  label: Auro-Matic 3D Strength Status Query
  kind: query
  params: []
```

### Picture Mode (PV)
```yaml
- id: pv_off
  label: Picture Mode Off
  kind: action
  params: []
- id: pv_std
  label: Picture Mode Standard
  kind: action
  params: []
- id: pv_mov
  label: Picture Mode Movie
  kind: action
  params: []
- id: pv_vvd
  label: Picture Mode Vivid
  kind: action
  params: []
- id: pv_stm
  label: Picture Mode Stream
  kind: action
  params: []
- id: pv_ctm
  label: Picture Mode Custom
  kind: action
  params: []
- id: pv_day
  label: Picture Mode ISF Day
  kind: action
  params: []
- id: pv_ngt
  label: Picture Mode ISF Night
  kind: action
  params: []
- id: pv_query
  label: Picture Mode Status Query
  kind: query
  params: []
- id: pv_cn_up
  label: Contrast Up
  kind: action
  params: []
- id: pv_cn_down
  label: Contrast Down
  kind: action
  params: []
- id: pv_cn_set
  label: Contrast Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 000-100, 050=0. Range -50 to +50 (000-100)
- id: pv_cn_query
  label: Contrast Status Query
  kind: query
  params: []
- id: pv_br_up
  label: Brightness Up
  kind: action
  params: []
- id: pv_br_down
  label: Brightness Down
  kind: action
  params: []
- id: pv_br_set
  label: Brightness Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 000-100, 050=0. Range -50 to +50 (000-100)
- id: pv_br_query
  label: Brightness Status Query
  kind: query
  params: []
- id: pv_st_up
  label: Chroma Level/Saturation Up
  kind: action
  params: []
- id: pv_st_down
  label: Chroma Level/Saturation Down
  kind: action
  params: []
- id: pv_st_set
  label: Chroma Level/Saturation Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 000-100, 050=0. Range -50 to +50 (000-100)
- id: pv_st_query
  label: Chroma Level/Saturation Status Query
  kind: query
  params: []
- id: pv_hue_up
  label: Hue Up
  kind: action
  params: []
- id: pv_hue_down
  label: Hue Down
  kind: action
  params: []
- id: pv_hue_set
  label: Hue Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 44-56, 50=0. Range -6 to +6
- id: pv_hue_query
  label: Hue Status Query
  kind: query
  params: []
- id: pv_dnr_off
  label: DNR Off
  kind: action
  params: []
- id: pv_dnr_low
  label: DNR Low
  kind: action
  params: []
- id: pv_dnr_mid
  label: DNR Mid
  kind: action
  params: []
- id: pv_dnr_hi
  label: DNR High
  kind: action
  params: []
- id: pv_dnr_query
  label: DNR Status Query
  kind: query
  params: []
- id: pv_enh_up
  label: Enhancer Up
  kind: action
  params: []
- id: pv_enh_down
  label: Enhancer Down
  kind: action
  params: []
- id: pv_enh_set
  label: Enhancer Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-12, 00=0. Range 0-12
- id: pv_enh_query
  label: Enhancer Status Query
  kind: query
  params: []
```

### Zone 2 Control
```yaml
- id: z2_source
  label: Zone 2 Source (cancel, same as Main)
  kind: action
  params: []
- id: z2_phono
  label: Zone 2 Phono
  kind: action
  params: []
- id: z2_cd
  label: Zone 2 CD
  kind: action
  params: []
- id: z2_tuner
  label: Zone 2 Tuner
  kind: action
  params: []
- id: z2_dvd
  label: Zone 2 DVD
  kind: action
  params: []
- id: z2_bd
  label: Zone 2 Blu-ray
  kind: action
  params: []
- id: z2_tv
  label: Zone 2 TV
  kind: action
  params: []
- id: z2_sat_cbl
  label: Zone 2 Cable/Satellite
  kind: action
  params: []
- id: z2_mplay
  label: Zone 2 Media Player
  kind: action
  params: []
- id: z2_game
  label: Zone 2 Game
  kind: action
  params: []
- id: z2_hdradio
  label: Zone 2 HD Radio
  kind: action
  params: []
- id: z2_net
  label: Zone 2 Network/Online Music
  kind: action
  params: []
- id: z2_pandora
  label: Zone 2 Pandora
  kind: action
  params: []
- id: z2_siriusxm
  label: Zone 2 SiriusXM
  kind: action
  params: []
- id: z2_spotify
  label: Zone 2 Spotify
  kind: action
  params: []
- id: z2_lastfm
  label: Zone 2 Last.fm
  kind: action
  params: []
- id: z2_flickr
  label: Zone 2 Flickr
  kind: action
  params: []
- id: z2_iradio
  label: Zone 2 Internet Radio
  kind: action
  params: []
- id: z2_server
  label: Zone 2 Media Server
  kind: action
  params: []
- id: z2_favorites
  label: Zone 2 Favorites
  kind: action
  params: []
- id: z2_aux1
  label: Zone 2 Aux 1
  kind: action
  params: []
- id: z2_aux2
  label: Zone 2 Aux 2
  kind: action
  params: []
- id: z2_aux3
  label: Zone 2 Aux 3
  kind: action
  params: []
- id: z2_aux4
  label: Zone 2 Aux 4
  kind: action
  params: []
- id: z2_aux5
  label: Zone 2 Aux 5
  kind: action
  params: []
- id: z2_aux6
  label: Zone 2 Aux 6
  kind: action
  params: []
- id: z2_aux7
  label: Zone 2 Aux 7
  kind: action
  params: []
- id: z2_bt
  label: Zone 2 Bluetooth
  kind: action
  params: []
- id: z2_usb_ipod
  label: Zone 2 USB/iPod
  kind: action
  params: []
- id: z2_usb
  label: Zone 2 USB
  kind: action
  params: []
- id: z2_ipd
  label: Zone 2 iPod Direct
  kind: action
  params: []
- id: z2_irp
  label: Zone 2 iRadio Recent Play
  kind: action
  params: []
- id: z2_fvp
  label: Zone 2 Favorites Play
  kind: action
  params: []
- id: z2_quick1
  label: Zone 2 Quick Select 1
  kind: action
  params: []
- id: z2_quick2
  label: Zone 2 Quick Select 2
  kind: action
  params: []
- id: z2_quick3
  label: Zone 2 Quick Select 3
  kind: action
  params: []
- id: z2_quick4
  label: Zone 2 Quick Select 4
  kind: action
  params: []
- id: z2_quick5
  label: Zone 2 Quick Select 5
  kind: action
  params: []
- id: z2_quick1_memory
  label: Zone 2 Quick Select 1 Memory
  kind: action
  params: []
- id: z2_quick2_memory
  label: Zone 2 Quick Select 2 Memory
  kind: action
  params: []
- id: z2_quick3_memory
  label: Zone 2 Quick Select 3 Memory
  kind: action
  params: []
- id: z2_quick4_memory
  label: Zone 2 Quick Select 4 Memory
  kind: action
  params: []
- id: z2_quick5_memory
  label: Zone 2 Quick Select 5 Memory
  kind: action
  params: []
- id: z2_quick_query
  label: Zone 2 Quick Select Status Query
  kind: query
  params: []
- id: z2_favorite1
  label: Zone 2 Favorite 1
  kind: action
  params: []
- id: z2_favorite2
  label: Zone 2 Favorite 2
  kind: action
  params: []
- id: z2_favorite3
  label: Zone 2 Favorite 3
  kind: action
  params: []
- id: z2_favorite4
  label: Zone 2 Favorite 4
  kind: action
  params: []
- id: z2_up
  label: Zone 2 Volume Up
  kind: action
  params: []
- id: z2_down
  label: Zone 2 Volume Down
  kind: action
  params: []
- id: z2_set
  label: Zone 2 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-98, 80=0dB, 00=minimum
- id: z2_on
  label: Zone 2 On
  kind: action
  params: []
- id: z2_off
  label: Zone 2 Off
  kind: action
  params: []
- id: z2_query
  label: Zone 2 Status Query
  kind: query
  params: []
```

### Zone 2 Mute (Z2MU)
```yaml
- id: z2mu_on
  label: Zone 2 Mute On
  kind: action
  params: []
- id: z2mu_off
  label: Zone 2 Mute Off
  kind: action
  params: []
- id: z2mu_query
  label: Zone 2 Mute Status Query
  kind: query
  params: []
```

### Zone 2 Channel Setting (Z2CS)
```yaml
- id: z2cs_st
  label: Zone 2 Channel Stereo
  kind: action
  params: []
- id: z2cs_mono
  label: Zone 2 Channel Mono
  kind: action
  params: []
- id: z2cs_query
  label: Zone 2 Channel Setting Status Query
  kind: query
  params: []
```

### Zone 2 Channel Volume (Z2CV)
```yaml
- id: z2cvfl_up
  label: Zone 2 Front Left Volume Up
  kind: action
  params: []
- id: z2cvfl_down
  label: Zone 2 Front Left Volume Down
  kind: action
  params: []
- id: z2cvfl_set
  label: Zone 2 Front Left Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 38-62, 50=0dB
- id: z2cvfl_query
  label: Zone 2 Front Left Volume Query
  kind: query
  params: []
- id: z2cvfr_up
  label: Zone 2 Front Right Volume Up
  kind: action
  params: []
- id: z2cvfr_down
  label: Zone 2 Front Right Volume Down
  kind: action
  params: []
- id: z2cvfr_set
  label: Zone 2 Front Right Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 38-62, 50=0dB
- id: z2cvfr_query
  label: Zone 2 Front Right Volume Query
  kind: query
  params: []
- id: z2cv_query
  label: Zone 2 Channel Volume Status Query
  kind: query
  params: []
```

### Zone 2 HPF (Z2HPF)
```yaml
- id: z2hpf_on
  label: Zone 2 HPF On
  kind: action
  params: []
- id: z2hpf_off
  label: Zone 2 HPF Off
  kind: action
  params: []
- id: z2hpf_query
  label: Zone 2 HPF Status Query
  kind: query
  params: []
```

### Zone 2 Parameter Settings (Z2PS)
```yaml
- id: z2ps_bas_up
  label: Zone 2 Bass Up
  kind: action
  params: []
- id: z2ps_bas_down
  label: Zone 2 Bass Down
  kind: action
  params: []
- id: z2ps_bas_set
  label: Zone 2 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range -10 to +10 (40-60); X4100: -14 to +14 /2dB step (36-64)
- id: z2ps_bas_query
  label: Zone 2 Bass Status Query
  kind: query
  params: []
- id: z2ps_tre_up
  label: Zone 2 Treble Up
  kind: action
  params: []
- id: z2ps_tre_down
  label: Zone 2 Treble Down
  kind: action
  params: []
- id: z2ps_tre_set
  label: Zone 2 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range -10 to +10 (40-60); X4100: -14 to +14 /2dB step (36-64)
- id: z2ps_tre_query
  label: Zone 2 Treble Status Query
  kind: query
  params: []
```

### Zone 2 HDMI Audio (Z2HDA)
```yaml
- id: z2hda_thr
  label: Zone 2 HDMI Audio Through
  kind: action
  params: []
- id: z2hda_pcm
  label: Zone 2 HDMI Audio PCM
  kind: action
  params: []
- id: z2hda_query
  label: Zone 2 HDMI Audio Status Query
  kind: query
  params: []
```

### Zone 2 Sleep Timer (Z2SLP)
```yaml
- id: z2slp_off
  label: Zone 2 Sleep Timer Off
  kind: action
  params: []
- id: z2slp_set
  label: Zone 2 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120 (ASCII), 010=10min
- id: z2slp_query
  label: Zone 2 Sleep Timer Status Query
  kind: query
  params: []
```

### Zone 2 Auto Standby (Z2STBY)
```yaml
- id: z2stby_2h
  label: Zone 2 Auto Standby 2 Hours
  kind: action
  params: []
- id: z2stby_4h
  label: Zone 2 Auto Standby 4 Hours
  kind: action
  params: []
- id: z2stby_8h
  label: Zone 2 Auto Standby 8 Hours
  kind: action
  params: []
- id: z2stby_off
  label: Zone 2 Auto Standby Off
  kind: action
  params: []
- id: z2stby_query
  label: Zone 2 Auto Standby Status Query
  kind: query
  params: []
```

### Zone 3 Control
```yaml
- id: z3_source
  label: Zone 3 Source (cancel, same as Main)
  kind: action
  params: []
- id: z3_phono
  label: Zone 3 Phono
  kind: action
  params: []
- id: z3_cd
  label: Zone 3 CD
  kind: action
  params: []
- id: z3_tuner
  label: Zone 3 Tuner
  kind: action
  params: []
- id: z3_dvd
  label: Zone 3 DVD
  kind: action
  params: []
- id: z3_bd
  label: Zone 3 Blu-ray
  kind: action
  params: []
- id: z3_tv
  label: Zone 3 TV
  kind: action
  params: []
- id: z3_sat_cbl
  label: Zone 3 Cable/Satellite
  kind: action
  params: []
- id: z3_mplay
  label: Zone 3 Media Player
  kind: action
  params: []
- id: z3_game
  label: Zone 3 Game
  kind: action
  params: []
- id: z3_hdradio
  label: Zone 3 HD Radio
  kind: action
  params: []
- id: z3_net
  label: Zone 3 Network/Online Music
  kind: action
  params: []
- id: z3_pandora
  label: Zone 3 Pandora
  kind: action
  params: []
- id: z3_siriusxm
  label: Zone 3 SiriusXM
  kind: action
  params: []
- id: z3_spotify
  label: Zone 3 Spotify
  kind: action
  params: []
- id: z3_lastfm
  label: Zone 3 Last.fm
  kind: action
  params: []
- id: z3_flickr
  label: Zone 3 Flickr
  kind: action
  params: []
- id: z3_iradio
  label: Zone 3 Internet Radio
  kind: action
  params: []
- id: z3_server
  label: Zone 3 Media Server
  kind: action
  params: []
- id: z3_favorites
  label: Zone 3 Favorites
  kind: action
  params: []
- id: z3_aux1
  label: Zone 3 Aux 1
  kind: action
  params: []
- id: z3_aux2
  label: Zone 3 Aux 2
  kind: action
  params: []
- id: z3_aux3
  label: Zone 3 Aux 3
  kind: action
  params: []
- id: z3_aux4
  label: Zone 3 Aux 4
  kind: action
  params: []
- id: z3_aux5
  label: Zone 3 Aux 5
  kind: action
  params: []
- id: z3_aux6
  label: Zone 3 Aux 6
  kind: action
  params: []
- id: z3_aux7
  label: Zone 3 Aux 7
  kind: action
  params: []
- id: z3_bt
  label: Zone 3 Bluetooth
  kind: action
  params: []
- id: z3_usb_ipod
  label: Zone 3 USB/iPod
  kind: action
  params: []
- id: z3_usb
  label: Zone 3 USB
  kind: action
  params: []
- id: z3_ipd
  label: Zone 3 iPod Direct
  kind: action
  params: []
- id: z3_irp
  label: Zone 3 iRadio Recent Play
  kind: action
  params: []
- id: z3_fvp
  label: Zone 3 Favorites Play
  kind: action
  params: []
- id: z3_quick1
  label: Zone 3 Quick Select 1
  kind: action
  params: []
- id: z3_quick2
  label: Zone 3 Quick Select 2
  kind: action
  params: []
- id: z3_quick3
  label: Zone 3 Quick Select 3
  kind: action
  params: []
- id: z3_quick4
  label: Zone 3 Quick Select 4
  kind: action
  params: []
- id: z3_quick5
  label: Zone 3 Quick Select 5
  kind: action
  params: []
- id: z3_quick1_memory
  label: Zone 3 Quick Select 1 Memory
  kind: action
  params: []
- id: z3_quick2_memory
  label: Zone 3 Quick Select 2 Memory
  kind: action
  params: []
- id: z3_quick3_memory
  label: Zone 3 Quick Select 3 Memory
  kind: action
  params: []
- id: z3_quick4_memory
  label: Zone 3 Quick Select 4 Memory
  kind: action
  params: []
- id: z3_quick5_memory
  label: Zone 3 Quick Select 5 Memory
  kind: action
  params: []
- id: z3_quick_query
  label: Zone 3 Quick Select Status Query
  kind: query
  params: []
- id: z3_favorite1
  label: Zone 3 Favorite 1
  kind: action
  params: []
- id: z3_favorite2
  label: Zone 3 Favorite 2
  kind: action
  params: []
- id: z3_favorite3
  label: Zone 3 Favorite 3
  kind: action
  params: []
- id: z3_favorite4
  label: Zone 3 Favorite 4
  kind: action
  params: []
- id: z3_up
  label: Zone 3 Volume Up
  kind: action
  params: []
- id: z3_down
  label: Zone 3 Volume Down
  kind: action
  params: []
- id: z3_set
  label: Zone 3 Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-98, 80=0dB, 00=minimum
- id: z3_on
  label: Zone 3 On
  kind: action
  params: []
- id: z3_off
  label: Zone 3 Off
  kind: action
  params: []
- id: z3_query
  label: Zone 3 Status Query
  kind: query
  params: []
```

### Zone 3 Mute (Z3MU)
```yaml
- id: z3mu_on
  label: Zone 3 Mute On
  kind: action
  params: []
- id: z3mu_off
  label: Zone 3 Mute Off
  kind: action
  params: []
- id: z3mu_query
  label: Zone 3 Mute Status Query
  kind: query
  params: []
```

### Zone 3 Channel Setting (Z3CS)
```yaml
- id: z3cs_st
  label: Zone 3 Channel Stereo
  kind: action
  params: []
- id: z3cs_mono
  label: Zone 3 Channel Mono
  kind: action
  params: []
- id: z3cs_query
  label: Zone 3 Channel Setting Status Query
  kind: query
  params: []
```

### Zone 3 Channel Volume (Z3CV)
```yaml
- id: z3cvfl_up
  label: Zone 3 Front Left Volume Up
  kind: action
  params: []
- id: z3cvfl_down
  label: Zone 3 Front Left Volume Down
  kind: action
  params: []
- id: z3cvfl_set
  label: Zone 3 Front Left Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 38-62, 50=0dB
- id: z3cvfl_query
  label: Zone 3 Front Left Volume Query
  kind: query
  params: []
- id: z3cvfr_up
  label: Zone 3 Front Right Volume Up
  kind: action
  params: []
- id: z3cvfr_down
  label: Zone 3 Front Right Volume Down
  kind: action
  params: []
- id: z3cvfr_set
  label: Zone 3 Front Right Volume Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 38-62, 50=0dB
- id: z3cvfr_query
  label: Zone 3 Front Right Volume Query
  kind: query
  params: []
- id: z3cv_query
  label: Zone 3 Channel Volume Status Query
  kind: query
  params: []
```

### Zone 3 HPF (Z3HPF)
```yaml
- id: z3hpf_on
  label: Zone 3 HPF On
  kind: action
  params: []
- id: z3hpf_off
  label: Zone 3 HPF Off
  kind: action
  params: []
- id: z3hpf_query
  label: Zone 3 HPF Status Query
  kind: query
  params: []
```

### Zone 3 Parameter Settings (Z3PS)
```yaml
- id: z3ps_bas_up
  label: Zone 3 Bass Up
  kind: action
  params: []
- id: z3ps_bas_down
  label: Zone 3 Bass Down
  kind: action
  params: []
- id: z3ps_bas_set
  label: Zone 3 Bass Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range -10 to +10 (40-60); X4100: -14 to +14 /2dB step (36-64)
- id: z3ps_bas_query
  label: Zone 3 Bass Status Query
  kind: query
  params: []
- id: z3ps_tre_up
  label: Zone 3 Treble Up
  kind: action
  params: []
- id: z3ps_tre_down
  label: Zone 3 Treble Down
  kind: action
  params: []
- id: z3ps_tre_set
  label: Zone 3 Treble Set
  kind: action
  params:
    - name: level
      type: string
      description: ASCII 00-99, 00=0dB. Range -10 to +10 (40-60); X4100: -14 to +14 /2dB step (36-64)
- id: z3ps_tre_query
  label: Zone 3 Treble Status Query
  kind: query
  params: []
```

### Zone 3 Sleep Timer (Z3SLP)
```yaml
- id: z3slp_off
  label: Zone 3 Sleep Timer Off
  kind: action
  params: []
- id: z3slp_set
  label: Zone 3 Sleep Timer Set
  kind: action
  params:
    - name: minutes
      type: integer
      description: 001-120 (ASCII), 010=10min
- id: z3slp_query
  label: Zone 3 Sleep Timer Status Query
  kind: query
  params: []
```

### Zone 3 Auto Standby (Z3STBY)
```yaml
- id: z3stby_2h
  label: Zone 3 Auto Standby 2 Hours
  kind: action
  params: []
- id: z3stby_4h
  label: Zone 3 Auto Standby 4 Hours
  kind: action
  params: []
- id: z3stby_8h
  label: Zone 3 Auto Standby 8 Hours
  kind: action
  params: []
- id: z3stby_off
  label: Zone 3 Auto Standby Off
  kind: action
  params: []
- id: z3stby_query
  label: Zone 3 Auto Standby Status Query
  kind: query
  params: []
```

### Tuner Control (TF/TP/TM)
```yaml
- id: tf_anup
  label: Tuner Frequency Up
  kind: action
  params: []
- id: tf_andown
  label: Tuner Frequency Down
  kind: action
  params: []
- id: tf_an_set
  label: Tuner Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit ASCII: kHz for AM (>050000), MHz for FM (<050000)
- id: tf_an_query
  label: Tuner Frequency Status Query
  kind: query
  params: []
- id: tf_name_query
  label: RDS Station Name Query (EU/AP only)
  kind: query
  params: []
- id: tp_anup
  label: Tuner Preset Up
  kind: action
  params: []
- id: tp_andown
  label: Tuner Preset Down
  kind: action
  params: []
- id: tp_an_set
  label: Tuner Preset Set (01-56)
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
- id: tp_an_query
  label: Tuner Preset Status Query
  kind: query
  params: []
- id: tp_off
  label: Tuner Preset Off
  kind: action
  params: []
- id: tp_anmem
  label: Tuner Preset Memory
  kind: action
  params: []
- id: tp_anmem_set
  label: Tuner Preset Memory Set (01-56)
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
- id: tm_anam
  label: Tuner Band AM
  kind: action
  params: []
- id: tm_anfm
  label: Tuner Band FM
  kind: action
  params: []
- id: tm_anauto
  label: Tuner Tuning Mode Auto
  kind: action
  params: []
- id: tm_anmanual
  label: Tuner Tuning Mode Manual
  kind: action
  params: []
- id: tm_query
  label: Tuner Band/Tuning Mode Query
  kind: query
  params: []
```

### HD Radio Control (TFHD/TPHD/TMHD/HD)
```yaml
- id: tfhd_up
  label: HD Channel Up
  kind: action
  params: []
- id: tfhd_down
  label: HD Channel Down
  kind: action
  params: []
- id: tfhd_set
  label: HD Frequency Set
  kind: action
  params:
    - name: frequency
      type: string
      description: 6-digit ASCII for frequency + MC digit for multi-cast
- id: tfhd_mc
  label: HD Multi Cast Channel Select
  kind: action
  params:
    - name: channel
      type: integer
      description: 1-8 (Multi Cast), 0 (Analog)
- id: tfhd_freq_mc
  label: HD Frequency and Multi Cast Channel Select
  kind: action
  params:
    - name: frequency
      type: string
    - name: channel
      type: integer
- id: tfhd_query
  label: HD Tuner Status Query
  kind: query
  params: []
- id: tphd_up
  label: HD Preset Up
  kind: action
  params: []
- id: tphd_down
  label: HD Preset Down
  kind: action
  params: []
- id: tphd_set
  label: HD Preset Set (01-56)
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
- id: tphd_query
  label: HD Preset Status Query
  kind: query
  params: []
- id: tphd_off
  label: HD Preset Off
  kind: action
  params: []
- id: tphd_mem
  label: HD Preset Memory
  kind: action
  params: []
- id: tphd_mem_set
  label: HD Preset Memory Set (01-56)
  kind: action
  params:
    - name: preset
      type: integer
      description: 01-56
- id: tmhd_hdam
  label: HD Radio Band AM
  kind: action
  params: []
- id: tmhd_hdfm
  label: HD Radio Band FM
  kind: action
  params: []
- id: tmhd_autohd
  label: HD Radio Tuning Mode Auto-HD
  kind: action
  params: []
- id: tmhd_auto
  label: HD Radio Tuning Mode Auto
  kind: action
  params: []
- id: tmhd_manual
  label: HD Radio Tuning Mode Manual
  kind: action
  params: []
- id: tmhd_anaauto
  label: HD Radio Analog Auto Mode
  kind: action
  params: []
- id: tmhd_anamanu
  label: HD Radio Analog Manual Mode
  kind: action
  params: []
- id: tmhd_query
  label: HD Radio Band/Tuning Mode Query
  kind: query
  params: []
- id: hd_query
  label: HD Radio Full Status Query
  kind: query
  params: []
```

### Online Music / USB/iPod / Bluetooth Control (NS)
```yaml
- id: ns_cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: ns_cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: ns_cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: ns_cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: ns_enter
  label: Enter (Play/Pause)
  kind: action
  params: []
- id: ns_play
  label: Play
  kind: action
  params: []
- id: ns_pause
  label: Pause
  kind: action
  params: []
- id: ns_stop
  label: Stop
  kind: action
  params: []
- id: ns_skip_plus
  label: Skip Plus
  kind: action
  params: []
- id: ns_skip_minus
  label: Skip Minus
  kind: action
  params: []
- id: ns_search_plus
  label: Manual Search Plus
  kind: action
  params: []
- id: ns_search_minus
  label: Manual Search Minus
  kind: action
  params: []
- id: ns_repeat_one
  label: Repeat One
  kind: action
  params: []
- id: ns_repeat_all
  label: Repeat All
  kind: action
  params: []
- id: ns_repeat_off
  label: Repeat Off
  kind: action
  params: []
- id: ns_random_on
  label: Random On (Shuffle Songs for iPod Direct)
  kind: action
  params: []
- id: ns_random_off
  label: Random Off (Shuffle Off for iPod Direct)
  kind: action
  params: []
- id: ns_mode_toggle
  label: Toggle iPod Mode/On Screen Mode
  kind: action
  params: []
- id: ns_page_next
  label: Page Next
  kind: action
  params: []
- id: ns_page_previous
  label: Page Previous
  kind: action
  params: []
- id: ns_search_stop
  label: Manual Search Stop
  kind: action
  params: []
- id: ns_repeat_toggle
  label: Repeat Toggle
  kind: action
  params: []
- id: ns_random_toggle
  label: Random Toggle
  kind: action
  params: []
- id: ns_preset_call
  label: Preset Call (except Bluetooth, USB/iPod)
  kind: action
  params:
    - name: preset
      type: integer
      description: 00-35 (2014 AVR); original spec said 00-55
- id: ns_preset_memory
  label: Preset Memory (except Bluetooth, USB/iPod)
  kind: action
  params:
    - name: preset
      type: integer
      description: 00-35 (2014 AVR); original spec said 00-55
- id: ns_net_audio_preset_query
  label: Net Audio Preset Name Status
  kind: query
  params: []
- id: ns_fv_mem
  label: Add Favorites Folder
  kind: action
  params: []
- id: nsa
  label: Return Onscreen Display Information List
  kind: query
  params: []
- id: nse
  label: Request Onscreen Display Information List
  kind: query
  params: []
```

### System Control (MN)
```yaml
- id: mn_cursor_up
  label: Cursor Up
  kind: action
  params: []
- id: mn_cursor_down
  label: Cursor Down
  kind: action
  params: []
- id: mn_cursor_left
  label: Cursor Left
  kind: action
  params: []
- id: mn_cursor_right
  label: Cursor Right
  kind: action
  params: []
- id: mn_enter
  label: Enter/Return Key
  kind: action
  params: []
- id: mn_return
  label: Return Key
  kind: action
  params: []
- id: mn_option
  label: Option Key
  kind: action
  params: []
- id: mn_info
  label: Info Key
  kind: action
  params: []
- id: mn_chl
  label: Channel Level Adjust Menu On/Off
  kind: action
  params: []
- id: mn_menu_on
  label: Setup Menu On
  kind: action
  params: []
- id: mn_menu_off
  label: Setup Menu Off
  kind: action
  params: []
- id: mn_menu_query
  label: Setup Menu Status Query
  kind: query
  params: []
- id: mn_prv_on
  label: InstaPrevue On
  kind: action
  params: []
- id: mn_prv_off
  label: InstaPrevue Off
  kind: action
  params: []
- id: mn_prv_ng
  label: InstaPrevue Not Available
  kind: action
  params: []
- id: mn_prv_query
  label: InstaPrevue Status Query
  kind: query
  params: []
- id: mn_zst_on
  label: All Zone Stereo On
  kind: action
  params: []
- id: mn_zst_off
  label: All Zone Stereo Off
  kind: action
  params: []
- id: mn_zst_query
  label: All Zone Stereo Status Query
  kind: query
  params: []
```

### System Command (SY)
```yaml
- id: sy_remote_lock_on
  label: Remote Lock On
  kind: action
  params: []
- id: sy_remote_lock_off
  label: Remote Lock Off
  kind: action
  params: []
- id: sy_panel_lock_on
  label: Panel Button Lock On (except Master Vol)
  kind: action
  params: []
- id: sy_panel_v_lock_on
  label: Panel Button and Master Vol Lock On
  kind: action
  params: []
- id: sy_panel_lock_off
  label: Panel Button Lock Off
  kind: action
  params: []
```

### Trigger Control (TR)
```yaml
- id: tr1_on
  label: Trigger 1 On
  kind: action
  params: []
- id: tr1_off
  label: Trigger 1 Off
  kind: action
  params: []
- id: tr2_on
  label: Trigger 2 On
  kind: action
  params: []
- id: tr2_off
  label: Trigger 2 Off
  kind: action
  params: []
- id: tr_query
  label: Trigger Status Query
  kind: query
  params: []
```

### Upgrade ID (UG)
```yaml
- id: ug_idn
  label: Display Upgrade ID Number
  kind: action
  params: []
```

### Remote Maintenance (RM)
```yaml
- id: rm_sta
  label: Remote Maintenance Mode Start
  kind: action
  params: []
- id: rm_end
  label: Remote Maintenance Mode End
  kind: action
  params: []
- id: rm_query
  label: Remote Maintenance Status Query
  kind: query
  params: []
```

### Dimmer (DIM)
```yaml
- id: dim_bri
  label: Dimmer Bright
  kind: action
  params: []
- id: dim_dim
  label: Dimmer Dim
  kind: action
  params: []
- id: dim_dar
  label: Dimmer Dark
  kind: action
  params: []
- id: dim_off
  label: Dimmer Off
  kind: action
  params: []
- id: dim_sel
  label: Dimmer Select (Toggle Bright→Dim→Dark→Off)
  kind: action
  params: []
- id: dim_query
  label: Dimmer Status Query
  kind: query
  params: []
```

## Feedbacks
```yaml
# Each ? query command returns a status. Feedback forms mirror command forms.
# Source documents response examples for many commands - extract here.

- id: pw_status
  type: enum
  values: [PWON, PWSTANDBY]

- id: mv_status
  type: string
  description: MV** format - 2 or 3 char ASCII volume value

- id: mu_status
  type: enum
  values: [MUON, MUOFF]

- id: si_status
  type: string
  description: SI source name (e.g. SIDVD, SICD, SITUNER, etc.)

- id: zm_status
  type: enum
  values: [ZMON, ZMOFF]

- id: cv_status
  type: string
  description: CVFL 50 format - channel name + 2/3 char value

- id: ms_status
  type: string
  description: Surround mode name (e.g. MSSTEREO, MSDOLBY DIGITAL, etc.)

- id: hd_status
  type: object
  description: HD radio status - band, station name, multi-cast channel, signal level, artist, title, album, genre, program type

- id: tf_status
  type: string
  description: TFAN****** format - frequency value

- id: tp_status
  type: string
  description: TPAN** format - preset number

# UNRESOLVED: comprehensive response schemas for all commands not enumerated.
```

## Variables
```yaml
# All PS parameter setters map here.
# UNRESOLVED: enumerated from command table rows; verify against source.
```

## Events
```yaml
# Device-initiated events (EVENT) - sent within 5s of state change.
# Same format as COMMAND. Response to request commands (RESPONSE) within 200ms.
# UNRESOLVED: full event catalogue not enumerated from source - only command/response pairs shown.
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
# UNRESOLVED: no explicit macro sequences found in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Wait 1 second after transmitting power on command (PWON) before sending next command. Source: "1 second later, please transmit the next COMMAND after transmitting a power on COMMAND (PWON)."
# UNRESOLVED: no other safety warnings or interlock procedures stated in source.
```

## Notes
- Command interval: minimum 50ms between commands from controller to device.
- Half-duplex: device may send EVENT during command receipt.
- EVENT latency: device sends EVENT within 5 seconds of state change.
- RESPONSE latency: device responds within 200ms of receiving request command.
- Max command/data length: 135 bytes.
- ASCII range: 0x20–0x7F plus CR (0x0D) as terminator.
- 0.5dB volume steps use 3-char parameter (e.g. MV805 = +0.5dB).
- Minimum master volume level is "00".
- No authentication required for either RS-232C or TCP/IP control.
- Source document describes AVR functionality (multi-zone, surround processing, tuner, HD Radio). Input model "DN 500R/700R" does not appear in source — models list left empty; operator should verify correct device family.

<!-- UNRESOLVED: specific AVR model numbers not listed in source — compatible_with.models left empty. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: response schemas for all commands not fully enumerated from source. -->
<!-- UNRESOLVED: unsolicited event catalogue incomplete — only command/response pairs shown. --></parameter>
</invoke>

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
retrieved_at: 2026-04-29T23:27:42.130Z
last_checked_at: 2026-05-27T06:51:55.254Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-27T06:51:55.254Z
matched_actions: 865
action_count: 865
confidence: high
summary: "All 865 spec actions have literal wire matches in source; transport confirmed; comprehensive coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
