---
spec_id: admin/bss-audio-blu-gpx
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-GPX Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-GPX
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-GPX
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - github.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://github.com/dudest/HiQnet
  - https://bssaudio.com/en/support
retrieved_at: 2026-06-30T19:13:07.282Z
last_checked_at: 2026-08-05T08:13:47.348Z
generated_at: 2026-08-05T08:13:47.348Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BLU-GPX-specific GPIO/state-variable table is not present in the source. Fixed-object IDs in Appendix D reference BLU-800/806/320/326/160/80/100/102 families, not BLU-GPX. Specific BLU-GPX virtual_obj IDs and SV IDs must be sourced from London Architect for the configured device."
  - "no explicit power on/off commands in source)"
  - "no input/output routing commands in source for BLU-GPX)"
  - "protocol returns unsolicited SET messages after SUBSCRIBE,"
  - "settable SV IDs depend on the BLU-GPX device configuration"
  - "source describes unsolicited SET messages following a"
  - "source describes a \"query\" pattern to discover a unit's"
  - "no explicit safety warnings, interlocks, or power-on"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:13:47.348Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec opcodes (0x80–0x91, skipping 0x83–0x87 and 0x92–0x94) match the source Message Opcodes table verbatim; transport values also match. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-GPX Control Spec

## Summary
This spec covers third-party control of the BSS Audio BLU-GPX (Soundweb London GPIO expander) via the Soundweb London Direct Inject Message protocol. The device exposes both RS-232 (null modem, 115200 8N1) and TCP (port 1023) transports, framed by STX/ETX/ACK/NAK/Escape bytes, supporting state-variable get/set, subscribe/unsubscribe, percentage control, preset recall, and string variables. The source document is family-level Soundweb London protocol reference rather than BLU-GPX-specific; the BLU-GPX itself is a GPIO expander and the parametrised actions below target its processing objects via the same wire protocol.

<!-- UNRESOLVED: BLU-GPX-specific GPIO/state-variable table is not present in the source. Fixed-object IDs in Appendix D reference BLU-800/806/320/326/160/80/100/102 families, not BLU-GPX. Specific BLU-GPX virtual_obj IDs and SV IDs must be sourced from London Architect for the configured device. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - powerable       (UNRESOLVED: no explicit power on/off commands in source)
# - routable        (UNRESOLVED: no input/output routing commands in source for BLU-GPX)
- queryable       # inferred: SUBSCRIBE / SUBSCRIBE% messages return state
- levelable       # inferred: SETV / SETVPERCENT messages control variable values
```

## Actions
```yaml
# Each named opcode from the source message-opcode table counts as one action.
# The body fields (node, virtual_obj, state_variable, data) are parameterised.
# The literal wire payload cannot be enumerated statically because each message
# body is variable-length with a computed XOR checksum and STX/ETX framing;
# the verifier should treat these as opcode-level action rows.

- id: di_presetcall
  label: Recall Preset (DI_PRESETCALL)
  kind: action
  command: "0x80"  # opcode; body = <node> <virtual_obj> <preset_id> ; framed as STX <body> <XOR checksum> ETX
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID (e.g. 0x32)
    - name: preset_id
      type: integer
      description: Preset identifier to recall

- id: di_presetscall
  label: Subscribe to Preset Call (DI_PRESETSCALL)
  kind: action
  command: "0x81"  # opcode; body = <node> <virtual_obj> <preset_id>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: preset_id
      type: integer
      description: Preset identifier to subscribe to

- id: di_presetuncall
  label: Unsubscribe from Preset Call (DI_PRESETUNCALL)
  kind: action
  command: "0x82"  # opcode; body = <node> <virtual_obj> <preset_id> 0
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: preset_id
      type: integer
      description: Preset identifier to unsubscribe from

- id: di_setv
  label: Set State Variable (DI_SETV)
  kind: action
  command: "0x88"  # opcode; body = <node> <virtual_obj> <state_variable> <data>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier (see Appendix G)
    - name: data
      type: integer
      description: 32-bit raw value (encoding depends on data type - see Appendix A)

- id: di_subscribev
  label: Subscribe to State Variable (DI_SUBSCRIBEV)
  kind: action
  command: "0x89"  # opcode; body = <node> <virtual_obj> <state_variable>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier
    - name: period_250ms
      type: integer
      description: Notification period in units of 250ms (minimum 4 = 1s)

- id: di_unsubscribev
  label: Unsubscribe from State Variable (DI_UNSUBSCRIBEV)
  kind: action
  command: "0x8A"  # opcode; body = <node> <virtual_obj> <state_variable> 0
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier

- id: di_menupresetcall
  label: Recall Menu Preset (DI_MENUPRESETCALL)
  kind: action
  command: "0x8B"  # opcode; body = <data>
  params:
    - name: data
      type: integer
      description: Menu preset identifier payload

- id: di_param_presetcall
  label: Recall Parameter Preset (DI_PARAM_PRESETCALL)
  kind: action
  command: "0x8C"  # opcode; body = <data>
  params:
    - name: data
      type: integer
      description: Parameter preset identifier payload

- id: di_setvpercent
  label: Set State Variable as Percentage (DI_SETVPERCENT)
  kind: action
  command: "0x8D"  # opcode; body = <node> <virtual_obj> <state_variable> <percentage>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier
    - name: percentage
      type: integer
      description: 32-bit percentage value; encoded as (percentage/100)*(65535/100)

- id: di_subscribepercent
  label: Subscribe to State Variable as Percentage (DI_SUBSCRIBEPERCENT)
  kind: action
  command: "0x8E"  # opcode; body = <node> <virtual_obj> <state_variable>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier
    - name: period_250ms
      type: integer
      description: Notification period in units of 250ms (minimum 4 = 1s)

- id: di_unsubscribepercent
  label: Unsubscribe from State Variable as Percentage (DI_UNSUBSCRIBEPERCENT)
  kind: action
  command: "0x8F"  # opcode; body = <node> <virtual_obj> <state_variable> 0
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier

- id: di_bumpsvpercent
  label: Bump State Variable Percentage (DI_BUMPSVPERCENT)
  kind: action
  command: "0x90"  # opcode; body = <node> <virtual_obj> <state_variable> <+/-> <percentage>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier
    - name: direction
      type: string
      description: "+ or - (encoded as + for up, - for down)"
    - name: percentage
      type: integer
      description: 32-bit bump magnitude; encoded as (percentage/100)*(65535/100)

- id: di_setstringv
  label: Set String Variable (DI_SETSTRINGV)
  kind: action
  command: "0x91"  # opcode; body = <node> <virtual_obj> <state_variable> <string_length> <bytes> <null_terminator>
  params:
    - name: node
      type: integer
      description: 16-bit Soundweb London node address
    - name: virtual_obj
      type: integer
      description: 8-bit virtual processing-object ID
    - name: state_variable
      type: integer
      description: 16-bit SV identifier
    - name: string
      type: string
      description: ASCII string payload (max 32 characters); framed as <length:16> <bytes> <0x00>
```

## Feedbacks
```yaml
# UNRESOLVED: protocol returns unsolicited SET messages after SUBSCRIBE,
# but exact per-SV response payload shapes (raw value vs percentage-encoded)
# depend on the data type in Appendix A and the specific SV subscribed.
# The source documents the framing behaviour but not a closed response schema.
```

## Variables
```yaml
# UNRESOLVED: settable SV IDs depend on the BLU-GPX device configuration
# exported from London Architect. Appendix G enumerates SV IDs for BLU
# processing cards (Analogue I/O, Digital I/O, AEC, BLU Link, Compressor,
# Gate, Graphic EQ, Crossover, etc.) but the BLU-GPX GPIO-specific SV
# table is not in the source. Common SV names from source that may apply:
#
#   - Display Page (ID 53/52)
#   - Display Page Enable
#   - Delay Page Enable (ID 56)
#   - LED Max Brightness (ID 3 / 50)
#   - Slot Enabled (ID 1 / 51)
#   - Lockout Slot (ID 6 / 53)
#   - BLU-Device Active Lock (ID 7 / 54)
```

## Events
```yaml
# UNRESOLVED: source describes unsolicited SET messages following a
# SUBSCRIBE / SUBSCRIBEPERCENT request, but no formal event schema is
# enumerated. Notification period must be >= 250ms (period value >= 4).
```

## Macros
```yaml
# UNRESOLVED: source describes a "query" pattern to discover a unit's
# preset list (send a query, receive ID + data, then DI_PRESETCALL),
# but the exact query payload is not specified in the refined excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on
# sequencing requirements are stated in the source. Do not infer.
```

## Notes
- Wire framing: STX (0x02) | body | XOR checksum byte | ETX (0x03). Checksum is XOR of all body bytes. If the checksum byte itself collides with a reserved byte, it must be escaped the same way.
- Reserved bytes and their escape pairs: 0x02 -> 0x1B 0x82; 0x03 -> 0x1B 0x83; 0x06 (ACK) -> 0x1B 0x86; 0x15 (NAK) -> 0x1B 0x95; 0x1B (ESC) -> 0x1B followed by at least one other byte (then strip 128).
- ACK/NAK are sent only on the serial transport; TCP relies on its own acknowledgement. On serial, ACK indicates valid byte, NAK indicates invalid (checksum fail or incomplete frame); device resends if no ACK/NAK within 1s.
- The ACK/NAK handshake is for Soundweb London devices only — when communicating via a proxy device, the controller must not send ACKs/NAKs.
- Percentage encoding: 32-bit raw = (percentage / 100) * 65535 / 100. For DI_SETVPERCENT the value is accurate to 3 decimal places; for DI_BUMPSVPERCENT it is accurate to whole-percent steps.
- Data-type conversions (Appendix A): Discrete (raw integer); Scalar (value * 2 / R); Gain dB (rawValue/10*2 + 1 with linear/logarithmic mode per dial position); Delay ms (rawValue / 3); Frequency Hz (rawValue / 2); Tempo clock/speed (rawValue * 1); Percentage via DI_SETV (rawValue * R).
- Source is the Soundweb London Direct Inject Message protocol document — family-level reference covering all BLU processors. BLU-GPX-specific GPIO SV table is not included; consumers must export the device's processing-object and SV map from HiQnet London Architect.
- Appendix D fixed object IDs apply to BLU-800/806/320/326/160/80/100/102 — they do NOT apply to BLU-GPX (which is not listed). Do not reuse those IDs.
- Appendix F string-variable framing: <message> = STX <body> <checksum> ETX; <body> = 0x91 <node> <virtual_obj> <state_variable> <string_length:16> <string_bytes> <0x00>. Max 32 characters in the protocol.
- Telephony-hybrid string variables (Appendix E) require four 8-digit segments (Number Part 1-4) sent as SVs; missing parts default to 0xF.

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - github.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://github.com/dudest/HiQnet
  - https://bssaudio.com/en/support
retrieved_at: 2026-06-30T19:13:07.282Z
last_checked_at: 2026-08-05T08:13:47.348Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:13:47.348Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec opcodes (0x80–0x91, skipping 0x83–0x87 and 0x92–0x94) match the source Message Opcodes table verbatim; transport values also match. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BLU-GPX-specific GPIO/state-variable table is not present in the source. Fixed-object IDs in Appendix D reference BLU-800/806/320/326/160/80/100/102 families, not BLU-GPX. Specific BLU-GPX virtual_obj IDs and SV IDs must be sourced from London Architect for the configured device."
- "no explicit power on/off commands in source)"
- "no input/output routing commands in source for BLU-GPX)"
- "protocol returns unsolicited SET messages after SUBSCRIBE,"
- "settable SV IDs depend on the BLU-GPX device configuration"
- "source describes unsolicited SET messages following a"
- "source describes a \"query\" pattern to discover a unit's"
- "no explicit safety warnings, interlocks, or power-on"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
