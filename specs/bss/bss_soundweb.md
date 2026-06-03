---
spec_id: admin/bss-soundweb-london
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Soundweb London Control Spec"
manufacturer: BSS
model_family: "Soundweb London"
aliases: []
compatible_with:
  manufacturers:
    - BSS
  models:
    - "Soundweb London"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/support_downloads
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/bss
retrieved_at: 2026-04-30T15:15:19.077Z
last_checked_at: 2026-06-03T06:25:35.706Z
generated_at: 2026-06-03T06:25:35.706Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model numbers (BLU-50v2, BLU-100, etc.) not listed in this source document"
  - "baud rate not stated in source; configured via Audio Architect Properties window"
  - "data_bits, parity, stop_bits not stated in source"
  - "power commands not explicitly documented in this source"
  - "routing commands not explicitly documented in this source"
  - "specific Parameter ID values for конкретные parameters (gain, mute, source selector) - need full object/parameter reference from Audio Architect"
  - "конкретные parameter ID mappings - Audio Architect object browser required"
  - "specific unsolicited event types not enumerated in this source"
  - "no safety warnings or interlock procedures in this source"
  - "specific model variants (BLU-50v2, BLU-100, BLU-320, etc.) — source covers general Soundweb London family only"
  - "preset storage/management commands beyond RECALL PRESET"
  - "firmware version compatibility"
  - "configurable parameters (baud rate, port) default values not stated in source — configured via Audio Architect"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:25:35.706Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All spec actions verified against source (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# BSS Soundweb London Control Spec

## Summary
BSS Soundweb London devices support third-party control via the London Direct Inject protocol over RS-232 and 100Mb/s Ethernet (TCP/IP port 1023). Two-way communication allows setting or requesting any parameter or meter value. Devices are always listening; no enable step required. Serial acknowledgement uses 0x06 (valid) / 0x15 (checksum error). TCP uses native reliability — no acknowledgement.

<!-- UNRESOLVED: specific model numbers (BLU-50v2, BLU-100, etc.) not listed in this source document -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # TCP port Soundweb London listens on
serial:
  # UNRESOLVED: baud rate not stated in source; configured via Audio Architect Properties window
  # UNRESOLVED: data_bits, parity, stop_bits not stated in source
  # Note: 9-pin D-type port; only pins 2, 3, 5 used
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Inferred from protocol capabilities:
- powerable      # UNRESOLVED: power commands not explicitly documented in this source
- routable        # UNRESOLVED: routing commands not explicitly documented in this source
- queryable       # SUBSCRIBE/GET pattern present - parameter values can be requested
- levelable       # SET PERCENT, BUMP PERCENT present - gain/volume control possible
```

## Actions
```yaml
# Message type opcodes from source:
- id: set_parameter
  label: Set Parameter (Raw)
  kind: action
  params:
    - name: node_address
      type: integer
      description: "2-byte node address (0x0001-0xFFFE)"
    - name: virtual_device
      type: integer
      description: "1-byte virtual device (Audio=0x03, Logic=0x02)"
    - name: object_id
      type: integer
      description: "3-byte object ID"
    - name: parameter_id
      type: integer
      description: "2-byte parameter ID"
    - name: value
      type: integer
      description: "4-byte signed raw value"

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

- id: set_percent
  label: Set Parameter (Percent)
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
      description: "0-100%"

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

- id: bump_percent
  label: Bump Parameter Up/Down (Percent)
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
    - name: delta_percent
      type: number
      description: "Percentage change, positive or negative"

- id: set_string
  label: Set Parameter (String)
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
    - name: value
      type: string
      description: "Up to 32 ASCII characters with prefix length byte and 0x00 terminator"

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  params:
    - name: preset_id
      type: integer
      description: "4-byte preset ID number from Parameter Preset window"
```

## Feedbacks
```yaml
# Response messages returned by device:
- id: ack_valid
  label: Valid Checksum Acknowledgement
  description: "0x06 returned on valid serial message"

- id: ack_invalid
  label: Invalid Checksum Acknowledgement
  description: "0x15 returned on invalid serial checksum"

- id: set_response
  label: Set Response (Raw)
  description: "Returns current raw value of subscribed parameter"

- id: set_percent_response
  label: Set Response (Percent)
  description: "Returns current percent value of subscribed parameter"

- id: set_string_response
  label: Set Response (String)
  description: "Returns current string value of subscribed parameter"

# UNRESOLVED: specific Parameter ID values for конкретные parameters (gain, mute, source selector) - need full object/parameter reference from Audio Architect
```

## Variables
```yaml
# Parameter value scaling from source:
#
# Two-state (e.g. mute): raw values 0 and 1 (0% and 100%)
#
# Multi-state (e.g. source selector, input card gain): raw values 0,1,2,3,4... (0%-100%)
#
# Variable (e.g. gain, threshold, pan): logarithmic scaling
#   Gain: raw -280,617 (0% -80dB) to 100,000 (100% +10dB), unity = 0 (73.73%)
#   Scale: logarithmic -inf dB to -10dB, then linear above -10dB
#
# Meter: raw -800,000 (0% -80dB) to 400,000 (100% +40dB)
#   0dB = raw 0 (66.66%), dB value = Raw / 10,000
#
# All variable/percent parameters: Raw = percentage × 65536
#
# UNRESOLVED: конкретные parameter ID mappings - Audio Architect object browser required
```

## Events
```yaml
# Device-initiated messages (unsolicited):
# Device sends SET or SET PERCENT messages when subscribed parameter changes value
# Until UNSUBSCRIBE sent or device rebooted
#
# UNRESOLVED: specific unsolicited event types not enumerated in this source
```

## Macros
```yaml
# No explicit multi-step macros documented in this source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in this source
```

## Notes

### Message Encoding
All London DI messages: start `0x02`, end `0x03`. Last byte = single-byte XOR checksum of body before byte substitution.

### Byte Substitution
After checksum calculation, these bytes are substituted:
- `0x02` → `0x1B 0x82`
- `0x03` → `0x1B 0x83`
- `0x06` → `0x1B 0x86`
- `0x15` → `0x1B 0x95`
- `0x1B` → `0x1B 0x9B`

### Addressing Hierarchy
```
Node Address (2 bytes):  0x0001–0xFFFE (identifies physical device)
Virtual Device (1 byte): Audio=0x03, Logic=0x02
Object ID (3 bytes):      Processing object category
Parameter ID (2 bytes):   Specific parameter within object
```

### Serial vs TCP Behavior
- Serial: 0x06 ACK on valid checksum, 0x15 NAK on invalid; 1-second retransmit timeout if no ACK
- TCP: No acknowledgement (inherent reliability); leave socket open indefinitely

### Protocol Opcodes Summary
| Opcode | Message Type |
|--------|--------------|
| 0x88   | SET (raw) |
| 0x89   | SUBSCRIBE |
| 0x8A   | UNSUBSCRIBE |
| 0x8C   | RECALL PRESET |
| 0x8D   | SET PERCENT |
| 0x8E   | SUBSCRIBE PERCENT |
| 0x8F   | UNSUBSCRIBE PERCENT |
| 0x90   | BUMP PERCENT |
| 0x91   | SET STRING |

<!-- UNRESOLVED: specific model variants (BLU-50v2, BLU-100, BLU-320, etc.) — source covers general Soundweb London family only -->
<!-- UNRESOLVED: preset storage/management commands beyond RECALL PRESET -->
<!-- UNRESOLVED: firmware version compatibility -->
<!-- UNRESOLVED: configurable parameters (baud rate, port) default values not stated in source — configured via Audio Architect -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/support_downloads
  - https://help.harmanpro.com/soundweb-london-third-party-control
  - https://help.harmanpro.com/bss
retrieved_at: 2026-04-30T15:15:19.077Z
last_checked_at: 2026-06-03T06:25:35.706Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:25:35.706Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All spec actions verified against source (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model numbers (BLU-50v2, BLU-100, etc.) not listed in this source document"
- "baud rate not stated in source; configured via Audio Architect Properties window"
- "data_bits, parity, stop_bits not stated in source"
- "power commands not explicitly documented in this source"
- "routing commands not explicitly documented in this source"
- "specific Parameter ID values for конкретные parameters (gain, mute, source selector) - need full object/parameter reference from Audio Architect"
- "конкретные parameter ID mappings - Audio Architect object browser required"
- "specific unsolicited event types not enumerated in this source"
- "no safety warnings or interlock procedures in this source"
- "specific model variants (BLU-50v2, BLU-100, BLU-320, etc.) — source covers general Soundweb London family only"
- "preset storage/management commands beyond RECALL PRESET"
- "firmware version compatibility"
- "configurable parameters (baud rate, port) default values not stated in source — configured via Audio Architect"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
