---
spec_id: admin/sony-kdlwm15-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLWM15 Series Control Spec"
manufacturer: Sony
model_family: "KDLWM15 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLWM15 Series"
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
last_checked_at: 2026-05-31T22:39:28.018Z
generated_at: 2026-05-31T22:39:28.018Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:39:28.018Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec action IDs matched to source command table entries; port 20060 TCP verified; complete coverage of 10 distinct wire-level command tokens."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDLWM15 Series Control Spec

## Summary
Sony Bravia professional display series supporting Simple IP Control over TCP port 20060. Fixed 24-byte ASCII message protocol for AV equipment control via local network. No authentication required.

<!-- UNRESOLVED: RED-DA compliance variants with differing commands not fully documented -->

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
- powerable  # inferred from setPowerStatus, getPowerStatus, togglePowerStatus
- queryable  # inferred from getPowerStatus, getAudioVolume, getInput, etc.
- levelable  # inferred from setAudioVolume, getAudioVolume, setPictureMute
- routable   # inferred from setInput, getInput
```

## Actions
```yaml
- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: status
      type: integer
      description: "0 = Standby (Off), 1 = Active (On)"
- id: getPowerStatus
  label: Get Power Status
  kind: action
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
      type: string
      description: Decimal digit pad on left with "0", e.g. "0000000000000029"
- id: getAudioVolume
  label: Get Audio Volume
  kind: action
  params: []
- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute      type: integer
      description: "0 = Unmute, 1 = Mute"
- id: getAudioMute
  label: Get Audio Mute
  kind: action
  params: []
- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: "1 = HDMI, 3 = Composite, 4A = Component, 5 = Screen Mirroring"
- id: getInput
  label: Get Input
  kind: action
  params: []
- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: "0 = Disable (picture mute off), 1 = Enable (screen black)"
- id: getPictureMute
  label: Get Picture Mute
  kind: action
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
      description: "auto, auto24pSync, or general - case-sensitive, padded right with #"
- id: getSceneSetting
  label: Get Scene Setting
  kind: action
  params: []
- id: setIrccCode
  label: Send IR Command Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (0-255). Full IR code list documented separately in source.
- id: getBroadcastAddress
  label: Get Broadcast IPv4 Address
  kind: action
  params:
    - name: interface
      type: string
      description: "Interface name, e.g. eth0"
- id: getMacAddress
  label: Get MAC Address
  kind: action
  params:
    - name: interface
      type: string
      description: "Interface name, e.g. eth0"
```

## Feedbacks
```yaml
- id: power_status
  label: Power Status
  type: enum
  values:
    - "0"  # Standby (Off)
    - "1"  # Active (On)
- id: audio_volume
  label: Audio Volume
  type: string
  description: Decimal volume value
- id: audio_mute
  label: Audio Mute Status
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted
- id: input_selected
  label: Input
  type: enum
  values:
    - "1"    # HDMI
    - "3"    # Composite
    - "4"    # Component
    - "5"    # Screen Mirroring
- id: picture_mute
  label: Picture Mute Status
  type: enum
  values:
    - "0"  # Disabled
    - "1"  # Enabled
- id: scene_setting
  label: Scene Setting
  type: string
  description: Current scene mode string
- id: broadcast_address
  label: Broadcast Address
  type: string
- id: mac_address
  label: MAC Address
  type: string
- id: answer_success
  label: Command Success
  type: enum
  values:
    - "0000000000000000"  # All success answers share this pattern
- id: answer_error
  label: Command Error
  type: enum
  values:
    - "FFFFFFFFFFFFFFFF"  # All error answers share this pattern
- id: answer_not_available
  label: Not Available
  type: enum
  values:
    - "NNNNNNNNNNNNNNNN"  # Not available for current input
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond Actions above
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  params:
    - name: status
      type: integer
      description: "0 = powering off, 1 = powering on"
- id: fireInputChange
  label: Input Change Event
  params:
    - name: input
      type: integer
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
- id: fireVolumeChange
  label: Volume Change Event
  params:
    - name: volume
      type: string description: New volume value
- id: fireMuteChange
  label: Mute Change Event
  params:
    - name: mute
      type: integer
      description: "0 = unmuting, 1 = muting"
- id: firePictureMuteChange
  label: Picture Mute Change Event
  params:
    - name: mute
      type: integer
      description: "0 = picture mute enabled, 1 = picture mute disabled"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Simple IP Control uses fixed 24-byte ASCII messages. Message format:2-byte header (0x2A 0x53), 1-byte message type, 4-byte FourCC command code, 16-byte parameters, 1-byte footer (0x0A). Commands confirmed working via netcat example in source. EU models have RED-DA compliance variants with differing available commands — not fully documented here.
<!-- UNRESOLVED: full IR command parameter values (Byte[7]–Byte[22]) for setIrccCode not enumerated end-to-end in this doc — table shows codes but not raw parameter mapping for all IR commands -->

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
last_checked_at: 2026-05-31T22:39:28.018Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:39:28.018Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec action IDs matched to source command table entries; port 20060 TCP verified; complete coverage of 10 distinct wire-level command tokens."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
