---
spec_id: admin/atlona-at-h2h-88m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-H2H-88M Control Spec"
manufacturer: Atlona
model_family: AT-H2H-88M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-H2H-88M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-H2H_V2.pdf
  - https://atlona.com/downloads/AMX_AT-H2H-88M.zip
  - https://atlona.com/downloads/CRM_AT-H2H-88M.zip
  - https://atlona.com/downloads/RTI_RS232-TCPIP.zip
  - https://atlona.com/downloads/C4IP_AT-H2H-88M.zip
retrieved_at: 2026-06-14T16:54:14.232Z
last_checked_at: 2026-06-14T19:37:53.578Z
generated_at: 2026-06-14T19:37:53.578Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default TCP port not stated in source; port is settable via `IPPort` command (example: `IPPort 230`)"
  - "default port value not stated in source"
  - "source does not document any unsolicited notifications. Broadcast Mode"
  - "source documents no explicit multi-step sequences."
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "default TCP port not stated (only settable via IPPort)"
  - "ARC RS-232 command syntax not present in extractable source (page 18 image missing)"
  - "firmware version / compatibility range not stated"
  - "list of internal EDID indices beyond int6 not enumerated"
  - "broadcast-mode notification payload not specified"
verification:
  verdict: verified
  checked_at: 2026-06-14T19:37:53.578Z
  matched_actions: 40
  action_count: 40
  confidence: medium
  summary: "All 40 spec actions matched literally in source with exact command syntax; transport parameters verified; no gaps or fabrications. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-14
---

# Atlona AT-H2H-88M Control Spec

## Summary
The Atlona AT-H2H-88M is an 8×8 HDMI matrix switcher with HDBaseT outputs, controllable over RS-232 (9-pin DB, pins 2/3/5) and TCP/IP (DHCP default on, optional WebGUI / telnet login). This spec covers the documented ASCII command set including power, input/output routing, EDID management, presets, panel lock/IR, and IP configuration commands. Commands are case-sensitive and each command/feedback is terminated with a carriage return.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: default TCP port not stated in source; port is settable via `IPPort` command (example: `IPPort 230`)
serial:
  baud_rate: 115200  # matrix default; also supports 9600 (8-N-1 or 8-O-0)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
  connector: DB9-female  # pins 2 (Tx), 3 (Rx), 5 (Gnd) only
auth:
  type: credential  # source describes an auth procedure (WebGUI + optional telnet IPLogin Mode)
  # Default credentials stated in source: username "root", password "Atlona" (admin only password changeable)
  # IPLogin on/off controls whether TCP connections require login; source notes Login Mode "should not be used when using a control system"
```

## Traits
```yaml
traits:
  - powerable   # inferred from PWON/PWOFF commands
  - routable    # inferred from x1AVx2 routing commands
  - queryable   # inferred from PWSTA / Status / Version / Type queries
```

## Actions
```yaml
# All commands terminated with carriage return (CR). Commands are case-sensitive.
# On failure the device returns the literal feedback: "Command FAILED".
# Parameter legend: X = input number, Y = preset/user value, Z = internal EDID index, x1/x2 = output numbers.

# --- Power ---
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

- id: power_status_query
  label: Power Status Query
  kind: query
  command: "PWSTA"
  params: []

# --- System info ---
- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  command: "Version"
  params: []

- id: model_type_query
  label: Model Type Query
  kind: query
  command: "Type"
  params: []

# --- Front panel lock ---
- id: panel_lock
  label: Front Panel Lock
  kind: action
  command: "Lock"
  params: []

- id: panel_unlock
  label: Front Panel Unlock
  kind: action
  command: "Unlock"
  params: []

# --- Routing / matrix reset ---
- id: route_reset_all
  label: Reset All Inputs To Corresponding Outputs
  kind: action
  command: "All#"
  params: []

- id: output_off
  label: Turn Off Output Channel
  kind: action
  command: "x{output}$"
  params:
    - name: output
      type: integer
      description: Output number to disable (ex. x3$ turns off output 3)

- id: route_input_to_all
  label: Route Input To All Outputs
  kind: action
  command: "x{input}All"
  params:
    - name: input
      type: integer
      description: Input number routed to every output (ex. x3All)

- id: route_input_to_output
  label: Route Input To Single Output
  kind: action
  command: "x{input}AVx{output}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output
      type: integer
      description: Output number (ex. x3AVx2 = input 3 to output 2)

- id: route_input_to_outputs
  label: Route Input To Multiple Outputs
  kind: action
  command: "x{input}AVx{output_list}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: output_list
      type: string
      description: Comma-separated output numbers (ex. x3AVx1,x2)

# --- IR receiver ---
- id: ir_on
  label: IR Receiver On
  kind: action
  command: "IRON"
  params: []

- id: ir_off
  label: IR Receiver Off
  kind: action
  command: "IROFF"
  params: []

# --- Routing status queries ---
- id: output_status_query
  label: Output Routing Status Query
  kind: query
  command: "Statusx{output}"
  params:
    - name: output
      type: integer
      description: Output number (returns e.g. x7AVx1)

- id: all_status_query
  label: Full Routing Status Query
  kind: query
  command: "Status"
  params: []

# --- Presets (0-4) ---
- id: preset_save
  label: Save Preset
  kind: action
  command: "Save {preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-4 (ex. Save2)

- id: preset_recall
  label: Recall Preset
  kind: action
  command: "Recall {preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot 0-4 (ex. Recall2)

- id: preset_clear
  label: Clear Preset
  kind: action
  command: "Clear {preset}"
  params:
    - name: preset
      type: integer
      description: Preset slot to erase (ex. Clear2)

# --- Factory reset ---
- id: matrix_reset
  label: Matrix Factory Reset
  kind: action
  command: "Mreset"
  params: []

# --- EDID (RS-232) ---
- id: edid_set_default
  label: Set Input EDID To Default
  kind: action
  command: "EDIDMSet{input} default"
  params:
    - name: input
      type: integer
      description: Input number (ex. EDIDMSet2 default)

- id: edid_set_saved
  label: Set Input EDID To Saved Memory
  kind: action
  command: "EDIDMSet{input} save{memory}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: memory
      type: integer
      description: Saved EDID memory slot (ex. EDIDMSet1 save3)

- id: edid_set_internal
  label: Set Input EDID To Internal
  kind: action
  command: "EDIDMSet{input} int{index}"
  params:
    - name: input
      type: integer
      description: Input number
    - name: index
      type: integer
      description: Internal EDID index (ex. EDIDMSet3 int6 = 1080p 3D Dolby Digital 5.1)

# --- TCP/IP configuration ---
- id: ip_config_query
  label: IP Configuration Query
  kind: query
  command: "IPCFG"
  params: []

- id: ip_timeout_set
  label: Set TCP/IP Inactivity Timeout
  kind: action
  command: "IPTimeout {seconds}"
  params:
    - name: seconds
      type: integer
      description: Seconds of inactivity before TCP disconnect (ex. IPTimeout120)

- id: ip_quit
  label: Logout Of TCP/IP
  kind: action
  command: "IPQuit"
  params: []

- id: ip_user_list_query
  label: TCP/IP User List Query
  kind: query
  command: "IPAddUser"
  params: []

- id: ip_user_add
  label: Add TCP/IP User
  kind: action
  command: "IPAddUser {user} {password}"
  params:
    - name: user
      type: string
      description: Username
    - name: password
      type: string
      description: Password (ex. IPAddUser Atlona 1234)

- id: ip_user_delete
  label: Delete TCP/IP User
  kind: action
  command: "IPDelUser {user}"
  params:
    - name: user
      type: string
      description: Username to delete (ex. IPDelUser Atlona)

- id: ip_dhcp_status_query
  label: DHCP Status Query
  kind: query
  command: "IPDHCP sta"
  params: []

- id: ip_dhcp_on
  label: Enable DHCP
  kind: action
  command: "IPDHCP on"
  params: []

- id: ip_dhcp_off
  label: Disable DHCP
  kind: action
  command: "IPDHCP off"
  params: []

- id: ip_static_set
  label: Set Static IP
  kind: action
  command: "IPStatic {address} {netmask} {gateway}"
  params:
    - name: address
      type: string
      description: Static IP address
    - name: netmask
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway (ex. IPStatic 192.168.1.1 255.255.255.0 192.168.1.200)

- id: ip_port_set
  label: Set TCP/IP Port
  kind: action
  command: "IPPort {port}"
  params:
    - name: port
      type: integer
      description: TCP port number (ex. IPPort 230)

- id: ip_login_status_query
  label: IPLogin Status Query
  kind: query
  command: "IPLogin sta"
  params: []

- id: ip_login_on
  label: Enable IPLogin Mode
  kind: action
  command: "IPLogin on"
  params: []

- id: ip_login_off
  label: Disable IPLogin Mode
  kind: action
  command: "IPLogin off"
  params: []

- id: broadcast_status_query
  label: Broadcast Mode Status Query
  kind: query
  command: "Broadcast sta"
  params: []

- id: broadcast_on
  label: Enable Broadcast Mode
  kind: action
  command: "Broadcast on"
  params: []

- id: broadcast_off
  label: Disable Broadcast Mode
  kind: action
  command: "Broadcast off"
  params: []
```

## Feedbacks
```yaml
# Documented feedback strings returned by the device (all CR-terminated).
- id: power_state
  type: enum
  values: ["PWON", "PWOFF"]
  query: "PWSTA"

- id: command_failed
  type: literal
  values: ["Command FAILED"]
  notes: Returned when a command fails or is malformed.

- id: routing_map
  type: string
  query: "Status"
  format: "x1AVx1,x2AVx2,..."  # full input→output map

- id: output_routing
  type: string
  query: "Statusx{output}"
  format: "x{input}AVx{output}"

- id: firmware_version
  type: string
  query: "Version"

- id: model_type
  type: string
  query: "Type"

- id: panel_lock_state
  type: enum
  values: ["Lock", "Unlock"]

- id: ir_state
  type: enum
  values: ["IRON", "IROFF"]

- id: preset_ack
  type: literal
  values: ["Save {Y}", "Recall {Y}", "Clear {Y}"]

- id: ip_config
  type: multiline
  query: "IPCFG"
  format: |
    IP   Addr : x.x.x.x
    Netmask : x.x.x.x
    Gateway : x.x.x.x
    IP Port: x.x.x

- id: ip_timeout_ack
  type: literal
  format: "IPTimeout XX"

- id: ip_quit_ack
  type: literal
  values: ["IPQuit"]

- id: ip_user_list
  type: multiline
  query: "IPAddUser"
  format: |
    TCP/IP username & password list:
    - user password

- id: ip_user_added
  type: literal
  values: ["TCP/IP user was added"]

- id: ip_user_deleted
  type: literal
  values: ["TCP/IP user was deleted"]

- id: dhcp_state
  type: enum
  values: ["IPDHCP on", "IPDHCP off"]

- id: static_ack
  type: literal
  format: "IPStatic address netmask gateway"

- id: port_ack
  type: literal
  format: "IPPort Y"

- id: iplogin_state
  type: enum
  values: ["IPLogin on", "IPLogin off"]

- id: broadcast_state
  type: enum
  values: ["Broadcast on", "Broadcast off"]
```

## Variables
```yaml
- id: ip_timeout
  label: TCP/IP Inactivity Timeout
  unit: seconds
  set_command: "IPTimeout {seconds}"

- id: tcp_port
  label: TCP/IP Port
  unit: integer
  set_command: "IPPort {port}"
  # UNRESOLVED: default port value not stated in source

- id: dhcp_enabled
  label: DHCP Enabled
  type: boolean
  set_commands: ["IPDHCP on", "IPDHCP off"]

- id: static_ip
  label: Static IP / Netmask / Gateway
  set_command: "IPStatic {address} {netmask} {gateway}"

- id: iplogin_enabled
  label: IPLogin Mode Enabled
  type: boolean
  set_commands: ["IPLogin on", "IPLogin off"]

- id: broadcast_enabled
  label: Broadcast Mode Enabled
  type: boolean
  set_commands: ["Broadcast on", "Broadcast off"]

- id: baud_rate
  label: Matrix Baud Rate
  unit: bps
  values: [115200, 9600]
  # Set via WebGUI config page, not via ASCII command. Framing options: 8-N-1 or 8-O-0.

- id: preset_slot
  label: Routing Preset
  values: [0, 1, 2, 3, 4]
  set_commands: ["Save {Y}", "Recall {Y}", "Clear {Y}"]
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications. Broadcast Mode
# (Broadcast on/off) may push state to multiple clients but its notification payload is not specified.
```

## Macros
```yaml
# UNRESOLVED: source documents no explicit multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. `Mreset` performs a factory reset (destructive) -
# operator may wish to require confirmation; not stated in source.
```

## Notes
- Commands are **case-sensitive** — do not change capitalization, spacing, or lettering.
- Each command and each feedback is terminated with a **carriage return (CR)**.
- On malformed/failed commands the device returns the literal `Command FAILED`.
- The same ASCII command set is documented for both RS-232 and TCP/IP transports.
- RS-232 connector: 9-pin DB female; only pins **2 (Tx)**, **3 (Rx)**, **5 (Gnd)** are terminated.
- Matrix default serial config: **115200, 8, N, 1, no flow control**. Alternate framing supported via front-panel status: `9600 8 N 1` or `9600 8 ODD 0`.
- Baud rate is settable via the WebGUI config page (not via ASCII command) and is shared with attached projector compatibility — changing it is discouraged unless an incompatibility occurs.
- IP discovery: front panel → Function Option → hold 5s shows `FW Ver: X.X.Xx` then `IP: XXX.XXX.XXX.XXX` (default example `192.168.000.200`). DHCP is on by default.
- WebGUI login (also used for IPLogin/telnet): username **root**, default password **Atlona**. Only the admin password is changeable; username is always `root`.
- Source recommends IPLogin Mode be **off** when driving from a control system.
- Presets are numbered **0–4** (5 slots).
- Source states ARC can be toggled per-output via front panel (1: On / 2: Off) and references an RS-232 ARC command on manual page 18, but that page image was not extractable in the refined source.
<!-- UNRESOLVED: default TCP port not stated (only settable via IPPort) -->
<!-- UNRESOLVED: ARC RS-232 command syntax not present in extractable source (page 18 image missing) -->
<!-- UNRESOLVED: firmware version / compatibility range not stated -->
<!-- UNRESOLVED: list of internal EDID indices beyond int6 not enumerated -->
<!-- UNRESOLVED: broadcast-mode notification payload not specified -->
````

Spec done. 39 actions, all from source verbatim. Dual transport (tcp+serial). Gaps marked UNRESOLVED. No invented values.

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-H2H_V2.pdf
  - https://atlona.com/downloads/AMX_AT-H2H-88M.zip
  - https://atlona.com/downloads/CRM_AT-H2H-88M.zip
  - https://atlona.com/downloads/RTI_RS232-TCPIP.zip
  - https://atlona.com/downloads/C4IP_AT-H2H-88M.zip
retrieved_at: 2026-06-14T16:54:14.232Z
last_checked_at: 2026-06-14T19:37:53.578Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-14T19:37:53.578Z
matched_actions: 40
action_count: 40
confidence: medium
summary: "All 40 spec actions matched literally in source with exact command syntax; transport parameters verified; no gaps or fabrications. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default TCP port not stated in source; port is settable via `IPPort` command (example: `IPPort 230`)"
- "default port value not stated in source"
- "source does not document any unsolicited notifications. Broadcast Mode"
- "source documents no explicit multi-step sequences."
- "source contains no explicit safety warnings, interlock procedures, or"
- "default TCP port not stated (only settable via IPPort)"
- "ARC RS-232 command syntax not present in extractable source (page 18 image missing)"
- "firmware version / compatibility range not stated"
- "list of internal EDID indices beyond int6 not enumerated"
- "broadcast-mode notification payload not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
