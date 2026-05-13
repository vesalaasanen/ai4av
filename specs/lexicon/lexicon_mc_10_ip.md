---
spec_id: admin/lexicon-mc_10
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon MC-10 Control Spec"
manufacturer: Lexicon
model_family: MC-10
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - MC-10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicondsp.pl
  - lexicon.com
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-04-30T09:45:13.542Z
generated_at: 2026-04-30T09:45:13.542Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:45:13.542Z
  matched_actions: 54
  action_count: 54
  confidence: high
  summary: "All 54 spec actions matched to distinct source commands; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Lexicon MC-10 Control Spec

## Summary
AV receiver with dual-zone RS-232 and IP control. Protocol is binary hexadecimal with framed structure: `<St> <Zn> <Cc> <Dl> <Data> <Et>`. IP control via port 50000. Control disabled by default; enable via front panel DIRECT button (4s) or OSD menu. No login required.

<!-- UNRESOLVED: RC5 IR simulation is primary control path for many functions; direct binary commands limited to system-level ops -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 50000  # IP control port stated in source
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
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_query
  label: Power State Query
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: power_on
  label: Power On
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
  # UNRESOLVED: no direct power-on command; use Simulate RC5 IR (0x08) with RC5 code 16-123

- id: power_off
  label: Power Off
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
  # UNRESOLVED: no direct power-off command; use Simulate RC5 IR (0x08) with RC5 code 16-124

- id: display_brightness_query
  label: Display Brightness Query
  kind: action
  params:
    - name: zone
      type: integer

- id: headphones_query
  label: Headphones Query
  kind: action
  params:
    - name: zone
      type: integer

- id: fm_genre_query
  label: FM Genre Query
  kind: action
  params:
    - name: zone
      type: integer

- id: software_version_query
  label: Software Version Query
  kind: action
  params:
    - name: zone
      type: integer
    - name: version_type
      type: integer
      description: 0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: zone
      type: integer

- id: secure_backup_save
  label: Save Secure Backup
  kind: action
  params:
    - name: zone
      type: integer
    - name: pin
      type: integer
      description: 4-digit PIN

- id: secure_backup_restore
  label: Restore Secure Backup
  kind: action
  params:
    - name: zone
      type: integer
    - name: pin
      type: integer

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: zone
      type: integer
    - name: system_code
      type: integer
      description: RC5 system code (e.g. 0x10 for zone 1, 0x17 for zone 2)
    - name: command_code
      type: integer
      description: RC5 command code

- id: display_info_type
  label: Display Information Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: 0x00=Processing, 0xE0=Cycle, 0xF0=Query; FM: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength; DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate; NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate

- id: source_query
  label: Current Source Query
  kind: action
  params:
    - name: zone
      type: integer

- id: headphone_override
  label: Headphone Over-ride
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0x00=Clear (mute speakers if headphones present), 0x01=Set (unmute speakers if headphones present)

- id: video_selection
  label: Video Selection
  kind: action
  params:
    - name: zone
      type: integer
    - name: source
      type: integer
      description: 0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Query

- id: audio_input_select
  label: Select Analogue/Digital Audio Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: input
      type: integer
      description: 0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Query

- id: volume_set
  label: Set/Request Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: volume
      type: integer
      description: 0x00-0x63 (0-99), 0xF0=Query

- id: mute_status_query
  label: Mute Status Query
  kind: action
  params:
    - name: zone
      type: integer

- id: direct_mode_query
  label: Direct Mode Status Query
  kind: action
  params:
    - name: zone
      type: integer

- id: decode_mode_2ch_query
  label: Decode Mode 2ch Query
  kind: action
  params:
    - name: zone
      type: integer

- id: decode_mode_mch_query
  label: Decode Mode MCH Query
  kind: action
  params:
    - name: zone
      type: integer

- id: rds_info_query
  label: RDS Information Query
  kind: action
  params:
    - name: zone
      type: integer

- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: action
  params:
    - name: zone
      type: integer

- id: menu_status_query
  label: Menu Status Query
  kind: action
  params:
    - name: zone
      type: integer

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: 0x01-0x32 (1-50) or 0xF0=Query current

- id: tuner_tune
  label: Tune FM
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: 0x00=Decrement, 0x01=Increment, 0xF0=Query current frequency

- id: dab_station_query
  label: DAB Station Query
  kind: action
  params:
    - name: zone
      type: integer

- id: dab_genre_query
  label: DAB Programme Type Query
  kind: action
  params:
    - name: zone
      type: integer

- id: dab_dls_query
  label: DAB DLS/PDT Information Query
  kind: action
  params:
    - name: zone
      type: integer

- id: preset_details_query
  label: Preset Details Query
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset_number
      type: integer
      description: 0x01-0x32 (1-50)

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: action
  params:
    - name: zone
      type: integer

- id: imax_enhanced
  label: IMAX Enhanced Control
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: 0xF0=Query, 0xF1=Auto, 0xF2=On, 0xF3=Off

- id: treble_eq
  label: Treble Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x0C = 0dB-+12dB, 0x81-0x8C = -1dB--12dB, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: bass_eq
  label: Bass Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x0C = 0dB-+12dB, 0x81-0x8C = -1dB--12dB, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: room_eq
  label: Room Equalisation
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0xF0=Query, 0xF1=On, 0xF2=Off

- id: dolby_volume
  label: Dolby Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: 0x00=Off, 0x01=On, 0xF0=Query

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x0A = 0-10, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement, 0xFF=Off

- id: dolby_volume_cal_offset
  label: Dolby Volume Calibration Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x0F = 0-15dB, 0x80-0x8F = -1--15dB, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: balance
  label: Balance
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x06 = 0-6 (right), 0x81-0x86 = -1--6 (left), 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x14 = positive trim in 0.5dB steps, 0x81-0x94 = negative trim in 0.5dB steps, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00-0x32 = 0-50 in 5ms steps, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: compression
  label: Compression
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: 0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Query

- id: incoming_video_params_query
  label: Incoming Video Parameters Query
  kind: action
  params:
    - name: zone
      type: integer

- id: incoming_audio_format_query
  label: Incoming Audio Format Query
  kind: action
  params:
    - name: zone
      type: integer

- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: action
  params:
    - name: zone
      type: integer

- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0x00=0dB, 0x81-0x94 = -0.5--10dB in 0.5dB steps, 0xF0=Query, 0xF1=Increment, 0xF2=Decrement

- id: zone1_osd
  label: Set/Request Zone 1 OSD
  kind: action
  params:
    - name: state
      type: integer
      description: 0xF0=Query, 0xF1=On, 0xF2=Off

- id: video_output_switching
  label: Video Output Switching
  kind: action
  params:
    - name: zone
      type: integer
    - name: output
      type: integer
      description: 0x02=HDMI Output 1, 0x03=HDMI Output 2, 0x04=HDMI Output 1 & 2, 0xF0=Query

- id: input_name
  label: Set/Request Input Name
  kind: action
  params:
    - name: zone
      type: integer
    - name: name
      type: string
      description: ASCII string up to 10 chars; 0xF0 to query

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: 0x01=Scan up, 0x02=Scan down

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
    - 0x00  # Standby
    - 0x01  # Powered on

- id: display_brightness
  label: Display Brightness
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # L1
    - 0x02  # L2

- id: headphones_status
  label: Headphones Status
  type: enum
  values:
    - 0x00  # Not connected
    - 0x01  # Connected

- id: fm_genre
  label: FM Genre
  type: string

- id: software_version
  label: Software Version
  type: string

- id: answer_code
  label: Answer Code
  type: enum
  values:
    - 0x00  # Status update
    - 0x82  # Zone Invalid
    - 0x83  # Command not recognised
    - 0x84  # Parameter not recognised
    - 0x85  # Command invalid at this time
    - 0x86  # Invalid data length

- id: source
  label: Current Source
  type: enum
  values:
    - 0x00  # Follow Zone 1
    - 0x01  # CD
    - 0x02  # BD
    - 0x03  # AV
    - 0x04  # SAT
    - 0x05  # PVR
    - 0x06  # VCR
    - 0x08  # AUX
    - 0x09  # DISPLAY
    - 0x0B  # TUNER (FM)
    - 0x0C  # TUNER (DAB)
    - 0x0E  # NET
    - 0x0F  # USB
    - 0x10  # STB
    - 0x11  # GAME

- id: mute_state
  label: Mute State
  type: enum
  values:
    - 0x00  # Muted
    - 0x01  # Not muted

- id: direct_mode
  label: Direct Mode
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # On

- id: decode_mode_2ch
  label: Decode Mode 2ch
  type: enum
  values:
    - 0x01  # Stereo
    - 0x04  # Dolby Surround
    - 0x07  # Neo:6 Cinema
    - 0x08  # Neo:6 Music
    - 0x09  # 5/7 Ch Stereo
    - 0x0A  # DTS Neural:X
    - 0x0B  # Logic7 Immersion
    - 0x0C  # DTS Virtual:X

- id: decode_mode_mch
  label: Decode Mode MCH
  type: enum
  values:
    - 0x01  # Stereo down-mix
    - 0x02  # Multi-channel mode
    - 0x03  # DTS-ES / Neural:X mode
    - 0x06  # Dolby Surround mode
    - 0x0B  # Logic7 Immersion
    - 0x0C  # DTS Virtual:X

- id: video_output_resolution
  label: Video Output Resolution
  type: enum
  values:
    - 0x02  # SD Progressive
    - 0x03  # 720p
    - 0x04  # 1080i
    - 0x05  # 1080p
    - 0x06  # Preferred
    - 0x07  # Bypass
    - 0x08  # 4k

- id: menu_status
  label: Menu Status
  type: enum
  values:
    - 0x00  # No menu open
    - 0x02  # Set-up Menu Open
    - 0x03  # Trim Menu Open
    - 0x04  # Bass Menu Open
    - 0x05  # Treble Menu Open
    - 0x06  # Sync Menu Open
    - 0x07  # Sub Menu Open
    - 0x08  # Tuner Menu Open
    - 0x09  # Network menu Open
    - 0x0A  # USB Menu Open

- id: network_playback_status
  label: Network Playback Status
  type: enum
  values:
    - 0x00  # Navigating
    - 0x01  # Playing
    - 0x02  # Paused
    - 0xFF  # Busy/Not Playing

- id: imax_enhanced_state
  label: IMAX Enhanced State
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # On
    - 0x02  # Auto

- id: room_eq_state
  label: Room EQ State
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # On
    - 0x02  # Not calculated

- id: dolby_volume_state
  label: Dolby Volume State
  type: enum
  values:
    - 0x00  # Off
    - 0x01  # On

- id: zone1_osd_state
  label: Zone 1 OSD State
  type: enum
  values:
    - 0x00  # On
    - 0x01  # Off

- id: video_output_selection
  label: Video Output Selection
  type: enum
  values:
    - 0x02  # HDMI Output 1
    - 0x03  # HDMI Output 2
    - 0x04  # HDMI Output 1 & 2

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
        - 0x00  # Undefined
        - 0x01  # 4:3
        - 0x02  # 16:9

- id: incoming_audio_format
  label: Incoming Audio Format
  type: object
  fields:
    - name: stream_format
      type: integer
    - name: channel_configuration
      type: integer

- id: incoming_audio_sample_rate
  label: Incoming Audio Sample Rate
  type: enum
  values:
    - 0x00  # 32 KHz
    - 0x01  # 44.1 KHz
    - 0x02  # 48 KHz
    - 0x03  # 88.2 KHz
    - 0x04  # 96 KHz
    - 0x05  # 176.4 KHz
    - 0x06  # 192 KHz
    - 0x07  # Unknown
    - 0x08  # Undetected
```

## Variables
```yaml
# UNRESOLVED: no discrete variable-only parameters identified; all settable parameters are action-parametric
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited status updates on state changes but source does not document event message types
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Factory reset (0x05) requires 0xAA 0xAA confirmation pattern to avoid accidental restore
  - description: Secure backup restore (0x06) requires valid 4-digit PIN
  - description: Reboot (0x26) requires "REBOOT" string confirmation (0x52 0x45 0x42 0x4F 0x4F 0x54)
# UNRESOLVED: power-on sequencing, standby power limits not stated in source
```

## Notes
Dual-zone control. Zone 1 is master; zone 2 is secondary. All commands include zone byte. RC5 IR simulation (0x08) is primary mechanism for many discrete functions (power, source selection, transport control) — direct binary commands exist only for system/config-level ops. Response frames include answer code; 0x00=OK, non-zero=error. AMX DDDP discovery supported on port 50000. Control disabled by default; must be enabled via front panel DIRECT button (4s hold) or OSD menu (A→U→General Setup→Control→On). Reserved command range: 0xF0–0xFF.
<!-- UNRESOLVED: IP address assignment method not documented (DHCP/static) -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: voltage/power specifications not present -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->

## Provenance

```yaml
source_domains:
  - lexicondsp.pl
  - lexicon.com
retrieved_at: 2026-05-04T15:17:03.082Z
last_checked_at: 2026-04-30T09:45:13.542Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:45:13.542Z
matched_actions: 54
action_count: 54
confidence: high
summary: "All 54 spec actions matched to distinct source commands; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
