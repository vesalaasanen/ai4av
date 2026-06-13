---
spec_id: admin/sony-kdxh9096-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXH9096 Series BRAVIA Control Spec"
manufacturer: Sony
model_family: "KDXH9096 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXH9096 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/setup/device-settings/red-da/
retrieved_at: 2026-06-12T04:43:25.495Z
last_checked_at: 2026-06-12T19:56:06.393Z
generated_at: 2026-06-12T19:56:06.393Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state model-specific firmware support or RED-DA spec compliance"
  - "firmware version, RED-DA spec compliance per SKU, and any model-specific command restrictions not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:56:06.393Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literally to source FourCC codes; transport verified; bidirectional coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDXH9096 Series BRAVIA Control Spec

## Summary
Sony BRAVIA Professional Displays (KDXH9096 series) Simple IP Control (SSIP) protocol. 24-byte fixed-length TCP frames on port 20060. Supports power, input, volume, mute, picture mute, scene setting, IR passthrough, and network info commands.

<!-- UNRESOLVED: source does not state model-specific firmware support or RED-DA spec compliance -->

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
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: set_ircc_code
  label: Set IRCC Code (IR Passthrough)
  kind: action
  command: "*SCIRCC{ircc_code}################"  # 24-byte frame: header *S, C, IRCC, 16-byte param (zero-padded + LF)
  params:
    - name: ircc_code
      type: string
      description: IR code as two ASCII hex digits (last two bytes of 16-byte param)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"  # 24-byte frame; last byte = 0 standby, 1 active
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # 24-byte frame, Enquiry
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"  # 24-byte frame, Control
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded}#"  # 24-byte frame; volume in 16-byte param zero-padded decimal (e.g. 0000000000000029)
  params:
    - name: volume_padded
      type: string
      description: Volume value as 16-character zero-padded decimal ASCII

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"  # 24-byte frame, Enquiry
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}"  # last byte = 0 unmute, 1 mute
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"  # 24-byte frame, Enquiry
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000{kind}0000{number_padded}"  # kind=1 HDMI, 3 Composite, 4 Component, 5 Screen Mirroring; number 1-9999
  params:
    - name: kind
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: number_padded
      type: string
      description: Input number 1-9999 as 4-character zero-padded decimal

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"  # 24-byte frame, Enquiry
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}"  # last byte = 0 disable, 1 enable (black screen)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Picture mute disabled, 1 = Picture mute enabled"

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################"  # 24-byte frame, Enquiry
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"  # 24-byte frame, Control
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded}#"  # 16-byte param = case-sensitive scene string right-padded with '#'
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name; padded to 16 chars with '#'

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"  # 24-byte frame, Enquiry
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADReth0##########"  # 16-byte param: 'eth0' (interface name) right-padded with '#'
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0##########"  # 16-byte param: 'eth0' (interface name) right-padded with '#'
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  source: getPowerStatus answer param byte (0=off, 1=on)
- id: audio_volume
  type: integer
  source: getAudioVolume answer param bytes (16-char decimal)
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer param byte (0=unmuted, 1=muted)
- id: current_input
  type: object
  source: getInput answer param (kind + number)
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: getPictureMute answer param byte (0=disabled, 1=enabled)
- id: scene_setting
  type: string
  source: getSceneSetting answer param bytes (case-sensitive scene name)
- id: broadcast_address
  type: string
  source: getBroadcastAddress answer param bytes (IPv4 right-padded with '#')
- id: mac_address
  type: string
  source: getMacAddress answer param bytes (MAC right-padded with '#')
```

## Variables
```yaml
# No discrete settable parameters beyond those exposed as actions.
```

## Events
```yaml
- id: power_change
  type: enum
  values: [off, on]
  source: firePowerChange notify frame (N type, POWR command, last byte 0=off, 1=on)
- id: input_change
  type: object
  source: fireInputChange notify frame (N type, INPT command, kind+number)
- id: volume_change
  type: integer
  source: fireVolumeChange notify frame (N type, VOLU command)
- id: mute_change
  type: enum
  values: [unmuted, muted]
  source: fireMuteChange notify frame (N type, AMUT command, last byte 0=unmuted, 1=muted)
- id: picture_mute_change
  type: enum
  values: [enabled, disabled]
  source: firePictureMuteChange notify frame (N type, PMUT command, last byte 0=enabled, 1=disabled)
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no safety warnings or interlock procedures.
```

## Notes
Protocol frame layout: 2-byte header `*S` (0x2A 0x53), 1-byte message type (C/E/A/N), 4-byte FourCC command, 16-byte parameter (zero-padded ASCII), 1-byte footer LF (0x0A). Total 24 bytes.

Control messages require an Answer (A) reply. Enquiry messages require an Answer. Errors return 16 bytes of `F` in the parameter field.

EU area models: 3 RED-DA compliance specifications exist; settings and available commands differ per spec. See https://pro-bravia.sony.net/setup/device-settings/red-da/.

Required monitor settings: Settings → Network & Internet → Remote device settings → Control remotely; Settings → Network & Internet → Home network → IP control → Simple IP control.

Both wired and wireless LAN supported. SetIrccCode parameter bytes 7-21 must be `0`, byte 22 carries the IR code (e.g. `...0000005` for Display, `...0000006` for Home, `...0000030` for Volume Up).
<!-- UNRESOLVED: firmware version, RED-DA spec compliance per SKU, and any model-specific command restrictions not stated in source -->
```

Spec output done. Next: wrap + ingest?

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/setup/device-settings/red-da/
retrieved_at: 2026-06-12T04:43:25.495Z
last_checked_at: 2026-06-12T19:56:06.393Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:56:06.393Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literally to source FourCC codes; transport verified; bidirectional coverage complete. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state model-specific firmware support or RED-DA spec compliance"
- "firmware version, RED-DA spec compliance per SKU, and any model-specific command restrictions not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
