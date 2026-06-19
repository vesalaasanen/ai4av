---
spec_id: admin/sharp-nec-m981
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC M981 Control Spec"
manufacturer: Sharp/NEC
model_family: M981
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - M981
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:56:13.973Z
last_checked_at: 2026-06-18T08:13:43.137Z
generated_at: 2026-06-18T08:13:43.137Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "input terminal value table referenced in \"Supplementary Information by Command\" appendix not present in refined source"
  - "eco mode value table, aspect value table, base model type value table, and sub-input value tables referenced to appendix not present in refined source"
  - "ID2 model code value for the M981 not stated"
  - "RTS/CTS pins wired (pins 7/8) but flow-control mode not stated in source"
  - "exact value table in appendix 'Supplementary Information by Command' not in refined source"
  - "value enum in appendix not in refined source"
  - "no event/notification mechanism stated in source"
  - "populate if a later source revision documents macros"
  - "no power-on sequencing requirement or safety interlock procedure stated in source"
  - "input terminal / aspect / eco mode / base model type / sub-input value tables (appendix not in refined source)"
  - "ID2 model code value for M981"
  - "flow_control mode (RTS/CTS pins wired but mode not stated)"
  - "firmware version compatibility"
verification:
  verdict: verified
  checked_at: 2026-06-18T08:13:43.137Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC M981 Control Spec

## Summary
The Sharp/NEC M981 is a large-venue LCD projector controllable via RS-232C serial or wired/wireless LAN (TCP). This spec covers the binary-frame command protocol documented in the Projector Control Command Reference Manual (BDT140013 Rev 7.1), including power, input switching, mute, picture/volume/lens adjustment, lens memory, status queries, and system information commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: input terminal value table referenced in "Supplementary Information by Command" appendix not present in refined source -->
<!-- UNRESOLVED: eco mode value table, aspect value table, base model type value table, and sub-input value tables referenced to appendix not present in refined source -->
<!-- UNRESOLVED: ID2 model code value for the M981 not stated -->

## Transport
```yaml
# Source documents both RS-232C serial and LAN (TCP) carrying the same binary
# command frames. Both protocols are emitted.
protocols:
  - serial
  - tcp
serial:
  # Source lists selectable baud rates; device negotiates none - host must match.
  baud_rate: 115200  # selectable: 115200 / 38400 / 19200 / 9600 / 4800 bps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: RTS/CTS pins wired (pins 7/8) but flow-control mode not stated in source
addressing:
  port: 7142  # TCP port stated for LAN command send/receive
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (015 POWER ON / 016 POWER OFF)
# - queryable       (009, 037, 078-*, 305-*, 060-1, 097-* request commands)
# - levelable       (030-1 PICTURE ADJUST, 030-2 VOLUME ADJUST, 030-15 OTHER ADJUST, 053 LENS CONTROL)
# - routable        (018 INPUT SW CHANGE, 319-10 AUDIO SELECT SET)
```

## Actions
```yaml
# All command frames are verbatim hex from source. <ID1> <ID2> <CKS> are framing
# fields populated by the host at runtime (see Notes for checksum rule).
# kind: query entries are the request frames that solicit a data response.

- id: error_status_request
  label: Error Status Request
  kind: query
  command: "00h 88h 00h 00h 00h 88h"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "02h 00h 00h 00h 00h 02h"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "02h 01h 00h 00h 00h 03h"
  params: []

- id: input_sw_change
  label: Input SW Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal byte (e.g. 06h = video port). See appendix 'Supplementary Information by Command'."
  notes: "Source example for video port: 02h 03h 00h 00h 02h 01h 06h 0Eh"

- id: picture_mute_on
  label: Picture Mute On
  kind: action
  command: "02h 10h 00h 00h 00h 12h"
  params: []

- id: picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "02h 11h 00h 00h 00h 13h"
  params: []

- id: sound_mute_on
  label: Sound Mute On
  kind: action
  command: "02h 12h 00h 00h 00h 14h"
  params: []

- id: sound_mute_off
  label: Sound Mute Off
  kind: action
  command: "02h 13h 00h 00h 00h 15h"
  params: []

- id: onscreen_mute_on
  label: Onscreen Mute On
  kind: action
  command: "02h 14h 00h 00h 00h 16h"
  params: []

- id: onscreen_mute_off
  label: Onscreen Mute Off
  kind: action
  command: "02h 15h 00h 00h 00h 17h"
  params: []

- id: picture_adjust
  label: Picture Adjust
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> FFh <DATA02> <DATA03> <DATA04> <CKS>"
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
  notes: "Source example set brightness=10: 03h 10h 00h 00h 05h 00h FFh 00h 0Ah 00h 21h"

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
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
  notes: "Source example set volume=10: 03h 10h 00h 00h 05h 05h 00h 00h 0Ah 00h 27h"

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Aspect value. See appendix 'Supplementary Information by Command'."

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target high byte: 96h = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA02
      type: integer
      description: "Adjustment target low byte: FFh (per source LAMP/LIGHT row)"
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []
  notes: "Returns projector name, lamp usage time, filter usage time."

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lamp selector: 00h Lamp 1, 01h Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h lamp usage time (seconds), 04h lamp remaining life (%)"
  notes: "Source example get lamp 1 usage time: 03h 96h 00h 00h 02h 00h 01h 9Ch"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Total Carbon Savings, 01h Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (see key code list, e.g. 05h=AUTO, 06h=MENU, 07h=UP)"
    - name: DATA02
      type: integer
      description: "Key code high byte (00h for all listed keys)"
  notes: "Source example send AUTO: 02h 0Fh 00h 00h 02h 05h 00h 18h"

- id: shutter_close
  label: Shutter Close
  kind: action
  command: "02h 16h 00h 00h 00h 18h"
  params: []

- id: shutter_open
  label: Shutter Open
  kind: action
  command: "02h 17h 00h 00h 00h 19h"
  params: []

- id: lens_control
  label: Lens Control
  kind: action
  command: "02h 18h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (06h Periphery Focus shown in source; other targets referenced to appendix)"
    - name: DATA02
      type: integer
      description: "00h Stop, 01h drive 1s plus, 02h drive 0.5s plus, 03h drive 0.25s plus, 7Fh drive plus, 81h drive minus, FDh drive 0.25s minus, FEh drive 0.5s minus, FFh drive 1s minus"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Lens target selector

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Lens target (FFh = Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: integer
      description: "00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Profile number: 00h Profile 1, 01h Profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h <DATA01> 00h 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h Brightness, 01h Contrast, 02h Color, 03h Hue, 04h Sharpness, 05h Volume, 96h Lamp/Light Adjust"
  notes: "Source example get brightness: 03h 05h 00h 00h 03h 00h 00h 00h 0Bh"

- id: setting_request
  label: Setting Request
  kind: query
  command: "00h 85h 00h 00h 01h 00h 86h"
  params: []

- id: running_status_request
  label: Running Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 01h 87h"
  params: []

- id: input_status_request
  label: Input Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 02h 88h"
  params: []

- id: mute_status_request
  label: Mute Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 03h 89h"
  params: []

- id: model_name_request
  label: Model Name Request
  kind: query
  command: "00h 85h 00h 00h 01h 04h 8Ah"
  params: []

- id: cover_status_request
  label: Cover Status Request
  kind: query
  command: "00h 85h 00h 00h 01h 05h 8Bh"
  params: []

- id: freeze_control
  label: Freeze Control
  kind: action
  command: "01h 98h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "03h Horizontal sync frequency, 04h Vertical sync frequency"

- id: eco_mode_request
  label: Eco Mode Request
  kind: query
  command: "03h B0h 00h 00h 01h 07h BBh"
  params: []

- id: lan_projector_name_request
  label: LAN Projector Name Request
  kind: query
  command: "03h B0h 00h 00h 01h 2Ch E0h"
  params: []

- id: lan_mac_address_status_request_2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture by Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Eco mode value. See appendix 'Supplementary Information by Command'."

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: name_bytes
      type: string
      description: "Projector name, up to 16 bytes (DATA01-DATA16)"

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/SUB INPUT 1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01: MODE 00h=PIP/01h=PiP-by-PiP; START POSITION 00h-03h corners; sub-input values per appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h OFF, 01h ON"

- id: base_model_type_request
  label: Base Model Type Request
  kind: query
  command: "00h BFh 00h 00h 01h 00h C0h"
  params: []

- id: serial_number_request
  label: Serial Number Request
  kind: query
  command: "00h BFh 00h 00h 02h 01h 06h C8h"
  params: []

- id: basic_information_request
  label: Basic Information Request
  kind: query
  command: "00h BFh 00h 00h 01h 02h C2h"
  params: []

- id: audio_select_set
  label: Audio Select Set
  kind: action
  command: "03h C9h 00h 00h 03h 09h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Input terminal. See appendix 'Supplementary Information by Command'."
    - name: DATA02
      type: integer
      description: "00h terminal specified in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
# Observable states returned by query responses. Each response frame is prefixed
# 20h/22h/23h with <ID1> <ID2> LEN <DATA...> <CKS>. Full response shapes documented
# in source sections 3.1-3.53.
- id: error_status
  type: bitmask
  values: [cover_error, temperature_error_bimetallic, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, fpga_error, mirror_cover_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave, system_error_formatter]

- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_power_saving, network_standby]
  source: "078-2 RUNNING STATUS REQUEST DATA03/DATA06"

- id: input_signal_state
  type: object
  source: "078-3 INPUT STATUS REQUEST"

- id: mute_state
  type: object
  values: [picture_mute, sound_mute, onscreen_mute, forced_onscreen_mute, onscreen_display]
  source: "078-4 MUTE STATUS REQUEST"

- id: cover_state
  type: enum
  values: [normal_opened, cover_closed]
  source: "078-6 COVER STATUS REQUEST"

- id: lens_operation_state
  type: bitmask
  values: [lens_memory, zoom, focus, lens_shift_h, lens_shift_v]
  source: "053-7 LENS INFORMATION REQUEST DATA01"

- id: eco_mode
  type: enum
  # UNRESOLVED: exact value table in appendix 'Supplementary Information by Command' not in refined source
  source: "097-8 ECO MODE REQUEST"

- id: edge_blending_mode
  type: enum
  values: [off, on]
  source: "097-243-1 EDGE BLENDING MODE REQUEST"

- id: execution_result
  type: enum
  values: [success, error]
  source: "Common DATA01/DATA02=0000h success, other error (030-* commands)"
```

## Variables
```yaml
# Settable parameters exposed via dedicated set commands.
- id: projector_name
  type: string
  max_length: 16
  source: "098-45 LAN PROJECTOR NAME SET"
- id: eco_mode_value
  type: integer
  # UNRESOLVED: value enum in appendix not in refined source
  source: "098-8 ECO MODE SET"
- id: edge_blending_enabled
  type: boolean
  source: "098-243-1 EDGE BLENDING MODE SET"
- id: pip_pbp_mode
  type: enum
  values: [pip, picture_by_picture]
  source: "098-198 PIP/PICTURE BY PICTURE SET"
- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: "053-10 LENS PROFILE SET"
- id: lens_memory_option
  type: enum
  values: [load_by_signal, forced_mute]
  source: "053-6 LENS MEMORY OPTION SET"
```

## Events
```yaml
# No unsolicited notifications documented. All responses are solicited by commands.
# UNRESOLVED: no event/notification mechanism stated in source
```

## Macros
```yaml
# No multi-step sequences described explicitly in source.
# UNRESOLVED: populate if a later source revision documents macros
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes:
# - During POWER ON execution, no other command can be accepted (sec 3.2).
# - During POWER OFF (including cooling time), no other command can be accepted (sec 3.3).
# - Error status (009) reports interlock switch open, cover errors, temperature errors,
#   and lens-not-installed conditions - but no explicit safety procedure is documented.
# UNRESOLVED: no power-on sequencing requirement or safety interlock procedure stated in source
```

## Notes
- Binary frame protocol. All commands/responses are hex byte sequences enclosed in a frame. Format: `<cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`.
- `<ID1>` = control ID set on projector. `<ID2>` = model code (varies by model — value for M981 not stated).
- Checksum (`<CKS>`): sum all preceding bytes, take low-order one byte. Worked source example: `20h+81h+01h+60h+01h+00h = 103h` → checksum `03h`.
- Response framing: `2Xh` prefix = success (20h/21h/22h/23h), `AXh` prefix = error (A0h/A1h/A2h/A3h) with `<ERR1> <ERR2>` codes (see source sec 2.4).
- Baud rate is selectable among 4800/9600/19200/38400/115200 — host must match projector setting; no auto-negotiation.
- Usage times (lamp, filter) are returned in seconds but updated at one-minute intervals.
- Signal list number returned by INPUT STATUS REQUEST is practical value minus 1.
- Several value tables (input terminal, aspect, eco mode, base model type, sub-input) are referenced to an appendix "Supplementary Information by Command" that is not present in the refined source — marked UNRESOLVED where relevant.

<!-- UNRESOLVED: input terminal / aspect / eco mode / base model type / sub-input value tables (appendix not in refined source) -->
<!-- UNRESOLVED: ID2 model code value for M981 -->
<!-- UNRESOLVED: flow_control mode (RTS/CTS pins wired but mode not stated) -->
<!-- UNRESOLVED: firmware version compatibility -->
````

Spec done. 53 actions, all verbatim hex payloads. Serial+TCP both transport. Appendix value tables + ID2 model code + flow_control left UNRESOLVED (not in refined source).

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T16:56:13.973Z
last_checked_at: 2026-06-18T08:13:43.137Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:13:43.137Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "input terminal value table referenced in \"Supplementary Information by Command\" appendix not present in refined source"
- "eco mode value table, aspect value table, base model type value table, and sub-input value tables referenced to appendix not present in refined source"
- "ID2 model code value for the M981 not stated"
- "RTS/CTS pins wired (pins 7/8) but flow-control mode not stated in source"
- "exact value table in appendix 'Supplementary Information by Command' not in refined source"
- "value enum in appendix not in refined source"
- "no event/notification mechanism stated in source"
- "populate if a later source revision documents macros"
- "no power-on sequencing requirement or safety interlock procedure stated in source"
- "input terminal / aspect / eco mode / base model type / sub-input value tables (appendix not in refined source)"
- "ID2 model code value for M981"
- "flow_control mode (RTS/CTS pins wired but mode not stated)"
- "firmware version compatibility"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
