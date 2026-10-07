---
spec_id: admin/onkyo-tx_sr876
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-SR876 Control Spec"
manufacturer: Onkyo
model_family: TX-SR876
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - TX-SR876
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:32:49.601Z
last_checked_at: 2026-10-07T20:35:22.444Z
generated_at: 2026-10-07T20:35:22.444Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Ethernet port number defaults to 60128 but can be changed to 49152-65535 per setup menu; actual configured port not stated"
  - "XM/SIRIUS/HD Radio-specific commands are model-dependent; TX-SR876 XM support confirmed (SLI31), SIRIUS/HD Radio unconfirmed"
  - "actual configured port may differ (range 49152-65535)"
  - "display information (DIF) responses have variable format not fully specified"
  - "XM/SIRIUS/HD Radio info feedbacks are model-dependent"
  - "source does not enumerate settable Variables separately from Actions;"
  - "no explicit macro sequences described in source"
  - "no explicit safety warnings or power-on sequencing procedures in source"
  - "firmware version compatibility not stated in source"
  - "XM/SIRIUS/HD Radio-specific commands only available on corresponding models"
  - "exact support matrix column for TX-SR876 is ambiguous in parsed source; high-end model assumed to support all documented features"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:35:22.444Z
  matched_actions: 190
  action_count: 190
  confidence: medium
  summary: "All 190 action units map to source ISCP mnemonics with matching parameter shapes and transport values; all ~113 source mnemonics are represented. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Onkyo TX-SR876 Control Spec

## Summary
AV receiver supporting both RS-232C and Ethernet (eISCP) control. ISCP protocol with 3-character command codes and variable-length parameters. Supports power, volume, input routing, tuning, listening modes, tone control, Audyssey, triggers, OSD, and multi-zone operation (main + Zone2 + Zone3 + Zone4). Protocol document version 1.15 (31 August 2009); TX-SR876 added in revision 1.10.

<!-- UNRESOLVED: Ethernet port number defaults to 60128 but can be changed to 49152-65535 per setup menu; actual configured port not stated -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio-specific commands are model-dependent; TX-SR876 XM support confirmed (SLI31), SIRIUS/HD Radio unconfirmed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 60128  # default; UNRESOLVED: actual configured port may differ (range 49152-65535)
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: "DB9 female (pin 2 TX, pin 3 RX, pin 5 GND); straight-thru cable; 3-wire"
  message_terminator: "[CR] or [LF] or [CR][LF]"
tcp:
  message_terminator: "[EOF] (0x1A) or [EOF][CR] or [EOF][CR][LF]"
  eiscp_header_size: "0x00000010 (BIGENDIAN)"
  eiscp_version: "0x01"
  eiscp_unit_type: "1 (Receiver)"
  note: "One persistent connection required; only one client connection allowed"
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
- powerable       # PWR commands present
- routable        # SLI input selector present
- queryable       # QSTN query commands present
- levelable       # MVL volume, SWL/CTL subwoofer/center level, tone commands present
- tunable         # TUN/PRS tuner commands present
- multi_zone      # Zone2/Zone3/Zone4 command sets present
```

## Actions
```yaml
# ── System Power (PWR) ──────────────────────────────────────────
- id: power_on
  label: Power On
  kind: action
  command: "!1PWR01"
  params: []

- id: power_off
  label: Power Off / Standby
  kind: action
  command: "!1PWR00"
  params: []

- id: power_query
  label: Query Power Status
  kind: action
  command: "!1PWRQSTN"
  params: []

# ── Audio Muting (AMT) ──────────────────────────────────────────
- id: set_muting
  label: Set Audio Muting
  kind: action
  command: "!1AMT{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on'

- id: muting_toggle
  label: Audio Muting Wrap-Around (Toggle)
  kind: action
  command: "!1AMTTG"
  params: []

- id: muting_query
  label: Query Audio Muting State
  kind: action
  command: "!1AMTQSTN"
  params: []

# ── Speaker A/B (SPA/SPB) ───────────────────────────────────────
- id: set_speaker_a
  label: Set Speaker A
  kind: action
  command: "!1SPA{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "UP" wrap-around, "QSTN" query'

- id: set_speaker_b
  label: Set Speaker B
  kind: action
  command: "!1SPB{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "UP" wrap-around, "QSTN" query'

# ── Speaker Layout (SPL) ───────────────────────────────────────
- id: set_speaker_layout
  label: Set Speaker Layout
  kind: action
  command: "!1SPL{layout}"
  params:
    - name: layout
      type: string
      description: '"SB" SurrBack, "FH" Front High, "FW" Front Wide, "UP" wrap-around, "QSTN" query'

# ── Master Volume (MVL) ─────────────────────────────────────────
- id: set_volume
  label: Set Master Volume
  kind: action
  command: "!1MVL{level}"
  params:
    - name: level
      type: integer
      description: Volume 0-100 (hex 00-64)

- id: volume_up
  label: Volume Up
  kind: action
  command: "!1MVLUP"
  params: []

- id: volume_down
  label: Volume Down
  kind: action
  command: "!1MVLDOWN"
  params: []

- id: volume_up_1db
  label: Volume Up 1dB Step
  kind: action
  command: "!1MVLUP1"
  params: []

- id: volume_down_1db
  label: Volume Down 1dB Step
  kind: action
  command: "!1MVLDOWN1"
  params: []

- id: query_volume
  label: Query Volume Level
  kind: action
  command: "!1MVLQSTN"
  params: []

# ── Tone - Front (TFR) ──────────────────────────────────────────
- id: set_tone_front
  label: Set Front Tone
  kind: action
  command: "!1TFR{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx" (-A..00..+A, -10..0..+10 2-step), "BUP", "BDOWN"
        Treble: "Txx" (-A..00..+A), "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Front Wide (TFW) ─────────────────────────────────────
- id: set_tone_front_wide
  label: Set Front Wide Tone
  kind: action
  command: "!1TFW{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Front High (TFH) ─────────────────────────────────────
- id: set_tone_front_high
  label: Set Front High Tone
  kind: action
  command: "!1TFH{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Center (TCT) ─────────────────────────────────────────
- id: set_tone_center
  label: Set Center Tone
  kind: action
  command: "!1TCT{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Surround (TSR) ───────────────────────────────────────
- id: set_tone_surround
  label: Set Surround Tone
  kind: action
  command: "!1TSR{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Surround Back (TSB) ──────────────────────────────────
- id: set_tone_surround_back
  label: Set Surround Back Tone
  kind: action
  command: "!1TSB{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Tone - Subwoofer (TSW) ──────────────────────────────────────
- id: set_tone_subwoofer
  label: Set Subwoofer Tone
  kind: action
  command: "!1TSW{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Query: "QSTN"

# ── Sleep Timer (SLP) ───────────────────────────────────────────
- id: set_sleep
  label: Set Sleep Timer
  kind: action
  command: "!1SLP{minutes}"
  params:
    - name: minutes
      type: string
      description: Sleep time 1-90 min (hex 01-5A), "OFF" to cancel, "UP" wrap-around, "QSTN" query

- id: query_sleep
  label: Query Sleep Timer
  kind: action
  command: "!1SLPQSTN"
  params: []

# ── Speaker Level Calibration (SLC) ─────────────────────────────
- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: "!1SLC{key}"
  params:
    - name: key
      type: string
      description: '"TEST" TEST key, "CHSEL" CH SEL key, "UP" LEVEL+, "DOWN" LEVEL-'

# ── Subwoofer Temp Level (SWL) ──────────────────────────────────
- id: set_subwoofer_level
  label: Set Subwoofer Temporary Level
  kind: action
  command: "!1SWL{level}"
  params:
    - name: level
      type: string
      description: '"-F".."00".."+C" (-15dB..0dB..+12dB), "UP", "DOWN", "QSTN"'

# ── Center Temp Level (CTL) ─────────────────────────────────────
- id: set_center_level
  label: Set Center Temporary Level
  kind: action
  command: "!1CTL{level}"
  params:
    - name: level
      type: string
      description: '"-C".."00".."+C" (-12dB..0dB..+12dB), "UP", "DOWN", "QSTN"'

# ── Display Information (DIF) ───────────────────────────────────
- id: set_display
  label: Set Display Information / Mode
  kind: action
  command: "!1DIF{mode}"
  params:
    - name: mode
      type: string
      description: |
        Display info: "00" Program Format, "01" Digital Input Position,
        "02" Digital Format Position, "03" Bass Level, "04" Treble Level
        Display mode: "00" Selector+Volume, "01" Selector+Listening Mode,
        "02" Digital Format (temp), "03" Video Format (temp), "TG" wrap-around, "QSTN" query

# ── Dimmer (DIM) ────────────────────────────────────────────────
- id: set_dimmer
  label: Set Dimmer Level
  kind: action
  command: "!1DIM{level}"
  params:
    - name: level
      type: string
      description: '"00" Bright, "01" Dim, "02" Dark, "03" Shut-Off, "08" Bright & LED OFF, "DIM" wrap-around, "QSTN" query'

- id: query_dimmer
  label: Query Dimmer Level
  kind: action
  command: "!1DIMQSTN"
  params: []

# ── OSD Setup Operation (OSD) ───────────────────────────────────
- id: osd_menu
  label: OSD Menu Operation
  kind: action
  command: "!1OSD{key}"
  params:
    - name: key
      type: string
      description: '"MENU", "UP", "DOWN", "RIGHT", "LEFT", "ENTER", "EXIT", "AUDIO" (Audio Adjust), "VIDEO" (Video Adjust)'

# ── Memory Setup (MEM) ──────────────────────────────────────────
- id: memory_setup
  label: Memory Setup
  kind: action
  command: "!1MEM{action}"
  params:
    - name: action
      type: string
      description: '"STR" store, "RCL" recall, "LOCK" lock, "UNLK" unlock'

# ── Audio Information (IFA) ─────────────────────────────────────
- id: query_audio_info
  label: Query Audio Information
  kind: action
  command: "!1IFAQSTN"
  params: []

# ── Video Information (IFV) ─────────────────────────────────────
- id: query_video_info
  label: Query Video Information
  kind: action
  command: "!1IFVQSTN"
  params: []

# ── Input Selector (SLI) ────────────────────────────────────────
- id: set_input
  label: Set Input Selector
  kind: action
  command: "!1SLI{input}"
  params:
    - name: input
      type: string
      description: |
        Input code:
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4,
        "04" VIDEO5, "10" DVD, "20" TAPE1, "21" TAPE2,
        "22" PHONO, "23" CD, "24" FM, "25" AM,
        "UP" wrap-around up, "DOWN" wrap-around down, "QSTN" query

- id: input_up
  label: Input Selector Wrap-Around Up
  kind: action
  command: "!1SLIUP"
  params: []

- id: input_down
  label: Input Selector Wrap-Around Down
  kind: action
  command: "!1SLIDOWN"
  params: []

- id: query_input
  label: Query Input Selector
  kind: action
  command: "!1SLIQSTN"
  params: []

# ── RECOUT Selector (SLR) ───────────────────────────────────────
- id: set_recout
  label: Set RECOUT Selector
  kind: action
  command: "!1SLR{input}"
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5,
        "10" DVD, "20" TAPE1, "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "7F" OFF, "80" SOURCE, "QSTN" query

# ── Audio Selector (SLA) ────────────────────────────────────────
- id: set_audio_selector
  label: Set Audio Selector
  kind: action
  command: "!1SLA{source}"
  params:
    - name: source
      type: string
      description: |
        "00" AUTO, "01" MULTI-CH, "02" ANALOG, "03" iLINK,
        "04" HDMI, "05" COAX/OPT, "06" BALANCE,
        "UP" wrap-around, "QSTN" query

# ── 12V Trigger A/B/C (TGA/TGB/TGC) ─────────────────────────────
- id: set_trigger_a
  label: Set 12V Trigger A
  kind: action
  command: "!1TGA{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on'

- id: set_trigger_b
  label: Set 12V Trigger B
  kind: action
  command: "!1TGB{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on'

- id: set_trigger_c
  label: Set 12V Trigger C
  kind: action
  command: "!1TGC{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on'

# ── HDMI Output Selector (HDO) ──────────────────────────────────
- id: set_hdmi_output
  label: Set HDMI Output
  kind: action
  command: "!1HDO{output}"
  params:
    - name: output
      type: string
      description: |
        "00" Analog only, "01" HDMI Main, "02" HDMI Sub,
        "03" Both, "04" Both(Main), "05" Both(Sub),
        "UP" wrap-around, "QSTN" query

# ── Monitor Out Resolution (RES) ────────────────────────────────
- id: set_monitor_resolution
  label: Set Monitor Out Resolution
  kind: action
  command: "!1RES{resolution}"
  params:
    - name: resolution
      type: string
      description: |
        "00" Through, "01" Auto, "02" 480p, "03" 720p, "04" 1080i,
        "05" 1080p, "06" Source, "07" 1080p/24fs,
        "UP" wrap-around, "QSTN" query

# ── ISF Mode (ISF) ──────────────────────────────────────────────
- id: set_isf_mode
  label: Set ISF Mode
  kind: action
  command: "!1ISF{mode}"
  params:
    - name: mode
      type: string
      description: '"00" Custom, "01" Day, "02" Night, "UP" wrap-around, "QSTN" query'

# ── Listening Mode (LMD) ────────────────────────────────────────
- id: set_listening_mode
  label: Set Listening Mode
  kind: action
  command: "!1LMD{mode}"
  params:
    - name: mode
      type: string
      description: |
        Mode code hex:
        "00" STEREO, "01" DIRECT, "02" SURROUND,
        "04" THX, "07" MONO MOVIE, "0C" ALL CH STEREO,
        "0F" MONO, "11" PURE AUDIO, "16" Audyssey DSX,
        "40" Straight Decode, "42" THX Cinema, "43" THX Surr EX,
        "44" THX Music, "45" THX Games,
        "80" PLII/PLIIx Movie, "81" PLII/PLIIx Music,
        "82" Neo:6 Cinema, "83" Neo:6 Music,
        "84" PLII/PLIIx THX Cinema, "85" Neo:6 THX Cinema,
        "86" PLII/PLIIx Game, "88" Neural THX/Neural Surround,
        "89" PLII/PLIIx THX Games, "8A" Neo:6 THX Games,
        "8B" PLII/PLIIx THX Music, "8C" Neo:6 THX Music,
        "A0" PLIIx Movie+Audyssey DSX, "A1" PLIIx Music+DSX,
        "A2" PLIIx Game+DSX, "A3" Neo:6 Cinema+DSX,
        "A4" Neo:6 Music+DSX, "A5" Neural Surround+DSX,
        "UP" wrap-around up, "DOWN" wrap-around down,
        "MOVIE", "MUSIC", "GAME" category wrap-around

- id: listening_mode_up
  label: Listening Mode Wrap-Around Up
  kind: action
  command: "!1LMDUP"
  params: []

- id: listening_mode_down
  label: Listening Mode Wrap-Around Down
  kind: action
  command: "!1LMDDOWN"
  params: []

- id: query_listening_mode
  label: Query Listening Mode
  kind: action
  command: "!1LMDQSTN"
  params: []

# ── Late Night (LTN) ────────────────────────────────────────────
- id: set_late_night
  label: Set Late Night
  kind: action
  command: "!1LTN{level}"
  params:
    - name: level
      type: string
      description: |
        "00" Off, "01" Low (DD)/On (TrueHD), "02" High (DD),
        "03" Auto (TrueHD), "UP" wrap-around, "QSTN" query

# ── Re-EQ / Cinema Filter (RAS) ─────────────────────────────────
- id: set_reeq
  label: Set Re-EQ / Cinema Filter
  kind: action
  command: "!1RAS{state}"
  params:
    - name: state
      type: string
      description: |
        "00" Off, "01" Re-EQ On, "02" Academy On,
        "UP" wrap-around, "QSTN" query

# ── Audyssey 2EQ/MultEQ (ADY) ───────────────────────────────────
- id: set_audyssey_eq
  label: Set Audyssey 2EQ/MultEQ/MultEQ XT
  kind: action
  command: "!1ADY{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "UP" wrap-around, "QSTN" query'

# ── Audyssey Dynamic EQ (ADQ) ───────────────────────────────────
- id: set_audyssey_dyn_eq
  label: Set Audyssey Dynamic EQ
  kind: action
  command: "!1ADQ{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "UP" wrap-around, "QSTN" query'

# ── Audyssey Dynamic Volume (ADV) ───────────────────────────────
- id: set_audyssey_dyn_vol
  label: Set Audyssey Dynamic Volume
  kind: action
  command: "!1ADV{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" Light, "02" Medium, "03" Heavy, "UP" wrap-around, "QSTN" query'

# ── Dolby Volume (DVL) ──────────────────────────────────────────
- id: set_dolby_volume
  label: Set Dolby Volume
  kind: action
  command: "!1DVL{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" Low, "02" Mid, "03" High, "UP" wrap-around, "QSTN" query'

# ── Music Optimizer (MOT) ───────────────────────────────────────
- id: set_music_optimizer
  label: Set Music Optimizer
  kind: action
  command: "!1MOT{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "UP" wrap-around, "QSTN" query'

# ── Tuning (TUN) ────────────────────────────────────────────────
- id: send_tuning_frequency
  label: Set Tuning Frequency
  kind: action
  command: "!1TUN{frequency}"
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz

- id: tuning_up
  label: Tuning Frequency Up
  kind: action
  command: "!1TUNUP"
  params: []

- id: tuning_down
  label: Tuning Frequency Down
  kind: action
  command: "!1TUNDOWN"
  params: []

- id: tuning_query
  label: Query Tuning Frequency
  kind: action
  command: "!1TUNQSTN"
  params: []

# ── Preset (PRS) ────────────────────────────────────────────────
- id: set_preset
  label: Set Preset Number
  kind: action
  command: "!1PRS{preset}"
  params:
    - name: preset
      type: string
      description: Preset 1-40 (hex 01-28), "UP" wrap-around, "DOWN" wrap-around, "QSTN" query

- id: preset_up
  label: Preset Wrap-Around Up
  kind: action
  command: "!1PRSUP"
  params: []

- id: preset_down
  label: Preset Wrap-Around Down
  kind: action
  command: "!1PRSDOWN"
  params: []

- id: query_preset
  label: Query Preset Number
  kind: action
  command: "!1PRSQSTN"
  params: []

# ── Preset Memory (PRM) ─────────────────────────────────────────
- id: set_preset_memory
  label: Set Preset Memory
  kind: action
  command: "!1PRM{preset}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# ── RDS Information (RDS) ───────────────────────────────────────
- id: set_rds_info
  label: Set RDS Information Display
  kind: action
  command: "!1RDS{mode}"
  params:
    - name: mode
      type: string
      description: '"00" RT Information, "01" PTY Information, "02" TP Information, "UP" wrap-around'

# ── PTY Scan (PTS) ──────────────────────────────────────────────
- id: set_pty_scan
  label: Set PTY Scan
  kind: action
  command: "!1PTS{param}"
  params:
    - name: param
      type: string
      description: PTY No. 0-30 (hex 00-1E), "ENTER" finish scan'

# ── TP Scan (TPS) ───────────────────────────────────────────────
- id: set_tp_scan
  label: Set TP Scan
  kind: action
  command: "!1TPS{param}"
  params:
    - name: param
      type: string
      description: '"" (empty) start scan, "ENTER" finish scan'

# ── Network / USB Operation (NTC) ───────────────────────────────
- id: network_usb_operation
  label: Network/USB Operation
  kind: action
  command: "!1NTC{key}"
  params:
    - name: key
      type: string
      description: |
        "PLAY", "STOP", "PAUSE", "TRUP" track up, "TRDN" track down,
        "FF", "REW", "REPEAT", "RANDOM", "DISPLAY", "ALBUM", "ARTIST",
        "GENRE", "PLAYLIST", "RIGHT", "LEFT", "UP", "DOWN", "SELECT",
        "0"-"9", "DELETE", "CAPS", "LOCATION", "LANGUAGE",
        "CHUP" (iRadio), "CHDN" (iRadio)
        Note: FF/REW must be sent continuously with ≤100ms between codes

# ── Network Info Queries ────────────────────────────────────────
- id: query_net_artist
  label: Query Net/USB Artist Name
  kind: action
  command: "!1NATQSTN"
  params: []

- id: query_net_album
  label: Query Net/USB Album Name
  kind: action
  command: "!1NALQSTN"
  params: []

- id: query_net_title
  label: Query Net/USB Title Name
  kind: action
  command: "!1NTIQSTN"
  params: []

- id: query_net_time
  label: Query Net/USB Time Info
  kind: action
  command: "!1NTMQSTN"
  params: []

- id: query_net_track
  label: Query Net/USB Track Info
  kind: action
  command: "!1NTRQSTN"
  params: []

- id: query_net_status
  label: Query Net/USB Play Status
  kind: action
  command: "!1NSTQSTN"
  params: []

# ── Internet Radio Preset (NPR) ─────────────────────────────────
- id: set_internet_radio_preset
  label: Set Internet Radio Preset
  kind: action
  command: "!1NPR{preset}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# ── XM Commands (XM Model Only) ─────────────────────────────────
- id: set_xm_channel
  label: Set XM Channel Number
  kind: action
  command: "!1XCH{channel}"
  params:
    - name: channel
      type: string
      description: 'XM Channel "000"-"255", "UP", "DOWN", "QSTN"'

- id: query_xm_channel_name
  label: Query XM Channel Name
  kind: action
  command: "!1XCNQSTN"
  params: []

- id: query_xm_artist
  label: Query XM Artist Name
  kind: action
  command: "!1XATQSTN"
  params: []

- id: query_xm_title
  label: Query XM Title
  kind: action
  command: "!1XTIQSTN"
  params: []

- id: set_xm_category
  label: Set XM Category
  kind: action
  command: "!1XCT{param}"
  params:
    - name: param
      type: string
      description: 'Category info, "UP", "DOWN", "QSTN"'

# ══ ZONE 2 ══════════════════════════════════════════════════════
# ── Zone2 Power (ZPW) ───────────────────────────────────────────
- id: zone2_power
  label: Zone2 Power
  kind: action
  command: "!1ZPW{state}"
  params:
    - name: state
      type: string
      description: '"00" standby, "01" on, "QSTN" query'

- id: zone2_power_query
  label: Query Zone2 Power Status
  kind: action
  command: "!1ZPWQSTN"
  params: []

# ── Zone2 Muting (ZMT) ──────────────────────────────────────────
- id: zone2_muting
  label: Zone2 Muting
  kind: action
  command: "!1ZMT{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "TG" wrap-around, "QSTN" query'

# ── Zone2 Volume (ZVL) ──────────────────────────────────────────
- id: zone2_volume
  label: Zone2 Volume
  kind: action
  command: "!1ZVL{level}"
  params:
    - name: level
      type: string
      description: Volume 0-100 (hex 00-64), "UP", "DOWN", "QSTN" query

- id: zone2_volume_up
  label: Zone2 Volume Up
  kind: action
  command: "!1ZVLUP"
  params: []

- id: zone2_volume_down
  label: Zone2 Volume Down
  kind: action
  command: "!1ZVLDOWN"
  params: []

- id: zone2_volume_query
  label: Query Zone2 Volume Level
  kind: action
  command: "!1ZVLQSTN"
  params: []

# ── Zone2 Tone (ZTN) ────────────────────────────────────────────
- id: zone2_tone
  label: Set Zone2 Tone
  kind: action
  command: "!1ZTN{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Zone2 Balance (ZBL) ─────────────────────────────────────────
- id: zone2_balance
  label: Set Zone2 Balance
  kind: action
  command: "!1ZBL{param}"
  params:
    - name: param
      type: string
      description: '"xx" -A..00..+A (-10..0..+10), "UP" (to R), "DOWN" (to L), "QSTN"'

# ── Zone2 Selector (SLZ) ────────────────────────────────────────
- id: zone2_set_input
  label: Set Zone2 Input Selector
  kind: action
  command: "!1SLZ{input}"
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5,
        "10" DVD, "20" TAPE1, "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER, "28" INTERNET RADIO,
        "29" USB, "2A" USB(Rear), "40" Universal PORT, "30" MULTI CH,
        "31" XM, "32" SIRIUS, "80" SOURCE, "QSTN" query

# ── Zone2 Tuning (TUZ) ──────────────────────────────────────────
- id: zone2_tuning
  label: Set Zone2 Tuning Frequency
  kind: action
  command: "!1TUZ{frequency}"
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz, "UP", "DOWN", "QSTN" query

# ── Zone2 Preset (PRZ) ──────────────────────────────────────────
- id: zone2_preset
  label: Set Zone2 Preset
  kind: action
  command: "!1PRZ{preset}"
  params:
    - name: preset
      type: string
      description: Preset 1-40 (hex 01-28), "UP", "DOWN", "QSTN" query

# ── Zone2 Network Operation (NTZ) ───────────────────────────────
- id: zone2_network_operation
  label: Zone2 Network/USB Operation
  kind: action
  command: "!1NTZ{key}"
  params:
    - name: key
      type: string
      description: '"PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"'

# ── Zone2 Internet Radio Preset (NPZ) ───────────────────────────
- id: zone2_internet_radio_preset
  label: Set Zone2 Internet Radio Preset
  kind: action
  command: "!1NPZ{preset}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# ── Zone2 Listening Mode (LMZ) ──────────────────────────────────
- id: zone2_listening_mode
  label: Set Zone2 Listening Mode
  kind: action
  command: "!1LMZ{mode}"
  params:
    - name: mode
      type: string
      description: |
        "00" STEREO, "01" DIRECT, "0F" MONO, "12" MULTIPLEX,
        "87" DVS(PL2), "88" DVS(NEO6)

# ── Zone2 Late Night (LTZ) ──────────────────────────────────────
- id: zone2_late_night
  label: Set Zone2 Late Night
  kind: action
  command: "!1LTZ{level}"
  params:
    - name: level
      type: string
      description: '"00" off, "01" low, "02" high, "UP" wrap-around, "QSTN" query'

# ── Zone2 Re-EQ (RAZ) ───────────────────────────────────────────
- id: zone2_reeq
  label: Set Zone2 Re-EQ / Academy Filter
  kind: action
  command: "!1RAZ{state}"
  params:
    - name: state
      type: string
      description: '"00" both off, "01" Re-EQ on, "02" Academy on, "UP" wrap-around, "QSTN" query'

# ══ ZONE 3 ══════════════════════════════════════════════════════
# ── Zone3 Power (PW3) ───────────────────────────────────────────
- id: zone3_power
  label: Zone3 Power
  kind: action
  command: "!1PW3{state}"
  params:
    - name: state
      type: string
      description: '"00" standby, "01" on, "QSTN" query'

- id: zone3_power_query
  label: Query Zone3 Power Status
  kind: action
  command: "!1PW3QSTN"
  params: []

# ── Zone3 Muting (MT3) ──────────────────────────────────────────
- id: zone3_muting
  label: Zone3 Muting
  kind: action
  command: "!1MT3{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "TG" wrap-around, "QSTN" query'

# ── Zone3 Volume (VL3) ──────────────────────────────────────────
- id: zone3_volume
  label: Zone3 Volume
  kind: action
  command: "!1VL3{level}"
  params:
    - name: level
      type: string
      description: Volume 0-100 (hex 00-64), "UP", "DOWN", "QSTN" query

- id: zone3_volume_up
  label: Zone3 Volume Up
  kind: action
  command: "!1VL3UP"
  params: []

- id: zone3_volume_down
  label: Zone3 Volume Down
  kind: action
  command: "!1VL3DOWN"
  params: []

- id: zone3_volume_query
  label: Query Zone3 Volume Level
  kind: action
  command: "!1VL3QSTN"
  params: []

# ── Zone3 Tone (TN3) ────────────────────────────────────────────
- id: zone3_tone
  label: Set Zone3 Tone
  kind: action
  command: "!1TN3{param}"
  params:
    - name: param
      type: string
      description: |
        Bass: "Bxx", "BUP", "BDOWN"
        Treble: "Txx", "TUP", "TDOWN"
        Query: "QSTN"

# ── Zone3 Balance (BL3) ─────────────────────────────────────────
- id: zone3_balance
  label: Set Zone3 Balance
  kind: action
  command: "!1BL3{param}"
  params:
    - name: param
      type: string
      description: '"xx" -A..00..+A (-10..0..+10), "UP" (to R), "DOWN" (to L), "QSTN"'

# ── Zone3 Selector (SL3) ────────────────────────────────────────
- id: zone3_set_input
  label: Set Zone3 Input Selector
  kind: action
  command: "!1SL3{input}"
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5,
        "10" DVD, "20" TAPE1, "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER, "28" INTERNET RADIO,
        "29" USB, "2A" USB(Rear), "40" Universal PORT, "30" MULTI CH,
        "31" XM, "32" SIRIUS, "80" SOURCE, "QSTN" query

# ── Zone3 Tuning (TU3) ──────────────────────────────────────────
- id: zone3_tuning
  label: Set Zone3 Tuning Frequency
  kind: action
  command: "!1TU3{frequency}"
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz, "UP", "DOWN", "QSTN" query

# ── Zone3 Preset (PR3) ──────────────────────────────────────────
- id: zone3_preset
  label: Set Zone3 Preset
  kind: action
  command: "!1PR3{preset}"
  params:
    - name: preset
      type: string
      description: Preset 1-40 (hex 01-28), "UP", "DOWN", "QSTN" query

# ── Zone3 Network Operation (NT3) ───────────────────────────────
- id: zone3_network_operation
  label: Zone3 Network/USB Operation
  kind: action
  command: "!1NT3{key}"
  params:
    - name: key
      type: string
      description: '"PLAY", "STOP", "PAUSE", "TRUP", "TRDN", "CHUP", "CHDN"'

# ── Zone3 Internet Radio Preset (NP3) ───────────────────────────
- id: zone3_internet_radio_preset
  label: Set Zone3 Internet Radio Preset
  kind: action
  command: "!1NP3{preset}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# ══ ZONE 4 ══════════════════════════════════════════════════════
# ── Zone4 Power (PW4) ───────────────────────────────────────────
- id: zone4_power
  label: Zone4 Power
  kind: action
  command: "!1PW4{state}"
  params:
    - name: state
      type: string
      description: '"00" standby, "01" on, "QSTN" query'

- id: zone4_power_query
  label: Query Zone4 Power Status
  kind: action
  command: "!1PW4QSTN"
  params: []

# ── Zone4 Muting (MT4) ──────────────────────────────────────────
- id: zone4_muting
  label: Zone4 Muting
  kind: action
  command: "!1MT4{state}"
  params:
    - name: state
      type: string
      description: '"00" off, "01" on, "TG" wrap-around, "QSTN" query'

# ── Zone4 Volume (VL4) ──────────────────────────────────────────
- id: zone4_volume
  label: Zone4 Volume
  kind: action
  command: "!1VL4{level}"
  params:
    - name: level
      type: string
      description: Volume 0-100 (hex 00-64), "UP", "DOWN", "QSTN" query

- id: zone4_volume_up
  label: Zone4 Volume Up
  kind: action
  command: "!1VL4UP"
  params: []

- id: zone4_volume_down
  label: Zone4 Volume Down
  kind: action
  command: "!1VL4DOWN"
  params: []

- id: zone4_volume_query
  label: Query Zone4 Volume Level
  kind: action
  command: "!1VL4QSTN"
  params: []

# ── Zone4 Selector (SL4) ────────────────────────────────────────
- id: zone4_set_input
  label: Set Zone4 Input Selector
  kind: action
  command: "!1SL4{input}"
  params:
    - name: input
      type: string
      description: |
        "00" VIDEO1, "01" VIDEO2, "02" VIDEO3, "03" VIDEO4, "04" VIDEO5,
        "10" DVD, "20" TAPE1, "21" TAPE2, "22" PHONO, "23" CD,
        "24" FM, "25" AM, "26" TUNER, "27" MUSIC SERVER, "28" INTERNET RADIO,
        "29" USB, "2A" USB(Rear), "40" Universal PORT, "30" MULTI CH,
        "31" XM, "32" SIRIUS, "80" SOURCE, "QSTN" query

# ── Zone4 Tuning (TU4) ──────────────────────────────────────────
- id: zone4_tuning
  label: Set Zone4 Tuning Frequency
  kind: action
  command: "!1TU4{frequency}"
  params:
    - name: frequency
      type: string
      description: FM nnn.nn MHz / AM nnnnn kHz, "UP", "DOWN", "QSTN" query

# ── Zone4 Preset (PR4) ──────────────────────────────────────────
- id: zone4_preset
  label: Set Zone4 Preset
  kind: action
  command: "!1PR4{preset}"
  params:
    - name: preset
      type: string
      description: Preset 1-40 (hex 01-28), "UP", "DOWN", "QSTN" query

# ── Zone4 Network Operation (NT4) ───────────────────────────────
- id: zone4_network_operation
  label: Zone4 Network/USB Operation
  kind: action
  command: "!1NT4{key}"
  params:
    - name: key
      type: string
      description: '"PLAY", "STOP", "PAUSE", "TRUP", "TRDN"'

# ── Zone4 Internet Radio Preset (NP4) ───────────────────────────
- id: zone4_internet_radio_preset
  label: Set Zone4 Internet Radio Preset
  kind: action
  command: "!1NP4{preset}"
  params:
    - name: preset
      type: integer
      description: Preset 1-40 (hex 01-28)

# ══ RI SYSTEM - EXTERNAL DEVICE CONTROL ═════════════════════════
# These commands are forwarded to RI-linked external devices.

# ── CD Player (CCD) ─────────────────────────────────────────────
- id: ri_cd_player
  label: RI CD Player Operation
  kind: action
  command: "!1CCD{key}"
  params:
    - name: key
      type: string
      description: |
        "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R",
        "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP",
        "FF", "REW", "OP/CL", "0"-"9", "+10", "D.SKIP",
        "DISC.F", "DISC.R", "DISC1"-"DISC6", "STBY", "PON"

# ── TAPE1 (CT1) ─────────────────────────────────────────────────
- id: ri_tape1
  label: RI TAPE1(A) Operation
  kind: action
  command: "!1CT1{key}"
  params:
    - name: key
      type: string
      description: '"PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"'

# ── TAPE2 (CT2) ─────────────────────────────────────────────────
- id: ri_tape2
  label: RI TAPE2(B) Operation
  kind: action
  command: "!1CT2{key}"
  params:
    - name: key
      type: string
      description: '"PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"'

# ── Graphics Equalizer (CEQ) ────────────────────────────────────
- id: ri_equalizer
  label: RI Graphics Equalizer Operation
  kind: action
  command: "!1CEQPRESET"
  params: []

# ── DAT Recorder (CDT) ──────────────────────────────────────────
- id: ri_dat
  label: RI DAT Recorder Operation
  kind: action
  command: "!1CDT{key}"
  params:
    - name: key
      type: string
      description: '"PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"'

# ── DVD Player (CDV) ────────────────────────────────────────────
- id: ri_dvd_player
  label: RI DVD Player Operation
  kind: action
  command: "!1CDV{key}"
  params:
    - name: key
      type: string
      description: |
        "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R",
        "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE",
        "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT",
        "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM",
        "OP/CL", "ANGLE", "0"-"9", "10", "SEARCH", "DISP",
        "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R",
        "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN",
        "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1"-"DISC6",
        "FOLDUP", "FOLDDN"

# ── MD Recorder (CMD) ───────────────────────────────────────────
- id: ri_md_recorder
  label: RI MD Recorder Operation
  kind: action
  command: "!1CMD{key}"
  params:
    - name: key
      type: string
      description: |
        "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R",
        "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN",
        "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT",
        "0"-"9", "10/0", "nn/nnn", "NAME", "GROUP", "STBY"

# ── CD-R Recorder (CCR) ─────────────────────────────────────────
- id: ri_cdr_recorder
  label: RI CD-R Recorder Operation
  kind: action
  command: "!1CCR{key}"
  params:
    - name: key
      type: string
      description: |
        "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC",
        "CLEAR", "REPEAT", "0"-"9", "10/0", "nn/nnn", "SCROLL",
        "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"

# ── Docking Station via RI (CDS) ────────────────────────────────
- id: ri_dock
  label: RI Docking Station Operation
  kind: action
  command: "!1CDS{key}"
  params:
    - name: key
      type: string
      description: |
        "PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R",
        "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-",
        "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT",
        "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"

# Appended command fields below contain verbatim source command codes.
# Send the code followed by its parameter using the ISCP framing in Notes.

# ── Video Output Selector (VOS; Japanese Model Only) ─────────────
- id: set_video_output
  label: Set Video Output Selector
  kind: action
  command: "VOS"
  params:
    - name: output
      type: string
      description: '"00" sets D4, "01" sets Component, "QSTN" gets The Selector Position; Japanese Model Only'

# ── SIRIUS Commands (SIRIUS Model Only) ──────────────────────────
- id: query_sirius_channel_name
  label: Query SIRIUS Channel Name
  kind: action
  command: "SCN"
  params:
    - name: param
      type: string
      description: '"QSTN" gets SIRIUS Channel Name'

- id: query_sirius_artist
  label: Query SIRIUS Artist Name
  kind: action
  command: "SAT"
  params:
    - name: param
      type: string
      description: '"QSTN" gets SIRIUS Artist Name'

- id: query_sirius_title
  label: Query SIRIUS Title
  kind: action
  command: "STI"
  params:
    - name: param
      type: string
      description: '"QSTN" gets SIRIUS Title'

- id: set_sirius_channel
  label: Set SIRIUS Channel Number
  kind: action
  command: "SCH"
  params:
    - name: channel
      type: string
      description: '"000"-"255" SIRIUS Channel Number"000-255", "UP" sets SIRIUS Channel Wrap-Around Up, "DOWN" sets SIRIUS Channel Wrap-Around Down, "QSTN" gets SIRIUS Channel Number'

- id: set_sirius_category
  label: Set SIRIUS Category
  kind: action
  command: "SCT"
  params:
    - name: param
      type: string
      description: '"UP" sets SIRIUS Category Wrap-Around Up, "DOWN" sets SIRIUS Category Wrap-Around Down, "QSTN" gets SIRIUS Category'

- id: sirius_parental_lock
  label: SIRIUS Parental Lock
  kind: action
  command: "SLK"
  params:
    - name: password
      type: string
      description: '"nnnn" Lock Password (4Digits)'

# ── HD Radio Commands (HD Radio Model Only) ──────────────────────
- id: query_hd_radio_artist
  label: Query HD Radio Artist Name
  kind: action
  command: "HAT"
  params:
    - name: param
      type: string
      description: '"QSTN" gets HD Radio Artist Name'

- id: query_hd_radio_channel_name
  label: Query HD Radio Channel Name
  kind: action
  command: "HCN"
  params:
    - name: param
      type: string
      description: '"QSTN" gets HD Radio Channel Name'

- id: query_hd_radio_title
  label: Query HD Radio Title
  kind: action
  command: "HTI"
  params:
    - name: param
      type: string
      description: '"QSTN" gets HD Radio Title'

- id: query_hd_radio_detail
  label: Query HD Radio Detail Info
  kind: action
  command: "HDS"
  params:
    - name: param
      type: string
      description: '"QSTN" gets HD Radio Title'

- id: set_hd_radio_program
  label: Set HD Radio Channel Program
  kind: action
  command: "HPR"
  params:
    - name: program
      type: string
      description: '"01"-"08" sets directly HD Radio Channel Program, "QSTN" gets HD Radio Channel Program'

- id: set_hd_radio_blend_mode
  label: Set HD Radio Blend Mode
  kind: action
  command: "HBL"
  params:
    - name: mode
      type: string
      description: '"00" sets HD Radio Blend Mode"Auto", "01" sets HD Radio Blend Mode"Analog", "QSTN" gets the HD Radio Blend Mode Status'

- id: query_hd_radio_tuner_status
  label: Query HD Radio Tuner Status
  kind: action
  command: "HTS"
  params:
    - name: param
      type: string
      description: '"QSTN" gets the HD Radio Tuner Status'
```

## Feedbacks
```yaml
# query_command fields contain verbatim source command codes;
# each uses the documented "QSTN" parameter and ISCP framing in Notes.
- id: power_state
  label: Power State
  type: enum
  values: [on, standby]
  query_command: "PWR"  # parameter: "QSTN"

- id: volume_level
  label: Volume Level
  type: integer
  description: 0-100
  query_command: "MVL"  # parameter: "QSTN"

- id: input_selector
  label: Input Selector
  type: string
  description: Returns current input code string
  query_command: "SLI"  # parameter: "QSTN"

- id: listening_mode
  label: Listening Mode
  type: string
  description: Returns current listening mode code
  query_command: "LMD"  # parameter: "QSTN"

- id: muting_state
  label: Muting State
  type: enum
  values: [on, off]
  query_command: "AMT"  # parameter: "QSTN"

- id: tuning_frequency
  label: Tuning Frequency
  type: string
  description: FM nnn.nn MHz / AM nnnnn kHz
  query_command: "TUN"  # parameter: "QSTN"

- id: preset_number
  label: Preset Number
  type: integer
  description: 1-40
  query_command: "PRS"  # parameter: "QSTN"

- id: sleep_time
  label: Sleep Time
  type: integer
  description: Minutes remaining, 0 if off
  query_command: "SLP"  # parameter: "QSTN"

- id: dimmer_level
  label: Dimmer Level
  type: string
  description: '"00" Bright, "01" Dim, "02" Dark, "03" Shut-Off, "08" Bright & LED OFF'
  query_command: "DIM"  # parameter: "QSTN"

- id: late_night_state
  label: Late Night Level
  type: string
  description: '"00" off, "01" low, "02" high, "03" auto'
  query_command: "LTN"  # parameter: "QSTN"

- id: reeq_state
  label: Re-EQ / Cinema Filter State
  type: string
  description: '"00" off, "01" Re-EQ on, "02" Academy on'
  query_command: "RAS"  # parameter: "QSTN"

- id: audyssey_eq_state
  label: Audyssey 2EQ/MultEQ State
  type: enum
  values: [on, off]
  query_command: "ADY"  # parameter: "QSTN"

- id: audyssey_dyn_eq_state
  label: Audyssey Dynamic EQ State
  type: enum
  values: [on, off]
  query_command: "ADQ"  # parameter: "QSTN"

- id: audyssey_dyn_vol_state
  label: Audyssey Dynamic Volume State
  type: string
  description: '"00" off, "01" light, "02" medium, "03" heavy'
  query_command: "ADV"  # parameter: "QSTN"

- id: dolby_volume_state
  label: Dolby Volume State
  type: string
  description: '"00" off, "01" low, "02" mid, "03" high'
  query_command: "DVL"  # parameter: "QSTN"

- id: music_optimizer_state
  label: Music Optimizer State
  type: enum
  values: [on, off]
  query_command: "MOT"  # parameter: "QSTN"

- id: audio_info
  label: Audio Information
  type: string
  description: Variable-format audio info string (same as immediate display)
  query_command: "IFA"  # parameter: "QSTN"

- id: video_info
  label: Video Information
  type: string
  description: Variable-format video info string (same as immediate display)
  query_command: "IFV"  # parameter: "QSTN"

- id: net_artist_name
  label: Net/USB Artist Name
  type: string
  description: Variable-length, 64 ASCII chars max
  query_command: "NAT"  # parameter: "QSTN"

- id: net_album_name
  label: Net/USB Album Name
  type: string
  description: Variable-length, 64 ASCII chars max
  query_command: "NAL"  # parameter: "QSTN"

- id: net_title_name
  label: Net/USB Title Name
  type: string
  description: Variable-length, 64 ASCII chars max
  query_command: "NTI"  # parameter: "QSTN"

- id: net_time_info
  label: Net/USB Time Info
  type: string
  description: Elapsed/Track time, format mm:ss/mm:ss, max 99:59
  query_command: "NTM"  # parameter: "QSTN"

- id: net_track_info
  label: Net/USB Track Info
  type: string
  description: Current/Total track, format cccc/tttt, max 9999
  query_command: "NTR"  # parameter: "QSTN"

- id: net_play_status
  label: Net/USB Play Status
  type: string
  description: 3-letter status (play status / repeat status / shuffle status)
  query_command: "NST"  # parameter: "QSTN"

- id: hdmi_output_selector
  label: HDMI Output Selector
  type: string
  description: Returns current HDMI output code
  query_command: "HDO"  # parameter: "QSTN"

- id: monitor_resolution
  label: Monitor Out Resolution
  type: string
  description: Returns current resolution code
  query_command: "RES"  # parameter: "QSTN"

- id: isf_mode
  label: ISF Mode
  type: string
  description: '"00" Custom, "01" Day, "02" Night'
  query_command: "ISF"  # parameter: "QSTN"

- id: audio_selector
  label: Audio Selector
  type: string
  description: Returns current audio selector code
  query_command: "SLA"  # parameter: "QSTN"

- id: recout_selector
  label: RECOUT Selector
  type: string
  description: Returns current RECOUT selector code
  query_command: "SLR"  # parameter: "QSTN"

- id: speaker_layout
  label: Speaker Layout
  type: string
  description: '"SB" SurrBack, "FH" Front High, "FW" Front Wide'
  query_command: "SPL"  # parameter: "QSTN"

- id: zone2_power_state
  label: Zone2 Power State
  type: enum
  values: [on, standby]
  query_command: "ZPW"  # parameter: "QSTN"

- id: zone2_volume_level
  label: Zone2 Volume Level
  type: integer
  description: 0-100
  query_command: "ZVL"  # parameter: "QSTN"

- id: zone2_muting_state
  label: Zone2 Muting State
  type: enum
  values: [on, off]
  query_command: "ZMT"  # parameter: "QSTN"

- id: zone2_input_selector
  label: Zone2 Input Selector
  type: string
  description: Returns current Zone2 input code
  query_command: "SLZ"  # parameter: "QSTN"

- id: zone3_power_state
  label: Zone3 Power State
  type: enum
  values: [on, standby]
  query_command: "PW3"  # parameter: "QSTN"

- id: zone3_volume_level
  label: Zone3 Volume Level
  type: integer
  description: 0-100
  query_command: "VL3"  # parameter: "QSTN"

- id: zone3_muting_state
  label: Zone3 Muting State
  type: enum
  values: [on, off]
  query_command: "MT3"  # parameter: "QSTN"

- id: zone3_input_selector
  label: Zone3 Input Selector
  type: string
  description: Returns current Zone3 input code
  query_command: "SL3"  # parameter: "QSTN"

- id: zone4_power_state
  label: Zone4 Power State
  type: enum
  values: [on, standby]
  query_command: "PW4"  # parameter: "QSTN"

- id: zone4_volume_level
  label: Zone4 Volume Level
  type: integer
  description: 0-100
  query_command: "VL4"  # parameter: "QSTN"

- id: zone4_muting_state
  label: Zone4 Muting State
  type: enum
  values: [on, off]
  query_command: "MT4"  # parameter: "QSTN"

- id: zone4_input_selector
  label: Zone4 Input Selector
  type: string
  description: Returns current Zone4 input code
  query_command: "SL4"  # parameter: "QSTN"

# UNRESOLVED: display information (DIF) responses have variable format not fully specified
# UNRESOLVED: XM/SIRIUS/HD Radio info feedbacks are model-dependent
```

## Variables
```yaml
# UNRESOLVED: source does not enumerate settable Variables separately from Actions;
# Tone (bass/treble per channel), Late Night, Re-EQ, Audyssey settings are described as commands
# but may function as variables depending on implementation
```

## Events
```yaml
# Source documents unsolicited status notifications: when receiver state changes,
# it sends a Status Message to the controller with the new value (e.g. "SLI03").
# Any command group with a QSTN query can also generate unsolicited notifications.
# Specific event types are not enumerated separately - each command code's
# response doubles as an event notification when state changes externally.
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone commands (ZPW/ZMT/ZVL/etc.) only work when main unit is ON"
  - "TGA/TGB/TGC available only when each 12V Trigger parameter is all OFF at Setup Menu"
# UNRESOLVED: no explicit safety warnings or power-on sequencing procedures in source
```

## Notes
RS-232C message format: `!1XXXYYYY[CR]` where `!1` is header (destination unit type "1" for Receiver), `XXX` is 3-char command, `YYYY` is parameter, `[CR]` is end char. Device-to-controller responses use `[EOF]` (0x1A) terminator. TCP/eISCP wraps the ISCP message in a binary header (magic "ISCP", header size 0x10, data size, version 0x01).

Response time: receiver responds within 50msec. Minimum interval between messages: 50msec. If no response within 50msec, communication has failed.

The TX-SR876 supports 4 zones (main + Zone2 + Zone3 + Zone4). Zone commands only work when main unit is ON. Tuner function is shared between MAIN and ZONE sides but control is separated.

MAC address and actual TCP port must be confirmed via receiver setup menu. Default TCP port is 60128; configurable range 49152-65535. Only one client TCP connection is allowed; the connection must be held continuously to receive status notifications.

RI system commands (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR/CDS) are forwarded to RI-linked external devices (CD players, tape decks, DVD players, MD/CD-R recorders, docks) connected via Onkyo Remote Interactive cable.

Protocol document: Integra Serial Communication Protocol for AV Receiver, Version 1.15, 31 August 2009. TX-SR876 added in revision 1.10 (13 June 2008).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio-specific commands only available on corresponding models -->
<!-- UNRESOLVED: exact support matrix column for TX-SR876 is ambiguous in parsed source; high-end model assumed to support all documented features -->
````

Upgrade complete. Key additions vs on-disk spec:

- **Command payloads** added to ALL existing actions (were missing entirely)
- **New main-zone commands**: AMT toggle/query, SPA/SPB speakers, SPL layout, 7 tone channels (TFR/TFW/TFH/TCT/TSR/TSB/TSW), SLC calibration, SWL/CTL temp levels, DIF display, MEM memory, IFA/IFV info queries, SLR RECOUT, TGA/TGB/TGC triggers, ISF mode, LTN late night, RAS Re-EQ, ADY/ADQ/ADV Audyssey, DVL Dolby Volume, MOT Music Optimizer, PRM preset memory, RDS/PTS/TPS, NTC network/USB, 6 network info queries, NPR internet radio, XM commands
- **Zone2 gap-fill**: ZTN/ZBL/SLZ/TUZ/PRZ/NTZ/NPZ/LMZ/LTZ/RAZ + ZVL up/down/query
- **Zone3 full set**: MT3/VL3/TN3/BL3/SL3/TU3/PR3/NT3/NP3 + volume up/down/query
- **Zone4 full set**: MT4/VL4/SL4/TU4/PR4/NT4/NP4 + volume up/down/query
- **RI system**: CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR/CDS
- **Transport**: eISCP header format, DB9 pinout, terminator details
- **Traits**: added `tunable`, `multi_zone`
- **Feedbacks**: 20+ new entries for all new command groups

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T20:32:49.601Z
last_checked_at: 2026-10-07T20:35:22.444Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:35:22.444Z
matched_actions: 190
action_count: 190
confidence: medium
summary: "All 190 action units map to source ISCP mnemonics with matching parameter shapes and transport values; all ~113 source mnemonics are represented. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Ethernet port number defaults to 60128 but can be changed to 49152-65535 per setup menu; actual configured port not stated"
- "XM/SIRIUS/HD Radio-specific commands are model-dependent; TX-SR876 XM support confirmed (SLI31), SIRIUS/HD Radio unconfirmed"
- "actual configured port may differ (range 49152-65535)"
- "display information (DIF) responses have variable format not fully specified"
- "XM/SIRIUS/HD Radio info feedbacks are model-dependent"
- "source does not enumerate settable Variables separately from Actions;"
- "no explicit macro sequences described in source"
- "no explicit safety warnings or power-on sequencing procedures in source"
- "firmware version compatibility not stated in source"
- "XM/SIRIUS/HD Radio-specific commands only available on corresponding models"
- "exact support matrix column for TX-SR876 is ambiguous in parsed source; high-end model assumed to support all documented features"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
