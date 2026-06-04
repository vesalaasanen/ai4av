---
spec_id: admin/just-add-power-jpsw-100x100
schema_version: ai4av-public-spec-v1
revision: 2
title: "Just Add Power JPSW 100x100 Control Spec"
manufacturer: "Just Add Power"
model_family: JPSW_100x100
aliases: []
compatible_with:
  manufacturers:
    - "Just Add Power"
  models:
    - JPSW_100x100
  firmware: "B1.0.0 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices/
retrieved_at: 2026-05-12T09:53:32.970Z
last_checked_at: 2026-06-03T07:13:07.698Z
generated_at: 2026-06-03T07:13:07.698Z
firmware_coverage: "B1.0.0 or later"
protocol_coverage: []
known_gaps:
  - "the source document covers Omega & Ultra Series generically; specific JPSW_100x100 commands may differ"
  - "no query/feedback commands documented in source"
  - "flow control not stated in source"
  - "no query or response format documented in source"
  - "no settable parameters documented in source"
  - "no unsolicited notification format documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source"
  - "response/acknowledgement format not documented"
  - "command timing or rate limits not stated"
  - "whether commands persist through reboot varies; source is ambiguous"
  - "CLI Settings (boot-up behavior) are in a separate article not included here"
verification:
  verdict: verified
  checked_at: 2026-06-03T07:13:07.698Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All actions present in spec verified (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-12
---

# Just Add Power JPSW 100x100 Control Spec

## Summary
The Just Add Power JPSW 100x100 is an Omega/Ultra Series device controllable via Telnet (TCP port 23) or RS-232 serial (115200-8n1). This spec covers CLI commands for USB activation, decoder and encoder video control, and network stream management. Commands are case-sensitive and execute immediately but may not persist through reboot.

<!-- UNRESOLVED: the source document covers Omega & Ultra Series generically; specific JPSW_100x100 commands may differ -->
<!-- UNRESOLVED: no query/feedback commands documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No traits can be confidently inferred from the available source commands.
# - powerable: no dedicated power on/off command
# - queryable: no query commands documented
# - routable: no input/output routing commands documented
# - levelable: no volume/gain/brightness controls documented
```

## Actions
```yaml
- id: usb_start
  label: USB Activate
  kind: action
  params: []
  description: Initiate USB connection with connected Transmitter
  notes: Decoders only

- id: video_mute
  label: Video Mute
  kind: action
  params: []
  command: video mute
  description: Output black video and no audio
  notes: Decoders only

- id: video_off
  label: Video Off
  kind: action
  params: []
  command: video off
  description: "Decoder: disable HDMI output (TV reports no HDMI connected). Encoder: disable HDMI input (act as if no source connected)."

- id: video_on
  label: Video On
  kind: action
  params: []
  command: video on
  description: "Decoder: enable HDMI output. Encoder: enable HDMI input."

- id: video_pause
  label: Video Pause
  kind: action
  params: []
  command: video pause
  description: Freeze the last frame on screen
  notes: Decoders only

- id: video_play
  label: Video Play
  kind: action
  params: []
  command: video play
  description: Resume video (opposite of pause and mute)
  notes: Decoders only

- id: video_stop
  label: Video Stop
  kind: action
  params: []
  command: video stop
  description: Stop network services, go to debug screen
  notes: Decoders only

- id: video_start
  label: Video Start
  kind: action
  params: []
  command: video start
  description: Enable network services (opposite of stop)
  notes: Decoders only

- id: network_stop
  label: Network Stream Stop
  kind: action
  params: []
  command: stop
  description: Disable multicast network stream
  notes: Encoders only

- id: network_start
  label: Network Stream Start
  kind: action
  params: []
  command: start
  description: Enable multicast network stream (opposite of stop)
  notes: Encoders only
```

## Feedbacks
```yaml
# UNRESOLVED: no query or response format documented in source
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification format documented in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All commands are **case-sensitive**.
- Commands execute immediately but may not persist through reboot. For persistent settings, see the CLI Settings article (not included in this source).
- Requires justOS firmware version B1.0.0 or later.
- RS-232 accessed via a white 3-pin molex connector on the bottom of the unit; requires a debug cable.
- Some commands apply only to decoders (USB, video mute/pause/play/stop/start for network services) and others only to encoders (HDMI input control, multicast stream control).

<!-- UNRESOLVED: response/acknowledgement format not documented -->
<!-- UNRESOLVED: command timing or rate limits not stated -->
<!-- UNRESOLVED: whether commands persist through reboot varies; source is ambiguous -->
<!-- UNRESOLVED: CLI Settings (boot-up behavior) are in a separate article not included here -->

## Provenance

```yaml
source_domains:
  - support.justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices/
retrieved_at: 2026-05-12T09:53:32.970Z
last_checked_at: 2026-06-03T07:13:07.698Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T07:13:07.698Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All actions present in spec verified (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "the source document covers Omega & Ultra Series generically; specific JPSW_100x100 commands may differ"
- "no query/feedback commands documented in source"
- "flow control not stated in source"
- "no query or response format documented in source"
- "no settable parameters documented in source"
- "no unsolicited notification format documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source"
- "response/acknowledgement format not documented"
- "command timing or rate limits not stated"
- "whether commands persist through reboot varies; source is ambiguous"
- "CLI Settings (boot-up behavior) are in a separate article not included here"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
