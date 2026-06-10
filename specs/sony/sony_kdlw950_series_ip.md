---
spec_id: admin/sony-kdlw950-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW950 Series Control Spec"
manufacturer: Sony
model_family: "KDLW950 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW950 Series"
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
retrieved_at: 2026-05-26T04:20:19.362Z
last_checked_at: 2026-06-10T02:05:46.881Z
generated_at: 2026-06-10T02:05:46.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source. EU RED-DA models may have reduced command sets."
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "RS-232 serial control not documented in source"
  - "EU RED-DA spec command restrictions not detailed in source"
verification:
  verdict: verified
  checked_at: 2026-06-10T02:05:46.881Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim against source; all parameter shapes agree; transport verified; complete coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDLW950 Series Control Spec

## Summary
Sony Bravia professional display series controlled over local network via Simple IP Control protocol. Fixed 24-byte TCP messages on port 20060. Supports power, volume, mute, input selection, picture mute, and scene setting control. No authentication required.

<!-- UNRESOLVED: RS-232 serial control not documented in source. EU RED-DA models may have reduced command sets. -->

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
- powerable       # setPowerStatus, togglePowerStatus present
- queryable       # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting present
- levelable       # setAudioVolume present
- routable        # setInput, getInput present
```

## Actions
```yaml
- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)
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
      description: Volume value as decimal string left-padded with zeros, e.g. 0000000000000029

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute
      enum: [0, 1]

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input_type
      type: integer
      description: Input type number
      enum: [1, 3, 4, 5]
    - name: index
      type: integer
      description: Input index (1-9999)

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Disabled, 1 = Enabled (screen black)
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
      description: Scene name (case-sensitive, right-padded with #). Values: auto, auto24pSync, general

- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code number (0-9999)
      # See IR Commands table in source for full list of supported codes
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
  params: []

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: powerState
  label: Power State
  type: enum
  values:
    - 0  # Standby (Off)
    - 1  # Active (On)

- id: audioVolume
  label: Audio Volume
  type: integer
  description: Current volume value as decimal string

- id: audioMuteState
  label: Audio Mute State
  type: enum
  values:
    - 0  # Not Muted
    - 1  # Muted

- id: inputState
  label: Input State
  type: object
  fields:
    input_type:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    index:
      type: integer
      description: Input index (1-9999)

- id: pictureMuteState
  label: Picture Mute State
  type: enum
  values:
    - 0  # Disabled (picture mute off)
    - 1  # Enabled (picture mute on)

- id: sceneSetting
  label: Scene Setting
  type: string
  description: Current scene setting value

- id: broadcastAddress
  label: Broadcast Address
  type: string
  description: IPv4 broadcast address of specified interface (eth0)

- id: macAddress
  label: MAC Address
  type: string
  description: MAC address of specified interface (eth0)
```

## Events
```yaml
# Monitor sends Notify messages to client on state changes
- id: powerChange
  label: Power Change Event
  type: object
  fields:
    state:
      type: integer
      enum: [0, 1]
      description: 0=Powering off, 1=Powering on

- id: inputChange
  label: Input Change Event
  type: object
  fields:
    input_type:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    index:
      type: integer
      description: Input index (1-9999)

- id: volumeChange
  label: Volume Change Event
  type: integer
  description: Current volume value

- id: muteChange
  label: Mute Change Event
  type: enum
  values: [0, 1]
  description: 0=Unmuting, 1=Muting

- id: pictureMuteChange
  label: Picture Mute Change Event
  type: enum
  values: [0, 1]
  description: 0=Picture mute enabled (screen black), 1=Picture mute disabled
```

## Macros
```yaml
# No explicit macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command syntax (24-byte fixed format): `*S[Type][FourCC][Parameters........]`

- Byte 0-1: Header `*S` (0x2A 0x53)
- Byte 2: Message Type — C=Control, E=Enquiry, A=Answer, N=Notify
- Byte 3-6: FourCC command identifier (e.g. POWR, VOLU)
- Byte 7-22: 16-byte parameter field
- Byte 23: Footer 0x0A (LF)

Success response: `AAAAAAAAAAAAAAA` (16x 0x30). Error response: `FFFFFFFFFFFFFFFF` (16x 0x46).

IR commands supported via setIrccCode include: Display, Home, Options, Return, Up, Down, Left, Right, Confirm, color buttons (Red/Green/Yellow/Blue), number keys (0-9), Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, media controls (Play/Forward/Rewind/Stop/Next/Prev/Pause), TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help.

EU area models have 3 RED-DA compliance specification types; available commands differ per spec.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: RS-232 serial control not documented in source -->
<!-- UNRESOLVED: EU RED-DA spec command restrictions not detailed in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T04:20:19.362Z
last_checked_at: 2026-06-10T02:05:46.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T02:05:46.881Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim against source; all parameter shapes agree; transport verified; complete coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source. EU RED-DA models may have reduced command sets."
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "RS-232 serial control not documented in source"
- "EU RED-DA spec command restrictions not detailed in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
