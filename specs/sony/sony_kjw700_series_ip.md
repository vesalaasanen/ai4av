---
spec_id: admin/sony-kjw700-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJW700 Series (BRAVIA Simple IP Control) Control Spec"
manufacturer: Sony
model_family: KJ-32W700C
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KJ-32W700C
    - KJ-40W700C
    - KJ-48W700C
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
  - applicationmarket.crestron.com
  - github.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
  - https://github.com/acaprojects/ruby-engine-drivers/blob/master/modules/sony/display/bravia.rb
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-10T01:33:08.947Z
last_checked_at: 2026-06-10T07:40:05.869Z
generated_at: 2026-06-10T07:40:05.869Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source names the protocol page and BRAVIA Professional Displays generally; the KJW700 model codes (KJ-32W700C / KJ-40W700C / KJ-48W700C) are inferred from prior recovery notes, not from the source itself. EU RED-DA variants may lack some commands (see Notes)."
  - "no other variable-bearing commands in source."
  - "no multi-step sequences described in source."
  - "source does not document safety warnings, interlocks, or power-on sequencing."
verification:
  verdict: verified
  checked_at: 2026-06-10T07:40:05.869Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions matched exactly in source; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KJW700 Series (BRAVIA Simple IP Control) Control Spec

## Summary
Sony BRAVIA Professional Displays implementing Sony's "Simple IP Control" (SSIP) protocol over TCP port 20060. Each command is a fixed 24-byte frame: 2-byte header `0x2A 0x53`, 1-byte message type, 4-byte FourCC command, 16-byte parameter pad, 1-byte footer `0x0A`. The source document enumerates power, input, volume, mute, picture-mute, scene-setting, and a large set of IR-emulation commands, plus a small set of network-introspection enquiries.

<!-- UNRESOLVED: source names the protocol page and BRAVIA Professional Displays generally; the KJW700 model codes (KJ-32W700C / KJ-40W700C / KJ-48W700C) are inferred from prior recovery notes, not from the source itself. EU RED-DA variants may lack some commands (see Notes). -->

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
- powerable    # inferred from setPowerStatus / togglePowerStatus
- routable     # inferred from setInput / getInput
- queryable    # inferred from getPowerStatus, getAudioVolume, etc.
- levelable    # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
# All commands are 24-byte SSIP frames. Hex byte values shown verbatim:
# header 0x2A 0x53 ('*S') + type + FourCC + 16-byte param + footer 0x0A
# Param shorthand: '0' = 0x30, 'F' = 0x46, '#' = 0x23 (padding), 'X' = variable, 'N' = 0x4E
#
# Power ---------------------------------------------------------------
- id: set_power_off
  label: Set Power Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000\n"  # 0x2A 0x53 0x43 POWR 0000000000000000 0x0A
  params: []

- id: set_power_on
  label: Set Power On (Active)
  kind: action
  command: "*SCPOWR0000000000000001\n"  # 0x2A 0x53 0x43 POWR 0000000000000001 0x0A
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"  # 0x2A 0x53 0x45 POWR 16x# 0x0A
  params: []
  # Answer: trailing byte 0 = Standby, 1 = Active; FFFFFF... = Error

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"  # 0x2A 0x53 0x43 TPOW 16x# 0x0A
  params: []

# Volume --------------------------------------------------------------
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000000{value_padded}\n"  # value zero-padded left, 2 hex digits at end (e.g. 0029 = 41 decimal)
  params:
    - name: value_padded
      type: string
      description: "Volume as right-justified decimal padded to 2 chars with leading '0' (e.g. 0029 for level 41)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute_off
  label: Set Audio Mute Off
  kind: action
  command: "*SCAMUT0000000000000000\n"
  params: []

- id: set_audio_mute_on
  label: Set Audio Mute On
  kind: action
  command: "*SCAMUT0000000000000001\n"
  params: []

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []
  # Answer: trailing byte 0 = Not Muted, 1 = Muted

# Input routing -------------------------------------------------------
- id: set_input_hdmi
  label: Set Input HDMI (1-9999)
  kind: action
  command: "*SCINPT00000000010000{port}\n"  # last 4 hex digits = 1..9999
  params:
    - name: port
      type: integer
      description: "HDMI port number 1-9999 (hex, zero-padded left to 4 digits)"

- id: set_input_composite
  label: Set Input Composite (1-9999)
  kind: action
  command: "*SCINPT00000000030000{port}\n"
  params:
    - name: port
      type: integer
      description: "Composite port number 1-9999 (hex, zero-padded left to 4 digits)"

- id: set_input_component
  label: Set Input Component (1-9999)
  kind: action
  command: "*SCINPT00000000040000{port}\n"
  params:
    - name: port
      type: integer
      description: "Component port number 1-9999 (hex, zero-padded left to 4 digits)"

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring (1-9999)
  kind: action
  command: "*SCINPT00000000050000{port}\n"
  params:
    - name: port
      type: integer
      description: "Screen-mirroring port number 1-9999 (hex, zero-padded left to 4 digits)"

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []
  # Answer param layout: 0000000001/3/4/5 0000 XXXX (input type + number)

# Picture mute --------------------------------------------------------
- id: set_picture_mute_off
  label: Set Picture Mute Off
  kind: action
  command: "*SCPMUT0000000000000000\n"
  params: []

- id: set_picture_mute_on
  label: Set Picture Mute On
  kind: action
  command: "*SCPMUT0000000000000001\n"
  params: []

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

# Scene setting -------------------------------------------------------
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded}\n"  # 16 ASCII chars, right-padded with '#', case-sensitive; values: auto / auto24pSync / general
  params:
    - name: scene_padded
      type: string
      description: "Scene name, right-padded with '#' to 16 chars; one of: auto, auto24pSync, general (case-sensitive)"

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

# IR code emission (setIrccCode) -------------------------------------
# All IR commands use the same C-type frame with FourCC "IRCC" and the
# 2-digit hex code packed into the LAST TWO bytes of the 16-byte param.
# Param layout: 14 leading 0x30 bytes + 2-byte code (e.g. 05, 06, ...).
# Codes below are from the source IR-Commands table.

- id: ir_display
  label: IR - Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  params: []

- id: ir_home
  label: IR - Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  params: []

- id: ir_options
  label: IR - Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  params: []

- id: ir_return
  label: IR - Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  params: []

- id: ir_up
  label: IR - Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  params: []

- id: ir_down
  label: IR - Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  params: []

- id: ir_right
  label: IR - Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  params: []

- id: ir_left
  label: IR - Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  params: []

- id: ir_confirm
  label: IR - Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  params: []

- id: ir_red
  label: IR - Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  params: []

- id: ir_green
  label: IR - Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  params: []

- id: ir_yellow
  label: IR - Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  params: []

- id: ir_blue
  label: IR - Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  params: []

- id: ir_num_1
  label: IR - Num 1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  params: []

- id: ir_num_2
  label: IR - Num 2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  params: []

- id: ir_num_3
  label: IR - Num 3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  params: []

- id: ir_num_4
  label: IR - Num 4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  params: []

- id: ir_num_5
  label: IR - Num 5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  params: []

- id: ir_num_6
  label: IR - Num 6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  params: []

- id: ir_num_7
  label: IR - Num 7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  params: []

- id: ir_num_8
  label: IR - Num 8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  params: []

- id: ir_num_9
  label: IR - Num 9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  params: []

- id: ir_num_0
  label: IR - Num 0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  params: []

- id: ir_volume_up
  label: IR - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  params: []

- id: ir_volume_down
  label: IR - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  params: []

- id: ir_mute
  label: IR - Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  params: []

- id: ir_channel_up
  label: IR - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  params: []

- id: ir_channel_down
  label: IR - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  params: []

- id: ir_subtitle
  label: IR - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  params: []

- id: ir_dot
  label: IR - DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  params: []

- id: ir_picture_off
  label: IR - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  params: []

- id: ir_wide
  label: IR - Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  params: []

- id: ir_jump
  label: IR - Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  params: []

- id: ir_sync_menu
  label: IR - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  params: []

- id: ir_forward
  label: IR - Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  params: []

- id: ir_play
  label: IR - Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  params: []

- id: ir_rewind
  label: IR - Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  params: []

- id: ir_prev
  label: IR - Prev
  kind: action
  command: "*SCIRCC0000000000000080\n"
  params: []

- id: ir_stop
  label: IR - Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  params: []

- id: ir_next
  label: IR - Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  params: []

- id: ir_pause
  label: IR - Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  params: []

- id: ir_flash_plus
  label: IR - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  params: []

- id: ir_flash_minus
  label: IR - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  params: []

- id: ir_tv_power
  label: IR - TV Power
  kind: action
  command: "*SCIRCC0000000000000098\n"
  params: []

- id: ir_audio
  label: IR - Audio
  kind: action
  command: "*SCIRCC0000000000000099\n"
  params: []

- id: ir_input
  label: IR - Input
  kind: action
  command: "*SCIRCC0000000000000101\n"
  params: []

- id: ir_sleep
  label: IR - Sleep
  kind: action
  command: "*SCIRCC0000000000000104\n"
  params: []

- id: ir_sleep_timer
  label: IR - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105\n"
  params: []

- id: ir_video_2
  label: IR - Video 2
  kind: action
  command: "*SCIRCC0000000000000108\n"
  params: []

- id: ir_picture_mode
  label: IR - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110\n"
  params: []

- id: ir_demo_surround
  label: IR - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121\n"
  params: []

- id: ir_hdmi_1
  label: IR - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124\n"
  params: []

- id: ir_hdmi_2
  label: IR - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125\n"
  params: []

- id: ir_hdmi_3
  label: IR - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126\n"
  params: []

- id: ir_hdmi_4
  label: IR - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127\n"
  params: []

- id: ir_action_menu
  label: IR - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129\n"
  params: []

- id: ir_help
  label: IR - Help
  kind: action
  command: "*SCIRCC0000000000000130\n"
  params: []

# Network introspection -----------------------------------------------
- id: get_broadcast_address
  label: Get Broadcast Address (eth0)
  kind: query
  command: "*SEBADReth0############\n"  # 16-byte param: ASCII "eth0" + 12 '#' pads
  params:
    - name: interface
      type: string
      description: "Interface name ASCII (e.g. 'eth0'), right-padded with '#' to 16 chars"
  # Answer: IPv4 dotted-quad ASCII left-justified, right-padded with '#'

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*SEMADReth0############\n"
  params:
    - name: interface
      type: string
      description: "Interface name ASCII (e.g. 'eth0'), right-padded with '#' to 16 chars"
  # Answer: MAC ASCII left-justified, right-padded with '#'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  # Trailing byte of getPowerStatus answer: 0 = standby, 1 = active

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  # Trailing byte of getAudioMute answer: 0 = not muted, 1 = muted

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  # Trailing byte of getPictureMute answer: 0 = disabled, 1 = enabled

- id: audio_volume_level
  type: string
  description: "Right-justified decimal volume, 2 chars (e.g. '29' = level 41) in last 2 bytes of getAudioVolume answer"
  # Source shows example: 0000000000000029 (last 2 digits = level, 41)

- id: input_type
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  # Type code in getInput answer: 1/3/4/5

- id: input_port
  type: integer
  description: "Input port number 1-9999 (hex in answer)"

- id: scene_setting
  type: string
  description: "Scene name as returned by getSceneSetting; one of: auto, auto24pSync, general (case-sensitive)"

- id: control_result
  type: enum
  values: [success, error]
  # Generic 'A' answer with 16x '0' = success, 16x 'F' = error; some commands return 'N' (not available / not found)

- id: broadcast_address
  type: string
  description: "Dotted-quad IPv4 ASCII from getBroadcastAddress answer"

- id: mac_address
  type: string
  description: "MAC address ASCII from getMacAddress answer"
```

## Variables
```yaml
# No continuously-settable analog parameters beyond volume (already represented as discrete action).
# UNRESOLVED: no other variable-bearing commands in source.
```

## Events
```yaml
# Unsolicited Notify (type 0x4E) frames from monitor to client.
- id: power_change
  type: enum
  values: [off, on]
  description: "firePowerChange - N-type frame, FourCC POWR; trailing byte 0=off, 1=on"
  frame: "0x2A 0x53 0x4E POWR 000000000000000{state} 0x0A"

- id: input_change
  type: object
  description: "fireInputChange - N-type frame, FourCC INPT; param layout 000000000{type}0000XXXX where type=1/3/4/5"
  frame: "0x2A 0x53 0x4E INPT <type-and-port> 0x0A"

- id: volume_change
  type: string
  description: "fireVolumeChange - N-type frame, FourCC VOLU; param carries 2-digit decimal volume"
  frame: "0x2A 0x53 0x4E VOLU <volume-decimal> 0x0A"

- id: mute_change
  type: enum
  values: [unmuted, muted]
  description: "fireMuteChange - N-type frame, FourCC AMUT; trailing byte 0=unmuted, 1=muted"
  frame: "0x2A 0x53 0x4E AMUT 000000000000000{state} 0x0A"

- id: picture_mute_change
  type: enum
  values: [enabled, disabled]
  description: "firePictureMuteChange - N-type frame, FourCC PMUT; trailing byte 0=enabled, 1=disabled (note: source is inverted vs set/get)"
  frame: "0x2A 0x53 0x4E PMUT 000000000000000{state} 0x0A"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing.
# EU RED-DA caveat (see Notes) may effectively constrain which commands are available but is not a safety interlock.
```

## Notes
- 24-byte fixed frame: `0x2A 0x53` (header) | 1 byte type | 4 bytes FourCC | 16 bytes param | `0x0A` (footer). Always exactly 24 bytes; pad with `0x30` ('0') / `0x23` ('#') / `0x46` ('F') as the source dictates.
- Message types: `0x43` (C, Control) client→monitor, `0x45` (E, Enquiry) client→monitor, `0x41` (A, Answer) monitor→client, `0x4E` (N, Notify) monitor→client.
- Answer with 16× `0x30` = success; 16× `0x46` = error; some commands (setInput / setSceneSetting) may also reply 16× `0x4E` (N) for "not found" / "not available for current input".
- IR codes share one frame type (C, FourCC `IRCC`) and differ only in the last 2 hex digits of the 16-byte parameter. Codes 0x18-0x27 map to digits 1-0; 0x30-0x32 to volume/mute; 0x98 = TV power; 0x124-0x127 = HDMI 1-4.
- Source `firePictureMuteChange` trailing-byte meaning appears inverted in the source table (0=enabled, 1=disabled) compared to `getPictureMute` / `setPictureMute` (0=disabled, 1=enabled). Treat as a likely source-doc typo until verified on real hardware.
- EU RED-DA: 3 specification variants exist for EU models; command availability differs per variant — see https://pro-bravia.sony.net/setup/device-settings/red-da/. Spec assumes the full command set; flag for the verifier.
- Source: refined from aca.im mirror of "Sony Simple IP Control Protocol for BRAVIA" (no first-party Sony URL survives on sony.com as of 2026-06).

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
  - applicationmarket.crestron.com
  - github.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
  - https://github.com/acaprojects/ruby-engine-drivers/blob/master/modules/sony/display/bravia.rb
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-10T01:33:08.947Z
last_checked_at: 2026-06-10T07:40:05.869Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:40:05.869Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions matched exactly in source; complete bidirectional coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source names the protocol page and BRAVIA Professional Displays generally; the KJW700 model codes (KJ-32W700C / KJ-40W700C / KJ-48W700C) are inferred from prior recovery notes, not from the source itself. EU RED-DA variants may lack some commands (see Notes)."
- "no other variable-bearing commands in source."
- "no multi-step sequences described in source."
- "source does not document safety warnings, interlocks, or power-on sequencing."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
