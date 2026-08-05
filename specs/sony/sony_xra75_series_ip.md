---
spec_id: admin/sony-xra75-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRA75 Series Control Spec"
manufacturer: Sony
model_family: "Sony XRA75 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XRA75 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison
retrieved_at: 2026-07-16T22:34:35.529Z
last_checked_at: 2026-07-22T01:28:10.640Z
generated_at: 2026-07-22T01:28:10.640Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU area models have 3 RED-DA-compliant spec variants; command availability differs per spec. Not enumerated in source."
  - "source does not document discrete settable parameters beyond the"
  - "source does not describe any multi-step sequences."
  - "source mentions RED-DA compliance differences for EU models (3 spec"
  - "firmware version compatibility not stated in source."
  - "EU RED-DA 3-variant spec differences not enumerated in source."
  - "auth credentials / pre-shared key not addressed; inferred none."
  - "volume min/max bounds not stated (only example \"29\"=41 given)."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:28:10.640Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions matched with exact wire-level literals in source; transport parameters (TCP 20060, no auth) verified; spec provides complete coverage of the source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony XRA75 Series Control Spec

## Summary
This spec covers the Sony XRA75 Series (BRAVIA Professional Displays) controlled via Sony's "Simple IP Control" protocol (SSIP) over TCP on the local network. The protocol uses a fixed 24-byte frame with a 4-character Four-CC command and a 16-byte parameter field. The control listening port is TCP 20060. Source: pro-bravia.sony.net "Simple IP control" page.

<!-- UNRESOLVED: EU area models have 3 RED-DA-compliant spec variants; command availability differs per spec. Not enumerated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes: "Requires monitor settings: [Settings]→[Network & Internet]→[Remote device settings]→[Control remotely] and [Settings]→[Network & Internet]→[Home network]→[IP control]→[Simple IP control]. Both wired and wireless LAN supported."
```

## Frame Format
```yaml
# Source: Data Format section. 24-byte fixed frame.
header:
  bytes: 2
  value: "0x2A 0x53 ('*S')"
message_type:
  byte_offset: 2
  values:
    - 0x43 'C'  # Control (Client -> Monitor)
    - 0x45 'E'  # Enquiry (Client -> Monitor)
    - 0x41 'A'  # Answer (Monitor -> Client)
    - 0x4E 'N'  # Notify (Monitor -> Client, unsolicited)
command:
  byte_offset: "3-6"
  format: "4 ASCII chars (Four-CC)"
parameters:
  byte_offset: "7-22"
  length_bytes: 16
footer:
  byte_offset: 23
  value: "0x0A (LF)"
# Common param patterns: '0'*16 = success, 'F'*16 = error, 'N'*16 = not-found, '#'*16 = no-param
```

## Traits
```yaml
- powerable       # inferred: setPowerStatus/togglePowerStatus present
- routable        # inferred: setInput/getInput present
- queryable       # inferred: get* enquiry commands present
- levelable       # inferred: setAudioVolume/getAudioVolume present
```

## Actions
```yaml
# Frame = header(2) + type(1) + command(4) + params(16) + footer(1) = 24 bytes.
# Header 0x2A 0x53, footer 0x0A are constant. Command field below = Four-CC.
# Param placeholders: {value} = ASCII left-padded with '0' to 16 bytes; {padded} = right-padded with '#'.
# IRCC param format: ASCII decimal code number, right-justified and zero-padded to fill 16 bytes.
#   e.g. Display (5)  = '0'*15 + '5'        -> "0000000000000005"
#        Down (10)    = '0'*14 + "10"       -> "0000000000000010"
#        HDMI 1 (124) = '0'*13 + "124"      -> "0000000000000124"
# For setInput: param bytes are class(1 ASCII digit, position [7] within param field) +
#   '0000'(4) + ASCII 4-digit input number (1-9999). Class codes: '1' HDMI, '3' Composite,
#   '4' Component, '5' Screen Mirroring.

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code16}"
  params:
    - name: code
      type: string
      description: IR code as 16 ASCII bytes - decimal code number right-justified and zero-padded (see IR Commands table)
  notes: "Header '*S' + type 'C' + Four-CC 'IRCC' + 16-byte param + footer LF."

- id: ircc_display
  label: IR - Display
  kind: action
  command: "*SCIRCC0000000000000005"
  params: []

- id: ircc_home
  label: IR - Home
  kind: action
  command: "*SCIRCC0000000000000006"
  params: []

- id: ircc_options
  label: IR - Options
  kind: action
  command: "*SCIRCC0000000000000007"
  params: []

- id: ircc_return
  label: IR - Return
  kind: action
  command: "*SCIRCC0000000000000008"
  params: []

- id: ircc_up
  label: IR - Up
  kind: action
  command: "*SCIRCC0000000000000009"
  params: []

- id: ircc_down
  label: IR - Down
  kind: action
  command: "*SCIRCC0000000000000010"
  params: []

- id: ircc_right
  label: IR - Right
  kind: action
  command: "*SCIRCC0000000000000011"
  params: []

- id: ircc_left
  label: IR - Left
  kind: action
  command: "*SCIRCC0000000000000012"
  params: []

- id: ircc_confirm
  label: IR - Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  params: []

- id: ircc_red
  label: IR - Red
  kind: action
  command: "*SCIRCC0000000000000014"
  params: []

- id: ircc_green
  label: IR - Green
  kind: action
  command: "*SCIRCC0000000000000015"
  params: []

- id: ircc_yellow
  label: IR - Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  params: []

- id: ircc_blue
  label: IR - Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  params: []

- id: ircc_num1
  label: IR - Num 1
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: ircc_num2
  label: IR - Num 2
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: ircc_num3
  label: IR - Num 3
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: ircc_num4
  label: IR - Num 4
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: ircc_num5
  label: IR - Num 5
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: ircc_num6
  label: IR - Num 6
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: ircc_num7
  label: IR - Num 7
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: ircc_num8
  label: IR - Num 8
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: ircc_num9
  label: IR - Num 9
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: ircc_num0
  label: IR - Num 0
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: ircc_volume_up
  label: IR - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: ircc_volume_down
  label: IR - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: ircc_mute
  label: IR - Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: ircc_channel_up
  label: IR - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: ircc_channel_down
  label: IR - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: ircc_subtitle
  label: IR - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: ircc_dot
  label: IR - DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: ircc_picture_off
  label: IR - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: ircc_wide
  label: IR - Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: ircc_jump
  label: IR - Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: ircc_sync_menu
  label: IR - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: ircc_forward
  label: IR - Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: ircc_play
  label: IR - Play
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: ircc_rewind
  label: IR - Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: ircc_prev
  label: IR - Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: ircc_stop
  label: IR - Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: ircc_next
  label: IR - Next
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: ircc_pause
  label: IR - Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: ircc_flash_plus
  label: IR - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: ircc_flash_minus
  label: IR - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: ircc_tv_power
  label: IR - TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: ircc_audio
  label: IR - Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: ircc_input
  label: IR - Input
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: ircc_sleep
  label: IR - Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: ircc_sleep_timer
  label: IR - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: ircc_video_2
  label: IR - Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: ircc_picture_mode
  label: IR - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: ircc_demo_surround
  label: IR - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: ircc_hdmi1
  label: IR - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: ircc_hdmi2
  label: IR - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: ircc_hdmi3
  label: IR - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: ircc_hdmi4
  label: IR - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: ircc_action_menu
  label: IR - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: ircc_help
  label: IR - Help
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []

- id: set_power_off
  label: Set Power - Standby
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []
  notes: "Source netcat example shows monitor replies with BOTH an Answer and a Notify: '*SAPOWR0000000000000000 *SNPOWR0000000000000000' (accept + current-state-off)."

- id: set_power_on
  label: Set Power - Active
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: toggle_power_status
  label: Toggle Power
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{value16}"
  params:
    - name: value
      type: integer
      description: Volume value (decimal, left-padded with '0' to 16 ASCII chars; e.g. 41 -> "0000000000000029")
  notes: "Source example: 0000000000000029 = decimal 41. Source does not state min/max."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []
  notes: "Source answer for success carries the volume value as 'X'*16 (decimal ASCII left-padded '0')."

- id: set_audio_mute_off
  label: Set Audio Mute - Unmute
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: set_audio_mute_on
  label: Set Audio Mute - Mute
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input_hdmi
  label: Set Input - HDMI
  kind: action
  command: "*SCINPT000000010000{number4}"
  params:
    - name: number
      type: integer
      description: HDMI input number (1-9999, ASCII right-justified in 4 bytes)
  notes: "Param layout (16 bytes): '0000000' + class digit '1' + '0000' + ASCII 4-digit number. Answer 'N'*16 = Not Found."

- id: set_input_composite
  label: Set Input - Composite
  kind: action
  command: "*SCINPT000000030000{number4}"
  params:
    - name: number
      type: integer
      description: Composite input number (1-9999)
  notes: "Class digit '3'. Answer 'N'*16 = Not Found."

- id: set_input_component
  label: Set Input - Component
  kind: action
  command: "*SCINPT000000040000{number4}"
  params:
    - name: number
      type: integer
      description: Component input number (1-9999)
  notes: "Class digit '4'. Answer 'N'*16 = Not Found."

- id: set_input_screen_mirroring
  label: Set Input - Screen Mirroring
  kind: action
  command: "*SCINPT000000050000{number4}"
  params:
    - name: number
      type: integer
      description: Screen Mirroring input number (1-9999)
  notes: "Class digit '5'. Answer 'N'*16 = Not Found."

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute_off
  label: Set Picture Mute - Disabled
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: set_picture_mute_on
  label: Set Picture Mute - Enabled (Screen Black)
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{string-padded}"
  params:
    - name: scene
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name, case-sensitive, right-padded with '#' to 16 bytes (e.g. "auto24pSync#####")
  notes: "Answer 'N'*16 = Not available for the current input."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []
  notes: "Answer 'N'*16 = Not available for the current input."

- id: get_broadcast_address
  label: Get Broadcast Address (Interface eth0)
  kind: query
  command: "*SEBADReth0############"
  params: []
  notes: "Param encodes interface name right-padded with '#' (e.g. 'eth0' + 12 '#' = 16 bytes). Answer example: '192.168.0.14####' (IPv4 string right-padded with '#')."

- id: get_mac_address
  label: Get MAC Address (Interface eth0)
  kind: query
  command: "*SEMADReth0############"
  params: []
  notes: "Response carries 12-byte MAC right-padded with '#' to 16 bytes."
```

## Feedbacks
```yaml
# Common Answer param patterns:
#   '0'*16 = success
#   'F'*16 = error
#   'N'*16 = not-found / not-available-for-current-input
#   'X'*16 = success with value (decimal ASCII left-padded '0', or string right-padded '#')

- id: power_state
  type: enum
  values: [standby, active]
  notes: "From getPowerStatus answer: '0'*16 = Standby, '1' (last byte) = Active, 'F'*16 = Error."

- id: audio_volume
  type: integer
  notes: "From getAudioVolume answer: 16 ASCII bytes, decimal left-padded '0' (e.g. '0000000000000029' = 41)."

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  notes: "From getAudioMute answer: '0'*16 = Not Muted, last byte '1' = Muted, 'F'*16 = Error."

- id: input_state
  type: string
  notes: "From getInput answer: param[7] = class digit ('1' HDMI / '3' Composite / '4' Component / '5' Screen Mirroring), param[8-11]='0000', param[12-15]=ASCII input number. 'N'*16 = Not Found."

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  notes: "From getPictureMute answer: '0'*16 = Disabled, last byte '1' = Enabled, 'F'*16 = Error."

- id: scene_setting
  type: string
  enum: [auto, auto24pSync, general]
  notes: "From getSceneSetting answer: 16-byte string, case-sensitive, '#'-padded. 'N'*16 = not available for current input."

- id: broadcast_address
  type: string
  notes: "From getBroadcastAddress answer: 16-byte IPv4 string, '#'-padded (e.g. '192.168.0.14####')."

- id: mac_address
  type: string
  notes: "From getMacAddress answer: 12-byte MAC, '#'-padded to 16 bytes."
```

## Variables
```yaml
# UNRESOLVED: source does not document discrete settable parameters beyond the
# actions above. Volume is implemented via setAudioVolume action with a numeric param,
# not as a separate variable. Scene is implemented via setSceneSetting.
```

## Events
```yaml
# Type byte 0x4E 'N' = unsolicited Notify messages.
# Format same 24-byte frame: header(2) + 'N'(1) + Four-CC(4) + param(16) + footer(1).
# Source documents 5 fire* events, each triggered when the corresponding state changes.

- id: fire_power_change
  description: Sent when powering on or off.
  command_pattern: "*SNPOWR0000000000000000"  # powering off
  command_pattern_on: "*SNPOWR0000000000000001"  # powering on

- id: fire_input_change
  description: Sent when input changes to monitor.
  command_pattern: "*SNINPT{param16}"
  param_layout: "param[7] = class (1/3/4/5 or '0' for unspecified), param[8-11]='0000', param[12-15]=ASCII input number. '0'*16 = unspecified input change."

- id: fire_volume_change
  description: Sent when volume changes.
  command_pattern: "*SNVOLU{value16}"

- id: fire_mute_change
  description: Sent when mute toggles.
  command_pattern: "*SNAMUT0000000000000000"  # unmuting
  command_pattern_on: "*SNAMUT0000000000000001"  # muting

- id: fire_picture_mute_change
  description: Sent when picture mute state changes.
  command_pattern: "*SNPMUT0000000000000000"  # enabled
  command_pattern_off: "*SNPMUT0000000000000001"  # disabled

# Source also documents a fireInputChange variant for unspecified input:
# "*SNINPT0000000000000000" - sent when an input change to monitor happens with no specific class.
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: "Source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
# UNRESOLVED: source mentions RED-DA compliance differences for EU models (3 spec
# variants) but does not enumerate which commands are restricted per variant.
```

## Notes
- **Frame structure**: every message is exactly 24 bytes: `0x2A 0x53` (header) + 1-byte message type + 4-byte Four-CC command + 16-byte params + `0x0A` (footer). Padding character conventions: '0' for numeric left-pad, '#' for string right-pad / no-param placeholder, 'F' for error answers, 'N' for not-found / not-available, 'X' for variable-length value answers.
- **Source provenance**: pro-bravia.sony.net "Simple IP control" page is the canonical reference. The 3 legacy "External Control Reference Guide (Simple IP Control)" PDFs on pro.sony are blocked by 403 / no Wayback archive, but pro-bravia.sony.net survived the 8 May 2026 developer.sony.com shutdown and is the active source.
- **Dual response on power ops**: the source's netcat worked example shows that a `setPowerStatus` Off request (`*SCPOWR0000000000000000`) is answered with TWO 24-byte frames back-to-back — an Answer (`*SAPOWR0000000000000000`, command accepted) followed by a Notify (`*SNPOWR0000000000000000`, current state is off). Implementations reading from the socket must expect multiple frames per control command when state changes.
- **RED-DA caveat (EU models)**: EU-area models have 3 spec variants per RED-DA compliance. Settings and available commands differ per variant — see https://pro-bravia.sony.net/setup/device-settings/red-da/ (referenced in source, not transcribed).
- **Volume encoding**: source example maps `0000000000000029` to decimal 41; no min/max range stated.
- **IR codes**: `setIrccCode` sends one of 57 documented IR-equivalent codes (remote navigation, digits, transport, HDMI 1-4, etc.) as a 16-byte param. The code number is encoded as ASCII decimal, right-justified and zero-padded across the trailing 1-3 bytes of the 16-byte param field (e.g. code 5 = 15 zeros + '5'; code 10 = 14 zeros + "10"; code 124 = 13 zeros + "124").
- **Multiple-input commands**: setInput distinguishes class (HDMI/Composite/Component/Screen Mirroring) by param[7] and the per-class number by param[12-15] (1-9999).
- **Pre-conditions on monitor**: Simple IP Control must be enabled in [Settings]→[Network & Internet]→[Home network]→[IP control]→[Simple IP control] and Remote Device Control must be enabled in [Settings]→[Network & Internet]→[Remote device settings]→[Control remotely].
- **TCP framing**: source shows `netcat [IP] 20060` and a 24-byte `*SCPOWR0000000000000000` example. There is no documented length-prefix or delimiter beyond the fixed 24-byte structure.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: EU RED-DA 3-variant spec differences not enumerated in source. -->
<!-- UNRESOLVED: auth credentials / pre-shared key not addressed; inferred none. -->
<!-- UNRESOLVED: volume min/max bounds not stated (only example "29"=41 given). -->
````

Upgrades applied:
- **Fixed**: IRCC param format comment — was "ASCII hex byte", now correctly "ASCII decimal right-justified zero-padded" with worked examples (5/10/124).
- **Fixed**: `set_ircc_code` template `*SCIRCC{param15+byte}` → `*SCIRCC{code16}` with cleaner description.
- **Fixed**: `fire_mute_change` YAML — stray `"` in description removed.
- **Added**: Dual-response note (Answer + Notify) on power-off via `set_power_off.notes` + Notes section (source's netcat example).
- **Added**: `'N'*16 = Not Found` notes on setInput variants, setSceneSetting, getSceneSetting, input_state feedback.
- **Added**: `'X'*16` value-answer pattern to Feedbacks header comment.
- **Clarified**: setInput byte offsets in actions header comment (param-relative, not absolute).
- **No IDs changed**, no entries removed. All 17 Four-CCs + 57 IR codes + 5 notify events preserved.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison
retrieved_at: 2026-07-16T22:34:35.529Z
last_checked_at: 2026-07-22T01:28:10.640Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:28:10.640Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions matched with exact wire-level literals in source; transport parameters (TCP 20060, no auth) verified; spec provides complete coverage of the source command catalogue. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU area models have 3 RED-DA-compliant spec variants; command availability differs per spec. Not enumerated in source."
- "source does not document discrete settable parameters beyond the"
- "source does not describe any multi-step sequences."
- "source mentions RED-DA compliance differences for EU models (3 spec"
- "firmware version compatibility not stated in source."
- "EU RED-DA 3-variant spec differences not enumerated in source."
- "auth credentials / pre-shared key not addressed; inferred none."
- "volume min/max bounds not stated (only example \"29\"=41 given)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
