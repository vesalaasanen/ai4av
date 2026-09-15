---
spec_id: admin/integra-drx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DRX Series Control Spec"
manufacturer: Integra
model_family: "DRX Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DRX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T15:41:27.913Z
last_checked_at: 2026-09-11T22:17:43.418Z
generated_at: 2026-09-11T22:17:43.418Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact DRX model list and firmware compatibility not stated in source (doc dated 2009, references TX-SR805/TX-NR905/TX-NR1000 era models)"
  - "full response string formats for many queries not exhaustively documented in source"
  - "exhaustive list of which parameters push unsolicited notifications not stated in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "protocol version beyond eISCP header version 0x01 not stated"
  - "which DRX models support Zone 3 / Zone 4 / HD Radio / XM / SIRIUS not stated per-model in source"
verification:
  verdict: verified
  checked_at: 2026-09-11T22:17:43.418Z
  matched_actions: 188
  action_count: 188
  confidence: medium
  summary: "All 188 wire-literal spec commands match documented ISCP command codes in source; transport params (port 60128, 9600 8N1, TCP, no auth) all sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Integra DRX Series Control Spec

## Summary
Integra DRX Series AV receivers controlled via ISCP (Integra Serial Control Protocol), three command characters plus variable-length parameters. Source documents ISCP over RS-232C (9600 baud 3-wire) and over Ethernet as eISCP (TCP, default port 60128). Covers main-zone amplifier/unit/surround/tuner/network commands, Onkyo RI passthrough, Zone 2/3/4 commands, and RI dock commands. Source is protocol doc "Integra Serial Communication Protocol for AV Receiver", Version 1.15, 31 August 2009.

<!-- UNRESOLVED: exact DRX model list and firmware compatibility not stated in source (doc dated 2009, references TX-SR805/TX-NR905/TX-NR1000 era models) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128  # default; configurable 49152-65535 via receiver setup menu (standby cycle required to apply)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # 3-wire RS-232C; DB9 female (pin 2 TX, pin 3 RX, pin 5 GND), straight-thru cable
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from PWR/ZPW/PW3/PW4 power commands
  - routable     # inferred from SLI/SLZ/SL3/SL4/SLR input selector commands
  - queryable    # inferred from QSTN query commands throughout source
  - levelable    # inferred from MVL/ZVL/VL3/VL4 and tone level commands
```

## Actions
```yaml
# ISCP wire format: "!" + unit-type char ("1" for Receiver) + 3-char command + parameter + end char.
# eISCP (TCP): ISCP message wrapped in eISCP packet - magic "ISCP", header size 0x00000010 (big-endian),
# data size (big-endian), version 0x01, reserved 0x000000. End char [EOF] / [EOF][CR] / [EOF][CR][LF] depending on model.
# RS-232 end char: [CR] / [LF] / [CR][LF].

# ---------- Main Zone: Amplifier ----------
- id: pwr_set
  label: System Power Set
  kind: action
  command: "!1PWR{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # System Standby
        - "01"  # System On
- id: pwr_query
  label: System Power Query
  kind: query
  command: "!1PWRQSTN"
  params: []
- id: amt_set
  label: Audio Muting Set
  kind: action
  command: "!1AMT{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Muting Off
        - "01"  # Muting On
        - "TG"  # Wrap-Around
- id: amt_query
  label: Audio Muting Query
  kind: query
  command: "!1AMTQSTN"
  params: []
- id: spa_set
  label: Speaker A Set
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Speaker Off
        - "01"  # Speaker On
        - "UP"  # Wrap-Around
- id: spa_query
  label: Speaker A Query
  kind: query
  command: "!1SPAQSTN"
  params: []
- id: spb_set
  label: Speaker B Set
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Speaker Off
        - "01"  # Speaker On
        - "UP"  # Wrap-Around
- id: spb_query
  label: Speaker B Query
  kind: query
  command: "!1SPBQSTN"
  params: []
- id: spl_set
  label: Speaker Layout Set
  kind: action
  command: "!1SPL{layout}"
  params:
    - name: layout
      type: enum
      values:
        - "SB"  # SurrBack Speaker
        - "FH"  # Front High / SurrBack+Front High
        - "FW"  # Front Wide / SurrBack+Front Wide
        - "UP"  # Wrap-Around
- id: spl_query
  label: Speaker Layout Query
  kind: query
  command: "!1SPLQSTN"
  params: []
- id: mvl_set
  label: Master Volume Set
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 = 0-100 (or 00-50 = 0-80 depending on model), or UP/DOWN/UP1/DOWN1"
- id: mvl_query
  label: Master Volume Query
  kind: query
  command: "!1MVLQSTN"
  params: []
- id: tfr_set
  label: Tone (Front) Set
  kind: action
  command: "!1TFR{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx (xx -A..00..+A, -10..0..+10 in 2 steps) or BUP/BDOWN/TUP/TDOWN"
- id: tfr_query
  label: Tone (Front) Query
  kind: query
  command: "!1TFRQSTN"
  params: []
- id: tfw_set
  label: Tone (Front Wide) Set
  kind: action
  command: "!1TFW{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx or BUP/BDOWN/TUP/TDOWN"
- id: tfw_query
  label: Tone (Front Wide) Query
  kind: query
  command: "!1TFWQSTN"
  params: []
- id: tfh_set
  label: Tone (Front High) Set
  kind: action
  command: "!1TFH{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx or BUP/BDOWN/TUP/TDOWN"
- id: tfh_query
  label: Tone (Front High) Query
  kind: query
  command: "!1TFHQSTN"
  params: []
- id: tct_set
  label: Tone (Center) Set
  kind: action
  command: "!1TCT{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx or BUP/BDOWN/TUP/TDOWN"
- id: tct_query
  label: Tone (Center) Query
  kind: query
  command: "!1TCTQSTN"
  params: []
- id: tsr_set
  label: Tone (Surround) Set
  kind: action
  command: "!1TSR{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx or BUP/BDOWN/TUP/TDOWN"
- id: tsr_query
  label: Tone (Surround) Query
  kind: query
  command: "!1TSRQSTN"
  params: []
- id: tsb_set
  label: Tone (Surround Back) Set
  kind: action
  command: "!1TSB{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx or BUP/BDOWN/TUP/TDOWN"
- id: tsb_query
  label: Tone (Surround Back) Query
  kind: query
  command: "!1TSBQSTN"
  params: []
- id: tsw_set
  label: Tone (Subwoofer) Set
  kind: action
  command: "!1TSW{param}"
  params:
    - name: param
      type: string
      description: "Bxx or BUP/BDOWN (bass only)"
- id: tsw_query
  label: Tone (Subwoofer) Query
  kind: query
  command: "!1TSWQSTN"
  params: []
- id: slp_set
  label: Sleep Timer Set
  kind: action
  command: "!1SLP{time}"
  params:
    - name: time
      type: string
      description: "Hex 01-5A = 1-90 min, OFF, or UP (wrap-around)"
- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "!1SLPQSTN"
  params: []
- id: slc
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{key}"
  params:
    - name: key
      type: enum
      values:
        - "TEST"   # TEST key
        - "CHSEL"  # CH SEL key
        - "UP"     # LEVEL + key
        - "DOWN"   # LEVEL - key
- id: swl_set
  label: Subwoofer Temporary Level Set
  kind: action
  command: "!1SWL{param}"
  params:
    - name: param
      type: string
      description: "-F..00..+C (-15dB..0dB..+12dB) or UP/DOWN"
- id: swl_query
  label: Subwoofer Temporary Level Query
  kind: query
  command: "!1SWLQSTN"
  params: []
- id: ctl_set
  label: Center Temporary Level Set
  kind: action
  command: "!1CTL{param}"
  params:
    - name: param
      type: string
      description: "-C..00..+C (-12dB..0dB..+12dB) or UP/DOWN"
- id: ctl_query
  label: Center Temporary Level Query
  kind: query
  command: "!1CTLQSTN"
  params: []
- id: dif_display_info
  label: Display Information
  kind: action
  command: "!1DIF{item}"
  params:
    - name: item
      type: enum
      values:
        - "00"  # Program Format
        - "01"  # Digital Input Position
        - "02"  # Digital Format Position
        - "03"  # Bass Level
        - "04"  # Treble Level
- id: dif_display_mode_set
  label: Display Mode Set
  kind: action
  command: "!1DIF{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Selector + Volume display mode
        - "01"  # Selector + Listening Mode display mode
        - "02"  # Display Digital Format (temporary)
        - "03"  # Display Video Format (temporary)
        - "TG"  # Wrap-Around Up (parameter char is "UP" on some models per source note)
- id: dif_display_mode_query
  label: Display Mode Query
  kind: query
  command: "!1DIFQSTN"
  params: []
- id: dim_set
  label: Dimmer Level Set
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: enum
      values:
        - "00"  # Bright
        - "01"  # Dim
        - "02"  # Dark
        - "03"  # Shut-Off
        - "08"  # Bright & LED OFF
        - "DIM" # Wrap-Around Up
- id: dim_query
  label: Dimmer Level Query
  kind: query
  command: "!1DIMQSTN"
  params: []
- id: osd_setup
  label: Setup Operation (OSD)
  kind: action
  command: "!1OSD{key}"
  params:
    - name: key
      type: enum
      values:
        - "MENU"
        - "UP"
        - "DOWN"
        - "RIGHT"
        - "LEFT"
        - "ENTER"
        - "EXIT"
        - "AUDIO"  # Audio Adjust key
        - "VIDEO"  # Video Adjust key
- id: mem
  label: Memory Setup
  kind: action
  command: "!1MEM{op}"
  params:
    - name: op
      type: enum
      values:
        - "STR"  # store memory
        - "RCL"  # recall memory
        - "LOCK"  # lock memory
        - "UNLK"  # unlock memory
- id: ifa_query
  label: Audio Information Query
  kind: query
  command: "!1IFAQSTN"
  params: []
  # response format "nnnnn:nnnnn", same as Immediate Display, ',' separator
- id: ifv_query
  label: Video Information Query
  kind: query
  command: "!1IFVQSTN"
  params: []
  # response format "nnnnn:nnnnn"

# ---------- Main Zone: Unit-related ----------
- id: sli_set
  label: Input Selector Set
  kind: action
  command: "!1SLI{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VIDEO1 / VCR/DVR
        - "01"  # VIDEO2 / CBL/SAT
        - "02"  # VIDEO3 / GAME/TV / GAME
        - "03"  # VIDEO4 / AUX1(AUX)
        - "04"  # VIDEO5 / AUX2
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE(1) / TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "30"  # MULTI CH
        - "31"  # XM (XM/SIRIUS models only)
        - "32"  # SIRIUS (XM/SIRIUS models only)
        - "40"  # Universal PORT
        - "UP"  # Wrap-Around Up
        - "DOWN"  # Wrap-Around Down
- id: sli_query
  label: Input Selector Query
  kind: query
  command: "!1SLIQSTN"
  params: []
- id: slr_set
  label: RECOUT Selector Set
  kind: action
  command: "!1SLR{output}"
  params:
    - name: output
      type: enum
      values:
        - "00"  # VIDEO1
        - "01"  # VIDEO2
        - "02"  # VIDEO3
        - "03"  # VIDEO4
        - "04"  # VIDEO5
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "30"  # MULTI CH
        - "31"  # XM
        - "7F"  # OFF
        - "80"  # SOURCE
- id: slr_query
  label: RECOUT Selector Query
  kind: query
  command: "!1SLRQSTN"
  params: []
- id: sla_set
  label: Audio Selector Set
  kind: action
  command: "!1SLA{selector}"
  params:
    - name: selector
      type: enum
      values:
        - "00"  # AUTO
        - "01"  # MULTI-CHANNEL
        - "02"  # ANALOG
        - "03"  # iLINK
        - "04"  # HDMI
        - "05"  # COAX/OPT
        - "06"  # BALANCE
        - "UP"  # Wrap-Around Up
- id: sla_query
  label: Audio Selector Query
  kind: query
  command: "!1SLAQSTN"
  params: []
- id: tga_set
  label: 12V Trigger A Set
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
- id: tgb_set
  label: 12V Trigger B Set
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
- id: tgc_set
  label: 12V Trigger C Set
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
  # note: TGA/TGB/TGC available only when each 12V Trigger parameter is "OFF" at Setup Menu
- id: vos_set
  label: Video Output Selector Set (Japanese Model Only)
  kind: action
  command: "!1VOS{selector}"
  params:
    - name: selector
      type: enum
      values:
        - "00"  # D4
        - "01"  # Component
        - "UP"  # Wrap-Around
- id: vos_query
  label: Video Output Selector Query
  kind: query
  command: "!1VOSQSTN"
  params: []
- id: hdo_set
  label: HDMI Output Selector Set
  kind: action
  command: "!1HDO{output}"
  params:
    - name: output
      type: enum
      values:
        - "00"  # No / Analog
        - "01"  # Yes/Out Main / HDMI Main
        - "02"  # Out Sub / HDMI Sub
        - "03"  # Both
        - "04"  # Both(Main)
        - "05"  # Both(Sub)
        - "UP"  # Wrap-Around Up
- id: hdo_query
  label: HDMI Output Selector Query
  kind: query
  command: "!1HDOQSTN"
  params: []
- id: res_set
  label: Monitor Out Resolution Set
  kind: action
  command: "!1RES{resolution}"
  params:
    - name: resolution
      type: enum
      values:
        - "00"  # Through
        - "01"  # Auto (HDMI Output Only)
        - "02"  # 480p
        - "03"  # 720p
        - "04"  # 1080i
        - "05"  # 1080p (HDMI Output Only)
        - "06"  # Source
        - "07"  # 1080p/24fs (HDMI Output Only)
        - "UP"  # Wrap-Around Up
- id: res_query
  label: Monitor Out Resolution Query
  kind: query
  command: "!1RESQSTN"
  params: []
- id: isf_set
  label: ISF Mode Set
  kind: action
  command: "!1ISF{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Custom
        - "01"  # Day
        - "02"  # Night
        - "UP"  # Wrap-Around Up
- id: isf_query
  label: ISF Mode Query
  kind: query
  command: "!1ISFQSTN"
  params: []

# ---------- Main Zone: Surround ----------
- id: lmd_set
  label: Listening Mode Set
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # STEREO
        - "01"  # DIRECT
        - "02"  # SURROUND
        - "03"  # FILM / Game-RPG
        - "04"  # THX
        - "05"  # ACTION / Game-Action
        - "06"  # MUSICAL / Game-Rock
        - "07"  # MONO MOVIE
        - "08"  # ORCHESTRA
        - "09"  # UNPLUGGED
        - "0A"  # STUDIO-MIX
        - "0B"  # TV LOGIC
        - "0C"  # ALL CH STEREO
        - "0D"  # THEATER-DIMENSIONAL
        - "0E"  # ENHANCED 7/ENHANCE / Game-Sports
        - "0F"  # MONO
        - "11"  # PURE AUDIO
        - "12"  # MULTIPLEX
        - "13"  # FULL MONO
        - "14"  # DOLBY VIRTUAL
        - "15"  # DTS Surround Sensation
        - "16"  # Audyssey DSX
        - "40"  # 5.1ch Surround / Straight Decode
        - "41"  # Dolby EX/DTS ES / Dolby EX
        - "42"  # THX Cinema
        - "43"  # THX Surround EX
        - "44"  # THX Music
        - "45"  # THX Games
        - "50"  # U2/S2 Cinema/Cinema2
        - "51"  # MusicMode, U2/S2 Music
        - "52"  # Games Mode, U2/S2 Games
        - "80"  # PLII/PLIIx Movie
        - "81"  # PLII/PLIIx Music
        - "82"  # Neo:6 Cinema
        - "83"  # Neo:6 Music
        - "84"  # PLII/PLIIx THX Cinema
        - "85"  # Neo:6 THX Cinema
        - "86"  # PLII/PLIIx Game
        - "87"  # Neural Surround
        - "88"  # Neural THX/Neural Surround
        - "89"  # PLII/PLIIx THX Games
        - "8A"  # Neo:6 THX Games
        - "8B"  # PLII/PLIIx THX Music
        - "8C"  # Neo:6 THX Music
        - "8D"  # Neural THX Cinema
        - "8E"  # Neural THX Music
        - "8F"  # Neural THX Games
        - "90"  # PLIIz Height
        - "91"  # Neo:6 Cinema DTS Surround Sensation
        - "92"  # Neo:6 Music DTS Surround Sensation
        - "93"  # Neural Digital Music
        - "94"  # PLIIz Height + THX Cinema
        - "95"  # PLIIz Height + THX Music
        - "96"  # PLIIz Height + THX Games
        - "97"  # PLIIz Height + THX U2/S2 Cinema
        - "98"  # PLIIz Height + THX U2/S2 Music
        - "99"  # PLIIz Height + THX U2/S2 Games
        - "A0"  # PLIIx/PLII Movie + Audyssey DSX
        - "A1"  # PLIIx/PLII Music + Audyssey DSX
        - "A2"  # PLIIx/PLII Game + Audyssey DSX
        - "A3"  # Neo:6 Cinema + Audyssey DSX
        - "A4"  # Neo:6 Music + Audyssey DSX
        - "A5"  # Neural Surround + Audyssey DSX
        - "A6"  # Neural Digital Music + Audyssey DSX
        - "A7"  # Dolby EX + Audyssey DSX
        - "UP"    # Wrap-Around Up
        - "DOWN"  # Wrap-Around Down
        - "MOVIE" # Wrap-Around Up (movie modes)
        - "MUSIC" # Wrap-Around Up (music modes)
        - "GAME"  # Wrap-Around Up (game modes)
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "!1LMDQSTN"
  params: []
- id: ltn_set
  label: Late Night Set
  kind: action
  command: "!1LTN{level}"
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low@DolbyDigital, On@Dolby TrueHD
        - "02"  # High@DolbyDigital, (On@Dolby TrueHD)
        - "03"  # Auto@Dolby TrueHD
        - "UP"  # Wrap-Around Up
- id: ltn_query
  label: Late Night Query
  kind: query
  command: "!1LTNQSTN"
  params: []
- id: ras_req_academy_set
  label: Re-EQ/Academy Filter Set
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Both Off
        - "01"  # Re-EQ On
        - "02"  # Academy On
        - "UP"  # Wrap-Around Up
- id: ras_req_academy_query
  label: Re-EQ/Academy Filter Query
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ras_re_eq_set
  label: Re-EQ Set
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Re-EQ Off
        - "01"  # Re-EQ On
        - "UP"  # Wrap-Around Up
- id: ras_re_eq_query
  label: Re-EQ Query
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ras_cinema_filter_set
  label: Cinema Filter Set
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Cinema Filter Off
        - "01"  # Cinema Filter On
        - "UP"  # Wrap-Around Up
- id: ras_cinema_filter_query
  label: Cinema Filter Query
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ady_set
  label: Audyssey 2EQ/MultEQ/MultEQ XT Set
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
        - "UP"  # Wrap-Around Up
- id: ady_query
  label: Audyssey 2EQ/MultEQ/MultEQ XT Query
  kind: query
  command: "!1ADYQSTN"
  params: []
- id: adq_set
  label: Audyssey Dynamic EQ Set
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
        - "UP"  # Wrap-Around Up
- id: adq_query
  label: Audyssey Dynamic EQ Query
  kind: query
  command: "!1ADQQSTN"
  params: []
- id: adv_set
  label: Audyssey Dynamic Volume Set
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # Light
        - "02"  # Medium
        - "03"  # Heavy
        - "UP"  # Wrap-Around Up
- id: adv_query
  label: Audyssey Dynamic Volume Query
  kind: query
  command: "!1ADVQSTN"
  params: []
- id: dvl_set
  label: Dolby Volume Set
  kind: action
  command: "!1DVL{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low
        - "02"  # Mid
        - "03"  # High
        - "UP"  # Wrap-Around Up
- id: dvl_query
  label: Dolby Volume Query
  kind: query
  command: "!1DVLQSTN"
  params: []
- id: mot_set
  label: Music Optimizer Set
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Off
        - "01"  # On
        - "UP"  # Wrap-Around Up
- id: mot_query
  label: Music Optimizer Query
  kind: query
  command: "!1MOTQSTN"
  params: []

# ---------- Main Zone: Tuner ----------
- id: tun_set
  label: Tuning Set (Main)
  kind: action
  command: "!1TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (0 in first two digits for XM); or UP/DOWN"
- id: tun_query
  label: Tuning Frequency Query (Main)
  kind: query
  command: "!1TUNQSTN"
  params: []
- id: prs_set
  label: Preset Set (Main)
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40 (or 01-1E = 1-30 depending on model); or UP/DOWN"
- id: prs_query
  label: Preset Query (Main)
  kind: query
  command: "!1PRSQSTN"
  params: []
- id: prm
  label: Preset Memory (Main)
  kind: action
  command: "!1PRM{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40 (or 01-1E = 1-30 depending on model)"
- id: rds
  label: RDS Information (RDS Model Only)
  kind: action
  command: "!1RDS{item}"
  params:
    - name: item
      type: enum
      values:
        - "00"  # Display RT Information (RBDS models: RT only)
        - "01"  # Display PTY Information
        - "02"  # Display TP Information
        - "UP"  # Wrap-Around Change
- id: pts
  label: PTY Scan (RDS Model Only)
  kind: action
  command: "!1PTS{param}"
  params:
    - name: param
      type: string
      description: "Hex 00-1E = PTY No. 0-30, or ENTER to finish scan"
- id: tps
  label: TP Scan (RDS Model Only)
  kind: action
  command: "!1TPS{param}"
  params:
    - name: param
      type: enum
      values:
        - ""       # empty parameter starts TP Scan
        - "ENTER"  # finish TP Scan
- id: xcn_query
  label: XM Channel Name Query (XM Model Only)
  kind: query
  command: "!1XCNQSTN"
  params: []
- id: xat_query
  label: XM Artist Name Query (XM Model Only)
  kind: query
  command: "!1XATQSTN"
  params: []
- id: xti_query
  label: XM Title Query (XM Model Only)
  kind: query
  command: "!1XTIQSTN"
  params: []
- id: xch_set
  label: XM Channel Number Set (XM Model Only)
  kind: action
  command: "!1XCH{channel}"
  params:
    - name: channel
      type: string
      description: "000-255, or UP/DOWN"
- id: xch_query
  label: XM Channel Number Query
  kind: query
  command: "!1XCHQSTN"
  params: []
- id: xct_set
  label: XM Category Set (XM Model Only)
  kind: action
  command: "!1XCT{category}"
  params:
    - name: category
      type: string
      description: "Category info string, or UP/DOWN"
- id: xct_query
  label: XM Category Query
  kind: query
  command: "!1XCTQSTN"
  params: []
- id: scn_query
  label: SIRIUS Channel Name Query (SIRIUS Model Only)
  kind: query
  command: "!1SCNQSTN"
  params: []
- id: sat_query
  label: SIRIUS Artist Name Query (SIRIUS Model Only)
  kind: query
  command: "!1SATQSTN"
  params: []
- id: sti_query
  label: SIRIUS Title Query (SIRIUS Model Only)
  kind: query
  command: "!1STIQSTN"
  params: []
- id: sch_set
  label: SIRIUS Channel Number Set (SIRIUS Model Only)
  kind: action
  command: "!1SCH{channel}"
  params:
    - name: channel
      type: string
      description: "000-255, or UP/DOWN"
- id: sch_query
  label: SIRIUS Channel Number Query
  kind: query
  command: "!1SCHQSTN"
  params: []
- id: sct_set
  label: SIRIUS Category Set (SIRIUS Model Only)
  kind: action
  command: "!1SCT{category}"
  params:
    - name: category
      type: string
      description: "Category info string, or UP/DOWN"
- id: sct_query
  label: SIRIUS Category Query
  kind: query
  command: "!1SCTQSTN"
  params: []
- id: slk
  label: SIRIUS Parental Lock (SIRIUS Model Only)
  kind: action
  command: "!1SLK{param}"
  params:
    - name: param
      type: string
      description: "nnnn = 4-digit lock password, INPUT (display password prompt), WRONG (display wrong-password message)"
- id: hat_query
  label: HD Radio Artist Name Query (HD Radio Model Only)
  kind: query
  command: "!1HATQSTN"
  params: []
- id: hcn_query
  label: HD Radio Channel Name Query (HD Radio Model Only)
  kind: query
  command: "!1HCNQSTN"
  params: []
- id: hti_query
  label: HD Radio Title Query (HD Radio Model Only)
  kind: query
  command: "!1HTIQSTN"
  params: []
- id: hds_query
  label: HD Radio Detail Info Query (HD Radio Model Only)
  kind: query
  command: "!1HDSQSTN"
  params: []
- id: hpr_set
  label: HD Radio Channel Program Set (HD Radio Model Only)
  kind: action
  command: "!1HPR{program}"
  params:
    - name: program
      type: string
      description: "01-08"
- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  command: "!1HPRQSTN"
  params: []
- id: hbl_set
  label: HD Radio Blend Mode Set (HD Radio Model Only)
  kind: action
  command: "!1HBL{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # Auto
        - "01"  # Analog
- id: hbl_query
  label: HD Radio Blend Mode Query
  kind: query
  command: "!1HBLQSTN"
  params: []
- id: hts_query
  label: HD Radio Tuner Status Query (HD Radio Model Only)
  kind: query
  command: "!1HTSQSTN"
  params: []
  # response "mmnnoo": mm 00=not HD/01=HD, nn current program 01-08, oo receivable-program bitmask (hex)

# ---------- Main Zone: Net-Tune / Network ----------
- id: ntc
  label: Net/USB Operation (Net-Tune before TX-NR1000; Network/USB after TX-NR905)
  kind: action
  command: "!1NTC{key}"
  params:
    - name: key
      type: enum
      values:
        - "PLAY"
        - "STOP"
        - "PAUSE"
        - "TRUP"      # Track Up
        - "TRDN"      # Track Down
        - "FF"        # continuous; send repeatedly, max 100ms between codes
        - "REW"       # continuous; send repeatedly, max 100ms between codes
        - "REPEAT"
        - "RANDOM"
        - "DISPLAY"
        - "ALBUM"
        - "ARTIST"
        - "GENRE"
        - "PLAYLIST"
        - "RIGHT"
        - "LEFT"
        - "UP"
        - "DOWN"
        - "SELECT"
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
        - "DELETE"
        - "CAPS"
        - "LOCATION"
        - "LANGUAGE"
        - "SETUP"
        - "RETURN"
        - "CHUP"      # CH Up (for iRadio)
        - "CHDN"      # CH Down (for iRadio)
- id: nat_query
  label: Net/USB Artist Name Query
  kind: query
  command: "!1NATQSTN"
  params: []
- id: nal_query
  label: Net/USB Album Name Query
  kind: query
  command: "!1NALQSTN"
  params: []
- id: nti_query
  label: Net/USB Title Name Query
  kind: query
  command: "!1NTIQSTN"
  params: []
- id: ntm_query
  label: Net/USB Time Info Query
  kind: query
  command: "!1NTMQSTN"
  params: []
  # response "mm:ss/mm:ss" elapsed/track time, max 99:59
- id: ntr_query
  label: Net/USB Track Info Query
  kind: query
  command: "!1NTRQSTN"
  params: []
  # response "cccc/tttt" current track/total track, max 9999
- id: nst_query
  label: Net/USB Play Status Query
  kind: query
  command: "!1NSTQSTN"
  params: []
  # response "prs": p = S(stop)/P(play)/p(pause)/F(FF)/R(FR), r = -(off)/R(all)/F(folder)/1(repeat 1)
- id: npr
  label: Internet Radio Preset Set
  kind: action
  command: "!1NPR{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40"

# ---------- Onkyo RI System ----------
- id: ccd
  label: RI CD Player Operation
  kind: action
  command: "!1CCD{key}"
  params:
    - name: key
      type: enum
      values: ["POWER", "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON"]
- id: ct1
  label: RI TAPE1(A) Operation
  kind: action
  command: "!1CT1{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
- id: ct2
  label: RI TAPE2(B) Operation
  kind: action
  command: "!1CT2{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
- id: ceq
  label: RI Graphics Equalizer Operation
  kind: action
  command: "!1CEQ{key}"
  params:
    - name: key
      type: enum
      values: ["POWER", "PRESET"]
- id: cdt
  label: RI DAT Recorder Operation
  kind: action
  command: "!1CDT{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
- id: cdv
  label: RI DVD Player Operation
  kind: action
  command: "!1CDV{key}"
  params:
    - name: key
      type: enum
      values: ["POWER", "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"]
- id: cmd
  label: RI MD Recorder Operation
  kind: action
  command: "!1CMD{key}"
  params:
    - name: key
      type: enum
      values: ["POWER", "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY"]
- id: ccr
  label: RI CD-R Recorder Operation
  kind: action
  command: "!1CCR{key}"
  params:
    - name: key
      type: enum
      values: ["POWER", "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"]

# ---------- Zone 2 ----------
- id: zpw_set
  label: Zone2 Power Set
  kind: action
  command: "!1ZPW{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Zone2 Standby
        - "01"  # Zone2 On
- id: zpw_query
  label: Zone2 Power Query
  kind: query
  command: "!1ZPWQSTN"
  params: []
- id: zmt_set
  label: Zone2 Muting Set
  kind: action
  command: "!1ZMT{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Muting Off
        - "01"  # Muting On
        - "TG"  # Wrap-Around
- id: zmt_query
  label: Zone2 Muting Query
  kind: query
  command: "!1ZMTQSTN"
  params: []
- id: zvl_set
  label: Zone2 Volume Set
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 = 0-100 (or 00-50 = 0-80 depending on model), or UP/DOWN; only works when main is ON"
- id: zvl_query
  label: Zone2 Volume Query
  kind: query
  command: "!1ZVLQSTN"
  params: []
- id: ztn_set
  label: Zone2 Tone Set
  kind: action
  command: "!1ZTN{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx (xx -A..00..+A, -10..0..+10 in 2 steps) or BUP/BDOWN/TUP/TDOWN; only works when main is ON and Zone2 powered or variable"
- id: ztn_query
  label: Zone2 Tone Query
  kind: query
  command: "!1ZTNQSTN"
  params: []
- id: zbl_set
  label: Zone2 Balance Set
  kind: action
  command: "!1ZBL{param}"
  params:
    - name: param
      type: string
      description: "xx -A..00..+A (-10..0..+10 in 2 steps) or UP (to R 2 step)/DOWN (to L 2 step)"
- id: zbl_query
  label: Zone2 Balance Query
  kind: query
  command: "!1ZBLQSTN"
  params: []
- id: slz_set
  label: Zone2 Selector Set
  kind: action
  command: "!1SLZ{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VIDEO1 / VCR/DVR
        - "01"  # VIDEO2 / CBL/SAT
        - "02"  # VIDEO3 / GAME/TV
        - "03"  # VIDEO4 / AUX1(AUX)
        - "04"  # VIDEO5 / AUX2
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "30"  # MULTI CH
        - "40"  # Universal PORT
        - "80"  # SOURCE
- id: slz_query
  label: Zone2 Selector Query
  kind: query
  command: "!1SLZQSTN"
  params: []
- id: tun_z2_set
  label: Tuning Set (Zone2, shared tuner)
  kind: action
  command: "!1TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits direct frequency, or UP/DOWN; TUNER function shared MAIN/ZONE"
- id: tun_z2_query
  label: Tuning Frequency Query (Zone2, shared)
  kind: query
  command: "!1TUNQSTN"
  params: []
- id: tuz_set
  label: Tuning Set (Zone2, separated control)
  kind: action
  command: "!1TUZ{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits direct frequency, or UP/DOWN"
- id: tuz_query
  label: Tuning Frequency Query (Zone2, separated)
  kind: query
  command: "!1TUZQSTN"
  params: []
- id: prs_z2_set
  label: Preset Set (Zone2, shared)
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40; or UP/DOWN"
- id: prs_z2_query
  label: Preset Query (Zone2, shared)
  kind: query
  command: "!1PRSQSTN"
  params: []
- id: prz_set
  label: Preset Set (Zone2, separated control)
  kind: action
  command: "!1PRZ{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40; or UP/DOWN"
- id: prz_query
  label: Preset Query (Zone2, separated)
  kind: query
  command: "!1PRZQSTN"
  params: []
- id: ntc_z2
  label: Net-Tune/Network Operation (Zone2, Net-Tune models)
  kind: action
  command: "!1NTC{key}z"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
  # source lists literal params "PLAYz","STOPz","PAUSEz","TRUPz","TRDNz"
- id: ntz
  label: Network Operation (Zone2, separated control)
  kind: action
  command: "!1NTZ{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
- id: npz
  label: Internet Radio Preset Set (Zone2, separated control)
  kind: action
  command: "!1NPZ{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40"
- id: lmz
  label: Listening Mode Set (Zone2)
  kind: action
  command: "!1LMZ{mode}"
  params:
    - name: mode
      type: enum
      values:
        - "00"  # STEREO
        - "01"  # DIRECT
        - "0F"  # MONO
        - "12"  # MULTIPLEX
        - "87"  # DVS (PLII)
        - "88"  # DVS (NEO6)
- id: ltz_set
  label: Late Night Set (Zone2)
  kind: action
  command: "!1LTZ{level}"
  params:
    - name: level
      type: enum
      values:
        - "00"  # Off
        - "01"  # Low
        - "02"  # High
        - "UP"  # Wrap-Around Up
- id: ltz_query
  label: Late Night Query (Zone2)
  kind: query
  command: "!1LTZQSTN"
  params: []
- id: raz_set
  label: Re-EQ/Academy Filter Set (Zone2)
  kind: action
  command: "!1RAZ{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Both Off
        - "01"  # Re-EQ On
        - "02"  # Academy On
        - "UP"  # Wrap-Around Up
- id: raz_query
  label: Re-EQ/Academy Filter Query (Zone2)
  kind: query
  command: "!1RAZQSTN"
  params: []

# ---------- Zone 3 ----------
- id: pw3_set
  label: Zone3 Power Set
  kind: action
  command: "!1PW3{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Zone3 Standby
        - "01"  # Zone3 On
- id: pw3_query
  label: Zone3 Power Query
  kind: query
  command: "!1PW3QSTN"
  params: []
- id: mt3_set
  label: Zone3 Muting Set
  kind: action
  command: "!1MT3{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Muting Off
        - "01"  # Muting On
        - "TG"  # Wrap-Around
- id: mt3_query
  label: Zone3 Muting Query
  kind: query
  command: "!1MT3QSTN"
  params: []
- id: vl3_set
  label: Zone3 Volume Set
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 = 0-100 (or 00-50 = 0-80 depending on model), or UP/DOWN"
- id: vl3_query
  label: Zone3 Volume Query
  kind: query
  command: "!1VL3QSTN"
  params: []
- id: tn3_set
  label: Zone3 Tone Set
  kind: action
  command: "!1TN3{param}"
  params:
    - name: param
      type: string
      description: "Bxx/Txx (xx -A..00..+A, -10..0..+10 in 2 steps) or BUP/BDOWN/TUP/TDOWN"
- id: tn3_query
  label: Zone3 Tone Query
  kind: query
  command: "!1TN3QSTN"
  params: []
- id: bl3_set
  label: Zone3 Balance Set
  kind: action
  command: "!1BL3{param}"
  params:
    - name: param
      type: string
      description: "xx -A..00..+A (-10..0..+10 in 2 steps) or UP/DOWN"
- id: bl3_query
  label: Zone3 Balance Query
  kind: query
  command: "!1BL3QSTN"
  params: []
- id: sl3_set
  label: Zone3 Selector Set
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VIDEO1 / VCR/DVR
        - "01"  # VIDEO2 / CBL/SAT
        - "02"  # VIDEO3 / GAME/TV
        - "03"  # VIDEO4 / AUX1(AUX)
        - "04"  # VIDEO5 / AUX2
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE(1)
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "30"  # MULTI CH
        - "31"  # XM (XM/SIRIUS models only)
        - "32"  # SIRIUS (XM/SIRIUS models only)
        - "40"  # Universal PORT
        - "80"  # SOURCE
- id: sl3_query
  label: Zone3 Selector Query
  kind: query
  command: "!1SL3QSTN"
  params: []
- id: tu3_set
  label: Tuning Set (Zone3, separated control)
  kind: action
  command: "!1TU3{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits direct frequency, or UP/DOWN"
- id: tu3_query
  label: Tuning Frequency Query (Zone3)
  kind: query
  command: "!1TU3QSTN"
  params: []
- id: pr3_set
  label: Preset Set (Zone3, separated control)
  kind: action
  command: "!1PR3{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40; or UP/DOWN"
- id: pr3_query
  label: Preset Query (Zone3)
  kind: query
  command: "!1PR3QSTN"
  params: []
- id: nt3
  label: Network Operation (Zone3)
  kind: action
  command: "!1NT3{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
- id: np3
  label: Internet Radio Preset Set (Zone3)
  kind: action
  command: "!1NP3{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40"

# ---------- Zone 4 ----------
- id: pw4_set
  label: Zone4 Power Set
  kind: action
  command: "!1PW4{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Zone4 Standby
        - "01"  # Zone4 On
- id: pw4_query
  label: Zone4 Power Query
  kind: query
  command: "!1PW4QSTN"
  params: []
- id: mt4_set
  label: Zone4 Muting Set
  kind: action
  command: "!1MT4{state}"
  params:
    - name: state
      type: enum
      values:
        - "00"  # Muting Off
        - "01"  # Muting On
        - "TG"  # Wrap-Around
- id: mt4_query
  label: Zone4 Muting Query
  kind: query
  command: "!1MT4QSTN"
  params: []
- id: vl4_set
  label: Zone4 Volume Set
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: "Hex 00-64 = 0-100 (or 00-50 = 0-80 depending on model), or UP/DOWN"
- id: vl4_query
  label: Zone4 Volume Query
  kind: query
  command: "!1VL4QSTN"
  params: []
- id: sl4_set
  label: Zone4 Selector Set
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: enum
      values:
        - "00"  # VIDEO1 / VCR/DVR
        - "01"  # VIDEO2 / CBL/SAT
        - "02"  # VIDEO3 / GAME/TV / GAME
        - "03"  # VIDEO4 / AUX1(AUX)
        - "04"  # VIDEO5 / AUX2
        - "05"  # VIDEO6
        - "06"  # VIDEO7
        - "10"  # DVD
        - "20"  # TAPE(1) / TV/TAPE
        - "21"  # TAPE2
        - "22"  # PHONO
        - "23"  # CD
        - "24"  # FM
        - "25"  # AM
        - "26"  # TUNER
        - "27"  # MUSIC SERVER
        - "28"  # INTERNET RADIO
        - "29"  # USB/USB(Front)
        - "2A"  # USB(Rear)
        - "30"  # MULTI CH
        - "31"  # XM (XM/SIRIUS models only)
        - "32"  # SIRIUS (XM/SIRIUS models only)
        - "40"  # Universal PORT
        - "80"  # SOURCE
- id: sl4_query
  label: Zone4 Selector Query
  kind: query
  command: "!1SL4QSTN"
  params: []
- id: tu4_set
  label: Tuning Set (Zone4, separated control)
  kind: action
  command: "!1TU4{frequency}"
  params:
    - name: frequency
      type: string
      description: "5 digits: FM nnn.nn MHz / AM nnnnn kHz, or UP/DOWN"
- id: tu4_query
  label: Tuning Frequency Query (Zone4)
  kind: query
  command: "!1TU4QSTN"
  params: []
- id: pr4_set
  label: Preset Set (Zone4, separated control)
  kind: action
  command: "!1PR4{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40; or UP/DOWN"
- id: pr4_query
  label: Preset Query (Zone4)
  kind: query
  command: "!1PR4QSTN"
  params: []
- id: nt4
  label: Network Operation (Zone4)
  kind: action
  command: "!1NT4{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "TRUP", "TRDN"]
- id: np4
  label: Internet Radio Preset Set (Zone4)
  kind: action
  command: "!1NP4{preset}"
  params:
    - name: preset
      type: string
      description: "Hex 01-28 = presets 1-40"

# ---------- Dock (via RI) ----------
- id: cds
  label: Docking Station Operation via RI
  kind: action
  command: "!1CDS{key}"
  params:
    - name: key
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
```

## Feedbacks
```yaml
# Command Message "SLI03" -> Receiver responds with Status Message "SLI03" (echo of command).
# Question Message "SLIQSTN" -> Receiver responds with Status Message "SLI03".
- id: power_state
  type: enum
  values: [standby, on]
  # PWRQSTN response: PWR00 (standby) / PWR01 (on)
- id: audio_muting
  type: enum
  values: [off, on]
- id: master_volume
  type: string
  # MVL response, hex level (e.g. MVL28)
- id: input_selector
  type: enum
  # SLI response with input code from SLI table
- id: listening_mode
  type: enum
  # LMD response with mode code from LMD table
- id: sleep_time
  type: string
  # SLP response, hex 01-5A or OFF
- id: dimmer_level
  type: enum
  values: [bright, dim, dark, shut_off, bright_led_off]
- id: zone2_power
  type: enum
  values: [standby, on]
- id: zone2_volume
  type: string
- id: zone3_power
  type: enum
  values: [standby, on]
- id: zone3_volume
  type: string
- id: zone4_power
  type: enum
  values: [standby, on]
- id: zone4_volume
  type: string
- id: audio_info
  type: string
  # IFA response "nnnnn:nnnnn" - also returned when DIF02 sent
- id: video_info
  type: string
  # IFV response "nnnnn:nnnnn" - also returned when DIF03 sent
- id: net_usb_play_status
  type: string
  # NST response "prs": p = S/P/p/F/R, r = -/R/F/1
- id: net_usb_time_info
  type: string
  # NTM response "mm:ss/mm:ss"
- id: net_usb_track_info
  type: string
  # NTR response "cccc/tttt"
- id: tuning_frequency
  type: string
- id: preset_number
  type: string
# UNRESOLVED: full response string formats for many queries not exhaustively documented in source
```

## Variables
```yaml
- id: master_volume_level
  type: integer
  min: 0
  max: 100
  # set via MVL, hex 00-64 (or 0-80, hex 00-50 depending on model)
- id: zone2_volume_level
  type: integer
  min: 0
  max: 100
  # set via ZVL
- id: zone3_volume_level
  type: integer
  min: 0
  max: 100
  # set via VL3
- id: zone4_volume_level
  type: integer
  min: 0
  max: 100
  # set via VL4
- id: sleep_timer_minutes
  type: integer
  min: 1
  max: 90
  # set via SLP, hex 01-5A
```

## Events
```yaml
# Event Notice Communication (source section 2.3): when system status changes, Receiver
# notifies Controller by sending the new current status (unsolicited ISCP status message,
# e.g. "SLI03" sent from Receiver to Controller). Applies to any state change.
- id: status_change_notification
  description: "Unsolicited status message sent on any status change; format is ISCP message of changed parameter (e.g. SLI03)."
# UNRESOLVED: exhaustive list of which parameters push unsolicited notifications not stated in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- ISCP message = 3 command chars + variable-length parameter. Controller→Device frame: `!` start char, `1` destination unit char (Receiver), ISCP message, end char `[CR]`/`[LF]`/`[CR][LF]`.
- Device→Controller frame: `!`, `1` (source unit char), ISCP message (e.g. `SST00` power standby status), end char `[EOF]` (0x1A).
- eISCP packet (TCP): magic `ISCP`, header size 0x00000010 (big-endian; future-extendable, must be read from packet), data size (big-endian), version 0x01, reserved 0x000000. Data = ISCP message with unit char, end char `[EOF]` / `[EOF][CR]` / `[EOF][CR][LF]` depending on model.
- Default TCP destination port 60128, configurable 49152-65535 via receiver setup menu; standby cycle required after change.
- Hold one continuous TCP connection; only one client connection supported at a time — otherwise status notices cannot be delivered.
- Command→response timing: receiver responds within 50 msec; no response within 50 msec means communication failed. Interval between received messages must be more than 50 msec.
- NTC FF/REW: commands must be sent continuously with no more than 100 ms delay between codes.
- TUNER/XM/SIRIUS/HD Radio function shared between MAIN and ZONE sides; Zone2 has both shared (TUN/PRS) and separated-control (TUZ/PRZ) variants.
- Zone2 volume/tone/balance only work when main zone is ON and Zone2 powered or variable.
- TGA/TGB/TGC only available when each 12V Trigger parameter is "OFF" at Setup Menu.
- Receiver MAC address must be confirmed on the receiver setup menu (source states this; no protocol command for it).
- Special chars: [CR]=0x0D, [LF]=0x0A, [EOF]=0x1A.
- Source doc version 1.15 (31 Aug 2009) references TX-SR805/TX-NR905/TX-NR1000-era feature gating; DRX-series feature subset per model is not itemized.
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version beyond eISCP header version 0x01 not stated -->
<!-- UNRESOLVED: which DRX models support Zone 3 / Zone 4 / HD Radio / XM / SIRIUS not stated per-model in source -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T15:41:27.913Z
last_checked_at: 2026-09-11T22:17:43.418Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-11T22:17:43.418Z
matched_actions: 188
action_count: 188
confidence: medium
summary: "All 188 wire-literal spec commands match documented ISCP command codes in source; transport params (port 60128, 9600 8N1, TCP, no auth) all sourced verbatim. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact DRX model list and firmware compatibility not stated in source (doc dated 2009, references TX-SR805/TX-NR905/TX-NR1000 era models)"
- "full response string formats for many queries not exhaustively documented in source"
- "exhaustive list of which parameters push unsolicited notifications not stated in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "protocol version beyond eISCP header version 0x01 not stated"
- "which DRX models support Zone 3 / Zone 4 / HD Radio / XM / SIRIUS not stated per-model in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
