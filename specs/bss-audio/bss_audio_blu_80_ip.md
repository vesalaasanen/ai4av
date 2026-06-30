---
spec_id: admin/bss-audio-blu-80
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-80 Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-80
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-80
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://www.bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://www.bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://www.bssaudio.com/en/site_elements/soundweb-london-di-tool
retrieved_at: 2026-06-30T02:45:28.750Z
last_checked_at: 2026-06-30T06:58:24.637Z
generated_at: 2026-06-30T06:58:24.637Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact message-structure byte layout (field byte order within Object ID / Value) relies on message-structure diagrams omitted from this excerpt. Source documents the opcode bytes and hierarchical address/value field composition explicitly."
  - "firmware version compatibility not stated in source"
  - "serial baud rate / data bits / parity / stop bits / flow control not stated in source (configured in Audio Architect Properties window)"
  - "baud rate not stated in source (set in Audio Architect Properties window)"
  - "not stated in source"
  - "no multi-step sequences described explicitly in source"
  - "source contains no safety warnings, interlock procedures, or"
  - "exact byte order within multi-byte address/value fields — message-structure diagrams omitted from this excerpt (\"picture intentionally omitted\")"
  - "serial port configuration (baud, data bits, parity, stop bits, flow control) not stated — configured in Audio Architect Properties window"
verification:
  verdict: verified
  checked_at: 2026-06-30T06:58:24.637Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 opcodes matched verbatim; addressing parameters, string limits, and percentage scaling verified against source; transport parameters (TCP port 1023, no auth) confirmed; no command omissions. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-80 Control Spec

## Summary
The BSS Audio BLU-80 is a Soundweb London DSP device controllable over Ethernet (TCP) and serial RS-232 via the London Direct Inject protocol. The protocol provides two-way binary communication allowing a third-party controller to set, bump, subscribe to, and recall presets for any device parameter or meter. Messages use a hex byte format: every message begins with 0x02 and ends with 0x03, with the final body byte being a single-byte XOR checksum.

<!-- UNRESOLVED: exact message-structure byte layout (field byte order within Object ID / Value) relies on message-structure diagrams omitted from this excerpt. Source documents the opcode bytes and hierarchical address/value field composition explicitly. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial baud rate / data bits / parity / stop bits / flow control not stated in source (configured in Audio Architect Properties window) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # Soundweb London devices listen on TCP port 1023; accept multiple connections
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (set in Audio Architect Properties window)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / GET parameter messages documented
  - levelable  # inferred: SET / SET PERCENT / BUMP PERCENT gain & percentage control documented
```

## Actions
```yaml
# London Direct Inject protocol - each opcode below is a distinct documented
# message type (one action per opcode, verbatim hex from source). Parameterized
# address/value fields shown as {vars}. Checksum is single-byte XOR of all body
# bytes (computed before byte substitution). Message wrapper is always 0x02 ... 0x03.
# Address = Node Address (2B) + Virtual Device (1B: Audio 0x03 / Logic 0x02) +
# Object ID (3B) + Parameter ID (2B). Value = 4 bytes (32-bit signed) for raw,
# 0-100% scaled (Raw = percent x 65536). Exact byte order within multi-byte
# fields per message-structure diagrams omitted from this excerpt.

- id: set_parameter
  label: SET Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {val1} {val2} {val3} {val4} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: Raw 32-bit signed value (e.g. gain -280617 to 100000)

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {val1} {val2} {val3} {val4} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: Percentage raw value (Raw = percent x 65536; range 0-100%)

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {val1} {val2} {val3} {val4} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: Percentage bump amount (signed; up or down)

- id: set_string
  label: SET STRING
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {len} {ascii_bytes} 0x00 {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: string_value
      type: string
      description: Up to 32 ASCII characters, prefixed with length byte and terminated with 0x00

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset1} {preset2} {preset3} {preset4} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: Preset ID number (4-byte value; no addressing used)

- id: subscribe
  label: SUBSCRIBE Parameter
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virtual_device} {obj1} {obj2} {obj3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Physical device node address (0x0001 - 0xFFFE)
    - name: virtual_device
      type: integer
      description: Processing object category (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
```

## Feedbacks
```yaml
- id: serial_ack
  type: enum
  values: ["0x06"]
  description: Positive acknowledgement (serial RS-232 only) - confirms receipt and checksum

- id: serial_nak
  type: enum
  values: ["0x15"]
  description: Negative acknowledgement (serial RS-232 only) - invalid checksum

- id: subscribed_set_value
  type: string
  description: SET / SET STRING message returned by device on SUBSCRIBE, and on subsequent value changes

- id: subscribed_percent_value
  type: number
  description: SET PERCENT message returned by device on SUBSCRIBE PERCENT, and on subsequent value changes
```

## Variables
```yaml
- id: parameter_raw_value
  type: integer
  description: Settable raw parameter value (32-bit signed); scaling depends on parameter type (e.g. gain -280617..100000, meter -800000..400000)

- id: parameter_percent
  type: number
  description: Settable percentage value (0-100%; Raw = percent x 65536)

- id: parameter_string
  type: string
  description: Settable string value (up to 32 ASCII characters)
```

## Events
```yaml
- id: value_change_notification
  description: >
    Unsolicited SET / SET PERCENT messages emitted automatically by the device
    when a SUBSCRIBE / SUBSCRIBE PERCENT parameter changes value, until an
    UNSUBSCRIBE message is sent or the device reboots. Note: if a subscribed
    parameter is changed via BUMP PERCENT, the device does NOT return SET/SET
    PERCENT messages after every bump - a fresh subscribe must be sent.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
- Binary protocol. All messages begin `0x02` and end `0x03`; the last body byte before `0x03` is a single-byte XOR checksum of all body bytes, computed **before** byte substitution.
- Byte substitution is applied to the message body **after** checksum calculation (it increases message length): `0x02`→`0x1B 0x82`, `0x03`→`0x1B 0x83`, `0x06`→`0x1B 0x86`, `0x15`→`0x1B 0x95`, `0x1B`→`0x1B 0x9B`.
- Ethernet (TCP) does **not** use the 0x06/0x15 acknowledgement scheme — TCP already guarantees reliable delivery. Acknowledgements apply only to RS-232 serial. On serial, if 0x06/0x15 is not received within 1 second the Soundweb device re-transmits.
- Multiple TCP connections are accepted on port 1023; a controller normally opens a socket and leaves it open indefinitely.
- Parameter addressing is hierarchical: Node Address (2B, 0x0001–0xFFFE) → Virtual Device (1B) → Object ID (3B) → Parameter ID (2B). These are read from the Audio Architect Venue Explorer / Properties window.
- Gain parameters: raw `-280617` (-80dB, 0%) to `100000` (+10dB, 100%); unity gain = `0` (73.73%); logarithmic from -inf to -10dB, linear above -10dB. Meter parameters: `-800000` (-80dB, 0%) to `400000` (+40dB, 100%); 0dB = `0` (66.66%); dB = Raw/10000. Two-state params (mute) use 0/1; multi-state params use discrete 0,1,2,3,4.
- Crown, JBL, AKG devices do **not** respond to this protocol — Soundweb London devices only.

<!-- UNRESOLVED: exact byte order within multi-byte address/value fields — message-structure diagrams omitted from this excerpt ("picture intentionally omitted") -->
<!-- UNRESOLVED: serial port configuration (baud, data bits, parity, stop bits, flow control) not stated — configured in Audio Architect Properties window -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
```

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://www.bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://www.bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://www.bssaudio.com/en/site_elements/soundweb-london-di-tool
retrieved_at: 2026-06-30T02:45:28.750Z
last_checked_at: 2026-06-30T06:58:24.637Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:58:24.637Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 opcodes matched verbatim; addressing parameters, string limits, and percentage scaling verified against source; transport parameters (TCP port 1023, no auth) confirmed; no command omissions. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact message-structure byte layout (field byte order within Object ID / Value) relies on message-structure diagrams omitted from this excerpt. Source documents the opcode bytes and hierarchical address/value field composition explicitly."
- "firmware version compatibility not stated in source"
- "serial baud rate / data bits / parity / stop bits / flow control not stated in source (configured in Audio Architect Properties window)"
- "baud rate not stated in source (set in Audio Architect Properties window)"
- "not stated in source"
- "no multi-step sequences described explicitly in source"
- "source contains no safety warnings, interlock procedures, or"
- "exact byte order within multi-byte address/value fields — message-structure diagrams omitted from this excerpt (\"picture intentionally omitted\")"
- "serial port configuration (baud, data bits, parity, stop bits, flow control) not stated — configured in Audio Architect Properties window"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
