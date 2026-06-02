---
spec_id: admin/integra-dmi-40-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DMI 40.4 Control Spec"
manufacturer: Integra
model_family: DMI-40.4
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DMI-40.4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:24.367Z
last_checked_at: 2026-05-14T18:17:16.932Z
generated_at: 2026-05-14T18:17:16.932Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state firmware version compatibility, login procedure, or any safety warnings."
  - "source describes no multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility, login/auth procedure, and any safety warnings not stated in source."
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:16.932Z
  matched_actions: 142
  action_count: 168
  confidence: medium
  summary: "All 142 spec actions matched literally to source ISCP commands with correct parameter ranges and transport verified. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Integra DMI 40.4 Control Spec

## Summary
ISCP (Integra Serial Control Protocol) for the DMI-40.4 multizone AV controller. Supports command/question/notification message flow over RS-232 (3-wire, 9600/8/N/1, no flow control) and over Ethernet (eISCP over TCP port 60128). This spec enumerates the documented ISCP command set across system, tuner, network, Zone 2/3/4, and Dock/RI sections.

<!-- UNRESOLVED: source does not state firmware version compatibility, login procedure, or any safety warnings. -->

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
addressing:
  port: 60128  # eISCP default; receiver-configurable range 49152-65535
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# ISCP message format: "!1{cmd}{param}\r" (RS-232) / wrapped in eISCP header (TCP)
# Unit-type "1" = Receiver. All action commands use this template.
# For QSTN queries, omit the parameter.

# --- System / Amplifier ---
- id: pwr_set
  label: System Power
  kind: action
  command: "!1PWR{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
      description: "00=Standby, 01=On, QSTN=query status"
- id: amt_set
  label: Audio Muting
  kind: action
  command: "!1AMT{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
- id: mvl_set
  label: Master Volume
  kind: action
  command: "!1MVL{code}\r"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100), UP, DOWN, UP1, DOWN1, or QSTN"
- id: sli_set
  label: Input Selector
  kind: action
  command: "!1SLI{code}\r"
  params:
    - name: code
      type: enum
      values: ["00","01","02","03","04","10","20","21","22","23","24","25","26","27","28","29","2A","40","30","UP","DOWN","QSTN"]
- id: lmd_set
  label: Listening Mode
  kind: action
  command: "!1LMD{code}\r"
  params:
    - name: code
      type: string
      description: "00-0F, 11, 80-83, 90, A0-A2, UP, DOWN, or QSTN"
- id: ltn_set
  label: Late Night
  kind: action
  command: "!1LTN{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
- id: dim_set
  label: Dimmer Level
  kind: action
  command: "!1DIM{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "08", "DIM", "QSTN"]
- id: slp_set
  label: Sleep Timer
  kind: action
  command: "!1SLP{code}\r"
  params:
    - name: code
      type: string
      description: "01-5A hex (1-90 min), OFF, UP, or QSTN"
- id: spa_set
  label: Speaker A
  kind: action
  command: "!1SPA{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]
- id: spb_set
  label: Speaker B
  kind: action
  command: "!1SPB{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]
- id: spl_set
  label: Speaker Layout
  kind: action
  command: "!1SPL{code}\r"
  params:
    - name: code
      type: enum
      values: ["SB", "FH", "FW", "UP", "QSTN"]
- id: tfr_set
  label: Tone (Front)
  kind: action
  command: "!1TFR{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN (-A..00..+A)"
- id: tct_set
  label: Tone (Center)
  kind: action
  command: "!1TCT{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN"
- id: tsr_set
  label: Tone (Surround)
  kind: action
  command: "!1TSR{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN"
- id: tsb_set
  label: Tone (Surround Back)
  kind: action
  command: "!1TSB{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN"
- id: tsw_set
  label: Tone (Subwoofer)
  kind: action
  command: "!1TSW{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, BUP, BDOWN, or QSTN"
- id: slc_set
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{code}\r"
  params:
    - name: code
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
- id: swl_set
  label: Subwoofer (temp) Level
  kind: action
  command: "!1SWL{code}\r"
  params:
    - name: code
      type: string
      description: "-F..00..+C (-15dB..0..+12dB), UP, DOWN, or QSTN"
- id: ctl_set
  label: Center (temp) Level
  kind: action
  command: "!1CTL{code}\r"
  params:
    - name: code
      type: string
      description: "-C..00..+C (-12dB..0..+12dB), UP, DOWN, or QSTN"
- id: dif_info_set
  label: Display Information
  kind: action
  command: "!1DIF{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04"]
      description: "00=ProgramFormat, 01=DigitalInput, 02=DigitalFormat, 03=Bass, 04=Treble"
- id: dif_mode_set
  label: Display Mode
  kind: action
  command: "!1DIF{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "TG", "QSTN"]
      description: "DIF mnemonic ambiguous in source - same opcode used for both Information and Mode"
- id: osd_set
  label: Setup / OSD Operation
  kind: action
  command: "!1OSD{code}\r"
  params:
    - name: code
      type: enum
      values: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]
- id: mem_set
  label: Memory Setup
  kind: action
  command: "!1MEM{code}\r"
  params:
    - name: code
      type: enum
      values: ["STR", "RCL", "LOCK", "UNLK"]
- id: ifa_set
  label: Audio Information
  kind: action
  command: "!1IFA{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn:nnnnn info payload or QSTN"
- id: ifv_set
  label: Video Information
  kind: action
  command: "!1IFV{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn:nnnnn info payload or QSTN"
- id: slr_set
  label: RECOUT Selector
  kind: action
  command: "!1SLR{code}\r"
  params:
    - name: code
      type: enum
      values: ["00","01","02","03","04","10","20","21","22","23","24","25","26","27","28","30","7F","80","QSTN"]
- id: sla_set
  label: Audio Selector
  kind: action
  command: "!1SLA{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "UP", "QSTN"]
- id: tga_set
  label: 12V Trigger A
  kind: action
  command: "!1TGA{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01"]
- id: tgb_set
  label: 12V Trigger B
  kind: action
  command: "!1TGB{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01"]
- id: tgc_set
  label: 12V Trigger C
  kind: action
  command: "!1TGC{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01"]
- id: vos_set
  label: Video Output Selector (Japanese model)
  kind: action
  command: "!1VOS{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
- id: hdo_set
  label: HDMI Output Selector
  kind: action
  command: "!1HDO{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "UP", "QSTN"]
- id: res_set
  label: Monitor Out Resolution
  kind: action
  command: "!1RES{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "04", "05", "06", "07", "UP", "QSTN"]
- id: isf_set
  label: ISF Mode
  kind: action
  command: "!1ISF{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
- id: ras_set
  label: Re-EQ / Academy Filter
  kind: action
  command: "!1RAS{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP", "QSTN"]
- id: ady_set
  label: Audyssey 2EQ/MultEQ
  kind: action
  command: "!1ADY{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]
- id: adq_set
  label: Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]
- id: adv_set
  label: Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
- id: dvl_set
  label: Dolby Volume
  kind: action
  command: "!1DVL{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "03", "UP", "QSTN"]
- id: mot_set
  label: Music Optimizer
  kind: action
  command: "!1MOT{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "UP", "QSTN"]

# --- Tuner ---
- id: tun_set
  label: Tuning Frequency
  kind: action
  command: "!1TUN{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch), UP, DOWN, or QSTN"
- id: prs_set
  label: Tuner Preset
  kind: action
  command: "!1PRS{code}\r"
  params:
    - name: code
      type: string
      description: "01-28 hex (preset 1-40), UP, DOWN, or QSTN"
- id: rds_set
  label: RDS Information Display
  kind: action
  command: "!1RDS{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "02", "UP"]
- id: pts_set
  label: PTY Scan
  kind: action
  command: "!1PTS{code}\r"
  params:
    - name: code
      type: string
      description: "00-1E hex (PTY 0-30) or ENTER"
- id: tps_set
  label: TP Scan
  kind: action
  command: "!1TPS{code}\r"
  params:
    - name: code
      type: enum
      values: ["", "ENTER"]
- id: xcn_set
  label: XM Channel Name Info
  kind: action
  command: "!1XCN{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (XM model only)"
- id: xat_set
  label: XM Artist Name Info
  kind: action
  command: "!1XAT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (XM model only)"
- id: xti_set
  label: XM Title Info
  kind: action
  command: "!1XTI{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (XM model only)"
- id: xch_set
  label: XM Channel Number
  kind: action
  command: "!1XCH{code}\r"
  params:
    - name: code
      type: string
      description: "000-255, UP, DOWN, or QSTN (XM model only)"
- id: xct_set
  label: XM Category
  kind: action
  command: "!1XCT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn, UP, DOWN, or QSTN (XM model only)"
- id: scn_set
  label: SIRIUS Channel Name Info
  kind: action
  command: "!1SCN{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (SIRIUS model only)"
- id: sat_set
  label: SIRIUS Artist Name Info
  kind: action
  command: "!1SAT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (SIRIUS model only)"
- id: sti_set
  label: SIRIUS Title Info
  kind: action
  command: "!1STI{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (SIRIUS model only)"
- id: sch_set
  label: SIRIUS Channel Number
  kind: action
  command: "!1SCH{code}\r"
  params:
    - name: code
      type: string
      description: "000-255, UP, DOWN, or QSTN (SIRIUS model only)"
- id: sct_set
  label: SIRIUS Category
  kind: action
  command: "!1SCT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn, UP, DOWN, or QSTN (SIRIUS model only)"
- id: slk_set
  label: SIRIUS Parental Lock
  kind: action
  command: "!1SLK{code}\r"
  params:
    - name: code
      type: enum
      values: ["INPUT", "WRONG", "nnnn"]
      description: "nnnn=4-digit password; INPUT/WRONG for status"
- id: hat_set
  label: HD Radio Artist Name Info
  kind: action
  command: "!1HAT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn (max 64 digits) or QSTN (HD Radio model only)"
- id: hcn_set
  label: HD Radio Channel Name Info
  kind: action
  command: "!1HCN{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnn (7 digits) or QSTN (HD Radio model only)"
- id: hti_set
  label: HD Radio Title Info
  kind: action
  command: "!1HTI{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn (max 64 digits) or QSTN (HD Radio model only)"
- id: hds_set
  label: HD Radio Detail Info
  kind: action
  command: "!1HDS{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn or QSTN (HD Radio model only)"
- id: hpr_set
  label: HD Radio Channel Program
  kind: action
  command: "!1HPR{code}\r"
  params:
    - name: code
      type: string
      description: "01-08 or QSTN (HD Radio model only)"
- id: hbl_set
  label: HD Radio Blend Mode
  kind: action
  command: "!1HBL{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
      description: "00=Auto, 01=Analog (HD Radio model only)"
- id: hts_set
  label: HD Radio Tuner Status
  kind: action
  command: "!1HTS{code}\r"
  params:
    - name: code
      type: string
      description: "mmnnoo (3 bytes status) or QSTN (HD Radio model only)"

# --- Network / Net-Tune ---
- id: ntc_set
  label: Net-Tune Operation
  kind: action
  command: "!1NTC{code}\r"
  params:
    - name: code
      type: enum
      values: ["PLAY","STOP","PAUSE","TRUP","TRDN","FF","REW","REPEAT","RANDOM","DISPLAY","ALBUM","ARTIST","GENRE","PLAYLIST","RIGHT","LEFT","UP","DOWN","SELECT","0","1","2","3","4","5","6","7","8","9","DELETE","CAPS","CHUP","CHDN"]
- id: nat_set
  label: Net/USB Artist Name Info
  kind: action
  command: "!1NAT{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn (max 64 ASCII) or QSTN"
- id: nal_set
  label: Net/USB Album Name Info
  kind: action
  command: "!1NAL{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnn (max 64 ASCII) or QSTN"
- id: nti_set
  label: Net/USB Title Name
  kind: action
  command: "!1NTI{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnnnnnnn (max 64 ASCII) or QSTN"
- id: ntm_set
  label: Net/USB Time Info
  kind: action
  command: "!1NTM{code}\r"
  params:
    - name: code
      type: string
      description: "mm:ss/mm:ss (max 99:59) or QSTN"
- id: ntr_set
  label: Net/USB Track Info
  kind: action
  command: "!1NTR{code}\r"
  params:
    - name: code
      type: string
      description: "cccc/tttt (max 9999) or QSTN"
- id: nst_set
  label: Net/USB Play Status
  kind: action
  command: "!1NST{code}\r"
  params:
    - name: code
      type: string
      description: "prs (3 letters: p=play status, r=repeat status) or QSTN"
- id: npr_set
  label: Internet Radio Preset
  kind: action
  command: "!1NPR{code}\r"
  params:
    - name: code
      type: string
      description: "01-28 hex (preset 1-40)"

# --- Zone 2 ---
- id: zpw_set
  label: Zone 2 Power
  kind: action
  command: "!1ZPW{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
- id: zmt_set
  label: Zone 2 Muting
  kind: action
  command: "!1ZMT{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
- id: zvl_set
  label: Zone 2 Volume
  kind: action
  command: "!1ZVL{code}\r"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100), UP, DOWN, or QSTN"
- id: ztn_set
  label: Zone 2 Tone
  kind: action
  command: "!1ZTN{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN"
- id: zbl_set
  label: Zone 2 Balance
  kind: action
  command: "!1ZBL{code}\r"
  params:
    - name: code
      type: string
      description: "xx (-A..00..+A), UP, DOWN, or QSTN"
- id: slz_set
  label: Zone 2 Selector
  kind: action
  command: "!1SLZ{code}\r"
  params:
    - name: code
      type: enum
      values: ["00","01","02","03","04","10","20","21","22","23","24","25","26","27","28","29","2A","40","30"]
- id: tuz_set
  label: Zone 2 Tuning
  kind: action
  command: "!1TUZ{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, or QSTN"

# --- Zone 3 ---
- id: pw3_set
  label: Zone 3 Power
  kind: action
  command: "!1PW3{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
- id: mt3_set
  label: Zone 3 Muting
  kind: action
  command: "!1MT3{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
- id: vl3_set
  label: Zone 3 Volume
  kind: action
  command: "!1VL3{code}\r"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100), UP, DOWN, or QSTN"
- id: tn3_set
  label: Zone 3 Tone
  kind: action
  command: "!1TN3{code}\r"
  params:
    - name: code
      type: string
      description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN, or QSTN"
- id: bl3_set
  label: Zone 3 Balance
  kind: action
  command: "!1BL3{code}\r"
  params:
    - name: code
      type: string
      description: "xx (-A..00..+A), UP, DOWN, or QSTN"
- id: sl3_set
  label: Zone 3 Selector
  kind: action
  command: "!1SL3{code}\r"
  params:
    - name: code
      type: enum
      values: ["00","01","02","03","04","05","06","10","20","21","22","23","24","25","26","27","28","29","2A","40","30","31","32","80","QSTN"]
- id: tu3_set
  label: Zone 3 Tuning
  kind: action
  command: "!1TU3{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, or QSTN"

# --- Zone 4 ---
- id: pw4_set
  label: Zone 4 Power
  kind: action
  command: "!1PW4{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "QSTN"]
- id: mt4_set
  label: Zone 4 Muting
  kind: action
  command: "!1MT4{code}\r"
  params:
    - name: code
      type: enum
      values: ["00", "01", "TG", "QSTN"]
- id: vl4_set
  label: Zone 4 Volume
  kind: action
  command: "!1VL4{code}\r"
  params:
    - name: code
      type: string
      description: "00-64 hex (0-100), UP, DOWN, or QSTN"
- id: sl4_set
  label: Zone 4 Selector
  kind: action
  command: "!1SL4{code}\r"
  params:
    - name: code
      type: enum
      values: ["00","01","02","03","04","05","06","10","20","21","22","23","24","25","26","27","28","29","2A","40","30","31","32","80","QSTN"]
- id: tu4_set
  label: Zone 4 Tuning
  kind: action
  command: "!1TU4{code}\r"
  params:
    - name: code
      type: string
      description: "nnnnn (FM nnn.nn MHz / AM nnnnn kHz), UP, DOWN, or QSTN"

# --- Dock / RI ---
- id: cds_set
  label: Docking Station via RI
  kind: action
  command: "!1CDS{code}\r"
  params:
    - name: code
      type: enum
      values: ["PWRON","PWROFF","PLY/RES","STOP","SKIP.F","SKIP.R","PAUSE","PLY/PAU","FF","REW","ALBUM+","ALBUM-","PLIST+","PLIST-","CHAPT+","CHAPT-","RANDOM","REPEAT","MUTE","BLIGHT","MENU","ENTER","UP","DOWN"]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
- id: audio_muting_state
  type: enum
  values: [off, on]
- id: master_volume
  type: integer
  range: [0, 100]
  description: "Hex 00-64 from MVL QSTN"
- id: input_selector
  type: string
  description: "SLI QSTN returns hex code mapped per Actions/SLI"
- id: listening_mode
  type: string
  description: "LMD QSTN returns hex code"
- id: late_night_level
  type: enum
  values: [off, low, high]
- id: dimmer_level
  type: enum
  values: [bright, dim, dark, shut_off, bright_led_off]
- id: sleep_time
  type: integer
  range: [0, 90]
  description: "SLP QSTN hex 00-5A representing minutes"
- id: speaker_a_state
  type: enum
  values: [off, on]
- id: speaker_b_state
  type: enum
  values: [off, on]
- id: speaker_layout
  type: enum
  values: [surr_back, front_high, front_wide]
- id: front_tone
  type: string
  description: "TFR QSTN returns BxxTxx (bass/treble -A..+A)"
- id: center_tone
  type: string
  description: "TCT QSTN returns BxxTxx"
- id: surround_tone
  type: string
  description: "TSR QSTN returns BxxTxx"
- id: surround_back_tone
  type: string
  description: "TSB QSTN returns BxxTxx"
- id: subwoofer_tone
  type: string
  description: "TSW QSTN returns Bxx"
- id: subwoofer_level
  type: string
  description: "SWL QSTN -F..+C (-15dB..+12dB)"
- id: center_level
  type: string
  description: "CTL QSTN -C..+C (-12dB..+12dB)"
- id: recout_selector
  type: string
  description: "SLR QSTN hex code"
- id: audio_selector
  type: enum
  values: [auto, multi_channel, analog, ilink, hdmi, coax_opt, balance]
- id: hdmi_output_selector
  type: enum
  values: [no_analog, main, sub, both, both_main, both_sub]
- id: monitor_out_resolution
  type: enum
  values: [through, auto, 480p, 720p, 1080i, 1080p, source, 1080p_24fs]
- id: isf_mode
  type: enum
  values: [custom, day, night]
- id: re_eq_academy_state
  type: enum
  values: [both_off, re_eq_on, academy_on]
- id: audyssey_state
  type: enum
  values: [off, on]
- id: audyssey_dynamic_eq
  type: enum
  values: [off, on]
- id: audyssey_dynamic_volume
  type: enum
  values: [off, light, medium, heavy]
- id: dolby_volume
  type: enum
  values: [off, low, mid, high]
- id: music_optimizer
  type: enum
  values: [off, on]
- id: tuning_frequency
  type: string
  description: "TUN QSTN returns nnnnn"
- id: tuner_preset
  type: string
  description: "PRS QSTN returns 01-28 hex (1-40)"
- id: hd_radio_tuner_status
  type: string
  description: "HTS QSTN returns mmnnoo (3 bytes)"
- id: hd_radio_blend_mode
  type: enum
  values: [auto, analog]
- id: net_usb_play_status
  type: string
  description: "NST QSTN returns prs (3-letter play+repeat status)"
- id: net_usb_time
  type: string
  description: "NTM QSTN returns mm:ss/mm:ss"
- id: net_usb_track
  type: string
  description: "NTR QSTN returns cccc/tttt"
- id: zone2_power
  type: enum
  values: [standby, on]
- id: zone2_muting
  type: enum
  values: [off, on]
- id: zone2_volume
  type: integer
  range: [0, 100]
- id: zone2_tone
  type: string
  description: "ZTN QSTN returns BxxTxx"
- id: zone2_balance
  type: string
  description: "ZBL QSTN returns xx"
- id: zone3_power
  type: enum
  values: [standby, on]
- id: zone3_muting
  type: enum
  values: [off, on]
- id: zone3_volume
  type: integer
  range: [0, 100]
- id: zone3_tone
  type: string
  description: "TN3 QSTN returns BxxTxx"
- id: zone3_balance
  type: string
  description: "BL3 QSTN returns xx"
- id: zone3_selector
  type: string
  description: "SL3 QSTN hex code"
- id: zone4_power
  type: enum
  values: [standby, on]
- id: zone4_muting
  type: enum
  values: [off, on]
- id: zone4_volume
  type: integer
  range: [0, 100]
- id: zone4_selector
  type: string
  description: "SL4 QSTN hex code"
- id: video_output_selector
  type: enum
  values: [d4, component]
  description: "VOS QSTN (Japanese model only)"
```

## Variables
```yaml
# ISCP exposes virtually all state via QSTN queries; discrete actions above cover
# settable parameters. No separate variable store described in source.
```

## Events
```yaml
# Receiver pushes unsolicited status messages on state change (Section 2.3).
# The exact trigger conditions per status are not enumerated in source beyond
# the 50msec response contract. Implementations must treat any ISCP message
# prefixed "!1" as a potential status notification.
- id: status_change_notification
  description: "ISCP message of the form !1{cmd}{param}\r emitted whenever device state changes (see Section 2.3)."
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
ISCP message format on RS-232 is `!1{cmd}{param}` terminated by CR, LF, or CRLF. eISCP over TCP wraps the same ISCP payload in a 16-byte big-endian header (header size 0x00000010, data size, version 0x01, reserved 0x000000) followed by the ISCP data terminated by EOF (0x1A) optionally followed by CR/LF. Default TCP port 60128; receiver-configurable in 49152-65535. Minimum 50msec interval between messages. FF/REW Net-Tune commands must be sent continuously with no more than 100msec delay between codes. The 12V triggers TGA/TGB/TGC are only available when all 12V Trigger parameters are "OFF" in Setup Menu. DIF mnemonic is overloaded in the source for both Display Information (codes 00-04) and Display Mode (codes 00-03 + TG/QSTN) — spec splits them but disambiguation requires device behavior testing.
<!-- UNRESOLVED: firmware version compatibility, login/auth procedure, and any safety warnings not stated in source. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:24.367Z
last_checked_at: 2026-05-14T18:17:16.932Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:16.932Z
matched_actions: 142
action_count: 168
confidence: medium
summary: "All 142 spec actions matched literally to source ISCP commands with correct parameter ranges and transport verified. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state firmware version compatibility, login procedure, or any safety warnings."
- "source describes no multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility, login/auth procedure, and any safety warnings not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
