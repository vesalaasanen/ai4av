---
spec_id: admin/key-digital-systems-kd-msv8x8
schema_version: ai4av-public-spec-v1
revision: 1
title: "Key Digital Systems KD-MSV8X8 Control Spec"
manufacturer: "Key Digital Systems"
model_family: KD-MSV8X8
aliases: []
compatible_with:
  manufacturers:
    - "Key Digital Systems"
  models:
    - KD-MSV8X8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - keydigital.com
  - manualslib.com
retrieved_at: 2026-04-29T16:42:38.486Z
last_checked_at: 2026-04-30T09:43:27.109Z
generated_at: 2026-04-30T09:43:27.109Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T09:43:27.109Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions match source commands verbatim; transport parameters verified; source catalogue fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# Key Digital Systems KD-MSV8X8 Control Spec

## Summary
The KD-MSV8X8 is an 8×8 HDMI matrix switcher from Key Digital Systems. This spec covers RS-232 serial control, which provides access to all switching, mute, fade-to-black, and query functions. Commands are not case sensitive; spaces are optional.

<!-- UNRESOLVED: no TCP/IP, HTTP, or other protocol documentation found in source -->
<!-- UNRESOLVED: no power on/off commands documented; power state management unclear -->
<!-- UNRESOLVED: response format details not fully specified (numeric vs verbose modes mentioned but response strings not enumerated) -->

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
- routable    # inferred: I/O switching commands (SP Oxx SI yy)
- queryable   # inferred: output and global status query commands (ST Oxx, ST A)
- levelable   # inferred: fade-to-black interval control (SP Oxx MI yy)
```

## Actions
```yaml
- id: io_switch
  label: I/O Switching Set
  kind: action
  template: "SP O{output:02d} SI {input:02d}"
  params:
    - name: output
      type: integer
      min: 1
      max: 8
      description: Output number (01-08)
    - name: input
      type: integer
      min: 1
      max: 8
      description: Input number (01-08)

- id: set_unit_address
  label: Unit Address Set
  kind: action
  template: "SP C A {address:02d}"
  params:
    - name: address
      type: integer
      min: 0
      max: 99
      description: "2-digit unit address; 00 = stand-alone"

- id: set_fade_to_black
  label: Fade-to-Black Interval Set
  kind: action
  template: "SP O{output:02d} MI {interval:02d}"
  params:
    - name: output
      type: integer
      min: 1
      max: 8
      description: Output number (01-08)
    - name: interval
      type: integer
      min: 0
      max: 9
      description: "Fade interval index (00=0ms, 01=40ms, 02=80ms, 03=160ms, 04=240ms, 05=320ms, 06=480ms, 07=640ms, 08=800ms, 09=1200ms)"

- id: ir_enable
  label: IR Sensor Enable
  kind: action
  template: "SP C IR E"
  params: []

- id: ir_disable
  label: IR Sensor Disable
  kind: action
  template: "SP C IR D"
  params: []

- id: front_panel_enable
  label: Front Panel Buttons Enable
  kind: action
  template: "SP C FB E"
  params: []

- id: front_panel_disable
  label: Front Panel Buttons Disable
  kind: action
  template: "SP C FB D"
  params: []

- id: output_mute
  label: Output Video Mute
  kind: action
  template: "SP O{output:02d} CM E"
  params:
    - name: output
      type: integer
      min: 1
      max: 8
      description: Output number (01-08)

- id: output_unmute
  label: Output Video Un-Mute
  kind: action
  template: "SP O{output:02d} CM D"
  params:
    - name: output
      type: integer
      min: 1
      max: 8
      description: Output number (01-08)

- id: all_outputs_mute
  label: All Outputs Mute
  kind: action
  template: "SP C CM E"
  params: []

- id: all_outputs_unmute
  label: All Outputs Un-Mute
  kind: action
  template: "SP C CM D"
  params: []

- id: reset_unit
  label: Reset Unit to Factory Default
  kind: action
  template: "SP C DF"
  params: []

- id: response_numeric
  label: Set Numeric RS-232 Response
  kind: action
  template: "SP C RS N"
  params: []

- id: response_verbose
  label: Set Verbose RS-232 Response
  kind: action
  template: "SP C RS V"
  params: []

- id: list_commands
  label: List RS-232 Commands
  kind: action
  template: "H"
  params: []

- id: amx_status
  label: AMX Status
  kind: action
  template: "AMX"
  params: []
```

## Feedbacks
```yaml
- id: output_status
  label: Output Status
  type: string
  query_template: "ST O{output:02d}"
  query_params:
    - name: output
      type: integer
      min: 1
      max: 8
      description: Output number (01-08)
  # UNRESOLVED: response format not fully documented; varies by numeric/verbose mode

- id: global_status
  label: Global Status
  type: string
  query_template: "ST A"
  query_params: []
  # UNRESOLVED: response format not fully documented; varies by numeric/verbose mode
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables with explicit value ranges documented beyond fade-to-black (captured as action)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - reset_unit  # factory reset is destructive
interlocks: []
# UNRESOLVED: no interlock procedures or power-on sequencing documented in source
```

## Notes
- Commands are not case sensitive (e.g. `SPO03SI07` and `spo03si07` are equivalent).
- Spaces in command strings are optional and ignored; `SP O03 SI 07` and `SPO03SI07` are equivalent.
- The `Oxx` parameter in commands is the letter "O" followed by a zero, then a two-digit output number (e.g. `O03`).
- Fade-to-black interval specifies the total time for fade-out + switch + fade-in; actual per-phase time is half the stated value.
- AMX status command suggests integration with AMX control systems but the response format is not documented.
<!-- UNRESOLVED: command terminator/delimiter not specified (CR, LF, CR+LF, or none) -->
<!-- UNRESOLVED: response timeout and retry behavior not documented -->
<!-- UNRESOLVED: no power on/off or standby commands documented -->
<!-- UNRESOLVED: numeric vs verbose response formats not enumerated -->

## Provenance

```yaml
source_domains:
  - keydigital.com
  - manualslib.com
retrieved_at: 2026-04-29T16:42:38.486Z
last_checked_at: 2026-04-30T09:43:27.109Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:43:27.109Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions match source commands verbatim; transport parameters verified; source catalogue fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
