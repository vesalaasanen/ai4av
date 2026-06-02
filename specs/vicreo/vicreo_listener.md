---
spec_id: admin/vicreo-listener
schema_version: ai4av-public-spec-v1
revision: 1
title: "VICREO Listener Control Spec"
manufacturer: VICREO
model_family: "VICREO Listener"
aliases: []
compatible_with:
  manufacturers:
    - VICREO
  models:
    - "VICREO Listener"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - vicreo-listener.com
source_urls:
  - https://www.vicreo-listener.com
retrieved_at: 2026-04-30T02:33:47.521Z
last_checked_at: 2026-06-02T22:16:05.437Z
generated_at: 2026-06-02T22:16:05.437Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device classification — this is a software automation tool, not hardware AV control module"
  - "source shows subscribe mechanism but response format not documented"
  - "subscription push events not documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings in source - software automation tool controls host directly; user responsible for command intent"
  - "subscription response format not documented"
  - "pressSpecial parameters not fully specified in source"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:16:05.437Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# VICREO Listener Control Spec

## Summary
VICREO Listener is a software hotkey automation tool that receives JSON commands over TCP on port 10001. It simulates keyboard input, mouse actions, shell commands, and file operations on the host machine.

<!-- UNRESOLVED: device classification — this is a software automation tool, not hardware AV control module -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 10001  # stated: configurable, default 10001
auth:
  type: password_md5  # stated: MD5 hash required from v3.0.0; empty password if not set
```

## Traits
```yaml
# inferred from source command types:
# - powerable: N/A (no power control)
# - routable: N/A (no I/O routing)
# - queryable: yes - getMousePosition, subscribe/unsubscribe
# - levelable: N/A
traits:
  - queryable
```

## Actions
```yaml
# press - simulate keypress
- id: press
  label: Press Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name (see Keys table)
    - name: password
      type: string
      description: MD5 hash of password

# pressSpecial - special keys
- id: pressSpecial
  label: Press Special Key
  kind: action
  params:
    - name: key
      type: string
    - name: password
      type: string

# combination - two keys
- id: combination
  label: Key Combination
  kind: action
  params:
    - name: key
      type: string
    - name: modifiers
      type: array
      items:
        type: string
      description: Modifier keys (alt, command, ctrl, shift)
    - name: password
      type: string

# trio - three keys
- id: trio
  label: Key Trio
  kind: action
  params:
    - name: key
      type: string
    - name: modifiers
      type: array
      items:
        type: string
    - name: password
      type: string

# quartet - four keys
- id: quartet
  label: Key Quartet
  kind: action
  params:
    - name: key
      type: string
    - name: modifiers
      type: array
      items:
        type: string
    - name: password
      type: string

# down - key down
- id: down
  label: Key Down
  kind: action
  params:
    - name: key
      type: string
    - name: password
      type: string

# up - key up
- id: up
  label: Key Up
  kind: action
  params:
    - name: key
      type: string
    - name: password
      type: string

# processOSX - send keys to mac process via AppleScript
- id: processOSX
  label: Send to Process (macOS)
  kind: action
  params:
    - name: key
      type: string
    - name: processName
      type: string
      description: Target application name
    - name: modifiers
      type: array
      items:
        type: string
    - name: password
      type: string

# string - type a string
- id: string
  label: Type String
  kind: action
  params:
    - name: msg
      type: string
      description: String to type
    - name: password
      type: string

# shell - perform shell command
- id: shell
  label: Shell Command
  kind: action
  params:
    - name: shell
      type: string
      description: Shell command to execute
    - name: password
      type: string

# file - open a file
- id: file
  label: Open File
  kind: action
  params:
    - name: path
      type: string
      description: File path to open
    - name: password
      type: string

# mousePosition - set cursor position
- id: mousePosition
  label: Set Mouse Position
  kind: action
  params:
    - name: x
      type: integer
    - name: y
      type: integer
    - name: password
      type: string

# mouseClick - simulate mouse click
- id: mouseClick
  label: Mouse Click
  kind: action
  params:
    - name: button
      type: string
      enum: [left, right, middle]
    - name: double
      type: boolean
    - name: password
      type: string

# mouseClickHold - hold mouse button
- id: mouseClickHold
  label: Mouse Button Hold
  kind: action
  params:
    - name: button
      type: string
      enum: [left, right, middle]
    - name: password
      type: string

# mouseClickRelease - release mouse button
- id: mouseClickRelease
  label: Mouse Button Release
  kind: action
  params:
    - name: button
      type: string
      enum: [left, right, middle]
    - name: password
      type: string

# mouseScroll - scroll mouse wheel
- id: mouseScroll
  label: Mouse Scroll
  kind: action
  params:
    - name: vertical
      type: integer
    - name: horizontal
      type: integer
    - name: password
      type: string

# setWindowToForeGround - bring window to foreground (Windows only)
- id: setWindowToForeGround
  label: Bring Window to Foreground
  kind: action
  params:
    - name: windowTitle
      type: string
    - name: password
      type: string

# subscribe - subscribe to information
- id: subscribe
  label: Subscribe
  kind: action
  params:
    - name: name
      type: string
      description: Information type to subscribe to (e.g. mousePosition)
    - name: password
      type: string

# unsubscribe - unsubscribe from information
- id: unsubscribe
  label: Unsubscribe
  kind: action
  params:
    - name: name
      type: string
    - name: password
      type: string
- id: getMousePosition
  label: Get Mouse Position
  kind: query
  params:
    - name: password
      type: string
```

## Feedbacks
```yaml
# UNRESOLVED: source shows subscribe mechanism but response format not documented
```

## Variables
```yaml
# getMousePosition - query current cursor position
- id: mousePosition
  label: Mouse Position
  kind: variable
  type: object
  properties:
    x:
      type: integer
    y:
      type: integer
```

## Events
```yaml
# UNRESOLVED: subscription push events not documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source - software automation tool controls host directly; user responsible for command intent
```

## Notes
VICREO Listener is a software application (not hardware). It runs on the host machine and simulates keyboard/mouse input and executes shell commands. Auth is MD5 password (required from v3.0.0; empty string if no password configured). Port default 10001, configurable.

Modifier keys supported: alt, command (Windows key), ctrl, shift. Platform restrictions noted in keys table (Windows-only, macOS-only, Linux-only).

<!-- UNRESOLVED: subscription response format not documented -->
<!-- UNRESOLVED: pressSpecial parameters not fully specified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - vicreo-listener.com
source_urls:
  - https://www.vicreo-listener.com
retrieved_at: 2026-04-30T02:33:47.521Z
last_checked_at: 2026-06-02T22:16:05.437Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:16:05.437Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device classification — this is a software automation tool, not hardware AV control module"
- "source shows subscribe mechanism but response format not documented"
- "subscription push events not documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings in source - software automation tool controls host directly; user responsible for command intent"
- "subscription response format not documented"
- "pressSpecial parameters not fully specified in source"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
