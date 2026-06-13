---
spec_id: admin/sony-kdxd7004-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXD7004 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDXD7004 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXD7004 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - applicationmarket.crestron.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
retrieved_at: 2026-06-12T04:37:40.277Z
last_checked_at: 2026-06-12T19:50:57.235Z
generated_at: 2026-06-12T19:50:57.235Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source documents the protocol but does not name a specific KDXD7004 firmware build; compat is assumed via the \"BRAVIA 2014 models\" lineage."
  - "source does not define composite multi-step sequences."
  - "source contains no explicit safety warnings, interlocks, or"
  - "no firmware version, no JSON-RPC command table (only the TCP bridge), no Wake-on-LAN behavior."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:50:57.235Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched verbatim to source Four-CC codes; transport parameters (port 20060, TCP, no auth) confirmed; all Notify commands represented in Events section. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDXD7004 Series Simple IP Control Spec

## Summary
Spec covers Sony BRAVIA Simple IP Control protocol (v0.6) as exposed by the KDXD7004 series. Low-level TCP transport on port 20060 carrying fixed 24-byte frames; each frame carries a Four-CC function name, a type byte (Control/Enquiry/Answer/Notify), and 16 parameter bytes. Enable via Network → Home Network Setup → IP Control → Simple IP Control (Normal Mode) or Hotel/Pro Mode → IP Control → Simple IP Control.

<!-- UNRESOLVED: source documents the protocol but does not name a specific KDXD7004 firmware build; compat is assumed via the "BRAVIA 2014 models" lineage. -->

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
- routable        # inferred: setInput / setInputSource present
- queryable       # inferred: getPowerStatus / getAudioVolume / getInput etc. present
- levelable       # inferred: setAudioVolume present
```

## Actions
```yaml
# Control / Enquiry / Notify actions over Sony Simple IP Control, 24-byte fixed
# frame layout: [0x2A 0x53] [Type: C|E|A|N] [Function: 4 ASCII bytes] [16 param bytes] [0x0A].
# `command:` field shows the literal frame template; variable parts in {braces}
# are filled with hex or ASCII bytes per the source's parameter table.

- id: set_ircc_code
  label: Send IR-Like Code
  kind: action
  command: "2A 53 43 IRCC {ircc_param_16_bytes} 0A"
  params:
    - name: ircc_param_16_bytes
      type: string
      description: 16 ASCII hex bytes from Table 5 (IR Command Parameters), e.g. `30` for Volume Up, `00` for Power Off
  notes: "setIrccCode - IRCC function code. See Table 5 for code values."

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 POWR 0000000000000000 0A"   # 0 = standby
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: Last parameter byte (0x30=standby/off, 0x31=active/on)
  notes: "setPowerStatus - POWR. 0=Standby, 1=Active."

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 POWR ################ 0A"
  params: []
  notes: "getPowerStatus - POWR enquiry."

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU {volume_ascii_padded} 0A"
  params:
    - name: volume_ascii_padded
      type: string
      description: Volume in decimal digits, left-padded with ASCII `0` to fill the 16-byte parameter field (e.g. `0000000000000029` = 41)
  notes: "setAudioVolume - VOLU."

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU ################ 0A"
  params: []
  notes: "getAudioVolume - VOLU enquiry. Answer carries the decimal-padded value."

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 AMUT 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: Last parameter byte (0x30=unmute, 0x31=mute)
  notes: "setAudioMute - AMUT. 0=Unmute, 1=Mute."

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 AMUT ################ 0A"
  params: []
  notes: "getAudioMute - AMUT enquiry."

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 CHNN {channel_preset_16_bytes} 0A"
  params:
    - name: channel_preset_16_bytes
      type: string
      description: Preset channel as 16 ASCII bytes; major.minor format (e.g. `00000050.1000000` = 50.1, `00000006.0000000` = 6)
  notes: "setChannel - CHNN. Change channel by preset number."

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 CHNN ################ 0A"
  params: []
  notes: "getChannel - CHNN enquiry. Answer carries preset channel in major.minor form."

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "2A 53 43 TCHN {triplet_16_bytes} 0A"
  params:
    - name: triplet_16_bytes
      type: string
      description: Triplet channel as 16 ASCII hex bytes (e.g. `7FE07FE00400` = 32736.32736.1024)
  notes: "setTripletChannel - TCHN."

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 TCHN ################ 0A"
  params: []
  notes: "getTripletChannel - TCHN enquiry."

- id: set_input_source
  label: Set TV Input Source (Tuner Type)
  kind: action
  command: "2A 53 43 ISRC {source_16_bytes} 0A"
  params:
    - name: source_16_bytes
      type: string
      description: Source name right-padded with ASCII `#` (0x23) to 16 bytes; e.g. `dvbt############`, `dvbc`, `dvbs`, `isdbt`, `isdbbs`, `isdbcs`, `antenna`, `cable`, `isdbgt`
  notes: "setInputSource - ISRC."

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 ISRC ################ 0A"
  params: []
  notes: "getInputSource - ISRC enquiry."

- id: set_input_tv
  label: Switch Input to TV Tuner
  kind: action
  command: "2A 53 43 INPT 0000000000000000 0A"
  params: []
  notes: "setInput - INPT, terminal code 0 (TV)."

- id: set_input_hdmi
  label: Switch Input to HDMI
  kind: action
  command: "2A 53 43 INPT 00000001000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999
  notes: "setInput - INPT, terminal code 1 (HDMI 1-9999)."

- id: set_input_scart
  label: Switch Input to SCART
  kind: action
  command: "2A 53 43 INPT 00000002000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: SCART port number 1-9999
  notes: "setInput - INPT, terminal code 2 (SCART 1-9999)."

- id: set_input_composite
  label: Switch Input to Composite
  kind: action
  command: "2A 53 43 INPT 00000003000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: Composite port number 1-9999
  notes: "setInput - INPT, terminal code 3 (Composite 1-9999)."

- id: set_input_component
  label: Switch Input to Component
  kind: action
  command: "2A 53 43 INPT 00000004000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: Component port number 1-9999
  notes: "setInput - INPT, terminal code 4 (Component 1-9999)."

- id: set_input_screen_mirroring
  label: Switch Input to Screen Mirroring
  kind: action
  command: "2A 53 43 INPT 00000005000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: Screen mirroring port 1-9999
  notes: "setInput - INPT, terminal code 5 (Screen Mirroring 1-9999)."

- id: set_input_pc_rgb
  label: Switch Input to PC RGB
  kind: action
  command: "2A 53 43 INPT 00000006000{port}#### 0A"
  params:
    - name: port
      type: integer
      description: PC RGB port 1-9999
  notes: "setInput - INPT, terminal code 6 (PC RGB Input 1-9999)."

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT ################ 0A"
  params: []
  notes: "getInput - INPT enquiry. Answer layout matches the terminal-code table above."

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 PMUT 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]
      description: Last parameter byte (0x30=disable/picture-mute-off, 0x31=enable/black-screen)
  notes: "setPictureMute - PMUT. 0=Disable picture mute, 1=Make screen black."

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 PMUT ################ 0A"
  params: []
  notes: "getPictureMute - PMUT enquiry."

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU ################ 0A"
  params: []
  notes: "togglePictureMute - TPMU."

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "2A 53 43 PIPI 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]
      description: Last parameter byte (0x30=disable PIP, 0x31=enable PIP)
  notes: "setPip - PIPI. 0=Disable, 1=Enable."

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 PIPI ################ 0A"
  params: []
  notes: "getPip - PIPI enquiry."

- id: toggle_pip
  label: Toggle PIP Status
  kind: action
  command: "2A 53 43 TPIP ################ 0A"
  params: []
  notes: "togglePip - TPIP."

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 TPPP ################ 0A"
  params: []
  notes: "togglePipPosition - TPPP. Change PIP position in turn."

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 BADR eth0############# 0A"
  params:
    - name: interface
      type: string
      description: Interface name right-padded with `#` to 16 bytes (e.g. `eth0`)
  notes: "getBroadcastAddress - BADR."

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 MADR eth0############# 0A"
  params:
    - name: interface
      type: string
      description: Interface name right-padded with `#` to 16 bytes (e.g. `eth0`)
  notes: "getMacAddress - MADR."
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  notes: "Answer to getPowerStatus (POWR)."

- id: audio_volume
  type: integer
  notes: "Answer to getAudioVolume (VOLU); decimal-padded ASCII in parameter field."

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  notes: "Answer to getAudioMute (AMUT)."

- id: channel_preset
  type: string
  notes: "Answer to getChannel (CHNN); major.minor preset string."

- id: triplet_channel
  type: string
  notes: "Answer to getTripletChannel (TCHN); 16 ASCII hex bytes."

- id: input_source
  type: string
  notes: "Answer to getInputSource (ISRC); right-padded source name."

- id: input_terminal
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  notes: "Answer to getInput (INPT); terminal code 0-6 with optional port."

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  notes: "Answer to getPictureMute (PMUT)."

- id: pip_state
  type: enum
  values: [disabled, enabled]
  notes: "Answer to getPip (PIPI)."

- id: broadcast_address
  type: string
  notes: "Answer to getBroadcastAddress (BADR)."

- id: mac_address
  type: string
  notes: "Answer to getMacAddress (MADR)."
```

## Variables
```yaml
# Discrete settable values are encoded as Actions above (per protocol). No
# additional free-form variables are exposed beyond the parameter fields.
```

## Events
```yaml
- id: power_change
  type: enum
  values: [standby, active]
  notes: "Notify firePowerChange (POWR, type N). 0=powering off, 1=powering on."

- id: channel_change
  type: string
  notes: "Notify fireChannelChange (CHNN, type N); preset channel payload."

- id: input_change
  type: object
  notes: "Notify fireInputChange (INPT, type N); terminal code + port. See INPT codes under set_input_*."

- id: volume_change
  type: integer
  notes: "Notify fireVolumeChange (VOLU, type N); new volume value."

- id: mute_change
  type: enum
  values: [unmuted, muted]
  notes: "Notify fireMuteChange (AMUT, type N). 0=unmuting, 1=muting."

- id: pip_change
  type: enum
  values: [disabled, enabled]
  notes: "Notify firePipChange (PIPI, type N)."

- id: picture_mute_change
  type: enum
  values: [disabled, enabled]
  notes: "Notify firePictureMuteChange (PMUT, type N)."
```

## Macros
```yaml
# UNRESOLVED: source does not define composite multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlocks, or
# power-on sequencing requirements.
```

## Notes
- Frame layout is fixed 24 bytes: `0x2A 0x53` (header) | type (C/E/A/N) | Four-CC function (4 ASCII bytes) | 16 param bytes | `0x0A` (footer).
- TCP port 20060. Server closes idle connections after 30 s of silence.
- Protocol is the "Low Level" bridge to the WebAPI layer; every command here is also available via the WebAPI JSON-RPC HTTP interface per source.
- IRCC command set (Table 5) is a single setIrccCode call with a 16-byte parameter from the IR code table; entries span `0x30..0x39` and `0x41..0x49` (Power Off through Social), full list in source.
- `entity_id` provided as `sony_kdxd7004_series`; replace with canonical Convex entityId at ingest time.
- "BRAVIA 2014 models" provenance from source — KD-XD7004 series is a 2014 lineup; spec lineage asserted from this, not separately verified.
<!-- UNRESOLVED: no firmware version, no JSON-RPC command table (only the TCP bridge), no Wake-on-LAN behavior. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - applicationmarket.crestron.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
retrieved_at: 2026-06-12T04:37:40.277Z
last_checked_at: 2026-06-12T19:50:57.235Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:50:57.235Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched verbatim to source Four-CC codes; transport parameters (port 20060, TCP, no auth) confirmed; all Notify commands represented in Events section. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents the protocol but does not name a specific KDXD7004 firmware build; compat is assumed via the \"BRAVIA 2014 models\" lineage."
- "source does not define composite multi-step sequences."
- "source contains no explicit safety warnings, interlocks, or"
- "no firmware version, no JSON-RPC command table (only the TCP bridge), no Wake-on-LAN behavior."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
