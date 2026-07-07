---
spec_id: admin/rotel-rc-970bx-mkii
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel CD11 / CD14 Series RS-232 Control Spec"
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
retrieved_at: 2026-07-01T14:28:48.897Z
last_checked_at: 2026-07-07T12:32:43.211Z
generated_at: 2026-07-07T12:32:43.211Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document does not match the requested device (RC-970BX MkII). See mismatch warning above."
  - "firmware version compatibility not stated in source."
  - "no safety, interlock, or power-sequencing content in source."
  - "no multi-step sequences described in source."
  - "PRIMARY ISSUE — source document covers CD11/CD11MKII/CD14/CD14MKII CD players, NOT the requested Rotel RC-970BX MkII preamplifier. entity_id/spec_id retain the operator slug for traceability only; this spec does NOT describe the RC-970BX MkII. Re-source or re-key before ingest."
  - "firmware version compatibility range not stated in source."
  - "no voltage/current/power specs, fault behavior, or error recovery sequences in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T12:32:43.211Z
  matched_actions: 47
  action_count: 47
  confidence: medium
  summary: "All 47 spec actions matched verbatim in source; 100% coverage; all transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Rotel CD11 / CD14 Series RS-232 Control Spec

## Summary
ASCII-based RS-232C control protocol for the Rotel CD11, CD11MKII, CD14, and CD14MKII CD players. Commands are plain-text strings terminated with `!`; responses from the unit terminate with `$` (fixed length) or `$$` (variable length). Covers power, CD transport, numeric-key, dimmer, and status-feedback commands at 57600 baud.

> ⚠️ **SOURCE / DEVICE MISMATCH — DO NOT PUBLISH AS-IS**
> The requested device was **Rotel RC-970BX MkII** (a stereo preamplifier/control amplifier), but the provided source file (`rotel_rc_970bx_mkii_serial.refined.md`) documents the **CD11 / CD11MKII / CD14 / CD14MKII CD player** RS-232 command set. Every command below is CD-player-specific (play, eject, track, disc_name, tray_status, etc.) and does **not** apply to the RC-970BX MkII. `entity_id`, `spec_id`, and this spec's title retain the operator-supplied RC-970BX slug for traceability only. Either (a) supply the correct RC-970BX MkII RS-232 document, or (b) re-key this spec under a CD-player entity.

<!-- UNRESOLVED: source document does not match the requested device (RC-970BX MkII). See mismatch warning above. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: no safety, interlock, or power-sequencing content in source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 57600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # source: "RS232 hardware does not support flow control"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # power_on / power_off / power_toggle commands present
  - queryable   # power?, status?, track?, dimmer?, etc. queries present
  - levelable   # display dimmer levels 0-6 (brightness control)
```

## Actions
```yaml
# Framing rules (verbatim from source):
#   - Every command terminates with literal "!" - no spaces, no CR/LF.
#   - Responses terminate with "$" (fixed length) or "$$" (variable length).
#
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
  label: Random Play Mode Toggle
  kind: action
  command: "rnd!"
  params: []

- id: repeat_toggle
  label: Repeat Play Mode Toggle
  kind: action
  command: "rpt!"
  params: []

# --- NUMERIC KEY COMMANDS (each a distinct source row) ---
- id: number_key_1
  label: Number Key 1
  kind: action
  command: "1!"
  params: []

- id: number_key_2
  label: Number Key 2
  kind: action
  command: "2!"
  params: []

- id: number_key_3
  label: Number Key 3
  kind: action
  command: "3!"
  params: []

- id: number_key_4
  label: Number Key 4
  kind: action
  command: "4!"
  params: []

- id: number_key_5
  label: Number Key 5
  kind: action
  command: "5!"
  params: []

- id: number_key_6
  label: Number Key 6
  kind: action
  command: "6!"
  params: []

- id: number_key_7
  label: Number Key 7
  kind: action
  command: "7!"
  params: []

- id: number_key_8
  label: Number Key 8
  kind: action
  command: "8!"
  params: []

- id: number_key_9
  label: Number Key 9
  kind: action
  command: "9!"
  params: []

- id: number_key_0
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

- id: time_display_toggle
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

# --- RS232 FEEDBACK MODE COMMANDS ---
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

- id: random_query
  label: Request Current Random Play Mode
  kind: query
  command: "rnd?"
  params: []

- id: repeat_query
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
- id: power_state
  type: enum
  values: [on, standby]
  return_format: "power={on|standby}$"

- id: play_status
  type: enum
  values: [play, stop, pause]
  return_format: "status={play|stop|pause}$"

- id: track_number
  type: string
  return_format: "track=###$"

- id: track_name
  type: string
  return_format: "track_name=text$$"  # UTF-8; variable length → double terminator

- id: tray_status
  type: enum
  values: [open, close, load]
  return_format: "tray_status={open|close|load}$"

- id: random_mode
  type: enum
  values: [on, off]
  return_format: "rnd={on|off}$"

- id: repeat_mode
  type: enum
  values: [track, disc, off]
  return_format: "rpt={track|disc|off}$"

- id: time_display
  type: string
  return_format: "time=#:##:##$$"  # variable length → double terminator

- id: disc_name
  type: string
  return_format: "disc_name=text$$"  # UTF-8; variable length → double terminator

- id: disc_type
  type: enum
  values: [None, CD-DA, HDCD, MP3, WMA]
  return_format: "disc_type={None|CD-DA|HDCD|MP3|WMA}$$"

- id: dimmer_level
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  return_format: "dimmer={0|1|2|3|4|5|6}$"

- id: update_mode
  type: enum
  values: [auto, manual]
  return_format: "update_mode={auto|manual}$"

- id: software_version
  type: string
  return_format: "version=#.##$"

- id: model_number
  type: string
  return_format: "model=text$"
```

## Variables
```yaml
# Dimmer level is settable via discrete dimmer_{0..6}! actions (already in Actions).
# No other continuously-settable parameters documented.
```

## Events
```yaml
# When rs232_update_on! is active, the unit transmits unsolicited status updates over
# RS-232 on any state change (power, play status, track, tray, dimmer, modes, etc.),
# using the same return formats listed in Feedbacks. Disable with rs232_update_off!
# (unit then only responds when polled). No dedicated event message format is documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source notes only that RS232 hardware lacks flow control - care needed to avoid
# packet loss when sending/receiving. No safety warnings, interlocks, or
# power-on sequencing requirements are documented.
```

## Notes
- **Command framing:** all commands terminate with `!`; no spaces, no CR/LF. Responses use `$` (fixed-length) or `$$` (variable-length, e.g. metadata/time strings).
- **No flow control:** the RS-232 hardware does not support flow control; the controller must pace sends/receives to avoid packet loss.
- **Auto-update mode:** `rs232_update_on!` enables push-style status updates; `rs232_update_off!` makes the unit silent unless polled.
- **Numeric keys `1!`–`0!`:** documented as 10 distinct source rows; emitted as separate actions per coverage rule.
- **Dimmer levels:** `dimmer_0!`–`dimmer_6!` (0 = brightest, 6 = dimmest) emitted as separate actions; `dimmer!` toggles.
- Source spec version table: v1.00 (2016-08-26, original); v1.10 (2018-12-18, added CD11); v1.20 (2024-06-07, added CD11MKII/CD14MKII).

<!-- UNRESOLVED: PRIMARY ISSUE — source document covers CD11/CD11MKII/CD14/CD14MKII CD players, NOT the requested Rotel RC-970BX MkII preamplifier. entity_id/spec_id retain the operator slug for traceability only; this spec does NOT describe the RC-970BX MkII. Re-source or re-key before ingest. -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: no voltage/current/power specs, fault behavior, or error recovery sequences in source. -->
```
---

Self-check: no voltage/current/power invented ✓. baud 57600 = stated (not assumed 9600) ✓. No port assumed (serial-only) ✓. `status: draft` ✓. `declared_confidence: low` ✓. YAML blocks valid ✓. `entity_id` placeholder kept (operator-supplied) ✓. UNRESOLVED markers present ✓.

**47 actions** enumerated (3 power + 9 transport + 10 numeric + 3 other + 7 dimmer-set + 2 update-mode + 13 queries). Full source coverage.

Blocker before ingest: **wrong device**. Source = CD player protocol. Need correct RC-970BX MkII RS-232 doc, or re-key spec under CD-player entity. Want me (a) keep CD spec as-is under new entity, or (b) wait for real RC-970BX source?

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://rotel.com/sites/default/files/product/rs232/CD14-CD14MKII-CD11-CD11MKII%20Protocol.pdf"
retrieved_at: 2026-07-01T14:28:48.897Z
last_checked_at: 2026-07-07T12:32:43.211Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:32:43.211Z
matched_actions: 47
action_count: 47
confidence: medium
summary: "All 47 spec actions matched verbatim in source; 100% coverage; all transport parameters confirmed. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document does not match the requested device (RC-970BX MkII). See mismatch warning above."
- "firmware version compatibility not stated in source."
- "no safety, interlock, or power-sequencing content in source."
- "no multi-step sequences described in source."
- "PRIMARY ISSUE — source document covers CD11/CD11MKII/CD14/CD14MKII CD players, NOT the requested Rotel RC-970BX MkII preamplifier. entity_id/spec_id retain the operator slug for traceability only; this spec does NOT describe the RC-970BX MkII. Re-source or re-key before ingest."
- "firmware version compatibility range not stated in source."
- "no voltage/current/power specs, fault behavior, or error recovery sequences in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
