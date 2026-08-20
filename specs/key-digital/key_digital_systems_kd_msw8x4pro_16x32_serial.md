---
spec_id: admin/key-digital-systems-kd-msw8x4pro-16x32
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSW8x4Pro-16x32 Control Spec"
manufacturer: "Key Digital"
model_family: KD-MSW8x4Pro-16x32
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital"
    - "Key Digital Systems"
  models:
    - KD-MSW8x4Pro-16x32
    - KD-MSW8x4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=13"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=14"
retrieved_at: 2026-08-15T21:42:34.970Z
last_checked_at: 2026-08-19T09:26:01.447Z
generated_at: 2026-08-19T09:26:01.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no TCP/IP, voltage, power, or firmware compatibility info in source"
  - "flow control not stated in source"
  - "no safety warnings or interlock procedures in source"
  - "command acknowledgement/error behavior beyond documented status response not stated in source"
  - "source does not state whether \"CCm/CCn 1~5\" covers 5 outputs while routing covers 4 outputs"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-08-19T09:26:01.447Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions match source commands verbatim; transport parameters (4800/8/N/1) also confirmed; source has no additional commands beyond those represented. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-16
---

# Key Digital Systems KD-MSW8x4Pro-16x32 Control Spec

## Summary
Key Digital Systems KD-MSW8x4 (Fat Boy series) HDTV matrix switcher, remotely controllable via RS-232 by control systems such as Crestron, AMX, ELAN, and Control4. This spec covers the RS-232 command protocol: I/O switching, status query, unit addressing, video mute, fade-to-black interval, output mode, factory reset, and IR/front-panel lockout. Source document refers to the base model as "KD-MSW8x4"; Fat Boy expansion units (e.g. KD-MSW8x4Pro-16x32) are covered by the same protocol per the source.

<!-- UNRESOLVED: no TCP/IP, voltage, power, or firmware compatibility info in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 4800
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from command evidence in source
- routable    # inferred: CCxy I/O switching command
- queryable   # inferred: CCww status query command
```

## Actions
```yaml
- id: io_switch
  label: I/O Switching
  kind: action
  command: "CC{x}{y}"
  params:
    - name: x
      type: integer
      description: "Output position (1...4)"
    - name: y
      type: integer
      description: "Input position (1...8)"

- id: status_query
  label: Status Query
  kind: query
  command: "CCww"
  params: []

- id: set_address
  label: Set Unit Address
  kind: action
  command: "CCA{address}"
  params:
    - name: address
      type: integer
      description: "Unit number 1-16, zero-padded two digits (e.g. CCA05). CCA16 selects default KD-MSW8x4 (non-addressable); CCA01~15 selects the unit at that pre-determined address."

- id: mute_enable
  label: Video Mute Enable
  kind: action
  command: "CCm{number}"
  params:
    - name: number
      type: integer
      description: "Output number (1~5)"

- id: mute_disable
  label: Video Mute Disable
  kind: action
  command: "CCn{number}"
  params:
    - name: number
      type: integer
      description: "Output number (1~5)"

- id: set_fade_to_black_interval
  label: Set Fade to Black Interval
  kind: action
  command: "CCi{interval}"
  params:
    - name: interval
      type: integer
      description: "0~9. 0=no mute, 1=28 ms, 2=40 ms, 3=80 ms, 4=120 ms, 5=160 ms, 6=240 ms, 7=320 ms, 8=400 ms, 9=600 ms. Whole muted period is twice the interval."

- id: output_mode_rgbhv
  label: Set Output RGBHV Mode
  kind: action
  command: "CCOR"
  params: []

- id: output_mode_component
  label: Set Output Component Mode (Factory Default)
  kind: action
  command: "CCOC"
  params: []

- id: factory_reset
  label: Factory Default Reset
  kind: action
  command: "CCF0"
  params: []

- id: ir_remote_disable
  label: Disable IR Remote Control
  kind: action
  command: "I"
  params: []

- id: ir_remote_enable
  label: Enable IR Remote Control
  kind: action
  command: "u"
  params: []

- id: front_panel_disable
  label: Disable Front Panel Pushbutton Controls
  kind: action
  command: "d"
  params: []

- id: front_panel_enable
  label: Enable Front Panel Pushbutton Controls
  kind: action
  command: "e"
  params: []
```

## Feedbacks
```yaml
- id: status_response
  type: string
  description: "UUy1y2y3y4n - response given by both CCxy and CCww. y1y2y3y4 = input states (1...8) per output; n = unit number (1...15)."
```

## Variables
```yaml
# No settable continuous variables documented in source; settable parameters
# (mute interval, output mode) are covered as discrete actions above.
```

## Events
```yaml
# No unsolicited notifications documented in source.
```

## Macros
```yaml
# No multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands are of defined length, so no terminator is required.
- Case discrepancy in source: fade-to-black command is given as `CCi<number(0~9)>` but examples use uppercase `CCI0`–`CCI9`. Verify against device.
- Output mode (CCOR/CCOC) must match signal type; if set incorrectly, mute function will not work and no picture is displayed.
- Whole period muted by fade-to-black is twice the configured interval.
- Factory reset (`CCF0`) results: inputs for every output set to 1, termination enabled, unit number (address) set to 16, mute interval set to 240 ms.
- Addressing example from source: `CCA05` sets address to 05; IR sequence 0→5→1→3 then links output 1 to input 1.
- Base KD-MSW8x4 requires user-supplied RS-232 cable; Fat Boy expansion units ship from factory with their own RS-232 cable.
<!-- UNRESOLVED: command acknowledgement/error behavior beyond documented status response not stated in source -->
<!-- UNRESOLVED: source does not state whether "CCm/CCn 1~5" covers 5 outputs while routing covers 4 outputs -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
source_urls:
  - "http://keydigital.com/Control%20Mods%20Codes/KDMSW8x4_RS232_Commands.pdf"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=13"
  - "https://www.manualslib.com/manual/359868/Key-Digital-Kd-Msw8x4pro.html?page=14"
retrieved_at: 2026-08-15T21:42:34.970Z
last_checked_at: 2026-08-19T09:26:01.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:26:01.447Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions match source commands verbatim; transport parameters (4800/8/N/1) also confirmed; source has no additional commands beyond those represented. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no TCP/IP, voltage, power, or firmware compatibility info in source"
- "flow control not stated in source"
- "no safety warnings or interlock procedures in source"
- "command acknowledgement/error behavior beyond documented status response not stated in source"
- "source does not state whether \"CCm/CCn 1~5\" covers 5 outputs while routing covers 4 outputs"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
