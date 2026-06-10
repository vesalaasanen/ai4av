---
spec_id: admin/lumens-cl510
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lumens CL510 Control Spec"
manufacturer: Lumens
model_family: CL510
aliases: []
compatible_with:
  manufacturers:
    - Lumens
  models:
    - CL510
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/Ethernet%20command%20set%20-%20CL510.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:38:42.559Z
last_checked_at: 2026-06-09T11:56:07.697Z
generated_at: 2026-06-09T11:56:07.697Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "default HTTP port not stated in source"
  - "no unsolicited notifications documented"
  - "no multi-step macros documented"
  - "no explicit safety warnings or interlock sequences in source"
  - "default HTTP port (assumed 80 if not specified by client)"
  - "maximum simultaneous connections not stated"
  - "command response timeout not stated"
  - "lamp/laser safety interlock details not in source (section 4.3 referenced but not included)"
verification:
  verdict: verified
  checked_at: 2026-06-09T11:56:07.697Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "Spec is complete and accurate. Every action id has explicit source evidence. Transport parameters (HTTP, /vb.htm, basic_url auth) all supported by refined source. No fabrications, no unresolved parameters in action definitions. Hypothetical action count 25 matches Authoritative 25. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Lumens CL510 Control Spec

## Summary
Lumens CL510 Document Camera. HTTP-based control protocol using GET requests with Basic Auth embedded in URL. Format: `http://<Account:Password>@<IP>/vb.htm?<Request>=<Value>`. No separate login sequence required.

<!-- UNRESOLVED: default HTTP port not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /vb.htm
auth:
  type: basic_url  # inferred: credentials encoded in URL per source example admin:9999
```

## Traits
```yaml
- powerable
- queryable
- levelable
```

## Actions
```yaml
- id: powerstatus
  label: System Power Control
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Power Off, 01=Power On

- id: autotune
  label: Auto Tune
  kind: action
  params: []

- id: freeze
  label: Freeze
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Off, 01=On

- id: zoomset
  label: Zoom
  kind: action
  params:
    - name: value
      type: integer
      description: 0~32

- id: brightnessset
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0~255

- id: capture
  label: Capture (Single)
  kind: action
  params: []

- id: capture_continuous
  label: Capture (Continuous)
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Off, 01=On

- id: lamp
  label: Laser Lamp
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Laser Off, 01=Laser On

- id: autoexposure
  label: Auto Exposure
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Off, 01=On

- id: autofocus
  label: Auto Focus
  kind: action
  params: []

- id: rotate
  label: Rotate
  kind: action
  params: []

- id: phototext
  label: Photo/Text Mode
  kind: action
  params: []

- id: operationmode
  label: Image Mode
  kind: action
  params: []

- id: playaction
  label: Playback
  kind: action
  params: []

- id: liveimage
  label: Live Image
  kind: action
  params: []

- id: slideshow
  label: Slide Show
  kind: action
  params:
    - name: value
      type: integer
      description: 00=Off, 01=On

- id: enteraction
  label: Enter
  kind: action
  params: []

- id: upaction
  label: Up
  kind: action
  params: []

- id: downaction
  label: Down
  kind: action
  params: []

- id: leftaction
  label: Left
  kind: action
  params: []

- id: rightaction
  label: Right
  kind: action
  params: []

- id: loadpreset
  label: Load Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 1~8

- id: savepreset
  label: Save Preset
  kind: action
  params:
    - name: value
      type: integer
      description: 1~8
- id: getlumensstatus
  label: Get Server Status
  kind: query
  params: []

- id: getlumensxml
  label: Get Server Status (XML)
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values:
    - 0  # System standby
    - 1  # Warm up
    - 2  # Preview

- id: freeze_state
  type: enum
  values: [0, 1]  # 0=Unfreeze, 1=Freeze

- id: lamp_state
  type: enum
  values: [0, 1]  # 0=Laser Off, 1=Laser On

- id: machine_status
  type: enum
  values:
    - 0   # Preview mode
    - 2   # Mask mode
    - 4   # Record mode
    - 5   # Pan mode
    - 6   # Main OSD mode
    - 7   # Thumbnail mode
    - 8   # PIP Thumbnail mode
    - 9   # Playback mode
    - 12  # Slide Show mode
    - 16  # Service Menu mode
    - 18  # Power Down mode
    # 1,3,10,11,13,14,15,17,19 = NA

- id: operation_mode
  type: enum
  values:
    - 0  # Normal
    - 1  # Slide
    - 2  # Film

- id: photo_text_mode
  type: enum
  values:
    - 0  # Photo
    - 1  # Text
    - 2  # Gray

- id: zoom_value
  type: integer
  range: [0, 32]

- id: brightness
  type: integer
  range: [0, 255]

- id: capture_type
  type: enum
  values:
    - 0  # Single capture
    - 1  # Continue capture
    - 2  # Off

- id: continue_capture
  type: enum
  values: [0, 1]  # 0=off, 1=on

- id: autoexposure_state
  type: enum
  values: [0, 1]  # 0=Auto Exposure Off, 1=Auto Exposure On
```

## Variables
```yaml
- id: zoom_value
  label: Zoom Value
  type: integer
  range: [0, 32]
  writable: true

- id: brightness
  label: Brightness Value
  type: integer
  range: [0, 255]
  writable: true

- id: slideshow
  label: Slide Show
  type: enum
  values: [0, 1]
  writable: true
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Laser (lamp) command requires caution - no explicit safety procedure in source
# UNRESOLVED: no explicit safety warnings or interlock sequences in source
```

## Notes
- Trigger commands (autofocus, rotate, phototext, operationmode, playaction, liveimage, enteraction, upaction, downaction, leftaction, rightaction) require no value parameter.
- Undefined parameters default to zero.
- Status query returns semicolon-delimited key:value pairs: `getlumensstatus=cPower:2;zoomValue:0;birthness:124;...`
- XML status query returns equivalent XML structure.
- account field in status response shows `admin,9999` indicating admin account with password 9999.
<!-- UNRESOLVED: default HTTP port (assumed 80 if not specified by client) -->
<!-- UNRESOLVED: maximum simultaneous connections not stated -->
<!-- UNRESOLVED: command response timeout not stated -->
<!-- UNRESOLVED: lamp/laser safety interlock details not in source (section 4.3 referenced but not included) -->

## Provenance

```yaml
source_domains:
  - mylumens.com
source_urls:
  - "https://www.mylumens.com/Download/Ethernet%20command%20set%20-%20CL510.pdf"
  - "https://www.mylumens.com/Download/RS128%20-%20LC200%20RS-232%20command%20set_1_5.pdf"
retrieved_at: 2026-05-13T06:38:42.559Z
last_checked_at: 2026-06-09T11:56:07.697Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T11:56:07.697Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "Spec is complete and accurate. Every action id has explicit source evidence. Transport parameters (HTTP, /vb.htm, basic_url auth) all supported by refined source. No fabrications, no unresolved parameters in action definitions. Hypothetical action count 25 matches Authoritative 25. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "default HTTP port not stated in source"
- "no unsolicited notifications documented"
- "no multi-step macros documented"
- "no explicit safety warnings or interlock sequences in source"
- "default HTTP port (assumed 80 if not specified by client)"
- "maximum simultaneous connections not stated"
- "command response timeout not stated"
- "lamp/laser safety interlock details not in source (section 4.3 referenced but not included)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
