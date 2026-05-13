---
spec_id: admin/arcam-av4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AV4 Series Control Spec"
manufacturer: Arcam
model_family: AVR390
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - AVR390
    - AVR550
    - AVR850
    - AV860
    - SR250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-23T15:10:59.604Z
generated_at: 2026-04-23T15:10:59.604Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:10:59.604Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec actions match literal command codes in source with correct parameters and transport configuration."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Arcam AV4 Series Control Spec

## Summary
Binary control protocol for Arcam AVR390/AVR550/AVR850/AVR850/AV860/SR250 A/V receivers over RS-232 and TCP/IP. Commands use a fixed-length byte frame with hex command codes (0x00–0x4F). The protocol supports two-zone operation, input routing, volume control, decode mode queries, tuner control, DSP adjustments, and RC5 IR command simulation.

<!-- UNRESOLVED: exact firmware versions these models shipped with or require for protocol compatibility -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50000
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Protocol Framing
```yaml
byte_order: raw
command_format:
  description: "All commands use the same frame: ST ZN CC DL [DATA...] ET"
  fields:
    ST:
      value: "0x21 ('!')"
      description: Start byte
    ZN:
      value: "0x01 (Zone 1) or 0x02 (Zone 2)"
      description: Zone number
    CC:
      description: Command code
    DL:
      description: Data length (number of data bytes following, excluding ET)
    DATA:
      description: Command parameters (0 or more bytes)
    ET:
      value: "0x0D"
      description: End byte (carriage return)
response_format:
  description: "All responses: ST ZN CC AC DL [DATA...] ET"
  fields:
    ST:
      value: "0x21 ('!')"
    ZN:
      description: Zone number
    CC:
      description: Command code (echo)
    AC:
      description: Answer code
    DL:
      description: Data length
    DATA:
      description: Response parameters
    ET:
      value: "0x0D"
answer_codes:
  "0x00": Status update / ACK
  "0x82": Zone Invalid
  "0x83": Command not recognised
  "0x84": Parameter not recognised
  "0x85": Command invalid at this time
  "0x86": Invalid data length
notes:
  - AV responds within 3 seconds
  - RC may send further commands before previous response received
  - State changes from front panel or IR remote are relayed to RC automatically
  - Commands 0xF0 to 0xFF are reserved for test functions
```

## Traits
```yaml
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions
```yaml
actions:
  - id: power_query
    label: Request Power State
    kind: action
    command_code: "0x00"
    params:
      - name: zone
        type: integer
        values: [1, 2]
        description: Zone number
    send_data: ["0xF0"]

  - id: simulate_rc5
    label: Simulate RC5 IR Command
    kind: action
    command_code: "0x08"
    params:
      - name: zone
        type: integer
        values: [1, 2]
        description: Zone number
      - name: system_code
        type: integer
        description: RC5 system code byte
      - name: command_code
        type: integer
        description: RC5 command code byte
    send_data: ["{system_code}", "{command_code}"]
    notes: "Simulates an IR remote command over the control link"

  - id: set_display_brightness
    label: Set Display Brightness
    kind: action
    command_code: "0x01"
    params:
      - name: brightness
        type: enum
        values:
          "0xF0": Request current
          "0x00": Off
          "0x01": L1
          "0x02": L2
    send_data: ["{brightness}"]

  - id: select_video_input
    label: Select Video Input
    kind: action
    command_code: "0x0A"
    params:
      - name: source
        type: enum
        values:
          "0x00": BD
          "0x01": SAT
          "0x02": AV
          "0x03": PVR
          "0x04": VCR
          "0x05": Game
          "0x06": STB
          "0xF0": Request current
    send_data: ["{source}"]
    notes: "Returns 0x85 if OSD setup screen is showing"

  - id: select_audio_type
    label: Select Analogue/Digital Audio
    kind: action
    command_code: "0x0B"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: audio_type
        type: enum
        values:
          "0x00": Analogue
          "0x01": Digital
          "0x02": HDMI
          "0xF0": Request current
    send_data: ["{audio_type}"]
    notes: "Returns 0x85 if OSD setup screen is showing"

  - id: set_volume
    label: Set Volume
    kind: action
    command_code: "0x0D"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: volume
        type: integer
        min: 0
        max: 99
        description: "Volume level 0-99 (0x00-0x63). Use 0xF0 to request current."
    send_data: ["{volume}"]

  - id: set_display_info_type
    label: Set Display Information Type
    kind: action
    command_code: "0x09"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: info_type
        type: integer
        description: "0x00=Processing, 0xE0=Cycle all, 0xF0=Request current. Source-specific: FM 0x01-0x03, DAB 0x01-0x04, NET/USB 0x01-0x05"
    send_data: ["{info_type}"]

  - id: set_imax_enhanced
    label: Set IMAX Enhanced
    kind: action
    command_code: "0x0C"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: mode
        type: enum
        values:
          "0xF0": Request current
          "0xF1": Auto
          "0xF2": On
          "0xF3": Off
    send_data: ["{mode}"]

  - id: set_headphone_override
    label: Set Headphone Override
    kind: action
    command_code: "0x1F"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values:
          "0x00": Clear (speakers muted if headphones present)
          "0x01": Set (speakers unmuted if headphones present)
    send_data: ["{state}"]

  - id: set_tuner_preset
    label: Set Tuner Preset
    kind: action
    command_code: "0x15"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: preset
        type: integer
        min: 1
        max: 50
        description: "Preset number 1-50 (0x01-0x32). Use 0xF0 to request current."
    send_data: ["{preset}"]

  - id: tune_frequency
    label: Tune Frequency
    kind: action
    command_code: "0x16"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: direction
        type: enum
        values:
          "0x00": Decrement
          "0x01": Increment
          "0xF0": Request current
    send_data: ["{direction}"]
    notes: "FM: steps of 0.05MHz. Returns error 0x85 if tuner not selected."

  - id: set_input_name
    label: Set Input Name
    kind: action
    command_code: "0x20"
    params:
      - name: name
        type: string
        max_length: 10
        description: "ASCII name up to 10 characters. Use 0xF0 to query."
    send_data: ["{name_bytes}"]

  - id: fm_scan
    label: FM Scan
    kind: action
    command_code: "0x23"
    params:
      - name: direction
        type: enum
        values:
          "0x01": Scan up
          "0x02": Scan down
    send_data: ["{direction}"]
    notes: "Only valid if FM input is selected"

  - id: dab_scan
    label: DAB Scan
    kind: action
    command_code: "0x24"
    params: []
    send_data: ["0xF0"]
    notes: "Only valid if DAB input is selected"

  - id: heartbeat
    label: Heartbeat
    kind: action
    command_code: "0x25"
    params: []
    send_data: ["0xF0"]
    notes: "Checks unit is connected; resets EuP standby timer"

  - id: reboot
    label: Reboot
    kind: action
    command_code: "0x26"
    params: []
    send_data: ["0x52", "0x45", "0x42", "0x4F", "0x4F", "0x54"]
    notes: "Sends ASCII 'REBOOT' as confirmation. Forces unit reboot."

  - id: factory_reset
    label: Restore Factory Defaults
    kind: action
    command_code: "0x05"
    params: []
    send_data: ["0xAA", "0xAA"]
    notes: "Requires double 0xAA confirmation pattern to avoid accidental reset"

  - id: save_restore_settings
    label: Save/Restore Settings Backup
    kind: action
    command_code: "0x06"
    params:
      - name: operation
        type: enum
        values:
          "0x00": Save backup
          "0x01": Restore backup
      - name: pin
        type: string
        max_length: 4
        description: "4-digit PIN"
    send_data: ["{operation}", "0x55", "0x55", "{pin_digit1}", "{pin_digit2}", "{pin_digit3}", "{pin_digit4}"]
    notes: "Requires double 0x55 confirmation + 4-digit PIN. Returns 0x85 if no backup exists or if command 0x1E is being processed."

  - id: set_treble
    label: Set Treble EQ
    kind: action
    command_code: "0x35"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_bass
    label: Set Bass EQ
    kind: action
    command_code: "0x36"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_room_eq
    label: Set Room EQ
    kind: action
    command_code: "0x37"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values:
          "0xF0": Request current
          "0xF1": On
          "0xF2": Off
    send_data: ["{state}"]

  - id: set_dolby_volume
    label: Set Dolby Volume
    kind: action
    command_code: "0x38"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values:
          "0x00": Off
          "0x01": On
          "0xF0": Request current
    send_data: ["{state}"]

  - id: set_dolby_leveller
    label: Set Dolby Leveller
    kind: action
    command_code: "0x39"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0A for level 0-10, 0xF0=request, 0xF1=increment, 0xF2=decrement, 0xFF=off"
    send_data: ["{value}"]

  - id: set_dolby_volume_offset
    label: Set Dolby Volume Calibration Offset
    kind: action
    command_code: "0x3A"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0F for 0 to +15dB, 0x80-0x8F for -1 to -15dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_balance
    label: Set Balance
    kind: action
    command_code: "0x3B"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x06 for 0 to +6, 0x81-0x86 for -1 to -6, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_subwoofer_trim
    label: Set Subwoofer Trim
    kind: action
    command_code: "0x3F"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x14 for positive trim in 0.5dB steps, 0x81-0x94 for negative, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_lipsync_delay
    label: Set Lipsync Delay
    kind: action
    command_code: "0x40"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x32 in 5ms steps (max 250ms), 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_compression
    label: Set Dynamic Range Compression
    kind: action
    command_code: "0x41"
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: level
        type: enum
        values:
          "0x00": Off
          "0x01": Medium
          "0x02": High
          "0xF0": Request current
    send_data: ["{level}"]

  - id: set_sub_stereo_trim
    label: Set Sub Stereo Trim
    kind: action
    command_code: "0x45"
    params:
      - name: value
        type: integer
        description: "0x00=0dB, 0x81-0x94 for -0.5 to -10dB in 0.5dB steps, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    send_data: ["{value}"]

  - id: set_osd
    label: Set Zone 1 OSD On/Off
    kind: action
    command_code: "0x4E"
    params:
      - name: state
        type: enum
        values:
          "0xF0": Request current
          "0xF1": On
          "0xF2": Off
    send_data: ["{state}"]

  - id: set_hdmi_output
    label: Set HDMI Video Output
    kind: action
    command_code: "0x4F"
    params:
      - name: output
        type: enum
        values:
          "0x02": HDMI Output 1
          "0x03": HDMI Output 2
          "0x04": HDMI Output 1 and 2
          "0xF0": Request current
    send_data: ["{output}"]
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command_code: "0x00"
    type: enum
    values:
      "0x00": Standby
      "0x01": Powered On

  - id: display_brightness
    label: Display Brightness
    command_code: "0x01"
    type: enum
    values:
      "0x00": Off
      "0x01": L1
      "0x02": L2

  - id: headphone_status
    label: Headphone Connection Status
    command_code: "0x02"
    type: enum
    values:
      "0x00": Not connected
      "0x01": Connected

  - id: fm_genre
    label: FM Genre / Programme Type
    command_code: "0x03"
    type: string
    description: ASCII radio programme type

  - id: software_version
    label: Software Version
    command_code: "0x04"
    type: object
    description: "Returns major.minor version for requested module (RS232/Host/OSD/DSP/NET/IAP)"

  - id: current_source
    label: Current Source
    command_code: "0x1D"
    type: enum
    values:
      "0x00": Follow Zone 1
      "0x01": CD
      "0x02": BD
      "0x03": AV
      "0x04": SAT
      "0x05": PVR
      "0x06": VCR
      "0x08": AUX
      "0x09": DISPLAY
      "0x0B": TUNER FM
      "0x0C": TUNER DAB
      "0x0E": NET
      "0x0F": USB
      "0x10": STB
      "0x11": GAME

  - id: volume_level
    label: Volume Level
    command_code: "0x0D"
    type: integer
    min: 0
    max: 99
    description: "Volume 0-99 (0x00-0x63)"

  - id: mute_status
    label: Mute Status
    command_code: "0x0E"
    type: enum
    values:
      "0x00": Muted
      "0x01": Not muted

  - id: direct_mode
    label: Direct Mode Status
    command_code: "0x0F"
    type: enum
    values:
      "0x00": Off
      "0x01": On

  - id: decode_mode_2ch
    label: Decode Mode 2-Channel
    command_code: "0x10"
    type: enum
    values:
      "0x01": Stereo
      "0x04": Dolby Surround
      "0x07": Neo:6 Cinema
      "0x08": Neo:6 Music
      "0x09": 5/7 Ch Stereo
      "0x0A": DTS Neural:X
      "0x0C": DTS Virtual:X

  - id: decode_mode_mch
    label: Decode Mode Multi-Channel
    command_code: "0x11"
    type: enum
    values:
      "0x01": Stereo down-mix
      "0x02": Multi-channel mode
      "0x03": DTS-ES / Neural:X
      "0x06": Dolby Surround
      "0x0C": DTS Virtual:X

  - id: video_output_resolution
    label: Video Output Resolution
    command_code: "0x13"
    type: enum
    values:
      "0x02": SD Progressive
      "0x03": 720p
      "0x04": 1080i
      "0x05": 1080p
      "0x06": Preferred
      "0x07": Bypass
      "0x08": 4K

  - id: menu_status
    label: Menu Status
    command_code: "0x14"
    type: enum
    values:
      "0x00": No menu open
      "0x02": Setup Menu
      "0x03": Trim Menu
      "0x04": Bass Menu
      "0x05": Treble Menu
      "0x06": Sync Menu
      "0x07": Sub Menu
      "0x08": Tuner Menu
      "0x09": Network Menu
      "0x0A": USB Menu

  - id: tuner_preset
    label: Tuner Preset
    command_code: "0x15"
    type: integer
    values:
      min: 1
      max: 50
    special:
      "0xFF": No preset selected

  - id: tuner_frequency
    label: Tuner Frequency
    command_code: "0x16"
    type: object
    description: "Two bytes: Data1=MHz, Data2=10s of kHz"

  - id: dab_station
    label: DAB Station Name
    command_code: "0x18"
    type: string
    max_length: 16
    description: "16-byte ASCII, padded with 0x20"

  - id: dab_genre
    label: DAB Programme Type
    command_code: "0x19"
    type: string
    max_length: 16
    description: "16-byte ASCII, padded with 0x20"

  - id: dab_dls
    label: DAB DLS/PDT Info
    command_code: "0x1A"
    type: string
    max_length: 128
    description: "128-byte ASCII digital radio text, padded with 0x20"

  - id: rds_info
    label: FM RDS Information
    command_code: "0x12"
    type: string
    description: ASCII RDS text from FM station

  - id: preset_details
    label: Tuner Preset Details
    command_code: "0x1B"
    type: object
    description: "Returns preset number, type (FM freq/FM RDS/DAB), frequency, and name"

  - id: network_playback_status
    label: Network Playback Status
    command_code: "0x1C"
    type: object
    description: "0x00=Navigating (returns folder name), 0x01=Playing, 0x02=Paused (returns filename), 0xFF=Busy"

  - id: imax_enhanced_state
    label: IMAX Enhanced State
    command_code: "0x0C"
    type: enum
    values:
      "0x00": Off
      "0x01": On
      "0x02": Auto

  - id: incoming_video_params
    label: Incoming Video Parameters
    command_code: "0x42"
    type: object
    description: "7 bytes: H-res(2), V-res(2), refresh rate, interlaced flag, aspect ratio"

  - id: incoming_audio_format
    label: Incoming Audio Format
    command_code: "0x43"
    type: object
    description: "2 bytes: audio stream format (PCM/Dolby/DTS variants including Atmos/DTS:X) + channel config"

  - id: incoming_audio_sample_rate
    label: Incoming Audio Sample Rate
    command_code: "0x44"
    type: enum
    values:
      "0x00": 32 kHz
      "0x01": 44.1 kHz
      "0x02": 48 kHz
      "0x03": 88.2 kHz
      "0x04": 96 kHz
      "0x05": 176.4 kHz
      "0x06": 192 kHz
      "0x07": Unknown
      "0x08": Undetected

  - id: input_name
    label: Input Name
    command_code: "0x20"
    type: string
    max_length: 10
    description: "User-defined input name in ASCII"

  - id: headphone_override
    label: Headphone Override State
    command_code: "0x1F"
    type: enum
    values:
      "0x00": Clear
      "0x01": Set

  - id: treble_eq
    label: Treble EQ Value
    command_code: "0x35"
    type: integer
    description: "0x00-0x0C = 0 to +12dB; 0x81-0x8C = -1 to -12dB"

  - id: bass_eq
    label: Bass EQ Value
    command_code: "0x36"
    type: integer
    description: "0x00-0x0C = 0 to +12dB; 0x81-0x8C = -1 to -12dB"

  - id: room_eq_state
    label: Room EQ State
    command_code: "0x37"
    type: enum
    values:
      "0x00": Off
      "0x01": On
      "0x02": Not calculated (off)

  - id: dolby_volume_state
    label: Dolby Volume State
    command_code: "0x38"
    type: enum
    values:
      "0x00": Off
      "0x01": On

  - id: dolby_leveller_value
    label: Dolby Leveller Value
    command_code: "0x39"
    type: integer
    description: "0x00-0x0A = level 0-10; 0xFF = off"

  - id: dolby_volume_offset
    label: Dolby Volume Calibration Offset
    command_code: "0x3A"
    type: integer
    description: "0x00-0x0F = 0 to +15dB; 0x80-0x8F = -1 to -15dB"

  - id: balance_value
    label: Balance Value
    command_code: "0x3B"
    type: integer
    description: "0x00-0x06 = 0 to +6; 0x81-0x86 = -1 to -6"

  - id: subwoofer_trim_value
    label: Subwoofer Trim Value
    command_code: "0x3F"
    type: integer
    description: "0x00-0x14 = positive 0.5dB steps; 0x81-0x94 = negative 0.5dB steps"

  - id: lipsync_delay_value
    label: Lipsync Delay Value
    command_code: "0x40"
    type: integer
    description: "0x00-0x32 in 5ms steps (max 250ms)"

  - id: compression_state
    label: Compression State
    command_code: "0x41"
    type: enum
    values:
      "0x00": Off
      "0x01": Medium
      "0x02": High

  - id: sub_stereo_trim_value
    label: Sub Stereo Trim Value
    command_code: "0x45"
    type: integer
    description: "0x00=0dB; 0x81-0x94 = -0.5 to -10dB in 0.5dB steps"

  - id: osd_state
    label: Zone 1 OSD State
    command_code: "0x4E"
    type: enum
    values:
      "0x00": On
      "0x01": Off

  - id: hdmi_output_state
    label: HDMI Video Output Selection
    command_code: "0x4F"
    type: enum
    values:
      "0x02": HDMI Output 1
      "0x03": HDMI Output 2
      "0x04": HDMI Output 1 and 2
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume
    command_code: "0x0D"
    type: integer
    min: 0
    max: 99
    unit: dB
    description: Zone volume level

  - id: treble
    label: Treble EQ
    command_code: "0x35"
    type: integer
    min: -12
    max: 12
    unit: dB

  - id: bass
    label: Bass EQ
    command_code: "0x36"
    type: integer
    min: -12
    max: 12
    unit: dB

  - id: balance
    label: Balance
    command_code: "0x3B"
    type: integer
    min: -6
    max: 6

  - id: subwoofer_trim
    label: Subwoofer Trim
    command_code: "0x3F"
    type: number
    min: -10.0
    max: 10.0
    step: 0.5
    unit: dB

  - id: sub_stereo_trim
    label: Sub Stereo Trim
    command_code: "0x45"
    type: number
    min: -10.0
    max: 0.0
    step: 0.5
    unit: dB

  - id: lipsync_delay
    label: Lipsync Delay
    command_code: "0x40"
    type: integer
    min: 0
    max: 250
    step: 5
    unit: ms

  - id: dolby_leveller
    label: Dolby Leveller
    command_code: "0x39"
    type: integer
    min: 0
    max: 10

  - id: dolby_volume_offset
    label: Dolby Volume Calibration Offset
    command_code: "0x3A"
    type: integer
    min: -15
    max: 15
    unit: dB
```

## Events
```yaml
events:
  - id: state_change_notification
    description: "Unsolicited messages sent when device state changes via front panel or IR remote (e.g. volume, display brightness, decode mode, source changes). Same format as responses with AC=0x00."
    trigger: "Any state change from front panel buttons or IR remote control"
```

## Macros
```yaml
macros:
  - id: amx_discovery
    label: AMX Duet Discovery
    description: 'Send "AMX\\r" (0x41 0x4D 0x58 0x0D) to discover device. Response includes Device-SDKClass, Device-Make, Device-Model, Device-Revision in AMXB format.'
    steps:
      - send: "AMX\r"
      - expect: 'AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={model}><Device-Revision={version}>\r'
```

## Safety
```yaml
confirmation_required_for:
  - action_id: factory_reset
    mechanism: "Double confirmation bytes 0xAA 0xAA required in command data"
    description: "Prevents accidental factory reset"
  - action_id: save_restore_settings
    mechanism: "Double confirmation bytes 0x55 0x55 plus 4-digit PIN required"
    description: "Prevents accidental settings overwrite"
  - action_id: reboot
    mechanism: "ASCII string 'REBOOT' (6 bytes) required in command data"
    description: "Prevents accidental reboot"
interlocks: []
notes:
  - "Control must be explicitly enabled via front panel (hold DIRECT 4s) or OSD menu before RS232/NET commands are accepted"
  - "Certain commands return 0x85 when OSD setup menu is displayed"
  - "Tuner commands return 0x85 when tuner input is not selected"
```

## Notes
- All commands and responses are binary byte sequences, not ASCII text (except AMX discovery).
- Zone 1 (0x01) is the master zone. Commands without zone context apply to Zone 1.
- Zone 2 (0x02) supports independent power, volume, mute, and source selection.
- The RC5 IR simulation command (0x08) can replicate any IR remote function, providing an alternative control path for functions without dedicated command codes.
- Volume range is 0-99, representing 0-99dB. The volume command returns the level even when muted; use the mute status query to check mute state.
- Serial cable must be wired as null modem (pin 2↔3, pin 5↔5).
- EuP standby timer is reset by heartbeat command (0x25).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: whether protocol differs between AVR and AV processor (AV860) models beyond DAB support -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP/IP control -->
<!-- UNRESOLVED: whether TCP connection persists or drops on standby -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-23T15:10:59.604Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:10:59.604Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec actions match literal command codes in source with correct parameters and transport configuration."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
