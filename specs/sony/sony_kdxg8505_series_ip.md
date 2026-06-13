---
spec_id: admin/sony-kdxg8505-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXG8505 Series Control Spec"
manufacturer: Sony
model_family: "Sony KDXG8505 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDXG8505 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T12:17:34.890Z
last_checked_at: 2026-06-12T19:52:56.837Z
generated_at: 2026-06-12T19:52:56.837Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no settable continuous variables beyond volume (covered as action)"
  - "no multi-step sequences described in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "maximum volume level not stated in source"
  - "number of simultaneous TCP connections supported not stated in source"
  - "response timeout values not stated in source"
  - "whether keep-alive or heartbeat mechanism exists not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:52:56.837Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched wire-level commands in source; transport port verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony KDXG8505 Series Control Spec

## Summary

Sony KDXG8505 Series BRAVIA television controlled via Simple IP Control protocol over TCP. Binary fixed-length 24-byte messages with FourCC command identifiers. Supports power, volume, mute, input selection, picture mute, scene setting, IR remote emulation, and network info queries. Device also sends unsolicited notify messages for state changes.

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
traits:
  - powerable    # setPowerStatus, togglePowerStatus
  - queryable    # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
  - levelable    # setAudioVolume with numeric level
  - routable     # setInput with connector type and index
```

## Actions

```yaml
actions:
  - id: set_ircc_code
    label: Send IR Remote Code
    kind: action
    fourcc: IRCC
    message_type: C
    description: Sends IR remote control command. Parameter is a zero-padded decimal code from the IR command table.
    params:
      - name: ir_code
        type: string
        description: "Zero-padded 16-char decimal code. E.g. '0000000000000005' for Display, '0000000000000013' for Confirm. Full list in IR Commands table."
        values:
          - "0000000000000005": Display
          - "0000000000000006": Home
          - "0000000000000007": Options
          - "0000000000000008": Return
          - "0000000000000009": Up
          - "0000000000000010": Down
          - "0000000000000011": Right
          - "0000000000000012": Left
          - "0000000000000013": Confirm
          - "0000000000000014": Red
          - "0000000000000015": Green
          - "0000000000000016": Yellow
          - "0000000000000017": Blue
          - "0000000000000018": Num1
          - "0000000000000019": Num2
          - "0000000000000020": Num3
          - "0000000000000021": Num4
          - "0000000000000022": Num5
          - "0000000000000023": Num6
          - "0000000000000024": Num7
          - "0000000000000025": Num8
          - "0000000000000026": Num9
          - "0000000000000027": Num0
          - "0000000000000030": Volume Up
          - "0000000000000031": Volume Down
          - "0000000000000032": Mute
          - "0000000000000033": Channel Up
          - "0000000000000034": Channel Down
          - "0000000000000035": Subtitle
          - "0000000000000038": DOT
          - "0000000000000050": Picture Off
          - "0000000000000061": Wide
          - "0000000000000062": Jump
          - "0000000000000076": Sync Menu
          - "0000000000000077": Forward
          - "0000000000000078": Play
          - "0000000000000079": Rewind
          - "0000000000000080": Prev
          - "0000000000000081": Stop
          - "0000000000000082": Next
          - "0000000000000084": Pause
          - "0000000000000086": Flash Plus
          - "0000000000000087": Flash Minus
          - "0000000000000098": TV Power
          - "0000000000000099": Audio
          - "0000000000000101": Input
          - "0000000000000104": Sleep
          - "0000000000000105": Sleep Timer
          - "0000000000000108": Video 2
          - "0000000000000110": Picture Mode
          - "0000000000000121": Demo Surround
          - "0000000000000124": HDMI 1
          - "0000000000000125": HDMI 2
          - "0000000000000126": HDMI 3
          - "0000000000000127": HDMI 4
          - "0000000000000129": Action Menu
          - "0000000000000130": Help

  - id: set_power_status
    label: Set Power Status
    kind: action
    fourcc: POWR
    message_type: C
    description: "Set power state. Parameter '0000000000000000' = Standby (Off), '0000000000000001' = Active (On)."
    params:
      - name: status
        type: enum
        values:
          - standby
          - active

  - id: get_power_status
    label: Get Power Status
    kind: query
    fourcc: POWR
    message_type: E
    description: Query current power status. Answer returns standby or active.
    params: []

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    fourcc: TPOW
    message_type: C
    description: Toggles the power status between standby and active.
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    fourcc: VOLU
    message_type: C
    description: "Set volume. Value is zero-padded 16-char decimal string. E.g. '0000000000000029' for volume 29."
    params:
      - name: volume
        type: integer
        description: "Volume level as zero-padded decimal in 16-char parameter field."

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    fourcc: VOLU
    message_type: E
    description: Retrieves current audio volume value.
    params: []

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    fourcc: AMUT
    message_type: C
    description: "Enable or disable audio mute. '0000000000000000' = Unmute, '0000000000000001' = Mute."
    params:
      - name: state
        type: enum
        values:
          - unmute
          - mute

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    fourcc: AMUT
    message_type: E
    description: Retrieves current audio mute status.
    params: []

  - id: set_input
    label: Set Input
    kind: action
    fourcc: INPT
    message_type: C
    description: "Changes input source. Connector type byte followed by zero-padded index (1-9999)."
    params:
      - name: connector
        type: enum
        description: Connector type identifier
        values:
          - hdmi
          - composite
          - component
          - screen_mirroring
      - name: index
        type: integer
        description: "Connector index (1-9999)."

  - id: get_input
    label: Get Input
    kind: query
    fourcc: INPT
    message_type: E
    description: Get current input source and connector index.
    params: []

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    fourcc: PMUT
    message_type: C
    description: "Enable or disable picture mute (black screen). '0000000000000000' = Disable, '0000000000000001' = Enable."
    params:
      - name: state
        type: enum
        values:
          - disable
          - enable

  - id: get_picture_mute
    label: Get Picture Mute
    kind: query
    fourcc: PMUT
    message_type: E
    description: Checks if picture mute is enabled.
    params: []

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    fourcc: TPMU
    message_type: C
    description: Toggles picture mute state.
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    fourcc: SCEN
    message_type: C
    description: "Changes scene setting. Parameter string is case-sensitive, right-padded with '#'. E.g. 'auto24pSync#####'."
    params:
      - name: mode
        type: enum
        values:
          - auto
          - auto24pSync
          - general

  - id: get_scene_setting
    label: Get Scene Setting
    kind: query
    fourcc: SCEN
    message_type: E
    description: Retrieves current scene setting.
    params: []

  - id: get_broadcast_address
    label: Get Broadcast Address
    kind: query
    fourcc: BADR
    message_type: E
    description: "Retrieves broadcast IPv4 address of specified interface. Parameter includes interface identifier (e.g. 'eth0')."
    params:
      - name: interface
        type: string
        description: "Network interface name (e.g. 'eth0'), right-padded with '#'."

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    fourcc: MADR
    message_type: E
    description: "Retrieves MAC address of specified interface. Parameter includes interface identifier (e.g. 'eth0')."
    params:
      - name: interface
        type: string
        description: "Network interface name (e.g. 'eth0'), right-padded with '#'."
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    description: Power status returned by getPowerStatus
    values:
      - standby
      - active

  - id: audio_volume
    type: integer
    description: Current volume level returned by getAudioVolume

  - id: audio_mute_state
    type: enum
    description: Audio mute status returned by getAudioMute
    values:
      - not_muted
      - muted

  - id: input_source
    type: composite
    description: Current input source returned by getInput
    values:
      - connector: hdmi
      - connector: composite
      - connector: component
      - connector: screen_mirroring

  - id: picture_mute_state
    type: enum
    description: Picture mute status returned by getPictureMute
    values:
      - disabled
      - enabled

  - id: scene_setting
    type: enum
    description: Current scene setting returned by getSceneSetting
    values:
      - auto
      - auto24pSync
      - general

  - id: broadcast_address
    type: string
    description: Broadcast IPv4 address returned by getBroadcastAddress

  - id: mac_address
    type: string
    description: MAC address returned by getMacAddress

  - id: command_success
    type: boolean
    description: "Control command success indicated by answer parameter '0000000000000000'. Error indicated by 'FFFFFFFFFFFFFFFF'."
```

## Variables

```yaml
# UNRESOLVED: no settable continuous variables beyond volume (covered as action)
```

## Events

```yaml
events:
  - id: power_change
    label: Power Change Notification
    fourcc: POWR
    message_type: N
    description: "Unsolicited notify when power state changes. '0000000000000000' = powering off, '0000000000000001' = powering on."
    params:
      - name: status
        type: enum
        values:
          - standby
          - active

  - id: input_change
    label: Input Change Notification
    fourcc: INPT
    message_type: N
    description: "Unsolicited notify when input changes. Includes connector type and index."
    params:
      - name: connector
        type: enum
        values:
          - hdmi
          - composite
          - component
          - screen_mirroring
      - name: index
        type: integer

  - id: volume_change
    label: Volume Change Notification
    fourcc: VOLU
    message_type: N
    description: Unsolicited notify when volume changes. Contains new volume value.
    params:
      - name: volume
        type: integer

  - id: mute_change
    label: Mute Change Notification
    fourcc: AMUT
    message_type: N
    description: "Unsolicited notify when mute state changes. '0000000000000000' = unmuting, '0000000000000001' = muting."
    params:
      - name: state
        type: enum
        values:
          - unmute
          - mute

  - id: picture_mute_change
    label: Picture Mute Change Notification
    fourcc: PMUT
    message_type: N
    description: "Unsolicited notify when picture mute changes. '0000000000000000' = enabled, '0000000000000001' = disabled."
    params:
      - name: state
        type: enum
        values:
          - enabled
          - disabled
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: EU models may have RED-DA compliance restrictions on available commands
```

## Notes

- All messages are fixed 24 bytes. Header: `0x2A 0x53` (bytes 0-1). Footer: `0x0A` (byte 23). Message type at byte 2. FourCC at bytes 3-6. Parameters at bytes 7-22.
- Message types: `C` (0x43) = Control, `E` (0x45) = Enquiry, `A` (0x41) = Answer, `N` (0x4E) = Notify.
- Control answer success = 16 x `0` (0x30). Control answer error = 16 x `F` (0x46). Enquiry with no params = 16 x `#` (0x23).
- Volume parameter is a left-zero-padded decimal string in 16-char field (e.g. `0000000000000029`).
- Scene setting parameter is right-`#`-padded, case-sensitive (e.g. `auto24pSync#####`).
- Input connector byte mapping: `1` = HDMI, `3` = Composite, `4` = Component, `5` = Screen Mirroring. Input index range 1-9999.
- EU area models have 3 specifications based on RED-DA compliance; settings and available commands may differ.
- Simple IP Control and Remote Device Control must both be enabled in monitor settings.
- <!-- UNRESOLVED: firmware version compatibility not stated in source -->
- <!-- UNRESOLVED: maximum volume level not stated in source -->
- <!-- UNRESOLVED: number of simultaneous TCP connections supported not stated in source -->
- <!-- UNRESOLVED: response timeout values not stated in source -->
- <!-- UNRESOLVED: whether keep-alive or heartbeat mechanism exists not stated in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T12:17:34.890Z
last_checked_at: 2026-06-12T19:52:56.837Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:52:56.837Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched wire-level commands in source; transport port verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no settable continuous variables beyond volume (covered as action)"
- "no multi-step sequences described in source"
- "no explicit safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "maximum volume level not stated in source"
- "number of simultaneous TCP connections supported not stated in source"
- "response timeout values not stated in source"
- "whether keep-alive or heartbeat mechanism exists not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
