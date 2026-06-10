---
spec_id: admin/sony-kdx8566-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX8566 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: KD-55X8566D
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55X8566D
    - KD-65X8566D
    - KD-75X8566D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:29:51.983Z
last_checked_at: 2026-06-09T07:21:01.384Z
generated_at: 2026-06-09T07:21:01.384Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "protocol is labelled \"Version 0.6\" in the source — no stable protocol version is claimed by Sony and no compatibility matrix across firmware revisions is documented."
  - "explicit min/max not stated in source"
  - "source does not expose any persistent settable scalar that is"
  - "source documents no multi-step sequences. No Macros entries."
  - "source contains no safety warnings, interlocks, or power-on"
  - "firmware version range that supports this protocol not stated in source."
  - "AES key / authentication required for the WebAPI / JSON-RPC path is not in the scope of this spec and not described."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:21:01.384Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match distinct FourCC commands in source Table 4; transport parameters verified; complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-08
---

# Sony KDX8566 Series BRAVIA Simple IP Control Spec

## Summary
This spec covers the Sony Simple IP Control Protocol for the BRAVIA KDX8566 series (KD-55X8566D / KD-65X8566D / KD-75X8566D and other 2014 X85D family models). The protocol runs over a single TCP connection on port 20060 and uses a fixed 24-byte frame: 2-byte header `0x2A 0x53`, a 1-byte type (`C`/`E`/`A`/`N`), a 4-byte FourCC function name, a 16-byte parameter block, and a 1-byte footer `0x0A`. Functions cover power, volume, mute, channel, input source, picture mute, PIP, broadcast/MAC queries, and a large set of IR-emulation codes.

<!-- UNRESOLVED: protocol is labelled "Version 0.6" in the source — no stable protocol version is claimed by Sony and no compatibility matrix across firmware revisions is documented. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # Source: "The server running on BRAVIA listens on TCP port 20060."
auth:
  type: none  # inferred: no auth procedure in source
```

**Frame layout (24 bytes, fixed size):**
```yaml
frame:
  total_bytes: 24
  header:
    bytes: 2
    value: "0x2A 0x53"   # ASCII "*S"
  type:
    byte: 1
    values:
      C: 0x43  # Control, controller → TV
      E: 0x45  # Enquiry, controller → TV
      A: 0x41  # Answer,   TV → controller
      N: 0x4E  # Notify,   TV → controller
  function:
    bytes: 4
    encoding: ASCII FourCC
  parameter:
    bytes: 16
  footer:
    byte: 1
    value: "0x0A"
idle_timeout_seconds: 30   # server disconnects if no command for 30s
```

## Traits
```yaml
- powerable      # inferred from setPowerStatus / getPowerStatus
- queryable      # inferred from getPowerStatus, getAudioVolume, getAudioMute, getChannel, getTripletChannel, getInputSource, getInput, getPictureMute, getPip, getBroadcastAddress, getMacAddress
- routable       # inferred from setInput / setInputSource
- levelable      # inferred from setAudioVolume
```

## Actions
```yaml
# Four-CC commands. Payload format:
#   0x2A 0x53 | <type 0x43/0x45/0x41/0x4E> | <FourCC 4 bytes> | <param 16 bytes> | 0x0A
# The `command` field below shows the FourCC + parameter template (in ASCII
# hex) because a complete frame is always 24 bytes; downstream code must
# pack the full frame (header, type, FourCC, parameter, footer).
# `*` is shown as literal text - substitute the actual ASCII hex bytes for `0x2A 0x53`
# when emitting a wire frame.

# --- Power ---
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "0x2A 0x53 C POWR {00|01}*16 0x0A"
  params:
    - name: state
      type: enum
      values: [standby, active]

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "0x2A 0x53 E POWR ############ 0x0A"
  # Answer parameter: 00..00 = Standby, 00..01 = Active

- id: set_ircc_code
  label: Send IR-like Code (IRCC)
  kind: action
  command: "0x2A 0x53 C IRCC {code_ascii_hex}*16 0x0A"
  # 16-byte param is an ASCII hex string representing the IR code value from Table 5.
  params:
    - name: code
      type: string
      description: 2-byte IR function code in ASCII hex (see IR table)

# --- Audio ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "0x2A 0x53 C VOLU {level_ascii_hex}*16 0x0A"
  params:
    - name: level
      type: integer
      description: "Volume value written in decimal, left-padded with '0' to 16 chars (e.g. 41 → '0000000000000029')"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "0x2A 0x53 E VOLU ############ 0x0A"

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "0x2A 0x53 C AMUT {00|01}*16 0x0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "0x2A 0x53 E AMUT ############ 0x0A"
  # Answer: 00..00 = Not Muted, 00..01 = Muted

# --- Channel ---
- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "0x2A 0x53 C CHNN {NN.NNNNNNNN_ascii_hex}*16 0x0A"
  # e.g. 50.1 → "00000050.1000000", 6 → "00000006.0000000"
  params:
    - name: channel
      type: string
      description: "Preset number as left-padded decimal string, optional '.sub' portion (8.8 ASCII-decimal split with '.')"

- id: get_channel
  label: Get Channel (preset)
  kind: query
  command: "0x2A 0x53 E CHNN ############ 0x0A"

- id: set_triplet_channel
  label: Set Channel (triplet)
  kind: action
  command: "0x2A 0x53 C TCHN {triplet_hex}*16 0x0A"
  # e.g. 32736.32736.1024 → "7FE07FE00400"
  params:
    - name: triplet
      type: string
      description: 6-byte triplet in hexadecimal (major.middle.minor, 2 bytes each)

- id: get_triplet_channel
  label: Get Channel (triplet)
  kind: query
  command: "0x2A 0x53 E TCHN ############ 0x0A"

# --- Input ---
- id: set_input_source
  label: Set TV Input Source
  kind: action
  command: "0x2A 0x53 C ISRC {source}*16 0x0A"
  params:
    - name: source
      type: enum
      description: Tuner source name, right-padded with '#' to 16 chars
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]

- id: get_input_source
  label: Get TV Input Source
  kind: query
  command: "0x2A 0x53 E ISRC ############ 0x0A"

- id: set_input
  label: Set Physical Input
  kind: action
  command: "0x2A 0x53 C INPT {kind}{port}*16 0x0A"
  params:
    - name: kind
      type: enum
      values:
        - { value: 0, label: TV }
        - { value: 1, label: HDMI }
        - { value: 2, label: SCART }
        - { value: 3, label: Composite }
        - { value: 4, label: Component }
        - { value: 5, label: Screen Mirroring }
        - { value: 6, label: PC_RGB }
    - name: port
      type: integer
      description: 1-9999, written as ASCII decimal right-aligned in the last 4 bytes of the parameter

- id: get_input
  label: Get Current Input
  kind: query
  command: "0x2A 0x53 E INPT ############ 0x0A"

# --- Picture ---
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "0x2A 0x53 C PMUT {00|01}*16 0x0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "0x2A 0x53 E PMUT ############ 0x0A"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "0x2A 0x53 C TPMU ############ 0x0A"

# --- PIP ---
- id: set_pip
  label: Set PIP (Picture in Picture)
  kind: action
  command: "0x2A 0x53 C PIPI {00|01}*16 0x0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "0x2A 0x53 E PIPI ############ 0x0A"

- id: toggle_pip
  label: Toggle PIP Status
  kind: action
  command: "0x2A 0x53 C TPIP ############ 0x0A"

- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "0x2A 0x53 C TPPP ############ 0x0A"

# --- Network queries ---
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "0x2A 0x53 E BADR eth0####### 0x0A"
  # Parameter is the interface name "eth0" right-padded with '#'.
  params:
    - name: interface
      type: string
      description: Network interface name (source example uses "eth0"), padded to 16 chars with '#'

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "0x2A 0x53 E MADR eth0####### 0x0A"
  params:
    - name: interface
      type: string
      description: Network interface name (source example uses "eth0"), padded to 16 chars with '#'
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  # source: getPowerStatus / firePowerChange - 00 = Standby, 01 = Active

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  # source: getAudioMute

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  # source: getPictureMute

- id: pip_state
  type: enum
  values: [disabled, enabled]
  # source: getPip

- id: audio_volume
  type: integer
  # source: getAudioVolume - 16-char ASCII decimal, 0..100 implied by remote convention but not explicitly bounded in source
  # UNRESOLVED: explicit min/max not stated in source

- id: current_input_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  # source: getInputSource - right-padded with '#' to 16 bytes

- id: current_input
  type: enum
  values: [TV, HDMI, SCART, Composite, Component, Screen_Mirroring, PC_RGB]
  # source: getInput - first byte 0..6 selects kind; remaining bytes carry 1..9999 port

- id: preset_channel
  type: string
  # source: getChannel - "00000050.1000000" form

- id: triplet_channel
  type: string
  # source: getTripletChannel - "7FE07FE00400" form

- id: broadcast_address
  type: string
  # source: getBroadcastAddress - "192.168.0.14" right-padded with '#'

- id: mac_address
  type: string
  # source: getMacAddress - right-padded with '#'
```

## Events
```yaml
# Notify frames (type = 0x4E) are unsolicited messages sent by the TV.
# Each event has the same 24-byte frame layout as a control frame, with type 'N'.

- id: notify_power_change
  source: POWR
  description: Sent when the TV powers on/off
  payload:
    state:
      type: enum
      values: [standby, active]

- id: notify_channel_change
  source: CHNN
  description: Sent when the channel changes
  payload:
    channel:
      type: string
      description: Preset channel in "00000050.1000000" form

- id: notify_input_change
  source: INPT
  description: Sent when the input changes
  payload:
    kind:
      type: enum
      values: [TV, HDMI, SCART, Composite, Component, Screen_Mirroring, PC_RGB]
    port:
      type: integer
      description: 1-9999, packed in the last 4 bytes of the parameter

- id: notify_volume_change
  source: VOLU
  description: Sent when volume changes
  payload:
    level:
      type: string
      description: 16-char ASCII decimal volume value

- id: notify_mute_change
  source: AMUT
  description: Sent when mute state changes
  payload:
    state:
      type: enum
      values: [unmuted, muted]

- id: notify_pip_change
  source: PIPI
  description: Sent when PIP is enabled/disabled
  payload:
    state:
      type: enum
      values: [disabled, enabled]

- id: notify_picture_mute_change
  source: PMUT
  description: Sent when picture mute is enabled/disabled
  payload:
    state:
      type: enum
      values: [disabled, enabled]
```

## Variables
```yaml
# UNRESOLVED: source does not expose any persistent settable scalar that is
# not already covered by the discrete Actions above. No Variables entries.
```

## Macros
```yaml
# UNRESOLVED: source documents no multi-step sequences. No Macros entries.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on
# sequencing requirements.
```

## Notes
- Protocol is referred to as the "Low Level" protocol; Sony also documents a higher-level JSON-RPC "WebAPI" path over the same TCP listener, but that path is not the subject of this spec.
- Frame is always exactly 24 bytes; padding rules differ per command (zero-pad, ASCII-decimal-pad with leading `'0'`, ASCII-hex-pad, or right-pad with `'#'`).
- Idle connections are dropped by the server after 30 s; clients should reconnect on demand.
- All command identifiers are 4-byte ASCII FourCC values, not hex opcodes. When transmitting, each ASCII character of the FourCC occupies one of the four "function" bytes (e.g. `POWR` → `0x50 0x4F 0x57 0x52`).
- `setIrccCode` exposes ~80 IR remote functions; the full list is reproduced in the refined source document (Table 5) and is not enumerated as separate Actions here because all are delivered through a single `IRCC` FourCC with a varying 2-byte code value.
- Model compatibility is inferred from the protocol doc's "BRAVIA 2014 models" header; the KDX8566 series (X85D / X8566D line) is the named target. Other 2014 BRAVIA models likely share this protocol but the source does not list them explicitly.

<!-- UNRESOLVED: firmware version range that supports this protocol not stated in source. -->
<!-- UNRESOLVED: AES key / authentication required for the WebAPI / JSON-RPC path is not in the scope of this spec and not described. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-08T16:29:51.983Z
last_checked_at: 2026-06-09T07:21:01.384Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:21:01.384Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match distinct FourCC commands in source Table 4; transport parameters verified; complete coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "protocol is labelled \"Version 0.6\" in the source — no stable protocol version is claimed by Sony and no compatibility matrix across firmware revisions is documented."
- "explicit min/max not stated in source"
- "source does not expose any persistent settable scalar that is"
- "source documents no multi-step sequences. No Macros entries."
- "source contains no safety warnings, interlocks, or power-on"
- "firmware version range that supports this protocol not stated in source."
- "AES key / authentication required for the WebAPI / JSON-RPC path is not in the scope of this spec and not described."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
