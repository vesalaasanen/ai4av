---
spec_id: admin/sony-kjx9305-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KJ-X9305 Series BRAVIA Simple IP Control Spec"
manufacturer: Sony
model_family: KJ-65X9305D
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KJ-65X9305D
    - KJ-55X9305D
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/support
retrieved_at: 2026-06-12T04:48:48.034Z
last_checked_at: 2026-06-12T19:56:08.678Z
generated_at: 2026-06-12T19:56:08.678Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range, high-level JSON-RPC WebAPI details, exact model coverage beyond the X9305D chassis"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlocks, or power-on sequencing requirements stated in source"
  - "firmware version compatibility range, exact model coverage beyond X9305D, high-level WebAPI/JSON-RPC command names, power/voltage specs, authentication (none observed in low-level protocol)"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:56:08.678Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions confirmed against source command table; wire-literal tokens and transport parameters verified; all source commands represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KJ-X9305 Series BRAVIA Simple IP Control Spec

## Summary
IP control specification for the Sony KJ-X9305 BRAVIA series (2014 Pro/B2B display line). Protocol: Sony Simple IP Control on TCP port 20060, 24-byte fixed-size framed messages with a 2-byte header `0x2A 0x53`, 1-byte type (C/E/A/N), 4-byte FourCC function identifier, 16-byte parameter, and 1-byte `0x0A` footer. The TV must have Simple IP Control enabled (Settings > Network > Home Network Setup > IP Control > Simple IP Control, or Hotel/Pro Mode > IP Control > Simple IP Control).

<!-- UNRESOLVED: firmware version compatibility range, high-level JSON-RPC WebAPI details, exact model coverage beyond the X9305D chassis -->

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
# - powerable       (setPowerStatus command present)
# - routable        (setInput/setInputSource present)
# - queryable       (get* commands present)
# - levelable       (setAudioVolume present)
```

## Actions
```yaml
# Sony Simple IP Control, 24-byte frame:
#   [0..1]  Header   0x2A 0x53
#   [2]     Type     0x43 C | 0x45 E | 0x41 A | 0x4E N
#   [3..6]  Function Four-CC ASCII
#   [7..22] Parameter 16 bytes (ASCII hex digits or '#' placeholders)
#   [23]    Footer   0x0A
# Each `command:` below shows the 24-byte template, hex-grouped for clarity.

- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 IRCC XXXXXXXXXXXXXXXX 0A"
  params:
    - name: code
      type: string
      description: IRCC code as 16 ASCII hex digits, right-padded with '0' (e.g. Power Off = 0000000000000000, Volume Up = 0000000000000030). See Feedbacks > ircc_codes.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 POWR 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [standby, active]
      description: 0000000000000000 = Standby, 0000000000000001 = Active

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 POWR ################ 0A"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU XXXXXXXXXXXXXXXX 0A"
  params:
    - name: level
      type: integer
      description: Volume value (0-100), 16-char ASCII decimal, left-padded with '0' (e.g. 41 -> 0000000000000029)

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU ################ 0A"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 AMUT 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [unmute, mute]
      description: 0000000000000000 = Unmute, 0000000000000001 = Mute

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "2A 53 45 AMUT ################ 0A"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 CHNN XXXXXXXX.XXXXXXX 0A"
  params:
    - name: channel
      type: string
      description: Preset number in 8.7 ASCII decimal (e.g. 50.1 -> 00000050.1000000, 6 -> 00000006.0000000)

- id: get_channel
  label: Get Current Preset Channel
  kind: query
  command: "2A 53 45 CHNN ################ 0A"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "2A 53 43 TCHN XXXXXXXXXXXXXXNN 0A"
  params:
    - name: triplet
      type: string
      description: Triplet channel as 16 hex digits (last 4 = major/minor fine detail) e.g. 7FE07FE00400 = 32736.32736.1024

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 TCHN ################ 0A"
  params: []

- id: set_input_source
  label: Set TV Input Source (Tuner)
  kind: action
  command: "2A 53 43 ISRC XXXXXXXXXXXXXXXX 0A"
  params:
    - name: source
      type: enum
      values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
      description: Source string, right-padded with '#' to 16 chars (e.g. 'dvbt############')

- id: get_input_source
  label: Get Current TV Input Source
  kind: query
  command: "2A 53 45 ISRC ################ 0A"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "2A 53 43 INPT 00000000000XXXXX 0A"
  params:
    - name: input
      type: string
      description: '00 = TV; 01xxxx = HDMI(1-9999); 02xxxx = SCART(1-9999); 03xxxx = Composite(1-9999); 04xxxx = Component(1-9999); 05xxxx = Screen Mirroring(1-9999); 06xxxx = PC RGB Input(1-9999). xxxx = port number in ASCII decimal'

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT ################ 0A"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 PMUT 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]
      description: 0000000000000000 = Disable (picture on), 0000000000000001 = Enable (screen black)

- id: get_picture_mute
  label: Get Picture Mute State
  kind: query
  command: "2A 53 45 PMUT ################ 0A"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU ################ 0A"
  params: []

- id: set_pip
  label: Set Picture-in-Picture
  kind: action
  command: "2A 53 43 PIPI 0000000000000000 0A"
  params:
    - name: state
      type: enum
      values: [disable, enable]

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
  label: Get Broadcast IPv4 Address
  kind: query
  command: "2A 53 45 BADR Eth0############ 0A"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. 'Eth0'), right-padded with '#' to 16 chars

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 MADR Eth0############ 0A"
  params:
    - name: interface
      type: string
      description: Interface name (e.g. 'Eth0'), right-padded with '#' to 16 chars
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus answer
  values_raw: ["0...0", "0...1"]

- id: volume_level
  type: integer
  source: getAudioVolume answer
  description: Volume value as 16-char ASCII decimal, left-padded '0'

- id: mute_state
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer
  values_raw: ["0...0", "0...1"]

- id: channel_preset
  type: string
  source: getChannel answer
  description: 8.7 ASCII decimal (e.g. 00000050.1000000)

- id: channel_triplet
  type: string
  source: getTripletChannel answer
  description: 16 hex digits

- id: input_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  source: getInputSource answer

- id: input
  type: string
  source: getInput answer
  values: [TV, HDMI(1-9999), SCART(1-9999), Composite(1-9999), Component(1-9999), ScreenMirroring(1-9999), PCRGB(1-9999)]
  description: 0000000000000000=TV; 0000000001xxxxxx=HDMI; 0000000002xxxxxx=SCART; 0000000003xxxxxx=Composite; 0000000004xxxxxx=Component; 0000000005xxxxxx=ScreenMirroring; 0000000006xxxxxx=PC RGB

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: getPictureMute answer

- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: getPip answer

- id: broadcast_address
  type: string
  source: getBroadcastAddress answer
  description: IPv4 dotted-quad, right-padded with '#' to 16 chars (e.g. 192.168.0.14####)

- id: mac_address
  type: string
  source: getMacAddress answer
  description: MAC address, right-padded with '#' to 16 chars

- id: ircc_codes
  type: table
  description: IR-like code values accepted by setIrccCode (16 hex digits, last byte = code index)
  entries:
    - { name: "Power Off", code: "0000000000000000" }
    - { name: "Input", code: "0000000000000001" }
    - { name: "GGuide", code: "0000000000000002" }
    - { name: "EPG", code: "0000000000000003" }
    - { name: "Favorites", code: "0000000000000004" }
    - { name: "Display", code: "0000000000000005" }
    - { name: "Home", code: "0000000000000006" }
    - { name: "Options", code: "0000000000000007" }
    - { name: "Return", code: "0000000000000008" }
    - { name: "Up", code: "0000000000000009" }
    - { name: "Down", code: "0000000000000010" }
    - { name: "Right", code: "0000000000000011" }
    - { name: "Left", code: "0000000000000012" }
    - { name: "Confirm", code: "0000000000000013" }
    - { name: "Red", code: "0000000000000014" }
    - { name: "Green", code: "0000000000000015" }
    - { name: "Yellow", code: "0000000000000016" }
    - { name: "Blue", code: "0000000000000017" }
    - { name: "Num1", code: "0000000000000018" }
    - { name: "Num2", code: "0000000000000019" }
    - { name: "Num3", code: "0000000000000020" }
    - { name: "Num4", code: "0000000000000021" }
    - { name: "Num5", code: "0000000000000022" }
    - { name: "Num6", code: "0000000000000023" }
    - { name: "Num7", code: "0000000000000024" }
    - { name: "Num8", code: "0000000000000025" }
    - { name: "Num9", code: "0000000000000026" }
    - { name: "Num0", code: "0000000000000027" }
    - { name: "Num11", code: "0000000000000028" }
    - { name: "Num12", code: "0000000000000029" }
    - { name: "Volume Up", code: "0000000000000030" }
    - { name: "Volume Down", code: "0000000000000031" }
    - { name: "Mute", code: "0000000000000032" }
    - { name: "Channel Up", code: "0000000000000033" }
    - { name: "Channel Down", code: "0000000000000034" }
    - { name: "Subtitle", code: "0000000000000035" }
    - { name: "Closed Caption", code: "0000000000000036" }
    - { name: "Enter", code: "0000000000000037" }
    - { name: "DOT", code: "0000000000000038" }
    - { name: "Analog", code: "0000000000000039" }
    - { name: "Teletext", code: "0000000000000040" }
    - { name: "Exit", code: "0000000000000041" }
    - { name: "Analog2", code: "0000000000000042" }
    - { name: "AD", code: "0000000000000043" }
    - { name: "Digital", code: "0000000000000044" }
    - { name: "Analog?", code: "0000000000000045" }
    - { name: "BS", code: "0000000000000046" }
    - { name: "CS", code: "0000000000000047" }
    - { name: "BS/CS", code: "0000000000000048" }
    - { name: "Ddata", code: "0000000000000049" }
    - { name: "Pic Off", code: "0000000000000050" }
    - { name: "Tv_Radio", code: "0000000000000051" }
    - { name: "Theater", code: "0000000000000052" }
    - { name: "SEN", code: "0000000000000053" }
    - { name: "Internet Widgets", code: "0000000000000054" }
    - { name: "Internet Video", code: "0000000000000055" }
    - { name: "Netflix", code: "0000000000000056" }
    - { name: "Scene Select", code: "0000000000000057" }
    - { name: "Mode3D", code: "0000000000000058" }
    - { name: "iManual", code: "0000000000000059" }
    - { name: "Audio", code: "0000000000000060" }
    - { name: "Wide", code: "0000000000000061" }
    - { name: "Jump", code: "0000000000000062" }
    - { name: "PAP", code: "0000000000000063" }
    - { name: "MyEPG", code: "0000000000000064" }
    - { name: "Program Description", code: "0000000000000065" }
    - { name: "Write Chapter", code: "0000000000000066" }
    - { name: "TrackID", code: "0000000000000067" }
    - { name: "Ten Key", code: "0000000000000068" }
    - { name: "AppliCast", code: "0000000000000069" }
    - { name: "acTVila", code: "0000000000000070" }
    - { name: "Delete Video", code: "0000000000000071" }
    - { name: "Photo Frame", code: "0000000000000072" }
    - { name: "TV Pause", code: "0000000000000073" }
    - { name: "KeyPad", code: "0000000000000074" }
    - { name: "Media", code: "0000000000000075" }
    - { name: "Sync Menu", code: "0000000000000076" }
    - { name: "Forward", code: "0000000000000077" }
    - { name: "Play", code: "0000000000000078" }
    - { name: "Rewind", code: "0000000000000079" }
    - { name: "Prev", code: "0000000000000080" }
    - { name: "Stop", code: "0000000000000081" }
    - { name: "Next", code: "0000000000000082" }
    - { name: "Rec", code: "0000000000000083" }
    - { name: "Pause", code: "0000000000000084" }
    - { name: "Eject", code: "0000000000000085" }
    - { name: "Flash Plus", code: "0000000000000086" }
    - { name: "Flash Minus", code: "0000000000000087" }
    - { name: "TopMenu", code: "0000000000000088" }
    - { name: "PopupMenu", code: "0000000000000089" }
    - { name: "Rakuraku Start", code: "0000000000000090" }
    - { name: "One Touch Time Rec", code: "0000000000000091" }
    - { name: "One Touch View", code: "0000000000000092" }
    - { name: "One Touch Rec", code: "0000000000000093" }
    - { name: "One Touch Stop", code: "0000000000000094" }
    - { name: "DUX", code: "0000000000000095" }
    - { name: "Football Mode", code: "0000000000000096" }
    - { name: "Social", code: "0000000000000097" }
```

## Events
```yaml
- id: power_change
  type: enum
  values: [standby, active]
  source: firePowerChange (type N)
  description: 0000000000000000 = powering off, 0000000000000001 = powering on

- id: channel_change
  type: string
  source: fireChannelChange (type N)
  description: 8.7 ASCII decimal preset number

- id: input_change
  type: string
  source: fireInputChange (type N)
  description: 0000000000000000=TV; 0000000001xxxxxx=HDMI; 0000000002xxxxxx=SCART; 0000000003xxxxxx=Composite; 0000000004xxxxxx=Component; 0000000005xxxxxx=ScreenMirroring; 0000000006xxxxxx=PC RGB

- id: volume_change
  type: integer
  source: fireVolumeChange (type N)
  description: New volume value, 16-char ASCII decimal

- id: mute_change
  type: enum
  values: [unmuted, muted]
  source: fireMuteChange (type N)

- id: pip_change
  type: enum
  values: [disabled, enabled]
  source: firePipChange (type N)

- id: picture_mute_change
  type: enum
  values: [disabled, enabled]
  source: firePictureMuteChange (type N)
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-on sequencing requirements stated in source
```

## Notes
- TCP connections are server-terminated after 30 seconds of client inactivity; clients must reconnect or keep sending.
- Parameter field is 16 ASCII characters; placeholders are '0' (control), '#' (enquiry), or 'N' (no-such/error answer), or 'F' (error answer), per Table 3.
- For setInput, the 16-char parameter encodes BOTH the input class (positions 9-10 in the frame) and the port number (positions 13-16) as ASCII decimal; e.g. HDMI 2 = `0000000001000002`.
- Source covers the Low Level Protocol (24-byte frame). The companion High Level Protocol (HTTP + JSON-RPC WebAPI) is referenced but not detailed in this excerpt.
- This protocol is documented for the 2014 BRAVIA line including the X9305D chassis. Compatibility with newer Sony models that use the same Simple IP Control frame is likely but not confirmed by this source.
<!-- UNRESOLVED: firmware version compatibility range, exact model coverage beyond X9305D, high-level WebAPI/JSON-RPC command names, power/voltage specs, authentication (none observed in low-level protocol) -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/support
retrieved_at: 2026-06-12T04:48:48.034Z
last_checked_at: 2026-06-12T19:56:08.678Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:56:08.678Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions confirmed against source command table; wire-literal tokens and transport parameters verified; all source commands represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range, high-level JSON-RPC WebAPI details, exact model coverage beyond the X9305D chassis"
- "no multi-step sequences described in source"
- "no safety warnings, interlocks, or power-on sequencing requirements stated in source"
- "firmware version compatibility range, exact model coverage beyond X9305D, high-level WebAPI/JSON-RPC command names, power/voltage specs, authentication (none observed in low-level protocol)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
