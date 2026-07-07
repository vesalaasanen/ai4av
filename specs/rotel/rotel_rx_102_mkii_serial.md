---
spec_id: admin/rotel-cd11-cd14-rs232
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel CD11 / CD11MKII / CD14 / CD14MKII RS-232 Control Spec"
manufacturer: Rotel
model_family: CD11
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - CD11
    - CD11MKII
    - CD14
    - CD14MKII
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/CD14-CD14MKII-CD11-CD11MKII%20Protocol.pdf"
retrieved_at: 2026-07-03T15:44:26.165Z
last_checked_at: 2026-07-07T12:36:16.924Z
generated_at: 2026-07-07T12:36:16.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "DEVICE-NAME MISMATCH. The requested device \"Rotel RX 102 MkII\" (a"
  - "no voltage/current/power specs in source"
  - "no port number / network addressing (serial-only device)"
  - "RS-232 does not support flow control per source; care needed to avoid packet loss"
  - "exact parser semantics for \"###\" track-number padding not fully specified beyond 3-digit example"
  - "none applicable"
  - "precise event-to-trigger mapping not enumerated in source"
  - "source contains no explicit safety warnings, interlock procedures, or"
  - "DEVICE-NAME MISMATCH — see Summary. Requested device \"RX 102 MkII\" not"
  - "exact meaning of \"#:##:##\" time-format display modes (track elapsed/remaining, disc elapsed/remaining) — selection mechanism not documented beyond the time! toggle"
  - "HDCD decoding / WMA/MP3 support confirmation is runtime via disc_type? only"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:36:16.924Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched verbatim in source command tables; transport parameters verified from Connection Settings table. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Rotel CD11 / CD11MKII / CD14 / CD14MKII RS-232 Control Spec

## Summary
ASCII-based RS-232 control spec for Rotel CD11, CD11MKII, CD14, and CD14MKII CD players. Covers power, CD transport (play/stop/pause/track/fast-forward/backward/random/repeat), numeric keypad entry, eject, time display toggle, display dimmer levels, and RS-232 feedback/auto-update controls, plus a set of status-query commands.

<!-- UNRESOLVED: DEVICE-NAME MISMATCH. The requested device "Rotel RX 102 MkII" (a
receiver/amplifier) does NOT appear in the source document. The source document
(Rotel "CD11 / CD11MKII / CD14 / CD14MKII RS232 ASCII Controller Command List")
covers CD players only. This spec was populated strictly from the source content,
so compatible_with.models, title, and command set reflect the CD player family,
NOT the RX-102 MkII. The entity_id "rotel_rx_102_mkii" is carried through from the
request but is almost certainly incorrect for this source. An RX-102 MkII-specific
manual is required to produce a valid RX-102 MkII spec. -->

<!-- UNRESOLVED: no voltage/current/power specs in source -->
<!-- UNRESOLVED: no port number / network addressing (serial-only device) -->
<!-- UNRESOLVED: RS-232 does not support flow control per source; care needed to avoid packet loss -->

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
  type: none  # inferred: no auth/login procedure in source
# Framing notes (verbatim from source):
#   - All commands MUST be terminated with a "!" character.
#   - No spaces, no CR/LF after the command - only the terminating "!".
#   - Status responses terminate with "$" (fixed-length) or "$$" (variable-length, e.g. CD text).
```

## Traits
```yaml
# - powerable   # inferred from power_on/power_off/power_toggle commands
# - queryable   # inferred from power?/status?/track?/etc. query commands
# - levelable   # inferred from dimmer_0..dimmer_6 brightness levels
traits:
  - powerable
  - queryable
  - levelable
```

## Actions
```yaml
# All commands carry a verbatim payload from the source, including the "!" terminator.
# "n/a" response = no unit response documented for that command.

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
- id: track_forward
  label: Track Forward
  kind: action
  command: "trkf!"
  params: []
- id: track_backward
  label: Track Backward
  kind: action
  command: "trkb!"
  params: []
- id: fast_forward
  label: Fast Forward
  kind: action
  command: "ff!"
  params: []
- id: fast_backward
  label: Fast Backward
  kind: action
  command: "fb!"
  params: []
- id: random_toggle
  label: Random PlayMode Toggle
  kind: action
  command: "rnd!"
  params: []
- id: repeat_toggle
  label: Repeat PlayMode Toggle
  kind: action
  command: "rpt!"
  params: []

# --- NUMERIC KEY COMMANDS (each listed as a separate row in source) ---
- id: numeric_key_1
  label: Number Key 1
  kind: action
  command: "1!"
  params: []
- id: numeric_key_2
  label: Number Key 2
  kind: action
  command: "2!"
  params: []
- id: numeric_key_3
  label: Number Key 3
  kind: action
  command: "3!"
  params: []
- id: numeric_key_4
  label: Number Key 4
  kind: action
  command: "4!"
  params: []
- id: numeric_key_5
  label: Number Key 5
  kind: action
  command: "5!"
  params: []
- id: numeric_key_6
  label: Number Key 6
  kind: action
  command: "6!"
  params: []
- id: numeric_key_7
  label: Number Key 7
  kind: action
  command: "7!"
  params: []
- id: numeric_key_8
  label: Number Key 8
  kind: action
  command: "8!"
  params: []
- id: numeric_key_9
  label: Number Key 9
  kind: action
  command: "9!"
  params: []
- id: numeric_key_0
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
- id: time_toggle
  label: Toggle CD Time Display
  kind: action
  command: "time!"
  params: []
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []
- id: dimmer_set_0
  label: Set Display to 0 (Brightest)
  kind: action
  command: "dimmer_0!"
  params: []
- id: dimmer_set_1
  label: Set Display to 1
  kind: action
  command: "dimmer_1!"
  params: []
- id: dimmer_set_2
  label: Set Display to 2
  kind: action
  command: "dimmer_2!"
  params: []
- id: dimmer_set_3
  label: Set Display to 3
  kind: action
  command: "dimmer_3!"
  params: []
- id: dimmer_set_4
  label: Set Display to 4
  kind: action
  command: "dimmer_4!"
  params: []
- id: dimmer_set_5
  label: Set Display to 5
  kind: action
  command: "dimmer_5!"
  params: []
- id: dimmer_set_6
  label: Set Display to 6 (Dimmest)
  kind: action
  command: "dimmer_6!"
  params: []

# --- RS232 FEEDBACK (AUTO-UPDATE MODE) COMMANDS ---
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

# --- FEEDBACK REQUEST (QUERY) COMMANDS ---
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
# Observable states returned by query commands and auto-update notifications.
- id: power_state
  type: enum
  values: [on, standby]
- id: play_status
  type: enum
  values: [play, stop, pause]
- id: track_number
  type: string  # format "###" e.g. track=002$
- id: track_name
  type: string  # variable-length, UTF-8, terminated with $$
- id: tray_status
  type: enum
  values: [open, close, load]
- id: random_mode
  type: enum
  values: [on, off]
- id: repeat_mode
  type: enum
  values: [track, disc, off]
- id: time_display
  type: string  # format "#:##:##", variable-length terminated with $$, depends on time display mode
- id: disc_name
  type: string  # variable-length, UTF-8, terminated with $$
- id: disc_type
  type: enum
  values: [None, CD-DA, HDCD, MP3, WMA]
- id: dimmer_level
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
- id: software_version
  type: string  # format "#.##"
- id: model_number
  type: string  # e.g. model=cd14$
- id: update_mode
  type: enum
  values: [auto, manual]
# UNRESOLVED: exact parser semantics for "###" track-number padding not fully specified beyond 3-digit example
```

## Variables
```yaml
# No continuously settable scalar parameters beyond the enumerated dimmer levels
# (modeled as discrete actions above). Volume/gain/etc. are not applicable to these
# CD players.
# UNRESOLVED: none applicable
```

## Events
```yaml
# With rs232_update_on! enabled, the unit transmits unsolicited status updates on any
# status change (terminated with "$" or "$$"). Same payload formats as the Feedbacks
# section above. No explicit discrete event catalog beyond those state strings.
# UNRESOLVED: precise event-to-trigger mapping not enumerated in source
```

## Macros
```yaml
# No multi-step command sequences documented in source.
# UNRESOLVED: none applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures, or
# power-on sequencing requirements. Not inferred.
```

## Notes
- All commands must be terminated with a literal `!` character. No spaces, no CR/LF — only the `!`. (Source example text shows "power on!" with a space, but the command table and the explicit "do not include any spaces" note indicate the canonical form is the underscore form `power_on!`.)
- Status responses terminate with `$` for fixed-length strings and `$$` for variable-length strings (CD track/disc name, CD-DA text).
- RS-232 hardware does NOT support flow control; the source warns care is needed when sending/receiving to avoid packet loss.
- Auto status updates can be enabled (`rs232_update_on!`, `update_mode=auto$`) or disabled (`rs232_update_off!`, `update_mode=manual$`). When OFF, the unit only responds to explicit polls.
- CD text (track_name, disc_name, time) uses UTF-8 encoding.

<!-- UNRESOLVED: DEVICE-NAME MISMATCH — see Summary. Requested device "RX 102 MkII" not
present in source; this spec reflects the CD11/CD14 CD-player family only. -->
<!-- UNRESOLVED: exact meaning of "#:##:##" time-format display modes (track elapsed/remaining, disc elapsed/remaining) — selection mechanism not documented beyond the time! toggle -->
<!-- UNRESOLVED: HDCD decoding / WMA/MP3 support confirmation is runtime via disc_type? only -->
````

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/CD14-CD14MKII-CD11-CD11MKII%20Protocol.pdf"
retrieved_at: 2026-07-03T15:44:26.165Z
last_checked_at: 2026-07-07T12:36:16.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:36:16.924Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched verbatim in source command tables; transport parameters verified from Connection Settings table. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "DEVICE-NAME MISMATCH. The requested device \"Rotel RX 102 MkII\" (a"
- "no voltage/current/power specs in source"
- "no port number / network addressing (serial-only device)"
- "RS-232 does not support flow control per source; care needed to avoid packet loss"
- "exact parser semantics for \"###\" track-number padding not fully specified beyond 3-digit example"
- "none applicable"
- "precise event-to-trigger mapping not enumerated in source"
- "source contains no explicit safety warnings, interlock procedures, or"
- "DEVICE-NAME MISMATCH — see Summary. Requested device \"RX 102 MkII\" not"
- "exact meaning of \"#:##:##\" time-format display modes (track elapsed/remaining, disc elapsed/remaining) — selection mechanism not documented beyond the time! toggle"
- "HDCD decoding / WMA/MP3 support confirmation is runtime via disc_type? only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
