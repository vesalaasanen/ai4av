---
spec_id: admin/extron-quantum-ultra-ii-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron Quantum Ultra II Series Control Spec"
manufacturer: Extron
model_family: "Quantum Ultra II Series"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "Quantum Ultra II Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2760-50_L_Quantum_Ultra_Series_SUG.pdf
  - https://www.extron.com/download/files/userman/68-2760-01_E_Quantum_Ultra_UG.pdf
retrieved_at: 2026-05-14T16:28:00.803Z
last_checked_at: 2026-07-21T22:44:10.449Z
generated_at: 2026-07-21T22:44:10.449Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document was truncated at the IP Configuration section — complete SIS command reference not available. Commands for window management, EDID, HDCP, test patterns, and other functions are documented only in the full user guide."
  - "TCP port number not stated in source"
  - "full SIS command table truncated in source. Additional commands for"
  - "additional feedbacks in full user guide not available"
  - "no settable parameters beyond discrete actions documented in this source excerpt"
  - "unsolicited notification behavior not documented in source"
  - "multi-step sequences not documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source excerpt"
  - "TCP port number for LAN control not stated"
  - "complete SIS command set not available — source truncated at IP Configuration section"
  - "command timing, response delays, and error handling not documented"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:44:10.449Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched verbatim in source; all source query commands represented in spec feedbacks; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Extron Quantum Ultra II Series Control Spec

## Summary

Extron Quantum Ultra II is a videowall processor controllable via SIS (Simple Instruction Set) commands over RS-232, USB, or TCP/IP (LAN A). This spec covers the basic SIS command subset from the setup guide; the full command set is in the Quantum Ultra Series User Guide.

<!-- UNRESOLVED: source document was truncated at the IP Configuration section — complete SIS command reference not available. Commands for window management, EDID, HDCP, test patterns, and other functions are documented only in the full user guide. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
# UNRESOLVED: TCP port number not stated in source
# USB mini B Config connector also available for SIS commands
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- routable    # inferred: input selection, audio routing, Dante source selection commands
- queryable   # inferred: view commands for input, audio, Dante, DHCP
```

## Actions
```yaml
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: canvas
      type: integer
      description: Canvas number (X#)
    - name: window
      type: integer
      description: Window number (X%)
    - name: input
      type: integer
      description: Input number (X!)
  command: "{canvas}*{window}*{input}!"

- id: set_in4dtp3_video_type
  label: Set IN4DTP3 Video Type
  kind: action
  params:
    - name: input
      type: integer
      description: DTP3 input number (X!)
    - name: video_format
      type: integer
      description: Video format code (X8^)
  command: "E I{input}*{video_format}VPRT}"

- id: recall_window_preset
  label: Recall Window Preset
  kind: action
  params:
    - name: canvas
      type: integer
      description: Canvas number (X#)
    - name: preset
      type: integer
      description: Preset number (X2%)
  command: "1*{canvas}*{preset}."

- id: recall_preset_with_audio
  label: Recall Preset With Audio
  kind: action
  params:
    - name: canvas
      type: integer
      description: Canvas number (X#)
    - name: preset
      type: integer
      description: Preset number (X2%)
  command: "3*{canvas}*{preset}."

- id: set_window_border_style
  label: Set Window Border Style
  kind: action
  params:
    - name: canvas
      type: integer
      description: Canvas number (X#)
    - name: window
      type: integer
      description: Window number (X%)
    - name: style
      type: integer
      description: Border style code (X7%)
  command: "E B{canvas}*{window}*{style}WNDW}"

- id: select_audio_source
  label: Select Audio Source
  kind: action
  params:
    - name: canvas
      type: integer
      description: Canvas number (X#)
    - name: input
      type: integer
      description: Input number (X!)
  command: "{canvas}*{input}$"

- id: select_dante_audio_source
  label: Select Dante Audio Source
  kind: action
  params:
    - name: dante_channel
      type: integer
      description: Dante channel (X*)
    - name: source
      type: integer
      description: Dante source (X()
  command: "{dante_channel}*{source}$"

- id: set_dhcp
  label: Set DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: "0=off, 1=on (X1))"
  command: "E{state}DH}"

- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: address
      type: string
      description: IP address (X11$)
  command: "E{address}CI}"

# UNRESOLVED: full SIS command table truncated in source. Additional commands for
# window management, EDID, HDCP, test patterns, and other functions documented in
# the Quantum Ultra Series User Guide (www.extron.com).
```

## Feedbacks
```yaml
- id: current_input
  type: string
  description: Current input for a window on a canvas
  command: "{canvas}*{window}!"
  response_pattern: "Grp X#• Win X%• In X!]"

- id: video_type
  type: integer
  description: Video format for a DTP3 input
  command: "E I{input}VPRT}"
  response_pattern: "X8^]"

- id: window_border_style
  type: integer
  description: Border style for a window on a canvas
  command: "E B{canvas}*{window}WNDW}"
  response_pattern: "X7%]"

- id: selected_audio_source
  type: integer
  description: Selected audio source for a canvas
  command: "{canvas}$"
  response_pattern: "X!]"

- id: selected_dante_audio
  type: integer
  description: Selected Dante audio source for a channel
  command: "{dante_channel}$"
  response_pattern: "X(]"

- id: dhcp_setting
  type: integer
  description: "DHCP setting (0=off, 1=on). Default is 0 (off)."
  command: "E DH}"
  response_pattern: "X1)]"

# UNRESOLVED: additional feedbacks in full user guide not available
```

## Variables
```yaml
# UNRESOLVED: no settable parameters beyond discrete actions documented in this source excerpt
```

## Events
```yaml
# UNRESOLVED: unsolicited notification behavior not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step sequences not documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source excerpt
```

## Notes

- SIS commands use a compact symbolic syntax: `X#` = canvas, `X%` = window, `X!` = input, `X2%` = preset, `X7%` = border style, `X8^` = video format, `X*` = Dante channel, `X(` = Dante source, `X1)` = DHCP enable/disable, `X11$` = IP address string.
- `}` in commands represents the Esc character (0x1B); responses use `]` which represents a carriage return or delimiter.
- Audio selection and Dante source selection commands apply to Quantum Ultra II only.
- Window border style commands apply to Quantum Ultra and Quantum Ultra II only.
- IP configuration commands apply only to the LAN A port and require a Commit and Reboot command for changes to persist.
- USB mini B Config connector also supports SIS commands and VCS control.
- Configuration via Extron Videowall Configuration Software (VCS) and Express Mobile Software (EMS) on iOS/Android/Microsoft tablets is also available.

<!-- UNRESOLVED: TCP port number for LAN control not stated -->
<!-- UNRESOLVED: complete SIS command set not available — source truncated at IP Configuration section -->
<!-- UNRESOLVED: command timing, response delays, and error handling not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2760-50_L_Quantum_Ultra_Series_SUG.pdf
  - https://www.extron.com/download/files/userman/68-2760-01_E_Quantum_Ultra_UG.pdf
retrieved_at: 2026-05-14T16:28:00.803Z
last_checked_at: 2026-07-21T22:44:10.449Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:44:10.449Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched verbatim in source; all source query commands represented in spec feedbacks; transport parameters verified. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document was truncated at the IP Configuration section — complete SIS command reference not available. Commands for window management, EDID, HDCP, test patterns, and other functions are documented only in the full user guide."
- "TCP port number not stated in source"
- "full SIS command table truncated in source. Additional commands for"
- "additional feedbacks in full user guide not available"
- "no settable parameters beyond discrete actions documented in this source excerpt"
- "unsolicited notification behavior not documented in source"
- "multi-step sequences not documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source excerpt"
- "TCP port number for LAN control not stated"
- "complete SIS command set not available — source truncated at IP Configuration section"
- "command timing, response delays, and error handling not documented"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
