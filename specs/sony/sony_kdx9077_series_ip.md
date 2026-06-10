---
spec_id: admin/sony-kdx9077-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX9077 Series Control Spec"
manufacturer: Sony
model_family: "KDX9077 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX9077 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-08T16:41:03.314Z
last_checked_at: 2026-06-10T07:35:28.161Z
generated_at: 2026-06-10T07:35:28.161Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU area models have 3 RED-DA compliance variants with differing available commands. Source defers to external URL."
  - "source does not document multi-step sequences."
  - "source does not document safety warnings, interlocks, or power-on sequencing."
  - "firmware version compatibility not stated in source."
  - "voltage/current/power specifications not in scope of this IP control document."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:35:28.161Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions matched exactly with source commands; transport (TCP port 20060) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX9077 Series Control Spec

## Summary
Sony BRAVIA Professional Displays KDX9077 Series Simple IP Control protocol. 24-byte fixed-size TCP messages on port 20060. Source covers power, volume, mute, input, picture mute, scene, IR passthrough, plus device address queries and unsolicited event notifications.

<!-- UNRESOLVED: EU area models have 3 RED-DA compliance variants with differing available commands. Source defers to external URL. -->

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
- powerable       # inferred from setPowerStatus / getPowerStatus / togglePowerStatus
- queryable       # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- routable        # inferred from setInput / getInput
- levelable       # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
# All actions use 24-byte fixed-size Simple IP Control frames.
# Frame layout: 0x2A 0x53 [type] [cmd4cc ASCII] [16-byte params] 0x0A
# Type bytes: C=Control, E=Enquiry, A=Answer (monitor→client), N=Notify (monitor→client)

- id: set_ircc_code
  label: Send IR Remote Code (setIrccCode)
  kind: action
  command: "*SCCIRCC{ir_param}\n"
  params:
    - name: ir_param
      type: string
      description: 16 ASCII digit parameter from IR Commands table (e.g. "0000000000000005" for Display, "0000000000000030" for Volume Up). Pad on left with "0".

- id: set_power_status
  label: Set Power Status (setPowerStatus)
  kind: action
  command: "*SCPOWR000000000000000{state}\n"
  params:
    - name: state
      type: integer
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status (getPowerStatus)
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status (togglePowerStatus)
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume (setAudioVolume)
  kind: action
  command: "*SCVOLU{volume:016d}\n"
  params:
    - name: volume
      type: integer
      description: Volume value 0-100, decimal, left-padded with "0" to 16 digits (e.g. 41 = "0000000000000029")

- id: get_audio_volume
  label: Get Audio Volume (getAudioVolume)
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute (setAudioMute)
  kind: action
  command: "*SCAMUT000000000000000{mute}\n"
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute (getAudioMute)
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI (setInput, HDMI)
  kind: action
  command: "*SCINPT0000000000010000XXXX\n"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999, decimal, left-padded with "0" to fill last 4 bytes (e.g. HDMI 1 → "0001")

- id: set_input_composite
  label: Set Input to Composite (setInput, Composite)
  kind: action
  command: "*SCINPT0000000000030000XXXX\n"
  params:
    - name: port
      type: integer
      description: Composite port number 1-9999, decimal, left-padded with "0" to fill last 4 bytes

- id: set_input_component
  label: Set Input to Component (setInput, Component)
  kind: action
  command: "*SCINPT0000000000040000XXXX\n"
  params:
    - name: port
      type: integer
      description: Component port number 1-9999, decimal, left-padded with "0" to fill last 4 bytes

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (setInput, Screen Mirroring)
  kind: action
  command: "*SCINPT0000000000050000XXXX\n"
  params:
    - name: port
      type: integer
      description: Screen Mirroring port number 1-9999, decimal, left-padded with "0" to fill last 4 bytes

- id: get_input
  label: Get Current Input (getInput)
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute (setPictureMute)
  kind: action
  command: "*SCPMUT000000000000000{state}\n"
  params:
    - name: state
      type: integer
      description: 0 = Disable (picture on), 1 = Enable (screen black)

- id: get_picture_mute
  label: Get Picture Mute (getPictureMute)
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute (togglePictureMute)
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_scene_setting
  label: Set Scene Setting (setSceneSetting)
  kind: action
  command: "*SCSCEN{scene_padded}\n"
  params:
    - name: scene
      type: string
      description: One of "auto", "auto24pSync", "general". Case-sensitive, pad on right with "#" to 16 chars (e.g. "auto24pSync#####")

- id: get_scene_setting
  label: Get Scene Setting (getSceneSetting)
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (getBroadcastAddress)
  kind: query
  command: "*SEBADREth0##########\n"
  params: []

- id: get_mac_address
  label: Get MAC Address (getMacAddress)
  kind: query
  command: "*SEMADREth0##########\n"
  params: []
```

## Feedbacks
```yaml
# Each Answer (A) frame is 24 bytes: 0x2A 0x53 0x41 [cmd4cc] [16-byte params] 0x0A
# Generic success: 16 ASCII "0" bytes; generic error: 16 ASCII "F" bytes

- id: power_state
  type: enum
  values:
    - standby
    - active
  # Encoded in answer body to setPowerStatus / getPowerStatus: trailing byte "0"=off, "1"=on
  # Also delivered unsolicited via firePowerChange (Notify)

- id: audio_volume
  type: integer
  # Encoded in answer body to setAudioVolume / getAudioVolume: 16 decimal digits
  # Also delivered unsolicited via fireVolumeChange (Notify)

- id: audio_mute
  type: enum
  values:
    - unmuted
    - muted
  # Encoded in answer body to setAudioMute / getAudioMute: trailing byte "0"=unmuted, "1"=muted
  # Also delivered unsolicited via fireMuteChange (Notify)

- id: current_input
  type: enum
  values:
    - hdmi
    - composite
    - component
    - screen_mirroring
  # Encoded in answer body to setInput / getInput: byte[10]="0"/"3"/"4"/"5" = input family; bytes[18-21] = port number (decimal)
  # Also delivered unsolicited via fireInputChange (Notify)

- id: picture_mute
  type: enum
  values:
    - disabled
    - enabled
  # Encoded in answer body to setPictureMute / getPictureMute: trailing byte "0"=disabled, "1"=enabled
  # Also delivered unsolicited via firePictureMuteChange (Notify)

- id: scene_setting
  type: string
  # Encoded in answer body to setSceneSetting / getSceneSetting: 16 ASCII chars, right-padded with "#"
  # Values: "auto", "auto24pSync", "general" (case-sensitive)
  # "N..." answer body = not available for current input

- id: broadcast_address
  type: string
  # Encoded in answer body to getBroadcastAddress: IPv4 address left-justified in 16 bytes, right-padded with "#"
  # Example from source: "192.168.0.14####"

- id: mac_address
  type: string
  # Encoded in answer body to getMacAddress: MAC left-justified in 16 bytes, right-padded with "#"
  # Example from source: "XXXXXXXXXXXXXXXX" (12 hex digits, padded to 16 with "#")
```

## Variables
```yaml
# IR code parameter table (16-digit values for setIrccCode).
# Each value goes into the 16-byte params field right-justified, left-padded with "0".

- id: ir_display
  label: IR Display
  type: enum_value
  value: "0000000000000005"

- id: ir_home
  label: IR Home
  type: enum_value
  value: "0000000000000006"

- id: ir_options
  label: IR Options
  type: enum_value
  value: "0000000000000007"

- id: ir_return
  label: IR Return
  type: enum_value
  value: "0000000000000008"

- id: ir_up
  label: IR Up
  type: enum_value
  value: "0000000000000009"

- id: ir_down
  label: IR Down
  type: enum_value
  value: "0000000000000010"

- id: ir_right
  label: IR Right
  type: enum_value
  value: "0000000000000011"

- id: ir_left
  label: IR Left
  type: enum_value
  value: "0000000000000012"

- id: ir_confirm
  label: IR Confirm
  type: enum_value
  value: "0000000000000013"

- id: ir_red
  label: IR Red
  type: enum_value
  value: "0000000000000014"

- id: ir_green
  label: IR Green
  type: enum_value
  value: "0000000000000015"

- id: ir_yellow
  label: IR Yellow
  type: enum_value
  value: "0000000000000016"

- id: ir_blue
  label: IR Blue
  type: enum_value
  value: "0000000000000017"

- id: ir_num1
  label: IR Num 1
  type: enum_value
  value: "0000000000000018"

- id: ir_num2
  label: IR Num 2
  type: enum_value
  value: "0000000000000019"

- id: ir_num3
  label: IR Num 3
  type: enum_value
  value: "0000000000000020"

- id: ir_num4
  label: IR Num 4
  type: enum_value
  value: "0000000000000021"

- id: ir_num5
  label: IR Num 5
  type: enum_value
  value: "0000000000000022"

- id: ir_num6
  label: IR Num 6
  type: enum_value
  value: "0000000000000023"

- id: ir_num7
  label: IR Num 7
  type: enum_value
  value: "0000000000000024"

- id: ir_num8
  label: IR Num 8
  type: enum_value
  value: "0000000000000025"

- id: ir_num9
  label: IR Num 9
  type: enum_value
  value: "0000000000000026"

- id: ir_num0
  label: IR Num 0
  type: enum_value
  value: "0000000000000027"

- id: ir_volume_up
  label: IR Volume Up
  type: enum_value
  value: "0000000000000030"

- id: ir_volume_down
  label: IR Volume Down
  type: enum_value
  value: "0000000000000031"

- id: ir_mute
  label: IR Mute
  type: enum_value
  value: "0000000000000032"

- id: ir_channel_up
  label: IR Channel Up
  type: enum_value
  value: "0000000000000033"

- id: ir_channel_down
  label: IR Channel Down
  type: enum_value
  value: "0000000000000034"

- id: ir_subtitle
  label: IR Subtitle
  type: enum_value
  value: "0000000000000035"

- id: ir_dot
  label: IR DOT
  type: enum_value
  value: "0000000000000038"

- id: ir_picture_off
  label: IR Picture Off
  type: enum_value
  value: "0000000000000050"

- id: ir_wide
  label: IR Wide
  type: enum_value
  value: "0000000000000061"

- id: ir_jump
  label: IR Jump
  type: enum_value
  value: "0000000000000062"

- id: ir_sync_menu
  label: IR Sync Menu
  type: enum_value
  value: "0000000000000076"

- id: ir_forward
  label: IR Forward
  type: enum_value
  value: "0000000000000077"

- id: ir_play
  label: IR Play
  type: enum_value
  value: "0000000000000078"

- id: ir_rewind
  label: IR Rewind
  type: enum_value
  value: "0000000000000079"

- id: ir_prev
  label: IR Prev
  type: enum_value
  value: "0000000000000080"

- id: ir_stop
  label: IR Stop
  type: enum_value
  value: "0000000000000081"

- id: ir_next
  label: IR Next
  type: enum_value
  value: "0000000000000082"

- id: ir_pause
  label: IR Pause
  type: enum_value
  value: "0000000000000084"

- id: ir_flash_plus
  label: IR Flash Plus
  type: enum_value
  value: "0000000000000086"

- id: ir_flash_minus
  label: IR Flash Minus
  type: enum_value
  value: "0000000000000087"

- id: ir_tv_power
  label: IR TV Power
  type: enum_value
  value: "0000000000000098"

- id: ir_audio
  label: IR Audio
  type: enum_value
  value: "0000000000000099"

- id: ir_input
  label: IR Input
  type: enum_value
  value: "0000000000000101"

- id: ir_sleep
  label: IR Sleep
  type: enum_value
  value: "0000000000000104"

- id: ir_sleep_timer
  label: IR Sleep Timer
  type: enum_value
  value: "0000000000000105"

- id: ir_video2
  label: IR Video 2
  type: enum_value
  value: "0000000000000108"

- id: ir_picture_mode
  label: IR Picture Mode
  type: enum_value
  value: "0000000000000110"

- id: ir_demo_surround
  label: IR Demo Surround
  type: enum_value
  value: "0000000000000121"

- id: ir_hdmi1
  label: IR HDMI 1
  type: enum_value
  value: "0000000000000124"

- id: ir_hdmi2
  label: IR HDMI 2
  type: enum_value
  value: "0000000000000125"

- id: ir_hdmi3
  label: IR HDMI 3
  type: enum_value
  value: "0000000000000126"

- id: ir_hdmi4
  label: IR HDMI 4
  type: enum_value
  value: "0000000000000127"

- id: ir_action_menu
  label: IR Action Menu
  type: enum_value
  value: "0000000000000129"

- id: ir_help
  label: IR Help
  type: enum_value
  value: "0000000000000130"
```

## Events
```yaml
# All events are 24-byte Notify frames: 0x2A 0x53 0x4E [cmd4cc] [16-byte params] 0x0A

- id: fire_power_change
  label: Power Status Changed (firePowerChange)
  frame: "*SNPOWR000000000000000{state}\n"
  payload:
    - name: state
      type: integer
      description: 0 = powering off, 1 = powering on

- id: fire_input_change
  label: Input Changed (fireInputChange)
  frame: "*SNINPT00000000000{family}000XXXX\n"
  payload:
    - name: family
      type: integer
      description: 0 = generic input change; 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number 1-9999, decimal, left-padded with "0" to 4 bytes (omitted when family=0)

- id: fire_volume_change
  label: Audio Volume Changed (fireVolumeChange)
  frame: "*SNVOLU{volume:016d}\n"
  payload:
    - name: volume
      type: integer
      description: New volume value 0-100, decimal, left-padded with "0" to 16 digits

- id: fire_mute_change
  label: Audio Mute Changed (fireMuteChange)
  frame: "*SNAMUT000000000000000{state}\n"
  payload:
    - name: state
      type: integer
      description: 0 = unmuted, 1 = muted

- id: fire_picture_mute_change
  label: Picture Mute Changed (firePictureMuteChange)
  frame: "*SNPMUT000000000000000{state}\n"
  payload:
    - name: state
      type: integer
      description: 0 = picture mute enabled, 1 = picture mute disabled
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
```

## Notes
All commands and events are 24-byte fixed frames. Layout: header `0x2A 0x53` (2 bytes), type byte (1: `0x43` Control, `0x45` Enquiry, `0x41` Answer, `0x4E` Notify), FourCC command (4 ASCII), 16-byte parameter field, footer `0x0A` (LF). Every control/enquiry must be answered; success = 16 ASCII `0`, error = 16 ASCII `F`. Each command must wait for its answer before the next is sent. `setInput` may return an `N...` body when the requested input is not found.

Reference ASCII dump in source: `*SCPOWR0000000000000000` (power off control) and `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (accept + current-state notify).

`scene` parameter strings are case-sensitive and right-padded with `#` to 16 chars (e.g. `auto24pSync#####`). `ir_*` parameter values are decimal numbers right-justified and left-padded with `0` to 16 chars.

Network interface name in `getBroadcastAddress` / `getMacAddress` is hard-coded as `eth0`; alternate interfaces are not enumerated in source.

EU area models ship in 3 RED-DA compliance variants; command availability differs per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for the per-variant matrix.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: voltage/current/power specifications not in scope of this IP control document. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net
retrieved_at: 2026-06-08T16:41:03.314Z
last_checked_at: 2026-06-10T07:35:28.161Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:35:28.161Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions matched exactly with source commands; transport (TCP port 20060) verified; complete bidirectional coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU area models have 3 RED-DA compliance variants with differing available commands. Source defers to external URL."
- "source does not document multi-step sequences."
- "source does not document safety warnings, interlocks, or power-on sequencing."
- "firmware version compatibility not stated in source."
- "voltage/current/power specifications not in scope of this IP control document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
