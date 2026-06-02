---
spec_id: admin/sony-kdlw605-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW605 Series Control Spec"
manufacturer: Sony
model_family: "KDLW605 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW605 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T03:44:39.397Z
last_checked_at: 2026-06-02T05:46:24.699Z
generated_at: 2026-06-02T05:46:24.699Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version, EU RED-DA variant differences (3 spec types referenced but not enumerated in source)"
  - "no multi-step sequences described in source."
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
  - "- EU RED-DA variant differences (source notes 3 specification types but does not enumerate per-variant command availability)"
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:24.699Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions have literal wire-level matches in the source. Transport parameters (TCP port 20060, 24-byte framing, header/footer bytes) verified. One-to-one coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDLW605 Series Control Spec

## Summary
Sony BRAVIA Professional Display Simple IP Control protocol for the KDLW605 Series monitor. Fixed-length 24-byte ASCII messages over TCP port 20060 supporting power, volume, mute, input, picture mute, scene setting, IR code injection, and event notifications. Monitor must have Remote Device Control and Simple IP Control enabled in Settings → Network & Internet.

<!-- UNRESOLVED: firmware version, EU RED-DA variant differences (3 spec types referenced but not enumerated in source) -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
framing:
  type: fixed_length
  length_bytes: 24
  header: "0x2A 0x53"   # "*S"
  footer: "0x0A"        # LF
  message_type_byte_offset: 2
  command_byte_offset: 3
  command_length: 4
  parameter_byte_offset: 7
  parameter_length: 16
```

## Traits
```yaml
- powerable       # inferred from power command examples
- queryable       # inferred from query command examples
- routable        # inferred from input selection commands
- levelable       # inferred from volume control commands
```

## Actions
```yaml
# ---- Power ----
- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000\n"
  params: []

- id: power_on
  label: Power On (Active)
  kind: action
  command: "*SCPOWR0000000000000001\n"
  params: []

- id: power_toggle
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: power_status_query
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

# ---- Audio Volume ----
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}\n"   # volume: 16-digit decimal, left-padded with "0" (e.g. 0000000000000029)
  params:
    - name: volume
      type: string
      description: 16-character decimal string, left-padded with "0"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

# ---- Audio Mute ----
- id: audio_mute_off
  label: Audio Unmute
  kind: action
  command: "*SCAMUT0000000000000000\n"
  params: []

- id: audio_mute_on
  label: Audio Mute
  kind: action
  command: "*SCAMUT0000000000000001\n"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################\n"
  params: []

# ---- Input Selection ----
- id: set_input_hdmi
  label: Select HDMI Input
  kind: action
  command: "*SCINPT00000001{input}\n"   # input: 4-character decimal index, left-padded with "0" (HDMI 1-9999)
  params:
    - name: input
      type: integer
      description: HDMI input number (1-9999)

- id: set_input_composite
  label: Select Composite Input
  kind: action
  command: "*SCINPT00000003{input}\n"
  params:
    - name: input
      type: integer
      description: Composite input number (1-9999)

- id: set_input_component
  label: Select Component Input
  kind: action
  command: "*SCINPT00000004{input}\n"
  params:
    - name: input
      type: integer
      description: Component input number (1-9999)

- id: set_input_screen_mirroring
  label: Select Screen Mirroring Input
  kind: action
  command: "*SCINPT00000005{input}\n"
  params:
    - name: input
      type: integer
      description: Screen Mirroring input number (1-9999)

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

# ---- Picture Mute ----
- id: picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "*SCPMUT0000000000000000\n"
  params: []

- id: picture_mute_on
  label: Enable Picture Mute (screen black)
  kind: action
  command: "*SCPMUT0000000000000001\n"
  params: []

- id: picture_mute_toggle
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################\n"
  params: []

# ---- Scene Setting ----
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}\n"   # scene: case-sensitive ASCII, right-padded with "#" to 16 chars (e.g. auto24pSync#####)
  params:
    - name: scene
      type: string
      description: Scene name (auto / auto24pSync / general), right-padded with "#" to 16 characters

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

# ---- Network Info Queries ----
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADReth0############\n"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. eth0), right-padded with "#" to 16 characters

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############\n"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. eth0), right-padded with "#" to 16 characters

# ---- IR Code Injection (setIrccCode) ----
- id: ircc_display
  label: IR - Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  params: []

- id: ircc_home
  label: IR - Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  params: []

- id: ircc_options
  label: IR - Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  params: []

- id: ircc_return
  label: IR - Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  params: []

- id: ircc_up
  label: IR - Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  params: []

- id: ircc_down
  label: IR - Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  params: []

- id: ircc_right
  label: IR - Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  params: []

- id: ircc_left
  label: IR - Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  params: []

- id: ircc_confirm
  label: IR - Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  params: []

- id: ircc_red
  label: IR - Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  params: []

- id: ircc_green
  label: IR - Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  params: []

- id: ircc_yellow
  label: IR - Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  params: []

- id: ircc_blue
  label: IR - Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  params: []

- id: ircc_num1
  label: IR - Num 1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  params: []

- id: ircc_num2
  label: IR - Num 2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  params: []

- id: ircc_num3
  label: IR - Num 3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  params: []

- id: ircc_num4
  label: IR - Num 4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  params: []

- id: ircc_num5
  label: IR - Num 5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  params: []

- id: ircc_num6
  label: IR - Num 6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  params: []

- id: ircc_num7
  label: IR - Num 7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  params: []

- id: ircc_num8
  label: IR - Num 8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  params: []

- id: ircc_num9
  label: IR - Num 9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  params: []

- id: ircc_num0
  label: IR - Num 0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  params: []

- id: ircc_volume_up
  label: IR - Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  params: []

- id: ircc_volume_down
  label: IR - Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  params: []

- id: ircc_mute
  label: IR - Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  params: []

- id: ircc_channel_up
  label: IR - Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  params: []

- id: ircc_channel_down
  label: IR - Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  params: []

- id: ircc_subtitle
  label: IR - Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  params: []

- id: ircc_dot
  label: IR - DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  params: []

- id: ircc_picture_off
  label: IR - Picture Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  params: []

- id: ircc_wide
  label: IR - Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  params: []

- id: ircc_jump
  label: IR - Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  params: []

- id: ircc_sync_menu
  label: IR - Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  params: []

- id: ircc_forward
  label: IR - Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  params: []

- id: ircc_play
  label: IR - Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  params: []

- id: ircc_rewind
  label: IR - Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  params: []

- id: ircc_prev
  label: IR - Prev
  kind: action
  command: "*SCIRCC0000000000000080\n"
  params: []

- id: ircc_stop
  label: IR - Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  params: []

- id: ircc_next
  label: IR - Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  params: []

- id: ircc_pause
  label: IR - Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  params: []

- id: ircc_flash_plus
  label: IR - Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  params: []

- id: ircc_flash_minus
  label: IR - Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  params: []

- id: ircc_tv_power
  label: IR - TV Power
  kind: action
  command: "*SCIRCC0000000000000098\n"
  params: []

- id: ircc_audio
  label: IR - Audio
  kind: action
  command: "*SCIRCC0000000000000099\n"
  params: []

- id: ircc_input
  label: IR - Input
  kind: action
  command: "*SCIRCC0000000000000101\n"
  params: []

- id: ircc_sleep
  label: IR - Sleep
  kind: action
  command: "*SCIRCC0000000000000104\n"
  params: []

- id: ircc_sleep_timer
  label: IR - Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105\n"
  params: []

- id: ircc_video_2
  label: IR - Video 2
  kind: action
  command: "*SCIRCC0000000000000108\n"
  params: []

- id: ircc_picture_mode
  label: IR - Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110\n"
  params: []

- id: ircc_demo_surround
  label: IR - Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121\n"
  params: []

- id: ircc_hdmi_1
  label: IR - HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124\n"
  params: []

- id: ircc_hdmi_2
  label: IR - HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125\n"
  params: []

- id: ircc_hdmi_3
  label: IR - HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126\n"
  params: []

- id: ircc_hdmi_4
  label: IR - HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127\n"
  params: []

- id: ircc_action_menu
  label: IR - Action Menu
  kind: action
  command: "*SCIRCC0000000000000129\n"
  params: []

- id: ircc_help
  label: IR - Help
  kind: action
  command: "*SCIRCC0000000000000130\n"
  params: []
```

## Feedbacks
```yaml
# Answer message format: byte[2]='A', same 4-char FourCC as request, 16-byte parameter.
# Common success: 0000000000000000 ; common error: FFFFFFFFFFFFFFFF
- id: power_state
  type: enum
  values: [off, on]
  query_command: "*SEPOWR################\n"
  response_success: "*SAPOWR0000000000000000\n"   # off
  response_success_alt: "*SAPOWR0000000000000001\n"   # on
  response_error: "*SAPOWR{FFFFFFFFFFFFFFFF}\n"

- id: audio_volume
  type: integer
  query_command: "*SEVOLU################\n"
  response_format: "*SAVOLU{16-digit decimal}\n"
  response_error: "*SAVOLUFFFFFFFFFFFFFFFF\n"

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
  query_command: "*SEAMUT################\n"
  response_success: "*SAAMUT0000000000000000\n"
  response_success_alt: "*SAAMUT0000000000000001\n"
  response_error: "*SAAMUTFFFFFFFFFFFFFFFF\n"

- id: input_state
  type: structured
  query_command: "*SEINPT################\n"
  response_format: "*SAINPT{8-char input-type}{8-char index}\n"
  response_input_types:
    - "00000001": HDMI (1-9999)
    - "00000003": Composite (1-9999)
    - "00000004": Component (1-9999)
    - "00000005": Screen Mirroring (1-9999)
  response_error: "*SAINPTFFFFFFFFFFFFFFFF\n"

- id: picture_mute_state
  type: enum
  values: [off, on]
  query_command: "*SEPMUT################\n"
  response_success: "*SAPMUT0000000000000000\n"
  response_success_alt: "*SAPMUT0000000000000001\n"
  response_error: "*SAPMUTFFFFFFFFFFFFFFFF\n"

- id: scene_setting_state
  type: string
  query_command: "*SESCEN################\n"
  response_format: "*SASCEN{scene-name-right-padded-with-#}\n"
  response_not_available: "*SASCENNNNNNNNNNNNNNNNN\n"   # N×16 = not available for current input
  response_error: "*SASCENFFFFFFFFFFFFFFFF\n"

- id: broadcast_address
  type: string
  query_command: "*SEBADReth0############\n"
  response_format: "*SABADR{ipv4-right-padded-with-#}\n"   # e.g. 192.168.0.14####
  response_error: "*SABADRFFFFFFFFFFFFFFFF\n"

- id: mac_address
  type: string
  query_command: "*SEMADReth0############\n"
  response_format: "*SAMADR{12-char-mac}####\n"
  response_error: "*SAMADRFFFFFFFFFFFFFFFF\n"

- id: generic_control_ack
  type: enum
  values: [success, error]
  description: |
    Generic answer to any Control (C) request. Success = 16 zeros, Error = 16 F's.
    Applies to setPowerStatus, togglePowerStatus, setAudioVolume, setAudioMute,
    setInput, setPictureMute, togglePictureMute, setSceneSetting, setIrccCode.
  response_success: "{*SA}{FourCC}0000000000000000\n"
  response_error: "{*SA}{FourCC}FFFFFFFFFFFFFFFF\n"
  response_not_found: "{*SA}{FourCC}NNNNNNNNNNNNNNNN\n"   # setInput, setSceneSetting only
```

## Variables
```yaml
- id: audio_volume
  type: integer
  description: Audio volume value (16-digit decimal in parameter field).
  set_command: "*SCVOLU{volume}\n"
  get_command: "*SEVOLU################\n"

- id: scene_setting
  type: string
  description: Scene setting name (case-sensitive). Documented values - auto, auto24pSync, general.
  set_command: "*SCSCEN{scene-right-padded-with-#}\n"
  get_command: "*SESCEN################\n"
```

## Events
```yaml
# Notify messages (byte[2]='N') sent unsolicited Monitor→Client.
- id: power_change
  description: Sent when monitor power state changes.
  notify_off: "*SNPOWR0000000000000000\n"
  notify_on:  "*SNPOWR0000000000000001\n"

- id: input_change
  description: Sent when input source changes.
  notify_format: "*SNINPT{8-char input-type}{8-char index}\n"
  input_types:
    - "00000000": (no input selected)
    - "00000001": HDMI (1-9999)
    - "00000003": Composite (1-9999)
    - "00000004": Component (1-9999)
    - "00000005": Screen Mirroring (1-9999)

- id: volume_change
  description: Sent when audio volume changes.
  notify_format: "*SNVOLU{16-digit decimal volume}\n"

- id: mute_change
  description: Sent when audio mute changes.
  notify_unmute: "*SNAMUT0000000000000000\n"
  notify_mute:   "*SNAMUT0000000000000001\n"

- id: picture_mute_change
  description: Sent when picture mute changes.
  notify_enabled:  "*SNPMUT0000000000000000\n"   # source: "Sent when picture mute is enabled."
  notify_disabled: "*SNPMUT0000000000000001\n"   # source: "Sent when picture mute is disabled."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source.
```

## Notes
- Transport: TCP port 20060. Every message is exactly 24 bytes: header `*S` (2) + message type (1) + FourCC command (4) + 16-byte parameter + LF (1).
- Message types: `C` = Control (client→monitor), `E` = Enquiry (client→monitor), `A` = Answer (monitor→client), `N` = Notify (monitor→client unsolicited).
- Parameter padding: numeric parameters are decimal ASCII left-padded with `0`; string parameters (scene name, interface name) are right-padded with `#`; "no parameter" enquiries and toggles use `#` × 16.
- Common answer parameters: `0…0` = success, `F…F` = error, `N…N` = not found / not available (only documented for setInput and setSceneSetting answers).
- Pre-conditions: monitor must have [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely] enabled and [Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control] enabled.
- IR codes are injected via `setIrccCode` (FourCC `IRCC`); each documented IR row in the source is enumerated as a separate action above.
- Input numbering: 4-digit decimal `XXXX` represents the input index (1–9999); the preceding 4-digit field selects input type (`0001` HDMI, `0003` Composite, `0004` Component, `0005` Screen Mirroring).

<!-- UNRESOLVED:
- EU RED-DA variant differences (source notes 3 specification types but does not enumerate per-variant command availability)
- Whether Notify events require client subscription/registration (source documents only the notify formats, not enablement)
- Firmware version compatibility range
- Exact reset behaviour, timing constraints between commands, and reconnection policy
-->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T03:44:39.397Z
last_checked_at: 2026-06-02T05:46:24.699Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:24.699Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions have literal wire-level matches in the source. Transport parameters (TCP port 20060, 24-byte framing, header/footer bytes) verified. One-to-one coverage achieved. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version, EU RED-DA variant differences (3 spec types referenced but not enumerated in source)"
- "no multi-step sequences described in source."
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source."
- "- EU RED-DA variant differences (source notes 3 specification types but does not enumerate per-variant command availability)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
