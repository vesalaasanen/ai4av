---
spec_id: admin/sharp-nec-ld-fe252
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC LD Fe252 Control Spec"
manufacturer: Sharp/NEC
model_family: "LD Fe252"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "LD Fe252"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:50:59.409Z
last_checked_at: 2026-06-17T20:08:44.193Z
generated_at: 2026-06-17T20:08:44.193Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version, exact model variants, appendix value tables (input terminal codes, base model types, eco mode values) not in refined source"
  - "enum values in appendix, not in refined source"
  - "source documents responses only; no unsolicited notification frames described."
  - "no explicit multi-step sequences in source."
  - "no explicit interlock procedures or power-on sequencing warnings beyond command-block notes."
  - "appendix value tables not in refined source — input terminal codes (018), base model types (078-1/305-1), eco mode values (097-8/098-8), aspect values (030-12), sub input values (097-198/098-198). ID2 model code value for LD Fe252 not stated. Firmware version compatibility not stated."
verification:
  verdict: verified
  checked_at: 2026-06-17T20:08:44.193Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified against source with exact hex sequences; transport params confirmed; coverage 100%. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-16
---

# Sharp/NEC LD Fe252 Control Spec

## Summary
Sharp/NEC LD Fe252 projector. Binary control protocol over RS-232C serial and wired/wireless LAN (TCP). Covers power, input switch, mutes, picture/volume/aspect adjust, lens control + memory, freeze, shutter, status queries, lamp/filter/eco info, PIP/PbP, edge blending, audio select. Manual rev BDT140013 7.1.

<!-- UNRESOLVED: firmware version, exact model variants, appendix value tables (input terminal codes, base model types, eco mode values) not in refined source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 7142
serial:
  baud_rate: 115200  # source lists 115200/38400/19200/9600/4800; pick per install
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: full_duplex
auth:
  type: none  # inferred: no auth procedure in source
```

Note: source lists multiple valid baud rates (115200/38400/19200/9600/4800). Single value shown; installer selects.

## Traits
```yaml
traits:
  - powerable       # inferred: 015/016 power on/off commands
  - queryable       # inferred: many 0xx request commands return state
  - levelable       # inferred: 030-1/030-2 picture+volume adjust
  - routable        # inferred: 018 input switch command
```

## Actions
```yaml
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
  label: Input Switch Change
  kind: action
  command: "02h 03h 00h 00h 02h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: Input terminal code (see appendix; e.g. 06h = video port)

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
  command: "03h 10h 00h 00h 05h {DATA01} FFh {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target: 00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness"
    - name: DATA02
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h {DATA01} {DATA02} {DATA03} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: Aspect value (see appendix)

- id: other_adjust
  label: Other Adjust (Lamp/Light Adjust)
  kind: action
  command: "03h 10h 00h 00h 05h 96h FFh {DATA01} {DATA02} {DATA03} {DATA04} {DATA05} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Adjustment target 96h/FFh = LAMP ADJUST / LIGHT ADJUST"
    - name: DATA03
      type: string
      description: "Mode: 00h absolute, 01h relative"
    - name: DATA04
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA05
      type: integer
      description: Adjustment value (high 8 bits)

- id: information_request
  label: Information Request
  kind: query
  command: "03h 8Ah 00h 00h 00h 8Dh"
  params: []

- id: filter_usage_information_request
  label: Filter Usage Information Request
  kind: query
  command: "03h 95h 00h 00h 00h 98h"
  params: []

- id: lamp_information_request_3
  label: Lamp Information Request 3
  kind: query
  command: "03h 96h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h lamp 1, 01h lamp 2 (two-lamp models only)"
    - name: DATA02
      type: string
      description: "Content: 01h usage time (s), 04h remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h total carbon savings, 01h savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "Key code low byte (e.g. 02h POWER ON, 05h AUTO, 4Bh COMPUTER1, 8Ah FREEZE)"
    - name: DATA02
      type: string
      description: "Key code high byte (typically 00h)"

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
  command: "02h 18h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "06h periphery focus"
    - name: DATA02
      type: string
      description: "00h stop, 01h/02h/03h drive plus 1s/0.5s/0.25s, 7Fh drive plus, 81h drive minus, FDh/FEh/FFh drive minus 0.25s/0.5s/1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h {DATA01} 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: Lens control target

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h {DATA01} {DATA02} {DATA03} {DATA04} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "FFh stop, else target"
    - name: DATA02
      type: string
      description: "Mode: 00h absolute, 02h relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high 8 bits)

- id: lens_memory_control
  label: Lens Memory Control
  kind: action
  command: "02h 1Eh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MOVE, 01h STORE, 02h RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h LOAD BY SIGNAL, 01h FORCED MUTE"
    - name: DATA02
      type: string
      description: "Setting: 00h OFF, 01h ON"

- id: lens_information_request
  label: Lens Information Request
  kind: query
  command: "02h 22h 00h 00h 01h 00h 25h"
  params: []

- id: lens_profile_set
  label: Lens Profile Set
  kind: action
  command: "02h 27h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h profile 1, 01h profile 2"

- id: lens_profile_request
  label: Lens Profile Request
  kind: query
  command: "02h 28h 00h 00h 00h 2Ah"
  params: []

- id: gain_parameter_request_3
  label: Gain Parameter Request 3
  kind: query
  command: "03h 05h 00h 00h 03h {DATA01} 00h 00h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h brightness, 01h contrast, 02h color, 03h hue, 04h sharpness, 05h volume, 96h lamp/light adjust"

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
  command: "01h 98h 00h 00h 01h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "01h freeze on, 02h freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h {DATA01} 01h {CKS}"
  params:
    - name: DATA01
      type: string
      description: "03h horizontal sync freq, 04h vertical sync freq"

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

- id: lan_mac_address_status_request2
  label: LAN MAC Address Status Request 2
  kind: query
  command: "03h B0h 00h 00h 02h 9Ah 00h 4Fh"
  params: []

- id: pip_picture_by_picture_request
  label: PIP/Picture By Picture Request
  kind: query
  command: "03h B0h 00h 00h 02h C5h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"

- id: edge_blending_mode_request
  label: Edge Blending Mode Request
  kind: query
  command: "03h B0h 00h 00h 02h DFh 00h 94h"
  params: []

- id: eco_mode_set
  label: Eco Mode Set
  kind: action
  command: "03h B1h 00h 00h 02h 07h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
      description: Eco mode value (see appendix)

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch {DATA01..DATA16} 00h {CKS}"
  params:
    - name: name
      type: string
      description: Projector name (up to 16 bytes)

- id: pip_picture_by_picture_set
  label: PIP/Picture By Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: "00h MODE, 01h START POSITION, 02h SUB INPUT/1, 09h SUB INPUT 2, 0Ah SUB INPUT 3"
    - name: DATA02
      type: string
      description: "Setting value (see appendix)"

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h {DATA01} {CKS}"
  params:
    - name: DATA01
      type: string
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
  command: "03h C9h 00h 00h 03h 09h {DATA01} {DATA02} {CKS}"
  params:
    - name: DATA01
      type: string
      description: Input terminal (see appendix)
    - name: DATA02
      type: string
      description: "Setting: 00h terminal in DATA01, 01h BNC, 02h COMPUTER"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, power_on, cooling, standby_error, standby_sleep, standby_power_saving, network_standby]
  source: running_status_request DATA06 / basic_information_request DATA01

- id: error_status
  type: bitmask
  values: [cover_error, temperature_error_bimetal, fan_error, power_error, lamp_off, lamp_replacement_due, lamp_usage_exceeded, formatter_error, lamp2_off, fpga_error, temperature_sensor_error, lamp_not_present, lamp_data_error, mirror_cover_error, ballast_comm_error, iris_calibration_error, lens_not_installed, interlock_switch_open, system_error_slave, system_error_formatter]
  source: error_status_request DATA01-04 + DATA09 extended

- id: input_terminal
  type: enum
  values: [computer, video, s_video, component, viewer, dvi_d, hdmi, displayport]
  source: input_status_request DATA04

- id: picture_mute_state
  type: enum
  values: [on, off]
  source: mute_status_request DATA01

- id: sound_mute_state
  type: enum
  values: [on, off]
  source: mute_status_request DATA02

- id: onscreen_mute_state
  type: enum
  values: [on, off]
  source: mute_status_request DATA03

- id: cover_status
  type: enum
  values: [opened, closed]
  source: cover_status_request DATA01

- id: lamp_usage_time
  type: integer
  unit: seconds
  source: lamp_information_request_3 DATA03-06

- id: lamp_remaining_life
  type: integer
  unit: percent
  source: lamp_information_request_3 (content 04h)

- id: filter_usage_time
  type: integer
  unit: seconds
  source: filter_usage_information_request DATA01-04

- id: freeze_state
  type: enum
  values: [on, off]
  source: basic_information_request DATA09

- id: eco_mode
  type: string
  source: eco_mode_request DATA01
  # UNRESOLVED: enum values in appendix, not in refined source
```

## Variables
```yaml
- id: brightness
  type: integer
  source: picture_adjust DATA01=00h / gain_parameter_request_3 DATA01=00h

- id: contrast
  type: integer
  source: picture_adjust DATA01=01h / gain_parameter_request_3 DATA01=01h

- id: color
  type: integer
  source: picture_adjust DATA01=02h / gain_parameter_request_3 DATA01=02h

- id: hue
  type: integer
  source: picture_adjust DATA01=03h / gain_parameter_request_3 DATA01=03h

- id: sharpness
  type: integer
  source: picture_adjust DATA01=04h / gain_parameter_request_3 DATA01=04h

- id: volume
  type: integer
  source: volume_adjust / gain_parameter_request_3 DATA01=05h

- id: lamp_light_adjust
  type: integer
  source: other_adjust / gain_parameter_request_3 DATA01=96h

- id: projector_name
  type: string
  max_length: 16
  source: lan_projector_name_set / lan_projector_name_request

- id: lens_profile
  type: enum
  values: [profile_1, profile_2]
  source: lens_profile_set
```

## Events
```yaml
# UNRESOLVED: source documents responses only; no unsolicited notification frames described.
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes:
  - "Power on (015) blocks all other commands during power-on sequence."
  - "Power off (016) blocks all other commands during cooling time."
  - "Lens control (053): after sending 7Fh/81h continuous drive, must send 00h to stop."
# UNRESOLVED: no explicit interlock procedures or power-on sequencing warnings beyond command-block notes.
```

## Notes
- Binary protocol. Every frame ends with CKS checksum = low byte of sum of all preceding bytes.
- Command/response format: header byte (00h-03h cmd, 20h-23h success resp, A0h-A3h error resp), command code, `<ID1> <ID2>`, LEN, DATA, CKS.
- ID1 = control ID set on projector; ID2 = model code (varies by model).
- Both serial (RS-232C cross cable, D-SUB 9P) and LAN (TCP 7142) carry same command set.
- Usage times update at 1-minute intervals despite 1-second resolution.
- Lamp remaining life returns negative when replacement deadline exceeded.

<!-- UNRESOLVED: appendix value tables not in refined source — input terminal codes (018), base model types (078-1/305-1), eco mode values (097-8/098-8), aspect values (030-12), sub input values (097-198/098-198). ID2 model code value for LD Fe252 not stated. Firmware version compatibility not stated. -->

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-16T11:50:59.409Z
last_checked_at: 2026-06-17T20:08:44.193Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-17T20:08:44.193Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified against source with exact hex sequences; transport params confirmed; coverage 100%. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version, exact model variants, appendix value tables (input terminal codes, base model types, eco mode values) not in refined source"
- "enum values in appendix, not in refined source"
- "source documents responses only; no unsolicited notification frames described."
- "no explicit multi-step sequences in source."
- "no explicit interlock procedures or power-on sequencing warnings beyond command-block notes."
- "appendix value tables not in refined source — input terminal codes (018), base model types (078-1/305-1), eco mode values (097-8/098-8), aspect values (030-12), sub input values (097-198/098-198). ID2 model code value for LD Fe252 not stated. Firmware version compatibility not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
