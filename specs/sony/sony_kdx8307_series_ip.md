---
spec_id: admin/sony-kdx8307-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8307 Series BRAVIA Simple IP Control"
manufacturer: Sony
model_family: "KDX8307 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8307 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:48:36.106Z
last_checked_at: 2026-06-09T07:19:25.860Z
generated_at: 2026-06-09T07:19:25.860Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers \"BRAVIA 2014 models\" generically; KDX8307 Series is the operator-supplied target. The exact model-to-protocol mapping is not stated in the refined excerpt."
  - "source defines no multi-step sequences. The WebAPI high-level protocol"
  - "source contains no safety warnings, interlocks, or power-on sequencing"
  - "HTTP/JSON-RPC WebAPI endpoint, path, and method-to-FourCC mapping not in the refined excerpt."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:19:25.860Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literally to source Table 4; transport fully supported; no unrepresented source commands. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX8307 Series BRAVIA Simple IP Control

## Summary
BRAVIA 2014-era Sony displays expose a binary "Simple IP Control" protocol over TCP port 20060 using fixed 24-byte frames (header `0x2A 0x53`, footer `0x0A`, FourCC function, 16-byte parameter). The same command set is also reachable through a JSON-RPC WebAPI. This spec covers the low-level TCP transport and the command catalogue from the Sony Simple IP Control Protocol document (v0.6).

<!-- UNRESOLVED: source covers "BRAVIA 2014 models" generically; KDX8307 Series is the operator-supplied target. The exact model-to-protocol mapping is not stated in the refined excerpt. -->

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
- powerable       # inferred: setPowerStatus present
- routable        # inferred: setInputSource / setInput present
- queryable       # inferred: get* enquiry commands present
- levelable       # inferred: setAudioVolume present
```

## Actions
```yaml
# Low-level TCP frame: 0x2A 0x53 | type(1) | function(4 ASCII) | param(16) | 0x0A
# type bytes: 0x43 Control, 0x45 Enquiry, 0x41 Answer, 0x4E Notify
# All FourCC function codes and parameter encodings are verbatim from the source.

- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 49 52 43 43 {ircc_param_16_bytes} 0A"  # FourCC "IRCC"
  params:
    - name: ircc_code
      type: integer
      description: IRCC code from Table 5 (e.g. 0x00=Power Off, 0x01=Input ... 0x97=Social)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 50 4F 57 52 {param_16} 0A"  # FourCC "POWR"
  params:
    - name: state
      type: enum
      values: [standby, active]

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 {param_16_dont_care} 0A"  # FourCC "POWR" Enquiry
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume_padded_left_16} 0A"  # FourCC "VOLU", e.g. 0000000000000029 = 41
  params:
    - name: volume
      type: integer
      description: Volume value left-padded with "0" to 16 ASCII chars (e.g. 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 {param_16_dont_care} 0A"  # FourCC "VOLU"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 41 4D 55 54 {param_16} 0A"  # FourCC "AMUT"
  params:
    - name: state
      type: enum
      values: [unmute, mute]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 41 4D 55 54 {param_16_dont_care} 0A"  # FourCC "AMUT"
  params: []

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {major_padded}.{minor_padded} 0A"  # FourCC "CHNN"; e.g. 00000050.1000000 = 50.1
  params:
    - name: major
      type: integer
      description: Major preset number (padded left to 8 ASCII digits)
    - name: minor
      type: integer
      description: Minor sub-channel (padded left to 7 ASCII digits)

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E {param_16_dont_care} 0A"  # FourCC "CHNN"
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_hex_16} 0A"  # FourCC "TCHN"; e.g. 7FE07FE00400
  params:
    - name: triplet_hex
      type: string
      description: 16 hex chars representing triplet channel (e.g. 7FE07FE00400 = 32736.32736.1024)

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E {param_16_dont_care} 0A"  # FourCC "TCHN"
  params: []

- id: set_input_source
  label: Set Input Source (tuner)
  kind: action
  command: "2A 53 43 49 53 52 43 {source_padded_right_16} 0A"  # FourCC "ISRC"; e.g. dvbt############
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: Right-padded with "#" to fill 16 chars

- id: get_input_source
  label: Get Current Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 {param_16_dont_care} 0A"  # FourCC "ISRC"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 49 4E 50 54 {param_16} 0A"  # FourCC "INPT"
  params:
    - name: kind
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
    - name: number
      type: integer
      description: Input number 1-9999 for non-TV kinds; 0 for TV

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 {param_16_dont_care} 0A"  # FourCC "INPT"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 {param_16} 0A"  # FourCC "PMUT"
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "2A 53 45 50 4D 55 54 {param_16_dont_care} 0A"  # FourCC "PMUT"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 {param_16_dont_care} 0A"  # FourCC "TPMU"
  params: []

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "2A 53 43 50 49 50 49 {param_16} 0A"  # FourCC "PIPI"
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 {param_16_dont_care} 0A"  # FourCC "PIPI"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 {param_16_dont_care} 0A"  # FourCC "TPIP"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 {param_16_dont_care} 0A"  # FourCC "TPPP"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 {param_16_dont_care} 0A"  # FourCC "BADR", interface "eth0"
  params:
    - name: interface
      type: string
      description: Interface name, left-justified in param (e.g. "eth0")

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 {param_16_dont_care} 0A"  # FourCC "MADR", interface "eth0"
  params:
    - name: interface
      type: string
      description: Interface name, left-justified in param (e.g. "eth0")
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
- id: audio_volume
  type: integer
  description: Current volume, 16 ASCII digits left-padded with "0"
- id: audio_mute
  type: enum
  values: [unmuted, muted]
- id: channel_preset
  type: string
  description: Preset channel number, format MAJOR.MINOR with left-padded halves
- id: channel_triplet
  type: string
  description: 16 hex chars representing current triplet
- id: input_source
  type: string
  description: Source string right-padded with "#"
- id: input
  type: object
  description: Kind (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB) + number
- id: picture_mute
  type: enum
  values: [disabled, enabled]
- id: pip_status
  type: enum
  values: [disabled, enabled]
- id: broadcast_address
  type: string
  description: IPv4 broadcast address, right-padded with "#"
- id: mac_address
  type: string
  description: MAC address, right-padded with "#"
- id: command_result
  type: enum
  values: [success, error]
  description: "Answer parameter: 0x00* = success, 0xFF* = error (per Table 3)"
```

## Variables
```yaml
# Discrete commands exist for every settable value; no continuous settable parameters
# beyond the ones surfaced as actions. Section retained per template.
```

## Events
```yaml
# All notify messages use type 0x4E ("N") and the same FourCC functions as the
# corresponding control commands. Frame format identical to actions.

- id: power_change
  type: enum
  values: [standby, active]
  command: "2A 53 4E 50 4F 57 52 {param_16} 0A"  # FourCC "POWR" Notify
- id: channel_change
  type: string
  description: New preset channel MAJOR.MINOR
  command: "2A 53 4E 43 48 4E 4E {param_16} 0A"  # FourCC "CHNN" Notify
- id: input_change
  type: object
  description: New input kind+number (same encoding as set_input)
  command: "2A 53 4E 49 4E 50 54 {param_16} 0A"  # FourCC "INPT" Notify
- id: volume_change
  type: integer
  description: New volume (16 ASCII digits left-padded)
  command: "2A 53 4E 56 4F 4C 55 {param_16} 0A"  # FourCC "VOLU" Notify
- id: mute_change
  type: enum
  values: [unmuted, muted]
  command: "2A 53 4E 41 4D 55 54 {param_16} 0A"  # FourCC "AMUT" Notify
- id: pip_change
  type: enum
  values: [disabled, enabled]
  command: "2A 53 4E 50 49 50 49 {param_16} 0A"  # FourCC "PIPI" Notify
- id: picture_mute_change
  type: enum
  values: [disabled, enabled]
  command: "2A 53 4E 50 4D 55 54 {param_16} 0A"  # FourCC "PMUT" Notify
```

## Macros
```yaml
# UNRESOLVED: source defines no multi-step sequences. The WebAPI high-level protocol
# is mentioned but not detailed in the refined excerpt.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing
# requirements.
```

## Notes
- TCP idle timeout: server disconnects after 30 s of client silence; clients must reconnect.
- Frame is exactly 24 bytes; all multi-byte fields are literal ASCII or hex per the source.
- Source documents IRCC codes 0x00..0x97 used with `set_ircc_code`; full list in Table 5.
- Source covers "BRAVIA 2014 models" generically. KDX8307 Series applicability not explicitly confirmed in the refined excerpt.
- High-level WebAPI (JSON-RPC over HTTP) is referenced but not detailed; this spec covers only the low-level TCP bridge.
<!-- UNRESOLVED: HTTP/JSON-RPC WebAPI endpoint, path, and method-to-FourCC mapping not in the refined excerpt. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:48:36.106Z
last_checked_at: 2026-06-09T07:19:25.860Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:19:25.860Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literally to source Table 4; transport fully supported; no unrepresented source commands. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers \"BRAVIA 2014 models\" generically; KDX8307 Series is the operator-supplied target. The exact model-to-protocol mapping is not stated in the refined excerpt."
- "source defines no multi-step sequences. The WebAPI high-level protocol"
- "source contains no safety warnings, interlocks, or power-on sequencing"
- "HTTP/JSON-RPC WebAPI endpoint, path, and method-to-FourCC mapping not in the refined excerpt."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
