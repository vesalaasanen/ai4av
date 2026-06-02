---
spec_id: admin/arcam-avr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVR Series (AVR390/AVR550/AVR850/AV860/SR250) Control Spec"
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
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:49.892Z
last_checked_at: 2026-06-02T21:39:48.585Z
generated_at: 2026-06-02T21:39:48.585Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version range not stated in source"
  - "Settable numeric parameters (volume, treble, bass, balance, etc.) are"
  - "unsolicited notification format not specified in source."
  - "no multi-step macro sequences are described in the source."
  - "firmware version compatibility ranges not stated; AMX Duet supports all five listed models, but per-subsystem feature differences (e.g. DAB on AVR450/750 only) are partially model-dependent and the source does not enumerate the full per-model feature matrix."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:39:48.585Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions match source command codes verbatim; transport port 50000, baud 38400, 8N1 all confirmed in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Arcam AVR Series (AVR390/AVR550/AVR850/AV860/SR250) Control Spec

## Summary
Binary RS-232 / TCP/IP control protocol for the Arcam AVR Series AV receivers (AVR390, AVR550, AVR850, AV860, SR250). All commands and responses share a common framed format (`St Zn Cc Dl Data Et`) and the same byte-level protocol is presented over both RS-232 and IP. IP control uses TCP port 50000; RS-232 uses 38,400 bps, 8N1, no flow control. AMX Duet discovery is also supported as an ASCII command.

<!-- UNRESOLVED: firmware version range not stated in source -->

## Transport
```yaml
# Source documents BOTH RS-232 and IP control carrying the same byte protocol.
# IP control: "IP control is via port 50000 of the IP address of the unit"
# RS-232: 38,400 bps, 1 start / 8 data / 1 stop / no parity / no flow control.
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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence: power state query/commands present (0x00, RC5 standby/power on/off),
# source/routing commands present (0x0A, 0x0B, 0x1D), query commands returning
# state present (0x00-0x44, 0x1C), volume/level commands present (0x0D, 0x35,
# 0x36, 0x3B, 0x3F, 0x40, 0x45, 0x41, 0x38, 0x39, 0x3A).
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
# Frame: St(0x21) Zn Cc Dl Data Et(0x0D)
# Zones: 0x01 = Zone 1 (master), 0x02 = Zone 2.
# Variable placeholders are shown as {name}.
# "kind: query" indicates the action reads device state; "kind: action" performs a set/control.

# ----- System (0x00 - 0x09) -----
- id: power_query
  label: Power State (Zone)
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: display_brightness_query
  label: Display Brightness
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []

- id: headphones_query
  label: Headphones Connected
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []

- id: fm_genre_query
  label: FM Programme Type
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: software_version_query
  label: Software Version
  kind: query
  command: "0x21 0x01 0x04 0x01 {subsystem} 0x0D"
  params:
    - name: subsystem
      type: enum
      values: [0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5]
      description: "0xF0=RS232 0xF1=Host 0xF2=OSD 0xF3=DSP 0xF4=NET 0xF5=IAP"

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_secure_copy
  label: Save/Restore Secure Settings
  kind: action
  command: "0x21 0x01 0x06 0x07 {op} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D"
  params:
    - name: op
      type: enum
      values: [0x00, 0x01]
      description: "0x00=Save secure backup, 0x01=Restore secure backup"
    - name: pin1
      type: integer
      description: PIN digit 1
    - name: pin2
      type: integer
      description: PIN digit 2
    - name: pin3
      type: integer
      description: PIN digit 3
    - name: pin4
      type: integer
      description: PIN digit 4

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 {zone} 0x08 0x02 {rc5_system} {rc5_command} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: rc5_system
      type: integer
      description: RC5 system code (e.g. 0x10 for main, 0x17 for Zone 2)
    - name: rc5_command
      type: integer
      description: RC5 command code (see RC5 code table in Notes)

- id: display_information_type
  label: Display Information Type
  kind: action
  command: "0x21 {zone} 0x09 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: mode
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0xE0, 0xF0]
      description: |
        Source-dependent. 0x00=Processing (all),
        0xE0=Cycle displayable info, 0xF0=Request current type.
        FM: 0x01=Radio text 0x02=Programme type 0x03=Signal strength.
        DAB (AVR450/750 only): 0x01=Radio text 0x02=Genre 0x03=Signal quality 0x04=Bit rate.
        NET/USB: 0x01=Track 0x02=Artist 0x03=Album 0x04=Audio type 0x05=Rate.

# ----- Input (0x0A - 0x0B) -----
- id: video_selection
  label: Video Selection
  kind: action
  command: "0x21 0x01 0x0A 0x01 {video_source} 0x0D"
  params:
    - name: video_source
      type: enum
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0xF0]
      description: "0x00=BD 0x01=SAT 0x02=AV 0x03=PVR 0x04=VCR 0x05=Game 0x06=STB 0xF0=Request current input"

- id: select_analogue_digital
  label: Select Analogue / Digital / HDMI Audio
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {audio_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: audio_type
      type: enum
      values: [0x00, 0x01, 0x02, 0xF0]
      description: "0x00=Analogue 0x01=Digital 0x02=HDMI 0xF0=Request current type"

# ----- IMAX Enhanced (0x0C) -----
- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  command: "0x21 {zone} 0x0C 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: mode
      type: enum
      values: [0xF0, 0xF1, 0xF2, 0xF3]
      description: "0xF0=Request current 0xF1=Auto 0xF2=On 0xF3=Off"

# ----- Output / Volume (0x0D - 0x14) -----
- id: set_request_volume
  label: Set / Request Volume
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {level} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: level
      type: integer
      description: "0x00 (0) to 0x63 (99) to set; 0xF0 to request current"

- id: request_mute_status
  label: Mute Status
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_direct_mode_status
  label: Direct Mode Status
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_2ch
  label: Decode Mode (2-channel)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_mch
  label: Decode Mode (Multi-channel)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: request_rds_information
  label: RDS Information
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_video_output_resolution
  label: Video Output Resolution
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []

- id: request_menu_status
  label: Open Menu Status
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []

# ----- Tuner / Radio (0x15 - 0x19, 0x23, 0x24) -----
- id: request_tuner_preset
  label: Tuner Preset
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: "Preset 0x01-0x32 (1-50) to select; 0xF0 to request current"

- id: tune
  label: Tune (FM)
  kind: action
  command: "0x21 {zone} 0x16 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: direction
      type: enum
      values: [0x00, 0x01, 0xF0]
      description: "0x00=Decrement 0.05MHz 0x01=Increment 0.05MHz 0xF0=Request current"

- id: request_dab_station
  label: DAB Station
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_prog_type_category
  label: DAB Programme Type / Category
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_dls_pdt_info
  label: DAB DLS / PDT Information
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_preset_details
  label: Preset Details
  kind: query
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: "Preset number 0x01-0x32 (1-50)"

- id: network_playback_status
  label: Network Playback Status
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

# ----- Source / Input routing (0x1D, 0x1F) -----
- id: request_current_source
  label: Current Source
  kind: query
  command: "0x21 {zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: headphone_override
  label: Headphone Override (Speaker Relays)
  kind: action
  command: "0x21 {zone} 0x1F 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: enum
      values: [0x00, 0x01]
      description: "0x00=Clear (speakers muted if headphones present) 0x01=Set (speakers unmuted if headphones present)"

# ----- Input naming (0x20) -----
- id: set_request_input_name
  label: Set / Request Input Name
  kind: action
  command: "0x21 0x01 0x20 0x{n} {ascii_bytes} 0x0D"
  params:
    - name: n
      type: integer
      description: "Data length: 0x01 for query (0xF0), 0x02-0x0A for set (1-10 ASCII characters)"
    - name: ascii_bytes
      type: string
      description: "ASCII bytes for the new input name; 0xF0 to query the current name"

# ----- Scan / Maintenance (0x23 - 0x26) -----
- id: fm_scan
  label: FM Scan
  kind: action
  command: "0x21 0x01 0x23 0x01 {direction} 0x0D"
  params:
    - name: direction
      type: enum
      values: [0x01, 0x02]
      description: "0x01=Scan up 0x02=Scan down"

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
  label: Reboot
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []

# ----- Setup adjustments (0x35 - 0x41) -----
- id: treble_equalisation
  label: Treble Equalisation
  kind: action
  command: "0x21 {zone} 0x35 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Request 0xF1=+1dB 0xF2=-1dB"

- id: bass_equalisation
  label: Bass Equalisation
  kind: action
  command: "0x21 {zone} 0x36 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Request 0xF1=+1dB 0xF2=-1dB"

- id: room_equalisation
  label: Room Equalisation
  kind: action
  command: "0x21 {zone} 0x37 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: mode
      type: enum
      values: [0xF0, 0xF1, 0xF2]
      description: "0xF0=Request 0xF1=On 0xF2=Off"

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "0x21 {zone} 0x38 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: enum
      values: [0x00, 0x01, 0xF0]
      description: "0x00=Off 0x01=On 0xF0=Request current"

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  command: "0x21 {zone} 0x39 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0A = level 0-10; 0xF0=Request 0xF1=Increment 0xF2=Decrement 0xFF=Off"

- id: dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset
  kind: action
  command: "0x21 {zone} 0x3A 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0F = 0-15dB; 0x80-0x8F = -1 to -15dB; 0xF0=Request 0xF1=+1dB 0xF2=-1dB"

- id: balance
  label: Balance
  kind: action
  command: "0x21 {zone} 0x3B 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x06 = 0-6; 0x81-0x86 = -1 to -6; 0xF0=Request 0xF1=+1 0xF2=-1"

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: "0x21 {zone} 0x3F 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x14 = positive trim in 0.5dB steps; 0x81-0x94 = negative trim in 0.5dB steps; 0xF0=Request 0xF1=+0.5dB 0xF2=-0.5dB"

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  command: "0x21 {zone} 0x40 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x32 = 0-250ms in 5ms steps; 0xF0=Request 0xF1=+5ms 0xF2=-5ms"

- id: compression
  label: Compression
  kind: action
  command: "0x21 {zone} 0x41 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: enum
      values: [0x00, 0x01, 0x02, 0xF0]
      description: "0x00=Off 0x01=Medium 0x02=High 0xF0=Request"

# ----- Video / audio input info queries (0x42 - 0x44) -----
- id: request_incoming_video_parameters
  label: Incoming Video Parameters
  kind: query
  command: "0x21 {zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_incoming_audio_format
  label: Incoming Audio Format
  kind: query
  command: "0x21 {zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_incoming_audio_sample_rate
  label: Incoming Audio Sample Rate
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  params: []

# ----- Sub stereo trim, OSD, video output (0x45, 0x4E, 0x4F) -----
- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "0x21 0x01 0x45 0x01 {value} 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00 = 0dB; 0x81-0x94 = -0.5dB to -10dB in 0.5dB steps; 0xF0=Request 0xF1=+0.5dB 0xF2=-0.5dB"

- id: set_request_zone1_osd
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 {mode} 0x0D"
  params:
    - name: mode
      type: enum
      values: [0xF0, 0xF1, 0xF2]
      description: "0xF0=Request 0xF1=On 0xF2=Off"

- id: set_request_video_output_switching
  label: HDMI Video Output Switching
  kind: action
  command: "0x21 0x01 0x4F 0x01 {output} 0x0D"
  params:
    - name: output
      type: enum
      values: [0x02, 0x03, 0x04, 0xF0]
      description: "0x02=HDMI Out 1 0x03=HDMI Out 2 0x04=Both 0xF0=Request current"

# ----- AMX Duet discovery -----
- id: amx_duet_discovery
  label: AMX Duet Discovery
  kind: action
  command: "AMX\r"
  params: []
  notes: "Send ASCII string 'AMX' followed by 0x0D. Device replies with AMXB<...> string identifying make/model/protocol version."
```

## Feedbacks
```yaml
# Each entry describes the data payload returned by a query command.
# Some values are sent unsolicited when state changes (per source p. 8).

- id: power_state
  type: enum
  values: [standby, on]
  command: "0x00 (response Data byte 0x00=standby, 0x01=on)"

- id: display_brightness
  type: enum
  values: [off, L1, L2]
  command: "0x01 (response Data byte 0x00=off, 0x01=L1, 0x02=L2)"

- id: headphones_connected
  type: enum
  values: [not_connected, connected]
  command: "0x02 (response Data byte 0x00=not connected, 0x01=connected)"

- id: fm_programme_type
  type: string
  command: "0x03 (response Data = ASCII programme type)"

- id: software_version
  type: object
  command: "0x04 (response: Data1=subsystem echo, Data2=major, Data3=minor)"

- id: current_source
  type: enum
  values: [follow_zone_1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  command: "0x1D (response Data: 0x00=Follow Z1 0x01=CD 0x02=BD 0x03=AV 0x04=SAT 0x05=PVR 0x06=VCR 0x08=AUX 0x09=DISPLAY 0x0B=TUNER(FM) 0x0C=TUNER(DAB; AVR450/750 only) 0x0E=NET 0x0F=USB 0x10=STB 0x11=GAME)"

- id: headphone_override_relay
  type: enum
  values: [clear, set]
  command: "0x1F (response Data1)"

- id: input_name
  type: string
  command: "0x20 (response Data: up to 10 ASCII characters)"

- id: fm_scan_status
  type: enum
  values: [scanning]
  command: "0x23 (response Data1=0xFF while scanning)"

- id: dab_scan_status
  type: enum
  values: [scanning]
  command: "0x24 (response Data1=0xFF while scanning)"

- id: heartbeat_status
  type: enum
  values: [ok]
  command: "0x25 (response Data1=0x00)"

- id: reboot_status
  type: enum
  values: [ok]
  command: "0x26 (response Data1=0x00)"

- id: volume
  type: integer
  command: "0x0D (response Data1 0x00-0x63; units = dB)"

- id: mute_status
  type: enum
  values: [muted, not_muted]
  command: "0x0E (response Data1 0x00=muted 0x01=not muted)"

- id: direct_mode
  type: enum
  values: [off, on]
  command: "0x0F (response Data1 0x00=off 0x01=on)"

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, five_seven_ch_stereo, dts_neural_x, reserved, dts_virtual_x]
  command: "0x10 (response Data1: 0x01=Stereo 0x04=Dolby Surround 0x07=Neo:6 Cinema 0x08=Neo:6 Music 0x09=5/7 Ch Stereo 0x0A=DTS Neural:X 0x0B=Reserved 0x0C=DTS Virtual:X)"

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  command: "0x11 (response Data1: 0x01=Stereo down-mix 0x02=Multi-channel 0x03=DTS-ES/Neural:X 0x06=Dolby Surround 0x0B=Reserved 0x0C=DTS Virtual:X)"

- id: rds_information
  type: string
  command: "0x12 (response Data = RDS text in ASCII)"

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  command: "0x13 (response Data1: 0x02=SD Progressive 0x03=720p 0x04=1080i 0x05=1080p 0x06=Preferred 0x07=Bypass 0x08=4k)"

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  command: "0x14 (response Data1: 0x00=None 0x02=Setup 0x03=Trim 0x04=Bass 0x05=Treble 0x06=Sync 0x07=Sub 0x08=Tuner 0x09=Network 0x0A=USB)"

- id: tuner_preset
  type: integer
  command: "0x15 (response Data1: 0xFF=no preset; 0x01-0x32 = preset number)"

- id: fm_frequency
  type: object
  command: "0x16 (response Data1=MHz, Data2=10's of kHz)"

- id: dab_station
  type: string
  command: "0x18 (response Data: 16 bytes ASCII, space padded)"

- id: dab_programme_type
  type: string
  command: "0x19 (response Data: 16 bytes ASCII, space padded)"

- id: dab_dls_pdt
  type: string
  command: "0x1A (response Data: 128 bytes ASCII, space padded)"

- id: preset_details
  type: object
  command: "0x1B (response: preset number, type, frequency, name)"

- id: network_playback
  type: object
  command: "0x1C (response Data1: 0x00=Navigating 0x01=Playing 0x02=Paused 0xFF=Busy; Data2+ = name)"

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  command: "0x0C (response Data1: 0x00=Off 0x01=On 0x02=Auto)"

- id: treble_value
  type: integer
  command: "0x35 (response Data1: 0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB)"

- id: bass_value
  type: integer
  command: "0x36 (response Data1: 0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB)"

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  command: "0x37 (response Data1: 0x00=Off 0x01=On 0x02=Not calculated/off)"

- id: dolby_volume_state
  type: enum
  values: [off, on]
  command: "0x38 (response Data1: 0x00=Off 0x01=On)"

- id: dolby_leveller_setting
  type: integer
  command: "0x39 (response Data1: 0x00-0x0A = level 0-10; 0xFF = Off)"

- id: dolby_volume_calibration_offset
  type: integer
  command: "0x3A (response Data1: 0x00-0x0F = 0-15dB; 0x80-0x8F = -1 to -15dB)"

- id: balance
  type: integer
  command: "0x3B (response Data1: 0x00-0x06 = 0-6; 0x81-0x86 = -1 to -6)"

- id: subwoofer_trim
  type: integer
  command: "0x3F (response Data1: 0x00-0x14 positive; 0x81-0x94 negative; 0.5dB steps)"

- id: lipsync_delay
  type: integer
  command: "0x40 (response Data1: 0x00-0x32 in 5ms steps)"

- id: compression
  type: enum
  values: [off, medium, high]
  command: "0x41 (response Data1: 0x00=Off 0x01=Medium 0x02=High)"

- id: incoming_video_parameters
  type: object
  command: "0x42 (response: 7 bytes - h-res MSB/LSB, v-res MSB/LSB, refresh, interlaced flag, aspect ratio)"

- id: incoming_audio_format
  type: object
  command: "0x43 (response: 2 bytes - stream format, channel configuration)"

- id: incoming_audio_sample_rate
  type: enum
  values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", unknown, undetected]
  command: "0x44 (response Data1: 0x00=32K 0x01=44.1K 0x02=48K 0x03=88.2K 0x04=96K 0x05=176.4K 0x06=192K 0x07=Unknown 0x08=Undetected)"

- id: sub_stereo_trim
  type: integer
  command: "0x45 (response Data1: 0x00=0dB; 0x81-0x94 = -0.5dB to -10dB)"

- id: zone1_osd_state
  type: enum
  values: [on, off]
  command: "0x4E (response Data1: 0x00=On 0x01=Off)"

- id: hdmi_output
  type: enum
  values: [hdmi_out_1, hdmi_out_2, both]
  command: "0x4F (response Data1: 0x02=HDMI Out 1 0x03=HDMI Out 2 0x04=Both)"

- id: amx_duet_identity
  type: string
  command: "AMX response (e.g. 'AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=AV860><Device-Revision=x.y.z>\\r')"
```

## Variables
```yaml
# UNRESOLVED: Settable numeric parameters (volume, treble, bass, balance, etc.) are
# written via discrete set commands (0x0D, 0x35, 0x36, 0x3B, ...) and read back via
# their query variants. They are exposed as integer-typed parameters on the action
# entries rather than as separate abstract Variables.
```

## Events
```yaml
# Per source: "It is possible that the state of the AV may be changed as a result
# of user input via the front panel buttons or via the IR remote control. Any
# change resulting from these inputs is relayed to the RC using the appropriate
# message type." Examples given: display-brightness change, decode-mode change.
# The exact unsolicited message framing is not described in the source excerpt.
# UNRESOLVED: unsolicited notification format not specified in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences are described in the source.
```

## Safety
```yaml
confirmation_required_for:
  # 0x05 requires the 0xAA 0xAA confirmation pattern to avoid accidental restore.
  - id: restore_factory_defaults
    reason: "Source requires Dl=0x02, Data1=0xAA, Data2=0xAA to confirm."
  # 0x06 requires the 0x55 0x55 confirmation pattern plus a 4-digit PIN.
  - id: save_restore_secure_copy
    reason: "Source requires 0x55 0x55 confirmation plus a 4-digit PIN (Data4..Data7)."
  # 0x26 reboot uses a 'REBOOT' ASCII string as confirmation.
  - id: reboot
    reason: "Source requires the literal 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54) data to confirm."
interlocks:
  # Source notes: "Certain commands cannot be processed when the Setup Menu is
  # being displayed. An answer code of 0x85 will be returned in these
  # circumstances. Also, commands for tuner control cannot be processed when
  # the tuner input is not selected."
  - "Commands that change input/routing return answer code 0x85 while the Setup Menu is open on the OSD."
  - "Tuner control commands (0x03, 0x12, 0x15, 0x16, 0x18, 0x19, 0x1A) return 0x85 when the tuner input is not selected on the addressed zone."
  - "If a save (0x06) is in progress, a second save will fail silently; 0x06 restore returns 0x85 if no secure copy exists."
  - "Commands 0xF0-0xFF are reserved for test functions and must not be transmitted."
  # EU standby / Control enablement:
  - "By default Control (RS-232 / IP) is disabled for minimum standby power. Enable via OSD (A then U on remote) or front-panel DIRECT button held 4 seconds."
  # Heartbeat:
  - "Sending the heartbeat command (0x25) also resets the EuP standby timer."
```

## Notes
The byte-level protocol is identical over both RS-232 and TCP/IP. Each transmission uses a fixed frame:

- `St` = 0x21 (`!`)
- `Zn` = zone (0x01 master / 0x02)
- `Cc` = command code
- `Dl` = number of data bytes following, excluding Et
- `Data` = up to 255 bytes
- `Et` = 0x0D (carriage return)

Response frames include an `Ac` answer code byte between `Cc` and `Dl`:
0x00 = status update, 0x82 = zone invalid, 0x83 = command not recognised, 0x84 = parameter not recognised, 0x85 = command invalid at this time, 0x86 = invalid data length. The device responds to every command within three seconds.

The AV responds to each command within 3 seconds. The RC may send further commands before a previous response has been received.

RS-232 cable must be wired as a null modem (pin 2 ↔ 3, pin 5 ↔ 5).

**RC5 IR command codes (system 0x10 / Zone 2 system 0x17).** Each row is `system-command`; values shown as hex are also the bytes to pass to the `simulate_rc5` action's `rc5_system` and `rc5_command` parameters.

| Function | RC5 (dec) | RC5 (hex) |
|---|---|---|
| Standby | 16-12 | 0x10 0x0C |
| 1 | 16-1 | 0x10 0x01 |
| 2 | 16-2 | 0x10 0x02 |
| 3 | 16-3 | 0x10 0x03 |
| 4 | 16-4 | 0x10 0x04 |
| 5 | 16-5 | 0x10 0x05 |
| 6 | 16-6 | 0x10 0x06 |
| 7 | 16-7 | 0x10 0x07 |
| 8 | 16-8 | 0x10 0x08 |
| 9 | 16-9 | 0x10 0x09 |
| 0 | 16-0 | 0x10 0x00 |
| Access Lipsync Delay control | 16-50 | 0x10 0x32 |
| Cycle VFD information panels | 16-55 | 0x10 0x37 |
| Rewind | 16-121 | 0x10 0x79 |
| Fast Forward | 16-52 | 0x10 0x34 |
| Skip Back | 16-33 | 0x10 0x21 |
| Skip Forward | 16-11 | 0x10 0x0B |
| Stop | 16-54 | 0x10 0x36 |
| Play | 16-53 | 0x10 0x35 |
| Pause | 16-48 | 0x10 0x30 |
| Disc (Record / Trim Menu) | 16-90 | 0x10 0x5A |
| Menu (system menu) | 16-82 | 0x10 0x52 |
| Navigate Up | 16-86 | 0x10 0x56 |
| Pop Up (Dolby Volume on/off) | 16-70 | 0x10 0x46 |
| Navigate Left | 16-81 | 0x10 0x51 |
| OK | 16-87 | 0x10 0x57 |
| Navigate Right | 16-80 | 0x10 0x50 |
| Audio (Room EQ on/off) | 16-30 | 0x10 0x1E |
| Navigate Down | 16-85 | 0x10 0x55 |
| RTN (Subwoofer Trim) | 16-51 | 0x10 0x33 |
| HOME | 16-43 | 0x10 0x2B |
| Mute | 16-13 | 0x10 0x0D |
| Volume + | 16-16 | 0x10 0x10 |
| MODE (cycle decode modes) | 16-32 | 0x10 0x20 |
| DISP (change VFD brightness) | 16-59 | 0x10 0x3B |
| Activate DIRECT mode | 16-10 | 0x10 0x0A |
| Volume - | 16-17 | 0x10 0x11 |
| Red | 16-41 | 0x10 0x29 |
| Green | 16-42 | 0x10 0x2A |
| Yellow | 16-43 | 0x10 0x2B |
| Blue | 16-55 | 0x10 0x37 |
| Radio | 16-91 | 0x10 0x5B |
| Aux | 16-99 | 0x10 0x63 |
| Net | 16-92 | 0x10 0x5C |
| USB | 16-93 | 0x10 0x5D |
| AV | 16-94 | 0x10 0x5E |
| Sat | 16-27 | 0x10 0x1B |
| PVR | 16-96 | 0x10 0x60 |
| Game | 16-97 | 0x10 0x61 |
| BD | 16-98 | 0x10 0x62 |
| CD | 16-118 | 0x10 0x76 |
| STB | 16-100 | 0x10 0x64 |
| VCR | 16-119 | 0x10 0x77 |
| Display | 16-58 | 0x10 0x3A |
| Power On | 16-123 | 0x10 0x7B |
| Power Off | 16-124 | 0x10 0x7C |
| Next zone | 16-95 | 0x10 0x5F |
| Cycle output resolutions | 16-47 | 0x10 0x2F |
| Access Bass control | 16-39 | 0x10 0x27 |
| Access Speaker Trim controls | 16-37 | 0x10 0x25 |
| Access Treble control | 16-14 | 0x10 0x0E |
| Random | 16-76 | 0x10 0x4C |
| Repeat | 16-49 | 0x10 0x31 |
| Direct mode On | 16-78 | 0x10 0x4E |
| Direct mode Off | 16-79 | 0x10 0x4F |
| Multi Channel | 16-106 | 0x10 0x6A |
| Stereo | 16-107 | 0x10 0x6B |
| Dolby Surround | 16-110 | 0x10 0x6E |
| DTS Neo:6 Cinema | 16-111 | 0x10 0x6F |
| DTS Neo:6 Music | 16-112 | 0x10 0x70 |
| DTS Neural:X | 16-113 | 0x10 0x71 |
| Reserved | 16-114 | 0x10 0x72 |
| DTS Virtual:X | 16-115 | 0x10 0x73 |
| 5/7 Ch Stereo | 16-69 | 0x10 0x45 |
| Dolby D EX | 16-23 | 0x10 0x17 |
| Mute On | 16-26 | 0x10 0x1A |
| Mute Off | 16-120 | 0x10 0x78 |
| FM | 16-28 | 0x10 0x1C |
| DAB | 16-72 | 0x10 0x48 |
| Lip Sync +5ms | 16-15 | 0x10 0x0F |
| Lip sync -5ms | 16-101 | 0x10 0x65 |
| Sub trim +0.5dB | 16-105 | 0x10 0x69 |
| Sub trim -0.5dB | 16-108 | 0x10 0x6C |
| Display Off | 16-31 | 0x10 0x1F |
| Display L1 | 16-34 | 0x10 0x22 |
| Display L2 | 16-35 | 0x10 0x23 |
| Balance left | 16-38 | 0x10 0x26 |
| Balance right | 16-40 | 0x10 0x28 |
| Bass +1 | 16-44 | 0x10 0x2C |
| Bass -1 | 16-45 | 0x10 0x2D |
| Treble +1 | 16-46 | 0x10 0x2E |
| Treble -1 | 16-102 | 0x10 0x66 |
| Zone 2 Follow Zone 1 | 16-20 | 0x10 0x14 |
| Select HDMI Out 1 | 16-73 | 0x10 0x49 |
| Select HDMI Out 2 | 16-74 | 0x10 0x4A |
| Select HDMI Out 1 & 2 | 16-75 | 0x10 0x4B |
| Zone 2 Power On | 23-123 | 0x17 0x7B |
| Zone 2 Power Off | 23-124 | 0x17 0x7C |
| Zone 2 Vol+ | 23-1 | 0x17 0x01 |
| Zone 2 Vol- | 23-2 | 0x17 0x02 |
| Zone 2 Mute | 23-3 | 0x17 0x03 |
| Zone 2 Mute On | 23-4 | 0x17 0x04 |
| Zone 2 Mute Off | 23-5 | 0x17 0x05 |
| Zone 2 CD | 23-6 | 0x17 0x06 |
| Zone 2 BD | 23-7 | 0x17 0x07 |
| Zone 2 STB | 23-8 | 0x17 0x08 |
| Zone 2 AV | 23-9 | 0x17 0x09 |
| Zone 2 Game | 23-11 | 0x17 0x0B |
| Zone 2 Aux | 23-13 | 0x17 0x0D |
| Zone 2 PVR | 23-15 | 0x17 0x0F |
| Zone 2 FM | 23-14 | 0x17 0x0E |
| Zone 2 DAB | 23-16 | 0x17 0x10 |
| Zone 2 USB | 23-18 | 0x17 0x12 |
| Zone 2 NET | 23-19 | 0x17 0x13 |
| Zone 2 SAT | 23-20 | 0x17 0x14 |
| Zone 2 VCR | 23-21 | 0x17 0x15 |

**AMX Duet discovery.** On a fresh TCP connection, send the ASCII string `AMX` followed by 0x0D. Each model responds with `AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={AVR390|AVR550|AVR850|AV860|SR250}><Device-Revision=x.y.z>` followed by 0x0D, where `x.y.z` is the device's RS-232 protocol version (also reachable via command 0x04 subsystem 0xF0).

**Source quirks.** The Set/Request Zone 1 OSD example in the source (line 1795-1796) shows command code 0x4A rather than 0x4E; the surrounding command definition consistently uses 0x4E. Use 0x4E per the command-code table.

<!-- UNRESOLVED: firmware version compatibility ranges not stated; AMX Duet supports all five listed models, but per-subsystem feature differences (e.g. DAB on AVR450/750 only) are partially model-dependent and the source does not enumerate the full per-model feature matrix. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:49.892Z
last_checked_at: 2026-06-02T21:39:48.585Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:39:48.585Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions match source command codes verbatim; transport port 50000, baud 38400, 8N1 all confirmed in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version range not stated in source"
- "Settable numeric parameters (volume, treble, bass, balance, etc.) are"
- "unsolicited notification format not specified in source."
- "no multi-step macro sequences are described in the source."
- "firmware version compatibility ranges not stated; AMX Duet supports all five listed models, but per-subsystem feature differences (e.g. DAB on AVR450/750 only) are partially model-dependent and the source does not enumerate the full per-model feature matrix."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
