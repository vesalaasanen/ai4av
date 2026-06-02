---
spec_id: admin/lexicon-mc-8-mc-8b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon MC-8 / MC-8B Control Spec"
manufacturer: Lexicon
model_family: MC-8
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
  models:
    - MC-8
    - MC-8B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicon.com
  - manualslib.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
  - https://www.manualslib.com/manual/382538/Lexicon-Mc-8-V1-0-Serial-Communications-Protocol-Definition-Rev-1-4.html
  - https://www.manualslib.com/products/Lexicon-Mc-8-V2-0-Serial-Protocol-Definition-Rev-1-7-2417200.html
retrieved_at: 2026-05-14T17:15:09.378Z
last_checked_at: 2026-06-01T21:44:38.529Z
generated_at: 2026-06-01T21:44:38.529Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document was titled for MC-10 / RV-9 / RV-6. MC-8 / MC-8B share this Lexicon AVR protocol family, but per-model coverage (e.g. DAB tuner) was not separately confirmed in source."
  - "front-panel setup is required to enable Control (\"RS232 CONTROL ON\" via DIRECT button, 4s hold) before commands are accepted."
  - "source does not document any interlock procedures or safety warnings."
  - "source does not document power-on sequencing requirements."
  - "firmware version compatibility for MC-8 / MC-8B specifically not stated in source."
  - "which commands are accepted in standby state not stated."
  - "maximum IP command rate / pacing not stated; the 3-second response window is the only timing constraint documented."
  - "behaviour when a command is sent to a zone that does not exist (e.g. 0x03) is not separately documented beyond the answer-code table."
verification:
  verdict: verified
  checked_at: 2026-06-01T21:44:38.529Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec action units matched to verbatim source command codes; transport parameters fully supported; source's 51 command codes are completely represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-01
---

# Lexicon MC-8 / MC-8B Control Spec

## Summary
RS-232 and TCP/IP control protocol for Lexicon MC-8 / MC-8B AV processors. The device exposes a binary command/response frame over RS-232 (38,400 bps, 8N1, null modem) and TCP port 50000. The protocol implements virtual IR commands so any IR remote function can be replayed over the control link via the Simulate RC5 command (0x08). Two zones are addressable (0x01 master, 0x02 zone 2).

<!-- UNRESOLVED: source document was titled for MC-10 / RV-9 / RV-6. MC-8 / MC-8B share this Lexicon AVR protocol family, but per-model coverage (e.g. DAB tuner) was not separately confirmed in source. -->
<!-- UNRESOLVED: front-panel setup is required to enable Control ("RS232 CONTROL ON" via DIRECT button, 4s hold) before commands are accepted. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # standby/power state query (0x00); power on/off via Simulate RC5 0x08 codes 16-123 / 16-124
- routable        # input source select (0x0A, 0x0B, 0x1D); HDMI output switching (0x4F)
- queryable       # extensive status queries for every command code
- levelable       # volume (0x0D), treble (0x35), bass (0x36), balance (0x3B), sub trim (0x3F, 0x45), lipsync (0x40), Dolby cal (0x3A)
```

## Actions
```yaml
# All commands share the frame: 0x21 {Zn} {Cc} {Dl} {Data...} 0x0D
# St = 0x21 '!', Et = 0x0D, Zn = 0x01 (Zone 1) or 0x02 (Zone 2)
# Cc = command code (1 byte), Dl = data length (1 byte, excludes Et)
# Response frame: 0x21 {Zn} {Cc} {Ac} {Dl} {Data...} 0x0D
# Answer codes: 0x00 ok, 0x82 zone invalid, 0x83 cmd not recognised,
#                0x84 param not recognised, 0x85 cmd invalid at this time,
#                0x86 invalid data length
# Commands 0xF0-0xFF are reserved for test and must not be issued as opcodes.
# AV responds to each command within 3 seconds.

- id: power_state_query
  label: Power State Query
  kind: query
  command: "0x21 {zone} 0x00 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: display_brightness_query
  label: Display Brightness Query
  kind: query
  command: "0x21 0x01 0x01 0x01 0xF0 0x0D"
  params: []

- id: headphones_status_query
  label: Headphones Status Query
  kind: query
  command: "0x21 0x01 0x02 0x01 0xF0 0x0D"
  params: []

- id: fm_genre_query
  label: FM Programme Type Query
  kind: query
  command: "0x21 {zone} 0x03 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if FM not selected on the zone.

- id: software_version_query
  label: Software Version Query
  kind: query
  command: "0x21 0x01 0x04 0x01 {version_id} 0x0D"
  params:
    - name: version_id
      type: enum
      description: Which subsystem version to read.
      values: [0xF0, 0xF1, 0xF2, 0xF3, 0xF4, 0xF5]
      value_labels:
        0xF0: RS232 protocol version
        0xF1: Host version
        0xF2: OSD version
        0xF3: DSP version
        0xF4: NET version
        0xF5: IAP version

- id: restore_factory_defaults
  label: Restore Factory Defaults
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_secure_copy
  label: Save / Restore Secure Copy of Settings
  kind: action
  command: "0x21 0x01 0x06 0x07 {mode} 0x55 0x55 {pin1} {pin2} {pin3} {pin4} 0x0D"
  params:
    - name: mode
      type: enum
      description: 0x00 = Save secure backup, 0x01 = Restore secure backup
      values: [0x00, 0x01]
    - name: pin1
      type: integer
      description: PIN digit 1 (0x00-0x09)
    - name: pin2
      type: integer
      description: PIN digit 2 (0x00-0x09)
    - name: pin3
      type: integer
      description: PIN digit 3 (0x00-0x09)
    - name: pin4
      type: integer
      description: PIN digit 4 (0x00-0x09)

- id: simulate_rc5
  label: Simulate RC5 IR Command
  kind: action
  command: "0x21 0x01 0x08 0x02 {system_code} {command_code} 0x0D"
  params:
    - name: system_code
      type: enum
      description: RC5 system code. 0x10 = AV system (zone 1 / global). 0x17 = Zone 2 system.
      values: [0x10, 0x17]
    - name: command_code
      type: integer
      description: RC5 command code (0x00-0xFF). See RC5 command table in Notes for full mapping.

- id: display_info_type
  label: Set Display Information Type
  kind: action
  command: "0x21 {zone} 0x09 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "Display type code (see Notes for per-source value mapping). 0x00=Processing, 0xE0=Cycle all, 0xF0=Query current, plus per-source 0x01-0x05 codes."

- id: display_info_type_query
  label: Display Information Type Query
  kind: query
  command: "0x21 {zone} 0x09 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: current_source_query
  label: Current Source Query
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
      type: enum
      description: "0x00=Clear (speakers muted if headphones present), 0x01=Set (speakers unmuted if headphones present)"
      values: [0x00, 0x01]

- id: video_selection
  label: Video Selection
  kind: action
  command: "0x21 0x01 0x0A 0x01 {source} 0x0D"
  params:
    - name: source
      type: enum
      description: Video source code.
      values: [0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06]
      value_labels:
        0x00: BD
        0x01: SAT
        0x02: AV
        0x03: PVR
        0x04: VCR
        0x05: Game
        0x06: STB

- id: video_selection_query
  label: Video Selection Query
  kind: query
  command: "0x21 0x01 0x0A 0x01 0xF0 0x0D"
  params: []

- id: select_audio_input
  label: Select Analogue / Digital Audio Input
  kind: action
  command: "0x21 {zone} 0x0B 0x01 {audio} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: audio
      type: enum
      description: Audio input type for current source.
      values: [0x00, 0x01, 0x02, 0xF0]
      value_labels:
        0x00: Analogue
        0x01: Digital
        0x02: HDMI
        0xF0: Query

- id: select_audio_input_query
  label: Audio Input Type Query
  kind: query
  command: "0x21 {zone} 0x0B 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

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
      description: "0xF0=Query, 0xF1=Auto, 0xF2=On, 0xF3=Off"
      values: [0xF0, 0xF1, 0xF2, 0xF3]
      value_labels:
        0xF0: Query current state
        0xF1: Auto
        0xF2: On
        0xF3: Off

- id: imax_enhanced_query
  label: IMAX Enhanced Query
  kind: query
  command: "0x21 {zone} 0x0C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: volume_set
  label: Set Volume
  kind: action
  command: "0x21 {zone} 0x0D 0x01 {volume} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: volume
      type: integer
      description: Volume in dB attenuation 0-99 (0x00-0x63). 0 is loudest, 99 is quietest.

- id: volume_query
  label: Volume Query
  kind: query
  command: "0x21 {zone} 0x0D 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: mute_status_query
  label: Mute Status Query
  kind: query
  command: "0x21 {zone} 0x0E 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: direct_mode_query
  label: Direct Mode Status Query
  kind: query
  command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_2ch_query
  label: Decode Mode (2ch) Status Query
  kind: query
  command: "0x21 0x01 0x10 0x01 0xF0 0x0D"
  params: []

- id: decode_mode_mch_query
  label: Decode Mode (MCH) Status Query
  kind: query
  command: "0x21 0x01 0x11 0x01 0xF0 0x0D"
  params: []

- id: rds_info_query
  label: RDS Information Query
  kind: query
  command: "0x21 {zone} 0x12 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if FM not selected.

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

- id: tuner_preset_select
  label: Select Tuner Preset
  kind: action
  command: "0x21 {zone} 0x15 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: Preset number 1-50 (0x01-0x32). Returns 0x85 if tuner not selected on the zone.

- id: tuner_preset_query
  label: Current Tuner Preset Query
  kind: query
  command: "0x21 {zone} 0x15 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if tuner not selected.

- id: tune_step
  label: Increment / Decrement Tuner Frequency
  kind: action
  command: "0x21 {zone} 0x16 0x01 {direction} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: direction
      type: enum
      description: 0x00 = Decrement by 1 step (0.05 MHz FM), 0x01 = Increment by 1 step.
      values: [0x00, 0x01]

- id: tune_query
  label: Current Tuner Frequency Query
  kind: query
  command: "0x21 {zone} 0x16 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if tuner not selected.

- id: dab_station_query
  label: DAB Station Query
  kind: query
  command: "0x21 {zone} 0x18 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if DAB not selected.

- id: dab_prog_type_query
  label: DAB Programme Type / Category Query
  kind: query
  command: "0x21 {zone} 0x19 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if DAB not selected.

- id: dab_dls_pdt_query
  label: DAB DLS / PDT Info Query
  kind: query
  command: "0x21 {zone} 0x1A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if DAB not selected.

- id: preset_details_query
  label: Tuner Preset Details Query
  kind: query
  command: "0x21 {zone} 0x1B 0x01 {preset} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: preset
      type: integer
      description: Preset number to query, 1-50 (0x01-0x32)

- id: network_playback_status_query
  label: Network Playback Status Query
  kind: query
  command: "0x21 {zone} 0x1C 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02). Returns 0x85 if network source not selected.

- id: set_input_name
  label: Set Input Name
  kind: action
  command: "0x21 0x01 0x20 0x{len} {name_bytes} 0x0D"
  params:
    - name: name
      type: string
      description: Up to 10 ASCII characters. Dl byte = length of string.

- id: input_name_query
  label: Input Name Query
  kind: query
  command: "0x21 0x01 0x20 0x01 0xF0 0x0D"
  params: []

- id: fm_scan
  label: FM Scan
  kind: action
  command: "0x21 0x01 0x23 0x01 {direction} 0x0D"
  params:
    - name: direction
      type: enum
      description: 0x01 = Scan up, 0x02 = Scan down
      values: [0x01, 0x02]

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
  # Returns 0x00. Resets the EuP standby timer.

- id: reboot
  label: Reboot Unit
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
  # Confirmation bytes are ASCII "REBOOT".

- id: treble_eq_set
  label: Treble Equalisation
  kind: action
  command: "0x21 {zone} 0x35 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0C = 0 to +12 dB. 0x81-0x8C = -1 to -12 dB. 0xF1 = +1 dB step. 0xF2 = -1 dB step."

- id: treble_eq_query
  label: Treble Equalisation Query
  kind: query
  command: "0x21 {zone} 0x35 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: bass_eq_set
  label: Bass Equalisation
  kind: action
  command: "0x21 {zone} 0x36 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0C = 0 to +12 dB. 0x81-0x8C = -1 to -12 dB. 0xF1 = +1 dB step. 0xF2 = -1 dB step."

- id: bass_eq_query
  label: Bass Equalisation Query
  kind: query
  command: "0x21 {zone} 0x36 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: room_eq
  label: Room Equalisation
  kind: action
  command: "0x21 {zone} 0x37 0x01 {state} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: state
      type: enum
      description: "0xF1=On, 0xF2=Off"
      values: [0xF1, 0xF2]
      value_labels:
        0xF1: Room EQ on
        0xF2: Room EQ off

- id: room_eq_query
  label: Room Equalisation Query
  kind: query
  command: "0x21 {zone} 0x37 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

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
      description: "0x00=Off, 0x01=On"
      values: [0x00, 0x01]

- id: dolby_volume_query
  label: Dolby Volume Query
  kind: query
  command: "0x21 {zone} 0x38 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: dolby_leveller_set
  label: Dolby Leveller
  kind: action
  command: "0x21 {zone} 0x39 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0A = Leveller 0-10. 0xF1 = Increment. 0xF2 = Decrement. 0xFF = Off."

- id: dolby_leveller_query
  label: Dolby Leveller Query
  kind: query
  command: "0x21 {zone} 0x39 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: dolby_volume_cal_offset_set
  label: Dolby Volume Calibration Offset
  kind: action
  command: "0x21 {zone} 0x3A 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x0F = 0 to +15 dB. 0x80-0x8F = -1 to -15 dB. 0xF1 = +1 dB. 0xF2 = -1 dB."

- id: dolby_volume_cal_offset_query
  label: Dolby Volume Calibration Offset Query
  kind: query
  command: "0x21 {zone} 0x3A 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: balance_set
  label: Balance
  kind: action
  command: "0x21 {zone} 0x3B 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x06 = Balance 0 to +6. 0x81-0x86 = Balance -1 to -6. 0xF1 = +1. 0xF2 = -1."

- id: balance_query
  label: Balance Query
  kind: query
  command: "0x21 {zone} 0x3B 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: subwoofer_trim_set
  label: Subwoofer Trim
  kind: action
  command: "0x21 {zone} 0x3F 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x14 = Positive sub trim in 0.5 dB steps (e.g. 0x02 = +1.0 dB). 0x81-0x94 = Negative in 0.5 dB steps (e.g. 0x82 = -1.0 dB). 0xF1 = +0.5 dB. 0xF2 = -0.5 dB."

- id: subwoofer_trim_query
  label: Subwoofer Trim Query
  kind: query
  command: "0x21 {zone} 0x3F 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: lipsync_delay_set
  label: Lipsync Delay
  kind: action
  command: "0x21 {zone} 0x40 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: integer
      description: "0x00-0x32 = Lipsync delay in 5 ms steps (e.g. 0x08 = 40 ms). 0xF1 = +5 ms. 0xF2 = -5 ms."

- id: lipsync_delay_query
  label: Lipsync Delay Query
  kind: query
  command: "0x21 {zone} 0x40 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: compression_set
  label: Dynamic Range Compression
  kind: action
  command: "0x21 {zone} 0x41 0x01 {value} 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)
    - name: value
      type: enum
      description: "0x00=Off, 0x01=Medium, 0x02=High"
      values: [0x00, 0x01, 0x02]

- id: compression_query
  label: Compression Query
  kind: query
  command: "0x21 {zone} 0x41 0x01 0xF0 0x0D"
  params:
    - name: zone
      type: integer
      description: Zone number (0x01 or 0x02)

- id: video_params_query
  label: Incoming Video Parameters Query
  kind: query
  command: "0x21 0x01 0x42 0x01 0xF0 0x0D"
  params: []
  # Response: 7 data bytes: H-res MSB, H-res LSB, V-res MSB, V-res LSB, refresh rate, interlaced flag, aspect ratio.

- id: audio_format_query
  label: Incoming Audio Format Query
  kind: query
  command: "0x21 0x01 0x43 0x01 0xF0 0x0D"
  params: []
  # Response: 2 data bytes: stream format (0x00 PCM ... 0x18 IMAX ENHANCED), channel configuration (0x00 Dual Mono ... 0x18 ...).

- id: audio_sample_rate_query
  label: Incoming Audio Sample Rate Query
  kind: query
  command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
  params: []
  # Response: 1 data byte. 0x00=32 kHz, 0x01=44.1 kHz, 0x02=48 kHz, 0x03=88.2 kHz, 0x04=96 kHz, 0x05=176.4 kHz, 0x06=192 kHz, 0x07=Unknown, 0x08=Undetected.

- id: sub_stereo_trim_set
  label: Sub Stereo Trim
  kind: action
  command: "0x21 0x01 0x45 0x01 {value} 0x0D"
  params:
    - name: value
      type: integer
      description: "0x00 = 0 dB. 0x81-0x94 = -0.5 dB to -10.0 dB in 0.5 dB steps. 0xF1 = +0.5 dB. 0xF2 = -0.5 dB."

- id: sub_stereo_trim_query
  label: Sub Stereo Trim Query
  kind: query
  command: "0x21 0x01 0x45 0x01 0xF0 0x0D"
  params: []

- id: zone1_osd_set
  label: Zone 1 OSD On/Off
  kind: action
  command: "0x21 0x01 0x4E 0x01 {state} 0x0D"
  params:
    - name: state
      type: enum
      description: "0xF1=On, 0xF2=Off"
      values: [0xF1, 0xF2]
      value_labels:
        0xF1: OSD On
        0xF2: OSD Off
  # Note: source has a discrepancy - section heading is "Set/Request Zone 1 OSD on/off (0x4E)" but the example command in the section reads "0x21 0x01 0x4A 0x01 0xF2 0x0D". Per the heading, the opcode is 0x4E.

- id: zone1_osd_query
  label: Zone 1 OSD State Query
  kind: query
  command: "0x21 0x01 0x4E 0x01 0xF0 0x0D"
  params: []

- id: video_output_switching_set
  label: HDMI Video Output Switching
  kind: action
  command: "0x21 0x01 0x4F 0x01 {target} 0x0D"
  params:
    - name: target
      type: enum
      description: "0x02=HDMI Out 1, 0x03=HDMI Out 2, 0x04=HDMI Out 1 & 2"
      values: [0x02, 0x03, 0x04]

- id: video_output_switching_query
  label: HDMI Video Output Switching Query
  kind: query
  command: "0x21 0x01 0x4F 0x01 0xF0 0x0D"
  params: []

- id: amx_duet_discovery
  label: AMX Duet Discovery (ASCII)
  kind: query
  command: "AMX\r"
  params: []
  # Out-of-band ASCII. Send literal "AMX\r" (0x41 0x4D 0x58 0x0D). Device replies with the AMX Duet beacon string.
  # Response example: AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model=MC-8><Device-Revision=x.y.z>\r
  # MC-8B expected to follow the same pattern with model=MC-8B.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  description: Stand-by state of a zone, returned by 0x00 query.
  values: [standby, on]

- id: display_brightness
  type: enum
  description: Front-panel brightness, returned by 0x01 query.
  values: [off, l1, l2]

- id: headphones_connected
  type: enum
  description: Headphone connection state, returned by 0x02 query.
  values: [not_connected, connected]

- id: current_source
  type: enum
  description: Currently selected source, returned by 0x1D query.
  values: [follow_z1, cd, bd, av, sat, pvr, vcr, aux, display, tuner_fm, tuner_dab, net, usb, stb, game]
  notes: Hex codes 0x00-0x11, with 0x07 and 0x0A undefined in the source.

- id: video_input
  type: enum
  description: Current video input, returned by 0x0A query.
  values: [bd, sat, av, pvr, vcr, game, stb]

- id: audio_input_type
  type: enum
  description: Audio input mode in use, returned by 0x0B query.
  values: [analogue, digital, hdmi]

- id: imax_enhanced_state
  type: enum
  description: IMAX Enhanced mode, returned by 0x0C query.
  values: [off, on, auto]

- id: volume_level
  type: integer
  description: Zone volume 0-99 (0x00-0x63), returned by 0x0D query. 0 = loudest, 99 = quietest.

- id: mute_state
  type: enum
  description: Mute state of a zone, returned by 0x0E query.
  values: [muted, not_muted]

- id: direct_mode_state
  type: enum
  description: Direct mode state, returned by 0x0F query.
  values: [off, on]

- id: decode_mode_2ch
  type: enum
  description: 2-channel decode mode, returned by 0x10 query.
  values: [stereo, dolby_surround, neo6_cinema, neo6_music, stereo_5_7ch, dts_neural_x, logic7_immersion, dts_virtual_x]
  notes: Hex codes 0x01, 0x04, 0x07, 0x08, 0x09, 0x0A, 0x0B, 0x0C.

- id: decode_mode_mch
  type: enum
  description: Multi-channel decode mode, returned by 0x11 query.
  values: [stereo_downmix, multichannel, dts_es_neural_x, dolby_surround, logic7_immersion, dts_virtual_x]
  notes: Hex codes 0x01, 0x02, 0x03, 0x06, 0x0B, 0x0C.

- id: video_output_resolution
  type: enum
  description: Current HDMI video output resolution, returned by 0x13 query.
  values: [sd_progressive, 720p, 1080i, 1080p, preferred, bypass, 4k]
  notes: Hex codes 0x02-0x08.

- id: open_menu
  type: enum
  description: Which menu (if any) is currently open, returned by 0x14 query.
  values: [none, setup, trim, bass, treble, sync, sub, tuner, network, usb]
  notes: Hex codes 0x00, 0x02-0x0A.

- id: tuner_preset
  type: integer
  description: Current tuner preset 1-50 (0x01-0x32), or 0xFF if none selected. Returned by 0x15 query.

- id: tuner_frequency
  type: object
  description: "Current FM tuner frequency, returned by 0x16 query. Two bytes: Data1=MHz, Data2=10's of kHz."

- id: dab_station
  type: string
  description: DAB service label, 16 ASCII bytes space-padded. Returned by 0x18 query.

- id: fm_radio_text
  type: string
  description: FM RDS radio text, ASCII. Returned by 0x12 query.

- id: dab_radio_text
  type: string
  description: DAB DLS/PDT text, 128 ASCII bytes space-padded. Returned by 0x1A query.

- id: network_playback
  type: object
  description: "Network playback status, returned by 0x1C query. Data1 state, Data2..n name (folder if navigating, file if playing/paused)."
  properties:
    state:
      type: enum
      values: [navigating, playing, paused, busy]
    name:
      type: string

- id: menu_signal
  type: enum
  description: Audio input type in use (analogue/digital/HDMI), returned by 0x0B query.
  values: [analogue, digital, hdmi]

- id: room_eq_state
  type: enum
  description: Room EQ state, returned by 0x37 query.
  values: [off, on, not_calculated]

- id: dolby_volume_state
  type: enum
  description: Dolby Volume state, returned by 0x38 query.
  values: [off, on]

- id: dolby_leveller_setting
  type: integer
  description: Dolby Leveller setting 0-10 (0x00-0x0A) or 0xFF = off. Returned by 0x39 query.

- id: dolby_volume_cal_offset
  type: integer
  description: Dolby Volume calibration offset in dB. Encoded: 0x00-0x0F = 0 to +15 dB; 0x80-0x8F = -1 to -15 dB. Returned by 0x3A query.

- id: balance
  type: integer
  description: Balance offset. 0x00-0x06 = 0 to +6; 0x81-0x86 = -1 to -6. Returned by 0x3B query.

- id: subwoofer_trim
  type: integer
  description: Subwoofer trim in 0.5 dB steps. 0x00-0x14 = positive; 0x81-0x94 = negative. Returned by 0x3F query.

- id: lipsync_delay_ms
  type: integer
  description: Lipsync delay in 5 ms steps. Multiply returned byte (0x00-0x32) by 5. Returned by 0x40 query.

- id: compression_state
  type: enum
  description: Dynamic range compression setting, returned by 0x41 query.
  values: [off, medium, high]

- id: video_params
  type: object
  description: Incoming video parameters, returned by 0x42 query (7 bytes).
  properties:
    h_res: { type: integer, description: Horizontal resolution in pixels }
    v_res: { type: integer, description: Vertical resolution in pixels }
    refresh_hz: { type: integer, description: Refresh rate (full image update) }
    interlaced: { type: boolean, description: 0x00 = Progressive, 0x01 = Interlaced }
    aspect: { type: enum, values: [undefined, 4_3, 16_9] }

- id: audio_format
  type: object
  description: Incoming audio format, returned by 0x43 query (2 bytes).
  properties:
    stream:
      type: enum
      values: [pcm, analogue_direct, dolby_digital, dolby_digital_ex, dolby_digital_surround, dolby_digital_plus, dolby_truehd, dts, dts_96_24, dts_es_matrix, dts_es_discrete, dts_es_matrix_96_24, dts_es_discrete_96_24, dts_hd_master, dts_hd_high_res, dts_lbr, dts_core, pcm_zero, unsupported, undetected, dolby_atmos, dts_x, imax_enhanced]
    channels:
      type: integer
      description: Channel configuration code (0x00-0x18). See source for full mapping.

- id: audio_sample_rate
  type: enum
  description: Incoming audio sample rate, returned by 0x44 query.
  values: [32k, 44_1k, 48k, 88_2k, 96k, 176_4k, 192k, unknown, undetected]

- id: sub_stereo_trim
  type: integer
  description: Sub Stereo trim. 0x00 = 0 dB; 0x81-0x94 = -0.5 dB to -10 dB. Returned by 0x45 query.

- id: zone1_osd_state
  type: enum
  description: Zone 1 OSD on/off, returned by 0x4E query. NOTE: source has a typo (response data description shows 0x00 = On, 0x01 = Off, opposite of most binary on/off conventions). Use raw response byte.
  values: [on, off]

- id: video_output_switching
  type: enum
  description: Active HDMI output(s), returned by 0x4F query.
  values: [hdmi1, hdmi2, hdmi1_and_2]

- id: software_version
  type: object
  description: Three bytes per 0x04 query: Data1=echo of requested version_id, Data2=Major, Data3=Minor.

- id: input_name
  type: string
  description: Custom input name, up to 10 ASCII characters. Returned by 0x20 query.

- id: heartbeat_ack
  type: integer
  description: Heartbeat acknowledgement byte, always 0x00. Returned by 0x25.
```

## Events
```yaml
- id: unsolicited_status_update
  description: >
    The AV relays state changes caused by front-panel or IR input as unsolicited messages
    using the same response frame format with answer code Ac=0x00. Many commands (especially
    Simulate RC5 0x08 and source-select / EQ / volume changes) will produce an additional
    status message after the immediate command response. Hosts should listen for these on the
    receive channel and reconcile local state.
  frame: "0x21 {zone} {cc} 0x00 {dl} {data...} 0x0D"

- id: amx_duet_beacon
  description: >
    Out-of-band ASCII reply to "AMX\r" query. The unit transmits a single line
    "AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model={model}><Device-Revision={rs232_version}>\r".
    Triggered by the discovery command, not on state changes.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_defaults  # requires 0xAA 0xAA confirmation pattern
  - save_restore_secure_copy  # requires 0x55 0x55 confirmation pattern and 4-digit PIN
  - reboot                   # requires ASCII "REBOOT" confirmation
interlocks: []
# UNRESOLVED: source does not document any interlock procedures or safety warnings.
# UNRESOLVED: source does not document power-on sequencing requirements.
```

## Notes

### Protocol framing summary
- Start byte `0x21` (!), end byte `0x0D` (CR). All multi-byte fields are big-endian.
- `Dl` (data length) counts the data bytes only; it does not include `Et` or itself.
- The AV responds to every command within 3 seconds. The host may pipeline commands before a prior response arrives.
- Commands 0xF0-0xFF are reserved for test functions; the spec table reuses 0xF0-F2 as the standard "request current value" sub-codes, which is distinct from the test-function reservation.

### Zone addressing
- Zone 1 (`0x01`) is the master zone. Most commands accept either `0x01` or `0x02`.
- Several query commands (0x0F direct mode, 0x10 2ch decode, 0x11 MCH decode, 0x13 video resolution, 0x42 video params, 0x43 audio format, 0x44 audio sample rate, 0x4E OSD) are defined for Zone 1 only; the source COMMAND table hard-codes `Zn 0x01`.
- Several commands return `0x85` (command invalid at this time) if a required input is not active on the addressed zone (e.g. tuner commands when no tuner is selected, network query when network source not selected).

### Setup requirement
- Control is disabled by default for minimum standby power. The user must enable it:
  - Front panel: hold DIRECT button 4 s until "RS232 CONTROL ON" appears on the VFD, OR
  - OSD menu: press A then U on the remote, enter General Setup, set Control = On.
- IP control: configure the IP address in the Network Settings menu, then control via TCP port 50000.

### Serial cable
- Null modem: pin 2↔3 (Rx↔Tx), pin 5↔5 (RS232 Ground). Source does not list flow control lines, and explicitly says "no flow control".

### Negative-number encoding convention
For commands taking a signed parameter (treble, bass, balance, subwoofer trim, sub stereo trim, Dolby Volume cal offset), the source uses two byte ranges:
- Positive 0 to +N: `0x00` to `0x0C` (or larger upper bound depending on parameter).
- Negative -1 to -N: `0x81` to `0x8C` (or larger upper bound). The high bit (0x80) is the sign flag; the low nibble is the magnitude.
- `0xF1` / `0xF2` are increment / decrement by one step.

### Source ↔ source-list divergence for 0x1D vs 0x0A
The current-source query (0x1D) and the video-selection command (0x0A) use overlapping but not identical source tables. 0x1D reports 15 sources including CD (0x01) and DISPLAY (0x09) and TUNER (0x0B/0x0C). 0x0A's set-side table lists only 7 sources (BD/SAT/AV/PVR/VCR/Game/STB) and treats 0xF0 as "request current input". Hosts driving 0x0A should set only values that appear in the 0x0A set table.

### Simulate RC5 IR Command (0x08) — RC5 code table
The source lists 50+ user-facing RC5 codes that can be sent through the Simulate RC5 command. Two RC5 system codes are used:
- `0x10` (16) — AV system / Zone 1. Power, volume, source selects, transport, surround modes, EQ, display.
- `0x17` (23) — Zone 2 system. Zone 2 source selects, volume, mute.

A non-exhaustive list of notable codes (system-command in decimal / hex bytes):
- Power: Standby 16-12 / `0x10 0x0C`; Power On 16-123 / `0x10 0x7B`; Power Off 16-124 / `0x10 0x7C`.
- Volume: Up 16-16 / `0x10 0x10`; Down 16-17 / `0x10 0x11`; Mute 16-13 / `0x10 0x0D`; Mute On 16-26 / `0x10 0x1A`; Mute Off 16-120 / `0x10 0x78`.
- Source selects (Z1): CD 16-118, BD 16-98, STB 16-100, VCR 16-119, Display 16-58, Radio 16-91, Aux 16-99, Net 16-92, USB 16-93, AV 16-94, Sat 16-27, PVR 16-96, Game 16-97, FM 16-28, DAB 16-72.
- Transport: Rewind 16-121, Fast Forward 16-52, Skip Back 16-33, Skip Forward 16-11, Stop 16-54, Play 16-53, Pause 16-48, Record 16-90, Random 16-76, Repeat 16-49.
- Surround modes: Stereo 16-107, Multi Channel 16-106, Dolby Surround 16-110, DTS Neo:6 Cinema 16-111, DTS Neo:6 Music 16-112, DTS Neural:X 16-113, Logic7 Immersion 16-114, DTS Virtual:X 16-115, 5/7 Ch Stereo 16-69, Dolby D EX 16-23.
- EQ: Pop Up (Dolby Volume on/off) 16-70, Audio (Room EQ on/off) 16-30, Access Treble 16-14, Treble +1 16-46, Treble -1 16-102, Access Bass 16-39, Bass +1 16-44, Bass -1 16-45, Access Sub Trim 16-51, Sub Trim +0.5 16-105, Sub Trim -0.5 16-108, Access Lipsync 16-50, Lip Sync +5 16-15, Lip Sync -5 16-101, Access Speaker Trim 16-37.
- Display: Cycle VFD info 16-55, DISP brightness 16-59, Display Off 16-31, Display L1 16-34, Display L2 16-35.
- HDMI: Select HDMI Out 1 16-73, Out 2 16-74, Out 1 & 2 16-75, Cycle output resolutions 16-47.
- Direct mode: Activate 16-10, Direct On 16-78, Direct Off 16-79.
- Numeric keys 1-9, 0: 16-1 through 16-9, 16-0.
- Zone 2 (`0x17`): Power On 23-123, Power Off 23-124, Vol+ 23-1, Vol- 23-2, Mute 23-3, Mute On 23-4, Mute Off 23-5, CD 23-6, BD 23-7, STB 23-8, AV 23-9, Game 23-11, Aux 23-13, PVR 23-15, FM 23-14, DAB 23-16, USB 23-18, NET 23-19, SAT 23-20, VCR 23-21.
- Change control to next zone 16-95; Set Zone 2 to Follow Zone 1 16-20.

Hosts should treat `simulate_rc5` as a generic RC5 forwarder and consult this table to expose named functions. There is no native protocol command for many of these (notably power on/off, individual source select keys, transport, EQ/trim deltas) — they are reachable only via 0x08.

### 0x09 Display Information Type — per-source value mapping
The COMMAND data byte for 0x09 is context-dependent on the currently active source:
- All sources: `0x00` Processing mode; `0xE0` cycle through all displayable info; `0xF0` query current.
- FM: `0x01` Radio text, `0x02` Programme type, `0x03` Signal strength.
- DAB (AVR450/750 only per source): `0x01` Radio text, `0x02` Genre, `0x03` Signal quality, `0x04` Bit rate.
- NET / USB: `0x01` Track, `0x02` Artist, `0x03` Album, `0x04` audio type, `0x05` rate.

### 0x06 Save/Restore secure copy
- Data1=0x00 saves a secure backup; Data1=0x01 restores it.
- Data2/Data3 are a fixed `0x55 0x55` confirmation pattern.
- Data4-Data7 are a 4-digit PIN (one decimal digit per byte).
- If no secure copy exists, the restore variant returns `0x85`.
- A second save while one is in progress fails silently.
- If a `0x1E` command is in progress, this command returns `0x85`.

### 0x26 Reboot
- Confirmation bytes are literal ASCII "REBOOT" (`0x52 0x45 0x42 0x4F 0x4F 0x54`).

### AMX Duet discovery
- ASCII, not part of the binary frame: send `AMX\r` (`0x41 0x4D 0x58 0x0D`).
- Response is one line: `AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model=MC-8><Device-Revision=x.y.z>\r`.
- For MC-8B, the `Device-Model` value should be `MC-8B`. Source-document examples show `MC-10`, `RV-9`, `RV-6` only; MC-8/MC-8B are not literally demonstrated in source.

### Source-document limitations
- The source PDF was originally issued for Lexicon MC-10 / RV-9 / RV-6. Several command-response tables annotate "(AVR450/750 only)" for DAB-specific features. DAB coverage for MC-8 / MC-8B is not separately confirmed in source.
- `0xF0`-`0xFF` are reserved for test functions per the protocol note, but `0xF0`/`0xF1`/`0xF2` are also reused as the "request current value", "increment", and "decrement" sub-codes in many command data fields. The reservation applies to the Cc (command code) position, not to data sub-codes.
- Source discrepancy in 0x4E Zone 1 OSD: section heading reads "0x4E" but the example command reads `0x4A`. This spec treats `0x4E` as the correct opcode per the section title.
- Source discrepancy in 0x1A DAB DLS: example command reads `0x21 0x01 0x1A 0xF0 0x0D` (data length 0xF0, which is not a valid length byte). This spec uses `0x21 0x01 0x1A 0x01 0xF0 0x0D` per the COMMAND table layout, which is the consistent shape across all other 0xF0-query commands.
- Source reports response data `0x00` = Zone 1 OSD is On, `0x01` = Off (per the table under 0x4E). This is opposite to the binary on/off convention used in most other commands. Hosts should verify by experiment.

<!-- UNRESOLVED: firmware version compatibility for MC-8 / MC-8B specifically not stated in source. -->
<!-- UNRESOLVED: which commands are accepted in standby state not stated. -->
<!-- UNRESOLVED: maximum IP command rate / pacing not stated; the 3-second response window is the only timing constraint documented. -->
<!-- UNRESOLVED: behaviour when a command is sent to a zone that does not exist (e.g. 0x03) is not separately documented beyond the answer-code table. -->

## Provenance

```yaml
source_domains:
  - lexicon.com
  - manualslib.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
  - https://www.manualslib.com/manual/382538/Lexicon-Mc-8-V1-0-Serial-Communications-Protocol-Definition-Rev-1-4.html
  - https://www.manualslib.com/products/Lexicon-Mc-8-V2-0-Serial-Protocol-Definition-Rev-1-7-2417200.html
retrieved_at: 2026-05-14T17:15:09.378Z
last_checked_at: 2026-06-01T21:44:38.529Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-01T21:44:38.529Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec action units matched to verbatim source command codes; transport parameters fully supported; source's 51 command codes are completely represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document was titled for MC-10 / RV-9 / RV-6. MC-8 / MC-8B share this Lexicon AVR protocol family, but per-model coverage (e.g. DAB tuner) was not separately confirmed in source."
- "front-panel setup is required to enable Control (\"RS232 CONTROL ON\" via DIRECT button, 4s hold) before commands are accepted."
- "source does not document any interlock procedures or safety warnings."
- "source does not document power-on sequencing requirements."
- "firmware version compatibility for MC-8 / MC-8B specifically not stated in source."
- "which commands are accepted in standby state not stated."
- "maximum IP command rate / pacing not stated; the 3-second response window is the only timing constraint documented."
- "behaviour when a command is sent to a zone that does not exist (e.g. 0x03) is not separately documented beyond the answer-code table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
