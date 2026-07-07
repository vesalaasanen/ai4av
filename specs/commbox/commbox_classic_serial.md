---
spec_id: admin/commbox-classic
schema_version: ai4av-public-spec-v1
revision: 1
title: "CommBox Classic Control Spec"
manufacturer: CommBox
model_family: "CommBox Classic"
aliases: []
compatible_with:
  manufacturers:
    - CommBox
  models:
    - "CommBox Classic"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
  - qsys.com
source_urls:
  - https://github.com/anhduyhn/commbox-cli
  - https://www.qsys.com/alliances-partnerships/commbox/
retrieved_at: 2026-07-01T14:16:53.992Z
last_checked_at: 2026-07-07T11:07:21.259Z
generated_at: 2026-07-07T11:07:21.259Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility, RS-232 availability (source describes TCP only — see Notes)"
  - "source uses raw TCP sockets, not HTTP"
  - "not stated in source)"
  - "source describes POWR setpoint values as numeric (e.g. `1`) but"
  - "mute state encoding not stated in source"
  - "freeze state encoding not stated in source"
  - "source documents only discrete commands and setpoints; no separate"
  - "source does not describe unsolicited device-pushed notifications."
  - "source does not describe multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "on/off encoding for POWR/MUTE/FREZ values; firmware version range; whether RS-232 framing exists on the device but is undocumented in this source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:07:21.259Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions (8 command codes + query variants) match source; transport TCP/4660 verified; no extra commands. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# CommBox Classic Control Spec

## Summary
CommBox Classic interactive flat-panel displays expose a plaintext TCP control protocol on port 4660. The protocol uses ASCII frames of the form `!000<CMD> <VALUE>\r`, with a 4-character command code and a setpoint or query marker. This spec documents the eight command codes the source describes.

<!-- UNRESOLVED: firmware version compatibility, RS-232 availability (source describes TCP only — see Notes) -->

## Transport
```yaml
# Protocol inference: source describes TCP frames on port 4660. No RS-232 framing
# or wiring details are documented in this source.
protocols:
  - tcp
addressing:
  port: 4660
  base_url: ""  # UNRESOLVED: source uses raw TCP sockets, not HTTP
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from POWR command
- levelable   # inferred from VOLM 0-100 setpoint
- routable    # inferred from INPT source-select command
- queryable   # inferred from `?` query syntax
```

## Actions
```yaml
- id: power_set
  label: Set Power
  kind: action
  command: "!000POWR {value}\r"
  params:
    - name: value
      type: enum
      description: Setpoint value (source lists examples like `1`; on/off mapping not stated)

- id: power_query
  label: Query Power
  kind: query
  command: "!000POWR ?\r"
  params: []

- id: volume_set
  label: Set Volume
  kind: action
  command: "!000VOLM {level}\r"
  params:
    - name: level
      type: integer
      description: Volume level 0-100 (per source)

- id: volume_query
  label: Query Volume
  kind: query
  command: "!000VOLM ?\r"
  params: []

- id: mute_set
  label: Set Mute
  kind: action
  command: "!000MUTE {value}\r"
  params:
    - name: value
      type: string
      description: Mute value (specific encoding UNRESOLVED: not stated in source)

- id: mute_query
  label: Query Mute
  kind: query
  command: "!000MUTE ?\r"
  params: []

- id: input_set
  label: Set Input
  kind: action
  command: "!000INPT {source}\r"
  params:
    - name: source
      type: enum
      description: Input source (source lists HDMI 1-4, DisplayPort, USB-C, OPC, Android, VGA, AV)

- id: input_query
  label: Query Input
  kind: query
  command: "!000INPT ?\r"
  params: []

- id: freeze_set
  label: Set Freeze
  kind: action
  command: "!000FREZ {value}\r"
  params:
    - name: value
      type: string
      description: Freeze state (specific encoding UNRESOLVED: not stated in source)

- id: freeze_query
  label: Query Freeze
  kind: query
  command: "!000FREZ ?\r"
  params: []

- id: model_query
  label: Query Model
  kind: query
  command: "!000MDLN ?\r"
  params: []

- id: serial_query
  label: Query Serial Number
  kind: query
  command: "!000SERN ?\r"
  params: []

- id: firmware_query
  label: Query Firmware Version
  kind: query
  command: "!000FWVR ?\r"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  # UNRESOLVED: source describes POWR setpoint values as numeric (e.g. `1`) but
  # does not state the on/off encoding explicitly.

- id: volume_level
  type: integer
  range: [0, 100]

- id: mute_state
  type: enum
  values: [on, off]
  # UNRESOLVED: mute state encoding not stated in source

- id: input_source
  type: enum
  values: [HDMI 1, HDMI 2, HDMI 3, HDMI 4, DisplayPort, USB-C, OPC, Android, VGA, AV]

- id: freeze_state
  type: enum
  values: [on, off]
  # UNRESOLVED: freeze state encoding not stated in source

- id: model_name
  type: string

- id: serial_number
  type: string

- id: firmware_version
  type: string
```

## Variables
```yaml
# UNRESOLVED: source documents only discrete commands and setpoints; no separate
# settable parameters beyond those encoded in the command values above.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited device-pushed notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
Source is a README for a third-party CLI (`commbox-cli`) that reverse-engineers the panel protocol, not a vendor-issued protocol manual. Frame format `!000<CMD> <VALUE>\r` and the eight command codes (POWR, VOLM, MUTE, INPT, FREZ, MDLN, SERN, FWVR) are described as observed behavior. Query responses use the form `!000<CMD>=<VALUE>\r`. Error responses contain `ERR4` (panel locked or wrong panel ID) or other `ERR` substrings. Each command opens a fresh TCP connection; no session persistence required. Connect timeout 2000ms, read timeout 800ms. Non-default ports supported inline as `host:port`. MUTE and FREZ are listed as "planned" in the implementation status but appear in the protocol command list — included here as documented, not as verified behavior. Operator-flagged "Known protocol: RS-232C" is not supported by this source (TCP only); treated as a discrepancy pending vendor confirmation.
<!-- UNRESOLVED: on/off encoding for POWR/MUTE/FREZ values; firmware version range; whether RS-232 framing exists on the device but is undocumented in this source. -->

## Provenance

```yaml
source_domains:
  - github.com
  - qsys.com
source_urls:
  - https://github.com/anhduyhn/commbox-cli
  - https://www.qsys.com/alliances-partnerships/commbox/
retrieved_at: 2026-07-01T14:16:53.992Z
last_checked_at: 2026-07-07T11:07:21.259Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:07:21.259Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions (8 command codes + query variants) match source; transport TCP/4660 verified; no extra commands. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility, RS-232 availability (source describes TCP only — see Notes)"
- "source uses raw TCP sockets, not HTTP"
- "not stated in source)"
- "source describes POWR setpoint values as numeric (e.g. `1`) but"
- "mute state encoding not stated in source"
- "freeze state encoding not stated in source"
- "source documents only discrete commands and setpoints; no separate"
- "source does not describe unsolicited device-pushed notifications."
- "source does not describe multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "on/off encoding for POWR/MUTE/FREZ values; firmware version range; whether RS-232 framing exists on the device but is undocumented in this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
