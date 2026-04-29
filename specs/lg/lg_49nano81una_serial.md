---
schema_version: ai4av-public-spec-v1
device_id: lg/49nano81una
entity_id: lg_49nano81una
spec_id: admin/lg-49nano81una
revision: 1
author: admin
title: "LG 49NANO81UNA Control Spec"
status: published
manufacturer: LG
manufacturer_key: lg
model_family: 49NANO81UNA
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - 49NANO81UNA
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: lg_49nano81una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:36.229Z
retrieved_at: 2026-04-25T20:58:36.229Z
last_checked_at: 2026-04-25T20:58:36.229Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-25T20:58:36.229Z
  matched_actions: 27
  action_count: 33
  confidence: high
  summary: "All 27 spec actions matched literal wire tokens; all transport values (9600 baud, telnet/9761) verified verbatim."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-18
---

# LG 49NANO81UNA Control Spec

## Summary
LG 49NANO81UNA is a 49-inch NanoCell 4K TV controllable via RS-232C serial or TCP/IP (Telnet). The serial protocol uses ASCII-encoded hex command frames `[Command1][Command2][ ][Set ID][ ][Data][Cr]`. The TCP protocol uses plaintext commands over Telnet on port 9761. This spec covers power, volume, picture adjustments, input selection, channel tuning, and IR key emulation.

<!-- UNRESOLVED: TCP/IP control is documented as "For USA only" — availability on other region models is unknown -->
<!-- UNRESOLVED: USB-to-Serial converter only works when TV is powered on; RS-232C cable works in standby -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: not stated, assumed none
  connection_types:
    - DE9 D-Sub 9pin female-to-female
    - phone jack to RS-232
    - USB to Serial (PL2303 chip, VID 0x0557 PID 0x2008)
  pinout_3wire:
    pc_tx_to_tv_rx: 2→3  # DE9 pin 2 to DE9 pin 3
    pc_rx_to_tv_tx: 3→2  # DE9 pin 3 to DE9 pin 2
    gnd: 5→5
  framing:
    format: "[Command1][Command2][ ][Set ID][ ][Data][Cr]"
    command1_chars: ["j", "k", "m", "x"]
    set_id_range: "0x00-0x63 (decimal 1-99; 0=broadcast all)"
    data_encoding: hexadecimal ASCII
    cr: "0x0D"
    space: "0x20"
    read_status_data: "FF"
  ack_ok: "[Command2][ ][Set ID][ ][OK][Data][x]"
  ack_error: "[Command2][ ][Set ID][ ][NG][Data][x]"
addressing:
  port: 9761
  protocol: telnet
  # UNRESOLVED: TCP control requires enabling "Network IP Control" via TV menu (Settings > hold 5s > 828)
auth:
  type: none  # inferred: no auth procedure for serial; TCP telnet has no login
```

## Traits
```yaml
traits:
  - powerable     # power on/off commands present (ka / POWER)
  - levelable     # volume, contrast, brightness, color, tint, sharpness, bass, treble, balance, backlight
  - routable      # input select (xb / INPUT_SELECT), tune command (ma / CHANNEL_SETTING)
  - queryable     # send FF data to read current status of any command
```

## Actions
```yaml
actions:
  - id: power_control
    label: Power Control
    kind: action
    serial_cmd: "ka"
    tcp_cmd: "POWER"
    params:
      - name: state
        type: enum
        values:
          "00": "power off"
          "01": "power on"
    query: "FF"

  - id: aspect_ratio
    label: Aspect Ratio
    kind: action
    serial_cmd: "kc"
    tcp_cmd: "ASPECT_RATIO"
    params:
      - name: mode
        type: enum
        values:
          "01": "Normal screen"
          "02": "Wide screen (16:9)"
          "04": "Zoom"
          "05": "Zoom 2"
          "06": "Set by Program"
          "07": "14:9 (4:3)"
          "09": "Just Scan"
          "0B": "Full Wide"
          "10-1F": "Cinema Zoom 1-16"
          "0c": "21:9"
        tcp_values: ["4by3", "16by9", "setbyoriginal"]

  - id: screen_mute
    label: Screen Mute
    kind: action
    serial_cmd: "kd"
    tcp_cmd: "SCREEN_MUTE"
    params:
      - name: mode
        type: enum
        values:
          "00": "Screen mute off (picture on), video mute off"
          "01": "Screen mute on (picture off)"
          "10": "Video mute on"
        tcp_values: ["screenmuteon", "videomuteon", "allmuteoff"]

  - id: volume_mute
    label: Volume Mute
    kind: action
    serial_cmd: "ke"
    tcp_cmd: "VOLUME_MUTE"
    params:
      - name: state
        type: enum
        values:
          "00": "Mute on (volume off)"
          "01": "Mute off (volume on)"
        tcp_values: ["on", "off"]

  - id: volume_control
    label: Volume Control
    kind: action
    serial_cmd: "kf"
    tcp_cmd: "VOLUME_CONTROL"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Volume level (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: contrast
    label: Contrast
    kind: action
    serial_cmd: "kg"
    tcp_cmd: "PICTURE_CONTRAST"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Contrast level (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: brightness
    label: Brightness
    kind: action
    serial_cmd: "kh"
    tcp_cmd: "PICTURE_BRIGHTNESS"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Brightness level (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: color
    label: Color
    kind: action
    serial_cmd: "ki"
    tcp_cmd: "PICTURE_COLOUR"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Color level (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: tint
    label: Tint
    kind: action
    serial_cmd: "kj"
    tcp_cmd: "PICTURE_TINT"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Tint level (serial: 0x00-0x64 hex, red to green; TCP: 0-100 decimal)"

  - id: sharpness
    label: Sharpness
    kind: action
    serial_cmd: "kk"
    tcp_cmd: "PICTURE_SHARPNESS"
    params:
      - name: level
        type: integer
        min: 0
        max: 50
        serial_max: 50
        description: "Sharpness level (serial: 0x00-0x32 hex; TCP: 0-50 decimal)"

  - id: osd_select
    label: OSD Select
    kind: action
    serial_cmd: "kl"
    tcp_cmd: "OSD_SELECT"
    params:
      - name: state
        type: enum
        values:
          "00": "OSD off"
          "01": "OSD on"
        tcp_values: ["off", "on"]

  - id: remote_control_lock
    label: Remote Control Lock Mode
    kind: action
    serial_cmd: "km"
    tcp_cmd: "REMOTECONTROLER_LOCK"
    params:
      - name: state
        type: enum
        values:
          "00": "Lock off"
          "01": "Lock on"
        tcp_values: ["off", "on"]

  - id: treble
    label: Treble
    kind: action
    serial_cmd: "kr"
    tcp_cmd: "AUDIO_TREBLE"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Treble level (serial: 0x00-0x64 hex)"

  - id: bass
    label: Bass
    kind: action
    serial_cmd: "ks"
    tcp_cmd: "AUDIO_BASS"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Bass level (serial: 0x00-0x64 hex)"

  - id: balance
    label: Balance
    kind: action
    serial_cmd: "kt"
    tcp_cmd: "AUDIO_BALANCE"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Balance level (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: color_temperature
    label: Color Temperature
    kind: action
    serial_cmd: "xu"
    tcp_cmd: "PICTURE_COLOUR_TEMPERATURE"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Color temperature (serial: 0x00-0x64 hex; TCP: 0-100 decimal)"

  - id: energy_saving
    label: Energy Saving
    kind: action
    serial_cmd: "jq"
    tcp_cmd: "ENERGY_SAVING"
    params:
      - name: mode
        type: enum
        values:
          "00": "Off"
          "01": "Minimum"
          "02": "Medium"
          "03": "Maximum"
          "04": "Auto / Intelligent sensor"
          "05": "Screen off"
        tcp_values: ["off", "minimum", "medium", "maximum", "screenoff"]

  - id: tune_channel
    label: Tune Channel
    kind: action
    serial_cmd: "ma"
    tcp_cmd: "CHANNEL_SETTING_ATSC_ATV / CHANNEL_SETTING_ATSC_DTV"
    params:
      - name: data
        type: string
        description: "Multi-byte hex: Data00-Data05 encoding channel number, major/minor, and input source (ATV/CATV/DTV/CADTV/Satellite)"
    note: "Complex multi-byte encoding varies by region and signal type (ATSC/DVB/ISDB)"

  - id: channel_add_delete
    label: Channel Add/Delete/Skip
    kind: action
    serial_cmd: "mb"
    tcp_cmd: "CHANNEL_ADD_DELETE"
    params:
      - name: state
        type: enum
        values:
          "00": "Delete/Skip"
          "01": "Add"
        tcp_values: ["delete", "add"]

  - id: key_action
    label: IR Key Emulation
    kind: action
    serial_cmd: "mc"
    tcp_cmd: "KEY_ACTION"
    params:
      - name: key_code
        type: enum
        values:
          "00": "CH+"
          "01": "CH-"
          "02": "Volume+"
          "03": "Volume-"
          "06": "Arrow Right"
          "07": "Arrow Left"
          "08": "Power"
          "09": "Mute"
          "0B": "Input"
          "0E": "Sleep"
          "0F": "TV/RAD"
          "10-19": "Number 0-9"
          "1A": "Q.View"
          "1E": "Favorite"
          "20": "Teletext"
          "28": "Return/Back"
          "30": "AV Mode"
          "39": "Caption/Subtitle"
          "40": "Arrow Up"
          "41": "Arrow Down"
          "42": "My Apps"
          "43": "Menu/Settings"
          "44": "OK/Enter"
          "45": "Q.Menu"
          "53": "List"
          "5B": "Exit"
          "60": "PIP(AD)"
          "61": "Blue"
          "63": "Yellow"
          "71": "Green"
          "72": "Red"
          "79": "Aspect Ratio"
          "7C": "Smart/Home"
          "7E": "SIMPLINK"
          "8E": "Forward"
          "8F": "Rewind"
          "AA": "Info"
          "AB": "Program Guide"
          "B0": "Play"
          "B1": "Stop"
          "BA": "Pause"
        tcp_values: ["exit", "channelup", "channeldown", "volumeup", "volumedown", "arrowright", "arrowleft", "volumemute", "deviceinput", "sleepreserve", "livetv", "previouschannel", "favoritechannel", "teletext", "returnback", "avmode", "captionsubtitle", "arrowup", "arrowdown", "myapp", "settingmenu", "ok", "quickmenu", "smarthome", "simplelink", "fastforward", "rewind", "programminfo", "programguide", "play", "slowplay", "record", "3d", "autoconfig", "app", "screenbright", "number0", "number1", "number2", "number3", "number4", "number5", "number6", "number7", "number8", "number9"]

  - id: backlight_control
    label: Backlight Control
    kind: action
    serial_cmd: "mg"
    tcp_cmd: "PICTURE_BACKLIGHT"
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        serial_max: 100
        description: "Backlight level (serial: 0x00-0x64 hex; TCP: 0-100 decimal). Precondition: Energy Saving off."

  - id: input_select
    label: Input Select
    kind: action
    serial_cmd: "xb"
    tcp_cmd: "INPUT_SELECT"
    params:
      - name: input
        type: enum
        values:
          "00": "DTV"
          "01": "CADTV"
          "02": "Satellite DTV"
          "10": "ATV"
          "11": "CATV"
          "20": "AV/AV1"
          "21": "AV2"
          "40": "Component1"
          "41": "Component2"
          "60": "RGB"
          "90": "HDMI1"
          "91": "HDMI2"
          "92": "HDMI3"
          "93": "HDMI4"
        tcp_values: ["dtv", "atv", "cadtv", "catv", "avav1", "component1", "hdmi1", "hdmi2", "hdmi3"]

  - id: auto_configure
    label: Auto Configure
    kind: action
    serial_cmd: "ju"
    tcp_cmd: null  # UNRESOLVED: not listed in TCP command reference
    params:
      - name: execute
        type: enum
        values:
          "01": "Execute auto configure"
    note: "Only works in RGB (PC) mode"

  - id: ism_method
    label: ISM Method
    kind: action
    serial_cmd: "jp"
    tcp_cmd: null  # UNRESOLVED: not listed in TCP command reference
    params:
      - name: mode
        type: enum
        values:
          "02": "Orbiter"
          "08": "Normal"
          "20": "Color Wash"
    note: "Plasma TV only"

  - id: equalizer
    label: Equalizer
    kind: action
    serial_cmd: "jv"
    tcp_cmd: "AUDIO_EQUALIZER"
    params:
      - name: band
        type: integer
        min: 1
        max: 5
        description: "Frequency band (1-5)"
      - name: step
        type: integer
        min: 0
        max: 20
        description: "EQ step value"
    note: "Sound mode must be set to EQ adjustable"

  - id: three_d
    label: 3D Control
    kind: action
    serial_cmd: "xt"
    tcp_cmd: "PICTURE_3D"
    params:
      - name: mode
        type: enum
        values:
          "00": "3D On"
          "01": "3D Off"
          "02": "3D to 2D"
          "03": "2D to 3D"
      - name: pattern
        type: enum
        values:
          "00": "Top and Bottom"
          "01": "Side by Side"
          "02": "Check Board"
          "03": "Frame Sequential"
          "04": "Column interleaving"
          "05": "Row interleaving"
      - name: direction
        type: enum
        values:
          "00": "Right to Left"
          "01": "Left to Right"
      - name: depth
        type: integer
        min: 0
        max: 20
        description: "3D effect depth (hex 00-14)"
    note: "3D models only. Parameter applicability depends on mode selection."

  - id: three_d_extended
    label: Extended 3D
    kind: action
    serial_cmd: "xv"
    tcp_cmd: "PICTURE_3D_EXTENSION"
    params:
      - name: option
        type: enum
        values:
          "00": "3D Picture Correction"
          "01": "3D Depth"
          "02": "3D Viewpoint"
          "06": "3D Color Correction"
          "07": "3D Sound Zooming"
          "08": "Normal Image View"
          "09": "3D Mode (Genre)"
      - name: value
        type: string
        description: "Varies per option; range 0-20 for depth/viewpoint, 0-1 for on/off options, 0-5 for genre"
    note: "3D models only. Precondition: 3D must be active."
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    type: enum
    values: ["on", "off"]
    query_serial: "ka [SetID] FF"
    ack_format: "a [SetID] OK [Data] x"
    data_mapping:
      "00": "off"
      "01": "on"

  - id: volume_level
    label: Volume Level
    type: integer
    range: [0, 100]
    query_serial: "kf [SetID] FF"
    ack_format: "f [SetID] OK [Data] x"

  - id: mute_state
    label: Mute State
    type: enum
    values: ["muted", "unmuted"]
    query_serial: "ke [SetID] FF"
    ack_format: "e [SetID] OK [Data] x"
    data_mapping:
      "00": "muted"
      "01": "unmuted"

  - id: input_source
    label: Input Source
    type: enum
    query_serial: "xb [SetID] FF"
    ack_format: "b [SetID] OK [Data] x"

  - id: aspect_ratio_state
    label: Aspect Ratio
    type: enum
    query_serial: "kc [SetID] FF"
    ack_format: "c [SetID] OK [Data] x"

  - id: backlight_level
    label: Backlight Level
    type: integer
    range: [0, 100]
    query_serial: "mg [SetID] FF"
    ack_format: "g [SetID] OK [Data] x"

  # UNRESOLVED: query responses for contrast, brightness, color, tint, sharpness,
  #   treble, bass, balance, color temperature, energy saving follow same pattern
  #   (send FF as data) but specific ack mappings not individually documented
```

## Variables
```yaml
# All level-based commands (volume, contrast, brightness, color, tint, sharpness,
# bass, treble, balance, backlight, color temperature) function as settable variables.
# They are represented above as Actions with integer params and queryable via FF data.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification protocol described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - note: "During media playback or recording, all commands except Power (ka) and Key (mc) are rejected with NG"
  - note: "Remote control lock: when key lock is on and TV is in standby (DC off), TV will not respond to IR or local key power on"
  - note: "USB-to-Serial converter only supports ka command when TV is off; RS-232C cable supports ka in both on and off states"
# UNRESOLVED: no explicit safety warnings or interlock sequences beyond command restrictions
```

## Notes
- Commands use two-character command codes: first character selects command group (`j`, `k`, `m`, `x`), second character selects specific function.
- Set ID 0 (0x00) broadcasts to all connected TVs; range 1-99 for individual addressing.
- The serial and TCP protocols expose the same functions but use different syntax: serial uses compact hex codes, TCP uses human-readable keyword strings.
- TCP/IP control requires enabling "Network IP Control" in the TV menu (Settings button hold 5s on Live TV screen, then enter code 828). Documented as "For USA only."
- Acknowledgement format: `[Command2] [SetID] OK/NG [Data] x` for serial; `OK` or `NG` plaintext for TCP.
- Many commands have model-dependent availability noted in the source.
- Tune command (ma) has complex region-specific encoding (ATSC/DVB/ISDB) with multi-byte data fields.

<!-- UNRESOLVED: exact list of available inputs per model variant not confirmed -->
<!-- UNRESOLVED: TCP command syntax for treble (kr) and bass (ks) not explicitly shown in TCP reference -->
<!-- UNRESOLVED: response timing / latency characteristics not documented -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP not stated -->
<!-- UNRESOLVED: whether TCP control is available on non-USA models -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: lg_49nano81una_serial.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-25T20:58:36.229Z
retrieved_at: 2026-04-25T20:58:36.229Z
last_checked_at: 2026-04-25T20:58:36.229Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T20:58:36.229Z
matched_actions: 27
action_count: 33
confidence: high
summary: "All 27 spec actions matched literal wire tokens; all transport values (9600 baud, telnet/9761) verified verbatim."
```

## Known Gaps

```yaml
[]
```
