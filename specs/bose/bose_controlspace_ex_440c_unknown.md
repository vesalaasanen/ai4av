---
spec_id: admin/bose-controlspace-ex-440c
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose ControlSpace EX 440C Control Spec"
manufacturer: Bose
model_family: "ControlSpace EX 440C"
aliases: []
compatible_with:
  manufacturers:
    - Bose
  models:
    - "ControlSpace EX 440C"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
  - assets.bosecreative.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-05-14T21:43:15.594Z
generated_at: 2026-05-14T21:43:15.594Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T21:43:15.594Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions verified against source commands; transport parameters (port 10055, 115200 baud, 8N1) explicitly confirmed in protocol documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Bose ControlSpace EX 440C Control Spec

## Summary
Bose ControlSpace EX 440C is a digital signal processor supporting RS-232 serial and TCP/IP Serial-over-Ethernet control. Default serial: 115,200 baud, 8 data bits, no parity, 1 stop bit. IP control uses port 10055. All commands are ASCII, terminated with `<CR>`.

<!-- UNRESOLVED: MSA12X endpoint UDP commands not applicable to EX-440C base unit -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 10055  # Serial-over-Ethernet third-party control port
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable       # inferred: source selector group commands present
- queryable      # inferred: query commands (GV, GG, GL, GM, etc.) present
- levelable      # inferred: volume control commands (SV, SI, SG) present
```

## Actions
```yaml
- id: set_parameter_set
  label: Set Parameter Set
  kind: action
  params:
    - name: n
      type: integer
      description: Parameter set number, 1-255 (hex 1-FF)

- id: set_group_master_level
  label: Set Group Master Level
  kind: action
  params:
    - name: n
      type: integer
      description: Group number, 1-64
    - name: l
      type: integer
      description: Level 0-144 (0h=-60dB to 90h=+12dB in 0.5dB steps)

- id: set_group_volume_increment_decrement
  label: Set Group Volume Increment/Decrement
  kind: action
  params:
    - name: n
      type: integer
      description: Group number, 1-64
    - name: d
      type: integer
      description: Direction, 1=up, 0=down
    - name: x
      type: integer
      description: Number of 0.5dB steps in hex (e.g. A=5dB)

- id: set_group_mute
  label: Set Group Mute
  kind: action
  params:
    - name: n
      type: integer
      description: Group number, 1-64
    - name: m
      type: string
      description: State, M=Mute, U=Unmute, T=Toggle

- id: set_room_combine
  label: Set Room Combine
  kind: action
  params:
    - name: n
      type: integer
      description: Room Combine Group number, 1-6
    - name: a
      type: integer
      description: Room number or name, 1-6
    - name: b
      type: integer
      description: Room number or name, 1-6
    - name: s
      type: string
      description: State, J=Join, S=Split

- id: set_parameter_set_list_selection
  label: Set Parameter Set List Selection
  kind: action
  params:
    - name: list_name
      type: string
      description: Parameter Set List name
    - name: index
      type: integer
      description: Index of Parameter Set in the list

- id: set_slot_volume
  label: Set Input/Output Volume
  kind: action
  params:
    - name: s
      type: integer
      description: Slot number (see device architecture table)
    - name: c
      type: integer
      description: Channel number
    - name: l
      type: integer
      description: Level, 0-144 (0h=-60dB to 90h=+12dB in 0.5dB steps)

- id: set_slot_volume_increment_decrement
  label: Set Volume Increment/Decrement
  kind: action
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number
    - name: d
      type: integer
      description: Direction, 1=up, 0=down
    - name: x
      type: integer
      description: Number of 0.5dB steps in hex

- id: set_slot_mute
  label: Set Input/Output Mute
  kind: action
  params:
    - name: s
      type: integer
      description: Slot number
    - name: c
      type: integer
      description: Channel number
    - name: m
      type: string
      description: State, M=Mute, U=Unmute, T=Toggle

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: address
      type: string
      description: IP address xxx.xxx.xxx.xxx

- id: set_network_parameters
  label: Set Network Parameters
  kind: action
  params:
    - name: p
      type: string
      description: Parameter, T=Type(DHCP/Static), M=Subnet Mask, G=Default Gateway
    - name: v
      type: string
      description: Value, D=DHCP, S=Static, or xxx.xxx.xxx.xxx address

- id: reset_network_defaults
  label: Reset Network Parameters to Defaults
  kind: action
  params: []

- id: reset_device
  label: Reset/Reboot Device
  kind: action
  params: []

- id: set_module_parameter
  label: Set Module Parameter
  kind: action
  params:
    - name: module_name
      type: string
      description: Unique module label in quotes
    - name: index1
      type: integer
      description: Primary index
    - name: index2
      type: integer
      description: Secondary index (optional, for modules requiring 2 indices)
    - name: value
      type: string
      description: Parameter value

- id: invoke_module_action
  label: Invoke Module Action
  kind: action
  params:
    - name: module_name
      type: string
      description: Module name
    - name: index1
      type: integer
      description: Primary index
    - name: parameter
      type: string
      description: Action parameter
```

## Feedbacks
```yaml
- id: last_parameter_set
  type: integer
  values: [0-255]
  description: Last invoked Parameter Set number (0 = none recalled)

- id: group_level
  type: string
  values: []
  description: Response GG n,l - Group number and level

- id: group_mute_state
  type: string
  values: [M, U]
  description: Response GN n,M or GN n,U - Mute or Unmute state

- id: room_combine_state
  type: string
  values: [J, S]
  description: Response GRC n,a,b,s - Join or Split state

- id: slot_level
  type: string
  values: []
  description: Response GV s,c,l - slot, channel, level

- id: slot_mute_state
  type: string
  values: [M, U]
  description: Response GM s,c,M or GM s,c,U

- id: signal_levels
  type: array
  values: []
  description: Response GL s [levels] - array of channel levels in hex

- id: ip_address
  type: string
  values: []
  description: Response IP xxx.xxx.xxx.xxx

- id: network_parameter
  type: string
  values: []
  description: Response NP p,v - network parameter and value

- id: module_parameter
  type: string
  values: []
  description: Response GA "Module">idx>idx=Value

- id: module_ack
  type: string
  values: ["ACK", "NAK nn"]
  description: ACK (0x06) on success, NAK nn (0x15) with 2-digit error code on failure

- id: command_ok
  type: string
  values: ["ACK"]
  description: ASCII ACK response for MSA12X/Endpoint commands
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications described in source but event model not fully specified
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
EX-440C supports up to 32 simultaneous Serial-over-Ethernet connections. Physical RS-232 and all SoIP connections receive broadcast serial output and monitor serial input; query responses go only to the originating connection. Port 10055 is shared with ControlSpace Designer software — control connection closes when Designer goes online. Third-party control must be re-established after design load. Reset command loses all current settings and reverts to flashed defaults.

Module names must be unique within a device — duplicate names cause SA/GA/MA commands to fail.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: PSTN/VoIP module commands are EX-specific but may not be present on all EX-440C configs -->
<!-- UNRESOLVED: AEC module ERLE/ERL feedback parameters not fully enumerated in source -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
  - assets.bosecreative.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-05-14T21:43:15.594Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T21:43:15.594Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions verified against source commands; transport parameters (port 10055, 115200 baud, 8N1) explicitly confirmed in protocol documentation."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
