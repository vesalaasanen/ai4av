---
spec_id: admin/rotel-dt-6000
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rotel DT-6000 Control Spec"
manufacturer: Rotel
model_family: DT-6000
aliases: []
compatible_with:
  manufacturers:
    - Rotel
  models:
    - DT-6000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/DT6000%20Protocol.pdf"
  - https://www.rotel.com/sites/default/files/product/manuals/dt6000_om_en.pdf
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/drivers/receiver_Rotel_DT-6000%2B[DriverWorks]_1.c4i"
retrieved_at: 2026-06-30T16:15:39.505Z
last_checked_at: 2026-07-07T12:29:50.713Z
generated_at: 2026-07-07T12:29:50.713Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "none applicable"
  - "no multi-step sequences described explicitly in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "no voltage/power/electrical specs in source (out of scope for control protocol)"
  - "query command terminator (! vs ?) ambiguity — see Notes"
verification:
  verdict: verified
  checked_at: 2026-07-07T12:29:50.713Z
  matched_actions: 53
  action_count: 53
  confidence: medium
  summary: "All 53 spec actions verified verbatim in source documentation; perfect bidirectional coverage of control and query commands; all transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Rotel DT-6000 Control Spec

## Summary
The Rotel DT-6000 is a CD player / digital transport supporting PC-USB input. This spec covers its ASCII-based RS-232 control protocol, including power, source selection, CD/PC-USB transport control, dimmer levels, and status query commands.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
  - powerable    # inferred: power_on/power_off/power_toggle commands present
  - queryable    # inferred: power?/source?/status?/track?/etc. query commands present
  - levelable    # inferred: dimmer_0..dimmer_6 level commands present
```

## Actions
```yaml
# All command payloads include the verbatim '!' terminator as documented in source.
# Responses terminate with '$' (fixed-length) or '$$' (variable-length).

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

# --- SOURCE SELECTION COMMANDS ---
- id: select_source_cd
  label: Source CD
  kind: action
  command: "cd!"
  params: []

- id: select_source_coax
  label: Source Coax
  kind: action
  command: "coax!"
  params: []

- id: select_source_opt
  label: Source Optical
  kind: action
  command: "opt!"
  params: []

- id: select_source_pcusb
  label: Source PC-USB
  kind: action
  command: "pcusb!"
  params: []

# --- CD / PC-USB TRANSPORT COMMANDS (shared: applies to active source) ---
- id: play
  label: Play
  kind: action
  command: "play!"
  params: []
  notes: "Applies to CD transport and PC-USB source per source tables."

- id: stop
  label: Stop
  kind: action
  command: "stop!"
  params: []
  notes: "Applies to CD transport and PC-USB source per source tables."

- id: pause
  label: Pause Toggle
  kind: action
  command: "pause!"
  params: []
  notes: "Applies to CD transport and PC-USB source per source tables."

- id: track_forward
  label: Track Forward
  kind: action
  command: "trkf!"
  params: []
  notes: "Applies to CD transport and PC-USB source per source tables."

- id: track_backward
  label: Track Backward
  kind: action
  command: "trkb!"
  params: []
  notes: "Applies to CD transport and PC-USB source per source tables."

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

# --- NUMBER KEYS (1-0) ---
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

# --- DIMMER COMMANDS ---
- id: dimmer_toggle
  label: Toggle Display Dimmer
  kind: action
  command: "dimmer!"
  params: []

- id: dimmer_0
  label: Set Display Brightest
  kind: action
  command: "dimmer_0!"
  params: []

- id: dimmer_1
  label: Set Display Dimmer Level 1
  kind: action
  command: "dimmer_1!"
  params: []

- id: dimmer_2
  label: Set Display Dimmer Level 2
  kind: action
  command: "dimmer_2!"
  params: []

- id: dimmer_3
  label: Set Display Dimmer Level 3
  kind: action
  command: "dimmer_3!"
  params: []

- id: dimmer_4
  label: Set Display Dimmer Level 4
  kind: action
  command: "dimmer_4!"
  params: []

- id: dimmer_5
  label: Set Display Dimmer Level 5
  kind: action
  command: "dimmer_5!"
  params: []

- id: dimmer_6
  label: Set Display Dimmest
  kind: action
  command: "dimmer_6!"
  params: []

# --- RS232 FEEDBACK CONTROL ---
- id: rs232_update_on
  label: Set RS232 Update Auto (On)
  kind: action
  command: "rs232_update_on!"
  params: []

- id: rs232_update_off
  label: Set RS232 Update Manual (Off)
  kind: action
  command: "rs232_update_off!"
  params: []

# --- FEEDBACK REQUEST QUERIES ---
- id: query_power
  label: Request Power Status
  kind: query
  command: "power?"
  params: []

- id: query_source
  label: Request Current Source
  kind: query
  command: "source?"
  params: []

- id: query_status
  label: Request CD Play Status
  kind: query
  command: "status?"
  params: []

- id: query_track
  label: Request Current CD Track Number
  kind: query
  command: "track?"
  params: []

- id: query_track_name
  label: Request Current CD Track Name
  kind: query
  command: "track_name?"
  params: []

- id: query_tray_status
  label: Request CD Mechanism Status
  kind: query
  command: "tray_status?"
  params: []

- id: query_random
  label: Request Random Play Mode
  kind: query
  command: "rnd?"
  params: []

- id: query_repeat
  label: Request Repeat Play Mode
  kind: query
  command: "rpt?"
  params: []

- id: query_time
  label: Request Current CD Track Time
  kind: query
  command: "time?"
  params: []

- id: query_disc_name
  label: Request Current CD Name
  kind: query
  command: "disc_name?"
  params: []

- id: query_disc_type
  label: Request Type of Loaded CD
  kind: query
  command: "disc_type?"
  params: []

- id: query_freq
  label: Request Frequency for Digital Source Input
  kind: query
  command: "freq?"
  params: []

- id: query_dimmer
  label: Request Front Display Dimmer Level
  kind: query
  command: "dimmer?"
  params: []

- id: query_version
  label: Request Main CPU Software Version
  kind: query
  command: "version?"
  params: []

- id: query_model
  label: Request Model Number
  kind: query
  command: "model?"
  params: []
```

## Feedbacks
```yaml
# Observable states reported by device (response strings to actions + queries).
- id: power_state
  type: enum
  values: [on, standby]

- id: source_state
  type: enum
  values: [cd, coax, opt, pcusb]

- id: play_status
  type: enum
  values: [play, stop, pause]

- id: track_number
  type: string
  format: "track=###$"

- id: track_name
  type: string
  encoding: UTF-8
  format: "track_name=<text>$$"

- id: tray_status
  type: enum
  values: [open, close, load]

- id: random_mode
  type: enum
  values: [on, off]

- id: repeat_mode
  type: enum
  values: [track, disc, off]

- id: cd_time
  type: string
  format: "time=#:##:##$$"
  notes: "Track time elapsed/remaining or disc time elapsed/remaining depending on mode."

- id: cd_name
  type: string
  encoding: UTF-8
  format: "cd_name=<text>$$"

- id: disc_type
  type: enum
  values: [None, CD-DA, HDCD, MP3, WMA]

- id: digital_freq
  type: enum
  values: [off, "32", "44.1", "48", "88.2", "96", "176.4", "192", "384"]

- id: dimmer_level
  type: integer
  min: 0
  max: 6

- id: software_version
  type: string
  format: "version=#.##$"

- id: model_number
  type: string
  format: "model=<text>$"

- id: update_mode
  type: enum
  values: [auto, manual]
```

## Variables
```yaml
# No settable continuous parameters beyond discrete dimmer levels (handled as Actions).
# UNRESOLVED: none applicable
```

## Events
```yaml
# Device emits unsolicited status updates in auto mode (rs232_update_on).
# Each display change sends the new display line(s). Basic status (volume, power,
# source changes) always reported automatically; USB metadata requires auto mode.
- id: auto_status_update
  trigger: display_change
  enabled_by: rs232_update_on
  disabled_by: rs232_update_off
  payload_format: "<display_line>$ | <variable_string>$$"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Only note: RS232 hardware lacks flow control;
# sender must pace transmission to avoid packet loss (not a safety interlock).
```

## Notes
- **Command terminator:** every command sent to the device must end with a literal `!` character. No spaces, no CR/LF after the terminator.
- **Response terminator:** fixed-length responses end with `$`; variable-length strings (CD metadata) end with `$$`. The control app must parse accordingly.
- **Flow control:** the RS232 hardware does NOT support flow control. The sender must take care to avoid packet loss when sending/receiving rapidly.
- **Shared transport opcodes:** `play!`, `stop!`, `pause!`, `trkf!`, `trkb!` appear in both the CD Transport and PC-USB Transport tables in the source with identical payloads; the device applies them to the currently active source. Listed once each here.
- **Auto vs manual updates:** in auto mode (`rs232_update_on!`) every display change is pushed; in manual mode (`rs232_update_off!`) USB metadata must be polled, though basic status (power/source/volume) is still pushed automatically.
- **Query terminator ambiguity:** the source's general rule states all commands require `!`, but Section 2 lists feedback requests as `power?`, `source?`, etc. without `!`. Payloads here follow the Section 2 verbatim form.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no voltage/power/electrical specs in source (out of scope for control protocol) -->
<!-- UNRESOLVED: query command terminator (! vs ?) ambiguity — see Notes -->
```

## Provenance

```yaml
source_domains:
  - rotel.com
source_urls:
  - "https://www.rotel.com/sites/default/files/product/rs232/DT6000%20Protocol.pdf"
  - https://www.rotel.com/sites/default/files/product/manuals/dt6000_om_en.pdf
  - https://www.rotel.com/manuals-resources/rs232-protocols
  - "https://www.rotel.com/sites/default/files/drivers/receiver_Rotel_DT-6000%2B[DriverWorks]_1.c4i"
retrieved_at: 2026-06-30T16:15:39.505Z
last_checked_at: 2026-07-07T12:29:50.713Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T12:29:50.713Z
matched_actions: 53
action_count: 53
confidence: medium
summary: "All 53 spec actions verified verbatim in source documentation; perfect bidirectional coverage of control and query commands; all transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "none applicable"
- "no multi-step sequences described explicitly in source"
- "source contains no safety warnings, interlock procedures, or"
- "no voltage/power/electrical specs in source (out of scope for control protocol)"
- "query command terminator (! vs ?) ambiguity — see Notes"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
