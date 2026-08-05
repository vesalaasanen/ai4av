---
spec_id: admin/rane-rad16z
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rane RAD16z Control Spec"
manufacturer: Rane
model_family: RAD16z
aliases: []
compatible_with:
  manufacturers:
    - Rane
  models:
    - RAD16z
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ranecommercial.com
source_urls:
  - https://www.ranecommercial.com/legacy/pdf/HAL_External_Control_Message_Protocol.pdf
  - https://www.ranecommercial.com/legacy/pdf/CrestronControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/pdf/AMXControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/pdf/StardrawControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/hal/documents.html
retrieved_at: 2026-07-13T20:28:37.590Z
last_checked_at: 2026-07-22T00:42:06.345Z
generated_at: 2026-07-22T00:42:06.345Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Source provided (\"known protocol: RS-232C\") names serial, but the refined document contains no RS-232/serial electrical parameters (baud, data bits, parity, stop bits). Serial transport config cannot be populated from this source."
  - "RAD16z-specific hardware identity (model confirmed only from task metadata; source text titled \"HAL External Control Message Protocol\" is a generic HAL-family protocol doc)."
  - "No power on/off, input routing, or device-level hardware commands documented — all messages operate on Halogen/HAL external control abstractions, not raw device hardware."
  - "base URL not applicable (Telnet, not HTTP); host IP is device-specific."
  - "baud rate not stated in source (RS-232C claimed but no params)"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "maximum selection count not bounded in source."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing."
  - "RAD16z-specific serial (RS-232C) parameters not present in this refined source despite \"known protocol\" hint."
  - "No power management, audio routing matrix, or DSP parameter (EQ, gain structure) commands documented here — source covers the generic HAL external-control abstraction layer only."
verification:
  verdict: verified
  checked_at: 2026-07-22T00:42:06.345Z
  matched_actions: 32
  action_count: 32
  confidence: medium
  summary: "All 32 spec actions matched verbatim in source tables. Transport (TCP port 4996) verified. Complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-13
---

# Rane RAD16z Control Spec

## Summary
The Rane RAD16z is controlled via the HAL External Control Message Protocol, an ASCII text-based protocol where each message is wrapped in `<` `>` delimiters and parts are separated by `&`. The source documents a Telnet/TCP control server on port 4996 used to drive Level, Toggle, Selector, and Command external controls. Control numbers are assigned per-control in the Halogen External Control Systems dialog.

<!-- UNRESOLVED: Source provided ("known protocol: RS-232C") names serial, but the refined document contains no RS-232/serial electrical parameters (baud, data bits, parity, stop bits). Serial transport config cannot be populated from this source. -->
<!-- UNRESOLVED: RAD16z-specific hardware identity (model confirmed only from task metadata; source text titled "HAL External Control Message Protocol" is a generic HAL-family protocol doc). -->
<!-- UNRESOLVED: No power on/off, input routing, or device-level hardware commands documented — all messages operate on Halogen/HAL external control abstractions, not raw device hardware. -->

## Transport
```yaml
# Source explicitly describes a TCP/Telnet control server on port 4996 (ASCII text).
# The supplied "known protocol: RS-232C" hint has NO supporting serial parameters in
# this source; serial config marked UNRESOLVED below rather than fabricated.
protocols:
  - tcp
# serial claimed in task metadata but UNRESOLVED in source - see note.
addressing:
  port: 4996
  # UNRESOLVED: base URL not applicable (Telnet, not HTTP); host IP is device-specific.
auth:
  type: none  # inferred: no login/password/auth procedure in source
serial:
  baud_rate: null   # UNRESOLVED: baud rate not stated in source (RS-232C claimed but no params)
  data_bits: null   # UNRESOLVED: data bits not stated in source
  parity: null      # UNRESOLVED: parity not stated in source
  stop_bits: null   # UNRESOLVED: stop bits not stated in source
  flow_control: null # UNRESOLVED: flow control not stated in source
```

## Traits
```yaml
# queryable: get messages return current control values (<?>, <L&n>, <T&n>, <S&n>, etc.)
# levelable: Level external controls accept 0-1000 (0.0-100.0%) set/increment/decrement
traits:
  - queryable  # inferred from get-level/get-toggle/get-selection query examples
  - levelable  # inferred from Level control set/increment/decrement command examples
```

## Actions
```yaml
# Each row below mirrors a distinct message format row in the source.
# Variable parts: n = control number, v = value, string = label/name, i = item index, x = count.
# The HAL server ignores case and whitespace outside message bodies.

# --- All Controls ---
- id: get_all_values
  label: Get All Values
  kind: query
  command: "<?>"
  params: []
  notes: Request current values of all controls in the configuration.

# --- Level Controls ---
- id: level_get
  label: Get Level
  kind: query
  command: "<L&{n}>"
  params:
    - name: n
      type: integer
      description: Level control number assigned in Halogen External Control Systems dialog.
- id: level_set
  label: Set Level
  kind: action
  command: "<L&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Level control number.
    - name: v
      type: integer
      description: Level value, range 0 to 1000 (0.0% to 100.0%).
- id: level_increment
  label: Increment Level
  kind: action
  command: "<L&{n}&+{v}>"
  params:
    - name: n
      type: integer
      description: Level control number.
    - name: v
      type: integer
      description: Increment amount, range 0 to 1000. Result clamped to 0-100%.
- id: level_decrement
  label: Decrement Level
  kind: action
  command: "<L&{n}&-{v}>"
  params:
    - name: n
      type: integer
      description: Level control number.
    - name: v
      type: integer
      description: Decrement amount, range 0 to 1000. Result clamped to 0-100%.
- id: level_label_get
  label: Get Level Label
  kind: query
  command: "<LA&{n}>"
  params:
    - name: n
      type: integer
      description: Level control number.
- id: level_label_set
  label: Set Level Label
  kind: action
  command: "<LA&{n}&{string}>"
  params:
    - name: n
      type: integer
      description: Level control number.
    - name: string
      type: string
      description: Label text. Source examples prefix with '-' (e.g. <LA&1&-Volume>).
- id: level_enable_get
  label: Get Level Enable
  kind: query
  command: "<LE&{n}>"
  params:
    - name: n
      type: integer
      description: Level control number.
- id: level_enable_set
  label: Set Level Enable
  kind: action
  command: "<LE&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Level control number.
    - name: v
      type: integer
      description: 0 (disabled) or 1 (enabled).

# --- Toggle Controls ---
- id: toggle_get
  label: Get Toggle
  kind: query
  command: "<T&{n}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
- id: toggle_set
  label: Set Toggle
  kind: action
  command: "<T&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
    - name: v
      type: integer
      description: 0 (unchecked) or 1 (checked).
- id: toggle_label_get
  label: Get Toggle Label
  kind: query
  command: "<TA&{n}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
- id: toggle_label_set
  label: Set Toggle Label
  kind: action
  command: "<TA&{n}&{string}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
    - name: string
      type: string
      description: Label text.
- id: toggle_enable_get
  label: Get Toggle Enable
  kind: query
  command: "<TE&{n}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
- id: toggle_enable_set
  label: Set Toggle Enable
  kind: action
  command: "<TE&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Toggle control number.
    - name: v
      type: integer
      description: 0 (disabled) or 1 (enabled).

# --- Selector Controls ---
- id: selector_get
  label: Get Selection
  kind: query
  command: "<S&{n}>"
  params:
    - name: n
      type: integer
      description: Select control number.
- id: selector_set
  label: Set Selection
  kind: action
  command: "<S&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Select control number.
    - name: v
      type: integer
      description: Selection value, range 0 to (number_of_selections - 1).
- id: selector_link_get
  label: Get Selection Link
  kind: query
  command: "<SL&{n}>"
  params:
    - name: n
      type: integer
      description: Select control number.
- id: selector_link_set
  label: Set Selection Link
  kind: action
  command: "<SL&{n}&{x}>"
  params:
    - name: n
      type: integer
      description: Select control number.
    - name: x
      type: integer
      description: Number of selections (0 = link inactive). Source notes it is not meaningful to send to HAL; HAL emits this on link change.
- id: selector_name_get
  label: Get Selection Name
  kind: query
  command: "<SN&{n}&{i}>"
  params:
    - name: n
      type: integer
      description: Select control number.
    - name: i
      type: integer
      description: Selection item index, range 0 to (number_of_selections - 1).
- id: selector_name_set
  label: Set Selection Name
  kind: action
  command: "<SN&{n}&{v}&{string}>"
  params:
    - name: n
      type: integer
      description: Select control number.
    - name: v
      type: integer
      description: Selection value, range 0 to (number_of_selections - 1).
    - name: string
      type: string
      description: Display name for selection v. Source notes it is not meaningful to send to HAL; HAL emits on change.
- id: selector_label_get
  label: Get Selector Label
  kind: query
  command: "<SA&{n}>"
  params:
    - name: n
      type: integer
      description: Selector control number.
- id: selector_label_set
  label: Set Selector Label
  kind: action
  command: "<SA&{n}&{string}>"
  params:
    - name: n
      type: integer
      description: Selector control number.
    - name: string
      type: string
      description: Label text.
- id: selector_enable_get
  label: Get Selector Enable
  kind: query
  command: "<SE&{n}>"
  params:
    - name: n
      type: integer
      description: Selector control number.
- id: selector_enable_set
  label: Set Selector Enable
  kind: action
  command: "<SE&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Selector control number.
    - name: v
      type: integer
      description: 0 (disabled) or 1 (enabled).

# --- Command Controls ---
- id: command_fire
  label: Fire Command
  kind: action
  command: "<C&{n}>"
  params:
    - name: n
      type: integer
      description: Command control number.
- id: command_label_get
  label: Get Command Label
  kind: query
  command: "<CA&{n}>"
  params:
    - name: n
      type: integer
      description: Command control number.
- id: command_label_set
  label: Set Command Label
  kind: action
  command: "<CA&{n}&{string}>"
  params:
    - name: n
      type: integer
      description: Command control number.
    - name: string
      type: string
      description: Label text.
- id: command_enable_get
  label: Get Command Enable
  kind: query
  command: "<CE&{n}>"
  params:
    - name: n
      type: integer
      description: Command control number.
- id: command_enable_set
  label: Set Command Enable
  kind: action
  command: "<CE&{n}&{v}>"
  params:
    - name: n
      type: integer
      description: Command control number.
    - name: v
      type: integer
      description: 0 (disabled) or 1 (enabled).

# --- Communications Monitoring ---
- id: ping
  label: Ping
  kind: action
  command: "<PING>"
  params: []
  notes: Request a PONG from HAL.
- id: pong
  label: Pong
  kind: action
  command: "<PONG>"
  params: []
  notes: Source states it is not meaningful to send PONG to HAL; HAL emits this in response to PING.
```

## Feedbacks
```yaml
# HAL emits set-form messages in response to gets AND whenever a control changes.
# These observable state values are reported back to all connected clients.
- id: level_value
  type: string
  description: "<L&n&v> emitted by HAL on get-response and on level change."
- id: level_label
  type: string
  description: "<LA&n&string> emitted by HAL on get-response and on label change."
- id: level_enable
  type: enum
  values: [0, 1]
  description: "<LE&n&v> emitted on get-response and on enable change."
- id: toggle_value
  type: enum
  values: [0, 1]
  description: "<T&n&v> emitted on get-response and on toggle change."
- id: toggle_label
  type: string
  description: "<TA&n&string> emitted on get-response and on label change."
- id: toggle_enable
  type: enum
  values: [0, 1]
  description: "<TE&n&v> emitted on get-response and on enable change."
- id: selector_value
  type: integer
  description: "<S&n&v> emitted on get-response and on selection change."
- id: selector_link
  type: integer
  description: "<SL&n&x> emitted on get-response and on link activation change."
- id: selector_name
  type: string
  description: "<SN&n&v&string> emitted on get-response, link change, and name change."
- id: selector_label
  type: string
  description: "<SA&n&string> emitted on get-response and on label change."
- id: selector_enable
  type: enum
  values: [0, 1]
  description: "<SE&n&v> emitted on get-response and on enable change."
- id: command_label
  type: string
  description: "<CA&n&string> emitted on get-response and on label change."
- id: command_enable
  type: enum
  values: [0, 1]
  description: "<CE&n&v> emitted on get-response and on enable change."
- id: command_fired
  type: integer
  description: "<C&n> emitted by HAL whenever a Command external control fires."
- id: pong_response
  type: string
  description: "<PONG> emitted by HAL in response to <PING>."
- id: all_values_response
  type: string
  description: "Multi-message response to <?> containing current values of all controls."
```

## Variables
```yaml
# Settable parameter values. The set-form actions above carry these; this section
# captures the parameter domains explicitly.
- id: level_value
  type: integer
  range: [0, 1000]
  description: Level control value, 0-1000 mapping to 0.0-100.0%.
- id: toggle_value
  type: enum
  values: [0, 1]
  description: 0 = unchecked, 1 = checked.
- id: selector_value
  type: integer
  description: Range 0 to (selection_count - 1); upper bound is runtime-dependent.
  # UNRESOLVED: maximum selection count not bounded in source.
- id: enable_value
  type: enum
  values: [0, 1]
  description: 0 = disabled, 1 = enabled (applies to Level/Toggle/Selector/Command enable).
```

## Events
```yaml
# Unsolicited notifications HAL sends to all connected clients.
- id: control_change_broadcast
  description: "On any external control change, HAL broadcasts the matching set-form message to ALL connected clients."
- id: command_fire_broadcast
  description: "<C&n> broadcast whenever a Command external control fires."
- id: pong_broadcast
  description: "<PONG> sent in response to a <PING>."
- id: selection_link_change
  description: "<SL&n&x> and <SN&...> emitted whenever selector link activation or names change."
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing.
```

## Notes
- The control server ignores case of alpha characters and all whitespace (space, tab, CR, LF) outside message bodies; characters outside `<...>` are ignored.
- Multiple external control clients may connect simultaneously; HAL broadcasts changes to all of them.
- Control numbers (`n`) are configuration-defined in the Halogen External Control Systems dialog — they are NOT fixed hardware addresses and vary per configuration file.
- Connection per source: Telnet to port 4996 (Halogen uses `localhost`; HAL uses the device's configured IP, e.g. `10.0.0.113`).
- The `-` prefix in set-label examples (e.g. `<LA&1&-Volume>`) appears in the source verbatim; treat the dash as part of the documented payload convention.
<!-- UNRESOLVED: RAD16z-specific serial (RS-232C) parameters not present in this refined source despite "known protocol" hint. -->
<!-- UNRESOLVED: No power management, audio routing matrix, or DSP parameter (EQ, gain structure) commands documented here — source covers the generic HAL external-control abstraction layer only. -->
```

## Provenance

```yaml
source_domains:
  - ranecommercial.com
source_urls:
  - https://www.ranecommercial.com/legacy/pdf/HAL_External_Control_Message_Protocol.pdf
  - https://www.ranecommercial.com/legacy/pdf/CrestronControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/pdf/AMXControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/pdf/StardrawControlSystems_Guide.pdf
  - https://www.ranecommercial.com/legacy/hal/documents.html
retrieved_at: 2026-07-13T20:28:37.590Z
last_checked_at: 2026-07-22T00:42:06.345Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:42:06.345Z
matched_actions: 32
action_count: 32
confidence: medium
summary: "All 32 spec actions matched verbatim in source tables. Transport (TCP port 4996) verified. Complete bidirectional coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source provided (\"known protocol: RS-232C\") names serial, but the refined document contains no RS-232/serial electrical parameters (baud, data bits, parity, stop bits). Serial transport config cannot be populated from this source."
- "RAD16z-specific hardware identity (model confirmed only from task metadata; source text titled \"HAL External Control Message Protocol\" is a generic HAL-family protocol doc)."
- "No power on/off, input routing, or device-level hardware commands documented — all messages operate on Halogen/HAL external control abstractions, not raw device hardware."
- "base URL not applicable (Telnet, not HTTP); host IP is device-specific."
- "baud rate not stated in source (RS-232C claimed but no params)"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "maximum selection count not bounded in source."
- "source documents no multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing."
- "RAD16z-specific serial (RS-232C) parameters not present in this refined source despite \"known protocol\" hint."
- "No power management, audio routing matrix, or DSP parameter (EQ, gain structure) commands documented here — source covers the generic HAL external-control abstraction layer only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
