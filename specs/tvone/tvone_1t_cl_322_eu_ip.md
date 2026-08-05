---
spec_id: admin/tvone-1t-cl-322-eu
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE 1T-CL-322-EU Control Spec"
manufacturer: tvONE
model_family: 1T-CL-322-EU
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - 1T-CL-322-EU
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tvone.com
source_urls:
  - "https://tvone.com/filestore/Manuals-Other-Products/1T-CL-322%20Instruction%20and%20Operation%20Manual%20v1.1.pdf"
retrieved_at: 2026-07-01T08:31:59.543Z
last_checked_at: 2026-08-05T08:48:02.364Z
generated_at: 2026-08-05T08:48:02.364Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware/hardware version compatibility not stated; voltage/power specs not in this refined source; binary/hex framing for any non-ASCII payloads not documented."
  - "exact response string formats for IPCONFIG/VER/HELP are not shown verbatim in source."
  - "no independent variable registry documented in source; settable state is expressed as actions."
  - "source does not describe any push/event mechanism from the panel."
  - "no pre-authored macro sequences to enumerate; macro storage is dynamic (up to 128"
  - "source contains no explicit safety warnings, interlock procedures, or power-on"
  - "exact response string formats for IPCONFIG/VER/HELP not shown verbatim."
  - "firmware version compatibility, hardware version, voltage/power specs not stated in this refined source."
  - "any binary/hex command framing beyond ASCII Telnet strings not documented."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:48:02.364Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec action commands (IPCONFIG, SIPMODE, SIPADDR, SNETMASK, SGATEWAY, VER, FADEFAULT, ETH_FADEFAULT, REBOOT, HELP?, HELP N, RELAY, CLOSE, OPEN, LEDBLUE, LEDRED, LEDBLUES, LEDREDS, LEDSHOW, BACKLIGHT, KEY_PRESS RELEASE/HOLD, MACRO RUN/STOP, @MACRO_FADEFAULT) match source verbatim, transport port 23 confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# tvONE 1T-CL-322-EU Control Spec

## Summary
The tvONE 1T-CL-322-EU is a wall-mount button control panel that transmits control commands to external AV equipment over Ethernet (Telnet/TCP). This spec covers the panel's own Telnet command set used to configure networking, drive its two relays, control per-button blue/red LED backlighting, and run/stop user-programmed macros. The panel does not process video; it is a control surface that emits command strings to other devices (e.g. tvONE C2/C3 series).

<!-- UNRESOLVED: firmware/hardware version compatibility not stated; voltage/power specs not in this refined source; binary/hex framing for any non-ASCII payloads not documented. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # "Telnet Port: The port used for Telnet commands (23 is default)"; telnet example uses "the number 23"
  base_url: null  # N/A - Telnet CLI, no HTTP base URL for the control protocol
auth:
  type: none  # inferred: Telnet control section describes connecting via `telnet <ip> 23` with no login step
# Note: a separate WebGUI on port 80 requires factory-default credentials admin/adminpw, but the
# Telnet control protocol documented here has no login procedure.
```

## Traits
```yaml
traits:
  - queryable  # inferred: IPCONFIG, VER, HELP return values/state
  - levelable  # inferred: LED brightness / backlight set as 0-100% levels
```

## Actions
```yaml
# All command strings below MUST be terminated with a carriage return. Source states Telnet
# commands "require carriage return at the end of the command string"; SysCMD/Relay command
# data must be followed by `\x0d\x0a` (CR+LF). Commands are case-insensitive.
# Parameter tokens in {braces} are the variable part of each command template.

# --- Network / system configuration ---
- id: ipconfig_query
  label: Display Current IP Configuration
  kind: query
  command: "IPCONFIG"
  params: []

- id: set_ip_mode
  label: Set Ethernet IP Mode
  kind: action
  command: "SIPMODE {mode}"
  params:
    - name: mode
      type: string
      enum: [STATIC, DHCP]
      description: IP addressing mode

- id: set_ip_address
  label: Set Ethernet IP Address
  kind: action
  command: "SIPADDR {o1}.{o2}.{o3}.{o4}"
  params:
    - name: o1
      type: integer
      description: First octet (0-255)
    - name: o2
      type: integer
      description: Second octet (0-255)
    - name: o3
      type: integer
      description: Third octet (0-255)
    - name: o4
      type: integer
      description: Fourth octet (0-255)

- id: set_netmask
  label: Set Ethernet Subnet Mask
  kind: action
  command: "SNETMASK {o1}.{o2}.{o3}.{o4}"
  params:
    - name: o1
      type: integer
      description: First octet (0-255)
    - name: o2
      type: integer
      description: Second octet (0-255)
    - name: o3
      type: integer
      description: Third octet (0-255)
    - name: o4
      type: integer
      description: Fourth octet (0-255)

- id: set_gateway
  label: Set Ethernet Gateway
  kind: action
  command: "SGATEWAY {o1}.{o2}.{o3}.{o4}"
  params:
    - name: o1
      type: integer
      description: First octet (0-255)
    - name: o2
      type: integer
      description: Second octet (0-255)
    - name: o3
      type: integer
      description: Third octet (0-255)
    - name: o4
      type: integer
      description: Fourth octet (0-255)

- id: firmware_version_query
  label: Show Unit Firmware Version
  kind: query
  command: "VER"
  params: []

- id: factory_default
  label: All Configurations to Factory Default
  kind: action
  command: "FADEFAULT"
  params: []

- id: ethernet_factory_default
  label: All Ethernet Configurations to Factory Default
  kind: action
  command: "ETH_FADEFAULT"
  params: []
  notes: Resets IP address and login ID & password back to factory default.

- id: reboot
  label: System Reboot
  kind: action
  command: "REBOOT"
  params: []
  notes: Reboots the control panel; WebGUI connection is lost and requires re-login.

- id: help_list
  label: Show Command List
  kind: query
  command: "HELP ?"
  params: []
  notes: "Source lists opcode as HELP (?) - ? lists all commands."

- id: help_command
  label: Show Description of a Command
  kind: query
  command: "HELP {command_name}"
  params:
    - name: command_name
      type: string
      description: The command name (mnemonic) to describe

- id: macro_factory_default
  label: All Macro Control to Factory Default
  kind: action
  command: "@MACRO_FADEFAULT"
  params: []
  notes: Resets macros 1-6 to factory default and deletes macros 7 through 30.

# --- Relay control ---
- id: relay_control
  label: Relay Control (specific)
  kind: action
  command: "RELAY {port} {action}"
  params:
    - name: port
      type: integer
      enum: [1, 2]
      description: Relay port number
    - name: action
      type: string
      enum: [OPEN, CLOSE, TOGGLE]
      description: Relay action

- id: relay_close_common
  label: Close Relay (common)
  kind: action
  command: "CLOSE"
  params: []
  notes: Common command to close a relay; the specific relay port number is allocated in the Macro.

- id: relay_open_common
  label: Open Relay (common)
  kind: action
  command: "OPEN"
  params: []
  notes: Common command to open a relay; the specific relay port number is allocated in the Macro.

# --- LED backlight control ---
- id: led_blue
  label: LED Blue Backlight Control (specific)
  kind: action
  command: "LEDBLUE {button} {percent}"
  params:
    - name: button
      type: integer
      description: Button number (1-15 EU / 1-16 US)
    - name: percent
      type: integer
      description: Brightness percentage (0-100)

- id: led_red
  label: LED Red Backlight Control (specific)
  kind: action
  command: "LEDRED {button} {percent}"
  params:
    - name: button
      type: integer
      description: Button number (1-15 EU / 1-16 US)
    - name: percent
      type: integer
      description: Brightness percentage (0-100)

- id: led_blue_all
  label: All Blue LED Backlight Control (common)
  kind: action
  command: "LEDBLUES {percent}"
  params:
    - name: percent
      type: integer
      description: Brightness percentage (0-100)

- id: led_red_all
  label: All Red LED Backlight Control (common)
  kind: action
  command: "LEDREDS {percent}"
  params:
    - name: percent
      type: integer
      description: Brightness percentage (0-100)

- id: led_backlight_all
  label: All LED Backlight Control (common)
  kind: action
  command: "BACKLIGHT {percent}"
  params:
    - name: percent
      type: integer
      description: Brightness percentage (0-100), sets both blue and red on all buttons

- id: led_show
  label: LED Dimming Mode Control
  kind: action
  command: "LEDSHOW {mode}"
  params:
    - name: mode
      type: string
      enum: [ON, OFF, TOGGLE]
      description: Dimming mode state

# --- Key press trigger type ---
- id: key_press_release
  label: Key Press Trigger Type (Press and RELEASE)
  kind: action
  command: "KEY_PRESS {port} RELEASE"
  params:
    - name: port
      type: integer
      description: Port number (this is the default trigger type)

- id: key_press_hold
  label: Key Press Trigger Type (Press and HOLD)
  kind: action
  command: "KEY_PRESS {port} HOLD"
  params:
    - name: port
      type: integer
      description: Port number

# --- Macro control ---
- id: macro_run
  label: Run Specific Macro
  kind: action
  command: "MACRO RUN {macro_id}"
  params:
    - name: macro_id
      type: integer
      description: Macro ID (1-30 EU / 1-32 US; extended macros 16-30 EU, 17-32 US)

- id: macro_stop_all
  label: Stop All Active Macros (common)
  kind: action
  command: "MACRO STOP"
  params: []
  notes: Common command to stop all active macros. Source row "MACRO STOP" with NONE param.

- id: macro_stop_specific
  label: Stop Specific Macro
  kind: action
  command: "MACRO STOP {macro_id}"
  params:
    - name: macro_id
      type: integer
      description: Macro ID (1-30 EU / 1-32 US; extended macros 16-30 EU, 17-32 US)
  notes: Stop a single macro by ID. Source row "MACRO STOP" with N = MACRO ID(1-30/32).
```

## Feedbacks
```yaml
- id: ip_configuration
  type: string
  description: Response to IPCONFIG - current IP configuration (IP, netmask, gateway, mode).
  query: ipconfig_query

- id: firmware_version
  type: string
  description: Response to VER - unit firmware version string.
  query: firmware_version_query

- id: command_help
  type: string
  description: Response to HELP ? / HELP {command_name} - command list or single command description.
  query: help_list

# UNRESOLVED: exact response string formats for IPCONFIG/VER/HELP are not shown verbatim in source.
```

## Variables
```yaml
# LED brightness levels and macro trigger types are set via the Actions above.
# No additional continuously-settable numeric variables are documented beyond those actions.

# UNRESOLVED: no independent variable registry documented in source; settable state is expressed as actions.
```

## Events
```yaml
# No unsolicited notifications are documented.
# UNRESOLVED: source does not describe any push/event mechanism from the panel.
```

## Macros
```yaml
# The 1T-CL-322 hosts user-programmed macros (button macros + internal/extension macros) that
# sequence SysCMD, Telnet, and Relay commands. The macro CONTENT is user-defined at runtime via
# the WebGUI; no fixed, named macro sequences are documented in the source. Runtime control:
#   - MACRO RUN {id}    run a macro
#   - MACRO STOP [{id}] stop one or all macros
# Extended macros: IDs 16-30 on EU units, 17-32 on US units.
# Timing: 100ms inter-command delay is default; >=500ms recommended for reliable transmission.

# UNRESOLVED: no pre-authored macro sequences to enumerate; macro storage is dynamic (up to 128
# commands if each <128 chars, fewer if strings are longer).
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or power-on
# sequencing requirements. Never inferred.
```

## Notes
- Control interface is Telnet over TCP, port 23 (default). Connect with `telnet <unit-ip> 23`. Factory-default unit IP is `192.168.1.50` (static), subnet `255.255.255.0`.
- All Telnet commands require a trailing carriage return; SysCMD/Relay command data must be terminated with `\x0d\x0a` (CR+LF) or they will not execute. Commands are case-insensitive.
- The WebGUI (HTTP, default port 80) is a separate management interface with factory-default credentials `admin` / `adminpw`. It is not the control protocol covered by this spec's Telnet actions.
- The panel is a control *surface*: it emits command strings to external gear. The "Sample Ethernet Commands" in the source (e.g. `F0410410225000001??`, `login(admin,adminpw)...preset.take=1...logout`) are commands for **target** devices (tvONE C2-2855, C3-510), not for the 1T-CL-322 itself, and are therefore excluded from this spec's Actions.
- When controlling other tvONE gear from a macro, Telnet default is port 23 but "most tvONE products use port 10001" — target port is per-device and set in the macro's Telnet IP/Port fields.
- Button numbering differs by region: 1-15 (EU) / 1-16 (US); macro IDs 1-30 (EU) / 1-32 (US).

<!-- UNRESOLVED: exact response string formats for IPCONFIG/VER/HELP not shown verbatim. -->
<!-- UNRESOLVED: firmware version compatibility, hardware version, voltage/power specs not stated in this refined source. -->
<!-- UNRESOLVED: any binary/hex command framing beyond ASCII Telnet strings not documented. -->

## Provenance

```yaml
source_domains:
  - tvone.com
source_urls:
  - "https://tvone.com/filestore/Manuals-Other-Products/1T-CL-322%20Instruction%20and%20Operation%20Manual%20v1.1.pdf"
retrieved_at: 2026-07-01T08:31:59.543Z
last_checked_at: 2026-08-05T08:48:02.364Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:48:02.364Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec action commands (IPCONFIG, SIPMODE, SIPADDR, SNETMASK, SGATEWAY, VER, FADEFAULT, ETH_FADEFAULT, REBOOT, HELP?, HELP N, RELAY, CLOSE, OPEN, LEDBLUE, LEDRED, LEDBLUES, LEDREDS, LEDSHOW, BACKLIGHT, KEY_PRESS RELEASE/HOLD, MACRO RUN/STOP, @MACRO_FADEFAULT) match source verbatim, transport port 23 confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware/hardware version compatibility not stated; voltage/power specs not in this refined source; binary/hex framing for any non-ASCII payloads not documented."
- "exact response string formats for IPCONFIG/VER/HELP are not shown verbatim in source."
- "no independent variable registry documented in source; settable state is expressed as actions."
- "source does not describe any push/event mechanism from the panel."
- "no pre-authored macro sequences to enumerate; macro storage is dynamic (up to 128"
- "source contains no explicit safety warnings, interlock procedures, or power-on"
- "exact response string formats for IPCONFIG/VER/HELP not shown verbatim."
- "firmware version compatibility, hardware version, voltage/power specs not stated in this refined source."
- "any binary/hex command framing beyond ASCII Telnet strings not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
