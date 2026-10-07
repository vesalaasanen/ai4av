---
spec_id: admin/onkyo-ht-rc560
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo HT-RC560 Control Spec"
manufacturer: Onkyo
model_family: HT-RC560
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - HT-RC560
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:26:11.967Z
last_checked_at: 2026-10-01T08:28:03.913Z
generated_at: 2026-10-01T08:28:03.913Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the source is a generic ISCP protocol document covering many Onkyo/Integra models; HT-RC560 is not explicitly listed in the model support matrix. Command support per model is indicated per-entry but HT-RC560 column is absent. Commands populated below are those documented by the source (broad support across late-model receivers). XM/SIRIUS/HD Radio rows are model-conditional and may not apply to HT-RC560 hardware."
  - "no independent settable parameters outside the Actions section."
  - "no explicit multi-step sequences documented in source"
  - "no power-on sequencing requirements or safety warnings in source"
  - "HT-RC560 not explicitly listed in source model support matrix. Source covers TX-NR/DTR/DHC/PR-SC series receivers through v1.15. HT-RC560 likely shares command set with TX-NR series but exact per-command support unconfirmed."
  - "firmware version compatibility not stated in source"
  - "exact input list and supported listening modes for HT-RC560 not confirmed; populated from full ISCP code catalogue"
  - "XM/SIRIUS/HD Radio commands present in source but may not apply to HT-RC560 hardware"
  - "DIF00/DIF01/DIF03 reused across Display-Information and Display-Mode variants; which set a given model honors is model-dependent"
verification:
  verdict: verified
  checked_at: 2026-10-01T08:28:03.913Z
  matched_actions: 439
  action_count: 439
  confidence: medium
  summary: "All 439 spec actions map to verbatim3-char ISCP mnemonics in source; transport 60128/9600/8/N/1 verified. Model applicability caveat: HT-RC560 not explicitly listed in source's model support matrix — flagged as UNRESOLVED in spec itself. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-15
---

# Onkyo HT-RC560 Control Spec

## Summary
AV receiver controlled via the Integra Serial Control Protocol (ISCP) over TCP/IP (eISCP) and RS-232. Supports power, volume, muting, input selection, listening modes, tone control, speaker level calibration, Zone 2/3/4, tuner (incl. RDS/XM/SIRIUS/HD Radio command sets), network/USB playback, OSD navigation, memory setup, HDMI/video output control, and RI-port passthrough commands for external CD/DVD/MD/Tape/Dock devices. The protocol uses 3-character command codes with variable-length parameters sent as ASCII text within a binary eISCP frame over TCP.

<!-- UNRESOLVED: the source is a generic ISCP protocol document covering many Onkyo/Integra models; HT-RC560 is not explicitly listed in the model support matrix. Command support per model is indicated per-entry but HT-RC560 column is absent. Commands populated below are those documented by the source (broad support across late-model receivers). XM/SIRIUS/HD Radio rows are model-conditional and may not apply to HT-RC560 hardware. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 60128
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not document any authentication procedure; absence not confirmed as explicit no-auth
```

## Traits
```yaml
traits:
  - powerable       # PWR command
  - queryable       # QSTN parameter on most commands
  - routable        # SLI / SLZ / SL3 / SL4 input selectors
  - levelable       # MVL volume, tone commands, speaker level calibration
```

## Actions
```yaml
actions:
  # --- Power ---
  - id: power_on
    label: Power On
    kind: action
    command: PWR01
    description: Sets System On
    params: []

  - id: power_off
    label: Power Standby
    kind: action
    command: PWR00
    description: Sets System Standby
    params: []

  # --- Muting ---
  - id: mute_on
    label: Mute On
    kind: action
    command: AMT01
    description: Sets Audio Muting On
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: AMT00
    description: Sets Audio Muting Off
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: AMTTG
    description: Sets Audio Muting Wrap-Around
    params: []

  # --- Speaker A/B (SPA/SPB) ---
  - id: speaker_a_off
    label: Speaker A Off
    kind: action
    command: SPA00
    description: Sets Speaker A Off (SPA=MAIN A on some models, Front A on others)
    params: []

  - id: speaker_a_on
    label: Speaker A On
    kind: action
    command: SPA01
    description: Sets Speaker A On
    params: []

  - id: speaker_a_toggle
    label: Speaker A Toggle
    kind: action
    command: SPAUP
    description: Sets Speaker A Switch Wrap-Around
    params: []

  - id: speaker_b_off
    label: Speaker B Off
    kind: action
    command: SPB00
    description: Sets Speaker B Off (SPB=MAIN B on some models, Front B exclusive on others)
    params: []

  - id: speaker_b_on
    label: Speaker B On
    kind: action
    command: SPB01
    description: Sets Speaker B On
    params: []

  - id: speaker_b_toggle
    label: Speaker B Toggle
    kind: action
    command: SPBUP
    description: Sets Speaker B Switch Wrap-Around
    params: []

  # --- Speaker Layout (SPL) ---
  - id: speaker_layout_sb
    label: Speaker Layout SurrBack
    kind: action
    command: SPLSB
    description: Sets SurrBack Speaker layout
    params: []

  - id: speaker_layout_fh
    label: Speaker Layout Front High
    kind: action
    command: SPLFH
    description: Sets Front High Speaker / SurrBack+Front High Speakers
    params: []

  - id: speaker_layout_fw
    label: Speaker Layout Front Wide
    kind: action
    command: SPLFW
    description: Sets Front Wide Speaker / SurrBack+Front Wide Speakers
    params: []

  - id: speaker_layout_toggle
    label: Speaker Layout Toggle
    kind: action
    command: SPLUP
    description: Sets Speaker Switch Wrap-Around
    params: []

  # --- Master Volume ---
  - id: volume_set
    label: Set Volume Level
    kind: action
    command: MVLxx
    description: "Volume Level 0-100 in hex (00-64)"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level (sent as 2-digit hex)

  - id: volume_up
    label: Volume Up
    kind: action
    command: MVLUP
    description: Sets Volume Level Up
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: MVLDOWN
    description: Sets Volume Level Down
    params: []

  - id: volume_up_1db
    label: Volume Up 1dB
    kind: action
    command: MVLUP1
    description: Sets Volume Level Up 1dB Step
    params: []

  - id: volume_down_1db
    label: Volume Down 1dB
    kind: action
    command: MVLDOWN1
    description: Sets Volume Level Down 1dB Step
    params: []

  # --- Tone: Front (TFR) ---
  - id: tone_front_set
    label: Set Front Tone
    kind: action
    command: TFRBxxTxx
    description: "Front Bass+Treble (Bxx/Txx, -A..00..+A = -10..0..+10 in 2-step)"
    params:
      - name: bass
        type: string
        description: Bass value hex (-A..00..+A)
      - name: treble
        type: string
        description: Treble value hex (-A..00..+A)

  - id: tone_front_bass_up
    label: Front Bass Up
    kind: action
    command: TFRBUP
    description: Sets Front Bass Up (2 step)
    params: []

  - id: tone_front_bass_down
    label: Front Bass Down
    kind: action
    command: TFRBDOWN
    description: Sets Front Bass Down (2 step)
    params: []

  - id: tone_front_treble_up
    label: Front Treble Up
    kind: action
    command: TFRTUP
    description: Sets Front Treble Up (2 step)
    params: []

  - id: tone_front_treble_down
    label: Front Treble Down
    kind: action
    command: TFRTDOWN
    description: Sets Front Treble Down (2 step)
    params: []

  # --- Tone: Front Wide (TFW) ---
  - id: tone_front_wide_set
    label: Set Front Wide Tone
    kind: action
    command: TFWBxxTxx
    description: "Front Wide Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: tone_front_wide_bass_up
    label: Front Wide Bass Up
    kind: action
    command: TFWBUP
    params: []

  - id: tone_front_wide_bass_down
    label: Front Wide Bass Down
    kind: action
    command: TFWBDOWN
    params: []

  - id: tone_front_wide_treble_up
    label: Front Wide Treble Up
    kind: action
    command: TFWTUP
    params: []

  - id: tone_front_wide_treble_down
    label: Front Wide Treble Down
    kind: action
    command: TFWTDOWN
    params: []

  # --- Tone: Front High (TFH) ---
  - id: tone_front_high_set
    label: Set Front High Tone
    kind: action
    command: TFHBxxTxx
    description: "Front High Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: tone_front_high_bass_up
    label: Front High Bass Up
    kind: action
    command: TFHBUP
    params: []

  - id: tone_front_high_bass_down
    label: Front High Bass Down
    kind: action
    command: TFHBDOWN
    params: []

  - id: tone_front_high_treble_up
    label: Front High Treble Up
    kind: action
    command: TFHTUP
    params: []

  - id: tone_front_high_treble_down
    label: Front High Treble Down
    kind: action
    command: TFHTDOWN
    params: []

  # --- Tone: Center (TCT) ---
  - id: tone_center_set
    label: Set Center Tone
    kind: action
    command: TCTBxxTxx
    description: "Center Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: tone_center_bass_up
    label: Center Bass Up
    kind: action
    command: TCTBUP
    params: []

  - id: tone_center_bass_down
    label: Center Bass Down
    kind: action
    command: TCTBDOWN
    params: []

  - id: tone_center_treble_up
    label: Center Treble Up
    kind: action
    command: TCTTUP
    params: []

  - id: tone_center_treble_down
    label: Center Treble Down
    kind: action
    command: TCTTDOWN
    params: []

  # --- Tone: Surround (TSR) ---
  - id: tone_surround_set
    label: Set Surround Tone
    kind: action
    command: TSRBxxTxx
    description: "Surround Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: tone_surround_bass_up
    label: Surround Bass Up
    kind: action
    command: TSRBUP
    params: []

  - id: tone_surround_bass_down
    label: Surround Bass Down
    kind: action
    command: TSRBDOWN
    params: []

  - id: tone_surround_treble_up
    label: Surround Treble Up
    kind: action
    command: TSRTUP
    params: []

  - id: tone_surround_treble_down
    label: Surround Treble Down
    kind: action
    command: TSRTDOWN
    params: []

  # --- Tone: Surround Back (TSB) ---
  - id: tone_surround_back_set
    label: Set Surround Back Tone
    kind: action
    command: TSBBxxTxx
    description: "Surround Back Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: tone_surround_back_bass_up
    label: Surround Back Bass Up
    kind: action
    command: TSBBUP
    params: []

  - id: tone_surround_back_bass_down
    label: Surround Back Bass Down
    kind: action
    command: TSBBDOWN
    params: []

  - id: tone_surround_back_treble_up
    label: Surround Back Treble Up
    kind: action
    command: TSBTUP
    params: []

  - id: tone_surround_back_treble_down
    label: Surround Back Treble Down
    kind: action
    command: TSBTDOWN
    params: []

  # --- Tone: Subwoofer (TSW) ---
  - id: tone_subwoofer_set
    label: Set Subwoofer Tone
    kind: action
    command: TSWBxx
    description: "Subwoofer Bass (-A..00..+A)"
    params:
      - name: bass
        type: string

  - id: tone_subwoofer_bass_up
    label: Subwoofer Bass Up
    kind: action
    command: TSWBUP
    params: []

  - id: tone_subwoofer_bass_down
    label: Subwoofer Bass Down
    kind: action
    command: TSWBDOWN
    params: []

  # --- Speaker Level Calibration (SLC) ---
  - id: speaker_level_test
    label: Speaker Level Test Key
    kind: action
    command: SLCTEST
    description: TEST Key for speaker level calibration
    params: []

  - id: speaker_level_ch_select
    label: Speaker Level CH SEL
    kind: action
    command: SLCCHSEL
    description: CH SEL Key
    params: []

  - id: speaker_level_up
    label: Speaker Level Up
    kind: action
    command: SLCUP
    description: LEVEL + Key
    params: []

  - id: speaker_level_down
    label: Speaker Level Down
    kind: action
    command: SLCDOWN
    description: LEVEL - Key
    params: []

  # --- Subwoofer (temporary) Level (SWL) ---
  - id: subwoofer_level_set
    label: Set Subwoofer Temporary Level
    kind: action
    command: SWLxx
    description: "Subwoofer Level -15dB..0dB..+12dB (-F..00..+C)"
    params:
      - name: level
        type: string
        description: Level value hex (-F..00..+C)

  - id: subwoofer_level_up
    label: Subwoofer Level Up
    kind: action
    command: SWLUP
    description: LEVEL + Key
    params: []

  - id: subwoofer_level_down
    label: Subwoofer Level Down
    kind: action
    command: SWLDOWN
    description: LEVEL - Key
    params: []

  # --- Center (temporary) Level (CTL) ---
  - id: center_level_set
    label: Set Center Temporary Level
    kind: action
    command: CTLxx
    description: "Center Level -12dB..0dB..+12dB (-C..00..+C)"
    params:
      - name: level
        type: string
        description: Level value hex (-C..00..+C)

  - id: center_level_up
    label: Center Level Up
    kind: action
    command: CTLUP
    description: LEVEL + Key
    params: []

  - id: center_level_down
    label: Center Level Down
    kind: action
    command: CTLDOWN
    description: LEVEL - Key
    params: []

  # --- Display Information (DIF - Info variant) ---
  - id: display_program_format
    label: Display Program Format
    kind: action
    command: DIF00
    description: Display Program Format
    params: []

  - id: display_digital_input_pos
    label: Display Digital Input Position
    kind: action
    command: DIF01
    description: Display Digital Input Position
    params: []

  - id: display_digital_format_pos
    label: Display Digital Format Position
    kind: action
    command: DIF02
    description: Display Digital Format Position
    params: []

  - id: display_bass_level
    label: Display Bass Level
    kind: action
    command: DIF03
    description: Display Bass Level
    params: []

  - id: display_treble_level
    label: Display Treble Level
    kind: action
    command: DIF04
    description: Display Treble Level
    params: []

  # --- Display Mode (DIF - Mode variant) ---
  - id: display_mode_selector_volume
    label: Display Mode Selector+Volume
    kind: action
    command: DIF00
    description: Sets Selector + Volume Display Mode
    params: []

  - id: display_mode_selector_listening
    label: Display Mode Selector+Listening
    kind: action
    command: DIF01
    description: Sets Selector + Listening Mode Display Mode
    params: []

  - id: display_video_format_temp
    label: Display Video Format (temporary)
    kind: action
    command: DIF03
    description: Display Video Format (temporary display)
    params: []

  - id: display_mode_toggle
    label: Display Mode Toggle
    kind: action
    command: DIFTG
    description: Sets Display Mode Wrap-Around Up
    params: []

  # --- Sleep ---
  - id: sleep_set
    label: Set Sleep Timer
    kind: action
    command: SLPxx
    description: "Sleep timer 1-90 min in hex (01-5A) or OFF"
    params:
      - name: minutes
        type: integer
        min: 1
        max: 90
        description: Sleep time in minutes (sent as hex), 0 for off

  - id: sleep_off
    label: Sleep Off
    kind: action
    command: SLPOFF
    description: Sets Sleep Time Off
    params: []

  - id: sleep_up
    label: Sleep Timer Up
    kind: action
    command: SLPUP
    description: Sets Sleep Time Wrap-Around Up
    params: []

  # --- Dimmer ---
  - id: dimmer_set
    label: Set Dimmer Level
    kind: action
    command: DIMxx
    description: "Set front panel dimmer"
    params:
      - name: level
        type: enum
        values:
          - "00:Bright"
          - "01:Dim"
          - "02:Dark"
          - "03:Shut-Off"
          - "08:Bright-LED-OFF"
        description: Dimmer level

  - id: dimmer_toggle
    label: Dimmer Toggle
    kind: action
    command: DIMDIM
    description: Sets Dimmer Level Wrap-Around Up
    params: []

  # --- OSD Navigation ---
  - id: osd_menu
    label: OSD Menu
    kind: action
    command: OSDMENU
    description: Menu Key
    params: []

  - id: osd_up
    label: OSD Up
    kind: action
    command: OSDUP
    description: Up Key
    params: []

  - id: osd_down
    label: OSD Down
    kind: action
    command: OSDDOWN
    description: Down Key
    params: []

  - id: osd_right
    label: OSD Right
    kind: action
    command: OSDRIGHT
    description: Right Key
    params: []

  - id: osd_left
    label: OSD Left
    kind: action
    command: OSDLEFT
    description: Left Key
    params: []

  - id: osd_enter
    label: OSD Enter
    kind: action
    command: OSDENTER
    description: Enter Key
    params: []

  - id: osd_exit
    label: OSD Exit
    kind: action
    command: OSDEXIT
    description: Exit Key
    params: []

  - id: osd_audio
    label: OSD Audio Adjust
    kind: action
    command: OSDAUDIO
    description: Audio Adjust Key
    params: []

  - id: osd_video
    label: OSD Video Adjust
    kind: action
    command: OSDVIDEO
    description: Video Adjust Key
    params: []

  # --- Memory Setup (MEM) ---
  - id: memory_store
    label: Memory Store
    kind: action
    command: MEMSTR
    description: Stores memory
    params: []

  - id: memory_recall
    label: Memory Recall
    kind: action
    command: MEMRCL
    description: Recalls memory
    params: []

  - id: memory_lock
    label: Memory Lock
    kind: action
    command: MEMLOCK
    description: Locks memory
    params: []

  - id: memory_unlock
    label: Memory Unlock
    kind: action
    command: MEMUNLK
    description: Unlocks memory
    params: []

  # --- Input Selector ---
  - id: select_input
    label: Select Input
    kind: action
    command: SLIxx
    description: "Select input source by hex code"
    params:
      - name: input
        type: enum
        values:
          - "00:VIDEO1/VCR-DVR"
          - "01:VIDEO2/CBL-SAT"
          - "02:VIDEO3/GAME"
          - "03:VIDEO4/AUX1"
          - "04:VIDEO5/AUX2"
          - "05:VIDEO6"
          - "06:VIDEO7"
          - "10:DVD"
          - "20:TAPE1/TV-TAPE"
          - "21:TAPE2"
          - "22:PHONO"
          - "23:CD"
          - "24:FM"
          - "25:AM"
          - "26:TUNER"
          - "27:MUSIC-SERVER"
          - "28:INTERNET-RADIO"
          - "29:USB-Front"
          - "2A:USB-Rear"
          - "30:MULTI-CH"
          - "31:XM"
          - "32:SIRIUS"
          - "40:UNIVERSAL-PORT"
        description: Input source hex code

  - id: input_up
    label: Input Selector Up
    kind: action
    command: SLIUP
    description: Sets Selector Position Wrap-Around Up
    params: []

  - id: input_down
    label: Input Selector Down
    kind: action
    command: SLIDOWN
    description: Sets Selector Position Wrap-Around Down
    params: []

  # --- RECOUT Selector (SLR) ---
  - id: recout_selector_set
    label: Set RECOUT Selector
    kind: action
    command: SLRxx
    description: "RECOUT selector by hex code (same source codes as SLI plus OFF/7F, SOURCE/80)"
    params:
      - name: source
        type: enum
        values:
          - "00:VIDEO1"
          - "01:VIDEO2"
          - "02:VIDEO3"
          - "03:VIDEO4"
          - "04:VIDEO5"
          - "05:VIDEO6"
          - "06:VIDEO7"
          - "10:DVD"
          - "20:TAPE1"
          - "21:TAPE2"
          - "22:PHONO"
          - "23:CD"
          - "24:FM"
          - "25:AM"
          - "26:TUNER"
          - "27:MUSIC-SERVER"
          - "28:INTERNET-RADIO"
          - "30:MULTI-CH"
          - "31:XM"
          - "7F:OFF"
          - "80:SOURCE"
        description: RECOUT source hex code

  # --- Audio Selector ---
  - id: audio_selector_set
    label: Set Audio Selector
    kind: action
    command: SLAxx
    description: "Select audio input mode"
    params:
      - name: mode
        type: enum
        values:
          - "00:AUTO"
          - "01:MULTI-CHANNEL"
          - "02:ANALOG"
          - "03:iLINK"
          - "04:HDMI"
          - "05:COAX-OPT"
          - "06:BALANCE"
        description: Audio selector mode

  - id: audio_selector_up
    label: Audio Selector Toggle
    kind: action
    command: SLAUP
    description: Sets Audio Selector Wrap-Around Up
    params: []

  # --- 12V Triggers ---
  - id: trigger_a_on
    label: 12V Trigger A On
    kind: action
    command: TGA01
    params: []

  - id: trigger_a_off
    label: 12V Trigger A Off
    kind: action
    command: TGA00
    params: []

  - id: trigger_b_on
    label: 12V Trigger B On
    kind: action
    command: TGB01
    params: []

  - id: trigger_b_off
    label: 12V Trigger B Off
    kind: action
    command: TGB00
    params: []

  - id: trigger_c_on
    label: 12V Trigger C On
    kind: action
    command: TGC01
    params: []

  - id: trigger_c_off
    label: 12V Trigger C Off
    kind: action
    command: TGC00
    params: []

  # --- Video Output Selector (VOS, Japanese Model Only) ---
  - id: video_output_d4
    label: Video Output D4
    kind: action
    command: VOS00
    description: Sets D4 (Japanese model only)
    params: []

  - id: video_output_component
    label: Video Output Component
    kind: action
    command: VOS01
    description: Sets Component (Japanese model only)
    params: []

  # --- HDMI Output ---
  - id: hdmi_output_set
    label: Set HDMI Output
    kind: action
    command: HDOxx
    description: "Select HDMI output routing"
    params:
      - name: output
        type: enum
        values:
          - "00:Analog"
          - "01:Out-Main"
          - "02:Out-Sub"
          - "03:Both"
          - "04:Both-Main"
          - "05:Both-Sub"
        description: HDMI output selector

  - id: hdmi_output_toggle
    label: HDMI Output Toggle
    kind: action
    command: HDOUP
    description: Sets HDMI Out Selector Wrap-Around Up
    params: []

  # --- Monitor Out Resolution ---
  - id: resolution_set
    label: Set Monitor Out Resolution
    kind: action
    command: RESxx
    description: "Set video output resolution"
    params:
      - name: resolution
        type: enum
        values:
          - "00:Through"
          - "01:Auto"
          - "02:480p"
          - "03:720p"
          - "04:1080i"
          - "05:1080p"
          - "06:Source"
          - "07:1080p-24fs"
        description: Monitor out resolution

  - id: resolution_toggle
    label: Resolution Toggle
    kind: action
    command: RESUP
    description: Sets Monitor Out Resolution Wrap-Around Up
    params: []

  # --- ISF Mode ---
  - id: isf_mode_set
    label: Set ISF Mode
    kind: action
    command: ISFxx
    description: "ISF mode selector"
    params:
      - name: mode
        type: enum
        values:
          - "00:Custom"
          - "01:Day"
          - "02:Night"
        description: ISF mode

  - id: isf_mode_toggle
    label: ISF Mode Toggle
    kind: action
    command: ISFUP
    description: Sets ISF Mode State Wrap-Around Up
    params: []

  # --- Listening Mode ---
  - id: listening_mode_set
    label: Set Listening Mode
    kind: action
    command: LMDxx
    description: "Set listening mode by hex code"
    params:
      - name: mode
        type: enum
        values:
          - "00:STEREO"
          - "01:DIRECT"
          - "02:SURROUND"
          - "03:FILM/Game-RPG"
          - "04:THX"
          - "05:ACTION/Game-Action"
          - "06:MUSICAL/Game-Rock"
          - "07:MONO-MOVIE"
          - "08:ORCHESTRA"
          - "09:UNPLUGGED"
          - "0A:STUDIO-MIX"
          - "0B:TV-LOGIC"
          - "0C:ALL-CH-STEREO"
          - "0D:THEATER-DIMENSIONAL"
          - "0E:ENHANCED-7/ENHANCE/Game-Sports"
          - "0F:MONO"
          - "11:PURE-AUDIO"
          - "12:MULTIPLEX"
          - "13:FULL-MONO"
          - "14:DOLBY-VIRTUAL"
          - "15:DTS-Surround-Sensation"
          - "16:Audyssey-DSX"
          - "40:5.1ch-Surround/Straight-Decode"
          - "41:Dolby-EX-DTS-ES"
          - "42:THX-Cinema"
          - "43:THX-Surround-EX"
          - "44:THX-Music"
          - "45:THX-Games"
          - "50:U2/S2-Cinema/Cinema2"
          - "51:U2/S2-Music"
          - "52:U2/S2-Games"
          - "80:PLII/PLIIx-Movie"
          - "81:PLII/PLIIx-Music"
          - "82:Neo6-Cinema"
          - "83:Neo6-Music"
          - "84:PLII/PLIIx-THX-Cinema"
          - "85:Neo6-THX-Cinema"
          - "86:PLII/PLIIx-Game"
          - "87:Neural-Surr"
          - "88:Neural-THX/Neural-Surround"
          - "89:PLII/PLIIx-THX-Games"
          - "8A:Neo6-THX-Games"
          - "8B:PLII/PLIIx-THX-Music"
          - "8C:Neo6-THX-Music"
          - "8D:Neural-THX-Cinema"
          - "8E:Neural-THX-Music"
          - "8F:Neural-THX-Games"
          - "90:PLIIz-Height"
          - "91:Neo6-Cinema-DTS-Surround-Sensation"
          - "92:Neo6-Music-DTS-Surround-Sensation"
          - "93:Neural-Digital-Music"
          - "94:PLIIz-Height+THX-Cinema"
          - "95:PLIIz-Height+THX-Music"
          - "96:PLIIz-Height+THX-Games"
          - "97:PLIIz-Height+THX-U2/S2-Cinema"
          - "98:PLIIz-Height+THX-U2/S2-Music"
          - "99:PLIIz-Height+THX-U2/S2-Games"
          - "A0:PLIIx/PLII-Movie+Audyssey-DSX"
          - "A1:PLIIx/PLII-Music+Audyssey-DSX"
          - "A2:PLIIx/PLII-Game+Audyssey-DSX"
          - "A3:Neo6-Cinema+Audyssey-DSX"
          - "A4:Neo6-Music+Audyssey-DSX"
          - "A5:Neural-Surround+Audyssey-DSX"
          - "A6:Neural-Digital-Music+Audyssey-DSX"
          - "A7:Dolby-EX+Audyssey-DSX"
        description: Listening mode hex code

  - id: listening_mode_up
    label: Listening Mode Up
    kind: action
    command: LMDUP
    description: Sets Listening Mode Wrap-Around Up
    params: []

  - id: listening_mode_down
    label: Listening Mode Down
    kind: action
    command: LMDDOWN
    description: Sets Listening Mode Wrap-Around Down
    params: []

  - id: listening_mode_movie
    label: Listening Mode Movie
    kind: action
    command: LMDMOVIE
    description: Sets Listening Mode Wrap-Around Up (Movie category)
    params: []

  - id: listening_mode_music
    label: Listening Mode Music
    kind: action
    command: LMDMUSIC
    description: Sets Listening Mode Wrap-Around Up (Music category)
    params: []

  - id: listening_mode_game
    label: Listening Mode Game
    kind: action
    command: LMDGAME
    description: Sets Listening Mode Wrap-Around Up (Game category)
    params: []

  # --- Late Night ---
  - id: late_night_set
    label: Set Late Night
    kind: action
    command: LTNxx
    description: "Late night compression mode"
    params:
      - name: level
        type: enum
        values:
          - "00:Off"
          - "01:Low@DolbyDigital,On@DolbyTrueHD"
          - "02:High@DolbyDigital,On@DolbyTrueHD"
          - "03:Auto@DolbyTrueHD"
        description: Late night level

  - id: late_night_up
    label: Late Night Up
    kind: action
    command: LTNUP
    description: Sets Late Night State Wrap-Around Up
    params: []

  # --- Re-EQ / Academy Filter (RAS - first variant) ---
  - id: reeq_academy_set
    label: Set Re-EQ/Academy Filter
    kind: action
    command: RASxx
    description: "Re-EQ/Academy filter state"
    params:
      - name: state
        type: enum
        values:
          - "00:Both-Off"
          - "01:Re-EQ-On"
          - "02:Academy-On"
        description: Re-EQ/Academy filter state

  - id: reeq_academy_toggle
    label: Re-EQ/Academy Toggle
    kind: action
    command: RASUP
    description: Sets Re-EQ/Academy State Wrap-Around Up
    params: []

  # --- Re-EQ (RAS - second variant) ---
  - id: reeq_set
    label: Set Re-EQ
    kind: action
    command: RASxx
    description: "Re-EQ state (Re-EQ-only command variant)"
    params:
      - name: state
        type: enum
        values:
          - "00:Off"
          - "01:On"
        description: Re-EQ state

  - id: reeq_toggle
    label: Re-EQ Toggle
    kind: action
    command: RASUP
    description: Sets Re-EQ State Wrap-Around Up
    params: []

  # --- Cinema Filter (RAS - third variant) ---
  - id: cinema_filter_set
    label: Set Cinema Filter
    kind: action
    command: RASxx
    description: "Cinema filter state"
    params:
      - name: state
        type: enum
        values:
          - "00:Off"
          - "01:On"
        description: Cinema filter state

  - id: cinema_filter_toggle
    label: Cinema Filter Toggle
    kind: action
    command: RASUP
    description: Sets Cinema Filter State Wrap-Around Up
    params: []

  # --- Audyssey ---
  - id: audyssey_eq_set
    label: Set Audyssey EQ
    kind: action
    command: ADYxx
    description: "Audyssey 2EQ/MultEQ/MultEQ XT on/off"
    params:
      - name: state
        type: enum
        values:
          - "00:Off"
          - "01:On"
        description: Audyssey EQ state

  - id: audyssey_eq_toggle
    label: Audyssey EQ Toggle
    kind: action
    command: ADYUP
    description: Sets Audyssey 2EQ/MultEQ/MultEQ XT State Wrap-Around Up
    params: []

  - id: audyssey_dyn_eq_set
    label: Set Audyssey Dynamic EQ
    kind: action
    command: ADQxx
    description: "Audyssey Dynamic EQ on/off"
    params:
      - name: state
        type: enum
        values:
          - "00:Off"
          - "01:On"
        description: Audyssey Dynamic EQ state

  - id: audyssey_dyn_eq_toggle
    label: Audyssey Dynamic EQ Toggle
    kind: action
    command: ADQUP
    description: Sets Audyssey Dynamic EQ State Wrap-Around Up
    params: []

  - id: audyssey_dyn_vol_set
    label: Set Audyssey Dynamic Volume
    kind: action
    command: ADVxx
    description: "Audyssey Dynamic Volume level"
    params:
      - name: level
        type: enum
        values:
          - "00:Off"
          - "01:Light"
          - "02:Medium"
          - "03:Heavy"
        description: Dynamic Volume level

  - id: audyssey_dyn_vol_toggle
    label: Audyssey Dynamic Volume Toggle
    kind: action
    command: ADVUP
    description: Sets Audyssey Dynamic Volume State Wrap-Around Up
    params: []

  # --- Dolby Volume (DVL) ---
  - id: dolby_volume_set
    label: Set Dolby Volume
    kind: action
    command: DVLxx
    description: "Dolby Volume level"
    params:
      - name: level
        type: enum
        values:
          - "00:Off"
          - "01:Low"
          - "02:Mid"
          - "03:High"
        description: Dolby Volume level

  - id: dolby_volume_toggle
    label: Dolby Volume Toggle
    kind: action
    command: DVLUP
    description: Sets Dolby Volume State Wrap-Around Up
    params: []

  # --- Music Optimizer ---
  - id: music_optimizer_set
    label: Set Music Optimizer
    kind: action
    command: MOTxx
    description: "Music Optimizer on/off"
    params:
      - name: state
        type: enum
        values:
          - "00:Off"
          - "01:On"
        description: Music Optimizer state

  - id: music_optimizer_toggle
    label: Music Optimizer Toggle
    kind: action
    command: MOTUP
    description: Sets Music Optimizer State Wrap-Around Up
    params: []

  # --- Tuner ---
  - id: tuner_set_frequency
    label: Set Tuner Frequency
    kind: action
    command: TUNnnnnn
    description: "Set FM/AM frequency directly (FM nnn.nn MHz, AM nnnnn kHz, XM nnnnn ch)"
    params:
      - name: frequency
        type: string
        description: 5-digit frequency string

  - id: tuner_up
    label: Tuner Frequency Up
    kind: action
    command: TUNUP
    description: Sets Tuning Frequency Wrap-Around Up
    params: []

  - id: tuner_down
    label: Tuner Frequency Down
    kind: action
    command: TUNDOWN
    description: Sets Tuning Frequency Wrap-Around Down
    params: []

  # --- Preset ---
  - id: preset_set
    label: Set Preset
    kind: action
    command: PRSxx
    description: "Set preset number 1-40 in hex"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as hex)

  - id: preset_up
    label: Preset Up
    kind: action
    command: PRSUP
    description: Sets Preset No. Wrap-Around Up
    params: []

  - id: preset_down
    label: Preset Down
    kind: action
    command: PRSDOWN
    description: Sets Preset No. Wrap-Around Down
    params: []

  # --- Preset Memory (PRM) ---
  - id: preset_memory
    label: Preset Memory
    kind: action
    command: PRMxx
    description: "Store current station into preset 1-40 (hex)"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as hex)

  # --- RDS (RDS Model Only) ---
  - id: rds_display_rt
    label: RDS Display RT Info
    kind: action
    command: RDS00
    description: Display RT Information (RDS model only)
    params: []

  - id: rds_display_pty
    label: RDS Display PTY Info
    kind: action
    command: RDS01
    description: Display PTY Information (RDS model only)
    params: []

  - id: rds_display_tp
    label: RDS Display TP Info
    kind: action
    command: RDS02
    description: Display TP Information (RDS model only)
    params: []

  - id: rds_display_up
    label: RDS Display Toggle
    kind: action
    command: RDSUP
    description: Display RDS Information Wrap-Around Change
    params: []

  # --- PTY Scan (PTS, RDS Model Only) ---
  - id: pty_scan_set
    label: PTY Scan Set
    kind: action
    command: PTSxx
    description: "Sets PTY No. 0-30 (hex 00-1E)"
    params:
      - name: pty
        type: integer
        min: 0
        max: 30
        description: PTY number (sent as hex)

  - id: pty_scan_finish
    label: PTY Scan Finish
    kind: action
    command: PTSENTER
    description: Finish PTY Scan
    params: []

  # --- TP Scan (TPS, RDS Model Only) ---
  - id: tp_scan_start
    label: TP Scan Start
    kind: action
    command: TPS
    description: Start TP Scan (no parameter)
    params: []

  - id: tp_scan_finish
    label: TP Scan Finish
    kind: action
    command: TPSENTER
    description: Finish TP Scan
    params: []

  # --- XM (XM Model Only) ---
  - id: xm_channel_set
    label: XM Channel Number
    kind: action
    command: XCHnnn
    description: "XM Channel Number 000-255 (XM model only)"
    params:
      - name: channel
        type: integer
        min: 0
        max: 255
        description: XM channel number (3 digits)

  - id: xm_channel_up
    label: XM Channel Up
    kind: action
    command: XCHUP
    description: Sets XM Channel Wrap-Around Up (XM model only)
    params: []

  - id: xm_channel_down
    label: XM Channel Down
    kind: action
    command: XCHDOWN
    description: Sets XM Channel Wrap-Around Down (XM model only)
    params: []

  - id: xm_category_up
    label: XM Category Up
    kind: action
    command: XCTUP
    description: Sets XM Category Wrap-Around Up (XM model only)
    params: []

  - id: xm_category_down
    label: XM Category Down
    kind: action
    command: XCTDOWN
    description: Sets XM Category Wrap-Around Down (XM model only)
    params: []

  # --- SIRIUS (SIRIUS Model Only) ---
  - id: sirius_channel_set
    label: SIRIUS Channel Number
    kind: action
    command: SCHnnn
    description: "SIRIUS Channel Number 000-255 (SIRIUS model only)"
    params:
      - name: channel
        type: integer
        min: 0
        max: 255
        description: SIRIUS channel number (3 digits)

  - id: sirius_channel_up
    label: SIRIUS Channel Up
    kind: action
    command: SCHUP
    description: Sets SIRIUS Channel Wrap-Around Up (SIRIUS model only)
    params: []

  - id: sirius_channel_down
    label: SIRIUS Channel Down
    kind: action
    command: SCHDOWN
    description: Sets SIRIUS Channel Wrap-Around Down (SIRIUS model only)
    params: []

  - id: sirius_category_up
    label: SIRIUS Category Up
    kind: action
    command: SCTUP
    description: Sets SIRIUS Category Wrap-Around Up (SIRIUS model only)
    params: []

  - id: sirius_category_down
    label: SIRIUS Category Down
    kind: action
    command: SCTDOWN
    description: Sets SIRIUS Category Wrap-Around Down (SIRIUS model only)
    params: []

  - id: sirius_parental_lock
    label: SIRIUS Parental Lock Password
    kind: action
    command: SLKnnnn
    description: "SIRIUS Lock Password (4 digits) (SIRIUS model only)"
    params:
      - name: password
        type: string
        description: 4-digit lock password

  # --- HD Radio (HD Radio Model Only) ---
  - id: hdradio_channel_program_set
    label: HD Radio Channel Program
    kind: action
    command: HPRxx
    description: "Sets directly HD Radio Channel Program 01-08 (HD Radio model only)"
    params:
      - name: program
        type: integer
        min: 1
        max: 8
        description: HD Radio channel program (sent as hex)

  - id: hdradio_blend_auto
    label: HD Radio Blend Auto
    kind: action
    command: HBL00
    description: Sets HD Radio Blend Mode Auto (HD Radio model only)
    params: []

  - id: hdradio_blend_analog
    label: HD Radio Blend Analog
    kind: action
    command: HBL01
    description: Sets HD Radio Blend Mode Analog (HD Radio model only)
    params: []

  # --- Network/USB Playback (NTC) ---
  - id: net_play
    label: Net/USB Play
    kind: action
    command: NTCPLAY
    description: PLAY Key for Network/USB
    params: []

  - id: net_stop
    label: Net/USB Stop
    kind: action
    command: NTCSTOP
    description: STOP Key for Network/USB
    params: []

  - id: net_pause
    label: Net/USB Pause
    kind: action
    command: NTCPAUSE
    description: PAUSE Key for Network/USB
    params: []

  - id: net_track_up
    label: Net/USB Track Up
    kind: action
    command: NTCTRUP
    description: TRACK UP Key
    params: []

  - id: net_track_down
    label: Net/USB Track Down
    kind: action
    command: NTCTRDN
    description: TRACK DOWN Key
    params: []

  - id: net_ff
    label: Net/USB FF
    kind: action
    command: NTCFF
    description: FF Key (continuous)
    params: []

  - id: net_rew
    label: Net/USB REW
    kind: action
    command: NTCREW
    description: REW Key (continuous)
    params: []

  - id: net_repeat
    label: Net/USB Repeat
    kind: action
    command: NTCREPEAT
    description: REPEAT Key
    params: []

  - id: net_random
    label: Net/USB Random
    kind: action
    command: NTCRANDOM
    description: RANDOM Key
    params: []

  - id: net_display
    label: Net/USB Display
    kind: action
    command: NTCDISPLAY
    description: DISPLAY Key
    params: []

  - id: net_album_key
    label: Net/USB Album Key
    kind: action
    command: NTCALBUM
    description: ALBUM Key
    params: []

  - id: net_artist_key
    label: Net/USB Artist Key
    kind: action
    command: NTCARTIST
    description: ARTIST Key
    params: []

  - id: net_genre
    label: Net/USB Genre Key
    kind: action
    command: NTCGENRE
    description: GENRE Key
    params: []

  - id: net_playlist
    label: Net/USB Playlist Key
    kind: action
    command: NTCPLAYLIST
    description: PLAYLIST Key
    params: []

  - id: net_right
    label: Net/USB Right
    kind: action
    command: NTCRIGHT
    description: RIGHT Key
    params: []

  - id: net_left
    label: Net/USB Left
    kind: action
    command: NTCLEFT
    description: LEFT Key
    params: []

  - id: net_up
    label: Net/USB Up
    kind: action
    command: NTCUP
    description: UP Key
    params: []

  - id: net_down
    label: Net/USB Down
    kind: action
    command: NTCDOWN
    description: DOWN Key
    params: []

  - id: net_select
    label: Net/USB Select
    kind: action
    command: NTCSELECT
    description: SELECT Key
    params: []

  - id: net_digit_0
    label: Net/USB 0 Key
    kind: action
    command: NTC0
    params: []

  - id: net_digit_1
    label: Net/USB 1 Key
    kind: action
    command: NTC1
    params: []

  - id: net_digit_2
    label: Net/USB 2 Key
    kind: action
    command: NTC2
    params: []

  - id: net_digit_3
    label: Net/USB 3 Key
    kind: action
    command: NTC3
    params: []

  - id: net_digit_4
    label: Net/USB 4 Key
    kind: action
    command: NTC4
    params: []

  - id: net_digit_5
    label: Net/USB 5 Key
    kind: action
    command: NTC5
    params: []

  - id: net_digit_6
    label: Net/USB 6 Key
    kind: action
    command: NTC6
    params: []

  - id: net_digit_7
    label: Net/USB 7 Key
    kind: action
    command: NTC7
    params: []

  - id: net_digit_8
    label: Net/USB 8 Key
    kind: action
    command: NTC8
    params: []

  - id: net_digit_9
    label: Net/USB 9 Key
    kind: action
    command: NTC9
    params: []

  - id: net_delete
    label: Net/USB Delete
    kind: action
    command: NTCDELETE
    description: DELETE Key
    params: []

  - id: net_caps
    label: Net/USB Caps
    kind: action
    command: NTCCAPS
    description: CAPS Key
    params: []

  - id: net_location
    label: Net/USB Location
    kind: action
    command: NTCLOCATION
    description: LOCATION Key
    params: []

  - id: net_language
    label: Net/USB Language
    kind: action
    command: NTCLANGUAGE
    description: LANGUAGE Key
    params: []

  - id: net_setup
    label: Net/USB Setup
    kind: action
    command: NTCSETUP
    description: SETUP Key
    params: []

  - id: net_return
    label: Net/USB Return
    kind: action
    command: NTCRETURN
    description: RETURN Key
    params: []

  - id: net_ch_up
    label: Net/USB Channel Up
    kind: action
    command: NTCCHUP
    description: CH UP (for iRadio)
    params: []

  - id: net_ch_down
    label: Net/USB Channel Down
    kind: action
    command: NTCCHDN
    description: CH DOWN (for iRadio)
    params: []

  # --- Internet Radio Preset (NPR) ---
  - id: internet_radio_preset
    label: Internet Radio Preset
    kind: action
    command: NPRxx
    description: "Internet Radio Preset 1-40 (hex)"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40
        description: Preset number (sent as hex)

  # ===========================================================
  # ZONE 2
  # ===========================================================
  # --- Zone 2 Power ---
  - id: zone2_power_on
    label: Zone 2 Power On
    kind: action
    command: ZPW01
    description: Sets Zone2 On
    params: []

  - id: zone2_power_off
    label: Zone 2 Standby
    kind: action
    command: ZPW00
    description: Sets Zone2 Standby
    params: []

  # --- Zone 2 Muting ---
  - id: zone2_mute_on
    label: Zone 2 Mute On
    kind: action
    command: ZMT01
    params: []

  - id: zone2_mute_off
    label: Zone 2 Mute Off
    kind: action
    command: ZMT00
    params: []

  - id: zone2_mute_toggle
    label: Zone 2 Mute Toggle
    kind: action
    command: ZMTTG
    description: Sets Zone2 Muting Wrap-Around
    params: []

  # --- Zone 2 Volume ---
  - id: zone2_volume_set
    label: Zone 2 Set Volume
    kind: action
    command: ZVLxx
    description: "Zone2 Volume Level 0-100 in hex"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Volume level (sent as 2-digit hex)

  - id: zone2_volume_up
    label: Zone 2 Volume Up
    kind: action
    command: ZVLUP
    description: Sets Zone2 Volume Level Up
    params: []

  - id: zone2_volume_down
    label: Zone 2 Volume Down
    kind: action
    command: ZVLDOWN
    description: Sets Zone2 Volume Level Down
    params: []

  # --- Zone 2 Tone (ZTN) ---
  - id: zone2_tone_set
    label: Zone 2 Tone Set
    kind: action
    command: ZTNBxxTxx
    description: "Zone2 Bass+Treble (-A..00..+A). Only works when main is ON and Zone2 powered/variable."
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: zone2_bass_up
    label: Zone 2 Bass Up
    kind: action
    command: ZTNBUP
    description: Sets Zone2 Bass Up (2 step)
    params: []

  - id: zone2_bass_down
    label: Zone 2 Bass Down
    kind: action
    command: ZTNBDOWN
    description: Sets Zone2 Bass Down (2 step)
    params: []

  - id: zone2_treble_up
    label: Zone 2 Treble Up
    kind: action
    command: ZTNTUP
    description: Sets Zone2 Treble Up (2 step)
    params: []

  - id: zone2_treble_down
    label: Zone 2 Treble Down
    kind: action
    command: ZTNTDOWN
    description: Sets Zone2 Treble Down (2 step)
    params: []

  # --- Zone 2 Balance (ZBL) ---
  - id: zone2_balance_set
    label: Zone 2 Balance Set
    kind: action
    command: ZBLxx
    description: "Zone2 Balance (-A..00..+A)"
    params:
      - name: balance
        type: string

  - id: zone2_balance_up
    label: Zone 2 Balance Up
    kind: action
    command: ZBLUP
    description: Sets Zone2 Balance Up (to R, 2 step)
    params: []

  - id: zone2_balance_down
    label: Zone 2 Balance Down
    kind: action
    command: ZBLDOWN
    description: Sets Zone2 Balance Down (to L, 2 step)
    params: []

  # --- Zone 2 Selector ---
  - id: zone2_select_input
    label: Zone 2 Select Input
    kind: action
    command: SLZxx
    description: "Zone2 input selector (same codes as SLI plus SOURCE/80)"
    params:
      - name: input
        type: enum
        values:
          - "00:VIDEO1/VCR-DVR"
          - "01:VIDEO2/CBL-SAT"
          - "02:VIDEO3/GAME"
          - "03:VIDEO4/AUX1"
          - "04:VIDEO5/AUX2"
          - "05:VIDEO6"
          - "06:VIDEO7"
          - "10:DVD"
          - "20:TAPE1/TV-TAPE"
          - "21:TAPE2"
          - "22:PHONO"
          - "23:CD"
          - "24:FM"
          - "25:AM"
          - "26:TUNER"
          - "27:MUSIC-SERVER"
          - "28:INTERNET-RADIO"
          - "29:USB-Front"
          - "2A:USB-Rear"
          - "30:MULTI-CH"
          - "31:XM"
          - "32:SIRIUS"
          - "40:UNIVERSAL-PORT"
          - "80:SOURCE"
        description: Zone2 input source hex code

  # --- Zone 2 Tuning (TUZ) ---
  - id: zone2_tuner_set_frequency
    label: Zone 2 Set Tuner Frequency
    kind: action
    command: TUZnnnnn
    description: "Zone2 direct tuning (FM nnn.nn MHz / AM nnnnn kHz). TUNER shared with MAIN."
    params:
      - name: frequency
        type: string

  - id: zone2_tuner_up
    label: Zone 2 Tuner Up
    kind: action
    command: TUZUP
    params: []

  - id: zone2_tuner_down
    label: Zone 2 Tuner Down
    kind: action
    command: TUZDOWN
    params: []

  # --- Zone 2 Preset (PRZ) ---
  - id: zone2_preset_set
    label: Zone 2 Set Preset
    kind: action
    command: PRZxx
    description: "Zone2 preset 1-40 (hex). Control separated from MAIN."
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  - id: zone2_preset_up
    label: Zone 2 Preset Up
    kind: action
    command: PRZUP
    params: []

  - id: zone2_preset_down
    label: Zone 2 Preset Down
    kind: action
    command: PRZDOWN
    params: []

  # --- Zone 2 Net-Tune/Network (NTZ) ---
  - id: zone2_net_play
    label: Zone 2 Net Play
    kind: action
    command: NTZPLAY
    params: []

  - id: zone2_net_stop
    label: Zone 2 Net Stop
    kind: action
    command: NTZSTOP
    params: []

  - id: zone2_net_pause
    label: Zone 2 Net Pause
    kind: action
    command: NTZPAUSE
    params: []

  - id: zone2_net_track_up
    label: Zone 2 Net Track Up
    kind: action
    command: NTZTRUP
    params: []

  - id: zone2_net_track_down
    label: Zone 2 Net Track Down
    kind: action
    command: NTZTRDN
    params: []

  - id: zone2_net_ch_up
    label: Zone 2 Net CH Up
    kind: action
    command: NTZCHUP
    description: CH UP (for iRadio)
    params: []

  - id: zone2_net_ch_down
    label: Zone 2 Net CH Down
    kind: action
    command: NTZCHDN
    description: CH DOWN (for iRadio)
    params: []

  # --- Zone 2 Internet Radio Preset (NPZ) ---
  - id: zone2_internet_radio_preset
    label: Zone 2 Internet Radio Preset
    kind: action
    command: NPZxx
    description: "Zone2 Internet Radio Preset 1-40 (hex)"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  # --- Zone 2 Listening Mode (LMZ) ---
  - id: zone2_listening_mode_set
    label: Zone 2 Set Listening Mode
    kind: action
    command: LMZxx
    description: "Zone2 listening mode"
    params:
      - name: mode
        type: enum
        values:
          - "00:STEREO"
          - "01:DIRECT"
          - "0F:MONO"
          - "12:MULTIPLEX"
          - "87:DVS(PL2)"
          - "88:DVS(NEO6)"

  # --- Zone 2 Late Night (LTZ) ---
  - id: zone2_late_night_set
    label: Zone 2 Set Late Night
    kind: action
    command: LTZxx
    description: "Zone2 late night level"
    params:
      - name: level
        type: enum
        values:
          - "00:Off"
          - "01:Low"
          - "02:High"

  - id: zone2_late_night_up
    label: Zone 2 Late Night Up
    kind: action
    command: LTZUP
    description: Sets Zone2 Late Night State Wrap-Around Up
    params: []

  # --- Zone 2 Re-EQ/Academy (RAZ) ---
  - id: zone2_reeq_academy_set
    label: Zone 2 Set Re-EQ/Academy
    kind: action
    command: RAZxx
    description: "Zone2 Re-EQ/Academy filter state"
    params:
      - name: state
        type: enum
        values:
          - "00:Both-Off"
          - "01:Re-EQ-On"
          - "02:Academy-On"

  - id: zone2_reeq_academy_toggle
    label: Zone 2 Re-EQ/Academy Toggle
    kind: action
    command: RAZUP
    description: Sets Zone2 Re-EQ/Academy State Wrap-Around Up
    params: []

  # ===========================================================
  # ZONE 3
  # ===========================================================
  # --- Zone 3 Power ---
  - id: zone3_power_on
    label: Zone 3 Power On
    kind: action
    command: PW301
    description: Sets Zone3 On
    params: []

  - id: zone3_power_off
    label: Zone 3 Standby
    kind: action
    command: PW300
    description: Sets Zone3 Standby
    params: []

  # --- Zone 3 Muting (MT3) ---
  - id: zone3_mute_on
    label: Zone 3 Mute On
    kind: action
    command: MT301
    params: []

  - id: zone3_mute_off
    label: Zone 3 Mute Off
    kind: action
    command: MT300
    params: []

  - id: zone3_mute_toggle
    label: Zone 3 Mute Toggle
    kind: action
    command: MT3TG
    description: Sets Zone3 Muting Wrap-Around
    params: []

  # --- Zone 3 Volume ---
  - id: zone3_volume_set
    label: Zone 3 Set Volume
    kind: action
    command: VL3xx
    description: "Zone3 Volume Level 0-100 in hex"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: zone3_volume_up
    label: Zone 3 Volume Up
    kind: action
    command: VL3UP
    description: Sets Zone3 Volume Level Up
    params: []

  - id: zone3_volume_down
    label: Zone 3 Volume Down
    kind: action
    command: VL3DOWN
    description: Sets Zone3 Volume Level Down
    params: []

  # --- Zone 3 Tone (TN3) ---
  - id: zone3_tone_set
    label: Zone 3 Tone Set
    kind: action
    command: TN3BxxTxx
    description: "Zone3 Bass+Treble (-A..00..+A)"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: zone3_bass_up
    label: Zone 3 Bass Up
    kind: action
    command: TN3BUP
    params: []

  - id: zone3_bass_down
    label: Zone 3 Bass Down
    kind: action
    command: TN3BDOWN
    params: []

  - id: zone3_treble_up
    label: Zone 3 Treble Up
    kind: action
    command: TN3TUP
    params: []

  - id: zone3_treble_down
    label: Zone 3 Treble Down
    kind: action
    command: TN3TDOWN
    params: []

  # --- Zone 3 Balance (BL3) ---
  - id: zone3_balance_set
    label: Zone 3 Balance Set
    kind: action
    command: BL3xx
    description: "Zone3 Balance (-A..00..+A)"
    params:
      - name: balance
        type: string

  - id: zone3_balance_up
    label: Zone 3 Balance Up
    kind: action
    command: BL3UP
    description: Sets Zone3 Balance Up (to R, 2 step)
    params: []

  - id: zone3_balance_down
    label: Zone 3 Balance Down
    kind: action
    command: BL3DOWN
    description: Sets Zone3 Balance Down (to L, 2 step)
    params: []

  # --- Zone 3 Selector ---
  - id: zone3_select_input
    label: Zone 3 Select Input
    kind: action
    command: SL3xx
    description: "Zone3 input selector (same codes as SLI plus SOURCE/80)"
    params:
      - name: input
        type: enum
        values:
          - "00:VIDEO1/VCR-DVR"
          - "01:VIDEO2/CBL-SAT"
          - "02:VIDEO3/GAME"
          - "03:VIDEO4/AUX1"
          - "04:VIDEO5/AUX2"
          - "05:VIDEO6"
          - "06:VIDEO7"
          - "10:DVD"
          - "20:TAPE1/TV-TAPE"
          - "21:TAPE2"
          - "22:PHONO"
          - "23:CD"
          - "24:FM"
          - "25:AM"
          - "26:TUNER"
          - "27:MUSIC-SERVER"
          - "28:INTERNET-RADIO"
          - "29:USB-Front"
          - "2A:USB-Rear"
          - "30:MULTI-CH"
          - "31:XM"
          - "32:SIRIUS"
          - "40:UNIVERSAL-PORT"
          - "80:SOURCE"
        description: Zone3 input source hex code

  # --- Zone 3 Tuning (TU3) ---
  - id: zone3_tuner_set_frequency
    label: Zone 3 Set Tuner Frequency
    kind: action
    command: TU3nnnnn
    description: "Zone3 direct tuning (FM nnn.nn MHz / AM nnnnn kHz). Control separated from MAIN."
    params:
      - name: frequency
        type: string

  - id: zone3_tuner_up
    label: Zone 3 Tuner Up
    kind: action
    command: TU3UP
    params: []

  - id: zone3_tuner_down
    label: Zone 3 Tuner Down
    kind: action
    command: TU3DOWN
    params: []

  # --- Zone 3 Preset (PR3) ---
  - id: zone3_preset_set
    label: Zone 3 Set Preset
    kind: action
    command: PR3xx
    description: "Zone3 preset 1-40 (hex). Control separated from MAIN."
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  - id: zone3_preset_up
    label: Zone 3 Preset Up
    kind: action
    command: PR3UP
    params: []

  - id: zone3_preset_down
    label: Zone 3 Preset Down
    kind: action
    command: PR3DOWN
    params: []

  # --- Zone 3 Net-Tune/Network (NT3) ---
  - id: zone3_net_play
    label: Zone 3 Net Play
    kind: action
    command: NT3PLAY
    params: []

  - id: zone3_net_stop
    label: Zone 3 Net Stop
    kind: action
    command: NT3STOP
    params: []

  - id: zone3_net_pause
    label: Zone 3 Net Pause
    kind: action
    command: NT3PAUSE
    params: []

  - id: zone3_net_track_up
    label: Zone 3 Net Track Up
    kind: action
    command: NT3TRUP
    params: []

  - id: zone3_net_track_down
    label: Zone 3 Net Track Down
    kind: action
    command: NT3TRDN
    params: []

  # --- Zone 3 Internet Radio Preset (NP3) ---
  - id: zone3_internet_radio_preset
    label: Zone 3 Internet Radio Preset
    kind: action
    command: NP3xx
    description: "Zone3 Internet Radio Preset 1-40 (hex)"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  # ===========================================================
  # ZONE 4
  # ===========================================================
  # --- Zone 4 Power ---
  - id: zone4_power_on
    label: Zone 4 Power On
    kind: action
    command: PW401
    description: Sets Zone4 On
    params: []

  - id: zone4_power_off
    label: Zone 4 Standby
    kind: action
    command: PW400
    description: Sets Zone4 Standby
    params: []

  # --- Zone 4 Muting (MT4) ---
  - id: zone4_mute_on
    label: Zone 4 Mute On
    kind: action
    command: MT401
    params: []

  - id: zone4_mute_off
    label: Zone 4 Mute Off
    kind: action
    command: MT400
    params: []

  - id: zone4_mute_toggle
    label: Zone 4 Mute Toggle
    kind: action
    command: MT4TG
    description: Sets Zone4 Muting Wrap-Around
    params: []

  # --- Zone 4 Volume ---
  - id: zone4_volume_set
    label: Zone 4 Set Volume
    kind: action
    command: VL4xx
    description: "Zone4 Volume Level 0-100 in hex"
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: zone4_volume_up
    label: Zone 4 Volume Up
    kind: action
    command: VL4UP
    description: Sets Zone4 Volume Level Up
    params: []

  - id: zone4_volume_down
    label: Zone 4 Volume Down
    kind: action
    command: VL4DOWN
    description: Sets Zone4 Volume Level Down
    params: []

  # --- Zone 4 Selector ---
  - id: zone4_select_input
    label: Zone 4 Select Input
    kind: action
    command: SL4xx
    description: "Zone4 input selector (same codes as SLI plus SOURCE/80)"
    params:
      - name: input
        type: enum
        values:
          - "00:VIDEO1/VCR-DVR"
          - "01:VIDEO2/CBL-SAT"
          - "02:VIDEO3/GAME"
          - "03:VIDEO4/AUX1"
          - "04:VIDEO5/AUX2"
          - "05:VIDEO6"
          - "06:VIDEO7"
          - "10:DVD"
          - "20:TAPE1/TV-TAPE"
          - "21:TAPE2"
          - "22:PHONO"
          - "23:CD"
          - "24:FM"
          - "25:AM"
          - "26:TUNER"
          - "27:MUSIC-SERVER"
          - "28:INTERNET-RADIO"
          - "29:USB-Front"
          - "2A:USB-Rear"
          - "30:MULTI-CH"
          - "31:XM"
          - "32:SIRIUS"
          - "40:UNIVERSAL-PORT"
          - "80:SOURCE"
        description: Zone4 input source hex code

  # --- Zone 4 Tuning (TU4) ---
  - id: zone4_tuner_set_frequency
    label: Zone 4 Set Tuner Frequency
    kind: action
    command: TU4nnnnn
    description: "Zone4 direct tuning (FM nnn.nn MHz / AM nnnnn kHz). Control separated from MAIN."
    params:
      - name: frequency
        type: string

  - id: zone4_tuner_up
    label: Zone 4 Tuner Up
    kind: action
    command: TU4UP
    params: []

  - id: zone4_tuner_down
    label: Zone 4 Tuner Down
    kind: action
    command: TU4DOWN
    params: []

  # --- Zone 4 Preset (PR4) ---
  - id: zone4_preset_set
    label: Zone 4 Set Preset
    kind: action
    command: PR4xx
    description: "Zone4 preset 1-40 (hex). Control separated from MAIN."
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  - id: zone4_preset_up
    label: Zone 4 Preset Up
    kind: action
    command: PR4UP
    params: []

  - id: zone4_preset_down
    label: Zone 4 Preset Down
    kind: action
    command: PR4DOWN
    params: []

  # --- Zone 4 Net-Tune/Network (NT4) ---
  - id: zone4_net_play
    label: Zone 4 Net Play
    kind: action
    command: NT4PLAY
    params: []

  - id: zone4_net_stop
    label: Zone 4 Net Stop
    kind: action
    command: NT4STOP
    params: []

  - id: zone4_net_pause
    label: Zone 4 Net Pause
    kind: action
    command: NT4PAUSE
    params: []

  - id: zone4_net_track_up
    label: Zone 4 Net Track Up
    kind: action
    command: NT4TRUP
    params: []

  - id: zone4_net_track_down
    label: Zone 4 Net Track Down
    kind: action
    command: NT4TRDN
    params: []

  # --- Zone 4 Internet Radio Preset (NP4) ---
  - id: zone4_internet_radio_preset
    label: Zone 4 Internet Radio Preset
    kind: action
    command: NP4xx
    description: "Zone4 Internet Radio Preset 1-40 (hex)"
    params:
      - name: preset
        type: integer
        min: 1
        max: 40

  # ===========================================================
  # ONKYO RI SYSTEM (passthrough commands to external devices)
  # ===========================================================
  # --- CD Player (CCD) ---
  - id: ri_cd_track
    label: RI CD Track+
    kind: action
    command: CCDTRACK
    description: RI CD Player TRACK+
    params: []

  - id: ri_cd_play
    label: RI CD Play
    kind: action
    command: CCDPLAY
    description: RI CD Player PLAY
    params: []

  - id: ri_cd_stop
    label: RI CD Stop
    kind: action
    command: CCDSTOP
    description: RI CD Player STOP
    params: []

  - id: ri_cd_pause
    label: RI CD Pause
    kind: action
    command: CCDPAUSE
    description: RI CD Player PAUSE
    params: []

  - id: ri_cd_skip_f
    label: RI CD Skip Forward
    kind: action
    command: CCDSKIP.F
    description: RI CD Player SKIP >>
    params: []

  - id: ri_cd_skip_r
    label: RI CD Skip Reverse
    kind: action
    command: CCDSKIP.R
    description: RI CD Player SKIP <<
    params: []

  - id: ri_cd_memory
    label: RI CD Memory
    kind: action
    command: CCDMEMORY
    params: []

  - id: ri_cd_clear
    label: RI CD Clear
    kind: action
    command: CCDCLEAR
    params: []

  - id: ri_cd_repeat
    label: RI CD Repeat
    kind: action
    command: CCDREPEAT
    params: []

  - id: ri_cd_random
    label: RI CD Random
    kind: action
    command: CCDRANDOM
    params: []

  - id: ri_cd_display
    label: RI CD Display
    kind: action
    command: CCDDISP
    params: []

  - id: ri_cd_dmode
    label: RI CD D.Mode
    kind: action
    command: CCDD.MODE
    params: []

  - id: ri_cd_ff
    label: RI CD FF
    kind: action
    command: CCDFF
    params: []

  - id: ri_cd_rew
    label: RI CD REW
    kind: action
    command: CCDREW
    params: []

  - id: ri_cd_opcl
    label: RI CD Open/Close
    kind: action
    command: CCDOP/CL
    params: []

  - id: ri_cd_disc_f
    label: RI CD Disc+
    kind: action
    command: CCDDISC.F
    params: []

  - id: ri_cd_disc_r
    label: RI CD Disc-
    kind: action
    command: CCDDISC.R
    params: []

  - id: ri_cd_standby
    label: RI CD Standby
    kind: action
    command: CCDSTBY
    params: []

  - id: ri_cd_power_on
    label: RI CD Power On
    kind: action
    command: CCDPON
    params: []

  # --- TAPE1 (CT1) ---
  - id: ri_tape1_play_f
    label: RI Tape1 Play Forward
    kind: action
    command: CT1PLAY.F
    params: []

  - id: ri_tape1_play_r
    label: RI Tape1 Play Reverse
    kind: action
    command: CT1PLAY.R
    params: []

  - id: ri_tape1_stop
    label: RI Tape1 Stop
    kind: action
    command: CT1STOP
    params: []

  - id: ri_tape1_rec_pause
    label: RI Tape1 Rec/Pause
    kind: action
    command: CT1RC/PAU
    params: []

  - id: ri_tape1_ff
    label: RI Tape1 FF
    kind: action
    command: CT1FF
    params: []

  - id: ri_tape1_rew
    label: RI Tape1 REW
    kind: action
    command: CT1REW
    params: []

  # --- TAPE2 (CT2) ---
  - id: ri_tape2_play_f
    label: RI Tape2 Play Forward
    kind: action
    command: CT2PLAY.F
    params: []

  - id: ri_tape2_play_r
    label: RI Tape2 Play Reverse
    kind: action
    command: CT2PLAY.R
    params: []

  - id: ri_tape2_stop
    label: RI Tape2 Stop
    kind: action
    command: CT2STOP
    params: []

  - id: ri_tape2_rec_pause
    label: RI Tape2 Rec/Pause
    kind: action
    command: CT2RC/PAU
    params: []

  - id: ri_tape2_ff
    label: RI Tape2 FF
    kind: action
    command: CT2FF
    params: []

  - id: ri_tape2_rew
    label: RI Tape2 REW
    kind: action
    command: CT2REW
    params: []

  - id: ri_tape2_opcl
    label: RI Tape2 Open/Close
    kind: action
    command: CT2OP/CL
    params: []

  - id: ri_tape2_skip_f
    label: RI Tape2 Skip Forward
    kind: action
    command: CT2SKIP.F
    params: []

  - id: ri_tape2_skip_r
    label: RI Tape2 Skip Reverse
    kind: action
    command: CT2SKIP.R
    params: []

  - id: ri_tape2_rec
    label: RI Tape2 Rec
    kind: action
    command: CT2REC
    params: []

  # --- Graphics Equalizer (CEQ) ---
  - id: ri_geq_preset
    label: RI Graphics EQ Preset
    kind: action
    command: CEQPRESET
    params: []

  # --- DAT Recorder (CDT) ---
  - id: ri_dat_play
    label: RI DAT Play
    kind: action
    command: CDTPLAY
    params: []

  - id: ri_dat_rec_pause
    label: RI DAT Rec/Pause
    kind: action
    command: CDTRC/PAU
    params: []

  - id: ri_dat_stop
    label: RI DAT Stop
    kind: action
    command: CDTSTOP
    params: []

  - id: ri_dat_skip_f
    label: RI DAT Skip Forward
    kind: action
    command: CDTSKIP.F
    params: []

  - id: ri_dat_skip_r
    label: RI DAT Skip Reverse
    kind: action
    command: CDTSKIP.R
    params: []

  - id: ri_dat_ff
    label: RI DAT FF
    kind: action
    command: CDTFF
    params: []

  - id: ri_dat_rew
    label: RI DAT REW
    kind: action
    command: CDTREW
    params: []

  # --- DVD Player (CDV) ---
  - id: ri_dvd_power_on
    label: RI DVD Power On
    kind: action
    command: CDVPWRON
    params: []

  - id: ri_dvd_power_off
    label: RI DVD Power Off
    kind: action
    command: CDVPWROFF
    params: []

  - id: ri_dvd_play
    label: RI DVD Play
    kind: action
    command: CDVPLAY
    params: []

  - id: ri_dvd_stop
    label: RI DVD Stop
    kind: action
    command: CDVSTOP
    params: []

  - id: ri_dvd_skip_f
    label: RI DVD Skip Forward
    kind: action
    command: CDVSKIP.F
    params: []

  - id: ri_dvd_skip_r
    label: RI DVD Skip Reverse
    kind: action
    command: CDVSKIP.R
    params: []

  - id: ri_dvd_ff
    label: RI DVD FF
    kind: action
    command: CDVFF
    params: []

  - id: ri_dvd_rew
    label: RI DVD REW
    kind: action
    command: CDVREW
    params: []

  - id: ri_dvd_pause
    label: RI DVD Pause
    kind: action
    command: CDVPAUSE
    params: []

  - id: ri_dvd_last_play
    label: RI DVD Last Play
    kind: action
    command: CDVLASTPLAY
    params: []

  - id: ri_dvd_subtitle_toggle
    label: RI DVD Subtitle On/Off
    kind: action
    command: CDVSUBTON/OFF
    params: []

  - id: ri_dvd_subtitle
    label: RI DVD Subtitle
    kind: action
    command: CDVSUBTITLE
    params: []

  - id: ri_dvd_setup
    label: RI DVD Setup
    kind: action
    command: CDVSETUP
    params: []

  - id: ri_dvd_top_menu
    label: RI DVD Top Menu
    kind: action
    command: CDVTOPMENU
    params: []

  - id: ri_dvd_menu
    label: RI DVD Menu
    kind: action
    command: CDVMENU
    params: []

  - id: ri_dvd_up
    label: RI DVD Up
    kind: action
    command: CDVUP
    params: []

  - id: ri_dvd_down
    label: RI DVD Down
    kind: action
    command: CDVDOWN
    params: []

  - id: ri_dvd_left
    label: RI DVD Left
    kind: action
    command: CDVLEFT
    params: []

  - id: ri_dvd_right
    label: RI DVD Right
    kind: action
    command: CDVRIGHT
    params: []

  - id: ri_dvd_enter
    label: RI DVD Enter
    kind: action
    command: CDVENTER
    params: []

  - id: ri_dvd_return
    label: RI DVD Return
    kind: action
    command: CDVRETURN
    params: []

  - id: ri_dvd_disc_f
    label: RI DVD Disc+
    kind: action
    command: CDVDISC.F
    params: []

  - id: ri_dvd_disc_r
    label: RI DVD Disc-
    kind: action
    command: CDVDISC.R
    params: []

  - id: ri_dvd_audio
    label: RI DVD Audio
    kind: action
    command: CDVAUDIO
    params: []

  - id: ri_dvd_random
    label: RI DVD Random
    kind: action
    command: CDVRANDOM
    params: []

  - id: ri_dvd_opcl
    label: RI DVD Open/Close
    kind: action
    command: CDVOP/CL
    params: []

  - id: ri_dvd_angle
    label: RI DVD Angle
    kind: action
    command: CDVANGLE
    params: []

  - id: ri_dvd_search
    label: RI DVD Search
    kind: action
    command: CDVSEARCH
    params: []

  - id: ri_dvd_display
    label: RI DVD Display
    kind: action
    command: CDVDISP
    params: []

  - id: ri_dvd_repeat
    label: RI DVD Repeat
    kind: action
    command: CDVREPEAT
    params: []

  - id: ri_dvd_memory
    label: RI DVD Memory
    kind: action
    command: CDVMEMORY
    params: []

  - id: ri_dvd_clear
    label: RI DVD Clear
    kind: action
    command: CDVCLEAR
    params: []

  - id: ri_dvd_ab_repeat
    label: RI DVD A-B Repeat
    kind: action
    command: CDVABR
    params: []

  - id: ri_dvd_step_f
    label: RI DVD Step Forward
    kind: action
    command: CDVSTEP.F
    params: []

  - id: ri_dvd_step_r
    label: RI DVD Step Back
    kind: action
    command: CDVSTEP.R
    params: []

  - id: ri_dvd_slow_f
    label: RI DVD Slow Forward
    kind: action
    command: CDVSLOW.F
    params: []

  - id: ri_dvd_slow_r
    label: RI DVD Slow Reverse
    kind: action
    command: CDVSLOW.R
    params: []

  - id: ri_dvd_zoom_toggle
    label: RI DVD Zoom
    kind: action
    command: CDVZOOMTG
    params: []

  - id: ri_dvd_zoom_up
    label: RI DVD Zoom Up
    kind: action
    command: CDVZOOMUP
    params: []

  - id: ri_dvd_zoom_down
    label: RI DVD Zoom Down
    kind: action
    command: CDVZOOMDN
    params: []

  - id: ri_dvd_progressive
    label: RI DVD Progressive
    kind: action
    command: CDVPROGRE
    params: []

  - id: ri_dvd_video_off
    label: RI DVD Video On/Off
    kind: action
    command: CDVVDOFF
    params: []

  - id: ri_dvd_condition_memory
    label: RI DVD Condition Memory
    kind: action
    command: CDVCONMEM
    params: []

  - id: ri_dvd_function_memory
    label: RI DVD Function Memory
    kind: action
    command: CDVFUNMEM
    params: []

  - id: ri_dvd_folder_up
    label: RI DVD Folder Up
    kind: action
    command: CDVFOLDUP
    params: []

  - id: ri_dvd_folder_down
    label: RI DVD Folder Down
    kind: action
    command: CDVFOLDDN
    params: []

  - id: ri_dvd_play_mode
    label: RI DVD Play Mode
    kind: action
    command: CDVP.MODE
    params: []

  # --- MD Recorder (CMD) ---
  - id: ri_md_play
    label: RI MD Play
    kind: action
    command: CMDPLAY
    params: []

  - id: ri_md_stop
    label: RI MD Stop
    kind: action
    command: CMDSTOP
    params: []

  - id: ri_md_ff
    label: RI MD FF
    kind: action
    command: CMDFF
    params: []

  - id: ri_md_rew
    label: RI MD REW
    kind: action
    command: CMDREW
    params: []

  - id: ri_md_play_mode
    label: RI MD Play Mode
    kind: action
    command: CMDP.MODE
    params: []

  - id: ri_md_skip_f
    label: RI MD Skip Forward
    kind: action
    command: CMDSKIP.F
    params: []

  - id: ri_md_skip_r
    label: RI MD Skip Reverse
    kind: action
    command: CMDSKIP.R
    params: []

  - id: ri_md_pause
    label: RI MD Pause
    kind: action
    command: CMDPAUSE
    params: []

  - id: ri_md_rec
    label: RI MD Rec
    kind: action
    command: CMDREC
    params: []

  - id: ri_md_memory
    label: RI MD Memory
    kind: action
    command: CMDMEMORY
    params: []

  - id: ri_md_display
    label: RI MD Display
    kind: action
    command: CMDDISP
    params: []

  - id: ri_md_scroll
    label: RI MD Scroll
    kind: action
    command: CMDSCROLL
    params: []

  - id: ri_md_music_scan
    label: RI MD Music Scan
    kind: action
    command: CMDM.SCAN
    params: []

  - id: ri_md_clear
    label: RI MD Clear
    kind: action
    command: CMDCLEAR
    params: []

  - id: ri_md_random
    label: RI MD Random
    kind: action
    command: CMDRANDOM
    params: []

  - id: ri_md_repeat
    label: RI MD Repeat
    kind: action
    command: CMDREPEAT
    params: []

  - id: ri_md_enter
    label: RI MD Enter
    kind: action
    command: CMDENTER
    params: []

  - id: ri_md_eject
    label: RI MD Eject
    kind: action
    command: CMDEJECT
    params: []

  - id: ri_md_name
    label: RI MD Name
    kind: action
    command: CMDNAME
    params: []

  - id: ri_md_group
    label: RI MD Group
    kind: action
    command: CMDGROUP
    params: []

  - id: ri_md_standby
    label: RI MD Standby
    kind: action
    command: CMDSTBY
    params: []

  # --- CD-R Recorder (CCR) ---
  - id: ri_cdr_play_mode
    label: RI CD-R Play Mode
    kind: action
    command: CCRP.MODE
    params: []

  - id: ri_cdr_play
    label: RI CD-R Play
    kind: action
    command: CCRPLAY
    params: []

  - id: ri_cdr_stop
    label: RI CD-R Stop
    kind: action
    command: CCRSTOP
    params: []

  - id: ri_cdr_skip_f
    label: RI CD-R Skip Forward
    kind: action
    command: CCRSKIP.F
    params: []

  - id: ri_cdr_skip_r
    label: RI CD-R Skip Reverse
    kind: action
    command: CCRSKIP.R
    params: []

  - id: ri_cdr_pause
    label: RI CD-R Pause
    kind: action
    command: CCRPAUSE
    params: []

  - id: ri_cdr_rec
    label: RI CD-R Rec
    kind: action
    command: CCRREC
    params: []

  - id: ri_cdr_clear
    label: RI CD-R Clear
    kind: action
    command: CCRCLEAR
    params: []

  - id: ri_cdr_repeat
    label: RI CD-R Repeat
    kind: action
    command: CCRREPEAT
    params: []

  - id: ri_cdr_scroll
    label: RI CD-R Scroll
    kind: action
    command: CCRSCROLL
    params: []

  - id: ri_cdr_opcl
    label: RI CD-R Open/Close
    kind: action
    command: CCROP/CL
    params: []

  - id: ri_cdr_display
    label: RI CD-R Display
    kind: action
    command: CCRDISP
    params: []

  - id: ri_cdr_random
    label: RI CD-R Random
    kind: action
    command: CCRRANDOM
    params: []

  - id: ri_cdr_memory
    label: RI CD-R Memory
    kind: action
    command: CCRMEMORY
    params: []

  - id: ri_cdr_ff
    label: RI CD-R FF
    kind: action
    command: CCRFF
    params: []

  - id: ri_cdr_rew
    label: RI CD-R REW
    kind: action
    command: CCRREW
    params: []

  - id: ri_cdr_standby
    label: RI CD-R Standby
    kind: action
    command: CCRSTBY
    params: []

  # --- Docking Station via RI (CDS) ---
  - id: ri_dock_power_on
    label: RI Dock Power On
    kind: action
    command: CDSPWRON
    params: []

  - id: ri_dock_power_off
    label: RI Dock Standby
    kind: action
    command: CDSPWROFF
    params: []

  - id: ri_dock_play_resume
    label: RI Dock Play/Resume
    kind: action
    command: CDSPLY/RES
    params: []

  - id: ri_dock_stop
    label: RI Dock Stop
    kind: action
    command: CDSSTOP
    params: []

  - id: ri_dock_skip_f
    label: RI Dock Track Up
    kind: action
    command: CDSSKIP.F
    params: []

  - id: ri_dock_skip_r
    label: RI Dock Track Down
    kind: action
    command: CDSSKIP.R
    params: []

  - id: ri_dock_pause
    label: RI Dock Pause
    kind: action
    command: CDSPAUSE
    params: []

  - id: ri_dock_play_pause
    label: RI Dock Play/Pause
    kind: action
    command: CDSPLY/PAU
    params: []

  - id: ri_dock_ff
    label: RI Dock FF
    kind: action
    command: CDSFF
    params: []

  - id: ri_dock_rew
    label: RI Dock FR
    kind: action
    command: CDSREW
    params: []

  - id: ri_dock_album_up
    label: RI Dock Album Up
    kind: action
    command: CDSALBUM+
    params: []

  - id: ri_dock_album_down
    label: RI Dock Album Down
    kind: action
    command: CDSALBUM-
    params: []

  - id: ri_dock_playlist_up
    label: RI Dock Playlist Up
    kind: action
    command: CDSPLIST+
    params: []

  - id: ri_dock_playlist_down
    label: RI Dock Playlist Down
    kind: action
    command: CDSPLIST-
    params: []

  - id: ri_dock_chapter_up
    label: RI Dock Chapter Up
    kind: action
    command: CDSCHAPT+
    params: []

  - id: ri_dock_chapter_down
    label: RI Dock Chapter Down
    kind: action
    command: CDSCHAPT-
    params: []

  - id: ri_dock_random
    label: RI Dock Shuffle
    kind: action
    command: CDSRANDOM
    params: []

  - id: ri_dock_repeat
    label: RI Dock Repeat
    kind: action
    command: CDSREPEAT
    params: []

  - id: ri_dock_mute
    label: RI Dock Mute
    kind: action
    command: CDSMUTE
    params: []

  - id: ri_dock_backlight
    label: RI Dock Backlight
    kind: action
    command: CDSBLIGHT
    params: []

  - id: ri_dock_menu
    label: RI Dock Menu
    kind: action
    command: CDSMENU
    params: []

  - id: ri_dock_enter
    label: RI Dock Select
    kind: action
    command: CDSENTER
    params: []

  - id: ri_dock_up
    label: RI Dock Cursor Up
    kind: action
    command: CDSUP
    params: []

  - id: ri_dock_down
    label: RI Dock Cursor Down
    kind: action
    command: CDSDOWN
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: PWRQSTN
    response_prefix: PWR
    type: enum
    values:
      - "00:Standby"
      - "01:On"

  - id: mute_state
    label: Mute State
    command: AMTQSTN
    response_prefix: AMT
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: speaker_a_state
    label: Speaker A State
    command: SPAQSTN
    response_prefix: SPA
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: speaker_b_state
    label: Speaker B State
    command: SPBQSTN
    response_prefix: SPB
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: speaker_layout_state
    label: Speaker Layout State
    command: SPLQSTN
    response_prefix: SPL
    type: string
    description: "SB / FH / FW"

  - id: volume_level
    label: Volume Level
    command: MVLQSTN
    response_prefix: MVL
    type: integer
    description: "Current volume level as 2-digit hex (00-64)"

  - id: tone_front
    label: Front Tone
    command: TFRQSTN
    response_prefix: TFR
    type: string
    description: "Front tone as BxxTxx"

  - id: tone_front_wide
    label: Front Wide Tone
    command: TFWQSTN
    response_prefix: TFW
    type: string

  - id: tone_front_high
    label: Front High Tone
    command: TFHQSTN
    response_prefix: TFH
    type: string

  - id: tone_center
    label: Center Tone
    command: TCTQSTN
    response_prefix: TCT
    type: string

  - id: tone_surround
    label: Surround Tone
    command: TSRQSTN
    response_prefix: TSR
    type: string

  - id: tone_surround_back
    label: Surround Back Tone
    command: TSBQSTN
    response_prefix: TSB
    type: string

  - id: tone_subwoofer
    label: Subwoofer Tone
    command: TSWQSTN
    response_prefix: TSW
    type: string

  - id: subwoofer_level
    label: Subwoofer Temporary Level
    command: SWLQSTN
    response_prefix: SWL
    type: string
    description: "-F..00..+C (-15dB..0dB..+12dB)"

  - id: center_level
    label: Center Temporary Level
    command: CTLQSTN
    response_prefix: CTL
    type: string
    description: "-C..00..+C (-12dB..0dB..+12dB)"

  - id: display_mode
    label: Display Mode
    command: DIFQSTN
    response_prefix: DIF
    type: string

  - id: input_source
    label: Input Source
    command: SLIQSTN
    response_prefix: SLI
    type: string
    description: "Current input source as 2-digit hex code"

  - id: recout_selector
    label: RECOUT Selector
    command: SLRQSTN
    response_prefix: SLR
    type: string

  - id: listening_mode
    label: Listening Mode
    command: LMDQSTN
    response_prefix: LMD
    type: string
    description: "Current listening mode as 2-digit hex code"

  - id: dimmer_level
    label: Dimmer Level
    command: DIMQSTN
    response_prefix: DIM
    type: enum
    values:
      - "00:Bright"
      - "01:Dim"
      - "02:Dark"
      - "03:Shut-Off"
      - "08:Bright-LED-OFF"

  - id: sleep_time
    label: Sleep Timer
    command: SLPQSTN
    response_prefix: SLP
    type: string
    description: "Sleep time as hex (01-5A) or OFF"

  - id: audio_selector
    label: Audio Selector
    command: SLAQSTN
    response_prefix: SLA
    type: string
    description: "Current audio selector mode"

  - id: hdmi_output
    label: HDMI Output
    command: HDOQSTN
    response_prefix: HDO
    type: string
    description: "Current HDMI output selector"

  - id: resolution
    label: Monitor Out Resolution
    command: RESQSTN
    response_prefix: RES
    type: string
    description: "Current monitor out resolution"

  - id: isf_mode
    label: ISF Mode
    command: ISFQSTN
    response_prefix: ISF
    type: enum
    values:
      - "00:Custom"
      - "01:Day"
      - "02:Night"

  - id: late_night
    label: Late Night
    command: LTNQSTN
    response_prefix: LTN
    type: enum
    values:
      - "00:Off"
      - "01:Low"
      - "02:High"
      - "03:Auto"

  - id: reeq_academy_state
    label: Re-EQ/Academy State
    command: RASQSTN
    response_prefix: RAS
    type: string

  - id: audyssey_eq
    label: Audyssey EQ
    command: ADYQSTN
    response_prefix: ADY
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: audyssey_dyn_eq
    label: Audyssey Dynamic EQ
    command: ADQQSTN
    response_prefix: ADQ
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: audyssey_dyn_vol
    label: Audyssey Dynamic Volume
    command: ADVQSTN
    response_prefix: ADV
    type: enum
    values:
      - "00:Off"
      - "01:Light"
      - "02:Medium"
      - "03:Heavy"

  - id: dolby_volume
    label: Dolby Volume
    command: DVLQSTN
    response_prefix: DVL
    type: enum
    values:
      - "00:Off"
      - "01:Low"
      - "02:Mid"
      - "03:High"

  - id: music_optimizer
    label: Music Optimizer
    command: MOTQSTN
    response_prefix: MOT
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: audio_info
    label: Audio Information
    command: IFAQSTN
    response_prefix: IFA
    type: string
    description: "Audio format information"

  - id: video_info
    label: Video Information
    command: IFVQSTN
    response_prefix: IFV
    type: string
    description: "Video format information"

  - id: net_play_status
    label: Net/USB Play Status
    command: NSTQSTN
    response_prefix: NST
    type: string
    description: "3-char string: play status (S/P/p/F/R), repeat (-/R/F/1), shuffle (-/S/A)"

  - id: net_artist
    label: Net/USB Artist Name
    command: NATQSTN
    response_prefix: NAT
    type: string
    description: "Artist name up to 64 chars"

  - id: net_album
    label: Net/USB Album Name
    command: NALQSTN
    response_prefix: NAL
    type: string
    description: "Album name up to 64 chars"

  - id: net_title
    label: Net/USB Title Name
    command: NTIQSTN
    response_prefix: NTI
    type: string
    description: "Title name up to 64 chars"

  - id: net_time
    label: Net/USB Time Info
    command: NTMQSTN
    response_prefix: NTM
    type: string
    description: "Elapsed/Track time mm:ss/mm:ss"

  - id: net_track
    label: Net/USB Track Info
    command: NTRQSTN
    response_prefix: NTR
    type: string
    description: "Current track / Total track cccc/tttt"

  - id: xm_channel_name
    label: XM Channel Name
    command: XCNQSTN
    response_prefix: XCN
    type: string
    description: "XM channel name (XM model only)"

  - id: xm_artist_name
    label: XM Artist Name
    command: XATQSTN
    response_prefix: XAT
    type: string

  - id: xm_title
    label: XM Title
    command: XTIQSTN
    response_prefix: XTI
    type: string

  - id: xm_channel_number
    label: XM Channel Number
    command: XCHQSTN
    response_prefix: XCH
    type: string

  - id: xm_category
    label: XM Category
    command: XCTQSTN
    response_prefix: XCT
    type: string

  - id: sirius_channel_name
    label: SIRIUS Channel Name
    command: SCNQSTN
    response_prefix: SCN
    type: string

  - id: sirius_artist_name
    label: SIRIUS Artist Name
    command: SATQSTN
    response_prefix: SAT
    type: string

  - id: sirius_title
    label: SIRIUS Title
    command: STIQSTN
    response_prefix: STI
    type: string

  - id: sirius_channel_number
    label: SIRIUS Channel Number
    command: SCHQSTN
    response_prefix: SCH
    type: string

  - id: sirius_category
    label: SIRIUS Category
    command: SCTQSTN
    response_prefix: SCT
    type: string

  - id: hdradio_artist
    label: HD Radio Artist Name
    command: HATQSTN
    response_prefix: HAT
    type: string
    description: "HD Radio artist (64 digits max)"

  - id: hdradio_channel_name
    label: HD Radio Channel Name
    command: HCNQSTN
    response_prefix: HCN
    type: string
    description: "HD Radio station name (7 digits)"

  - id: hdradio_title
    label: HD Radio Title
    command: HTIQSTN
    response_prefix: HTI
    type: string

  - id: hdradio_detail
    label: HD Radio Detail Info
    command: HDSQSTN
    response_prefix: HDS
    type: string

  - id: hdradio_channel_program
    label: HD Radio Channel Program
    command: HPRQSTN
    response_prefix: HPR
    type: string

  - id: hdradio_blend_mode
    label: HD Radio Blend Mode
    command: HBLQSTN
    response_prefix: HBL
    type: enum
    values:
      - "00:Auto"
      - "01:Analog"

  - id: hdradio_tuner_status
    label: HD Radio Tuner Status
    command: HTSQSTN
    response_prefix: HTS
    type: string
    description: "3-byte mmnnoo status (HD flag, current program, receivable programs bitmap)"

  # --- Zone 2 ---
  - id: zone2_power_state
    label: Zone 2 Power State
    command: ZPWQSTN
    response_prefix: ZPW
    type: enum
    values:
      - "00:Standby"
      - "01:On"

  - id: zone2_mute_state
    label: Zone 2 Mute State
    command: ZMTQSTN
    response_prefix: ZMT
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: zone2_volume_level
    label: Zone 2 Volume Level
    command: ZVLQSTN
    response_prefix: ZVL
    type: string
    description: "Zone2 volume as 2-digit hex"

  - id: zone2_tone
    label: Zone 2 Tone
    command: ZTNQSTN
    response_prefix: ZTN
    type: string
    description: "Zone2 tone as BxxTxx"

  - id: zone2_balance
    label: Zone 2 Balance
    command: ZBLQSTN
    response_prefix: ZBL
    type: string

  - id: zone2_input_source
    label: Zone 2 Input Source
    command: SLZQSTN
    response_prefix: SLZ
    type: string

  - id: zone2_tuner_frequency
    label: Zone 2 Tuner Frequency
    command: TUZQSTN
    response_prefix: TUZ
    type: string

  - id: zone2_preset_number
    label: Zone 2 Preset Number
    command: PRZQSTN
    response_prefix: PRZ
    type: string

  - id: zone2_late_night
    label: Zone 2 Late Night
    command: LTZQSTN
    response_prefix: LTZ
    type: string

  - id: zone2_reeq_academy
    label: Zone 2 Re-EQ/Academy
    command: RAZQSTN
    response_prefix: RAZ
    type: string

  # --- Zone 3 ---
  - id: zone3_power_state
    label: Zone 3 Power State
    command: PW3QSTN
    response_prefix: PW3
    type: enum
    values:
      - "00:Standby"
      - "01:On"

  - id: zone3_mute_state
    label: Zone 3 Mute State
    command: MT3QSTN
    response_prefix: MT3
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: zone3_volume_level
    label: Zone 3 Volume Level
    command: VL3QSTN
    response_prefix: VL3
    type: string

  - id: zone3_tone
    label: Zone 3 Tone
    command: TN3QSTN
    response_prefix: TN3
    type: string
    description: "Zone3 tone as BxxTxx"

  - id: zone3_balance
    label: Zone 3 Balance
    command: BL3QSTN
    response_prefix: BL3
    type: string

  - id: zone3_input_source
    label: Zone 3 Input Source
    command: SL3QSTN
    response_prefix: SL3
    type: string

  - id: zone3_tuner_frequency
    label: Zone 3 Tuner Frequency
    command: TU3QSTN
    response_prefix: TU3
    type: string

  - id: zone3_preset_number
    label: Zone 3 Preset Number
    command: PR3QSTN
    response_prefix: PR3
    type: string

  # --- Zone 4 ---
  - id: zone4_power_state
    label: Zone 4 Power State
    command: PW4QSTN
    response_prefix: PW4
    type: enum
    values:
      - "00:Standby"
      - "01:On"

  - id: zone4_mute_state
    label: Zone 4 Mute State
    command: MT4QSTN
    response_prefix: MT4
    type: enum
    values:
      - "00:Off"
      - "01:On"

  - id: zone4_volume_level
    label: Zone 4 Volume Level
    command: VL4QSTN
    response_prefix: VL4
    type: string

  - id: zone4_input_source
    label: Zone 4 Input Source
    command: SL4QSTN
    response_prefix: SL4
    type: string

  - id: zone4_tuner_frequency
    label: Zone 4 Tuner Frequency
    command: TU4QSTN
    response_prefix: TU4
    type: string

  - id: zone4_preset_number
    label: Zone 4 Preset Number
    command: PR4QSTN
    response_prefix: PR4
    type: string

  - id: tuner_frequency
    label: Tuner Frequency
    command: TUNQSTN
    response_prefix: TUN
    type: string
    description: "Current tuning frequency"

  - id: preset_number
    label: Preset Number
    command: PRSQSTN
    response_prefix: PRS
    type: string
    description: "Current preset number as hex"
```

## Variables
```yaml
# UNRESOLVED: no independent settable parameters outside the Actions section.
# Tone calibration parameters (Bxx/Txx with hex sign encoding) are represented
# as parameterized Actions above per source documentation.
```

## Events
```yaml
# Device sends unsolicited status notifications when state changes.
# Per source section 2.3: "If the system status changes, the Receiver will notify
# the Controller by sending the new current status."
# Notification format: same ISCP message format as query responses (e.g. "SLI03").
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Zone2/3/4 commands only work when main zone is ON (documented in source)"
  - "Zone2 tone only works when main is ON and Zone2 is powered or variable (documented in source)"
  - "12V Trigger A/B/C available only when each trigger parameter is set to OFF at Setup Menu"
# UNRESOLVED: no power-on sequencing requirements or safety warnings in source
```

## Notes
- Protocol is ISCP (Integra Serial Control Protocol) v1.15 over eISCP (Ethernet) or RS-232.
- eISCP frames have a 16-byte header: magic "ISCP" (4 bytes), header size (4 bytes BE, 0x00000010), data size (4 bytes BE), version (1 byte, 0x01), reserved (3 bytes, 0x000000).
- ISCP message format: start char "!", unit type "1" (Receiver), 3-char command, parameter chars, end char [EOF] (0x1A).
- RS-232 uses 9-pin female D-Sub (pin 2=TX, pin 3=RX, pin 5=GND), straight-through cable.
- TCP default port 60128, configurable 49152-65535 via receiver setup menu. Must reboot receiver to standby after changing.
- Only one TCP connection at a time. Connection must be held continuously to receive unsolicited notifications.
- Minimum 50ms interval between commands.
- Volume and preset values use hexadecimal representation (e.g., volume 00-64 hex = 0-100 decimal).
- Query suffix "QSTN" appended to any 3-char command returns current state.
- Receiver responds within 50ms; no response within 50ms indicates communication failure.
- Tone/speaker-level values use hex sign encoding: "-A".."00".."+A" maps to -10..0..+10 in 2-step.
- RAS command is overloaded across three model generations (Re-EQ/Academy, Re-EQ-only, Cinema Filter); emitted as separate actions per documented variant.
- NTC FF/REW Net-tune commands must be sent continuously with no more than 100ms delay between codes.
- TUNER/XM/SIRIUS/HD Radio function is shared between MAIN and ZONE side.
- XM/SIRIUS/HD Radio commands are model-conditional (XM/SIRIUS/HD Radio model only) and may not apply to HT-RC560 hardware.
- RI-prefixed actions (CCD/CT1/CT2/CEQ/CDT/CDV/CMD/CCR/CDS) are passthrough commands sent out the RI port to control external Onkyo devices, not the receiver itself.
- Authentication: source does not document any authentication procedure; absence is not confirmed as an explicit no-auth specification.

<!-- UNRESOLVED: HT-RC560 not explicitly listed in source model support matrix. Source covers TX-NR/DTR/DHC/PR-SC series receivers through v1.15. HT-RC560 likely shares command set with TX-NR series but exact per-command support unconfirmed. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact input list and supported listening modes for HT-RC560 not confirmed; populated from full ISCP code catalogue -->
<!-- UNRESOLVED: XM/SIRIUS/HD Radio commands present in source but may not apply to HT-RC560 hardware -->
<!-- UNRESOLVED: DIF00/DIF01/DIF03 reused across Display-Information and Display-Mode variants; which set a given model honors is model-dependent -->

## Provenance

```yaml
source_domains:
  - community.symcon.de
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
retrieved_at: 2026-05-21T15:26:11.967Z
last_checked_at: 2026-10-01T08:28:03.913Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T08:28:03.913Z
matched_actions: 439
action_count: 439
confidence: medium
summary: "All 439 spec actions map to verbatim3-char ISCP mnemonics in source; transport 60128/9600/8/N/1 verified. Model applicability caveat: HT-RC560 not explicitly listed in source's model support matrix — flagged as UNRESOLVED in spec itself. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source is a generic ISCP protocol document covering many Onkyo/Integra models; HT-RC560 is not explicitly listed in the model support matrix. Command support per model is indicated per-entry but HT-RC560 column is absent. Commands populated below are those documented by the source (broad support across late-model receivers). XM/SIRIUS/HD Radio rows are model-conditional and may not apply to HT-RC560 hardware."
- "no independent settable parameters outside the Actions section."
- "no explicit multi-step sequences documented in source"
- "no power-on sequencing requirements or safety warnings in source"
- "HT-RC560 not explicitly listed in source model support matrix. Source covers TX-NR/DTR/DHC/PR-SC series receivers through v1.15. HT-RC560 likely shares command set with TX-NR series but exact per-command support unconfirmed."
- "firmware version compatibility not stated in source"
- "exact input list and supported listening modes for HT-RC560 not confirmed; populated from full ISCP code catalogue"
- "XM/SIRIUS/HD Radio commands present in source but may not apply to HT-RC560 hardware"
- "DIF00/DIF01/DIF03 reused across Display-Information and Display-Mode variants; which set a given model honors is model-dependent"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
