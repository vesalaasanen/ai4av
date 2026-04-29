---
schema_version: ai4av-public-spec-v1
device_id: bss/soundweb-london
entity_id: bss_blu_v1_4
spec_id: admin/bss-blu-v1-4
revision: 1
author: admin
title: "BSS Soundweb London Control Spec"
status: published
manufacturer: BSS
manufacturer_key: bss
model_family: "Soundweb London"
aliases: []
compatible_with:
  manufacturers:
    - BSS
  models:
    - "Soundweb London"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: bss_blu_v1_4.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T05:35:29.891Z
retrieved_at: 2026-04-23T05:35:29.891Z
last_checked_at: 2026-04-23T05:35:29.891Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T05:35:29.891Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 9 spec actions matched opcodes verbatim in source; addressing, parameter shapes, and transport (port 1023) verified; spec represents complete command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# BSS Soundweb London Control Spec

## Summary
BSS Soundweb London devices support dual-control via TCP/IP (port 1023) and RS-232 serial. Protocol is London Direct Inject — binary format with 0x02 start, 0x03 end, XOR checksum. Supports SET, SUBSCRIBE, UNSUBSCRIBE, BUMP, SET STRING, SET PERCENT, BUMP PERCENT, RECALL PRESET message types. No login/auth described.

<!-- UNRESOLVED: baud rate not stated in source — found in Audio Architect Properties window -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # stated: "Soundweb London devices listen on TCP port 1023"
serial:
  baud_rate: null  # UNRESOLVED: baud rate configured in Audio Architect Properties, not stated in source
  data_bits: null
  parity: null
  stop_bits: null
  flow_control: null
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # UNRESOLVED: no power commands in source
- routable       # UNRESOLVED: no routing commands in source
- queryable      # inferred from SUBSCRIBE/SUBSCRIBE PERCENT message types
- levelable      # inferred from SET PERCENT, BUMP PERCENT, variable parameter values
```

## Actions
```yaml
- id: set_parameter
  label: Set Parameter
  kind: action
  params:
    - name: node_address
      type: integer
      description: "Device node address (0x0001-0xFFFE)"
    - name: virtual_device
      type: integer
      description: "Virtual device category: Audio 0x03, Logic 0x02"
    - name: object_id
      type: integer
      description: "Processing object ID (3 bytes)"
    - name: parameter_id
      type: integer
      description: "Parameter ID within the processing object (2 bytes)"
    - name: value
      type: integer
      description: "Raw 32-bit signed value"

- id: set_percent
  label: Set Percent
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: percent
      type: number
      description: "0-100%, mapped to raw via Raw = percent x 65536"

- id: bump_percent
  label: Bump Percent
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: delta
      type: number
      description: "Percentage increment/decrement"

- id: set_string
  label: Set String Parameter
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: string_value
      type: string
      description: "Up to 32 ASCII characters, prefixed with length byte, terminated 0x00"

- id: subscribe
  label: Subscribe to Parameter
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: subscribe_percent
  label: Subscribe to Parameter (Percent)
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: unsubscribe
  label: Unsubscribe from Parameter
  kind: action
  params:
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percent)
  kind: action
  params:
    - name: node_address
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
  params:
    - name: preset_id
      type: integer
      description: "Preset ID number as shown in Parameter Preset window"
```

## Feedbacks
```yaml
- id: parameter_value
  label: Parameter Value
  type: object
  fields:
    - name: message_type
      type: string
      enum: [SET, SET PERCENT, SET STRING]
    - name: node_address
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: union
      variants:
        - type: integer
          description: "32-bit signed raw value or percent scaled"
        - type: string
          description: "Up to 32 ASCII chars for SET STRING"

- id: ack_byte
  label: Serial Acknowledgement
  type: enum
  values:
    - 0x06  # message received, checksum valid
    - 0x15  # checksum invalid
  description: "Serial RS-232 only; TCP uses reliable delivery via socket"
```

## Variables
```yaml
# UNRESOLVED: parameter values are device-specific; source defines addressing
# scheme but not a fixed variable list. Variable definitions would require
# Audio Architect export or device-specific configuration.
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event messages beyond
# subscription responses triggered by parameter changes
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Message structure (binary, before byte substitution):

- **SET/SUBSCRIBE/SUBSCRIBE_PERCENT/BUMP_PERCENT**: `[0x02][msg_type][node_hi][node_lo][vd][obj_id][param_hi][param_lo][value_hi][value_lo][checksum][0x03]`
- **SET_STRING**: `[0x02][msg_type][node_hi][node_lo][vd][obj_id][param_hi][param_lo][length][string...][checksum][0x03]`
- **UNSUBSCRIBE/UNSUBSCRIBE_PERCENT**: `[0x02][msg_type][node_hi][node_lo][vd][obj_id][param_hi][param_lo][checksum][0x03]`
- **RECALL_PRESET**: `[0x02][0x8C][preset_id_hi][preset_id_lo][checksum][0x03]`

Byte substitution required after checksum calculation for: 0x02→`0x1B 0x82`, 0x03→`0x1B 0x83`, 0x06→`0x1B 0x86`, 0x15→`0x1B 0x95`, 0x1B→`0x1B 0x9B`.

Serial communication: device acknowledges with 0x06 (valid checksum) or 0x15 (invalid). Retransmits if no ack within 1 second.

Ethernet: no acknowledgement; TCP provides reliable delivery. Multiple simultaneous TCP connections accepted on port 1023.

Parameter scaling:
- Two-state (mute): raw 0 = 0%, raw 1 = 100%
- Multi-state (source selector): raw values map to enumerated states 0–N
- Variable (gain): raw range −280,617 to 100,000; unity gain = 0 (73.73%); logarithmic scale to −10dB, linear above
- Meters: raw range −800,000 to 400,000; 0dB = 0 (66.66%); dB = raw / 10,000

<!-- UNRESOLVED: baud rate and serial port settings (data bits, parity, stop bits) not stated — configured via Audio Architect Properties window -->
<!-- UNRESOLVED: complete parameter ID table not included; Object IDs and Parameter IDs are device/configuration-specific -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: bss_blu_v1_4.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T05:35:29.891Z
retrieved_at: 2026-04-23T05:35:29.891Z
last_checked_at: 2026-04-23T05:35:29.891Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:35:29.891Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 9 spec actions matched opcodes verbatim in source; addressing, parameter shapes, and transport (port 1023) verified; spec represents complete command catalogue."
```

## Known Gaps

```yaml
[]
```
