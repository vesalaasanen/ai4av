---
spec_id: admin/sony-xrj-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRJ Series Control Spec"
manufacturer: Sony
model_family: "Sony XRJ Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XRJ Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://helpguide.sony.net/tv/gusltnr1/v1/en-us/07-02_17.html
retrieved_at: 2026-10-07T13:11:42.576Z
last_checked_at: 2026-10-07T13:11:42.576Z
generated_at: 2026-10-07T13:11:42.576Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "EU models have 3 specification types based on RED-DA compliance; exact command differences not documented"
  - "maximum number of concurrent connections not stated"
  - "no continuously settable numeric variables beyond discrete actions"
  - "no multi-step sequences described in source"
  - "source does not describe safety warnings, interlock procedures, or power-on sequencing"
  - "volume range (min/max) not stated in source"
  - "connection limits and timeout behavior not stated"
  - "whether notify events require subscription or are sent automatically"
  - "full list of scene setting values — only 3 documented but others may exist"
  - "maximum input index values per type beyond the 1-9999 range hint"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:11:42.576Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 action units (22 actions + 6 query feedbacks) match source FourCC rows and port 20060; auth UNRESOLVED; IR codes are setIrccCode parameter values. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony XRJ Series Control Spec

## Summary

The Sony XRJ Series is a monitor/TV that supports Simple IP Control over TCP port 20060. The protocol uses fixed-length 24-byte binary messages with a FourCC command identifier and supports power control, input routing, audio volume/mute, picture mute, scene settings, IR remote emulation, and unsolicited event notifications.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: EU models have 3 specification types based on RED-DA compliance; exact command differences not documented -->
<!-- UNRESOLVED: maximum number of concurrent connections not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable     # inferred from setPowerStatus / togglePowerStatus commands
  - routable      # inferred from setInput / getInput commands
  - queryable     # inferred from getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting commands
  - levelable     # inferred from setAudioVolume / getAudioVolume commands
```

## Actions
```yaml
actions:
  - id: setPowerStatus
    label: Set Power Status
    kind: action
    description: "Set power on or standby. FourCC: POWR. Control message (0x43)."
    params:
      - name: status
        type: enum
        values:
          - "0"  # Standby (Off) — param bytes all 0x30 except last byte 0x30
          - "1"  # Active (On) — param bytes all 0x30 except last byte 0x31
        description: "0 = Standby, 1 = Active"

  - id: togglePowerStatus
    label: Toggle Power Status
    kind: action
    description: "Toggles the current power status. FourCC: TPOW. Control message (0x43). No parameters."
    params: []

  - id: setAudioVolume
    label: Set Audio Volume
    kind: action
    description: "Set volume as decimal string left-padded with 0 (16 chars). FourCC: VOLU. Control message (0x43)."
    params:
      - name: volume
        type: integer
        description: "Volume level, zero-padded decimal in 16-char parameter field. e.g. 0000000000000029"

  - id: setAudioMute
    label: Set Audio Mute
    kind: action
    description: "Enable or disable audio mute. FourCC: AMUT. Control message (0x43)."
    params:
      - name: mute
        type: enum
        values:
          - "0"  # Unmute
          - "1"  # Mute
        description: "0 = Unmute, 1 = Mute"

  - id: setInput
    label: Set Input
    kind: action
    description: "Change the input source. FourCC: INPT. Control message (0x43)."
    params:
      - name: input_type
        type: enum
        values:
          - "1"  # HDMI
          - "3"  # Composite
          - "4"  # Component
          - "5"  # Screen Mirroring
        description: "Input connector type"
      - name: input_index
        type: integer
        description: "Input number (1-9999), zero-padded in last 4 parameter bytes"

  - id: setPictureMute
    label: Set Picture Mute
    kind: action
    description: "Enable or disable picture mute (black screen). FourCC: PMUT. Control message (0x43)."
    params:
      - name: state
        type: enum
        values:
          - "0"  # Disable picture mute
          - "1"  # Enable picture mute (black screen)
        description: "0 = Off, 1 = On"

  - id: togglePictureMute
    label: Toggle Picture Mute
    kind: action
    description: "Toggle picture mute state. FourCC: TPMU. Control message (0x43). No parameters."
    params: []

  - id: setSceneSetting
    label: Set Scene Setting
    kind: action
    description: "Change the scene/picture mode. FourCC: SCEN. Control message (0x43). Parameter is case-sensitive string right-padded with #."
    params:
      - name: scene
        type: string
        values:
          - auto
          - auto24pSync
          - general
        description: "Scene setting name, case-sensitive, right-padded with # to fill 16 bytes"

  - id: setIrccCode
    label: Send IR Remote Code
    kind: action
    description: "Sends an IR remote control command. FourCC: IRCC. Control message (0x43)."
    params:
      - name: code
        type: string
        description: "16-byte parameter encoding the IR command. See IR Commands table in source."

  - id: getPowerStatus
    label: Get Power Status
    kind: action
    description: "Enquiry for power status. FourCC: POWR. Message type 0x45."
    params: []

  - id: getAudioVolume
    label: Get Audio Volume
    kind: action
    description: "Retrieves the audio volume value. FourCC: VOLU. Message type 0x45."
    params: []

  - id: getAudioMute
    label: Get Audio Mute
    kind: action
    description: "Retrieves the audio mute status. FourCC: AMUT. Message type 0x45."
    params: []

  - id: getInput
    label: Get Input
    kind: action
    description: "Gets the current input. FourCC: INPT. Message type 0x45."
    params: []

  - id: getPictureMute
    label: Get Picture Mute
    kind: action
    description: "Checks if picture mute is enabled. FourCC: PMUT. Message type 0x45."
    params: []

  - id: getSceneSetting
    label: Get Scene Setting
    kind: action
    description: "Retrieves the current Scene Setting. FourCC: SCEN. Message type 0x45."
    params: []

  - id: getBroadcastAddress
    label: Get Broadcast Address
    kind: action
    description: "Retrieves the broadcast IPv4 address of the specified interface. FourCC: BADR. Message type 0x45. Request parameter shows eth0."
    params:
      - name: interface
        type: string
        description: "Specified interface; request parameter shown as eth0 and padded on the right with #"

  - id: getMacAddress
    label: Get MAC Address
    kind: action
    description: "Retrieves the MAC address of the specified interface. FourCC: MADR. Message type 0x45. Request parameter shows eth0."
    params:
      - name: interface
        type: string
        description: "Specified interface; request parameter shown as eth0 and padded on the right with #"

  - id: firePowerChange
    label: Power Change Notification
    kind: action
    description: "Notify command for power changes. FourCC: POWR. Message type 0x4E. Sent when powering off or on."
    params: []

  - id: fireInputChange
    label: Input Change Notification
    kind: action
    description: "Notify command for input changes. FourCC: INPT. Message type 0x4E. Includes HDMI, Composite, Component, or Screen Mirroring input (1–9999)."
    params: []

  - id: fireVolumeChange
    label: Volume Change Notification
    kind: action
    description: "Notify command for volume changes. FourCC: VOLU. Message type 0x4E."
    params: []

  - id: fireMuteChange
    label: Mute Change Notification
    kind: action
    description: "Notify command for mute changes. FourCC: AMUT. Message type 0x4E. Sent when unmuting or muting."
    params: []

  - id: firePictureMuteChange
    label: Picture Mute Change Notification
    kind: action
    description: "Notify command for picture mute changes. FourCC: PMUT. Message type 0x4E. Sent when picture mute is enabled or disabled."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power Status
    type: enum
    description: "Returned by getPowerStatus enquiry (FourCC: POWR, message type 0x45)."
    query_command: getPowerStatus
    values:
      - "0"  # Standby (Off)
      - "1"  # Active (On)

  - id: audio_volume
    label: Audio Volume
    type: integer
    description: "Returned by getAudioVolume enquiry (FourCC: VOLU, message type 0x45). Decimal value in 16-char field."
    query_command: getAudioVolume

  - id: audio_mute_state
    label: Audio Mute Status
    type: enum
    description: "Returned by getAudioMute enquiry (FourCC: AMUT, message type 0x45)."
    query_command: getAudioMute
    values:
      - "0"  # Not Muted
      - "1"  # Muted

  - id: input_state
    label: Current Input
    type: string
    description: "Returned by getInput enquiry (FourCC: INPT, message type 0x45). Encodes type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) plus index."
    query_command: getInput

  - id: picture_mute_state
    label: Picture Mute Status
    type: enum
    description: "Returned by getPictureMute enquiry (FourCC: PMUT, message type 0x45)."
    query_command: getPictureMute
    values:
      - "0"  # Disabled
      - "1"  # Enabled

  - id: scene_setting
    label: Scene Setting
    type: string
    description: "Returned by getSceneSetting enquiry (FourCC: SCEN, message type 0x45). String value in 16-char parameter field."
    query_command: getSceneSetting
```

## Variables
```yaml
# UNRESOLVED: no continuously settable numeric variables beyond discrete actions
```

## Events
```yaml
events:
  - id: firePowerChange
    label: Power Change Notification
    description: "Unsolicited notify (message type 0x4E, FourCC: POWR). Sent when the monitor powers on (param=1) or off (param=0)."

  - id: fireInputChange
    label: Input Change Notification
    description: "Unsolicited notify (message type 0x4E, FourCC: INPT). Sent when the input changes. Includes new input type and index."

  - id: fireVolumeChange
    label: Volume Change Notification
    description: "Unsolicited notify (message type 0x4E, FourCC: VOLU). Sent when volume changes. Includes new volume value."

  - id: fireMuteChange
    label: Mute Change Notification
    description: "Unsolicited notify (message type 0x4E, FourCC: AMUT). Sent when mute state changes. 0=unmuted, 1=muted."

  - id: firePictureMuteChange
    label: Picture Mute Change Notification
    description: "Unsolicited notify (message type 0x4E, FourCC: PMUT). Sent when picture mute changes. 0=enabled, 1=disabled."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety warnings, interlock procedures, or power-on sequencing
```

## Notes
- All messages are exactly 24 bytes: 2-byte header (0x2A 0x53), 1-byte message type, 4-byte FourCC command, 16-byte parameters, 1-byte footer (0x0A).
- Message types: Control (0x43, client→monitor), Enquiry (0x45, client→monitor), Answer (0x41, monitor→client), Notify (0x4E, monitor→client).
- Answer success is all 0x30 ("0") in the parameter field; error is all 0x46 ("F").
- Volume parameter is a decimal number left-padded with "0" to fill 16 characters (e.g. `0000000000000029` for volume 29).
- Scene setting parameter is a case-sensitive string right-padded with "#" to fill 16 characters.
- Monitor must have Simple IP Control enabled in settings: Settings → Network & Internet → Home network → IP control → Simple IP control.
- Remote device control must also be enabled: Settings → Network & Internet → Remote device settings → Control remotely.
- EU area models have 3 specification types based on RED-DA compliance; available commands may differ.
- `getBroadcastAddress` and `getMacAddress` commands are also documented but are informational queries rather than control commands.

<!-- UNRESOLVED: volume range (min/max) not stated in source -->
<!-- UNRESOLVED: connection limits and timeout behavior not stated -->
<!-- UNRESOLVED: whether notify events require subscription or are sent automatically -->
<!-- UNRESOLVED: full list of scene setting values — only 3 documented but others may exist -->
<!-- UNRESOLVED: maximum input index values per type beyond the 1-9999 range hint -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://helpguide.sony.net/tv/gusltnr1/v1/en-us/07-02_17.html
retrieved_at: 2026-10-07T13:11:42.576Z
last_checked_at: 2026-10-07T13:11:42.576Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:11:42.576Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 action units (22 actions + 6 query feedbacks) match source FourCC rows and port 20060; auth UNRESOLVED; IR codes are setIrccCode parameter values. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "EU models have 3 specification types based on RED-DA compliance; exact command differences not documented"
- "maximum number of concurrent connections not stated"
- "no continuously settable numeric variables beyond discrete actions"
- "no multi-step sequences described in source"
- "source does not describe safety warnings, interlock procedures, or power-on sequencing"
- "volume range (min/max) not stated in source"
- "connection limits and timeout behavior not stated"
- "whether notify events require subscription or are sent automatically"
- "full list of scene setting values — only 3 documented but others may exist"
- "maximum input index values per type beyond the 1-9999 range hint"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
