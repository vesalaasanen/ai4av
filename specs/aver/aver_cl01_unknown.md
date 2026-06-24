---
spec_id: admin/aver-cl01
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer CL01 Camera Controller Control Spec"
manufacturer: AVer
model_family: CL01
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - CL01
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:16:34.473Z
last_checked_at: 2026-06-23T09:58:08.378Z
generated_at: 2026-06-23T09:58:08.378Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Only 5 VISCA over IP commands and 3 RS-232 commands are documented as byte sequences in the source. No pan-tilt direction commands other than Up/Stop, no zoom, focus, preset, or other commands are shown. No response/acknowledgement packet format is documented."
  - "data bits not stated in source; 8N1 is VISCA convention but not confirmed"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no acknowledgement or response packet formats are documented in the source."
  - "no settable parameter commands are documented in the source."
  - "no unsolicited notifications are documented in the source."
  - "no multi-step sequences are documented in the source."
  - "Full VISCA command set (zoom, focus, presets, white balance, exposure, etc.) not documented in source. No RS-232 data bits/parity/stop bits explicitly stated (9600 baud confirmed). No response packet format documented."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:58:08.378Z
  matched_actions: 5
  action_count: 5
  confidence: medium
  summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AVer CL01 Camera Controller Control Spec

## Summary
The AVer CL01 is a camera controller that issues VISCA commands to AVer PTZ cameras via VISCA over IP (UDP, port 52381) and RS-232 serial. This spec covers only the five concrete command examples the source documents as literal byte sequences: Power Off, Power On, Camera Menu (OSD toggle), Pan-Tilt Up, and Pan-Tilt Stop. The source is a generic app-note and does not constitute a full VISCA command reference.

<!-- UNRESOLVED: Only 5 VISCA over IP commands and 3 RS-232 commands are documented as byte sequences in the source. No pan-tilt direction commands other than Up/Stop, no zoom, focus, preset, or other commands are shown. No response/acknowledgement packet format is documented. -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA Control port, UDP, IPv4 - stated in source
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 9600  # stated in source ("Baude Rate: 9600, to start with")
  data_bits: 8  # UNRESOLVED: data bits not stated in source; 8N1 is VISCA convention but not confirmed
  parity: none  # UNRESOLVED: parity not stated in source
  stop_bits: 1  # UNRESOLVED: stop bits not stated in source
  flow_control: none  # UNRESOLVED: flow control not stated in source
```

## Traits
```yaml
- powerable   # inferred from power on/off command examples
```

## Actions
```yaml
# Wire format note: For VISCA over IP (UDP), each command is a full packet:
# 4-byte header (01 00 00 LL) + 4-byte sequence number (00 00 00 00) + VISCA payload.
# LL is the VISCA payload length in hex. The source shows identical byte sequences
# for both "Visca over IP" and "RS-232" sections - for RS-232 VISCA serial the
# packet header bytes are omitted and only the VISCA payload (81 ... FF) is sent.
# The source does not explicitly restate RS-232-only byte sequences for PT_Up/PT_Stop.

- id: power_off
  label: Power Off
  kind: action
  command: "hex: 01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  notes: >
    Full VISCA over IP packet (UDP port 52381). VISCA payload portion for RS-232: 81 01 04 00 03 FF.
    Source states TR530/320 does NOT support Power ON via VISCA over IP; Power Off support on TR530/320 not explicitly confirmed.
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "hex: 01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  notes: >
    Full VISCA over IP packet (UDP port 52381). VISCA payload portion for RS-232: 81 01 04 00 02 FF.
    Source explicitly notes TR530/320 does NOT support Power ON via VISCA over IP (works only via RS-232).
  params: []

- id: camera_menu_toggle
  label: Camera Menu / OSD Toggle
  kind: action
  command: "hex: 01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  notes: >
    Full VISCA over IP packet (UDP port 52381). VISCA payload portion for RS-232: 81 01 06 06 10 FF.
    Toggles the on-screen display (OSD) menu.
  params: []

- id: pt_up
  label: Pan-Tilt Up
  kind: action
  command: "hex: 01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  notes: >
    Full VISCA over IP packet (UDP port 52381). Source uses PT_Up as the primary worked example.
    Speed bytes are 08 08 (pan speed / tilt speed). Must be followed by PT_Stop to halt movement.
    RS-232 equivalent payload: 81 01 06 01 08 08 03 01 FF (source does not restate this for RS-232 section).
  params: []

- id: pt_stop
  label: Pan-Tilt Stop
  kind: action
  command: "hex: 01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  notes: >
    Full VISCA over IP packet (UDP port 52381). Source states this must be sent after any pan-tilt
    movement command to stop movement.
    RS-232 equivalent payload: 81 01 06 01 08 08 03 03 FF (source does not restate this for RS-232 section).
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no acknowledgement or response packet formats are documented in the source.
```

## Variables
```yaml
# UNRESOLVED: no settable parameter commands are documented in the source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications are documented in the source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: >
      After any pan-tilt movement command (e.g. PT_Up), a PT_Stop command must be sent
      to halt movement. Source states this explicitly.
```

## Notes
The source is a generic AVer Pro-AV VISCA app-note, not a CL01-specific command reference. The CL01 RS-232 pinout (9-pin DSub-M: Pin 2 RXD, Pin 3 TXD, Pin 5 GND/Shield) is documented. The app-note covers multiple camera models (PTZ310, PTZ330, TR311, TR331, TR333, TR530, TR320, TR311HN, TR313); the CL01 is identified as the controller issuing these commands. VISCA packet header bytes 3–4 encode the VISCA payload length (e.g. 00 09 = 9 bytes payload). The sequence number field (bytes 5–8) is shown as 00 00 00 00 in all examples. RS-232 protocol supports VISCA (up to 7 cameras), Pelco-P (up to 32), and Pelco-D (up to 256); this spec covers VISCA only.

<!-- UNRESOLVED: Full VISCA command set (zoom, focus, presets, white balance, exposure, etc.) not documented in source. No RS-232 data bits/parity/stop bits explicitly stated (9600 baud confirmed). No response packet format documented. -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:16:34.473Z
last_checked_at: 2026-06-23T09:58:08.378Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:58:08.378Z
matched_actions: 5
action_count: 5
confidence: medium
summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Only 5 VISCA over IP commands and 3 RS-232 commands are documented as byte sequences in the source. No pan-tilt direction commands other than Up/Stop, no zoom, focus, preset, or other commands are shown. No response/acknowledgement packet format is documented."
- "data bits not stated in source; 8N1 is VISCA convention but not confirmed"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no acknowledgement or response packet formats are documented in the source."
- "no settable parameter commands are documented in the source."
- "no unsolicited notifications are documented in the source."
- "no multi-step sequences are documented in the source."
- "Full VISCA command set (zoom, focus, presets, white balance, exposure, etc.) not documented in source. No RS-232 data bits/parity/stop bits explicitly stated (9600 baud confirmed). No response packet format documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
