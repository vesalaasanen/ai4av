---
spec_id: admin/blackmagic-design-smartview
schema_version: ai4av-public-spec-v1
revision: 1
title: "Blackmagic Design SmartView Control Spec"
manufacturer: "Blackmagic Design"
model_family: "SmartView Duo"
aliases: []
compatible_with:
  manufacturers:
    - "Blackmagic Design"
  models:
    - "SmartView Duo"
    - "SmartView (single monitor)"
    - "SmartScope Duo 4K"
    - "SmartScope (single monitor)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - documents.blackmagicdesign.com
  - blackmagicdesign.com
  - github.com
source_urls:
  - "https://documents.blackmagicdesign.com/UserManuals/SmartViewManual.pdf?_v=1722841210000"
  - https://documents.blackmagicdesign.com/UserManuals/SmartViewManual.pdf
  - https://www.blackmagicdesign.com/products/smartview/techspecs
  - https://www.blackmagicdesign.com/developer
  - https://github.com/jscissr/smartview-client
retrieved_at: 2026-05-05T01:53:54.252Z
last_checked_at: 2026-05-05T06:10:41.042Z
generated_at: 2026-05-05T06:10:41.042Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "scope visualization features not fully documented in source excerpt"
  - "input routing not present in excerpt"
  - "network configuration variables stated but block structure implies"
  - "source describes asynchronous state changes but does not enumerate"
  - "no safety warnings or interlock procedures for power-on sequencing"
  - "SmartScope-specific scope selection commands not fully documented"
  - "audio channel selection parameters not documented"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-05T06:10:41.042Z
  matched_actions: 10
  action_count: 10
  confidence: medium
  summary: "All 10 spec actions matched cleanly against documented commands; transport parameters verified; SmartView protocol fully represented. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Blackmagic Design SmartView Control Spec

## Summary
Ethernet-based control protocol for Blackmagic SmartView and SmartScope video monitors. Text-based protocol accessed via TCP port 9992, similar in structure to Videohub protocol. Device sends full state dump on connection, then asynchronous state changes.

<!-- UNRESOLVED: scope visualization features not fully documented in source excerpt -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 9992
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: device sends complete state dump on connection
- levelable  # inferred: brightness, contrast, saturation commands present
- routable   # UNRESOLVED: input routing not present in excerpt
```

## Actions
```yaml
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness 0-255 (0-100%)

- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast 0-255 (zero-centered at 127)

- id: set_saturation
  label: Set Saturation
  kind: action
  params:
    - name: value
      type: integer
      description: Saturation 0-255 (zero-centered at 127)

- id: set_border
  label: Set Border Color
  kind: action
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, WHITE, NONE]

- id: identify
  label: Identify Monitor
  kind: action
  params:
    - name: enable
      type: boolean
      description: Enable white border for 15 seconds

- id: set_network_dynamic_ip
  label: Enable DHCP
  kind: action
  params:
    - name: enabled
      type: boolean

- id: set_static_network
  label: Set Static IP
  kind: action
  params:
    - name: address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string

- id: set_device_name
  label: Set Device Name
  kind: action
  params:
    - name: name
      type: string
- id: set_scope
  label: Set Scope Mode
  kind: action
  params:
    - name: monitor
      type: string
      description: Monitor identifier (e.g. A or B)
    - name: scope
      type: enum
      values: [AudioDbfs, AudioDbvu, Histogram, ParadeRGB, ParadeYUV, Picture, Vector100]

- id: set_audio_channels
  label: Set Audio Channels
  kind: action
  params:
    - name: monitor
      type: string
      description: Monitor identifier for audio metering display
    - name: channels
      type: UNRESOLVED
      description: Audio channel selection; mapping values not enumerated in source
```

## Feedbacks
```yaml
- id: device_info
  label: Device Info
  type: object
  properties:
    - name: model
      type: string
    - name: hostname
      type: string
    - name: name
      type: string
    - name: monitors
      type: integer
    - name: inverted
      type: boolean

- id: network_status
  label: Network Status
  type: object
  properties:
    - name: dynamic_ip
      type: boolean
    - name: static_address
      type: string
    - name: static_netmask
      type: string
    - name: static_gateway
      type: string
    - name: current_address
      type: string
    - name: current_netmask
      type: string
    - name: current_gateway
      type: string

- id: display_settings
  label: Display Settings
  type: object
  properties:
    - name: brightness
      type: integer
    - name: contrast
      type: integer
    - name: saturation
      type: integer
    - name: border
      type: enum
      values: [RED, GREEN, BLUE, WHITE, NONE]
    - name: identify
      type: boolean
```

## Variables
```yaml
# UNRESOLVED: network configuration variables stated but block structure implies
# these are set via action blocks rather than independent variables
```

## Events
```yaml
# UNRESOLVED: source describes asynchronous state changes but does not enumerate
# specific event types
```

## Macros
```yaml
# None documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Changing name or network settings causes IP connection drop; device restarts networking
# UNRESOLVED: no safety warnings or interlock procedures for power-on sequencing
```

## Notes
Protocol similar to Videohub text-based format. Block structure: header colon, multi-line content, blank line terminator. Clients should ignore unrecognized blocks and lines for forward compatibility. Border colors (RED/GREEN/BLUE/WHITE/NONE) can be overridden by hardware tally at DB-9 input. SmartScope models support audio metering scopes (AudioDbfs, AudioDbvu, Histogram, ParadeRGB, ParadeYUV, Vector100).
<!-- UNRESOLVED: SmartScope-specific scope selection commands not fully documented -->
<!-- UNRESOLVED: audio channel selection parameters not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - documents.blackmagicdesign.com
  - blackmagicdesign.com
  - github.com
source_urls:
  - "https://documents.blackmagicdesign.com/UserManuals/SmartViewManual.pdf?_v=1722841210000"
  - https://documents.blackmagicdesign.com/UserManuals/SmartViewManual.pdf
  - https://www.blackmagicdesign.com/products/smartview/techspecs
  - https://www.blackmagicdesign.com/developer
  - https://github.com/jscissr/smartview-client
retrieved_at: 2026-05-05T01:53:54.252Z
last_checked_at: 2026-05-05T06:10:41.042Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-05T06:10:41.042Z
matched_actions: 10
action_count: 10
confidence: medium
summary: "All 10 spec actions matched cleanly against documented commands; transport parameters verified; SmartView protocol fully represented. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "scope visualization features not fully documented in source excerpt"
- "input routing not present in excerpt"
- "network configuration variables stated but block structure implies"
- "source describes asynchronous state changes but does not enumerate"
- "no safety warnings or interlock procedures for power-on sequencing"
- "SmartScope-specific scope selection commands not fully documented"
- "audio channel selection parameters not documented"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
