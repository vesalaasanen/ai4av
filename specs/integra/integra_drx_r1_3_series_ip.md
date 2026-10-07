---
spec_id: admin/integra-drx-r1-3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Integra DRX-R1.3 Series Control Spec"
manufacturer: Integra
model_family: DRX-R1.3
aliases: []
compatible_with:
  manufacturers:
    - Integra
  models:
    - DRX-R1.3
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T17:16:05.822Z
last_checked_at: 2026-10-07T17:16:05.822Z
generated_at: 2026-10-07T17:16:05.822Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact firmware versions compatible with this protocol version (1.15) not stated"
  - "maximum concurrent connection limit beyond \"one\" noted in source — unclear if this refers to total TCP sessions or simultaneous controllers"
  - "eISCP end-of-message character varies by model (\"[EOF]\" or \"[EOF][CR]\" or \"[EOF][CR][LF]\") — not pinned for DRX-R1.3 specifically"
  - "supplied generic receiver guide does not establish which commands or transports apply to DRX-R1.3"
  - "no multi-step macro sequences described in source"
  - "power-on sequencing requirements not stated in source"
  - "fault behavior and error recovery sequences not stated in source"
  - "exact eISCP end-of-message terminator for DRX-R1.3 not confirmed"
  - "configurable TCP port range 49152-65535 stated but setup procedure not detailed"
  - "tone commands for Front Wide (TFW), Front High (TFH), Surround (TSR), Surround Back (TSB), Subwoofer (TSW) documented but channel availability depends on speaker configuration"
  - "Dolby Volume (DVL), Music Optimizer (MOT), Late Night (LTN), Re-EQ/Cinema Filter (RAS) commands documented but may vary by model"
  - "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) control external devices via RI link and are not direct receiver functions"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:16:05.822Z
  matched_actions: 297
  action_count: 297
  confidence: medium
  summary: "All 297 action units match source ISCP codes and transport values. The guide is generic for Integra/Onkyo receivers and does not name the DRX-R1.3, so applicability carries a caveat. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Integra DRX-R1.3 Series Control Spec

## Summary
The Integra DRX-R1.3 is a multi-zone AV receiver. The supplied protocol guide describes ISCP (Integra Serial Control Protocol) over RS-232C and eISCP over TCP. It uses a fixed-format ASCII command structure: start character `!`, unit type `1` (Receiver), three-character command code, and variable-length parameter. The guide is for a family of Integra/Onkyo receivers and does not confirm which commands or transports apply to the DRX-R1.3. This draft transcribes the documented command groups; DRX-R1.3 applicability is UNRESOLVED.

<!-- UNRESOLVED: exact firmware versions compatible with this protocol version (1.15) not stated -->
<!-- UNRESOLVED: maximum concurrent connection limit beyond "one" noted in source — unclear if this refers to total TCP sessions or simultaneous controllers -->
<!-- UNRESOLVED: eISCP end-of-message character varies by model ("[EOF]" or "[EOF][CR]" or "[EOF][CR][LF]") — not pinned for DRX-R1.3 specifically -->
<!-- UNRESOLVED: supplied generic receiver guide does not establish which commands or transports apply to DRX-R1.3 -->

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
  type: UNRESOLVED  # source does not specify authentication
```

**ISCP message format (RS-232):**
Controller → Device: `!` + unit type (`1`) + 3-char command + parameter + `[CR]`/`[LF]`/`[CR][LF]`

Device → Controller: `!` + unit type (`1`) + 3-char command + parameter + `[EOF]`

**eISCP packet format (TCP):**
Header (16 bytes, big-endian): magic `ISCP` | header_size `0x00000010` | data_size | version `0x01` | reserved `0x000000`

Data: `!` + unit type (`1`) + 3-char command + parameter + `[EOF]`/`[EOF][CR]`/`[EOF][CR][LF]`

**Notes:**
- Connection must be held continuously; status notifications require a persistent connection.
- The source says the number of connections that can connect with a client is one; the meaning of this limit is unresolved.
- The interval between received messages must be more than 50 ms.

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
        type: enum
        values: ["00", "01", "02", "03", "04", "10", "20", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "80"]
        description: "SLZ input selector code"

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
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]
        description: "SL3 input selector code"

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
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32", "80"]
        description: "SL4 input selector code"

  # --- RECOUT Selector ---
  - id: recout_select
    label: Set RECOUT Selector
    kind: action
    command: SLR{input}
    params:
      - name: input
        type: enum
        values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "30", "31", "7F", "80"]
        description: "RECOUT input code"

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
        type: enum
        values: ["UP", "DOWN"]
        description: "UP/DOWN for wrap-around (XM Model Only); category value format is not specified"

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
        type: enum
        values: ["UP", "DOWN"]
        description: "UP/DOWN for wrap-around (SIRIUS Model Only); category value format is not specified"

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

  # --- Additional documented commands ---
  - id: speaker_a_wrap
    label: Speaker A Wrap-Around
    kind: action
    command: SPAUP
    params: []

  - id: speaker_b_wrap
    label: Speaker B Wrap-Around
    kind: action
    command: SPBUP
    params: []

  - id: speaker_layout_wrap
    label: Speaker Layout Wrap-Around
    kind: action
    command: SPLUP
    params: []

  - id: audio_selector_wrap
    label: Audio Selector Wrap-Around
    kind: action
    command: SLAUP
    params: []

  - id: display_mode_wrap
    label: Display Mode Wrap-Around
    kind: action
    command: DIFTG
    params: []

  - id: dimmer_wrap
    label: Dimmer Level Wrap-Around
    kind: action
    command: DIMDIM
    params: []

  - id: osd_audio
    label: OSD Audio Adjust
    kind: action
    command: OSDAUDIO
    params: []

  - id: osd_video
    label: OSD Video Adjust
    kind: action
    command: OSDVIDEO
    params: []

  - id: memory_lock
    label: Lock Memory
    kind: action
    command: MEMLOCK
    params: []

  - id: memory_unlock
    label: Unlock Memory
    kind: action
    command: MEMUNLK
    params: []

  - id: audio_info_query
    label: Query Audio Information
    kind: query
    command: IFAQSTN
    params: []

  - id: video_info_query
    label: Query Video Information
    kind: query
    command: IFVQSTN
    params: []

  - id: recout_query
    label: Query RECOUT Selector
    kind: query
    command: SLRQSTN
    params: []

  - id: resolution_up
    label: Monitor Out Resolution Wrap-Up
    kind: action
    command: RESUP
    params: []

  - id: resolution_query
    label: Query Monitor Out Resolution
    kind: query
    command: RESQSTN
    params: []

  - id: isf_mode_up
    label: ISF Mode Wrap-Up
    kind: action
    command: ISFUP
    params: []

  - id: isf_mode_query
    label: Query ISF Mode
    kind: query
    command: ISFQSTN
    params: []

  - id: tuner_query
    label: Query Tuner Frequency
    kind: query
    command: TUNQSTN
    params: []

  - id: preset_query
    label: Query Preset Number
    kind: query
    command: PRSQSTN
    params: []

  - id: preset_memory_set
    label: Set Preset Memory
    kind: action
    command: PRM{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E" sets Preset No. 1-30 (In hexadecimal representation)

  - id: lock_password_set
    label: Set SIRIUS Lock Password
    kind: action
    command: SLK{password}
    params:
      - name: password
        type: string
        description: "nnnn (4 Digits)"

  - id: sirius_lock_input
    label: Display SIRIUS Lock Password Prompt
    kind: action
    command: SLKINPUT
    params: []

  - id: sirius_lock_wrong
    label: Display SIRIUS Wrong Password
    kind: action
    command: SLKWRONG
    params: []

  - id: hd_radio_artist_query
    label: Query HD Radio Artist Name
    kind: query
    command: HATQSTN
    params: []

  - id: hd_radio_channel_name_query
    label: Query HD Radio Channel Name
    kind: query
    command: HCNQSTN
    params: []

  - id: hd_radio_title_query
    label: Query HD Radio Title
    kind: query
    command: HTIQSTN
    params: []

  - id: hd_radio_detail_query
    label: Query HD Radio Detail
    kind: query
    command: HDSQSTN
    params: []

  - id: hd_radio_program_set
    label: Set HD Radio Channel Program
    kind: action
    command: HPR{program}
    params:
      - name: program
        type: string
        description: "01"-"08"

  - id: hd_radio_program_query
    label: Query HD Radio Channel Program
    kind: query
    command: HPRQSTN
    params: []

  - id: hd_radio_blend_set
    label: Set HD Radio Blend Mode
    kind: action
    command: HBL{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01"]
        description: "00=Auto, 01=Analog"

  - id: hd_radio_blend_query
    label: Query HD Radio Blend Mode
    kind: query
    command: HBLQSTN
    params: []

  - id: hd_radio_status_query
    label: Query HD Radio Tuner Status
    kind: query
    command: HTSQSTN
    params: []

  - id: internet_radio_preset_set
    label: Set Internet Radio Preset
    kind: action
    command: NPR{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

  - id: zone2_tuner_set_frequency
    label: Zone 2 Set Tuner Frequency
    kind: action
    command: TUZ{freq}
    params:
      - name: freq
        type: string
        description: "nnnnn"

  - id: zone2_tuner_up
    label: Zone 2 Tuner Frequency Up
    kind: action
    command: TUZUP
    params: []

  - id: zone2_tuner_down
    label: Zone 2 Tuner Frequency Down
    kind: action
    command: TUZDOWN
    params: []

  - id: zone2_tuner_query
    label: Zone 2 Query Tuner Frequency
    kind: query
    command: TUZQSTN
    params: []

  - id: zone2_preset_set
    label: Zone 2 Set Preset
    kind: action
    command: PRZ{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

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

  - id: zone2_preset_query
    label: Zone 2 Query Preset Number
    kind: query
    command: PRZQSTN
    params: []

  - id: zone2_net_play
    label: Zone 2 Net/USB Play
    kind: action
    command: NTZPLAY
    params: []

  - id: zone2_net_stop
    label: Zone 2 Net/USB Stop
    kind: action
    command: NTZSTOP
    params: []

  - id: zone2_net_pause
    label: Zone 2 Net/USB Pause
    kind: action
    command: NTZPAUSE
    params: []

  - id: zone2_net_track_up
    label: Zone 2 Net/USB Track Up
    kind: action
    command: NTZTRUP
    params: []

  - id: zone2_net_track_down
    label: Zone 2 Net/USB Track Down
    kind: action
    command: NTZTRDN
    params: []

  - id: zone2_net_channel_up
    label: Zone 2 Net/USB Channel Up
    kind: action
    command: NTZCHUP
    params: []

  - id: zone2_net_channel_down
    label: Zone 2 Net/USB Channel Down
    kind: action
    command: NTZCHDN
    params: []

  - id: zone2_internet_radio_preset_set
    label: Zone 2 Set Internet Radio Preset
    kind: action
    command: NPZ{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

  - id: zone3_tuner_set_frequency
    label: Zone 3 Set Tuner Frequency
    kind: action
    command: TU3{freq}
    params:
      - name: freq
        type: string
        description: "nnnnn"

  - id: zone3_tuner_up
    label: Zone 3 Tuner Frequency Up
    kind: action
    command: TU3UP
    params: []

  - id: zone3_tuner_down
    label: Zone 3 Tuner Frequency Down
    kind: action
    command: TU3DOWN
    params: []

  - id: zone3_tuner_query
    label: Zone 3 Query Tuner Frequency
    kind: query
    command: TU3QSTN
    params: []

  - id: zone3_preset_set
    label: Zone 3 Set Preset
    kind: action
    command: PR3{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

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

  - id: zone3_preset_query
    label: Zone 3 Query Preset Number
    kind: query
    command: PR3QSTN
    params: []

  - id: zone3_net_play
    label: Zone 3 Net/USB Play
    kind: action
    command: NT3PLAY
    params: []

  - id: zone3_net_stop
    label: Zone 3 Net/USB Stop
    kind: action
    command: NT3STOP
    params: []

  - id: zone3_net_pause
    label: Zone 3 Net/USB Pause
    kind: action
    command: NT3PAUSE
    params: []

  - id: zone3_net_track_up
    label: Zone 3 Net/USB Track Up
    kind: action
    command: NT3TRUP
    params: []

  - id: zone3_net_track_down
    label: Zone 3 Net/USB Track Down
    kind: action
    command: NT3TRDN
    params: []

  - id: zone3_net_channel_up
    label: Zone 3 Net/USB Channel Up
    kind: action
    command: NT3CHUP
    params: []

  - id: zone3_net_channel_down
    label: Zone 3 Net/USB Channel Down
    kind: action
    command: NT3CHDN
    params: []

  - id: zone3_internet_radio_preset_set
    label: Zone 3 Set Internet Radio Preset
    kind: action
    command: NP3{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

  - id: zone4_tuner_set_frequency
    label: Zone 4 Set Tuner Frequency
    kind: action
    command: TU4{freq}
    params:
      - name: freq
        type: string
        description: "nnnnn"

  - id: zone4_tuner_up
    label: Zone 4 Tuner Frequency Up
    kind: action
    command: TU4UP
    params: []

  - id: zone4_tuner_down
    label: Zone 4 Tuner Frequency Down
    kind: action
    command: TU4DOWN
    params: []

  - id: zone4_tuner_query
    label: Zone 4 Query Tuner Frequency
    kind: query
    command: TU4QSTN
    params: []

  - id: zone4_preset_set
    label: Zone 4 Set Preset
    kind: action
    command: PR4{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

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

  - id: zone4_preset_query
    label: Zone 4 Query Preset Number
    kind: query
    command: PR4QSTN
    params: []

  - id: zone4_net_play
    label: Zone 4 Net/USB Play
    kind: action
    command: NT4PLAY
    params: []

  - id: zone4_net_stop
    label: Zone 4 Net/USB Stop
    kind: action
    command: NT4STOP
    params: []

  - id: zone4_net_pause
    label: Zone 4 Net/USB Pause
    kind: action
    command: NT4PAUSE
    params: []

  - id: zone4_net_track_up
    label: Zone 4 Net/USB Track Up
    kind: action
    command: NT4TRUP
    params: []

  - id: zone4_net_track_down
    label: Zone 4 Net/USB Track Down
    kind: action
    command: NT4TRDN
    params: []

  - id: zone4_internet_radio_preset_set
    label: Zone 4 Set Internet Radio Preset
    kind: action
    command: NP4{preset}
    params:
      - name: preset
        type: string
        description: "01"-"28" sets Preset No. 1-40 (In hexadecimal representation)

  # --- Additional source-documented commands ---
  - id: display_information_set
    label: Set Display Information
    kind: action
    command: DIF{mode}
    params:
      - name: mode
        type: enum
        values: ["00", "01", "02", "03", "04"]
        description: "00=Display Program Format, 01=Display Digital Input Position, 02=Display Digital Format Position, 03=Display Bass Level, 04=Display Treble Level"

  - id: hdmi_output_wrap
    label: HDMI Output Wrap-Around
    kind: action
    command: HDOUP
    params: []

  - id: zone2_mute_toggle
    label: Zone 2 Mute Toggle
    kind: action
    command: ZMTTG
    params: []

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

  - id: center_level_set
    label: Set Center Temporary Level
    kind: action
    command: CTL{level}
    params:
      - name: level
        type: string
        description: "-C"-"00"-"+C" sets Center Level -12dB-0dB-+12dB, or UP/DOWN

  - id: net_display
    label: Net/USB Display
    kind: action
    command: NTCDISPLAY
    params: []

  - id: net_album
    label: Net/USB Album
    kind: action
    command: NTCALBUM
    params: []

  - id: net_artist
    label: Net/USB Artist
    kind: action
    command: NTCARTIST
    params: []

  - id: net_genre
    label: Net/USB Genre
    kind: action
    command: NTCGENRE
    params: []

  - id: net_playlist
    label: Net/USB Playlist
    kind: action
    command: NTCPLAYLIST
    params: []

  - id: net_right
    label: Net/USB Right
    kind: action
    command: NTCRIGHT
    params: []

  - id: net_left
    label: Net/USB Left
    kind: action
    command: NTCLEFT
    params: []

  - id: net_up
    label: Net/USB Up
    kind: action
    command: NTCUP
    params: []

  - id: net_down
    label: Net/USB Down
    kind: action
    command: NTCDOWN
    params: []

  - id: net_select
    label: Net/USB Select
    kind: action
    command: NTCSELECT
    params: []

  - id: net_digit_set
    label: Set Net/USB Digit
    kind: action
    command: NTC{digit}
    params:
      - name: digit
        type: string
        description: "0"-"9"

  - id: net_delete
    label: Net/USB Delete
    kind: action
    command: NTCDELETE
    params: []

  - id: net_caps
    label: Net/USB Caps
    kind: action
    command: NTCCAPS
    params: []

  - id: net_location
    label: Net/USB Location
    kind: action
    command: NTCLOCATION
    params: []

  - id: net_language
    label: Net/USB Language
    kind: action
    command: NTCLANGUAGE
    params: []

  - id: net_setup
    label: Net/USB Setup
    kind: action
    command: NTCSETUP
    params: []

  - id: net_return
    label: Net/USB Return
    kind: action
    command: NTCRETURN
    params: []

  - id: net_channel_up
    label: Net/USB Channel Up
    kind: action
    command: NTCCHUP
    params: []

  - id: net_channel_down
    label: Net/USB Channel Down
    kind: action
    command: NTCCHDN
    params: []

  - id: audyssey_wrap
    label: Audyssey EQ Wrap-Around
    kind: action
    command: ADYUP
    params: []

  - id: audyssey_dynamic_eq_wrap
    label: Audyssey Dynamic EQ Wrap-Around
    kind: action
    command: ADQUP
    params: []

  - id: audyssey_dynamic_volume_wrap
    label: Audyssey Dynamic Volume Wrap-Around
    kind: action
    command: ADVUP
    params: []

  - id: dolby_volume_wrap
    label: Dolby Volume Wrap-Around
    kind: action
    command: DVLUP
    params: []

  - id: music_optimizer_wrap
    label: Music Optimizer Wrap-Around
    kind: action
    command: MOTUP
    params: []

  - id: zone3_volume_up
    label: Zone 3 Volume Up
    kind: action
    command: VL3UP
    params: []

  - id: zone3_volume_down
    label: Zone 3 Volume Down
    kind: action
    command: VL3DOWN
    params: []

  - id: zone4_volume_up
    label: Zone 4 Volume Up
    kind: action
    command: VL4UP
    params: []

  - id: zone4_volume_down
    label: Zone 4 Volume Down
    kind: action
    command: VL4DOWN
    params: []

  - id: zone4_mute_toggle
    label: Zone 4 Mute Toggle
    kind: action
    command: MT4TG
    params: []

  - id: speaker_a_query
    label: Query Speaker A State
    kind: query
    command: SPAQSTN
    params: []

  - id: speaker_b_query
    label: Query Speaker B State
    kind: query
    command: SPBQSTN
    params: []

  - id: zone2_input_query
    label: Query Zone 2 Input Selector
    kind: query
    command: SLZQSTN
    params: []

  - id: zone3_input_query
    label: Query Zone 3 Input Selector
    kind: query
    command: SL3QSTN
    params: []

  - id: zone4_input_query
    label: Query Zone 4 Input Selector
    kind: query
    command: SL4QSTN
    params: []

  - id: ri_cd_player_operation
    label: CD Player Operation
    kind: action
    command: CCD{key}
    params:
      - name: key
        type: enum
        values: ["POWER", "TRACK", "PLAY", "STOP", "PAUSE", "SKIP.F", "SKIP.R", "MEMORY", "CLEAR", "REPEAT", "RANDOM", "DISP", "D.MODE", "FF", "REW", "OP/CL", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "+10", "D.SKIP", "DISC.F", "DISC.R", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "STBY", "PON"]

  - id: ri_tape1_operation
    label: TAPE1 Operation
    kind: action
    command: CT1{key}
    params:
      - name: key
        type: enum
        values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW"]

  - id: ri_tape2_operation
    label: TAPE2 Operation
    kind: action
    command: CT2{key}
    params:
      - name: key
        type: enum
        values: ["PLAY.F", "PLAY.R", "STOP", "RC/PAU", "FF", "REW", "OP/CL", "SKIP.F", "SKIP.R", "REC"]

  - id: ri_graphics_equalizer_operation
    label: Graphics Equalizer Operation
    kind: action
    command: CEQ{key}
    params:
      - name: key
        type: enum
        values: ["POWER", "PRESET"]

  - id: ri_dat_recorder_operation
    label: DAT Recorder Operation
    kind: action
    command: CDT{key}
    params:
      - name: key
        type: enum
        values: ["PLAY", "RC/PAU", "STOP", "SKIP.F", "SKIP.R", "FF", "REW"]

  - id: ri_dvd_player_operation
    label: DVD Player Operation
    kind: action
    command: CDV{key}
    params:
      - name: key
        type: enum
        values: ["POWER", "PWRON", "PWROFF", "PLAY", "STOP", "SKIP.F", "SKIP.R", "FF", "REW", "PAUSE", "LASTPLAY", "SUBTON/OFF", "SUBTITLE", "SETUP", "TOPMENU", "MENU", "UP", "DOWN", "LEFT", "RIGHT", "ENTER", "RETURN", "DISC.F", "DISC.R", "AUDIO", "RANDOM", "OP/CL", "ANGLE", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "SEARCH", "DISP", "REPEAT", "MEMORY", "CLEAR", "ABR", "STEP.F", "STEP.R", "SLOW.F", "SLOW.R", "ZOOMTG", "ZOOMUP", "ZOOMDN", "PROGRE", "VDOFF", "CONMEM", "FUNMEM", "DISC1", "DISC2", "DISC3", "DISC4", "DISC5", "DISC6", "FOLDUP", "FOLDDN", "P.MODE", "ASCTG", "CDPCD", "MSPUP", "MSPDN", "PCT", "RSCTG", "INIT"]

  - id: ri_md_recorder_operation
    label: MD Recorder Operation
    kind: action
    command: CMD{key}
    params:
      - name: key
        type: enum
        values: ["POWER", "PLAY", "STOP", "FF", "REW", "P.MODE", "SKIP.F", "SKIP.R", "PAUSE", "REC", "MEMORY", "DISP", "SCROLL", "M.SCAN", "CLEAR", "RANDOM", "REPEAT", "ENTER", "EJECT", "NAME", "GROUP", "STBY"]
        description: "0-10/0 and nn/nnn are documented command ranges"

  - id: ri_cd_r_recorder_operation
    label: CD-R Recorder Operation
    kind: action
    command: CCR{key}
    params:
      - name: key
        type: enum
        values: ["POWER", "P.MODE", "PLAY", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "REC", "CLEAR", "REPEAT", "SCROLL", "OP/CL", "DISP", "RANDOM", "MEMORY", "FF", "REW", "STBY"]
        description: "0-10/0 and nn/nnn are documented command ranges"

  - id: ri_dock_operation
    label: Dock Operation
    kind: action
    command: CDS{key}
    params:
      - name: key
        type: enum
        values: ["PWRON", "PWROFF", "PLY/RES", "STOP", "SKIP.F", "SKIP.R", "PAUSE", "PLY/PAU", "FF", "REW", "ALBUM+", "ALBUM-", "PLIST+", "PLIST-", "CHAPT+", "CHAPT-", "RANDOM", "REPEAT", "MUTE", "BLIGHT", "MENU", "ENTER", "UP", "DOWN"]
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: ["00", "01"]
    description: "00=Standby, 01=On"
    command: PWR
    query_command: PWRQSTN

  - id: mute_state
    type: enum
    values: ["00", "01"]
    description: "00=Muting Off, 01=Muting On"
    command: AMT
    query_command: AMTQSTN

  - id: volume_level
    type: string
    description: "Volume level in hex"
    command: MVL
    query_command: MVLQSTN

  - id: input_selected
    type: enum
    values: ["00", "01", "02", "03", "04", "05", "06", "10", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2A", "40", "30", "31", "32"]
    description: "Current input selector code"
    command: SLI
    query_command: SLIQSTN

  - id: listening_mode
    type: string
    description: "Current listening mode code (hex)"
    command: LMD
    query_command: LMDQSTN

  - id: sleep_time
    type: string
    description: "Sleep timer value (hex 01-5A or OFF)"
    command: SLP
    query_command: SLPQSTN

  - id: dimmer_level
    type: enum
    values: ["00", "01", "02", "03", "08"]
    description: "00=Bright, 01=Dim, 02=Dark, 03=Shut-Off, 08=Bright & LED OFF"
    command: DIM
    query_command: DIMQSTN

  - id: display_mode
    type: enum
    values: ["00", "01", "02", "03"]
    command: DIF
    query_command: DIFQSTN

  - id: hdmi_output
    type: enum
    values: ["00", "01", "02", "03", "04", "05"]
    command: HDO
    query_command: HDOQSTN

  - id: audio_info
    type: string
    description: "Audio information string (same as front panel display)"
    command: IFA
    query_command: IFAQSTN

  - id: video_info
    type: string
    description: "Video information string (same as front panel display)"
    command: IFV
    query_command: IFVQSTN

  - id: net_play_status
    type: string
    description: "3-char play status: p=S/P/p/F/R, r=-/R/F/1, s=-/A"
    command: NST
    query_command: NSTQSTN

  - id: net_artist
    type: string
    description: "Net/USB artist name (up to 64 chars)"
    command: NAT
    query_command: NATQSTN

  - id: net_album
    type: string
    description: "Net/USB album name (up to 64 chars)"
    command: NAL
    query_command: NALQSTN

  - id: net_title
    type: string
    description: "Net/USB title name (up to 64 chars)"
    command: NTI
    query_command: NTIQSTN

  - id: net_time
    type: string
    description: "Net/USB time info (mm:ss/mm:ss elapsed/total)"
    command: NTM
    query_command: NTMQSTN

  - id: net_track
    type: string
    description: "Net/USB track info (cccc/tttt current/total)"
    command: NTR
    query_command: NTRQSTN

  - id: zone2_power_state
    type: enum
    values: ["00", "01"]
    description: "00=Standby, 01=On"
    command: ZPW
    query_command: ZPWQSTN

  - id: zone2_mute_state
    type: enum
    values: ["00", "01"]
    command: ZMT
    query_command: ZMTQSTN

  - id: zone2_volume
    type: string
    description: "Zone 2 volume level in hex"
    command: ZVL
    query_command: ZVLQSTN

  - id: zone3_power_state
    type: enum
    values: ["00", "01"]
    command: PW3
    query_command: PW3QSTN

  - id: zone3_mute_state
    type: enum
    values: ["00", "01"]
    command: MT3
    query_command: MT3QSTN

  - id: zone3_volume
    type: string
    command: VL3
    query_command: VL3QSTN

  - id: zone4_power_state
    type: enum
    values: ["00", "01"]
    command: PW4
    query_command: PW4QSTN

  - id: zone4_mute_state
    type: enum
    values: ["00", "01"]
    command: MT4
    query_command: MT4QSTN

  - id: zone4_volume
    type: string
    command: VL4
    query_command: VL4QSTN
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
  - description: "The source says the number of connections that can connect with a client is one; the meaning of this limit is unresolved"
# UNRESOLVED: power-on sequencing requirements not stated in source
# UNRESOLVED: fault behavior and error recovery sequences not stated in source
```

## Notes
- ISCP protocol version documented as 1.15 (31 August 2009). The protocol document covers a family of Integra/Onkyo receivers; it does not confirm applicability to the DRX-R1.3 or which listed commands apply to it.
- Volume levels are expressed in hexadecimal (e.g., `MVL32` = decimal 50).
- Preset numbers are in hexadecimal representation (e.g., `PRS28` = preset 40).
- The eISCP header is 16 bytes, big-endian. Header size field is `0x00000010`.
- FF/REW Net-Tune commands must be sent continuously with no more than 100ms between codes.
- The interval between received messages must be more than 50 ms.
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
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T17:16:05.822Z
last_checked_at: 2026-10-07T17:16:05.822Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:16:05.822Z
matched_actions: 297
action_count: 297
confidence: medium
summary: "All 297 action units match source ISCP codes and transport values. The guide is generic for Integra/Onkyo receivers and does not name the DRX-R1.3, so applicability carries a caveat. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact firmware versions compatible with this protocol version (1.15) not stated"
- "maximum concurrent connection limit beyond \"one\" noted in source — unclear if this refers to total TCP sessions or simultaneous controllers"
- "eISCP end-of-message character varies by model (\"[EOF]\" or \"[EOF][CR]\" or \"[EOF][CR][LF]\") — not pinned for DRX-R1.3 specifically"
- "supplied generic receiver guide does not establish which commands or transports apply to DRX-R1.3"
- "no multi-step macro sequences described in source"
- "power-on sequencing requirements not stated in source"
- "fault behavior and error recovery sequences not stated in source"
- "exact eISCP end-of-message terminator for DRX-R1.3 not confirmed"
- "configurable TCP port range 49152-65535 stated but setup procedure not detailed"
- "tone commands for Front Wide (TFW), Front High (TFH), Surround (TSR), Surround Back (TSB), Subwoofer (TSW) documented but channel availability depends on speaker configuration"
- "Dolby Volume (DVL), Music Optimizer (MOT), Late Night (LTN), Re-EQ/Cinema Filter (RAS) commands documented but may vary by model"
- "RI system commands (CCD, CT1, CT2, CEQ, CDT, CDV, CMD, CCR, CDS) control external devices via RI link and are not direct receiver functions"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
