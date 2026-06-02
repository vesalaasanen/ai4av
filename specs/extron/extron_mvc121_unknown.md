---
spec_id: admin/extron-mvc121
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron MVC 121 Control Spec"
manufacturer: Extron
model_family: "MVC 121"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "MVC 121"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
  - usermanual.wiki
  - manualshelf.com
source_urls:
  - https://www.extron.com/download/files/userman/MVC121manual_revCforweb.pdf
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicMvc121UsersManual541924.1092380054.pdf
  - https://www.extron.com
  - https://www.manualshelf.com/manual/extron-electronics/mvc-121/user-guide-english.html
retrieved_at: 2026-05-13T00:44:59.443Z
last_checked_at: 2026-05-15T21:38:58.162Z
generated_at: 2026-05-15T21:38:58.162Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Zpx firmware upload"
  - "no settable parameters beyond discrete actions identified"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "no TCP/IP or network control mentioned — RS-232 only"
verification:
  verdict: verified
  checked_at: 2026-05-15T21:38:58.162Z
  matched_actions: 22
  action_count: 22
  confidence: medium
  summary: "All 22 spec actions matched verbatim in source; transport verified; only firmware upload excluded from spec. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron MVC 121 Control Spec

## Summary
Extron MVC 121 is a microphone/line mixer with 2 mic inputs and 1 main line-level input, plus a master output. Controlled via RS-232 using Extron's Simple Instruction Set (SIS) ASCII protocol. Supports per-input gain/attenuation, master volume, mute, front panel lockout, and firmware update.

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
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable    # inferred from copyright/boot message on power-on
- queryable    # inferred from query commands returning state
- levelable    # inferred from volume/gain control commands
```

## Actions
```yaml
- id: set_input_mute
  label: Set Input Mute
  kind: action
  params:
    - name: input
      type: integer
      description: "Input channel (1=mic1, 2=mic2, 3=main line, 4=master output)"
    - name: state
      type: integer
      description: "0=off(mute), 1=on(unmute)"
  command: "{input}{state}"
  response: "{input}! I" or "E01" or "E14"

- id: set_output_mute
  label: Set Output Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off(mute), 1=on(unmute)"
  command: "4{state}"
  response: "4!" or "E01"

- id: set_output_volume
  label: Set Output Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume level 0-92. Gain (dB) = volume - 80. Default=50 (-30 dB)"
  command: "{volume}"
  response: "{volume}" or "E01" or "E13"

- id: increment_volume
  label: Increment Volume
  kind: action
  params: []
  command: "+V"
  response: "X1" or "E01" or "E13"

- id: decrement_volume
  label: Decrement Volume
  kind: action
  params: []
  command: "-V"
  response: "X1" or "E01" or "E13"

- id: increment_input_gain
  label: Increment Input Gain
  kind: action
  params:
    - name: input
      type: integer
      description: "Input channel (1-4)"
  command: "{input} +G"
  response: "G {input} X4" or "E01" or "E13"

- id: decrement_input_gain
  label: Decrement Input Gain
  kind: action
  params:
    - name: input
      type: integer
      description: "Input channel (1-4)"
  command: "{input} -G"
  response: "G {input} X4" or "E01" or "E13"

- id: set_input_gain
  label: Set Input Gain
  kind: action
  params:
    - name: input
      type: integer
      description: "Input channel (1-4)"
    - name: gain
      type: integer
      description: "Gain value 0-12 (+dB)"
  command: "I {input} {gain}"
  response: "G {input} {gain}" or "E01" or "E13"

- id: set_input_attenuation
  label: Set Input Attenuation
  kind: action
  params:
    - name: input
      type: integer
      description: "Input channel (1-4)"
    - name: attenuation
      type: integer
      description: "Attenuation value 1-79 (-dB)"
  command: "N {input} {attenuation}"
  response: "G {input} X4" or "E01" or "E13"

- id: set_volume_lower_limit
  label: Set Volume Lower Limit
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume level 0-92"
  command: "4*21# {volume}"
  response: "Vll4* {volume}" or "E01" or "E13"

- id: set_volume_upper_limit
  label: Set Volume Upper Limit
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume level 0-92"
  command: "4*22# {volume}"
  response: "Vul4* {volume}" or "E01" or "E13"

- id: set_executive_mode
  label: Set Executive Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=lock all except master volume, 2=lock all"
  command: "{mode}"
  response: "{mode}" or "E01" or "E13"

- id: factory_reset
  label: Factory Reset
  kind: action
  params: []
  command: "Q"
  response: "!" or "E01"
```

## Feedbacks
```yaml
- id: input_mute_status
  type: enum
  values: [0, 1, 2]
  description: "0=off(mute), 1=on(unmute), 2=mute by contact closure"
  query_command: "{input}?"
  response: "X3" or "E01"

- id: output_mute_status
  type: enum
  values: [0, 1]
  description: "0=off(mute), 1=on(unmute)"
  query_command: "4?"
  response: "X3" or "E01"

- id: output_volume
  type: integer
  description: "Volume level 0-92"
  query_command: "V"
  response: "X1" or "E01"

- id: input_gain
  type: integer
  description: "Gain/attenuation value (-79 through +12)"
  query_command: "{input} G"
  response: "X4" or "E01"

- id: volume_lower_limit
  type: integer
  description: "Volume lower limit 0-92"
  query_command: "4*21#"
  response: "X1" or "E01"

- id: volume_upper_limit
  type: integer
  description: "Volume upper limit 0-92"
  query_command: "4*22#"
  response: "X1" or "E01"

- id: executive_mode
  type: enum
  values: [0, 1, 2]
  description: "0=off, 1=mode1, 2=mode2"
  query_command: "X"
  response: "X8" or "E01"

- id: firmware_version
  type: string
  description: "Firmware version (x.xx format)"
  query_command: "I"
  response: "Version X7" or "E01"

- id: part_number
  type: string
  description: "Part number"
  query_command: "N"
  response: "60-572-01" or "E01"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions identified
```

## Events
```yaml
- id: power_on_copyright
  description: "Sent on power-on. Contains firmware version."
  response_format: "(C) Copyright 2004, Extron Electronics, MVC 121, V x.xx"

- id: contact_closure_mute
  description: "Sent when input muted by contact closure. Input settings restored after mute removed."
  response_format: "Unsolicited response per input channel"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All responses terminated with CR/LF (0x0D 0x0A).
- SIS volume/gain values use whole dB steps; front panel uses 0.5 dB steps. Each 0.5 dB increment between two whole dB units is reported as the lower value.
- Contact closure mute overrides SIS commands and front panel operations.
- Error codes: E01 (invalid channel), E10 (invalid command), E13 (value out of range), E14 (command invalid during contact closure mute), E23 (firmware update failure).
- Lower case characters accepted in command field only where indicated (+v, +g, etc.).
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no TCP/IP or network control mentioned — RS-232 only -->

## Provenance

```yaml
source_domains:
  - extron.com
  - usermanual.wiki
  - manualshelf.com
source_urls:
  - https://www.extron.com/download/files/userman/MVC121manual_revCforweb.pdf
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicMvc121UsersManual541924.1092380054.pdf
  - https://www.extron.com
  - https://www.manualshelf.com/manual/extron-electronics/mvc-121/user-guide-english.html
retrieved_at: 2026-05-13T00:44:59.443Z
last_checked_at: 2026-05-15T21:38:58.162Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:38:58.162Z
matched_actions: 22
action_count: 22
confidence: medium
summary: "All 22 spec actions matched verbatim in source; transport verified; only firmware upload excluded from spec. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Zpx firmware upload"
- "no settable parameters beyond discrete actions identified"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "no TCP/IP or network control mentioned — RS-232 only"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
