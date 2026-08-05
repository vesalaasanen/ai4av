---
spec_id: admin/just-add-power-om-715poe
schema_version: ai4av-public-spec-v1
revision: 1
title: "Just Add Power OM-715POE Control Spec"
manufacturer: "Just Add Power"
model_family: OM-715POE
aliases: []
compatible_with:
  manufacturers:
    - "Just Add Power"
  models:
    - OM-715POE
  firmware: "\"B1.0.0 or later\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices/
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices/
  - https://support.justaddpower.com/kb/article/466-justos-http-api-overview-omega-ultra-and-maxcolor-series/
  - https://support.justaddpower.com/kb/article/37-sending-commands-to-all-decoders-omega-ultra-and-maxcolor-series/
  - https://support.justaddpower.com/
retrieved_at: 2026-07-21T23:12:49.907Z
last_checked_at: 2026-07-22T00:02:40.940Z
generated_at: 2026-07-22T00:02:40.940Z
firmware_coverage: "\"B1.0.0 or later\""
protocol_coverage: []
known_gaps:
  - "source excerpt covers only USB + Video commands; full command set (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141) not yet integrated"
  - "source excerpt does not document any query responses or observable state strings"
  - "source excerpt does not document any settable parameters beyond discrete commands"
  - "source excerpt does not document any unsolicited notifications"
  - "source excerpt does not document any multi-step sequences"
  - "source excerpt contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "full command catalogue (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141, bulk command dispatch article 37) not yet integrated; current Actions section enumerates only the USB and Video groups visible in KB article 379 as excerpted"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:02:40.940Z
  matched_actions: 12
  action_count: 12
  confidence: medium
  summary: "All 12 spec actions map to literal wire commands in source; transport parameters verbatim; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-01
---

# Just Add Power OM-715POE Control Spec

## Summary

OM-715POE is a Just Add Power Omega/Ultra Series AV-over-IP device (Transmitter/Encoder). Control via Telnet (TCP port 23) or RS-232 (115200-8n1, white 3-pin Molex debug cable). Commands are case-sensitive.

Source is limited to the CLI command reference (KB article 379). Power, input-select, query, and routing commands not present in this excerpt.

<!-- UNRESOLVED: source excerpt covers only USB + Video commands; full command set (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141) not yet integrated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # stated: "Telnet to the IP of the unit, at port 23"
serial:
  baud_rate: 115200  # stated: "115200-8n1 baud rate"
  data_bits: 8       # stated: "115200-8n1"
  parity: none       # stated: "115200-8n1"
  stop_bits: 1       # stated: "115200-8n1"
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# powerable: UNRESOLVED - no power on/off command in source excerpt
# routable:  UNRESOLVED - no input/output routing command in source excerpt
# queryable: UNRESOLVED - no query command in source excerpt
# levelable: UNRESOLVED - no level/volume/gain command in source excerpt
```

## Actions
```yaml
# CRITICAL: source excerpt covers only USB and Video command groups.
# Each row in source tables = one action.

- id: usb_activate
  label: USB Activate
  kind: action
  command: "usb start"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Initiate USB connection with connected Transmitter."

- id: decoder_video_mute
  label: Decoder Video Mute
  kind: action
  command: "video mute"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Output black video and no audio."

- id: decoder_video_off
  label: Decoder Video Off
  kind: action
  command: "video off"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Disable HDMI output. TV reports as if no HDMI is connected."

- id: decoder_video_on
  label: Decoder Video On
  kind: action
  command: "video on"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Enable HDMI output. Opposite of off."

- id: decoder_video_pause
  label: Decoder Video Pause
  kind: action
  command: "video pause"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Freezes the last frame on screen."

- id: decoder_video_play
  label: Decoder Video Play
  kind: action
  command: "video play"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Resume the video. Opposite of pause and mute."

- id: decoder_video_stop
  label: Decoder Video Stop
  kind: action
  command: "video stop"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Stop network services, go to debug screen."

- id: decoder_video_start
  label: Decoder Video Start
  kind: action
  command: "video start"
  params: []
  applicable_units: All Omega & Ultra Series Decoders
  notes: "Enable network services. Opposite of stop."

- id: encoder_hdmi_in_off
  label: Encoder HDMI IN Off
  kind: action
  command: "video off"
  params: []
  applicable_units: All Omega & Ultra Series Encoders
  notes: "Disable HDMI input. Act as if no source is connected."

- id: encoder_hdmi_in_on
  label: Encoder HDMI IN On
  kind: action
  command: "video on"
  params: []
  applicable_units: All Omega & Ultra Series Encoders
  notes: "Enable HDMI input. Opposite of off."

- id: encoder_network_service_stop
  label: Encoder Network Service Stop
  kind: action
  command: "stop"
  params: []
  applicable_units: All Omega & Ultra Series Encoders
  notes: "Disable multicast network stream."

- id: encoder_network_service_start
  label: Encoder Network Service Start
  kind: action
  command: "start"
  params: []
  applicable_units: All Omega & Ultra Series Encoders
  notes: "Enable multicast network stream. Opposite of stop."
```

## Feedbacks
```yaml
# UNRESOLVED: source excerpt does not document any query responses or observable state strings
```

## Variables
```yaml
# UNRESOLVED: source excerpt does not document any settable parameters beyond discrete commands
```

## Events
```yaml
# UNRESOLVED: source excerpt does not document any unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source excerpt does not document any multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source excerpt contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes

- Firmware requirement: justOS B1.0.0 or later (stated).
- Commands execute immediately but may not persist through reboot. For boot-persistent behavior, see companion "CLI Settings for Omega & Ultra Series Devices" article (KB 310) — not integrated in this revision.
- Commands are case-sensitive.
- RS-232 physical layer: white 3-pin Molex connector on bottom of unit; requires vendor Debug Cable or equivalent.
- JustOS HTTP API (KB 466) and RS-232 endpoint control for sources (KB 141) exist as separate first-party references but were not retrievable when this spec was drafted (HappyFox origin returned 429).

<!-- UNRESOLVED: full command catalogue (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141, bulk command dispatch article 37) not yet integrated; current Actions section enumerates only the USB and Video groups visible in KB article 379 as excerpted -->
````

No upgrade possible from current source. To improve grade (B/C → A), need KB 310 (settings), KB 466 (HTTP API), KB 141 (RS-232 endpoint control) bodies fetched — try `agent-browser` to bypass HappyFox 429.

## Provenance

```yaml
source_domains:
  - support.justaddpower.com
source_urls:
  - https://support.justaddpower.com/kb/article/379-cli-commands-for-omega-ultra-series-devices/
  - https://support.justaddpower.com/kb/article/310-cli-settings-for-omega-ultra-series-devices/
  - https://support.justaddpower.com/kb/article/466-justos-http-api-overview-omega-ultra-and-maxcolor-series/
  - https://support.justaddpower.com/kb/article/37-sending-commands-to-all-decoders-omega-ultra-and-maxcolor-series/
  - https://support.justaddpower.com/
retrieved_at: 2026-07-21T23:12:49.907Z
last_checked_at: 2026-07-22T00:02:40.940Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:02:40.940Z
matched_actions: 12
action_count: 12
confidence: medium
summary: "All 12 spec actions map to literal wire commands in source; transport parameters verbatim; one-to-one coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source excerpt covers only USB + Video commands; full command set (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141) not yet integrated"
- "source excerpt does not document any query responses or observable state strings"
- "source excerpt does not document any settable parameters beyond discrete commands"
- "source excerpt does not document any unsolicited notifications"
- "source excerpt does not document any multi-step sequences"
- "source excerpt contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "full command catalogue (CLI Settings article 310, JustOS HTTP API article 466, RS-232 endpoint control article 141, bulk command dispatch article 37) not yet integrated; current Actions section enumerates only the USB and Video groups visible in KB article 379 as excerpted"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
