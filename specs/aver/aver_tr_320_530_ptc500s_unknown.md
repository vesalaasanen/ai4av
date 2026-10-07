---
spec_id: admin/aver-tr-320-530-ptc500s
schema_version: ai4av-public-spec-v1
revision: 1
title: "AVer TR 320 530 PTC500S Control Spec"
manufacturer: AVer
model_family: "TR 320"
aliases: []
compatible_with:
  manufacturers:
    - AVer
  models:
    - "TR 320"
    - "TR 530"
    - PTC500S
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:14:35.162Z
last_checked_at: 2026-10-07T13:02:27.658Z
generated_at: 2026-10-07T13:02:27.658Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Pelco-P/Pelco-D protocols are listed for RS-232/RS-422, but command syntax is not detailed"
  - "RTSP port 554 is listed but no command structure is provided"
  - "CL01 controller pinout is provided but no operational commands are documented"
  - "no status variable commands documented"
  - "no unsolicited event reporting documented"
  - "no multi-step macro sequences documented"
  - "no power-on sequencing or other safety warnings are documented"
  - "CGI port 80 is listed but no HTTP/CGI command structure is provided"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:02:27.658Z
  matched_actions: 11
  action_count: 11
  confidence: medium
  summary: "All 11 action units match source packets or headings and transport values are supported. The source never names PTC500S, so applicability rests on TR320/TR530. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# AVer TR 320 530 PTC500S Control Spec

## Summary
The source documents VISCA over IP using UDP port 52381, plus RS-232 and RS-422 VISCA configuration at 9600 baud. It documents commands for TR530/TR320 and several other AVer models. The source does not mention PTC500S, so its applicability to that model is UNRESOLVED. Serial data bits, parity, and stop bits are not stated.

<!-- UNRESOLVED: Pelco-P/Pelco-D protocols are listed for RS-232/RS-422, but command syntax is not detailed -->
<!-- UNRESOLVED: RTSP port 554 is listed but no command structure is provided -->
<!-- UNRESOLVED: CL01 controller pinout is provided but no operational commands are documented -->

## Transport
```yaml
protocols:
  - udp    # VISCA over IP
  - serial # RS-232/RS-422 VISCA
addressing:
  port: 52381  # VISCA control port; source table lists UDP as transport protocol
serial:
  baud_rate: 9600
  data_bits: UNRESOLVED
  parity: UNRESOLVED
  stop_bits: UNRESOLVED
  flow_control: UNRESOLVED
auth:
  type: UNRESOLVED  # source does not state an authentication method
```

## Traits
```yaml
# Inferred from documented power and tracking commands.
- powerable
- routable
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []
  payload: "01 00 00 09 00 00 00 00 81 01 04 00 02 FF"
  notes: Source shows this packet for PTZ310/PTZ330 and TR311/TR333; separate RS-232 command blocks list it for TR311/TR331 and TR530/TR320. PTC500S applicability is UNRESOLVED. The source does not clarify whether the IP header is used on serial.

- id: power_off
  label: Power Off
  kind: action
  params: []
  payload: "01 00 00 09 00 00 00 00 81 01 04 00 03 FF"
  notes: Source shows this packet for PTZ310/PTZ330 and TR311/TR333; separate RS-232 command blocks list it for TR311/TR331 and TR530/TR320. PTC500S applicability is UNRESOLVED. The source does not clarify whether the IP header is used on serial.

- id: camera_menu
  label: Camera Menu
  kind: action
  params: []
  payload: "01 00 00 09 00 00 00 00 81 01 06 06 10 FF"
  notes: Source documents this for TR530/TR320. PTC500S applicability is UNRESOLVED. The source does not clarify whether the IP header is used on serial.

- id: tracking_enable
  label: Tracking Enable
  kind: action
  params: []
  notes: Listed as a heading under the TR311/TR331 RS-232 command section; no payload or command details are provided.

- id: tracking_disable
  label: Tracking Disable
  kind: action
  params: []
  notes: Listed as a heading under the TR311/TR331 RS-232 command section; no payload or command details are provided.

- id: switch_tracking_target
  label: Switch Tracking Target
  kind: action
  params: []
  notes: Listed as a heading under the TR311/TR331 RS-232 command section; no payload or further model attribution is provided.

- id: recall_preset
  label: Recall Preset 1
  kind: action
  params: []
  notes: Listed as “Recall Preset #1” under the TR530/TR320 RS-232 command section; no payload is provided. Other preset numbers and PTC500S applicability are UNRESOLVED.

- id: pt_up
  label: PT Up
  kind: action
  params: []
  payload: "01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 01 FF"
  notes: VISCA over IP example. Send PT Stop after any pan/tilt movement command.

- id: pt_stop
  label: PT Stop
  kind: action
  params: []
  payload: "01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF"
  notes: VISCA over IP packet; source says to send it after any pan/tilt movement command.

- id: framing
  label: Framing
  kind: action
  params: []
  payload: "01 00 00 07 00 00 00 00 81 01 04 7D 00 00 FF"
  notes: Source lists this as a settings (“framing”) example. Parameter meanings and PTC500S applicability are UNRESOLVED.
```

## Feedbacks
```yaml
- id: info_inquiry
  label: Inquiry (Info)
  kind: query
  params: []
  payload: "01 00 00 05 00 00 00 00 81 09 00 02 FF"
  query_command: "01 00 00 05 00 00 00 00 81 09 00 02 FF"
  notes: Source lists this as an inquiry (“info”) example. Response format and parameters are not documented.
```

## Variables
```yaml
# UNRESOLVED: no status variable commands documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event reporting documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - After sending any pan/tilt movement command, send PT_Stop packet (01 00 00 09 00 00 00 00 81 01 06 01 08 08 03 03 FF) to stop movement
# UNRESOLVED: no power-on sequencing or other safety warnings are documented
```

## Notes

VISCA over IP uses UDP on port 52381. Packets consist of a header followed by a VISCA command. The source gives the header form as `01 00 00 [payload_length] 00 00 00 00`; the length value varies by command. The source's examples include an inquiry packet (`01 00 00 05 00 00 00 00 81 09 00 02 FF`) and a framing/settings packet (`01 00 00 07 00 00 00 00 81 01 04 7D 00 00 FF`).

The source lists VISCA, Pelco-P, and Pelco-D for RS-232/RS-422. It states VISCA can address up to 7 cameras, Pelco-P up to 32, and Pelco-D up to 256 (addresses 0–255). TR530/TR320 OSD settings give VISCA addresses 1–8; the other listed VISCA serial settings give addresses 1–7. VISCA over IP supports up to 256 cameras on the same network subnet.

The source gives a baud rate of 9600 for the listed RS-232/RS-422 settings. Data bits, parity, stop bits, and flow control are not stated. Its RS-232 examples via Hercules Serial use the same byte strings shown as VISCA over IP packets; whether the IP header is used over serial is UNRESOLVED.

Serial cable: TR530/TR320 use MiniDin6 to 9Pin DSub (COMVCC232). Daisy-chain Y-cable: PTRSINOUT.

<!-- UNRESOLVED: CGI port 80 is listed but no HTTP/CGI command structure is provided -->

## Provenance

```yaml
source_domains:
  - averusa.com
source_urls:
  - "https://www.averusa.com/pro-av/downloads/control-codes/AVer%20Pro-AV%20PTZ%20Visca%20over%20IP-UDP%20and%20RS-232%20Guide.pdf"
retrieved_at: 2026-05-14T11:14:35.162Z
last_checked_at: 2026-10-07T13:02:27.658Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:02:27.658Z
matched_actions: 11
action_count: 11
confidence: medium
summary: "All 11 action units match source packets or headings and transport values are supported. The source never names PTC500S, so applicability rests on TR320/TR530. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Pelco-P/Pelco-D protocols are listed for RS-232/RS-422, but command syntax is not detailed"
- "RTSP port 554 is listed but no command structure is provided"
- "CL01 controller pinout is provided but no operational commands are documented"
- "no status variable commands documented"
- "no unsolicited event reporting documented"
- "no multi-step macro sequences documented"
- "no power-on sequencing or other safety warnings are documented"
- "CGI port 80 is listed but no HTTP/CGI command structure is provided"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
