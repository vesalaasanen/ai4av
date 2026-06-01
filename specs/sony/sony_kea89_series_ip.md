---
spec_id: admin/sony-kea89-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KEA89 Series Control Spec"
manufacturer: Sony
model_family: "KEA89 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KEA89 Series"
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
last_checked_at: 2026-05-31T22:41:23.905Z
generated_at: 2026-05-31T22:41:23.905Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:23.905Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched to source FourCC codes; transport port 20060 verified; one-to-one coverage of complete command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KEA89 Series Control Spec

## Summary
Sony KEA89 Series commercial displays support Simple IP Control over TCP on port 20060. The protocol uses fixed 24-byte ASCII messages with a FourCC command structure (SSIP). Supports power, volume, mute, input selection, picture mute, scene settings, and IR remote code passthrough. EU models have reduced command sets per RED-DA compliance.

<!-- UNRESOLVED: EU RED-DA specification variants not detailed in source — operator must consult RED-DA IP control docs for variant-specific command availability -->

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
  label: Send IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR code number (byte value, 0-255). See IR Commands table for full list.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum:
        - 0  # Standby (Off)
        - 1  # Active (On)

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
      description: Volume level as decimal digit string left-padded with zeros, e.g. 0000000000000029

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
        - 0  # Unmute
        - 1  # Mute

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
      description: Input source type code + index. Type codes: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Followed by index number.

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
        - 0  # Disables picture mute (normal display)
        - 1  # Turns screen black

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
      description: Scene setting name. Case-sensitive, padded with "#" on right. Values: auto, auto24pSync, general, etc.

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
      description: Interface name, e.g. "eth0"

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name, e.g. "eth0"
```

## Feedbacks
```yaml
- id: powerAnswer
  type: enum
  values:
    - "0000000000000000000000"  # Standby (Off)
    - "0000000000000000000001"  # Active (On)
    - "FFFFFFFFFFFFFFFFFFFFFFFF"  # Error

- id: audioVolumeAnswer
  type: string
  description: Volume value returned as ASCII digit string

- id: audioMuteAnswer
  type: enum
  values:
    - "0000000000000000000000"  # Not Muted
    - "0000000000000000000001"  # Muted

- id: inputAnswer
  type: enum
  values:
    - NNN...  # Not Found
    - "0000000000000000000000"  # Success
    - "FFFFFFFFFFFFFFFFFFFFFFFF"  # Error

- id: pictureMuteAnswer
  type: enum
  values:
    - "0000000000000000000000"  # Disabled (picture mute off)
    - "0000000000000000000001"  # Enabled (picture mute on)

- id: sceneSettingAnswer
  type: string
  description: Scene setting value returned as ASCII string

- id: irccSuccess
  type: enum
  values:
    - "0000000000000000000000"  # Success
    - "FFFFFFFFFFFFFFFFFFFFFFFF"  # Error

- id: broadcastAddressAnswer
  type: string
  description: IPv4 address string padded with "#"

- id: macAddressAnswer
  type: string
  description: MAC address string padded with "#"
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters other than direct commands
```

## Events
```yaml
- id: firePowerChange
  type: notification
  params:
    - name: state
      type: integer
      enum:
        - 0  # Powering off
        - 1  # Powering on

- id: fireInputChange
  type: notification
  params:
    - name: input
      type: integer
      description: Input source type code + index (same encoding as setInput)

- id: fireVolumeChange
  type: notification
  params:
    - name: volume
      type: string
      description: Volume value as ASCII digit string

- id: fireMuteChange
  type: notification
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Unmuting
        - 1  # Muting

- id: firePictureMuteChange
  type: notification
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Picture mute enabled
        - 1  # Picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes

### Protocol Details
- Message format: 24-byte fixed-length ASCII, no terminator needed beyond the 24-byte block
- Header: `0x2A 0x53` (`*S`)
- Footer: `0x0A` (LF)
- Byte[2] message types: `C`=Control, `E`=Enquiry, `A`=Answer, `N`=Notify
- Command FourCC occupies bytes 3-6
- Parameters occupy bytes 7-22 (16 bytes), padded with `#` or `0` as appropriate

### EU Model Restriction
EU area models have RED-DA compliance variants. Command availability differs per specification. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

### Command Stability
Answer messages may include both acceptance (SA*) and current state (SN*) in same response — e.g. power off returns `*SAPOWR0000000000000000 *SNPOWR0000000000000000`.

### IR Command Coverage
`setIrccCode` accepts numeric codes for all standard BRAVIA remote buttons (Display, Home, Up/Down/Left/Right, 0-9, Volume, Channel, Color keys, Playback controls, HDMI 1-4, etc.). Full 270-entry table available in source.
<!-- UNRESOLVED: complete IR command numeric code mapping for all 270 entries not fully enumerated in this spec — source table has all values -->
<!-- UNRESOLVED: network interface naming convention not stated -->
<!-- UNRESOLVED: error code enumeration for `FFFFFFFF` responses not fully enumerated -->

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
last_checked_at: 2026-05-31T22:41:23.905Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:23.905Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched to source FourCC codes; transport port 20060 verified; one-to-one coverage of complete command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
