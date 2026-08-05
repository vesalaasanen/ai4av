---
spec_id: admin/sony-ke-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KE Series Control Spec"
manufacturer: Sony
model_family: "KE Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KE Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-07-31T13:59:01.487Z
last_checked_at: 2026-08-05T08:46:49.891Z
generated_at: 2026-08-05T08:46:49.891Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol version and firmware compatibility not stated in source."
  - "source describes no multi-step command sequences"
  - "source states no safety warnings, interlocks, or power sequencing requirements"
  - "exact KE Series model list, firmware compatibility, authentication requirements, command timing, connection limits, and fault-recovery behavior are not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:46:49.891Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions map to source: 17 main commands, 57 IR codes under setIrccCode, and 5 fire* notify events in Events; port 20060 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-31
---

# Sony KE Series Control Spec

## Summary

Sony KE Series monitors support Simple IP Control over TCP. Protocol uses TCP port 20060 and fixed-size 24-byte messages for control, enquiry, answer, and unsolicited notification traffic.

<!-- UNRESOLVED: protocol version and firmware compatibility not stated in source. -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

Messages contain 24 bytes:

- Bytes 0–1: fixed header `*S` (`0x2A 0x53`)
- Byte 2: message type (`C`, `E`, `A`, or `N`)
- Bytes 3–6: four-character command
- Bytes 7–22: 16-character parameter
- Byte 23: fixed LF footer (`0x0A`)

## Traits

```yaml
- powerable  # inferred from power commands
- routable  # inferred from input-routing commands
- queryable  # inferred from enquiry commands
- levelable  # supported by audio-volume command
```

## Actions

```yaml
- id: set_ircc_code
  label: Send IRCC Code
  kind: action
  command: "*SCIRCC{code}\n"
  params:
    - name: code
      type: string
      description: 16-character IR command code from documented IR command table

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}\n"
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000"
        - "0000000000000001"
      description: "0000000000000000 = standby/off; 0000000000000001 = active/on"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}\n"
  params:
    - name: volume
      type: string
      description: Decimal volume value left-padded with zeros to 16 characters

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}\n"
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000"
        - "0000000000000001"
      description: "0000000000000000 = unmuted; 0000000000000001 = muted"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT{input}\n"
  params:
    - name: input
      type: string
      description: "16-character input parameter: 000000010000XXXX = HDMI, 000000030000XXXX = Composite, 000000040000XXXX = Component, 000000050000XXXX = Screen Mirroring; XXXX is 1-9999"

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}\n"
  params:
    - name: state
      type: enum
      values:
        - "0000000000000000"
        - "0000000000000001"
      description: "0000000000000000 = picture mute disabled; 0000000000000001 = picture mute enabled"

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

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}\n"
  params:
    - name: scene
      type: enum
      values:
        - auto
        - auto24pSync
        - general
      description: Case-sensitive value right-padded with "#" to 16 characters

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############\n"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############\n"
  params: []

- id: ir_display
  label: IR Display
  kind: action
  command: "*SCIRCC0000000000000005\n"
  params: []

- id: ir_home
  label: IR Home
  kind: action
  command: "*SCIRCC0000000000000006\n"
  params: []

- id: ir_options
  label: IR Options
  kind: action
  command: "*SCIRCC0000000000000007\n"
  params: []

- id: ir_return
  label: IR Return
  kind: action
  command: "*SCIRCC0000000000000008\n"
  params: []

- id: ir_up
  label: IR Up
  kind: action
  command: "*SCIRCC0000000000000009\n"
  params: []

- id: ir_down
  label: IR Down
  kind: action
  command: "*SCIRCC0000000000000010\n"
  params: []

- id: ir_right
  label: IR Right
  kind: action
  command: "*SCIRCC0000000000000011\n"
  params: []

- id: ir_left
  label: IR Left
  kind: action
  command: "*SCIRCC0000000000000012\n"
  params: []

- id: ir_confirm
  label: IR Confirm
  kind: action
  command: "*SCIRCC0000000000000013\n"
  params: []

- id: ir_red
  label: IR Red
  kind: action
  command: "*SCIRCC0000000000000014\n"
  params: []

- id: ir_green
  label: IR Green
  kind: action
  command: "*SCIRCC0000000000000015\n"
  params: []

- id: ir_yellow
  label: IR Yellow
  kind: action
  command: "*SCIRCC0000000000000016\n"
  params: []

- id: ir_blue
  label: IR Blue
  kind: action
  command: "*SCIRCC0000000000000017\n"
  params: []

- id: ir_num_1
  label: IR Number 1
  kind: action
  command: "*SCIRCC0000000000000018\n"
  params: []

- id: ir_num_2
  label: IR Number 2
  kind: action
  command: "*SCIRCC0000000000000019\n"
  params: []

- id: ir_num_3
  label: IR Number 3
  kind: action
  command: "*SCIRCC0000000000000020\n"
  params: []

- id: ir_num_4
  label: IR Number 4
  kind: action
  command: "*SCIRCC0000000000000021\n"
  params: []

- id: ir_num_5
  label: IR Number 5
  kind: action
  command: "*SCIRCC0000000000000022\n"
  params: []

- id: ir_num_6
  label: IR Number 6
  kind: action
  command: "*SCIRCC0000000000000023\n"
  params: []

- id: ir_num_7
  label: IR Number 7
  kind: action
  command: "*SCIRCC0000000000000024\n"
  params: []

- id: ir_num_8
  label: IR Number 8
  kind: action
  command: "*SCIRCC0000000000000025\n"
  params: []

- id: ir_num_9
  label: IR Number 9
  kind: action
  command: "*SCIRCC0000000000000026\n"
  params: []

- id: ir_num_0
  label: IR Number 0
  kind: action
  command: "*SCIRCC0000000000000027\n"
  params: []

- id: ir_volume_up
  label: IR Volume Up
  kind: action
  command: "*SCIRCC0000000000000030\n"
  params: []

- id: ir_volume_down
  label: IR Volume Down
  kind: action
  command: "*SCIRCC0000000000000031\n"
  params: []

- id: ir_mute
  label: IR Mute
  kind: action
  command: "*SCIRCC0000000000000032\n"
  params: []

- id: ir_channel_up
  label: IR Channel Up
  kind: action
  command: "*SCIRCC0000000000000033\n"
  params: []

- id: ir_channel_down
  label: IR Channel Down
  kind: action
  command: "*SCIRCC0000000000000034\n"
  params: []

- id: ir_subtitle
  label: IR Subtitle
  kind: action
  command: "*SCIRCC0000000000000035\n"
  params: []

- id: ir_dot
  label: IR DOT
  kind: action
  command: "*SCIRCC0000000000000038\n"
  params: []

- id: ir_picture_off
  label: IR Picture Off
  kind: action
  command: "*SCIRCC0000000000000050\n"
  params: []

- id: ir_wide
  label: IR Wide
  kind: action
  command: "*SCIRCC0000000000000061\n"
  params: []

- id: ir_jump
  label: IR Jump
  kind: action
  command: "*SCIRCC0000000000000062\n"
  params: []

- id: ir_sync_menu
  label: IR Sync Menu
  kind: action
  command: "*SCIRCC0000000000000076\n"
  params: []

- id: ir_forward
  label: IR Forward
  kind: action
  command: "*SCIRCC0000000000000077\n"
  params: []

- id: ir_play
  label: IR Play
  kind: action
  command: "*SCIRCC0000000000000078\n"
  params: []

- id: ir_rewind
  label: IR Rewind
  kind: action
  command: "*SCIRCC0000000000000079\n"
  params: []

- id: ir_previous
  label: IR Previous
  kind: action
  command: "*SCIRCC0000000000000080\n"
  params: []

- id: ir_stop
  label: IR Stop
  kind: action
  command: "*SCIRCC0000000000000081\n"
  params: []

- id: ir_next
  label: IR Next
  kind: action
  command: "*SCIRCC0000000000000082\n"
  params: []

- id: ir_pause
  label: IR Pause
  kind: action
  command: "*SCIRCC0000000000000084\n"
  params: []

- id: ir_flash_plus
  label: IR Flash Plus
  kind: action
  command: "*SCIRCC0000000000000086\n"
  params: []

- id: ir_flash_minus
  label: IR Flash Minus
  kind: action
  command: "*SCIRCC0000000000000087\n"
  params: []

- id: ir_tv_power
  label: IR TV Power
  kind: action
  command: "*SCIRCC0000000000000098\n"
  params: []

- id: ir_audio
  label: IR Audio
  kind: action
  command: "*SCIRCC0000000000000099\n"
  params: []

- id: ir_input
  label: IR Input
  kind: action
  command: "*SCIRCC0000000000000101\n"
  params: []

- id: ir_sleep
  label: IR Sleep
  kind: action
  command: "*SCIRCC0000000000000104\n"
  params: []

- id: ir_sleep_timer
  label: IR Sleep Timer
  kind: action
  command: "*SCIRCC0000000000000105\n"
  params: []

- id: ir_video_2
  label: IR Video 2
  kind: action
  command: "*SCIRCC0000000000000108\n"
  params: []

- id: ir_picture_mode
  label: IR Picture Mode
  kind: action
  command: "*SCIRCC0000000000000110\n"
  params: []

- id: ir_demo_surround
  label: IR Demo Surround
  kind: action
  command: "*SCIRCC0000000000000121\n"
  params: []

- id: ir_hdmi_1
  label: IR HDMI 1
  kind: action
  command: "*SCIRCC0000000000000124\n"
  params: []

- id: ir_hdmi_2
  label: IR HDMI 2
  kind: action
  command: "*SCIRCC0000000000000125\n"
  params: []

- id: ir_hdmi_3
  label: IR HDMI 3
  kind: action
  command: "*SCIRCC0000000000000126\n"
  params: []

- id: ir_hdmi_4
  label: IR HDMI 4
  kind: action
  command: "*SCIRCC0000000000000127\n"
  params: []

- id: ir_action_menu
  label: IR Action Menu
  kind: action
  command: "*SCIRCC0000000000000129\n"
  params: []

- id: ir_help
  label: IR Help
  kind: action
  command: "*SCIRCC0000000000000130\n"
  params: []
```

## Feedbacks

```yaml
- id: command_result
  type: enum
  values:
    - success
    - error
  responses:
    success: "*SA{command}0000000000000000\n"
    error: "*SA{command}FFFFFFFFFFFFFFFF\n"

- id: power_state
  type: enum
  values:
    - standby
    - active
  responses:
    standby: "*SAPOWR0000000000000000\n"
    active: "*SAPOWR0000000000000001\n"
    error: "*SAPOWRFFFFFFFFFFFFFFFF\n"

- id: audio_volume
  type: integer
  response: "*SAVOLU{volume}\n"
  description: Volume value occupies 16-character parameter field

- id: audio_mute
  type: enum
  values:
    - not_muted
    - muted
  responses:
    not_muted: "*SAAMUT0000000000000000\n"
    muted: "*SAAMUT0000000000000001\n"
    error: "*SAAMUTFFFFFFFFFFFFFFFF\n"

- id: input
  type: string
  response: "*SAINPT{input}\n"
  description: Input category and number occupy 16-character parameter field

- id: set_input_result
  type: enum
  values:
    - success
    - not_found
    - error
  responses:
    success: "*SAINPT0000000000000000\n"
    not_found: "*SAINPTNNNNNNNNNNNNNNNN\n"
    error: "*SAINPTFFFFFFFFFFFFFFFF\n"

- id: picture_mute
  type: enum
  values:
    - disabled
    - enabled
  responses:
    disabled: "*SAPMUT0000000000000000\n"
    enabled: "*SAPMUT0000000000000001\n"
    error: "*SAPMUTFFFFFFFFFFFFFFFF\n"

- id: scene_setting
  type: string
  response: "*SASCEN{scene}\n"
  description: Case-sensitive value right-padded with "#" to 16 characters

- id: scene_setting_result
  type: enum
  values:
    - success
    - unavailable
    - error
  responses:
    success: "*SASCEN0000000000000000\n"
    unavailable: "*SASCENNNNNNNNNNNNNNNNN\n"
    error: "*SASCENFFFFFFFFFFFFFFFF\n"

- id: broadcast_address
  type: string
  response: "*SABADR{address}\n"
  description: Broadcast IPv4 address right-padded with "#" to 16 characters

- id: mac_address
  type: string
  response: "*SAMADR{address}\n"
  description: MAC address right-padded with "#" to 16 characters
```

## Variables

```yaml
- id: audio_volume
  type: integer
  encoding: decimal_string
  width: 16
  padding: left_zero

- id: input
  type: string
  values:
    - hdmi
    - composite
    - component
    - screen_mirroring
  number_range: "1-9999"

- id: scene_setting
  type: enum
  values:
    - auto
    - auto24pSync
    - general
  case_sensitive: true
  width: 16
  padding: right_hash
```

## Events

```yaml
- id: power_change
  command: POWR
  message_type: N
  payloads:
    standby: "0000000000000000"
    active: "0000000000000001"

- id: input_change
  command: INPT
  message_type: N
  description: Reports monitor input changes, including HDMI, Composite, Component, and Screen Mirroring

- id: volume_change
  command: VOLU
  message_type: N
  payload: "{volume}"

- id: mute_change
  command: AMUT
  message_type: N
  payloads:
    unmuted: "0000000000000000"
    muted: "0000000000000001"

- id: picture_mute_change
  command: PMUT
  message_type: N
  payloads:
    enabled: "0000000000000000"
    disabled: "0000000000000001"
```

## Macros

```yaml
# UNRESOLVED: source describes no multi-step command sequences
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source states no safety warnings, interlocks, or power sequencing requirements
```

## Notes

Remote device control and Simple IP Control must both be enabled in monitor network settings before commands can be used. Wired and wireless LAN connections are supported. `setSceneSetting` and `getSceneSetting` are not supported on BZ40P, BZ35P, and BZ30P models. EU-area models have three RED-DA-dependent specifications; available settings and commands vary by specification.

<!-- UNRESOLVED: exact KE Series model list, firmware compatibility, authentication requirements, command timing, connection limits, and fault-recovery behavior are not stated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-07-31T13:59:01.487Z
last_checked_at: 2026-08-05T08:46:49.891Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:46:49.891Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions map to source: 17 main commands, 57 IR codes under setIrccCode, and 5 fire* notify events in Events; port 20060 confirmed verbatim. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol version and firmware compatibility not stated in source."
- "source describes no multi-step command sequences"
- "source states no safety warnings, interlocks, or power sequencing requirements"
- "exact KE Series model list, firmware compatibility, authentication requirements, command timing, connection limits, and fault-recovery behavior are not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
