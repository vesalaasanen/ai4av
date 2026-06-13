---
spec_id: admin/sony-kdxd8077-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony KDXD8077 Series Control Spec"
manufacturer: Sony
model_family: "KDXD8077 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXD8077 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T10:24:24.928Z
last_checked_at: 2026-06-12T19:52:53.307Z
generated_at: 2026-06-12T19:52:53.307Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA spec variants not detailed in source"
  - "no standalone settable parameters outside action commands"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware compatibility range not stated"
  - "RED-DA EU spec variant details not in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:52:53.307Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions found with exact wire tokens; transport parameters verified; full bidirectional coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDXD8077 Series Control Spec

## Summary
Sony professional display supporting Simple IP Control over TCP (port 20060). Fixed 24-byte message format with FourCC commands. Controls include power, volume, mute, input selection, picture mute, scene setting, IR code transmission, and network info queries. EU models have 3 RED-DA compliance variants with different command availability.

<!-- UNRESOLVED: EU RED-DA spec variants not detailed in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Message Format
```yaml
# Fixed 24-byte message structure (per source):
# Byte[0-1]   Header   2 bytes  0x2A 0x53 ('*S')  fixed
# Byte[2]     MsgType  1 byte   0x43 [C]=Control, 0x45 [E]=Enquiry, 0x41 [A]=Answer, 0x4E [N]=Notify
# Byte[3-6]   Command  4 bytes  ASCII FourCC (e.g. POWR, VOLU, INPT, SCEN, IRCC, MADR, BADR)
# Byte[7-22]  Params   16 bytes ASCII digits, left-padded with '0', right-padded with '#'
# Byte[23]    Footer   1 byte   0x0A (LF)  fixed
```

## Traits
```yaml
- powerable       # setPowerStatus, togglePowerStatus present
- queryable       # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress present
- levelable       # setAudioVolume present
- routable        # setInput present
```

## Actions
```yaml
# Control commands (Message Type C = 0x43)
- id: setIrccCode
  label: Send IR Command
  kind: action
  command: "*SCIRCC{code}#"   # IR code right-padded with '0' to fill 16 bytes
  params:
    - name: code
      type: integer
      description: IR code number (see IR Commands table; 2-digit decimal zero-padded at end of 16-byte param field)

- id: setPowerStatus
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}#"  # 0000000000000000=Standby, 0000000000000001=Active
  params:
    - name: state
      type: integer
      description: "0 = Standby (Off), 1 = Active (On)"

- id: togglePowerStatus
  label: Toggle Power
  kind: action
  command: "*SCTPOW################"   # 16 '#' fill, no parameter
  params: []

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}#"
  params:
    - name: volume
      type: integer
      description: Volume value as zero-padded decimal in 16-byte field (e.g. 0000000000000029)

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}#"
  params:
    - name: state
      type: integer
      description: "0 = Unmute, 1 = Mute"

- id: setInput
  label: Set Input
  kind: action
  command: "*SCINPT{type}0000{index}#"
  params:
    - name: type
      type: integer
      description: "Input type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: index
      type: integer
      description: Input index (1-9999)

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}#"
  params:
    - name: state
      type: integer
      description: "0 = Disabled, 1 = Enabled (black screen)"

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}#"
  params:
    - name: scene
      type: string
      description: "Scene name: auto, auto24pSync, general - case-sensitive, pad right with '#' (e.g. auto24pSync#####)"

# Enquiry commands (Message Type E = 0x45)
- id: getPowerStatus
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: getAudioMute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: getInput
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: getPictureMute
  label: Get Picture Mute State
  kind: query
  command: "*SEPMUT################"
  params: []

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

# EU asterisk-marked commands
- id: getBroadcastAddress
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADReth0##########"
  params: []

- id: getMacAddress
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0##########"
  params: []
```

## Feedbacks
```yaml
- id: powerStatusResponse
  type: enum
  values:
    - "0000000000000000 = Standby (Off)"
    - "0000000000000001 = Active (On)"
    - "FFFFFFFFFFFFFFFF = Error"

- id: audioVolumeResponse
  type: string
  description: Zero-padded decimal volume value (e.g. 0000000000000029)

- id: audioMuteResponse
  type: enum
  values:
    - "0000000000000000 = Not Muted"
    - "0000000000000001 = Muted"
    - "FFFFFFFFFFFFFFFF = Error"

- id: inputResponse
  type: enum
  values:
    - "0000000000000001000{1-9999} = HDMI"
    - "0000000000000003000{1-9999} = Composite"
    - "0000000000000004000{1-9999} = Component"
    - "0000000000000005000{1-9999} = Screen Mirroring"
    - "NNNNNNNNNNNNNNNN = Not Found"
    - "FFFFFFFFFFFFFFFF = Error"

- id: pictureMuteResponse
  type: enum
  values:
    - "0000000000000000 = Disabled"
    - "0000000000000001 = Enabled"
    - "FFFFFFFFFFFFFFFF = Error"

- id: sceneSettingResponse
  type: string
  description: Current scene setting value (auto, auto24pSync, general) padded with '#'

- id: sceneSettingNotAvailable
  type: enum
  values:
    - "NNNNNNNNNNNNNNNN = Not available for the current input"

- id: irccResponse
  type: enum
  values:
    - "0000000000000000 = Success"
    - "FFFFFFFFFFFFFFFF = Error"

- id: broadcastAddressResponse
  type: string
  description: IPv4 broadcast address right-padded with '#' (e.g. 192.168.0.14####)

- id: macAddressResponse
  type: string
  description: MAC address right-padded with '#'
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action commands
```

## Events
```yaml
# Notify messages (Message Type N = 0x4E) - unsolicited from monitor
- id: firePowerChange
  type: notification
  command: "*SNPOWR{state}#"
  params:
    - name: state
      type: integer
      description: "0 = Powering off, 1 = Powering on"

- id: fireInputChange
  type: notification
  command: "*SNINPT{type}0000{index}#"
  params:
    - name: type
      type: integer
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: index
      type: integer
      description: Input index (1-9999)

- id: fireVolumeChange
  type: notification
  command: "*SNVOLU{volume}#"
  params:
    - name: volume
      type: string
      description: New volume value as zero-padded decimal

- id: fireMuteChange
  type: notification
  command: "*SNAMUT{state}#"
  params:
    - name: state
      type: integer
      description: "0 = Unmuting, 1 = Muting"

- id: firePictureMuteChange
  type: notification
  command: "*SNPMUT{state}#"
  params:
    - name: state
      type: integer
      description: "0 = Picture mute enabled, 1 = Picture mute disabled"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Simple IP Control uses 24-byte fixed message format: header (2 bytes `0x2A 0x53` = `*S`), message type (1 byte: 0x43 Control, 0x45 Enquiry, 0x41 Answer, 0x4E Notify), FourCC command (4 bytes ASCII), parameters (16 bytes, left-padded with `0` or right-padded with `#`), footer (1 byte `0x0A` = LF). Netcat example: `netcat [IP] 20060`.

Power OFF example from source: request `*SCPOWR0000000000000000` → response `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (Accept + Notify).

EU models have 3 RED-DA compliance variants; `getBroadcastAddress` (BADR) and `getMacAddress` (MADR) are marked EU-only in source. IR codes sent via `setIrccCode` — see IR Commands table (Display=05, Home=06, Num0=27, Num9=26, VolumeUp=30, VolumeDown=31, Mute=32, TV Power=98, etc.).

<!-- UNRESOLVED: firmware compatibility range not stated -->
<!-- UNRESOLVED: RED-DA EU spec variant details not in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T10:24:24.928Z
last_checked_at: 2026-06-12T19:52:53.307Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:52:53.307Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions found with exact wire tokens; transport parameters verified; full bidirectional coverage of source command catalogue. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA spec variants not detailed in source"
- "no standalone settable parameters outside action commands"
- "no explicit multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware compatibility range not stated"
- "RED-DA EU spec variant details not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
