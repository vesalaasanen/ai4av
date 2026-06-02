---
spec_id: admin/integra-cdc-34
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra CDC-3.4 Control Spec"
manufacturer: Integra
model_family: CDC-3.4
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - CDC-3.4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:22.333Z
last_checked_at: 2026-06-02T10:14:07.044Z
generated_at: 2026-06-02T10:14:07.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the entity slug \"integra_cdc_34\" refers to a CDC-3.4 CD changer; the provided source document is the ISCP v1.15 AV receiver protocol. All commands below are from the ISCP receiver source verbatim."
  - "entity slug \"integra_cdc_34\" does not match the source document which covers AV receivers, not the CDC-3.4 CD changer. All commands are from the ISCP v1.15 AV receiver source verbatim."
verification:
  verdict: verified
  checked_at: 2026-06-02T10:14:07.044Z
  matched_actions: 815
  action_count: 815
  confidence: medium
  summary: "All 815 spec actions matched verbatim in ISCP v1.15 source; dif_04 label now correctly reads Display Treble Level matching source table row 04; transport confirmed. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Integra CDC-3.4 Control Spec

## Summary
This spec is derived from the Integra Serial Communication Protocol for AV Receiver (ISCP) v1.15 (2009-08-31, ONKYO CORPORATION). The protocol uses ISCP — a 3-character command mnemonic followed by variable-length parameter characters — over RS-232C (9600/8/N/1) and/or Ethernet (eISCP, TCP port 60128). The source covers the full Integra/Onkyo AV receiver command set including main zone amplifier, surround, tuner, RI-bus peripheral (CD, tape, DVD, MD, CD-R, dock), and multi-zone (Zone 2/3/4) commands.

<!-- UNRESOLVED: the entity slug "integra_cdc_34" refers to a CDC-3.4 CD changer; the provided source document is the ISCP v1.15 AV receiver protocol. All commands below are from the ISCP receiver source verbatim. -->

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
  port: 60128
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from PWR power on/off commands
- queryable       # inferred from QSTN query commands throughout
- routable        # inferred from SLI input selector commands
- levelable       # inferred from MVL volume control commands
```

## Actions
```yaml
# --- ISCP message format (RS-232C): !1{CMD}{PARAM}[CR]
# --- ISCP message format (eISCP/TCP): eISCP packet wrapping !1{CMD}{PARAM}[EOF]
# --- All command strings below are the ISCP message body (CMD+PARAM).
# --- Prepend "!1" and append [CR] (RS-232) or [EOF] (eISCP) when sending.

# ============================================================
# PWR — System Power Command
# ============================================================
- id: pwr_standby
  label: System Standby
  kind: action
  command: "PWR00"
  params: []

- id: pwr_on
  label: System On
  kind: action
  command: "PWR01"
  params: []

- id: pwr_query
  label: Get System Power Status
  kind: query
  command: "PWRQSTN"
  params: []

# ============================================================
# AMT — Audio Muting Command
# ============================================================
- id: amt_off
  label: Audio Muting Off
  kind: action
  command: "AMT00"
  params: []

- id: amt_on
  label: Audio Muting On
  kind: action
  command: "AMT01"
  params: []

- id: amt_toggle
  label: Audio Muting Wrap-Around Toggle
  kind: action
  command: "AMTTG"
  params: []

- id: amt_query
  label: Get Audio Muting State
  kind: query
  command: "AMTQSTN"
  params: []

# ============================================================
# SPA / SPB — Speaker A/B Command
# ============================================================
- id: spa_off
  label: Speaker A Off
  kind: action
  command: "SPA00"
  params: []

- id: spa_on
  label: Speaker A On
  kind: action
  command: "SPA01"
  params: []

- id: spa_toggle
  label: Speaker A Switch Wrap-Around
  kind: action
  command: "SPAUP"
  params: []

- id: spa_query
  label: Get Speaker A State
  kind: query
  command: "SPAQSTN"
  params: []

- id: spb_off
  label: Speaker B Off
  kind: action
  command: "SPB00"
  params: []

- id: spb_on
  label: Speaker B On
  kind: action
  command: "SPB01"
  params: []

- id: spb_toggle
  label: Speaker B Switch Wrap-Around
  kind: action
  command: "SPBUP"
  params: []

- id: spb_query
  label: Get Speaker B State
  kind: query
  command: "SPBQSTN"
  params: []

# ============================================================
# SPL — Speaker Layout Command
# ============================================================
- id: spl_sb
  label: Speaker Layout SurrBack
  kind: action
  command: "SPLSB"
  params: []

- id: spl_fh
  label: Speaker Layout Front High
  kind: action
  command: "SPLFH"
  params: []

- id: spl_fw
  label: Speaker Layout Front Wide
  kind: action
  command: "SPLFW"
  params: []

- id: spl_toggle
  label: Speaker Layout Switch Wrap-Around
  kind: action
  command: "SPLUP"
  params: []

- id: spl_query
  label: Get Speaker Layout State
  kind: query
  command: "SPLQSTN"
  params: []

# ============================================================
# MVL — Master Volume Command
# ============================================================
- id: mvl_set
  label: Set Master Volume Level
  kind: action
  command: "MVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex: 00-64 (0-100) or 00-50 (0-80) depending on model"

- id: mvl_up
  label: Volume Level Up
  kind: action
  command: "MVLUP"
  params: []

- id: mvl_down
  label: Volume Level Down
  kind: action
  command: "MVLDOWN"
  params: []

- id: mvl_up1
  label: Volume Level Up 1dB Step
  kind: action
  command: "MVLUP1"
  params: []

- id: mvl_down1
  label: Volume Level Down 1dB Step
  kind: action
  command: "MVLDOWN1"
  params: []

- id: mvl_query
  label: Get Volume Level
  kind: query
  command: "MVLQSTN"
  params: []

# ============================================================
# TFR — Tone (Front) Command
# ============================================================
- id: tfr_bass_set
  label: Set Front Bass Level
  kind: action
  command: "TFRB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfr_treble_set
  label: Set Front Treble Level
  kind: action
  command: "TFRT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfr_bup
  label: Front Bass Up (2 step)
  kind: action
  command: "TFRBUP"
  params: []

- id: tfr_bdown
  label: Front Bass Down (2 step)
  kind: action
  command: "TFRBDOWN"
  params: []

- id: tfr_tup
  label: Front Treble Up (2 step)
  kind: action
  command: "TFRTUP"
  params: []

- id: tfr_tdown
  label: Front Treble Down (2 step)
  kind: action
  command: "TFRTDOWN"
  params: []

- id: tfr_query
  label: Get Front Tone
  kind: query
  command: "TFRQSTN"
  params: []

# ============================================================
# TFW — Tone (Front Wide) Command
# ============================================================
- id: tfw_bass_set
  label: Set Front Wide Bass Level
  kind: action
  command: "TFWB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfw_treble_set
  label: Set Front Wide Treble Level
  kind: action
  command: "TFWT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfw_bup
  label: Front Wide Bass Up (2 step)
  kind: action
  command: "TFWBUP"
  params: []

- id: tfw_bdown
  label: Front Wide Bass Down (2 step)
  kind: action
  command: "TFWBDOWN"
  params: []

- id: tfw_tup
  label: Front Wide Treble Up (2 step)
  kind: action
  command: "TFWTUP"
  params: []

- id: tfw_tdown
  label: Front Wide Treble Down (2 step)
  kind: action
  command: "TFWTDOWN"
  params: []

- id: tfw_query
  label: Get Front Wide Tone
  kind: query
  command: "TFWQSTN"
  params: []

# ============================================================
# TFH — Tone (Front High) Command
# ============================================================
- id: tfh_bass_set
  label: Set Front High Bass Level
  kind: action
  command: "TFHB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfh_treble_set
  label: Set Front High Treble Level
  kind: action
  command: "TFHT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tfh_bup
  label: Front High Bass Up (2 step)
  kind: action
  command: "TFHBUP"
  params: []

- id: tfh_bdown
  label: Front High Bass Down (2 step)
  kind: action
  command: "TFHBDOWN"
  params: []

- id: tfh_tup
  label: Front High Treble Up (2 step)
  kind: action
  command: "TFHTUP"
  params: []

- id: tfh_tdown
  label: Front High Treble Down (2 step)
  kind: action
  command: "TFHTDOWN"
  params: []

- id: tfh_query
  label: Get Front High Tone
  kind: query
  command: "TFHQSTN"
  params: []

# ============================================================
# TCT — Tone (Center) Command
# ============================================================
- id: tct_bass_set
  label: Set Center Bass Level
  kind: action
  command: "TCTB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tct_treble_set
  label: Set Center Treble Level
  kind: action
  command: "TCTT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tct_bup
  label: Center Bass Up (2 step)
  kind: action
  command: "TCTBUP"
  params: []

- id: tct_bdown
  label: Center Bass Down (2 step)
  kind: action
  command: "TCTBDOWN"
  params: []

- id: tct_tup
  label: Center Treble Up (2 step)
  kind: action
  command: "TCTTUP"
  params: []

- id: tct_tdown
  label: Center Treble Down (2 step)
  kind: action
  command: "TCTTDOWN"
  params: []

- id: tct_query
  label: Get Center Tone
  kind: query
  command: "TCTQSTN"
  params: []

# ============================================================
# TSR — Tone (Surround) Command
# ============================================================
- id: tsr_bass_set
  label: Set Surround Bass Level
  kind: action
  command: "TSRB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tsr_treble_set
  label: Set Surround Treble Level
  kind: action
  command: "TSRT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tsr_bup
  label: Surround Bass Up (2 step)
  kind: action
  command: "TSRBUP"
  params: []

- id: tsr_bdown
  label: Surround Bass Down (2 step)
  kind: action
  command: "TSRBDOWN"
  params: []

- id: tsr_tup
  label: Surround Treble Up (2 step)
  kind: action
  command: "TSRTUP"
  params: []

- id: tsr_tdown
  label: Surround Treble Down (2 step)
  kind: action
  command: "TSRTDOWN"
  params: []

- id: tsr_query
  label: Get Surround Tone
  kind: query
  command: "TSRQSTN"
  params: []

# ============================================================
# TSB — Tone (Surround Back) Command
# ============================================================
- id: tsb_bass_set
  label: Set Surround Back Bass Level
  kind: action
  command: "TSBB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tsb_treble_set
  label: Set Surround Back Treble Level
  kind: action
  command: "TSBT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tsb_bup
  label: Surround Back Bass Up (2 step)
  kind: action
  command: "TSBBUP"
  params: []

- id: tsb_bdown
  label: Surround Back Bass Down (2 step)
  kind: action
  command: "TSBBDOWN"
  params: []

- id: tsb_tup
  label: Surround Back Treble Up (2 step)
  kind: action
  command: "TSBTUP"
  params: []

- id: tsb_tdown
  label: Surround Back Treble Down (2 step)
  kind: action
  command: "TSBTDOWN"
  params: []

- id: tsb_query
  label: Get Surround Back Tone
  kind: query
  command: "TSBQSTN"
  params: []

# ============================================================
# TSW — Tone (Subwoofer) Command
# ============================================================
- id: tsw_bass_set
  label: Set Subwoofer Bass Level
  kind: action
  command: "TSWB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tsw_bup
  label: Subwoofer Bass Up (2 step)
  kind: action
  command: "TSWBUP"
  params: []

- id: tsw_bdown
  label: Subwoofer Bass Down (2 step)
  kind: action
  command: "TSWBDOWN"
  params: []

- id: tsw_query
  label: Get Subwoofer Tone
  kind: query
  command: "TSWQSTN"
  params: []

# ============================================================
# SLP — Sleep Set Command
# ============================================================
- id: slp_set
  label: Set Sleep Time
  kind: action
  command: "SLP{time}"
  params:
    - name: time
      type: string
      description: "Sleep time in hex: 01-5A (1-90 min)"

- id: slp_off
  label: Sleep Time Off
  kind: action
  command: "SLPOFF"
  params: []

- id: slp_up
  label: Sleep Time Wrap-Around Up
  kind: action
  command: "SLPUP"
  params: []

- id: slp_query
  label: Get Sleep Time
  kind: query
  command: "SLPQSTN"
  params: []

# ============================================================
# SLC — Speaker Level Calibration Command
# ============================================================
- id: slc_test
  label: Speaker Level Calibration TEST Key
  kind: action
  command: "SLCTEST"
  params: []

- id: slc_chsel
  label: Speaker Level Calibration CH SEL Key
  kind: action
  command: "SLCCHSEL"
  params: []

- id: slc_up
  label: Speaker Level Calibration LEVEL+ Key
  kind: action
  command: "SLCUP"
  params: []

- id: slc_down
  label: Speaker Level Calibration LEVEL- Key
  kind: action
  command: "SLCDOWN"
  params: []

# ============================================================
# SWL — Subwoofer (temporary) Level Command
# ============================================================
- id: swl_set
  label: Set Subwoofer Level
  kind: action
  command: "SWL{level}"
  params:
    - name: level
      type: string
      description: "Level: -F to +C (-15dB to +12dB)"

- id: swl_up
  label: Subwoofer Level Up
  kind: action
  command: "SWLUP"
  params: []

- id: swl_down
  label: Subwoofer Level Down
  kind: action
  command: "SWLDOWN"
  params: []

- id: swl_query
  label: Get Subwoofer Level
  kind: query
  command: "SWLQSTN"
  params: []

# ============================================================
# CTL — Center (temporary) Level Command
# ============================================================
- id: ctl_set
  label: Set Center Level
  kind: action
  command: "CTL{level}"
  params:
    - name: level
      type: string
      description: "Level: -C to +C (-12dB to +12dB)"

- id: ctl_up
  label: Center Level Up
  kind: action
  command: "CTLUP"
  params: []

- id: ctl_down
  label: Center Level Down
  kind: action
  command: "CTLDOWN"
  params: []

- id: ctl_query
  label: Get Center Level
  kind: query
  command: "CTLQSTN"
  params: []

# ============================================================
# DIF — Display Information / Mode Command
# ============================================================
- id: dif_00
  label: Display Program Format / Selector+Volume Display Mode
  kind: action
  command: "DIF00"
  params: []

- id: dif_01
  label: Display Digital Input Position / Selector+Listening Mode Display Mode
  kind: action
  command: "DIF01"
  params: []

- id: dif_02
  label: Display Digital Format (temporary)
  kind: action
  command: "DIF02"
  params: []

- id: dif_03
  label: Display Video Format (temporary)
  kind: action
  command: "DIF03"
  params: []

- id: dif_04
  label: Display Treble Level
  kind: action
  command: "DIF04"
  params: []

- id: dif_toggle
  label: Display Mode Wrap-Around Up
  kind: action
  command: "DIFTG"
  params: []

- id: dif_query
  label: Get Display Mode
  kind: query
  command: "DIFQSTN"
  params: []

# ============================================================
# DIM — Dimmer Level Command
# ============================================================
- id: dim_bright
  label: Dimmer Level Bright
  kind: action
  command: "DIM00"
  params: []

- id: dim_dim
  label: Dimmer Level Dim
  kind: action
  command: "DIM01"
  params: []

- id: dim_dark
  label: Dimmer Level Dark
  kind: action
  command: "DIM02"
  params: []

- id: dim_shutoff
  label: Dimmer Level Shut-Off
  kind: action
  command: "DIM03"
  params: []

- id: dim_bright_led_off
  label: Dimmer Level Bright and LED OFF
  kind: action
  command: "DIM08"
  params: []

- id: dim_wraparound
  label: Dimmer Level Wrap-Around Up
  kind: action
  command: "DIMDIM"
  params: []

- id: dim_query
  label: Get Dimmer Level
  kind: query
  command: "DIMQSTN"
  params: []

# ============================================================
# OSD — Setup Operation Command
# ============================================================
- id: osd_menu
  label: OSD Menu Key
  kind: action
  command: "OSDMENU"
  params: []

- id: osd_up
  label: OSD Up Key
  kind: action
  command: "OSDUP"
  params: []

- id: osd_down
  label: OSD Down Key
  kind: action
  command: "OSDDOWN"
  params: []

- id: osd_right
  label: OSD Right Key
  kind: action
  command: "OSDRIGHT"
  params: []

- id: osd_left
  label: OSD Left Key
  kind: action
  command: "OSDLEFT"
  params: []

- id: osd_enter
  label: OSD Enter Key
  kind: action
  command: "OSDENTER"
  params: []

- id: osd_exit
  label: OSD Exit Key
  kind: action
  command: "OSDEXIT"
  params: []

- id: osd_audio
  label: OSD Audio Adjust Key
  kind: action
  command: "OSDAUDIO"
  params: []

- id: osd_video
  label: OSD Video Adjust Key
  kind: action
  command: "OSDVIDEO"
  params: []

# ============================================================
# MEM — Memory Setup Command
# ============================================================
- id: mem_store
  label: Memory Store
  kind: action
  command: "MEMSTR"
  params: []

- id: mem_recall
  label: Memory Recall
  kind: action
  command: "MEMRCL"
  params: []

- id: mem_lock
  label: Memory Lock
  kind: action
  command: "MEMLOCK"
  params: []

- id: mem_unlock
  label: Memory Unlock
  kind: action
  command: "MEMUNLK"
  params: []

# ============================================================
# IFA — Audio Information Command
# ============================================================
- id: ifa_query
  label: Get Audio Information
  kind: query
  command: "IFAQSTN"
  params: []

# ============================================================
# IFV — Video Information Command
# ============================================================
- id: ifv_query
  label: Get Video Information
  kind: query
  command: "IFVQSTN"
  params: []

# ============================================================
# SLI — Input Selector Command
# ============================================================
- id: sli_video1
  label: Select VIDEO1 (VCR/DVR)
  kind: action
  command: "SLI00"
  params: []

- id: sli_video2
  label: Select VIDEO2 (CBL/SAT)
  kind: action
  command: "SLI01"
  params: []

- id: sli_video3
  label: Select VIDEO3 (GAME/TV)
  kind: action
  command: "SLI02"
  params: []

- id: sli_video4
  label: Select VIDEO4 (AUX1)
  kind: action
  command: "SLI03"
  params: []

- id: sli_video5
  label: Select VIDEO5 (AUX2)
  kind: action
  command: "SLI04"
  params: []

- id: sli_video6
  label: Select VIDEO6
  kind: action
  command: "SLI05"
  params: []

- id: sli_video7
  label: Select VIDEO7
  kind: action
  command: "SLI06"
  params: []

- id: sli_dvd
  label: Select DVD
  kind: action
  command: "SLI10"
  params: []

- id: sli_tape1
  label: Select TAPE1 (TV/TAPE)
  kind: action
  command: "SLI20"
  params: []

- id: sli_tape2
  label: Select TAPE2
  kind: action
  command: "SLI21"
  params: []

- id: sli_phono
  label: Select PHONO
  kind: action
  command: "SLI22"
  params: []

- id: sli_cd
  label: Select CD
  kind: action
  command: "SLI23"
  params: []

- id: sli_fm
  label: Select FM
  kind: action
  command: "SLI24"
  params: []

- id: sli_am
  label: Select AM
  kind: action
  command: "SLI25"
  params: []

- id: sli_tuner
  label: Select TUNER
  kind: action
  command: "SLI26"
  params: []

- id: sli_music_server
  label: Select MUSIC SERVER
  kind: action
  command: "SLI27"
  params: []

- id: sli_internet_radio
  label: Select INTERNET RADIO
  kind: action
  command: "SLI28"
  params: []

- id: sli_usb_front
  label: Select USB/USB(Front)
  kind: action
  command: "SLI29"
  params: []

- id: sli_usb_rear
  label: Select USB(Rear)
  kind: action
  command: "SLI2A"
  params: []

- id: sli_universal_port
  label: Select Universal PORT
  kind: action
  command: "SLI40"
  params: []

- id: sli_multi_ch
  label: Select MULTI CH
  kind: action
  command: "SLI30"
  params: []

- id: sli_xm
  label: Select XM
  kind: action
  command: "SLI31"
  params: []

- id: sli_sirius
  label: Select SIRIUS
  kind: action
  command: "SLI32"
  params: []

- id: sli_up
  label: Selector Position Wrap-Around Up
  kind: action
  command: "SLIUP"
  params: []

- id: sli_down
  label: Selector Position Wrap-Around Down
  kind: action
  command: "SLIDOWN"
  params: []

- id: sli_query
  label: Get Selector Position
  kind: query
  command: "SLIQSTN"
  params: []

# ============================================================
# SLR — RECOUT Selector Command
# ============================================================
- id: slr_video1
  label: RECOUT Select VIDEO1
  kind: action
  command: "SLR00"
  params: []

- id: slr_video2
  label: RECOUT Select VIDEO2
  kind: action
  command: "SLR01"
  params: []

- id: slr_video3
  label: RECOUT Select VIDEO3
  kind: action
  command: "SLR02"
  params: []

- id: slr_video4
  label: RECOUT Select VIDEO4
  kind: action
  command: "SLR03"
  params: []

- id: slr_video5
  label: RECOUT Select VIDEO5
  kind: action
  command: "SLR04"
  params: []

- id: slr_video6
  label: RECOUT Select VIDEO6
  kind: action
  command: "SLR05"
  params: []

- id: slr_video7
  label: RECOUT Select VIDEO7
  kind: action
  command: "SLR06"
  params: []

- id: slr_dvd
  label: RECOUT Select DVD
  kind: action
  command: "SLR10"
  params: []

- id: slr_tape1
  label: RECOUT Select TAPE1
  kind: action
  command: "SLR20"
  params: []

- id: slr_tape2
  label: RECOUT Select TAPE2
  kind: action
  command: "SLR21"
  params: []

- id: slr_phono
  label: RECOUT Select PHONO
  kind: action
  command: "SLR22"
  params: []

- id: slr_cd
  label: RECOUT Select CD
  kind: action
  command: "SLR23"
  params: []

- id: slr_fm
  label: RECOUT Select FM
  kind: action
  command: "SLR24"
  params: []

- id: slr_am
  label: RECOUT Select AM
  kind: action
  command: "SLR25"
  params: []

- id: slr_tuner
  label: RECOUT Select TUNER
  kind: action
  command: "SLR26"
  params: []

- id: slr_music_server
  label: RECOUT Select MUSIC SERVER
  kind: action
  command: "SLR27"
  params: []

- id: slr_internet_radio
  label: RECOUT Select INTERNET RADIO
  kind: action
  command: "SLR28"
  params: []

- id: slr_multi_ch
  label: RECOUT Select MULTI CH
  kind: action
  command: "SLR30"
  params: []

- id: slr_xm
  label: RECOUT Select XM
  kind: action
  command: "SLR31"
  params: []

- id: slr_off
  label: RECOUT Select OFF
  kind: action
  command: "SLR7F"
  params: []

- id: slr_source
  label: RECOUT Select SOURCE
  kind: action
  command: "SLR80"
  params: []

- id: slr_query
  label: Get RECOUT Selector Position
  kind: query
  command: "SLRQSTN"
  params: []

# ============================================================
# SLA — Audio Selector Command
# ============================================================
- id: sla_auto
  label: Audio Selector AUTO
  kind: action
  command: "SLA00"
  params: []

- id: sla_multi_ch
  label: Audio Selector MULTI-CHANNEL
  kind: action
  command: "SLA01"
  params: []

- id: sla_analog
  label: Audio Selector ANALOG
  kind: action
  command: "SLA02"
  params: []

- id: sla_ilink
  label: Audio Selector iLINK
  kind: action
  command: "SLA03"
  params: []

- id: sla_hdmi
  label: Audio Selector HDMI
  kind: action
  command: "SLA04"
  params: []

- id: sla_coax_opt
  label: Audio Selector COAX/OPT
  kind: action
  command: "SLA05"
  params: []

- id: sla_balance
  label: Audio Selector BALANCE
  kind: action
  command: "SLA06"
  params: []

- id: sla_up
  label: Audio Selector Wrap-Around Up
  kind: action
  command: "SLAUP"
  params: []

- id: sla_query
  label: Get Audio Selector Status
  kind: query
  command: "SLAQSTN"
  params: []

# ============================================================
# TGA / TGB / TGC — 12V Trigger Commands
# ============================================================
- id: tga_off
  label: 12V Trigger A Off
  kind: action
  command: "TGA00"
  params: []

- id: tga_on
  label: 12V Trigger A On
  kind: action
  command: "TGA01"
  params: []

- id: tgb_off
  label: 12V Trigger B Off
  kind: action
  command: "TGB00"
  params: []

- id: tgb_on
  label: 12V Trigger B On
  kind: action
  command: "TGB01"
  params: []

- id: tgc_off
  label: 12V Trigger C Off
  kind: action
  command: "TGC00"
  params: []

- id: tgc_on
  label: 12V Trigger C On
  kind: action
  command: "TGC01"
  params: []

# ============================================================
# VOS — Video Output Selector (Japanese Model Only)
# ============================================================
- id: vos_d4
  label: Video Output Selector D4
  kind: action
  command: "VOS00"
  params: []

- id: vos_component
  label: Video Output Selector Component
  kind: action
  command: "VOS01"
  params: []

- id: vos_query
  label: Get Video Output Selector Position
  kind: query
  command: "VOSQSTN"
  params: []

# ============================================================
# HDO — HDMI Output Selector
# ============================================================
- id: hdo_no
  label: HDMI Output No (Analog)
  kind: action
  command: "HDO00"
  params: []

- id: hdo_main
  label: HDMI Output Yes/Out Main
  kind: action
  command: "HDO01"
  params: []

- id: hdo_sub
  label: HDMI Output Out Sub
  kind: action
  command: "HDO02"
  params: []

- id: hdo_both
  label: HDMI Output Both
  kind: action
  command: "HDO03"
  params: []

- id: hdo_both_main
  label: HDMI Output Both (Main)
  kind: action
  command: "HDO04"
  params: []

- id: hdo_both_sub
  label: HDMI Output Both (Sub)
  kind: action
  command: "HDO05"
  params: []

- id: hdo_up
  label: HDMI Out Selector Wrap-Around Up
  kind: action
  command: "HDOUP"
  params: []

- id: hdo_query
  label: Get HDMI Out Selector
  kind: query
  command: "HDOQSTN"
  params: []

# ============================================================
# RES — Monitor Out Resolution
# ============================================================
- id: res_through
  label: Monitor Out Resolution Through
  kind: action
  command: "RES00"
  params: []

- id: res_auto
  label: Monitor Out Resolution Auto (HDMI Only)
  kind: action
  command: "RES01"
  params: []

- id: res_480p
  label: Monitor Out Resolution 480p
  kind: action
  command: "RES02"
  params: []

- id: res_720p
  label: Monitor Out Resolution 720p
  kind: action
  command: "RES03"
  params: []

- id: res_1080i
  label: Monitor Out Resolution 1080i
  kind: action
  command: "RES04"
  params: []

- id: res_1080p
  label: Monitor Out Resolution 1080p (HDMI Only)
  kind: action
  command: "RES05"
  params: []

- id: res_source
  label: Monitor Out Resolution Source
  kind: action
  command: "RES06"
  params: []

- id: res_1080p_24fs
  label: Monitor Out Resolution 1080p/24fs (HDMI Only)
  kind: action
  command: "RES07"
  params: []

- id: res_up
  label: Monitor Out Resolution Wrap-Around Up
  kind: action
  command: "RESUP"
  params: []

- id: res_query
  label: Get Monitor Out Resolution
  kind: query
  command: "RESQSTN"
  params: []

# ============================================================
# ISF — ISF Mode
# ============================================================
- id: isf_custom
  label: ISF Mode Custom
  kind: action
  command: "ISF00"
  params: []

- id: isf_day
  label: ISF Mode Day
  kind: action
  command: "ISF01"
  params: []

- id: isf_night
  label: ISF Mode Night
  kind: action
  command: "ISF02"
  params: []

- id: isf_up
  label: ISF Mode State Wrap-Around Up
  kind: action
  command: "ISFUP"
  params: []

- id: isf_query
  label: Get ISF Mode State
  kind: query
  command: "ISFQSTN"
  params: []

# ============================================================
# LMD — Listening Mode Command
# ============================================================
- id: lmd_stereo
  label: Listening Mode STEREO
  kind: action
  command: "LMD00"
  params: []

- id: lmd_direct
  label: Listening Mode DIRECT
  kind: action
  command: "LMD01"
  params: []

- id: lmd_surround
  label: Listening Mode SURROUND
  kind: action
  command: "LMD02"
  params: []

- id: lmd_film
  label: Listening Mode FILM / Game-RPG
  kind: action
  command: "LMD03"
  params: []

- id: lmd_thx
  label: Listening Mode THX
  kind: action
  command: "LMD04"
  params: []

- id: lmd_action
  label: Listening Mode ACTION / Game-Action
  kind: action
  command: "LMD05"
  params: []

- id: lmd_musical
  label: Listening Mode MUSICAL / Game-Rock
  kind: action
  command: "LMD06"
  params: []

- id: lmd_mono_movie
  label: Listening Mode MONO MOVIE
  kind: action
  command: "LMD07"
  params: []

- id: lmd_orchestra
  label: Listening Mode ORCHESTRA
  kind: action
  command: "LMD08"
  params: []

- id: lmd_unplugged
  label: Listening Mode UNPLUGGED
  kind: action
  command: "LMD09"
  params: []

- id: lmd_studio_mix
  label: Listening Mode STUDIO-MIX
  kind: action
  command: "LMD0A"
  params: []

- id: lmd_tv_logic
  label: Listening Mode TV LOGIC
  kind: action
  command: "LMD0B"
  params: []

- id: lmd_all_ch_stereo
  label: Listening Mode ALL CH STEREO
  kind: action
  command: "LMD0C"
  params: []

- id: lmd_theater_dimensional
  label: Listening Mode THEATER-DIMENSIONAL
  kind: action
  command: "LMD0D"
  params: []

- id: lmd_enhanced_7
  label: Listening Mode ENHANCED 7 / Game-Sports
  kind: action
  command: "LMD0E"
  params: []

- id: lmd_mono
  label: Listening Mode MONO
  kind: action
  command: "LMD0F"
  params: []

- id: lmd_pure_audio
  label: Listening Mode PURE AUDIO
  kind: action
  command: "LMD11"
  params: []

- id: lmd_multiplex
  label: Listening Mode MULTIPLEX
  kind: action
  command: "LMD12"
  params: []

- id: lmd_full_mono
  label: Listening Mode FULL MONO
  kind: action
  command: "LMD13"
  params: []

- id: lmd_dolby_virtual
  label: Listening Mode DOLBY VIRTUAL
  kind: action
  command: "LMD14"
  params: []

- id: lmd_dts_surround_sensation
  label: Listening Mode DTS Surround Sensation
  kind: action
  command: "LMD15"
  params: []

- id: lmd_audyssey_dsx
  label: Listening Mode Audyssey DSX
  kind: action
  command: "LMD16"
  params: []

- id: lmd_5ch_surround
  label: Listening Mode 5.1ch Surround / Straight Decode
  kind: action
  command: "LMD40"
  params: []

- id: lmd_dolby_ex
  label: Listening Mode Dolby EX/DTS ES
  kind: action
  command: "LMD41"
  params: []

- id: lmd_thx_cinema
  label: Listening Mode THX Cinema
  kind: action
  command: "LMD42"
  params: []

- id: lmd_thx_surround_ex
  label: Listening Mode THX Surround EX
  kind: action
  command: "LMD43"
  params: []

- id: lmd_thx_music
  label: Listening Mode THX Music
  kind: action
  command: "LMD44"
  params: []

- id: lmd_thx_games
  label: Listening Mode THX Games
  kind: action
  command: "LMD45"
  params: []

- id: lmd_u2s2_cinema
  label: Listening Mode U2/S2 Cinema
  kind: action
  command: "LMD50"
  params: []

- id: lmd_u2s2_music
  label: Listening Mode U2/S2 Music
  kind: action
  command: "LMD51"
  params: []

- id: lmd_u2s2_games
  label: Listening Mode U2/S2 Games
  kind: action
  command: "LMD52"
  params: []

- id: lmd_plii_movie
  label: Listening Mode PLII/PLIIx Movie
  kind: action
  command: "LMD80"
  params: []

- id: lmd_plii_music
  label: Listening Mode PLII/PLIIx Music
  kind: action
  command: "LMD81"
  params: []

- id: lmd_neo6_cinema
  label: Listening Mode Neo:6 Cinema
  kind: action
  command: "LMD82"
  params: []

- id: lmd_neo6_music
  label: Listening Mode Neo:6 Music
  kind: action
  command: "LMD83"
  params: []

- id: lmd_plii_thx_cinema
  label: Listening Mode PLII/PLIIx THX Cinema
  kind: action
  command: "LMD84"
  params: []

- id: lmd_neo6_thx_cinema
  label: Listening Mode Neo:6 THX Cinema
  kind: action
  command: "LMD85"
  params: []

- id: lmd_plii_game
  label: Listening Mode PLII/PLIIx Game
  kind: action
  command: "LMD86"
  params: []

- id: lmd_neural_surr
  label: Listening Mode Neural Surr
  kind: action
  command: "LMD87"
  params: []

- id: lmd_neural_thx
  label: Listening Mode Neural THX/Neural Surround
  kind: action
  command: "LMD88"
  params: []

- id: lmd_plii_thx_games
  label: Listening Mode PLII/PLIIx THX Games
  kind: action
  command: "LMD89"
  params: []

- id: lmd_neo6_thx_games
  label: Listening Mode Neo:6 THX Games
  kind: action
  command: "LMD8A"
  params: []

- id: lmd_plii_thx_music
  label: Listening Mode PLII/PLIIx THX Music
  kind: action
  command: "LMD8B"
  params: []

- id: lmd_neo6_thx_music
  label: Listening Mode Neo:6 THX Music
  kind: action
  command: "LMD8C"
  params: []

- id: lmd_neural_thx_cinema
  label: Listening Mode Neural THX Cinema
  kind: action
  command: "LMD8D"
  params: []

- id: lmd_neural_thx_music
  label: Listening Mode Neural THX Music
  kind: action
  command: "LMD8E"
  params: []

- id: lmd_neural_thx_games
  label: Listening Mode Neural THX Games
  kind: action
  command: "LMD8F"
  params: []

- id: lmd_pliiz_height
  label: Listening Mode PLIIz Height
  kind: action
  command: "LMD90"
  params: []

- id: lmd_neo6_cinema_dsx
  label: Listening Mode Neo:6 Cinema DTS Surround Sensation
  kind: action
  command: "LMD91"
  params: []

- id: lmd_neo6_music_dsx
  label: Listening Mode Neo:6 Music DTS Surround Sensation
  kind: action
  command: "LMD92"
  params: []

- id: lmd_neural_digital_music
  label: Listening Mode Neural Digital Music
  kind: action
  command: "LMD93"
  params: []

- id: lmd_pliiz_thx_cinema
  label: Listening Mode PLIIz Height + THX Cinema
  kind: action
  command: "LMD94"
  params: []

- id: lmd_pliiz_thx_music
  label: Listening Mode PLIIz Height + THX Music
  kind: action
  command: "LMD95"
  params: []

- id: lmd_pliiz_thx_games
  label: Listening Mode PLIIz Height + THX Games
  kind: action
  command: "LMD96"
  params: []

- id: lmd_pliiz_thx_u2s2_cinema
  label: Listening Mode PLIIz Height + THX U2/S2 Cinema
  kind: action
  command: "LMD97"
  params: []

- id: lmd_pliiz_thx_u2s2_music
  label: Listening Mode PLIIz Height + THX U2/S2 Music
  kind: action
  command: "LMD98"
  params: []

- id: lmd_pliiz_thx_u2s2_games
  label: Listening Mode PLIIz Height + THX U2/S2 Games
  kind: action
  command: "LMD99"
  params: []

- id: lmd_plii_movie_adsx
  label: Listening Mode PLIIx/PLII Movie + Audyssey DSX
  kind: action
  command: "LMDA0"
  params: []

- id: lmd_plii_music_adsx
  label: Listening Mode PLIIx/PLII Music + Audyssey DSX
  kind: action
  command: "LMDA1"
  params: []

- id: lmd_plii_game_adsx
  label: Listening Mode PLIIx/PLII Game + Audyssey DSX
  kind: action
  command: "LMDA2"
  params: []

- id: lmd_neo6_cinema_adsx
  label: Listening Mode Neo:6 Cinema + Audyssey DSX
  kind: action
  command: "LMDA3"
  params: []

- id: lmd_neo6_music_adsx
  label: Listening Mode Neo:6 Music + Audyssey DSX
  kind: action
  command: "LMDA4"
  params: []

- id: lmd_neural_surround_adsx
  label: Listening Mode Neural Surround + Audyssey DSX
  kind: action
  command: "LMDA5"
  params: []

- id: lmd_neural_digital_music_adsx
  label: Listening Mode Neural Digital Music + Audyssey DSX
  kind: action
  command: "LMDA6"
  params: []

- id: lmd_dolby_ex_adsx
  label: Listening Mode Dolby EX + Audyssey DSX
  kind: action
  command: "LMDA7"
  params: []

- id: lmd_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "LMDUP"
  params: []

- id: lmd_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "LMDDOWN"
  params: []

- id: lmd_movie
  label: Listening Mode Wrap-Around Up (MOVIE)
  kind: action
  command: "LMDMOVIE"
  params: []

- id: lmd_music
  label: Listening Mode Wrap-Around Up (MUSIC)
  kind: action
  command: "LMDMUSIC"
  params: []

- id: lmd_game
  label: Listening Mode Wrap-Around Up (GAME)
  kind: action
  command: "LMDGAME"
  params: []

- id: lmd_query
  label: Get Listening Mode
  kind: query
  command: "LMDQSTN"
  params: []

# ============================================================
# LTN — Late Night Command
# ============================================================
- id: ltn_off
  label: Late Night Off
  kind: action
  command: "LTN00"
  params: []

- id: ltn_low
  label: Late Night Low (DD) / On (TrueHD)
  kind: action
  command: "LTN01"
  params: []

- id: ltn_high
  label: Late Night High (DD)
  kind: action
  command: "LTN02"
  params: []

- id: ltn_auto
  label: Late Night Auto (Dolby TrueHD)
  kind: action
  command: "LTN03"
  params: []

- id: ltn_up
  label: Late Night State Wrap-Around Up
  kind: action
  command: "LTNUP"
  params: []

- id: ltn_query
  label: Get Late Night Level
  kind: query
  command: "LTNQSTN"
  params: []

# ============================================================
# RAS — Re-EQ/Academy Filter / Re-EQ / Cinema Filter Command
# ============================================================
- id: ras_off
  label: Re-EQ/Academy/Cinema Filter Off
  kind: action
  command: "RAS00"
  params: []

- id: ras_on
  label: Re-EQ On / Cinema Filter On
  kind: action
  command: "RAS01"
  params: []

- id: ras_academy_on
  label: Academy Filter On
  kind: action
  command: "RAS02"
  params: []

- id: ras_up
  label: Re-EQ/Academy/Cinema Filter State Wrap-Around Up
  kind: action
  command: "RASUP"
  params: []

- id: ras_query
  label: Get Re-EQ/Academy/Cinema Filter State
  kind: query
  command: "RASQSTN"
  params: []

# ============================================================
# ADY — Audyssey 2EQ/MultEQ/MultEQ XT
# ============================================================
- id: ady_off
  label: Audyssey 2EQ/MultEQ/MultEQ XT Off
  kind: action
  command: "ADY00"
  params: []

- id: ady_on
  label: Audyssey 2EQ/MultEQ/MultEQ XT On
  kind: action
  command: "ADY01"
  params: []

- id: ady_up
  label: Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up
  kind: action
  command: "ADYUP"
  params: []

- id: ady_query
  label: Get Audyssey 2EQ/MultEQ/MultEQ XT State
  kind: query
  command: "ADYQSTN"
  params: []

# ============================================================
# ADQ — Audyssey Dynamic EQ
# ============================================================
- id: adq_off
  label: Audyssey Dynamic EQ Off
  kind: action
  command: "ADQ00"
  params: []

- id: adq_on
  label: Audyssey Dynamic EQ On
  kind: action
  command: "ADQ01"
  params: []

- id: adq_up
  label: Audyssey Dynamic EQ State Wrap-Around Up
  kind: action
  command: "ADQUP"
  params: []

- id: adq_query
  label: Get Audyssey Dynamic EQ State
  kind: query
  command: "ADQQSTN"
  params: []

# ============================================================
# ADV — Audyssey Dynamic Volume
# ============================================================
- id: adv_off
  label: Audyssey Dynamic Volume Off
  kind: action
  command: "ADV00"
  params: []

- id: adv_light
  label: Audyssey Dynamic Volume Light
  kind: action
  command: "ADV01"
  params: []

- id: adv_medium
  label: Audyssey Dynamic Volume Medium
  kind: action
  command: "ADV02"
  params: []

- id: adv_heavy
  label: Audyssey Dynamic Volume Heavy
  kind: action
  command: "ADV03"
  params: []

- id: adv_up
  label: Audyssey Dynamic Volume State Wrap-Around Up
  kind: action
  command: "ADVUP"
  params: []

- id: adv_query
  label: Get Audyssey Dynamic Volume State
  kind: query
  command: "ADVQSTN"
  params: []

# ============================================================
# DVL — Dolby Volume
# ============================================================
- id: dvl_off
  label: Dolby Volume Off
  kind: action
  command: "DVL00"
  params: []

- id: dvl_low
  label: Dolby Volume Low
  kind: action
  command: "DVL01"
  params: []

- id: dvl_mid
  label: Dolby Volume Mid
  kind: action
  command: "DVL02"
  params: []

- id: dvl_high
  label: Dolby Volume High
  kind: action
  command: "DVL03"
  params: []

- id: dvl_up
  label: Dolby Volume State Wrap-Around Up
  kind: action
  command: "DVLUP"
  params: []

- id: dvl_query
  label: Get Dolby Volume State
  kind: query
  command: "DVLQSTN"
  params: []

# ============================================================
# MOT — Music Optimizer
# ============================================================
- id: mot_off
  label: Music Optimizer Off
  kind: action
  command: "MOT00"
  params: []

- id: mot_on
  label: Music Optimizer On
  kind: action
  command: "MOT01"
  params: []

- id: mot_up
  label: Music Optimizer State Wrap-Around Up
  kind: action
  command: "MOTUP"
  params: []

- id: mot_query
  label: Get Music Optimizer State
  kind: query
  command: "MOTQSTN"
  params: []

# ============================================================
# TUN — Tuning Command
# ============================================================
- id: tun_set
  label: Set Tuning Frequency
  kind: action
  command: "TUN{nnnnn}"
  params:
    - name: nnnnn
      type: string
      description: "FM: nnn.nn MHz (5 digits); AM: nnnnn kHz; XM: 000nn (first two digits 0)"

- id: tun_up
  label: Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUNUP"
  params: []

- id: tun_down
  label: Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUNDOWN"
  params: []

- id: tun_query
  label: Get Tuning Frequency
  kind: query
  command: "TUNQSTN"
  params: []

# ============================================================
# PRS — Preset Command
# ============================================================
- id: prs_set
  label: Set Preset Number
  kind: action
  command: "PRS{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40) or 01-1E (1-30)"

- id: prs_up
  label: Preset No. Wrap-Around Up
  kind: action
  command: "PRSUP"
  params: []

- id: prs_down
  label: Preset No. Wrap-Around Down
  kind: action
  command: "PRSDOWN"
  params: []

- id: prs_query
  label: Get Preset No.
  kind: query
  command: "PRSQSTN"
  params: []

# ============================================================
# PRM — Preset Memory Command
# ============================================================
- id: prm_set
  label: Set Preset Memory Number
  kind: action
  command: "PRM{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40) or 01-1E (1-30)"

# ============================================================
# RDS — RDS Information Command
# ============================================================
- id: rds_rt
  label: Display RT Information
  kind: action
  command: "RDS00"
  params: []

- id: rds_pty
  label: Display PTY Information
  kind: action
  command: "RDS01"
  params: []

- id: rds_tp
  label: Display TP Information
  kind: action
  command: "RDS02"
  params: []

- id: rds_up
  label: Display RDS Information Wrap-Around Change
  kind: action
  command: "RDSUP"
  params: []

# ============================================================
# PTS — PTY Scan Command
# ============================================================
- id: pts_set
  label: Set PTY Scan Number
  kind: action
  command: "PTS{nn}"
  params:
    - name: nn
      type: string
      description: "PTY number in hex: 00-1E (0-30)"

- id: pts_enter
  label: Finish PTY Scan
  kind: action
  command: "PTSENTER"
  params: []

# ============================================================
# TPS — TP Scan Command
# ============================================================
- id: tps_start
  label: Start TP Scan
  kind: action
  command: "TPS"
  params: []

- id: tps_enter
  label: Finish TP Scan
  kind: action
  command: "TPSENTER"
  params: []

# ============================================================
# XCN — XM Channel Name Info
# ============================================================
- id: xcn_query
  label: Get XM Channel Name
  kind: query
  command: "XCNQSTN"
  params: []

# ============================================================
# XAT — XM Artist Name Info
# ============================================================
- id: xat_query
  label: Get XM Artist Name
  kind: query
  command: "XATQSTN"
  params: []

# ============================================================
# XTI — XM Title Info
# ============================================================
- id: xti_query
  label: Get XM Title
  kind: query
  command: "XTIQSTN"
  params: []

# ============================================================
# XCH — XM Channel Number Command
# ============================================================
- id: xch_set
  label: Set XM Channel Number
  kind: action
  command: "XCH{nnn}"
  params:
    - name: nnn
      type: string
      description: "XM channel number: 000-255"

- id: xch_up
  label: XM Channel Wrap-Around Up
  kind: action
  command: "XCHUP"
  params: []

- id: xch_down
  label: XM Channel Wrap-Around Down
  kind: action
  command: "XCHDOWN"
  params: []

- id: xch_query
  label: Get XM Channel Number
  kind: query
  command: "XCHQSTN"
  params: []

# ============================================================
# XCT — XM Category Command
# ============================================================
- id: xct_up
  label: XM Category Wrap-Around Up
  kind: action
  command: "XCTUP"
  params: []

- id: xct_down
  label: XM Category Wrap-Around Down
  kind: action
  command: "XCTDOWN"
  params: []

- id: xct_query
  label: Get XM Category
  kind: query
  command: "XCTQSTN"
  params: []

# ============================================================
# SCN — SIRIUS Channel Name Info
# ============================================================
- id: scn_query
  label: Get SIRIUS Channel Name
  kind: query
  command: "SCNQSTN"
  params: []

# ============================================================
# SAT — SIRIUS Artist Name Info
# ============================================================
- id: sat_query
  label: Get SIRIUS Artist Name
  kind: query
  command: "SATQSTN"
  params: []

# ============================================================
# STI — SIRIUS Title Info
# ============================================================
- id: sti_query
  label: Get SIRIUS Title
  kind: query
  command: "STIQSTN"
  params: []

# ============================================================
# SCH — SIRIUS Channel Number Command
# ============================================================
- id: sch_set
  label: Set SIRIUS Channel Number
  kind: action
  command: "SCH{nnn}"
  params:
    - name: nnn
      type: string
      description: "SIRIUS channel number: 000-255"

- id: sch_up
  label: SIRIUS Channel Wrap-Around Up
  kind: action
  command: "SCHUP"
  params: []

- id: sch_down
  label: SIRIUS Channel Wrap-Around Down
  kind: action
  command: "SCHDOWN"
  params: []

- id: sch_query
  label: Get SIRIUS Channel Number
  kind: query
  command: "SCHQSTN"
  params: []

# ============================================================
# SCT — SIRIUS Category Command
# ============================================================
- id: sct_up
  label: SIRIUS Category Wrap-Around Up
  kind: action
  command: "SCTUP"
  params: []

- id: sct_down
  label: SIRIUS Category Wrap-Around Down
  kind: action
  command: "SCTDOWN"
  params: []

- id: sct_query
  label: Get SIRIUS Category
  kind: query
  command: "SCTQSTN"
  params: []

# ============================================================
# SLK — SIRIUS Parental Lock Command
# ============================================================
- id: slk_set
  label: SIRIUS Parental Lock Password
  kind: action
  command: "SLK{nnnn}"
  params:
    - name: nnnn
      type: string
      description: "Lock password (4 digits)"

- id: slk_input
  label: SIRIUS Parental Lock Input Prompt
  kind: action
  command: "SLKINPUT"
  params: []

- id: slk_wrong
  label: SIRIUS Parental Lock Wrong Password
  kind: action
  command: "SLKWRONG"
  params: []

# ============================================================
# HAT — HD Radio Artist Name Info
# ============================================================
- id: hat_query
  label: Get HD Radio Artist Name
  kind: query
  command: "HATQSTN"
  params: []

# ============================================================
# HCN — HD Radio Channel Name Info
# ============================================================
- id: hcn_query
  label: Get HD Radio Channel Name
  kind: query
  command: "HCNQSTN"
  params: []

# ============================================================
# HTI — HD Radio Title Info
# ============================================================
- id: hti_query
  label: Get HD Radio Title
  kind: query
  command: "HTIQSTN"
  params: []

# ============================================================
# HDS — HD Radio Detail Info
# ============================================================
- id: hds_query
  label: Get HD Radio Detail Info
  kind: query
  command: "HDSQSTN"
  params: []

# ============================================================
# HPR — HD Radio Channel Program Command
# ============================================================
- id: hpr_set
  label: Set HD Radio Channel Program
  kind: action
  command: "HPR{nn}"
  params:
    - name: nn
      type: string
      description: "HD Radio channel program: 01-08"

- id: hpr_query
  label: Get HD Radio Channel Program
  kind: query
  command: "HPRQSTN"
  params: []

# ============================================================
# HBL — HD Radio Blend Mode Command
# ============================================================
- id: hbl_auto
  label: HD Radio Blend Mode Auto
  kind: action
  command: "HBL00"
  params: []

- id: hbl_analog
  label: HD Radio Blend Mode Analog
  kind: action
  command: "HBL01"
  params: []

- id: hbl_query
  label: Get HD Radio Blend Mode Status
  kind: query
  command: "HBLQSTN"
  params: []

# ============================================================
# HTS — HD Radio Tuner Status
# ============================================================
- id: hts_query
  label: Get HD Radio Tuner Status
  kind: query
  command: "HTSQSTN"
  params: []

# ============================================================
# NTC — Net-Tune / Network/USB Operation Command
# ============================================================
- id: ntc_play
  label: Net/USB PLAY Key
  kind: action
  command: "NTCPLAY"
  params: []

- id: ntc_stop
  label: Net/USB STOP Key
  kind: action
  command: "NTCSTOP"
  params: []

- id: ntc_pause
  label: Net/USB PAUSE Key
  kind: action
  command: "NTCPAUSE"
  params: []

- id: ntc_trup
  label: Net/USB TRACK UP Key
  kind: action
  command: "NTCTRUP"
  params: []

- id: ntc_trdn
  label: Net/USB TRACK DOWN Key
  kind: action
  command: "NTCTRDN"
  params: []

- id: ntc_ff
  label: Net/USB FF Key (continuous)
  kind: action
  command: "NTCFF"
  params: []

- id: ntc_rew
  label: Net/USB REW Key (continuous)
  kind: action
  command: "NTCREW"
  params: []

- id: ntc_repeat
  label: Net/USB REPEAT Key
  kind: action
  command: "NTCREPEAT"
  params: []

- id: ntc_random
  label: Net/USB RANDOM Key
  kind: action
  command: "NTCRANDOM"
  params: []

- id: ntc_display
  label: Net/USB DISPLAY Key
  kind: action
  command: "NTCDISPLAY"
  params: []

- id: ntc_album
  label: Net/USB ALBUM Key
  kind: action
  command: "NTCALBUM"
  params: []

- id: ntc_artist
  label: Net/USB ARTIST Key
  kind: action
  command: "NTCARTIST"
  params: []

- id: ntc_genre
  label: Net/USB GENRE Key
  kind: action
  command: "NTCGENRE"
  params: []

- id: ntc_playlist
  label: Net/USB PLAYLIST Key
  kind: action
  command: "NTCPLAYLIST"
  params: []

- id: ntc_right
  label: Net/USB RIGHT Key
  kind: action
  command: "NTCRIGHT"
  params: []

- id: ntc_left
  label: Net/USB LEFT Key
  kind: action
  command: "NTCLEFT"
  params: []

- id: ntc_up
  label: Net/USB UP Key
  kind: action
  command: "NTCUP"
  params: []

- id: ntc_down
  label: Net/USB DOWN Key
  kind: action
  command: "NTCDOWN"
  params: []

- id: ntc_select
  label: Net/USB SELECT Key
  kind: action
  command: "NTCSELECT"
  params: []

- id: ntc_0
  label: Net/USB 0 Key
  kind: action
  command: "NTC0"
  params: []

- id: ntc_1
  label: Net/USB 1 Key
  kind: action
  command: "NTC1"
  params: []

- id: ntc_2
  label: Net/USB 2 Key
  kind: action
  command: "NTC2"
  params: []

- id: ntc_3
  label: Net/USB 3 Key
  kind: action
  command: "NTC3"
  params: []

- id: ntc_4
  label: Net/USB 4 Key
  kind: action
  command: "NTC4"
  params: []

- id: ntc_5
  label: Net/USB 5 Key
  kind: action
  command: "NTC5"
  params: []

- id: ntc_6
  label: Net/USB 6 Key
  kind: action
  command: "NTC6"
  params: []

- id: ntc_7
  label: Net/USB 7 Key
  kind: action
  command: "NTC7"
  params: []

- id: ntc_8
  label: Net/USB 8 Key
  kind: action
  command: "NTC8"
  params: []

- id: ntc_9
  label: Net/USB 9 Key
  kind: action
  command: "NTC9"
  params: []

- id: ntc_delete
  label: Net/USB DELETE Key
  kind: action
  command: "NTCDELETE"
  params: []

- id: ntc_caps
  label: Net/USB CAPS Key
  kind: action
  command: "NTCCAPS"
  params: []

- id: ntc_location
  label: Net/USB LOCATION Key
  kind: action
  command: "NTCLOCATION"
  params: []

- id: ntc_language
  label: Net/USB LANGUAGE Key
  kind: action
  command: "NTCLANGUAGE"
  params: []

- id: ntc_setup
  label: Net/USB SETUP Key
  kind: action
  command: "NTCSETUP"
  params: []

- id: ntc_return
  label: Net/USB RETURN Key
  kind: action
  command: "NTCRETURN"
  params: []

- id: ntc_chup
  label: Net/USB CH UP (for iRadio)
  kind: action
  command: "NTCCHUP"
  params: []

- id: ntc_chdn
  label: Net/USB CH DOWN (for iRadio)
  kind: action
  command: "NTCCHDN"
  params: []

# ============================================================
# NAT — Net/USB Artist Name Info
# ============================================================
- id: nat_query
  label: Get Net/USB Artist Name
  kind: query
  command: "NATQSTN"
  params: []

# ============================================================
# NAL — Net/USB Album Name Info
# ============================================================
- id: nal_query
  label: Get Net/USB Album Name
  kind: query
  command: "NALQSTN"
  params: []

# ============================================================
# NTI — Net/USB Title Name
# ============================================================
- id: nti_query
  label: Get Net/USB Title Name
  kind: query
  command: "NTIQSTN"
  params: []

# ============================================================
# NTM — Net/USB Time Info
# ============================================================
- id: ntm_query
  label: Get Net/USB Time Info
  kind: query
  command: "NTMQSTN"
  params: []

# ============================================================
# NTR — Net/USB Track Info
# ============================================================
- id: ntr_query
  label: Get Net/USB Track Info
  kind: query
  command: "NTRQSTN"
  params: []

# ============================================================
# NST — Net/USB Play Status
# ============================================================
- id: nst_query
  label: Get Net/USB Play Status
  kind: query
  command: "NSTQSTN"
  params: []

# ============================================================
# NPR — Internet Radio Preset Command
# ============================================================
- id: npr_set
  label: Set Internet Radio Preset
  kind: action
  command: "NPR{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40)"

# ============================================================
# CCD — CD Player Operation Command (RI)
# ============================================================
- id: ccd_track
  label: CD Player TRACK+
  kind: action
  command: "CCDTRACK"
  params: []

- id: ccd_play
  label: CD Player PLAY
  kind: action
  command: "CCDPLAY"
  params: []

- id: ccd_stop
  label: CD Player STOP
  kind: action
  command: "CCDSTOP"
  params: []

- id: ccd_pause
  label: CD Player PAUSE
  kind: action
  command: "CCDPAUSE"
  params: []

- id: ccd_skip_f
  label: CD Player Skip Forward
  kind: action
  command: "CCDSKIP.F"
  params: []

- id: ccd_skip_r
  label: CD Player Skip Reverse
  kind: action
  command: "CCDSKIP.R"
  params: []

- id: ccd_memory
  label: CD Player MEMORY
  kind: action
  command: "CCDMEMORY"
  params: []

- id: ccd_clear
  label: CD Player CLEAR
  kind: action
  command: "CCDCLEAR"
  params: []

- id: ccd_repeat
  label: CD Player REPEAT
  kind: action
  command: "CCDREPEAT"
  params: []

- id: ccd_random
  label: CD Player RANDOM
  kind: action
  command: "CCDRANDOM"
  params: []

- id: ccd_disp
  label: CD Player DISPLAY
  kind: action
  command: "CCDDISP"
  params: []

- id: ccd_d_mode
  label: CD Player D.MODE
  kind: action
  command: "CCDD.MODE"
  params: []

- id: ccd_ff
  label: CD Player FF
  kind: action
  command: "CCDFF"
  params: []

- id: ccd_rew
  label: CD Player REW
  kind: action
  command: "CCDREW"
  params: []

- id: ccd_op_cl
  label: CD Player OPEN/CLOSE
  kind: action
  command: "CCDOP/CL"
  params: []

- id: ccd_1
  label: CD Player Key 1
  kind: action
  command: "CCD1"
  params: []

- id: ccd_2
  label: CD Player Key 2
  kind: action
  command: "CCD2"
  params: []

- id: ccd_3
  label: CD Player Key 3
  kind: action
  command: "CCD3"
  params: []

- id: ccd_4
  label: CD Player Key 4
  kind: action
  command: "CCD4"
  params: []

- id: ccd_5
  label: CD Player Key 5
  kind: action
  command: "CCD5"
  params: []

- id: ccd_6
  label: CD Player Key 6
  kind: action
  command: "CCD6"
  params: []

- id: ccd_7
  label: CD Player Key 7
  kind: action
  command: "CCD7"
  params: []

- id: ccd_8
  label: CD Player Key 8
  kind: action
  command: "CCD8"
  params: []

- id: ccd_9
  label: CD Player Key 9
  kind: action
  command: "CCD9"
  params: []

- id: ccd_0
  label: CD Player Key 0
  kind: action
  command: "CCD0"
  params: []

- id: ccd_10
  label: CD Player Key 10
  kind: action
  command: "CCD10"
  params: []

- id: ccd_plus10
  label: CD Player Key +10
  kind: action
  command: "CCD+10"
  params: []

- id: ccd_d_skip
  label: CD Player DISC+ (D.SKIP)
  kind: action
  command: "CCDD.SKIP"
  params: []

- id: ccd_disc_f
  label: CD Player DISC+
  kind: action
  command: "CCDDISC.F"
  params: []

- id: ccd_disc_r
  label: CD Player DISC-
  kind: action
  command: "CCDDISC.R"
  params: []

- id: ccd_disc1
  label: CD Player DISC1
  kind: action
  command: "CCDDISC1"
  params: []

- id: ccd_disc2
  label: CD Player DISC2
  kind: action
  command: "CCDDISC2"
  params: []

- id: ccd_disc3
  label: CD Player DISC3
  kind: action
  command: "CCDDISC3"
  params: []

- id: ccd_disc4
  label: CD Player DISC4
  kind: action
  command: "CCDDISC4"
  params: []

- id: ccd_disc5
  label: CD Player DISC5
  kind: action
  command: "CCDDISC5"
  params: []

- id: ccd_disc6
  label: CD Player DISC6
  kind: action
  command: "CCDDISC6"
  params: []

- id: ccd_stby
  label: CD Player STANDBY
  kind: action
  command: "CCDSTBY"
  params: []

- id: ccd_pon
  label: CD Player POWER ON
  kind: action
  command: "CCDPON"
  params: []

# ============================================================
# CT1 — TAPE1(A) Operation Command (RI)
# ============================================================
- id: ct1_play_f
  label: TAPE1 PLAY Forward
  kind: action
  command: "CT1PLAY.F"
  params: []

- id: ct1_play_r
  label: TAPE1 PLAY Reverse
  kind: action
  command: "CT1PLAY.R"
  params: []

- id: ct1_stop
  label: TAPE1 STOP
  kind: action
  command: "CT1STOP"
  params: []

- id: ct1_rc_pau
  label: TAPE1 REC/PAUSE
  kind: action
  command: "CT1RC/PAU"
  params: []

- id: ct1_ff
  label: TAPE1 FF
  kind: action
  command: "CT1FF"
  params: []

- id: ct1_rew
  label: TAPE1 REW
  kind: action
  command: "CT1REW"
  params: []

# ============================================================
# CT2 — TAPE2(B) Operation Command (RI)
# ============================================================
- id: ct2_play_f
  label: TAPE2 PLAY Forward
  kind: action
  command: "CT2PLAY.F"
  params: []

- id: ct2_play_r
  label: TAPE2 PLAY Reverse
  kind: action
  command: "CT2PLAY.R"
  params: []

- id: ct2_stop
  label: TAPE2 STOP
  kind: action
  command: "CT2STOP"
  params: []

- id: ct2_rc_pau
  label: TAPE2 REC/PAUSE
  kind: action
  command: "CT2RC/PAU"
  params: []

- id: ct2_ff
  label: TAPE2 FF
  kind: action
  command: "CT2FF"
  params: []

- id: ct2_rew
  label: TAPE2 REW
  kind: action
  command: "CT2REW"
  params: []

- id: ct2_op_cl
  label: TAPE2 OPEN/CLOSE
  kind: action
  command: "CT2OP/CL"
  params: []

- id: ct2_skip_f
  label: TAPE2 Skip Forward
  kind: action
  command: "CT2SKIP.F"
  params: []

- id: ct2_skip_r
  label: TAPE2 Skip Reverse
  kind: action
  command: "CT2SKIP.R"
  params: []

- id: ct2_rec
  label: TAPE2 REC
  kind: action
  command: "CT2REC"
  params: []

# ============================================================
# CEQ — Graphics Equalizer Operation Command (RI)
# ============================================================
- id: ceq_preset
  label: Graphics Equalizer PRESET
  kind: action
  command: "CEQPRESET"
  params: []

# ============================================================
# CDT — DAT Recorder Operation Command (RI)
# ============================================================
- id: cdt_play
  label: DAT PLAY
  kind: action
  command: "CDTPLAY"
  params: []

- id: cdt_rc_pau
  label: DAT REC/PAUSE
  kind: action
  command: "CDTRC/PAU"
  params: []

- id: cdt_stop
  label: DAT STOP
  kind: action
  command: "CDTSTOP"
  params: []

- id: cdt_skip_f
  label: DAT Skip Forward
  kind: action
  command: "CDTSKIP.F"
  params: []

- id: cdt_skip_r
  label: DAT Skip Reverse
  kind: action
  command: "CDTSKIP.R"
  params: []

- id: cdt_ff
  label: DAT FF
  kind: action
  command: "CDTFF"
  params: []

- id: cdt_rew
  label: DAT REW
  kind: action
  command: "CDTREW"
  params: []

# ============================================================
# CDV — DVD Player Operation Command (RI)
# ============================================================
- id: cdv_pwron
  label: DVD Player POWER ON
  kind: action
  command: "CDVPWRON"
  params: []

- id: cdv_pwroff
  label: DVD Player POWER OFF
  kind: action
  command: "CDVPWROFF"
  params: []

- id: cdv_play
  label: DVD Player PLAY
  kind: action
  command: "CDVPLAY"
  params: []

- id: cdv_stop
  label: DVD Player STOP
  kind: action
  command: "CDVSTOP"
  params: []

- id: cdv_skip_f
  label: DVD Player Skip Forward
  kind: action
  command: "CDVSKIP.F"
  params: []

- id: cdv_skip_r
  label: DVD Player Skip Reverse
  kind: action
  command: "CDVSKIP.R"
  params: []

- id: cdv_ff
  label: DVD Player FF
  kind: action
  command: "CDVFF"
  params: []

- id: cdv_rew
  label: DVD Player REW
  kind: action
  command: "CDVREW"
  params: []

- id: cdv_pause
  label: DVD Player PAUSE
  kind: action
  command: "CDVPAUSE"
  params: []

- id: cdv_lastplay
  label: DVD Player LAST PLAY
  kind: action
  command: "CDVLASTPLAY"
  params: []

- id: cdv_subton_off
  label: DVD Player SUBTITLE ON/OFF
  kind: action
  command: "CDVSUBTON/OFF"
  params: []

- id: cdv_subtitle
  label: DVD Player SUBTITLE
  kind: action
  command: "CDVSUBTITLE"
  params: []

- id: cdv_setup
  label: DVD Player SETUP
  kind: action
  command: "CDVSETUP"
  params: []

- id: cdv_topmenu
  label: DVD Player TOPMENU
  kind: action
  command: "CDVTOPMENU"
  params: []

- id: cdv_menu
  label: DVD Player MENU
  kind: action
  command: "CDVMENU"
  params: []

- id: cdv_up
  label: DVD Player UP
  kind: action
  command: "CDVUP"
  params: []

- id: cdv_down
  label: DVD Player DOWN
  kind: action
  command: "CDVDOWN"
  params: []

- id: cdv_left
  label: DVD Player LEFT
  kind: action
  command: "CDVLEFT"
  params: []

- id: cdv_right
  label: DVD Player RIGHT
  kind: action
  command: "CDVRIGHT"
  params: []

- id: cdv_enter
  label: DVD Player ENTER
  kind: action
  command: "CDVENTER"
  params: []

- id: cdv_return
  label: DVD Player RETURN
  kind: action
  command: "CDVRETURN"
  params: []

- id: cdv_disc_f
  label: DVD Player DISC+
  kind: action
  command: "CDVDISC.F"
  params: []

- id: cdv_disc_r
  label: DVD Player DISC-
  kind: action
  command: "CDVDISC.R"
  params: []

- id: cdv_audio
  label: DVD Player AUDIO
  kind: action
  command: "CDVAUDIO"
  params: []

- id: cdv_random
  label: DVD Player RANDOM
  kind: action
  command: "CDVRANDOM"
  params: []

- id: cdv_op_cl
  label: DVD Player OPEN/CLOSE
  kind: action
  command: "CDVOP/CL"
  params: []

- id: cdv_angle
  label: DVD Player ANGLE
  kind: action
  command: "CDVANGLE"
  params: []

- id: cdv_1
  label: DVD Player Key 1
  kind: action
  command: "CDV1"
  params: []

- id: cdv_2
  label: DVD Player Key 2
  kind: action
  command: "CDV2"
  params: []

- id: cdv_3
  label: DVD Player Key 3
  kind: action
  command: "CDV3"
  params: []

- id: cdv_4
  label: DVD Player Key 4
  kind: action
  command: "CDV4"
  params: []

- id: cdv_5
  label: DVD Player Key 5
  kind: action
  command: "CDV5"
  params: []

- id: cdv_6
  label: DVD Player Key 6
  kind: action
  command: "CDV6"
  params: []

- id: cdv_7
  label: DVD Player Key 7
  kind: action
  command: "CDV7"
  params: []

- id: cdv_8
  label: DVD Player Key 8
  kind: action
  command: "CDV8"
  params: []

- id: cdv_9
  label: DVD Player Key 9
  kind: action
  command: "CDV9"
  params: []

- id: cdv_10
  label: DVD Player Key 10
  kind: action
  command: "CDV10"
  params: []

- id: cdv_0
  label: DVD Player Key 0
  kind: action
  command: "CDV0"
  params: []

- id: cdv_search
  label: DVD Player SEARCH
  kind: action
  command: "CDVSEARCH"
  params: []

- id: cdv_disp
  label: DVD Player DISPLAY
  kind: action
  command: "CDVDISP"
  params: []

- id: cdv_repeat
  label: DVD Player REPEAT
  kind: action
  command: "CDVREPEAT"
  params: []

- id: cdv_memory
  label: DVD Player MEMORY
  kind: action
  command: "CDVMEMORY"
  params: []

- id: cdv_clear
  label: DVD Player CLEAR
  kind: action
  command: "CDVCLEAR"
  params: []

- id: cdv_abr
  label: DVD Player A-B REPEAT
  kind: action
  command: "CDVABR"
  params: []

- id: cdv_step_f
  label: DVD Player STEP
  kind: action
  command: "CDVSTEP.F"
  params: []

- id: cdv_step_r
  label: DVD Player STEP BACK
  kind: action
  command: "CDVSTEP.R"
  params: []

- id: cdv_slow_f
  label: DVD Player SLOW
  kind: action
  command: "CDVSLOW.F"
  params: []

- id: cdv_slow_r
  label: DVD Player SLOW BACK
  kind: action
  command: "CDVSLOW.R"
  params: []

- id: cdv_zoomtg
  label: DVD Player ZOOM Toggle
  kind: action
  command: "CDVZOOMTG"
  params: []

- id: cdv_zoomup
  label: DVD Player ZOOM UP
  kind: action
  command: "CDVZOOMUP"
  params: []

- id: cdv_zoomdn
  label: DVD Player ZOOM DOWN
  kind: action
  command: "CDVZOOMDN"
  params: []

- id: cdv_progre
  label: DVD Player PROGRESSIVE
  kind: action
  command: "CDVPROGRE"
  params: []

- id: cdv_vdoff
  label: DVD Player VIDEO ON/OFF
  kind: action
  command: "CDVVDOFF"
  params: []

- id: cdv_conmem
  label: DVD Player CONDITION MEMORY
  kind: action
  command: "CDVCONMEM"
  params: []

- id: cdv_funmem
  label: DVD Player FUNCTION MEMORY
  kind: action
  command: "CDVFUNMEM"
  params: []

- id: cdv_disc1
  label: DVD Player DISC1
  kind: action
  command: "CDVDISC1"
  params: []

- id: cdv_disc2
  label: DVD Player DISC2
  kind: action
  command: "CDVDISC2"
  params: []

- id: cdv_disc3
  label: DVD Player DISC3
  kind: action
  command: "CDVDISC3"
  params: []

- id: cdv_disc4
  label: DVD Player DISC4
  kind: action
  command: "CDVDISC4"
  params: []

- id: cdv_disc5
  label: DVD Player DISC5
  kind: action
  command: "CDVDISC5"
  params: []

- id: cdv_disc6
  label: DVD Player DISC6
  kind: action
  command: "CDVDISC6"
  params: []

- id: cdv_foldup
  label: DVD Player FOLDER UP
  kind: action
  command: "CDVFOLDUP"
  params: []

- id: cdv_folddn
  label: DVD Player FOLDER DOWN
  kind: action
  command: "CDVFOLDDN"
  params: []

- id: cdv_p_mode
  label: DVD Player PLAY MODE
  kind: action
  command: "CDVP.MODE"
  params: []

- id: cdv_asctg
  label: DVD Player ASPECT Toggle
  kind: action
  command: "CDVASCTG"
  params: []

- id: cdv_cdpcd
  label: DVD Player CD CHAIN REPEAT
  kind: action
  command: "CDVCDPCD"
  params: []

- id: cdv_mspup
  label: DVD Player MULTI SPEED UP
  kind: action
  command: "CDVMSPUP"
  params: []

- id: cdv_mspdn
  label: DVD Player MULTI SPEED DOWN
  kind: action
  command: "CDVMSPDN"
  params: []

- id: cdv_pct
  label: DVD Player PICTURE CONTROL
  kind: action
  command: "CDVPCT"
  params: []

- id: cdv_rsctg
  label: DVD Player RESOLUTION Toggle
  kind: action
  command: "CDVRSCTG"
  params: []

- id: cdv_init
  label: DVD Player Return to Factory Settings
  kind: action
  command: "CDVINIT"
  params: []

# ============================================================
# CMD — MD Recorder Operation Command (RI)
# ============================================================
- id: cmd_play
  label: MD PLAY
  kind: action
  command: "CMDPLAY"
  params: []

- id: cmd_stop
  label: MD STOP
  kind: action
  command: "CMDSTOP"
  params: []

- id: cmd_ff
  label: MD FF
  kind: action
  command: "CMDFF"
  params: []

- id: cmd_rew
  label: MD REW
  kind: action
  command: "CMDREW"
  params: []

- id: cmd_p_mode
  label: MD PLAY MODE
  kind: action
  command: "CMDP.MODE"
  params: []

- id: cmd_skip_f
  label: MD Skip Forward
  kind: action
  command: "CMDSKIP.F"
  params: []

- id: cmd_skip_r
  label: MD Skip Reverse
  kind: action
  command: "CMDSKIP.R"
  params: []

- id: cmd_pause
  label: MD PAUSE
  kind: action
  command: "CMDPAUSE"
  params: []

- id: cmd_rec
  label: MD REC
  kind: action
  command: "CMDREC"
  params: []

- id: cmd_memory
  label: MD MEMORY
  kind: action
  command: "CMDMEMORY"
  params: []

- id: cmd_disp
  label: MD DISPLAY
  kind: action
  command: "CMDDISP"
  params: []

- id: cmd_scroll
  label: MD SCROLL
  kind: action
  command: "CMDSCROLL"
  params: []

- id: cmd_m_scan
  label: MD MUSIC SCAN
  kind: action
  command: "CMDM.SCAN"
  params: []

- id: cmd_clear
  label: MD CLEAR
  kind: action
  command: "CMDCLEAR"
  params: []

- id: cmd_random
  label: MD RANDOM
  kind: action
  command: "CMDRANDOM"
  params: []

- id: cmd_repeat
  label: MD REPEAT
  kind: action
  command: "CMDREPEAT"
  params: []

- id: cmd_enter
  label: MD ENTER
  kind: action
  command: "CMDENTER"
  params: []

- id: cmd_eject
  label: MD EJECT
  kind: action
  command: "CMDEJECT"
  params: []

- id: cmd_1
  label: MD Key 1
  kind: action
  command: "CMD1"
  params: []

- id: cmd_2
  label: MD Key 2
  kind: action
  command: "CMD2"
  params: []

- id: cmd_3
  label: MD Key 3
  kind: action
  command: "CMD3"
  params: []

- id: cmd_4
  label: MD Key 4
  kind: action
  command: "CMD4"
  params: []

- id: cmd_5
  label: MD Key 5
  kind: action
  command: "CMD5"
  params: []

- id: cmd_6
  label: MD Key 6
  kind: action
  command: "CMD6"
  params: []

- id: cmd_7
  label: MD Key 7
  kind: action
  command: "CMD7"
  params: []

- id: cmd_8
  label: MD Key 8
  kind: action
  command: "CMD8"
  params: []

- id: cmd_9
  label: MD Key 9
  kind: action
  command: "CMD9"
  params: []

- id: cmd_10_0
  label: MD Key 10/0
  kind: action
  command: "CMD10/0"
  params: []

- id: cmd_nn_nnn
  label: MD --/---
  kind: action
  command: "CMDnn/nnn"
  params: []

- id: cmd_name
  label: MD NAME
  kind: action
  command: "CMDNAME"
  params: []

- id: cmd_group
  label: MD GROUP
  kind: action
  command: "CMDGROUP"
  params: []

- id: cmd_stby
  label: MD STANDBY
  kind: action
  command: "CMDSTBY"
  params: []

# ============================================================
# CCR — CD-R Recorder Operation Command (RI)
# ============================================================
- id: ccr_p_mode
  label: CD-R PLAY MODE
  kind: action
  command: "CCRP.MODE"
  params: []

- id: ccr_play
  label: CD-R PLAY
  kind: action
  command: "CCRPLAY"
  params: []

- id: ccr_stop
  label: CD-R STOP
  kind: action
  command: "CCRSTOP"
  params: []

- id: ccr_skip_f
  label: CD-R Skip Forward
  kind: action
  command: "CCRSKIP.F"
  params: []

- id: ccr_skip_r
  label: CD-R Skip Reverse
  kind: action
  command: "CCRSKIP.R"
  params: []

- id: ccr_pause
  label: CD-R PAUSE
  kind: action
  command: "CCRPAUSE"
  params: []

- id: ccr_rec
  label: CD-R REC
  kind: action
  command: "CCRREC"
  params: []

- id: ccr_clear
  label: CD-R CLEAR
  kind: action
  command: "CCRCLEAR"
  params: []

- id: ccr_repeat
  label: CD-R REPEAT
  kind: action
  command: "CCRREPEAT"
  params: []

- id: ccr_1
  label: CD-R Key 1
  kind: action
  command: "CCR1"
  params: []

- id: ccr_2
  label: CD-R Key 2
  kind: action
  command: "CCR2"
  params: []

- id: ccr_3
  label: CD-R Key 3
  kind: action
  command: "CCR3"
  params: []

- id: ccr_4
  label: CD-R Key 4
  kind: action
  command: "CCR4"
  params: []

- id: ccr_5
  label: CD-R Key 5
  kind: action
  command: "CCR5"
  params: []

- id: ccr_6
  label: CD-R Key 6
  kind: action
  command: "CCR6"
  params: []

- id: ccr_7
  label: CD-R Key 7
  kind: action
  command: "CCR7"
  params: []

- id: ccr_8
  label: CD-R Key 8
  kind: action
  command: "CCR8"
  params: []

- id: ccr_9
  label: CD-R Key 9
  kind: action
  command: "CCR9"
  params: []

- id: ccr_10_0
  label: CD-R Key 10/0
  kind: action
  command: "CCR10/0"
  params: []

- id: ccr_nn_nnn
  label: CD-R --/---
  kind: action
  command: "CCRnn/nnn"
  params: []

- id: ccr_scroll
  label: CD-R SCROLL
  kind: action
  command: "CCRSCROLL"
  params: []

- id: ccr_op_cl
  label: CD-R OPEN/CLOSE
  kind: action
  command: "CCROP/CL"
  params: []

- id: ccr_disp
  label: CD-R DISPLAY
  kind: action
  command: "CCRDISP"
  params: []

- id: ccr_random
  label: CD-R RANDOM
  kind: action
  command: "CCRRANDOM"
  params: []

- id: ccr_memory
  label: CD-R MEMORY
  kind: action
  command: "CCRMEMORY"
  params: []

- id: ccr_ff
  label: CD-R FF
  kind: action
  command: "CCRFF"
  params: []

- id: ccr_rew
  label: CD-R REW
  kind: action
  command: "CCRREW"
  params: []

- id: ccr_stby
  label: CD-R STANDBY
  kind: action
  command: "CCRSTBY"
  params: []

# ============================================================
# Zone 2 Commands
# ============================================================
- id: zpw_standby
  label: Zone2 Standby
  kind: action
  command: "ZPW00"
  params: []

- id: zpw_on
  label: Zone2 On
  kind: action
  command: "ZPW01"
  params: []

- id: zpw_query
  label: Get Zone2 Power Status
  kind: query
  command: "ZPWQSTN"
  params: []

- id: zmt_off
  label: Zone2 Muting Off
  kind: action
  command: "ZMT00"
  params: []

- id: zmt_on
  label: Zone2 Muting On
  kind: action
  command: "ZMT01"
  params: []

- id: zmt_toggle
  label: Zone2 Muting Wrap-Around
  kind: action
  command: "ZMTTG"
  params: []

- id: zmt_query
  label: Get Zone2 Muting Status
  kind: query
  command: "ZMTQSTN"
  params: []

- id: zvl_set
  label: Set Zone2 Volume Level
  kind: action
  command: "ZVL{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex: 00-64 (0-100) or 00-50 (0-80)"

- id: zvl_up
  label: Zone2 Volume Level Up
  kind: action
  command: "ZVLUP"
  params: []

- id: zvl_down
  label: Zone2 Volume Level Down
  kind: action
  command: "ZVLDOWN"
  params: []

- id: zvl_query
  label: Get Zone2 Volume Level
  kind: query
  command: "ZVLQSTN"
  params: []

- id: ztn_bass_set
  label: Set Zone2 Bass Level
  kind: action
  command: "ZTNB{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: ztn_treble_set
  label: Set Zone2 Treble Level
  kind: action
  command: "ZTNT{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: ztn_bup
  label: Zone2 Bass Up (2 step)
  kind: action
  command: "ZTNBUP"
  params: []

- id: ztn_bdown
  label: Zone2 Bass Down (2 step)
  kind: action
  command: "ZTNBDOWN"
  params: []

- id: ztn_tup
  label: Zone2 Treble Up (2 step)
  kind: action
  command: "ZTNTUP"
  params: []

- id: ztn_tdown
  label: Zone2 Treble Down (2 step)
  kind: action
  command: "ZTNTDOWN"
  params: []

- id: ztn_query
  label: Get Zone2 Tone
  kind: query
  command: "ZTNQSTN"
  params: []

- id: zbl_set
  label: Set Zone2 Balance
  kind: action
  command: "ZBL{xx}"
  params:
    - name: xx
      type: string
      description: "Balance: -A..00..+A [-10..0..+10, 2-step]"

- id: zbl_up
  label: Zone2 Balance Up (to R 2 step)
  kind: action
  command: "ZBLUP"
  params: []

- id: zbl_down
  label: Zone2 Balance Down (to L 2 step)
  kind: action
  command: "ZBLDOWN"
  params: []

- id: zbl_query
  label: Get Zone2 Balance
  kind: query
  command: "ZBLQSTN"
  params: []

- id: slz_video1
  label: Zone2 Select VIDEO1
  kind: action
  command: "SLZ00"
  params: []

- id: slz_video2
  label: Zone2 Select VIDEO2
  kind: action
  command: "SLZ01"
  params: []

- id: slz_video3
  label: Zone2 Select VIDEO3
  kind: action
  command: "SLZ02"
  params: []

- id: slz_video4
  label: Zone2 Select VIDEO4
  kind: action
  command: "SLZ03"
  params: []

- id: slz_video5
  label: Zone2 Select VIDEO5
  kind: action
  command: "SLZ04"
  params: []

- id: slz_video6
  label: Zone2 Select VIDEO6
  kind: action
  command: "SLZ05"
  params: []

- id: slz_video7
  label: Zone2 Select VIDEO7
  kind: action
  command: "SLZ06"
  params: []

- id: slz_dvd
  label: Zone2 Select DVD
  kind: action
  command: "SLZ10"
  params: []

- id: slz_tape1
  label: Zone2 Select TAPE1
  kind: action
  command: "SLZ20"
  params: []

- id: slz_tape2
  label: Zone2 Select TAPE2
  kind: action
  command: "SLZ21"
  params: []

- id: slz_phono
  label: Zone2 Select PHONO
  kind: action
  command: "SLZ22"
  params: []

- id: slz_cd
  label: Zone2 Select CD
  kind: action
  command: "SLZ23"
  params: []

- id: slz_fm
  label: Zone2 Select FM
  kind: action
  command: "SLZ24"
  params: []

- id: slz_am
  label: Zone2 Select AM
  kind: action
  command: "SLZ25"
  params: []

- id: slz_tuner
  label: Zone2 Select TUNER
  kind: action
  command: "SLZ26"
  params: []

- id: slz_music_server
  label: Zone2 Select MUSIC SERVER
  kind: action
  command: "SLZ27"
  params: []

- id: slz_internet_radio
  label: Zone2 Select INTERNET RADIO
  kind: action
  command: "SLZ28"
  params: []

- id: slz_usb_front
  label: Zone2 Select USB/USB(Front)
  kind: action
  command: "SLZ29"
  params: []

- id: slz_usb_rear
  label: Zone2 Select USB(Rear)
  kind: action
  command: "SLZ2A"
  params: []

- id: slz_universal_port
  label: Zone2 Select Universal PORT
  kind: action
  command: "SLZ40"
  params: []

- id: slz_multi_ch
  label: Zone2 Select MULTI CH
  kind: action
  command: "SLZ30"
  params: []

- id: slz_xm
  label: Zone2 Select XM
  kind: action
  command: "SLZ31"
  params: []

- id: slz_sirius
  label: Zone2 Select SIRIUS
  kind: action
  command: "SLZ32"
  params: []

- id: slz_source
  label: Zone2 Select SOURCE
  kind: action
  command: "SLZ80"
  params: []

- id: slz_query
  label: Get Zone2 Selector Position
  kind: query
  command: "SLZQSTN"
  params: []

- id: tuz_set
  label: Set Zone2 Tuning Frequency
  kind: action
  command: "TUZ{nnnnn}"
  params:
    - name: nnnnn
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"

- id: tuz_up
  label: Zone2 Tuning Frequency Wrap-Around Up
  kind: action
  command: "TUZUP"
  params: []

- id: tuz_down
  label: Zone2 Tuning Frequency Wrap-Around Down
  kind: action
  command: "TUZDOWN"
  params: []

- id: tuz_query
  label: Get Zone2 Tuning Frequency
  kind: query
  command: "TUZQSTN"
  params: []

- id: prz_set
  label: Set Zone2 Preset Number
  kind: action
  command: "PRZ{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40) or 01-1E (1-30)"

- id: prz_up
  label: Zone2 Preset No. Wrap-Around Up
  kind: action
  command: "PRZUP"
  params: []

- id: prz_down
  label: Zone2 Preset No. Wrap-Around Down
  kind: action
  command: "PRZDOWN"
  params: []

- id: prz_query
  label: Get Zone2 Preset No.
  kind: query
  command: "PRZQSTN"
  params: []

- id: ntz_play
  label: Zone2 Net-Tune PLAY KEY
  kind: action
  command: "NTZPLAY"
  params: []

- id: ntz_stop
  label: Zone2 Net-Tune STOP KEY
  kind: action
  command: "NTZSTOP"
  params: []

- id: ntz_pause
  label: Zone2 Net-Tune PAUSE KEY
  kind: action
  command: "NTZPAUSE"
  params: []

- id: ntz_trup
  label: Zone2 Net-Tune TRACK UP KEY
  kind: action
  command: "NTZTRUP"
  params: []

- id: ntz_trdn
  label: Zone2 Net-Tune TRACK DOWN KEY
  kind: action
  command: "NTZTRDN"
  params: []

- id: ntz_chup
  label: Zone2 Net-Tune CH UP (for iRadio)
  kind: action
  command: "NTZCHUP"
  params: []

- id: ntz_chdn
  label: Zone2 Net-Tune CH DOWN (for iRadio)
  kind: action
  command: "NTZCHDN"
  params: []

- id: npz_set
  label: Set Zone2 Internet Radio Preset
  kind: action
  command: "NPZ{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40)"

- id: lmz_stereo
  label: Zone2 Listening Mode STEREO
  kind: action
  command: "LMZ00"
  params: []

- id: lmz_direct
  label: Zone2 Listening Mode DIRECT
  kind: action
  command: "LMZ01"
  params: []

- id: lmz_mono
  label: Zone2 Listening Mode MONO
  kind: action
  command: "LMZ0F"
  params: []

- id: lmz_multiplex
  label: Zone2 Listening Mode MULTIPLEX
  kind: action
  command: "LMZ12"
  params: []

- id: lmz_dvs_pl2
  label: Zone2 Listening Mode DVS (PL2)
  kind: action
  command: "LMZ87"
  params: []

- id: lmz_dvs_neo6
  label: Zone2 Listening Mode DVS (NEO6)
  kind: action
  command: "LMZ88"
  params: []

- id: ltz_z2_off
  label: Zone2 Late Night Off
  kind: action
  command: "LTZ00"
  params: []

- id: ltz_z2_low
  label: Zone2 Late Night Low
  kind: action
  command: "LTZ01"
  params: []

- id: ltz_z2_high
  label: Zone2 Late Night High
  kind: action
  command: "LTZ02"
  params: []

- id: ltz_z2_up
  label: Zone2 Late Night State Wrap-Around Up
  kind: action
  command: "LTZUP"
  params: []

- id: ltz_z2_query
  label: Get Zone2 Late Night Level
  kind: query
  command: "LTZQSTN"
  params: []

- id: raz_off
  label: Zone2 Re-EQ/Academy Filter Off
  kind: action
  command: "RAZ00"
  params: []

- id: raz_reeq_on
  label: Zone2 Re-EQ On
  kind: action
  command: "RAZ01"
  params: []

- id: raz_academy_on
  label: Zone2 Academy Filter On
  kind: action
  command: "RAZ02"
  params: []

- id: raz_up
  label: Zone2 Re-EQ/Academy State Wrap-Around Up
  kind: action
  command: "RAZUP"
  params: []

- id: raz_query
  label: Get Zone2 Re-EQ/Academy State
  kind: query
  command: "RAZQSTN"
  params: []

# ============================================================
# Zone 3 Commands
# ============================================================
- id: pw3_standby
  label: Zone3 Standby
  kind: action
  command: "PW300"
  params: []

- id: pw3_on
  label: Zone3 On
  kind: action
  command: "PW301"
  params: []

- id: pw3_query
  label: Get Zone3 Power Status
  kind: query
  command: "PW3QSTN"
  params: []

- id: mt3_off
  label: Zone3 Muting Off
  kind: action
  command: "MT300"
  params: []

- id: mt3_on
  label: Zone3 Muting On
  kind: action
  command: "MT301"
  params: []

- id: mt3_toggle
  label: Zone3 Muting Wrap-Around
  kind: action
  command: "MT3TG"
  params: []

- id: mt3_query
  label: Get Zone3 Muting Status
  kind: query
  command: "MT3QSTN"
  params: []

- id: vl3_set
  label: Set Zone3 Volume Level
  kind: action
  command: "VL3{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex: 00-64 (0-100) or 00-50 (0-80)"

- id: vl3_up
  label: Zone3 Volume Level Up
  kind: action
  command: "VL3UP"
  params: []

- id: vl3_down
  label: Zone3 Volume Level Down
  kind: action
  command: "VL3DOWN"
  params: []

- id: vl3_query
  label: Get Zone3 Volume Level
  kind: query
  command: "VL3QSTN"
  params: []

- id: tn3_bass_set
  label: Set Zone3 Bass Level
  kind: action
  command: "TN3B{xx}"
  params:
    - name: xx
      type: string
      description: "Bass level: -A..00..+A [-10..0..+10, 2-step]"

- id: tn3_treble_set
  label: Set Zone3 Treble Level
  kind: action
  command: "TN3T{xx}"
  params:
    - name: xx
      type: string
      description: "Treble level: -A..00..+A [-10..0..+10, 2-step]"

- id: tn3_bup
  label: Zone3 Bass Up (2 step)
  kind: action
  command: "TN3BUP"
  params: []

- id: tn3_bdown
  label: Zone3 Bass Down (2 step)
  kind: action
  command: "TN3BDOWN"
  params: []

- id: tn3_tup
  label: Zone3 Treble Up (2 step)
  kind: action
  command: "TN3TUP"
  params: []

- id: tn3_tdown
  label: Zone3 Treble Down (2 step)
  kind: action
  command: "TN3TDOWN"
  params: []

- id: tn3_query
  label: Get Zone3 Tone
  kind: query
  command: "TN3QSTN"
  params: []

- id: bl3_set
  label: Set Zone3 Balance
  kind: action
  command: "BL3{xx}"
  params:
    - name: xx
      type: string
      description: "Balance: -A..00..+A [-10..0..+10, 2-step]"

- id: bl3_up
  label: Zone3 Balance Up (to R 2 step)
  kind: action
  command: "BL3UP"
  params: []

- id: bl3_down
  label: Zone3 Balance Down (to L 2 step)
  kind: action
  command: "BL3DOWN"
  params: []

- id: bl3_query
  label: Get Zone3 Balance
  kind: query
  command: "BL3QSTN"
  params: []

- id: sl3_video1
  label: Zone3 Select VIDEO1
  kind: action
  command: "SL300"
  params: []

- id: sl3_video2
  label: Zone3 Select VIDEO2
  kind: action
  command: "SL301"
  params: []

- id: sl3_video3
  label: Zone3 Select VIDEO3
  kind: action
  command: "SL302"
  params: []

- id: sl3_video4
  label: Zone3 Select VIDEO4
  kind: action
  command: "SL303"
  params: []

- id: sl3_video5
  label: Zone3 Select VIDEO5
  kind: action
  command: "SL304"
  params: []

- id: sl3_video6
  label: Zone3 Select VIDEO6
  kind: action
  command: "SL305"
  params: []

- id: sl3_video7
  label: Zone3 Select VIDEO7
  kind: action
  command: "SL306"
  params: []

- id: sl3_dvd
  label: Zone3 Select DVD
  kind: action
  command: "SL310"
  params: []

- id: sl3_tape1
  label: Zone3 Select TAPE1
  kind: action
  command: "SL320"
  params: []

- id: sl3_tape2
  label: Zone3 Select TAPE2
  kind: action
  command: "SL321"
  params: []

- id: sl3_phono
  label: Zone3 Select PHONO
  kind: action
  command: "SL322"
  params: []

- id: sl3_cd
  label: Zone3 Select CD
  kind: action
  command: "SL323"
  params: []

- id: sl3_fm
  label: Zone3 Select FM
  kind: action
  command: "SL324"
  params: []

- id: sl3_am
  label: Zone3 Select AM
  kind: action
  command: "SL325"
  params: []

- id: sl3_tuner
  label: Zone3 Select TUNER
  kind: action
  command: "SL326"
  params: []

- id: sl3_music_server
  label: Zone3 Select MUSIC SERVER
  kind: action
  command: "SL327"
  params: []

- id: sl3_internet_radio
  label: Zone3 Select INTERNET RADIO
  kind: action
  command: "SL328"
  params: []

- id: sl3_usb_front
  label: Zone3 Select USB/USB(Front)
  kind: action
  command: "SL329"
  params: []

- id: sl3_usb_rear
  label: Zone3 Select USB(Rear)
  kind: action
  command: "SL32A"
  params: []

- id: sl3_universal_port
  label: Zone3 Select Universal PORT
  kind: action
  command: "SL340"
  params: []

- id: sl3_multi_ch
  label: Zone3 Select MULTI CH
  kind: action
  command: "SL330"
  params: []

- id: sl3_xm
  label: Zone3 Select XM
  kind: action
  command: "SL331"
  params: []

- id: sl3_sirius
  label: Zone3 Select SIRIUS
  kind: action
  command: "SL332"
  params: []

- id: sl3_source
  label: Zone3 Select SOURCE
  kind: action
  command: "SL380"
  params: []

- id: sl3_query
  label: Get Zone3 Selector Position
  kind: query
  command: "SL3QSTN"
  params: []

- id: tu3_set
  label: Set Zone3 Tuning Frequency
  kind: action
  command: "TU3{nnnnn}"
  params:
    - name: nnnnn
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"

- id: tu3_up
  label: Zone3 Tuning Frequency Wrap-Around Up
  kind: action
  command: "TU3UP"
  params: []

- id: tu3_down
  label: Zone3 Tuning Frequency Wrap-Around Down
  kind: action
  command: "TU3DOWN"
  params: []

- id: tu3_query
  label: Get Zone3 Tuning Frequency
  kind: query
  command: "TU3QSTN"
  params: []

- id: pr3_set
  label: Set Zone3 Preset Number
  kind: action
  command: "PR3{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40) or 01-1E (1-30)"

- id: pr3_up
  label: Zone3 Preset No. Wrap-Around Up
  kind: action
  command: "PR3UP"
  params: []

- id: pr3_down
  label: Zone3 Preset No. Wrap-Around Down
  kind: action
  command: "PR3DOWN"
  params: []

- id: pr3_query
  label: Get Zone3 Preset No.
  kind: query
  command: "PR3QSTN"
  params: []

- id: nt3_play
  label: Zone3 Net-Tune PLAY KEY
  kind: action
  command: "NT3PLAY"
  params: []

- id: nt3_stop
  label: Zone3 Net-Tune STOP KEY
  kind: action
  command: "NT3STOP"
  params: []

- id: nt3_pause
  label: Zone3 Net-Tune PAUSE KEY
  kind: action
  command: "NT3PAUSE"
  params: []

- id: nt3_trup
  label: Zone3 Net-Tune TRACK UP KEY
  kind: action
  command: "NT3TRUP"
  params: []

- id: nt3_trdn
  label: Zone3 Net-Tune TRACK DOWN KEY
  kind: action
  command: "NT3TRDN"
  params: []

- id: nt3_chup
  label: Zone3 Net-Tune CH UP (for iRadio)
  kind: action
  command: "NT3CHUP"
  params: []

- id: nt3_chdn
  label: Zone3 Net-Tune CH DOWN (for iRadio)
  kind: action
  command: "NT3CHDN"
  params: []

- id: np3_set
  label: Set Zone3 Internet Radio Preset
  kind: action
  command: "NP3{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40)"

# ============================================================
# Zone 4 Commands
# ============================================================
- id: pw4_standby
  label: Zone4 Standby
  kind: action
  command: "PW400"
  params: []

- id: pw4_on
  label: Zone4 On
  kind: action
  command: "PW401"
  params: []

- id: pw4_query
  label: Get Zone4 Power Status
  kind: query
  command: "PW4QSTN"
  params: []

- id: mt4_off
  label: Zone4 Muting Off
  kind: action
  command: "MT400"
  params: []

- id: mt4_on
  label: Zone4 Muting On
  kind: action
  command: "MT401"
  params: []

- id: mt4_toggle
  label: Zone4 Muting Wrap-Around
  kind: action
  command: "MT4TG"
  params: []

- id: mt4_query
  label: Get Zone4 Muting Status
  kind: query
  command: "MT4QSTN"
  params: []

- id: vl4_set
  label: Set Zone4 Volume Level
  kind: action
  command: "VL4{level}"
  params:
    - name: level
      type: string
      description: "Volume level in hex: 00-64 (0-100) or 00-50 (0-80)"

- id: vl4_up
  label: Zone4 Volume Level Up
  kind: action
  command: "VL4UP"
  params: []

- id: vl4_down
  label: Zone4 Volume Level Down
  kind: action
  command: "VL4DOWN"
  params: []

- id: vl4_query
  label: Get Zone4 Volume Level
  kind: query
  command: "VL4QSTN"
  params: []

- id: sl4_video1
  label: Zone4 Select VIDEO1
  kind: action
  command: "SL400"
  params: []

- id: sl4_video2
  label: Zone4 Select VIDEO2
  kind: action
  command: "SL401"
  params: []

- id: sl4_video3
  label: Zone4 Select VIDEO3
  kind: action
  command: "SL402"
  params: []

- id: sl4_video4
  label: Zone4 Select VIDEO4
  kind: action
  command: "SL403"
  params: []

- id: sl4_video5
  label: Zone4 Select VIDEO5
  kind: action
  command: "SL404"
  params: []

- id: sl4_video6
  label: Zone4 Select VIDEO6
  kind: action
  command: "SL405"
  params: []

- id: sl4_video7
  label: Zone4 Select VIDEO7
  kind: action
  command: "SL406"
  params: []

- id: sl4_dvd
  label: Zone4 Select DVD
  kind: action
  command: "SL410"
  params: []

- id: sl4_tape1
  label: Zone4 Select TAPE1
  kind: action
  command: "SL420"
  params: []

- id: sl4_tape2
  label: Zone4 Select TAPE2
  kind: action
  command: "SL421"
  params: []

- id: sl4_phono
  label: Zone4 Select PHONO
  kind: action
  command: "SL422"
  params: []

- id: sl4_cd
  label: Zone4 Select CD
  kind: action
  command: "SL423"
  params: []

- id: sl4_fm
  label: Zone4 Select FM
  kind: action
  command: "SL424"
  params: []

- id: sl4_am
  label: Zone4 Select AM
  kind: action
  command: "SL425"
  params: []

- id: sl4_tuner
  label: Zone4 Select TUNER
  kind: action
  command: "SL426"
  params: []

- id: sl4_music_server
  label: Zone4 Select MUSIC SERVER
  kind: action
  command: "SL427"
  params: []

- id: sl4_internet_radio
  label: Zone4 Select INTERNET RADIO
  kind: action
  command: "SL428"
  params: []

- id: sl4_usb_front
  label: Zone4 Select USB/USB(Front)
  kind: action
  command: "SL429"
  params: []

- id: sl4_usb_rear
  label: Zone4 Select USB(Rear)
  kind: action
  command: "SL42A"
  params: []

- id: sl4_universal_port
  label: Zone4 Select Universal PORT
  kind: action
  command: "SL440"
  params: []

- id: sl4_multi_ch
  label: Zone4 Select MULTI CH
  kind: action
  command: "SL430"
  params: []

- id: sl4_xm
  label: Zone4 Select XM
  kind: action
  command: "SL431"
  params: []

- id: sl4_sirius
  label: Zone4 Select SIRIUS
  kind: action
  command: "SL432"
  params: []

- id: sl4_source
  label: Zone4 Select SOURCE
  kind: action
  command: "SL480"
  params: []

- id: sl4_query
  label: Get Zone4 Selector Position
  kind: query
  command: "SL4QSTN"
  params: []

- id: tu4_set
  label: Set Zone4 Tuning Frequency
  kind: action
  command: "TU4{nnnnn}"
  params:
    - name: nnnnn
      type: string
      description: "FM nnn.nn MHz / AM nnnnn kHz"

- id: tu4_up
  label: Zone4 Tuning Frequency Wrap-Around Up
  kind: action
  command: "TU4UP"
  params: []

- id: tu4_down
  label: Zone4 Tuning Frequency Wrap-Around Down
  kind: action
  command: "TU4DOWN"
  params: []

- id: tu4_query
  label: Get Zone4 Tuning Frequency
  kind: query
  command: "TU4QSTN"
  params: []

- id: pr4_set
  label: Set Zone4 Preset Number
  kind: action
  command: "PR4{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40) or 01-1E (1-30)"

- id: pr4_up
  label: Zone4 Preset No. Wrap-Around Up
  kind: action
  command: "PR4UP"
  params: []

- id: pr4_down
  label: Zone4 Preset No. Wrap-Around Down
  kind: action
  command: "PR4DOWN"
  params: []

- id: pr4_query
  label: Get Zone4 Preset No.
  kind: query
  command: "PR4QSTN"
  params: []

- id: nt4_play
  label: Zone4 Net-Tune PLAY KEY
  kind: action
  command: "NT4PLAY"
  params: []

- id: nt4_stop
  label: Zone4 Net-Tune STOP KEY
  kind: action
  command: "NT4STOP"
  params: []

- id: nt4_pause
  label: Zone4 Net-Tune PAUSE KEY
  kind: action
  command: "NT4PAUSE"
  params: []

- id: nt4_trup
  label: Zone4 Net-Tune TRACK UP KEY
  kind: action
  command: "NT4TRUP"
  params: []

- id: nt4_trdn
  label: Zone4 Net-Tune TRACK DOWN KEY
  kind: action
  command: "NT4TRDN"
  params: []

- id: np4_set
  label: Set Zone4 Internet Radio Preset
  kind: action
  command: "NP4{nn}"
  params:
    - name: nn
      type: string
      description: "Preset number in hex: 01-28 (1-40)"

# ============================================================
# CDS — Docking Station Command via RI
# ============================================================
- id: cds_pwron
  label: Dock On
  kind: action
  command: "CDSPWRON"
  params: []

- id: cds_pwroff
  label: Dock Standby
  kind: action
  command: "CDSPWROFF"
  params: []

- id: cds_ply_res
  label: Dock PLAY/RESUME Key
  kind: action
  command: "CDSPLY/RES"
  params: []

- id: cds_stop
  label: Dock STOP Key
  kind: action
  command: "CDSSTOP"
  params: []

- id: cds_skip_f
  label: Dock TRACK UP Key
  kind: action
  command: "CDSSKIP.F"
  params: []

- id: cds_skip_r
  label: Dock TRACK DOWN Key
  kind: action
  command: "CDSSKIP.R"
  params: []

- id: cds_pause
  label: Dock PAUSE Key
  kind: action
  command: "CDSPAUSE"
  params: []

- id: cds_ply_pau
  label: Dock PLAY/PAUSE Key
  kind: action
  command: "CDSPLY/PAU"
  params: []

- id: cds_ff
  label: Dock FF Key
  kind: action
  command: "CDSFF"
  params: []

- id: cds_rew
  label: Dock FR Key
  kind: action
  command: "CDSREW"
  params: []

- id: cds_album_plus
  label: Dock ALBUM UP Key
  kind: action
  command: "CDSALBUM+"
  params: []

- id: cds_album_minus
  label: Dock ALBUM DOWN Key
  kind: action
  command: "CDSALBUM-"
  params: []

- id: cds_plist_plus
  label: Dock PLAYLIST UP Key
  kind: action
  command: "CDSPLIST+"
  params: []

- id: cds_plist_minus
  label: Dock PLAYLIST DOWN Key
  kind: action
  command: "CDSPLIST-"
  params: []

- id: cds_chapt_plus
  label: Dock CHAPTER UP Key
  kind: action
  command: "CDSCHAPT+"
  params: []

- id: cds_chapt_minus
  label: Dock CHAPTER DOWN Key
  kind: action
  command: "CDSCHAPT-"
  params: []

- id: cds_random
  label: Dock SHUFFLE Key
  kind: action
  command: "CDSRANDOM"
  params: []

- id: cds_repeat
  label: Dock REPEAT Key
  kind: action
  command: "CDSREPEAT"
  params: []

- id: cds_mute
  label: Dock MUTE Key
  kind: action
  command: "CDSMUTE"
  params: []

- id: cds_blight
  label: Dock BACKLIGHT Key
  kind: action
  command: "CDSBLIGHT"
  params: []

- id: cds_menu
  label: Dock MENU Key
  kind: action
  command: "CDSMENU"
  params: []

- id: cds_enter
  label: Dock SELECT Key
  kind: action
  command: "CDSENTER"
  params: []

- id: cds_up
  label: Dock CURSOR UP Key
  kind: action
  command: "CDSUP"
  params: []

- id: cds_down
  label: Dock CURSOR DOWN Key
  kind: action
  command: "CDSDOWN"
  params: []
```

## Feedbacks
```yaml
- id: pwr_state
  type: enum
  values: [on, standby]
  description: System power state reported by PWR status message

- id: amt_state
  type: enum
  values: [on, off]
  description: Audio muting state

- id: mvl_state
  type: integer
  description: Master volume level (hex 00-64 or 00-50 depending on model)

- id: sli_state
  type: string
  description: Current input selector position (hex code matching SLI parameter)

- id: lmd_state
  type: string
  description: Current listening mode (hex code matching LMD parameter)

- id: tun_state
  type: string
  description: Current tuning frequency (nnnnn format)

- id: prs_state
  type: string
  description: Current preset number (hex)

- id: nst_state
  type: string
  description: Net/USB play status (3-char: play/repeat/shuffle)

- id: zpw_state
  type: enum
  values: [on, standby]
  description: Zone2 power state

- id: zvl_state
  type: string
  description: Zone2 volume level

- id: slz_state
  type: string
  description: Zone2 selector position

- id: pw3_state
  type: enum
  values: [on, standby]
  description: Zone3 power state

- id: vl3_state
  type: string
  description: Zone3 volume level

- id: sl3_state
  type: string
  description: Zone3 selector position

- id: pw4_state
  type: enum
  values: [on, standby]
  description: Zone4 power state

- id: vl4_state
  type: string
  description: Zone4 volume level

- id: sl4_state
  type: string
  description: Zone4 selector position
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "TGA/TGB/TGC 12V triggers are available only when each 12V Trigger parameter is set to OFF in Setup Menu"
  - description: "Zone2 tone (ZTN) only works when main zone is ON and Zone2 is powered or variable"
  - description: "Zone2 volume (ZVL) only works when main is ON"
  - description: "eISCP: interval time receiving message needs to be more than 50msec; max one client connection"
  - description: "RS-232C: device must respond within 50msec or communication has failed"
```

## Notes
- Source document: Integra Serial Communication Protocol for AV Receiver, ISCP v1.15, 2009-08-31, ONKYO CORPORATION.
- RS-232C message format: `!1{CMD}{PARAM}[CR]` (Controller to Device). Device responds with `!1{CMD}{PARAM}[EOF]`.
- eISCP (Ethernet) wraps the same ISCP message body in a 16-byte header. TCP destination port default is 60128 (configurable 49152-65535).
- The protocol supports unsolicited status messages from the device whenever state changes.
- XM and SIRIUS commands are only available on models with those tuner options.
- HD Radio commands are only available on HD Radio models.
- RDS commands are only available on RDS/RBDS models (RBDS supports RT information only).
- RI (Remote Interactive) bus commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) control downstream peripherals connected via the RI jack.
- Net-Tune FF/REW (NTC FF/REW) must be sent continuously with no more than 100ms delay between codes.
- Zone 2/3/4 tuner and Net-Tune functions are shared with the main zone but controlled separately.
- Display mode "TG" parameter appears in source as "UP" for some earlier models (noted with *1 in source).
<!-- UNRESOLVED: entity slug "integra_cdc_34" does not match the source document which covers AV receivers, not the CDC-3.4 CD changer. All commands are from the ISCP v1.15 AV receiver source verbatim. -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-04-29T09:20:22.333Z
last_checked_at: 2026-06-02T10:14:07.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T10:14:07.044Z
matched_actions: 815
action_count: 815
confidence: medium
summary: "All 815 spec actions matched verbatim in ISCP v1.15 source; dif_04 label now correctly reads Display Treble Level matching source table row 04; transport confirmed. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the entity slug \"integra_cdc_34\" refers to a CDC-3.4 CD changer; the provided source document is the ISCP v1.15 AV receiver protocol. All commands below are from the ISCP receiver source verbatim."
- "entity slug \"integra_cdc_34\" does not match the source document which covers AV receivers, not the CDC-3.4 CD changer. All commands are from the ISCP v1.15 AV receiver source verbatim."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
