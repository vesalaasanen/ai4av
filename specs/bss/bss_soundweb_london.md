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
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:40:52.018Z
last_checked_at: 2026-06-02T22:04:46.236Z
generated_at: 2026-06-02T22:04:46.236Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "BLU-Link, Dante, CobraNet, and AVB connections are not used for control (documented but out of scope)"
  - "baud rate configured in Audio Architect Properties, not stated in source"
  - "not stated in source"
  - "parameter addresses (Node Address, Object ID, Parameter ID) are"
  - "unsolicited parameter change notifications are sent to subscribers"
  - "no explicit multi-step macros described in source"
  - "no safety warnings or interlock procedures in source"
  - "full parameter ID enumeration for all processing objects not included in source"
  - "message structure diagrams for SET, SET STRING, UNSUBSCRIBE, PRESET RECALL not reproduced from source"
  - "specific Object ID values for each processing object type not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:04:46.236Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# BSS Soundweb London Control Spec

## Summary
The BSS Soundweb London is a networked audio processor supporting two-way communication via the London Direct Inject protocol over TCP/IP (port 1023) and RS-232 serial. The protocol allows a third party controller to set or request the value of any parameter or meter, subscribe to parameter changes, and recall parameter presets. Devices are always listening and do not require enabling for third party control.

<!-- UNRESOLVED: BLU-Link, Dante, CobraNet, and AVB connections are not used for control (documented but out of scope) -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 1023  # stated: Soundweb London devices listen on TCP port 1023
serial:
  baud_rate: null  # UNRESOLVED: baud rate configured in Audio Architect Properties, not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth/login procedure in source
```

## Traits
```yaml
- queryable  # inferred: SUBSCRIBE message type returns parameter values
- levelable  # inferred: gain parameters, percentage SET/BUMP commands present
- routable  # inferred: source selector processing object referenced
```

## Actions
```yaml
- id: set_parameter
  label: SET Parameter (Raw)
  kind: action
  params:
    - name: node_address
      type: integer
      description: Device node address (2 bytes, range 1-65534)
    - name: virtual_device
      type: integer
      description: Processing object category (1 byte, e.g. 0x03=Audio, 0x02=Logic)
    - name: object_id
      type: integer
      description: Processing object ID (3 bytes)
    - name: parameter_id
      type: integer
      description: Parameter ID within the processing object (2 bytes)
    - name: value
      type: integer
      description: Parameter value (32-bit signed)

- id: set_parameter_percent
  label: SET Parameter (Percent)
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
    - name: percentage
      type: number
      description: Percentage value (0-100)

- id: set_parameter_string
  label: SET Parameter (String)
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
      description: ASCII string up to 32 characters with 0x00 termination

- id: bump_percent
  label: BUMP Parameter (Percent)
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
    - name: percentage_delta
      type: number
      description: Percentage bump up (+) or down (-)

- id: recall_preset
  label: RECALL PRESET
  kind: action
  params:
    - name: preset_id
      type: integer
      description: Parameter Preset ID number

- id: subscribe
  label: SUBSCRIBE Parameter
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
  comment: Returns SET or SET STRING messages on parameter change

- id: subscribe_percent
  label: SUBSCRIBE Parameter (Percent)
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
  comment: Returns SET PERCENT messages on parameter change

- id: unsubscribe
  label: UNSUBSCRIBE Parameter
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
  label: UNSUBSCRIBE Parameter (Percent)
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
```

## Feedbacks
```yaml
- id: set_response
  label: SET Response
  type: object
  fields:
    - node_address: integer
    - virtual_device: integer
    - object_id: integer
    - parameter_id: integer
    - value: integer  # 32-bit signed raw value

- id: set_percent_response
  label: SET PERCENT Response
  type: object
  fields:
    - node_address: integer
    - virtual_device: integer
    - object_id: integer
    - parameter_id: integer
    - percentage: number  # 0-100

- id: set_string_response
  label: SET STRING Response
  type: object
  fields:
    - node_address: integer
    - virtual_device: integer
    - object_id: integer
    - parameter_id: integer
    - string_value: string  # up to 32 ASCII characters

- id: serial_ack
  label: Serial Acknowledgement
  type: enum
  values:
    - 0x06  # ACK: message received, checksum valid
    - 0x15  # NAK: checksum invalid
  comment: Only used for serial RS-232; TCP provides reliable delivery natively
```

## Variables
```yaml
# UNRESOLVED: parameter addresses (Node Address, Object ID, Parameter ID) are
# configured in Audio Architect and vary by venue - not determinable from source
```

## Events
```yaml
# UNRESOLVED: unsolicited parameter change notifications are sent to subscribers
# but the event message format is not fully documented in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
**Message Structure (prior to byte substitution):**

All London DI messages:
- Start byte: `0x02`
- End byte: `0x03`
- Checksum: single-byte XOR of all bytes in message body (before byte substitution)

**Byte Substitution:** After checksum calculation, if message body contains any of these bytes, they are substituted to avoid conflicts with control characters:
- `0x02` → `0x1B 0x82`
- `0x03` → `0x1B 0x83`
- `0x06` → `0x1B 0x86`
- `0x15` → `0x1B 0x95`
- `0x1B` → `0x1B 0x9B`

**Addressing Hierarchy:**
- Node Address: 2 bytes (range `0x0001`–`0xFFFE`, i.e. 1–65534)
- Virtual Device: 1 byte (category, e.g. `0x03`=Audio, `0x02`=Logic)
- Object ID: 3 bytes (identifies the processing object)
- Parameter ID: 2 bytes (identifies the parameter within the object)

**Value Scaling:**
- Two-state parameters (e.g. mute): raw values `0` (0%) and `1` (100%)
- Multi-state parameters (e.g. source selector): discrete values `0,1,2,3,4...` (0%–100%)
- Variable parameters (e.g. gain): raw range `-280,617` (0%=−80dB) to `100,000` (100%=+10dB); unity gain at `0` (73.73%)
- Meter parameters: raw range `-800,000` (0%=−80dB) to `400,000` (100%=+40dB); 0dB at `0` (66.66%)
- Percentage conversion: `raw = percentage × 65536`

**Serial RS-232:** Only pins 2, 3, 5 are used on the 9-pin D-type connector. Acknowledgement `0x06` (ACK) or `0x15` (NAK) is returned for correctly formatted messages. If no acknowledgement received within 1 second, device re-transmits. Baud rate and acknowledgement settings are configured in Audio Architect Properties window.

**TCP Communication:** Devices listen on port 1023 and accept multiple connections. No acknowledgements used — TCP provides reliable delivery. Third party devices typically open a socket and leave it open indefinitely.

<!-- UNRESOLVED: full parameter ID enumeration for all processing objects not included in source -->
<!-- UNRESOLVED: message structure diagrams for SET, SET STRING, UNSUBSCRIBE, PRESET RECALL not reproduced from source -->
<!-- UNRESOLVED: specific Object ID values for each processing object type not stated in source -->

## Provenance

```yaml
source_domains:
  - bssaudio.com
source_urls:
  - https://bssaudio.com/en/site_elements/soundweb-london-third-party-control-application-guide
retrieved_at: 2026-04-30T04:40:52.018Z
last_checked_at: 2026-06-02T22:04:46.236Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:04:46.236Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions traced to source (dip-safe re-verify). (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "BLU-Link, Dante, CobraNet, and AVB connections are not used for control (documented but out of scope)"
- "baud rate configured in Audio Architect Properties, not stated in source"
- "not stated in source"
- "parameter addresses (Node Address, Object ID, Parameter ID) are"
- "unsolicited parameter change notifications are sent to subscribers"
- "no explicit multi-step macros described in source"
- "no safety warnings or interlock procedures in source"
- "full parameter ID enumeration for all processing objects not included in source"
- "message structure diagrams for SET, SET STRING, UNSUBSCRIBE, PRESET RECALL not reproduced from source"
- "specific Object ID values for each processing object type not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
