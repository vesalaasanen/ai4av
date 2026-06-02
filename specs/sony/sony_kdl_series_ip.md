---
spec_id: admin/sony-kdl-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Sony KDL Series (Simple IP Control) Control Spec"
manufacturer: Sony
model_family: "Sony KDL Series (Bravia Professional Displays supporting Simple IP Control)"
aliases: []
compatible_with:
  manufacturers:
    - Sony
  models:
    - "Sony KDL Series (Bravia Professional Displays supporting Simple IP Control)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
  - github.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://helpguide.sony.net/tv/gusltnr1/v1/en-us/07-02_17.html
  - https://github.com/xiaolaba/bravia_console_sony/blob/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-06-02T05:46:23.710Z
last_checked_at: 2026-06-02T05:46:23.710Z
generated_at: 2026-06-02T05:46:23.710Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EU area models ship in 3 RED-DA compliance variants; the source warns that available commands and settings differ per variant, but does not enumerate which commands are missing from which variant."
  - "valid min/max range not stated."
  - "valid range not stated in source. Source example: 41 decimal = '0000000000000029' in the 16-byte param field.\""
  - "source does not document any multi-step sequences."
  - "source does not document safety warnings, interlock procedures, or"
  - "firmware version compatibility not stated in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T05:46:23.710Z
  matched_actions: 17
  action_count: 17
  confidence: medium
  summary: "All 17 spec actions match their FourCC codes in the source command table; transport port 20060 verified; no unrepresented source commands. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Sony KDL Series (Simple IP Control) Control Spec

## Summary
Sony Bravia professional display control via Sony's "Simple IP Control" protocol: 24-byte fixed-length TCP messages on port 20060. Commands cover power, input, volume, mute, picture mute, scene setting, IR pass-through, and network address queries. The protocol uses a Four-CC command name and a 16-byte parameter block; messages begin with `*S` and end with `LF` (`0x0A`).

<!-- UNRESOLVED: EU area models ship in 3 RED-DA compliance variants; the source warns that available commands and settings differ per variant, but does not enumerate which commands are missing from which variant. -->

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
# powerable: setPowerStatus / getPowerStatus / togglePowerStatus
# queryable: getPowerStatus, getAudioVolume, getAudioMute, getInput, getPictureMute, getSceneSetting, getBroadcastAddress, getMacAddress
# routable: setInput / getInput (HDMI/Composite/Component/Screen Mirroring)
# levelable: setAudioVolume / getAudioVolume
powerable: true
queryable: true
routable: true
levelable: true
```

## Actions
```yaml
# All messages are exactly 24 bytes:
#   byte 0     : 0x2A '*' (fixed header, byte 0)
#   byte 1     : 0x53 'S' (fixed header, byte 1)
#   byte 2     : Message Type - 0x43 'C' Control, 0x45 'E' Enquiry, 0x41 'A' Answer, 0x4E 'N' Notify
#   byte 3-6   : FourCC command name (ASCII)
#   byte 7-22  : 16-byte parameter field
#   byte 23    : 0x0A LF (fixed footer)
# Source example (Power Off, 24 bytes):
#   *SCPOWR0000000000000000<LF>

# ----------------- setIrccCode (Control, IR pass-through) -----------------
- id: set_ircc_code
  label: Send IR Remote Control Code
  kind: action
  command: "*SCIRCC{ircc_param_padded_16_bytes}\n"  # 0x2A 0x53 0x43 IRCC <16-byte IR code param> 0x0A
  params:
    - name: ircc_code
      type: enum
      description: |
        IR remote code, encoded as ASCII decimal in the right-most two bytes
        of the 16-byte param field (left-padded with '0' to 16 bytes total).
        Valid values from source: Display, Home, Options, Return, Up, Down,
        Right, Left, Confirm, Red, Green, Yellow, Blue, Num1..Num0,
        Volume Up, Volume Down, Mute, Channel Up, Channel Down, Subtitle,
        DOT, Picture Off, Wide, Jump, Sync Menu, Forward, Play, Rewind,
        Prev, Stop, Next, Pause, Flash Plus, Flash Minus, TV Power, Audio,
        Input, Sleep, Sleep Timer, Video 2, Picture Mode, Demo Surround,
        HDMI 1..HDMI 4, Action Menu, Help.

# ----------------- setPowerStatus (Control) -----------------
- id: set_power_status
  label: Set Power Status
  kind: action
  command: "*SCPOWR000000000000000{value}\n"  # 0x2A 0x53 0x43 POWR 0..0{value} 0x0A
  params:
    - name: value
      type: enum
      values: [0, 1]
      description: "0 = Standby (Off), 1 = Active (On). Encoded as ASCII digit in the final byte of the 16-byte param field."

# ----------------- getPowerStatus (Enquiry) -----------------
- id: get_power_status
  label: Get Power Status
  kind: query
  command: "*SEPOWR################\n"  # 0x2A 0x53 0x45 POWR <16 '#' placeholders> 0x0A
  params: []
  notes: |
    Source: '*SEPOWR' + 16-byte param field (per Enquiry definition, param field
    is filled with '#' = 0x23). Response: '*SAPOWR' + 16-byte answer payload
    where final byte is '0' (Standby) or '1' (Active), or all 'F' on error.

# ----------------- togglePowerStatus (Control) -----------------
- id: toggle_power_status
  label: Toggle Power Status
  kind: action
  command: "*SCTPOW################\n"  # 0x2A 0x53 0x43 TPOW <16 '#' param> 0x0A
  params: []
  notes: "Param field = '#' per source. Response: '*SATPOW' + 16-byte answer ('0...0' success, 'F...F' error)."

# ----------------- setAudioVolume (Control) -----------------
- id: set_audio_volume
  label: Set Audio Volume
  kind: action
  command: "*SCVOLU{volume_padded_16_bytes}\n"  # 0x2A 0x53 0x43 VOLU <16-byte right-aligned decimal volume> 0x0A
  params:
    - name: volume
      type: integer
      description: |
        Audio volume level, encoded as ASCII decimal digits right-aligned in
        the 16-byte param field, left-padded with '0'. Source example:
        volume 41 decimal = '0000000000000029' (the 2 ASCII chars '2' '9' in
        the final two bytes). UNRESOLVED: valid min/max range not stated.

# ----------------- getAudioVolume (Enquiry) -----------------
- id: get_audio_volume
  label: Get Audio Volume
  kind: query
  command: "*SEVOLU################\n"  # 0x2A 0x53 0x45 VOLU <16 '#'> 0x0A
  params: []
  notes: "Response: '*SAVOLU' + 16-byte right-aligned decimal volume value, or 'F...F' on error."

# ----------------- setAudioMute (Control) -----------------
- id: set_audio_mute
  label: Set Audio Mute
  kind: action
  command: "*SCAMUT000000000000000{value}\n"  # 0x2A 0x53 0x43 AMUT 0..0{value} 0x0A
  params:
    - name: value
      type: enum
      values: [0, 1]
      description: "0 = Unmute, 1 = Mute. ASCII digit in the final byte of the 16-byte param field."

# ----------------- getAudioMute (Enquiry) -----------------
- id: get_audio_mute
  label: Get Audio Mute
  kind: query
  command: "*SEAMUT################\n"  # 0x2A 0x53 0x45 AMUT <16 '#'> 0x0A
  params: []
  notes: "Response: '*SAAMUT' + 16-byte answer; final byte '0' = Not Muted, '1' = Muted, all 'F' = Error."

# ----------------- setInput (Control) -----------------
- id: set_input
  label: Set Input
  kind: action
  command: "*SCINPT0000000000{input_type}000{port_padded}\n"  # 0x2A 0x53 0x43 INPT 0..0{type} 0..0{port} 0x0A
  params:
    - name: input_type
      type: enum
      values: ["1", "3", "4", "5"]
      description: "ASCII digit at offset 13 (0-indexed) of the 16-byte param field. 1=HDMI, 3=Composite, 4=Component, 5=Screen Mirroring."
    - name: port
      type: integer
      description: "1-9999, encoded as ASCII decimal right-aligned in the final 4 bytes of the 16-byte param field (offsets 19-22)."

# ----------------- getInput (Enquiry) -----------------
- id: get_input
  label: Get Current Input
  kind: query
  command: "*SEINPT################\n"  # 0x2A 0x53 0x45 INPT <16 '#'> 0x0A
  params: []
  notes: "Response: '*SAINPT' + 16-byte answer with input_type digit at offset 13 ('1'/'3'/'4'/'5') and port (1-9999) in the final 4 bytes. 'N...N' = Not Found, 'F...F' = Error."

# ----------------- setPictureMute (Control) -----------------
- id: set_picture_mute
  label: Set Picture Mute
  kind: action
  command: "*SCPMUT000000000000000{value}\n"  # 0x2A 0x53 0x43 PMUT 0..0{value} 0x0A
  params:
    - name: value
      type: enum
      values: [0, 1]
      description: "0 = Picture mute off (disabled), 1 = Picture mute on (screen black). ASCII digit in the final byte."

# ----------------- getPictureMute (Enquiry) -----------------
- id: get_picture_mute
  label: Get Picture Mute
  kind: query
  command: "*SEPMUT################\n"  # 0x2A 0x53 0x45 PMUT <16 '#'> 0x0A
  params: []
  notes: "Response: '*SAPMUT' + 16-byte answer; final byte '0' = Disabled, '1' = Enabled, 'F...F' = Error."

# ----------------- togglePictureMute (Control) -----------------
- id: toggle_picture_mute
  label: Toggle Picture Mute
  kind: action
  command: "*SCTPMU################\n"  # 0x2A 0x53 0x43 TPMU <16 '#'> 0x0A
  params: []
  notes: "Source describes TPMU as the FourCC. Param field = '#'. Response: '*SATPMU' + 16-byte answer ('0...0' success, 'F...F' error)."

# ----------------- setSceneSetting (Control) -----------------
- id: set_scene_setting
  label: Set Scene Setting
  kind: action
  command: "*SCSCEN{scene_padded_16_bytes}\n"  # 0x2A 0x53 0x43 SCEN <16-byte scene string> 0x0A
  params:
    - name: scene
      type: enum
      values: ["auto", "auto24pSync", "general"]
      description: |
        Case-sensitive scene name, ASCII, right-padded with '#' to fill the
        16-byte param field. Source example: 'auto24pSync#####' (5 trailing
        '#' = 0x23). 16-byte param field holds the 16 ASCII chars.

# ----------------- getSceneSetting (Enquiry) -----------------
- id: get_scene_setting
  label: Get Scene Setting
  kind: query
  command: "*SESCEN################\n"  # 0x2A 0x53 0x45 SCEN <16 '#'> 0x0A
  params: []
  notes: "Response: '*SASCEN' + 16-byte answer with current scene value, or 'N...N' (not available for current input), or 'F...F' (error)."

# ----------------- getBroadcastAddress (Enquiry) -----------------
- id: get_broadcast_address
  label: Get Broadcast IPv4 Address
  kind: query
  command: "*SEBADREth0##########\n"  # 0x2A 0x53 0x45 BADR "Eth0" + 10 '#' 0x0A
  params:
    - name: interface
      type: enum
      values: ["Eth0"]
      description: "Interface tag, ASCII, in bytes 7-10 of the param field. Source example: 'Eth0'. Pad rest of 16-byte param with '#'."
  notes: "Response: '*SABADR' + 16-byte answer containing IPv4 broadcast address, ASCII, right-padded with '#'. 'F...F' = Error."

# ----------------- getMacAddress (Enquiry) -----------------
- id: get_mac_address
  label: Get MAC Address
  kind: query
  command: "*SEMADREth0##########\n"  # 0x2A 0x53 0x45 MADR "Eth0" + 10 '#' 0x0A
  params:
    - name: interface
      type: enum
      values: ["Eth0"]
      description: "Interface tag, ASCII, in bytes 7-10 of the param field. Source example: 'Eth0'. Pad rest of 16-byte param with '#'."
  notes: "Response: '*SAMADR' + 16-byte answer with MAC address, ASCII, right-padded with '#'. 'F...F' = Error."
```

## Feedbacks
```yaml
- id: power_status
  type: enum
  values: [standby, active]
  source: getPowerStatus answer final byte ('0' = standby, '1' = active)

- id: audio_volume
  type: integer
  source: getAudioVolume answer - right-aligned decimal in 16-byte param field

- id: audio_mute
  type: enum
  values: [unmuted, muted]
  source: getAudioMute answer final byte ('0' = unmuted, '1' = muted)

- id: current_input
  type: object
  source: getInput answer - input_type digit at param offset 13 ('1'=HDMI, '3'=Composite, '4'=Component, '5'=Screen Mirroring) plus port 1-9999 in final 4 bytes

- id: picture_mute
  type: enum
  values: [disabled, enabled]
  source: getPictureMute answer final byte ('0' = disabled, '1' = enabled)

- id: scene_setting
  type: string
  source: getSceneSetting answer - ASCII string in 16-byte param field (e.g. 'auto', 'auto24pSync', 'general')

- id: broadcast_address
  type: string
  source: getBroadcastAddress answer - IPv4 broadcast address, ASCII, e.g. '192.168.0.14'

- id: mac_address
  type: string
  source: getMacAddress answer - MAC address, ASCII, right-padded with '#'
```

## Variables
```yaml
- id: ircc_code
  type: enum
  description: |
    IR remote code passed through setIrccCode. Encoded as ASCII decimal
    right-aligned in the final two bytes of the 16-byte param field.
    Source-defined values (one per row in the IR Commands table):
    Display=5, Home=6, Options=7, Return=8, Up=9, Down=10, Right=11, Left=12,
    Confirm=13, Red=14, Green=15, Yellow=16, Blue=17, Num1=18, Num2=19,
    Num3=20, Num4=21, Num5=22, Num6=23, Num7=24, Num8=25, Num9=26, Num0=27,
    Volume Up=30, Volume Down=31, Mute=32, Channel Up=33, Channel Down=34,
    Subtitle=35, DOT=38, Picture Off=50, Wide=61, Jump=62, Sync Menu=76,
    Forward=77, Play=78, Rewind=79, Prev=80, Stop=81, Next=82, Pause=84,
    Flash Plus=86, Flash Minus=87, TV Power=98, Audio=99, Input=101,
    Sleep=104, Sleep Timer=105, Video 2=108, Picture Mode=110,
    Demo Surround=121, HDMI 1=124, HDMI 2=125, HDMI 3=126, HDMI 4=127,
    Action Menu=129, Help=130.

- id: audio_volume
  type: integer
  description: "UNRESOLVED: valid range not stated in source. Source example: 41 decimal = '0000000000000029' in the 16-byte param field."

- id: input_port
  type: integer
  range: "1-9999"
  description: "Input port number for setInput / reported by getInput / fireInputChange. Encoded as ASCII decimal in the final 4 bytes of the 16-byte param field."
```

## Events
```yaml
# All Notify (0x4E 'N') messages: header 0x2A 0x53, type 0x4E, fourCC, 16-byte param, footer 0x0A.
- id: power_change
  source: "0x2A 0x53 0x4E POWR <16 bytes> 0x0A"
  description: "Sent when power state changes. Final byte of param: '0' = powering off, '1' = powering on."

- id: input_change
  source: "0x2A 0x53 0x4E INPT <16 bytes> 0x0A"
  description: "Sent when input changes. Final byte '0' (transition/no port) or input_type digit at offset 13 plus 1-9999 port in final 4 bytes."

- id: volume_change
  source: "0x2A 0x53 0x4E VOLU <16 bytes> 0x0A"
  description: "Sent when volume changes. 16-byte param contains the new volume value (right-aligned decimal)."

- id: mute_change
  source: "0x2A 0x53 0x4E AMUT <16 bytes> 0x0A"
  description: "Sent when mute state changes. Final byte: '0' = unmuting, '1' = muting."

- id: picture_mute_change
  source: "0x2A 0x53 0x4E PMUT <16 bytes> 0x0A"
  description: "Sent when picture mute state changes. Final byte: '0' = picture mute enabled, '1' = picture mute disabled."
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step sequences.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not document safety warnings, interlock procedures, or
# power-on sequencing requirements. EU RED-DA compliance variants exist
# (3 variants) and may omit certain commands; the source does not enumerate
# the differences.
```

## Notes
- **Message format is fixed 24 bytes** for every request and every answer. Header `0x2A 0x53` (`*S`), one-byte message type, four ASCII command bytes, 16 parameter bytes, footer `0x0A` (LF). The source power-off example string `*SCPOWR0000000000000000` shows 23 visible bytes; the trailing byte is the LF footer (`0x0A`).
- **Param field padding convention**: unused bytes inside the 16-byte parameter field are filled with `#` (`0x23`) for both Enquiry messages and certain Control messages. The 16th byte (offset 22) often carries a single ASCII digit value (e.g. `'0'`/`'1'`) for on/off style controls.
- **Padding for setAudioVolume**: decimal digits are right-aligned; the example `0000000000000029` represents 41 (0x29 = 41). Source does not state a max.
- **IR pass-through**: setIrccCode (`C IRCC`) sends an arbitrary IR remote button press; the 47 supported codes (Display, Home, Num0..9, Volume Up/Down, Mute, Channel Up/Down, transport keys, HDMI 1..4, etc.) are encoded as ASCII decimal in the final two bytes of the 16-byte param field.
- **Scene Setting strings** (`auto`, `auto24pSync`, `general`) are case-sensitive and right-padded with `#` to fill the 16-byte param field.
- **EU region caveat**: 3 RED-DA compliance variants exist; available settings and commands differ per variant and are not enumerated in the source.
- **Required monitor settings** to enable Simple IP Control: `Settings → Network & Internet → Remote device settings → Control remotely`, and `Settings → Network & Internet → Home network → IP control → Simple IP control`.
- **Wired and wireless LAN** are both supported; the device IP must be reachable on TCP port 20060.
- **No authentication**: the protocol exposes port 20060 with no login. Operators are responsible for network-level access control.
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Provenance

```yaml
source_domains:
  - pro-bravia.sony.net
  - helpguide.sony.net
  - github.com
source_urls:
  - https://pro-bravia.sony.net/remote-display-control/simple-ip-control/
  - https://helpguide.sony.net/tv/gusltnr1/v1/en-us/07-02_17.html
  - https://github.com/xiaolaba/bravia_console_sony/blob/master/Sony_Simple_IP_Control_Protocol_for_BRAVIA.pdf
  - https://pro-bravia.sony.net/remote-display-control/rest-api/
retrieved_at: 2026-06-02T05:46:23.710Z
last_checked_at: 2026-06-02T05:46:23.710Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T05:46:23.710Z
matched_actions: 17
action_count: 17
confidence: medium
summary: "All 17 spec actions match their FourCC codes in the source command table; transport port 20060 verified; no unrepresented source commands. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EU area models ship in 3 RED-DA compliance variants; the source warns that available commands and settings differ per variant, but does not enumerate which commands are missing from which variant."
- "valid min/max range not stated."
- "valid range not stated in source. Source example: 41 decimal = '0000000000000029' in the 16-byte param field.\""
- "source does not document any multi-step sequences."
- "source does not document safety warnings, interlock procedures, or"
- "firmware version compatibility not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
