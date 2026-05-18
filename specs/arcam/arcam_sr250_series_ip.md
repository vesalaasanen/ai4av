---
spec_id: admin/arcam-sr250-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam SR250 Series Control Spec"
manufacturer: Arcam
model_family: SR250
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - SR250
    - AVR390
    - AVR550
    - AVR850
    - AV860
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-05-16T15:49:28.416Z
generated_at: 2026-05-16T15:49:28.416Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T15:49:28.416Z
  matched_actions: 60
  action_count: 60
  confidence: high
  summary: "All 60 spec actions map to verbatim command codes in the source with correct shapes; transport parameters confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-16
---

# Arcam SR250 Series Control Spec

## Summary

The Arcam SR250 (and related AVR390/AVR550/AVR850/AV860) is a stereo receiver / AV receiver that supports remote control via RS-232 serial and TCP/IP (port 50000). The binary protocol uses a framed packet format with a start byte (0x21), zone number, command code, data length, data bytes, and end byte (0x0D). Control must be explicitly enabled via the front panel or OSD before the RS-232 or IP interface becomes active.

<!-- UNRESOLVED: The exact set of commands supported exclusively by the SR250 vs. the broader AVR family is not fully differentiated in the source; the document covers the entire AVR390/AVR550/AVR850/AV860/SR250 family jointly. -->

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
- powerable       # inferred from power on/off commands present (RC5 codes 0x10-0x7B / 0x10-0x7C and command 0x00)
- routable        # inferred from video/source selection commands (0x0A, 0x1D) and zone routing
- queryable       # inferred from query commands returning state (0xF0 request pattern throughout)
- levelable       # inferred from volume (0x0D), treble (0x35), bass (0x36), balance (0x3B), subwoofer trim (0x3F) commands
```

## Actions

```yaml
# Command frame format (all commands):
# <0x21> <Zn> <Cc> <Dl> [Data...] <0x0D>
# Response frame format:
# <0x21> <Zn> <Cc> <Ac> <Dl> [Data...] <0x0D>
# Zones: 0x01 = Zone 1 (master), 0x02 = Zone 2
# Answer codes: 0x00=OK, 0x82=Zone Invalid, 0x83=Cmd not recognised,
#               0x84=Param not recognised, 0x85=Cmd invalid at this time, 0x86=Invalid data length
# Commands 0xF0–0xFF are reserved for test and must never be used.

- id: power_query
  label: Query Power State
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x00"
  command_data: "0xF0"
  notes: >
    Response data: 0x00 = standby, 0x01 = powered on.

- id: power_on
  label: Power On (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x7B"
  notes: >
    Uses Simulate RC5 command. RC5 code 16-123 (Power On).

- id: power_off
  label: Power Off (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x7C"
  notes: >
    Uses Simulate RC5 command. RC5 code 16-124 (Power Off).

- id: standby
  label: Standby (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x0C"
  notes: >
    RC5 code 16-12 (Standby).

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
    - name: level
      type: integer
      description: Volume level 0–99 (0x00–0x63). Send 0xF0 to query current volume.
  command_code: "0x0D"
  notes: >
    Response data returns current volume as integer 0–99.

- id: volume_up
  label: Volume Up (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x10"
  notes: >
    RC5 code 16-16.

- id: volume_down
  label: Volume Down (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x11"
  notes: >
    RC5 code 16-17.

- id: mute_query
  label: Query Mute Status
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x0E"
  command_data: "0xF0"
  notes: >
    Response: 0x00 = muted, 0x01 = not muted.

- id: mute_toggle
  label: Mute Toggle (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x0D"
  notes: >
    RC5 code 16-13 (Mute).

- id: mute_on
  label: Mute On (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x1A"
  notes: >
    RC5 code 16-26 (Mute On).

- id: mute_off
  label: Mute Off (via RC5 simulate)
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x78"
  notes: >
    RC5 code 16-120 (Mute Off).

- id: source_select
  label: Select Source (Zone 1)
  kind: action
  params:
    - name: zone
      type: byte
      description: Zone number (0x01 or 0x02)
    - name: source
      type: byte
      description: >
        0x00=Follow Zone 1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR,
        0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER(FM), 0x0C=TUNER(DAB),
        0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME. Use 0xF0 to query.
  command_code: "0x1D"
  notes: >
    Returns currently selected source code.

- id: video_source_select
  label: Select Video Input
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x0A"
  notes: >
    Data: 0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game,
    0x06=STB, 0xF0=Request current input. Returns invalid (0x85) if OSD
    setup screen is showing.

- id: audio_input_select
  label: Select Analogue/Digital Audio Input
  kind: action
  params:
    - name: zone
      type: byte
    - name: type
      type: byte
      description: >
        0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Request current.
  command_code: "0x0B"
  notes: >
    Returns invalid (0x85) if OSD setup screen is showing.

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  params:
    - name: zone
      type: byte
    - name: rc5_system
      type: byte
      description: RC5 system code (e.g. 0x10 for zone 1 functions)
    - name: rc5_command
      type: byte
      description: RC5 command code
  command_code: "0x08"
  notes: >
    Simulates an RC5 IR command. An additional status message may be sent
    as a result. See RC5 command table for full list of codes.

- id: display_brightness_set
  label: Set/Query Display Brightness
  kind: action
  params:
    - name: brightness
      type: byte
      description: >
        0xF0=Request, 0x00=Off, 0x01=L1, 0x02=L2.
  command_code: "0x01"
  notes: Zone fixed to 0x01.

- id: display_information_type
  label: Set/Query Display Information Type
  kind: action
  params:
    - name: zone
      type: byte
    - name: type
      type: byte
      description: >
        0x00=Processing, 0xE0=Cycle, 0xF0=Request current. FM: 0x01=Radio
        text, 0x02=Programme type, 0x03=Signal strength. NET/USB: 0x01=Track,
        0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate.
  command_code: "0x09"

- id: direct_mode_query
  label: Query Direct Mode Status
  kind: action
  params: []
  command_code: "0x0F"
  command_data: "0xF0"
  notes: >
    Zone fixed to 0x01. Response: 0x00=off, 0x01=on.

- id: direct_mode_on
  label: Direct Mode On (via RC5 simulate)
  kind: action
  params: []
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x4E"
  notes: RC5 code 16-78.

- id: direct_mode_off
  label: Direct Mode Off (via RC5 simulate)
  kind: action
  params: []
  command_code: "0x08"
  command_data: "Data1=0x10, Data2=0x4F"
  notes: RC5 code 16-79.

- id: decode_mode_2ch_query
  label: Query Decode Mode (2ch)
  kind: action
  params: []
  command_code: "0x10"
  command_data: "0xF0"
  notes: >
    Zone fixed to 0x01. Response: 0x01=Stereo, 0x04=Dolby Surround,
    0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo,
    0x0A=DTS Neural:X, 0x0C=DTS Virtual:X.

- id: decode_mode_mch_query
  label: Query Decode Mode (MCH)
  kind: action
  params: []
  command_code: "0x11"
  command_data: "0xF0"
  notes: >
    Zone fixed to 0x01. Response: 0x01=Stereo down-mix, 0x02=Multi-channel,
    0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0C=DTS Virtual:X.

- id: fm_genre_query
  label: Query FM Genre
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x03"
  command_data: "0xF0"
  notes: >
    Returns FM programme type as ASCII string. Returns 0x85 if FM not selected.

- id: rds_info_query
  label: Query RDS Information
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x12"
  command_data: "0xF0"
  notes: >
    Returns RDS text as ASCII string. Returns 0x85 if FM not selected.

- id: software_version_query
  label: Query Software Version
  kind: action
  params:
    - name: component
      type: byte
      description: >
        0xF0=RS232 version, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP.
  command_code: "0x04"
  notes: Zone fixed to 0x01.

- id: restore_factory_defaults
  label: Restore Factory Default Settings
  kind: action
  params: []
  command_code: "0x05"
  command_data: "Data1=0xAA, Data2=0xAA"
  notes: >
    Requires two 0xAA confirmation bytes to avoid accidental restore. Zone 0x01.

- id: save_restore_secure_backup
  label: Save/Restore Secure Backup
  kind: action
  params:
    - name: operation
      type: byte
      description: "0x00=Save, 0x01=Restore"
    - name: pin
      type: bytes
      description: "4-digit PIN (Data4–Data7)"
  command_code: "0x06"
  notes: >
    Requires confirmation bytes 0x55 0x55 plus 4 PIN digits. Returns 0x85
    if no secure copy exists or if another save is in progress.

- id: headphone_query
  label: Query Headphone Connection Status
  kind: action
  params: []
  command_code: "0x02"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Response: 0x00=not connected, 0x01=connected.

- id: headphone_override
  label: Set Headphone Override (mute relay)
  kind: action
  params:
    - name: zone
      type: byte
    - name: state
      type: byte
      description: "0x00=Clear (speakers muted if phones present), 0x01=Set (speakers unmuted)"
  command_code: "0x1F"

- id: video_output_resolution_query
  label: Query Video Output Resolution
  kind: action
  params: []
  command_code: "0x13"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i,
    0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4K.

- id: incoming_video_params_query
  label: Query Incoming Video Parameters
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x42"
  command_data: "0xF0"
  notes: >
    Returns 7 bytes: horizontal resolution (2 bytes MSB/LSB), vertical
    resolution (2 bytes), refresh rate, interlaced flag (0=progressive,
    1=interlaced), aspect ratio (0x00=undefined, 0x01=4:3, 0x02=16:9).

- id: incoming_audio_format_query
  label: Query Incoming Audio Format
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x43"
  command_data: "0xF0"
  notes: >
    Returns 2 bytes: Data1=stream format (PCM=0x00, Dolby Digital=0x02, DTS=0x07,
    Dolby Atmos=0x16, DTS:X=0x17, etc.), Data2=channel configuration.

- id: incoming_audio_sample_rate_query
  label: Query Incoming Audio Sample Rate
  kind: action
  params: []
  command_code: "0x44"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz,
    0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected.

- id: menu_status_query
  label: Query Open Menu Status
  kind: action
  params: []
  command_code: "0x14"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Response: 0x00=no menu, 0x02=Setup, 0x03=Trim, 0x04=Bass,
    0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB.

- id: tuner_preset_set
  label: Set/Query Tuner Preset
  kind: action
  params:
    - name: zone
      type: byte
    - name: preset
      type: byte
      description: "0x01–0x32 (1–50) to select, 0xF0 to query"
  command_code: "0x15"
  notes: >
    Response: 0xFF=no preset selected, 0x01–0x32=current preset number.
    Returns 0x85 if tuner not selected.

- id: tune_fm
  label: Tune FM Frequency
  kind: action
  params:
    - name: zone
      type: byte
    - name: direction
      type: byte
      description: "0x00=Decrement, 0x01=Increment, 0xF0=Request current"
  command_code: "0x16"
  notes: >
    Steps in 0.05MHz increments. Returns 2 bytes: MHz and 10's kHz.
    Returns 0x85 if tuner not selected.

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  params:
    - name: direction
      type: byte
      description: "0x01=Scan up, 0x02=Scan down"
  command_code: "0x23"
  notes: >
    Zone 0x01. Only valid on FM input. Response data 0xFF=scanning.

- id: dab_scan
  label: DAB Scan
  kind: action
  params: []
  command_code: "0x24"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Only valid on DAB input. Response data 0xFF=scanning.

- id: dab_station_query
  label: Query Current DAB Station
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x18"
  command_data: "0xF0"
  notes: >
    Returns 16 ASCII bytes (padded with spaces). Returns 0x85 if DAB not selected.

- id: dab_genre_query
  label: Query DAB Programme Type/Category
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x19"
  command_data: "0xF0"
  notes: >
    Returns 16 ASCII bytes (padded). Returns 0x85 if DAB not selected.

- id: dab_dls_query
  label: Query DLS/PDT DAB Radio Text
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x1A"
  command_data: "0xF0"
  notes: >
    Returns 128 ASCII bytes (padded). Returns 0x85 if DAB not selected.

- id: preset_details_query
  label: Query Tuner Preset Details
  kind: action
  params:
    - name: zone
      type: byte
    - name: preset_number
      type: byte
      description: "0x01–0x32 (1–50)"
  command_code: "0x1B"
  notes: >
    Returns preset number, type (0x01=FM freq, 0x02=FM RDS, 0x03=DAB),
    frequency data and station name in ASCII.

- id: network_playback_status_query
  label: Query Network Playback Status
  kind: action
  params:
    - name: zone
      type: byte
  command_code: "0x1C"
  command_data: "0xF0"
  notes: >
    Response Data1: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing.
    Remaining bytes: folder or file name in ASCII. Returns 0x85 if NET not selected.

- id: imax_enhanced_set
  label: Set/Query IMAX Enhanced
  kind: action
  params:
    - name: zone
      type: byte
    - name: mode
      type: byte
      description: "0xF0=Query, 0xF1=Auto, 0xF2=On, 0xF3=Off"
  command_code: "0x0C"
  notes: >
    Response: 0x00=Off, 0x01=On, 0x02=Auto.

- id: treble_set
  label: Set/Query Treble Equalisation
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x0C = 0dB to +12dB; 0x81–0x8C = -1dB to -12dB;
        0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB.
  command_code: "0x35"

- id: bass_set
  label: Set/Query Bass Equalisation
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x0C = 0dB to +12dB; 0x81–0x8C = -1dB to -12dB;
        0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB.
  command_code: "0x36"

- id: room_eq_set
  label: Set/Query Room Equalisation
  kind: action
  params:
    - name: zone
      type: byte
    - name: mode
      type: byte
      description: "0xF0=Request; 0xF1=On; 0xF2=Off"
  command_code: "0x37"
  notes: >
    Response: 0x00=off, 0x01=on, 0x02=not calculated (off).

- id: dolby_volume_set
  label: Set/Query Dolby Volume
  kind: action
  params:
    - name: zone
      type: byte
    - name: mode
      type: byte
      description: "0x00=Off; 0x01=On; 0xF0=Request"
  command_code: "0x38"

- id: dolby_leveller_set
  label: Set/Query Dolby Leveller
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x0A = 0–10; 0xF0=Request; 0xF1=Increment; 0xF2=Decrement;
        0xFF=Off.
  command_code: "0x39"

- id: dolby_volume_calibration_set
  label: Set/Query Dolby Volume Calibration Offset
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x0F = 0 to 15dB; 0x80–0x8F = -1 to -15dB;
        0xF0=Request; 0xF1=Increment 1dB; 0xF2=Decrement 1dB.
  command_code: "0x3A"

- id: balance_set
  label: Set/Query Balance
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x06 = 0 to 6; 0x81–0x86 = -1 to -6;
        0xF0=Request; 0xF1=Increment; 0xF2=Decrement.
  command_code: "0x3B"

- id: subwoofer_trim_set
  label: Set/Query Subwoofer Trim
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x14 = +0 to +10dB in 0.5dB steps; 0x81–0x94 = -0.5 to -10dB;
        0xF0=Request; 0xF1=Increment 0.5dB; 0xF2=Decrement 0.5dB.
  command_code: "0x3F"

- id: sub_stereo_trim_set
  label: Set/Query Sub Stereo Trim
  kind: action
  params:
    - name: value
      type: byte
      description: >
        0x00=0dB; 0x81–0x94 = -0.5 to -10dB in 0.5dB steps;
        0xF0=Request; 0xF1=Increment 0.5dB; 0xF2=Decrement 0.5dB.
  command_code: "0x45"
  notes: Zone 0x01.

- id: lipsync_delay_set
  label: Set/Query Lipsync Delay
  kind: action
  params:
    - name: zone
      type: byte
    - name: value
      type: byte
      description: >
        0x00–0x32 = delay in 5ms steps (0x00=0ms, 0x32=250ms);
        0xF0=Request; 0xF1=Increment 5ms; 0xF2=Decrement 5ms.
  command_code: "0x40"

- id: compression_set
  label: Set/Query Dynamic Range Compression
  kind: action
  params:
    - name: zone
      type: byte
    - name: mode
      type: byte
      description: "0x00=Off; 0x01=Medium; 0x02=High; 0xF0=Request"
  command_code: "0x41"

- id: osd_set
  label: Set/Query Zone 1 OSD On/Off
  kind: action
  params:
    - name: mode
      type: byte
      description: "0xF0=Request; 0xF1=On; 0xF2=Off"
  command_code: "0x4E"
  notes: Zone 0x01. Response: 0x00=On, 0x01=Off.

- id: hdmi_output_set
  label: Set/Query HDMI Video Output Switching
  kind: action
  params:
    - name: output
      type: byte
      description: >
        0x02=HDMI Output 1; 0x03=HDMI Output 2; 0x04=HDMI Output 1&2;
        0xF0=Request current.
  command_code: "0x4F"
  notes: Zone 0x01.

- id: input_name_set
  label: Set/Query Input Name
  kind: action
  params:
    - name: zone
      type: byte
    - name: name
      type: string
      description: "ASCII name up to 10 characters, or 0xF0 to query"
  command_code: "0x20"
  notes: >
    Query response is padded to 10 bytes. Set uses Dl=name length.

- id: heartbeat
  label: Heartbeat
  kind: action
  params: []
  command_code: "0x25"
  command_data: "0xF0"
  notes: >
    Zone 0x01. Checks connection and resets EuP standby timer. Response 0x00.

- id: reboot
  label: Reboot Unit
  kind: action
  params: []
  command_code: "0x26"
  command_data: "Data: 0x52 0x45 0x42 0x4F 0x4F 0x54 (\"REBOOT\" ASCII)"
  notes: >
    Zone 0x01. Dl=0x06. Forces a hardware reboot.
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [standby, on]
  command_code: "0x00"
  notes: >
    Data 0x00=standby, 0x01=on. Sent unsolicited when power state changes via
    front panel or IR.

- id: volume_level
  type: integer
  range: [0, 99]
  command_code: "0x0D"
  notes: >
    Integer 0–99. Returned on volume change or explicit query.

- id: mute_state
  type: enum
  values: [muted, not_muted]
  command_code: "0x0E"
  notes: >
    0x00=muted, 0x01=not muted.

- id: current_source
  type: enum
  values: [follow_z1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  command_code: "0x1D"
  notes: >
    Unsolicited on source change. Codes: 0x00=Follow Z1, 0x01=CD, 0x02=BD,
    0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY,
    0x0B=FM, 0x0C=DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME.

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, ch57_stereo, dts_neural_x, dts_virtual_x]
  command_code: "0x10"

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multi_channel, dts_es_neural_x, dolby_surround, dts_virtual_x]
  command_code: "0x11"

- id: direct_mode_state
  type: enum
  values: [off, on]
  command_code: "0x0F"

- id: display_brightness
  type: enum
  values: [off, l1, l2]
  command_code: "0x01"

- id: headphone_connected
  type: enum
  values: [not_connected, connected]
  command_code: "0x02"

- id: incoming_audio_format
  type: object
  command_code: "0x43"
  notes: >
    Two bytes: stream format and channel configuration. See Actions for full
    value enumeration.

- id: incoming_audio_sample_rate
  type: enum
  values: [32khz, 44_1khz, 48khz, 88_2khz, 96khz, 176_4khz, 192khz, unknown, undetected]
  command_code: "0x44"

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  command_code: "0x13"

- id: incoming_video_params
  type: object
  command_code: "0x42"
  notes: >
    7 bytes: h_res_msb, h_res_lsb, v_res_msb, v_res_lsb, refresh_rate,
    interlaced_flag, aspect_ratio.

- id: network_playback_status
  type: object
  command_code: "0x1C"
  notes: >
    Data1: state (navigating/playing/paused/busy). Remaining: name in ASCII.

- id: tuner_preset
  type: integer
  range: [1, 50]
  command_code: "0x15"
  notes: >
    0xFF = no preset selected.

- id: fm_frequency
  type: object
  command_code: "0x16"
  notes: >
    Two bytes: MHz and 10's kHz of current FM frequency.

- id: treble_level
  type: integer
  command_code: "0x35"
  notes: >
    0x00–0x0C = 0 to +12dB; 0x81–0x8C = -1 to -12dB.

- id: bass_level
  type: integer
  command_code: "0x36"
  notes: >
    0x00–0x0C = 0 to +12dB; 0x81–0x8C = -1 to -12dB.

- id: balance
  type: integer
  command_code: "0x3B"
  notes: >
    0x00–0x06 = 0 to 6 (right); 0x81–0x86 = -1 to -6 (left).

- id: subwoofer_trim
  type: integer
  command_code: "0x3F"

- id: lipsync_delay
  type: integer
  command_code: "0x40"
  notes: Value in 5ms steps.

- id: compression_mode
  type: enum
  values: [off, medium, high]
  command_code: "0x41"

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  command_code: "0x37"

- id: dolby_volume_state
  type: enum
  values: [off, on]
  command_code: "0x38"

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  command_code: "0x0C"

- id: menu_open
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  command_code: "0x14"

- id: hdmi_output
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  command_code: "0x4F"
```

## Variables

```yaml
# UNRESOLVED: No persistent settable parameters beyond those covered in Actions/Feedbacks identified in source.
```

## Events

```yaml
# Unsolicited notifications — the device sends state update messages (answer code 0x00)
# any time the state changes due to front-panel or IR input.
# Examples: power state change, volume change, source change, decode mode change,
# display brightness change.
# The frame format is identical to command responses with Ac=0x00 (status update).
# UNRESOLVED: Exhaustive list of unsolicited event command codes not explicitly enumerated
# in the source beyond examples given; inferred from "Any change resulting from these
# inputs is relayed to the RC using the appropriate message type."
```

## Macros

```yaml
# UNRESOLVED: No multi-step sequences described explicitly in source.
```

## Safety

```yaml
confirmation_required_for:
  - restore_factory_defaults  # requires Data1=0xAA, Data2=0xAA confirmation pattern
  - save_restore_secure_backup  # requires Data2=0x55, Data3=0x55 confirmation pattern plus PIN
  - reboot  # requires "REBOOT" ASCII string as data payload
interlocks:
  - id: control_must_be_enabled
    description: >
      IP and RS-232 control are disabled by default for minimum standby power
      consumption. Control must be explicitly enabled via the front panel
      (hold DIRECT button 4 seconds) or via the OSD menu before any commands
      will be accepted.
  - id: tuner_input_required
    description: >
      Tuner control commands (0x15, 0x16, 0x23, 0x24, 0x18, 0x19, 0x1A) return
      answer code 0x85 (Command invalid at this time) when the tuner input is
      not selected.
  - id: network_input_required
    description: >
      Network playback status command (0x1C) returns 0x85 when NET is not selected.
  - id: osd_setup_lock
    description: >
      Video selection (0x0A) and audio input selection (0x0B) return 0x85 when
      the OSD setup screen is displayed.
  - id: reserved_commands_forbidden
    description: >
      Commands 0xF0–0xFF are reserved for test functions and must never be used
      in production control systems.
```

## Notes

**Protocol framing.** All commands and responses use the same binary frame structure: `0x21 <Zn> <Cc> [<Ac>] <Dl> [Data...] 0x0D`. The 0x21 byte is the start-of-transmission marker and 0x0D is the carriage return terminator.

**Zone support.** Zone 1 (0x01) is the master zone. Zone 2 (0x02) provides a subset of controls. Zone-less commands implicitly target Zone 1.

**AMX Duet compatibility.** The SR250 supports AMX Duet Dynamic Device Discovery Protocol (DDDP). Command: `"AMX\r"` returns a device identification string including model and protocol revision.

**Response timing.** The device responds to each command within 3 seconds. The controlling system may send additional commands before receiving the previous response.

**Unsolicited state updates.** State changes from front-panel buttons or IR remote are forwarded to the controlling system using standard response frames with answer code 0x00.

**IP control activation.** IP control is on port 50000 of the unit's IP address (configurable in Network Settings menu). Must be enabled via OSD.

**RS-232 activation.** Press and hold the front panel DIRECT button for 4 seconds until "RS232 CONTROL ON" is displayed on the VFD, or enable via the OSD General Setup > Control menu.

**RC5 IR simulation.** Any IR function available on the physical remote can be sent via command 0x08 (Simulate RC5 IR Command), giving access to functions not directly addressed by dedicated command codes.

<!-- UNRESOLVED: The source document does not specify whether all listed commands apply equally to the SR250 vs. the broader AVR family; certain features (DAB tuner, specific decode modes) may not be present on all models. -->
<!-- UNRESOLVED: Maximum concurrent TCP connections and connection keep-alive behavior not documented in source. -->
<!-- UNRESOLVED: Whether IP control requires the network to be configured via DHCP or supports static IP configuration is not covered in the protocol document (implied by "Network Settings menu" reference). -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-05-16T15:49:28.416Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T15:49:28.416Z
matched_actions: 60
action_count: 60
confidence: high
summary: "All 60 spec actions map to verbatim command codes in the source with correct shapes; transport parameters confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
