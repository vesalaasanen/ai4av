---
spec_id: admin/novastar-n10-companion
schema_version: ai4av-public-spec-v1
revision: 1
title: "NovaStar N10 Control Spec"
manufacturer: NovaStar
model_family: N10
aliases: []
compatible_with:
  manufacturers:
    - NovaStar
  models:
    - N10
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-05-14T10:50:21.926Z
last_checked_at: 2026-06-02T22:12:44.825Z
generated_at: 2026-06-02T22:12:44.825Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device type field not confirmed (LED controller / video processor)"
  - "no query commands returning current state found in source"
  - "no unsolicited event notifications documented"
  - "no explicit multi-step macro sequences documented"
  - "no safety warnings or interlock procedures in source"
  - "data length field (bytes 0x10-0x11) encoding not fully documented for all command variants"
  - "source/destination address byte meaning not documented (bytes 0x04-0x05, 0x08-0x09)"
  - "device type field (byte 0x06) values not documented"
  - "Ethernet port field (byte 0x07) purpose not documented"
  - "maximum number of layers, input cards, or presets not stated"
  - "query commands to read current brightness, preset, or mode not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:12:44.825Z
  matched_actions: 19
  action_count: 19
  confidence: medium
  summary: "All 19 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-11
---

# NovaStar N10 Control Spec

## Summary
NovaStar N10 LED display controller supporting serial (RS-232), TCP, and UDP control. Protocol uses hexadecimal packet format with register-based addressing. Supports brightness, blackout, freeze, preset switching, low latency mode, 3D mode, and layer source routing.

<!-- UNRESOLVED: device type field not confirmed (LED controller / video processor) -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 5200  # TCP
  port: 5201  # UDP
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable     # brightness control present (register 0x02000010, 0-FF)
- routable      # layer source switching present (register 0x0a000003)
- queryable     # response packets confirm success (ACK field)
```

## Actions
```yaml
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 0-255 (0x00-0xFF), ratio = value/255
      range: [0, 255]

- id: set_receiving_card_blackout
  label: Set Receiving Card Blackout
  kind: action
  params: []

- id: set_receiving_card_freeze
  label: Set Receiving Card Freeze
  kind: action
  params: []

- id: set_receiving_card_unfreeze
  label: Set Receiving Card Unfreeze
  kind: action
  params: []

- id: set_receiving_card_normal_display
  label: Set Receiving Card Normal Display
  kind: action
  params: []

- id: switch_preset
  label: Switch Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-26 (0x01-0x1A)
      range: [1, 26]

- id: enable_low_latency
  label: Enable Low Latency
  kind: action
  params: []

- id: disable_low_latency
  label: Disable Low Latency
  kind: action
  params: []

- id: enable_3d
  label: Enable 3D
  kind: action
  params: []

- id: disable_3d
  label: Disable 3D
  kind: action
  params: []

- id: set_3d_right_eye
  label: Set 3D Right Eye
  kind: action
  params: []

- id: set_3d_left_eye
  label: Set 3D Left Eye
  kind: action
  params: []

- id: switch_all_in_one_controller_mode
  label: Switch to All-in-One Controller Mode
  kind: action
  params: []

- id: switch_send_only_controller_mode
  label: Switch to Send-Only Controller Mode
  kind: action
  params: []

- id: set_sending_card_blackout_all
  label: Set All Sending Cards Blackout
  kind: action
  params: []

- id: set_sending_card_blackout_by_card
  label: Set Sending Card Blackout by Output Card Number
  kind: action
  params:
    - name: card_number
      type: integer
      description: Output card number (1-based); FF = all cards
      range: [1, 255]

- id: set_sending_card_freeze_by_card
  label: Set Sending Card Freeze by Output Card Number
  kind: action
  params:
    - name: card_number
      type: integer
      description: Output card number (1-based)
      range: [1, 255]

- id: set_sending_card_normal_by_card
  label: Set Sending Card Normal Display by Output Card Number
  kind: action
  params:
    - name: card_number
      type: integer
      description: Output card number (1-based)
      range: [1, 255]

- id: switch_layer_source
  label: Switch Layer Source
  kind: action
  params:
    - name: layer_number
      type: integer
      description: Layer number (1-based)
      range: [1, 255]
    - name: input_card_number
      type: integer
      description: Input card number (0-based)
      range: [0, 255]
    - name: input_interface_number
      type: integer
      description: Input interface number on card (0-based)
      range: [0, 255]
```

## Feedbacks
```yaml
- id: command_response
  label: Command Response Packet
  type: binary
  description: Response packet confirms success after sending data. Format: aa 55 [ACK] [Label] [source] [dest] [devtype] [port] [broadcast] [code] [packettype] [addr] [len] [data] [checksum]
```

## Variables
```yaml
# UNRESOLVED: no query commands returning current state found in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Packet structure**: All commands follow [Packet Header 0x55 0xAA][Protocol Content][Checksum] format. Register addresses use little-endian byte order. Checksum = sum of all protocol content bytes + 0x5555, stored little-endian.

**Protocol content fixed header (16 bytes)**: `00 00 fe ff 01 ff ff ff 01 00 [code] [00/01] [register-addr-low] [register-addr-high]`. Code byte varies by command class.

**Response packet format**: `aa 55 00 00 ff fe 01 ff ff ff 01 00 [code] [packettype] [00] [data] [checksum]`

**Register address map**:
- `0x02000010` — brightness (data: 0x00-0xFF)
- `0x02001000` — receiving card display mode (data: 0x00=normal, 0xFF=blackout)
- `0x02001002` — receiving card freeze (data: 0x00=unfreeze, 0xFF=freeze)
- `0x0a000002` — preset switch (data: 0x01-0x1A)
- `0x01000111` — low latency (data: 0x00=disable, 0x01=enable)
- `0x01000116` — 3D mode (data: 0x00=disable, 0x01=enable)
- `0x01001118` — 3D eye selection (data: 0x00=right, 0x01=left)
- `0x0008fff2` — controller mode (data: 0x00=send-only, 0x01=all-in-one)
- `0x10000100` — sending card display control (data: [card_num] [mode])
- `0x0a000003` — layer source switch (data: [layer] [input_card] [interface])

<!-- UNRESOLVED: data length field (bytes 0x10-0x11) encoding not fully documented for all command variants -->
<!-- UNRESOLVED: source/destination address byte meaning not documented (bytes 0x04-0x05, 0x08-0x09) -->
<!-- UNRESOLVED: device type field (byte 0x06) values not documented -->
<!-- UNRESOLVED: Ethernet port field (byte 0x07) purpose not documented -->
<!-- UNRESOLVED: maximum number of layers, input cards, or presets not stated -->
<!-- UNRESOLVED: query commands to read current brightness, preset, or mode not documented -->

## Provenance

```yaml
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-05-14T10:50:21.926Z
last_checked_at: 2026-06-02T22:12:44.825Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:12:44.825Z
matched_actions: 19
action_count: 19
confidence: medium
summary: "All 19 spec actions traced to source (dip-safe re-verify). (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device type field not confirmed (LED controller / video processor)"
- "no query commands returning current state found in source"
- "no unsolicited event notifications documented"
- "no explicit multi-step macro sequences documented"
- "no safety warnings or interlock procedures in source"
- "data length field (bytes 0x10-0x11) encoding not fully documented for all command variants"
- "source/destination address byte meaning not documented (bytes 0x04-0x05, 0x08-0x09)"
- "device type field (byte 0x06) values not documented"
- "Ethernet port field (byte 0x07) purpose not documented"
- "maximum number of layers, input cards, or presets not stated"
- "query commands to read current brightness, preset, or mode not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
