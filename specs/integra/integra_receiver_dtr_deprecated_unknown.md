---
spec_id: admin/integra-receiver-dtr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DTR Series AV Receiver Control Spec"
manufacturer: Integra
model_family: DTR-5.2
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DTR-5.2
    - DTR-6.2
    - DTR-5.3
    - DTR-6.3
    - DTR-5.4
    - DTR-6.4
    - DTR-4.5
    - DTR-5.5
    - DTR-6.5
    - DTR-7.4
    - DTR-8.4
    - DTR-4.6
    - DTR-5.6
    - DTR-6.6
    - DTR-7.6
    - DTR-5.8
    - DTR-6.8
    - DTR-7.7
    - DTR-7.8
    - DTR-8.8
    - DTR-5.9
    - DTR-6.9
    - DTR-7.9
    - DTR-8.9
    - DTR-9.9
    - DTR-4.9
    - DTR-10.5
    - DTR-20.1
    - DTR-30.1
    - DTR-40.1
    - DTR-50.1
    - DTR-70.1
    - DTR-80.1
    - DTX-5.8
    - DTX-5.9
    - DTX-7
    - DTX-7.7
    - DTX-7.8
    - DTX-8.8
    - DTX-8.9
    - DTX-9.9
    - DTC-9.8
    - DHC-9.9
    - DHC-40.1
    - DHC-80.1
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T16:31:45.262Z
last_checked_at: 2026-10-01T11:34:52.592Z
generated_at: 2026-10-01T11:34:52.592Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model-to-command mapping varies by model; only documented commands listed. Per-model compatibility matrix in source determines which commands each model supports."
  - "populate from source, or remove section if not applicable"
  - "source does not describe safety interlocks, but note:"
  - "exact command support varies by model — per-model compatibility matrix in source"
  - "eISCP header details not fully documented for all firmware versions"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:34:52.592Z
  matched_actions: 389
  action_count: 389
  confidence: medium
  summary: "All 389 spec actions map to source command tables; transport values (9600 baud, port 60128) are verbatim; no extra source commands remain unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# Integra DTR Series AV Receiver Control Spec

## Summary
Integra DTR-series AV receivers controlled via ISCP (Integra Serial Control Protocol) over RS-232 and Ethernet (eISCP over TCP). Covers models from DTR-5.2 through DTR-80.1. Protocol uses 3-character command codes with variable-length parameters. Supports power, volume, input selection, listening modes, muting, tone, Audyssey, tuner, multi-zone (Zone 2/3/4), Net-USB, and RI-connected device control.

<!-- UNRESOLVED: exact model-to-command mapping varies by model; only documented commands listed. Per-model compatibility matrix in source determines which commands each model supports. -->

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
  port: 60128  # default; configurable 49152-65535
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable     # PWR command for on/standby
  - queryable     # QSTN parameter on most commands
  - routable      # SLI input selector, SLR recout selector
  - levelable     # MVL master volume, zone volumes, tone levels
```

## Actions
```yaml
actions:
  # ===== System Power (PWR) =====
  - id: power_on
    label: Power On
    kind: action
    command: "!1PWR01"
    description: "Sets System On. ISCP message: start '!', unit '1', cmd 'PWR01', end [CR]."
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: "!1PWR00"
    description: "Sets System Standby."
    params: []

  # ===== Audio Muting (AMT) =====
  - id: mute_on
    label: Mute On
    kind: action
    command: "!1AMT01"
    description: "Sets Audio Muting On."
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "!1AMT00"
    description: "Sets Audio Muting Off."
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "!1AMTTG"
    description: "Sets Audio Muting Wrap-Around."

  # ===== Speaker A/B (SPA/SPB) =====
  - id: speaker_a_set
    label: Set Speaker A
    kind: action
    command: "!1SPA{state}"
    description: "Speaker A command. 00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: state
        type: string
        description: "00=Off, 01=On, UP=Wrap-Around"

  - id: speaker_b_set
    label: Set Speaker B
    kind: action
    command: "!1SPB{state}"
    description: "Speaker B command. 00=Off, 01=On, UP=Wrap-Around. SPA=MAIN A/SPB=MAIN B, or SPA=Front A/SPB=Front B (exclusive)."
    params:
      - name: state
        type: string
        description: "00=Off, 01=On, UP=Wrap-Around"

  # ===== Speaker Layout (SPL) =====
  - id: speaker_layout_set
    label: Set Speaker Layout
    kind: action
    command: "!1SPL{layout}"
    description: "SB=SurrBack, FH=Front High / SurrBack+FrontHigh, FW=Front Wide / SurrBack+FrontWide, UP=Wrap-Around."
    params:
      - name: layout
        type: string
        description: "SB, FH, FW, or UP"

  # ===== Master Volume (MVL) =====
  - id: volume_set
    label: Set Volume Level
    kind: action
    command: "!1MVL{level}"
    description: "Volume Level 0-100 in hex (00-64) or 0-80 in hex (00-50) depending on model."
    params:
      - name: level
        type: string
        description: "Hex value 00-64 (0-100) or 00-50 (0-80) depending on model"

  - id: volume_up
    label: Volume Up
    kind: action
    command: "!1MVLUP"
    description: "Sets Volume Level Up."
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "!1MVLDOWN"
    description: "Sets Volume Level Down."
    params: []

  - id: volume_up_1db
    label: Volume Up 1dB Step
    kind: action
    command: "!1MVLUP1"
    description: "Sets Volume Level Up 1dB Step."
    params: []

  - id: volume_down_1db
    label: Volume Down 1dB Step
    kind: action
    command: "!1MVLDOWN1"
    description: "Sets Volume Level Down 1dB Step."
    params: []

  # ===== Tone Controls (TFR/TFW/TFH/TCT/TSR/TSB/TSW) =====
  - id: tone_front_set
    label: Set Front Tone
    kind: action
    command: "!1TFR{param}"
    description: "Front tone. Bxx=Bass, Txx=Treble (xx=-A..00..+A, -10..0..+10 2 step). BUP/BDOWN bass up/down, TUP/TDOWN treble up/down."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_front_wide_set
    label: Set Front Wide Tone
    kind: action
    command: "!1TFW{param}"
    description: "Front Wide tone. Bxx/Txx/BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_front_high_set
    label: Set Front High Tone
    kind: action
    command: "!1TFH{param}"
    description: "Front High tone. Bxx/Txx/BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_center_set
    label: Set Center Tone
    kind: action
    command: "!1TCT{param}"
    description: "Center tone. Bxx/Txx/BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_surround_set
    label: Set Surround Tone
    kind: action
    command: "!1TSR{param}"
    description: "Surround tone. Bxx/Txx/BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_surround_back_set
    label: Set Surround Back Tone
    kind: action
    command: "!1TSB{param}"
    description: "Surround Back tone. Bxx/Txx/BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  - id: tone_subwoofer_set
    label: Set Subwoofer Tone
    kind: action
    command: "!1TSW{param}"
    description: "Subwoofer tone (bass only). Bxx/BUP/BDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, BUP, BDOWN"

  # ===== Sleep (SLP) =====
  - id: sleep_set
    label: Set Sleep Timer
    kind: action
    command: "!1SLP{time}"
    description: "Sleep timer 1-90 min in hex (01-5A). OFF to disable."
    params:
      - name: time
        type: string
        description: "01-5A hex (1-90 min) or OFF"

  - id: sleep_off
    label: Sleep Off
    kind: action
    command: "!1SLPOFF"
    description: "Disable sleep timer."
    params: []

  - id: sleep_up
    label: Sleep Timer Up
    kind: action
    command: "!1SLPUP"
    description: "Sleep Time Wrap-Around Up."
    params: []

  # ===== Speaker Level Calibration (SLC) =====
  - id: speaker_level_cal
    label: Speaker Level Calibration
    kind: action
    command: "!1SLC{key}"
    description: "TEST=TEST Key, CHSEL=CH SEL Key, UP=LEVEL+ Key, DOWN=LEVEL- Key."
    params:
      - name: key
        type: string
        description: "TEST, CHSEL, UP, DOWN"

  # ===== Temporary Subwoofer Level (SWL) =====
  - id: subwoofer_temp_level_set
    label: Set Subwoofer Temporary Level
    kind: action
    command: "!1SWL{param}"
    description: "-F..00..+C = -15dB..0dB..+12dB. UP/DOWN = LEVEL+/- Key."
    params:
      - name: param
        type: string
        description: "-F..00..+C, UP, DOWN"

  # ===== Temporary Center Level (CTL) =====
  - id: center_temp_level_set
    label: Set Center Temporary Level
    kind: action
    command: "!1CTL{param}"
    description: "-C..00..+C = -12dB..0dB..+12dB. UP/DOWN = LEVEL+/- Key."
    params:
      - name: param
        type: string
        description: "-C..00..+C, UP, DOWN"

  # ===== Display Information/Mode (DIF) =====
  - id: display_info_set
    label: Set Display Information
    kind: action
    command: "!1DIF{mode}"
    description: "00=Program Format, 01=Digital Input Position, 02=Digital Format Position(temporary), 03=Bass Level, 04=Treble Level."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, 04"

  - id: display_mode_set
    label: Set Display Mode
    kind: action
    command: "!1DIF{mode}"
    description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format(temp), 03=Video Format(temp), TG/UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, TG"

  # ===== Dimmer (DIM) =====
  - id: dimmer_set
    label: Set Dimmer Level
    kind: action
    command: "!1DIM{level}"
    description: "Set front panel dimmer. 00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED Off."
    params:
      - name: level
        type: string
        description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED Off"

  - id: dimmer_toggle
    label: Dimmer Toggle
    kind: action
    command: "!1DIMDIM"
    description: "Dimmer Level Wrap-Around Up."
    params: []

  # ===== Setup OSD (OSD) =====
  - id: osd_menu
    label: OSD Menu
    kind: action
    command: "!1OSDMENU"
    description: "Open setup menu."
    params: []

  - id: osd_up
    label: OSD Up
    kind: action
    command: "!1OSDUP"
    params: []

  - id: osd_down
    label: OSD Down
    kind: action
    command: "!1OSDDOWN"
    params: []

  - id: osd_left
    label: OSD Left
    kind: action
    command: "!1OSDLEFT"
    params: []

  - id: osd_right
    label: OSD Right
    kind: action
    command: "!1OSDRIGHT"
    params: []

  - id: osd_enter
    label: OSD Enter
    kind: action
    command: "!1OSDENTER"
    params: []

  - id: osd_exit
    label: OSD Exit
    kind: action
    command: "!1OSDEXIT"
    params: []

  - id: osd_audio
    label: OSD Audio Adjust
    kind: action
    command: "!1OSDAUDIO"
    description: "Audio Adjust Key."
    params: []

  - id: osd_video
    label: OSD Video Adjust
    kind: action
    command: "!1OSDVIDEO"
    description: "Video Adjust Key."
    params: []

  # ===== Memory Setup (MEM) =====
  - id: memory_store
    label: Memory Store
    kind: action
    command: "!1MEMSTR"
    description: "Stores memory."
    params: []

  - id: memory_recall
    label: Memory Recall
    kind: action
    command: "!1MEMRCL"
    description: "Recalls memory."
    params: []

  - id: memory_lock
    label: Memory Lock
    kind: action
    command: "!1MEMLOCK"
    description: "Locks memory."
    params: []

  - id: memory_unlock
    label: Memory Unlock
    kind: action
    command: "!1MEMUNLK"
    description: "Unlocks memory."
    params: []

  # ===== Audio/Video Information Queries (IFA/IFV) =====
  - id: audio_info_query
    label: Audio Information Query
    kind: query
    command: "!1IFAQSTN"
    description: "Gets Information of Audio (same as immediate display). Response nnnnn:nnnnn. Returned when DIF02 sent."
    params: []

  - id: video_info_query
    label: Video Information Query
    kind: query
    command: "!1IFVQSTN"
    description: "Gets Information of Video. Response nnnnn:nnnnn. Returned when DIF03 sent."
    params: []

  # ===== Input Selector (SLI) =====
  - id: input_select
    label: Select Input
    kind: action
    command: "!1SLI{input}"
    description: "Select input source by hex code."
    params:
      - name: input
        type: string
        description: "00=VIDEO1/VCR, 01=VIDEO2/CBL/SAT, 02=VIDEO3/GAME, 03=VIDEO4/AUX, 04=VIDEO5, 05=VIDEO6, 06=VIDEO7, 10=DVD, 20=TAPE, 21=TAPE2, 22=PHONO, 23=CD, 24=FM, 25=AM, 26=TUNER, 27=MUSIC SERVER, 28=INTERNET RADIO, 29=USB/Front, 2A=USB(Rear), 40=Universal PORT, 30=MULTI CH, 31=XM, 32=SIRIUS"

  - id: input_up
    label: Input Up
    kind: action
    command: "!1SLIUP"
    description: "Selector Position Wrap-Around Up."
    params: []

  - id: input_down
    label: Input Down
    kind: action
    command: "!1SLIDOWN"
    description: "Selector Position Wrap-Around Down."
    params: []

  # ===== RECOUT Selector (SLR) =====
  - id: recout_select
    label: Select RECOUT
    kind: action
    command: "!1SLR{input}"
    description: "RECOUT/ZONE3 selector. Same codes as SLI. 7F=OFF, 80=SOURCE."
    params:
      - name: input
        type: string
        description: "Input code (same as SLI) or 7F=OFF, 80=SOURCE"

  # ===== Audio Selector (SLA) =====
  - id: audio_select_set
    label: Set Audio Selector
    kind: action
    command: "!1SLA{mode}"
    description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, 04, 05, 06, UP"

  # ===== 12V Triggers (TGA/TGB/TGC) =====
  - id: trigger_a_set
    label: Set 12V Trigger A
    kind: action
    command: "!1TGA{state}"
    description: "00=Off, 01=On. Available when each 12V Trigger parameter is all OFF at Setup Menu."
    params:
      - name: state
        type: string
        description: "00=Off, 01=On"

  - id: trigger_b_set
    label: Set 12V Trigger B
    kind: action
    command: "!1TGB{state}"
    description: "00=Off, 01=On."
    params:
      - name: state
        type: string
        description: "00=Off, 01=On"

  - id: trigger_c_set
    label: Set 12V Trigger C
    kind: action
    command: "!1TGC{state}"
    description: "00=Off, 01=On."
    params:
      - name: state
        type: string
        description: "00=Off, 01=On"

  # ===== Video Output Selector (VOS, Japanese Model Only) =====
  - id: video_output_set
    label: Set Video Output
    kind: action
    command: "!1VOS{mode}"
    description: "Japanese model only. 00=D4, 01=Component."
    params:
      - name: mode
        type: string
        description: "00=D4, 01=Component"

  # ===== HDMI Output Selector (HDO) =====
  - id: hdmi_output_set
    label: Set HDMI Output
    kind: action
    command: "!1HDO{mode}"
    description: "00=No/Analog, 01=Yes/Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub), UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, 04, 05, UP"

  # ===== Monitor Out Resolution (RES) =====
  - id: monitor_resolution_set
    label: Set Monitor Out Resolution
    kind: action
    command: "!1RES{mode}"
    description: "00=Through, 01=Auto(HDMI), 02=480p, 03=720p, 04=1080i, 05=1080p(HDMI), 06=Source, 07=1080p/24fs(HDMI), UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, 04, 05, 06, 07, UP"

  # ===== ISF Mode (ISF) =====
  - id: isf_mode_set
    label: Set ISF Mode
    kind: action
    command: "!1ISF{mode}"
    description: "00=Custom, 01=Day, 02=Night, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, UP"

  # ===== Listening Mode (LMD) =====
  - id: listening_mode_set
    label: Set Listening Mode
    kind: action
    command: "!1LMD{mode}"
    description: "Set listening mode by hex code."
    params:
      - name: mode
        type: string
        description: "00=STEREO, 01=DIRECT, 02=SURROUND, 03=FILM, 04=THX, 05=ACTION, 06=MUSICAL, 07=MONO MOVIE, 08=ORCHESTRA, 09=UNPLUGGED, 0A=STUDIO-MIX, 0B=TV LOGIC, 0C=ALL CH STEREO, 0D=THEATER-DIMENSIONAL, 0E=ENHANCED 7, 0F=MONO, 11=PURE AUDIO, 12=MULTIPLEX, 13=FULL MONO, 14=DOLBY VIRTUAL, 15=DTS Surround Sensation, 16=Audyssey DSX, 40=5.1ch Surround/Straight Decode, 41=Dolby EX/DTS ES, 42=THX Cinema, 43=THX Surround EX, 44=THX Music, 45=THX Games, 50-52=U2/S2 Cinema/Music/Games, 80=PLII Movie, 81=PLII Music, 82=Neo:6 Cinema, 83=Neo:6 Music, 84-8F=PLII/Neo:6/Neural THX variants, 90=PLIIz Height, 91-93=Neo:6/Neural variants, 94-99=PLIIz Height+THX variants, A0-A7=Audyssey DSX combos"

  - id: listening_mode_up
    label: Listening Mode Up
    kind: action
    command: "!1LMDUP"
    description: "Listening Mode Wrap-Around Up."
    params: []

  - id: listening_mode_down
    label: Listening Mode Down
    kind: action
    command: "!1LMDDOWN"
    description: "Listening Mode Wrap-Around Down."
    params: []

  - id: listening_mode_movie
    label: Listening Mode Movie
    kind: action
    command: "!1LMDMOVIE"
    description: "Listening Mode Wrap-Around (Movie category)."
    params: []

  - id: listening_mode_music
    label: Listening Mode Music
    kind: action
    command: "!1LMDMUSIC"
    description: "Listening Mode Wrap-Around (Music category)."
    params: []

  - id: listening_mode_game
    label: Listening Mode Game
    kind: action
    command: "!1LMDGAME"
    description: "Listening Mode Wrap-Around (Game category)."
    params: []

  # ===== Late Night (LTN) =====
  - id: late_night_set
    label: Set Late Night Mode
    kind: action
    command: "!1LTN{mode}"
    description: "00=Off, 01=Low(@DD)/On(@Dolby TrueHD), 02=High(@DD), 03=Auto(@Dolby TrueHD)."
    params:
      - name: mode
        type: string
        description: "00=Off, 01=Low/On, 02=High, 03=Auto"

  - id: late_night_up
    label: Late Night Up
    kind: action
    command: "!1LTNUP"
    description: "Late Night State Wrap-Around Up."
    params: []

  # ===== Re-EQ / Academy / Cinema Filter (RAS) =====
  - id: reeq_academy_set
    label: Set Re-EQ/Academy Filter
    kind: action
    command: "!1RAS{mode}"
    description: "Re-EQ/Academy variant: 00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, UP"

  - id: reeq_set
    label: Set Re-EQ
    kind: action
    command: "!1RAS{mode}"
    description: "Re-EQ variant: 00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, UP"

  - id: cinema_filter_set
    label: Set Cinema Filter
    kind: action
    command: "!1RAS{mode}"
    description: "Cinema Filter variant: 00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, UP"

  # ===== Audyssey (ADY/ADQ/ADV) =====
  - id: audyssey_multeq_set
    label: Set Audyssey 2EQ/MultEQ/MultEQ XT
    kind: action
    command: "!1ADY{mode}"
    description: "00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, UP"

  - id: audyssey_dyn_eq_set
    label: Set Audyssey Dynamic EQ
    kind: action
    command: "!1ADQ{mode}"
    description: "00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, UP"

  - id: audyssey_dyn_vol_set
    label: Set Audyssey Dynamic Volume
    kind: action
    command: "!1ADV{mode}"
    description: "00=Off, 01=Light, 02=Medium, 03=Heavy, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, UP"

  # ===== Dolby Volume (DVL) =====
  - id: dolby_volume_set
    label: Set Dolby Volume
    kind: action
    command: "!1DVL{mode}"
    description: "00=Off, 01=Low, 02=Mid, 03=High, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, 03, UP"

  # ===== Music Optimizer (MOT) =====
  - id: music_optimizer_set
    label: Set Music Optimizer
    kind: action
    command: "!1MOT{mode}"
    description: "00=Off, 01=On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, UP"

  # ===== Tuner (TUN) =====
  - id: tuner_frequency_set
    label: Set Tuner Frequency
    kind: action
    command: "!1TUN{freq}"
    description: "Direct frequency entry. FM nnn.nn MHz, AM nnnnn kHz, XM nnnnn ch (0 in first two digits)."
    params:
      - name: freq
        type: string
        description: "5-digit frequency string (FM nnn.nn MHz / AM nnnnn kHz / XM nnnnn ch)"

  - id: tuner_up
    label: Tuner Up
    kind: action
    command: "!1TUNUP"
    params: []

  - id: tuner_down
    label: Tuner Down
    kind: action
    command: "!1TUNDOWN"
    params: []

  # ===== Preset (PRS) =====
  - id: preset_set
    label: Set Preset
    kind: action
    command: "!1PRS{preset}"
    description: "Preset number in hex (01-28 = 1-40 or 01-1E = 1-30)."
    params:
      - name: preset
        type: string
        description: "Hex preset number"

  - id: preset_up
    label: Preset Up
    kind: action
    command: "!1PRSUP"
    params: []

  - id: preset_down
    label: Preset Down
    kind: action
    command: "!1PRSDOWN"
    params: []

  # ===== Preset Memory (PRM) =====
  - id: preset_memory_set
    label: Store Preset Memory
    kind: action
    command: "!1PRM{preset}"
    description: "Store current station to preset. 01-28 (1-40) or 01-1E (1-30) hex."
    params:
      - name: preset
        type: string
        description: "Hex preset number"

  # ===== RDS (RDS/PTS/TPS) =====
  - id: rds_info_set
    label: Set RDS Information
    kind: action
    command: "!1RDS{mode}"
    description: "RDS model only. 00=RT Information, 01=PTY Information, 02=TP Information, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, UP"

  - id: pty_scan_set
    label: Set PTY Scan
    kind: action
    command: "!1PTS{param}"
    description: "RDS model only. 00-1E = PTY No. 0-30 hex, ENTER = Finish PTY Scan."
    params:
      - name: param
        type: string
        description: "00-1E hex PTY number, or ENTER"

  - id: tp_scan
    label: TP Scan
    kind: action
    command: "!1TPS{param}"
    description: "RDS model only. Empty param = Start TP Scan, ENTER = Finish TP Scan."
    params:
      - name: param
        type: string
        description: "Empty (start) or ENTER (finish)"

  # ===== XM Radio (XCN/XAT/XTI/XCH/XCT) =====
  - id: xm_channel_set
    label: Set XM Channel
    kind: action
    command: "!1XCH{param}"
    description: "XM model only. 000-255 = channel number, UP/DOWN = Wrap-Around."
    params:
      - name: param
        type: string
        description: "000-255, UP, DOWN"

  - id: xm_category_set
    label: Set XM Category
    kind: action
    command: "!1XCT{param}"
    description: "XM model only. nnnnnnnnnn = category info, UP/DOWN = Wrap-Around."
    params:
      - name: param
        type: string
        description: "category string, UP, DOWN"

  - id: xm_channel_name_query
    label: XM Channel Name Query
    kind: query
    command: "!1XCNQSTN"
    description: "XM model only. Gets XM Channel Name."
    params: []

  - id: xm_artist_query
    label: XM Artist Name Query
    kind: query
    command: "!1XATQSTN"
    description: "XM model only. Gets XM Artist Name."
    params: []

  - id: xm_title_query
    label: XM Title Query
    kind: query
    command: "!1XTIQSTN"
    description: "XM model only. Gets XM Title."
    params: []

  # ===== SIRIUS (SCN/SAT/STI/SCH/SCT/SLK) =====
  - id: sirius_channel_set
    label: Set SIRIUS Channel
    kind: action
    command: "!1SCH{param}"
    description: "SIRIUS model only. 000-255 = channel number, UP/DOWN = Wrap-Around."
    params:
      - name: param
        type: string
        description: "000-255, UP, DOWN"

  - id: sirius_category_set
    label: Set SIRIUS Category
    kind: action
    command: "!1SCT{param}"
    description: "SIRIUS model only. nnnnnnnnnn = category info, UP/DOWN = Wrap-Around."
    params:
      - name: param
        type: string
        description: "category string, UP, DOWN"

  - id: sirius_parental_lock_set
    label: Set SIRIUS Parental Lock
    kind: action
    command: "!1SLK{param}"
    description: "SIRIUS model only. nnnn = 4-digit lock password, INPUT=display prompt, WRONG=wrong password display."
    params:
      - name: param
        type: string
        description: "4-digit password, INPUT, WRONG"

  - id: sirius_channel_name_query
    label: SIRIUS Channel Name Query
    kind: query
    command: "!1SCNQSTN"
    description: "SIRIUS model only."
    params: []

  - id: sirius_artist_query
    label: SIRIUS Artist Name Query
    kind: query
    command: "!1SATQSTN"
    description: "SIRIUS model only."
    params: []

  - id: sirius_title_query
    label: SIRIUS Title Query
    kind: query
    command: "!1STIQSTN"
    description: "SIRIUS model only."
    params: []

  # ===== HD Radio (HAT/HCN/HTI/HDS/HPR/HBL/HTS) =====
  - id: hd_radio_channel_program_set
    label: Set HD Radio Channel Program
    kind: action
    command: "!1HPR{program}"
    description: "HD Radio model only. 01-08 = direct channel program."
    params:
      - name: program
        type: string
        description: "01-08"

  - id: hd_radio_blend_set
    label: Set HD Radio Blend Mode
    kind: action
    command: "!1HBL{mode}"
    description: "HD Radio model only. 00=Auto, 01=Analog."
    params:
      - name: mode
        type: string
        description: "00=Auto, 01=Analog"

  - id: hd_radio_artist_query
    label: HD Radio Artist Name Query
    kind: query
    command: "!1HATQSTN"
    description: "HD Radio model only. Variable-length, 64 digits max."
    params: []

  - id: hd_radio_channel_name_query
    label: HD Radio Channel Name Query
    kind: query
    command: "!1HCNQSTN"
    description: "HD Radio model only. Station name, 7 digits."
    params: []

  - id: hd_radio_title_query
    label: HD Radio Title Query
    kind: query
    command: "!1HTIQSTN"
    description: "HD Radio model only. Variable-length, 64 digits max."
    params: []

  - id: hd_radio_detail_query
    label: HD Radio Detail Query
    kind: query
    command: "!1HDSQSTN"
    description: "HD Radio model only."
    params: []

  - id: hd_radio_tuner_status_query
    label: HD Radio Tuner Status Query
    kind: query
    command: "!1HTSQSTN"
    description: "HD Radio model only. Response mmnnoo: mm=00 not HD/01 HD, nn=current program 01-08, oo=receivable programs (8 bits hex)."
    params: []

  # ===== Net-Tune / Network / USB Operation (NTC) =====
  - id: net_play
    label: Net Play
    kind: action
    command: "!1NTCPLAY"
    description: "PLAY Key."
    params: []

  - id: net_stop
    label: Net Stop
    kind: action
    command: "!1NTCSTOP"
    description: "STOP Key."
    params: []

  - id: net_pause
    label: Net Pause
    kind: action
    command: "!1NTCPAUSE"
    description: "PAUSE Key."
    params: []

  - id: net_track_up
    label: Net Track Up
    kind: action
    command: "!1NTCTRUP"
    description: "TRACK UP Key."
    params: []

  - id: net_track_down
    label: Net Track Down
    kind: action
    command: "!1NTCTRDN"
    description: "TRACK DOWN Key."
    params: []

  - id: net_ff
    label: Net FF
    kind: action
    command: "!1NTCFF"
    description: "FF Key (CONTINUOUS* - send repeatedly, <=100ms between)."
    params: []

  - id: net_rew
    label: Net REW
    kind: action
    command: "!1NTCREW"
    description: "REW Key (CONTINUOUS* - send repeatedly, <=100ms between)."
    params: []

  - id: net_repeat
    label: Net Repeat
    kind: action
    command: "!1NTCREPEAT"
    description: "REPEAT Key."
    params: []

  - id: net_random
    label: Net Random
    kind: action
    command: "!1NTCRANDOM"
    description: "RANDOM Key."
    params: []

  - id: net_display
    label: Net Display
    kind: action
    command: "!1NTCDISPLAY"
    description: "DISPLAY Key."
    params: []

  - id: net_album
    label: Net Album
    kind: action
    command: "!1NTCALBUM"
    description: "ALBUM Key."
    params: []

  - id: net_artist
    label: Net Artist
    kind: action
    command: "!1NTCARTIST"
    description: "ARTIST Key."
    params: []

  - id: net_genre
    label: Net Genre
    kind: action
    command: "!1NTCGENRE"
    description: "GENRE Key."
    params: []

  - id: net_playlist
    label: Net Playlist
    kind: action
    command: "!1NTCPLAYLIST"
    description: "PLAYLIST Key."
    params: []

  - id: net_right
    label: Net Right
    kind: action
    command: "!1NTCRIGHT"
    description: "RIGHT Key."
    params: []

  - id: net_left
    label: Net Left
    kind: action
    command: "!1NTCLEFT"
    description: "LEFT Key."
    params: []

  - id: net_up
    label: Net Up
    kind: action
    command: "!1NTCUP"
    description: "UP Key."
    params: []

  - id: net_down
    label: Net Down
    kind: action
    command: "!1NTCDOWN"
    description: "DOWN Key."
    params: []

  - id: net_select
    label: Net Select
    kind: action
    command: "!1NTCSELECT"
    description: "SELECT Key."
    params: []

  - id: net_key_0
    label: Net 0 Key
    kind: action
    command: "!1NTC0"
    params: []

  - id: net_key_1
    label: Net 1 Key
    kind: action
    command: "!1NTC1"
    params: []

  - id: net_key_2
    label: Net 2 Key
    kind: action
    command: "!1NTC2"
    params: []

  - id: net_key_3
    label: Net 3 Key
    kind: action
    command: "!1NTC3"
    params: []

  - id: net_key_4
    label: Net 4 Key
    kind: action
    command: "!1NTC4"
    params: []

  - id: net_key_5
    label: Net 5 Key
    kind: action
    command: "!1NTC5"
    params: []

  - id: net_key_6
    label: Net 6 Key
    kind: action
    command: "!1NTC6"
    params: []

  - id: net_key_7
    label: Net 7 Key
    kind: action
    command: "!1NTC7"
    params: []

  - id: net_key_8
    label: Net 8 Key
    kind: action
    command: "!1NTC8"
    params: []

  - id: net_key_9
    label: Net 9 Key
    kind: action
    command: "!1NTC9"
    params: []

  - id: net_delete
    label: Net Delete
    kind: action
    command: "!1NTCDELETE"
    description: "DELETE Key."
    params: []

  - id: net_caps
    label: Net Caps
    kind: action
    command: "!1NTCCAPS"
    description: "CAPS Key."
    params: []

  - id: net_location
    label: Net Location
    kind: action
    command: "!1NTCLOCATION"
    description: "LOCATION Key."
    params: []

  - id: net_language
    label: Net Language
    kind: action
    command: "!1NTCLANGUAGE"
    description: "LANGUAGE Key."
    params: []

  - id: net_setup
    label: Net Setup
    kind: action
    command: "!1NTCSETUP"
    description: "SETUP Key."
    params: []

  - id: net_return
    label: Net Return
    kind: action
    command: "!1NTCRETURN"
    description: "RETURN Key."
    params: []

  - id: net_ch_up
    label: Net Channel Up
    kind: action
    command: "!1NTCCHUP"
    description: "CH UP (for iRadio)."
    params: []

  - id: net_ch_down
    label: Net Channel Down
    kind: action
    command: "!1NTCCHDN"
    description: "CH DOWN (for iRadio)."
    params: []

  # ===== Net/USB Info (NAT/NAL/NTI/NTM/NTR/NST) =====
  - id: net_artist_info_query
    label: Net/USB Artist Name Query
    kind: query
    command: "!1NATQSTN"
    description: "Net/USB Artist Name (variable-length, 64 letters max ASCII)."
    params: []

  - id: net_album_info_query
    label: Net/USB Album Name Query
    kind: query
    command: "!1NALQSTN"
    description: "Net/USB Album Name (variable-length, 64 letters max ASCII)."
    params: []

  - id: net_title_info_query
    label: Net/USB Title Name Query
    kind: query
    command: "!1NTIQSTN"
    description: "Net/USB Title Name (variable-length, 64 letters max ASCII)."
    params: []

  - id: net_time_info_query
    label: Net/USB Time Info Query
    kind: query
    command: "!1NTMQSTN"
    description: "Net/USB Time Info (Elapsed/Track time, max 99:59)."
    params: []

  - id: net_track_info_query
    label: Net/USB Track Info Query
    kind: query
    command: "!1NTRQSTN"
    description: "Net/USB Track Info (Current/Total track, max 9999)."
    params: []

  - id: net_play_status_query
    label: Net/USB Play Status Query
    kind: query
    command: "!1NSTQSTN"
    description: "Net/USB Play Status (3 letters: p=play status S/P/p/F/R, r=repeat -/R/F/1, s=shuffle -/S/X)."
    params: []

  # ===== Internet Radio Preset (NPR) =====
  - id: internet_radio_preset_set
    label: Set Internet Radio Preset
    kind: action
    command: "!1NPR{preset}"
    description: "01-28 = Preset No. 1-40 hex."
    params:
      - name: preset
        type: string
        description: "01-28 hex preset number"

  # ===== RI CD Player (CCD) =====
  - id: cd_track
    label: CD TRACK+
    kind: action
    command: "!1CCDTRACK"
    params: []
  - id: cd_play
    label: CD PLAY
    kind: action
    command: "!1CCDPLAY"
    params: []
  - id: cd_stop
    label: CD STOP
    kind: action
    command: "!1CCDSTOP"
    params: []
  - id: cd_pause
    label: CD PAUSE
    kind: action
    command: "!1CCDPAUSE"
    params: []
  - id: cd_skip_f
    label: CD Skip Forward
    kind: action
    command: "!1CCDSKIP.F"
    params: []
  - id: cd_skip_r
    label: CD Skip Reverse
    kind: action
    command: "!1CCDSKIP.R"
    params: []
  - id: cd_memory
    label: CD MEMORY
    kind: action
    command: "!1CCDMEMORY"
    params: []
  - id: cd_clear
    label: CD CLEAR
    kind: action
    command: "!1CCDCLEAR"
    params: []
  - id: cd_repeat
    label: CD REPEAT
    kind: action
    command: "!1CCDREPEAT"
    params: []
  - id: cd_random
    label: CD RANDOM
    kind: action
    command: "!1CCDRANDOM"
    params: []
  - id: cd_disp
    label: CD DISPLAY
    kind: action
    command: "!1CCDDISP"
    params: []
  - id: cd_dmode
    label: CD D.MODE
    kind: action
    command: "!1CCDD.MODE"
    params: []
  - id: cd_ff
    label: CD FF
    kind: action
    command: "!1CCDFF"
    params: []
  - id: cd_rew
    label: CD REW
    kind: action
    command: "!1CCDREW"
    params: []
  - id: cd_opcl
    label: CD OPEN/CLOSE
    kind: action
    command: "!1CCDOP/CL"
    params: []
  - id: cd_disc_skip
    label: CD DISC +
    kind: action
    command: "!1CCDD.SKIP"
    params: []
  - id: cd_disc_f
    label: CD DISC +
    kind: action
    command: "!1CCDDISC.F"
    params: []
  - id: cd_disc_r
    label: CD DISC -
    kind: action
    command: "!1CCDDISC.R"
    params: []
  - id: cd_disc1
    label: CD DISC1
    kind: action
    command: "!1CCDDISC1"
    params: []
  - id: cd_disc2
    label: CD DISC2
    kind: action
    command: "!1CCDDISC2"
    params: []
  - id: cd_disc3
    label: CD DISC3
    kind: action
    command: "!1CCDDISC3"
    params: []
  - id: cd_disc4
    label: CD DISC4
    kind: action
    command: "!1CCDDISC4"
    params: []
  - id: cd_disc5
    label: CD DISC5
    kind: action
    command: "!1CCDDISC5"
    params: []
  - id: cd_disc6
    label: CD DISC6
    kind: action
    command: "!1CCDDISC6"
    params: []
  - id: cd_standby
    label: CD STANDBY
    kind: action
    command: "!1CCDSTBY"
    params: []
  - id: cd_power_on
    label: CD POWER ON
    kind: action
    command: "!1CCDPON"
    params: []
  - id: cd_num
    label: CD Number Key
    kind: action
    command: "!1CCD{n}"
    description: "Number key 0-9, 10, +10."
    params:
      - name: n
        type: string
        description: "0-9, 10, +10"

  # ===== RI TAPE1 (CT1) =====
  - id: tape1_play_f
    label: TAPE1 Play Forward
    kind: action
    command: "!1CT1PLAY.F"
    params: []
  - id: tape1_play_r
    label: TAPE1 Play Reverse
    kind: action
    command: "!1CT1PLAY.R"
    params: []
  - id: tape1_stop
    label: TAPE1 Stop
    kind: action
    command: "!1CT1STOP"
    params: []
  - id: tape1_rec_pause
    label: TAPE1 Rec/Pause
    kind: action
    command: "!1CT1RC/PAU"
    params: []
  - id: tape1_ff
    label: TAPE1 FF
    kind: action
    command: "!1CT1FF"
    params: []
  - id: tape1_rew
    label: TAPE1 REW
    kind: action
    command: "!1CT1REW"
    params: []

  # ===== RI TAPE2 (CT2) =====
  - id: tape2_play_f
    label: TAPE2 Play Forward
    kind: action
    command: "!1CT2PLAY.F"
    params: []
  - id: tape2_play_r
    label: TAPE2 Play Reverse
    kind: action
    command: "!1CT2PLAY.R"
    params: []
  - id: tape2_stop
    label: TAPE2 Stop
    kind: action
    command: "!1CT2STOP"
    params: []
  - id: tape2_rec_pause
    label: TAPE2 Rec/Pause
    kind: action
    command: "!1CT2RC/PAU"
    params: []
  - id: tape2_ff
    label: TAPE2 FF
    kind: action
    command: "!1CT2FF"
    params: []
  - id: tape2_rew
    label: TAPE2 REW
    kind: action
    command: "!1CT2REW"
    params: []
  - id: tape2_opcl
    label: TAPE2 Open/Close
    kind: action
    command: "!1CT2OP/CL"
    params: []
  - id: tape2_skip_f
    label: TAPE2 Skip Forward
    kind: action
    command: "!1CT2SKIP.F"
    params: []
  - id: tape2_skip_r
    label: TAPE2 Skip Reverse
    kind: action
    command: "!1CT2SKIP.R"
    params: []
  - id: tape2_rec
    label: TAPE2 REC
    kind: action
    command: "!1CT2REC"
    params: []

  # ===== RI Graphics Equalizer (CEQ) =====
  - id: geq_preset
    label: GEQ PRESET
    kind: action
    command: "!1CEQPRESET"
    params: []

  # ===== RI DAT Recorder (CDT) =====
  - id: dat_play
    label: DAT PLAY
    kind: action
    command: "!1CDTPLAY"
    params: []
  - id: dat_rec_pause
    label: DAT Rec/Pause
    kind: action
    command: "!1CDTRC/PAU"
    params: []
  - id: dat_stop
    label: DAT STOP
    kind: action
    command: "!1CDTSTOP"
    params: []
  - id: dat_skip_f
    label: DAT Skip Forward
    kind: action
    command: "!1CDTSKIP.F"
    params: []
  - id: dat_skip_r
    label: DAT Skip Reverse
    kind: action
    command: "!1CDTSKIP.R"
    params: []
  - id: dat_ff
    label: DAT FF
    kind: action
    command: "!1CDTFF"
    params: []
  - id: dat_rew
    label: DAT REW
    kind: action
    command: "!1CDTREW"
    params: []

  # ===== RI DVD Player (CDV) =====
  - id: dvd_power_on
    label: DVD POWER ON
    kind: action
    command: "!1CDVPWRON"
    params: []
  - id: dvd_power_off
    label: DVD POWER OFF
    kind: action
    command: "!1CDVPWROFF"
    params: []
  - id: dvd_play
    label: DVD PLAY
    kind: action
    command: "!1CDVPLAY"
    params: []
  - id: dvd_stop
    label: DVD STOP
    kind: action
    command: "!1CDVSTOP"
    params: []
  - id: dvd_skip_f
    label: DVD Skip Forward
    kind: action
    command: "!1CDVSKIP.F"
    params: []
  - id: dvd_skip_r
    label: DVD Skip Reverse
    kind: action
    command: "!1CDVSKIP.R"
    params: []
  - id: dvd_ff
    label: DVD FF
    kind: action
    command: "!1CDVFF"
    params: []
  - id: dvd_rew
    label: DVD REW
    kind: action
    command: "!1CDVREW"
    params: []
  - id: dvd_pause
    label: DVD PAUSE
    kind: action
    command: "!1CDVPAUSE"
    params: []
  - id: dvd_last_play
    label: DVD LAST PLAY
    kind: action
    command: "!1CDVLASTPLAY"
    params: []
  - id: dvd_subtitle_toggle
    label: DVD SUBTITLE ON/OFF
    kind: action
    command: "!1CDVSUBTON/OFF"
    params: []
  - id: dvd_subtitle
    label: DVD SUBTITLE
    kind: action
    command: "!1CDVSUBTITLE"
    params: []
  - id: dvd_setup
    label: DVD SETUP
    kind: action
    command: "!1CDVSETUP"
    params: []
  - id: dvd_topmenu
    label: DVD TOPMENU
    kind: action
    command: "!1CDVTOPMENU"
    params: []
  - id: dvd_menu
    label: DVD MENU
    kind: action
    command: "!1CDVMENU"
    params: []
  - id: dvd_up
    label: DVD UP
    kind: action
    command: "!1CDVUP"
    params: []
  - id: dvd_down
    label: DVD DOWN
    kind: action
    command: "!1CDVDOWN"
    params: []
  - id: dvd_left
    label: DVD LEFT
    kind: action
    command: "!1CDVLEFT"
    params: []
  - id: dvd_right
    label: DVD RIGHT
    kind: action
    command: "!1CDVRIGHT"
    params: []
  - id: dvd_enter
    label: DVD ENTER
    kind: action
    command: "!1CDVENTER"
    params: []
  - id: dvd_return
    label: DVD RETURN
    kind: action
    command: "!1CDVRETURN"
    params: []
  - id: dvd_disc_f
    label: DVD DISC +
    kind: action
    command: "!1CDVDISC.F"
    params: []
  - id: dvd_disc_r
    label: DVD DISC -
    kind: action
    command: "!1CDVDISC.R"
    params: []
  - id: dvd_audio
    label: DVD AUDIO
    kind: action
    command: "!1CDVAUDIO"
    params: []
  - id: dvd_random
    label: DVD RANDOM
    kind: action
    command: "!1CDVRANDOM"
    params: []
  - id: dvd_opcl
    label: DVD OPEN/CLOSE
    kind: action
    command: "!1CDVOP/CL"
    params: []
  - id: dvd_angle
    label: DVD ANGLE
    kind: action
    command: "!1CDVANGLE"
    params: []
  - id: dvd_search
    label: DVD SEARCH
    kind: action
    command: "!1CDVSEARCH"
    params: []
  - id: dvd_disp
    label: DVD DISPLAY
    kind: action
    command: "!1CDVDISP"
    params: []
  - id: dvd_repeat
    label: DVD REPEAT
    kind: action
    command: "!1CDVREPEAT"
    params: []
  - id: dvd_memory
    label: DVD MEMORY
    kind: action
    command: "!1CDVMEMORY"
    params: []
  - id: dvd_clear
    label: DVD CLEAR
    kind: action
    command: "!1CDVCLEAR"
    params: []
  - id: dvd_abr
    label: DVD A-B REPEAT
    kind: action
    command: "!1CDVABR"
    params: []
  - id: dvd_step_f
    label: DVD STEP Forward
    kind: action
    command: "!1CDVSTEP.F"
    params: []
  - id: dvd_step_r
    label: DVD STEP Back
    kind: action
    command: "!1CDVSTEP.R"
    params: []
  - id: dvd_slow_f
    label: DVD SLOW Forward
    kind: action
    command: "!1CDVSLOW.F"
    params: []
  - id: dvd_slow_r
    label: DVD SLOW Back
    kind: action
    command: "!1CDVSLOW.R"
    params: []
  - id: dvd_zoom_toggle
    label: DVD ZOOM Toggle
    kind: action
    command: "!1CDVZOOMTG"
    params: []
  - id: dvd_zoom_up
    label: DVD ZOOM UP
    kind: action
    command: "!1CDVZOOMUP"
    params: []
  - id: dvd_zoom_dn
    label: DVD ZOOM DOWN
    kind: action
    command: "!1CDVZOOMDN"
    params: []
  - id: dvd_progressive
    label: DVD PROGRESSIVE
    kind: action
    command: "!1CDVPROGRE"
    params: []
  - id: dvd_video_off
    label: DVD VIDEO ON/OFF
    kind: action
    command: "!1CDVVDOFF"
    params: []
  - id: dvd_cond_memory
    label: DVD CONDITION MEMORY
    kind: action
    command: "!1CDVCONMEM"
    params: []
  - id: dvd_func_memory
    label: DVD FUNCTION MEMORY
    kind: action
    command: "!1CDVFUNMEM"
    params: []
  - id: dvd_disc1
    label: DVD DISC1
    kind: action
    command: "!1CDVDISC1"
    params: []
  - id: dvd_disc2
    label: DVD DISC2
    kind: action
    command: "!1CDVDISC2"
    params: []
  - id: dvd_disc3
    label: DVD DISC3
    kind: action
    command: "!1CDVDISC3"
    params: []
  - id: dvd_disc4
    label: DVD DISC4
    kind: action
    command: "!1CDVDISC4"
    params: []
  - id: dvd_disc5
    label: DVD DISC5
    kind: action
    command: "!1CDVDISC5"
    params: []
  - id: dvd_disc6
    label: DVD DISC6
    kind: action
    command: "!1CDVDISC6"
    params: []
  - id: dvd_folder_up
    label: DVD FOLDER UP
    kind: action
    command: "!1CDVFOLDUP"
    params: []
  - id: dvd_folder_dn
    label: DVD FOLDER DOWN
    kind: action
    command: "!1CDVFOLDDN"
    params: []
  - id: dvd_pmode
    label: DVD PLAY MODE
    kind: action
    command: "!1CDVP.MODE"
    params: []
  - id: dvd_num
    label: DVD Number Key
    kind: action
    command: "!1CDV{n}"
    description: "Number key 0-9 or 10."
    params:
      - name: n
        type: string
        description: "0-9, 10"

  # ===== RI MD Recorder (CMD) =====
  - id: md_play
    label: MD PLAY
    kind: action
    command: "!1CMDPLAY"
    params: []
  - id: md_stop
    label: MD STOP
    kind: action
    command: "!1CMDSTOP"
    params: []
  - id: md_ff
    label: MD FF
    kind: action
    command: "!1CMDFF"
    params: []
  - id: md_rew
    label: MD REW
    kind: action
    command: "!1CMDREW"
    params: []
  - id: md_pmode
    label: MD PLAY MODE
    kind: action
    command: "!1CMDP.MODE"
    params: []
  - id: md_skip_f
    label: MD Skip Forward
    kind: action
    command: "!1CMDSKIP.F"
    params: []
  - id: md_skip_r
    label: MD Skip Reverse
    kind: action
    command: "!1CMDSKIP.R"
    params: []
  - id: md_pause
    label: MD PAUSE
    kind: action
    command: "!1CMDPAUSE"
    params: []
  - id: md_rec
    label: MD REC
    kind: action
    command: "!1CMDREC"
    params: []
  - id: md_memory
    label: MD MEMORY
    kind: action
    command: "!1CMDMEMORY"
    params: []
  - id: md_disp
    label: MD DISPLAY
    kind: action
    command: "!1CMDDISP"
    params: []
  - id: md_scroll
    label: MD SCROLL
    kind: action
    command: "!1CMDSCROLL"
    params: []
  - id: md_mscan
    label: MD MUSIC SCAN
    kind: action
    command: "!1CMDM.SCAN"
    params: []
  - id: md_clear
    label: MD CLEAR
    kind: action
    command: "!1CMDCLEAR"
    params: []
  - id: md_random
    label: MD RANDOM
    kind: action
    command: "!1CMDRANDOM"
    params: []
  - id: md_repeat
    label: MD REPEAT
    kind: action
    command: "!1CMDREPEAT"
    params: []
  - id: md_enter
    label: MD ENTER
    kind: action
    command: "!1CMDENTER"
    params: []
  - id: md_eject
    label: MD EJECT
    kind: action
    command: "!1CMDEJECT"
    params: []
  - id: md_name
    label: MD NAME
    kind: action
    command: "!1CMDNAME"
    params: []
  - id: md_group
    label: MD GROUP
    kind: action
    command: "!1CMDGROUP"
    params: []
  - id: md_standby
    label: MD STANDBY
    kind: action
    command: "!1CMDSTBY"
    params: []
  - id: md_num
    label: MD Number Key
    kind: action
    command: "!1CMD{n}"
    description: "Number key 0-9, 10/0, or nn/nnn digits."
    params:
      - name: n
        type: string
        description: "0-9, 10/0, nn/nnn"

  # ===== RI CD-R Recorder (CCR) =====
  - id: ccr_pmode
    label: CD-R PLAY MODE
    kind: action
    command: "!1CCRP.MODE"
    params: []
  - id: ccr_play
    label: CD-R PLAY
    kind: action
    command: "!1CCRPLAY"
    params: []
  - id: ccr_stop
    label: CD-R STOP
    kind: action
    command: "!1CCRSTOP"
    params: []
  - id: ccr_skip_f
    label: CD-R Skip Forward
    kind: action
    command: "!1CCRSKIP.F"
    params: []
  - id: ccr_skip_r
    label: CD-R Skip Reverse
    kind: action
    command: "!1CCRSKIP.R"
    params: []
  - id: ccr_pause
    label: CD-R PAUSE
    kind: action
    command: "!1CCRPAUSE"
    params: []
  - id: ccr_rec
    label: CD-R REC
    kind: action
    command: "!1CCRREC"
    params: []
  - id: ccr_clear
    label: CD-R CLEAR
    kind: action
    command: "!1CCRCLEAR"
    params: []
  - id: ccr_repeat
    label: CD-R REPEAT
    kind: action
    command: "!1CCRREPEAT"
    params: []
  - id: ccr_scroll
    label: CD-R SCROLL
    kind: action
    command: "!1CCRSCROLL"
    params: []
  - id: ccr_opcl
    label: CD-R OPEN/CLOSE
    kind: action
    command: "!1CCROP/CL"
    params: []
  - id: ccr_disp
    label: CD-R DISPLAY
    kind: action
    command: "!1CCRDISP"
    params: []
  - id: ccr_random
    label: CD-R RANDOM
    kind: action
    command: "!1CCRRANDOM"
    params: []
  - id: ccr_memory
    label: CD-R MEMORY
    kind: action
    command: "!1CCRMEMORY"
    params: []
  - id: ccr_ff
    label: CD-R FF
    kind: action
    command: "!1CCRFF"
    params: []
  - id: ccr_rew
    label: CD-R REW
    kind: action
    command: "!1CCRREW"
    params: []
  - id: ccr_standby
    label: CD-R STANDBY
    kind: action
    command: "!1CCRSTBY"
    params: []
  - id: ccr_num
    label: CD-R Number Key
    kind: action
    command: "!1CCR{n}"
    description: "Number key 0-9, 10/0, or nn/nnn digits."
    params:
      - name: n
        type: string
        description: "0-9, 10/0, nn/nnn"

  # ===== Zone 2 Power (ZPW) =====
  - id: zone2_power_on
    label: Zone 2 Power On
    kind: action
    command: "!1ZPW01"
    params: []

  - id: zone2_power_standby
    label: Zone 2 Power Standby
    kind: action
    command: "!1ZPW00"
    params: []

  # ===== Zone 2 Muting (ZMT) =====
  - id: zone2_mute_on
    label: Zone 2 Mute On
    kind: action
    command: "!1ZMT01"
    params: []

  - id: zone2_mute_off
    label: Zone 2 Mute Off
    kind: action
    command: "!1ZMT00"
    params: []

  - id: zone2_mute_toggle
    label: Zone 2 Mute Toggle
    kind: action
    command: "!1ZMTTG"
    description: "Zone2 Muting Wrap-Around."
    params: []

  # ===== Zone 2 Volume (ZVL) - only works when main is ON =====
  - id: zone2_volume_set
    label: Zone 2 Set Volume
    kind: action
    command: "!1ZVL{level}"
    description: "Zone 2 volume in hex (00-64 = 0-100 or 00-50 = 0-80). Only works when main is ON."
    params:
      - name: level
        type: string
        description: "Hex volume level"

  - id: zone2_volume_up
    label: Zone 2 Volume Up
    kind: action
    command: "!1ZVLUP"
    params: []

  - id: zone2_volume_down
    label: Zone 2 Volume Down
    kind: action
    command: "!1ZVLDOWN"
    params: []

  # ===== Zone 2 Tone (ZTN) =====
  - id: zone2_tone_set
    label: Zone 2 Tone Set
    kind: action
    command: "!1ZTN{param}"
    description: "Bxx=Bass, Txx=Treble (-A..00..+A, -10..0..+10 2 step). BUP/BDOWN/TUP/TDOWN. Only works when main ON and Zone2 powered/variable."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  # ===== Zone 2 Balance (ZBL) =====
  - id: zone2_balance_set
    label: Zone 2 Balance Set
    kind: action
    command: "!1ZBL{param}"
    description: "xx=-A..00..+A (-10..0..+10 2 step). UP=to R, DOWN=to L."
    params:
      - name: param
        type: string
        description: "xx, UP, DOWN"

  # ===== Zone 2 Selector (SLZ) =====
  - id: zone2_input_select
    label: Zone 2 Select Input
    kind: action
    command: "!1SLZ{input}"
    description: "Zone 2 input selector, same codes as main zone SLI plus 80=SOURCE."
    params:
      - name: input
        type: string
        description: "Input code (same as SLI) or 80=SOURCE"

  # ===== Zone 2 Tuning (TUZ) =====
  - id: zone2_tuner_frequency_set
    label: Zone 2 Set Tuner Frequency
    kind: action
    command: "!1TUZ{freq}"
    description: "Direct frequency entry. FM nnn.nn MHz, AM nnnnn kHz. Tuner shared by MAIN/ZONE but control separated."
    params:
      - name: freq
        type: string
        description: "5-digit frequency string"

  - id: zone2_tuner_up
    label: Zone 2 Tuner Up
    kind: action
    command: "!1TUZUP"
    params: []

  - id: zone2_tuner_down
    label: Zone 2 Tuner Down
    kind: action
    command: "!1TUZDOWN"
    params: []

  # ===== Zone 2 Preset (PRZ) =====
  - id: zone2_preset_set
    label: Zone 2 Set Preset
    kind: action
    command: "!1PRZ{preset}"
    description: "01-28 (1-40) or 01-1E (1-30) hex."
    params:
      - name: preset
        type: string
        description: "Hex preset number"

  - id: zone2_preset_up
    label: Zone 2 Preset Up
    kind: action
    command: "!1PRZUP"
    params: []

  - id: zone2_preset_down
    label: Zone 2 Preset Down
    kind: action
    command: "!1PRZDOWN"
    params: []

  # ===== Zone 2 Net-Tune/Network (NTZ) =====
  - id: zone2_net_play
    label: Zone 2 Net Play
    kind: action
    command: "!1NTZPLAY"
    params: []
  - id: zone2_net_stop
    label: Zone 2 Net Stop
    kind: action
    command: "!1NTZSTOP"
    params: []
  - id: zone2_net_pause
    label: Zone 2 Net Pause
    kind: action
    command: "!1NTZPAUSE"
    params: []
  - id: zone2_net_track_up
    label: Zone 2 Net Track Up
    kind: action
    command: "!1NTZTRUP"
    params: []
  - id: zone2_net_track_down
    label: Zone 2 Net Track Down
    kind: action
    command: "!1NTZTRDN"
    params: []
  - id: zone2_net_ch_up
    label: Zone 2 Net CH Up
    kind: action
    command: "!1NTZCHUP"
    description: "CH UP (for iRadio)."
    params: []
  - id: zone2_net_ch_down
    label: Zone 2 Net CH Down
    kind: action
    command: "!1NTZCHDN"
    description: "CH DOWN (for iRadio)."
    params: []

  # ===== Zone 2 Internet Radio Preset (NPZ) =====
  - id: zone2_internet_radio_preset_set
    label: Zone 2 Internet Radio Preset
    kind: action
    command: "!1NPZ{preset}"
    description: "01-28 (1-40) hex. Network model only."
    params:
      - name: preset
        type: string
        description: "01-28 hex preset number"

  # ===== Zone 2 Listening Mode (LMZ) =====
  - id: zone2_listening_mode_set
    label: Zone 2 Listening Mode Set
    kind: action
    command: "!1LMZ{mode}"
    description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(PL2), 88=DVS(NEO6)."
    params:
      - name: mode
        type: string
        description: "00, 01, 0F, 12, 87, 88"

  # ===== Zone 2 Late Night (LTZ) =====
  - id: zone2_late_night_set
    label: Zone 2 Late Night Set
    kind: action
    command: "!1LTZ{mode}"
    description: "00=Off, 01=Low, 02=High."
    params:
      - name: mode
        type: string
        description: "00, 01, 02"

  - id: zone2_late_night_up
    label: Zone 2 Late Night Up
    kind: action
    command: "!1LTZUP"
    params: []

  # ===== Zone 2 Re-EQ/Academy (RAZ) =====
  - id: zone2_reeq_academy_set
    label: Zone 2 Re-EQ/Academy Set
    kind: action
    command: "!1RAZ{mode}"
    description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Wrap-Around."
    params:
      - name: mode
        type: string
        description: "00, 01, 02, UP"

  # ===== Zone 3 Power (PW3) =====
  - id: zone3_power_on
    label: Zone 3 Power On
    kind: action
    command: "!1PW301"
    params: []

  - id: zone3_power_standby
    label: Zone 3 Power Standby
    kind: action
    command: "!1PW300"
    params: []

  # ===== Zone 3 Muting (MT3) =====
  - id: zone3_mute_on
    label: Zone 3 Mute On
    kind: action
    command: "!1MT301"
    params: []

  - id: zone3_mute_off
    label: Zone 3 Mute Off
    kind: action
    command: "!1MT300"
    params: []

  - id: zone3_mute_toggle
    label: Zone 3 Mute Toggle
    kind: action
    command: "!1MT3TG"
    params: []

  # ===== Zone 3 Volume (VL3) =====
  - id: zone3_volume_set
    label: Zone 3 Set Volume
    kind: action
    command: "!1VL3{level}"
    description: "Zone 3 volume in hex (00-64 = 0-100 or 00-50 = 0-80)."
    params:
      - name: level
        type: string
        description: "Hex volume level"

  - id: zone3_volume_up
    label: Zone 3 Volume Up
    kind: action
    command: "!1VL3UP"
    params: []

  - id: zone3_volume_down
    label: Zone 3 Volume Down
    kind: action
    command: "!1VL3DOWN"
    params: []

  # ===== Zone 3 Tone (TN3) =====
  - id: zone3_tone_set
    label: Zone 3 Tone Set
    kind: action
    command: "!1TN3{param}"
    description: "Bxx/Txx (-A..00..+A), BUP/BDOWN/TUP/TDOWN."
    params:
      - name: param
        type: string
        description: "Bxx, Txx, BUP, BDOWN, TUP, TDOWN"

  # ===== Zone 3 Balance (BL3) =====
  - id: zone3_balance_set
    label: Zone 3 Balance Set
    kind: action
    command: "!1BL3{param}"
    description: "xx=-A..00..+A. UP=to R, DOWN=to L."
    params:
      - name: param
        type: string
        description: "xx, UP, DOWN"

  # ===== Zone 3 Selector (SL3) =====
  - id: zone3_input_select
    label: Zone 3 Select Input
    kind: action
    command: "!1SL3{input}"
    description: "Zone 3 input selector, same codes as SLI plus 80=SOURCE."
    params:
      - name: input
        type: string
        description: "Input code (same as SLI) or 80=SOURCE"

  # ===== Zone 3 Tuning (TU3) =====
  - id: zone3_tuner_frequency_set
    label: Zone 3 Set Tuner Frequency
    kind: action
    command: "!1TU3{freq}"
    description: "Direct frequency entry. FM nnn.nn MHz, AM nnnnn kHz."
    params:
      - name: freq
        type: string
        description: "5-digit frequency string"

  - id: zone3_tuner_up
    label: Zone 3 Tuner Up
    kind: action
    command: "!1TU3UP"
    params: []

  - id: zone3_tuner_down
    label: Zone 3 Tuner Down
    kind: action
    command: "!1TU3DOWN"
    params: []

  # ===== Zone 3 Preset (PR3) =====
  - id: zone3_preset_set
    label: Zone 3 Set Preset
    kind: action
    command: "!1PR3{preset}"
    description: "01-28 (1-40) or 01-1E (1-30) hex."
    params:
      - name: preset
        type: string
        description: "Hex preset number"

  - id: zone3_preset_up
    label: Zone 3 Preset Up
    kind: action
    command: "!1PR3UP"
    params: []

  - id: zone3_preset_down
    label: Zone 3 Preset Down
    kind: action
    command: "!1PR3DOWN"
    params: []

  # ===== Zone 3 Net-Tune/Network (NT3) =====
  - id: zone3_net_play
    label: Zone 3 Net Play
    kind: action
    command: "!1NT3PLAY"
    params: []
  - id: zone3_net_stop
    label: Zone 3 Net Stop
    kind: action
    command: "!1NT3STOP"
    params: []
  - id: zone3_net_pause
    label: Zone 3 Net Pause
    kind: action
    command: "!1NT3PAUSE"
    params: []
  - id: zone3_net_track_up
    label: Zone 3 Net Track Up
    kind: action
    command: "!1NT3TRUP"
    params: []
  - id: zone3_net_track_down
    label: Zone 3 Net Track Down
    kind: action
    command: "!1NT3TRDN"
    params: []
  - id: zone3_net_ch_up
    label: Zone 3 Net CH Up
    kind: action
    command: "!1NT3CHUP"
    params: []
  - id: zone3_net_ch_down
    label: Zone 3 Net CH Down
    kind: action
    command: "!1NT3CHDN"
    params: []

  # ===== Zone 3 Internet Radio Preset (NP3) =====
  - id: zone3_internet_radio_preset_set
    label: Zone 3 Internet Radio Preset
    kind: action
    command: "!1NP3{preset}"
    description: "01-28 (1-40) hex. Network model only."
    params:
      - name: preset
        type: string
        description: "01-28 hex preset number"

  # ===== Zone 4 Power (PW4) =====
  - id: zone4_power_on
    label: Zone 4 Power On
    kind: action
    command: "!1PW401"
    params: []

  - id: zone4_power_standby
    label: Zone 4 Power Standby
    kind: action
    command: "!1PW400"
    params: []

  # ===== Zone 4 Muting (MT4) =====
  - id: zone4_mute_on
    label: Zone 4 Mute On
    kind: action
    command: "!1MT401"
    params: []

  - id: zone4_mute_off
    label: Zone 4 Mute Off
    kind: action
    command: "!1MT400"
    params: []

  - id: zone4_mute_toggle
    label: Zone 4 Mute Toggle
    kind: action
    command: "!1MT4TG"
    params: []

  # ===== Zone 4 Volume (VL4) =====
  - id: zone4_volume_set
    label: Zone 4 Set Volume
    kind: action
    command: "!1VL4{level}"
    description: "Zone 4 volume in hex (00-64 = 0-100 or 00-50 = 0-80)."
    params:
      - name: level
        type: string
        description: "Hex volume level"

  - id: zone4_volume_up
    label: Zone 4 Volume Up
    kind: action
    command: "!1VL4UP"
    params: []

  - id: zone4_volume_down
    label: Zone 4 Volume Down
    kind: action
    command: "!1VL4DOWN"
    params: []

  # ===== Zone 4 Selector (SL4) =====
  - id: zone4_input_select
    label: Zone 4 Select Input
    kind: action
    command: "!1SL4{input}"
    description: "Zone 4 input selector, same codes as SLI plus 80=SOURCE."
    params:
      - name: input
        type: string
        description: "Input code (same as SLI) or 80=SOURCE"

  # ===== Zone 4 Tuning (TU4) =====
  - id: zone4_tuner_frequency_set
    label: Zone 4 Set Tuner Frequency
    kind: action
    command: "!1TU4{freq}"
    description: "Direct frequency entry. FM nnn.nn MHz, AM nnnnn kHz."
    params:
      - name: freq
        type: string
        description: "5-digit frequency string"

  - id: zone4_tuner_up
    label: Zone 4 Tuner Up
    kind: action
    command: "!1TU4UP"
    params: []

  - id: zone4_tuner_down
    label: Zone 4 Tuner Down
    kind: action
    command: "!1TU4DOWN"
    params: []

  # ===== Zone 4 Preset (PR4) =====
  - id: zone4_preset_set
    label: Zone 4 Set Preset
    kind: action
    command: "!1PR4{preset}"
    description: "01-28 (1-40) or 01-1E (1-30) hex."
    params:
      - name: preset
        type: string
        description: "Hex preset number"

  - id: zone4_preset_up
    label: Zone 4 Preset Up
    kind: action
    command: "!1PR4UP"
    params: []

  - id: zone4_preset_down
    label: Zone 4 Preset Down
    kind: action
    command: "!1PR4DOWN"
    params: []

  # ===== Zone 4 Net-Tune/Network (NT4) =====
  - id: zone4_net_play
    label: Zone 4 Net Play
    kind: action
    command: "!1NT4PLAY"
    params: []
  - id: zone4_net_stop
    label: Zone 4 Net Stop
    kind: action
    command: "!1NT4STOP"
    params: []
  - id: zone4_net_pause
    label: Zone 4 Net Pause
    kind: action
    command: "!1NT4PAUSE"
    params: []
  - id: zone4_net_track_up
    label: Zone 4 Net Track Up
    kind: action
    command: "!1NT4TRUP"
    params: []
  - id: zone4_net_track_down
    label: Zone 4 Net Track Down
    kind: action
    command: "!1NT4TRDN"
    params: []

  # ===== Zone 4 Internet Radio Preset (NP4) =====
  - id: zone4_internet_radio_preset_set
    label: Zone 4 Internet Radio Preset
    kind: action
    command: "!1NP4{preset}"
    description: "01-28 (1-40) hex. Network model only."
    params:
      - name: preset
        type: string
        description: "01-28 hex preset number"

  # ===== Docking Station via RI (CDS) =====
  - id: dock_power_on
    label: Dock Power On
    kind: action
    command: "!1CDSPWRON"
    params: []
  - id: dock_power_off
    label: Dock Standby
    kind: action
    command: "!1CDSPWROFF"
    params: []
  - id: dock_play_resume
    label: Dock Play/Resume
    kind: action
    command: "!1CDSPLY/RES"
    params: []
  - id: dock_stop
    label: Dock Stop
    kind: action
    command: "!1CDSSTOP"
    params: []
  - id: dock_skip_f
    label: Dock Track Up
    kind: action
    command: "!1CDSSKIP.F"
    params: []
  - id: dock_skip_r
    label: Dock Track Down
    kind: action
    command: "!1CDSSKIP.R"
    params: []
  - id: dock_pause
    label: Dock Pause
    kind: action
    command: "!1CDSPAUSE"
    params: []
  - id: dock_play_pause
    label: Dock Play/Pause
    kind: action
    command: "!1CDSPLY/PAU"
    params: []
  - id: dock_ff
    label: Dock FF
    kind: action
    command: "!1CDSFF"
    params: []
  - id: dock_rew
    label: Dock FR
    kind: action
    command: "!1CDSREW"
    params: []
  - id: dock_album_up
    label: Dock Album Up
    kind: action
    command: "!1CDSALBUM+"
    params: []
  - id: dock_album_down
    label: Dock Album Down
    kind: action
    command: "!1CDSALBUM-"
    params: []
  - id: dock_plist_up
    label: Dock Playlist Up
    kind: action
    command: "!1CDSPLIST+"
    params: []
  - id: dock_plist_down
    label: Dock Playlist Down
    kind: action
    command: "!1CDSPLIST-"
    params: []
  - id: dock_chapt_up
    label: Dock Chapter Up
    kind: action
    command: "!1CDSCHAPT+"
    params: []
  - id: dock_chapt_down
    label: Dock Chapter Down
    kind: action
    command: "!1CDSCHAPT-"
    params: []
  - id: dock_random
    label: Dock Shuffle
    kind: action
    command: "!1CDSRANDOM"
    params: []
  - id: dock_repeat
    label: Dock Repeat
    kind: action
    command: "!1CDSREPEAT"
    params: []
  - id: dock_mute
    label: Dock Mute
    kind: action
    command: "!1CDSMUTE"
    params: []
  - id: dock_blight
    label: Dock Backlight
    kind: action
    command: "!1CDSBLIGHT"
    params: []
  - id: dock_menu
    label: Dock Menu
    kind: action
    command: "!1CDSMENU"
    params: []
  - id: dock_enter
    label: Dock Select
    kind: action
    command: "!1CDSENTER"
    params: []
  - id: dock_up
    label: Dock Cursor Up
    kind: action
    command: "!1CDSUP"
    params: []
  - id: dock_down
    label: Dock Cursor Down
    kind: action
    command: "!1CDSDOWN"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    command: "!1PWRQSTN"
    response_prefix: "!1PWR"
    values: ["00", "01"]
    description: "00=Standby, 01=On"

  - id: mute_state
    type: enum
    command: "!1AMTQSTN"
    response_prefix: "!1AMT"
    values: ["00", "01"]
    description: "00=Muting Off, 01=Muting On"

  - id: speaker_a_state
    type: enum
    command: "!1SPAQSTN"
    response_prefix: "!1SPA"
    values: ["00", "01"]
    description: "Speaker A state. 00=Off, 01=On."

  - id: speaker_b_state
    type: enum
    command: "!1SPBQSTN"
    response_prefix: "!1SPB"
    values: ["00", "01"]
    description: "Speaker B state. 00=Off, 01=On."

  - id: speaker_layout_state
    type: string
    command: "!1SPLQSTN"
    response_prefix: "!1SPL"
    description: "Speaker layout. SB/FH/FW."

  - id: volume_level
    type: string
    command: "!1MVLQSTN"
    response_prefix: "!1MVL"
    description: "Current volume level in hex"

  - id: tone_front
    type: string
    command: "!1TFRQSTN"
    response_prefix: "!1TFR"
    description: "Front tone BxxTxx"

  - id: tone_front_wide
    type: string
    command: "!1TFWQSTN"
    response_prefix: "!1TFW"
    description: "Front Wide tone BxxTxx"

  - id: tone_front_high
    type: string
    command: "!1TFHQSTN"
    response_prefix: "!1TFH"
    description: "Front High tone BxxTxx"

  - id: tone_center
    type: string
    command: "!1TCTQSTN"
    response_prefix: "!1TCT"
    description: "Center tone BxxTxx"

  - id: tone_surround
    type: string
    command: "!1TSRQSTN"
    response_prefix: "!1TSR"
    description: "Surround tone BxxTxx"

  - id: tone_surround_back
    type: string
    command: "!1TSBQSTN"
    response_prefix: "!1TSB"
    description: "Surround Back tone BxxTxx"

  - id: tone_subwoofer
    type: string
    command: "!1TSWQSTN"
    response_prefix: "!1TSW"
    description: "Subwoofer tone Bxx"

  - id: subwoofer_temp_level
    type: string
    command: "!1SWLQSTN"
    response_prefix: "!1SWL"
    description: "Subwoofer temporary level"

  - id: center_temp_level
    type: string
    command: "!1CTLQSTN"
    response_prefix: "!1CTL"
    description: "Center temporary level"

  - id: display_mode
    type: enum
    command: "!1DIFQSTN"
    response_prefix: "!1DIF"
    values: ["00", "01"]
    description: "Display mode. 00=Selector+Volume, 01=Selector+Listening Mode."

  - id: input_state
    type: string
    command: "!1SLIQSTN"
    response_prefix: "!1SLI"
    description: "Current input selector position hex code"

  - id: recout_state
    type: string
    command: "!1SLRQSTN"
    response_prefix: "!1SLR"
    description: "RECOUT selector position hex code"

  - id: audio_selector_state
    type: string
    command: "!1SLAQSTN"
    response_prefix: "!1SLA"
    description: "Audio selector status"

  - id: hdmi_output_state
    type: string
    command: "!1HDOQSTN"
    response_prefix: "!1HDO"
    description: "HDMI Out selector"

  - id: monitor_resolution_state
    type: string
    command: "!1RESQSTN"
    response_prefix: "!1RES"
    description: "Monitor Out Resolution"

  - id: isf_mode_state
    type: string
    command: "!1ISFQSTN"
    response_prefix: "!1ISF"
    description: "ISF Mode state"

  - id: listening_mode
    type: string
    command: "!1LMDQSTN"
    response_prefix: "!1LMD"
    description: "Current listening mode hex code"

  - id: dimmer_level
    type: enum
    command: "!1DIMQSTN"
    response_prefix: "!1DIM"
    values: ["00", "01", "02", "03", "08"]
    description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED Off"

  - id: sleep_time
    type: string
    command: "!1SLPQSTN"
    response_prefix: "!1SLP"
    description: "Sleep timer value or OFF"

  - id: late_night_state
    type: enum
    command: "!1LTNQSTN"
    response_prefix: "!1LTN"
    values: ["00", "01", "02", "03"]
    description: "00=Off, 01=Low/On, 02=High, 03=Auto"

  - id: reeq_academy_state
    type: enum
    command: "!1RASQSTN"
    response_prefix: "!1RAS"
    values: ["00", "01", "02"]
    description: "Re-EQ/Academy/Cinema filter state (interpretation varies by model)"

  - id: audyssey_multeq_state
    type: enum
    command: "!1ADYQSTN"
    response_prefix: "!1ADY"
    values: ["00", "01"]
    description: "Audyssey 2EQ/MultEQ/MultEQ XT state"

  - id: audyssey_dyn_eq_state
    type: enum
    command: "!1ADQQSTN"
    response_prefix: "!1ADQ"
    values: ["00", "01"]
    description: "Audyssey Dynamic EQ state"

  - id: audyssey_dyn_vol_state
    type: enum
    command: "!1ADVQSTN"
    response_prefix: "!1ADV"
    values: ["00", "01", "02", "03"]
    description: "Audyssey Dynamic Volume state"

  - id: dolby_volume_state
    type: enum
    command: "!1DVLQSTN"
    response_prefix: "!1DVL"
    values: ["00", "01", "02", "03"]
    description: "Dolby Volume state"

  - id: music_optimizer_state
    type: enum
    command: "!1MOTQSTN"
    response_prefix: "!1MOT"
    values: ["00", "01"]
    description: "Music Optimizer state"

  - id: tuner_frequency
    type: string
    command: "!1TUNQSTN"
    response_prefix: "!1TUN"
    description: "Current tuning frequency"

  - id: preset_number
    type: string
    command: "!1PRSQSTN"
    response_prefix: "!1PRS"
    description: "Current preset number"

  - id: zone2_power_state
    type: enum
    command: "!1ZPWQSTN"
    response_prefix: "!1ZPW"
    values: ["00", "01"]
    description: "00=Standby, 01=On"

  - id: zone2_mute_state
    type: enum
    command: "!1ZMTQSTN"
    response_prefix: "!1ZMT"
    values: ["00", "01"]
    description: "00=Muting Off, 01=Muting On"

  - id: zone2_volume_level
    type: string
    command: "!1ZVLQSTN"
    response_prefix: "!1ZVL"
    description: "Zone 2 volume level in hex"

  - id: zone2_tone
    type: string
    command: "!1ZTNQSTN"
    response_prefix: "!1ZTN"
    description: "Zone 2 tone BxxTxx"

  - id: zone2_balance
    type: string
    command: "!1ZBLQSTN"
    response_prefix: "!1ZBL"
    description: "Zone 2 balance"

  - id: zone2_input_state
    type: string
    command: "!1SLZQSTN"
    response_prefix: "!1SLZ"
    description: "Zone 2 selector position hex code"

  - id: zone2_tuner_frequency
    type: string
    command: "!1TUZQSTN"
    response_prefix: "!1TUZ"
    description: "Zone 2 tuning frequency"

  - id: zone2_preset_number
    type: string
    command: "!1PRZQSTN"
    response_prefix: "!1PRZ"
    description: "Zone 2 preset number"

  - id: zone2_late_night_state
    type: enum
    command: "!1LTZQSTN"
    response_prefix: "!1LTZ"
    values: ["00", "01", "02"]
    description: "Zone 2 late night. 00=Off, 01=Low, 02=High."

  - id: zone2_reeq_academy_state
    type: enum
    command: "!1RAZQSTN"
    response_prefix: "!1RAZ"
    values: ["00", "01", "02"]
    description: "Zone 2 Re-EQ/Academy state"

  - id: zone3_power_state
    type: enum
    command: "!1PW3QSTN"
    response_prefix: "!1PW3"
    values: ["00", "01"]
    description: "Zone 3 power. 00=Standby, 01=On."

  - id: zone3_mute_state
    type: enum
    command: "!1MT3QSTN"
    response_prefix: "!1MT3"
    values: ["00", "01"]
    description: "Zone 3 muting state"

  - id: zone3_volume_level
    type: string
    command: "!1VL3QSTN"
    response_prefix: "!1VL3"
    description: "Zone 3 volume level in hex"

  - id: zone3_tone
    type: string
    command: "!1TN3QSTN"
    response_prefix: "!1TN3"
    description: "Zone 3 tone BxxTxx"

  - id: zone3_balance
    type: string
    command: "!1BL3QSTN"
    response_prefix: "!1BL3"
    description: "Zone 3 balance"

  - id: zone3_input_state
    type: string
    command: "!1SL3QSTN"
    response_prefix: "!1SL3"
    description: "Zone 3 selector position hex code"

  - id: zone3_tuner_frequency
    type: string
    command: "!1TU3QSTN"
    response_prefix: "!1TU3"
    description: "Zone 3 tuning frequency"

  - id: zone3_preset_number
    type: string
    command: "!1PR3QSTN"
    response_prefix: "!1PR3"
    description: "Zone 3 preset number"

  - id: zone4_power_state
    type: enum
    command: "!1PW4QSTN"
    response_prefix: "!1PW4"
    values: ["00", "01"]
    description: "Zone 4 power. 00=Standby, 01=On."

  - id: zone4_mute_state
    type: enum
    command: "!1MT4QSTN"
    response_prefix: "!1MT4"
    values: ["00", "01"]
    description: "Zone 4 muting state"

  - id: zone4_volume_level
    type: string
    command: "!1VL4QSTN"
    response_prefix: "!1VL4"
    description: "Zone 4 volume level in hex"

  - id: zone4_input_state
    type: string
    command: "!1SL4QSTN"
    response_prefix: "!1SL4"
    description: "Zone 4 selector position hex code"

  - id: zone4_tuner_frequency
    type: string
    command: "!1TU4QSTN"
    response_prefix: "!1TU4"
    description: "Zone 4 tuning frequency"

  - id: zone4_preset_number
    type: string
    command: "!1PR4QSTN"
    response_prefix: "!1PR4"
    description: "Zone 4 preset number"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
events:
  - id: status_notification
    description: "Unsolicited status message sent when receiver state changes (e.g. input change, power change). Format same as query response. Sent within 50msec of state change. Only delivered over a continuously-held TCP connection."
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks, but note:
# Zone 2 volume/tone only works when main zone is ON.
# Zone 2 tone only works when main ON and Zone2 powered or variable.
# TGA/TGB/TGC available only when each 12V Trigger parameter is all OFF at Setup Menu.
# Only one TCP client connection supported at a time.
```

## Notes
- ISCP message format: start character `!`, unit type `1` (Receiver), 3-char command, variable-length parameter, end character.
- RS-232 end characters: `[CR]`, `[LF]`, or `[CR][LF]`.
- eISCP (Ethernet) end characters: `[EOF]`, `[EOF][CR]`, or `[EOF][CR][LF]` depending on model.
- eISCP packet includes 16-byte header: magic `ISCP`, header size 0x00000010, data size, version 0x01, reserved 0x000000 (all big-endian).
- RS-232 hardware: 3-wire, 9600/8/1/no-parity/no-flow-control, DB9 female (pin 2 TX, pin 3 RX, pin 5 GND), straight-thru cable.
- TCP connection must be held continuously for unsolicited status notifications.
- Only one TCP client connection allowed at a time.
- Minimum 50msec interval between commands.
- NTC FF/REW (Net-Tune) must be sent continuously with no more than 100ms delay between codes.
- Volume values are hexadecimal (00-64 = 0-100 for most models; 00-50 = 0-80 for older models).
- Command support varies significantly by model — per-model compatibility matrix in source determines availability.
- RI (Remote Interactive) commands control connected ONKYO/Integra components (CD, DVD, TAPE, MD, CD-R, DAT, Dock) via the RI jack.
- XM, SIRIUS, HD Radio commands are model-specific (only models with corresponding tuner/dock).
- Net/USB (NTC) and Internet Radio commands require network-capable models.
- Source: ISCP Serial Communication Protocol for AV Receiver, Version 1.15, 31 August 2009 (ONKYO CORPORATION copyright 2003-2009).

<!-- UNRESOLVED: exact command support varies by model — per-model compatibility matrix in source -->
<!-- UNRESOLVED: eISCP header details not fully documented for all firmware versions -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-22T16:31:45.262Z
last_checked_at: 2026-10-01T11:34:52.592Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:34:52.592Z
matched_actions: 389
action_count: 389
confidence: medium
summary: "All 389 spec actions map to source command tables; transport values (9600 baud, port 60128) are verbatim; no extra source commands remain unrepresented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model-to-command mapping varies by model; only documented commands listed. Per-model compatibility matrix in source determines which commands each model supports."
- "populate from source, or remove section if not applicable"
- "source does not describe safety interlocks, but note:"
- "exact command support varies by model — per-model compatibility matrix in source"
- "eISCP header details not fully documented for all firmware versions"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
