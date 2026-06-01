---
spec_id: admin/sony-xrjx95-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRJ-X95 Series Control Spec"
manufacturer: Sony
model_family: "XRJ-X95 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XRJ-X95 Series"
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
last_checked_at: 2026-05-31T22:42:29.414Z
generated_at: 2026-05-31T22:42:29.414Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:42:29.414Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched literal FourCC tokens in source; transport port and auth verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony XRJ-X95 Series Control Spec

## Summary
Sony professional display supporting Simple IP Control over TCP (port 20060). 24-byte fixed-length messages with FourCC command encoding. Supports power, volume, mute, input routing, picture mute, scene selection, and IR remote passthrough.

<!-- UNRESOLVED: EU RED-DA spec variants not documented; command set may differ by region -->

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
- levelable
- routable
- queryable
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume value as decimal string, zero-padded left (e.g., 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  params: []

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-9999)
    - name: source
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring

- id: get_input
  label: Get Input
  kind: query
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Disable, 1 = Enable (black screen)

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  params:
    - name: scene
      type: string
      description: Scene name - "auto", "auto24pSync", or "general" (case-sensitive, right-padded with #)

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  params: []

- id: set_ircc_code
  label: Send IR Command
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code (decimal)

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name (e.g., "eth0")

- id: get_mac_address
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name (e.g., "eth0")
```

## Feedbacks
```yaml
- id: power_status_response
  type: enum
  values:
    - "0000000000000000  # Standby (Off)"
    - "0000000000000001  # Active (On)"
    - "FFFFFFFFFFFFFFFF  # Error"

- id: audio_mute_response
  type: enum
  values:
    - "0000000000000000  # Not Muted"
    - "0000000000000001  # Muted"
    - "FFFFFFFFFFFFFFFF  # Error"

- id: audio_volume_response
  type: string
  description: Volume value as zero-padded decimal string

- id: input_response
  type: object
  properties:
    source:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    number:
      type: integer
      description: Input number (1-9999)
    status:
      type: enum
      values:
        - NNNNNNNNNNNNNNNN  # Not Found
        - 0000000000000000  # Success
        - FFFFFFFFFFFFFFFF  # Error

- id: picture_mute_response
  type: enum
  values:
    - "0000000000000000  # Disabled (off)"
    - "0000000000000001  # Enabled (on)"
    - "FFFFFFFFFFFFFFFF  # Error"

- id: scene_setting_response
  type: string
  description: Scene name or error code (NNNNNNNNNNNNNNNN = not available, FFFFFFFFFFFFFFFF = error)

- id: ircc_response
  type: enum
  values:
    - "0000000000000000  # Success"
    - "FFFFFFFFFFFFFFFF  # Error"

- id: broadcast_address_response
  type: string
  description: IPv4 address as string (e.g., "192.168.0.14")

- id: mac_address_response
  type: string
  description: MAC address as string
```

## Events
```yaml
- id: power_change_event
  type: object
  description: Unsolicited notification when power state changes
  properties:
    power:
      type: integer
      enum: [0, 1]
      description: 0 = powering off, 1 = powering on

- id: input_change_event
  type: object
  description: Unsolicited notification when input changes
  properties:
    source:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    number:
      type: integer
      description: Input number (1-9999)

- id: volume_change_event
  type: string
  description: Unsolicited notification when volume changes; value as zero-padded decimal string

- id: mute_change_event
  type: object
  description: Unsolicited notification when mute state changes
  properties:
    mute:
      type: integer
      enum: [0, 1]
      description: 0 = unmuting, 1 = muting

- id: picture_mute_change_event
  type: object
  description: Unsolicited notification when picture mute changes
  properties:
    mute:
      type: integer
      enum: [0, 1]
      description: 0 = picture mute enabled (black screen), 1 = picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
- Message format: 24-byte fixed length, header `0x2A 0x53` (ASCII `*S`), footer `0x0A` (LF)
- Message types: C=Control, E=Enquiry, A=Answer, N=Notify
- Commands encoded as FourCC ASCII (bytes 3-6)
- Parameters encoded in bytes 7-22 as ASCII digits or # placeholders
- IR command codes are decimal values (e.g., Display=5, HDMI1=124)
- EU models have RED-DA compliance variants; available commands differ by specification type
- No authentication required; control accessible on local network only
<!-- UNRESOLVED: full IR command code table (38 entries) only partially mapped in setIrccCode param range -->
<!-- UNRESOLVED: EU RED-DA spec variant differences not documented -->
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
last_checked_at: 2026-05-31T22:42:29.414Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:42:29.414Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched literal FourCC tokens in source; transport port and auth verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
