---
spec_id: admin/gefen-dvi-matrix-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Gefen DVI Matrix Series Control Spec"
manufacturer: Gefen
model_family: "16x16 DVI Matrix"
aliases: []
compatible_with:
  manufacturers:
    - Gefen
  models:
    - "16x16 DVI Matrix"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20170331055533if_/https://gefen.com/pdf/EXT-DVI-16416.pdf
retrieved_at: 2026-06-29T19:09:59.510Z
last_checked_at: 2026-06-30T07:05:04.687Z
generated_at: 2026-06-30T07:05:04.687Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact product model SKU not stated beyond \"16x16 DVI Matrix\"; firmware/hardware compatibility ranges not stated; HTTP web interface command surface not documented."
  - "no explicit multi-step sequences described in source."
  - "exact product model SKU / series model number not stated (source refers only to \"16x16 DVI Matrix\")."
  - "firmware/hardware version compatibility ranges not stated."
  - "HTTP web interface command surface not documented (web GUI mentioned but no REST endpoints or HTTP actions provided)."
  - "UDP command framing (delimiter, CR requirement) not explicitly stated for UDP transport — only RS-232 CR rule stated."
  - "default UDP local listening port value inconsistent in source (#set_udp_port says default 8, #ipconfig sample shows 25665) — treat as unresolved."
verification:
  verdict: verified
  checked_at: 2026-06-30T07:05:04.687Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions found verbatim in source; full command coverage verified; transport parameters (RS-232 19200 baud, TCP port 23) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-29
---

# Gefen DVI Matrix Series Control Spec

## Summary
The Gefen 16x16 DVI Matrix is a 16-input by 16-output DVI routing matrix with EDID management, output masking, routing presets, and IP/serial configurability. This spec covers the ASCII command protocol used over RS-232, TCP (Telnet), and UDP, including EDID management, routing, masking, IP configuration, and system diagnostics commands. A built-in web interface is also mentioned but its HTTP REST surface is not documented in the source.

<!-- UNRESOLVED: exact product model SKU not stated beyond "16x16 DVI Matrix"; firmware/hardware compatibility ranges not stated; HTTP web interface command surface not documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23        # TCP Terminal Server Port (default, from #ipconfig output)
auth:
  type: none      # default disabled per #use_tcp_term_pass; optional TCP terminal password can be enabled (default password "Admin")
  # Note: optional password auth exists; credentials are operator-configured via #set_tcp_term_pass.
```

Notes on transport (verbatim from source):
- "When sending RS-232 commands, a carriage return must be included at the end of the command."
- "A space must be included between the command and the parameter."
- Default UDP Server Port = 25665; UDP Remote Port = 26989 (from #ipconfig sample output).
- Default Web Server (HTTP) Port = 80 (web GUI; no HTTP REST actions documented in source).

## Traits
```yaml
traits:
  - routable     # inferred: r / s routing commands present
  - queryable    # inferred: many display/query commands (m, #ipconfig, #show_temp, #prpreset, etc.)
```

## Actions
```yaml
# All commands terminated with carriage return (CR). Space required between command and parameters.
# Commands prefixed with "#" are mnemonic commands; "r", "s", "f", "m" are bare single-letter commands
# (source: "Do not precede this command with the '#' symbol" for f and m).

# --- EDID Management ---

- id: dynamic_edid
  label: Dynamic EDID Enable/Disable
  kind: action
  command: "#dynamic_edid {state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable"

- id: edidbatolo
  label: Copy EDID Bank to Local Input
  kind: action
  command: "#edidbatolo {bank} {input} [{inputs...}]"
  params:
    - name: bank
      type: integer
      description: "EDID bank [1..3]"
    - name: input
      type: integer
      description: "Input [1..16]; 0 = copy to all 16 inputs"
    - name: inputs
      type: integer
      description: "Optional additional input numbers [1..16]"

- id: ediddetolo
  label: Set Local EDID to Default
  kind: action
  command: "#ediddetolo {input} [{inputs...}]"
  params:
    - name: input
      type: integer
      description: "Input [1..16]; 0 = set all 16 inputs to Default EDID (640x480)"
    - name: inputs
      type: integer
      description: "Optional additional input numbers [1..16]"

- id: ediddstoba
  label: Store Downstream EDID to Bank
  kind: action
  command: "#ediddstoba {monitor} {bank}"
  params:
    - name: monitor
      type: integer
      description: "Downstream monitor [1..16]"
    - name: bank
      type: integer
      description: "EDID bank [1..3]"

- id: ediddstolo
  label: Copy Downstream EDID to Local Input
  kind: action
  command: "#ediddstolo {monitor} {input} [{inputs...}]"
  params:
    - name: monitor
      type: integer
      description: "Downstream monitor [1..16]"
    - name: input
      type: integer
      description: "Input [1..16]; 0 = store to all 16 inputs. Max 8 inputs per call; execute twice if more needed."
    - name: inputs
      type: integer
      description: "Optional additional input numbers [1..16] (max 8 total per call)"

- id: lock_edid
  label: Lock Local EDID
  kind: action
  command: "#lock_edid {state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable"

- id: prbaedid
  label: Read EDID Bank to Serial
  kind: query
  command: "#prbaedid {bank}"
  params:
    - name: bank
      type: integer
      description: "EDID bank [1..3]"

- id: prdsedid
  label: Read Downstream EDID to Serial
  kind: query
  command: "#prdsedid {monitor}"
  params:
    - name: monitor
      type: integer
      description: "Downstream monitor [1..16]"

- id: predidst
  label: Print EDID Details
  kind: query
  command: "#predidst"
  params: []

- id: prloedid
  label: Read Local Input EDID to Serial
  kind: query
  command: "#prloedid {input}"
  params:
    - name: input
      type: integer
      description: "Input [1..16]"

# --- IP / Telnet Configuration ---

- id: ipconfig
  label: Display TCP/IP Settings
  kind: query
  command: "#ipconfig"
  params: []

- id: resetip
  label: Reset IP to Factory Defaults
  kind: action
  command: "#resetip"
  params: []

- id: set_http_port
  label: Set Web Server Port
  kind: action
  command: "#set_http_port {port}"
  params:
    - name: port
      type: integer
      description: "Port [0..65535]; default 80"

- id: set_tcp_term_pass
  label: Set TCP Terminal Password
  kind: action
  command: "#set_tcp_term_pass {current} {new} {confirm}"
  params:
    - name: current
      type: string
      description: "Current password (case-sensitive, max 20 chars; default 'Admin')"
    - name: new
      type: string
      description: "New password (case-sensitive, max 20 chars)"
    - name: confirm
      type: string
      description: "New password confirmation"

- id: set_tcp_term_port
  label: Set Telnet Listening Port
  kind: action
  command: "#set_tcp_term_port {port}"
  params:
    - name: port
      type: integer
      description: "Port [1..65535]; default 23"

- id: set_udp_port
  label: Set Local UDP Listening Port
  kind: action
  command: "#set_udp_port {port}"
  params:
    - name: port
      type: integer
      description: "Port [1..65535]"

- id: set_udp_rip
  label: Set Remote UDP IP Address
  kind: action
  command: "#set_udp_rip {ip}"
  params:
    - name: ip
      type: string
      description: "Remote UDP IP address (dot-decimal)"

- id: set_udp_rport
  label: Set Remote UDP Port
  kind: action
  command: "#set_udp_rport {port}"
  params:
    - name: port
      type: integer
      description: "Remote UDP port"

- id: sgateway
  label: Set IP Gateway
  kind: action
  command: "#sgateway {gateway}"
  params:
    - name: gateway
      type: string
      description: "IP gateway address (dot-decimal); default 192.168.1.254"

- id: show_tcp_term_pass
  label: Show TCP Terminal Password
  kind: query
  command: "#show_tcp_term_pass"
  params: []

- id: sipadd
  label: Set Matrix IP Address
  kind: action
  command: "#sipadd {ip}"
  params:
    - name: ip
      type: string
      description: "IP address (dot-decimal); default 192.168.1.72"

- id: snetmask
  label: Set IP Network Mask
  kind: action
  command: "#snetmask {mask}"
  params:
    - name: mask
      type: string
      description: "Network mask (dot-decimal); default 255.255.255.0"

- id: use_tcp_term_pass
  label: Enable/Disable TCP Password Prompt
  kind: action
  command: "#use_tcp_term_pass {state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable password, 1 = Enable (force) password; default disabled"

- id: use_udp_access
  label: Enable/Disable UDP Listening
  kind: action
  command: "#use_udp_access {state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable"

# --- Routing ---

- id: callpreset
  label: Recall Routing Preset
  kind: action
  command: "#callpreset {preset}"
  params:
    - name: preset
      type: integer
      description: "Preset [1..16]"

- id: prpreset
  label: Display Preset Table
  kind: query
  command: "#prpreset"
  params: []

- id: savepreset
  label: Save Routing State to Preset
  kind: action
  command: "#savepreset {preset}"
  params:
    - name: preset
      type: integer
      description: "Preset [1..16]"

- id: route_input_to_outputs
  label: Route Input to Outputs
  kind: action
  command: "r {input} {outputs...}"
  params:
    - name: input
      type: integer
      description: "Input [1..16]"
    - name: outputs
      type: integer
      description: "Output numbers [1..16]; 0 = route to all outputs"

- id: route_input_to_all
  label: Route Input to All Outputs
  kind: action
  command: "s {input}"
  params:
    - name: input
      type: integer
      description: "Input [1..16]"

# --- Masking ---

- id: maskout
  label: Mask Output
  kind: action
  command: "#maskout {output} {state}"
  params:
    - name: output
      type: integer
      description: "Output [1..16]; 0 = all outputs"
    - name: state
      type: integer
      description: "0 = Unmask, 1 = Mask"

- id: unmaskout
  label: Unmask Output
  kind: action
  command: "#unmaskout {outputs...}"
  params:
    - name: outputs
      type: integer
      description: "Output numbers [1..16]; 0 = unmask all outputs"

# --- Miscellaneous ---

- id: fadefault
  label: Factory Default Routing
  kind: action
  command: "#fadefault"
  params: []

- id: help
  label: Display Help
  kind: query
  command: "#help [{command}]"
  params:
    - name: command
      type: string
      description: "Optional command name; if omitted, lists all commands"
      required: false

- id: lock_fo
  label: Toggle +5V Lock Power State
  kind: action
  command: "#lock_fo {state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable power lock, 1 = Enable power lock"

- id: set_input_name
  label: Set Input Name
  kind: action
  command: "#set_input_name {input} {name}"
  params:
    - name: input
      type: integer
      description: "Input [1..16]"
    - name: name
      type: string
      description: "Name (max 15 chars; no spaces or special chars; use underscore to separate)"

- id: set_ir
  label: Set IR Channel
  kind: action
  command: "#set_ir {channel}"
  params:
    - name: channel
      type: integer
      description: "IR channel [0..3]"

- id: set_output_name
  label: Set Output Name
  kind: action
  command: "#set_output_name {output} {name}"
  params:
    - name: output
      type: integer
      description: "Output [1..16]"
    - name: name
      type: string
      description: "Name (max 15 chars; no spaces or special chars; use underscore to separate)"

- id: show_temp
  label: Display Board Temperatures
  kind: query
  command: "#show_temp"
  params: []

- id: show_user_name
  label: Display TCP User Name
  kind: query
  command: "#show_user_name"
  params: []

- id: show_ver_data
  label: Display Hardware/Firmware Version
  kind: query
  command: "#show_ver_data"
  params: []

- id: show_voltage
  label: Display Board Voltages
  kind: query
  command: "#show_voltage"
  params: []

- id: f_command
  label: Toggle +5V Input Power
  kind: action
  command: "f {input} {state}"
  params:
    - name: input
      type: integer
      description: "Input [1..16]; 0 = all inputs"
    - name: state
      type: integer
      description: "0 = Disable, 1 = Enable. WARNING: may damage source/matrix if source supplies +5V."

- id: m_command
  label: Display Routing Status
  kind: query
  command: "m"
  params: []
```

## Feedbacks
```yaml
# Query responses / observable state returned by the device.
- id: ipconfig_response
  type: text
  description: "TCP/IP settings block (MAC, IP, netmask, gateway, web port, TCP term port, UDP ports, password/UDP state)"

- id: preset_table
  type: text
  description: "Routing/mask preset table from #prpreset (preset x output matrix)"

- id: routing_status_table
  type: text
  description: "Routing status table from m command (output, input, HPD, status per output)"

- id: board_temperatures
  type: text
  description: "Board temperature readings from #show_temp"

- id: board_voltages
  type: text
  description: "Board voltage readings from #show_voltage"

- id: version_info
  type: text
  description: "Hardware/firmware version block from #show_ver_data"

- id: tcp_user_name
  type: string
  description: "Current TCP terminal user name from #show_user_name"

- id: tcp_password
  type: string
  description: "Current TCP terminal password from #show_tcp_term_pass"

- id: edid_details
  type: text
  description: "EDID details table from #predidst"

- id: edid_bank_dump
  type: binary
  description: "Raw EDID bytes from EDID bank (#prbaedid), downstream (#prdsedid), or local input (#prloedid)"

- id: help_text
  type: text
  description: "Command help text from #help"

- id: command_ack
  type: text
  description: "Per-command acknowledgement string (e.g. 'Input 7 is routed to outputs: 3 4 5 6 10 12', 'computer1 is assigned to input 5')"
```

## Variables
```yaml
# Settable parameters that are not discrete actions.
- id: ip_address
  type: string
  description: "Matrix IP address (dot-decimal)"
- id: netmask
  type: string
  description: "IP network mask (dot-decimal)"
- id: gateway
  type: string
  description: "IP gateway address (dot-decimal)"
- id: http_port
  type: integer
  description: "Web server listening port [0..65535]"
- id: tcp_term_port
  type: integer
  description: "Telnet listening port [1..65535]"
- id: udp_port
  type: integer
  description: "Local UDP listening port [1..65535]"
- id: udp_remote_ip
  type: string
  description: "Remote UDP IP address (dot-decimal)"
- id: udp_remote_port
  type: integer
  description: "Remote UDP port"
- id: tcp_password_enabled
  type: boolean
  description: "Whether TCP terminal password prompt is enabled"
- id: udp_access_enabled
  type: boolean
  description: "Whether UDP listening is enabled"
- id: ir_channel
  type: integer
  description: "IR channel [0..3]"
- id: dynamic_edid_enabled
  type: boolean
  description: "Dynamic EDID mode enabled state"
- id: edid_lock_enabled
  type: boolean
  description: "Local EDID lock enabled state"
- id: lock_fo_enabled
  type: boolean
  description: "+5V lock power state"
```

## Events
```yaml
# Unsolicited notifications the device sends over the control channel.
- id: fan_failure
  type: alarm
  payload: "Fan failure !!!"
  description: "Repeated at regular intervals until fan functions again."

- id: system_failure
  type: alarm
  payload: "System failure !!!"
  description: "Critical malfunction warning. Triggered by measured system temperature exceeding 85 C, or power reading out of tolerance (>120% or <80%)."
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - fadefault        # resets routing to factory defaults; loses current state
  - resetip          # resets all TCP/IP settings to factory defaults
  - f_command        # applying +5V to inputs - see interlock warning below
interlocks:
  - command: f
    warning: >
      Use caution when applying power to inputs. If the source device supplies
      +5V on the input, then enabling the +5V may cause damage to the source
      and/or the 16x16 DVI Matrix.
  - condition: "Measured system temperature exceeds 85 C"
    behavior: "SYSTEM FAILURE! displayed on LCM; system failure event emitted on control channel."
  - condition: "Power reading exceeds tolerance (greater than 120% or less than 80%)"
    behavior: "SYSTEM FAILURE! displayed on LCM; system failure event emitted on control channel."
  - condition: "Power interrupted or masking state not saved"
    behavior: "Current masking state is lost."
notes:
  - "Local EDID is read from a connected DVI monitor at power-on and copied to all 16 inputs; if no monitor detected, default EDID 640x480 is used."
```

## Notes
- Commands are ASCII strings. RS-232 requires a carriage return (CR) at the end of every command, and a space between the command mnemonic and its parameters.
- Mnemonic commands are prefixed with `#` (e.g. `#callpreset 2`). The single-letter commands `r`, `s`, `f`, `m` must NOT be prefixed with `#` (source explicitly states this for `f` and `m`).
- Many commands accept `0` as a "all channels" wildcard (routing, masking, EDID copy, +5V).
- `#ediddstolo` accepts a maximum of 8 input targets per call; for more than 8, execute the command twice.
- Names assigned via `#set_input_name` / `#set_output_name` are limited to 15 characters, no spaces or special characters; underscore `_` is the only separator allowed.
- Only TXD, RXD, and GND are used on the RS-232 connector (pins per DB9 diagram in source).
- Default network values: IP `192.168.1.72`, subnet `255.255.255.0`, gateway `192.168.1.254`, HTTP port `80`, TCP terminal port `23`. Default TCP terminal password `Admin` (case-sensitive), password prompt disabled by default.

<!-- UNRESOLVED: exact product model SKU / series model number not stated (source refers only to "16x16 DVI Matrix"). -->
<!-- UNRESOLVED: firmware/hardware version compatibility ranges not stated. -->
<!-- UNRESOLVED: HTTP web interface command surface not documented (web GUI mentioned but no REST endpoints or HTTP actions provided). -->
<!-- UNRESOLVED: UDP command framing (delimiter, CR requirement) not explicitly stated for UDP transport — only RS-232 CR rule stated. -->
<!-- UNRESOLVED: default UDP local listening port value inconsistent in source (#set_udp_port says default 8, #ipconfig sample shows 25665) — treat as unresolved. -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20170331055533if_/https://gefen.com/pdf/EXT-DVI-16416.pdf
retrieved_at: 2026-06-29T19:09:59.510Z
last_checked_at: 2026-06-30T07:05:04.687Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T07:05:04.687Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions found verbatim in source; full command coverage verified; transport parameters (RS-232 19200 baud, TCP port 23) confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact product model SKU not stated beyond \"16x16 DVI Matrix\"; firmware/hardware compatibility ranges not stated; HTTP web interface command surface not documented."
- "no explicit multi-step sequences described in source."
- "exact product model SKU / series model number not stated (source refers only to \"16x16 DVI Matrix\")."
- "firmware/hardware version compatibility ranges not stated."
- "HTTP web interface command surface not documented (web GUI mentioned but no REST endpoints or HTTP actions provided)."
- "UDP command framing (delimiter, CR requirement) not explicitly stated for UDP transport — only RS-232 CR rule stated."
- "default UDP local listening port value inconsistent in source (#set_udp_port says default 8, #ipconfig sample shows 25665) — treat as unresolved."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
