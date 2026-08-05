---
spec_id: admin/sony-kdx8005-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8005 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDX8005 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8005 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
  - helpguide.sony.net
source_urls:
  - https://pro-bravia.sony.net/interface-for-control/simple-ip-control/
  - https://pro-bravia.sony.net/interface-for-control/ircc-ip/
  - https://pro-bravia.sony.net/interface-for-control/rest-api/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://helpguide.sony.net/tv/nga3/v1/en-142/contents/TP1002006040.html
retrieved_at: 2026-06-11T04:27:27.367Z
last_checked_at: 2026-07-22T01:23:56.128Z
generated_at: 2026-07-22T01:23:56.128Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU sales models have 3 RED-DA variants with differing commands/settings; not enumerated in source."
  - "not available on EU sales models that cannot select auth method."
  - "source documents settable values as parameter bytes inside discrete actions"
  - "source describes no multi-step sequences."
  - "source mentions remote-control and IP-control settings must be enabled in"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:23:56.128Z
  matched_actions: 80
  action_count: 80
  confidence: medium
  summary: "All 80 spec actions matched source with correct FourCC codes and parameter shapes; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony KDX8005 Series Control Spec

## Summary
This spec covers Sony's "Simple IP Control" protocol (SSIP-based) for the KDX8005 Series professional BRAVIA displays. Communication is over TCP on port 20060 using 24-byte fixed-length messages composed of a 2-byte header, 1-byte message type, 4-byte FourCC command, 16-byte parameter, and 1-byte footer. The protocol supports power, input, volume, mute, picture-mute, scene setting, IR code relay, and basic network-info queries, plus unsolicited Notify messages.

<!-- UNRESOLVED: EU sales models have 3 RED-DA variants with differing commands/settings; not enumerated in source. -->

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
- powerable   # inferred from setPowerStatus / getPowerStatus / togglePowerStatus
- routable    # inferred from setInput / getInput
- queryable   # inferred from getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable   # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Set IR CC Code (setIrccCode)
  kind: action
  command: "*SCIRCC{ircc_code_padded_to_16_chars}"
  notes: "Header 0x2A 0x53, type 'C', FourCC IRCC, parameter is the IR command code right-padded to 16 ASCII bytes with '0', footer 0x0A. Use one of the documented IR codes from the IR table."
  params:
    - name: ircc_code
      type: string
      description: "16-byte ASCII parameter; e.g. '0000000000000009' for Up."

- id: set_power_status_standby
  label: Set Power Status - Standby
  kind: action
  command: "*SCPOWR0000000000000000"
  notes: "24 bytes. 'C' type, POWR FourCC, parameter 16 ASCII '0' chars."

- id: set_power_status_active
  label: Set Power Status - Active
  kind: action
  command: "*SCPOWR0000000000000001"
  notes: "24 bytes. 'C' type, POWR FourCC, parameter 15 ASCII '0' chars + '1'."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  notes: "E type, POWR FourCC, 16 '#' placeholders in parameter field."

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  notes: "C type, TPOW FourCC, 16 '#' placeholders."

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded_to_16_chars}"
  notes: "Parameter is volume right-justified in 10-digit decimal, zero-padded on the left, e.g. 0000000000000029 for 41."
  params:
    - name: volume
      type: integer
      description: "Volume value (right-padded decimal in 16-byte ASCII field)."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"

- id: set_audio_mute_off
  label: Set Audio Mute - Off
  kind: action
  command: "*SCAMUT0000000000000000"

- id: set_audio_mute_on
  label: Set Audio Mute - On
  kind: action
  command: "*SCAMUT0000000000000001"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"

- id: set_input_hdmi
  label: Set Input - HDMI
  kind: action
  command: "*SCINPT000000010000{port:04d}"
  notes: "Parameter bytes 7-9 are '000', byte 10 is '1' (HDMI selector), bytes 11-14 are '0000', bytes 15-18 are 4-digit decimal port number 1-9999 (e.g. 0001 = HDMI 1)."
  params:
    - name: port
      type: integer
      description: "HDMI port number 1-9999."

- id: set_input_composite
  label: Set Input - Composite
  kind: action
  command: "*SCINPT000000030000{port:04d}"
  notes: "Byte 10 = '3' (composite selector), bytes 15-18 = 4-digit port 1-9999."
  params:
    - name: port
      type: integer
      description: "Composite port number 1-9999."

- id: set_input_component
  label: Set Input - Component
  kind: action
  command: "*SCINPT000000040000{port:04d}"
  notes: "Byte 10 = '4' (component selector), bytes 15-18 = 4-digit port 1-9999."
  params:
    - name: port
      type: integer
      description: "Component port number 1-9999."

- id: set_input_screen_mirroring
  label: Set Input - Screen Mirroring
  kind: action
  command: "*SCINPT000000050000{port:04d}"
  notes: "Byte 10 = '5' (screen mirroring selector), bytes 15-18 = 4-digit port 1-9999."
  params:
    - name: port
      type: integer
      description: "Screen mirroring port number 1-9999."

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"

- id: set_picture_mute_off
  label: Set Picture Mute - Off
  kind: action
  command: "*SCPMUT0000000000000000"

- id: set_picture_mute_on
  label: Set Picture Mute - On (Black Screen)
  kind: action
  command: "*SCPMUT0000000000000001"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded_to_16_chars}"
  notes: "Parameter is a scene name right-padded with '#' to 16 bytes. Valid scenes per source: 'auto', 'auto24pSync', 'general'. Case-sensitive."
  params:
    - name: scene
      type: string
      description: "Scene name (auto | auto24pSync | general), right-padded with '#'."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"
  notes: "E type, BADR FourCC, parameter ASCII 'eth0' followed by 11 '#' placeholders."
  # UNRESOLVED: not available on EU sales models that cannot select auth method.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  notes: "E type, MADR FourCC, parameter ASCII 'eth0' followed by 11 '#' placeholders. Response: MAC left-justified, right-padded with '#' to 16 bytes."
  # UNRESOLVED: not available on EU sales models that cannot select auth method.

# --- IR command codes (setIrccCode per documented IR row) ---
# Each entry is the verbatim 24-byte setIrccCode payload for one IR code from the
# source IR table. All share the IRCC FourCC; the 16-byte parameter is the IR code.

- id: ircc_display
  label: IR CC - Display
  kind: action
  command: "*SCIRCC0000000000000005"
  notes: "setIrccCode; IR parameter 0000000000000005 (Display)."

- id: ircc_home
  label: IR CC - Home
  kind: action
  command: "*SCIRCC0000000000000006"
  notes: "setIrccCode; IR parameter 0000000000000006 (Home)."

- id: ircc_options
  label: IR CC - Options
  kind: action
  command: "*SCIRCC0000000000000007"
  notes: "setIrccCode; IR parameter 0000000000000007 (Options)."

- id: ircc_return
  label: IR CC - Return
  kind: action
  command: "*SCIRCC0000000000000008"
  notes: "setIrccCode; IR parameter 0000000000000008 (Return)."

- id: ircc_up
  label: IR CC - Up
  kind: action
  command: "*SCIRCC0000000000000009"
  notes: "setIrccCode; IR parameter 0000000000000009 (Up)."

- id: ircc_down
  label: IR CC - Down
  kind: action
  command: "*SCIRCC0000000000000010"
  notes: "setIrccCode; IR parameter 0000000000000010 (Down)."

- id: ircc_right
  label: IR CC - Right
  kind: action
  command: "*SCIRCC0000000000000011"
  notes: "setIrccCode; IR parameter 0000000000000011 (Right)."

- id: ircc_left
  label: IR CC - Left
  kind: action
  command: "*SCIRCC0000000000000012"
  notes: "setIrccCode; IR parameter 0000000000000012 (Left)."

- id: ircc_confirm
  label: IR CC - Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  notes: "setIrccCode; IR parameter 0000000000000013 (Confirm)."

- id: ircc_red
  label: IR CC - Red
  kind: action
  command: "*SCIRCC0000000000000014"
  notes: "setIrccCode; IR parameter 0000000000000014 (Red)."

- id: ircc_green
  label: IR CC - Green
  kind: action
  command: "*SCIRCC0000000000000015"
  notes: "setIrccCode; IR parameter 0000000000000015 (Green)."

- id: ircc_yellow
  label: IR CC - Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  notes: "setIrccCode; IR parameter 0000000000000016 (Yellow)."

- id: ircc_blue
  label: IR CC - Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  notes: "setIrccCode; IR parameter 0000000000000017 (Blue)."

- id: ircc_num1
  label: IR CC - Num1
  kind: action
  command: "*SCIRCC0000000000000018"
  notes: "setIrccCode; IR parameter 0000000000000018 (Num1)."

- id: ircc_num2
  label: IR CC - Num2
  kind: action
  command: "*SCIRCC0000000000000019"
  notes: "setIrccCode; IR parameter 0000000000000019 (Num2)."

- id: ircc_num3
  label: IR CC - Num3
  kind: action
  command: "*SCIRCC0000000000000020"
  notes: "setIrccCode; IR parameter 0000000000000020 (Num3)."

- id: ircc_num4
  label: IR CC - Num4
  kind: action
  command: "*SCIRCC0000000000000021"
  notes: "setIrccCode; IR parameter 0000000000000021 (Num4)."

- id: ircc_num5
  label: IR CC - Num5
  kind: action
  command: "*SCIRCC0000000000000022"
  notes: "setIrccCode; IR parameter 0000000000000022 (Num5)."

- id: ircc_num6
  label: IR CC - Num6
  kind: action
  command: "*SCIRCC0000000000000023"
  notes: "setIrccCode; IR parameter 0000000000000023 (Num6)."

- id: ircc_num7
  label: IR CC - Num7
  kind: action
  command: "*SCIRCC0000000000000024"
  notes: "setIrccCode; IR parameter 0000000000000024 (Num7)."

- id: ircc_num8
  label: IR CC - Num8
  kind: action
  command: "*SCIRCC0000000000000025"
  notes: "setIrccCode; IR parameter 0000000000000025 (Num8)."

- id: ircc_num9
  label: IR CC - Num9
  kind: action
  command: "*SCIRCC0000000000000026"
  notes: "setIrccCode; IR parameter 0000000000000026 (Num9)."

- id: ircc_num0
  label: IR CC - Num0
  kind: action
  command: "*SCIRCC0000000000000027"
  notes: "setIrccCode; IR parameter 0000000000000027 (Num0)."

- id: ircc_volume_up
  label: IR CC - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  notes: "setIrccCode; IR parameter 0000000000000030 (Volume Up)."

- id: ircc_volume_down
  label: IR CC - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  notes: "setIrccCode; IR parameter 0000000000000031 (Volume Down)."

- id: ircc_mute
  label: IR CC - Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  notes: "setIrccCode; IR parameter 0000000000000032 (Mute)."

- id: ircc_channel_up
  label: IR CC - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  notes: "setIrccCode; IR parameter 0000000000000033 (Channel Up)."

- id: ircc_channel_down
  label: IR CC - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  notes: "setIrccCode; IR parameter 0000000000000034 (Channel Down)."

- id: ircc_subtitle
  label: IR CC - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  notes: "setIrccCode; IR parameter 0000000000000035 (Subtitle)."

- id: ircc_dot
  label: IR CC - DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  notes: "setIrccCode; IR parameter 0000000000000038 (DOT)."

- id: ircc_picture_off
  label: IR CC - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  notes: "setIrccCode; IR parameter 0000000000000050 (Picture Off)."

- id: ircc_wide
  label: IR CC - Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  notes: "setIrccCode; IR parameter 0000000000000061 (Wide)."

- id: ircc_jump
  label: IR CC - Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  notes: "setIrccCode; IR parameter 0000000000000062 (Jump)."

- id: ircc_sync_menu
  label: IR CC - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  notes: "setIrccCode; IR parameter 0000000000000076 (Sync Menu)."

- id: ircc_forward
  label: IR CC - Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  notes: "setIrccCode; IR parameter 0000000000000077 (Forward)."

- id: ircc_play
  label: IR CC - Play
  kind: action
  command: "*SCIRCC0000000000000078"
  notes: "setIrccCode; IR parameter 0000000000000078 (Play)."

- id: ircc_rewind
  label: IR CC - Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  notes: "setIrccCode; IR parameter 0000000000000079 (Rewind)."

- id: ircc_prev
  label: IR CC - Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  notes: "setIrccCode; IR parameter 0000000000000080 (Prev)."

- id: ircc_stop
  label: IR CC - Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  notes: "setIrccCode; IR parameter 0000000000000081 (Stop)."

- id: ircc_next
  label: IR CC - Next
  kind: action
  command: "*SCIRCC0000000000000082"
  notes: "setIrccCode; IR parameter 0000000000000082 (Next)."

- id: ircc_pause
  label: IR CC - Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  notes: "setIrccCode; IR parameter 0000000000000084 (Pause)."

- id: ircc_flash_plus
  label: IR CC - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  notes: "setIrccCode; IR parameter 0000000000000086 (Flash Plus)."

- id: ircc_flash_minus
  label: IR CC - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  notes: "setIrccCode; IR parameter 0000000000000087 (Flash Minus)."

- id: ircc_tv_power
  label: IR CC - TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  notes: "setIrccCode; IR parameter 0000000000000098 (TV Power)."

- id: ircc_audio
  label: IR CC - Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  notes: "setIrccCode; IR parameter 0000000000000099 (Audio)."

- id: ircc_input
  label: IR CC - Input
  kind: action
  command: "*SCIRCC0000000000000101"
  notes: "setIrccCode; IR parameter 0000000000000101 (Input)."

- id: ircc_sleep
  label: IR CC - Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  notes: "setIrccCode; IR parameter 0000000000000104 (Sleep)."

- id: ircc_sleep_timer
  label: IR CC - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  notes: "setIrccCode; IR parameter 0000000000000105 (Sleep Timer)."

- id: ircc_video_2
  label: IR CC - Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  notes: "setIrccCode; IR parameter 0000000000000108 (Video 2)."

- id: ircc_picture_mode
  label: IR CC - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  notes: "setIrccCode; IR parameter 0000000000000110 (Picture Mode)."

- id: ircc_demo_surround
  label: IR CC - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  notes: "setIrccCode; IR parameter 0000000000000121 (Demo Surround)."

- id: ircc_hdmi_1
  label: IR CC - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  notes: "setIrccCode; IR parameter 0000000000000124 (HDMI 1)."

- id: ircc_hdmi_2
  label: IR CC - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  notes: "setIrccCode; IR parameter 0000000000000125 (HDMI 2)."

- id: ircc_hdmi_3
  label: IR CC - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  notes: "setIrccCode; IR parameter 0000000000000126 (HDMI 3)."

- id: ircc_hdmi_4
  label: IR CC - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  notes: "setIrccCode; IR parameter 0000000000000127 (HDMI 4)."

- id: ircc_action_menu
  label: IR CC - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  notes: "setIrccCode; IR parameter 0000000000000129 (Action Menu)."

- id: ircc_help
  label: IR CC - Help
  kind: action
  command: "*SCIRCC0000000000000130"
  notes: "setIrccCode; IR parameter 0000000000000130 (Help)."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "Answer to getPowerStatus: '...0' = standby, '...1' = active; 'FFFFFFFFFF...' = error."

- id: audio_mute_state
  type: enum
  values: [off, on]
  source: "Answer to getAudioMute: '...0' = not muted, '...1' = muted; 'FFFFFFFFFF...' = error."

- id: picture_mute_state
  type: enum
  values: [off, on]
  source: "Answer to getPictureMute: '...0' = disabled, '...1' = enabled; 'FFFFFFFFFF...' = error."

- id: input_state
  type: object
  fields:
    - name: type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
    - name: port
      type: integer
      range: "1-9999"
  source: "Answer to getInput; bytes 7-9 '000', byte 10 '1'|'3'|'4'|'5', bytes 15-18 4-digit port. 'NNNNNNNNNNNNNNNN' = not found, 'FFFFFFFFFF...' = error."

- id: scene_setting
  type: string
  source: "Answer to getSceneSetting: scene name left-justified, right-padded with '#'. 'NNNNNNNNNNNNNNNN' = not available for current input. 'FFFFFFFFFF...' = error."

- id: audio_volume
  type: integer
  source: "Answer to getAudioVolume: 16 ASCII bytes right-justified decimal. 'FFFFFFFFFF...' = error."

- id: broadcast_address
  type: string
  source: "Answer to getBroadcastAddress: IPv4 dotted-quad left-justified, right-padded with '#' to 16 bytes. 'FFFFFFFFFF...' = error."

- id: mac_address
  type: string
  source: "Answer to getMacAddress: MAC left-justified, right-padded with '#' to 16 bytes. 'FFFFFFFFFF...' = error."

- id: result_status
  type: enum
  values: [success, error]
  source: "Generic Answer (A) message: '0000000000000000' = success, 'FFFFFFFFFFFFFFFF' = error."
```

## Variables
```yaml
# UNRESOLVED: source documents settable values as parameter bytes inside discrete actions
# (volume 0-? per source example 41; scene name; input port 1-9999) rather than as
# separate settable variables. No independent variable endpoints defined.
```

## Events
```yaml
- id: power_change_notification
  command: "*SNPOWR000000000000000{0|1}"
  description: "Notify from display on power state change. '...0' = power off, '...1' = power on."

- id: input_change_notification
  command: "*SNINPT{parameter}"
  description: "Notify on input change. Same parameter encoding as getInput response; '0000000000000000' = generic input change."

- id: volume_change_notification
  command: "*SNVOLU{volume_16_bytes}"
  description: "Notify on volume change. Parameter is current volume as 16-byte ASCII decimal."

- id: mute_change_notification
  command: "*SNAMUT000000000000000{0|1}"
  description: "Notify on audio mute change. '...0' = mute off, '...1' = mute on."

- id: picture_mute_change_notification
  command: "*SNPMUT000000000000000{0|1}"
  description: "Notify on picture mute change. '...0' = picture mute off, '...1' = picture mute on."
```

## Macros
```yaml
# UNRESOLVED: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source mentions remote-control and IP-control settings must be enabled in
# the on-screen Settings menu before the protocol works, but does not document
# hardware interlocks, lockout procedures, or power-on sequencing requirements.
```

## Notes
- All messages are exactly 24 bytes: header `0x2A 0x53` (ASCII `*S`), 1 byte message type (`C`/`E`/`A`/`N`), 4 ASCII bytes FourCC command, 16 bytes parameter (ASCII digits 0-9, letters, or `#` placeholders for queries), footer `0x0A`.
- `C` = Control (client→display), `E` = Enquiry (client→display), `A` = Answer (display→client), `N` = Notify (display→client).
- Success Answer for Control commands: 16 ASCII `'0'` bytes. Error Answer: 16 ASCII `'F'` bytes. "Not found/not available" Answer: 16 ASCII `'N'` bytes (used by setInput / setSceneSetting / getSceneSetting / getInput).
- Required display settings (must be enabled in on-screen Settings before commands work): Mobile device settings → Remote control function, and Home network → IP control → Simple IP control.
- EU sales models ship in 3 RED-DA variants with different settings and command availability; `getBroadcastAddress` and `getMacAddress` are not available on EU models that cannot select the authentication method. See https://pro-bravia.sony.net/ja/setup/device-settings/red-da/ for details.
- Example `netcat` invocation: `netcat [IP address] 20060`.
- `firePicture MuteChange` in source has a stray space in its command name; treated as `firePictureMuteChange` here.
- Volume range (min/max) is not stated in source — only the example `0000000000000029` (41) is shown. Treat 0 as the implicit lower bound; upper bound UNRESOLVED.
- IR code table: each entry is a 16-byte ASCII parameter to `setIrccCode`; full list in source (Display, Home, Options, Return, Up, Down, Right, Left, Confirm, Red, Green, Yellow, Blue, Num0-9, Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, Forward, Play, Rewind, Prev, Stop, Next, Pause, Flash Plus/Minus, TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help). Each is also enumerated as an explicit `ircc_*` action above for verbatim-payload coverage.
````

Changes made: fixed malformed `set_ircc_code` command (`*SIRCC` → `*SCIRCC`, restored missing `C` type byte); added 56 explicit `ircc_*` actions for every documented IR code row. No existing IDs/shapes removed.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
  - helpguide.sony.net
source_urls:
  - https://pro-bravia.sony.net/interface-for-control/simple-ip-control/
  - https://pro-bravia.sony.net/interface-for-control/ircc-ip/
  - https://pro-bravia.sony.net/interface-for-control/rest-api/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://helpguide.sony.net/tv/nga3/v1/en-142/contents/TP1002006040.html
retrieved_at: 2026-06-11T04:27:27.367Z
last_checked_at: 2026-07-22T01:23:56.128Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:23:56.128Z
matched_actions: 80
action_count: 80
confidence: medium
summary: "All 80 spec actions matched source with correct FourCC codes and parameter shapes; transport parameters verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU sales models have 3 RED-DA variants with differing commands/settings; not enumerated in source."
- "not available on EU sales models that cannot select auth method."
- "source documents settable values as parameter bytes inside discrete actions"
- "source describes no multi-step sequences."
- "source mentions remote-control and IP-control settings must be enabled in"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
