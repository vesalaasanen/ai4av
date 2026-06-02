---
spec_id: admin/sony-kdx8588-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8588 Series BRAVIA Professional Display Control Spec"
manufacturer: Sony
model_family: "KDX8588 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8588 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T09:05:01.438Z
last_checked_at: 2026-05-31T22:39:30.995Z
generated_at: 2026-05-31T22:39:30.995Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 specification variants under RED-DA compliance; available commands differ per variant. Source does not enumerate the per-variant command differences."
  - "base URL / path not applicable - protocol is raw TCP with fixed 24-byte frames"
  - "All above commands assume the 24-byte frame is filled with ASCII characters. Source documents the byte values for C=0x43, E=0x45, A=0x41, N=0x4E (message type) and the FourCC command names, but does not specify whether the four command bytes are always sent as the ASCII codes (e.g. 'P','O','W','R') or as raw binary values. The netcat example \"*SCPOWR0000000000000000\" implies ASCII; treat the FourCC field as 4 ASCII bytes."
  - "Success/Error response shape - the Answer (A) frame uses 16 bytes of \"0\" for success and 16 bytes of \"F\" for error. This is shared across all commands; not modeled as a per-command feedback here."
  - "not applicable - every settable parameter in the source is a discrete action"
  - "source does not document any multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "firmware version compatibility not stated in source."
  - "maximum supported audio volume value not stated in source."
  - "full list of EU RED-DA variant-specific commands not stated in source."
verification:
  verdict: verified
  checked_at: 2026-05-31T22:39:30.995Z
  matched_actions: 9
  action_count: 9
  confidence: medium
  summary: "All 9 spec actions matched literal FourCC codes in source with correct parameters and transport. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDX8588 Series BRAVIA Professional Display Control Spec

## Summary
This spec covers Sony BRAVIA Professional Displays in the KDX8588 Series, controlled over TCP/IP using Sony's "Simple IP Control" protocol. All commands are fixed-length 24-byte messages exchanged on TCP port 20060, with no authentication required. The protocol supports power, input, volume, mute, picture mute, scene setting, IR-passthrough, and network-info queries, plus unsolicited Notify events for state changes.

<!-- UNRESOLVED: EU models have 3 specification variants under RED-DA compliance; available commands differ per variant. Source does not enumerate the per-variant command differences. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # UNRESOLVED: base URL / path not applicable - protocol is raw TCP with fixed 24-byte frames
serial: null  # N/A: TCP-only device
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (24 bytes, fixed):**
| Byte offset | Length | Meaning |
|---|---|---|
| 0 | 1 | Header byte 0: `0x2A` (`*`) — fixed |
| 1 | 1 | Header byte 1: `0x53` (`S`) — fixed |
| 2 | 1 | Message type: `0x43` C=Control, `0x45` E=Enquiry, `0x41` A=Answer, `0x4E` N=Notify |
| 3–6 | 4 | FourCC command code (ASCII) |
| 7–22 | 16 | Parameters (ASCII / numeric, right-padded with `0x23` `#` or `0x30` `0` per command) |
| 23 | 1 | Footer: `0x0A` (LF) — fixed |

## Traits
```yaml
- powerable       # inferred from setPowerStatus / togglePowerStatus / getPowerStatus
- routable        # inferred from setInput / getInput (HDMI/Composite/Component/Screen Mirroring)
- queryable       # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable       # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ircc_code_16_chars}#"   # 16-byte ASCII parameter; IRCC codes listed in source table (Display=...005, Home=...006, Options=...007, Return=...008, Up=...009, Down=...010, Right=...011, Left=...012, Confirm=...013, Red=...014, Green=...015, Yellow=...016, Blue=...017, Num1=...018, Num2=...019, Num3=...020, Num4=...021, Num5=...022, Num6=...023, Num7=...024, Num8=...025, Num9=...026, Num0=...027, VolumeUp=...030, VolumeDown=...031, Mute=...032, ChannelUp=...033, ChannelDown=...034, Subtitle=...035, DOT=...038, PictureOff=...050, Wide=...061, Jump=...062, SyncMenu=...076, Forward=...077, Play=...078, Rewind=...079, Prev=...080, Stop=...081, Next=...082, Pause=...084, FlashPlus=...086, FlashMinus=...087, TVPower=...098, Audio=...099, Input=...101, Sleep=...104, SleepTimer=...105, Video2=...108, PictureMode=...110, DemoSurround=...121, HDMI1=...124, HDMI2=...125, HDMI3=...126, HDMI4=...127, ActionMenu=...129, Help=...130)
  params:
    - name: ircc_code_16_chars
      type: string
      description: 16 ASCII characters describing the IR code, right-padded with "0" (example pattern: "00000000000000" + 2-digit code, e.g. "0000000000000005" for Display)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{0|1}\n"  # last parameter byte: 0=Standby(Off), 1=Active(On); full 16-byte param right-padded with "0"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Standby (Off), 1 = Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"  # Enquiry, 16-byte param placeholders
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"  # Control with no parameters (16-byte "#" padding)
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU000000000{volume_padded}#\n"  # 16-byte parameter, right-padded with "0"; example: "0000000000000029" for volume 0x29
  params:
    - name: volume_padded
      type: string
      description: Decimal volume value left-padded with "0" to fill the 16-byte parameter field (e.g. "0000000000000029")

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{0|1}\n"  # last byte: 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT00000000000{src}{num_padded}#\n"  # src byte: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; followed by 4 ASCII digits (0001-9999)
  params:
    - name: source_type
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: input_number
      type: integer
      description: Input number, 1-9999, left-padded with "0" to 4 digits

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{0|1}\n"  # 0=disabled, 1=screen black
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0 = Picture mute disabled, 1 = Screen black (picture mute on)

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
  command: "*SCSCEN{scene_padded_16}#\n"  # 16-byte parameter, ASCII string, right-padded with "#"; valid values: "auto", "auto24pSync", "general"
  params:
    - name: scene
      type: string
      enum: ["auto", "auto24pSync", "general"]
      description: Scene name; case-sensitive, right-padded with "#" to 16 chars (e.g. "auto24pSync#####")

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############\n"  # 16-byte parameter: interface name ASCII (e.g. "eth0"), right-padded with "#"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"), right-padded with "#" to 16 chars

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############\n"  # interface name, right-padded with "#" to 16 chars
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"), right-padded with "#" to 16 chars

# UNRESOLVED: All above commands assume the 24-byte frame is filled with ASCII characters. Source documents the byte values for C=0x43, E=0x45, A=0x41, N=0x4E (message type) and the FourCC command names, but does not specify whether the four command bytes are always sent as the ASCII codes (e.g. 'P','O','W','R') or as raw binary values. The netcat example "*SCPOWR0000000000000000" implies ASCII; treat the FourCC field as 4 ASCII bytes.
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]
  source: response to getPowerStatus (byte 22 = 0 → Standby, 1 → Active)

- id: audio_mute_status
  type: enum
  values: [unmuted, muted]
  source: response to getAudioMute (byte 22 = 0 → Unmuted, 1 → Muted)

- id: picture_mute_status
  type: enum
  values: [disabled, enabled]
  source: response to getPictureMute (byte 22 = 0 → Disabled, 1 → Enabled)

- id: current_input
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  source: response to getInput (byte 13 = 1/3/4/5; bytes 17-20 = input number 0001-9999)

- id: current_scene
  type: string
  source: response to getSceneSetting (16-byte ASCII, e.g. "auto", "auto24pSync", "general")

- id: broadcast_address
  type: string
  source: response to getBroadcastAddress (16-byte ASCII, e.g. "192.168.0.14####")

- id: mac_address
  type: string
  source: response to getMacAddress (12 hex digits + "#" padding to 16 bytes)

# UNRESOLVED: Success/Error response shape - the Answer (A) frame uses 16 bytes of "0" for success and 16 bytes of "F" for error. This is shared across all commands; not modeled as a per-command feedback here.
```

## Variables
```yaml
# UNRESOLVED: not applicable - every settable parameter in the source is a discrete action
# (setAudioVolume, setAudioMute, setInput, setSceneSetting, setPowerStatus, setPictureMute, setIrccCode).
# No continuous range parameters exposed as standalone variables.
```

## Events
```yaml
- id: fire_power_change
  type: notification
  message_type: N
  fourcc: POWR
  payload_byte_22:
    "0": powering off
    "1": powering on
  description: Sent by monitor when power state changes

- id: fire_input_change
  type: notification
  message_type: N
  fourcc: INPT
  payload:
    - "0000000000000000"  # input change to monitor (per source description)
    - "0000000010000XXX"  # HDMI (1-9999)
    - "0000000003000XXX"  # Composite (1-9999)
    - "0000000004000XXX"  # Component (1-9999)
    - "0000000005000XXX"  # Screen Mirroring (1-9999)
  description: Sent when input change occurs

- id: fire_volume_change
  type: notification
  message_type: N
  fourcc: VOLU
  payload: "16-byte decimal volume value, right-padded with '0'"
  description: Sent when volume changes

- id: fire_mute_change
  type: notification
  message_type: N
  fourcc: AMUT
  payload_byte_22:
    "0": unmuting
    "1": muting
  description: Sent when audio mute state changes

- id: fire_picture_mute_change
  type: notification
  message_type: N
  fourcc: PMUT
  payload_byte_22:
    "0": picture mute enabled
    "1": picture mute disabled
  description: Sent when picture mute state changes
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Required monitor settings: enable "Remote device settings → Control remotely" and "Home network → IP control → Simple IP control" in the on-screen Settings menu before the port will accept commands.
- EU-area models have 3 specification variants under RED-DA; settings and available commands differ per variant (referenced but not enumerated in source).
- Frame format: every message is exactly 24 bytes. Header `0x2A 0x53`, footer `0x0A`. Parameters are 16 ASCII characters; numeric values are decimal digits left-padded with `0` to fill the field, and string values are right-padded with `#` (`0x23`).
- All Command (C) and Enquiry (E) frames elicit an Answer (A) frame; failure responses use 16 bytes of `F` (i.e. `FFFFFFFFFFFFFFFF`).
- The netcat example in the source (`*SCPOWR0000000000000000` for power off) shows the message body as printable ASCII including the leading `*S`, so the FourCC and parameter fields are ASCII-encoded bytes (not raw binary values).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: maximum supported audio volume value not stated in source. -->
<!-- UNRESOLVED: full list of EU RED-DA variant-specific commands not stated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-05-26T09:05:01.438Z
last_checked_at: 2026-05-31T22:39:30.995Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:39:30.995Z
matched_actions: 9
action_count: 9
confidence: medium
summary: "All 9 spec actions matched literal FourCC codes in source with correct parameters and transport. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 specification variants under RED-DA compliance; available commands differ per variant. Source does not enumerate the per-variant command differences."
- "base URL / path not applicable - protocol is raw TCP with fixed 24-byte frames"
- "All above commands assume the 24-byte frame is filled with ASCII characters. Source documents the byte values for C=0x43, E=0x45, A=0x41, N=0x4E (message type) and the FourCC command names, but does not specify whether the four command bytes are always sent as the ASCII codes (e.g. 'P','O','W','R') or as raw binary values. The netcat example \"*SCPOWR0000000000000000\" implies ASCII; treat the FourCC field as 4 ASCII bytes."
- "Success/Error response shape - the Answer (A) frame uses 16 bytes of \"0\" for success and 16 bytes of \"F\" for error. This is shared across all commands; not modeled as a per-command feedback here."
- "not applicable - every settable parameter in the source is a discrete action"
- "source does not document any multi-step sequences."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "firmware version compatibility not stated in source."
- "maximum supported audio volume value not stated in source."
- "full list of EU RED-DA variant-specific commands not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
