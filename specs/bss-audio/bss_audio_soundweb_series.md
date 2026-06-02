---
spec_id: admin/bss-audio-soundweb-london
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio Soundweb London Control Spec"
manufacturer: "BSS Audio"
model_family: "Soundweb London"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "Soundweb London"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://www.bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:32:58.671Z
last_checked_at: 2026-06-02T00:05:06.550Z
generated_at: 2026-06-02T00:05:06.550Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "refined source does not list specific product models; entire Soundweb London series treated as compatible. Baud rate, data bits, parity, stop bits for serial transport not stated."
  - "baud rate not stated in source"
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "source documents parameter value ranges at type level only;"
  - "source does not document unsolicited device-emitted events"
  - "source does not document multi-step sequences."
  - "full London DI message structure diagrams (SET STRING, PRESET RECALL) truncated in source. Concrete preset ID list and per-processing-object parameter IDs not enumerated."
verification:
  verdict: verified
  checked_at: 2026-06-02T00:05:06.550Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literal opcodes in source; transport parameters verified; complete coverage. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BSS Audio Soundweb London Control Spec

## Summary
BSS Audio Soundweb London is a family of networkable DSP processors exposing the London Direct Inject (London DI) protocol over TCP port 1023 and RS-232 (9-pin D-type, pins 2/3/5). This spec covers the binary message framing, opcodes, parameter addressing, and acknowledgement rules documented in the Soundweb London Third Party Control guide.

<!-- UNRESOLVED: refined source does not list specific product models; entire Soundweb London series treated as compatible. Baud rate, data bits, parity, stop bits for serial transport not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null     # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT opcodes
- routable   # inferred: source selector and multi-state parameters documented
- levelable  # inferred: gain / level parameter types documented
```

## Actions
```yaml
# London DI opcodes. Each message is framed 0x02 [body] 0x03 [XOR checksum],
# with byte substitution applied to the body after checksum. Addressing fields
# (Node 2B, Virtual 1B, Object 3B, Parameter 2B) shown as {N} {V} {O} {P}.
# Checksum is XOR of all body bytes BEFORE substitution.

- id: set_raw
  label: SET (raw value)
  kind: action
  command: "0x02 0x88 {N} {V} {O} {P} [value 4B] 0x03 [XOR]"  # parameterized
  params:
    - name: node
      type: integer
      description: Node Address, 0x0001 to 0xFFFE
    - name: virtual
      type: integer
      description: Virtual Device (0x03 Audio, 0x02 Logic)
    - name: object
      type: integer
      description: Object ID (3 bytes)
    - name: parameter
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: integer
      description: 32-bit signed raw value

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "0x02 0x8D {N} {V} {O} {P} [percent 4B] 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID
    - name: percent
      type: integer
      description: 0-100 percentage (Raw = percent * 65536)

- id: set_string
  label: SET STRING
  kind: action
  command: "0x02 0x91 {N} {V} {O} {P} [len] [ascii bytes] 0x00 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID
    - name: value
      type: string
      description: ASCII string up to 32 bytes, prefixed by length, suffixed 0x00

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "0x02 0x90 {N} {V} {O} {P} [delta 4B] 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID
    - name: delta
      type: integer
      description: Signed percent delta

- id: subscribe
  label: SUBSCRIBE (raw)
  kind: query
  command: "0x02 0x89 {N} {V} {O} {P} 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "0x02 0x8E {N} {V} {O} {P} 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "0x02 0x8A {N} {V} {O} {P} 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "0x02 0x8F {N} {V} {O} {P} 0x03 [XOR]"
  params:
    - name: node
      type: integer
      description: Node Address
    - name: virtual
      type: integer
      description: Virtual Device
    - name: object
      type: integer
      description: Object ID
    - name: parameter
      type: integer
      description: Parameter ID

- id: recall_preset
  label: RECALL PRESET
  kind: action
  command: "0x02 0x8C [preset_id 4B] 0x03 [XOR]"
  params:
    - name: preset_id
      type: integer
      description: Parameter Preset ID (4 bytes)
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [0x06, 0x15]
  description: RS-232 acknowledgement. 0x06 = receipt and checksum OK. 0x15 = checksum invalid.
- id: set_response
  type: bytes
  description: SET / SET PERCENT message returned after SUBSCRIBE, same framing 0x02 ... 0x03 [XOR] as the action that produced it.
```

## Variables
```yaml
# UNRESOLVED: source documents parameter value ranges at type level only;
# no concrete named settable parameters enumerated in refined excerpt.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited device-emitted events
# beyond subscription responses and RS-232 acks (covered in Feedbacks).
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Two-state parameters (e.g. mute) use raw values 0 and 1.
- Multi-state parameters (e.g. source selector) use discrete values 0,1,2,3...
- Gain parameters: raw range -280617 to 100000 (-80 dB to +10 dB). Unity = 0 (73.73%). Logarithmic from -inf to -10 dB, linear above.
- Meter parameters: raw range -800000 to 400000 (-80 dB to +40 dB). 0 dB = raw 0 (66.66%). dB = raw / 10000.
- TCP transport: no acknowledgements (TCP provides reliability); multiple connections accepted; socket left open.
- RS-232 transport: ack 0x06 / nak 0x15. 1 second timeout, re-transmit on miss. Baud rate not stated in source — must be configured in Audio Architect Properties window.
- Byte substitution (applied to body AFTER checksum calculation): 0x02 -> 0x1B 0x82, 0x03 -> 0x1B 0x83, 0x06 -> 0x1B 0x86, 0x15 -> 0x1B 0x95, 0x1B -> 0x1B 0x9B.
- Crown, JBL, AKG devices do not respond to London Direct Inject.
- BLU-Link, Dante, CobraNet, AVB are not used for control.
- Subscriptions terminate on UNSUBSCRIBE or device reboot. BUMP PERCENT does not generate SET/SET PERCENT responses on subscribed parameters; re-subscribe to read new values.
<!-- UNRESOLVED: full London DI message structure diagrams (SET STRING, PRESET RECALL) truncated in source. Concrete preset ID list and per-processing-object parameter IDs not enumerated. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://www.bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:32:58.671Z
last_checked_at: 2026-06-02T00:05:06.550Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T00:05:06.550Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literal opcodes in source; transport parameters verified; complete coverage. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "refined source does not list specific product models; entire Soundweb London series treated as compatible. Baud rate, data bits, parity, stop bits for serial transport not stated."
- "baud rate not stated in source"
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "source documents parameter value ranges at type level only;"
- "source does not document unsolicited device-emitted events"
- "source does not document multi-step sequences."
- "full London DI message structure diagrams (SET STRING, PRESET RECALL) truncated in source. Concrete preset ID list and per-processing-object parameter IDs not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
