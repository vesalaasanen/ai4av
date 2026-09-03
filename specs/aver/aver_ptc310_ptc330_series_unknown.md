---
spec_id: admin/aver-ptc310-ptc330-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "AVer PTC310/PTC330 Series Control Spec"
manufacturer: AVer
model_family: PTC310
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - PTC310
    - PTC330
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
retrieved_at: 2026-09-02T17:48:12.409Z
last_checked_at: 2026-09-02T22:17:06.453Z
generated_at: 2026-09-02T22:17:06.453Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not list payload bytes for Tracking Enable/Disable, Recall Preset #1, or Switch Tracking Target."
  - "source lists protocols VISCA, Pelco-P, Pelco-D, and VISCA over IP for RS-232/RS-422 but only provides payloads for VISCA; Pelco-P/D payload bytes not in source."
  - "not stated in source"
  - "source names \"Recall Preset #1\" but provides no payload bytes"
  - "source names \"Tracking Enable\" but provides no payload bytes"
  - "source names \"Tracking Disable\" but provides no payload bytes"
  - "source names \"Switch Command\" but provides no payload bytes"
  - "source does not enumerate specific inquiry response formats beyond the generic inquiry command example"
  - "source does not list settable parameters beyond the framing-setting example"
  - "source does not describe unsolicited notifications"
  - "source does not describe multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "full VISCA command set (other pan/tilt directions, focus, zoom, exposure, white balance, presets 2-N) not in source; VISCA spec itself would supply these but is not quoted."
verification:
  verdict: verified
  checked_at: 2026-09-02T22:17:06.453Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions (hex payloads or named-only) appear verbatim in the refined source; transport port and baud match. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# AVer PTC310/PTC330 Series Control Spec

## Summary
AVer Pro-AV PTZ and tracking cameras (PTC310, PTC330, TR311/313/331/333, TR530, TR320) controlled via VISCA over IP (UDP, port 52381) and RS-232/RS-422 at 9600 baud. Source documents only a small subset of VISCA commands (power, pan/tilt up, pan/tilt stop, camera menu); tracking, preset recall, and switch target are named only.

<!-- UNRESOLVED: source does not list payload bytes for Tracking Enable/Disable, Recall Preset #1, or Switch Tracking Target. -->
<!-- UNRESOLVED: source lists protocols VISCA, Pelco-P, Pelco-D, and VISCA over IP for RS-232/RS-422 but only provides payloads for VISCA; Pelco-P/D payload bytes not in source. -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381
serial:
  baud_rate: 9600
  flow_control: none  # UNRESOLVED: not stated in source
  data_bits: null  # UNRESOLVED: not stated in source
  parity: null  # UNRESOLVED: not stated in source
  stop_bits: null  # UNRESOLVED: not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from power on/off commands
- queryable       # inferred from VISCA inquiry command example
```

## Actions
```yaml
- id: power_on
  label: Power On (PTC310/PTC330, TR311/313/331/333, TR530/TR320)
  kind: action
  command: "01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  params: []

- id: power_off
  label: Power Off (PTC310/PTC330, TR311/313/331/333, TR530/TR320)
  kind: action
  command: "01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  params: []

- id: pan_tilt_up
  label: Pan/Tilt Up
  kind: action
  command: "01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  params: []

- id: pan_tilt_stop
  label: Pan/Tilt Stop
  kind: action
  command: "01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  params: []

- id: camera_menu
  label: Camera Menu (TR530/TR320)
  kind: action
  command: "01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  params: []

- id: inquiry_command
  label: VISCA Inquiry (generic info)
  kind: query
  command: "01 00 00 05 00 00 00 00 81 09 00 02 FF"
  params: []

- id: framing_command
  label: VISCA Framing/Setting (generic)
  kind: action
  command: "01 00 00 07 00 00 00 00 81 01 04 7D 00 00 FF"
  params: []

- id: recall_preset_1
  label: Recall Preset #1 (TR530/TR320)
  kind: action
  command: null  # UNRESOLVED: source names "Recall Preset #1" but provides no payload bytes
  params: []

- id: tracking_enable
  label: Tracking Enable (TR311/TR331)
  kind: action
  command: null  # UNRESOLVED: source names "Tracking Enable" but provides no payload bytes
  params: []

- id: tracking_disable
  label: Tracking Disable (TR311/TR331)
  kind: action
  command: null  # UNRESOLVED: source names "Tracking Disable" but provides no payload bytes
  params: []

- id: switch_target
  label: Switch Tracking Target (TR311/TR331)
  kind: action
  command: null  # UNRESOLVED: source names "Switch Command" but provides no payload bytes
  params: []
```

## Feedbacks
```yaml
# UNRESOLVED: source does not enumerate specific inquiry response formats beyond the generic inquiry command example
```

## Variables
```yaml
# UNRESOLVED: source does not list settable parameters beyond the framing-setting example
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited notifications
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
VISCA over IP header: bytes 3-4 encode payload length and vary per command (e.g. `00 05` for inquiry, `00 07` for framing, `00 09` for movements). RS-232/RS-422 default baud 9600, VISCA protocol, camera address 1-7 (PTC310/330, TR311/313/331/333) or 1-8 (TR530/TR320). RS-232/RS-422 also support Pelco-P (up to 32 cameras) and Pelco-D (up to 256 cameras, address 0-255) per OSD menu but payloads are not documented in this source. Pinout for AVer CL01 controller RS-232 (9-pin DSub-M): Pin 2 RXD, Pin 3 TXD, Pin 5 GND/Shield. RS-232 cable part numbers: PTRSINOUT (Din9-M to 2× Din8-F Y-cable for daisy-chain), PTDIN8PT1 (Din8-M to 9-Pin DSub-F), COMVCC232 (Din6-M to 9-Pin DSub-F for TR530/320). CGI port 80, RTSP port 554 noted but no CGI/RTSP command set in source.
<!-- UNRESOLVED: full VISCA command set (other pan/tilt directions, focus, zoom, exposure, white balance, presets 2-N) not in source; VISCA spec itself would supply these but is not quoted. -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-09-02T17:48:12.409Z
last_checked_at: 2026-09-02T22:17:06.453Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-02T22:17:06.453Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions (hex payloads or named-only) appear verbatim in the refined source; transport port and baud match. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not list payload bytes for Tracking Enable/Disable, Recall Preset #1, or Switch Tracking Target."
- "source lists protocols VISCA, Pelco-P, Pelco-D, and VISCA over IP for RS-232/RS-422 but only provides payloads for VISCA; Pelco-P/D payload bytes not in source."
- "not stated in source"
- "source names \"Recall Preset #1\" but provides no payload bytes"
- "source names \"Tracking Enable\" but provides no payload bytes"
- "source names \"Tracking Disable\" but provides no payload bytes"
- "source names \"Switch Command\" but provides no payload bytes"
- "source does not enumerate specific inquiry response formats beyond the generic inquiry command example"
- "source does not list settable parameters beyond the framing-setting example"
- "source does not describe unsolicited notifications"
- "source does not describe multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "full VISCA command set (other pan/tilt directions, focus, zoom, exposure, white balance, presets 2-N) not in source; VISCA spec itself would supply these but is not quoted."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
