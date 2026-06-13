---
spec_id: admin/sony-kdlw700-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW700 Series Control Spec"
manufacturer: Sony
model_family: "KDLW700 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDLW700 Series"
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
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-12T04:28:30.168Z
last_checked_at: 2026-06-12T19:48:41.919Z
generated_at: 2026-06-12T19:48:41.919Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU area models have 3 RED-DA specification variants with different available commands; full per-variant command matrix not provided in source."
  - "source documents no settable numeric/scalar parameters beyond the discrete actions above"
  - "source documents no multi-step macro sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source. EU RED-DA variant-specific command availability not fully documented in source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:48:41.919Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched verbatim with source command definitions; transport parameters confirmed; complete coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDLW700 Series Control Spec

## Summary
BRAVIA Professional Displays KDLW700 Series monitor controlled over TCP/IP using Sony's SSIP Simple IP Control protocol. All messages are 24-byte fixed-length frames (2-byte header `*S`, 1-byte message type, 4-byte FourCC command, 16-byte parameter, 1-byte LF footer) on TCP port 20060.

<!-- UNRESOLVED: EU area models have 3 RED-DA specification variants with different available commands; full per-variant command matrix not provided in source. -->

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
- powerable       # inferred from setPowerStatus / togglePowerStatus / getPowerStatus
- routable        # inferred from setInput / getInput (HDMI, Composite, Component, Screen Mirroring)
- queryable       # inferred from getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting / getBroadcastAddress / getMacAddress
- levelable       # inferred from setAudioVolume / getAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Set IRCC Code (sends IR remote command)
  kind: action
  command: "*SCIRCC{ircc}###########"  # 4 ASCII bytes IRCC + padded params, 0x0A footer
  params:
    - name: ircc
      type: string
      description: 2-digit decimal IR command code (see IR Commands table in source)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}\n"  # 0=Standby, 1=Active
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Standby (Off), 1=Active (On)"

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
  command: "*SCVOLU{volume}##########\n"  # volume as 16-digit decimal, right-padded with 0
  params:
    - name: volume
      type: integer
      description: Volume value (decimal, left-padded with 0 to 16 digits, e.g. 41 -> "0000000000000029")

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Unmute, 1=Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{type}000{port}###\n"  # type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port 1-9999
  params:
    - name: type
      type: integer
      enum: [1, 3, 4, 5]
      description: "1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring"
    - name: port
      type: integer
      description: Input number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}\n"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Disabled, 1=Enabled (screen black)"

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
  command: "*SCSCEN{scene}##########\n"  # scene: "auto", "auto24pSync", "general"; case-sensitive, right-pad with #
  params:
    - name: scene
      type: string
      enum: ["auto", "auto24pSync", "general"]
      description: Scene setting string, case-sensitive, right-padded with '#'

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address (eth0)
  kind: query
  command: "*SEBADReth0#############\n"  # EU models only (per source footnote)
  params:
    - name: interface
      type: string
      description: Interface name (source example uses "eth0")

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*SEMADReth0#############\n"  # EU models only (per source footnote)
  params:
    - name: interface
      type: string
      description: Interface name (source example uses "eth0")
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [active, standby]
  description: Reported in response to getPowerStatus / firePowerChange (0=Standby/Off, 1=Active/On)

- id: audio_volume
  type: integer
  description: Reported in getAudioVolume answer and fireVolumeChange notifications (16-digit decimal value, right-padded with '0')

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  description: Reported in getAudioMute answer and fireMuteChange (0=Unmuted, 1=Muted)

- id: current_input
  type: object
  description: Reported in getInput answer and fireInputChange; encodes input type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) and port number 1-9999

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Reported in getPictureMute answer and firePictureMuteChange (0=Disabled, 1=Enabled)

- id: scene_setting
  type: string
  description: Reported in getSceneSetting answer; "auto", "auto24pSync", "general", or 'N'x16 = not available for current input

- id: broadcast_address
  type: string
  description: IPv4 broadcast address of named interface; reported in getBroadcastAddress answer, right-padded with '#'

- id: mac_address
  type: string
  description: MAC address of named interface; reported in getMacAddress answer, right-padded with '#'

- id: control_ack
  type: enum
  values: [success, error]
  description: Common Answer (A) message; 16-byte '0' payload = success, 16-byte 'F' payload = error

- id: not_found
  type: enum
  values: [not_found]
  description: setInput answer 'N'x16 = input/port not found

- id: scene_not_available
  type: enum
  values: [not_available]
  description: setSceneSetting / getSceneSetting answer 'N'x16 = not available for current input
```

## Variables
```yaml
# UNRESOLVED: source documents no settable numeric/scalar parameters beyond the discrete actions above
```

## Events
```yaml
- id: fire_power_change
  message_type: N
  fourcc: POWR
  description: Monitor -> Client notification; byte[22]=0 sent on power off, byte[22]=1 sent on power on

- id: fire_input_change
  message_type: N
  fourcc: INPT
  description: Monitor -> Client notification when input changes; encodes type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) and port 1-9999

- id: fire_volume_change
  message_type: N
  fourcc: VOLU
  description: Monitor -> Client notification on volume change; 16-digit decimal value, right-padded with '0'

- id: fire_mute_change
  message_type: N
  fourcc: AMUT
  description: Monitor -> Client notification on mute change; byte[22]=0 unmute, 1 mute

- id: fire_picture_mute_change
  message_type: N
  fourcc: PMUT
  description: Monitor -> Client notification on picture mute change; byte[22]=0 enabled, 1 disabled (note: source row text is inverted from get/set encoding; record as source states)
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Protocol uses 24-byte fixed frames: `0x2A 0x53` (header `*S`) + 1 byte type (`C`/`E`/`A`/`N`) + 4 ASCII command bytes (FourCC) + 16 ASCII parameter bytes (right-padded with `0` for control values, `#` for string parameters) + `0x0A` (LF footer). Source example power-off request: `*SCPOWR0000000000000000`; example response: `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (SA* = accept, SN* = current state notify). Volume values are 16-digit decimals, left-padded with `0` (e.g. volume 41 hex = decimal 41 encoded as `0000000000000029`). IR commands via `setIrccCode` use 2-digit decimal codes (e.g. Display=05, Home=06, VolumeUp=30, Mute=32, TVPower=98, HDMI1=124); full IR code table is in the source. EU-area KDLW700 models ship in 3 RED-DA compliance variants; available commands and settings differ per variant (see https://pro-bravia.sony.net/setup/device-settings/red-da/). `getBroadcastAddress` and `getMacAddress` carry a `*` footnote in source restricting them to EU models. Required monitor settings: Settings -> Network & Internet -> Remote device settings -> Control remotely; and Settings -> Network & Internet -> Home network -> IP control -> Simple IP control. Both wired and wireless LAN supported.

<!-- UNRESOLVED: firmware version compatibility not stated in source. EU RED-DA variant-specific command availability not fully documented in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/ip-control-comparison/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-12T04:28:30.168Z
last_checked_at: 2026-06-12T19:48:41.919Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:48:41.919Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched verbatim with source command definitions; transport parameters confirmed; complete coverage of source command catalogue. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU area models have 3 RED-DA specification variants with different available commands; full per-variant command matrix not provided in source."
- "source documents no settable numeric/scalar parameters beyond the discrete actions above"
- "source documents no multi-step macro sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated in source. EU RED-DA variant-specific command availability not fully documented in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
