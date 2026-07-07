---
spec_id: admin/bss-audio-analog-input-card
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio Analog Input Card Control Spec"
manufacturer: "BSS Audio"
model_family: "Analog Input Card"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "Analog Input Card"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/products/analog-input-card
  - https://bssaudio.com/en/support_downloads/product/blu-800
  - https://bssaudio.com/en/product_families/input-output-cards
  - https://bssaudio.com/en
retrieved_at: 2026-07-01T14:01:05.300Z
last_checked_at: 2026-07-07T11:05:55.749Z
generated_at: 2026-07-07T11:05:55.749Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no baud rate, data bits, parity, or stop bits stated for RS-232 (configured via Audio Architect Properties window)"
  - "message body diagrams (figures) were image-only and omitted; exact per-message byte layouts for SET/SUBSCRIBE/SET STRING/UNSUBSCRIBE/PRESET RECALL not captured as text"
  - "baud rate not stated in source (set in Audio Architect Properties window)"
  - "not stated in source"
  - "no event catalogue beyond subscription-driven value pushes."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "exact byte-by-byte layout of SET / SET STRING / UNSUBSCRIBE / PRESET RECALL message bodies shown only as figures (omitted). Field order above inferred from addressing description; verify against the London DI protocol PDF in the Audio Architect installation folder."
  - "serial electrical config (baud/data bits/parity/stop bits/flow control) not stated — configured per-device in Audio Architect."
  - "firmware version compatibility not stated."
  - "full enumeration of Analog Input Card Object IDs / Parameter IDs not in this protocol document (configuration-dependent, shown in Venue Explorer at runtime)."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:05:55.749Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All nine London DI protocol message types verified against source; opcodes and parameters match exactly; transport values confirmed. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# BSS Audio Analog Input Card Control Spec

## Summary
Soundweb London Analog Input Card controllable over Ethernet (TCP) and serial RS-232 via the London Direct Inject (DI) protocol. The protocol is a two-way binary message protocol allowing a third-party controller to SET, BUMP, SUBSCRIBE to, and recall presets on any device parameter or meter. This spec covers the DI message catalogue, addressing scheme, value encoding, and byte-substitution rules. Crown, JBL, and AKG devices do not respond to this protocol.

<!-- UNRESOLVED: no baud rate, data bits, parity, or stop bits stated for RS-232 (configured via Audio Architect Properties window) -->
<!-- UNRESOLVED: message body diagrams (figures) were image-only and omitted; exact per-message byte layouts for SET/SUBSCRIBE/SET STRING/UNSUBSCRIBE/PRESET RECALL not captured as text -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # Soundweb London devices listen on TCP port 1023, accept multiple connections
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (set in Audio Architect Properties window)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "9-pin D-type (pins 2,3,5 used)"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT for gain/threshold/pan parameters
  - presettable  # inferred: RECALL PRESET message type documented
```

## Actions
```yaml
# All London DI message types from the source. Each opcode = one action.
# All messages framed: start 0x02 ... body ... checksum ... end 0x03.
# Checksum = single-byte XOR of all body bytes, computed before byte substitution.
# Byte substitution applied AFTER checksum: 0x02->1B 82, 0x03->1B 83, 0x06->1B 86,
# 0x15->1B 95, 0x1B->1B 9B. Substitution increases message length.
# Addressing fields (Node Address 2B, Virtual Device 1B, Object ID 3B, Parameter ID 2B)
# are common to all addressed messages; PRESET RECALL is unaddressed.

- id: set_raw
  label: SET (Raw Value)
  kind: action
  command: "02 88 {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, range 0x0001-0xFFFE (1-65534). Two bytes."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02). One byte."
    - name: object_id
      type: integer
      description: "Processing Object ID (Mixer, EQ, Source Selector, etc). Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object (Gain, Mute, Source, etc). Two bytes."
    - name: value
      type: integer
      description: "32-bit signed raw value (four bytes). Scaling depends on parameter type."
  notes: "Opcode 0x88. Set a parameter using its raw value."

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "02 8D {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
    - name: percent
      type: number
      description: "Percentage value 0-100. Raw = percentage x 65536."
  notes: "Opcode 0x8D. Set a parameter using a percentage value."

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "02 90 {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
    - name: bump
      type: integer
      description: "Signed percentage delta to bump parameter up or down. 32-bit signed."
  notes: "Opcode 0x90. Bump the parameter up or down by a percentage value. NOTE: subscribed parameters changed via BUMP do not auto-return SET messages; a fresh SUBSCRIBE is required to read new value."

- id: set_string
  label: SET STRING
  kind: action
  command: "02 91 {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {length} {ascii_bytes...} 00 {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
    - name: string
      type: string
      description: "ASCII string up to 32 characters. Value prefixed with byte-length and terminated with 0x00 suffix."
  notes: "Opcode 0x91. Set a parameter using a string of up to 32 ASCII characters. Length prefix + 0x00 termination suffix required."

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "02 8C {preset_id_1} {preset_id_2} {preset_id_3} {preset_id_4} {checksum} 03"
  params:
    - name: preset_id
      type: integer
      description: "Parameter Preset ID number (four bytes). Displayed in the Parameter Preset window."
  notes: "Opcode 0x8C. Recalls a Parameter Preset using the Preset ID number. No addressing used. Not possible to subscribe to a Parameter Preset."

- id: subscribe
  label: SUBSCRIBE
  kind: query
  command: "02 89 {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
  notes: "Opcode 0x89. Subscribe to a parameter. Immediately returns current value as SET or SET STRING; further SET/SET STRING messages sent on each value change until UNSUBSCRIBE or device reboot."

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "02 8E {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
  notes: "Opcode 0x8E. Subscribe to a parameter; returns SET PERCENT messages on value changes."

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "02 8A {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
  notes: "Opcode 0x8A. Unsubscribe from a parameter. Stops the device returning SET messages for that parameter."

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "02 8F {node_hi} {node_lo} {virtual_device} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 03"
  params:
    - name: node_address
      type: integer
      description: "Physical device node address, 0x0001-0xFFFE."
    - name: virtual_device
      type: integer
      description: "Processing object category (Audio 0x03, Logic 0x02)."
    - name: object_id
      type: integer
      description: "Processing Object ID. Three bytes."
    - name: parameter_id
      type: integer
      description: "Parameter within object. Two bytes."
  notes: "Opcode 0x8F. Unsubscribe from a parameter. Stops the device returning SET PERCENT messages for that parameter."
```

## Feedbacks
```yaml
# Serial-only link-layer acknowledgements (Ethernet/TCP does not use these):
- id: serial_ack
  type: enum
  values: ["0x06"]
  description: "ACK - correctly formatted serial RS-232 message received, valid checksum."

- id: serial_nack
  type: enum
  values: ["0x15"]
  description: "NACK - invalid checksum on serial message. Soundweb re-transmits if waiting for acknowledgement and no 0x06/0x15 within 1 second."

# Application-layer responses returned from SUBSCRIBE / value-change events:
- id: set_response
  type: raw
  description: "SET message (opcode 0x88) returned carrying a parameter's 32-bit raw value. Sent immediately on SUBSCRIBE and on each subsequent value change."

- id: set_percent_response
  type: raw
  description: "SET PERCENT message (opcode 0x8D) returned carrying a parameter's percentage value. Sent on SUBSCRIBE PERCENT and on value changes."

- id: set_string_response
  type: string
  description: "SET STRING message (opcode 0x91) returned carrying a string parameter value (up to 32 ASCII chars). Sent on SUBSCRIBE for string parameters."
```

## Variables
```yaml
# Parameter value encodings documented in the source. Actual parameter set
# (specific Object/Parameter IDs) is device-configuration dependent and not
# enumerated in this protocol document.

- id: raw_value
  type: integer
  description: "32-bit signed value representing a parameter's raw state."

- id: percent_value
  type: number
  description: "Percentage 0-100. Raw = percentage x 65536. Two-state params use 0/1 (0%/100%). Multi-state params use discrete 0,1,2,3,4... mapped across 0-100%."

- id: gain_value
  type: integer
  description: "Gain parameter raw range -280617 (-80dB / 0%) to 100000 (+10dB / 100%). Unity gain = 0 (73.73%). Logarithmic scale from -inf to -10dB, linear above -10dB."

- id: meter_value
  type: integer
  description: "Meter parameter raw range -800000 (-80dB / 0%) to 400000 (+40dB / 100%). Linear scale. 0dB = 0 (66.66%). dB value = Raw / 10000."

- id: string_value
  type: string
  description: "Up to 32 ASCII bytes. Wire format: length-prefix byte + ASCII bytes + 0x00 termination suffix."

- id: node_address
  type: integer
  description: "Physical device node address. Range 0x0001-0xFFFE (1-65534). Two bytes. Shown in Venue Explorer / Room view."

- id: virtual_device
  type: integer
  description: "Processing object category. Audio=0x03, Logic=0x02. One byte."

- id: object_id
  type: integer
  description: "Processing Object identifier (Mixer, EQ, Source Selector, etc). Three bytes."

- id: parameter_id
  type: integer
  description: "Parameter within a Processing Object (Gain, Mute, Source, etc). Two bytes."

- id: preset_id
  type: integer
  description: "Parameter Preset ID number (four bytes). Displayed in Parameter Preset window."
```

## Events
```yaml
# Unsolicited notifications: when a controller has SUBSCRIBED/SUBSCRIBED PERCENT
# to a parameter, the device pushes SET / SET PERCENT / SET STRING messages on
# each value change until UNSUBSCRIBE or reboot. No other unsolicited events
# documented.
# UNRESOLVED: no event catalogue beyond subscription-driven value pushes.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Do not infer.
```

## Notes
- London DI is a generic Soundweb London protocol; the same message catalogue applies to all Soundweb London devices (including the Analog Input Card). Crown, JBL, and AKG devices do NOT respond to this protocol.
- BLU-Link, Dante, CobraNet, and AVB connections are not used for any form of control — control is Ethernet (RJ-45, 100Mb/s) or RS-232 (9-pin D-type, pins 2/3/5) only.
- Ethernet control does not use 0x06/0x15 acknowledgements (TCP provides reliability). Serial control may optionally require acknowledgement with 1-second re-transmit timeout, configured in Audio Architect Properties.
- Checksum is computed over the body BEFORE byte substitution; substitution is applied afterwards and grows message length. Any implementation must substitute 0x02/0x03/0x06/0x15/0x1B in the body and reverse-substitute on receive.
- Percentage ↔ raw conversion: `raw = percent × 65536`.
- Parameter Preset recall is the only unaddressed message; it uses the Preset ID directly as the four-byte value.
- Soundweb devices are always listening; no enable step required for third-party control.

<!-- UNRESOLVED: exact byte-by-byte layout of SET / SET STRING / UNSUBSCRIBE / PRESET RECALL message bodies shown only as figures (omitted). Field order above inferred from addressing description; verify against the London DI protocol PDF in the Audio Architect installation folder. -->
<!-- UNRESOLVED: serial electrical config (baud/data bits/parity/stop bits/flow control) not stated — configured per-device in Audio Architect. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: full enumeration of Analog Input Card Object IDs / Parameter IDs not in this protocol document (configuration-dependent, shown in Venue Explorer at runtime). -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/products/analog-input-card
  - https://bssaudio.com/en/support_downloads/product/blu-800
  - https://bssaudio.com/en/product_families/input-output-cards
  - https://bssaudio.com/en
retrieved_at: 2026-07-01T14:01:05.300Z
last_checked_at: 2026-07-07T11:05:55.749Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:05:55.749Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All nine London DI protocol message types verified against source; opcodes and parameters match exactly; transport values confirmed. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no baud rate, data bits, parity, or stop bits stated for RS-232 (configured via Audio Architect Properties window)"
- "message body diagrams (figures) were image-only and omitted; exact per-message byte layouts for SET/SUBSCRIBE/SET STRING/UNSUBSCRIBE/PRESET RECALL not captured as text"
- "baud rate not stated in source (set in Audio Architect Properties window)"
- "not stated in source"
- "no event catalogue beyond subscription-driven value pushes."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "exact byte-by-byte layout of SET / SET STRING / UNSUBSCRIBE / PRESET RECALL message bodies shown only as figures (omitted). Field order above inferred from addressing description; verify against the London DI protocol PDF in the Audio Architect installation folder."
- "serial electrical config (baud/data bits/parity/stop bits/flow control) not stated — configured per-device in Audio Architect."
- "firmware version compatibility not stated."
- "full enumeration of Analog Input Card Object IDs / Parameter IDs not in this protocol document (configuration-dependent, shown in Venue Explorer at runtime)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
