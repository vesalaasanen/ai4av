---
spec_id: admin/sony-kdxh8005-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXH8005 Series Control Spec"
manufacturer: Sony
model_family: KD-43XH8005
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-43XH8005
    - KD-49XH8005
    - KD-55XH8005
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:21.640Z
generated_at: 2026-05-31T22:41:21.640Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T22:41:21.640Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched literally in source with correct FourCC codes and message types; transport verified; source commands fully represented."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Sony KDXH8005 Series Control Spec

## Summary
Sony BRAVIA XH8005 series professional displays controlled via Simple IP Control (SSIP) protocol over TCP port 20060. Fixed-length 24-byte binary messages with Four-CC command identifiers. Supports power, volume, mute, input selection, picture mute, scene setting, IR remote emulation, and network queries. EU models have RED-DA compliance variants with differing command availability.

<!-- UNRESOLVED: EU RED-DA variant command differences not documented — source references external page -->
<!-- UNRESOLVED: volume range not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

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
- powerable    # setPowerStatus / togglePowerStatus present
- queryable    # getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting present
- routable     # setInput with HDMI/Composite/Component/Screen Mirroring present
- levelable    # setAudioVolume present
```

## Actions
```yaml
# --- Power ---
- id: set_power_status_off
  label: Power Standby (Off)
  kind: action
  fourcc: POWR
  msg_type: C
  params:
    - name: state
      type: string
      enum: ["0000000000000000", "0000000000000001"]
      description: "0000000000000000 = Standby/Off, 0000000000000001 = Active/On"
  description: "Set power state. Param 0000000000000000 = Standby, 0000000000000001 = Active."

- id: get_power_status
  label: Get Power Status
  kind: query
  fourcc: POWR
  msg_type: E
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  fourcc: TPOW
  msg_type: C
  params: []

# --- Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  fourcc: VOLU
  msg_type: C
  params:
    - name: volume
      type: string
      description: "Volume as decimal digits left-padded with 0, 16 chars total. e.g. 0000000000000029"
  description: "Set volume value in decimal, left-padded with 0s to 16 characters."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  fourcc: VOLU
  msg_type: E
  params: []

# --- Audio Mute ---
- id: set_audio_mute_off
  label: Audio Unmute
  kind: action
  fourcc: AMUT
  msg_type: C
  params:
    - name: state
      type: string
      enum: ["0000000000000000", "0000000000000001"]
      description: "0000000000000000 = Unmute, 0000000000000001 = Mute"

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  fourcc: AMUT
  msg_type: E
  params: []

# --- Input ---
- id: set_input
  label: Set Input
  kind: action
  fourcc: INPT
  msg_type: C
  params:
    - name: input_type
      type: string
      enum: ["000000010000XXXX", "000000030000XXXX", "000000040000XXXX", "000000050000XXXX"]
      description: "Byte[10]=01 HDMI, 03 Composite, 04 Component, 05 Screen Mirroring. Bytes[15-18]=port number 1-9999 left-padded."
  description: "Change input. Byte[10]: 01=HDMI, 03=Composite, 04=Component, 05=Screen Mirroring. Last 4 bytes = port (1-9999) left-padded."

- id: get_input
  label: Get Current Input
  kind: query
  fourcc: INPT
  msg_type: E
  params: []

# --- Picture Mute ---
- id: set_picture_mute_off
  label: Picture Mute Disable
  kind: action
  fourcc: PMUT
  msg_type: C
  params:
    - name: state
      type: string
      enum: ["0000000000000000", "0000000000000001"]
      description: "0000000000000000 = Disable, 0000000000000001 = Enable (black screen)"

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  fourcc: PMUT
  msg_type: E
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  fourcc: TPMU
  msg_type: C
  params: []

# --- Scene Setting ---
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  fourcc: SCEN
  msg_type: C
  params:
    - name: scene
      type: string
      enum: ["auto", "auto24pSync", "general"]
      description: "Case-sensitive. Right-padded with # to 16 chars. e.g. auto24pSync#####"
  description: "Set scene mode. Values: auto, auto24pSync, general. Case-sensitive, right-pad with #."

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  fourcc: SCEN
  msg_type: E
  params: []

# --- IR Remote Emulation ---
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  fourcc: IRCC
  msg_type: C
  params:
    - name: code
      type: string
      description: "16-char IR code parameter. See IR command table."
  description: "Sends IR remote control code. See IR Commands table for code values."

# --- Network Queries ---
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  fourcc: BADR
  msg_type: E
  params:
    - name: interface
      type: string
      description: "Interface identifier. e.g. eth0#####"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  fourcc: MADR
  msg_type: E
  params:
    - name: interface
      type: string
      description: "Interface identifier. e.g. eth0#####"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: "Answer to getPowerStatus. 0000000000000000=Off, 0000000000000001=On."

- id: audio_volume
  type: string
  description: "Answer to getAudioVolume. 16-char decimal left-padded volume value."

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Answer to getAudioMute. 0000000000000000=Not Muted, 0000000000000001=Muted."

- id: current_input
  type: string
  description: "Answer to getInput. Byte[10]: 01=HDMI, 03=Composite, 04=Component, 05=Screen Mirroring. Last 4 bytes=port."

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Answer to getPictureMute. 0000000000000000=Disabled, 0000000000000001=Enabled."

- id: scene_setting
  type: string
  description: "Answer to getSceneSetting. Scene mode string, right-padded with #."

- id: broadcast_address
  type: string
  description: "Answer to getBroadcastAddress. IPv4 broadcast address, right-padded with #."

- id: mac_address
  type: string
  description: "Answer to getMacAddress. MAC address string, right-padded with #."

- id: command_error
  type: enum
  values: [success, error, not_found, not_available]
  description: "FFFFFFFFFFFFFFFF = Error, NNNNNNNNNNNNNNNN = Not Found / Not Available for all commands."
```

## Variables
```yaml
- id: volume
  type: integer
  min: 0
  # UNRESOLVED: max volume value not stated in source
  description: "Audio volume level. Set via setAudioVolume."
```

## Events
```yaml
- id: fire_power_change
  fourcc: POWR
  msg_type: N
  description: "Notify sent on power state change. 0000000000000000=Powering Off, 0000000000000001=Powering On."

- id: fire_input_change
  fourcc: INPT
  msg_type: N
  description: "Notify sent on input change. Same format as setInput answer - includes input type and port."

- id: fire_volume_change
  fourcc: VOLU
  msg_type: N
  description: "Notify sent on volume change. 16-char decimal left-padded volume value."

- id: fire_mute_change
  fourcc: AMUT
  msg_type: N
  description: "Notify sent on mute change. 0000000000000000=Unmuting, 0000000000000001=Muting."

- id: fire_picture_mute_change
  fourcc: PMUT
  msg_type: N
  description: "Notify sent on picture mute change. 0000000000000000=Picture mute enabled, 0000000000000001=Picture mute disabled."
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Protocol uses fixed 24-byte messages: header `*S` (0x2A 0x53), message type byte (C/E/A/N), 4-char FourCC command, 16-char parameter, footer LF (0x0A). EU RED-DA models have restricted command sets — source references external documentation at pro-bravia.sony.net/setup/device-settings/red-da/. Monitor must have Simple IP Control enabled via Settings > Network & Internet > Home network > IP control > Simple IP control. Remote device control must also be enabled. IR command codes are 16-character parameter values sent via setIrccCode; 44 IR codes documented (Display, Home, Options, Return, navigation arrows, Confirm, color keys Red/Green/Yellow/Blue, digits 0-9, Volume Up/Down, Mute, Channel Up/Down, Subtitle, DOT, Picture Off, Wide, Jump, Sync Menu, transport controls Forward/Play/Rewind/Prev/Stop/Next/Pause, Flash Plus/Minus, TV Power, Audio, Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround, HDMI 1-4, Action Menu, Help).

<!-- UNRESOLVED: volume range (min/max) not stated in source -->
<!-- UNRESOLVED: EU RED-DA variant command availability not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: connection timeout / keepalive behavior not documented -->
<!-- UNRESOLVED: maximum concurrent connections not stated -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
source_urls:
  - https://www.sony.com/electronics/support/res/manuals/9932/56e8960c34dfa2b9a3c29caae4b87340/99327515M.pdf
  - https://pro.sony/s3/2022/09/14131603/VISCA-Command-List-Version-2.00.pdf
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-05-31T22:41:21.640Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T22:41:21.640Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched literally in source with correct FourCC codes and message types; transport verified; source commands fully represented."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
