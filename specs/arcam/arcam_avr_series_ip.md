---
schema_version: ai4av-public-spec-v1
device_id: arcam/avr390
entity_id: arcam_avr_series
spec_id: admin/arcam-avr-series
revision: 1
author: admin
title: "Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec"
status: published
manufacturer: Arcam
manufacturer_key: arcam
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
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
source_documents:
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:44.959Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:47.446Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:49.892Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:52.364Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:54.633Z
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-23T15:11:09.160Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:11:09.160Z
  matched_actions: 50
  action_count: 69
  confidence: high
  summary: "Every spec action matched verbatim with source commands; transport parameters confirmed; command catalogue fully represented; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec

## Summary
Binary control protocol for Arcam AVR390, AVR550, AVR850, AV860, and SR250 AV receivers over RS-232 serial and TCP/IP. All commands and responses use a fixed-length byte frame with start byte 0x21, zone number, command code, data length, data bytes, and end byte 0x0D. The device supports two zones and provides control for power, volume, input selection, decode modes, EQ, tuner, and network playback.

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred from power command (0x00)
  - queryable    # inferred from numerous query/status commands
  - routable     # inferred from source/input selection commands
  - levelable    # inferred from volume, bass, treble, balance, trim controls
```

## Actions
```yaml
actions:
  - id: request_power
    label: Request Power State
    kind: action
    command_code: "0x00"
    description: Request the standby state of a zone
    params:
      - name: zone
        type: integer
        values: [1, 2]
        description: "Zone number (0x01 or 0x02)"
    data: "0xF0 (request power state)"
    note: Response data 0x00 = standby, 0x01 = powered on

  - id: set_display_brightness
    label: Set Display Brightness
    kind: action
    command_code: "0x01"
    description: Request or set the front panel display brightness
    params:
      - name: brightness
        type: enum
        values: ["off", "L1", "L2"]
        description: "0x00=off, 0x01=L1, 0x02=L2. 0xF0=request current"
    note: Zone 1 only

  - id: request_headphone_status
    label: Request Headphone Status
    kind: action
    command_code: "0x02"
    description: Determine whether headphones are connected
    params: []
    note: Response data 0x00=not connected, 0x01=connected. Zone 1 only

  - id: request_fm_genre
    label: Request FM Genre
    kind: action
    command_code: "0x03"
    description: Request current station programme type from FM source
    params:
      - name: zone
        type: integer
        values: [1, 2]
        description: "Zone number"
    note: Returns ASCII programme type string. Error 0x85 if FM not selected

  - id: request_software_version
    label: Request Software Version
    kind: action
    command_code: "0x04"
    description: Request version of various software components
    params:
      - name: component
        type: enum
        values: ["RS232", "Host", "OSD", "DSP", "NET", "IAP"]
        description: "0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"
    note: Response includes major.minor version numbers. Zone 1 only

  - id: restore_factory_defaults
    label: Restore Factory Defaults
    kind: action
    command_code: "0x05"
    description: Force restore of factory default settings
    params: []
    note: Requires confirmation data 0xAA 0xAA. Zone 1 only

  - id: save_restore_settings
    label: Save/Restore Secure Settings
    kind: action
    command_code: "0x06"
    description: Save or restore a secure backup of settings
    params:
      - name: operation
        type: enum
        values: ["save", "restore"]
        description: "0x00=save, 0x01=restore"
      - name: pin
        type: string
        description: "4-digit PIN as 4 data bytes"
    note: Requires confirmation 0x55 0x55. Returns 0x85 if no backup exists

  - id: simulate_rc5
    label: Simulate RC5 IR Command
    kind: action
    command_code: "0x08"
    description: Simulate an RC5 IR command via the control link
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: system_code
        type: integer
        description: "RC5 system code (e.g. 0x10 for AV, 0x17 for Zone 2)"
      - name: command_code
        type: integer
        description: "RC5 command code"

  - id: set_display_info_type
    label: Set Display Info Type
    kind: action
    command_code: "0x09"
    description: Set or request the VFD display information type
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: info_type
        type: integer
        description: "0x00=Processing, 0xE0=Cycle, 0xF0=Request. Source-specific values vary"

  - id: select_video_input
    label: Select Video Input
    kind: action
    command_code: "0x0A"
    description: Change the video input
    params:
      - name: source
        type: enum
        values: ["BD", "SAT", "AV", "PVR", "VCR", "GAME", "STB"]
        description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=GAME, 0x06=STB. 0xF0=request current"
    note: Zone 1 only. Returns 0x85 if OSD setup screen is showing

  - id: select_audio_type
    label: Select Analogue/Digital Audio
    kind: action
    command_code: "0x0B"
    description: Select analogue/digital/HDMI audio input for current source
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: audio_type
        type: enum
        values: ["analogue", "digital", "hdmi"]
        description: "0x00=analogue, 0x01=digital, 0x02=HDMI. 0xF0=request current"

  - id: set_imax_enhanced
    label: Set IMAX Enhanced
    kind: action
    command_code: "0x0C"
    description: Control IMAX Enhanced mode
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: mode
        type: enum
        values: ["auto", "on", "off"]
        description: "0xF0=request, 0xF1=auto, 0xF2=on, 0xF3=off"

  - id: set_volume
    label: Set Volume
    kind: action
    command_code: "0x0D"
    description: Set or request the volume of a zone (0-99)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: volume
        type: integer
        min: 0
        max: 99
        description: "Volume level 0x00-0x63. 0xF0=request current"

  - id: request_mute
    label: Request Mute Status
    kind: action
    command_code: "0x0E"
    description: Request the mute status of a zone
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: Response 0x00=muted, 0x01=not muted

  - id: request_direct_mode
    label: Request Direct Mode Status
    kind: action
    command_code: "0x0F"
    description: Request the direct mode status on Zone 1
    params: []
    note: Response 0x00=off, 0x01=on. Zone 1 only

  - id: request_decode_mode_2ch
    label: Request Decode Mode 2ch
    kind: action
    command_code: "0x10"
    description: Request decode mode for two-channel material
    params: []
    note: "Response: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0C=DTS Virtual:X. Zone 1 only"

  - id: request_decode_mode_mch
    label: Request Decode Mode MCH
    kind: action
    command_code: "0x11"
    description: Request decode mode for multi-channel material
    params: []
    note: "Response: 0x01=Stereo down-mix, 0x02=Multi-ch, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X. Zone 1 only"

  - id: request_rds_info
    label: Request RDS Information
    kind: action
    command_code: "0x12"
    description: Request RDS information from current FM station
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: Returns ASCII RDS text. Error 0x85 if FM not selected

  - id: request_video_resolution
    label: Request Video Output Resolution
    kind: action
    command_code: "0x13"
    description: Request the video output resolution of Zone 1
    params: []
    note: "Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4K. Zone 1 only"

  - id: request_menu_status
    label: Request Menu Status
    kind: action
    command_code: "0x14"
    description: Request which menu (if any) is open
    params: []
    note: "Response: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB. Zone 1 only"

  - id: set_tuner_preset
    label: Set/Request Tuner Preset
    kind: action
    command_code: "0x15"
    description: Select or request the current tuner preset (1-50)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: preset
        type: integer
        min: 1
        max: 50
        description: "Preset number 1-50. 0xF0=request current. Response 0xFF=no preset"

  - id: tune
    label: Tune Frequency
    kind: action
    command_code: "0x16"
    description: Increment/decrement tuner frequency or request current frequency
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: direction
        type: enum
        values: ["decrement", "increment", "request"]
        description: "0x00=decrement, 0x01=increment, 0xF0=request current"
    note: "FM steps in 0.05MHz. Response is MHz + 10s kHz as 2 bytes"

  - id: request_dab_station
    label: Request DAB Station
    kind: action
    command_code: "0x18"
    description: Request the current DAB station name
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: "Returns 16-byte ASCII service label, space-padded. Error 0x85 if DAB not selected"

  - id: request_dab_genre
    label: Request DAB Programme Type
    kind: action
    command_code: "0x19"
    description: Request programme type from DAB source
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: Returns 16-byte ASCII programme type, space-padded

  - id: request_dls_info
    label: Request DLS/PDT Info
    kind: action
    command_code: "0x1A"
    description: Request DLS/PDT digital radio text from current DAB station
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: Returns up to 128-byte ASCII text, space-padded

  - id: request_preset_details
    label: Request Preset Details
    kind: action
    command_code: "0x1B"
    description: Request details of a specific tuner preset
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: preset
        type: integer
        min: 1
        max: 50

  - id: request_network_status
    label: Request Network Playback Status
    kind: action
    command_code: "0x1C"
    description: Request current network playback status
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: "Response Data1: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy. Followed by folder/filename in ASCII"

  - id: request_current_source
    label: Request Current Source
    kind: action
    command_code: "0x1D"
    description: Request the source currently selected for a zone
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: "Response: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=FM, 0x0C=DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME"

  - id: set_input_name
    label: Set/Request Input Name
    kind: action
    command_code: "0x20"
    description: Set or query the user-defined name of the current input (max 10 chars)
    params:
      - name: name
        type: string
        max_length: 10
        description: "ASCII name up to 10 chars. 0xF0 to query. Zone 1 only"

  - id: fm_scan
    label: FM Scan Up/Down
    kind: action
    command_code: "0x23"
    description: Initiate an FM scan up or down
    params:
      - name: direction
        type: enum
        values: ["up", "down"]
        description: "0x01=scan up, 0x02=scan down"
    note: Zone 1 only. Only valid on FM input. Response 0xFF=scanning

  - id: dab_scan
    label: DAB Scan
    kind: action
    command_code: "0x24"
    description: Initiate a DAB scan
    params: []
    note: Zone 1 only. Only valid on DAB input. Response 0xFF=scanning

  - id: heartbeat
    label: Heartbeat
    kind: action
    command_code: "0x25"
    description: Check unit is connected and reset EuP standby timer
    params: []
    note: Zone 1 only

  - id: reboot
    label: Reboot
    kind: action
    command_code: "0x26"
    description: Force a reboot of the unit
    params: []
    note: "Zone 1 only. Data payload is ASCII 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54)"

  - id: set_headphone_override
    label: Set Headphone Override
    kind: action
    command_code: "0x1F"
    description: Activate/deactivate mute relays (speakers on/off when headphones present)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values: ["clear", "set"]
        description: "0x00=clear (speakers muted with HP), 0x01=set (speakers unmuted with HP)"

  - id: set_treble
    label: Set Treble EQ
    kind: action
    command_code: "0x35"
    description: Adjust treble equalisation (-12dB to +12dB)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB. 0xF0=request, 0xF1=increment, 0xF2=decrement"

  - id: set_bass
    label: Set Bass EQ
    kind: action
    command_code: "0x36"
    description: Adjust bass equalisation (-12dB to +12dB)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB. 0xF0=request, 0xF1=increment, 0xF2=decrement"

  - id: set_room_eq
    label: Set Room EQ
    kind: action
    command_code: "0x37"
    description: Turn room equalisation on or off
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values: ["on", "off"]
        description: "0xF1=on, 0xF2=off. 0xF0=request current"
    note: "Response: 0x00=off, 0x01=on, 0x02=not calculated (off)"

  - id: set_dolby_volume
    label: Set Dolby Volume
    kind: action
    command_code: "0x38"
    description: Control Dolby volume system on/off
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: state
        type: enum
        values: ["off", "on"]
        description: "0x00=off, 0x01=on. 0xF0=request"

  - id: set_dolby_leveller
    label: Set Dolby Leveller
    kind: action
    command_code: "0x39"
    description: Control the Dolby volume leveller (0-10 or off)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        min: 0
        max: 10
        description: "0x00-0x0A=level 0-10, 0xFF=off. 0xF0=request, 0xF1=increment, 0xF2=decrement"

  - id: set_dolby_volume_cal_offset
    label: Set Dolby Volume Calibration Offset
    kind: action
    command_code: "0x3A"
    description: Adjust Dolby volume calibration offset (-15dB to +15dB)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x0F=0 to +15dB, 0x80-0x8F=-1 to -15dB. 0xF0=request, 0xF1=increment, 0xF2=decrement"

  - id: set_balance
    label: Set Balance
    kind: action
    command_code: "0x3B"
    description: Adjust balance control (-6 to +6)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x06=0 to +6, 0x81-0x86=-1 to -6. 0xF0=request, 0xF1=increment, 0xF2=decrement"

  - id: set_subwoofer_trim
    label: Set Subwoofer Trim
    kind: action
    command_code: "0x3F"
    description: Adjust subwoofer trim in 0.5dB steps
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x14=+0 to +10dB (0.5dB steps), 0x81-0x94=-0.5 to -10dB. 0xF0=request, 0xF1=+0.5dB, 0xF2=-0.5dB"

  - id: set_lipsync_delay
    label: Set Lipsync Delay
    kind: action
    command_code: "0x40"
    description: Adjust lipsync delay in 5ms steps (0-250ms)
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: value
        type: integer
        description: "0x00-0x32=delay in 5ms steps. 0xF0=request, 0xF1=+5ms, 0xF2=-5ms"

  - id: set_compression
    label: Set Compression
    kind: action
    command_code: "0x41"
    description: Set dynamic range compression
    params:
      - name: zone
        type: integer
        values: [1, 2]
      - name: level
        type: enum
        values: ["off", "medium", "high"]
        description: "0x00=off, 0x01=medium, 0x02=high. 0xF0=request"

  - id: request_video_params
    label: Request Incoming Video Parameters
    kind: action
    command_code: "0x42"
    description: Request incoming video resolution, refresh rate, and aspect ratio
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: "Response is 7 bytes: H-res MSB/LSB, V-res MSB/LSB, refresh rate, interlaced flag, aspect ratio"

  - id: request_audio_format
    label: Request Incoming Audio Format
    kind: action
    command_code: "0x43"
    description: Request incoming audio stream format and channel configuration
    params:
      - name: zone
        type: integer
        values: [1, 2]
    note: "Response 2 bytes: format (PCM, Dolby Digital, DTS, Atmos, DTS:X, etc.) and channel config"

  - id: request_audio_sample_rate
    label: Request Incoming Audio Sample Rate
    kind: action
    command_code: "0x44"
    description: Request incoming audio sample rate
    params: []
    note: "Response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected"

  - id: set_sub_stereo_trim
    label: Set Sub Stereo Trim
    kind: action
    command_code: "0x45"
    description: Set or request subwoofer trim for stereo mode
    params:
      - name: value
        type: integer
        description: "0x00=0dB, 0x81-0x94=-0.5 to -10dB. 0xF0=request, 0xF1=+0.5dB, 0xF2=-0.5dB"
    note: Zone 1 only

  - id: set_osd
    label: Set Zone 1 OSD
    kind: action
    command_code: "0x4E"
    description: Set or request whether Zone 1 OSD is shown
    params:
      - name: state
        type: enum
        values: ["on", "off"]
        description: "0xF1=on, 0xF2=off. 0xF0=request"
    note: Zone 1 only. Response 0x00=on, 0x01=off

  - id: set_hdmi_output
    label: Set HDMI Video Output
    kind: action
    command_code: "0x4F"
    description: Set or request the HDMI video output selection
    params:
      - name: output
        type: enum
        values: ["HDMI 1", "HDMI 2", "HDMI 1+2"]
        description: "0x02=HDMI 1, 0x03=HDMI 2, 0x04=HDMI 1+2. 0xF0=request"
    note: Zone 1 only
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, on]
    command_code: "0x00"
    description: "Power state per zone. 0x00=standby, 0x01=on"

  - id: display_brightness
    type: enum
    values: ["off", "L1", "L2"]
    command_code: "0x01"
    description: "Front panel display brightness level"

  - id: headphone_status
    type: enum
    values: [disconnected, connected]
    command_code: "0x02"
    description: "Headphone connection status"

  - id: volume_level
    type: integer
    min: 0
    max: 99
    command_code: "0x0D"
    description: "Current volume level per zone (0-99)"

  - id: mute_status
    type: enum
    values: [muted, unmuted]
    command_code: "0x0E"
    description: "Mute status per zone"

  - id: direct_mode
    type: enum
    values: ["off", "on"]
    command_code: "0x0F"
    description: "Direct mode status"

  - id: decode_mode_2ch
    type: enum
    values: ["Stereo", "Dolby Surround", "Neo:6 Cinema", "Neo:6 Music", "5/7 Ch Stereo", "DTS Neural:X", "DTS Virtual:X"]
    command_code: "0x10"
    description: "Decode mode for two-channel material"

  - id: decode_mode_mch
    type: enum
    values: ["Stereo down-mix", "Multi-channel", "DTS-ES/Neural:X", "Dolby Surround", "DTS Virtual:X"]
    command_code: "0x11"
    description: "Decode mode for multi-channel material"

  - id: video_output_resolution
    type: enum
    values: ["SD Progressive", "720p", "1080i", "1080p", "Preferred", "Bypass", "4K"]
    command_code: "0x13"
    description: "Video output resolution"

  - id: menu_status
    type: enum
    values: ["None", "Setup", "Trim", "Bass", "Treble", "Sync", "Sub", "Tuner", "Network", "USB"]
    command_code: "0x14"
    description: "Which menu is currently open"

  - id: current_source
    type: enum
    values: ["Follow Z1", "CD", "BD", "AV", "SAT", "PVR", "VCR", "AUX", "DISPLAY", "FM", "DAB", "NET", "USB", "STB", "GAME"]
    command_code: "0x1D"
    description: "Currently selected source per zone"

  - id: network_playback_status
    type: enum
    values: ["Navigating", "Playing", "Paused", "Busy"]
    command_code: "0x1C"
    description: "Network playback state with folder/filename in ASCII"

  - id: audio_format
    type: enum
    values: ["PCM", "Analogue Direct", "Dolby Digital", "Dolby Digital EX", "Dolby Digital Surround", "Dolby Digital Plus", "Dolby True HD", "DTS", "DTS 96/24", "DTS ES Matrix", "DTS ES Discrete", "DTS HD Master Audio", "DTS HD High Res", "Dolby Atmos", "DTS:X", "IMAX Enhanced"]
    command_code: "0x43"
    description: "Incoming audio stream format"

  - id: audio_sample_rate
    type: enum
    values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", "Unknown", "Undetected"]
    command_code: "0x44"
    description: "Incoming audio sample rate"

  - id: room_eq_state
    type: enum
    values: ["off", "on", "not_calculated"]
    command_code: "0x37"
    description: "Room EQ state"

  - id: imax_enhanced_state
    type: enum
    values: ["off", "on", "auto"]
    command_code: "0x0C"
    description: "IMAX Enhanced state"

  - id: dolby_volume_state
    type: enum
    values: ["off", "on"]
    command_code: "0x38"
    description: "Dolby Volume state"

  - id: incoming_video_params
    type: composite
    command_code: "0x42"
    description: "Incoming video H-res, V-res, refresh rate, interlaced flag, aspect ratio (7 bytes)"

  - id: answer_code
    type: enum
    values: ["OK", "Zone Invalid", "Command Not Recognised", "Parameter Not Recognised", "Command Invalid Now", "Invalid Data Length"]
    description: "Error response codes: 0x00=OK, 0x82=Zone Invalid, 0x83=Command Not Recognised, 0x84=Parameter Not Recognised, 0x85=Command Invalid Now, 0x86=Invalid Data Length"
```

## Variables
```yaml
variables:
  - id: treble
    command_code: "0x35"
    type: integer
    range: "-12dB to +12dB"
    description: "Treble EQ. 0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB"

  - id: bass
    command_code: "0x36"
    type: integer
    range: "-12dB to +12dB"
    description: "Bass EQ. 0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB"

  - id: balance
    command_code: "0x3B"
    type: integer
    range: "-6 to +6"
    description: "Balance. 0x00-0x06=0 to +6, 0x81-0x86=-1 to -6"

  - id: subwoofer_trim
    command_code: "0x3F"
    type: float
    range: "-10dB to +10dB"
    step: 0.5
    description: "Subwoofer trim in 0.5dB steps"

  - id: sub_stereo_trim
    command_code: "0x45"
    type: float
    range: "-10dB to 0dB"
    step: 0.5
    description: "Subwoofer trim for stereo mode in 0.5dB steps"

  - id: lipsync_delay
    command_code: "0x40"
    type: integer
    range: "0ms to 250ms"
    step: 5
    description: "Lipsync delay in 5ms steps"

  - id: dolby_leveller
    command_code: "0x39"
    type: integer
    range: "0-10 or off"
    description: "Dolby volume leveller setting"

  - id: dolby_volume_cal_offset
    command_code: "0x3A"
    type: integer
    range: "-15dB to +15dB"
    description: "Dolby volume calibration offset"

  - id: compression
    command_code: "0x41"
    type: enum
    values: ["off", "medium", "high"]
    description: "Dynamic range compression level"
```

## Events
```yaml
events:
  - id: unsolicited_state_change
    description: "The AVR sends unsolicited messages when state changes from front panel or IR input (e.g. volume change, decode mode change, display brightness change). Uses the same response format as query responses."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - action: restore_factory_defaults
    description: "Requires 0xAA 0xAA confirmation bytes"
  - action: save_restore_settings
    description: "Requires 0x55 0x55 confirmation bytes plus 4-digit PIN"
  - action: reboot
    description: "Requires ASCII 'REBOOT' (6 bytes) as confirmation"
interlocks: []
note: "Commands 0xF0-0xFF are reserved for test functions and must never be used"
```

## Notes
- Binary byte-oriented protocol. All commands use frame format: `0x21 <Zone> <CC> <Dl> <Data...> 0x0D`. Responses add an Answer Code byte after CC.
- Two zones supported: Zone 1 (0x01, master) and Zone 2 (0x02).
- The AVR responds within 3 seconds. The controller may send further commands before a previous response is received.
- AMX Duet DDDP discovery supported via ASCII command `"AMX\r"`.
- RS232 control must be explicitly enabled (front panel DIRECT button 4s, or OSD menu General Setup > Control > On).
- Many commands return error 0x85 when the OSD setup menu is displayed, or when the required source (FM/DAB/NET) is not selected.
- RC5 IR simulation (0x08) provides an alternate control path for any IR-remote function.
- Null modem serial cable: pin 2→3 (Rx→Tx), pin 3→2 (Tx→Rx), pin 5→5 (Ground).

<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: keep-alive / connection timeout behavior not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: whether TCP uses same binary framing as RS-232 or wraps it differently not explicitly stated (assumed same) -->
<!-- UNRESOLVED: maximum data payload length beyond 255 bytes not stated -->

## Provenance

```yaml
source_urls:
  - https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
source_documents:
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:44.959Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:47.446Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:49.892Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:52.364Z
  - title: "Arcam public source"
    url: https://arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T08:49:54.633Z
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-23T15:11:09.160Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:11:09.160Z
matched_actions: 50
action_count: 69
confidence: high
summary: "Every spec action matched verbatim with source commands; transport parameters confirmed; command catalogue fully represented; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```
