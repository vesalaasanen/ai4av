---
spec_id: admin/sony-kdx8066-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8066 Series Control Spec"
manufacturer: Sony
model_family: "Sony BRAVIA Professional Display"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony BRAVIA Professional Display"
    - KD-49X8066D
    - KD-55X8066E
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-26T19:50:47.130Z
last_checked_at: 2026-06-02T06:13:10.911Z
generated_at: 2026-06-02T06:13:10.911Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "KDX8066 series model identifiers (KD-49X8066D, KD-55X8066E) are not explicitly named in the source; the source documents the generic BRAVIA Professional Displays Simple IP Control protocol which is shared across the BRAVIA TV family. EU-area RED-DA-compliant variants may restrict the available command set."
  - "numeric volume range not stated in source"
  - "source does not define settable parameters outside the discrete"
  - "source documents no multi-step macro sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility; numeric range for audio volume; behavior on dropped/partial frames; max simultaneous client connections to TCP 20060; KDX8066-series-specific deviations (if any) from the generic BRAVIA Simple IP Control protocol; whether RED-DA reduced command set applies to KDX8066 EU SKUs."
verification:
  verdict: verified
  checked_at: 2026-06-02T06:13:10.911Z
  matched_actions: 79
  action_count: 79
  confidence: medium
  summary: "All 79 spec actions matched verbatim to source; transport (TCP 20060, no auth) verified; 45 IR codes fully enumerated. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDX8066 Series Control Spec

## Summary
Sony BRAVIA Simple IP Control (SSIP) over TCP/IP for the KDX8066 series displays. Uses 24-byte fixed-size message frames on TCP port 20060 with FourCC opcodes for power, input, volume, mute, picture mute, scene, IR pass-through, and unsolicited state notifications.

<!-- UNRESOLVED: KDX8066 series model identifiers (KD-49X8066D, KD-55X8066E) are not explicitly named in the source; the source documents the generic BRAVIA Professional Displays Simple IP Control protocol which is shared across the BRAVIA TV family. EU-area RED-DA-compliant variants may restrict the available command set. -->

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
- powerable     # inferred from setPowerStatus/togglePowerStatus commands
- routable      # inferred from setInput commands across HDMI/Composite/Component/Screen Mirroring
- queryable     # inferred from getPowerStatus/getAudioVolume/getAudioMute/getInput/getPictureMute/getSceneSetting/getBroadcastAddress/getMacAddress
- levelable     # inferred from setAudioVolume command
```

## Actions
```yaml
# Protocol note: every command literal below is the ASCII content of a 24-byte
# fixed-length frame: header "*S" (0x2A 0x53) + 1-byte message type
# (C=Control, E=Enquiry, A=Answer, N=Notify) + 4-byte FourCC + 16-byte
# parameter + footer 0x0A (LF). The trailing LF is omitted from the
# `command` strings for readability - implementations MUST append 0x0A.

# ---------- Power ----------
- id: set_power_on
  label: Set Power On
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: set_power_off
  label: Set Power Off (Standby)
  kind: action
  command: "*SCPOWR0000000000000000"
  params: []

- id: toggle_power
  label: Toggle Power
  kind: action
  command: "*SCTPOW################"
  params: []

- id: get_power_status
  label: Power Status Query
  kind: query
  command: "*SEPOWR################"
  params: []

# ---------- Audio Volume ----------
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level}"
  params:
    - name: level
      type: string
      description: "Volume value as decimal digits, left-padded with '0' to 16 characters. Example: 29 -> 0000000000000029."

- id: get_audio_volume
  label: Audio Volume Query
  kind: query
  command: "*SEVOLU################"
  params: []

# ---------- Audio Mute ----------
- id: set_audio_mute_on
  label: Mute Audio
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

- id: set_audio_mute_off
  label: Unmute Audio
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: get_audio_mute
  label: Audio Mute Query
  kind: query
  command: "*SEAMUT################"
  params: []

# ---------- Input Selection ----------
- id: set_input_hdmi
  label: Select HDMI Input
  kind: action
  command: "*SCINPT00000001{index}"
  params:
    - name: index
      type: string
      description: "HDMI input index 0001-9999, 4-character zero-padded decimal."

- id: set_input_composite
  label: Select Composite Input
  kind: action
  command: "*SCINPT00000003{index}"
  params:
    - name: index
      type: string
      description: "Composite input index 0001-9999, 4-character zero-padded decimal."

- id: set_input_component
  label: Select Component Input
  kind: action
  command: "*SCINPT00000004{index}"
  params:
    - name: index
      type: string
      description: "Component input index 0001-9999, 4-character zero-padded decimal."

- id: set_input_screen_mirroring
  label: Select Screen Mirroring Input
  kind: action
  command: "*SCINPT00000005{index}"
  params:
    - name: index
      type: string
      description: "Screen Mirroring input index 0001-9999, 4-character zero-padded decimal."

- id: get_input
  label: Current Input Query
  kind: query
  command: "*SEINPT################"
  params: []

# ---------- Picture Mute ----------
- id: set_picture_mute_on
  label: Enable Picture Mute (Screen Black)
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: get_picture_mute
  label: Picture Mute Query
  kind: query
  command: "*SEPMUT################"
  params: []

# ---------- Scene Setting ----------
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene}"
  params:
    - name: scene
      type: enum
      values: [auto, auto24pSync, general]
      description: "Scene name (case-sensitive), right-padded with '#' to 16 characters. Example: auto24pSync#####."

- id: get_scene_setting
  label: Scene Setting Query
  kind: query
  command: "*SESCEN################"
  params: []

# ---------- Network Information ----------
- id: get_broadcast_address
  label: Broadcast IPv4 Address Query
  kind: query
  command: "*SEBADReth0############"
  params:
    - name: interface
      type: string
      description: "Network interface name, right-padded with '#' to fill 16-byte parameter. Source documents 'eth0'."

- id: get_mac_address
  label: MAC Address Query
  kind: query
  command: "*SEMADReth0############"
  params:
    - name: interface
      type: string
      description: "Network interface name, right-padded with '#' to fill 16-byte parameter. Source documents 'eth0'."

# ---------- IR Code Pass-Through (setIrccCode) ----------
# Each entry below is one named IR code documented in the source's "IR Commands"
# sub-table, sent via the IRCC FourCC opcode with a distinct 16-digit code value.

- id: ir_display
  label: "IR: Display"
  kind: action
  command: "*SCIRCC0000000000000005"
  params: []

- id: ir_home
  label: "IR: Home"
  kind: action
  command: "*SCIRCC0000000000000006"
  params: []

- id: ir_options
  label: "IR: Options"
  kind: action
  command: "*SCIRCC0000000000000007"
  params: []

- id: ir_return
  label: "IR: Return"
  kind: action
  command: "*SCIRCC0000000000000008"
  params: []

- id: ir_up
  label: "IR: Up"
  kind: action
  command: "*SCIRCC0000000000000009"
  params: []

- id: ir_down
  label: "IR: Down"
  kind: action
  command: "*SCIRCC0000000000000010"
  params: []

- id: ir_right
  label: "IR: Right"
  kind: action
  command: "*SCIRCC0000000000000011"
  params: []

- id: ir_left
  label: "IR: Left"
  kind: action
  command: "*SCIRCC0000000000000012"
  params: []

- id: ir_confirm
  label: "IR: Confirm"
  kind: action
  command: "*SCIRCC0000000000000013"
  params: []

- id: ir_red
  label: "IR: Red"
  kind: action
  command: "*SCIRCC0000000000000014"
  params: []

- id: ir_green
  label: "IR: Green"
  kind: action
  command: "*SCIRCC0000000000000015"
  params: []

- id: ir_yellow
  label: "IR: Yellow"
  kind: action
  command: "*SCIRCC0000000000000016"
  params: []

- id: ir_blue
  label: "IR: Blue"
  kind: action
  command: "*SCIRCC0000000000000017"
  params: []

- id: ir_num1
  label: "IR: Num1"
  kind: action
  command: "*SCIRCC0000000000000018"
  params: []

- id: ir_num2
  label: "IR: Num2"
  kind: action
  command: "*SCIRCC0000000000000019"
  params: []

- id: ir_num3
  label: "IR: Num3"
  kind: action
  command: "*SCIRCC0000000000000020"
  params: []

- id: ir_num4
  label: "IR: Num4"
  kind: action
  command: "*SCIRCC0000000000000021"
  params: []

- id: ir_num5
  label: "IR: Num5"
  kind: action
  command: "*SCIRCC0000000000000022"
  params: []

- id: ir_num6
  label: "IR: Num6"
  kind: action
  command: "*SCIRCC0000000000000023"
  params: []

- id: ir_num7
  label: "IR: Num7"
  kind: action
  command: "*SCIRCC0000000000000024"
  params: []

- id: ir_num8
  label: "IR: Num8"
  kind: action
  command: "*SCIRCC0000000000000025"
  params: []

- id: ir_num9
  label: "IR: Num9"
  kind: action
  command: "*SCIRCC0000000000000026"
  params: []

- id: ir_num0
  label: "IR: Num0"
  kind: action
  command: "*SCIRCC0000000000000027"
  params: []

- id: ir_volume_up
  label: "IR: Volume Up"
  kind: action
  command: "*SCIRCC0000000000000030"
  params: []

- id: ir_volume_down
  label: "IR: Volume Down"
  kind: action
  command: "*SCIRCC0000000000000031"
  params: []

- id: ir_mute
  label: "IR: Mute"
  kind: action
  command: "*SCIRCC0000000000000032"
  params: []

- id: ir_channel_up
  label: "IR: Channel Up"
  kind: action
  command: "*SCIRCC0000000000000033"
  params: []

- id: ir_channel_down
  label: "IR: Channel Down"
  kind: action
  command: "*SCIRCC0000000000000034"
  params: []

- id: ir_subtitle
  label: "IR: Subtitle"
  kind: action
  command: "*SCIRCC0000000000000035"
  params: []

- id: ir_dot
  label: "IR: DOT"
  kind: action
  command: "*SCIRCC0000000000000038"
  params: []

- id: ir_picture_off
  label: "IR: Picture Off"
  kind: action
  command: "*SCIRCC0000000000000050"
  params: []

- id: ir_wide
  label: "IR: Wide"
  kind: action
  command: "*SCIRCC0000000000000061"
  params: []

- id: ir_jump
  label: "IR: Jump"
  kind: action
  command: "*SCIRCC0000000000000062"
  params: []

- id: ir_sync_menu
  label: "IR: Sync Menu"
  kind: action
  command: "*SCIRCC0000000000000076"
  params: []

- id: ir_forward
  label: "IR: Forward"
  kind: action
  command: "*SCIRCC0000000000000077"
  params: []

- id: ir_play
  label: "IR: Play"
  kind: action
  command: "*SCIRCC0000000000000078"
  params: []

- id: ir_rewind
  label: "IR: Rewind"
  kind: action
  command: "*SCIRCC0000000000000079"
  params: []

- id: ir_prev
  label: "IR: Prev"
  kind: action
  command: "*SCIRCC0000000000000080"
  params: []

- id: ir_stop
  label: "IR: Stop"
  kind: action
  command: "*SCIRCC0000000000000081"
  params: []

- id: ir_next
  label: "IR: Next"
  kind: action
  command: "*SCIRCC0000000000000082"
  params: []

- id: ir_pause
  label: "IR: Pause"
  kind: action
  command: "*SCIRCC0000000000000084"
  params: []

- id: ir_flash_plus
  label: "IR: Flash Plus"
  kind: action
  command: "*SCIRCC0000000000000086"
  params: []

- id: ir_flash_minus
  label: "IR: Flash Minus"
  kind: action
  command: "*SCIRCC0000000000000087"
  params: []

- id: ir_tv_power
  label: "IR: TV Power"
  kind: action
  command: "*SCIRCC0000000000000098"
  params: []

- id: ir_audio
  label: "IR: Audio"
  kind: action
  command: "*SCIRCC0000000000000099"
  params: []

- id: ir_input
  label: "IR: Input"
  kind: action
  command: "*SCIRCC0000000000000101"
  params: []

- id: ir_sleep
  label: "IR: Sleep"
  kind: action
  command: "*SCIRCC0000000000000104"
  params: []

- id: ir_sleep_timer
  label: "IR: Sleep Timer"
  kind: action
  command: "*SCIRCC0000000000000105"
  params: []

- id: ir_video_2
  label: "IR: Video 2"
  kind: action
  command: "*SCIRCC0000000000000108"
  params: []

- id: ir_picture_mode
  label: "IR: Picture Mode"
  kind: action
  command: "*SCIRCC0000000000000110"
  params: []

- id: ir_demo_surround
  label: "IR: Demo Surround"
  kind: action
  command: "*SCIRCC0000000000000121"
  params: []

- id: ir_hdmi_1
  label: "IR: HDMI 1"
  kind: action
  command: "*SCIRCC0000000000000124"
  params: []

- id: ir_hdmi_2
  label: "IR: HDMI 2"
  kind: action
  command: "*SCIRCC0000000000000125"
  params: []

- id: ir_hdmi_3
  label: "IR: HDMI 3"
  kind: action
  command: "*SCIRCC0000000000000126"
  params: []

- id: ir_hdmi_4
  label: "IR: HDMI 4"
  kind: action
  command: "*SCIRCC0000000000000127"
  params: []

- id: ir_action_menu
  label: "IR: Action Menu"
  kind: action
  command: "*SCIRCC0000000000000129"
  params: []

- id: ir_help
  label: "IR: Help"
  kind: action
  command: "*SCIRCC0000000000000130"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "0000000000000000 = Standby (Off); 0000000000000001 = Active (On). Returned in Answer to getPowerStatus and in firePowerChange notify."

- id: audio_volume
  type: integer
  description: "Volume value in 16-character zero-left-padded decimal returned in Answer to getAudioVolume. Source does not state numeric range."
  # UNRESOLVED: numeric volume range not stated in source

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
  description: "0000000000000000 = Not Muted; 0000000000000001 = Muted. Returned in Answer to getAudioMute and in fireMuteChange notify."

- id: current_input
  type: object
  description: "Returned in Answer to getInput and in fireInputChange notify. Encoded as 8-character input-type code + 4-byte zero-pad + 4-character input index. Type codes: 00000001=HDMI, 00000003=Composite, 00000004=Component, 00000005=Screen Mirroring. Index range 1-9999."

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "0000000000000000 = Picture mute disabled; 0000000000000001 = Picture mute enabled. Returned in Answer to getPictureMute and in firePictureMuteChange notify."

- id: scene_setting
  type: string
  description: "Scene name returned in Answer to getSceneSetting (16-character parameter, right-padded with '#'). Documented values: auto, auto24pSync, general."

- id: broadcast_address
  type: string
  description: "IPv4 broadcast address returned in Answer to getBroadcastAddress, right-padded with '#' to 16 characters. Example: 192.168.0.14####."

- id: mac_address
  type: string
  description: "MAC address returned in Answer to getMacAddress, right-padded with '#' to 16 characters."

- id: ack
  type: enum
  values: [success, error, not_found, not_available]
  description: "Answer payload: 0000000000000000 = Success; FFFFFFFFFFFFFFFF = Error (invalid parameter); NNNNNNNNNNNNNNNN = Not Found (only for setInput) or Not Available for current input (only for SCEN)."
```

## Variables
```yaml
# UNRESOLVED: source does not define settable parameters outside the discrete
# action set above; volume/input/mute/scene state is mutated only via the
# corresponding set/get/toggle actions, so no separate Variables entries apply.
```

## Events
```yaml
# Unsolicited Notify messages (message type 0x4E [N]) emitted by the monitor.

- id: power_change
  label: Power State Change Notification
  command_prefix: "*SNPOWR"
  description: "Emitted on power transition. Parameter 0000000000000000 = sent when powering off; 0000000000000001 = sent when powering on."

- id: input_change
  label: Input Change Notification
  command_prefix: "*SNINPT"
  description: "Emitted when the monitor's input changes. Parameter encodes input type + index using the same encoding as setInput: 00000001/00000003/00000004/00000005 for HDMI/Composite/Component/Screen Mirroring respectively, then 4-byte zero-pad + 4-digit input number."

- id: volume_change
  label: Volume Change Notification
  command_prefix: "*SNVOLU"
  description: "Emitted when audio volume changes. Parameter carries the new volume value as 16-character zero-left-padded decimal."

- id: mute_change
  label: Audio Mute Change Notification
  command_prefix: "*SNAMUT"
  description: "Emitted on audio mute toggle. Parameter 0000000000000000 = sent when unmuting; 0000000000000001 = sent when muting."

- id: picture_mute_change
  label: Picture Mute Change Notification
  command_prefix: "*SNPMUT"
  description: "Emitted on picture mute toggle. Source rows: 0000000000000000 = 'Sent when picture mute is enabled'; 0000000000000001 = 'Sent when picture mute is disabled' (transcribed verbatim from source - direction of these two labels is as written in the table)."
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements for the Simple IP Control interface.
```

## Notes
- All Simple IP Control frames are fixed-length 24 bytes: header `*S` (0x2A 0x53), 1-byte message type (`C` Control / `E` Enquiry / `A` Answer / `N` Notify), 4-byte ASCII FourCC opcode, 16-byte ASCII parameter, footer 0x0A (LF). Implementations MUST append the LF byte that the `command` strings above omit for readability.
- Parameter padding rules from the source: numeric values are left-padded with `0` (e.g. volume `29` -> `0000000000000029`); text/enum values are right-padded with `#` (e.g. `auto24pSync#####`, `eth0############`); query enquiries use 16 `#` characters for the empty parameter.
- Answer payload conventions: `0000000000000000` = success / state value; `FFFFFFFFFFFFFFFF` = error; `NNNNNNNNNNNNNNNN` = "Not Found" (returned by setInput when the indexed source is absent) or "Not Available for the current input" (returned by SCEN).
- Required monitor settings before control will succeed (per source): [Settings] -> [Network & Internet] -> [Remote device settings] -> [Control remotely] = enabled; and [Settings] -> [Network & Internet] -> [Home network] -> [IP control] -> [Simple IP control] = enabled. Without these, the monitor will not respond on TCP 20060.
- EU-area models follow RED-DA compliance and may expose a reduced command set per the source's "EU models Note" — the spec above does not model this restriction.
- Source documents `getBroadcastAddress` and `getMacAddress` with the interface parameter `eth0`; other interface identifiers are not documented.
- The KDX8066 model identifiers (KD-49X8066D, KD-55X8066E) are carried from the operator-supplied family bootstrap; the source itself documents the protocol generically across BRAVIA Professional Displays.

<!-- UNRESOLVED: firmware version compatibility; numeric range for audio volume; behavior on dropped/partial frames; max simultaneous client connections to TCP 20060; KDX8066-series-specific deviations (if any) from the generic BRAVIA Simple IP Control protocol; whether RED-DA reduced command set applies to KDX8066 EU SKUs. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-26T19:50:47.130Z
last_checked_at: 2026-06-02T06:13:10.911Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T06:13:10.911Z
matched_actions: 79
action_count: 79
confidence: medium
summary: "All 79 spec actions matched verbatim to source; transport (TCP 20060, no auth) verified; 45 IR codes fully enumerated. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "KDX8066 series model identifiers (KD-49X8066D, KD-55X8066E) are not explicitly named in the source; the source documents the generic BRAVIA Professional Displays Simple IP Control protocol which is shared across the BRAVIA TV family. EU-area RED-DA-compliant variants may restrict the available command set."
- "numeric volume range not stated in source"
- "source does not define settable parameters outside the discrete"
- "source documents no multi-step macro sequences."
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility; numeric range for audio volume; behavior on dropped/partial frames; max simultaneous client connections to TCP 20060; KDX8066-series-specific deviations (if any) from the generic BRAVIA Simple IP Control protocol; whether RED-DA reduced command set applies to KDX8066 EU SKUs."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
