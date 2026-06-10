---
spec_id: admin/sony-kdzd9-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDZD9 Series Control Spec"
manufacturer: Sony
model_family: "KDZD9 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDZD9 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T00:59:53.885Z
last_checked_at: 2026-06-09T07:22:54.273Z
generated_at: 2026-06-09T07:22:54.273Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 RED-DA compliance variants; command availability differs per variant. Source references external page for full details."
  - "no continuous/parameter-only variables beyond the discrete actions above."
  - "no multi-step sequences described in source."
  - "no explicit safety warnings, interlocks, or power-on sequencing in source."
  - "firmware version compatibility, baud rate (N/A — TCP), authentication credentials, error recovery sequences."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:22:54.273Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched literal 4-CC codes in source table; port 20060 verified; full coverage of SSIP command inventory. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony KDZD9 Series Control Spec

## Summary
Spec covers Sony KDZD9 Series professional display monitors using the SSIP Simple IP Control protocol over TCP. Protocol uses fixed 24-byte messages on TCP port 20060. Source is the Sony Simple IP control reference (SSIP, BRAVIA Professional Displays).

<!-- UNRESOLVED: EU models have 3 RED-DA compliance variants; command availability differs per variant. Source references external page for full details. -->

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
- routable        # inferred from setInput (HDMI/Composite/Component/Screen Mirroring)
- queryable       # inferred from getPowerStatus / getAudioVolume / getInput / etc.
- levelable       # inferred from setAudioVolume
```

## Actions
```yaml
# Simple IP Control uses 24-byte fixed messages: header (0x2A 0x53) + type + 4-CC + 16 params + footer (0x0A).
# Literal string forms (as shown in the source's netcat example) preserved for setPowerStatus Off.
# For other commands, the command field shows the 4-CC + parameter template; full wire form = header + type + 4CC + params + LF.

# --- IR Remote Code Forwarding ---
- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{ir_code_padded}"  # 16-byte param; pad right with "0" to 16 chars
  params:
    - name: ir_code
      type: string
      description: IR code as documented (e.g. "0000000000000005" for Display). See IR Commands table.

# --- Power ---
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"  # state=0 standby, 1 active
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=Standby (Off), 1=Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR0000000000000000"
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW0000000000000000"
  params: []

# --- Audio Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded}"  # decimal value, left-pad with "0" to 16 chars (e.g. "0000000000000029" = 29)
  params:
    - name: volume
      type: integer
      description: Volume value (decimal), left-padded with zeros to 16 chars

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU0000000000000000"
  params: []

# --- Audio Mute ---
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}"  # 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=Unmute, 1=Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT0000000000000000"
  params: []

# --- Input ---
- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{src_type}000{port_padded}"  # src_type: 1=HDMI 3=Composite 4=Component 5=Screen Mirroring; port 1-9999 right-padded with X (treat as numeric)
  params:
    - name: source_type
      type: integer
      enum: [1, 3, 4, 5]
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT0000000000000000"
  params: []

# --- Picture Mute ---
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}"  # 0=disable, 1=turn screen black
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: 0=Disabled (picture mute off), 1=Enabled (screen black)

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT0000000000000000"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU0000000000000000"
  params: []

# --- Scene Setting ---
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{value_padded_#}"  # value right-padded with "#" to 16 chars; values: "auto", "auto24pSync", "general"
  params:
    - name: value
      type: string
      enum: [auto, auto24pSync, general]
      description: Scene name, case-sensitive, right-padded with "#" to 16 chars

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN0000000000000000"
  params: []

# --- Network Info (queries) ---
- id: get_broadcast_address
  label: Get Broadcast Address (eth0)
  kind: query
  command: "*SEBADRETH0000000000000"  # param block: "eth0" + 12 "#" padding
  params: []
  notes: Returns broadcast IPv4 of interface (source documents eth0 only)

- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "*SEMADRETH0000000000000"  # param block: "eth0" + 12 "#" padding
  params: []
  notes: Returns MAC address of interface (source documents eth0 only)
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]
  description: "0=Standby (Off), 1=Active (On)"

- id: audio_volume
  type: integer
  description: "Current volume value, returned as 16-byte left-padded decimal"

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  description: "0=Not Muted, 1=Muted"

- id: current_input
  type: object
  description: "Current input: source type (1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring) + port number (1-9999)"

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  description: "0=Disabled (picture mute off), 1=Enabled (screen black)"

- id: scene_setting
  type: string
  description: "Current scene name, right-padded with '#' (auto, auto24pSync, general, or 'N' x16 for N/A)"

- id: broadcast_address
  type: string
  description: "Broadcast IPv4 address, right-padded with '#' to 16 chars"

- id: mac_address
  type: string
  description: "MAC address, right-padded with '#' to 16 chars"
```

## Variables
```yaml
# UNRESOLVED: no continuous/parameter-only variables beyond the discrete actions above.
```

## Events
```yaml
# All Notify (0x4E) messages the monitor sends unsolicited.

- id: power_change
  description: Sent when power state changes. FourCC=POWR, last param byte: 0=powering off, 1=powering on.
- id: input_change
  description: Sent when input changes. FourCC=INPT, follows same encoding as getInput answer.
- id: volume_change
  description: Sent when volume changes. FourCC=VOLU, param block contains new volume value.
- id: mute_change
  description: Sent when mute state changes. FourCC=AMUT, last param byte: 0=unmuting, 1=muting.
- id: picture_mute_change
  description: Sent when picture mute state changes. FourCC=PMUT, last param byte: 0=enabled, 1=disabled.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing in source.
```

## Notes
Wire format: every SSIP message = header `0x2A 0x53` (1 byte `*` + 1 byte `S`) + type byte (`C`=0x43 / `E`=0x45 / `A`=0x41 / `N`=0x4E) + 4-CC command (4 ASCII bytes, byte[3]-byte[6]) + 16-byte parameter block (byte[7]-byte[22]) + footer `0x0A` (LF). Total 24 bytes.

Type bytes: C=Control (client→monitor, expects Answer), E=Enquiry (client→monitor, expects Answer), A=Answer (monitor→client), N=Notify (monitor→client, unsolicited). Answer success = 16 `0` bytes; Answer error = 16 `F` bytes. Some commands return `N*16` for "Not Found" or "Not available for current input".

Netcat example from source: `$ netcat [IP address] 20060` then send `*SCPOWR0000000000000000` for Power Off; response `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (Accept + current state Notify).

EU model caveat: EU variants have 3 RED-DA compliance specifications; available commands and settings differ per variant. See https://pro-bravia.sony.net/setup/device-settings/red-da/ .

Required monitor menu setup: Settings → Network & Internet → Remote device settings → Control remotely (enable); Settings → Network & Internet → Home network → IP control → Simple IP control (enable).

Numeric parameter padding: integer values are left-padded with `0` ASCII to fill 16 bytes; string values are right-padded with `#` ASCII to fill 16 bytes. Parameter bytes labeled `X` in the source represent variable numeric digits.

getBroadcastAddress and getMacAddress source table specifies only `eth0` as the interface name embedded in the param block; other interfaces not documented.

<!-- UNRESOLVED: firmware version compatibility, baud rate (N/A — TCP), authentication credentials, error recovery sequences. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T00:59:53.885Z
last_checked_at: 2026-06-09T07:22:54.273Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:22:54.273Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched literal 4-CC codes in source table; port 20060 verified; full coverage of SSIP command inventory. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 RED-DA compliance variants; command availability differs per variant. Source references external page for full details."
- "no continuous/parameter-only variables beyond the discrete actions above."
- "no multi-step sequences described in source."
- "no explicit safety warnings, interlocks, or power-on sequencing in source."
- "firmware version compatibility, baud rate (N/A — TCP), authentication credentials, error recovery sequences."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
