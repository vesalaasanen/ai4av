---
spec_id: admin/sony-kdxg8305-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXG8305 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: "KDXG8305 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXG8305 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_US/products/professional-displays
retrieved_at: 2026-06-12T04:41:20.437Z
last_checked_at: 2026-06-12T19:52:55.894Z
generated_at: 2026-06-12T19:52:55.894Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document covers \"BRAVIA 2014 models\" generically; KDXG8305 series inclusion inferred from the spec context but not explicitly named in the refined text."
  - "source defines parameters as 16-byte fields with command-specific"
  - "source does not document any device-side macro sequences."
  - "source does not document safety warnings, interlocks, or"
  - "refined source says \"BRAVIA 2014 models\" generically and does not name the KDXG8305 series explicitly — apply with caution and verify against device."
  - "device-side authentication is not described; the protocol's \"Simple IP Control\" name suggests no auth, but real-world deployment may rely on network-level isolation. Treat auth.type: none as inferred."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:52:55.894Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match literal commands in source Table 4; transport parameters verified; notify events represented in spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDXG8305 Series BRAVIA Simple IP Control Spec

## Summary
Sony BRAVIA Simple IP Control Protocol (v0.6) for 2014-era BRAVIA TVs, including the KDXG8305 series. Exposes a 24-byte fixed-frame TCP message format on port 20060 with Four-CC function names for control, enquiry, answer, and notify messages. Covers power, volume, mute, channel, input, picture-mute, PIP, and network address queries, plus an IR-code passthrough for remote-button simulation.

<!-- UNRESOLVED: source document covers "BRAVIA 2014 models" generically; KDXG8305 series inclusion inferred from the spec context but not explicitly named in the refined text. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # Frame format: 24 bytes - 0x2A 0x53 header (bytes 0-1), type (byte 2),
  # four-CC function (bytes 3-6), 16-byte parameter (bytes 7-22), 0x0A footer (byte 23)
auth:
  type: none  # inferred: no auth procedure in source
notes:
  - Server disconnects after 30s of client idle
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / getPowerStatus
- routable        # inferred from setInput / setInputSource commands
- queryable       # inferred from extensive get*/enquiry command set
- levelable       # inferred from setAudioVolume command
```

## Actions
```yaml
# Frame template: 0x2A 0x53 <type> <fourcc> <16-byte param> 0x0A
# Type bytes: 0x43 [C] Control, 0x45 [E] Enquiry, 0x4E [N] Notify
# Command strings below show the four-CC + parameter payload in the
# "byte-position-2 onward" form; full 24-byte framing is implied.

- id: ircc_code
  label: IR-like Code
  kind: action
  command: "0x49 0x52 0x43 0x43 {ircc_hex_2bytes}"  # Function IRCC, param encodes IR code
  params:
    - name: ircc_code
      type: integer
      description: IR code from Table 5 (e.g. 0x0000 Power Off, 0x0030 Volume Up)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "0x50 0x4F 0x57 0x52 {0x00|0x01}"  # POWR, param last byte 00 standby / 01 active
  params:
    - name: state
      type: enum
      values: [standby, active]

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x50 0x4F 0x57 0x52 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23"  # POWR enquiry: param padded with '#' (0x23)
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x56 0x4F 0x4C 0x55 {volume_padded}"  # VOLU, param left-padded decimal volume (16 ASCII digits, e.g. "0000000000000029")
  params:
    - name: volume
      type: integer
      description: Volume value, left-padded with ASCII '0' to 16 chars (e.g. 41 → "0000000000000029")

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x56 0x4F 0x4C 0x55 0x23 x16"  # VOLU enquiry, param '#'-padded
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "0x41 0x4D 0x55 0x54 {0x00|0x01}"  # AMUT, param last byte 00 unmute / 01 mute
  params:
    - name: state
      type: enum
      values: [unmute, mute]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "0x41 0x4D 0x55 0x54 0x23 x16"  # AMUT enquiry, param '#'-padded
  params: []

- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "0x43 0x48 0x4E 0x4E {preset}"  # CHNN, param = preset number (left-zero-padded 8 digits, '.', 7 digits, e.g. "00000050.1000000" = 50.1)
  params:
    - name: preset
      type: string
      description: Channel preset in NNNNNNNN.NNNNNNN form (16 chars total)

- id: get_channel
  label: Get Channel
  kind: query
  command: "0x43 0x48 0x4E 0x4E 0x23 x16"  # CHNN enquiry, param '#'-padded
  params: []

- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "0x54 0x43 0x48 0x4E {triplet_hex_12bytes}"  # TCHN, param = 12 hex bytes (major 4, minor 4, program 4) e.g. "7FE07FE00400"
  params:
    - name: triplet
      type: string
      description: 12 hex chars: 4 major + 4 minor + 4 program

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "0x54 0x43 0x48 0x4E 0x23 x16"  # TCHN enquiry, param '#'-padded
  params: []

- id: set_input_source
  label: Set Input Source (tuner)
  kind: action
  command: "0x49 0x53 0x52 0x43 {source_padded}"  # ISRC, param = tuner source string left-justified, '#'-padded (e.g. "dvbt############")
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "0x49 0x53 0x52 0x43 0x23 x16"  # ISRC enquiry, param '#'-padded
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "0x49 0x4E 0x50 0x54 {input_code}"  # INPT, param encodes input kind + number per Table 4
  params:
    - name: input
      type: string
      description: "Input per Table 4: TV (0x00...00), HDMI 1-9999 (0x00 0x00 0x00 0x01 0x00 0x00 0x00 0x00 NNNN), SCART 1-9999 (byte 7 = 0x02), Composite 1-9999 (0x03), Component 1-9999 (0x04), Screen Mirroring 1-9999 (0x05), PC RGB 1-9999 (0x06)"

- id: get_input
  label: Get Input
  kind: query
  command: "0x49 0x4E 0x50 0x54 0x23 x16"  # INPT enquiry, param '#'-padded
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "0x50 0x4D 0x55 0x54 {0x00|0x01}"  # PMUT, param last byte 00 disable / 01 enable
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "0x50 0x4D 0x55 0x54 0x23 x16"  # PMUT enquiry, param '#'-padded
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x54 0x50 0x4D 0x55 0x23 x16"  # TPMU, param '#'-padded
  params: []

- id: set_pip
  label: Set PIP
  kind: action
  command: "0x50 0x49 0x50 0x49 {0x00|0x01}"  # PIPI, param last byte 00 disable / 01 enable
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_pip
  label: Get PIP
  kind: query
  command: "0x50 0x49 0x50 0x49 0x23 x16"  # PIPI enquiry, param '#'-padded
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "0x54 0x50 0x49 0x50 0x23 x16"  # TPIP, param '#'-padded
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "0x54 0x50 0x50 0x50 0x23 x16"  # TPPP, param '#'-padded
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "0x42 0x41 0x44 0x52 'eth0' 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23"  # BADR, param = interface name 'eth0' left-justified, '#'-padded
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"); pad with '#' to 16 bytes

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x4D 0x41 0x44 0x52 'eth0' 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23 0x23"  # MADR, param = interface name 'eth0' left-justified, '#'-padded
  params:
    - name: interface
      type: string
      description: Interface name (e.g. "eth0"); pad with '#' to 16 bytes
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
- id: audio_volume
  type: integer
  description: Current volume (decimal, as echoed by VOLU answer)
- id: audio_mute
  type: enum
  values: [unmuted, muted]
- id: channel_preset
  type: string
  description: Current preset channel in NNNNNNNN.NNNNNNN form
- id: channel_triplet
  type: string
  description: Current triplet channel (12 hex chars)
- id: input_source_tuner
  type: string
  description: Current tuner source (dvbt/dvbc/...)
- id: input
  type: string
  description: Current input per Table 4 (TV/HDMI 1-9999/SCART/Composite/Component/Screen Mirroring/PC RGB)
- id: picture_mute
  type: enum
  values: [disabled, enabled]
- id: pip
  type: enum
  values: [disabled, enabled]
- id: broadcast_address
  type: string
  description: IPv4 broadcast address (ASCII), '#'-padded
- id: mac_address
  type: string
  description: MAC address (ASCII), '#'-padded
```

## Variables
```yaml
# UNRESOLVED: source defines parameters as 16-byte fields with command-specific
# encoding; no source-documented named settable variables beyond the action
# parameters above. Section retained as placeholder.
```

## Events
```yaml
# Unsolicited N-type (0x4E) notifications. Each carries the same four-CC +
# payload as its corresponding control command, with the type byte = 0x4E.
- id: power_change
  notify_fourcc: POWR
  payload_last_byte: {0x00: power_off, 0x01: power_on}
  description: Sent on power-state change
- id: channel_change
  notify_fourcc: CHNN
  description: Sent on channel change (param = new preset)
- id: input_change
  notify_fourcc: INPT
  payload: per Table 4 INPT encoding
  description: Sent on input change
- id: volume_change
  notify_fourcc: VOLU
  description: Sent on volume change (param = new volume, decimal padded)
- id: mute_change
  notify_fourcc: AMUT
  payload_last_byte: {0x00: unmuted, 0x01: muted}
  description: Sent on mute-state change
- id: pip_change
  notify_fourcc: PIPI
  payload_last_byte: {0x00: disabled, 0x01: enabled}
  description: Sent on PIP-state change
- id: picture_mute_change
  notify_fourcc: PMUT
  payload_last_byte: {0x00: disabled, 0x01: enabled}
  description: Sent on picture-mute change
```

## Macros
```yaml
# UNRESOLVED: source does not document any device-side macro sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or
# power-on sequencing requirements for this protocol.
```

## Notes
- Protocol is the BRAVIA Simple IP Control v0.6, fixed 24-byte frame on TCP/20060. Server disconnects after 30s of client idle; clients should re-establish.
- IP Control must be enabled in the TV's settings (Network > Home Network Setup > IP Control > Simple IP Control, or Hotel/Pro Mode equivalent) before commands are accepted.
- The High Level (HTTP/JSON-RPC) protocol layer is mentioned in §1 as a parallel interface but is not detailed in the supplied source; the WebAPI command catalogue is not reproduced here.
- A `'#'` (0x23) byte in any parameter position means "unspecified / pad"; for enquiry (0x45) the entire 16-byte param is conventionally '#'-padded.
- IR codes 0x00–0x97 are supported via setIrccCode; full mapping is in Table 5 of the source (Power Off=0x00, Volume Up=0x30, Num0–Num9=0x18–0x27, etc.).
- `setInputSource` (ISRC) targets the *tuner* input naming (dvbt/dvbc/...); `setInput` (INPT) targets the *physical input jack* (TV/HDMI/SCART/Composite/Component/Screen Mirroring/PC RGB). They are distinct.

<!-- UNRESOLVED: refined source says "BRAVIA 2014 models" generically and does not name the KDXG8305 series explicitly — apply with caution and verify against device. -->
<!-- UNRESOLVED: device-side authentication is not described; the protocol's "Simple IP Control" name suggests no auth, but real-world deployment may rely on network-level isolation. Treat auth.type: none as inferred. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_US/products/professional-displays
retrieved_at: 2026-06-12T04:41:20.437Z
last_checked_at: 2026-06-12T19:52:55.894Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:52:55.894Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match literal commands in source Table 4; transport parameters verified; notify events represented in spec Events section. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document covers \"BRAVIA 2014 models\" generically; KDXG8305 series inclusion inferred from the spec context but not explicitly named in the refined text."
- "source defines parameters as 16-byte fields with command-specific"
- "source does not document any device-side macro sequences."
- "source does not document safety warnings, interlocks, or"
- "refined source says \"BRAVIA 2014 models\" generically and does not name the KDXG8305 series explicitly — apply with caution and verify against device."
- "device-side authentication is not described; the protocol's \"Simple IP Control\" name suggests no auth, but real-world deployment may rely on network-level isolation. Treat auth.type: none as inferred."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
