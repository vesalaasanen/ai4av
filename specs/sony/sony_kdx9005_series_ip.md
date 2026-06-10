---
spec_id: admin/sony-kdx9005-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX9005 Series Control Spec"
manufacturer: Sony
model_family: "KDX9005 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX9005 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-05-26T09:24:48.371Z
last_checked_at: 2026-06-10T01:22:28.628Z
generated_at: 2026-06-10T01:22:28.628Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have variant specifications per RED-DA compliance; commands differ by region"
  - "no discrete settable parameters outside action commands"
  - "no multi-step macro sequences documented in source"
  - "no safety warnings or interlock procedures in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T01:22:28.628Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 action-units match source commands exactly; FourCC codes, message types, parameter ranges, and enum values verified (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDX9005 Series Control Spec

## Summary
Sony BRAVIA Professional Display Simple IP Control protocol over TCP. Controls monitor over local network via fixed-size 24-byte messages on port 20060. Supports power, volume, mute, input selection, picture mute, and scene settings.

<!-- UNRESOLVED: EU models have variant specifications per RED-DA compliance; commands differ by region -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)
      enum: [0, 1]

- id: get_power_status
  label: Get Power Status
  kind: action
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level as decimal string padded left with zeros (e.g., 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: action
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute
      enum: [0, 1]

- id: get_audio_mute
  label: Get Audio Mute
  kind: action
  params: []

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input_type
      type: integer
      description: Input type code. 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
      enum: [1, 3, 4, 5]
    - name: index
      type: integer
      description: Input index (1-9999)

- id: get_input
  label: Get Input
  kind: action
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Disabled (picture mute off), 1 = Enabled (picture mute on)
      enum: [0, 1]

- id: get_picture_mute
  label: Get Picture Mute
  kind: action
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  params:
    - name: scene
      type: string
      description: Scene name (auto, auto24pSync, general). Case-sensitive, padded right with "#"

- id: get_scene_setting
  label: Get Scene Setting
  kind: action
  params: []

- id: set_ircc_code
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (0-999). See IR Commands table for mapping.
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: action
  params:
    - name: interface
      type: string
      description: Network interface name (e.g., eth0), padded right with "#" to fill 16-byte parameter field

- id: get_mac_address
  label: Get Mac Address
  kind: action
  params:
    - name: interface
      type: string
      description: Network interface name (e.g., eth0), padded right with "#" to fill 16-byte parameter field
```

## Feedbacks
```yaml
- id: power_status_response
  type: enum
  values:
    - 0: Standby (Off)
    - 1: Active (On)
    - FFFF: Error

- id: audio_volume_response
  type: integer
  description: Volume value as decimal string

- id: audio_mute_response
  type: enum
  values:
    - 0: Not Muted
    - 1: Muted
    - FFFF: Error

- id: input_response
  type: object
  properties:
    input_type:
      type: integer
      enum: [1, 3, 4, 5]
    index:
      type: integer
  values:
    - error: Not Found (NNNN...N)
    - success: Success (0000...0)
    - error: Error (FFFF...F)

- id: picture_mute_response
  type: enum
  values:
    - 0: Disabled (Picture mute off)
    - 1: Enabled (Picture mute on)
    - FFFF: Error

- id: scene_setting_response
  type: string
  description: Scene setting value or NNNNNNNN if not available for current input

- id: ircc_response
  type: enum
  values:
    - 0000...0: Success
    - FFFF...F: Error
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside action commands
```

## Events
```yaml
- id: fire_power_change
  label: Power Change Event
  params:
    - name: state
      type: integer
      description: 0 = Powering off, 1 = Powering on

- id: fire_input_change
  label: Input Change Event
  params:
    - name: input_type
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: index
      type: integer

- id: fire_volume_change
  label: Volume Change Event
  params:
    - name: volume
      type: string
      description: Current volume value

- id: fire_mute_change
  label: Mute Change Event
  params:
    - name: state
      type: integer
      description: 0 = Unmuting, 1 = Muting

- id: fire_picture_mute_change
  label: Picture Mute Change Event
  params:
    - name: state
      type: integer
      description: 0 = Picture mute enabled (screen black), 1 = Picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
The protocol uses 24-byte fixed-size messages with header `0x2A 0x53` (ASCII `*S`) and footer `0x0A` (LF). Message types: Control (0x43/C), Enquiry (0x45/E), Answer (0x41/A), Notify (0x4E/N). Commands use FourCC format (4 ASCII chars). EU models have variant specs per RED-DA compliance — available commands differ by specification type.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
retrieved_at: 2026-05-26T09:24:48.371Z
last_checked_at: 2026-06-10T01:22:28.628Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T01:22:28.628Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 action-units match source commands exactly; FourCC codes, message types, parameter ranges, and enum values verified (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have variant specifications per RED-DA compliance; commands differ by region"
- "no discrete settable parameters outside action commands"
- "no multi-step macro sequences documented in source"
- "no safety warnings or interlock procedures in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
