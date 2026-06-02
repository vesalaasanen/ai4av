---
spec_id: admin/arcam-avr390-avr550-avr850-av860-sr250
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec"
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
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-06-02T17:21:19.757Z
generated_at: 2026-06-02T17:21:19.757Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device name requested was Arcam DT91 but the supplied source document covers the AVR390/AVR550/AVR850/AV860/SR250 family; no DT91-specific protocol is in this source."
  - "full RC5 IR code table is large; only referenced as parameters to the Simulate RC5 IR command (0x08) — see Notes."
  - "source does not document additional safety warnings or"
  - "full RC5 code table not transcribed; only representative codes listed."
  - "device name DT91 in input does not match source's AVR/SR product family."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:19.757Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions match exact command codes in the source with correct opcodes, params, and transport values verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec

## Summary
RS-232 and IP control protocol for Arcam AV receivers (AVR390/AVR550/AVR850/AV860) and stereo receiver SR250. Transport: 38400 bps 8N1 serial null-modem, and TCP port 50000 for IP control. Commands use a framed byte protocol `0x21 {zone} {cc} {dl} {data} 0x0D` and most device functions are reachable via the Simulate RC5 IR command (0x08). Also supports AMX Duet "AMX\r" discovery. <!-- UNRESOLVED: device name requested was Arcam DT91 but the supplied source document covers the AVR390/AVR550/AVR850/AV860/SR250 family; no DT91-specific protocol is in this source. -->

<!-- UNRESOLVED: full RC5 IR code table is large; only referenced as parameters to the Simulate RC5 IR command (0x08) — see Notes. -->

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
- powerable       # inferred from power command examples (0x00 query, RC5 power on/off)
- routable        # inferred from input select commands (0x0A, 0x0B, source map 0x1D)
- queryable       # inferred from extensive state query commands
- levelable       # inferred from volume (0x0D), treble/bass (0x35/0x36), balance (0x3B), sub trim (0x3F/0x45) commands
```

## Actions
```yaml
# Each command is a framed byte sequence:
#   0x21 {zone} {cc} {dl} {data...} 0x0D
# where {zone} = 0x01 (Zone 1 / master) or 0x02 (Zone 2)
# {cc}      = command code (hex)
# {dl}      = data length byte (number of data bytes that follow, excludes ETR)
# {data...} = command-specific payload
# 0x0D      = end of transmission
#
# Response format:
#   0x21 {zone} {cc} {ac} {dl} {data...} 0x0D
# where {ac} = answer code: 0x00 status, 0x82 zone invalid, 0x83 cmd unknown,
#                            0x84 param unknown, 0x85 invalid at this time,
#                            0x86 invalid data length
# AV responds within 3 seconds per command.
# Commands 0xF0-0xFF are reserved (test) and must not be used.

- id: power_state_request
  label: Request Power State (Zone)
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: display_brightness_request
  label: Request Display Brightness
  kind: query
  command: "0x21 {zone} 0x01 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: headphones_status_request
  label: Request Headphone Connection Status
  kind: query
  command: "0x21 {zone} 0x02 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: fm_genre_request
  label: Request FM Programme Type
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: software_version_request
  label: Request Software Version
  kind: query
  command: "0x21 {zone} 0x04 0x01 {selector} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: selector
      type: integer
      description: "0xF0=RS232 protocol, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP"

- id: restore_factory_defaults
  label: Restore Factory Default Settings
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_secure_settings
  label: Save/Restore Secure Copy of Settings
  kind: action
  command: "0x21 0x01 0x06 0x07 {mode} 0x55 0x55 {d1} {d2} {d3} {d4} 0x0D"
  params:
    - name: mode
      type: integer
      description: "0x00=Save secure backup, 0x01=Restore secure backup"
    - name: d1
      type: integer
      description: PIN digit 1
    - name: d2
      type: integer
      description: PIN digit 2
    - name: d3
      type: integer
      description: PIN digit 3
    - name: d4
      type: integer
      description: PIN digit 4

- id: simulate_rc5_ir
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 {zone} 0x08 0x02 {rc5_system} {rc5_command} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: rc5_system
      type: integer
      description: RC5 system code (e.g. 0x10 for AV system, 0x17 for Zone 2)
    - name: rc5_command
      type: integer
      description: RC5 command code (see RC5 table in source)

- id: display_info_type
  label: Set/Request VFD Display Information Type
  kind: action
  command: "0x21 {zone} 0x09 0x01 {info_type} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: info_type
      type: integer
      description: "0x00=Processing, 0xE0=Cycle, 0xF0=Request; FM: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength; DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate; NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate"

- id: request_current_source
  label: Request Current Source
  kind: query
  command: "0x21 {zone} 0x1D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: headphone_override
  label: Headphone Over-ride (Mute Relays)
  kind: action
  command: "0x21 {zone} 0x1F 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: integer
      description: "0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)"

- id: video_selection
  label: Video Selection
  kind: action
  command: "0x21 0x01 0x0A 0x01 {source} 0x0D"
  params:
    - name: source
      type: integer
      description: "0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Request current input"

- id: select_audio_input
  label: Select Analogue/Digital/HDMI Audio Input
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {mode} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: mode
      type: integer
      description: "0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Request audio type"

- id: set_request_volume
  label: Set/Request Volume
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {level} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: level
      type: integer
      description: "0x00-0x63 (0-99) volume in dB; 0xF0=Request current volume"

- id: request_mute_status
  label: Request Mute Status
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_direct_mode_status
  label: Request Direct Mode Status
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_2ch
  label: Request Decode Mode (2ch)
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: request_decode_mode_mch
  label: Request Decode Mode (MCH)
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: request_rds_information
  label: Request RDS Information (FM)
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_video_output_resolution
  label: Request Video Output Resolution
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []

- id: request_menu_status
  label: Request Open Menu Status
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []

- id: request_tuner_preset
  label: Request/Set Tuner Preset
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number; 0xF0=Request current preset"

- id: tune_frequency
  label: Tune (Increment/Decrement/Request FM)
  kind: action
  command: "0x21 {zone} 0x16 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: direction
      type: integer
      description: "0x00=Decrement 1 step (0.05 MHz), 0x01=Increment 1 step, 0xF0=Request current frequency"

- id: request_dab_station
  label: Request Current DAB Station
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_dab_programme_type
  label: Request DAB Programme Type
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_dls_pdt
  label: Request DLS/PDT Information (DAB)
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_preset_details
  label: Request Preset Details
  kind: action
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: "0x01-0x32 (1-50) preset number to query"

- id: request_network_playback_status
  label: Request Network Playback Status
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: imax_enhanced
  label: IMAX Enhanced Control
  kind: action
  command: "0x21 {zone} 0x0C 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=Auto, 0xF2=On, 0xF3=Off"

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
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

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
      description: "0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: room_equalisation
  label: Room Equalisation On/Off
  kind: action
  command: "0x21 {zone} 0x37 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=On, 0xF2=Off"

- id: dolby_volume
  label: Dolby Volume On/Off
  kind: action
  command: "0x21 {zone} 0x38 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: integer
      description: "0x00=Off, 0x01=On, 0xF0=Request"

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
      description: "0x00-0x0A = setting 0-10; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement, 0xFF=Off"

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
      description: "0x00-0x0F = 0dB to +15dB; 0x80-0x8F = -1dB to -15dB; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

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
      description: "0x00-0x06 = 0 to 6; 0x81-0x86 = -1 to -6; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

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
      description: "0x00-0x14 = positive 0.5dB steps (e.g. 0x02=+1.0dB); 0x81-0x94 = negative 0.5dB steps (e.g. 0x82=-1.0dB); 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

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
      description: "0x00-0x32 = delay in 5ms steps (e.g. 0x08=40ms); 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: compression
  label: Dynamic Range Compression
  kind: action
  command: "0x21 {zone} 0x41 0x01 {level} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: level
      type: integer
      description: "0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Request"

- id: request_incoming_video_parameters
  label: Request Incoming Video Parameters
  kind: query
  command: "0x21 {zone} 0x42 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_incoming_audio_format
  label: Request Incoming Audio Format
  kind: query
  command: "0x21 {zone} 0x43 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: request_incoming_audio_sample_rate
  label: Request Incoming Audio Sample Rate
  kind: query
  command: "0x21 {zone} 0x44 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: set_request_sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "0x21 {zone} 0x45 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00 = 0dB; 0x81-0x94 = -0.5dB to -10.0dB in 0.5dB steps; 0xF0=Request, 0xF1=Increment, 0xF2=Decrement"

- id: set_request_zone1_osd
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 {state} 0x0D"
  params:
    - name: state
      type: integer
      description: "0xF0=Request, 0xF1=On, 0xF2=Off"

- id: set_request_video_output_switching
  label: HDMI Video Output Switching
  kind: action
  command: "0x21 {zone} 0x4F 0x01 {output} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: output
      type: integer
      description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1 & 2, 0xF0=Request"

- id: set_request_input_name
  label: Set/Request Input Name
  kind: action
  command: "0x21 {zone} 0x20 0x{n} {mode_or_chars} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: n
      type: integer
      description: "Data length: 0x01 for query, or ASCII length (max 10) for setting"
    - name: mode_or_chars
      type: string
      description: "0xF0 to query, or ASCII bytes of the new name (max 10 chars)"

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 {zone} 0x23 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: direction
      type: integer
      description: "0x01=Scan up, 0x02=Scan down"

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "0x21 {zone} 0x24 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: heartbeat
  label: Heartbeat
  kind: action
  command: "0x21 {zone} 0x25 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: reboot
  label: Reboot Unit
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []

- id: amx_duet_discovery
  label: AMX Duet Discovery
  kind: action
  command: '"AMX\r"'
  params: []
  notes: "ASCII text command. Response is a single ASCII line beginning with AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={AV860|AVR850|AVR550|AVR390|SR250}><Device-Revision=x.y.z> terminated by 0x0D. x.y.z is the RS232 protocol version."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  notes: "From 0x00 response Data: 0x00=standby, 0x01=powered on"

- id: display_brightness
  type: enum
  values: [off, l1, l2]
  notes: "From 0x01 response Data: 0x00=Off, 0x01=L1, 0x02=L2"

- id: headphones_connected
  type: enum
  values: [disconnected, connected]
  notes: "From 0x02 response Data: 0x00=Not connected, 0x01=Connected"

- id: fm_programme_type
  type: string
  notes: "From 0x03 response: ASCII string, padded to data length"

- id: software_version
  type: string
  notes: "From 0x04 response: Data2=major, Data3=minor (echo of request selector in Data1)"

- id: headphone_override_state
  type: enum
  values: [clear, set]
  notes: "From 0x1F response Data1"

- id: video_source
  type: enum
  values: [bd, sat, av, pvr, vcr, game, stb]
  notes: "From 0x0A response; 0xF0=Request"

- id: audio_input_type
  type: enum
  values: [analogue, digital, hdmi]
  notes: "From 0x0B response Data: 0x00=Analogue, 0x01=Digital, 0x02=HDMI"

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  notes: "From 0x1D response Data: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=Display, 0x0B=TUNER FM, 0x0C=TUNER DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME"

- id: volume
  type: integer
  notes: "From 0x0D response Data1: 0x00-0x63 (0-99 dB)"

- id: mute_status
  type: enum
  values: [muted, unmuted]
  notes: "From 0x0E response Data: 0x00=Muted, 0x01=Not muted"

- id: direct_mode
  type: enum
  values: [off, on]
  notes: "From 0x0F response Data: 0x00=Off, 0x01=On"

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, stereo_5_7_ch, dts_neural_x, reserved, dts_virtual_x]
  notes: "From 0x10 response Data: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Reserved, 0x0C=DTS Virtual:X"

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  notes: "From 0x11 response Data: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Reserved, 0x0C=DTS Virtual:X"

- id: rds_text
  type: string
  notes: "From 0x12 response: ASCII string, variable length"

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  notes: "From 0x13 response Data: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k"

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  notes: "From 0x14 response Data: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB"

- id: tuner_preset_number
  type: integer
  notes: "From 0x15 response Data: 0xFF=no preset, 0x01-0x32 (1-50) preset number"

- id: fm_frequency
  type: string
  notes: "From 0x16 response: Data1=MHz byte, Data2=10s of kHz byte (e.g. 0x55 0x05 = 85.05 MHz)"

- id: dab_station_name
  type: string
  notes: "From 0x18 response: 16-byte ASCII service label, space-padded"

- id: dab_programme_type
  type: string
  notes: "From 0x19 response: 16-byte ASCII programme type, space-padded"

- id: dab_dls_text
  type: string
  notes: "From 0x1A response: 128-byte ASCII digital radio text, space-padded"

- id: preset_details
  type: string
  notes: "From 0x1B response: preset#, type (1=FM freq, 2=FM RDS name, 3=DAB), freq bytes, ASCII name"

- id: network_playback_status
  type: object
  notes: "From 0x1C response: Data1=state (0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy); Data2..n = folder (navigating) or file (playing/paused) name in ASCII"

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  notes: "From 0x0C response Data1: 0x00=Off, 0x01=On, 0x02=Auto"

- id: treble_value
  type: integer
  notes: "From 0x35 response: 0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB"

- id: bass_value
  type: integer
  notes: "From 0x36 response: same encoding as treble"

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  notes: "From 0x37 response: 0x00=Off, 0x01=On, 0x02=Not calculated (off)"

- id: dolby_volume_state
  type: enum
  values: [off, on]
  notes: "From 0x38 response: 0x00=Off, 0x01=On"

- id: dolby_leveller
  type: integer
  notes: "From 0x39 response: 0x00-0x0A (0-10); 0xFF=Off"

- id: dolby_volume_calibration_offset
  type: integer
  notes: "From 0x3A response: 0x00-0x0F = 0dB to +15dB; 0x80-0x8F = -1dB to -15dB"

- id: balance
  type: integer
  notes: "From 0x3B response: 0x00-0x06 = 0 to 6; 0x81-0x86 = -1 to -6"

- id: subwoofer_trim
  type: string
  notes: "From 0x3F response: 0x00-0x14 in 0.5dB positive steps; 0x81-0x94 in 0.5dB negative steps"

- id: lipsync_delay
  type: integer
  notes: "From 0x40 response: 0x00-0x32 in 5ms steps (e.g. 0x10=80ms)"

- id: compression
  type: enum
  values: [off, medium, high]
  notes: "From 0x41 response: 0x00=Off, 0x01=Medium, 0x02=High"

- id: incoming_video_parameters
  type: object
  notes: "From 0x42 response: H-res MSB/LSB, V-res MSB/LSB, refresh rate Hz, interlace flag (0x00=Progressive, 0x01=Interlaced), aspect ratio (0x00=Undefined, 0x01=4:3, 0x02=16:9)"

- id: incoming_audio_format
  type: object
  notes: "From 0x43 response: Data1=stream format enum (0x00=PCM, 0x01=Analogue Direct, 0x02=Dolby Digital, 0x05=DD Plus, 0x06=DD TrueHD, 0x07=DTS, 0x0D=DTS HD MA, 0x0E=DTS HD HRA, 0x16=Dolby Atmos, 0x17=DTS:X, 0x18=IMAX ENHANCED, etc.); Data2=channel configuration enum"

- id: incoming_audio_sample_rate
  type: enum
  values: [khz_32, khz_44_1, khz_48, khz_88_2, khz_96, khz_176_4, khz_192, unknown, undetected]
  notes: "From 0x44 response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected"

- id: sub_stereo_trim
  type: string
  notes: "From 0x45 response: 0x00 = 0dB; 0x81-0x94 = -0.5dB to -10.0dB in 0.5dB steps"

- id: zone1_osd_state
  type: enum
  values: [on, off]
  notes: "From 0x4E response: 0x00=On, 0x01=Off"

- id: video_output_selection
  type: enum
  values: [hdmi_out_1, hdmi_out_2, hdmi_out_1_and_2]
  notes: "From 0x4F response: 0x02=HDMI 1, 0x03=HDMI 2, 0x04=Both"

- id: input_name
  type: string
  notes: "From 0x20 response: 10-byte ASCII input name"

- id: amx_duet_response
  type: string
  notes: "ASCII response to AMX\\r: AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={model}><Device-Revision=x.y.z>\\r"
```

## Events
```yaml
- id: state_change_unsolicited
  description: |
    The AV relays state changes caused by front-panel buttons or the IR remote
    to the controller using the appropriate message (e.g. display brightness
    change via DISPLAY button). Most IR commands sent through Simulate RC5 IR
    (0x08) generate an additional status message back to the controller.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults        # requires 0xAA 0xAA confirmation pattern
  - reboot                          # requires ASCII "REBOOT" confirmation string
  - save_restore_secure_settings    # requires 0x55 0x55 confirmation pattern + 4-digit PIN
interlocks: []
# UNRESOLVED: source does not document additional safety warnings or
# interlock procedures beyond the confirmation-byte conventions above.
```

## Notes
- Source document covers Arcam AVR390 / AVR550 / AVR850 / AV860 / SR250 only. The Arcam DT91 (DAB/FM tuner) is a separate product; this spec should NOT be assumed to apply to it. The tuner-relevant commands (0x03, 0x12, 0x15, 0x16, 0x18, 0x19, 0x1A, 0x1B, 0x23, 0x24) are the most likely subset if a DT91-specific document is later found.
- The Simulate RC5 IR command (0x08) is the canonical way to invoke front-panel / IR-remote functions. The full RC5 code table is in the source document (pages 26+); only a representative subset is included here. RC5 system 0x10 = main AV system, 0x17 = Zone 2. Example: Power On = `0x21 0x01 0x08 0x02 0x10 0x7B 0x0D`, Power Off = `0x21 0x01 0x08 0x02 0x10 0x7C 0x0D`, Standby = `0x21 0x01 0x08 0x02 0x10 0x0C 0x0D`, Vol+ = `0x21 0x01 0x08 0x02 0x10 0x10 0x0D`, Vol- = `0x21 0x01 0x08 0x02 0x10 0x11 0x0D`, Mute = `0x21 0x01 0x08 0x02 0x10 0x0D 0x0D`.
- IP control is via TCP port 50000 on the unit's IP address. RS-232 must be enabled first: hold front-panel DIRECT for 4s ("RS232 CONTROL ON" on VFD) or set Control=On in the General Setup menu (press A then U on the remote).
- Source explicitly notes the EuP standby timer is reset by the Heartbeat command (0x25) — devices behind EuP regulations should poll it.
- Commands 0xF0–0xFF are reserved for test functions; never transmit.
- Many commands fail with answer code 0x85 if the OSD Setup Menu is open, or for tuner commands when the tuner input is not the active source.
- Serial cable is a null modem: pin 2↔3 crossed, pin 5↔5 ground. No hardware flow control.

<!-- UNRESOLVED: full RC5 code table not transcribed; only representative codes listed. -->
<!-- UNRESOLVED: device name DT91 in input does not match source's AVR/SR product family. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:54.633Z
last_checked_at: 2026-06-02T17:21:19.757Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:19.757Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions match exact command codes in the source with correct opcodes, params, and transport values verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device name requested was Arcam DT91 but the supplied source document covers the AVR390/AVR550/AVR850/AV860/SR250 family; no DT91-specific protocol is in this source."
- "full RC5 IR code table is large; only referenced as parameters to the Simulate RC5 IR command (0x08) — see Notes."
- "source does not document additional safety warnings or"
- "full RC5 code table not transcribed; only representative codes listed."
- "device name DT91 in input does not match source's AVR/SR product family."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
