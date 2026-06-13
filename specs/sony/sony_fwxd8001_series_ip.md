---
spec_id: admin/sony-fwxd8001-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony FWXD8001 Series Simple IP Control Spec"
manufacturer: Sony
model_family: "Sony BRAVIA 2014 models (Simple IP Control)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony BRAVIA 2014 models (Simple IP Control)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/products/pro-displays/fw-49xd8001
retrieved_at: 2026-06-12T04:25:06.565Z
last_checked_at: 2026-06-12T19:44:59.438Z
generated_at: 2026-06-12T19:44:59.438Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "spec is tied to \"BRAVIA 2014 models\" generically; FWXD8001-specific applicability and any model deltas not stated."
  - "source covers \"BRAVIA 2014 models\" generically; FWXD8001-specific behavior, firmware version, and any deltas vs. broader 2014 line not stated."
  - "Error-answer semantics — source describes error replies with parameter filled with 'F' bytes but does not enumerate error codes."
  - "Source describes a \"High Level Protocol\" layer (HTTP + JSON-RPC) as a bridge to this Low Level Protocol but does not document its endpoint, methods, or JSON shapes in this document."
verification:
  verdict: verified
  checked_at: 2026-06-12T19:44:59.438Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions matched verbatim to source Table 4 commands; transport parameters verified; full protocol coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony FWXD8001 Series Control Spec

## Summary
Simple IP Control protocol for Sony BRAVIA 2014 displays, providing low-level TCP control via 24-byte fixed frames using FourCC function codes. Each frame has a 2-byte header (`0x2A 0x53`), 1-byte type (C/E/A/N), 4-byte function, 16-byte parameter, 1-byte footer (`0x0A`). Server listens on TCP port 20060 and disconnects idle clients after 30s.

<!-- UNRESOLVED: spec is tied to "BRAVIA 2014 models" generically; FWXD8001-specific applicability and any model deltas not stated. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  framing:
    header: "0x2A 0x53"        # 2 bytes, fixed
    type_byte_offset: 2        # C=0x43, E=0x45, A=0x41, N=0x4E
    function_offset: 3         # 4 bytes, FourCC ASCII
    function_length: 4
    parameter_offset: 7        # 16 bytes
    parameter_length: 16
    footer: "0x0A"             # 1 byte, LF, fixed
    total_length: 24
  idle_timeout_seconds: 30     # server disconnects after 30s of no commands
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus/getPowerStatus/firePowerChange
- routable        # inferred from setInputSource/getInputSource/setInput
- queryable       # inferred from getPowerStatus/getAudioVolume/getAudioMute/getChannel/getInputSource/getInput/getPictureMute/getPip/getBroadcastAddress/getMacAddress
- levelable       # inferred from setAudioVolume/getAudioVolume
```

## Actions
```yaml
# Note: every action uses the 24-byte frame. The `command` field below encodes
# the FourCC function (ASCII 4 bytes) for the type that triggers the operation,
# plus a 16-char ASCII-hex parameter template where applicable.
# Type byte prefix: C=0x43 (control), E=0x45 (enquiry), A=0x41 (answer), N=0x4E (notify)
# Full on-wire form: "2A 53 {type} {fourcc} {16-byte param} 0A"

# --- Power ---
- id: set_power_status_off
  label: Set Power Status (Standby)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  notes: Type=C, FourCC=POWR, parameter=16 ASCII '0' (Standby/Off)

- id: set_power_status_on
  label: Set Power Status (Active)
  kind: action
  command: "2A 53 43 50 4F 57 52 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  notes: Type=C, FourCC=POWR, parameter=16 ASCII '0' + '1' (Active/On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=POWR, parameter=16 ASCII '#'

# --- Audio Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 56 4F 4C 55 {volume_hex_4B} 0A"
  params:
    - name: volume
      type: integer
      description: Volume value (decimal), left-padded to 4 chars with '0'. e.g. 29 → "0029", encoded as ASCII into 4 of the 16 parameter bytes; remaining 12 bytes are ASCII '0'.
  notes: Type=C, FourCC=VOLU. Example given: 0000000000000029 = volume 29.

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=VOLU, parameter=16 '#'. Answer carries volume value.

# --- Audio Mute ---
- id: set_audio_mute_off
  label: Set Audio Mute (Unmute)
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  notes: Type=C, FourCC=AMUT, parameter=16 '0' = Unmute

- id: set_audio_mute_on
  label: Set Audio Mute (Mute)
  kind: action
  command: "2A 53 43 41 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  notes: Type=C, FourCC=AMUT, parameter=16th byte = '1' = Mute

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=AMUT, parameter=16 '#'

# --- Channel (preset) ---
- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "2A 53 43 43 48 4E 4E {channel_pad_15} 0A"
  params:
    - name: channel
      type: string
      description: Channel in form "00000050.1000000" style - 7 digits, dot, 7 digits, right-padded with '0' to 15 chars total.
  notes: Type=C, FourCC=CHNN. Example: 00000050.1000000 = channel 50.1; 00000006.0000000 = channel 6.

- id: get_channel
  label: Get Channel
  kind: query
  command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=CHNN

# --- Triplet Channel ---
- id: set_triplet_channel
  label: Set Triplet Channel
  kind: action
  command: "2A 53 43 54 43 48 4E {triplet_hex_12} 0A"
  params:
    - name: triplet
      type: string
      description: 12 hex chars (6 bytes) representing triplet - 3 × 16-bit major/minor values. Example: "7FE07FE00400" = 32736.32736.1024.
  notes: Type=C, FourCC=TCHN, parameter bytes 4..15 carry the 12 hex chars; bytes 16..22 are '#'.

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=TCHN

# --- Input Source (tuner type) ---
- id: set_input_source
  label: Set Input Source (Tuner)
  kind: action
  command: "2A 53 43 49 53 52 43 {source_padded_16} 0A"
  params:
    - name: source
      type: string
      description: One of dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt. Right-padded with '#' to 16 bytes.
  notes: Type=C, FourCC=ISRC. Example: "dvbt############".

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=ISRC

# --- Input (HDMI/SCART/Composite/Component/ScreenMirror/PC) ---
- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  notes: Type=C, FourCC=INPT, parameter=16 '0' = TV

- id: set_input_hdmi
  label: Set Input to HDMI
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 31 30 30 30 30 {hdmi_num_padded_4} 0A"
  params:
    - name: hdmi_number
      type: integer
      description: HDMI input number 1..9999, right-padded with '0' to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 of parameter = '1', bytes 16..19 = HDMI number padded.

- id: set_input_scart
  label: Set Input to SCART
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 32 30 30 30 30 {scart_num_padded_4} 0A"
  params:
    - name: scart_number
      type: integer
      description: SCART input number 1..9999, right-padded with '0' to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 = '2'.

- id: set_input_composite
  label: Set Input to Composite
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 33 30 30 30 30 {composite_num_padded_4} 0A"
  params:
    - name: composite_number
      type: integer
      description: Composite input number 1..9999, padded to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 = '3'.

- id: set_input_component
  label: Set Input to Component
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 34 30 30 30 30 {component_num_padded_4} 0A"
  params:
    - name: component_number
      type: integer
      description: Component input number 1..9999, padded to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 = '4'.

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 35 30 30 30 30 {sm_num_padded_4} 0A"
  params:
    - name: sm_number
      type: integer
      description: Screen Mirroring input number 1..9999, padded to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 = '5'.

- id: set_input_pc_rgb
  label: Set Input to PC RGB
  kind: action
  command: "2A 53 43 49 4E 50 54 30 30 30 30 30 30 30 36 30 30 30 30 {pc_num_padded_4} 0A"
  params:
    - name: pc_number
      type: integer
      description: PC RGB input number 1..9999, padded to 4 ASCII chars in last 4 parameter bytes.
  notes: Type=C, FourCC=INPT. Byte 12 = '6'.

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=INPT. Answer: byte 12 selects type (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB); last 4 bytes carry number.

# --- Picture Mute ---
- id: set_picture_mute_off
  label: Set Picture Mute (Disabled)
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  notes: Type=C, FourCC=PMUT, parameter=16 '0' = Disabled

- id: set_picture_mute_on
  label: Set Picture Mute (Enabled)
  kind: action
  command: "2A 53 43 50 4D 55 54 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  notes: Type=C, FourCC=PMUT, parameter byte 16 = '1' = Enabled

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "2A 53 45 50 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=PMUT

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 54 50 4D 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=C, FourCC=TPMU, parameter=16 '#'

# --- PIP ---
- id: set_pip_off
  label: Set PIP (Disabled)
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 0A"
  notes: Type=C, FourCC=PIPI, parameter=16 '0' = Disabled

- id: set_pip_on
  label: Set PIP (Enabled)
  kind: action
  command: "2A 53 43 50 49 50 49 30 30 30 30 30 30 30 30 30 30 30 30 30 30 30 31 0A"
  notes: Type=C, FourCC=PIPI, parameter byte 16 = '1' = Enabled

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 50 49 50 49 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=PIPI

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 54 50 49 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=C, FourCC=TPIP, parameter=16 '#'

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 54 50 50 50 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=C, FourCC=TPPP, parameter=16 '#'. Changes PIP position in turn.

# --- Network info ---
- id: get_broadcast_address
  label: Get Broadcast Address (Eth0)
  kind: query
  command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=BADR, parameter="eth0" + 12 '#'. Answer: IPv4 string padded right with '#'. Example: 192.168.0.14####.

- id: get_mac_address
  label: Get MAC Address (Eth0)
  kind: query
  command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
  notes: Type=E, FourCC=MADR, parameter="eth0" + 12 '#'. Answer: MAC string padded right with '#'.

# --- IR Code passthrough ---
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 49 52 43 43 {ir_code_padded_16} 0A"
  params:
    - name: ir_code
      type: string
      description: IR function code from Table 5 as a 2-char decimal pair in the last 2 parameter bytes, remaining 14 bytes ASCII '0'. e.g. Power Off = "0000000000000000", Volume Up = "0000000000000030".
  notes: Type=C, FourCC=IRCC. See IR Code table for full mapping (Power Off, Num0..Num12, Vol+/-, Mute, Ch+/-, etc.).
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [standby, active]
  source: getPowerStatus answer (POWR FourCC, parameter byte 16: '0' = standby, '1' = active)
- id: audio_volume
  type: integer
  source: getAudioVolume answer (VOLU FourCC) - volume value as decimal digits in parameter
- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer (AMUT FourCC, parameter byte 16: '0' = unmuted, '1' = muted)
- id: current_channel
  type: string
  source: getChannel answer (CHNN FourCC) - preset channel in "00000050.1000000" style
- id: current_triplet_channel
  type: string
  source: getTripletChannel answer (TCHN FourCC) - triplet hex
- id: current_input_source
  type: string
  source: getInputSource answer (ISRC FourCC) - e.g. dvbt/dvbc/dvbs
- id: current_input
  type: object
  fields: [type, number]
  source: getInput answer (INPT FourCC) - byte 12 = type (0=TV, 1=HDMI, 2=SCART, 3=Composite, 4=Component, 5=Screen Mirroring, 6=PC RGB), last 4 bytes = number
- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  source: getPictureMute answer (PMUT FourCC, parameter byte 16: '0' = disabled, '1' = enabled)
- id: pip_state
  type: enum
  values: [disabled, enabled]
  source: getPip answer (PIPI FourCC, parameter byte 16: '0' = disabled, '1' = enabled)
- id: broadcast_address
  type: string
  source: getBroadcastAddress answer (BADR FourCC) - IPv4 string
- id: mac_address
  type: string
  source: getMacAddress answer (MADR FourCC) - MAC string
```

## Events
```yaml
# Notify (type=0x4E) messages sent unsolicited by the TV.
- id: fire_power_change
  type: enum
  values: [standby, active]
  source: FourCC=POWR, parameter byte 16: '0' = powering off, '1' = powering on
- id: fire_channel_change
  type: string
  source: FourCC=CHNN - channel value in same form as getChannel answer
- id: fire_input_change
  type: object
  fields: [type, number]
  source: FourCC=INPT, parameter same encoding as getInput answer (type 0..6)
- id: fire_volume_change
  type: integer
  source: FourCC=VOLU - new volume value
- id: fire_mute_change
  type: enum
  values: [unmuting, muting]
  source: FourCC=AMUT, parameter byte 16: '0' = unmuting, '1' = muting
- id: fire_pip_change
  type: enum
  values: [disabled, enabled]
  source: FourCC=PIPI, parameter byte 16: '0' = disabled, '1' = enabled
- id: fire_picture_mute_change
  type: enum
  values: [disabled, enabled]
  source: FourCC=PMUT, parameter byte 16: '0' = disabled, '1' = enabled
```

## Notes
Protocol uses a 24-byte fixed TCP frame: header `0x2A 0x53`, type byte, 4-byte ASCII FourCC function code, 16-byte parameter block, footer `0x0A`. Connection is kept alive between requests but server drops the socket after 30s of client silence. Protocol must be enabled on the TV: Normal Mode → Network > Home Network Setup > IP Control > Simple IP Control, or Hotel/Pro Mode > IP Control > Simple IP Control.

IR code values (Table 5) cover remote control functions: Power Off, Num0–Num12, Volume Up/Down, Mute, Channel Up/Down, Subtitle, Closed Caption, Enter, DOT, Analog, Teletext, Exit, Analog2, *AD, Digital, Analog?, BS, CS, BS/CS, Ddata, Pic Off, Tv_Radio, Theater, SEN, Internet Widgets, Internet Video, Netflix, Scene Select, Mode3D, iManual, Audio, Wide, Jump, PAP, MyEPG, Program Description, Write Chapter, TrackID, Ten Key, AppliCast, acTVila, Delete Video, Photo Frame, TV Pause, KeyPad, Media, Sync Menu, Forward, Play, Rewind, Prev, Stop, Next, Rec, Pause, Eject, Flash Plus, Flash Minus, TopMenu, PopupMenu, Rakuraku Start, One Touch Time Rec, One Touch View, One Touch Rec, One Touch Stop, DUX, Football Mode, Social.

<!-- UNRESOLVED: source covers "BRAVIA 2014 models" generically; FWXD8001-specific behavior, firmware version, and any deltas vs. broader 2014 line not stated. -->
<!-- UNRESOLVED: Error-answer semantics — source describes error replies with parameter filled with 'F' bytes but does not enumerate error codes. -->
<!-- UNRESOLVED: Source describes a "High Level Protocol" layer (HTTP + JSON-RPC) as a bridge to this Low Level Protocol but does not document its endpoint, methods, or JSON shapes in this document. -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro.sony
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro.sony/en_GB/products/pro-displays/fw-49xd8001
retrieved_at: 2026-06-12T04:25:06.565Z
last_checked_at: 2026-06-12T19:44:59.438Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:44:59.438Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions matched verbatim to source Table 4 commands; transport parameters verified; full protocol coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "spec is tied to \"BRAVIA 2014 models\" generically; FWXD8001-specific applicability and any model deltas not stated."
- "source covers \"BRAVIA 2014 models\" generically; FWXD8001-specific behavior, firmware version, and any deltas vs. broader 2014 line not stated."
- "Error-answer semantics — source describes error replies with parameter filled with 'F' bytes but does not enumerate error codes."
- "Source describes a \"High Level Protocol\" layer (HTTP + JSON-RPC) as a bridge to this Low Level Protocol but does not document its endpoint, methods, or JSON shapes in this document."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
