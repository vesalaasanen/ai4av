---
spec_id: admin/aver-mt300n
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer MT300N Control Spec"
manufacturer: AVer
model_family: MT300N
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - MT300N
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
retrieved_at: 2026-05-14T11:15:51.922Z
last_checked_at: 2026-10-07T13:04:41.675Z
generated_at: 2026-10-07T13:04:41.675Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "full VISCA command set not enumerated in source"
  - "RTSP port 554 noted but RTSP control not documented"
  - "data bits, parity, stop bits for RS-232 not explicitly stated"
  - "CGI port 80 listed with UDP transport - HTTP over UDP unclear, marking port only"
  - "data_bits, parity, stop_bits not stated in source"
  - "traits inferred from command examples present"
  - "response formats not documented in source"
  - "no settable parameters enumerated in source"
  - "no unsolicited event documentation in source"
  - "no safety warnings or interlock procedures in source"
  - "full VISCA command vocabulary not enumerated"
  - "Pelco-P/D protocols mentioned but commands not provided"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:04:41.675Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 spec actions map one-to-one to source commands with matching hex and transport values (UDP, port 52381, 9600 baud); the source documents no further commands. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# AVer MT300N Control Spec

## Summary
AVer Pro-AV camera controllable via VISCA over IP (UDP) and RS-232/RS-422 serial. Supports power, pan-tilt, tracking, and preset control. Network control uses UDP on port 52381 (VISCA) and port 80 (CGI). Serial runs VISCA protocol at 9600 baud.

<!-- UNRESOLVED: full VISCA command set not enumerated in source -->
<!-- UNRESOLVED: RTSP port 554 noted but RTSP control not documented -->
<!-- UNRESOLVED: data bits, parity, stop bits for RS-232 not explicitly stated -->

## Transport
```yaml
protocols:
  - udp
  - serial
addressing:
  port: 52381  # VISCA over IP control port
  # UNRESOLVED: CGI port 80 listed with UDP transport - HTTP over UDP unclear, marking port only
serial:
  baud_rate: 9600  # stated for RS-232 and RS-422
  # UNRESOLVED: data_bits, parity, stop_bits not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
# UNRESOLVED: traits inferred from command examples present
# powerable: power on/off commands documented
# routable: pan-tilt directional commands present
# queryable: inquiry command format present (header 01 00 00 05)
```

## Actions
```yaml
# VISCA over IP and RS-232 share same command encoding.
# Header format (8 bytes): 01 00 00 [payload_len] 00 00 00 00
# VISCA command: [address] [category] [command] [value] FF
# Example - Power On (PTZ310/PTZ330, TR311/333):
#   01 00 00 09 00 00 00 00 81 01 04 00 02 FF
# Example - Power Off:
#   01 00 00 09 00 00 00 00 81 01 04 00 03 FF
# Example - PT_Up (pan tilt up):
#   01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF
# Example - PT_Stop (after pan tilt movement):
#   01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF
# Example - Camera Menu (TR530/320):
#   01 00 00 09 00 00 00 00 81 01 06 06 10 FF

- id: power_on
  label: Power On
  kind: action
  params: []
  description: "VISCA: 81 01 04 00 02 FF"

- id: power_off
  label: Power Off
  kind: action
  params: []
  description: "VISCA: 81 01 04 00 03 FF"

- id: ptz_up
  label: PT Up
  kind: action
  params: []
  description: "Pan-tilt up. Must send PT_Stop after movement."

- id: ptz_stop
  label: PT Stop
  kind: action
  params: []
  description: "Stop pan-tilt movement. VISCA: 81 01 06 01 08 08 03 03 FF"

- id: camera_menu
  label: Camera Menu
  kind: action
  params: []
  description: "Open OSD menu (TR530/320). VISCA: 81 01 06 06 10 FF"

- id: tracking_enable
  label: Tracking Enable
  kind: action
  params: []
  description: "Enable auto-tracking (TR311/TR331)."

- id: tracking_disable
  label: Tracking Disable
  kind: action
  params: []
  description: "Disable auto-tracking (TR311/TR331)."

- id: tracking_switch
  label: Tracking Switch
  kind: action
  params: []
  description: "Switch tracking subject (2 people in shot)."

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number (1-based)"

- id: inquiry_info
  label: Inquiry Info
  kind: action
  params: []
  description: "Inquiry (listed as info). 01 00 00 05 00 00 00 00 81 09 00 02 FF"

- id: settings_framing
  label: Settings Framing
  kind: action
  params: []
  description: "Settings (listed as framing). 01 00 00 07 00 00 00 00 81 01 04 7D 00 00 FF"
```

## Feedbacks
```yaml
# UNRESOLVED: response formats not documented in source
# VISCA devices typically return 90 [cmd] FF ack or 90 01 FF
```

## Variables
```yaml
# UNRESOLVED: no settable parameters enumerated in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation in source
```

## Macros
```yaml
# VISCA over IP requires full packet order: header + VISCA command.
# After pan/tilt movement: must send PT_Stop command.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
VISCA over IP uses UDP. Header 3rd & 4th bytes indicate payload length (varying by command). Inquiry commands use different header length (5 bytes payload vs 9 for movements). VISCA over IP supports up to 256 cameras on same subnet; RS-232 VISCA supports up to 7 cameras; Pelco-P up to 32; Pelco-D up to 256. RS-232 pinout: Pin 2 RXD, Pin 3 TXD, Pin 5 GND.
<!-- UNRESOLVED: full VISCA command vocabulary not enumerated -->
<!-- UNRESOLVED: Pelco-P/D protocols mentioned but commands not provided -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:15:51.922Z
last_checked_at: 2026-10-07T13:04:41.675Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:04:41.675Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 spec actions map one-to-one to source commands with matching hex and transport values (UDP, port 52381, 9600 baud); the source documents no further commands. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "full VISCA command set not enumerated in source"
- "RTSP port 554 noted but RTSP control not documented"
- "data bits, parity, stop bits for RS-232 not explicitly stated"
- "CGI port 80 listed with UDP transport - HTTP over UDP unclear, marking port only"
- "data_bits, parity, stop_bits not stated in source"
- "traits inferred from command examples present"
- "response formats not documented in source"
- "no settable parameters enumerated in source"
- "no unsolicited event documentation in source"
- "no safety warnings or interlock procedures in source"
- "full VISCA command vocabulary not enumerated"
- "Pelco-P/D protocols mentioned but commands not provided"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
