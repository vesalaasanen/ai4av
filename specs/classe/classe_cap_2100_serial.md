---
spec_id: admin/classe_audio-cap_2100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CAP-2100 Control Spec"
manufacturer: "Classé"
model_family: CAP-2100
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CAP-2100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CAP-2100_RS232_Protocol.pdf
retrieved_at: 2026-05-31T18:33:50.782Z
last_checked_at: 2026-05-31T20:56:05.670Z
generated_at: 2026-05-31T20:56:05.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no HTTP, TCP, UDP, or OSC support documented"
  - "no standalone settable parameters beyond discrete actions"
  - "no multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "selectable baud rates mentioned in source (system setup allows other baud selections) but specific baud rates not enumerated"
  - "trigger voltage/current specifications not stated"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-05-31T20:56:05.670Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched distinct source commands with correct parameters and transport verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Classe Audio CAP-2100 Control Spec

## Summary
Classe Audio CAP-2100 stereo preamplifier controlled via RS-232C. Protocol uses ASCII command strings with 4-byte address prefix "AP21" (optional when device is the only device on bus). 9600 baud, 8N1. Commands acknowledged with `!` or `?` within 100ms.

<!-- UNRESOLVED: no HTTP, TCP, UDP, or OSC support documented -->

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
addressing:
  default_address: "AP21"  # may be omitted when device is sole controller target
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # STBY, OPER present
- levelable      # VOLM, VOL+, VOL-, BALL, BALC, BALR present
- routable       # MAIN n, INP+, INP- present
- queryable      # STAT MAIN, STAT AMP, STAT AUTO, STAT OFF present
```

## Actions
```yaml
- id: main_input
  label: Change Main Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: inp_plus
  label: Next Input
  kind: action
  params: []

- id: inp_minus
  label: Previous Input
  kind: action
  params: []

- id: volm
  label: Set Volume
  kind: action
  params:
    - name: level
      type: float
      description: Volume level in dB (e.g., "00.0" to "99.9")

- id: vol_plus
  label: Volume Up
  kind: action
  params: []

- id: vol_minus
  label: Volume Down
  kind: action
  params: []

- id: mute
  label: Mute
  kind: action
  params: []

- id: unmute
  label: Unmute
  kind: action
  params: []

- id: ball
  label: Balance Left
  kind: action
  params: []

- id: balc
  label: Balance Center
  kind: action
  params: []

- id: balr
  label: Balance Right
  kind: action
  params: []

- id: stby
  label: Standby
  kind: action
  params: []

- id: oper
  label: Operate
  kind: action
  params: []

- id: t1_0
  label: Trigger 1 Off
  kind: action
  params: []

- id: t1_1
  label: Trigger 1 On
  kind: action
  params: []

- id: t2_0
  label: Trigger 2 Off
  kind: action
  params: []

- id: t2_1
  label: Trigger 2 On
  kind: action
  params: []

- id: lcd0
  label: LCD Low Power
  kind: action
  params: []

- id: lcd1
  label: LCD Low Intensity
  kind: action
  params: []

- id: lcd2
  label: LCD Medium Intensity
  kind: action
  params: []

- id: lcd3
  label: LCD High Intensity
  kind: action
  params: []

- id: irc
  label: IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: 3-digit IR code from CAP-2100 IR code table

- id: tap0
  label: Tape Monitor Off
  kind: action
  params: []

- id: tap1
  label: Tape Monitor On
  kind: action
  params: []

- id: stat_main
  label: Status Main
  kind: query
  params: []

- id: stat_amp
  label: Status Amplifier
  kind: query
  params: []

- id: stat_auto
  label: Status Auto Update On
  kind: query
  params: []

- id: stat_off
  label: Status Auto Update Off
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: ack
  label: Command Acknowledged
  type: string
  values: ["!"]

- id: nak
  label: Command Rejected
  type: string
  values: ["?"]

- id: sy_pwrup
  label: Power Up Complete
  type: string

- id: sy_stby
  label: Standby
  type: string

- id: sy_oper
  label: Operate
  type: string

- id: sy_volm
  label: Volume Status
  type: string
  description: Returns "SY VOLM vv.v" with optional "muted" suffix

- id: sy_main
  label: Main Input Status
  type: string
  description: Returns "SY MAIN n NN" where n=input number, NN=input name

- id: sy_heat
  label: Heatsink Temperature Status
  type: string
  description: "SY HEAT x where x: N=normal, H=high, V=very high, F=fault"

- id: sy_fault
  label: Amplifier Fault Status
  type: string
  description: "SY FAULT z n where z: N=none, C=current limit, T=temp limit, D=DC limit, I=internal comms, A=AC line fault; n: 1=left, 2=right"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
- id: sy_pwrup
  label: Power Up Complete
  description: "SY PWRUP - unsolicited, sent on power-on completion"

- id: sy_stby
  label: Standby
  description: "SY STBY - unsolicited, sent when device enters standby"

- id: sy_oper
  label: Operate
  description: "SY OPER - unsolicited, sent when device enters operate mode"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Address prefix "AP21" and period delimiter may be omitted when the controller connects directly to CAP-2100 (no multi-device bus).
- Volume acceleration: VOL +/- must be received within 200ms of the system's reply to engage acceleration mode.
- Command and status data are ASCII bytes; no binary encoding.
- 100ms maximum reply latency; if no reply received, reissue command.
- LCD intensity levels: LCD0=screen saver, LCD1=low, LCD2=medium, LCD3=high.
- IR code parameter `nnn` must be 3 digits from the CAP-2100 IR code table.
- Fault conditions: C=current limit, T=temperature limit, D=DC limit, I=internal communication, A=AC line fault.
- Heat status: N=normal, H=high, V=very high, F=fault.
<!-- UNRESOLVED: selectable baud rates mentioned in source (system setup allows other baud selections) but specific baud rates not enumerated -->
<!-- UNRESOLVED: trigger voltage/current specifications not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_CAP-2100_RS232_Protocol.pdf
retrieved_at: 2026-05-31T18:33:50.782Z
last_checked_at: 2026-05-31T20:56:05.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:56:05.670Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched distinct source commands with correct parameters and transport verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no HTTP, TCP, UDP, or OSC support documented"
- "no standalone settable parameters beyond discrete actions"
- "no multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "selectable baud rates mentioned in source (system setup allows other baud selections) but specific baud rates not enumerated"
- "trigger voltage/current specifications not stated"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
