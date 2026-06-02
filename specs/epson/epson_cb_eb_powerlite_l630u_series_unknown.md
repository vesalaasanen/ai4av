---
spec_id: admin/epson-cb-eb-powerlite-l630u-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Epson CB EB PowerLite L630U Series Control Spec"
manufacturer: Epson
model_family: "CB EB PowerLite L630U"
aliases: []
compatible_with:
  manufacturers:
    - Epson
  models:
    - "CB EB PowerLite L630U"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:57:21.734Z
last_checked_at: 2026-05-19T17:04:13.476Z
generated_at: 2026-05-19T17:04:13.476Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - MSEL00
  - MSEL01
  - MSEL02
  - "CB EB PowerLite L630U not listed in the applicable models table — command set may differ from the documented home-projector models"
  - "TCP/IP port number not stated in source"
  - "no response format tables documented beyond colon/ERR"
  - "TCP port number not stated in source"
  - "settable parameter names beyond PWR/MUTE/SOURCE not enumerated in source"
  - "no multi-step sequences described in source"
  - "source notes PWR ON may require preparation steps on some models"
  - "CB EB PowerLite L630U not in applicable model list — exact command compatibility unconfirmed"
  - "TCP/IP port number for network control not stated"
  - "full set of queryable parameters not enumerated"
  - "response format details beyond colon/ERR not documented"
verification:
  verdict: verified
  checked_at: 2026-05-19T17:04:13.476Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literally in source with correct shapes; transport serial parameters verified; 3 menu-select commands present in source but not represented in spec. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Epson CB EB PowerLite L630U Series Control Spec

## Summary
Epson CB EB PowerLite L630U is a laser projector controlled via the ESC/VP21 protocol. ESC/VP21 uses ASCII command codes transmitted over serial (RS-232C), USB, or TCP/IP. This spec covers power, mute, source selection, and query commands.

<!-- UNRESOLVED: CB EB PowerLite L630U not listed in the applicable models table — command set may differ from the documented home-projector models -->
<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: no response format tables documented beyond colon/ERR -->

## Transport
```yaml
protocols:
  - serial
  - tcp
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
- powerable    # PWR ON / PWR OFF commands present
- queryable    # Get command format documented (? suffix)
- routable     # SOURCE commands for input selection present
- levelable    # INC/DEC step parameters for adjustable values
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  command: "PWR ON"
  params: []

- id: power_off
  label: Power Off
  kind: action
  command: "PWR OFF"
  params: []

- id: mute_on
  label: Mute On
  kind: action
  command: "MUTE ON"
  params: []

- id: mute_off
  label: Mute Off
  kind: action
  command: "MUTE OFF"
  params: []

- id: source_select
  label: Select Source
  kind: action
  command: "SOURCE {code}"
  params:
    - name: code
      type: string
      description: "Source code (e.g. 10=cyclic input1, 11=AnalogRGB, 14=YCbCr, 15=YPbPr, 1F=Auto, 20=cyclic input2, 30=cyclic input3, 40=cyclic video, 41=video RCA, 42=video S, A0=HDMI, D0=WirelessHD)"

- id: null_command
  label: Heartbeat / Null Command
  kind: action
  command: "\\r"
  description: "Sends carriage return (0x0D). Projector responds with colon to confirm operation."
  params: []

- id: step_increment
  label: Increment Parameter
  kind: action
  command: "{param} INC"
  description: "Increments the parameter by one step."
  params:
    - name: param
      type: string
      description: "Parameter name to increment"

- id: step_decrement
  label: Decrement Parameter
  kind: action
  command: "{param} DEC"
  description: "Decrements the parameter by one step."
  params:
    - name: param
      type: string
      description: "Parameter name to decrement"

- id: step_init
  label: Initialize Parameter
  kind: action
  command: "{param} INIT"
  description: "Resets the parameter to its initial value."
  params:
    - name: param
      type: string
      description: "Parameter name to initialize"
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: query
  command: "PWR?"
  values: [ON, OFF]
  description: "Query current power state."

- id: mute_state
  label: Mute State
  type: query
  command: "MUTE?"
  values: [ON, OFF]
  description: "Query current mute state."

- id: source_state
  label: Current Source
  type: query
  command: "SOURCE?"
  description: "Query currently selected input source."

- id: error_response
  label: Error Response
  type: enum
  values: [ERR]
  description: "Returned when an invalid command is received. Followed by 0x0D and colon."
```

## Variables
```yaml
# UNRESOLVED: settable parameter names beyond PWR/MUTE/SOURCE not enumerated in source
```

## Events
```yaml
# No unsolicited notifications documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes PWR ON may require preparation steps on some models
# (e.g. SPWRLVL 01 command, standby state requirement) - applicability to L630U unknown
```

## Notes
- ESC/VP21 commands are ASCII-based. Projector responds with a colon (`:`) after successful command execution.
- Error responses consist of `ERR` followed by `0x0D` and `:`.
- Step parameters (INC/DEC/INIT) apply to adjustable values; specific parameter names for this model are not documented in the source.
- Source selection uses hexadecimal codes where the first digit identifies the input group (1=INPUT1, 2=INPUT2, 3=INPUT3, 4=VIDEO, A=HDMI, C=INPUT5, D=WirelessHD) and the second digit identifies the signal type within that group (0=cyclic, F=auto).
<!-- UNRESOLVED: CB EB PowerLite L630U not in applicable model list — exact command compatibility unconfirmed -->
<!-- UNRESOLVED: TCP/IP port number for network control not stated -->
<!-- UNRESOLVED: full set of queryable parameters not enumerated -->
<!-- UNRESOLVED: response format details beyond colon/ERR not documented -->

## Provenance

```yaml
source_domains:
  - files.support.epson.com
source_urls:
  - https://files.support.epson.com/pdf/pltw1_/pltw1_cm.pdf
  - https://files.support.epson.com/pdf/pl600p/pl600pcm.pdf
retrieved_at: 2026-05-14T15:57:21.734Z
last_checked_at: 2026-05-19T17:04:13.476Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:04:13.476Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literally in source with correct shapes; transport serial parameters verified; 3 menu-select commands present in source but not represented in spec. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- MSEL00
- MSEL01
- MSEL02
- "CB EB PowerLite L630U not listed in the applicable models table — command set may differ from the documented home-projector models"
- "TCP/IP port number not stated in source"
- "no response format tables documented beyond colon/ERR"
- "TCP port number not stated in source"
- "settable parameter names beyond PWR/MUTE/SOURCE not enumerated in source"
- "no multi-step sequences described in source"
- "source notes PWR ON may require preparation steps on some models"
- "CB EB PowerLite L630U not in applicable model list — exact command compatibility unconfirmed"
- "TCP/IP port number for network control not stated"
- "full set of queryable parameters not enumerated"
- "response format details beyond colon/ERR not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
