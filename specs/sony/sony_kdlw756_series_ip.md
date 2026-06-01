---
spec_id: admin/sony-kdlw756-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW756 Series Control Spec"
manufacturer: Sony
model_family: "KDLW756 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW756 Series"
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
last_checked_at: 2026-05-31T22:30:32.178Z
generated_at: 2026-05-31T22:30:32.178Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - BADR
  - MADR
verification:
  verdict: verified
  checked_at: 2026-05-31T22:30:32.178Z
  matched_actions: 15
  action_count: 15
  confidence: high
  summary: "All 15 spec actions matched to their corresponding source commands (IRCC, POWR, TPOW, VOLU, AMUT, INPT, PMUT, TPMU, SCEN); transport verified; 2 unrepresented network diagnostic commands (BADR, MADR) are orthogonal to core AV control."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDLW756 Series Control Spec

## Summary
Sony Bravia Professional Display controlled over local network via Simple IP Control. TCP port 20060. Fixed 24-byte message format. Supports power, volume, mute, input routing, picture mute, scene settings, and IR command passthrough.

<!-- UNRESOLVED: EU models have RED-DA variant specs with different commands; not documented here -->

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
      type: integer
      description: Decimal value, zero-padded left (e.g., 0000000000000029)

- id: getAudioVolume
  label: Get Audio Volume
  kind: action
  params: []

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
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
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"

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
      description: "0 = Disable, 1 = Enable (black screen)"

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
      description: "auto, auto24pSync, general - case-sensitive, right-padded with #"

- id: getSceneSetting
  label: Get Scene Setting
  kind: action
  params: []

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
- id: powerState
  type: enum
  values:
    - "0"
    - "1"
  labels:
    - "Standby (Off)"
    - "Active (On)"

- id: audioVolume
  type: integer
  description: Current volume value

- id: audioMuteState
  type: enum
  values:
    - "0"
    - "1"
  labels:
    - "Not Muted"
    - "Muted"

- id: inputState
  type: enum
  values:
    - "1"
    - "3"
    - "4"
    - "5"
  labels:
    - "HDMI"
    - "Composite"
    - "Component"
    - "Screen Mirroring"

- id: pictureMuteState
  type: enum
  values:
    - "0"
    - "1"
  labels:
    - "Disabled"
    - "Enabled"

- id: sceneSetting
  type: string
  description: Current scene setting value

- id: broadcastAddress
  type: string
  description: IPv4 broadcast address of specified interface

- id: macAddress
  type: string
  description: MAC address of specified interface

- id: commandResult
  type: enum
  values:
    - "0000000000000000"
    - "FFFFFFFFFFFFFFFF"
    - "NNNNNNNNNNNNNNNN"
  labels:
    - "Success"
    - "Error"
    - "Not Found / Not Available"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters beyond action params
```

## Events
```yaml
- id: firePowerChange
  type: notify
  params:
    - name: state
      type: integer
      description: "0 = Powering off, 1 = Powering on"

- id: fireInputChange
  type: notify
  params:
    - name: input
      type: integer
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"

- id: fireVolumeChange
  type: notify
  params:
    - name: volume
      type: integer
      description: Current volume value

- id: fireMuteChange
  type: notify
  params:
    - name: state
      type: integer
      description: "0 = Unmuting, 1 = Muting"

- id: firePictureMuteChange
  type: notify
  params:
    - name: state
      type: integer
      description: "0 = Enabling picture mute, 1 = Disabling picture mute"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Message format: 24-byte fixed length. Header 0x2A 0x53 (`*S`). Footer 0x0A (LF). Byte[2] = message type: 0x43 (Control), 0x45 (Enquiry), 0x41 (Answer), 0x4E (Notify). Bytes[3-6] = FourCC command code. Bytes[7-22] = parameters (16 bytes). IR command codes are decimal values from the IR Commands table (e.g., Display=5, Home=6, Volume Up=48).
<!-- UNRESOLVED: EU RED-DA compliance variant differences not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
last_checked_at: 2026-05-31T22:30:32.178Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:30:32.178Z
matched_actions: 15
action_count: 15
confidence: high
summary: "All 15 spec actions matched to their corresponding source commands (IRCC, POWR, TPOW, VOLU, AMUT, INPT, PMUT, TPMU, SCEN); transport verified; 2 unrepresented network diagnostic commands (BADR, MADR) are orthogonal to core AV control."
```

## Known Gaps

```yaml
- BADR
- MADR
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
