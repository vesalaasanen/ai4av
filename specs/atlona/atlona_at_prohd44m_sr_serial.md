---
spec_id: admin/atlona-at-prohd44m-sr
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PROHD44M-SR Control Spec"
manufacturer: Atlona
model_family: AT-PROHD44M-SR
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PROHD44M-SR
    - AT-PROHD44M-S
    - AT-PROHD44M-R
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20240525062053/https://www.atlona.com/pdf/manuals/AT-PROHD44M-SR_manual.pdf
retrieved_at: 2026-06-15T13:14:48.903Z
last_checked_at: 2026-06-16T07:00:48.302Z
generated_at: 2026-06-16T07:00:48.302Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/IP control port and framing not documented in source. Only RS232 config is given."
  - "TCP port number not stated in source"
  - "source documents no query/response or acknowledgement strings"
  - "source documents no settable continuous parameters (volume/gain/etc.)"
  - "source documents no unsolicited notifications"
  - "source documents no multi-step command sequences"
  - "source contains no power-on sequencing or safety interlock"
  - "firmware version compatibility not stated in source"
  - "TCP/IP port number and TCP framing not documented in source"
  - "no power on/off, standby, mute, or query commands documented in source"
  - "response/acknowledgement behaviour for routing commands not documented"
verification:
  verdict: verified
  checked_at: 2026-06-16T07:00:48.302Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 routing commands verified against source hex codes; serial transport parameters (9600/8/N/1) fully supported. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-15
---

# Atlona AT-PROHD44M-SR Control Spec

## Summary
The Atlona AT-PROHD44M-SR is a 4x4 HDMI matrix switcher (sold with 4 CAT5 receivers) that routes any of 4 HDMI inputs to any of 4 outputs. This spec covers RS-232 serial control of input/output routing. The device also exposes a TCP/IP port and RS485 connector (with RS485-to-RS232 adapter); TCP control parameters are not documented in the source.

<!-- UNRESOLVED: TCP/IP control port and framing not documented in source. Only RS232 config is given. -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred from "TCP/IP port" connector and TCP/IP switching mode listed in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - routable  # inferred from routing command examples (24 input/output select commands)
```

## Actions
```yaml
# All commands are ASCII of the form `cir XX` terminated by a carriage return
# (CR). The source notes: " is carriage return". `cir` is the literal prefix
# as written; XX is the hex byte for the specific route.
# Each output x input combination is a distinct hex sequence and is listed as a
# separate row in the source command table, so each gets its own action.

# --- Output 1 routing ---
- id: o1_input_prev
  label: Output 1 Select Input Previous
  kind: action
  command: "cir 57"
  params: []

- id: o1_input_next
  label: Output 1 Select Input Next
  kind: action
  command: "cir 41"
  params: []

- id: o1_input_1
  label: Output 1 Select Input 1
  kind: action
  command: "cir 09"
  params: []

- id: o1_input_2
  label: Output 1 Select Input 2
  kind: action
  command: "cir 1D"
  params: []

- id: o1_input_3
  label: Output 1 Select Input 3
  kind: action
  command: "cir 1F"
  params: []

- id: o1_input_4
  label: Output 1 Select Input 4
  kind: action
  command: "cir 0D"
  params: []

# --- Output 2 routing ---
- id: o2_input_prev
  label: Output 2 Select Input Previous
  kind: action
  command: "cir 63"
  params: []

- id: o2_input_next
  label: Output 2 Select Input Next
  kind: action
  command: "cir 62"
  params: []

- id: o2_input_1
  label: Output 2 Select Input 1
  kind: action
  command: "cir 19"
  params: []

- id: o2_input_2
  label: Output 2 Select Input 2
  kind: action
  command: "cir 1B"
  params: []

- id: o2_input_3
  label: Output 2 Select Input 3
  kind: action
  command: "cir 11"
  params: []

- id: o2_input_4
  label: Output 2 Select Input 4
  kind: action
  command: "cir 15"
  params: []

# --- Output 3 routing ---
- id: o3_input_prev
  label: Output 3 Select Input Previous
  kind: action
  command: "cir 65"
  params: []

- id: o3_input_next
  label: Output 3 Select Input Next
  kind: action
  command: "cir 64"
  params: []

- id: o3_input_1
  label: Output 3 Select Input 1
  kind: action
  command: "cir 17"
  params: []

- id: o3_input_2
  label: Output 3 Select Input 2
  kind: action
  command: "cir 12"
  params: []

- id: o3_input_3
  label: Output 3 Select Input 3
  kind: action
  command: "cir 59"
  params: []

- id: o3_input_4
  label: Output 3 Select Input 4
  kind: action
  command: "cir 08"
  params: []

# --- Output 4 routing ---
- id: o4_input_prev
  label: Output 4 Select Input Previous
  kind: action
  command: "cir 67"
  params: []

- id: o4_input_next
  label: Output 4 Select Input Next
  kind: action
  command: "cir 66"
  params: []

- id: o4_input_1
  label: Output 4 Select Input 1
  kind: action
  command: "cir 50"
  params: []

- id: o4_input_2
  label: Output 4 Select Input 2
  kind: action
  command: "cir 55"
  params: []

- id: o4_input_3
  label: Output 4 Select Input 3
  kind: action
  command: "cir 48"
  params: []

- id: o4_input_4
  label: Output 4 Select Input 4
  kind: action
  command: "cir 4A"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source documents no query/response or acknowledgement strings
```

## Variables
```yaml
# UNRESOLVED: source documents no settable continuous parameters (volume/gain/etc.)
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step command sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no power-on sequencing or safety interlock
# procedures. The IR call-back enable/disable panel procedure (hold Output2 +
# Key Lock ~3s) is a user-facing toggle, not a safety interlock.
```

## Notes
- The RS485 port ships with an RS485-to-RS232 adapter; the serial config above (9600/8/N/1/none) is the RS232 configuration applied through that adapter.
- Command terminator is a carriage return (CR). The source denotes CR with a literal space-like glyph ("Note: ' ' is carriage return").
- Command prefix `cir` is written verbatim in the source command table; the following two hex digits are the route-specific byte.
- The `<` and `>` symbols prefix the previous/next rows in the source table and are not part of the command payload (they visually indicate left/right navigation). The actual payloads are `cir 57` / `cir 41` etc.
- RS232 cable wiring (straight-through on pins 2/3 swap, GND on pin 5): controller Tx→device Rx (pin 2↔3), GND pin 5. Pins 1,4,6,7,8,9 are NC.
- IR call-back feature (passes IR from remote receivers through the matrix) is toggled by holding the Output 2 selection button + Key Lock button together for ~3 seconds: one flash of Output1/Output2 LEDs = enabled, two flashes = disabled.
- IR pass-through is limited to IR signals not exceeding 38 KHz; higher-frequency IR will not pass through.
- TCP/IP port requires direct crosswire CAT5/6/7 to a computer, or straight-through wire to a router.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: TCP/IP port number and TCP framing not documented in source -->
<!-- UNRESOLVED: no power on/off, standby, mute, or query commands documented in source -->
<!-- UNRESOLVED: response/acknowledgement behaviour for routing commands not documented -->
````

## Provenance

```yaml
source_domains:
  - web.archive.org
source_urls:
  - https://web.archive.org/web/20240525062053/https://www.atlona.com/pdf/manuals/AT-PROHD44M-SR_manual.pdf
retrieved_at: 2026-06-15T13:14:48.903Z
last_checked_at: 2026-06-16T07:00:48.302Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-16T07:00:48.302Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 routing commands verified against source hex codes; serial transport parameters (9600/8/N/1) fully supported. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/IP control port and framing not documented in source. Only RS232 config is given."
- "TCP port number not stated in source"
- "source documents no query/response or acknowledgement strings"
- "source documents no settable continuous parameters (volume/gain/etc.)"
- "source documents no unsolicited notifications"
- "source documents no multi-step command sequences"
- "source contains no power-on sequencing or safety interlock"
- "firmware version compatibility not stated in source"
- "TCP/IP port number and TCP framing not documented in source"
- "no power on/off, standby, mute, or query commands documented in source"
- "response/acknowledgement behaviour for routing commands not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
