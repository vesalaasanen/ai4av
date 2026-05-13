---
spec_id: admin/arcam-sa20-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam SA20 Series Control Spec"
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
last_checked_at: 2026-04-23T15:12:30.924Z
generated_at: 2026-04-23T15:12:30.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:12:30.924Z
  matched_actions: 79
  action_count: 79
  confidence: high
  summary: "All 79 spec action IDs matched with literal opcode counterparts in source; transport parameters (38400 baud, port 50000) verified; shapes agree on value ranges, enum codes, and parameter counts."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Arcam SA20 Series Control Spec

## Summary
Binary RS-232 and TCP/IP control protocol for Arcam AV receivers (AVR390, AVR550, AVR850, AV860, SR250). Commands use a fixed byte-frame format with start/end delimiters and zone addressing. The device supports power, volume, input routing, decode mode control, tuner operations, equalisation, and Dolby/IMAX processing. IP control is available on port 50000.

<!-- UNRESOLVED: Source document title lists AVR390/AVR550/AVR850/AV860/SR250 but not SA20 Series explicitly. SA20 may share this protocol but is not confirmed in the source text. -->

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
  - powerable     # inferred from power query (0x00) and RC5 power on/off commands
  - queryable     # inferred from extensive query commands (0xF0 data byte)
  - routable      # inferred from source selection (0x1D), video selection (0x0A)
  - levelable     # inferred from volume (0x0D), treble (0x35), bass (0x36), balance (0x3B)
```

## Actions
```yaml
actions:
  - id: simulate_rc5
    label: Simulate RC5 IR Command
    kind: action
    command_code: 0x08
    params:
      - name: zone
        type: integer
        description: "Zone number (0x01=Zone1, 0x02=Zone2)"
      - name: rc5_system
        type: integer
        description: "RC5 system code (e.g. 0x10 for Zone 1, 0x17 for Zone 2)"
      - name: rc5_command
        type: integer
        description: "RC5 command code (see RC5 code table in Notes)"
    notes: "Any IR-remote operation can be invoked via this command"

  - id: restore_factory_defaults
    label: Restore Factory Defaults
    kind: action
    command_code: 0x05
    params:
      - name: zone
        type: integer
        description: "Zone number"
    notes: "Sends confirmation pattern 0xAA 0xAA. Zone fixed to 0x01."

  - id: save_restore_settings
    label: Save/Restore Secure Settings Backup
    kind: action
    command_code: 0x06
    params:
      - name: operation
        type: enum
        values: [save, restore]
        description: "0x00=Save, 0x01=Restore"
      - name: pin
        type: string
        description: "4-digit PIN (4 bytes)"
    notes: "Requires confirmation bytes 0x55 0x55 plus 4-digit PIN. Returns 0x85 if no backup exists."

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
        description: "0x00=Processing mode, 0xE0=Cycle all, 0x01-0x05 source-dependent"
    notes: "Source-specific values differ for FM, DAB, NET/USB"

  - id: select_video_input
    label: Select Video Input
    kind: action
    command_code: 0x0A
    params:
      - name: source
        type: enum
        values: [BD, SAT, AV, PVR, VCR, Game, STB]
        description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB"
    notes: "Zone 1 only. Returns 0x85 if OSD setup screen is showing."

  - id: select_audio_type
    label: Select Analogue/Digital Audio
    kind: action
    command_code: 0x0B
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: audio_type
        type: enum
        values: [analogue, digital, hdmi]
        description: "0x00=Analogue, 0x01=Digital, 0x02=HDMI"
    notes: "Returns 0x85 if OSD setup screen is showing."

  - id: set_imax_enhanced
    label: Set IMAX Enhanced Mode
    kind: action
    command_code: 0x0C
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: mode
        type: enum
        values: [auto, on, off]
        description: "0xF1=Auto, 0xF2=On, 0xF3=Off"

  - id: set_volume
    label: Set Volume
    kind: action
    command_code: 0x0D
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: level
        type: integer
        description: "Volume level 0-99 (0x00-0x63)"

  - id: set_headphone_override
    label: Set Headphone Override
    kind: action
    command_code: 0x1F
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: enum
        values: [clear, set]
        description: "0x00=Clear (speakers muted with headphones), 0x01=Set (speakers unmuted with headphones)"

  - id: set_tuner_preset
    label: Set Tuner Preset
    kind: action
    command_code: 0x15
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: preset
        type: integer
        description: "Preset number 1-50 (0x01-0x32)"

  - id: tune_step
    label: Tune Frequency Step
    kind: action
    command_code: 0x16
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: direction
        type: enum
        values: [decrement, increment]
        description: "0x00=Decrement, 0x01=Increment (0.05MHz FM steps)"

  - id: set_input_name
    label: Set Input Name
    kind: action
    command_code: 0x20
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: name
        type: string
        description: "Input name, max 10 ASCII characters"

  - id: fm_scan
    label: FM Scan
    kind: action
    command_code: 0x23
    params:
      - name: direction
        type: enum
        values: [up, down]
        description: "0x01=Scan up, 0x02=Scan down"
    notes: "Only valid when FM input is selected."

  - id: dab_scan
    label: DAB Scan
    kind: action
    command_code: 0x24
    params: []
    notes: "Sends 0xF0 to start DAB scan. Only valid when DAB input is selected."

  - id: heartbeat
    label: Heartbeat
    kind: action
    command_code: 0x25
    params: []
    notes: "Checks unit connectivity and resets EuP standby timer."

  - id: reboot
    label: Reboot Unit
    kind: action
    command_code: 0x26
    params: []
    notes: "Sends confirmation ASCII 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54)."

  - id: set_treble
    label: Set Treble Equalisation
    kind: action
    command_code: 0x35
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB"
    notes: "0xF1=Increment by 1dB, 0xF2=Decrement by 1dB"

  - id: set_bass
    label: Set Bass Equalisation
    kind: action
    command_code: 0x36
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB"
    notes: "0xF1=Increment by 1dB, 0xF2=Decrement by 1dB"

  - id: set_room_eq
    label: Set Room Equalisation
    kind: action
    command_code: 0x37
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: enum
        values: [on, off]
        description: "0xF1=On, 0xF2=Off"

  - id: set_dolby_volume
    label: Set Dolby Volume
    kind: action
    command_code: 0x38
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: state
        type: enum
        values: [off, on]
        description: "0x00=Off, 0x01=On"

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
        description: "0x00-0x0A for level 0-10, 0xFF=Off"
    notes: "0xF1=Increment, 0xF2=Decrement"

  - id: set_dolby_vol_cal_offset
    label: Set Dolby Volume Calibration Offset
    kind: action
    command_code: 0x3A
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: value
        type: integer
        description: "0x00-0x0F for 0 to +15dB, 0x80-0x8F for -1 to -15dB"
    notes: "0xF1=Increment by 1dB, 0xF2=Decrement by 1dB"

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
        description: "0x00-0x06 for 0 to +6, 0x81-0x86 for -1 to -6"
    notes: "0xF1=Increment, 0xF2=Decrement"

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
        description: "0x00-0x14 for +0 to +10dB (0.5dB steps), 0x81-0x94 for -0.5 to -10dB"
    notes: "0xF1=Increment by 0.5dB, 0xF2=Decrement by 0.5dB"

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
        description: "0x00-0x32, delay in 5ms steps (e.g. 0x08=40ms)"
    notes: "0xF1=Increment by 5ms, 0xF2=Decrement by 5ms"

  - id: set_compression
    label: Set Dynamic Range Compression
    kind: action
    command_code: 0x41
    params:
      - name: zone
        type: integer
        description: "Zone number"
      - name: mode
        type: enum
        values: [off, medium, high]
        description: "0x00=Off, 0x01=Medium, 0x02=High"

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
        description: "0x00=0dB, 0x81-0x94 for -0.5 to -10dB (0.5dB steps)"
    notes: "0xF1=Increment by 0.5dB, 0xF2=Decrement by 0.5dB"

  - id: set_zone1_osd
    label: Set Zone 1 OSD On/Off
    kind: action
    command_code: 0x4E
    params:
      - name: state
        type: enum
        values: [on, off]
        description: "0xF1=On, 0xF2=Off"
    notes: "Zone 1 only."

  - id: set_video_output_switching
    label: Set HDMI Video Output
    kind: action
    command_code: 0x4F
    params:
      - name: output
        type: enum
        values: [hdmi1, hdmi2, hdmi1_and_2]
        description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2"
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
    description: "0x00=Standby, 0x01=Powered on"
    params:
      - name: zone
        type: integer
        description: "Zone number"

  - id: display_brightness
    label: Display Brightness
    command_code: 0x01
    type: enum
    values: [off, L1, L2]
    description: "0x00=Off, 0x01=L1, 0x02=L2"
    params:
      - name: zone
        type: integer

  - id: headphone_status
    label: Headphone Connection Status
    command_code: 0x02
    type: enum
    values: [not_connected, connected]
    description: "0x00=Not connected, 0x01=Connected"

  - id: fm_genre
    label: FM Programme Type
    command_code: 0x03
    type: string
    description: "ASCII programme type text"
    params:
      - name: zone
        type: integer

  - id: software_version
    label: Software Version
    command_code: 0x04
    type: string
    description: "Major.Minor version"
    params:
      - name: component
        type: enum
        values: [rs232, host, osd, dsp, net, iap]
        description: "0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"

  - id: display_info_type
    label: Display Information Type
    command_code: 0x09
    type: integer
    description: "Current display type (source-dependent values)"
    params:
      - name: zone
        type: integer

  - id: video_source
    label: Video Source
    command_code: 0x0A
    type: enum
    values: [BD, SAT, AV, PVR, VCR, Game, STB]
    description: "Current video input selection"

  - id: audio_type
    label: Audio Input Type
    command_code: 0x0B
    type: enum
    values: [analogue, digital, hdmi]
    description: "0x00=Analogue, 0x01=Digital, 0x02=HDMI"
    params:
      - name: zone
        type: integer

  - id: imax_enhanced_state
    label: IMAX Enhanced State
    command_code: 0x0C
    type: enum
    values: [off, on, auto]
    description: "0x00=Off, 0x01=On, 0x02=Auto"
    params:
      - name: zone
        type: integer

  - id: volume_level
    label: Volume Level
    command_code: 0x0D
    type: integer
    description: "Volume 0-99"
    params:
      - name: zone
        type: integer

  - id: mute_status
    label: Mute Status
    command_code: 0x0E
    type: enum
    values: [muted, not_muted]
    description: "0x00=Muted, 0x01=Not muted"
    params:
      - name: zone
        type: integer

  - id: direct_mode
    label: Direct Mode Status
    command_code: 0x0F
    type: enum
    values: [off, on]
    description: "0x00=Off, 0x01=On"

  - id: decode_mode_2ch
    label: Decode Mode 2-Channel
    command_code: 0x10
    type: enum
    values: [stereo, dolby_surround, neo6_cinema, neo6_music, ch57_stereo, dts_neural_x, dts_virtual_x]
    description: "0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0C=DTS Virtual:X"

  - id: decode_mode_mch
    label: Decode Mode Multi-Channel
    command_code: 0x11
    type: enum
    values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, dts_virtual_x]
    description: "0x01=Stereo down-mix, 0x02=Multi-ch, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X"

  - id: rds_information
    label: RDS Information
    command_code: 0x12
    type: string
    description: "RDS radio text in ASCII"
    params:
      - name: zone
        type: integer

  - id: video_output_resolution
    label: Video Output Resolution
    command_code: 0x13
    type: enum
    values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
    description: "0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k"

  - id: menu_status
    label: Menu Status
    command_code: 0x14
    type: enum
    values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
    description: "0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

  - id: tuner_preset
    label: Tuner Preset Number
    command_code: 0x15
    type: integer
    description: "1-50 or 0xFF for no preset"
    params:
      - name: zone
        type: integer

  - id: tuner_frequency
    label: Tuner Frequency
    command_code: 0x16
    type: string
    description: "FM: MHz and 10s kHz as two bytes"
    params:
      - name: zone
        type: integer

  - id: dab_station
    label: DAB Station Name
    command_code: 0x18
    type: string
    description: "16-byte ASCII station label, space-padded"
    params:
      - name: zone
        type: integer

  - id: dab_programme_type
    label: DAB Programme Type
    command_code: 0x19
    type: string
    description: "16-byte ASCII programme type, space-padded"
    params:
      - name: zone
        type: integer

  - id: dls_pdt_info
    label: DLS/PDT Info
    command_code: 0x1A
    type: string
    description: "128-byte ASCII digital radio text, space-padded"
    params:
      - name: zone
        type: integer

  - id: preset_details
    label: Tuner Preset Details
    command_code: 0x1B
    type: string
    description: "Preset number, type (FM freq/RDS/DAB), and name"
    params:
      - name: zone
        type: integer
      - name: preset
        type: integer
        description: "Preset number 1-50"

  - id: network_playback_status
    label: Network Playback Status
    command_code: 0x1C
    type: enum
    values: [navigating, playing, paused, busy]
    description: "0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy. Includes folder/filename in ASCII."
    params:
      - name: zone
        type: integer

  - id: current_source
    label: Current Source
    command_code: 0x1D
    type: enum
    values: [follow_z1, CD, BD, AV, SAT, PVR, VCR, AUX, DISPLAY, tuner_fm, tuner_dab, NET, USB, STB, GAME]
    description: "0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=FM, 0x0C=DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME"
    params:
      - name: zone
        type: integer

  - id: input_name
    label: Input Name
    command_code: 0x20
    type: string
    description: "User-assigned input name (up to 10 ASCII characters)"
    params:
      - name: zone
        type: integer

  - id: treble_level
    label: Treble Level
    command_code: 0x35
    type: integer
    description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB"
    params:
      - name: zone
        type: integer

  - id: bass_level
    label: Bass Level
    command_code: 0x36
    type: integer
    description: "0x00-0x0C for 0 to +12dB, 0x81-0x8C for -1 to -12dB"
    params:
      - name: zone
        type: integer

  - id: room_eq_state
    label: Room EQ State
    command_code: 0x37
    type: enum
    values: [off, on, not_calculated]
    description: "0x00=Off, 0x01=On, 0x02=Not calculated (off)"
    params:
      - name: zone
        type: integer

  - id: dolby_volume_state
    label: Dolby Volume State
    command_code: 0x38
    type: enum
    values: [off, on]
    description: "0x00=Off, 0x01=On"
    params:
      - name: zone
        type: integer

  - id: dolby_leveller_setting
    label: Dolby Leveller Setting
    command_code: 0x39
    type: integer
    description: "0x00-0x0A for 0-10, 0xFF=Off"
    params:
      - name: zone
        type: integer

  - id: dolby_vol_cal_offset
    label: Dolby Volume Calibration Offset
    command_code: 0x3A
    type: integer
    description: "0x00-0x0F for 0 to +15dB, 0x80-0x8F for -1 to -15dB"
    params:
      - name: zone
        type: integer

  - id: balance_value
    label: Balance Value
    command_code: 0x3B
    type: integer
    description: "0x00-0x06 for 0 to +6, 0x81-0x86 for -1 to -6"
    params:
      - name: zone
        type: integer

  - id: subwoofer_trim_value
    label: Subwoofer Trim Value
    command_code: 0x3F
    type: integer
    description: "0x00-0x14 for +0 to +10dB (0.5dB steps), 0x81-0x94 for -0.5 to -10dB"
    params:
      - name: zone
        type: integer

  - id: lipsync_delay_value
    label: Lipsync Delay Value
    command_code: 0x40
    type: integer
    description: "0x00-0x32, delay in 5ms steps"
    params:
      - name: zone
        type: integer

  - id: compression_setting
    label: Compression Setting
    command_code: 0x41
    type: enum
    values: [off, medium, high]
    description: "0x00=Off, 0x01=Medium, 0x02=High"
    params:
      - name: zone
        type: integer

  - id: incoming_video_params
    label: Incoming Video Parameters
    command_code: 0x42
    type: object
    description: "Horizontal res (2 bytes), vertical res (2 bytes), refresh rate, interlaced flag, aspect ratio"
    params:
      - name: zone
        type: integer

  - id: incoming_audio_format
    label: Incoming Audio Format
    command_code: 0x43
    type: object
    description: "Audio stream format (PCM, Dolby Digital, DTS, Atmos, DTS:X, etc.) and channel configuration"
    params:
      - name: zone
        type: integer

  - id: incoming_audio_sample_rate
    label: Incoming Audio Sample Rate
    command_code: 0x44
    type: enum
    values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", unknown, undetected]
    description: "0x00=32k, 0x01=44.1k, 0x02=48k, 0x03=88.2k, 0x04=96k, 0x05=176.4k, 0x06=192k, 0x07=Unknown, 0x08=Undetected"
    params:
      - name: zone
        type: integer

  - id: sub_stereo_trim_value
    label: Sub Stereo Trim Value
    command_code: 0x45
    type: integer
    description: "0x00=0dB, 0x81-0x94 for -0.5 to -10dB (0.5dB steps)"
    params:
      - name: zone
        type: integer

  - id: zone1_osd_state
    label: Zone 1 OSD State
    command_code: 0x4E
    type: enum
    values: [on, off]
    description: "0x00=On, 0x01=Off"

  - id: video_output_switching
    label: HDMI Video Output Selection
    command_code: 0x4F
    type: enum
    values: [hdmi1, hdmi2, hdmi1_and_2]
    description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2"
```

## Variables
```yaml
variables: []
# UNRESOLVED: All settable parameters are represented as Actions with explicit values.
# The binary protocol does not expose continuous variables separate from commands.
```

## Events
```yaml
events:
  - id: unsolicited_state_change
    description: "Device sends status updates when state changes via front panel or IR remote"
    notes: "Any state change from front panel or IR is relayed to the RS232/TCP controller using the appropriate message type"
```

## Macros
```yaml
macros: []
# UNRESOLVED: No multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - action_id: restore_factory_defaults
    description: "Requires confirmation pattern 0xAA 0xAA"
  - action_id: save_restore_settings
    description: "Requires confirmation pattern 0x55 0x55 plus 4-digit PIN"
  - action_id: reboot
    description: "Requires ASCII 'REBOOT' confirmation bytes"
interlocks: []
# UNRESOLVED: full interlock list not documented in source
```

## Notes

**Protocol frame format:**
Command: `<St=0x21> <Zn> <Cc> <Dl> <Data...> <Et=0x0D>`
Response: `<St=0x21> <Zn> <Cc> <Ac> <Dl> <Data...> <Et=0x0D>`

**Zone numbers:** 0x01 = Zone 1 (master), 0x02 = Zone 2.

**Answer codes:** 0x00 = OK, 0x82 = Zone Invalid, 0x83 = Command not recognised, 0x84 = Parameter not recognised, 0x85 = Command invalid at this time (e.g. setup menu open), 0x86 = Invalid data length.

**Response timeout:** AV responds within 3 seconds. RC may send further commands before receiving a response.

**Reserved commands:** 0xF0–0xFF are reserved for test functions and must not be used.

**RS232 control setup:** Must be enabled via front panel (hold DIRECT button 4 seconds) or OSD menu (General Setup → Control → On). Disabled by default for minimum standby power.

**Null modem cable:** Pin 2↔3 (Rx↔Tx), Pin 3↔2 (Tx↔Rx), Pin 5↔5 (Ground).

**AMX Duet support:** Device responds to "AMX\r" with AMXB discovery string including Device-SDKClass, Make, Model, and Revision.

**Key RC5 IR codes (Zone 1, system code 0x10):**
| Function | Command Code |
|---|---|
| Power On | 0x7B |
| Power Off | 0x7C |
| Standby | 0x0C |
| Volume Up | 0x10 |
| Volume Down | 0x11 |
| Mute | 0x0D |
| Mute On | 0x1A |
| Mute Off | 0x78 |

**Key RC5 IR codes (Zone 2, system code 0x17):**
| Function | Command Code |
|---|---|
| Zone 2 Power On | 0x7B |
| Zone 2 Power Off | 0x7C |
| Zone 2 Vol+ | 0x01 |
| Zone 2 Vol- | 0x02 |
| Zone 2 Mute | 0x03 |

<!-- UNRESOLVED: SA20 Series is not explicitly listed in the source document — source covers AVR390/AVR550/AVR850/AV860/SR250 only -->
<!-- UNRESOLVED: protocol version compatibility range not stated (example shows RS232 v1.4 but may vary) -->
<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-04-23T15:12:30.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:12:30.924Z
matched_actions: 79
action_count: 79
confidence: high
summary: "All 79 spec action IDs matched with literal opcode counterparts in source; transport parameters (38400 baud, port 50000) verified; shapes agree on value ranges, enum codes, and parameter counts."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
