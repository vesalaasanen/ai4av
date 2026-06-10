---
spec_id: admin/sony-kdx8309-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8309 Series Control Spec"
manufacturer: Sony
model_family: "KDX8309 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8309 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T16:20:05.136Z
last_checked_at: 2026-06-09T07:21:00.578Z
generated_at: 2026-06-09T07:21:00.578Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU RED-DA regional command subset differences not fully enumerated; firmware version not stated."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
  - "firmware version compatibility not stated in source; EU RED-DA variant command subsets not enumerated; exact interface naming beyond \"eth0\" not specified; baud rate / serial config N/A (TCP-only)."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:21:00.578Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec action FourCC codes found verbatim in source command table with matching message types and parameter shapes. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX8309 Series Control Spec

## Summary
This spec covers the Sony KDX8309 Series professional displays using Sony's Simple IP Control (SSIP) protocol. Communication occurs over TCP on port 20060 using fixed 24-byte messages (header `0x2A 0x53`, footer `0x0A`), with command opcodes in 4-CC ASCII format. EU area models have 3 RED-DA compliance variants with differing settings and available commands.

<!-- UNRESOLVED: EU RED-DA regional command subset differences not fully enumerated; firmware version not stated. -->

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
- powerable       # setPowerStatus, getPowerStatus, togglePowerStatus, firePowerChange
- queryable       # getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- routable        # setInput, getInput, fireInputChange
- levelable       # setAudioVolume, getAudioVolume
```

## Actions
```yaml
# All message types: 24 bytes total. Header 0x2A 0x53 (bytes 0-1), Message Type byte[2], FourCC bytes[3-6], Parameters bytes[7-22], Footer 0x0A byte[23].
# Each "command:" field below shows the message-type + FourCC + parameters portion. The 24-byte wire form prepends 0x2A 0x53 and appends 0x0A.

- id: set_ircc_code
  label: Set IR CC Code
  kind: action
  command: "C IRCC {ircc_code}000000000000000"  # 16-byte parameter, last byte holds the IR code (e.g. 0x05 Display, 0x30 Volume Up)
  params:
    - name: ircc_code
      type: string
      description: IR code byte, right-aligned in parameter field, e.g. "0x05" Display, "0x30" Volume Up, "0x32" Mute, "0x98" TV Power, "0x124" HDMI 1

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "C POWR 000000000000000{0|1}"  # 0 = Standby (Off), 1 = Active (On)
  params:
    - name: state
      type: integer
      description: 0 = Standby/Off, 1 = Active/On

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "E POWR ################"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "C TPOW ################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "C VOLU {volume:016d}"  # right-aligned decimal, zero-padded, e.g. "0000000000000029"
  params:
    - name: volume
      type: integer
      description: Volume value, right-aligned zero-padded in 16-byte field

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "E VOLU ################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "C AMUT 000000000000000{0|1}"  # 0 = Unmute, 1 = Mute
  params:
    - name: state
      type: integer
      description: 0 = Unmute, 1 = Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "E AMUT ################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "C INPT 000000000{type}00XXXX"  # type byte encodes input class; XXXX = port number 1-9999
  params:
    - name: input_type
      type: integer
      description: Input class - 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number 1-9999 (right-aligned in last 4 bytes)

- id: get_input
  label: Get Current Input
  kind: query
  command: "E INPT ################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "C PMUT 000000000000000{0|1}"  # 0 = Disabled, 1 = Enabled (screen black)
  params:
    - name: state
      type: integer
      description: 0 = Picture mute disabled, 1 = Picture mute enabled

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "E PMUT ################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "C TPMU ################"
  params: []

- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "C SCEN {name_padded_#}"  # case-sensitive, pad right with '#', e.g. "auto24pSync#####"
  params:
    - name: scene
      type: string
      description: Scene name - "auto", "auto24pSync", "general"; right-padded with '#'

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "E SCEN ################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "E BADR eth0###########"  # interface name left-aligned, padded with '#'
  params:
    - name: interface
      type: string
      description: Network interface, left-aligned, padded with '#' (e.g. "eth0")

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "E MADR eth0###########"
  params:
    - name: interface
      type: string
      description: Network interface, left-aligned, padded with '#' (e.g. "eth0")
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  # A response to E POWR: 0000000000000000 = Standby, 0000000000000001 = Active

- id: audio_volume
  type: integer
  # A response to E VOLU: 16 ASCII decimal digits, right-aligned, zero-padded

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  # A response to E AMUT: 0 = Not Muted, 1 = Muted

- id: current_input
  type: object
  # A response to E INPT: bytes[7-13] = input type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring), bytes[18-21] = port 1-9999

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  # A response to E PMUT: 0 = Disabled, 1 = Enabled

- id: scene_setting
  type: string
  # A response to E SCEN: 16-byte ASCII string, right-padded with '#'

- id: broadcast_address
  type: string
  # A response to E BADR: 16-byte ASCII IPv4 string, right-padded with '#' (e.g. "192.168.0.14####")

- id: mac_address
  type: string
  # A response to E MADR: 12-byte ASCII MAC, right-padded with '#' (last 4 bytes = '#')

- id: answer_success
  type: enum
  values: [ok]
  # Generic A-message success: 16 bytes of '0' (0x30)

- id: answer_error
  type: enum
  values: [error]
  # Generic A-message error: 16 bytes of 'F' (0x46)
```

## Events
```yaml
# Notify messages (message type 0x4E 'N') are unsolicited, sent from monitor to client.
- id: fire_power_change
  command: "N POWR 000000000000000{0|1}"  # 0 = power off, 1 = power on
  description: Sent when power status changes

- id: fire_input_change
  command: "N INPT 000000000{type}00XXXX"  # type+port as in setInput
  description: Sent when active input changes

- id: fire_volume_change
  command: "N VOLU {volume:016d}"
  description: Sent when volume changes

- id: fire_mute_change
  command: "N AMUT 000000000000000{0|1}"  # 0 = unmuting, 1 = muting
  description: Sent when mute state changes

- id: fire_picture_mute_change
  command: "N PMUT 000000000000000{0|1}"  # 0 = enabled, 1 = disabled (note: source inverts conventional polarity in description; bytes 0/1 stated in table)
  description: Sent when picture mute state changes
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements stated in source.
```

## Notes
Wire format reminder: every Simple IP Control message is exactly 24 bytes — `0x2A 0x53` (header) + 1 byte message type + 4 ASCII bytes (FourCC) + 16 ASCII parameter bytes + `0x0A` (LF footer). The Command fields above show the message-type byte + FourCC + parameters; the full wire frame prepends `0x2A 0x53` and appends `0x0A`. Example: Power Off request `*SCPOWR0000000000000000` decodes to header `*S`, message type `C` (Control), FourCC `POWR`, parameters `0000000000000000`, footer `<LF>`. The Answer `*SAPOWR...` and Notify `*SNPOWR...` use the same envelope with type `A` / `N`.

IR codes are passed as the final byte of the 16-byte parameter field (right-aligned). Notable mappings from the IR Commands table: Display `0x05`, Home `0x06`, Options `0x07`, Return `0x08`, Up `0x09`, Down `0x0A`, Right `0x0B`, Left `0x0C`, Confirm `0x0D`, Num0-9 `0x18-0x27`, Volume Up `0x30`, Volume Down `0x31`, Mute `0x32`, Channel Up/Down `0x33/0x34`, Subtitle `0x35`, Picture Off `0x50`, Wide `0x61`, TV Power `0x98`, Audio `0x99`, Input `0x101`, Sleep `0x104`, Sleep Timer `0x105`, Video 2 `0x108`, Picture Mode `0x110`, Demo Surround `0x121`, HDMI 1-4 `0x124-0x127`, Action Menu `0x129`, Help `0x130`.

EU-area models have 3 RED-DA compliance variants; command availability differs per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for variant-specific settings. The `getBroadcastAddress` and `getMacAddress` commands are flagged with an asterisk in the source — applicability to non-EU models not explicitly confirmed.

<!-- UNRESOLVED: firmware version compatibility not stated in source; EU RED-DA variant command subsets not enumerated; exact interface naming beyond "eth0" not specified; baud rate / serial config N/A (TCP-only). -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/
retrieved_at: 2026-06-08T16:20:05.136Z
last_checked_at: 2026-06-09T07:21:00.578Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:21:00.578Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec action FourCC codes found verbatim in source command table with matching message types and parameter shapes. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU RED-DA regional command subset differences not fully enumerated; firmware version not stated."
- "no safety warnings, interlock procedures, or power-on sequencing requirements stated in source."
- "firmware version compatibility not stated in source; EU RED-DA variant command subsets not enumerated; exact interface naming beyond \"eth0\" not specified; baud rate / serial config N/A (TCP-only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
