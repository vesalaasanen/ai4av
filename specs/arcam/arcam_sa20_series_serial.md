---
spec_id: admin/arcam-sa20-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam SA20 Series Control Spec"
manufacturer: Arcam
model_family: "SA20 Series"
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - "SA20 Series"
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
retrieved_at: 2026-04-29T08:49:56.528Z
last_checked_at: 2026-06-02T17:21:20.586Z
generated_at: 2026-06-02T17:21:20.586Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 Series compatibility was asserted by the operator and is not verified against a real device."
  - "source documents no named macro sequences"
  - "no voltage/current/thermal safety procedures documented in source."
  - "source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 (HDA stereo integrated amp) is NOT listed in the source; operator asserted SA20 Series uses this protocol family. Verify against a real SA20 before promoting status from draft."
  - "firmware version range not stated in source."
  - "serial cable polarity uses null-modem wiring per source table; this is a cable-side detail not a transport-side parameter — no spec field."
  - "RC5 code 16-114 (\"Reserved\" in source) is intentionally omitted from Actions to avoid creating an action without a documented function."
  - "advanced RC5 codes section heading present in source but no command table was provided in the refined excerpt; only Basic Functions enumerated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:20.586Z
  matched_actions: 166
  action_count: 166
  confidence: medium
  summary: "All 166 spec actions matched verbatim against source binary Cc commands and RC5 IR code table; transport parameters baud 38400 and port 50000 confirmed in source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Arcam SA20 Series Control Spec

## Summary
Arcam binary RS-232/IP control protocol. Each transmission framed `<St=0x21> <Zn> <Cc> <Dl> <Data...> <Et=0x0D>`. Responses add an answer code byte after Cc. Includes a Simulate-RC5 wrapper (Cc 0x08) that exposes the full RC5 IR code set over serial/IP. Supports two zones: 0x01 master, 0x02 secondary.

<!-- UNRESOLVED: source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 Series compatibility was asserted by the operator and is not verified against a real device. -->

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
  port: 50000  # IP control via port 50000 of unit's IP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from power state query + RC5 Power On/Off commands
- queryable    # inferred from many 0xF0 query commands
- routable     # inferred from video selection (0x0A) + per-source RC5 commands
- levelable    # inferred from volume (0x0D), bass/treble/balance/trim commands
```

## Actions
```yaml
# === Discovery ===
- id: amx_duet_discovery
  label: AMX Duet Discovery Probe
  kind: query
  command: "AMX\\r"
  params: []
  notes: ASCII probe; device replies with "AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=...><Device-Revision=x.y.z>\\r"

# === System (Cc 0x00 - 0x06, 0x08, 0x09) ===
- id: power_status_query
  label: Power Status (Query)
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte
      description: Zone byte 0x01 master / 0x02 secondary

- id: display_brightness_query
  label: Display Brightness (Query)
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []

- id: headphone_status_query
  label: Headphone Connection Status (Query)
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []

- id: fm_genre_query
  label: FM Programme Type (Query)
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: software_version_query
  label: Software Version (Query)
  kind: query
  command: "0x21 0x01 0x04 0x01 {component} 0x0D"
  params:
    - name: component
      type: byte
      description: 0xF0 RS232, 0xF1 Host, 0xF2 OSD, 0xF3 DSP, 0xF4 NET, 0xF5 IAP

- id: restore_factory_defaults
  label: Restore Factory Default Settings
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []
  notes: Confirmation pattern 0xAA 0xAA required

- id: save_restore_secure_backup
  label: Save / Restore Secure Backup
  kind: action
  command: "0x21 0x01 0x06 0x07 {op} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D"
  params:
    - name: op
      type: byte
      description: 0x00 save, 0x01 restore
    - name: pin1
      type: byte
    - name: pin2
      type: byte
    - name: pin3
      type: byte
    - name: pin4
      type: byte

- id: simulate_rc5
  label: Simulate RC5 IR Command (Generic Wrapper)
  kind: action
  command: "0x21 {zone} 0x08 0x02 {sys} {cmd} 0x0D"
  params:
    - name: zone
      type: byte
    - name: sys
      type: byte
      description: RC5 System code
    - name: cmd
      type: byte
      description: RC5 Command code

- id: display_info_type_set
  label: Display Information Type (Set / Cycle / Query)
  kind: action
  command: "0x21 {zone} 0x09 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: byte
    - name: mode
      type: byte
      description: 0x00 Processing, 0xE0 Cycle, 0xF0 Query; source-specific values 0x01-0x05 per FM/DAB/NET/USB

# === Input (Cc 0x0A, 0x0B, 0x0C) ===
- id: video_selection_set
  label: Video Source Selection (Set / Query)
  kind: action
  command: "0x21 0x01 0x0A 0x01 {source} 0x0D"
  params:
    - name: source
      type: byte
      description: 0x00 BD, 0x01 SAT, 0x02 AV, 0x03 PVR, 0x04 VCR, 0x05 Game, 0x06 STB, 0xF0 Query

- id: analogue_digital_select
  label: Analogue/Digital/HDMI Audio Select (Set / Query)
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {audio_type} 0x0D"
  params:
    - name: zone
      type: byte
    - name: audio_type
      type: byte
      description: 0x00 analogue, 0x01 digital, 0x02 HDMI, 0xF0 Query

- id: imax_enhanced_set
  label: IMAX Enhanced Control (Set / Query)
  kind: action
  command: "0x21 {zone} 0x0C 0x01 {state} 0x0D"
  params:
    - name: zone
      type: byte
    - name: state
      type: byte
      description: 0xF0 Query, 0xF1 Auto, 0xF2 On, 0xF3 Off

# === Output / Volume (Cc 0x0D - 0x13) ===
- id: volume_set
  label: Volume Set / Query
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {vol} 0x0D"
  params:
    - name: zone
      type: byte
    - name: vol
      type: byte
      description: 0x00-0x63 (0-99dB), 0xF0 Query

- id: mute_status_query
  label: Mute Status (Query)
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: direct_mode_status_query
  label: Direct Mode Status (Query)
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_2ch_query
  label: Decode Mode 2-channel (Query)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_mch_query
  label: Decode Mode Multi-channel (Query)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: rds_info_query
  label: RDS Information (Query)
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: video_output_resolution_query
  label: Video Output Resolution (Query)
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []

# === Menu / Tuner (Cc 0x14 - 0x1C) ===
- id: menu_status_query
  label: Menu Status (Query)
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []

- id: tuner_preset_set
  label: Tuner Preset Set / Query
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: byte
    - name: preset
      type: byte
      description: 0x01-0x32 (1-50) preset number, 0xF0 Query

- id: tune
  label: Tune (Step Up / Down / Query)
  kind: action
  command: "0x21 {zone} 0x16 0x01 {dir} 0x0D"
  params:
    - name: zone
      type: byte
    - name: dir
      type: byte
      description: 0x00 Down 1 step, 0x01 Up 1 step, 0xF0 Query

- id: dab_station_query
  label: DAB Station (Query)
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: dab_prog_type_query
  label: DAB Programme Type (Query)
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: dls_pdt_info_query
  label: DLS/PDT Info (Query)
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: preset_details_query
  label: Preset Details (Query)
  kind: query
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: byte
    - name: preset
      type: byte
      description: 0x01-0x32 (1-50)

- id: network_playback_status_query
  label: Network Playback Status (Query)
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: current_source_query
  label: Current Source (Query)
  kind: query
  command: "0x21 {zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: headphone_override
  label: Headphone Override (Set)
  kind: action
  command: "0x21 {zone} 0x1F 0x01 {state} 0x0D"
  params:
    - name: zone
      type: byte
    - name: state
      type: byte
      description: 0x00 Clear (speakers muted if HP), 0x01 Set (speakers unmuted if HP)

- id: input_name_set_query
  label: Input Name Set / Query
  kind: action
  command: "0x21 0x01 0x20 {dl} {data} 0x0D"
  params:
    - name: dl
      type: byte
      description: 0x01 for query, length 1-10 for set
    - name: data
      type: bytes
      description: 0xF0 query, or 1-10 ASCII chars

- id: fm_scan
  label: FM Scan Up / Down
  kind: action
  command: "0x21 0x01 0x23 0x01 {dir} 0x0D"
  params:
    - name: dir
      type: byte
      description: 0x01 Scan up, 0x02 Scan down

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []

- id: heartbeat
  label: Heartbeat
  kind: query
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []
  notes: Resets EuP standby timer

- id: reboot
  label: Reboot
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
  notes: ASCII "REBOOT" payload required

# === Setup Adjustment (Cc 0x35 - 0x4F) ===
- id: treble_eq_set
  label: Treble Equalisation (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x35 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x0C (0 to +12dB), 0x81-0x8C (-1 to -12dB), 0xF0 Q, 0xF1 +1, 0xF2 -1

- id: bass_eq_set
  label: Bass Equalisation (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x36 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x0C (0 to +12dB), 0x81-0x8C (-1 to -12dB), 0xF0 Q, 0xF1 +1, 0xF2 -1

- id: room_eq_set
  label: Room Equalisation (On / Off / Query)
  kind: action
  command: "0x21 {zone} 0x37 0x01 {state} 0x0D"
  params:
    - name: zone
      type: byte
    - name: state
      type: byte
      description: 0xF0 Query, 0xF1 On, 0xF2 Off

- id: dolby_volume_set
  label: Dolby Volume (Set / Query)
  kind: action
  command: "0x21 {zone} 0x38 0x01 {state} 0x0D"
  params:
    - name: zone
      type: byte
    - name: state
      type: byte
      description: 0x00 Off, 0x01 On, 0xF0 Query

- id: dolby_leveller_set
  label: Dolby Leveller (Set / Inc / Dec / Off / Query)
  kind: action
  command: "0x21 {zone} 0x39 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x0A (0-10), 0xF0 Q, 0xF1 +1, 0xF2 -1, 0xFF Off

- id: dolby_vol_calib_offset
  label: Dolby Volume Calibration Offset (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x3A 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x0F (0-15dB), 0x80-0x8F (-1 to -15dB), 0xF0 Q, 0xF1 +1, 0xF2 -1

- id: balance_set
  label: Balance (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x3B 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x06 (0 to +6), 0x81-0x86 (-1 to -6), 0xF0 Q, 0xF1 +1, 0xF2 -1

- id: subwoofer_trim_set
  label: Subwoofer Trim (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x3F 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x14 (0 to +10dB in 0.5dB), 0x81-0x94 (neg), 0xF0 Q, 0xF1 +0.5, 0xF2 -0.5

- id: lipsync_delay_set
  label: Lipsync Delay (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 {zone} 0x40 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00-0x32 (0-250ms in 5ms steps), 0xF0 Q, 0xF1 +5ms, 0xF2 -5ms

- id: compression_set
  label: Dynamic Range Compression (Set / Query)
  kind: action
  command: "0x21 {zone} 0x41 0x01 {val} 0x0D"
  params:
    - name: zone
      type: byte
    - name: val
      type: byte
      description: 0x00 Off, 0x01 Medium, 0x02 High, 0xF0 Query

- id: incoming_video_params_query
  label: Incoming Video Parameters (Query)
  kind: query
  command: "0x21 {zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: incoming_audio_format_query
  label: Incoming Audio Format (Query)
  kind: query
  command: "0x21 {zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: byte

- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate (Query)
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  params: []

- id: sub_stereo_trim_set
  label: Sub Stereo Trim (Set / Inc / Dec / Query)
  kind: action
  command: "0x21 0x01 0x45 0x01 {val} 0x0D"
  params:
    - name: val
      type: byte
      description: 0x00 (0dB), 0x81-0x94 (-0.5 to -10dB in 0.5dB steps), 0xF0 Q, 0xF1 +0.5, 0xF2 -0.5

- id: zone1_osd_set
  label: Zone 1 OSD On / Off / Query
  kind: action
  command: "0x21 0x01 0x4E 0x01 {state} 0x0D"
  params:
    - name: state
      type: byte
      description: 0xF0 Query, 0xF1 On, 0xF2 Off

- id: video_output_switching_set
  label: HDMI Video Output Switching (Set / Query)
  kind: action
  command: "0x21 0x01 0x4F 0x01 {out} 0x0D"
  params:
    - name: out
      type: byte
      description: 0x02 HDMI1, 0x03 HDMI2, 0x04 HDMI1&2, 0xF0 Query

# === RC5 IR codes (Basic Functions table) - each row is a distinct command per source ===
# All transmitted via Cc 0x08; payload = 0x21 {zone} 0x08 0x02 0x10 <code> 0x0D for system 16,
# or 0x21 {zone} 0x08 0x02 0x17 <code> 0x0D for system 23 (Zone 2 controls).

- id: rc5_standby
  label: RC5 Standby
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_0
  label: RC5 Digit 0
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x00 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_1
  label: RC5 Digit 1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x01 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_2
  label: RC5 Digit 2
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x02 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_3
  label: RC5 Digit 3
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x03 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_4
  label: RC5 Digit 4
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x04 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_5
  label: RC5 Digit 5
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x05 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_6
  label: RC5 Digit 6
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x06 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_7
  label: RC5 Digit 7
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x07 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_8
  label: RC5 Digit 8
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x08 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_digit_9
  label: RC5 Digit 9
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x09 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_access_lipsync_delay
  label: RC5 Access Lipsync Delay Control
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x32 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_cycle_vfd_panels
  label: RC5 Cycle VFD Information Panels
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x37 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_rewind
  label: RC5 Rewind
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x79 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_fast_forward
  label: RC5 Fast Forward
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x34 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_skip_back
  label: RC5 Skip Back
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x21 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_skip_forward
  label: RC5 Skip Forward
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_stop
  label: RC5 Stop
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x36 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_play
  label: RC5 Play
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x35 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_pause
  label: RC5 Pause
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x30 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_disc_record_enter_trim
  label: RC5 Disc (Record) / Enter Trim Menu
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_menu
  label: RC5 MENU (Enter System Menu)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x52 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_nav_up
  label: RC5 Navigate Up
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x56 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_pop_up_dolby_vol
  label: RC5 Pop Up (Dolby Volume on/off)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x46 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_nav_left
  label: RC5 Navigate Left
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x51 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_ok
  label: RC5 OK
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x57 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_nav_right
  label: RC5 Navigate Right
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x50 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_audio_room_eq
  label: RC5 Audio (Room EQ on/off)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x1E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_nav_down
  label: RC5 Navigate Down
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x55 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_rtn_sub_trim
  label: RC5 RTN (Access Subwoofer Trim)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x33 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_home
  label: RC5 HOME
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_mute
  label: RC5 Mute (Toggle)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0D 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_volume_up
  label: RC5 Increase Volume (+)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x10 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_mode_cycle_decode
  label: RC5 MODE (Cycle Decoding Modes)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x20 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_disp_brightness
  label: RC5 DISP (Change VFD Brightness)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x3B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_activate_direct
  label: RC5 Activate DIRECT Mode
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_volume_down
  label: RC5 Decrease Volume (-)
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x11 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_red
  label: RC5 Red
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x29 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_green
  label: RC5 Green
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_yellow
  label: RC5 Yellow
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_blue
  label: RC5 Blue
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x37 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_radio
  label: RC5 Source Radio
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_aux
  label: RC5 Source Aux
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x63 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_net
  label: RC5 Source Net
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_usb
  label: RC5 Source USB
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5D 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_av
  label: RC5 Source AV
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_sat
  label: RC5 Source Sat
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x1B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_pvr
  label: RC5 Source PVR
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x60 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_game
  label: RC5 Source Game
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x61 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_bd
  label: RC5 Source BD
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x62 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_cd
  label: RC5 Source CD
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x76 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_stb
  label: RC5 Source STB
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x64 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_vcr
  label: RC5 Source VCR
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x77 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_select_display
  label: RC5 Source Display
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x3A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_power_on
  label: RC5 Power On
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x7B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_power_off
  label: RC5 Power Off
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x7C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_next_zone
  label: RC5 Change Control To Next Zone
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x5F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_cycle_output_resolutions
  label: RC5 Cycle Output Resolutions
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_access_bass
  label: RC5 Access Bass Control
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x27 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_access_speaker_trim
  label: RC5 Access Speaker Trim Controls
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x25 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_access_treble
  label: RC5 Access Treble Control
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_random
  label: RC5 Random
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x4C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_repeat
  label: RC5 Repeat
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x31 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_direct_on
  label: RC5 Direct Mode On
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x4E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_direct_off
  label: RC5 Direct Mode Off
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x4F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_multi_channel
  label: RC5 Multi Channel
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x6A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_stereo
  label: RC5 Stereo
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x6B 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_dolby_surround
  label: RC5 Dolby Surround
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x6E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_neo6_cinema
  label: RC5 DTS Neo:6 Cinema
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x6F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_neo6_music
  label: RC5 DTS Neo:6 Music
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x70 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_neural_x
  label: RC5 DTS Neural:X
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x71 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_virtual_x
  label: RC5 DTS Virtual:X
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x73 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_57_ch_stereo
  label: RC5 5/7 Ch Stereo
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x45 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_dolby_d_ex
  label: RC5 Dolby D EX
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x17 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_mute_on
  label: RC5 Mute On
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x1A 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_mute_off
  label: RC5 Mute Off
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x78 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_tuner_fm
  label: RC5 Tuner FM
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x1C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_tuner_dab
  label: RC5 Tuner DAB
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x48 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_lipsync_plus_5ms
  label: RC5 Lipsync +5ms
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x0F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_lipsync_minus_5ms
  label: RC5 Lipsync -5ms
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x65 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_subtrim_plus
  label: RC5 Sub Trim +0.5dB
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x69 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_subtrim_minus
  label: RC5 Sub Trim -0.5dB
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x6C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_display_off
  label: RC5 Display Off
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x1F 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_display_l1
  label: RC5 Display L1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x22 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_display_l2
  label: RC5 Display L2
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x23 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_balance_left
  label: RC5 Balance Left
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x26 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_balance_right
  label: RC5 Balance Right
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x28 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_bass_plus_1
  label: RC5 Bass +1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2C 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_bass_minus_1
  label: RC5 Bass -1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2D 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_treble_plus_1
  label: RC5 Treble +1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x2E 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_treble_minus_1
  label: RC5 Treble -1
  kind: action
  command: "0x21 {zone} 0x08 0x02 0x10 0x66 0x0D"
  params:
    - name: zone
      type: byte

- id: rc5_zone2_follow_zone1
  label: RC5 Set Zone 2 To Follow Zone 1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x14 0x0D"
  params: []

# === Zone 2 RC5 (system 23 / 0x17) ===
- id: rc5_zone2_power_on
  label: RC5 Zone 2 Power On
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7B 0x0D"
  params: []

- id: rc5_zone2_power_off
  label: RC5 Zone 2 Power Off
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7C 0x0D"
  params: []

- id: rc5_zone2_vol_up
  label: RC5 Zone 2 Volume +
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x01 0x0D"
  params: []

- id: rc5_zone2_vol_down
  label: RC5 Zone 2 Volume -
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x02 0x0D"
  params: []

- id: rc5_zone2_mute_toggle
  label: RC5 Zone 2 Mute (Toggle)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x03 0x0D"
  params: []

- id: rc5_zone2_mute_on
  label: RC5 Zone 2 Mute On
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x04 0x0D"
  params: []

- id: rc5_zone2_mute_off
  label: RC5 Zone 2 Mute Off
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x05 0x0D"
  params: []

- id: rc5_zone2_cd
  label: RC5 Zone 2 Source CD
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x06 0x0D"
  params: []

- id: rc5_zone2_bd
  label: RC5 Zone 2 Source BD
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x07 0x0D"
  params: []

- id: rc5_zone2_stb
  label: RC5 Zone 2 Source STB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x08 0x0D"
  params: []

- id: rc5_zone2_av
  label: RC5 Zone 2 Source AV
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x09 0x0D"
  params: []

- id: rc5_zone2_game
  label: RC5 Zone 2 Source Game
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0B 0x0D"
  params: []

- id: rc5_zone2_aux
  label: RC5 Zone 2 Source Aux
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0D 0x0D"
  params: []

- id: rc5_zone2_pvr
  label: RC5 Zone 2 Source PVR
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0F 0x0D"
  params: []

- id: rc5_zone2_fm
  label: RC5 Zone 2 Source FM
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0E 0x0D"
  params: []

- id: rc5_zone2_dab
  label: RC5 Zone 2 Source DAB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x10 0x0D"
  params: []

- id: rc5_zone2_usb
  label: RC5 Zone 2 Source USB
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x12 0x0D"
  params: []

- id: rc5_zone2_net
  label: RC5 Zone 2 Source NET
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x13 0x0D"
  params: []

- id: rc5_zone2_sat
  label: RC5 Zone 2 Source SAT
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x14 0x0D"
  params: []

- id: rc5_zone2_vcr
  label: RC5 Zone 2 Source VCR
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x15 0x0D"
  params: []

- id: rc5_select_hdmi_out_1
  label: RC5 Select HDMI Out 1
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x49 0x0D"
  params: []

- id: rc5_select_hdmi_out_2
  label: RC5 Select HDMI Out 2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4A 0x0D"
  params: []

- id: rc5_select_hdmi_out_1_and_2
  label: RC5 Select HDMI Out 1 & 2
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4B 0x0D"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [stand_by, on]
  source: response_to_cc_0x00       # 0x00 stand-by, 0x01 powered on

- id: display_brightness
  type: enum
  values: [off, l1, l2]
  source: response_to_cc_0x01

- id: headphone_connected
  type: enum
  values: [not_connected, connected]
  source: response_to_cc_0x02

- id: fm_programme_type
  type: string
  source: response_to_cc_0x03

- id: software_version
  type: struct
  fields: [component_echo, major, minor]
  source: response_to_cc_0x04

- id: rc5_echo
  type: struct
  fields: [system_code, command_code]
  source: response_to_cc_0x08

- id: display_info_type
  type: byte
  source: response_to_cc_0x09

- id: video_source
  type: enum
  values: [bd, sat, av, pvr, vcr, game, stb]
  source: response_to_cc_0x0A

- id: audio_input_type
  type: enum
  values: [analogue, digital, hdmi]
  source: response_to_cc_0x0B

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  source: response_to_cc_0x0C

- id: zone_volume
  type: integer
  range: [0, 99]
  source: response_to_cc_0x0D

- id: mute_state
  type: enum
  values: [muted, unmuted]
  source: response_to_cc_0x0E

- id: direct_mode
  type: enum
  values: [off, on]
  source: response_to_cc_0x0F

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, multi_ch_stereo, dts_neural_x, dts_virtual_x]
  source: response_to_cc_0x10

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multi_channel, dts_es_neural_x, dolby_surround, dts_virtual_x]
  source: response_to_cc_0x11

- id: rds_information
  type: string
  source: response_to_cc_0x12

- id: video_output_resolution
  type: enum
  values: [sd_progressive, "720p", "1080i", "1080p", preferred, bypass, "4k"]
  source: response_to_cc_0x13

- id: menu_open
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  source: response_to_cc_0x14

- id: current_tuner_preset
  type: integer
  range: [1, 50]
  source: response_to_cc_0x15

- id: tuner_frequency
  type: struct
  fields: [mhz, kHz_10s]
  source: response_to_cc_0x16

- id: dab_station_name
  type: string
  length: 16
  source: response_to_cc_0x18

- id: dab_programme_type
  type: string
  length: 16
  source: response_to_cc_0x19

- id: dls_pdt_text
  type: string
  length: 128
  source: response_to_cc_0x1A

- id: preset_details
  type: struct
  fields: [number, kind, mhz, kHz_10s, name_ascii]
  source: response_to_cc_0x1B

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  source: response_to_cc_0x1C

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  source: response_to_cc_0x1D

- id: headphone_override_state
  type: byte
  source: response_to_cc_0x1F

- id: input_name
  type: string
  source: response_to_cc_0x20

- id: scan_state
  type: byte
  source: response_to_cc_0x23_or_0x24   # 0xFF = scanning

- id: heartbeat_ack
  type: byte
  source: response_to_cc_0x25

- id: treble_value
  type: byte_signed
  range: [-12, 12]
  source: response_to_cc_0x35

- id: bass_value
  type: byte_signed
  range: [-12, 12]
  source: response_to_cc_0x36

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated_off]
  source: response_to_cc_0x37

- id: dolby_volume_state
  type: enum
  values: [off, on]
  source: response_to_cc_0x38

- id: dolby_leveller_value
  type: byte
  range: [0, 10]
  source: response_to_cc_0x39

- id: dolby_volume_calib_offset
  type: byte_signed
  range: [-15, 15]
  source: response_to_cc_0x3A

- id: balance_value
  type: byte_signed
  range: [-6, 6]
  source: response_to_cc_0x3B

- id: subwoofer_trim_value
  type: byte_signed_half_db
  range_steps_db: 0.5
  source: response_to_cc_0x3F

- id: lipsync_delay_value
  type: integer
  unit: ms
  step: 5
  range: [0, 250]
  source: response_to_cc_0x40

- id: compression_state
  type: enum
  values: [off, medium, high]
  source: response_to_cc_0x41

- id: incoming_video_params
  type: struct
  fields: [h_res, v_res, refresh_hz, interlaced, aspect_ratio]
  source: response_to_cc_0x42

- id: incoming_audio_format
  type: struct
  fields: [stream_format, channel_config]
  source: response_to_cc_0x43

- id: incoming_audio_sample_rate
  type: enum
  values: ["32k", "44.1k", "48k", "88.2k", "96k", "176.4k", "192k", unknown, undetected]
  source: response_to_cc_0x44

- id: sub_stereo_trim_value
  type: byte_signed_half_db
  source: response_to_cc_0x45

- id: zone1_osd_state
  type: enum
  values: [on, off]
  source: response_to_cc_0x4E

- id: video_output_switch
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  source: response_to_cc_0x4F

- id: answer_code
  type: enum
  values:
    - status_update          # 0x00
    - zone_invalid           # 0x82
    - command_not_recognised # 0x83
    - parameter_not_recognised # 0x84
    - command_invalid_at_this_time # 0x85
    - invalid_data_length    # 0x86
  source: response_byte_Ac
```

## Variables
```yaml
- name: volume
  type: integer
  range: [0, 99]
  unit: dB
  cc: 0x0D
- name: treble
  type: integer
  range: [-12, 12]
  unit: dB
  cc: 0x35
- name: bass
  type: integer
  range: [-12, 12]
  unit: dB
  cc: 0x36
- name: dolby_leveller
  type: integer
  range: [0, 10]
  cc: 0x39
- name: dolby_volume_calib_offset
  type: integer
  range: [-15, 15]
  unit: dB
  cc: 0x3A
- name: balance
  type: integer
  range: [-6, 6]
  cc: 0x3B
- name: subwoofer_trim
  type: float
  range: [-10.0, 10.0]
  step: 0.5
  unit: dB
  cc: 0x3F
- name: lipsync_delay
  type: integer
  range: [0, 250]
  step: 5
  unit: ms
  cc: 0x40
- name: sub_stereo_trim
  type: float
  range: [-10.0, 0.0]
  step: 0.5
  unit: dB
  cc: 0x45
- name: input_name
  type: string
  max_length: 10
  cc: 0x20
- name: tuner_preset
  type: integer
  range: [1, 50]
  cc: 0x15
```

## Events
```yaml
# The source states: state changes from front panel buttons or IR remote produce
# the same response message type as an explicit command, sent unsolicited.
- id: state_change_broadcast
  type: any_command_response
  trigger: front_panel_or_ir_input
  notes: Same frame layout as a normal response; Cc identifies which state changed
```

## Macros
```yaml
# UNRESOLVED: source documents no named macro sequences
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults     # source: 0xAA 0xAA confirmation pattern (Cc 0x05)
  - save_restore_secure_backup   # source: 0x55 0x55 + 4-digit PIN (Cc 0x06)
  - reboot                       # source: ASCII "REBOOT" required (Cc 0x26)
interlocks:
  - tuner_commands_require_tuner_source       # source: 0x85 returned if FM/DAB not selected (Cc 0x03, 0x12, 0x15, 0x16, 0x18, 0x19, 0x1A)
  - network_commands_require_network_source   # source: 0x85 returned if NET not selected (Cc 0x1C)
  - setup_menu_blocks_some_commands           # source: 0x85 returned during setup menu (Cc 0x0A, 0x0B)
# UNRESOLVED: no voltage/current/thermal safety procedures documented in source.
```

## Notes
- Reserved command codes 0xF0–0xFF are for test functions and must not be used.
- Commands 0xF0 in the Data field generally mean "Query" rather than a payload value.
- Answer code 0x85 ("Command invalid at this time") is overloaded: setup-menu blocking, wrong source selected for tuner/network commands, and contention with command 0x1E during save/restore (Cc 0x06).
- Two zones supported: 0x01 (master / zone-less default) and 0x02 (secondary). Zone-2 RC5 codes use system byte 0x17 instead of 0x10.
- Device responds within 3 seconds; RC may pipeline commands.
- AMX Duet DDDP probe `AMX\r` returns `AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=...><Device-Revision=x.y.z>\r` — useful for discovery and version sniffing.
- RS232 must be enabled before use: front panel DIRECT held 4s until "RS232 CONTROL ON" displays, or OSD General Setup → Control → On.
- IP control reaches the same protocol via TCP port 50000.

<!-- UNRESOLVED: source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 (HDA stereo integrated amp) is NOT listed in the source; operator asserted SA20 Series uses this protocol family. Verify against a real SA20 before promoting status from draft. -->
<!-- UNRESOLVED: firmware version range not stated in source. -->
<!-- UNRESOLVED: serial cable polarity uses null-modem wiring per source table; this is a cable-side detail not a transport-side parameter — no spec field. -->
<!-- UNRESOLVED: RC5 code 16-114 ("Reserved" in source) is intentionally omitted from Actions to avoid creating an action without a documented function. -->
<!-- UNRESOLVED: advanced RC5 codes section heading present in source but no command table was provided in the refined excerpt; only Basic Functions enumerated. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:56.528Z
last_checked_at: 2026-06-02T17:21:20.586Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:20.586Z
matched_actions: 166
action_count: 166
confidence: medium
summary: "All 166 spec actions matched verbatim against source binary Cc commands and RC5 IR code table; transport parameters baud 38400 and port 50000 confirmed in source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 Series compatibility was asserted by the operator and is not verified against a real device."
- "source documents no named macro sequences"
- "no voltage/current/thermal safety procedures documented in source."
- "source document explicitly enumerates AVR390/AVR550/AVR850/AV860/SR250. SA20 (HDA stereo integrated amp) is NOT listed in the source; operator asserted SA20 Series uses this protocol family. Verify against a real SA20 before promoting status from draft."
- "firmware version range not stated in source."
- "serial cable polarity uses null-modem wiring per source table; this is a cable-side detail not a transport-side parameter — no spec field."
- "RC5 code 16-114 (\"Reserved\" in source) is intentionally omitted from Actions to avoid creating an action without a documented function."
- "advanced RC5 codes section heading present in source but no command table was provided in the refined excerpt; only Basic Functions enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
