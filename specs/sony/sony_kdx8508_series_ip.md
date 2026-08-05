---
spec_id: admin/sony-kdx8508-series
schema_version: ai4av-public-spec-v1
revision: 3
title: "Sony KDX8508 Series Control Spec"
manufacturer: Sony
model_family: "KDX8508 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8508 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-28T06:39:22.180Z
last_checked_at: 2026-07-22T01:28:08.127Z
generated_at: 2026-07-22T01:28:08.127Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific KDX8508 sub-model variants (KD-55X8508C, KD-65X8508C, etc.) not confirmed against source. EU models have RED-DA variant specs with differing command availability."
  - "no standalone settable parameter variables defined separate from action commands in source."
  - "no explicit multi-step macro sequences defined in source."
  - "no explicit safety interlock procedures (e.g. power-on sequencing, confirmation dialogs) stated in source."
  - "specific KDX8508 sub-model enumeration not confirmed against source."
  - "firmware version compatibility not stated."
  - "authentication token format not applicable (auth.type: none)."
  - "power-on sequencing or confirmation requirements not stated."
  - "fault behavior and error recovery sequences not documented in source."
  - "source marks getBroadcastAddress and getMacAddress with a trailing \"*\" whose meaning is not explained in the source."
verification:
  verdict: verified
  checked_at: 2026-07-22T01:28:08.127Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched to source FourCC commands; transport parameters verified; the source event commands are represented in the spec Events section. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KDX8508 Series Control Spec

## Summary
Sony Bravia professional display series supports Simple IP Control — a fixed 24-byte TCP protocol on TCP port 20060 for controlling power, audio, video input, picture mute, scene setting, and IR-equivalent remote commands over a local network. No authentication required. EU-area models ship with three RED-DA specification variants and differing command availability. Both wired and wireless LANs are supported.

<!-- UNRESOLVED: specific KDX8508 sub-model variants (KD-55X8508C, KD-65X8508C, etc.) not confirmed against source. EU models have RED-DA variant specs with differing command availability. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060  # stated: "control listening port is TCP 20060"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred from setPowerStatus / togglePowerStatus
  - queryable  # inferred from getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting / getBroadcastAddress / getMacAddress
  - levelable  # inferred from setAudioVolume / getAudioVolume
  - routable   # inferred from setInput / getInput
  - muteable   # inferred from setAudioMute / getAudioMute / setPictureMute / getPictureMute / togglePictureMute
```

## Actions
```yaml
# All commands are 24-byte fixed TCP messages on port 20060.
# Header = 0x2A 0x53 ('*S'), Message Type byte, 4-byte FourCC, 16-byte params, 0x0A footer.
# Control type = 0x43 ('C'), Enquiry = 0x45 ('E').

- id: setIrccCode
  label: Send IR Command
  kind: action
  command: "*SCIRCC{ircc_code_padded_16}#"  # IRCC FourCC; pad code with leading zeros to 16 chars in Byte[7]-Byte[22]
  params:
    - name: ircc_code
      type: integer
      enum:
        - 5   # Display
        - 6   # Home
        - 7   # Options
        - 8   # Return
        - 9   # Up
        - 10  # Down
        - 11  # Right
        - 12  # Left
        - 13  # Confirm
        - 14  # Red
        - 15  # Green
        - 16  # Yellow
        - 17  # Blue
        - 18  # Num1
        - 19  # Num2
        - 20  # Num3
        - 21  # Num4
        - 22  # Num5
        - 23  # Num6
        - 24  # Num7
        - 25  # Num8
        - 26  # Num9
        - 27  # Num0
        - 30  # Volume Up
        - 31  # Volume Down
        - 32  # Mute
        - 33  # Channel Up
        - 34  # Channel Down
        - 35  # Subtitle
        - 38  # DOT
        - 50  # Picture Off
        - 61  # Wide
        - 62  # Jump
        - 76  # Sync Menu
        - 77  # Forward
        - 78  # Play
        - 79  # Rewind
        - 80  # Prev
        - 81  # Stop
        - 82  # Next
        - 84  # Pause
        - 86  # Flash Plus
        - 87  # Flash Minus
        - 98  # TV Power
        - 99  # Audio
        - 101 # Input
        - 104 # Sleep
        - 105 # Sleep Timer
        - 108 # Video 2
        - 110 # Picture Mode
        - 121 # Demo Surround
        - 124 # HDMI 1
        - 125 # HDMI 2
        - 126 # HDMI 3
        - 127 # HDMI 4
        - 129 # Action Menu
        - 130 # Help
      description: IR command code from the IR Commands table. The source documents these specific values; codes are encoded as 16-digit decimal in Byte[7]-Byte[22] of the parameter field.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{power}#"  # 'C' type, FourCC=POWR, power value in last byte of params
  params:
    - name: power
      type: integer
      enum:
        - 0  # Standby (Off)
        - 1  # Active (On)

- id: getPowerStatus
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # 'E' type, FourCC=POWR, 16-byte '#' placeholder params
  params: []

- id: togglePowerStatus
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"  # 'C' type, FourCC=TPOW, 16-byte '#' placeholder params
  params: []

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded_16}#"  # 'C' type, FourCC=VOLU, volume as 16-digit decimal (e.g. 0000000000000029 for 29)
  params:
    - name: volume
      type: integer
      description: Volume value, decimal digit pad on the left with "0" to 16 chars (e.g. 29 -> "0000000000000029").

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"  # 'E' type, FourCC=VOLU, '#' placeholder params
  params: []

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{mute}#"  # 'C' type, FourCC=AMUT, mute value in last byte
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Unmute
        - 1  # Mute

- id: getAudioMute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"  # 'E' type, FourCC=AMUT, '#' placeholder params
  params: []

- id: setInput
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{type}000{port_padded_4}#"  # 'C' type, FourCC=INPT, type in byte 8 (counting from Byte[7] as 1), port in last 4 bytes
  params:
    - name: type
      type: integer
      enum:
        - 1  # HDMI
        - 3  # Composite
        - 4  # Component
        - 5  # Screen Mirroring
    - name: port
      type: integer
      description: Port number (1-9999), right-padded with '0' to 4 bytes in the parameter field.

- id: getInput
  label: Get Current Input
  kind: query
  command: "*SEINPT################"  # 'E' type, FourCC=INPT, '#' placeholder params
  params: []

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{mute}#"  # 'C' type, FourCC=PMUT, mute value in last byte
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Disables picture mute (normal display)
        - 1  # Turns screen black (picture mute on)

- id: getPictureMute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################"  # 'E' type, FourCC=PMUT, '#' placeholder params
  params: []

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"  # 'C' type, FourCC=TPMU, '#' placeholder params
  params: []

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded_16_right_hash}#"  # 'C' type, FourCC=SCEN, scene string right-padded with "#" to 16 chars
  params:
    - name: scene
      type: string
      enum:
        - "auto"
        - "auto24pSync"
        - "general"
      description: Scene setting value (case-sensitive), right-padded with "#" to 16 chars. Examples: "auto24pSync#####".

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"  # 'E' type, FourCC=SCEN, '#' placeholder params
  params: []

- id: getBroadcastAddress
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{interface_padded_right_hash}#"  # 'E' type, FourCC=BADR, interface string (e.g. "eth0") in first 4 bytes, right-padded with "#"
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. "eth0"), 4-char ASCII, right-padded with "#" to fill 16-byte param field.

- id: getMacAddress
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface_padded_right_hash}#"  # 'E' type, FourCC=MADR, interface string in first 4 bytes, right-padded with "#"
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. "eth0"), 4-char ASCII, right-padded with "#" to fill 16-byte param field.
```

## Feedbacks
```yaml
- id: powerStatusAnswer
  type: enum
  values:
    - "0"  # Standby (Off)
    - "1"  # Active (On)
    - "F"  # Error

- id: audioVolumeAnswer
  type: string
  description: Volume value as zero-padded decimal string in 16-byte field, or "F...F" (16 F's) for error.

- id: audioMuteAnswer
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted
    - "F"  # Error

- id: inputAnswer
  type: enum
  values:
    - "0"  # Success
    - "N"  # Not Found (16 N's)
    - "F"  # Error

- id: pictureMuteAnswer
  type: enum
  values:
    - "0"  # Disabled (Picture mute off)
    - "1"  # Enabled (Picture mute on)
    - "F"  # Error

- id: sceneSettingAnswer
  type: string
  description: Scene setting value or "N...N" (16 N's, not available for current input) or "F...F" (error).

- id: broadcastAddressAnswer
  type: string
  description: IPv4 address padded on right with "#" to 16 bytes, or "F...F" for error.

- id: macAddressAnswer
  type: string
  description: MAC address padded on right with "#" to 16 bytes, or "F...F" for error.

- id: irccAnswer
  type: enum
  values:
    - "0"  # Success
    - "F"  # Error
```

## Variables
```yaml
# UNRESOLVED: no standalone settable parameter variables defined separate from action commands in source.
# All parameters handled via action commands.
```

## Events
```yaml
# Monitor-initiated Notify messages (N type, 0x4E in Byte[2]):

- id: firePowerChange
  type: notification
  description: Sent when display powers off or on.
  command: "*SNPOWR000000000000000{power}#"  # 'N' type, FourCC=POWR
  params:
    - name: power
      type: integer
      enum:
        - 0  # Powering off
        - 1  # Powering on

- id: fireInputChange
  type: notification
  description: Sent when input change occurs.
  command: "*SNINPT0000000000{type}000{port_padded_4}#"  # 'N' type, FourCC=INPT
  params:
    - name: type
      type: integer
      enum:
        - 0  # Generic input change
        - 1  # HDMI (1-9999)
        - 3  # Composite (1-9999)
        - 4  # Component (1-9999)
        - 5  # Screen Mirroring (1-9999)
    - name: port
      type: integer
      description: Port number (1-9999), right-padded with '0' to 4 bytes.

- id: fireVolumeChange
  type: notification
  description: Sent when volume changes. Parameter is current volume value.
  command: "*SNVOLU{volume_padded_16}#"  # 'N' type, FourCC=VOLU, 16-digit decimal volume
  params:
    - name: volume
      type: integer
      description: Current volume value as 16-digit decimal.

- id: fireMuteChange
  type: notification
  description: Sent when audio mute state changes.
  command: "*SNAMUT000000000000000{mute}#"  # 'N' type, FourCC=AMUT
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Unmuting
        - 1  # Muting

- id: firePictureMuteChange
  type: notification
  description: Sent when picture mute state changes.
  command: "*SNPMUT000000000000000{mute}#"  # 'N' type, FourCC=PMUT
  params:
    - name: mute
      type: integer
      enum:
        - 0  # Picture mute disabled
        - 1  # Picture mute enabled
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences defined in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - EU models: RED-DA compliance specification imposes 3 types of specifications with differing settings and available commands. Reference https://pro-bravia.sony.net/setup/device-settings/red-da/ for EU-specific constraints.
# UNRESOLVED: no explicit safety interlock procedures (e.g. power-on sequencing, confirmation dialogs) stated in source.
```

## Notes

**Protocol format:** Fixed 24-byte TCP messages. Header `*S` (0x2A 0x53), Message Type byte (C/E/A/N), FourCC command (4 bytes), Parameters (16 bytes), Footer 0x0A (LF).

**Example — Power OFF request:** `*SCPOWR0000000000000000` → `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (Accepts + current status Notify).

**IR Commands** (via setIrccCode): Full remote button code table documented — Display, Home, Options, Return, Up/Down/Left/Right, Confirm, Red/Green/Yellow/Blue, Num0-9, Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, Forward, Play, Rewind, Prev, Stop, Next, Pause, Flash Plus/Minus, TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help. Codes are zero-padded to 16 bytes in the parameter field.

**EU RED-DA note:** EU area models have 3 specification types with different command availability. Not all commands available on all EU variants.

**Required monitor settings:** Remote Device Control must be enabled at [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely]. Simple IP Control must be enabled at [Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control].

**Network:** Both wired and wireless LANs are supported (stated in source).

<!-- UNRESOLVED: specific KDX8508 sub-model enumeration not confirmed against source. -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: authentication token format not applicable (auth.type: none). -->
<!-- UNRESOLVED: power-on sequencing or confirmation requirements not stated. -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented in source. -->
<!-- UNRESOLVED: source marks getBroadcastAddress and getMacAddress with a trailing "*" whose meaning is not explained in the source. -->
````

Diff vs rev 2: Traits filled (was comments). Revision 2→3. Summary +1 sentence on wired/wireless LAN. Notes +1 line on network. 2 new UNRESOLVED markers (asterisk meaning). All action/event/feedback IDs + shapes untouched.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net
retrieved_at: 2026-05-28T06:39:22.180Z
last_checked_at: 2026-07-22T01:28:08.127Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:28:08.127Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched to source FourCC commands; transport parameters verified; the source event commands are represented in the spec Events section. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific KDX8508 sub-model variants (KD-55X8508C, KD-65X8508C, etc.) not confirmed against source. EU models have RED-DA variant specs with differing command availability."
- "no standalone settable parameter variables defined separate from action commands in source."
- "no explicit multi-step macro sequences defined in source."
- "no explicit safety interlock procedures (e.g. power-on sequencing, confirmation dialogs) stated in source."
- "specific KDX8508 sub-model enumeration not confirmed against source."
- "firmware version compatibility not stated."
- "authentication token format not applicable (auth.type: none)."
- "power-on sequencing or confirmation requirements not stated."
- "fault behavior and error recovery sequences not documented in source."
- "source marks getBroadcastAddress and getMacAddress with a trailing \"*\" whose meaning is not explained in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
