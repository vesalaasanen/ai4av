---
spec_id: admin/arcam-sr250-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam SR250 Control Spec"
manufacturer: Arcam
model_family: SR250
aliases: []
compatible_with:
  manufacturers:
    - Arcam
  models:
    - SR250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-01T20:32:58.752Z
last_checked_at: 2026-06-02T17:21:21.403Z
generated_at: 2026-06-02T17:21:21.403Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated. Voltage/current/power spec not in source."
  - "All settable parameters in this protocol are encoded as data"
  - "source mentions \"Any change resulting from these inputs is"
  - "source does not document any multi-step command sequences"
  - "source contains no electrical-safety, installation, or power-on"
  - "per-channel/per-zone RC5 codes for Zone 2 are fully listed in"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:21.403Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 spec actions matched verbatim to source command codes with consistent shapes; transport parameters verified; source has no undocumented commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Arcam SR250 Control Spec

## Summary
RS-232 / TCP control protocol for the Arcam SR250 stereo receiver. Frame format `<St> <Zn> <Cc> <Dl> <Data> <Et>` with `St=0x21`, `Et=0x0D`. Source document also covers AVR390/AVR550/AVR850/AV860 family; SR250-specific behaviour marked where the source notes it. IP control on TCP port 50000; serial at 38,400 8N1 no flow control. No auth procedure described.

<!-- UNRESOLVED: firmware version compatibility not stated. Voltage/current/power spec not in source. -->

## Transport
```yaml
# Both transports documented in source. Frame format is identical for both.
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
# Frame format (applies to both transports):
#   <St> <Zn> <Cc> <Dl> <Data...> <Et>
#   St = 0x21, Et = 0x0D
#   Zn = 0x01 (Zone 1 / master) or 0x02 (Zone 2)
#   Cc = command code (see Actions)
#   Dl = number of data bytes following (excludes Et)
# Response format: <St> <Zn> <Cc> <Ac> <Dl> <Data...> <Et>
#   Ac = answer code: 0x00 ok, 0x82 zone invalid, 0x83 cmd unrecognised,
#        0x84 param unrecognised, 0x85 invalid at this time, 0x86 bad length
# AV responds within 3s. AMX Duet ("AMX\r") returns ASCII "AMXB<...>" beacon.
```

## Traits
```yaml
# Populated from explicit command evidence in source.
- powerable       # RC5 16-123 / 16-124 (Power On/Off) via Simulate RC5 (0x08)
- routable        # 0x0A video selection, 0x1D source query, 0x0B audio input
- queryable       # extensive status queries (power, vol, mute, source, etc.)
- levelable       # volume, bass, treble, balance, sub trim, lipsync, dolby vol
```

## Actions
```yaml
# All actions use the binary frame <St=0x21> <Zn> <Cc> <Dl> <Data> <Et=0x0D>.
# Zn placeholder {zone}: 0x01 = Zone 1 (master), 0x02 = Zone 2.
# Data placeholder {data}: byte as documented for each command below.
# For requests, send Data=0xF0 (or as documented); the device echoes status.
# Dl placeholder {dl}: number of data bytes (matches Data length).

- id: power_state_query
  label: Power State Query (Zone)
  kind: query
  command: "0x21 0x{zone} 0x00 0x01 0xF0 0x0D"
  params: []

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []

- id: headphones_query
  label: Headphones Connection Query
  kind: query
  command: "0x21 0x{zone} 0x02 0x01 0xF0 0x0D"
  params: []

- id: fm_genre_query
  label: FM Programme Type Query
  kind: query
  command: "0x21 0x{zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if FM not selected.

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "0x21 0x01 0x04 0x01 0x{component} 0x0D"
  params:
    - name: component
      type: integer
      description: 0xF0=RS232 ver, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_secure_copy
  label: Save/Restore Secure Copy Of Settings
  kind: action
  command: "0x21 0x01 0x06 0x07 0x{op} 0x55 0x55 0x{p1} 0x{p2} 0x{p3} 0x{p4} 0x0D"
  params:
    - name: op
      type: integer
      description: 0x00=Save secure backup, 0x01=Restore secure backup
    - name: p1
      type: integer
      description: PIN digit 1
    - name: p2
      type: integer
      description: PIN digit 2
    - name: p3
      type: integer
      description: PIN digit 3
    - name: p4
      type: integer
      description: PIN digit 4

- id: simulate_rc5_ir
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 0x{zone} 0x08 0x02 0x{rc5_system} 0x{rc5_command} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: rc5_system
      type: integer
      description: RC5 system code (e.g. 0x10=Zone1, 0x17=Zone2)
    - name: rc5_command
      type: integer
      description: RC5 command code. Zone1 codes: 0x0C Standby, 0x7B Power On, 0x7C Power Off, 0x10 Vol+, 0x11 Vol-, 0x0D Mute, 0x0A Direct, 0x5B Radio, 0x5C Net, 0x5D USB, 0x5E AV, 0x1B Sat, 0x60 PVR, 0x61 Game, 0x62 BD, 0x76 CD, 0x64 STB, 0x77 VCR, 0x3A Display, 0x5F Next zone, 0x27 Bass, 0x0E Treble, 0x25 Speaker Trim, 0x2F Cycle resolution, 0x4E Direct On, 0x4F Direct Off, 0x6A Multi Ch, 0x6B Stereo, 0x6E Dolby Surround, 0x6F DTS Neo:6 Cinema, 0x70 DTS Neo:6 Music, 0x71 DTS Neural:X, 0x72 Reserved, 0x73 DTS Virtual:X, 0x45 5/7 Ch Stereo, 0x17 Dolby D EX, 0x1A Mute On, 0x78 Mute Off, 0x1C FM, 0x48 DAB, 0x0F Lip Sync +5ms, 0x65 Lip Sync -5ms, 0x69 Sub trim +0.5dB, 0x6C Sub trim -0.5dB, 0x1F Display Off, 0x22 Display L1, 0x23 Display L2, 0x26 Balance L, 0x28 Balance R, 0x2C Bass +1, 0x2D Bass -1, 0x2E Treble +1, 0x66 Treble -1, 0x49 HDMI Out 1, 0x4A HDMI Out 2, 0x4B HDMI Out 1+2, 0x14 Z2 Follow Z1. Zone2 codes: 0x7B Z2 Pwr On, 0x7C Z2 Pwr Off, 0x01 Z2 Vol+, 0x02 Z2 Vol-, 0x03 Z2 Mute, 0x04 Z2 Mute On, 0x05 Z2 Mute Off, 0x06 Z2 CD, 0x07 Z2 BD, 0x08 Z2 STB, 0x09 Z2 AV, 0x0B Z2 Game, 0x0D Z2 Aux, 0x0F Z2 PVR, 0x0E Z2 FM, 0x10 Z2 DAB, 0x12 Z2 USB, 0x13 Z2 NET, 0x14 Z2 SAT, 0x15 Z2 VCR.

- id: display_information_type
  label: Set/Request VFD Display Information Type
  kind: action
  command: "0x21 0x{zone} 0x09 0x01 0x{type} 0x0D"
  params:
    - name: type
      type: integer
      description: All sources: 0x00=Processing, 0xE0=Cycle, 0xF0=Request current. FM: 0x01=Radio text, 0x02=Prog type, 0x03=Signal. DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal, 0x04=Bit rate. NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate.

- id: video_selection
  label: Video Input Selection
  kind: action
  command: "0x21 0x01 0x0A 0x01 0x{source} 0x0D"
  params:
    - name: source
      type: integer
      description: 0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Request current. Returns 0x85 if OSD setup screen is showing.

- id: select_audio_input
  label: Select Analogue/Digital/HDMI Audio Input
  kind: action
  command: "0x21 0x{zone} 0x0B 0x01 0x{type} 0x0D"
  params:
    - name: type
      type: integer
      description: 0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Request current.

- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  command: "0x21 0x{zone} 0x0C 0x01 0x{mode} 0x0D"
  params:
    - name: mode
      type: integer
      description: 0xF0=Request, 0xF1=Auto, 0xF2=On, 0xF3=Off

- id: volume
  label: Set/Request Volume
  kind: action
  command: "0x21 0x{zone} 0x0D 0x01 0x{volume} 0x0D"
  params:
    - name: volume
      type: integer
      description: 0x00-0x63 (0-99) to set; 0xF0 to request current. Source notes value is in dB (e.g. 0x2A=42dB).

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "0x21 0x{zone} 0x0E 0x01 0xF0 0x0D"
  params: []

- id: direct_mode_status_query
  label: Direct Mode Status Query
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_2ch_query
  label: Decode Mode 2ch Query
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_mch_query
  label: Decode Mode MCH Query
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: rds_info_query
  label: RDS Information Query (FM)
  kind: query
  command: "0x21 0x{zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number. Returns 0x85 if FM not selected.

- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []

- id: menu_status_query
  label: Open Menu Status Query
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []

- id: tuner_preset
  label: Select/Request Tuner Preset
  kind: action
  command: "0x21 0x{zone} 0x15 0x01 0x{preset} 0x0D"
  params:
    - name: preset
      type: integer
      description: 0x01-0x32 (1-50) preset number; 0xF0=request current preset.

- id: tune
  label: Tune FM Frequency
  kind: action
  command: "0x21 0x{zone} 0x16 0x01 0x{dir} 0x0D"
  params:
    - name: dir
      type: integer
      description: 0x00=Decrement 1 step, 0x01=Increment 1 step, 0xF0=Request current. Step=0.05 MHz.

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "0x21 0x{zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number. Returns 0x85 if DAB not selected.

- id: dab_programme_type_query
  label: DAB Programme Type Query
  kind: query
  command: "0x21 0x{zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number. Returns 0x85 if DAB not selected.

- id: dab_dls_pdt_query
  label: DAB DLS/PDT Info Query
  kind: query
  command: "0x21 0x{zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number. Returns 0x85 if DAB not selected.

- id: preset_details_query
  label: Preset Details Query
  kind: query
  command: "0x21 0x{zone} 0x1B 0x01 0x{preset} 0x0D"
  params:
    - name: preset
      type: integer
      description: 0x01-0x32 (1-50) preset number.

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "0x21 0x{zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number. Returns 0x85 if network not selected.

- id: current_source_query
  label: Current Source Query
  kind: query
  command: "0x21 0x{zone} 0x1D 0x01 0xF0 0x0D"
  params: []

- id: headphone_override
  label: Headphone Over-ride (Speaker Mute Relays)
  kind: action
  command: "0x21 0x{zone} 0x1F 0x01 0x{state} 0x0D"
  params:
    - name: state
      type: integer
      description: 0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)

- id: input_name
  label: Set/Request Input Name
  kind: action
  command: "0x21 0x01 0x20 0x{dl} 0x{data} 0x0D"
  params:
    - name: dl
      type: integer
      description: 0x01 for query (data=0xF0), or length of name string (max 10 chars) for set
    - name: data
      type: string
      description: ASCII name bytes (set), or 0xF0 (query). Example set: "BDP300" = 0x42 0x44 0x50 0x33 0x30 0x30.

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 0x01 0x23 0x01 0x{dir} 0x0D"
  params:
    - name: dir
      type: integer
      description: 0x01=Scan up, 0x02=Scan down. Only valid on FM input.

- id: dab_scan
  label: DAB Scan Start
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []

- id: heartbeat
  label: Heartbeat (Keep-Alive)
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []

- id: reboot
  label: Reboot Unit
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []

- id: treble_eq
  label: Treble Equalisation
  kind: action
  command: "0x21 0x{zone} 0x35 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x0C = 0..+12 dB; 0x81-0x8C = -1..-12 dB; 0xF0=Request, 0xF1=Increment 1 dB, 0xF2=Decrement 1 dB

- id: bass_eq
  label: Bass Equalisation
  kind: action
  command: "0x21 0x{zone} 0x36 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x0C = 0..+12 dB; 0x81-0x8C = -1..-12 dB; 0xF0=Request, 0xF1=Increment 1 dB, 0xF2=Decrement 1 dB

- id: room_eq
  label: Room Equalisation
  kind: action
  command: "0x21 0x{zone} 0x37 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0xF0=Request, 0xF1=On, 0xF2=Off

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "0x21 0x{zone} 0x38 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00=Off, 0x01=On, 0xF0=Request

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  command: "0x21 0x{zone} 0x39 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x0A=level 0-10; 0xF0=Request, 0xF1=Inc, 0xF2=Dec, 0xFF=Off

- id: dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset
  kind: action
  command: "0x21 0x{zone} 0x3A 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x0F=0..+15 dB; 0x80-0x8F=-1..-15 dB; 0xF0=Request, 0xF1=Inc 1 dB, 0xF2=Dec 1 dB

- id: balance
  label: Balance
  kind: action
  command: "0x21 0x{zone} 0x3B 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x06=0..6 (right); 0x81-0x86=-1..-6 (left); 0xF0=Request, 0xF1=Inc, 0xF2=Dec

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: "0x21 0x{zone} 0x3F 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x14=0..+10 dB in 0.5 dB steps; 0x81-0x94=-0.5..-10 dB; 0xF0=Request, 0xF1=Inc 0.5 dB, 0xF2=Dec 0.5 dB

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  command: "0x21 0x{zone} 0x40 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00-0x32=delay in 5 ms steps (0x08=40ms, 0x0A=50ms, 0x10=80ms); 0xF0=Request, 0xF1=Inc 5 ms, 0xF2=Dec 5 ms

- id: compression
  label: Dynamic Range Compression
  kind: action
  command: "0x21 0x{zone} 0x41 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Request

- id: incoming_video_params_query
  label: Incoming Video Parameters Query
  kind: query
  command: "0x21 0x{zone} 0x42 0x01 0xF0 0x0D"
  params: []

- id: incoming_audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "0x21 0x{zone} 0x43 0x01 0xF0 0x0D"
  params: []

- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "0x21 0x{zone} 0x44 0x01 0xF0 0x0D"
  params: []

- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "0x21 0x{zone} 0x45 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0x00=0 dB; 0x81-0x94=-0.5..-10 dB in 0.5 dB steps; 0xF0=Request, 0xF1=Inc 0.5 dB, 0xF2=Dec 0.5 dB

- id: zone1_osd_on_off
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 0x{value} 0x0D"
  params:
    - name: value
      type: integer
      description: 0xF0=Request, 0xF1=On, 0xF2=Off

- id: video_output_switching
  label: HDMI Video Output Switching
  kind: action
  command: "0x21 0x01 0x4F 0x01 0x{output} 0x0D"
  params:
    - name: output
      type: integer
      description: 0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1+2, 0xF0=Request

- id: amx_duet_beacon
  label: AMX Duet Dynamic Device Discovery
  kind: query
  command: "AMX\r"
  params: []
  # Returns ASCII: AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=SR250><Device-Revision=x.y.z>\r
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  # source: 0x00 response Data: 0x00=standby, 0x01=on

- id: display_brightness
  type: enum
  values: [off, L1, L2]
  # source: 0x01 response Data: 0x00=off, 0x01=L1, 0x02=L2

- id: headphones_connected
  type: boolean
  # source: 0x02 response Data: 0x00=no, 0x01=yes

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  # source: 0x1D response Data: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER FM, 0x0C=TUNER DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME

- id: volume_dB
  type: integer
  range: [0, 99]
  # source: 0x0D response Data byte 0x00-0x63 (dB)

- id: mute_state
  type: boolean
  # source: 0x0E response Data: 0x00=muted, 0x01=not muted

- id: direct_mode
  type: boolean
  # source: 0x0F response Data: 0x00=off, 0x01=on

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, five_seven_ch_stereo, dts_neural_x, reserved, dts_virtual_x]
  # source: 0x10 response Data: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Reserved, 0x0C=DTS Virtual:X

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multi_channel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  # source: 0x11 response Data: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Reserved, 0x0C=DTS Virtual:X

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  # source: 0x13 response Data: 0x02=SD Prog, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  # source: 0x14 response Data: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB

- id: tuner_preset_number
  type: integer
  range: [0, 50]
  # source: 0x15 response Data: 0xFF=no preset, 0x01-0x32=preset 1-50

- id: imax_enhanced
  type: enum
  values: [off, on, auto]
  # source: 0x0C response Data: 0x00=Off, 0x01=On, 0x02=Auto

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  # source: 0x37 response Data: 0x00=Off, 0x01=On, 0x02=Not calculated

- id: dolby_volume_state
  type: boolean
  # source: 0x38 response Data: 0x00=off, 0x01=on

- id: dolby_leveller
  type: integer
  range: [0, 10]
  # source: 0x39 response Data: 0x00-0x0A=level 0-10; 0xFF=off

- id: treble_dB
  type: integer
  range: [-12, 12]
  # source: 0x35 response Data: 0x00-0x0C=0..+12 dB; 0x81-0x8C=-1..-12 dB

- id: bass_dB
  type: integer
  range: [-12, 12]
  # source: 0x36 response Data: 0x00-0x0C=0..+12 dB; 0x81-0x8C=-1..-12 dB

- id: balance
  type: integer
  range: [-6, 6]
  # source: 0x3B response Data: 0x00-0x06=right 0-6; 0x81-0x86=left 1-6

- id: subwoofer_trim_dB
  type: number
  range: [-10, 10]
  step: 0.5
  # source: 0x3F response Data: 0x00-0x14=0..+10 dB in 0.5 steps; 0x81-0x94=-0.5..-10 dB

- id: lipsync_delay_ms
  type: integer
  range: [0, 250]
  step: 5
  # source: 0x40 response Data: 0x00-0x32=delay in 5 ms steps

- id: compression
  type: enum
  values: [off, medium, high]
  # source: 0x41 response Data: 0x00=Off, 0x01=Medium, 0x02=High

- id: zone1_osd_state
  type: boolean
  # source: 0x4E response Data: 0x00=On, 0x01=Off

- id: video_output_switching
  type: enum
  values: [hdmi1, hdmi2, hdmi1_and_2]
  # source: 0x4F response Data: 0x02=HDMI1, 0x03=HDMI2, 0x04=Both

- id: audio_input_type
  type: enum
  values: [analogue, digital, hdmi]
  # source: 0x0B response Data: 0x00=Analogue, 0x01=Digital, 0x02=HDMI

- id: headphone_override_state
  type: boolean
  # source: 0x1F response Data: relay state 0x00/0x01

- id: fm_radio_text
  type: string
  # source: 0x12 response: ASCII radio text, e.g. "Playing your favourite music"

- id: dab_station_label
  type: string
  # source: 0x18 response: 16-byte ASCII, space-padded

- id: dab_programme_type
  type: string
  # source: 0x19 response: 16-byte ASCII, space-padded

- id: dab_dls_pdt
  type: string
  # source: 0x1A response: 128-byte ASCII, space-padded

- id: input_name
  type: string
  # source: 0x20 response: up to 10-byte ASCII

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  # source: 0x1C response Data1: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy

- id: incoming_video_params
  type: object
  # source: 0x42 response 7 bytes: h_res MSB, h_res LSB, v_res MSB, v_res LSB, refresh, interlaced(0/1), aspect(0=undef, 1=4:3, 2=16:9)

- id: incoming_audio_format
  type: object
  # source: 0x43 response: stream format enum + channel config enum (see source for full tables)

- id: incoming_audio_sample_rate
  type: enum
  values: [32k, 44_1k, 48k, 88_2k, 96k, 176_4k, 192k, unknown, undetected]
  # source: 0x44 response Data: 0x00-0x08 sample-rate enum

- id: sub_stereo_trim_dB
  type: number
  range: [-10, 0]
  step: 0.5
  # source: 0x45 response: 0x00=0 dB; 0x81-0x94=-0.5..-10 dB
```

## Variables
```yaml
<!-- UNRESOLVED: All settable parameters in this protocol are encoded as data
     bytes within the command-code actions above (volume, treble, bass, balance,
     sub trim, lipsync, etc.). No out-of-band continuous-variable channel exists,
     so this section is intentionally empty. -->
```

## Events
```yaml
<!-- UNRESOLVED: source mentions "Any change resulting from these inputs is
     relayed to the RC using the appropriate message type" (e.g. display
     brightness change, decode mode change) but does not define the unsolicited
     message format separately from query responses. Treat query responses as
     the feedback channel; no separate event envelope is documented. -->
```

## Macros
```yaml
<!-- UNRESOLVED: source does not document any multi-step command sequences
     beyond the Save/Restore secure copy (0x06) which is a single command with
     a confirmation pattern. No macros defined. -->
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # 0x05 requires 0xAA 0xAA confirmation pattern
  - save_restore_secure_copy # 0x06 requires 0x55 0x55 confirmation + 4-digit PIN
  - reboot                   # 0x26 requires ASCII "REBOOT" as confirmation data
interlocks: []
# UNRESOLVED: source contains no electrical-safety, installation, or power-on
# sequencing warnings. The above confirmation patterns are command-protocol
# guards, not safety interlocks in the hazard sense.
```

## Notes
- Source document covers Arcam AVR390/AVR550/AVR850/AVR860/SR250 family. SR250-specific behaviour is identical at the protocol level; family-only options (e.g. DAB-specific 0x0C/0x0E/0x19 entries) noted where present.
- Frame format: `<St=0x21> <Zn> <Cc> <Dl> <Data...> <Et=0x0D>`. Response adds an `<Ac>` byte after Cc. AV responds within 3 s.
- Reserved command codes 0xF0-0xFF: source says "reserved for test functions and should never be used" — this is internal-test reservation, not a guard on user traffic.
- AMX Duet: ASCII `"AMX\r"` returns `"AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=SR250><Device-Revision=x.y.z>\r"`. This is the only documented ASCII interaction; all other traffic is binary.
- Source typo in 0x20 example: response listed as `0x20 0x01 0x20 0x00 0x06 ...` (missing `0x21` start byte). Treated as a doc error — the response should start with `0x21` per the documented frame format.
- Source typo in 0x1A example: command listed as `0x21 0x01 0x1A 0xF0 0x0D` (data length `0xF0` instead of `0x01`). Treated as a doc error — Dl should be `0x01` per the command spec table immediately following.
- RC5 IR codes are parameter values of the Simulate RC5 command (0x08), not separate actions. The full list is captured in the `simulate_rc5_ir` action's `rc5_command` parameter description.
- IP control enabled by default-off; must be turned on via front-panel DIRECT button (hold 4 s) or OSD menu before TCP port 50000 is reachable.
- DAB commands (0x18, 0x19, 0x1A) and DAB-specific 0x0B/0x0C entries in 0x09 are noted as AVR450/750-only in the source; the SR250 has an FM tuner only. Sending these to an SR250 will return 0x85.
<!-- UNRESOLVED: per-channel/per-zone RC5 codes for Zone 2 are fully listed in
     the simulate_rc5_ir params. No additional gaps beyond what is marked
     unresolved above. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-01T20:32:58.752Z
last_checked_at: 2026-06-02T17:21:21.403Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:21.403Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 spec actions matched verbatim to source command codes with consistent shapes; transport parameters verified; source has no undocumented commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated. Voltage/current/power spec not in source."
- "All settable parameters in this protocol are encoded as data"
- "source mentions \"Any change resulting from these inputs is"
- "source does not document any multi-step command sequences"
- "source contains no electrical-safety, installation, or power-on"
- "per-channel/per-zone RC5 codes for Zone 2 are fully listed in"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
