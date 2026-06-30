---
spec_id: admin/bss-audio-blu-120
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-120 Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-120
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-120
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-tool
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://bssaudio.com/en/site_elements/bss-crestron-series-4-soundweb-london-module
  - https://bssaudio.com/en/site_elements/amx-hpro-bss-gateway-comm
retrieved_at: 2026-06-30T03:49:20.284Z
last_checked_at: 2026-06-30T06:55:48.587Z
generated_at: 2026-06-30T06:55:48.587Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact byte-level message-structure diagrams are shown as omitted pictures in the source; field order is documented in text and used below, but pixel-exact framing figures were not available."
  - "RS-232 serial configuration (baud rate, data bits, parity, stop bits, flow control) is not numerically stated in the source — baud rate is \"found in Audio Architect Properties window.\""
  - "baud rate not numerically stated; configured via Audio Architect Properties window"
  - "not stated in source"
  - "no multi-step sequences described explicitly in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "RS-232 serial line config (baud/data/parity/stop/flow) not numerically stated in source."
  - "exact byte-level framing diagrams omitted from source (pictures)."
  - "firmware version compatibility not stated in source."
  - "BUMP PERCENT sign/direction encoding not explicitly described in source (sign-based inference)."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:55:48.587Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literal hex opcodes and parameter structures in the London Direct Inject protocol reference. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-120 Control Spec

## Summary
The BSS Audio BLU-120 is a Soundweb London DSP device controlled via the London Direct Inject (DI) protocol. It offers two-way communication over a 100 Mb/s Ethernet (RJ-45) network on TCP port 1023, and over serial RS-232 via a 9-pin D-type connector (pins 2, 3, 5). A third-party controller can SET, BUMP, GET (subscribe to), and recall Presets for any parameter or meter on the device.

<!-- UNRESOLVED: exact byte-level message-structure diagrams are shown as omitted pictures in the source; field order is documented in text and used below, but pixel-exact framing figures were not available. -->
<!-- UNRESOLVED: RS-232 serial configuration (baud rate, data bits, parity, stop bits, flow control) is not numerically stated in the source — baud rate is "found in Audio Architect Properties window." -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # stated: "Soundweb London devices listen on TCP port 1023"
serial:
  baud_rate: null  # UNRESOLVED: baud rate not numerically stated; configured via Audio Architect Properties window
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
  - queryable    # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable    # inferred: gain/threshold/pan parameters controlled via SET PERCENT / BUMP PERCENT
  - routable     # inferred: Source Selector processing object controllable via SET
```

## Actions
```yaml
# London DI framing (documented in source text):
#   - Every message starts with 0x02 and ends with 0x03.
#   - First byte after 0x02 = message type.
#   - Last byte before 0x03 = checksum = single-byte XOR of all body bytes,
#     computed BEFORE byte substitution is applied.
#   - Byte substitution (applied AFTER checksum): 0x02->0x1B 0x82, 0x03->0x1B
#     0x83, 0x06->0x1B 0x86, 0x15->0x1B 0x95, 0x1B->0x1B 0x9B.
# Addressing fields: Node Address (2 bytes, 0x0001-0xFFFE), Virtual Device
#   (1 byte: 0x03 Audio, 0x02 Logic), Object ID (3 bytes), Parameter ID (2 bytes).
# Value fields: 4 bytes (32-bit signed) unless noted. Big-endian assumed.
# {checksum} placeholder = computed XOR of preceding body bytes.

- id: set_parameter_raw
  label: SET (Raw Value)
  kind: action
  command: "02 88 {node} {virt_dev} {obj} {param} {value} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; range 0x0001-0xFFFE / 1-65534)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 = Audio, 0x02 = Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes) identifying the Processing Object"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
    - name: value
      type: integer
      description: "32-bit signed raw value"
  notes: "checksum = XOR of all body bytes before byte substitution."

- id: set_parameter_percent
  label: SET PERCENT
  kind: action
  command: "02 8D {node} {virt_dev} {obj} {param} {value} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
    - name: value
      type: integer
      description: "32-bit signed percentage-scaled value (Raw = percentage x 65536; range 0-100%)"
  notes: "checksum = XOR of all body bytes before byte substitution."

- id: bump_parameter_percent
  label: BUMP PERCENT
  kind: action
  command: "02 90 {node} {virt_dev} {obj} {param} {value} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
    - name: value
      type: integer
      description: "Signed bump amount as a percentage value (positive = up, negative = down)"
  notes: "Per source: bumping a subscribed parameter does NOT generate SET/SET PERCENT responses; a fresh subscribe is required to read the new value."

- id: set_parameter_string
  label: SET STRING
  kind: action
  command: "02 91 {node} {virt_dev} {obj} {param} {length} {string} 00 {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
    - name: length
      type: integer
      description: "Prefix byte = number of bytes in the string"
    - name: string
      type: string
      description: "Up to 32 ASCII bytes"
  notes: "Value includes a length prefix and a 0x00 termination suffix. checksum = XOR of body bytes before byte substitution."

- id: subscribe_parameter
  label: SUBSCRIBE
  kind: query
  command: "02 89 {node} {virt_dev} {obj} {param} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
  notes: "Returns the current value immediately as a SET or SET STRING message, then on every subsequent change until UNSUBSCRIBE or reboot. checksum = XOR of body bytes before byte substitution."

- id: unsubscribe_parameter
  label: UNSUBSCRIBE
  kind: action
  command: "02 8A {node} {virt_dev} {obj} {param} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
  notes: "Stops the device returning SET messages for this parameter. checksum = XOR of body bytes before byte substitution."

- id: subscribe_parameter_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "02 8E {node} {virt_dev} {obj} {param} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
  notes: "Returns SET PERCENT messages for the parameter until UNSUBSCRIBE PERCENT or reboot. checksum = XOR of body bytes before byte substitution."

- id: unsubscribe_parameter_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "02 8F {node} {virt_dev} {obj} {param} {checksum} 03"
  params:
    - name: node
      type: integer
      description: "Node Address (2 bytes, big-endian; 0x0001-0xFFFE)"
    - name: virt_dev
      type: integer
      description: "Virtual Device byte (0x03 Audio, 0x02 Logic)"
    - name: obj
      type: integer
      description: "Object ID (3 bytes)"
    - name: param
      type: integer
      description: "Parameter ID (2 bytes, big-endian)"
  notes: "Stops the device returning SET PERCENT messages for this parameter. checksum = XOR of body bytes before byte substitution."

- id: recall_preset
  label: RECALL PRESET
  kind: action
  command: "02 8C {preset_id} {checksum} 03"
  params:
    - name: preset_id
      type: integer
      description: "Parameter Preset ID (4 bytes) as displayed in the Parameter Preset window"
  notes: "No addressing is used. Not possible to subscribe to a Parameter Preset. checksum = XOR of body bytes before byte substitution."
```

## Feedbacks
```yaml
- id: serial_ack
  type: enum
  values: ["0x06"]
  description: "RS-232 only: confirms receipt + valid checksum. (0x06 = positive acknowledgement)."

- id: serial_nak
  type: enum
  values: ["0x15"]
  description: "RS-232 only: returned when checksum is invalid (0x15). Device re-transmits if no ACK/NAK within 1 second."

- id: subscription_set_response
  type: raw
  description: "SET or SET STRING message returned for a subscribed parameter (message type 0x88 / 0x91)."

- id: subscription_percent_response
  type: raw
  description: "SET PERCENT message returned for a percent-subscribed parameter (message type 0x8D)."
```

## Variables
```yaml
- id: parameter_value_raw
  type: integer
  description: "32-bit signed raw parameter value. Gain: -280617 (-80dB/0%) to 100000 (+10dB/100%); unity gain = 0 (73.73%). Log scale below -10dB, linear above. Meter: -800000 (-80dB/0%) to 400000 (+40dB/100%); 0dB = 0; dB = Raw / 10000."
- id: parameter_value_percent
  type: number
  description: "Percentage value 0-100%. Raw = percentage x 65536. Two-state (mute) = 0/1 (0%/100%). Multi-state (source selector) = 0,1,2,3..."
```

## Events
```yaml
# Soundweb London devices push unsolicited SET / SET PERCENT messages for any
# subscribed parameter whenever its value changes (until UNSUBSCRIBE or reboot).
# NOTE: BUMP PERCENT changes do NOT generate push messages - a fresh subscribe
# is required to read post-bump values.
- id: parameter_changed
  description: "Unsolicited SET / SET STRING / SET PERCENT message emitted on change of a subscribed parameter."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described explicitly in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Crown, JBL, AKG devices do not respond to
# this protocol (noted in source) but that is a compatibility note, not a safety interlock.
```

## Notes
- **Message framing:** all London DI messages start with `0x02` and end with `0x03`; the byte before `0x03` is the XOR checksum of the body.
- **Byte substitution** is applied AFTER the checksum is computed and increases message length: `0x02`→`0x1B 0x82`, `0x03`→`0x1B 0x83`, `0x06`→`0x1B 0x86`, `0x15`→`0x1B 0x95`, `0x1B`→`0x1B 0x9B`.
- **ACK semantics differ by transport:** serial RS-232 uses `0x06`/`0x15` acknowledgements (1s timeout → re-transmit); Ethernet/TCP does not use acknowledgements because TCP is already reliable. A TCP socket is normally held open indefinitely; the device accepts multiple connections.
- **Compatibility:** Crown, JBL, and AKG devices do NOT respond to the London DI protocol. BLU-Link, Dante, CobraNet, and AVB connections are not used for control.
- **Message-structure figures omitted:** the source's byte-level message-structure diagrams (SET, SET STRING, UNSUBSCRIBE, PRESET RECALL frames) are rendered as pictures and were not available; field order documented in the surrounding text was used to build the command templates above.

<!-- UNRESOLVED: RS-232 serial line config (baud/data/parity/stop/flow) not numerically stated in source. -->
<!-- UNRESOLVED: exact byte-level framing diagrams omitted from source (pictures). -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: BUMP PERCENT sign/direction encoding not explicitly described in source (sign-based inference). -->
```

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-tool
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://bssaudio.com/en/site_elements/bss-crestron-series-4-soundweb-london-module
  - https://bssaudio.com/en/site_elements/amx-hpro-bss-gateway-comm
retrieved_at: 2026-06-30T03:49:20.284Z
last_checked_at: 2026-06-30T06:55:48.587Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:55:48.587Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literal hex opcodes and parameter structures in the London Direct Inject protocol reference. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact byte-level message-structure diagrams are shown as omitted pictures in the source; field order is documented in text and used below, but pixel-exact framing figures were not available."
- "RS-232 serial configuration (baud rate, data bits, parity, stop bits, flow control) is not numerically stated in the source — baud rate is \"found in Audio Architect Properties window.\""
- "baud rate not numerically stated; configured via Audio Architect Properties window"
- "not stated in source"
- "no multi-step sequences described explicitly in source."
- "source contains no safety warnings, interlock procedures, or"
- "RS-232 serial line config (baud/data/parity/stop/flow) not numerically stated in source."
- "exact byte-level framing diagrams omitted from source (pictures)."
- "firmware version compatibility not stated in source."
- "BUMP PERCENT sign/direction encoding not explicitly described in source (sign-based inference)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
