---
spec_id: admin/sony-xbrx957-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XBR-X957 Series Control Spec"
manufacturer: Sony
model_family: "XBR-X957 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XBR-X957 Series"
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
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T03:13:42.349Z
last_checked_at: 2026-06-09T07:24:25.799Z
generated_at: 2026-06-09T07:24:25.799Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 RED-DA compliance variants; per-variant command availability not stated in source."
  - "parameter is the IR code value padded per IR table"
  - "no settable variables documented in source beyond the action parameters above"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version compatibility not stated in source."
  - "per-RED-DA-variant command availability not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:24:25.799Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions matched exactly to source Four-CC codes; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony XBR-X957 Series Control Spec

## Summary
The Sony XBR-X957 Series is a professional BRAVIA display. This spec covers the Simple IP control interface — Sony's SSIP proprietary TCP-based protocol on port 20060 using fixed 24-byte framed messages with Four-CC commands for power, input, volume, mute, picture mute, scene setting, and network info.

<!-- UNRESOLVED: EU models have 3 RED-DA compliance variants; per-variant command availability not stated in source. -->

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
- powerable    # inferred from setPowerStatus, getPowerStatus, togglePowerStatus
- routable     # inferred from setInput, getInput
- queryable    # inferred from getPowerStatus, getInput, getAudioVolume, getAudioMute, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
- levelable    # inferred from setAudioVolume, getAudioVolume
```

## Actions
```yaml
# Simple IP control uses 24-byte fixed frames: header 0x2A 0x53, type byte (C/E/A/N),
# Four-CC command (bytes 3-6), 16-byte parameters (bytes 7-22), footer 0x0A.
# All commands below use type 'C' (Control) unless noted. Enquiry commands use 'E'.

- id: set_ircc_code
  label: Send IR Remote Code
  kind: action
  command: "*SCIRCC{code:016d}#"  # UNRESOLVED: parameter is the IR code value padded per IR table
  params:
    - name: code
      type: string
      description: IR code value (hex digit pair from IR Commands table, left-padded with 0s, right-padded with # to 16 chars)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{state}"  # state: 0=Standby, 1=Active
  params:
    - name: state
      type: integer
      description: 0 for Standby (Off), 1 for Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################"  # 24 bytes, Four-CC POWR, type E
  params: []

- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level:016d}"  # volume value left-padded with 0s, e.g. 0000000000000029
  params:
    - name: level
      type: integer
      description: Volume value (left-padded with 0s to 16 chars, e.g. 41 = 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{state}"  # state: 0=Unmute, 1=Mute
  params:
    - name: state
      type: integer
      description: 0 for Unmute, 1 for Mute

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{source_type:01d}000{port:04d}"
  params:
    - name: source_type
      type: integer
      description: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring
    - name: port
      type: integer
      description: Port number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{state}"  # state: 0=Disabled, 1=Enabled (screen black)
  params:
    - name: state
      type: integer
      description: 0 for Disabled (picture mute off), 1 for Enabled (screen black)

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
  command: "*SCSCEN{value:16s}"  # value right-padded with '#', case-sensitive; values: auto, auto24pSync, general
  params:
    - name: value
      type: string
      description: Scene name (auto, auto24pSync, general); case-sensitive, right-padded with '#' to 16 chars

- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADR{interface:4s}############"  # interface (e.g. 'eth0') padded to 4 chars then #s
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. eth0)

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADR{interface:4s}############"
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. eth0)
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: get_power_status answer (POWR ... 0 = standby, 1 = active)

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: get_audio_mute answer (AMUT ... 0 = unmuted, 1 = muted)

- id: audio_volume
  type: integer
  source: get_audio_volume answer (VOLU ... 16-digit zero-padded volume value)

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: get_picture_mute answer (PMUT ... 0 = disabled, 1 = enabled)

- id: current_input
  type: object
  source: get_input answer (INPT ... source_type byte: 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring; port 1-9999)

- id: scene_setting
  type: string
  source: get_scene_setting answer (SCEN ... 16-char value, right-padded with '#')
```

## Variables
```yaml
# UNRESOLVED: no settable variables documented in source beyond the action parameters above
```

## Events
```yaml
- id: power_change
  source: firePowerChange (N POWR ... 0=powering off, 1=powering on)

- id: input_change
  source: fireInputChange (N INPT ... source_type + port)

- id: volume_change
  source: fireVolumeChange (N VOLU ... 16-digit zero-padded new volume)

- id: mute_change
  source: fireMuteChange (N AMUT ... 0=unmuting, 1=muting)

- id: picture_mute_change
  source: firePictureMuteChange (N PMUT ... 0=enabled, 1=disabled)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in source.
```

## Notes
- All Simple IP control messages are 24 bytes: header `0x2A 0x53` ("*S"), message type byte (`C`/`E`/`A`/`N`), Four-CC command (bytes 3-6), 16-byte parameters, footer `0x0A` (LF).
- Sample power-off request frame from source: `*SCPOWR0000000000000000` (24 bytes, includes trailing LF).
- Sample power-off response from source: `*SAPOWR0000000000000000 *SNPOWR0000000000000000` — SAPOWR accepts the command, SNPOWR reports current power status.
- For setInput/setAudioVolume, parameters are zero-padded ASCII decimal digits; for setSceneSetting, parameters are right-padded with `#`; for getBroadcastAddress/getMacAddress, the interface name is padded to 4 chars then `#`s.
- EU area models have 3 RED-DA compliance variants — settings and available commands differ per specification. See https://pro-bravia.sony.net/setup/device-settings/red-da/ for details.
- IR codes via setIrccCode mirror the remote controller; see IR Commands table for the 50+ supported codes (Display, Home, Options, navigation, color keys, numeric, volume, channel, transport, etc.).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: per-RED-DA-variant command availability not stated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - aca.im
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/structure/
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
retrieved_at: 2026-06-09T03:13:42.349Z
last_checked_at: 2026-06-09T07:24:25.799Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:24:25.799Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions matched exactly to source Four-CC codes; transport parameters verified; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 RED-DA compliance variants; per-variant command availability not stated in source."
- "parameter is the IR code value padded per IR table"
- "no settable variables documented in source beyond the action parameters above"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version compatibility not stated in source."
- "per-RED-DA-variant command availability not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
