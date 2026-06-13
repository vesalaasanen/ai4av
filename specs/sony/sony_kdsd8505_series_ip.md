---
spec_id: admin/sony-kdsd8505-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDSD8505 Series Control Spec"
manufacturer: Sony
model_family: KD-55SD8505
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KD-55SD8505
    - KD-65SD8505
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - aca.im
  - pro-bravia.sony.net
  - web.archive.org
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/develop/integrate/ssip/command-definitions/
  - https://web.archive.org/web/20210215035854/https://pro-bravia.sony.net/develop/integrate/ssip/command-definitions/index.html
  - https://pro-bravia.sony.net/develop/integrate/ssip/overview/
  - https://web.archive.org/web/20201112002911/https://pro-bravia.sony.net/develop/integrate/ssip/overview/index.html
retrieved_at: 2026-06-12T10:36:59.701Z
last_checked_at: 2026-06-12T19:48:42.758Z
generated_at: 2026-06-12T19:48:42.758Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "source covers the generic SSIP protocol v0.6 for \"BRAVIA 2014 models\" — SD8505 is a 2016 model; protocol applicability inferred from family/date, not explicitly stated per model"
  - "max volume not stated in source"
  - "no persistent variable model described in source beyond action parameters"
  - "no macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "WebAPI/JSON-RPC commands not included — separate spec needed if device supports it"
  - "firmware version compatibility not stated in source"
  - "maximum volume level not stated in source"
  - "no mention of RS-232 serial control for this model — may be IP-only"
  - "power-on via WOL or other standby network wake not documented"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:48:42.758Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec action units matched source FourCC commands; complete transport verification; bidirectional coverage achieved. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-12
---

# Sony KDSD8505 Series Control Spec

## Summary

Sony BRAVIA KD-SD8505 series displays support the Simple IP Control (SSIP) protocol over TCP. The protocol uses a 24-byte fixed-size binary message with FourCC function identifiers and ASCII-encoded parameters. Covers power, audio volume/mute, channel selection, input routing, PIP, picture mute, network address queries, and IR remote code emulation. A 30-second idle timeout disconnects stale connections.

<!-- UNRESOLVED: source covers the generic SSIP protocol v0.6 for "BRAVIA 2014 models" — SD8505 is a 2016 model; protocol applicability inferred from family/date, not explicitly stated per model -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 20060
auth:
  type: none  # inferred: no auth procedure in source
notes:
  - "24-byte fixed-size messages over TCP"
  - "Header: 0x2A 0x53 (*S), Footer: 0x0A (LF)"
  - "Server disconnects after 30 s idle"
```

## Traits

```yaml
traits:
  - powerable    # setPowerStatus / getPowerStatus
  - queryable    # multiple enquiry (E-type) commands
  - routable     # setInput / setInputSource
  - levelable    # setAudioVolume
```

## Actions

```yaml
# Message format: *S{TYPE}{FOURCC}{PARAM16}\n  (24 bytes total)
#   TYPE: C=Control(0x43), E=Enquiry(0x45)
#   FOURCC: 4 ASCII chars identifying function
#   PARAM16: 16 ASCII chars, zero-padded; '#' = wildcard for enquiry
#   Footer: 0x0A (LF)
#
# In command templates below, variable parts shown in {braces}.

- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR{status}\n"
  params:
    - name: status
      type: enum
      values:
        - value: "0000000000000000"
          label: Standby (Off)
        - value: "0000000000000001"
          label: Active (On)

- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"
  params: []

- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{level:0>16}\n"
  params:
    - name: level
      type: integer
      min: 0
      max: null  # UNRESOLVED: max volume not stated in source
      description: "Volume level as 16-digit zero-padded decimal (e.g. 0000000000000029)"

- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"
  params: []

- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT{status}\n"
  params:
    - name: status
      type: enum
      values:
        - value: "0000000000000000"
          label: Unmute
        - value: "0000000000000001"
          label: Mute

- id: get_audio_mute
  label: Get Audio Mute Status
  kind: query
  command: "*SEAMUT################\n"
  params: []

- id: set_channel
  label: Set Channel (Preset)
  kind: action
  command: "*SCCHNN{channel}\n"
  params:
    - name: channel
      type: string
      description: "16-char preset number: 8-digit major, '.', 7-digit minor, right-padded (e.g. 00000050.1000000 for ch 50.1, 00000006.0000000 for ch 6)"

- id: get_channel
  label: Get Current Channel
  kind: query
  command: "*SECHNN################\n"
  params: []

- id: set_triplet_channel
  label: Set Channel (Triplet)
  kind: action
  command: "*SCTCHN{triplet}0000\n"
  params:
    - name: triplet
      type: string
      description: "12-hex-char triplet in hexadecimal (e.g. 7FE07FE00400 = 32736.32736.1024). Last 4 param bytes unused."

- id: get_triplet_channel
  label: Get Triplet Channel
  kind: query
  command: "*SETCHN################\n"
  params: []

- id: set_input_source
  label: Set Input Source
  kind: action
  command: "*SCISRC{source}############\n"
  params:
    - name: source
      type: enum
      values:
        - value: dvbt
          label: DVB-T
        - value: dvbc
          label: DVB-C
        - value: dvbs
          label: DVB-S
        - value: isdbt
          label: ISDB-T
        - value: isdbbs
          label: ISDB-BS
        - value: isdbcs
          label: ISDB-CS
        - value: antenna
          label: Antenna
        - value: cable
          label: Cable
        - value: isdbgt
          label: ISDB-GB
      description: "Source name left-justified, padded right with '#' to fill 16 chars"

- id: get_input_source
  label: Get Input Source
  kind: query
  command: "*SEISRC################\n"
  params: []

- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT{param16}\n"
  params:
    - name: input_type
      type: enum
      values:
        - value: "tv"
          label: TV
          param: "0000000000000000"
        - value: hdmi
          label: HDMI
          param: "00000010000{port:04d}"
        - value: scart
          label: SCART
          param: "00000020000{port:04d}"
        - value: composite
          label: Composite
          param: "00000030000{port:04d}"
        - value: component
          label: Component
          param: "00000040000{port:04d}"
        - value: screen_mirroring
          label: Screen Mirroring
          param: "00000050000{port:04d}"
        - value: pc_rgb
          label: PC RGB Input
          param: "00000060000{port:04d}"
    - name: port
      type: integer
      min: 1
      max: 9999
      description: "Port number (1-9999), not used for TV input type"

- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"
  params: []

- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT{status}\n"
  params:
    - name: status
      type: enum
      values:
        - value: "0000000000000000"
          label: Disable Picture Mute
        - value: "0000000000000001"
          label: Enable Picture Mute (Black Screen)

- id: get_picture_mute
  label: Get Picture Mute Status
  kind: query
  command: "*SEPMUT################\n"
  params: []

- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"
  params: []

- id: set_pip
  label: Set PIP
  kind: action
  command: "*SCPIPI{status}\n"
  params:
    - name: status
      type: enum
      values:
        - value: "0000000000000000"
          label: Disable PIP
        - value: "0000000000000001"
          label: Enable PIP

- id: get_pip
  label: Get PIP Status
  kind: query
  command: "*SEPIPI################\n"
  params: []

- id: toggle_pip
  label: Toggle PIP
  kind: action
  command: "*SCTPIP################\n"
  params: []

- id: toggle_pip_position
  label: Toggle PIP Position
  kind: action
  command: "*SCTPPP################\n"
  params: []

- id: get_broadcast_address
  label: Get Broadcast Address
  kind: query
  command: "*SEBADReth0############\n"
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), padded with # to 16 chars"

- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADReth0############\n"
  params:
    - name: interface
      type: string
      description: "Network interface name (e.g. eth0), padded with # to 16 chars"

- id: send_ircc
  label: Send IR Code
  kind: action
  command: "*SCIRCC{code:0>16}\n"
  params:
    - name: code
      type: enum
      description: "IR code parameter as 16-digit zero-padded decimal"
      values:
        - value: "0000000000000000"
          label: Power Off
        - value: "0000000000000001"
          label: Input
        - value: "0000000000000002"
          label: GGuide
        - value: "0000000000000003"
          label: EPG
        - value: "0000000000000004"
          label: Favorites
        - value: "0000000000000005"
          label: Display
        - value: "0000000000000006"
          label: Home
        - value: "0000000000000007"
          label: Options
        - value: "0000000000000008"
          label: Return
        - value: "0000000000000009"
          label: Up
        - value: "0000000000000010"
          label: Down
        - value: "0000000000000011"
          label: Right
        - value: "0000000000000012"
          label: Left
        - value: "0000000000000013"
          label: Confirm
        - value: "0000000000000014"
          label: Red
        - value: "0000000000000015"
          label: Green
        - value: "0000000000000016"
          label: Yellow
        - value: "0000000000000017"
          label: Blue
        - value: "0000000000000018"
          label: Num1
        - value: "0000000000000019"
          label: Num2
        - value: "0000000000000020"
          label: Num3
        - value: "0000000000000021"
          label: Num4
        - value: "0000000000000022"
          label: Num5
        - value: "0000000000000023"
          label: Num6
        - value: "0000000000000024"
          label: Num7
        - value: "0000000000000025"
          label: Num8
        - value: "0000000000000026"
          label: Num9
        - value: "0000000000000027"
          label: Num0
        - value: "0000000000000028"
          label: Num11
        - value: "0000000000000029"
          label: Num12
        - value: "0000000000000030"
          label: Volume Up
        - value: "0000000000000031"
          label: Volume Down
        - value: "0000000000000032"
          label: Mute
        - value: "0000000000000033"
          label: Channel Up
        - value: "0000000000000034"
          label: Channel Down
        - value: "0000000000000035"
          label: Subtitle
        - value: "0000000000000036"
          label: Closed Caption
        - value: "0000000000000037"
          label: Enter
        - value: "0000000000000038"
          label: DOT
        - value: "0000000000000039"
          label: Analog
        - value: "0000000000000040"
          label: Teletext
        - value: "0000000000000041"
          label: Exit
        - value: "0000000000000042"
          label: Analog2
        - value: "0000000000000043"
          label: AD
        - value: "0000000000000044"
          label: Digital
        - value: "0000000000000045"
          label: Analog?
        - value: "0000000000000046"
          label: BS
        - value: "0000000000000047"
          label: CS
        - value: "0000000000000048"
          label: BS/CS
        - value: "0000000000000049"
          label: Ddata
        - value: "0000000000000050"
          label: Pic Off
        - value: "0000000000000051"
          label: Tv/Radio
        - value: "0000000000000052"
          label: Theater
        - value: "0000000000000053"
          label: SEN
        - value: "0000000000000054"
          label: Internet Widgets
        - value: "0000000000000055"
          label: Internet Video
        - value: "0000000000000056"
          label: Netflix
        - value: "0000000000000057"
          label: Scene Select
        - value: "0000000000000058"
          label: Mode3D
        - value: "0000000000000059"
          label: iManual
        - value: "0000000000000060"
          label: Audio
        - value: "0000000000000061"
          label: Wide
        - value: "0000000000000062"
          label: Jump
        - value: "0000000000000063"
          label: PAP
        - value: "0000000000000064"
          label: MyEPG
        - value: "0000000000000065"
          label: Program Description
        - value: "0000000000000066"
          label: Write Chapter
        - value: "0000000000000067"
          label: TrackID
        - value: "0000000000000068"
          label: Ten Key
        - value: "0000000000000069"
          label: AppliCast
        - value: "0000000000000070"
          label: acTVila
        - value: "0000000000000071"
          label: Delete Video
        - value: "0000000000000072"
          label: Photo Frame
        - value: "0000000000000073"
          label: TV Pause
        - value: "0000000000000074"
          label: KeyPad
        - value: "0000000000000075"
          label: Media
        - value: "0000000000000076"
          label: Sync Menu
        - value: "0000000000000077"
          label: Forward
        - value: "0000000000000078"
          label: Play
        - value: "0000000000000079"
          label: Rewind
        - value: "0000000000000080"
          label: Prev
        - value: "0000000000000081"
          label: Stop
        - value: "0000000000000082"
          label: Next
        - value: "0000000000000083"
          label: Rec
        - value: "0000000000000084"
          label: Pause
        - value: "0000000000000085"
          label: Eject
        - value: "0000000000000086"
          label: Flash Plus
        - value: "0000000000000087"
          label: Flash Minus
        - value: "0000000000000088"
          label: TopMenu
        - value: "0000000000000089"
          label: PopupMenu
        - value: "0000000000000090"
          label: Rakuraku Start
        - value: "0000000000000091"
          label: One Touch Time Rec
        - value: "0000000000000092"
          label: One Touch View
        - value: "0000000000000093"
          label: One Touch Rec
        - value: "0000000000000094"
          label: One Touch Stop
        - value: "0000000000000095"
          label: DUX
        - value: "0000000000000096"
          label: Football Mode
        - value: "0000000000000097"
          label: Social
```

## Feedbacks

```yaml
# Answer (A-type, 0x41) responses from TV to controller.
# All share format: *SA{FOURCC}{PARAM16}\n
# PARAM all-zeros (0000000000000000) = success; all-F (FFFFFFFFFFFFFFFF) = error.

- id: power_state
  type: enum
  values: [off, on]
  description: "Answer to getPowerStatus. Off=0000000000000000, On=0000000000000001"

- id: audio_volume
  type: integer
  description: "Answer to getAudioVolume. 16-digit zero-padded decimal value."

- id: audio_mute_state
  type: enum
  values: [unmuted, muted]
  description: "Answer to getAudioMute. Not Muted=0000000000000000, Muted=0000000000000001"

- id: channel_preset
  type: string
  description: "Answer to getChannel. Preset number as XXXXXXXX.XXXXXXX."

- id: channel_triplet
  type: string
  description: "Answer to getTripletChannel. 12-hex-char triplet."

- id: input_source
  type: string
  description: "Answer to getInputSource. Source name padded with #."

- id: input_state
  type: string
  description: "Answer to getInput. Encoded input type and port number."

- id: picture_mute_state
  type: enum
  values: [disabled, enabled]
  description: "Answer to getPictureMute. Disabled=0, Enabled=1"

- id: pip_state
  type: enum
  values: [disabled, enabled]
  description: "Answer to getPip. Disabled=0, Enabled=1"

- id: broadcast_address
  type: string
  description: "Answer to getBroadcastAddress. IPv4 broadcast address padded with #."

- id: mac_address
  type: string
  description: "Answer to getMacAddress. MAC address padded with #."

- id: command_error
  type: boolean
  description: "Universal error indicator. All-F param (FFFFFFFFFFFFFFFF) signals invalid parameter or command failure."
```

## Variables

```yaml
# UNRESOLVED: no persistent variable model described in source beyond action parameters
```

## Events

```yaml
# Notify (N-type, 0x4E) messages sent unsolicited from TV to controller.
# Format: *SN{FOURCC}{PARAM16}\n

- id: power_change
  description: "Sent on power state change"
  type: enum
  values: [off, on]
  fourcc: POWR

- id: channel_change
  description: "Sent when channel changes"
  type: string
  fourcc: CHNN
  value_format: "XXXXXXXX.XXXXXXX preset number"

- id: input_change
  description: "Sent when input changes (TV, HDMI, SCART, Composite, Component, Screen Mirroring, PC RGB)"
  type: string
  fourcc: INPT
  value_format: "Same encoding as setInput answer"

- id: volume_change
  description: "Sent when volume changes"
  type: integer
  fourcc: VOLU

- id: mute_change
  description: "Sent when mute state changes"
  type: enum
  values: [unmuted, muted]
  fourcc: AMUT

- id: pip_change
  description: "Sent when PIP state changes"
  type: enum
  values: [disabled, enabled]
  fourcc: PIPI

- id: picture_mute_change
  description: "Sent when picture mute state changes"
  type: enum
  values: [disabled, enabled]
  fourcc: PMUT
```

## Macros

```yaml
# UNRESOLVED: no macro sequences described in source
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

- Protocol version 0.6 as stated in source document header.
- 30-second TCP idle timeout: client must send commands within this window or handle reconnection.
- Parameter field uses '#' (0x23) padding for enquiry commands and as right-pad filler for short string values.
- Answer success is 16 ASCII zeroes (`0000000000000000`); error is 16 ASCII F's (`FFFFFFFFFFFFFFFF`).
- The Simple IP Control setting must be enabled on the TV via Network > Home Network Setup > IP Control > Simple IP Control (Normal Mode) or Hotel/Pro Mode > IP Control > Simple IP Control.
- IR codes (Table 5) include Japan-specific broadcast keys (BS, CS, BS/CS, Ddata, acTVila, etc.) that may not function on all regional models.
- Source also references a High Level HTTP/JSON-RPC protocol ("WebAPI") but this spec covers only the Low Level TCP protocol. <!-- UNRESOLVED: WebAPI/JSON-RPC commands not included — separate spec needed if device supports it -->

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: maximum volume level not stated in source -->
<!-- UNRESOLVED: no mention of RS-232 serial control for this model — may be IP-only -->
<!-- UNRESOLVED: power-on via WOL or other standby network wake not documented -->

## Provenance

```yaml
source_domains:
  - aca.im
  - pro-bravia.sony.net
  - web.archive.org
source_urls:
  - "https://aca.im/driver_docs/Sony/sony%20bravia%20simple%20ip%20control.pdf"
  - https://pro-bravia.sony.net/develop/integrate/ssip/command-definitions/
  - https://web.archive.org/web/20210215035854/https://pro-bravia.sony.net/develop/integrate/ssip/command-definitions/index.html
  - https://pro-bravia.sony.net/develop/integrate/ssip/overview/
  - https://web.archive.org/web/20201112002911/https://pro-bravia.sony.net/develop/integrate/ssip/overview/index.html
retrieved_at: 2026-06-12T10:36:59.701Z
last_checked_at: 2026-06-12T19:48:42.758Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:48:42.758Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec action units matched source FourCC commands; complete transport verification; bidirectional coverage achieved. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source covers the generic SSIP protocol v0.6 for \"BRAVIA 2014 models\" — SD8505 is a 2016 model; protocol applicability inferred from family/date, not explicitly stated per model"
- "max volume not stated in source"
- "no persistent variable model described in source beyond action parameters"
- "no macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "WebAPI/JSON-RPC commands not included — separate spec needed if device supports it"
- "firmware version compatibility not stated in source"
- "maximum volume level not stated in source"
- "no mention of RS-232 serial control for this model — may be IP-only"
- "power-on via WOL or other standby network wake not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
