---
spec_id: admin/sony-fwx8001-series-simple-ip-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWX8001 Series Control Spec"
manufacturer: Sony
model_family: FW-49X8001E
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FW-49X8001E
    - FW-55X8001E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T18:59:36.601Z
last_checked_at: 2026-10-07T13:11:45.077Z
generated_at: 2026-10-07T13:11:45.077Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "EU RED-DA models may have different command availability; specifics not documented here"
  - "max volume not stated in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures found in source"
  - "maximum volume level not stated in source"
  - "EU RED-DA model command differences not documented"
  - "response timeout values not stated in source"
  - "maximum concurrent connection limit not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:11:45.077Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 action units (22 actions + 8 query feedbacks) match source FourCCs and TCP 20060 transport; source has 22 distinct commands, coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony FWX8001 Series Control Spec

## Summary
Sony BRAVIA Professional Displays in the FWX8001 series (FW-49X8001E, FW-55X8001E). Controlled via Simple IP Control (SSIP), a proprietary TCP protocol on port 20060 using fixed-length 24-byte messages. Supports power, volume, mute, input switching, picture mute, scene settings, and IR remote code emulation.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: EU RED-DA models may have different command availability; specifics not documented here -->

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
  - powerable    # setPowerStatus, togglePowerStatus present
  - queryable    # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
  - routable     # setInput with HDMI, Composite, Component, Screen Mirroring
  - levelable    # setAudioVolume with numeric value
```

## Actions
```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    command: "*SCPOWR{PARAM}0000000000000"
    description: "Set power state. Param: 0000000000000000 = Standby (Off), 0000000000000001 = Active (On)."
    params:
      - name: state
        type: enum
        values:
          - "off"
          - "on"
        description: "Power state to set"

  - id: get_power_status
    label: Get Power Status
    kind: query
    command: "*SEPOWR################"
    description: "Query current power state."
    params: []

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    command: "*SCTPOW################"
    description: "Toggles the current power status."
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    command: "*SCVOLU{PARAM}"
    description: "Set volume. Value is zero-padded decimal in 16-char parameter field, e.g. 0000000000000029."
    params:
      - name: volume
        type: integer
        description: "Volume level (zero-padded, e.g. 29 → 0000000000000029)"

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    command: "*SEVOLU################"
    description: "Retrieve current audio volume."
    params: []

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    command: "*SCAMUT{PARAM}00000000000000"
    description: "Set audio mute state. Param: 0000000000000000 = Unmute, 0000000000000001 = Mute."
    params:
      - name: mute
        type: enum
        values:
          - "off"
          - "on"
        description: "Mute state"

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    command: "*SEAMUT################"
    description: "Retrieve audio mute status."
    params: []

  - id: set_input
    label: Set Input
    kind: action
    command: "*SCINPT{TYPE}{INDEX}XXXX"
    description: "Change input source. Type codes: 00000001=HDMI, 00000003=Composite, 00000004=Component, 00000005=Screen Mirroring. Index range 1-9999."
    params:
      - name: input_type
        type: enum
        values:
          - hdmi
          - composite
          - component
          - screen_mirroring
        description: "Input type"
      - name: index
        type: integer
        description: "Input index (1-9999)"

  - id: get_input
    label: Get Input
    kind: query
    command: "*SEINPT################"
    description: "Retrieve current input source."
    params: []

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    command: "*SCPMUT{PARAM}00000000000000"
    description: "Set picture mute. Param: 0000000000000000 = Disable, 0000000000000001 = Enable (black screen)."
    params:
      - name: state
        type: enum
        values:
          - "off"
          - "on"
        description: "Picture mute state"

  - id: get_picture_mute
    label: Get Picture Mute
    kind: query
    command: "*SEPMUT################"
    description: "Check if picture mute is enabled."
    params: []

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    command: "*SCTPMU################"
    description: "Toggle picture mute state."
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    command: "*SCSCEN{PARAM}"
    description: "Change scene setting. Value is string padded right with '#'. Options: auto, auto24pSync, general."
    params:
      - name: scene
        type: enum
        values:
          - auto
          - auto24pSync
          - general
        description: "Scene setting (case-sensitive, pad right with #)"

  - id: get_scene_setting
    label: Get Scene Setting
    kind: query
    command: "*SESCEN################"
    description: "Retrieve current scene setting."
    params: []

  - id: set_ircc_code
    label: Send IR Remote Code
    kind: action
    command: "*SCIRCC{PARAM}"
    description: "Send IR remote control code via IP. Parameter is 16-char code identifying the IR command."
    params:
      - name: ir_code
        type: enum
        values:
          - display
          - home
          - options
          - return
          - up
          - down
          - right
          - left
          - confirm
          - red
          - green
          - yellow
          - blue
          - num1
          - num2
          - num3
          - num4
          - num5
          - num6
          - num7
          - num8
          - num9
          - num0
          - volume_up
          - volume_down
          - mute
          - channel_up
          - channel_down
          - subtitle
          - dot
          - picture_off
          - wide
          - jump
          - sync_menu
          - forward
          - play
          - rewind
          - prev
          - stop
          - next
          - pause
          - flash_plus
          - flash_minus
          - tv_power
          - audio
          - input
          - sleep
          - sleep_timer
          - video_2
          - picture_mode
          - demo_surround
          - hdmi_1
          - hdmi_2
          - hdmi_3
          - hdmi_4
          - action_menu
          - help
        description: "IR remote control code to send"

  - id: get_broadcast_address
    label: Get Broadcast Address
    kind: query
    command: "*SEBADReth0############"
    description: "Retrieve broadcast IPv4 address of specified interface."
    params:
      - name: interface
        type: string
        description: "Network interface name, e.g. eth0"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    command: "*SEMADReth0############"
    description: "Retrieve MAC address of specified interface."
    params:
      - name: interface
        type: string
        description: "Network interface name, e.g. eth0"

  - id: fire_power_change
    label: Fire Power Change
    kind: action
    command: "*SNPOWR{STATE}00000000000000"
    description: "Notify when powering off or powering on."
    params: []

  - id: fire_input_change
    label: Fire Input Change
    kind: action
    command: "*SNINPT{TYPE}{INDEX}XXXX"
    description: "Notify when the input changes. HDMI, Composite, Component, and Screen Mirroring use indices 1–9999."
    params: []

  - id: fire_volume_change
    label: Fire Volume Change
    kind: action
    command: "*SNVOLU{VALUE}"
    description: "Notify when volume changes."
    params: []

  - id: fire_mute_change
    label: Fire Mute Change
    kind: action
    command: "*SNAMUT{STATE}00000000000000"
    description: "Notify when unmuting or muting."
    params: []

  - id: fire_picture_mute_change
    label: Fire Picture Mute Change
    kind: action
    command: "*SNPMUT{STATE}00000000000000"
    description: "Notify when picture mute is enabled or disabled."
    params: []
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - "off"
      - "on"
    description: "Current power state returned by getPowerStatus answer"
    query_command: "*SEPOWR################"

  - id: audio_volume
    type: integer
    description: "Current audio volume level"
    query_command: "*SEVOLU################"

  - id: audio_mute_state
    type: enum
    values:
      - unmuted
      - muted
    description: "Current audio mute state"
    query_command: "*SEAMUT################"

  - id: current_input
    type: string
    description: "Current input source (type code + index, e.g. HDMI 1)"
    query_command: "*SEINPT################"

  - id: picture_mute_state
    type: enum
    values:
      - disabled
      - enabled
    description: "Current picture mute state"
    query_command: "*SEPMUT################"

  - id: scene_setting
    type: string
    description: "Current scene setting (auto, auto24pSync, general)"
    query_command: "*SESCEN################"

  - id: broadcast_address
    type: string
    description: "Broadcast IPv4 address of network interface"
    query_command: "*SEBADReth0############"

  - id: mac_address
    type: string
    description: "MAC address of network interface"
    query_command: "*SEMADReth0############"
```

## Variables
```yaml
variables:
  - id: volume
    type: integer
    min: 0
    # UNRESOLVED: max volume not stated in source
    description: "Audio volume level"
    access: read_write

  - id: audio_mute
    type: boolean
    description: "Audio mute on/off"
    access: read_write

  - id: power
    type: boolean
    description: "Power on/off state"
    access: read_write

  - id: input_source
    type: string
    description: "Active input source"
    access: read_write

  - id: picture_mute
    type: boolean
    description: "Picture mute on/off"
    access: read_write
```

## Events
```yaml
events:
  - id: power_change
    command: "*SNPOWR{STATE}00000000000000"
    description: "Sent when power state changes. State 0000000000000000 = powering off, 0000000000000001 = powering on."
    direction: monitor_to_client

  - id: input_change
    command: "*SNINPT{TYPE}{INDEX}XXXX"
    description: "Sent when input changes. Same type codes as setInput."
    direction: monitor_to_client

  - id: volume_change
    command: "*SNVOLU{VALUE}"
    description: "Sent when volume level changes."
    direction: monitor_to_client

  - id: mute_change
    command: "*SNAMUT{STATE}00000000000000"
    description: "Sent when mute state changes. 0000000000000000 = unmuting, 0000000000000001 = muting."
    direction: monitor_to_client

  - id: picture_mute_change
    command: "*SNPMUT{STATE}00000000000000"
    description: "Sent when picture mute changes. 0000000000000000 = enabled, 0000000000000001 = disabled."
    direction: monitor_to_client
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All messages are exactly 24 bytes: 2-byte header (*S), 1-byte message type (C/E/A/N), 4-byte command (FourCC), 16-byte parameter, 1-byte footer (LF 0x0A).
- Header is always `*S` (0x2A 0x53). Footer is always LF (0x0A).
- Answer messages return 16× `0` for success, 16× `F` for error.
- Enquiry parameters use 16× `#` as placeholder.
- Control commands with no parameters also use 16× `#`.
- setInput returns `N` characters (16× N) when input not found.
- Scene setting parameter strings are case-sensitive and right-padded with `#`.
- EU models have RED-DA compliance variants with potentially different commands available.
- IR commands are sent via the single `setIrccCode` action with different parameter codes.
- `getBroadcastAddress` and `getMacAddress` require an interface name (e.g. `eth0`) in the parameter field.

<!-- UNRESOLVED: maximum volume level not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: EU RED-DA model command differences not documented -->
<!-- UNRESOLVED: response timeout values not stated in source -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated in source -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T18:59:36.601Z
last_checked_at: 2026-10-07T13:11:45.077Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:11:45.077Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 action units (22 actions + 8 query feedbacks) match source FourCCs and TCP 20060 transport; source has 22 distinct commands, coverage complete. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "EU RED-DA models may have different command availability; specifics not documented here"
- "max volume not stated in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures found in source"
- "maximum volume level not stated in source"
- "EU RED-DA model command differences not documented"
- "response timeout values not stated in source"
- "maximum concurrent connection limit not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
