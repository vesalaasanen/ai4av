---
spec_id: admin/phabrix-lv7300-rasterizer
schema_version: ai4av-public-spec-v1
revision: 1
title: "Phabrix LV7300 Rasterizer Control Spec"
manufacturer: Phabrix
model_family: LV7300
aliases: []
compatible_with:
  manufacturers:
    - Phabrix
  models:
    - LV7300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - leaderphabrix.com
source_urls:
  - https://leaderphabrix.com/wp-content/uploads/2024/04/LV5300A_LV5350_LV7300-Instruction-Manual-Ver.19.pdf
  - https://leaderphabrix.com/SoftwareDownloads/Leader/lv5300a_5350_7300_e_v27_fw85.pdf
  - https://leaderphabrix.com/SoftwareDownloads/Leader/spec_lv5300a_5350_7300_e_v5.pdf
retrieved_at: 2026-08-11T01:25:54.258Z
last_checked_at: 2026-08-19T09:42:36.481Z
generated_at: 2026-08-19T09:42:36.481Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The requested \"Known protocol: RS-232C\" is NOT supported by the source."
  - "No RS-232C serial connector, baud rate, serial command syntax, or byte-level protocol appears anywhere in the source."
  - "The \"Remote Connector\" (rear panel) is a 15-pin D-sub LV-TTL level parallel/GPI control (0–5 V DC, low active), NOT an RS-232C serial port."
  - "TELNET command-control strings are referenced (\"Command control, status query\") but the actual command syntax / mnemonic table is not present in this excerpt."
  - "FTP is mentioned (file transfer) but no FTP command sequence is documented."
  - "TELNET port not stated in source (do not assume 23)"
  - "SNMP manager/listener UDP port not stated in source"
  - "FTP port not stated in source (do not assume 21)"
  - "HTTP web server authentication, if any, not stated in source."
  - "TELNET login / password procedure not documented in this excerpt."
  - "precise HTTP query-string / form parameters for each panel-key button are"
  - "l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40pictureTBL(5) leaf tables are"
  - "picture/status/eye/audio table variables not in this excerpt."
  - "specific enterprise TRAP OIDs / varbind lists not enumerated in excerpt."
  - "no multi-step command sequences documented in this excerpt."
  - "no operator-commanded safety interlock or power-on sequencing procedure documented."
  - "\"Known protocol: RS-232C\" supplied as input metadata is not corroborated by this source — no RS-232C connector, baud rate, or serial command syntax appears anywhere. Treat serial control as unverified; do not implement from this spec."
  - "TELNET command-control mnemonic table (referenced as \"Command control, status query\") is not present in this excerpt."
  - "FTP command sequences not documented."
  - "enterprise MIB sub-tables l40pictureTBL(5), l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40trapTBL(9) leaf rows not present in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:42:36.481Z
  matched_actions: 161
  action_count: 161
  confidence: medium
  summary: "All 158 SNMP R/W MIB leaves and 3 HTTP tab selectors verified against source §19.5.4 enterprise MIB and §19.4 HTTP server; transport verified. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Phabrix LV7300 Rasterizer Control Spec

## Summary
The LV7300 is a broadcast SDI waveform monitor / rasterizer supporting SD, HD, 3G, 6G, and 12G-SDI signal analysis (video waveform, vector, CIE, picture, audio, eye, status). This spec covers its Ethernet-based remote control surface: SNMP v2 enterprise MIB (UDP), HTTP web server, and TELNET command control. The device is marketed under both the Phabrix and LEADER ELECTRONICS CORP. brands; the source document is branded LEADER and references model LV7300.

<!-- UNRESOLVED: The requested "Known protocol: RS-232C" is NOT supported by the source. -->
<!-- UNRESOLVED: No RS-232C serial connector, baud rate, serial command syntax, or byte-level protocol appears anywhere in the source. -->
<!-- UNRESOLVED: The "Remote Connector" (rear panel) is a 15-pin D-sub LV-TTL level parallel/GPI control (0–5 V DC, low active), NOT an RS-232C serial port. -->
<!-- UNRESOLVED: TELNET command-control strings are referenced ("Command control, status query") but the actual command syntax / mnemonic table is not present in this excerpt. -->
<!-- UNRESOLVED: FTP is mentioned (file transfer) but no FTP command sequence is documented. -->

## Transport
```yaml
# Source documents an Ethernet (RJ-45, IEEE 802.3, 10/100/1000Base-T) control surface only.
# Protocols observed in source: TELNET (command control), FTP (file transfer), SNMP v2
# (command control + alarm query), HTTP (web remote monitoring/control), SNTP (clock sync).
# NO serial / RS-232C transport is documented.
protocols:
  - http    # HTTP web server, port 8080 (explicitly stated)
  - udp     # SNMP v2 over UDP (enterprise MIB)
  - tcp     # TELNET command control + FTP file transfer (ports not stated)

addressing:
  port: 8080  # HTTP server port, explicitly stated ("http://(IP address):8080")
  # UNRESOLVED: TELNET port not stated in source (do not assume 23)
  # UNRESOLVED: SNMP manager/listener UDP port not stated in source
  # UNRESOLVED: FTP port not stated in source (do not assume 21)

auth:
  type: community  # SNMP v2 community-string auth (explicitly documented)
  # HTTP server: no auth procedure described for the web interface.
  community:
    read_only: LDRUser   # default ReadOnly community (explicitly stated)
    read_write: LDRAdm   # default ReadWrite community (explicitly stated)
    trap: LDRUser        # default TRAP community (explicitly stated; not user-changeable)
  # UNRESOLVED: HTTP web server authentication, if any, not stated in source.
  # UNRESOLVED: TELNET login / password procedure not documented in this excerpt.
```

## Traits
```yaml
# Inferred from documented SNMP R/W control OIDs and HTTP control surface.
- powerable      # inferred: device power-down on overheat documented; no direct power OID in excerpt
- queryable      # inferred: extensive R/O status OIDs (firmware, datetime, 5-bar data, standard MIBs)
- levelable      # inferred: gain/intensity/scale numeric settables documented (wfm/vector)
```

## Actions
```yaml
# ==========================================================================
# COMMAND SURFACE = SNMP v2 enterprise MIB SET operations + HTTP web buttons.
# Enterprise OID prefix: iso(1).org(3).dod(6).internet(1).private(4).enterprises(1).leader(20111).lv5300(40)
# Numeric prefix: 1.3.6.1.4.1.20111.40   (symbolic node "lv5300" applies to LV7300 per source note)
# Each R/W leaf OID below is a documented command-bearing entry. Payload = OID + INTEGER value.
# Source: §19.5.4 Enterprise MIB tables (R/W rows). HTTP buttons mirror panel keys (§19.4.4/19.4.5).
# All enumerations are quoted VERBATIM from the source MIB value-mapping column.
# ==========================================================================

# --- l40basicTBL(1): input / preset / capture control ---
- id: select_input_channel
  label: Select Input Channel
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.1.1.0"   # l40basInputCh
  params:
    - name: value
      type: integer
      enum: {1: a, 2: b}

- id: set_simul_display
  label: Set Simul Display
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.1.2.0"   # l40basInputSimul
  params:
    - name: value
      type: integer
      enum: {1: "off", 2: "on"}

- id: set_input_operate
  label: Set Input Operate Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.1.3.0"   # l40basInputOperate
  params:
    - name: value
      type: integer
      enum: {1: com, 2: individual}

- id: set_ext_ref
  label: Set External Reference
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.1.4.0"   # l40basInputExtref
  params:
    - name: value
      type: integer
      enum: {1: int, 2: ext}

- id: preset_store
  label: Store Preset
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.4.1.0"   # l40basPresetStore
  params:
    - name: value
      type: integer
      range: [1, 60]

- id: preset_delete
  label: Delete Preset
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.4.2.0"   # l40basPresetDelete
  params:
    - name: value
      type: integer
      range: [1, 60]

- id: preset_recall
  label: Recall Preset
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.4.5.0"   # l40basPresetRecall
  params:
    - name: value
      type: integer
      range: [1, 60]

- id: capture_mode
  label: Set Capture Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.5.1.0"   # l40basCaptureMode
  params:
    - name: value
      type: integer
      enum: {1: screen}

- id: capture_display
  label: Set Capture Display
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.5.4.0"   # l40basCaptureDisplay
  params:
    - name: value
      type: integer
      enum: {1: real, 3: both, 4: hold}

- id: capture_file_bmp
  label: Set Capture BMP File Save
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.5.5.0"   # l40basCaptureFileBmp
  params:
    - name: value
      type: integer
      enum: {1: "off", 2: "on"}

- id: capture_file_bsg
  label: Set Capture BSG File Save
  kind: action
  command: "1.3.6.1.4.1.20111.40.1.5.6.0"   # l40basCaptureFileBsg
  params:
    - name: value
      type: integer
      enum: {1: "off", 2: "on"}

# --- l40systemTBL(2): SDI system / colorimetry / HDR ---
- id: set_sdi_system
  label: Set SDI System
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.1.1.0"   # l40sysSdiIn
  params:
    - name: value
      type: integer
      enum: {2: sys-4k-3g-dlink, 4: sys-single-link, 8: sys-4k-12g, 9: sys-4k-6g}

- id: set_colorimetry
  label: Set Colorimetry
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.1.2.0"   # l40sysSdiColorimetry
  params:
    - name: value
      type: integer
      enum: {1: pid, 2: bt709, 3: bt2020, 4: dci}

# HDR mode per input (A/B/C/D) - 4 distinct documented rows
- id: set_hdr_mode_a
  label: Set HDR Mode Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.1.0"   # l40sysHdrInputAMode
  params: [{name: value, type: integer, enum: {1: "off", 2: hlg, 3: pq, 4: slog3, 5: c-log, 6: log-c}}]
- id: set_hdr_mode_b
  label: Set HDR Mode Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.2.0"   # l40sysHdrInputBMode
  params: [{name: value, type: integer, enum: {1: "off", 2: hlg, 3: pq, 4: slog3, 5: c-log, 6: log-c}}]
- id: set_hdr_mode_c
  label: Set HDR Mode Input C
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.3.0"   # l40sysHdrInputCMode
  params: [{name: value, type: integer, enum: {1: "off", 2: hlg, 3: pq, 4: slog3, 5: c-log, 6: log-c}}]
- id: set_hdr_mode_d
  label: Set HDR Mode Input D
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.4.0"   # l40sysHdrInputDMode
  params: [{name: value, type: integer, enum: {1: "off", 2: hlg, 3: pq, 4: slog3, 5: c-log, 6: log-c}}]

# HDR system gamma per input (A/B/C/D)
- id: set_hdr_sysgamma_a
  label: Set HDR System Gamma Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.5.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_sysgamma_b
  label: Set HDR System Gamma Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.6.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_sysgamma_c
  label: Set HDR System Gamma Input C
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.7.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_sysgamma_d
  label: Set HDR System Gamma Input D
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.8.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

# HDR HLG scale per input (A/B/C/D) - source labels "1=off, 2=on"
- id: set_hdr_hlgscale_a
  label: Set HDR HLG Scale Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.9.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_hlgscale_b
  label: Set HDR HLG Scale Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.10.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_hlgscale_c
  label: Set HDR HLG Scale Input C
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.11.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_hlgscale_d
  label: Set HDR HLG Scale Input D
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.12.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

# HDR range per input (A/B/C/D)
- id: set_hdr_range_a
  label: Set HDR Range Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.13.0"
  params: [{name: value, type: integer, enum: {1: narrow, 2: full}}]
- id: set_hdr_range_b
  label: Set HDR Range Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.14.0"
  params: [{name: value, type: integer, enum: {1: narrow, 2: full}}]
- id: set_hdr_range_c
  label: Set HDR Range Input C
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.15.0"
  params: [{name: value, type: integer, enum: {1: narrow, 2: full}}]
- id: set_hdr_range_d
  label: Set HDR Range Input D
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.16.0"
  params: [{name: value, type: integer, enum: {1: narrow, 2: full}}]

# HDR EI per input (A/B/C/D)
- id: set_hdr_ei_a
  label: Set HDR EI Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.17.0"
  params: [{name: value, type: integer, enum: {1: ei-200, 2: ei-400, 3: ei-800, 4: ei-1600}}]
- id: set_hdr_ei_b
  label: Set HDR EI Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.18.0"
  params: [{name: value, type: integer, enum: {1: ei-200, 2: ei-400, 3: ei-800, 4: ei-1600}}]
- id: set_hdr_ei_c
  label: Set HDR EI Input C
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.19.0"
  params: [{name: value, type: integer, enum: {1: ei-200, 2: ei-400, 3: ei-800, 4: ei-1600}}]
- id: set_hdr_ei_d
  label: Set HDR EI Input D
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.20.0"
  params: [{name: value, type: integer, enum: {1: ei-200, 2: ei-400, 3: ei-800, 4: ei-1600}}]

# HDR detect payload ID (A/B documented)
- id: set_hdr_detect_payloadid_a
  label: Set HDR Detect Payload ID Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.21.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: set_hdr_detect_payloadid_b
  label: Set HDR Detect Payload ID Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.22.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

# HDR reference level HLG / PQ (A/B documented)
- id: set_hdr_reflv_hlg_a
  label: Set HDR Reference Level HLG Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.25.0"
  params: [{name: value, type: integer, enum: {1: reflv-50-per, 2: reflv-75-per}}]
- id: set_hdr_reflv_hlg_b
  label: Set HDR Reference Level HLG Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.26.0"
  params: [{name: value, type: integer, enum: {1: reflv-50-per, 2: reflv-75-per}}]
- id: set_hdr_reflv_pq_a
  label: Set HDR Reference Level PQ Input A
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.29.0"
  params: [{name: value, type: integer, enum: {1: reflv-51-per, 2: reflv-58-per}}]
- id: set_hdr_reflv_pq_b
  label: Set HDR Reference Level PQ Input B
  kind: action
  command: "1.3.6.1.4.1.20111.40.2.4.30.0"
  params: [{name: value, type: integer, enum: {1: reflv-51-per, 2: reflv-58-per}}]

# --- l40wfmTBL(3): waveform display control ---
- id: wfm_set_mode
  label: Set WFM Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.1.0"   # l40wfmModeMode
  params: [{name: value, type: integer, enum: {1: parade, 2: overlay}}]

# WFM channel on/off - 14 distinct documented channel rows (Ch1Y..Ch3Z)
- id: wfm_ch1y
  label: WFM Channel 1 Y On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.2.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch2cb
  label: WFM Channel 2 Cb On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch3cr
  label: WFM Channel 3 Cr On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.4.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch1g
  label: WFM Channel 1 G On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.5.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch2b
  label: WFM Channel 2 B On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.6.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch3r
  label: WFM Channel 3 R On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.7.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch1r
  label: WFM Channel 1 R On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.8.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch2g
  label: WFM Channel 2 G On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.9.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch3b
  label: WFM Channel 3 B On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.10.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch1x
  label: WFM Channel 1 X On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.13.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch2y
  label: WFM Channel 2 Y On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.14.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_ch3z
  label: WFM Channel 3 Z On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.1.15.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

- id: wfm_set_intensity
  label: Set WFM Intensity
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.2.1.0"   # l40wfmInten
  params: [{name: value, type: integer, range: [-128, 127]}]
- id: wfm_set_color
  label: Set WFM Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.2.2.0"   # l40wfmColor
  params: [{name: value, type: integer, enum: {1: white, 2: yellow, 3: cyan, 4: green, 5: magenta, 6: red, 7: blue, 8: multi}}]

- id: wfm_set_scale_inten
  label: Set WFM Scale Intensity
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.1.0"
  params: [{name: value, type: integer, range: [-8, 7]}]
- id: wfm_set_scale_color
  label: Set WFM Scale Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.2.0"
  params: [{name: value, type: integer, enum: {1: white, 2: yellow, 3: cyan, 4: green, 5: magenta, 6: red, 7: blue}}]
- id: wfm_set_scale_unit
  label: Set WFM Scale Unit
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.3.0"
  params: [{name: value, type: integer, enum: {1: unit-hdv-sdp, 2: unit-hdv-sdv, 3: unit-hdp-sdp, 4: unit-cv-dec, 5: unit-cv-hex}}]
- id: wfm_set_scale_unit_ntsc
  label: Set WFM Scale Unit (NTSC)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.4.0"
  params: [{name: value, type: integer, enum: {3: unit-hdp-sdp}}]
- id: wfm_set_scale_unit_pal
  label: Set WFM Scale Unit (PAL)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.5.0"
  params: [{name: value, type: integer, enum: {2: unit-hdv-sdv}}]
- id: wfm_set_scale_unit_fullrange
  label: Set WFM Scale Unit Full Range
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.6.0"
  params: [{name: value, type: integer, enum: {3: unit-hdp-sdp, 4: unit-cv-dec, 5: unit-cv-hex}}]
- id: wfm_set_scale_75p
  label: Set WFM 75% Color Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.7.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_set_scale_display
  label: Set WFM Scale Display
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.1.3.8.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: main, 3: hdr, 4: both}}]

- id: wfm_set_gain_var
  label: Set WFM Gain Variable
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.1.0"
  params: [{name: value, type: integer, enum: {1: cal, 2: variable}}]
- id: wfm_set_gain_mag
  label: Set WFM Gain Magnification
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.2.0"
  params: [{name: value, type: integer, enum: {1: x1, 2: x5, 3: x10}}]
- id: wfm_set_gain_value
  label: Set WFM Gain Value
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.3.0"
  params: [{name: value, type: string, description: "0.2 to 2.000"}]
- id: wfm_set_gain_filter
  label: Set WFM Filter
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.4.0"
  params: [{name: value, type: integer, enum: {1: lowpass, 2: flat}}]
- id: wfm_set_gain_filter_cmp
  label: Set WFM Filter (Composite)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.5.0"
  params: [{name: value, type: integer, enum: {2: flat, 3: lum, 4: flatlum, 5: lumchroma}}]
- id: wfm_set_scale_jump
  label: Set WFM Scale Jump
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.2.6.0"
  params: [{name: value, type: integer, enum: {1: pos-0, 2: pos-10, 3: pos-20, 4: pos-30, 5: pos-40, 6: pos-50, 7: pos-60, 8: pos-70, 9: pos-80, 10: pos-90, 11: pos-100, 12: cursor}}]

- id: wfm_set_sweep
  label: Set WFM Sweep
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.1.0"
  params: [{name: value, type: integer, enum: {1: h, 2: v}}]
- id: wfm_set_sweep_mag_h
  label: Set WFM Sweep Mag (H)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.2.0"
  params: [{name: value, type: integer, enum: {1: x1, 2: x10, 3: x20, 4: blank, 5: active}}]
- id: wfm_set_sweep_mag_v
  label: Set WFM Sweep Mag (V)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.3.0"
  params: [{name: value, type: integer, enum: {1: x1, 2: x20, 3: x40}}]
- id: wfm_set_sweep_h
  label: Set WFM H Sweep
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.4.0"
  params: [{name: value, type: integer, enum: {1: sweep-1h, 2: sweep-2h}}]
- id: wfm_set_sweep_v
  label: Set WFM V Sweep
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.5.0"
  params: [{name: value, type: integer, enum: {1: sweep-1v, 2: sweep-2v}}]
- id: wfm_set_sweep_field
  label: Set WFM Sweep Field
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.6.0"
  params: [{name: value, type: integer, enum: {1: field1, 2: field2}}]
- id: wfm_set_blanking
  label: Set WFM Blanking
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.7.0"
  params: [{name: value, type: integer, enum: {1: remove, 2: v, 3: h, 4: all}}]
- id: wfm_set_blanking_cmp
  label: Set WFM Blanking (Composite)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.3.8.0"
  params: [{name: value, type: integer, enum: {1: remove, 2: v}}]

- id: wfm_set_matrix
  label: Set WFM Color Matrix
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.1.0"
  params: [{name: value, type: integer, enum: {1: ycbcr, 2: gbr, 3: rgb, 4: composite}}]
- id: wfm_set_matrix_rgb
  label: Set WFM Matrix RGB
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.2.0"
  params: [{name: value, type: integer, enum: {2: gbr, 3: rgb, 4: composite}}]
- id: wfm_set_matrix_ygbr
  label: Set WFM YGBR On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_set_matrix_yrgb
  label: Set WFM YRGB On/Off
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.4.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: wfm_set_cmp_format
  label: Set WFM Composite Format
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.5.0"
  params: [{name: value, type: integer, enum: {1: auto, 2: ntsc, 3: pal}}]
- id: wfm_set_cmp_setup
  label: Set WFM Composite Setup
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.6.0"
  params: [{name: value, type: integer, enum: {1: setup-0p, 2: setup-75p}}]
- id: wfm_set_matrix_xyz
  label: Set WFM Matrix XYZ
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.4.7.0"
  params: [{name: value, type: integer, enum: {2: gbr, 3: rgb, 4: composite, 5: xyz}}]

- id: wfm_set_cursor_mode
  label: Set WFM Cursor Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.1.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: single, 3: both}}]
- id: wfm_set_cursor_sel
  label: Set WFM Cursor Select
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.2.0"
  params: [{name: value, type: integer, enum: {1: x, 2: y}}]
- id: wfm_set_cursor_unit_x
  label: Set WFM Cursor Unit X
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.3.0"
  params: [{name: value, type: integer, enum: {1: sec, 2: hz}}]
- id: wfm_set_cursor_unit_y
  label: Set WFM Cursor Unit Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.4.0"
  params: [{name: value, type: integer, enum: {1: mv, 2: per, 3: r-per, 4: dec, 5: hex, 6: hdr}}]
- id: wfm_set_cursor_unit_y_cmp
  label: Set WFM Cursor Unit Y (Composite)
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.5.0"
  params: [{name: value, type: integer, enum: {1: mv, 2: per, 3: r-per}}]
- id: wfm_set_cursor_refset
  label: Set WFM Cursor REF SET
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.6.0"
  params: [{name: value, type: integer, enum: {1: fixed}}]
- id: wfm_set_cursor_ref_x
  label: Set WFM Cursor REF X
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.7.0"
  params: [{name: value, type: integer, range: [0, 927]}]
- id: wfm_set_cursor_delta_x
  label: Set WFM Cursor DELTA X
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.8.0"
  params: [{name: value, type: integer, range: [0, 927]}]
- id: wfm_set_cursor_track_x
  label: Set WFM Cursor TRACK X
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.9.0"
  params: [{name: value, type: integer, range: [-927, 927]}]
- id: wfm_set_cursor_ref_y
  label: Set WFM Cursor REF Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.10.0"
  params: [{name: value, type: integer, range: [-5000, 15000]}]
- id: wfm_set_cursor_delta_y
  label: Set WFM Cursor DELTA Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.11.0"
  params: [{name: value, type: integer, range: [-5000, 15000]}]
- id: wfm_set_cursor_track_y
  label: Set WFM Cursor TRACK Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.5.12.0"
  params: [{name: value, type: integer, range: [-15000, 15000]}]

- id: wfm_set_linesel
  label: Set WFM Line Select
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.6.1.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on", 3: cinelite}}]
- id: wfm_set_linesel_no
  label: Set WFM Line Select Number
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.6.2.0"
  params: [{name: value, type: integer, range: [0, 32767]}]
- id: wfm_set_linesel_field
  label: Set WFM Line Select Field
  kind: action
  command: "1.3.6.1.4.1.20111.40.3.6.3.0"
  params: [{name: value, type: integer, enum: {1: frame, 2: field1, 3: field2}}]

# --- l40vectorTBL(4): vector / 5bar / histogram / CIE display control ---
- id: vector_set_disp_mode
  label: Set Vector Display Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.1.1.0"
  params: [{name: value, type: integer, enum: {1: vector, 2: fivebar, 3: histogram, 4: cie-diagram}}]
- id: vector_set_inten
  label: Set Vector Intensity
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.1.2.0"
  params: [{name: value, type: integer, range: [-128, 127]}]
- id: vector_set_color
  label: Set Vector Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.1.3.0"
  params: [{name: value, type: integer, enum: {1: white, 2: yellow, 3: cyan, 4: green, 5: magenta, 6: red, 7: blue}}]
- id: vector_set_vector_mode
  label: Set Vector Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.1.7.0"
  params: [{name: value, type: integer, enum: {1: vector, 2: rgb-vector, 3: ycbcr-vector}}]

- id: vector_set_scale_inten
  label: Set Vector Scale Intensity
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.1.0"
  params: [{name: value, type: integer, range: [-8, 7]}]
- id: vector_set_scale_color
  label: Set Vector Scale Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.2.0"
  params: [{name: value, type: integer, enum: {1: white, 2: yellow, 3: cyan, 4: green, 5: magenta, 6: red, 7: blue}}]
- id: vector_set_scale_iq
  label: Set Vector Scale IQ
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_vector_scale
  label: Set Vector Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.4.0"
  params: [{name: value, type: integer, enum: {1: auto, 2: bt601, 3: bt709, 4: dci, 5: bt2020}}]
- id: vector_set_rgb_adjust_target
  label: Set RGB Vector Adjust Target
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.5.0"
  params: [{name: value, type: integer, enum: {1: gb, 2: gr}}]
- id: vector_set_rgb_adjust_pos_h
  label: Set RGB Vector Adjust Position H
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.6.0"
  params: [{name: value, type: integer, range: [-500, 500]}]
- id: vector_set_rgb_adjust_pos_v
  label: Set RGB Vector Adjust Position V
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.7.0"
  params: [{name: value, type: integer, range: [-500, 500]}]
- id: vector_set_ycbcr_timing_marker
  label: Set YCbCr Vector Timing Marker
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.8.0"
  params: [{name: value, type: integer, enum: {1: auto, 2: hd, 3: sd}}]
- id: vector_set_ycbcr_vector_scale
  label: Set YCbCr Vector Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.9.0"
  params: [{name: value, type: integer, enum: {1: auto, 2: bt601, 3: bt709, 4: dci, 5: bt2020}}]
- id: vector_set_variable_scale
  label: Set Vector Variable Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.1.10.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

- id: vector_set_gain_var
  label: Set Vector Gain Variable
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.1.0"
  params: [{name: value, type: integer, enum: {1: cal, 2: variable}}]
- id: vector_set_gain_mag
  label: Set Vector Gain Mag
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.2.0"
  params: [{name: value, type: integer, enum: {1: x1, 2: x5, 3: iq}}]
- id: vector_set_gain_value
  label: Set Vector Gain Value
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.3.0"
  params: [{name: value, type: string, description: "0.2 to 2.000"}]
- id: vector_set_rgb_gain_h
  label: Set RGB Vector Gain H
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.4.0"
  params: [{name: value, type: string, description: "0.2 to 2.000"}]
- id: vector_set_rgb_gain_v
  label: Set RGB Vector Gain V
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.5.0"
  params: [{name: value, type: string, description: "0.2 to 2.000"}]
- id: vector_set_ycbcr_gain_var
  label: Set YCbCr Vector Gain Variable
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.6.0"
  params: [{name: value, type: integer, enum: {1: cal, 2: variable}}]
- id: vector_set_ycbcr_gain_mag
  label: Set YCbCr Vector Gain Mag
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.7.0"
  params: [{name: value, type: integer, enum: {1: x1, 2: x5}}]
- id: vector_set_ycbcr_obs_point
  label: Set YCbCr Vector Observe Point
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.8.0"
  params: [{name: value, type: integer, enum: {1: by-wh, 2: by-yl, 3: by-cy, 4: by-g, 5: by-timing, 6: by-mg, 7: by-r, 8: by-b, 9: bl, 10: ry-b, 11: ry-r, 12: ry-mg, 13: ry-timing, 14: ry-g, 15: ry-cy, 16: ry-yl, 17: ry-wh}}]
- id: vector_set_guide_display
  label: Set Vector Guide Display
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.2.9.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

- id: vector_set_marker
  label: Set Vector Marker
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

- id: vector_set_colorsys_matrix
  label: Set Vector Color System Matrix
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.4.1.0"
  params: [{name: value, type: integer, enum: {1: component, 2: composite}}]
- id: vector_set_colorsys_colorbar
  label: Set Vector Color Bar
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.4.2.0"
  params: [{name: value, type: integer, enum: {1: cb-100p, 2: cb75p}}]
- id: vector_set_colorsys_cmp_format
  label: Set Vector Color System Composite Format
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.4.3.0"
  params: [{name: value, type: integer, enum: {1: auto, 2: ntsc}}]
- id: vector_set_colorsys_setup
  label: Set Vector Color System Setup
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.4.4.0"
  params: [{name: value, type: integer, enum: {1: setup-0p, 2: setup-75p}}]

- id: vector_set_var_mkr_size
  label: Set Vector Variable Marker Size
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.2.5.4.0"
  params: [{name: value, type: integer, range: [5, 10]}]

- id: vector_set_5bar_scale
  label: Set 5-Bar Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.3.1.0"
  params: [{name: value, type: integer, enum: {1: p, 2: mv, 3: hex, 4: dec}}]
- id: vector_set_5bar_seq
  label: Set 5-Bar Sequence
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.3.2.0"
  params: [{name: value, type: integer, enum: {1: gbr, 2: rgb}}]

- id: vector_set_hist_scale
  label: Set Histogram Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.1.0"
  params: [{name: value, type: integer, enum: {1: per, 2: hdr}}]
- id: vector_set_hist_form
  label: Set Histogram Form
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.2.0"
  params: [{name: value, type: integer, enum: {1: single, 2: tile, 3: align_h, 4: align_v}}]
- id: vector_set_hist_setup_y
  label: Set Histogram Setup Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.3.1.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_hist_setup_r
  label: Set Histogram Setup R
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.3.2.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_hist_setup_g
  label: Set Histogram Setup G
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.3.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_hist_setup_b
  label: Set Histogram Setup B
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.4.3.4.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

# CIE chromaticity diagram control - scale subgroup
- id: vector_set_cie_color
  label: Set CIE Background Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.1.0"
  params: [{name: value, type: integer, enum: {1: bg-white, 2: bg-color, 3: bg-black}}]
- id: vector_set_cie_triangle1
  label: Set CIE Triangle 1
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.2.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: bt601-525, 3: bt601-625, 4: bt709, 5: dci, 6: bt2020}}]
- id: vector_set_cie_triangle2
  label: Set CIE Triangle 2
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: bt601-525, 3: bt601-625, 4: bt709, 5: dci, 6: bt2020}}]
- id: vector_set_cie_user_triangle
  label: Set CIE User Triangle
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.4.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: one, 3: two}}]
- id: vector_set_cie_user_primary
  label: Set CIE User Primary Color
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.5.0"
  params: [{name: value, type: integer, enum: {1: g, 2: b, 3: r}}]
- id: vector_set_cie_user_triangle_x
  label: Set CIE User Triangle X
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.6.0"
  params: [{name: value, type: string, description: "0 to 1.000"}]
- id: vector_set_cie_user_triangle_y
  label: Set CIE User Triangle Y
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.7.0"
  params: [{name: value, type: string, description: "0 to 1.000"}]
- id: vector_set_cie_temp_scale
  label: Set CIE Temperature Scale
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.8.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_grid
  label: Set CIE Grid
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.9.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_d65
  label: Set CIE D65
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.10.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_triangle_caption
  label: Set CIE Triangle Caption
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.11.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_whitepoint_label
  label: Set CIE White Point Label
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.1.12.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

# CIE setting subgroup
- id: vector_set_cie_mode
  label: Set CIE Mode
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.1.0"
  params: [{name: value, type: integer, enum: {1: diagram, 2: temp}}]
- id: vector_set_cie_standard
  label: Set CIE Standard
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.2.0"
  params: [{name: value, type: integer, enum: {5: cie1391, 6: cie1976}}]
- id: vector_set_cie_clip
  label: Set CIE Clip
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_filter
  label: Set CIE Filter
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.4.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_manual_setup
  label: Set CIE Manual Setup
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.5.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]
- id: vector_set_cie_colorimetry_setup
  label: Set CIE Colorimetry Setup
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.6.0"
  params: [{name: value, type: integer, enum: {1: "off", 4: bt601-525, 5: bt601-625, 6: bt709, 7: dci, 8: bt2020}}]
- id: vector_set_cie_gamma_setup
  label: Set CIE Gamma Setup
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.2.7.0"
  params: [{name: value, type: string, description: "1.50 to 3.00"}]
- id: vector_set_cie_cursor
  label: Set CIE Cursor
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.5.3.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on"}}]

- id: vector_set_linesel
  label: Set Vector Line Select
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.6.1.0"
  params: [{name: value, type: integer, enum: {1: "off", 2: "on", 3: cinelite}}]
- id: vector_set_linesel_no
  label: Set Vector Line Select Number
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.6.2.0"
  params: [{name: value, type: integer, range: [0, 32767]}]
- id: vector_set_linesel_field
  label: Set Vector Line Select Field
  kind: action
  command: "1.3.6.1.4.1.20111.40.4.6.3.0"
  params: [{name: value, type: integer, enum: {1: frame, 2: field1, 3: field2}}]

# --- HTTP web-server control surface (§19.4.4 / §19.4.5) ---
# HTTP server mirrors front-panel keys via browser buttons. Three documented display modes:
- id: http_select_measurement_display
  label: HTTP - Select MEASUREMENT WITH DISPLAY Tab
  kind: action
  command: "GET http://{host}:8080/  # select 'MEASUREMENT WITH DISPLAY' tab"
  params: []
- id: http_select_remote_control
  label: HTTP - Select REMOTE CONTROL Tab
  kind: action
  command: "GET http://{host}:8080/  # select 'REMOTE CONTROL' tab"
  params: []
- id: http_select_event_log_viewer
  label: HTTP - Select EVENT LOG VIEWER Tab
  kind: action
  command: "GET http://{host}:8080/  # select 'EVENT LOG VIEWER' tab"
  params: []
# UNRESOLVED: precise HTTP query-string / form parameters for each panel-key button are
# not given in the source; only the button labels (SELECT, MEM, V POS, H POS, F•D,
# CAPTURE, MENU CLEAR, SCREEN REFRESH) are documented.
```

## Feedbacks
```yaml
# R/O SNMP leaves (status queries). Prefix 1.3.6.1.4.1.20111.40
- id: system_datetime
  type: string
  query: "1.3.6.1.4.1.20111.40.2.5.1.0"   # l40sysDateTime
- id: firmware_version
  type: string
  query: "1.3.6.1.4.1.20111.40.2.6.1.0"   # l40sysInfoFirmware
- id: ser01_available
  type: enum
  values: [notavailable, available]
  query: "1.3.6.1.4.1.20111.40.2.6.2.0"   # l40sysInfoSer01
- id: ser02_available
  type: enum
  values: [notavailable, available]
  query: "1.3.6.1.4.1.20111.40.2.6.3.0"   # l40sysInfoSer02
- id: fivebar_y_data
  type: string
  query: "1.3.6.1.4.1.20111.40.4.7.1.0"   # l40vector5BarYData (Max/Min)
- id: fivebar_g_data
  type: string
  query: "1.3.6.1.4.1.20111.40.4.7.2.0"   # l40vector5BarGData
- id: fivebar_b_data
  type: string
  query: "1.3.6.1.4.1.20111.40.4.7.3.0"   # l40vector5BarBData
- id: fivebar_r_data
  type: string
  query: "1.3.6.1.4.1.20111.40.4.7.4.0"   # l40vector5BarRData
- id: fivebar_cmp_data
  type: string
  query: "1.3.6.1.4.1.20111.40.4.7.5.0"   # l40vector5BarCmpData
# Standard MIB-II groups (RFC1213) supported R/O: system, interface, ip, icmp, tcp, udp, snmp.
# See §19.5.3 for the full per-leaf R/O list (sysDescr, sysUpTime, ifTable, ipRouteTable, etc.).
# UNRESOLVED: l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40pictureTBL(5) leaf tables are
# referenced in the enterprise MIB structure but their rows are not present in this excerpt.
```

## Variables
```yaml
# Numeric/continuous settables already represented as Actions (range-typed params):
#   wfm intensity (-128..127), wfm scale intensity (-8..7), cursor X/Y positions,
#   gamma setup (1.50..3.00), variable marker size (5..10).
# No additional standalone variables documented in this excerpt.
# UNRESOLVED: picture/status/eye/audio table variables not in this excerpt.
```

## Events
```yaml
# SNMP TRAP notifications (§19.5). Device transmits standard TRAP "coldStart(0)" on startup.
# Enterprise notification table: l40notificationTBL = .40.1.0 (OBJECT IDENTIFIER only; leaf
# definitions not enumerated in this excerpt).
# TRAP destinations configured via l40trapTBL(9): up to 4 manager IPs, each enable/disable.
- id: cold_start_trap
  type: trap
  description: "Standard SNMP coldStart(0) trap sent on instrument start"
- id: format_alarm_trap
  type: trap
  description: "Transmitted on format alarm / various errors / fan malfunction / abnormal internal temperature (per §3.3.8 Alarm Output)"
  # UNRESOLVED: specific enterprise TRAP OIDs / varbind lists not enumerated in excerpt.
```

## Macros
```yaml
# UNRESOLVED: no multi-step command sequences documented in this excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source documents thermal protection behavior (§7.3): rising internal temperature triggers a
# "TEMPERATURE" alarm (yellow), then "OVER HEAT" alarm (red), then automatic power shutdown at
# a specific threshold. This is device-autonomous; no command-side interlock procedure is given.
# UNRESOLVED: no operator-commanded safety interlock or power-on sequencing procedure documented.
```

## Notes
- **Brand / model:** The LV7300 is a product of LEADER ELECTRONICS CORP. (Enterprise Number 20111) and is marketed under both the LEADER and Phabrix brands. The source manual is LEADER-branded; the MIB symbolic root `lv5300` numerically covers LV5300/LV5300A/LV5350/LV7300 — the source explicitly instructs substituting `lv7300` for `lv5300` when reading MIB names on the LV7300.
- **Remote connector is NOT serial:** The rear-panel "Remote Connector" is a 15-pin D-sub (female) carrying LV-TTL-level (low-active, 0–5 V DC, pulled up to +3.3 V) parallel control signals for preset load, input switch, alarm output, and tally — it is a GPI/parallel interface, not RS-232C.
- **TELNET vs LV7290 mutual exclusion:** TELNET server and the dedicated LV7290 remote controller cannot be used simultaneously (§3.3.8 note *4, §7.2.8).
- **HTTP server limitations (§19.4.2):** single concurrent PC connection only; web redraw is slow (1–2 s panel-op lag, 4–10 s measurement-screen response); requires JavaScript + pop-ups enabled; user/enhanced layout (SER26) unavailable via web.
- **Default SNMP communities (§7.2.9):** ReadOnly=`LDRUser`, ReadWrite=`LDRAdm`, TRAP=`LDRUser` (TRAP not user-changeable). ReadOnly/ReadWrite mutable up to 15 chars.
- **HTTP port:** explicitly `8080` (`http://<IP>:8080`).

<!-- UNRESOLVED: "Known protocol: RS-232C" supplied as input metadata is not corroborated by this source — no RS-232C connector, baud rate, or serial command syntax appears anywhere. Treat serial control as unverified; do not implement from this spec. -->
<!-- UNRESOLVED: TELNET command-control mnemonic table (referenced as "Command control, status query") is not present in this excerpt. -->
<!-- UNRESOLVED: FTP command sequences not documented. -->
<!-- UNRESOLVED: enterprise MIB sub-tables l40pictureTBL(5), l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40trapTBL(9) leaf rows not present in this excerpt. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: power supply / voltage / current specs not in this excerpt (Tier 3 — never inferred). -->
````

Spec output complete. Three big caveats above worth flagging directly:

1. **No RS-232C in source.** Input said "Known protocol: RS-232C" — source has zero serial content. Marked UNRESOLVED everywhere. Did NOT invent baud/port. The rear "Remote Connector" is LV-TTL parallel GPI, not serial.
2. **Real control surface = SNMP v2 enterprise MIB (UDP) + HTTP web server (port 8080) + TELNET (TCP).** Enumerated ~120 R/W OID actions verbatim from §19.5.4 MIB tables + HTTP tabs from §19.4.
3. **TELNET command strings, FTP sequences, and picture/status/eye/audio MIB sub-tables absent** from excerpt — all flagged UNRESOLVED.

Suggest: confirm whether a separate RS-232C protocol appendix exists for this device before publishing; if serial control is required, that source doc is missing from the refined excerpt.

## Provenance

```yaml
source_domains:
  - leaderphabrix.com
source_urls:
  - https://leaderphabrix.com/wp-content/uploads/2024/04/LV5300A_LV5350_LV7300-Instruction-Manual-Ver.19.pdf
  - https://leaderphabrix.com/SoftwareDownloads/Leader/lv5300a_5350_7300_e_v27_fw85.pdf
  - https://leaderphabrix.com/SoftwareDownloads/Leader/spec_lv5300a_5350_7300_e_v5.pdf
retrieved_at: 2026-08-11T01:25:54.258Z
last_checked_at: 2026-08-19T09:42:36.481Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:42:36.481Z
matched_actions: 161
action_count: 161
confidence: medium
summary: "All 158 SNMP R/W MIB leaves and 3 HTTP tab selectors verified against source §19.5.4 enterprise MIB and §19.4 HTTP server; transport verified. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The requested \"Known protocol: RS-232C\" is NOT supported by the source."
- "No RS-232C serial connector, baud rate, serial command syntax, or byte-level protocol appears anywhere in the source."
- "The \"Remote Connector\" (rear panel) is a 15-pin D-sub LV-TTL level parallel/GPI control (0–5 V DC, low active), NOT an RS-232C serial port."
- "TELNET command-control strings are referenced (\"Command control, status query\") but the actual command syntax / mnemonic table is not present in this excerpt."
- "FTP is mentioned (file transfer) but no FTP command sequence is documented."
- "TELNET port not stated in source (do not assume 23)"
- "SNMP manager/listener UDP port not stated in source"
- "FTP port not stated in source (do not assume 21)"
- "HTTP web server authentication, if any, not stated in source."
- "TELNET login / password procedure not documented in this excerpt."
- "precise HTTP query-string / form parameters for each panel-key button are"
- "l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40pictureTBL(5) leaf tables are"
- "picture/status/eye/audio table variables not in this excerpt."
- "specific enterprise TRAP OIDs / varbind lists not enumerated in excerpt."
- "no multi-step command sequences documented in this excerpt."
- "no operator-commanded safety interlock or power-on sequencing procedure documented."
- "\"Known protocol: RS-232C\" supplied as input metadata is not corroborated by this source — no RS-232C connector, baud rate, or serial command syntax appears anywhere. Treat serial control as unverified; do not implement from this spec."
- "TELNET command-control mnemonic table (referenced as \"Command control, status query\") is not present in this excerpt."
- "FTP command sequences not documented."
- "enterprise MIB sub-tables l40pictureTBL(5), l40statusTBL(6), l40eyeTBL(7), l40audioTBL(8), l40trapTBL(9) leaf rows not present in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
