---
spec_id: admin/arcam-avp700
schema_version: ai4av-public-spec-v1
revision: 1
title: "Arcam AVP700 Control Spec"
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
retrieved_at: 2026-06-25T11:56:54.354Z
last_checked_at: 2026-06-25T12:08:20.163Z
generated_at: 2026-06-25T12:08:20.163Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device asked for is AVP700, but source document explicitly covers AVR390/AVR550/AVR850/AV860/SR250 only. Compatibility with AVP700 unverified."
  - "continuous settable parameters (treble, bass, balance, sub trim, lipsync, Dolby level, EQ, volume) are documented via discrete set/increment/decrement sub-commands rather than as free-form variables. No separate Variables section warranted; per-action representation already covers them."
  - "event ID catalogue not stated; subsumed by request-response message types."
  - "source does not document multi-step sequences; no Macros section."
  - "source explicitly lists models AVR390/AVR550/AVR850/AV860/SR250; AVP700 not mentioned. Treat spec as family-level coverage pending confirmation. Firmware version compatibility unknown. Pin format for 0x06 save/restore (Data4–Data7) defined as 4 ASCII digits but allowed range not stated. Heartbeat interval / EuP timer duration not stated."
verification:
  verdict: verified
  checked_at: 2026-06-25T12:08:20.163Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Arcam AVP700 Control Spec

## Summary
RS232/TCP control protocol for Arcam AVR/AV preamp family. Byte-oriented request/response over serial @ 38400 8N1 or TCP port 50000; each command/response framed by `0x21` STX, zone byte, command code, data length, payload, `0x0D` ETX. Covers power, source, volume, mute, decode mode, audio/video format queries, tuner/DAB/network metadata, room EQ, lipsync, sub trim, balance, HDMI output switching, OSD toggle, input rename, factory restore, heartbeat, reboot.

<!-- UNRESOLVED: device asked for is AVP700, but source document explicitly covers AVR390/AVR550/AVR850/AV860/SR250 only. Compatibility with AVP700 unverified. -->

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
# inferred from power on/off commands, source select, query commands, and audio/video EQ/volume/tone controls present in source
powerable: true
routable: true
queryable: true
levelable: true
```

## Actions
```yaml
- id: restore_factory_default_settings_0x05
  label: "Restore factory default settings (0x05)"
  kind: action
  command: "0x21 0x01 0x05 0x02 0xAA 0xAA 0x0D"
  params: []

- id: save_restore_secure_copy_of_settings_0x06
  label: "Save/Restore secure copy of settings (0x06)"
  kind: action
  command: "0x21 0x01 0x06 0x07 0x01 0x55 0x55 0x01 0x02 0x03 0x04 0x0D"
  params: []

- id: simulate_rc5_ir_command_0x08
  label: "Simulate RC5 IR Command (0x08)"
  kind: action
  command: "0x21 0x01 0x08 0x02 0x10 0x11 0x0D"
  params: []

- id: display_information_type_0x09
  label: "Display Information Type (0x09)"
  kind: action
  command: "0x21 0x02 0x09 0x01 0x01 0x0D"
  params: []

- id: headphone_over_ride_0x1_f
  label: "Headphone Over-ride (0x1F)"
  kind: action
  command: "0x21 0x01 0x1F 0x01 0x01 0x0D"
  params: []

- id: video_selection_0x0_a
  label: "Video selection (0x0A)"
  kind: action
  command: "0x21 0x01 0x0A 0x01 0x03 0x0D"
  params: []

- id: select_analogue_digital_0x0_b
  label: "Select analogue/digital (0x0B)"
  kind: action
  command: "0x21 0x01 0x0B 0x01 0x01 0x0D"
  params: []

- id: set_request_volume_0x0_d
  label: "Set/Request Volume (0x0D)"
  kind: action
  command: "0x21 0x01 0x0D 0x01 0x2D 0x0D"
  params: []

- id: tune_0x16
  label: "Tune (0x16)"
  kind: action
  command: "0x21 0x01 0x16 0x01 0x01 0x0D"
  params: []

- id: request_preset_details_0x1_b
  label: "Request preset details (0x1B)"
  kind: action
  command: "0x21 0x01 0x1B 0x01 0x01 0x0D"
  params: []

- id: imax_enhanced_0x0_c
  label: "IMAX Enhanced (0x0C)"
  kind: action
  command: "0x21 0x01 0x0C 0x01 0xF1 0x0D"
  params: []

- id: treble_equalisation_0x35
  label: "Treble Equalisation (0x35)"
  kind: action
  command: "0x21 0x01 0x35 0x01 0x82 0x0D"
  params: []

- id: bass_equalisation_0x36
  label: "Bass Equalisation (0x36)"
  kind: action
  command: "0x21 0x01 0x36 0x01 0xF1 0x0D"
  params: []

- id: room_equalisation_0x37
  label: "Room Equalisation (0x37)"
  kind: action
  command: "0x21 0x01 0x37 0x01 0xF1 0x0D"
  params: []

- id: dolby_volume_0x38
  label: "Dolby Volume (0x38)"
  kind: action
  command: "0x21 0x01 0x38 0x01 0x01 0x0D"
  params: []

- id: dolby_leveller_0x39
  label: "Dolby Leveller (0x39)"
  kind: action
  command: "0x21 0x01 0x39 0x01 0x05 0x0D"
  params: []

- id: dolby_volume_calibration_offset_0x3_a
  label: "Dolby Volume Calibration Offset (0x3A)"
  kind: action
  command: "0x21 0x01 0x3A 0x01 0x85 0x0D"
  params: []

- id: balance_0x3_b
  label: "Balance (0x3B)"
  kind: action
  command: "0x21 0x01 0x3B 0x01 0x83 0x0D"
  params: []

- id: subwoofer_trim_0x3_f
  label: "Subwoofer Trim (0x3F)"
  kind: action
  command: "0x21 0x01 0x3F 0x01 0x85 0x0D"
  params: []

- id: lipsync_delay_0x40
  label: "Lipsync Delay (0x40)"
  kind: action
  command: "0x21 0x01 0x40 0x01 0x0A 0x0D"
  params: []

- id: compression_0x41
  label: "Compression (0x41)"
  kind: action
  command: "0x21 0x01 0x41 0x01 0x01 0x0D"
  params: []

- id: set_request_sub_stereo_trim_0x45
  label: "Set/Request Sub Stereo Trim (0x45)"
  kind: action
  command: "0x21 0x01 0x45 0x01 0x83 0x0D"
  params: []

- id: set_request_zone_1_osd_on_off_0x4_e
  label: "Set/Request Zone 1 OSD on/off (0x4E)"
  kind: action
  command: "0x21 0x01 0x4A 0x01 0xF2 0x0D"
  params: []

- id: set_request_video_output_switching_0x4_f
  label: "Set/Request Video Output Switching (0x4F)"
  kind: action
  command: "0x21 0x01 0x4F 0x01 0x02 0x0D"
  params: []

- id: set_request_input_name_0x20
  label: "Set/request input name (0x20)"
  kind: action
  command: "0x21 0x01 0x20 0x06 0x42 0x44 0x50 0x33 0x30 0x30 0x0D"
  params: []

- id: fm_scan_up_down_0x23
  label: "FM Scan up/down (0x23)"
  kind: action
  command: "0x21 0x01 0x23 0x01 0x01 0x0D"
  params: []

- id: dab_scan_0x24
  label: "DAB Scan (0x24)"
  kind: action
  command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
  params: []

- id: heartbeat_0x25
  label: "Heartbeat (0x25)"
  kind: action
  command: "0x21 0x01 0x25 0x01 0xF0 0x0D"
  params: []

- id: reboot_0x26
  label: "Reboot (0x26)"
  kind: action
  command: "0x21 0x01 0x26 0x06 0x52 0x45 0x42 0x4F 0x4F 0x54 0x0D"
  params: []
```

## Feedbacks
```yaml
- id: power_0x00
  label: "Power (0x00)"
  kind: query
  query_command: "0x21 0x01 0x00 0x01 0xF0 0x0D"

- id: display_brightness_0x01
  label: "Display Brightness (0x01)"
  kind: query
  query_command: "0x21 0x01 0x01 0x01 0xF0 0x0D"

- id: headphones_0x02
  label: "Headphones (0x02)"
  kind: query
  query_command: "0x21 0x01 0x02 0x01 0xF0 0x0D"

- id: fm_genre_0x03
  label: "FM genre (0x03)"
  kind: query
  query_command: "0x21 0x01 0x03 0x01 0xF0 0x0D"

- id: software_version_0x04
  label: "Software version (0x04)"
  kind: query
  query_command: "0x21 0x01 0x04 0x01 0xF0 0x0D"

- id: request_current_source_0x1_d
  label: "Request current source (0x1D)"
  kind: query
  query_command: "0x21 0x01 0x1D 0x01 0xF0 0x0D"

- id: request_mute_status_0x0_e
  label: "Request Mute status (0x0E)"
  kind: query
  query_command: "0x21 0x01 0x0E 0x01 0xF0 0x0D"

- id: request_direct_mode_status_0x0_f
  label: "Request direct mode status (0x0F)"
  kind: query
  query_command: "0x21 0x01 0x0F 0x01 0xF0 0x0D"

- id: request_decode_mode_status_-_2ch_0x10
  label: "Request decode mode status - 2ch (0x10)"
  kind: query
  query_command: "0x21 0x01 0x10 0x01 0xF0 0x0D"

- id: request_decode_mode_status_-_mch_0x11
  label: "Request Decode mode status - MCH (0x11)"
  kind: query
  query_command: "0x21 0x01 0x11 0x01 0xF0 0x0D"

- id: request_rds_information_0x12
  label: "Request RDS information (0x12)"
  kind: query
  query_command: "0x21 0x01 0x12 0x01 0xF0 0x0D"

- id: request_video_output_resolution_0x13
  label: "Request Video Output Resolution (0x13)"
  kind: query
  query_command: "0x21 0x01 0x13 0x01 0xF0 0x0D"

- id: request_menu_status_0x14
  label: "Request menu status (0x14)"
  kind: query
  query_command: "0x21 0x01 0x14 0x01 0xF0 0x0D"

- id: request_tuner_preset_0x15
  label: "Request tuner preset (0x15)"
  kind: query
  query_command: "0x21 0x01 0x15 0x01 0xF0 0x0D"

- id: request_dab_station_0x18
  label: "Request DAB station (0x18)"
  kind: query
  query_command: "0x21 0x01 0x18 0x01 0xF0 0x0D"

- id: prog_type_category_0x19
  label: "Prog. Type/Category (0x19)"
  kind: query
  query_command: "0x21 0x01 0x19 0x01 0xF0 0x0D"

- id: dls_pdt_info_0x1_a
  label: "DLS/PDT info. (0x1A)"
  kind: query
  query_command: "0x21 0x01 0x1A 0xF0 0x0D"

- id: network_playback_status_0x1_c
  label: "Network playback status (0x1C)"
  kind: query
  query_command: "0x21 0x01 0x1C 0x01 0xF0 0x0D"

- id: request_incoming_video_parameters_0x42
  label: "Request incoming video parameters (0x42)"
  kind: query
  query_command: "0x21 0x01 0x42 0x01 0xF0 0x0D"

- id: request_incoming_audio_format_0x43
  label: "Request incoming audio format (0x43)"
  kind: query
  query_command: "0x21 0x01 0x43 0x01 0xF0 0x0D"

- id: request_incoming_audio_sample_rate_0x44
  label: "Request incoming audio sample rate (0x44)"
  kind: query
  query_command: "0x21 0x01 0x44 0x01 0xF0 0x0D"
```

## Variables
```yaml
# UNRESOLVED: continuous settable parameters (treble, bass, balance, sub trim, lipsync, Dolby level, EQ, volume) are documented via discrete set/increment/decrement sub-commands rather than as free-form variables. No separate Variables section warranted; per-action representation already covers them.
```

## Events
```yaml
# Unsolicited state-change messages referenced in source ("State changes as a result of other inputs" section, lines 86-89). Source confirms the device relays unsolicited updates mirroring the request-response format, but does not enumerate a distinct event ID set.
# UNRESOLVED: event ID catalogue not stated; subsumed by request-response message types.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences; no Macros section.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_default_settings_0x05    # requires 0xAA 0xAA confirmation pattern (source line 297-299)
  - save_restore_secure_copy_of_settings_0x06  # requires 0x55 0x55 + 4-digit PIN (source line 330-336)
  - reboot_0x26  # requires ASCII "REBOOT" payload (source line 1832-1837)
interlocks:
  # Certain commands rejected with answer code 0x85 ("Command invalid at this time") when OSD setup menu is displayed (source line 83-84). Specifically: video_selection (0x0A), select_analogue_digital (0x0B) - and by extension any command that conflicts with the setup-menu state.
  - command_invalid_when_setup_menu_open: 0x85
```

## Notes
Cable is null-modem: pin 2↔3 crossed, pin 5 ground (source line 23-29). Control disabled by default for minimum standby power; enable via front panel DIRECT button 4s hold (displays "RS232 CONTROL ON") or OSD path A→U→General Setup→Control=On (source line 13). IP control on TCP port 50000 against unit IP (source line 13). Every command elicits an answer within 3s; AV may also send unsolicited messages when state changes via front panel / IR (source line 63, 86-89). Reserved command range 0xF0–0xFF must not be used (source line 93). Frame format: STX `0x21` | Zone | CC | DL | Data... | ETX `0x0D`; response inserts Ac (answer code) byte after CC (source line 41-62). Zone 1 = master, zone-less commands target master; zone 2 supported (source line 67-71). AMX Duet discovery on ASCII `"AMX\r"` returning `AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model={model}><Device-Revision=x.y.z>\r` (source line 111-119). RC5 IR codes (system 0x10 / 0x17 for zone 2) replayable via Simulate RC5 IR Command 0x08 (source line 349-378). Volume range 0x00–0x63 (0–99) (source line 598-599).

<!-- UNRESOLVED: source explicitly lists models AVR390/AVR550/AVR850/AV860/SR250; AVP700 not mentioned. Treat spec as family-level coverage pending confirmation. Firmware version compatibility unknown. Pin format for 0x06 save/restore (Data4–Data7) defined as 4 ASCII digits but allowed range not stated. Heartbeat interval / EuP timer duration not stated. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-25T11:56:54.354Z
last_checked_at: 2026-06-25T12:08:20.163Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T12:08:20.163Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device asked for is AVP700, but source document explicitly covers AVR390/AVR550/AVR850/AV860/SR250 only. Compatibility with AVP700 unverified."
- "continuous settable parameters (treble, bass, balance, sub trim, lipsync, Dolby level, EQ, volume) are documented via discrete set/increment/decrement sub-commands rather than as free-form variables. No separate Variables section warranted; per-action representation already covers them."
- "event ID catalogue not stated; subsumed by request-response message types."
- "source does not document multi-step sequences; no Macros section."
- "source explicitly lists models AVR390/AVR550/AVR850/AV860/SR250; AVP700 not mentioned. Treat spec as family-level coverage pending confirmation. Firmware version compatibility unknown. Pin format for 0x06 save/restore (Data4–Data7) defined as 4 ASCII digits but allowed range not stated. Heartbeat interval / EuP timer duration not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
