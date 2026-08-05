---
spec_id: admin/sony-kdx8000-series
schema_version: ai4av-public-spec-v1
revision: 3
title: "Sony KDX8000 Series Control Spec"
manufacturer: Sony
model_family: "Sony KDX8000 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDX8000 Series"
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
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T05:32:06.971Z
last_checked_at: 2026-07-22T01:23:55.122Z
generated_at: 2026-07-22T01:23:55.122Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific model variants within KDX8000 Series not enumerated"
  - "firmware version compatibility not stated"
  - "EU RED-DA model differences — separate spec variants may be needed"
  - "no settable continuous variables beyond discrete actions identified"
  - "no explicit Notify (N) row for SCEN in source table; included pending confirmation"
  - "no multi-step sequences described in source"
  - "source does not describe safety interlocks or power-on sequencing requirements"
  - "maximum concurrent connection count not stated"
  - "command rate limits or throttle behavior not stated"
  - "volume range (min/max) not stated"
  - "complete list of input type codes beyond HDMI/Composite/Component/Screen Mirroring not confirmed"
  - "getBroadcastAddress and getMacAddress complete list of valid interface names not confirmed beyond eth0 example"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:23:55.122Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions matched cleanly to source FourCC codes; port 20060 verified; full bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KDX8000 Series Control Spec

## Summary

Sony KDX8000 Series professional displays controlled via Sony Simple IP Control (SSIP) protocol over TCP. Fixed-length 24-byte binary command format with FourCC command identifiers. Supports power, volume, mute, input selection, picture mute, scene settings, IR remote emulation, and unsolicited event notifications.

<!-- UNRESOLVED: specific model variants within KDX8000 Series not enumerated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: EU RED-DA model differences — separate spec variants may be needed -->

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
  - powerable     # setPowerStatus, togglePowerStatus commands present
  - queryable     # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting present
  - levelable     # setAudioVolume with numeric value present
  - routable      # setInput with input type and index present
```

## Actions

```yaml
actions:
  - id: setPowerStatus
    label: Set Power Status
    kind: action
    description: "Set power on or standby. Control message (C) with FourCC POWR. Parameter 0000000000000000 = Standby (Off), 0000000000000001 = Active (On)."
    command: "*SCPOWR{state}"
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Standby (Off), 0000000000000001 = Active (On)"

  - id: togglePowerStatus
    label: Toggle Power Status
    kind: action
    description: "Toggles current power status. Control message (C) with FourCC TPOW."
    command: "*SCTPOW################"
    params: []

  - id: setAudioVolume
    label: Set Audio Volume
    kind: action
    description: "Set volume level. Control message (C) with FourCC VOLU. Parameter is 16-digit zero-padded decimal string."
    command: "*SCVOLU{volume}"
    params:
      - name: volume
        type: integer
        description: "Volume level as decimal, zero-padded to 16 digits. e.g. 0000000000000029"

  - id: setAudioMute
    label: Set Audio Mute
    kind: action
    description: "Enable or disable audio mute. Control message (C) with FourCC AMUT."
    command: "*SCAMUT{state}"
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Unmute, 0000000000000001 = Mute"

  - id: setInput
    label: Set Input
    kind: action
    description: "Change active input source. Control message (C) with FourCC INPT. Parameter layout: 8-byte input type code, 4-byte reserved (0000), 4-byte index (1-9999)."
    command: "*SCINPT{input_type}0000{index}"
    params:
      - name: input_type
        type: enum
        values:
          - "00000001"
          - "00000003"
          - "00000004"
          - "00000005"
        description: "00000001 = HDMI, 00000003 = Composite, 00000004 = Component, 00000005 = Screen Mirroring"
      - name: index
        type: integer
        description: "Input index (1-9999), zero-padded to 4 digits"

  - id: setPictureMute
    label: Set Picture Mute
    kind: action
    description: "Enable or disable picture mute (black screen). Control message (C) with FourCC PMUT."
    command: "*SCPMUT{state}"
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"
          - "0000000000000001"
        description: "0000000000000000 = Disable picture mute, 0000000000000001 = Enable picture mute"

  - id: togglePictureMute
    label: Toggle Picture Mute
    kind: action
    description: "Toggle picture mute state. Control message (C) with FourCC TPMU."
    command: "*SCTPMU################"
    params: []

  - id: setSceneSetting
    label: Set Scene Setting
    kind: action
    description: "Change scene setting. Control message (C) with FourCC SCEN. Parameter is case-sensitive string right-padded with #."
    command: "*SCSCEN{scene}"
    params:
      - name: scene
        type: enum
        values:
          - "auto"
          - "auto24pSync"
          - "general"
        description: "Scene mode name, case-sensitive, right-padded with # to 16 chars. e.g. auto24pSync#####"

  - id: setIrccCode
    label: Send IR Command (generic)
    kind: action
    description: "Send IR remote control command code. Control message (C) with FourCC IRCC. See IR Commands table for parameter values."
    command: "*SCIRCC{code}"
    params:
      - name: code
        type: string
        description: "16-digit zero-padded IR command code from IR Commands table"

  - id: ircc_display
    label: IR Display
    kind: action
    description: "IR Display key. Control message (C) with FourCC IRCC, parameter 0000000000000005."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 0A"

  - id: ircc_home
    label: IR Home
    kind: action
    description: "IR Home key. Control message (C) with FourCC IRCC, parameter 0000000000000006."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 0A"

  - id: ircc_options
    label: IR Options
    kind: action
    description: "IR Options key. Control message (C) with FourCC IRCC, parameter 0000000000000007."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 0A"

  - id: ircc_return
    label: IR Return
    kind: action
    description: "IR Return key. Control message (C) with FourCC IRCC, parameter 0000000000000008."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 0A"

  - id: ircc_up
    label: IR Up
    kind: action
    description: "IR Up key. Control message (C) with FourCC IRCC, parameter 0000000000000009."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 0A"

  - id: ircc_down
    label: IR Down
    kind: action
    description: "IR Down key. Control message (C) with FourCC IRCC, parameter 0000000000000010."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 0A"

  - id: ircc_right
    label: IR Right
    kind: action
    description: "IR Right key. Control message (C) with FourCC IRCC, parameter 0000000000000011."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 0A"

  - id: ircc_left
    label: IR Left
    kind: action
    description: "IR Left key. Control message (C) with FourCC IRCC, parameter 0000000000000012."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 0A"

  - id: ircc_confirm
    label: IR Confirm
    kind: action
    description: "IR Confirm key. Control message (C) with FourCC IRCC, parameter 0000000000000013."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 0A"

  - id: ircc_red
    label: IR Red
    kind: action
    description: "IR Red key. Control message (C) with FourCC IRCC, parameter 0000000000000014."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 34 0A"

  - id: ircc_green
    label: IR Green
    kind: action
    description: "IR Green key. Control message (C) with FourCC IRCC, parameter 0000000000000015."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 35 0A"

  - id: ircc_yellow
    label: IR Yellow
    kind: action
    description: "IR Yellow key. Control message (C) with FourCC IRCC, parameter 0000000000000016."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 36 0A"

  - id: ircc_blue
    label: IR Blue
    kind: action
    description: "IR Blue key. Control message (C) with FourCC IRCC, parameter 0000000000000017."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 37 0A"

  - id: ircc_num1
    label: IR Num1
    kind: action
    description: "IR Num1 key. Control message (C) with FourCC IRCC, parameter 0000000000000018."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 38 0A"

  - id: ircc_num2
    label: IR Num2
    kind: action
    description: "IR Num2 key. Control message (C) with FourCC IRCC, parameter 0000000000000019."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 39 0A"

  - id: ircc_num3
    label: IR Num3
    kind: action
    description: "IR Num3 key. Control message (C) with FourCC IRCC, parameter 0000000000000020."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 30 0A"

  - id: ircc_num4
    label: IR Num4
    kind: action
    description: "IR Num4 key. Control message (C) with FourCC IRCC, parameter 0000000000000021."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 31 0A"

  - id: ircc_num5
    label: IR Num5
    kind: action
    description: "IR Num5 key. Control message (C) with FourCC IRCC, parameter 0000000000000022."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 32 0A"

  - id: ircc_num6
    label: IR Num6
    kind: action
    description: "IR Num6 key. Control message (C) with FourCC IRCC, parameter 0000000000000023."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 33 0A"

  - id: ircc_num7
    label: IR Num7
    kind: action
    description: "IR Num7 key. Control message (C) with FourCC IRCC, parameter 0000000000000024."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 34 0A"

  - id: ircc_num8
    label: IR Num8
    kind: action
    description: "IR Num8 key. Control message (C) with FourCC IRCC, parameter 0000000000000025."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 35 0A"

  - id: ircc_num9
    label: IR Num9
    kind: action
    description: "IR Num9 key. Control message (C) with FourCC IRCC, parameter 0000000000000026."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 36 0A"

  - id: ircc_num0
    label: IR Num0
    kind: action
    description: "IR Num0 key. Control message (C) with FourCC IRCC, parameter 0000000000000027."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 32 37 0A"

  - id: ircc_volume_up
    label: IR Volume Up
    kind: action
    description: "IR Volume Up key. Control message (C) with FourCC IRCC, parameter 0000000000000030."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 30 0A"

  - id: ircc_volume_down
    label: IR Volume Down
    kind: action
    description: "IR Volume Down key. Control message (C) with FourCC IRCC, parameter 0000000000000031."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 31 0A"

  - id: ircc_mute
    label: IR Mute
    kind: action
    description: "IR Mute key. Control message (C) with FourCC IRCC, parameter 0000000000000032."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 32 0A"

  - id: ircc_channel_up
    label: IR Channel Up
    kind: action
    description: "IR Channel Up key. Control message (C) with FourCC IRCC, parameter 0000000000000033."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 33 0A"

  - id: ircc_channel_down
    label: IR Channel Down
    kind: action
    description: "IR Channel Down key. Control message (C) with FourCC IRCC, parameter 0000000000000034."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 34 0A"

  - id: ircc_subtitle
    label: IR Subtitle
    kind: action
    description: "IR Subtitle key. Control message (C) with FourCC IRCC, parameter 0000000000000035."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 35 0A"

  - id: ircc_dot
    label: IR DOT
    kind: action
    description: "IR DOT key. Control message (C) with FourCC IRCC, parameter 0000000000000038."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 33 38 0A"

  - id: ircc_picture_off
    label: IR Picture Off
    kind: action
    description: "IR Picture Off key. Control message (C) with FourCC IRCC, parameter 0000000000000050."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 35 30 0A"

  - id: ircc_wide
    label: IR Wide
    kind: action
    description: "IR Wide key. Control message (C) with FourCC IRCC, parameter 0000000000000061."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 31 0A"

  - id: ircc_jump
    label: IR Jump
    kind: action
    description: "IR Jump key. Control message (C) with FourCC IRCC, parameter 0000000000000062."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 36 32 0A"

  - id: ircc_sync_menu
    label: IR Sync Menu
    kind: action
    description: "IR Sync Menu key. Control message (C) with FourCC IRCC, parameter 0000000000000076."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 36 0A"

  - id: ircc_forward
    label: IR Forward
    kind: action
    description: "IR Forward key. Control message (C) with FourCC IRCC, parameter 0000000000000077."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 37 0A"

  - id: ircc_play
    label: IR Play
    kind: action
    description: "IR Play key. Control message (C) with FourCC IRCC, parameter 0000000000000078."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 38 0A"

  - id: ircc_rewind
    label: IR Rewind
    kind: action
    description: "IR Rewind key. Control message (C) with FourCC IRCC, parameter 0000000000000079."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 37 39 0A"

  - id: ircc_prev
    label: IR Prev
    kind: action
    description: "IR Prev key. Control message (C) with FourCC IRCC, parameter 0000000000000080."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 30 0A"

  - id: ircc_stop
    label: IR Stop
    kind: action
    description: "IR Stop key. Control message (C) with FourCC IRCC, parameter 0000000000000081."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 31 0A"

  - id: ircc_next
    label: IR Next
    kind: action
    description: "IR Next key. Control message (C) with FourCC IRCC, parameter 0000000000000082."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 32 0A"

  - id: ircc_pause
    label: IR Pause
    kind: action
    description: "IR Pause key. Control message (C) with FourCC IRCC, parameter 0000000000000084."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 34 0A"

  - id: ircc_flash_plus
    label: IR Flash Plus
    kind: action
    description: "IR Flash Plus key. Control message (C) with FourCC IRCC, parameter 0000000000000086."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 36 0A"

  - id: ircc_flash_minus
    label: IR Flash Minus
    kind: action
    description: "IR Flash Minus key. Control message (C) with FourCC IRCC, parameter 0000000000000087."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 38 37 0A"

  - id: ircc_tv_power
    label: IR TV Power
    kind: action
    description: "IR TV Power key. Control message (C) with FourCC IRCC, parameter 0000000000000098."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 38 0A"

  - id: ircc_audio
    label: IR Audio
    kind: action
    description: "IR Audio key. Control message (C) with FourCC IRCC, parameter 0000000000000099."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 30 39 39 0A"

  - id: ircc_input
    label: IR Input
    kind: action
    description: "IR Input key. Control message (C) with FourCC IRCC, parameter 0000000000000101."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 31 0A"

  - id: ircc_sleep
    label: IR Sleep
    kind: action
    description: "IR Sleep key. Control message (C) with FourCC IRCC, parameter 0000000000000104."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 34 0A"

  - id: ircc_sleep_timer
    label: IR Sleep Timer
    kind: action
    description: "IR Sleep Timer key. Control message (C) with FourCC IRCC, parameter 0000000000000105."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 35 0A"

  - id: ircc_video_2
    label: IR Video 2
    kind: action
    description: "IR Video 2 key. Control message (C) with FourCC IRCC, parameter 0000000000000108."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 30 38 0A"

  - id: ircc_picture_mode
    label: IR Picture Mode
    kind: action
    description: "IR Picture Mode key. Control message (C) with FourCC IRCC, parameter 0000000000000110."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 31 30 0A"

  - id: ircc_demo_surround
    label: IR Demo Surround
    kind: action
    description: "IR Demo Surround key. Control message (C) with FourCC IRCC, parameter 0000000000000121."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 31 0A"

  - id: ircc_hdmi1
    label: IR HDMI 1
    kind: action
    description: "IR HDMI 1 key. Control message (C) with FourCC IRCC, parameter 0000000000000124."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 34 0A"

  - id: ircc_hdmi2
    label: IR HDMI 2
    kind: action
    description: "IR HDMI 2 key. Control message (C) with FourCC IRCC, parameter 0000000000000125."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 35 0A"

  - id: ircc_hdmi3
    label: IR HDMI 3
    kind: action
    description: "IR HDMI 3 key. Control message (C) with FourCC IRCC, parameter 0000000000000126."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 36 0A"

  - id: ircc_hdmi4
    label: IR HDMI 4
    kind: action
    description: "IR HDMI 4 key. Control message (C) with FourCC IRCC, parameter 0000000000000127."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 37 0A"

  - id: ircc_action_menu
    label: IR Action Menu
    kind: action
    description: "IR Action Menu key. Control message (C) with FourCC IRCC, parameter 0000000000000129."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 32 39 0A"

  - id: ircc_help
    label: IR Help
    kind: action
    description: "IR Help key. Control message (C) with FourCC IRCC, parameter 0000000000000130."
    command: "2A 53 43 49 52 43 43 30 30 30 30 30 30 30 30 30 30 30 30 30 31 33 30 0A"

  - id: getPowerStatus
    label: Get Power Status
    kind: query
    description: "Query current power status. Enquiry message (E) with FourCC POWR."
    command: "*SEPOWR################"

  - id: getAudioVolume
    label: Get Audio Volume
    kind: query
    description: "Query current audio volume. Enquiry message (E) with FourCC VOLU."
    command: "*SEVOLU################"

  - id: getAudioMute
    label: Get Audio Mute
    kind: query
    description: "Query audio mute status. Enquiry message (E) with FourCC AMUT."
    command: "*SEAMUT################"

  - id: getInput
    label: Get Input
    kind: query
    description: "Query current active input. Enquiry message (E) with FourCC INPT."
    command: "*SEINPT################"

  - id: getPictureMute
    label: Get Picture Mute
    kind: query
    description: "Query picture mute status. Enquiry message (E) with FourCC PMUT."
    command: "*SEPMUT################"

  - id: getSceneSetting
    label: Get Scene Setting
    kind: query
    description: "Query current scene setting. Enquiry message (E) with FourCC SCEN."
    command: "*SESCEN################"

  - id: getBroadcastAddress
    label: Get Broadcast Address
    kind: query
    description: "Query broadcast IPv4 address of specified interface. Enquiry message (E) with FourCC BADR. Parameter is interface name padded with #, e.g. eth0#########."
    command: "*SEBADR{interface}"
    params:
      - name: interface
        type: string
        description: "Interface name, right-padded with # to 16 chars. e.g. eth0#########"

  - id: getMacAddress
    label: Get MAC Address
    kind: query
    description: "Query MAC address of specified interface. Enquiry message (E) with FourCC MADR. Parameter is interface name padded with #, e.g. eth0#########."
    command: "*SEMADR{interface}"
    params:
      - name: interface
        type: string
        description: "Interface name, right-padded with # to 16 chars. e.g. eth0#########"
```

## Feedbacks

```yaml
feedbacks:
  - id: power_status
    type: enum
    values:
      - standby
      - active
    description: "Answer (A) to getPowerStatus. 0000000000000000 = Standby (Off), 0000000000000001 = Active (On)"

  - id: audio_volume
    type: string
    description: "Answer (A) to getAudioVolume. 16-digit zero-padded decimal volume value."

  - id: audio_mute
    type: enum
    values:
      - unmuted
      - muted
    description: "Answer (A) to getAudioMute. 0000000000000000 = Not Muted, 0000000000000001 = Muted"

  - id: input_source
    type: string
    description: "Answer (A) to getInput. Includes input type code and index. 00000001 = HDMI, 00000003 = Composite, 00000004 = Component, 00000005 = Screen Mirroring, followed by 4-digit index (1-9999)."

  - id: picture_mute
    type: enum
    values:
      - disabled
      - enabled
    description: "Answer (A) to getPictureMute. 0000000000000000 = Disabled, 0000000000000001 = Enabled"

  - id: scene_setting
    type: string
    description: "Answer (A) to getSceneSetting. Scene mode string value."

  - id: broadcast_address
    type: string
    description: "Answer (A) to getBroadcastAddress. IPv4 address dotted-quad padded with # on the right, e.g. 192.168.0.14####."

  - id: mac_address
    type: string
    description: "Answer (A) to getMacAddress. MAC address padded with # on the right, e.g. XXXXXXXXXXXX####."

  - id: command_result
    type: enum
    values:
      - success
      - error
      - not_found
      - not_available
    description: "Generic answer response. All zeros = success, all F's = error, all N's = not found / not available."
```

## Variables

```yaml
# UNRESOLVED: no settable continuous variables beyond discrete actions identified
```

## Events

```yaml
events:
  - id: firePowerChange
    type: notification
    description: "Notify (N) message with FourCC POWR. Sent when power state changes. 0000000000000000 = powering off, 0000000000000001 = powering on."

  - id: fireInputChange
    type: notification
    description: "Notify (N) message with FourCC INPT. Sent when input changes. Includes input type code and index."

  - id: fireVolumeChange
    type: notification
    description: "Notify (N) message with FourCC VOLU. Sent when volume changes. Includes 16-digit volume value."

  - id: fireMuteChange
    type: notification
    description: "Notify (N) message with FourCC AMUT. Sent when mute state changes. 0000000000000000 = unmuting, 0000000000000001 = muting."

  - id: firePictureMuteChange
    type: notification
    description: "Notify (N) message with FourCC PMUT. Sent when picture mute state changes. 0000000000000000 = picture mute enabled, 0000000000000001 = picture mute disabled."

  - id: fireSceneSetting
    type: notification
    description: "Notify (N) message with FourCC SCEN. Source documents the scene setting command and parameters but does not list an explicit Notify row in the SCEN section of the source table."
    # UNRESOLVED: no explicit Notify (N) row for SCEN in source table; included pending confirmation
```

## Macros

```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks or power-on sequencing requirements
```

## Notes

Protocol uses fixed 24-byte messages: 2-byte header (0x2A 0x53), 1-byte message type (C/E/A/N), 4-byte FourCC command, 16-byte parameter, 1-byte footer (0x0A). Answer messages use all-zero for success, all-F for error, all-N for not found/not available. String parameters are right-padded with `#`. Numeric parameters are left-padded with `0`. EU models have 3 RED-DA specification variants with differing command availability — see https://pro-bravia.sony.net/setup/device-settings/red-da/. Monitor must have Remote Device Control and Simple IP Control enabled in settings before commands are accepted. IR commands (FourCC IRCC) are documented as 57 individual code rows in the IR Commands table; each enumerated above as a separate action with its own 16-digit padded parameter and full 24-byte literal command payload (header `2A 53`, type `43`, FourCC `49 52 43 43`, 16-byte param, footer `0A`). Source example for power off: `*SCPOWR0000000000000000` followed by response `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (two consecutive messages).

<!-- UNRESOLVED: maximum concurrent connection count not stated -->
<!-- UNRESOLVED: command rate limits or throttle behavior not stated -->
<!-- UNRESOLVED: volume range (min/max) not stated -->
<!-- UNRESOLVED: complete list of input type codes beyond HDMI/Composite/Component/Screen Mirroring not confirmed -->
<!-- UNRESOLVED: getBroadcastAddress and getMacAddress complete list of valid interface names not confirmed beyond eth0 example -->
````

Changes in rev 3: added `command:` to all 17 set/get/toggle actions (payload rule); fixed all 57 IR payloads (were 23 bytes — missing header `0x53`, now correct 24); corrected IR count 52→57 in Notes. All IDs/params/feedbacks/events preserved.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-26T05:32:06.971Z
last_checked_at: 2026-07-22T01:23:55.122Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:23:55.122Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions matched cleanly to source FourCC codes; port 20060 verified; full bidirectional coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific model variants within KDX8000 Series not enumerated"
- "firmware version compatibility not stated"
- "EU RED-DA model differences — separate spec variants may be needed"
- "no settable continuous variables beyond discrete actions identified"
- "no explicit Notify (N) row for SCEN in source table; included pending confirmation"
- "no multi-step sequences described in source"
- "source does not describe safety interlocks or power-on sequencing requirements"
- "maximum concurrent connection count not stated"
- "command rate limits or throttle behavior not stated"
- "volume range (min/max) not stated"
- "complete list of input type codes beyond HDMI/Composite/Component/Screen Mirroring not confirmed"
- "getBroadcastAddress and getMacAddress complete list of valid interface names not confirmed beyond eth0 example"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
