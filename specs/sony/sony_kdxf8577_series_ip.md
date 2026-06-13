---
spec_id: admin/sony-kdxf8577-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXF8577 Series Simple IP Control Spec"
manufacturer: Sony
model_family: KD-43XF8577
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-43XF8577
    - KD-49XF8577
    - KD-55XF8577
    - KD-65XF8577
    - KD-75XF8577
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/
retrieved_at: 2026-06-12T04:41:21.268Z
last_checked_at: 2026-06-12T19:52:54.819Z
generated_at: 2026-06-12T19:52:54.819Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not list the specific model strings the firmware reports; the KD-* model numbers above are inferred from the consumer XF8577 series naming and not from this protocol document."
  - "source does not describe any multi-step sequences."
  - "source contains no safety warnings, interlocks, or power-on"
  - "firmware version compatibility not stated in source."
  - "retry/timeout policy for the 30 s server-side idle disconnect not stated."
  - "error-code sub-fields beyond the all-`F` generic error pattern are not enumerated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:52:54.819Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literally to source Table 4 commands; transport parameters (TCP/20060, no auth) verified; full coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDXF8577 Series Simple IP Control Spec

## Summary
Sony BRAVIA Simple IP Control protocol for the 2014-era XF8577 series. Uses a fixed 24-byte TCP frame on port 20060 with ASCII FourCC function names. The protocol must be enabled in the TV's menu (Network > Home Network Setup > IP Control > Simple IP Control) before commands will be accepted.

<!-- UNRESOLVED: source does not list the specific model strings the firmware reports; the KD-* model numbers above are inferred from the consumer XF8577 series naming and not from this protocol document. -->

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
# powerable: setPowerStatus / getPowerStatus present
# queryable: getPowerStatus, getAudioVolume, getAudioMute, getChannel, getTripletChannel, getInputSource, getInput, getPictureMute, getPip, getBroadcastAddress, getMacAddress present
# routable: setInput / setInputSource present (TV, HDMI, SCART, Composite, Component, Screen Mirroring, PC RGB)
# levelable: setAudioVolume / getAudioVolume present
# pipable: setPip / getPip / togglePip / togglePipPosition present
- powerable
- queryable
- routable
- levelable
```

## Actions
```yaml
# Protocol: 24-byte fixed frame on TCP/20060
# Layout: [0x2A][0x53][Type 1B][Function 4B ASCII][Parameter 16B][0x0A]
# Type: 0x43 C (Control), 0x45 E (Enquiry), 0x41 A (Answer), 0x4E N (Notify)
# command field below shows Function FourCC + Type code so the
# frame-builder is unambiguous; implementer prepends 0x2A 0x53, appends 0x0A,
# zero-pads Parameter to 16 bytes, then sends.
#
# Multiple distinct rows in the source are emitted as separate actions
# (per the granularity rule). Parameter values inside a single command
# (e.g. setInput sub-types) are kept as one parameterized action each.

- id: set_ircc_code
  label: Set IR-like Code
  kind: action
  command: "Type=0x43 Function=IRCC Param={ircc_code:4hex}"
  params:
    - name: ircc_code
      type: string
      description: 4-hex-digit IR code per Table 5 (e.g. 0000 power off, 0030 vol up)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "Type=0x43 Function=POWR Param=000000000000000{0|1}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "Type=0x45 Function=POWR Param=################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "Type=0x43 Function=VOLU Param=00000000000000{level:02X}"
  params:
    - name: level
      type: integer
      description: Volume value in decimal, left-padded with "0" to 16 chars (e.g. 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "Type=0x45 Function=VOLU Param=################"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "Type=0x43 Function=AMUT Param=000000000000000{0|1}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Unmute, 1 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "Type=0x45 Function=AMUT Param=################"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "Type=0x43 Function=CHNN Param={major:08X}.{minor:07X}"
  params:
    - name: major
      type: integer
      description: Major channel number (e.g. 00000050 = ch 50)
    - name: minor
      type: integer
      description: Minor channel number (e.g. 1000000 = .1)

- id: get_channel
  label: Get Channel (Preset)
  kind: query
  command: "Type=0x45 Function=CHNN Param=################"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "Type=0x43 Function=TCHN Param={maj:04X}{min:04X}{attr:04X}"
  params:
    - name: maj
      type: integer
      description: Major triplet (hex), e.g. 7FE0
    - name: min
      type: integer
      description: Minor triplet (hex), e.g. 7FE0
    - name: attr
      type: integer
      description: Attribute triplet (hex), e.g. 0400

- id: get_triplet_channel
  label: Get Channel (Triplet)
  kind: query
  command: "Type=0x45 Function=TCHN Param=################"
  params: []

- id: set_input_source
  label: Set TV Input Source (Tuner)
  kind: action
  command: "Type=0x43 Function=ISRC Param={source_padded:16}"
  params:
    - name: source
      type: string
      description: One of: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt (right-padded with # to 16 chars, e.g. dvbt############)

- id: get_input_source
  label: Get TV Input Source (Tuner)
  kind: query
  command: "Type=0x45 Function=ISRC Param=################"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "Type=0x43 Function=INPT Param=00000000000{kind}{0|1|2|3|4|5|6}000{port:04X}"
  params:
    - name: kind
      type: integer
      description: "0=TV, 1=HDMI(1-9999), 2=SCART(1-9999), 3=Composite(1-9999), 4=Component(1-9999), 5=Screen Mirroring(1-9999), 6=PC RGB(1-9999)"
    - name: port
      type: integer
      description: "Port number 0001-270F, encoded as 4-hex digits; omit (all zeros) for TV"

- id: get_input
  label: Get Input
  kind: query
  command: "Type=0x45 Function=INPT Param=################"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "Type=0x43 Function=PMUT Param=000000000000000{0|1}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Disable picture mute, 1 = Make screen black (picture mute on)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "Type=0x45 Function=PMUT Param=################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "Type=0x43 Function=TPMU Param=################"
  params: []

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "Type=0x43 Function=PIPI Param=000000000000000{0|1}"
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0 = Disable PIP, 1 = Enable PIP"

- id: get_pip
  label: Get Picture-in-Picture
  kind: query
  command: "Type=0x45 Function=PIPI Param=################"
  params: []

- id: toggle_pip
  label: Toggle Picture-in-Picture
  kind: action
  command: "Type=0x43 Function=TPIP Param=################"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "Type=0x43 Function=TPPP Param=################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "Type=0x45 Function=BADR Param=eth0##############"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "Type=0x45 Function=MADR Param=eth0##############"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  description: Reply to getPowerStatus; 0=Standby, 1=Active
  values: [0, 1]

- id: audio_volume
  type: integer
  description: Reply to getAudioVolume; volume value left-padded with "0" to 16 chars

- id: audio_mute_state
  type: enum
  description: Reply to getAudioMute; 0=Not Muted, 1=Muted
  values: [0, 1]

- id: channel_preset
  type: string
  description: Reply to getChannel; major.minor preset number (e.g. 00000050.1000000 = 50.1)

- id: channel_triplet
  type: string
  description: Reply to getTripletChannel; hex triplet (e.g. 7FE07FE00400 = 32736.32736.1024)

- id: input_source
  type: string
  description: Reply to getInputSource; one of dvbt/dvbc/dvbs/isdbt/... right-padded with #

- id: current_input
  type: integer
  description: Reply to getInput; byte 13 = kind (0..6), bytes 18..21 = port hex

- id: picture_mute_state
  type: enum
  description: Reply to getPictureMute; 0=Disabled, 1=Enabled
  values: [0, 1]

- id: pip_state
  type: enum
  description: Reply to getPip; 0=Disabled, 1=Enabled
  values: [0, 1]

- id: broadcast_address
  type: string
  description: Reply to getBroadcastAddress; IPv4 dotted-quad right-padded with #

- id: mac_address
  type: string
  description: Reply to getMacAddress; MAC address right-padded with #
```

## Variables
```yaml
# Discrete per-channel enum values for setInput (kind byte at position 13)
- id: input_kind
  type: enum
  description: "Input kind byte for setInput; 0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB"
  values: [0, 1, 2, 3, 4, 5, 6]
```

## Events
```yaml
# Notify (0x4E) messages the TV sends unsolicited; Function FourCC same as the
# matching Control, Parameter payload matches the corresponding get-query reply.
- id: power_change
  type: notify
  command: "Type=0x4E Function=POWR Param=000000000000000{0|1}"
  description: "Sent when TV powers on (1) or off (0)"

- id: channel_change
  type: notify
  command: "Type=0x4E Function=CHNN Param={major:08X}.{minor:07X}"
  description: "Sent when channel change happens"

- id: input_change
  type: notify
  command: "Type=0x4E Function=INPT Param=00000000000{kind}{port:04X}000{port:04X}"
  description: "Sent when input changes (payload matches setInput encoding)"

- id: volume_change
  type: notify
  command: "Type=0x4E Function=VOLU Param={level:016d}"
  description: "Sent when volume changes"

- id: mute_change
  type: notify
  command: "Type=0x4E Function=AMUT Param=000000000000000{0|1}"
  description: "Sent when muting toggles"

- id: pip_change
  type: notify
  command: "Type=0x4E Function=PIPI Param=000000000000000{0|1}"
  description: "Sent when PIP enable state changes"

- id: picture_mute_change
  type: notify
  command: "Type=0x4E Function=PMUT Param=000000000000000{0|1}"
  description: "Sent when picture mute enable state changes"
```

## Macros
```yaml
# UNRESOLVED: source does not describe any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on
# sequencing requirements beyond the menu-enable prerequisite in section 1.
```

## Notes
- Frame is 24 bytes: `0x2A 0x53 [Type 1B] [Function 4 ASCII] [Parameter 16B] 0x0A`. Parameter is always exactly 16 chars; ASCII digits (0–9), letters (A–F for hex), or `#` padding.
- TCP connections are kept across requests but the server closes them after 30 s of client silence.
- `setPowerStatus=1` while already on, or `=0` while already off, returns an Error (`FFFF…`) per Common Parameter Table; success replies are all-zero.
- `setInput` `kind=0` (TV) uses port `0000`; other kinds carry a 1–9999 port number encoded as 4 hex digits in bytes 18–21.
- The source explicitly covers BRAVIA 2014 models; the XF8577 series is a 2018 consumer model. Protocol applicability is reasonable but not stated by this document.
- IRCC codes for ~80 remote functions are listed in Table 5 of the source (Power Off 0000, Volume Up 0030, etc.); the spec exposes them as a single `set_ircc_code` action with a code parameter rather than one action per IR button.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: retry/timeout policy for the 30 s server-side idle disconnect not stated. -->
<!-- UNRESOLVED: error-code sub-fields beyond the all-`F` generic error pattern are not enumerated in the source. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/
retrieved_at: 2026-06-12T04:41:21.268Z
last_checked_at: 2026-06-12T19:52:54.819Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:52:54.819Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literally to source Table 4 commands; transport parameters (TCP/20060, no auth) verified; full coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not list the specific model strings the firmware reports; the KD-* model numbers above are inferred from the consumer XF8577 series naming and not from this protocol document."
- "source does not describe any multi-step sequences."
- "source contains no safety warnings, interlocks, or power-on"
- "firmware version compatibility not stated in source."
- "retry/timeout policy for the 30 s server-side idle disconnect not stated."
- "error-code sub-fields beyond the all-`F` generic error pattern are not enumerated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
