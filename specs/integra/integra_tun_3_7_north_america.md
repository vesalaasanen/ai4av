---
spec_id: admin/integra-tun-3-7
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra TUN 3.7 (North America) Control Spec"
manufacturer: Integra
model_family: "Integra TUN 3.7"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "Integra TUN 3.7"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:35.442Z
last_checked_at: 2026-06-02T17:22:38.265Z
generated_at: 2026-06-02T17:22:38.265Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model-specific firmware version not stated in source"
  - "no safety warnings, interlocks, or power-on sequencing"
  - "source has mnemonic collision for DIF (two functions share opcode)"
  - "eISCP exact receive-buffer handling and \"Reserved\" byte semantics beyond 0x000000 not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:38.265Z
  matched_actions: 91
  action_count: 91
  confidence: medium
  summary: "All 91 spec actions matched literally to source ISCP commands; transport parameters (9600/8/N/1, port 60128) fully verified; source command catalogue exhaustively represented by spec. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Integra TUN 3.7 (North America) Control Spec

## Summary
The Integra TUN 3.7 (North America) is an AV receiver line programmable via the Integra Serial Control Protocol (ISCP) v1.15. Two transports are documented: 3-wire RS-232C (9600/8/N/1) and Ethernet (TCP, default port 60128) using the eISCP envelope. Commands use a fixed 3-character opcode followed by hex or symbolic parameters, prefixed with `!1` and terminated with CR (serial) or EOF/CR/LF (eISCP).

<!-- UNRESOLVED: model-specific firmware version not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128
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
- powerable       # PWR / ZPW / PW3 / PW4 power commands present
- routable        # SLI / SLA / SLR / SLZ / SL3 / SL4 input/output routing present
- queryable       # QSTN suffix on most commands
- levelable       # MVL / ZVL / VL3 / VL4 / tone / balance / SWL / CTL present
```

## Actions
```yaml
# All ISCP actions use the literal message format: !1<CMD><PARAM>\r for serial,
# or the same payload wrapped in an eISCP header (16-byte big-endian) for TCP.
# QSTN suffix denotes a query that elicits a status response from the receiver.
- id: pwr
  label: System Power
  kind: action
  command: "!1PWR{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 = Standby, 01 = On, QSTN = query status'
- id: amt
  label: Audio Muting
  kind: action
  command: "!1AMT{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG", "QSTN"]
      description: '00 = Off, 01 = On, TG = wrap-around toggle, QSTN = query'
- id: mvl
  label: Master Volume
  kind: action
  command: "!1MVL{level}\r"
  params:
    - name: level
      type: string
      description: '00-64 hex (0-100), UP, DOWN, UP1, DOWN1, or QSTN'
- id: sli
  label: Input Selector
  kind: action
  command: "!1SLI{input}\r"
  params:
    - name: input
      type: string
      description: '00-04 (VIDEO1-5), 10 (DVD), 20-2A (TAPE/PHONO/CD/FM/AM/TUNER/MS/IRADIO/USB), 30 (MULTI CH), 40 (Universal PORT), UP, DOWN, QSTN'
- id: lmd
  label: Listening Mode
  kind: action
  command: "!1LMD{mode}\r"
  params:
    - name: mode
      type: string
      description: '00-0F, 11, 80-83, 90, A0-A2 (named modes), UP, DOWN, QSTN'
- id: ltn
  label: Late Night
  kind: action
  command: "!1LTN{level}\r"
  params:
    - name: level
      type: string
      enum: ["00", "01", "02", "UP", "QSTN"]
      description: '00 = Off, 01 = Low, 02 = High, UP = wrap, QSTN = query'
- id: dim
  label: Dimmer Level
  kind: action
  command: "!1DIM{level}\r"
  params:
    - name: level
      type: string
      enum: ["00", "01", "02", "03", "08", "DIM", "QSTN"]
      description: '00 Bright, 01 Dim, 02 Dark, 03 Shut-Off, 08 Bright+LED Off, DIM wrap, QSTN'
- id: slp
  label: Sleep Timer
  kind: action
  command: "!1SLP{time}\r"
  params:
    - name: time
      type: string
      description: '01-5A hex (1-90 min), OFF, UP, or QSTN'
- id: spa
  label: Speaker A
  kind: action
  command: "!1SPA{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP", "QSTN"]
      description: '00 = Off, 01 = On, UP = wrap, QSTN = query. SPA = Main A / Front A'
- id: spb
  label: Speaker B
  kind: action
  command: "!1SPB{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP", "QSTN"]
      description: '00 = Off, 01 = On, UP = wrap, QSTN = query. SPB = Main B / Front B'
- id: spl
  label: Speaker Layout
  kind: action
  command: "!1SPL{layout}\r"
  params:
    - name: layout
      type: string
      enum: ["SB", "FH", "FW", "UP", "QSTN"]
      description: 'SB = SurrBack, FH = Front High (+SurrBack), FW = Front Wide (+SurrBack)'
- id: tfr
  label: Tone Front
  kind: action
  command: "!1TFR{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: tct
  label: Tone Center
  kind: action
  command: "!1TCT{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: tsr
  label: Tone Surround
  kind: action
  command: "!1TSR{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: tsb
  label: Tone Surround Back
  kind: action
  command: "!1TSB{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: tsw
  label: Tone Subwoofer
  kind: action
  command: "!1TSW{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx (xx in -A..+A), BUP, BDOWN, QSTN'
- id: slc
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{key}\r"
  params:
    - name: key
      type: string
      enum: ["TEST", "CHSEL", "UP", "DOWN"]
      description: 'TEST, CHSEL, LEVEL+ (UP), LEVEL- (DOWN) keys'
- id: swl
  label: Subwoofer Temporary Level
  kind: action
  command: "!1SWL{level}\r"
  params:
    - name: level
      type: string
      description: '-F..+C hex (-15..+12 dB), UP, DOWN, QSTN'
- id: ctl
  label: Center Temporary Level
  kind: action
  command: "!1CTL{level}\r"
  params:
    - name: level
      type: string
      description: '-C..+C hex (-12..+12 dB), UP, DOWN, QSTN'
- id: dif_info
  label: Display Information (DIF)
  kind: action
  command: "!1DIF{code}\r"
  params:
    - name: code
      type: string
      enum: ["00", "01", "02", "03", "04"]
      description: '00 Program Format, 01 Digital Input, 02 Digital Format, 03 Bass, 04 Treble'
- id: dif_mode
  label: Display Mode (DIF)
  kind: action
  command: "!1DIF{mode}\r"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "TG", "QSTN"]
      description: '00 Selector+Vol, 01 Selector+LMD, 02 Digital Format, 03 Video Format, TG wrap, QSTN'
- id: osd
  label: Setup / OSD Navigation
  kind: action
  command: "!1OSD{key}\r"
  params:
    - name: key
      type: string
      enum: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]
      description: 'On-screen menu navigation keys'
- id: mem
  label: Memory Setup
  kind: action
  command: "!1MEM{op}\r"
  params:
    - name: op
      type: string
      enum: ["STR", "RCL", "LOCK", "UNLK"]
      description: 'STR store, RCL recall, LOCK lock, UNLK unlock'
- id: ifa
  label: Audio Information
  kind: action
  command: "!1IFA{info}\r"
  params:
    - name: info
      type: string
      description: 'nnnnn:nnnnn comma-separated info string, or QSTN'
- id: ifv
  label: Video Information
  kind: action
  command: "!1IFV{info}\r"
  params:
    - name: info
      type: string
      description: 'nnnnn:nnnnn comma-separated info string, or QSTN'
- id: slr
  label: RECOUT Selector
  kind: action
  command: "!1SLR{input}\r"
  params:
    - name: input
      type: string
      description: '00-04 (VIDEO1-5), 10 (DVD), 20-28, 30 (MULTI CH), 7F (OFF), 80 (SOURCE), QSTN'
- id: sla
  label: Audio Selector
  kind: action
  command: "!1SLA{mode}\r"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "UP", "QSTN"]
      description: '00 AUTO, 01 MULTI-CH, 02 ANALOG, 03 iLINK, 04 HDMI, 05 COAX/OPT, 06 BALANCE'
- id: tga
  label: 12V Trigger A
  kind: action
  command: "!1TGA{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 Off, 01 On'
- id: tgb
  label: 12V Trigger B
  kind: action
  command: "!1TGB{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 Off, 01 On'
- id: tgc
  label: 12V Trigger C
  kind: action
  command: "!1TGC{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 Off, 01 On'
- id: vos
  label: Video Output Selector
  kind: action
  command: "!1VOS{out}\r"
  params:
    - name: out
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 D4, 01 Component (Japanese model only), QSTN'
- id: hdo
  label: HDMI Output Selector
  kind: action
  command: "!1HDO{out}\r"
  params:
    - name: out
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "UP", "QSTN"]
      description: '00 No Analog, 01 Main, 02 Sub, 03 Both, 04 Both(Main), 05 Both(Sub)'
- id: res
  label: Monitor Out Resolution
  kind: action
  command: "!1RES{res}\r"
  params:
    - name: res
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "07", "UP", "QSTN"]
      description: '00 Through, 01 Auto, 02 480p, 03 720p, 04 1080i, 05 1080p, 06 Source, 07 1080p/24'
- id: isf
  label: ISF Mode
  kind: action
  command: "!1ISF{mode}\r"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "UP", "QSTN"]
      description: '00 Custom, 01 Day, 02 Night'
- id: ras
  label: Re-EQ / Academy Filter
  kind: action
  command: "!1RAS{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "02", "UP", "QSTN"]
      description: '00 Both Off, 01 Re-EQ On, 02 Academy On'
- id: ady
  label: Audyssey 2EQ / MultEQ / MultEQ XT
  kind: action
  command: "!1ADY{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP", "QSTN"]
      description: '00 Off, 01 On'
- id: adq
  label: Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP", "QSTN"]
      description: '00 Off, 01 On'
- id: adv
  label: Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{level}\r"
  params:
    - name: level
      type: string
      enum: ["00", "01", "02", "03", "UP", "QSTN"]
      description: '00 Off, 01 Light, 02 Medium, 03 Heavy'
- id: dvl
  label: Dolby Volume
  kind: action
  command: "!1DVL{level}\r"
  params:
    - name: level
      type: string
      enum: ["00", "01", "02", "03", "UP", "QSTN"]
      description: '00 Off, 01 Low, 02 Mid, 03 High'
- id: mot
  label: Music Optimizer
  kind: action
  command: "!1MOT{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP", "QSTN"]
      description: '00 Off, 01 On'
- id: tun
  label: Tuning
  kind: action
  command: "!1TUN{freq}\r"
  params:
    - name: freq
      type: string
      description: 'nnnnn (FM nnn.nn MHz / AM nnnnn kHz / XM 00nnn ch), UP, DOWN, QSTN'
- id: prs
  label: Tuner Preset
  kind: action
  command: "!1PRS{n}\r"
  params:
    - name: n
      type: string
      description: '01-28 hex (preset 1-40), UP, DOWN, QSTN'
- id: rds
  label: RDS Information Display
  kind: action
  command: "!1RDS{mode}\r"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "UP"]
      description: '00 RT, 01 PTY, 02 TP, UP wrap'
- id: pts
  label: PTY Scan
  kind: action
  command: "!1PTS{pty}\r"
  params:
    - name: pty
      type: string
      description: '00-1E hex (PTY 0-30), or ENTER to finish'
- id: tps
  label: TP Scan
  kind: action
  command: "!1TPS{op}\r"
  params:
    - name: op
      type: string
      enum: ["", "ENTER"]
      description: 'empty = start scan, ENTER = finish'
- id: xcn
  label: XM Channel Name
  kind: action
  command: "!1XCN{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn channel name, or QSTN'
- id: xat
  label: XM Artist Name
  kind: action
  command: "!1XAT{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn artist name, or QSTN'
- id: xti
  label: XM Title
  kind: action
  command: "!1XTI{title}\r"
  params:
    - name: title
      type: string
      description: 'nnnnnnnnnn title, or QSTN'
- id: xch
  label: XM Channel Number
  kind: action
  command: "!1XCH{ch}\r"
  params:
    - name: ch
      type: string
      description: '000-255 channel number, UP, DOWN, QSTN'
- id: xct
  label: XM Category
  kind: action
  command: "!1XCT{cat}\r"
  params:
    - name: cat
      type: string
      description: 'nnnnnnnnnn category info, UP, DOWN, QSTN'
- id: scn
  label: SIRIUS Channel Name
  kind: action
  command: "!1SCN{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn channel name, or QSTN'
- id: sat
  label: SIRIUS Artist Name
  kind: action
  command: "!1SAT{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn artist name, or QSTN'
- id: sti
  label: SIRIUS Title
  kind: action
  command: "!1STI{title}\r"
  params:
    - name: title
      type: string
      description: 'nnnnnnnnnn title, or QSTN'
- id: sch
  label: SIRIUS Channel Number
  kind: action
  command: "!1SCH{ch}\r"
  params:
    - name: ch
      type: string
      description: '000-255 channel number, UP, DOWN, QSTN'
- id: sct
  label: SIRIUS Category
  kind: action
  command: "!1SCT{cat}\r"
  params:
    - name: cat
      type: string
      description: 'nnnnnnnnnn category info, UP, DOWN, QSTN'
- id: slk
  label: SIRIUS Parental Lock
  kind: action
  command: "!1SLK{op}\r"
  params:
    - name: op
      type: string
      description: 'nnnn 4-digit password, INPUT = prompt, WRONG = bad password response'
- id: hat
  label: HD Radio Artist Name
  kind: action
  command: "!1HAT{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn up to 64 digits, or QSTN'
- id: hcn
  label: HD Radio Channel Name
  kind: action
  command: "!1HCN{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn 7-digit station name, or QSTN'
- id: hti
  label: HD Radio Title
  kind: action
  command: "!1HTI{title}\r"
  params:
    - name: title
      type: string
      description: 'nnnnnnnnnn up to 64 digits, or QSTN'
- id: hds
  label: HD Radio Detail Info
  kind: action
  command: "!1HDS{info}\r"
  params:
    - name: info
      type: string
      description: 'nnnnnnnnnn detail info, or QSTN'
- id: hpr
  label: HD Radio Channel Program
  kind: action
  command: "!1HPR{prog}\r"
  params:
    - name: prog
      type: string
      description: '01-08 HD Radio program, or QSTN'
- id: hbl
  label: HD Radio Blend Mode
  kind: action
  command: "!1HBL{mode}\r"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 Auto, 01 Analog'
- id: hts
  label: HD Radio Tuner Status
  kind: action
  command: "!1HTS{status}\r"
  params:
    - name: status
      type: string
      description: 'mmnnoo 3-byte status (mm HD flag, nn current program 01-08, oo receivable bitmask), or QSTN'
- id: ntc
  label: Net-Tune Operation
  kind: action
  command: "!1NTC{key}\r"
  params:
    - name: key
      type: string
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "DELETE", "CAPS", "CHUP", "CHDN"]
      description: 'Net/USB transport and navigation keys; FF/REW must repeat within 100ms'
- id: nat
  label: Net / USB Artist Name
  kind: action
  command: "!1NAT{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnnnn up to 64 ASCII letters, or QSTN'
- id: nal
  label: Net / USB Album Name
  kind: action
  command: "!1NAL{name}\r"
  params:
    - name: name
      type: string
      description: 'nnnnnnnn up to 64 ASCII letters, or QSTN'
- id: nti
  label: Net / USB Title Name
  kind: action
  command: "!1NTI{title}\r"
  params:
    - name: title
      type: string
      description: 'nnnnnnnnnn up to 64 ASCII letters, or QSTN'
- id: ntm
  label: Net / USB Time Info
  kind: action
  command: "!1NTM{time}\r"
  params:
    - name: time
      type: string
      description: 'mm:ss/mm:ss elapsed/total max 99:59, or QSTN'
- id: ntr
  label: Net / USB Track Info
  kind: action
  command: "!1NTR{tracks}\r"
  params:
    - name: tracks
      type: string
      description: 'cccc/tttt current/total tracks max 9999, or QSTN'
- id: nst
  label: Net / USB Play Status
  kind: action
  command: "!1NST{status}\r"
  params:
    - name: status
      type: string
      description: 'prs 3-letter status: p in {S,P,p,F,R}, r in {-,R,F,1}, or QSTN'
- id: npr
  label: Internet Radio Preset
  kind: action
  command: "!1NPR{n}\r"
  params:
    - name: n
      type: string
      description: '01-28 hex (preset 1-40)'
- id: zpw
  label: Zone 2 Power
  kind: action
  command: "!1ZPW{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 Standby, 01 On (only when main is On)'
- id: zmt
  label: Zone 2 Muting
  kind: action
  command: "!1ZMT{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG", "QSTN"]
      description: '00 Off, 01 On, TG wrap, QSTN'
- id: zvl
  label: Zone 2 Volume
  kind: action
  command: "!1ZVL{level}\r"
  params:
    - name: level
      type: string
      description: '00-64 hex (0-100), UP, DOWN, QSTN'
- id: ztn
  label: Zone 2 Tone
  kind: action
  command: "!1ZTN{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: zbl
  label: Zone 2 Balance
  kind: action
  command: "!1ZBL{bal}\r"
  params:
    - name: bal
      type: string
      description: 'xx (xx in -A..+A), UP (R 2 step), DOWN (L 2 step), QSTN'
- id: slz
  label: Zone 2 Selector
  kind: action
  command: "!1SLZ{input}\r"
  params:
    - name: input
      type: string
      description: '00-04, 10, 20-2A, 30, 40 (same set as SLI minus UP/DOWN/QSTN)'
- id: tuz
  label: Zone 2 Tuning
  kind: action
  command: "!1TUZ{freq}\r"
  params:
    - name: freq
      type: string
      description: 'nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, QSTN'
- id: pw3
  label: Zone 3 Power
  kind: action
  command: "!1PW3{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 Standby, 01 On'
- id: mt3
  label: Zone 3 Muting
  kind: action
  command: "!1MT3{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG", "QSTN"]
      description: '00 Off, 01 On, TG wrap, QSTN'
- id: vl3
  label: Zone 3 Volume
  kind: action
  command: "!1VL3{level}\r"
  params:
    - name: level
      type: string
      description: '00-64 hex (0-100), UP, DOWN, QSTN'
- id: tn3
  label: Zone 3 Tone
  kind: action
  command: "!1TN3{param}\r"
  params:
    - name: param
      type: string
      description: 'Bxx / Txx (xx in -A..+A), BUP, BDOWN, TUP, TDOWN, QSTN'
- id: bl3
  label: Zone 3 Balance
  kind: action
  command: "!1BL3{bal}\r"
  params:
    - name: bal
      type: string
      description: 'xx (xx in -A..+A), UP (R 2 step), DOWN (L 2 step), QSTN'
- id: sl3
  label: Zone 3 Selector
  kind: action
  command: "!1SL3{input}\r"
  params:
    - name: input
      type: string
      description: '00-06, 10, 20-2A, 30, 31 (XM), 32 (SIRIUS), 40, 80 (SOURCE), QSTN'
- id: tu3
  label: Zone 3 Tuning
  kind: action
  command: "!1TU3{freq}\r"
  params:
    - name: freq
      type: string
      description: 'nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, QSTN'
- id: pw4
  label: Zone 4 Power
  kind: action
  command: "!1PW4{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "QSTN"]
      description: '00 Standby, 01 On'
- id: mt4
  label: Zone 4 Muting
  kind: action
  command: "!1MT4{state}\r"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG", "QSTN"]
      description: '00 Off, 01 On, TG wrap, QSTN'
- id: vl4
  label: Zone 4 Volume
  kind: action
  command: "!1VL4{level}\r"
  params:
    - name: level
      type: string
      description: '00-64 hex (0-100), UP, DOWN, QSTN'
- id: sl4
  label: Zone 4 Selector
  kind: action
  command: "!1SL4{input}\r"
  params:
    - name: input
      type: string
      description: '00-06, 10, 20-2A, 30, 31 (XM), 32 (SIRIUS), 40, 80 (SOURCE), QSTN'
- id: tu4
  label: Zone 4 Tuning
  kind: action
  command: "!1TU4{freq}\r"
  params:
    - name: freq
      type: string
      description: 'nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, QSTN'
- id: cds
  label: Docking Station via RI
  kind: action
  command: "!1CDS{key}\r"
  params:
    - name: key
      type: string
      enum: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
      description: 'Dock transport and navigation keys'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  command: "!1PWRQSTN\r"
- id: muting_state
  type: enum
  values: [off, on]
  command: "!1AMTQSTN\r"
- id: master_volume
  type: integer
  range: [0, 100]
  command: "!1MVLQSTN\r"
- id: input_selector
  type: string
  command: "!1SLIQSTN\r"
- id: listening_mode
  type: string
  command: "!1LMDQSTN\r"
- id: late_night
  type: enum
  values: [off, low, high]
  command: "!1LTNQSTN\r"
- id: dimmer_level
  type: enum
  values: [bright, dim, dark, shut_off, bright_led_off]
  command: "!1DIMQSTN\r"
- id: sleep_time
  type: integer
  command: "!1SLPQSTN\r"
- id: speaker_a
  type: enum
  values: [off, on]
  command: "!1SPAQSTN\r"
- id: speaker_b
  type: enum
  values: [off, on]
  command: "!1SPBQSTN\r"
- id: speaker_layout
  type: enum
  values: [surrback, front_high, front_wide]
  command: "!1SPLQSTN\r"
- id: tone_front
  type: string
  command: "!1TFRQSTN\r"
- id: tone_center
  type: string
  command: "!1TCTQSTN\r"
- id: tone_surround
  type: string
  command: "!1TSRQSTN\r"
- id: tone_surrback
  type: string
  command: "!1TSBQSTN\r"
- id: tone_subwoofer
  type: string
  command: "!1TSWQSTN\r"
- id: subwoofer_level
  type: integer
  command: "!1SWLQSTN\r"
- id: center_level
  type: integer
  command: "!1CTLQSTN\r"
- id: recout_selector
  type: string
  command: "!1SLRQSTN\r"
- id: audio_selector
  type: enum
  values: [auto, multi_ch, analog, ilink, hdmi, coax_opt, balance]
  command: "!1SLAQSTN\r"
- id: vos_selector
  type: enum
  values: [d4, component]
  command: "!1VOSQSTN\r"
- id: hdmi_output
  type: string
  command: "!1HDOQSTN\r"
- id: monitor_resolution
  type: string
  command: "!1RESQSTN\r"
- id: isf_mode
  type: enum
  values: [custom, day, night]
  command: "!1ISFQSTN\r"
- id: reeq_academy
  type: enum
  values: [off, reeq, academy]
  command: "!1RASQSTN\r"
- id: audyssey_multieq
  type: enum
  values: [off, on]
  command: "!1ADYQSTN\r"
- id: audyssey_dynamic_eq
  type: enum
  values: [off, on]
  command: "!1ADQQSTN\r"
- id: audyssey_dynamic_volume
  type: enum
  values: [off, light, medium, heavy]
  command: "!1ADVQSTN\r"
- id: dolby_volume
  type: enum
  values: [off, low, mid, high]
  command: "!1DVLQSTN\r"
- id: music_optimizer
  type: enum
  values: [off, on]
  command: "!1MOTQSTN\r"
- id: tuning_frequency
  type: string
  command: "!1TUNQSTN\r"
- id: preset_number
  type: integer
  command: "!1PRSQSTN\r"
- id: zone2_power
  type: enum
  values: [standby, on]
  command: "!1ZPWQSTN\r"
- id: zone2_muting
  type: enum
  values: [off, on]
  command: "!1ZMTQSTN\r"
- id: zone2_volume
  type: integer
  range: [0, 100]
  command: "!1ZVLQSTN\r"
- id: zone2_tone
  type: string
  command: "!1ZTNQSTN\r"
- id: zone2_balance
  type: string
  command: "!1ZBLQSTN\r"
- id: zone2_tuning
  type: string
  command: "!1TUZQSTN\r"
- id: zone3_power
  type: enum
  values: [standby, on]
  command: "!1PW3QSTN\r"
- id: zone3_muting
  type: enum
  values: [off, on]
  command: "!1MT3QSTN\r"
- id: zone3_volume
  type: integer
  range: [0, 100]
  command: "!1VL3QSTN\r"
- id: zone3_tone
  type: string
  command: "!1TN3QSTN\r"
- id: zone3_balance
  type: string
  command: "!1BL3QSTN\r"
- id: zone3_selector
  type: string
  command: "!1SL3QSTN\r"
- id: zone3_tuning
  type: string
  command: "!1TU3QSTN\r"
- id: zone4_power
  type: enum
  values: [standby, on]
  command: "!1PW4QSTN\r"
- id: zone4_muting
  type: enum
  values: [off, on]
  command: "!1MT4QSTN\r"
- id: zone4_volume
  type: integer
  range: [0, 100]
  command: "!1VL4QSTN\r"
- id: zone4_selector
  type: string
  command: "!1SL4QSTN\r"
- id: zone4_tuning
  type: string
  command: "!1TU4QSTN\r"
- id: xm_channel_name
  type: string
  command: "!1XCNQSTN\r"
- id: xm_artist
  type: string
  command: "!1XATQSTN\r"
- id: xm_title
  type: string
  command: "!1XTIQSTN\r"
- id: xm_channel_number
  type: integer
  range: [0, 255]
  command: "!1XCHQSTN\r"
- id: xm_category
  type: string
  command: "!1XCTQSTN\r"
- id: sirius_channel_name
  type: string
  command: "!1SCNQSTN\r"
- id: sirius_artist
  type: string
  command: "!1SATQSTN\r"
- id: sirius_title
  type: string
  command: "!1STIQSTN\r"
- id: sirius_channel_number
  type: integer
  range: [0, 255]
  command: "!1SCHQSTN\r"
- id: sirius_category
  type: string
  command: "!1SCTQSTN\r"
- id: hd_radio_artist
  type: string
  command: "!1HATQSTN\r"
- id: hd_radio_channel
  type: string
  command: "!1HCNQSTN\r"
- id: hd_radio_title
  type: string
  command: "!1HTIQSTN\r"
- id: hd_radio_detail
  type: string
  command: "!1HDSQSTN\r"
- id: hd_radio_program
  type: integer
  range: [1, 8]
  command: "!1HPRQSTN\r"
- id: hd_radio_blend
  type: enum
  values: [auto, analog]
  command: "!1HBLQSTN\r"
- id: hd_radio_tuner_status
  type: string
  command: "!1HTSQSTN\r"
- id: net_artist
  type: string
  command: "!1NATQSTN\r"
- id: net_album
  type: string
  command: "!1NALQSTN\r"
- id: net_title
  type: string
  command: "!1NTIQSTN\r"
- id: net_time
  type: string
  command: "!1NTMQSTN\r"
- id: net_track
  type: string
  command: "!1NTRQSTN\r"
- id: net_status
  type: string
  command: "!1NSTQSTN\r"
- id: audio_info
  type: string
  command: "!1IFAQSTN\r"
- id: video_info
  type: string
  command: "!1IFVQSTN\r"
```

## Variables
```yaml
# Discrete parameter ranges (e.g. volume 0-100, tone -10..+10) are exposed
# through their parent action's command template (e.g. MVL{level}, TFR{param}).
# No additional settable parameters beyond those.
```

## Events
```yaml
- id: unsolicited_status
  description: >
    Receiver pushes status messages on the same connection whenever its state
    changes (per §2.1 of source). Status messages use the same 3-char opcode
    as the corresponding command with a payload reflecting the new state.
    Long-held connection is required (source §1.2 note).
```

## Macros
```yaml
# No multi-step sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing
# requirements in source. Do not infer any.
```

## Notes
The source ISCP document (v1.15, 2009) describes the protocol generically across
all Integra/Onkyo receivers in the family — TUN 3.7 is a North-American model
descriptor. The "DIF" mnemonic appears twice in the source (lines 295-312) for
two distinct functions (Display Information vs. Display Mode); both have been
preserved as `dif_info` and `dif_mode`. eISCP wraps the same ISCP payload in a
16-byte big-endian header (header size 0x10, version 0x01, reserved 0x000000)
and uses EOF (0x1A) as the inner terminator instead of CR. Receiver requires a
persistent TCP connection and one client at a time; messages should be paced
at least 50 ms apart. 12V trigger A/B/C (TGA/TGB/TGC) is only honored when
each 12V Trigger parameter is "OFF" in the receiver's Setup Menu. Zone 2
volume (ZVL) only works when the main zone is On. XM/SIRIUS opcodes are only
valid on receivers with the corresponding tuner pack; HD Radio opcodes only
on HD Radio models; Net-Tune on TX-NR1000+.

<!-- UNRESOLVED: model-specific firmware version not stated in source -->
<!-- UNRESOLVED: source has mnemonic collision for DIF (two functions share opcode) -->
<!-- UNRESOLVED: eISCP exact receive-buffer handling and "Reserved" byte semantics beyond 0x000000 not stated -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:35.442Z
last_checked_at: 2026-06-02T17:22:38.265Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:38.265Z
matched_actions: 91
action_count: 91
confidence: medium
summary: "All 91 spec actions matched literally to source ISCP commands; transport parameters (9600/8/N/1, port 60128) fully verified; source command catalogue exhaustively represented by spec. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model-specific firmware version not stated in source"
- "no safety warnings, interlocks, or power-on sequencing"
- "source has mnemonic collision for DIF (two functions share opcode)"
- "eISCP exact receive-buffer handling and \"Reserved\" byte semantics beyond 0x000000 not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
