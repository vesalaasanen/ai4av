---
spec_id: admin/sony-kdx8301-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8301 Series Control Spec"
manufacturer: Sony
model_family: "KDX8301 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8301 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/samples-and-documentation/
retrieved_at: 2026-06-08T16:10:44.260Z
last_checked_at: 2026-06-09T07:19:25.119Z
generated_at: 2026-06-09T07:19:25.119Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source mentions EU RED-DA model variants may have reduced command sets; specific model-to-spec mapping not stated in source"
  - "scene setting enum value set is partially known (auto, auto24pSync, general); full list not stated in source"
  - "no multi-step sequences documented in source"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source"
  - "no auth/login procedure described in source; marked as none by inference"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:19:25.119Z
  matched_actions: 23
  action_count: 23
  confidence: medium
  summary: "All 23 spec actions matched verbatim against FourCC codes and parameter shapes in source. Transport (TCP 20060, no auth) verified. Source command inventory (10 distinct FourCC families) fully represented by spec variants. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX8301 Series Control Spec

## Summary
The Sony KDX8301 Series is a BRAVIA Professional Display monitor that exposes Sony's "Simple IP Control" (SSIP) protocol over a local network. The control interface is a fixed 24-byte framed TCP message format (header `*S`, footer `\n`) sent to TCP port 20060, with command sets for power, input, volume, mute, picture mute, scene setting, IR pass-through, and broadcast/MAC address queries.

<!-- UNRESOLVED: source mentions EU RED-DA model variants may have reduced command sets; specific model-to-spec mapping not stated in source -->

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
- powerable       # inferred from setPowerStatus / togglePowerStatus / getPowerStatus command examples
- routable        # inferred from setInput / getInput command examples
- queryable       # inferred from getPowerStatus / getAudioVolume / getAudioMute / getInput / getPictureMute / getSceneSetting / getBroadcastAddress / getMacAddress command examples
- levelable       # inferred from setAudioVolume / getAudioVolume command examples
```

## Actions
```yaml
- id: set_ircc_code
  label: setIrccCode
  kind: action
  command: "*SCIRCC{ircc_code}00000000000000\n"  # 24-byte fixed frame; params 16 bytes, IR code in last 2 bytes
  params:
    - name: ircc_code
      type: string
      description: Two-digit ASCII IR code (e.g. "05" Display, "09" Up, "30" Volume Up). See IR Commands table.

- id: set_power_status_off
  label: setPowerStatus (Standby)
  kind: action
  command: "*SCPOWR0000000000000000\n"
  params: []

- id: set_power_status_on
  label: setPowerStatus (Active)
  kind: action
  command: "*SCPOWR0000000000000001\n"
  params: []

- id: get_power_status
  label: getPowerStatus
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: toggle_power_status
  label: togglePowerStatus
  kind: action
  command: "*SCTPOW################\n"
  params: []

- id: set_audio_volume
  label: setAudioVolume
  kind: action
  command: "*SCVOLU{volume_padded}0\n"  # volume value as 16-digit left-padded decimal in params field
  params:
    - name: volume
      type: integer
      description: Volume value (right-aligned decimal, 0-padded on the left within the 16-byte param field, e.g. 41 → "0000000000000029")

- id: get_audio_volume
  label: getAudioVolume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute_off
  label: setAudioMute (Unmute)
  kind: action
  command: "*SCAMUT0000000000000000\n"
  params: []

- id: set_audio_mute_on
  label: setAudioMute (Mute)
  kind: action
  command: "*SCAMUT0000000000000001\n"
  params: []

- id: get_audio_mute
  label: getAudioMute
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_input_hdmi
  label: setInput (HDMI)
  kind: action
  command: "*SCINPT0000000001{input_digits}\n"  # input number 1-9999, 4 digits
  params:
    - name: input
      type: integer
      description: HDMI input number (1-9999)

- id: set_input_composite
  label: setInput (Composite)
  kind: action
  command: "*SCINPT0000000003{input_digits}\n"
  params:
    - name: input
      type: integer
      description: Composite input number (1-9999)

- id: set_input_component
  label: setInput (Component)
  kind: action
  command: "*SCINPT0000000004{input_digits}\n"
  params:
    - name: input
      type: integer
      description: Component input number (1-9999)

- id: set_input_screen_mirroring
  label: setInput (Screen Mirroring)
  kind: action
  command: "*SCINPT0000000005{input_digits}\n"
  params:
    - name: input
      type: integer
      description: Screen Mirroring input number (1-9999)

- id: get_input
  label: getInput
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute_off
  label: setPictureMute (Disable)
  kind: action
  command: "*SCPMUT0000000000000000\n"
  params: []

- id: set_picture_mute_on
  label: setPictureMute (Enable)
  kind: action
  command: "*SCPMUT0000000000000001\n"
  params: []

- id: get_picture_mute
  label: getPictureMute
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: togglePictureMute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_scene_setting
  label: setSceneSetting
  kind: action
  command: "*SCSCEN{scene_padded}\n"  # 16-byte param field, case-sensitive string right-padded with '#'
  params:
    - name: scene
      type: string
      description: Scene name, case-sensitive, right-padded with '#' to 16 bytes (e.g. "auto24pSync#####")

- id: get_scene_setting
  label: getSceneSetting
  kind: query
  command: "*SESCEN################\n"
  params: []

- id: get_broadcast_address
  label: getBroadcastAddress
  kind: query
  command: "*SEBADReth0##########\n"  # EU models only
  params: []

- id: get_mac_address
  label: getMacAddress
  kind: query
  command: "*SEMADReth0##########\n"  # EU models only
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  # Source: getPowerStatus A response param byte 22: '0' = Standby (Off), '1' = Active (On)

- id: audio_volume
  type: integer
  # Source: getAudioVolume A response - 16-byte param field holds volume value

- id: audio_mute
  type: enum
  values: [not_muted, muted]
  # Source: getAudioMute A response param byte 22: '0' = Not Muted, '1' = Muted

- id: input_state
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  # Source: getInput A response - byte 14 '1' HDMI, '3' Composite, '4' Component, '5' Screen Mirroring

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  # Source: getPictureMute A response param byte 22: '0' = Disabled, '1' = Enabled

- id: scene_setting
  type: string
  # Source: getSceneSetting A response - 16-byte param field holds scene name

- id: broadcast_address
  type: string
  # Source: getBroadcastAddress A response - IPv4 dotted-quad right-padded with '#' in 16-byte field

- id: mac_address
  type: string
  # Source: getMacAddress A response - MAC address right-padded with '#' in 16-byte field

- id: answer_success
  type: enum
  values: [ok]
  # Source: any A response with all '0' in 16-byte param field

- id: answer_error
  type: enum
  values: [error]
  # Source: any A response with all 'F' in 16-byte param field

- id: answer_not_found
  type: enum
  values: [not_found]
  # Source: setInput / getInput A response with all 'N' in 16-byte param field

- id: answer_not_available
  type: enum
  values: [not_available]
  # Source: setSceneSetting / getSceneSetting A response with all 'N' in 16-byte param field
```

## Variables
```yaml
# No variable parameters beyond those covered by parameterized actions above.
# UNRESOLVED: scene setting enum value set is partially known (auto, auto24pSync, general); full list not stated in source
```

## Events
```yaml
- id: fire_power_change
  type: enum
  values: [powering_off, powering_on]
  # Source: N message, FourCC POWR, param byte 22: '0' = powering off, '1' = powering on

- id: fire_input_change
  type: enum
  values: [hdmi, composite, component, screen_mirroring]
  # Source: N message, FourCC INPT, byte 14: '1' HDMI, '3' Composite, '4' Component, '5' Screen Mirroring

- id: fire_volume_change
  type: string
  # Source: N message, FourCC VOLU, 16-byte param field holds new volume value

- id: fire_mute_change
  type: enum
  values: [unmuting, muting]
  # Source: N message, FourCC AMUT, param byte 22: '0' = unmuting, '1' = muting

- id: fire_picture_mute_change
  type: enum
  values: [enabled, disabled]
  # Source: N message, FourCC PMUT, param byte 22: '0' = enabled, '1' = disabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Frame format: 24 bytes fixed — `*S` (2-byte header) + MessageType (1 byte: C/E/A/N) + FourCC Command (4 bytes) + Parameters (16 bytes) + `\n` (1-byte footer).
- Param field padding: for C/E messages with no params, fill with `#`. For numeric values, left-pad with `0`. For strings, right-pad with `#`. Padding characters are part of the protocol, not optional.
- C (Control) commands expect an A (Answer) reply: `0…0` = success, `F…F` = error, plus command-specific codes (e.g. `N…N` = not found / not available).
- IR pass-through (setIrccCode) maps to the IR Commands table; the listed codes are an enumerated vocabulary, not a continuous range.
- EU-area models have 3 RED-DA spec variants with different settings and available commands; the getBroadcastAddress and getMacAddress commands are marked EU-only in the source.
- Connection example from source: `netcat <IP address> 20060` — example power off: send `*SCPOWR0000000000000000\n`, receive `*SAPOWR0000000000000000 *SNPOWR0000000000000000` (accept + current state notify).
- Source URL referenced for RED-DA details: https://pro-bravia.sony.net/setup/device-settings/red-da/

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no auth/login procedure described in source; marked as none by inference -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/samples-and-documentation/
retrieved_at: 2026-06-08T16:10:44.260Z
last_checked_at: 2026-06-09T07:19:25.119Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:19:25.119Z
matched_actions: 23
action_count: 23
confidence: medium
summary: "All 23 spec actions matched verbatim against FourCC codes and parameter shapes in source. Transport (TCP 20060, no auth) verified. Source command inventory (10 distinct FourCC families) fully represented by spec variants. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source mentions EU RED-DA model variants may have reduced command sets; specific model-to-spec mapping not stated in source"
- "scene setting enum value set is partially known (auto, auto24pSync, general); full list not stated in source"
- "no multi-step sequences documented in source"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated in source"
- "no auth/login procedure described in source; marked as none by inference"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
