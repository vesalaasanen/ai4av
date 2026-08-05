---
spec_id: admin/sony-kjx85-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJX85 Series Control Spec"
manufacturer: Sony
model_family: "Sony KJX85 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KJX85 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-07-22T01:29:16.999Z
last_checked_at: 2026-07-22T07:51:18.218Z
generated_at: 2026-07-22T07:51:18.218Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source identifies protocol for BRAVIA 2014 models, but does not explicitly confirm KJX85 Series compatibility."
  - "no additional non-discrete settable variables documented in source"
  - "no multi-step sequences explicitly documented in source"
  - "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source"
  - "source does not provide exact complete serialized payload notation for every message; command fields preserve documented FourCC and parameter patterns."
  - "source does not state whether Sony KJX85 Series specifically supports this BRAVIA 2014 protocol."
verification:
  verdict: verified
  checked_at: 2026-07-22T07:51:18.218Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 actions matched source FourCC commands one-to-one at spec granularity; transport verified. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# Sony KJX85 Series Control Spec

## Summary
Sony BRAVIA KJX85 Series supports Sony Simple IP Control over TCP using a fixed-size 24-byte message format. The protocol includes control, enquiry, answer, and notify messages, with TCP port 20060 and 30-second idle disconnection.

<!-- UNRESOLVED: source identifies protocol for BRAVIA 2014 models, but does not explicitly confirm KJX85 Series compatibility. -->

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
- powerable  # inferred from setPowerStatus and getPowerStatus
- routable  # inferred from channel and input routing commands
- queryable  # inferred from enquiry commands returning values
- levelable  # inferred from audio volume command
```

## Actions
```yaml
- id: set_ircc_code
  label: Send IR-like remote-control code
  kind: action
  command: "I R C C {ir_code}"
  params:
    - name: ir_code
      type: string
      description: 16-byte IR command parameter from source Table 5

- id: power_off
  label: Power Off
  kind: action
  command: "P O W R 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00"
  params: []

- id: power_on
  label: Power On
  kind: action
  command: "P O W R 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x01"
  params: []

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "P O W R ################"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "V O L U {volume}"
  params:
    - name: volume
      type: string
      description: 16-byte decimal volume value, left-padded with 0

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "V O L U ################"
  params: []

- id: audio_unmute
  label: Audio Unmute
  kind: action
  command: "A M U T 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00"
  params: []

- id: audio_mute
  label: Audio Mute
  kind: action
  command: "A M U T 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x01"
  params: []

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "A M U T ################"
  params: []

- id: set_channel
  label: Set Preset Channel
  kind: action
  command: "C H N N {channel}"
  params:
    - name: channel
      type: string
      description: 16-byte preset channel value, such as 00000050.1000000

- id: get_channel
  label: Get Preset Channel
  kind: query
  command: "C H N N ################"
  params: []

- id: set_triplet_channel
  label: Set Triplet Channel
  kind: action
  command: "T C H N {triplet}"
  params:
    - name: triplet
      type: string
      description: Triplet channel value in hexadecimal

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "T C H N ################"
  params: []

- id: set_input_source
  label: Set TV Input Source
  kind: action
  command: "I S R C {source}"
  params:
    - name: source
      type: string
      description: Source value padded on right with #; documented values include dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, and isdbgt

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "I S R C ################"
  params: []

- id: set_input_tv
  label: Select TV Input
  kind: action
  command: "I N P T 0000000000000000"
  params: []

- id: set_input_hdmi
  label: Select HDMI Input
  kind: action
  command: "I N P T 000000100000{input}"
  params:
    - name: input
      type: integer
      description: HDMI input number, 1-9999

- id: set_input_scart
  label: Select SCART Input
  kind: action
  command: "I N P T 000000200000{input}"
  params:
    - name: input
      type: integer
      description: SCART input number, 1-9999

- id: set_input_composite
  label: Select Composite Input
  kind: action
  command: "I N P T 000000300000{input}"
  params:
    - name: input
      type: integer
      description: Composite input number, 1-9999

- id: set_input_component
  label: Select Component Input
  kind: action
  command: "I N P T 000000400000{input}"
  params:
    - name: input
      type: integer
      description: Component input number, 1-9999

- id: set_input_screen_mirroring
  label: Select Screen Mirroring Input
  kind: action
  command: "I N P T 000000500000{input}"
  params:
    - name: input
      type: integer
      description: Screen Mirroring input number, 1-9999

- id: set_input_pc_rgb
  label: Select PC RGB Input
  kind: action
  command: "I N P T 000000600000{input}"
  params:
    - name: input
      type: integer
      description: PC RGB input number, 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "I N P T ################"
  params: []

- id: picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "P M U T 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00"
  params: []

- id: picture_mute_on
  label: Enable Picture Mute
  kind: action
  command: "P M U T 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x01"
  params: []

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "P M U T ################"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "T P M U ################"
  params: []

- id: pip_off
  label: Disable PIP
  kind: action
  command: "P I P I 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00"
  params: []

- id: pip_on
  label: Enable PIP
  kind: action
  command: "P I P I 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x00 0x01"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "P I P I ################"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "T P I P ################"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "T P P P ################"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "B A D R eth0###########"
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "M A D R eth0###########"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]

- id: audio_volume
  type: string
  description: 16-byte audio volume value

- id: audio_mute_state
  type: enum
  values: [muted, unmuted]

- id: channel
  type: string
  description: Current preset channel number

- id: triplet_channel
  type: string
  description: Current triplet channel number

- id: input_source
  type: string
  description: Current TV input source

- id: input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]

- id: picture_mute_state
  type: enum
  values: [enabled, disabled]

- id: pip_state
  type: enum
  values: [enabled, disabled]

- id: broadcast_address
  type: string
  description: Broadcast IPv4 address

- id: mac_address
  type: string
  description: MAC address
```

## Variables
```yaml
# UNRESOLVED: no additional non-discrete settable variables documented in source
```

## Events
```yaml
- id: power_changed
  type: notification
  command: "P O W R {state}"
  description: Sent when powering on or off

- id: channel_changed
  type: notification
  command: "C H N N {channel}"
  description: Sent when channel changes

- id: input_changed
  type: notification
  command: "I N P T {input}"
  description: Sent when input changes

- id: volume_changed
  type: notification
  command: "V O L U {volume}"
  description: Sent when volume changes

- id: mute_changed
  type: notification
  command: "A M U T {state}"
  description: Sent when muting or unmuting

- id: pip_changed
  type: notification
  command: "P I P I {state}"
  description: Sent when PIP changes

- id: picture_mute_changed
  type: notification
  command: "P M U T {state}"
  description: Sent when picture mute changes
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences explicitly documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements documented in source
```

## Notes
Protocol must be enabled through Network > Home Network Setup > IP Control > Simple IP Control, or through Hotel/Pro Mode > IP Control > Simple IP Control. TCP messages use fixed 24-byte format: header `0x2A 0x53`, one-byte type, four-byte FourCC function, sixteen-byte parameter, footer `0x0A`. Connections remain open between requests and server disconnects after 30 seconds without command.

<!-- UNRESOLVED: source does not provide exact complete serialized payload notation for every message; command fields preserve documented FourCC and parameter patterns. -->
<!-- UNRESOLVED: source does not state whether Sony KJX85 Series specifically supports this BRAVIA 2014 protocol. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-07-22T01:29:16.999Z
last_checked_at: 2026-07-22T07:51:18.218Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T07:51:18.218Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 actions matched source FourCC commands one-to-one at spec granularity; transport verified. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source identifies protocol for BRAVIA 2014 models, but does not explicitly confirm KJX85 Series compatibility."
- "no additional non-discrete settable variables documented in source"
- "no multi-step sequences explicitly documented in source"
- "no safety warnings, interlock procedures, or power-on sequencing requirements documented in source"
- "source does not provide exact complete serialized payload notation for every message; command fields preserve documented FourCC and parameter patterns."
- "source does not state whether Sony KJX85 Series specifically supports this BRAVIA 2014 protocol."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
