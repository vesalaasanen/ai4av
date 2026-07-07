---
spec_id: admin/bss-audio-blu-si
schema_version: ai4av-public-spec-v1
revision: 1
title: "BSS Audio BLU-Si Control Spec"
manufacturer: "BSS Audio"
model_family: BLU-Si
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - BLU-Si
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
  - https://help.harmanpro.com/en_US/soundweb-london-using-the-ethernet-trigger-and-serial-trigger-logic-objects
  - https://help.harmanpro.com/en_US/bss
retrieved_at: 2026-06-30T18:58:08.457Z
last_checked_at: 2026-07-07T11:07:18.707Z
generated_at: 2026-07-07T11:07:18.707Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full byte-by-byte frame layout diagrams were picture-only in the source and omitted; field sizes are documented but exact byte ordering within each frame is inferred from the Addressing section ordering (Node, Virtual Device, Object ID, Parameter ID, Value)."
  - "baud rate is configured in Audio Architect Properties window, not stated"
  - "not stated"
  - "device may emit additional status; none documented in source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "exact byte-by-byte layout of each frame was shown only as embedded pictures in the source (omitted here); field order in templates above is inferred from the Addressing section's documented ordering."
  - "serial port configuration (baud/data/parity/stop) not stated in source — only \"found in Audio Architect Properties window\"."
  - "firmware version compatibility not stated in source."
  - "protocol version number not stated in source."
verification:
  verdict: verified
  checked_at: 2026-07-07T11:07:18.707Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All nine spec actions match opcodes in the source; transport parameters (port 1023, TCP/serial protocols) verified verbatim; no undocumented commands in source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# BSS Audio BLU-Si Control Spec

## Summary
The BSS Audio BLU-Si is a Soundweb London DSP device controllable via the London Direct Inject (DI) protocol over Ethernet (TCP) or serial RS-232. This spec covers the binary DI message set used to set, subscribe, bump, and recall parameter values and presets on any Soundweb London processing object. Crown, JBL, and AKG devices do not respond to this protocol.

<!-- UNRESOLVED: full byte-by-byte frame layout diagrams were picture-only in the source and omitted; field sizes are documented but exact byte ordering within each frame is inferred from the Addressing section ordering (Node, Virtual Device, Object ID, Parameter ID, Value). -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # Soundweb London listens on TCP 1023, accepts multiple connections
serial:
  baud_rate: null  # UNRESOLVED: baud rate is configured in Audio Architect Properties window, not stated
  data_bits: null  # UNRESOLVED: not stated
  parity: null  # UNRESOLVED: not stated
  stop_bits: null  # UNRESOLVED: not stated
  flow_control: none  # inferred: 9-pin D-type uses only pins 2,3,5 (TX/RX/GND)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable  # inferred: SUBSCRIBE / SUBSCRIBE PERCENT return parameter values
  - levelable  # inferred: SET PERCENT / BUMP PERCENT operate on percentage ranges
```

## Actions
```yaml
# All frames share framing: 0x02 start byte, 0x03 end byte, single-byte XOR
# checksum of all body bytes (computed BEFORE byte substitution). After checksum
# is calculated, byte substitution is applied to the body per the substitution
# table below (0x02->0x1B 0x82, 0x03->0x1B 0x83, 0x06->0x1B 0x86,
# 0x15->0x1B 0x95, 0x1B->0x1B 0x9B). Templates below show PRE-substitution form.
#
# Addressing fields (common to addressed messages):
#   node       : 2 bytes, physical device, range 0x0001..0xFFFE
#   virt_dev   : 1 byte, processing category (Audio 0x03, Logic 0x02)
#   object_id  : 3 bytes, processing object (Mixer, EQ, Source Selector, ...)
#   param_id   : 2 bytes, parameter within object (Gain, Mute, Source, ...)
#   value      : 4 bytes (32-bit signed) for non-string; string payload for SET STRING

- id: set_raw
  label: SET (raw value)
  kind: action
  command: "0x02 0x88 {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001..0xFFFE
    - name: virt_dev
      type: integer
      description: Virtual Device byte (0x03 Audio, 0x02 Logic)
    - name: object_id
      type: integer
      description: 3-byte Object ID
    - name: param_id
      type: integer
      description: 2-byte Parameter ID
    - name: value
      type: integer
      description: 4-byte (32-bit signed) raw value

- id: set_percent
  label: SET PERCENT
  kind: action
  command: "0x02 0x8D {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 0x03"
  params:
    - name: node
      type: integer
      description: Node Address 0x0001..0xFFFE
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer
    - name: percent
      type: number
      description: Percentage 0..100 (raw = percent x 65536)

- id: bump_percent
  label: BUMP PERCENT
  kind: action
  command: "0x02 0x90 {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {val_b1} {val_b2} {val_b3} {val_b4} {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer
    - name: delta
      type: integer
      description: Signed percentage delta to bump up/down
  notes:
    - BUMP PERCENT does not trigger SET/SET PERCENT subscription updates; a fresh SUBSCRIBE is required to read the new value.

- id: set_string
  label: SET STRING
  kind: action
  command: "0x02 0x91 {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {length} {ascii_bytes..32} 0x00 {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer
    - name: text
      type: string
      description: Up to 32 ASCII characters; length prefix and 0x00 terminator appended

- id: subscribe
  label: SUBSCRIBE (raw)
  kind: query
  command: "0x02 0x89 {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer
  notes:
    - Returns current value immediately as a SET (or SET STRING) message; further updates sent on change until UNSUBSCRIBE or device reboot.

- id: subscribe_percent
  label: SUBSCRIBE PERCENT
  kind: query
  command: "0x02 0x8E {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer
  notes:
    - Returns current value as a SET PERCENT message; further SET PERCENT updates on change until UNSUBSCRIBE PERCENT or reboot.

- id: unsubscribe
  label: UNSUBSCRIBE
  kind: action
  command: "0x02 0x8A {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer

- id: unsubscribe_percent
  label: UNSUBSCRIBE PERCENT
  kind: action
  command: "0x02 0x8F {node_hi} {node_lo} {virt_dev} {obj_b1} {obj_b2} {obj_b3} {param_hi} {param_lo} {checksum} 0x03"
  params:
    - name: node
      type: integer
    - name: virt_dev
      type: integer
    - name: object_id
      type: integer
    - name: param_id
      type: integer

- id: recall_preset
  label: Recall Parameter Preset
  kind: action
  command: "0x02 0x8C {preset_b1} {preset_b2} {preset_b3} {preset_b4} {checksum} 0x03"
  params:
    - name: preset_id
      type: integer
      description: 4-byte Preset ID (as shown in Parameter Preset window)
  notes:
    - No addressing used; preset ID is the 4-byte value. Parameter Presets cannot be subscribed to.
```

## Feedbacks
```yaml
# Subscription responses returned by the device (unsolicited after subscribe):
- id: set_response
  type: raw
  description: SET message returned from a SUBSCRIBE, carrying the 4-byte raw value of the subscribed parameter
- id: set_percent_response
  type: raw
  description: SET PERCENT message returned from a SUBSCRIBE PERCENT, carrying the 4-byte percentage value
- id: set_string_response
  type: string
  description: SET STRING message returned from a SUBSCRIBE to a string parameter, up to 32 ASCII bytes
```

## Variables
```yaml
# Parameter value semantics documented by the source (per parameter type):
- name: two_state
  type: enum
  values: [0, 1]
  description: e.g. mute; 0 = 0%, 1 = 100%
- name: multi_state
  type: enum
  values: [0, 1, 2, 3, 4]
  description: e.g. source selector, input card gain; discrete values 0..N depending on enumeration count
- name: gain_raw
  type: integer
  range: [-280617, 100000]
  description: Gain parameter raw value; -280617 = -80dB (0%), 0 = unity, 100000 = +10dB (100%). Log scale -inf..-10dB, linear above -10dB.
- name: meter_raw
  type: integer
  range: [-800000, 400000]
  description: Meter raw value; -800000 = -80dB (0%), 0 = 0dB (66.66%), 400000 = +40dB (100%). Linear scale. dB = raw / 10000.
- name: percent_value
  type: number
  range: [0, 100]
  description: Percentage representation; raw = percent x 65536
```

## Events
```yaml
# No explicit unsolicited events documented. Subscription-driven SET / SET PERCENT
# messages are the only push mechanism (see Feedbacks).
# UNRESOLVED: device may emit additional status; none documented in source.
```

## Macros
```yaml
# No multi-step sequences explicitly described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- Protocol name: London Direct Inject (DI). Applies to all Soundweb London devices; does NOT apply to Crown, JBL, AKG devices.
- Soundweb London devices are always listening; no enable step required for third-party control.
- Control over BLU-Link, Dante, CobraNet, AVB is not supported — Ethernet RJ-45 (100Mb/s) and RS-232 (9-pin D, pins 2/3/5) only.
- Message structure is identical for Ethernet and serial.
- **Serial acknowledgement**: device returns `0x06` on valid receipt+checksum, `0x15` on invalid checksum. Device may be configured to wait for ack on its own transmissions; retransmits after 1s if neither received. Ack config and baud rate live in Audio Architect Properties window.
- **Ethernet/TCP**: no application-level ack (TCP is reliable); client normally opens socket and holds it open indefinitely. Multiple TCP connections accepted.
- **Framing**: every message starts `0x02`, ends `0x03`, last body byte before `0x03` is single-byte XOR checksum of all body bytes.
- **Byte substitution** (applied AFTER checksum, increases message length):
  - `0x02` -> `0x1B 0x82`
  - `0x03` -> `0x1B 0x83`
  - `0x06` -> `0x1B 0x86`
  - `0x15` -> `0x1B 0x95`
  - `0x1B` -> `0x1B 0x9B`
- **Addressing is hierarchical**: Node Address (2 bytes, 0x0001..0xFFFE), Virtual Device (1 byte: Audio 0x03, Logic 0x02), Object ID (3 bytes), Parameter ID (2 bytes). Node Address shown in Venue Explorer / Room view; Object ID and Parameter ID shown in Venue Explorer; all three shown in Properties window when object selected.
- **Preset recall** uses the Preset ID (shown in Parameter Preset window) as the 4-byte value; no addressing.
- **Subscription caveat**: BUMP PERCENT changes do not generate subscription updates — re-SUBSCRIBE to read the new value. Subscriptions persist until UNSUBSCRIBE or device reboot.

<!-- UNRESOLVED: exact byte-by-byte layout of each frame was shown only as embedded pictures in the source (omitted here); field order in templates above is inferred from the Addressing section's documented ordering. -->
<!-- UNRESOLVED: serial port configuration (baud/data/parity/stop) not stated in source — only "found in Audio Architect Properties window". -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: protocol version number not stated in source. -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
  - help.harmanpro.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
  - https://help.harmanpro.com/using-telnet-with-soundweb-london
  - https://help.harmanpro.com/en_US/soundweb-london-using-the-ethernet-trigger-and-serial-trigger-logic-objects
  - https://help.harmanpro.com/en_US/bss
retrieved_at: 2026-06-30T18:58:08.457Z
last_checked_at: 2026-07-07T11:07:18.707Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:07:18.707Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All nine spec actions match opcodes in the source; transport parameters (port 1023, TCP/serial protocols) verified verbatim; no undocumented commands in source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full byte-by-byte frame layout diagrams were picture-only in the source and omitted; field sizes are documented but exact byte ordering within each frame is inferred from the Addressing section ordering (Node, Virtual Device, Object ID, Parameter ID, Value)."
- "baud rate is configured in Audio Architect Properties window, not stated"
- "not stated"
- "device may emit additional status; none documented in source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "exact byte-by-byte layout of each frame was shown only as embedded pictures in the source (omitted here); field order in templates above is inferred from the Addressing section's documented ordering."
- "serial port configuration (baud/data/parity/stop) not stated in source — only \"found in Audio Architect Properties window\"."
- "firmware version compatibility not stated in source."
- "protocol version number not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
