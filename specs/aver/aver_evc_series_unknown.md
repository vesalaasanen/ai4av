---
spec_id: admin/aver-evc-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer EVC Series Control Spec"
manufacturer: AVer
model_family: PTZ310
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
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
retrieved_at: 2026-05-14T11:06:23.093Z
last_checked_at: 2026-06-02T21:40:21.233Z
generated_at: 2026-06-02T21:40:21.233Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RTSP port 554 listed but no RTSP command documentation in source"
  - "flow control not stated in source"
  - "no acknowledgement or response format documented for any command"
  - "no settable parameters documented"
  - "no unsolicited notifications documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:21.233Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "spec action count: 9 (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# AVer EVC Series Control Spec

## Summary
AVer Pro-AV camera series controllable via VISCA over IP (UDP) and RS-232/RS-422 serial. VISCA over IP uses port 52381; CGI uses port 80. Serial config: 9600 baud, 8 data bits, no parity, 1 stop bit. Supports power on/off, pan/tilt, zoom, tracking, and preset recall.

<!-- UNRESOLVED: RTSP port 554 listed but no RTSP command documentation in source -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA over IP control port; CGI port 80 listed but command syntax not documented
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable  # power on/off commands present
- routable  # tracking switch command present
- levelable  # pan/tilt/zoom commands present
- queryable  # inquiry packet format documented
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  description: "Hex: 01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  note: "PTZ310/PTZ330, TR311/333"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "Hex: 01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  note: "PTZ310/PTZ330, TR311/333"

- id: ptz_up
  label: PTZ Up
  kind: action
  params: []
  description: "Hex: 01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"

- id: ptz_stop
  label: PTZ Stop
  kind: action
  params: []
  description: "Hex: 01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  note: "Must be sent after any pan tilt movement command"

- id: camera_menu
  label: Camera Menu
  kind: action
  params: []
  description: "Hex: 01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  note: "TR530/TR320"

- id: tracking_enable
  label: Tracking Enable
  kind: action
  params: []
  note: "TR311/TR331 - full hex not documented"

- id: tracking_disable
  label: Tracking Disable
  kind: action
  params: []
  note: "TR311/TR331 - full hex not documented"

- id: tracking_switch
  label: Tracking Switch
  kind: action
  params: []
  description: "Switch which person camera is tracking when 2 people in shot"
  note: "TR311/TR331 - full hex not documented"

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number (1-based)"
  note: "TR530/TR320 - hex not fully documented"
```

## Feedbacks
```yaml
# UNRESOLVED: no acknowledgement or response format documented for any command
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# VISCA over IP packet structure: header + VISCA command
# Header: 01 00 00 [payload_length] 00 00 00 00
# Then VISCA command bytes, ending with FF
# Payload length varies by command type:
#   - Inquiry: 05
#   - Settings/framing: 07
#   - Command/movement: 09
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "After any pan tilt movement command, PT_Stop command must be sent to stop movement"
```

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:06:23.093Z
last_checked_at: 2026-06-02T21:40:21.233Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:21.233Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "spec action count: 9 (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RTSP port 554 listed but no RTSP command documentation in source"
- "flow control not stated in source"
- "no acknowledgement or response format documented for any command"
- "no settable parameters documented"
- "no unsolicited notifications documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
