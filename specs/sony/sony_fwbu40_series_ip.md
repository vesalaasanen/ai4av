---
spec_id: admin/sony-fwbu40-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWBU40 Series Control Spec"
manufacturer: Sony
model_family: "FWBU40 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "FWBU40 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-11T04:17:34.426Z
last_checked_at: 2026-06-11T13:44:57.020Z
generated_at: 2026-06-11T13:44:57.020Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is the generic Sony \"Simple IP Control for BRAVIA Professional Displays\" page; the FWBU40 series is not explicitly named in the source text. Compatibility inferred from operator-assigned family. EU area models ship in 3 RED-DA compliance variants; command availability differs per variant."
  - "source contains no safety warnings, interlock procedures, or power-on"
  - "firmware version compatibility, baud rate, RS-232 alternate path, EU RED-DA variant-specific command availability."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:44:57.020Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec action IDs matched FourCC tokens in source command table; transport port 20060 verified; complete command coverage. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony FWBU40 Series Control Spec

## Summary
This spec covers the Sony "Simple IP Control" protocol (SSIP) for Sony BRAVIA Professional Displays, applied to the FWBU40 series. Control is performed over a TCP connection to port 20060 using fixed-size 24-byte frames composed of a 2-byte header, 1-byte message type, 4-byte Four-CC command, 16-byte parameter field, and 1-byte LF footer. The protocol supports control, enquiry, answer, and notify message types and exposes power, input, audio (volume/mute), picture mute, scene setting, IR code, and network address commands.

<!-- UNRESOLVED: source is the generic Sony "Simple IP Control for BRAVIA Professional Displays" page; the FWBU40 series is not explicitly named in the source text. Compatibility inferred from operator-assigned family. EU area models ship in 3 RED-DA compliance variants; command availability differs per variant. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no login, password, or token procedure described in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus, togglePowerStatus, getPowerStatus commands
- routable        # inferred from setInput, getInput commands
- queryable       # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress commands
- levelable       # inferred from setAudioVolume / getAudioVolume commands
```

## Actions
```yaml
# All commands use the 24-byte frame: *S (0x2A 0x53) | TYPE | FOURCC | PARAMS(16) | LF (0x0A)
# Header "*S" and footer LF are emitted implicitly; commands below show TYPE byte + FourCC + parameter payload.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR00000000000000{state}"  # state: "0"=Standby, "1"=Active
  params:
    - name: state
      type: integer
      description: '0 = Standby (Off), 1 = Active (On). Padded into byte 22 (final byte of 16-byte param field).'

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # 16 '#' placeholders in parameter field
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded}"  # volume right-aligned in 16-byte param field, zero-padded on the left, e.g. 0000000000000029
  params:
    - name: volume
      type: integer
      description: Audio volume value, right-aligned zero-padded across 16-byte parameter field.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT00000000000000{mute}"  # mute: "0"=Unmute, "1"=Mute
  params:
    - name: mute
      type: integer
      description: '0 = Unmute, 1 = Mute.'

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{kind}000{port}"  # kind: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port: 1-9999
  params:
    - name: kind
      type: integer
      description: '1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring.'
    - name: port
      type: integer
      description: Input port number, 1-9999, decimal digits.

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT00000000000000{state}"  # state: "0"=Disabled, "1"=Enabled (screen black)
  params:
    - name: state
      type: integer
      description: '0 = Disabled (picture mute off), 1 = Enabled (screen black).'

- id: get_picture_mute
  label: Get Picture Mute
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
  command: "*SCSCEN{scene_padded}"  # scene strings: "auto", "auto24pSync", "general", case-sensitive, right-padded with "#"
  params:
    - name: scene
      type: string
      description: 'Scene name: "auto", "auto24pSync", or "general". Case-sensitive, padded on the right with "#".'

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ir_code_padded}"  # IR code value, 2 decimal digits in the last two bytes of parameter field
  params:
    - name: code
      type: string
      description: 'IR command code as 2-digit decimal value: Display=05, Home=06, Options=07, Return=08, Up=09, Down=10, Right=11, Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18, Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26, Num0=27, VolumeUp=30, VolumeDown=31, Mute=32, ChannelUp=33, ChannelDown=34, Subtitle=35, DOT=38, PictureOff=50, Wide=61, Jump=62, SyncMenu=76, Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84, FlashPlus=86, FlashMinus=87, TVPower=98, Audio=99, Input=101, Sleep=104, SleepTimer=105, Video2=108, PictureMode=110, DemoSurround=121, HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, ActionMenu=129, Help=130. Zero-padded in the 16-byte field with the code occupying the last 2 bytes.'

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADR{interface}##########"  # interface string e.g. "eth0" left-justified, padded with "#" to 16 bytes
  params:
    - name: interface
      type: string
      description: 'Network interface name (e.g. "eth0"), left-justified, right-padded with "#" to fill 16-byte parameter field. Source example uses "eth0".'

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface}##########"  # interface string e.g. "eth0" left-justified, padded with "#" to 16 bytes
  params:
    - name: interface
      type: string
      description: 'Network interface name (e.g. "eth0"), left-justified, right-padded with "#" to fill 16-byte parameter field. Source example uses "eth0".'
```

## Feedbacks
```yaml
# All answers share frame "*S" header, "A" message type, same FourCC, with 16-byte parameter field.
# "0"*16 = Success, "F"*16 = Error, "N"*16 = Not Found / Not available.
- id: answer_success
  type: enum
  values: [success]
  description: 16 ASCII '0' characters in parameter field (Byte[7]-Byte[22]).

- id: answer_error
  type: enum
  values: [error]
  description: 16 ASCII 'F' characters in parameter field (Byte[7]-Byte[22]).

- id: answer_not_found
  type: enum
  values: [not_found]
  description: 16 ASCII 'N' characters in parameter field (Byte[7]-Byte[22]); returned by setInput when target absent and by setSceneSetting / getSceneSetting when not available for current input.

- id: power_state
  type: enum
  values: [standby, active]
  description: Returned by getPowerStatus; '...0' = Standby (Off), '...1' = Active (On) in last parameter byte.

- id: audio_volume
  type: integer
  description: Returned by getAudioVolume; volume value, right-aligned zero-padded in 16-byte parameter field.

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  description: Returned by getAudioMute; '...0' = Not Muted, '...1' = Muted.

- id: input_current
  type: object
  description: Returned by getInput; kind byte (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) plus 4-digit port number in last 4 parameter bytes.

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Returned by getPictureMute; '...0' = Disabled, '...1' = Enabled.

- id: scene_setting_value
  type: string
  description: Returned by getSceneSetting; scene name string right-padded with "#" across 16-byte parameter field.

- id: broadcast_address
  type: string
  description: Returned by getBroadcastAddress; IPv4 address dotted-quad (e.g. 192.168.0.14) left-justified, right-padded with "#" to 16 bytes.

- id: mac_address
  type: string
  description: Returned by getMacAddress; MAC address left-justified, right-padded with "#" to 16 bytes.
```

## Variables
```yaml
# Section left empty: every settable value in the source is exposed as a discrete action
# (set_power_status, set_audio_volume, set_audio_mute, set_input, set_picture_mute,
# set_scene_setting). No standalone parameter without a corresponding command.
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [standby, active]
  description: Unsolicited notify ("N" message type) FourCC "POWR"; '...0' = Sent when powering off, '...1' = Sent when powering on.

- id: fire_input_change
  type: object
  description: Unsolicited notify ("N" message type) FourCC "INPT"; emitted when input changes, with kind byte (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) and 4-digit port number in last 4 bytes. '0'*16 = input change occurred without specifying kind/port.

- id: fire_volume_change
  type: integer
  description: Unsolicited notify ("N" message type) FourCC "VOLU"; emitted when volume changes, volume value in 16-byte parameter field.

- id: fire_mute_change
  type: enum
  values: [unmuting, muting]
  description: Unsolicited notify ("N" message type) FourCC "AMUT"; '...0' = Sent when unmuting, '...1' = Sent when muting.

- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  description: Unsolicited notify ("N" message type) FourCC "PMUT"; '...0' = Sent when picture mute is enabled, '...1' = Sent when picture mute is disabled.
```

## Macros
```yaml
# Section left empty: source describes no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on
# sequencing requirements.
```

## Notes
- All commands are framed as 24 ASCII bytes (header `*S` + message type + FourCC + 16-byte parameter + LF footer). The literal "*S" header and 0x0A LF footer are omitted from the `command:` field templates above for readability; implementers MUST prepend `*S` (0x2A 0x53) and append 0x0A.
- Parameter fields use ASCII placeholders: `#` for enquiry/no-parameter commands, `0` for success or zero values, `F` for error replies, `N` for not-found/not-available replies, and trailing `#` padding for variable-length strings.
- For setPowerStatus the source documents only the value 0 and 1 in the final parameter byte; intermediate ASCII values are accepted by the field but only 0/1 are explicitly described.
- EU area models ship in 3 RED-DA compliance variants; command availability differs per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for variant matrix.
- The "Simple IP Control" page does NOT explicitly mention the FWBU40 series. Compatibility with FWBU40 is inferred from operator assignment of this spec to the family. Confirm coverage against FWBU40 firmware release notes before relying on EU-specific commands.
- The Linux `netcat` example in the source (used for power off) sends 24 raw bytes; the "*S" prefix and LF suffix are part of the 24-byte frame.
- The setIrccCode IR table reuses IR remote codes for HDMI 1-4 (codes 124-127) — distinct from setInput HDMI port selection; both can address HDMI inputs by different mechanisms.
<!-- UNRESOLVED: firmware version compatibility, baud rate, RS-232 alternate path, EU RED-DA variant-specific command availability. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-11T04:17:34.426Z
last_checked_at: 2026-06-11T13:44:57.020Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:44:57.020Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec action IDs matched FourCC tokens in source command table; transport port 20060 verified; complete command coverage. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is the generic Sony \"Simple IP Control for BRAVIA Professional Displays\" page; the FWBU40 series is not explicitly named in the source text. Compatibility inferred from operator-assigned family. EU area models ship in 3 RED-DA compliance variants; command availability differs per variant."
- "source contains no safety warnings, interlock procedures, or power-on"
- "firmware version compatibility, baud rate, RS-232 alternate path, EU RED-DA variant-specific command availability."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
