---
spec_id: admin/just-video-walls-ul-737poe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Just Video Walls UL 737Poe Control Spec"
manufacturer: "Just Video Walls"
model_family: "UL 737Poe"
aliases: []
compatible_with:
  manufacturers:
    - "Just Video Walls"
  models:
    - "UL 737Poe"
  firmware: "justOS B1.0.0 or later"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.justaddpower.com
  - justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices
  - https://www.justaddpower.com/products/ul-737poe/
  - https://support.justaddpower.com/
retrieved_at: 2026-07-24T19:22:06.478Z
last_checked_at: 2026-08-05T08:23:46.407Z
generated_at: 2026-08-05T08:23:46.407Z
firmware_coverage: "justOS B1.0.0 or later"
protocol_coverage: []
known_gaps:
  - "Source covers Omega & Ultra Series generically; UL 737Poe is not individually distinguished. Unclear whether UL 737Poe is an encoder, decoder, or transcoder — command applicability varies by role."
  - "flow control not stated in source"
  - "no query/response commands documented in source"
  - "no settable parameters documented in source"
  - "no unsolicited notifications documented in source"
  - "no multi-step sequences documented in source"
  - "no safety warnings or interlock procedures documented in source"
  - "flow control setting not stated in source"
  - "device role (encoder vs decoder vs transceiver) not specified for UL 737Poe"
  - "no query commands documented — device state cannot be read via CLI from this source"
verification:
  verdict: verified
  checked_at: 2026-08-05T08:23:46.407Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec commands map 1:1 to the 12 source entries; transport (port 23, 115200-8n1) matches verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Just Video Walls UL 737Poe Control Spec

## Summary
The Just Video Walls UL 737Poe is an Ultra Series device supporting CLI control via Telnet (TCP port 23) and RS-232 (3-pin Molex debug cable, 115200-8n1). This spec covers USB activation, video output control, and network service management commands. The device shares firmware and OS with the Omega Series.

<!-- UNRESOLVED: Source covers Omega & Ultra Series generically; UL 737Poe is not individually distinguished. Unclear whether UL 737Poe is an encoder, decoder, or transcoder — command applicability varies by role. -->

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
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# No traits supported by evidence from source.
# No power, routing, query, or level commands documented.
```

## Actions
```yaml
# All commands are case-sensitive.
# Commands execute immediately but may not persist through reboot.

# --- USB ---
- id: usb_start
  label: USB Activate
  kind: action
  command: "usb start"
  params: []
  notes: Initiates USB connection with connected transmitter. Applicable to decoder units.

# --- Decoder Video Control ---
- id: video_mute
  label: Video Mute
  kind: action
  command: "video mute"
  params: []
  notes: Outputs black video and no audio. Applicable to decoder units.

- id: video_off_decoder
  label: Decoder Video Off
  kind: action
  command: "video off"
  params: []
  notes: Disables HDMI output; TV reports as if no HDMI connected. Applicable to decoder units.

- id: video_on_decoder
  label: Decoder Video On
  kind: action
  command: "video on"
  params: []
  notes: Enables HDMI output. Opposite of `video off`. Applicable to decoder units.

- id: video_pause
  label: Video Pause
  kind: action
  command: "video pause"
  params: []
  notes: Freezes the last frame on screen. Applicable to decoder units.

- id: video_play
  label: Video Play
  kind: action
  command: "video play"
  params: []
  notes: Resumes video. Opposite of `pause` and `mute`. Applicable to decoder units.

- id: video_stop
  label: Decoder Video Stop
  kind: action
  command: "video stop"
  params: []
  notes: Stops network services and goes to debug screen. Applicable to decoder units.

- id: video_start
  label: Decoder Video Start
  kind: action
  command: "video start"
  params: []
  notes: Enables network services. Opposite of `video stop`. Applicable to decoder units.

# --- Encoder HDMI IN Control ---
- id: video_off_encoder
  label: Encoder HDMI Input Off
  kind: action
  command: "video off"
  params: []
  notes: Disables HDMI input; acts as if no source connected. Applicable to encoder units.

- id: video_on_encoder
  label: Encoder HDMI Input On
  kind: action
  command: "video on"
  params: []
  notes: Enables HDMI input. Opposite of encoder `video off`. Applicable to encoder units.

# --- Encoder Network Service Control ---
- id: network_stop
  label: Encoder Network Service Stop
  kind: action
  command: "stop"
  params: []
  notes: Disables multicast network stream. Applicable to encoder units.

- id: network_start
  label: Encoder Network Service Start
  kind: action
  command: "start"
  params: []
  notes: Enables multicast network stream. Opposite of `stop`. Applicable to encoder units.
```

## Feedbacks
```yaml
# UNRESOLVED: no query/response commands documented in source
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
# UNRESOLVED: no safety warnings or interlock procedures documented in source
```

## Notes
- Source covers Omega and Ultra Series devices generically; they share the same firmware and OS. UL 737Poe belongs to the Ultra Series.
- Source text references "Just Add Power" as the vendor; entity bootstrap token is "Just Video Walls".
- RS-232 access requires a 3-pin Molex debug cable (white connector on bottom of unit). Cable must be made or requested separately.
- Commands execute immediately but may not persist through reboot.
- All commands are case-sensitive.
- `video off` and `video on` serve different purposes depending on whether the unit is a decoder (HDMI output control) or encoder (HDMI input control). The command string is identical in both contexts.
<!-- UNRESOLVED: flow control setting not stated in source -->
<!-- UNRESOLVED: device role (encoder vs decoder vs transceiver) not specified for UL 737Poe -->
<!-- UNRESOLVED: no query commands documented — device state cannot be read via CLI from this source -->

## Provenance

```yaml
source_domains:
  - support.justaddpower.com
  - justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices
  - https://www.justaddpower.com/products/ul-737poe/
  - https://support.justaddpower.com/
retrieved_at: 2026-07-24T19:22:06.478Z
last_checked_at: 2026-08-05T08:23:46.407Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:23:46.407Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec commands map 1:1 to the 12 source entries; transport (port 23, 115200-8n1) matches verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Source covers Omega & Ultra Series generically; UL 737Poe is not individually distinguished. Unclear whether UL 737Poe is an encoder, decoder, or transcoder — command applicability varies by role."
- "flow control not stated in source"
- "no query/response commands documented in source"
- "no settable parameters documented in source"
- "no unsolicited notifications documented in source"
- "no multi-step sequences documented in source"
- "no safety warnings or interlock procedures documented in source"
- "flow control setting not stated in source"
- "device role (encoder vs decoder vs transceiver) not specified for UL 737Poe"
- "no query commands documented — device state cannot be read via CLI from this source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
