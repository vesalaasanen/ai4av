---
spec_id: admin/sony-kdl-48w585b
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL-48W585B Control Spec"
manufacturer: Sony
model_family: KDL-48W585B
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - KDL-48W585B
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-10T00:32:03.029Z
last_checked_at: 2026-06-10T07:35:27.431Z
generated_at: 2026-06-10T07:35:27.431Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "HTTP/JSON-RPC WebAPI documented but not detailed in this source"
  - "protocol version 0.6 stated — compatibility with other versions unknown"
  - "which specific BRAVIA 2014 models beyond KDL-48W585B share this protocol"
  - "no base_url or path pattern stated (binary protocol, not HTTP)"
  - "no settable variables beyond what actions cover; volume level is set via set_audio_volume action"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "HTTP/JSON-RPC WebAPI endpoints and format not documented in source"
  - "volume range not stated in source (0–??)"
  - "maximum HDMI/SCART/etc. port count not stated beyond \"1–9999\" range"
verification:
  verdict: verified
  checked_at: 2026-06-10T07:35:27.431Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literally with FourCC codes in Table 4; transport parameters verified; IR table documents only parameter values for setIrccCode, not additional commands. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-10
---

# Sony KDL-48W585B Control Spec

## Summary
Sony BRAVIA 2014 LCD TV with Simple IP Control Protocol (v0.6). Binary TCP control on port 20060 using 24-byte fixed-length packets. Provides power, volume, mute, channel, input routing, PIP, and picture mute control plus IR-emulation commands. Source also mentions an HTTP/JSON-RPC "WebAPI" layer but does not detail it here.

<!-- UNRESOLVED: HTTP/JSON-RPC WebAPI documented but not detailed in this source -->
<!-- UNRESOLVED: protocol version 0.6 stated — compatibility with other versions unknown -->
<!-- UNRESOLVED: which specific BRAVIA 2014 models beyond KDL-48W585B share this protocol -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 20060
  # UNRESOLVED: no base_url or path pattern stated (binary protocol, not HTTP)
auth:
  type: none  # inferred: no auth procedure in source
packet_format:
  description: "24-byte fixed-length binary packet"
  structure:
    header:
      offset: 0
      length: 2
      value: "0x2A 0x53"
      note: "fixed; identifies start of message"
    type:
      offset: 2
      length: 1
      values:
        C: "0x43 - Control (controller → TV)"
        E: "0x45 - Enquiry (controller → TV)"
        A: "0x41 - Answer (TV → controller)"
        N: "0x4E - Notify (TV → controller)"
    function:
      offset: 3
      length: 4
      encoding: "ASCII FourCC (e.g. POWR, VOLU)"
    parameter:
      offset: 7
      length: 16
      encoding: "ASCII characters; '#' (0x23) = wildcard/no-param; digits for values"
    footer:
      offset: 23
      length: 1
      value: "0x0A"
  idle_timeout_seconds: 30
  note: "Server disconnects if no command sent within 30 seconds"
```

## Traits
```yaml
traits:
  - powerable    # setPowerStatus on/off
  - queryable    # getPowerStatus, getAudioVolume, getAudioMute, getChannel, getInput, etc.
  - levelable    # setAudioVolume (0-N decimal)
  - routable     # setInput (HDMI/SCART/Composite/Component/etc.), setInputSource, setChannel
```

## Actions
```yaml
actions:
  - id: set_power_status
    label: Set Power Status
    kind: action
    command: "2A 53 43 50 4F 57 52 {status:16} 0A"
    params:
      - name: status
        type: enum
        values:
          "0000000000000000": "Standby (Off)"
          "0000000000000001": "Active (On)"
        description: "16-byte ASCII parameter: all-zeros for standby, trailing 1 for active"

  - id: get_power_status
    label: Get Power Status
    kind: query
    command: "2A 53 45 50 4F 57 52 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_audio_volume
    label: Set Audio Volume
    kind: action
    command: "2A 53 43 56 4F 4C 55 {level:16} 0A"
    params:
      - name: level
        type: string
        description: "16-digit ASCII decimal padded with leading zeros, e.g. 0000000000000029 for level 29"

  - id: get_audio_volume
    label: Get Audio Volume
    kind: query
    command: "2A 53 45 56 4F 4C 55 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_audio_mute
    label: Set Audio Mute
    kind: action
    command: "2A 53 43 41 4D 55 54 {mute:16} 0A"
    params:
      - name: mute
        type: enum
        values:
          "0000000000000000": "Unmute"
          "0000000000000001": "Mute"
        description: "16-byte ASCII parameter"

  - id: get_audio_mute
    label: Get Audio Mute
    kind: query
    command: "2A 53 45 41 4D 55 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_channel
    label: Set Channel (Preset)
    kind: action
    command: "2A 53 43 43 48 4E 4E {preset:16} 0A"
    params:
      - name: preset
        type: string
        description: "16-byte ASCII preset number with decimal point, e.g. 00000050.1000000 = ch 50.1, 00000006.0000000 = ch 6"

  - id: get_channel
    label: Get Channel (Preset)
    kind: query
    command: "2A 53 45 43 48 4E 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_triplet_channel
    label: Set Channel (Triplet)
    kind: action
    command: "2A 53 43 54 43 48 4E {triplet:16} 0A"
    params:
      - name: triplet
        type: string
        description: "12-byte hex triplet (3 values, last 4 bytes '#'), e.g. 7FE07FE00400#### = 32736.32736.1024"

  - id: get_triplet_channel
    label: Get Channel (Triplet)
    kind: query
    command: "2A 53 45 54 43 48 4E 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_input_source
    label: Set Input Source (Tuner Type)
    kind: action
    command: "2A 53 43 49 53 52 43 {source:16} 0A"
    params:
      - name: source
        type: enum
        values:
          - "dvbt############"
          - "dvbc############"
          - "dvbs############"
          - "isdbt###########"
          - "isdbbs##########"
          - "isdbcs##########"
          - "antenna#########"
          - "cable############"
          - "isdbgt##########"
        description: "Source name padded right with '#' to 16 characters"

  - id: get_input_source
    label: Get Input Source (Tuner Type)
    kind: query
    command: "2A 53 45 49 53 52 43 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_input
    label: Set Input (External)
    kind: action
    command: "2A 53 43 49 4E 50 54 {input_param:16} 0A"
    params:
      - name: input_type
        type: enum
        values:
          "0000000000000000": "TV"
          "000000000001XXXX": "HDMI (1-9999)"
          "000000000002XXXX": "SCART (1-9999)"
          "000000000003XXXX": "Composite (1-9999)"
          "000000000004XXXX": "Component (1-9999)"
          "000000000005XXXX": "Screen Mirroring (1-9999)"
          "000000000006XXXX": "PC RGB Input (1-9999)"
      - name: port
        type: integer
        description: "Port index 1-9999 for non-TV inputs; 4 decimal digits at bytes 12-15"

  - id: get_input
    label: Get Input (External)
    kind: query
    command: "2A 53 45 49 4E 50 54 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params: []

  - id: set_picture_mute
    label: Set Picture Mute
    kind: action
    command: "2A 53 43 50 4D 55 54 {mute:16} 0A"
    params:
      - name: mute
        type: enum
        values:
          "0000000000000000": "Disable picture mute (normal video)"
          "0000000000000001": "Enable picture mute (black screen)"
        description: "16-byte ASCII parameter"

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
    command: "2A 53 43 50 49 50 49 {enable:16} 0A"
    params:
      - name: enable
        type: enum
        values:
          "0000000000000000": "Disable PIP"
          "0000000000000001": "Enable PIP"

  - id: get_pip
    label: Get PIP Status
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
    command: "2A 53 45 42 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0 padded right with '#'"

  - id: get_mac_address
    label: Get MAC Address
    kind: query
    command: "2A 53 45 4D 41 44 52 65 74 68 30 23 23 23 23 23 23 23 23 23 23 23 23 0A"
    params:
      - name: interface
        type: string
        description: "Interface identifier, e.g. eth0 padded right with '#'"

  - id: send_ircc_code
    label: Send IR Code
    kind: action
    command: "2A 53 43 49 52 43 43 {code:16} 0A"
    params:
      - name: code
        type: enum
        description: "16-byte ASCII decimal parameter padded with leading zeros"
        values:
          "0000000000000000": "Power Off"
          "0000000000000001": "Input"
          "0000000000000002": "GGuide"
          "0000000000000003": "EPG"
          "0000000000000004": "Favorites"
          "0000000000000005": "Display"
          "0000000000000006": "Home"
          "0000000000000007": "Options"
          "0000000000000008": "Return"
          "0000000000000009": "Up"
          "0000000000000010": "Down"
          "0000000000000011": "Right"
          "0000000000000012": "Left"
          "0000000000000013": "Confirm"
          "0000000000000014": "Red"
          "0000000000000015": "Green"
          "0000000000000016": "Yellow"
          "0000000000000017": "Blue"
          "0000000000000018": "Num1"
          "0000000000000019": "Num2"
          "0000000000000020": "Num3"
          "0000000000000021": "Num4"
          "0000000000000022": "Num5"
          "0000000000000023": "Num6"
          "0000000000000024": "Num7"
          "0000000000000025": "Num8"
          "0000000000000026": "Num9"
          "0000000000000027": "Num0"
          "0000000000000028": "Num11"
          "0000000000000029": "Num12"
          "0000000000000030": "Volume Up"
          "0000000000000031": "Volume Down"
          "0000000000000032": "Mute"
          "0000000000000033": "Channel Up"
          "0000000000000034": "Channel Down"
          "0000000000000035": "Subtitle"
          "0000000000000036": "Closed Caption"
          "0000000000000037": "Enter"
          "0000000000000038": "DOT"
          "0000000000000039": "Analog"
          "0000000000000040": "Teletext"
          "0000000000000041": "Exit"
          "0000000000000042": "Analog2"
          "0000000000000043": "*AD"
          "0000000000000044": "Digital"
          "0000000000000045": "Analog?"
          "0000000000000046": "BS"
          "0000000000000047": "CS"
          "0000000000000048": "BS/CS"
          "0000000000000049": "Ddata"
          "0000000000000050": "Pic Off"
          "0000000000000051": "Tv_Radio"
          "0000000000000052": "Theater"
          "0000000000000053": "SEN"
          "0000000000000054": "Internet Widgets"
          "0000000000000055": "Internet Video"
          "0000000000000056": "Netflix"
          "0000000000000057": "Scene Select"
          "0000000000000058": "Mode3D"
          "0000000000000059": "iManual"
          "0000000000000060": "Audio"
          "0000000000000061": "Wide"
          "0000000000000062": "Jump"
          "0000000000000063": "PAP"
          "0000000000000064": "MyEPG"
          "0000000000000065": "Program Description"
          "0000000000000066": "Write Chapter"
          "0000000000000067": "TrackID"
          "0000000000000068": "Ten Key"
          "0000000000000069": "AppliCast"
          "0000000000000070": "acTVila"
          "0000000000000071": "Delete Video"
          "0000000000000072": "Photo Frame"
          "0000000000000073": "TV Pause"
          "0000000000000074": "KeyPad"
          "0000000000000075": "Media"
          "0000000000000076": "Sync Menu"
          "0000000000000077": "Forward"
          "0000000000000078": "Play"
          "0000000000000079": "Rewind"
          "0000000000000080": "Prev"
          "0000000000000081": "Stop"
          "0000000000000082": "Next"
          "0000000000000083": "Rec"
          "0000000000000084": "Pause"
          "0000000000000085": "Eject"
          "0000000000000086": "Flash Plus"
          "0000000000000087": "Flash Minus"
          "0000000000000088": "TopMenu"
          "0000000000000089": "PopupMenu"
          "0000000000000090": "Rakuraku Start"
          "0000000000000091": "One Touch Time Rec"
          "0000000000000092": "One Touch View"
          "0000000000000093": "One Touch Rec"
          "0000000000000094": "One Touch Stop"
          "0000000000000095": "DUX"
          "0000000000000096": "Football Mode"
          "0000000000000097": "Social"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      "0000000000000000": "Standby (Off)"
      "0000000000000001": "Active (On)"
    source_query: get_power_status

  - id: audio_volume
    type: string
    description: "16-digit ASCII decimal volume level"
    source_query: get_audio_volume

  - id: audio_mute_state
    type: enum
    values:
      "0000000000000000": "Not Muted"
      "0000000000000001": "Muted"
    source_query: get_audio_mute

  - id: channel_preset
    type: string
    description: "16-byte ASCII preset number with decimal point, e.g. 00000050.1000000"
    source_query: get_channel

  - id: channel_triplet
    type: string
    description: "Hex triplet channel number"
    source_query: get_triplet_channel

  - id: input_source
    type: string
    description: "Tuner source name padded with '#', e.g. dvbt############"
    source_query: get_input_source

  - id: input_external
    type: string
    description: "Input type code + port, e.g. 0000000000010001 = HDMI 1"
    source_query: get_input

  - id: picture_mute_state
    type: enum
    values:
      "0000000000000000": "Disabled (picture mute off)"
      "0000000000000001": "Enabled (picture mute on)"
    source_query: get_picture_mute

  - id: pip_state
    type: enum
    values:
      "0000000000000000": "Disabled"
      "0000000000000001": "Enabled"
    source_query: get_pip

  - id: broadcast_address
    type: string
    description: "IPv4 broadcast address padded with '#', e.g. 192.168.0.14######"
    source_query: get_broadcast_address

  - id: mac_address
    type: string
    description: "MAC address padded with '#', e.g. XX:XX:XX:XX:XX:XX######"
    source_query: get_mac_address

  - id: command_ack
    type: enum
    values:
      "0000000000000000": "Success"
      "FFFFFFFFFFFFFFFF": "Error"
    description: "Answer (type A) response for Control commands; all-zeros = success, all-F = error"
```

## Variables
```yaml
# UNRESOLVED: no settable variables beyond what actions cover; volume level is set via set_audio_volume action
```

## Events
```yaml
events:
  - id: fire_power_change
    label: Power Change Notification
    command: "2A 53 4E 50 4F 57 52 {status:16} 0A"
    params:
      - name: status
        type: enum
        values:
          "0000000000000000": "Powered off"
          "0000000000000001": "Powered on"
    description: "Unsolicited notify (type N) when power state changes"

  - id: fire_channel_change
    label: Channel Change Notification
    command: "2A 53 4E 43 48 4E 4E {preset:16} 0A"
    params:
      - name: preset
        type: string
        description: "Preset channel number with decimal point"
    description: "Unsolicited notify when channel changes"

  - id: fire_input_change
    label: Input Change Notification
    command: "2A 53 4E 49 4E 50 54 {input_param:16} 0A"
    params:
      - name: input_param
        type: string
        description: "Same encoding as setInput: type code + optional port index"
    description: "Unsolicited notify when input changes (TV, HDMI, SCART, Composite, Component, Screen Mirroring, PC RGB)"

  - id: fire_volume_change
    label: Volume Change Notification
    command: "2A 53 4E 56 4F 4C 55 {level:16} 0A"
    params:
      - name: level
        type: string
        description: "16-digit ASCII decimal volume level"
    description: "Unsolicited notify when volume changes"

  - id: fire_mute_change
    label: Mute Change Notification
    command: "2A 53 4E 41 4D 55 54 {mute:16} 0A"
    params:
      - name: mute
        type: enum
        values:
          "0000000000000000": "Unmuted"
          "0000000000000001": "Muted"
    description: "Unsolicited notify when mute state changes"

  - id: fire_pip_change
    label: PIP Change Notification
    command: "2A 53 4E 50 49 50 49 {enable:16} 0A"
    params:
      - name: enable
        type: enum
        values:
          "0000000000000000": "PIP disabled"
          "0000000000000001": "PIP enabled"
    description: "Unsolicited notify when PIP state changes"

  - id: fire_picture_mute_change
    label: Picture Mute Change Notification
    command: "2A 53 4E 50 4D 55 54 {mute:16} 0A"
    params:
      - name: mute
        type: enum
        values:
          "0000000000000000": "Picture mute disabled"
          "0000000000000001": "Picture mute enabled"
    description: "Unsolicited notify when picture mute state changes"
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Binary protocol: every packet is exactly 24 bytes. Header `0x2A 0x53`, footer `0x0A`.
- Type byte determines direction: `C` (0x43) = control command, `E` (0x45) = enquiry/query, `A` (0x41) = answer from TV, `N` (0x4E) = unsolicited notify.
- FourCC function codes are 4 ASCII characters at bytes 3–6.
- Parameter field is 16 ASCII bytes at bytes 7–22. `#` (0x23) = unused/wildcard. `0`–`9` for values. `F` for error responses.
- Answer success = 16 × `0` (0x30). Answer error = 16 × `F` (0x46).
- TCP idle timeout: 30 seconds. Keep-alive or reconnect required for long sessions.
- Simple IP Control must be enabled on the TV via Network > Home Network Setup > IP Control > Simple IP Control (or Hotel/Pro Mode equivalent).
- Source mentions a high-level HTTP/JSON-RPC "WebAPI" but does not document it. All low-level commands are stated to be available via WebAPI as well.
- Protocol version is 0.6 as stated in the source document.
<!-- UNRESOLVED: HTTP/JSON-RPC WebAPI endpoints and format not documented in source -->
<!-- UNRESOLVED: volume range not stated in source (0–??) -->
<!-- UNRESOLVED: maximum HDMI/SCART/etc. port count not stated beyond "1–9999" range -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/xiaolaba/bravia_console_sony/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
retrieved_at: 2026-06-10T00:32:03.029Z
last_checked_at: 2026-06-10T07:35:27.431Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T07:35:27.431Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literally with FourCC codes in Table 4; transport parameters verified; IR table documents only parameter values for setIrccCode, not additional commands. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "HTTP/JSON-RPC WebAPI documented but not detailed in this source"
- "protocol version 0.6 stated — compatibility with other versions unknown"
- "which specific BRAVIA 2014 models beyond KDL-48W585B share this protocol"
- "no base_url or path pattern stated (binary protocol, not HTTP)"
- "no settable variables beyond what actions cover; volume level is set via set_audio_volume action"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "HTTP/JSON-RPC WebAPI endpoints and format not documented in source"
- "volume range not stated in source (0–??)"
- "maximum HDMI/SCART/etc. port count not stated beyond \"1–9999\" range"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
