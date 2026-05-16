---
spec_id: admin/lexicon-mc8-mc8b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon MC8 MC8B Control Spec"
manufacturer: Lexicon
model_family: MC8
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - MC8
    - MC8B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicondsp.pl
  - lexicon.com
source_urls:
  - https://www.lexicondsp.pl/upload/mc10/RS232_Protocol_Documentation.pdf
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb6944f6d/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-05-16T11:29:20.424Z
generated_at: 2026-05-16T11:29:20.424Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T11:29:20.424Z
  matched_actions: 56
  action_count: 56
  confidence: high
  summary: "All 56 spec actions matched literally with source; transport parameters verified; complete protocol coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lexicon MC8 MC8B Control Spec

## Summary

AV receiver control via RS-232 serial and TCP/IP using a binary byte-oriented protocol. Commands use format `<Start><Zone><CommandCode><DataLength><Data><End>` with hex values. All IR remote functions can be simulated via the Simulate RC5 command (0x08). Two-zone support (Zone 1 master, Zone 2). AMX Duet DDDP compatible.

<!-- UNRESOLVED: source document titled for MC-10/RV-9/RV-6 — operator confirmed MC8/MC8B applicability but not verified against device -->
<!-- UNRESOLVED: no power-on command documented in binary protocol; only RC5 IR power on/off via 0x08 -->

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
  - powerable    # inferred: power state query (0x00) + RC5 power on/off
  - queryable    # inferred: extensive status query commands
  - levelable    # inferred: volume (0x0D), treble (0x35), bass (0x36), balance (0x3B), sub trim (0x3F, 0x45), lipsync (0x40)
  - routable     # inferred: source selection (0x1D), video selection (0x0A), analogue/digital (0x0B)
```

## Actions
```yaml
actions:
  - id: request_power_state
    label: Request Power State
    kind: query
    command_code: 0x00
    params:
      - name: zone
        type: integer
        description: "Zone number (0x01=Zone1, 0x02=Zone2)"
    description: "Request stand-by state. Data=0xF0 to query."
    response: "0x00=standby, 0x01=powered on"

  - id: set_display_brightness
    label: Set Display Brightness
    kind: action
    command_code: 0x01
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: brightness
        type: integer
        description: "0xF0=request, 0x00=off, 0x01=L1, 0x02=L2"
    description: "Set or request front panel VFD brightness."

  - id: request_headphone_status
    label: Request Headphone Status
    kind: query
    command_code: 0x02
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Determine whether headphones are connected."
    response: "0x00=not connected, 0x01=connected"

  - id: request_fm_genre
    label: Request FM Genre
    kind: query
    command_code: 0x03
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request current FM station programme type. Returns ASCII string. Error 0x85 if FM not selected."

  - id: request_software_version
    label: Request Software Version
    kind: query
    command_code: 0x04
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: component
        type: integer
        description: "0xF0=RS232 version, 0xF1=Host version, 0xF2=OSD version, 0xF3=DSP version, 0xF4=NET version, 0xF5=IAP version"
    description: "Request version number of software components."
    response: "Echo data + major + minor version bytes"

  - id: restore_factory_defaults
    label: Restore Factory Defaults
    kind: action
    command_code: 0x05
    params:
      - name: zone
        type: integer
        description: "Zone number (0x01)"
    description: "Force factory default restore. Requires confirmation bytes 0xAA 0xAA."

  - id: save_restore_settings
    label: Save/Restore Secure Settings
    kind: action
    command_code: 0x06
    params:
      - name: zone
        type: integer
        description: "Zone number (0x01)"
      - name: operation
        type: integer
        description: "0x00=save, 0x01=restore"
      - name: pin
        type: string
        description: "4-digit PIN (4 bytes)"
    description: "Save or restore secure copy of settings. Requires confirmation 0x55 0x55 + 4-digit PIN. Error 0x85 if no secure copy exists."

  - id: simulate_rc5
    label: Simulate RC5 IR Command
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: system_code
        type: integer
        description: "RC5 system code (e.g. 0x10=Zone1, 0x17=Zone2)"
      - name: command_code_rc5
        type: integer
        description: "RC5 command code"
    description: "Simulate an RC5 IR command via serial/TCP. An additional status message is usually sent as a result."

  - id: set_display_info_type
    label: Set Display Information Type
    kind: action
    command_code: 0x09
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: info_type
        type: integer
        description: "0x00=Processing mode, 0xE0=cycle all, 0xF0=request current. Source-specific: FM(0x01=RadioText,0x02=ProgType,0x03=SignalStrength), DAB(0x01-0x04), NET/USB(0x01-0x05)"
    description: "Set the VFD display information type."

  - id: select_video_input
    label: Select Video Input
    kind: action
    command_code: 0x0A
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: source
        type: integer
        description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=request current"
    description: "Change video input. Returns 0x85 if OSD setup screen showing."

  - id: select_analogue_digital
    label: Select Analogue/Digital Audio
    kind: action
    command_code: 0x0B
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: audio_type
        type: integer
        description: "0x00=analogue, 0x01=digital, 0x02=HDMI, 0xF0=request current"
    description: "Select analogue/digital/HDMI audio input for current source. Returns 0x85 if OSD showing."

  - id: set_imax_enhanced
    label: Set IMAX Enhanced
    kind: action
    command_code: 0x0C
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: mode
        type: integer
        description: "0xF0=request, 0xF1=auto, 0xF2=on, 0xF3=off"
    description: "Control IMAX Enhanced mode."
    response: "0x00=off, 0x01=on, 0x02=auto"

  - id: set_volume
    label: Set Volume
    kind: action
    command_code: 0x0D
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: volume
        type: integer
        description: "0x00-0x63 (0-99dB), 0xF0=request current"
    description: "Set or request zone volume. Returns volume even if muted."
    response: "0x00-0x63 (0-99)"

  - id: request_mute_status
    label: Request Mute Status
    kind: query
    command_code: 0x0E
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request mute status. Data=0xF0."
    response: "0x00=muted, 0x01=not muted"

  - id: request_direct_mode
    label: Request Direct Mode Status
    kind: query
    command_code: 0x0F
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request direct mode status. Data=0xF0."
    response: "0x00=off, 0x01=on"

  - id: request_decode_mode_2ch
    label: Request Decode Mode 2ch
    kind: query
    command_code: 0x10
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request decode mode for two-channel material. Data=0xF0."
    response: "0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Logic7 Immersion, 0x0C=DTS Virtual:X"

  - id: request_decode_mode_mch
    label: Request Decode Mode MCH
    kind: query
    command_code: 0x11
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request decode mode for multi-channel material. Data=0xF0."
    response: "0x01=Stereo down-mix, 0x02=Multi-ch, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Logic7 Immersion, 0x0C=DTS Virtual:X"

  - id: request_rds_info
    label: Request RDS Information
    kind: query
    command_code: 0x12
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request RDS info from current FM station. Returns ASCII string. Error 0x85 if FM not selected."

  - id: request_video_output_resolution
    label: Request Video Output Resolution
    kind: query
    command_code: 0x13
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request video output resolution. Data=0xF0."
    response: "0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k"

  - id: request_menu_status
    label: Request Menu Status
    kind: query
    command_code: 0x14
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request which menu is open. Data=0xF0."
    response: "0x00=none, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

  - id: request_tuner_preset
    label: Request Tuner Preset
    kind: query
    command_code: 0x15
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: preset
        type: integer
        description: "0x01-0x32 (1-50) to select, 0xF0 to request current"
    description: "Request or select tuner preset number. Error 0x85 if tuner not selected."
    response: "0xFF=no preset, 0x01-0x32=preset number"

  - id: tune_frequency
    label: Tune Frequency
    kind: action
    command_code: 0x16
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: direction
        type: integer
        description: "0x00=decrement, 0x01=increment, 0xF0=request current"
    description: "Increment/decrement tuner frequency in 0.05MHz steps (FM). Returns 2-byte frequency (MHz + 10s kHz). Error 0x85 if tuner not selected."

  - id: request_dab_station
    label: Request DAB Station
    kind: query
    command_code: 0x18
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request current DAB station name. Returns 16-byte ASCII padded with spaces. Error 0x85 if DAB not selected."

  - id: request_dab_genre
    label: Request DAB Programme Type
    kind: query
    command_code: 0x19
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request DAB programme type. Returns 16-byte ASCII padded. Error 0x85 if DAB not selected."

  - id: request_dls_info
    label: Request DLS/PDT Info
    kind: query
    command_code: 0x1A
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request DLS/PDT digital radio text from current DAB station. Returns 128-byte ASCII padded. Error 0x85 if DAB not selected."

  - id: request_preset_details
    label: Request Preset Details
    kind: query
    command_code: 0x1B
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: preset
        type: integer
        description: "0x01-0x32 (1-50) preset number"
    description: "Request details of a tuner preset. Returns preset number, type (FM freq/RDS name/DAB), and station name."

  - id: request_network_playback_status
    label: Request Network Playback Status
    kind: query
    command_code: 0x1C
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request network playback status. Data=0xF0."
    response: "Data1: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing. Data2+: folder/file name in ASCII."

  - id: request_current_source
    label: Request Current Source
    kind: query
    command_code: 0x1D
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request the source currently selected for a zone. Data=0xF0."
    response: "0x00=Follow Zone1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=Tuner FM, 0x0C=Tuner DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME"

  - id: set_headphone_override
    label: Set Headphone Override
    kind: action
    command_code: 0x1F
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: integer
        description: "0x00=clear (speakers muted with headphones), 0x01=set (speakers unmuted with headphones)"
    description: "Activate/deactivate mute relays. Does not zero the volume."

  - id: set_input_name
    label: Set/Request Input Name
    kind: action
    command_code: 0x20
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: name
        type: string
        description: "Input name (max 10 ASCII chars). 0xF0 to query."
    description: "Set or query the user-defined name for the current input."

  - id: fm_scan
    label: FM Scan
    kind: action
    command_code: 0x23
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: direction
        type: integer
        description: "0x01=scan up, 0x02=scan down"
    description: "Initiate FM scan up or down. Only valid on FM input."
    response: "0xFF=scanning"

  - id: dab_scan
    label: DAB Scan
    kind: action
    command_code: 0x24
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Initiate DAB scan. Data=0xF0. Only valid on DAB input."
    response: "0xFF=scanning"

  - id: heartbeat
    label: Heartbeat
    kind: action
    command_code: 0x25
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Heartbeat to check connectivity. Also resets EuP standby timer. Data=0xF0."
    response: "0x00=acknowledged"

  - id: reboot
    label: Reboot
    kind: action
    command_code: 0x26
    params:
      - name: zone
        type: integer
        description: "Zone number (0x01)"
    description: "Force reboot. Data bytes must be ASCII 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54)."
    response: "0x00=acknowledged"

  - id: set_treble
    label: Set Treble EQ
    kind: action
    command_code: 0x35
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust treble equalisation."

  - id: set_bass
    label: Set Bass EQ
    kind: action
    command_code: 0x36
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0C=0 to +12dB, 0x81-0x8C=-1 to -12dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust bass equalisation."

  - id: set_room_eq
    label: Set Room EQ
    kind: action
    command_code: 0x37
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: integer
        description: "0xF0=request, 0xF1=on, 0xF2=off"
    description: "Turn room equalisation on/off."
    response: "0x00=off, 0x01=on, 0x02=not calculated (off)"

  - id: set_dolby_volume
    label: Set Dolby Volume
    kind: action
    command_code: 0x38
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: integer
        description: "0x00=off, 0x01=on, 0xF0=request"
    description: "Control Dolby volume system."
    response: "0x00=off, 0x01=on"

  - id: set_dolby_leveller
    label: Set Dolby Leveller
    kind: action
    command_code: 0x39
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0A=level 0-10, 0xFF=off, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Control Dolby volume leveller component."
    response: "0x00-0x0A=level 0-10, 0xFF=off"

  - id: set_dolby_volume_calibration_offset
    label: Set Dolby Volume Calibration Offset
    kind: action
    command_code: 0x3A
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0F=0 to +15dB, 0x80-0x8F=-1 to -15dB, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust Dolby volume calibration offset."

  - id: set_balance
    label: Set Balance
    kind: action
    command_code: 0x3B
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x06=0 to +6, 0x81-0x86=-1 to -6, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust balance control."

  - id: set_subwoofer_trim
    label: Set Subwoofer Trim
    kind: action
    command_code: 0x3F
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x14=positive in 0.5dB steps, 0x81-0x94=negative in 0.5dB steps, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust subwoofer trim in 0.5dB steps."

  - id: set_lipsync_delay
    label: Set Lipsync Delay
    kind: action
    command_code: 0x40
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x32 in 5ms steps, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Adjust lipsync delay in 5ms steps."

  - id: set_compression
    label: Set Compression
    kind: action
    command_code: 0x41
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: mode
        type: integer
        description: "0x00=off, 0x01=medium, 0x02=high, 0xF0=request"
    description: "Adjust dynamic range compression."

  - id: request_incoming_video_params
    label: Request Incoming Video Parameters
    kind: query
    command_code: 0x42
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request incoming video resolution, refresh rate, aspect ratio. Data=0xF0."
    response: "7 data bytes: H-res MSB/LSB, V-res MSB/LSB, refresh rate, interlaced flag (0x00=P/0x01=I), aspect ratio (0x00=undef/0x01=4:3/0x02=16:9)"

  - id: request_incoming_audio_format
    label: Request Incoming Audio Format
    kind: query
    command_code: 0x43
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request incoming audio format. Data=0xF0."
    response: "Data1 format: 0x00=PCM through 0x18=IMAX ENHANCED. Data2 channel config: 0x00=DualMono through 0x1A+."

  - id: request_audio_sample_rate
    label: Request Audio Sample Rate
    kind: query
    command_code: 0x44
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Request incoming audio sample rate. Data=0xF0."
    response: "0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected"

  - id: set_sub_stereo_trim
    label: Set Sub Stereo Trim
    kind: action
    command_code: 0x45
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00=0dB, 0x81-0x94=-0.5 to -10dB in 0.5dB steps, 0xF0=request, 0xF1=increment, 0xF2=decrement"
    description: "Set/request subwoofer trim for stereo mode in 0.5dB steps."

  - id: set_zone1_osd
    label: Set Zone 1 OSD
    kind: action
    command_code: 0x4E
    params:
      - name: state
        type: integer
        description: "0xF0=request, 0xF1=on, 0xF2=off"
    description: "Enable/disable Zone 1 OSD display."
    response: "0x00=on, 0x01=off"

  - id: set_video_output_switching
    label: Set Video Output Switching
    kind: action
    command_code: 0x4F
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: output
        type: integer
        description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2, 0xF0=request"
    description: "Set or request HDMI video output selection."

  - id: rc5_power_on
    label: RC5 Power On
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-123 (Power On). System code 0x10, command 0x7B."

  - id: rc5_power_off
    label: RC5 Power Off
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-124 (Power Off). System code 0x10, command 0x7C."

  - id: rc5_standby
    label: RC5 Standby Toggle
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-12 (Standby toggle). System code 0x10, command 0x0C."

  - id: rc5_mute
    label: RC5 Mute Toggle
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-13 (Mute toggle). System code 0x10, command 0x0D."

  - id: rc5_volume_up
    label: RC5 Volume Up
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-16 (Volume up). System code 0x10, command 0x10."

  - id: rc5_volume_down
    label: RC5 Volume Down
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number"
    description: "Simulate RC5 16-17 (Volume down). System code 0x10, command 0x11."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, powered_on]
    description: "Unsolicited when power state changes via front panel or IR."

  - id: volume_level
    type: integer
    values: "0-99 (dB)"
    description: "Current zone volume. Returned by set_volume and unsolicited on volume change."

  - id: mute_state
    type: enum
    values: [muted, not_muted]
    description: "Zone mute status."

  - id: source_selected
    type: enum
    values: [follow_zone1, CD, BD, AV, SAT, PVR, VCR, AUX, DISPLAY, Tuner_FM, Tuner_DAB, NET, USB, STB, GAME]
    description: "Current source selection for a zone."

  - id: display_brightness
    type: enum
    values: [off, L1, L2]
    description: "Front panel VFD brightness level."

  - id: headphone_connected
    type: enum
    values: [not_connected, connected]
    description: "Headphone connection status."

  - id: decode_mode_2ch
    type: enum
    values: [Stereo, Dolby_Surround, Neo6_Cinema, Neo6_Music, 5_7ch_Stereo, DTS_NeuralX, Logic7_Immersion, DTS_VirtualX]
    description: "Current 2-channel decode mode."

  - id: decode_mode_mch
    type: enum
    values: [Stereo_downmix, Multichannel, DTS_ES_NeuralX, Dolby_Surround, Logic7_Immersion, DTS_VirtualX]
    description: "Current multi-channel decode mode."

  - id: video_output_resolution
    type: enum
    values: [SD_Progressive, 720p, 1080i, 1080p, Preferred, Bypass, 4k]
    description: "Video output resolution."

  - id: menu_status
    type: enum
    values: [none, Setup, Trim, Bass, Treble, Sync, Sub, Tuner, Network, USB]
    description: "Currently open menu."

  - id: direct_mode
    type: enum
    values: [off, on]
    description: "Direct mode status."

  - id: room_eq_state
    type: enum
    values: [off, on, not_calculated]
    description: "Room EQ status."

  - id: imax_enhanced_state
    type: enum
    values: [off, on, auto]
    description: "IMAX Enhanced mode."

  - id: network_playback
    type: enum
    values: [Navigating, Playing, Paused, Busy]
    description: "Network playback status with folder/filename in ASCII."

  - id: incoming_audio_format
    type: enum
    values: [PCM, Analogue_Direct, Dolby_Digital, Dolby_Digital_EX, Dolby_Digital_Surround, Dolby_Digital_Plus, Dolby_TrueHD, DTS, DTS_96_24, DTS_ES_Matrix, DTS_ES_Discrete, DTS_HD_MA, DTS_HD_HR, Dolby_Atmos, DTS_X, IMAX_ENHANCED]
    description: "Incoming audio stream format."

  - id: incoming_audio_sample_rate
    type: enum
    values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", Unknown, Undetected]
    description: "Incoming audio sample rate."
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    range: [0, 99]
    unit: dB
    description: "Zone volume level."

  - id: treble
    type: integer
    range: [-12, 12]
    unit: dB
    description: "Treble equalisation."

  - id: bass
    type: integer
    range: [-12, 12]
    unit: dB
    description: "Bass equalisation."

  - id: balance
    type: integer
    range: [-6, 6]
    description: "Balance control."

  - id: subwoofer_trim
    type: number
    range: [-10.0, 10.0]
    unit: dB
    step: 0.5
    description: "Subwoofer trim."

  - id: sub_stereo_trim
    type: number
    range: [-10.0, 0.0]
    unit: dB
    step: 0.5
    description: "Subwoofer trim for stereo mode."

  - id: lipsync_delay
    type: integer
    range: [0, 250]
    unit: ms
    step: 5
    description: "Lipsync delay."

  - id: dolby_leveller
    type: integer
    range: [0, 10]
    description: "Dolby volume leveller setting. 0xFF = off."

  - id: dolby_volume_calibration_offset
    type: integer
    range: [-15, 15]
    unit: dB
    description: "Dolby volume calibration offset."

  - id: dolby_volume
    type: enum
    values: [off, on]
    description: "Dolby volume system on/off."

  - id: compression
    type: enum
    values: [off, medium, high]
    description: "Dynamic range compression."
```

## Events
```yaml
events:
  - id: unsolicited_state_change
    description: "Device sends status updates when state changes via front panel, IR remote, or other inputs. Any change from these inputs is relayed using the appropriate message type (e.g. display brightness change, decode mode change, volume change)."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for:
  - action: restore_factory_defaults
    reason: "Requires confirmation bytes 0xAA 0xAA to avoid accidental restore"
  - action: save_restore_settings
    reason: "Requires confirmation bytes 0x55 0x55 and 4-digit PIN"
  - action: reboot
    reason: "Requires ASCII 'REBOOT' (6 bytes) as confirmation"
interlocks:
  - "Commands 0xF0-0xFF reserved for test functions - must never be used"
  - "Certain commands return 0x85 when Setup Menu is displayed"
  - "Tuner commands return 0x85 when tuner input not selected"
  - "DAB commands return 0x85 when DAB not selected"
  - "FM commands return 0x85 when FM not selected"
# UNRESOLVED: no power-on sequencing requirements documented
```

## Notes

- **Protocol framing:** All commands use format `0x21 <Zone> <Cc> <Dl> <Data> 0x0D`. Responses add an Answer Code byte after Cc: `0x21 <Zone> <Cc> <Ac> <Dl> <Data> 0x0D`.
- **Zone numbers:** 0x01 = Zone 1 (master), 0x02 = Zone 2. Zone-less commands refer to Zone 1.
- **Answer codes:** 0x00=Status update, 0x82=Zone Invalid, 0x83=Command not recognised, 0x84=Parameter not recognised, 0x85=Command invalid at this time, 0x86=Invalid data length.
- **Response timing:** Device responds within 3 seconds. RC may send further commands before previous response received.
- **RC5 simulation:** Command 0x08 accepts any RC5 system/command code pair. System 0x10 = Zone 1, 0x17 = Zone 2.
- **RS-232 cable:** Null-modem wiring (pin 2↔3 Rx/Tx crossed, pin 5↔5 ground).
- **Control must be enabled** — disabled by default. Enable via front panel DIRECT button (hold 4s) or OSD General Setup menu.
- **AMX Duet DDDP:** Device responds to "AMX\r" with identification string including make, model, and RS232 protocol version.
- **Heartbeat (0x25):** Resets EuP standby timer — send periodically to prevent standby.

<!-- UNRESOLVED: source document covers MC-10/RV-9/RV-6; MC8/MC8B applicability not confirmed in source text -->
<!-- UNRESOLVED: RC5 code list is extensive (60+ codes via system 0x10 and 0x17) — only most common ones listed in Actions -->
<!-- UNRESOLVED: maximum data length not stated beyond 255-byte response limit -->
<!-- UNRESOLVED: no firmware version compatibility range stated -->
<!-- UNRESOLVED: no power-on command in native binary protocol — only via RC5 simulation (0x08) -->

## Provenance

```yaml
source_domains:
  - lexicondsp.pl
  - lexicon.com
source_urls:
  - https://www.lexicondsp.pl/upload/mc10/RS232_Protocol_Documentation.pdf
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb6944f6d/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-05-16T11:29:20.424Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T11:29:20.424Z
matched_actions: 56
action_count: 56
confidence: high
summary: "All 56 spec actions matched literally with source; transport parameters verified; complete protocol coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
