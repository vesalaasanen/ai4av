---
spec_id: admin/lexicon-mc_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon, Inc. MC Series Control Spec"
manufacturer: Lexicon
model_family: MC-10
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
    - "Lexicon, Inc."
  models:
    - MC-10
    - RV-9
    - RV-6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-10-07T12:47:59.650Z
last_checked_at: 2026-10-07T12:47:59.650Z
generated_at: 2026-10-07T12:47:59.650Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "multi-zone details beyond zone 1 and 2 not fully documented"
  - "Full event notification catalog not explicitly documented"
  - "Full list of sources for current_source feedback (only those explicitly listed in 0x1D response section)"
  - "Network protocol details beyond port 50000"
  - "Zone 2+ detailed command support"
  - "Firmware version compatibility ranges"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:47:59.650Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "All 50 semantic-id actions map one-to-one to documented command codes with agreeing value shapes; serial and port 50000 transport values are supported by the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Lexicon, Inc. MC Series Control Spec

## Summary
Lexicon MC Series (MC-10, RV-9, RV-6) AV receivers supporting both RS-232 and IP (NET) control. Communication uses a binary packet format with start byte `0x21`, zone number, command code, data length, optional data, and end byte `0x0D`. IP control uses port 50000.

<!-- UNRESOLVED: multi-zone details beyond zone 1 and 2 not fully documented -->

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
  type: UNRESOLVED
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
- id: power
  label: Power
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0xF0" # Request power state
    - name: zone
      type: integer
      description: Zone number (1 or 2)
- id: display_brightness
  label: Display Brightness
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0x00" # Off
        - "0x01" # L1
        - "0x02" # L2
        - "0xF0" # Request current brightness
- id: headphones_status
  label: Headphones Status
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request current status
- id: fm_genre
  label: FM Genre
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request current genre
- id: software_version
  label: Software Version
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0xF0" # RS232 version
        - "0xF1" # Host version
        - "0xF2" # OSD version
        - "0xF3" # DSP version
        - "0xF4" # NET version
        - "0xF5" # IAP version
- id: factory_restore
  label: Factory Restore
  kind: action
  params:
    - name: confirm
      type: string
      description: Confirmation pattern 0xAA 0xAA
- id: secure_copy
  label: Save/Restore Secure Copy
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0x00" # Save secure backup
        - "0x01" # Restore secure backup
    - name: confirm
      type: string
      description: Confirmation pattern 0x55 0x55
    - name: pin
      type: string
      description: 4-digit PIN
- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: system_code
      type: integer
      description: RC5 system code
    - name: command_code
      type: integer
      description: RC5 command code
- id: display_info_type
  label: Display Information Type
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0x00" # Processing mode
        - "0xE0" # Cycle through all
        - "0xF0" # Request current display type
        - "0x01" # FM Radio text
        - "0x02" # FM Programme type
        - "0x03" # FM Signal strength
        - "0x01" # DAB Radio text
        - "0x02" # DAB Genre
        - "0x03" # DAB Signal quality
        - "0x04" # DAB Bit rate
        - "0x01" # NET/USB Track
        - "0x02" # NET/USB Artist
        - "0x03" # NET/USB Album
        - "0x04" # NET/USB audio type
        - "0x05" # NET/USB rate
- id: video_selection
  label: Video Selection
  kind: action
  params:
    - name: source
      type: enum
      values:
        - "0x00" # BD
        - "0x01" # SAT
        - "0x02" # AV
        - "0x03" # PVR
        - "0x04" # VCR
        - "0x05" # Game
        - "0x06" # STB
        - "0xF0" # Request current input
- id: audio_input_select
  label: Select Analogue/Digital Audio Input
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "0x00" # Analogue
        - "0x01" # Digital
        - "0x02" # HDMI
        - "0xF0" # Request current audio type
- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request current state
        - "0xF1" # Auto
        - "0xF2" # On
        - "0xF3" # Off
- id: volume
  label: Set/Request Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-99, or 0xF0 to query
- id: mute_status
  label: Request Mute Status
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request mute status
- id: direct_mode_status
  label: Request Direct Mode Status
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request mode setting
- id: decode_mode_2ch
  label: Request Decode Mode 2ch
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request decode mode
- id: decode_mode_mch
  label: Request Decode Mode MCH
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request decode mode
- id: rds_information
  label: Request RDS Information
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request RDS info (FM)
- id: video_output_resolution
  label: Request Video Output Resolution
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request video output
- id: menu_status
  label: Request Menu Status
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request open menu state
- id: tuner_preset
  label: Request Tuner Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-50, or 0xF0 to request current"
- id: tune
  label: Tune
  kind: action
  params:
    - name: direction
      type: enum
      values:
        - "0x00" # Decrement
        - "0x01" # Increment
        - "0xF0" # Request current frequency
- id: dab_station
  label: Request DAB Station
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request current DAB station
- id: dab_program_type
  label: DAB Program Type/Category
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request program type
- id: dab_dls_info
  label: DLS/PDT Information
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request DLS info (DAB)
- id: preset_details
  label: Request Preset Details
  kind: action
  params:
    - name: preset_number
      type: integer
      description: Preset number 1-50
- id: network_playback_status
  label: Network Playback Status
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request playback status
- id: current_source
  label: Request Current Source
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request current source
- id: headphone_override
  label: Headphone Over-ride
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0x00" # Clear (mute speakers if headphones present)
        - "0x01" # Set (unmute speakers if headphones present)
- id: input_name
  label: Set/Request Input Name
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Query input name
    - name: name
      type: string
      description: ASCII name (up to 10 characters for setting)
- id: fm_scan
  label: FM Scan
  kind: action
  params:
    - name: direction
      type: enum
      values:
        - "0x01" # Scan up
        - "0x02" # Scan down
- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Start DAB scan
- id: heartbeat
  label: Heartbeat
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Heartbeat
- id: reboot
  label: Reboot
  kind: action
  params:
    - name: confirm
      type: string
      description: Confirmation string "REBOOT"
- id: treble_eq
  label: Treble Equalisation
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x0C: 0dB to +12dB, 0x81-0x8C: -1dB to -12dB, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: bass_eq
  label: Bass Equalisation
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x0C: 0dB to +12dB, 0x81-0x8C: -1dB to -12dB, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: room_eq
  label: Room Equalisation
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0xF0" # Request current state
        - "0xF1" # Room EQ on
        - "0xF2" # Room EQ off
- id: dolby_volume
  label: Dolby Volume
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0x00" # Off
        - "0x01" # On
        - "0xF0" # Request current mode
- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x0A: 0-10, 0xFF: off, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: dolby_volume_offset
  label: Dolby Volume Calibration Offset
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x0F: 0 to +15dB, 0x80-0x8F: -1 to -15dB, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x06: 0 to +6, 0x81-0x86: -1 to -6, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x14: positive in 0.5dB steps, 0x81-0x94: negative in 0.5dB steps, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00-0x32: delay in 5ms steps, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: compression
  label: Compression
  kind: action
  params:
    - name: level
      type: enum
      values:
        - "0x00" # Off
        - "0x01" # Medium
        - "0x02" # High
        - "0xF0" # Request current setting
- id: incoming_video_params
  label: Request Incoming Video Parameters
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request video parameters
- id: incoming_audio_format
  label: Request Incoming Audio Format
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request audio format
- id: incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0xF0" # Request sample rate
- id: sub_stereo_trim
  label: Set/Request Sub Stereo Trim
  kind: action
  params:
    - name: value
      type: integer
      description: "0x00: 0dB, 0x81-0x94: -0.5dB to -10dB in 0.5dB steps, 0xF0: request, 0xF1: increment, 0xF2: decrement"
- id: zone1_osd
  label: Set/Request Zone 1 OSD
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0xF0" # Request current state
        - "0xF1" # On
        - "0xF2" # Off
- id: video_output_switching
  label: Set/Request Video Output Switching
  kind: action
  params:
    - name: output
      type: enum
      values:
        - "0x02" # HDMI Output 1
        - "0x03" # HDMI Output 2
        - "0x04" # HDMI Output 1 & 2
        - "0xF0" # Request current setting
```

## Feedbacks
```yaml
- id: power_feedback
  type: enum
  values:
    - "0x00" # Standby
    - "0x01" # Powered on
- id: display_brightness_feedback
  type: enum
  values:
    - "0x00" # Front panel off
    - "0x01" # Front panel L1
    - "0x02" # Front panel L2
- id: headphones_feedback
  type: enum
  values:
    - "0x00" # Not connected
    - "0x01" # Connected
- id: fm_genre_feedback
  type: string
  description: ASCII string of program type
- id: software_version_feedback
  type: string
  description: Echo of request type + major.minor version
- id: factory_restore_feedback
  type: enum
  values:
    - "0x00" # Success
- id: secure_copy_feedback
  type: enum
  values:
    - "0x00" # Success
    - "0x85" # Error (no secure copy or save in progress)
- id: rc5_feedback
  type: enum
  values:
    - "0x00" # Success
- id: display_info_feedback
  type: enum
  values:
    - "0x00" # Processing mode
    - "0x01" # Radio text / Track / etc.
- id: video_selection_feedback
  type: enum
  values:
    - "0x00" # BD
    - "0x01" # SAT
    - "0x02" # AV
    - "0x03" # PVR
    - "0x04" # VCR
    - "0x05" # Game
    - "0x06" # STB
- id: audio_input_feedback
  type: enum
  values:
    - "0x00" # Analogue
    - "0x01" # Digital
    - "0x02" # HDMI
- id: imax_feedback
  type: enum
  values:
    - "0x00" # Off
    - "0x01" # On
    - "0x02" # Auto
- id: volume_feedback
  type: integer
  description: Volume 0-99
- id: mute_feedback
  type: enum
  values:
    - "0x00" # Muted
    - "0x01" # Not muted
- id: direct_mode_feedback
  type: enum
  values:
    - "0x00" # Off
    - "0x01" # On
- id: decode_mode_2ch_feedback
  type: enum
  values:
    - "0x01" # Stereo
    - "0x04" # Dolby Surround
    - "0x07" # Neo:6 Cinema
    - "0x08" # Neo:6 Music
    - "0x09" # 5/7 Ch Stereo
    - "0x0A" # DTS Neural:X
    - "0x0B" # Logic7 Immersion
    - "0x0C" # DTS Virtual:X
- id: decode_mode_mch_feedback
  type: enum
  values:
    - "0x01" # Stereo down-mix
    - "0x02" # Multi-channel mode
    - "0x03" # DTS-ES / Neural:X mode
    - "0x06" # Dolby Surround mode
    - "0x0B" # Logic7 Immersion
    - "0x0C" # DTS Virtual:X
- id: rds_feedback
  type: string
  description: ASCII string
- id: video_resolution_feedback
  type: enum
  values:
    - "0x02" # SD Progressive
    - "0x03" # 720p
    - "0x04" # 1080i
    - "0x05" # 1080p
    - "0x06" # Preferred
    - "0x07" # Bypass
    - "0x08" # 4k
- id: menu_status_feedback
  type: enum
  values:
    - "0x00" # No menu open
    - "0x02" # Set-up Menu
    - "0x03" # Trim Menu
    - "0x04" # Bass Menu
    - "0x05" # Treble Menu
    - "0x06" # Sync Menu
    - "0x07" # Sub Menu
    - "0x08" # Tuner Menu
    - "0x09" # Network menu
    - "0x0A" # USB Menu
- id: tuner_preset_feedback
  type: integer
  description: "0xFF if no preset, 0x01-0x32 for preset 1-50"
- id: tune_feedback
  type: string
  description: Frequency in MHz
- id: dab_station_feedback
  type: string
  description: 16-byte ASCII station name padded with spaces
- id: dab_program_type_feedback
  type: string
  description: 16-byte ASCII program type padded with spaces
- id: dab_dls_feedback
  type: string
  description: 128-byte ASCII DLS text padded with spaces
- id: preset_details_feedback
  type: string
  description: Preset number, frequency/name data
- id: network_playback_feedback
  type: enum
  values:
    - "0x00" # Navigating
    - "0x01" # Playing
    - "0x02" # Paused
    - "0xFF" # Busy/Not Playing
- id: current_source_feedback
  type: enum
  values:
    - "0x00" # Follow Zone 1
    - "0x01" # CD
    - "0x02" # BD
    - "0x03" # AV
    - "0x04" # SAT
    - "0x05" # PVR
    - "0x06" # VCR
    - "0x08" # AUX
    - "0x09" # DISPLAY
    - "0x0B" # TUNER FM
    - "0x0C" # TUNER DAB
    - "0x0E" # NET
    - "0x0F" # USB
    - "0x10" # STB
    - "0x11" # GAME
- id: headphone_override_feedback
  type: enum
  values:
    - "0x00" # Clear
    - "0x01" # Set
- id: input_name_feedback
  type: string
  description: Input name in ASCII
- id: fm_scan_feedback
  type: enum
  values:
    - "0xFF" # Scanning
- id: dab_scan_feedback
  type: enum
  values:
    - "0xFF" # Scanning
- id: heartbeat_feedback
  type: enum
  values:
    - "0x00" # Response
- id: reboot_feedback
  type: enum
  values:
    - "0x00" # Response
- id: treble_eq_feedback
  type: integer
  description: "0x00-0x0C: 0dB to +12dB, 0x81-0x8C: -1dB to -12dB"
- id: bass_eq_feedback
  type: integer
  description: "0x00-0x0C: 0dB to +12dB, 0x81-0x8C: -1dB to -12dB"
- id: room_eq_feedback
  type: enum
  values:
    - "0x00" # Off
    - "0x01" # On
    - "0x02" # Not calculated
- id: dolby_volume_feedback
  type: enum
  values:
    - "0x00" # Off
    - "0x01" # On
- id: dolby_leveller_feedback
  type: integer
  description: "0x00-0x0A: level, 0xFF: off"
- id: dolby_volume_offset_feedback
  type: integer
  description: "0x00-0x0F: 0 to +15dB, 0x80-0x8F: -1 to -15dB"
- id: balance_feedback
  type: integer
  description: "0x00-0x06: 0 to +6, 0x81-0x86: -1 to -6"
- id: subwoofer_trim_feedback
  type: integer
  description: "0x00-0x14: positive in 0.5dB steps, 0x81-0x94: negative"
- id: lipsync_delay_feedback
  type: integer
  description: "0x00-0x32: delay in 5ms steps"
- id: compression_feedback
  type: enum
  values:
    - "0x00" # Off
    - "0x01" # Medium
    - "0x02" # High
- id: incoming_video_params_feedback
  type: string
  description: H-res, V-res, refresh, interlaced flag, aspect ratio
- id: incoming_audio_format_feedback
  type: string
  description: Audio stream format and channel configuration
- id: incoming_audio_sample_rate_feedback
  type: enum
  values:
    - "0x00" # 32 KHz
    - "0x01" # 44.1 KHz
    - "0x02" # 48 KHz
    - "0x03" # 88.2 KHz
    - "0x04" # 96 KHz
    - "0x05" # 176.4 KHz
    - "0x06" # 192 KHz
    - "0x07" # Unknown
    - "0x08" # Undetected
- id: sub_stereo_trim_feedback
  type: integer
  description: "0x00, 0x81-0x94: -0.5dB to -10dB in 0.5dB steps"
- id: zone1_osd_feedback
  type: enum
  values:
    - "0x00" # On
    - "0x01" # Off
- id: video_output_switching_feedback
  type: enum
  values:
    - "0x02" # HDMI Output 1
    - "0x03" # HDMI Output 2
    - "0x04" # HDMI Output 1 & 2
```

## Variables
```yaml
# All settable parameters are represented as Actions with 0xF0 query variant
```

## Events
```yaml
# The device sends state change notifications unsolicited:
# - Display brightness changes via front panel
# - Decode mode changes
# - All state changes from IR or front panel are relayed to RC
# UNRESOLVED: Full event notification catalog not explicitly documented
```

## Macros
```yaml
# No explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for:
  - factory_restore (requires 0xAA 0xAA confirmation pattern)
  - secure_copy_restore (requires PIN code)
  - reboot (requires "REBOOT" string)
interlocks: []
```

## Notes
IP control is via port 50000. AMX Duet DDDP discovery supported with device class Receiver. RC5 IR commands can be simulated via command 0x08. Commands 0xF0-0xFF are reserved for test functions. Some commands return error 0x85 when OSD is displayed or when wrong source is selected (e.g., tuner commands when not on tuner input).
<!-- UNRESOLVED: Full list of sources for current_source feedback (only those explicitly listed in 0x1D response section) -->
<!-- UNRESOLVED: Network protocol details beyond port 50000 -->
<!-- UNRESOLVED: Zone 2+ detailed command support -->
<!-- UNRESOLVED: Firmware version compatibility ranges -->

## Provenance

```yaml
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-10-07T12:47:59.650Z
last_checked_at: 2026-10-07T12:47:59.650Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:47:59.650Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "All 50 semantic-id actions map one-to-one to documented command codes with agreeing value shapes; serial and port 50000 transport values are supported by the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "multi-zone details beyond zone 1 and 2 not fully documented"
- "Full event notification catalog not explicitly documented"
- "Full list of sources for current_source feedback (only those explicitly listed in 0x1D response section)"
- "Network protocol details beyond port 50000"
- "Zone 2+ detailed command support"
- "Firmware version compatibility ranges"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
