---
spec_id: admin/rotel-cd11mkii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel CD11MKII Control Spec"
manufacturer: Rotel
model_family: CD11MKII
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - CD11MKII
    - CD11
    - CD14
    - CD14MKII
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/CD14-CD14MKII-CD11-CD11MKII%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/manuals-resources
retrieved_at: 2026-06-30T16:11:39.393Z
last_checked_at: 2026-07-07T12:29:49.761Z
generated_at: 2026-07-07T12:29:49.761Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP or other transport mentioned; serial-only. No firmware version compatibility stated."
  - "none identified"
  - "exact event set not enumerated by source - assume mirrors Feedbacks."
  - "no multi-step sequences described in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source"
  - "exact set of unsolicited events not enumerated (only \"any status change\")"
  - "no response payloads for numeric keys, ff, fb"
  - "protocol version history (doc versions 1.00/1.10/1.20) not mapped to device firmware"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:29:49.761Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched exactly against source; all transport parameters verified (57600 baud, 8 data bits, no parity, 1 stop bit, no flow control, no auth); complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel CD11MKII Control Spec

## Summary
Rotel CD11MKII (also CD11, CD14, CD14MKII) CD player with ASCII-based RS232 control. Commands terminated with `!`; status responses terminated with `$` (fixed length) or `$$` (variable length). Supports power, CD transport, numeric keys, dimmer, and feedback queries. RS232 hardware does not support flow control.

<!-- UNRESOLVED: no TCP/IP or other transport mentioned; serial-only. No firmware version compatibility stated. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (power_on / power_off / power_toggle present)
# - queryable       (power? / status? / track? / etc. queries present)
# - levelable       (dimmer_0 through dimmer_6 set levels)
traits:
  - powerable  # inferred from power command examples
  - queryable  # inferred from query command examples
  - levelable  # inferred from dimmer level set commands
```

## Actions
```yaml
# Notes: All commands must be terminated with "!" (no spaces, no CR/LF).
# Responses terminate with "$" (fixed length) or "$$" (variable length).
# Field "Unit Response" values copied verbatim from source.

# --- POWER COMMANDS ---
- id: power_on
  label: Power On
  kind: action
  command: "power_on!"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "power_off!"
  params: []

- id: power_toggle
  label: Power Toggle
  kind: action
  command: "power_toggle!"
  params: []

# --- CD TRANSPORT COMMANDS ---
- id: play
  label: Play
  kind: action
  command: "play!"
  params: []

- id: stop
  label: Stop
  kind: action
  command: "stop!"
  params: []

- id: pause
  label: Pause Toggle
  kind: action
  command: "pause!"
  params: []

- id: trkf
  label: Track Forward
  kind: action
  command: "trkf!"
  params: []

- id: trkb
  label: Track Backward
  kind: action
  command: "trkb!"
  params: []

- id: ff
  label: Fast Forward
  kind: action
  command: "ff!"
  params: []

- id: fb
  label: Fast Backward
  kind: action
  command: "fb!"
  params: []

- id: rnd
  label: Random PlayMode Toggle
  kind: action
  command: "rnd!"
  params: []

- id: rpt
  label: Repeat PlayMode Toggle
  kind: action
  command: "rpt!"
  params: []

# --- NUMERIC KEY COMMANDS ---
- id: num_1
  label: Number Key 1
  kind: action
  command: "1!"
  params: []

- id: num_2
  label: Number Key 2
  kind: action
  command: "2!"
  params: []

- id: num_3
  label: Number Key 3
  kind: action
  command: "3!"
  params: []

- id: num_4
  label: Number Key 4
  kind: action
  command: "4!"
  params: []

- id: num_5
  label: Number Key 5
  kind: action
  command: "5!"
  params: []

- id: num_6
  label: Number Key 6
  kind: action
  command: "6!"
  params: []

- id: num_7
  label: Number Key 7
  kind: action
  command: "7!"
  params: []

- id: num_8
  label: Number Key 8
  kind: action
  command: "8!"
  params: []

- id: num_9
  label: Number Key 9
  kind: action
  command: "9!"
  params: []

- id: num_0
  label: Number Key 0
  kind: action
  command: "0!"
  params: []

# --- OTHER COMMANDS ---
- id: eject
  label: Eject CD
  kind: action
  command: "eject!"
  params: []

- id: time
  label: Toggle CD Time Display
  kind: action
  command: "time!"
  params: []

- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Set Display to 0 (Brightest)
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Set Display to 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Set Display to 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Set Display to 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Set Display to 4
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_5
  label: Set Display to 5
  kind: action
  command: "dimmer_5!"
  params: []

- id: dimmer_6
  label: Set Display to 6 (Dimmest)
  kind: action
  command: "dimmer_6!"
  params: []

# --- RS232 FEEDBACK COMMANDS ---
- id: rs232_update_on
  label: Set RS232 Update to Auto (On)
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: Set RS232 Update to Manual (Off)
  kind: action
  command: "rs232_update_off!"
  params: []

# --- FEEDBACK REQUEST QUERIES (Section 2) ---
- id: power_query
  label: Request Current Power Status
  kind: query
  command: "power?"
  params: []

- id: status_query
  label: Request CD Play Status
  kind: query
  command: "status?"
  params: []

- id: track_query
  label: Request Current CD Track Number
  kind: query
  command: "track?"
  params: []

- id: track_name_query
  label: Request Current CD Track Name
  kind: query
  command: "track_name?"
  params: []

- id: tray_status_query
  label: Request Current CD Mechanism Status
  kind: query
  command: "tray_status?"
  params: []

- id: rnd_query
  label: Request Current Random Play Mode
  kind: query
  command: "rnd?"
  params: []

- id: rpt_query
  label: Request Current Repeat Play Mode
  kind: query
  command: "rpt?"
  params: []

- id: time_query
  label: Request Current CD Track Time
  kind: query
  command: "time?"
  params: []

- id: disc_name_query
  label: Request Current CD Name
  kind: query
  command: "disc_name?"
  params: []

- id: disc_type_query
  label: Request Type of Loaded CD
  kind: query
  command: "disc_type?"
  params: []

- id: dimmer_query
  label: Request Current Front Display Dimmer Level
  kind: query
  command: "dimmer?"
  params: []

- id: version_query
  label: Request Main CPU Software Version
  kind: query
  command: "version?"
  params: []

- id: model_query
  label: Request Model Number
  kind: query
  command: "model?"
  params: []
```

## Feedbacks
```yaml
# Response strings copied verbatim from source (Section 1 "Unit Response" + Section 2 "Return String(s)").
- id: power_state
  type: enum
  values: [on, standby]
  response_format: "power=on$ / power=standby$"

- id: play_status
  type: enum
  values: [play, stop, pause]
  response_format: "status=play$ / status=stop$ / status=pause$"

- id: track_number
  type: string
  response_format: "track=###$"

- id: track_name
  type: string
  response_format: "track_name=text$$"

- id: tray_status
  type: enum
  values: [open, close, load]
  response_format: "tray_status=open$ / tray_status=close$ / tray_status=load$"

- id: rnd_state
  type: enum
  values: [on, off]
  response_format: "rnd=on$ / rnd=off$"

- id: rpt_state
  type: enum
  values: [track, disc, off]
  response_format: "rpt=track$ / rpt=disc$ / rpt=off$"

- id: time_display
  type: string
  response_format: "time=#:##:##$$"

- id: disc_name
  type: string
  response_format: "disc_name=text$$"

- id: disc_type
  type: enum
  values: ["None", "CD-DA", "HDCD", "MP3", "WMA"]
  response_format: "disc_type=None$$ / disc_type=CD-DA$$ / disc_type=HDCD$$ / disc_type=MP3$$ / disc_type=WMA$$"

- id: dimmer_level
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6"]
  response_format: "dimmer=0$ / dimmer=1$ / dimmer=2$ / dimmer=3$ / dimmer=4$ / dimmer=5$ / dimmer=6$"

- id: update_mode
  type: enum
  values: [auto, manual]
  response_format: "update_mode=auto$ / update_mode=manual$"

- id: software_version
  type: string
  response_format: "version=#.##$"

- id: model_number
  type: string
  response_format: "model=text$"
```

## Variables
```yaml
# No continuous settable parameters documented beyond discrete dimmer levels
# (already enumerated as actions). Section intentionally minimal.
# UNRESOLVED: none identified
```

## Events
```yaml
# With rs232_update_on active, the unit transmits status changes unsolicited.
# Same payload formats as Feedbacks section. Source does not enumerate which
# specific events fire, only that "any status changes" are transmitted.
# UNRESOLVED: exact event set not enumerated by source - assume mirrors Feedbacks.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Only operational note: RS232 hardware
# lacks flow control - sender must avoid packet loss (timing-sensitive).
```

## Notes
- All commands must be terminated with `!`. No spaces. No CR/LF after command.
- Fixed-length status responses terminate with `$`. Variable-length strings (CD text metadata) terminate with `$$`.
- RS232 hardware does not support flow control. Care required to avoid packet loss when sending/receiving.
- `rs232_update_on` enables automatic unsolicited status updates; `rs232_update_off` makes unit silent unless polled.
- `track=###` uses zero-padded 3-digit track number (e.g. `track=002$`).
- Time display mode (track/disc, elapsed/remaining) is toggled by `time!` command; `time?` returns whichever mode is active.
- Numeric keys `0!`–`9!` have no documented response (`n/a` in source).
- `ff!` and `fb!` (fast forward/backward) have no documented response (`n/a` in source).

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: exact set of unsolicited events not enumerated (only "any status change") -->
<!-- UNRESOLVED: no response payloads for numeric keys, ff, fb -->
<!-- UNRESOLVED: protocol version history (doc versions 1.00/1.10/1.20) not mapped to device firmware -->
````

Spec complete. 13 power/transport/other commands + 10 numeric keys + 7 dimmer levels + 2 rs232 feedback + 13 query commands = **45 actions**. All payloads verbatim from source. No fabrications; gaps marked `UNRESOLVED`.

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/CD14-CD14MKII-CD11-CD11MKII%20Protocol.pdf"
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - https://www.rotel.com/manuals-resources
retrieved_at: 2026-06-30T16:11:39.393Z
last_checked_at: 2026-07-07T12:29:49.761Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:29:49.761Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched exactly against source; all transport parameters verified (57600 baud, 8 data bits, no parity, 1 stop bit, no flow control, no auth); complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP or other transport mentioned; serial-only. No firmware version compatibility stated."
- "none identified"
- "exact event set not enumerated by source - assume mirrors Feedbacks."
- "no multi-step sequences described in source"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source"
- "exact set of unsolicited events not enumerated (only \"any status change\")"
- "no response payloads for numeric keys, ff, fb"
- "protocol version history (doc versions 1.00/1.10/1.20) not mapped to device firmware"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
