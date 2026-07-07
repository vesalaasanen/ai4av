---
spec_id: admin/bss-audio-blu-800
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU 800 Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-800
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-800
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
retrieved_at: 2026-06-30T07:22:14.547Z
last_checked_at: 2026-07-07T11:05:58.175Z
generated_at: 2026-07-07T11:05:58.175Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is protocol-level, not a per-parameter command catalogue. Concrete parameter addresses (Node/VirtualDevice/ObjectID/ParameterID) are discovered at runtime via Audio Architect, not enumerated in this document."
  - "source states baud rate is set in Audio Architect Properties window; value not stated"
  - "not stated in source"
  - "not stated in source; only pins 2,3,5 (TX/RX/GND) used implies no hardware flow control"
  - "exact response payloads for SET STRING subscriptions not enumerated in source."
  - "per-parameter enumeration not in this source; discovered via Audio Architect."
  - "no other unsolicited event types documented in source."
  - "populate if macro documentation found elsewhere."
  - "no safety warnings or interlock procedures stated in this source."
  - "serial baud/data/parity/stop bits not stated (set via Audio Architect)."
  - "exact message structure diagrams omitted from refined source (pictures intentionally removed); byte layouts above inferred from textual description of fields."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:05:58.175Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 London DI message types matched literal opcodes; transport port and serial pins verified; baud rate correctly marked UNRESOLVED per source. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU 800 Control Spec

## Summary
The BSS Audio BLU-800 is a Soundweb London digital signal processor controllable over Ethernet (TCP port 1023) or RS-232 serial via the London Direct Inject protocol. This protocol enables a third-party controller to SET, BUMP, GET (subscribe), and recall parameter presets on any processing object parameter. This spec covers the London DI message types as documented in the source.

<!-- UNRESOLVED: source is protocol-level, not a per-parameter command catalogue. Concrete parameter addresses (Node/VirtualDevice/ObjectID/ParameterID) are discovered at runtime via Audio Architect, not enumerated in this document. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: source states baud rate is set in Audio Architect Properties window; value not stated
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: none  # UNRESOLVED: not stated in source; only pins 2,3,5 (TX/RX/GND) used implies no hardware flow control
  connector: 9-pin D-type (pins 2, 3, 5 only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from SUBSCRIBE / SUBSCRIBE PERCENT message types
- levelable  # inferred from SET / SET PERCENT / BUMP PERCENT for gain and percentage values
```

## Actions
```yaml
# London DI message types. Each opcode is one action. Parameter addressing is
# hierarchical (NodeAddr / VirtualDevice / ObjectID / ParameterID) and resolved
# at runtime via Audio Architect; values shown as templated variables.
#
# Common framing: every message starts 0x02, ends 0x03, last body byte = XOR
# checksum of all pre-substitution body bytes. Byte substitution applied to body
# after checksum: 0x02->1B 82, 0x03->1B 83, 0x06->1B 86, 0x15->1B 95, 0x1B->1B 9B.

- id: set_raw
  label: Set Parameter (Raw Value)
  kind: action
  opcode: 0x88
  command: "02 88 {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {v0} {v1} {v2} {v3} {checksum} 03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE (1-65534)
    - name: virtual_device
      type: enum
      description: Audio=0x03, Logic=0x02
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: Raw 32-bit signed value
  notes: "Serial RS-232 acknowledged with 0x06 (OK) / 0x15 (bad checksum). No ACK over TCP."

- id: subscribe
  label: Subscribe to Parameter
  kind: query
  opcode: 0x89
  command: "02 89 {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: "Returns current value immediately as SET message, then SET on each change until UNSUBSCRIBE or reboot."

- id: unsubscribe
  label: Unsubscribe from Parameter
  kind: action
  opcode: 0x8A
  command: "02 8A {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: "Stops SET messages for the parameter."

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  opcode: 0x8C
  command: "02 8C {preset_id_0} {preset_id_1} {preset_id_2} {preset_id_3} {checksum} 03"
  params:
    - name: preset_id
      type: integer
      description: Preset ID number (4 bytes), shown in Parameter Preset window
  notes: "No addressing used. Cannot subscribe to a preset."

- id: set_percent
  label: Set Parameter (Percentage)
  kind: action
  opcode: 0x8D
  command: "02 8D {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {v0} {v1} {v2} {v3} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: integer
      description: Percentage 0-100 encoded as raw (raw = percent x 65536)
  notes: "Two-state params use 0/1 (0%/100%). Multi-state use 0,1,2,3,4... (0%-100%)."

- id: subscribe_percent
  label: Subscribe to Parameter (Percentage)
  kind: query
  opcode: 0x8E
  command: "02 8E {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: "Returns SET PERCENT messages on value changes."

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percentage)
  kind: action
  opcode: 0x8F
  command: "02 8F {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: bump_percent
  label: Bump Parameter (Percentage)
  kind: action
  opcode: 0x90
  command: "02 90 {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {v0} {v1} {v2} {v3} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: integer
      description: Signed bump delta (percentage encoded)
  notes: "Subscribed parameters do NOT auto-return SET messages after a bump; re-subscribe to read new value."

- id: set_string
  label: Set Parameter (String)
  kind: action
  opcode: 0x91
  command: "02 91 {node_hi} {node_lo} {vd} {obj0} {obj1} {obj2} {pid_hi} {pid_lo} {len} {ascii...} 00 {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: enum
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: string
      type: string
      description: Up to 32 ASCII chars; prefix with byte length, suffix 0x00
```

## Feedbacks
```yaml
- id: serial_ack
  type: enum
  values: ["0x06"]
  description: "Serial RS-232 ACK - confirms valid receipt and checksum."

- id: serial_nack
  type: enum
  values: ["0x15"]
  description: "Serial RS-232 NACK - invalid checksum."

- id: subscribed_set
  type: raw
  description: "SET message (0x88) returned for a SUBSCRIBE; sent on each value change. 4-byte 32-bit signed raw value."

- id: subscribed_set_percent
  type: raw
  description: "SET PERCENT message (0x8D) returned for a SUBSCRIBE PERCENT; sent on each value change."

# UNRESOLVED: exact response payloads for SET STRING subscriptions not enumerated in source.
```

## Variables
```yaml
# Parameter value scales documented in source (raw/percentage encodings):
- id: gain
  description: "Logarithmic -inf to -10dB, linear above. Raw -280617 (-80dB/0%) to 100000 (+10dB/100%). Unity=0 (73.73%)."
- id: meter
  description: "Linear scale. Raw -800000 (-80dB/0%) to 400000 (+40dB/100%). 0dB=0 (66.66%). dB = raw/10000."
- id: percentage
  description: "Raw = percentage x 65536. Range 0-100%."

# UNRESOLVED: per-parameter enumeration not in this source; discovered via Audio Architect.
```

## Events
```yaml
# Unsolicited SET / SET PERCENT messages pushed for active subscriptions count
# as events (device-initiated value-change notifications).
- id: subscription_update
  trigger: "Active subscription; parameter value changed by another controller or internal logic."
  payload: "SET (0x88) or SET PERCENT (0x8D) message for the subscribed parameter."

# UNRESOLVED: no other unsolicited event types documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
# UNRESOLVED: populate if macro documentation found elsewhere.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in this source.
```

## Notes
- Soundweb London devices are always listening; no enable step required for third-party control.
- Crown, JBL, AKG devices do NOT respond to the London DI protocol (Soundweb London only).
- BLU-Link, Dante, CobraNet, AVB connections are NOT used for control - control is Ethernet RJ-45 or RS-232 only.
- TCP: multiple concurrent connections accepted on port 1023; socket normally left open indefinitely. No ACK over TCP (TCP provides reliability).
- Serial: device can be configured (in Audio Architect Properties) to wait for ACK per transmitted message; re-transmits if 0x06/0x15 not received within 1 second.
- Byte substitution MUST be applied after checksum computation, before transmission - increases message length. Receiver reverses substitution.
- Parameter addressing is hierarchical and runtime-discovered; this protocol doc does not enumerate device parameters.

<!-- UNRESOLVED: serial baud/data/parity/stop bits not stated (set via Audio Architect). -->
<!-- UNRESOLVED: exact message structure diagrams omitted from refined source (pictures intentionally removed); byte layouts above inferred from textual description of fields. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
```

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
retrieved_at: 2026-06-30T07:22:14.547Z
last_checked_at: 2026-07-07T11:05:58.175Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:05:58.175Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 London DI message types matched literal opcodes; transport port and serial pins verified; baud rate correctly marked UNRESOLVED per source. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is protocol-level, not a per-parameter command catalogue. Concrete parameter addresses (Node/VirtualDevice/ObjectID/ParameterID) are discovered at runtime via Audio Architect, not enumerated in this document."
- "source states baud rate is set in Audio Architect Properties window; value not stated"
- "not stated in source"
- "not stated in source; only pins 2,3,5 (TX/RX/GND) used implies no hardware flow control"
- "exact response payloads for SET STRING subscriptions not enumerated in source."
- "per-parameter enumeration not in this source; discovered via Audio Architect."
- "no other unsolicited event types documented in source."
- "populate if macro documentation found elsewhere."
- "no safety warnings or interlock procedures stated in this source."
- "serial baud/data/parity/stop bits not stated (set via Audio Architect)."
- "exact message structure diagrams omitted from refined source (pictures intentionally removed); byte layouts above inferred from textual description of fields."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
