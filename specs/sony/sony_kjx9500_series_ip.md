---
spec_id: admin/sony-kjx9500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJX9500 Series Control Spec"
manufacturer: Sony
model_family: "KJX9500 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KJX9500 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-26T14:50:30.210Z
last_checked_at: 2026-06-12T19:58:13.500Z
generated_at: 2026-06-12T19:58:13.500Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU model specification variants not fully enumerated; only general command table provided"
  - "no explicit safety interlock procedure stated in source."
  - "firmware version compatibility not stated"
  - "full EU RED-DA specification variant enumeration not provided"
  - "maximum volume level range not stated"
  - "command timing / polling interval not specified"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:58:13.500Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literal FourCC codes in source; transport verified; complete coverage of documented command set. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KJX9500 Series Control Spec

## Summary
Sony consumer LED/LCD monitor series supporting Simple IP Control over TCP (port 20060). Fixed 24-byte ASCII command protocol with FourCC command encoding. Supports power, volume, mute, input selection, picture mute, and scene setting control via network. IR command passthrough via `setIrccCode`. EU models have variant command availability per RED-DA compliance.

<!-- UNRESOLVED: EU model specification variants not fully enumerated; only general command table provided -->

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
powerable: true  # inferred: setPowerStatus, togglePowerStatus present
queryable: true   # inferred: getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting present
levelable: true   # inferred: setAudioVolume, setAudioMute present
routable: true    # inferred: setInput, getInput present
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
  representation: "*SCPOWR0000000000000000"  # control msg template

- id: getPowerStatus
  label: Get Power Status
  kind: query
  params: []
  representation: "*EPOWR##############"

- id: togglePowerStatus
  label: Toggle Power Status
  kind: action
  params: []
  representation: "*CTPOW##############"

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  params:
    - name: volume
      type: integer
      description: Volume level as decimal digit pad left-padded with 0, e.g. 29 = "0000000000000029"
  representation: "*CVOLUXXXXXXXXXXXXXX"

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  params: []
  representation: "*EVOLU##############"

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute
  representation: "*CAMUT0000000000000X"

- id: getAudioMute
  label: Get Audio Mute Status
  kind: query
  params: []
  representation: "*EAMUT##############"

- id: setInput
  label: Set Input
  kind: action
  params:
    - name: input_type
      type: integer
      description: |
        Input type code:
        1 = HDMI (1-9999)
        3 = Composite (1-9999)
        4 = Component (1-9999)
        5 = Screen Mirroring (1-9999)
    - name: port
      type: integer
      description: Port number within the input type (1-9999)
  representation: "*CINPT0000000X0000XXXX"

- id: getInput
  label: Get Input
  kind: query
  params: []
  representation: "*EINPT##############"

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  params:
    - name: mute
      type: integer
      description: 0 = Disabled (picture on), 1 = Enabled (screen black)
  representation: "*CPMUT0000000000000X"

- id: getPictureMute
  label: Get Picture Mute Status
  kind: query
  params: []
  representation: "*EPMUT##############"

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  params: []
  representation: "*CTPMU##############"

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  params:
    - name: scene
      type: string
      description: Scene name - "auto", "auto24pSync", "general". Case-sensitive, right-padded with "#". e.g. "auto24pSync#####"
  representation: "*CSCENXXXXXXXXXXXXXX"

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  params: []
  representation: "*ESCEN##############"

- id: setIrccCode
  label: Send IR Command Code
  kind: action
  params:
    - name: ircc_code
      type: integer
      description: |
        IR command numeric code (Byte[22]):
        0x05=Display  0x06=Home  0x07=Options  0x08=Return
        0x09=Up  0x0A=Down  0x0B=Right  0x0C=Left  0x0D=Confirm
        0x0E=Red  0x0F=Green  0x10=Yellow  0x11=Blue
        0x12=Num1  0x13=Num2  0x14=Num3  0x15=Num4  0x16=Num5  0x17=Num6
        0x18=Num7  0x19=Num8  0x1A=Num9  0x1B=Num0
        0x1E=VolumeUp  0x1F=VolumeDown  0x20=Mute
        0x21=ChannelUp  0x22=ChannelDown  0x23=Subtitle  0x26=DOT
        0x32=PictureOff  0x3D=Wide  0x3E=Jump  0x48=SyncMenu
        0x49=Forward  0x4A=Play  0x4B=Rewind  0x50=Prev
        0x51=Stop  0x52=Next  0x54=Pause  0x56=FlashPlus  0x57=FlashMinus
        0x62=TVPower  0x63=Audio  0x65=Input  0x68=Sleep  0x69=SleepTimer
        0x6C=Video2  0x6E=PictureMode  0x79=DemoSurround
        0x7C=HDMI1  0x7D=HDMI2  0x7E=HDMI3  0x7F=HDMI4
        0x81=ActionMenu  0x82=Help
  representation: "*SIRCCXXXXXXXXXXXXXX"

- id: getBroadcastAddress
  label: Get Broadcast IPv4 Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name, e.g. "eth0"
  representation: "*EBADREth0#########"

- id: getMacAddress
  label: Get MAC Address
  kind: query
  params:
    - name: interface
      type: string
      description: Interface name, e.g. "eth0"
  representation: "*EMADREth0#########"
```

## Feedbacks
```yaml
- id: powerStatusAnswer
  type: enum
  values:
    - "0000000000000000"  # Standby (Off)
    - "0000000000000001"  # Active (On)
    - "FFFFFFFFFFFFFFFF"  # Error

- id: audioMuteAnswer
  type: enum
  values:
    - "0000000000000000"  # Not Muted
    - "0000000000000001"  # Muted
    - "FFFFFFFFFFFFFFFF"  # Error

- id: audioVolumeAnswer
  type: string
  description: Volume value as decimal digit string

- id: inputAnswer
  type: enum
  values:
    - "000000010000XXXX"  # HDMI (port XXXX)
    - "000000030000XXXX"  # Composite (port XXXX)
    - "000000040000XXXX"  # Component (port XXXX)
    - "000000050000XXXX"  # Screen Mirroring (port XXXX)
    - "NNNNNNNNNNNNNNNN"  # Not Found
    - "FFFFFFFFFFFFFFFF"  # Error

- id: pictureMuteAnswer
  type: enum
  values:
    - "0000000000000000"  # Disabled (picture mute off)
    - "0000000000000001"  # Enabled (picture mute on)
    - "FFFFFFFFFFFFFFFF"  # Error

- id: sceneSettingAnswer
  type: string
  description: Scene setting value as ASCII string

- id: irccCodeAnswer
  type: enum
  values:
    - "0000000000000000"  # Success
    - "FFFFFFFFFFFFFFFF"  # Error

- id: broadcastAddressAnswer
  type: string
  description: IPv4 address as ASCII string padded with "#"

- id: macAddressAnswer
  type: string
  description: MAC address as ASCII hex string padded with "#"
```

## Variables
```yaml
# No independent settable variables outside of the action parameter model.
# All parameters are passed per-command; no session state required.
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  type: notify
  params:
    - name: power
      type: integer
      description: 0 = powering off, 1 = powering on
  representation: "*NPOWR00000000000000X"

- id: fireInputChange
  label: Input Change Event
  type: notify
  params:
    - name: input_type
      type: integer
      description: |
        0 = none
        1 = HDMI (port XXXX)
        3 = Composite (port XXXX)
        4 = Component (port XXXX)
        5 = Screen Mirroring (port XXXX)
    - name: port
      type: integer
      description: Port number within input type
  representation: "*NINPT0000000X0000XXXX"

- id: fireVolumeChange
  label: Volume Change Event
  type: notify
  params:
    - name: volume
      type: integer
      description: Current volume level
  representation: "*NVOLUXXXXXXXXXXXXXX"

- id: fireMuteChange
  label: Mute Change Event
  type: notify
  params:
    - name: mute
      type: integer
      description: 0 = unmuting, 1 = muting
  representation: "*NAMUT00000000000000X"

- id: firePictureMuteChange
  label: Picture Mute Change Event
  type: notify
  params:
    - name: mute
      type: integer
      description: 0 = picture mute enabled (black screen), 1 = picture mute disabled
  representation: "*NPMUT00000000000000X"
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "EU area models have 3 RED-DA specification types; settings and available commands differ per spec type. Commands marked with EU note may not be available on all EU models."
    source_line: 171-173
# UNRESOLVED: no explicit safety interlock procedure stated in source.
```

## Notes
Fixed 24-byte message format: `[*][S][MessageType][4-char Command][16-byte params][LF]`. Header = `0x2A 0x53` (`*S`). Footer = `0x0A` (LF). Message types: C=Control, E=Enquiry, A=Answer, N=Notify. FourCC command names in bytes[3–6]. Parameter bytes[7–22] include type-specific content (success `0000...`, error `FFFF...`, or data). IR command codes for `setIrccCode` cover full remote button set including number pad, navigation, color buttons, playback transport, HDMI source selection, and power. Network interface queries (`getBroadcastAddress`, `getMacAddress`) require interface name parameter (e.g. `eth0`). EU model variant command restrictions noted but not enumerated in full.

<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: full EU RED-DA specification variant enumeration not provided -->
<!-- UNRESOLVED: maximum volume level range not stated -->
<!-- UNRESOLVED: command timing / polling interval not specified -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-26T14:50:30.210Z
last_checked_at: 2026-06-12T19:58:13.500Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:58:13.500Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literal FourCC codes in source; transport verified; complete coverage of documented command set. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU model specification variants not fully enumerated; only general command table provided"
- "no explicit safety interlock procedure stated in source."
- "firmware version compatibility not stated"
- "full EU RED-DA specification variant enumeration not provided"
- "maximum volume level range not stated"
- "command timing / polling interval not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
