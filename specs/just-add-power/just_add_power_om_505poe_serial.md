---
spec_id: admin/just-add-power-om-505poe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Just Add Power Om 505Poe Control Spec"
manufacturer: "Just Add Power"
model_family: "Om 505Poe"
aliases: []
compatible_with:
  manufacturers:
    - "Just Add Power"
  models:
    - "Om 505Poe"
  firmware: "\"B1.0.0\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.justaddpower.com
  - justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices
  - https://www.justaddpower.com/products/om-505poe/
  - https://support.justaddpower.com
retrieved_at: 2026-07-01T13:53:05.868Z
last_checked_at: 2026-07-07T11:46:00.319Z
generated_at: 2026-07-07T11:46:00.319Z
firmware_coverage: "\"B1.0.0\""
protocol_coverage: []
known_gaps:
  - "flow control not stated in source"
  - "no query commands or response strings documented in source"
  - "no settable parameters documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures in source."
  - "flow_control not stated in source"
  - "no CLI Settings (boot-persistent) commands in this source"
  - "no query/response protocol documented"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:46:00.319Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions found verbatim in source; transport parameters (TCP port 23, RS-232 115200-8n1) verified; complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# Just Add Power Om 505Poe Control Spec

## Summary
Omega Series HDBaseT transmitter/receiver with RS-232C and Telnet (TCP port 23) command-line control. Spec covers USB activation, video output state control (decoder), HDMI input control (encoder), and multicast network stream control. All commands case-sensitive and alter live device behavior but may not persist through reboot.

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # Telnet to IP of unit
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: video on/off commands
```

## Actions
```yaml
actions:
  - id: usb_start
    label: USB Activate
    kind: action
    command: "usb start"
    description: Initiate USB connection with connected Transmitter.
    params: []
  - id: decoder_video_mute
    label: Decoder Video Mute
    kind: action
    command: "video mute"
    description: Output black video and no audio. Applies to decoders.
    params: []
  - id: decoder_video_off
    label: Decoder Video Off
    kind: action
    command: "video off"
    description: Disable HDMI output. TV reports as if no HDMI is connected. Applies to decoders.
    params: []
  - id: decoder_video_on
    label: Decoder Video On
    kind: action
    command: "video on"
    description: Enable HDMI output. Opposite of off. Applies to decoders.
    params: []
  - id: decoder_video_pause
    label: Decoder Video Pause
    kind: action
    command: "video pause"
    description: Freezes the last frame on screen. Applies to decoders.
    params: []
  - id: decoder_video_play
    label: Decoder Video Play
    kind: action
    command: "video play"
    description: Resume the video. Opposite of pause and mute. Applies to decoders.
    params: []
  - id: decoder_video_stop
    label: Decoder Video Stop
    kind: action
    command: "video stop"
    description: Stop network services, go to debug screen. Applies to decoders.
    params: []
  - id: decoder_video_start
    label: Decoder Video Start
    kind: action
    command: "video start"
    description: Enable network services. Opposite of stop. Applies to decoders.
    params: []
  - id: encoder_hdmi_in_off
    label: Encoder HDMI In Off
    kind: action
    command: "video off"
    description: Disable HDMI input. Act as if no source is connected. Applies to encoders.
    params: []
  - id: encoder_hdmi_in_on
    label: Encoder HDMI In On
    kind: action
    command: "video on"
    description: Enable HDMI input. Opposite of off. Applies to encoders.
    params: []
  - id: encoder_network_stop
    label: Encoder Network Stream Stop
    kind: action
    command: "stop"
    description: Disable multicast network stream. Applies to encoders.
    params: []
  - id: encoder_network_start
    label: Encoder Network Stream Start
    kind: action
    command: "start"
    description: Enable multicast network stream. Opposite of stop. Applies to encoders.
    params: []
```

## Feedbacks
```yaml
# UNRESOLVED: no query commands or response strings documented in source
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
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
# Note: source warns commands "may not persist through reboot" - not a safety interlock.
```

## Notes
- Omega and Ultra Series devices share the same firmware and operating system.
- Commands execute immediately but may not persist through reboot. Settings that alter boot-up behavior are covered in a separate "CLI Settings" article (not in this source).
- Requires justOS firmware version B1.0.0 or later.
- All commands are **case-sensitive**.
- RS-232C requires a physical Debug Cable (white, 3-pin molex connector on bottom of unit).
- Same `video on`/`video off` payload applies to both decoders (HDMI output) and encoders (HDMI input) — semantics depend on device role.
- Source documents only the listed commands; no query/feedback, routing, volume, or power-cycle payloads present.

<!-- UNRESOLVED: flow_control not stated in source -->
<!-- UNRESOLVED: no CLI Settings (boot-persistent) commands in this source -->
<!-- UNRESOLVED: no query/response protocol documented -->

## Provenance

```yaml
source_domains:
  - support.justaddpower.com
  - justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices
  - https://www.justaddpower.com/products/om-505poe/
  - https://support.justaddpower.com
retrieved_at: 2026-07-01T13:53:05.868Z
last_checked_at: 2026-07-07T11:46:00.319Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:46:00.319Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions found verbatim in source; transport parameters (TCP port 23, RS-232 115200-8n1) verified; complete coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "flow control not stated in source"
- "no query commands or response strings documented in source"
- "no settable parameters documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures in source."
- "flow_control not stated in source"
- "no CLI Settings (boot-persistent) commands in this source"
- "no query/response protocol documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
