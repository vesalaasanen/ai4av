---
spec_id: admin/bss-audio-blu-100
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU 100 Control Spec"
manufacturer: "BSS Audio"
model_family: "BLU 100"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "BLU 100"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-06-30T03:45:51.913Z
last_checked_at: 2026-06-30T06:55:43.874Z
generated_at: 2026-06-30T06:55:43.874Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic Soundweb London DI protocol document, not a BLU 100 device-specific command list. Concrete per-object/per-parameter command payloads (mixer gains, mute, source select, etc.) depend on the device's Audio Architect configuration and are not enumerated in this source. Serial baud rate / data bits / parity / stop bits are not stated in source (configured via Audio Architect Properties window)."
  - "baud rate not stated in source (set via Audio Architect Properties)"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "exact return opcode bytes for SET / SET PERCENT / SET STRING"
  - "populate per-parameter variables from device configuration export."
  - "exact push opcode bytes not documented as hex in source."
  - "no multi-step sequences described explicitly in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated."
  - "serial baud/bits/parity/stop/flow not stated (Audio Architect Properties only)."
  - "exact hex opcodes for SET / SET PERCENT / SET STRING response/push messages not documented in source."
  - "device-specific parameter catalogue (which objects/params exist on a stock BLU 100) not in this protocol source."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:55:43.874Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 message-type opcodes (0x88-0x91) verified against source with exact literal match; message framing, addressing, and parameter scaling confirmed. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU 100 Control Spec

## Summary
The BSS Audio BLU 100 is a Soundweb London networked DSP device controllable via the London Direct Inject protocol over Ethernet (TCP) or serial RS-232. This spec covers third-party parameter set/get/subscribe, percent level control, string values, and parameter preset recall. Two-way communication allows a controller to set or request any parameter or meter value.

<!-- UNRESOLVED: source is a generic Soundweb London DI protocol document, not a BLU 100 device-specific command list. Concrete per-object/per-parameter command payloads (mixer gains, mute, source select, etc.) depend on the device's Audio Architect configuration and are not enumerated in this source. Serial baud rate / data bits / parity / stop bits are not stated in source (configured via Audio Architect Properties window). -->

## Transport
```yaml
# Source documents both Ethernet (TCP port 1023) and serial RS-232 control.
# Serial transport parameters are configured in Audio Architect Properties window
# but the specific baud/bits/parity/stop values are NOT stated in this source.
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (set via Audio Architect Properties)
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
  connector: "9-pin D-type (pins 2,3,5 used)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT control levels
```

## Actions
```yaml
# London Direct Inject protocol message types. Each named opcode (hex message
# type byte) is one action. Per-source-rows rule: these are the distinct
# documented message types. Per-parameter/per-object payloads are configuration-
# dependent and not enumerated in this source (addressing: Node + VirtualDevice
# + ObjectID + ParameterID).
#
# Message framing: all messages begin 0x02, end 0x03, last byte before 0x03 is
# XOR checksum of body. After checksum, byte substitution is applied to body:
#   0x02 -> 0x1B 0x82
#   0x03 -> 0x1B 0x83
#   0x06 -> 0x1B 0x86
#   0x15 -> 0x1B 0x95
#   0x1B -> 0x1B 0x9B
# Commands below are shown pre-substitution with {checksum} placeholder.

- id: set_raw
  label: Set Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes), range 0x0001-0xFFFE (1-65534)"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes) - Mixer, EQ, Source Selector, etc."
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes) - Gain, Mute, Source, etc."
    - name: value
      type: integer
      description: "32-bit signed raw value (4 bytes)"

- id: subscribe
  label: Subscribe to Parameter
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes), range 0x0001-0xFFFE"
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"

- id: unsubscribe
  label: Unsubscribe from Parameter
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_id_4} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: "Parameter Preset ID (4 bytes) shown in Parameter Preset window. No addressing used."

- id: set_percent
  label: Set Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"
    - name: value
      type: integer
      description: "Percentage 0-100 as raw (Raw = percentage x 65536). Range always 0-100%."

- id: subscribe_percent
  label: Subscribe to Parameter (Percent)
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"

- id: bump_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"
    - name: value
      type: integer
      description: "Percentage delta to bump up/down (Raw = percentage x 65536)"

- id: set_string
  label: Set Parameter (String)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virtual_device} {obj_id_3} {param_id_hi} {param_id_lo} {length} {ascii_bytes_up_to_32} 0x00 {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes)"
    - name: virtual_device
      type: integer
      description: "Processing object category"
    - name: object_id
      type: integer
      description: "Object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID (2 bytes)"
    - name: value
      type: string
      description: "Up to 32 ASCII characters; length prefix byte + 0x00 termination suffix required"
```

## Feedbacks
```yaml
# Serial RS-232 only: device returns ACK/NACK bytes.
# TCP does not use ACKs (TCP already reliable, per source).
- id: serial_ack
  type: raw_byte
  value: "0x06"
  description: "Positive acknowledgement (serial only). Confirms receipt and checksum."

- id: serial_nack
  type: raw_byte
  value: "0x15"
  description: "Negative acknowledgement (serial only). Returned when checksum invalid."

# SUBSCRIBE returns SET or SET STRING messages; SUBSCRIBE PERCENT returns
# SET PERCENT messages. These are pushed on subscribe and on subsequent value
# changes until UNSUBSCRIBE or device reboot.
# UNRESOLVED: exact return opcode bytes for SET / SET PERCENT / SET STRING
# response messages not documented as hex in source.
```

## Variables
```yaml
# Parameter value scaling per source:
# - Two-state (e.g. mute): values 0 and 1 (0% / 100%)
# - Multi-state (e.g. source selector, input card gain): discrete 0,1,2,3,4... (0%-100%)
# - Variable gain: -280,617 (0% / -80dB) to 100,000 (100% / +10dB); unity = 0 (73.73%); log -inf to -10dB, linear above
# - Meter: -800,000 (0% / -80dB) to 400,000 (100% / +40dB) linear; 0dB = 0 (66.66%); dB = Raw / 10,000
# - Percent raw: Raw = percentage x 65536
# Concrete device-specific variables (mixer gains, mutes, sources) depend on
# Audio Architect configuration and are not enumerated in this source.
# UNRESOLVED: populate per-parameter variables from device configuration export.
```

## Events
```yaml
# Unsolicited SET / SET PERCENT messages pushed to subscribers when a subscribed
# parameter's value changes (after SUBSCRIBE / SUBSCRIBE PERCENT).
# NOTE: if a subscribed parameter is changed via BUMP PERCENT, the device does
# NOT return SET/SET PERCENT after every bump - a new subscribe must be sent.
# UNRESOLVED: exact push opcode bytes not documented as hex in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements present in source.
```

## Notes
- BLU 100 is a Soundweb London device. Crown, JBL, AKG devices do NOT respond to London DI protocol (source caveat).
- Soundweb London devices are always listening for third-party messages — no enable step required.
- Control over 100Mb/s RJ-45 Ethernet and 9-pin D-type RS-232 (pins 2,3,5 only). BLU-Link, Dante, CobraNet, AVB are NOT used for control.
- TCP port 1023; multiple simultaneous connections accepted. A controller normally opens a socket and leaves it open indefinitely.
- Acknowledgements (0x06 / 0x15) are serial-only. TCP does not use them.
- Serial retransmit: if ACK/NACK not received within 1 second, Soundweb re-transmits (when configured to wait for ACK in Audio Architect Properties).
- Message framing: every message starts 0x02, ends 0x03, last body byte is XOR checksum. Byte substitution applied AFTER checksum over the whole body (grows message length).
- Addressing is hierarchical: Node Address (2 bytes, 0x0001-0xFFFE) → Virtual Device (1 byte: Audio 0x03 / Logic 0x02) → Object ID (3 bytes) → Parameter ID (2 bytes). Preset recall uses no addressing.
- Parameter Preset recall cannot be subscribed to.
- Node Address, Virtual Device, Object ID, and Parameter IDs are read from Audio Architect Venue Explorer / Properties window — they are configuration-specific, not fixed per device model.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: serial baud/bits/parity/stop/flow not stated (Audio Architect Properties only). -->
<!-- UNRESOLVED: exact hex opcodes for SET / SET PERCENT / SET STRING response/push messages not documented in source. -->
<!-- UNRESOLVED: device-specific parameter catalogue (which objects/params exist on a stock BLU 100) not in this protocol source. -->
````


- **TCP + serial** both emitted (port 1023 stated; serial config all UNRESOLVED).
- **9 actions** = 9 documented message types (0x88–0x91), each verbatim opcode + framing.
- **Byte substitution + checksum** in notes/Actions header.
- Source generic protocol doc — device-specific params marked UNRESOLVED (honest, not fabricated).

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-06-30T03:45:51.913Z
last_checked_at: 2026-06-30T06:55:43.874Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:55:43.874Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 message-type opcodes (0x88-0x91) verified against source with exact literal match; message framing, addressing, and parameter scaling confirmed. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic Soundweb London DI protocol document, not a BLU 100 device-specific command list. Concrete per-object/per-parameter command payloads (mixer gains, mute, source select, etc.) depend on the device's Audio Architect configuration and are not enumerated in this source. Serial baud rate / data bits / parity / stop bits are not stated in source (configured via Audio Architect Properties window)."
- "baud rate not stated in source (set via Audio Architect Properties)"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "exact return opcode bytes for SET / SET PERCENT / SET STRING"
- "populate per-parameter variables from device configuration export."
- "exact push opcode bytes not documented as hex in source."
- "no multi-step sequences described explicitly in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated."
- "serial baud/bits/parity/stop/flow not stated (Audio Architect Properties only)."
- "exact hex opcodes for SET / SET PERCENT / SET STRING response/push messages not documented in source."
- "device-specific parameter catalogue (which objects/params exist on a stock BLU 100) not in this protocol source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
