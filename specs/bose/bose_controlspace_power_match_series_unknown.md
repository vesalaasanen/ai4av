---
spec_id: admin/bose-controlspace-power-match-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Bose ControlSpace PowerMatch Series Control Spec"
manufacturer: Bose
model_family: PM8500N
aliases: []
compatible_with:
  manufacturers:
    - Bose
  models:
    - PM8500N
    - PM8250N
    - PM4500N
    - PM4250N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/48b4f11e8a4922b9/original/ug_csp_control_serial.pdf
  - https://assets.boseprofessional.com/m/5967be9a1795e9b9/original/tds_fse4_en.pdf
retrieved_at: 2026-05-15T00:55:44.088Z
last_checked_at: 2026-10-07T22:02:30.478Z
generated_at: 2026-10-07T22:02:30.478Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "SUB (bare device-subscription-support query)"
  - "physical RS-232 serial config (baud rate) for PowerMatch not explicitly stated — doc only lists ESP and EX serial settings"
  - "no explicit multi-step sequences described in source"
  - "RS-232 baud rate for PowerMatch not explicitly stated — doc only lists ESP-00 (38400) and ESP-880/1240/4120/1600/EX (115200)"
  - "firmware version compatibility range not stated"
  - "maximum concurrent TCP connections per PM model — doc says 32 for PM8500N/8250N/4500N/4250N but shared with ControlSpace Remote"
verification:
  verdict: verified
  checked_at: 2026-10-07T22:02:30.478Z
  matched_actions: 51
  action_count: 51
  confidence: medium
  summary: "All 51 action units map to PowerMatch-applicable source commands with correct shapes and port 10055 is stated; MSA12X/endpoint commands excluded; only bare SUB is unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Bose ControlSpace PowerMatch Series Control Spec

## Summary
Bose ControlSpace PowerMatch networked amplifiers controlled via ASCII serial protocol over TCP/IP (port 10055). Supports output volume/mute per slot/channel, standby control, fault/alarm monitoring, signal level metering, parameter set recall, group volume/mute, module-level DSP parameter control (input EQ, speaker EQ, limiters, delays, matrix mixer, signal generator, band pass). Command syntax is identical to the RS-232 serial protocol but transported over Ethernet.

<!-- UNRESOLVED: physical RS-232 serial config (baud rate) for PowerMatch not explicitly stated — doc only lists ESP and EX serial settings -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 10055
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable    # SY/GY standby/normal control
  - queryable    # GV, GM, GL, GY, GC, GF, GR, GH queries
  - levelable    # SV, GV, SI volume; SG/GG group level
  - routable     # Matrix Mixer cross-point control
```

## Actions
```yaml
actions:
  - id: set_parameter_set
    label: Recall Parameter Set
    kind: action
    params:
      - name: n
        type: integer
        description: "Parameter Set number 1-255 (hex 1-FF)"
    command: "SS {n}"
    description: "Recall/invoke Parameter Set n. No acknowledgement sent; follow with GS to confirm."

  - id: get_parameter_set
    label: Get Last Parameter Set
    kind: query
    params: []
    command: "GS"
    response: "S {n}"
    description: "Query last invoked Parameter Set. Response S n where n=0 if none recalled."

  - id: set_group_level
    label: Set Group Master Level
    kind: action
    params:
      - name: n
        type: integer
        description: "Group number 1-64 (hex 1-40)"
      - name: l
        type: integer
        description: "Level 0-120 decimal (0dB to -60dB in 0.5dB steps) or 255 for -inf"
    command: "SG {n},{l}"
    description: "Set master level of Group n. PM max level is 0dB (hex 78, dec 120)."

  - id: get_group_level
    label: Get Group Master Level
    kind: query
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
    command: "GG {n}"
    response: "GG {n},{l}"

  - id: set_group_increment
    label: Set Group Level Increment/Decrement
    kind: action
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
      - name: d
        type: integer
        description: "Direction 1=up 0=down"
      - name: x
        type: integer
        description: "Number of 0.5dB steps (hex)"
    command: "SH {n},{d},{x}"

  - id: set_group_mute
    label: Set Group Mute
    kind: action
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
      - name: m
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"
    command: "SN {n},{m}"

  - id: get_group_mute
    label: Get Group Mute
    kind: query
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
    command: "GN {n}"
    response: "GN {n},{m}"

  - id: set_volume
    label: Set Output Volume
    kind: action
    params:
      - name: s
        type: integer
        description: "Slot number (PM8xxx: 1=InA-D,2=Out1-4,3=InE-H,4=Out5-8; PM4xxx: 1=InA-D,2=Out1-4)"
      - name: c
        type: integer
        description: "Channel 1-4"
      - name: l
        type: integer
        description: "Level hex 0(-60dB) to 78(0dB) in 0.5dB steps"
    command: "SV {s},{c},{l}"
    description: "PM only supports volume control of outputs, not inputs. Ignored if channel muted."

  - id: get_volume
    label: Get Output Volume
    kind: query
    params:
      - name: s
        type: integer
        description: "Slot number"
      - name: c
        type: integer
        description: "Channel 1-4"
    command: "GV {s},{c}"
    response: "GV {s},{c},{l}"

  - id: set_volume_increment
    label: Set Volume Increment/Decrement
    kind: action
    params:
      - name: s
        type: integer
        description: "Slot number"
      - name: c
        type: integer
        description: "Channel 1-4"
      - name: d
        type: integer
        description: "Direction 1=up 0=down"
      - name: x
        type: integer
        description: "Number of 0.5dB steps (hex)"
    command: "SI {s},{c},{d},{x}"

  - id: set_mute
    label: Set Output Mute
    kind: action
    params:
      - name: s
        type: integer
        description: "Slot number"
      - name: c
        type: integer
        description: "Channel 1-4"
      - name: m
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"
    command: "SM {s},{c},{m}"

  - id: get_mute
    label: Get Output Mute
    kind: query
    params:
      - name: s
        type: integer
        description: "Slot number"
      - name: c
        type: integer
        description: "Channel 1-4"
    command: "GM {s},{c}"
    response: "GM {s},{c},{m}"

  - id: get_signal_level
    label: Get Signal Level
    kind: query
    params:
      - name: s
        type: integer
        description: "Slot index (see GL Indices table)"
    command: "GL {s}"
    response: "GL {s} [1,...,N]"
    description: "Returns array of channel levels in hex. PM outputs in dBV max (-60 to 0 in 0.5dB steps)."

  - id: set_ip_address
    label: Set IP Address
    kind: action
    params:
      - name: addr
        type: string
        description: "IP address xxx.xxx.xxx.xxx"
    command: "IP {addr}"
    description: "Change takes effect after reboot."

  - id: get_ip_address
    label: Get IP Address
    kind: query
    params: []
    command: "IP"
    response: "IP xxx.xxx.xxx.xxx"

  - id: set_network_param
    label: Set Network Parameter
    kind: action
    params:
      - name: p
        type: string
        description: "T=Type(DHCP/Static), M=Subnet Mask, G=Default Gateway"
      - name: v
        type: string
        description: "D=DHCP, S=Static, or xxx.xxx.xxx.xxx address"
    command: "NP {p},{v}"
    description: "Changes take effect after reboot."

  - id: get_network_param
    label: Get Network Parameter
    kind: query
    params:
      - name: p
        type: string
        description: "T=Type, M=Subnet Mask, G=Default Gateway"
    command: "NP {p}"
    response: "NP {p},{v}"

  - id: reset_network_defaults
    label: Reset Network Defaults
    kind: action
    params: []
    command: "NP F"

  - id: reset_device
    label: Reset/Reboot Device
    kind: action
    params: []
    command: "RESET"
    description: "Equivalent to power-cycle. All current settings lost; reverts to power-on (flashed) settings."

  - id: set_standby
    label: Set Standby Status
    kind: action
    params:
      - name: s
        type: string
        description: "S=Standby, N=Normal"
    command: "SY {s}"
    description: "PowerMatch and PowerShare only. Not immediate; allow time for transition."

  - id: get_standby
    label: Get Standby Status
    kind: query
    params: []
    command: "GY"
    response: "GY {s}"

  - id: get_configuration
    label: Get Output Configuration
    kind: query
    params: []
    command: "GC"
    response: "GC 1,2,3,4,5,6,7,8"
    description: "Returns configured state per channel. IN=Independent(Mono), BL=Bridged(LoZ), B7=Bridged(70v), B1=Bridged(100v), PA=Parallel, QL=Quad(LoZ), Q7=Quad(70v), Q1=Quad(100v). PM4xxx returns 4 values."

  - id: set_fault_notification
    label: Set Fault Notification
    kind: action
    params:
      - name: n
        type: string
        description: "O=On, F=Off"
    command: "SF {n}"
    description: "Enable/disable unsolicited Fault Output state changes. Not retained on power down."

  - id: get_fault_status
    label: Get Fault Status
    kind: query
    params: []
    command: "GF"
    response: "GF {f}"
    description: "f=F=Fault, C=No Fault"

  - id: clear_fault_alarms
    label: Clear Fault/Alarms
    kind: action
    params: []
    command: "CF"
    response: "<ACK>"

  - id: set_alarm_reporting
    label: Set Alarm Reporting
    kind: action
    params:
      - name: n
        type: string
        description: "O=On, F=Off"
    command: "SR {n}"
    description: "Enable/disable unsolicited alarm/fault notifications. Not retained on power down."

  - id: get_alarm_status
    label: Get Alarm Status
    kind: query
    params:
      - name: c
        type: integer
        description: "Channel 1-8 (1-4 for PM4xxx), or 0 for non-channel alarms"
    command: "GR {c}"
    response: "GR {c},{s},{t}"
    description: "s=severity (W=Warning,F=Fault,S=System,N=No Alarm), t=type (N=None,O=Open,S=Short,I=I-Share Missing,Z=Other)"

  - id: get_alarm_history
    label: Get Alarm History
    kind: query
    params: []
    command: "GH"
    response: "GH [Time, Date, Description ...]"
    description: "Dump of internal alarm log."

  - id: clear_alarm_history
    label: Clear Alarm History
    kind: action
    params: []
    command: "CH"
    response: "<ACK>"

  - id: set_module_param
    label: Set Module Parameter
    kind: action
    params:
      - name: module_name
        type: string
        description: "Unique module label from ControlSpace Designer"
      - name: index1
        type: integer
        description: "Primary index"
      - name: index2
        type: integer
        description: "Secondary index (optional)"
      - name: value
        type: string
        description: "Parameter value"
    command: "SA \"{module_name}\">{index1}>{index2}={value}"
    description: "Set a signal processing module parameter. Response: ACK (0x06) or NAK nn."

  - id: get_module_param
    label: Get Module Parameter
    kind: query
    params:
      - name: module_name
        type: string
        description: "Unique module label"
      - name: index1
        type: integer
        description: "Primary index"
      - name: index2
        type: integer
        description: "Secondary index (optional)"
    command: "GA \"{module_name}\">{index1}>{index2}"
    response: "GA \"{module_name}\">{index1}>{index2}={value}"

  - id: invoke_module_action
    label: Invoke Module Action
    kind: action
    params:
      - name: module_name
        type: string
        description: "Unique module label"
      - name: index1
        type: integer
        description: "Action index"
      - name: parameter
        type: string
        description: "Action parameter"
    command: "MA \"{module_name}\">{index1}={parameter}"
    description: "Invoke an action for modules that support it. Response: ACK or NAK nn."

  - id: subscribe
    label: Subscribe to Data Change
    kind: action
    params:
      - name: get_command
        type: string
        description: "Full text of GET command to subscribe to"
    command: "SUB \"{get_command}\""
    response: "SUB \"{get_command}\",yes"

  - id: unsubscribe
    label: Unsubscribe from Data Change
    kind: action
    params:
      - name: get_command
        type: string
        description: "Full text of GET command to unsubscribe"
    command: "UNS \"{get_command}\""
    response: "UNS \"{get_command}\",yes"

  - id: set_room_combine
    label: Set Room Combine [EX Only]
    kind: action
    params:
      - name: n
        type: string
        description: "Room Combine Group number, 1-6, or name"
      - name: a
        type: string
        description: "Room number, 1-6, or room name"
      - name: b
        type: string
        description: "Room number, 1-6, or room name"
      - name: s
        type: string
        description: "J = Join and S = Split"
    command: "SRC"
    description: "Join or split two rooms within a Room Combine Group, using room numbers or names."

  - id: get_room_combine
    label: Get Room Combine [EX Only]
    kind: query
    params:
      - name: n
        type: string
        description: "Room Combine Group number, 1-6, or name"
      - name: a
        type: string
        description: "Room number, 1-6, or room name (optional when querying joined rooms)"
      - name: b
        type: string
        description: "Room number, 1-6, or room name (optional when querying joined rooms)"
    command: "GRC"
    response: "GRC n,a,b,s"
    description: "Query whether two rooms are joined, or which rooms are currently joined in a Room Combine Group. State: J = Join and S = Split."

  - id: set_parameter_set_list_selection
    label: Set Parameter Set List Selection
    kind: action
    params:
      - name: name
        type: string
        description: "Parameter Set List name"
      - name: n
        type: integer
        description: "Index of the Parameter Set in the list to select"
    command: "SA"
    description: "Change the current selection of a Parameter Set List using index 1. Selection is set to nearest possible selection: 1 if n = 0, max selection if n is greater than max selection, otherwise n."

  - id: get_parameter_set_list_selection
    label: Get Parameter Set List Selection
    kind: query
    params:
      - name: name
        type: string
        description: "Parameter Set List name"
    command: "GA"
    response: "GA \"A\" >2= n"
    description: "Query the current selection of a Parameter Set List using index 2."
```

## Feedbacks
```yaml
feedbacks:
  - id: parameter_set_state
    type: integer
    description: "Last invoked Parameter Set number (0=none recalled)"
    query_command: "GS"

  - id: group_level
    type: integer
    description: "Current level of a group"
    query_command: "GG {n}"

  - id: group_mute_state
    type: enum
    values: [M, U]
    description: "M=Muted, U=Unmuted"
    query_command: "GN {n}"

  - id: output_volume
    type: integer
    description: "Current output volume level per slot/channel"
    query_command: "GV {s},{c}"

  - id: output_mute_state
    type: enum
    values: [M, U]
    description: "M=Muted, U=Unmuted per slot/channel"
    query_command: "GM {s},{c}"

  - id: signal_level
    type: array
    description: "Array of hex levels per slot channels. PM outputs in dBV max."
    query_command: "GL {s}"

  - id: standby_state
    type: enum
    values: [S, N]
    description: "S=Standby, N=Normal"
    query_command: "GY"

  - id: output_configuration
    type: array
    description: "Per-channel config: IN/BL/B7/B1/PA/QL/Q7/Q1"
    query_command: "GC"

  - id: fault_status
    type: enum
    values: [F, C]
    description: "F=Fault, C=No Fault"
    query_command: "GF"

  - id: alarm_status
    type: composite
    description: "Per channel: severity (W/F/S/N), type (N/O/S/I/Z), condition (S/C)"
    query_command: "GR {c}"

  - id: alarm_history
    type: array
    description: "Time-stamped alarm log entries"
    query_command: "GH"

  - id: ip_address
    type: string
    description: "Current IP address"
    query_command: "IP"

  - id: module_param_value
    type: string
    description: "Current value of a module parameter"
    query_command: "GA \"{module_name}\">{index1}>{index2}"
```

## Variables
```yaml
variables:
  - id: group_level
    description: "Group master level 0-120 (0dB to -60dB, 0.5dB steps) or 255 for -inf"
    min: 0
    max: 255

  - id: output_level
    description: "Per-channel output level hex 0(-60dB) to 78(0dB) in 0.5dB steps"
    min: 0
    max: 120

  - id: standby_state
    description: "S=Standby, N=Normal"
```

## Events
```yaml
events:
  - id: fault_output_change
    description: "Unsolicited fault output state change (enabled by SF O). Format: GF {f}. Not retained on power down."

  - id: alarm_fault_event
    description: "Unsolicited alarm/fault notification (enabled by SR O). Format: GR {c},{s},{t},{x}. Transient alarms (limiting/clip) only first instance reported."

  - id: subscription_update
    description: "Unsolicited data change for subscribed GET commands (SUB). Format matches the subscribed GET response."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  RESET command causes full power-cycle - all current settings lost, reverts to
  flashed (power-on) settings. Standby transition is not immediate; allow adequate time.
  Alarm reporting and fault notification preferences are NOT retained on power down -
  they default to Off each power-up and must be re-enabled. Control connection (port 10055)
  is closed when ControlSpace Designer goes online to load a new design; re-establish after.
```

## Notes
- All commands use ASCII, terminated with `<CR>` (carriage return, 0x0D).
- System and Device commands use hexadecimal notation for numerical values. Module commands use plain ASCII text.
- System commands: no acknowledgement sent. Confirm with corresponding Get command.
- Module commands: ACK (0x06) on success, NAK nn (0x15 + 2-digit error code) on failure. Error codes: 01=Invalid Module Name, 02=Illegal Index, 03=Value Out of Range, 99=Unknown Error.
- Multiple module commands on one line separated by semicolons (0x3B).
- PM supports up to 32 simultaneous serial-over-IP connections on port 10055.
- ControlSpace Designer uses ports 10001/10002 simultaneously; third-party control does not interfere.
- PM8xxxN slot layout: Slot 1=In A-D, Slot 2=Out 1-4, Slot 3=In E-H, Slot 4=Out 5-8. PM4xxxN: Slot 1=In A-D, Slot 2=Out 1-4.
- PM only supports volume control of outputs, not inputs.
- Set Volume commands ignored if channel is muted.
- PM module labels (except Input and Amp Output) are fixed: "PEQ-5band A" through "PEQ-5band H", "Band Pass 1" through "Band Pass 8", "SpeakerPEQ 1" through "SpeakerPEQ 8", "Limiter 1" through "Limiter 8", "Delay 1" through "Delay 8", "Matrix 1", "SigGen 1".
- PowerMatch default network: DHCP, IP 169.254.0.0/16.

<!-- UNRESOLVED: RS-232 baud rate for PowerMatch not explicitly stated — doc only lists ESP-00 (38400) and ESP-880/1240/4120/1600/EX (115200) -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: maximum concurrent TCP connections per PM model — doc says 32 for PM8500N/8250N/4500N/4250N but shared with ControlSpace Remote -->

## Provenance

```yaml
source_domains:
  - assets.boseprofessional.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/48b4f11e8a4922b9/original/ug_csp_control_serial.pdf
  - https://assets.boseprofessional.com/m/5967be9a1795e9b9/original/tds_fse4_en.pdf
retrieved_at: 2026-05-15T00:55:44.088Z
last_checked_at: 2026-10-07T22:02:30.478Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:02:30.478Z
matched_actions: 51
action_count: 51
confidence: medium
summary: "All 51 action units map to PowerMatch-applicable source commands with correct shapes and port 10055 is stated; MSA12X/endpoint commands excluded; only bare SUB is unrepresented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "SUB (bare device-subscription-support query)"
- "physical RS-232 serial config (baud rate) for PowerMatch not explicitly stated — doc only lists ESP and EX serial settings"
- "no explicit multi-step sequences described in source"
- "RS-232 baud rate for PowerMatch not explicitly stated — doc only lists ESP-00 (38400) and ESP-880/1240/4120/1600/EX (115200)"
- "firmware version compatibility range not stated"
- "maximum concurrent TCP connections per PM model — doc says 32 for PM8500N/8250N/4500N/4250N but shared with ControlSpace Remote"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
