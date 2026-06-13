---
spec_id: admin/sony-kdx7066-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDX7066 Series Control Spec"
manufacturer: Sony
model_family: "KDX7066 Series"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "KDX7066 Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-11T04:26:03.427Z
last_checked_at: 2026-06-11T13:46:47.119Z
generated_at: 2026-06-11T13:46:47.119Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source names the device family as \"BRAVIA 2014 models\" / \"BRAVIA\" but does not explicitly call out the KDX7066 Series model number; KDX7066 compatibility assumed by operator."
  - "source does not document any analog-style settable variable"
  - "source does not document any multi-step sequences."
  - "source contains no safety warnings, interlock procedures, or"
  - "source did not document firmware version compatibility for the KDX7066 Series; the WebAPI/HTTP variant of the protocol is mentioned but not detailed; the setInput port-encoding byte positions are partially inferred from a malformed source table."
verification:
  verdict: verified
  checked_at: 2026-06-11T13:46:47.119Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions have literal FourCC and parameter matches in source Table 4; transport (TCP port 20060) confirmed; all source events represented in spec Events section. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-11
---

# Sony KDX7066 Series Control Spec

## Summary
Sony BRAVIA 2014 series professional displays (KDX7066 Series) implementing the "Simple IP Control Protocol". Low-level transport is a fixed 24-byte TCP frame on port 20060; an equivalent HTTP/JSON-RPC WebAPI is layered on top. This spec covers the low-level TCP protocol (commands, enquiries, answers, notifications).

<!-- UNRESOLVED: source names the device family as "BRAVIA 2014 models" / "BRAVIA" but does not explicitly call out the KDX7066 Series model number; KDX7066 compatibility assumed by operator. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
# Connection idle timeout: 30 s; server disconnects after that.
# Message framing: fixed 24-byte frames, header 0x2A 0x53, footer 0x0A.
# Connection type: persistent, but dropped after 30 s idle.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # inferred from setPowerStatus (POWR)
- routable        # inferred from setInput (INPT) / setInputSource (ISRC)
- queryable       # inferred from getPowerStatus, getAudioVolume, getChannel, getInput, etc.
- levelable       # inferred from setAudioVolume (VOLU)
```

## Actions
```yaml
# Frame layout reminder (24 bytes, all values as ASCII hex pairs):
#   [0-1]  Header  0x2A 0x53
#   [2]    Type    0x43 C / 0x45 E / 0x41 A / 0x4E N
#   [3-6]  Function Four-CC ASCII
#   [7-22] Parameter 16 bytes (pad with 0x30 "0" or 0x23 "#" per source)
#   [23]   Footer  0x0A
# Each action below names the Four-CC; the literal byte stream is
# 0x2A 0x53 <type> <4 ASCII bytes of Four-CC> <16 param bytes> 0x0A.

# --- IR-like pass-through ---
- id: set_ircc_code
  label: Send IR-like Code
  kind: action
  command: "2A 53 43 IRCC <ircc_code:16 hex digits> 0A"
  # FourCC: IRCC. Parameter holds the IR code from Table 5 (e.g. 000000000000002A for Power).
  # See Notes for the IR code lookup table.

# --- Power ---
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "2A 53 43 POWR 000000000000000{0|1} 0A"
  # FourCC: POWR. Param digit 15: 0=Standby, 1=ActiveOn.

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "2A 53 45 POWR ################ 0A"
  # FourCC: POWR. Answer A: trailing 0=Standby, 1=ActiveOn.

# --- Audio Volume ---
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "2A 53 43 VOLU {volume:16-digit decimal zero-padded} 0A"
  # FourCC: VOLU. Param: decimal value right-padded with "0" to 16 chars
  # (e.g. volume 41 -> "0000000000000029" + "0" trailing? source example: 0000000000000029
  # for value 41; treat entire 16-byte param as 16 decimal digits zero-padded).

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "2A 53 45 VOLU ################ 0A"
  # Answer A: 16 decimal digits in param, value returned right-padded with "0".

# --- Audio Mute ---
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "2A 53 43 AMUT 000000000000000{0|1} 0A"
  # FourCC: AMUT. 0=Unmute, 1=Mute.

- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "2A 53 45 AMUT ################ 0A"
  # Answer: 0=NotMuted, 1=Muted.

# --- Channel (preset number) ---
- id: set_channel
  label: Set Channel (preset)
  kind: action
  command: "2A 53 43 CHNN {major:8-digit}.{minor:7-digit} 0A"
  # FourCC: CHNN. Param: "XXXXXXXX.YYYYYYY" where X = major preset zero-padded,
  # Y = minor zero-padded. Source examples: "00000050.1000000" = ch 50.1, "00000006.0000000" = ch 6.
  # Answer A: 16 "N" bytes = no such channel.

- id: get_channel
  label: Get Channel (preset)
  kind: query
  command: "2A 53 45 CHNN ################ 0A"
  # Answer: preset channel number in "XXXXXXXX.YYYYYYY" form.

# --- Channel (triplet / hex) ---
- id: set_triplet_channel
  label: Set Channel (triplet hex)
  kind: action
  command: "2A 53 43 TCHN {triplet_hex:12 hex digits}{minor:4 hex digits} 0A"
  # FourCC: TCHN. Param: 12 hex digits for major/minor triplet + 4 hex digits for minor.
  # Source example: 7FE07FE00400 -> channel 32736.32736.1024.

- id: get_triplet_channel
  label: Get Channel (triplet hex)
  kind: query
  command: "2A 53 45 TCHN ################ 0A"

# --- Input Source (tuner) ---
- id: set_input_source
  label: Set Input Source (tuner)
  kind: action
  command: "2A 53 43 ISRC {source_padded:7 chars right-padded with #} 0A"
  # FourCC: ISRC. Param: source string right-padded with "#" to 7 chars.
  # Valid sources per source: dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt.

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "2A 53 45 ISRC ################ 0A"

# --- Input (physical) ---
- id: set_input_tv
  label: Set Input to TV
  kind: action
  command: "2A 53 43 INPT 0000000000000000 0A"
  # FourCC: INPT. Param trailing digits: 0=TV, 1=HDMI(1-9999), 2=SCART(1-9999),
  # 3=Composite(1-9999), 4=Component(1-9999), 5=ScreenMirroring(1-9999), 6=PC RGB(1-9999).

- id: set_input_hdmi
  label: Set Input to HDMI
  kind: action
  command: "2A 53 43 INPT 00000000000{port:04d} 0A"
  # param: 00000000001000{port:1-9999 zero-padded}  -- see Notes; port index in trailing 4 digits.

- id: set_input_scart
  label: Set Input to SCART
  kind: action
  command: "2A 53 43 INPT 00000000000200{port:1-9999} 0A"

- id: set_input_composite
  label: Set Input to Composite
  kind: action
  command: "2A 53 43 INPT 00000000000300{port:1-9999} 0A"

- id: set_input_component
  label: Set Input to Component
  kind: action
  command: "2A 53 43 INPT 00000000000400{port:1-9999} 0A"

- id: set_input_screen_mirroring
  label: Set Input to Screen Mirroring
  kind: action
  command: "2A 53 43 INPT 00000000000500{port:1-9999} 0A"

- id: set_input_pc_rgb
  label: Set Input to PC RGB
  kind: action
  command: "2A 53 43 INPT 00000000000600{port:1-9999} 0A"

- id: get_input
  label: Get Current Input
  kind: query
  command: "2A 53 45 INPT ################ 0A"
  # Answer: same encoding as set_input_* responses.

# --- Picture Mute ---
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "2A 53 43 PMUT 000000000000000{0|1} 0A"
  # 0=Disable, 1=Enable (screen black).

- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "2A 53 45 PMUT ################ 0A"

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "2A 53 43 TPMU ################ 0A"

# --- Picture-in-Picture ---
- id: set_pip
  label: Set PIP
  kind: action
  command: "2A 53 43 PIPI 000000000000000{0|1} 0A"
  # 0=Disable, 1=Enable.

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "2A 53 45 PIPI ################ 0A"

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "2A 53 43 TPIP ################ 0A"

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "2A 53 43 TPPP ################ 0A"

# --- Network info ---
- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "2A 53 45 BADR eth0############# 0A"
  # FourCC: BADR. Param bytes 0-3: "eth0" (ASCII). Bytes 4-15: "#" pad.
  # Source example answer: "192.168.0.14" right-padded with "#".

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "2A 53 45 MADR eth0############# 0A"
  # Answer: MAC address right-padded with "#".
```

## Feedbacks
```yaml
# FourCC enumeration (Type, Four-CC, Description):
#   C IRCC  send IR-like code
#   C POWR  set power (0/1)
#   E POWR  get power
#   C VOLU  set volume
#   E VOLU  get volume
#   C AMUT  set mute (0/1)
#   E AMUT  get mute
#   C CHNN  set channel (preset)
#   E CHNN  get channel
#   C TCHN  set channel (triplet)
#   E TCHN  get channel (triplet)
#   C ISRC  set input source (tuner)
#   E ISRC  get input source
#   C INPT  set input (TV/HDMI/SCART/Composite/Component/ScreenMirroring/PC RGB)
#   E INPT  get input
#   C PMUT  set picture mute
#   E PMUT  get picture mute
#   C TPMU  toggle picture mute
#   C PIPI  set PIP
#   E PIPI  get PIP
#   C TPIP  toggle PIP
#   C TPPP  toggle PIP position
#   E BADR  get broadcast address
#   E MADR  get MAC address
#   A xxxx  answer (success: 16 "0" bytes; error: 16 "F" bytes; or value)
#   N POWR  fire power change
#   N CHNN  fire channel change
#   N INPT  fire input change
#   N VOLU  fire volume change
#   N AMUT  fire mute change
#   N PIPI  fire PIP change
#   N PMUT  fire picture mute change

- id: power_state
  type: enum
  values: [standby, active]
  # From getPowerStatus answer digit: 0=Standby, 1=ActiveOn.

- id: volume
  type: integer
  description: Audio volume in device units. Encoded as 16 decimal digits zero-padded in param field.

- id: mute
  type: enum
  values: [unmuted, muted]

- id: channel_preset
  type: string
  description: "Major.Minor preset, e.g. 50.1, encoded as XXXXXXXX.YYYYYYY (15+1=16 chars)."

- id: channel_triplet
  type: string
  description: "Hex triplet + 4-digit minor, e.g. 7FE07FE00400."

- id: input_source
  type: enum
  values: [dvbt, dvbc, dvbs, isdbt, isdbbs, isdbcs, antenna, cable, isdbgt]
  description: Tuner input source, encoded as 7-char string right-padded with "#".

- id: input_physical
  type: enum
  values: [tv, hdmi, scart, composite, component, screen_mirroring, pc_rgb]
  description: Physical input. Port number (1-9999) carried in trailing digits.

- id: picture_mute
  type: enum
  values: [disabled, enabled]

- id: pip
  type: enum
  values: [disabled, enabled]

- id: broadcast_address
  type: string
  description: "IPv4 broadcast address, e.g. 192.168.0.14, right-padded with #."

- id: mac_address
  type: string
  description: "MAC address, right-padded with #."
```

## Variables
```yaml
# No continuous/settable parameters beyond the discrete action enums above.
# UNRESOLVED: source does not document any analog-style settable variable
# (e.g. backlight level, picture mode index) that is not already expressed
# as a discrete action with a numeric param.
```

## Events
```yaml
# Notify (Type N) messages the TV sends unsolicited:
- id: fire_power_change
  fourcc: POWR
  type: N
  description: Sent on power state change. Param digit 15: 0=powering off, 1=powering on.

- id: fire_channel_change
  fourcc: CHNN
  type: N
  description: Sent on channel change. Param: preset "XXXXXXXX.YYYYYYY".

- id: fire_input_change
  fourcc: INPT
  type: N
  description: Sent on input change. Encoding matches setInput responses (TV/HDMI/SCART/Composite/Component/ScreenMirroring/PC RGB + port).

- id: fire_volume_change
  fourcc: VOLU
  type: N
  description: Sent on volume change. Param: 16-decimal-digit value.

- id: fire_mute_change
  fourcc: AMUT
  type: N
  description: Sent on mute change. 0=unmuting, 1=muting.

- id: fire_pip_change
  fourcc: PIPI
  type: N
  description: Sent on PIP enable/disable. 0=disabled, 1=enabled.

- id: fire_picture_mute_change
  fourcc: PMUT
  type: N
  description: Sent on picture mute change. 0=disabled, 1=enabled.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements.
```

## Notes
**KDX7066 series identity.** Source document is the generic "Sony Simple IP Control Protocol for BRAVIA, Version 0.6" reference, applicable to "BRAVIA 2014 models". The KDX7066 Series name is supplied by the operator and not present in this document; the spec assumes KDX7066 falls under "BRAVIA 2014" coverage.

**Frame layout (24 bytes).**
- Byte 0-1: Header `0x2A 0x53` (fixed).
- Byte 2: Type — `0x43` Control, `0x45` Enquiry, `0x41` Answer, `0x4E` Notify.
- Byte 3-6: Function Four-CC (4 ASCII chars).
- Byte 7-22: Parameter (16 bytes; pad chars used in source: `0x30` "0" for numeric fields, `0x23` "#" for string fields).
- Byte 23: Footer `0x0A` (LF, fixed).

**Connection.** TCP `port 20060`, persistent connections, server disconnects after 30 s of client silence.

**Parameter padding conventions** (from source):
- Numeric zero fields: 16 `0x30` ("0") bytes.
- Inquiry param placeholder: 16 `0x23` ("#") bytes.
- Success answer: 16 `0x30` ("0") bytes.
- Error answer: 16 `0x46` ("F") bytes.
- No-such-resource answer (e.g. invalid channel/input source): 16 `0x4E` ("N") bytes.

**setInput port encoding (INPT).** The 16-byte param holds a type code in the first relevant byte and a port index in trailing digits. Type codes: `0x30` TV, `0x31` HDMI, `0x32` SCART, `0x33` Composite, `0x34` Component, `0x35` Screen Mirroring, `0x36` PC RGB. Port range 1-9999. The exact byte positions of type vs. port within the 16-byte field are partly inferred from the broken table in the source — verify against a live device before shipping code.

**Volume (VOLU) param.** Source example shows `0000000000000029` for volume 41. Treat the 16-byte param as a 16-character decimal string, zero-padded. The trailing `0` in the example is part of the 16-char width, not a unit suffix.

**IR code table (Table 5, partial).** Used via `setIrccCode` (IRCC). Code is encoded as 16 hex digits in the param field. Selected entries from source (code suffix in trailing two digits):
- `0` Power Off, `1` Input, `2` GGuide, `3` EPG, `4` Favorites, `5` Display, `6` Home, `7` Options, `8` Return, `9` Up, `A` Down, `B` Right, `C` Left, `D` Confirm, `E` Red, `F` Green
- `10` Yellow, `11` Blue, `12` Num1, `13` Num2, `14` Num3, `15` Num4, `16` Num5, `17` Num6, `18` Num7, `19` Num8, `1A` Num9, `1B` Num0, `1C` Num11, `1D` Num12
- `1E` Volume Up, `1F` Volume Down, `20` Mute, `21` Channel Up, `22` Channel Down, `23` Subtitle, `24` Closed Caption, `25` Enter, `26` DOT, `27` Analog, `28` Teletext, `29` Exit, `2A` Analog2
- `2B` *AD, `2C` Digital, `2D` Analog?, `2E` BS, `2F` CS, `30` BS/CS, `31` Ddata
- `32` Pic Off, `33` Tv_Radio, `34` Theater, `35` SEN, `36` Internet Widgets, `37` Internet Video, `38` Netflix, `39` Scene Select, `3A` Mode3D, `3B` iManual, `3C` Audio, `3D` Wide, `3E` Jump, `3F` PAP
- `40` MyEPG, `41` Program Description, `42` Write Chapter, `43` TrackID, `44` Ten Key, `45` AppliCast, `46` acTVila, `47` Delete Video, `48` Photo Frame, `49` TV Pause, `4A` KeyPad, `4B` Media, `4C` Sync Menu
- `4D` Forward, `4E` Play, `4F` Rewind, `50` Prev, `51` Stop, `52` Next, `53` Rec, `54` Pause, `55` Eject, `56` Flash Plus, `57` Flash Minus, `58` TopMenu, `59` PopupMenu
- `5A` Rakuraku Start, `5B` One Touch Time Rec, `5C` One Touch View, `5D` One Touch Rec, `5E` One Touch Stop, `5F` DUX, `60` Football Mode, `61` Social

**Layered WebAPI.** Source mentions a parallel HTTP/JSON-RPC "WebAPI" exposing the same commands. Not detailed in the supplied excerpt; out of scope for this spec.

<!-- UNRESOLVED: source did not document firmware version compatibility for the KDX7066 Series; the WebAPI/HTTP variant of the protocol is mentioned but not detailed; the setInput port-encoding byte positions are partially inferred from a malformed source table. -->

## Provenance

```yaml
source_domains:
  - aca.im
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
retrieved_at: 2026-06-11T04:26:03.427Z
last_checked_at: 2026-06-11T13:46:47.119Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-11T13:46:47.119Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions have literal FourCC and parameter matches in source Table 4; transport (TCP port 20060) confirmed; all source events represented in spec Events section. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source names the device family as \"BRAVIA 2014 models\" / \"BRAVIA\" but does not explicitly call out the KDX7066 Series model number; KDX7066 compatibility assumed by operator."
- "source does not document any analog-style settable variable"
- "source does not document any multi-step sequences."
- "source contains no safety warnings, interlock procedures, or"
- "source did not document firmware version compatibility for the KDX7066 Series; the WebAPI/HTTP variant of the protocol is mentioned but not detailed; the setInput port-encoding byte positions are partially inferred from a malformed source table."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
