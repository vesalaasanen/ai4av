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
last_checked_at: 2026-09-28T15:35:02.889Z
generated_at: 2026-09-28T15:35:02.889Z
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
  checked_at: 2026-09-28T15:35:02.889Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All20 documented message types represented; literal JSON field types, password rules and TCP transport match; unspecified payloads remain unknown. (8 unresolved item(s) noted in Known Gaps.)"
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
  type: password_md5  # From v3.0.0 send a password field; hash configured passwords with MD5, or send empty when unset.
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
  command: press
  label: Press Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name (see Keys table)
    - name: password
      type: string
      description: MD5 hash when configured in Listener; an empty password may be sent when not configured.

# pressSpecial - special keys
- id: pressSpecial
  command: pressSpecial
  label: Press Special Key
  kind: action
  params:
    - name: password
      type: string
  notes: "The message type is documented; additional required payload fields and types are UNRESOLVED in this source. The global password requirement still applies."

# combination - two keys
- id: combination
  command: combination
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
  command: trio
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
  command: quartet
  label: Key Quartet
  kind: action
  params:
    - name: password
      type: string
  notes: "The message type is documented; additional required payload fields and types are UNRESOLVED in this source. The global password requirement still applies."

# down - key down
- id: down
  command: down
  label: Key Down
  kind: action
  params:
    - name: password
      type: string
  notes: "The message type is documented; additional required payload fields and types are UNRESOLVED in this source. The global password requirement still applies."

# up - key up
- id: up
  command: up
  label: Key Up
  kind: action
  params:
    - name: password
      type: string
  notes: "The message type is documented; additional required payload fields and types are UNRESOLVED in this source. The global password requirement still applies."

# processOSX - send keys to mac process via AppleScript
- id: processOSX
  command: processOSX
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
  command: string
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
  command: shell
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
  command: file
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
  command: mousePosition
  label: Set Mouse Position
  kind: action
  params:
    - name: x
      type: string
      description: Coordinate encoded as a JSON string in the example ("500"); range is UNRESOLVED.
    - name: y
      type: string
      description: Coordinate encoded as a JSON string in the example ("500"); range is UNRESOLVED.
    - name: password
      type: string

# mouseClick - simulate mouse click
- id: mouseClick
  command: mouseClick
  label: Mouse Click
  kind: action
  params:
    - name: button
      type: string
      description: Source example uses "left"; other literal button values are UNRESOLVED.
    - name: double
      type: string
      description: Source example encodes the single-click value as the string "false"; double-click capability is stated but its literal value is UNRESOLVED.
    - name: password
      type: string

# mouseClickHold - hold mouse button
- id: mouseClickHold
  command: mouseClickHold
  label: Mouse Button Hold
  kind: action
  params:
    - name: button
      type: string
      description: Source example uses "left"; other literal button values are UNRESOLVED.
    - name: password
      type: string

# mouseClickRelease - release mouse button
- id: mouseClickRelease
  command: mouseClickRelease
  label: Mouse Button Release
  kind: action
  params:
    - name: button
      type: string
      description: Source example uses "left"; other literal button values are UNRESOLVED.
    - name: password
      type: string

# mouseScroll - scroll mouse wheel
- id: mouseScroll
  command: mouseScroll
  notes: "Source example encodes vertical and horizontal as JSON strings (3 and 0 respectively); allowed ranges are UNRESOLVED."
  label: Mouse Scroll
  kind: action
  params:
    - name: vertical
      type: string
    - name: horizontal
      type: string
    - name: password
      type: string

# setWindowToForeGround - bring window to foreground (Windows only)
- id: setWindowToForeGround
  command: setWindowToForeGround
  label: Bring Window to Foreground
  kind: action
  params:
    - name: windowTitle
      type: string
    - name: password
      type: string

# subscribe - subscribe to information
- id: subscribe
  command: subscribe
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
  command: unsubscribe
  label: Unsubscribe
  kind: action
  params:
    - name: name
      type: string
    - name: password
      type: string
- id: getMousePosition
  command: getMousePosition
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
  description: Mouse cursor position is retrievable; response shape and coordinate wire types are UNRESOLVED.
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
VICREO Listener is a software application (not hardware). It runs on the host machine and simulates keyboard/mouse input and executes shell commands. From v3.0.0 requests require a password field: MD5-hash a configured password, or send an empty password when none is configured. The source also says to leave the Listener password empty for older connection methods. Port default 10001, configurable.

Modifier keys supported: alt, command (Windows key), ctrl, shift. Platform restrictions noted in keys table (Windows-only, macOS-only, Linux-only).

<!-- UNRESOLVED: subscription response format not documented -->
<!-- UNRESOLVED: pressSpecial parameters not fully specified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
Each Action `command` names the JSON `type` value. Payload fields are asserted only where source examples establish them. Strings shown as strings must not be silently converted to numeric or boolean JSON. TCP message framing beyond sending a JSON object is UNRESOLVED.

## Keys

The following keys are supported:

| Key | Description | Notes |
|-----|-------------|-------|
| backspace | Forward delete (delete key on extended keyboards) | |
| delete | Backspace key | |
| enter | Return/Enter key (main keyboard) | |
| tab | Tab key | |
| escape | Escape key | |
| up | Up arrow key | |
| down | Down arrow key | |
| right | Right arrow key | |
| left | Left arrow key | |
| home | Home key | |
| end | End key | |
| pageup | Page Up key | |
| pagedown | Page Down key | |
| f1 | Function key F1 | |
| f2 | Function key F2 | |
| f3 | Function key F3 | |
| f4 | Function key F4 | |
| f5 | Function key F5 | |
| f6 | Function key F6 | |
| f7 | Function key F7 | |
| f8 | Function key F8 | |
| f9 | Function key F9 | |
| f10 | Function key F10 | |
| f11 | Function key F11 | |
| f12 | Function key F12 | |
| f13 | Function key F13 | |
| f14 | Function key F14 | |
| f15 | Function key F15 | |
| f16 | Function key F16 | |
| f17 | Function key F17 | |
| f18 | Function key F18 | |
| f19 | Function key F19 | |
| f20 | Function key F20 | |
| command | Command key (⌘) | |
| alt | Option/Alt key | |
| right_alt | Right Option key | |
| control | Control key | |
| right_ctrl | Right Control key | |
| shift | Shift key | |
| right_shift | Right Shift key | |
| caps_lock | Caps Lock key | |
| fn | Function (fn) modifier key | |
| space | Space bar | |
| printscreen | Print Screen key | No Mac support |
| insert | Insert key | No Mac support |
| pause | Pause/Break key | Windows only |
| scrolllock | Scroll Lock key | Windows only |
| numlock | Num Lock key | Windows only |
| win | Windows key / Start key | Windows only |
| leftwindows | Left Windows key | Windows only |
| rightwindows | Right Windows key | Windows only |
| keypaddecimal | Keypad Decimal (.) | |
| keypadmultiply | Keypad Multiply (*) | |
| keypadplus | Keypad Plus (+) | |
| keypadclear | Keypad Clear | |
| keypaddivide | Keypad Divide (/) | |
| keypadenter | Keypad Enter | |
| keypadminus | Keypad Minus (-) | |
| keypadequals | Keypad Equals (=) | |
| numpad_0 | Numpad 0 | No Linux support |
| numpad_1 | Numpad 1 | No Linux support |
| numpad_2 | Numpad 2 | No Linux support |
| numpad_3 | Numpad 3 | No Linux support |
| numpad_4 | Numpad 4 | No Linux support |
| numpad_5 | Numpad 5 | No Linux support |
| numpad_6 | Numpad 6 | No Linux support |
| numpad_7 | Numpad 7 | No Linux support |
| numpad_8 | Numpad 8 | No Linux support |
| numpad_9 | Numpad 9 | No Linux support |
| leftmouse | Left mouse button | Windows only |
| rightmouse | Right mouse button | Windows only |
| middlemouse | Middle mouse button | Windows only |
| x1mouse | Extra mouse button 1 | Windows only |
| x2mouse | Extra mouse button 2 | Windows only |
| comma | Comma (,) | Windows only |
| asterisk | Asterisk (*) | Windows only |
| plus | Plus (+) | Windows only |
| pipe | Pipe (\|) | Windows only |
| minus | Minus (-) | Windows only |
| period | Period (.) | Windows only |
| slash | Forward slash (/) | Windows only |
| backslash | Backslash (\) | Windows only |
| audio_mute | Mute the volume | |
| audio_vol_down | Lower the volume | |
| audio_vol_up | Increase the volume | |
| audio_play | Play | |
| audio_stop | Stop | |
| audio_pause | Pause | |
| audio_prev | Previous Track | |
| audio_next | Next Track | |
| audio_rewind | Rewind (fast backward) | Linux only |
| audio_forward | Fast Forward | Linux only |
| audio_repeat | Repeat | Linux only |
| audio_random | Random (Shuffle) | Linux only |
| stop | Stop media playback | Windows only |
| play | Play media | Windows only |
| pause | Pause media | Windows only |
| launchpad | Launchpad key (opens Launchpad) | |
| missioncontrol | Mission Control key (opens Mission Control) | |
| lights_mon_down | Monitor brightness down | Alias for F14 on some keyboards |
| lights_mon_up | Monitor brightness up | Alias for F15 on some keyboards |

## Provenance

```yaml
source_domains:
  - vicreo-listener.com
source_urls:
  - https://www.vicreo-listener.com
retrieved_at: 2026-04-30T02:33:47.521Z
last_checked_at: 2026-09-28T15:35:02.889Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-28T15:35:02.889Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All20 documented message types represented; literal JSON field types, password rules and TCP transport match; unspecified payloads remain unknown. (8 unresolved item(s) noted in Known Gaps.)"
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
