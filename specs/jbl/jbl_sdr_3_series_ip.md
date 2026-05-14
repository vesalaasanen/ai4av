---
spec_id: admin/jbl-sdr-3-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBL SDR-3 Series Control Spec"
manufacturer: JBL
model_family: SDR-35
aliases: []
compatible_with:
  manufacturers:
    - JBL
  models:
    - SDR-35
    - SDR-38
    - SDP-55
    - SDP-58
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw51dc9ad1/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-04T15:16:58.823Z
last_checked_at: 2026-04-30T09:43:25.819Z
generated_at: 2026-04-30T09:43:25.819Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:43:25.819Z
  matched_actions: 62
  action_count: 62
  confidence: high
  summary: "All 62 spec actions match source command opcodes; all transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# JBL SDR-3 Series Control Spec

## Summary
AV receiver with both RS-232 and IP control interfaces. IP control uses port 50000. RS-232 uses 38,400bps 8N1. Supports dual-zone operation (Zone 1 master, Zone 2). AMX Duet and Control 4 SDDP discovery protocols supported. Binary protocol with 0x21 start byte, zone number, command code, answer code, data length, data, and 0x0D terminator.

<!-- UNRESOLVED: complete command set not catalogued; many RC5 IR codes exist but only native protocol commands documented here -->

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
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: power
  label: Power
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (1 or 2)
    - name: state
      type: integer
      description: "0x00 = standby request, 0xF0 = query power state"
  command_bytes: [0x21, zn, 0x00, 0x01, data, 0x0D]
  response_bytes: [0x21, zn, 0x00, ac, 0x01, data, 0x0D]
  data_notes: "Data: 0x00=standby, 0x01=powered on; ac answer codes: 0x00=ok, 0x82=zone invalid, 0x85=invalid at this time"

- id: display_brightness
  label: Display Brightness
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=request; 0x00=off, 0x01=L1, 0x02=L2"
  command_bytes: [0x21, zn, 0x01, 0x01, data, 0x0D]

- id: headphones
  label: Headphone Status
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=request status"
  command_bytes: [0x21, zn, 0x02, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=not connected, 0x01=connected"

- id: fm_genre
  label: FM Genre
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=request program type"
  command_bytes: [0x21, zn, 0x03, 0x01, 0xF0, 0x0D]
  response_notes: "Returns ASCII program type string; error 0x85 if not FM source"

- id: software_version
  label: Software Version
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: integer
      description: "0xF0=RS232 version, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"
  command_bytes: [0x21, zn, 0x04, 0x01, data, 0x0D]

- id: factory_default
  label: Restore Factory Defaults
  kind: action
  params:
    - name: zone
      type: integer
  notes: "Requires 0xAA 0xAA confirmation pattern"
  command_bytes: [0x21, zn, 0x05, 0x02, 0xAA, 0xAA, 0x0D]

- id: secure_backup
  label: Save/Restore Secure Backup
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0x00=save, 0x01=restore"
    - name: pin
      type: string
      description: "4-digit PIN in hex"
  command_bytes: [0x21, zn, 0x06, 0x07, op, 0x55, 0x55, pin1, pin2, pin3, pin4, 0x0D]

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
  command_bytes: [0x21, zn, 0x08, 0x02, sys, cmd, 0x0D]

- id: display_info
  label: Display Information Type
  kind: action
  params:
    - name: zone
      type: integer
    - name: info_type
      type: integer
      description: "0x00=Processing, 0xE0=cycle all, 0xF0=request; FM: 0x01=Radio text, 0x02=Program type, 0x03=Signal strength; DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate; NET: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=audio type, 0x05=rate"
  command_bytes: [0x21, zn, 0x09, 0x01, data, 0x0D]

- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=request, 0xF1=Auto, 0xF2=On, 0xF3=Off"
  command_bytes: [0x21, zn, 0x0C, 0x01, data, 0x0D]
  response_data_notes: "0x00=Off, 0x01=On, 0x02=Auto"

- id: select_audio_input
  label: Select Analog/Digital Audio Input
  kind: action
  params:
    - name: zone
      type: integer
    - name: input_type
      type: integer
      description: "0x00=analog, 0x01=digital, 0x02=HDMI, 0xF0=request"
  command_bytes: [0x21, zn, 0x0B, 0x01, data, 0x0D]
  response_data_notes: "0x00=analog, 0x01=digital, 0x02=HDMI; error 0x85 if OSD showing setup"

- id: volume
  label: Volume
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: "0x00-0x63 (0-99), 0xF0=request"
  command_bytes: [0x21, zn, 0x0D, 0x01, data, 0x0D]

- id: mute_status
  label: Mute Status
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x0E, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=muted, 0x01=not muted"

- id: direct_mode
  label: Direct Mode Status
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x0F, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=off, 0x01=on"

- id: decode_mode_2ch
  label: Decode Mode 2-Channel
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x10, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7ch Stereo, 0x0A=DTS Neural:X, 0x0C=DTS Virtual:X, 0x0D=Dolby Virtual Height, 0x0E=Auro Native, 0x0F=Auro-Matic 3D, 0x10=Auro-2D"

- id: decode_mode_mch
  label: Decode Mode Multi-Channel
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x11, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X, 0x0D=Dolby Virtual Height, 0x0E=Auro Native, 0x0F=Auro-Matic 3D, 0x10=Auro-2D"

- id: rds_information
  label: RDS Information
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x12, 0x01, 0xF0, 0x0D]
  response_notes: "Returns ASCII string; error 0x85 if not FM source"

- id: video_output_resolution
  label: Video Output Resolution
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x13, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x07=bypass"

- id: menu_status
  label: Menu Status
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x14, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=none, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

- id: tuner_preset
  label: Tuner Preset
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) to select, 0xF0=request current"
  command_bytes: [0x21, zn, 0x15, 0x01, data, 0x0D]
  response_notes: "0xFF=no preset; error 0x85 if tuner not selected"

- id: tune
  label: Tune FM Frequency
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: "0x00=decrement, 0x01=increment, 0xF0=request"
  command_bytes: [0x21, zn, 0x16, 0x01, data, 0x0D]
  notes: "0.05MHz steps; error 0x85 if tuner not selected"

- id: dab_station
  label: DAB Station
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x18, 0x01, 0xF0, 0x0D]
  response_notes: "16-byte ASCII padded; error 0x85 if DAB not selected"

- id: dab_genre
  label: DAB Program Type/Genre
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x19, 0x01, 0xF0, 0x0D]
  response_notes: "16-byte ASCII padded; error 0x85 if DAB not selected"

- id: dls_pdt
  label: DLS/PDT Information
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x1A, 0x01, 0xF0, 0x0D]
  response_notes: "128-byte ASCII padded; error 0x85 if DAB not selected"

- id: preset_details
  label: Preset Details
  kind: action
  params:
    - name: zone
      type: integer
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50)"
  command_bytes: [0x21, zn, 0x1B, 0x01, preset, 0x0D]
  response_notes: "Returns preset number, source type (FM/DAB), frequency, name"

- id: network_playback_status
  label: Network Playback Status
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x1C, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=Stopped, 0x01=Transitioning, 0x02=Playing, 0x03=Paused; error 0x85 if NET not selected"

- id: current_source
  label: Current Source
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x1D, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=UHD, 0x08=AUX, 0x09=Display, 0x0B=Tuner FM, 0x0C=Tuner DAB, 0x0E=NET, 0x10=STB, 0x11=GAME, 0x12=BT"

- id: headphone_override
  label: Headphone Override
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0x00=clear (mute speakers if headphones present), 0x01=set (unmute speakers if headphones present)"
  command_bytes: [0x21, zn, 0x1F, 0x01, data, 0x0D]

- id: input_name
  label: Input Name Get/Set
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=query, otherwise ASCII name (max 10 chars)"
  command_bytes: "[0x21, zn, 0x20, dl, data..., 0x0D]"

- id: fm_scan
  label: FM Scan
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: "0x01=scan up, 0x02=scan down"
  command_bytes: [0x21, zn, 0x23, 0x01, data, 0x0D]
  response_data_notes: "0xFF=scanning; error 0x85 if not FM source"

- id: dab_scan
  label: DAB Scan
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x24, 0x01, 0xF0, 0x0D]
  response_data_notes: "0xFF=scanning, 0x00=done; error 0x85 if not DAB source"

- id: heartbeat
  label: Heartbeat
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x25, 0x01, 0xF0, 0x0D]
  notes: "Resets EuP standby timer"

- id: reboot
  label: Reboot
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: "[0x21, zn, 0x26, 0x06, 'R','E','B','O','O','T', 0x0D]"

- id: setup
  label: Setup Mode
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x27, 0x01, 0xF0, 0x0D]
  response_data_notes: "0xFF=front panel setup, remote not possible"

- id: treble_eq
  label: Treble Equalization
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C=0dB to +12dB, 0x81-0x8C=-1dB to -12dB, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x35, 0x01, data, 0x0D]

- id: bass_eq
  label: Bass Equalization
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x0C=0dB to +12dB, 0x81-0x8C=-1dB to -12dB, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x36, 0x01, data, 0x0D]

- id: room_eq
  label: Room EQ
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0xF0=request, 0x00=off, 0x01=EQ1, 0x02=EQ2, 0x03=EQ3"
  command_bytes: [0x21, zn, 0x37, 0x01, data, 0x0D]
  response_data_notes: "0x04=EQ not calculated"

- id: dolby_audio
  label: Dolby Audio Mode
  kind: action
  params:
    - name: zone
      type: integer
    - name: mode
      type: integer
      description: "0x00=off, 0x01=movie, 0x02=music, 0x03=night, 0xF0=request"
  command_bytes: [0x21, zn, 0x38, 0x01, data, 0x0D]

- id: balance
  label: Balance
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x06=0 to +6, 0x81-0x86=-1 to -6, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x3B, 0x01, data, 0x0D]

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x14=positive trim in 0.5dB steps, 0x81-0x94=negative trim, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x3F, 0x01, data, 0x0D]

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00-0x32=delay in 5ms steps, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x40, 0x01, data, 0x0D]

- id: compression
  label: Compression
  kind: action
  params:
    - name: zone
      type: integer
    - name: level
      type: integer
      description: "0x00=off, 0x01=medium, 0x02=high, 0xF0=request"
  command_bytes: [0x21, zn, 0x41, 0x01, data, 0x0D]

- id: incoming_video_params
  label: Incoming Video Parameters
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x42, 0x01, 0xF0, 0x0D]
  response_notes: "8 bytes: H res MSB/LSB, V res MSB/LSB, refresh rate, interlaced flag (0x00=progressive, 0x01=interlaced), aspect ratio (0x00=undefined, 0x01=4:3, 0x02=16:9), color space (0x00=normal, 0x01=HDR10, 0x02=Dolby Vision, 0x03=HLG, 0x04=HDR10+)"

- id: incoming_audio_format
  label: Incoming Audio Format
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x43, 0x01, 0xF0, 0x0D]
  response_notes: "2 bytes: format code and channel config code; see source for full enum"

- id: incoming_audio_sample_rate
  label: Incoming Audio Sample Rate
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x44, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected"

- id: sub_stereo_trim
  label: Subwoofer Stereo Trim
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0x00=0dB, 0x81-0x94=negative trim in 0.5dB steps, 0xF0=request, 0xF1=inc, 0xF2=dec"
  command_bytes: [0x21, zn, 0x45, 0x01, data, 0x0D]

- id: osd_zone1
  label: Zone 1 OSD On/Off
  kind: action
  params:
    - name: zone
      type: integer
    - name: state
      type: integer
      description: "0xF0=request, 0xF1=On, 0xF2=Off"
  command_bytes: [0x21, zn, 0x4E, 0x01, data, 0x0D]
  response_data_notes: "0x00=OSD On, 0x01=OSD Off"

- id: hdmi_video_output
  label: HDMI Video Output Selection
  kind: action
  params:
    - name: zone
      type: integer
    - name: output
      type: integer
      description: "0x02=Output 1, 0x03=Output 2, 0x04=Both, 0xF0=request"
  command_bytes: [0x21, zn, 0x4F, 0x01, data, 0x0D]

- id: bt_status
  label: Bluetooth Status
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x50, 0x01, 0xF0, 0x0D]
  response_data_notes: "0x00=No connection, 0x01=Connected paused, 0x02=Playing SBC, 0x03=Playing AAC, 0x04=Playing aptX, 0x05=Playing aptX-HD; error 0x85 if BT not selected"

- id: now_playing
  label: Now Playing Information
  kind: action
  params:
    - name: zone
      type: integer
    - name: info_type
      type: integer
      description: "0xF0=track title, 0xF1=artist, 0xF2=album, 0xF3=application (GoogleCast), 0xF4=sample rate, 0xF5=track encoder"
  command_bytes: [0x21, zn, 0x64, 0x01, data, 0x0D]
  response_notes: "Max 100 chars; sample rate codes: 0x00-0x06=kHz values, 0x07=Unknown, 0x08=Undetected; encoder: 0x00=MP3, 0x01=WAV, 0x02=WMA, 0x03=FLAC, 0x04=ALAC, 0x05=MQA, 0x0A=Unknown"

- id: room_eq_names
  label: Room EQ Names
  kind: action
  params:
    - name: zone
      type: integer
  command_bytes: [0x21, zn, 0x34, 0x01, 0xF0, 0x0D]
  response_notes: "Returns up to 60 bytes: 20 chars per EQ slot"

- id: input_config
  label: Input Configuration
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 25-byte config block"
  command_bytes: "[0x21, zn, 0x28, dl, data..., 0x0D]"
  response_notes: "25-byte block including input name, lip sync, mode, MCH mode, bass, treble, room EQ, input trim, dolby audio, stereo mode, sub stereo, IMAX, Auro-Matic, audio source"

- id: general_setup
  label: General Setup
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 32-byte config block"
  command_bytes: "[0x21, zn, 0x29, dl, data..., 0x0D]"
  response_notes: "32-byte block; see source for full parameter enum"

- id: speaker_types
  label: Speaker Types
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 13-byte config block"
  command_bytes: "[0x21, zn, 0x2A, dl, data..., 0x0D]"

- id: speaker_distances
  label: Speaker Distances
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 33-byte config block"
  command_bytes: "[0x21, zn, 0x2B, dl, data..., 0x0D]"
  response_notes: "Units byte + 2 bytes per speaker (16 speakers)"

- id: speaker_levels
  label: Speaker Levels
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 18-byte config block"
  command_bytes: "[0x21, zn, 0x2C, dl, data..., 0x0D]"
  response_notes: "Test tone source + 16 speaker levels + noise output channel"

- id: video_inputs
  label: Video Inputs Configuration
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 6-byte config block"
  command_bytes: "[0x21, zn, 0x2D, dl, data..., 0x0D]"

- id: hdmi_settings
  label: HDMI Settings
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 10-byte config block"
  command_bytes: "[0x21, zn, 0x2E, dl, data..., 0x0D]"
  response_notes: "10-byte block: OSD, output select, lip sync info, HDMI audio to TV, HDMI bypass, bypass source, CEC, ARC, TV audio, power off control"

- id: zone_settings
  label: Zone Settings
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 6-byte config block"
  command_bytes: "[0x21, zn, 0x2F, dl, data..., 0x0D]"
  response_notes: "Zone 2 input, status, volume, max volume, fixed volume flag, max on volume"

- id: network_settings
  label: Network Settings
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 69-byte config block"
  command_bytes: "[0x21, zn, 0x30, dl, data..., 0x0D]"
  response_notes: "69-byte block: net source, SSID, network key (set only), IP address, MAC address, friendly name"

- id: bluetooth_settings
  label: Bluetooth Settings
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise pair/clear commands"
  command_bytes: "[0x21, zn, 0x32, dl, data..., 0x0D]"
  response_notes: "Pair device, clear paired devices, up to 8 paired device names"

- id: engineering_menu
  label: Engineering Menu
  kind: action
  params:
    - name: zone
      type: integer
    - name: operation
      type: integer
      description: "0xF0=request; otherwise 43-byte config block"
  command_bytes: "[0x21, zn, 0x33, dl, data..., 0x0D]"
  response_notes: "43-byte block: factory reset, update check, backup/restore, PIN, region, remote code, standby mode, protection sensitivity, HDMI display, aspect ratio, Dante, C4 SDDP, identify, shutdown code, versions"
```

## Feedbacks
```yaml
- id: answer_code
  type: enum
  values:
    - 0x00: Status update / OK
    - 0x82: Zone Invalid
    - 0x83: Command not recognised
    - 0x84: Parameter not recognised
    - 0x85: Command invalid at this time
    - 0x86: Invalid data length

- id: power_feedback
  type: enum
  values: [0x00, 0x01]
  notes: "0x00=standby, 0x01=powered on"

- id: zone_number
  type: enum
  values:
    - 0x01: Zone 1 (master)
    - 0x02: Zone 2
```

## Variables
```yaml
# Most parameters (volume, bass, treble, balance, etc.) are set via the Actions above
# with 0xF0 query sub-codes. See individual action definitions.
```

## Events
```yaml
# The device sends unsolicited status updates when state changes via front panel or IR:
# Same response format as queries, with answer_code=0x00
# Examples: display brightness changes, decode mode changes, source changes, etc.
# UNRESOLVED: complete event enumeration not documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_default: Requires 0xAA 0xAA confirmation pattern to prevent accidental restore
  - secure_backup_restore: Requires 4-digit PIN
interlocks: []
# UNRESOLVED: power-on sequencing, fault behavior not documented in source
```

## Notes

**Protocol format:** Binary with header `<St=0x21> <Zn> <Cc> <Dl> <Data> <Et=0x0D>`. Response adds `<Ac>` after `<Cc>`.

**Zone model:** Zone 1 is master zone. Commands without zone designation affect Zone 1. Zone 2 is secondary zone with independent power, volume, source.

**IP control:** Port 50000. Discovery via AMX Duet (DDDP) and Control 4 SDDP.

**RS-232 cable:** Null modem wiring (Rx/Tx crossed, ground pass-through).

**RS-232 config:** 38,400bps, 8 data bits, 1 stop bit, no parity, no flow control.

**RC5 simulation:** Any IR command can be sent via the Simulate RC5 command (0x08). See source for full RC5 code table (system 16 for main zone, system 23 for zone 2).

**Error 0x85:** Returned when command not valid for current source/menu state (e.g., tuner commands when not on tuner input, setup menu commands when setup menu is displayed).

**Reserved range:** Commands 0xF0-0xFF are reserved for test functions.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command timing specifications not documented -->
<!-- UNRESOLVED: error recovery procedures not documented -->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw51dc9ad1/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-05-04T15:16:58.823Z
last_checked_at: 2026-04-30T09:43:25.819Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:43:25.819Z
matched_actions: 62
action_count: 62
confidence: high
summary: "All 62 spec actions match source command opcodes; all transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
