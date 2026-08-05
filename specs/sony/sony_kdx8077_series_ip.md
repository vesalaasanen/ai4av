---
spec_id: admin/sony-kdx8077-series
schema_version: ai4av-public-spec-v1
revision: 3
title: "Sony KDX8077 Series Control Spec"
manufacturer: Sony
model_family: "KDX8077 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8077 Series"
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
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T05:42:40.892Z
last_checked_at: 2026-07-22T01:23:57.459Z
generated_at: 2026-07-22T01:23:57.459Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA compliance variants have different command sets"
  - "no discrete settable parameters beyond actions above"
  - "no explicit macro sequences defined in source"
  - "no safety warnings or interlock procedures in source"
  - "EU RED-DA compliance command differences not documented here"
  - "IP control authentication not described in source — no auth required"
verification:
  verdict: verified
  checked_at: 2026-07-22T01:23:57.459Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 Actions matched literally to source C/E commands; transport verified; the 5 N-type notifications are documented in the spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-16
---

# Sony KDX8077 Series Control Spec

## Summary
Sony BRAVIA Professional Display. Simple IP Control over TCP port 20060. Fixed 24-byte SSIP commands for power, volume, mute, input routing, picture mute, scene settings, IR code transmission, and network interface queries. EU RED-DA models have variant command sets (see Notes).

<!-- UNRESOLVED: EU RED-DA compliance variants have different command sets -->

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
- powerable
- queryable
- levelable
- routable
```

## Actions
```yaml
# 24-byte SSIP message format:
#   Byte[0-1]   Header: 0x2A 0x53 ("*S")
#   Byte[2]     Message Type: C (0x43) / E (0x45) / A (0x41) / N (0x4E)
#   Byte[3-6]   FourCC command
#   Byte[7-22]  16-char ASCII parameter (left-pad "0" or right-pad "#")
#   Byte[23]    Footer: 0x0A (LF)
# Each command template below is a literal 24-byte payload verbatim from the source.

- id: setPowerStatus
  label: Set Power Status
  kind: action
  command: "*SCPOWR0000000000000000"  # Standby (Off)
  params:
    - name: power
      type: integer
      description: 0 = Standby (Off), 1 = Active (On). Encoded at Byte[22] of the 16-char parameter.

- id: getPowerStatus
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"
  params: []

- id: togglePowerStatus
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

- id: setAudioVolume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU0000000000000000"  # example payload, volume digits at Byte[7-22]
  params:
    - name: volume
      type: string
      description: Decimal digit string, left-padded with "0" to 16 chars. e.g., "0000000000000029"

- id: getAudioVolume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: setAudioMute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT0000000000000000"  # Unmute
  params:
    - name: mute
      type: integer
      description: 0 = Unmute, 1 = Mute. Encoded at Byte[22].

- id: getAudioMute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################"
  params: []

- id: setInput
  label: Set Input
  kind: action
  command: "*SCINPT0000000100000001"  # example: HDMI 1 (input_type=1 at Byte[14], input_id=0001 at Byte[19-22])
  params:
    - name: input_type
      type: integer
      description: 1 = HDMI, 3 = Composite, 4 = Component, 5 = Screen Mirroring. Encoded at Byte[14].
    - name: input_id
      type: integer
      description: Input number (1-9999). Encoded at Byte[19-22], left-padded "0".

- id: getInput
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: setPictureMute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT0000000000000000"  # Disabled
  params:
    - name: mute
      type: integer
      description: 0 = Disabled (picture mute off), 1 = Enabled (screen black). Encoded at Byte[22].

- id: getPictureMute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################"
  params: []

- id: togglePictureMute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################"
  params: []

- id: setSceneSetting
  label: Set Scene Setting
  kind: action
  command: "*SCSCENauto24pSync#####"  # example payload
  params:
    - name: scene
      type: string
      description: "auto", "auto24pSync", or "general" - case-sensitive, right-padded with "#"

- id: getSceneSetting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: setIrccCode
  label: Send IR Command
  kind: action
  command: "*SCIRCC0000000000000000"  # example: Display (code 0x05) at Byte[22]
  params:
    - name: ircc_code
      type: string
      description: |
        IR code parameter (16-char, zero-padded hex table index):
        05=Display, 06=Home, 07=Options, 08=Return, 09=Up, 10=Down,
        11=Right, 12=Left, 13=Confirm, 14=Red, 15=Green, 16=Yellow, 17=Blue,
        18=Num1, 19=Num2, 20=Num3, 21=Num4, 22=Num5, 23=Num6, 24=Num7, 25=Num8,
        26=Num9, 27=Num0, 30=Volume Up, 31=Volume Down, 32=Mute,
        33=Channel Up, 34=Channel Down, 35=Subtitle, 38=DOT, 50=Picture Off,
        61=Wide, 62=Jump, 76=Sync Menu, 77=Forward, 78=Play, 79=Rewind,
        80=Prev, 81=Stop, 82=Next, 84=Pause, 86=Flash Plus, 87=Flash Minus,
        98=TV Power, 99=Audio, 101=Input, 104=Sleep, 105=Sleep Timer,
        108=Video 2, 110=Picture Mode, 121=Demo Surround,
        124=HDMI 1, 125=HDMI 2, 126=HDMI 3, 127=HDMI 4, 129=Action Menu, 130=Help

- id: getBroadcastAddress
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############"  # example: eth0
  params:
    - name: interface
      type: string
      description: Interface name, e.g., "eth0". Right-padded with "#" in Byte[10-22].

- id: getMacAddress
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############"  # example: eth0
  params:
    - name: interface
      type: string
      description: Interface name, e.g., "eth0". Right-padded with "#" in Byte[10-22].
```

## Feedbacks
```yaml
- id: powerStatus
  type: enum
  values:
    - "0"  # Standby (Off)
    - "1"  # Active (On)
    - "FFFFFFFFFFFFFFFF"  # Error

- id: audioVolume
  type: string
  description: 16-char decimal string

- id: audioMute
  type: enum
  values:
    - "0"  # Not Muted
    - "1"  # Muted
    - "FFFFFFFFFFFFFFFF"  # Error

- id: currentInput
  type: enum
  values:
    - "000000010000XXXX"  # HDMI (XXXX = input number)
    - "000000030000XXXX"  # Composite (XXXX = input number)
    - "000000040000XXXX"  # Component (XXXX = input number)
    - "000000050000XXXX"  # Screen Mirroring (XXXX = input number)
    - "NNNNNNNNNNNNNNNN"  # Not Found

- id: pictureMute
  type: enum
  values:
    - "0"  # Disabled (Picture mute off)
    - "1"  # Enabled (Picture mute on)
    - "FFFFFFFFFFFFFFFF"  # Error

- id: sceneSetting
  type: string
  description: "auto", "auto24pSync", or "general" (right-padded "#"), or "NNNNNNNNNNNNNNNN" (Not available)

- id: broadcastAddress
  type: string
  description: IPv4 address string, right-padded with "#"

- id: macAddress
  type: string
  description: MAC address string (XX:XX:XX:XX:XX:XX), right-padded with "#"
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters beyond actions above
```

## Events
```yaml
- id: firePowerChange
  description: Monitor sends when power state changes
  command: "*SNPOWR0000000000000000"  # example: power off
  params:
    - name: power
      type: integer
      description: 0 = powering off, 1 = powering on. Encoded at Byte[22].

- id: fireInputChange
  description: Monitor sends when input changes
  command: "*SNINPT0000000000000000"  # example: cleared input
  params:
    - name: input_type
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring. Encoded at Byte[14].
    - name: input_id
      type: integer
      description: Input number (1-9999). Encoded at Byte[19-22], left-padded "0".

- id: fireVolumeChange
  description: Monitor sends when volume changes
  command: "*SNVOLU0000000000000000"  # example payload
  params:
    - name: volume
      type: string
      description: 16-char decimal volume value

- id: fireMuteChange
  description: Monitor sends when mute state changes
  command: "*SNAMUT0000000000000000"  # example: unmuting
  params:
    - name: mute
      type: integer
      description: 0 = unmuting, 1 = muting. Encoded at Byte[22].

- id: firePictureMuteChange
  description: Monitor sends when picture mute changes
  command: "*SNPMUT0000000000000000"  # example: picture mute enabled
  params:
    - name: mute
      type: integer
      description: 0 = picture mute enabled, 1 = picture mute disabled. Encoded at Byte[22].
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
SSIP protocol — 24-byte fixed message length. Header: `0x2A 0x53` (`*S`). Footer: `0x0A` (LF). Message types: C=Control, E=Enquiry, A=Answer, N=Notify. Commands use FourCC ASCII at bytes 3–6. Parameters at bytes 7–22.

Prerequisite settings: [Settings] → [Network & Internet] → [Remote device settings] → [Control remotely], then [Settings] → [Network & Internet] → [Home network] → [IP control] → [Simple IP control].

EU RED-DA: EU area models ship in 3 RED-DA spec variants; settings and available commands differ per variant. Refer to https://pro-bravia.sony.net/setup/device-settings/red-da/ for the per-variant command list.

Power-off example (verbatim from source): request `*SCPOWR0000000000000000` → responses `*SAPOWR0000000000000000` (accept) and `*SNPOWR0000000000000000` (current power off).

<!-- UNRESOLVED: EU RED-DA compliance command differences not documented here -->
<!-- UNRESOLVED: IP control authentication not described in source — no auth required -->
```

---

Changes rev2→rev3:
- **Fixed `setInput`**: input_type byte position `Byte[15]`→`Byte[14]`; example payload `*SCINPT0000000001000000`→`*SCINPT0000000100000001` (1 was 2 positions off; source param row + own Feedback section both confirm Byte[14])
- **Fixed `fireInputChange`**: same `Byte[15]`→`Byte[14]` correction in param description
- Bumped revision 2→3, updated `created_at`

All 22 source commands already present — no missing commands found. Coverage complete.

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-05-26T05:42:40.892Z
last_checked_at: 2026-07-22T01:23:57.459Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T01:23:57.459Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 Actions matched literally to source C/E commands; transport verified; the 5 N-type notifications are documented in the spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA compliance variants have different command sets"
- "no discrete settable parameters beyond actions above"
- "no explicit macro sequences defined in source"
- "no safety warnings or interlock procedures in source"
- "EU RED-DA compliance command differences not documented here"
- "IP control authentication not described in source — no auth required"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
