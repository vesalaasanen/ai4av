---
spec_id: admin/ai-media-av-610
schema_version: ai4av-public-spec-v1
revision: 1
title: "AI Media AV 610 CaptionPort Control Spec"
manufacturer: "AI Media"
model_family: "AV 610"
aliases: []
compatible_with:
  manufacturers:
    - "AI Media"
  models:
    - "AV 610"
    - "AV610 CaptionPort"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ai-media.tv
  - customersupport.ai-media.tv
retrieved_at: 2026-04-30T14:26:19.357Z
last_checked_at: 2026-04-30T15:19:04.652Z
generated_at: 2026-04-30T15:19:04.652Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:19:04.652Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 14 spec actions matched source command reference."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# AI Media AV 610 CaptionPort Control Spec

## Summary

The AV 610 CaptionPort is a captioning hardware unit supporting serial (RS-232/RS-422) and TCP/IP (Ethernet) control. All commands use a CTRL+A prefix with carriage-return termination. Telnet is configurable via the web interface. No authentication is required for any control channel.

<!-- UNRESOLVED: USB control not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: telnet port configured via web UI, value not stated in source
serial:
  baud_rate: 1200  # default; configurable 1200-38400
  data_bits: 7
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred from Report Identification, Report Port Activity, Modem Status, Recovery Status, SD Video Presence, Monitor Line 21 commands
# UNRESOLVED: powerable, routable, levelable not evidenced in source excerpt
```

## Actions
```yaml
- id: regeneration_mode
  label: Set Regeneration Mode
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "ON"
        - "OFF"
      description: Enable or disable upstream VANC regeneration

- id: ignore_upstream_caption_channel
  label: Ignore Upstream Caption Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number to ignore

- id: return_upstream_caption_channel
  label: Return Upstream Caption Channel
  kind: action
  params:
    - name: channel
      type: integer
      description: Channel number to restore

- id: begin_passthru_mode
  label: Begin PassThru Mode
  kind: action
  params:
    - name: pairing
      type: integer
    - name: field
      type: integer

- id: end_passthru_mode
  label: End PassThru Mode
  kind: action
  params: []

- id: begin_realtime_mode
  label: Begin RealTime Mode
  kind: action
  params:
    - name: channel
      type: integer
    - name: rollup
      type: integer
    - name: bbase
      type: integer

- id: end_realtime_mode
  label: End RealTime Mode
  kind: action
  params: []

- id: end_monitoring
  label: End Monitoring
  kind: action
  params: []

- id: report_identification
  label: Report Identification
  kind: action
  params: []

- id: report_port_activity
  label: Report Port Activity
  kind: action
  params: []

- id: modem_status
  label: Report Modem Status
  kind: action
  params:
    - name: modem
      type: integer

- id: recovery_status
  label: Report Recovery Status
  kind: action
  params: []

- id: sd_video_presence
  label: Report SD Video Presence
  kind: action
  params: []

- id: monitor_line21
  label: Monitor Line 21
  kind: action
  params:
    - name: channel
      type: integer
    - name: io
      type: enum
      values:
        - I
        - O
```

## Feedbacks
```yaml
# UNRESOLVED: response format for commands not documented in source excerpt
```

## Variables
```yaml
# UNRESOLVED: no settable parameters in source excerpt
```

## Events
```yaml
# UNRESOLVED: unsolicited notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not explicitly documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: Modem takes priority over serial port when active, overriding prompter
    source: "Modem will automatically take priority when active so that the prompter can be overridden as desired."
```

## Notes

Serial port 1 supports RS-232, RS-422, RS-422 Sony; port 2 supports RS-232 only. Both use DB-9 connectors. Default serial: 1200 baud, odd parity, 7 data bits, 1 stop bit. Settings sticky across power cycles, configurable via web UI or front panel LCD (System Setup > P1 Mode). Startup Settings editor runs sticky commands on every boot — CTRL+A prefix implied, not entered manually. Web Terminal emulates serial port via web UI.

<!-- UNRESOLVED: telnet port number not stated — configured via web interface -->
<!-- UNRESOLVED: command response strings not documented in source -->
<!-- UNRESOLVED: USB control protocol not documented -->
<!-- UNRESOLVED: GPI/GPO command syntax not documented -->

## Provenance

```yaml
source_domains:
  - ai-media.tv
  - customersupport.ai-media.tv
retrieved_at: 2026-04-30T14:26:19.357Z
last_checked_at: 2026-04-30T15:19:04.652Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:19:04.652Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 14 spec actions matched source command reference."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
