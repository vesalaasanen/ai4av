---
spec_id: admin/lexicon-rv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon MC-10 / RV-9 / RV-6 Control Spec"
manufacturer: Lexicon
model_family: MC-10
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - MC-10
    - RV-9
    - RV-6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb6944f6d/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-04-29T13:46:22.662Z
last_checked_at: 2026-06-02T17:22:50.680Z
generated_at: 2026-06-02T17:22:50.680Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, exact voltage/current, model-by-model deltas (RV-6 vs RV-9 vs MC-10) not enumerated in source."
  - "specific event/notification opcodes not detailed in source beyond"
  - "no multi-step sequences explicitly described in source beyond the AMX"
  - "no explicit power-on sequencing, interlock, or hazard warnings in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:22:50.680Z
  matched_actions: 176
  action_count: 176
  confidence: medium
  summary: "All 176 spec action commands match verbatim source opcodes and RC5 codes; transport (port 50000, 38400 baud, null modem) confirmed in source; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Lexicon MC-10 / RV-9 / RV-6 Control Spec

## Summary
The Lexicon MC-10, RV-9 and RV-6 are AV receivers controllable over RS-232 and TCP/IP on port 50000 using a binary framed protocol. All commands and responses share the format `0x21 <Zone> <Cmd> <DataLen> <Data...> 0x0D`; the device also accepts any IR-remote function via the Simulate RC5 IR command.

<!-- UNRESOLVED: firmware version compatibility, exact voltage/current, model-by-model deltas (RV-6 vs RV-9 vs MC-10) not enumerated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 50000  # source: "IP control is via port 50000 of the IP address of the unit"
serial:
  baud_rate: 38400  # source: "Transfer rate: 38,400bps"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  cable: null_modem  # source: "wired as a null modem" (pin 2↔3, pin 5↔5)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred: 0x00 power commands
- queryable       # inferred: 0xF0 query variants across many commands
- routable        # inferred: 0x0A video source select, 0x4F HDMI output switch
- levelable       # inferred: 0x0D volume, 0x35/0x36 bass/treble, 0x3B balance, 0x3F sub trim
```

## Actions
```yaml
# System
- id: power_state_query
  label: Power State Query
  kind: query
  command: "0x21 <Zone> 0x00 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response Data: 0x00=standby, 0x01=powered on.

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response Data: 0x00=off, 0x01=L1, 0x02=L2.

- id: headphones_status_query
  label: Headphones Connection Status
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response Data: 0x00=not connected, 0x01=connected.

- id: fm_programme_type_query
  label: FM Programme Type Query
  kind: query
  command: "0x21 <Zone> 0x03 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if FM not selected. Response data is ASCII string.

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "0x21 0x01 0x04 0x01 <Component> 0x0D"
  params:
    - name: Component
      type: integer
      description: 0xF0=RS232, 0xF1=Host, 0xF2=OSD, 0xF3=DSP, 0xF4=NET, 0xF5=IAP
  notes: |
    Response: echo byte, major, minor.

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []
  notes: |
    Requires confirmation pattern 0xAA 0xAA. Resets all settings.

- id: save_secure_backup
  label: Save Secure Backup
  kind: action
  command: "0x21 0x01 0x06 0x07 0x00 0x55 0x55 <Pin1> <Pin2> <Pin3> <Pin4> 0x0D"
  params:
    - name: Pin1
      type: integer
      description: PIN digit 1
    - name: Pin2
      type: integer
      description: PIN digit 2
    - name: Pin3
      type: integer
      description: PIN digit 3
    - name: Pin4
      type: integer
      description: PIN digit 4

- id: restore_secure_backup
  label: Restore Secure Backup
  kind: action
  command: "0x21 0x01 0x06 0x07 0x01 0x55 0x55 <Pin1> <Pin2> <Pin3> <Pin4> 0x0D"
  params:
    - name: Pin1
      type: integer
      description: PIN digit 1
    - name: Pin2
      type: integer
      description: PIN digit 2
    - name: Pin3
      type: integer
      description: PIN digit 3
    - name: Pin4
      type: integer
      description: PIN digit 4
  notes: |
    Returns 0x85 if no secure copy exists. Fails silently if a save is already in progress.

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 <Zone> 0x08 0x02 <System> <Command> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: System
      type: integer
      description: RC5 system code (e.g. 0x10 for main, 0x17 for Zone 2)
    - name: Command
      type: integer
      description: RC5 command code
  notes: |
    Simulates any IR-remote function. See RC5 code tables for system/command values.

- id: display_info_type
  label: Set Display Information Type
  kind: action
  command: "0x21 <Zone> 0x09 0x01 <Mode> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Mode
      type: integer
      description: 0x00=Processing, 0xE0=Cycle, 0xF0=Query; FM: 0x01=Radio text, 0x02=Programme type, 0x03=Signal strength; DAB: 0x01=Radio text, 0x02=Genre, 0x03=Signal quality, 0x04=Bit rate; NET/USB: 0x01=Track, 0x02=Artist, 0x03=Album, 0x04=Audio type, 0x05=Rate
  notes: |
    Echoes current mode in response.

- id: current_source_query
  label: Current Source Query
  kind: query
  command: "0x21 <Zone> 0x1D 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response Data: 0x00=Follow Z1, 0x01=CD, 0x02=BD, 0x03=AV, 0x04=SAT, 0x05=PVR, 0x06=VCR, 0x08=AUX, 0x09=DISPLAY, 0x0B=TUNER FM, 0x0C=TUNER DAB, 0x0E=NET, 0x0F=USB, 0x10=STB, 0x11=GAME.

- id: headphone_override
  label: Headphone Over-ride (Mute Relays)
  kind: action
  command: "0x21 <Zone> 0x1F 0x01 <State> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: State
      type: integer
      description: 0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)
  notes: |
    Does not zero the volume.

# Input
- id: video_selection
  label: Video Input Selection
  kind: action
  command: "0x21 0x01 0x0A 0x01 <Source> 0x0D"
  params:
    - name: Source
      type: integer
      description: 0x00=BD, 0x01=SAT, 0x02=AV, 0x03=PVR, 0x04=VCR, 0x05=Game, 0x06=STB, 0xF0=Query
  notes: |
    Returns 0x85 if OSD setup screen is showing.

- id: video_selection_query
  label: Video Input Query
  kind: query
  command: "0x21 0x01 0x0A 0x01 0xF0 0x0D"
  params: []

- id: audio_input_select
  label: Audio Input Type (Analogue/Digital/HDMI)
  kind: action
  command: "0x21 <Zone> 0x0B 0x01 <Type> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Type
      type: integer
      description: 0x00=Analogue, 0x01=Digital, 0x02=HDMI, 0xF0=Query
  notes: |
    Returns 0x85 if OSD setup screen is showing.

- id: audio_input_query
  label: Audio Input Type Query
  kind: query
  command: "0x21 <Zone> 0x0B 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0x00=Analogue, 0x01=Digital, 0x02=HDMI.

# Output
- id: set_volume
  label: Set Volume
  kind: action
  command: "0x21 <Zone> 0x0D 0x01 <Volume> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Volume
      type: integer
      description: Volume in dB (0x00=0dB to 0x63=99dB)
  notes: |
    Returns volume even if zone is muted.

- id: volume_query
  label: Volume Query
  kind: query
  command: "0x21 <Zone> 0x0D 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "0x21 <Zone> 0x0E 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0x00=muted, 0x01=not muted.

- id: direct_mode_status_query
  label: Direct Mode Status Query
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x00=off, 0x01=on.

- id: decode_mode_2ch_query
  label: Decode Mode Status (2-channel) Query
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x01=Stereo, 0x04=Dolby Surround, 0x07=Neo:6 Cinema, 0x08=Neo:6 Music, 0x09=5/7 Ch Stereo, 0x0A=DTS Neural:X, 0x0B=Logic7 Immersion, 0x0C=DTS Virtual:X.

- id: decode_mode_mch_query
  label: Decode Mode Status (MCH) Query
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x01=Stereo down-mix, 0x02=Multi-channel, 0x03=DTS-ES/Neural:X, 0x06=Dolby Surround, 0x0B=Logic7 Immersion, 0x0C=DTS Virtual:X.

- id: rds_info_query
  label: RDS Information Query
  kind: query
  command: "0x21 <Zone> 0x12 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if FM not selected. Response data is ASCII.

- id: video_output_resolution_query
  label: Video Output Resolution Query
  kind: query
  command: "0x21 0x01 0x13 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x02=SD Progressive, 0x03=720p, 0x04=1080i, 0x05=1080p, 0x06=Preferred, 0x07=Bypass, 0x08=4k.

# Menu
- id: menu_status_query
  label: Open Menu Status Query
  kind: query
  command: "0x21 0x01 0x14 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x00=None, 0x02=Setup, 0x03=Trim, 0x04=Bass, 0x05=Treble, 0x06=Sync, 0x07=Sub, 0x08=Tuner, 0x09=Network, 0x0A=USB.

- id: tuner_preset_select
  label: Tuner Preset Select
  kind: action
  command: "0x21 <Zone> 0x15 0x01 <Preset> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Preset
      type: integer
      description: Preset number 0x01-0x32 (1-50)
  notes: |
    Returns 0x85 if tuner not selected on zone.

- id: tuner_preset_query
  label: Tuner Preset Query
  kind: query
  command: "0x21 <Zone> 0x15 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0xFF=no preset, else 0x01-0x32.

- id: tune
  label: Tune FM Frequency
  kind: action
  command: "0x21 <Zone> 0x16 0x01 <Direction> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Direction
      type: integer
      description: 0x00=decrement 0.05MHz, 0x01=increment 0.05MHz, 0xF0=Query
  notes: |
    Returns 0x85 if tuner not selected. Response: 2 bytes (MHz, 10s of kHz).

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "0x21 <Zone> 0x18 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if DAB not selected. Response: 16-byte ASCII service label, space-padded.

- id: dab_programme_type_query
  label: DAB Programme Type/Category Query
  kind: query
  command: "0x21 <Zone> 0x19 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if DAB not selected. Response: 16-byte ASCII, space-padded.

- id: dab_dls_pdt_query
  label: DAB DLS/PDT Info Query
  kind: query
  command: "0x21 <Zone> 0x1A 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if DAB not selected. Response: 128-byte ASCII, space-padded.

- id: preset_details_query
  label: Preset Details Query
  kind: query
  command: "0x21 <Zone> 0x1B 0x01 <Preset> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Preset
      type: integer
      description: Preset number 0x01-0x32 (1-50)
  notes: |
    Response: preset#, type (0x01=FM freq, 0x02=FM RDS name, 0x03=DAB), freq bytes, name in ASCII.

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "0x21 <Zone> 0x1C 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Returns 0x85 if network not selected. Response: 0x00=Navigating, 0x01=Playing, 0x02=Paused, 0xFF=Busy/Not Playing.

# Setup Adjustment
- id: imax_enhanced
  label: IMAX Enhanced
  kind: action
  command: "0x21 <Zone> 0x0C 0x01 <Mode> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Mode
      type: integer
      description: 0xF0=Query, 0xF1=Auto, 0xF2=On, 0xF3=Off

- id: imax_enhanced_query
  label: IMAX Enhanced Query
  kind: query
  command: "0x21 <Zone> 0x0C 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0x00=Off, 0x01=On, 0x02=Auto.

- id: treble_eq
  label: Treble Equalisation
  kind: action
  command: "0x21 <Zone> 0x35 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Query, 0xF1=+1dB, 0xF2=-1dB

- id: treble_eq_query
  label: Treble EQ Query
  kind: query
  command: "0x21 <Zone> 0x35 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: bass_eq
  label: Bass Equalisation
  kind: action
  command: "0x21 <Zone> 0x36 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x0C = 0dB to +12dB; 0x81-0x8C = -1dB to -12dB; 0xF0=Query, 0xF1=+1dB, 0xF2=-1dB

- id: bass_eq_query
  label: Bass EQ Query
  kind: query
  command: "0x21 <Zone> 0x36 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: room_eq
  label: Room Equalisation
  kind: action
  command: "0x21 <Zone> 0x37 0x01 <State> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: State
      type: integer
      description: 0xF0=Query, 0xF1=On, 0xF2=Off
  notes: |
    Response 0x02 indicates Room EQ has not been calculated.

- id: room_eq_query
  label: Room EQ State Query
  kind: query
  command: "0x21 <Zone> 0x37 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0x00=Off, 0x01=On, 0x02=Not calculated.

- id: dolby_volume
  label: Dolby Volume
  kind: action
  command: "0x21 <Zone> 0x38 0x01 <State> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: State
      type: integer
      description: 0x00=Off, 0x01=On, 0xF0=Query

- id: dolby_volume_query
  label: Dolby Volume Query
  kind: query
  command: "0x21 <Zone> 0x38 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: dolby_leveller
  label: Dolby Leveller
  kind: action
  command: "0x21 <Zone> 0x39 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x0A = 0 to 10; 0xF0=Query, 0xF1=+1, 0xF2=-1, 0xFF=Off

- id: dolby_leveller_query
  label: Dolby Leveller Query
  kind: query
  command: "0x21 <Zone> 0x39 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: dolby_volume_calibration_offset
  label: Dolby Volume Calibration Offset
  kind: action
  command: "0x21 <Zone> 0x3A 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x0F = 0dB to +15dB; 0x80-0x8F = -1dB to -15dB; 0xF0=Query, 0xF1=+1dB, 0xF2=-1dB

- id: dolby_volume_calibration_offset_query
  label: Dolby Volume Calibration Offset Query
  kind: query
  command: "0x21 <Zone> 0x3A 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: balance
  label: Balance
  kind: action
  command: "0x21 <Zone> 0x3B 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x06 = 0 to 6 (right); 0x81-0x86 = -1 to -6 (left); 0xF0=Query, 0xF1=+1, 0xF2=-1

- id: balance_query
  label: Balance Query
  kind: query
  command: "0x21 <Zone> 0x3B 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: subwoofer_trim
  label: Subwoofer Trim
  kind: action
  command: "0x21 <Zone> 0x3F 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x14 = 0 to +10dB in 0.5dB steps; 0x81-0x94 = -0.5dB to -10dB; 0xF0=Query, 0xF1=+0.5dB, 0xF2=-0.5dB

- id: subwoofer_trim_query
  label: Subwoofer Trim Query
  kind: query
  command: "0x21 <Zone> 0x3F 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: lipsync_delay
  label: Lipsync Delay
  kind: action
  command: "0x21 <Zone> 0x40 0x01 <Value> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Value
      type: integer
      description: 0x00-0x32 = 0ms to 250ms in 5ms steps; 0xF0=Query, 0xF1=+5ms, 0xF2=-5ms

- id: lipsync_delay_query
  label: Lipsync Delay Query
  kind: query
  command: "0x21 <Zone> 0x40 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: compression
  label: Dynamic Range Compression
  kind: action
  command: "0x21 <Zone> 0x41 0x01 <Level> 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: Level
      type: integer
      description: 0x00=Off, 0x01=Medium, 0x02=High, 0xF0=Query

- id: compression_query
  label: Compression Query
  kind: query
  command: "0x21 <Zone> 0x41 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: incoming_video_params_query
  label: Incoming Video Parameters Query
  kind: query
  command: "0x21 <Zone> 0x42 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 7 bytes - H-res MSB/LSB, V-res MSB/LSB, refresh, interlace flag, aspect (0=undef, 1=4:3, 2=16:9).

- id: incoming_audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "0x21 <Zone> 0x43 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: stream format (0x00=PCM ... 0x18=IMAX ENHANCED), channel config.

- id: incoming_audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "0x21 <Zone> 0x44 0x01 0xF0 0x0D"
  params:
    - name: Zone
      type: integer
      description: Zone number (0x01 or 0x02)
  notes: |
    Response: 0x00=32kHz, 0x01=44.1kHz, 0x02=48kHz, 0x03=88.2kHz, 0x04=96kHz, 0x05=176.4kHz, 0x06=192kHz, 0x07=Unknown, 0x08=Undetected.

- id: sub_stereo_trim
  label: Sub Stereo Trim
  kind: action
  command: "0x21 0x01 0x45 0x01 <Value> 0x0D"
  params:
    - name: Value
      type: integer
      description: 0x00=0dB; 0x81-0x94=-0.5dB to -10dB; 0xF0=Query, 0xF1=+0.5dB, 0xF2=-0.5dB

- id: sub_stereo_trim_query
  label: Sub Stereo Trim Query
  kind: query
  command: "0x21 0x01 0x45 0x01 0xF0 0x0D"
  params: []

- id: zone1_osd
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 <State> 0x0D"
  params:
    - name: State
      type: integer
      description: 0xF0=Query, 0xF1=On, 0xF2=Off

- id: zone1_osd_query
  label: Zone 1 OSD State Query
  kind: query
  command: "0x21 0x01 0x4E 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: 0x00=On, 0x01=Off.

- id: video_output_switching
  label: HDMI Video Output Switching
  kind: action
  command: "0x21 0x01 0x4F 0x01 <Output> 0x0D"
  params:
    - name: Output
      type: integer
      description: 0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1&2, 0xF0=Query

- id: video_output_switching_query
  label: HDMI Video Output Query
  kind: query
  command: "0x21 0x01 0x4F 0x01 0xF0 0x0D"
  params: []

- id: set_input_name
  label: Set Input Name
  kind: action
  command: "0x21 0x01 0x20 <n> <Name ASCII bytes> 0x0D"
  params:
    - name: Name
      type: string
      description: Up to 10 ASCII characters
  notes: |
    Data length = number of name bytes. Source example sets current input to "BDP300".

- id: input_name_query
  label: Input Name Query
  kind: query
  command: "0x21 0x01 0x20 0x01 0xF0 0x0D"
  params: []
  notes: |
    Response: up to 10 ASCII characters (response Dl = 0x0A).

- id: fm_scan
  label: FM Scan Up/Down
  kind: action
  command: "0x21 0x01 0x23 0x01 <Direction> 0x0D"
  params:
    - name: Direction
      type: integer
      description: 0x01=Scan up, 0x02=Scan down
  notes: |
    Only valid if FM input selected. Response Data: 0xFF=scanning.

- id: dab_scan
  label: DAB Scan
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []
  notes: |
    Only valid if DAB input selected. Response Data: 0xFF=scanning.

- id: heartbeat
  label: Heartbeat
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []
  notes: |
    Resets EuP standby timer. Response Data: 0x00.

- id: reboot
  label: Reboot
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
  notes: |
    Forces reboot. Data = ASCII "REBOOT".

# RC5 IR simulation codes (via 0x08)
- id: rc5_standby
  label: Standby (RC5 16-12)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0C 0x0D"
  params: []

- id: rc5_power_on
  label: Power On (RC5 16-123)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x7B 0x0D"
  params: []

- id: rc5_power_off
  label: Power Off (RC5 16-124)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x7C 0x0D"
  params: []

- id: rc5_volume_up
  label: Volume Up (RC5 16-16)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x10 0x0D"
  params: []

- id: rc5_volume_down
  label: Volume Down (RC5 16-17)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x11 0x0D"
  params: []

- id: rc5_mute
  label: Mute (RC5 16-13)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0D 0x0D"
  params: []

- id: rc5_mute_on
  label: Mute On (RC5 16-26)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1A 0x0D"
  params: []

- id: rc5_mute_off
  label: Mute Off (RC5 16-120)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x78 0x0D"
  params: []

- id: rc5_disp
  label: VFD Brightness (RC5 16-59)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x3B 0x0D"
  params: []

- id: rc5_display_off
  label: Display Off (RC5 16-31)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1F 0x0D"
  params: []

- id: rc5_display_l1
  label: Display L1 (RC5 16-34)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x22 0x0D"
  params: []

- id: rc5_display_l2
  label: Display L2 (RC5 16-35)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x23 0x0D"
  params: []

- id: rc5_menu
  label: Enter System Menu (RC5 16-82)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x52 0x0D"
  params: []

- id: rc5_trim_menu
  label: Enter Trim Menu (RC5 16-90)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5A 0x0D"
  params: []

- id: rc5_room_eq_toggle
  label: Room EQ On/Off (RC5 16-30)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1E 0x0D"
  params: []

- id: rc5_dolby_volume_toggle
  label: Dolby Volume On/Off (RC5 16-70)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x46 0x0D"
  params: []

- id: rc5_direct_mode_toggle
  label: Activate DIRECT mode (RC5 16-10)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0A 0x0D"
  params: []

- id: rc5_direct_mode_on
  label: Direct Mode On (RC5 16-78)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4E 0x0D"
  params: []

- id: rc5_direct_mode_off
  label: Direct Mode Off (RC5 16-79)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4F 0x0D"
  params: []

- id: rc5_mode_cycle
  label: Cycle Decode Modes (RC5 16-32)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x20 0x0D"
  params: []

- id: rc5_lipsync_access
  label: Access Lipsync Delay (RC5 16-50)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x32 0x0D"
  params: []

- id: rc5_lipsync_plus
  label: Lip Sync +5ms (RC5 16-15)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0F 0x0D"
  params: []

- id: rc5_lipsync_minus
  label: Lip Sync -5ms (RC5 16-101)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x65 0x0D"
  params: []

- id: rc5_sub_trim_access
  label: Access Subwoofer Trim (RC5 16-51)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x33 0x0D"
  params: []

- id: rc5_sub_trim_plus
  label: Sub Trim +0.5dB (RC5 16-105)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x69 0x0D"
  params: []

- id: rc5_sub_trim_minus
  label: Sub Trim -0.5dB (RC5 16-108)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6C 0x0D"
  params: []

- id: rc5_bass_access
  label: Access Bass (RC5 16-39)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x27 0x0D"
  params: []

- id: rc5_bass_plus
  label: Bass +1 (RC5 16-44)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2C 0x0D"
  params: []

- id: rc5_bass_minus
  label: Bass -1 (RC5 16-45)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2D 0x0D"
  params: []

- id: rc5_treble_access
  label: Access Treble (RC5 16-14)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0E 0x0D"
  params: []

- id: rc5_treble_plus
  label: Treble +1 (RC5 16-46)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2E 0x0D"
  params: []

- id: rc5_treble_minus
  label: Treble -1 (RC5 16-102)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x66 0x0D"
  params: []

- id: rc5_balance_left
  label: Balance Left (RC5 16-38)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x26 0x0D"
  params: []

- id: rc5_balance_right
  label: Balance Right (RC5 16-40)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x28 0x0D"
  params: []

- id: rc5_speaker_trim_access
  label: Access Speaker Trim (RC5 16-37)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x25 0x0D"
  params: []

- id: rc5_hdmi_out1
  label: Select HDMI Out 1 (RC5 16-73)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x49 0x0D"
  params: []

- id: rc5_hdmi_out2
  label: Select HDMI Out 2 (RC5 16-74)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4A 0x0D"
  params: []

- id: rc5_hdmi_out_both
  label: Select HDMI Out 1 & 2 (RC5 16-75)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4B 0x0D"
  params: []

- id: rc5_resolution_cycle
  label: Cycle Output Resolutions (RC5 16-47)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2F 0x0D"
  params: []

- id: rc5_input_numeric
  label: Numeric Key 0-9
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 <Digit> 0x0D"
  params:
    - name: Digit
      type: integer
      description: 0x00=0, 0x01=1, 0x02=2, 0x03=3, 0x04=4, 0x05=5, 0x06=6, 0x07=7, 0x08=8, 0x09=9

- id: rc5_nav_up
  label: Navigate Up (RC5 16-86)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x56 0x0D"
  params: []

- id: rc5_nav_down
  label: Navigate Down (RC5 16-85)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x55 0x0D"
  params: []

- id: rc5_nav_left
  label: Navigate Left (RC5 16-81)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x51 0x0D"
  params: []

- id: rc5_nav_right
  label: Navigate Right (RC5 16-80)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x50 0x0D"
  params: []

- id: rc5_ok
  label: OK (RC5 16-87)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x57 0x0D"
  params: []

- id: rc5_home
  label: HOME (RC5 16-43)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2B 0x0D"
  params: []

- id: rc5_play
  label: Play (RC5 16-53)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x35 0x0D"
  params: []

- id: rc5_pause
  label: Pause (RC5 16-48)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x30 0x0D"
  params: []

- id: rc5_stop
  label: Stop (RC5 16-54)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x36 0x0D"
  params: []

- id: rc5_rewind
  label: Rewind (RC5 16-121)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x79 0x0D"
  params: []

- id: rc5_fast_forward
  label: Fast Forward (RC5 16-52)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x34 0x0D"
  params: []

- id: rc5_skip_back
  label: Skip Back (RC5 16-33)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x21 0x0D"
  params: []

- id: rc5_skip_forward
  label: Skip Forward (RC5 16-11)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x0B 0x0D"
  params: []

- id: rc5_random
  label: Random (RC5 16-76)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x4C 0x0D"
  params: []

- id: rc5_repeat
  label: Repeat (RC5 16-49)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x31 0x0D"
  params: []

- id: rc5_stereo
  label: Stereo Mode (RC5 16-107)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6B 0x0D"
  params: []

- id: rc5_multi_channel
  label: Multi Channel (RC5 16-106)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6A 0x0D"
  params: []

- id: rc5_dolby_surround
  label: Dolby Surround (RC5 16-110)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6E 0x0D"
  params: []

- id: rc5_dolby_d_ex
  label: Dolby D EX (RC5 16-23)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x17 0x0D"
  params: []

- id: rc5_dts_neo6_cinema
  label: DTS Neo:6 Cinema (RC5 16-111)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x6F 0x0D"
  params: []

- id: rc5_dts_neo6_music
  label: DTS Neo:6 Music (RC5 16-112)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x70 0x0D"
  params: []

- id: rc5_dts_neural_x
  label: DTS Neural:X (RC5 16-113)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x71 0x0D"
  params: []

- id: rc5_logic7_immersion
  label: Logic7 Immersion (RC5 16-114)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x72 0x0D"
  params: []

- id: rc5_dts_virtual_x
  label: DTS Virtual:X (RC5 16-115)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x73 0x0D"
  params: []

- id: rc5_5_7_ch_stereo
  label: 5/7 Ch Stereo (RC5 16-69)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x45 0x0D"
  params: []

- id: rc5_input_bd
  label: Select BD (RC5 16-98)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x62 0x0D"
  params: []

- id: rc5_input_cd
  label: Select CD (RC5 16-118)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x76 0x0D"
  params: []

- id: rc5_input_stb
  label: Select STB (RC5 16-100)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x64 0x0D"
  params: []

- id: rc5_input_vcr
  label: Select VCR (RC5 16-119)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x77 0x0D"
  params: []

- id: rc5_input_sat
  label: Select SAT (RC5 16-27)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1B 0x0D"
  params: []

- id: rc5_input_pvr
  label: Select PVR (RC5 16-96)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x60 0x0D"
  params: []

- id: rc5_input_game
  label: Select Game (RC5 16-97)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x61 0x0D"
  params: []

- id: rc5_input_av
  label: Select AV (RC5 16-94)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5E 0x0D"
  params: []

- id: rc5_input_radio
  label: Select Radio (RC5 16-91)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5B 0x0D"
  params: []

- id: rc5_input_fm
  label: Select FM (RC5 16-28)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x1C 0x0D"
  params: []

- id: rc5_input_dab
  label: Select DAB (RC5 16-72)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x48 0x0D"
  params: []

- id: rc5_input_net
  label: Select NET (RC5 16-92)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5C 0x0D"
  params: []

- id: rc5_input_usb
  label: Select USB (RC5 16-93)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5D 0x0D"
  params: []

- id: rc5_input_aux
  label: Select AUX (RC5 16-99)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x63 0x0D"
  params: []

- id: rc5_input_display
  label: Select Display (RC5 16-58)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x3A 0x0D"
  params: []

- id: rc5_zone_change
  label: Change to Next Zone (RC5 16-95)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x5F 0x0D"
  params: []

- id: rc5_zone2_power_on
  label: Zone 2 Power On (RC5 23-123)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7B 0x0D"
  params: []

- id: rc5_zone2_power_off
  label: Zone 2 Power Off (RC5 23-124)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x7C 0x0D"
  params: []

- id: rc5_zone2_vol_up
  label: Zone 2 Volume Up (RC5 23-1)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x01 0x0D"
  params: []

- id: rc5_zone2_vol_down
  label: Zone 2 Volume Down (RC5 23-2)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x02 0x0D"
  params: []

- id: rc5_zone2_mute
  label: Zone 2 Mute Toggle (RC5 23-3)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x03 0x0D"
  params: []

- id: rc5_zone2_mute_on
  label: Zone 2 Mute On (RC5 23-4)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x04 0x0D"
  params: []

- id: rc5_zone2_mute_off
  label: Zone 2 Mute Off (RC5 23-5)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x05 0x0D"
  params: []

- id: rc5_zone2_cd
  label: Zone 2 CD (RC5 23-6)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x06 0x0D"
  params: []

- id: rc5_zone2_bd
  label: Zone 2 BD (RC5 23-7)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x07 0x0D"
  params: []

- id: rc5_zone2_stb
  label: Zone 2 STB (RC5 23-8)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x08 0x0D"
  params: []

- id: rc5_zone2_av
  label: Zone 2 AV (RC5 23-9)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x09 0x0D"
  params: []

- id: rc5_zone2_game
  label: Zone 2 Game (RC5 23-11)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0B 0x0D"
  params: []

- id: rc5_zone2_aux
  label: Zone 2 Aux (RC5 23-13)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0D 0x0D"
  params: []

- id: rc5_zone2_pvr
  label: Zone 2 PVR (RC5 23-15)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0F 0x0D"
  params: []

- id: rc5_zone2_fm
  label: Zone 2 FM (RC5 23-14)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x0E 0x0D"
  params: []

- id: rc5_zone2_dab
  label: Zone 2 DAB (RC5 23-16)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x10 0x0D"
  params: []

- id: rc5_zone2_usb
  label: Zone 2 USB (RC5 23-18)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x12 0x0D"
  params: []

- id: rc5_zone2_net
  label: Zone 2 NET (RC5 23-19)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x13 0x0D"
  params: []

- id: rc5_zone2_sat
  label: Zone 2 SAT (RC5 23-20)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x14 0x0D"
  params: []

- id: rc5_zone2_vcr
  label: Zone 2 VCR (RC5 23-21)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x17 0x15 0x0D"
  params: []

- id: rc5_zone2_follow
  label: Zone 2 Follow Zone 1 (RC5 16-20)
  kind: action
  command: "0x21 0x02 0x08 0x02 0x10 0x14 0x0D"
  params: []

- id: rc5_color_red
  label: Red (RC5 16-41)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x29 0x0D"
  params: []

- id: rc5_color_green
  label: Green (RC5 16-42)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2A 0x0D"
  params: []

- id: rc5_color_yellow
  label: Yellow (RC5 16-43)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x2B 0x0D"
  params: []

- id: rc5_color_blue
  label: Blue (RC5 16-55)
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x37 0x0D"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, on]

- id: display_brightness
  type: enum
  values: [off, L1, L2]

- id: headphones_connected
  type: boolean

- id: current_source
  type: enum
  values: [follow_z1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]

- id: audio_input_type
  type: enum
  values: [analogue, digital, hdmi]

- id: video_output_resolution
  type: enum
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]

- id: mute_state
  type: boolean

- id: direct_mode_state
  type: boolean

- id: decode_mode_2ch
  type: enum
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, ch_5_7_stereo, dts_neural_x, logic7_immersion, dts_virtual_x]

- id: decode_mode_mch
  type: enum
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, logic7_immersion, dts_virtual_x]

- id: open_menu
  type: enum
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]

- id: tuner_preset
  type: enum
  values: [none, "1-50"]

- id: tuner_frequency
  type: string
  description: "Two bytes: MHz, 10s of kHz"

- id: dab_station_label
  type: string
  description: 16-byte ASCII service label, space-padded

- id: dab_programme_type
  type: string
  description: 16-byte ASCII, space-padded

- id: dab_dls_pdt
  type: string
  description: 128-byte ASCII, space-padded

- id: network_playback_state
  type: enum
  values: [navigating, playing, paused, busy]

- id: imax_enhanced_state
  type: enum
  values: [off, on, auto]

- id: incoming_video_params
  type: object
  description: "7 bytes: H-res MSB/LSB, V-res MSB/LSB, refresh, interlace flag, aspect ratio (0=undefined, 1=4:3, 2=16:9)"

- id: incoming_audio_format
  type: object
  description: "2 bytes: stream format + channel config"

- id: incoming_audio_sample_rate
  type: enum
  values: ["32kHz", "44.1kHz", "48kHz", "88.2kHz", "96kHz", "176.4kHz", "192kHz", "Unknown", "Undetected"]

- id: room_eq_state
  type: enum
  values: [off, on, not_calculated]

- id: dolby_volume_state
  type: boolean

- id: dolby_leveller_setting
  type: enum
  values: [off, "0-10"]

- id: dolby_volume_calibration_offset
  type: integer
  description: 0-15 dB positive (0x00-0x0F) or -1 to -15 dB (0x80-0x8F)

- id: balance
  type: integer
  description: 0-6 (right) or -1 to -6 (left)

- id: subwoofer_trim
  type: integer
  description: 0-20 positive (0x00-0x14) or 0x81-0x94 in 0.5dB steps

- id: lipsync_delay
  type: integer
  description: 0-250 ms in 5ms steps

- id: compression
  type: enum
  values: [off, medium, high]

- id: sub_stereo_trim
  type: integer
  description: 0 dB or -0.5dB to -10dB

- id: zone1_osd_state
  type: enum
  values: [on, off]

- id: video_output_switching
  type: enum
  values: [hdmi_out_1, hdmi_out_2, hdmi_out_1_2]

- id: input_name
  type: string
  description: Up to 10 ASCII characters

- id: scan_in_progress
  type: boolean

- id: heartbeat_ack
  type: boolean
```

## Variables
```yaml
- name: rs232_protocol_version
  type: string
  description: Returned by 0x04 query, format x.y.z

- name: software_versions
  type: object
  description: Host, OSD, DSP, NET, IAP version numbers from 0x04 with 0xF1-0xF5

- name: fm_programme_type
  type: string
  description: ASCII string from 0x03 query

- name: rds_info
  type: string
  description: ASCII radio text from 0x12 query

- name: preset_details
  type: object
  description: Preset number, type (FM freq / FM RDS name / DAB), frequency bytes, ASCII name from 0x1B
```

## Events
```yaml
# Source describes: "Any change resulting from [front panel or IR] inputs is relayed to the RC
# using the appropriate message type." Specific event opcodes not enumerated in source.
# UNRESOLVED: specific event/notification opcodes not detailed in source beyond
# the unsolicited response mechanism implied by the response format.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source beyond the AMX
# discovery handshake.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # source: 0x05 requires 0xAA 0xAA confirmation pattern
  - save_secure_backup        # source: 0x06 (save) requires 0x55 0x55 + 4-digit PIN
  - restore_secure_backup     # source: 0x06 (restore) requires 0x55 0x55 + 4-digit PIN
interlocks: []
# UNRESOLVED: no explicit power-on sequencing, interlock, or hazard warnings in source.
```

## Notes
- All commands and responses share framing `0x21 <Zone> <CmdCode> <DataLen> <Data...> 0x0D`. Responses insert an Answer Code byte (`Ac`) between `CmdCode` and `DataLen`.
- Zone 1 is the master zone; commands that omit a zone reference master.
- Reserved command codes 0xF0-0xFF are for test functions and should not be used.
- RS-232 control is disabled by default for minimum standby power; must be enabled via front panel (hold DIRECT for 4s) or OSD menu. IP control is via TCP port 50000.
- AV responds within 3 seconds; controller may send further commands before previous response.
- Commands not valid in current state (e.g. tuner control when tuner not selected) return 0x85. Setup-menu-open commands return 0x85.
- Many physical control inputs (source selection, HDMI output, transport, EQ, etc.) are documented as RC5 IR codes that can be re-emitted over RS-232/IP via the Simulate RC5 command (0x08). The above `rc5_*` actions enumerate the codes listed in the source's RC5 tables; the same mechanism can drive codes not enumerated here.

<!-- UNRESOLVED: -->
<!-- - Per-model deltas between MC-10, RV-9, and RV-6 (e.g. zone count, available inputs) not detailed in source. -->
<!-- - Firmware version compatibility / minimum version for any commands. -->
<!-- - Heartbeat polling interval / EuP standby timer duration. -->
<!-- - Specific unsolicited event opcodes. -->
<!-- - Source lists an "AVR450/750" reference in DAB-related commands; the RV-series applicability of those sub-features is not explicitly confirmed in the source beyond the AMX discovery responses naming MC-10, RV-9, RV-6. -->

## Provenance

```yaml
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwb6944f6d/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-04-29T13:46:22.662Z
last_checked_at: 2026-06-02T17:22:50.680Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:22:50.680Z
matched_actions: 176
action_count: 176
confidence: medium
summary: "All 176 spec action commands match verbatim source opcodes and RC5 codes; transport (port 50000, 38400 baud, null modem) confirmed in source; bidirectional coverage complete. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, exact voltage/current, model-by-model deltas (RV-6 vs RV-9 vs MC-10) not enumerated in source."
- "specific event/notification opcodes not detailed in source beyond"
- "no multi-step sequences explicitly described in source beyond the AMX"
- "no explicit power-on sequencing, interlock, or hazard warnings in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
