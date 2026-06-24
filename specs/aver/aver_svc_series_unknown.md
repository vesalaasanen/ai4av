---
spec_id: admin/aver-svc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer SVC Series Control Spec"
manufacturer: AVer
model_family: "SVC Series"
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - "SVC Series"
    - PTZ310
    - PTZ330
    - TR311
    - TR311HN
    - TR313
    - TR331
    - TR333
    - TR530
    - TR320
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:17:58.757Z
last_checked_at: 2026-06-23T09:58:10.323Z
generated_at: 2026-06-23T09:58:10.323Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is a generic VISCA app-note with only worked examples. Full VISCA command set (zoom, focus, iris, preset recall, inquiry commands, etc.) is not documented in this source."
  - "data bits not explicitly stated; standard VISCA RS-232 assumption omitted per policy"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "no query/response byte sequences documented in this source."
  - "no settable parameter variables documented in this source."
  - "no unsolicited notifications documented in this source."
  - "no multi-step sequences documented in this source."
  - "no explicit safety warnings or interlock procedures in source."
  - "full VISCA command catalogue (zoom, focus, iris, presets, white balance, exposure, pan-tilt speed variants, inquiry responses) not covered by this source."
verification:
  verdict: verified
  checked_at: 2026-06-23T09:58:10.323Z
  matched_actions: 5
  action_count: 5
  confidence: medium
  summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-23
---

# AVer SVC Series Control Spec

## Summary
The AVer SVC Series are professional PTZ cameras controllable via VISCA over IP (UDP) or RS-232/RS-422 serial. This spec covers the concrete VISCA commands documented in the source as full byte sequences: power on/off, camera menu (OSD) toggle, pan-tilt up, and pan-tilt stop. The VISCA over IP transport uses UDP port 52381; RS-232 uses VISCA protocol at 9600 baud.

<!-- UNRESOLVED: source is a generic VISCA app-note with only worked examples. Full VISCA command set (zoom, focus, iris, preset recall, inquiry commands, etc.) is not documented in this source. -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA over IP control port, UDP, IPv4
serial:
  baud_rate: 9600
  data_bits: 8   # UNRESOLVED: data bits not explicitly stated; standard VISCA RS-232 assumption omitted per policy
  parity: null   # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable      # inferred from power on/off command examples
```

## Actions
```yaml
# Source: AVer Pro-AV Camera Control using Visca over IP UDP and RS-232 commands
# Only commands with literal hex byte sequences in the source are included.
# VISCA over IP packet format: 8-byte header + VISCA payload, terminated with FF.
# Header bytes 3-4 indicate payload length.
#
# NOTE: The source states the TR530/TR320 does NOT support Power ON via VISCA over IP;
# that command works only via RS-232 on those models.

- id: power_off
  label: Power Off
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  notes: >
    Full VISCA over IP packet (8-byte header + VISCA payload).
    Same byte sequence applies for RS-232 serial (VISCA protocol).
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  notes: >
    Full VISCA over IP packet. Also works via RS-232.
    NOT supported via VISCA over IP on TR530/TR320 models; use RS-232 for those.
  params: []

- id: camera_menu_toggle
  label: Camera Menu / OSD Toggle
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  notes: >
    Toggles the on-screen display (OSD) menu.
    Same byte sequence for VISCA over IP and RS-232.
  params: []

- id: pan_tilt_up
  label: Pan-Tilt Up (PT_Up)
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  notes: >
    Documented for VISCA over IP. Send PT_Stop (pan_tilt_stop) after this command
    to halt movement; continuous motion otherwise.
  params: []

- id: pan_tilt_stop
  label: Pan-Tilt Stop (PT_Stop)
  kind: action
  command: "hex:01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  notes: >
    Must be sent after any pan-tilt movement command to stop camera motion.
    Documented for VISCA over IP.
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query/response byte sequences documented in this source.
# The source mentions inquiry packets (e.g. 01 00 00 05 00 00 00 00 81 09 00 02 FF)
# but provides no response format or parsed field definitions.
```

## Variables
```yaml
# UNRESOLVED: no settable parameter variables documented in this source.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented in this source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in this source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source.
```

## Notes
- The VISCA over IP packet header is 8 bytes. Bytes 3–4 (0-indexed) carry the payload length. The worked examples in the source show length 0x0009 for 9-byte payloads (PT_Up, PT_Stop, Power On/Off, Menu) and 0x0005 for 5-byte inquiry payloads.
- RS-232 protocol supports up to 7 cameras (VISCA), 32 cameras (Pelco-P), or 256 cameras (Pelco-D) depending on the selected protocol. VISCA over IP supports up to 256 cameras on the same network subnet.
- RS-232 physical connector is Mini DIN8 (PTZ models) or Mini DIN6 (TR530/TR320) to 9-pin D-Sub.
- RS-422 variant uses RJ-45/Cat5E; set Control Type to RS422 via OSD menu.
- Baud rate is documented as 9600 as a starting point; other rates may be available via OSD.
- The CL01 Camera Controller RS-232 pinout: Pin 2 = RXD, Pin 3 = TXD, Pin 5 = GND/Shield (9-pin D-Sub male).
<!-- UNRESOLVED: full VISCA command catalogue (zoom, focus, iris, presets, white balance, exposure, pan-tilt speed variants, inquiry responses) not covered by this source. -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:17:58.757Z
last_checked_at: 2026-06-23T09:58:10.323Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-23T09:58:10.323Z
matched_actions: 5
action_count: 5
confidence: medium
summary: "All 5 spec actions matched verbatim VISCA command examples; transport port 52381 + 9600 baud verified. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is a generic VISCA app-note with only worked examples. Full VISCA command set (zoom, focus, iris, preset recall, inquiry commands, etc.) is not documented in this source."
- "data bits not explicitly stated; standard VISCA RS-232 assumption omitted per policy"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "no query/response byte sequences documented in this source."
- "no settable parameter variables documented in this source."
- "no unsolicited notifications documented in this source."
- "no multi-step sequences documented in this source."
- "no explicit safety warnings or interlock procedures in source."
- "full VISCA command catalogue (zoom, focus, iris, presets, white balance, exposure, pan-tilt speed variants, inquiry responses) not covered by this source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
