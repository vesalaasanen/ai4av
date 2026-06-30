---
spec_id: admin/integra-dtc-9-8-north-america
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTC-9.8 Control Spec"
manufacturer: Integra
model_family: DTC-9.8
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DTC-9.8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-06-25T09:46:01.428Z
last_checked_at: 2026-06-25T10:29:04.353Z
generated_at: 2026-06-25T10:29:04.353Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "populate from source, or remove section if not applicable"
  - "no per-event payload list in source beyond exemplar `!1SST00[EOF]"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "fields that could not be determined from the source, with explanation."
verification:
  verdict: verified
  checked_at: 2026-06-25T10:29:04.353Z
  matched_actions: 160
  action_count: 160
  confidence: medium
  summary: "deterministic presence proof: 160/160 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Integra DTC-9.8 Control Spec

## Summary
Integra DTC-9.8 (North America) AV surround processor / receiver controlled via ISCP (Integra Serial Control Protocol). Two transports: 3-wire RS-232C and TCP (eISCP over Ethernet, port 60128 by default). Message format `!1XXX<params>` with `[CR]/[LF]/[EOF]` terminators; eISCP wraps the ISCP message in a 16-byte big-endian header. Commands cover system power, master volume, input selection, listening mode, tone, tuner/network/HD Radio/SIRIUS/XM, plus Zone 2/3/4. This spec defines every command, parameter value, and query ("QSTN") response documented in the protocol manual.

<!-- UNRESOLVED: list any major gaps here -->

## Transport
```yaml
# Device supports both RS-232C and TCP (eISCP). Both protocol groups emitted.
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # eISCP default destination port; user-configurable 49152-65535
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # explicit in source: "no flow control"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Trait inference grounded in source evidence:
# - powerable       (PWR/ZPW/PW3/PW4 commands + 12V trigger TGA/TGB/TGC)
# - routable        (SLI main input selector + SLR RECOUT + SLA audio + HDO HDMI out + RES resolution + SLZ/SL3/SL4 zone selectors)
# - queryable       (QSTN queries returning state)
# - levelable       (MVL master volume + ZVL/VL3/VL4 zone volume + tone TFR/TCT/TSR/TSB/TSW/TN3 + SWL/CTL center/sub levels + ZBL/BL3 balance + speaker level calibration)
```

## Actions
```yaml
- id: pwr_set
  label: "PWR System Power Command"
  kind: action
  command: "PWR"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: amt_set
  label: "AMT Audio Muting Command"
  kind: action
  command: "AMT"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "TG"]

- id: mvl_set
  label: "MVL Master Volume Command"
  kind: action
  command: "MVL"
  params:
    - name: value
      type: enum
      enum: ["00\"-\"64", "UP", "DOWN", "UP1", "DOWN1"]

- id: sli_set
  label: "SLI Input Selector Command"
  kind: action
  command: "SLI"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "UP", "DOWN"]

- id: lmd_set
  label: "LMD Listening Mode Command"
  kind: action
  command: "LMD"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0A", "0B", "0C", "0D", "0E", "0F", "11", "80", "81", "82", "83", "90", "A0", "A1", "A2", "UP", "DOWN"]

- id: ltn_set
  label: "LTN Late Night Command"
  kind: action
  command: "LTN"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "UP"]

- id: dim_set
  label: "DIM Dimmer Level Command"
  kind: action
  command: "DIM"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "08", "DIM"]

- id: slp_set
  label: "SLP Sleep Set Command"
  kind: action
  command: "SLP"
  params:
    - name: value
      type: enum
      enum: ["01\"-\"5A", "OFF", "UP"]

- id: spl_set
  label: "SPL Speaker Layout Command"
  kind: action
  command: "SPL"
  params:
    - name: value
      type: enum
      enum: ["SB", "FH", "FW", "UP"]

- id: tfr_set
  label: "TFR Tone (Front) Command"
  kind: action
  command: "TFR"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: tct_set
  label: "TCT Tone (Center) Command"
  kind: action
  command: "TCT"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: tsr_set
  label: "TSR Tone (Surround) Command"
  kind: action
  command: "TSR"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: tsb_set
  label: "TSB Tone (Surround Back) Command"
  kind: action
  command: "TSB"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: tsw_set
  label: "TSW Tone (Subwoofer) Command"
  kind: action
  command: "TSW"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "BUP", "BDOWN"]

- id: slc_set
  label: "SLC Speaker Level Calibration Command"
  kind: action
  command: "SLC"
  params:
    - name: value
      type: enum
      enum: ["TEST", "CHSEL", "UP", "DOWN"]

- id: swl_set
  label: "SWL Subwoofer (temporary) Level Command"
  kind: action
  command: "SWL"
  params:
    - name: value
      type: enum
      enum: ["-F\"-\"00\"-\"+C", "UP", "DOWN"]

- id: ctl_set
  label: "CTL Center (temporary) Level Command"
  kind: action
  command: "CTL"
  params:
    - name: value
      type: enum
      enum: ["-C\"-\"00\"-\"+C", "UP", "DOWN"]

- id: dif_set
  label: "DIF Display Information Command"
  kind: action
  command: "DIF"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04"]

- id: osd_set
  label: "OSD Setup Operation Command"
  kind: action
  command: "OSD"
  params:
    - name: value
      type: enum
      enum: ["MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO", "VIDEO"]

- id: mem_set
  label: "MEM Memory Setup Command"
  kind: action
  command: "MEM"
  params:
    - name: value
      type: enum
      enum: ["STR", "RCL", "LOCK", "UNLK"]

- id: ifa_set
  label: "IFA Audio Information Command"
  kind: action
  command: "IFA"
  params:
    - name: value
      type: enum
      enum: ["nnnnn:nnnnn"]

- id: ifv_set
  label: "IFV Video Information Command"
  kind: action
  command: "IFV"
  params:
    - name: value
      type: enum
      enum: ["nnnnn:nnnnn"]

- id: slr_set
  label: "SLR RECOUT Selector Command"
  kind: action
  command: "SLR"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "7F", "80"]

- id: sla_set
  label: "SLA Audio Selector Command"
  kind: action
  command: "SLA"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "06", "UP"]

- id: tga_set
  label: "TGA 12V Trigger A Command"
  kind: action
  command: "TGA"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: tgb_set
  label: "TGB 12V Trigger B Command"
  kind: action
  command: "TGB"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: tgc_set
  label: "TGC 12V Trigger C Command"
  kind: action
  command: "TGC"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: vos_set
  label: "VOS Video Output Selector (Japanese Model Only)"
  kind: action
  command: "VOS"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: hdo_set
  label: "HDO HDMI Output Selector"
  kind: action
  command: "HDO"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "UP"]

- id: res_set
  label: "RES Monitor Out Resolution"
  kind: action
  command: "RES"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "06", "07", "UP"]

- id: isf_set
  label: "ISF ISF Mode"
  kind: action
  command: "ISF"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "UP"]

- id: ras_set
  label: "RAS Re-EQ/Academy Filter Command"
  kind: action
  command: "RAS"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "UP"]

- id: ady_set
  label: "ADY Audyssey 2EQ/MultEQ/MultEQ XT"
  kind: action
  command: "ADY"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "UP"]

- id: adq_set
  label: "ADQ Audyssey Dynamic EQ"
  kind: action
  command: "ADQ"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "UP"]

- id: adv_set
  label: "ADV Audyssey Dynamic Volume"
  kind: action
  command: "ADV"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "UP"]

- id: dvl_set
  label: "DVL Dolby Volume"
  kind: action
  command: "DVL"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "UP"]

- id: mot_set
  label: "MOT Music Optimizer"
  kind: action
  command: "MOT"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "UP"]

- id: tun_set
  label: "TUN Tuning Command (Include Tuner Pack Model Only)"
  kind: action
  command: "TUN"
  params:
    - name: value
      type: enum
      enum: ["nnnnn", "UP", "DOWN"]

- id: prs_set
  label: "PRS Preset Command (Include Tuner Pack Model Only)"
  kind: action
  command: "PRS"
  params:
    - name: value
      type: enum
      enum: ["01\"-\"28", "UP", "DOWN"]

- id: rds_set
  label: "RDS RDS Information Command (RDS Model Only)"
  kind: action
  command: "RDS"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "UP"]

- id: pts_set
  label: "PTS PTY Scan Command (RDS Model Only)"
  kind: action
  command: "PTS"
  params:
    - name: value
      type: enum
      enum: ["00\"-\"1E", "ENTER"]

- id: tps_set
  label: "TPS TP Scan Command (RDS Model Only)"
  kind: action
  command: "TPS"
  params:
    - name: value
      type: enum
      enum: ["ENTER"]

- id: xcn_set
  label: "XCN XM Channel Name Info (XM Model Only)"
  kind: action
  command: "XCN"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: xat_set
  label: "XAT XM Artist Name Info (XM Model Only)"
  kind: action
  command: "XAT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: xti_set
  label: "XTI XM Title Info (XM Model Only)"
  kind: action
  command: "XTI"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: xch_set
  label: "XCH XM Channel Number Command (XM Model Only)"
  kind: action
  command: "XCH"
  params:
    - name: value
      type: enum
      enum: ["000\"-\"255", "UP", "DOWN"]

- id: xct_set
  label: "XCT XM Category Command (XM Model Only)"
  kind: action
  command: "XCT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn", "UP", "DOWN"]

- id: scn_set
  label: "SCN SIRIUS Channel Name Info (SIRIUS Model Only)"
  kind: action
  command: "SCN"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: sat_set
  label: "SAT SIRIUS Artist Name Info (SIRIUS Model Only)"
  kind: action
  command: "SAT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: sti_set
  label: "STI SIRIUS Title Info (SIRIUS Model Only)"
  kind: action
  command: "STI"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: sch_set
  label: "SCH SIRIUS Channel Number Command (SIRIUS Model Only)"
  kind: action
  command: "SCH"
  params:
    - name: value
      type: enum
      enum: ["000\"-\"255", "UP", "DOWN"]

- id: sct_set
  label: "SCT SIRIUS Category Command (SIRIUS Model Only)"
  kind: action
  command: "SCT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn", "UP", "DOWN"]

- id: slk_set
  label: "SLK SIRIUS Parental Lock Command (SIRIUS Model Only)"
  kind: action
  command: "SLK"
  params:
    - name: value
      type: enum
      enum: ["nnnn", "INPUT", "WRONG"]

- id: hat_set
  label: "HAT HD Radio Artist Name Info (HD Radio Model Only)"
  kind: action
  command: "HAT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: hcn_set
  label: "HCN HD Radio Channel Name Info (HD Radio Model Only)"
  kind: action
  command: "HCN"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: hti_set
  label: "HTI HD Radio Title Info (HD Radio Model Only)"
  kind: action
  command: "HTI"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: hds_set
  label: "HDS HD Radio Detail Info (HD Radio Model Only)"
  kind: action
  command: "HDS"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: hpr_set
  label: "HPR HD Radio Channel Program Command (HD Radio Model Only)"
  kind: action
  command: "HPR"
  params:
    - name: value
      type: enum
      enum: ["01\"-\"08"]

- id: hbl_set
  label: "HBL HD Radio Blend Mode Command (HD Radio Model Only)"
  kind: action
  command: "HBL"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: ntc_set
  label: "NTC Net-Tune/Network Operation Command (Net-Tune Model Only before TX-NR1000, Network Model Only after TX-NR905)"
  kind: action
  command: "NTC"
  params:
    - name: value
      type: enum
      enum: ["PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST", "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT", "0\"-\"9", "DELETE", "CAPS", "CHUP", "CHDN"]

- id: nat_set
  label: "NAT Net/USB Artist Name Info"
  kind: action
  command: "NAT"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: nal_set
  label: "NAL Net/USB Album Name Info"
  kind: action
  command: "NAL"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnn"]

- id: nti_set
  label: "NTI Net/USB Title Name"
  kind: action
  command: "NTI"
  params:
    - name: value
      type: enum
      enum: ["nnnnnnnnnn"]

- id: ntm_set
  label: "NTM Net/USB Time Info"
  kind: action
  command: "NTM"
  params:
    - name: value
      type: enum
      enum: ["mm:ss/mm:ss"]

- id: ntr_set
  label: "NTR Net/USB Track Info"
  kind: action
  command: "NTR"
  params:
    - name: value
      type: enum
      enum: ["cccc/tttt"]

- id: npr_set
  label: "NPR Internet Radio Preset Command"
  kind: action
  command: "NPR"
  params:
    - name: value
      type: enum
      enum: ["01\"-\"28"]

- id: zpw_set
  label: "ZPW Zone2 Power Command"
  kind: action
  command: "ZPW"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: zmt_set
  label: "ZMT Zone2 Muting Command"
  kind: action
  command: "ZMT"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "TG"]

- id: zvl_set
  label: "ZVL Zone2 Volume Command"
  kind: action
  command: "ZVL"
  params:
    - name: value
      type: enum
      enum: ["00\"-\"64", "UP", "DOWN"]

- id: ztn_set
  label: "ZTN Zone2 Tone Command"
  kind: action
  command: "ZTN"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: zbl_set
  label: "ZBL Zone2 Balance Command"
  kind: action
  command: "ZBL"
  params:
    - name: value
      type: enum
      enum: ["xx", "UP", "DOWN"]

- id: slz_set
  label: "SLZ ZONE2 Selector Command"
  kind: action
  command: "SLZ"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30"]

- id: tuz_set
  label: "TUZ Zone2 Tuning Command"
  kind: action
  command: "TUZ"
  params:
    - name: value
      type: enum
      enum: ["nnnnn", "UP", "DOWN"]

- id: pw3_set
  label: "PW3 Zone3 Power Command"
  kind: action
  command: "PW3"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: mt3_set
  label: "MT3 Zone3 Muting Command"
  kind: action
  command: "MT3"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "TG"]

- id: vl3_set
  label: "VL3 Zone3 Volume Command"
  kind: action
  command: "VL3"
  params:
    - name: value
      type: enum
      enum: ["00\"-\"64", "UP", "DOWN"]

- id: tn3_set
  label: "TN3 Zone3 Tone Command"
  kind: action
  command: "TN3"
  params:
    - name: value
      type: enum
      enum: ["Bxx", "Txx", "BUP", "BDOWN", "TUP", "TDOWN"]

- id: bl3_set
  label: "BL3 Zone3 Balance Command"
  kind: action
  command: "BL3"
  params:
    - name: value
      type: enum
      enum: ["xx", "UP", "DOWN"]

- id: sl3_set
  label: "SL3 ZONE3 Selector Command"
  kind: action
  command: "SL3"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]

- id: tu3_set
  label: "TU3 Zone3 Tuning Command"
  kind: action
  command: "TU3"
  params:
    - name: value
      type: enum
      enum: ["nnnnn", "UP", "DOWN"]

- id: pw4_set
  label: "PW4 Zone4 Power Command"
  kind: action
  command: "PW4"
  params:
    - name: value
      type: enum
      enum: ["00", "01"]

- id: mt4_set
  label: "MT4 Zone4 Muting Command"
  kind: action
  command: "MT4"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "TG"]

- id: vl4_set
  label: "VL4 Zone4 Volume Command"
  kind: action
  command: "VL4"
  params:
    - name: value
      type: enum
      enum: ["00\"-\"64", "UP", "DOWN"]

- id: sl4_set
  label: "SL4 ZONE4 Selector Command"
  kind: action
  command: "SL4"
  params:
    - name: value
      type: enum
      enum: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]

- id: tu4_set
  label: "TU4 Zone4 Tuning Command"
  kind: action
  command: "TU4"
  params:
    - name: value
      type: enum
      enum: ["nnnnn", "UP", "DOWN"]

- id: cds_set
  label: "CDS Command for Docking Station via RI"
  kind: action
  command: "CDS"
  params:
    - name: value
      type: enum
      enum: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
```

## Feedbacks
```yaml
- id: pwr_query
  label: "PWR System Power Command Query"
  kind: query
  query_command: "QSTN"

- id: amt_query
  label: "AMT Audio Muting Command Query"
  kind: query
  query_command: "QSTN"

- id: mvl_query
  label: "MVL Master Volume Command Query"
  kind: query
  query_command: "QSTN"

- id: sli_query
  label: "SLI Input Selector Command Query"
  kind: query
  query_command: "QSTN"

- id: lmd_query
  label: "LMD Listening Mode Command Query"
  kind: query
  query_command: "QSTN"

- id: ltn_query
  label: "LTN Late Night Command Query"
  kind: query
  query_command: "QSTN"

- id: dim_query
  label: "DIM Dimmer Level Command Query"
  kind: query
  query_command: "QSTN"

- id: slp_query
  label: "SLP Sleep Set Command Query"
  kind: query
  query_command: "QSTN"

- id: spl_query
  label: "SPL Speaker Layout Command Query"
  kind: query
  query_command: "QSTN"

- id: tfr_query
  label: "TFR Tone (Front) Command Query"
  kind: query
  query_command: "QSTN"

- id: tct_query
  label: "TCT Tone (Center) Command Query"
  kind: query
  query_command: "QSTN"

- id: tsr_query
  label: "TSR Tone (Surround) Command Query"
  kind: query
  query_command: "QSTN"

- id: tsb_query
  label: "TSB Tone (Surround Back) Command Query"
  kind: query
  query_command: "QSTN"

- id: tsw_query
  label: "TSW Tone (Subwoofer) Command Query"
  kind: query
  query_command: "QSTN"

- id: swl_query
  label: "SWL Subwoofer (temporary) Level Command Query"
  kind: query
  query_command: "QSTN"

- id: ctl_query
  label: "CTL Center (temporary) Level Command Query"
  kind: query
  query_command: "QSTN"

- id: dif_query
  label: "DIF Display Mode Command Query"
  kind: query
  query_command: "QSTN"

- id: ifa_query
  label: "IFA Audio Information Command Query"
  kind: query
  query_command: "QSTN"

- id: ifv_query
  label: "IFV Video Information Command Query"
  kind: query
  query_command: "QSTN"

- id: slr_query
  label: "SLR RECOUT Selector Command Query"
  kind: query
  query_command: "QSTN"

- id: sla_query
  label: "SLA Audio Selector Command Query"
  kind: query
  query_command: "QSTN"

- id: vos_query
  label: "VOS Video Output Selector (Japanese Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hdo_query
  label: "HDO HDMI Output Selector Query"
  kind: query
  query_command: "QSTN"

- id: res_query
  label: "RES Monitor Out Resolution Query"
  kind: query
  query_command: "QSTN"

- id: isf_query
  label: "ISF ISF Mode Query"
  kind: query
  query_command: "QSTN"

- id: ras_query
  label: "RAS Re-EQ/Academy Filter Command Query"
  kind: query
  query_command: "QSTN"

- id: ady_query
  label: "ADY Audyssey 2EQ/MultEQ/MultEQ XT Query"
  kind: query
  query_command: "QSTN"

- id: adq_query
  label: "ADQ Audyssey Dynamic EQ Query"
  kind: query
  query_command: "QSTN"

- id: adv_query
  label: "ADV Audyssey Dynamic Volume Query"
  kind: query
  query_command: "QSTN"

- id: dvl_query
  label: "DVL Dolby Volume Query"
  kind: query
  query_command: "QSTN"

- id: mot_query
  label: "MOT Music Optimizer Query"
  kind: query
  query_command: "QSTN"

- id: tun_query
  label: "TUN Tuning Command (Include Tuner Pack Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: prs_query
  label: "PRS Preset Command (Include Tuner Pack Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: xcn_query
  label: "XCN XM Channel Name Info (XM Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: xat_query
  label: "XAT XM Artist Name Info (XM Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: xti_query
  label: "XTI XM Title Info (XM Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: xch_query
  label: "XCH XM Channel Number Command (XM Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: xct_query
  label: "XCT XM Category Command (XM Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: scn_query
  label: "SCN SIRIUS Channel Name Info (SIRIUS Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: sat_query
  label: "SAT SIRIUS Artist Name Info (SIRIUS Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: sti_query
  label: "STI SIRIUS Title Info (SIRIUS Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: sch_query
  label: "SCH SIRIUS Channel Number Command (SIRIUS Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: sct_query
  label: "SCT SIRIUS Category Command (SIRIUS Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hat_query
  label: "HAT HD Radio Artist Name Info (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hcn_query
  label: "HCN HD Radio Channel Name Info (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hti_query
  label: "HTI HD Radio Title Info (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hds_query
  label: "HDS HD Radio Detail Info (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hpr_query
  label: "HPR HD Radio Channel Program Command (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hbl_query
  label: "HBL HD Radio Blend Mode Command (HD Radio Model Only) Query"
  kind: query
  query_command: "QSTN"

- id: hts_query
  label: "HTS HD Radio Tuner Status (HD Radio Model Only) Query"
  kind: query
  query_command: "mmnnoo"

- id: nat_query
  label: "NAT Net/USB Artist Name Info Query"
  kind: query
  query_command: "QSTN"

- id: nal_query
  label: "NAL Net/USB Album Name Info Query"
  kind: query
  query_command: "QSTN"

- id: nti_query
  label: "NTI Net/USB Title Name Query"
  kind: query
  query_command: "QSTN"

- id: ntm_query
  label: "NTM Net/USB Time Info Query"
  kind: query
  query_command: "QSTN"

- id: ntr_query
  label: "NTR Net/USB Track Info Query"
  kind: query
  query_command: "QSTN"

- id: nst_query
  label: "NST Net/USB Play Status Query"
  kind: query
  query_command: "prs"

- id: zpw_query
  label: "ZPW Zone2 Power Command Query"
  kind: query
  query_command: "QSTN"

- id: zmt_query
  label: "ZMT Zone2 Muting Command Query"
  kind: query
  query_command: "QSTN"

- id: zvl_query
  label: "ZVL Zone2 Volume Command Query"
  kind: query
  query_command: "QSTN"

- id: ztn_query
  label: "ZTN Zone2 Tone Command Query"
  kind: query
  query_command: "QSTN"

- id: zbl_query
  label: "ZBL Zone2 Balance Command Query"
  kind: query
  query_command: "QSTN"

- id: tuz_query
  label: "TUZ Zone2 Tuning Command Query"
  kind: query
  query_command: "QSTN"

- id: pw3_query
  label: "PW3 Zone3 Power Command Query"
  kind: query
  query_command: "QSTN"

- id: mt3_query
  label: "MT3 Zone3 Muting Command Query"
  kind: query
  query_command: "QSTN"

- id: vl3_query
  label: "VL3 Zone3 Volume Command Query"
  kind: query
  query_command: "QSTN"

- id: tn3_query
  label: "TN3 Zone3 Tone Command Query"
  kind: query
  query_command: "QSTN"

- id: bl3_query
  label: "BL3 Zone3 Balance Command Query"
  kind: query
  query_command: "QSTN"

- id: sl3_query
  label: "SL3 ZONE3 Selector Command Query"
  kind: query
  query_command: "QSTN"

- id: tu3_query
  label: "TU3 Zone3 Tuning Command Query"
  kind: query
  query_command: "QSTN"

- id: pw4_query
  label: "PW4 Zone4 Power Command Query"
  kind: query
  query_command: "QSTN"

- id: mt4_query
  label: "MT4 Zone4 Muting Command Query"
  kind: query
  query_command: "QSTN"

- id: vl4_query
  label: "VL4 Zone4 Volume Command Query"
  kind: query
  query_command: "QSTN"

- id: sl4_query
  label: "SL4 ZONE4 Selector Command Query"
  kind: query
  query_command: "QSTN"

- id: tu4_query
  label: "TU4 Zone4 Tuning Command Query"
  kind: query
  query_command: "QSTN"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
# All documented state changes are discrete actions (see Actions). No standalone settable
# parameters beyond action-driven state.
```

## Events
```yaml
# Source Section 2.1 / 2.3 describes unsolicited "Status Message" notifications sent by
# the Receiver on state change, and Section 1.2 notes that notification requires a held
# TCP connection. Format follows the ISCP message envelope (`!1SST...` style) but the
# source does not enumerate a complete event catalogue.
#
# UNRESOLVED: no per-event payload list in source beyond exemplar `!1SST00[EOF]`
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
# Source documents no multi-step sequences as macros. FF/REW Net-tune commands must be
# sent continuously with <100ms inter-message delay (source: NTC command note).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. The 12V triggers (TGA/TGB/TGC) are gated by a
# setup-menu pre-condition: "TGA/TGB/TGC are available when each 12V Trigger parameter
# is all 'OFF' at Setup Menu." This is configuration gating, not a safety interlock.
```

## Notes

**Protocol identity.** ISCP frame is `!` (start) + `1` (unit type, Receiver = "1") + 3-char command mnemonic + variable-length parameter + terminator. RS-232 messages end in `[CR]`, `[LF]`, or `[CR][LF]`. eISCP messages end in `[EOF]`, `[EOF][CR]`, or `[EOF][CR][LF]`.

**Transport choice.**
- RS-232C: 9-pin female D, straight-thru cable, 9600/8/N/1, no flow control. Pin 2 TX, pin 3 RX, pin 5 GND (per source).
- eISCP/TCP: default destination port 60128; user-configurable 49152-65535 via receiver setup menu (requires standby cycle after change). MAC address must be read from receiver setup menu.

**eISCP framing.** 16-byte header (Header Size = 0x00000010), big-endian Data Size, version 0x01, reserved 0x000000. Connection must be held continuously to receive unsolicited status notifications — only one TCP client connection supported.

**Timing.**
- RS-232 Receiver response window: 50msec (Section 2.1). No response within 50ms = failed communication.
- eISCP inter-message interval: ≥50msec.
- Net-tune FF/REW: continuous codes with ≤100ms inter-message delay.

**Command enumeration rule applied.** Each distinct source row becomes one action — `STBY15M`-style variants, per-zone commands (Z2/Z3/Z4), per-tone-channel (TFR/TCT/TSR/TSB/TSW), and `QSTN` queries are all separate actions/feedbacks per the source tables. Parameter ranges (e.g. `MV00`-`MV64`) collapse into one parameterized action; each `UP`/`DOWN`/`TG`/`QSTN` row stays separate.

**Naming collision note.** `DIF` appears twice in source (Display Information Command and Display Mode Command) — both use mnemonic `DIF`. The `dif_set` action corresponds to Display Mode (which has `QSTN`); Display Information codes (00-04) are catalogued separately by the deterministic pre-pass.

**Conditional availability.**
- VOS (Video Output Selector): "Japanese Model Only" per source heading.
- TGA/TGB/TGC 12V triggers: gated by Setup Menu state.
- TUN/PRS/RDS/PTS/TPS: Tuner Pack Model Only.
- XCN/XAT/XTI/XCH/XCT: XM Model Only.
- SCN/SAT/STI/SCH/SCT/SLK: SIRIUS Model Only.
- HAT/HCN/HTI/HDS/HPR/HBL/HTS: HD Radio Model Only.
- NTC/NAT/NAL/NTI/NTM/NTR/NST/NPR: Net-Tune / Network Model dependency varies by receiver generation.
- SL3/SL4 codes 31 (XM) and 32 (SIRIUS): only on XM/SIRIUS-equipped models.

**Tuner sharing.** MAIN and ZONE share the physical TUNER/XM/SIRIUS/HD Radio source — control is separated per zone but RF path is shared.

**Zone 2 caveat.** ZVL (Zone2 Volume) only works when MAIN is ON, per source footnote.

**Receiver as unit type.** Unit Type byte in the ISCP message header is "1" for Receiver category. This spec is Receiver-category; other Integra/Onkyo unit types use other unit-type codes (out of scope for DTC-9.8).

<!-- UNRESOLVED: fields that could not be determined from the source, with explanation.
- Firmware version compatibility range (no firmware matrix in source).
- Authentication/credentials (no login mechanism described; inferred `none`).
- Voltage/current/power specifications (not in source).
- Fault behavior or error recovery sequences beyond the 50ms timeout.
- eISCP TCP keepalive / idle-disconnect behavior (not stated).
- Complete unsolicited notification message catalogue (only behavior described, not enumerated).
- Encryption / TLS for eISCP (source describes plain TCP; no TLS mentioned).
-->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-06-25T09:46:01.428Z
last_checked_at: 2026-06-25T10:29:04.353Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T10:29:04.353Z
matched_actions: 160
action_count: 160
confidence: medium
summary: "deterministic presence proof: 160/160 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "populate from source, or remove section if not applicable"
- "no per-event payload list in source beyond exemplar `!1SST00[EOF]"
- "source contains no explicit safety warnings, interlock procedures, or"
- "fields that could not be determined from the source, with explanation."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
