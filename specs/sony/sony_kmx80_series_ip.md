---
spec_id: admin/sony-kmx80-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KMX80 Series Control Spec"
manufacturer: Sony
model_family: "KMX80 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KMX80 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
retrieved_at: 2026-05-27T09:57:51.234Z
last_checked_at: 2026-06-12T19:58:14.258Z
generated_at: 2026-06-12T19:58:14.258Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA specification variant restrictions not fully documented; see Notes"
  - "no standalone settable parameters beyond discrete actions"
  - "no explicit multi-step macro sequences documented"
  - "EU RED-DA variant command restrictions not fully enumerated in source"
  - "specific IR command codes for Video2, Picture Mode, Demo Surround, etc. documented in IR commands table but full behavior not described"
  - "firmware version compatibility not stated"
  - "command timing / rate-limiting requirements not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:58:14.258Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched one-to-one with FourCC command mnemonics in source; transport parameters verified; full source coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KMX80 Series Control Spec

## Summary
Sony Bravia professional display series supporting Simple IP Control over TCP on port 20060. Fixed 24-byte ASCII command/response protocol with FourCC command mnemonics. Supports power, volume, mute, input selection, picture mute, scene settings, and 52 IR remote codes. EU models have RED-DA variant restrictions noted.

<!-- UNRESOLVED: EU RED-DA specification variant restrictions not fully documented; see Notes -->

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
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (0-9999). See IR Commands table for mapping.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum:
        - 0
        - 1
      description: 0 = Standby (Off), 1 = Active (On)

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
      description: Volume value as decimal digit pad, zero-padded to 16 digits. e.g. 29 = "0000000000000029"

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
      description: 0 = Unmute, 1 = Mute

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
      description: Input type and index encoded as 4-digit type code + 4-digit index. Type codes: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Index range 1-9999.

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
      description: 0 = Disable picture mute, 1 = Turn screen black

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
      description: Scene name string, case-sensitive, padded right with "#". Values: auto, auto24pSync, general

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
      description: Interface name, e.g. "eth0". Padded with "#" to 16 chars.

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name, e.g. "eth0". Padded with "#" to 16 chars.
```

## Feedbacks
```yaml
- id: powerStatus
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Standby (Off), 1 = Active (On)"

- id: audioVolume
  type: integer
  description: Current audio volume as zero-padded decimal string (16 digits).

- id: audioMute
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Not Muted, 1 = Muted"

- id: inputType
  type: enum
  values:
    - "1"
    - "3"
    - "4"
    - "5"
  description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"

- id: inputIndex
  type: integer
  description: Input index within the selected type (1-9999).

- id: pictureMute
  type: enum
  values:
    - "0"
    - "1"
  description: "0 = Disabled (picture mute off), 1 = Enabled (picture mute on)"

- id: sceneSetting
  type: string
  description: Current scene setting string.

- id: broadcastAddress
  type: string
  description: IPv4 broadcast address of specified interface.

- id: macAddress
  type: string
  description: MAC address of specified interface.

- id: controlResult
  type: enum
  values:
    - "0000000000000000"
    - "NNNNNNNNNNNNNNNN"
    - "FFFFFFFFFFFFFFFF"
  description: "0000 = Success, NNNN = Not available, FFFF = Error"

- id: irccResult
  type: enum
  values:
    - "0000000000000000"
    - "FFFFFFFFFFFFFFFF"
  description: "0000 = Success, FFFF = Error"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  type: event
  params:
    - name: power
      type: integer
      enum:
        - 0
        - 1
      description: "0 = Powered off, 1 = Powered on"

- id: fireInputChange
  label: Input Change Event
  type: event
  params:
    - name: inputType
      type: integer
      enum:
        - 1
        - 3
        - 4
        - 5
      description: Input type code
    - name: inputIndex
      type: integer
      description: Input index (1-9999)

- id: fireVolumeChange
  label: Volume Change Event
  type: event
  params:
    - name: volume
      type: integer
      description: Current volume value

- id: fireMuteChange
  label: Mute Change Event
  type: event
  params:
    - name: mute
      type: integer
      enum:
        - 0
        - 1
      description: "0 = Unmuted, 1 = Muted"

- id: firePictureMuteChange
  label: Picture Mute Change Event
  type: event
  params:
    - name: mute
      type: integer
      enum:
        - 0
        - 1
      description: "0 = Picture mute enabled (screen black), 1 = Picture mute disabled"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
EU area models have 3 types of specifications based on RED-DA compliance. Settings and available commands differ per specification. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

<!-- UNRESOLVED: EU RED-DA variant command restrictions not fully enumerated in source -->
<!-- UNRESOLVED: specific IR command codes for Video2, Picture Mode, Demo Surround, etc. documented in IR commands table but full behavior not described -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: command timing / rate-limiting requirements not stated in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
retrieved_at: 2026-05-27T09:57:51.234Z
last_checked_at: 2026-06-12T19:58:14.258Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:58:14.258Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched one-to-one with FourCC command mnemonics in source; transport parameters verified; full source coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA specification variant restrictions not fully documented; see Notes"
- "no standalone settable parameters beyond discrete actions"
- "no explicit multi-step macro sequences documented"
- "EU RED-DA variant command restrictions not fully enumerated in source"
- "specific IR command codes for Video2, Picture Mode, Demo Surround, etc. documented in IR commands table but full behavior not described"
- "firmware version compatibility not stated"
- "command timing / rate-limiting requirements not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
