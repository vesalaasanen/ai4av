---
spec_id: admin/sony-zrd-s15g
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony ZRD-S15G Control Spec"
manufacturer: Sony
model_family: ZRD-S15G
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - ZRD-S15G
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-07-26T09:45:56.379Z
last_checked_at: 2026-10-07T10:30:44.868Z
generated_at: 2026-10-07T10:30:44.868Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "the refined source text is the controller-side protocol manual; it does not itself name the ZRD-S15G model, controller part number, or firmware range. Cabinet identity assumed from the input metadata."
  - "\"Data Flow: Hexadecimal\" refers to hex data encoding, not RS-232 flow control; flow control not stated"
  - "full status-byte value table not documented; non-success codes unknown\""
  - "no further settable parameters found in source."
  - "no event/notification mechanism stated in source."
  - "no macros documented."
  - "source contains no safety warnings, interlock procedures, or"
  - "controller model/part number not stated in source."
  - "firmware version compatibility not stated."
  - "RS-232 flow control not stated (\"hexadecimal data flow\" = data encoding, not handshake)."
  - "full ACK status-byte table not documented (only 0x00 success observed)."
  - "no query/read-back commands documented; device state polling unsupported by this source."
verification:
  verdict: verified
  checked_at: 2026-10-07T10:30:44.868Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 actions match source frames byte-for-byte, transport values are supported, and the source documents the same 19 command units. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Sony ZRD-S15G Control Spec

## Summary
The Sony ZRD-S15G is a Crystal LED display cabinet. This spec covers the binary control protocol used to drive the cabinet via its controller, which is reachable over RS-232 serial, TCP, and UDP. Commands cover display brightness, receiving-card and sending-card display modes (black/freeze/normal), preset switching, low-latency and 3D toggles, controller-mode switching, and per-layer source routing.

<!-- UNRESOLVED: the refined source text is the controller-side protocol manual; it does not itself name the ZRD-S15G model, controller part number, or firmware range. Cabinet identity assumed from the input metadata. -->

## Transport
```yaml
# Three transports are explicitly documented: RS-232, TCP, and UDP.
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: "Data Flow: Hexadecimal" refers to hex data encoding, not RS-232 flow control; flow control not stated
addressing:
  # Two distinct ports stated; one per IP transport.
  tcp_port: 5200
  udp_port: 5201
auth:
  type: UNRESOLVED  # source does not specify authentication
```

## Traits
```yaml
# - levelable: brightness adjustable 0x00-0xFF (source 3.2.2)
# - routable: layer source switching maps input card+interface to a layer (source 3.6)
traits:
  - levelable       # inferred from brightness command
  - routable        # inferred from layer-source switching command
```

## Actions
```yaml
# Every documented operation is enumerated below. Each carries the verbatim
# payload from the source. Packet layout:
#   [55 aa] header | [00 00 fe ff 01 ff ff ff 01 00] fixed protocol content |
#   [reg 4 bytes LE] | [data_len 2 bytes LE] | [data...] | [checksum 2 bytes LE]
# Checksum = (sum of all protocol-content + data bytes) + 0x5555, emitted little-endian.

- id: adjust_brightness
  label: Adjust Display Brightness
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 01 00 00 02 01 00 {value:02x} {checksum}"
  register: "0x02000001"
  params:
    - name: value
      type: integer
      description: "Brightness 0x00 (0%) to 0xFF (100%). Ratio = value / 0xFF."
  notes:
    - "checksum computed as (sum of protocol content + data bytes) + 0x5555, little-endian"

- id: set_receiving_card_black_screen
  label: Set Receiving Card to Black Screen
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 02 01 00 ff 54 5b"
  register: "0x02000100"
  params: []

- id: set_receiving_card_freeze
  label: Set Receiving Card to Freeze
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 01 00 02 01 00 ff 56 5b"
  register: "0x02000102"
  params: []

- id: set_receiving_card_unfreeze
  label: Set Receiving Card to Unfreeze
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 01 00 02 01 00 00 57 5a"
  register: "0x02000102"
  params: []

- id: set_receiving_card_normal_display
  label: Set Receiving Card to Normal Display
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 02 01 00 00 55 5a"
  register: "0x02000100"
  params: []

- id: switch_preset
  label: Switch Preset
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 00 00 0a 01 00 {preset:02x} {checksum}"
  register: "0x0a000002"
  params:
    - name: preset
      type: integer
      description: "Preset number 1-26 (0x01-0x1A). Source: Preset 1=0x01 ... Preset 25=0x19, Preset 26=0x1A."
  notes:
    - "source examples: preset 1 -> data 01 (checksum 5f 5a); preset 2 -> data 02 (checksum 60 5a)"

- id: enable_low_latency
  label: Enable Low Latency
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 11 01 00 10 01 00 01 75 5A"
  register: "0x10000111"
  params: []

- id: disable_low_latency
  label: Disable Low Latency
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 11 01 00 10 01 00 00 74 5A"
  register: "0x10000111"
  params: []

- id: enable_3d
  label: Enable 3D
  kind: action
  command: "55 AA 00 00 FE FF 01 FF FF FF 01 00 16 01 00 10 01 00 01 7A 5A"
  register: "0x10000116"
  params: []

- id: disable_3d
  label: Disable 3D
  kind: action
  command: "55 AA 00 00 FE FF 01 FF FF FF 01 00 16 01 00 10 01 00 00 79 5A"
  register: "0x10000116"
  params: []

- id: set_3d_right_eye
  label: 3D Right Eye
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 18 11 00 10 01 00 00 8b 5a"
  register: "0x10001118"
  params: []

- id: set_3d_left_eye
  label: 3D Left Eye
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 18 11 00 10 01 00 01 8c 5a"
  register: "0x10001118"
  params: []

- id: switch_to_all_in_one_controller_mode
  label: Switch to All-in-One Controller Mode
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 f2 ff 08 00 01 00 01 4c 5c"
  register: "0x0008fff2"
  params: []

- id: switch_to_send_only_controller_mode
  label: Switch to Send-Only Controller Mode
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 f2 ff 08 00 01 00 00 4b 5c"
  register: "0x0008fff2"
  params: []

- id: controller_level_sending_card_black_screen
  label: Controller-Level Sending Card Black Screen
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 ff 01 64 5b"
  register: "0x10000100"
  params: []
  notes:
    - "card byte 0xff = all output cards on the controller"

- id: output_card_sending_card_black_screen
  label: Output-Card-Based Sending Card Black Screen
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 06 01 6B 5A"
  register: "0x10000100"
  params:
    - name: card
      type: integer
      description: "Output card number (1-based); example uses 6. Use 0xff for all cards."
  notes:
    - "byte 0x13 = mode: 0x00 normal, 0x01 black screen, 0x02 freeze"

- id: output_card_sending_card_freeze
  label: Output-Card-Based Sending Card Freeze
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 06 02 6C 5A"
  register: "0x10000100"
  params:
    - name: card
      type: integer
      description: "Output card number (1-based); example uses 6. Use 0xff for all cards."

- id: output_card_sending_card_normal_display
  label: Output-Card-Based Sending Card Normal Display
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 06 00 6A 5A"
  register: "0x10000100"
  params:
    - name: card
      type: integer
      description: "Output card number (1-based); example uses 6. Use 0xff for all cards."

- id: switch_layer_source
  label: Switch Layer Source
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 03 00 00 0a 03 00 {layer:02x} {card:02x} {iface:02x} {checksum}"
  register: "0x0a000003"
  params:
    - name: layer
      type: integer
      description: "Layer number (example: 0x01)."
    - name: card
      type: integer
      description: "Input card number, starting from 0 (example: 0x01)."
    - name: iface
      type: integer
      description: "Input card interface number, starting from 0 (example: 0x00)."
  notes:
    - "source example (layer 1 <- IN2 card 1 iface 0) -> checksum 63 5A"
```

## Feedbacks
```yaml
# Source section D documents a response/ack packet returned after each command.
# Request and response headers are mirrored: request 55 aa -> response aa 55;
# the source/destination bytes and the ACK byte flip (fe ff -> ff fe).
# The response echoes the register, data length, and returns a status data byte
# (0x00 = success in the worked example).
- id: command_ack
  type: binary
  description: "Acknowledgement packet mirroring the request with a status byte"
  example_response: "aa 55 00 00 ff fe 01 ff ff ff 01 00 f2 ff 08 00 00 00 49 5d"
  example_request: "55 aa 00 00 fe ff 01 ff ff ff 01 00 f2 ff 08 00 01 00 00 4b 5c"
  notes:
    - "status byte position mirrors the request's data byte; 0x00 observed = success"
    - "UNRESOLVED: full status-byte value table not documented; non-success codes unknown"
```

## Variables
```yaml
# Settable continuous parameters are represented as parameterized Actions
# (adjust_brightness, switch_preset). No additional variables documented.
# UNRESOLVED: no further settable parameters found in source.
```

## Events
```yaml
# No unsolicited notifications documented.
# UNRESOLVED: no event/notification mechanism stated in source.
```

## Macros
```yaml
# No multi-step sequences described in source.
# UNRESOLVED: no macros documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Do not infer.
```

## Notes
- Binary protocol: `[55 aa] header` + 10-byte fixed protocol content (`00 00 fe ff 01 ff ff ff 01 00`) + 4-byte little-endian register address + 2-byte little-endian data length + data bytes + 2-byte little-endian checksum.
- Checksum = `(sum of all bytes from offset 0x02 through the last data byte) + 0x5555`, emitted little-endian (LSB first).
- Register addresses are stored little-endian on the wire; e.g. wire bytes `01 00 00 02` represent register `0x02000001`.
- Single-card controllers: use card byte `0xff` to address all output cards directly (source 3.5.1 note).
- The ZRD-S15G cabinet itself is passive; these commands target its sending/receiving controller. The controller part number is not identified in the refined source.

<!-- UNRESOLVED: controller model/part number not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: RS-232 flow control not stated ("hexadecimal data flow" = data encoding, not handshake). -->
<!-- UNRESOLVED: full ACK status-byte table not documented (only 0x00 success observed). -->
<!-- UNRESOLVED: no query/read-back commands documented; device state polling unsupported by this source. -->

## Provenance

```yaml
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-07-26T09:45:56.379Z
last_checked_at: 2026-10-07T10:30:44.868Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T10:30:44.868Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 actions match source frames byte-for-byte, transport values are supported, and the source documents the same 19 command units. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the refined source text is the controller-side protocol manual; it does not itself name the ZRD-S15G model, controller part number, or firmware range. Cabinet identity assumed from the input metadata."
- "\"Data Flow: Hexadecimal\" refers to hex data encoding, not RS-232 flow control; flow control not stated"
- "full status-byte value table not documented; non-success codes unknown\""
- "no further settable parameters found in source."
- "no event/notification mechanism stated in source."
- "no macros documented."
- "source contains no safety warnings, interlock procedures, or"
- "controller model/part number not stated in source."
- "firmware version compatibility not stated."
- "RS-232 flow control not stated (\"hexadecimal data flow\" = data encoding, not handshake)."
- "full ACK status-byte table not documented (only 0x00 success observed)."
- "no query/read-back commands documented; device state polling unsupported by this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
