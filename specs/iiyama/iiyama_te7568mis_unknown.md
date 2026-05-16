---
spec_id: admin/iiyama-te7568mis
schema_version: ai4av-public-spec-v1
revision: 1
title: "Iiyama TE7568MIS Control Spec"
manufacturer: Iiyama
model_family: TE7568MIS
aliases: []
compatible_with:
  manufacturers:
    - Iiyama
  models:
    - TE7568MIS
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - iiyama.com
  - cdn.iiyama.com
source_urls:
  - https://iiyama.com/f/3b30cd7d6a4bc40e1d229c327cda4d35_texx68-rs232-protocol-v1-0-2.pdf
  - https://cdn.iiyama.com/f/dcee9a0889b9f1e85fd5ac0fa77eaf96_lhxx54-rs232-lan-commands-improved-2023-08.pdf
retrieved_at: 2026-05-16T02:11:28.364Z
last_checked_at: 2026-05-16T12:16:08.505Z
generated_at: 2026-05-16T12:16:08.505Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-16T12:16:08.505Z
  matched_actions: 8
  action_count: 8
  confidence: high
  summary: "All 8 spec actions matched in source with correct command codes and parameters; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Iiyama TE7568MIS Control Spec

## Summary
Interactive intelligent panel with RS-232 control interface. Commands for power, source selection, volume, aspect ratio, and full remote-control emulation via hex payload. Serial config: 9600 baud, 8N1, no flow control.

<!-- UNRESOLVED: no TCP/IP, HTTP, or UDP variant documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # fixed
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- levelable
- queryable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: set_source
  label: Set Source
  kind: action
  params:
    - name: source
      type: enum
      values:
        - av_cvbs
        - vga1
        - hdmi1
        - hdmi2
        - hdmi3
        - android
        - dp
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      range: [0, 100]
      description: Volume level 0-100
- id: mute
  label: Mute
  kind: action
  params: []
- id: unmute
  label: Unmute
  kind: action
  params: []
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: enum
      values:
        - 16:9
        - 4:3
        - ptp
- id: remote_emulate
  label: Remote Control Emulate
  kind: action
  params:
    - name: key
      type: enum
      values:
        - win
        - space
        - alt_tab
        - alt_f4
        - num_0
        - num_1
        - num_2
        - num_3
        - num_4
        - num_5
        - num_6
        - num_7
        - num_8
        - num_9
        - display
        - refresh
        - input
        - home
        - menu
        - delete
        - energy
        - up
        - down
        - left
        - right
        - enter
        - point
        - back
        - ch_plus
        - ch_minus
        - vol_plus
        - vol_minus
        - page_up
        - page_down
        - f1
        - f2
        - f3
        - f4
        - f5
        - f6
        - f7
        - f8
        - f9
        - f10
        - f11
        - f12
        - red
        - green
        - yellow
        - blue
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - on
    - off
  query_code: AA BB CC 01 02 00 03 DD EE FF
  response_map:
    "AA BB CC 80 00 00 80 DD EE FF": on
    "AA BB CC 80 01 00 81 DD EE FF": off
- id: volume_status
  label: Volume Status
  type: integer
  range: [0, 100]
  query_code: AA BB CC 03 02 00 05 DD EE FF
  response_pattern: "AA BB CC 82 00 xx ** DD EE FF"
- id: mute_status
  label: Mute Status
  type: enum
  values:
    - muted
    - unmuted
  query_code: AA BB CC 03 03 00 06 DD EE FF
  response_map:
    "AA BB CC 82 01 00 83 DD EE FF": muted
    "AA BB CC 82 01 01 84 DD EE FF": unmuted
- id: source_status
  label: Source Status
  type: enum
  values:
    - av_cvbs
    - vga1
    - hdmi3
    - hdmi1
    - hdmi2
    - android
    - dp
  query_code: AA BB CC 02 00 00 02 DD EE FF
  response_map:
    "AA BB CC 81 02 00 83 DD EE FF": av_cvbs
    "AA BB CC 81 03 00 84 DD EE FF": vga1
    "AA BB CC 81 05 00 86 DD EE FF": hdmi3
    "AA BB CC 81 06 00 87 DD EE FF": hdmi1
    "AA BB CC 81 07 00 88 DD EE FF": hdmi2
    "AA BB CC 81 0A 00 8B DD EE FF": android
    "AA BB CC 81 11 00 92 DD EE FF": dp
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions above
```

## Events
```yaml
# UNRESOLVED: no unsolicited event payloads documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command frame format: `0xAA 0xBB 0xCC [Main] [Subcommand] [Length] [Checksum] 0xDD 0xEE 0xFF`. Checksum = sum of Main + Subcommand + Length bytes (hex). Volume range 0–100 encoded as `xx` in payload. Remote emulation sends remote-control keystrokes directly to the panel OS.

<!-- UNRESOLVED: no TCP/IP, HTTP, or UDP transport variant stated -->
<!-- UNRESOLVED: no firmware version compatibility stated -->
<!-- UNRESOLVED: no unsolicited event or push notification format documented -->

## Provenance

```yaml
source_domains:
  - iiyama.com
  - cdn.iiyama.com
source_urls:
  - https://iiyama.com/f/3b30cd7d6a4bc40e1d229c327cda4d35_texx68-rs232-protocol-v1-0-2.pdf
  - https://cdn.iiyama.com/f/dcee9a0889b9f1e85fd5ac0fa77eaf96_lhxx54-rs232-lan-commands-improved-2023-08.pdf
retrieved_at: 2026-05-16T02:11:28.364Z
last_checked_at: 2026-05-16T12:16:08.505Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-16T12:16:08.505Z
matched_actions: 8
action_count: 8
confidence: high
summary: "All 8 spec actions matched in source with correct command codes and parameters; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
