---
spec_id: admin/sharp-nec-np-pv800ul-w1-41zl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP-PV800UL-W1-41ZL Control Spec"
manufacturer: Sharp/NEC
model_family: NP-PV800UL-W1-41ZL
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - NP-PV800UL-W1-41ZL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:45:40.805Z
last_checked_at: 2026-06-18T08:51:19.853Z
generated_at: 2026-06-18T08:51:19.853Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Appendix \"Supplementary Information by Command\" (input terminal value map, eco mode value map, aspect value map, base model type map) not included in this source excerpt — many enum value ranges reference it and cannot be fully enumerated here."
  - "firmware version compatibility not stated in source."
  - "response payloads for PIP/PbyP sub-input value decoding and full input-terminal map depend on the Appendix not present in this excerpt."
  - "populate from source if a later revision documents push events."
  - "populate from source if a later revision documents sequences."
  - "no explicit power-on sequencing procedure beyond the lockout notes above."
  - "Appendix \"Supplementary Information by Command\" not included — full value maps for input terminal, aspect, base model type, eco mode, and PIP/PbyP sub-input cannot be enumerated here."
  - "wireless LAN unit compatibility list references the projector operation manual (not in this source)."
  - "DATA05-08 reserved, DATA10-12 reserved fields not specified."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:51:19.853Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC NP-PV800UL-W1-41ZL Control Spec

## Summary
Sharp/NEC NP-PV800UL-W1-41ZL professional LCD projector. This spec covers the binary control protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), carried over both RS-232C serial (PC CONTROL D-SUB 9P) and wired/wireless LAN using TCP port 7142. The protocol is a framed binary format with per-message checksum and control-ID/model-code echo in responses.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" (input terminal value map, eco mode value map, aspect value map, base model type map) not included in this source excerpt — many enum value ranges reference it and cannot be fully enumerated here. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # source lists selectable rates: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: full-duplex communication; explicit RTS/CTS pins present but no hardware flow-control mode stated
addressing:
  port: 7142  # TCP port for LAN command send/receive, stated verbatim in source
auth:
  type: none  # inferred: no auth/login procedure described in source
# Framing: every request is a hex byte sequence <HDR> <CMD> 00h 00h <LEN> <DATA...> <CKS>,
# where <CKS> is the low byte of the sum of all preceding bytes. Responses are
# <HDR_ACK> <CMD> <ID1> <ID2> <LEN> <DATA...> <CKS> on success, or
# <HDR_ERR> <CMD> <ID1> <ID2> 02h <ERR1> <ERR2> <CKS> on failure.
# ID1 = projector control ID; ID2 = model code (echoed by projector).
# HDR per request class: 00h=info-query, 01h=freeze, 02h=command, 03h=adjust/query-3.
# ACK header = HDR + 20h; ERR header = HDR + A0h.
```

## Traits
```yaml
traits:
  - powerable      # inferred: POWER ON (015) / POWER OFF (016) commands present
  - routable       # inferred: INPUT SW CHANGE (018) and audio select / PIP sub-input routing present
  - queryable      # inferred: numerous status/information request commands return state
  - levelable      # inferred: VOLUME ADJUST, PICTURE ADJUST, LAMP/LIGHT ADJUST present
  - mutable        # inferred: PICTURE/SOUND/ONSCREEN MUTE on/off present
```

## Actions
```yaml
# All payloads are verbatim hex byte sequences from the source.
# Fixed commands embed their computed checksum as the trailing byte.
# Parameterized commands show the variable DATA bytes and require a
# recomputed checksum (sum of all preceding bytes, low-order byte).
# See "Transport" framing note for ID1/ID2/CKS rules.

- id: error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal value (e.g. 06h = video port). Full value map is in Appendix 'Supplementary Information by Command'."
  notes: "Source example: 02h 03h 00h 00h 02h 01h 06h 0Eh (switch to video port)."

- id: picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> - <DATA04> <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target"
      values: { "00h": brightness, "01h": contrast, "02h": color, "03h": hue, "04h": sharpness }
    - name: mode
      type: enum
      description: "Adjustment mode (DATA02)"
      values: { "00h": absolute, "01h": relative }
    - name: value
      type: integer
      description: "DATA03 = low 8 bits, DATA04 = high 8 bits"
  notes: "Source examples: brightness=10 -> 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h; brightness=-10 -> 03h 10h 00h 00h 05h 00h FFh 00h F6h FFh 0Ch."

- id: volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> - <DATA03> <CKS>"
  params:
    - name: mode
      type: enum
      description: "Adjustment mode (DATA01)"
      values: { "00h": absolute, "01h": relative }
    - name: value
      type: integer
      description: "DATA02 = low 8 bits, DATA03 = high 8 bits"
  notes: "Source example: volume=10 -> 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h."

- id: aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: aspect
      type: integer
      description: "Aspect value (DATA01). Value map in Appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: "030-15. OTHER ADJUST (LAMP/LIGHT ADJUST)"
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> - <DATA05> <CKS>"
  params:
    - name: target
      type: enum
      description: "Adjustment target (DATA01=96h, DATA02=FFh)"
      values: { "96h/FFh": lamp_adjust_or_light_adjust }
    - name: mode
      type: enum
      description: "Adjustment mode (DATA03)"
      values: { "00h": absolute, "01h": relative }
    - name: value
      type: integer
      description: "DATA04 = low 8 bits, DATA05 = high 8 bits"

- id: information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: lamp
      type: enum
      description: "Lamp selector (DATA01)"
      values: { "00h": lamp_1, "01h": lamp_2 }
    - name: content
      type: enum
      description: "Requested content (DATA02)"
      values: { "01h": lamp_usage_time_seconds, "04h": lamp_remaining_life_percent }

- id: carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: type
      type: enum
      description: "Carbon savings scope (DATA01)"
      values: { "00h": total_carbon_savings, "01h": carbon_savings_during_operation }

- id: remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: key_code
      type: integer
      description: "Key code WORD: DATA01=low byte, DATA02=high byte. Sample codes: 02h/00h POWER ON, 03h/00h POWER OFF, 05h/00h AUTO, 06h/00h MENU, 07h/00h UP, 08h/00h DOWN, 09h/00h RIGHT, 0Ah/00h LEFT, 0Bh/00h ENTER, 0Ch/00h EXIT, 0Dh/00h HELP, 0Fh/00h MAGNIFY UP, 10h/00h MAGNIFY DOWN, 13h/00h MUTE, 29h/00h PICTURE, 4Bh/00h COMPUTER1, 4Ch/00h COMPUTER2, 4Fh/00h VIDEO1, 51h/00h S-VIDEO1, 84h/00h VOLUME UP, 85h/00h VOLUME DOWN, 8Ah/00h FREEZE, A3h/00h ASPECT, D7h/00h SOURCE, EEh/00h LAMP_MODE/ECO."
  notes: "Source example: AUTO -> 02h 0Fh 00h 00h 02h 05h 00h 18h."

- id: shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01). Source documents 06h = Periphery Focus; full target map not shown in excerpt."
    - name: content
      type: enum
      description: "Drive action (DATA02)"
      values: { "00h": stop, "01h": drive_plus_1s, "02h": drive_plus_0.5s, "03h": drive_plus_0.25s, "7Fh": drive_plus_continuous, "81h": drive_minus_continuous, "FDh": drive_minus_0.25s, "FEh": drive_minus_0.5s, "FFh": drive_minus_1s }
  notes: "After 7Fh/81h continuous drive, stop with DATA02=00h."

- id: lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01)."

- id: lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> - <DATA04> <CKS>"
  params:
    - name: target
      type: integer
      description: "Lens target (DATA01); FFh = Stop (mode/value ignored)."
    - name: mode
      type: enum
      description: "Adjustment mode (DATA02)"
      values: { "00h": absolute, "02h": relative }
    - name: value
      type: integer
      description: "DATA03 = low 8 bits, DATA04 = high 8 bits"

- id: lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "Lens memory operation (DATA01)"
      values: { "00h": move, "01h": store, "02h": reset }

- id: reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: operation
      type: enum
      description: "Reference lens memory operation (DATA01)"
      values: { "00h": move, "01h": store, "02h": reset }
  notes: "Operates on profile selected by 053-10 LENS PROFILE SET."

- id: lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: option
      type: enum
      description: "Lens memory option (DATA01)"
      values: { "00h": load_by_signal, "01h": forced_mute }

- id: lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: option
      type: enum
      description: "Lens memory option (DATA01)"
      values: { "00h": load_by_signal, "01h": forced_mute }
    - name: setting
      type: enum
      description: "Setting value (DATA02)"
      values: { "00h": off, "01h": on }

- id: lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: profile
      type: enum
      description: "Reference lens memory profile (DATA01)"
      values: { "00h": profile_1, "01h": profile_2 }

- id: lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: name
      type: enum
      description: "Adjusted value name (DATA01)"
      values: { "00h": picture_brightness, "01h": picture_contrast, "02h": picture_color, "03h": picture_hue, "04h": picture_sharpness, "05h": volume, "96h": lamp_adjust_light_adjust }
  notes: "Source example (brightness) -> 03h 05h 00h 00h 03h 00h 00h 00h 0Bh."

- id: setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: state
      type: enum
      description: "Freeze state (DATA01)"
      values: { "01h": on, "02h": off }

- id: information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: info_type
      type: enum
      description: "Information type (DATA01)"
      values: { "03h": horizontal_sync_frequency, "04h": vertical_sync_frequency }

- id: eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST 2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: item
      type: enum
      description: "PIP/PbyP item (DATA01)"
      values: { "00h": mode, "01h": start_position, "02h": sub_input_or_sub_input_1, "09h": sub_input_2, "0Ah": sub_input_3 }

- id: edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: eco_mode
      type: integer
      description: "Eco/light/lamp mode value (DATA01). Value map in Appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> - <DATA16> 00h <CKS>"
  params:
    - name: name
      type: string
      description: "Projector name (DATA01-DATA16, up to 16 bytes, NUL-terminated)."

- id: pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: item
      type: enum
      description: "PIP/PbyP item (DATA01)"
      values: { "00h": mode, "01h": start_position, "02h": sub_input_or_sub_input_1, "09h": sub_input_2, "0Ah": sub_input_3 }
    - name: value
      type: integer
      description: "Setting value (DATA02). Mode: 00h PIP, 01h PbyP. Start position: 00h top-left, 01h top-right, 02h bottom-left, 03h bottom-right. Sub-input value map in Appendix."

- id: edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: setting
      type: enum
      description: "Edge blending setting (DATA01)"
      values: { "00h": off, "01h": on }

- id: base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: input_terminal
      type: integer
      description: "Input terminal (DATA01). Value map in Appendix 'Supplementary Information by Command'."
    - name: setting
      type: enum
      description: "Audio select (DATA02)"
      values: { "00h": terminal_specified_in_data01, "01h": bnc, "02h": computer }
```

## Feedbacks
```yaml
# Observable state returned by query responses (per documented DATA layouts).
- id: error_status
  command_ref: error_status_request
  type: bitmap
  fields:
    DATA01: { bit0: cover_error, bit1: temperature_error_bimetallic, bit3: fan_error, bit4: fan_error, bit5: power_error, bit6: lamp1_off_or_backlight_off, bit7: lamp1_replacement_moratorium }
    DATA02: { bit0: lamp1_usage_time_exceeded, bit1: formatter_error, bit2: lamp2_off, bit7: refer_to_extend_status }
    DATA03: { bit1: fpga_error, bit2: temperature_error_sensor, bit3: lamp1_not_present, bit4: lamp1_data_error, bit5: mirror_cover_error, bit6: lamp2_replacement_moratorium, bit7: lamp2_usage_time_exceeded }
    DATA04: { bit0: lamp2_not_present, bit1: lamp2_data_error, bit2: temperature_error_dust, bit3: foreign_matter_sensor_error, bit5: ballast_communication_error, bit6: iris_calibration_error, bit7: lens_not_installed }
    DATA09: { bit0: portrait_cover_side_up, bit1: interlock_switch_open, bit2: system_error_slave_cpu, bit3: system_error_formatter }

- id: power_status
  command_ref: running_status_request
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]

- id: operation_status
  command_ref: basic_information_request
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]

- id: content_displayed
  command_ref: basic_information_request
  type: enum
  values: [video_signal_displayed, no_signal, viewer_displayed, test_pattern_displayed, lan_displayed, test_pattern_user_displayed, signal_being_switched]

- id: mute_status
  command_ref: mute_status_request
  type: bitmap
  fields: { picture_mute: [off, on], sound_mute: [off, on], onscreen_mute: [off, on], forced_onscreen_mute: [off, on], onscreen_display: [not_displayed, displayed] }

- id: cover_status
  command_ref: cover_status_request
  type: enum
  values: [normal_cover_open, cover_closed]

- id: freeze_status
  command_ref: basic_information_request
  type: enum
  values: [off, on]

- id: lamp_usage_time
  command_ref: lamp_information_request_3
  type: integer
  unit: seconds  # updated at one-minute intervals

- id: lamp_remaining_life
  command_ref: lamp_information_request_3
  type: integer
  unit: percent  # negative if lamp replacement deadline exceeded

- id: filter_usage_time
  command_ref: filter_usage_information_request
  type: integer
  unit: seconds

- id: filter_alarm_start_time
  command_ref: filter_usage_information_request
  type: integer
  unit: seconds  # -1 if undefined

- id: carbon_savings
  command_ref: carbon_savings_information_request
  type: decimal
  unit: kilogram  # DATA02-05 kg (max 99999), DATA06-09 mg (max 999999)

- id: projector_name
  command_ref: lan_projector_name_request
  type: string

- id: mac_address
  command_ref: lan_mac_address_status_request_2
  type: string

- id: model_name
  command_ref: model_name_request
  type: string

- id: serial_number
  command_ref: serial_number_request
  type: string

- id: base_model_type
  command_ref: base_model_type_request
  type: string  # value map in Appendix 'Supplementary Information by Command'

- id: eco_mode
  command_ref: eco_mode_request
  type: integer  # value map in Appendix 'Supplementary Information by Command'

- id: edge_blending_mode
  command_ref: edge_blending_mode_request
  type: enum
  values: [off, on]

- id: lens_information
  command_ref: lens_information_request
  type: bitmap
  fields: { bit0_lens_memory: [stop, operating], bit1_zoom: [stop, operating], bit2_focus: [stop, operating], bit3_lens_shift_h: [stop, operating], bit4_lens_shift_v: [stop, operating] }

- id: lens_profile
  command_ref: lens_profile_request
  type: enum
  values: [profile_1, profile_2]

- id: gain_parameter
  command_ref: gain_parameter_request_3
  type: composite
  fields: { status: [display_not_possible, adjustment_not_possible, adjustment_possible, specified_gain_not_exist], upper_limit: integer, lower_limit: integer, default_value: integer, current_value: integer, wide_adjustment_width: integer, narrow_adjustment_width: integer, default_valid: [invalid, valid] }

- id: sync_frequency
  command_ref: information_string_request
  type: string  # horizontal/vertical sync frequency label string

# UNRESOLVED: response payloads for PIP/PbyP sub-input value decoding and full input-terminal map depend on the Appendix not present in this excerpt.
```

## Variables
```yaml
# Settable parameters that are not discrete one-shot actions.
- id: picture_brightness
  action_ref: picture_adjust
  param: target=00h
  type: integer

- id: picture_contrast
  action_ref: picture_adjust
  param: target=01h
  type: integer

- id: picture_color
  action_ref: picture_adjust
  param: target=02h
  type: integer

- id: picture_hue
  action_ref: picture_adjust
  param: target=03h
  type: integer

- id: picture_sharpness
  action_ref: picture_adjust
  param: target=04h
  type: integer

- id: volume
  action_ref: volume_adjust
  type: integer

- id: lamp_light_adjust
  action_ref: other_adjust
  param: target=96h/FFh
  type: integer

- id: aspect
  action_ref: aspect_adjust
  type: integer  # value map in Appendix

- id: eco_mode_value
  action_ref: eco_mode_set
  type: integer  # value map in Appendix

- id: projector_name
  action_ref: lan_projector_name_set
  type: string
  max_length: 16
```

## Events
```yaml
# No unsolicited notifications documented in source.
# UNRESOLVED: populate from source if a later revision documents push events.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate from source if a later revision documents sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: power_on_lockout
    description: "While POWER ON (015) is executing, no other command can be accepted. Stated verbatim in source."
    source: "015. POWER ON"
  - id: power_off_cooling_lockout
    description: "While POWER OFF (016) is executing (including cooling time), no other command can be accepted. Stated verbatim in source."
    source: "016. POWER OFF"
  - id: interlock_switch
    description: "Interlock switch open state is reported in ERROR STATUS REQUEST DATA09 bit1. Projector reports it as an error condition."
    source: "009. ERROR STATUS REQUEST"
  - id: cover_error
    description: "Mirror/lens cover error and cover-closed status are reported (ERROR STATUS DATA03 bit5 / 078-6 COVER STATUS REQUEST)."
    source: "009 / 078-6"
# UNRESOLVED: no explicit power-on sequencing procedure beyond the lockout notes above.
```

## Notes
- Protocol is binary, frame-based, big-endian hex bytes. All command bytes are documented in hexadecimal (e.g. `02h`).
- Request frames do NOT carry ID1/ID2; they carry a trailing checksum (low byte of sum of all preceding bytes). Responses echo ID1 (control ID) and ID2 (model code).
- ACK header = request-header + `20h` (e.g. `02h`→`22h`, `03h`→`23h`, `00h`→`20h`, `01h`→`21h`). Error header = request-header + `A0h` (e.g. `02h`→`A2h`).
- Error responses carry ERR1/ERR2 per the source error-code table (00h/00h unrecognized command, 02h/0Dh command rejected because power off, 02h/0Fh no authority, 03h/02h adjustment failed, etc.).
- Serial cable must be a cross cable wired to the PC CONTROL D-SUB 9P (RxD/TxD crossed, RTS/CTS crossed, GND common).
- LAN: wired RJ-45 (10/100BASE-TX auto-negotiation) and optional wireless LAN unit; both use TCP port 7142.
- Lamp/filter usage times are reported in one-second units but are updated only at one-minute intervals.
- Lamp remaining life (%) returns a negative value once the replacement deadline is exceeded.

<!-- UNRESOLVED: Appendix "Supplementary Information by Command" not included — full value maps for input terminal, aspect, base model type, eco mode, and PIP/PbyP sub-input cannot be enumerated here. -->
<!-- UNRESOLVED: wireless LAN unit compatibility list references the projector operation manual (not in this source). -->
<!-- UNRESOLVED: DATA05-08 reserved, DATA10-12 reserved fields not specified. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T09:45:40.805Z
last_checked_at: 2026-06-18T08:51:19.853Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:51:19.853Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Appendix \"Supplementary Information by Command\" (input terminal value map, eco mode value map, aspect value map, base model type map) not included in this source excerpt — many enum value ranges reference it and cannot be fully enumerated here."
- "firmware version compatibility not stated in source."
- "response payloads for PIP/PbyP sub-input value decoding and full input-terminal map depend on the Appendix not present in this excerpt."
- "populate from source if a later revision documents push events."
- "populate from source if a later revision documents sequences."
- "no explicit power-on sequencing procedure beyond the lockout notes above."
- "Appendix \"Supplementary Information by Command\" not included — full value maps for input terminal, aspect, base model type, eco mode, and PIP/PbyP sub-input cannot be enumerated here."
- "wireless LAN unit compatibility list references the projector operation manual (not in this source)."
- "DATA05-08 reserved, DATA10-12 reserved fields not specified."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
