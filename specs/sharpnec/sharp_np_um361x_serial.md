---
spec_id: admin/sharp-nec-np-um361x
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sharp/NEC NP Um361X Control Spec"
manufacturer: Sharp/NEC
model_family: "NP Um361X"
aliases: []
compatible_with:
  manufacturers:
    - Sharp/NEC
  models:
    - "NP Um361X"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:22:18.729Z
last_checked_at: 2026-06-18T08:56:40.729Z
generated_at: 2026-06-18T08:56:40.729Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "input-terminal DATA01 value table is in an appendix not included in the refined source (\"see the Appendix Supplementary Information by Command\"). Sub-input setting values for PIP/PbP similarly unresolved. Eco-mode setting values unresolved."
  - "device's actual configured rate not fixed in source"
  - "appendix not in refined source."
  - "source describes no unsolicited notifications. All responses are"
  - "source documents no explicit multi-step sequences."
  - "input-terminal value table, eco-mode value table, sub-input setting value table, and base-model-type codes all referenced to an appendix (\"Supplementary Information by Command\") not present in the refined source. flow_control mode not specified. Single active baud rate among the five supported not fixed. firmware version compatibility not stated."
  - "appendix value tables (input terminal, eco mode, sub-input, base-model type), flow_control, active baud, firmware."
verification:
  verdict: verified
  checked_at: 2026-06-18T08:56:40.729Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-17
---

# Sharp/NEC NP Um361X Control Spec

## Summary
Control spec for the Sharp/NEC NP Um361X projector (manual BDT140013 Rev 7.1). Covers RS-232C serial control and wired/wireless LAN control over TCP port 7142. Binary command protocol framed with hex bytes; each command carries a 1-byte checksum equal to the low byte of the sum of all preceding bytes.

<!-- UNRESOLVED: input-terminal DATA01 value table is in an appendix not included in the refined source ("see the Appendix Supplementary Information by Command"). Sub-input setting values for PIP/PbP similarly unresolved. Eco-mode setting values unresolved. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600        # source lists 115200/38400/19200/9600/4800; 9600 chosen as common default - UNRESOLVED: device's actual configured rate not fixed in source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none     # source states Full duplex; RTS/CTS pins present but hardware flow control mode not specified - UNRESOLVED
addressing:
  port: 7142             # TCP port for LAN command send/receive (stated)
auth:
  type: none             # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable      # inferred from 015 POWER ON / 016 POWER OFF
  - queryable      # inferred from many status/error/info request commands
  - routable       # inferred from 018 INPUT SW CHANGE
  - levelable      # inferred from 030-1 PICTURE ADJUST / 030-2 VOLUME ADJUST
```

## Actions
```yaml
# All commands framed in hex. <CKS> = checksum = low byte of sum of all
# preceding bytes. <ID1> = control ID, <ID2> = model code (filled by device).
# Fixed commands show verbatim payload incl. checksum; parameterized commands
# show template with variable DATA and <CKS> placeholder.

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
      description: Input terminal value (e.g. 06h = video port). Full table in appendix - UNRESOLVED: appendix not in refined source.

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
      description: "Adjustment target: 00h=Brightness, 01h=Contrast, 02h=Color, 03h=Hue, 04h=Sharpness"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA03
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA04
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: volume_adjust
  label: Volume Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 05h 00h <DATA01> <DATA02> <DATA03> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
    - name: DATA02
      type: integer
      description: Adjustment value (low-order 8 bits)
    - name: DATA03
      type: integer
      description: Adjustment value (high-order 8 bits)

- id: aspect_adjust
  label: Aspect Adjust
  kind: action
  command: "03h 10h 00h 00h 05h 18h 00h 00h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Value set for the aspect. Full table in appendix - UNRESOLVED: appendix not in refined source.

- id: other_adjust
  label: Other Adjust (Lamp/Light)
  kind: action
  command: "03h 10h 00h 00h 05h <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Adjustment target: 96h=LAMP ADJUST/LIGHT ADJUST (DATA02=FFh)"
    - name: DATA02
      type: integer
      description: Target sub-code (FFh for lamp/light)
    - name: DATA03
      type: integer
      description: "Adjustment mode: 00h=absolute, 01h=relative"
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
      description: "Lamp: 00h=Lamp 1, 01h=Lamp 2 (two-lamp models only)"
    - name: DATA02
      type: integer
      description: "Content: 01h=usage time (s), 04h=remaining life (%)"

- id: carbon_savings_information_request
  label: Carbon Savings Information Request
  kind: query
  command: "03h 9Ah 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=Total Carbon Savings, 01h=Carbon Savings during operation"

- id: remote_key_code
  label: Remote Key Code
  kind: action
  command: "02h 0Fh 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Key code low byte (WORD). Examples: 02h=POWER ON, 03h=POWER OFF, 05h=AUTO, 06h=MENU, 07h=UP, 08h=DOWN, 09h=RIGHT, 0Ah=LEFT, 0Bh=ENTER, 0Ch=EXIT, 0Dh=HELP, 0Fh=MAGNIFY UP, 10h=MAGNIFY DOWN, 13h=MUTE, 29h=PICTURE, 4Bh=COMPUTER1, 4Ch=COMPUTER2, 4Fh=VIDEO1, 51h=S-VIDEO1, 84h=VOLUME UP, 85h=VOLUME DOWN, 8Ah=FREEZE, A3h=ASPECT, D7h=SOURCE, EEh=LAMP MODE/ECO"
    - name: DATA02
      type: integer
      description: Key code high byte (00h for all listed codes)

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
      description: "Target: 06h=Periphery Focus"
    - name: DATA02
      type: integer
      description: "Content: 00h=Stop, 01h=+1s, 02h=+0.5s, 03h=+0.25s, 7Fh=+continuous, 81h=-continuous, FDh=-0.25s, FEh=-0.5s, FFh=-1s"

- id: lens_control_request
  label: Lens Control Request
  kind: query
  command: "02h 1Ch 00h 00h 02h <DATA01> 00h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: Target (lens axis)

- id: lens_control_2
  label: Lens Control 2
  kind: action
  command: "02h 1Dh 00h 00h 04h <DATA01> <DATA02> <DATA03> <DATA04> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target (FFh=Stop)"
    - name: DATA02
      type: integer
      description: "Adjustment mode: 00h=absolute, 02h=relative"
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
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: reference_lens_memory_control
  label: Reference Lens Memory Control
  kind: action
  command: "02h 1Fh 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "00h=MOVE, 01h=STORE, 02h=RESET"

- id: lens_memory_option_request
  label: Lens Memory Option Request
  kind: query
  command: "02h 20h 00h 00h 01h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"

- id: lens_memory_option_set
  label: Lens Memory Option Set
  kind: action
  command: "02h 21h 00h 00h 02h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Option: 00h=LOAD BY SIGNAL, 01h=FORCED MUTE"
    - name: DATA02
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
      description: "Profile number: 00h=Profile 1, 01h=Profile 2"

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
      description: "Adjusted value name: 00h=BRIGHTNESS, 01h=CONTRAST, 02h=COLOR, 03h=HUE, 04h=SHARPNESS, 05h=VOLUME, 96h=LAMP/LIGHT ADJUST"

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
      description: "01h=freeze on, 02h=freeze off"

- id: information_string_request
  label: Information String Request
  kind: query
  command: "00h D0h 00h 00h 03h 00h <DATA01> 01h <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Information type: 03h=Horizontal sync frequency, 04h=Vertical sync frequency"

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
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"

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
      description: Value set for eco mode. Full table in appendix - UNRESOLVED: appendix not in refined source.

- id: lan_projector_name_set
  label: LAN Projector Name Set
  kind: action
  command: "03h B1h 00h 00h 12h 2Ch <DATA01> <DATA02> <DATA03> <DATA04> <DATA05> <DATA06> <DATA07> <DATA08> <DATA09> <DATA10> <DATA11> <DATA12> <DATA13> <DATA14> <DATA15> <DATA16> 00h <CKS>"
  params:
    - name: projector_name
      type: string
      description: Projector name, up to 16 bytes (DATA01-DATA16)

- id: pip_picture_by_picture_set
  label: PIP/Picture by Picture Set
  kind: action
  command: "03h B1h 00h 00h 03h C5h <DATA01> <DATA02> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Target: 00h=MODE, 01h=START POSITION, 02h=SUB INPUT/SUB INPUT 1, 09h=SUB INPUT 2, 0Ah=SUB INPUT 3"
    - name: DATA02
      type: integer
      description: "Setting value (varies by DATA01). Sub-input values in appendix - UNRESOLVED."

- id: edge_blending_mode_set
  label: Edge Blending Mode Set
  kind: action
  command: "03h B1h 00h 00h 03h DFh 00h <DATA01> <CKS>"
  params:
    - name: DATA01
      type: integer
      description: "Setting value: 00h=OFF, 01h=ON"

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
      description: Input terminal value. Full table in appendix - UNRESOLVED.
    - name: DATA02
      type: integer
      description: "Setting value: 00h=terminal in DATA01, 01h=BNC, 02h=COMPUTER"
```

## Feedbacks
```yaml
# Each successful command returns a response frame; A2h/A3h prefix bytes carry
# <ERR1> <ERR2> on failure. Ack frames (22h/23h) carry echo/result data.

- id: power_state
  type: enum
  values: [standby, power_on]
  # from 078-2 RUNNING STATUS REQUEST DATA03: 00h=Standby, 01h=Power on

- id: cooling_process
  type: enum
  values: [not_executed, during_execution]
  # from 078-2 DATA04

- id: operation_status
  type: enum
  values: [standby_sleep, power_on, cooling, standby_error, standby_power_saving, network_standby]
  # from 078-2 DATA06: 00h/04h/05h/06h/0Fh/10h

- id: picture_mute
  type: enum
  values: [off, on]
  # from 078-4 DATA01

- id: sound_mute
  type: enum
  values: [off, on]
  # from 078-4 DATA02

- id: onscreen_mute
  type: enum
  values: [off, on]
  # from 078-4 DATA03

- id: cover_status
  type: enum
  values: [normal_opened, cover_closed]
  # from 078-6 DATA01

- id: error_code
  type: composite
  description: "<ERR1> <ERR2> byte pair; see error code list (e.g. 00h/00h=unrecognized, 02h/0Dh=power off, 02h/0Eh=execution failed). Full list in section 2.4."
```

## Variables
```yaml
- id: brightness
  type: integer
  # 030-1 PICTURE ADJUST, DATA01=00h; absolute/relative
- id: contrast
  type: integer
  # 030-1 DATA01=01h
- id: color
  type: integer
  # 030-1 DATA01=02h
- id: hue
  type: integer
  # 030-1 DATA01=03h
- id: sharpness
  type: integer
  # 030-1 DATA01=04h
- id: volume
  type: integer
  # 030-2 VOLUME ADJUST
- id: lamp_light_adjust
  type: integer
  # 030-15 OTHER ADJUST DATA01=96h
- id: lamp_usage_time_seconds
  type: integer
  # from 037 INFORMATION REQUEST DATA83-86 and 037-4 LAMP INFO REQUEST 3
- id: filter_usage_time_seconds
  type: integer
  # from 037-3 FILTER USAGE INFO REQUEST DATA01-04
- id: lamp_remaining_life_percent
  type: integer
  # from 037-4 (content 04h); negative if replacement deadline exceeded
- id: projector_name
  type: string
  # 098-45 LAN PROJECTOR NAME SET / 097-45 REQUEST; up to 16 bytes
```

## Events
```yaml
# UNRESOLVED: source describes no unsolicited notifications. All responses are
# replies to issued commands.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for:
  - power_off   # source: while power-off (incl. cooling) in progress, no other command accepted
  - power_on    # source: while power-on in progress, no other command accepted
interlocks: []
# Note: source notes interlock switch status exposed via 009 ERROR STATUS
# REQUEST DATA09 Bit1 ("interlock switch is open") but no operator-facing
# interlock procedure documented.
```

## Notes
- Command frame: `<cmd> <ID1> <ID2> <LEN> <DATA...> <CKS>`. Response prefixes: 20h/22h/23h = success ack (with/without data), A0h/A2h/A3h = error (carry ERR1/ERR2). <ID1> = control ID set on projector; <ID2> = model code.
- Checksum: low byte of sum of all preceding bytes. Example given: `20h 81h 01h 60h 01h 00h` sums to 103h → CKS = 03h.
- No login/auth procedure described anywhere → auth.type inferred none.
- While power on/off in progress, projector rejects all other commands.
- Lamp usage time granularity: 1-second units, updated at 1-minute intervals.
<!-- UNRESOLVED: input-terminal value table, eco-mode value table, sub-input setting value table, and base-model-type codes all referenced to an appendix ("Supplementary Information by Command") not present in the refined source. flow_control mode not specified. Single active baud rate among the five supported not fixed. firmware version compatibility not stated. -->
````

Spec emitted above. 53 commands, all hex payloads verbatim, checksum rule noted. Gaps marked UNRESOLVED: appendix value tables (input terminal, eco mode, sub-input, base-model type), flow_control, active baud, firmware.

## Provenance

```yaml
source_domains:
  - sharpdisplays.eu
source_urls:
  - https://www.sharpdisplays.eu/p/download/cp/Products/Projectors/Shared/CommandLists/NEC-ExternalControlManual-english.pdf
retrieved_at: 2026-06-17T06:22:18.729Z
last_checked_at: 2026-06-18T08:56:40.729Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-18T08:56:40.729Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions matched verbatim against source command reference; transport parameters verified; complete bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "input-terminal DATA01 value table is in an appendix not included in the refined source (\"see the Appendix Supplementary Information by Command\"). Sub-input setting values for PIP/PbP similarly unresolved. Eco-mode setting values unresolved."
- "device's actual configured rate not fixed in source"
- "appendix not in refined source."
- "source describes no unsolicited notifications. All responses are"
- "source documents no explicit multi-step sequences."
- "input-terminal value table, eco-mode value table, sub-input setting value table, and base-model-type codes all referenced to an appendix (\"Supplementary Information by Command\") not present in the refined source. flow_control mode not specified. Single active baud rate among the five supported not fixed. firmware version compatibility not stated."
- "appendix value tables (input terminal, eco mode, sub-input, base-model type), flow_control, active baud, firmware."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
