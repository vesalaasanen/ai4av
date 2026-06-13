---
spec_id: admin/sony-xbrx955-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XBRX955 Series Control Spec"
manufacturer: Sony
model_family: "XBRX955 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XBRX955 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T15:10:29.772Z
last_checked_at: 2026-06-12T19:58:16.094Z
generated_at: 2026-06-12T19:58:16.094Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA compliance variations not documented"
  - "firmware version compatibility not stated in source"
  - "EU RED-DA compliance specification variants not fully documented"
  - "voltage/current/power specifications not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:58:16.094Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions found verbatim in source command table with matching parameters and transport. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony XBRX955 Series Control Spec

## Summary
Sony XBRX955 Series smart TV controlled over TCP/IP on port 20060. Simple IP Control protocol uses fixed 24-byte ASCII messages with four-CC command codes. Supports power, volume, mute, input selection, picture mute, scene settings, and IR remote code passthrough.

<!-- UNRESOLVED: EU RED-DA compliance variations not documented -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none
```

## Traits
```yaml
powerable: true
levelable: true
routable: true
queryable: true
```

## Actions
```yaml
- id: setIrccCode
  label: Send IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR code number (0-999)

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum:
        - 0
        - 1

- id: getPowerStatus
  label: Get Power Status
  kind: query
  params: []

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
      description: Volume value as decimal digits, zero-padded left (e.g., 0000000000000029)

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  params: []

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum:
        - 0
        - 1

- id: getAudioMute
  label: Get Audio Mute
  kind: query
  params: []

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      enum:
        - 1
        - 3
        - 4
        - 5
      description: Input type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring)

- id: getInput
  label: Get Input
  kind: query
  params: []

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum:
        - 0
        - 1

- id: getPictureMute
  label: Get Picture Mute
  kind: query
  params: []

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
      description: Scene name (auto, auto24pSync, general), case-sensitive, padded right with "#"

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
      description: Interface name (e.g., eth0)

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name (e.g., eth0)
```

## Feedbacks
```yaml
- id: powerStatusAnswer
  type: enum
  values:
    - "0000000000000000"
    - "0000000000000001"
  description: 0=Standby(Off), 1=Active(On)

- id: audioVolumeAnswer
  type: string
  description: Volume value as zero-padded decimal string

- id: audioMuteAnswer
  type: enum
  values:
    - "0000000000000000"
    - "0000000000000001"
  description: 0=Not Muted, 1=Muted

- id: inputAnswer
  type: enum
  values:
    - "000000010000XXXX"
    - "000000030000XXXX"
    - "000000040000XXXX"
    - "000000050000XXXX"
  description: Input type + index (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring)

- id: pictureMuteAnswer
  type: enum
  values:
    - "0000000000000000"
    - "0000000000000001"
  description: 0=Disabled, 1=Enabled

- id: sceneSettingAnswer
  type: string
  description: Current scene setting value

- id: broadcastAddressAnswer
  type: string
  description: IPv4 broadcast address, right-padded with "#"

- id: macAddressAnswer
  type: string
  description: MAC address, right-padded with "#"

- id: commandSuccess
  type: string
  value: "0000000000000000"

- id: commandError
  type: string
  value: "FFFFFFFFFFFFFFFF"

- id: notAvailable
  type: string
  value: "NNNNNNNNNNNNNNNN"
  description: Command not available for current input

- id: notFound
  type: string
  value: "NNNNNNNNNNNNNNNN"
  description: Input not found
```

## Variables
```yaml
# All settable parameters exposed as actions with get/set pairs above.
# No additional standalone variables.
```

## Events
```yaml
- id: firePowerChange
  type: notification
  params:
    - name: power
      type: integer
      enum: [0, 1]
  description: Monitor sends when power state changes

- id: fireInputChange
  type: notification
  params:
    - name: input
      type: enum
      values: [1, 3, 4, 5]
    - name: index
      type: integer
  description: Monitor sends when input changes

- id: fireVolumeChange
  type: notification
  params:
    - name: volume
      type: integer
  description: Monitor sends when volume changes

- id: fireMuteChange
  type: notification
  params:
    - name: mute
      type: integer
      enum: [0, 1]
  description: Monitor sends when mute state changes

- id: firePictureMuteChange
  type: notification
  params:
    - name: mute
      type: integer
      enum: [0, 1]
  description: Monitor sends when picture mute changes
```

## Macros
```yaml
# No explicit macro sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: EU RED-DA compliance specification variants not fully documented -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T15:10:29.772Z
last_checked_at: 2026-06-12T19:58:16.094Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:58:16.094Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions found verbatim in source command table with matching parameters and transport. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA compliance variations not documented"
- "firmware version compatibility not stated in source"
- "EU RED-DA compliance specification variants not fully documented"
- "voltage/current/power specifications not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
