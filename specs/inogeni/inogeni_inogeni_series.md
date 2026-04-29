---
schema_version: ai4av-public-spec-v1
device_id: inogeni/inogeni-series
entity_id: inogeni_inogeni_series
spec_id: admin/inogeni-inogeni_series
revision: 1
author: admin
title: "INOGENI INOGENI Series Control Spec"
status: published
manufacturer: INOGENI
manufacturer_key: inogeni
model_family: "INOGENI Series"
aliases: []
compatible_with:
  manufacturers:
    - INOGENI
  models:
    - "INOGENI Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: inogeni_inogeni_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:43:53.922Z
retrieved_at: 2026-04-24T14:43:53.922Z
last_checked_at: 2026-04-24T14:43:53.922Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-24T14:43:53.922Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "Spec comprehensively documents all CAMTRACK API commands found in source with accurate transport configuration."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# INOGENI INOGENI Series Control Spec

## Summary
INOGENI CAMTRACK device supporting IP-based control via HTTP (port 1881), TCP/IP JSON (port 11881), and WebSocket (port 1881). Controls video switching, audio channel activation, device data processing, presets, and system standby. Supports query commands for device state. No authentication required.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - websocket
addressing:
  port: 1881  # HTTP and WebSocket
  tcp_port: 11881  # TCP/IP JSON communication
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # SET SYSTEM_STANDBY SYSTEM_ON/SYSTEM_OFF
- routable        # SET SWITCHER_INPUT activates video inputs
- queryable       # GET INPUT_DEVICE_DATA, GET OUTPUT_DEVICE_DATA, GET PRESET, GET SYSTEM_STANDBY
- levelable       # audio channel activation via SET CHANNEL_ID_AUDIO
```

## Actions
```yaml
- id: set_channel_id_audio
  label: Set Channel ID Audio
  kind: action
  params:
    - name: channel
      type: integer
      description: "Channel number: 0 (reset all), 1, or 101-999"
    - name: state
      type: enum
      values: [ENABLE, DISABLE]
      description: Enable or disable audio simulation on channel

- id: set_input_device_data
  label: Set Input Device Data
  kind: action
  params:
    - name: device
      type: integer
      description: "Input device number: 0 (all), or 1-12"
    - name: state
      type: enum
      values: [ENABLE, DISABLE]
      description: Enable or disable data processing for input device

- id: set_output_device_data
  label: Set Output Device Data
  kind: action
  params:
    - name: device
      type: integer
      description: "Output device number: 0 (all), or 1-8"
    - name: state
      type: enum
      values: [ENABLE, DISABLE]
      description: Enable or disable data processing for output device

- id: set_preset
  label: Set Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "Preset number: 1-10"
  notes: "Global preset must be saved to device before activation"

- id: set_switch_device_data
  label: Set Switch Device Data
  kind: action
  params:
    - name: device
      type: integer
      description: "Switch device number: 0 (all), or 1"
    - name: state
      type: enum
      values: [ENABLE, DISABLE]
      description: Enable or disable data processing for switch device

- id: set_switcher_input
  label: Set Switcher Input
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number: 1-12"
  notes: Activates specified input on video switcher or matrix

- id: set_switcher_input_name
  label: Set Switcher Input Name
  kind: action
  params:
    - name: input
      type: integer
      description: "Input number: 1-12"
    - name: name
      type: string
      description: Name to assign to the input

- id: set_system_standby
  label: Set System Standby
  kind: action
  params:
    - name: mode
      type: enum
      values: [SYSTEM_ON, SYSTEM_OFF]
      description: System power state
  notes: Communication remains possible during standby

- id: delete_credentials
  label: Delete Credentials
  kind: action
  params: []
  notes: Requires stored credentials and flag set in settings

- id: get_input_device_data
  label: Get Input Device Data
  kind: action
  params: []
  notes: Returns multi-message response; not supported in browser interface

- id: get_output_device_data
  label: Get Output Device Data
  kind: action
  params: []
  notes: Returns multi-message response; not supported in browser interface

- id: get_preset
  label: Get Preset
  kind: action
  params: []
  notes: Returns last recalled global preset number (0 if none loaded)

- id: get_system_standby
  label: Get System Standby
  kind: action
  params: []
  notes: Returns current standby mode state
- id: get_switch_device_data
  label: Get Switch Device Data
  kind: action
  params: []
  notes: Returns data processing state for all switch devices; listed in Appendix B GET COMMANDS
```

## Feedbacks
```yaml
# HTTP and TCP responses both use JSON format with status field
# Success responses include status: SUCCESS or status: DEFINED
# Error responses include status: FAILED or status: ERROR
# Messages include human-readable descriptions
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Continuously enabled audio channel can block logic; channels should eventually receive DISABLE command"
    source: "SET CHANNEL_ID_AUDIO documentation"
# UNRESOLVED: no other safety warnings or interlock procedures in source
```

## Notes
- HTTP API uses query string format: `http://<IP>:<Port>/control?command=<command>&value1=<val1>`
- TCP/IP API uses JSON format over persistent socket connection, messages end with newline
- WebSocket uses same JSON format as TCP/IP but does not require terminating newline
- Device accepts all documented parameters; actual support may vary by edition
- GET commands return multi-message responses; order not guaranteed
- Preset numbers 1-10 for global presets (distinct from camera presets)
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: port 23 (Telnet) not mentioned — TCP-only with JSON on 11881 -->
<!-- UNRESOLVED: WebSocket path is /websocket but auth type unstated -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: inogeni_inogeni_series.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-24T14:43:53.922Z
retrieved_at: 2026-04-24T14:43:53.922Z
last_checked_at: 2026-04-24T14:43:53.922Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-24T14:43:53.922Z
matched_actions: 14
action_count: 14
confidence: high
summary: "Spec comprehensively documents all CAMTRACK API commands found in source with accurate transport configuration."
```

## Known Gaps

```yaml
[]
```
