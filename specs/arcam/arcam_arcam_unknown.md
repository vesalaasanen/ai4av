---
spec_id: admin/arcam-arcam-unknown
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
retrieved_at: 2026-06-25T09:54:09.721Z
last_checked_at: 2026-06-25T11:27:53.091Z
generated_at: 2026-06-25T11:27:53.091Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-model firmware compatibility ranges not stated; RC5 system codes for some non-listed models not in source."
  - "source describes fixed-byte encoded parameters per command rather"
  - "source notes that \"the AV may also send messages at other times\""
  - "source describes no multi-step macro sequences."
  - "exact TCP listen behaviour (accept queue size, keep-alive) not stated. Firmware version compatibility across the five listed models not enumerated."
verification:
  verdict: verified
  checked_at: 2026-06-25T11:27:53.091Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Arcam AVR390/AVR550/AVR850/AV860/SR250 Control Spec

## Summary
RS-232/NET remote control protocol for the Arcam AVR390, AVR550, AVR850, AV860 and SR250 AV receivers and processor. Commands cover system state, input/output routing, volume, tuner (FM/DAB), audio/video decode modes, IMAX Enhanced, EQ and lipsync adjustments. Communication uses 38400 baud 8N1 with a fixed-byte framing envelope (`0x21 ... 0x0D`) over RS-232 (null-modem) or TCP/IP on port 50000. AMX Duet dynamic discovery is supported via the ASCII `AMX\r` query.

<!-- UNRESOLVED: per-model firmware compatibility ranges not stated; RC5 system codes for some non-listed models not in source. -->

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
  cable: null_modem  # Connector 2/3/5 cross-over (Rx/Tx/Ground)
addressing:
  port: 50000
auth:
  type: none  # inferred: no login/password/auth procedure described in source
```

## Traits
```yaml
powerable: true       # inferred from Power (0x00) request + RC5 Power On/Off codes
routable: true        # inferred from Video selection (0x0A), HDMI output switching (0x4F)
queryable: true       # inferred from pervasive 0xF0 request forms
levelable: true       # inferred from Volume (0x0D), Treble/Bass (0x35/0x36), Balance (0x3B), Sub Trim (0x3F/0x45)
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
# UNRESOLVED: source describes fixed-byte encoded parameters per command rather
# than reusable named variables; specific dB / preset / frequency values are
# represented inside their owning action's parameter set. No standalone
# Variables entries are warranted by the source.
```

## Events
```yaml
# UNRESOLVED: source notes that "the AV may also send messages at other times"
# (unsolicited state updates mirroring front-panel/IR activity), but does not
# enumerate a distinct event catalogue separate from the request/response
# commands. Section left empty rather than fabricated.
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_default_settings_0x05        # 0xAA 0xAA confirmation pattern required
  - save_restore_secure_copy_of_settings_0x06    # 0x55 0x55 confirmation pattern + 4-digit PIN required
  - reboot_0x26                                  # literal "REBOOT" ASCII payload required
interlocks:
  - commands_for_tuner_control_return_error_0x85_when_tuner_input_not_selected
  - setup_menu_open_commands_return_error_0x85_when_osd_showing_setup_screen
  - second_secure_save_while_one_in_progress_fails_silently
  - save_restore_returns_error_0x85_if_command_0x1_e_in_progress
```

## Notes
Frame envelope: `<St=0x21> <Zn> <Cc> <Dl> <Data...> <Et=0x0D>`. Responses mirror the envelope with an inserted `<Ac>` answer-code byte. The AV responds within 3 s; the controller may pipeline commands before receiving a reply. Zones are `0x01` (master) and `0x02`. Answer codes: `0x00` status update, `0x82` zone invalid, `0x83` command not recognised, `0x84` parameter not recognised, `0x85` command invalid at this time, `0x86` invalid data length. Commands `0xF0`-`0xFF` are reserved for test and must not be used. Many RC5 IR codes (system `0x10` for Zone 1, `0x17` for Zone 2) are listed in the source and can be replayed over the control link via the `0x08` Simulate RC5 command. AMX Duet discovery reply is the ASCII string `AMXB<Device-SDKClass=Receiver><Device-Make=ARCAM><Device-Model=<model>><Device-Revision=x.y.z>\r` where `x.y.z` is the RS-232 protocol version. TCP control uses port 50000; RS-232 must be explicitly enabled (front-panel DIRECT for 4 s, or `Control=On` in OSD General Setup). Null-modem cable: pin 2 ↔ 3 crossed, pin 5 straight. Heartbeat (`0x25`) also resets the EuP standby timer.

<!-- UNRESOLVED: exact TCP listen behaviour (accept queue size, keep-alive) not stated. Firmware version compatibility across the five listed models not enumerated. -->

## Provenance

```yaml
source_domains:
  - arcam.co.uk
source_urls:
  - https://www.arcam.co.uk/ugc/tor/avr390/RS232/RS232_860_850_550_390_250_SH274E_D_181018.pdf
retrieved_at: 2026-06-25T09:54:09.721Z
last_checked_at: 2026-06-25T11:27:53.091Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T11:27:53.091Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-model firmware compatibility ranges not stated; RC5 system codes for some non-listed models not in source."
- "source describes fixed-byte encoded parameters per command rather"
- "source notes that \"the AV may also send messages at other times\""
- "source describes no multi-step macro sequences."
- "exact TCP listen behaviour (accept queue size, keep-alive) not stated. Firmware version compatibility across the five listed models not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
