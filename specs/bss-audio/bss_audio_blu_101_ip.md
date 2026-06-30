---
spec_id: admin/bss-audio-blu-101
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU 101 Control Spec"
manufacturer: "BSS Audio"
model_family: "BLU 101"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "BLU 101"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://bssaudio.com/en/support_downloads
retrieved_at: 2026-06-30T04:03:20.801Z
last_checked_at: 2026-06-30T06:55:45.535Z
generated_at: 2026-06-30T06:55:45.535Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 baud rate not stated in source (configured via Audio Architect Properties). Firmware version compatibility not stated. No power on/off, input-routing, or discrete device commands are documented in this protocol spec — DI is a generic parameter-addressing protocol."
  - "baud rate not stated in source (configured in Audio Architect Properties window)"
  - "not stated in source"
  - "no further event/notification catalogue in source."
  - "populate if companion documentation defines preset chains or sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "RS-232 serial line parameters (baud/data/parity/stop/flow) not stated — configured via Audio Architect Properties."
  - "firmware version compatibility not stated in source."
  - "exact per-message byte-frame diagrams omitted from refined source (images); validate against original DI protocol PDF before promotion."
verification:
  verdict: verified
  checked_at: 2026-06-30T06:55:45.535Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 message-type opcodes match exactly; transport parameters verified; source represents no additional commands. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU 101 Control Spec

## Summary
The BSS Audio BLU 101 is a Soundweb London networked DSP device controllable via the London Direct Inject (DI) protocol over Ethernet (TCP port 1023) and RS-232 serial. The protocol exposes two-way binary messaging to SET, GET (SUBSCRIBE), BUMP, STRING-set, and recall Parameter Presets on any processing object parameter. This spec covers the London DI message catalogue as documented for Soundweb London third-party control.

<!-- UNRESOLVED: RS-232 baud rate not stated in source (configured via Audio Architect Properties). Firmware version compatibility not stated. No power on/off, input-routing, or discrete device commands are documented in this protocol spec — DI is a generic parameter-addressing protocol. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # Soundweb London devices listen on TCP port 1023 (accept multiple connections)
serial:
  baud_rate: null  # UNRESOLVED: baud rate not stated in source (configured in Audio Architect Properties window)
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "9-pin D-type (RS-232); only pins 2, 3, 5 used"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# - queryable    (SUBSCRIBE / SUBSCRIBE PERCENT return parameter values)  # inferred from query/subscribe command examples
# - levelable    (SET PERCENT / BUMP PERCENT control parameter levels in 0-100%)  # inferred from level-control command examples
traits:
  - queryable
  - levelable
```

## Actions
```yaml
# London DI protocol. Every message starts 0x02 and ends 0x03; last body byte is a
# single-byte XOR checksum over all body bytes BEFORE byte substitution. Special
# bytes are escaped after checksum: 0x02->0x1B 0x82, 0x03->0x1B 0x83, 0x06->0x1B 0x86,
# 0x15->0x1B 0x95, 0x1B->0x1B 0x9B.
#
# Command templates below show the message-type opcode (first body byte) verbatim.
# Addressing bytes (Node Address 2B, Virtual Device 1B, Object ID 3B, Parameter ID 2B)
# and the 4-byte Value are appended per the documented message structure.
# Checksum/computed byte noted in each entry; not pre-calculated (input-dependent).

- id: set_raw
  label: SET (Raw Value)
  kind: action
  command: "0x88 {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {value(4)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes, range 0x0001-0xFFFE (1-65534)"
    - name: virt_dev
      type: byte
      description: "Virtual Device: 0x03=Audio, 0x02=Logic"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes (Mixer, EQ, Source Selector, etc.)"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes (Gain, Mute, Source, etc.)"
    - name: value
      type: int32
      description: "32-bit signed raw value"
  notes: "Sets a parameter using its raw value. Acknowledged 0x06 (serial) on valid receipt/checksum, 0x15 on invalid checksum."

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "0x8D {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {percent_value(4)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device (0x03 Audio / 0x02 Logic)"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
    - name: percent_value
      type: int32
      description: "Percentage as raw: Raw = percentage x 65536 (0-100%)"
  notes: "Sets a parameter using a percentage value."

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "0x90 {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {bump_value(4)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
    - name: bump_value
      type: int32
      description: "Bump delta as percentage value (signed; up or down)"
  notes: "Bumps the parameter up or down by a percentage value. Device does NOT return SET/SET PERCENT after each bump when subscribed; send SUBSCRIBE to read new value."

- id: set_string
  label: SET STRING
  kind: action
  command: "0x91 {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {len_prefix} {ascii_string(<=32)} 0x00 {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
    - name: len_prefix
      type: byte
      description: "Prefix byte specifying number of bytes in string"
    - name: ascii_string
      type: string
      description: "Up to 32 ASCII characters"
  notes: "Sets a parameter using a string of up to 32 ASCII characters; value must include length prefix and 0x00 termination suffix."

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x8C {preset_id(4)} {xor_checksum}"
  params:
    - name: preset_id
      type: int32
      description: "Parameter Preset ID number (4 bytes), shown in Parameter Preset window"
  notes: "Recalls a Soundweb London Parameter Preset using its Preset ID. Single message, no addressing used. Cannot subscribe to a Parameter Preset."

- id: subscribe
  label: SUBSCRIBE
  kind: query
  command: "0x89 {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
  notes: "Subscribes to a parameter. Returns the current value immediately as a SET (or SET STRING) message, then a SET message on every subsequent value change until UNSUBSCRIBE or device reboot."

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "0x8E {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
  notes: "Subscribes to a parameter. Returns current value as SET PERCENT, then SET PERCENT on subsequent changes until UNSUBSCRIBE PERCENT or reboot."

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "0x8A {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
  notes: "Unsubscribes from a parameter; stops returning SET messages."

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "0x8F {node_addr(2)} {virt_dev(1)} {object_id(3)} {param_id(2)} {xor_checksum}"
  params:
    - name: node_addr
      type: bytes
      description: "Node Address, 2 bytes"
    - name: virt_dev
      type: byte
      description: "Virtual Device"
    - name: object_id
      type: bytes
      description: "Object ID, 3 bytes"
    - name: param_id
      type: bytes
      description: "Parameter ID, 2 bytes"
  notes: "Unsubscribes from a parameter; stops returning SET PERCENT messages."
```

## Feedbacks
```yaml
# Serial RS-232 acknowledgement bytes (not used on Ethernet/TCP - TCP is reliable):
- id: serial_ack
  type: byte
  values: ["0x06"]
  description: "Positive acknowledgement; confirms receipt and valid checksum (serial only)."

- id: serial_nak
  type: byte
  values: ["0x15"]
  description: "Negative acknowledgement; checksum invalid (serial only)."

# Subscription responses (unsolicited inbound SET / SET PERCENT messages):
- id: set_response
  type: message
  description: "SET message returned by device carrying a parameter's current raw value (on SUBSCRIBE and on subscribed value changes)."

- id: set_percent_response
  type: message
  description: "SET PERCENT message returned by device carrying a parameter's current percentage value (on SUBSCRIBE PERCENT and on subscribed value changes)."

- id: set_string_response
  type: message
  description: "SET STRING message returned by device for string parameters (on SUBSCRIBE)."
```

## Variables
```yaml
# Documented raw-value scaling laws (parameter classes). Provided as reference;
# concrete per-parameter IDs are design-specific and not enumerated in the source.
- id: gain_parameter
  type: int32
  range_min: -280617   # 0% = -80 dB
  range_max: 100000    # 100% = +10 dB
  notes: "Logarithmic from -inf dB to -10 dB, linear above -10 dB. Unity gain = 0 (73.73%)."

- id: meter_parameter
  type: int32
  range_min: -800000   # 0% = -80 dB
  range_max: 400000    # 100% = +40 dB
  notes: "Linear scale. 0 dB = 0 (66.66%). dB value = Raw / 10000."

- id: two_state_parameter
  type: int32
  values: [0, 1]
  notes: "e.g. mute: 0 = 0%, 1 = 100%."

- id: percent_value
  type: int32
  notes: "Raw = percentage x 65536. Range always 0-100%."
```

## Events
```yaml
# Unsolicited SET / SET PERCENT messages pushed by the device for subscribed
# parameters on value change are documented (see Feedbacks). No other event
# classes documented.
# UNRESOLVED: no further event/notification catalogue in source.
```

## Macros
```yaml
# No multi-step sequences explicitly documented in source.
# UNRESOLVED: populate if companion documentation defines preset chains or sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. None inferred.
```

## Notes
- Soundweb London devices are always listening; no enable step required for third-party control.
- Crown, JBL, AKG devices do NOT respond to the London DI protocol (per source).
- BLU-Link, Dante, CobraNet, AVB connections are NOT used for any form of control.
- Control messages can be broadcast to single or multiple Soundweb devices; messages for other devices are auto-forwarded over the network.
- Serial behaviour: if 0x06/0x15 not received within 1 second, the Soundweb re-transmits the message (only when acknowledgement-wait is enabled in Audio Architect Properties).
- Ethernet behaviour: acknowledgements are NOT used on TCP (TCP provides reliability); a controller normally opens a socket and leaves it open indefinitely.
- Addressing is hierarchical: Node Address (2B) → Virtual Device (1B: 0x03 Audio, 0x02 Logic) → Object ID (3B) → Parameter ID (2B). These are read from Audio Architect Venue Explorer / Properties / Room view.
- Byte substitution is applied AFTER checksum calculation and increases message length; special bytes 0x02/0x03/0x06/0x15/0x1B must be escaped per the documented table.
- Message-structure diagrams in the source were image-only (`==> picture ... intentionally omitted <==`); exact byte layouts for SET / SET STRING / UNSUBSCRIBE / PARAMETER PRESET RECALL frames are therefore not fully recoverable from the refined text. See `derived_from: vendor_manual` — consult the original London Direct Inject protocol PDF for frame diagrams.

<!-- UNRESOLVED: RS-232 serial line parameters (baud/data/parity/stop/flow) not stated — configured via Audio Architect Properties. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: exact per-message byte-frame diagrams omitted from refined source (images); validate against original DI protocol PDF before promotion. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://bssaudio.com/en/site_elements/soundweb-london-di-kit
  - https://bssaudio.com/en/support_downloads
retrieved_at: 2026-06-30T04:03:20.801Z
last_checked_at: 2026-06-30T06:55:45.535Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-30T06:55:45.535Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 message-type opcodes match exactly; transport parameters verified; source represents no additional commands. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 baud rate not stated in source (configured via Audio Architect Properties). Firmware version compatibility not stated. No power on/off, input-routing, or discrete device commands are documented in this protocol spec — DI is a generic parameter-addressing protocol."
- "baud rate not stated in source (configured in Audio Architect Properties window)"
- "not stated in source"
- "no further event/notification catalogue in source."
- "populate if companion documentation defines preset chains or sequences."
- "source contains no safety warnings, interlock procedures, or"
- "RS-232 serial line parameters (baud/data/parity/stop/flow) not stated — configured via Audio Architect Properties."
- "firmware version compatibility not stated in source."
- "exact per-message byte-frame diagrams omitted from refined source (images); validate against original DI protocol PDF before promotion."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
