---
spec_id: admin/binary-moip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Binary MoIP Control Spec"
manufacturer: Binary
model_family: "Binary MoIP Controller (B-900-MOIP-4K-CTRL)"
aliases: []
compatible_with:
  manufacturers:
    - Binary
  models:
    - "Binary MoIP Controller (B-900-MOIP-4K-CTRL)"
  firmware: 3.0.4.8
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
retrieved_at: 2026-04-30T04:24:51.843Z
last_checked_at: 2026-05-14T18:17:14.612Z
generated_at: 2026-05-14T18:17:14.612Z
firmware_coverage: 3.0.4.8
protocol_coverage: []
known_gaps:
  - "exact model variants covered by this protocol not fully enumerated"
  - "firmware version compatibility range not stated — only v3.0.4.8 confirmed"
  - "no multi-step sequences explicitly documented in source"
  - "no power-on sequencing or safety interlock procedures documented in source"
  - "login credential change procedure not documented"
  - "session timeout / keepalive behavior not documented"
  - "maximum message length not stated"
  - "firmware version compatibility range not stated"
  - "exact model variants covered by this protocol not enumerated"
  - "error code enumeration beyond \"#Error\" not documented"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.612Z
  matched_actions: 14
  action_count: 14
  confidence: medium
  summary: "All 21 spec actions matched with literal command syntax in source; transport parameters (port 23, TCP, credential auth, 0x0A framing) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Binary MoIP Control Spec

## Summary

The Binary MoIP Controller is an HDMI-over-IP matrix switcher made by SnapAV Binary. It manages Transmitters (TX) and Receivers (RX) for HDMI routing, with support for OSD overlay, CEC control, IR pass-through, serial pass-through, and audio volume/mute on audio-only receivers. This spec covers the TCP-based ASCII control protocol (Integration Protocol v1.9, firmware 3.0.4.8). Up to 10 simultaneous TCP connections are supported.

<!-- UNRESOLVED: exact model variants covered by this protocol not fully enumerated -->
<!-- UNRESOLVED: firmware version compatibility range not stated — only v3.0.4.8 confirmed -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: credential
  description: >-
    Login required. After connecting on port 23, the controller prompts
    "Please Login to Continue" then requests Username and Password.
    Default credentials shown in source: binary/binary.
framing:
  description: >-
    ASCII text messages terminated by newline (0x0A). Message prefix indicates
    type: ? = request, ! = control, # = error, ~ = unsolicited.
```

## Traits
```yaml
traits:
  - routable      # TX→RX switching via !Switch
  - queryable     # ?Firmware, ?Devices, ?Receivers, ?Name, ?Scenes, ?AudioVolumeLevel, ?HDMIAudioMute
  - levelable     # volume control via !SetAudioVolumelevel (0-100)
  - powerable     # reboot via !Reboot
```

## Actions
```yaml
actions:
  - id: switch
    label: Switch TX to RX
    kind: action
    command: "!Switch={tx},{rx}"
    params:
      - name: tx
        type: integer
        description: Transmitter index (0 to disconnect source)
      - name: rx
        type: integer
        description: Receiver index
    response_ok: "OK"
    response_error: "#Error"

  - id: set_resolution
    label: Set Receiver Resolution
    kind: action
    command: "!Resolution={rx},{mode}"
    params:
      - name: rx
        type: integer
        description: Receiver index
      - name: mode
        type: integer
        description: "0=Pass-through, 1=1080p60, 2=1080p50, 3=2160p30, 4=2160p25"
    response_ok: "OK"
    response_error: "#Error"

  - id: osd_text
    label: Display OSD Text
    kind: action
    command: "!OSD={rx},{msg}"
    params:
      - name: rx
        type: integer
        description: Receiver index
      - name: msg
        type: string
        description: Plain ASCII text to display; send "CLEAR" to remove
    response_ok: "OK"
    response_error: "#Error"

  - id: set_osd_image
    label: Set OSD Image from URL
    kind: action
    command: "!SetOSDImage={url},{refresh_rate},[{rx_list}],{position}"
    params:
      - name: url
        type: string
        description: Image source URL
      - name: refresh_rate
        type: integer
        description: Refresh interval in seconds
      - name: rx_list
        type: string
        description: Comma-delimited receiver indices wrapped in brackets e.g. [1,2,3]
      - name: position
        type: integer
        description: "3=top-right, 7=bottom-left, 9=bottom-right"
    response_ok: "OK"
    response_error: "#Error"

  - id: set_osd_source
    label: Set OSD Source Image
    kind: action
    command: "!SetOSDSource={tx},[{rx_list}],{position}"
    params:
      - name: tx
        type: integer
        description: Transmitter index
      - name: rx_list
        type: string
        description: Comma-delimited receiver indices wrapped in brackets e.g. [1,2,3]
      - name: position
        type: integer
        description: "3=top-right, 7=bottom-left, 9=bottom-right"
    response_ok: "OK"
    response_error: "#Error"

  - id: stop_osd
    label: Stop OSD
    kind: action
    command: "!StopOSD=[{rx_list}]"
    params:
      - name: rx_list
        type: string
        description: Comma-delimited receiver indices wrapped in brackets e.g. [1,2,3]
    response_ok: "OK"
    response_error: "#Error"

  - id: reboot
    label: Reboot Controller
    kind: action
    command: "!Reboot"
    params: []
    response_ok: "OK"
    response_error: "#Error"

  - id: exit
    label: Exit Session
    kind: action
    command: "!Exit"
    params: []
    response_ok: "Bye"
    response_error: "#Error"

  - id: set_cec
    label: Set CEC Mode
    kind: action
    command: "!CEC={rx},{mode}"
    params:
      - name: rx
        type: integer
        description: Receiver index
      - name: mode
        type: integer
        description: "0=CEC off, 1=CEC on"
    response_ok: "OK"
    response_error: "#Error"

  - id: send_serial
    label: Send Serial Data
    kind: action
    command: "!Serial={type},{index},{baud}-{databits}{parity}{stopbits},{data}"
    params:
      - name: type
        type: integer
        description: "0=output (RX), 1=input (TX)"
      - name: index
        type: integer
        description: Device index
      - name: baud
        type: integer
        description: Baud rate
      - name: databits
        type: integer
        description: "5, 6, 7, or 8"
      - name: parity
        type: string
        description: "'n'=none, 'e'=even, 'o'=odd"
      - name: stopbits
        type: integer
        description: "1 or 2"
      - name: data
        type: string
        description: Hex data to send
    response_ok: "OK"
    response_error: "#Error"

  - id: send_ir
    label: Send IR Command
    kind: action
    command: "!IR={type},{index},{prontocode}"
    params:
      - name: type
        type: integer
        description: "0=output (RX), 1=input (TX)"
      - name: index
        type: integer
        description: Device index
      - name: prontocode
        type: string
        description: Pronto Hex format IR code
    response_ok: "OK"
    response_error: "#Error"

  - id: set_audio_volume
    label: Set Audio Volume Level
    kind: action
    command: "!SetAudioVolumelevel={rx},{level}"
    params:
      - name: rx
        type: integer
        description: Audio-only Receiver index
      - name: level
        type: integer
        description: Volume level 0-100
    response_ok: "OK"
    response_error: "#Error"

  - id: set_hdmi_audio_mute
    label: Set HDMI Audio Mute
    kind: action
    command: "!HDMIAudioMute={rx},{mute}"
    params:
      - name: rx
        type: integer
        description: Receiver index
      - name: mute
        type: integer
        description: "0=unmute, 1=mute"
    response_ok: "OK"
    response_error: "#Error"

  - id: activate_scene
    label: Activate Scene
    kind: action
    command: "!ActivateScene={name}"
    params:
      - name: name
        type: string
        description: Scene name as configured in MoIP Controller app
    response_ok: "OK"
```

## Feedbacks
```yaml
feedbacks:
  - id: firmware_version
    label: Firmware Version
    type: string
    query: "?Firmware"
    response_format: "?Firmware={version}"

  - id: receiver_routing
    label: Receiver Routing Map
    type: string
    query: "?Receivers"
    response_format: "?Receivers={tx}:{rx}[,{tx}:{rx}...]"
    description: Returns all receiver-to-transmitter mappings, comma-delimited (TX:RX pairs)

  - id: device_count
    label: TX and RX Count
    type: string
    query: "?Devices"
    response_format: "?Devices={tx_count},{rx_count}"

  - id: device_names
    label: Device Names
    type: string
    query: "?Name={mode}"
    params:
      - name: mode
        type: integer
        description: "1=TX names, 0=RX names"
    response_format: "?Name={mode},{index},{name}"
    description: Newline-delimited for multiple devices

  - id: scene_names
    label: Scene Names
    type: string
    query: "?Scenes"
    response_format: "?Scenes={name1},{name2}..."
    description: Returns scene names wrapped in brackets, comma-delimited. App must be enabled.

  - id: audio_volume_level
    label: Audio Volume Level
    type: integer
    query: "?AudioVolumeLevel={rx}"
    params:
      - name: rx
        type: integer
        description: Audio-only Receiver index
    response_format: "?AudioVolumeLevel={rx},{level}"

  - id: hdmi_audio_mute_state
    label: HDMI Audio Mute State
    type: integer
    query: "?HDMIAudioMute={rx}"
    params:
      - name: rx
        type: integer
        description: Receiver index
    response_format: "?HDMIAudioMute={rx},{mute}"
    description: "mute: 0=unmuted, 1=muted"
```

## Variables
```yaml
# No continuous settable variables beyond discrete actions above.
```

## Events
```yaml
events:
  - id: unsolicited_serial
    label: Unsolicited Serial Data
    pattern: "~Serial={type},{index},{data}"
    description: Serial data received from a TX or RX serial port, sent without request.
    params:
      - name: type
        description: "0=RX (output), 1=TX (input)"
      - name: index
        description: Device index
      - name: data
        description: Hex data received

  - id: receiver_change
    label: Receiver Routing Change
    pattern: "~Receivers={tx}:{rx}[,...]"
    description: Broadcast when receiver routing changes. Comma-delimited TX:RX pairs.

  - id: audio_volume_change
    label: Audio Volume Levels Change
    pattern: "~AudioVolumeLevels={level1},{level2},..."
    description: Broadcast of all audio receiver volume levels in index order.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for:
  - reboot
interlocks: []
# UNRESOLVED: no power-on sequencing or safety interlock procedures documented in source
```

## Notes
- All commands are ASCII text terminated by `\n` (0x0A).
- Message prefixes: `?` = request/query, `!` = control/action, `#` = error, `~` = unsolicited event.
- Up to 10 simultaneous TCP connections supported.
- Default login credentials: `binary`/`binary` (as shown in source example).
- Scenes require the MoIP Controller app to be enabled.
- The `!Switch=0,{rx}` command disconnects a receiver's source.
- OSD position enumerations: 3=top-right, 7=bottom-left, 9=bottom-right.
- Serial pass-through baud format is compact, e.g. `9600-8n1`.
- IR uses Pronto Hex format codes.

<!-- UNRESOLVED: login credential change procedure not documented -->
<!-- UNRESOLVED: session timeout / keepalive behavior not documented -->
<!-- UNRESOLVED: maximum message length not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact model variants covered by this protocol not enumerated -->
<!-- UNRESOLVED: error code enumeration beyond "#Error" not documented -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
retrieved_at: 2026-04-30T04:24:51.843Z
last_checked_at: 2026-05-14T18:17:14.612Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.612Z
matched_actions: 14
action_count: 14
confidence: medium
summary: "All 21 spec actions matched with literal command syntax in source; transport parameters (port 23, TCP, credential auth, 0x0A framing) verified verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model variants covered by this protocol not fully enumerated"
- "firmware version compatibility range not stated — only v3.0.4.8 confirmed"
- "no multi-step sequences explicitly documented in source"
- "no power-on sequencing or safety interlock procedures documented in source"
- "login credential change procedure not documented"
- "session timeout / keepalive behavior not documented"
- "maximum message length not stated"
- "firmware version compatibility range not stated"
- "exact model variants covered by this protocol not enumerated"
- "error code enumeration beyond \"#Error\" not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
