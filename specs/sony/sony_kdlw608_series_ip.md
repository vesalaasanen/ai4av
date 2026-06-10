---
spec_id: admin/sony-kdlw608-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDLW608 Series BRAVIA Control Spec"
manufacturer: Sony
model_family: "KDL-W608 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDL-W608 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T15:17:44.023Z
last_checked_at: 2026-06-09T07:17:43.349Z
generated_at: 2026-06-09T07:17:43.349Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact model list within KDLW608 series not enumerated in source"
  - "JSON-RPC HTTP base URL/path not stated in source"
  - "source does not document named macro sequences"
  - "source contains no explicit safety warnings, interlocks, or"
  - "JSON-RPC HTTP method/path/endpoints for the high-level WebAPI not documented in source. UNRESOLVED: detailed 16-byte IRCC parameter values for ~96 Table 5 functions are listed numerically; only Power Off (0000000000000000) and a few example bytes are quoted verbatim. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: port for HTTP WebAPI not stated (port 20060 is TCP low-level only)."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:17:43.349Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions found in source with exact FourCC codes and matching parameter shapes; transport port verified. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDLW608 Series BRAVIA Control Spec

## Summary
Sony BRAVIA 2014 models (KDL-W608 series) exposing a Simple IP Control protocol. The spec covers both the high-level HTTP/JSON-RPC WebAPI and the low-level TCP fixed-size byte stream on port 20060. Low-level protocol is a bridge to the high-level; every low-level command is available via JSON-RPC.

<!-- UNRESOLVED: exact model list within KDLW608 series not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - http
addressing:
  port: 20060
  base_url: ""  # UNRESOLVED: JSON-RPC HTTP base URL/path not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / firePowerChange
- routable        # inferred from setInputSource / setInput / fireInputChange
- queryable       # inferred from getPowerStatus, getInput, getAudioVolume, etc.
- levelable       # inferred from setAudioVolume / fireVolumeChange
```

## Actions
```yaml
# setIrccCode - send IR-like code (4-byte FourCC "IRCC" + 16-byte IR code)
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 49 52 43 43 {ir_code_16bytes} 0A"  # Header+S+Control+IRCC+16-byte param+LF
  params:
    - name: ir_code
      type: string
      description: 16-byte IR code from Table 5 (e.g. 0000000000000000 for Power Off)

# Power
- id: set_power_status_off
  label: Power Off (Standby)
  kind: action
  command: "2A 53 43 50 4F 57 52 0000000000000000 0A"  # *S C POWR 0...0 LF
  params: []
- id: set_power_status_on
  label: Power On (Active)
  kind: action
  command: "2A 53 43 50 4F 57 52 0000000000000001 0A"
  params: []
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 ################ 0A"  # *S E POWR ######## LF
  params: []

# Audio Volume
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume_16char_decimal} 0A"
  params:
    - name: volume
      type: integer
      description: Volume value (0-100 typical), left-padded with '0' to 16 chars, e.g. "0000000000000029"
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 ################ 0A"
  params: []

# Audio Mute
- id: set_audio_mute_off
  label: Unmute Audio
  kind: action
  command: "2A 53 43 41 4D 55 54 0000000000000000 0A"
  params: []
- id: set_audio_mute_on
  label: Mute Audio
  kind: action
  command: "2A 53 43 41 4D 55 54 0000000000000001 0A"
  params: []
- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 41 4D 55 54 ################ 0A"
  params: []

# Channel (preset number major.minor)
- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {major_8}.{minor_7} 0A"
  params:
    - name: channel
      type: string
      description: Preset channel as major.minor, left-padded with '0'. Example: "00000050.1000000" = 50.1
- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E ################ 0A"
  params: []

# Channel (triplet)
- id: set_triplet_channel
  label: Set Channel (Triplet Hex)
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_hex_12}.{param4} 0A"
  params:
    - name: triplet
      type: string
      description: 12 hex digits representing source.transport.major padded. Example: "7FE07FE00400" = 32736.32736.1024
- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E ################ 0A"
  params: []

# Input source (tuner type)
- id: set_input_source
  label: Set Input Source (Tuner)
  kind: action
  command: "2A 53 43 49 53 52 43 {source_padded} 0A"
  params:
    - name: source
      type: string
      description: Tuner source name, right-padded with '#' to 16 chars. One of: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt
- id: get_input_source
  label: Get Current Tuner Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 ################ 0A"
  params: []

# Input (physical source)
- id: set_input_tv
  label: Change Input to TV
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000000000000 0A"
  params: []
- id: set_input_hdmi
  label: Change Input to HDMI
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000001000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: HDMI port number (1-9999)
- id: set_input_scart
  label: Change Input to SCART
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000002000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: SCART port number (1-9999)
- id: set_input_composite
  label: Change Input to Composite
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000003000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: Composite port number (1-9999)
- id: set_input_component
  label: Change Input to Component
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000004000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: Component port number (1-9999)
- id: set_input_screen_mirroring
  label: Change Input to Screen Mirroring
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000005000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: Screen Mirroring port number (1-9999)
- id: set_input_pc_rgb
  label: Change Input to PC RGB
  kind: action
  command: "2A 53 43 49 4E 50 54 0000000006000000{port:04d} 0A"
  params:
    - name: port
      type: integer
      description: PC RGB port number (1-9999)
- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 ################ 0A"
  params: []

# Picture Mute
- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 0000000000000000 0A"
  params: []
- id: set_picture_mute_on
  label: Enable Picture Mute (Black Screen)
  kind: action
  command: "2A 53 43 50 4D 55 54 0000000000000001 0A"
  params: []
- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 50 4D 55 54 ################ 0A"
  params: []
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 ################ 0A"
  params: []

# PIP
- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 0000000000000000 0A"
  params: []
- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 0000000000000001 0A"
  params: []
- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 ################ 0A"
  params: []
- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 ################ 0A"
  params: []
- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 ################ 0A"
  params: []

# Network info
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 42 41 44 52 eth0########## 0A"
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. eth0), right-padded with '#'
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 4D 41 44 52 eth0########## 0A"
  params:
    - name: interface
      type: string
      description: Network interface name (e.g. eth0), right-padded with '#'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [off, on]
  description: Reply parameter byte: 0=Standby(Off), 1=Active(On)
- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
- id: pip_state
  type: enum
  values: [disabled, enabled]
- id: input_state
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: First payload byte selects category, last 4 bytes hold port number
- id: input_source
  type: string
  description: 16-byte tuner source name, right-padded with '#'
- id: channel_preset
  type: string
  description: 16-byte major.minor channel, e.g. "00000050.1000000"
- id: channel_triplet
  type: string
  description: 16-byte hex triplet string
- id: audio_volume
  type: integer
  description: Volume as decimal integer, parsed from 16-byte decimal-padded field
- id: broadcast_address
  type: string
  description: IPv4 broadcast address, right-padded with '#'
- id: mac_address
  type: string
  description: MAC address, right-padded with '#'
```

## Variables
```yaml
- id: volume
  type: integer
  description: Audio volume level
  range: 0-100
  command_set: set_audio_volume
  command_get: get_audio_volume
```

## Events
```yaml
- id: power_change
  command: "2A 53 4E 50 4F 57 52 {state} 0A"  # 'N' (0x4E) Notify type
  description: 0=powering off, 1=powering on
- id: channel_change
  command: "2A 53 4E 43 48 4E 4E {major}.{minor} 0A"
  description: New preset channel after change
- id: input_change
  command: "2A 53 4E 49 4E 50 54 {input_code} 0A"
  description: 0=TV, 1=HDMI(n), 2=SCART(n), 3=Composite(n), 4=Component(n), 5=Screen Mirroring(n), 6=PC RGB(n)
- id: volume_change
  command: "2A 53 4E 56 4F 4C 55 {volume} 0A"
- id: mute_change
  command: "2A 53 4E 41 4D 55 54 {state} 0A"
  description: 0=unmuted, 1=muted
- id: pip_change
  command: "2A 53 4E 50 49 50 49 {state} 0A"
  description: 0=disabled, 1=enabled
- id: picture_mute_change
  command: "2A 53 4E 50 4D 55 54 {state} 0A"
  description: 0=disabled, 1=enabled
```

## Macros
```yaml
# UNRESOLVED: source does not document named macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements
```

## Notes
Protocol is a 24-byte fixed-size TCP message: 0x2A 0x53 header, 1-byte type (C/E/A/N), 4-byte ASCII FourCC function code, 16-byte parameter, 0x0A footer. Server disconnects after 30s idle. IR-like remote commands (Table 5: Power Off, Input, EPG, Volume, Channel, Numeric, Playback, Netflix, etc., ~96 codes) are sent via the single `setIrccCode` (IRCC) action using the 16-byte parameter from Table 5. Channel preset format is `MM.MM` (8-char major, dot, 7-char minor) and triplet format is 12 hex digits.

<!-- UNRESOLVED: JSON-RPC HTTP method/path/endpoints for the high-level WebAPI not documented in source. UNRESOLVED: detailed 16-byte IRCC parameter values for ~96 Table 5 functions are listed numerically; only Power Off (0000000000000000) and a few example bytes are quoted verbatim. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: port for HTTP WebAPI not stated (port 20060 is TCP low-level only). -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T15:17:44.023Z
last_checked_at: 2026-06-09T07:17:43.349Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:17:43.349Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions found in source with exact FourCC codes and matching parameter shapes; transport port verified. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact model list within KDLW608 series not enumerated in source"
- "JSON-RPC HTTP base URL/path not stated in source"
- "source does not document named macro sequences"
- "source contains no explicit safety warnings, interlocks, or"
- "JSON-RPC HTTP method/path/endpoints for the high-level WebAPI not documented in source. UNRESOLVED: detailed 16-byte IRCC parameter values for ~96 Table 5 functions are listed numerically; only Power Off (0000000000000000) and a few example bytes are quoted verbatim. UNRESOLVED: firmware version compatibility not stated. UNRESOLVED: port for HTTP WebAPI not stated (port 20060 is TCP low-level only)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
