---
spec_id: admin/marantz-pd4250d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Marantz PD4250D Control Spec"
manufacturer: Marantz
model_family: PD4250D
aliases: []
compatible_with:
  manufacturers:
    - Marantz
  models:
    - PD4250D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - heimkinoraum.de
  - marantz.com
  - manualslib.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw8fd12025/./archive-downloads/dfu_pd4250d_final_eng.pdf
  - "https://www.manualslib.com/manual/98953/Marantz-Pd4250d.html?page=32"
retrieved_at: 2026-06-02T04:40:04.090Z
last_checked_at: 2026-06-02T17:23:27.235Z
generated_at: 2026-06-02T17:23:27.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document explicitly references X1100, S700, S70, X4100 model variants throughout the command list. It is unclear whether the full command set applies to the PD4250D specifically; command compatibility by sub-feature is noted in the source where applicable."
  - "firmware version compatibility not stated in source."
  - "specific PD4250D applicability of the AV-receiver command set not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:27.235Z
  matched_actions: 136
  action_count: 136
  confidence: medium
  summary: "All 136 spec actions have literal wire-level matches in the source command table and all transport values are confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Marantz PD4250D Control Spec

## Summary
Control protocol for a Marantz AV component (source document references Marantz AVR/AV receiver command set; PD4250D association inferred from operator-supplied context). Spec covers RS-232C (DB-9, 9600/8-N-1) and Ethernet (TCP/23 telnet) transports using ASCII command strings terminated by CR (0x0D).

<!-- UNRESOLVED: source document explicitly references X1100, S700, S70, X4100 model variants throughout the command list. It is unclear whether the full command set applies to the PD4250D specifically; command compatibility by sub-feature is noted in the source where applicable. -->

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
  connector: DB-9 female (DCE)  # source: "DB-9pin female type, slave straight connection (DCE type)"
addressing:
  port: 23  # source: "TCP port 23 (telnet)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from PW command examples
- routable  # inferred from SI input source commands
- levelable  # inferred from MV/CV volume commands
- queryable  # inferred from `?` request commands returning state
```

## Actions
```yaml
# Power
- id: pw
  label: Power
  kind: action
  command: "PW{param}"
  params:
    - name: param
      type: string
      description: "ON | STANDBY | ? (status query)"

# Master volume
- id: mv
  label: Master Volume
  kind: action
  command: "MV{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-98, two ASCII digits, 80=0dB, 00=min> | ? (status query). 0.5dB step uses 3 ASCII digits (e.g. MV805=+0.5dB)."

# Channel volume
- id: cv
  label: Channel Volume
  kind: action
  command: "CV{ch}{param}"
  params:
    - name: ch
      type: string
      description: "FL | FR | C | SW | SW2 | SL | SR | SBL | SBR | SB | FHL | FHR | FWL | FWR | TFL | TFR | TML | TMR | TRL | TRR | RHL | RHR | FDL | FDR | SDL | SDR | BDL | BDR | SHL | SHR | TS"
    - name: param
      type: string
      description: "UP | DOWN | <level> | ZRL (reset all channels to factory defaults) | ? (status query). Range 00 or 38-62, 50=0dB."

# Mute
- id: mu
  label: Output Mute
  kind: action
  command: "MU{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"

# Input select
- id: si
  label: Select Input Source
  kind: action
  command: "SI{source}"
  params:
    - name: source
      type: string
      description: "PHONO | CD | TUNER | DVD | BD | TV | SAT/CBL | MPLAY | GAME | HDRADIO | NET | PANDORA | SIRIUSXM | SPOTIFY | LASTFM | FLICKR | IRADIO | SERVER | FAVORITES | AUX1 | AUX2 | AUX3 | AUX4 | AUX5 | AUX6 | AUX7 | BT | USB/IPOD | USB | IPD | IRP | FVP | ? (status query)"

# Main zone
- id: zm
  label: Main Zone
  kind: action
  command: "ZM{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | FAVORITE1 | FAVORITE2 | FAVORITE3 | FAVORITE4 | FAVORITE1 MEMORY | FAVORITE2 MEMORY | FAVORITE3 MEMORY | FAVORITE4 MEMORY | ? (status query)"

# Rec select
- id: sr
  label: Rec Select
  kind: action
  command: "SR{param}"
  params:
    - name: param
      type: string
      description: "PHONO | CD | TUNER | DVD | BD | TV | SAT/CBL | MPLAY | GAME | HDRADIO | NET | PANDORA | SIRIUSXM | SPOTIFY | LASTFM | FLICKR | IRADIO | SERVER | FAVORITES | AUX1-AUX7 | BT | USB/IPOD | USB DIRECT | IPOD DIRECT | SOURCE (cancel) | ? (status query)"

# Signal / input mode
- id: sd
  label: Signal/Input Mode
  kind: action
  command: "SD{mode}"
  params:
    - name: mode
      type: string
      description: "AUTO | HDMI | DIGITAL | ANALOG | EXT.IN | 7.1IN | NO | ARC | ? (status query)"

# Digital input mode
- id: dc
  label: Digital Input Mode
  kind: action
  command: "DC{mode}"
  params:
    - name: mode
      type: string
      description: "AUTO | PCM | DTS | ? (status query)"

# Video select
- id: sv
  label: Video Select
  kind: action
  command: "SV{source}"
  params:
    - name: source
      type: string
      description: "DVD | BD | TV | SAT/CBL | MPLAY | GAME | AUX1-AUX7 | CD | SOURCE (cancel) | ON | OFF | ? (status query)"

# Sleep timer
- id: slp
  label: Sleep Timer
  kind: action
  command: "SLP{param}"
  params:
    - name: param
      type: string
      description: "OFF | <001-120 minutes, 3 ASCII digits, 010=10min> | ? (status query)"

# Auto standby
- id: stby
  label: Auto Standby
  kind: action
  command: "STBY{param}"
  params:
    - name: param
      type: string
      description: "15M | 30M | 60M | OFF | ? (status query)"

# Eco mode
- id: eco
  label: Eco Mode
  kind: action
  command: "ECO{mode}"
  params:
    - name: mode
      type: string
      description: "ON | AUTO | OFF | ? (status query)"

# Surround mode
- id: ms
  label: Surround Mode
  kind: action
  command: "MS{mode}"
  params:
    - name: mode
      type: string
      description: "MOVIE | MUSIC | GAME | DIRECT | DSD DIRECT | PURE DIRECT | DSD PURE DIRECT | STEREO | AUTO | DOLBY DIGITAL | DOLBY PRO LOGIC | DOLBY PL2 C/M/G | DOLBY PL2X C/M/G | DOLBY PL2Z H | DOLBY SURROUND | DOLBY ATMOS | DOLBY D EX | DOLBY D+PL2X C/M | DOLBY D+PL2Z H | DOLBY D+DS | DOLBY D+NEO:X C/M/G | DTS SURROUND | DTS ES DSCRT6.1 | DTS ES MTRX6.1 | DTS+PL2X C/M | DTS+PL2Z H | DTS+DS | DTS96/24 | DTS96 ES MTRX | DTS+NEO:6 | DTS+NEO:X C/M/G | MULTI CH IN | M CH IN+DOLBY EX | M CH IN+PL2X C/M | M CH IN+PL2Z H | M CH IN+DS | MULTI CH IN 7.1 | M CH IN+NEO:X C/M/G | DOLBY D+ | DOLBY D+ +EX | DOLBY D+ +PL2X C/M | DOLBY D+ +PL2Z H | DOLBY D+ +DS | DOLBY D+ +NEO:X C/M/G | DOLBY HD | DOLBY HD+EX | DOLBY HD+PL2X C/M | DOLBY HD+PL2Z H | DOLBY HD+DS | DOLBY HD+NEO:X C/M/G | DTS HD | DTS HD MSTR | DTS HD+PL2X C/M | DTS HD+PL2Z H | DTS HD+DS | DTS HD+NEO:6 | DTS HD+NEO:X C/M/G | DTS EXPRESS | DTS ES 8CH DSCRT | MPEG2 AAC | AAC+DOLBY EX | AAC+PL2X C/M | AAC+PL2Z H | AAC+DS | AAC+NEO:X C/M/G | PL DSX | PL2 C DSX | PL2 M DSX | PL2 G DSX | AUDYSSEY DSX | DTS NEO:6 C/M | DTS NEO:X C/M/G | AURO3D | AURO2DSURR | MCH STEREO | WIDE SCREEN | SUPER STADIUM | ROCK ARENA | JAZZ CLUB | CLASSIC CONCERT | MONO MOVIE | MATRIX | VIDEO GAME | VIRTUAL | LEFT | RIGHT | ALL ZONE STEREO | 7.1IN | PURE DIRECT EXT | QUICK1-5 | QUICK1-5 MEMORY | QUICK ? | ? (status query)"

# Video / HDMI / aspect / resolution / output / VPM / VST
- id: vs
  label: Video / HDMI
  kind: action
  command: "VS{group}{param}"
  params:
    - name: group
      type: string
      description: "ASP | MONI | SC | SCH | AUDIO | VPM | VST"
    - name: param
      type: string
      description: "ASP: ASPNRM | ASPFUL | ASP ?  MONI: MONIAUTO | MONI1 | MONI2 | MONI ?  SC: SC48P | SC10I | SC72P | SC10P | SC10P24 | SC4K | SC4KF | SCAUTO | SC ?  SCH: SCH48P | SCH10I | SCH72P | SCH10P | SCH10P24 | SCH4K | SCH4KF | SCHAUTO | SCH ?  AUDIO: AUDIO AMP | AUDIO TV | AUDIO ?  VPM: VPMAUTO | VPMGAME | VPMMOVI | VPM ?  VST: VST ON | VST OFF | VST ?"

# PS sub-commands (parameter setting)
- id: ps_tone_ctrl
  label: PS - Tone Control
  kind: action
  command: "PSTONE CTRL{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_bas
  label: PS - Bass
  kind: action
  command: "PSBAS{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 50=0dB; range 44-56> | ? (status query)"
- id: ps_tre
  label: PS - Treble
  kind: action
  command: "PSTRE{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 50=0dB; range 44-56> | ? (status query)"
- id: ps_dil
  label: PS - Dialog Level
  kind: action
  command: "PSDIL{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | UP | DOWN | <38-62, 50=0dB> | ? (status query)"
- id: ps_swl
  label: PS - Subwoofer Level
  kind: action
  command: "PSSWL{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | UP | DOWN | <00 or 38-62, 50=0dB> | ? (status query)"
- id: ps_swl2
  label: PS - Subwoofer 2 Level
  kind: action
  command: "PSSWL2{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00 or 38-62, 50=0dB>"
- id: ps_cinema_eq
  label: PS - Cinema EQ
  kind: action
  command: "PSCINEMA EQ.{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_mode
  label: PS - PL/Decoder Mode
  kind: action
  command: "PSMODE:{mode}"
  params:
    - name: mode
      type: string
      description: "MUSIC | CINEMA | GAME | PRO LOGIC | HEIGHT (EVENT only) | ? (status query)"
- id: ps_lom
  label: PS - Loudness Management
  kind: action
  command: "PSLOM{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_fh
  label: PS - Front Height (PLIIx Height) Output
  kind: action
  command: "PSFH:{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_sp
  label: PS - Speaker Output
  kind: action
  command: "PSSP:{layout}"
  params:
    - name: layout
      type: string
      description: "FW | FH | SB | HW | BH | BW | FL | HF | FR | ? (status query). Layouts combine F.Height/F.Wide/S.Back."
- id: ps_phg
  label: PS - PL2z Height Gain
  kind: action
  command: "PSPHG{level}"
  params:
    - name: level
      type: string
      description: "LOW | MID | HI | ? (status query)"
- id: ps_multeq
  label: PS - MultEQ Mode
  kind: action
  command: "PSMULTEQ:{mode}"
  params:
    - name: mode
      type: string
      description: "AUDYSSEY | BYP.LR | FLAT | MANUAL | OFF | ? (status query)"
- id: ps_dyneq
  label: PS - Dynamic EQ
  kind: action
  command: "PSDYNEQ{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_reflev
  label: PS - Reference Level Offset
  kind: action
  command: "PSREFLEV{level}"
  params:
    - name: level
      type: string
      description: "0 | 5 | 10 | 15 | ? (status query)"
- id: ps_dynvol
  label: PS - Dynamic Volume
  kind: action
  command: "PSDYNVOL{level}"
  params:
    - name: level
      type: string
      description: "HEV (Heavy) | MED (Medium) | LIT (Light) | OFF | ? (status query)"
- id: ps_lfc
  label: PS - Audyssey LFC
  kind: action
  command: "PSLFC{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_cntamt
  label: PS - Containment Amount
  kind: action
  command: "PSCNTAMT{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; AVR range 01-07> | ? (status query)"
- id: ps_dsx
  label: PS - Audyssey DSX
  kind: action
  command: "PSDSX{param}"
  params:
    - name: param
      type: string
      description: "ONHW (Height+Wide) | ONH (Height) | ONW (Width) | OFF | ? (status query)"
- id: ps_stw
  label: PS - Stage Width
  kind: action
  command: "PSSTW{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 50=0dB; range 40-60> | ? (status query)"
- id: ps_sth
  label: PS - Stage Height
  kind: action
  command: "PSSTH{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 50=0dB; range 40-60> | ? (status query)"
- id: ps_geq
  label: PS - Graphic EQ
  kind: action
  command: "PSGEQ{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_drc
  label: PS - Dynamic Compression
  kind: action
  command: "PSDRC{level}"
  params:
    - name: level
      type: string
      description: "AUTO | LOW | MID | HI | OFF | ? (status query)"
- id: ps_bsc
  label: PS - Bass Sync
  kind: action
  command: "PSBSC{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; AVR range 0-16> | ? (status query)"
- id: ps_deh
  label: PS - Dialogue Enhancer
  kind: action
  command: "PSDEH{level}"
  params:
    - name: level
      type: string
      description: "OFF | LOW | MED | HIGH | ? (status query)"
- id: ps_lfe
  label: PS - LFE Level
  kind: action
  command: "PSLFE{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 00=0dB, 10=-10dB; AVR range 0 to -10> | ? (status query)"
- id: ps_lfl
  label: PS - LFE Level (EXT.IN/7.1CH IN)
  kind: action
  command: "PSLFL{level}"
  params:
    - name: level
      type: string
      description: "00 | 05 | 10 | 15 | ? (status query)"
- id: ps_eff
  label: PS - Effect Level
  kind: action
  command: "PSEFF{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | UP | DOWN | <00-99, 00=0dB, 10=10dB; AVR range 1-15> | ? (status query)"
- id: ps_del
  label: PS - Delay
  kind: action
  command: "PSDEL{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <000-999ms, 000=0ms, 300=300ms> | ? (status query). Step 3ms 0-60ms, 10ms above 60ms."
- id: ps_pan
  label: PS - Panorama
  kind: action
  command: "PSPAN{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_dim
  label: PS - Dimension
  kind: action
  command: "PSDIM{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 00=0; AVR range 0-6> | ? (status query)"
- id: ps_cen
  label: PS - Center Width
  kind: action
  command: "PSCEN{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 00=0; AVR range 0-7> | ? (status query)"
- id: ps_cei
  label: PS - Center Image
  kind: action
  command: "PSCEI{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 00=0.0; AVR range 0.0-1.0> | ? (status query)"
- id: ps_ceg
  label: PS - Center Gain
  kind: action
  command: "PSCEG{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 00=0.0; AVR range 0.0-1.0> | ? (status query)"
- id: ps_ces
  label: PS - Center Spread
  kind: action
  command: "PSCES{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_swr
  label: PS - Subwoofer (DIRECT/STEREO 2ch)
  kind: action
  command: "PSSWR{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: ps_rsz
  label: PS - Room Size
  kind: action
  command: "PSRSZ{size}"
  params:
    - name: size
      type: string
      description: "S | MS | M | ML | L | ? (status query)"
- id: ps_delay
  label: PS - Audio Delay
  kind: action
  command: "PSDELAY{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <000-999ms, 000=0ms, 200=200ms; AVR range 0-200> | ? (status query)"
- id: ps_rstr
  label: PS - Audio Restorer
  kind: action
  command: "PSRSTR{level}"
  params:
    - name: level
      type: string
      description: "OFF | LOW (MODE3) | MED (MODE2) | HI (MODE1) | ? (status query)"
- id: ps_front
  label: PS - Front Speaker
  kind: action
  command: "PSFRONT{param}"
  params:
    - name: param
      type: string
      description: "SPA | SPB | A+B | ? (status query)"
- id: ps_auropr
  label: PS - Auro-Matic 3D Preset (Auro-3D Upgrade)
  kind: action
  command: "PSAUROPR{preset}"
  params:
    - name: preset
      type: string
      description: "SMA | MED | LAR | SPE | ? (status query)"
- id: ps_aurost
  label: PS - Auro-Matic 3D Strength (Auro-3D Upgrade)
  kind: action
  command: "PSAUROST{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99, 01=1, 10=10; AVR range 1-16> | ? (status query)"

# PV sub-commands (picture / video)
- id: pv_mode
  label: PV - Picture Mode
  kind: action
  command: "PV{mode}"
  params:
    - name: mode
      type: string
      description: "OFF | STD (Standard) | MOV (Movie) | VVD (Vivid) | STM (Stream) | CTM (Custom) | DAY (ISF Day) | NGT (ISF Night) | ? (status query)"
- id: pv_cn
  label: PV - Contrast
  kind: action
  command: "PVCN{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <000-100, 050=0; AVR range -50 to +50> | ? (status query)"
- id: pv_br
  label: PV - Brightness
  kind: action
  command: "PVBR{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <000-100, 050=0; AVR range -50 to +50> | ? (status query)"
- id: pv_st
  label: PV - Saturation
  kind: action
  command: "PVST{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <000-100, 050=0; AVR range -50 to +50> | ? (status query)"
- id: pv_hue
  label: PV - Hue
  kind: action
  command: "PVHUE{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <44-56, 50=0; AVR range -6 to +6> | ? (status query)"
- id: pv_dnr
  label: PV - DNR
  kind: action
  command: "PVDNR{level}"
  params:
    - name: level
      type: string
      description: "OFF | LOW | MID | HI | ? (status query)"
- id: pv_enh
  label: PV - Enhancer
  kind: action
  command: "PVENH{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-12, 00=0; AVR range 0-12> | ? (status query)"

# Zone 2 control
- id: z2
  label: Zone 2
  kind: action
  command: "Z2{param}"
  params:
    - name: param
      type: string
      description: "SOURCE (cancel, mirror main) | PHONO | CD | TUNER | DVD | BD | TV | SAT/CBL | MPLAY | GAME | HDRADIO | NET | PANDORA | SIRIUSXM | SPOTIFY | LASTFM | FLICKR | IRADIO | SERVER | FAVORITES | AUX1-AUX7 | BT | USB/IPOD | USB | IPD | IRP | FVP | QUICK1-5 | QUICK0 | QUICK1-5 MEMORY | QUICK ? | FAVORITE1-4 | FAVORITE1-4 MEMORY | UP | DOWN | <00-98, 80=0dB, 00=min> | ON | OFF | ? (status query)"
- id: z2mu
  label: Zone 2 Mute
  kind: action
  command: "Z2MU{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: z2cs
  label: Zone 2 Channel Setting
  kind: action
  command: "Z2CS{param}"
  params:
    - name: param
      type: string
      description: "ST (Stereo) | MONO | ? (status query)"
- id: z2cv
  label: Zone 2 Channel Volume
  kind: action
  command: "Z2CV{ch}{param}"
  params:
    - name: ch
      type: string
      description: "FL | FR"
    - name: param
      type: string
      description: "UP | DOWN | <38-62, 50=0dB> | ? (status query)"
- id: z2hpf
  label: Zone 2 HPF
  kind: action
  command: "Z2HPF{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: z2ps_bas
  label: Zone 2 PS - Bass
  kind: action
  command: "Z2PSBAS{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; 50=0dB; X4100 range 36-64 in 2dB step, others 40-60> | ? (status query)"
- id: z2ps_tre
  label: Zone 2 PS - Treble
  kind: action
  command: "Z2PSTRE{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; 50=0dB; X4100 range 36-64 in 2dB step, others 40-60> | ? (status query)"
- id: z2hda
  label: Zone 2 HDMI Audio
  kind: action
  command: "Z2HDA{mode}"
  params:
    - name: mode
      type: string
      description: "THR (Through) | PCM | ? (status query)"
- id: z2slp
  label: Zone 2 Sleep Timer
  kind: action
  command: "Z2SLP{param}"
  params:
    - name: param
      type: string
      description: "OFF | <001-120 minutes, 3 ASCII digits, 010=10min> | ? (status query)"
- id: z2stby
  label: Zone 2 Auto Standby
  kind: action
  command: "Z2STBY{param}"
  params:
    - name: param
      type: string
      description: "2H | 4H | 8H | OFF | ? (status query)"

# Zone 3 control
- id: z3
  label: Zone 3
  kind: action
  command: "Z3{param}"
  params:
    - name: param
      type: string
      description: "SOURCE (cancel, mirror main) | PHONO | CD | TUNER | DVD | BD | TV | SAT/CBL | MPLAY | GAME | HDRADIO | NET | PANDORA | SIRIUSXM | SPOTIFY | LASTFM | FLICKR | IRADIO | SERVER | FAVORITES | AUX1-AUX7 | BT | USB/IPOD | USB | IPD | IRP | FVP | QUICK1-5 | QUICK0 | QUICK1-5 MEMORY | QUICK ? | FAVORITE1-4 | FAVORITE1-4 MEMORY | UP | DOWN | <00-98, 80=0dB, 00=min> | ON | OFF | ? (status query)"
- id: z3mu
  label: Zone 3 Mute
  kind: action
  command: "Z3MU{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: z3cs
  label: Zone 3 Channel Setting
  kind: action
  command: "Z3CS{param}"
  params:
    - name: param
      type: string
      description: "ST (Stereo) | MONO | ? (status query)"
- id: z3cv
  label: Zone 3 Channel Volume
  kind: action
  command: "Z3CV{ch}{param}"
  params:
    - name: ch
      type: string
      description: "FL | FR"
    - name: param
      type: string
      description: "UP | DOWN | <38-62, 50=0dB> | ? (status query)"
- id: z3hpf
  label: Zone 3 HPF
  kind: action
  command: "Z3HPF{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: z3ps_bas
  label: Zone 3 PS - Bass
  kind: action
  command: "Z3PSBAS{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; 50=0dB; X4100 range 36-64 in 2dB step, others 40-60> | ? (status query)"
- id: z3ps_tre
  label: Zone 3 PS - Treble
  kind: action
  command: "Z3PSTRE{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <00-99; 50=0dB; X4100 range 36-64 in 2dB step, others 40-60> | ? (status query)"
- id: z3slp
  label: Zone 3 Sleep Timer
  kind: action
  command: "Z3SLP{param}"
  params:
    - name: param
      type: string
      description: "OFF | <001-120 minutes, 3 ASCII digits, 010=10min> | ? (status query)"
- id: z3stby
  label: Zone 3 Auto Standby
  kind: action
  command: "Z3STBY{param}"
  params:
    - name: param
      type: string
      description: "2H | 4H | 8H | OFF | ? (status query)"

# Tuner (AM/FM analog)
- id: tf_an
  label: Tuner Frequency (AM/FM Analog)
  kind: action
  command: "TFAN{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <6 digits: ****.**kHz AM (>050000) or ****.**MHz FM (<050000)> | ? (status query). Sub: ANNAME? returns RDS station name (EU/AP only)."
- id: tp_an
  label: Tuner Preset Channel (AM/FM Analog)
  kind: action
  command: "TPAN{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <01-56 preset number> | OFF | ? (status query) | MEM (start preset memory) | MEM<01-56> (preset memory direct)"
- id: tm_an
  label: Tuner Band/Mode (AM/FM Analog)
  kind: action
  command: "TMAN{param}"
  params:
    - name: param
      type: string
      description: "AM | FM | AUTO | MANUAL | ? (status query)"

# HD Radio
- id: tf_hd
  label: HD Radio Frequency
  kind: action
  command: "TFHD{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <6 digits: ****.**kHz AM or ****.**MHz FM> | MC<1-8, analog 0> (multicast ch) | <freq>MC<ch> (freq + multicast) | ? (status query)"
- id: tp_hd
  label: HD Radio Preset Channel
  kind: action
  command: "TPHD{param}"
  params:
    - name: param
      type: string
      description: "UP | DOWN | <01-56 preset> | OFF | ? (status query) | MEM (start preset memory) | MEM<01-56>"
- id: tm_hd
  label: HD Radio Band/Mode
  kind: action
  command: "TMHD{param}"
  params:
    - name: param
      type: string
      description: "AM | FM | AUTOHD | AUTO | MANUAL | ANAAUTO (analog auto) | ANAMANU (analog manual) | ? (status query)"
- id: hd
  label: HD Status
  kind: action
  command: "HD?"
  params: []

# NS - Online Music / USB / iPod / Bluetooth control
- id: ns_90
  label: NS - Cursor Up
  kind: action
  command: "NS90"
  params: []
- id: ns_91
  label: NS - Cursor Down
  kind: action
  command: "NS91"
  params: []
- id: ns_92
  label: NS - Cursor Left
  kind: action
  command: "NS92"
  params: []
- id: ns_93
  label: NS - Cursor Right
  kind: action
  command: "NS93"
  params: []
- id: ns_9a
  label: NS - Enter (Play/Pause)
  kind: action
  command: "NS9A"
  params: []
- id: ns_9b
  label: NS - Play
  kind: action
  command: "NS9B"
  params: []
- id: ns_9c
  label: NS - Pause
  kind: action
  command: "NS9C"
  params: []
- id: ns_9d
  label: NS - Stop
  kind: action
  command: "NS9D"
  params: []
- id: ns_9e
  label: NS - Skip Plus
  kind: action
  command: "NS9E"
  params: []
- id: ns_9f
  label: NS - Manual Search Plus
  kind: action
  command: "NS9F"
  params: []
- id: ns_9g
  label: NS - Manual Search Minus
  kind: action
  command: "NS9G"
  params: []
- id: ns_9h
  label: NS - Repeat One
  kind: action
  command: "NS9H"
  params: []
- id: ns_9i
  label: NS - Repeat All
  kind: action
  command: "NS9I"
  params: []
- id: ns_9j
  label: NS - Repeat Off
  kind: action
  command: "NS9J"
  params: []
- id: ns_9k
  label: NS - Random On / Shuffle Songs
  kind: action
  command: "NS9K"
  params: []
- id: ns_9m
  label: NS - Random Off / Shuffle Off
  kind: action
  command: "NS9M"
  params: []
- id: ns_9w
  label: NS - Toggle iPod/On Screen
  kind: action
  command: "NS9W"
  params: []
- id: ns_9x
  label: NS - Page Next
  kind: action
  command: "NS9X"
  params: []
- id: ns_9y
  label: NS - Page Previous
  kind: action
  command: "NS9Y"
  params: []
- id: ns_9z
  label: NS - Manual Search Stop
  kind: action
  command: "NS9Z"
  params: []
- id: ns_rpt
  label: NS - Repeat (toggle)
  kind: action
  command: "NSRPT"
  params: []
- id: ns_rnd
  label: NS - Random (toggle)
  kind: action
  command: "NSRND"
  params: []
- id: ns_b
  label: NS - Preset Call
  kind: action
  command: "NSB{preset}"
  params:
    - name: preset
      type: string
      description: "2 ASCII digits, 00-35 (2014 AVR). Not for Bluetooth/USB/iPod."
- id: ns_c
  label: NS - Preset Memory
  kind: action
  command: "NSC{preset}"
  params:
    - name: preset
      type: string
      description: "2 ASCII digits, 00-35 (2014 AVR). Not for Bluetooth/USB/iPod. Response: NSCOK."
- id: ns_h
  label: NS - Audio Preset Name Status
  kind: action
  command: "NSH"
  params: []
- id: ns_fv_mem
  label: NS - Add Favorites Folder
  kind: action
  command: "NSFV MEM"
  params: []
- id: ns_nsa
  label: NS - Onscreen Display Info (ASCII)
  kind: action
  command: "NSA"
  params: []
- id: ns_nse
  label: NS - Onscreen Display Info (UTF-8)
  kind: action
  command: "NSE"
  params: []

# System control
- id: mn_cup
  label: MN - Cursor Up
  kind: action
  command: "MNCUP"
  params: []
- id: mn_cdn
  label: MN - Cursor Down
  kind: action
  command: "MNCDN"
  params: []
- id: mn_clt
  label: MN - Cursor Left
  kind: action
  command: "MNCLT"
  params: []
- id: mn_crt
  label: MN - Cursor Right
  kind: action
  command: "MNCRT"
  params: []
- id: mn_ent
  label: MN - Enter
  kind: action
  command: "MNENT"
  params: []
- id: mn_rtn
  label: MN - Return
  kind: action
  command: "MNRTN"
  params: []
- id: mn_opt
  label: MN - Option
  kind: action
  command: "MNOPT"
  params: []
- id: mn_inf
  label: MN - Info
  kind: action
  command: "MNINF"
  params: []
- id: mn_chl
  label: MN - Channel Level Menu Toggle
  kind: action
  command: "MNCHL"
  params: []
- id: mn_men
  label: MN - Setup Menu
  kind: action
  command: "MNMEN{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: mn_prv
  label: MN - InstaPrevue
  kind: action
  command: "MNPRV{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query). Returns MNPRV NG when not available."
- id: mn_zst
  label: MN - All Zone Stereo
  kind: action
  command: "MNZST{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF | ? (status query)"
- id: sy_remote_lock
  label: SY - Remote Lock
  kind: action
  command: "SYREMOTE LOCK{param}"
  params:
    - name: param
      type: string
      description: "ON | OFF"
- id: sy_panel_lock
  label: SY - Panel Lock
  kind: action
  command: "SYPANEL{lock}"
  params:
    - name: lock
      type: string
      description: "LOCK ON | LOCK OFF | +V LOCK ON (locks master volume too)"
- id: tr
  label: TR - Trigger
  kind: action
  command: "TR{n}{param}"
  params:
    - name: n
      type: string
      description: "1 | 2 (trigger number)"
    - name: param
      type: string
      description: "ON | OFF | ? (status query, returns both TR1 and TR2 state)"
- id: ug_idn
  label: UG - Display Upgrade ID
  kind: action
  command: "UGIDN"
  params: []
- id: rm
  label: RM - Remote Maintenance
  kind: action
  command: "RM{param}"
  params:
    - name: param
      type: string
      description: "STA (start) | END (end) | ? (status query, returns RM ON/OFF)"
- id: dim
  label: Dimmer
  kind: action
  command: "DIM{param}"
  params:
    - name: param
      type: string
      description: "BRI (Bright) | DIM (Dim) | DAR (Dark) | OFF | SEL (toggle Bright->Dim->Dark->Off) | ? (status query)"
```

## Feedbacks
```yaml
# Per the source, query commands (suffix `?`) return RESPONSE / EVENT strings using
# the same command+parameter+CR structure. Below are the observable state surfaces
# documented in the source.
- id: power_state
  type: enum
  values: [on, standby]
  via_command: "PW?"
- id: master_volume
  type: string
  range: "MV00-MV98 (0.5dB step uses 3 digits e.g. MV805=+0.5dB); 80=0dB, 00=min"
  via_command: "MV?"
- id: channel_volume
  type: string
  range: "CV<ch> <38-62, 50=0dB> (SW/SW2 also accept 00)"
  via_command: "CV?"
  note: "Returns values only for configured speakers, terminated by CVEND"
- id: mute_state
  type: enum
  values: [on, off]
  via_command: "MU?"
- id: input_source
  type: string
  via_command: "SI?"
- id: zone_state
  type: string
  via_command: "ZM?"
- id: rec_select
  type: string
  via_command: "SR?"
- id: signal_mode
  type: string
  via_command: "SD?"
- id: digital_input_mode
  type: string
  via_command: "DC?"
- id: video_select
  type: string
  via_command: "SV?"
- id: sleep_timer
  type: string
  via_command: "SLP?"
- id: auto_standby
  type: string
  via_command: "STBY?"
- id: eco_mode
  type: string
  via_command: "ECO?"
- id: surround_mode
  type: string
  via_command: "MS?"
- id: video_aspect
  type: string
  via_command: "VSASP ?"
- id: hdmi_monitor
  type: string
  via_command: "VSMONI ?"
- id: resolution_scaler
  type: string
  via_command: "VSSC ?"
- id: resolution_scaler_hdmi
  type: string
  via_command: "VSSCH ?"
- id: hdmi_audio_output
  type: string
  via_command: "VSAUDIO ?"
- id: video_processing_mode
  type: string
  via_command: "VSVPM ?"
- id: vertical_stretch
  type: string
  via_command: "VSVST ?"
- id: picture_mode
  type: string
  via_command: "PV?"
- id: zone2_state
  type: string
  via_command: "Z2?"
- id: zone2_mute
  type: string
  via_command: "Z2MU?"
- id: zone2_channel_setting
  type: string
  via_command: "Z2CS?"
- id: zone2_channel_volume
  type: string
  via_command: "Z2CV?"
- id: zone2_hpf
  type: string
  via_command: "Z2HPF?"
- id: zone2_hdmi_audio
  type: string
  via_command: "Z2HDA?"
- id: zone2_sleep
  type: string
  via_command: "Z2SLP?"
- id: zone2_auto_standby
  type: string
  via_command: "Z2STBY?"
- id: zone3_state
  type: string
  via_command: "Z3?"
- id: zone3_mute
  type: string
  via_command: "Z3MU?"
- id: zone3_channel_setting
  type: string
  via_command: "Z3CS?"
- id: zone3_channel_volume
  type: string
  via_command: "Z3CV?"
- id: zone3_hpf
  type: string
  via_command: "Z3HPF?"
- id: zone3_sleep
  type: string
  via_command: "Z3SLP?"
- id: zone3_auto_standby
  type: string
  via_command: "Z3STBY?"
- id: tuner_frequency
  type: string
  via_command: "TFAN?"
- id: rds_station_name
  type: string
  via_command: "TFANNAME?"
  note: "EU/AP models only; returns padded 8-char name or spaces if null"
- id: tuner_preset
  type: string
  via_command: "TPAN?"
- id: tuner_band_mode
  type: string
  via_command: "TMAN?"
- id: hd_radio_frequency
  type: string
  via_command: "TFHD?"
- id: hd_radio_preset
  type: string
  via_command: "TPHD?"
- id: hd_radio_band_mode
  type: string
  via_command: "TMHD?"
- id: hd_radio_metadata
  type: string
  via_command: "HD?"
  note: "Returns BAND, STATION NAME, MULTI CAST CURRENT CH, MULTI CAST NUM, SIGNAL LEVEL (HDSIG LEV 0-6), ARTIST (40 chars), TITLE (40 chars), ALBUM (40 chars), GENRE (23 chars), PROGRAM TYPE (18 chars), HDMODE (DIGITAL/ANALOG)"
- id: setup_menu
  type: string
  via_command: "MNMEN?"
- id: instaprevue
  type: string
  via_command: "MNPRV?"
- id: all_zone_stereo
  type: string
  via_command: "MNZST?"
- id: trigger
  type: string
  via_command: "TR?"
  note: "Returns both TR1 and TR2 state"
- id: dimmer
  type: string
  via_command: "DIM ?"
- id: remote_maintenance
  type: string
  via_command: "RM ?"
  values: [on, off]
- id: upgrade_id
  type: string
  via_command: "UGIDN"
  note: "Returns 12-digit ID, or UGIDN NG on failure"
- id: ns_preset_names
  type: string
  via_command: "NSH"
  note: "Returns 36 x 20-char names (NSH00..NSH35)"
- id: ns_onscreen_info_ascii
  type: string
  via_command: "NSA"
  note: "Returns NSA0-NSA8; 96 bytes per row, _ is null, ※ is flag byte"
- id: ns_onscreen_info_utf8
  type: string
  via_command: "NSE"
  note: "Returns NSE0-NSE8 in UTF-8; 96 bytes per row"
```

## Variables
```yaml
# Parameters that are not discrete actions but continuous settable values.
# Each maps to a `command` template with a numeric placeable.
- id: mv_level
  type: integer
  command_template: "MV{level}"
  range: "00-98 (0.5dB step uses 3 digits)"
  notes: "80=0dB; 00=min"
- id: cv_level
  type: integer
  command_template: "CV{ch} {level}"
  range: "00 or 38-62 (50=0dB); SW/SW2 accept 00"
- id: z2_volume
  type: integer
  command_template: "Z2{level}"
  range: "00-98 (80=0dB; 00=min)"
- id: z3_volume
  type: integer
  command_template: "Z3{level}"
  range: "00-98 (80=0dB; 00=min)"
- id: slp_minutes
  type: integer
  command_template: "SLP{minutes_padded3}"
  range: "001-120 minutes (010=10min)"
- id: stby_minutes
  type: enum
  values: ["15M", "30M", "60M", "OFF"]
  command_template: "STBY{value}"
- id: z2stby_hours
  type: enum
  values: ["2H", "4H", "8H", "OFF"]
  command_template: "Z2STBY{value}"
- id: z3stby_hours
  type: enum
  values: ["2H", "4H", "8H", "OFF"]
  command_template: "Z3STBY{value}"
- id: pv_cn
  type: integer
  command_template: "PVCN {level_padded3}"
  range: "000-100 (050=0; -50 to +50 step)"
- id: pv_br
  type: integer
  command_template: "PVBR {level_padded3}"
  range: "000-100 (050=0; -50 to +50 step)"
- id: pv_st
  type: integer
  command_template: "PVST {level_padded3}"
  range: "000-100 (050=0; -50 to +50 step)"
- id: pv_hue
  type: integer
  command_template: "PVHUE {level}"
  range: "44-56 (50=0; -6 to +6 step)"
- id: tf_freq
  type: string
  command_template: "TFAN{freq_padded6}"
  range: "6 ASCII digits, AM ****.**kHz (>050000) or FM ****.**MHz (<050000)"
- id: tp_preset
  type: integer
  command_template: "TPAN{nn}"
  range: "01-56"
- id: ns_preset_call
  type: integer
  command_template: "NSB{nn}"
  range: "00-35 (2014 AVR)"
- id: ns_preset_memory
  type: integer
  command_template: "NSC{nn}"
  range: "00-35 (2014 AVR)"
- id: ps_reflev_offset
  type: enum
  values: ["0", "5", "10", "15"]
  command_template: "PSREFLEV{value}"
- id: ps_delay
  type: integer
  command_template: "PSDEL {ms_padded3}"
  range: "000-999ms (0-60ms: 3ms/step; >60ms: 10ms/step)"
- id: ps_delay_audio
  type: integer
  command_template: "PSDELAY {ms_padded3}"
  range: "000-999ms (0-200ms AVR range)"
- id: ps_eff_level
  type: integer
  command_template: "PSEFF {level_padded2}"
  range: "00-99 (00=0dB, 10=10dB; AVR 1-15)"
- id: ps_lfe_level
  type: integer
  command_template: "PSLFE {level_padded2}"
  range: "00-99 (00=0dB, 10=-10dB; AVR 0 to -10)"
- id: ps_lfl_level
  type: enum
  values: ["00", "05", "10", "15"]
  command_template: "PSLFL {value}"
- id: ps_cntamt
  type: integer
  command_template: "PSCNTAMT {level_padded2}"
  range: "00-99 (AVR 01-07)"
- id: ps_cei
  type: integer
  command_template: "PSCEI {level_padded2}"
  range: "00-99 (00=0.0; AVR 0.0-1.0)"
- id: ps_ceg
  type: integer
  command_template: "PSCEG {level_padded2}"
  range: "00-99 (00=0.0; AVR 0.0-1.0)"
- id: ps_dim
  type: integer
  command_template: "PSDIM {level_padded2}"
  range: "00-99 (00=0; AVR 0-6)"
- id: ps_cen
  type: integer
  command_template: "PSCEN {level_padded2}"
  range: "00-99 (00=0; AVR 0-7)"
- id: ps_bas
  type: integer
  command_template: "PSBAS {level_padded2}"
  range: "00-99 (50=0dB; AVR 44-56)"
- id: ps_tre
  type: integer
  command_template: "PSTRE {level_padded2}"
  range: "00-99 (50=0dB; AVR 44-56)"
- id: ps_dil
  type: integer
  command_template: "PSDIL {level_padded2}"
  range: "38-62 (50=0dB)"
- id: ps_swl
  type: integer
  command_template: "PSSWL {level_padded2}"
  range: "00 or 38-62 (50=0dB)"
- id: ps_stw
  type: integer
  command_template: "PSSTW {level_padded2}"
  range: "00-99 (50=0dB; AVR 40-60)"
- id: ps_sth
  type: integer
  command_template: "PSSTH {level_padded2}"
  range: "00-99 (50=0dB; AVR 40-60)"
- id: ps_bsc
  type: integer
  command_template: "PSBSC {level_padded2}"
  range: "00-99 (AVR 0-16)"
- id: ps_enh
  type: integer
  command_template: "PVENH {level_padded2}"
  range: "00-12 (00=0; AVR 0-12)"
- id: ps_aurost
  type: integer
  command_template: "PSAUROST {level_padded2}"
  range: "00-99 (01=1, 10=10; AVR 1-16)"
```

## Events
```yaml
# Unsolicited notifications the device sends when state changes outside the controller
# (e.g. front panel input, remote control). EVENT format is identical to COMMAND/RESPONSE.
# The source documents that EVENT should be sent within 5s of a state change.
- id: pw_event
  description: "Power state change (PWON / PWSTANDBY)"
- id: mv_event
  description: "Master volume change (MV<value>)"
- id: cv_event
  description: "Channel volume change (CV<ch> <value>) - emitted for configured speakers only, terminated by CVEND"
- id: si_event
  description: "Input source change (SI<source>)"
- id: mu_event
  description: "Mute change (MUON / MUOFF)"
- id: ms_event
  description: "Surround mode change (MS<mode>)"
- id: z2_event
  description: "Zone 2 source/volume/power change"
- id: z3_event
  description: "Zone 3 source/volume/power change"
- id: sr_event
  description: "Rec select change"
- id: ps_event
  description: "Any PS parameter change (PSTONE CTRL, PSBAS, PSSWR, etc.)"
- id: pv_event
  description: "Picture/video parameter change"
- id: ns_nsa_event
  description: "Onscreen display info update (NSA0-NSA8)"
- id: ns_nse_event
  description: "Onscreen display info update UTF-8 (NSE0-NSE8)"
```

## Macros
```yaml
# Multi-step sequences documented explicitly in source.
- id: power_on_sequence
  description: "Wait 1 second after PWON before transmitting the next COMMAND (source note J)"
  steps:
    - command: "PWON"
    - delay_ms: 1000
- id: tuner_preset_memory_an
  description: "Tuner AM/FM preset memory flow (source TP AN MEM section)"
  steps:
    - command: "TPANMEM"
    - command: "TPANUP | TPANDOWN | TPAN<nn>"
    - command: "TPANMEM"
- id: tuner_preset_memory_hd
  description: "HD Radio preset memory flow (source TP HD MEM section)"
  steps:
    - command: "TPHDMEM"
    - command: "TPHDUP | TPHDDOWN | TPHD<nn>"
    - command: "TPHDMEM"
- id: z2_favorite_memory
  description: "Store Zone 2 favorite (1-4)"
  steps:
    - command: "Z2FAVORITE<n> MEMORY"
- id: z3_favorite_memory
  description: "Store Zone 3 favorite (1-4)"
  steps:
    - command: "Z3FAVORITE<n> MEMORY"
- id: zm_favorite_memory
  description: "Store Main Zone favorite (1-4)"
  steps:
    - command: "ZMFAVORITE<n> MEMORY"
- id: ms_quick_memory
  description: "Quick Select 1-5 memory (MSQUICK<n> MEMORY)"
  steps:
    - command: "MSQUICK<n> MEMORY"
- id: ns_preset_memory
  description: "Net preset memory (NSC<nn>); response NSCOK"
  steps:
    - command: "NSC<nn>"
    - expected_response: "NSCOK"
```

## Safety
```yaml
[]
```

## Notes
- Source document explicitly references Marantz AV receiver model variants X1100, S700, S70, X4100, and the Auro-3D Upgrade. The mapping of these sub-commands to the PD4250D specifically is not confirmed by the source.
- Command interval: send COMMAND in 50ms or more intervals (source "Communication forms" section).
- Response timing: RESPONSE should be sent within 200ms of receiving the request COMMAND.
- Event timing: EVENT should be sent within 5s of a state change.
- ASCII range for command characters: 0x20-0x7F; CR (0x0D) is used as a terminator only.
- Maximum communication data length: 135 bytes.
- Volume notes: 0.5dB step uses 3 ASCII characters (e.g. MV805=+0.5dB); minimum master volume is "00".
- Power-on sequencing: wait 1 second after PWON before next COMMAND.
- DB-9 pinout: 1=GND, 2=TxD, 3=RxD, 5=Common(GND), 4/6/7/8/9=NC.
- Ethernet: 10BASE-T/100BASE-TX, half duplex, TCP port 23 (telnet).
- Source protocol version: "Control Protocol Ver.06".

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: specific PD4250D applicability of the AV-receiver command set not stated in source. -->

## Provenance

```yaml
source_domains:
  - heimkinoraum.de
  - marantz.com
  - manualslib.com
source_urls:
  - https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf
  - https://www.marantz.com/on/demandware.static/-/Library-Sites-marantz_northamerica_shared/default/dw8fd12025/./archive-downloads/dfu_pd4250d_final_eng.pdf
  - "https://www.manualslib.com/manual/98953/Marantz-Pd4250d.html?page=32"
retrieved_at: 2026-06-02T04:40:04.090Z
last_checked_at: 2026-06-02T17:23:27.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:27.235Z
matched_actions: 136
action_count: 136
confidence: medium
summary: "All 136 spec actions have literal wire-level matches in the source command table and all transport values are confirmed verbatim. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document explicitly references X1100, S700, S70, X4100 model variants throughout the command list. It is unclear whether the full command set applies to the PD4250D specifically; command compatibility by sub-feature is noted in the source where applicable."
- "firmware version compatibility not stated in source."
- "specific PD4250D applicability of the AV-receiver command set not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
