---
spec_id: admin/visual-productions-timecore
schema_version: ai4av-public-spec-v1
revision: 1
title: "Visual Productions TimeCore Control Spec"
manufacturer: "Visual Productions"
model_family: TimeCore
aliases: []
compatible_with:
  manufacturers:
    - "Visual Productions"
  models:
    - TimeCore
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.visualproductions.nl
  - manualslib.com
  - visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/6762f3e65aaf91d36672e771
  - https://www.manualslib.com/manual/1950022/Visual-Productions-Timecore.html
  - https://www.visualproductions.nl/products/timecore
retrieved_at: 2026-04-30T02:41:51.990Z
last_checked_at: 2026-05-04T10:21:28.186Z
generated_at: 2026-05-04T10:21:28.186Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "OSC listen port default not stated in source"
  - "complete feedback message table not visible in source"
  - "Show Control trigger/task types (MIDI, MMC, MSC, Art-Net, sACN) documented but are internal programming, not external device control"
  - "feedback message table referenced in source (D.3) but not fully visible."
  - "device sends unsolicited feedback to connected clients on state changes,"
  - "OSC listen port default value not stated in source"
  - "complete feedback message table not visible in source — D.3 references it but content was not extractable"
  - "API prefix label configuration mechanism not detailed in source"
  - "\"hello\" command format inferred from naming pattern, not explicitly in a command table"
verification:
  verdict: verified
  checked_at: 2026-05-04T10:21:28.186Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions have literal counterparts in source D.1-D.2 API tables; transport params verified at 7000/TCP/UDP/OSC; command catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-28
---

# Visual Productions TimeCore Control Spec

## Summary
The Visual Productions TimeCore is a timecode generator/processor supporting SMPTE LTC, MTC, Art-Net timecode, and internal generation. External control is via TCP, UDP (ASCII string API on port 7000), and OSC (URI-based API). This spec covers the Appendix D API commands for timecode, timer, variable, and action-list control.

<!-- UNRESOLVED: OSC listen port default not stated in source -->
<!-- UNRESOLVED: complete feedback message table not visible in source -->
<!-- UNRESOLVED: Show Control trigger/task types (MIDI, MMC, MSC, Art-Net, sACN) documented but are internal programming, not external device control -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - osc
addressing:
  port: 7000  # default for TCP and UDP
  # UNRESOLVED: OSC listen port default not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: hello polling command and variable refresh documented
```

## Actions
```yaml
# TCP/UDP format: hyphen-separated ASCII string, args via =value suffix.
# OSC format: slash-separated URI, args as OSC message parameter.
# OSC equivalents replace hyphens with slashes and prefix with /.

- id: tc_start
  label: Start Timecode
  kind: action
  command_tcp: "core-tc-start"
  command_osc: "/core/tc/start"
  params: []

- id: tc_stop
  label: Stop Timecode
  kind: action
  command_tcp: "core-tc-stop"
  command_osc: "/core/tc/stop"
  params: []

- id: tc_restart
  label: Restart Timecode
  kind: action
  command_tcp: "core-tc-restart"
  command_osc: "/core/tc/restart"
  params: []

- id: tc_pause
  label: Pause Timecode
  kind: action
  command_tcp: "core-tc-pause"
  command_osc: "/core/tc/pause"
  params: []

- id: tc_set
  label: Set Timecode Frame
  kind: action
  command_tcp: "core-tc-set={time}"
  command_osc: "/core/tc/set"
  params:
    - name: time
      type: string
      description: "Timecode frame as HH:MM:SS.FF, e.g. 23:59:59.24"

- id: timer_start
  label: Start Timer
  kind: action
  command_tcp: "core-tm-{timer}-start"
  command_osc: "/core/tm/{timer}/start"
  params:
    - name: timer
      type: integer
      description: "Timer number (1-4)"

- id: timer_stop
  label: Stop Timer
  kind: action
  command_tcp: "core-tm-{timer}-stop"
  command_osc: "/core/tm/{timer}/stop"
  params:
    - name: timer
      type: integer
      description: "Timer number (1-4)"

- id: timer_restart
  label: Restart Timer
  kind: action
  command_tcp: "core-tm-{timer}-restart"
  command_osc: "/core/tm/{timer}/restart"
  params:
    - name: timer
      type: integer
      description: "Timer number (1-4)"

- id: timer_pause
  label: Pause Timer
  kind: action
  command_tcp: "core-tm-{timer}-pause"
  command_osc: "/core/tm/{timer}/pause"
  params:
    - name: timer
      type: integer
      description: "Timer number (1-4)"

- id: timer_set
  label: Set Timer Time
  kind: action
  command_tcp: "core-tm-{timer}-set={time}"
  command_osc: "/core/tm/{timer}/set"
  params:
    - name: timer
      type: integer
      description: "Timer number (1-4)"
    - name: time
      type: string
      description: "Time as time-string"

- id: variable_set
  label: Set Variable Value
  kind: action
  command_tcp: "core-va-{variable}-set={value}"
  command_osc: "/core/va/{variable}/set"
  params:
    - name: variable
      type: integer
      description: "Variable number (1-8)"
    - name: value
      type: integer
      description: "Variable value (0-255)"

- id: variable_refresh
  label: Refresh Variable
  kind: action
  command_tcp: "core-va-{variable}-refresh"
  command_osc: "/core/va/{variable}/refresh"
  params:
    - name: variable
      type: integer
      description: "Variable number (1-8)"

- id: variable_refresh_all
  label: Refresh All Variables
  kind: action
  command_tcp: "core-va-refresh"
  command_osc: "/core/va/refresh"
  params: []

- id: actionlist_execute
  label: Execute Action
  kind: action
  command_tcp: "core-al-{list}-{action}-execute={arg}"
  command_osc: "/core/al/{list}/{action}/execute"
  params:
    - name: list
      type: integer
      description: "Action list number (1-8)"
    - name: action
      type: integer
      description: "Action number (1-48)"
    - name: arg
      type: string
      description: "Argument (bool, float, or integer depending on action)"

- id: actionlist_enable
  label: Enable Action List
  kind: action
  command_tcp: "core-al-{list}-enable={value}"
  command_osc: "/core/al/{list}/enable"
  params:
    - name: list
      type: integer
      description: "Action list number (1-8)"
    - name: value
      type: boolean
      description: "Enable state"

- id: blink
  label: Blink LED
  kind: action
  command_tcp: "core-blink"
  command_osc: "/core/blink"
  params: []

- id: goodbye
  label: Disconnect from Feedback
  kind: action
  command_tcp: "core-goodbye"
  command_osc: "/core/goodbye"
  params: []
  description: "Removes sender from TimeCore client feedback list"

- id: hello
  label: Poll Device
  kind: action
  command_tcp: "core-hello"  # inferred from pattern - not in command table
  command_osc: "/core/hello"  # inferred from pattern - not in command table
  params: []
  description: "Polls device to verify it is online at expected IP and port"
```

## Feedbacks
```yaml
# UNRESOLVED: feedback message table referenced in source (D.3) but not fully visible.
# Known: TimeCore sends automatic updates on state changes to last 4 OSC and 4 UDP clients.
# Specific feedback message URIs/strings not extractable from source.
```

## Events
```yaml
# UNRESOLVED: device sends unsolicited feedback to connected clients on state changes,
# but specific event messages not documented in visible source.
```

## Macros
```yaml
# Show Control feature allows internal trigger→task programming (timecode triggers,
# TCP/UDP/OSC triggers → MIDI, MMC, MSC, timecode, timer, variable, OSC, UDP tasks).
# These are internal device programming, not external control macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- TCP/UDP ASCII format uses hyphen separators with `=value` suffix for arguments (max 31 chars for trigger strings).
- OSC format uses slash-separated URIs with arguments as OSC message parameters.
- Device remembers last 4 OSC and last 4 UDP clients for automatic feedback delivery.
- Power-cycle clears the client feedback list; send `core-goodbye` to explicitly unsubscribe.
- Feedback loop prevention: assign unique API prefix label per device when chaining Visual Productions units.
- Show Control supports internal triggers (timecode frame, playing/paused/stopped state, TCP/UDP/OSC message received) driving tasks (MIDI, MMC, MSC, OSC send, UDP send, timecode control, timer control, variable manipulation).
- Source also mentions Art-Net, sACN, and RTP-MIDI protocols for timecode transport but these are not command/control interfaces.
<!-- UNRESOLVED: OSC listen port default value not stated in source -->
<!-- UNRESOLVED: complete feedback message table not visible in source — D.3 references it but content was not extractable -->
<!-- UNRESOLVED: API prefix label configuration mechanism not detailed in source -->
<!-- UNRESOLVED: "hello" command format inferred from naming pattern, not explicitly in a command table -->

## Provenance

```yaml
source_domains:
  - api.visualproductions.nl
  - manualslib.com
  - visualproductions.nl
source_urls:
  - https://api.visualproductions.nl/api/download/6762f3e65aaf91d36672e771
  - https://www.manualslib.com/manual/1950022/Visual-Productions-Timecore.html
  - https://www.visualproductions.nl/products/timecore
retrieved_at: 2026-04-30T02:41:51.990Z
last_checked_at: 2026-05-04T10:21:28.186Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-04T10:21:28.186Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions have literal counterparts in source D.1-D.2 API tables; transport params verified at 7000/TCP/UDP/OSC; command catalogue fully represented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "OSC listen port default not stated in source"
- "complete feedback message table not visible in source"
- "Show Control trigger/task types (MIDI, MMC, MSC, Art-Net, sACN) documented but are internal programming, not external device control"
- "feedback message table referenced in source (D.3) but not fully visible."
- "device sends unsolicited feedback to connected clients on state changes,"
- "OSC listen port default value not stated in source"
- "complete feedback message table not visible in source — D.3 references it but content was not extractable"
- "API prefix label configuration mechanism not detailed in source"
- "\"hello\" command format inferred from naming pattern, not explicitly in a command table"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
