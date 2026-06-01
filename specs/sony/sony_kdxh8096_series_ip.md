---
spec_id: admin/sony-kdxh8096-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXH8096 Series Control Spec"
manufacturer: Sony
model_family: "KDXH8096 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXH8096 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:22.393Z
generated_at: 2026-05-31T22:41:22.393Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:22.393Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec action ids matched exactly to source SSIP protocol command FourCC codes with correct message types, parameters, and enum shapes; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDXH8096 Series Control Spec

## Summary
Sony BRAVIA Professional Display series controlled over TCP/IP via Simple IP Control. Fixed 24-byte SSIP protocol on port 20060. Supports power, volume, mute, input selection, picture mute, scene settings, and IR command passthrough. EU models have reduced command sets per RED-DA compliance.

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
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (0-999 per IR command table)

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum:
        - 0
        - 1
      description: "0 = Standby (Off), 1 = Active (On)"

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
      description: Volume value as decimal digit string left-padded with 0 (e.g., 0000000000000029)

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
      description: "0 = Unmute, 1 = Mute"

- id: getAudioMute
  label: Get Audio Mute Status
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
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
    - name: index
      type: integer
      description: Input index (1-9999)

- id: getInput
  label: Get Current Input
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
      description: "0 = Disable (show picture), 1 = Enable (black screen)"

- id: getPictureMute
  label: Get Picture Mute Status
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
      enum:
        - auto
        - auto24pSync
        - general
      description: Scene setting name (case-sensitive, right-padded with #)

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
- id: powerState
  label: Power State
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Standby (Off), 1 = Active (On)"

- id: audioVolume
  label: Audio Volume
  type: integer
  description: Current volume value

- id: audioMuteState
  label: Audio Mute State
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Not Muted, 1 = Muted"

- id: inputState
  label: Input State
  type: object
  fields:
    - name: type
      type: integer
      enum: [1, 3, 4, 5]
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
    - name: index
      type: integer
      description: Input index (1-9999)

- id: pictureMuteState
  label: Picture Mute State
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Disabled, 1 = Enabled (black screen)"

- id: sceneSettingState
  label: Scene Setting
  type: string
  description: Current scene setting value

- id: broadcastAddress
  label: Broadcast Address
  type: string
  description: IPv4 broadcast address

- id: macAddress
  label: MAC Address
  type: string
  description: MAC address of specified interface

- id: operationResult
  label: Operation Result
  type: enum
  values:
    - "0000000000000000"
    - NNNNNNNNNNNNNNNN
    - FFFFFFFFFFFFFFFF
  description: "0000000000000000 = Success, NNNNNNNNNNNNNNNN = Not available, FFFFFFFFFFFFFFFF = Error"
```

## Variables
```yaml
- id: currentPowerStatus
  type: integer
  description: Current power state (0 = off, 1 = on)

- id: currentVolume
  type: integer
  description: Current audio volume level

- id: currentMuteStatus
  type: integer
  description: Current mute status (0 = unmuted, 1 = muted)

- id: currentInput
  type: object
  description: Current input type and index

- id: currentPictureMute
  type: integer
  description: Current picture mute state

- id: currentSceneSetting
  type: string
  description: Current scene setting
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Notification
  params:
    - name: power
      type: integer
      enum: [0, 1]
      description: "0 = powering off, 1 = powering on"

- id: fireInputChange
  label: Input Change Notification
  params:
    - name: input
      type: integer
      enum: [1, 3, 4, 5]
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
    - name: index
      type: integer
      description: Input index

- id: fireVolumeChange
  label: Volume Change Notification
  params:
    - name: volume
      type: string
      description: Volume value

- id: fireMuteChange
  label: Mute Change Notification
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: "0 = unmuting, 1 = muting"

- id: firePictureMuteChange
  label: Picture Mute Change Notification
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: "0 = enabling (black screen), 1 = disabling (showing picture)"
```

## Macros
```yaml
# IR Command passthrough via setIrccCode covers all IR commands:
# Display, Home, Options, Return, Up, Down, Right, Left, Confirm,
# Red, Green, Yellow, Blue, Num0-Num9, VolumeUp, VolumeDown, Mute,
# ChannelUp, ChannelDown, Subtitle, DOT, PictureOff, Wide, Jump,
# SyncMenu, Forward, Play, Rewind, Prev, Stop, Next, Pause,
# FlashPlus, FlashMinus, TVPower, Audio, Input, Sleep, SleepTimer,
# Video2, PictureMode, DemoSurround, HDMI1, HDMI2, HDMI3, HDMI4,
# ActionMenu, Help
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
SSIP protocol uses fixed 24-byte messages: header (2 bytes), message type (1 byte), command FourCC (4 bytes), parameters (16 bytes), footer (1 byte LF).

Message types: C=Control, E=Enquiry, A=Answer, N=Notify.

EU models have reduced command availability per RED-DA compliance. Specific command restrictions not detailed in this source.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: EU RED-DA command restrictions not enumerated in source -->
<!-- UNRESOLVED: IP address configuration method not described -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:22.393Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:22.393Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec action ids matched exactly to source SSIP protocol command FourCC codes with correct message types, parameters, and enum shapes; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
