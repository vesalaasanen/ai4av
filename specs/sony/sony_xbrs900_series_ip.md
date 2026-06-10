---
spec_id: admin/sony-xbrs900-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XBRS900 Series Control Spec"
manufacturer: Sony
model_family: "XBRS900 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "XBRS900 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - github.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://github.com/andrewrabert/sony-bravia-rs232c-documentation
retrieved_at: 2026-06-09T02:07:15.473Z
last_checked_at: 2026-06-09T07:24:24.830Z
generated_at: 2026-06-09T07:24:24.830Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "High-level JSON-RPC/WebAPI surface not detailed here; see Sony WebAPI docs."
  - "source defines no multi-step sequences; only single-command actions."
  - "source contains no safety warnings or interlock procedures."
  - "firmware compatibility, exact XBRS900 firmware version that first shipped this Simple IP Control feature, and any later behaviour changes are not stated in the source."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:24:24.830Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched literally against source FourCC command definitions; transport verified; complete coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony XBRS900 Series Control Spec

## Summary
Sony BRAVIA XBRS900 Series TVs exposing the Simple IP Control Protocol (Sony v0.6). Low-level transport is a fixed 24-byte TCP frame on port 20060; a high-level JSON-RPC/HTTP layer is also defined. This spec covers the low-level FourCC command set and the IR-like codes it carries.

<!-- UNRESOLVED: High-level JSON-RPC/WebAPI surface not detailed here; see Sony WebAPI docs. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes: |
  TCP server runs on BRAVIA; connections kept across requests but
  closed by server after 30s of client idle. Frame is fixed 24 bytes:
  0x2A 0x53 | Type(1) | Function(4 ASCII, Four-CC) | Parameter(16) | 0x0A.
  Type values: 0x43 C Control, 0x45 E Enquiry, 0x41 A Answer, 0x4E N Notify.
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus examples
- routable        # inferred from setInput / setInputSource examples
- queryable       # inferred from get* enquiry examples
- levelable       # inferred from setAudioVolume examples
```

## Actions
```yaml
# Frame helper: 0x2A 0x53 | Type | FourCC(4 ASCII) | Param(16) | 0x0A
# Type = C (0x43) for control, E (0x45) for enquiry, A (0x41) for answer, N (0x4E) for notify
# Param bytes written left-to-right, ASCII digits or pad '0'/'#' as shown in source.

- id: set_ircc_code
  label: Send IR-like code
  kind: action
  command: "2A 53 43 IRCC {code} 0A"  # FourCC IRCC, code padded ASCII per Table 5
  params:
    - name: code
      type: string
      description: Two ASCII hex digits (e.g. "30" Volume Up, "32" Mute) from Table 5

- id: set_power_status_off
  label: Power Off (Standby)
  kind: action
  command: "2A 53 43 POWR 0000000000000000 0A"
  params: []

- id: set_power_status_on
  label: Power On (Active)
  kind: action
  command: "2A 53 43 POWR 0000000000000001 0A"
  params: []

- id: get_power_status
  label: Power Status Query
  kind: query
  command: "2A 53 45 POWR ################ 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU {level} 0A"  # level = 16 ASCII digits, decimal, zero-padded left (e.g. 0000000000000029 = 41)
  params:
    - name: level
      type: string
      description: 16 ASCII decimal digits, zero-padded on the left

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU ################ 0A"
  params: []

- id: set_audio_mute_off
  label: Unmute
  kind: action
  command: "2A 53 43 AMUT 0000000000000000 0A"
  params: []

- id: set_audio_mute_on
  label: Mute
  kind: action
  command: "2A 53 43 AMUT 0000000000000001 0A"
  params: []

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 AMUT ################ 0A"
  params: []

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "2A 53 43 CHNN {major}.{minor} 0A"  # e.g. 00000050.1000000 = ch 50.1
  params:
    - name: major
      type: string
      description: 7 ASCII digits, zero-padded left
    - name: minor
      type: string
      description: 7 ASCII digits, zero-padded left

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 CHNN ################ 0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet, hex)
  kind: action
  command: "2A 53 43 TCHN {triplet} 0A"  # 12 hex digits, e.g. 7FE07FE00400
  params:
    - name: triplet
      type: string
      description: 12 hex digits

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 TCHN ################ 0A"
  params: []

- id: set_input_source
  label: Set TV Input Source (tuner type)
  kind: action
  command: "2A 53 43 ISRC {source} 0A"  # source padded right with '#' to 16 chars, e.g. dvbt############
  params:
    - name: source
      type: string
      description: One of: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 ISRC ################ 0A"
  params: []

- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 INPT 0000000000000000 0A"
  params: []

- id: set_input_hdmi
  label: Set Input to HDMI (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000010000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, HDMI port number 1-9999

- id: set_input_scart
  label: Set Input to SCART (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000020000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, SCART port 1-9999

- id: set_input_composite
  label: Set Input to Composite (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000030000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, Composite port 1-9999

- id: set_input_component
  label: Set Input to Component (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000040000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, Component port 1-9999

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000050000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, Screen Mirroring port 1-9999

- id: set_input_pc_rgb
  label: Set Input to PC RGB (1-9999)
  kind: action
  command: "2A 53 43 INPT 000000060000{nnnn} 0A"
  params:
    - name: nnnn
      type: string
      description: 4 ASCII digits, PC RGB port 1-9999

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT ################ 0A"
  params: []

- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "2A 53 43 PMUT 0000000000000000 0A"
  params: []

- id: set_picture_mute_on
  label: Enable Picture Mute (black screen)
  kind: action
  command: "2A 53 43 PMUT 0000000000000001 0A"
  params: []

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 PMUT ################ 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU ################ 0A"
  params: []

- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "2A 53 43 PIPI 0000000000000000 0A"
  params: []

- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "2A 53 43 PIPI 0000000000000001 0A"
  params: []

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 PIPI ################ 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 TPIP ################ 0A"
  params: []

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 TPPP ################ 0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (interface)
  kind: query
  command: "2A 53 45 BADR eth0############# 0A"
  params: []

- id: get_mac_address
  label: Get MAC Address (interface)
  kind: query
  command: "2A 53 45 MADR eth0############# 0A"
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: POWR Answer, byte 15 = 0 (Standby) or 1 (Active)

- id: audio_volume
  type: integer
  source: VOLU Answer, 16 ASCII decimal digits

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
  source: AMUT Answer, byte 15 = 0 (Not Muted) or 1 (Muted)

- id: current_channel
  type: string
  source: CHNN Answer, ASCII "{major}.{minor}"

- id: current_triplet_channel
  type: string
  source: TCHN Answer, 12 hex digits

- id: current_input_source
  type: string
  source: ISRC Answer, ASCII source name

- id: current_input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: INPT Answer, byte 11 selects family, bytes 12-15 = port number (1-9999)

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: PMUT Answer, byte 15 = 0 (Disabled) or 1 (Enabled)

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: PIPI Answer, byte 15 = 0 (Disabled) or 1 (Enabled)

- id: broadcast_address
  type: string
  source: BADR Answer, ASCII IPv4 padded right with '#'

- id: mac_address
  type: string
  source: MADR Answer, ASCII MAC padded right with '#'
```

## Events
```yaml
- id: power_change
  type: notify
  command: "2A 53 4E POWR {state} 0A"  # 0=powering off, 1=powering on
  source: Type N (0x4E), FourCC POWR

- id: channel_change
  type: notify
  command: "2A 53 4E CHNN {major}.{minor} 0A"
  source: Type N, FourCC CHNN

- id: input_change
  type: notify
  command: "2A 53 4E INPT {value} 0A"  # same encoding as setInput answers
  source: Type N, FourCC INPT

- id: volume_change
  type: notify
  command: "2A 53 4E VOLU {level} 0A"
  source: Type N, FourCC VOLU

- id: mute_change
  type: notify
  command: "2A 53 4E AMUT {state} 0A"  # 0=unmuting, 1=muting
  source: Type N, FourCC AMUT

- id: pip_change
  type: notify
  command: "2A 53 4E PIPI {state} 0A"  # 0=disabled, 1=enabled
  source: Type N, FourCC PIPI

- id: picture_mute_change
  type: notify
  command: "2A 53 4E PMUT {state} 0A"  # 0=disabled, 1=enabled
  source: Type N, FourCC PMUT
```

## Macros
```yaml
# UNRESOLVED: source defines no multi-step sequences; only single-command actions.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings or interlock procedures.
```

## Notes
Frame is fixed 24 bytes: `0x2A 0x53 | Type(1) | Function(4 ASCII, Four-CC) | Parameter(16) | 0x0A`. Server closes idle TCP connections after 30s. The high-level WebAPI (HTTP/JSON-RPC) wraps the same command set; it is out of scope for this spec. `setIrccCode` is the canonical way to emit remote-button presses; codes are listed in source Table 5 (e.g. Power Off = 00, Volume Up = 30, Mute = 32, Channel Up = 33).

<!-- UNRESOLVED: firmware compatibility, exact XBRS900 firmware version that first shipped this Simple IP Control feature, and any later behaviour changes are not stated in the source. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - github.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://github.com/andrewrabert/sony-bravia-rs232c-documentation
retrieved_at: 2026-06-09T02:07:15.473Z
last_checked_at: 2026-06-09T07:24:24.830Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:24:24.830Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched literally against source FourCC command definitions; transport verified; complete coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "High-level JSON-RPC/WebAPI surface not detailed here; see Sony WebAPI docs."
- "source defines no multi-step sequences; only single-command actions."
- "source contains no safety warnings or interlock procedures."
- "firmware compatibility, exact XBRS900 firmware version that first shipped this Simple IP Control feature, and any later behaviour changes are not stated in the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
