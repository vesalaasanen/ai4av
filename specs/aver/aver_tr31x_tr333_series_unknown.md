---
spec_id: admin/aver-tr31x-tr333-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer TR31x / TR333 Series Control Spec"
manufacturer: AVer
model_family: TR311
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - TR311
    - TR311HN
    - TR313
    - TR331
    - TR333
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:13:38.210Z
last_checked_at: 2026-06-23T09:58:12.310Z
generated_at: 2026-06-23T09:58:12.310Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Only a small subset of VISCA commands are documented in this app-note. Full VISCA command catalogue, acknowledgement/completion responses, and inquiry commands are not provided."
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no acknowledgement or query response formats documented in source"
  - "no settable parameters documented in source beyond what is covered by Actions"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures stated in source"
  - "full VISCA serial command byte sequences for RS-232 (the source shows identical payloads for the three commands present in both sections, but Pan-Tilt Up and PT_Stop are only shown for VISCA over IP)."
  - "complete data bits / parity / stop bits / flow control serial configuration not stated (only baud rate 9600 is given)."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:58:12.310Z
  matched_actions: 5
  action_count: 5
  confidence: medium
  summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AVer TR31x / TR333 Series Control Spec

## Summary

The AVer TR31x / TR333 Series are PTZ cameras supporting VISCA over IP (UDP port 52381) and VISCA over RS-232/RS-422 serial. This spec covers the concrete command examples documented in the source app-note: Power Off, Power On, Camera Menu (OSD toggle), Pan-Tilt Up, and Pan-Tilt Stop. It is NOT a full VISCA command reference — only commands with documented byte sequences are included.

<!-- UNRESOLVED: Only a small subset of VISCA commands are documented in this app-note. Full VISCA command catalogue, acknowledgement/completion responses, and inquiry commands are not provided. -->

## Transport

```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA Control port, UDP, IPv4
serial:
  baud_rate: 9600
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null     # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits

```yaml
- powerable   # inferred from power on/off command examples
```

## Actions

```yaml
- id: power_off
  label: Power Off
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  notes: >
    VISCA over IP full packet (4-byte header + VISCA payload). For RS-232 the
    VISCA payload bytes are the same (81 01 04 00 03 FF). TR530/320 does NOT
    support Power On via VISCA over IP but does support it via RS-232; no such
    restriction is noted for Power Off on these models.
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  notes: >
    VISCA over IP full packet (4-byte header + VISCA payload). For RS-232 the
    VISCA payload bytes are the same (81 01 04 00 02 FF). Note: TR530/320
    does NOT support this command via VISCA over IP (works only via RS-232);
    TR31x/TR333 restriction not stated.
  params: []

- id: camera_menu_osd_toggle
  label: Camera Menu (OSD Toggle)
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  notes: >
    VISCA over IP full packet. The source documents the same byte sequence
    under both the UDP and RS-232 sections.
  params: []

- id: pan_tilt_up
  label: Pan-Tilt Up (PT_Up)
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  notes: >
    VISCA over IP only. After sending any pan-tilt movement command, a
    PT_Stop command must be sent to halt movement.
  params: []

- id: pan_tilt_stop
  label: Pan-Tilt Stop (PT_Stop)
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  notes: >
    VISCA over IP only. Must be sent after every pan-tilt movement command to
    stop camera movement.
  params: []
```

## Feedbacks

```yaml
# UNRESOLVED: no acknowledgement or query response formats documented in source
```

## Variables

```yaml
# UNRESOLVED: no settable parameters documented in source beyond what is covered by Actions
```

## Events

```yaml
# UNRESOLVED: no unsolicited notifications documented in source
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

- The VISCA over IP header occupies the first 8 bytes of each packet. Bytes 3–4 (0-indexed) encode the payload length; the value varies by command type (e.g. 0x0005 for inquiry, 0x0007 for settings, 0x0009 for movement commands).
- VISCA Control port is 52381 UDP/IPv4. Verify this port is open on the network before use.
- RS-232 setup for TR311 / TR331 / TR333: Control Type = RS232, Protocol = VISCA, Camera Address 1–7, Baud Rate 9600.
- RS-422 is also supported on TR311 / TR311HN / TR313 / TR331 via RJ-45 Cat5E. Set Control Type = RS422, Protocol = VISCA, Baud Rate 9600 via OSD menu.
- Up to 7 cameras can be addressed with VISCA over RS-232; up to 256 cameras on the same network subnet via VISCA over IP.
- This app-note documents only a small set of example commands. The full VISCA command set for these cameras is not provided in this source.

<!-- UNRESOLVED: full VISCA serial command byte sequences for RS-232 (the source shows identical payloads for the three commands present in both sections, but Pan-Tilt Up and PT_Stop are only shown for VISCA over IP). -->
<!-- UNRESOLVED: complete data bits / parity / stop bits / flow control serial configuration not stated (only baud rate 9600 is given). -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:13:38.210Z
last_checked_at: 2026-06-23T09:58:12.310Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:58:12.310Z
matched_actions: 5
action_count: 5
confidence: medium
summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Only a small subset of VISCA commands are documented in this app-note. Full VISCA command catalogue, acknowledgement/completion responses, and inquiry commands are not provided."
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no acknowledgement or query response formats documented in source"
- "no settable parameters documented in source beyond what is covered by Actions"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures stated in source"
- "full VISCA serial command byte sequences for RS-232 (the source shows identical payloads for the three commands present in both sections, but Pan-Tilt Up and PT_Stop are only shown for VISCA over IP)."
- "complete data bits / parity / stop bits / flow control serial configuration not stated (only baud rate 9600 is given)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
