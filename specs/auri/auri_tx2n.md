---
spec_id: admin/auri-tx2n
schema_version: ai4av-public-spec-v1
revision: 1
title: "Auri TX2N Control Spec"
manufacturer: Auri
model_family: "Auri TX2N"
aliases: []
compatible_with:
  manufacturers:
    - Auri
  models:
    - "Auri TX2N"
    - "Auri TX2N-D"
  firmware: "\">=1.5\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ampetronic.com
  - listentech.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP3B615-1-Auri-Third-Party-Control-API-Customer-Documentation.pdf
  - https://www.listentech.com/wp-content/uploads/2025/09/DV60066-Auri-Q-Sys-Plugin-Guide.pdf
retrieved_at: 2026-05-04T13:37:50.465Z
last_checked_at: 2026-09-02T22:17:07.995Z
generated_at: 2026-09-02T22:17:07.995Z
firmware_coverage: "\">=1.5\""
protocol_coverage: []
known_gaps:
  - "Auri Manager version required (1.4) but not all firmware versions prior to 1.5 are catalogued"
  - "no continuous settable parameters beyond the discrete commands above;"
  - "source does not document unsolicited notifications."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings or interlock procedures."
  - "source does not specify whether SET on read-only fields (OUTPUT LEVEL) returns error 8 or silently no-ops."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:17:07.995Z
  matched_actions: 16
  action_count: 16
  confidence: medium
  summary: "All 16 spec actions map 1:1 to the 16 TX2N commands documented in the source; transport port/protocol/auth confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Auri TX2N Control Spec

## Summary
Auri TX2N / TX2N-D wireless audio transmitter. Third-party control via plaintext UDP API on port 54666, no authentication. Supports system status/identify, two radio encryption channels, and per-stream/per-input mute and output level queries.

<!-- UNRESOLVED: Auri Manager version required (1.4) but not all firmware versions prior to 1.5 are catalogued -->

## Transport
```yaml
protocols:
  - udp
addressing:
  port: 54666
auth:
  type: none  # inferred: source states plaintext UDP with no authentication
```

## Traits
```yaml
- queryable  # inferred from GET command examples
- levelable  # inferred from OUTPUT LEVEL LEFT/RIGHT commands
```

## Actions
```yaml
# Each enumerated row from source = one action. GET + SET pairs = two actions.

- id: get_system_status
  label: Get System Status
  kind: query
  command: "GET SYSTEM STATUS\r"
  params: []

- id: set_system_identify
  label: Identify Device
  kind: action
  command: "SET SYSTEM IDENTIFY = ON\r"
  params: []

- id: get_radio_encryption
  label: Get Radio Encryption
  kind: query
  command: "GET RADIO {radio} ENCRYPTION\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)

- id: set_radio_encryption
  label: Set Radio Encryption
  kind: action
  command: "SET RADIO {radio} ENCRYPTION = {value}\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)
    - name: value
      type: enum
      values: [ON, OFF]

- id: get_radio_encryption_broadcast_name
  label: Get Radio Broadcast Name
  kind: query
  command: "GET RADIO {radio} ENCRYPTION BROADCAST_NAME\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)

- id: set_radio_encryption_broadcast_name
  label: Set Radio Broadcast Name
  kind: action
  command: "SET RADIO {radio} ENCRYPTION BROADCAST_NAME = {value}\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)
    - name: value
      type: string
      description: 4-32 characters, extended ASCII, quoted

- id: get_radio_encryption_privacy_key
  label: Get Radio Privacy Key
  kind: query
  command: "GET RADIO {radio} ENCRYPTION PRIVACY_KEY\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)

- id: set_radio_encryption_privacy_key
  label: Set Radio Privacy Key
  kind: action
  command: "SET RADIO {radio} ENCRYPTION PRIVACY_KEY = {value}\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)
    - name: value
      type: string
      description: Blank, or 4-16 characters extended ASCII, quoted

- id: get_radio_transmitter_output
  label: Get Radio Transmitter Output
  kind: query
  command: "GET RADIO {radio} TRANSMITTER OUTPUT\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)

- id: set_radio_transmitter_output
  label: Set Radio Transmitter Output
  kind: action
  command: "SET RADIO {radio} TRANSMITTER OUTPUT = {value}\r"
  params:
    - name: radio
      type: integer
      description: Radio number (1 or 2)
    - name: value
      type: enum
      values: [ON, OFF]

- id: get_audio_stream_program_info
  label: Get Audio Stream Program Info
  kind: query
  command: "GET AUDIO STREAM {stream} PROGRAM INFO\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)

- id: set_audio_stream_program_info
  label: Set Audio Stream Program Info
  kind: action
  command: "SET AUDIO STREAM {stream} PROGRAM INFO = {value}\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)
    - name: value
      type: string
      description: 4-32 characters, extended ASCII, quoted

- id: get_audio_stream_input_mute
  label: Get Audio Stream Input Mute
  kind: query
  command: "GET AUDIO STREAM {stream} INPUT {input} MUTE\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)
    - name: input
      type: integer
      description: Input number (1 or 2)

- id: set_audio_stream_input_mute
  label: Set Audio Stream Input Mute
  kind: action
  command: "SET AUDIO STREAM {stream} INPUT {input} MUTE = {value}\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)
    - name: input
      type: integer
      description: Input number (1 or 2)
    - name: value
      type: enum
      values: [ON, OFF]

- id: get_audio_stream_output_level_left
  label: Get Audio Stream Output Level Left
  kind: query
  command: "GET AUDIO STREAM {stream} OUTPUT LEVEL LEFT\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)

- id: get_audio_stream_output_level_right
  label: Get Audio Stream Output Level Right
  kind: query
  command: "GET AUDIO STREAM {stream} OUTPUT LEVEL RIGHT\r"
  params:
    - name: stream
      type: integer
      description: Stream number (1 or 2)
```

## Feedbacks
```yaml
- id: system_status
  type: enum
  values: [ok, fault]
  description: 0 = OK, non-zero = Fault
# Source documents all command responses as plain text echoed with current value;
# no structured feedback schema beyond these enums.
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters beyond the discrete commands above;
# OUTPUT LEVEL is read-only per source (GET only).
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
# Note: IDENTIFY triggers 30s LED flash - operator-visible only, not safety-critical.
```

## Notes
- Commands must terminate with `\r` (ASCII 13); spacing around `=` must match exactly.
- API disabled by default; enable via Settings in Auri Manager (v1.4+).
- Firmware 1.5+ required for API support.
- Plaintext UDP, no authentication — network security is operator's responsibility.
- Identical command set applies to TX2N-D variant.
- Error codes documented: 201 (no GET/SET), 202 (no module), 203 (no parameter), 204 (no setting), 205 (unprocessable), 8 (unknown identifier), 17 (value too long), 37 (value too short).

<!-- UNRESOLVED: source does not specify whether SET on read-only fields (OUTPUT LEVEL) returns error 8 or silently no-ops. -->

## Provenance

```yaml
source_domains:
  - ampetronic.com
  - listentech.com
source_urls:
  - https://www.ampetronic.com/wp-content/uploads/UP3B615-1-Auri-Third-Party-Control-API-Customer-Documentation.pdf
  - https://www.listentech.com/wp-content/uploads/2025/09/DV60066-Auri-Q-Sys-Plugin-Guide.pdf
retrieved_at: 2026-05-04T13:37:50.465Z
last_checked_at: 2026-09-02T22:17:07.995Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:17:07.995Z
matched_actions: 16
action_count: 16
confidence: medium
summary: "All 16 spec actions map 1:1 to the 16 TX2N commands documented in the source; transport port/protocol/auth confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Auri Manager version required (1.4) but not all firmware versions prior to 1.5 are catalogued"
- "no continuous settable parameters beyond the discrete commands above;"
- "source does not document unsolicited notifications."
- "source does not document multi-step sequences."
- "source contains no safety warnings or interlock procedures."
- "source does not specify whether SET on read-only fields (OUTPUT LEVEL) returns error 8 or silently no-ops."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
