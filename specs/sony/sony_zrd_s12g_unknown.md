---
spec_id: admin/sony-zrd-s12g
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony ZRD-S12G Control Spec"
manufacturer: Sony
model_family: ZRD-S12G
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - ZRD-S12G
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-09-09T00:04:01.012Z
last_checked_at: 2026-09-22T11:45:50.670Z
generated_at: 2026-09-22T11:45:50.670Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Source identifies as ZRD-S12G \"unknown\" variant — no model-variant qualifier documented."
  - "source describes a generic response packet (\"aa 55 00 00 ff fe 01 ff ff ff 01 00 f2 ff 08 00 00 00 49 5d\")"
  - "source defines no query commands returning state values."
  - "source documents no unsolicited notifications."
  - "source documents no multi-step sequences."
  - "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source. Preset index upper bound (only presets 1 and 2 are explicitly exemplified; protocol address0x0a000002 implies 0x01-0xFF range but no explicit maximum is stated)."
verification:
  verdict: verified
  checked_at: 2026-09-22T11:45:50.670Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions match hex byte-for-byte against the source; transport parameters (115200 8N1, TCP 5200, UDP 5201) verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-09
---

# Sony ZRD-S12G Control Spec

## Summary
The Sony ZRD-S12G is a LED display controller receiving/sending card. This spec covers its binary control protocol exposed over RS-232 serial (115200 8N1, hex), TCP (port 5200), and UDP (port 5201). Packets are 21-byte framed commands with a2-byte checksum covering brightness, presets, output modes (3D, low-latency, freeze, blackout), controller mode, and input source routing.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Source identifies as ZRD-S12G "unknown" variant — no model-variant qualifier documented. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  tcp_port: 5200
  udp_port: 5201
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- levelable       # inferred: brightness adjustment commands present
- routable        # inferred: layer source switching commands present
```

## Actions
```yaml
- id: adjust_brightness
  label: Adjust Brightness
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 01 00 00 02 01 {brightness} {chk_hi} {chk_lo}"
  params:
    - name: brightness
      type: integer
      description: Brightness value 00-FF (ratio = value / FF). 00 = 0%, FF = 100%.
    - name: chk_hi
      type: string
      description: Checksum high byte (computed: sum of protocol content bytes + 0x5555, little-endian)
    - name: chk_lo
      type: string
      description: Checksum low byte

- id: receiving_card_black_screen
  label: Receiving Card Black Screen
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 02 01 00 ff 54 5b"
  params: []

- id: receiving_card_freeze
  label: Receiving Card Freeze
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 01 00 02 01 00 ff 56 5b"
  params: []

- id: receiving_card_unfreeze
  label: Receiving Card Unfreeze
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 01 00 02 01 00 00 57 5a"
  params: []

- id: receiving_card_normal_display
  label: Receiving Card Normal Display
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 02 01 00 00 55 5a"
  params: []

- id: switch_preset_1
  label: Switch to Preset 1
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 00 00 0a 01 00 01 5f 5a"
  params: []

- id: switch_preset_2
  label: Switch to Preset 2
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 02 00 00 0a 01 00 02 60 5a"
  params: []

- id: enable_low_latency
  label: Enable Low Latency
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 11 01 00 10 01 00 01 75 5a"
  params: []

- id: disable_low_latency
  label: Disable Low Latency
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 11 01 00 10 01 00 00 74 5a"
  params: []

- id: enable_3d
  label: Enable 3D
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 16 01 00 10 01 00 01 7a 5a"
  params: []

- id: disable_3d
  label: Disable 3D
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 16 01 00 10 01 00 00 79 5a"
  params: []

- id: 3d_right_eye
  label: 3D Right Eye
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 18 11 00 10 01 00 00 8b 5a"
  params: []

- id: 3d_left_eye
  label: 3D Left Eye
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 18 11 00 10 01 00 01 8c 5a"
  params: []

- id: switch_all_in_one_controller_mode
  label: Switch to All-in-One Controller Mode
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 f2 ff 08 00 01 00 01 4c 5c"
  params: []

- id: switch_send_only_controller_mode
  label: Switch to Send-Only Controller Mode
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 f2 ff 08 00 01 00 00 4b 5c"
  params: []

- id: sending_card_black_screen_all
  label: Sending Card Black Screen (All Cards)
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 ff 01 64 5b"
  params: []

- id: sending_card_black_screen_card
  label: Sending Card Black Screen (By Card Number)
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 {card_num} 01 {chk_hi} {chk_lo}"
  params:
    - name: card_num
      type: integer
      description: Output card number (1-based). For single-card controllers use FF.
    - name: chk_hi
      type: string
      description: Checksum high byte    - name: chk_lo
      type: string
      description: Checksum low byte

- id: sending_card_freeze_card
  label: Sending Card Freeze (By Card Number)
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 {card_num} 02 {chk_hi} {chk_lo}"
  params:
    - name: card_num
      type: integer
      description: Output card number (1-based)
    - name: chk_hi
      type: string
      description: Checksum high byte
    - name: chk_lo
      type: string
      description: Checksum low byte

- id: sending_card_normal_display_card
  label: Sending Card Normal Display (By Card Number)
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 00 01 00 10 02 00 {card_num} 00 {chk_hi} {chk_lo}"
  params:
    - name: card_num
      type: integer
      description: Output card number (1-based)
    - name: chk_hi
      type: string
      description: Checksum high byte
    - name: chk_lo
      type: string
      description: Checksum low byte

- id: switch_layer_source
  label: Switch Layer Source
  kind: action
  command: "55 aa 00 00 fe ff 01 ff ff ff 01 00 03 00 00 0a 03 00 {layer_num} {input_card_num} {input_iface_num} {chk_hi} {chk_lo}"
  params:
    - name: layer_num
      type: integer
      description: Layer number    - name: input_card_num
      type: integer
      description: Input card number (0-based)
    - name: input_iface_num
      type: integer
      description: Input card interface number (0-based)
    - name: chk_hi
      type: string
      description: Checksum high byte
    - name: chk_lo
      type: string
      description: Checksum low byte
```

## Feedbacks
```yaml
# UNRESOLVED: source describes a generic response packet ("aa 55 00 00 ff fe 01 ff ff ff 01 00 f2 ff 08 00 00 00 49 5d")
# indicating an ACK-style confirmation, but does not define a structured feedback schema per command.
```

## Variables
```yaml
# UNRESOLVED: source defines no query commands returning state values.
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
All commands share a fixed 16-byte prefix `55 aa 00 00 fe ff 01 ff ff ff 01 00` followed by register address (bytes 0x0c-0x0f, little-endian), data length (0x10-0x11), data payload (0x12+), and a 2-byte checksum at 0x13-0x14. Checksum = sum of protocol content bytes + 0x5555, written little-endian. For "Switch to Preset N", preset1 = byte 0x01, preset 26 = 0x1A, etc. (1-indexed hex). Source identifies as `sony_zrd_s12g_unknown` — variant suffix not documented in source.

<!-- UNRESOLVED: firmware version compatibility not stated in source. Preset index upper bound (only presets 1 and 2 are explicitly exemplified; protocol address0x0a000002 implies 0x01-0xFF range but no explicit maximum is stated). -->

## Provenance

```yaml
source_domains:
  - oss.novastar.tech
source_urls:
  - https://oss.novastar.tech/uploads/2025/09/Central-Control-Protocol-Instructions-V1.5.0.pdf
retrieved_at: 2026-09-09T00:04:01.012Z
last_checked_at: 2026-09-22T11:45:50.670Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:45:50.670Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions match hex byte-for-byte against the source; transport parameters (115200 8N1, TCP 5200, UDP 5201) verified verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Source identifies as ZRD-S12G \"unknown\" variant — no model-variant qualifier documented."
- "source describes a generic response packet (\"aa 55 00 00 ff fe 01 ff ff ff 01 00 f2 ff 08 00 00 00 49 5d\")"
- "source defines no query commands returning state values."
- "source documents no unsolicited notifications."
- "source documents no multi-step sequences."
- "source contains no explicit safety warnings, interlocks, or power-on sequencing requirements."
- "firmware version compatibility not stated in source. Preset index upper bound (only presets 1 and 2 are explicitly exemplified; protocol address0x0a000002 implies 0x01-0xFF range but no explicit maximum is stated)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
