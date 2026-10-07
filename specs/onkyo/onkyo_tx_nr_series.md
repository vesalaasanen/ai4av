---
spec_id: admin/onkyo-tx-nr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-NR Series (eISCP / ISCP) Control Spec"
manufacturer: Onkyo
model_family: "TX-NR Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "TX-NR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T15:23:10.549Z
last_checked_at: 2026-10-01T06:37:45.477Z
generated_at: 2026-10-01T06:37:45.477Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "zone coverage per model varies — many commands are \"No\" for older models. Specific TX-NR sub-model applicability not enumerated in this revision."
  - "source does not document any required command sequences (e.g. for zone-pairing, factory reset, firmware update)."
  - "source does not document safety warnings, interlocks, or"
  - "- Specific TX-NR sub-model applicability (per-row Yes/No columns) not enumerated in this spec; see source for per-model support table."
verification:
  verdict: verified
  checked_at: 2026-10-01T06:37:45.477Z
  matched_actions: 115
  action_count: 115
  confidence: medium
  summary: "All 115 spec action literals (PWR/AMT/MVL/SLI/ZPW/PW3/PW4/NTC/CCD/etc.) match ISCP command tables verbatim; transport matches source. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Onkyo TX-NR Series (eISCP / ISCP) Control Spec

## Summary
Onkyo/Integra AV receivers implement ISCP (Integra Serial Control Protocol) over both 3-wire RS-232C and Ethernet (eISCP over TCP, default port 60128). This spec covers the main zone (PWR/AMT/MVL/TFR/LMD/SLI/TUN/...), Zone 2 (ZPW/ZMT/ZVL/SLZ/...), Zone 3 (PW3/MT3/VL3/SL3/...), Zone 4 (PW4/MT4/VL4/SL4/...), and the docked-source / RI pass-through commands. The catalogue is per-command with 3-char mnemonic + variable parameter.

<!-- UNRESOLVED: zone coverage per model varies — many commands are "No" for older models. Specific TX-NR sub-model applicability not enumerated in this revision. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # eISCP default; receiver-configurable 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# powerable       (PWR on/off commands present)
# routable        (SLI input selector commands present)
# queryable       (many QSTN query commands present)
# levelable       (MVL master volume + per-zone ZVL/VL3/VL4 + tone + level commands present)
```

## Actions
```yaml
# ISCP message format: !1<CMD3><PARAM>[CR][LF] (RS-232) or eISCP-wrapped (TCP).
# Destination unit type "1" = Receiver. Commands grouped by mnemonic.
# Pure value-variants of a single mnemonic are collapsed into one parameterized action.

# ───── Main Zone Amplifier ─────
- id: pwr
  label: System Power
  kind: action
  command: "PWR{power}"
  params:
    - name: power
      type: enum
      values: ["00", "01"]
      description: '"00"=Standby, "01"=On'

- id: pwr_query
  label: System Power Status Query
  kind: query
  command: "PWRQSTN"
  params: []

- id: amt
  label: Audio Muting
  kind: action
  command: "AMT{mute}"
  params:
    - name: mute
      type: enum
      values: ["00", "01", "TG"]
      description: '"00"=Off, "01"=On, "TG"=toggle'

- id: amt_query
  label: Audio Muting Status Query
  kind: query
  command: "AMTQSTN"
  params: []

- id: spa
  label: Speaker A
  kind: action
  command: "SPA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: '"00"=Off, "01"=On, "UP"=wrap, "QSTN"=query'

- id: spb
  label: Speaker B
  kind: action
  command: "SPB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: '"00"=Off, "01"=On, "UP"=wrap, "QSTN"=query'

- id: spl
  label: Speaker Layout
  kind: action
  command: "SPL{layout}"
  params:
    - name: layout
      type: enum
      values: ["SB", "FH", "FW", "UP", "QSTN"]
      description: 'SB=SurrBack, FH=FrontHigh, FW=FrontWide, UP=wrap, QSTN=query'

- id: mvl
  label: Master Volume
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: 'Hex "00"-"64" (0-100) or "00"-"50" (0-80) per model; "UP"/"DOWN"/"UP1"/"DOWN1" wrap; "QSTN"=query'

- id: tfr
  label: Front Tone (Bass/Treble)
  kind: action
  command: "TFR{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx (xx "-A"..."00"..."+A"); Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tfw
  label: Front-Wide Tone
  kind: action
  command: "TFW{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tfh
  label: Front-High Tone
  kind: action
  command: "TFH{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tct
  label: Center Tone
  kind: action
  command: "TCT{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tsr
  label: Surround Tone
  kind: action
  command: "TSR{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tsb
  label: Surround-Back Tone
  kind: action
  command: "TSB{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: tsw
  label: Subwoofer Tone
  kind: action
  command: "TSW{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; BUP/BDOWN; QSTN=query'

- id: slp
  label: Sleep Timer
  kind: action
  command: "SLP{value}"
  params:
    - name: value
      type: string
      description: 'Hex "01"-"5A" (1-90 min), "OFF", "UP" wrap, "QSTN"=query'

- id: slc
  label: Speaker Level Calibration
  kind: action
  command: "SLC{key}"
  params:
    - name: key
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
      description: 'TEST key, CH SEL key, LEVEL+/-, UP/DOWN'

- id: swl
  label: Subwoofer (temp) Level
  kind: action
  command: "SWL{level}"
  params:
    - name: level
      type: string
      description: '"-F"..."00"..."+C" (-15dB..0..+12dB), UP, DOWN, QSTN=query'

- id: ctl
  label: Center (temp) Level
  kind: action
  command: "CTL{level}"
  params:
    - name: level
      type: string
      description: '"-C"..."00"..."+C" (-12dB..0..+12dB), UP, DOWN, QSTN=query'

- id: dif
  label: Display Information / Mode
  kind: action
  command: "DIF{mode}"
  params:
    - name: mode
      type: string
      description: '"00"=Program Format, "01"=Digital Input, "02"=Digital Format, "03"=Bass, "04"=Treble; OR display mode "00"=Selector+Vol, "01"=Selector+Listening, "02"/"03"=temporary display, "TG"/"UP" wrap, "QSTN"=query'

- id: dim
  label: Dimmer Level
  kind: action
  command: "DIM{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "08", "DIM", "QSTN"]
      description: '"00"=Bright, "01"=Dim, "02"=Dark, "03"=Shut-Off, "08"=Bright&LED Off, "DIM"/wrap, "QSTN"=query'

- id: osd
  label: Setup (OSD) Navigation
  kind: action
  command: "OSD{key}"
  params:
    - name: key
      type: enum
      values: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]
      description: 'Menu navigation keys'

- id: mem
  label: Memory Setup
  kind: action
  command: "MEM{op}"
  params:
    - name: op
      type: enum
      values: ["STR", "RCL", "LOCK", "UNLK"]
      description: 'Store, recall, lock, unlock memory'

- id: ifa
  label: Audio Information
  kind: action
  command: "IFA{info}"
  params:
    - name: info
      type: string
      description: 'Free-form "nnnnn:nnnnn" string OR "QSTN" query'

- id: ifv
  label: Video Information
  kind: action
  command: "IFV{info}"
  params:
    - name: info
      type: string
      description: 'Free-form "nnnnn:nnnnn" string OR "QSTN" query'

# ───── Main Zone Unit (Input/Output Selectors) ─────
- id: sli
  label: Input Selector
  kind: action
  command: "SLI{source}"
  params:
    - name: source
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "30", "31", "32", "40", "UP", "DOWN", "QSTN"]
      description: '00=VIDEO1,01=VIDEO2,02=VIDEO3,03=VIDEO4,04=VIDEO5,05=VIDEO6,06=VIDEO7,10=DVD,20=TAPE1,21=TAPE2,22=PHONO,23=CD,24=FM,25=AM,26=TUNER,27=MUSIC SERVER,28=INTERNET RADIO,29=USB(Front),2A=USB(Rear),30=MULTI CH,31=XM,32=SIRIUS,40=Universal PORT,UP/DOWN wrap, QSTN=query'

- id: slr
  label: RECOUT Selector
  kind: action
  command: "SLR{source}"
  params:
    - name: source
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80", "QSTN"]
      description: 'Same source table as SLI; plus "7F"=OFF, "80"=SOURCE, QSTN=query'

- id: sla
  label: Audio Selector
  kind: action
  command: "SLA{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "UP", "QSTN"]
      description: '"00"=AUTO,"01"=MULTI-CH,"02"=ANALOG,"03"=iLINK,"04"=HDMI,"05"=COAX/OPT,"06"=BALANCE; UP wrap, QSTN=query'

- id: tga
  label: 12V Trigger A
  kind: action
  command: "TGA{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: '"00"=Off, "01"=On'

- id: tgb
  label: 12V Trigger B
  kind: action
  command: "TGB{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: '"00"=Off, "01"=On'

- id: tgc
  label: 12V Trigger C
  kind: action
  command: "TGC{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: '"00"=Off, "01"=On'

- id: vos
  label: Video Output Selector (Japanese model)
  kind: action
  command: "VOS{out}"
  params:
    - name: out
      type: enum
      values: ["00", "01", "QSTN"]
      description: '"00"=D4, "01"=Component, QSTN=query'

- id: hdo
  label: HDMI Output Selector
  kind: action
  command: "HDO{out}"
  params:
    - name: out
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "UP", "QSTN"]
      description: '"00"=No Analog, "01"=Main, "02"=Sub, "03"=Both, "04"=Both(Main), "05"=Both(Sub), UP wrap, QSTN=query'

- id: res
  label: Monitor Out Resolution
  kind: action
  command: "RES{res}"
  params:
    - name: res
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "UP", "QSTN"]
      description: '"00"=Through, "01"=Auto, "02"=480p, "03"=720p, "04"=1080i, "05"=1080p, "06"=Source, "07"=1080p/24, UP wrap, QSTN=query'

- id: isf
  label: ISF Mode
  kind: action
  command: "ISF{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: '"00"=Custom, "01"=Day, "02"=Night, UP wrap, QSTN=query'

# ───── Surround / Listening Mode ─────
- id: lmd
  label: Listening Mode
  kind: action
  command: "LMD{mode}"
  params:
    - name: mode
      type: string
      description: 'Mode hex (e.g. "00"=STEREO, "01"=DIRECT, "02"=SURROUND, "03"=FILM/Game-RPG, "04"=THX, "05"=ACTION, "06"=MUSICAL, "07"=MONO MOVIE, "08"=ORCHESTRA, "09"=UNPLUGGED, "0A"=STUDIO-MIX, "0B"=TV LOGIC, "0C"=ALL CH STEREO, "0D"=THEATER-DIMENSIONAL, "0E"=ENHANCED 7, "0F"=MONO, "11"=PURE AUDIO, "13"=FULL MONO, "40"=5.1ch/Straight Decode, "41"=Dolby EX/DTS ES, "42"=THX Cinema, "43"=THX Surround EX, "44"=THX Music, "45"=THX Games, "50"=U2/S2 Cinema, "51"=U2/S2 Music, "52"=U2/S2 Games, "80"=PLII/PLIIx Movie, "81"=PLII/PLIIx Music, "82"=Neo:6 Cinema, "83"=Neo:6 Music, "84"=PLII/PLIIx THX Cinema, "85"=Neo:6 THX Cinema, "86"=PLII/PLIIx Game, "87"-"8F"=Neural variants, "90"=PLIIz Height, "94"-"99"=PLIIz + THX, "A0"-"A7"=+Audyssey DSX); plus UP/DOWN wrap and QSTN query'

- id: ltn
  label: Late Night
  kind: action
  command: "LTN{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
      description: '"00"=Off, "01"=Low, "02"=High, "03"=Auto(Dolby TrueHD), UP wrap, QSTN=query'

- id: ras
  label: Re-EQ / Academy / Cinema Filter
  kind: action
  command: "RAS{mode}"
  params:
    - name: mode
      type: string
      description: 'Per model: Re-EQ/Academy "00"=Both Off,"01"=Re-EQ,"02"=Academy,UP wrap,QSTN; OR Re-EQ "00"/"01"/UP/QSTN; OR Cinema Filter "00"/"01"/UP/QSTN'

- id: ady
  label: Audyssey 2EQ/MultEQ
  kind: action
  command: "ADY{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: '"00"=Off, "01"=On, UP wrap, QSTN=query'

- id: adq
  label: Audyssey Dynamic EQ
  kind: action
  command: "ADQ{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: '"00"=Off, "01"=On, UP wrap, QSTN=query'

- id: adv
  label: Audyssey Dynamic Volume
  kind: action
  command: "ADV{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
      description: '"00"=Off, "01"=Light, "02"=Medium, "03"=Heavy, UP wrap, QSTN=query'

- id: dvl
  label: Dolby Volume
  kind: action
  command: "DVL{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
      description: '"00"=Off, "01"=Low, "02"=Mid, "03"=High, UP wrap, QSTN=query'

- id: mot
  label: Music Optimizer
  kind: action
  command: "MOT{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP", "QSTN"]
      description: '"00"=Off, "01"=On, UP wrap, QSTN=query'

# ───── Tuner ─────
- id: tun
  label: Tuning
  kind: action
  command: "TUN{freq}"
  params:
    - name: freq
      type: string
      description: '"nnnnn" direct freq (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch); or UP/DOWN wrap; or QSTN=query'

- id: prs
  label: Preset Select
  kind: action
  command: "PRS{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40) or "01"-"1E" (1-30, per model); UP/DOWN wrap; QSTN=query'

- id: prm
  label: Preset Memory
  kind: action
  command: "PRM{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40) or "01"-"1E" (1-30, per model)'

- id: rds
  label: RDS Display Mode
  kind: action
  command: "RDS{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: '"00"=RT, "01"=PTY, "02"=TP, UP wrap'

- id: pts
  label: PTY Scan
  kind: action
  command: "PTS{param}"
  params:
    - name: param
      type: string
      description: 'Hex "00"-"1E" (PTY 0-30) or "ENTER" to finish'

- id: tps
  label: TP Scan
  kind: action
  command: "TPS{param}"
  params:
    - name: param
      type: enum
      values: ["", "ENTER"]
      description: 'Empty=start TP scan, ENTER=finish'

- id: xcn
  label: XM Channel Name Info
  kind: action
  command: "XCN{name}"
  params:
    - name: name
      type: string
      description: 'Free-form channel name or QSTN=query'

- id: xat
  label: XM Artist Name Info
  kind: action
  command: "XAT{artist}"
  params:
    - name: artist
      type: string
      description: 'Free-form artist name or QSTN=query'

- id: xti
  label: XM Title Info
  kind: action
  command: "XTI{title}"
  params:
    - name: title
      type: string
      description: 'Free-form title or QSTN=query'

- id: xch
  label: XM Channel Number
  kind: action
  command: "XCH{n}"
  params:
    - name: n
      type: string
      description: '"000"-"255"; UP/DOWN wrap; QSTN=query'

- id: xct
  label: XM Category
  kind: action
  command: "XCT{info}"
  params:
    - name: info
      type: string
      description: 'Free-form category or UP/DOWN wrap; QSTN=query'

- id: scn
  label: SIRIUS Channel Name Info
  kind: action
  command: "SCN{name}"
  params:
    - name: name
      type: string
      description: 'Free-form channel name or QSTN=query'

- id: sat
  label: SIRIUS Artist Name Info
  kind: action
  command: "SAT{artist}"
  params:
    - name: artist
      type: string
      description: 'Free-form artist name or QSTN=query'

- id: sti
  label: SIRIUS Title Info
  kind: action
  command: "STI{title}"
  params:
    - name: title
      type: string
      description: 'Free-form title or QSTN=query'

- id: sch
  label: SIRIUS Channel Number
  kind: action
  command: "SCH{n}"
  params:
    - name: n
      type: string
      description: '"000"-"255"; UP/DOWN wrap; QSTN=query'

- id: sct
  label: SIRIUS Category
  kind: action
  command: "SCT{info}"
  params:
    - name: info
      type: string
      description: 'Free-form category or UP/DOWN wrap; QSTN=query'

- id: slk
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK{param}"
  params:
    - name: param
      type: string
      description: '"nnnn"=lock password (4 digits); "INPUT"=prompt for password; "WRONG"=wrong-password display'

- id: hat
  label: HD Radio Artist Name
  kind: action
  command: "HAT{name}"
  params:
    - name: name
      type: string
      description: 'Up to 64 chars ASCII or QSTN=query'

- id: hcn
  label: HD Radio Channel Name
  kind: action
  command: "HCN{name}"
  params:
    - name: name
      type: string
      description: 'Up to 7 chars or QSTN=query'

- id: hti
  label: HD Radio Title
  kind: action
  command: "HTI{title}"
  params:
    - name: title
      type: string
      description: 'Up to 64 chars or QSTN=query'

- id: hds
  label: HD Radio Detail Info
  kind: action
  command: "HDS{info}"
  params:
    - name: info
      type: string
      description: 'Free-form detail info or QSTN=query'

- id: hpr
  label: HD Radio Channel Program
  kind: action
  command: "HPR{n}"
  params:
    - name: n
      type: string
      description: '"01"-"08" program select; QSTN=query'

- id: hbl
  label: HD Radio Blend Mode
  kind: action
  command: "HBL{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "QSTN"]
      description: '"00"=Auto, "01"=Analog, QSTN=query'

- id: hts
  label: HD Radio Tuner Status
  kind: action
  command: "HTS{status}"
  params:
    - name: status
      type: string
      description: '"mmnnoo" status (mm HD flag 00/01, nn program 01-08, oo receivable programs bitmask hex); or QSTN=query'

# ───── Net-Tune / Network / USB ─────
- id: ntc
  label: Net-Tune / Network Operation
  kind: action
  command: "NTC{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN", "CHUP", "CHDN"]
      description: 'iRadio / network transport keys; FF/REW must be sent continuously with ≤100ms gap'

- id: nat
  label: Net/USB Artist Name
  kind: action
  command: "NAT{name}"
  params:
    - name: name
      type: string
      description: 'Up to 64 chars ASCII or QSTN=query'

- id: nal
  label: Net/USB Album Name
  kind: action
  command: "NAL{name}"
  params:
    - name: name
      type: string
      description: 'Up to 64 chars ASCII or QSTN=query'

- id: nti
  label: Net/USB Title
  kind: action
  command: "NTI{title}"
  params:
    - name: title
      type: string
      description: 'Up to 64 chars ASCII or QSTN=query'

- id: ntm
  label: Net/USB Time Info
  kind: action
  command: "NTM{time}"
  params:
    - name: time
      type: string
      description: '"mm:ss/mm:ss" elapsed/track (max 99:59) or QSTN=query'

- id: ntr
  label: Net/USB Track Info
  kind: action
  command: "NTR{info}"
  params:
    - name: info
      type: string
      description: '"cccc/tttt" current/total track (max 9999) or QSTN=query'

- id: nst
  label: Net/USB Play Status
  kind: action
  command: "NST{status}"
  params:
    - name: status
      type: string
      description: '"prs" (p=S/P/p/F/R play status; r=-/R/F/1 repeat status) or QSTN=query'

- id: npr
  label: Internet Radio Preset
  kind: action
  command: "NPR{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40)'

# ───── RI Dock ─────
- id: cds
  label: Dock Operation (via RI)
  kind: action
  command: "CDS{key}"
  params:
    - name: key
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
      description: 'Docking station transport / navigation'

# ───── ONKYO RI System Commands ─────
- id: ccd
  label: CD Player Operation (RI)
  kind: action
  command: "CCD{key}"
  params:
    - name: key
      type: enum
      values: ["TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON"]
      description: 'CD player transport + numeric + disc-select keys'

- id: ct1
  label: TAPE1(A) Operation (RI)
  kind: action
  command: "CT1{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
      description: 'Tape A transport'

- id: ct2
  label: TAPE2(B) Operation (RI)
  kind: action
  command: "CT2{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
      description: 'Tape B transport'

- id: ceq
  label: Graphic Equalizer (RI)
  kind: action
  command: "CEQ{key}"
  params:
    - name: key
      type: enum
      values: ["PRESET"]
      description: 'GEQ preset key'

- id: cdt
  label: DAT Recorder Operation (RI)
  kind: action
  command: "CDT{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
      description: 'DAT transport'

- id: cdv
  label: DVD Player Operation (RI)
  kind: action
  command: "CDV{key}"
  params:
    - name: key
      type: enum
      values: ["PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"]
      description: 'DVD player transport + menu + zoom + picture controls'

- id: cmd
  label: MD Recorder Operation (RI)
  kind: action
  command: "CMD{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY"]
      description: 'MD recorder transport + edit'

- id: ccr
  label: CD-R Recorder Operation (RI)
  kind: action
  command: "CCR{key}"
  params:
    - name: key
      type: enum
      values: ["P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"]
      description: 'CD-R recorder transport + edit'

# ───── Zone 2 ─────
- id: zpw
  label: Zone 2 Power
  kind: action
  command: "ZPW{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "QSTN"]
      description: '"00"=Standby, "01"=On, QSTN=query'

- id: zmt
  label: Zone 2 Muting
  kind: action
  command: "ZMT{mute}"
  params:
    - name: mute
      type: enum
      values: ["00", "01", "TG", "QSTN"]
      description: '"00"=Off, "01"=On, "TG"=toggle, QSTN=query'

- id: zvl
  label: Zone 2 Volume
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: 'Hex "00"-"64" (0-100) or "00"-"50" (0-80) per model; UP/DOWN wrap; QSTN=query'

- id: ztn
  label: Zone 2 Tone
  kind: action
  command: "ZTN{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: zbl
  label: Zone 2 Balance
  kind: action
  command: "ZBL{value}"
  params:
    - name: value
      type: string
      description: '"xx" "-A"..."00"..."+A" (-10..0..+10, 2 step); UP/DOWN; QSTN=query'

- id: slz
  label: Zone 2 Selector
  kind: action
  command: "SLZ{source}"
  params:
    - name: source
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "30", "31", "32", "40", "80", "QSTN"]
      description: 'Same table as SLI plus "80"=SOURCE; QSTN=query'

- id: tuz
  label: Zone 2 Tuning
  kind: action
  command: "TUZ{freq}"
  params:
    - name: freq
      type: string
      description: '"nnnnn" direct freq; UP/DOWN wrap; QSTN=query'

- id: prz
  label: Zone 2 Preset
  kind: action
  command: "PRZ{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40) or "01"-"1E" (1-30); UP/DOWN wrap; QSTN=query'

- id: ntz
  label: Zone 2 Net-Tune/Network
  kind: action
  command: "NTZ{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: 'Network transport for Zone 2'

- id: npz
  label: Zone 2 Internet Radio Preset
  kind: action
  command: "NPZ{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40)'

- id: lmz
  label: Zone 2 Listening Mode
  kind: action
  command: "LMZ{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "0F", "12", "87", "88"]
      description: '"00"=STEREO, "01"=DIRECT, "0F"=MONO, "12"=MULTIPLEX, "87"=DVS(PL2), "88"=DVS(NEO6)'

- id: ltz
  label: Zone 2 Late Night
  kind: action
  command: "LTZ{level}"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: '"00"=Off, "01"=Low, "02"=High, UP wrap, QSTN=query'

- id: raz
  label: Zone 2 Re-EQ/Academy Filter
  kind: action
  command: "RAZ{mode}"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
      description: '"00"=Both Off, "01"=Re-EQ, "02"=Academy, UP wrap, QSTN=query'

# ───── Zone 3 ─────
- id: pw3
  label: Zone 3 Power
  kind: action
  command: "PW3{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "QSTN"]
      description: '"00"=Standby, "01"=On, QSTN=query'

- id: mt3
  label: Zone 3 Muting
  kind: action
  command: "MT3{mute}"
  params:
    - name: mute
      type: enum
      values: ["00", "01", "TG", "QSTN"]
      description: '"00"=Off, "01"=On, "TG"=toggle, QSTN=query'

- id: vl3
  label: Zone 3 Volume
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: 'Hex "00"-"64" (0-100) or "00"-"50" (0-80); UP/DOWN wrap; QSTN=query'

- id: tn3
  label: Zone 3 Tone
  kind: action
  command: "TN3{params}"
  params:
    - name: params
      type: string
      description: 'Bass: Bxx; Treble: Txx; BUP/BDOWN/TUP/TDOWN; QSTN=query'

- id: bl3
  label: Zone 3 Balance
  kind: action
  command: "BL3{value}"
  params:
    - name: value
      type: string
      description: '"xx" "-A"..."00"..."+A"; UP/DOWN; QSTN=query'

- id: sl3
  label: Zone 3 Selector
  kind: action
  command: "SL3{source}"
  params:
    - name: source
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "30", "31", "32", "40", "80", "QSTN"]
      description: 'Same table as SLI plus "80"=SOURCE'

- id: tu3
  label: Zone 3 Tuning
  kind: action
  command: "TU3{freq}"
  params:
    - name: freq
      type: string
      description: '"nnnnn" direct freq; UP/DOWN wrap; QSTN=query'

- id: pr3
  label: Zone 3 Preset
  kind: action
  command: "PR3{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40) or "01"-"1E" (1-30); UP/DOWN wrap; QSTN=query'

- id: nt3
  label: Zone 3 Net-Tune/Network
  kind: action
  command: "NT3{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: 'Network transport for Zone 3'

- id: np3
  label: Zone 3 Internet Radio Preset
  kind: action
  command: "NP3{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40)'

# ───── Zone 4 ─────
- id: pw4
  label: Zone 4 Power
  kind: action
  command: "PW4{state}"
  params:
    - name: state
      type: enum
      values: ["00", "01", "QSTN"]
      description: '"00"=Standby, "01"=On, QSTN=query'

- id: mt4
  label: Zone 4 Muting
  kind: action
  command: "MT4{mute}"
  params:
    - name: mute
      type: enum
      values: ["00", "01", "TG", "QSTN"]
      description: '"00"=Off, "01"=On, "TG"=toggle, QSTN=query'

- id: vl4
  label: Zone 4 Volume
  kind: action
  command: "VL4{level}"
  params:
    - name: level
      type: string
      description: 'Hex "00"-"64" (0-100) or "00"-"50" (0-80); UP/DOWN wrap; QSTN=query'

- id: sl4
  label: Zone 4 Selector
  kind: action
  command: "SL4{source}"
  params:
    - name: source
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "30", "31", "32", "40", "80", "QSTN"]
      description: 'Same table as SLI plus "80"=SOURCE'

- id: tu4
  label: Zone 4 Tuning
  kind: action
  command: "TU4{freq}"
  params:
    - name: freq
      type: string
      description: '"nnnnn" direct freq; UP/DOWN wrap; QSTN=query'

- id: pr4
  label: Zone 4 Preset
  kind: action
  command: "PR4{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40) or "01"-"1E" (1-30); UP/DOWN wrap; QSTN=query'

- id: nt4
  label: Zone 4 Net-Tune/Network
  kind: action
  command: "NT4{key}"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
      description: 'Network transport for Zone 4'

- id: np4
  label: Zone 4 Internet Radio Preset
  kind: action
  command: "NP4{n}"
  params:
    - name: n
      type: string
      description: 'Hex "01"-"28" (1-40)'
```

## Feedbacks
```yaml
# ISCP returns Status Messages via eISCP/serial unsolicited on state change.
# Format: !1<CMD3><PARAMS>[EOF] (or [EOF][CR][LF] per model)
# Each QSTN command yields a status response.
- id: power_state
  type: enum
  values: [standby, on]
  source_command: PWRQSTN
- id: mute_state
  type: enum
  values: [off, on]
  source_command: AMTQSTN
- id: speaker_a_state
  type: enum
  values: [off, on]
  source_command: SPAQSTN
- id: speaker_b_state
  type: enum
  values: [off, on]
  source_command: SPBQSTN
- id: speaker_layout
  type: enum
  values: [surr_back, front_high, front_wide]
  source_command: SPLQSTN
- id: master_volume
  type: string
  description: Hex "00"-"64" (0-100) or "00"-"50" (0-80)
  source_command: MVLQSTN
- id: input_selector
  type: string
  description: Hex source code (00..40 / 80 SOURCE)
  source_command: SLIQSTN
- id: recout_selector
  type: string
  description: Hex source code (00..32 / 7F OFF / 80 SOURCE)
  source_command: SLRQSTN
- id: audio_selector
  type: string
  description: Hex audio selector mode (00=AUTO..06=BALANCE)
  source_command: SLAQSTN
- id: listening_mode
  type: string
  description: Hex listening mode code
  source_command: LMDQSTN
- id: late_night_level
  type: string
  description: Hex 00/01/02/03
  source_command: LTNQSTN
- id: dimmer_level
  type: string
  description: Hex 00..03/08
  source_command: DIMQSTN
- id: display_mode
  type: string
  description: Hex display mode
  source_command: DIFQSTN
- id: sleep_time
  type: string
  description: Hex sleep minutes or "OFF"
  source_command: SLPQSTN
- id: tuning_frequency
  type: string
  description: FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch
  source_command: TUNQSTN
- id: preset_number
  type: string
  description: Hex preset (01-28 or 01-1E)
  source_command: PRSQSTN
- id: audyssey_state
  type: string
  description: 00/01
  source_command: ADYQSTN
- id: dynamic_eq_state
  type: string
  description: 00/01
  source_command: ADQQSTN
- id: dynamic_volume_state
  type: string
  description: 00/01/02/03
  source_command: ADVQSTN
- id: dolby_volume_state
  type: string
  description: 00/01/02/03
  source_command: DVLQSTN
- id: music_optimizer_state
  type: string
  description: 00/01
  source_command: MOTQSTN
- id: hdmi_output
  type: string
  description: Hex 00..05
  source_command: HDOQSTN
- id: monitor_resolution
  type: string
  description: Hex 00..07
  source_command: RESQSTN
- id: isf_mode
  type: string
  description: Hex 00/01/02
  source_command: ISFQSTN
- id: zone2_power
  type: string
  description: 00/01
  source_command: ZPWQSTN
- id: zone2_mute
  type: string
  description: 00/01
  source_command: ZMTQSTN
- id: zone2_volume
  type: string
  description: Hex
  source_command: ZVLQSTN
- id: zone2_tone
  type: string
  description: "BxxTxx string"
  source_command: ZTNQSTN
- id: zone2_balance
  type: string
  description: Hex xx
  source_command: ZBLQSTN
- id: zone2_selector
  type: string
  description: Hex source code
  source_command: SLZQSTN
- id: zone3_power
  type: string
  description: 00/01
  source_command: PW3QSTN
- id: zone3_mute
  type: string
  description: 00/01
  source_command: MT3QSTN
- id: zone3_volume
  type: string
  description: Hex
  source_command: VL3QSTN
- id: zone3_tone
  type: string
  description: "BxxTxx string"
  source_command: TN3QSTN
- id: zone3_balance
  type: string
  description: Hex xx
  source_command: BL3QSTN
- id: zone3_selector
  type: string
  description: Hex source code
  source_command: SL3QSTN
- id: zone4_power
  type: string
  description: 00/01
  source_command: PW4QSTN
- id: zone4_mute
  type: string
  description: 00/01
  source_command: MT4QSTN
- id: zone4_volume
  type: string
  description: Hex
  source_command: VL4QSTN
- id: zone4_selector
  type: string
  description: Hex source code
  source_command: SL4QSTN
```

## Variables
```yaml
# Settable numeric/string parameters that are discrete continuous settings,
# not enumerated command mnemonics. Source quotes hex ranges explicitly.
- id: master_volume_level
  label: Master Volume Level
  type: integer
  range: "0x00-0x64 (0-100) on newer models, 0x00-0x50 (0-80) on older"
  command_template: "MVL{hex}"
- id: zone2_volume_level
  label: Zone 2 Volume Level
  type: integer
  range: "0x00-0x64 or 0x00-0x50"
  command_template: "ZVL{hex}"
- id: zone3_volume_level
  label: Zone 3 Volume Level
  type: integer
  range: "0x00-0x64 or 0x00-0x50"
  command_template: "VL3{hex}"
- id: zone4_volume_level
  label: Zone 4 Volume Level
  type: integer
  range: "0x00-0x64 or 0x00-0x50"
  command_template: "VL4{hex}"
- id: tone_value
  label: Tone B/T Value
  type: string
  description: 'xx in "-A"..."00"..."+A" (-10..0..+10, 2-step)'
- id: sleep_minutes
  label: Sleep Timer Minutes
  type: integer
  range: "1-90 (hex 01-5A)"
  command_template: "SLP{hex}"
- id: preset_number
  label: Tuner Preset
  type: integer
  range: "1-40 (hex 01-28) or 1-30 (hex 01-1E)"
  command_template: "PRS{hex}"
```

## Events
```yaml
# eISCP pushes unsolicited status messages when receiver state changes
# (within 50 ms). Format identical to query responses.
- id: status_change
  description: Receiver emits status messages on state change. Controller should not poll unless connection is open continuously.
  source: "Event Notice Communication (section 2.3 of source)"
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: source does not document any required command sequences (e.g. for zone-pairing, factory reset, firmware update).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or
# required power-on sequencing. The "FFW/REW Net-tune commands must be
# sent continuously with ≤100ms delay" note is a transport timing requirement,
# not a safety interlock.
```

## Notes
- ISCP message envelope: `!1<CMD3><PARAMS>[CR][LF]` (RS-232) or eISCP-wrapped over TCP. Unit type `"1"` = Receiver.
- eISCP header: 16 bytes — Header Size `0x00000010` (big-endian), Data Size, Version `0x01`, Reserved `0x000000`. Wrap ISCP message with `[EOF]` or `[EOF][CR][LF]` terminator (model-dependent).
- eISCP default port 60128; receiver-side can be set 49152-65535 in setup menu.
- Communication requirement: hold TCP connection continuously; only one client connection supported; ≥50 ms gap between received messages.
- Tuning digit widths differ: FM uses `nnn.nn` MHz (5 digits), AM uses `nnnnn` kHz.
- Source is version 1.15 (31 August 2009) of the Integra Serial Communication Protocol document covering Onkyo/Integra receivers from TX-DS989 through TX-NR5007 / DTR-80.1 / DHC-80.1 / PR-SC5507.

<!-- UNRESOLVED:
- Specific TX-NR sub-model applicability (per-row Yes/No columns) not enumerated in this spec; see source for per-model support table.
- Voltage, current, power-consumption values not in source.
- Authentication / credentials — source describes no login procedure, so auth.type=none inferred.
- Firmware version compatibility ranges (per revision history) not transcribed into structured fields.
- Macro sequences for power-on sequencing or factory reset not documented in source.
- Source format constraint: long Listening-Mode list collapsed into one parameterized LMD action; Audyssey DSX/PLIIz/Neural variants listed in params.description only. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-09-02T15:23:10.549Z
last_checked_at: 2026-10-01T06:37:45.477Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T06:37:45.477Z
matched_actions: 115
action_count: 115
confidence: medium
summary: "All 115 spec action literals (PWR/AMT/MVL/SLI/ZPW/PW3/PW4/NTC/CCD/etc.) match ISCP command tables verbatim; transport matches source. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "zone coverage per model varies — many commands are \"No\" for older models. Specific TX-NR sub-model applicability not enumerated in this revision."
- "source does not document any required command sequences (e.g. for zone-pairing, factory reset, firmware update)."
- "source does not document safety warnings, interlocks, or"
- "- Specific TX-NR sub-model applicability (per-row Yes/No columns) not enumerated in this spec; see source for per-model support table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
