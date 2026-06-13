---
spec_id: admin/classe-audio-ca-ct-5300
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CA/CT-5300 Control Spec"
manufacturer: "Classé"
model_family: CA-CT-5300
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CA-CT-5300
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
  - https://support.classeaudio.com/files/documents/owners_manual/delta_2/CLASSE_CA_CT-5300_Manual_v1.6_en.pdf
retrieved_at: 2026-06-12T02:04:06.037Z
last_checked_at: 2026-06-12T19:14:37.508Z
generated_at: 2026-06-12T19:14:37.508Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no IP/TCP control documented; no firmware version compatibility stated"
  - "no continuously variable parameters documented in source"
  - "no unsolicited notification protocol documented in source"
  - "no multi-step sequences documented in source"
  - "source mentions fault condition ('A fault prevents power up') but no interlock or recovery procedure documented"
  - "INPx channel parameter range not explicitly stated"
  - "no command termination character (CR/LF/none) documented"
  - "no response format for chk/fac formalized beyond prose descriptions"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:14:37.508Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions matched literally in source; all transport parameters verified; comprehensive coverage of documented RS-232 protocol. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Classe Audio CA/CT-5300 Control Spec

## Summary
RS-232C control spec for Classe Audio DELTA & CT series amplifiers (CA/CT-XXXX family). Covers power, mute, front-panel dimming, diagnostics, factory info, amp numbering, and input switching. Serial only — no IP control documented.

<!-- UNRESOLVED: no IP/TCP control documented; no firmware version compatibility stated -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: hardware
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # PW0/PW1/PWR commands
  - queryable    # chk, fac return status data
  - levelable    # DIM cycles panel brightness
```

## Actions
```yaml
actions:
  - id: power_toggle
    label: Power Toggle
    kind: action
    command: "PWR"
    params: []
    notes: "Toggles power state. Response varies by current state."

  - id: power_off
    label: Power Off
    kind: action
    command: "PW0"
    params: []
    notes: "Responses: 'Amplifier now OFF.' or 'Amp already off.'"

  - id: power_on
    label: Power On
    kind: action
    command: "PW1"
    params: []
    notes: "Responses: 'Power up in process. Amplifier now ON.' or 'Amp already on.' or 'A fault prevents power up.'"

  - id: dim_cycle
    label: Cycle Panel Dimming
    kind: action
    command: "DIM"
    params: []
    notes: "Cycles through full brightness, medium brightness, low brightness."

  - id: diagnostics_snapshot
    label: Diagnostics Snapshot
    kind: query
    command: "chk"
    params: []
    notes: "Returns heatsink temps/currents, AC setting, line freq, internal temp, ground/phase/voltage status. Heatsink lines omitted when amp is OFF (returns 'This Amplifier is OFF'). Number of heatsink lines varies by model channel count."

  - id: factory_info
    label: Factory Info
    kind: query
    command: "fac"
    params: []
    notes: "Returns firmware version, serial number, model, amp number, AC control and heatsink config. Last line omitted when amp is on."

  - id: mute_toggle
    label: Mute Toggle
    kind: action
    command: "MUT"
    params: []
    availability: amp_on
    notes: "Toggles mute state. Only available when amp is ON."

  - id: mute_off
    label: Mute Off
    kind: action
    command: "MU0"
    params: []
    availability: amp_on
    notes: "Responses: 'Mute off.' or 'Mute already off.'"

  - id: mute_on
    label: Mute On
    kind: action
    command: "MU1"
    params: []
    availability: amp_on
    notes: "Responses: 'Mute on.' or 'Mute already on.'"

  - id: set_amp_number
    label: Set Logical Amp Number
    kind: action
    command: "amp={number}"
    params:
      - name: number
        type: integer
        min: 1
        max: 15
        description: Logical amp number for power-up delay sequencing
    availability: amp_off
    notes: "Only available when amp is OFF."

  - id: set_input_balanced
    label: Set Input Balanced
    kind: action
    command: "INP{x}=B"
    params:
      - name: x
        type: integer
        description: Channel number
    availability: amp_off
    notes: "Switches the channel to Balanced input. Only available when amp is OFF."

  - id: set_input_single_ended
    label: Set Input Single Ended
    kind: action
    command: "INP{x}=S"
    params:
      - name: x
        type: integer
        description: Channel number
    availability: amp_off
    notes: "Switches the channel to Single Ended input. Only available when amp is OFF."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [on, off, fault]
    description: "Derived from PW0/PW1/PWR responses. 'A fault prevents power up' indicates fault state."

  - id: mute_state
    type: enum
    values: [on, off]
    description: "Derived from MU0/MU1/MUT responses."

  - id: dim_level
    type: enum
    values: [full, medium, low]
    description: "Panel brightness level. Cycled via DIM command."

  - id: heatsink_status
    type: object
    description: "Per-heatsink current status (Normal/High) and temp status (Normal/High/WARNING VERY HIGH). Count varies by model channel count."

  - id: ac_diagnostics
    type: object
    description: "AC setting, line frequency, internal temp, ground status, line phase status, line voltage status."
```

## Variables
```yaml
# UNRESOLVED: no continuously variable parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification protocol documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions fault condition ('A fault prevents power up') but no interlock or recovery procedure documented
```

## Notes
- Commands are ASCII text sent over RS-232 with hardware flow control.
- Some commands are conditionally available depending on amp power state (ON vs OFF).
- `chk` response structure varies by model — number of heatsink lines equals channel count (e.g., 5 for CA-5300).
- `INP{x}` parameter `x` range not explicitly stated in source; presumed to match channel count.

<!-- UNRESOLVED: INPx channel parameter range not explicitly stated -->
<!-- UNRESOLVED: no command termination character (CR/LF/none) documented -->
<!-- UNRESOLVED: no response format for chk/fac formalized beyond prose descriptions -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
  - https://support.classeaudio.com/files/documents/owners_manual/delta_2/CLASSE_CA_CT-5300_Manual_v1.6_en.pdf
retrieved_at: 2026-06-12T02:04:06.037Z
last_checked_at: 2026-06-12T19:14:37.508Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:14:37.508Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions matched literally in source; all transport parameters verified; comprehensive coverage of documented RS-232 protocol. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no IP/TCP control documented; no firmware version compatibility stated"
- "no continuously variable parameters documented in source"
- "no unsolicited notification protocol documented in source"
- "no multi-step sequences documented in source"
- "source mentions fault condition ('A fault prevents power up') but no interlock or recovery procedure documented"
- "INPx channel parameter range not explicitly stated"
- "no command termination character (CR/LF/none) documented"
- "no response format for chk/fac formalized beyond prose descriptions"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
