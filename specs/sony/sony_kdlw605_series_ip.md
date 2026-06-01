---
spec_id: admin/sony-kdlw605_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW605 Series Control Spec"
manufacturer: Sony
model_family: "KDLW605 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW605 Series"
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
last_checked_at: 2026-05-31T21:25:59.074Z
generated_at: 2026-05-31T21:25:59.074Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T21:25:59.074Z
  matched_actions: 9
  action_count: 9
  confidence: high
  summary: "All 9 spec actions matched semantic definitions in source command table; transport port 20060 and protocol TCP confirmed; Feedbacks represent all source query commands."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDLW605 Series Control Spec

## Summary
Sony BRAVIA Professional display controlled over TCP/IP via Simple IP Control protocol. Fixed 24-byte messages on port 20060. Supports power, volume, mute, input routing, picture mute, scene setting, and IR code transmission.

<!-- UNRESOLVED: EU RED-DA compliance variants have different command sets — source notes commands differ per specification -->

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
- id: set_power_status
  label: Set Power Status
  kind: action
  params:
    - name: power
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)
      enum: [0, 1]

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer description: Volume value as decimal string padded with zeros (e.g., 0000000000000029)

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: set_input
  label: Set Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input source type code. 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring
      enum: [1, 3, 4, 5]
    - name: index
      type: integer
      description: 1-based input index for sources that support multiple ports

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Disabled (picture on), 1 = Enabled (screen black)

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
      description: Scene name - "auto", "auto24pSync", "general". Padded with "#" to16 chars.

- id: set_ircc_code
  label: Set IRCC Code
  kind: action
  params:
    - name: code
      type: integer
      description: IR command code number (see IR command table). e.g., 5=Display, 6=Home, 9=Up, etc.
```

## Feedbacks
```yaml
- id: power_status  label: Power Status
  type: enum
  values:
    - 0
    - 1 description: 0 = Standby (Off), 1 = Active (On)

- id: audio_volume
  label: Audio Volume
  type: integer
  description: Current volume value as zero-padded decimal- id: audio_mute
  label: Audio Mute Status
  type: enum
  values:
    - 0
    - 1
  description: 0 = Not Muted, 1 = Muted

- id: input_status
  label: Input Status
  type: enum
  values:
    - 1
    - 3
    - 4
    - 5
  description: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring

- id: picture_mute
  label: Picture Mute Status
  type: enum
  values:
    - 0
    - 1
  description: 0 = Disabled (picture on), 1 = Enabled (picture off)

- id: scene_setting
  label: Scene Setting
  type: string
  description: Current scene setting value or "N" if not available for current input

- id: operation_result
  label: Operation Result
  type: enum
  values:
    - 0x0000000000000000    - 0xFFFFFFFFFFFFFFFF
    - NNNNNNNNNNNNNNNN
  description: "0" = Success, "F" = Error, "N" = Not available- id: mac_address
  label: MAC Address
  type: string
  description: MAC address of specified network interface, padded with "#"

- id: broadcast_address
  label: Broadcast IPv4 Address
  type: string
  description: Broadcast IPv4 address of specified network interface, padded with "#"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond action params stated in source
```

## Events
```yaml
- id: fire_power_change
  label: Power Change Event
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Powered Off, 1 = Powered On

- id: fire_input_change
  label: Input Change Event
  params:
    - name: input      type: integer
      description: Input source type code. 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring
    - name: index
      type: integer
      description: 1-based input index

- id: fire_volume_change
  label: Volume Change Event
  params:
    - name: volume
      type: integer
      description: New volume value

- id: fire_mute_change
  label: Mute Change Event
  params:
    - name: mute      type: integer
      enum: [0, 1]
      description: 0 = Unmuted, 1 = Muted

- id: fire_picture_mute_change
  label: Picture Mute Change Event
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Picture Enabled, 1 = Picture Muted (black)
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Message format: 24-byte fixed-length. Byte[0-1] = header (0x2A 0x53 = "*S"). Byte[2] = message type (0x43=C Control, 0x45=E Enquiry, 0x41=A Answer, 0x4E=N Notify). Byte[3-6] = FourCC command. Byte[7-22] = parameters (16 bytes). Byte[23] = footer (0x0A).

IR commands sent via `setIrccCode` with numeric code parameter. Full IR code table includes: Display(5), Home(6), Options(7), Return(8), Up(9), Down(10), Right(11), Left(12), Confirm(13), Red(14), Green(15), Yellow(16), Blue(17), Num0-Num9(18-27), Volume Up/Down(48-49), Mute(50), Channel Up/Down(51-52), Play(74), Stop(81), Pause(82), HDMI1-4(148-150,151), TV Power(98), Sleep(104), Sleep Timer(105), Picture Off(50 wide=61), and many more.

<!-- UNRESOLVED: complete IR command code parameter mapping not fully enumerated in source -->
<!-- UNRESOLVED: EU RED-DA compliance model command restrictions not detailed in source -->

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
last_checked_at: 2026-05-31T21:25:59.074Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T21:25:59.074Z
matched_actions: 9
action_count: 9
confidence: high
summary: "All 9 spec actions matched semantic definitions in source command table; transport port 20060 and protocol TCP confirmed; Feedbacks represent all source query commands."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
