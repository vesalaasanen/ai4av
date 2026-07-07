---
spec_id: admin/bss-audio-tr1616
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio Tr1616 Control Spec"
manufacturer: "BSS Audio"
model_family: Tr1616
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - Tr1616
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/el/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://bssaudio.com/hi/site_elements/soundweb-london-di-kit
  - https://help.harmanpro.com/bss
retrieved_at: 2026-07-06T18:48:14.145Z
last_checked_at: 2026-07-07T11:07:20.415Z
generated_at: 2026-07-07T11:07:20.415Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Device-specific parameter addresses (Node/Virtual Device/Object/Parameter IDs) are not enumerated in this source — they are discovered at runtime via the Audio Architect Venue Explorer / Properties window. Model \"Tr1616\" itself is not named in the source text; this source documents the Soundweb London family protocol generically."
  - "baud rate not stated in source (\"found in Audio Architect Properties window\" - value not given)"
  - "not stated in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "exact baud/data/parity/stop bits for RS-232 — source says they live in Audio Architect Properties window but does not state values."
  - "device-specific Node/VirtualDevice/ObjectID/ParameterID table for the Tr1616 — must be enumerated at runtime via Audio Architect; not in this source."
  - "firmware version compatibility range not stated."
  - "protocol version number not stated."
  - "the literal model string \"Tr1616\" does not appear in this source text — it documents the Soundweb London DI family generically. Confirm the Tr1616 is a Soundweb London member before publishing."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:07:20.415Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 message-type opcodes matched literally; framing, addressing, value scaling, and transport parameters verified against source text. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-06
---

# BSS Audio Tr1616 Control Spec

## Summary
The BSS Audio Tr1616 is a Soundweb London DSP device controllable via the London Direct Inject (DI) protocol over Ethernet (TCP port 1023) or serial RS-232. The protocol allows a third-party controller to SET, BUMP, SUBSCRIBE to, and recall Presets for any parameter or meter on the device using binary messages framed with 0x02/0x03 and XOR checksummed.

<!-- UNRESOLVED: Device-specific parameter addresses (Node/Virtual Device/Object/Parameter IDs) are not enumerated in this source — they are discovered at runtime via the Audio Architect Venue Explorer / Properties window. Model "Tr1616" itself is not named in the source text; this source documents the Soundweb London family protocol generically. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source ("found in Audio Architect Properties window" - value not given)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: none  # inferred: only pins 2,3,5 (TX/RX/GND) used on D-Type - no hardware flow control lines
  connector: 9-pin D-type (pins 2, 3, 5 only)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT / gain parameter scaling documented
```

## Actions
```yaml
# All 9 documented London DI message types are enumerated below, one action per
# opcode row in the source. Command templates show the binary message structure
# with parameterized address/value fields; the leading 0x02 frame byte, trailing
# 0x03 frame byte, and final XOR-checksum byte are documented in Notes.
#
# Addressing layout (8 bytes after opcode, before value):
#   Node Address (2 bytes, 0x0001-0xFFFE)
#   Virtual Device (1 byte: Audio=0x03, Logic=0x02)
#   Object ID (3 bytes)
#   Parameter ID (2 bytes)
# Value (4 bytes, 32-bit signed) for SET / SET PERCENT / BUMP PERCENT.
# RECALL PRESET uses no addressing - Value bytes carry the Preset ID.

- id: set_raw
  label: SET (Raw Value)
  kind: action
  command: "02 88 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node
      type: integer
      description: Node Address (1-65534)
    - name: virtual_device
      type: integer
      description: Virtual Device byte (Audio=0x03, Logic=0x02)
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: 32-bit signed raw value

- id: subscribe
  label: SUBSCRIBE
  kind: query
  command: "02 89 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "02 8A {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "02 8C {preset_b1} {preset_b2} {preset_b3} {preset_b4} {checksum} 03"
  params:
    - name: preset_id
      type: integer
      description: Preset ID (4 bytes) shown in the Parameter Preset window

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "02 8D {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: integer
      description: 32-bit signed value; raw = percentage × 65536

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "02 8E {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "02 8F {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "02 90 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: delta
      type: integer
      description: 32-bit signed percentage delta (positive = up, negative = down)

- id: set_string
  label: SET STRING
  kind: action
  command: "02 91 {node_hi} {node_lo} {vd} {obj_b1} {obj_b2} {obj_b3} {pid_hi} {pid_lo} {len} {ascii_bytes..32} 00 {checksum} 03"
  params:
    - name: node
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: string
      description: Up to 32 ASCII characters; length-prefixed, 0x00-terminated
```

## Feedbacks
```yaml
# Serial-line acknowledgements (RS-232 only; TCP uses TCP reliability)
- id: ack_positive
  type: enum
  values: [0x06]
  description: Positive acknowledgement - message received and checksum valid (serial only)

- id: ack_negative
  type: enum
  values: [0x15]
  description: Negative acknowledgement - checksum invalid (serial only)

# SUBSCRIBE / SUBSCRIBE PERCENT return unsolicited SET / SET PERCENT messages
# on every subsequent value change until UNSUBSCRIBE or device reboot.
- id: subscribed_value_update
  type: object
  description: SET (0x88) or SET PERCENT (0x8D) message returned by device on parameter change for an active subscription
```

## Variables
```yaml
# Parameter values are addressed hierarchically (Node/VirtualDevice/Object/Parameter)
# and discovered at runtime via Audio Architect - not enumerated as named variables here.
# Raw value scaling laws documented in Notes for reference.
```

## Events
```yaml
# Unsolicited SET / SET PERCENT messages generated by active subscriptions are
# the only events. See Feedbacks.subscribed_value_update.
```

## Macros
```yaml
# None documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- **Protocol name:** London Direct Inject (DI) protocol. Crown, JBL, AKG devices do not respond to it; Soundweb London devices only.
- **Devices always listening** — no enable/disable step for third-party control.
- **TCP:** listens on port 1023, accepts multiple simultaneous connections. No application-level acknowledgement on TCP (TCP provides reliability). Client normally holds socket open indefinitely.
- **RS-232:** 9-pin D-type, pins 2/3/5 only. Positive ack 0x06 / negative ack 0x15 per message. Device re-transmits if no ack within 1 second (when ack-wait enabled). Baud + ack settings live in Audio Architect Properties window — values NOT stated in source.
- **Framing:** every message begins 0x02, ends 0x03. Final body byte is single-byte XOR checksum of all body bytes (computed *before* byte substitution).
- **Byte substitution** (applied after checksum, increases message length):
  - `0x02` → `0x1B 0x82`
  - `0x03` → `0x1B 0x83`
  - `0x06` → `0x1B 0x86`
  - `0x15` → `0x1B 0x95`
  - `0x1B` → `0x1B 0x9B`
- **Addressing hierarchy (8 bytes):** Node Address (2B, 0x0001–0xFFFE) · Virtual Device (1B: Audio=0x03, Logic=0x02) · Object ID (3B) · Parameter ID (2B). All discovered at runtime in Venue Explorer / Properties window — no static table in source.
- **Value scaling (4-byte signed):**
  - Percentage: raw = percentage × 65536; range 0–100%.
  - Two-state (mute): 0 / 1 (0% / 100%).
  - Multi-state (source selector, card gain): discrete 0,1,2,3…
  - Gain: −280,617 (0%, −80 dB) to 100,000 (100%, +10 dB); unity = 0 (73.73%); log scale −∞→−10 dB, linear above −10 dB.
  - Meter: −800,000 (0%, −80 dB) to 400,000 (100%, +40 dB); 0 dB = 0 (66.66%); dB = raw / 10,000.
- **String values:** up to 32 ASCII bytes, length-prefixed, 0x00-terminated.
- **SUBSCRIBE quirk:** if a subscribed parameter is bumped via BUMP PERCENT, the device does *not* return SET/SET PERCENT after every bump — a fresh SUBSCRIBE must be issued to read the new value.
- **RECALL PRESET** carries no addressing; the 4-byte Value is the Preset ID. Parameter Presets cannot be subscribed to.
- **Message-structure diagrams** in the source PDF are raster images (omitted here) — the byte layouts above are reconstructed from the textual descriptions of message types, addressing, and values.

<!-- UNRESOLVED: exact baud/data/parity/stop bits for RS-232 — source says they live in Audio Architect Properties window but does not state values. -->
<!-- UNRESOLVED: device-specific Node/VirtualDevice/ObjectID/ParameterID table for the Tr1616 — must be enumerated at runtime via Audio Architect; not in this source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: protocol version number not stated. -->
<!-- UNRESOLVED: the literal model string "Tr1616" does not appear in this source text — it documents the Soundweb London DI family generically. Confirm the Tr1616 is a Soundweb London member before publishing. -->
```

Spec built. 9 message-type actions enumerated (one per source opcode row). Framing/checksum/byte-substitution in Notes. Baud + serial config marked UNRESOLVED (source says "Audio Architect Properties window" — no value given). No port assumed beyond stated 1023. Tr1616 model string absent from source text → flagged in unresolved markers.

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/el/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://bssaudio.com/hi/site_elements/soundweb-london-di-kit
  - https://help.harmanpro.com/bss
retrieved_at: 2026-07-06T18:48:14.145Z
last_checked_at: 2026-07-07T11:07:20.415Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:07:20.415Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 message-type opcodes matched literally; framing, addressing, value scaling, and transport parameters verified against source text. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Device-specific parameter addresses (Node/Virtual Device/Object/Parameter IDs) are not enumerated in this source — they are discovered at runtime via the Audio Architect Venue Explorer / Properties window. Model \"Tr1616\" itself is not named in the source text; this source documents the Soundweb London family protocol generically."
- "baud rate not stated in source (\"found in Audio Architect Properties window\" - value not given)"
- "not stated in source"
- "source contains no safety warnings, interlock procedures, or"
- "exact baud/data/parity/stop bits for RS-232 — source says they live in Audio Architect Properties window but does not state values."
- "device-specific Node/VirtualDevice/ObjectID/ParameterID table for the Tr1616 — must be enumerated at runtime via Audio Architect; not in this source."
- "firmware version compatibility range not stated."
- "protocol version number not stated."
- "the literal model string \"Tr1616\" does not appear in this source text — it documents the Soundweb London DI family generically. Confirm the Tr1616 is a Soundweb London member before publishing."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
