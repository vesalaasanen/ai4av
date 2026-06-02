---
spec_id: admin/arcam-av4-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AV4 Series Control Spec"
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
retrieved_at: 2026-04-29T08:49:44.959Z
last_checked_at: 2026-06-02T17:21:15.789Z
generated_at: 2026-06-02T17:21:15.789Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state any safety warnings, interlocks, or power-on sequencing requirements."
  - "complete list of unsolicited/pushed event opcodes not stated in"
  - "no multi-step sequences described in the source."
  - "no interlocks or power-on sequencing requirements stated in source."
  - "firmware version compatibility ranges not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:15.789Z
  matched_actions: 52
  action_count: 52
  confidence: medium
  summary: "All 52 spec actions map to documented source opcodes with correct shapes and transport values verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Arcam AV4 Series Control Spec

## Summary
The Arcam AV4 Series covers the AVR390, AVR550, AVR850, AV860 and SR250 AV receivers. The vendor "Custom Installation Notes" document specifies a binary RS-232 control protocol (38,400 bps, 8N1, no flow control) carrying framed `0x21 ... 0x0D` command/response packets, plus an IP control path that uses the same wire format on TCP port 50000. Control must be enabled on the unit (front-panel DIRECT button for 4 s, or OSD menu) before either transport will respond.

<!-- UNRESOLVED: source does not state any safety warnings, interlocks, or power-on sequencing requirements. -->

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
  type: none  # inferred: no login/password/auth procedure in source
```

## Traits
```yaml
powerable: true      # inferred from Power (0x00) standby query
routable: true       # inferred from Video selection (0x0A) and Source commands
queryable: true      # inferred from large catalogue of state-query commands
levelable: true      # inferred from Set/Request Volume (0x0D), Bass/Treble EQ, Balance
```

## Actions
```yaml
- id: power_query
  label: Power State Query
  kind: query
  command: "21 {zone} 00 01 F0 0D"
  notes: "0xF0 in Data requests current power state. Response Data byte: 0x00 = standby, 0x01 = powered on."
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 = master, 0x02 = zone 2)

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "21 01 01 01 F0 0D"
  notes: "Zone 1 only. Response Data: 0x00 = off, 0x01 = L1, 0x02 = L2."

- id: headphones_query
  label: Headphone Connection Query
  kind: query
  command: "21 01 02 01 F0 0D"
  notes: "Zone 1 only. Response Data: 0x00 = not connected, 0x01 = connected."

- id: fm_genre_query
  label: FM Programme Type Query
  kind: query
  command: "21 {zone} 03 01 F0 0D"
  notes: "Returns 0x85 error if FM is not selected on the zone. Response carries ASCII programme type."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "21 01 04 01 {component} 0D"
  notes: "Component byte in Data selects subsystem: 0xF0 = RS232, 0xF1 = Host, 0xF2 = OSD, 0xF3 = DSP, 0xF4 = NET, 0xF5 = IAP. Response echoes component then major/minor version bytes."
  params:
    - name: component
      type: integer
      description: Subsystem selector (0xF0-0xF5)

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "21 01 05 02 AA AA 0D"
  notes: "Confirmation pattern 0xAA 0xAA required to avoid accidental restore."

- id: save_restore_secure_copy
  label: Save/Restore Secure Copy
  kind: action
  command: "21 01 06 07 {op} 55 55 {pin1} {pin2} {pin3} {pin4} 0D"
  notes: "op=0x00 saves backup, op=0x01 restores backup. Confirmation bytes 0x55 0x55 plus 4-digit PIN required. Returns 0x85 if no secure copy exists or another save is in progress."
  params:
    - name: op
      type: integer
      description: 0x00 = save, 0x01 = restore
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
  command: "21 {zone} 08 02 {system} {command} 0D"
  notes: "Sends a virtual RC5 frame. Any IR-reachable function can be invoked. RC5 code table is listed in the source from page 26 (Basic/Advanced Functions)."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: system
      type: integer
      description: RC5 system code (e.g. 0x10 for main, 0x17 for zone 2)
    - name: command
      type: integer
      description: RC5 command code

- id: display_information_type
  label: Display Information Type
  kind: action
  command: "21 {zone} 09 01 {mode} 0D"
  notes: "Selects VFD info panel. Mode values depend on current source: 0x00/0xE0/0xF0 universal; 0x01-0x03 for FM (radio text/programme type/signal strength); 0x01-0x04 for DAB; 0x01-0x05 for NET/USB (track/artist/album/audio type/rate). 0xF0 queries current."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: integer
      description: Display mode byte (source-dependent)

- id: video_selection
  label: Video Selection
  kind: action
  command: "21 01 0A 01 {source} 0D"
  notes: "Source: 0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=query. Returns 0x85 if setup screen is open."
  params:
    - name: source
      type: integer
      description: Source code (0x00-0x06) or 0xF0 to query

- id: select_analogue_digital
  label: Select Analogue/Digital Audio
  kind: action
  command: "21 {zone} 0B 01 {mode} 0D"
  notes: "Mode: 0x00=analogue, 0x01=digital, 0x02=HDMI, 0xF0=query. Returns 0x85 if setup screen is open."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: integer
      description: Audio source mode (0x00-0x02) or 0xF0 to query

- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  command: "21 {zone} 0C 01 {mode} 0D"
  notes: "Mode: 0xF0=query, 0xF1=Auto, 0xF2=On, 0xF3=Off. Response: 0x00=Off, 0x01=On, 0x02=Auto."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: mode
      type: integer
      description: 0xF0 query, 0xF1 Auto, 0xF2 On, 0xF3 Off

- id: set_volume
  label: Set Volume
  kind: action
  command: "21 {zone} 0D 01 {level} 0D"
  notes: "Level range 0x00-0x63 (0-99). 0xF0 in Data queries current volume. Example for 45: 21 01 0D 01 2D 0D."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: level
      type: integer
      description: Volume 0-99 (0x00-0x63)

- id: volume_query
  label: Volume Query
  kind: query
  command: "21 {zone} 0D 01 F0 0D"
  params:
    - name: zone
      type: integer
      description: Zone number

- id: mute_query
  label: Mute Status Query
  kind: query
  command: "21 {zone} 0E 01 F0 0D"
  notes: "Response: 0x00=muted, 0x01=not muted."

- id: direct_mode_query
  label: Direct Mode Status Query
  kind: query
  command: "21 01 0F 01 F0 0D"
  notes: "Zone 1 only. Response: 0x00=off, 0x01=on."

- id: decode_mode_2ch_query
  label: Decode Mode Status (2ch) Query
  kind: query
  command: "21 01 10 01 F0 0D"
  notes: "Zone 1 only. Response: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Reserved, 0x0C=DTS Virtual:X."

- id: decode_mode_mch_query
  label: Decode Mode Status (MCH) Query
  kind: query
  command: "21 01 11 01 F0 0D"
  notes: "Zone 1 only. Response: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Reserved, 0x0C=DTS Virtual:X."

- id: rds_query
  label: RDS Information Query
  kind: query
  command: "21 {zone} 12 01 F0 0D"
  notes: "Returns 0x85 if FM is not selected. Response carries ASCII RDS text."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: query
  command: "21 01 13 01 F0 0D"
  notes: "Zone 1 only. Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k."

- id: menu_status_query
  label: Menu Status Query
  kind: query
  command: "21 01 14 01 F0 0D"
  notes: "Zone 1 only. Response: 0x00=none, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB."

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  command: "21 {zone} 15 01 {preset} 0D"
  notes: "Preset 0x01-0x32 (1-50). 0xF0 queries current preset. Response when no preset selected: 0xFF. Returns 0x85 if tuner is not selected."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset
      type: integer
      description: Preset number 1-50 (0x01-0x32) or 0xF0 to query

- id: tune_frequency
  label: Tune Frequency
  kind: action
  command: "21 {zone} 16 01 {direction} 0D"
  notes: "FM step = 0.05 MHz. Direction: 0x00=decrement, 0x01=increment, 0xF0=query. Response Data1 = MHz, Data2 = 10s of kHz. Returns 0x85 if tuner not selected."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: direction
      type: integer
      description: 0x00 decrement, 0x01 increment, 0xF0 query

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "21 {zone} 18 01 F0 0D"
  notes: "Returns 0x85 if DAB is not selected. Response: 16-byte ASCII service label, space-padded."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: dab_programme_type_query
  label: DAB Programme Type Query
  kind: query
  command: "21 {zone} 19 01 F0 0D"
  notes: "Returns 0x85 if DAB is not selected. Response: 16-byte ASCII programme type, space-padded."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: dab_dls_query
  label: DAB DLS/PDT Info Query
  kind: query
  command: "21 {zone} 1A 01 F0 0D"
  notes: "Returns 0x85 if DAB is not selected. Response: 128-byte ASCII DLS text, space-padded."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: preset_details_query
  label: Preset Details Query
  kind: query
  command: "21 {zone} 1B 01 {preset} 0D"
  notes: "Preset 0x01-0x32 (1-50). Response: preset number, type (0x01=FM freq, 0x02=FM RDS name, 0x03=DAB), then frequency/name fields."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: preset
      type: integer
      description: Preset number 1-50

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "21 {zone} 1C 01 F0 0D"
  notes: "Returns 0x85 if network is not selected. Response Data1: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing. Data2..n = folder/file name in ASCII."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: current_source_query
  label: Current Source Query
  kind: query
  command: "21 {zone} 1D 01 F0 0D"
  notes: "Response: 0x00=Follow Zone 1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER(FM), 0x0C=TUNER(DAB), 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: headphone_override
  label: Headphone Over-ride (Mute Relays)
  kind: action
  command: "21 {zone} 1F 01 {state} 0D"
  notes: "Activates/deactivates mute relays (does not zero volume). 0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: state
      type: integer
      description: 0x00 clear, 0x01 set

- id: set_input_name
  label: Set/Request Input Name
  kind: action
  command: "21 01 20 {len} {ascii_bytes} 0D"
  notes: "Dl=0x01 with Data=0xF0 queries current name (Response Dl=0x0A = 10 chars). For setting: Dl = name length (limited to 10 ASCII chars). Example for 'BDP300': 21 01 20 06 42 44 50 33 30 30 0D."
  params:
    - name: name
      type: string
      description: Up to 10 ASCII characters (use 0xF0 as Data byte to query instead)

- id: fm_scan
  label: FM Scan
  kind: action
  command: "21 01 23 01 {direction} 0D"
  notes: "Direction: 0x01=up, 0x02=down. Only valid on FM input. Response: 0xFF while scanning."
  params:
    - name: direction
      type: integer
      description: 0x01 scan up, 0x02 scan down

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "21 01 24 01 F0 0D"
  notes: "Only valid on DAB input. Response: 0xFF while scanning."

- id: heartbeat
  label: Heartbeat
  kind: action
  command: "21 01 25 01 F0 0D"
  notes: "Resets the EuP standby timer. Response Data1: 0x00."

- id: reboot
  label: Reboot
  kind: action
  command: "21 01 26 06 52 45 42 4F 4F 54 0D"
  notes: "Confirmation string 'REBOOT' (0x52 0x45 0x42 0x4F 0x4F 0x54) required to avoid accidental reboot."

- id: treble_eq
  label: Treble Equalisation
  kind: action
  command: "21 {zone} 35 01 {value} 0D"
  notes: "Value: 0x00-0x0C = 0dB to +12dB, 0x81-0x8C = -1dB to -12dB, 0xF0=query, 0xF1=+1dB, 0xF2=-1dB."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Treble value (see notes)

- id: bass_eq
  label: Bass Equalisation
  kind: action
  command: "21 {zone} 36 01 {value} 0D"
  notes: "Value: 0x00-0x0C = 0dB to +12dB, 0x81-0x8C = -1dB to -12dB, 0xF0=query, 0xF1=+1dB, 0xF2=-1dB."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Bass value (see notes)

- id: room_eq
  label: Room Equalisation
  kind: action
  command: "21 {zone} 37 01 {value} 0D"
  notes: "Value: 0xF0=query, 0xF1=on, 0xF2=off. Response: 0x00=off, 0x01=on, 0x02=not calculated (off)."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: 0xF0 query, 0xF1 on, 0xF2 off

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "21 {zone} 38 01 {state} 0D"
  notes: "State: 0x00=off, 0x01=on, 0xF0=query."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: state
      type: integer
      description: 0x00 off, 0x01 on, 0xF0 query

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  command: "21 {zone} 39 01 {value} 0D"
  notes: "Value: 0x00-0x0A = 0-10, 0xF0=query, 0xF1=increment, 0xF2=decrement, 0xFF=off. Response: 0x00-0x0A=level, 0xFF=off."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Leveller value (see notes)

- id: dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset
  kind: action
  command: "21 {zone} 3A 01 {value} 0D"
  notes: "Value: 0x00-0x0F = 0 to +15dB, 0x80-0x8F = -1 to -15dB, 0xF0=query, 0xF1=+1dB, 0xF2=-1dB."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Calibration offset (see notes)

- id: balance
  label: Balance
  kind: action
  command: "21 {zone} 3B 01 {value} 0D"
  notes: "Value: 0x00-0x06 = 0 to 6, 0x81-0x86 = -1 to -6, 0xF0=query, 0xF1=+1, 0xF2=-1."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Balance value (see notes)

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: "21 {zone} 3F 01 {value} 0D"
  notes: "0.5dB steps. Value: 0x00-0x14 = positive 0 to +10dB, 0x81-0x94 = -0.5 to -10dB, 0xF0=query, 0xF1=+0.5dB, 0xF2=-0.5dB."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Subwoofer trim value (see notes)

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  command: "21 {zone} 40 01 {value} 0D"
  notes: "5ms steps. Value: 0x00-0x32 = 0 to 250ms, 0xF0=query, 0xF1=+5ms, 0xF2=-5ms."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: value
      type: integer
      description: Lipsync delay value (see notes)

- id: compression
  label: Compression
  kind: action
  command: "21 {zone} 41 01 {level} 0D"
  notes: "Level: 0x00=off, 0x01=medium, 0x02=high, 0xF0=query."
  params:
    - name: zone
      type: integer
      description: Zone number
    - name: level
      type: integer
      description: 0x00 off, 0x01 medium, 0x02 high, 0xF0 query

- id: video_parameters_query
  label: Incoming Video Parameters Query
  kind: query
  command: "21 {zone} 42 01 F0 0D"
  notes: "Response Dl=0x07: Data1-2=H-res MSB/LSB, Data3-4=V-res MSB/LSB, Data5=refresh Hz, Data6=interlace (0=progressive, 1=interlaced), Data7=aspect (0=undef, 1=4:3, 2=16:9)."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "21 {zone} 43 01 F0 0D"
  notes: "Response Dl=0x02: Data1=format (0x00=PCM, 0x01=Analogue Direct, 0x02=Dolby Digital, ... 0x16=Dolby Atmos, 0x17=DTS:X, 0x18=IMAX ENHANCED, 0x14=Unsupported, 0x15=Undetected), Data2=channel configuration (0x00-0x1B per source)."
  params:
    - name: zone
      type: integer
      description: Zone number

- id: audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "21 01 44 01 F0 0D"
  notes: "Zone 1 only. Response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected."

- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "21 01 45 01 {value} 0D"
  notes: "0.5dB steps. Value: 0x00=0dB, 0x81-0x94 = -0.5dB to -10.0dB, 0xF0=query, 0xF1=+0.5dB, 0xF2=-0.5dB."
  params:
    - name: value
      type: integer
      description: Sub stereo trim value (see notes)

- id: zone1_osd
  label: Zone 1 OSD On/Off
  kind: action
  command: "21 01 4E 01 {value} 0D"
  notes: "Value: 0xF0=query, 0xF1=on, 0xF2=off. Response: 0x00=On, 0x01=Off. NOTE: source example uses Cc 0x4A for the same command; 0x4E is the documented opcode in the table."
  params:
    - name: value
      type: integer
      description: 0xF0 query, 0xF1 on, 0xF2 off

- id: video_output_switching
  label: HDMI Video Output Switching
  kind: action
  command: "21 01 4F 01 {output} 0D"
  notes: "Output: 0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2, 0xF0=query."
  params:
    - name: output
      type: integer
      description: 0x02 Out 1, 0x03 Out 2, 0x04 Both, 0xF0 query

- id: amx_duet_discovery
  label: AMX Duet Discovery
  kind: action
  command: "AMX\r"
  notes: "ASCII command terminated with 0x0D. Response: 'AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={model}><Device-Revision=x.y.z>\\r' where x.y.z is the RS232 protocol version."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]
  command: "21 {zone} 00 01 F0 0D"
  notes: "Returned by Power (0x00) query."

- id: display_brightness
  type: enum
  values: [off, L1, L2]
  command: "21 01 01 01 F0 0D"
  notes: "Returned by Display Brightness (0x01) query."

- id: headphone_connected
  type: enum
  values: [not_connected, connected]
  command: "21 01 02 01 F0 0D"
  notes: "Returned by Headphones (0x02) query."

- id: volume_level
  type: integer
  range: [0, 99]
  command: "21 {zone} 0D 01 F0 0D"
  notes: "Returned by Set/Request Volume (0x0D) query."

- id: mute_state
  type: enum
  values: [muted, not_muted]
  command: "21 {zone} 0E 01 F0 0D"
  notes: "Returned by Request Mute Status (0x0E) query."

- id: direct_mode
  type: enum
  values: [off, on]
  command: "21 01 0F 01 F0 0D"
  notes: "Returned by Request Direct Mode Status (0x0F) query."

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, "5_7_ch_stereo", dts_neural_x, reserved, dts_virtual_x]
  command: "21 01 10 01 F0 0D"

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, reserved, dts_virtual_x]
  command: "21 01 11 01 F0 0D"

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, "4k"]
  command: "21 01 13 01 F0 0D"

- id: current_source
  type: enum
  values: [follow_zone1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  command: "21 {zone} 1D 01 F0 0D"
  notes: "0x0C (TUNER DAB) applies to AVR450/750 per source; not present in AV4 series but listed for reference."

- id: tuner_preset
  type: integer
  range: [1, 50]
  command: "21 {zone} 15 01 F0 0D"
  notes: "0xFF in response means no preset selected."

- id: menu_state
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  command: "21 01 14 01 F0 0D"

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]
  command: "21 {zone} 37 01 F0 0D"

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]
  command: "21 {zone} 0C 01 F0 0D"

- id: zone1_osd_state
  type: enum
  values: [on, off]
  command: "21 01 4E 01 F0 0D"

- id: hdmi_output
  type: enum
  values: [out1, out2, both]
  command: "21 01 4F 01 F0 0D"

- id: audio_sample_rate
  type: enum
  values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", unknown, undetected]
  command: "21 01 44 01 F0 0D"

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]
  command: "21 {zone} 1C 01 F0 0D"
  notes: "Response also includes the current folder/file name as ASCII data."
```

## Variables
```yaml
# Discrete settable ranges are exposed through their parent commands (e.g. volume,
# bass, treble, balance, lipsync, subwoofer trim, sub stereo trim, compression,
# dolby leveller, dolby volume calibration offset). The source does not define
# named "Variables" beyond these; settable parameters are encoded in the Data
# byte of their respective opcodes.
```

## Events
```yaml
# Per the source, the device pushes state-change messages to the controller
# whenever state is altered via front panel or IR remote. The document does
# not list these unsolicited messages with separate opcodes; they are
# described as using "the appropriate message type" matching the command that
# would have produced the change.
#
# UNRESOLVED: complete list of unsolicited/pushed event opcodes not stated in
# the source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in the source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # requires 0xAA 0xAA confirmation pattern
  - save_restore_secure_copy  # requires 0x55 0x55 confirmation pattern + 4-digit PIN
  - reboot                   # requires ASCII "REBOOT" confirmation
interlocks: []
# UNRESOLVED: no interlocks or power-on sequencing requirements stated in source.
```

## Notes
- Control must be enabled on the unit before either transport responds. RS232 can be enabled by holding the front-panel DIRECT button for 4 s ("RS232 CONTROL ON"). Both RS232 and IP can be enabled via OSD: press A then U on the remote, then in General Setup set Control to "On".
- IP control is via TCP port 50000. The wire format on the TCP socket is identical to the RS-232 framing (`0x21 ... 0x0D`).
- The device also responds to the ASCII AMX Duet discovery beacon "AMX\r" with an ASCII banner including `<Device-Make=ARCAM>`, `<Device-Model=...>`, and `<Device-Revision=x.y.z>` where x.y.z is the RS232 protocol version.
- Frame format reminder: every command and every response is bracketed by `0x21` (start) and `0x0D` (end). Responses include an Answer code byte: `0x00`=OK, `0x82`=Zone invalid, `0x83`=Command not recognised, `0x84`=Parameter not recognised, `0x85`=Command invalid at this time (e.g. while Setup Menu is showing), `0x86`=Invalid data length.
- Commands 0xF0-0xFF are reserved for test and must not be sent.
- Many commands return `0x85` when issued while the Setup Menu is on-screen, or when the source/zone context does not match (e.g. tuner commands on a non-tuner source).
- "Simulate RC5 IR Command" (0x08) gives full control of any IR-reachable function. RC5 system 0x10 = main zone, system 0x17 = zone 2. Examples: Power On = 16-123, Power Off = 16-124, Standby = 16-12, Volume+ = 16-16, Volume- = 16-17, Mute = 16-13, Source select keys 16-91..16-119 (Radio/Aux/Net/USB/AV/Sat/PVR/Game/BD/CD/STB/VCR/Display), HDMI Out 1/2/Both = 16-73/74/75.
- The source has a discrepancy in the Set/Request Zone 1 OSD command: the Cc in the table is `0x4E`, but the example sequence uses Cc `0x4A`. Flagged here; implementer should confirm against the unit. The other responses and parameters are consistent.
<!-- UNRESOLVED: firmware version compatibility ranges not stated in source. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-04-29T08:49:44.959Z
last_checked_at: 2026-06-02T17:21:15.789Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:15.789Z
matched_actions: 52
action_count: 52
confidence: medium
summary: "All 52 spec actions map to documented source opcodes with correct shapes and transport values verified verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state any safety warnings, interlocks, or power-on sequencing requirements."
- "complete list of unsolicited/pushed event opcodes not stated in"
- "no multi-step sequences described in the source."
- "no interlocks or power-on sequencing requirements stated in source."
- "firmware version compatibility ranges not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
