---
spec_id: admin/sharp-nec-ea231wu-bk
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ea231Wu Bk Control Spec"
manufacturer: Sharp/NEC
model_family: "Ea231Wu Bk"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "Ea231Wu Bk"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:21:00.041Z
last_checked_at: 2026-06-17T19:46:41.534Z
generated_at: 2026-06-17T19:46:41.534Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "The supplied device name \"Ea231Wu Bk\" is a Sharp/NEC monitor model, but the source document is a generic *projector* control command reference (references lamp, lens, shutter, lamp memory). The source does not state a specific model name. Model-to-source compatibility is unconfirmed."
  - "Default baud rate not stated (source lists 5 options); model code (ID2) value not stated; input terminal value table lives in an appendix not included in the source text."
  - "source lists 115200/38400/19200/9600/4800 bps; default not stated"
  - "source states \"Full duplex\" communication mode and wires RTS/CTS pins, but does not name a flow-control setting"
  - "appendix not in source text.\""
  - "value table in source appendix not included in source text\""
  - "not in source text\""
  - "source describes only command/response model; no unsolicited"
  - "source documents no explicit multi-step sequences."
  - "no voltage/current/power specs, no power-on sequencing procedure"
  - "appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, base model type values, sub-input values) is referenced but not present in the provided source text."
  - "device-name vs source mismatch (monitor name supplied, projector manual provided) — verify correct source artifact before publishing."
verification:
  verdict: verified
  checked_at: 2026-06-17T19:46:41.534Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec commands matched verbatim hex sequences in source. Transport parameters verified. One-to-one coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ea231Wu Bk Control Spec

## Summary
Control spec derived from the Sharp/NEC "Projector Control Command Reference Manual" (BDT140013 Revision 7.1). The device exposes a binary, hex-framed control protocol over both RS-232C serial and TCP/IP (LAN). Commands cover power, input switching, mute (picture/sound/onscreen), picture/volume/aspect/lamp adjustment, lens control and memory, status queries, eco mode, PIP/PbP, edge blending, and audio select.

<!-- UNRESOLVED: The supplied device name "Ea231Wu Bk" is a Sharp/NEC monitor model, but the source document is a generic *projector* control command reference (references lamp, lens, shutter, lamp memory). The source does not state a specific model name. Model-to-source compatibility is unconfirmed. -->
<!-- UNRESOLVED: Default baud rate not stated (source lists 5 options); model code (ID2) value not stated; input terminal value table lives in an appendix not included in the source text. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600  # UNRESOLVED: source lists 115200/38400/19200/9600/4800 bps; default not stated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: source states "Full duplex" communication mode and wires RTS/CTS pins, but does not name a flow-control setting
addressing:
  port: 7142
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: 015 POWER ON / 016 POWER OFF commands present
  - routable     # inferred: 018 INPUT SW CHANGE command present
  - queryable    # inferred: many status request commands present (037/053-1/060-1/078-*/084/097-*/305-*)
  - levelable    # inferred: 030-1 PICTURE / 030-2 VOLUME / 030-15 LAMP adjust commands present
```

## Actions
```yaml
# All 53 command rows from source §2 enumerated. Hex payloads verbatim.
# ID1 = control ID, ID2 = model code, CKS = checksum (low byte of sum of preceding bytes).
# ID1/ID2 values not stated in source → UNRESOLVED; CKS is computed per-source rule.

- id: cmd_009_error_status_request
  label: "009. ERROR STATUS REQUEST"
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: cmd_015_power_on
  label: "015. POWER ON"
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []
  notes: "No other command accepted while power-on in progress."

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: "No other command accepted during power-off (incl. cooling time)."

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). Full value table in source appendix - UNRESOLVED: appendix not in source text."

- id: cmd_020_picture_mute_on
  label: "020. PICTURE MUTE ON"
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: cmd_021_picture_mute_off
  label: "021. PICTURE MUTE OFF"
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: cmd_022_sound_mute_on
  label: "022. SOUND MUTE ON"
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: cmd_023_sound_mute_off
  label: "023. SOUND MUTE OFF"
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: cmd_024_onscreen_mute_on
  label: "024. ONSCREEN MUTE ON"
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: cmd_025_onscreen_mute_off
  label: "025. ONSCREEN MUTE OFF"
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: cmd_030_1_picture_adjust
  label: "030-1. PICTURE ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} FFh {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {data01} {data02} {data03} {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data02
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data03
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Aspect value - UNRESOLVED: value table in source appendix not included in source text"

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {data01} {data02} {data03} {data04} {data05} {cks}"
  params:
    - name: data01
      type: integer
      description: "Target high byte (96h for LAMP/LIGHT ADJUST)"
    - name: data02
      type: integer
      description: "Target low byte (FFh for LAMP/LIGHT ADJUST)"
    - name: data03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: data04
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data05
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: data02
      type: integer
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Key code low byte (WORD type). Examples: 02h POWER ON, 03h POWER OFF, 05h AUTO, 06h MENU, 07h UP, 08h DOWN, 09h RIGHT, 0Ah LEFT, 0Bh ENTER, 0Ch EXIT, 0Dh HELP, 0Fh MAGNIFY UP, 10h MAGNIFY DOWN, 13h MUTE, 29h PICTURE, 4Bh COMPUTER1, 4Ch COMPUTER2, 4Fh VIDEO1, 51h S-VIDEO1, 84h VOLUME UP, 85h VOLUME DOWN, 8Ah FREEZE, A3h ASPECT, D7h SOURCE, EEh LAMP MODE/ECO"
    - name: data02
      type: integer
      description: "Key code high byte (00h for all listed keys)"

- id: cmd_051_shutter_close
  label: "051. SHUTTER CLOSE"
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: cmd_052_shutter_open
  label: "052. SHUTTER OPEN"
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: cmd_053_lens_control
  label: "053. LENS CONTROL"
  kind: action
  command: "02h 18h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis (source documents 06h = Periphery Focus; other axis codes not enumerated in body)"
    - name: data02
      type: integer
      description: "Motion: 00h Stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh +continuous, 81h -continuous, FDh -0.25s, FEh -0.5s, FFh -1s"

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {data01} 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis"

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {data01} {data02} {data03} {data04} {cks}"
  params:
    - name: data01
      type: integer
      description: "Lens axis (FFh = Stop, ignores mode/value)"
    - name: data02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: data03
      type: integer
      description: "Adjustment value (low-order 8 bits)"
    - name: data04
      type: integer
      description: "Adjustment value (high-order 8 bits)"

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET (acts on profile set via 053-10)"

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: data02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: cmd_053_11_lens_profile_request
  label: "053-11. LENS PROFILE REQUEST"
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: cmd_060_1_gain_parameter_request_3
  label: "060-1. GAIN PARAMETER REQUEST 3"
  kind: query
  command: "03h 05h 00h 00h 03h {data01} 00h 00h {cks}"
  params:
    - name: data01
      type: integer
      description: "Adjusted value name: 00h BRIGHTNESS, 01h CONTRAST, 02h COLOR, 03h HUE, 04h SHARPNESS, 05h VOLUME, 96h LAMP/LIGHT ADJUST"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: cmd_078_5_model_name_request
  label: "078-5. MODEL NAME REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cmd_078_6_cover_status_request
  label: "078-6. COVER STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {data01} 01h {cks}"
  params:
    - name: data01
      type: integer
      description: "Information type: 03h horizontal sync frequency, 04h vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Parameter: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "Eco mode value - UNRESOLVED: value table in source appendix not included in source text"

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {data01..data16} 00h {cks}"
  params:
    - name: data01_16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Parameter: 00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: data02
      type: integer
      description: "Setting value (depends on data01); sub-input values in source appendix - UNRESOLVED"

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {data01} {cks}"
  params:
    - name: data01
      type: integer
      description: "00h OFF, 01h ON"

- id: cmd_305_1_base_model_type_request
  label: "305-1. BASE MODEL TYPE REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: cmd_305_2_serial_number_request
  label: "305-2. SERIAL NUMBER REQUEST"
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: cmd_305_3_basic_information_request
  label: "305-3. BASIC INFORMATION REQUEST"
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {data01} {data02} {cks}"
  params:
    - name: data01
      type: integer
      description: "Input terminal - UNRESOLVED: value table in source appendix not included in source text"
    - name: data02
      type: integer
      description: "Setting value: 00h terminal specified in data01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: error_status
  type: bitmask
  source_query: cmd_009_error_status_request
  description: "12-byte error information (DATA01-12). Bit=1 indicates error."

- id: power_state
  type: enum
  values: [standby, power_on]
  source_query: cmd_078_2_running_status_request

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  source_query: cmd_078_2_running_status_request

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source_query: cmd_078_2_running_status_request

- id: picture_mute_state
  type: enum
  values: [off, on]
  source_query: cmd_078_4_mute_status_request

- id: sound_mute_state
  type: enum
  values: [off, on]
  source_query: cmd_078_4_mute_status_request

- id: onscreen_mute_state
  type: enum
  values: [off, on]
  source_query: cmd_078_4_mute_status_request

- id: input_signal_type
  type: enum
  values: [computer, video, s_video, component, dvi_d, hdmi, displayport, viewer]
  source_query: cmd_078_3_input_status_request

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  source_query: cmd_078_6_cover_status_request

- id: lamp_usage_time
  type: integer
  unit: seconds
  source_query: cmd_037_4_lamp_information_request_3

- id: lamp_remaining_life
  type: integer
  unit: percent
  source_query: cmd_037_4_lamp_information_request_3

- id: filter_usage_time
  type: integer
  unit: seconds
  source_query: cmd_037_3_filter_usage_information_request

- id: model_name
  type: string
  source_query: cmd_078_5_model_name_request

- id: serial_number
  type: string
  source_query: cmd_305_2_serial_number_request

- id: mac_address
  type: string
  source_query: cmd_097_155_lan_mac_address_status_request2

- id: eco_mode
  type: enum
  source_query: cmd_097_8_eco_mode_request
  notes: "Value table in source appendix - UNRESOLVED: not in source text"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source_query: cmd_097_243_1_edge_blending_mode_request
```

## Variables
```yaml
- id: volume
  type: integer
  set_action: cmd_030_2_volume_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: brightness
  type: integer
  set_action: cmd_030_1_picture_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: contrast
  type: integer
  set_action: cmd_030_1_picture_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: color
  type: integer
  set_action: cmd_030_1_picture_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: hue
  type: integer
  set_action: cmd_030_1_picture_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: sharpness
  type: integer
  set_action: cmd_030_1_picture_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: lamp_light_adjust
  type: integer
  set_action: cmd_030_15_other_adjust
  query_action: cmd_060_1_gain_parameter_request_3

- id: projector_name
  type: string
  max_length: 16
  set_action: cmd_098_45_lan_projector_name_set
  query_action: cmd_097_45_lan_projector_name_request
```

## Events
```yaml
# UNRESOLVED: source describes only command/response model; no unsolicited
# notification events documented.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - command: cmd_015_power_on
    rule: "No other command accepted while power-on in progress."
  - command: cmd_016_power_off
    rule: "No other command accepted during power-off including cooling time."
  - command: cmd_053_lens_control
    rule: "After continuous-drive (7Fh/81h), must send 00h to stop."
# UNRESOLVED: no voltage/current/power specs, no power-on sequencing procedure
# beyond the per-command interlock notes above.
```

## Notes
- Checksum (CKS): low-order byte of the sum of all preceding bytes. Worked example from source: `20h+81h+01h+60h+01h+00h = 103h` → CKS = `03h`.
- Command frames begin with a 2-byte header where byte0 indicates command class (`00h`/`01h`/`02h`/`03h`) and byte1 is the opcode; responses prefix byte0 with `A` (e.g. `02h`→`A2h`, `03h`→`A3h`) on error, or `2x` on success.
- Error responses carry ERR1/ERR2 code pairs (see source §2.4, 20+ combinations); examples: `02h 0Dh` = "command cannot be accepted because the power is off", `00h 01h` = "command not supported by model".
- Lamp/filter usage time returned in seconds, updated at 1-minute intervals.
- ID1 (control ID) and ID2 (model code) values are device-specific and not stated in this source text.
<!-- UNRESOLVED: appendix "Supplementary Information by Command" (input terminal codes, aspect values, eco mode values, base model type values, sub-input values) is referenced but not present in the provided source text. -->
<!-- UNRESOLVED: device-name vs source mismatch (monitor name supplied, projector manual provided) — verify correct source artifact before publishing. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:21:00.041Z
last_checked_at: 2026-06-17T19:46:41.534Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T19:46:41.534Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec commands matched verbatim hex sequences in source. Transport parameters verified. One-to-one coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "The supplied device name \"Ea231Wu Bk\" is a Sharp/NEC monitor model, but the source document is a generic *projector* control command reference (references lamp, lens, shutter, lamp memory). The source does not state a specific model name. Model-to-source compatibility is unconfirmed."
- "Default baud rate not stated (source lists 5 options); model code (ID2) value not stated; input terminal value table lives in an appendix not included in the source text."
- "source lists 115200/38400/19200/9600/4800 bps; default not stated"
- "source states \"Full duplex\" communication mode and wires RTS/CTS pins, but does not name a flow-control setting"
- "appendix not in source text.\""
- "value table in source appendix not included in source text\""
- "not in source text\""
- "source describes only command/response model; no unsolicited"
- "source documents no explicit multi-step sequences."
- "no voltage/current/power specs, no power-on sequencing procedure"
- "appendix \"Supplementary Information by Command\" (input terminal codes, aspect values, eco mode values, base model type values, sub-input values) is referenced but not present in the provided source text."
- "device-name vs source mismatch (monitor name supplied, projector manual provided) — verify correct source artifact before publishing."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
