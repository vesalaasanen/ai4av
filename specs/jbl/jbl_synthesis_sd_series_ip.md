---
spec_id: admin/jbl-synthesis-sd-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "JBL Synthesis SD Series Control Spec"
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
retrieved_at: 2026-04-30T04:31:15.235Z
last_checked_at: 2026-06-01T21:44:37.004Z
generated_at: 2026-06-01T21:44:37.004Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. No minimum protocol version is enforced in source; engineering menu reports versions only."
  - "source states the device sends unsolicited status updates when state"
  - "source does not document any multi-step command sequences."
  - "no explicit safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated. No minimum protocol version is enforced; the engineering menu only reports current versions."
  - "power-on sequencing (warm-up, network reconnect delays) not specified in source."
  - "control 4 SDDP packet format not documented in source; only declared supported."
verification:
  verdict: verified
  checked_at: 2026-06-01T21:44:37.004Z
  matched_actions: 62
  action_count: 62
  confidence: medium
  summary: "All 62 spec action units match verbatim hex command sequences in the source; transport values (port 50000, 38400 baud, 8N1) are confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# JBL Synthesis SD Series Control Spec

## Summary
The JBL Synthesis SD Series comprises the SDR-35, SDR-38 AV receivers and SDP-55, SDP-58 AV processors. This spec documents the RS-232 serial and TCP/IP control protocol exposed on the rear panel. All operations are framed as 6-byte request/response sequences: `0x21 Zn Cc Dl Data... 0x0D` (response inserts an Answer code byte `Ac` after `Cc`).

<!-- UNRESOLVED: firmware version compatibility not stated in source. No minimum protocol version is enforced in source; engineering menu reports versions only. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: power_request
  label: Power State Request
  kind: query
  command: "0x21 0x01 0x00 0x01 0xF0 0x0D"
  params: []
- id: display_brightness
  label: Display Brightness Request
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []
- id: headphones_connected
  label: Headphones Connection Status
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []
- id: fm_program_type
  label: FM Programme Type Request
  kind: query
  command: "0x21 0x01 0x03 0x01 0xF0 0x0D"
  params: []
- id: software_version
  label: Software Version Request
  kind: query
  command: "0x21 0x01 0x04 0x01 0xF0 0x0D"
  params:
    - name: component
      type: integer
      description: 0xF0 RS232, 0xF1 Host, 0xF2 OSD, 0xF3 DSP, 0xF4 NET, 0xF5 IAP
- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []
- id: save_restore_secure_copy
  label: Save/Restore Secure Copy of Settings
  kind: action
  command: "0x21 0x01 0x06 0x07 0x01 0x55 0x55 0x01 0x02 0x03 0x04 0x0D"
  params:
    - name: operation
      type: integer
      description: 0x00 save, 0x01 restore
    - name: pin
      type: string
      description: 4-digit PIN as 4 bytes
- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x10 0x0D"
  params:
    - name: system
      type: integer
      description: RC5 system code (e.g. 0x10)
    - name: command_code
      type: integer
      description: RC5 command code (e.g. 0x10 volume up)
- id: display_info_type
  label: Display Information Type
  kind: action
  command: "0x21 0x02 0x09 0x01 0x01 0x0D"
  params:
    - name: mode
      type: integer
      description: 0x00 processing, 0xE0 cycle, 0xF0 request; per-source 0x01-0x05 also valid
- id: select_analog_digital
  label: Select Analog/Digital/HDMI Audio
  kind: action
  command: "0x21 0x01 0x0B 0x01 0x01 0x0D"
  params:
    - name: mode
      type: integer
      description: 0x00 analog, 0x01 digital, 0x02 HDMI, 0xF0 request
- id: imax_enhanced
  label: IMAX Enhanced Control
  kind: action
  command: "0x21 0x01 0x0C 0x01 0xF1 0x0D"
  params:
    - name: mode
      type: integer
      description: 0xF0 request, 0xF1 auto, 0xF2 on, 0xF3 off
- id: set_request_volume
  label: Set/Request Volume
  kind: action
  command: "0x21 0x01 0x0D 0x01 0x2D 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: volume
      type: integer
      description: Volume in dB (0x00-0x63 = 0-99), or 0xF0 to request
- id: mute_status
  label: Mute Status Request
  kind: query
  command: "0x21 0x01 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: direct_mode_status
  label: Direct Mode Status Request
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []
- id: decode_mode_2ch
  label: Decode Mode Request (2-channel)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []
- id: decode_mode_mch
  label: Decode Mode Request (Multi-channel)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []
- id: rds_info
  label: RDS Information Request
  kind: query
  command: "0x21 0x01 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: video_output_resolution
  label: Video Output Resolution Request
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []
- id: menu_status
  label: Menu Status Request
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []
- id: tuner_preset
  label: Tuner Preset Select/Request
  kind: action
  command: "0x21 0x01 0x15 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: preset
      type: integer
      description: Preset number 0x01-0x32 (1-50) or 0xF0 to request
- id: tune
  label: Tune Increment/Decrement/Request
  kind: action
  command: "0x21 0x01 0x16 0x01 0x01 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: direction
      type: integer
      description: 0x00 decrement, 0x01 increment, 0xF0 request
- id: dab_station
  label: DAB Station Request
  kind: query
  command: "0x21 0x01 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: prog_type_category
  label: DAB Programme Type Request
  kind: query
  command: "0x21 0x01 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: dls_pdt_info
  label: DLS/PDT Info Request
  kind: query
  command: "0x21 0x01 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: preset_details
  label: Preset Details Request
  kind: query
  command: "0x21 0x01 0x1B 0x01 0x01 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: preset
      type: integer
      description: Preset number 0x01-0x32 (1-50)
- id: network_playback_status
  label: Network Playback Status Request
  kind: query
  command: "0x21 0x01 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: current_source
  label: Current Source Request
  kind: query
  command: "0x21 0x01 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: headphone_override
  label: Headphone Over-ride (Mute Relays)
  kind: action
  command: "0x21 0x01 0x1F 0x01 0x01 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: state
      type: integer
      description: 0x00 clear, 0x01 set
- id: input_name
  label: Set/Request Input Name
  kind: action
  command: "0x21 0x01 0x20 0x06 0x42 0x44 0x50 0x33 0x30 0x30 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: name
      type: string
      description: Up to 10 ASCII characters; 0xF0 to query
- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 0x01 0x23 0x01 0x01 0x0D"
  params:
    - name: direction
      type: integer
      description: 0x01 scan up, 0x02 scan down
- id: dab_scan
  label: DAB Scan
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []
- id: heartbeat
  label: Heartbeat
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []
- id: reboot
  label: Reboot Unit
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
- id: setup
  label: Start Remote Setup
  kind: action
  command: "0x21 0x01 0x27 0x01 0xF0 0x0D"
  params: []
- id: input_config
  label: Input Configuration
  kind: action
  command: "0x21 0x01 0x28 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 25 bytes of input config
- id: general_setup
  label: General Setup Menu
  kind: action
  command: "0x21 0x01 0x29 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 32 bytes of general setup
- id: speaker_types
  label: Speaker Types
  kind: action
  command: "0x21 0x01 0x2A 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 13 bytes of speaker type config
- id: speaker_distances
  label: Speaker Distances
  kind: action
  command: "0x21 0x01 0x2B 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 33 bytes of speaker distance config
- id: speaker_levels
  label: Speaker Levels
  kind: action
  command: "0x21 0x01 0x2C 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 18 bytes of speaker level config
- id: video_inputs
  label: Video Input Configuration
  kind: action
  command: "0x21 0x01 0x2D 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 6 bytes of video input mapping
- id: hdmi_settings
  label: HDMI Settings
  kind: action
  command: "0x21 0x01 0x2E 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 10 bytes of HDMI config
- id: zone_settings
  label: Zone Settings
  kind: action
  command: "0x21 0x01 0x2F 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 6 bytes of zone config
- id: network
  label: Network Settings
  kind: action
  command: "0x21 0x01 0x30 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 69 bytes of network config
- id: bluetooth
  label: Bluetooth Settings
  kind: action
  command: "0x21 0x01 0x32 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or 2 bytes (set pair/clear only)
- id: engineering_menu
  label: Engineering Menu
  kind: action
  command: "0x21 0x01 0x33 0x01 0xF0 0x0D"
  params:
    - name: data
      type: string
      description: 1 byte (query 0xF0) or up to 51 bytes of engineering config
- id: room_eq_names
  label: Room EQ Names Request
  kind: query
  command: "0x21 0x01 0x34 0x01 0xF0 0x0D"
  params: []
- id: treble_eq
  label: Treble Equalisation
  kind: action
  command: "0x21 0x01 0x35 0x01 0x82 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: value
      type: integer
      description: 0x00-0x0C (0 to +12 dB), 0x81-0x8C (-1 to -12 dB), 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: bass_eq
  label: Bass Equalisation
  kind: action
  command: "0x21 0x01 0x36 0x01 0xF1 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: value
      type: integer
      description: 0x00-0x0C (0 to +12 dB), 0x81-0x8C (-1 to -12 dB), 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: room_eq
  label: Room Equalisation On/Off
  kind: action
  command: "0x21 0x01 0x37 0x01 0x01 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: value
      type: integer
      description: 0x00 off, 0x01 EQ1, 0x02 EQ2, 0x03 EQ3, 0xF0 request
- id: dolby_audio
  label: Dolby Audio Mode
  kind: action
  command: "0x21 0x01 0x38 0x01 0x01 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: mode
      type: integer
      description: 0x00 off, 0x01 movie, 0x02 music, 0x03 night, 0xF0 request
- id: balance
  label: Balance
  kind: action
  command: "0x21 0x01 0x3B 0x01 0x83 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x06 (0 to +6), 0x81-0x86 (-1 to -6), 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: "0x21 0x01 0x3F 0x01 0x85 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x14 (positive 0.5 dB steps), 0x81-0x94 (negative 0.5 dB steps), 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  command: "0x21 0x01 0x40 0x01 0x0A 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x32 (5 ms steps, 0x08 = 40 ms), 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: compression
  label: Dynamic Range Compression
  kind: action
  command: "0x21 0x01 0x41 0x01 0x01 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00 off, 0x01 medium, 0x02 high, 0xF0 request
- id: incoming_video_params
  label: Incoming Video Parameters Request
  kind: query
  command: "0x21 0x01 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: incoming_audio_format
  label: Incoming Audio Format Request
  kind: query
  command: "0x21 0x01 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
- id: incoming_audio_sample_rate
  label: Incoming Audio Sample Rate Request
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  params: []
- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "0x21 0x01 0x45 0x01 0x83 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00 = 0 dB; 0x81-0x94 = -0.5 dB to -10 dB; 0xF0 request, 0xF1 increment, 0xF2 decrement
- id: zone1_osd
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 0xF2 0x0D"
  params:
    - name: value
      type: integer
      description: 0xF0 request, 0xF1 on, 0xF2 off
- id: video_output_switching
  label: Video Output Switching (HDMI)
  kind: action
  command: "0x21 0x01 0x4F 0x01 0x02 0x0D"
  params:
    - name: output
      type: integer
      description: 0x02 HDMI Out 1, 0x03 HDMI Out 2, 0x04 HDMI Out 1&2, 0xF0 request
- id: bluetooth_status
  label: Bluetooth Status Request
  kind: query
  command: "0x21 0x01 0x50 0x01 0xF0 0x0D"
  params: []
- id: now_playing
  label: Now Playing Information Request
  kind: query
  command: "0x21 0x01 0x64 0x01 0xF1 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number 1-2 (encoded 0x01 or 0x02)
    - name: field
      type: integer
      description: 0xF0 title, 0xF1 artist, 0xF2 album, 0xF3 application, 0xF4 sample rate, 0xF5 encoder
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
- id: display_brightness_level
  type: enum
  values: [off, l1, l2]
- id: headphones_connected
  type: enum
  values: [disconnected, connected]
- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, uhd, aux, display, tuner_fm, tuner_dab, net, stb, game, bt]
- id: mute_state
  type: enum
  values: [muted, unmuted]
- id: direct_mode
  type: enum
  values: [off, on]
- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, five_seven_ch_stereo, dts_neural_x, reserved, dts_virtual_x, dolby_virtual_height, auro_native, auro_matic_3d, auro_2d]
- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_neural_x, dolby_surround, reserved, dts_virtual_x, dolby_virtual_height, auro_native, auro_matic_3d, auro_2d]
- id: imax_mode
  type: enum
  values: [off, on, auto]
- id: dolby_audio_mode
  type: enum
  values: [off, movie, music, night]
- id: compression_mode
  type: enum
  values: [off, medium, high]
- id: room_eq_state
  type: enum
  values: [off, eq1, eq2, eq3, not_calculated]
- id: bluetooth_status
  type: enum
  values: [no_connection, paused, playing_sbc, playing_aac, playing_aptx, playing_aptx_hd]
- id: network_playback_status
  type: enum
  values: [stopped, transitioning, playing, paused]
- id: video_output_resolution
  type: enum
  values: [bypass]
- id: menu_open
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
- id: video_output_hdmi
  type: enum
  values: [out1, out2, out1_and_out2]
- id: zone1_osd_state
  type: enum
  values: [on, off]
- id: volume_level
  type: integer
  description: 0 to 99 dB
- id: fm_program_type
  type: string
  description: ASCII string (e.g. POP MUSIC)
- id: dab_station_name
  type: string
  description: 16 ASCII bytes, space padded
- id: dab_program_type
  type: string
  description: 16 ASCII bytes, space padded
- id: rds_text
  type: string
  description: Up to 28 ASCII characters
- id: dls_pdt_text
  type: string
  description: 128 ASCII bytes, space padded
- id: input_name
  type: string
  description: Up to 10 ASCII characters
- id: now_playing_track_title
  type: string
- id: now_playing_artist
  type: string
- id: now_playing_album
  type: string
- id: now_playing_application
  type: string
- id: now_playing_sample_rate
  type: enum
  values: [khz_32, khz_44_1, khz_48, khz_88_2, khz_96, khz_176_4, khz_192, unknown, undetected]
- id: now_playing_encoder
  type: enum
  values: [mp3, wav, wma, flac, alac, mqa, unknown]
- id: software_version
  type: string
  description: Echo byte, major, minor (e.g. 0xF0 0x01 0x04 = 1.4)
- id: answer_code
  type: enum
  values: [status_update, zone_invalid, command_not_recognised, parameter_not_recognised, command_invalid_at_this_time, invalid_data_length]
```

## Variables
```yaml
- id: power_on_state
  type: enum
  values: [last_state, standby, on]
  description: Set via General Setup (0x29) byte 31
- id: standby_mode
  type: enum
  values: [auto, manual]
  description: Set via Engineering (0x33) byte 13
- id: control_option
  type: enum
  values: [off, rs232, ip]
  description: Set via General Setup (0x29) byte 30
- id: display_on_time
  type: enum
  values: [sec_5, sec_10, sec_30, min_1, always]
  description: Set via General Setup (0x29) byte 29
- id: language
  type: enum
  values: [english, francis, deutsch, espanol, nederlands, russian, chinese]
  description: Set via General Setup (0x29) byte 32
- id: max_volume
  type: integer
  description: 0-99
- id: max_on_volume
  type: integer
  description: 0-99
- id: zone2_max_volume
  type: integer
  description: 20-83
- id: zone2_max_on_volume
  type: integer
  description: 20-83
- id: zone2_fixed_volume
  type: enum
  values: [no, yes]
- id: protection_sensitivity
  type: enum
  values: [high, medium, low]
  description: Set via Engineering (0x33) byte 14
- id: standby_mode_setting
  type: enum
  values: [auto, manual]
  description: Set via Engineering (0x33) byte 13
- id: dante_enable
  type: enum
  values: [off, on]
- id: c4_sddp
  type: enum
  values: [off, on]
- id: use_display_hdmi
  type: enum
  values: [yes, no]
- id: display_type
  type: enum
  values: [ratio_16_9, ratio_21_9]
- id: region
  type: enum
  values: [europe, us, canada, australia, china]
- id: remote_code
  type: enum
  values: [code_16, code_19]
```

## Events
```yaml
# UNRESOLVED: source states the device sends unsolicited status updates when state
# changes occur via front panel or IR (section 'State changes as a result of other
# inputs'), but does not document the message format, opcodes, or trigger conditions
# beyond "the appropriate message type". Populate from device observation or follow-up doc.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step command sequences.
# RC5 Simulate command (0x08) can emulate remote sequences, but no predefined macros
# are listed in the source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults
  - save_restore_secure_copy
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlock procedures, or power-on sequencing
# requirements are stated in the source. The 0x05 and 0x06 commands use confirmation byte
# patterns (0xAA 0xAA and 0x55 0x55) noted in the source as "to avoid accidental" execution.
```

## Notes

- Frame format: every transmission begins with `0x21` (St) and ends with `0x0D` (Et). Command frame is `<St><Zn><Cc><Dl><Data>`; response frame inserts an Answer code `<Ac>` after `<Cc>`.
- Zone number byte: `0x01` = Zone 1 (master), `0x02` = Zone 2. Zone-less commands target master (Zone 1).
- Answer codes: `0x00` = status update, `0x82` = zone invalid, `0x83` = command not recognised, `0x84` = parameter not recognised, `0x85` = command invalid at this time (e.g. while OSD setup menu is showing), `0x86` = invalid data length.
- Commands `0xF0` to `0xFF` are reserved for test functions and must not be used.
- Serial cable: null modem (pin 2 Rx crossed to pin 3 Tx, pin 5 ground).
- RS-232 control must be enabled before use. Press and hold the front panel DIRECT button for 4 seconds until "RS232 CONTROL ON" appears, or enable `Control = On` in the General Setup menu. By default, Control is disabled for minimum standby power consumption.
- IP control uses TCP port 50000 of the unit's IP address (configured via Network Settings menu).
- AMX Duet discovery: send `AMX\r` to receive `AMXB<Device-SDKClass=Receiver><Device-Make=JBL><Device-Model=modelname><Device-Revision=x.y.z>\r` where `x.y.z` is the RS-232 protocol version (e.g. 1.4).
- Control4 SDDP discovery is supported.
- The device responds within three seconds of receiving a command. The controller may send further commands before a previous response is received.
- RC5 IR codes (Basic + Advanced tables in source) are dispatched via the Simulate RC5 command `0x08` with system `0x10` (or `0x17` for Zone 2). Codes include Standby `0x10 0x0C`, Power On `0x10 0x7B`, Power Off `0x10 0x7C`, Volume +/- `0x10 0x10/0x11`, Mute `0x10 0x0D`, Mute On `0x10 0x1A`, Mute Off `0x10 0x78`, and full source-select keys (CD `0x10 0x76`, BD `0x10 0x62`, SAT `0x10 0x1B`, GAME `0x10 0x61`, STB `0x10 0x64`, UHD `0x10 0x7D`, BT `0x10 0x7A`, AV `0x10 0x5E`, PVR `0x10 0x60`, NET `0x10 0x5C`, AUX `0x10 0x63`, FM `0x10 0x1C`, DAB `0x10 0x48`).
- Per-zone RC5 system code `0x17` exposes Zone 2 power (`0x17 0x7B/0x7C`), volume (`0x17 0x01/0x02`), mute (`0x17 0x03/0x04/0x05`), and source-select keys.

<!-- UNRESOLVED: firmware version compatibility not stated. No minimum protocol version is enforced; the engineering menu only reports current versions. -->
<!-- UNRESOLVED: power-on sequencing (warm-up, network reconnect delays) not specified in source. -->
<!-- UNRESOLVED: control 4 SDDP packet format not documented in source; only declared supported. -->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw51dc9ad1/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-04-30T04:31:15.235Z
last_checked_at: 2026-06-01T21:44:37.004Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T21:44:37.004Z
matched_actions: 62
action_count: 62
confidence: medium
summary: "All 62 spec action units match verbatim hex command sequences in the source; transport values (port 50000, 38400 baud, 8N1) are confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. No minimum protocol version is enforced in source; engineering menu reports versions only."
- "source states the device sends unsolicited status updates when state"
- "source does not document any multi-step command sequences."
- "no explicit safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated. No minimum protocol version is enforced; the engineering menu only reports current versions."
- "power-on sequencing (warm-up, network reconnect delays) not specified in source."
- "control 4 SDDP packet format not documented in source; only declared supported."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
