---
spec_id: admin/sony-kdx8577-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8577 Series Control Spec"
manufacturer: Sony
model_family: KD-55X8577F
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55X8577F
    - KD-55X8577G
    - KD-65X8577F
    - KD-65X8577G
    - KD-75X8577F
    - KD-75X8577G
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro-bravia.sony.net
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-07-24T19:02:03.519Z
last_checked_at: 2026-08-05T08:46:17.518Z
generated_at: 2026-08-05T08:46:17.518Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "X8577-series SKU-specific confirmation of Simple IP Control support not stated in source."
  - "firmware version range not stated in source."
  - "serial control (RS-232C) applicability to consumer X8577 models not confirmed in source."
  - "source documents no settable parameters that are not discrete actions."
  - "source documents no multi-step sequences."
  - "source contains no safety warnings or interlock procedures."
  - "Wording above on consumer KDX8577 menu path is from source; consumer SKU may not have Hotel/Pro Mode menu."
  - "high-level JSON-RPC WebAPI surface not documented in this source."
  - "serial / RS-232C control applicability to consumer X8577 models not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:46:17.518Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions map one-to-one to FourCC commands in source Table 4; transport port 20060 confirmed. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Sony KDX8577 Series Control Spec

## Summary
Sony BRAVIA 2014-series LCD televisions (KDX8577 family) implementing the Sony Simple IP Control v0.6 low-level protocol over TCP. Control via 24-byte fixed frames on TCP port 20060 using Four-CC function codes. No authentication required. Source covers the generic BRAVIA 2014 IP protocol; X8577 SKU conformance to Simple IP Control is not explicitly confirmed in the source.

<!-- UNRESOLVED: X8577-series SKU-specific confirmation of Simple IP Control support not stated in source. -->
<!-- UNRESOLVED: firmware version range not stated in source. -->
<!-- UNRESOLVED: serial control (RS-232C) applicability to consumer X8577 models not confirmed in source. -->

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
powerable: true   # inferred from setPowerStatus command examples
queryable: true   # inferred from getPowerStatus, getAudioVolume, getInput, etc.
routable: true    # inferred from setInputSource / setInput command examples
levelable: true   # inferred from setAudioVolume command examples
```

## Actions
```yaml
# Sony Simple IP Control low-level protocol.
# 24-byte frame: [0x2A 0x53] [Type 1B] [Function 4B ASCII] [Parameter 16B] [0x0A]
# Type bytes: 0x43 [C] Control, 0x45 [E] Enquiry, 0x41 [A] Answer, 0x4E [N] Notify
# `command:` below shows the 24-byte frame template with the variable parameter bytes
# replaced by {param} placeholders. Header 0x2A 0x53 + Type byte + FourCC + parameters + footer 0x0A.

- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 49 52 43 43 {ircc_param_bytes} 0A"
  params:
    - name: ircc_param_bytes
      type: bytes
      description: 16-byte parameter block; IR code is encoded in the last 2 bytes per Table 5 (e.g. Power Off = 0x0000, Volume Up = 0x0030).
  notes: "See IR Commands table in source for the 87 IR function codes and their parameter values."

- id: set_power_status
  label: Set Power
  kind: action
  command: "2A 53 43 50 4F 57 52 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state} 0A"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: 0x00 = Standby (Off), 0x01 = Active (On).
  notes: "Encoded as decimal digits in parameter block: 0000000000000000 = standby, 0000000000000001 = active."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume_padded} 0A"
  params:
    - name: volume
      type: integer
      description: Volume value, decimal, left-padded with "0" to 16-byte field (e.g. 41 = "0000000000000029").
  notes: "Parameter is 16 ASCII decimal digits representing the volume value."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 41 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state} 0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: 0x00 = Unmute, 0x01 = Mute.

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {channel_padded} 0A"
  params:
    - name: channel
      type: string
      description: Preset channel in format MAJOR.MINOR, decimal digits padded to 16 bytes (e.g. channel 50.1 = "00000050.1000000", channel 6 = "00000006.0000000").
  notes: "Answer with all N (0x4E) bytes means no such channel."

- id: get_channel
  label: Get Current Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_padded} 0A"
  params:
    - name: triplet
      type: string
      description: 12 hex digits + 4 trailing placeholder bytes (e.g. "7FE07FE00400" = triplet 32736.32736.1024).

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input_source
  label: Set TV Input Source (tuner)
  kind: action
  command: "2A 53 43 49 53 52 43 {source_padded} 0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: Tuner source name, right-padded with "#" to fill 16-byte parameter field (e.g. "dvbt############").

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 {kind} 00 00 00 00 {port_padded} 0A"
  params:
    - name: kind
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
      description: 0x00=TV, 0x01=HDMI, 0x02=SCART, 0x03=Composite, 0x04=Component, 0x05=Screen Mirroring, 0x06=PC RGB.
    - name: port
      type: integer
      description: Port number 1-9999, right-padded as ASCII decimal digits within the 4-byte sub-field.

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state} 0A"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]
      description: 0x00 = Disable picture mute, 0x01 = Make screen black.

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_pip
  label: Set PIP (Picture in Picture)
  kind: action
  command: "2A 53 43 50 49 50 49 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state} 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: 0x00 = Disable PIP, 0x01 = Enable PIP.

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"
  params:
    - name: interface
      type: string
      description: Interface name, "eth0" for wired Ethernet (other interfaces not specified in source).
  notes: "Answer contains the IPv4 broadcast address as ASCII, right-padded with '#'."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"
  params:
    - name: interface
      type: string
      description: Interface name, "eth0" for wired Ethernet.
  notes: "Answer contains MAC address as ASCII, right-padded with '#'."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: Response to getPowerStatus. 0x00 = Standby, 0x01 = Active.

- id: audio_volume
  type: integer
  description: Response to getAudioVolume. Volume value as decimal digits in 16-byte field.

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
  description: Response to getAudioMute. 0x00 = Not Muted, 0x01 = Muted.

- id: channel_preset
  type: string
  description: Response to getChannel. Preset channel number in MAJOR.MINOR decimal format.

- id: channel_triplet
  type: string
  description: Response to getTripletChannel. Triplet channel in hexadecimal format.

- id: input_source_tuner
  type: string
  description: Response to getInputSource. Tuner source name (e.g. dvbt, dvbc).

- id: current_input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: Response to getInput. 0x00=TV, 0x01=HDMI, 0x02=SCART, 0x03=Composite, 0x04=Component, 0x05=Screen Mirroring, 0x06=PC RGB. Includes port number sub-field.

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Response to getPictureMute. 0x00 = Disabled, 0x01 = Enabled.

- id: pip_state
  type: enum
  values: [disabled, enabled]
  description: Response to getPip. 0x00 = Disabled, 0x01 = Enabled.

- id: broadcast_address
  type: string
  description: Response to getBroadcastAddress. IPv4 broadcast address as ASCII.

- id: mac_address
  type: string
  description: Response to getMacAddress. MAC address as ASCII.
```

## Variables
```yaml
# UNRESOLVED: source documents no settable parameters that are not discrete actions.
```

## Events
```yaml
- id: fire_power_change
  type: notification
  fourcc: "POWR"
  description: Sent when power state changes. 0x00 = powering off, 0x01 = powering on.

- id: fire_channel_change
  type: notification
  fourcc: "CHNN"
  description: Sent when channel changes. Parameter contains the new preset channel number.

- id: fire_input_change
  type: notification
  fourcc: "INPT"
  description: Sent when input changes. Parameter encodes the new input kind and port (same encoding as setInput).

- id: fire_volume_change
  type: notification
  fourcc: "VOLU"
  description: Sent when volume changes. Parameter contains the new volume value.

- id: fire_mute_change
  type: notification
  fourcc: "AMUT"
  description: Sent when mute state changes. 0x00 = unmuting, 0x01 = muting.

- id: fire_pip_change
  type: notification
  fourcc: "PIPI"
  description: Sent when PIP state changes. 0x00 = PIP disabled, 0x01 = PIP enabled.

- id: fire_picture_mute_change
  type: notification
  fourcc: "PMUT"
  description: Sent when picture mute state changes. 0x00 = disabled, 0x01 = enabled.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
- Source is the Sony Simple IP Control v0.6 generic BRAVIA 2014 protocol document. KDX8577-series SKU-specific confirmation of Simple IP Control support is not present in the source.
- TCP connections are kept alive between requests but the server drops the connection if no command is sent within 30 seconds. Clients must reconnect after idle periods.
- All commands are 24-byte fixed-size frames: header `0x2A 0x53`, 1-byte type, 4-byte ASCII FourCC function, 16-byte parameter, footer `0x0A`.
- The "Low Level Protocol" described here is a bridge to Sony's high-level WebAPI (JSON-RPC over HTTP); the WebAPI surface is not documented in this source.
- setIrccCode supports 87 IR-equivalent remote control functions (Power Off, Input, Volume Up/Down, Channel Up/Down, 0-9 numeric, colored buttons, transport controls, etc.) — see Table 5 in source for the full list and parameter bytes.
- Discovery flow: send getBroadcastAddress or getMacAddress to confirm the TV is reachable on port 20060 after enabling Simple IP Control in the TV menu (Network > Home Network Setup > IP Control > Simple IP Control, or Hotel/Pro Mode > IP Control > Simple IP Control).

<!-- UNRESOLVED: Wording above on consumer KDX8577 menu path is from source; consumer SKU may not have Hotel/Pro Mode menu. -->
<!-- UNRESOLVED: high-level JSON-RPC WebAPI surface not documented in this source. -->
<!-- UNRESOLVED: serial / RS-232C control applicability to consumer X8577 models not stated in source. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro-bravia.sony.net
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/serial-control/command/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/reference/
retrieved_at: 2026-07-24T19:02:03.519Z
last_checked_at: 2026-08-05T08:46:17.518Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:46:17.518Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions map one-to-one to FourCC commands in source Table 4; transport port 20060 confirmed. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "X8577-series SKU-specific confirmation of Simple IP Control support not stated in source."
- "firmware version range not stated in source."
- "serial control (RS-232C) applicability to consumer X8577 models not confirmed in source."
- "source documents no settable parameters that are not discrete actions."
- "source documents no multi-step sequences."
- "source contains no safety warnings or interlock procedures."
- "Wording above on consumer KDX8577 menu path is from source; consumer SKU may not have Hotel/Pro Mode menu."
- "high-level JSON-RPC WebAPI surface not documented in this source."
- "serial / RS-232C control applicability to consumer X8577 models not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
