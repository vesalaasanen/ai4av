---
spec_id: admin/sony-xrja95-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRJA95 Series Control Spec"
manufacturer: Sony
model_family: "XRJA95 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XRJA95 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T16:02:14.541Z
last_checked_at: 2026-07-22T01:28:11.924Z
generated_at: 2026-07-22T01:28:11.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "max volume not stated in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "max volume level not stated in source"
  - "firmware version compatibility not stated in source"
  - "connection timeout / keepalive behavior not stated in source"
  - "max concurrent connections not stated in source"
  - "EU RED-DA variant command differences not specified"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:28:11.924Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions (C and E message types) matched their FourCC codes in the source table; the N-type notifications are represented in the Events section; transport (TCP port 20060) verified. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony XRJA95 Series Control Spec

## Summary
Sony XRJA95 Series BRAVIA professional display controlled via Simple IP Control over TCP. Fixed-length 24-byte ASCII messages on port 20060. Supports power, volume, mute, input selection, picture mute, scene setting, and IR remote code emulation.

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
  - powerable    # inferred from setPowerStatus / togglePowerStatus
  - queryable    # inferred from get* enquiry commands
  - routable     # inferred from setInput / getInput
  - levelable    # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
actions:
  - id: set_ircc_code
    label: Send IR Remote Code
    kind: action
    fourcc: IRCC
    message_type: C
    description: Sends IR remote controller command codes
    params:
      - name: code
        type: string
        description: "IR command parameter, zero-padded 16 chars. Values include Display(0000000000000005), Home(0000000000000006), Options(0000000000000007), Return(0000000000000008), Up(0000000000000009), Down(0000000000000010), Right(0000000000000011), Left(0000000000000012), Confirm(0000000000000013), Red(0000000000000014), Green(0000000000000015), Yellow(0000000000000016), Blue(0000000000000017), Num1(0000000000000018), Num2(0000000000000019), Num3(0000000000000020), Num4(0000000000000021), Num5(0000000000000022), Num6(0000000000000023), Num7(0000000000000024), Num8(0000000000000025), Num9(0000000000000026), Num0(0000000000000027), VolumeUp(0000000000000030), VolumeDown(0000000000000031), Mute(0000000000000032), ChannelUp(0000000000000033), ChannelDown(0000000000000034), Subtitle(0000000000000035), DOT(0000000000000038), PictureOff(0000000000000050), Wide(0000000000000061), Jump(0000000000000062), SyncMenu(0000000000000076), Forward(0000000000000077), Play(0000000000000078), Rewind(0000000000000079), Prev(0000000000000080), Stop(0000000000000081), Next(0000000000000082), Pause(0000000000000084), FlashPlus(0000000000000086), FlashMinus(0000000000000087), TVPower(0000000000000098), Audio(0000000000000099), Input(0000000000000101), Sleep(0000000000000104), SleepTimer(0000000000000105), Video2(0000000000000108), PictureMode(0000000000000110), DemoSurround(0000000000000121), HDMI1(0000000000000124), HDMI2(0000000000000125), HDMI3(0000000000000126), HDMI4(0000000000000127), ActionMenu(0000000000000129), Help(0000000000000130)"

  - id: set_power_status
    label: Set Power Status
    kind: action
    fourcc: POWR
    message_type: C
    description: Sets power to standby (off) or active (on)
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Standby (Off), 0000000000000001 = Active (On)"

  - id: get_power_status
    label: Get Power Status
    kind: query
    fourcc: POWR
    message_type: E
    description: Retrieves current power status
    params: []

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    fourcc: TPOW
    message_type: C
    description: Toggles the power status
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    fourcc: VOLU
    message_type: C
    description: "Sets volume value, zero-padded decimal. e.g. 0000000000000029"
    params:
      - name: volume
        type: integer
        description: Volume level as decimal, zero-padded to 16 digits

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    fourcc: VOLU
    message_type: E
    description: Retrieves current audio volume
    params: []

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    fourcc: AMUT
    message_type: C
    description: Enables or disables audio mute
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Unmute, 0000000000000001 = Mute"

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    fourcc: AMUT
    message_type: E
    description: Retrieves audio mute status
    params: []

  - id: set_input
    label: Set Input
    kind: action
    fourcc: INPT
    message_type: C
    description: "Changes input source. Byte[13] selects type: 01=HDMI, 03=Composite, 04=Component, 05=Screen Mirroring. Bytes[17-22] are port number (1-9999)."
    params:
      - name: input_type
        type: enum
        values:
          - "00000000000001"
          - "00000000000003"
          - "00000000000004"
          - "00000000000005"
        description: "01=HDMI, 03=Composite, 04=Component, 05=Screen Mirroring"
      - name: port
        type: integer
        description: Port number 1-9999, zero-padded

  - id: get_input
    label: Get Input
    kind: query
    fourcc: INPT
    message_type: E
    description: Gets current input source
    params: []

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    fourcc: PMUT
    message_type: C
    description: Enables or disables picture mute (black screen)
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Disable picture mute, 0000000000000001 = Enable picture mute (black screen)"

  - id: get_picture_mute
    label: Get Picture Mute
    kind: query
    fourcc: PMUT
    message_type: E
    description: Checks if picture mute is enabled
    params: []

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    fourcc: TPMU
    message_type: C
    description: Toggles picture mute state
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    fourcc: SCEN
    message_type: C
    description: "Changes scene setting. Parameter strings are case-sensitive, right-padded with #. Values: auto, auto24pSync, general."
    params:
      - name: setting
        type: string
        description: "Scene setting name (auto, auto24pSync, general), right-padded with # to 16 chars"

  - id: get_scene_setting
    label: Get Scene Setting
    kind: query
    fourcc: SCEN
    message_type: E
    description: Retrieves current scene setting
    params: []

  - id: get_broadcast_address
    label: Get Broadcast Address
    kind: query
    fourcc: BADR
    message_type: E
    description: Retrieves broadcast IPv4 address of specified interface
    params:
      - name: interface
        type: string
        description: "Interface specifier, e.g. eth0, right-padded with #"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    fourcc: MADR
    message_type: E
    description: Retrieves MAC address of specified interface
    params:
      - name: interface
        type: string
        description: "Interface specifier, e.g. eth0, right-padded with #"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [standby, active]
    description: "Answer to getPowerStatus: 0000000000000000 = Standby, 0000000000000001 = Active"

  - id: command_ack
    type: enum
    values: [success, error]
    description: "Answer to control commands: all zeros = success, all F's = error"

  - id: input_not_found
    type: enum
    values: [not_found]
    description: "Answer to setInput: NNNNNNNNNNNNNNNN = input not found"

  - id: scene_not_available
    type: enum
    values: [not_available]
    description: "Answer to setSceneSetting/getSceneSetting: NNNNNNNNNNNNNNNN = not available for current input"

  - id: audio_mute_state
    type: enum
    values: [not_muted, muted]
    description: "Answer to getAudioMute: 0000000000000000 = Not Muted, 0000000000000001 = Muted"

  - id: picture_mute_state
    type: enum
    values: [disabled, enabled]
    description: "Answer to getPictureMute: 0000000000000000 = Disabled, 0000000000000001 = Enabled"

  - id: input_source
    type: string
    description: "Answer to getInput: returns input type code + port number"

  - id: volume_value
    type: integer
    description: "Answer to getAudioVolume: volume as decimal in 16-char padded field"

  - id: scene_setting_value
    type: string
    description: "Answer to getSceneSetting: scene setting name in 16-char field"

  - id: broadcast_address
    type: string
    description: "Answer to getBroadcastAddress: IPv4 broadcast address, right-padded with #"

  - id: mac_address
    type: string
    description: "Answer to getMacAddress: MAC address, right-padded with #"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: null  # UNRESOLVED: max volume not stated in source
    description: Audio volume level

  - id: audio_mute
    type: boolean
    description: Audio mute state

  - id: picture_mute
    type: boolean
    description: Picture mute state

  - id: power_state
    type: enum
    values: [standby, active]
    description: Power state

  - id: input_source
    type: string
    description: Current input source

  - id: scene_setting
    type: enum
    values: [auto, auto24pSync, general]
    description: Current scene setting
```

## Events
```yaml
events:
  - id: fire_power_change
    fourcc: POWR
    message_type: N
    description: "Notify sent on power state change. 0000000000000000 = powering off, 0000000000000001 = powering on."

  - id: fire_input_change
    fourcc: INPT
    message_type: N
    description: "Notify sent on input change. Includes input type and port number."

  - id: fire_volume_change
    fourcc: VOLU
    message_type: N
    description: "Notify sent on volume change. Includes new volume value."

  - id: fire_mute_change
    fourcc: AMUT
    message_type: N
    description: "Notify sent on mute change. 0000000000000000 = unmuting, 0000000000000001 = muting."

  - id: fire_picture_mute_change
    fourcc: PMUT
    message_type: N
    description: "Notify sent on picture mute change. 0000000000000000 = picture mute enabled, 0000000000000001 = picture mute disabled."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All messages are fixed-length 24 bytes. Format: `*S` header (2 bytes) + message type (1 byte: C/E/A/N) + FourCC command (4 bytes) + parameters (16 bytes) + `0x0A` LF footer (1 byte).
- EU area models have 3 specification types based on RED-DA compliance; settings and available commands may differ.
- Monitor must have "Remote device settings > Control remotely" and "Simple IP control" enabled before use.
- Input type byte[13] values: 01=HDMI, 03=Composite, 04=Component, 05=Screen Mirroring. Bytes[17-22] carry port number (1-9999).
- Scene setting parameters are case-sensitive and right-padded with `#` to fill 16 bytes.
<!-- UNRESOLVED: max volume level not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: connection timeout / keepalive behavior not stated in source -->
<!-- UNRESOLVED: max concurrent connections not stated in source -->
<!-- UNRESOLVED: EU RED-DA variant command differences not specified -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T16:02:14.541Z
last_checked_at: 2026-07-22T01:28:11.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:28:11.924Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions (C and E message types) matched their FourCC codes in the source table; the N-type notifications are represented in the Events section; transport (TCP port 20060) verified. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "max volume not stated in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "max volume level not stated in source"
- "firmware version compatibility not stated in source"
- "connection timeout / keepalive behavior not stated in source"
- "max concurrent connections not stated in source"
- "EU RED-DA variant command differences not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
