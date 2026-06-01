---
spec_id: admin/sony-kdlw790-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW790 Series Control Spec"
manufacturer: Sony
model_family: "Sony KDLW790 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDLW790 Series"
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
last_checked_at: 2026-05-31T22:30:33.049Z
generated_at: 2026-05-31T22:30:33.049Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:30:33.049Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched FourCC codes and message types in the source; transport parameters verified; full command coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDLW790 Series Control Spec

## Summary

Sony KDLW790 Series BRAVIA professional displays use Simple IP Control — a binary protocol over TCP port 20060 with fixed-length 24-byte messages. The protocol supports power, volume, mute, input selection, picture mute, scene settings, IR remote code emulation, and network info queries. The device also emits unsolicited notify messages on state changes.

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

## Data Format

```yaml
description: |
  Fixed 24-byte messages. Structure:
    Byte 0-1:   Header  - 0x2A 0x53 (*S)
    Byte 2:     Message Type - C (Control), E (Enquiry), A (Answer), N (Notify)
    Byte 3-6:   FourCC command identifier
    Byte 7-22:  Parameters (16 bytes, zero-padded)
    Byte 23:    Footer - 0x0A (LF)
  Control (C) and Enquiry (E) are client→monitor.
  Answer (A) is monitor→client reply.
  Notify (N) is unsolicited monitor→client event.
```

## Traits

```yaml
traits:
  - powerable
  - levelable
  - queryable
  - routable
```

## Actions

```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    fourcc: POWR
    message_type: C
    description: "Set power state. Param 0000000000000000 = Standby (Off), 0000000000000001 = Active (On)."
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
    fourcc: POWR
    message_type: E
    description: "Query current power status."
    params: []

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    fourcc: TPOW
    message_type: C
    description: "Toggles current power status."
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    fourcc: VOLU
    message_type: C
    description: "Set volume level. Value zero-padded in 16-byte param field, e.g. 0000000000000029."
    params:
      - name: volume
        type: integer
        description: "Volume level (decimal, zero-padded to 16 digits)"

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    fourcc: VOLU
    message_type: E
    description: "Retrieve current audio volume level."
    params: []

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    fourcc: AMUT
    message_type: C
    description: "Set audio mute state. Param 0000000000000000 = Unmute, 0000000000000001 = Mute."
    params:
      - name: mute
        type: enum
        values:
          - "off"
          - "on"
        description: "Mute state to set"

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    fourcc: AMUT
    message_type: E
    description: "Query current audio mute status."
    params: []

  - id: set_input
    label: Set Input
    kind: action
    fourcc: INPT
    message_type: C
    description: "Change input source. Input type code in byte 10, port number (1-9999) in bytes 14-17."
    params:
      - name: input_type
        type: enum
        values:
          - hdmi
          - composite
          - component
          - screen_mirroring
        description: "Input type: hdmi(1), composite(3), component(4), screen_mirroring(5)"
      - name: port
        type: integer
        description: "Port number (1-9999)"

  - id: get_input
    label: Get Input
    kind: query
    fourcc: INPT
    message_type: E
    description: "Query current input source."
    params: []

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    fourcc: PMUT
    message_type: C
    description: "Set picture mute state. 0000000000000000 = disable (screen visible), 0000000000000001 = enable (screen black)."
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
    fourcc: PMUT
    message_type: E
    description: "Query picture mute status."
    params: []

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    fourcc: TPMU
    message_type: C
    description: "Toggle picture mute state."
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    fourcc: SCEN
    message_type: C
    description: "Change scene setting. Parameter string is case-sensitive, right-padded with #."
    params:
      - name: scene
        type: enum
        values:
          - auto
          - auto24pSync
          - general
        description: "Scene setting name (case-sensitive)"

  - id: get_scene_setting
    label: Get Scene Setting
    kind: query
    fourcc: SCEN
    message_type: E
    description: "Query current scene setting."
    params: []

  - id: set_ircc_code
    label: Send IR Command
    kind: action
    fourcc: IRCC
    message_type: C
    description: "Sends codes equivalent to IR remote controller buttons. 44 supported IR codes."
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
        description: "IR remote command code"

  - id: get_broadcast_address
    label: Get Broadcast Address
    kind: query
    fourcc: BADR
    message_type: E
    description: "Retrieve broadcast IPv4 address for a specified network interface."
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    fourcc: MADR
    message_type: E
    description: "Retrieve MAC address for a specified network interface."
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0"
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - "off"
      - "on"
    description: "Current power status (from getPowerStatus answer)"

  - id: audio_volume
    type: integer
    description: "Current audio volume level (from getAudioVolume answer)"

  - id: audio_mute_state
    type: enum
    values:
      - "off"
      - "on"
    description: "Current audio mute status (from getAudioMute answer)"

  - id: current_input
    type: string
    description: "Current input source and port (from getInput answer)"

  - id: picture_mute_state
    type: enum
    values:
      - "off"
      - "on"
    description: "Current picture mute status (from getPictureMute answer)"

  - id: scene_setting
    type: string
    description: "Current scene setting value (from getSceneSetting answer)"

  - id: broadcast_address
    type: string
    description: "Broadcast IPv4 address of specified interface"

  - id: mac_address
    type: string
    description: "MAC address of specified interface"
```

## Variables

```yaml
variables:
  - id: volume
    type: integer
    min: 0
    max: null  # UNRESOLVED: max volume not stated in source
    description: "Audio volume level"

  - id: power_state
    type: enum
    values:
      - "off"
      - "on"
    description: "Power status"

  - id: audio_mute
    type: enum
    values:
      - "off"
      - "on"
    description: "Audio mute state"

  - id: picture_mute
    type: enum
    values:
      - "off"
      - "on"
    description: "Picture mute state"

  - id: input_source
    type: string
    description: "Active input source"

  - id: scene_setting
    type: string
    description: "Active scene setting"
```

## Events

```yaml
events:
  - id: fire_power_change
    fourcc: POWR
    message_type: N
    description: "Unsolicited notify when power state changes. Param 0000000000000000 = powering off, 0000000000000001 = powering on."
    payload:
      - name: state
        type: enum
        values:
          - "off"
          - "on"

  - id: fire_input_change
    fourcc: INPT
    message_type: N
    description: "Unsolicited notify when input changes."
    payload:
      - name: input_type
        type: enum
        values:
          - hdmi
          - composite
          - component
          - screen_mirroring
      - name: port
        type: integer

  - id: fire_volume_change
    fourcc: VOLU
    message_type: N
    description: "Unsolicited notify when volume level changes."
    payload:
      - name: volume
        type: integer

  - id: fire_mute_change
    fourcc: AMUT
    message_type: N
    description: "Unsolicited notify when mute state changes. Param 0000000000000000 = unmuting, 0000000000000001 = muting."
    payload:
      - name: state
        type: enum
        values:
          - "off"
          - "on"

  - id: fire_picture_mute_change
    fourcc: PMUT
    message_type: N
    description: "Unsolicited notify when picture mute state changes. Param 0000000000000000 = enabled, 0000000000000001 = disabled."
    payload:
      - name: state
        type: enum
        values:
          - "on"
          - "off"
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

- EU area models have 3 specifications based on RED-DA compliance; settings and available commands differ.
- Simple IP Control must be enabled on the display via Settings → Network & Internet → Home network → IP control → Simple IP control.
- Remote device control must also be enabled via Settings → Network & Internet → Remote device settings → Control remotely.
- Scene setting parameter strings are case-sensitive and right-padded with `#` to fill 16 bytes.
- Volume parameter is zero-padded decimal in 16-byte field (e.g. `0000000000000029` for volume 29).
- Answer messages return all zeros (0000000000000000) for success, all Fs (FFFFFFFFFFFFFFFF) for error, or all Ns (NNNNNNNNNNNNNNNN) for not found/not available.
- IR commands are sent via the `setIrccCode` action with specific parameter codes; 44 distinct IR codes supported.

<!-- UNRESOLVED: maximum volume level not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: connection limits / concurrent client count not stated in source -->
<!-- UNRESOLVED: command rate limits or timing constraints not stated in source -->
<!-- UNRESOLVED: keep-alive or connection timeout behavior not stated in source -->

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
last_checked_at: 2026-05-31T22:30:33.049Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:30:33.049Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched FourCC codes and message types in the source; transport parameters verified; full command coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
