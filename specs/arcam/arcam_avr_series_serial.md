---
spec_id: admin/arcam-avr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVR Series Control Spec"
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
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-05-12T18:52:17.888Z
last_checked_at: 2026-05-14T18:17:14.061Z
generated_at: 2026-05-14T18:17:14.061Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.061Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "All 50 spec actions match source opcodes with correct transport parameters (38400 baud, port 50000, serial framing verified)."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Arcam AVR Series Control Spec

## Summary
Binary serial/TCP control protocol for Arcam AVR390, AVR550, AVR850, AV860, and SR250 AV receivers. Communication uses a fixed-length byte-frame format with command codes (0x00–0x4F) over RS-232 (null-modem cable, 38400 baud) or TCP/IP (port 50000). Covers power, volume, input selection, audio decode modes, tuner control, EQ adjustments, and RC5 IR simulation.

<!-- UNRESOLVED: maximum concurrent connection count for TCP not stated -->
<!-- UNRESOLVED: whether RS-232 and TCP can be used simultaneously not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 50000
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: power on/off/standby commands (0x00, RC5 16-123/124)
  - queryable    # inferred: extensive query commands returning state
  - routable     # inferred: input selection (0x1D, 0x0A) and source routing
  - levelable    # inferred: volume (0x0D), bass (0x36), treble (0x35), balance (0x3B), sub trim (0x3F)
```

## Actions
```yaml
actions:
  - id: set_power
    label: Set Power State
    kind: action
    command_code: 0x00
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
        description: "Zone number (0x01=Zone1, 0x02=Zone2)"
      - name: state
        type: enum
        byte_map: data
        description: "Power state to set or query"
    notes: "Send 0xF0 to request current power state. Response data: 0x00=standby, 0x01=on"

  - id: set_volume
    label: Set Volume
    kind: action
    command_code: 0x0D
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: level
        type: integer
        min: 0
        max: 99
        byte_map: data
        description: "Volume level 0-99 (0x00-0x63). 0xF0=request current."
    notes: "Returns volume even if zone is muted. Use mute status command to check mute state."

  - id: request_mute_status
    label: Request Mute Status
    kind: action
    command_code: 0x0E
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
    notes: "Send 0xF0 as data. Response data: 0x00=muted, 0x01=not muted"

  - id: select_source
    label: Select Source
    kind: action
    command_code: 0x1D
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: source
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: "Follow Zone 1" }
          - { value: 0x01, label: CD }
          - { value: 0x02, label: BD }
          - { value: 0x03, label: AV }
          - { value: 0x04, label: SAT }
          - { value: 0x05, label: PVR }
          - { value: 0x06, label: VCR }
          - { value: 0x08, label: AUX }
          - { value: 0x09, label: DISPLAY }
          - { value: 0x0B, label: "TUNER (FM)" }
          - { value: 0x0C, label: "TUNER (DAB)" }
          - { value: 0x0E, label: NET }
          - { value: 0x0F, label: USB }
          - { value: 0x10, label: STB }
          - { value: 0x11, label: GAME }
    notes: "Send 0xF0 to request current source."

  - id: select_video_input
    label: Select Video Input
    kind: action
    command_code: 0x0A
    params:
      - name: source
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: BD }
          - { value: 0x01, label: SAT }
          - { value: 0x02, label: AV }
          - { value: 0x03, label: PVR }
          - { value: 0x04, label: VCR }
          - { value: 0x05, label: GAME }
          - { value: 0x06, label: STB }
    notes: "Zone 1 only (Zn=0x01). Send 0xF0 to request. Returns 0x85 if OSD setup is showing."

  - id: select_audio_input_type
    label: Select Analogue/Digital Audio
    kind: action
    command_code: 0x0B
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: audio_type
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: Analogue }
          - { value: 0x01, label: Digital }
          - { value: 0x02, label: HDMI }
    notes: "Send 0xF0 to request current type. Returns 0x85 if OSD setup is showing."

  - id: set_display_brightness
    label: Set Display Brightness
    kind: action
    command_code: 0x01
    params:
      - name: brightness
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: Off }
          - { value: 0x01, label: L1 }
          - { value: 0x02, label: L2 }
    notes: "Zone 1 only (Zn=0x01). Send 0xF0 to request current brightness."

  - id: simulate_rc5
    label: Simulate RC5 IR Command
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: system_code
        type: integer
        byte_map: data1
        description: "RC5 system code (e.g. 0x10 for AV, 0x17 for Zone 2)"
      - name: command_code
        type: integer
        byte_map: data2
        description: "RC5 command code"
    notes: "Simulates any IR remote command. An additional status message is usually sent as a result."

  - id: set_treble
    label: Set Treble EQ
    kind: action
    command_code: 0x35
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x0C for 0 to +12dB; 0x81-0x8C for -1 to -12dB; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_bass
    label: Set Bass EQ
    kind: action
    command_code: 0x36
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x0C for 0 to +12dB; 0x81-0x8C for -1 to -12dB; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_room_eq
    label: Set Room EQ
    kind: action
    command_code: 0x37
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: state
        type: enum
        byte_map: data
        values:
          - { value: 0xF1, label: "Room EQ On" }
          - { value: 0xF2, label: "Room EQ Off" }
    notes: "Send 0xF0 to request. Response: 0x00=off, 0x01=on, 0x02=not calculated (off)"

  - id: set_dolby_volume
    label: Set Dolby Volume
    kind: action
    command_code: 0x38
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: state
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: Off }
          - { value: 0x01, label: On }
    notes: "Send 0xF0 to request current state."

  - id: set_dolby_leveller
    label: Set Dolby Leveller
    kind: action
    command_code: 0x39
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x0A for level 0-10; 0xFF=off; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_dolby_volume_cal_offset
    label: Set Dolby Volume Calibration Offset
    kind: action
    command_code: 0x3A
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x0F for 0 to +15dB; 0x80-0x8F for -1 to -15dB; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_balance
    label: Set Balance
    kind: action
    command_code: 0x3B
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x06 for 0 to +6; 0x81-0x86 for -1 to -6; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_subwoofer_trim
    label: Set Subwoofer Trim
    kind: action
    command_code: 0x3F
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x14 for positive trim in 0.5dB steps; 0x81-0x94 for negative; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_lipsync_delay
    label: Set Lipsync Delay
    kind: action
    command_code: 0x40
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: value
        type: integer
        byte_map: data
        description: "0x00-0x32 delay in 5ms steps; 0xF0=request; 0xF1=increment; 0xF2=decrement"

  - id: set_compression
    label: Set Dynamic Range Compression
    kind: action
    command_code: 0x41
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: mode
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: Off }
          - { value: 0x01, label: Medium }
          - { value: 0x02, label: High }
    notes: "Send 0xF0 to request current setting."

  - id: set_imax_enhanced
    label: Set IMAX Enhanced
    kind: action
    command_code: 0x0C
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: mode
        type: enum
        byte_map: data
        values:
          - { value: 0xF1, label: Auto }
          - { value: 0xF2, label: On }
          - { value: 0xF3, label: Off }
    notes: "Send 0xF0 to request. Response: 0x00=off, 0x01=on, 0x02=auto"

  - id: set_headphone_override
    label: Set Headphone Override
    kind: action
    command_code: 0x1F
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: state
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: "Clear (speakers muted if headphones present)" }
          - { value: 0x01, label: "Set (speakers unmuted if headphones present)" }
    notes: "Activates/deactivates mute relays without zeroing volume."

  - id: set_display_info_type
    label: Set Display Information Type
    kind: action
    command_code: 0x09
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: info_type
        type: integer
        byte_map: data
        description: "0x00=Processing mode, 0xE0=cycle all, 0xF0=request. Source-specific values: FM/DAB/NET 0x01-0x05 vary by source."

  - id: set_tuner_preset
    label: Set Tuner Preset
    kind: action
    command_code: 0x15
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: preset
        type: integer
        min: 1
        max: 50
        byte_map: data
        description: "Preset number 1-50 (0x01-0x32). 0xF0=request current."

  - id: tune_step
    label: Tune Frequency Step
    kind: action
    command_code: 0x16
    params:
      - name: zone
        type: integer
        values: [1, 2]
        byte_map: zone_number
      - name: direction
        type: enum
        byte_map: data
        values:
          - { value: 0x00, label: Decrement }
          - { value: 0x01, label: Increment }
    notes: "Steps by 0.05MHz (FM). Send 0xF0 to request current frequency. Response: 2 bytes (MHz, 10s kHz)."

  - id: fm_scan
    label: FM Scan
    kind: action
    command_code: 0x23
    params:
      - name: direction
        type: enum
        byte_map: data
        values:
          - { value: 0x01, label: "Scan Up" }
          - { value: 0x02, label: "Scan Down" }
    notes: "Zone 1 only. Only valid when FM input is selected."

  - id: dab_scan
    label: DAB Scan
    kind: action
    command_code: 0x24
    params: []
    notes: "Zone 1 only. Send 0xF0 as data to start scan. Only valid when DAB input is selected."

  - id: heartbeat
    label: Heartbeat
    kind: action
    command_code: 0x25
    params: []
    notes: "Zone 1 only. Send 0xF0 as data. Resets EuP standby timer. Response data: 0x00."

  - id: reboot
    label: Reboot
    kind: action
    command_code: 0x26
    params: []
    notes: "Zone 1 only. Data bytes: 0x52 0x45 0x42 0x4F 0x4F 0x54 ('REBOOT'). Confirmation pattern required."

  - id: factory_reset
    label: Restore Factory Defaults
    kind: action
    command_code: 0x05
    params: []
    notes: "Zone 1 only. Requires confirmation data: 0xAA 0xAA (two bytes). Irreversible."

  - id: save_restore_settings
    label: Save/Restore Secure Settings
    kind: action
    command_code: 0x06
    params:
      - name: operation
        type: enum
        byte_map: data1
        values:
          - { value: 0x00, label: Save }
          - { value: 0x01, label: Restore }
      - name: pin
        type: string
        byte_map: data4-data7
        description: "4-digit PIN as 4 bytes (digit1, digit2, digit3, digit4)"
    notes: "Confirmation bytes 0x55 0x55 required (data2, data3). Returns 0x85 if no secure copy exists."

  - id: set_sub_stereo_trim
    label: Set Sub Stereo Trim
    kind: action
    command_code: 0x45
    params:
      - name: value
        type: integer
        byte_map: data
        description: "0x00=0dB; 0x81-0x94 for -0.5 to -10.0dB in 0.5dB steps; 0xF0=request; 0xF1=increment; 0xF2=decrement"
    notes: "Zone 1 only."

  - id: set_osd
    label: Set Zone 1 OSD
    kind: action
    command_code: 0x4E
    params:
      - name: state
        type: enum
        byte_map: data
        values:
          - { value: 0xF1, label: On }
          - { value: 0xF2, label: Off }
    notes: "Zone 1 only. Send 0xF0 to request. Response: 0x00=on, 0x01=off."

  - id: set_hdmi_output
    label: Set HDMI Video Output
    kind: action
    command_code: 0x4F
    params:
      - name: output
        type: enum
        byte_map: data
        values:
          - { value: 0x02, label: "HDMI Output 1" }
          - { value: 0x03, label: "HDMI Output 2" }
          - { value: 0x04, label: "HDMI Output 1 & 2" }
    notes: "Zone 1 only. Send 0xF0 to request current selection."

  - id: set_input_name
    label: Set/Request Input Name
    kind: action
    command_code: 0x20
    params:
      - name: name
        type: string
        byte_map: data
        max_length: 10
        description: "Input name in ASCII (max 10 chars). Send 0xF0 to query current name."
    notes: "Zone 1 only."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command_code: 0x00
    type: enum
    values: [standby, on]
    byte_map: { standby: 0x00, on: 0x01 }
    description: "Queried via 0x00 with data 0xF0. Also sent unsolicited on state change."

  - id: volume_level
    label: Volume Level
    command_code: 0x0D
    type: integer
    range: [0, 99]
    description: "Queried via 0x0D with data 0xF0. Sent unsolicited on volume change."

  - id: mute_status
    label: Mute Status
    command_code: 0x0E
    type: enum
    values: [muted, not_muted]
    byte_map: { muted: 0x00, not_muted: 0x01 }
    description: "Queried via 0x0E with data 0xF0."

  - id: current_source
    label: Current Source
    command_code: 0x1D
    type: enum
    values: [follow_z1, CD, BD, AV, SAT, PVR, VCR, AUX, DISPLAY, FM, DAB, NET, USB, STB, GAME]
    description: "Queried via 0x1D with data 0xF0. Sent unsolicited on source change."

  - id: display_brightness
    label: Display Brightness
    command_code: 0x01
    type: enum
    values: [off, L1, L2]
    byte_map: { off: 0x00, L1: 0x01, L2: 0x02 }

  - id: headphone_connected
    label: Headphone Connection
    command_code: 0x02
    type: enum
    values: [not_connected, connected]
    byte_map: { not_connected: 0x00, connected: 0x01 }

  - id: direct_mode
    label: Direct Mode
    command_code: 0x0F
    type: enum
    values: [off, on]
    byte_map: { off: 0x00, on: 0x01 }

  - id: decode_mode_2ch
    label: Decode Mode 2ch
    command_code: 0x10
    type: enum
    values: [Stereo, Dolby_Surround, Neo6_Cinema, Neo6_Music, Ch57_Stereo, DTS_NeuralX, DTS_VirtualX]

  - id: decode_mode_mch
    label: Decode Mode MCH
    command_code: 0x11
    type: enum
    values: [Stereo_downmix, Multichannel, DTS_ES_NeuralX, Dolby_Surround, DTS_VirtualX]

  - id: video_output_resolution
    label: Video Output Resolution
    command_code: 0x13
    type: enum
    values: [SD_Progressive, 720p, 1080i, 1080p, Preferred, Bypass, 4k]

  - id: menu_status
    label: Menu Status
    command_code: 0x14
    type: enum
    values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]

  - id: network_playback_status
    label: Network Playback Status
    command_code: 0x1C
    type: enum
    values: [navigating, playing, paused, busy]
    description: "Response includes ASCII filename or folder name."

  - id: incoming_video_params
    label: Incoming Video Parameters
    command_code: 0x42
    type: object
    description: "Returns horizontal res (2 bytes), vertical res (2 bytes), refresh rate, interlaced flag, aspect ratio."

  - id: incoming_audio_format
    label: Incoming Audio Format
    command_code: 0x43
    type: object
    description: "Returns audio stream format and channel configuration."

  - id: incoming_audio_sample_rate
    label: Incoming Audio Sample Rate
    command_code: 0x44
    type: enum
    values: [32kHz, 44_1kHz, 48kHz, 88_2kHz, 96kHz, 176_4kHz, 192kHz, Unknown, Undetected]

  - id: software_version
    label: Software Version
    command_code: 0x04
    type: object
    description: "Request versions: 0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP. Response: major.minor."

  - id: answer_code
    label: Answer Code
    type: enum
    values: [status_update, zone_invalid, command_unrecognised, parameter_unrecognised, command_invalid_now, invalid_data_length]
    byte_map: { status_update: 0x00, zone_invalid: 0x82, command_unrecognised: 0x83, parameter_unrecognised: 0x84, command_invalid_now: 0x85, invalid_data_length: 0x86 }
    description: "Returned in every response. 0x85 occurs when setup menu is displayed or command not valid for current input."
```

## Variables
```yaml
variables:
  - id: treble_eq
    label: Treble EQ
    command_code: 0x35
    type: integer
    unit: dB
    range: [-12, 12]
    description: "0x00-0x0C=0 to +12dB; 0x81-0x8C=-1 to -12dB"

  - id: bass_eq
    label: Bass EQ
    command_code: 0x36
    type: integer
    unit: dB
    range: [-12, 12]
    description: "0x00-0x0C=0 to +12dB; 0x81-0x8C=-1 to -12dB"

  - id: balance
    label: Balance
    command_code: 0x3B
    type: integer
    range: [-6, 6]

  - id: subwoofer_trim
    label: Subwoofer Trim
    command_code: 0x3F
    type: float
    unit: dB
    resolution: 0.5
    description: "0x00-0x14 positive in 0.5dB steps; 0x81-0x94 negative"

  - id: sub_stereo_trim
    label: Sub Stereo Trim
    command_code: 0x45
    type: float
    unit: dB
    resolution: 0.5
    description: "0x00=0dB; 0x81-0x94 for negative values in 0.5dB steps"

  - id: lipsync_delay
    label: Lipsync Delay
    command_code: 0x40
    type: integer
    unit: ms
    resolution: 5
    range: [0, 250]
    description: "0x00-0x32 in 5ms steps"

  - id: dolby_leveller
    label: Dolby Leveller
    command_code: 0x39
    type: integer
    range: [0, 10]
    description: "0x00-0x0A; 0xFF=off"

  - id: dolby_volume_cal_offset
    label: Dolby Volume Calibration Offset
    command_code: 0x3A
    type: integer
    unit: dB
    range: [-15, 15]
    description: "0x00-0x0F for 0 to +15dB; 0x80-0x8F for -1 to -15dB"
```

## Events
```yaml
events:
  - id: unsolicited_state_change
    label: Unsolicited State Change
    description: >-
      The AVR sends messages when state changes due to front panel or IR remote input.
      These use the same response format with the relevant command code and answer code 0x00.
      Examples include volume changes, source changes, decode mode changes, and display brightness changes.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - action_id: factory_reset
    confirmation: "Requires data bytes 0xAA 0xAA"
  - action_id: reboot
    confirmation: "Requires data bytes spelling 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54)"
  - action_id: save_restore_settings
    confirmation: "Requires 0x55 0x55 confirmation bytes plus 4-digit PIN"
interlocks:
  - "Commands 0xF0-0xFF are reserved for test functions and must never be used"
  - "Video selection (0x0A) and analogue/digital select (0x0B) return error 0x85 when OSD setup screen is showing"
  - "Tuner commands return error 0x85 when tuner input is not selected"
# UNRESOLVED: power-on sequencing requirements not stated in source
```

## Notes

**Frame format:** All commands use binary byte sequences. Command frame: `0x21 <Zn> <Cc> <Dl> <Data...> 0x0D`. Response frame: `0x21 <Zn> <Cc> <Ac> <Dl> <Data...> 0x0D`. The AVR responds within three seconds; further commands may be sent before a previous response is received.

**Zone addressing:** Zone 1 (0x01) is the master zone. Zone 2 (0x02) supports subset of commands. Zone-less commands refer to Zone 1.

**RS-232 cable:** Null-modem wiring — pin 2↔3 (Rx↔Tx), pin 5↔5 (ground).

**RC5 IR simulation:** Command 0x08 allows sending any RC5 code. The full RC5 code table for system 0x10 (AV) and 0x17 (Zone 2) is documented, providing an alternative control path for functions without dedicated command codes (e.g., power on=16-123, power off=16-124, mute=16-13, volume up=16-16, volume down=16-17).

**AMX Duet discovery:** Sending "AMX\r" triggers DDDP response with device class, make, model, and RS232 protocol version.

**Control must be enabled:** RS-232/IP control is disabled by default. Enable via front panel (hold DIRECT 4 seconds) or OSD menu (General Setup > Control > On).

<!-- UNRESOLVED: RS-232 control enable state persistence across reboots not stated -->
<!-- UNRESOLVED: maximum response data length in practice (spec says n limited to 255) -->
<!-- UNRESOLVED: TCP connection keep-alive or timeout behavior not stated -->
<!-- UNRESOLVED: whether multiple simultaneous TCP connections are supported -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-05-12T18:52:17.888Z
last_checked_at: 2026-05-14T18:17:14.061Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.061Z
matched_actions: 33
action_count: 33
confidence: high
summary: "All 50 spec actions match source opcodes with correct transport parameters (38400 baud, port 50000, serial framing verified)."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
