---
spec_id: admin/sanyo-north-america-corp-pdg-dht100l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sanyo PDG-DHT100L Control Spec"
manufacturer: Sanyo
model_family: PDG-DHT100L
aliases: []
compatible_with:
  manufacturers:
    - Sanyo
    - "Sanyo North America Corp"
  models:
    - PDG-DHT100L
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - "http://web.archive.org/web/20130125011725/http://us.sanyo.com/dynamic/product/Downloads/PLC-DHT100L_Basic%20_RS232-29505888.pdf"
retrieved_at: 2026-09-17T03:34:21.776Z
last_checked_at: 2026-09-19T22:16:21.530Z
generated_at: 2026-09-19T22:16:21.530Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the \"Basic\" command spec only — an \"Expanded\" serial command spec is referenced (section 8 mentions \"Expand Serial Command\") but not included in this document"
  - "no settable non-discrete parameters documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "Expanded Serial Command set referenced in source but not provided — additional commands exist beyond this Basic spec"
  - "family record name \"PDG DHT PLC XF7x Series\" is a DB hybrid of distinct Sanyo families (PDG-DHT vs PLC-XF70/XF71); source covers PDG-DHT100L only"
  - "number of lamps not explicitly stated (CR3/CR7 multi-lamp responses imply multiple lamps)"
verification:
  verdict: verified
  checked_at: 2026-09-19T22:16:21.530Z
  matched_actions: 43
  action_count: 43
  confidence: medium
  summary: "All 43 spec actions match source commands verbatim; transport parameters supported; no extra source commands. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-17
---

# Sanyo PDG-DHT100L Control Spec

## Summary
Sanyo PDG-DHT100L large-venue projector controlled via RS-232C from a computer. This spec covers the "Basic Serial Command Functional Specifications" Ver.1.00: serial transfer settings, functional execution commands ("C" prefixed, terminated with CR), status read commands ("CR" prefixed), and the addressed-command mode for multi-projector control. Note: the family record name "PDG DHT PLC XF7x Series" conflates multiple Sanyo families; this source document covers the PDG-DHT100L only.

<!-- UNRESOLVED: source is the "Basic" command spec only — an "Expanded" serial command spec is referenced (section 8 mentions "Expand Serial Command") but not included in this document -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200  # initial/default setting; 9600 also supported, changed in Service Mode
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # inferred: C00 POWER ON / C01 POWER OFF commands present
  - routable     # inferred: C05-C08 input select commands present
  - queryable    # inferred: CR0-CR7 status read commands present
```

## Actions
```yaml
# All commands terminated with CR (0x0D). Successful response: ACK CR (0x06 0x0D). Undecodable: "?" CR.
# Addressed variant: prefix "A" + 3-digit address (001-999, "FFF" = broadcast, no response) e.g. "A001C05" CR.
actions:
  - id: power_on
    label: Power ON
    kind: action
    command: "C00"
    params: []
  - id: power_off_immediate
    label: Power OFF (Immediate)
    kind: action
    command: "C01"
    params: []
  - id: select_input_1
    label: Select Input 1
    kind: action
    command: "C05"
    params: []
  - id: select_input_2
    label: Select Input 2
    kind: action
    command: "C06"
    params: []
  - id: select_input_3
    label: Select Input 3
    kind: action
    command: "C07"
    params: []
  - id: select_input_4
    label: Select Input 4
    kind: action
    command: "C08"
    params: []
  - id: video_mute_on
    label: Video Mute ON (Shutter)
    kind: action
    command: "C0D"
    params: []
  - id: video_mute_off
    label: Video Mute OFF (Shutter)
    kind: action
    command: "C0E"
    params: []
  - id: screen_normal_size
    label: Screen Normal Size
    kind: action
    command: "C0F"
    params: []
  - id: screen_full_size
    label: Screen Full Size
    kind: action
    command: "C10"
    params: []
  - id: menu_on
    label: Menu ON
    kind: action
    command: "C1C"
    params: []
  - id: menu_off
    label: Menu OFF
    kind: action
    command: "C1D"
    params: []
  - id: display_clear
    label: Display Clear
    kind: action
    command: "C1E"
    params: []
  - id: image
    label: Switch Image Setting
    kind: action
    command: "C27"
    params: []
  - id: digital_zoom_in
    label: D.ZOOM +
    kind: action
    command: "C30"
    params: []
  - id: digital_zoom_out
    label: D.ZOOM -
    kind: action
    command: "C31"
    params: []
  - id: pointer_right
    label: Pointer Right
    kind: action
    command: "C3A"
    params: []
  - id: pointer_left
    label: Pointer Left
    kind: action
    command: "C3B"
    params: []
  - id: pointer_up
    label: Pointer Up
    kind: action
    command: "C3C"
    params: []
  - id: pointer_down
    label: Pointer Down
    kind: action
    command: "C3D"
    params: []
  - id: enter
    label: Enter (Select)
    kind: action
    command: "C3F"
    params: []
  - id: freeze_on
    label: Freeze ON
    kind: action
    command: "C43"
    params: []
  - id: freeze_off
    label: Freeze OFF
    kind: action
    command: "C44"
    params: []
  - id: zoom_out
    label: ZOOM -
    kind: action
    command: "C46"
    params: []
  - id: zoom_in
    label: ZOOM +
    kind: action
    command: "C47"
    params: []
  - id: focus_out
    label: FOCUS -
    kind: action
    command: "C4A"
    params: []
  - id: focus_in
    label: FOCUS +
    kind: action
    command: "C4B"
    params: []
  - id: lens_shift_up
    label: Lens Shift Up
    kind: action
    command: "C5D"
    params: []
  - id: lens_shift_down
    label: Lens Shift Down
    kind: action
    command: "C5E"
    params: []
  - id: lens_shift_left
    label: Lens Shift Left
    kind: action
    command: "C5F"
    params: []
  - id: lens_shift_right
    label: Lens Shift Right
    kind: action
    command: "C60"
    params: []
  - id: auto_pc_adj
    label: Auto PC Adj.
    kind: action
    command: "C89"
    params: []
  - id: presentation_timer
    label: Presentation Timer
    kind: action
    command: "C8A"
    params: []
  - id: keystone_up
    label: Keystone Up (reduce upper part)
    kind: action
    command: "C8E"
    params: []
  - id: keystone_down
    label: Keystone Down (reduce lower part)
    kind: action
    command: "C8F"
    params: []
  - id: keystone_right
    label: Keystone Right (reduce right part)
    kind: action
    command: "C90"
    params: []
  - id: keystone_left
    label: Keystone Left (reduce left part)
    kind: action
    command: "C91"
    params: []
  - id: status_read
    label: Status Read
    kind: query
    command: "CR0"
    params: []
  - id: input_mode_read
    label: Input Mode Read
    kind: query
    command: "CR1"
    params: []
  - id: lamp_time_read
    label: Lamp Time Read
    kind: query
    command: "CR3"
    params: []
  - id: setting_read
    label: Setting Read (Ceiling/Rear)
    kind: query
    command: "CR4"
    params: []
  - id: temp_read
    label: Temperature Read
    kind: query
    command: "CR6"
    params: []
  - id: lamp_mode_read
    label: Lamp Mode Read
    kind: query
    command: "CR7"
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: enum
    description: Response to functional execution commands
    values:
      - "ACK CR (0x06 0x0D)"   # accepted
      - "? CR"                  # cannot decode
  - id: power_state
    type: enum
    description: CR0 response %1
    values:
      - "00"  # Power ON
      - "80"  # Standby
      - "40"  # Countdown in process
      - "20"  # Cooling Down in process
      - "10"  # Power Failure
      - "28"  # Cooling Down due to Abnormal Temperature in process
      - "02"  # Cannot accept RS-232C Command
      - "24"  # Power Management Cooling Down in process
      - "04"  # Power Management status
      - "21"  # Cooling Down in process after Off due to lamp failure
      - "81"  # Standby after Cooling Down due to lamp failure
      - "88"  # Standby after Cooling Down due to Abnormal Temperature
      - "2C"  # Cooling Down in process after Power Off due to Shutter management
      - "8C"  # Standby after Cooling Down due to Shutter management
  - id: input_mode
    type: enum
    description: CR1 response %1
    values: ["1", "2", "3", "4"]
  - id: lamp_time
    type: string
    description: CR3 response - per-lamp hours, 4 digits each, space-separated (e.g. "0410_0410"); "9999" returned for 10000 hours or more
  - id: screen_setting
    type: enum
    description: CR4 response %1 (Ceiling/Rear)
    values:
      - "11"  # Normal
      - "10"  # Rear & Ceiling ON (top/bottom reversed)
      - "01"  # Rear ON (left/right reversed)
      - "00"  # Ceiling ON (top/bottom and left/right reversed)
  - id: internal_temperature
    type: string
    description: CR6 response - per-sensor values "00.0" format, space-separated (e.g. "_31.5_ _35.2_ _33.4"); negative prefixed "-"; "E" prefix on hardware error
  - id: lamp_mode
    type: string
    description: CR7 response - 2 hex digits; first digit mode (0=2lamp, 1=1lamp No.1, 2=1lamp No.2), second digit 4-bit lamp on/off bitmap (e.g. "0F")
```

## Variables
```yaml
# UNRESOLVED: no settable non-discrete parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
# Note: addressed command mode exists ("A" + 3-digit address + command) but is a transport
# addressing wrapper, not a macro
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- Command format: one command per line, starts "C" (or "A"+address), ends CR (0x0D). Decoding starts on CR. Commands must be uppercase A-Z; lowercase rejected.
- Receive buffer clears on LF (0x0A) or EOF (0x1A), or if a single command takes more than 1 second to receive.
- Pipelining intervals after response: 100ms for ZOOM/FOCUS/LENS SHIFT commands, 500ms for other commands; Status Read commands need at least 500ms interval.
- Do not issue any command before receiving the response, except when no response arrives within 5 seconds.
- ~7 seconds internal initialization after AC plug-in — cannot process commands. For 7 seconds after POWER ON from STANDBY, projector returns "Acceptable" (ACK) but does not execute; Status Read executes 500ms after the ACK.
- During Countdown/Cooling Down, commands return ACK but are not executed (except Status Read). Input switching takes 5 seconds; other commands received during that window ACK but are not executed.
- Command pipelining rule: sender issues command every 100ms; function executes for 120ms from receipt; same command within 120ms extends execution another 120ms; other command or silence stops execution.
- Operation limits: STANDBY accepts only C00; Power Saving accepts C00 and C01; Countdown accepts only C00 (terminates countdown); Cooling Down / Abnormal Temperature / Abnormal Power / switching modes accept NO functional commands (Status Read always available). ACK is returned even when the command is not executed.
- Addressed mode: "A" + 3-digit address (001-999) + basic command, e.g. "A001C05" / "A001CR0". Address set in Service Mode; initial 001. "FFF" broadcasts to all projectors (executes, no response). Response within 60ms.
- Dedicated serial cable required; D-Sub 9-pin crossover (RXD/TXD/SG/RTS/CTS crossed, CD/DTR/DSR/RING N.C.).
- Cooling Down runs ~90 seconds after POWER OFF before Standby (fan duration model-dependent).

<!-- UNRESOLVED: Expanded Serial Command set referenced in source but not provided — additional commands exist beyond this Basic spec -->
<!-- UNRESOLVED: family record name "PDG DHT PLC XF7x Series" is a DB hybrid of distinct Sanyo families (PDG-DHT vs PLC-XF70/XF71); source covers PDG-DHT100L only -->
<!-- UNRESOLVED: number of lamps not explicitly stated (CR3/CR7 multi-lamp responses imply multiple lamps) -->

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - "http://web.archive.org/web/20130125011725/http://us.sanyo.com/dynamic/product/Downloads/PLC-DHT100L_Basic%20_RS232-29505888.pdf"
retrieved_at: 2026-09-17T03:34:21.776Z
last_checked_at: 2026-09-19T22:16:21.530Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-19T22:16:21.530Z
matched_actions: 43
action_count: 43
confidence: medium
summary: "All 43 spec actions match source commands verbatim; transport parameters supported; no extra source commands. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the \"Basic\" command spec only — an \"Expanded\" serial command spec is referenced (section 8 mentions \"Expand Serial Command\") but not included in this document"
- "no settable non-discrete parameters documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no explicit safety warnings or interlock procedures in source"
- "Expanded Serial Command set referenced in source but not provided — additional commands exist beyond this Basic spec"
- "family record name \"PDG DHT PLC XF7x Series\" is a DB hybrid of distinct Sanyo families (PDG-DHT vs PLC-XF70/XF71); source covers PDG-DHT100L only"
- "number of lamps not explicitly stated (CR3/CR7 multi-lamp responses imply multiple lamps)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
