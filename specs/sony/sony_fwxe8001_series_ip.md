---
spec_id: admin/sony-fwxe8001-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWXE8001 Series Control Spec"
manufacturer: Sony
model_family: FW-43XE8001
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - FW-43XE8001
    - FW-49XE8001
    - FW-55XE8001
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T19:01:23.248Z
last_checked_at: 2026-10-07T11:04:20.118Z
generated_at: 2026-10-07T11:04:20.118Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model list within series not fully enumerated in source; source references \"BRAVIA Professional Displays\" generically"
  - "firmware version compatibility not stated"
  - "EU-area RED-DA model variants may have different commands; details linked but not included in source"
  - "max volume value not stated in source"
  - "no multi-step sequences described in source"
  - "source does not describe safety warnings, interlock procedures, or"
  - "max volume level not stated in source"
  - "complete list of supported models within FWXE8001 series not stated"
  - "EU RED-DA variant command differences not specified in source"
  - "connection limits, concurrent session behavior not stated"
  - "command rate limits or timing constraints not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T11:04:20.118Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 actions (22 core commands plus 57 IR codes) match the source and port 20060 is verified. Source events are covered by spec Events. Applicability is generic BRAVIA Pro. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony FWXE8001 Series Control Spec

## Summary

Sony BRAVIA Professional Displays in the FWXE8001 series (FW-43XE8001, FW-49XE8001, FW-55XE8001) support Simple IP Control (SSIP), a proprietary TCP-based protocol using fixed 24-byte messages. The control listening port is TCP 20060. This spec covers power, volume, mute, input selection, picture mute, scene setting, IR remote emulation, network address queries, and unsolicited event notifications.

<!-- UNRESOLVED: exact model list within series not fully enumerated in source; source references "BRAVIA Professional Displays" generically -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: EU-area RED-DA model variants may have different commands; details linked but not included in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: UNRESOLVED  # source does not state whether authentication is used
```

## Traits
```yaml
- powerable    # inferred from setPowerStatus / togglePowerStatus commands
- queryable    # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting
- routable     # inferred from setInput command with multiple input types
- levelable    # inferred from setAudioVolume command
```

## Actions

```yaml
# All commands use fixed 24-byte SSIP frames: header [*S] (0x2A 0x53), message-type byte,
# 4-char FourCC command, 16-byte parameter field, footer [LF] (0x0A).

- id: set_power_off
  label: Power Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000"
  description: "Set power status to Standby (Off). FourCC POWR, param 0000000000000000."
  params: []

- id: set_power_on
  label: Power On (Active)
  kind: action
  command: "*SCPOWR0000000000000001"
  description: "Set power status to Active (On). FourCC POWR, param 0000000000000001."
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  description: "Toggles current power status. FourCC TPOW."
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  description: "Enquire current power status. Returns 0=Standby(Off), 1=Active(On)."
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume:0>16}"
  description: "Set volume. Parameter is decimal volume value left-padded with zeros to 16 digits."
  params:
    - name: volume
      type: integer
      description: "Volume level (0-padded decimal, e.g. 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  description: "Retrieve current audio volume value."
  params: []

- id: set_audio_mute_off
  label: Audio Unmute
  kind: action
  command: "*SCAMUT0000000000000000"
  description: "Unmute audio. FourCC AMUT, param 0000000000000000."
  params: []

- id: set_audio_mute_on
  label: Audio Mute
  kind: action
  command: "*SCAMUT0000000000000001"
  description: "Mute audio. FourCC AMUT, param 0000000000000001."
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"
  description: "Retrieve audio mute status. Returns 0=Not Muted, 1=Muted."
  params: []

- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "*SCINPT000000010000XXXX"
  description: "Change input to HDMI. Port number (1-9999) in last 4 param bytes."
  params:
    - name: port
      type: integer
      description: "HDMI port number (1-9999)"

- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "*SCINPT000000030000XXXX"
  description: "Change input to Composite. Port number (1-9999) in last 4 param bytes."
  params:
    - name: port
      type: integer
      description: "Composite port number (1-9999)"

- id: set_input_component
  label: Set Input Component
  kind: action
  command: "*SCINPT000000040000XXXX"
  description: "Change input to Component. Port number (1-9999) in last 4 param bytes."
  params:
    - name: port
      type: integer
      description: "Component port number (1-9999)"

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "*SCINPT000000050000XXXX"
  description: "Change input to Screen Mirroring. Port number (1-9999) in last 4 param bytes."
  params:
    - name: port
      type: integer
      description: "Screen Mirroring port number (1-9999)"

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  description: "Retrieve current input source. Returns input type code + port number."
  params: []

- id: set_picture_mute_off
  label: Picture Mute Off
  kind: action
  command: "*SCPMUT0000000000000000"
  description: "Disable picture mute (restore video)."
  params: []

- id: set_picture_mute_on
  label: Picture Mute On
  kind: action
  command: "*SCPMUT0000000000000001"
  description: "Enable picture mute (black screen)."
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################"
  description: "Check if picture mute is enabled. Returns 0=Disabled, 1=Enabled."
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  description: "Toggles picture mute state. FourCC TPMU."
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene:pad16#}"
  description: "Change scene setting. Parameter string is case-sensitive, right-padded with '#'."
  params:
    - name: scene
      type: string
      description: "Scene mode - auto, auto24pSync, general (case-sensitive, padded with #)"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  description: "Retrieve current scene setting."
  params: []

- id: set_ircc_code_display
  label: IR Command - Display
  kind: action
  command: "*SCIRCC0000000000000005"
  description: "Send IR Display command via setIrccCode."
  params: []

- id: set_ircc_code_home
  label: IR Command - Home
  kind: action
  command: "*SCIRCC0000000000000006"
  description: "Send IR Home command via setIrccCode."
  params: []

- id: set_ircc_code_options
  label: IR Command - Options
  kind: action
  command: "*SCIRCC0000000000000007"
  description: "Send IR Options command via setIrccCode."
  params: []

- id: set_ircc_code_return
  label: IR Command - Return
  kind: action
  command: "*SCIRCC0000000000000008"
  description: "Send IR Return command via setIrccCode."
  params: []

- id: set_ircc_code_up
  label: IR Command - Up
  kind: action
  command: "*SCIRCC0000000000000009"
  description: "Send IR Up command via setIrccCode."
  params: []

- id: set_ircc_code_down
  label: IR Command - Down
  kind: action
  command: "*SCIRCC0000000000000010"
  description: "Send IR Down command via setIrccCode."
  params: []

- id: set_ircc_code_right
  label: IR Command - Right
  kind: action
  command: "*SCIRCC0000000000000011"
  description: "Send IR Right command via setIrccCode."
  params: []

- id: set_ircc_code_left
  label: IR Command - Left
  kind: action
  command: "*SCIRCC0000000000000012"
  description: "Send IR Left command via setIrccCode."
  params: []

- id: set_ircc_code_confirm
  label: IR Command - Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  description: "Send IR Confirm command via setIrccCode."
  params: []

- id: set_ircc_code_red
  label: IR Command - Red
  kind: action
  command: "*SCIRCC0000000000000014"
  description: "Send IR Red button command via setIrccCode."
  params: []

- id: set_ircc_code_green
  label: IR Command - Green
  kind: action
  command: "*SCIRCC0000000000000015"
  description: "Send IR Green button command via setIrccCode."
  params: []

- id: set_ircc_code_yellow
  label: IR Command - Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  description: "Send IR Yellow button command via setIrccCode."
  params: []

- id: set_ircc_code_blue
  label: IR Command - Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  description: "Send IR Blue button command via setIrccCode."
  params: []

- id: set_ircc_code_num1
  label: IR Command - Num1
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: set_ircc_code_num2
  label: IR Command - Num2
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: set_ircc_code_num3
  label: IR Command - Num3
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: set_ircc_code_num4
  label: IR Command - Num4
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: set_ircc_code_num5
  label: IR Command - Num5
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: set_ircc_code_num6
  label: IR Command - Num6
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: set_ircc_code_num7
  label: IR Command - Num7
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: set_ircc_code_num8
  label: IR Command - Num8
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: set_ircc_code_num9
  label: IR Command - Num9
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: set_ircc_code_num0
  label: IR Command - Num0
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: set_ircc_code_volume_up
  label: IR Command - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: set_ircc_code_volume_down
  label: IR Command - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: set_ircc_code_mute
  label: IR Command - Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: set_ircc_code_channel_up
  label: IR Command - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: set_ircc_code_channel_down
  label: IR Command - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: set_ircc_code_subtitle
  label: IR Command - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: set_ircc_code_dot
  label: IR Command - DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: set_ircc_code_picture_off
  label: IR Command - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: set_ircc_code_wide
  label: IR Command - Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: set_ircc_code_jump
  label: IR Command - Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: set_ircc_code_sync_menu
  label: IR Command - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: set_ircc_code_forward
  label: IR Command - Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: set_ircc_code_play
  label: IR Command - Play
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: set_ircc_code_rewind
  label: IR Command - Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: set_ircc_code_prev
  label: IR Command - Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: set_ircc_code_stop
  label: IR Command - Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: set_ircc_code_next
  label: IR Command - Next
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: set_ircc_code_pause
  label: IR Command - Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: set_ircc_code_flash_plus
  label: IR Command - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: set_ircc_code_flash_minus
  label: IR Command - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: set_ircc_code_tv_power
  label: IR Command - TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: set_ircc_code_audio
  label: IR Command - Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: set_ircc_code_input
  label: IR Command - Input
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: set_ircc_code_sleep
  label: IR Command - Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: set_ircc_code_sleep_timer
  label: IR Command - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: set_ircc_code_video2
  label: IR Command - Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: set_ircc_code_picture_mode
  label: IR Command - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: set_ircc_code_demo_surround
  label: IR Command - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: set_ircc_code_hdmi1
  label: IR Command - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: set_ircc_code_hdmi2
  label: IR Command - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: set_ircc_code_hdmi3
  label: IR Command - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: set_ircc_code_hdmi4
  label: IR Command - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: set_ircc_code_action_menu
  label: IR Command - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: set_ircc_code_help
  label: IR Command - Help
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"
  description: "Retrieve broadcast IPv4 address for specified interface. Interface param e.g. eth0."
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), padded with #"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  description: "Retrieve MAC address for specified interface. Interface param e.g. eth0."
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), padded with #"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "Power status from getPowerStatus answer. 0000000000000000=Off, 0000000000000001=On."

- id: audio_volume
  type: integer
  description: "Current volume level from getAudioVolume answer."

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Audio mute status from getAudioMute answer. 0000000000000000=Not Muted, 0000000000000001=Muted."

- id: input_source
  type: string
  description: "Current input source from getInput answer. Includes type code (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) plus port number."

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Picture mute status from getPictureMute answer. 0000000000000000=Disabled, 0000000000000001=Enabled."

- id: scene_setting
  type: string
  description: "Current scene setting from getSceneSetting answer."

- id: command_success
  type: enum
  values: [success, error]
  description: "Generic answer ACK. 0000000000000000=Success, FFFFFFFFFFFFFFFF=Error."
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  # UNRESOLVED: max volume value not stated in source
  description: "Audio volume level, set via setAudioVolume."

- id: input_type
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  description: "Current input type, set via setInput."

- id: scene_mode
  type: string
  description: "Scene setting mode - auto, auto24pSync, general."
```

## Events
```yaml
- id: power_change
  description: "Unsolicited notify (N-type) when power state changes. FourCC POWR."
  payload:
    type: enum
    values: [off, on]

- id: input_change
  description: "Unsolicited notify (N-type) when input changes. FourCC INPT."
  payload:
    type: string
    description: "Input type code + port (same format as setInput/getInput)."

- id: volume_change
  description: "Unsolicited notify (N-type) when volume changes. FourCC VOLU."
  payload:
    type: integer
    description: "New volume level."

- id: mute_change
  description: "Unsolicited notify (N-type) when mute state changes. FourCC AMUT."
  payload:
    type: enum
    values: [unmuted, muted]

- id: picture_mute_change
  description: "Unsolicited notify (N-type) when picture mute changes. FourCC PMUT."
  payload:
    type: enum
    values: [enabled, disabled]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes

- SSIP protocol uses fixed 24-byte frames: 2-byte header (`*S` = 0x2A 0x53), 1-byte message type (`C`=control, `E`=enquiry, `A`=answer, `N`=notify), 4-byte FourCC command, 16-byte parameter field, 1-byte footer (`LF` = 0x0A).
- Monitor must be on the same network (wired or wireless LAN). Remote Device Control and Simple IP Control must both be enabled in monitor settings.
- EU area models have 3 specification variants based on RED-DA compliance; settings and available commands differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.
- Answer messages: `0000000000000000` = success, `FFFFFFFFFFFFFFFF` = error. Some commands also return `NNNNNNNNNNNNNNNN` = "Not Found" or "Not available."
- IR commands use a single FourCC (IRCC) with the specific IR code in the parameter field. All IR commands are listed as separate actions per source row.
- Input type codes: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Port range 1-9999 per type.

<!-- UNRESOLVED: max volume level not stated in source -->
<!-- UNRESOLVED: complete list of supported models within FWXE8001 series not stated -->
<!-- UNRESOLVED: EU RED-DA variant command differences not specified in source -->
<!-- UNRESOLVED: connection limits, concurrent session behavior not stated -->
<!-- UNRESOLVED: command rate limits or timing constraints not stated -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T19:01:23.248Z
last_checked_at: 2026-10-07T11:04:20.118Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T11:04:20.118Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 actions (22 core commands plus 57 IR codes) match the source and port 20060 is verified. Source events are covered by spec Events. Applicability is generic BRAVIA Pro. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model list within series not fully enumerated in source; source references \"BRAVIA Professional Displays\" generically"
- "firmware version compatibility not stated"
- "EU-area RED-DA model variants may have different commands; details linked but not included in source"
- "max volume value not stated in source"
- "no multi-step sequences described in source"
- "source does not describe safety warnings, interlock procedures, or"
- "max volume level not stated in source"
- "complete list of supported models within FWXE8001 series not stated"
- "EU RED-DA variant command differences not specified in source"
- "connection limits, concurrent session behavior not stated"
- "command rate limits or timing constraints not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
