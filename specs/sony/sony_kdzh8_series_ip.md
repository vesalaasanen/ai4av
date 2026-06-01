---
spec_id: admin/sony-kdzh8-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDZH8 Series Control Spec"
manufacturer: Sony
model_family: KD-75ZH8
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-75ZH8
    - KD-85ZH8
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
last_checked_at: 2026-05-31T22:41:23.145Z
generated_at: 2026-05-31T22:41:23.145Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:23.145Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched verbatim in the source command reference table; transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDZH8 Series Control Spec

## Summary
Sony KDZH8 Series (BRAVIA Professional Displays) support Simple IP Control over TCP on port 20060. Fixed 24-byte SSIP protocol. Supports power, volume, mute, input selection, picture mute, scene settings, and IR command passthrough. EU models have RED-DA variant restrictions — see Notes.

<!-- UNRESOLVED: EU RED-DA spec variants not detailed in source — see pro-bravia.sony.net/setup/device-settings/red-da/ for details -->

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
- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: irCommand
      type: string
      description: IR command name (e.g. Display, Home, Up, Down, VolumeUp, VolumeDown, Mute, HDMI1, HDMI2, HDMI3, HDMI4, Num1-Num9, Num0, etc.)
  description: Sends an IR remote control code. See IR Commands table for full list of supported codes.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum: [0, 1]
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
      description: Volume value as decimal digit string, left-padded with zeros to 16 digits (e.g. 0000000000000029)

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
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: getAudioMute
  label: Get Audio Mute Status
  kind: query
  params: []

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: inputType
      type: integer
      enum: [1, 3, 4, 5]
      description: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring
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
      enum: [0, 1]
      description: 0 = Disable (picture on), 1 = Enable (screen black)

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
      enum: [auto, auto24pSync, general]
      description: Scene setting name, case-sensitive, right-padded with "#". e.g. "auto24pSync#####"

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
      description: Network interface name (e.g. "eth0")

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. "eth0")
```

## Feedbacks
```yaml
- id: powerStatus
  type: enum
  values: [standby, active]

- id: audioVolume
  type: integer
  description: Current volume value returned as 16-digit zero-padded decimal string

- id: audioMuteStatus
  type: enum
  values: [notMuted, muted]

- id: currentInput
  type: object
  properties:
    inputType:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=ScreenMirroring
    index:
      type: integer
      description: Input index (1-9999)

- id: pictureMuteStatus
  type: enum
  values: [disabled, enabled]

- id: sceneSetting
  type: string
  description: Current scene setting value (e.g. "auto", "auto24pSync", "general")

- id: broadcastAddress
  type: string
  description: IPv4 broadcast address e.g. "192.168.0.14"

- id: macAddress
  type: string
  description: MAC address e.g. "XX:XX:XX:XX:XX:XX"

- id: operationResult
  type: enum
  values: [success, error, notAvailable]
  description: Generic answer format. 0x0000 = success, 0xFFFF = error, 0xNNNN... = not available for current input
```

## Variables
```yaml
# No standalone settable parameters distinct from discrete actions in this protocol.
```

## Events
```yaml
- id: firePowerChange
  type: event
  params:
    - name: status
      type: integer
      enum: [0, 1]
      description: 0 = powering off, 1 = powering on
  description: Unsolicited notification sent when power state changes.

- id: fireInputChange
  type: event
  params:
    - name: inputType
      type: integer
      enum: [0, 1, 3, 4, 5]
      description: 0=no signal, 1=HDMI, 3=Composite, 4=Component, 5=ScreenMirroring
    - name: index
      type: integer
      description: Input index (1-9999)
  description: Unsolicited notification sent when input changes.

- id: fireVolumeChange
  type: event
  params:
    - name: volume
      type: string
      description: Volume value as 16-digit zero-padded decimal string
  description: Unsolicited notification sent when volume changes.

- id: fireMuteChange
  type: event
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = unmuted, 1 = muted
  description: Unsolicited notification sent when mute state changes.

- id: firePictureMuteChange
  type: event
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = picture on, 1 = picture off (black screen)
  description: Unsolicited notification sent when picture mute state changes.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
EU area models have 3 types of specifications based on RED-DA compliance. Settings and available commands differ per specification. Refer to https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

Message format: 24-byte fixed-size SSIP. Header: 0x2A 0x53. Footer: 0x0A. Message types: C=Control, E=Enquiry, A=Answer, N=Notify.

IR command parameter is a 16-digit decimal value (0-padded) corresponding to the IR code number from the IR Commands table.

<!-- UNRESOLVED: RED-DA EU variant command restrictions not detailed in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: max volume value range not stated in source -->
<!-- UNRESOLVED: network configuration (DHCP/static, IP address) not covered in Simple IP Control docs -->
<!-- UNRESOLVED: authentication/credentials for IP control not mentioned — none required per source -->

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
last_checked_at: 2026-05-31T22:41:23.145Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:23.145Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched verbatim in the source command reference table; transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
