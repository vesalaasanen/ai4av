---
spec_id: admin/sony-kda89-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDA89 Series Control Spec"
manufacturer: Sony
model_family: "Sony KDA89 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDA89 Series"
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
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-05-26T19:47:01.959Z
last_checked_at: 2026-06-02T06:13:10.141Z
generated_at: 2026-06-02T06:13:10.141Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. Source applies to current BRAVIA Pro displays generally; specific KDA89 firmware requirements are not enumerated."
  - "source contains no safety warnings, interlock procedures, power-on sequencing, or fault recovery material."
  - "source contains no firmware version, voltage, current, power, fault behavior, or authentication information. Auth was inferred as none."
verification:
  verdict: verified
  checked_at: 2026-06-02T06:13:10.141Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim to source FourCC commands; all 11 distinct source commands represented; transport parameters (port 20060, TCP, no auth) verified; coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDA89 Series Control Spec

## Summary

The Sony KDA89 Series is a BRAVIA Professional Display. This spec covers Sony's "Simple IP Control" protocol (SSIP), a TCP-based command/response protocol used to control the display over a local network. Messages are fixed-length 24-byte frames with a 2-byte header, message type, 4-byte FourCC command, 16-byte parameter, and a 1-byte LF footer. Listening port: TCP 20060. No authentication.

The spec covers the 16 client commands and 5 device-sent events documented in Sony's BRAVIA Pro "Simple IP control" knowledge center (IRCC, POWR, TPOW, VOLU, AMUT, INPT, PMUT, TPMU, SCEN, BADR, MADR).

<!-- UNRESOLVED: firmware version compatibility not stated in source. Source applies to current BRAVIA Pro displays generally; specific KDA89 firmware requirements are not enumerated. -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none
```

`auth.type: none` is an inference: the source contains no login, password, or token procedure. Anyone able to reach TCP 20060 on the LAN can send commands.

## Traits

```yaml
- powerable
- routable
- queryable
- levelable
```

`powerable` inferred from `setPowerStatus` / `togglePowerStatus` examples. `routable` inferred from `setInput` examples. `queryable` inferred from `getPowerStatus` / `getInput` / `getAudioVolume` examples. `levelable` inferred from `setAudioVolume` examples.

## Actions

Each `command:` string is 23 bytes (bytes 0-22). The implementer must append byte 23 = `0x0A` (LF) on transmit. See "Frame format" in Notes.

```yaml
- id: set_power_status
  label: Set Power Status
  kind: action
  command: '*SCPOWR000000000000000{state}'
  params:
    - name: state
      type: string
      description: "Power state digit at byte 22. 0 for standby (off), 1 for active (on)."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: '*SEPOWR################'
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: '*SCTPOW################'
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: '*SCVOLU{volume_padded_16}'
  params:
    - name: volume_padded_16
      type: string
      description: "Volume as a 16-character decimal value, right-aligned and zero-padded. Source example: 29 = '0000000000000029'."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: '*SEVOLU################'
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: '*SCAMUT000000000000000{state}'
  params:
    - name: state
      type: string
      description: "Mute state digit at byte 22. 0 for unmute, 1 for mute."

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: '*SEAMUT################'
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: '*SCINPT0000000{type}0000{number:04d}'
  params:
    - name: type
      type: string
      description: "Input type digit at byte 13. 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring."
    - name: number
      type: integer
      description: "Input number (1-9999), zero-padded to 4 ASCII digits at bytes 18-21."

- id: get_input
  label: Get Input
  kind: query
  command: '*SEINPT################'
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: '*SCPMUT000000000000000{state}'
  params:
    - name: state
      type: string
      description: "Picture mute state digit at byte 22. 0 to disable, 1 to enable (turn screen black)."

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: '*SEPMUT################'
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: '*SCTPMU################'
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: '*SCSCEN{scene_padded_16}'
  params:
    - name: scene_padded_16
      type: string
      description: "Scene name, case-sensitive, right-padded with literal 0x23 (hash) to 16 characters. Valid values: auto, auto24pSync, general."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: '*SESCEN################'
  params: []

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: '*SCIRCC{ir_code:16s}'
  params:
    - name: ir_code
      type: string
      description: "16-character IR code value (right-padded with 0x30 ASCII '0'). See the IR Codes table in Notes for the full code list."

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: '*SEBADR{interface_padded_16}'
  params:
    - name: interface_padded_16
      type: string
      description: "Interface name left-justified, right-padded with literal 0x23 (hash) to 16 characters. Source example: 'eth0' + 12 hashes."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: '*SEMADR{interface_padded_16}'
  params:
    - name: interface_padded_16
      type: string
      description: "Interface name left-justified, right-padded with literal 0x23 (hash) to 16 characters. Source example: 'eth0' + 12 hashes."
```

## Feedbacks

```yaml
- id: power_state
  type: enum
  description: "From getPowerStatus answer. Byte 22 of the 24-byte answer: 0 = standby, 1 = active."
  values:
    - standby
    - active

- id: audio_volume
  type: string
  description: "From getAudioVolume answer. 16-character decimal string, right-aligned in the answer param (e.g. '0000000000000029' for volume 29)."

- id: audio_mute
  type: enum
  description: "From getAudioMute answer. Byte 22 of the answer: 0 = not muted, 1 = muted."
  values:
    - not_muted
    - muted

- id: input_source
  type: object
  description: "From getInput answer. Byte 13 = type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes 18-21 = input number as 4 ASCII digits."

- id: picture_mute
  type: enum
  description: "From getPictureMute answer. Byte 22 of the answer: 0 = disabled, 1 = enabled."
  values:
    - disabled
    - enabled

- id: scene_setting
  type: string
  description: "From getSceneSetting answer. Scene name right-padded with 0x23 (hash) to 16 chars; case-sensitive."

- id: broadcast_address
  type: string
  description: "From getBroadcastAddress answer. IPv4 address (e.g. '192.168.0.14') right-padded with 0x23 (hash) to 16 chars."

- id: mac_address
  type: string
  description: "From getMacAddress answer. 12 hex digits right-padded with 0x23 (hash) to 16 chars."
```

## Events

```yaml
- id: power_change
  description: "firePowerChange. Sent by monitor when power state changes. Byte 22 of message: 0 = power off, 1 = power on."
  message_type: N
  fourcc: POWR

- id: input_change
  description: "fireInputChange. Sent when the input changes. Byte 13 = type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring); bytes 18-21 = number as 4 ASCII digits."
  message_type: N
  fourcc: INPT

- id: volume_change
  description: "fireVolumeChange. Sent when volume changes. Param bytes contain the new volume as a 16-character decimal value."
  message_type: N
  fourcc: VOLU

- id: mute_change
  description: "fireMuteChange. Sent when mute state changes. Byte 22 of message: 0 = unmuting, 1 = muting."
  message_type: N
  fourcc: AMUT

- id: picture_mute_change
  description: "firePictureMuteChange. Sent when picture mute state changes. Byte 22 of message: 0 = enabled, 1 = disabled."
  message_type: N
  fourcc: PMUT
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: source contains no safety warnings, interlock procedures, power-on sequencing, or fault recovery material. -->

## Notes

### Source

- Original: https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
- Applies to BRAVIA Professional Displays generally, including the KDA89 Series.

### Frame format

All Simple IP Control messages are 24 bytes total:

| Bytes | Field | Value |
|-------|-------|-------|
| 0-1 | Header | `0x2A 0x53` (ASCII `*S`) — fixed |
| 2 | Message type | `0x43` [C] control, `0x45` [E] enquiry, `0x41` [A] answer, `0x4E` [N] notify |
| 3-6 | Command | 4 ASCII characters, FourCC |
| 7-22 | Parameters | 16 bytes, command-specific |
| 23 | Footer | `0x0A` (LF) — fixed |

The `command:` strings in Actions show bytes 0-22 (23 chars). The 0x0A footer must be appended on transmit.

### Answer codes

Answer (`A` type) parameter fields carry one of:

- `0000000000000000` — success
- `FFFFFFFFFFFFFFFF` — error
- `NNNNNNNNNNNNNNNN` — not found / not available for current input

On success, the parameter field carries the requested value (broadcast address, MAC address, current input, volume, etc.).

### Device-side setup required

Simple IP control must be enabled on the monitor:

- Settings → Network & Internet → Remote device settings → Control remotely
- Settings → Network & Internet → Home network → IP control → Simple IP control

### EU / RED-DA model variants

EU-area models have 3 variants based on RED-DA compliance. Settings and the set of available commands may differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.

### IR codes (`set_ircc_code` parameter values)

The 16-character param string to pass to `setIrccCode` (FourCC `IRCC`) for each supported IR remote button:

| IR Command | 16-char param |
|------------|---------------|
| Display | `0000000000000005` |
| Home | `0000000000000006` |
| Options | `0000000000000007` |
| Return | `0000000000000008` |
| Up | `0000000000000009` |
| Down | `0000000000000010` |
| Right | `0000000000000011` |
| Left | `0000000000000012` |
| Confirm | `0000000000000013` |
| Red | `0000000000000014` |
| Green | `0000000000000015` |
| Yellow | `0000000000000016` |
| Blue | `0000000000000017` |
| Num1 | `0000000000000018` |
| Num2 | `0000000000000019` |
| Num3 | `0000000000000020` |
| Num4 | `0000000000000021` |
| Num5 | `0000000000000022` |
| Num6 | `0000000000000023` |
| Num7 | `0000000000000024` |
| Num8 | `0000000000000025` |
| Num9 | `0000000000000026` |
| Num0 | `0000000000000027` |
| Volume Up | `0000000000000030` |
| Volume Down | `0000000000000031` |
| Mute | `0000000000000032` |
| Channel Up | `0000000000000033` |
| Channel Down | `0000000000000034` |
| Subtitle | `0000000000000035` |
| DOT | `0000000000000038` |
| Picture Off | `0000000000000050` |
| Wide | `0000000000000061` |
| Jump | `0000000000000062` |
| Sync Menu | `0000000000000076` |
| Forward | `0000000000000077` |
| Play | `0000000000000078` |
| Rewind | `0000000000000079` |
| Prev | `0000000000000080` |
| Stop | `0000000000000081` |
| Next | `0000000000000082` |
| Pause | `0000000000000084` |
| Flash Plus | `0000000000000086` |
| Flash Minus | `0000000000000087` |
| TV Power | `0000000000000098` |
| Audio | `0000000000000099` |
| Input | `0000000000000101` |
| Sleep | `0000000000000104` |
| Sleep Timer | `0000000000000105` |
| Video 2 | `0000000000000108` |
| Picture Mode | `0000000000000110` |
| Demo Surround | `0000000000000121` |
| HDMI 1 | `0000000000000124` |
| HDMI 2 | `0000000000000125` |
| HDMI 3 | `0000000000000126` |
| HDMI 4 | `0000000000000127` |
| Action Menu | `0000000000000129` |
| Help | `0000000000000130` |

<!-- UNRESOLVED: source contains no firmware version, voltage, current, power, fault behavior, or authentication information. Auth was inferred as none. -->
```

Spec written to `docs/pdfs/sony_kda89_series_ip.spec.md`. 17 actions, 8 feedbacks, 5 events, 56 IR codes in Notes. Port 20060, no auth. No `#` comments inside YAML frames.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-05-26T19:47:01.959Z
last_checked_at: 2026-06-02T06:13:10.141Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T06:13:10.141Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim to source FourCC commands; all 11 distinct source commands represented; transport parameters (port 20060, TCP, no auth) verified; coverage complete. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. Source applies to current BRAVIA Pro displays generally; specific KDA89 firmware requirements are not enumerated."
- "source contains no safety warnings, interlock procedures, power-on sequencing, or fault recovery material."
- "source contains no firmware version, voltage, current, power, fault behavior, or authentication information. Auth was inferred as none."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
