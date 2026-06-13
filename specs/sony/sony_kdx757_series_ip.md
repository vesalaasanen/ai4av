---
spec_id: admin/sony-kdx757-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX757 Series Control Spec"
manufacturer: Sony
model_family: "KDX757 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX757 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony
retrieved_at: 2026-06-12T04:33:37.004Z
last_checked_at: 2026-06-12T19:48:45.066Z
generated_at: 2026-06-12T19:48:45.066Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific model list (KDX757 series sub-models) not enumerated in source. Source describes the protocol generically for \"BRAVIA 2014 models\"."
  - "no settable parameter outside the discrete action set in source."
  - "no multi-step sequences described in source."
  - "no safety warnings, interlocks, or power-on sequencing stated in source."
  - "KDX757 series sub-model list (e.g. KDL-32WD757, KDL-43WD757) not enumerated in this protocol document. Source is generic to \"BRAVIA 2014 models\"."
  - "firmware version range compatible with this protocol not stated."
  - "WebAPI (JSON-RPC/HTTP) details not included in this spec."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:48:45.066Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched exactly with source Four-CC commands; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDX757 Series Control Spec

## Summary
BRAVIA 2014 series TV with Sony Simple IP Control Protocol (Low Level): fixed 24-byte TCP frames on port 20060 using Four-CC function codes. Covers power, volume, mute, channel, input, picture mute, PIP, and IR-like commands. High-level WebAPI (JSON-RPC over HTTP) also exists but is out of scope for this spec.

<!-- UNRESOLVED: device-specific model list (KDX757 series sub-models) not enumerated in source. Source describes the protocol generically for "BRAVIA 2014 models". -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame format (per source, Section 3, Table 1):** 24 bytes fixed-size.
- Byte 0-1: Header = `0x2A 0x53` (fixed)
- Byte 2: Type — `0x43` [C] Control, `0x45` [E] Enquiry, `0x41` [A] Answer, `0x4E` [N] Notify
- Byte 3-6: Function — 4 ASCII characters (Four-CC)
- Byte 7-22: Parameter — 16 bytes (hex-decimal digits `0`/`1`/`X`/`#`/`F` or ASCII padded with `#`)
- Byte 23: Footer = `0x0A` (LF, fixed)

Parameter padding: left-pad decimal digits with `0`; right-pad ASCII with `#`.

## Traits
```yaml
- powerable   # inferred from setPowerStatus / getPowerStatus
- routable    # inferred from setInput / setInputSource / setChannel commands
- queryable   # inferred from getPowerStatus, getAudioVolume, getInput, etc.
- levelable   # inferred from setAudioVolume command
```

## Actions
```yaml
# Control messages (Type 0x43). All frames share header 0x2A 0x53 and footer 0x0A.
# Format: {header} 0x43 {fourcc} {param16} {footer}
# Parameter bytes shown as documented in Table 4 (hex-decimal digits / ASCII).

- id: ircc_send
  label: Send IR Code
  kind: action
  command: "0x2A 0x53 0x43 I R C C {ircc-param16} 0x0A"  # setIrccCode
  params:
    - name: ircc-param16
      type: string
      description: 16-byte IR code from Table 5 (e.g. Power Off = 0000000000000000, Volume Up = 0000000000000030)

- id: power_off
  label: Power Off (Standby)
  kind: action
  command: "0x2A 0x53 0x43 P O W R 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0x0A"  # setPowerStatus param=0
  params: []

- id: power_on
  label: Power On (Active)
  kind: action
  command: "0x2A 0x53 0x43 P O W R 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0x0A"  # setPowerStatus param=1
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x2A 0x53 0x45 P O W R # # # # # # # # # # # # # # # # # 0x0A"  # getPowerStatus
  params: []

- id: set_volume
  label: Set Audio Volume
  kind: action
  command: "0x2A 0x53 0x43 V O L U {level-padded-16} 0x0A"  # setAudioVolume: decimal left-padded with 0, e.g. 0000000000000029 = 41
  params:
    - name: level
      type: integer
      description: Volume value, decimal, left-padded with 0 to 16 chars

- id: get_volume
  label: Get Audio Volume
  kind: query
  command: "0x2A 0x53 0x45 V O L U # # # # # # # # # # # # # # # # # 0x0A"  # getAudioVolume
  params: []

- id: set_mute_off
  label: Unmute
  kind: action
  command: "0x2A 0x53 0x43 A M U T 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0x0A"  # setAudioMute param=0
  params: []

- id: set_mute_on
  label: Mute
  kind: action
  command: "0x2A 0x53 0x43 A M U T 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0x0A"  # setAudioMute param=1
  params: []

- id: get_mute
  label: Get Audio Mute Status
  kind: query
  command: "0x2A 0x53 0x45 A M U T # # # # # # # # # # # # # # # # # 0x0A"  # getAudioMute
  params: []

- id: set_channel_preset
  label: Set Channel (Preset Number)
  kind: action
  command: "0x2A 0x53 0x43 C H N N {major}.{minor} 0x0A"  # setChannel: 00000050.1000000 = 50.1; padded major.minor
  params:
    - name: major
      type: integer
      description: Major channel number, decimal, left-padded with 0
    - name: minor
      type: integer
      description: Minor channel number, decimal, left-padded with 0

- id: get_channel_preset
  label: Get Channel (Preset Number)
  kind: query
  command: "0x2A 0x53 0x45 C H N N # # # # # # # # # # # # # # # # # 0x0A"  # getChannel
  params: []

- id: set_channel_triplet
  label: Set Channel (Triplet Hex)
  kind: action
  command: "0x2A 0x53 0x43 T C H N {triplet16} # # # # 0x0A"  # setTripletChannel, e.g. 7FE07FE00400 = 32736.32736.1024
  params:
    - name: triplet
      type: string
      description: 16-hex-digit triplet; encodes major.minor.1024-style

- id: get_channel_triplet
  label: Get Channel (Triplet)
  kind: query
  command: "0x2A 0x53 0x45 T C H N # # # # # # # # # # # # # # # # # 0x0A"  # getTripletChannel
  params: []

- id: set_input_source
  label: Set TV Input Source (Tuner)
  kind: action
  command: "0x2A 0x53 0x43 I S R C {source-padded} 0x0A"  # setInputSource: dvbt / dvbc / dvbs / isdbt / isdbbs / isdbcs / antenna / cable / isdbgt
  params:
    - name: source
      type: string
      description: One of dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt; right-padded with # to 16 chars

- id: get_input_source
  label: Get TV Input Source (Tuner)
  kind: query
  command: "0x2A 0x53 0x45 I S R C # # # # # # # # # # # # # # # # # 0x0A"  # getInputSource
  params: []

- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0x0A"  # setInput param=0
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 1 {port} 0x0A"  # setInput param=1xxx, port 1-9999
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999, decimal, left-padded with 0

- id: set_input_scart
  label: Set Input to SCART
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 2 {port} 0x0A"  # setInput param=2xxx
  params:
    - name: port
      type: integer
      description: SCART port number 1-9999

- id: set_input_composite
  label: Set Input to Composite
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 3 {port} 0x0A"  # setInput param=3xxx
  params:
    - name: port
      type: integer
      description: Composite port number 1-9999

- id: set_input_component
  label: Set Input to Component
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 4 {port} 0x0A"  # setInput param=4xxx
  params:
    - name: port
      type: integer
      description: Component port number 1-9999

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 5 {port} 0x0A"  # setInput param=5xxx
  params:
    - name: port
      type: integer
      description: Screen mirroring port number 1-9999

- id: set_input_pc_rgb
  label: Set Input to PC RGB
  kind: action
  command: "0x2A 0x53 0x43 I N P T 0 0 0 0 0 0 0 6 {port} 0x0A"  # setInput param=6xxx
  params:
    - name: port
      type: integer
      description: PC RGB port number 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "0x2A 0x53 0x45 I N P T # # # # # # # # # # # # # # # # # 0x0A"  # getInput
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 P M U T 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0x0A"  # setPictureMute param=0
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute (Black Screen)
  kind: action
  command: "0x2A 0x53 0x43 P M U T 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0x0A"  # setPictureMute param=1
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "0x2A 0x53 0x45 P M U T # # # # # # # # # # # # # # # # # 0x0A"  # getPictureMute
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 T P M U # # # # # # # # # # # # # # # # # 0x0A"  # togglePictureMute
  params: []

- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "0x2A 0x53 0x43 P I P I 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0x0A"  # setPip param=0
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "0x2A 0x53 0x43 P I P I 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0x0A"  # setPip param=1
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "0x2A 0x53 0x45 P I P I # # # # # # # # # # # # # # # # # 0x0A"  # getPip
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "0x2A 0x53 0x43 T P I P # # # # # # # # # # # # # # # # # 0x0A"  # togglePip
  params: []

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "0x2A 0x53 0x43 T P P P # # # # # # # # # # # # # # # # # 0x0A"  # togglePipPosition
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "0x2A 0x53 0x45 B A D R e t h 0 # # # # # # # # # # # # 0x0A"  # getBroadcastAddress: 16-byte param "eth0" right-padded with #
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x2A 0x53 0x45 M A D R e t h 0 # # # # # # # # # # # # 0x0A"  # getMacAddress: 16-byte param "eth0" right-padded with #
  params: []
```

## Feedbacks
```yaml
# Notify messages (Type 0x4E), sent unsolicited by TV.

- id: power_change_event
  type: enum
  values: [standby, active]
  description: firePowerChange notify, param 0=standby, 1=active

- id: channel_change_event
  type: string
  description: fireChannelChange notify, carries new preset channel number

- id: input_change_event
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: fireInputChange notify, input type + port (1-9999) for non-TV inputs

- id: volume_change_event
  type: integer
  description: fireVolumeChange notify, new volume value

- id: mute_change_event
  type: enum
  values: [unmuted, muted]
  description: fireMuteChange notify

- id: pip_change_event
  type: enum
  values: [disabled, enabled]
  description: firePipChange notify

- id: picture_mute_change_event
  type: enum
  values: [disabled, enabled]
  description: firePictureMuteChange notify

# Query responses (Type 0x41 Answer)

- id: power_state
  type: enum
  values: [standby, active]

- id: audio_volume
  type: integer
  description: Current volume value (decimal)

- id: audio_mute
  type: enum
  values: [not_muted, muted]

- id: channel_preset
  type: string
  description: Major.Minor preset channel

- id: channel_triplet
  type: string
  description: Hex triplet channel

- id: input_source_tuner
  type: string
  description: One of dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt

- id: input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]

- id: picture_mute
  type: enum
  values: [disabled, enabled]

- id: pip_status
  type: enum
  values: [disabled, enabled]

- id: broadcast_address
  type: string
  description: IPv4 broadcast address of eth0 (right-padded with #)

- id: mac_address
  type: string
  description: MAC address of eth0 (right-padded with #)
```

## Variables
```yaml
# Settable parameters covered as discrete actions above (volume, channel, input).
# No additional free-form settable parameters documented in source.
# UNRESOLVED: no settable parameter outside the discrete action set in source.
```

## Events
```yaml
# All covered in Feedbacks section (notify messages).
# - firePowerChange (POWR)
# - fireChannelChange (CHNN)
# - fireInputChange (INPT)
# - fireVolumeChange (VOLU)
# - fireMuteChange (AMUT)
# - firePipChange (PIPI)
# - firePictureMuteChange (PMUT)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing stated in source.
```

## Notes
- TCP server listens on port 20060; idle connections dropped after 30s of no client traffic.
- Protocol requires `Network > Home Network Setup > IP Control > Simple IP Control` (Normal Mode) or `Hotel/Pro Mode > IP Control > Simple IP Control` (Hotel/Pro Mode) to be enabled on the TV.
- Frame is exactly 24 bytes; any shorter frame is invalid.
- Parameter encoding is mixed: numeric fields use hex-decimal digits (`0`/`1`) left-padded with `0`; ASCII fields right-padded with `#`; "any" placeholders use `X`; "no parameter" uses `#`; "error" responses use `F`.
- IR-like codes (setIrccCode IRCC) wrap any Table 5 IR function for the TV — see Table 5 in source for the 100+ code map (Power, Input, Num0-9, Volume, Channel, Netflix, etc.).
- High-level WebAPI (JSON-RPC over HTTP) is mentioned in source but not documented here.

<!-- UNRESOLVED: KDX757 series sub-model list (e.g. KDL-32WD757, KDL-43WD757) not enumerated in this protocol document. Source is generic to "BRAVIA 2014 models". -->
<!-- UNRESOLVED: firmware version range compatible with this protocol not stated. -->
<!-- UNRESOLVED: WebAPI (JSON-RPC/HTTP) details not included in this spec. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony
retrieved_at: 2026-06-12T04:33:37.004Z
last_checked_at: 2026-06-12T19:48:45.066Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:48:45.066Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched exactly with source Four-CC commands; bidirectional coverage complete. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific model list (KDX757 series sub-models) not enumerated in source. Source describes the protocol generically for \"BRAVIA 2014 models\"."
- "no settable parameter outside the discrete action set in source."
- "no multi-step sequences described in source."
- "no safety warnings, interlocks, or power-on sequencing stated in source."
- "KDX757 series sub-model list (e.g. KDL-32WD757, KDL-43WD757) not enumerated in this protocol document. Source is generic to \"BRAVIA 2014 models\"."
- "firmware version range compatible with this protocol not stated."
- "WebAPI (JSON-RPC/HTTP) details not included in this spec."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
