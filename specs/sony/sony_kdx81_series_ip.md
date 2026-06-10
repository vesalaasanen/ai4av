---
spec_id: admin/sony-kdx81-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX81 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDX81 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX81 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-09T04:43:54.012Z
last_checked_at: 2026-06-09T07:19:24.401Z
generated_at: 2026-06-09T07:19:24.401Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU area models have 3 RED-DA compliance variants; commands and settings differ per variant. Source links to https://pro-bravia.sony.net/setup/device-settings/red-da/ for details."
  - "no settable parameters documented beyond the discrete actions above."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "firmware version compatibility, EU RED-DA variant command differences, network interface names beyond \"eth0\", and any IR codes not listed in the source table."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:19:24.401Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match FourCC tokens and parameter patterns in source; transport verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KDX81 Series Simple IP Control Spec

## Summary
Simple IP Control is Sony's proprietary protocol for controlling BRAVIA Professional Displays (KDX81 Series) over a local network. Communication uses TCP on port 20060 with fixed 24-byte messages, providing commands for power, input, volume, mute, picture mute, scene setting, IR passthrough, and network interface queries.

<!-- UNRESOLVED: EU area models have 3 RED-DA compliance variants; commands and settings differ per variant. Source links to https://pro-bravia.sony.net/setup/device-settings/red-da/ for details. -->

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
- powerable       # inferred from setPowerStatus, getPowerStatus, togglePowerStatus
- routable        # inferred from setInput, getInput
- queryable       # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable       # inferred from setAudioVolume, getAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: setIrccCode (Send IR Remote Code)
  kind: action
  command: "*SCIRCC{ircc_code_padded_to_16_bytes}"  # Header 0x2A 0x53, MsgType 'C' (0x43), FourCC 'IRCC', 16-byte param (right-padded with '0' per IR command table; last two bytes hold the code), Footer 0x0A
  params:
    - name: ircc_code
      type: string
      description: Two-digit decimal IR code from the IR Commands table (e.g. "05" for Display, "30" for Volume Up)

- id: set_power_status
  label: setPowerStatus
  kind: action
  command: "*SCPOWR000000000000000{state}"  # state: '0' = Standby (Off), '1' = Active (On); remaining 15 bytes zero
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: getPowerStatus
  kind: query
  command: "*SEPOWR################"  # 16 '#' placeholders for enquiry; last byte holds response
  params: []

- id: toggle_power_status
  label: togglePowerStatus
  kind: action
  command: "*SCTPOW################"  # 16 '#' placeholders; no parameters
  params: []

- id: set_audio_volume
  label: setAudioVolume
  kind: action
  command: "*SCVOLU{volume_padded_left_0_to_16}"  # e.g. '0000000000000029' = 41; last two bytes hold the value, leading zeros
  params:
    - name: volume
      type: integer
      description: Volume value, decimal, left-padded with '0' to fill the 16-byte parameter field

- id: get_audio_volume
  label: getAudioVolume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: setAudioMute
  kind: action
  command: "*SCAMUT000000000000000{state}"  # state: '0' = Unmute, '1' = Mute; remaining 15 bytes zero
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: getAudioMute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: setInput
  kind: action
  command: "*SCINPT0000000000{type}000{port_4digit}"  # type: '1' HDMI, '3' Composite, '4' Component, '5' Screen Mirroring; port: 1-9999
  params:
    - name: input_type
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Input port number (1-9999)

- id: get_input
  label: getInput
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: setPictureMute
  kind: action
  command: "*SCPMUT000000000000000{state}"  # state: '0' = Disable (picture on), '1' = Enable (screen black)
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Disables picture mute, 1 = Enables picture mute (screen black)

- id: get_picture_mute
  label: getPictureMute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: togglePictureMute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: set_scene_setting
  label: setSceneSetting
  kind: action
  command: "*SCSCEN{scene_string_padded_right_with_#_to_16}"  # e.g. 'auto24pSync#####'; case-sensitive
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name; case-sensitive; right-padded with '#' to fill 16-byte param field

- id: get_scene_setting
  label: getSceneSetting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: getBroadcastAddress
  kind: query
  command: "*SEBADREth0############"  # 'eth0' interface; other interface names UNRESOLVED
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. 'eth0')

- id: get_mac_address
  label: getMacAddress
  kind: query
  command: "*SEMADREth0############"  # 'eth0' interface; other interface names UNRESOLVED
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. 'eth0')
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: Reply to getPowerStatus / firePowerChange. Parameter byte 22 = 0 (Standby/Off) or 1 (Active/On).

- id: audio_volume
  type: integer
  description: Reply to getAudioVolume / fireVolumeChange. Volume value in last two bytes, decimal digits.

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: Reply to getAudioMute / fireMuteChange. Parameter byte 22 = 0 (Not Muted) or 1 (Muted).

- id: current_input
  type: object
  description: Reply to getInput / fireInputChange. Byte 11 input type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes 14-17 port (1-9999).

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Reply to getPictureMute / firePictureMuteChange. Parameter byte 22 = 0 (Disabled) or 1 (Enabled).

- id: scene_setting
  type: string
  description: Reply to getSceneSetting. Scene name string, right-padded with '#'.

- id: broadcast_address
  type: string
  description: Reply to getBroadcastAddress. IPv4 address as ASCII, right-padded with '#'.

- id: mac_address
  type: string
  description: Reply to getMacAddress. MAC address as ASCII, right-padded with '#'.
```

## Variables
```yaml
# UNRESOLVED: no settable parameters documented beyond the discrete actions above.
```

## Events
```yaml
- id: fire_power_change
  command: "*SNPOWR000000000000000{state}"
  description: Sent by monitor when power changes. state: 0=powering off, 1=powering on.

- id: fire_input_change
  command: "*SNINPT00000000000{type}000{port_4digit}"
  description: Sent by monitor when input changes. type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port: 1-9999.

- id: fire_volume_change
  command: "*SNVOLU{volume_padded}"
  description: Sent by monitor when volume changes.

- id: fire_mute_change
  command: "*SNAMUT000000000000000{state}"
  description: Sent by monitor when mute changes. state: 0=unmuting, 1=muting.

- id: fire_picture_mute_change
  command: "*SNPMUT000000000000000{state}"
  description: Sent by monitor when picture mute changes. state: 0=enabled, 1=disabled.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source.
```

## Notes
Message frame: every Simple IP Control message is exactly 24 bytes — `0x2A 0x53` header + 1-byte message type (`C`=Control 0x43, `E`=Enquiry 0x45, `A`=Answer 0x41, `N`=Notify 0x4E) + 4-byte FourCC command + 16-byte parameter field + `0x0A` footer. Answers use parameter bytes filled with `0` (success) or `F` (error); `N` indicates input not available / not found.

Connection requires two monitor settings: `Settings → Network & Internet → Remote device settings → Control remotely` and `Settings → Network & Internet → Home network → IP control → Simple IP control`. EU-area models have 3 RED-DA compliance variants; command availability differs per variant (see https://pro-bravia.sony.net/setup/device-settings/red-da/).

Port-mapped inputs (HDMI/Composite/Component/Screen Mirroring) use input number 1-9999 in the last four bytes of the parameter field; `getInput` reply uses the same encoding.

<!-- UNRESOLVED: firmware version compatibility, EU RED-DA variant command differences, network interface names beyond "eth0", and any IR codes not listed in the source table. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-09T04:43:54.012Z
last_checked_at: 2026-06-09T07:19:24.401Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:19:24.401Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match FourCC tokens and parameter patterns in source; transport verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU area models have 3 RED-DA compliance variants; commands and settings differ per variant. Source links to https://pro-bravia.sony.net/setup/device-settings/red-da/ for details."
- "no settable parameters documented beyond the discrete actions above."
- "no multi-step sequences described in source."
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "firmware version compatibility, EU RED-DA variant command differences, network interface names beyond \"eth0\", and any IR codes not listed in the source table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
