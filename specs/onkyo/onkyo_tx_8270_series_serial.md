---
spec_id: admin/onkyo-tx-8270-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Onkyo TX-8270 Series Control Spec"
manufacturer: Onkyo
model_family: "Onkyo TX-8270 Series"
aliases: []
compatible_with:
  manufacturers:
    - Onkyo
  models:
    - "Onkyo TX-8270 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T20:45:04.082Z
last_checked_at: 2026-10-07T20:45:04.082Z
generated_at: 2026-10-07T20:45:04.082Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific TX-8270 feature subset not confirmed — source is a generic ISCP protocol document covering multiple receiver models"
  - "no distinct settable parameters beyond what is covered by actions and feedbacks"
  - "no multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "which specific commands the TX-8270 supports from this generic ISCP document is not confirmed"
  - "firmware version compatibility not stated in source"
  - "protocol version compatibility beyond v1.15 not stated"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:45:04.082Z
  matched_actions: 254
  action_count: 254
  confidence: medium
  summary: "All 254 action units match source ISCP tokens and values; transport matches (auth unresolved); every source command is covered across Actions and Feedbacks. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Onkyo TX-8270 Series Control Spec

## Summary
The Onkyo TX-8270 Series is an AV receiver controllable via ISCP (Integra Serial Control Protocol) over RS-232C serial and TCP/IP (eISCP). Commands use a fixed 3-character command code with variable-length parameters. This spec covers both serial and Ethernet control interfaces including power, volume, input selection, listening modes, tuner, Zone 2/3/4, and RI system peripheral commands.

<!-- UNRESOLVED: specific TX-8270 feature subset not confirmed — source is a generic ISCP protocol document covering multiple receiver models -->

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
  connector: DB9 female (pin 2 TX, pin 3 RX, pin 5 GND, straight-thru cable)
addressing:
  port: 60128  # default; configurable 49152-65535
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable      # inferred from PWR power on/off/standby commands
  - queryable      # inferred from QSTN queries on most commands
  - routable       # inferred from SLI/SLZ/SL3/SL4 input selector commands
  - levelable      # inferred from MVL/ZVL/VL3/VL4 volume and tone commands
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "!1PWR01"
    description: "Sets System On"
    params: []

  - id: power_standby
    label: Power Standby
    kind: action
    command: "!1PWR00"
    description: "Sets System Standby"
    params: []

  - id: mute_on
    label: Mute On
    kind: action
    command: "!1AMT01"
    description: "Sets Audio Muting On"
    params: []

  - id: mute_off
    label: Mute Off
    kind: action
    command: "!1AMT00"
    description: "Sets Audio Muting Off"
    params: []

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "!1AMTTG"
    description: "Sets Audio Muting Wrap-Around"
    params: []

  - id: volume_set
    label: Set Volume Level
    kind: action
    command: "!1MVL{level}"
    description: "Sets volume level in hex (00-64 for 0-100, or 00-50 for 0-80)"
    params:
      - name: level
        type: string
        description: "Hex value 00-64 (volume level 0-100)"

  - id: volume_up
    label: Volume Up
    kind: action
    command: "!1MVLUP"
    description: "Sets Volume Level Up"
    params: []

  - id: volume_down
    label: Volume Down
    kind: action
    command: "!1MVLDOWN"
    description: "Sets Volume Level Down"
    params: []

  - id: volume_up_1db
    label: Volume Up 1dB
    kind: action
    command: "!1MVLUP1"
    description: "Sets Volume Level Up 1dB Step"
    params: []

  - id: volume_down_1db
    label: Volume Down 1dB
    kind: action
    command: "!1MVLDOWN1"
    description: "Sets Volume Level Down 1dB Step"
    params: []

  - id: select_input
    label: Select Input
    kind: action
    command: "!1SLI{input}"
    description: "Selects input source by hex code"
    params:
      - name: input
        type: enum
        description: "Input selector code"
        values:
          - value: "00"
            label: "VCR/DVR (VIDEO1)"
          - value: "01"
            label: "CBL/SAT (VIDEO2)"
          - value: "02"
            label: "GAME/TV (VIDEO3)"
          - value: "03"
            label: "AUX1"
          - value: "04"
            label: "AUX2 (VIDEO5)"
          - value: "05"
            label: "VIDEO6"
          - value: "06"
            label: "VIDEO7"
          - value: "10"
            label: "DVD"
          - value: "20"
            label: "TV/TAPE"
          - value: "22"
            label: "PHONO"
          - value: "23"
            label: "CD"
          - value: "24"
            label: "FM"
          - value: "25"
            label: "AM"
          - value: "26"
            label: "TUNER"
          - value: "27"
            label: "MUSIC SERVER"
          - value: "28"
            label: "INTERNET RADIO"
          - value: "29"
            label: "USB/USB Front"
          - value: "2A"
            label: "USB Rear"
          - value: "40"
            label: "Universal PORT"

  - id: input_up
    label: Input Selector Up
    kind: action
    command: "!1SLIUP"
    description: "Sets Selector Position Wrap-Around Up"
    params: []

  - id: input_down
    label: Input Selector Down
    kind: action
    command: "!1SLIDOWN"
    description: "Sets Selector Position Wrap-Around Down"
    params: []

  - id: speaker_a_set
    label: Speaker A Set
    kind: action
    command: "!1SPA{state}"
    description: "Sets Speaker A On/Off"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: speaker_b_set
    label: Speaker B Set
    kind: action
    command: "!1SPB{state}"
    description: "Sets Speaker B On/Off"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: listening_mode_set
    label: Set Listening Mode
    kind: action
    command: "!1LMD{mode}"
    description: "Sets listening mode by hex code"
    params:
      - name: mode
        type: enum
        description: "Listening mode code"
        values:
          - value: "00"
            label: "STEREO"
          - value: "01"
            label: "DIRECT"
          - value: "02"
            label: "SURROUND"
          - value: "0F"
            label: "MONO"
          - value: "11"
            label: "PURE AUDIO"
          - value: "0C"
            label: "ALL CH STEREO"
          - value: "0D"
            label: "THEATER-DIMENSIONAL"
          - value: "80"
            label: "PLII/PLIIx Movie"
          - value: "81"
            label: "PLII/PLIIx Music"
          - value: "82"
            label: "Neo:6 Cinema"
          - value: "83"
            label: "Neo:6 Music"
          - value: "86"
            label: "PLII/PLIIx Game"

  - id: dimmer_set
    label: Set Dimmer Level
    kind: action
    command: "!1DIM{level}"
    description: "Sets display dimmer level"
    params:
      - name: level
        type: enum
        values:
          - value: "00"
            label: "Bright"
          - value: "01"
            label: "Dim"
          - value: "02"
            label: "Dark"
          - value: "03"
            label: "Shut-Off"
          - value: "08"
            label: "Bright & LED OFF"

  - id: sleep_set
    label: Set Sleep Timer
    kind: action
    command: "!1SLP{time}"
    description: "Sets sleep timer in hex (01-5A for 1-90 min)"
    params:
      - name: time
        type: string
        description: "Hex value 01-5A (1-90 minutes), or OFF"

  - id: display_mode_set
    label: Set Display Mode
    kind: action
    command: "!1DIF{mode}"
    description: "Sets display mode"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "Selector + Volume"
          - value: "01"
            label: "Selector + Listening Mode"

  - id: audio_selector_set
    label: Set Audio Selector
    kind: action
    command: "!1SLA{mode}"
    description: "Sets audio input selector"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "AUTO"
          - value: "02"
            label: "ANALOG"
          - value: "04"
            label: "HDMI"
          - value: "05"
            label: "COAX/OPT"

  - id: tone_front_set
    label: Set Front Tone
    kind: action
    command: "!1TFR{bass}{treble}"
    description: "Sets front bass and treble (-10 to +10, 2-step)"
    params:
      - name: bass
        type: string
        description: "Bxx where xx is -A to +A (-10 to +10, 2 step)"
      - name: treble
        type: string
        description: "Txx where xx is -A to +A (-10 to +10, 2 step)"

  - id: tone_center_set
    label: Set Center Tone
    kind: action
    command: "!1TCT{bass}{treble}"
    description: "Sets center bass and treble"
    params:
      - name: bass
        type: string
      - name: treble
        type: string

  - id: subwoofer_level_set
    label: Set Subwoofer Level
    kind: action
    command: "!1SWL{level}"
    description: "Sets temporary subwoofer level"
    params:
      - name: level
        type: string
        description: "-F to +C (-15dB to +12dB)"

  - id: center_level_set
    label: Set Center Level
    kind: action
    command: "!1CTL{level}"
    description: "Sets temporary center level"
    params:
      - name: level
        type: string
        description: "-C to +C (-12dB to +12dB)"

  - id: hdmi_output_set
    label: Set HDMI Output
    kind: action
    command: "!1HDO{mode}"
    description: "Sets HDMI output selector"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "No Analog"
          - value: "01"
            label: "Out Main HDMI Main"
          - value: "02"
            label: "Out Sub HDMI Sub"
          - value: "03"
            label: "Both"
          - value: "04"
            label: "Both (Main)"
          - value: "05"
            label: "Both (Sub)"

  - id: monitor_resolution_set
    label: Set Monitor Out Resolution
    kind: action
    command: "!1RES{mode}"
    description: "Sets monitor output resolution"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "Through"
          - value: "01"
            label: "Auto (HDMI only)"
          - value: "02"
            label: "480p"
          - value: "03"
            label: "720p"
          - value: "04"
            label: "1080i"
          - value: "05"
            label: "1080p (HDMI only)"
          - value: "06"
            label: "Source"

  - id: trigger_a_set
    label: Set 12V Trigger A
    kind: action
    command: "!1TGA{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: trigger_b_set
    label: Set 12V Trigger B
    kind: action
    command: "!1TGB{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: trigger_c_set
    label: Set 12V Trigger C
    kind: action
    command: "!1TGC{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: network_play
    label: Network/USB Play
    kind: action
    command: "!1NTCPLAY"
    params: []

  - id: network_stop
    label: Network/USB Stop
    kind: action
    command: "!1NTCSTOP"
    params: []

  - id: network_pause
    label: Network/USB Pause
    kind: action
    command: "!1NTCPAUSE"
    params: []

  - id: network_track_up
    label: Network/USB Track Up
    kind: action
    command: "!1NTCTRUP"
    params: []

  - id: network_track_down
    label: Network/USB Track Down
    kind: action
    command: "!1NTCTRDN"
    params: []

  - id: network_ff
    label: Network/USB Fast Forward
    kind: action
    command: "!1NTCFF"
    params: []

  - id: network_rew
    label: Network/USB Rewind
    kind: action
    command: "!1NTCREW"
    params: []

  - id: network_repeat
    label: Network/USB Repeat
    kind: action
    command: "!1NTCREPEAT"
    params: []

  - id: network_random
    label: Network/USB Random
    kind: action
    command: "!1NTCRANDOM"
    params: []

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

  - id: zone2_volume_set
    label: Zone 2 Set Volume
    kind: action
    command: "!1ZVL{level}"
    params:
      - name: level
        type: string
        description: "Hex value 00-64 (0-100) or 00-50 (0-80)"

  - id: zone2_select_input
    label: Zone 2 Select Input
    kind: action
    command: "!1SLZ{input}"
    params:
      - name: input
        type: string
        description: "Input selector hex code (same codes as main SLI)"

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

  - id: zone3_volume_set
    label: Zone 3 Set Volume
    kind: action
    command: "!1VL3{level}"
    params:
      - name: level
        type: string

  - id: zone3_select_input
    label: Zone 3 Select Input
    kind: action
    command: "!1SL3{input}"
    params:
      - name: input
        type: string

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

  - id: zone4_volume_set
    label: Zone 4 Set Volume
    kind: action
    command: "!1VL4{level}"
    params:
      - name: level
        type: string

  - id: zone4_select_input
    label: Zone 4 Select Input
    kind: action
    command: "!1SL4{input}"
    params:
      - name: input
        type: string

  - id: tuner_set_frequency
    label: Set Tuner Frequency
    kind: action
    command: "!1TUN{freq}"
    description: "Sets tuning frequency directly (FM nnn.nn MHz / AM nnnnn kHz)"
    params:
      - name: freq
        type: string
        description: "5-digit frequency value"

  - id: preset_set
    label: Set Preset
    kind: action
    command: "!1PRS{num}"
    description: "Sets preset number in hex (01-28 for 1-40)"
    params:
      - name: num
        type: string
        description: "Hex preset number"

  - id: audyssey_set
    label: Set Audyssey EQ
    kind: action
    command: "!1ADY{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: dynamic_eq_set
    label: Set Audyssey Dynamic EQ
    kind: action
    command: "!1ADQ{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: dynamic_volume_set
    label: Set Audyssey Dynamic Volume
    kind: action
    command: "!1ADV{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "Light"
          - value: "02"
            label: "Medium"
          - value: "03"
            label: "Heavy"

  - id: music_optimizer_set
    label: Set Music Optimizer
    kind: action
    command: "!1MOT{state}"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"

  - id: speaker_a_cycle
    label: Cycle Speaker A
    kind: action
    command: "SPA"
    description: "Append the documented parameter to this source command token before ISCP framing."
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around"

  - id: speaker_b_cycle
    label: Cycle Speaker B
    kind: action
    command: "SPB"
    description: "Append the documented parameter to this source command token before ISCP framing."
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around"

  - id: speaker_layout_set
    label: Set Speaker Layout
    kind: action
    command: "SPL"
    params:
      - name: layout
        type: enum
        values:
          - value: "SB"
            label: "SurrBack Speaker"
          - value: "FH"
            label: "Front High Speaker / SurrBack+Front High Speakers"
          - value: "FW"
            label: "Front Wide Speaker / SurrBack+Front Wide Speakers"
          - value: "UP"
            label: "Wrap-Around"

  - id: tone_front_adjust
    label: Adjust Front Tone
    kind: action
    command: "TFR"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_front_wide_set
    label: Set Front Wide Tone
    kind: action
    command: "TFW"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: tone_front_wide_adjust
    label: Adjust Front Wide Tone
    kind: action
    command: "TFW"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_front_high_set
    label: Set Front High Tone
    kind: action
    command: "TFH"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: tone_front_high_adjust
    label: Adjust Front High Tone
    kind: action
    command: "TFH"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_center_adjust
    label: Adjust Center Tone
    kind: action
    command: "TCT"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_surround_set
    label: Set Surround Tone
    kind: action
    command: "TSR"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: tone_surround_adjust
    label: Adjust Surround Tone
    kind: action
    command: "TSR"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_surround_back_set
    label: Set Surround Back Tone
    kind: action
    command: "TSB"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: tone_surround_back_adjust
    label: Adjust Surround Back Tone
    kind: action
    command: "TSB"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: tone_subwoofer_set
    label: Set Subwoofer Tone
    kind: action
    command: "TSW"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: tone_subwoofer_adjust
    label: Adjust Subwoofer Tone
    kind: action
    command: "TSW"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"

  - id: sleep_cycle
    label: Cycle Sleep Timer
    kind: action
    command: "SLP"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: speaker_level_calibration
    label: Speaker Level Calibration
    kind: action
    command: "SLC"
    params:
      - name: operation
        type: enum
        values:
          - value: "TEST"
            label: "Test"
          - value: "CHSEL"
            label: "Channel Select"
          - value: "UP"
            label: "Level Up"
          - value: "DOWN"
            label: "Level Down"

  - id: subwoofer_level_adjust
    label: Adjust Subwoofer Level
    kind: action
    command: "SWL"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Level Up"
          - value: "DOWN"
            label: "Level Down"

  - id: center_level_adjust
    label: Adjust Center Level
    kind: action
    command: "CTL"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Level Up"
          - value: "DOWN"
            label: "Level Down"

  - id: display_additional
    label: Additional Display Operations
    kind: action
    command: "DIF"
    description: "Display Information and Display Mode interpretations depend on the model."
    params:
      - name: mode
        type: enum
        values:
          - value: "02"
            label: "Digital Format"
          - value: "03"
            label: "Bass Level / Video Format"
          - value: "04"
            label: "Treble Level"
          - value: "TG"
            label: "Wrap-Around Up"

  - id: dimmer_cycle
    label: Cycle Dimmer Level
    kind: action
    command: "DIM"
    params:
      - name: operation
        type: enum
        values:
          - value: "DIM"
            label: "Wrap-Around Up"

  - id: setup_operation
    label: Setup Operation
    kind: action
    command: "OSD"
    params:
      - name: operation
        type: enum
        values:
          - value: "MENU"
            label: "Menu"
          - value: "UP"
            label: "Up"
          - value: "DOWN"
            label: "Down"
          - value: "RIGHT"
            label: "Right"
          - value: "LEFT"
            label: "Left"
          - value: "ENTER"
            label: "Enter"
          - value: "EXIT"
            label: "Exit"
          - value: "AUDIO"
            label: "Audio Adjust"
          - value: "VIDEO"
            label: "Video Adjust"

  - id: memory_setup
    label: Memory Setup
    kind: action
    command: "MEM"
    params:
      - name: operation
        type: enum
        values:
          - value: "STR"
            label: "Store"
          - value: "RCL"
            label: "Recall"
          - value: "LOCK"
            label: "Lock"
          - value: "UNLK"
            label: "Unlock"

  - id: select_additional_input
    label: Select Additional Input
    kind: action
    command: "SLI"
    description: "XM/SIRIUS selections are only available on XM/SIRIUS models."
    params:
      - name: input
        type: enum
        values:
          - value: "21"
            label: "Tape2"
          - value: "30"
            label: "Multi Ch"
          - value: "31"
            label: "XM"
          - value: "32"
            label: "SIRIUS"

  - id: recout_select_input
    label: Select RECOUT Input
    kind: action
    command: "SLR"
    description: "REC/ZONE3 selector."
    params:
      - name: input
        type: enum
        values:
          - value: "00"
            label: "Video1"
          - value: "01"
            label: "Video2"
          - value: "02"
            label: "Video3"
          - value: "03"
            label: "Video4"
          - value: "04"
            label: "Video5"
          - value: "05"
            label: "Video6"
          - value: "06"
            label: "Video7"
          - value: "10"
            label: "DVD"
          - value: "20"
            label: "Tape(1)"
          - value: "21"
            label: "Tape2"
          - value: "22"
            label: "Phono"
          - value: "23"
            label: "CD"
          - value: "24"
            label: "FM"
          - value: "25"
            label: "AM"
          - value: "26"
            label: "Tuner"
          - value: "27"
            label: "Music Server"
          - value: "28"
            label: "Internet Radio"
          - value: "30"
            label: "Multi Ch"
          - value: "31"
            label: "XM"
          - value: "7F"
            label: "Off"
          - value: "80"
            label: "Source"

  - id: audio_selector_additional
    label: Additional Audio Selector Operations
    kind: action
    command: "SLA"
    params:
      - name: mode
        type: enum
        values:
          - value: "01"
            label: "Multi-Channel"
          - value: "03"
            label: "iLINK"
          - value: "06"
            label: "Balance"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: video_output_set
    label: Set Video Output
    kind: action
    command: "VOS"
    description: "Japanese Model Only."
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "D4"
          - value: "01"
            label: "Component"

  - id: hdmi_output_cycle
    label: Cycle HDMI Output
    kind: action
    command: "HDO"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: monitor_resolution_additional
    label: Additional Monitor Resolution Operations
    kind: action
    command: "RES"
    params:
      - name: mode
        type: enum
        values:
          - value: "07"
            label: "1080p/24fs (HDMI Output Only)"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: isf_mode_set
    label: Set ISF Mode
    kind: action
    command: "ISF"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "Custom"
          - value: "01"
            label: "Day"
          - value: "02"
            label: "Night"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: listening_mode_additional
    label: Additional Listening Mode Operations
    kind: action
    command: "LMD"
    description: "Model and input-signal restrictions apply as documented in the source."
    params:
      - name: mode
        type: enum
        values:
          - value: "03"
            label: "Film Game-RPG"
          - value: "04"
            label: "THX"
          - value: "05"
            label: "Action Game-Action"
          - value: "06"
            label: "Musical Game-Rock"
          - value: "07"
            label: "Mono Movie"
          - value: "08"
            label: "Orchestra"
          - value: "09"
            label: "Unplugged"
          - value: "0A"
            label: "Studio-Mix"
          - value: "0B"
            label: "TV Logic"
          - value: "0E"
            label: "Enhanced 7/Enhance Game-Sports"
          - value: "12"
            label: "Multiplex"
          - value: "13"
            label: "Full Mono"
          - value: "14"
            label: "Dolby Virtual"
          - value: "15"
            label: "DTS Surround Sensation"
          - value: "16"
            label: "Audyssey DSX"
          - value: "40"
            label: "5.1ch Surround / Straight Decode"
          - value: "41"
            label: "Dolby EX/DTS ES / Dolby EX"
          - value: "42"
            label: "THX Cinema"
          - value: "43"
            label: "THX Surround EX"
          - value: "44"
            label: "THX Music"
          - value: "45"
            label: "THX Games"
          - value: "50"
            label: "U2/S2 Cinema/Cinema2"
          - value: "51"
            label: "MusicMode, U2/S2 Music"
          - value: "52"
            label: "Games Mode, U2/S2 Games"
          - value: "84"
            label: "PLII/PLIIx THX Cinema"
          - value: "85"
            label: "Neo:6 THX Cinema"
          - value: "87"
            label: "Neural Surr"
          - value: "88"
            label: "Neural THX/Neural Surround"
          - value: "89"
            label: "PLII/PLIIx THX Games"
          - value: "8A"
            label: "Neo:6 THX Games"
          - value: "8B"
            label: "PLII/PLIIx THX Music"
          - value: "8C"
            label: "Neo:6 THX Music"
          - value: "8D"
            label: "Neural THX Cinema"
          - value: "8E"
            label: "Neural THX Music"
          - value: "8F"
            label: "Neural THX Games"
          - value: "90"
            label: "PLIIz Height"
          - value: "91"
            label: "Neo:6 Cinema DTS Surround Sensation"
          - value: "92"
            label: "Neo:6 Music DTS Surround Sensation"
          - value: "93"
            label: "Neural Digital Music"
          - value: "94"
            label: "PLIIz Height + THX Cinema"
          - value: "95"
            label: "PLIIz Height + THX Music"
          - value: "96"
            label: "PLIIz Height + THX Games"
          - value: "97"
            label: "PLIIz Height + THX U2/S2 Cinema"
          - value: "98"
            label: "PLIIz Height + THX U2/S2 Music"
          - value: "99"
            label: "PLIIz Height + THX U2/S2 Games"
          - value: "A0"
            label: "PLIIx/PLII Movie + Audyssey DSX"
          - value: "A1"
            label: "PLIIx/PLII Music + Audyssey DSX"
          - value: "A2"
            label: "PLIIx/PLII Game + Audyssey DSX"
          - value: "A3"
            label: "Neo:6 Cinema + Audyssey DSX"
          - value: "A4"
            label: "Neo:6 Music + Audyssey DSX"
          - value: "A5"
            label: "Neural Surround + Audyssey DSX"
          - value: "A6"
            label: "Neural Digital Music + Audyssey DSX"
          - value: "A7"
            label: "Dolby EX + Audyssey DSX"
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"
          - value: "MOVIE"
            label: "Movie Wrap-Around Up"
          - value: "MUSIC"
            label: "Music Wrap-Around Up"
          - value: "GAME"
            label: "Game Wrap-Around Up"

  - id: late_night_set
    label: Set Late Night
    kind: action
    command: "LTN"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "Low@DolbyDigital, On@Dolby TrueHD"
          - value: "02"
            label: "High@DolbyDigital, (On@Dolby TrueHD)"
          - value: "03"
            label: "Auto@Dolby TrueHD"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: re_eq_filter_set
    label: Set Re-EQ/Academy/Cinema Filter
    kind: action
    command: "RAS"
    description: "The source documents model-dependent Re-EQ/Academy Filter, Re-EQ, and Cinema Filter meanings for this same command."
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Both Off / Re-EQ Off / Cinema Filter Off"
          - value: "01"
            label: "Re-EQ On / Cinema Filter On"
          - value: "02"
            label: "Academy On"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: audyssey_cycle
    label: Cycle Audyssey EQ
    kind: action
    command: "ADY"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: dynamic_eq_cycle
    label: Cycle Audyssey Dynamic EQ
    kind: action
    command: "ADQ"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: dynamic_volume_cycle
    label: Cycle Audyssey Dynamic Volume
    kind: action
    command: "ADV"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: dolby_volume_set
    label: Set Dolby Volume
    kind: action
    command: "DVL"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "Low"
          - value: "02"
            label: "Mid"
          - value: "03"
            label: "High"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: music_optimizer_cycle
    label: Cycle Music Optimizer
    kind: action
    command: "MOT"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"

  - id: tuner_frequency_adjust
    label: Adjust Tuner Frequency
    kind: action
    command: "TUN"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: preset_adjust
    label: Adjust Preset
    kind: action
    command: "PRS"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: preset_memory_set
    label: Set Preset Memory
    kind: action
    command: "PRM"
    description: "Include Tuner Pack Model Only."
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation); "01"-"1E": sets Preset No. 1-30 (In hexadecimal representation)'

  - id: rds_information_display
    label: Display RDS Information
    kind: action
    command: "RDS"
    description: "RDS Model Only; RBDS models support only RT information."
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "RT Information"
          - value: "01"
            label: "PTY Information"
          - value: "02"
            label: "TP Information"
          - value: "UP"
            label: "Wrap-Around Change"

  - id: pty_scan_set
    label: Set PTY Scan
    kind: action
    command: "PTS"
    description: "RDS Model Only."
    params:
      - name: num
        type: string
        description: '"00"-"1E": sets PTY No "0-30"(In hexadecimal representation)'

  - id: pty_scan_finish
    label: Finish PTY Scan
    kind: action
    command: "PTS"
    params:
      - name: operation
        type: enum
        values:
          - value: "ENTER"
            label: "Finish PTY Scan"

  - id: tp_scan_start
    label: Start TP Scan
    kind: action
    command: "TPS"
    description: "RDS Model Only; Start TP Scan (When Don't Have Parameter)."
    params: []

  - id: tp_scan_finish
    label: Finish TP Scan
    kind: action
    command: "TPS"
    params:
      - name: operation
        type: enum
        values:
          - value: "ENTER"
            label: "Finish TP Scan"

  - id: xm_channel_set
    label: Set XM Channel
    kind: action
    command: "XCH"
    description: "XM Model Only."
    params:
      - name: channel
        type: string
        description: '"000"-"255": XM Channel Number "000-255"'

  - id: xm_channel_adjust
    label: Adjust XM Channel
    kind: action
    command: "XCH"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: xm_category_adjust
    label: Adjust XM Category
    kind: action
    command: "XCT"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: sirius_channel_set
    label: Set SIRIUS Channel
    kind: action
    command: "SCH"
    description: "SIRIUS Model Only."
    params:
      - name: channel
        type: string
        description: '"000"-"255": SIRIUS Channel Number "000-255"'

  - id: sirius_channel_adjust
    label: Adjust SIRIUS Channel
    kind: action
    command: "SCH"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: sirius_category_adjust
    label: Adjust SIRIUS Category
    kind: action
    command: "SCT"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: sirius_lock_password
    label: SIRIUS Lock Password
    kind: action
    command: "SLK"
    description: "SIRIUS Model Only; message direction beyond the documented password token is UNRESOLVED."
    params:
      - name: password
        type: string
        description: '"nnnn": Lock Password (4 Digits)'

  - id: hd_radio_program_set
    label: Set HD Radio Channel Program
    kind: action
    command: "HPR"
    description: "HD Radio Model Only."
    params:
      - name: program
        type: string
        description: '"01"-"08": sets directly HD Radio Channel Program'

  - id: hd_radio_blend_set
    label: Set HD Radio Blend Mode
    kind: action
    command: "HBL"
    description: "HD Radio Model Only."
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "Auto"
          - value: "01"
            label: "Analog"

  - id: network_additional_operation
    label: Additional Network/USB Operations
    kind: action
    command: "NTC"
    params:
      - name: operation
        type: enum
        values:
          - value: "DISPLAY"
            label: "Display"
          - value: "ALBUM"
            label: "Album"
          - value: "ARTIST"
            label: "Artist"
          - value: "GENRE"
            label: "Genre"
          - value: "PLAYLIST"
            label: "Playlist"
          - value: "RIGHT"
            label: "Right"
          - value: "LEFT"
            label: "Left"
          - value: "UP"
            label: "Up"
          - value: "DOWN"
            label: "Down"
          - value: "SELECT"
            label: "Select"
          - value: "DELETE"
            label: "Delete"
          - value: "CAPS"
            label: "Caps"
          - value: "LOCATION"
            label: "Location"
          - value: "LANGUAGE"
            label: "Language"
          - value: "SETUP"
            label: "Setup"
          - value: "RETURN"
            label: "Return"
          - value: "CHUP"
            label: "Internet Radio Channel Up"
          - value: "CHDN"
            label: "Internet Radio Channel Down"

  - id: network_digit
    label: Network/USB Digit
    kind: action
    command: "NTC"
    params:
      - name: digit
        type: string
        description: '"0"-"9": 0-9 KEY'

  - id: internet_radio_preset_set
    label: Set Internet Radio Preset
    kind: action
    command: "NPR"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: ri_cd_operation
    label: RI CD Player Operation
    kind: action
    command: "CCD"
    params:
      - name: operation
        type: enum
        values:
          - value: "POWER"
            label: "Power On/Off"
          - value: "TRACK"
            label: "Track Up"
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "PAUSE"
            label: "Pause"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "MEMORY"
            label: "Memory"
          - value: "CLEAR"
            label: "Clear"
          - value: "REPEAT"
            label: "Repeat"
          - value: "RANDOM"
            label: "Random"
          - value: "DISP"
            label: "Display"
          - value: "D.MODE"
            label: "D.Mode"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "OP/CL"
            label: "Open/Close"
          - value: "+10"
            label: "Plus Ten"
          - value: "D.SKIP"
            label: "Disc Up"
          - value: "DISC.F"
            label: "Disc Forward"
          - value: "DISC.R"
            label: "Disc Reverse"
          - value: "STBY"
            label: "Standby"
          - value: "PON"
            label: "Power On"

  - id: ri_cd_number
    label: RI CD Player Number
    kind: action
    command: "CCD"
    params:
      - name: num
        type: string
        description: '"0"-"10": 0-10'

  - id: ri_cd_disc
    label: RI CD Player Disc
    kind: action
    command: "CCD"
    params:
      - name: disc
        type: string
        description: '"DISC1"-"DISC6": DISC1-DISC6'

  - id: ri_tape1_operation
    label: RI Tape1 Operation
    kind: action
    command: "CT1"
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY.F"
            label: "Play Forward"
          - value: "PLAY.R"
            label: "Play Reverse"
          - value: "STOP"
            label: "Stop"
          - value: "RC/PAU"
            label: "Record/Pause"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"

  - id: ri_tape2_operation
    label: RI Tape2 Operation
    kind: action
    command: "CT2"
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY.F"
            label: "Play Forward"
          - value: "PLAY.R"
            label: "Play Reverse"
          - value: "STOP"
            label: "Stop"
          - value: "RC/PAU"
            label: "Record/Pause"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "OP/CL"
            label: "Open/Close"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "REC"
            label: "Record"

  - id: ri_equalizer_operation
    label: RI Graphics Equalizer Operation
    kind: action
    command: "CEQ"
    params:
      - name: operation
        type: enum
        values:
          - value: "POWER"
            label: "Power On/Off"
          - value: "PRESET"
            label: "Preset"

  - id: ri_dat_operation
    label: RI DAT Recorder Operation
    kind: action
    command: "CDT"
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY"
            label: "Play"
          - value: "RC/PAU"
            label: "Record/Pause"
          - value: "STOP"
            label: "Stop"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"

  - id: ri_dvd_operation
    label: RI DVD Player Operation
    kind: action
    command: "CDV"
    params:
      - name: operation
        type: enum
        values:
          - value: "POWER"
            label: "Power On/Off"
          - value: "PWRON"
            label: "Power On"
          - value: "PWROFF"
            label: "Power Off"
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "PAUSE"
            label: "Pause"
          - value: "LASTPLAY"
            label: "Last Play"
          - value: "SUBTON/OFF"
            label: "Subtitle On/Off"
          - value: "SUBTITLE"
            label: "Subtitle"
          - value: "SETUP"
            label: "Setup"
          - value: "TOPMENU"
            label: "Top Menu"
          - value: "MENU"
            label: "Menu"
          - value: "UP"
            label: "Up"
          - value: "DOWN"
            label: "Down"
          - value: "LEFT"
            label: "Left"
          - value: "RIGHT"
            label: "Right"
          - value: "ENTER"
            label: "Enter"
          - value: "RETURN"
            label: "Return"
          - value: "DISC.F"
            label: "Disc Forward"
          - value: "DISC.R"
            label: "Disc Reverse"
          - value: "AUDIO"
            label: "Audio"
          - value: "RANDOM"
            label: "Random"
          - value: "OP/CL"
            label: "Open/Close"
          - value: "ANGLE"
            label: "Angle"
          - value: "SEARCH"
            label: "Search"
          - value: "DISP"
            label: "Display"
          - value: "REPEAT"
            label: "Repeat"
          - value: "MEMORY"
            label: "Memory"
          - value: "CLEAR"
            label: "Clear"
          - value: "ABR"
            label: "A-B Repeat"
          - value: "STEP.F"
            label: "Step"
          - value: "STEP.R"
            label: "Step Back"
          - value: "SLOW.F"
            label: "Slow"
          - value: "SLOW.R"
            label: "Slow Back"
          - value: "ZOOMTG"
            label: "Zoom"
          - value: "ZOOMUP"
            label: "Zoom Up"
          - value: "ZOOMDN"
            label: "Zoom Down"
          - value: "PROGRE"
            label: "Progressive"
          - value: "VDOFF"
            label: "Video On/Off"
          - value: "CONMEM"
            label: "Condition Memory"
          - value: "FUNMEM"
            label: "Function Memory"
          - value: "FOLDUP"
            label: "Folder Up"
          - value: "FOLDDN"
            label: "Folder Down"
          - value: "P.MODE"
            label: "Play Mode"
          - value: "ASCTG"
            label: "Aspect Toggle"
          - value: "CDPCD"
            label: "CD Chain Repeat"
          - value: "MSPUP"
            label: "Multi Speed Up"
          - value: "MSPDN"
            label: "Multi Speed Down"
          - value: "PCT"
            label: "Picture Control"
          - value: "RSCTG"
            label: "Resolution Toggle"
          - value: "INIT"
            label: "Return To Factory Settings"

  - id: ri_dvd_number
    label: RI DVD Player Number
    kind: action
    command: "CDV"
    params:
      - name: num
        type: string
        description: '"0"-"10": 0-10'

  - id: ri_dvd_disc
    label: RI DVD Player Disc
    kind: action
    command: "CDV"
    params:
      - name: disc
        type: string
        description: '"DISC1"-"DISC6": DISC1-DISC6'

  - id: ri_md_operation
    label: RI MD Recorder Operation
    kind: action
    command: "CMD"
    params:
      - name: operation
        type: enum
        values:
          - value: "POWER"
            label: "Power On/Off"
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "P.MODE"
            label: "Play Mode"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "PAUSE"
            label: "Pause"
          - value: "REC"
            label: "Record"
          - value: "MEMORY"
            label: "Memory"
          - value: "DISP"
            label: "Display"
          - value: "SCROLL"
            label: "Scroll"
          - value: "M.SCAN"
            label: "Music Scan"
          - value: "CLEAR"
            label: "Clear"
          - value: "RANDOM"
            label: "Random"
          - value: "REPEAT"
            label: "Repeat"
          - value: "ENTER"
            label: "Enter"
          - value: "EJECT"
            label: "Eject"
          - value: "NAME"
            label: "Name"
          - value: "GROUP"
            label: "Group"
          - value: "STBY"
            label: "Standby"

  - id: ri_md_number
    label: RI MD Recorder Number
    kind: action
    command: "CMD"
    params:
      - name: num
        type: string
        description: '"0"-"10/0": 0-10/0; exact intermediate encodings UNRESOLVED'

  - id: ri_md_number_entry
    label: RI MD Recorder Number Entry
    kind: action
    command: "CMD"
    params:
      - name: operation
        type: enum
        description: "Source documents the literal key token; numeric substitution is UNRESOLVED."
        values:
          - value: "nn/nnn"
            label: "--/---"

  - id: ri_cdr_operation
    label: RI CD-R Recorder Operation
    kind: action
    command: "CCR"
    params:
      - name: operation
        type: enum
        values:
          - value: "POWER"
            label: "Power On/Off"
          - value: "P.MODE"
            label: "Play Mode"
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "SKIP.F"
            label: "Skip Forward"
          - value: "SKIP.R"
            label: "Skip Reverse"
          - value: "PAUSE"
            label: "Pause"
          - value: "REC"
            label: "Record"
          - value: "CLEAR"
            label: "Clear"
          - value: "REPEAT"
            label: "Repeat"
          - value: "SCROLL"
            label: "Scroll"
          - value: "OP/CL"
            label: "Open/Close"
          - value: "DISP"
            label: "Display"
          - value: "RANDOM"
            label: "Random"
          - value: "MEMORY"
            label: "Memory"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "STBY"
            label: "Standby"

  - id: ri_cdr_number
    label: RI CD-R Recorder Number
    kind: action
    command: "CCR"
    params:
      - name: num
        type: string
        description: '"0"-"10/0": 0-10/0; exact intermediate encodings UNRESOLVED'

  - id: ri_cdr_number_entry
    label: RI CD-R Recorder Number Entry
    kind: action
    command: "CCR"
    params:
      - name: operation
        type: enum
        description: "Source documents the literal key token; numeric substitution is UNRESOLVED."
        values:
          - value: "nn/nnn"
            label: "--/---"

  - id: zone2_mute_toggle
    label: Zone 2 Mute Toggle
    kind: action
    command: "ZMT"
    params:
      - name: operation
        type: enum
        values:
          - value: "TG"
            label: "Wrap-Around"

  - id: zone2_volume_adjust
    label: Zone 2 Adjust Volume
    kind: action
    command: "ZVL"
    description: "Only works when main is ON."
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Volume Up"
          - value: "DOWN"
            label: "Volume Down"

  - id: zone2_tone_set
    label: Zone 2 Set Tone
    kind: action
    command: "ZTN"
    description: "Only works when main is ON and Zone2 is powered or variable."
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: zone2_tone_adjust
    label: Zone 2 Adjust Tone
    kind: action
    command: "ZTN"
    description: "Only works when main is ON and Zone2 is powered or variable."
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: zone2_balance_set
    label: Zone 2 Set Balance
    kind: action
    command: "ZBL"
    description: "Only works when main is ON and Zone2 is powered or variable."
    params:
      - name: balance
        type: string
        description: 'xx is "-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: zone2_balance_adjust
    label: Zone 2 Adjust Balance
    kind: action
    command: "ZBL"
    description: "Only works when main is ON and Zone2 is powered or variable."
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Balance Up To R"
          - value: "DOWN"
            label: "Balance Down To L"

  - id: zone2_select_source
    label: Zone 2 Select Source
    kind: action
    command: "SLZ"
    params:
      - name: input
        type: enum
        values:
          - value: "80"
            label: "Source"

  - id: zone2_tuner_set_frequency
    label: Zone 2 Set Tuner Frequency
    kind: action
    command: "TUZ"
    description: "Tuner function is shared by MAIN and ZONE; control is separated."
    params:
      - name: freq
        type: string
        description: '"nnnnn": sets Directly Tuning Frequency; range UNRESOLVED'

  - id: zone2_tuner_frequency_adjust
    label: Zone 2 Adjust Tuner Frequency
    kind: action
    command: "TUZ"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone2_preset_set
    label: Zone 2 Set Preset
    kind: action
    command: "PRZ"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: zone2_preset_adjust
    label: Zone 2 Adjust Preset
    kind: action
    command: "PRZ"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone2_net_tune_operation
    label: Zone 2 Net-Tune Operation
    kind: action
    command: "NTC"
    description: "Net-Tune Model Only, Zone2. Preserve the source's lowercase z suffix."
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAYz"
            label: "Play"
          - value: "STOPz"
            label: "Stop"
          - value: "PAUSEz"
            label: "Pause"
          - value: "TRUPz"
            label: "Track Up"
          - value: "TRDNz"
            label: "Track Down"

  - id: zone2_network_operation
    label: Zone 2 Network Operation
    kind: action
    command: "NTZ"
    description: "Network Model Only, Zone2."
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "PAUSE"
            label: "Pause"
          - value: "TRUP"
            label: "Track Up"
          - value: "TRDN"
            label: "Track Down"
          - value: "CHUP"
            label: "Internet Radio Channel Up"
          - value: "CHDN"
            label: "Internet Radio Channel Down"

  - id: zone2_internet_radio_preset_set
    label: Zone 2 Set Internet Radio Preset
    kind: action
    command: "NPZ"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: zone2_listening_mode_set
    label: Zone 2 Set Listening Mode
    kind: action
    command: "LMZ"
    params:
      - name: mode
        type: enum
        values:
          - value: "00"
            label: "Stereo"
          - value: "01"
            label: "Direct"
          - value: "0F"
            label: "Mono"
          - value: "12"
            label: "Multiplex"
          - value: "87"
            label: "DVS(Pl2)"
          - value: "88"
            label: "DVS(NEO6)"

  - id: zone2_late_night_set
    label: Zone 2 Set Late Night
    kind: action
    command: "LTZ"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "Low"
          - value: "02"
            label: "High"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: zone2_re_eq_filter_set
    label: Zone 2 Set Re-EQ/Academy Filter
    kind: action
    command: "RAZ"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Both Off"
          - value: "01"
            label: "Re-EQ On"
          - value: "02"
            label: "Academy On"
          - value: "UP"
            label: "Wrap-Around Up"

  - id: zone3_mute_set
    label: Zone 3 Set Mute
    kind: action
    command: "MT3"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"
          - value: "TG"
            label: "Wrap-Around"

  - id: zone3_volume_adjust
    label: Zone 3 Adjust Volume
    kind: action
    command: "VL3"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Volume Up"
          - value: "DOWN"
            label: "Volume Down"

  - id: zone3_tone_set
    label: Zone 3 Set Tone
    kind: action
    command: "TN3"
    params:
      - name: bass
        type: string
        description: 'Bxx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'
      - name: treble
        type: string
        description: 'Txx; xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: zone3_tone_adjust
    label: Zone 3 Adjust Tone
    kind: action
    command: "TN3"
    params:
      - name: operation
        type: enum
        values:
          - value: "BUP"
            label: "Bass Up"
          - value: "BDOWN"
            label: "Bass Down"
          - value: "TUP"
            label: "Treble Up"
          - value: "TDOWN"
            label: "Treble Down"

  - id: zone3_balance_set
    label: Zone 3 Set Balance
    kind: action
    command: "BL3"
    params:
      - name: balance
        type: string
        description: 'xx is"-A"..."00"..."+A"[-10...0...+10 2 step]'

  - id: zone3_balance_adjust
    label: Zone 3 Adjust Balance
    kind: action
    command: "BL3"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Balance Up To R"
          - value: "DOWN"
            label: "Balance Down To L"

  - id: zone3_tuner_set_frequency
    label: Zone 3 Set Tuner Frequency
    kind: action
    command: "TU3"
    description: "Tuner function is shared by MAIN and ZONE; control is separated."
    params:
      - name: freq
        type: string
        description: '"nnnnn": sets Directly Tuning Frequency; range UNRESOLVED'

  - id: zone3_tuner_frequency_adjust
    label: Zone 3 Adjust Tuner Frequency
    kind: action
    command: "TU3"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone3_preset_set
    label: Zone 3 Set Preset
    kind: action
    command: "PR3"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: zone3_preset_adjust
    label: Zone 3 Adjust Preset
    kind: action
    command: "PR3"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone3_network_operation
    label: Zone 3 Network Operation
    kind: action
    command: "NT3"
    description: "Network Model Only, Zone3."
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "PAUSE"
            label: "Pause"
          - value: "TRUP"
            label: "Track Up"
          - value: "TRDN"
            label: "Track Down"
          - value: "CHUP"
            label: "Internet Radio Channel Up"
          - value: "CHDN"
            label: "Internet Radio Channel Down"

  - id: zone3_internet_radio_preset_set
    label: Zone 3 Set Internet Radio Preset
    kind: action
    command: "NP3"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: zone4_mute_set
    label: Zone 4 Set Mute
    kind: action
    command: "MT4"
    params:
      - name: state
        type: enum
        values:
          - value: "00"
            label: "Off"
          - value: "01"
            label: "On"
          - value: "TG"
            label: "Wrap-Around"

  - id: zone4_volume_adjust
    label: Zone 4 Adjust Volume
    kind: action
    command: "VL4"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Volume Up"
          - value: "DOWN"
            label: "Volume Down"

  - id: zone4_tuner_set_frequency
    label: Zone 4 Set Tuner Frequency
    kind: action
    command: "TU4"
    description: "Tuner function is shared by MAIN and ZONE; control is separated."
    params:
      - name: freq
        type: string
        description: '"nnnnn": sets Directly Tuning Frequency; range UNRESOLVED'

  - id: zone4_tuner_frequency_adjust
    label: Zone 4 Adjust Tuner Frequency
    kind: action
    command: "TU4"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone4_preset_set
    label: Zone 4 Set Preset
    kind: action
    command: "PR4"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: zone4_preset_adjust
    label: Zone 4 Adjust Preset
    kind: action
    command: "PR4"
    params:
      - name: operation
        type: enum
        values:
          - value: "UP"
            label: "Wrap-Around Up"
          - value: "DOWN"
            label: "Wrap-Around Down"

  - id: zone4_network_operation
    label: Zone 4 Network Operation
    kind: action
    command: "NT4"
    description: "Network Model Only, Zone4."
    params:
      - name: operation
        type: enum
        values:
          - value: "PLAY"
            label: "Play"
          - value: "STOP"
            label: "Stop"
          - value: "PAUSE"
            label: "Pause"
          - value: "TRUP"
            label: "Track Up"
          - value: "TRDN"
            label: "Track Down"

  - id: zone4_internet_radio_preset_set
    label: Zone 4 Set Internet Radio Preset
    kind: action
    command: "NP4"
    params:
      - name: num
        type: string
        description: '"01"-"28": sets Preset No. 1-40 (In hexadecimal representation)'

  - id: ri_dock_operation
    label: RI Dock Operation
    kind: action
    command: "CDS"
    params:
      - name: operation
        type: enum
        values:
          - value: "PWRON"
            label: "Dock On"
          - value: "PWROFF"
            label: "Dock Standby"
          - value: "PLY/RES"
            label: "Play/Resume"
          - value: "STOP"
            label: "Stop"
          - value: "SKIP.F"
            label: "Track Up"
          - value: "SKIP.R"
            label: "Track Down"
          - value: "PAUSE"
            label: "Pause"
          - value: "PLY/PAU"
            label: "Play/Pause"
          - value: "FF"
            label: "Fast Forward"
          - value: "REW"
            label: "Rewind"
          - value: "ALBUM+"
            label: "Album Up"
          - value: "ALBUM-"
            label: "Album Down"
          - value: "PLIST+"
            label: "Playlist Up"
          - value: "PLIST-"
            label: "Playlist Down"
          - value: "CHAPT+"
            label: "Chapter Up"
          - value: "CHAPT-"
            label: "Chapter Down"
          - value: "RANDOM"
            label: "Shuffle"
          - value: "REPEAT"
            label: "Repeat"
          - value: "MUTE"
            label: "Mute"
          - value: "BLIGHT"
            label: "Backlight"
          - value: "MENU"
            label: "Menu"
          - value: "ENTER"
            label: "Select"
          - value: "UP"
            label: "Cursor Up"
          - value: "DOWN"
            label: "Cursor Down"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    command: "!1PWRQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Standby"
      - value: "01"
        label: "On"

  - id: mute_state
    type: enum
    command: "!1AMTQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: volume_level
    type: string
    command: "!1MVLQSTN"
    query_command: "QSTN"
    description: "Current volume level in hex (00-64)"

  - id: input_selector
    type: string
    command: "!1SLIQSTN"
    query_command: "QSTN"
    description: "Current input selector hex code"

  - id: listening_mode
    type: string
    command: "!1LMDQSTN"
    query_command: "QSTN"
    description: "Current listening mode hex code"

  - id: dimmer_level
    type: enum
    command: "!1DIMQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Bright"
      - value: "01"
        label: "Dim"
      - value: "02"
        label: "Dark"
      - value: "03"
        label: "Shut-Off"
      - value: "08"
        label: "Bright & LED OFF"

  - id: sleep_time
    type: string
    command: "!1SLPQSTN"
    query_command: "QSTN"
    description: "Sleep timer value in hex, or OFF"

  - id: display_mode
    type: string
    command: "!1DIFQSTN"
    query_command: "QSTN"
    description: "Current display mode"

  - id: audio_selector
    type: string
    command: "!1SLAQSTN"
    query_command: "QSTN"
    description: "Current audio selector"

  - id: speaker_a_state
    type: enum
    command: "!1SPAQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: speaker_b_state
    type: enum
    command: "!1SPBQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: hdmi_output
    type: string
    command: "!1HDOQSTN"
    query_command: "QSTN"

  - id: monitor_resolution
    type: string
    command: "!1RESQSTN"
    query_command: "QSTN"

  - id: audio_info
    type: string
    command: "!1IFAQSTN"
    query_command: "QSTN"
    description: "Audio information string"

  - id: video_info
    type: string
    command: "!1IFVQSTN"
    query_command: "QSTN"
    description: "Video information string"

  - id: front_tone
    type: string
    command: "!1TFRQSTN"
    query_command: "QSTN"
    description: "Returns BxxTxx (bass and treble values)"

  - id: subwoofer_level
    type: string
    command: "!1SWLQSTN"
    query_command: "QSTN"

  - id: center_level
    type: string
    command: "!1CTLQSTN"
    query_command: "QSTN"

  - id: net_play_status
    type: string
    command: "!1NSTQSTN"
    query_command: "QSTN"
    description: "3-char string: play status (S/P/p/F/R), repeat status (-/R/F/1)"

  - id: net_artist
    type: string
    command: "!1NATQSTN"
    query_command: "QSTN"
    description: "Net/USB artist name (up to 64 ASCII chars)"

  - id: net_album
    type: string
    command: "!1NALQSTN"
    query_command: "QSTN"
    description: "Net/USB album name"

  - id: net_title
    type: string
    command: "!1NTIQSTN"
    query_command: "QSTN"
    description: "Net/USB title name"

  - id: net_time
    type: string
    command: "!1NTMQSTN"
    query_command: "QSTN"
    description: "Net/USB time info (mm:ss/mm:ss elapsed/track)"

  - id: net_track
    type: string
    command: "!1NTRQSTN"
    query_command: "QSTN"
    description: "Net/USB track info (cccc/tttt current/total)"

  - id: tuner_frequency
    type: string
    command: "!1TUNQSTN"
    query_command: "QSTN"
    description: "Current tuning frequency"

  - id: preset_number
    type: string
    command: "!1PRSQSTN"
    query_command: "QSTN"
    description: "Current preset number in hex"

  - id: audyssey_state
    type: enum
    command: "!1ADYQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: dynamic_eq_state
    type: enum
    command: "!1ADQQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: dynamic_volume_state
    type: enum
    command: "!1ADVQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "Light"
      - value: "02"
        label: "Medium"
      - value: "03"
        label: "Heavy"

  - id: zone2_power
    type: enum
    command: "!1ZPWQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Standby"
      - value: "01"
        label: "On"

  - id: zone2_mute
    type: enum
    command: "!1ZMTQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: zone2_volume
    type: string
    command: "!1ZVLQSTN"
    query_command: "QSTN"

  - id: zone2_input
    type: string
    command: "!1SLZQSTN"
    query_command: "QSTN"

  - id: zone3_power
    type: enum
    command: "!1PW3QSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Standby"
      - value: "01"
        label: "On"

  - id: zone3_volume
    type: string
    command: "!1VL3QSTN"
    query_command: "QSTN"

  - id: zone3_input
    type: string
    command: "!1SL3QSTN"
    query_command: "QSTN"

  - id: zone4_power
    type: enum
    command: "!1PW4QSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Standby"
      - value: "01"
        label: "On"

  - id: zone4_volume
    type: string
    command: "!1VL4QSTN"
    query_command: "QSTN"

  - id: zone4_input
    type: string
    command: "!1SL4QSTN"
    query_command: "QSTN"

  - id: late_night
    type: string
    command: "!1LTNQSTN"
    query_command: "QSTN"
    description: "Late night level (00-03)"

  - id: isf_mode
    type: string
    command: "!1ISFQSTN"
    query_command: "QSTN"

  - id: music_optimizer
    type: enum
    command: "!1MOTQSTN"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: speaker_layout
    type: string
    command: "SPL"
    query_command: "QSTN"
    description: "Gets the Speaker State."

  - id: front_wide_tone
    type: string
    command: "TFW"
    query_command: "QSTN"
    description: "Gets Front Wide Tone (BxxTxx)."

  - id: front_high_tone
    type: string
    command: "TFH"
    query_command: "QSTN"
    description: "Gets Front High Tone (BxxTxx)."

  - id: center_tone
    type: string
    command: "TCT"
    query_command: "QSTN"
    description: "Gets Center Tone (BxxTxx)."

  - id: surround_tone
    type: string
    command: "TSR"
    query_command: "QSTN"
    description: "Gets Surround Tone (BxxTxx)."

  - id: surround_back_tone
    type: string
    command: "TSB"
    query_command: "QSTN"
    description: "Gets Surround Back Tone (BxxTxx)."

  - id: subwoofer_tone
    type: string
    command: "TSW"
    query_command: "QSTN"
    description: "Gets Subwoofer Tone (BxxTxx), as documented by the source."

  - id: recout_input
    type: string
    command: "SLR"
    query_command: "QSTN"
    description: "Gets RECOUT Selector Position."

  - id: video_output
    type: string
    command: "VOS"
    query_command: "QSTN"
    description: "Gets Video Output Selector Position; Japanese Model Only."

  - id: re_eq_filter_state
    type: string
    command: "RAS"
    query_command: "QSTN"
    description: "Gets Re-EQ/Academy, Re-EQ, or Cinema Filter State according to model."

  - id: dolby_volume_state
    type: enum
    command: "DVL"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "Low"
      - value: "02"
        label: "Mid"
      - value: "03"
        label: "High"

  - id: xm_channel_name
    type: string
    command: "XCN"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": XM Channel Name; XM Model Only.'

  - id: xm_artist
    type: string
    command: "XAT"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": XM Artist Name; XM Model Only.'

  - id: xm_title
    type: string
    command: "XTI"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": XM Title; XM Model Only.'

  - id: xm_channel_number
    type: string
    command: "XCH"
    query_command: "QSTN"
    description: '"000"-"255": XM Channel Number "000-255"; XM Model Only.'

  - id: xm_category
    type: string
    command: "XCT"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": XM Category Info; XM Model Only.'

  - id: sirius_channel_name
    type: string
    command: "SCN"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": SIRIUS Channel Name; SIRIUS Model Only.'

  - id: sirius_artist
    type: string
    command: "SAT"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": SIRIUS Artist Name; SIRIUS Model Only.'

  - id: sirius_title
    type: string
    command: "STI"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": SIRIUS Title; SIRIUS Model Only.'

  - id: sirius_channel_number
    type: string
    command: "SCH"
    query_command: "QSTN"
    description: '"000"-"255": SIRIUS Channel Number "000-255"; SIRIUS Model Only.'

  - id: sirius_category
    type: string
    command: "SCT"
    query_command: "QSTN"
    description: '"nnnnnnnnnn": SIRIUS Category Info; SIRIUS Model Only.'

  - id: sirius_lock_status
    type: enum
    command: "SLK"
    description: "Source documents these display messages; no query command is stated."
    values:
      - value: "INPUT"
        label: "Please Input The Lock Password"
      - value: "WRONG"
        label: "The Lock Password Is Wrong"

  - id: hd_radio_artist
    type: string
    command: "HAT"
    query_command: "QSTN"
    description: "HD Radio Artist Name (variable-length, 64 digits max)."

  - id: hd_radio_channel_name
    type: string
    command: "HCN"
    query_command: "QSTN"
    description: "HD Radio Channel Name (Station Name) (7 digits)."

  - id: hd_radio_title
    type: string
    command: "HTI"
    query_command: "QSTN"
    description: "HD Radio Title (variable-length, 64 digits max)."

  - id: hd_radio_detail
    type: string
    command: "HDS"
    query_command: "QSTN"
    description: "Source labels this HD Radio Detail Info and documents the returned value as HD Radio Title."

  - id: hd_radio_program
    type: string
    command: "HPR"
    query_command: "QSTN"
    description: 'HD Radio Channel Program: "01"-"08".'

  - id: hd_radio_blend
    type: enum
    command: "HBL"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Auto"
      - value: "01"
        label: "Analog"

  - id: hd_radio_tuner_status
    type: string
    command: "HTS"
    query_command: "QSTN"
    description: '"mmnnoo": HD Radio Tuner Status (3 bytes); mm -> "00" not HD, "01" HD; nn -> current Program "01"-"08"; oo -> receivable Program (8 bits are represented in hexadecimal notation. Each bit shows receivable or not.)'

  - id: zone2_tone
    type: string
    command: "ZTN"
    query_command: "QSTN"
    description: "Gets Zone2 Tone (BxxTxx); only works when main is ON and Zone2 is powered or variable."

  - id: zone2_balance
    type: string
    command: "ZBL"
    query_command: "QSTN"
    description: 'Gets Zone2 Balance; xx is "-A"..."00"..."+A"[-10...0...+10 2 step].'

  - id: zone2_tuner_frequency
    type: string
    command: "TUZ"
    query_command: "QSTN"
    description: "Gets Tuning Frequency through separated Zone2 control."

  - id: zone2_preset_number
    type: string
    command: "PRZ"
    query_command: "QSTN"
    description: 'Gets Preset No.; "01"-"28": 1-40 (In hexadecimal representation).'

  - id: zone2_late_night
    type: string
    command: "LTZ"
    query_command: "QSTN"
    description: "Gets Zone2 Late Night Level."

  - id: zone2_re_eq_filter_state
    type: string
    command: "RAZ"
    query_command: "QSTN"
    description: "Gets Zone2 Re-EQ/Academy State."

  - id: zone3_mute
    type: enum
    command: "MT3"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: zone3_tone
    type: string
    command: "TN3"
    query_command: "QSTN"
    description: "Gets Zone3 Tone (BxxTxx)."

  - id: zone3_balance
    type: string
    command: "BL3"
    query_command: "QSTN"
    description: 'Gets Zone3 Balance; xx is"-A"..."00"..."+A"[-10...0...+10 2 step].'

  - id: zone3_tuner_frequency
    type: string
    command: "TU3"
    query_command: "QSTN"
    description: "Gets Tuning Frequency through separated Zone3 control."

  - id: zone3_preset_number
    type: string
    command: "PR3"
    query_command: "QSTN"
    description: 'Gets Preset No.; "01"-"28": 1-40 (In hexadecimal representation).'

  - id: zone4_mute
    type: enum
    command: "MT4"
    query_command: "QSTN"
    values:
      - value: "00"
        label: "Off"
      - value: "01"
        label: "On"

  - id: zone4_tuner_frequency
    type: string
    command: "TU4"
    query_command: "QSTN"
    description: "Gets Tuning Frequency through separated Zone4 control."

  - id: zone4_preset_number
    type: string
    command: "PR4"
    query_command: "QSTN"
    description: 'Gets Preset No.; "01"-"28": 1-40 (In hexadecimal representation).'
```

## Variables
```yaml
variables: []
# UNRESOLVED: no distinct settable parameters beyond what is covered by actions and feedbacks
```

## Events
```yaml
events:
  - id: unsolicited_status
    description: >-
      Receiver sends unsolicited status messages when system state changes
      (e.g. front panel button press, remote control). Format is identical
      to query response: "!1" + 3-char command + parameter + end char.
      Receiver responds within 50msec of state change.
```

## Macros
```yaml
macros: []
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- ISCP command format: Start char `!` + Unit type `1` (Receiver) + 3-char command + parameter + end char (`[CR]`/`[LF]`/`[CR][LF]` for RS-232, `[EOF]`/`[EOF][CR]`/`[EOF][CR][LF]` for eISCP)
- Volume levels use hexadecimal representation (e.g. `0x64` = decimal 100)
- Preset numbers use hexadecimal representation
- Zone 2 volume/control only works when main zone is powered ON
- eISCP requires persistent TCP connection — only one client connection at a time
- Minimum 50msec interval between received messages
- eISCP packet includes a 16-byte header with magic `ISCP`, header size, data size, and version byte (0x01), all big-endian
- eISCP TCP port default is 60128, configurable 49152-65535 via receiver setup menu
- FF/REW network commands must be sent continuously with no more than 100ms delay
- Tuner/XM/SIRIUS/HD Radio functions are shared between MAIN and ZONE sides
- Source document is titled "Integra Serial Communication Protocol" version 1.15 (31 August 2009) — it covers multiple Onkyo/Integra receiver models generically
<!-- UNRESOLVED: which specific commands the TX-8270 supports from this generic ISCP document is not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: protocol version compatibility beyond v1.15 not stated -->
- Appended entries retain verbatim source command tokens in `command`. Append the selected parameter, then apply the ISCP framing described above. Tone parameters retain their `B`/`T` prefixes. Existing framed command fields are preserved.
- `query_command: "QSTN"` records the source's literal query parameter for the associated three-character command. For existing Feedbacks, the preserved `command` already contains the framed query; do not append `QSTN` a second time.

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-10-07T20:45:04.082Z
last_checked_at: 2026-10-07T20:45:04.082Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:45:04.082Z
matched_actions: 254
action_count: 254
confidence: medium
summary: "All 254 action units match source ISCP tokens and values; transport matches (auth unresolved); every source command is covered across Actions and Feedbacks. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific TX-8270 feature subset not confirmed — source is a generic ISCP protocol document covering multiple receiver models"
- "no distinct settable parameters beyond what is covered by actions and feedbacks"
- "no multi-step macro sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "which specific commands the TX-8270 supports from this generic ISCP document is not confirmed"
- "firmware version compatibility not stated in source"
- "protocol version compatibility beyond v1.15 not stated"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
