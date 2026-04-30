---
schema_version: ai4av-public-spec-v1
device_id: bss-audio/soundweb-london
entity_id: bss_audio_soundweb_series
spec_id: admin/bss-audio-soundweb-series
revision: 1
author: admin
title: "BSS Audio Soundweb London Control Spec"
status: published
manufacturer: "BSS Audio"
manufacturer_key: bss-audio
model_family: "Soundweb London"
aliases: []
compatible_with:
  manufacturers:
    - "BSS Audio"
  models:
    - "Soundweb London"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: bss_audio_soundweb_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:27:31.348Z
retrieved_at: 2026-04-23T15:27:31.348Z
last_checked_at: 2026-04-23T15:27:31.348Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T15:27:31.348Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 9 spec actions matched verbatim in source; transport (TCP port 1023, serial pins 2,3,5) confirmed; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-14
---

# BSS Audio Soundweb London Control Spec

## Summary
BSS Audio Soundweb London is a family of DSP audio processors controllable via the London Direct Inject (DI) binary protocol over TCP (port 1023) or serial RS-232. The protocol supports setting, bumping, and subscribing to any processing object parameter (gain, mute, source selection, EQ, etc.) as well as recalling parameter presets. Crown, JBL, and AKG devices do not respond to this protocol.

<!-- UNRESOLVED: specific Soundweb London model names/numbers not listed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: serial baud rate default not stated (configurable via Audio Architect) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate configurable in Audio Architect but default not stated
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
  pins: "2 (RX), 3 (TX), 5 (GND) on 9-pin D-type"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - queryable   # inferred: SUBSCRIBE/SUBSCRIBE PERCENT return parameter values
  - levelable   # inferred: gain, threshold, pan parameters with SET/BUMP PERCENT
```

## Actions
```yaml
actions:
  - id: set_parameter
    label: Set Parameter (Raw)
    kind: action
    description: "Set a parameter using a raw 32-bit signed value. Message type 0x88."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category (Audio=0x03, Logic=0x02)"
      - name: object_id
        type: integer
        description: "Processing object identifier (3 bytes)"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object (2 bytes)"
      - name: value
        type: integer
        description: "32-bit signed raw value"

  - id: set_parameter_percent
    label: Set Parameter (Percent)
    kind: action
    description: "Set a parameter using a percentage value (0–100%). Message type 0x8D."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"
      - name: value
        type: number
        description: "Percentage value (0–100). Raw = value × 65536"

  - id: set_parameter_string
    label: Set Parameter (String)
    kind: action
    description: "Set a parameter using a string of up to 32 ASCII characters. Message type 0x91."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"
      - name: value
        type: string
        description: "String value (up to 32 ASCII chars, length-prefixed, 0x00 terminated)"

  - id: bump_parameter_percent
    label: Bump Parameter (Percent)
    kind: action
    description: "Bump a parameter up or down by a percentage value. Message type 0x90. Device does not send SET/SET PERCENT updates to subscribers after bump; must re-subscribe."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"
      - name: value
        type: integer
        description: "Signed percentage bump value"

  - id: recall_preset
    label: Recall Parameter Preset
    kind: action
    description: "Recall a Parameter Preset by preset ID. Message type 0x8C. No device addressing used."
    params:
      - name: preset_id
        type: integer
        description: "Preset ID number (4-byte value, displayed in Parameter Preset window)"

  - id: subscribe
    label: Subscribe to Parameter
    kind: action
    description: "Subscribe to a parameter. Returns current value immediately as SET or SET STRING, then sends updates on value changes. Message type 0x89."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"

  - id: unsubscribe
    label: Unsubscribe from Parameter
    kind: action
    description: "Stop receiving SET messages for a parameter. Message type 0x8A."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"

  - id: subscribe_percent
    label: Subscribe to Parameter (Percent)
    kind: action
    description: "Subscribe to a parameter. Returns current value as SET PERCENT, then sends updates on value changes. Message type 0x8E."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"

  - id: unsubscribe_percent
    label: Unsubscribe from Parameter (Percent)
    kind: action
    description: "Stop receiving SET PERCENT messages for a parameter. Message type 0x8F."
    params:
      - name: node_address
        type: integer
        description: "Physical device address (0x0001–0xFFFE)"
      - name: virtual_device
        type: integer
        description: "Processing object category"
      - name: object_id
        type: integer
        description: "Processing object identifier"
      - name: parameter_id
        type: integer
        description: "Parameter within the processing object"
```

## Feedbacks
```yaml
feedbacks:
  - id: set_response
    type: binary
    description: "SET message returned from device after SUBSCRIBE. Contains raw 32-bit signed parameter value."

  - id: set_percent_response
    type: binary
    description: "SET PERCENT message returned from device after SUBSCRIBE PERCENT. Contains percentage parameter value."

  - id: set_string_response
    type: string
    description: "SET STRING message returned from device after SUBSCRIBE when parameter is string type."

  - id: serial_ack
    type: binary
    description: "Serial acknowledgement byte 0x06 confirming receipt and valid checksum."

  - id: serial_nak
    type: binary
    description: "Serial negative acknowledgement byte 0x15 indicating invalid checksum."
```

## Variables
```yaml
# UNRESOLVED: specific variable parameters depend on device configuration and are not enumerated in source.
# Parameter addressing is hierarchical (Node → Virtual Device → Object → Parameter ID)
# and varies per design. See Notes for known parameter value scales.
```

## Events
```yaml
events:
  - id: parameter_value_change
    description: "Unsolicited SET or SET PERCENT message sent when a subscribed parameter changes value. Continues until UNSUBSCRIBE or device reboot."
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- **Protocol name:** London Direct Inject (DI) protocol. Soundweb London devices are always listening; no enable step required.
- **Binary framing:** All messages start with 0x02, end with 0x03. Last byte before end is XOR checksum of body (pre-substitution).
- **Byte substitution** is applied after checksum calculation:
  - 0x02 → 0x1B 0x82, 0x03 → 0x1B 0x83, 0x06 → 0x1B 0x86, 0x15 → 0x1B 0x95, 0x1B → 0x1B 0x9B
- **Serial ACK behavior:** Device ACKs valid serial messages with 0x06, NAKs with 0x15. On serial, device re-transmits after 1-second ACK timeout. TCP does not use ACKs (TCP handles reliability).
- **TCP connections:** Device accepts multiple simultaneous TCP connections on port 1023. Messages for other nodes are auto-forwarded across the network.
- **BUMP PERCENT caveat:** After a BUMP PERCENT, subscribed parameters do not return SET/SET PERCENT updates. A new SUBSCRIBE must be sent to read the current value.
- **Parameter value scales (from source):**
  - Two-state (mute): 0 / 1 (0% / 100%)
  - Multi-state (source selector): discrete 0, 1, 2, 3...
  - Variable gain: -280,617 (−80 dB) to 100,000 (+10 dB); unity = 0 (73.73%); logarithmic below −10 dB, linear above
  - Meter: −800,000 (−80 dB) to 400,000 (+40 dB); 0 dB = 0; dB = Raw / 10,000
  - Percent-to-raw: Raw = percentage × 65536
- **Exclusions:** Crown, JBL, and AKG devices do not respond to this protocol.
- **Configuration tool:** Baud rate, acknowledgement settings, node addresses, object IDs, and parameter IDs are viewed/configured in the Audio Architect software.

<!-- UNRESOLVED: serial port configuration defaults (baud, data bits, parity, stop bits) not stated -->
<!-- UNRESOLVED: exact message byte structure layouts described but hex table diagrams not included in refined source -->
<!-- UNRESOLVED: maximum number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: message length limits not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: bss_audio_soundweb_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T15:27:31.348Z
retrieved_at: 2026-04-23T15:27:31.348Z
last_checked_at: 2026-04-23T15:27:31.348Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:27:31.348Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 9 spec actions matched verbatim in source; transport (TCP port 1023, serial pins 2,3,5) confirmed; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```
