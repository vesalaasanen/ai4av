---
spec_id: admin/sony-kdxe8588-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDXE8588 Series Control Spec"
manufacturer: Sony
model_family: "KDXE8588 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDXE8588 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T17:19:06.633Z
last_checked_at: 2026-06-09T07:21:03.132Z
generated_at: 2026-06-09T07:21:03.132Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source does not state firmware version compatibility, voltage, current, or power specifications"
  - "source documents no persistent settable parameter unrelated to a discrete action"
  - "source documents no multi-step macro sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware version compatibility not stated in source"
  - "voltage, current, or power specifications not stated in source"
  - "high-level HTTP/JSON-RPC WebAPI endpoint paths not detailed in this source revision"
verification:
  verdict: verified
  checked_at: 2026-06-09T07:21:03.132Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched exactly in source; all FourCC codes, frame structure, and transport parameters verified literal. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDXE8588 Series Control Spec

## Summary
BRAVIA 2014 series professional displays (KDXE8588 family) exposing Sony's Simple IP Control protocol over TCP. Low-level transport is a fixed 24-byte frame on TCP port 20060, with an HTTP/JSON-RPC high-level wrapper. This spec covers the low-level TCP wire format and the full command catalogue (Control, Enquiry, Answer, Notify).

<!-- UNRESOLVED: source does not state firmware version compatibility, voltage, current, or power specifications -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes:
  frame_size_bytes: 24
  header_hex: "0x2A 0x53"
  footer_hex: "0x0A"
  idle_disconnect_seconds: 30
```

## Traits
```yaml
powerable: true       # inferred: setPowerStatus / getPowerStatus commands
routable: true        # inferred: setInput / setInputSource commands
queryable: true       # inferred: get* enquiry commands returning state
levelable: true       # inferred: setAudioVolume / getAudioVolume commands
```

## Actions
```yaml
# Low-level frame layout (24 bytes):
#   [0..1]   Header        0x2A 0x53
#   [2]      Type          'C' (0x43) Control | 'E' (0x45) Enquiry | 'A' (0x41) Answer | 'N' (0x4E) Notify
#   [3..6]   Function      FourCC ASCII (e.g. POWR, VOLU, AMUT, CHNN, TCHN, ISRC, INPT, PMUT, PIPI, TPIP, TPPP, BADR, MADR, IRCC)
#   [7..22]  Parameter     16 bytes, ASCII hex digits or ASCII data padded with '#' / '0'
#   [23]     Footer        0x0A (LF)
#
# Each action below is a distinct row in the source command table (Table 4) or IR table (Table 5).

- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "0x2A 0x53 0x43 IRCC {ircc_hex_16chars} 0x0A"  # 24-byte frame, type C, function IRCC, 16-hex-digit param
  params:
    - name: ircc_hex
      type: string
      description: 16-character hex IR code from Table 5 (e.g. "0000000000000000" for Power Off, "0000000000000030" for Volume Up)

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "0x2A 0x53 0x43 POWR {power_hex_16chars} 0x0A"
  params:
    - name: power
      type: enum
      values: [standby, active]
      description: "00..0 = Standby (Off), 00..01 = Active (On) - 16 hex chars total, last digit carries state"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x2A 0x53 0x45 POWR {param_16chars} 0x0A"  # type E (Enquiry); parameter bytes filled with '########' / hex placeholder
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x2A 0x53 0x43 VOLU {volume_hex_16chars} 0x0A"
  params:
    - name: volume
      type: integer
      description: Volume value left-padded with '0' to 16 hex chars (e.g. volume 41 → "0000000000000029")

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x2A 0x53 0x45 VOLU {param_16chars} 0x0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "0x2A 0x53 0x43 AMUT {mute_hex_16chars} 0x0A"
  params:
    - name: mute
      type: enum
      values: [unmute, mute]
      description: "00..0 = Unmute, 00..01 = Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "0x2A 0x53 0x45 AMUT {param_16chars} 0x0A"
  params: []

- id: set_channel
  label: Set Channel (Preset Number)
  kind: action
  command: "0x2A 0x53 0x43 CHNN {channel_hex_16chars} 0x0A"
  params:
    - name: channel
      type: string
      description: Preset channel as 8 + '.' + 7 hex digits (e.g. "00000050.1000000" = channel 50.1, "00000006.0000000" = channel 6)

- id: get_channel
  label: Get Channel (Preset Number)
  kind: query
  command: "0x2A 0x53 0x45 CHNN {param_16chars} 0x0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet Hex)
  kind: action
  command: "0x2A 0x53 0x43 TCHN {triplet_hex_16chars} 0x0A"
  params:
    - name: triplet
      type: string
      description: 12 hex digits in 3 groups of 4 (e.g. "7FE07FE00400" = 32736.32736.1024)

- id: get_triplet_channel
  label: Get Channel (Triplet Hex)
  kind: query
  command: "0x2A 0x53 0x45 TCHN {param_16chars} 0x0A"
  params: []

- id: set_input_source
  label: Set TV Input Source
  kind: action
  command: "0x2A 0x53 0x43 ISRC {source_ascii_16chars} 0x0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: Source name ASCII, padded right with '#' to 16 chars (e.g. "dvbt############")

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "0x2A 0x53 0x45 ISRC {param_16chars} 0x0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "0x2A 0x53 0x43 INPT {input_hex_16chars} 0x0A"
  params:
    - name: input_type
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
      description: First hex nibble groups: 0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB
    - name: input_number
      type: integer
      description: Per-type instance number 1..9999, encoded in trailing hex digits (full 16-char param layout per source Table 4)

- id: get_input
  label: Get Input
  kind: query
  command: "0x2A 0x53 0x45 INPT {param_16chars} 0x0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 PMUT {pmut_hex_16chars} 0x0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: "00..0 = Disable, 00..01 = Enable (black screen)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "0x2A 0x53 0x45 PMUT {param_16chars} 0x0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x2A 0x53 0x43 TPMU {param_16chars} 0x0A"
  params: []

- id: set_pip
  label: Set PIP (Picture in Picture)
  kind: action
  command: "0x2A 0x53 0x43 PIPI {pip_hex_16chars} 0x0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "0x2A 0x53 0x45 PIPI {param_16chars} 0x0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "0x2A 0x53 0x43 TPIP {param_16chars} 0x0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "0x2A 0x53 0x43 TPPP {param_16chars} 0x0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "0x2A 0x53 0x45 BADR Eth0{param_15chars} 0x0A"  # function 'BADR', param "Eth0###########"
  params:
    - name: interface
      type: string
      description: Interface name (source example uses "Eth0")

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x2A 0x53 0x45 MADR Eth0{param_15chars} 0x0A"
  params:
    - name: interface
      type: string
      description: Interface name (source example uses "Eth0")
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: "Answer on POWR: 00..0 = Standby, 00..01 = Active"

- id: audio_volume
  type: integer
  source: "Answer on VOLU: volume value in 16-hex-char field"

- id: audio_mute
  type: enum
  values: [not_muted, muted]
  source: "Answer on AMUT: 00..0 = Not Muted, 00..01 = Muted"

- id: channel_preset
  type: string
  source: "Answer on CHNN: 8 hex digits + '.' + 7 hex digits"

- id: channel_triplet
  type: string
  source: "Answer on TCHN: 12 hex digits"

- id: input_source_tuner
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  source: "Answer on ISRC: source name padded with '#'"

- id: input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  source: "Answer on INPT: 0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB"

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source: "Answer on PMUT: 00..0 = Disabled, 00..01 = Enabled"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: "Answer on PIPI: 00..0 = Disabled, 00..01 = Enabled"

- id: broadcast_address
  type: string
  source: "Answer on BADR: IPv4 dotted-quad padded with '#' (e.g. 192.168.0.14####)"

- id: mac_address
  type: string
  source: "Answer on MADR: MAC address padded with '#'"
```

## Events
```yaml
# All events are unsolicited Notify frames (type 'N'). Wire shape:
#   0x2A 0x53 0x4E {FourCC} {param 16 bytes} 0x0A

- id: power_change
  type: notify
  command: "0x2A 0x53 0x4E POWR {param_16chars} 0x0A"
  payload_meaning: "00..0 = power off, 00..01 = power on"
  source: "Table 4 row firePowerChange"

- id: channel_change
  type: notify
  command: "0x2A 0x53 0x4E CHNN {param_16chars} 0x0A"
  payload_meaning: "Preset channel number (8 + '.' + 7 hex digits)"
  source: "Table 4 row fireChannelChange"

- id: input_change
  type: notify
  command: "0x2A 0x53 0x4E INPT {param_16chars} 0x0A"
  payload_meaning: "0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB"
  source: "Table 4 row fireInputChange"

- id: volume_change
  type: notify
  command: "0x2A 0x53 0x4E VOLU {param_16chars} 0x0A"
  payload_meaning: "Volume value in 16-hex-char field"
  source: "Table 4 row fireVolumeChange"

- id: mute_change
  type: notify
  command: "0x2A 0x53 0x4E AMUT {param_16chars} 0x0A"
  payload_meaning: "00..0 = unmuting, 00..01 = muting"
  source: "Table 4 row fireMuteChange"

- id: pip_change
  type: notify
  command: "0x2A 0x53 0x4E PIPI {param_16chars} 0x0A"
  payload_meaning: "00..0 = PIP disabled, 00..01 = PIP enabled"
  source: "Table 4 row firePipChange"

- id: picture_mute_change
  type: notify
  command: "0x2A 0x53 0x4E PMUT {param_16chars} 0x0A"
  payload_meaning: "00..0 = picture mute disabled, 00..01 = picture mute enabled"
  source: "Table 4 row firePictureMuteChange"
```

## Variables
```yaml
# UNRESOLVED: source documents no persistent settable parameter unrelated to a discrete action
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
Protocol is a fixed 24-byte frame: `0x2A 0x53` header, type byte (`C`/`E`/`A`/`N`), 4-char FourCC function code, 16-byte parameter field, `0x0A` footer. Parameter encoding is per-table: hex digits left/right padded with `0` or `#` depending on the row. Server closes idle TCP connections after 30s. Enable protocol via Settings → Network → Home Network Setup → IP Control → Simple IP Control (Normal Mode) or Hotel/Pro Mode → IP Control → Simple IP Control. High-level protocol (HTTP/JSON-RPC) wraps the same commands but is not detailed in this revision.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage, current, or power specifications not stated in source -->
<!-- UNRESOLVED: high-level HTTP/JSON-RPC WebAPI endpoint paths not detailed in this source revision -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T17:19:06.633Z
last_checked_at: 2026-06-09T07:21:03.132Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:21:03.132Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched exactly in source; all FourCC codes, frame structure, and transport parameters verified literal. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source does not state firmware version compatibility, voltage, current, or power specifications"
- "source documents no persistent settable parameter unrelated to a discrete action"
- "source documents no multi-step macro sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware version compatibility not stated in source"
- "voltage, current, or power specifications not stated in source"
- "high-level HTTP/JSON-RPC WebAPI endpoint paths not detailed in this source revision"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
