---
schema_version: ai4av-public-spec-v1
device_id: integra/drx-r1-3
entity_id: FILL_IN_FROM_CONVEX
spec_id: admin/integra-drx-r1-3-series
revision: 1
author: admin
title: "Integra DRX-R1.3 Series Control Spec"
status: published
manufacturer: Integra
manufacturer_key: integra
model_family: DRX-R1.3
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DRX-R1.3
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:46:38.053Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T13:46:38.053Z
  matched_actions: 132
  action_count: 132
  confidence: high
  summary: "All 132 spec actions matched literal wire tokens in source; transport values verbatim; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DRX-R1.3 Series Control Spec

## Summary
The Integra DRX-R1.3 is a multi-zone AV receiver controllable via ISCP (Integra Serial Control Protocol) over RS-232C or Ethernet (eISCP over TCP). The protocol uses a fixed-format ASCII command structure: start character `!`, unit type `1` (Receiver), three-character command code, and variable-length parameter. This spec covers the eISCP (TCP) and RS-232 transport layers and all documented command groups: system power, volume, input selection, listening modes, tone control, tuner, network/USB playback, multi-zone control (Zone 2/3/4), and RI-system device passthrough.

<!-- UNRESOLVED: exact firmware versions compatible with this protocol version (1.15) not stated -->
<!-- UNRESOLVED: maximum concurrent connection limit beyond "one" noted in source — unclear if this refers to total TCP sessions or simultaneous controllers -->
<!-- UNRESOLVED: eISCP end-of-message character varies by model ("[EOF]" or "[EOF][CR]" or "[EOF][CR][LF]") — not pinned for DRX-R1.3 specifically -->

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
  type: none  # inferred: no auth procedure in source
```

**ISCP message format (RS-232):**
Controller → Device: `!` + unit type (`1`) + 3-char command + parameter + `[CR]`/`[LF]`/`[CR][LF]`

Device → Controller: `!` + unit type (`1`) + 3-char command + parameter + `[EOF]`

**eISCP packet format (TCP):**
Header (16 bytes, big-endian): magic `ISCP` | header_size `0x00000010` | data_size | version `0x01` | reserved `0x000000`

Data: `!` + unit type (`1`) + 3-char command + parameter + `[EOF]`/`[EOF][CR]`/`[EOF][CR][LF]`

**Notes:**
- Connection must be held continuously; status notifications require a persistent connection.
- Only one TCP client connection at a time.
- Minimum 50 ms interval between received messages.

## Traits
```yaml
traits:
  - powerable     # PWR, ZPW, PW3, PW4 commands
  - levelable     # MVL, ZVL, VL3, VL4 volume; TFR/TCT/TSR tone controls; SWL/CTL sub/center levels
  - routable      # SLI, SLZ, SL3, SL4 input selector commands
  - queryable     # QSTN parameter on most commands
  - muteable      # AMT, ZMT, MT3, MT4 muting commands
```

## Actions
```yaml
actions:
  # --- System Power ---
  - id: power_on
    label: Power On
    kind: action
    command: PWR01
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: PWR00
    params: []

  - id: power_query
    label: Query Power Status
    kind: query
    command: PWRQSTN
    params: []

  # --- Audio Muting ---
  - id: mute_on
    label: Mute On
    kind: action
    command: AMT01
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: AMT00
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: AMTTG
    params: []

  - id: mute_query
    label: Query Mute Status
    kind: query
    command: AMTQSTN
    params: []

  # --- Master Volume ---
  - id: volume_set
    label: Set Volume Level
    kind: action
    command: MVL{level}
    params:
      - name: level
        type: string
        description: "Volume level in hex (00-64 for 0-100, or 00-50 for 0-80 depending on model config)"

  - id: volume_up
    label: Volume Up
    kind: action
    command: MVLUP
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: MVLDOWN
    params: []

  - id: volume_up_1db
    label: Volume Up 1 dB
    kind: action
    command: MVLUP1
    params: []

  - id: volume_down_1db
    label: Volume Down 1 dB
    kind: action
    command: MVLDOWN1
    params: []

  - id: volume_query
    label: Query Volume Level
    kind: query
    command: MVLQSTN
    params: []

  # --- Input Selector ---
  - id: input_select
    label: Select Input
    kind: action
    command: SLI{input}
    params:
      - name: input
        type: enum
        values:
          - "00"  # VIDEO1 / VCR/DVR
          - "01"  # VIDEO2 / CBL/SAT
          - "02"  # VIDEO3 / GAME/TV
          - "03"  # VIDEO4 / AUX1
          - "04"  # VIDEO5 / AUX2
          - "05"  # VIDEO6
          - "06"  # VIDEO7
          - "10"  # DVD
          - "20"  # TAPE1 / TV/TAPE
          - "21"  # TAPE2
          - "22"  # PHONO
          - "23"  # CD
          - "24"  # FM
          - "25"  # AM
          - "26"  # TUNER
          - "27"  # MUSIC SERVER
          - "28"  # INTERNET RADIO
          - "29"  # USB/USB(Front)
          - "2A"  # USB(Rear)
          - "40"  # Universal PORT
          - "30"  # MULTI CH
          - "31"  # XM
          - "32"  # SIRIUS
        description: "Input selector code (hex)"

  - id: input_up
    label: Input Selector Wrap Up
    kind: action
    command: SLIUP
    params: []

  - id: input_down
    label: Input Selector Wrap Down
    kind: action
    command: SLIDOWN
    params: []

  - id: input_query
    label: Query Input Selector
    kind: query
    command: SLIQSTN
    params: []

  # --- Audio Selector ---
  - id: audio_selector_set
    label: Set Audio Selector
    kind: action
    command: SLA{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06"]
        description: "00=AUTO, 01=MULTI-CHANNEL, 02=ANALOG, 03=iLINK, 04=HDMI, 05=COAX/OPT, 06=BALANCE"

  - id: audio_selector_query
    label: Query Audio Selector
    kind: query
    command: SLAQSTN
    params: []

  # --- Listening Mode ---
  - id: listening_mode_set
    label: Set Listening Mode
    kind: action
    command: LMD{mode}
    params:
      - name: mode
        type: string
        description: "Listening mode code (hex), e.g. 00=STEREO, 01=DIRECT, 02=SURROUND, 11=PURE AUDIO, 80=PLII Movie, etc."

  - id: listening_mode_up
    label: Listening Mode Wrap Up
    kind: action
    command: LMDUP
    params: []

  - id: listening_mode_down
    label: Listening Mode Wrap Down
    kind: action
    command: LMDDOWN
    params: []

  - id: listening_mode_query
    label: Query Listening Mode
    kind: query
    command: LMDQSTN
    params: []

  # --- Speaker A/B ---
  - id: speaker_a_set
    label: Set Speaker A
    kind: action
    command: SPA{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  - id: speaker_b_set
    label: Set Speaker B
    kind: action
    command: SPB{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  # --- Tone Controls ---
  - id: tone_front_set
    label: Set Front Tone
    kind: action
    command: TFR{params}
    params:
      - name: params
        type: string
        description: "Bxx for bass or Txx for treble (xx=-A to +A, -10 to +10 in 2-step increments), or BUP/BDOWN/TUP/TDOWN"

  - id: tone_front_query
    label: Query Front Tone
    kind: query
    command: TFRQSTN
    params: []

  # --- Subwoofer Level ---
  - id: subwoofer_level_set
    label: Set Subwoofer Level
    kind: action
    command: SWL{level}
    params:
      - name: level
        type: string
        description: "Level -F to +C (-15dB to +12dB), or UP/DOWN"

  # --- Sleep Timer ---
  - id: sleep_set
    label: Set Sleep Timer
    kind: action
    command: SLP{time}
    params:
      - name: time
        type: string
        description: "01-5A (1-90 min in hex), OFF, or UP for wrap-around"

  - id: sleep_query
    label: Query Sleep Timer
    kind: query
    command: SLPQSTN
    params: []

  # --- Dimmer ---
  - id: dimmer_set
    label: Set Dimmer Level
    kind: action
    command: DIM{level}
    params:
      - name: level
        type: enum
        values: ["00", "01", "02", "03", "08"]
        description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"

  - id: dimmer_query
    label: Query Dimmer Level
    kind: query
    command: DIMQSTN
    params: []

  # --- Display Mode ---
  - id: display_mode_set
    label: Set Display Mode
    kind: action
    command: DIF{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=Selector+Volume, 01=Selector+Listening Mode, 02=Digital Format(temp), 03=Video Format(temp)"

  - id: display_mode_query
    label: Query Display Mode
    kind: query
    command: DIFQSTN
    params: []

  # --- HDMI Output ---
  - id: hdmi_output_set
    label: Set HDMI Output
    kind: action
    command: HDO{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03", "04", "05"]
        description: "00=No Analog, 01=Out Main, 02=Out Sub, 03=Both, 04=Both(Main), 05=Both(Sub)"

  - id: hdmi_output_query
    label: Query HDMI Output
    kind: query
    command: HDOQSTN
    params: []

  # --- Monitor Out Resolution ---
  - id: resolution_set
    label: Set Monitor Out Resolution
    kind: action
    command: RES{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06", "07"]
        description: "00=Through, 01=Auto, 02=480p, 03=720p, 04=1080i, 05=1080p, 06=Source, 07=1080p/24fs"

  # --- 12V Trigger A/B/C ---
  - id: trigger_a_set
    label: Set 12V Trigger A
    kind: action
    command: TGA{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  - id: trigger_b_set
    label: Set 12V Trigger B
    kind: action
    command: TGB{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  - id: trigger_c_set
    label: Set 12V Trigger C
    kind: action
    command: TGC{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  # --- OSD Navigation ---
  - id: osd_menu
    label: OSD Menu
    kind: action
    command: OSDMENU
    params: []

  - id: osd_up
    label: OSD Up
    kind: action
    command: OSDUP
    params: []

  - id: osd_down
    label: OSD Down
    kind: action
    command: OSDDOWN
    params: []

  - id: osd_right
    label: OSD Right
    kind: action
    command: OSDRIGHT
    params: []

  - id: osd_left
    label: OSD Left
    kind: action
    command: OSDLEFT
    params: []

  - id: osd_enter
    label: OSD Enter
    kind: action
    command: OSDENTER
    params: []

  - id: osd_exit
    label: OSD Exit
    kind: action
    command: OSDEXIT
    params: []

  # --- Memory Setup ---
  - id: memory_store
    label: Store Memory
    kind: action
    command: MEMSTR
    params: []

  - id: memory_recall
    label: Recall Memory
    kind: action
    command: MEMRCL
    params: []

  # --- Net/USB Operation ---
  - id: net_play
    label: Net/USB Play
    kind: action
    command: NTCPLAY
    params: []

  - id: net_stop
    label: Net/USB Stop
    kind: action
    command: NTCSTOP
    params: []

  - id: net_pause
    label: Net/USB Pause
    kind: action
    command: NTCPAUSE
    params: []

  - id: net_track_up
    label: Net/USB Track Up
    kind: action
    command: NTCTRUP
    params: []

  - id: net_track_down
    label: Net/USB Track Down
    kind: action
    command: NTCTRDN
    params: []

  - id: net_ff
    label: Net/USB Fast Forward
    kind: action
    command: NTCFF
    params: []

  - id: net_rew
    label: Net/USB Rewind
    kind: action
    command: NTCREW
    params: []

  - id: net_repeat
    label: Net/USB Repeat
    kind: action
    command: NTCREPEAT
    params: []

  - id: net_random
    label: Net/USB Random
    kind: action
    command: NTCRANDOM
    params: []

  # --- Tuner ---
  - id: tuner_set_frequency
    label: Set Tuner Frequency
    kind: action
    command: TUN{freq}
    params:
      - name: freq
        type: string
        description: "Direct tuning frequency (FM nnn.nn MHz / AM nnnnn kHz)"

  - id: tuner_up
    label: Tuner Frequency Up
    kind: action
    command: TUNUP
    params: []

  - id: tuner_down
    label: Tuner Frequency Down
    kind: action
    command: TUNDOWN
    params: []

  - id: preset_set
    label: Set Preset
    kind: action
    command: PRS{preset}
    params:
      - name: preset
        type: string
        description: "Preset number in hex (01-28 for 1-40)"

  - id: preset_up
    label: Preset Up
    kind: action
    command: PRSUP
    params: []

  - id: preset_down
    label: Preset Down
    kind: action
    command: PRSDOWN
    params: []

  # --- Audyssey ---
  - id: audyssey_set
    label: Set Audyssey EQ
    kind: action
    command: ADY{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  - id: audyssey_dynamic_eq_set
    label: Set Audyssey Dynamic EQ
    kind: action
    command: ADQ{state}
    params:
      - name: state
        type: enum
        values: ["00", "01"]
        description: "00=Off, 01=On"

  - id: audyssey_dynamic_volume_set
    label: Set Audyssey Dynamic Volume
    kind: action
    command: ADV{state}
    params:
      - name: state
        type: enum
        values: ["00", "01", "02", "03"]
        description: "00=Off, 01=Light, 02=Medium, 03=Heavy"

  # --- Zone 2 ---
  - id: zone2_power_on
    label: Zone 2 Power On
    kind: action
    command: ZPW01
    params: []

  - id: zone2_power_standby
    label: Zone 2 Power Standby
    kind: action
    command: ZPW00
    params: []

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

  - id: zone2_volume_set
    label: Zone 2 Set Volume
    kind: action
    command: ZVL{level}
    params:
      - name: level
        type: string
        description: "Volume level in hex (00-64 for 0-100)"

  - id: zone2_volume_up
    label: Zone 2 Volume Up
    kind: action
    command: ZVLUP
    params: []

  - id: zone2_volume_down
    label: Zone 2 Volume Down
    kind: action
    command: ZVLDOWN
    params: []

  - id: zone2_input_select
    label: Zone 2 Select Input
    kind: action
    command: SLZ{input}
    params:
      - name: input
        type: string
        description: "Input selector code (same codes as main SLI, plus 80=SOURCE)"

  # --- Zone 3 ---
  - id: zone3_power_on
    label: Zone 3 Power On
    kind: action
    command: PW301
    params: []

  - id: zone3_power_standby
    label: Zone 3 Power Standby
    kind: action
    command: PW300
    params: []

  - id: zone3_mute_toggle
    label: Zone 3 Mute Toggle
    kind: action
    command: MT3TG
    params: []

  - id: zone3_volume_set
    label: Zone 3 Set Volume
    kind: action
    command: VL3{level}
    params:
      - name: level
        type: string
        description: "Volume level in hex (00-64 for 0-100)"

  - id: zone3_input_select
    label: Zone 3 Select Input
    kind: action
    command: SL3{input}
    params:
      - name: input
        type: string
        description: "Input selector code (same codes as main SLI)"

  # --- Zone 4 ---
  - id: zone4_power_on
    label: Zone 4 Power On
    kind: action
    command: PW401
    params: []

  - id: zone4_power_standby
    label: Zone 4 Power Standby
    kind: action
    command: PW400
    params: []

  - id: zone4_volume_set
    label: Zone 4 Set Volume
    kind: action
    command: VL4{level}
    params:
      - name: level
        type: string
        description: "Volume level in hex (00-64 for 0-100)"

  - id: zone4_input_select
    label: Zone 4 Select Input
    kind: action
    command: SL4{input}
    params:
      - name: input
        type: string
        description: "Input selector code (same codes as main SLI)"

  # --- RECOUT Selector ---
  - id: recout_select
    label: Set RECOUT Selector
    kind: action
    command: SLR{input}
    params:
      - name: input
        type: string
        description: "RECOUT input code (same as SLI codes, plus 7F=OFF, 80=SOURCE)"

  # --- ISF Mode ---
  - id: isf_mode_set
    label: Set ISF Mode
    kind: action
    command: ISF{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02"]
        description: "00=Custom, 01=Day, 02=Night"
- id: speaker_layout_set
  label: Set Speaker Layout
  kind: action
  command: SPL{layout}
  params:
    - name: layout
      type: enum
      values: ["SB", "FH", "FW", "UP"]
      description: "SB=SurrBack, FH=Front High/SurrBack+FH, FW=Front Wide/SurrBack+FW, UP=Wrap-Around"

- id: speaker_layout_query
  label: Query Speaker Layout
  kind: query
  command: SPLQSTN
  params: []

- id: tone_front_wide_set
  label: Set Front Wide Tone
  kind: action
  command: TFW{params}
  params:
    - name: params
      type: string
      description: "Bxx for bass or Txx for treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: tone_front_wide_query
  label: Query Front Wide Tone
  kind: query
  command: TFWQSTN
  params: []

- id: tone_front_high_set
  label: Set Front High Tone
  kind: action
  command: TFH{params}
  params:
    - name: params
      type: string
      description: "Bxx for bass or Txx for treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: tone_front_high_query
  label: Query Front High Tone
  kind: query
  command: TFHQSTN
  params: []

- id: tone_center_set
  label: Set Center Tone
  kind: action
  command: TCT{params}
  params:
    - name: params
      type: string
      description: "Bxx for bass or Txx for treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: tone_center_query
  label: Query Center Tone
  kind: query
  command: TCTQSTN
  params: []

- id: tone_surround_set
  label: Set Surround Tone
  kind: action
  command: TSR{params}
  params:
    - name: params
      type: string
      description: "Bxx for bass or Txx for treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: tone_surround_query
  label: Query Surround Tone
  kind: query
  command: TSRQSTN
  params: []

- id: tone_surround_back_set
  label: Set Surround Back Tone
  kind: action
  command: TSB{params}
  params:
    - name: params
      type: string
      description: "Bxx for bass or Txx for treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: tone_surround_back_query
  label: Query Surround Back Tone
  kind: query
  command: TSBQSTN
  params: []

- id: tone_subwoofer_set
  label: Set Subwoofer Tone
  kind: action
  command: TSW{params}
  params:
    - name: params
      type: string
      description: "Bxx for subwoofer bass (xx=-A to +A), or BUP/BDOWN"

- id: tone_subwoofer_query
  label: Query Subwoofer Tone
  kind: query
  command: TSWQSTN
  params: []

- id: speaker_level_calibration
  label: Speaker Level Calibration
  kind: action
  command: SLC{key}
  params:
    - name: key
      type: enum
      values: ["TEST", "CHSEL", "UP", "DOWN"]
      description: "TEST=Test Key, CHSEL=CH SEL Key, UP=Level+ Key, DOWN=Level- Key"

- id: video_output_selector_set
  label: Set Video Output Selector
  kind: action
  command: VOS{mode}
  params:
    - name: mode
      type: enum
      values: ["00", "01"]
      description: "00=D4, 01=Component (Japanese Model Only)"

- id: video_output_selector_query
  label: Query Video Output Selector
  kind: query
  command: VOSQSTN
  params: []

- id: rds_display
  label: RDS Information Display
  kind: action
  command: RDS{mode}
  params:
    - name: mode
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=RT Information, 01=PTY Information, 02=TP Information, UP=Wrap-Around (RDS Model Only)"

- id: pty_scan
  label: PTY Scan
  kind: action
  command: PTS{pty}
  params:
    - name: pty
      type: string
      description: "PTY No 00-1E (0-30 in hex), or ENTER to finish (RDS Model Only)"

- id: tp_scan
  label: TP Scan
  kind: action
  command: TPS{param}
  params:
    - name: param
      type: string
      description: "Empty string to start TP scan, or ENTER to finish (RDS Model Only)"

- id: xm_channel_name_query
  label: Query XM Channel Name
  kind: query
  command: XCNQSTN
  params: []

- id: xm_artist_name_query
  label: Query XM Artist Name
  kind: query
  command: XATQSTN
  params: []

- id: xm_title_query
  label: Query XM Title
  kind: query
  command: XTIQSTN
  params: []

- id: xm_channel_set
  label: Set XM Channel Number
  kind: action
  command: XCH{channel}
  params:
    - name: channel
      type: string
      description: "XM Channel Number 000-255, or UP/DOWN for wrap-around (XM Model Only)"

- id: xm_channel_query
  label: Query XM Channel Number
  kind: query
  command: XCHQSTN
  params: []

- id: xm_category_set
  label: Set XM Category
  kind: action
  command: XCT{category}
  params:
    - name: category
      type: string
      description: "XM Category Info, or UP/DOWN for wrap-around (XM Model Only)"

- id: xm_category_query
  label: Query XM Category
  kind: query
  command: XCTQSTN
  params: []

- id: sirius_channel_name_query
  label: Query SIRIUS Channel Name
  kind: query
  command: SCNQSTN
  params: []

- id: sirius_artist_name_query
  label: Query SIRIUS Artist Name
  kind: query
  command: SATQSTN
  params: []

- id: sirius_title_query
  label: Query SIRIUS Title
  kind: query
  command: STIQSTN
  params: []

- id: sirius_channel_set
  label: Set SIRIUS Channel Number
  kind: action
  command: SCH{channel}
  params:
    - name: channel
      type: string
      description: "SIRIUS Channel Number 000-255, or UP/DOWN for wrap-around (SIRIUS Model Only)"

- id: sirius_channel_query
  label: Query SIRIUS Channel Number
  kind: query
  command: SCHQSTN
  params: []

- id: sirius_category_set
  label: Set SIRIUS Category
  kind: action
  command: SCT{category}
  params:
    - name: category
      type: string
      description: "SIRIUS Category Info, or UP/DOWN for wrap-around (SIRIUS Model Only)"

- id: sirius_category_query
  label: Query SIRIUS Category
  kind: query
  command: SCTQSTN
  params: []

- id: late_night_set
  label: Set Late Night
  kind: action
  command: LTN{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=Off, 01=Low@DD/On@TrueHD, 02=High@DD, 03=Auto@TrueHD, UP=Wrap-Around"

- id: late_night_query
  label: Query Late Night Level
  kind: query
  command: LTNQSTN
  params: []

- id: re_eq_set
  label: Set Re-EQ/Cinema Filter
  kind: action
  command: RAS{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=Both Off/Off, 01=Re-EQ On/On, 02=Academy On, UP=Wrap-Around"

- id: re_eq_query
  label: Query Re-EQ/Cinema Filter State
  kind: query
  command: RASQSTN
  params: []

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  command: DVL{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "03", "UP"]
      description: "00=Off, 01=Low, 02=Mid, 03=High, UP=Wrap-Around"

- id: dolby_volume_query
  label: Query Dolby Volume State
  kind: query
  command: DVLQSTN
  params: []

- id: music_optimizer_set
  label: Set Music Optimizer
  kind: action
  command: MOT{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "UP"]
      description: "00=Off, 01=On, UP=Wrap-Around"

- id: music_optimizer_query
  label: Query Music Optimizer State
  kind: query
  command: MOTQSTN
  params: []

- id: zone2_tone_set
  label: Zone 2 Set Tone
  kind: action
  command: ZTN{params}
  params:
    - name: params
      type: string
      description: "Bxx/Txx for bass/treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: zone2_tone_query
  label: Zone 2 Query Tone
  kind: query
  command: ZTNQSTN
  params: []

- id: zone2_balance_set
  label: Zone 2 Set Balance
  kind: action
  command: ZBL{balance}
  params:
    - name: balance
      type: string
      description: "xx balance value (-A to +A, -10 to +10 2-step), or UP/DOWN"

- id: zone2_balance_query
  label: Zone 2 Query Balance
  kind: query
  command: ZBLQSTN
  params: []

- id: zone2_listening_mode_set
  label: Zone 2 Set Listening Mode
  kind: action
  command: LMZ{mode}
  params:
    - name: mode
      type: enum
      values: ["00", "01", "0F", "12", "87", "88"]
      description: "00=STEREO, 01=DIRECT, 0F=MONO, 12=MULTIPLEX, 87=DVS(Pl2), 88=DVS(NEO6)"

- id: zone2_late_night_set
  label: Zone 2 Set Late Night
  kind: action
  command: LTZ{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=Off, 01=Low, 02=High, UP=Wrap-Around"

- id: zone2_late_night_query
  label: Zone 2 Query Late Night Level
  kind: query
  command: LTZQSTN
  params: []

- id: zone2_re_eq_set
  label: Zone 2 Set Re-EQ/Academy Filter
  kind: action
  command: RAZ{state}
  params:
    - name: state
      type: enum
      values: ["00", "01", "02", "UP"]
      description: "00=Both Off, 01=Re-EQ On, 02=Academy On, UP=Wrap-Around"

- id: zone2_re_eq_query
  label: Zone 2 Query Re-EQ/Academy Filter
  kind: query
  command: RAZQSTN
  params: []

- id: zone3_tone_set
  label: Zone 3 Set Tone
  kind: action
  command: TN3{params}
  params:
    - name: params
      type: string
      description: "Bxx/Txx for bass/treble (xx=-A to +A), or BUP/BDOWN/TUP/TDOWN"

- id: zone3_tone_query
  label: Zone 3 Query Tone
  kind: query
  command: TN3QSTN
  params: []

- id: zone3_balance_set
  label: Zone 3 Set Balance
  kind: action
  command: BL3{balance}
  params:
    - name: balance
      type: string
      description: "xx balance value (-A to +A), or UP/DOWN"

- id: zone3_balance_query
  label: Zone 3 Query Balance
  kind: query
  command: BL3QSTN
  params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["00", "01"]
    description: "00=Standby, 01=On"
    command: PWR

  - id: mute_state
    type: enum
    values: ["00", "01"]
    description: "00=Muting Off, 01=Muting On"
    command: AMT

  - id: volume_level
    type: string
    description: "Volume level in hex"
    command: MVL

  - id: input_selected
    type: enum
    values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32"]
    description: "Current input selector code"
    command: SLI

  - id: listening_mode
    type: string
    description: "Current listening mode code (hex)"
    command: LMD

  - id: sleep_time
    type: string
    description: "Sleep timer value (hex 01-5A or OFF)"
    command: SLP

  - id: dimmer_level
    type: enum
    values: ["00", "01", "02", "03", "08"]
    description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"
    command: DIM

  - id: display_mode
    type: enum
    values: ["00", "01", "02", "03"]
    command: DIF

  - id: hdmi_output
    type: enum
    values: ["00", "01", "02", "03", "04", "05"]
    command: HDO

  - id: audio_info
    type: string
    description: "Audio information string (same as front panel display)"
    command: IFA

  - id: video_info
    type: string
    description: "Video information string (same as front panel display)"
    command: IFV

  - id: net_play_status
    type: string
    description: "3-char play status: p=S/P/p/F/R, r=-/R/F/1, s=-/A"
    command: NST

  - id: net_artist
    type: string
    description: "Net/USB artist name (up to 64 chars)"
    command: NAT

  - id: net_album
    type: string
    description: "Net/USB album name (up to 64 chars)"
    command: NAL

  - id: net_title
    type: string
    description: "Net/USB title name (up to 64 chars)"
    command: NTI

  - id: net_time
    type: string
    description: "Net/USB time info (mm:ss/mm:ss elapsed/total)"
    command: NTM

  - id: net_track
    type: string
    description: "Net/USB track info (cccc/tttt current/total)"
    command: NTR

  - id: zone2_power_state
    type: enum
    values: ["00", "01"]
    description: "00=Standby, 01=On"
    command: ZPW

  - id: zone2_mute_state
    type: enum
    values: ["00", "01"]
    command: ZMT

  - id: zone2_volume
    type: string
    description: "Zone 2 volume level in hex"
    command: ZVL

  - id: zone3_power_state
    type: enum
    values: ["00", "01"]
    command: PW3

  - id: zone3_mute_state
    type: enum
    values: ["00", "01"]
    command: MT3

  - id: zone3_volume
    type: string
    command: VL3

  - id: zone4_power_state
    type: enum
    values: ["00", "01"]
    command: PW4

  - id: zone4_mute_state
    type: enum
    values: ["00", "01"]
    command: MT4

  - id: zone4_volume
    type: string
    command: VL4
```

## Variables
```yaml
variables:
  - id: master_volume
    label: Master Volume
    type: integer
    min: 0
    max: 100
    unit: "level (hex-encoded)"
    set_command: MVL{value}
    query_command: MVLQSTN

  - id: zone2_volume
    label: Zone 2 Volume
    type: integer
    min: 0
    max: 100
    unit: "level (hex-encoded)"
    set_command: ZVL{value}
    query_command: ZVLQSTN

  - id: zone3_volume
    label: Zone 3 Volume
    type: integer
    min: 0
    max: 100
    unit: "level (hex-encoded)"
    set_command: VL3{value}
    query_command: VL3QSTN

  - id: zone4_volume
    label: Zone 4 Volume
    type: integer
    min: 0
    max: 100
    unit: "level (hex-encoded)"
    set_command: VL4{value}
    query_command: VL4QSTN

  - id: subwoofer_temp_level
    label: Subwoofer Temporary Level
    type: string
    description: "-F to +C (-15dB to +12dB)"
    set_command: SWL{value}
    query_command: SWLQSTN

  - id: center_temp_level
    label: Center Temporary Level
    type: string
    description: "-C to +C (-12dB to +12dB)"
    set_command: CTL{value}
    query_command: CTLQSTN
```

## Events
```yaml
events:
  - id: status_notification
    description: "Unsolicited status message sent when receiver state changes (e.g. SLI03 when input changes). Same format as query response. Receiver responds within 50msec of state change."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Zone 2 volume/tone commands only work when main zone is ON"
  - description: "Zone 2 tone commands only work when Zone 2 is powered or variable"
  - description: "12V Trigger A/B/C commands only available when each trigger parameter is set to OFF in Setup Menu"
  - description: "Only one TCP client connection allowed at a time"
# UNRESOLVED: power-on sequencing requirements not stated in source
# UNRESOLVED: fault behavior and error recovery sequences not stated in source
```

## Notes
- ISCP protocol version documented as 1.15 (31 August 2009). The protocol document covers a family of Integra/Onkyo receivers; not all commands may apply to the DRX-R1.3 specifically.
- Volume levels are expressed in hexadecimal (e.g., `MVL32` = decimal 50).
- Preset numbers are in hexadecimal representation (e.g., `PRS28` = preset 40).
- The eISCP header is 16 bytes, big-endian. Header size field is `0x00000010`.
- FF/REW Net-Tune commands must be sent continuously with no more than 100ms between codes.
- Minimum 50ms interval between received messages.
- TCP connection must be persistent to receive unsolicited status notifications.
- The tuner function (TUNER/XM/SIRIUS/HD Radio) is shared across MAIN and ZONE zones.
- Zone 2 has both shared (TUN/PRS) and separated (TUZ/PRZ) tuner control variants.
- XM, SIRIUS, and HD Radio commands are model-dependent and may not be available on all units.
- Japanese models have additional VOS (Video Output Selector) command.
<!-- UNRESOLVED: exact eISCP end-of-message terminator for DRX-R1.3 not confirmed -->
<!-- UNRESOLVED: configurable TCP port range 49152-65535 stated but setup procedure not detailed -->
<!-- UNRESOLVED: tone commands for Front Wide (TFW), Front High (TFH), Surround (TSR), Surround Back (TSB), Subwoofer (TSW) documented but channel availability depends on speaker configuration -->
<!-- UNRESOLVED: Dolby Volume (DVL), Music Optimizer (MOT), Late Night (LTN), Re-EQ/Cinema Filter (RAS) commands documented but may vary by model -->
<!-- UNRESOLVED: RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) control external devices via RI link and are not direct receiver functions -->

## Provenance

```yaml
source_urls:
  - https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
source_documents:
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:20.402Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:22.333Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:24.367Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:26.686Z
  - title: "Integra public source"
    url: https://community.symcon.de/uploads/short-url/7mxbIQ7qRIghfbEQrvcrEkU57ad.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T09:20:31.200Z
retrieved_at: 2026-04-29T09:20:31.200Z
last_checked_at: 2026-04-26T13:46:38.053Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T13:46:38.053Z
matched_actions: 132
action_count: 132
confidence: high
summary: "All 132 spec actions matched literal wire tokens in source; transport values verbatim; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
