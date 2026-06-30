---
spec_id: admin/lexicon-inc-rv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lexicon RV Series (RV-6, RV-9, MC-10) Control Spec"
manufacturer: Lexicon
model_family: RV-6
aliases: []
compatible_with:
  manufacturers:
    - Lexicon
    - "Lexicon, Inc."
  models:
    - RV-6
    - RV-9
    - MC-10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-06-25T09:53:04.025Z
last_checked_at: 2026-06-25T10:48:58.534Z
generated_at: 2026-06-25T10:48:58.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "original RV Series doc (RV-5 / RV-8) is referenced but not included; coverage inferred to be RS-232-only (no IP control documented for those models). Firmware version compatibility not stated."
  - "discrete settable parameters are represented as Actions (per-command) rather than as Variables in this protocol; remove section if not applicable."
  - "no multi-step sequences described in source."
  - "no additional safety interlocks documented."
  - "firmware version compatibility not stated; no published protocol revision number cited in source for these models."
verification:
  verdict: verified
  checked_at: 2026-06-25T10:48:58.534Z
  matched_actions: 50
  action_count: 50
  confidence: medium
  summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Lexicon RV Series (RV-6, RV-9, MC-10) Control Spec

## Summary
This spec covers the RS-232 and IP control protocol for Lexicon RV-6, RV-9, and MC-10 AV receivers. Commands and responses use a framed binary protocol (`0x21` start, `0x0D` end, with command code, zone, data length, and answer-code byte) at 38,400 baud over RS-232 null-modem, or over TCP port 50000. The protocol supports power, source selection, volume, decode modes, tuner (FM/DAB), network playback, and audio/video status queries.

<!-- UNRESOLVED: original RV Series doc (RV-5 / RV-8) is referenced but not included; coverage inferred to be RS-232-only (no IP control documented for those models). Firmware version compatibility not stated. -->

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

**Connection notes from source:**
- RS-232 cable wired as null modem: pin 2↔3 (Rx/Tx crossed), pin 5↔5 (ground). No other pins used.
- IP control is via port 50000 on the unit's IP address. RS-232 and IP must be enabled via front panel (hold DIRECT 4s) or OSD setup menu; Control is disabled by default for standby power.

## Traits
```yaml
# - powerable       (power on/off via standby / RC5 16-12; source covers 0x00 power request and RC5 Power On/Off codes)
# - routable        (video input selection 0x0A, source list 0x1D, HDMI output switching 0x4F)
# - queryable       (volume, mute, decode mode, source, brightness, RDS, DAB, network status all queryable)
# - levelable       (volume 0x0D, treble/bass 0x35/0x36, balance 0x3B, subwoofer trim 0x3F/0x45, lipsync 0x40)
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
  command: "0x21 0x01 0x06 0x07 0x01 0x55 0x55 0x01 0x02 0x03 0x040x0D"
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

- id: tune_0x16
  label: "Tune (0x16)"
  kind: action
  command: "0x21 0x01 0x16 0x01 0x01 0x0D"
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

- id: fm_scan_up_down_0x23
  label: "FM Scan up/down (0x23)"
  kind: action
  command: "0x21 0x01 0x23 0x01 0x01 0x0D"
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

- id: set_request_volume_0x0_d
  label: "Set/Request Volume (0x0D)"
  kind: query
  query_command: "0x21 0x01 0x0D 0x01 0x2D 0x0D"

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

- id: request_preset_details_0x1_b
  label: "Request preset details (0x1B)"
  kind: query
  query_command: "0x21 0x01 0x1B 0x01 0x01 0x0D"

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

- id: set_request_sub_stereo_trim_0x45
  label: "Set/Request Sub Stereo Trim (0x45)"
  kind: query
  query_command: "0x21 0x01 0x45 0x01 0x83 0x0D"

- id: set_request_zone_1_osd_on_off_0x4_e
  label: "Set/Request Zone 1 OSD on/off (0x4E)"
  kind: query
  query_command: "0x21 0x01 0x4A 0x01 0xF2 0x0D"

- id: set_request_video_output_switching_0x4_f
  label: "Set/Request Video Output Switching (0x4F)"
  kind: query
  query_command: "0x21 0x01 0x4F 0x01 0x02 0x0D"

- id: set_request_input_name_0x20
  label: "Set/request input name (0x20)"
  kind: query
  query_command: "0x21 0x01 0x20 0x06 0x42 0x44 0x50 0x33 0x30 0x30 0x0D"

- id: dab_scan_0x24
  label: "DAB Scan (0x24)"
  kind: query
  query_command: "0x21 0x01 0x24 0x01 0xF0 0x0D"
```

## Variables
```yaml
# UNRESOLVED: discrete settable parameters are represented as Actions (per-command) rather than as Variables in this protocol; remove section if not applicable.
```

## Events
```yaml
# Source describes unsolicited state-change messages triggered by front-panel / IR input. These use the same framing as responses with Ac=0x00. Specific event types per action: power state, display brightness, decode mode, source, headphone connect. Full event catalogue not separately enumerated.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - restore_factory_default_settings_0x05  # requires 0xAA 0xAA confirmation pattern
  - save_restore_secure_copy_of_settings_0x06  # requires 0x55 0x55 + 4-digit PIN
  - reboot_0x26  # requires "REBOOT" (0x52 0x45 0x42 0x4F 0x4F 0x54) magic string
interlocks: []
# UNRESOLVED: no additional safety interlocks documented.
```

## Notes
**Framing.** Every command and response shares the format `St Zn Cc [Ac] Dl Data… Et`, where `St=0x21`, `Et=0x0D`, `Ac` only appears in responses. Data length byte counts only the data items, excluding ETR. Data payload is limited to 255 bytes per response.

**Answer codes (Ac byte in responses):**
- `0x00` — Status update (success)
- `0x82` — Zone invalid
- `0x83` — Command not recognised
- `0x84` — Parameter not recognised
- `0x85` — Command invalid at this time (e.g. Setup Menu open, wrong input selected)
- `0x86` — Invalid data length

**Zones.** Two zones defined: `0x01` (Zone 1, master) and `0x02` (Zone 2). Zone-less commands refer to Zone 1.

**Reserved codes.** `0xF0`–`0xFF` are reserved for test functions and must not be used.

**Simulate RC5 IR Command (0x08).** Any IR remote function can be triggered over RS-232/IP by sending the two-byte RC5 `(system, command)` pair. The RC5 code tables in §AV RC5 command codes cover both Basic Functions (remote-handled) and Advanced Functions (custom-install only). Zone-2 commands use system code `0x17`; Zone-1 commands use system code `0x10`.

**AMX Duet / DDDP.** Device responds to `AMX\r` with `AMXB<Device-SDKClass=Receiver><Device-Make=Lexicon><Device-Model={RV-6|RV-9|MC-10}><Device-Revision=x.y.z>\r`. Used by AMX NetLinx masters for auto-discovery.

**Response timing.** AV responds within 3 seconds. RC may send further commands before a previous response is received.

**Per-command quirks.**
- `0x05` (factory default restore) and `0x06` (save/restore secure copy) require magic confirmation bytes to prevent accidental trigger. `0x06` also requires a 4-digit PIN (digits 0x01–0x04 of the data block).
- `0x26` (reboot) requires the ASCII string `REBOOT` (`0x52 0x45 0x42 0x4F 0x4F 0x54`) as the data payload.
- `0x25` (heartbeat) also resets the EuP standby timer — must be sent periodically to keep the unit awake over IP.
- Tuner commands (`0x16`, `0x18`, `0x19`, `0x1A`, `0x23`, `0x24`) return `0x85` when the corresponding input (FM/DAB) is not currently selected on the requested zone.
- `0x1F` (headphone override) toggles the speaker mute relays without zeroing the volume.

**Two-channel audio config note.** The source doc references an RC5 mapping for "Cycle between output resolutions" (16-47) but does not list the `0x4D` resolution-cycle command in the binary opcode table — only `0x13` (request) is documented. Some RC5 functions may not have a corresponding direct binary opcode.

**Family coverage caveat.** The RV-5 / RV-8 legacy models were not included in the source document. Earlier product-line serial protocols (Lexicon RV-5 / RV-8 SerialDef rev3) used a different command set; this spec is not valid for those models. RV-6, RV-9, and MC-10 share the protocol described here.
<!-- UNRESOLVED: firmware version compatibility not stated; no published protocol revision number cited in source for these models. -->

## Provenance

```yaml
source_domains:
  - lexicon.com
source_urls:
  - https://www.lexicon.com/on/demandware.static/-/Sites-masterCatalog_Harman/default/dwd2bbdf85/pdfs/RS232_Protocol_Documentation.pdf
retrieved_at: 2026-06-25T09:53:04.025Z
last_checked_at: 2026-06-25T10:48:58.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-25T10:48:58.534Z
matched_actions: 50
action_count: 50
confidence: medium
summary: "deterministic presence proof: 50/50 payloads verbatim in source; stratified Sonnet sample corroborated (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "original RV Series doc (RV-5 / RV-8) is referenced but not included; coverage inferred to be RS-232-only (no IP control documented for those models). Firmware version compatibility not stated."
- "discrete settable parameters are represented as Actions (per-command) rather than as Variables in this protocol; remove section if not applicable."
- "no multi-step sequences described in source."
- "no additional safety interlocks documented."
- "firmware version compatibility not stated; no published protocol revision number cited in source for these models."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
