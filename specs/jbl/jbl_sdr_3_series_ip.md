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
retrieved_at: 2026-04-29T13:35:23.379Z
last_checked_at: 2026-06-02T17:22:39.700Z
generated_at: 2026-06-02T17:22:39.700Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated"
  - "many block-set commands (0x28, 0x29, 0x2A-0x33) expose a large"
  - "source documents no canned multi-step sequences."
  - "no voltage/current/power interlocks stated."
  - "firmware version compatibility ranges not stated."
  - "AMX DDDP response shows `modelname` and `x.y.z` placeholders — the literal model identifier returned at runtime is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:39.700Z
  matched_actions: 254
  action_count: 254
  confidence: medium
  summary: "All 254 spec actions match source commands verbatim by Cc byte and data values; transport port 50000 and 38400bps confirmed; RC5 table covers all 0x08-routed actions; block-config commands 0x28-0x33 match source exactly. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# JBL SDR-3 Series Control Spec

## Summary
JBL Synthesis SDR-35/SDR-38/SDP-55/SDP-58 AV processors/receivers. Control via RS-232 (38400bps 8N1) or TCP/IP (port 50000). All commands use byte frame `<St> <Zn> <Cc> <Dl> <Data> <Et>` with St=0x21, Et=0x0D. AV implements virtual RC5 IR commands via 0x08 to simplify protocol; full RC5 code set documented for power/transport/zone control.

<!-- UNRESOLVED: firmware version not stated -->

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
- powerable    # inferred from RC5 Power On/Off, Standby
- routable     # inferred from source select / HDMI output switching
- queryable    # inferred from query commands returning state
- levelable    # inferred from volume, bass, treble, balance, sub trim
```

## Actions
```yaml
# ---- System Command Specifications ----

- id: power_query
  label: Power Query (Zone)
  kind: query
  command: "21 <Zn> 00 01 F0 0D"
  params:
    - name: Zn
      type: byte
      description: Zone (0x01=Z1, 0x02=Z2)

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "21 01 01 01 F0 0D"
  params: []

- id: headphones_query
  label: Headphones Connection Query
  kind: query
  command: "21 01 02 01 F0 0D"
  params: []

- id: fm_genre_query
  label: FM Program Type Query
  kind: query
  command: "21 <Zn> 03 01 F0 0D"
  params:
    - name: Zn
      type: byte
      description: Zone

- id: software_version_rs232_query
  label: Software Version Query (RS232)
  kind: query
  command: "21 01 04 01 F0 0D"
  params: []

- id: software_version_host_query
  label: Software Version Query (Host)
  kind: query
  command: "21 01 04 01 F1 0D"
  params: []

- id: software_version_osd_query
  label: Software Version Query (OSD)
  kind: query
  command: "21 01 04 01 F2 0D"
  params: []

- id: software_version_dsp_query
  label: Software Version Query (DSP)
  kind: query
  command: "21 01 04 01 F3 0D"
  params: []

- id: software_version_net_query
  label: Software Version Query (NET)
  kind: query
  command: "21 01 04 01 F4 0D"
  params: []

- id: software_version_iap_query
  label: Software Version Query (IAP)
  kind: query
  command: "21 01 04 01 F5 0D"
  params: []

- id: restore_factory_defaults
  label: Restore Factory Default Settings
  kind: action
  command: "21 01 05 02 AA AA 0D"
  params: []

- id: save_secure_backup
  label: Save Secure Copy of Settings
  kind: action
  command: "21 01 06 07 00 55 55 <P1> <P2> <P3> <P4> 0D"
  params:
    - name: P1..P4
      type: byte
      description: 4-digit PIN bytes

- id: restore_secure_backup
  label: Restore Secure Copy of Settings
  kind: action
  command: "21 01 06 07 01 55 55 <P1> <P2> <P3> <P4> 0D"
  params:
    - name: P1..P4
      type: byte
      description: 4-digit PIN bytes

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "21 <Zn> 08 02 <Sys> <Cmd> 0D"
  params:
    - name: Zn
      type: byte
    - name: Sys
      type: byte
      description: RC5 system code
    - name: Cmd
      type: byte
      description: RC5 command code

- id: display_info_type_set
  label: Set Display Information Type
  kind: action
  command: "21 <Zn> 09 01 <Type> 0D"
  params:
    - name: Zn
      type: byte
    - name: Type
      type: byte
      description: 0x00=Processing, 0xE0=cycle, source-dependent values (FM/DAB/NET)

- id: display_info_type_query
  label: Display Info Type Query
  kind: query
  command: "21 <Zn> 09 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: current_source_query
  label: Request Current Source
  kind: query
  command: "21 <Zn> 1D 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: headphone_override_clear
  label: Headphone Over-ride Clear (mute speakers)
  kind: action
  command: "21 <Zn> 1F 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: headphone_override_set
  label: Headphone Over-ride Set (unmute speakers)
  kind: action
  command: "21 <Zn> 1F 01 01 0D"
  params:
    - name: Zn
      type: byte

# ---- Input Command ----

- id: audio_input_analog
  label: Select Analog Audio for Current Source
  kind: action
  command: "21 <Zn> 0B 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: audio_input_digital
  label: Select Digital Audio for Current Source
  kind: action
  command: "21 <Zn> 0B 01 01 0D"
  params:
    - name: Zn
      type: byte

- id: audio_input_hdmi
  label: Select HDMI Audio for Current Source
  kind: action
  command: "21 <Zn> 0B 01 02 0D"
  params:
    - name: Zn
      type: byte

- id: audio_input_query
  label: Audio Input Type Query
  kind: query
  command: "21 <Zn> 0B 01 F0 0D"
  params:
    - name: Zn
      type: byte

# ---- Output Command ----

- id: volume_set
  label: Set Volume
  kind: action
  command: "21 <Zn> 0D 01 <Vol> 0D"
  params:
    - name: Zn
      type: byte
    - name: Vol
      type: byte
      description: 0x00 (0) - 0x63 (99) dB

- id: volume_query
  label: Volume Query
  kind: query
  command: "21 <Zn> 0D 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "21 <Zn> 0E 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: direct_mode_query
  label: Direct Mode Status Query
  kind: query
  command: "21 01 0F 01 F0 0D"
  params: []

- id: decode_mode_2ch_query
  label: Decode Mode Query (2-channel)
  kind: query
  command: "21 01 10 01 F0 0D"
  params: []

- id: decode_mode_mch_query
  label: Decode Mode Query (Multi-channel)
  kind: query
  command: "21 01 11 01 F0 0D"
  params: []

- id: rds_info_query
  label: RDS Information Query (FM)
  kind: query
  command: "21 <Zn> 12 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: query
  command: "21 01 13 01 F0 0D"
  params: []

# ---- Menu Commands ----

- id: menu_status_query
  label: Menu Status Query
  kind: query
  command: "21 01 14 01 F0 0D"
  params: []

- id: tuner_preset_select
  label: Select Tuner Preset
  kind: action
  command: "21 <Zn> 15 01 <Preset> 0D"
  params:
    - name: Zn
      type: byte
    - name: Preset
      type: byte
      description: 0x01-0x32 (1-50)

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  command: "21 <Zn> 15 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: tune_decrement
  label: Tuner Frequency Decrement (FM step)
  kind: action
  command: "21 <Zn> 16 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: tune_increment
  label: Tuner Frequency Increment (FM step)
  kind: action
  command: "21 <Zn> 16 01 01 0D"
  params:
    - name: Zn
      type: byte

- id: tune_query
  label: Tuner Frequency Query
  kind: query
  command: "21 <Zn> 16 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "21 <Zn> 18 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: dab_prog_type_query
  label: DAB Programme Type Query
  kind: query
  command: "21 <Zn> 19 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: dab_dls_pdt_query
  label: DAB DLS/PDT (Radio Text) Query
  kind: query
  command: "21 <Zn> 1A F0 0D"
  params:
    - name: Zn
      type: byte

- id: preset_details_query
  label: Preset Details Query
  kind: query
  command: "21 <Zn> 1B 01 <Preset> 0D"
  params:
    - name: Zn
      type: byte
    - name: Preset
      type: byte
      description: 0x01-0x32 (1-50)

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "21 <Zn> 1C 01 F0 0D"
  params:
    - name: Zn
      type: byte

# ---- IMAX Enhanced ----

- id: imax_enhanced_query
  label: IMAX Enhanced State Query
  kind: query
  command: "21 <Zn> 0C 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: imax_enhanced_auto
  label: IMAX Enhanced Auto
  kind: action
  command: "21 <Zn> 0C 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: imax_enhanced_on
  label: IMAX Enhanced On
  kind: action
  command: "21 <Zn> 0C 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: imax_enhanced_off
  label: IMAX Enhanced Off
  kind: action
  command: "21 <Zn> 0C 01 F3 0D"
  params:
    - name: Zn
      type: byte

# ---- Setup Adjustment ----

- id: treble_set
  label: Set Treble Equalisation
  kind: action
  command: "21 <Zn> 35 01 <Val> 0D"
  params:
    - name: Zn
      type: byte
    - name: Val
      type: byte
      description: 0x00-0x0C (0..+12dB), 0x81-0x8C (-1..-12dB)

- id: treble_query
  label: Treble Query
  kind: query
  command: "21 <Zn> 35 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: treble_increment
  label: Increment Treble by 1dB
  kind: action
  command: "21 <Zn> 35 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: treble_decrement
  label: Decrement Treble by 1dB
  kind: action
  command: "21 <Zn> 35 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: bass_set
  label: Set Bass Equalisation
  kind: action
  command: "21 <Zn> 36 01 <Val> 0D"
  params:
    - name: Zn
      type: byte
    - name: Val
      type: byte
      description: 0x00-0x0C (0..+12dB), 0x81-0x8C (-1..-12dB)

- id: bass_query
  label: Bass Query
  kind: query
  command: "21 <Zn> 36 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: bass_increment
  label: Increment Bass by 1dB
  kind: action
  command: "21 <Zn> 36 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: bass_decrement
  label: Decrement Bass by 1dB
  kind: action
  command: "21 <Zn> 36 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: room_eq_query
  label: Room EQ State Query
  kind: query
  command: "21 <Zn> 37 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: room_eq_off
  label: Room EQ Off
  kind: action
  command: "21 <Zn> 37 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: room_eq_1_on
  label: Room EQ 1 On
  kind: action
  command: "21 <Zn> 37 01 01 0D"
  params:
    - name: Zn
      type: byte

- id: room_eq_2_on
  label: Room EQ 2 On
  kind: action
  command: "21 <Zn> 37 01 02 0D"
  params:
    - name: Zn
      type: byte

- id: room_eq_3_on
  label: Room EQ 3 On
  kind: action
  command: "21 <Zn> 37 01 03 0D"
  params:
    - name: Zn
      type: byte

- id: dolby_audio_off
  label: Dolby Audio Off
  kind: action
  command: "21 <Zn> 38 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: dolby_audio_movie
  label: Dolby Audio Movie Mode
  kind: action
  command: "21 <Zn> 38 01 01 0D"
  params:
    - name: Zn
      type: byte

- id: dolby_audio_music
  label: Dolby Audio Music Mode
  kind: action
  command: "21 <Zn> 38 01 02 0D"
  params:
    - name: Zn
      type: byte

- id: dolby_audio_night
  label: Dolby Audio Night Mode
  kind: action
  command: "21 <Zn> 38 01 03 0D"
  params:
    - name: Zn
      type: byte

- id: dolby_audio_query
  label: Dolby Audio Mode Query
  kind: query
  command: "21 <Zn> 38 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: balance_set
  label: Set Balance
  kind: action
  command: "21 <Zn> 3B 01 <Val> 0D"
  params:
    - name: Zn
      type: byte
    - name: Val
      type: byte
      description: 0x00-0x06 (0..6), 0x81-0x86 (-1..-6)

- id: balance_query
  label: Balance Query
  kind: query
  command: "21 <Zn> 3B 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: balance_increment
  label: Increment Balance by 1
  kind: action
  command: "21 <Zn> 3B 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: balance_decrement
  label: Decrement Balance by 1
  kind: action
  command: "21 <Zn> 3B 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: subwoofer_trim_set
  label: Set Subwoofer Trim
  kind: action
  command: "21 <Zn> 3F 01 <Val> 0D"
  params:
    - name: Zn
      type: byte
    - name: Val
      type: byte
      description: 0x00-0x14 (0..+10dB in 0.5dB steps), 0x81-0x94 (-0.5..-10dB)

- id: subwoofer_trim_query
  label: Subwoofer Trim Query
  kind: query
  command: "21 <Zn> 3F 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: subwoofer_trim_increment
  label: Increment Subwoofer Trim by 0.5dB
  kind: action
  command: "21 <Zn> 3F 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: subwoofer_trim_decrement
  label: Decrement Subwoofer Trim by 0.5dB
  kind: action
  command: "21 <Zn> 3F 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: lipsync_set
  label: Set Lipsync Delay
  kind: action
  command: "21 <Zn> 40 01 <Val> 0D"
  params:
    - name: Zn
      type: byte
    - name: Val
      type: byte
      description: 0x00-0x32 in 5ms steps

- id: lipsync_query
  label: Lipsync Delay Query
  kind: query
  command: "21 <Zn> 40 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: lipsync_increment
  label: Increment Lipsync Delay by 5ms
  kind: action
  command: "21 <Zn> 40 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: lipsync_decrement
  label: Decrement Lipsync Delay by 5ms
  kind: action
  command: "21 <Zn> 40 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: compression_off
  label: Compression Off
  kind: action
  command: "21 <Zn> 41 01 00 0D"
  params:
    - name: Zn
      type: byte

- id: compression_medium
  label: Compression Medium
  kind: action
  command: "21 <Zn> 41 01 01 0D"
  params:
    - name: Zn
      type: byte

- id: compression_high
  label: Compression High
  kind: action
  command: "21 <Zn> 41 01 02 0D"
  params:
    - name: Zn
      type: byte

- id: compression_query
  label: Compression Query
  kind: query
  command: "21 <Zn> 41 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: incoming_video_params_query
  label: Incoming Video Parameters Query
  kind: query
  command: "21 <Zn> 42 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: incoming_audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "21 <Zn> 43 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "21 01 44 01 F0 0D"
  params: []

- id: sub_stereo_trim_set
  label: Set Sub Stereo Trim
  kind: action
  command: "21 01 45 01 <Val> 0D"
  params:
    - name: Val
      type: byte
      description: 0x00, 0x81-0x94 in -0.5dB steps

- id: sub_stereo_trim_query
  label: Sub Stereo Trim Query
  kind: query
  command: "21 01 45 01 F0 0D"
  params: []

- id: sub_stereo_trim_increment
  label: Increment Sub Stereo Trim by 0.5dB
  kind: action
  command: "21 01 45 01 F1 0D"
  params: []

- id: sub_stereo_trim_decrement
  label: Decrement Sub Stereo Trim by 0.5dB
  kind: action
  command: "21 01 45 01 F2 0D"
  params: []

- id: zone1_osd_query
  label: Zone 1 OSD State Query
  kind: query
  command: "21 01 4E 01 F0 0D"
  params: []

- id: zone1_osd_on
  label: Zone 1 OSD On
  kind: action
  command: "21 01 4E 01 F1 0D"
  params: []

- id: zone1_osd_off
  label: Zone 1 OSD Off
  kind: action
  command: "21 01 4E 01 F2 0D"
  params: []

- id: video_output_hdmi1
  label: Set Video Output HDMI 1
  kind: action
  command: "21 01 4F 01 02 0D"
  params: []

- id: video_output_hdmi2
  label: Set Video Output HDMI 2
  kind: action
  command: "21 01 4F 01 03 0D"
  params: []

- id: video_output_hdmi_both
  label: Set Video Output HDMI 1 & 2
  kind: action
  command: "21 01 4F 01 04 0D"
  params: []

- id: video_output_switching_query
  label: Video Output Switching Query
  kind: query
  command: "21 01 4F 01 F0 0D"
  params: []

- id: input_name_set
  label: Set Input Name
  kind: action
  command: "21 01 20 <Dl> <Name...> 0D"
  params:
    - name: Dl
      type: byte
      description: data length (max 10 chars)
    - name: Name
      type: ascii
      description: input name in ASCII (max 10 chars)

- id: input_name_query
  label: Input Name Query
  kind: query
  command: "21 01 20 01 F0 0D"
  params: []

- id: fm_scan_up
  label: FM Scan Up
  kind: action
  command: "21 01 23 01 01 0D"
  params: []

- id: fm_scan_down
  label: FM Scan Down
  kind: action
  command: "21 01 23 01 02 0D"
  params: []

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "21 01 24 01 F0 0D"
  params: []

- id: heartbeat
  label: Heartbeat / Keep-Alive
  kind: action
  command: "21 01 25 01 F0 0D"
  params: []

- id: reboot
  label: Reboot Unit
  kind: action
  command: "21 01 26 06 52 45 42 4F 4F 54 0D"
  params: []

- id: bluetooth_status_query
  label: Bluetooth Status Query
  kind: query
  command: "21 01 50 01 F0 0D"
  params: []

- id: setup_enter
  label: Enter Remote Setup
  kind: action
  command: "21 01 27 01 F0 0D"
  params: []

- id: room_eq_names_query
  label: Room EQ Names Query
  kind: query
  command: "21 01 34 01 F0 0D"
  params: []

- id: now_playing_track_query
  label: Now Playing Track Query
  kind: query
  command: "21 <Zn> 64 01 F0 0D"
  params:
    - name: Zn
      type: byte

- id: now_playing_artist_query
  label: Now Playing Artist Query
  kind: query
  command: "21 <Zn> 64 01 F1 0D"
  params:
    - name: Zn
      type: byte

- id: now_playing_album_query
  label: Now Playing Album Query
  kind: query
  command: "21 <Zn> 64 01 F2 0D"
  params:
    - name: Zn
      type: byte

- id: now_playing_application_query
  label: Now Playing Application Query (GoogleCast)
  kind: query
  command: "21 <Zn> 64 01 F3 0D"
  params:
    - name: Zn
      type: byte

- id: now_playing_sample_rate_query
  label: Now Playing Sample Rate Query
  kind: query
  command: "21 <Zn> 64 01 F4 0D"
  params:
    - name: Zn
      type: byte

- id: now_playing_encoder_query
  label: Now Playing Encoder Query
  kind: query
  command: "21 <Zn> 64 01 F5 0D"
  params:
    - name: Zn
      type: byte

# ---- Configuration Menu Block Commands (request/set whole block) ----

- id: input_config_query
  label: Input Config Block Query
  kind: query
  command: "21 01 28 01 F0 0D"
  params: []

- id: input_config_set
  label: Set Input Config Block
  kind: action
  command: "21 01 28 19 <Data1..Data25> 0D"
  params:
    - name: Data
      type: bytes
      description: 25-byte input config payload (see source 0x28 layout)

- id: general_setup_query
  label: General Setup Block Query
  kind: query
  command: "21 01 29 01 F0 0D"
  params: []

- id: general_setup_set
  label: Set General Setup Block
  kind: action
  command: "21 01 29 20 <Data1..Data32> 0D"
  params:
    - name: Data
      type: bytes
      description: 32-byte general setup payload (see source 0x29 layout)

- id: speaker_types_query
  label: Speaker Types Block Query
  kind: query
  command: "21 01 2A 01 F0 0D"
  params: []

- id: speaker_types_set
  label: Set Speaker Types Block
  kind: action
  command: "21 01 2A 0D <Data1..Data13> 0D"
  params:
    - name: Data
      type: bytes
      description: 13-byte speaker types payload (see source 0x2A layout)

- id: speaker_distances_query
  label: Speaker Distances Block Query
  kind: query
  command: "21 01 2B 01 F0 0D"
  params: []

- id: speaker_distances_set
  label: Set Speaker Distances Block
  kind: action
  command: "21 01 2B 21 <Data1..Data33> 0D"
  params:
    - name: Data
      type: bytes
      description: 33-byte distance payload (units + 2 bytes per speaker)

- id: speaker_levels_query
  label: Speaker Levels Block Query
  kind: query
  command: "21 01 2C 01 F0 0D"
  params: []

- id: speaker_levels_set
  label: Set Speaker Levels Block
  kind: action
  command: "21 01 2C 12 <Data1..Data18> 0D"
  params:
    - name: Data
      type: bytes
      description: 18-byte levels payload

- id: video_inputs_query
  label: Video Inputs Block Query
  kind: query
  command: "21 01 2D 01 F0 0D"
  params: []

- id: video_inputs_set
  label: Set Video Inputs Block
  kind: action
  command: "21 01 2D 06 <Data1..Data6> 0D"
  params:
    - name: Data
      type: bytes
      description: 6-byte video-input mapping for CD/Aux/FM/DAB/NET/BT

- id: hdmi_settings_query
  label: HDMI Settings Block Query
  kind: query
  command: "21 01 2E 01 F0 0D"
  params: []

- id: hdmi_settings_set
  label: Set HDMI Settings Block
  kind: action
  command: "21 01 2E 0A <Data1..Data10> 0D"
  params:
    - name: Data
      type: bytes
      description: 10-byte HDMI settings payload

- id: zone_settings_query
  label: Zone Settings Block Query
  kind: query
  command: "21 01 2F 01 F0 0D"
  params: []

- id: zone_settings_set
  label: Set Zone Settings Block
  kind: action
  command: "21 01 2F 06 <Data1..Data6> 0D"
  params:
    - name: Data
      type: bytes
      description: 6-byte Zone 2 settings payload

- id: network_settings_query
  label: Network Settings Block Query
  kind: query
  command: "21 01 30 01 F0 0D"
  params: []

- id: network_settings_set
  label: Set Network Settings Block
  kind: action
  command: "21 01 30 45 <Data1..Data69> 0D"
  params:
    - name: Data
      type: bytes
      description: 69-byte network settings payload

- id: bluetooth_settings_query
  label: Bluetooth Settings Block Query
  kind: query
  command: "21 01 32 01 F0 0D"
  params: []

- id: bluetooth_pair_start
  label: Bluetooth Start Pair Device
  kind: action
  command: "21 01 32 02 01 00 0D"
  params: []

- id: bluetooth_clear_paired
  label: Bluetooth Clear Paired Devices
  kind: action
  command: "21 01 32 02 00 01 0D"
  params: []

- id: engineering_menu_query
  label: Engineering Menu Block Query
  kind: query
  command: "21 01 33 01 F0 0D"
  params: []

- id: engineering_menu_set
  label: Set Engineering Menu Block
  kind: action
  command: "21 01 33 33 <Data1..Data51> 0D"
  params:
    - name: Data
      type: bytes
      description: Engineering menu payload (see source 0x33 layout)

# ---- AV RC5 Basic Functions (sent via Simulate RC5 0x08, Sys=0x10) ----

- id: rc5_standby
  label: RC5 Standby (16-12)
  kind: action
  command: "21 01 08 02 10 0C 0D"
  params: []

- id: rc5_eject_speaker_trim
  label: RC5 Eject / Speaker Trim (16-45)
  kind: action
  command: "21 01 08 02 10 2D 0D"
  params: []

- id: rc5_digit_1
  label: RC5 Digit 1 (16-1)
  kind: action
  command: "21 01 08 02 10 01 0D"
  params: []

- id: rc5_digit_2
  label: RC5 Digit 2 (16-2)
  kind: action
  command: "21 01 08 02 10 02 0D"
  params: []

- id: rc5_digit_3
  label: RC5 Digit 3 (16-3)
  kind: action
  command: "21 01 08 02 10 03 0D"
  params: []

- id: rc5_digit_4
  label: RC5 Digit 4 (16-4)
  kind: action
  command: "21 01 08 02 10 04 0D"
  params: []

- id: rc5_digit_5
  label: RC5 Digit 5 (16-5)
  kind: action
  command: "21 01 08 02 10 05 0D"
  params: []

- id: rc5_digit_6
  label: RC5 Digit 6 (16-6)
  kind: action
  command: "21 01 08 02 10 06 0D"
  params: []

- id: rc5_digit_7
  label: RC5 Digit 7 (16-7)
  kind: action
  command: "21 01 08 02 10 07 0D"
  params: []

- id: rc5_digit_8
  label: RC5 Digit 8 (16-8)
  kind: action
  command: "21 01 08 02 10 08 0D"
  params: []

- id: rc5_digit_9
  label: RC5 Digit 9 (16-9)
  kind: action
  command: "21 01 08 02 10 09 0D"
  params: []

- id: rc5_sync_lipsync
  label: RC5 SYNC / Access Lipsync Delay (16-50)
  kind: action
  command: "21 01 08 02 10 32 0D"
  params: []

- id: rc5_digit_0
  label: RC5 Digit 0 (16-0)
  kind: action
  command: "21 01 08 02 10 00 0D"
  params: []

- id: rc5_info_vfd_cycle
  label: RC5 INFO Cycle VFD Panels (16-55)
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []

- id: rc5_rewind
  label: RC5 Rewind (16-121)
  kind: action
  command: "21 01 08 02 10 79 0D"
  params: []

- id: rc5_fast_forward
  label: RC5 Fast Forward (16-52)
  kind: action
  command: "21 01 08 02 10 34 0D"
  params: []

- id: rc5_skip_back
  label: RC5 Skip Back (16-33)
  kind: action
  command: "21 01 08 02 10 21 0D"
  params: []

- id: rc5_skip_forward
  label: RC5 Skip Forward (16-11)
  kind: action
  command: "21 01 08 02 10 0B 0D"
  params: []

- id: rc5_stop
  label: RC5 Stop (16-54)
  kind: action
  command: "21 01 08 02 10 36 0D"
  params: []

- id: rc5_play
  label: RC5 Play (16-53)
  kind: action
  command: "21 01 08 02 10 35 0D"
  params: []

- id: rc5_pause
  label: RC5 Pause (16-48)
  kind: action
  command: "21 01 08 02 10 30 0D"
  params: []

- id: rc5_disc_dts_dialogue
  label: RC5 Disc / DTS Dialogue Control (16-90)
  kind: action
  command: "21 01 08 02 10 5A 0D"
  params: []

- id: rc5_menu
  label: RC5 MENU Enter System Menu (16-82)
  kind: action
  command: "21 01 08 02 10 52 0D"
  params: []

- id: rc5_navigate_up
  label: RC5 Navigate Up (16-86)
  kind: action
  command: "21 01 08 02 10 56 0D"
  params: []

- id: rc5_pop_up_dolby_volume
  label: RC5 Pop Up / Dolby Volume On-Off (16-70)
  kind: action
  command: "21 01 08 02 10 46 0D"
  params: []

- id: rc5_navigate_left
  label: RC5 Navigate Left (16-81)
  kind: action
  command: "21 01 08 02 10 51 0D"
  params: []

- id: rc5_ok
  label: RC5 OK (16-87)
  kind: action
  command: "21 01 08 02 10 57 0D"
  params: []

- id: rc5_navigate_right
  label: RC5 Navigate Right (16-80)
  kind: action
  command: "21 01 08 02 10 50 0D"
  params: []

- id: rc5_audio_room_eq_toggle
  label: RC5 Audio / Room EQ On-Off (16-30)
  kind: action
  command: "21 01 08 02 10 1E 0D"
  params: []

- id: rc5_navigate_down
  label: RC5 Navigate Down (16-85)
  kind: action
  command: "21 01 08 02 10 55 0D"
  params: []

- id: rc5_rtn_subwoofer_trim
  label: RC5 RTN / Access Subwoofer Trim (16-51)
  kind: action
  command: "21 01 08 02 10 33 0D"
  params: []

- id: rc5_home
  label: RC5 HOME (16-43)
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []

- id: rc5_mute
  label: RC5 Mute (16-13)
  kind: action
  command: "21 01 08 02 10 0D 0D"
  params: []

- id: rc5_volume_up
  label: RC5 Volume Up (16-16)
  kind: action
  command: "21 01 08 02 10 10 0D"
  params: []

- id: rc5_mode_cycle_decoding
  label: RC5 MODE Cycle Decoding Modes (16-32)
  kind: action
  command: "21 01 08 02 10 20 0D"
  params: []

- id: rc5_disp_vfd_brightness
  label: RC5 DISP VFD Brightness (16-59)
  kind: action
  command: "21 01 08 02 10 3B 0D"
  params: []

- id: rc5_direct_mode
  label: RC5 Activate DIRECT Mode (16-10)
  kind: action
  command: "21 01 08 02 10 0A 0D"
  params: []

- id: rc5_volume_down
  label: RC5 Volume Down (16-17)
  kind: action
  command: "21 01 08 02 10 11 0D"
  params: []

- id: rc5_red
  label: RC5 Red (16-41)
  kind: action
  command: "21 01 08 02 10 29 0D"
  params: []

- id: rc5_green
  label: RC5 Green (16-42)
  kind: action
  command: "21 01 08 02 10 2A 0D"
  params: []

- id: rc5_yellow
  label: RC5 Yellow (16-43)
  kind: action
  command: "21 01 08 02 10 2B 0D"
  params: []

- id: rc5_blue
  label: RC5 Blue (16-55)
  kind: action
  command: "21 01 08 02 10 37 0D"
  params: []

- id: rc5_source_radio
  label: RC5 Source Radio (16-91)
  kind: action
  command: "21 01 08 02 10 5B 0D"
  params: []

- id: rc5_source_aux
  label: RC5 Source Aux (16-99)
  kind: action
  command: "21 01 08 02 10 63 0D"
  params: []

- id: rc5_source_net
  label: RC5 Source Net (16-92)
  kind: action
  command: "21 01 08 02 10 5C 0D"
  params: []

- id: rc5_source_av
  label: RC5 Source AV (16-94)
  kind: action
  command: "21 01 08 02 10 5E 0D"
  params: []

- id: rc5_source_sat
  label: RC5 Source SAT (16-27)
  kind: action
  command: "21 01 08 02 10 1B 0D"
  params: []

- id: rc5_source_pvr
  label: RC5 Source PVR (16-96)
  kind: action
  command: "21 01 08 02 10 60 0D"
  params: []

- id: rc5_source_game
  label: RC5 Source Game (16-97)
  kind: action
  command: "21 01 08 02 10 61 0D"
  params: []

- id: rc5_source_bd
  label: RC5 Source BD (16-98)
  kind: action
  command: "21 01 08 02 10 62 0D"
  params: []

- id: rc5_source_cd
  label: RC5 Source CD (16-118)
  kind: action
  command: "21 01 08 02 10 76 0D"
  params: []

- id: rc5_source_stb
  label: RC5 Source STB (16-100)
  kind: action
  command: "21 01 08 02 10 64 0D"
  params: []

- id: rc5_source_uhd
  label: RC5 Source UHD (16-125)
  kind: action
  command: "21 01 08 02 10 7D 0D"
  params: []

- id: rc5_source_bt
  label: RC5 Source BT (16-122)
  kind: action
  command: "21 01 08 02 10 7A 0D"
  params: []

- id: rc5_source_display
  label: RC5 Source Display (16-58)
  kind: action
  command: "21 01 08 02 10 3A 0D"
  params: []

- id: rc5_power_on
  label: RC5 Power On (16-123)
  kind: action
  command: "21 01 08 02 10 7B 0D"
  params: []

- id: rc5_power_off
  label: RC5 Power Off (16-124)
  kind: action
  command: "21 01 08 02 10 7C 0D"
  params: []

# ---- AV RC5 Advanced Functions ----

- id: rc5_next_zone
  label: RC5 Change Control to Next Zone (16-95)
  kind: action
  command: "21 01 08 02 10 5F 0D"
  params: []

- id: rc5_access_bass
  label: RC5 Access Bass Control (16-39)
  kind: action
  command: "21 01 08 02 10 27 0D"
  params: []

- id: rc5_access_speaker_trim
  label: RC5 Access Speaker Trim (16-37)
  kind: action
  command: "21 01 08 02 10 25 0D"
  params: []

- id: rc5_access_treble
  label: RC5 Access Treble Control (16-14)
  kind: action
  command: "21 01 08 02 10 0E 0D"
  params: []

- id: rc5_random
  label: RC5 Random (16-76)
  kind: action
  command: "21 01 08 02 10 4C 0D"
  params: []

- id: rc5_repeat
  label: RC5 Repeat (16-49)
  kind: action
  command: "21 01 08 02 10 31 0D"
  params: []

- id: rc5_direct_mode_on
  label: RC5 Direct Mode On (16-78)
  kind: action
  command: "21 01 08 02 10 4E 0D"
  params: []

- id: rc5_direct_mode_off
  label: RC5 Direct Mode Off (16-79)
  kind: action
  command: "21 01 08 02 10 4F 0D"
  params: []

- id: rc5_multi_channel
  label: RC5 Multi Channel (16-106)
  kind: action
  command: "21 01 08 02 10 6A 0D"
  params: []

- id: rc5_stereo
  label: RC5 Stereo (16-107)
  kind: action
  command: "21 01 08 02 10 6B 0D"
  params: []

- id: rc5_dolby_surround
  label: RC5 Dolby Surround (16-110)
  kind: action
  command: "21 01 08 02 10 6E 0D"
  params: []

- id: rc5_dts_neo6_cinema
  label: RC5 DTS Neo:6 Cinema (16-111)
  kind: action
  command: "21 01 08 02 10 6F 0D"
  params: []

- id: rc5_dts_neo6_music
  label: RC5 DTS Neo:6 Music (16-112)
  kind: action
  command: "21 01 08 02 10 70 0D"
  params: []

- id: rc5_dts_neural_x
  label: RC5 DTS Neural:X (16-113)
  kind: action
  command: "21 01 08 02 10 71 0D"
  params: []

- id: rc5_logic_16
  label: RC5 Logic 16 (16-114)
  kind: action
  command: "21 01 08 02 10 72 0D"
  params: []

- id: rc5_virtual_height
  label: RC5 Virtual Height (16-115)
  kind: action
  command: "21 01 08 02 10 73 0D"
  params: []

- id: rc5_5_7_ch_stereo
  label: RC5 5/7 Ch Stereo (16-69)
  kind: action
  command: "21 01 08 02 10 45 0D"
  params: []

- id: rc5_dolby_d_ex
  label: RC5 Dolby D EX (16-23)
  kind: action
  command: "21 01 08 02 10 17 0D"
  params: []

- id: rc5_auro_matic_3d
  label: RC5 Auro Matic-3D (16-71)
  kind: action
  command: "21 01 08 02 10 47 0D"
  params: []

- id: rc5_auro_native
  label: RC5 Auro Native (16-103)
  kind: action
  command: "21 01 08 02 10 67 0D"
  params: []

- id: rc5_auro_2d
  label: RC5 Auro 2D (16-104)
  kind: action
  command: "21 01 08 02 10 68 0D"
  params: []

- id: rc5_mute_on
  label: RC5 Mute On (16-26)
  kind: action
  command: "21 01 08 02 10 1A 0D"
  params: []

- id: rc5_mute_off
  label: RC5 Mute Off (16-120)
  kind: action
  command: "21 01 08 02 10 78 0D"
  params: []

- id: rc5_fm
  label: RC5 FM (16-28)
  kind: action
  command: "21 01 08 02 10 1C 0D"
  params: []

- id: rc5_dab
  label: RC5 DAB (16-72)
  kind: action
  command: "21 01 08 02 10 48 0D"
  params: []

- id: rc5_lipsync_plus_5ms
  label: RC5 Lip Sync +5ms (16-15)
  kind: action
  command: "21 01 08 02 10 0F 0D"
  params: []

- id: rc5_lipsync_minus_5ms
  label: RC5 Lip Sync -5ms (16-101)
  kind: action
  command: "21 01 08 02 10 65 0D"
  params: []

- id: rc5_sub_trim_plus_05
  label: RC5 Sub Trim +0.5dB (16-105)
  kind: action
  command: "21 01 08 02 10 69 0D"
  params: []

- id: rc5_sub_trim_minus_05
  label: RC5 Sub Trim -0.5dB (16-108)
  kind: action
  command: "21 01 08 02 10 6C 0D"
  params: []

- id: rc5_display_off
  label: RC5 Display Off (16-31)
  kind: action
  command: "21 01 08 02 10 1F 0D"
  params: []

- id: rc5_display_l1
  label: RC5 Display L1 (16-34)
  kind: action
  command: "21 01 08 02 10 22 0D"
  params: []

- id: rc5_display_l2
  label: RC5 Display L2 (16-35)
  kind: action
  command: "21 01 08 02 10 23 0D"
  params: []

- id: rc5_balance_left
  label: RC5 Balance Left (16-38)
  kind: action
  command: "21 01 08 02 10 26 0D"
  params: []

- id: rc5_balance_right
  label: RC5 Balance Right (16-40)
  kind: action
  command: "21 01 08 02 10 28 0D"
  params: []

- id: rc5_bass_plus_1
  label: RC5 Bass +1 (16-44)
  kind: action
  command: "21 01 08 02 10 2C 0D"
  params: []

- id: rc5_bass_minus_1
  label: RC5 Bass -1 (16-56)
  kind: action
  command: "21 01 08 02 10 38 0D"
  params: []

- id: rc5_treble_plus_1
  label: RC5 Treble +1 (16-46)
  kind: action
  command: "21 01 08 02 10 2E 0D"
  params: []

- id: rc5_treble_minus_1
  label: RC5 Treble -1 (16-102)
  kind: action
  command: "21 01 08 02 10 66 0D"
  params: []

- id: rc5_zone2_follow_zone1
  label: RC5 Set Zone 2 to Follow Zone 1 (16-20)
  kind: action
  command: "21 01 08 02 10 14 0D"
  params: []

- id: rc5_zone2_power_on
  label: RC5 Zone 2 Power On (23-123)
  kind: action
  command: "21 01 08 02 17 7B 0D"
  params: []

- id: rc5_zone2_power_off
  label: RC5 Zone 2 Power Off (23-124)
  kind: action
  command: "21 01 08 02 17 7C 0D"
  params: []

- id: rc5_zone2_vol_up
  label: RC5 Zone 2 Vol+ (23-1)
  kind: action
  command: "21 01 08 02 17 01 0D"
  params: []

- id: rc5_zone2_vol_down
  label: RC5 Zone 2 Vol- (23-2)
  kind: action
  command: "21 01 08 02 17 02 0D"
  params: []

- id: rc5_zone2_mute
  label: RC5 Zone 2 Mute (23-3)
  kind: action
  command: "21 01 08 02 17 03 0D"
  params: []

- id: rc5_zone2_mute_on
  label: RC5 Zone 2 Mute On (23-4)
  kind: action
  command: "21 01 08 02 17 04 0D"
  params: []

- id: rc5_zone2_mute_off
  label: RC5 Zone 2 Mute Off (23-5)
  kind: action
  command: "21 01 08 02 17 05 0D"
  params: []

- id: rc5_zone2_cd
  label: RC5 Zone 2 CD (23-6)
  kind: action
  command: "21 01 08 02 17 06 0D"
  params: []

- id: rc5_zone2_bd
  label: RC5 Zone 2 BD (23-7)
  kind: action
  command: "21 01 08 02 17 07 0D"
  params: []

- id: rc5_zone2_stb
  label: RC5 Zone 2 STB (23-8)
  kind: action
  command: "21 01 08 02 17 08 0D"
  params: []

- id: rc5_zone2_av
  label: RC5 Zone 2 AV (23-9)
  kind: action
  command: "21 01 08 02 17 09 0D"
  params: []

- id: rc5_zone2_game
  label: RC5 Zone 2 Game (23-11)
  kind: action
  command: "21 01 08 02 17 0B 0D"
  params: []

- id: rc5_zone2_aux
  label: RC5 Zone 2 Aux (23-13)
  kind: action
  command: "21 01 08 02 17 0D 0D"
  params: []

- id: rc5_zone2_pvr
  label: RC5 Zone 2 PVR (23-15)
  kind: action
  command: "21 01 08 02 17 0F 0D"
  params: []

- id: rc5_zone2_fm
  label: RC5 Zone 2 FM (23-14)
  kind: action
  command: "21 01 08 02 17 0E 0D"
  params: []

- id: rc5_zone2_dab
  label: RC5 Zone 2 DAB (23-16)
  kind: action
  command: "21 01 08 02 17 10 0D"
  params: []

- id: rc5_zone2_usb
  label: RC5 Zone 2 USB (23-18)
  kind: action
  command: "21 01 08 02 17 12 0D"
  params: []

- id: rc5_zone2_net
  label: RC5 Zone 2 NET (23-19)
  kind: action
  command: "21 01 08 02 17 13 0D"
  params: []

- id: rc5_zone2_sat
  label: RC5 Zone 2 SAT (23-20)
  kind: action
  command: "21 01 08 02 17 14 0D"
  params: []

- id: rc5_zone2_uhd
  label: RC5 Zone 2 UHD (23-23)
  kind: action
  command: "21 01 08 02 17 17 0D"
  params: []

- id: rc5_zone2_bt
  label: RC5 Zone 2 BT (23-22)
  kind: action
  command: "21 01 08 02 17 16 0D"
  params: []

- id: rc5_select_hdmi_out_1
  label: RC5 Select HDMI Out 1 (16-73)
  kind: action
  command: "21 01 08 02 10 49 0D"
  params: []

- id: rc5_select_hdmi_out_2
  label: RC5 Select HDMI Out 2 (16-74)
  kind: action
  command: "21 01 08 02 10 4A 0D"
  params: []

- id: rc5_select_hdmi_out_both
  label: RC5 Select HDMI Out 1 & 2 (16-75)
  kind: action
  command: "21 01 08 02 10 4B 0D"
  params: []

# ---- AMX Duet DDDP discovery ----

- id: amx_dddp_query
  label: AMX Duet DDDP Discovery
  kind: query
  command: "AMX\\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [stand_by, powered_on]
  source: response_to power_query (Data 0x00=stand-by, 0x01=on)

- id: display_brightness
  type: enum
  values: [off, l1, l2]
  source: response_to display_brightness_query (0x00/0x01/0x02)

- id: headphones_connected
  type: enum
  values: [not_connected, connected]
  source: response_to headphones_query (0x00/0x01)

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, uhd, aux, display, tuner_fm, tuner_dab, net, stb, game, bt]
  source: response_to current_source_query (0x00..0x12)

- id: audio_input_type
  type: enum
  values: [analog, digital, hdmi]
  source: response_to audio_input_query (0x00/0x01/0x02)

- id: volume
  type: integer
  range: [0, 99]
  units: dB
  source: response_to volume_query

- id: mute_state
  type: enum
  values: [muted, not_muted]
  source: response_to mute_status_query (0x00/0x01)

- id: direct_mode
  type: enum
  values: [off, on]
  source: response_to direct_mode_query

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, 5_7_ch_stereo, dts_neural_x, dts_virtual_x, dolby_virtual_height, auro_native, auro_matic_3d, auro_2d]
  source: response_to decode_mode_2ch_query (0x01,0x04,0x07-0x10)

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multi_channel, dts_neural_x, dolby_surround, dts_virtual_x, dolby_virtual_height, auro_native, auro_matic_3d, auro_2d]
  source: response_to decode_mode_mch_query (0x01-0x03,0x06,0x0C-0x10)

- id: video_output_resolution
  type: enum
  values: [bypass]
  source: response_to video_output_resolution_query (0x07)

- id: menu_state
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  source: response_to menu_status_query (0x00,0x02-0x0A)

- id: tuner_preset
  type: integer
  range: [1, 50]
  source: response_to tuner_preset_query (0xFF = none)

- id: network_playback_status
  type: enum
  values: [stopped, transitioning, playing, paused]
  source: response_to network_playback_status_query (0x00-0x03)

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  source: response_to imax_enhanced_query (0x00/0x01/0x02)

- id: incoming_audio_sample_rate
  type: enum
  values: [32k, 44_1k, 48k, 88_2k, 96k, 176_4k, 192k, unknown, undetected]
  source: response_to incoming_audio_sample_rate_query

- id: incoming_audio_format
  type: enum
  values: [pcm, analog_direct, dolby_digital, dolby_digital_ex, dolby_digital_surround, dolby_digital_plus, dolby_digital_true_hd, dts, dts_96_24, dts_es_matrix, dts_es_discrete, dts_es_matrix_96_24, dts_es_discrete_96_24, dts_hd_master, dts_hd_high_res, dts_low_bit_rate, dts_core, pcm_zero, unsupported, undetected, dolby_atmos, dts_x, imax_enhanced, auro_3d]

- id: incoming_video_params
  type: struct
  fields: [h_res, v_res, refresh_hz, interlaced, aspect_ratio, color_space]
  source: response_to incoming_video_params_query

- id: bluetooth_status
  type: enum
  values: [no_connection, connected_paused, playing_sbc, playing_aac, playing_aptx, playing_aptx_hd]
  source: response_to bluetooth_status_query (0x00-0x05)

- id: zone1_osd_state
  type: enum
  values: [on, off]
  source: response_to zone1_osd_query (0x00/0x01)

- id: video_output_switching
  type: enum
  values: [hdmi1, hdmi2, hdmi_both]
  source: response_to video_output_switching_query (0x02/0x03/0x04)

- id: room_eq_state
  type: enum
  values: [off, eq1, eq2, eq3, not_calculated]
  source: response_to room_eq_query

- id: dolby_audio_mode
  type: enum
  values: [off, movie, music, night]
  source: response_to dolby_audio_query

- id: compression_state
  type: enum
  values: [off, medium, high]
  source: response_to compression_query
```

## Variables
```yaml
- id: treble_db
  type: integer
  range: [-12, 12]
  units: dB
  source: get/set via 0x35 (0x00-0x0C positive, 0x81-0x8C negative)

- id: bass_db
  type: integer
  range: [-12, 12]
  units: dB
  source: get/set via 0x36

- id: balance
  type: integer
  range: [-6, 6]
  source: get/set via 0x3B

- id: subwoofer_trim_db
  type: float
  range: [-10.0, 10.0]
  step: 0.5
  units: dB
  source: get/set via 0x3F (0x00-0x14 positive, 0x81-0x94 negative)

- id: sub_stereo_trim_db
  type: float
  range: [-10.0, 0.0]
  step: 0.5
  units: dB
  source: get/set via 0x45

- id: lipsync_ms
  type: integer
  range: [0, 250]
  step: 5
  units: ms
  source: get/set via 0x40 (0x00-0x32 in 5ms steps)

- id: input_name
  type: string
  max_length: 10
  source: get/set via 0x20

- id: tuner_preset_index
  type: integer
  range: [1, 50]
  source: get/set via 0x15

- id: tuner_frequency
  type: float
  units: MHz
  source: get via 0x16 (FM in 0.05MHz steps; reported MHz + 10's kHz)

# UNRESOLVED: many block-set commands (0x28, 0x29, 0x2A-0x33) expose a large
# composite payload of settable parameters. They are represented as block
# actions above; per-field variables not enumerated separately because the
# source documents them only as positional bytes inside the block payload.
```

## Events
```yaml
# Source states: "the AV may send messages at other times" - the device pushes
# state-change notifications (display, decode mode) using the same response
# frame format whenever a front-panel or IR input alters state.
- id: state_change_message
  description: Unsolicited status update frame emitted when state changes due to front-panel buttons or IR remote.
  frame_format: "21 <Zn> <Cc> 00 <Dl> <Data...> 0D"
  source: "State changes as a result of other inputs" section
```

## Macros
```yaml
# UNRESOLVED: source documents no canned multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults    # source requires 0xAA 0xAA confirmation pattern
  - save_secure_backup          # source requires 0x55 0x55 + 4-byte PIN confirmation
  - restore_secure_backup       # source requires 0x55 0x55 + 4-byte PIN confirmation
  - reboot                      # source requires "REBOOT" ASCII confirmation payload
interlocks:
  - "Commands 0xF0-0xFF are reserved for test functions and must never be used."
  - "Tuner-specific commands return 0x85 (Command invalid at this time) when the corresponding source is not selected."
  - "Setup-menu-blocking commands return 0x85 while the OSD setup screen is displayed."
# UNRESOLVED: no voltage/current/power interlocks stated.
```

## Notes
- Control must be enabled before use: front-panel hold DIRECT 4s for RS232, or OSD General Setup → Control = On for RS232 or IP.
- IP control over TCP port 50000 of the unit's IP (set in Network Settings).
- All transmissions framed `<St=0x21> <Zn> <Cc> <Dl> <Data> <Et=0x0D>`; responses add an `<Ac>` (answer code) byte after `<Cc>`.
- Answer codes: 0x00 OK, 0x82 zone invalid, 0x83 command not recognised, 0x84 parameter not recognised, 0x85 command invalid at this time, 0x86 invalid data length.
- AV responds within 3 seconds; RC may pipeline further commands before previous response received.
- Zone numbers: 0x01 = master (Zone 1), 0x02 = Zone 2. Zone-less commands target Zone 1.
- The protocol exposes large block-set commands (0x28 input config, 0x29 general setup, 0x2A-0x33 speaker/network/HDMI/zone/engineering). Each block has a fixed positional byte layout in the source; spec models them as single block actions, with semantics for each byte in the source rather than enumerating per-field actions.
- AMX Duet DDDP supported: device responds to `"AMX\r"` with `AMXB<Device-SDKClass=Receiver><Device-Make=JBL>...\r`. Control 4 SDDP also supported (no specific wire command — discovery-only).
- Many configuration parameters carry both positive (0x00-0x0C, 0x00-0x14) and negative (0x81-0x8C, 0x81-0x94) ranges using the high bit as a sign flag.
<!-- UNRESOLVED: firmware version compatibility ranges not stated. -->
<!-- UNRESOLVED: AMX DDDP response shows `modelname` and `x.y.z` placeholders — the literal model identifier returned at runtime is not stated. -->

## Provenance

```yaml
source_domains:
  - jblsynthesis.com
source_urls:
  - https://www.jblsynthesis.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dw51dc9ad1/pdfs/RS232_SDR35_38_SDP55_58_SH289E_E_2Jun21.pdf
retrieved_at: 2026-04-29T13:35:23.379Z
last_checked_at: 2026-06-02T17:22:39.700Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:39.700Z
matched_actions: 254
action_count: 254
confidence: medium
summary: "All 254 spec actions match source commands verbatim by Cc byte and data values; transport port 50000 and 38400bps confirmed; RC5 table covers all 0x08-routed actions; block-config commands 0x28-0x33 match source exactly. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated"
- "many block-set commands (0x28, 0x29, 0x2A-0x33) expose a large"
- "source documents no canned multi-step sequences."
- "no voltage/current/power interlocks stated."
- "firmware version compatibility ranges not stated."
- "AMX DDDP response shows `modelname` and `x.y.z` placeholders — the literal model identifier returned at runtime is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
