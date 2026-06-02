---
spec_id: admin/integra-dtr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTR Series Control Spec"
manufacturer: Integra
model_family: "DTR Series"
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - "DTR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T04:20:01.745Z
last_checked_at: 2026-06-02T04:20:01.745Z
generated_at: 2026-06-02T04:20:01.745Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific DTR model numbers in the series not enumerated in source; source describes protocol generically for the family."
  - "older-model DIF and current DIF (display mode) share mnemonic; semantics differ by model"
  - "full response envelope for each QSTN not enumerated in source; receivers echo the request mnemonic in the status response."
  - "tone control returns (TFRQSTN etc.) are composite BxxTxx strings; the value space is not fully enumerated."
  - "complete list of unsolicited status mnemonics and trigger conditions not stated in source."
  - "eISCP connection model requires persistent TCP connection; unsolicited notices are dropped if connection is not held continuously."
  - "no multi-step sequences documented in source."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "full receiver model list covered by this protocol not enumerated in source; protocol applies to Integra DTR series generically with model-specific feature availability."
  - "complete set of unsolicited status response mnemonics and trigger conditions not stated in source."
  - "eISCP keepalive / connection management behavior not documented beyond \"must hold connection continuously\"."
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-06-02T04:20:01.745Z
  matched_actions: 176
  action_count: 176
  confidence: medium
  summary: "All 176 spec actions matched against source; transport parameters verified; coverage ratio 176 mnemonics exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Integra DTR Series Control Spec

## Summary

ISCP (Integra Serial Control Protocol) for Integra DTR Series AV receivers. Three-character command mnemonics sent as ASCII over RS-232C (9600 8N1) or wrapped in an eISCP header for TCP control on port 60128. Covers main zone amplifier, unit, surround, tuner, net-tune, RI-system, dock, and zones 2-4 commands.

<!-- UNRESOLVED: specific DTR model numbers in the series not enumerated in source; source describes protocol generically for the family. -->

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

**Envelope:** every message begins with `!1` (start char + Receiver unit type) followed by 3-char command mnemonic, then variable-length parameters, then terminator.
- Command (controller → device): terminated by `[CR]` (0x0D), `[LF]` (0x0A), or `[CR][LF]`
- Status response (device → controller): terminated by `[EOF]` (0x1A), `[EOF][CR]`, or `[EOF][CR][LF]`
- eISCP (Ethernet) wraps the ISCP message in a 16-byte header: `"ISCP"` (4 bytes ASCII) + Header Size (4 bytes big-endian, 0x00000010) + Data Size (4 bytes big-endian) + Version (1 byte, 0x01) + Reserved (3 bytes, 0x000000). TCP port 60128 default; user-configurable 49152-65535.
- Controller must wait ≥50 msec between messages; receiver replies within 50 msec.

## Traits
```yaml
- powerable       # inferred from PWR/PW3/PW4/ZPW command examples
- queryable       # inferred from QSTN query command examples
- routable        # inferred from input selector (SLI/SLR/SLA/SLZ/SL3/SL4) and HDMI output routing
- levelable       # inferred from MVL/ZVL/VL3/VL4 volume, TFR/TSW tone, SWL/CTL level commands
```

## Actions
```yaml
# Amplifier - Main Zone
- id: pwr_set
  label: System Power
  kind: action
  command: "!1PWR{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Standby, 01=On"
- id: pwr_query
  label: System Power Status Query
  kind: query
  command: "!1PWRQSTN\r"
  params: []
- id: amt_set
  label: Audio Muting
  kind: action
  command: "!1AMT{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "TG"]
      description: "00=Off, 01=On, TG=Wrap-Around"
- id: amt_query
  label: Audio Muting Query
  kind: query
  command: "!1AMTQSTN\r"
  params: []
- id: spa_set
  label: Speaker A
  kind: action
  command: "!1SPA{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap-Around"
- id: spa_query
  label: Speaker A Query
  kind: query
  command: "!1SPAQSTN\r"
  params: []
- id: spb_set
  label: Speaker B
  kind: action
  command: "!1SPB{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap-Around"
- id: spb_query
  label: Speaker B Query
  kind: query
  command: "!1SPBQSTN\r"
  params: []
- id: spl_set
  label: Speaker Layout
  kind: action
  command: "!1SPL{state}\r"
  params:
    - name: state
      type: enum
      values: ["SB", "FH", "FW", "UP"]
      description: "SB=SurrBack, FH=FrontHigh, FW=FrontWide, UP=Wrap-Around"
- id: spl_query
  label: Speaker Layout Query
  kind: query
  command: "!1SPLQSTN\r"
  params: []
- id: mvl_set
  label: Master Volume
  kind: action
  command: "!1MVL{level}\r"
  params:
    - name: level
      type: enum
      values: ["00..64", "00..50", "UP", "DOWN", "UP1", "DOWN1"]
      description: "Hex 00-64 (0-100) or 00-50 (0-80) absolute; UP/DOWN step; UP1/DOWN1 1dB step"
- id: mvl_query
  label: Master Volume Query
  kind: query
  command: "!1MVLQSTN\r"
  params: []
- id: tfr_set
  label: Tone Front (Bass/Treble)
  kind: action
  command: "!1TFR{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx (bass -A..+A), Txx (treble -A..+A), BUP, BDOWN, TUP, TDOWN"
- id: tfr_query
  label: Tone Front Query
  kind: query
  command: "!1TFRQSTN\r"
  params: []
- id: tfw_set
  label: Tone Front Wide
  kind: action
  command: "!1TFW{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tfw_query
  label: Tone Front Wide Query
  kind: query
  command: "!1TFWQSTN\r"
  params: []
- id: tfh_set
  label: Tone Front High
  kind: action
  command: "!1TFH{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tfh_query
  label: Tone Front High Query
  kind: query
  command: "!1TFHQSTN\r"
  params: []
- id: tct_set
  label: Tone Center
  kind: action
  command: "!1TCT{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tct_query
  label: Tone Center Query
  kind: query
  command: "!1TCTQSTN\r"
  params: []
- id: tsr_set
  label: Tone Surround
  kind: action
  command: "!1TSR{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tsr_query
  label: Tone Surround Query
  kind: query
  command: "!1TSRQSTN\r"
  params: []
- id: tsb_set
  label: Tone Surround Back
  kind: action
  command: "!1TSB{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tsb_query
  label: Tone Surround Back Query
  kind: query
  command: "!1TSBQSTN\r"
  params: []
- id: tsw_set
  label: Tone Subwoofer
  kind: action
  command: "!1TSW{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx (bass -A..+A), BUP, BDOWN"
- id: tsw_query
  label: Tone Subwoofer Query
  kind: query
  command: "!1TSWQSTN\r"
  params: []
- id: slp_set
  label: Sleep Timer
  kind: action
  command: "!1SLP{value}\r"
  params:
    - name: value
      type: enum
      values: ["01..5A", "OFF", "UP"]
      description: "Hex 01-5A (1-90 min), OFF, UP wrap"
- id: slp_query
  label: Sleep Timer Query
  kind: query
  command: "!1SLPQSTN\r"
  params: []
- id: slc_set
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{key}\r"
  params:
    - name: key
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
      description: "TEST=Test tone, CHSEL=Channel Select, UP/DOWN=Level adjust"
  # No QSTN per source
- id: swl_set
  label: Subwoofer (temporary) Level
  kind: action
  command: "!1SWL{level}\r"
  params:
    - name: level
      type: enum
      values: ["-F..+C", "UP", "DOWN"]
      description: "Hex -F..00..+C (-15..0..+12 dB); UP/DOWN step"
- id: swl_query
  label: Subwoofer Level Query
  kind: query
  command: "!1SWLQSTN\r"
  params: []
- id: ctl_set
  label: Center (temporary) Level
  kind: action
  command: "!1CTL{level}\r"
  params:
    - name: level
      type: enum
      values: ["-C..+C", "UP", "DOWN"]
      description: "Hex -C..00..+C (-12..0..+12 dB); UP/DOWN step"
- id: ctl_query
  label: Center Level Query
  kind: query
  command: "!1CTLQSTN\r"
  params: []
- id: dif_info_set
  label: Display Information (older models)
  kind: action
  command: "!1DIF{info}\r"
  params:
    - name: info
      type: enum
      values: ["00", "01", "02", "03", "04"]
      description: "00=Program Format, 01=Digital Input, 02=Digital Format, 03=Bass, 04=Treble"
  # UNRESOLVED: older-model DIF and current DIF (display mode) share mnemonic; semantics differ by model
- id: dif_mode_set
  label: Display Mode
  kind: action
  command: "!1DIF{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "TG"]
      description: "00=Selector+Volume, 01=Selector+Listening, 02=Digital Format, 03=Video Format, TG=Wrap"
- id: dif_mode_query
  label: Display Mode Query
  kind: query
  command: "!1DIFQSTN\r"
  params: []
- id: dim_set
  label: Dimmer Level
  kind: action
  command: "!1DIM{level}\r"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "08", "DIM"]
      description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED Off, DIM=Wrap"
- id: dim_query
  label: Dimmer Level Query
  kind: query
  command: "!1DIMQSTN\r"
  params: []
- id: osd_set
  label: Setup Operation (OSD menu)
  kind: action
  command: "!1OSD{key}\r"
  params:
    - name: key
      type: enum
      values: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]
  # No QSTN per source
- id: mem_set
  label: Memory Setup
  kind: action
  command: "!1MEM{op}\r"
  params:
    - name: op
      type: enum
      values: ["STR", "RCL", "LOCK", "UNLK"]
      description: "STR=Store, RCL=Recall, LOCK, UNLK=Unlock"
  # No QSTN per source
- id: ifa_set
  label: Audio Information
  kind: action
  command: "!1IFA{info}\r"
  params:
    - name: info
      type: string
      description: "nnnnn:nnnnn, comma-separated audio info; populated by DIF02"
- id: ifa_query
  label: Audio Information Query
  kind: query
  command: "!1IFAQSTN\r"
  params: []
- id: ifv_set
  label: Video Information
  kind: action
  command: "!1IFV{info}\r"
  params:
    - name: info
      type: string
      description: "nnnnn:nnnnn, comma-separated video info; populated by DIF03"
- id: ifv_query
  label: Video Information Query
  kind: query
  command: "!1IFVQSTN\r"
  params: []

# Unit - Main Zone
- id: sli_set
  label: Input Selector
  kind: action
  command: "!1SLI{input}\r"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "UP", "DOWN"]
      description: "00-06=VIDEO1-7, 10=DVD, 20=TAPE1, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB Front, 2A=USB Rear, 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"
- id: sli_query
  label: Input Selector Query
  kind: query
  command: "!1SLIQSTN\r"
  params: []
- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "!1SLR{output}\r"
  params:
    - name: output
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
      description: "Output source; 7F=Off, 80=Source (follows main)"
- id: slr_query
  label: RECOUT Selector Query
  kind: query
  command: "!1SLRQSTN\r"
  params: []
- id: sla_set
  label: Audio Selector
  kind: action
  command: "!1SLA{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "UP"]
      description: "00=AUTO, 01=MULTI-CH, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"
- id: sla_query
  label: Audio Selector Query
  kind: query
  command: "!1SLAQSTN\r"
  params: []
- id: tga_set
  label: 12V Trigger A
  kind: action
  command: "!1TGA{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
      description: "00=Off, 01=On; available when Setup Menu trigger is OFF"
  # No QSTN per source
- id: tgb_set
  label: 12V Trigger B
  kind: action
  command: "!1TGB{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
  # No QSTN per source
- id: tgc_set
  label: 12V Trigger C
  kind: action
  command: "!1TGC{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
  # No QSTN per source
- id: vos_set
  label: Video Output Selector (Japanese model only)
  kind: action
  command: "!1VOS{out}\r"
  params:
    - name: out
      type: enum
      values: ["00", "01"]
      description: "00=D4, 01=Component"
- id: vos_query
  label: Video Output Selector Query
  kind: query
  command: "!1VOSQSTN\r"
  params: []
- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "!1HDO{out}\r"
  params:
    - name: out
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "UP"]
      description: "00=No/Analog, 01=Yes/Main, 02=Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"
- id: hdo_query
  label: HDMI Output Query
  kind: query
  command: "!1HDOQSTN\r"
  params: []
- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "!1RES{res}\r"
  params:
    - name: res
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "07", "06", "UP"]
      description: "00=Through, 01=Auto (HDMI), 02=480p, 03=720p, 04=1080i, 05=1080p (HDMI), 07=1080p/24fs (HDMI), 06=Source"
- id: res_query
  label: Monitor Out Resolution Query
  kind: query
  command: "!1RESQSTN\r"
  params: []
- id: isf_set
  label: ISF Mode
  kind: action
  command: "!1ISF{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=Custom, 01=Day, 02=Night"
- id: isf_query
  label: ISF Mode Query
  kind: query
  command: "!1ISFQSTN\r"
  params: []

# Surround - Main Zone
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "!1LMD{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "11", "12", "13", "14", "15", "16", "40", "41", "42", "43", "44", "45", "50", "51", "52", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "UP", "DOWN", "MOVIE", "MUSIC", "GAME"]
      description: "00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Sensation, 16=Audyssey DSX, 40=5.1ch/Straight, 41=Dolby EX/DTS ES, 42-45=THX variants, 50-52=U2/S2 variants, 80-99=PLII/PLIIx/Neo:6/Neural variants, A0-A7=DSX variants, UP/DOWN wrap, MOVIE/MUSIC/GAME=category wrap"
- id: lmd_query
  label: Listening Mode Query
  kind: query
  command: "!1LMDQSTN\r"
  params: []
- id: ltn_set
  label: Late Night
  kind: action
  command: "!1LTN{level}\r"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=Off, 01=Low(DD)/On(HD), 02=High(DD)/On(HD), 03=Auto(HD)"
- id: ltn_query
  label: Late Night Query
  kind: query
  command: "!1LTNQSTN\r"
  params: []
- id: ras_set
  label: Re-EQ/Academy Filter
  kind: action
  command: "!1RAS{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=Both Off (or Re-EQ Off / Cinema Off per model variant), 01=Re-EQ On / Re-EQ On, 02=Academy On; semantics differ by model"
- id: ras_query
  label: Re-EQ/Academy Query
  kind: query
  command: "!1RASQSTN\r"
  params: []
- id: ady_set
  label: Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: "!1ADY{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
- id: ady_query
  label: Audyssey 2EQ/MultEQ Query
  kind: query
  command: "!1ADYQSTN\r"
  params: []
- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
- id: adq_query
  label: Audyssey Dynamic EQ Query
  kind: query
  command: "!1ADQQSTN\r"
  params: []
- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{level}\r"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=Off, 01=Light, 02=Medium, 03=Heavy"
- id: adv_query
  label: Audyssey Dynamic Volume Query
  kind: query
  command: "!1ADVQSTN\r"
  params: []
- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "!1DVL{level}\r"
  params:
    - name: level
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=Off, 01=Low, 02=Mid, 03=High"
- id: dvl_query
  label: Dolby Volume Query
  kind: query
  command: "!1DVLQSTN\r"
  params: []
- id: mot_set
  label: Music Optimizer
  kind: action
  command: "!1MOT{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
- id: mot_query
  label: Music Optimizer Query
  kind: query
  command: "!1MOTQSTN\r"
  params: []

# Tuner - Main Zone
- id: tun_set
  label: Tuning
  kind: action
  command: "!1TUN{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch; pad XM to 5 digits)"
- id: tun_query
  label: Tuning Frequency Query
  kind: query
  command: "!1TUNQSTN\r"
  params: []
- id: prs_set
  label: Preset Recall
  kind: action
  command: "!1PRS{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28", "01..1E", "UP", "DOWN"]
      description: "Hex 01-28 (1-40) or 01-1E (1-30) per model"
- id: prs_query
  label: Preset Query
  kind: query
  command: "!1PRSQSTN\r"
  params: []
- id: prm_set
  label: Preset Memory
  kind: action
  command: "!1PRM{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28", "01..1E"]
      description: "Hex preset number 1-40 or 1-30 per model"
  # No QSTN per source
- id: rds_set
  label: RDS Information Display (RDS model)
  kind: action
  command: "!1RDS{info}\r"
  params:
    - name: info
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=RT, 01=PTY, 02=TP; RBDS model only 00"
  # No QSTN per source
- id: pts_set
  label: PTY Scan (RDS model)
  kind: action
  command: "!1PTS{pty}\r"
  params:
    - name: pty
      type: enum
      values: ["00..1E", "ENTER"]
      description: "Hex 00-1E (0-30) PTY number, or ENTER to finish scan"
  # No QSTN per source
- id: tps_set
  label: TP Scan (RDS model)
  kind: action
  command: "!1TPS{action}\r"
  params:
    - name: action
      type: enum
      values: ["", "ENTER"]
      description: "Empty=Start TP Scan, ENTER=Finish"
  # No QSTN per source
- id: xcn_query
  label: XM Channel Name Query
  kind: query
  command: "!1XCNQSTN\r"
  params: []
- id: xat_query
  label: XM Artist Name Query
  kind: query
  command: "!1XATQSTN\r"
  params: []
- id: xti_query
  label: XM Title Query
  kind: query
  command: "!1XTIQSTN\r"
  params: []
- id: xch_set
  label: XM Channel Number
  kind: action
  command: "!1XCH{ch}\r"
  params:
    - name: ch
      type: enum
      values: ["000..255", "UP", "DOWN"]
- id: xch_query
  label: XM Channel Number Query
  kind: query
  command: "!1XCHQSTN\r"
  params: []
- id: xct_set
  label: XM Category
  kind: action
  command: "!1XCT{cat}\r"
  params:
    - name: cat
      type: enum
      values: ["UP", "DOWN"]
      description: "Wrap-around; value is 10-char category name returned by XCTQSTN"
- id: xct_query
  label: XM Category Query
  kind: query
  command: "!1XCTQSTN\r"
  params: []
- id: scn_query
  label: SIRIUS Channel Name Query
  kind: query
  command: "!1SCNQSTN\r"
  params: []
- id: sat_query
  label: SIRIUS Artist Name Query
  kind: query
  command: "!1SATQSTN\r"
  params: []
- id: sti_query
  label: SIRIUS Title Query
  kind: query
  command: "!1STIQSTN\r"
  params: []
- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "!1SCH{ch}\r"
  params:
    - name: ch
      type: enum
      values: ["000..255", "UP", "DOWN"]
- id: sch_query
  label: SIRIUS Channel Number Query
  kind: query
  command: "!1SCHQSTN\r"
  params: []
- id: sct_set
  label: SIRIUS Category
  kind: action
  command: "!1SCT{cat}\r"
  params:
    - name: cat
      type: enum
      values: ["UP", "DOWN"]
- id: sct_query
  label: SIRIUS Category Query
  kind: query
  command: "!1SCTQSTN\r"
  params: []
- id: slk_set
  label: SIRIUS Parental Lock (SIRIUS model)
  kind: action
  command: "!1SLK{action}\r"
  params:
    - name: action
      type: enum
      values: ["nnnn", "INPUT", "WRONG"]
      description: "nnnn=4-digit password, INPUT=prompt, WRONG=wrong-password display"
  # No QSTN per source
- id: hat_query
  label: HD Radio Artist Name Query
  kind: query
  command: "!1HATQSTN\r"
  params: []
- id: hcn_query
  label: HD Radio Channel Name Query
  kind: query
  command: "!1HCNQSTN\r"
  params: []
- id: hti_query
  label: HD Radio Title Query
  kind: query
  command: "!1HTIQSTN\r"
  params: []
- id: hds_query
  label: HD Radio Detail Info Query
  kind: query
  command: "!1HDSQSTN\r"
  params: []
- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "!1HPR{prog}\r"
  params:
    - name: prog
      type: enum
      values: ["01..08"]
      description: "Hex 01-08 program number"
- id: hpr_query
  label: HD Radio Channel Program Query
  kind: query
  command: "!1HPRQSTN\r"
  params: []
- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "!1HBL{mode}\r"
  params:
    - name: mode
      type: enum
      values: ["00", "01"]
      description: "00=Auto, 01=Analog"
- id: hbl_query
  label: HD Radio Blend Mode Query
  kind: query
  command: "!1HBLQSTN\r"
  params: []
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  command: "!1HTSQSTN\r"
  params: []

# Net-Tune / Network - Main Zone
- id: ntc_set
  label: Net-Tune / Network Operation
  kind: action
  command: "!1NTC{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN", "CHUP", "CHDN"]
      description: "FF/REW must be sent continuously with ≤100ms delay between codes"
  # No QSTN per source; responses are info commands below
- id: nat_query
  label: Net/USB Artist Name Query
  kind: query
  command: "!1NATQSTN\r"
  params: []
- id: nal_query
  label: Net/USB Album Name Query
  kind: query
  command: "!1NALQSTN\r"
  params: []
- id: nti_query
  label: Net/USB Title Query
  kind: query
  command: "!1NTIQSTN\r"
  params: []
- id: ntm_query
  label: Net/USB Time Info Query
  kind: query
  command: "!1NTMQSTN\r"
  params: []
- id: ntr_query
  label: Net/USB Track Info Query
  kind: query
  command: "!1NTRQSTN\r"
  params: []
- id: nst_query
  label: Net/USB Play Status Query
  kind: query
  command: "!1NSTQSTN\r"
  params: []
- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "!1NPR{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28"]
      description: "Hex 01-28 (1-40)"
  # No QSTN per source

# ONKYO RI System - Main Zone
- id: ccd_set
  label: CD Player Operation (RI)
  kind: action
  command: "!1CCD{key}\r"
  params:
    - name: key
      type: enum
      values: ["POWER", "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON"]
  # No QSTN per source
- id: ct1_set
  label: Tape1 (A) Operation (RI)
  kind: action
  command: "!1CT1{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
  # No QSTN per source
- id: ct2_set
  label: Tape2 (B) Operation (RI)
  kind: action
  command: "!1CT2{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
  # No QSTN per source
- id: ceq_set
  label: Graphics Equalizer Operation (RI)
  kind: action
  command: "!1CEQ{key}\r"
  params:
    - name: key
      type: enum
      values: ["POWER", "PRESET"]
  # No QSTN per source
- id: cdt_set
  label: DAT Recorder Operation (RI)
  kind: action
  command: "!1CDT{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
  # No QSTN per source
- id: cdv_set
  label: DVD Player Operation (RI)
  kind: action
  command: "!1CDV{key}\r"
  params:
    - name: key
      type: enum
      values: ["POWER", "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"]
  # No QSTN per source
- id: cmd_set
  label: MD Recorder Operation (RI)
  kind: action
  command: "!1CMD{key}\r"
  params:
    - name: key
      type: enum
      values: ["POWER", "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY"]
  # No QSTN per source
- id: ccr_set
  label: CD-R Recorder Operation (RI)
  kind: action
  command: "!1CCR{key}\r"
  params:
    - name: key
      type: enum
      values: ["POWER", "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"]
  # No QSTN per source

# Zone 2
- id: zpw_set
  label: Zone 2 Power
  kind: action
  command: "!1ZPW{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
- id: zpw_query
  label: Zone 2 Power Query
  kind: query
  command: "!1ZPWQSTN\r"
  params: []
- id: zmt_set
  label: Zone 2 Muting
  kind: action
  command: "!1ZMT{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "TG"]
- id: zmt_query
  label: Zone 2 Muting Query
  kind: query
  command: "!1ZMTQSTN\r"
  params: []
- id: zvl_set
  label: Zone 2 Volume
  kind: action
  command: "!1ZVL{level}\r"
  params:
    - name: level
      type: enum
      values: ["00..64", "00..50", "UP", "DOWN"]
- id: zvl_query
  label: Zone 2 Volume Query
  kind: query
  command: "!1ZVLQSTN\r"
  params: []
- id: ztn_set
  label: Zone 2 Tone
  kind: action
  command: "!1ZTN{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: ztn_query
  label: Zone 2 Tone Query
  kind: query
  command: "!1ZTNQSTN\r"
  params: []
- id: zbl_set
  label: Zone 2 Balance
  kind: action
  command: "!1ZBL{value}\r"
  params:
    - name: value
      type: enum
      values: ["xx", "UP", "DOWN"]
      description: "xx=hex balance, UP/DOWN=2-step toward R/L"
- id: zbl_query
  label: Zone 2 Balance Query
  kind: query
  command: "!1ZBLQSTN\r"
  params: []
- id: slz_set
  label: Zone 2 Input Selector
  kind: action
  command: "!1SLZ{input}\r"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]
      description: "Same as SLI minus UP/DOWN; 80=Source (follows main)"
- id: slz_query
  label: Zone 2 Input Query
  kind: query
  command: "!1SLZQSTN\r"
  params: []
- id: tuz_set
  label: Zone 2 Tuning (separate control)
  kind: action
  command: "!1TUZ{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency"
- id: tuz_query
  label: Zone 2 Tuning Query (separate)
  kind: query
  command: "!1TUZQSTN\r"
  params: []
- id: prz_set
  label: Zone 2 Preset Recall (separate control)
  kind: action
  command: "!1PRZ{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28", "01..1E", "UP", "DOWN"]
- id: prz_query
  label: Zone 2 Preset Query (separate)
  kind: query
  command: "!1PRZQSTN\r"
  params: []
- id: ntz_set
  label: Zone 2 Net-Tune Operation (Network model)
  kind: action
  command: "!1NTZ{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
  # No QSTN per source
- id: npz_set
  label: Zone 2 Internet Radio Preset (Network model)
  kind: action
  command: "!1NPZ{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28"]
  # No QSTN per source

# Zone 3
- id: pw3_set
  label: Zone 3 Power
  kind: action
  command: "!1PW3{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
- id: pw3_query
  label: Zone 3 Power Query
  kind: query
  command: "!1PW3QSTN\r"
  params: []
- id: mt3_set
  label: Zone 3 Muting
  kind: action
  command: "!1MT3{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "TG"]
- id: mt3_query
  label: Zone 3 Muting Query
  kind: query
  command: "!1MT3QSTN\r"
  params: []
- id: vl3_set
  label: Zone 3 Volume
  kind: action
  command: "!1VL3{level}\r"
  params:
    - name: level
      type: enum
      values: ["00..64", "00..50", "UP", "DOWN"]
- id: vl3_query
  label: Zone 3 Volume Query
  kind: query
  command: "!1VL3QSTN\r"
  params: []
- id: tn3_set
  label: Zone 3 Tone
  kind: action
  command: "!1TN3{param}\r"
  params:
    - name: param
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"
- id: tn3_query
  label: Zone 3 Tone Query
  kind: query
  command: "!1TN3QSTN\r"
  params: []
- id: bl3_set
  label: Zone 3 Balance
  kind: action
  command: "!1BL3{value}\r"
  params:
    - name: value
      type: enum
      values: ["xx", "UP", "DOWN"]
- id: bl3_query
  label: Zone 3 Balance Query
  kind: query
  command: "!1BL3QSTN\r"
  params: []
- id: sl3_set
  label: Zone 3 Input Selector
  kind: action
  command: "!1SL3{input}\r"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]
- id: sl3_query
  label: Zone 3 Input Query
  kind: query
  command: "!1SL3QSTN\r"
  params: []
- id: tu3_set
  label: Zone 3 Tuning (separate control)
  kind: action
  command: "!1TU3{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency"
- id: tu3_query
  label: Zone 3 Tuning Query (separate)
  kind: query
  command: "!1TU3QSTN\r"
  params: []
- id: pr3_set
  label: Zone 3 Preset Recall (separate control)
  kind: action
  command: "!1PR3{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28", "01..1E", "UP", "DOWN"]
- id: pr3_query
  label: Zone 3 Preset Query (separate)
  kind: query
  command: "!1PR3QSTN\r"
  params: []
- id: nt3_set
  label: Zone 3 Net-Tune Operation (Network model)
  kind: action
  command: "!1NT3{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
  # No QSTN per source
- id: np3_set
  label: Zone 3 Internet Radio Preset (Network model)
  kind: action
  command: "!1NP3{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28"]
  # No QSTN per source

# Zone 4
- id: pw4_set
  label: Zone 4 Power
  kind: action
  command: "!1PW4{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01"]
- id: pw4_query
  label: Zone 4 Power Query
  kind: query
  command: "!1PW4QSTN\r"
  params: []
- id: mt4_set
  label: Zone 4 Muting
  kind: action
  command: "!1MT4{state}\r"
  params:
    - name: state
      type: enum
      values: ["00", "01", "TG"]
- id: mt4_query
  label: Zone 4 Muting Query
  kind: query
  command: "!1MT4QSTN\r"
  params: []
- id: vl4_set
  label: Zone 4 Volume
  kind: action
  command: "!1VL4{level}\r"
  params:
    - name: level
      type: enum
      values: ["00..64", "00..50", "UP", "DOWN"]
- id: vl4_query
  label: Zone 4 Volume Query
  kind: query
  command: "!1VL4QSTN\r"
  params: []
- id: sl4_set
  label: Zone 4 Input Selector
  kind: action
  command: "!1SL4{input}\r"
  params:
    - name: input
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]
- id: sl4_query
  label: Zone 4 Input Query
  kind: query
  command: "!1SL4QSTN\r"
  params: []
- id: tu4_set
  label: Zone 4 Tuning (separate control)
  kind: action
  command: "!1TU4{freq}\r"
  params:
    - name: freq
      type: string
      description: "nnnnn frequency"
- id: tu4_query
  label: Zone 4 Tuning Query (separate)
  kind: query
  command: "!1TU4QSTN\r"
  params: []
- id: pr4_set
  label: Zone 4 Preset Recall (separate control)
  kind: action
  command: "!1PR4{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28", "01..1E", "UP", "DOWN"]
- id: pr4_query
  label: Zone 4 Preset Query (separate)
  kind: query
  command: "!1PR4QSTN\r"
  params: []
- id: nt4_set
  label: Zone 4 Net-Tune Operation (Network model)
  kind: action
  command: "!1NT4{key}\r"
  params:
    - name: key
      type: enum
      values: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
  # No QSTN per source
- id: np4_set
  label: Zone 4 Internet Radio Preset (Network model)
  kind: action
  command: "!1NP4{num}\r"
  params:
    - name: num
      type: enum
      values: ["01..28"]
  # No QSTN per source

# Dock (via RI)
- id: cds_set
  label: Docking Station Operation (via RI)
  kind: action
  command: "!1CDS{key}\r"
  params:
    - name: key
      type: enum
      values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
  # No QSTN per source
```

## Feedbacks
```yaml
# Each QSTN query action above returns a value. Representative high-value feedbacks:
- id: power_state
  type: enum
  values: ["00", "01"]
  description: "PWRQSTN returns 00=Standby, 01=On (via SST status envelope)"
- id: master_volume
  type: integer
  description: "MVLQSTN returns hex 00-64 (0-100) or 00-50 (0-80) per model"
- id: input_selector
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32"]
  description: "SLIQSTN returns current input code"
- id: hd_radio_tuner_status
  type: string
  description: "HTSQSTN returns mmnnoo: mm=HD flag (00/01), nn=current program 01-08, oo=8-bit hex bitmap of receivable programs"
- id: net_usb_play_status
  type: string
  description: "NSTQSTN returns 3 letters: play status (S/P/p/F/R), repeat status (-/R/F/1)"
- id: audio_info
  type: string
  description: "IFAQSTN returns nnnnn:nnnnn comma-separated info; populated by DIF02"
- id: video_info
  type: string
  description: "IFVQSTN returns nnnnn:nnnnn comma-separated info; populated by DIF03"
# UNRESOLVED: full response envelope for each QSTN not enumerated in source; receivers echo the request mnemonic in the status response.
```

## Variables
```yaml
- id: dimmer_level
  type: enum
  values: ["00", "01", "02", "03", "08"]
  description: "DIMQSTN: 00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright+LED Off"
- id: monitor_out_resolution
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07"]
  description: "RESQSTN: 00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"
- id: hdmi_output
  type: enum
  values: ["00", "01", "02", "03", "04", "05"]
  description: "HDOQSTN: HDMI output routing"
- id: listening_mode
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "11", "12", "13", "14", "15", "16", "40", "41", "42", "43", "44", "45", "50", "51", "52", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7"]
  description: "LMDQSTN returns current listening mode code"
- id: sleep_timer
  type: string
  description: "SLPQSTN returns hex minutes remaining (01-5A) or OFF"
- id: recout_selector
  type: enum
  values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
  description: "SLRQSTN: 7F=Off, 80=Source (follows main)"
# UNRESOLVED: tone control returns (TFRQSTN etc.) are composite BxxTxx strings; the value space is not fully enumerated.
```

## Events
```yaml
# Receiver pushes unsolicited status messages when state changes. Status messages
# share the form `!1<CMD><VALUE>[EOF]` (or with [EOF][CR] / [EOF][CR][LF] per model).
# Examples: power transition → !1SST00[EOF] (Standby) or !1SST01[EOF] (On);
# input change → !1SLI03[EOF]; volume change → !1MVL32[EOF].
# UNRESOLVED: complete list of unsolicited status mnemonics and trigger conditions not stated in source.
# UNRESOLVED: eISCP connection model requires persistent TCP connection; unsolicited notices are dropped if connection is not held continuously.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
Protocol is bidirectional ASCII over 3-wire RS-232C (9600 8N1, no flow control) or wrapped in a 16-byte eISCP header over TCP. All commands are 3 uppercase letters (mnemonic) + variable-length parameter. Wrap-around commands (`UP`/`DOWN`/`TG`) cycle through values without overflow.

eISCP framing detail: 4-byte ASCII `"ISCP"` + 4-byte big-endian Header Size (0x00000010 = 16) + 4-byte big-endian Data Size + 1-byte Version (0x01) + 3-byte Reserved (0x000000) = 16 bytes header, followed by the ISCP message (`!1<CMD><PARAMS>` + terminator).

Timing: 50 msec minimum interval between messages; receiver responds within 50 msec. eISCP FF/REW (NTC) must be sent continuously with no more than 100 msec between codes.

Model variants: many commands are conditional on hardware (RDS, XM, SIRIUS, HD Radio, Net-Tune, Network). Commands marked "(Network Model Only after TX-NR905)" or "(RDS Model Only)" require the corresponding feature on the target receiver. Some commands carry the same mnemonic but different behavior per model (e.g. DIF display info vs display mode; RAS Re-EQ/Academy/Cinema variants).

Shared vs separate zone control: TUN, PRS, NTC are shared between MAIN and ZONE — zone can read main state. Separate-control variants use distinct mnemonics (TUZ/PRZ/NTZ for Zone 2, TU3/PR3/NT3 for Zone 3, TU4/PR4/NT4 for Zone 4).

12V triggers TGA/TGB/TGC are only controllable when the corresponding Setup Menu trigger parameter is "OFF".

XM channel number is 3-digit decimal (000-255) and tuning frequency is 5-digit with leading zeros for XM channels.

RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR) forward to Onkyo RI-connected legacy devices, not the receiver itself.

<!-- UNRESOLVED: full receiver model list covered by this protocol not enumerated in source; protocol applies to Integra DTR series generically with model-specific feature availability. -->
<!-- UNRESOLVED: complete set of unsolicited status response mnemonics and trigger conditions not stated in source. -->
<!-- UNRESOLVED: eISCP keepalive / connection management behavior not documented beyond "must hold connection continuously". -->

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-06-02T04:20:01.745Z
last_checked_at: 2026-06-02T04:20:01.745Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:20:01.745Z
matched_actions: 176
action_count: 176
confidence: medium
summary: "All 176 spec actions matched against source; transport parameters verified; coverage ratio 176 mnemonics exceeds 0.9 floor. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific DTR model numbers in the series not enumerated in source; source describes protocol generically for the family."
- "older-model DIF and current DIF (display mode) share mnemonic; semantics differ by model"
- "full response envelope for each QSTN not enumerated in source; receivers echo the request mnemonic in the status response."
- "tone control returns (TFRQSTN etc.) are composite BxxTxx strings; the value space is not fully enumerated."
- "complete list of unsolicited status mnemonics and trigger conditions not stated in source."
- "eISCP connection model requires persistent TCP connection; unsolicited notices are dropped if connection is not held continuously."
- "no multi-step sequences documented in source."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "full receiver model list covered by this protocol not enumerated in source; protocol applies to Integra DTR series generically with model-specific feature availability."
- "complete set of unsolicited status response mnemonics and trigger conditions not stated in source."
- "eISCP keepalive / connection management behavior not documented beyond \"must hold connection continuously\"."
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
