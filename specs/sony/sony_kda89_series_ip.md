---
spec_id: admin/sony-kda89-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDA89 Series Control Spec"
manufacturer: Sony
model_family: "KDA89 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDA89 Series"
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
last_checked_at: 2026-05-31T21:25:58.249Z
generated_at: 2026-05-31T21:25:58.249Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:25:58.249Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions match FourCC codes and parameters in source command table; transport parameters confirmed; no fabrication or drift detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDA89 Series Control Spec

## Summary
Sony KDA89 Series professional display controlled over TCP/IP via Simple IP Control protocol. Fixed 24-byte SSIP frames on TCP port 20060. Supports power, volume, mute, input selection, picture mute, scene settings, and IR remote passthrough via `setIrccCode`. No authentication required.

<!-- UNRESOLVED: RED-DA compliance variants (EU models) may have different command availability — not modeled here -->

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
    - name: code
      type: integer
      description: IR code number (0-9999). See IR Commands table.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum:
        - 0: Standby (Off)
        - 1: Active (On)

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
      description: Volume value as decimal string left-padded with 0 (e.g., 0000000000000029 for 29)

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
        - 0: Unmute
        - 1: Mute

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
        - 1: HDMI
        - 3: Composite
        - 4: Component
        - 5: Screen Mirroring

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
        - 0: Disabled (picture mute off)
        - 1: Enabled (black screen)

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
      description: Case-sensitive, right-padded with "#"

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
      default: eth0

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      default: eth0
```

## Feedbacks
```yaml
- id: powerState
  label: Power State
  type: enum
  values:
    - "0": Standby (Off)
    - "1": Active (On)

- id: audioVolume
  label: Audio Volume
  type: integer

- id: audioMuteState
  label: Audio Mute State
  type: enum
  values:
    - "0": Not Muted
    - "1": Muted

- id: currentInput
  label: Current Input
  type: enum
  values:
    - "1": HDMI
    - "3": Composite
    - "4": Component
    - "5": Screen Mirroring

- id: pictureMuteState
  label: Picture Mute State
  type: enum
  values:
    - "0": Disabled (picture mute off)
    - "1": Enabled (black screen)

- id: sceneSetting
  label: Scene Setting
  type: string

- id: actionResult
  label: Action Result
  type: enum
  values:
    - "0000000000000000": Success
    - "FFFFFFFFFFFFFFFF": Error
    - "NNNNNNNNNNNNNNNN": Not available for current input

- id: broadcastAddress
  label: Broadcast Address
  type: string

- id: macAddress
  label: MAC Address
  type: string
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond discrete actions
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  params:
    - name: power
      type: integer
      enum:
        - 0: Powering off
        - 1: Powering on

- id: fireInputChange
  label: Input Change Event
  params:
    - name: input
      type: integer
      enum:
        - 1: HDMI
        - 3: Composite
        - 4: Component
        - 5: Screen Mirroring

- id: fireVolumeChange
  label: Volume Change Event
  params:
    - name: volume
      type: integer

- id: fireMuteChange
  label: Mute Change Event
  params:
    - name: mute
      type: integer
      enum:
        - 0: Unmuting
        - 1: Muting

- id: firePictureMuteChange
  label: Picture Mute Change Event
  params:
    - name: mute
      type: integer
      enum:
        - 0: Picture mute enabled
        - 1: Picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
The protocol uses fixed 24-byte frames: header `0x2A 0x53`, message type byte, 4-byte FourCC command, 16-byte parameter field, footer `0x0A`. All values padded to fill 24 bytes. EU models have RED-DA compliance variants with different command availability.

<!-- UNRESOLVED: RED-DA variant command restrictions not enumerated in source -->
<!-- UNRESOLVED: specific error codes (beyond FFFFFF) not documented -->

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
last_checked_at: 2026-05-31T21:25:58.249Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:25:58.249Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions match FourCC codes and parameters in source command table; transport parameters confirmed; no fabrication or drift detected."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
