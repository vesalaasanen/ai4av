---
spec_id: admin/sony-kdx8500-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8500 Series Control Spec"
manufacturer: Sony
model_family: "KD-X8500 Series (BRAVIA Professional Displays)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KD-X8500 Series (BRAVIA Professional Displays)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - pro.sony
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro.sony/s3/2026/03/17145824/IPRemote_UserGuide_en.pdf
retrieved_at: 2026-06-20T15:46:51.806Z
last_checked_at: 2026-06-22T11:50:26.798Z
generated_at: 2026-06-22T11:50:26.798Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact X8500 model variants (B/C/F/G/H) not enumerated in source. Firmware version not stated. EU RED-DA variants alter available commands but specifics undocumented here."
  - "host/discovery mechanism not in source (monitor located on LAN)"
  - "no additional settable variables documented in source."
  - "no multi-step sequences described in source."
  - "source contains no safety warnings, interlock procedures, or"
  - "exact model variants covered (X8500B/C/F/G/H) not stated."
  - "volume value range (0-99 vs 0-100) not stated."
  - "LAN discovery / addressing mechanism not documented."
  - "maximum concurrent TCP connections not stated."
  - "command rate-limit / timing constraints not stated."
verification:
  verdict: verified
  checked_at: 2026-06-22T11:50:26.798Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions matched to source; wire-level tokens verified; transport parameters confirmed; IR code table fully represented. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-20
---

# Sony KDX8500 Series Control Spec

## Summary
Sony BRAVIA Professional Displays (KDX8500 series). Simple IP Control (SSIP) over TCP. Fixed 24-byte ASCII messages. Listens TCP 20060. Covers power, volume, mute, input select, picture mute, scene select, IR remote emulation, plus power/input/volume/mute push events.

<!-- UNRESOLVED: exact X8500 model variants (B/C/F/G/H) not enumerated in source. Firmware version not stated. EU RED-DA variants alter available commands but specifics undocumented here. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # UNRESOLVED: host/discovery mechanism not in source (monitor located on LAN)
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable   # inferred from setPowerStatus examples
  - queryable   # inferred from get* enquiry examples
  - levelable   # inferred from setAudioVolume example
  - routable    # inferred from setInput examples
```

## Actions
```yaml
# Message format: 24 bytes fixed.
#   Bytes 0-1:  header "*S" (0x2A 0x53)
#   Byte  2:    message type - C=Control, E=Enquiry, A=Answer, N=Notify
#   Bytes 3-6:  FourCC command (4 ASCII chars)
#   Bytes 7-22: 16-char parameter (zero-padded decimal, or '#' pad for no-param)
#   Byte  23:   footer LF (0x0A)
# All command strings below exclude trailing LF (0x0A). Append LF when transmitting.
# Param padding rules: '#' = no-param placeholder; '0' = decimal zero-pad.

# --- Power (POWR) ---
- id: set_power_off
  label: Power Standby (Off)
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []

- id: set_power_on
  label: Power Active (On)
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: toggle_power_status
  label: Toggle Power
  kind: action
  command: "*SCTPOW################"
  params: []

# --- Audio Volume (VOLU) ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_param_16}"  # 16-char param: decimal zero-padded on left
  params:
    - name: volume_param_16
      type: string
      description: Volume decimal value right-aligned in 16-char field, zero-padded left. Source example for value 29 = "0000000000000029". Value range not stated in source.

# --- Audio Mute (AMUT) ---
- id: set_audio_mute_off
  label: Audio Unmute
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: set_audio_mute_on
  label: Audio Mute
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

# --- Picture Mute (PMUT) ---
- id: set_picture_mute_off
  label: Picture Mute Disable
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: set_picture_mute_on
  label: Picture Mute Enable (Black Screen)
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

# --- Input Select (INPT) ---
- id: set_input_hdmi
  label: Set Input HDMI
  kind: action
  command: "*SCINPT000000010000{index_padded_4}"
  params:
    - name: index_padded_4
      type: string
      description: HDMI input index 1-9999, zero-padded to 4 digits.

- id: set_input_composite
  label: Set Input Composite
  kind: action
  command: "*SCINPT000000030000{index_padded_4}"
  params:
    - name: index_padded_4
      type: string
      description: Composite input index 1-9999, zero-padded to 4 digits.

- id: set_input_component
  label: Set Input Component
  kind: action
  command: "*SCINPT000000040000{index_padded_4}"
  params:
    - name: index_padded_4
      type: string
      description: Component input index 1-9999, zero-padded to 4 digits.

- id: set_input_screen_mirroring
  label: Set Input Screen Mirroring
  kind: action
  command: "*SCINPT000000050000{index_padded_4}"
  params:
    - name: index_padded_4
      type: string
      description: Screen Mirroring input index 1-9999, zero-padded to 4 digits.

# --- Scene Select (SCEN) ---
- id: set_scene_select
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_param_16}"  # 16-char param: scene name right-padded with '#'
  params:
    - name: scene_param_16
      type: enum
      description: "Case-sensitive scene name padded right with '#' to 16 chars. Values: 'auto############', 'auto24pSync#####', 'general##########'."

# --- IR Remote Codes (setIrccCode / IRCC) ---
# Source lists each IR button as a distinct row. Param = 16-char zero-padded decimal IR code.
- id: ircc_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005"
  params: []

- id: ircc_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006"
  params: []

- id: ircc_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007"
  params: []

- id: ircc_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008"
  params: []

- id: ircc_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009"
  params: []

- id: ircc_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010"
  params: []

- id: ircc_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011"
  params: []

- id: ircc_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012"
  params: []

- id: ircc_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013"
  params: []

- id: ircc_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014"
  params: []

- id: ircc_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015"
  params: []

- id: ircc_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016"
  params: []

- id: ircc_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017"
  params: []

- id: ircc_num1
  label: IR Num1
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: ircc_num2
  label: IR Num2
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: ircc_num3
  label: IR Num3
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: ircc_num4
  label: IR Num4
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: ircc_num5
  label: IR Num5
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: ircc_num6
  label: IR Num6
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: ircc_num7
  label: IR Num7
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: ircc_num8
  label: IR Num8
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: ircc_num9
  label: IR Num9
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: ircc_num0
  label: IR Num0
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: ircc_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: ircc_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: ircc_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: ircc_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: ircc_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: ircc_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: ircc_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: ircc_picture_off
  label: IR Picture Off
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: ircc_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: ircc_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: ircc_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: ircc_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: ircc_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: ircc_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: ircc_prev
  label: IR Prev
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: ircc_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: ircc_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: ircc_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: ircc_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: ircc_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: ircc_tv_power
  label: IR TV Power
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: ircc_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: ircc_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: ircc_sleep
  label: IR Sleep
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: ircc_sleep_timer
  label: IR Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: ircc_video_2
  label: IR Video 2
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: ircc_picture_mode
  label: IR Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: ircc_demo_surround
  label: IR Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: ircc_hdmi_1
  label: IR HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: ircc_hdmi_2
  label: IR HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: ircc_hdmi_3
  label: IR HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: ircc_hdmi_4
  label: IR HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: ircc_action_menu
  label: IR Action Menu
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: ircc_help
  label: IR Help
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []

# --- Enquiries (E type, kind: query) ---
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"  # param = interface name "eth0" padded right with '#'
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"
  params: []
```

## Feedbacks
```yaml
# Answer (A type) messages from monitor. Param 16 chars.
# "0000000000000000" = success/result. "FFFFFFFFFFFFFFFF" = error. Other = value.
- id: power_state
  type: enum
  values: ["off", "on"]
  description: Response to getPowerStatus. Off = "*SAPOWR0000000000000000"; On = "*SAPOWR0000000000000001"; Error = "*SAPOWRFFFFFFFFFFFFFFFF".

- id: audio_volume_value
  type: integer
  description: Response to getAudioVolume. Decimal value in 16-char zero-padded field. Range not stated in source.

- id: audio_mute_state
  type: enum
  values: ["unmuted", "muted"]
  description: Response to getAudioMute. Unmuted = param 0...0; Muted = param 0...1; Error = param F...F.

- id: input_source
  type: enum
  values: ["hdmi", "composite", "component", "screen_mirroring"]
  description: Response to getInput. Codes - HDMI=00000001, Composite=00000003, Component=00000004, Screen Mirroring=00000005, each followed by 4-char index 1-9999.

- id: picture_mute_state
  type: enum
  values: ["disabled", "enabled"]
  description: Response to getPictureMute. Disabled = param 0...0; Enabled = param 0...1.

- id: scene_setting_value
  type: string
  description: Response to getSceneSetting. Scene name string in 16-char field; "N...N" (16 N's) = not available for current input.

- id: broadcast_address_value
  type: string
  description: Response to getBroadcastAddress. IPv4 broadcast address padded right with '#' (e.g. "192.168.0.14####").

- id: mac_address_value
  type: string
  description: Response to getMacAddress. MAC address string padded right with '#'.
```

## Variables
```yaml
# All settable parameters are exposed as parameterized Actions above
# (set_audio_volume, set_scene_select, set_input_*).
# UNRESOLVED: no additional settable variables documented in source.
```

## Events
```yaml
# Unsolicited Notify (N type) messages pushed by monitor to client.
- id: power_change_event
  label: Power Change Notification
  type: notification
  command: "*SNPOWR0000000000000000"  # off=...0000, on=...0001
  params: []
  description: Pushed on power state change. Off = "*SNPOWR0000000000000000"; On = "*SNPOWR0000000000000001".

- id: input_change_event
  label: Input Change Notification
  type: notification
  command: "*SNINPT000000010000XXXX"  # XXXX = input index 1-9999
  params: []
  description: Pushed on input change. Codes - HDMI=00000001, Composite=00000003, Component=00000004, Screen Mirroring=00000005.

- id: volume_change_event
  label: Volume Change Notification
  type: notification
  command: "*SNVOLU{volume_param_16}"
  params:
    - name: volume_param_16
      type: string
      description: New volume value in 16-char zero-padded field.
  description: Pushed on volume change.

- id: mute_change_event
  label: Mute Change Notification
  type: notification
  command: "*SNAMUT0000000000000000"  # unmute=...0000, mute=...0001
  params: []
  description: Pushed on mute state change. Unmute = "*SNAMUT0000000000000000"; Mute = "*SNAMUT0000000000000001".

- id: picture_mute_change_event
  label: Picture Mute Change Notification
  type: notification
  command: "*SNPMUT0000000000000000"  # enabled=...0000, disabled=...0001 (per source)
  params: []
  description: Pushed on picture mute change. Source: param 0...0 = picture mute ENABLED; param 0...1 = picture mute DISABLED (note inverted semantics vs other commands).
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements. Monitor setup steps (enable Remote Device
# Control, enable Simple IP Control) are configuration, not safety interlocks.
```

## Notes
- Protocol name: SSIP (Simple IP Control). Sony BRAVIA Professional Displays proprietary.
- All messages exactly 24 bytes including trailing LF (0x0A). Implementations must append LF.
- Parameter padding: '#' = placeholder for no-param control/enquiry messages; '0' = decimal zero-pad for numeric values.
- Answer success = 16 '0' chars; Answer error = 16 'F' chars; "Not Found" / "Not available" = 16 'N' chars.
- Required monitor setup: [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely] ON; then [Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control] ON.
- EU RED-DA models: 3 specification tiers; settings and available commands differ. Details not in this source.
- Scene name strings are case-sensitive; right-pad with '#'.
- `firePictureMuteChange` Notify semantics are inverted relative to other PMUT messages (0=mute on, 1=mute off) per source rows 201-202.

<!-- UNRESOLVED: exact model variants covered (X8500B/C/F/G/H) not stated. -->
<!-- UNRESOLVED: volume value range (0-99 vs 0-100) not stated. -->
<!-- UNRESOLVED: LAN discovery / addressing mechanism not documented. -->
<!-- UNRESOLVED: maximum concurrent TCP connections not stated. -->
<!-- UNRESOLVED: command rate-limit / timing constraints not stated. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - pro.sony
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure
  - https://pro.sony/s3/2026/03/17145824/IPRemote_UserGuide_en.pdf
retrieved_at: 2026-06-20T15:46:51.806Z
last_checked_at: 2026-06-22T11:50:26.798Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-22T11:50:26.798Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions matched to source; wire-level tokens verified; transport parameters confirmed; IR code table fully represented. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact X8500 model variants (B/C/F/G/H) not enumerated in source. Firmware version not stated. EU RED-DA variants alter available commands but specifics undocumented here."
- "host/discovery mechanism not in source (monitor located on LAN)"
- "no additional settable variables documented in source."
- "no multi-step sequences described in source."
- "source contains no safety warnings, interlock procedures, or"
- "exact model variants covered (X8500B/C/F/G/H) not stated."
- "volume value range (0-99 vs 0-100) not stated."
- "LAN discovery / addressing mechanism not documented."
- "maximum concurrent TCP connections not stated."
- "command rate-limit / timing constraints not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
