---
spec_id: admin/sony-kdx8507-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8507 Series (BRAVIA) Simple IP Control Spec"
manufacturer: Sony
model_family: "KDX8507 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX8507 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - "https://pro.sony/ (Sony Pro resource library; the BRAVIA IP control documents for consumer models were historically distributed through the Sony developer/FAQ pages rather than a dedicated developer portal)"
retrieved_at: 2026-06-12T04:35:57.157Z
last_checked_at: 2026-06-12T19:50:55.574Z
generated_at: 2026-06-12T19:50:55.574Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "list any major gaps here"
  - "no continuous settable variables beyond the discrete actions above"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing requirements in source"
  - "fields that could not be determined from the source, with explanation."
  - "firmware version compatibility not stated in source"
  - "no voltage/current/power specs in source"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:50:55.574Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions found with matching four-CC codes, parameters, and transport parameters verified in source Table 4. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDX8507 Series (BRAVIA) Simple IP Control Spec

## Summary
Sony BRAVIA 2014 family Simple IP Control: low-level fixed-size 24-byte TCP frame on port 20060, plus equivalent HTTP/JSON-RPC WebAPI. Frame: header 0x2A 0x53, type byte (C/E/A/N), Four-CC function, 16-byte parameter, footer 0x0A. This spec covers the low-level TCP protocol.

<!-- UNRESOLVED: list any major gaps here -->

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
- powerable       # inferred from setPowerStatus/getPowerStatus
- routable        # inferred from setInputSource/setInput/getInput
- queryable       # inferred from getPowerStatus/getAudioVolume/getAudioMute/getChannel/getInput/getPictureMute/getPip/getBroadcastAddress/getMacAddress
- levelable       # inferred from setAudioVolume/getAudioVolume
```

## Actions
```yaml
# 24-byte TCP frame: 0x2A 0x53 | TYPE(1) | FOURCC(4) | PARAM(16) | 0x0A
# TYPE: 0x43 [C] Control, 0x45 [E] Enquiry, 0x41 [A] Answer, 0x4E [N] Notify
# command template below shows the 24-byte frame with {fourcc} and {param} placeholders.

- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "0x2A 0x53 0x43 IRCC {ircc_code(16 bytes)} 0x0A"  # literal: see Table 5 for codes
  params:
    - name: ircc_code
      type: string
      description: IR code bytes from Table 5 (e.g. Power Off=0x00..00, Volume Up=0x00..0030)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "0x2A 0x53 0x43 POWR 0x00*15+{0|1} 0x0A"
  params:
    - name: state
      type: enum
      values: [standby, active]

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x2A 0x53 0x45 POWR 0x23*16 0x0A"  # 16 bytes of 0x23 ('#') padding per Table 3
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x2A 0x53 0x43 VOLU {volume_padded(16)} 0x0A"  # decimal digits, right/left-padded with '0'
  params:
    - name: volume
      type: integer
      description: Volume value as 16 ASCII decimal digits, left-padded with '0' (e.g. 41 -> 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x2A 0x53 0x45 VOLU 0x23*16 0x0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "0x2A 0x53 0x43 AMUT 0x00*15+{0|1} 0x0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "0x2A 0x53 0x45 AMUT 0x23*16 0x0A"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "0x2A 0x53 0x43 CHNN {major(7)}.{minor(7)}0x0A"  # e.g. 0000050.1000000 = ch 50.1
  params:
    - name: major
      type: integer
      description: Major channel number, 7 ASCII decimal digits, left-padded with '0'
    - name: minor
      type: integer
      description: Minor channel number, 7 ASCII decimal digits, left-padded with '0'

- id: get_channel
  label: Get Channel (Preset)
  kind: query
  command: "0x2A 0x53 0x45 CHNN 0x23*16 0x0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "0x2A 0x53 0x43 TCHN {triplet(16)} 0x0A"  # e.g. 7FE07FE00400
  params:
    - name: triplet
      type: string
      description: 16 hex chars: 4-digit major + 4-digit minor + 4-digit sub (e.g. 7FE07FE00400)

- id: get_triplet_channel
  label: Get Channel (Triplet)
  kind: query
  command: "0x2A 0x53 0x45 TCHN 0x23*16 0x0A"
  params: []

- id: set_input_source
  label: Set Input Source (tuner)
  kind: action
  command: "0x2A 0x53 0x43 ISRC {source_left_padded(16)} 0x0A"  # e.g. dvbt############
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]

- id: get_input_source
  label: Get Input Source (tuner)
  kind: query
  command: "0x2A 0x53 0x45 ISRC 0x23*16 0x0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "0x2A 0x53 0x43 INPT 0x00*8+{kind_byte}+0x00*4+{port_padded(4)} 0x0A"
  params:
    - name: kind
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
    - name: port
      type: integer
      description: 1-9999 for hdmi/scart/composite/component/screen_mirroring/pc_rgb; omit for tv

- id: get_input
  label: Get Input
  kind: query
  command: "0x2A 0x53 0x45 INPT 0x23*16 0x0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 PMUT 0x00*15+{0|1} 0x0A"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "0x2A 0x53 0x45 PMUT 0x23*16 0x0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 TPMU 0x23*16 0x0A"
  params: []

- id: set_pip
  label: Set PIP
  kind: action
  command: "0x2A 0x53 0x43 PIPI 0x00*15+{0|1} 0x0A"
  params:
    - name: state
      type: enum
      values: [disabled, enabled]

- id: get_pip
  label: Get PIP
  kind: query
  command: "0x2A 0x53 0x45 PIPI 0x23*16 0x0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "0x2A 0x53 0x43 TPIP 0x23*16 0x0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "0x2A 0x53 0x43 TPPP 0x23*16 0x0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "0x2A 0x53 0x45 BADR Eth0########## 0x0A"  # 'Eth0' ASCII + 0x23 padding
  params: []

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x2A 0x53 0x45 MADR Eth0########## 0x0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
- id: volume
  type: integer
  description: 16 ASCII decimal digit string
- id: audio_mute
  type: enum
  values: [not_muted, muted]
- id: channel_preset
  type: string
  description: 7-digit major + '.' + 7-digit minor
- id: channel_triplet
  type: string
  description: 16 hex chars
- id: input_source_tuner
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
- id: input
  type: object
  description: { kind: tv|hdmi|scart|composite|component|screen_mirroring|pc_rgb, port: 1-9999 }
- id: picture_mute
  type: enum
  values: [disabled, enabled]
- id: pip
  type: enum
  values: [disabled, enabled]
- id: broadcast_address
  type: string
- id: mac_address
  type: string
```

## Variables
```yaml
# UNRESOLVED: no continuous settable variables beyond the discrete actions above
```

## Events
```yaml
# 24-byte Notify frames (Type 0x4E), TV -> Controller
- id: fire_power_change
  fourcc: POWR
  payload: "0x00*15+{0|1}"  # 0=powering off, 1=powering on
- id: fire_channel_change
  fourcc: CHNN
  payload: "{major(7)}.{minor(7)}0x00"
- id: fire_input_change
  fourcc: INPT
  payload: "0x00*8+{kind_byte}+0x00*4+{port_padded(4)}"
- id: fire_volume_change
  fourcc: VOLU
  payload: "{volume_padded(16)}"
- id: fire_mute_change
  fourcc: AMUT
  payload: "0x00*15+{0|1}"  # 0=unmuting, 1=muting
- id: fire_pip_change
  fourcc: PIPI
  payload: "0x00*15+{0|1}"  # 0=disabled, 1=enabled
- id: fire_picture_mute_change
  fourcc: PMUT
  payload: "0x00*15+{0|1}"  # 0=disabled, 1=enabled
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements in source
```

## Notes
- TCP connections kept among requests; server drops after 30s idle. Client must reconnect.
- Protocol must be enabled in TV menu: Normal Mode (Network > Home Network Setup > IP Control > Simple IP Control) or Hotel/Pro Mode (Hotel/Pro Mode > IP Control > Simple IP Control).
- "Answer with success" = 16 bytes of 0x30 ('0'). "Answer with error" = 16 bytes of 0x46 ('F'). Enquiry/control with no param = 16 bytes of 0x23 ('#').
- setChannel encoding: 7 decimal digits + '.' + 7 decimal digits inside 16-byte field (e.g. 0000050.1000000 = ch 50.1). No such channel -> answer 16 bytes of 0x4E ('N').
- setTripletChannel: 16 hex chars (4+4+4), e.g. 7FE07FE00400 = 32736.32736.1024.
- setInput: byte 8 selects kind (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB); bytes 12-15 hold port (1-9999, right-padded with 0x00). Bytes 0-7 are 0x00*8.
- IRCC table (Table 5) enumerates 100+ IR codes passed as 16-byte param to setIrccCode. Volume Up=0x00..0030, Volume Down=0x00..0031, Mute=0x00..0032, etc.
- High-level WebAPI (HTTP/JSON-RPC) wraps these same commands per source §1; not covered here.

<!-- UNRESOLVED: fields that could not be determined from the source, with explanation. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: no voltage/current/power specs in source -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - "https://pro.sony/ (Sony Pro resource library; the BRAVIA IP control documents for consumer models were historically distributed through the Sony developer/FAQ pages rather than a dedicated developer portal)"
retrieved_at: 2026-06-12T04:35:57.157Z
last_checked_at: 2026-06-12T19:50:55.574Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:50:55.574Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions found with matching four-CC codes, parameters, and transport parameters verified in source Table 4. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "list any major gaps here"
- "no continuous settable variables beyond the discrete actions above"
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing requirements in source"
- "fields that could not be determined from the source, with explanation."
- "firmware version compatibility not stated in source"
- "no voltage/current/power specs in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
