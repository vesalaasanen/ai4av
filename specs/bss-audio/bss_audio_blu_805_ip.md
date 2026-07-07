---
spec_id: admin/bss-audio-blu-805
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU 805 Control Spec"
manufacturer: "BSS Audio"
model_family: "BLU 805"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "BLU 805"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://www.bssaudio.com/en/support
retrieved_at: 2026-07-01T14:02:25.790Z
last_checked_at: 2026-07-07T11:05:58.930Z
generated_at: 2026-07-07T11:05:58.930Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source omits model-specific behavior, fault recovery, and firmware version constraints."
  - "baud rate configurable in Audio Architect, not stated in source"
  - "not stated in source"
  - "traits not explicitly declared in source. Soundweb London is a DSP - gain/mute/routing/preset are all present, so:"
  - "full body template - checksum computed as XOR of all body bytes before substitution"
  - "parameter set is device-configuration-defined, not enumerated in source"
  - "source does not document multi-step sequences"
  - "no safety warnings, interlocks, or power-on sequencing in source"
  - "firmware compatibility range, fault/error recovery, voltage/current specs all absent from source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:05:58.930Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched distinct London Direct Inject opcodes in the protocol reference; transport declarations (TCP 1023, serial RS-232, no auth) all corroborated verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# BSS Audio BLU 805 Control Spec

## Summary
BSS Audio BLU 805 Soundweb London DSP. Third-party control via London Direct Inject protocol over RS-232 and TCP/IP (port 1023). Protocol is generic across Soundweb London family; addressing is per-parameter (Node/Virtual Device/Object/Parameter IDs).

<!-- UNRESOLVED: source omits model-specific behavior, fault recovery, and firmware version constraints. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable in Audio Architect, not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null     # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# UNRESOLVED: traits not explicitly declared in source. Soundweb London is a DSP - gain/mute/routing/preset are all present, so:
- levelable    # inferred: gain parameters present
- routable     # inferred: source selector parameters present
- queryable    # inferred: SUBSCRIBE message type present
```

## Actions
```yaml
# CRITICAL: source documents a generic protocol (London Direct Inject), not discrete
# product commands. Actions below mirror the protocol's message-type opcodes. Parameter
# payload (Node/VirtualDevice/ObjectID/ParameterID + Value) is variable per use.

- id: set_parameter_raw
  label: Set Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"  # UNRESOLVED: full body template - checksum computed as XOR of all body bytes before substitution
  params:
    - name: node_address
      type: integer
      description: Node Address (0x0001-0xFFFE)
    - name: virtual_device
      type: integer
      description: Virtual Device ID (Audio=0x03, Logic=0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: raw_value
      type: integer
      description: 32-bit signed raw value

- id: set_parameter_percent
  label: Set Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (0x0001-0xFFFE)
    - name: virtual_device
      type: integer
      description: Virtual Device ID
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: percent_value
      type: integer
      description: Percentage value (0-100)

- id: set_parameter_string
  label: Set Parameter (String, up to 32 ASCII)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {length} {ascii...} 0x00 {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: string_value
      type: string
      description: Up to 32 ASCII chars; null-terminated with length prefix

- id: subscribe_parameter_raw
  label: Subscribe Parameter (Raw)
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: subscribe_parameter_percent
  label: Subscribe Parameter (Percent)
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: unsubscribe_parameter_raw
  label: Unsubscribe Parameter (Raw)
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: unsubscribe_parameter_percent
  label: Unsubscribe Parameter (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: bump_parameter_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_hi} {param_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: percent_delta
      type: integer
      description: Percentage delta (positive or negative)

- id: recall_parameter_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_b0} {preset_b1} {preset_b2} {preset_b3} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: 4-byte preset ID
```

## Feedbacks
```yaml
# Response opcodes returned by device after SUBSCRIBE or as SET echo.
- id: set_raw_echo
  type: binary
  description: Unsolicited/raw SET (0x88) returned when subscribed parameter changes; 4-byte value
- id: set_percent_echo
  type: integer
  description: SET PERCENT (0x8D) echo on subscribed parameter percent change
- id: set_string_echo
  type: string
  description: SET STRING (0x91) echo for subscribed string parameter
- id: ack_ok
  type: enum
  values: [ack]
  description: 0x06 - RS-232 message received, checksum valid
- id: ack_nak
  type: enum
  values: [nak]
  description: 0x15 - RS-232 checksum invalid
```

## Variables
```yaml
# UNRESOLVED: parameter set is device-configuration-defined, not enumerated in source
```

## Events
```yaml
# SUBSCRIBE-triggered SET / SET PERCENT / SET STRING messages on parameter change.
# See Feedbacks section for opcodes.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing in source
```

## Notes
- London Direct Inject protocol is shared across Soundweb London family. BLU 805 uses generic parameter addressing; specific gain/mute/routing actions require the operator to query Node/VirtualDevice/Object/Parameter IDs from Audio Architect.
- TCP port 1023 confirmed. RS-232 baud rate/databits/parity/stopbits not specified in source — set via Audio Architect Properties window.
- Message framing: 0x02 start, 0x03 end, XOR checksum on body bytes (before byte-substitution expansion). Special bytes 0x02/0x03/0x06/0x15/0x1B must be byte-substituted after checksum compute.
- Ethernet: TCP reliable delivery = no ack needed. RS-232: device retransmits if 0x06/0x15 not received within 1 second.
- Crown, JBL, AKG devices do NOT respond to this protocol.
- BLU-Link, Dante, CobraNet, AVB are NOT control transports.

<!-- UNRESOLVED: firmware compatibility range, fault/error recovery, voltage/current specs all absent from source. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://www.bssaudio.com/en/support
retrieved_at: 2026-07-01T14:02:25.790Z
last_checked_at: 2026-07-07T11:05:58.930Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:05:58.930Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched distinct London Direct Inject opcodes in the protocol reference; transport declarations (TCP 1023, serial RS-232, no auth) all corroborated verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source omits model-specific behavior, fault recovery, and firmware version constraints."
- "baud rate configurable in Audio Architect, not stated in source"
- "not stated in source"
- "traits not explicitly declared in source. Soundweb London is a DSP - gain/mute/routing/preset are all present, so:"
- "full body template - checksum computed as XOR of all body bytes before substitution"
- "parameter set is device-configuration-defined, not enumerated in source"
- "source does not document multi-step sequences"
- "no safety warnings, interlocks, or power-on sequencing in source"
- "firmware compatibility range, fault/error recovery, voltage/current specs all absent from source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
