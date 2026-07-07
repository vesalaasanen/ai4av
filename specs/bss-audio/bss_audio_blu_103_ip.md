---
spec_id: admin/bss-audio-blu-103
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-103 Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-103
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-103
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/support_downloads
retrieved_at: 2026-06-30T18:53:41.233Z
last_checked_at: 2026-07-07T11:05:56.671Z
generated_at: 2026-07-07T11:05:56.671Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 baud rate, data bits, parity, stop bits not stated in source (configured in Audio Architect Properties window). Voltage/current/power specs not covered. Device-specific parameter ID catalog not present in this protocol doc."
  - "baud rate configured in Audio Architect Properties window, not stated"
  - "not stated in source"
  - "no multi-step sequences described explicitly in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "RS-232 serial line config (baud/data/parity/stop/flow) — set in Audio Architect Properties window, not in protocol doc."
  - "firmware version compatibility range not stated."
  - "device-specific parameter ID catalog (which Object IDs / Parameter IDs exist on BLU-103) — not in this protocol doc; needs device configuration export or DI Kit full reference."
  - "exact byte layout of each message structure shown only as embedded images (omitted from refined text) — SET/SUBSCRIBE/SUBSCRIBE_PERCENT/BUMP_PERCENT share one layout, SET STRING variable-length, UNSUBSCRIBE/UNSUBSCRIBE_PERCENT shorter, PRESET RECALL shortest. Field order reconstructed from addressing+value spec."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:05:56.671Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 DI protocol message opcodes matched literally; addressing and value structure confirmed; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-103 Control Spec

## Summary
Soundweb London fixed-I/O DSP device controlled via the London Direct Inject (DI) protocol over Ethernet (TCP port 1023) or serial RS-232 (9-pin D-type, pins 2/3/5). The DI protocol provides two-way set/get/subscribe access to any device parameter (gain, mute, source selector, etc.) and parameter-preset recall. Message framing uses 0x02 start / 0x03 end with XOR checksum and byte-substitution escaping.

<!-- UNRESOLVED: RS-232 baud rate, data bits, parity, stop bits not stated in source (configured in Audio Architect Properties window). Voltage/current/power specs not covered. Device-specific parameter ID catalog not present in this protocol doc. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # "Soundweb London devices listen on TCP port 1023 and will accept multiple connections"
serial:
  baud_rate: null  # UNRESOLVED: baud rate configured in Audio Architect Properties window, not stated
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "9-pin D-type, pins 2/3/5 only"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT / raw gain parameters documented
  - presets  # inferred: PARAMETER PRESET RECALL message type documented
```

## Actions
```yaml
# All 9 documented DI message-type opcodes. Each opcode is one action per
# granularity rule (source lists each as a distinct row).
# Framing: every message starts 0x02, ends 0x03, last body byte = XOR checksum
# of all preceding body bytes (computed BEFORE byte substitution).
# Byte substitution (applied AFTER checksum): 0x02->0x1B 0x82, 0x03->0x1B 0x83,
# 0x06->0x1B 0x86, 0x15->0x1B 0x95, 0x1B->0x1B 0x9B.
# Address layout: Node Address (2B) | Virtual Device (1B: Audio 0x03 / Logic 0x02)
# | Object ID (3B) | Parameter ID (2B). Value = 4 bytes (32-bit signed) except
# SET STRING (up to 32 ASCII bytes prefixed with length, suffix 0x00).

- id: set_raw
  label: Set Parameter (Raw)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE (physical device)
    - name: virtual_device
      type: integer
      description: "Processing category - Audio 0x03, Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID (Mixer, EQ, Source Selector, etc.)
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID (Gain, Mute, Source, etc.)
    - name: value
      type: integer
      description: "4-byte signed raw value (scaling per param type: two-state 0/1, multi-state 0..N, gain -280617..100000, meter -800000..400000)"
  notes: "Raw = percentage x 65536. Two-state uses 0/1. Gain unity = 0 (log -inf..-10dB, linear above)."

- id: set_percent
  label: Set Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
    - name: percent
      type: number
      description: "0-100 percent (encoded Raw = percent x 65536)"
  notes: Percentage form - range always 0-100%.

- id: set_string
  label: Set Parameter (String)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {length} {ascii_bytes...} 0x00 {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
    - name: string_value
      type: string
      description: Up to 32 ASCII characters; prefix byte = length, suffix 0x00
  notes: String parameter values use length-prefix + 0x00 terminator.

- id: bump_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {val_1} {val_2} {val_3} {val_4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
    - name: delta
      type: number
      description: Signed percentage delta (up or down)
  notes: "BUMP does NOT trigger subscribed SET/SET PERCENT notifications - must re-SUBSCRIBE to read new value."

- id: subscribe
  label: Subscribe to Parameter (Raw)
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
  notes: "Returns current value immediately as SET or SET STRING, then on every change until UNSUBSCRIBE or reboot."

- id: subscribe_percent
  label: Subscribe to Parameter (Percent)
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
  notes: Returns SET PERCENT messages on value changes.

- id: unsubscribe
  label: Unsubscribe from Parameter (Raw)
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
  notes: Stops SET/SET STRING notifications for the parameter.

- id: unsubscribe_percent
  label: Unsubscribe from Parameter (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virt_dev} {obj_1} {obj_2} {obj_3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001-0xFFFE
    - name: virtual_device
      type: integer
      description: "Audio 0x03 / Logic 0x02"
    - name: object_id
      type: integer
      description: 3-byte Processing Object ID
    - name: parameter_id
      type: integer
      description: 2-byte Parameter ID
  notes: Stops SET PERCENT notifications for the parameter.

- id: recall_parameter_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_id_1} {preset_id_2} {preset_id_3} {preset_id_4} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: 4-byte Preset ID (displayed in Parameter Preset window); used as Value field, no addressing
  notes: "Single message, no addressing. Cannot subscribe to a Parameter Preset."
```

## Feedbacks
```yaml
# Acknowledgement bytes for serial RS-232 only. TCP uses no ack (TCP reliable).
- id: serial_ack
  type: enum
  values: [ack, nak]
  description: "0x06 = checksum valid / receipt confirmed. 0x15 = checksum invalid."

# Parameter-value updates pushed by device for subscribed params.
- id: set_notification
  type: raw
  description: "SET message returned for a SUBSCRIBE (raw value form). Immediate value + subsequent changes."

- id: set_percent_notification
  type: raw
  description: "SET PERCENT message returned for a SUBSCRIBE PERCENT. Immediate value + subsequent changes."

- id: set_string_notification
  type: string
  description: "SET STRING message returned for a SUBSCRIBE on a string parameter."
```

## Variables
```yaml
# Addressing components identifying the target object/parameter. Not settable
# via DI protocol themselves - resolved per-message at runtime by controller.
# No standalone settable variables documented beyond parameter SET commands above.
```

## Events
```yaml
# Unsolicited notifications:
# - SET / SET PERCENT / SET STRING messages pushed by device on subscribed
#   parameter value changes (until UNSUBSCRIBE or device reboot).
# No other unsolicited event types documented.
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
# power-on sequencing requirements. Protocol-level only.
```

## Notes
- Protocol is **London Direct Inject (DI)** — applies to all Soundweb London devices, not BLU-103-specific. Crown, JBL, AKG devices explicitly do NOT respond.
- BLU-Link, Dante, CobraNet, AVB are audio/network transports only — **not used for control**.
- Ethernet: TCP port 1023, multiple simultaneous connections accepted. Socket normally held open indefinitely. No app-layer ack (TCP reliability).
- Serial RS-232: 9-pin D-type, **pins 2, 3, 5 only**. Ack required: 0x06 = good, 0x15 = bad checksum. Device re-transmits if no ack within 1 second. Ack behaviour and baud rate configured in Audio Architect Properties window.
- All messages: start 0x02, end 0x03. Checksum = single-byte XOR of all body bytes (before substitution). Byte substitution applied AFTER checksum: 0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B. Substitution increases message length.
- Address hierarchy: Node Address (2B, 0x0001–0xFFFE) → Virtual Device (1B: Audio 0x03 / Logic 0x02) → Object ID (3B) → Parameter ID (2B). All discoverable in Audio Architect Venue Explorer / Properties / Room view.
- Value scaling: two-state 0/1; multi-state 0..N discrete; variable gain -280617 (−80dB) to +100000 (+10dB), unity = 0 (log below −10dB, linear above); meter -800000 (−80dB) to +400000 (+40dB), 0dB = 0, dB = Raw/10000; percent = Raw/65536.
- BUMP PERCENT does **not** fire subscribed notifications — controller must re-SUBSCRIBE to read the new value.
- String params: max 32 ASCII bytes, length-prefixed, 0x00 terminator.

<!-- UNRESOLVED: RS-232 serial line config (baud/data/parity/stop/flow) — set in Audio Architect Properties window, not in protocol doc. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: device-specific parameter ID catalog (which Object IDs / Parameter IDs exist on BLU-103) — not in this protocol doc; needs device configuration export or DI Kit full reference. -->
<!-- UNRESOLVED: exact byte layout of each message structure shown only as embedded images (omitted from refined text) — SET/SUBSCRIBE/SUBSCRIBE_PERCENT/BUMP_PERCENT share one layout, SET STRING variable-length, UNSUBSCRIBE/UNSUBSCRIBE_PERCENT shorter, PRESET RECALL shortest. Field order reconstructed from addressing+value spec. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/support_downloads
retrieved_at: 2026-06-30T18:53:41.233Z
last_checked_at: 2026-07-07T11:05:56.671Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:05:56.671Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 DI protocol message opcodes matched literally; addressing and value structure confirmed; transport parameters verified. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 baud rate, data bits, parity, stop bits not stated in source (configured in Audio Architect Properties window). Voltage/current/power specs not covered. Device-specific parameter ID catalog not present in this protocol doc."
- "baud rate configured in Audio Architect Properties window, not stated"
- "not stated in source"
- "no multi-step sequences described explicitly in source."
- "source contains no safety warnings, interlock procedures, or"
- "RS-232 serial line config (baud/data/parity/stop/flow) — set in Audio Architect Properties window, not in protocol doc."
- "firmware version compatibility range not stated."
- "device-specific parameter ID catalog (which Object IDs / Parameter IDs exist on BLU-103) — not in this protocol doc; needs device configuration export or DI Kit full reference."
- "exact byte layout of each message structure shown only as embedded images (omitted from refined text) — SET/SUBSCRIBE/SUBSCRIBE_PERCENT/BUMP_PERCENT share one layout, SET STRING variable-length, UNSUBSCRIBE/UNSUBSCRIBE_PERCENT shorter, PRESET RECALL shortest. Field order reconstructed from addressing+value spec."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
