---
spec_id: admin/binary-binary-moip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Binary MoIP Controller Control Spec"
manufacturer: Binary
model_family: "Binary MoIP Controller"
aliases: []
compatible_with:
  manufacturers:
    - Binary
  models:
    - "Binary MoIP Controller"
  firmware: 3.0.4.8
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-660-MTRX-8x8-API-Command-Set_V1.0.1.pdf
retrieved_at: 2026-05-01T01:55:36.443Z
last_checked_at: 2026-05-14T18:17:14.597Z
generated_at: 2026-05-14T18:17:14.597Z
firmware_coverage: 3.0.4.8
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.597Z
  matched_actions: 14
  action_count: 14
  confidence: high
  summary: "All 21 spec actions match source wire tokens literally."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Binary MoIP Controller Control Spec

## Summary

The Binary MoIP Controller is an HDMI-over-IP matrix switcher that routes Transmitter (TX) sources to Receiver (RX) displays. TCP control on port 23 using ASCII-text command protocol with up to 10 simultaneous connections. Supports switching, resolution control, OSD overlay, CEC, IR blast, serial passthrough, audio volume/mute, and scene recall.

<!-- UNRESOLVED: firmware compatibility range not stated — only v3.0.4.8 referenced in doc header -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
  max_connections: 10
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # reboot command
  - routable     # TX→RX switching
  - queryable    # firmware, devices, receivers, scenes, audio, mute queries
  - levelable    # audio volume 0-100
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
        description: "Transmitter index (1-based). 0 = disconnect source from receiver."
      - name: rx
        type: integer
        description: "Receiver index (1-based)."
    response:
      success: OK
      error: "#Error"

  - id: set_resolution
    label: Set Receiver Resolution
    kind: action
    command: "!Resolution={rx},{mode}"
    params:
      - name: rx
        type: integer
        description: "Receiver index."
      - name: mode
        type: integer
        description: "0=Pass-through, 1=1080p60, 2=1080p50, 3=2160p30, 4=2160p25"
        values: [0, 1, 2, 3, 4]
    response:
      success: OK
      error: "#Error"

  - id: osd_text
    label: Display OSD Text
    kind: action
    command: "!OSD={rx},{msg}"
    params:
      - name: rx
        type: integer
        description: "Receiver index."
      - name: msg
        type: string
        description: "Plain ASCII text. Send 'CLEAR' to remove."
    response:
      success: OK
      error: "#Error"

  - id: set_osd_image
    label: Set OSD Image from URL
    kind: action
    command: "!SetOSDImage={url},{refresh_rate},[{rx_list}],{position}"
    params:
      - name: url
        type: string
        description: "Image source URL."
      - name: refresh_rate
        type: integer
        description: "Refresh interval in seconds."
      - name: rx_list
        type: string
        description: "Comma-delimited receiver indexes wrapped in brackets, e.g. [1,2,3]."
      - name: position
        type: integer
        description: "3=TOP RIGHT, 7=BOTTOM LEFT, 9=BOTTOM RIGHT"
        values: [3, 7, 9]
    response:
      success: OK
      error: "#Error"

  - id: set_osd_source
    label: Set OSD Source Image
    kind: action
    command: "!SetOSDSource={tx},[{rx_list}],{position}"
    params:
      - name: tx
        type: integer
        description: "Transmitter ID."
      - name: rx_list
        type: string
        description: "Comma-delimited receiver indexes wrapped in brackets, e.g. [1,2,3]."
      - name: position
        type: integer
        description: "3=TOP RIGHT, 7=BOTTOM LEFT, 9=BOTTOM RIGHT"
        values: [3, 7, 9]
    response:
      success: OK
      error: "#Error"

  - id: stop_osd
    label: Stop OSD
    kind: action
    command: "!StopOSD=[{rx_list}]"
    params:
      - name: rx_list
        type: string
        description: "Comma-delimited receiver indexes wrapped in brackets, e.g. [1,2,3]."
    response:
      success: OK
      error: "#Error"

  - id: reboot
    label: Reboot Controller
    kind: action
    command: "!Reboot"
    params: []
    response:
      success: OK
      error: "#Error"

  - id: exit
    label: Exit Session
    kind: action
    command: "!Exit"
    params: []
    response:
      success: Bye
      error: "#Error"

  - id: set_cec
    label: Set CEC Mode
    kind: action
    command: "!CEC={rx},{mode}"
    params:
      - name: rx
        type: integer
        description: "Receiver index."
      - name: mode
        type: integer
        description: "0=CEC OFF, 1=CEC ON"
        values: [0, 1]
    response:
      success: OK
      error: "#Error"

  - id: send_serial
    label: Send Serial Data
    kind: action
    command: "!Serial={type},{index},{baudrate}-{databits}{parity}{stopbits},{hex_data}"
    params:
      - name: type
        type: integer
        description: "0=RX (output), 1=TX (input)"
        values: [0, 1]
      - name: index
        type: integer
        description: "Device index to send to."
      - name: baudrate
        type: integer
        description: "Baud rate, e.g. 9600."
      - name: databits
        type: integer
        description: "5, 6, 7, or 8"
        values: [5, 6, 7, 8]
      - name: parity
        type: string
        description: "n=none, e=even, o=odd"
        values: ["n", "e", "o"]
      - name: stopbits
        type: integer
        description: "1 or 2"
        values: [1, 2]
      - name: hex_data
        type: string
        description: "Hex-encoded data to send, space-delimited, e.g. '61 62 63'."
    response:
      success: OK
      error: "#Error"

  - id: send_ir
    label: Send IR Command
    kind: action
    command: "!IR={type},{index},{prontocode}"
    params:
      - name: type
        type: integer
        description: "0=RX (output), 1=TX (input)"
        values: [0, 1]
      - name: index
        type: integer
        description: "Device index to send to."
      - name: prontocode
        type: string
        description: "Pronto Hex format IR code string, space-delimited."
    response:
      success: OK
      error: "#Error"

  - id: set_audio_volume
    label: Set Audio Volume Level
    kind: action
    command: "!SetAudioVolumelevel={rx},{level}"
    params:
      - name: rx
        type: integer
        description: "Audio-only receiver index."
      - name: level
        type: integer
        description: "Volume level 0-100."
        min: 0
        max: 100
    response:
      success: OK
      error: "#Error"

  - id: set_hdmi_audio_mute
    label: Set HDMI Audio Mute
    kind: action
    command: "!HDMIAudioMute={rx},{mute}"
    params:
      - name: rx
        type: integer
        description: "Receiver index."
      - name: mute
        type: integer
        description: "0=unmute, 1=mute"
        values: [0, 1]
    response:
      success: OK
      error: "#Error"

  - id: activate_scene
    label: Activate Scene
    kind: action
    command: "!ActivateScene={name}"
    params:
      - name: name
        type: string
        description: "Scene name as configured in MoIP Controller app."
    response:
      success: OK
```

## Feedbacks
```yaml
feedbacks:
  - id: firmware_version
    type: string
    command: "?Firmware"
    response: "?Firmware={version}"
    description: "Controller firmware version."

  - id: receivers_routing
    type: string
    command: "?Receivers"
    response: "?Receivers={tx}:{rx},{tx}:{rx}..."
    description: "Current TX→RX routing. Comma-delimited pairs."

  - id: device_count
    type: string
    command: "?Devices"
    response: "?Devices={tx_count},{rx_count}"
    description: "Number of connected transmitters and receivers."

  - id: device_names
    type: string
    command: "?Name={type}"
    response: "?Name={mode},{index},{name}"
    description: "Names for TX (type=1) or RX (type=0). New-line delimited for multiple devices."

  - id: scene_names
    type: string
    command: "?Scenes"
    response: "?Scenes={scene1},{scene2}..."
    description: "Scene names from MoIP Controller app, wrapped in brackets, comma-delimited."

  - id: audio_volume_level
    type: integer
    command: "?AudioVolumeLevel={rx}"
    response: "?AudioVolumeLevel={rx},{level}"
    description: "Current audio volume level for an audio-only receiver."

  - id: hdmi_audio_mute_status
    type: integer
    command: "?HDMIAudioMute={rx}"
    response: "?HDMIAudioMute={rx},{mute}"
    description: "Current HDMI audio mute status for a receiver. 0=unmuted, 1=muted."
```

## Variables
```yaml
# UNRESOLVED: no continuous settable parameters beyond discrete actions
```

## Events
```yaml
events:
  - id: unsolicited_serial
    pattern: "~Serial={type},{index},{hex_data}"
    description: "Unsolicited serial data received from TX/RX serial port. TYPE: 0=RX, 1=TX."

  - id: unsolicited_receivers
    pattern: "~Receivers={tx}:{rx},..."
    description: "Broadcasts all receivers' current TX inputs. Comma-delimited tx:rx pairs."

  - id: unsolicited_audio_levels
    pattern: "~AudioVolumeLevels={level1},{level2},..."
    description: "Broadcasts current audio volume levels for all audio-only receivers, comma-delimited."

  - id: error
    pattern: "#Error"
    description: "Sent on invalid command or internal device error."
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

- All commands are ASCII text terminated with `\n` (0x0A).
- Message prefixes: `?` = request/query, `!` = control/action, `#` = error, `~` = unsolicited.
- Up to 10 simultaneous TCP connections allowed.
- `!Switch=0,{rx}` disconnects source from the receiver (TX index 0 = disconnect).
- `!OSD={rx},CLEAR` removes OSD text overlay.
- Scenes must be created in the MoIP Controller app before `!ActivateScene` or `?Scenes` will work.
- Protocol document version: v1.9 rev20210603, firmware reference 3.0.4.8.

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: no mention of connection keepalive or timeout behavior -->
<!-- UNRESOLVED: no mention of connection encryption or TLS support -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/B100-B300_RS232_Protocol.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/ProtocolsAndDrivers/SnapAV_Binary_MoIP_API_V1.9.pdf
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/MediaDistribution/SupportDocuments/B-660-MTRX-8x8-API-Command-Set_V1.0.1.pdf
retrieved_at: 2026-05-01T01:55:36.443Z
last_checked_at: 2026-05-14T18:17:14.597Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.597Z
matched_actions: 14
action_count: 14
confidence: high
summary: "All 21 spec actions match source wire tokens literally."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
