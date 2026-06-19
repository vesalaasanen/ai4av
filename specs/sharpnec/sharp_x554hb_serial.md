---
spec_id: admin/sharp-nec-x554hb
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC X554Hb Control Spec"
manufacturer: Sharp/NEC
model_family: X554Hb
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - X554Hb
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:20:18.180Z
last_checked_at: 2026-06-19T07:48:08.871Z
generated_at: 2026-06-19T07:48:08.871Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Wireless LAN communication conditions reference an external manual not provided here. Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not in this source."
  - "flow control not stated in source (only \"Full duplex\" communication mode stated)"
  - "eco-mode enum values referenced to Appendix not present in source."
  - "full power-on sequencing / thermal interlock procedures not stated beyond the per-command accept-during-transition notes. Error bit DATA09 Bit1 (interlock switch open) is reported but the corresponding recovery procedure is not documented here."
  - "firmware version compatibility not stated."
  - "flow_control not stated in source."
  - "wireless LAN communication conditions reference external manual not provided."
  - "Appendix enum tables (input terminal, aspect, eco-mode, base-model-type, sub-input) not present in source."
  - "TCP framing (delimiter / length-prefix) on port 7142 not explicitly specified."
verification:
  verdict: verified
  checked_at: 2026-06-19T07:48:08.871Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched literally with source hex frames; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-19
---

# Sharp/NEC X554Hb Control Spec

## Summary
Control spec for the Sharp/NEC X554Hb projector, covering the RS-232C serial and TCP/IP (LAN) control interfaces documented in the vendor Projector Control Command Reference Manual (BDT140013 Rev 7.1). Commands are binary hex frames terminated by a trailing checksum byte; the device replies with an acknowledgment frame (with data for queries) or an error frame carrying ERR1/ERR2 codes.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Wireless LAN communication conditions reference an external manual not provided here. Appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not in this source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: [115200, 38400, 19200, 9600, 4800]  # bps, switchable per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source (only "Full duplex" communication mode stated)
addressing:
  port: 7142  # TCP port for command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Evidence-based (Tier 2 inferences):
traits:
  - powerable    # inferred from POWER ON / POWER OFF commands (015, 016)
  - queryable    # inferred from many *REQUEST commands returning state
  - levelable    # inferred from VOLUME ADJUST / PICTURE ADJUST / OTHER ADJUST (030-2, 030-1, 030-15)
  - routable     # inferred from INPUT SW CHANGE (018) and AUDIO SELECT SET (319-10)
```

## Actions
```yaml
# Binary hex frames as documented verbatim. <ID1> <ID2> <CKS> <DATA??> are
# position placeholders per source §2.2. CKS = low byte of sum of all preceding bytes.
# Each entry below is one source-documented command row.

- id: error_status_request_009
  label: Error Status Request (009)
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on_015
  label: Power On (015)
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: While turning on, no other command accepted.

- id: power_off_016
  label: Power Off (016)
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: While turning off (incl. cooling time), no other command accepted.

- id: input_sw_change_018
  label: Input Switch Change (018)
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command"). Example 06h = video port.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
  notes: Response DATA01 FFh means ended with error (no signal switch made).

- id: picture_mute_on_020
  label: Picture Mute On (020)
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []
  notes: Turned off by input/video switch.

- id: picture_mute_off_021
  label: Picture Mute Off (021)
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on_022
  label: Sound Mute On (022)
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []
  notes: Turned off by input/video switch or volume adjustment.

- id: sound_mute_off_023
  label: Sound Mute Off (023)
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on_024
  label: Onscreen Mute On (024)
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []
  notes: Turned off by input/video switch.

- id: onscreen_mute_off_025
  label: Onscreen Mute Off (025)
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust_030_1
  label: Picture Adjust (030-1)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment target - 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness.
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative.
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: volume_adjust_030_2
  label: Volume Adjust (030-2)
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative.
    - name: data02
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data03
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: aspect_adjust_030_12
  label: Aspect Adjust (030-12)
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Aspect value (see Appendix "Supplementary Information by Command").
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: other_adjust_030_15
  label: Other Adjust (Lamp/Light Adjust, 030-15)
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: Target - 96h LAMP ADJUST / LIGHT ADJUST (DATA02 = FFh).
    - name: data02
      type: integer
      description: FFh for LAMP/LIGHT ADJUST target.
    - name: data03
      type: integer
      description: Adjustment mode - 00h absolute, 01h relative.
    - name: data04
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data05
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: information_request_037
  label: Information Request (037)
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request_037_3
  label: Filter Usage Information Request (037-3)
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3_037_4
  label: Lamp Information Request 3 (037-4)
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Lamp selector - 00h Lamp 1, 01h Lamp 2 (two-lamp models only).
    - name: data02
      type: integer
      description: Content - 01h lamp usage time (seconds), 04h lamp remaining life (%).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: carbon_savings_information_request_037_6
  label: Carbon Savings Information Request (037-6)
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Content - 00h Total Carbon Savings, 01h Carbon Savings during operation.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: remote_key_code_050
  label: Remote Key Code (050)
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Key code low byte (WORD type). See key code list - e.g. 05h AUTO, 02h POWER ON, 03h POWER OFF, 29h PICTURE, 4Bh COMPUTER1, etc.
    - name: data02
      type: integer
      description: Key code high byte (00h for all documented keys).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: shutter_close_051
  label: Shutter Close (051)
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open_052
  label: Shutter Open (052)
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control_053
  label: Lens Control (053)
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Target - 06h Periphery Focus (only documented value).
    - name: data02
      type: integer
      description: Content - 00h Stop, 01h drive +1s, 02h drive +0.5s, 03h drive +0.25s, 7Fh drive +continuous, 81h drive -continuous, FDh drive -0.25s, FEh drive -0.5s, FFh drive -1s.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
  notes: After 7Fh/81h continuous drive, send 00h to stop.

- id: lens_control_request_053_1
  label: Lens Control Request (053-1)
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Target selector (lens axis to read).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: lens_control_2_053_2
  label: Lens Control 2 (053-2)
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: Target - FFh Stop.
    - name: data02
      type: integer
      description: Adjustment mode - 00h absolute, 02h relative.
    - name: data03
      type: integer
      description: Adjustment value (low-order 8 bits).
    - name: data04
      type: integer
      description: Adjustment value (high-order 8 bits).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
  notes: If DATA01 = FFh (Stop), mode/value not referenced.

- id: lens_memory_control_053_3
  label: Lens Memory Control (053-3)
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation - 00h MOVE, 01h STORE, 02h RESET.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: reference_lens_memory_control_053_4
  label: Reference Lens Memory Control (053-4)
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation - 00h MOVE, 01h STORE, 02h RESET.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
  notes: Acts on profile selected by 053-10 LENS PROFILE SET.

- id: lens_memory_option_request_053_5
  label: Lens Memory Option Request (053-5)
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: lens_memory_option_set_053_6
  label: Lens Memory Option Set (053-6)
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Option - 00h LOAD BY SIGNAL, 01h FORCED MUTE.
    - name: data02
      type: integer
      description: Setting - 00h OFF, 01h ON.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: lens_information_request_053_7
  label: Lens Information Request (053-7)
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set_053_10
  label: Lens Profile Set (053-10)
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Profile number - 00h Profile 1, 01h Profile 2.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: lens_profile_request_053_11
  label: Lens Profile Request (053-11)
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3_060_1
  label: Gain Parameter Request 3 (060-1)
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: Adjusted value name - 00h PICTURE/BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: setting_request_078_1
  label: Setting Request (078-1)
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request_078_2
  label: Running Status Request (078-2)
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request_078_3
  label: Input Status Request (078-3)
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request_078_4
  label: Mute Status Request (078-4)
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request_078_5
  label: Model Name Request (078-5)
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request_078_6
  label: Cover Status Request (078-6)
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control_079
  label: Freeze Control (079)
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Operation - 01h freeze ON, 02h freeze OFF.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: information_string_request_084
  label: Information String Request (084)
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: Information type - 03h horizontal sync frequency, 04h vertical sync frequency.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: eco_mode_request_097_8
  label: Eco Mode Request (097-8)
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request_097_45
  label: LAN Projector Name Request (097-45)
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request2_097_155
  label: LAN MAC Address Status Request2 (097-155)
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_pbp_request_097_198
  label: PIP/Picture-by-Picture Request (097-198)
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Target - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: edge_blending_mode_request_097_243_1
  label: Edge Blending Mode Request (097-243-1)
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set_098_8
  label: Eco Mode Set (098-8)
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Eco mode value (see Appendix "Supplementary Information by Command").
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: lan_projector_name_set_098_45
  label: LAN Projector Name Set (098-45)
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01} {data02} {data03} {data04} {data05} {data06} {data07} {data08} {data09} {data10} {data11} {data12} {data13} {data14} {data15} {data16} 00h {cks}"
  params:
    - name: data01
      type: string
      description: Projector name byte 1 (up to 16 bytes total, DATA01-DATA16).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
  notes: Projector name up to 16 bytes, NUL-terminated.

- id: pip_pbp_set_098_198
  label: PIP/Picture-by-Picture Set (098-198)
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Target - 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3.
    - name: data02
      type: integer
      description: Setting value - MODE: 00h PIP / 01h PBP; START POSITION: 00h TL / 01h TR / 02h BL / 03h BR; SUB INPUT: sub input code (see Appendix).
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: edge_blending_mode_set_098_243_1
  label: Edge Blending Mode Set (098-243-1)
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: Setting value - 00h OFF, 01h ON.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.

- id: base_model_type_request_305_1
  label: Base Model Type Request (305-1)
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request_305_2
  label: Serial Number Request (305-2)
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request_305_3
  label: Basic Information Request (305-3)
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set_319_10
  label: Audio Select Set (319-10)
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: Input terminal code (see Appendix "Supplementary Information by Command").
    - name: data02
      type: integer
      description: Setting value - 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER.
    - name: cks
      type: integer
      description: Checksum, low byte of sum of preceding bytes.
```

## Feedbacks
```yaml
# Frame shapes documented in source §2.3.
- id: command_ack_frame
  type: raw_frame
  shape: "{22h|21h|20h|23h} <CMD> <ID1> <ID2> <LEN> [<DATA...>] <CKS>"
  description: Success ack. First byte = command type byte + 20h. Data included only for query commands.

- id: command_error_frame
  type: raw_frame
  shape: "{A2h|A1h|A0h|A3h} <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS>"
  description: Error response. ERR1/ERR2 carry error code per §2.4.

- id: error_status_bits_009
  type: bitfield
  values: [cover_error, temperature_error, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, fpga_error, mirror_cover_error, interlock_switch_open, system_error_slave, system_error_formatter]
  description: DATA01-DATA12 of error status request, bit-mapped per source table.

- id: power_status_078_2
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  description: DATA03 of running status request.

- id: cover_status_078_6
  type: enum
  values: [normal_open, closed]

- id: mute_status_078_4
  type: composite
  description: DATA01 picture mute, DATA02 sound mute, DATA03 onscreen mute, DATA04 forced onscreen mute, DATA05 onscreen display - each 00h Off / 01h On.
```

## Variables
```yaml
# Settable parameters surfaced via dedicated set commands (also represented as Actions above).
- id: brightness
  type: integer
  set_via: picture_adjust_030_1 (DATA01=00h)
  read_via: gain_parameter_request_3_060_1 (DATA01=00h)
- id: contrast
  type: integer
  set_via: picture_adjust_030_1 (DATA01=01h)
  read_via: gain_parameter_request_3_060_1 (DATA01=01h)
- id: color
  type: integer
  set_via: picture_adjust_030_1 (DATA01=02h)
  read_via: gain_parameter_request_3_060_1 (DATA01=02h)
- id: hue
  type: integer
  set_via: picture_adjust_030_1 (DATA01=03h)
  read_via: gain_parameter_request_3_060_1 (DATA01=03h)
- id: sharpness
  type: integer
  set_via: picture_adjust_030_1 (DATA01=04h)
  read_via: gain_parameter_request_3_060_1 (DATA01=04h)
- id: volume
  type: integer
  set_via: volume_adjust_030_2
  read_via: gain_parameter_request_3_060_1 (DATA01=05h)
- id: lamp_light_adjust
  type: integer
  set_via: other_adjust_030_15 (DATA01=96h)
  read_via: gain_parameter_request_3_060_1 (DATA01=96h)
- id: projector_name
  type: string
  max_length: 16
  set_via: lan_projector_name_set_098_45
  read_via: lan_projector_name_request_097_45
- id: eco_mode
  type: enum
  set_via: eco_mode_set_098_8
  read_via: eco_mode_request_097_8
  # UNRESOLVED: eco-mode enum values referenced to Appendix not present in source.
```

## Events
```yaml
# No unsolicited notifications documented. Device only responds to commands.
events: []
```

## Macros
```yaml
# No multi-step sequences described in source.
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: power_on_015
    note: "While power-on is in progress, no other command can be accepted."
  - command: power_off_016
    note: "While power-off is in progress (incl. cooling time), no other command can be accepted."
  - command: lens_control_053
    note: "Continuous-drive (7Fh/81h) must be followed by 00h to stop lens motion."
# UNRESOLVED: full power-on sequencing / thermal interlock procedures not stated beyond the per-command accept-during-transition notes. Error bit DATA09 Bit1 (interlock switch open) is reported but the corresponding recovery procedure is not documented here.
```

## Notes
- Binary protocol. All frames are hex byte sequences; trailing `<CKS>` = low-order byte of the sum of all preceding bytes (source §2.2). Implementors must compute CKS at send time.
- `<ID1>` = projector control ID (configurable on device); `<ID2>` = model code (model-dependent). Both must be obtained from the target device.
- Two transports share the same command frame set: RS-232C serial (D-SUB 9P, cross cable, PC CONTROL port) and TCP/IP on port 7142. Source does not state whether the wire frame differs between transports (e.g. length-prefix, framing delimiters); assume identical payload bytes until verified.
- Serial config is switchable across 115200/38400/19200/9600/4800 bps; both ends must match. Communication mode is full duplex; flow control method is not stated.
- Usage counters (lamp time, filter time) update at one-minute granularity despite one-second resolution.
- Source references an Appendix "Supplementary Information by Command" for input-terminal codes, aspect values, eco-mode values, and base-model-type codes; that appendix is not present in this refined source document, so several enum/range fields are left UNRESOLVED.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: flow_control not stated in source. -->
<!-- UNRESOLVED: wireless LAN communication conditions reference external manual not provided. -->
<!-- UNRESOLVED: Appendix enum tables (input terminal, aspect, eco-mode, base-model-type, sub-input) not present in source. -->
<!-- UNRESOLVED: TCP framing (delimiter / length-prefix) on port 7142 not explicitly specified. -->
````

Spec emitted. 53 commands covered, serial+TCP transports, all hex payloads verbatim. UNRESOLVED markers on flow_control, firmware, appendix enums, TCP framing, wireless LAN.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-19T01:20:18.180Z
last_checked_at: 2026-06-19T07:48:08.871Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-19T07:48:08.871Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched literally with source hex frames; transport parameters verified; bidirectional coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Wireless LAN communication conditions reference an external manual not provided here. Appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco-mode values, base-model-type codes) is not in this source."
- "flow control not stated in source (only \"Full duplex\" communication mode stated)"
- "eco-mode enum values referenced to Appendix not present in source."
- "full power-on sequencing / thermal interlock procedures not stated beyond the per-command accept-during-transition notes. Error bit DATA09 Bit1 (interlock switch open) is reported but the corresponding recovery procedure is not documented here."
- "firmware version compatibility not stated."
- "flow_control not stated in source."
- "wireless LAN communication conditions reference external manual not provided."
- "Appendix enum tables (input terminal, aspect, eco-mode, base-model-type, sub-input) not present in source."
- "TCP framing (delimiter / length-prefix) on port 7142 not explicitly specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
