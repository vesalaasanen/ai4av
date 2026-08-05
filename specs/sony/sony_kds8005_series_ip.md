---
spec_id: admin/sony-kds8005-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Sony KDS8005 Series Control Spec"
manufacturer: Sony
model_family: KDS8005
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KDS8005
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
retrieved_at: 2026-05-26T04:51:07.075Z
last_checked_at: 2026-07-22T01:23:54.011Z
generated_at: 2026-07-22T01:23:54.011Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA specification variants not fully documented in source"
  - "no standalone settable parameters outside action commands"
  - "no explicit multi-step macros in source"
  - "no safety warnings or interlock procedures in source"
  - "getBroadcastAddress and getMacAddress interface selection (ethN parameter) not fully documented"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:23:54.011Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched source with correct command codes, parameter shapes, and transport. Source N-type event commands documented in the spec Events section. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KDS8005 Series Control Spec

## Summary
Sony professional display controlled over TCP/IP via Simple IP Control protocol on port 20060. Fixed 24-byte ASCII command format with four-character command codes (FourCC). Supports power, volume, mute, input, picture mute, IR remote passthrough, scene settings, and network interface queries. EU models have RED-DA compliant variants with different command availability.

<!-- UNRESOLVED: EU RED-DA specification variants not fully documented in source -->

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
powerable: true  # setPowerStatus, togglePowerStatus, getPowerStatus
queryable: true   # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
levelable: true   # setAudioVolume, setAudioMute, setPictureMute
routable: true    # setInput, getInput
```

## Actions
```yaml
- id: setIrccCode
  label: Send IR Command
  kind: action
  command: "*SCIRCC{code:016d}#"  # literal template: header 0x2A 0x53, type C, FourCC IRCC, 16-char decimal IR code, padding chars, footer 0x0A
  params:
    - name: code
      type: integer
      description: IR command code (0-127). Display=5, Home=6, Options=7, Return=8, Up=9, Down=10, Right=11, Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18, Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26, Num0=27, VolumeUp=30, VolumeDown=31, Mute=32, ChannelUp=33, ChannelDown=34, Subtitle=35, DOT=38, PictureOff=50, Wide=61, Jump=62, SyncMenu=76, Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84, FlashPlus=86, FlashMinus=87, TVPower=98, Audio=99, Input=101, Sleep=104, SleepTimer=105, Video2=108, PictureMode=110, DemoSurround=121, HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, ActionMenu=129, Help=130

- id: setPowerStatus
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{power:01d}#"  # parameter byte at position 22 (byte[22])
  params:
    - name: power
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)
      enum: [0, 1]

- id: getPowerStatus
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # E type, POWR FourCC, 16x '#' in parameter field, footer LF
  params: []

- id: togglePowerStatus
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"  # C type, TPOW FourCC, 16x '#' in parameter field, footer LF
  params: []

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume:016d}####"  # 16-char decimal-padded value in parameter field
  params:
    - name: volume
      type: integer
      description: Decimal volume value padded left with zeros, e.g. 0000000000000029

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{mute:01d}"  # parameter byte at position 22
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: getAudioMute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: setInput
  label: Set Input
  kind: action
  command: "*SCINPT00000000000{type:01d}000{index:04d}#"  # type at byte[13], index 4-char at bytes[18-21]
  params:
    - name: type
      type: integer
      description: Input type code. 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring
      enum: [1, 3, 4, 5]
    - name: index
      type: integer
      description: Input index (1-9999)

- id: getInput
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{mute:01d}"  # parameter byte at position 22
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = Disable picture mute, 1 = Enable picture mute (black screen)

- id: getPictureMute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"  # C type, TPMU FourCC
  params: []

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene:16s}#"  # 16-char scene string, case-sensitive, right-padded with '#'
  params:
    - name: scene
      type: string
      description: Scene name. Case-sensitive, padded right with "#". Values: auto, auto24pSync, general
      enum: [auto, auto24pSync, general]

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: getBroadcastAddress
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{ethN:4s}############"  # EU RED-DA variant; eth interface string e.g. 'eth0', right-padded with '#'
  params:
    - name: ethN
      type: string
      description: Interface identifier (e.g. 'eth0'), right-padded with '#'
  notes: EU models only - RED-DA compliance variant

- id: getMacAddress
  label: Get MAC Address
  kind: query
  command: "*SEMADR{ethN:4s}############"  # EU RED-DA variant; eth interface string e.g. 'eth0', right-padded with '#'
  params:
    - name: ethN
      type: string
      description: Interface identifier (e.g. 'eth0'), right-padded with '#'
  notes: EU models only - RED-DA compliance variant
```

## Feedbacks
```yaml
- id: powerStatus
  label: Power Status
  type: enum
  values:
    - 0  # Standby (Off)
    - 1  # Active (On)
  comment: Returned by getPowerStatus and firePowerChange events

- id: audioVolume
  label: Audio Volume
  type: integer
  comment: Returned by getAudioVolume and fireVolumeChange events

- id: audioMute
  label: Audio Mute Status
  type: enum
  values:
    - 0  # Not Muted
    - 1  # Muted
  comment: Returned by getAudioMute and fireMuteChange events

- id: inputStatus
  label: Input Status
  type: object
  properties:
    type:
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    index:
      type: integer
  comment: Returned by getInput and fireInputChange events

- id: pictureMute
  label: Picture Mute Status
  type: enum
  values:
    - 0  # Disabled (Picture mute off)
    - 1  # Enabled (Picture mute on)
  comment: Returned by getPictureMute and firePictureMuteChange events

- id: sceneSetting
  label: Scene Setting
  type: string
  comment: Returned by getSceneSetting. Values: auto, auto24pSync, general

- id: broadcastAddress
  label: Broadcast IPv4 Address
  type: string
  comment: Returned by getBroadcastAddress. Interface specified by ethN parameter. EU models.

- id: macAddress
  label: MAC Address
  type: string
  comment: Returned by getMacAddress. Interface specified by ethN parameter. EU models.
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameters outside action commands
```

## Events
```yaml
- id: firePowerChange
  label: Power Change Event
  direction: monitor_to_client
  command: "*SNPOWR000000000000000{power:01d}"  # N type, POWR FourCC
  params:
    - name: power
      type: integer
      enum: [0, 1]
      description: 0 = powering off, 1 = powering on

- id: fireInputChange
  label: Input Change Event
  direction: monitor_to_client
  command: "*SNINPT00000000000{type:01d}000{index:04d}#"  # N type, INPT FourCC
  params:
    - name: type
      type: integer
      description: Input type code (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring)
    - name: index
      type: integer
      description: Input index (1-9999)

- id: fireVolumeChange
  label: Volume Change Event
  direction: monitor_to_client
  command: "*SNVOLU{volume:016d}####"  # N type, VOLU FourCC
  params:
    - name: volume
      type: integer
      description: Current volume value

- id: fireMuteChange
  label: Mute Change Event
  direction: monitor_to_client
  command: "*SNAMUT000000000000000{mute:01d}"  # N type, AMUT FourCC
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = unmuting, 1 = muting

- id: firePictureMuteChange
  label: Picture Mute Change Event
  direction: monitor_to_client
  command: "*SNPMUT000000000000000{mute:01d}"  # N type, PMUT FourCC
  params:
    - name: mute
      type: integer
      enum: [0, 1]
      description: 0 = picture mute enabled, 1 = picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Command format: 24-byte fixed-size ASCII. Header: `*S` (0x2A 0x53). Footer: 0x0A (LF). Message types: C=Control, E=Enquiry, A=Answer, N=Notify. Commands use FourCC ASCII identifiers (bytes 3-6). Parameters in bytes 7-22. Success response: all zeros. Error response: all `F`. NotFound response: all `N` (for setInput/getInput only). Network connect via `netcat [IP] 20060`. Monitor requires: Enable Remote Device Control + Enable Simple IP Control in settings.

Command timing: not specified in source. IR codes cover full remote control including number pad, color buttons, media controls, HDMI source selection.

EU RED-DA compliance: getBroadcastAddress (BADR) and getMacAddress (MADR) marked with `*` in source — available commands vary by specification. Reference: https://pro-bravia.sony.net/setup/device-settings/red-da/
<!-- UNRESOLVED: getBroadcastAddress and getMacAddress interface selection (ethN parameter) not fully documented -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
retrieved_at: 2026-05-26T04:51:07.075Z
last_checked_at: 2026-07-22T01:23:54.011Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:23:54.011Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched source with correct command codes, parameter shapes, and transport. Source N-type event commands documented in the spec Events section. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA specification variants not fully documented in source"
- "no standalone settable parameters outside action commands"
- "no explicit multi-step macros in source"
- "no safety warnings or interlock procedures in source"
- "getBroadcastAddress and getMacAddress interface selection (ethN parameter) not fully documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
