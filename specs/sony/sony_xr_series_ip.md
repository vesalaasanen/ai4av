---
spec_id: admin/sony-xr-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XR Series Control Spec"
manufacturer: Sony
model_family: "Sony XR Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony XR Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:09.601Z
generated_at: 2026-04-27T10:13:09.601Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:09.601Z
  matched_actions: 17
  action_count: 17
  confidence: high
  summary: "All 17 spec actions matched literal FourCC codes in source command table with correct parameter shapes and encoding; transport port verified; no undocumented commands in source."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Sony XR Series Control Spec

## Summary

Sony XR Series displays support "Simple IP Control," a binary TCP protocol on port 20060 using fixed-length 24-byte messages. The protocol provides power control, input routing, audio volume/mute, picture mute, scene setting selection, and IR remote code emulation. The device also sends unsolicited notify messages for power, input, volume, mute, and picture mute state changes.

<!-- UNRESOLVED: EU area models have 3 RED-DA compliance variants with differing available commands; specific variant differences not documented -->
<!-- UNRESOLVED: maximum concurrent connections not stated -->
<!-- UNRESOLVED: command timing/throttling limits not stated -->

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
  - powerable     # inferred from setPowerStatus / togglePowerStatus commands
  - routable      # inferred from setInput / getInput commands
  - queryable     # inferred from getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting enquiry commands
  - levelable     # inferred from setAudioVolume / getAudioVolume commands
```

## Actions
```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    description: "Set power to standby (off) or active (on). FourCC: POWR. Message type: C."
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"  # Standby (Off)
          - "0000000000000001"  # Active (On)
        description: "Power state - 0 for standby, 1 for active"

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    description: "Toggles the current power status. FourCC: TPOW. Message type: C."
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    description: "Set the volume value, left-padded with zeros in a 16-char field. FourCC: VOLU. Message type: C."
    params:
      - name: volume
        type: integer
        description: "Volume level (decimal, zero-padded to 16 digits, e.g. 0000000000000029)"

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    description: "Enable or disable audio mute. FourCC: AMUT. Message type: C."
    params:
      - name: mute
        type: enum
        values:
          - "0000000000000000"  # Unmute
          - "0000000000000001"  # Mute
        description: "0 = unmute, 1 = mute"

  - id: set_input
    label: Set Input
    kind: action
    description: "Change the active input source. FourCC: INPT. Message type: C. Byte[7]-[13] encode input type and port."
    params:
      - name: input_type
        type: enum
        values:
          - "0000001"  # HDMI
          - "0000003"  # Composite
          - "0000004"  # Component
          - "0000005"  # Screen Mirroring
        description: "Input connector type code"
      - name: port
        type: integer
        description: "Port number (1-9999), zero-padded to 4 digits in bytes [18]-[21]"

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    description: "Enable or disable picture mute (black screen). FourCC: PMUT. Message type: C."
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"  # Picture mute off
          - "0000000000000001"  # Picture mute on
        description: "0 = disable picture mute, 1 = enable picture mute"

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    description: "Toggles the picture mute state. FourCC: TPMU. Message type: C."
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    description: "Change the scene setting. FourCC: SCEN. Message type: C. Parameter is a case-sensitive string right-padded with '#'."
    params:
      - name: scene
        type: enum
        values:
          - "auto"
          - "auto24pSync"
          - "general"
        description: "Scene setting name (case-sensitive, right-padded with # to 16 chars)"

  - id: set_ircc_code
    label: Send IR Command
    kind: action
    description: "Sends an IR remote control code. FourCC: IRCC. Message type: C. Parameter encodes the IR code."
    params:
      - name: code
        type: string
        description: "IR command code as a 16-char zero-padded decimal string (see IR Commands table)"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_status
    label: Power Status
    type: enum
    description: "Current power state. Enquiry FourCC: POWR, message type E."
    values:
      - "0000000000000000"  # Standby (Off)
      - "0000000000000001"  # Active (On)
    query_action: get_power_status

  - id: audio_volume
    label: Audio Volume
    type: integer
    description: "Current volume level. Enquiry FourCC: VOLU, message type E."
    query_action: get_audio_volume

  - id: audio_mute
    label: Audio Mute Status
    type: enum
    description: "Current mute state. Enquiry FourCC: AMUT, message type E."
    values:
      - "0000000000000000"  # Not Muted
      - "0000000000000001"  # Muted
    query_action: get_audio_mute

  - id: input_source
    label: Input Source
    type: enum
    description: "Current input source and port. Enquiry FourCC: INPT, message type E."
    values:
      - "00000010000XXXX"  # HDMI (port 1-9999)
      - "00000030000XXXX"  # Composite (port 1-9999)
      - "00000040000XXXX"  # Component (port 1-9999)
      - "00000050000XXXX"  # Screen Mirroring (port 1-9999)
    query_action: get_input

  - id: picture_mute
    label: Picture Mute Status
    type: enum
    description: "Current picture mute state. Enquiry FourCC: PMUT, message type E."
    values:
      - "0000000000000000"  # Disabled (picture mute off)
      - "0000000000000001"  # Enabled (picture mute on)
    query_action: get_picture_mute

  - id: scene_setting
    label: Scene Setting
    type: string
    description: "Current scene setting value. Enquiry FourCC: SCEN, message type E."
    query_action: get_scene_setting

  - id: broadcast_address
    label: Broadcast Address
    type: string
    description: "Broadcast IPv4 address of the specified interface. Enquiry FourCC: BADR, message type E."

  - id: mac_address
    label: MAC Address
    type: string
    description: "MAC address of the specified interface. Enquiry FourCC: MADR, message type E."
```

## Variables
```yaml
# UNRESOLVED: no continuously variable parameters beyond those covered in Actions/Feedbacks
```

## Events
```yaml
events:
  - id: fire_power_change
    label: Power State Change
    description: "Unsolicited notify when power state changes. FourCC: POWR, message type N."
    values:
      - "0000000000000000"  # Powered off
      - "0000000000000001"  # Powered on

  - id: fire_input_change
    label: Input Change
    description: "Unsolicited notify when input source changes. FourCC: INPT, message type N."
    values:
      - "0000000000000000"  # Input change to monitor
      - "00000010000XXXX"   # HDMI (port 1-9999)
      - "00000030000XXXX"   # Composite (port 1-9999)
      - "00000040000XXXX"   # Component (port 1-9999)
      - "00000050000XXXX"   # Screen Mirroring (port 1-9999)

  - id: fire_volume_change
    label: Volume Change
    description: "Unsolicited notify when volume level changes. FourCC: VOLU, message type N."

  - id: fire_mute_change
    label: Mute State Change
    description: "Unsolicited notify when mute state changes. FourCC: AMUT, message type N."
    values:
      - "0000000000000000"  # Unmuted
      - "0000000000000001"  # Muted

  - id: fire_picture_mute_change
    label: Picture Mute Change
    description: "Unsolicited notify when picture mute state changes. FourCC: PMUT, message type N."
    values:
      - "0000000000000000"  # Picture mute enabled
      - "0000000000000001"  # Picture mute disabled
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

- **Message format:** All messages are exactly 24 bytes. Byte[0–1] = header `*S` (0x2A 0x53). Byte[2] = message type (C=Control, E=Enquiry, A=Answer, N=Notify). Byte[3–6] = FourCC command. Byte[7–22] = 16-byte parameter field. Byte[23] = footer 0x0A (LF).
- **Answer success:** All-zeros in the parameter field (`0000000000000000`). Answer error: all-F (`FFFFFFFFFFFFFFFF`). Answer not found: all-N (`NNNNNNNNNNNNNNNN`).
- **String parameters** for `setSceneSetting` are case-sensitive and right-padded with `#` to fill 16 bytes.
- **Volume parameter** is a decimal integer left-padded with `0` to 16 digits (e.g., volume 29 = `0000000000000029`).
- **Input encoding:** Input type occupies bytes [7]–[13] (7-digit zero-padded type code) and port number occupies bytes [18]–[21] (4-digit zero-padded).
- **Monitor setup required:** Both "Control remotely" and "Simple IP control" must be enabled in the monitor's network settings before IP control works.
- **EU models note:** EU area models have 3 specification variants based on RED-DA compliance; available commands may differ.

<!-- UNRESOLVED: volume range (min/max) not stated in source -->
<!-- UNRESOLVED: connection keepalive / idle timeout not stated -->
<!-- UNRESOLVED: maximum number of simultaneous TCP connections not stated -->
<!-- UNRESOLVED: network interface parameter values for getBroadcastAddress and getMacAddress not documented -->
<!-- UNRESOLVED: IR command parameter for setIrccCode — full IR code table is documented but numeric code format is implicit in the parameter field -->

## Provenance

```yaml
source_domains:
  - sony.com
  - pro.sony
  - pro-bravia.sony.net
retrieved_at: 2026-04-30T04:31:02.425Z
last_checked_at: 2026-04-27T10:13:09.601Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:09.601Z
matched_actions: 17
action_count: 17
confidence: high
summary: "All 17 spec actions matched literal FourCC codes in source command table with correct parameter shapes and encoding; transport port verified; no undocumented commands in source."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
