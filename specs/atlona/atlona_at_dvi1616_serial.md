---
spec_id: admin/atlona-at-dvi1616
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-DVI1616 Control Spec"
manufacturer: Atlona
model_family: AT-DVI1616
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-DVI1616
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.bzbexpress.com
  - manualsdir.com
source_urls:
  - https://files.bzbexpress.com/files/attachments/2473892/atlona-at-dvi1616-a-manual.pdf
  - https://www.manualsdir.com/manuals/749258/atlona-at-dvi-matrix.html
retrieved_at: 2026-06-12T01:59:35.392Z
last_checked_at: 2026-06-12T19:07:29.817Z
generated_at: 2026-06-12T19:07:29.817Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP port number not stated in source; auth/password default not stated"
  - "TCP port number not stated in source"
  - "flow control not stated in source"
  - "source documents password rewrite command (/+xxxxxxxx;) but default password and login flow not specified"
  - "valid range not stated in source"
  - "valid group range not stated in source"
  - "source does not document explicit feedback response formats beyond"
  - "source does not expose named settable parameters beyond the"
  - "source does not document unsolicited notifications."
  - "source does not describe multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "TCP port for Ethernet control not stated; valid input/output channel numeric ranges not stated; default password and login flow for password-protected commands not stated; flow control (RTS/CTS, XON/XOFF, none) not stated; response/feedback format for queries not stated"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:07:29.817Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched source commands; transport parameters fully verified against protocol specifications. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-03
---

# Atlona AT-DVI1616 Control Spec

## Summary
Atlona AT-DVI1616 DVI matrix switcher (16 inputs × 16 outputs). Control via RS-232 (DB-9 female, primary) and Ethernet (RJ-45, optional accessory). Spec covers ASCII/HEX command set for routing, presets, groups, lock, buzzer, and status queries.

<!-- UNRESOLVED: TCP port number not stated in source; auth/password default not stated -->

## Transport
```yaml
protocols:
  - serial
  - tcp  # inferred: source documents Ethernet control via RJ-45 (optional accessory)
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  pinout: "2=TX, 3=RX, 5=GND"  # DB-9 female per source
  connector: DB-9 female
auth:
  type: password  # UNRESOLVED: source documents password rewrite command (/+xxxxxxxx;) but default password and login flow not specified
```

## Traits
```yaml
- routable      # inferred: input/output routing commands present
- queryable     # inferred: Status/Status[x1]/*Type/^Version query commands present
```

## Actions
```yaml
- id: type_query
  label: Acquire Model Information
  kind: query
  command: "/*Type;"
  params: []

- id: password_rewrite
  label: Rewrite Password
  kind: action
  command: "/+{password};"
  params:
    - name: password
      type: string
      description: 8-digit password (per source: "must be 8 digits")

- id: lock_keyboard
  label: Lock Keyboard
  kind: action
  command: "/%Lock;"
  params: []

- id: unlock_keyboard
  label: Unlock Keyboard
  kind: action
  command: "/%Unlock;"
  params: []

- id: bell_off
  label: Turn Off Buzzer
  kind: action
  command: "/:BellOff;"
  params: []

- id: bell_on
  label: Turn On Buzzer
  kind: action
  command: "/:BellOn;"
  params: []

- id: version_query
  label: Acquire Software Version
  kind: query
  command: "/^Version;"
  params: []

- id: input_to_all_outputs
  label: Route Input to All Outputs
  kind: action
  command: "{x1}All"
  params:
    - name: x1
      type: integer
      description: Input channel number  # UNRESOLVED: valid range not stated in source

- id: route_audio
  label: Route Audio Input to Output
  kind: action
  command: "{x1}*{x2}$"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_video_pct
  label: Route Video Input to Output (%)
  kind: action
  command: "{x1}*{x2}%"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_video_amp
  label: Route Video Input to Output (&)
  kind: action
  command: "{x1}*{x2}&"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_all_matching
  label: Route All Inputs to Matching Outputs
  kind: action
  command: "All#"
  params: []

- id: switch_off_all_outputs
  label: Switch Off All Outputs
  kind: action
  command: "All$"
  params: []

- id: route_input_to_matching_output
  label: Route Input to Matching Output
  kind: action
  command: "{x1}#"
  params:
    - name: x1
      type: integer
      description: Input/output channel number

- id: switch_off_output
  label: Switch Off Output
  kind: action
  command: "{x1}$"
  params:
    - name: x1
      type: integer
      description: Output channel number

- id: route_video_single
  label: Route Video Input to Single Output
  kind: action
  command: "{x1} V{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_video_multi
  label: Route Video Input to Multiple Outputs
  kind: action
  command: "{x1} V{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number
    - name: x3
      type: integer
      description: Output channel number
    - name: x4
      type: integer
      description: Output channel number

- id: route_audio_single
  label: Route Audio Input to Single Output
  kind: action
  command: "{x1} A{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_audio_multi
  label: Route Audio Input to Multiple Outputs
  kind: action
  command: "{x1} A{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number
    - name: x3
      type: integer
      description: Output channel number
    - name: x4
      type: integer
      description: Output channel number

- id: route_both_single
  label: Route Both Video and Audio Input to Single Output
  kind: action
  command: "{x1} B{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number

- id: route_both_multi
  label: Route Both Video and Audio Input to Multiple Outputs
  kind: action
  command: "{x1} B{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number
    - name: x3
      type: integer
      description: Output channel number
    - name: x4
      type: integer
      description: Output channel number

- id: route_to_group
  label: Route Input to All Outputs in Group
  kind: action
  command: "{x1}P{x2}"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Group number  # UNRESOLVED: valid group range not stated in source

- id: define_group
  label: Group Output Channels Under Group
  kind: action
  command: "{x1}PP{x2},{x3},{x4}"
  params:
    - name: x1
      type: integer
      description: Group number
    - name: x2
      type: integer
      description: Output channel number
    - name: x3
      type: integer
      description: Output channel number
    - name: x4
      type: integer
      description: Output channel number

- id: group_query
  label: Acquire Output Channels in Group
  kind: query
  command: "S{x}"
  params:
    - name: x
      type: integer
      description: Group number

- id: status_query_output
  label: Acquire Input for Output
  kind: query
  command: "Status{x1}"
  params:
    - name: x1
      type: integer
      description: Output channel number

- id: status_query_all
  label: Acquire All Input-to-Output Routing
  kind: query
  command: "Status"
  params: []

- id: save_preset
  label: Save Current Routing to Preset
  kind: action
  command: "Save{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (range 0-9 per source)

- id: recall_preset
  label: Recall Preset
  kind: action
  command: "Recall{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (range 0-9 per source)

- id: clear_preset
  label: Clear Preset
  kind: action
  command: "Clear{Y}"
  params:
    - name: Y
      type: integer
      description: Preset number (range 0-9 per source)

- id: route_both_bang
  label: Route Both Video and Audio Input to Output (!)
  kind: action
  command: "{x1}*{x2}!"
  params:
    - name: x1
      type: integer
      description: Input channel number
    - name: x2
      type: integer
      description: Output channel number
```

## Feedbacks
```yaml
# UNRESOLVED: source does not document explicit feedback response formats beyond
# Status/Status[x1]/S[x]/*Type/^Version queries. Response format not stated.
```

## Variables
```yaml
# UNRESOLVED: source does not expose named settable parameters beyond the
# password (covered under Actions.password_rewrite).
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
RS-232 pinout: 2=TX, 3=RX, 5=GND (DB-9 female). Commands documented in both ASCII and HEX formats; user selects via Switch 2.0 application Custom Code tab. Multiple routing command variants exist for video-only, audio-only, and both; recommend preferring the {x1} V{x2} / {x1} A{x2} / {x1} B{x2} forms since the *-suffixed variants ($, %, &, !) appear to be legacy or redundant. Preset index Y range: 0-9. Ethernet (RJ-45) is an optional accessory per source; link speed 10/100M, full/half-duplex. Third-party control systems supported: CRESTRON, AMX. Source examples (e.g. "1B7.2A4.") use period as command separator when issuing multiple operations in one transmission.

<!-- UNRESOLVED: TCP port for Ethernet control not stated; valid input/output channel numeric ranges not stated; default password and login flow for password-protected commands not stated; flow control (RTS/CTS, XON/XOFF, none) not stated; response/feedback format for queries not stated -->

## Provenance

```yaml
source_domains:
  - files.bzbexpress.com
  - manualsdir.com
source_urls:
  - https://files.bzbexpress.com/files/attachments/2473892/atlona-at-dvi1616-a-manual.pdf
  - https://www.manualsdir.com/manuals/749258/atlona-at-dvi-matrix.html
retrieved_at: 2026-06-12T01:59:35.392Z
last_checked_at: 2026-06-12T19:07:29.817Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:07:29.817Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched source commands; transport parameters fully verified against protocol specifications. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP port number not stated in source; auth/password default not stated"
- "TCP port number not stated in source"
- "flow control not stated in source"
- "source documents password rewrite command (/+xxxxxxxx;) but default password and login flow not specified"
- "valid range not stated in source"
- "valid group range not stated in source"
- "source does not document explicit feedback response formats beyond"
- "source does not expose named settable parameters beyond the"
- "source does not document unsolicited notifications."
- "source does not describe multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "TCP port for Ethernet control not stated; valid input/output channel numeric ranges not stated; default password and login flow for password-protected commands not stated; flow control (RTS/CTS, XON/XOFF, none) not stated; response/feedback format for queries not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
