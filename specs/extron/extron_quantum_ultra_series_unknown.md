---
spec_id: admin/extron-quantum-ultra-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron Quantum Ultra Series Control Spec"
manufacturer: Extron
model_family: "Quantum Ultra Series"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "Quantum Ultra Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2760-50_L_Quantum_Ultra_Series_SUG.pdf
  - https://www.extron.com/download/files/userman/68-2760-01_E_Quantum_Ultra_UG.pdf
  - https://media.extron.com/public/download/files/userman/68-1883-01_D_Quantum_Ctrl_SW_UG.pdf
  - https://www.extron.com/download/files/userman/68-2882-50_B_QC_101_SUG_PRELIM.pdf
  - https://usermanual.wiki/m/d7f5368da4d5c0457ddc6a791aca6a06f11b02a39baf8891e33b6cfebeea2006
retrieved_at: 2026-05-17T19:34:09.142Z
last_checked_at: 2026-10-07T12:50:14.499Z
generated_at: 2026-10-07T12:50:14.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Other commands, including window management, EDID, HDCP, and test patterns, are not covered in the provided reference."
  - "TCP port number not stated in source"
  - "explicit power on/off commands not present in source"
  - "volume/gain not evident in source"
  - "additional commands for window management, EDID, HDCP, and test patterns are not covered in the provided reference"
  - "SIS variables referenced in source not fully catalogued"
  - "unsolicited event notifications not documented in source"
  - "multi-step macro sequences not described in source"
  - "safety warnings and interlock procedures not fully documented in source"
  - "LAN transport protocol and port number, full command set, firmware version, and authentication details are not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:50:14.499Z
  matched_actions: 15
  action_count: 15
  confidence: medium
  summary: "All 15 semantic-id actions map one-to-one to SIS rows in the source, and the serial transport values match verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-17
---

# Extron Quantum Ultra Series Control Spec

## Summary
Quantum Ultra Series videowall processor supports SIS control via RS-232, USB, and LAN. Serial config: 9600 baud, 8N1, no flow control. IP configuration commands are for the LAN A port. This spec covers the SIS commands listed in the reference for input selection, video type, window presets and border style, audio routing, and IP configuration.

<!-- UNRESOLVED: Other commands, including window management, EDID, HDCP, and test patterns, are not covered in the provided reference. -->

## Transport
```yaml
protocols:
  - serial
  - UNRESOLVED  # LAN command transport protocol is not specified
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # Authentication procedure is not stated in source
```

## Traits
```yaml
- powerable  # UNRESOLVED: explicit power on/off commands not present in source
- routable  # inferred from input selection commands
- queryable  # inferred from view/query commands
- levelable  # UNRESOLVED: volume/gain not evident in source
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
- id: view_current_input
  label: View Current Input
  kind: action
  params:
    - name: canvas
      type: integer
    - name: window
      type: integer
- id: set_in4dtp3_video_type
  label: Set IN4DTP3 Video Type
  kind: action
  params:
    - name: input
      type: integer
    - name: video_format
      type: integer
- id: view_in4dtp3_video_type
  label: View IN4DTP3 Video Type
  kind: action
  params:
    - name: input
      type: integer
- id: recall_window_preset
  label: Recall Window Preset
  kind: action
  params:
    - name: canvas
      type: integer
    - name: preset
      type: integer
- id: recall_preset_with_audio
  label: Recall Preset with Audio
  kind: action
  params:
    - name: canvas
      type: integer
    - name: preset
      type: integer
- id: set_window_border_style
  label: Set Window Border Style
  kind: action
  params:
    - name: canvas
      type: integer
    - name: window
      type: integer
    - name: border_style
      type: integer
- id: view_window_border_style
  label: View Window Border Style
  kind: action
  params:
    - name: canvas
      type: integer
    - name: window
      type: integer
- id: select_audio_source
  label: Select Audio Source (Quantum Ultra II only)
  kind: action
  params:
    - name: canvas
      type: integer
    - name: input
      type: integer
- id: view_selected_audio_source
  label: View Selected Audio Source (Quantum Ultra II only)
  kind: action
  params:
    - name: canvas
      type: integer
- id: select_dante_audio_source
  label: Select Dante Audio Source (Quantum Ultra II only)
  kind: action
  params:
    - name: channel
      type: integer
    - name: source
      type: integer
- id: view_selected_dante_audio
  label: View Selected Dante Audio (Quantum Ultra II only)
  kind: action
  params:
    - name: channel
      type: integer
- id: set_dhcp
  label: Set DHCP On/Off
  kind: action
  params:
    - name: enable
      type: integer
      description: 1 = on, 0 = off
- id: view_dhcp_setting
  label: View DHCP Setting
  kind: action
- id: set_ip_address
  label: Set IP Address
  kind: action
  params:
    - name: ip_address
      type: string
# UNRESOLVED: additional commands for window management, EDID, HDCP, and test patterns are not covered in the provided reference
```

## Feedbacks
```yaml
- id: input_selection_response
  label: Input Selection Response
  type: string
- id: video_type_response
  label: Video Type Response
  type: string
- id: preset_recall_response
  label: Preset Recall Response
  type: string
- id: window_border_style_response
  label: Window Border Style Response
  type: string
- id: audio_selection_response
  label: Audio Selection Response
  type: string
- id: dante_audio_response
  label: Dante Audio Response
  type: string
- id: dhcp_response
  label: DHCP Setting Response
  type: integer
- id: ip_address_response
  label: IP Address Response
  type: string
```

## Variables
```yaml
# UNRESOLVED: SIS variables referenced in source not fully catalogued
```

## Events
```yaml
# UNRESOLVED: unsolicited event notifications not documented in source
```

## Macros
```yaml
# UNRESOLVED: multi-step macro sequences not described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - IP configuration changes via LAN A port require a Commit and Reboot command to persist
# UNRESOLVED: safety warnings and interlock procedures not fully documented in source
```

## Notes
RS-232 connector is a 3-pole, 3.5mm captive screw connector. The source lists USB, RS-232, and LAN connections for SIS control. IP configuration commands are for LAN A, and a Commit and Reboot command is required for those changes to persist. Quantum Ultra II exclusive features listed in the source are audio selection and Dante source selection. Window border style commands apply to Quantum Ultra and Quantum Ultra II only. Display locations and sources use n.n.n format (chassis.slot.connector).
<!-- UNRESOLVED: LAN transport protocol and port number, full command set, firmware version, and authentication details are not stated in source -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2760-50_L_Quantum_Ultra_Series_SUG.pdf
  - https://www.extron.com/download/files/userman/68-2760-01_E_Quantum_Ultra_UG.pdf
  - https://media.extron.com/public/download/files/userman/68-1883-01_D_Quantum_Ctrl_SW_UG.pdf
  - https://www.extron.com/download/files/userman/68-2882-50_B_QC_101_SUG_PRELIM.pdf
  - https://usermanual.wiki/m/d7f5368da4d5c0457ddc6a791aca6a06f11b02a39baf8891e33b6cfebeea2006
retrieved_at: 2026-05-17T19:34:09.142Z
last_checked_at: 2026-10-07T12:50:14.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:50:14.499Z
matched_actions: 15
action_count: 15
confidence: medium
summary: "All 15 semantic-id actions map one-to-one to SIS rows in the source, and the serial transport values match verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Other commands, including window management, EDID, HDCP, and test patterns, are not covered in the provided reference."
- "TCP port number not stated in source"
- "explicit power on/off commands not present in source"
- "volume/gain not evident in source"
- "additional commands for window management, EDID, HDCP, and test patterns are not covered in the provided reference"
- "SIS variables referenced in source not fully catalogued"
- "unsolicited event notifications not documented in source"
- "multi-step macro sequences not described in source"
- "safety warnings and interlock procedures not fully documented in source"
- "LAN transport protocol and port number, full command set, firmware version, and authentication details are not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
