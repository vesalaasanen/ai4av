---
spec_id: admin/aver-cam550
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer CAM550 Control Spec"
manufacturer: AVer
model_family: CAM550
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - CAM550
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:08:57.103Z
last_checked_at: 2026-06-23T09:58:06.447Z
generated_at: 2026-06-23T09:58:06.447Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Only the five commands explicitly shown as byte sequences in the source are authored here. Zoom, focus, preset recall, and all other VISCA commands are not documented with byte sequences in this source and have been omitted to avoid fabrication."
  - "data bits not stated; 8N1 is VISCA convention but not confirmed in this source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no query-response sequences documented in this source"
  - "no settable parameters documented in this source"
  - "no unsolicited notifications documented in this source"
  - "no multi-step sequences described in this source"
  - "No full VISCA command catalogue (zoom, focus, presets, iris, white balance, etc.) is present in this app-note. Those commands cannot be authored without a separate byte-level reference."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:58:06.447Z
  matched_actions: 5
  action_count: 5
  confidence: medium
  summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AVer CAM550 Control Spec

## Summary
The AVer CAM550 is a Pro-AV PTZ camera controllable via VISCA over IP (UDP) and RS-232 (VISCA serial). This spec covers the concrete command examples provided in the source: Power Off, Power On, Camera Menu/OSD toggle, Pan-Tilt Up (PT_Up), and Pan-Tilt Stop (PT_Stop). The source is a generic AVer VISCA app-note and does not constitute a full VISCA command reference.

<!-- UNRESOLVED: Only the five commands explicitly shown as byte sequences in the source are authored here. Zoom, focus, preset recall, and all other VISCA commands are not documented with byte sequences in this source and have been omitted to avoid fabrication. -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA Control port stated in source
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 9600
  data_bits: 8   # UNRESOLVED: data bits not stated; 8N1 is VISCA convention but not confirmed in this source
  parity: none   # UNRESOLVED: parity not stated in source
  stop_bits: 1   # UNRESOLVED: stop bits not stated in source
  flow_control: none  # UNRESOLVED: flow control not stated in source
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
    Full VISCA over IP packet (header + VISCA payload). For RS-232, the source
    lists the same byte sequence. Header bytes 01 00 00 09 indicate payload
    length 0x0009.
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  notes: >
    Full VISCA over IP packet (header + VISCA payload). For RS-232, the source
    lists the same byte sequence. Note: TR530/320 cameras do NOT support Power
    On via VISCA over IP; it works only via RS-232 on those models.
  params: []

- id: camera_menu_toggle
  label: Camera Menu / OSD Toggle
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  notes: >
    Toggles the on-screen display (OSD) menu. Full VISCA over IP packet. For
    RS-232, the source lists the same byte sequence.
  params: []

- id: pt_up
  label: Pan-Tilt Up
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  notes: >
    Moves the camera upward. Must be followed by PT_Stop to halt movement.
    Speed bytes are fixed at 08 08 (pan speed / tilt speed) as shown in the
    source example; the source does not document parameterised speed variants.
  params: []

- id: pt_stop
  label: Pan-Tilt Stop
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  notes: >
    Stops all pan/tilt movement. Must be sent after any pan-tilt movement
    command (e.g. PT_Up).
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query-response sequences documented in this source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in this source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in this source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in this source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      After any pan-tilt movement command, a PT_Stop command must be sent to
      halt movement. Failure to send PT_Stop will leave the camera moving
      indefinitely.
```

## Notes
- The VISCA over IP header occupies the first 8 bytes of each packet. Bytes 3–4 (0-indexed) encode the VISCA payload length. For the commands in this spec, the value is 0x0009 (9 bytes).
- The RS-232 command examples in the source show the same byte sequences as the VISCA over IP examples (including the 8-byte header). This is unusual for native RS-232 VISCA, which typically omits the IP header; implementers should verify actual RS-232 framing against a live device.
- The source documents three RS-232 address ranges: VISCA (1–7 or 1–8 depending on model), Pelco-P (1–32), Pelco-D (0–255). This spec covers VISCA protocol only.
- RS-422 is also referenced in the source (RJ-45 Cat5E, Baud Rate 9600, Protocol VISCA). Transport parameters are the same as RS-232 VISCA.
- Camera address byte in the VISCA command is 0x81 (camera address 1). Multi-camera addressing would change this byte; not detailed in this source.
<!-- UNRESOLVED: No full VISCA command catalogue (zoom, focus, presets, iris, white balance, etc.) is present in this app-note. Those commands cannot be authored without a separate byte-level reference. -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:08:57.103Z
last_checked_at: 2026-06-23T09:58:06.447Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:58:06.447Z
matched_actions: 5
action_count: 5
confidence: medium
summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Only the five commands explicitly shown as byte sequences in the source are authored here. Zoom, focus, preset recall, and all other VISCA commands are not documented with byte sequences in this source and have been omitted to avoid fabrication."
- "data bits not stated; 8N1 is VISCA convention but not confirmed in this source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no query-response sequences documented in this source"
- "no settable parameters documented in this source"
- "no unsolicited notifications documented in this source"
- "no multi-step sequences described in this source"
- "No full VISCA command catalogue (zoom, focus, presets, iris, white balance, etc.) is present in this app-note. Those commands cannot be authored without a separate byte-level reference."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
