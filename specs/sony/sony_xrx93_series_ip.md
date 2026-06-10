---
spec_id: admin/sony-xrx93-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony XRX93 Series BRAVIA Control Spec"
manufacturer: Sony
model_family: XBR-65XRX93
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - XBR-65XRX93
    - XBR-75XRX93
    - XBR-85XRX93
    - XR-65X93K
    - XR-75X93K
    - XR-85X93K
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
retrieved_at: 2026-06-09T03:05:59.714Z
last_checked_at: 2026-06-09T07:24:26.845Z
generated_at: 2026-06-09T07:24:26.845Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source document is the 2015 \"Simple IP Control Protocol for BRAVIA\" v0.6 PDF, which describes 2014-era BRAVIA models. The XRX93 / X93K series (2021-2022) is assumed to retain the same Simple IP Control protocol but this has not been verified against Sony's first-party documentation."
  - "source does not define persistent settable parameters distinct from the discrete actions above. All \"settings\" in this protocol are exposed only as control commands (e.g. setInput, setChannel). Omit section if not applicable."
  - "source does not document any multi-step sequences. Macros are not part of the Simple IP Control protocol - they would be defined client-side."
  - "source contains no safety warnings, interlocks, or power-on sequencing requirements."
  - "source is a 2015 v0.6 PDF originally for 2014 BRAVIA models. The XRX93 / X93K series (released 2021-2022) is not directly named in the source. Sony's developer portal was permanently shut down 2026-05-08, so a newer first-party protocol document for the XRX93 series could not be located. This spec is presented as a best-effort draft based on the only available Simple IP Control protocol document."
  - "firmware version compatibility not stated in source."
  - "maximum audio volume level not stated in source."
  - "maximum input number per type not stated in source (only the 1-9999 parameter range)."
verification:
  verdict: verified
  checked_at: 2026-06-09T07:24:26.845Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions found verbatim in source command table with matching FourCC codes and parameter structures; transport on TCP port 20060 confirmed. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-09
---

# Sony XRX93 Series BRAVIA Control Spec

## Summary
Sony BRAVIA XRX93 series LCD televisions, controllable over TCP/IP using Sony's
"Simple IP Control" low-level protocol on port 20060. The protocol is a
fixed 24-byte message format with 4-byte ASCII FourCC function identifiers,
supporting power, volume, mute, channel, input, picture-mute, and PIP control,
plus a broad catalogue of IR-like control codes.

<!-- UNRESOLVED: source document is the 2015 "Simple IP Control Protocol for BRAVIA" v0.6 PDF, which describes 2014-era BRAVIA models. The XRX93 / X93K series (2021-2022) is assumed to retain the same Simple IP Control protocol but this has not been verified against Sony's first-party documentation. -->

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
- powerable       # inferred from setPowerStatus / getPowerStatus commands
- levelable       # inferred from setAudioVolume / getAudioVolume commands
- routable        # inferred from setInput / setInputSource / getInput commands
- queryable       # inferred from getPowerStatus, getAudioVolume, getAudioMute, getChannel, getInputSource, getInput, getPictureMute, getPip, getBroadcastAddress, getMacAddress queries
```

## Actions
```yaml
# All messages are 24 fixed bytes on TCP: header 0x2A 0x53, type (0x43 C /
# 0x45 E / 0x41 A / 0x4E N), 4 ASCII function bytes (FourCC), 16 parameter
# bytes, footer 0x0A. Variable parts shown in {braces}.
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 IRCC {p0..p15} 0A"  # FourCC IRCC, parameter from Table 5
  params:
    - name: ir_function
      type: string
      description: IR function name from Table 5 (Power Off, Input, Num0..Num12, Volume Up/Down, Mute, Channel Up/Down, etc.). Source provides decimal code (e.g. Power Off=0, Volume Up=30, Mute=32) which is hex-encoded into the last parameter byte and right-padded with 0x00 to 16 bytes.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 POWR {p0..p15} 0A"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: 0x00 in last param byte = Standby (Off), 0x01 = Active (On). Other 15 bytes 0x00.

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 POWR 0x{16 bytes} 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU {p0..p15} 0A"
  params:
    - name: level
      type: string
      description: ASCII decimal volume value, zero-padded on the LEFT to 16 bytes (e.g. "0000000000000029" for level 29 / hex 0x1D). Source does not state the max level.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU 0x{16 bytes} 0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 AMUT {p0..p15} 0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: 0x00 in last param byte = Unmute, 0x01 = Mute. Other 15 bytes 0x00.

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 AMUT 0x{16 bytes} 0A"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 CHNN {p0..p15} 0A"
  params:
    - name: preset
      type: string
      description: ASCII decimal, left-padded with 0x30 ('0') to 16 bytes. Source example: "00000050.1000000" = channel 50.1, "00000006.0000000" = channel 6. Decimal point is included literally in the parameter.

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 CHNN 0x{16 bytes} 0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "2A 53 43 TCHN {p0..p15} 0A"
  params:
    - name: triplet
      type: string
      description: Three 4-hex-digit (16-bit) values concatenated, right-padded with '#' to 16 bytes. Source example: "7FE07FE00400" = 32736.32736.1024.

- id: get_triplet_channel
  label: Get Current Triplet Channel
  kind: query
  command: "2A 53 45 TCHN 0x{16 bytes} 0A"
  params: []

- id: set_input_source
  label: Set TV Input Source (Tuner)
  kind: action
  command: "2A 53 43 ISRC {p0..p15} 0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: ASCII source name, right-padded with '#' (0x23) to 16 bytes. Source examples: "dvbt############".

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 ISRC 0x{16 bytes} 0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 INPT {p0..p15} 0A"
  params:
    - name: input_type
      type: enum
      values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
      description: Type selector encoded in byte 8 of the 16-byte parameter block: 0x00=TV, 0x01=HDMI(1-9999), 0x02=SCART(1-9999), 0x03=Composite(1-9999), 0x04=Component(1-9999), 0x05=Screen Mirroring(1-9999), 0x06=PC RGB Input(1-9999). The 4 bytes at positions 12-15 carry the input number (1-9999) as ASCII decimal right-padded with 0x00.
    - name: input_number
      type: integer
      description: 1-9999, only applicable when input_type != tv. Encoded in parameter bytes 12-15 as ASCII decimal.

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT 0x{16 bytes} 0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 PMUT {p0..p15} 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: 0x00 in last param byte = Disable picture mute, 0x01 = Make screen black (picture mute). Other 15 bytes 0x00.

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "2A 53 45 PMUT 0x{16 bytes} 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU 0x{16 bytes} 0A"
  params: []

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "2A 53 43 PIPI {p0..p15} 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: 0x00 in last param byte = Disable PIP, 0x01 = Enable PIP. Other 15 bytes 0x00.

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 PIPI 0x{16 bytes} 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 TPIP 0x{16 bytes} 0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 TPPP 0x{16 bytes} 0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 BADR eth0############ 0A"
  params:
    - name: interface
      type: string
      description: Interface name, left-padded with '#' to 16 bytes. Source example: "eth0############" = eth0.

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 MADR eth0############ 0A"
  params:
    - name: interface
      type: string
      description: Interface name, left-padded with '#' to 16 bytes. Source example: "eth0############" = eth0.
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: Reply to getPowerStatus. Last param byte 0x00 = Standby, 0x01 = Active. Other 15 bytes 0x00.

- id: audio_volume
  type: string
  description: Reply to getAudioVolume. ASCII decimal value, right-padded with 0x00 to 16 bytes.

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: Reply to getAudioMute. Last param byte 0x00 = Not Muted, 0x01 = Muted. Other 15 bytes 0x00.

- id: channel_preset
  type: string
  description: Reply to getChannel. ASCII decimal preset channel, right-padded with 0x00 to 16 bytes. Includes a literal '.' separator (e.g. "00000050.1000000").

- id: channel_triplet
  type: string
  description: Reply to getTripletChannel. Three 4-hex-digit values concatenated, right-padded with '#' to 16 bytes.

- id: input_source
  type: string
  description: Reply to getInputSource. ASCII source name, right-padded with '#' to 16 bytes. Values: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt.

- id: current_input
  type: object
  description: Reply to getInput. Byte 8 of params encodes type (0x00=TV, 0x01=HDMI, 0x02=SCART, 0x03=Composite, 0x04=Component, 0x05=Screen Mirroring, 0x06=PC RGB); bytes 12-15 carry the input number (1-9999) as ASCII decimal.

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: Reply to getPictureMute. Last param byte 0x00 = Disabled, 0x01 = Enabled. Other 15 bytes 0x00.

- id: pip_state
  type: enum
  values: [disabled, enabled]
  description: Reply to getPip. Last param byte 0x00 = Disabled, 0x01 = Enabled. Other 15 bytes 0x00.

- id: broadcast_address
  type: string
  description: Reply to getBroadcastAddress. IPv4 address ASCII, right-padded with '#' to 16 bytes. Source example: "192.168.0.14####".

- id: mac_address
  type: string
  description: Reply to getMacAddress. MAC address ASCII, right-padded with '#' to 16 bytes.

- id: control_success
  type: flag
  description: Reply to any control (type 0x43) command. All 16 parameter bytes 0x00 = success; all 0x46 ('F') = error (e.g. invalid parameter).

- id: channel_not_found
  type: flag
  description: Reply to setChannel / setTripletChannel when channel is invalid. All 16 parameter bytes 0x4E ('N').

- id: input_not_found
  type: flag
  description: Reply to setInput when input is not found (e.g. not tuned, no signal). All 16 parameter bytes 0x4E ('N').
```

## Variables
```yaml
# UNRESOLVED: source does not define persistent settable parameters distinct from the discrete actions above. All "settings" in this protocol are exposed only as control commands (e.g. setInput, setChannel). Omit section if not applicable.
```

## Events
```yaml
- id: fire_power_change
  description: Notify (type 0x4E) message with FourCC POWR. Last param byte 0x00 = powering off, 0x01 = powering on. Other 15 bytes 0x00.

- id: fire_channel_change
  description: Notify (type 0x4E) message with FourCC CHNN. Carries the new channel preset as ASCII decimal, right-padded with 0x00 to 16 bytes, with literal '.' separator.

- id: fire_input_change
  description: Notify (type 0x4E) message with FourCC INPT. Same encoding as the getInput answer: byte 8 = input type (0x00=TV, 0x01=HDMI, 0x02=SCART, 0x03=Composite, 0x04=Component, 0x05=Screen Mirroring, 0x06=PC RGB), bytes 12-15 = input number (1-9999) ASCII decimal.

- id: fire_volume_change
  description: Notify (type 0x4E) message with FourCC VOLU. Carries the new volume as ASCII decimal, right-padded with 0x00 to 16 bytes.

- id: fire_mute_change
  description: Notify (type 0x4E) message with FourCC AMUT. Last param byte 0x00 = unmuting, 0x01 = muting. Other 15 bytes 0x00.

- id: fire_pip_change
  description: Notify (type 0x4E) message with FourCC PIPI. Last param byte 0x00 = PIP disabled, 0x01 = PIP enabled. Other 15 bytes 0x00.

- id: fire_picture_mute_change
  description: Notify (type 0x4E) message with FourCC PMUT. Last param byte 0x00 = picture mute disabled, 0x01 = picture mute enabled. Other 15 bytes 0x00.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences. Macros are not part of the Simple IP Control protocol - they would be defined client-side.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlocks, or power-on sequencing requirements.
```

## Notes
The protocol is a 24-byte fixed-size frame on TCP. Every message — control,
enquiry, answer, and notify — has the same layout: header `0x2A 0x53`, type
byte (0x43 Control / 0x45 Enquiry / 0x41 Answer / 0x4E Notify), 4-byte ASCII
function name, 16 parameter bytes, and footer `0x0A`. TCP connections are
kept alive between requests but the server forcibly closes any connection
idle for 30 seconds or more. The protocol must be enabled on the TV via
`Network > Home Network Setup > IP Control > Simple IP Control` (Normal
Mode) or `Hotel/Pro Mode > IP Control > Simple IP Control` (Hotel/Pro Mode).

Numeric parameter values are ASCII-encoded and left-padded with `0x00` (for
commands) or right-padded with `0x00` (for replies). String parameter values
(interface names, source names) are ASCII and right-padded with `0x23` (`#`).
A control success answer is 16 bytes of `0x00`; an error is 16 bytes of
`0x46` (`F`); a "not found" / "no such source" answer is 16 bytes of
`0x4E` (`N`).

Sony's "High Level Protocol" (WebAPI, JSON-RPC over HTTP) is mentioned in
the source overview as a separate, higher-level interface that exposes the
same commands. This spec covers only the Low Level Protocol (TCP,
fixed-byte-stream). The JSON-RPC WebAPI is **not** documented in the
supplied source and is not part of this spec.

The IR-like code table (Table 5) covers 100+ remote control buttons
including Power Off, Input, GGuide, EPG, Favorites, Display, Home,
Options, Return, Up/Down/Left/Right/Confirm, four colored keys, Num0
through Num12, Volume Up/Down, Mute, Channel Up/Down, Subtitle, Closed
Caption, Enter, DOT, Analog/Radio/BS/CS tuner keys, Teletext, Exit,
*AD (audio description), Digital, Ddata, Pic Off, Tv_Radio, Theater,
SEN, Internet Widgets, Internet Video, Netflix, Scene Select, Mode3D,
iManual, Audio, Wide, Jump, PAP, MyEPG, Program Description, Write
Chapter, TrackID, Ten Key, AppliCast, acTVila, Delete Video, Photo
Frame, TV Pause, KeyPad, Media, Sync Menu, transport keys
(Forward/Play/Rewind/Prev/Stop/Next/Rec/Pause/Eject), Flash Plus/Minus,
TopMenu, PopupMenu, Rakuraku Start, One Touch Time Rec/View/Rec/Stop,
DUX, Football Mode, Social. The IR function code is the decimal
"code" column in Table 5, encoded into the last parameter byte of
`setIrccCode` and the other 15 parameter bytes set to 0x00.

The maximum audio volume level is **not** stated in the source. The
"1-9999" range given for HDMI/SCART/Composite/Component/Screen
Mirroring/PC RGB input numbers is the range the source documents; the
TV's actual maximum input count per type is **not** specified.

<!-- UNRESOLVED: source is a 2015 v0.6 PDF originally for 2014 BRAVIA models. The XRX93 / X93K series (released 2021-2022) is not directly named in the source. Sony's developer portal was permanently shut down 2026-05-08, so a newer first-party protocol document for the XRX93 series could not be located. This spec is presented as a best-effort draft based on the only available Simple IP Control protocol document. -->

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

<!-- UNRESOLVED: maximum audio volume level not stated in source. -->

<!-- UNRESOLVED: maximum input number per type not stated in source (only the 1-9999 parameter range). -->

## Provenance

```yaml
source_domains:
  - aca.im
  - applicationmarket.crestron.com
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://applicationmarket.crestron.com/content/Help/Sony/Sony_2014_Bravia_TV_v1_0_Help.pdf
retrieved_at: 2026-06-09T03:05:59.714Z
last_checked_at: 2026-06-09T07:24:26.845Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-09T07:24:26.845Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions found verbatim in source command table with matching FourCC codes and parameter structures; transport on TCP port 20060 confirmed. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source document is the 2015 \"Simple IP Control Protocol for BRAVIA\" v0.6 PDF, which describes 2014-era BRAVIA models. The XRX93 / X93K series (2021-2022) is assumed to retain the same Simple IP Control protocol but this has not been verified against Sony's first-party documentation."
- "source does not define persistent settable parameters distinct from the discrete actions above. All \"settings\" in this protocol are exposed only as control commands (e.g. setInput, setChannel). Omit section if not applicable."
- "source does not document any multi-step sequences. Macros are not part of the Simple IP Control protocol - they would be defined client-side."
- "source contains no safety warnings, interlocks, or power-on sequencing requirements."
- "source is a 2015 v0.6 PDF originally for 2014 BRAVIA models. The XRX93 / X93K series (released 2021-2022) is not directly named in the source. Sony's developer portal was permanently shut down 2026-05-08, so a newer first-party protocol document for the XRX93 series could not be located. This spec is presented as a best-effort draft based on the only available Simple IP Control protocol document."
- "firmware version compatibility not stated in source."
- "maximum audio volume level not stated in source."
- "maximum input number per type not stated in source (only the 1-9999 parameter range)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
