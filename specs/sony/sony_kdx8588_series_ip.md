---
spec_id: admin/sony-kdx8588-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8588 Series Control Spec"
manufacturer: Sony
model_family: "KDX8588 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8588 Series"
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
last_checked_at: 2026-05-31T22:39:30.995Z
generated_at: 2026-05-31T22:39:30.995Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:39:30.995Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 9 spec actions matched literal FourCC codes in source with correct parameters and transport."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDX8588 Series Control Spec

## Summary
Sony professional display controlled over TCP port 20060. Simple IP Control protocol uses fixed 24-byte ASCII messages with FourCC command codes. Supports power, volume, mute, input selection, picture mute, scene settings, and IR remote passthrough. EU models vary by RED-DA spec.

<!-- UNRESOLVED: EU RED-DA spec variants affect available commands -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060  # stated: TCP control listening port
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
      description: 0 = Standby (Off), 1 = Active (On)

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
      description: Decimal volume value, zero-padded to 16 digits

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input_type
      type: integer
      description: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring
    - name: index
      type: integer
      description: Input index 1-9999

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Disable (picture on), 1 = Enable (black screen)

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
      description: Scene name - "auto", "auto24pSync", "general" (case-sensitive, right-padded with "#")

- id: setIrccCode
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (see IR Commands table)
```

## Feedbacks
```yaml
- id: power_state
  label: Power Status
  type: enum
  values:
    - "0"  # Standby (Off)
    - "1"  # Active (On)

- id: audio_volume
  label: Audio Volume
  type: integer
  description: Current volume value

- id: audio_mute_state
  label: Audio Mute Status
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted

- id: input_state
  label: Input Status
  type: object
  properties:
    input_type:
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    index:
      type: integer
      description: Input index 1-9999

- id: picture_mute_state
  label: Picture Mute Status
  type: enum
  values:
    - "0"  # Disabled
    - "1"  # Enabled

- id: scene_setting
  label: Scene Setting
  type: string
  description: Current scene setting value

- id: broadcast_address
  label: Broadcast IPv4 Address
  type: string
  description: Broadcast address for specified interface (eth0)

- id: mac_address
  label: MAC Address
  type: string
  description: MAC address for specified interface (eth0)
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  params:
    - name: state
      type: integer
      description: 0 = powering off, 1 = powering on

- id: fireInputChange
  label: Input Change Event
  params:
    - name: input_type
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: index
      type: integer
      description: Input index 1-9999

- id: fireVolumeChange
  label: Volume Change Event
  params:
    - name: volume
      type: integer
      description: New volume value

- id: fireMuteChange
  label: Mute Change Event
  params:
    - name: mute
      type: integer
      description: 0 = unmuting, 1 = muting

- id: firePictureMuteChange
  label: Picture Mute Change Event
  params:
    - name: mute
      type: integer
      description: 0 = picture mute enabled, 1 = picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
EU area models have 3 types of RED-DA specifications. Available commands differ per EU spec variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.
<!-- UNRESOLVED: EU RED-DA variant command differences not enumerated in source -->

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
last_checked_at: 2026-05-31T22:39:30.995Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:39:30.995Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 9 spec actions matched literal FourCC codes in source with correct parameters and transport."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
