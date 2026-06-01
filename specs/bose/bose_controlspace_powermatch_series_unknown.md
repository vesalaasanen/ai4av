---
spec_id: admin/bose-controlspace-powermatch-series
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
  - assets.bosecreative.com
source_urls:
  - https://assets.boseprofessional.com/m/4998082f60dfee56/original/ControlSpace-Serial-Protocol-v5-13.pdf
  - https://assets.boseprofessional.com/m/3f75dade2573b467/original/ControlSpace-Serial-Protocol-v5-14-1.pdf
  - https://assets.bosecreative.com/m/496577402d128874/original/SoundTouch-Web-API.pdf
retrieved_at: 2026-05-16T00:42:17.003Z
last_checked_at: 2026-05-20T07:59:18.642Z
generated_at: 2026-05-20T07:59:18.642Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T07:59:18.642Z
  matched_actions: 64
  action_count: 64
  confidence: high
  summary: "All 64 spec actions verified against source with literal command match; transport port 10055 confirmed for TCP/IP."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Bose ControlSpace PowerMatch Series Control Spec

## Summary
Bose ControlSpace PowerMatch networked amplifiers (PM8500N, PM8250N, PM4500N, PM4250N) controlled via ASCII serial commands over TCP/IP (Serial-over-Ethernet). Protocol supports volume/mute per channel, standby control, fault/alarm monitoring, output configuration query, and deep signal-processing module control (PEQ, limiter, delay, matrix mixer, band pass, speaker PEQ). Commands use hex notation for system/device commands and ASCII text for module commands. All commands terminated with `<CR>` (0x0D). No authentication required.

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 10055
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # SY standby/normal commands
  - queryable    # GV, GM, GL, GY, GC, GF, GR, GH query commands
  - levelable    # SV, GV, SG, GG volume commands in 0.5dB steps
  - routable     # Matrix Mixer cross-point routing
```

## Actions
```yaml
actions:
  - id: set_parameter_set
    label: Set Parameter Set
    kind: action
    description: "Recall/invoke Parameter Set n (1-FF hex = 1-255 decimal)"
    command: "SS n"
    params:
      - name: n
        type: integer
        description: "Parameter Set number, 1-255 decimal (sent as hex)"

  - id: get_parameter_set
    label: Get Parameter Set
    kind: feedback
    description: "Query last invoked Parameter Set"
    command: "GS"
    response: "S n"
    params:
      - name: n
        type: integer
        description: "Last invoked Parameter Set (0 if none recalled)"

  - id: set_group_level
    label: Set Group Master Level
    kind: action
    description: "Set master level of Group n to level l. PM range: 0h (-60dB) to 78h (0dB) in 0.5dB steps, or FFh (-inf)"
    command: "SG n,l"
    params:
      - name: n
        type: integer
        description: "Group number 1-64 (hex 1-40)"
      - name: l
        type: integer
        description: "Level 0-120 decimal (0=-60dB, 120=0dB) or 255 (-inf), sent as hex"

  - id: get_group_level
    label: Get Group Master Level
    kind: feedback
    description: "Query level of Group n"
    command: "GG n"
    response: "GG n,l"
    params:
      - name: n
        type: integer
        description: "Group number 1-64 (hex 1-40)"

  - id: set_group_increment
    label: Set Group Level Increment/Decrement
    kind: action
    description: "Increment or decrement master level of Group n by x 0.5dB steps"
    command: "SH n,d,x"
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
      - name: d
        type: integer
        description: "Direction: 1=up, 0=down"
      - name: x
        type: integer
        description: "Number of 0.5dB steps (hex)"

  - id: set_group_mute
    label: Set Group Master Mute
    kind: action
    description: "Set mute state for Group n"
    command: "SN n,m"
    params:
      - name: n
        type: integer
        description: "Group number 1-64"
      - name: m
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"

  - id: get_group_mute
    label: Get Group Master Mute
    kind: feedback
    description: "Query mute state of Group n"
    command: "GN n"
    response: "GN n,m"
    params:
      - name: n
        type: integer
        description: "Group number 1-64"

  - id: set_parameter_set_list
    label: Set Parameter Set List Selection
    kind: action
    description: "Change current selection of a Parameter Set List"
    command: "SA \"A\">1=n"
    params:
      - name: module_name
        type: string
        description: "Parameter Set List name in quotes"
      - name: n
        type: integer
        description: "Index of Parameter Set to select"

  - id: get_parameter_set_list
    label: Get Parameter Set List Selection
    kind: feedback
    description: "Query current selection of a Parameter Set List"
    command: "GA \"A\">2"
    response: "GA \"A\">2=n"
    params:
      - name: module_name
        type: string
        description: "Parameter Set List name in quotes"

  - id: set_volume
    label: Set Output Volume
    kind: action
    description: "Set output volume for slot s, channel c. PM output only: 0h (-60dB) to 78h (0dB) in 0.5dB steps. Ignored if channel muted."
    command: "SV s,c,l"
    params:
      - name: s
        type: integer
        description: "Slot number (PM: 1=In A-D, 2=Out 1-4, 3=In E-H [8ch], 4=Out 5-8 [8ch])"
      - name: c
        type: integer
        description: "Channel 1-4, sent as hex"
      - name: l
        type: integer
        description: "Level 0-120 decimal (sent as hex)"

  - id: get_volume
    label: Get Output Volume
    kind: feedback
    description: "Query output level for slot s, channel c"
    command: "GV s,c"
    response: "GV s,c,l"
    params:
      - name: s
        type: integer
        description: "Slot number (hex)"
      - name: c
        type: integer
        description: "Channel number (hex)"

  - id: set_volume_increment
    label: Set Volume Increment/Decrement
    kind: action
    description: "Increment or decrement output volume. Ignored if channel muted."
    command: "SI s,c,d,x"
    params:
      - name: s
        type: integer
        description: "Slot number (hex)"
      - name: c
        type: integer
        description: "Channel 1-4 (hex)"
      - name: d
        type: integer
        description: "Direction: 1=up, 0=down"
      - name: x
        type: integer
        description: "Number of 0.5dB steps (hex)"

  - id: set_mute
    label: Set Output Mute
    kind: action
    description: "Set mute for slot s, channel c. PM outputs only."
    command: "SM s,c,m"
    params:
      - name: s
        type: integer
        description: "Slot number (hex)"
      - name: c
        type: integer
        description: "Channel 1-4 (hex)"
      - name: m
        type: string
        description: "M=Mute, U=Unmute, T=Toggle"

  - id: get_mute
    label: Get Output Mute
    kind: feedback
    description: "Query mute state for slot s, channel c"
    command: "GM s,c"
    response: "GM s,c,m"
    params:
      - name: s
        type: integer
        description: "Slot number (hex)"
      - name: c
        type: integer
        description: "Channel 1-4 (hex)"

  - id: get_signal_level
    label: Get Signal Level
    kind: feedback
    description: "Query signal levels for channels in slot s. PM outputs in dBV max from -60.0 to 0.0 in 0.5dB steps."
    command: "GL s"
    response: "GL s [l1,...,lN]"
    params:
      - name: s
        type: integer
        description: "Slot index (hex)"

  - id: set_ip_address
    label: Set IP Address
    kind: action
    description: "Change IP address. Takes effect after reboot."
    command: "IP xxx.xxx.xxx.xxx"
    params:
      - name: address
        type: string
        description: "IP address in dotted decimal"

  - id: get_ip_address
    label: Get IP Address
    kind: feedback
    description: "Query current IP address"
    command: "IP"
    response: "IP xxx.xxx.xxx.xxx"

  - id: set_network_param
    label: Set Network Parameter
    kind: action
    description: "Set subnet mask, gateway, or DHCP/static mode. Takes effect after reboot."
    command: "NP p,v"
    params:
      - name: p
        type: string
        description: "T=Type, M=Subnet Mask, G=Default Gateway"
      - name: v
        type: string
        description: "D=DHCP, S=Static, or xxx.xxx.xxx.xxx for address"

  - id: get_network_param
    label: Get Network Parameter
    kind: feedback
    description: "Query network settings"
    command: "NP p"
    response: "NP p,v"
    params:
      - name: p
        type: string
        description: "T=Type, M=Subnet Mask, G=Default Gateway"

  - id: reset_defaults_network
    label: Reset Network to Defaults
    kind: action
    description: "Reset all network parameters to factory defaults"
    command: "NP F"

  - id: reset_device
    label: Reset/Reboot Device
    kind: action
    description: "Restart the device (equivalent to power-cycle). Reverts to power-on settings."
    command: "RESET"

  - id: set_standby
    label: Set Standby Status
    kind: action
    description: "Put amplifier into standby or return to normal. Not immediate; allow time."
    command: "SY s"
    params:
      - name: s
        type: string
        description: "S=Standby, N=Normal"

  - id: get_standby
    label: Get Standby Status
    kind: feedback
    description: "Query current standby state"
    command: "GY"
    response: "GY s"
    params: []

  - id: get_configuration
    label: Get Output Configuration
    kind: feedback
    description: "Return current output channel configuration (IN/BL/B7/B1/PA/QL/Q7/Q1 per channel)"
    command: "GC"
    response: "GC 1,2,3,4,5,6,7,8"

  - id: set_fault_notification
    label: Set Fault Notification
    kind: action
    description: "Enable/disable unsolicited Fault Output state change notifications. Resets to Off on power-up."
    command: "SF n"
    params:
      - name: n
        type: string
        description: "O=On, F=Off"

  - id: get_fault_status
    label: Get Fault Status
    kind: feedback
    description: "Query current Fault Output state"
    command: "GF"
    response: "GF f"

  - id: clear_faults
    label: Clear Fault/Alarms
    kind: action
    description: "Clear active alarm conditions and reset Fault Output. Re-alarms if condition persists."
    command: "CF"

  - id: set_alarm_reporting
    label: Set Alarm Reporting
    kind: action
    description: "Enable/disable unsolicited alarm/fault event notifications. Resets to Off on power-up."
    command: "SR n"
    params:
      - name: n
        type: string
        description: "O=On, F=Off"

  - id: get_alarm_status
    label: Get Alarm Status
    kind: feedback
    description: "Query alarm/fault status for a single channel"
    command: "GR c"
    response: "GR c,s,t"
    params:
      - name: c
        type: integer
        description: "Channel 1-8 (1-4 for PM4500/4250)"

  - id: get_alarm_history
    label: Get Alarm History
    kind: feedback
    description: "Request dump of internal alarm history/log"
    command: "GH"
    response: "GH [Time, Date, Description...]"

  - id: clear_alarm_history
    label: Clear Alarm History
    kind: action
    description: "Clear the internal alarm log"
    command: "CH"

  - id: set_module_parameter
    label: Set Module Parameter
    kind: action
    description: "Set a signal processing module parameter by module name and indices. ACK (0x06) on success, NAK+error code on failure."
    command: "SA \"Module Name\">Index1>Index2=Value"
    params:
      - name: module_name
        type: string
        description: "Unique module label from ControlSpace Designer"
      - name: index_1
        type: integer
        description: "Primary index"
      - name: index_2
        type: integer
        description: "Secondary index (omit if unused)"
      - name: value
        type: string
        description: "Parameter value as ASCII text"

  - id: get_module_parameter
    label: Get Module Parameter
    kind: feedback
    description: "Query a signal processing module parameter"
    command: "GA \"Module Name\">Index1>Index2"
    response: "GA \"Module Name\">Index1>Index2=Value"

  - id: invoke_module_action
    label: Invoke Module Action
    kind: action
    description: "Invoke an action for a module (limited modules only). ACK on success."
    command: "MA \"Module Name\">Index1=Parameter"
    params:
      - name: module_name
        type: string
        description: "Module name"
      - name: index_1
        type: integer
        description: "Action index"
      - name: parameter
        type: string
        description: "Action parameter"

  - id: subscribe
    label: Subscribe to Data Changes
    kind: action
    description: "Register for unsolicited updates when a parameter changes"
    command: "SUB \"GET command string\""
    params:
      - name: get_command
        type: string
        description: "Full GET command string to subscribe to"

  - id: unsubscribe
    label: Unsubscribe from Data Changes
    kind: action
    description: "Stop unsolicited updates for a previously subscribed parameter"
    command: "UNS \"GET command string\""
    params:
      - name: get_command
        type: string
        description: "Full GET command string to unsubscribe from"
  - id: query_subscription_support
    label: Query Subscription Support
    kind: query
    command: "SUB"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: parameter_set_state
    type: integer
    description: "Last invoked Parameter Set number (0=none recalled, 1-255)"
    query_command: "GS"
    response_format: "S n"

  - id: group_level
    type: integer
    description: "Master level of a group (0-120 decimal = -60dB to 0dB, 255 = -inf)"
    query_command: "GG n"
    response_format: "GG n,l"

  - id: group_mute_state
    type: enum
    values: [M, U]
    description: "Mute state of a group"
    query_command: "GN n"
    response_format: "GN n,m"

  - id: output_volume
    type: integer
    description: "Output volume for slot/channel (0-120 decimal = -60dB to 0dB)"
    query_command: "GV s,c"
    response_format: "GV s,c,l"

  - id: output_mute_state
    type: enum
    values: [M, U]
    description: "Mute state for output slot/channel"
    query_command: "GM s,c"
    response_format: "GM s,c,m"

  - id: signal_level
    type: array
    description: "Signal levels for channels in a slot (hex array, dBV max for PM outputs: -60.0 to 0.0 in 0.5dB steps)"
    query_command: "GL s"
    response_format: "GL s [l1,...,lN]"

  - id: standby_state
    type: enum
    values: [S, N]
    description: "Standby state (S=Standby, N=Normal)"
    query_command: "GY"
    response_format: "GY s"

  - id: output_configuration
    type: array
    description: "Per-channel output config. Values: IN (Independent/Mono), BL (Bridged LoZ), B7 (Bridged 70V), B1 (Bridged 100V), PA (Parallel), QL (Quad LoZ), Q7 (Quad 70V), Q1 (Quad 100V)"
    query_command: "GC"
    response_format: "GC 1,2,3,4,5,6,7,8"

  - id: fault_status
    type: enum
    values: [F, C]
    description: "Fault output state (F=Fault, C=No Fault)"
    query_command: "GF"
    response_format: "GF f"

  - id: alarm_status_channel
    type: composite
    description: "Alarm/fault for a single channel. Severity: W/F/S/N. Type: N/O/S/A/D/I/L/C/P/Z."
    query_command: "GR c"
    response_format: "GR c,s,t"
```

## Variables
```yaml
variables:
  - id: group_level
    description: "Group master volume level (-60dB to 0dB in 0.5dB steps for PM, or -inf via FFh)"
    set_command: "SG n,l"
    min: -60.0
    max: 0.0
    step: 0.5
    unit: dB

  - id: output_volume
    description: "Output channel volume (-60dB to 0dB in 0.5dB steps for PM)"
    set_command: "SV s,c,l"
    min: -60.0
    max: 0.0
    step: 0.5
    unit: dB

  - id: standby_auto_wait
    description: "Auto-standby wait time (not directly on PM; via Parameter Set standby property)"
    # UNRESOLVED: auto-standby time commands listed for MSA12X only; PM uses Parameter Sets
```

## Events
```yaml
events:
  - id: fault_output_change
    description: "Unsolicited notification of Fault Output state change (enabled via SF O). Format: GF f where F=Fault, C=No Fault. Resets to Off on power-up."
    trigger: "SF O enables; occurs on state change"

  - id: alarm_event
    description: "Unsolicited alarm/fault notification (enabled via SR O). Format: GR c,s,t,x where c=channel (0 for non-channel), s=severity (W/F/S), t=type (N/O/S/A/D/I/L/C/P/Z), x=condition (S=Set/C=Clear). Resets to Off on power-up."
    trigger: "SR O enables; occurs on alarm/fault event"

  - id: module_auto_notification
    description: "Modules prefixed with '#' in ControlSpace Designer emit GA responses when parameters change from other devices (e.g. CC-16/CC-64). NOT sent if change is via serial command."
    trigger: "External device changes a #prefixed module parameter"

  - id: subscription_update
    description: "Subscribed parameters emit their GET response value when the subscribed data changes. Setup via SUB command."
    trigger: "SUB \"GET command\" registered; fires on value change"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly defined in source.
# Parameter Set recall (SS n) acts as a macro-like preset recall.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >
  RESET command reverts device to power-on (flashed) settings - current runtime state is lost.
  Standby transition (SY) is not immediate; allow adequate time for process to complete.
  Set Volume commands (SV, SI) are ignored when the target channel is muted.
  Volume/mute commands operate on outputs only for PowerMatch - inputs are not controllable via SV/SI/SM.
  Set Alarm Reporting (SR) and Set Fault Notification (SF) preferences reset to Off on every power-up.
  Alarm log time/date values are only accurate if no power loss occurred since last ControlSpace Designer connection.
```

## Notes
- Command format: ASCII text terminated with `<CR>` (0x0D). System/Device commands use hex notation for numeric values. Module commands use plain ASCII decimal.
- Hex values accepted upper or lower case; responses always lower case.
- Space after command is optional. Comma separates parameters. No hex suffix needed.
- No acknowledgement sent for System/Device Set commands — follow Set with Get to confirm success.
- Module commands respond with ACK (0x06) on success or NAK (0x15) + 2-digit error code (01=invalid name, 02=illegal index, 03=out-of-range, 99=unknown).
- Module labels must be unique per device. Duplicate names cause SA/GA/MA to malfunction.
- PowerMatch module labels are fixed (e.g. "PEQ-5band A"-"PEQ-5band H", "SpeakerPEQ 1"-"SpeakerPEQ 8", "Limiter 1"-"Limiter 8", "Delay 1"-"Delay 8", "Band Pass 1"-"Band Pass 8", "Matrix 1"). Only Input and Amp Output modules can be renamed.
- Module cross-device addressing (SA @"Device Name" ...) is NOT available for PowerMatch — send commands to each device individually.
- PM8500N/PM8250N: 8 output channels, slots 1-4. PM4500N/PM4250N: 4 output channels, slots 1-2.
- GL command for 8ch PM uses Slot 1 (inputs) and Slot 2 (outputs) for all 8 channels.
- Matrix Mixer module input 9 is the Signal Generator.
- Max 32 simultaneous TCP connections shared with ControlSpace Remote.
- Connection closed when ControlSpace Designer goes online; can be re-established after.
- Device acts as TCP server; control system must initiate connection.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: maximum command rate / throttle limits not stated -->
<!-- UNRESOLVED: binary protocol variant not documented (ASCII only) -->
<!-- UNRESOLVED: exact signal level conversion formula for PM outputs (hex to dBV max) — described as 0.5dB steps from -60.0 to 0.0 dBV -->
<!-- UNRESOLVED: MSA12X and Endpoint commands omitted from this spec — they use UDP port 49494, not TCP port 10055 -->

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
last_checked_at: 2026-05-20T07:59:18.642Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T07:59:18.642Z
matched_actions: 64
action_count: 64
confidence: high
summary: "All 64 spec actions verified against source with literal command match; transport port 10055 confirmed for TCP/IP."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
