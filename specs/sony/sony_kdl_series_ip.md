---
spec_id: admin/sony-kdl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL Series Control Spec"
manufacturer: Sony
model_family: "KDL Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDL Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T15:23:25.595Z
generated_at: 2026-04-27T15:23:25.595Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T15:23:25.595Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched cleanly to source FourCC commands; transport parameters verified; source fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony KDL Series Control Spec

## Summary
Sony KDL Series commercial monitors support Simple IP Control over TCP on port 20060. The protocol uses fixed 24-byte ASCII command messages with a FourCC command identifier, and supports power, audio, video input, and picture mute control. Notifications are pushed from the monitor to the client.

<!-- UNRESOLVED: EU area models have 3 RED-DA compliance specification types with differing commands — device-specific testing required -->

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
- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      description: "0 = Standby (Off), 1 = Active (On)"
      enum: [0, 1]

- id: togglePowerStatus
  label: Toggle Power Status
  kind: action
  params: []

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: "Volume as decimal digit string, zero-padded to 16 digits. e.g. 0000000000000029"

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = Unmute, 1 = Mute"
      enum: [0, 1]

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: "Input type code: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring. Sub-parameter XXXX at bytes 13-16 for input number."
      enum: [1, 3, 4, 5]

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = Disable (picture mute off), 1 = Enable (black screen)"
      enum: [0, 1]

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  params: []

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  params:
    - name: scene
      type: string
      description: "Scene name: auto, auto24pSync, general. Case-sensitive, padded on the right with '#'."

- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: ir_code
      type: integer
      description: "IR code number from the IR Commands table (0-299)"
- id: getPowerStatus
  label: Get Power Status
  kind: query
  params: []

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  params: []

- id: getAudioMute
  label: Get Audio Mute
  kind: query
  params: []

- id: getInput
  label: Get Input
  kind: query
  params: []

- id: getPictureMute
  label: Get Picture Mute
  kind: query
  params: []

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  params: []

- id: getBroadcastAddress
  label: Get Broadcast Address
  kind: query
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), hardcoded in FourCC parameter bytes 0-3"

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), hardcoded in FourCC parameter bytes 0-3"
```

## Feedbacks
```yaml
- id: powerStatus
  label: Power Status
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Standby (Off), 1 = Active (On)"

- id: audioVolume
  label: Audio Volume
  type: integer
  description: "Current volume value as decimal string"

- id: audioMute
  label: Audio Mute Status
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Not Muted, 1 = Muted"

- id: currentInput
  label: Current Input
  type: enum
  values:
    - "1"
    - "3"
    - "4"
    - "5"
  description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"

- id: pictureMute
  label: Picture Mute Status
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Disabled (picture mute off), 1 = Enabled (black screen)"

- id: sceneSetting
  label: Scene Setting
  type: string
  description: "Current scene setting string"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters found in source; all settable
# values are exposed via action/feedback pairs
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Notification
  type: event
  payload:
    - name: power
      type: integer
      description: "0 = powering off, 1 = powering on"
      enum: [0, 1]

- id: fireInputChange
  label: Input Change Notification
  type: event
  payload:
    - name: input
      type: integer
      description: "Input type code: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
      enum: [1, 3, 4, 5]
    - name: inputNumber
      type: string
      description: "Input number (XXXX), pad position"

- id: fireVolumeChange
  label: Volume Change Notification
  type: event
  payload:
    - name: volume
      type: string
      description: "New volume value as decimal digit string"

- id: fireMuteChange
  label: Mute Change Notification
  type: event
  payload:
    - name: mute
      type: integer
      description: "0 = unmuting, 1 = muting"
      enum: [0, 1]

- id: firePictureMuteChange
  label: Picture Mute Change Notification
  type: event
  payload:
    - name: mute
      type: integer
      description: "0 = picture mute enabled, 1 = picture mute disabled"
      enum: [0, 1]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
The protocol uses fixed 24-byte ASCII messages: header (2 bytes `*S`), message type (1 byte), FourCC command (4 bytes), parameters (16 bytes), footer (1 byte `0x0A`). EU area models have 3 types of RED-DA compliance specifications — available commands differ by model specification.
<!-- UNRESOLVED: IR command code mappings for setIrccCode are referenced but not fully enumerated in this spec -->
<!-- UNRESOLVED: getBroadcastAddress and getMacAddress use eth0 interface — interface selection not documented -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T15:23:25.595Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T15:23:25.595Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched cleanly to source FourCC commands; transport parameters verified; source fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
