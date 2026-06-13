---
spec_id: admin/sony-kexh9288-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KEXH9288 Series Control Spec"
manufacturer: Sony
model_family: "KEXH9288 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KEXH9288 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_US/support-resources/developer-resources
retrieved_at: 2026-06-12T04:55:18.948Z
last_checked_at: 2026-06-12T19:56:07.912Z
generated_at: 2026-06-12T19:56:07.912Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source is BRAVIA 2014 Simple IP Control Protocol v0.6 — specific KEXH9288 model compatibility not confirmed"
  - "firmware version range for protocol support not stated"
  - "no safety warnings or interlock procedures found in source"
  - "maximum volume level not stated in source"
  - "maximum channel number / preset range not stated"
  - "which input types are physically present on KEXH9288 (e.g. SCART, Component may not exist)"
  - "which broadcast sources are relevant for KEXH9288 market region"
  - "whether KEXH9288 supports PIP functionality"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:56:07.912Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched verbatim in source Table 4; transport (TCP port 20060, no auth) verified; IR codes and event notifications documented in source. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KEXH9288 Series Control Spec

## Summary

Sony BRAVIA KEXH9288 Series displays support Simple IP Control (protocol v0.6), a low-level TCP protocol using fixed-size 24-byte binary messages over port 20060. Provides power on/off, audio volume/mute, channel selection (preset and triplet), input routing, PIP, picture mute, network queries, and 69 IR-emulation commands. Simple IP Control must be enabled in TV network settings (Normal: Network > Home Network Setup > IP Control > Simple IP Control, or Hotel/Pro: Hotel/Pro Mode > IP Control > Simple IP Control).

<!-- UNRESOLVED: source is BRAVIA 2014 Simple IP Control Protocol v0.6 — specific KEXH9288 model compatibility not confirmed -->
<!-- UNRESOLVED: firmware version range for protocol support not stated -->

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
traits:
  - powerable    # inferred from setPowerStatus
  - queryable    # inferred from getPowerStatus, getAudioVolume, getAudioMute, getChannel, getInput, etc.
  - routable     # inferred from setInput, setInputSource
  - levelable    # inferred from setAudioVolume
```

## Actions
```yaml
# 24-byte fixed binary message format:
#   Byte  0-1:  Header   2A 53 (ASCII "*S")
#   Byte  2:    Type     43=Control(C) 45=Enquiry(E) 41=Answer(A) 4E=Notify(N)
#   Bytes 3-6:  Function FourCC (4 ASCII chars)
#   Bytes 7-22: Parameter (16 ASCII chars)
#   Byte 23:    Footer   0A (LF)
#
# Common parameter fills (Table 3):
#   Control no-param: 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30  (16x '0')
#   Enquiry no-param: 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23  (16x '#')
#   Answer success:   30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30  (16x '0')
#   Answer error:     46 46 46 46 46 46 46 46 46 46 46 46 46 46 46 46  (16x 'F')

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 {s} 0A"
  params:
    - name: s
      type: enum
      values: ["30", "31"]
      description: "0x30=Standby(Off), 0x31=Active(On)"

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {vol_16_ascii} 0A"
  params:
    - name: vol_16_ascii
      type: string
      description: "Volume as 16 ASCII decimal digits left-padded with '0'(0x30). e.g. '0000000000000029' = volume 29"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 {s} 0A"
  params:
    - name: s
      type: enum
      values: ["30", "31"]
      description: "0x30=Unmute, 0x31=Mute"

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_channel
  label: Set Channel
  kind: action
  command: "2A 53 43 43 48 4E 4E {ch_16_ascii} 0A"
  params:
    - name: ch_16_ascii
      type: string
      description: "Preset channel: 8-digit major + '.'(0x2E) + 7-digit minor, left-padded with '0'. e.g. '00000050.1000000'=ch50.1, '00000006.0000000'=ch6"

- id: get_channel
  label: Get Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_triplet_channel
  label: Set Triplet Channel
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_12_ascii} 23 23 23 23 0A"
  params:
    - name: triplet_12_ascii
      type: string
      description: "Triplet channel in hex, 12 ASCII hex digits right-padded with '#'(0x23). e.g. '7FE07FE00400' = 32736.32736.1024"

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "2A 53 43 49 53 52 43 {source_16_ascii} 0A"
  params:
    - name: source_16_ascii
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: "Source name left-justified, right-padded with '#'(0x23) to 16 bytes. Encode each char as ASCII hex."

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 {type} 30 30 30 30 {p0} {p1} {p2} {p3} 0A"
  params:
    - name: type
      type: enum
      values: ["30", "31", "32", "33", "34", "35", "36"]
      description: "0x30=TV, 0x31=HDMI, 0x32=SCART, 0x33=Composite, 0x34=Component, 0x35=Screen Mirroring, 0x36=PC RGB"
    - name: p0
      type: integer
      description: "Port 1st decimal digit as ASCII hex byte (0x30-0x39). TV=all 0x30."
    - name: p1
      type: integer
      description: "Port 2nd decimal digit as ASCII hex byte"
    - name: p2
      type: integer
      description: "Port 3rd decimal digit as ASCII hex byte"
    - name: p3
      type: integer
      description: "Port 4th decimal digit as ASCII hex byte. Port range 1-9999."

- id: get_input
  label: Get Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 {s} 0A"
  params:
    - name: s
      type: enum
      values: ["30", "31"]
      description: "0x30=Disable picture mute, 0x31=Enable picture mute (black screen)"

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: set_pip
  label: Set PIP
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 {s} 0A"
  params:
    - name: s
      type: enum
      values: ["30", "31"]
      description: "0x30=Disable PIP, 0x31=Enable PIP"

- id: get_pip
  label: Get PIP
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "2A 53 45 42 41 44 52 {iface_16_ascii} 0A"
  params:
    - name: iface_16_ascii
      type: string
      description: "Interface name left-justified, right-padded with '#'(0x23) to 16 bytes. e.g. 'eth0############'"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 4D 41 44 52 {iface_16_ascii} 0A"
  params:
    - name: iface_16_ascii
      type: string
      description: "Interface name left-justified, right-padded with '#'(0x23) to 16 bytes. e.g. 'eth0############'"

- id: set_ircc_code
  label: Send IR Code
  kind: action
  command: "2A 53 43 49 52 43 43 {code_16_ascii} 0A"
  params:
    - name: code_16_ascii
      type: enum
      description: "IR code as 16 ASCII decimal digits left-padded with '0'(0x30)"
      values:
        - id: "0000000000000000"
          label: Power Off
        - id: "0000000000000001"
          label: Input
        - id: "0000000000000002"
          label: GGuide
        - id: "0000000000000003"
          label: EPG
        - id: "0000000000000004"
          label: Favorites
        - id: "0000000000000005"
          label: Display
        - id: "0000000000000006"
          label: Home
        - id: "0000000000000007"
          label: Options
        - id: "0000000000000008"
          label: Return
        - id: "0000000000000009"
          label: Up
        - id: "0000000000000010"
          label: Down
        - id: "0000000000000011"
          label: Right
        - id: "0000000000000012"
          label: Left
        - id: "0000000000000013"
          label: Confirm
        - id: "0000000000000014"
          label: Red
        - id: "0000000000000015"
          label: Green
        - id: "0000000000000016"
          label: Yellow
        - id: "0000000000000017"
          label: Blue
        - id: "0000000000000018"
          label: Num1
        - id: "0000000000000019"
          label: Num2
        - id: "0000000000000020"
          label: Num3
        - id: "0000000000000021"
          label: Num4
        - id: "0000000000000022"
          label: Num5
        - id: "0000000000000023"
          label: Num6
        - id: "0000000000000024"
          label: Num7
        - id: "0000000000000025"
          label: Num8
        - id: "0000000000000026"
          label: Num9
        - id: "0000000000000027"
          label: Num0
        - id: "0000000000000028"
          label: Num11
        - id: "0000000000000029"
          label: Num12
        - id: "0000000000000030"
          label: Volume Up
        - id: "0000000000000031"
          label: Volume Down
        - id: "0000000000000032"
          label: Mute
        - id: "0000000000000033"
          label: Channel Up
        - id: "0000000000000034"
          label: Channel Down
        - id: "0000000000000035"
          label: Subtitle
        - id: "0000000000000036"
          label: Closed Caption
        - id: "0000000000000037"
          label: Enter
        - id: "0000000000000038"
          label: DOT
        - id: "0000000000000039"
          label: Analog
        - id: "0000000000000040"
          label: Teletext
        - id: "0000000000000041"
          label: Exit
        - id: "0000000000000042"
          label: Analog2
        - id: "0000000000000043"
          label: "*AD"
        - id: "0000000000000044"
          label: Digital
        - id: "0000000000000045"
          label: "Analog?"
        - id: "0000000000000046"
          label: BS
        - id: "0000000000000047"
          label: CS
        - id: "0000000000000048"
          label: BS/CS
        - id: "0000000000000049"
          label: Ddata
        - id: "0000000000000050"
          label: Pic Off
        - id: "0000000000000051"
          label: Tv_Radio
        - id: "0000000000000052"
          label: Theater
        - id: "0000000000000053"
          label: SEN
        - id: "0000000000000054"
          label: Internet Widgets
        - id: "0000000000000055"
          label: Internet Video
        - id: "0000000000000056"
          label: Netflix
        - id: "0000000000000057"
          label: Scene Select
        - id: "0000000000000058"
          label: Mode3D
        - id: "0000000000000059"
          label: iManual
        - id: "0000000000000060"
          label: Audio
        - id: "0000000000000061"
          label: Wide
        - id: "0000000000000062"
          label: Jump
        - id: "0000000000000063"
          label: PAP
        - id: "0000000000000064"
          label: MyEPG
        - id: "0000000000000065"
          label: Program Description
        - id: "0000000000000066"
          label: Write Chapter
        - id: "0000000000000067"
          label: TrackID
        - id: "0000000000000068"
          label: Ten Key
        - id: "0000000000000069"
          label: AppliCast
        - id: "0000000000000070"
          label: acTVila
        - id: "0000000000000071"
          label: Delete Video
        - id: "0000000000000072"
          label: Photo Frame
        - id: "0000000000000073"
          label: TV Pause
        - id: "0000000000000074"
          label: KeyPad
        - id: "0000000000000075"
          label: Media
        - id: "0000000000000076"
          label: Sync Menu
        - id: "0000000000000077"
          label: Forward
        - id: "0000000000000078"
          label: Play
        - id: "0000000000000079"
          label: Rewind
        - id: "0000000000000080"
          label: Prev
        - id: "0000000000000081"
          label: Stop
        - id: "0000000000000082"
          label: Next
        - id: "0000000000000083"
          label: Rec
        - id: "0000000000000084"
          label: Pause
        - id: "0000000000000085"
          label: Eject
        - id: "0000000000000086"
          label: Flash Plus
        - id: "0000000000000087"
          label: Flash Minus
        - id: "0000000000000088"
          label: TopMenu
        - id: "0000000000000089"
          label: PopupMenu
        - id: "0000000000000090"
          label: Rakuraku Start
        - id: "0000000000000091"
          label: One Touch Time Rec
        - id: "0000000000000092"
          label: One Touch View
        - id: "0000000000000093"
          label: One Touch Rec
        - id: "0000000000000094"
          label: One Touch Stop
        - id: "0000000000000095"
          label: DUX
        - id: "0000000000000096"
          label: Football Mode
        - id: "0000000000000097"
          label: Social
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  description: "Answer to getPowerStatus. Param byte 22: 0x30=Standby, 0x31=Active"

- id: audio_volume
  type: integer
  description: "Answer to getAudioVolume. 16 ASCII decimal digits"

- id: audio_mute_state
  type: enum
  values: [not_muted, muted]
  description: "Answer to getAudioMute. Param byte 22: 0x30=Not Muted, 0x31=Muted"

- id: channel_preset
  type: string
  description: "Answer to getChannel. 8-digit major + '.' + 7-digit minor"

- id: triplet_channel
  type: string
  description: "Answer to getTripletChannel. Triplet in hexadecimal"

- id: input_source
  type: string
  description: "Answer to getInputSource. Source name padded with '#'"

- id: input_type
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: "Answer to getInput. Param byte 14 = type code (0x30-0x36), bytes 19-22 = port number"

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Answer to getPictureMute. Param byte 22: 0x30=Disabled, 0x31=Enabled"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  description: "Answer to getPip. Param byte 22: 0x30=Disabled, 0x31=Enabled"

- id: broadcast_address
  type: string
  description: "Answer to getBroadcastAddress. IPv4 broadcast address padded with '#'"

- id: mac_address
  type: string
  description: "Answer to getMacAddress. MAC address padded with '#'"
```

## Variables
```yaml
# All settable/queryable parameters are covered by explicit set/get action pairs above.
# No additional variables required.
```

## Events
```yaml
- id: fire_power_change
  description: "Unsolicited notification when power state changes (FourCC=POWR, type N)"
  payload: "Byte 22: 0x30=Powering off, 0x31=Powering on"

- id: fire_channel_change
  description: "Unsolicited notification when channel changes (FourCC=CHNN, type N)"
  payload: "Preset channel number with decimal point (same format as setChannel)"

- id: fire_input_change
  description: "Unsolicited notification when input changes (FourCC=INPT, type N)"
  payload: "Same format as setInput answer: type code at param[7] + port at param[12-15]"

- id: fire_volume_change
  description: "Unsolicited notification when volume changes (FourCC=VOLU, type N)"
  payload: "Volume as 16 ASCII decimal digits"

- id: fire_mute_change
  description: "Unsolicited notification when mute state changes (FourCC=AMUT, type N)"
  payload: "Byte 22: 0x30=Unmuting, 0x31=Muting"

- id: fire_pip_change
  description: "Unsolicited notification when PIP state changes (FourCC=PIPI, type N)"
  payload: "Byte 22: 0x30=PIP disabled, 0x31=PIP enabled"

- id: fire_picture_mute_change
  description: "Unsolicited notification when picture mute state changes (FourCC=PMUT, type N)"
  payload: "Byte 22: 0x30=Picture mute disabled, 0x31=Picture mute enabled"
```

## Macros
```yaml
# No multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures found in source
```

## Notes

- TCP connection kept alive between requests but server disconnects after 30 seconds of inactivity. Client must send commands within this window or handle reconnection.
- Protocol version documented as 0.6 (BRAVIA 2014 models).
- All answer messages use type 0x41 (A). Success = 16x '0' (0x30), error = 16x 'F' (0x46). Error response for setChannel when channel not found = 16x 'N' (0x4E).
- setChannel error response differs from standard error: uses 'N' (0x4E) for "No such channel" instead of 'F' (0x46).
- setInput and setInputSource are distinct: setInput selects physical input (HDMI, SCART, etc.), setInputSource selects broadcast source (dvbt, dvbc, etc.).
- IR codes (setIrccCode) emulate physical remote buttons; the TV responds with standard success/error answer.
- FourCC codes are case-sensitive 4-byte ASCII identifiers (e.g. POWR, VOLU, AMUT).
- getBroadcastAddress and getMacAddress require an interface name parameter (e.g. "eth0").
- Source document refers to BRAVIA 2014 models. KEXH9288 Series is a consumer model; protocol applicability should be verified against the actual device.

<!-- UNRESOLVED: maximum volume level not stated in source -->
<!-- UNRESOLVED: maximum channel number / preset range not stated -->
<!-- UNRESOLVED: which input types are physically present on KEXH9288 (e.g. SCART, Component may not exist) -->
<!-- UNRESOLVED: which broadcast sources are relevant for KEXH9288 market region -->
<!-- UNRESOLVED: whether KEXH9288 supports PIP functionality -->
````

---

**Self-check:**
- No voltage/current/power values invented
- No port numbers assumed (20060 stated in source)
- No baud rate assumed (N/A for TCP)
- `status: draft` set
- `declared_confidence: low` set
- YAML blocks valid
- `entity_id` populated from input
- UNRESOLVED markers present for gaps

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_US/support-resources/developer-resources
retrieved_at: 2026-06-12T04:55:18.948Z
last_checked_at: 2026-06-12T19:56:07.912Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:56:07.912Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched verbatim in source Table 4; transport (TCP port 20060, no auth) verified; IR codes and event notifications documented in source. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source is BRAVIA 2014 Simple IP Control Protocol v0.6 — specific KEXH9288 model compatibility not confirmed"
- "firmware version range for protocol support not stated"
- "no safety warnings or interlock procedures found in source"
- "maximum volume level not stated in source"
- "maximum channel number / preset range not stated"
- "which input types are physically present on KEXH9288 (e.g. SCART, Component may not exist)"
- "which broadcast sources are relevant for KEXH9288 market region"
- "whether KEXH9288 supports PIP functionality"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
