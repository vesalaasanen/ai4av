---
spec_id: admin/lexicon-rv_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon RV Series Control Spec"
manufacturer: Lexicon
model_family: RV-9
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - RV-9
    - RV-6
    - MC-10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicondsp.pl
  - lexicon.com
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-04-30T09:45:14.540Z
generated_at: 2026-04-30T09:45:14.540Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:45:14.540Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions map cleanly to source command opcodes; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Lexicon RV Series Control Spec

## Summary
AV receiver with multi-zone control via RS-232 and TCP/IP. IP control uses port 50000. Protocol uses zone-prefixed binary command format with start byte `!` (0x21) and end byte 0x0D. RC5 IR simulation supported via command 0x08. Two zones defined (master zone 1 and zone 2).

<!-- UNRESOLVED: dedicated power on/off TCP commands not documented; power state query only -->

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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_state_get
  label: Get Power State
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (1 = master, 2 = zone 2)

- id: display_brightness_get
  label: Get Display Brightness
  kind: action
  params:
    - name: zone
      type: integer

- id: headphones_status_get
  label: Get Headphone Status
  kind: action
  params:
    - name: zone
      type: integer

- id: fm_genre_get
  label: Get FM Genre
  kind: action
  params:
    - name: zone
      type: integer

- id: software_version_get
  label: Get Software Version
  kind: action
  params:
    - name: zone
      type: integer
    - name: version_type
      type: string
      enum: [RS232, Host, OSD, DSP, NET, IAP]

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  params:
    - name: zone
      type: integer

- id: save_restore_secure_copy
  label: Save/Restore Secure Copy
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: string
      enum: [save, restore]
    - name: pin
      type: string
      description: 4-digit PIN

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: zone
      type: integer
    - name: system_code
      type: integer
      description: RC5 system code
    - name: command_code
      type: integer
      description: RC5 command code

- id: display_info_set
  label: Set Display Information Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: info_type
      type: integer
      description: Display info type code

- id: source_get
  label: Get Current Source
  kind: action
  params:
    - name: zone
      type: integer

- id: headphone_override
  label: Set Headphone Override
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      enum: [0, 1]

- id: video_selection_set
  label: Set Video Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: source
      type: integer
      description: 0=BD, 1=SAT, 2=AV, 3=PVR, 4=VCR, 5=Game, 6=STB

- id: audio_input_select
  label: Select Analogue/Digital Audio Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: input_type
      type: integer
      description: 0=analogue, 1=digital, 2=HDMI

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: Volume 0-99

- id: volume_get
  label: Get Volume
  kind: action
  params:
    - name: zone
      type: integer

- id: mute_status_get
  label: Get Mute Status
  kind: action
  params:
    - name: zone
      type: integer

- id: direct_mode_status_get
  label: Get Direct Mode Status
  kind: action
  params:
    - name: zone
      type: integer

- id: decode_mode_2ch_get
  label: Get 2-Channel Decode Mode
  kind: action
  params:
    - name: zone
      type: integer

- id: decode_mode_mch_get
  label: Get Multi-Channel Decode Mode
  kind: action
  params:
    - name: zone
      type: integer

- id: rds_info_get
  label: Get RDS Information
  kind: action
  params:
    - name: zone
      type: integer

- id: video_output_resolution_get
  label: Get Video Output Resolution
  kind: action
  params:
    - name: zone
      type: integer

- id: menu_status_get
  label: Get Menu Status
  kind: action
  params:
    - name: zone
      type: integer

- id: tuner_preset_get
  label: Get Tuner Preset
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset_number
      type: integer
      description: 1-50, or F0 for current

- id: tune
  label: Tune FM Frequency
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: 0=decrement, 1=increment, F0=request

- id: dab_station_get
  label: Get DAB Station
  kind: action
  params:
    - name: zone
      type: integer

- id: dab_program_type_get
  label: Get DAB Program Type
  kind: action
  params:
    - name: zone
      type: integer

- id: dab_dls_info_get
  label: Get DAB DLS/PDT Information
  kind: action
  params:
    - name: zone
      type: integer

- id: preset_details_get
  label: Get Preset Details
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset_number
      type: integer
      description: 1-50

- id: network_playback_status_get
  label: Get Network Playback Status
  kind: action
  params:
    - name: zone
      type: integer

- id: imax_enhanced_set
  label: Set IMAX Enhanced
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: F0=request, F1=Auto, F2=On, F3=Off

- id: treble_eq_set
  label: Set Treble Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-12 = 0 to +12dB, 0x81-0x8C = -1 to -12dB, F1=increment, F2=decrement

- id: treble_eq_get
  label: Get Treble Equalisation
  kind: action
  params:
    - name: zone
      type: integer

- id: bass_eq_set
  label: Set Bass Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-12 = 0 to +12dB, 0x81-0x8C = -1 to -12dB, F1=increment, F2=decrement

- id: bass_eq_get
  label: Get Bass Equalisation
  kind: action
  params:
    - name: zone
      type: integer

- id: room_eq_set
  label: Set Room Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: F1=on, F2=off, F0=request

- id: dolby_volume_set
  label: Set Dolby Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0=off, 1=on, F0=request

- id: dolby_leveller_set
  label: Set Dolby Leveller
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-10, F1=increment, F2=decrement, FF=off, F0=request

- id: dolby_volume_calibration_set
  label: Set Dolby Volume Calibration Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: offset
      type: integer
      description: 0-15 = 0 to +15dB, 0x80-0x8F = -1 to -15dB

- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-6 = right, 0x81-0x86 = left, F1=increment, F2=decrement

- id: subwoofer_trim_set
  label: Set Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-20 = +0 to +10dB in 0.5dB steps, 0x81-0x94 = negative trim

- id: lipsync_delay_set
  label: Set Lipsync Delay
  kind: action
  params:
    - name: zone
      type: integer
    - name: delay
      type: integer
      description: 0-50 in 5ms steps

- id: compression_set
  label: Set Compression
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: 0=off, 1=medium, 2=high, F0=request

- id: incoming_video_params_get
  label: Get Incoming Video Parameters
  kind: action
  params:
    - name: zone
      type: integer

- id: incoming_audio_format_get
  label: Get Incoming Audio Format
  kind: action
  params:
    - name: zone
      type: integer

- id: incoming_audio_sample_rate_get
  label: Get Incoming Audio Sample Rate
  kind: action
  params:
    - name: zone
      type: integer

- id: sub_stereo_trim_set
  label: Set Sub Stereo Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=0dB, 0x81-0x94 = -0.5 to -10dB in 0.5dB steps

- id: zone1_osd_set
  label: Set Zone 1 OSD
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: F1=On, F2=Off, F0=request

- id: hdmi_output_set
  label: Set HDMI Video Output
  kind: action
  params:
    - name: zone
      type: integer
    - name: output
      type: integer
      description: 2=Output 1, 3=Output 2, 4=Both, F0=request

- id: input_name_set
  label: Set Input Name
  kind: action
  params:
    - name: zone
      type: integer
    - name: name
      type: string
      description: Up to 10 ASCII characters

- id: input_name_get
  label: Get Input Name
  kind: action
  params:
    - name: zone
      type: integer

- id: fm_scan
  label: FM Scan
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: 1=up, 2=down

- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: zone
      type: integer

- id: heartbeat
  label: Heartbeat
  kind: action
  params:
    - name: zone
      type: integer

- id: reboot
  label: Reboot
  kind: action
  params:
    - name: zone
      type: integer
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - "0x00: standby"
    - "0x01: on"

- id: display_brightness
  label: Display Brightness
  type: enum
  values:
    - "0x00: off"
    - "0x01: L1"
    - "0x02: L2"

- id: headphone_status
  label: Headphone Status
  type: enum
  values:
    - "0x00: not connected"
    - "0x01: connected"

- id: fm_genre
  label: FM Genre
  type: string

- id: software_version
  label: Software Version
  type: object
  fields:
    - name: type
      type: string
    - name: major
      type: integer
    - name: minor
      type: integer

- id: source
  label: Current Source
  type: enum
  values:
    - "0x00: Follow Zone 1"
    - "0x01: CD"
    - "0x02: BD"
    - "0x03: AV"
    - "0x04: SAT"
    - "0x05: PVR"
    - "0x06: VCR"
    - "0x08: AUX"
    - "0x09: DISPLAY"
    - "0x0B: TUNER FM"
    - "0x0C: TUNER DAB"
    - "0x0E: NET"
    - "0x0F: USB"
    - "0x10: STB"
    - "0x11: GAME"

- id: video_input
  label: Video Input
  type: enum
  values:
    - "0x00: BD"
    - "0x01: SAT"
    - "0x02: AV"
    - "0x03: PVR"
    - "0x04: VCR"
    - "0x05: Game"
    - "0x06: STB"

- id: audio_input_type
  label: Audio Input Type
  type: enum
  values:
    - "0x00: analogue"
    - "0x01: digital"
    - "0x02: HDMI"

- id: volume
  label: Volume
  type: integer
  range: [0, 99]

- id: mute_state
  label: Mute State
  type: enum
  values:
    - "0x00: muted"
    - "0x01: not muted"

- id: direct_mode_state
  label: Direct Mode State
  type: enum
  values:
    - "0x00: off"
    - "0x01: on"

- id: decode_mode_2ch
  label: 2-Channel Decode Mode
  type: enum
  values:
    - "0x01: Stereo"
    - "0x04: Dolby Surround"
    - "0x07: Neo:6 Cinema"
    - "0x08: Neo:6 Music"
    - "0x09: 5/7 Ch Stereo"
    - "0x0A: DTS Neural:X"
    - "0x0B: Logic7 Immersion"
    - "0x0C: DTS Virtual:X"

- id: decode_mode_mch
  label: Multi-Channel Decode Mode
  type: enum
  values:
    - "0x01: Stereo down-mix"
    - "0x02: Multi-channel"
    - "0x03: DTS-ES / Neural:X"
    - "0x06: Dolby Surround"
    - "0x0B: Logic7 Immersion"
    - "0x0C: DTS Virtual:X"

- id: rds_info
  label: RDS Information
  type: string

- id: video_output_resolution
  label: Video Output Resolution
  type: enum
  values:
    - "0x02: SD Progressive"
    - "0x03: 720p"
    - "0x04: 1080i"
    - "0x05: 1080p"
    - "0x06: Preferred"
    - "0x07: Bypass"
    - "0x08: 4k"

- id: menu_status
  label: Menu Status
  type: enum
  values:
    - "0x00: No menu"
    - "0x02: Set-up Menu"
    - "0x03: Trim Menu"
    - "0x04: Bass Menu"
    - "0x05: Treble Menu"
    - "0x06: Sync Menu"
    - "0x07: Sub Menu"
    - "0x08: Tuner Menu"
    - "0x09: Network menu"
    - "0x0A: USB Menu"

- id: tuner_preset
  label: Tuner Preset
  type: integer
  range: [1, 50]
  notes: 0xFF = no preset selected

- id: tuner_frequency
  label: Tuner Frequency
  type: object
  fields:
    - name: mhz
      type: integer
    - name: khz
      type: integer

- id: dab_station
  label: DAB Station
  type: string

- id: dab_program_type
  label: DAB Program Type
  type: string

- id: dab_dls_info
  label: DAB DLS/PDT Information
  type: string

- id: preset_details
  label: Preset Details
  type: object
  fields:
    - name: preset_number
      type: integer
    - name: source_type
      type: string
    - name: frequency_or_name
      type: string

- id: network_playback_status
  label: Network Playback Status
  type: object
  fields:
    - name: state
      type: enum
      values:
        - "0x00: Navigating"
        - "0x01: Playing"
        - "0x02: Paused"
        - "0xFF: Busy/Not Playing"
    - name: name
      type: string

- id: imax_enhanced
  label: IMAX Enhanced State
  type: enum
  values:
    - "0x00: Off"
    - "0x01: On"
    - "0x02: Auto"

- id: treble_eq
  label: Treble Equalisation
  type: integer
  range: [-12, 12]

- id: bass_eq
  label: Bass Equalisation
  type: integer
  range: [-12, 12]

- id: room_eq
  label: Room Equalisation State
  type: enum
  values:
    - "0x00: off"
    - "0x01: on"
    - "0x02: not calculated"

- id: dolby_volume
  label: Dolby Volume State
  type: enum
  values:
    - "0x00: off"
    - "0x01: on"

- id: dolby_leveller
  label: Dolby Leveller Setting
  type: integer
  range: [0, 10]
  notes: 0xFF = off

- id: dolby_volume_calibration
  label: Dolby Volume Calibration Offset
  type: integer
  range: [-15, 15]

- id: balance
  label: Balance
  type: integer
  range: [-6, 6]

- id: subwoofer_trim
  label: Subwoofer Trim
  type: number
  range: [-10, 10]
  notes: 0.5dB steps

- id: lipsync_delay
  label: Lipsync Delay
  type: integer
  range: [0, 250]
  unit: ms
  notes: 5ms steps

- id: compression
  label: Compression
  type: enum
  values:
    - "0x00: off"
    - "0x01: medium"
    - "0x02: high"

- id: incoming_video_params
  label: Incoming Video Parameters
  type: object
  fields:
    - name: horizontal_resolution
      type: integer
    - name: vertical_resolution
      type: integer
    - name: refresh_rate
      type: integer
    - name: interlaced
      type: boolean
    - name: aspect_ratio
      type: enum
      values:
        - "0x00: Undefined"
        - "0x01: 4:3"
        - "0x02: 16:9"

- id: incoming_audio_format
  label: Incoming Audio Format
  type: object
  fields:
    - name: stream_format
      type: string
    - name: channel_config
      type: string

- id: incoming_audio_sample_rate
  label: Incoming Audio Sample Rate
  type: enum
  values:
    - "0x00: 32 KHz"
    - "0x01: 44.1 KHz"
    - "0x02: 48 KHz"
    - "0x03: 88.2 KHz"
    - "0x04: 96 KHz"
    - "0x05: 176.4 KHz"
    - "0x06: 192 KHz"
    - "0x07: Unknown"
    - "0x08: Undetected"

- id: sub_stereo_trim
  label: Sub Stereo Trim
  type: number
  range: [-10, 0]
  unit: dB
  notes: 0.5dB steps

- id: zone1_osd
  label: Zone 1 OSD State
  type: enum
  values:
    - "0x00: On"
    - "0x01: Off"

- id: hdmi_output
  label: HDMI Video Output
  type: enum
  values:
    - "0x02: Output 1"
    - "0x03: Output 2"
    - "0x04: Output 1 & 2"

- id: input_name
  label: Input Name
  type: string

- id: heartbeat_response
  label: Heartbeat Response
  type: enum
  values:
    - "0x00: OK"

- id: answer_code
  label: Answer Code
  type: enum
  values:
    - "0x00: Status update"
    - "0x82: Zone Invalid"
    - "0x83: Command not recognised"
    - "0x84: Parameter not recognised"
    - "0x85: Command invalid at this time"
    - "0x86: Invalid data length"
```

## Variables
```yaml
# All settable parameters are accessed via action commands.
# See Actions section for get/set pairs.
```

## Events
```yaml
# Device sends state change messages asynchronously using same message format.
# State changes include: display brightness, decode mode, source selection,
# volume, mute, and all front-panel/IR-triggered changes.
# UNRESOLVED: complete event catalogue not enumerated in source
```

## Macros
```yaml
# No explicit multi-step macros defined in source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # requires 0xAA 0xAA confirmation pattern
  - reboot  # requires "REBOOT" string confirmation
interlocks: []
```

## Notes
Zone number 0x01 = master zone (zone 1), 0x02 = zone 2. All commands without explicit zone refer to master zone. Commands 0xF0–0xFF are reserved for test functions. AMX Duet DDDP discovery supported on TCP port 50000. Response to `AMX\\r` includes device model and RS232 protocol version. Factory restore requires double-AA confirmation pattern to prevent accidental activation. Restore secure copy requires PIN code. Some commands return 0x85 (invalid at this time) when OSD menu is displayed or when wrong input is selected (e.g., tuner commands when tuner not selected).
<!-- UNRESOLVED: complete list of unsolicited event message types not documented -->
<!-- UNRESOLVED:firmware version compatibility not stated -->
<!-- UNRESOLVED: port number for TCP found in source (50000); serial-only draft would omit port -->

## Provenance

```yaml
source_domains:
  - lexicondsp.pl
  - lexicon.com
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-04-30T09:45:14.540Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:45:14.540Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions map cleanly to source command opcodes; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
