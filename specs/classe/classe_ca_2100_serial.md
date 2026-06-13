---
spec_id: admin/classe-audio-ca-2100
schema_version: ai4av-public-spec-v1
revision: 1
title: "Classe Audio CA-2100 Control Spec"
manufacturer: "Classé"
model_family: CA-2100
aliases: []
compatible_with:
  manufacturers:
    - "Classé"
    - "Classe Audio"
  models:
    - CA-2100
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
retrieved_at: 2026-06-12T02:04:38.899Z
last_checked_at: 2026-06-12T19:12:22.858Z
generated_at: 2026-06-12T19:12:22.858Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full list of CA-2100 specific commands beyond power/mute/input; CAN-Bus and DC trigger behaviour; standby power consumption; remote IR mapping"
  - "device may send autonomous telemetry beyond command replies."
  - "power-up sequencing across multi-amp CAN-Bus chain."
  - "detailed fault handling, thermal shutdown, ground/phase out-of-spec behaviour.\""
  - "CA-2100 specific channel-letter mapping for INPx; CAN-Bus multi-amp coordination; DC trigger behaviour; exact reply framing byte sequence; baud rate error tolerance"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:12:22.858Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions match source commands literally; transport parameters verified; source command set fully covered. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Classe Audio CA-2100 Control Spec

## Summary
RS-232 control for Classe Audio CA-2100 stereo power amplifier. Two-channel Class A design. Command set also documented for the broader CA/CT-XXXX delta amplifier family (CAP-2100, CA-2200, etc.). Spec covers ASCII command/response protocol on DB-9 RS-232 link at 9600/8/N/1 with hardware flow control.

<!-- UNRESOLVED: full list of CA-2100 specific commands beyond power/mute/input; CAN-Bus and DC trigger behaviour; standby power consumption; remote IR mapping -->

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
  type: none
```

## Traits
```yaml
- powerable
- queryable
```

## Actions
```yaml
- id: power_toggle
  label: Power Toggle
  kind: action
  command: "PWR"
  params: []
- id: power_off
  label: Power Off
  kind: action
  command: "PW0"
  params: []
- id: power_on
  label: Power On
  kind: action
  command: "PW1"
  params: []
- id: dim_cycle
  label: Front Panel Dim Cycle
  kind: action
  command: "DIM"
  params: []
- id: status_snapshot
  label: Heatsink / AC Status Snapshot
  kind: query
  command: "chk"
  params: []
- id: factory_data
  label: Version / Factory Data Query
  kind: query
  command: "fac"
  params: []
- id: mute_toggle
  label: Mute Toggle
  kind: action
  command: "MUT"
  params: []
- id: mute_off
  label: Mute Off
  kind: action
  command: "MU0"
  params: []
- id: mute_on
  label: Mute On
  kind: action
  command: "MU1"
  params: []
- id: set_amp_number
  label: Set Logical Amp Number
  kind: action
  command: "amp={n}"
  params:
    - name: n
      type: integer
      description: Logical amp number 1-15 for power-up delay
- id: input_balanced
  label: Input Balanced
  kind: action
  command: "INPx=B"
  params:
    - name: x
      type: string
      description: Channel identifier as documented per model
- id: input_single_ended
  label: Input Single Ended
  kind: action
  command: "INPx=S"
  params:
    - name: x
      type: string
      description: Channel identifier as documented per model
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, powering_up, on, fault]
  notes: PW0/PW1 reply strings include "Amplifier now OFF", "Amp already off", "Power up in process. Amplifier now ON.", "Amp already on.", "A fault prevents power up."
- id: mute_state
  type: enum
  values: [off, on]
  notes: MU0/MU1 reply strings include "Mute off.", "Mute already off.", "Mute on.", "Mute already on."
- id: heater_status
  type: string
  notes: chk reply lists per-heatsink Current and TEMP readings; "This Amplifier is OFF" when amp off
- id: ac_status
  type: string
  notes: chk reply includes AC Setting (e.g. 120), Line Freq (e.g. 60Hz), Internal Temp C, Ground OK/Not OK, Line Phase OK/Not OK, Line Voltage in spec / out of spec
- id: factory_identity
  type: string
  notes: fac reply includes firmware version, copyright, serial number, model, amp number, AC control version, per-heatsink board revision
```

## Variables
```yaml
- name: amp_number
  type: integer
  range: 1-15
  description: Logical amp number for power-up delay (only when amp is OFF)
  command: "amp={n}"
```

## Events
```yaml
# No unsolicited event section documented in source. UNRESOLVED: device may send autonomous telemetry beyond command replies.
```

## Macros
```yaml
# No multi-step sequences documented in source. UNRESOLVED: power-up sequencing across multi-amp CAN-Bus chain.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "Source notes 'A fault prevents power up.' reply on PW1. No detailed fault recovery procedure documented. UNRESOLVED: detailed fault handling, thermal shutdown, ground/phase out-of-spec behaviour."
```

## Notes
Commands available at all times: PWR, PW0, PW1, DIM, chk, fac.
Commands only when amp ON: MUT, MU0, MU1.
Commands only when amp OFF: amp=x (1-15), INPx=B, INPx=S.
Italics in source = reply from amplifier.
Reply terminated with CR+LF (3-character command echo + reply string + CR LF).
Source filename mentions CAP-2100; manufacturer treats CA-2100 and CAP-2100 as same RS-232 family. INPx channel identifier (x) format not fully spelled out in refined excerpt; CA-2100 is 2-channel so likely 1/2.
Hardware flow control required (RTS/CTS).
<!-- UNRESOLVED: CA-2100 specific channel-letter mapping for INPx; CAN-Bus multi-amp coordination; DC trigger behaviour; exact reply framing byte sequence; baud rate error tolerance -->

## Provenance

```yaml
source_domains:
  - support.classeaudio.com
source_urls:
  - https://support.classeaudio.com/files/documents/automation_and_control/rs232/CLASSE_Delta_Amps_RS232_Protocol.pdf
retrieved_at: 2026-06-12T02:04:38.899Z
last_checked_at: 2026-06-12T19:12:22.858Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:12:22.858Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions match source commands literally; transport parameters verified; source command set fully covered. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full list of CA-2100 specific commands beyond power/mute/input; CAN-Bus and DC trigger behaviour; standby power consumption; remote IR mapping"
- "device may send autonomous telemetry beyond command replies."
- "power-up sequencing across multi-amp CAN-Bus chain."
- "detailed fault handling, thermal shutdown, ground/phase out-of-spec behaviour.\""
- "CA-2100 specific channel-letter mapping for INPx; CAN-Bus multi-amp coordination; DC trigger behaviour; exact reply framing byte sequence; baud rate error tolerance"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
