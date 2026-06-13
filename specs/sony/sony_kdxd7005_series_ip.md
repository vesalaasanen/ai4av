---
spec_id: admin/sony-kdxd7005-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXD7005 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "KDXD7005 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXD7005 Series"
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
retrieved_at: 2026-06-11T04:32:42.730Z
last_checked_at: 2026-06-11T13:46:47.865Z
generated_at: 2026-06-11T13:46:47.865Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware range stated; this is the BRAVIA 2014 Simple IP Control spec (v0.6) and may apply to additional model years not enumerated in source."
  - "no source evidence for free-form variables."
  - "no source evidence for multi-step sequences; remove or populate."
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
  - "original PDF URL of the Simple IP Control Protocol document not captured; firmware compatibility range across BRAVIA 2014 models not enumerated."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:46:47.865Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched to FourCC commands in source Table 4; transport parameters verified; complete coverage of command-bearing operations. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony KDXD7005 Series Simple IP Control Spec

## Summary
This spec covers the Sony Simple IP Control Protocol for BRAVIA 2014 models, used by the KDXD7005 series (KD-49XD7005, KD-55XD7005, etc.). The low-level transport is TCP on port 20060 using 24-byte fixed-size frames with Four-CC function codes. A higher-level HTTP/JSON-RPC layer is also documented as a protocol bridge to the same command set. Protocol must be enabled via Network > Home Network Setup > IP Control > Simple IP Control (or Hotel/Pro Mode > IP Control > Simple IP Control).

<!-- UNRESOLVED: no firmware range stated; this is the BRAVIA 2014 Simple IP Control spec (v0.6) and may apply to additional model years not enumerated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  notes: "Server times out and disconnects after 30 seconds of client inactivity"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # setPowerStatus
- routable        # setInput, setInputSource
- queryable       # getPowerStatus, getAudioVolume, getAudioMute, getChannel, getTripletChannel, getInputSource, getInput, getPictureMute, getPip, getBroadcastAddress, getMacAddress
- levelable       # setAudioVolume
```

## Actions
```yaml
# Each action is one 24-byte TCP frame. Frame layout:
#   Byte 0-1:  Header 0x2A 0x53 (fixed)
#   Byte 2:    Type     (0x43 Control, 0x45 Enquiry, 0x41 Answer, 0x4E Notify)
#   Byte 3-6:  Function Four-CC (ASCII)
#   Byte 7-22: Parameter (16 bytes, pad with '0' on left or '#' on right per command)
#   Byte 23:   Footer 0x0A (fixed)
# {value} below denotes the substituted parameter bytes.

- id: set_ircc_code
  label: Send IR-like code
  kind: action
  command: "2A 53 43 IRCC {ircc_param} 0A"  # 24-byte frame; IRCC param per Table 5
  params:
    - name: ircc_param
      type: string
      description: "16-byte IR code parameter, see Table 5 (e.g. Power Off = 00...00, Num1 = 00...12, Volume Up = 00...1E)"

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 POWR {state} 0A"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: "byte[7] = 0x00 standby, 0x01 active"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 POWR 0A"

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU {volume} 0A"
  params:
    - name: volume
      type: integer
      description: "Volume value as 16-digit decimal, left-padded with '0' (e.g. 0x29 -> 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU 0A"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 AMUT {state} 0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: "byte[7] = 0x00 unmute, 0x01 mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 AMUT 0A"

- id: set_channel
  label: Set Channel (preset number)
  kind: action
  command: "2A 53 43 CHNN {channel} 0A"
  params:
    - name: channel
      type: string
      description: "Channel as 16-digit decimal.major padding (e.g. 00000050.1000000 = 50.1, 00000006.0000000 = 6)"

- id: get_channel
  label: Get Channel (preset number)
  kind: query
  command: "2A 53 45 CHNN 0A"

- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "2A 53 43 TCHN {triplet} 0A"
  params:
    - name: triplet
      type: string
      description: "Channel as 3 hex words (e.g. 7FE07FE00400 = 32736.32736.1024)"

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 TCHN 0A"

- id: set_input_source
  label: Set TV Input Source
  kind: action
  command: "2A 53 43 ISRC {source} 0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: "Source name right-padded with '#' to 16 bytes (e.g. dvbt############)"

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "2A 53 45 ISRC 0A"

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 INPT {input_selector} 0A"
  params:
    - name: input_selector
      type: string
      description: "16-byte parameter; per Table 4: TV=00...00; HDMI 1-9999=000000010000XXXX; SCART 1-9999=000000020000XXXX; Composite 1-9999=000000030000XXXX; Component 1-9999=000000040000XXXX; Screen Mirroring 1-9999=000000050000XXXX; PC RGB 1-9999=000000060000XXXX"

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT 0A"

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 PMUT {state} 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: "byte[7] = 0x00 disable, 0x01 enable"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "2A 53 45 PMUT 0A"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU 0A"  # no parameter

- id: set_pip
  label: Set PIP (Picture in Picture)
  kind: action
  command: "2A 53 43 PIPI {state} 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: "byte[7] = 0x00 disable, 0x01 enable"

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 PIPI 0A"

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 TPIP 0A"  # no parameter

- id: toggle_pip_position
  label: Change PIP Position (in turn)
  kind: action
  command: "2A 53 43 TPPP 0A"  # no parameter

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 BADR eth0 0A"
  params:
    - name: interface
      type: string
      description: "Interface name left-justified in 4 bytes (e.g. 'eth0'); source shows answer is broadcast address right-padded with '#'"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 MADR eth0 0A"
  params:
    - name: interface
      type: string
      description: "Interface name left-justified in 4 bytes (e.g. 'eth0')"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "Answer to getPowerStatus: byte[7] = 0x00 standby, 0x01 active"

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  source: "Answer to getAudioMute: byte[7] = 0x00 not muted, 0x01 muted"

- id: audio_volume
  type: integer
  source: "Answer to getAudioVolume: 16-digit decimal volume value in parameter bytes"

- id: channel_preset
  type: string
  source: "Answer to getChannel: 16-byte preset channel number"

- id: channel_triplet
  type: string
  source: "Answer to getTripletChannel: 16-byte triplet channel number"

- id: input_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  source: "Answer to getInputSource: source name in parameter"

- id: input
  type: string
  source: "Answer to getInput: per Table 4 input selector encoding (TV/HDMI 1-9999/SCART 1-9999/Composite 1-9999/Component 1-9999/Screen Mirroring 1-9999/PC RGB 1-9999)"

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: "Answer to getPictureMute: byte[7] = 0x00 disabled, 0x01 enabled"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: "Answer to getPip: byte[7] = 0x00 disabled, 0x01 enabled"

- id: broadcast_address
  type: string
  source: "Answer to getBroadcastAddress: IPv4 address in 16 bytes, right-padded with '#' (e.g. 192.168.0.14)"

- id: mac_address
  type: string
  source: "Answer to getMacAddress: MAC address in 16 bytes, right-padded with '#'"
```

## Variables
```yaml
# Per source, no persistent settable variables are documented beyond the discrete actions above.
# UNRESOLVED: no source evidence for free-form variables.
```

## Events
```yaml
# All Notify (0x4E) messages are unsolicited events sent by TV -> Controller.
- id: power_change
  type: enum
  values: [standby, active]
  source: "Type 0x4E, FourCC POWR, byte[7] = 0x00 powering off, 0x01 powering on"
  command: "2A 53 4E POWR {state} 0A"

- id: channel_change
  type: string
  source: "Type 0x4E, FourCC CHNN, new preset channel in parameter"
  command: "2A 53 4E CHNN {channel} 0A"

- id: input_change
  type: string
  source: "Type 0x4E, FourCC INPT, per Table 4 input selector (TV/HDMI 1-9999/SCART 1-9999/Composite 1-9999/Component 1-9999/Screen Mirroring 1-9999/PC RGB 1-9999)"
  command: "2A 53 4E INPT {input_selector} 0A"

- id: volume_change
  type: string
  source: "Type 0x4E, FourCC VOLU, new volume value in parameter"
  command: "2A 53 4E VOLU {volume} 0A"

- id: mute_change
  type: enum
  values: [unmuted, muted]
  source: "Type 0x4E, FourCC AMUT, byte[7] = 0x00 unmuting, 0x01 muting"
  command: "2A 53 4E AMUT {state} 0A"

- id: pip_change
  type: enum
  values: [disabled, enabled]
  source: "Type 0x4E, FourCC PIPI, byte[7] = 0x00 disabled, 0x01 enabled"
  command: "2A 53 4E PIPI {state} 0A"

- id: picture_mute_change
  type: enum
  values: [disabled, enabled]
  source: "Type 0x4E, FourCC PMUT, byte[7] = 0x00 disabled, 0x01 enabled"
  command: "2A 53 4E PMUT {state} 0A"
```

## Macros
```yaml
# UNRESOLVED: no source evidence for multi-step sequences; remove or populate.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements.
```

## Notes
- Frame format: every TCP message is exactly 24 bytes (0x2A 0x53 header, 1-byte type, 4-byte Four-CC function, 16-byte parameter, 0x0A footer). Parameters are padded per command: numeric values left-padded with '0' (e.g. volume), strings right-padded with '#' (e.g. source name), interface names left-justified in 4 bytes (e.g. 'eth0').
- Connection lifecycle: server disconnects after 30s of client inactivity; clients must reconnect to issue new commands.
- High-level bridge: a parallel HTTP/JSON-RPC layer exposes the same Four-CC command set; this spec only models the low-level TCP framing.
- IR pass-through: setIrccCode lets the controller emulate any of the IR codes in Table 5 (Power, Input, digits, Volume, Channel, playback, color keys, etc.).
- Source URL the spec was refined from is a markdown excerpt (not the original PDF).
<!-- UNRESOLVED: original PDF URL of the Simple IP Control Protocol document not captured; firmware compatibility range across BRAVIA 2014 models not enumerated. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - applicationmarket.crestron.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
retrieved_at: 2026-06-11T04:32:42.730Z
last_checked_at: 2026-06-11T13:46:47.865Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:46:47.865Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched to FourCC commands in source Table 4; transport parameters verified; complete coverage of command-bearing operations. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware range stated; this is the BRAVIA 2014 Simple IP Control spec (v0.6) and may apply to additional model years not enumerated in source."
- "no source evidence for free-form variables."
- "no source evidence for multi-step sequences; remove or populate."
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements."
- "original PDF URL of the Simple IP Control Protocol document not captured; firmware compatibility range across BRAVIA 2014 models not enumerated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
