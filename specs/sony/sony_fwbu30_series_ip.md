---
spec_id: admin/sony-fwbu30-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWBU30 Series Control Spec"
manufacturer: Sony
model_family: "FWBU30 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "FWBU30 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-05-26T02:05:25.419Z
last_checked_at: 2026-06-12T19:44:58.664Z
generated_at: 2026-06-12T19:44:58.664Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU models have 3 RED-DA compliance variants with different commands — variant not identified"
  - "no continuous variables beyond those covered by actions/feedbacks"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "firmware version compatibility not stated in source"
  - "maximum concurrent connection limit not stated"
  - "command rate limits or timing constraints not stated"
  - "EU RED-DA variant command differences not documented"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:44:58.664Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match source command catalogue one-to-one; transport verified on TCP 20060. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-26
---

# Sony FWBU30 Series Control Spec

## Summary
Sony FWBU30 Series professional display controlled via Simple IP Control over TCP. Fixed-length 24-byte binary message protocol on port 20060. Supports power, volume, mute, input selection, picture mute, scene settings, and IR remote code emulation.

<!-- UNRESOLVED: EU models have 3 RED-DA compliance variants with different commands — variant not identified -->

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
  - powerable     # inferred: setPowerStatus / togglePowerStatus commands
  - queryable     # inferred: getPowerStatus, getAudioVolume, getAudioMute, etc.
  - levelable     # inferred: setAudioVolume command
  - routable      # inferred: setInput command with multiple input types
```

## Actions
```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    description: "Power the display on or off. FourCC: POWR. Control message type C."
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"  # Standby (Off)
          - "0000000000000001"  # Active (On)
        description: "Power state - 0000 for standby, 0001 for active"

  - id: toggle_power_status
    label: Toggle Power Status
    kind: action
    description: "Toggles the current power status. FourCC: TPOW. Control message type C."
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    description: "Set volume level. FourCC: VOLU. Control message type C. Value left-padded with zeros to 16 digits."
    params:
      - name: volume
        type: string
        description: "16-digit zero-padded decimal string e.g. 0000000000000029"

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    description: "Mute or unmute audio. FourCC: AMUT. Control message type C."
    params:
      - name: mute
        type: enum
        values:
          - "0000000000000000"  # Unmute
          - "0000000000000001"  # Mute
        description: "0000 to unmute, 0001 to mute"

  - id: set_input
    label: Set Input
    kind: action
    description: "Change the active input. FourCC: INPT. Control message type C."
    params:
      - name: input_type
        type: enum
        values:
          - "000000010000XXXX"  # HDMI
          - "000000030000XXXX"  # Composite
          - "000000040000XXXX"  # Component
          - "000000050000XXXX"  # Screen Mirroring
        description: "Byte 7-14 encodes input type, byte 15-22 encodes port number (1-9999) as XXXX"
      - name: port
        type: integer
        description: "Port number 1-9999"

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    description: "Enable or disable picture mute (black screen). FourCC: PMUT. Control message type C."
    params:
      - name: state
        type: enum
        values:
          - "0000000000000000"  # Disable picture mute
          - "0000000000000001"  # Enable picture mute
        description: "0000 to disable, 0001 to enable"

  - id: toggle_picture_mute
    label: Toggle Picture Mute
    kind: action
    description: "Toggles picture mute state. FourCC: TPMU. Control message type C."
    params: []

  - id: set_scene_setting
    label: Set Scene Setting
    kind: action
    description: "Change the scene setting. FourCC: SCEN. Control message type C. Case-sensitive, right-padded with #."
    params:
      - name: scene
        type: enum
        values:
          - "auto"
          - "auto24pSync"
          - "general"
        description: "Scene name, case-sensitive, right-padded with # to 16 characters"

  - id: set_ircc_code
    label: Send IR Remote Code
    kind: action
    description: "Send an IR remote control command. FourCC: IRCC. Control message type C."
    params:
      - name: code
        type: string
        description: "16-digit parameter from IR command table e.g. 0000000000000005 for Display"

  - id: get_power_status
    label: Get Power Status
    kind: query
    description: "Query current power status. FourCC: POWR. Enquiry message type E."
    params: []

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    description: "Retrieve current audio volume. FourCC: VOLU. Enquiry message type E."
    params: []

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    description: "Retrieve audio mute status. FourCC: AMUT. Enquiry message type E."
    params: []

  - id: get_input
    label: Get Current Input
    kind: query
    description: "Query current input source. FourCC: INPT. Enquiry message type E."
    params: []

  - id: get_picture_mute
    label: Get Picture Mute
    kind: query
    description: "Check if picture mute is enabled. FourCC: PMUT. Enquiry message type E."
    params: []

  - id: get_scene_setting
    label: Get Scene Setting
    kind: query
    description: "Retrieve current scene setting. FourCC: SCEN. Enquiry message type E."
    params: []

  - id: get_broadcast_address
    label: Get Broadcast Address
    kind: query
    description: "Retrieve broadcast IPv4 address of a network interface. FourCC: BADR. Enquiry message type E."
    params:
      - name: interface
        type: string
        description: "Interface identifier e.g. eth0, right-padded with #"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    description: "Retrieve MAC address of a network interface. FourCC: MADR. Enquiry message type E."
    params:
      - name: interface
        type: string
        description: "Interface identifier e.g. eth0, right-padded with #"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values: [off, on]
    description: "Answer to getPowerStatus. 0000000000000000 = standby/off, 0000000000000001 = active/on"

  - id: audio_volume
    type: string
    description: "Answer to getAudioVolume. 16-digit zero-padded decimal volume value."

  - id: audio_mute_state
    type: enum
    values: [unmuted, muted]
    description: "Answer to getAudioMute. 0000000000000000 = not muted, 0000000000000001 = muted"

  - id: input_source
    type: string
    description: "Answer to getInput. Encodes input type and port number."

  - id: picture_mute_state
    type: enum
    values: [disabled, enabled]
    description: "Answer to getPictureMute. 0000000000000000 = disabled, 0000000000000001 = enabled"

  - id: scene_setting
    type: string
    description: "Answer to getSceneSetting. Case-sensitive string value."

  - id: broadcast_address
    type: string
    description: "Answer to getBroadcastAddress. IPv4 broadcast address right-padded with #."

  - id: mac_address
    type: string
    description: "Answer to getMacAddress. MAC address right-padded with #."
```

## Variables
```yaml
# UNRESOLVED: no continuous variables beyond those covered by actions/feedbacks
```

## Events
```yaml
events:
  - id: fire_power_change
    description: "Notify message (N/POWR). Sent when display powers on (0001) or off (0000)."
    type: enum
    values: [off, on]

  - id: fire_input_change
    description: "Notify message (N/INPT). Sent when input changes. Includes input type and port."
    type: string

  - id: fire_volume_change
    description: "Notify message (N/VOLU). Sent when volume changes."
    type: string

  - id: fire_mute_change
    description: "Notify message (N/AMUT). Sent on mute (0001) or unmute (0000)."
    type: enum
    values: [unmuted, muted]

  - id: fire_picture_mute_change
    description: "Notify message (N/PMUT). Sent when picture mute enabled (0000) or disabled (0001)."
    type: enum
    values: [enabled, disabled]
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
Binary protocol: every message exactly 24 bytes. Structure: `*S` (header 2B) + message type (1B: C=control, E=enquiry, A=answer, N=notify) + FourCC command (4B) + parameters (16B) + `LF` footer (1B). Success answer = 16×`0`, error = 16×`F`, not found = 16×`N`. Parameters right-padded with `#` for unused bytes. All parameter strings are ASCII within the fixed-length fields.

IR command parameters for setIrccCode: Display=`0000000000000005`, Home=`0000000000000006`, Options=`0000000000000007`, Return=`0000000000000008`, Up=`0000000000000009`, Down=`0000000000000010`, Right=`0000000000000011`, Left=`0000000000000012`, Confirm=`0000000000000013`, Num1=`0000000000000018` through Num0=`0000000000000027`, Volume Up=`0000000000000030`, Volume Down=`0000000000000031`, Mute=`0000000000000032`, Play=`0000000000000078`, Pause=`0000000000000084`, HDMI 1=`0000000000000124`, HDMI 2=`0000000000000125`, HDMI 3=`0000000000000126`, HDMI 4=`0000000000000127`, plus additional codes listed in source.

EU area models: 3 specification types based on RED-DA compliance. Settings and available commands differ per variant.

Monitor must have Remote Device Control and Simple IP Control enabled in network settings before commands are accepted.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum concurrent connection limit not stated -->
<!-- UNRESOLVED: command rate limits or timing constraints not stated -->
<!-- UNRESOLVED: EU RED-DA variant command differences not documented -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-05-26T02:05:25.419Z
last_checked_at: 2026-06-12T19:44:58.664Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:44:58.664Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match source command catalogue one-to-one; transport verified on TCP 20060. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU models have 3 RED-DA compliance variants with different commands — variant not identified"
- "no continuous variables beyond those covered by actions/feedbacks"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "firmware version compatibility not stated in source"
- "maximum concurrent connection limit not stated"
- "command rate limits or timing constraints not stated"
- "EU RED-DA variant command differences not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
