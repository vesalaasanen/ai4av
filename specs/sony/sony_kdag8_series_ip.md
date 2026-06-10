---
spec_id: admin/sony-kdag8-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDAG8 Series Control Spec"
manufacturer: Sony
model_family: "KDAG8 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDAG8 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T14:23:33.984Z
last_checked_at: 2026-06-09T07:17:41.506Z
generated_at: 2026-06-09T07:17:41.506Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source notes EU models have 3 RED-DA compliance variants with differing settings/commands; specific command availability per variant not documented in this excerpt."
  - "source does not document multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "volume value range/min/max not stated in source."
  - "EU RED-DA variant command-availability matrix not in this excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:17:41.506Z
  matched_actions: 74
  action_count: 74
  confidence: medium
  summary: "All 74 spec actions verified in source; complete command coverage with transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDAG8 Series Control Spec

## Summary
BRAVIA Professional Displays KDAG8 Series monitor controlled over TCP via Sony's SSIP (Simple IP Control) protocol on port 20060. Messages are fixed 24-byte frames using 4-character command mnemonics. Source includes power, volume, mute, input, picture mute, scene setting, IR passthrough, and broadcast/MAC address queries.

<!-- UNRESOLVED: source notes EU models have 3 RED-DA compliance variants with differing settings/commands; specific command availability per variant not documented in this excerpt. -->

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
- powerable   # inferred: setPowerStatus, getPowerStatus, togglePowerStatus
- routable    # inferred: setInput, getInput
- queryable   # inferred: getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable   # inferred: setAudioVolume, getAudioVolume
```

## Actions
```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{state}"
  params:
    - name: state
      type: integer
      description: "0 = Standby (Off), 1 = Active (On); left-pad the 16-byte param field with '0'"
  notes: |
    Header *S (0x2A 0x53), msgType 'C' (0x43), FourCC 'POWR', 16-byte param, footer 0x0A. Total 24 bytes.
    Examples: *SCPOWR0000000000000000 (Off), *SCPOWR0000000000000001 (On).

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []
  notes: "Response: 0 = Standby, 1 = Active, F...F = Error."

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []
  notes: "FourCC 'TPOW'."

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume}"
  params:
    - name: volume
      type: integer
      description: "Volume value, decimal ASCII, right-justified in 16-byte param, pad left with '0'. Example: 0000000000000029"
  notes: "FourCC 'VOLU'."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []
  notes: "Response: ASCII volume value padded with 'X' (source uses X placeholders) right-padded."

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{state}"
  params:
    - name: state
      type: integer
      description: "0 = Unmute, 1 = Mute"
  notes: "FourCC 'AMUT'."

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []
  notes: "Response: 0 = Not Muted, 1 = Muted, F...F = Error."

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000{type}000{port}"
  params:
    - name: type
      type: integer
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring"
    - name: port
      type: integer
      description: "Port number 1-9999, right-justified in 4-byte field, pad left with '0' (per source: XXXX placeholders)"
  notes: |
    FourCC 'INPT'. Param layout per source: 0000000{type}000{port} (16 bytes).
    0000000 = type code digit, then 000{port}.

- id: get_input
  label: Get Input
  kind: query
  command: "*SEINPT################"
  params: []
  notes: "Response: type digit (1/3/4/5) at byte 8, port in trailing 4 bytes (XXXX)."

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{state}"
  params:
    - name: state
      type: integer
      description: "0 = Disable picture mute, 1 = Turn screen black (picture mute)"
  notes: "FourCC 'PMUT'."

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []
  notes: "Response: 0 = Disabled, 1 = Enabled, F...F = Error."

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []
  notes: "FourCC 'TPMU'."

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value}#########"
  params:
    - name: value
      type: string
      description: "Case-sensitive scene name, right-padded with '#' to fill 16 bytes. Values: auto, auto24pSync, general. Example: auto24pSync#####"
  notes: "FourCC 'SCEN'."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []
  notes: "Response: scene name right-padded with X; N...N = not available for current input; F...F = Error."

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ircc_code}"
  params:
    - name: ircc_code
      type: string
      description: "2-digit IRCC code from the IR Commands table, right-justified in 16-byte param. Example: Display = 0000000000000005"
  notes: "FourCC 'IRCC'. IRCC table below."

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADREth0###########"
  params: []
  notes: |
    FourCC 'BADR', interface 'eth0' literal in param bytes 1-4. Response: IPv4 address in dotted notation
    right-padded with '#'. Example: 192.168.0.14####. F...F = Error.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADREth0###########"
  params: []
  notes: |
    FourCC 'MADR', interface 'eth0' literal in param bytes 1-4. Response: MAC address right-padded with '#'.
    F...F = Error.

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
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus response 0/1
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: getAudioMute response 0/1
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: getPictureMute response 0/1
- id: current_input
  type: object
  fields:
    - name: type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
    - name: port
      type: integer
      range: "1-9999"
  source: getInput response
- id: scene_setting
  type: string
  values: [auto, auto24pSync, general]
  source: getSceneSetting response
- id: broadcast_address
  type: string
  source: getBroadcastAddress response
- id: mac_address
  type: string
  source: getMacAddress response
```

## Variables
```yaml
- id: audio_volume
  type: integer
  source: setAudioVolume / getAudioVolume
  notes: "Decimal ASCII volume, right-justified in 16-byte param field."
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [standby, active]
  source: "Notify message '*SNPOWR...', FourCC 'POWR', param byte 16 = 0/1"
  description: Sent by monitor on power state change.
- id: fire_input_change
  type: object
  fields:
    - name: type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
    - name: port
      type: integer
      range: "1-9999"
  source: "Notify '*SNINPT...', FourCC 'INPT'"
  description: Sent by monitor when input changes.
- id: fire_volume_change
  type: integer
  source: "Notify '*SNVOLU...', FourCC 'VOLU'"
  description: Sent by monitor on volume change.
- id: fire_mute_change
  type: enum
  values: [unmuted, muted]
  source: "Notify '*SNAMUT...', FourCC 'AMUT'"
  description: Sent by monitor on mute state change.
- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  source: "Notify '*SNPMUT...', FourCC 'PMUT'"
  description: Sent by monitor on picture mute state change.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
Protocol uses fixed 24-byte ASCII frames: `*S` header (0x2A 0x53) + msgType (C/E/A/N) + 4-char FourCC + 16-byte params + LF (0x0A) footer. Control messages use 'C', queries use 'E', replies use 'A', unsolicited notifications use 'N'. Successful 'A' replies pad params with '0', errors with 'F' (hex F = 0x46). Source notes EU-area models have 3 RED-DA compliance variants; command availability may differ per variant. Monitor must have "Control remotely" and "Simple IP control" enabled in network settings before TCP port 20060 accepts connections.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: volume value range/min/max not stated in source. -->
<!-- UNRESOLVED: EU RED-DA variant command-availability matrix not in this excerpt. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T14:23:33.984Z
last_checked_at: 2026-06-09T07:17:41.506Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:17:41.506Z
matched_actions: 74
action_count: 74
confidence: medium
summary: "All 74 spec actions verified in source; complete command coverage with transport parameters confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source notes EU models have 3 RED-DA compliance variants with differing settings/commands; specific command availability per variant not documented in this excerpt."
- "source does not document multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "volume value range/min/max not stated in source."
- "EU RED-DA variant command-availability matrix not in this excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
