---
spec_id: admin/aver-cam520-pro
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer CAM520 PRO Control Spec"
manufacturer: AVer
model_family: "CAM520 PRO"
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - "CAM520 PRO"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:07:27.324Z
last_checked_at: 2026-06-23T09:54:27.811Z
generated_at: 2026-06-23T09:54:27.811Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial settings (data bits, parity, stop bits, flow control) not stated in source — baud rate 9600 is stated. RS-232 PT_Up and PT_Stop commands not shown in source's RS-232 section. Full VISCA command catalogue not provided."
  - "not stated in source"
  - "no query responses or state feedback documented in source"
  - "no settable parameters documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "full VISCA command catalogue (zoom, focus, presets, white balance, exposure, etc.) not present in this source document. RS-232 serial framing parameters (data bits, parity, stop bits) not stated."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:54:27.811Z
  matched_actions: 8
  action_count: 8
  confidence: medium
  summary: "All 8 spec actions matched verbatim; transport UDP 52381 + RS-232 9600 confirmed; faithful coverage of documented command examples. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AVer CAM520 PRO Control Spec

## Summary
The AVer CAM520 PRO is a Pro-AV PTZ camera controllable via VISCA over IP (UDP, port 52381) and RS-232 serial (VISCA protocol). This spec covers the command examples explicitly shown in the source: Power Off, Power On, Camera Menu/OSD toggle, Pan-Tilt Up, and Pan-Tilt Stop (the last two are documented for UDP/IP only in the source).

<!-- UNRESOLVED: RS-232 serial settings (data bits, parity, stop bits, flow control) not stated in source — baud rate 9600 is stated. RS-232 PT_Up and PT_Stop commands not shown in source's RS-232 section. Full VISCA command catalogue not provided. -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA Control port, UDP, IPv4
serial:
  baud_rate: 9600
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null     # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
  flow_control: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable   # inferred from power on/off command examples
```

## Actions
```yaml
# UDP (VISCA over IP) commands - full packet = IP header + VISCA command
- id: power_off_udp
  label: Power Off (UDP)
  kind: action
  transport: udp
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  params: []

- id: power_on_udp
  label: Power On (UDP)
  kind: action
  transport: udp
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  params: []

- id: camera_menu_osd_toggle_udp
  label: Camera Menu / OSD Toggle (UDP)
  kind: action
  transport: udp
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  params: []

- id: pt_up_udp
  label: Pan-Tilt Up / PT_Up (UDP)
  kind: action
  transport: udp
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  params: []
  notes: >
    After sending any pan-tilt movement command, a PT_Stop command must be sent
    to stop movement.

- id: pt_stop_udp
  label: Pan-Tilt Stop / PT_Stop (UDP)
  kind: action
  transport: udp
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  params: []

# RS-232 (VISCA serial) commands - source shows these three only
- id: power_off_serial
  label: Power Off (RS-232)
  kind: action
  transport: serial
  command: "hex:81 01 04 00 03 FF"
  params: []
  notes: >
    Source shows the same byte sequence as the UDP command for this operation;
    the VISCA command portion is 81 01 04 00 03 FF.

- id: power_on_serial
  label: Power On (RS-232)
  kind: action
  transport: serial
  command: "hex:81 01 04 00 02 FF"
  params: []
  notes: >
    Source notes that TR530/320 does NOT support Power ON via VISCA over IP,
    but it does work via RS-232.

- id: camera_menu_osd_toggle_serial
  label: Camera Menu / OSD Toggle (RS-232)
  kind: action
  transport: serial
  command: "hex:81 01 06 06 10 FF"
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query responses or state feedback documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source
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
interlocks:
  - description: >
      After any pan-tilt movement command (e.g. PT_Up), a PT_Stop command must
      be sent to halt movement. The source explicitly states this requirement.
```

## Notes
The source is a generic AVer Pro-AV VISCA app-note covering multiple camera models (PTZ310, PTZ330, TR311, TR331, TR333, TR530, TR320, etc.) with VISCA over IP and RS-232 examples. It is not a CAM520 PRO-specific manual.

VISCA over IP packet structure: bytes 1–2 are the payload type (01 00), bytes 3–4 are the payload length (e.g. 00 09 = 9 bytes for movement commands), bytes 5–8 are the sequence number (00 00 00 00), followed by the VISCA command bytes.

RS-232 serial connection uses a Mini DIN connector; baud rate 9600 is confirmed by the source. Data bits, parity, stop bits, and flow control are not stated.

The source does not show PT_Up or PT_Stop in its RS-232 command examples section — those commands appear only in the UDP section. The three RS-232 command examples (Power Off, Power On, Camera Menu) carry identical VISCA byte payloads to the UDP versions; the full UDP packet shown in the source includes the IP header prefix.

<!-- UNRESOLVED: full VISCA command catalogue (zoom, focus, presets, white balance, exposure, etc.) not present in this source document. RS-232 serial framing parameters (data bits, parity, stop bits) not stated. -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:07:27.324Z
last_checked_at: 2026-06-23T09:54:27.811Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:54:27.811Z
matched_actions: 8
action_count: 8
confidence: medium
summary: "All 8 spec actions matched verbatim; transport UDP 52381 + RS-232 9600 confirmed; faithful coverage of documented command examples. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial settings (data bits, parity, stop bits, flow control) not stated in source — baud rate 9600 is stated. RS-232 PT_Up and PT_Stop commands not shown in source's RS-232 section. Full VISCA command catalogue not provided."
- "not stated in source"
- "no query responses or state feedback documented in source"
- "no settable parameters documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "full VISCA command catalogue (zoom, focus, presets, white balance, exposure, etc.) not present in this source document. RS-232 serial framing parameters (data bits, parity, stop bits) not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
