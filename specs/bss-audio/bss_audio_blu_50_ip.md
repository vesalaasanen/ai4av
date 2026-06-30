---
spec_id: admin/bss-audio-blu-50
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU 50 Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-50
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-50
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
retrieved_at: 2026-06-30T02:53:34.130Z
last_checked_at: 2026-06-30T06:55:50.637Z
generated_at: 2026-06-30T06:55:50.637Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no enumerated command list (per-parameter opcodes, processing-object catalogs, or worked examples) is present in the source. Only message-type bytes (0x88, 0x89, 0x8A, 0x8C, 0x8D, 0x8E, 0x8F, 0x90, 0x91) and addressing structure are documented. Specific parameter opcodes must be obtained from the full London DI protocol PDF referenced in the Audio Architect installation."
  - "baud rate configurable via Audio Architect Properties window, no default stated in source"
  - "not stated in source"
  - "source does not enumerate specific feedback/response message types beyond"
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "per-parameter opcode tables (Object ID, Parameter ID enumerations for each processing object category) are not present in the source — only the generic addressing scheme. The full London DI protocol PDF must be ingested to enumerate settable parameters."
  - "serial port parameters (baud, data bits, parity, stop bits, flow control) not stated in source — only that pins 2/3/5 are used and that baud is configurable in Audio Architect."
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:55:50.637Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 message-type opcodes (0x88-0x91) matched verbatim in source; TCP port 1023 and serial RS-232 transport confirmed; addressing and parameter structure fully documented. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU 50 Control Spec

## Summary
BSS Audio BLU 50 is a Soundweb London networked audio processor supporting third-party control via the London Direct Inject protocol over Ethernet (TCP port 1023) or RS-232. This spec describes the London DI message framing, message types, parameter addressing scheme, and acknowledgement behavior used to set, subscribe, recall presets, and bump parameter values on the device.

<!-- UNRESOLVED: no enumerated command list (per-parameter opcodes, processing-object catalogs, or worked examples) is present in the source. Only message-type bytes (0x88, 0x89, 0x8A, 0x8C, 0x8D, 0x8E, 0x8F, 0x90, 0x91) and addressing structure are documented. Specific parameter opcodes must be obtained from the full London DI protocol PDF referenced in the Audio Architect installation. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable via Audio Architect Properties window, no default stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null     # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no login/password procedure described in source
```

## Traits
```yaml
# - powerable       NOT inferred: no discrete power on/off commands documented
# - routable        NOT inferred: source selector parameter mentioned but no enumerated routing commands
# - queryable       # inferred: SUBSCRIBE (0x89) and SUBSCRIBE PERCENT (0x8E) message types present
# - levelable       # inferred: gain/level parameters documented with scaling laws
- queryable
- levelable
```

## Actions
```yaml
# Source documents the London DI message-type opcodes and parameter-addressing scheme
# but does not enumerate specific per-parameter or per-channel commands. Each action
# below describes a protocol-level message type with its type byte. Parameter values
# (Node Address, Virtual Device, Object ID, Parameter ID, Value) are application-specific
# and must be resolved against the full London DI protocol PDF referenced in source.

- id: set_parameter_raw
  label: SET Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {val_0} {val_1} {val_2} {val_3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes), range 0x0001 to 0xFFFE
    - name: virtual_device
      type: integer
      description: Virtual Device byte (Audio 0x03, Logic 0x02)
    - name: object_id
      type: integer
      description: Object ID (3 bytes) identifying the processing object
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes) identifying the parameter
    - name: value
      type: integer
      description: Raw 32-bit signed value (4 bytes)
  notes: SET message type byte 0x88. Body byte-substitution applied after checksum.

- id: subscribe_parameter
  label: SUBSCRIBE Parameter
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes), range 0x0001 to 0xFFFE
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
  notes: SUBSCRIBE message type byte 0x89. Device returns SET or SET STRING messages on subsequent value changes until UNSUBSCRIBE or reboot.

- id: unsubscribe_parameter
  label: UNSUBSCRIBE Parameter
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
  notes: UNSUBSCRIBE message type byte 0x8A. Stops returning SET messages for the subscribed parameter.

- id: recall_parameter_preset
  label: RECALL Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_0} {preset_1} {preset_2} {preset_3} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: Preset ID number (4 bytes). No addressing used.
  notes: RECALL PRESET message type byte 0x8C. Cannot subscribe to a parameter preset.

- id: set_parameter_percent
  label: SET Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {val_0} {val_1} {val_2} {val_3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: percent
      type: number
      description: Percentage value 0-100 (fractions allowed). Raw = percent * 65536.
  notes: SET PERCENT message type byte 0x8D.

- id: subscribe_parameter_percent
  label: SUBSCRIBE Parameter (Percent)
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
  notes: SUBSCRIBE PERCENT message type byte 0x8E. Device returns SET PERCENT messages.

- id: unsubscribe_parameter_percent
  label: UNSUBSCRIBE Parameter (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
  notes: UNSUBSCRIBE PERCENT message type byte 0x8F.

- id: bump_parameter_percent
  label: BUMP Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {val_0} {val_1} {val_2} {val_3} {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: percent_delta
      type: number
      description: Percentage delta to bump (up or down)
  notes: BUMP PERCENT message type byte 0x90. After BUMP, device does not return SET/SET PERCENT - re-subscribe to read new values.

- id: set_parameter_string
  label: SET Parameter (String)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virtual_device} {obj_id_0} {obj_id_1} {obj_id_2} {param_hi} {param_lo} {length} {ascii_bytes...} 0x00 {checksum} 0x03"
  params:
    - name: node_address
      type: integer
      description: Node Address (2 bytes)
    - name: virtual_device
      type: integer
      description: Virtual Device byte
    - name: object_id
      type: integer
      description: Object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID (2 bytes)
    - name: value
      type: string
      description: ASCII string up to 32 bytes; prefixed with length byte, terminated with 0x00
  notes: SET STRING message type byte 0x91.
```

## Feedbacks
```yaml
# UNRESOLVED: source does not enumerate specific feedback/response message types beyond
# generic "SET or SET PERCENT messages returned on subscribe." The full London DI PDF
# is referenced for response-message opcodes.
```

## Variables
```yaml
# - id: gain_db
#   type: number
#   range: [-80, 10]
#   description: Gain parameter; Raw value -280,617 (0%, -80dB) to 100,000 (100%, +10dB). Unity gain Raw=0 (73.73%). Logarithmic -inf to -10dB, linear above -10dB.
#
# - id: meter_db
#   type: number
#   range: [-80, 40]
#   description: Meter parameter; Raw -800,000 (0%, -80dB) to 400,000 (100%, +40dB) linear. 0dB at Raw=0 (66.66%). dB = Raw / 10,000.
#
# Source documents the scaling laws for gain and meter parameter types. Specific
# parameter IDs must be resolved against the London DI protocol PDF.
```

## Events
```yaml
# Unsolicited SET / SET PERCENT / SET STRING messages returned by the device on
# subscribed parameter value changes. No discrete event opcodes beyond the SET-family
# response messages documented in the Actions section above.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements.
```

## Notes
- All London DI messages are framed: start 0x02, end 0x03, with last byte as XOR checksum of body bytes before byte substitution.
- Byte substitution (applied after checksum calculation): 0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B. This increases message length.
- RS-232: only pins 2, 3, 5 of the 9-pin D-type are used. Valid messages acknowledged with 0x06; invalid checksum returns 0x15. Device can be configured to wait for ack and re-transmit after 1 second if no ack received. Baud rate and ack settings are configurable in Audio Architect Properties (no defaults stated).
- TCP: port 1023, multiple connections accepted. Acknowledgements not used (TCP provides reliability). Client typically opens socket and leaves open.
- Device-to-device forwarding: messages for other Soundweb London devices are automatically forwarded via the network.
- Crown, JBL, AKG devices do not respond to this protocol.
- BLU-Link, Dante, CobraNet, and AVB are NOT used for control.
- Full London DI protocol opcode tables (specific parameter Object IDs, Parameter IDs) are referenced as a separate PDF in the Audio Architect installation folder and are not included in this source.

<!-- UNRESOLVED: per-parameter opcode tables (Object ID, Parameter ID enumerations for each processing object category) are not present in the source — only the generic addressing scheme. The full London DI protocol PDF must be ingested to enumerate settable parameters.
UNRESOLVED: serial port parameters (baud, data bits, parity, stop bits, flow control) not stated in source — only that pins 2/3/5 are used and that baud is configurable in Audio Architect.
UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
retrieved_at: 2026-06-30T02:53:34.130Z
last_checked_at: 2026-06-30T06:55:50.637Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:55:50.637Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 message-type opcodes (0x88-0x91) matched verbatim in source; TCP port 1023 and serial RS-232 transport confirmed; addressing and parameter structure fully documented. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no enumerated command list (per-parameter opcodes, processing-object catalogs, or worked examples) is present in the source. Only message-type bytes (0x88, 0x89, 0x8A, 0x8C, 0x8D, 0x8E, 0x8F, 0x90, 0x91) and addressing structure are documented. Specific parameter opcodes must be obtained from the full London DI protocol PDF referenced in the Audio Architect installation."
- "baud rate configurable via Audio Architect Properties window, no default stated in source"
- "not stated in source"
- "source does not enumerate specific feedback/response message types beyond"
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or power-on"
- "per-parameter opcode tables (Object ID, Parameter ID enumerations for each processing object category) are not present in the source — only the generic addressing scheme. The full London DI protocol PDF must be ingested to enumerate settable parameters."
- "serial port parameters (baud, data bits, parity, stop bits, flow control) not stated in source — only that pins 2/3/5 are used and that baud is configurable in Audio Architect."
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
