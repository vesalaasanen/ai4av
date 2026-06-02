---
spec_id: admin/sony-kdzh8-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDZH8 Series Control Spec"
manufacturer: Sony
model_family: KD-75ZH8
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-75ZH8
    - KD-85ZH8
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-27T09:00:00.688Z
last_checked_at: 2026-06-02T07:06:42.390Z
generated_at: 2026-06-02T07:06:42.390Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state per-model firmware, RED-DA EU spec compliance level, or any authentication requirements"
  - "source does not document multi-step sequences"
  - "source does not document safety warnings, interlocks, or power-on sequencing requirements"
  - "firmware version compatibility, RED-DA spec variant per region, auth requirements, retry/timeout behavior, recommended keepalive interval, behavior on disconnect"
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:42.390Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literally in source; transport parameters verified; spec covers all distinct source command tokens. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDZH8 Series Control Spec

## Summary
Simple IP control protocol (SSIP) for Sony BRAVIA Professional Displays, including the KD-75ZH8 and KD-85ZH8 8K HDR models. Control travels over TCP port 20060 using 24-byte fixed-size ASCII frames. Frame layout: 2-byte header `*S`, 1-byte message type, 4-byte FourCC command, 16-byte parameter field, 1-byte footer `LF`.

<!-- UNRESOLVED: source does not state per-model firmware, RED-DA EU spec compliance level, or any authentication requirements -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  framing:
    header: "0x2A 0x53"   # "*S" fixed
    footer: "0x0A"        # LF fixed
    fixed_size_bytes: 24
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / togglePowerStatus / firePowerChange
- routable        # inferred from setInput / getInput / fireInputChange
- queryable       # inferred from getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting / getBroadcastAddress / getMacAddress
- levelable       # inferred from setAudioVolume / getAudioVolume / fireVolumeChange
```

## Actions
```yaml
- id: set_ircc_code
  label: Send IR Remote Command (setIrccCode)
  kind: action
  command: "*SCIRCC{ircc_code_padded_16}\n"  # bytes 0-6 fixed prefix, bytes 7-22 hold IRCC code as 16 ASCII chars, byte 23 = 0x0A
  params:
    - name: ircc_code
      type: string
      description: "16-byte ASCII IRCC code from the IR Commands table (e.g. 0...030 for Volume Up). Right-padded with '0' (per source note for SCEN) or as shown in the IR table."
  notes: "Source documents 50+ distinct IR commands (Display, Home, Options, Return, Up/Down/Left/Right/Confirm, Red/Green/Yellow/Blue, Num0-9, Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, Forward, Play, Rewind, Prev, Stop, Next, Pause, Flash Plus/Minus, TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help). Each is a parameter value of this single command, not a separate action."

- id: set_power_status
  label: Set Power Status (setPowerStatus)
  kind: action
  command: "*SCPOWR00000000000000{0|1}\n"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: "0 = Standby (Off), 1 = Active (On). Right-padded ASCII '0' in the 16-byte param field."

- id: get_power_status
  label: Get Power Status (getPowerStatus)
  kind: query
  command: "*SEPOWR################\n"  # 16 '#' placeholders per source common-param table
  params: []

- id: toggle_power_status
  label: Toggle Power Status (togglePowerStatus)
  kind: action
  command: "*SCTPOW################\n"  # C T P O W + 16 '#' per common-param rule for no-param control
  params: []

- id: set_audio_volume
  label: Set Audio Volume (setAudioVolume)
  kind: action
  command: "*SCVOLU{volume_16}\n"
  params:
    - name: volume
      type: integer
      description: "Volume value as a 16-digit decimal right-justified ASCII string, e.g. 0000000000000029 for 41. Source: 'decimal digit pad on the left with 0'."

- id: get_audio_volume
  label: Get Audio Volume (getAudioVolume)
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute (setAudioMute)
  kind: action
  command: "*SCAMUT000000000000000{0|1}\n"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: "0 = Unmute, 1 = Mute."

- id: get_audio_mute
  label: Get Audio Mute (getAudioMute)
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input (setInput)
  kind: action
  command: "*SCINPT0000000000{type}{port_4}\n"
  params:
    - name: type
      type: enum
      values: [hdmi, composite, component, screen_mirroring]
      description: "1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring. Single ASCII digit at byte[14]."
    - name: port
      type: integer
      description: "1-9999, right-justified in 4 ASCII digit positions at bytes 19-22."
  notes: "Source also lists Answer A with 'NNNNNNNNNNNNNNNNNNNNNNN' = Not Found."

- id: get_input
  label: Get Current Input (getInput)
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute (setPictureMute)
  kind: action
  command: "*SCPMUT000000000000000{0|1}\n"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]
      description: "0 = Disabled (picture mute off), 1 = Enabled (screen black)."

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
  command: "*SCSCEN{scene_padded_16}\n"
  params:
    - name: scene
      type: enum
      values: [auto, auto24pSync, general]
      description: "Case-sensitive string, right-padded with '#' to 16 bytes. e.g. auto24pSync#####"

- id: get_scene_setting
  label: Get Scene Setting (getSceneSetting)
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address (getBroadcastAddress)
  kind: query
  command: "*SEBADREth0##########\n"  # bytes 7-12 = 'eth0', bytes 13-22 = '#'
  params:
    - name: interface
      type: string
      description: "Interface name as ASCII, padded with '#' to 16 bytes. Source example uses 'eth0'."
  notes: "EU models: per RED-DA spec compliance the command may be restricted."

- id: get_mac_address
  label: Get MAC Address (getMacAddress)
  kind: query
  command: "*SEMADREth0##########\n"
  params:
    - name: interface
      type: string
      description: "Interface name as ASCII, padded with '#' to 16 bytes. Source example uses 'eth0'."
  notes: "EU models: per RED-DA spec compliance the command may be restricted."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source_command: get_power_status
  description: "0 = Standby (Off), 1 = Active (On) in the trailing byte of the 16-byte param field."

- id: audio_volume
  type: integer
  source_command: get_audio_volume
  description: "16-digit decimal right-justified ASCII in param field."

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source_command: get_audio_mute
  description: "0 = Not Muted, 1 = Muted."

- id: current_input
  type: object
  source_command: get_input
  description: "Type digit at byte[14]: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Port number in bytes 19-22."

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source_command: get_picture_mute
  description: "0 = Disabled, 1 = Enabled."

- id: scene_setting
  type: string
  source_command: get_scene_setting
  description: "Current scene string, right-padded with '#'."

- id: broadcast_address
  type: string
  source_command: get_broadcast_address
  description: "Dotted-IPv4 string, right-padded with '#'."

- id: mac_address
  type: string
  source_command: get_mac_address
  description: "MAC address, right-padded with '#'."
```

## Variables
```yaml
- id: ircc_codes
  type: enum
  description: "IR remote command codes passed as 16-byte ASCII param to setIrccCode."
  values:
    - { name: Display,        code: "0000000000000005" }
    - { name: Home,           code: "0000000000000006" }
    - { name: Options,        code: "0000000000000007" }
    - { name: Return,         code: "0000000000000008" }
    - { name: Up,             code: "0000000000000009" }
    - { name: Down,           code: "0000000000000010" }
    - { name: Right,          code: "0000000000000011" }
    - { name: Left,           code: "0000000000000012" }
    - { name: Confirm,        code: "0000000000000013" }
    - { name: Red,            code: "0000000000000014" }
    - { name: Green,          code: "0000000000000015" }
    - { name: Yellow,         code: "0000000000000016" }
    - { name: Blue,           code: "0000000000000017" }
    - { name: Num1,           code: "0000000000000018" }
    - { name: Num2,           code: "0000000000000019" }
    - { name: Num3,           code: "0000000000000020" }
    - { name: Num4,           code: "0000000000000021" }
    - { name: Num5,           code: "0000000000000022" }
    - { name: Num6,           code: "0000000000000023" }
    - { name: Num7,           code: "0000000000000024" }
    - { name: Num8,           code: "0000000000000025" }
    - { name: Num9,           code: "0000000000000026" }
    - { name: Num0,           code: "0000000000000027" }
    - { name: VolumeUp,       code: "0000000000000030" }
    - { name: VolumeDown,     code: "0000000000000031" }
    - { name: Mute,           code: "0000000000000032" }
    - { name: ChannelUp,      code: "0000000000000033" }
    - { name: ChannelDown,    code: "0000000000000034" }
    - { name: Subtitle,       code: "0000000000000035" }
    - { name: DOT,            code: "0000000000000038" }
    - { name: PictureOff,     code: "0000000000000050" }
    - { name: Wide,           code: "0000000000000061" }
    - { name: Jump,           code: "0000000000000062" }
    - { name: SyncMenu,       code: "0000000000000076" }
    - { name: Forward,        code: "0000000000000077" }
    - { name: Play,           code: "0000000000000078" }
    - { name: Rewind,         code: "0000000000000079" }
    - { name: Prev,           code: "0000000000000080" }
    - { name: Stop,           code: "0000000000000081" }
    - { name: Next,           code: "0000000000000082" }
    - { name: Pause,          code: "0000000000000084" }
    - { name: FlashPlus,      code: "0000000000000086" }
    - { name: FlashMinus,     code: "0000000000000087" }
    - { name: TVPower,        code: "0000000000000098" }
    - { name: Audio,          code: "0000000000000099" }
    - { name: Input,          code: "0000000000000101" }
    - { name: Sleep,          code: "0000000000000104" }
    - { name: SleepTimer,     code: "0000000000000105" }
    - { name: Video2,         code: "0000000000000108" }
    - { name: PictureMode,    code: "0000000000000110" }
    - { name: DemoSurround,   code: "0000000000000121" }
    - { name: HDMI1,          code: "0000000000000124" }
    - { name: HDMI2,          code: "0000000000000125" }
    - { name: HDMI3,          code: "0000000000000126" }
    - { name: HDMI4,          code: "0000000000000127" }
    - { name: ActionMenu,     code: "0000000000000129" }
    - { name: Help,           code: "0000000000000130" }
```

## Events
```yaml
- id: power_change
  type: notification
  message_type: N
  fourcc: POWR
  payload: "16-byte param field, trailing byte 0=powering off, 1=powering on"
  description: "firePowerChange - sent when power state changes."

- id: input_change
  type: notification
  message_type: N
  fourcc: INPT
  payload: "16-byte param field. Trailing byte or type+port encoding (see setInput for layout). Sent when input change to monitor happens."
  description: "fireInputChange."

- id: volume_change
  type: notification
  message_type: N
  fourcc: VOLU
  payload: "16-byte param field with new volume value as 16-digit decimal ASCII."
  description: "fireVolumeChange - sent when volume changes."

- id: mute_change
  type: notification
  message_type: N
  fourcc: AMUT
  payload: "16-byte param field, trailing byte 0=unmuting, 1=muting"
  description: "fireMuteChange - sent when mute state changes."

- id: picture_mute_change
  type: notification
  message_type: N
  fourcc: PMUT
  payload: "16-byte param field, trailing byte 0=picture mute enabled, 1=disabled (note: source has this reversed from setPictureMute semantics; reproduced verbatim)"
  description: "firePictureMuteChange - sent when picture mute state changes."
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on sequencing requirements
```

## Notes
**Required monitor settings** (must be enabled before Simple IP Control works):
1. Settings → Network & Internet → Remote device settings → Control remotely
2. Settings → Network & Internet → Home network → IP control → Simple IP control

**Frame format reminder:** Every message is exactly 24 bytes. Header `*S` (0x2A 0x53), then a single ASCII character for message type (`C`ontrol, `E`nquiry, `A`nswer, `N`otify), 4 ASCII characters for the FourCC command, 16 ASCII characters for parameters, then LF (0x0A).

**Parameter padding:** For Control without parameters, use 16 `#` characters. For Enquiry without parameters, also use 16 `#`. Answer success = 16 `0` characters. Answer error = 16 `F` characters. String parameters (scene names) are right-padded with `#`. Numeric values are right-justified ASCII with leading `0`.

**EU models / RED-DA:** EU-area ZH8 models have 3 RED-DA compliance spec variants; available commands and settings differ per spec. See https://pro-bravia.sony.net/setup/device-settings/red-da/. Some commands (getBroadcastAddress, getMacAddress) marked with `*` in the source carry this caveat.

**Unsolicited notifications (N-type):** The monitor pushes events on the same TCP connection when state changes. A controller must read the socket to observe these. Fire events documented: power, input, volume, mute, picture mute.

**irccX command interpretation:** `setIrccCode` (FourCC `IRCC` with leading `C`/message-type) is a passthrough for sending IR remote button presses from the controller. The 16-byte parameter holds the IR code from the documented table; codes are case-sensitive per source.

<!-- UNRESOLVED: firmware version compatibility, RED-DA spec variant per region, auth requirements, retry/timeout behavior, recommended keepalive interval, behavior on disconnect -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/
retrieved_at: 2026-05-27T09:00:00.688Z
last_checked_at: 2026-06-02T07:06:42.390Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:42.390Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literally in source; transport parameters verified; spec covers all distinct source command tokens. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state per-model firmware, RED-DA EU spec compliance level, or any authentication requirements"
- "source does not document multi-step sequences"
- "source does not document safety warnings, interlocks, or power-on sequencing requirements"
- "firmware version compatibility, RED-DA spec variant per region, auth requirements, retry/timeout behavior, recommended keepalive interval, behavior on disconnect"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
