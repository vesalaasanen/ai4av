---
spec_id: admin/tvone-1t-cl-322-us
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE 1T-CL-322-US Control Spec"
manufacturer: tvONE
model_family: 1T-CL-322-US
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - 1T-CL-322-US
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tvone.com
  - files.bzbexpress.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/MNL-1T-CL-322-V1.5-US.pdf
  - https://files.bzbexpress.com/files/attachments/2107/tv-one-control-systems-1t-cl-322-eu-manual.pdf
retrieved_at: 2026-06-30T08:59:25.906Z
last_checked_at: 2026-07-07T12:47:40.553Z
generated_at: 2026-07-07T12:47:40.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not describe a serial config (baud/parity) despite input protocol hint of RS-232C; this spec covers Telnet/UDP documented interface only."
  - "source documents query commands (IPCONFIG, VER) but does not state exact response format/syntax"
  - "source does not define discrete settable parameters beyond command payloads"
  - "source does not document unsolicited notifications"
  - "device supports macros (MACRO RUN N) but storage and editing procedures are GUI-based, not API-controllable"
  - "source does not contain safety warnings or interlock procedures"
  - "input metadata states \"RS-232C\" as known protocol, but source document describes Telnet/UDP only. No serial parameters (baud, parity, data bits) stated. Spec covers documented Telnet/UDP interface."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:47:40.553Z
  matched_actions: 21
  action_count: 21
  confidence: medium
  summary: "All 21 actions matched verbatim in source with correct shapes; transport parameters confirmed; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# tvONE 1T-CL-322-US Control Spec

## Summary
Control panel for AV equipment, controllable over Telnet or UDP on port 23. Supports network configuration, relay control, LED brightness, and macro execution. Web interface on port 80 with admin/adminpw login.

<!-- UNRESOLVED: source does not describe a serial config (baud/parity) despite input protocol hint of RS-232C; this spec covers Telnet/UDP documented interface only. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 23
auth:
  type: login
  # login credentials stated in source: username "admin", password "adminpw"
  login_command: "login(admin,adminpw)"
```

## Traits
```yaml
- powerable       # inferred from REBOOT command
- routable        # inferred from relay port control commands
- queryable       # inferred from IPCONFIG, VER query commands
```

## Actions
```yaml
- id: ipconfig
  label: Display IP Configuration
  kind: query
  command: "IPCONFIG"
  params: []

- id: sipmode
  label: Set Ethernet IP Mode
  kind: action
  command: "SIPMODE N"
  params:
    - name: mode
      type: enum
      values: [STATIC, DHCP]
      description: "STATIC or DHCP"

- id: sipaddr
  label: Set Ethernet IP Address
  kind: action
  command: "SIPADDR XXX.XXX.XXX.XXX"
  params:
    - name: octet1
      type: integer
      description: 0 to 255
    - name: octet2
      type: integer
      description: 0 to 255
    - name: octet3
      type: integer
      description: 0 to 255
    - name: octet4
      type: integer
      description: 0 to 255

- id: snetmask
  label: Set Ethernet Subnet Mask
  kind: action
  command: "SNETMASK XXX.XXX.XXX.XXX"
  params:
    - name: octet1
      type: integer
      description: 0 to 255
    - name: octet2
      type: integer
      description: 0 to 255
    - name: octet3
      type: integer
      description: 0 to 255
    - name: octet4
      type: integer
      description: 0 to 255

- id: sgateway
  label: Set Ethernet Gateway
  kind: action
  command: "SGATEWAY XXX.XXX.XXX.XXX"
  params:
    - name: octet1
      type: integer
      description: 0 to 255
    - name: octet2
      type: integer
      description: 0 to 255
    - name: octet3
      type: integer
      description: 0 to 255
    - name: octet4
      type: integer
      description: 0 to 255

- id: ver
  label: Show Firmware Version
  kind: query
  command: "VER"
  params: []

- id: fadefault
  label: Restore Factory Default Configuration
  kind: action
  command: "FADEFAULT"
  params: []

- id: eth_fadefault
  label: Restore Ethernet Factory Default
  kind: action
  command: "ETH_FADEFAULT"
  params: []

- id: reboot
  label: Reboot System
  kind: action
  command: "REBOOT"
  params: []

- id: help
  label: Show Full Command List
  kind: query
  command: "HELP (?)"
  params: []

- id: help_cmd
  label: Show Specific Command Description
  kind: query
  command: "HELP N"
  params:
    - name: command_name
      type: string
      description: Name of command to describe

- id: relay
  label: Control Relay Port
  kind: action
  command: "RELAY N N1"
  params:
    - name: port
      type: integer
      description: "Port 1 or 2"
    - name: state
      type: enum
      values: [OPEN, CLOSE, TOGGLE]
      description: "OPEN, CLOSE, or TOGGLE"

- id: ledblue
  label: Set Blue LED State for Specific Button
  kind: action
  command: "LEDBLUE N N1"
  params:
    - name: button
      type: integer
      description: "Button number 1-15/16"
    - name: percent
      type: integer
      description: "Brightness percent 0-100"

- id: ledred
  label: Set Red LED State for Specific Button
  kind: action
  command: "LEDRED N N1"
  params:
    - name: button
      type: integer
      description: "Button number 1-15/16"
    - name: percent
      type: integer
      description: "Brightness percent 0-100"

- id: ledblues
  label: Set All Blue LEDs
  kind: action
  command: "LEDBLUES N"
  params:
    - name: percent
      type: integer
      description: "Brightness percent 0-100"

- id: ledreds
  label: Set All Red LEDs
  kind: action
  command: "LEDREDS N"
  params:
    - name: percent
      type: integer
      description: "Brightness percent 0-100"

- id: ledshow
  label: Set All LEDs for Specific Button
  kind: action
  command: "LEDSHOW N"
  params:
    - name: state
      type: enum
      values: [ON, OFF, TOGGLE]
      description: "ON, OFF, or TOGGLE"

- id: backlight
  label: Set All LED Backlight
  kind: action
  command: "BACKLIGHT N"
  params:
    - name: percent
      type: integer
      description: "Brightness percent 0-100"

- id: macro_run
  label: Run Macro
  kind: action
  command: "MACRO RUN N"
  params:
    - name: macro
      type: integer
      description: "Macro number 1-30/32"

- id: macro_stop
  label: Stop Specific Macro
  kind: action
  command: "MACRO STOP N"
  params:
    - name: macro
      type: integer
      description: "Macro number 1-30/32"

- id: macro_stop_all
  label: Stop All Active Macros
  kind: action
  command: "MACRO STOP"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents query commands (IPCONFIG, VER) but does not state exact response format/syntax
```

## Variables
```yaml
# UNRESOLVED: source does not define discrete settable parameters beyond command payloads
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: device supports macros (MACRO RUN N) but storage and editing procedures are GUI-based, not API-controllable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not contain safety warnings or interlock procedures
```

## Notes
Commands not case-sensitive. Each command followed by carriage return (`\x0d`). Device also exposes web interface on port 80. Login credentials: admin/adminpw. tvONE products default port: 10001. Static factory default IP: 192.168.1.50, subnet mask 255.255.255.0. Source describes control panel functionality (relay/LED/macro/network) — not raw AV signal control.

<!-- UNRESOLVED: input metadata states "RS-232C" as known protocol, but source document describes Telnet/UDP only. No serial parameters (baud, parity, data bits) stated. Spec covers documented Telnet/UDP interface. -->

## Provenance

```yaml
source_domains:
  - tvone.com
  - files.bzbexpress.com
source_urls:
  - https://tvone.com/filestore/Manuals-Other-Products/MNL-1T-CL-322-V1.5-US.pdf
  - https://files.bzbexpress.com/files/attachments/2107/tv-one-control-systems-1t-cl-322-eu-manual.pdf
retrieved_at: 2026-06-30T08:59:25.906Z
last_checked_at: 2026-07-07T12:47:40.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:47:40.553Z
matched_actions: 21
action_count: 21
confidence: medium
summary: "All 21 actions matched verbatim in source with correct shapes; transport parameters confirmed; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not describe a serial config (baud/parity) despite input protocol hint of RS-232C; this spec covers Telnet/UDP documented interface only."
- "source documents query commands (IPCONFIG, VER) but does not state exact response format/syntax"
- "source does not define discrete settable parameters beyond command payloads"
- "source does not document unsolicited notifications"
- "device supports macros (MACRO RUN N) but storage and editing procedures are GUI-based, not API-controllable"
- "source does not contain safety warnings or interlock procedures"
- "input metadata states \"RS-232C\" as known protocol, but source document describes Telnet/UDP only. No serial parameters (baud, parity, data bits) stated. Spec covers documented Telnet/UDP interface."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
