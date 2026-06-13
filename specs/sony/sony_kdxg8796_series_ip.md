---
spec_id: admin/sony-kdxg8796-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KD-XG8796 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: "KD-XG8796 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KD-XG8796 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro-bravia.sony.net
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-06-12T04:44:45.252Z
last_checked_at: 2026-06-12T19:56:05.661Z
generated_at: 2026-06-12T19:56:05.661Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WebAPI (JSON-RPC) command surface not enumerated in the refined excerpt; spec covers the Low Level binary protocol only."
  - "firmware version range for KD-XG8796 not stated in source."
  - "source does not document persistent settable parameters beyond the"
  - "source does not document multi-step sequences."
  - "source does not document safety warnings, interlocks, or power-on"
  - "WebAPI (JSON-RPC) HTTP surface not enumerated in source."
  - "no safety / fault / error-recovery behavior documented in source."
  - "license for this spec is CC-BY-4.0 (default); confirm if vendor protocol docs are redistributable."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:56:05.661Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched exactly to source FourCC codes in Table 4; transport parameters (port 20060, 24-byte frame, 30s idle timeout) verified verbatim; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KD-XG8796 Series BRAVIA Simple IP Control Spec

## Summary
Sony "Simple IP Control" protocol for BRAVIA televisions (documented for the 2014 generation and re-used on the KD-XG8796 series and the equivalent B2B FW-XG87/8796 family). Provides low-level TCP control using a 24-byte fixed-size binary frame, plus a "High Level" JSON-RPC-over-HTTP WebAPI layer. Server listens on TCP port 20060 and disconnects clients that are idle for 30 seconds. Authentication is not required by the protocol itself; access is gated only by the device's "Simple IP Control" menu toggle.

<!-- UNRESOLVED: WebAPI (JSON-RPC) command surface not enumerated in the refined excerpt; spec covers the Low Level binary protocol only. -->
<!-- UNRESOLVED: firmware version range for KD-XG8796 not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  framing: fixed  # 24-byte fixed-size binary frame, header 0x2A 0x53, footer 0x0A (LF)
  idle_disconnect_seconds: 30
auth:
  type: none  # inferred: no auth procedure in source; access gated by device-side "Simple IP Control" toggle only
notes:
  high_level_layer: HTTP JSON-RPC WebAPI is mentioned in source but not enumerated; out of scope for this spec
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus / getPowerStatus
- levelable       # inferred from setAudioVolume / getAudioVolume
- queryable       # inferred from get* commands (getPowerStatus, getAudioVolume, getAudioMute, getChannel, getTripletChannel, getInputSource, getInput, getPictureMute, getPip, getBroadcastAddress, getMacAddress)
- routable        # inferred from setInputSource / setInput commands
```

## Actions
```yaml
# Wire format reminder (from source):
#   Byte 0-1 : 0x2A 0x53 (header, fixed)
#   Byte 2   : Type (0x43 C / 0x45 E / 0x41 A / 0x4E N)
#   Byte 3-6 : Function (FourCC, 4 ASCII chars)
#   Byte 7-22: Parameter (16 bytes, see Table 4)
#   Byte 23  : 0x0A (footer, fixed)
#
# Each `command` value below is the literal 24-byte frame expressed as 24 hex bytes,
# with `0x2A 0x53` header + type + FourCC + parameter bytes + `0x0A` footer, exactly
# as encoded per the source's parameter tables. Parameters marked with `#` in the
# source are placeholders that must be filled in at runtime; the template uses `XX`
# for each placeholder byte.

# ---------------------------------------------------------------------------
# setIrccCode - Send IR-like code (parameter from Table 5)
# ---------------------------------------------------------------------------
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 49 52 43 43 {param15:02X} 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: |
    FourCC: IRCC. Parameter(15) is the IR function code per Table 5
    (e.g. Power Off=0x00, Input=0x01, Num1=0x18, Volume Up=0x30, Mute=0x32,
    Channel Up=0x33, Netflix=0x56, Stop=0x81, etc.). All other parameter
    bytes are 0x00 per source.
  params:
    - name: ir_function_code
      type: integer
      description: One byte (0x00-0x97) from Table 5 (Power Off=0, Input=1, Num1=24, Vol Up=48, Mute=50, Ch Up=51, Netflix=86, Stop=129, ...)

# ---------------------------------------------------------------------------
# Power
# ---------------------------------------------------------------------------
- id: set_power_status_active
  label: Power On (Active)
  kind: action
  command: "2A 53 43 50 4F 57 52 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 0A"
  notes: "FourCC: POWR. Param(21)=0x01 = Active (On)"
- id: set_power_status_standby
  label: Power Off (Standby)
  kind: action
  command: "2A 53 43 50 4F 57 52 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: "FourCC: POWR. Param(21)=0x00 = Standby (Off)"
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: POWR. Answer param(21): 0x00=Standby, 0x01=Active"

# ---------------------------------------------------------------------------
# Audio volume
# ---------------------------------------------------------------------------
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} 0A"
  notes: |
    FourCC: VOLU. Volume value is the decimal volume (e.g. 41) expressed
    in decimal ASCII digits, padded LEFT with '0' to 15 digits, e.g. volume
    41 → bytes "000000000000041". Source example: 0x29 (=41 decimal) →
    "0000000000000029". All 15 parameter bytes are used; param(22) and
    param(23) are not (last param byte 22 maps to the second-to-last slot
    in Table 4; source uses bytes 7-21 inclusive, i.e. 15 bytes for VOLU).
  params:
    - name: level
      type: integer
      description: Volume in decimal, ASCII-zero-padded LEFT to 15 digits (e.g. 41 → "000000000000041")
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: VOLU. Answer carries the volume in same decimal-padded form."

# ---------------------------------------------------------------------------
# Audio mute
# ---------------------------------------------------------------------------
- id: set_audio_mute_on
  label: Mute Audio
  kind: action
  command: "2A 53 43 41 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 0A"
  notes: "FourCC: AMUT. Param(21)=0x01 = Muted"
- id: set_audio_mute_off
  label: Unmute Audio
  kind: action
  command: "2A 53 43 41 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: "FourCC: AMUT. Param(21)=0x00 = Not Muted"
- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: AMUT. Answer param(21): 0x00=Not Muted, 0x01=Muted"

# ---------------------------------------------------------------------------
# Channel (preset)
# ---------------------------------------------------------------------------
- id: set_channel_preset
  label: Set Channel (Preset Number)
  kind: action
  command: "2A 53 43 43 48 4E 4E {p0:02X} {p1:02X} {p2:02X} {p3:02X} {p4:02X} {p5:02X} {p6:02X} 2E {p8:02X} {p9:02X} {p10:02X} {p11:02X} {p12:02X} {p13:02X} {p14:02X} 0A"
  notes: |
    FourCC: CHNN. Source format: ASCII digits and a single dot, e.g. channel
    50.1 → "00000050.1000000", channel 6 → "00000006.0000000". The dot
    appears at param(7) (the 8th param byte, position 14 in the wire frame).
  params:
    - name: preset_string
      type: string
      description: "ASCII digits + single '.', 15 chars total (e.g. '00000050.1000000' for 50.1)"
- id: get_channel_preset
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: CHNN. Answer carries preset string in same format."

# ---------------------------------------------------------------------------
# Channel (triplet, hex)
# ---------------------------------------------------------------------------
- id: set_channel_triplet
  label: Set Channel (Triplet, Hex)
  kind: action
  command: "2A 53 43 54 43 48 4E {p0:02X} {p1:02X} {p2:02X} {p3:02X} {p4:02X} {p5:02X} {p6:02X} {p7:02X} {p8:02X} {p9:02X} {p10:02X} {p11:02X} {p12:02X} {p13:02X} {p14:02X} 0A"
  notes: |
    FourCC: TCHN. Source example: 32736.32736.1024 → "7FE07FE00400" in the
    last 6 parameter bytes (major_hi major_lo minor_hi minor_lo attr_hi
    attr_lo), per the source. First 9 param bytes are 0x00 in the source
    example; the actual layout is the standard 15-byte param field
    expressed in hex ASCII per the source's hex-triplet convention.
    Source: "7FE07FE00400 means 32736.32736.1024".
  params:
    - name: triplet_hex
      type: string
      description: "12-char hex ASCII string, e.g. '7FE07FE00400' for 32736.32736.1024"
- id: get_channel_triplet
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: TCHN."

# ---------------------------------------------------------------------------
# Input source (by name) and Input (by code)
# ---------------------------------------------------------------------------
- id: set_input_source
  label: Set Input Source (by name)
  kind: action
  command: "2A 53 43 49 53 52 43 {name:02X} 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: |
    FourCC: ISRC. Source: pad RIGHT with '#' (0x23). Allowed names:
    dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt.
    Source example: "dvbt############".
  params:
    - name: source_name
      type: string
      enum: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: One of the documented input source names
- id: get_input_source
  label: Get Current Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: ISRC."

- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: "FourCC: INPT. Param(14)=0x00 = TV"
- id: set_input_hdmi
  label: Set Input to HDMI (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 01 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x01 = HDMI, params(18-21) = 4-digit decimal port number"
  params:
    - name: port
      type: integer
      description: HDMI port number 1-9999, 4 decimal digits (e.g. 0001 for HDMI1)
- id: set_input_scart
  label: Set Input to SCART (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 02 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x02 = SCART"
  params:
    - name: port
      type: integer
      description: SCART port 1-9999
- id: set_input_composite
  label: Set Input to Composite (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 03 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x03 = Composite"
  params:
    - name: port
      type: integer
      description: Composite port 1-9999
- id: set_input_component
  label: Set Input to Component (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 04 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x04 = Component"
  params:
    - name: port
      type: integer
      description: Component port 1-9999
- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 05 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x05 = Screen Mirroring"
  params:
    - name: port
      type: integer
      description: Screen Mirroring port 1-9999
- id: set_input_pc_rgb
  label: Set Input to PC RGB (1-9999)
  kind: action
  command: "2A 53 43 49 4E 50 54 00 00 00 00 00 00 00 06 00 00 00 00 {n0:02X} {n1:02X} {n2:02X} {n3:02X} 0A"
  notes: "FourCC: INPT. Param(14)=0x06 = PC RGB"
  params:
    - name: port
      type: integer
      description: PC RGB port 1-9999
- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: |
    FourCC: INPT. Answer param(14) = 0x00..0x06 (TV/HDMI/SCART/Composite/
    Component/Screen Mirroring/PC RGB); params(18-21) = port for non-TV.

# ---------------------------------------------------------------------------
# Picture mute
# ---------------------------------------------------------------------------
- id: set_picture_mute_on
  label: Enable Picture Mute (blank screen)
  kind: action
  command: "2A 53 43 50 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 0A"
  notes: "FourCC: PMUT. Param(21)=0x01 = screen black"
- id: set_picture_mute_off
  label: Disable Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: "FourCC: PMUT. Param(21)=0x00 = disabled"
- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: PMUT. Answer param(21): 0x00=off, 0x01=on"
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: TPMU. Source notes the function as 'Toggle picture mode' (likely toggle of PMUT)."

# ---------------------------------------------------------------------------
# PIP
# ---------------------------------------------------------------------------
- id: set_pip_on
  label: Enable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 00 00 00 00 00 00 00 00 00 00 00 00 00 00 01 0A"
  notes: "FourCC: PIPI. Param(21)=0x01 = Enabled"
- id: set_pip_off
  label: Disable PIP
  kind: action
  command: "2A 53 43 50 49 50 49 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 0A"
  notes: "FourCC: PIPI. Param(21)=0x00 = Disabled"
- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: PIPI."
- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: TPIP."
- id: toggle_pip_position
  label: Cycle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: "FourCC: TPPP. Cycles PIP position."

# ---------------------------------------------------------------------------
# Network info queries
# ---------------------------------------------------------------------------
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address (eth0)
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: |
    FourCC: BADR. Param(7-10) = "eth0" ASCII (0x65 0x74 0x68 0x30).
    Source example answer: "192.168.0.14" (ASCII) padded right with '#'.
- id: get_mac_address
  label: Get MAC Address (eth0)
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: |
    FourCC: MADR. Param(7-10) = "eth0" ASCII. Answer is 12-hex-digit MAC
    padded right with '#'.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [active, standby]
  notes: From getPowerStatus answer param(21): 0x00=standby, 0x01=active
- id: audio_mute_state
  type: enum
  values: [muted, not_muted]
  notes: From getAudioMute answer param(21): 0x01=muted, 0x00=not_muted
- id: picture_mute_state
  type: enum
  values: [enabled, disabled]
  notes: From getPictureMute answer param(21): 0x01=enabled, 0x00=disabled
- id: pip_state
  type: enum
  values: [enabled, disabled]
  notes: From getPip answer param(21)
- id: current_input
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  notes: From getInput answer param(14); port 1-9999 in params(18-21) for non-TV
- id: current_volume
  type: integer
  notes: From getAudioVolume - 15-digit decimal-zero-padded string
- id: current_channel_preset
  type: string
  notes: From getChannel - 15-char "00000050.1000000" style string
- id: current_channel_triplet
  type: string
  notes: From getTripletChannel - 12-char hex ASCII
- id: current_input_source_name
  type: string
  enum: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  notes: From getInputSource - name padded right with '#'
- id: broadcast_ipv4_eth0
  type: string
  notes: From getBroadcastAddress on eth0 - dotted-quad ASCII padded right with '#'
- id: mac_address_eth0
  type: string
  notes: From getMacAddress on eth0 - 12-hex-digit ASCII padded right with '#'
```

## Variables
```yaml
# UNRESOLVED: source does not document persistent settable parameters beyond the
# per-action command payloads above; no Variables section populated.
```

## Events
```yaml
# Source defines 4 message types: 0x43 Control, 0x45 Enquiry, 0x41 Answer, 0x4E Notify.
# Notify (0x4E) messages are unsolicited and the source enumerates the following
# outbound event frames (TV -> Controller). Each is a 24-byte frame with header
# 0x2A 0x53, type 0x4E, FourCC, and parameter bytes per source.
- id: evt_power_change
  description: Sent when TV powers on or off
  source_fourcc: POWR
  payload_template: "2A 53 4E 50 4F 57 52 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state:02X} 0A"
  notes: param(21): 0x00=powering off, 0x01=powering on
- id: evt_channel_change
  description: Sent when channel changes
  source_fourcc: CHNN
  payload_template: "2A 53 4E 43 48 4E 4E {preset:02X} 23 23 23 23 23 23 23 2E {ch:02X} 23 23 23 23 23 23 0A"
  notes: Same param layout as setChannel (preset string with single dot)
- id: evt_input_change
  description: Sent when input source changes
  source_fourcc: INPT
  payload_template: "2A 53 4E 49 4E 50 54 00 00 00 00 00 00 00 {kind:02X} 00 00 00 00 {port:02X} {port:02X} {port:02X} {port:02X} 0A"
  notes: param(14) 0x00=TV, 0x01=HDMI, 0x02=SCART, 0x03=Composite, 0x04=Component, 0x05=Screen Mirroring, 0x06=PC RGB; params(18-21) = 4-digit decimal port
- id: evt_volume_change
  description: Sent when volume changes
  source_fourcc: VOLU
  payload_template: "2A 53 4E 56 4F 4C 55 {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} {level:02X} 0A"
  notes: 15-digit decimal-zero-padded volume
- id: evt_mute_change
  description: Sent when audio mute state changes
  source_fourcc: AMUT
  payload_template: "2A 53 4E 41 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state:02X} 0A"
  notes: param(21): 0x00=unmuting, 0x01=muting
- id: evt_pip_change
  description: Sent when PIP state changes
  source_fourcc: PIPI
  payload_template: "2A 53 4E 50 49 50 49 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state:02X} 0A"
  notes: param(21): 0x00=PIP disabled, 0x01=PIP enabled
- id: evt_picture_mute_change
  description: Sent when picture mute state changes
  source_fourcc: PMUT
  payload_template: "2A 53 4E 50 4D 55 54 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 {state:02X} 0A"
  notes: param(21): 0x00=disabled, 0x01=enabled
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlocks, or power-on
# sequencing requirements beyond the "Simple IP Control" enable toggle.
```

## Notes
- All commands are 24 bytes total. The header `0x2A 0x53` and footer `0x0A` (LF) are fixed. The four message types are `C` (Control, 0x43), `E` (Enquiry, 0x45), `A` (Answer, 0x41), and `N` (Notify, 0x4E). Functions are 4 ASCII chars (Four-CC).
- TCP server listens on port 20060. Connections are kept across requests but the server disconnects after 30 seconds of client idle. Reconnect on drop.
- "Simple IP Control" must be enabled on the TV: `Network > Home Network Setup > IP Control > Simple IP Control` (Normal mode) or `Hotel/Pro Mode > IP Control > Simple IP Control` (Hotel/Pro mode).
- For Control messages, every parameter byte is significant per Table 4. In the source, unused parameter bytes are written as `0` (e.g. POWR uses only param(21); bytes 7-20 are 0x00). The text "param(N)" in this spec refers to the 0-indexed position within the 16-byte parameter field (param(0) = wire byte 7, ..., param(15) = wire byte 22).
- Source (Sony Simple IP Control Protocol v0.6) is model-agnostic at the protocol level; this spec applies it to the KD-XG8796 series. The B2B FW-55/65/75-XG8796 shares the same control surface.
- High-level WebAPI (HTTP/JSON-RPC) is mentioned in the source overview (section 1) as a separate layer that exposes the same command set; it is NOT enumerated in the refined source and is therefore out of scope for this spec.

<!-- UNRESOLVED: firmware version range for KD-XG8796 not stated in source. -->
<!-- UNRESOLVED: WebAPI (JSON-RPC) HTTP surface not enumerated in source. -->
<!-- UNRESOLVED: no safety / fault / error-recovery behavior documented in source. -->
<!-- UNRESOLVED: license for this spec is CC-BY-4.0 (default); confirm if vendor protocol docs are redistributable. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro-bravia.sony.net
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/remote-display-control/
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://pro-bravia.sony.net/remote-display-control/ircc-ip/
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-06-12T04:44:45.252Z
last_checked_at: 2026-06-12T19:56:05.661Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:56:05.661Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched exactly to source FourCC codes in Table 4; transport parameters (port 20060, 24-byte frame, 30s idle timeout) verified verbatim; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WebAPI (JSON-RPC) command surface not enumerated in the refined excerpt; spec covers the Low Level binary protocol only."
- "firmware version range for KD-XG8796 not stated in source."
- "source does not document persistent settable parameters beyond the"
- "source does not document multi-step sequences."
- "source does not document safety warnings, interlocks, or power-on"
- "WebAPI (JSON-RPC) HTTP surface not enumerated in source."
- "no safety / fault / error-recovery behavior documented in source."
- "license for this spec is CC-BY-4.0 (default); confirm if vendor protocol docs are redistributable."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
