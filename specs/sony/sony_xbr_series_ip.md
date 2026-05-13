---
spec_id: admin/sony-xbr-series-simple-ip-control
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony BRAVIA Professional Displays Simple IP Control Spec"
manufacturer: Sony
model_family: "Sony BRAVIA Professional Displays (XBR Series)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony BRAVIA Professional Displays (XBR Series)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:09.146Z
generated_at: 2026-04-27T10:13:09.146Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:09.146Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched literally in source; transport verified; bidirectional command coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony BRAVIA Professional Displays Simple IP Control Spec

## Summary
Sony BRAVIA Professional Displays support Simple IP Control (SSIP), a proprietary TCP-based protocol for monitor control over a local network. The protocol uses fixed-length 24-byte messages with a binary header/footer and ASCII FourCC command identifiers. It covers power, volume, mute, input selection, picture mute, scene settings, and IR remote command emulation.

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
traits:
  - powerable    # setPowerStatus, togglePowerStatus commands
  - queryable    # getPowerStatus, getAudioVolume, getAudioMute, getInput, etc.
  - routable     # setInput, getInput for input switching
  - levelable    # setAudioVolume for volume control
```

## Actions
```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    command: "*SCPOWR{param}"
    description: "Sets power state. Parameter 0000000000000000 = Standby (Off), 0000000000000001 = Active (On)."
    params:
      - name: state
        type: enum
        values: [off, on]
        description: "Power state to set"
    response:
      success: "*SAPOWR0000000000000000"
      error: "*SAPOWRFFFFFFFFFFFFFFFF"

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    command: "*SCTPOW################"
    description: "Toggles the current power status."
    response:
      success: "*SATPOW0000000000000000"
      error: "*SATPOWFFFFFFFFFFFFFFFF"

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    command: "*SCVOLU{param}"
    description: "Sets the volume. Value is left-padded with zeros in 16-char field, e.g. 0000000000000029."
    params:
      - name: volume
        type: integer
        description: "Volume level (0-based, left-padded to 16 digits)"
    response:
      success: "*SAVOLU0000000000000000"
      error: "*SAVOLUFFFFFFFFFFFFFFFF"

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    command: "*SCAMUT{param}"
    description: "Sets audio mute state. 0000000000000000 = Unmute, 0000000000000001 = Mute."
    params:
      - name: state
        type: enum
        values: [unmute, mute]
        description: "Mute state to set"
    response:
      success: "*SAAMUT0000000000000000"
      error: "*SAAMUTFFFFFFFFFFFFFFFF"

  - id: set_input
    label: Set Input
    kind: action
    command: "*SCINPT{param}"
    description: "Changes the input source. Format: connector type code followed by port index."
    params:
      - name: connector
        type: enum
        values: [hdmi, composite, component, screen_mirroring]
        description: "Input connector type"
      - name: port
        type: integer
        description: "Port number (1-9999)"
    response:
      success: "*SAINPT0000000000000000"
      not_found: "*SAINPTNNNNNNNNNNNNNNNN"
      error: "*SAINPTFFFFFFFFFFFFFFFF"

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    command: "*SCPMUT{param}"
    description: "Controls picture mute. 0000000000000000 = Off (show picture), 0000000000000001 = On (black screen)."
    params:
      - name: state
        type: enum
        values: [off, on]
        description: "Picture mute state"
    response:
      success: "*SAPMUT0000000000000000"
      error: "*SAPMUTFFFFFFFFFFFFFFFF"

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    command: "*SCTPMU################"
    description: "Toggles the picture mute state."
    response:
      success: "*SATPMU0000000000000000"
      error: "*SATPMUFFFFFFFFFFFFFFFF"

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    command: "*SCSCEN{param}"
    description: "Changes scene setting. Parameter is a case-sensitive string right-padded with '#'. Values: auto, auto24pSync, general."
    params:
      - name: scene
        type: enum
        values: [auto, auto24pSync, general]
        description: "Scene setting value (case-sensitive)"
    response:
      success: "*SASCEN0000000000000000"
      not_available: "*SASCENNNNNNNNNNNNNNNNN"
      error: "*SASCENFFFFFFFFFFFFFFFF"

  - id: set_ircc_code
    label: Send IR Command
    kind: action
    command: "*SCIRCC{param}"
    description: "Sends an IR remote control command. Parameter is the 16-digit IR code."
    params:
      - name: code
        type: string
        description: "IR command code, e.g. 0000000000000005 for Display"
    response:
      success: "*SAIRCC0000000000000000"
      error: "*SAIRCCFFFFFFFFFFFFFFFF"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    type: enum
    values: [off, on]
    command: "*SEPOWR################"
    response:
      off: "*SAPOWR0000000000000000"
      on: "*SAPOWR0000000000000001"
      error: "*SAPOWRFFFFFFFFFFFFFFFF"

  - id: audio_volume
    label: Audio Volume
    type: integer
    command: "*SEVOLU################"
    description: "Returns current volume level as a left-zero-padded integer."
    response:
      success: "*SAVOLU{16-digit volume}"
      error: "*SAVOLUFFFFFFFFFFFFFFFF"

  - id: audio_mute
    label: Audio Mute Status
    type: enum
    values: [unmuted, muted]
    command: "*SEAMUT################"
    response:
      unmuted: "*SAAMUT0000000000000000"
      muted: "*SAAMUT0000000000000001"
      error: "*SAAMUTFFFFFFFFFFFFFFFF"

  - id: input
    label: Current Input
    type: string
    command: "*SEINPT################"
    description: "Returns current input. Connector codes: 0001=HDMI, 0003=Composite, 0004=Component, 0005=Screen Mirroring, followed by port index."
    response:
      hdmi: "*SAINPT00000001{port}"
      composite: "*SAINPT00000003{port}"
      component: "*SAINPT00000004{port}"
      screen_mirroring: "*SAINPT00000005{port}"
      error: "*SAINPTFFFFFFFFFFFFFFFF"

  - id: picture_mute
    label: Picture Mute Status
    type: enum
    values: [disabled, enabled]
    command: "*SEPMUT################"
    response:
      disabled: "*SAPMUT0000000000000000"
      enabled: "*SAPMUT0000000000000001"
      error: "*SAPMUTFFFFFFFFFFFFFFFF"

  - id: scene_setting
    label: Scene Setting
    type: string
    command: "*SESCEN################"
    description: "Returns current scene setting string."
    response:
      success: "*SASCEN{16-char scene value}"
      not_available: "*SASCENNNNNNNNNNNNNNNNN"
      error: "*SASCENFFFFFFFFFFFFFFFF"

  - id: broadcast_address
    label: Broadcast Address
    type: string
    command: "*SEBADReth0############"
    description: "Returns broadcast IPv4 address for the specified interface."
    response:
      success: "*SABADR{address padded with #}"
      error: "*SABADRFFFFFFFFFFFFFFFF"

  - id: mac_address
    label: MAC Address
    type: string
    command: "*SEMADReth0############"
    description: "Returns MAC address for the specified interface."
    response:
      success: "*SAMADR{mac padded with #}"
      error: "*SAMADRFFFFFFFFFFFFFFFF"
```

## Variables
```yaml
variables:
  - id: volume
    label: Volume Level
    type: integer
    min: 0
    max: null  # UNRESOLVED: max volume not stated in source
    command_set: setAudioVolume
    command_get: getAudioVolume

  - id: audio_mute
    label: Audio Mute
    type: enum
    values: [unmute, mute]
    command_set: setAudioMute
    command_get: getAudioMute

  - id: picture_mute
    label: Picture Mute
    type: enum
    values: [off, on]
    command_set: setPictureMute
    command_get: getPictureMute
```

## Events
```yaml
events:
  - id: power_change
    label: Power State Change
    notify_command: "*SNPOWR{param}"
    description: "Sent when power state changes."
    values:
      off: "*SNPOWR0000000000000000"
      on: "*SNPOWR0000000000000001"

  - id: input_change
    label: Input Change
    notify_command: "*SNINPT{param}"
    description: "Sent when input changes. Same connector format as setInput responses."
    values:
      change_event: "*SNINPT0000000000000000"
      hdmi: "*SNINPT00000001{port}"
      composite: "*SNINPT00000003{port}"
      component: "*SNINPT00000004{port}"
      screen_mirroring: "*SNINPT00000005{port}"

  - id: volume_change
    label: Volume Change
    notify_command: "*SNVOLU{16-digit volume}"
    description: "Sent when volume changes."

  - id: mute_change
    label: Mute Change
    notify_command: "*SNAMUT{param}"
    description: "Sent when mute state changes."
    values:
      unmuted: "*SNAMUT0000000000000000"
      muted: "*SNAMUT0000000000000001"

  - id: picture_mute_change
    label: Picture Mute Change
    notify_command: "*SNPMUT{param}"
    description: "Sent when picture mute state changes."
    values:
      enabled: "*SNPMUT0000000000000000"
      disabled: "*SNPMUT0000000000000001"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes
- All messages are exactly 24 bytes: 2-byte header (`0x2A 0x53`), 1-byte message type, 4-byte FourCC command, 16-byte parameter, 1-byte footer (`0x0A`).
- Message types: `C` (Control/client-to-monitor), `E` (Enquiry/client-to-monitor), `A` (Answer/monitor-to-client), `N` (Notify/monitor-to-client).
- Answer `0000000000000000` = success, `FFFFFFFFFFFFFFFF` = error.
- String parameters for `setSceneSetting` are case-sensitive and right-padded with `#`.
- Input connector codes: `0001` = HDMI, `0003` = Composite, `0004` = Component, `0005` = Screen Mirroring.
- EU area models have 3 specification types based on RED-DA compliance; settings and available commands may differ.
- IR remote commands are sent via `setIrccCode` with numeric parameters (see IR Commands table in source).
- Both wired and wireless LAN connections are supported. Monitor must have Remote Device Control and Simple IP Control enabled in settings.
<!-- UNRESOLVED: maximum volume level not stated in source -->
<!-- UNRESOLVED: maximum number of concurrent TCP connections not stated -->
<!-- UNRESOLVED: connection timeout / keepalive behavior not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:09.146Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:09.146Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched literally in source; transport verified; bidirectional command coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
