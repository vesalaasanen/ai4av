---
spec_id: admin/atlona-at-h2h-44m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-H2H-44M Control Spec"
manufacturer: Atlona
model_family: AT-H2H-44M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-H2H-44M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-H2H_V2.pdf
retrieved_at: 2026-06-12T02:02:10.017Z
last_checked_at: 2026-06-12T19:07:30.697Z
generated_at: 2026-06-12T19:07:30.697Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "ARC per-output RS-232 command name not extractable from source (page 18 image not available); only front-panel toggle described."
  - "TCP port not stated in source; Telnet default assumed but not verified by source - verify with device or driver."
  - "source documents username \"root\" / password \"Atlona\" for WebGUI; IPLogin mode is optional; ASCII IP commands appear unauthenticated by default."
  - "no continuous/parameterized variables documented as settable scalars in source."
  - "source does not document unsolicited notifications."
  - "source does not document multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:07:30.697Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions match source command tokens with correct shapes and parameters; transport verified against source. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Atlona AT-H2H-44M Control Spec

## Summary

The Atlona AT-H2H-44M is a 4x4 HDMI matrix switcher controllable via RS-232 and TCP/IP (Telnet). This spec covers the ASCII command set documented in the Atlona AT-H2H V2 user manual, including EDID management, power/lock/IR control, input-to-output routing, presets, and TCP/IP session/user configuration. Each command and feedback is terminated with a carriage return; commands are case-sensitive.

<!-- UNRESOLVED: ARC per-output RS-232 command name not extractable from source (page 18 image not available); only front-panel toggle described. -->

## Transport

```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # UNRESOLVED: TCP port not stated in source; Telnet default assumed but not verified by source - verify with device or driver.
serial:
  baud_rate: 115200  # matrix default; other supported: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  # NOTE: source also documents 9600 8-O-0 as an alternate framing seen on the front panel status.
auth:
  type: password  # UNRESOLVED: source documents username "root" / password "Atlona" for WebGUI; IPLogin mode is optional; ASCII IP commands appear unauthenticated by default.
```

## Traits

```yaml
- powerable       # inferred from PWON / PWOFF command examples
- routable        # inferred from x1AVx2 routing command examples
- queryable       # inferred from Version / Type / Status / Statusx1 / PWSTA / IPCFG / IPDHCP sta / IPLogin sta / Broadcast sta query examples
```

## Actions

```yaml
# EDID commands (RS-232 & TCP/IP; X=input 1..4 for AT-H2H-44M)
- id: edid_set_default
  label: Set EDID of input to default
  kind: action
  command: "EDIDMSetX default"
  params:
    - name: input
      type: integer
      description: Input number (1-4 for AT-H2H-44M)

- id: edid_set_saved
  label: Set EDID of input to saved memory
  kind: action
  command: "EDIDMSetX saveY"
  params:
    - name: input
      type: integer
      description: Input number (1-4 for AT-H2H-44M)
    - name: memory
      type: integer
      description: Saved EDID memory slot number

- id: edid_set_internal
  label: Set EDID of input to internal preset
  kind: action
  command: "EDIDMSetX intZ"
  params:
    - name: input
      type: integer
      description: Input number (1-4 for AT-H2H-44M)
    - name: internal_edid
      type: integer
      description: Internal EDID preset number (e.g. 6 = 1080p 3D Dolby Digital 5.1)

# Power
- id: power_on
  label: Power On
  kind: action
  command: "PWON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWOFF"
  params: []

- id: power_status
  label: Power Status
  kind: query
  command: "PWSTA"
  params: []

# System / info
- id: version
  label: Firmware Version
  kind: query
  command: "Version"
  params: []

- id: type
  label: Model Information
  kind: query
  command: "Type"
  params: []

- id: lock
  label: Lock Front Panel
  kind: action
  command: "Lock"
  params: []

- id: unlock
  label: Unlock Front Panel
  kind: action
  command: "Unlock"
  params: []

# Routing
- id: reset_all
  label: Reset all inputs to corresponding outputs
  kind: action
  command: "All#"
  params: []

- id: turn_off_output
  label: Turn off output channel
  kind: action
  command: "x1$"
  params:
    - name: output
      type: integer
      description: Output number to turn off (e.g. x3$ turns off output 3)

- id: set_input_to_all_outputs
  label: Set input to all outputs
  kind: action
  command: "x1All"
  params:
    - name: input
      type: integer
      description: Input number (e.g. x3All sets input 3 to all outputs)

- id: switch_input_to_output
  label: Switch input to output
  kind: action
  command: "x1AVx2"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number

- id: switch_input_to_outputs
  label: Switch input to multiple outputs
  kind: action
  command: "x1AVx2,x3,x4"
  params:
    - name: input
      type: integer
      description: Input number
    - name: outputs
      type: string
      description: Comma-separated output list (e.g. x3AVx1,x2)

# IR
- id: ir_on
  label: Turn on IR receiver
  kind: action
  command: "IRON"
  params: []

- id: ir_off
  label: Turn off IR receiver
  kind: action
  command: "IROFF"
  params: []

# Status queries
- id: status_output
  label: Show input connected to selected output
  kind: query
  command: "Statusx1"
  params:
    - name: output
      type: integer
      description: Output number to query (returns x7AVx1 form indicating input 7 → output 1)

- id: status
  label: Show all current input/output routing
  kind: query
  command: "Status"
  params: []

# Presets
- id: save_preset
  label: Save current settings to preset
  kind: action
  command: "Save Y"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-4)

- id: recall_preset
  label: Recall saved preset
  kind: action
  command: "Recall Y"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-4)

- id: clear_preset
  label: Erase saved preset
  kind: action
  command: "Clear Y"
  params:
    - name: preset
      type: integer
      description: Preset slot (0-4)

# Factory reset
- id: mreset
  label: Reset matrix to default settings
  kind: action
  command: "Mreset"
  params: []

# TCP/IP configuration commands
- id: ipcfg
  label: Display IP configuration
  kind: query
  command: "IPCFG"
  params: []

- id: iptimeout
  label: Set TCP/IP inactivity timeout
  kind: action
  command: "IPTimeout XX"
  params:
    - name: seconds
      type: integer
      description: Seconds of inactivity before TCP/IP disconnects

- id: ipquit
  label: Logout of TCP/IP
  kind: action
  command: "IPQuit"
  params: []

- id: ipadduser_list
  label: List TCP/IP users
  kind: query
  command: "IPAddUser"
  params: []

- id: ipadduser
  label: Add TCP/IP user
  kind: action
  command: "IPAddUser [X] [Y]"
  params:
    - name: username
      type: string
      description: Username (X)
    - name: password
      type: string
      description: Password (Y)

- id: ipdeluser
  label: Delete TCP/IP user
  kind: action
  command: "IPDelUser [X]"
  params:
    - name: username
      type: string
      description: Username to delete

- id: ipdhcp_sta
  label: Display DHCP status
  kind: query
  command: "IPDHCP sta"
  params: []

- id: ipdhcp_on
  label: Enable DHCP
  kind: action
  command: "IPDHCP on"
  params: []

- id: ipdhcp_off
  label: Disable DHCP
  kind: action
  command: "IPDHCP off"
  params: []

- id: ipstatic
  label: Set static IP address
  kind: action
  command: "IPStatic [X] [Y] [Z]"
  params:
    - name: address
      type: string
      description: Static IP address (X)
    - name: netmask
      type: string
      description: Subnet mask (Y)
    - name: gateway
      type: string
      description: Gateway address (Z)

- id: ipport
  label: Set TCP/IP port
  kind: action
  command: "IPPort Y"
  params:
    - name: port
      type: integer
      description: TCP/IP port number (e.g. IPPort 230)

- id: iplogin_sta
  label: Display IPLogin status
  kind: query
  command: "IPLogin sta"
  params: []

- id: iplogin_on
  label: Enable IPLogin
  kind: action
  command: "IPLogin on"
  params: []

- id: iplogin_off
  label: Disable IPLogin
  kind: action
  command: "IPLogin off"
  params: []

- id: broadcast_sta
  label: Display broadcast mode status
  kind: query
  command: "Broadcast sta"
  params: []

- id: broadcast_on
  label: Enable broadcast mode
  kind: action
  command: "Broadcast on"
  params: []

- id: broadcast_off
  label: Disable broadcast mode
  kind: action
  command: "Broadcast off"
  params: []
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: firmware_version
  type: string
  description: Returned by Version command

- id: model_info
  type: string
  description: Returned by Type command

- id: routing_map
  type: string
  description: Returned by Status / Statusx1; format x1AVx1, x2AVx2, ...

- id: ip_config
  type: string
  description: Returned by IPCFG; multi-line: IP Addr, Netmask, Gateway, IP Port

- id: dhcp_state
  type: enum
  values: [on, off]

- id: iplogin_state
  type: enum
  values: [on, off]

- id: broadcast_state
  type: enum
  values: [on, off]

- id: user_list
  type: string
  description: Returned by IPAddUser; multi-line "user password" list

- id: command_failed
  type: string
  description: Returned when command fails or is incorrect
```

## Variables

```yaml
# UNRESOLVED: no continuous/parameterized variables documented as settable scalars in source.
# Discrete save/recall presets and routing inputs are modeled as Actions.
```

## Events

```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros

```yaml
# UNRESOLVED: source does not document multi-step macro sequences.
```

## Safety

```yaml
confirmation_required_for:
  - mreset
  - ipstatic
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes

- Every command and feedback terminated with carriage return (`\r`).
- Commands case-sensitive; do not alter capitalization, spacing, or lettering.
- Invalid command → device returns `Command FAILED`.
- Baud rate configurable via WebGUI; matrix default 115200 8-N-1. Front panel may also show 9600 8-O-0 — source recommends not changing baud unless incompatibility occurs.
- WebGUI default admin: username `root`, password `Atlona`. Only admin password is changeable; username fixed.
- IPLogin mode (when enabled) requires same credentials as WebGUI on every IP connection; source advises against using IPLogin with control systems.
- TCP/IP commands appear to operate without command-level auth by default; auth is session-level via IPLogin.
- ARC per-output enable/disable set via front panel (1: On / 2: Off); corresponding RS-232 command name on manual page 18, not extractable from source.
- Source manual covers both AT-H2H-44M and AT-H2H-88M; input/output ranges in templates use 1-4 for the 44M.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-H2H_V2.pdf
retrieved_at: 2026-06-12T02:02:10.017Z
last_checked_at: 2026-06-12T19:07:30.697Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:07:30.697Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions match source command tokens with correct shapes and parameters; transport verified against source. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "ARC per-output RS-232 command name not extractable from source (page 18 image not available); only front-panel toggle described."
- "TCP port not stated in source; Telnet default assumed but not verified by source - verify with device or driver."
- "source documents username \"root\" / password \"Atlona\" for WebGUI; IPLogin mode is optional; ASCII IP commands appear unauthenticated by default."
- "no continuous/parameterized variables documented as settable scalars in source."
- "source does not document unsolicited notifications."
- "source does not document multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures, or power-on sequencing requirements."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
