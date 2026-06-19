---
spec_id: admin/sharp-nec-ma431
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC Ma431 Control Spec"
manufacturer: Sharp/NEC
model_family: Ma431
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - Ma431
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:54:51.380Z
last_checked_at: 2026-06-18T08:13:45.526Z
generated_at: 2026-06-18T08:13:45.526Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model name \"Ma431\" supplied by operator; source doc itself is a generic projector command reference and does not print a model name. Firmware version, default baud rate, and flow-control mode not stated."
  - "source lists supported rates 115200/38400/19200/9600/4800 bps; no default designated"
  - "RTS/CTS pins wired per D-SUB 9P pinout; flow-control mode not stated (source notes full-duplex communication mode)"
  - "no discrete settable-parameter variables distinct from the Actions above;"
  - "source describes only solicited responses (after a command). No unsolicited"
  - "no multi-step sequences described explicitly in source."
  - "source notes POWER OFF blocks all commands during cooling time, and lens"
  - "appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not included in refined source — enum ranges incomplete."
  - "firmware version compatibility not stated."
  - "default baud rate not designated (5 rates supported)."
  - "flow-control mode not stated."
  - "ID2 model code value for Ma431 not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:13:45.526Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC Ma431 Control Spec

## Summary
Sharp/NEC Ma431 projector. Binary hex control protocol over RS-232C serial (D-SUB 9P, cross cable) and wired/wireless LAN (TCP port 7142). Covers power, input switching, mute, picture/volume/aspect adjust, lens control & memory, shutter, freeze, eco mode, edge blending, PIP/PbP, and a broad set of status/query commands. Source: Projector Control Command Reference Manual (BDT140013 Rev 7.1).

<!-- UNRESOLVED: model name "Ma431" supplied by operator; source doc itself is a generic projector command reference and does not print a model name. Firmware version, default baud rate, and flow-control mode not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 7142
serial:
  baud_rate: null  # UNRESOLVED: source lists supported rates 115200/38400/19200/9600/4800 bps; no default designated
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired per D-SUB 9P pinout; flow-control mode not stated (source notes full-duplex communication mode)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred from POWER ON / POWER OFF commands
- queryable  # inferred from numerous status/information request commands
- levelable  # inferred from PICTURE ADJUST / VOLUME ADJUST
- routable   # inferred from INPUT SW CHANGE
```

## Actions
```yaml
# All payloads verbatim from source (hex). CKS = checksum = low byte of sum of all
# preceding bytes (see source §2.2). ID1 = control ID set on projector; ID2 = model code.
# Parameterized commands show the variable DATA bytes.

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
  notes: While powering on, no other command accepted.

- id: cmd_016_power_off
  label: "016. POWER OFF"
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []
  notes: During power-off incl. cooling time, no other command accepted.

- id: cmd_018_input_sw_change
  label: "018. INPUT SW CHANGE"
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal code (e.g. 06h = video port). See appendix 'Supplementary Information by Command'."

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_030_2_volume_adjust
  label: "030-2. VOLUME ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_030_12_aspect_adjust
  label: "030-12. ASPECT ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. See appendix 'Supplementary Information by Command'."

- id: cmd_030_15_other_adjust
  label: "030-15. OTHER ADJUST"
  kind: action
  command: "03h 10h 00h 00h 05h {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte (with DATA02). 96h = LAMP/LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte (FFh with DATA01=96h = LAMP/LIGHT ADJUST)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_037_information_request
  label: "037. INFORMATION REQUEST"
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: Returns projector name, lamp usage time (s), filter usage time (s). Updated at 1-min intervals.

- id: cmd_037_3_filter_usage_information_request
  label: "037-3. FILTER USAGE INFORMATION REQUEST"
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: cmd_037_4_lamp_information_request_3
  label: "037-4. LAMP INFORMATION REQUEST 3"
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h usage time (s), 04h remaining life (%)"

- id: cmd_037_6_carbon_savings_information_request
  label: "037-6. CARBON SAVINGS INFORMATION REQUEST"
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: cmd_050_remote_key_code
  label: "050. REMOTE KEY CODE"
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD type). See key code list, e.g. 05h AUTO, 06h MENU, 29h PICTURE, 4Bh COMPUTER1, 4Fh VIDEO1, 84h VOLUME UP."
    - name: DATA02
      type: integer
      description: "Key code high byte (typically 00h per source key code list)."

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Target (e.g. 06h Periphery Focus)"
    - name: DATA02
      type: integer
      description: "00h stop, 01h +1s, 02h +0.5s, 03h +0.25s, 7Fh plus-continuous, 81h minus-continuous, FDh -0.25s, FEh -0.5s, FFh -1s"
  notes: Send 00h to stop continuous drive.

- id: cmd_053_1_lens_control_request
  label: "053-1. LENS CONTROL REQUEST"
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: Target lens axis.

- id: cmd_053_2_lens_control_2
  label: "053-2. LENS CONTROL 2"
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "FFh = stop (mode/value ignored)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: cmd_053_3_lens_memory_control
  label: "053-3. LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: cmd_053_4_reference_lens_memory_control
  label: "053-4. REFERENCE LENS MEMORY CONTROL"
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"
  notes: Controls profile selected by cmd_053_10.

- id: cmd_053_5_lens_memory_option_request
  label: "053-5. LENS MEMORY OPTION REQUEST"
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: cmd_053_6_lens_memory_option_set
  label: "053-6. LENS MEMORY OPTION SET"
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h OFF, 01h ON"

- id: cmd_053_7_lens_information_request
  label: "053-7. LENS INFORMATION REQUEST"
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []
  notes: Returns per-axis operation status (lens memory/zoom/focus/lens shift H+V).

- id: cmd_053_10_lens_profile_set
  label: "053-10. LENS PROFILE SET"
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
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
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"

- id: cmd_078_1_setting_request
  label: "078-1. SETTING REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []
  notes: Returns base model type, sound function availability, profile/timer capability.

- id: cmd_078_2_running_status_request
  label: "078-2. RUNNING STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []
  notes: Returns power status, cooling/power process flags, operation status.

- id: cmd_078_3_input_status_request
  label: "078-3. INPUT STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []
  notes: Returns signal switch process, signal list number, selection signal types, content displayed.

- id: cmd_078_4_mute_status_request
  label: "078-4. MUTE STATUS REQUEST"
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []
  notes: Returns picture/sound/onscreen/forced-onscreen mute + OSD display state.

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
  notes: Returns mirror/lens cover status (00h open, 01h closed).

- id: cmd_079_freeze_control
  label: "079. FREEZE CONTROL"
  kind: action
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: cmd_084_information_string_request
  label: "084. INFORMATION STRING REQUEST"
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "03h horizontal sync frequency, 04h vertical sync frequency"

- id: cmd_097_8_eco_mode_request
  label: "097-8. ECO MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []
  notes: Returns light/lamp eco mode value.

- id: cmd_097_45_lan_projector_name_request
  label: "097-45. LAN PROJECTOR NAME REQUEST"
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: cmd_097_155_lan_mac_address_status_request_2
  label: "097-155. LAN MAC ADDRESS STATUS REQUEST2"
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: cmd_097_198_pip_picture_by_picture_request
  label: "097-198. PIP/PICTURE BY PICTURE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: cmd_097_243_1_edge_blending_mode_request
  label: "097-243-1. EDGE BLENDING MODE REQUEST"
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: cmd_098_8_eco_mode_set
  label: "098-8. ECO MODE SET"
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. See appendix 'Supplementary Information by Command'."

- id: cmd_098_45_lan_projector_name_set
  label: "098-45. LAN PROJECTOR NAME SET"
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {DATA06} {DATA07} {DATA08} {DATA09} {DATA10} {DATA11} {DATA12} {DATA13} {DATA14} {DATA15} {DATA16} 00h {CKS}"
  params:
    - name: DATA01-16
      type: string
      description: "Projector name (up to 16 bytes, NUL-terminated)"

- id: cmd_098_198_pip_picture_by_picture_set
  label: "098-198. PIP/PICTURE BY PICTURE SET"
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01: MODE 00h PIP/01h PbP; START POSITION 00h-03h corners; sub-input per appendix)."

- id: cmd_098_243_1_edge_blending_mode_set
  label: "098-243-1. EDGE BLENDING MODE SET"
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
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
  notes: Returns operation status, displayed content, selection signal types, signal type, mute/freeze states.

- id: cmd_319_10_audio_select_set
  label: "319-10. AUDIO SELECT SET"
  kind: action
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "Setting value: 00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Acknowledgement frame convention (source §2.3): successful cmd -> 2xh/2Xh ack with
# <ID1> <ID2> and result DATA; failure -> Axh frame with <ERR1> <ERR2> <CKS>.

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: cmd_078_2 DATA03 / cmd_305_3 DATA01

- id: error_status
  type: bitmask
  values: [cover_error, temperature_error_bimetallic, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor_error, lamp_not_present, lamp2_not_present, lamp2_data_error, dust_temperature_error, foreign_matter_sensor_error, ballast_comm_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave_cpu, system_error_formatter]
  source: cmd_009 DATA01-DATA12

- id: mute_state
  type: enum
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute]
  source: cmd_078_4 DATA01-DATA04

- id: cover_state
  type: enum
  values: [open, closed]
  source: cmd_078_6 DATA01

- id: response_error
  type: enum
  values: [command_not_recognized, command_not_supported, invalid_value, invalid_input_terminal, invalid_language, memory_allocation_error, memory_in_use, value_cannot_be_set, forced_onscreen_mute_on, viewer_error, no_signal, test_pattern_displayed, no_pc_card, memory_operation_error, entry_list_displayed, power_off_command_rejected, command_execution_failed, no_authority, incorrect_gain_number, invalid_gain, adjustment_failed]
  source: ERR1/ERR2 code table (§2.4)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable-parameter variables distinct from the Actions above;
# PICTURE ADJUST / VOLUME / ASPECT / LAMP ADJUST are parameterized actions already in Actions[].
```

## Events
```yaml
# UNRESOLVED: source describes only solicited responses (after a command). No unsolicited
# notification frames documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes POWER OFF blocks all commands during cooling time, and lens
# continuous-drive requires an explicit stop, but no formal safety/interlock procedure or
# power-on sequencing requirement is stated. Do not infer.
```

## Notes
- Binary hex protocol. Frame layout per §2.1: `20h 88h <ID1> <ID2> 0Ch <DATA01>...<DATA12> <CKS>`. ID1 = projector control ID; ID2 = model code (varies by model).
- Checksum (CKS) = low-order byte of sum of all preceding bytes. Example from source: `20h+81h+01h+60h+01h+00h = 103h` -> CKS = `03h`.
- Serial: D-SUB 9P cross cable; RxD/TxD crossed, RTS/CTS crossed, pin 5 GND.
- LAN: TCP port 7142; wired RJ-45 (10/100 auto) or optional wireless LAN unit.
- During power-on and power-off (incl. cooling), no other command is accepted.
- Lamp/filter usage times returned in seconds, updated at 1-minute intervals.
- Many DATA enums (input terminal, aspect, eco mode, sub-input) reference an appendix "Supplementary Information by Command" not present in this refined source excerpt.

<!-- UNRESOLVED: appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not included in refined source — enum ranges incomplete. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: default baud rate not designated (5 rates supported). -->
<!-- UNRESOLVED: flow-control mode not stated. -->
<!-- UNRESOLVED: ID2 model code value for Ma431 not stated in source. -->
````

53 commands enumerated — every source row, payload verbatim. Ingest next.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T15:54:51.380Z
last_checked_at: 2026-06-18T08:13:45.526Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:13:45.526Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model name \"Ma431\" supplied by operator; source doc itself is a generic projector command reference and does not print a model name. Firmware version, default baud rate, and flow-control mode not stated."
- "source lists supported rates 115200/38400/19200/9600/4800 bps; no default designated"
- "RTS/CTS pins wired per D-SUB 9P pinout; flow-control mode not stated (source notes full-duplex communication mode)"
- "no discrete settable-parameter variables distinct from the Actions above;"
- "source describes only solicited responses (after a command). No unsolicited"
- "no multi-step sequences described explicitly in source."
- "source notes POWER OFF blocks all commands during cooling time, and lens"
- "appendix 'Supplementary Information by Command' (input terminal codes, aspect values, eco mode values, sub-input values, base model types) not included in refined source — enum ranges incomplete."
- "firmware version compatibility not stated."
- "default baud rate not designated (5 rates supported)."
- "flow-control mode not stated."
- "ID2 model code value for Ma431 not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
