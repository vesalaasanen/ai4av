---
spec_id: admin/simaudio-moon-stellar
schema_version: ai4av-public-spec-v1
revision: 1
title: "SimAudio Moon Stellar Control Spec"
manufacturer: SimAudio
model_family: "Moon Stellar"
aliases: []
compatible_with:
  manufacturers:
    - SimAudio
  models:
    - "Moon Stellar"
    - "Moon Orion"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - simaudio.com
source_urls:
  - https://simaudio.com/wp-content/uploads/2019/11/Moon-Stellar-Orion-RS232codesrev101.pdf
retrieved_at: 2026-04-30T04:29:04.648Z
last_checked_at: 2026-06-02T22:14:36.990Z
generated_at: 2026-06-02T22:14:36.990Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "unsolicited event notifications not documented"
  - "traits inferred from command examples"
  - "no settable parameters documented beyond discrete commands"
  - "no unsolicited notifications documented"
  - "no multi-step sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "variables, events, macros sections not applicable or not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:36.990Z
  matched_actions: 42
  action_count: 42
  confidence: medium
  summary: "All 42 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# SimAudio Moon Stellar Control Spec

## Summary
The SimAudio Moon Stellar is a DVD player controlled via RS-232 serial interface at 9600 baud, 8-N-1, no handshake. The protocol uses 10-character ASCII command strings prefixed with model code "SIM22" where the 6th character distinguishes command ("C") from status request ("S").

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: unsolicited event notifications not documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: traits inferred from command examples
# - powerable: standby toggle command present
# - queryable: status request commands present (S prefix)
```

## Actions
```yaml
- id: numeric_0
  label: Numeric 0
  kind: action
  params: []

- id: numeric_1
  label: Numeric 1
  kind: action
  params: []

- id: numeric_2
  label: Numeric 2
  kind: action
  params: []

- id: numeric_3
  label: Numeric 3
  kind: action
  params: []

- id: numeric_4
  label: Numeric 4
  kind: action
  params: []

- id: numeric_5
  label: Numeric 5
  kind: action
  params: []

- id: numeric_6
  label: Numeric 6
  kind: action
  params: []

- id: numeric_7
  label: Numeric 7
  kind: action
  params: []

- id: numeric_8
  label: Numeric 8
  kind: action
  params: []

- id: numeric_9
  label: Numeric 9
  kind: action
  params: []

- id: standby
  label: Standby
  kind: action
  params: []

- id: stop
  label: Stop
  kind: action
  params: []

- id: play
  label: Play
  kind: action
  params: []

- id: playbackward
  label: Playbackward
  kind: action
  params: []

- id: pause
  label: Pause
  kind: action
  params: []

- id: forward
  label: Forward
  kind: action
  params: []

- id: backward
  label: Backward
  kind: action
  params: []

- id: slow
  label: Slow
  kind: action
  params: []

- id: slow_backward
  label: Slow Backward
  kind: action
  params: []

- id: next
  label: Next
  kind: action
  params: []

- id: previous
  label: Previous
  kind: action
  params: []

- id: cursor_up
  label: Cursor Up
  kind: action
  params: []

- id: cursor_down
  label: Cursor Down
  kind: action
  params: []

- id: cursor_left
  label: Cursor Left
  kind: action
  params: []

- id: cursor_right
  label: Cursor Right
  kind: action
  params: []

- id: ok
  label: OK
  kind: action
  params: []

- id: angle
  label: Angle
  kind: action
  params: []

- id: audio
  label: Audio
  kind: action
  params: []

- id: subtitle
  label: Subtitle
  kind: action
  params: []

- id: subtitle_on_off
  label: Subtitle On/Off
  kind: action
  params: []

- id: menu
  label: Menu
  kind: action
  params: []

- id: setup_menu
  label: Setup Menu
  kind: action
  params: []

- id: osd_on_off
  label: OSD On/Off
  kind: action
  params: []

- id: return
  label: Return
  kind: action
  params: []

- id: resume
  label: Resume
  kind: action
  params: []

- id: scan
  label: Scan
  kind: action
  params: []

- id: shuffle
  label: Shuffle
  kind: action
  params: []

- id: repeat
  label: Repeat
  kind: action
  params: []

- id: ab_repeat
  label: A/B Repeat
  kind: action
  params: []

- id: open_close
  label: Open/Close
  kind: action
  params: []

- id: fts
  label: FTS (Favourite Track Selection)
  kind: action
  params: []

- id: status_request
  label: Status Request
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: command_accepted
  label: Command Accepted
  description: Device echoes command string and returns "OK >"

- id: error_command_not_found
  label: Error - Command Not Found
  description: Returned when command is invalid or exceeds 10 characters

- id: startup_announcement
  label: Startup Announcement
  description: Device announces firmware revision on power-on (e.g., "Simaudio Stellar DVD player revx.xx")
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented beyond discrete commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
**Command format:** 10-character ASCII string: `SIM22[CS][00-40][optional param]`
- Characters 1-3: "SIM"
- Characters 4-5: "22" (Moon Stellar / Moon Orion model code)
- Character 6: "C" (command) or "S" (status request)
- Characters 7-8: Command/status code (00-40)
- Characters 9-10: Optional parameter

** Acknowledgement:** Press Enter (carriage return) after command to execute. Valid commands return "OK >". Invalid commands return "ERROR – COMMAND NOT FOUND".

**Cable requirement:** 25-pin-to-25-pin "thru serial extension" cable, NOT null modem.
<!-- UNRESOLVED: variables, events, macros sections not applicable or not documented in source -->

## Provenance

```yaml
source_domains:
  - simaudio.com
source_urls:
  - https://simaudio.com/wp-content/uploads/2019/11/Moon-Stellar-Orion-RS232codesrev101.pdf
retrieved_at: 2026-04-30T04:29:04.648Z
last_checked_at: 2026-06-02T22:14:36.990Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:36.990Z
matched_actions: 42
action_count: 42
confidence: medium
summary: "All 42 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "unsolicited event notifications not documented"
- "traits inferred from command examples"
- "no settable parameters documented beyond discrete commands"
- "no unsolicited notifications documented"
- "no multi-step sequences documented"
- "no safety warnings or interlock procedures in source"
- "variables, events, macros sections not applicable or not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
