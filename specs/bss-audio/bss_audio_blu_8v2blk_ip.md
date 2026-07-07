---
spec_id: admin/bss-audio-blu-8v2blk
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio Blu 8V2Blk Control Spec"
manufacturer: "BSS Audio"
model_family: "Blu 8V2Blk"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "Blu 8V2Blk"
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
retrieved_at: 2026-07-01T14:00:12.400Z
last_checked_at: 2026-07-07T11:07:17.652Z
generated_at: 2026-07-07T11:07:17.652Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic London DI protocol document; device-specific command catalogue (per-parameter addresses) not enumerated. Crown, JBL, AKG devices do not respond to this protocol."
  - "baud rate not stated in source (configured via Audio Architect Properties window)"
  - "not stated in source"
  - "no per-device parameter address table in source (addresses are assigned per Audio Architect configuration)."
  - "no multi-step sequences documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "baud rate, data bits, parity, stop bits, flow control for RS-232 not stated in source."
  - "no device-specific parameter address catalogue — addresses must be read from Audio Architect per configuration."
  - "firmware version compatibility not stated in source."
  - "precise byte layout of each message type (header/footer beyond 0x02/0x03 framing) depicted only in omitted figures — field ordering assumed from opcode + addressing + value description."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:07:17.652Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched exactly with source opcodes (0x88-0x91); complete coverage of London DI protocol message types; port 1023 and serial connector verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# BSS Audio Blu 8V2Blk Control Spec

## Summary
The BSS Audio Blu 8V2Blk is a Soundweb London device controlled via the London Direct Inject (DI) protocol over Ethernet (TCP) or serial RS-232. The DI protocol supports two-way communication: a third party controller can set, bump, subscribe to, or recall presets for any parameter or meter on the device. This spec covers the DI message structure, message types, addressing scheme, and parameter value encoding documented for Soundweb London devices.

<!-- UNRESOLVED: source is the generic London DI protocol document; device-specific command catalogue (per-parameter addresses) not enumerated. Crown, JBL, AKG devices do not respond to this protocol. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (configured via Audio Architect Properties window)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "9-pin D-type (pins 2, 3, 5 used)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT control percentage values
```

## Actions
```yaml
# Protocol-level message types. Each opcode is one action. Parameter addressing
# (Node/VirtualDevice/ObjectID/ParameterID) is a parameter set, not separate rows.
# All commands share framing: start 0x02, body, checksum (XOR of body), end 0x03.
# Body undergoes byte substitution (0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86,
# 0x15→0x1B 0x95, 0x1B→0x1B 0x9B) AFTER checksum computed.

- id: set_raw
  label: Set Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (0x0001 - 0xFFFE, i.e. 1-65534), two bytes
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02), one byte
    - name: object_id
      type: integer
      description: Processing Object ID (e.g. Mixer, EQ, Source Selector), three bytes
    - name: parameter_id
      type: integer
      description: Parameter within object (e.g. Gain, Mute, Source), two bytes
    - name: value
      type: integer
      description: 32-bit signed raw value (4 bytes); range/scale depends on parameter type

- id: subscribe
  label: Subscribe to Parameter
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
  notes: Returns SET or SET STRING immediately and on subsequent value changes until UNSUBSCRIBE or reboot.

- id: unsubscribe
  label: Unsubscribe from Parameter
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
  notes: Stops the device returning SET messages for the parameter.

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_id_b0} {preset_id_b1} {preset_id_b2} {preset_id_b3} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: Preset ID (4 bytes), as displayed in Parameter Preset window
  notes: No addressing used. Cannot subscribe to a Parameter Preset.

- id: set_percent
  label: Set Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
    - name: value
      type: integer
      description: 32-bit signed percentage raw value (Raw = percentage × 65536; 0%-100%)

- id: subscribe_percent
  label: Subscribe to Parameter (Percent)
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
  notes: Returns SET PERCENT messages. If parameter changed via BUMP PERCENT, no message returned per bump - must re-subscribe.

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID

- id: bump_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {val_b0} {val_b1} {val_b2} {val_b3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
    - name: value
      type: integer
      description: 32-bit signed bump amount in percentage raw units
  notes: Bumped subscribed parameters do not return SET messages automatically.

- id: set_string
  label: Set Parameter (String)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virtual_device} {obj_id_1} {obj_id_2} {obj_id_3} {param_id_hi} {param_id_lo} {length_byte} {ascii_bytes_up_to_32} 0x00 {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device address (1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category
    - name: object_id
      type: integer
      description: Processing Object ID
    - name: parameter_id
      type: integer
      description: Parameter ID
    - name: value
      type: string
      description: ASCII string up to 32 bytes, prefixed by length byte, suffixed with 0x00
```

## Feedbacks
```yaml
- id: ack_positive
  type: enum
  values: ["0x06"]
  notes: Serial only. Returned when RS-232 message received with valid checksum. Not used on Ethernet (TCP is reliable).

- id: ack_negative
  type: enum
  values: ["0x15"]
  notes: Serial only. Returned when checksum invalid. Soundweb retransmits if 0x06/0x15 not received within 1 second.

- id: subscribed_set
  type: message
  notes: SET message returned on subscribe or on parameter value change. Carries 4-byte 32-bit signed raw value.

- id: subscribed_set_percent
  type: message
  notes: SET PERCENT message returned on subscribe percent or on value change.

- id: subscribed_set_string
  type: message
  notes: SET STRING message returned on subscribe for string parameters.
```

## Variables
```yaml
# Parameter value encoding (applies to SET / SET PERCENT / BUMP PERCENT values):
# - Two-state (e.g. mute): 0 and 1 (0% and 100%)
# - Multi-state (e.g. source selector, input card gain): 0,1,2,3,4... per enumeration count
# - Variable gain params: -280617 (-80dB) to 100000 (+10dB); unity gain = 0 (73.73%); log scale -inf to -10dB, linear above -10dB
# - Variable meter params: -800000 (-80dB) to 400000 (+40dB); 0dB = 0 (66.66%); dB = Raw / 10000 (linear)
# - Percent raw = percentage value × 65536
# UNRESOLVED: no per-device parameter address table in source (addresses are assigned per Audio Architect configuration).
```

## Events
```yaml
# Unsolicited SET / SET PERCENT / SET STRING messages pushed for subscribed parameters when their values change.
# No event catalogue beyond subscribe-driven push messages documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
- Source document is the generic Soundweb London "London Direct Inject protocol" reference. It applies to all Soundweb London devices; the Blu 8V2Blk is one such device. Per-device parameter addresses are not fixed — they are assigned within Audio Architect and displayed in Venue Explorer / Properties / Parameter Preset windows.
- BLU-Link, Dante, CobraNet, and AVB network connections are explicitly NOT used for any form of control.
- Soundweb devices are always listening; no enable step required for third-party control.
- TCP control: port 1023, multiple connections accepted. A controller normally opens a socket and leaves it open indefinitely.
- Serial RS-232: 9-pin D-type connector, only pins 2, 3, 5 used. Acknowledgement (0x06/0x15) and baud rate are configured in Audio Architect Properties window.
- Byte substitution is applied to the message body AFTER the checksum is computed and WILL increase message length. Special bytes 0x02, 0x03, 0x06, 0x15, 0x1B must each be escaped (see Actions comment).
- Checksum = single-byte XOR of all body bytes BEFORE substitution.
- Crown, JBL, AKG devices do not respond to this protocol.

<!-- UNRESOLVED: baud rate, data bits, parity, stop bits, flow control for RS-232 not stated in source. -->
<!-- UNRESOLVED: no device-specific parameter address catalogue — addresses must be read from Audio Architect per configuration. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: precise byte layout of each message type (header/footer beyond 0x02/0x03 framing) depicted only in omitted figures — field ordering assumed from opcode + addressing + value description. -->

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
retrieved_at: 2026-07-01T14:00:12.400Z
last_checked_at: 2026-07-07T11:07:17.652Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:07:17.652Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched exactly with source opcodes (0x88-0x91); complete coverage of London DI protocol message types; port 1023 and serial connector verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic London DI protocol document; device-specific command catalogue (per-parameter addresses) not enumerated. Crown, JBL, AKG devices do not respond to this protocol."
- "baud rate not stated in source (configured via Audio Architect Properties window)"
- "not stated in source"
- "no per-device parameter address table in source (addresses are assigned per Audio Architect configuration)."
- "no multi-step sequences documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "baud rate, data bits, parity, stop bits, flow control for RS-232 not stated in source."
- "no device-specific parameter address catalogue — addresses must be read from Audio Architect per configuration."
- "firmware version compatibility not stated in source."
- "precise byte layout of each message type (header/footer beyond 0x02/0x03 framing) depicted only in omitted figures — field ordering assumed from opcode + addressing + value description."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
