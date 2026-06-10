---
spec_id: admin/sony-kjx8300-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJX8300 Series Control Spec"
manufacturer: Sony
model_family: "KJX8300 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KJX8300 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/setup/device-settings/red-da
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-09T01:48:44.944Z
last_checked_at: 2026-06-09T07:22:55.736Z
generated_at: 2026-06-09T07:22:55.736Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list of RED-DA specification variants not enumerated in source; firmware range not stated"
  - "no multi-step sequences described in source"
  - "source notes EU RED-DA compliance variants restrict available commands, but no specific safety interlocks documented"
  - "firmware version compatibility; full IRCC code parameterization; broadcast/MAC commands marked EU-only in source — applicability to other regions unconfirmed"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:22:55.736Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions matched verbatim in source command table. Transport port 20060 confirmed. Full bidirectional protocol coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KJX8300 Series Control Spec

## Summary
Sony BRAVIA Professional Display (KJX8300 Series) Simple IP control protocol. 24-byte fixed TCP messages on port 20060. Four-CC ASCII commands for power, input, volume, mute, picture mute, scene, IR passthrough. EU models have RED-DA spec variants with restricted command set.

<!-- UNRESOLVED: list of RED-DA specification variants not enumerated in source; firmware range not stated -->

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
- powerable       # inferred from setPowerStatus / togglePowerStatus
- routable        # inferred from setInput
- queryable       # inferred from getPowerStatus, getInput, etc.
- levelable       # inferred from setAudioVolume
```

## Actions
```yaml
- id: set_ircc_code
  label: Set IRCC Code
  kind: action
  command: "*SCIRCC000000000000{ircc_code}"  # 24-byte frame; pad ircc_code per IR Commands table
  params:
    - name: ircc_code
      type: string
      description: Two-digit IRCC code (see IR Commands table, e.g. 09=Up, 30=Volume Up)
  notes: Frame = header 0x2A 0x53 'C' 'I' 'R' 'C' 'C' + 16-byte param + footer 0x0A

- id: set_power_status_standby
  label: Set Power Standby (Off)
  kind: action
  command: "*SCPOWR0000000000000000"  # 24-byte Control frame
  params: []

- id: set_power_status_active
  label: Set Power Active (On)
  kind: action
  command: "*SCPOWR0000000000000001"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # Enquiry; 16 '#' = parameter filler
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU00000000000{volume_padded}"  # 16-char param, right-padded with '0', e.g. 0000000000000029 = 29
  params:
    - name: volume
      type: integer
      description: Volume value (0-100 typical, exact range UNRESOLVED)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute_off
  label: Set Audio Mute Off
  kind: action
  command: "*SCAMUT0000000000000000"
  params: []

- id: set_audio_mute_on
  label: Set Audio Mute On
  kind: action
  command: "*SCAMUT0000000000000001"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{kind}{port_padded}"  # kind: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port 1-9999
  params:
    - name: kind
      type: integer
      description: Input type: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Input port number (1-9999)

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute_off
  label: Set Picture Mute Off
  kind: action
  command: "*SCPMUT0000000000000000"
  params: []

- id: set_picture_mute_on
  label: Set Picture Mute On (Screen Black)
  kind: action
  command: "*SCPMUT0000000000000001"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
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
  command: "*SCSCEN{scene_padded}"  # 16-byte param, right-padded with '#', e.g. "auto24pSync#####"
  params:
    - name: scene
      type: string
      description: Scene name (case-sensitive): "auto", "auto24pSync", "general"; right-pad with '#' to 16 chars

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address (Eth0)
  kind: query
  command: "*SEBADREth0###########"  # 16-byte param: "eth0" + 12 '#'
  params: []
  notes: EU models only (per source)

- id: get_mac_address
  label: Get MAC Address (Eth0)
  kind: query
  command: "*SEMADREth0###########"  # 16-byte param: "eth0" + 12 '#'
  params: []
  notes: EU models only (per source)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  notes: "From getPowerStatus Answer: byte[22] = 0=Standby, 1=Active, F=Error"

- id: audio_volume
  type: integer
  notes: "From getAudioVolume Answer: 16-byte value, e.g. 0000000000000029 = 29"

- id: audio_mute
  type: enum
  values: [unmuted, muted]

- id: current_input
  type: object
  notes: "From getInput Answer: byte[11] = 1=HDMI/3=Composite/4=Component/5=Screen Mirroring; bytes[16-19] = port 1-9999"

- id: picture_mute
  type: enum
  values: [disabled, enabled]

- id: scene_setting
  type: string
  notes: "From getSceneSetting Answer: case-sensitive string padded with '#'"

- id: broadcast_address
  type: string
  notes: "From getBroadcastAddress Answer: e.g. 192.168.0.14## padded with '#'"

- id: mac_address
  type: string
  notes: "From getMacAddress Answer: MAC padded with '#'"
```

## Variables
```yaml
- id: ircc_code_table
  type: map
  notes: "IRCC code mapping (setIrccCode parameter): Display=5, Home=6, Options=7, Return=8, Up=9, Down=10, Right=11, Left=12, Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18, Num2=19, Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26, Num0=27, VolumeUp=30, VolumeDown=31, Mute=32, ChannelUp=33, ChannelDown=34, Subtitle=35, DOT=38, PictureOff=50, Wide=61, Jump=62, SyncMenu=76, Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84, FlashPlus=86, FlashMinus=87, TVPower=98, Audio=99, Input=101, Sleep=104, SleepTimer=105, Video2=108, PictureMode=110, DemoSurround=121, HDMI1=124, HDMI2=125, HDMI3=126, HDMI4=127, ActionMenu=129, Help=130"
```

## Events
```yaml
- id: fire_power_change
  message_type: N
  fourcc: POWR
  notes: "Sent when power state changes. byte[22]: 0=powering off, 1=powering on"

- id: fire_input_change
  message_type: N
  fourcc: INPT
  notes: "Sent when input changes. byte[11]: 1=HDMI/3=Composite/4=Component/5=Screen Mirroring; bytes[16-19]: port 1-9999"

- id: fire_volume_change
  message_type: N
  fourcc: VOLU
  notes: "Sent when volume changes. 16-byte value"

- id: fire_mute_change
  message_type: N
  fourcc: AMUT
  notes: "Sent when mute state changes. byte[22]: 0=unmuting, 1=muting"

- id: fire_picture_mute_change
  message_type: N
  fourcc: PMUT
  notes: "Sent when picture mute state changes. byte[22]: 0=enabled, 1=disabled (per source table)"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source notes EU RED-DA compliance variants restrict available commands, but no specific safety interlocks documented
```

## Notes
**Frame format:** Every message is exactly 24 bytes: header `0x2A 0x53` ("*S"), 1-byte message type, 4-byte Four-CC command, 16-byte parameter field, footer `0x0A`. Message types: `C` (Control), `E` (Enquiry), `A` (Answer), `N` (Notify).

**Parameter padding:** Numeric/enum params use ASCII '0' for left-pad and '#' for right-pad. String params right-pad with '#' to 16 chars (e.g. `auto24pSync#####`).

**Error responses:** Answer frames with all-`F` (or all-`N`) parameter bytes indicate error/not-found.

**EU models:** Three RED-DA specification variants with differing settings/commands. Reference https://pro-bravia.sony.net/setup/device-settings/red-da/ for per-variant details (not enumerated in source).

**Volume range:** Source does not state min/max volume value; integer range UNRESOLVED.

**Required monitor settings:** Remote device control and Simple IP control must be enabled in on-screen settings (Network & Internet → Home network → IP control).

<!-- UNRESOLVED: firmware version compatibility; full IRCC code parameterization; broadcast/MAC commands marked EU-only in source — applicability to other regions unconfirmed -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/rest-api
  - https://pro-bravia.sony.net/setup/device-settings/red-da
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-09T01:48:44.944Z
last_checked_at: 2026-06-09T07:22:55.736Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:22:55.736Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions matched verbatim in source command table. Transport port 20060 confirmed. Full bidirectional protocol coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list of RED-DA specification variants not enumerated in source; firmware range not stated"
- "no multi-step sequences described in source"
- "source notes EU RED-DA compliance variants restrict available commands, but no specific safety interlocks documented"
- "firmware version compatibility; full IRCC code parameterization; broadcast/MAC commands marked EU-only in source — applicability to other regions unconfirmed"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
