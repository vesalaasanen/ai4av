---
spec_id: admin/bss-blu-v1-4
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Soundweb London Control Spec"
manufacturer: BSS
model_family: BLU-100
aliases: []
compatible_with:
  manufacturers:
    - BSS
  models:
    - BLU-100
    - BLU-101
    - BLU-102
    - BLU-103
    - BLU-120
    - BLU-121
    - BLU-122
    - BLU-123
    - BLU-160
    - BLU-320
    - BLU-325
    - BLU-326
    - BLU-600
    - BLU-800
    - BLU-805
    - BLU-806
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:34:55.903Z
last_checked_at: 2026-06-02T21:41:07.927Z
generated_at: 2026-06-02T21:41:07.927Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BLU-Link, Dante, CobraNet, AVB are explicitly not used for control; firmware version not stated."
  - "baud rate not stated in source; configurable via Audio Architect Properties window"
  - "not stated in source"
  - "source does not document any multi-step sequences or panel macros."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:41:07.927Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions (9 message types + 2 serial acknowledgement codes) match verbatim in source; transport parameters verified or properly marked UNRESOLVED. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# BSS Soundweb London Control Spec

## Summary
This spec covers control of BSS Soundweb London family devices via the London Direct Inject protocol. Two transports are supported: TCP (port 1023) and RS-232 (9-pin D-type, pins 2/3/5). Messages are framed with start byte 0x02, end byte 0x03, and a trailing single-byte XOR checksum of the body. The protocol offers set / subscribe / unsubscribe / bump / recall-preset operations on any device parameter or meter.

<!-- UNRESOLVED: BLU-Link, Dante, CobraNet, AVB are explicitly not used for control; firmware version not stated. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  connector: "9-pin D-type"   # source states pins 2, 3, 5 only are used
  pins_used: [2, 3, 5]
  baud_rate: null  # UNRESOLVED: baud rate not stated in source; configurable via Audio Architect Properties window
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null     # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # inferred: power state is a settable/queryable parameter in the Soundweb object model
- routable  # inferred: source-selector processing objects are explicitly addressed by Object ID
- queryable  # inferred: SUBSCRIBE / GET message types documented
- levelable  # inferred: gain, threshold, pan parameters documented with specific scaling laws
```

## Actions
```yaml
- id: set_parameter_raw
  label: Set Parameter (Raw Value)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {val_b3} {val_b2} {val_b1} {val_b0} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
      description: Node Address (0x0001 to 0xFFFE)
    - name: virtual_device
      type: integer
      description: Virtual Device byte (0x03 Audio, 0x02 Logic)
    - name: object_id
      type: integer
      description: Processing Object ID (3 bytes, big-endian)
    - name: parameter_id
      type: integer
      description: Parameter ID within the object (2 bytes, big-endian)
    - name: value
      type: integer
      description: 32-bit signed raw value (big-endian)
  notes: |
    Message Type 0x88. Body bytes 2..N-1 (between start 0x02 and trailing XOR + end 0x03) are XOR'd
    to produce the checksum. Apply byte substitution to the body before transmitting: 0x02→0x1B 0x82,
    0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B.

- id: subscribe_parameter
  label: Subscribe (Raw)
  kind: action
  command: "0x02 0x89 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: |
    Message Type 0x89. Returns SET or SET STRING messages on value change until UNSUBSCRIBE or reboot.
    Source figure groups SET / SUBSCRIBE / SUBSCRIBE PERCENT / BUMP PERCENT into one structural diagram
    (diagram intentionally omitted from refined source).

- id: unsubscribe_parameter
  label: Unsubscribe (Raw)
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: Message Type 0x8A. Stops returning SET messages for the subscribed parameter.

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_id_b3} {preset_id_b2} {preset_id_b1} {preset_id_b0} {xor} 0x03"
  params:
    - name: preset_id
      type: integer
      description: Parameter Preset ID number (4 bytes, big-endian)
  notes: |
    Message Type 0x8C. No addressing; preset ID is the entire value payload.
    Subscribing to a Parameter Preset is not supported by the protocol.

- id: set_parameter_percent
  label: Set Parameter (Percent)
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {pct_b3} {pct_b2} {pct_b1} {pct_b0} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: percent
      type: number
      description: 0-100 percentage (fractions allowed); raw = percent × 65536
  notes: Message Type 0x8D.

- id: subscribe_parameter_percent
  label: Subscribe (Percent)
  kind: action
  command: "0x02 0x8E {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: Message Type 0x8E. Returns SET PERCENT messages on value change.

- id: unsubscribe_parameter_percent
  label: Unsubscribe (Percent)
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
  notes: Message Type 0x8F.

- id: bump_parameter_percent
  label: Bump Parameter (Percent)
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {pct_b3} {pct_b2} {pct_b1} {pct_b0} {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: delta_percent
      type: number
      description: Signed percentage delta
  notes: |
    Message Type 0x90. Bumps the parameter up or down by the given percentage.
    Device will NOT auto-return SET / SET PERCENT after every bump; re-subscribe to read the new value.

- id: set_parameter_string
  label: Set Parameter (String)
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {vdev} {obj_id_hi} {obj_id_mid} {obj_id_lo} {param_id_hi} {param_id_lo} {len} {ascii_bytes...} 0x00 {xor} 0x03"
  params:
    - name: node_addr
      type: integer
    - name: virtual_device
      type: integer
    - name: object_id
      type: integer
    - name: parameter_id
      type: integer
    - name: value
      type: string
      description: Up to 32 ASCII characters
  notes: |
    Message Type 0x91. Value field is a single length byte followed by ASCII bytes and a 0x00 terminator.

- id: serial_ack
  label: Serial ACK (received from device)
  kind: feedback
  command: "0x06"
  notes: Acknowledges a correctly framed message with valid checksum on the RS-232 port.

- id: serial_nack
  label: Serial NACK (received from device)
  kind: feedback
  command: "0x15"
  notes: Returned when the checksum is invalid. Device will re-transmit if 0x06 / 0x15 not received within 1 second (only when ack-wait is enabled in Audio Architect Properties).
```

## Feedbacks
```yaml
- id: subscribed_value_raw
  type: object
  description: SET message (0x88) returned on value change of a subscribed parameter. Carries the new 4-byte raw value.
- id: subscribed_value_percent
  type: object
  description: SET PERCENT message (0x8D) returned on value change of a percent-subscribed parameter. Carries the new 4-byte percent value.
- id: subscribed_value_string
  type: object
  description: SET STRING message (0x91) returned for subscribed string parameters. Length byte + ASCII + 0x00 terminator.
- id: serial_ack
  type: enum
  values: [0x06, 0x15]
  description: Acknowledgement byte returned on RS-232. 0x06 = receipt + checksum OK. 0x15 = checksum invalid.
```

## Variables
```yaml
# All device parameters are exposed through the generic SET / SUBSCRIBE / BUMP actions above.
# Specific parameter instances (gain, mute, source-select, threshold, pan, meter, etc.) are
# identified by their {node_addr, virtual_device, object_id, parameter_id} tuple.
- name: virtual_device_audio
  value: 0x03
  description: Virtual Device byte identifying Audio processing objects
- name: virtual_device_logic
  value: 0x02
  description: Virtual Device byte identifying Logic processing objects
- name: gain_raw_min
  value: -280617
  description: Gain parameter raw value at 0% (-80 dB). Scale is logarithmic from -inf to -10 dB, linear above.
- name: gain_raw_unity
  value: 0
  description: Gain parameter raw value at unity (0 dB). Corresponds to 73.73%.
- name: gain_raw_max
  value: 100000
  description: Gain parameter raw value at 100% (+10 dB)
- name: meter_raw_min
  value: -800000
  description: Meter raw value at 0% (-80 dB)
- name: meter_raw_zero
  value: 0
  description: Meter raw value at 0 dB (66.66%)
- name: meter_raw_max
  value: 400000
  description: Meter raw value at 100% (+40 dB). Scale is linear; dB = raw / 10000.
- name: percent_to_raw_multiplier
  value: 65536
  description: Raw = percent × 65536
- name: node_addr_min
  value: 0x0001
  description: Minimum Node Address (1 decimal)
- name: node_addr_max
  value: 0xFFFE
  description: Maximum Node Address (65,534 decimal)
- name: string_param_max_length
  value: 32
  description: Maximum length of a string parameter value in ASCII bytes (excludes length-prefix and 0x00 terminator)
```

## Events
```yaml
# The protocol is request/response only (with subscription-driven unsolicited updates). The
# following are the unsolicited updates a subscribed parameter produces:
- id: subscribed_set
  description: Returned when a raw-subscribed parameter changes value. Same message shape as set_parameter_raw.
- id: subscribed_set_percent
  description: Returned when a percent-subscribed parameter changes value. Same shape as set_parameter_percent.
- id: subscribed_set_string
  description: Returned when a string-subscribed parameter changes value.
- id: serial_retransmit
  description: Device re-transmits the last message if 0x06 / 0x15 is not received within 1 second (only when ack-wait enabled in Audio Architect Properties).
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences or panel macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing
# requirements beyond general network/serial cabling guidance.
```

## Notes
- All Soundweb London devices listen on TCP port 1023 and accept multiple simultaneous connections.
- BLU-Link, Dante, CobraNet, and AVB are explicitly NOT used for control; only the 100 Mb/s RJ-45 control port and the 9-pin D-type serial port carry control traffic.
- Serial messages acknowledged with 0x06 (good) or 0x15 (bad checksum). Ethernet uses TCP reliability instead — no application-layer acknowledgement.
- A third-party controller typically opens a TCP socket and leaves it open indefinitely.
- Messages framed as `0x02 <body> <xor_checksum> 0x03`. The checksum is a single-byte XOR of all body bytes (BEFORE byte substitution).
- Byte substitution is applied to the body AFTER checksum calculation and INCREASES the message length. Substitutions: 0x02→0x1B 0x82, 0x03→0x1B 0x83, 0x06→0x1B 0x86, 0x15→0x1B 0x95, 0x1B→0x1B 0x9B.
- Soundweb devices automatically forward messages destined for other Soundweb devices on the network.
- After BUMP PERCENT, the device will NOT send SET / SET PERCENT updates on a subscribed parameter — a fresh SUBSCRIBE is required to read the new value.
- Baud rate and acknowledgement-on-serial-transmit settings are configured in the Audio Architect Properties window; the document does not state defaults.
- Crown, JBL, and AKG devices do not respond to the London Direct Inject protocol.
- String parameter values: up to 32 ASCII bytes, length-prefix byte + ASCII + 0x00 terminator.
- Multi-state parameters (e.g. source selector, input-card gain) use discrete raw values 0, 1, 2, 3, ... each mapping to a uniform percent of the range.
- Two-state parameters (e.g. mute) use values 0 and 1 only (0% and 100%).
- Variable parameters (gain, threshold, pan, meters) use device-specific scaling laws — gain is logarithmic below -10 dB and linear above; meters are linear with dB = raw / 10,000.
- The Parameter Preset ID used by recall_preset is displayed in the Parameter Preset window in Audio Architect.
- Node Address, Virtual Device, and Object ID for each processing object are displayed in the Audio Architect Properties window and Venue Explorer; Parameter IDs are displayed in Venue Explorer.
- Source figure grouping: SET / SUBSCRIBE / SUBSCRIBE PERCENT / BUMP PERCENT share one structural diagram (intentionally omitted from refined source); UNSUBSCRIBE / UNSUBSCRIBE PERCENT share a shorter diagram; PARAMETER PRESET RECALL has the smallest diagram (no addressing fields).

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:34:55.903Z
last_checked_at: 2026-06-02T21:41:07.927Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:41:07.927Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions (9 message types + 2 serial acknowledgement codes) match verbatim in source; transport parameters verified or properly marked UNRESOLVED. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BLU-Link, Dante, CobraNet, AVB are explicitly not used for control; firmware version not stated."
- "baud rate not stated in source; configurable via Audio Architect Properties window"
- "not stated in source"
- "source does not document any multi-step sequences or panel macros."
- "source contains no safety warnings, interlock procedures, or power-on sequencing"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
