---
spec_id: admin/bss-audio-blu-8v2wht
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-8V2Wht Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-8V2Wht
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-8V2Wht
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - adn.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://adn.harmanpro.com/site_elements/resources/515_1414083576/HiQnet_Third_Party_Programmers_Guide_v2_original.pdf
  - https://bssaudio.com/en/site_elements/hiqnet-communication-on-a-routed-network
  - https://bssaudio.com/en
retrieved_at: 2026-06-30T04:06:47.176Z
last_checked_at: 2026-06-30T06:58:25.644Z
generated_at: 2026-06-30T06:58:25.644Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "per-device object/parameter IDs are configured in Audio Architect and not enumerated in this protocol source. Exact byte-layout diagrams (message structure pictures) were omitted from the refined source; structure below reconstructed from the textual field descriptions."
  - "\"baud rate ... found in Audio Architect Properties window\" - value not stated in source"
  - "not stated in source"
  - "per-device parameter enumeration not documented in source."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlock procedures, or power-on"
  - "baud rate / data bits / parity / stop bits not stated (set in Audio Architect Properties)."
  - "exact BUMP PERCENT direction/amount bit encoding within the 4-byte value not detailed."
  - "message-structure byte-layout diagrams omitted from refined source; templates reconstructed from textual field-width descriptions."
  - "per-device Node/Virtual Device/Object/Parameter IDs are project-specific, not enumerated in protocol doc."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:58:25.644Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literally to source Message Types; transport parameters (TCP 1023, D-type pins 2/3/5) verified; coverage is complete. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-8V2Wht Control Spec

## Summary
The BLU-8V2Wht is a Soundweb London device controllable via the London Direct Inject protocol, a two-way binary protocol allowing a third-party controller to set, request (subscribe), bump, and recall parameters/presets on any Soundweb London processing object. The device exposes a 100 Mb/s RJ-45 Ethernet port (TCP) and a 9-pin D-type RS-232 serial port. This spec covers the generic Soundweb London DI command set documented for the product family.

<!-- UNRESOLVED: per-device object/parameter IDs are configured in Audio Architect and not enumerated in this protocol source. Exact byte-layout diagrams (message structure pictures) were omitted from the refined source; structure below reconstructed from the textual field descriptions. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # Soundweb London devices listen on TCP port 1023, accept multiple connections
serial:
  baud_rate: null  # UNRESOLVED: "baud rate ... found in Audio Architect Properties window" - value not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "9-pin D-type, pins 2,3,5 used"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET / SET PERCENT / BUMP PERCENT drive gain and percentage parameters
```

## Actions
```yaml
# London Direct Inject protocol. All messages framed 0x02 ... 0x03, with
# single-byte XOR checksum over body bytes BEFORE byte substitution.
# Byte substitution (applied after checksum): 0x02->1B 82, 0x03->1B 83,
# 0x06->1B 86, 0x15->1B 95, 0x1B->1B 9B.
#
# Addressing (SET/SUBSCRIBE/BUMP families):
#   node_address : 2 bytes  (0x0001 - 0xFFFE)
#   virtual_device : 1 byte (Audio 0x03, Logic 0x02)
#   object_id : 3 bytes
#   parameter_id : 2 bytes
# Value (raw/percent/bump): 4 bytes (32-bit signed).
# checksum = XOR of all body bytes (opcode..value) before substitution.
# Message structure pictures were OMITTED from refined source; templates
# below assembled from the textual field-width descriptions.

- id: set_raw
  label: Set Parameter (Raw)
  kind: action
  command: "02 88 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID (Mixer, EQ, Source Selector...), 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object (Gain, Mute, Source...), 2 bytes"
    - name: value
      type: integer
      description: "Raw 32-bit signed value. Gain params -280617 (-80dB) to 100000 (+10dB), unity 0. Two-state use 0/1. Multi-state use 0,1,2,3..."

- id: set_percent
  label: Set Parameter (Percent)
  kind: action
  command: "02 8D {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
    - name: value
      type: integer
      description: "Percentage as raw: percent x 65536 (0%-100%)"

- id: set_string
  label: Set Parameter (String)
  kind: action
  command: "02 91 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {len} {string_bytes} 00 {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
    - name: string
      type: string
      description: "Up to 32 ASCII bytes; value carries length prefix and 0x00 termination suffix"

- id: bump_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "02 90 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
    - name: value
      type: integer
      description: "4-byte signed value encoding bump direction and percentage amount"
  notes: "If a subscribed parameter is changed via BUMP PERCENT the device does NOT return SET/SET PERCENT after every bump; a new subscribe must be sent to read the value."

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "02 8C {preset_b1} {preset_b2} {preset_b3} {preset_b4} {checksum} 03"
  params:
    - name: preset_id
      type: integer
      description: "Preset ID (4-byte value) as shown in the Parameter Preset window. No addressing used."
  notes: "Cannot subscribe to a Parameter Preset."

- id: subscribe
  label: Subscribe to Parameter (Raw)
  kind: query
  command: "02 89 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
  notes: "Immediately returns current value as a SET (or SET STRING) message, then a SET message on every subsequent value change until UNSUBSCRIBE or reboot."

- id: subscribe_percent
  label: Subscribe to Parameter (Percent)
  kind: query
  command: "02 8E {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
  notes: "Immediately returns current value as a SET PERCENT message, then SET PERCENT on subsequent changes until UNSUBSCRIBE PERCENT or reboot."

- id: unsubscribe
  label: Unsubscribe from Parameter (Raw)
  kind: action
  command: "02 8A {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percent)
  kind: action
  command: "02 8F {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device Node Address (0x0001-0xFFFE), 2 bytes"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02), 1 byte"
    - name: object_id
      type: integer
      description: "Processing Object ID, 3 bytes"
    - name: parameter_id
      type: integer
      description: "Parameter within object, 2 bytes"
```

## Feedbacks
```yaml
- id: serial_ack
  type: enum
  values: ["0x06"]
  description: "RS-232 only: 0x06 confirms receipt and valid checksum."

- id: serial_nak
  type: enum
  values: ["0x15"]
  description: "RS-232 only: 0x15 returned when checksum is invalid."

# Ethernet/TCP does not use 0x06/0x15 - TCP provides reliable delivery.
```

## Variables
```yaml
# Parameter addressing is fully dynamic (configured per-project in Audio
# Architect). No fixed variable table exists in the protocol source.
# UNRESOLVED: per-device parameter enumeration not documented in source.
```

## Events
```yaml
# Subscription-driven: a SUBSCRIBE causes the device to emit unsolicited
# SET / SET PERCENT messages on every subsequent value change until
# UNSUBSCRIBE or reboot. Treat these as push notifications.
- id: parameter_update
  type: message
  description: "Unsolicited SET / SET PERCENT / SET STRING message pushed on subscribed parameter value change."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on
# sequencing requirements stated in source.
```

## Notes
- Protocol applies to all Soundweb London devices; Crown, JBL, AKG devices do NOT respond to this protocol.
- Devices are always listening — no enable step required for third-party control.
- BLU-Link, Dante, CobraNet, AVB carry no control traffic.
- Control messages may be unicast to one device or multicast to many; messages for other devices are auto-forwarded over the network.
- Serial retransmit: if 0x06/0x15 not received within 1 second, Soundweb re-transmits (when acknowledgement mode is enabled in Audio Architect Properties).
- Checksum = single-byte XOR of all body bytes (opcode through value), computed BEFORE byte substitution.
- Gain scaling: logarithmic from -inf to -10dB, linear above -10dB; unity gain = raw 0 (73.73%).
- Meter scaling: linear, Raw/10000 = dB; 0dB = raw 0 (66.66%).

<!-- UNRESOLVED: baud rate / data bits / parity / stop bits not stated (set in Audio Architect Properties). -->
<!-- UNRESOLVED: exact BUMP PERCENT direction/amount bit encoding within the 4-byte value not detailed. -->
<!-- UNRESOLVED: message-structure byte-layout diagrams omitted from refined source; templates reconstructed from textual field-width descriptions. -->
<!-- UNRESOLVED: per-device Node/Virtual Device/Object/Parameter IDs are project-specific, not enumerated in protocol doc. -->
````

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - adn.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://adn.harmanpro.com/site_elements/resources/515_1414083576/HiQnet_Third_Party_Programmers_Guide_v2_original.pdf
  - https://bssaudio.com/en/site_elements/hiqnet-communication-on-a-routed-network
  - https://bssaudio.com/en
retrieved_at: 2026-06-30T04:06:47.176Z
last_checked_at: 2026-06-30T06:58:25.644Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:58:25.644Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literally to source Message Types; transport parameters (TCP 1023, D-type pins 2/3/5) verified; coverage is complete. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "per-device object/parameter IDs are configured in Audio Architect and not enumerated in this protocol source. Exact byte-layout diagrams (message structure pictures) were omitted from the refined source; structure below reconstructed from the textual field descriptions."
- "\"baud rate ... found in Audio Architect Properties window\" - value not stated in source"
- "not stated in source"
- "per-device parameter enumeration not documented in source."
- "no multi-step sequences described in source."
- "no safety warnings, interlock procedures, or power-on"
- "baud rate / data bits / parity / stop bits not stated (set in Audio Architect Properties)."
- "exact BUMP PERCENT direction/amount bit encoding within the 4-byte value not detailed."
- "message-structure byte-layout diagrams omitted from refined source; templates reconstructed from textual field-width descriptions."
- "per-device Node/Virtual Device/Object/Parameter IDs are project-specific, not enumerated in protocol doc."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
