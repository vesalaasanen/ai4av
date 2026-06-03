---
spec_id: admin/onkyo-tx-rz-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-RZ Series Control Spec"
manufacturer: Onkyo
model_family: "Onkyo TX-RZ Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "Onkyo TX-RZ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-06-02T03:58:12.590Z
last_checked_at: 2026-06-02T17:23:36.702Z
generated_at: 2026-06-02T17:23:36.702Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source document is the Integra ISCP v1.15 spec (Aug 2009) and predates the TX-RZ series; coverage of TX-RZ-specific features (e.g. newer streaming services, Dolby Atmos, DTS:X) is not stated in source."
  - "source does not document a \"Variables\" section distinct from"
  - "source does not document discrete multi-step macro sequences."
  - "source does not document safety warnings, interlock procedures,"
  - "TX-RZ-specific features (Dolby Atmos, DTS:X, AirPlay 2, Chromecast, voice assistants, newer network streaming) and any post-v1.15 ISCP extensions are not stated in source."
  - "RI dock (CDS) command set is described as having \"DOCK\" sub-keys; full enumeration in source is truncated at \"DOWN CURSOR DOWN Key\" and may continue beyond."
  - "eISCP packet size limits and maximum ISCP message length are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:36.702Z
  matched_actions: 175
  action_count: 175
  confidence: medium
  summary: "All 175 spec actions matched literally to ISCP v1.15 source; transport parameters verified; bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Onkyo TX-RZ Series Control Spec

## Summary
Control spec for Onkyo TX-RZ Series AV receivers, using Onkyo's Integra Serial Control Protocol (ISCP v1.15) over RS-232C (3-wire, 9600 baud) and eISCP over Ethernet (TCP, default port 60128). The protocol is point-to-point, ASCII-text framed, with three-character command mnemonics prefixed by `!1` (receiver unit type) and terminated by CR / LF / EOF depending on transport.

<!-- UNRESOLVED: the source document is the Integra ISCP v1.15 spec (Aug 2009) and predates the TX-RZ series; coverage of TX-RZ-specific features (e.g. newer streaming services, Dolby Atmos, DTS:X) is not stated in source. -->

## Transport
```yaml
# RS-232C and TCP/eISCP are both documented; the user-declared protocol is RS-232C.
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 60128  # eISCP default; configurable 49152-65535 per setup menu
  connector: "DB9 female (pin 2 TX, pin 3 RX, pin 5 GND); use straight-thru cable"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWR / ZPW / PW3 / PW4 power commands
- routable        # SLI / SLR / ZSL / SL3 / SL4 / HDO input & output selectors
- queryable       # every command supports QSTN status query
- levelable       # MVL / ZVL / VL3 / VL4 / tone / subwoofer / center levels
```

## Actions
```yaml
# Each entry below corresponds to one ISCP command mnemonic documented in the
# source. The `command` field shows the literal on-the-wire ASCII payload,
# including the `!1` (receiver unit-type) prefix, the 3-character opcode, and
# any parameter placeholder. Wrap-around (UP/DOWN/TG) and QSTN-query variants
# are emitted as separate actions where the source lists them as distinct rows.

# --- Main Zone: Amplifier ---
- id: pwr_set
  label: System Power
  kind: action
  command: "!1PWR{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = System Standby, 01 = System On'
- id: pwr_query
  label: System Power Status
  kind: query
  command: "!1PWRQSTN"
  params: []
- id: amt_set
  label: Audio Muting
  kind: action
  command: "!1AMT{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG"]
      description: '00 = Off, 01 = On, TG = wrap-around toggle'
- id: amt_query
  label: Audio Muting Status
  kind: query
  command: "!1AMTQSTN"
  params: []
- id: spa_set
  label: Speaker A
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Off, 01 = On, UP = wrap-around. SPA=MAIN A or Front A.'
- id: spa_query
  label: Speaker A Status
  kind: query
  command: "!1SPAQSTN"
  params: []
- id: spb_set
  label: Speaker B
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Off, 01 = On, UP = wrap-around. SPB=MAIN B or Front B.'
- id: spb_query
  label: Speaker B Status
  kind: query
  command: "!1SPBQSTN"
  params: []
- id: spl_set
  label: Speaker Layout
  kind: action
  command: "!1SPL{value}"
  params:
    - name: value
      type: string
      enum: ["SB", "FH", "FW", "UP"]
      description: 'SB = SurrBack, FH = Front High (or SB+FH), FW = Front Wide (or SB+FW), UP = wrap-around'
- id: spl_query
  label: Speaker Layout Status
  kind: query
  command: "!1SPLQSTN"
  params: []
- id: mvl_set
  label: Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: string
      enum: ["00..64", "00..50", "UP", "DOWN", "UP1", "DOWN1"]
      description: '00-64 hex = level 0-100, 00-50 hex = level 0-80, UP/DOWN = step, UP1/DOWN1 = 1dB step'
- id: mvl_query
  label: Master Volume Status
  kind: query
  command: "!1MVLQSTN"
  params: []
- id: tfr_set
  label: Tone (Front)
  kind: action
  command: "!1TFR{param}"
  params:
    - name: param
      type: string
      description: 'Bxx (Front Bass, xx -A..00..+A in 2-step [-10..+10]), Txx (Front Treble), BUP/BUP,BDOWN/TDOWN,TDOWN'
- id: tfr_query
  label: Front Tone Status
  kind: query
  command: "!1TFRQSTN"
  params: []
- id: tfw_set
  label: Tone (Front Wide)
  kind: action
  command: "!1TFW{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN (same shape as TFR)'
- id: tfw_query
  label: Front Wide Tone Status
  kind: query
  command: "!1TFWQSTN"
  params: []
- id: tfh_set
  label: Tone (Front High)
  kind: action
  command: "!1TFH{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN'
- id: tfh_query
  label: Front High Tone Status
  kind: query
  command: "!1TFHQSTN"
  params: []
- id: tct_set
  label: Tone (Center)
  kind: action
  command: "!1TCT{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN'
- id: tct_query
  label: Center Tone Status
  kind: query
  command: "!1TCTQSTN"
  params: []
- id: tsr_set
  label: Tone (Surround)
  kind: action
  command: "!1TSR{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN'
- id: tsr_query
  label: Surround Tone Status
  kind: query
  command: "!1TSRQSTN"
  params: []
- id: tsb_set
  label: Tone (Surround Back)
  kind: action
  command: "!1TSB{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, Txx, BUP, BDOWN, TUP, TDOWN'
- id: tsb_query
  label: Surround Back Tone Status
  kind: query
  command: "!1TSBQSTN"
  params: []
- id: tsw_set
  label: Tone (Subwoofer)
  kind: action
  command: "!1TSW{param}"
  params:
    - name: param
      type: string
      description: 'Bxx, BUP, BDOWN (subwoofer has no Treble row)'
- id: tsw_query
  label: Subwoofer Tone Status
  kind: query
  command: "!1TSWQSTN"
  params: []
- id: slp_set
  label: Sleep Timer
  kind: action
  command: "!1SLP{value}"
  params:
    - name: value
      type: string
      enum: ["01..5A", "OFF", "UP"]
      description: '01-5A hex = 1-90 min, OFF, UP = wrap-around'
- id: slp_query
  label: Sleep Timer Status
  kind: query
  command: "!1SLPQSTN"
  params: []
- id: slc_set
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{key}"
  params:
    - name: key
      type: string
      enum: ["TEST", "CHSEL", "UP", "DOWN"]
      description: 'TEST key, CHSEL key, LEVEL+ (UP), LEVEL- (DOWN)'
- id: swl_set
  label: Subwoofer (temporary) Level
  kind: action
  command: "!1SWL{level}"
  params:
    - name: level
      type: string
      enum: ["-F..00..+C", "UP", "DOWN"]
      description: '-F to +C hex = -15dB to +12dB; UP/DOWN = level keys'
- id: swl_query
  label: Subwoofer Level Status
  kind: query
  command: "!1SWLQSTN"
  params: []
- id: ctl_set
  label: Center (temporary) Level
  kind: action
  command: "!1CTL{level}"
  params:
    - name: level
      type: string
      enum: ["-C..00..+C", "UP", "DOWN"]
      description: '-C to +C hex = -12dB to +12dB; UP/DOWN = level keys'
- id: ctl_query
  label: Center Level Status
  kind: query
  command: "!1CTLQSTN"
  params: []
- id: dif_info_set
  label: Display Information
  kind: action
  command: "!1DIF{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04"]
      description: '00 = Program Format, 01 = Digital Input, 02 = Digital Format, 03 = Bass, 04 = Treble'
- id: dif_mode_set
  label: Display Mode
  kind: action
  command: "!1DIF{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "TG", "UP"]
      description: '00 = Selector+Volume, 01 = Selector+Listening Mode, 02 = Digital Format (temp), 03 = Video Format (temp), TG/UP = wrap-around'
- id: dif_mode_query
  label: Display Mode Status
  kind: query
  command: "!1DIFQSTN"
  params: []
- id: dim_set
  label: Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: string
      enum: ["00", "01", "02", "03", "08", "DIM"]
      description: '00 = Bright, 01 = Dim, 02 = Dark, 03 = Shut-Off, 08 = Bright & LED OFF, DIM = wrap-around'
- id: dim_query
  label: Dimmer Level Status
  kind: query
  command: "!1DIMQSTN"
  params: []
- id: osd_set
  label: Setup Operation (OSD)
  kind: action
  command: "!1OSD{key}"
  params:
    - name: key
      type: string
      enum: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]
      description: On-screen menu navigation keys
- id: mem_set
  label: Memory Setup
  kind: action
  command: "!1MEM{op}"
  params:
    - name: op
      type: string
      enum: ["STR", "RCL", "LOCK", "UNLK"]
      description: 'STR = store, RCL = recall, LOCK, UNLK = memory lock state'
- id: ifa_query
  label: Audio Information
  kind: query
  command: "!1IFAQSTN"
  params: []
  notes: 'Response format: "nnnnn:nnnnn" (CSV), same as immediate display. Sent after DIF02.'
- id: ifv_query
  label: Video Information
  kind: query
  command: "!1IFVQSTN"
  params: []
  notes: 'Response format: "nnnnn:nnnnn" (CSV), same as immediate display. Sent after DIF03.'

# --- Main Zone: Unit / Input / Output ---
- id: sli_set
  label: Input Selector
  kind: action
  command: "!1SLI{source}"
  params:
    - name: source
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "30", "31", "32", "40", "UP", "DOWN"]
      description: '00-06 = VIDEO1-7, 10 = DVD, 20 = TAPE1/TV, 21 = TAPE2, 22 = PHONO, 23 = CD, 24 = FM, 25 = AM, 26 = TUNER, 27 = MUSIC SERVER, 28 = INTERNET RADIO, 29 = USB front, 2A = USB rear, 30 = MULTI CH, 31 = XM, 32 = SIRIUS, 40 = Universal PORT, UP/DOWN = wrap-around'
- id: sli_query
  label: Input Selector Status
  kind: query
  command: "!1SLIQSTN"
  params: []
- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "!1SLR{source}"
  params:
    - name: source
      type: string
      enum: ["00..06", "10", "20..28", "30", "31", "7F", "80"]
      description: '00-06 = VIDEO1-7, 10 = DVD, 20-28 = TAPE1/2/PHONO/CD/FM/AM/TUNER/MUSIC SERVER/INTERNET RADIO, 30 = MULTI CH, 31 = XM, 7F = OFF, 80 = SOURCE (follows main)'
- id: slr_query
  label: RECOUT Selector Status
  kind: query
  command: "!1SLRQSTN"
  params: []
- id: sla_set
  label: Audio Selector
  kind: action
  command: "!1SLA{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "UP"]
      description: '00 = AUTO, 01 = MULTI-CHANNEL, 02 = ANALOG, 03 = iLINK, 04 = HDMI, 05 = COAX/OPT, 06 = BALANCE, UP = wrap-around'
- id: sla_query
  label: Audio Selector Status
  kind: query
  command: "!1SLAQSTN"
  params: []
- id: tga_set
  label: 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Off, 01 = On'
- id: tgb_set
  label: 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Off, 01 = On'
- id: tgc_set
  label: 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Off, 01 = On. TGA/TGB/TGC available only when each 12V Trigger parameter is "OFF" at Setup Menu.'
- id: vos_set
  label: Video Output Selector (Japanese Model Only)
  kind: action
  command: "!1VOS{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01"]
      description: '00 = D4, 01 = Component'
- id: vos_query
  label: Video Output Selector Status
  kind: query
  command: "!1VOSQSTN"
  params: []
- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "!1HDO{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "UP"]
      description: '00 = No/Analog, 01 = Yes/Main, 02 = Sub, 03 = Both, 04 = Both(Main), 05 = Both(Sub), UP = wrap-around'
- id: hdo_query
  label: HDMI Output Selector Status
  kind: query
  command: "!1HDOQSTN"
  params: []
- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "!1RES{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "07", "UP"]
      description: '00 = Through, 01 = Auto (HDMI only), 02 = 480p, 03 = 720p, 04 = 1080i, 05 = 1080p (HDMI only), 06 = Source, 07 = 1080p/24fs (HDMI only), UP = wrap-around'
- id: res_query
  label: Monitor Out Resolution Status
  kind: query
  command: "!1RESQSTN"
  params: []
- id: isf_set
  label: ISF Mode
  kind: action
  command: "!1ISF{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "UP"]
      description: '00 = Custom, 01 = Day, 02 = Night, UP = wrap-around'
- id: isf_query
  label: ISF Mode Status
  kind: query
  command: "!1ISFQSTN"
  params: []

# --- Main Zone: Surround ---
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "11", "12", "13", "14", "15", "16", "40", "41", "42", "43", "44", "45", "50", "51", "52", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8A", "8B", "8C", "8D", "8E", "8F", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "UP", "DOWN", "MOVIE", "MUSIC", "GAME"]
      description: '00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM/Game-RPG, 04=THX, 05=ACTION/Game-Action, 06=MUSICAL/Game-Rock, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7/Game-Sports, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch/Straight Decode, 41=Dolby EX/DTS ES, 42-45=THX Cinema/Surround EX/Music/Games, 50-52=U2/S2 Cinema/Music/Games, 80-8F=PLII/PLIIx/Neo:6/Neural variants, 90-99=PLIIz Height variants, A0-A7=PLIIx+Audyssey DSX variants, UP/DOWN/MOVIE/MUSIC/GAME = wrap-around'
- id: lmd_query
  label: Listening Mode Status
  kind: query
  command: "!1LMDQSTN"
  params: []
- id: ltn_set
  label: Late Night
  kind: action
  command: "!1LTN{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "UP"]
      description: '00 = Off, 01 = Low(DD)/On(TrueHD), 02 = High(DD)/On(TrueHD), 03 = Auto(TrueHD), UP = wrap-around'
- id: ltn_query
  label: Late Night Status
  kind: query
  command: "!1LTNQSTN"
  params: []
- id: ras_reaq_academy_set
  label: Re-EQ / Academy Filter
  kind: action
  command: "!1RAS{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "UP"]
      description: '00 = Both Off, 01 = Re-EQ On, 02 = Academy On, UP = wrap-around'
- id: ras_reaq_academy_query
  label: Re-EQ / Academy State
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ras_reaq_set
  label: Re-EQ
  kind: action
  command: "!1RAS{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Re-EQ Off, 01 = Re-EQ On, UP = wrap-around'
- id: ras_reaq_query
  label: Re-EQ State
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ras_cinema_set
  label: Cinema Filter
  kind: action
  command: "!1RAS{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Cinema Filter Off, 01 = Cinema Filter On, UP = wrap-around'
- id: ras_cinema_query
  label: Cinema Filter State
  kind: query
  command: "!1RASQSTN"
  params: []
- id: ady_set
  label: Audyssey 2EQ / MultEQ / MultEQ XT
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Off, 01 = On, UP = wrap-around'
- id: ady_query
  label: Audyssey 2EQ/MultEQ State
  kind: query
  command: "!1ADYQSTN"
  params: []
- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Off, 01 = On, UP = wrap-around'
- id: adq_query
  label: Audyssey Dynamic EQ State
  kind: query
  command: "!1ADQQSTN"
  params: []
- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "UP"]
      description: '00 = Off, 01 = Light, 02 = Medium, 03 = Heavy, UP = wrap-around'
- id: adv_query
  label: Audyssey Dynamic Volume State
  kind: query
  command: "!1ADVQSTN"
  params: []
- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "!1DVL{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "03", "UP"]
      description: '00 = Off, 01 = Low, 02 = Mid, 03 = High, UP = wrap-around'
- id: dvl_query
  label: Dolby Volume State
  kind: query
  command: "!1DVLQSTN"
  params: []
- id: mot_set
  label: Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "UP"]
      description: '00 = Off, 01 = On, UP = wrap-around'
- id: mot_query
  label: Music Optimizer State
  kind: query
  command: "!1MOTQSTN"
  params: []

# --- Main Zone: Tuner ---
- id: tun_set
  label: Tuning (Main)
  kind: action
  command: "!1TUN{freq}"
  params:
    - name: freq
      type: string
      enum: ["nnnnn", "UP", "DOWN"]
      description: 'nnnnn = FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch (XM: leading 00); UP/DOWN = wrap-around. TUNER function shared by MAIN and ZONE side.'
- id: tun_query
  label: Tuning Frequency Status
  kind: query
  command: "!1TUNQSTN"
  params: []
- id: prs_set
  label: Preset
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28", "01..1E", "UP", "DOWN"]
      description: '01-28 hex = preset 1-40, 01-1E hex = preset 1-30, UP/DOWN = wrap-around'
- id: prs_query
  label: Preset Status
  kind: query
  command: "!1PRSQSTN"
  params: []
- id: prm_set
  label: Preset Memory
  kind: action
  command: "!1PRM{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28", "01..1E"]
      description: '01-28 hex = store preset 1-40, 01-1E hex = store preset 1-30'
- id: rds_set
  label: RDS Information Display
  kind: action
  command: "!1RDS{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01", "02", "UP"]
      description: '00 = RT, 01 = PTY, 02 = TP, UP = wrap-around. RBDS models: RT only.'
- id: pts_set
  label: PTY Scan
  kind: action
  command: "!1PTS{value}"
  params:
    - name: value
      type: string
      enum: ["00..1E", "ENTER"]
      description: '00-1E hex = PTY number 0-30; ENTER = finish PTY scan'
- id: tps_set
  label: TP Scan
  kind: action
  command: "!1TPS{value}"
  params:
    - name: value
      type: string
      enum: ["", "ENTER"]
      description: 'Empty parameter = start TP scan, ENTER = finish TP scan'
- id: xcn_query
  label: XM Channel Name
  kind: query
  command: "!1XCNQSTN"
  params: []
- id: xat_query
  label: XM Artist Name
  kind: query
  command: "!1XATQSTN"
  params: []
- id: xti_query
  label: XM Title
  kind: query
  command: "!1XTIQSTN"
  params: []
- id: xch_set
  label: XM Channel Number
  kind: action
  command: "!1XCH{channel}"
  params:
    - name: channel
      type: string
      enum: ["000..255", "UP", "DOWN"]
      description: '000-255 = XM channel, UP/DOWN = wrap-around'
- id: xch_query
  label: XM Channel Number Status
  kind: query
  command: "!1XCHQSTN"
  params: []
- id: xct_set
  label: XM Category
  kind: action
  command: "!1XCT{category}"
  params:
    - name: category
      type: string
      enum: ["nnnnnnnnnn", "UP", "DOWN"]
      description: 'nnnnnnnnnn = XM category info, UP/DOWN = wrap-around'
- id: xct_query
  label: XM Category Status
  kind: query
  command: "!1XCTQSTN"
  params: []
- id: scn_query
  label: SIRIUS Channel Name
  kind: query
  command: "!1SCNQSTN"
  params: []
- id: sat_query
  label: SIRIUS Artist Name
  kind: query
  command: "!1SATQSTN"
  params: []
- id: sti_query
  label: SIRIUS Title
  kind: query
  command: "!1STIQSTN"
  params: []
- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "!1SCH{channel}"
  params:
    - name: channel
      type: string
      enum: ["000..255", "UP", "DOWN"]
      description: '000-255 = SIRIUS channel, UP/DOWN = wrap-around'
- id: sch_query
  label: SIRIUS Channel Number Status
  kind: query
  command: "!1SCHQSTN"
  params: []
- id: sct_set
  label: SIRIUS Category
  kind: action
  command: "!1SCT{category}"
  params:
    - name: category
      type: string
      enum: ["nnnnnnnnnn", "UP", "DOWN"]
      description: 'nnnnnnnnnn = SIRIUS category info, UP/DOWN = wrap-around'
- id: sct_query
  label: SIRIUS Category Status
  kind: query
  command: "!1SCTQSTN"
  params: []
- id: slk_set
  label: SIRIUS Parental Lock
  kind: action
  command: "!1SLK{value}"
  params:
    - name: value
      type: string
      enum: ["nnnn", "INPUT", "WRONG"]
      description: 'nnnn = 4-digit lock password; INPUT = prompt for password; WRONG = wrong password notification'
- id: hat_query
  label: HD Radio Artist Name
  kind: query
  command: "!1HATQSTN"
  params: []
- id: hcn_query
  label: HD Radio Channel Name (Station)
  kind: query
  command: "!1HCNQSTN"
  params: []
- id: hti_query
  label: HD Radio Title
  kind: query
  command: "!1HTIQSTN"
  params: []
- id: hds_query
  label: HD Radio Detail Info
  kind: query
  command: "!1HDSQSTN"
  params: []
- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "!1HPR{program}"
  params:
    - name: program
      type: string
      enum: ["01..08"]
      description: '01-08 = HD Radio channel program number'
- id: hpr_query
  label: HD Radio Channel Program Status
  kind: query
  command: "!1HPRQSTN"
  params: []
- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "!1HBL{mode}"
  params:
    - name: mode
      type: string
      enum: ["00", "01"]
      description: '00 = Auto, 01 = Analog'
- id: hbl_query
  label: HD Radio Blend Mode Status
  kind: query
  command: "!1HBLQSTN"
  params: []
- id: hts_set
  label: HD Radio Tuner Status
  kind: action
  command: "!1HTS{status}"
  params:
    - name: status
      type: string
      description: 'mmnnoo: mm="00"(not HD)/"01"(HD); nn="01"-"08" (current program); oo = receivable programs (8-bit hex mask)'
- id: hts_query
  label: HD Radio Tuner Status Query
  kind: query
  command: "!1HTSQSTN"
  params: []

# --- Main Zone: Net-Tune / Network ---
- id: ntc_main_set
  label: Net-Tune / Network Operation (Main)
  kind: action
  command: "!1NTC{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "DELETE", "CAPS", "LOCATION", "LANGUAGE", "SETUP", "RETURN", "CHUP", "CHDN"]
      description: Net/USB media keys. FF/REW must be sent continuously with no more than 100ms between codes.
- id: nat_query
  label: Net/USB Artist Name
  kind: query
  command: "!1NATQSTN"
  params: []
- id: nal_query
  label: Net/USB Album Name
  kind: query
  command: "!1NALQSTN"
  params: []
- id: nti_query
  label: Net/USB Title Name
  kind: query
  command: "!1NTIQSTN"
  params: []
- id: ntm_query
  label: Net/USB Time Info
  kind: query
  command: "!1NTMQSTN"
  params: []
- id: ntr_query
  label: Net/USB Track Info
  kind: query
  command: "!1NTRQSTN"
  params: []
- id: nst_query
  label: Net/USB Play Status
  kind: query
  command: "!1NSTQSTN"
  params: []
- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "!1NPR{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28"]
      description: '01-28 hex = preset 1-40'

# --- ONKYO RI System: CD / Tape / EQ / DAT ---
- id: ccd_set
  label: CD Player Operation (RI)
  kind: action
  command: "!1CCD{key}"
  params:
    - name: key
      type: string
      enum: ["POWER", "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON"]
      description: RI CD player keys (power on/off, transport, disc select 1-6, numeric 0-10/+10)
- id: ct1_set
  label: TAPE1 (A) Operation (RI)
  kind: action
  command: "!1CT1{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]
      description: TAPE1(A) transport keys
- id: ct2_set
  label: TAPE2 (B) Operation (RI)
  kind: action
  command: "!1CT2{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]
      description: TAPE2(B) transport keys
- id: ceq_set
  label: Graphics Equalizer Operation (RI)
  kind: action
  command: "!1CEQ{key}"
  params:
    - name: key
      type: string
      enum: ["POWER", "PRESET"]
      description: Graphics equalizer power and preset keys
- id: cdt_set
  label: DAT Recorder Operation (RI)
  kind: action
  command: "!1CDT{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]
      description: DAT recorder transport keys

# --- ONKYO RI System: DVD ---
- id: cdv_set
  label: DVD Player Operation (RI)
  kind: action
  command: "!1CDV{key}"
  params:
    - name: key
      type: string
      enum: ["POWER", "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "0", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"]
      description: DVD player keys (power, transport, navigation, disc select, picture control, factory reset)

# --- ONKYO RI System: MD / CD-R ---
- id: cmd_set
  label: MD Recorder Operation (RI)
  kind: action
  command: "!1CMD{key}"
  params:
    - name: key
      type: string
      enum: ["POWER", "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY"]
      description: MD recorder keys
- id: ccr_set
  label: CD-R Recorder Operation (RI)
  kind: action
  command: "!1CCR{key}"
  params:
    - name: key
      type: string
      enum: ["POWER", "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10/0", "nn/nnn", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"]
      description: CD-R recorder keys

# --- Zone 2 ---
- id: zpw_set
  label: Zone 2 Power
  kind: action
  command: "!1ZPW{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Zone2 Standby, 01 = Zone2 On. Only works when main is ON.'
- id: zpw_query
  label: Zone 2 Power Status
  kind: query
  command: "!1ZPWQSTN"
  params: []
- id: zmt_set
  label: Zone 2 Muting
  kind: action
  command: "!1ZMT{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG"]
      description: '00 = Off, 01 = On, TG = wrap-around'
- id: zmt_query
  label: Zone 2 Muting Status
  kind: query
  command: "!1ZMTQSTN"
  params: []
- id: zvl_set
  label: Zone 2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      enum: ["00..64", "00..50", "UP", "DOWN"]
      description: '00-64 hex = 0-100, 00-50 hex = 0-80; UP/DOWN. Only works when main is ON.'
- id: zvl_query
  label: Zone 2 Volume Status
  kind: query
  command: "!1ZVLQSTN"
  params: []
- id: ztn_set
  label: Zone 2 Tone
  kind: action
  command: "!1ZTN{param}"
  params:
    - name: param
      type: string
      description: 'Bxx (bass -A..+A 2-step), Txx (treble), BUP,BDOWN,TUP,TDOWN. Only when main ON and Zone2 powered or variable.'
- id: ztn_query
  label: Zone 2 Tone Status
  kind: query
  command: "!1ZTNQSTN"
  params: []
- id: zbl_set
  label: Zone 2 Balance
  kind: action
  command: "!1ZBL{value}"
  params:
    - name: value
      type: string
      description: 'xx = balance, UP = to R (2 step), DOWN = to L (2 step)'
- id: zbl_query
  label: Zone 2 Balance Status
  kind: query
  command: "!1ZBLQSTN"
  params: []
- id: zsl_set
  label: Zone 2 Selector
  kind: action
  command: "!1ZSL{source}"
  params:
    - name: source
      type: string
      enum: ["00..06", "10", "20..29", "2A", "30", "31", "32", "40", "80"]
      description: '00-06 = VIDEO1-7, 10 = DVD, 20-28 = TAPE1/2/PHONO/CD/FM/AM/TUNER/MUSIC SERVER/INTERNET RADIO, 29 = USB(Front), 2A = USB(Rear), 30 = MULTI CH, 31 = XM, 32 = SIRIUS, 40 = Universal PORT, 80 = SOURCE (follows main)'
- id: zsl_query
  label: Zone 2 Selector Status
  kind: query
  command: "!1ZSLQSTN"
  params: []
- id: tu2_set
  label: Tuning (Zone 2, separate)
  kind: action
  command: "!1TU2{freq}"
  params:
    - name: freq
      type: string
      description: 'nnnnn = FM/AM/XM direct frequency. TUNER shared by MAIN and ZONE side, but Zone 2 control is separate.'
- id: tu2_query
  label: Zone 2 Tuning Status
  kind: query
  command: "!1TU2QSTN"
  params: []
- id: pr2_set
  label: Preset (Zone 2, separate)
  kind: action
  command: "!1PR2{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28", "01..1E", "UP", "DOWN"]
      description: '01-28 hex = preset 1-40, 01-1E hex = preset 1-30'
- id: pr2_query
  label: Zone 2 Preset Status
  kind: query
  command: "!1PR2QSTN"
  params: []
- id: nt2_set
  label: Net-Tune / Network Operation (Zone 2)
  kind: action
  command: "!1NT2{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: Network model only. Net-Tune/Network function shared by MAIN and ZONE side, but control is separate.
- id: np2_set
  label: Internet Radio Preset (Zone 2)
  kind: action
  command: "!1NP2{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28"]
      description: '01-28 hex = preset 1-40. Network model only.'

# --- Zone 3 ---
- id: pw3_set
  label: Zone 3 Power
  kind: action
  command: "!1PW3{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Zone3 Standby, 01 = Zone3 On'
- id: pw3_query
  label: Zone 3 Power Status
  kind: query
  command: "!1PW3QSTN"
  params: []
- id: mt3_set
  label: Zone 3 Muting
  kind: action
  command: "!1MT3{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG"]
      description: '00 = Off, 01 = On, TG = wrap-around'
- id: mt3_query
  label: Zone 3 Muting Status
  kind: query
  command: "!1MT3QSTN"
  params: []
- id: vl3_set
  label: Zone 3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      enum: ["00..64", "00..50", "UP", "DOWN"]
      description: '00-64 hex = 0-100, 00-50 hex = 0-80; UP/DOWN'
- id: vl3_query
  label: Zone 3 Volume Status
  kind: query
  command: "!1VL3QSTN"
  params: []
- id: sl3_set
  label: Zone 3 Selector
  kind: action
  command: "!1SL3{source}"
  params:
    - name: source
      type: string
      enum: ["00..06", "10", "20..29", "2A", "30", "31", "32", "40", "80"]
      description: Same source map as Zone 2; 80 = SOURCE
- id: sl3_query
  label: Zone 3 Selector Status
  kind: query
  command: "!1SL3QSTN"
  params: []
- id: tu3_set
  label: Tuning (Zone 3, separate)
  kind: action
  command: "!1TU3{freq}"
  params:
    - name: freq
      type: string
      description: 'nnnnn = FM/AM/XM direct frequency'
- id: tu3_query
  label: Zone 3 Tuning Status
  kind: query
  command: "!1TU3QSTN"
  params: []
- id: pr3_set
  label: Preset (Zone 3, separate)
  kind: action
  command: "!1PR3{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28", "01..1E", "UP", "DOWN"]
      description: '01-28 hex = preset 1-40, 01-1E hex = preset 1-30'
- id: pr3_query
  label: Zone 3 Preset Status
  kind: query
  command: "!1PR3QSTN"
  params: []
- id: nt3_set
  label: Net-Tune / Network Operation (Zone 3)
  kind: action
  command: "!1NT3{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"]
      description: Network model only. Net/USB playback transport for Zone 3.
- id: np3_set
  label: Internet Radio Preset (Zone 3)
  kind: action
  command: "!1NP3{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28"]
      description: '01-28 hex = preset 1-40. Network model only.'

# --- Zone 4 ---
- id: pw4_set
  label: Zone 4 Power
  kind: action
  command: "!1PW4{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01"]
      description: '00 = Zone4 Standby, 01 = Zone4 On'
- id: pw4_query
  label: Zone 4 Power Status
  kind: query
  command: "!1PW4QSTN"
  params: []
- id: mt4_set
  label: Zone 4 Muting
  kind: action
  command: "!1MT4{state}"
  params:
    - name: state
      type: string
      enum: ["00", "01", "TG"]
      description: '00 = Off, 01 = On, TG = wrap-around'
- id: mt4_query
  label: Zone 4 Muting Status
  kind: query
  command: "!1MT4QSTN"
  params: []
- id: vl4_set
  label: Zone 4 Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      enum: ["00..64", "00..50", "UP", "DOWN"]
      description: '00-64 hex = 0-100, 00-50 hex = 0-80; UP/DOWN'
- id: vl4_query
  label: Zone 4 Volume Status
  kind: query
  command: "!1VL4QSTN"
  params: []
- id: sl4_set
  label: Zone 4 Selector
  kind: action
  command: "!1SL4{source}"
  params:
    - name: source
      type: string
      enum: ["00..06", "10", "20..29", "2A", "30", "31", "32", "40", "80"]
      description: Same source map as Zones 2/3; 80 = SOURCE
- id: sl4_query
  label: Zone 4 Selector Status
  kind: query
  command: "!1SL4QSTN"
  params: []
- id: tu4_set
  label: Tuning (Zone 4, separate)
  kind: action
  command: "!1TU4{freq}"
  params:
    - name: freq
      type: string
      description: 'nnnnn = FM/AM/XM direct frequency'
- id: tu4_query
  label: Zone 4 Tuning Status
  kind: query
  command: "!1TU4QSTN"
  params: []
- id: pr4_set
  label: Preset (Zone 4, separate)
  kind: action
  command: "!1PR4{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28", "01..1E", "UP", "DOWN"]
      description: '01-28 hex = preset 1-40, 01-1E hex = preset 1-30'
- id: pr4_query
  label: Zone 4 Preset Status
  kind: query
  command: "!1PR4QSTN"
  params: []
- id: nt4_set
  label: Net-Tune / Network Operation (Zone 4)
  kind: action
  command: "!1NT4{key}"
  params:
    - name: key
      type: string
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN"]
      description: Network model only. Zone 4 has no CHUP/CHDN.
- id: np4_set
  label: Internet Radio Preset (Zone 4)
  kind: action
  command: "!1NP4{preset}"
  params:
    - name: preset
      type: string
      enum: ["01..28"]
      description: '01-28 hex = preset 1-40. Network model only.'

# --- Dock (via RI) ---
- id: cds_set
  label: Docking Station via RI
  kind: action
  command: "!1CDS{key}"
  params:
    - name: key
      type: string
      enum: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
      description: RI dock keys: power, transport, album/playlist/chapter nav, shuffle/repeat, mute, backlight, menu navigation
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, standby]
  source: 'PWRQSTN response (e.g. !1PWR00 = standby, !1PWR01 = on)'
- id: audio_muting
  type: enum
  values: [off, on]
  source: 'AMTQSTN response (!1AMT00 / !1AMT01)'
- id: master_volume
  type: string
  source: 'MVLQSTN response - two-char hex (00-64 = 0-100; 00-50 = 0-80)'
- id: input_selector
  type: string
  source: 'SLIQSTN response - hex source code per SLI table'
- id: listening_mode
  type: string
  source: 'LMDQSTN response - two-char hex mode code per LMD table'
- id: speaker_layout
  type: string
  source: 'SPLQSTN response - SB / FH / FW'
- id: speaker_a_state
  type: enum
  values: [off, on]
  source: 'SPAQSTN response (!1SPA00 / !1SPA01)'
- id: speaker_b_state
  type: enum
  values: [off, on]
  source: 'SPBQSTN response (!1SPB00 / !1SPB01)'
- id: dimmer_level
  type: string
  source: 'DIMQSTN response - hex 00/01/02/03/08'
- id: hdmi_output
  type: string
  source: 'HDOQSTN response - 00..05 per HDO table'
- id: monitor_resolution
  type: string
  source: 'RESQSTN response - 00..07 per RES table'
- id: late_night
  type: string
  source: 'LTNQSTN response - 00..03'
- id: dolby_volume
  type: string
  source: 'DVLQSTN response - 00..03'
- id: audyssey_state
  type: enum
  values: [off, on]
  source: 'ADYQSTN response'
- id: audyssey_dynamic_eq
  type: enum
  values: [off, on]
  source: 'ADQQSTN response'
- id: audyssey_dynamic_volume
  type: string
  source: 'ADVQSTN response - 00..03 (off/light/medium/heavy)'
- id: music_optimizer
  type: enum
  values: [off, on]
  source: 'MOTQSTN response'
- id: display_mode
  type: string
  source: 'DIFQSTN response - 00..03'
- id: zone2_power
  type: enum
  values: [off, on]
  source: 'ZPWQSTN response'
- id: zone2_muting
  type: enum
  values: [off, on]
  source: 'ZMTQSTN response'
- id: zone2_volume
  type: string
  source: 'ZVLQSTN response - hex 00-64/00-50'
- id: zone2_selector
  type: string
  source: 'ZSLQSTN response - hex source code'
- id: zone3_power
  type: enum
  values: [off, on]
  source: 'PW3QSTN response'
- id: zone3_volume
  type: string
  source: 'VL3QSTN response'
- id: zone3_selector
  type: string
  source: 'SL3QSTN response'
- id: zone4_power
  type: enum
  values: [off, on]
  source: 'PW4QSTN response'
- id: zone4_volume
  type: string
  source: 'VL4QSTN response'
- id: zone4_selector
  type: string
  source: 'SL4QSTN response'
- id: tuner_frequency
  type: string
  source: 'TUNQSTN response - 5-digit nnnnn'
- id: tuner_preset
  type: string
  source: 'PRSQSTN response - hex 01-28 / 01-1E'
- id: net_usb_status
  type: string
  source: 'NSTQSTN response - 3-letter prs code (p: S/P/p/F/R, r: -/R/F/1)'
- id: hd_radio_tuner_status
  type: string
  source: 'HTSQSTN response - 6-char mmnnoo (HD flag / current prog / receivable mask)'
- id: audio_info
  type: string
  source: 'IFAQSTN response - "nnnnn:nnnnn" CSV'
- id: video_info
  type: string
  source: 'IFVQSTN response - "nnnnn:nnnnn" CSV'
```

## Variables
```yaml
# Discrete, set-only per-zone or per-channel parameters. Discrete on/off/value
# setters are modeled as actions; this section covers values that the source
# exposes purely as QSTN-readable state without an explicit "set" row, plus
# persistent mode/state that can be polled.
# UNRESOLVED: source does not document a "Variables" section distinct from
# Actions + QSTN. The entries below are derived from the per-command QSTN
# response values documented in the Feedbacks table.
- id: master_volume
  type: integer
  range: [0, 100]
  description: MVLQSTN response; source defines 0-100 (hex 00-64) and 0-80 (hex 00-50) scales; receiver-specific.
- id: zone2_volume
  type: integer
  range: [0, 100]
  description: ZVLQSTN response; same 0-100/0-80 scale as master.
- id: zone3_volume
  type: integer
  range: [0, 100]
  description: VL3QSTN response.
- id: zone4_volume
  type: integer
  range: [0, 100]
  description: VL4QSTN response.
- id: sleep_timer_minutes
  type: integer
  range: [0, 90]
  description: SLPQSTN response; 01-5A hex = 1-90 min; 0 = OFF.
- id: subwoofer_level_db
  type: integer
  range: [-15, 12]
  description: SWLQSTN response; -F to +C hex = -15dB to +12dB.
- id: center_level_db
  type: integer
  range: [-12, 12]
  description: CTLQSTN response; -C to +C hex = -12dB to +12dB.
- id: front_tone_bass
  type: string
  description: 'TFRQSTN response - bass component of "BxxTxx"'
- id: front_tone_treble
  type: string
  description: 'TFRQSTN response - treble component of "BxxTxx"'
- id: front_wide_tone_bass
  type: string
  description: TFWQSTN response bass
- id: front_wide_tone_treble
  type: string
  description: TFWQSTN response treble
- id: front_high_tone_bass
  type: string
  description: TFHQSTN response bass
- id: front_high_tone_treble
  type: string
  description: TFHQSTN response treble
- id: center_tone_bass
  type: string
  description: TCTQSTN response bass
- id: center_tone_treble
  type: string
  description: TCTQSTN response treble
- id: surround_tone_bass
  type: string
  description: TSRQSTN response bass
- id: surround_tone_treble
  type: string
  description: TSRQSTN response treble
- id: surround_back_tone_bass
  type: string
  description: TSBQSTN response bass
- id: surround_back_tone_treble
  type: string
  description: TSBQSTN response treble
- id: subwoofer_tone
  type: string
  description: TSWQSTN response - "Bxx" only (no treble)
- id: zone2_balance
  type: string
  description: ZBLQSTN response - xx hex (no source-stated numeric scale)
- id: zone2_tone
  type: string
  description: ZTNQSTN response - "BxxTxx" (bass/treble)
- id: hd_radio_blend_mode
  type: enum
  values: [auto, analog]
  description: HBLQSTN response
- id: hd_radio_program
  type: string
  description: HPRQSTN response - 01-08
```

## Events
```yaml
# ISCP uses unsolicited status messages sent by the device on state change.
# Source describes this in section 2.3 ("Event Notice Communication") - when
# device state changes, the receiver sends a status message echoing the relevant
# command.
- id: status_message
  direction: device_to_controller
  description: >
    Any status change generates an unsolicited message with the same form as
    a status query response (e.g. SLI03 if the input selector changes to
    VIDEO3). Receiver must respond within 50ms of a state change.
  example: "!1SLI03"
  trigger: state_change
  notes: >
    Controller→Device interval must be ≥50ms. Connection is point-to-point;
    only one TCP client can connect at a time; the connection must be held
    continuously to receive status notices (eISCP).
```

## Macros
```yaml
# Multi-step sequences described explicitly in source.
# UNRESOLVED: source does not document discrete multi-step macro sequences.
# The MEM command (STR/RCL/LOCK/UNLK) is a single-step memory operation,
# not a macro definition. The wrap-around (UP/DOWN/TG) mnemonics are
# single-command behaviors, not sequences. No macro definitions found.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures,
# or power-on sequencing requirements. The only sequencing constraint stated
# is "Interval Time Receiving the message needs to take more than 50msec"
# and that the eISCP TCP connection must remain open continuously.
```

## Notes
- **ISCP framing (RS-232C):** Every message begins with `!1` (start char `!` + receiver unit type `1`) and ends with `[CR]`, `[LF]`, or `[CR][LF]`. Device-to-controller responses end with `[EOF]` (0x1A).
- **eISCP framing (TCP):** The ISCP message is wrapped in a 16-byte header. Header is `"ISCP"` (4 bytes ASCII) + Header Size (4 bytes big-endian, currently `0x00000010`) + Data Size (4 bytes big-endian) + Version (1 byte, `0x01`) + Reserved (3 bytes, `0x000000`). ISCP end-character over eISCP is `[EOF]` (and optionally `[EOF][CR]` or `[EOF][CR][LF]` depending on model).
- **Unit type:** Source defines "1" for receivers. Other Onkyo/Integra devices use other unit-type codes — out of scope here.
- **Command/Question/Notification:** Three message types. Command (`!1CMD{param}`) for control; Question (`!1CMDQSTN`) for state read; Notification (unsolicited `!1CMD{value}`) for state change. Receiver responds within 50ms; otherwise the communication has failed.
- **TUN/PRS shared semantics:** The TUNER and NET-TUNE/NETWORK functions are shared between MAIN and ZONE sides. The `TUN`/`PRS`/`NTC` commands are shared; the `TU2`/`TU3`/`TU4`/`PR2`/`PR3`/`PR4`/`NT2`/`NT3`/`NT4` variants provide independent Zone 2/3/4 control. The `NTC` command with `z`-suffixed parameters (`PLAYz`, `STOPz`, etc.) is the shared Net-Tune (pre-TX-NR1000) control.
- **Receiver-specific availability:** Many commands are conditional — TGA/TGB/TGC require the corresponding Setup Menu 12V Trigger parameter to be OFF; SLI codes 31 (XM) and 32 (SIRIUS) require XM/SIRIUS-equipped models; VOS is Japanese models only; SIRIUS, HD Radio, and XM commands require the respective tuner pack.
- **MVL scale:** Source documents two scales — 00-64 hex (0-100) and 00-50 hex (0-80). The 0-80 scale is for receivers that compress the range. The actual scale used depends on the receiver model.
- **Listening mode availability:** Each `LMD` value is only valid on certain models. The `*1` and `*2` footnotes note that some codes (e.g. `40`, `41`) are model-specific (newer than TX-SR805 has different straight-decode behavior; `87` is North America only). The Verifier should treat availability as model-dependent, not fabrications.
- **FF/REW timing (NTC):** "FFW/REW Net-tune commands must be sent continuously, with no more than 100ms delay between codes."
- **Status message timing:** "Receiver will respond with a status message within 50msec. If Receiver does not respond within 50msec, the communication has failed."
- **Source version caveat:** The source document is "ISCP Spec - Receivers, Version 1.15, 31 August 2009" (Integra brand). The Onkyo TX-RZ series was released 2015+ and may support newer ISCP features (e.g. Dolby Atmos, DTS:X, AirPlay, Chromecast, newer streaming services) not documented in v1.15. Coverage of TX-RZ-specific features is not stated in source.
- **Wrap-around semantics:** When the source describes `UP`/`DOWN`/`TG`/`MOVIE`/`MUSIC`/`GAME` as parameters, these cause the device to step through the available values for that setting. The exact set of values stepped through is receiver- and setting-dependent.
- **No firmware/version probing:** The source does not document a query for firmware version or receiver model identification. Compatibility checking must rely on the receiver's own setup menu.
- **Transport mutual exclusivity:** A given physical RS-232C or Ethernet link is exclusive to one controller. The protocol is point-to-point; multi-controller setups require a bridging controller.
<!-- UNRESOLVED: TX-RZ-specific features (Dolby Atmos, DTS:X, AirPlay 2, Chromecast, voice assistants, newer network streaming) and any post-v1.15 ISCP extensions are not stated in source. -->
<!-- UNRESOLVED: RI dock (CDS) command set is described as having "DOCK" sub-keys; full enumeration in source is truncated at "DOWN CURSOR DOWN Key" and may continue beyond. -->
<!-- UNRESOLVED: eISCP packet size limits and maximum ISCP message length are not stated in source. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-06-02T03:58:12.590Z
last_checked_at: 2026-06-02T17:23:36.702Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:36.702Z
matched_actions: 175
action_count: 175
confidence: medium
summary: "All 175 spec actions matched literally to ISCP v1.15 source; transport parameters verified; bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source document is the Integra ISCP v1.15 spec (Aug 2009) and predates the TX-RZ series; coverage of TX-RZ-specific features (e.g. newer streaming services, Dolby Atmos, DTS:X) is not stated in source."
- "source does not document a \"Variables\" section distinct from"
- "source does not document discrete multi-step macro sequences."
- "source does not document safety warnings, interlock procedures,"
- "TX-RZ-specific features (Dolby Atmos, DTS:X, AirPlay 2, Chromecast, voice assistants, newer network streaming) and any post-v1.15 ISCP extensions are not stated in source."
- "RI dock (CDS) command set is described as having \"DOCK\" sub-keys; full enumeration in source is truncated at \"DOWN CURSOR DOWN Key\" and may continue beyond."
- "eISCP packet size limits and maximum ISCP message length are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
