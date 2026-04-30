---
schema_version: ai4av-public-spec-v1
device_id: viewsonic/cdx5562-series
entity_id: viewsonic_cdx5562_series
spec_id: admin/viewsonic-cdx5562-series
revision: 1
author: admin
title: "Viewsonic CDX5562 Series Control Spec"
status: published
manufacturer: Viewsonic
manufacturer_key: viewsonic
model_family: "CDX5562 Series"
aliases: []
compatible_with:
  manufacturers:
    - Viewsonic
  models:
    - "CDX5562 Series"
  firmware: ""  # UNRESOLVED: firmware version not stated in source
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "Viewsonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "Viewsonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-29T11:21:31.073Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-29T11:21:31.073Z
  matched_actions: 61
  action_count: 62
  confidence: high
  summary: "All 61 verifiable spec commands matched literally in source tables; transport parameters verified verbatim; complete coverage of source command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Viewsonic CDX5562 Series Control Spec

## Summary
Viewsonic CDX5562 Series commercial TV / digital signage controlled via RS-232C serial interface. Protocol supports Set-Function (write), Get-Function (read), and IR pass-through modes. Commands are ASCII-based 9-byte packets with device ID addressing for multi-display installations.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: network/TCP control not described; only RS-232C covered -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
  connector: DSUB-9-pin-male
  pinout:
    2: RXD
    3: TXD
    5: GND
  cable: null_modem
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable     # power on/standby commands
  - queryable     # get-function commands return state values
  - routable      # input select command routes sources
  - levelable     # brightness, contrast, volume, bass, treble, balance, color, tint, sharpness
```

## Actions
```yaml
actions:
  - id: power_set
    label: Power On/Standby
    kind: action
    command_code: "!"  # 0x21
    params:
      - name: state
        type: enum
        values:
          - "000"  # standby
          - "001"  # on
        description: "000=standby, 001=on"

  - id: input_select
    label: Input Select
    kind: action
    command_code: "\""  # 0x22
    params:
      - name: source
        type: enum
        values:
          - "000"  # TV
          - "001"  # AV
          - "002"  # S-Video
          - "003"  # YPbPr
          - "004"  # HDMI1
          - "014"  # HDMI2
          - "024"  # HDMI3
          - "034"  # HDMI4
          - "005"  # DVI
          - "006"  # VGA1
          - "016"  # VGA2
          - "026"  # VGA3
          - "007"  # Slot-in PC (OPS/SDM)/HDBT
          - "008"  # Internal memory
          - "009"  # DP
          - "00A"  # Embedded/Main (Android)
        description: Three ASCII bytes selecting input source

  - id: brightness_set
    label: Set Brightness
    kind: action
    command_code: "$"  # 0x24
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: Brightness value 000-100

  - id: power_lock
    label: Power Lock
    kind: action
    command_code: "4"  # 0x34
    params:
      - name: state
        type: enum
        values:
          - "000"  # unlock
          - "001"  # lock

  - id: volume_set
    label: Set Volume
    kind: action
    command_code: "5"  # 0x35
    params:
      - name: level
        type: string
        description: "000-100 for absolute, 900=down(-1), 901=up(+1)"

  - id: mute_set
    label: Set Mute
    kind: action
    command_code: "6"  # 0x36
    params:
      - name: state
        type: enum
        values:
          - "000"  # off
          - "001"  # on

  - id: button_lock
    label: Button Lock
    kind: action
    command_code: "8"  # 0x38
    params:
      - name: state
        type: enum
        values:
          - "000"  # unlock
          - "001"  # lock

  - id: menu_lock
    label: Menu Lock
    kind: action
    command_code: ">"  # 0x3E
    params:
      - name: state
        type: enum
        values:
          - "000"  # unlock
          - "001"  # lock

  - id: remote_control_set
    label: Remote Control Mode
    kind: action
    command_code: "B"  # 0x42
    params:
      - name: mode
        type: enum
        values:
          - "000"  # disable
          - "001"  # enable
          - "002"  # pass through
        description: "Disable=RCU no function, Enable=normal RCU, Pass through=bypass RC code to RS232"

  - id: contrast_set
    label: Set Contrast
    kind: action
    command_code: "#"  # 0x23
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: sharpness_set
    label: Set Sharpness
    kind: action
    command_code: "%"  # 0x25
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: color_set
    label: Set Color
    kind: action
    command_code: "&"  # 0x26
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: tint_set
    label: Set Tint
    kind: action
    command_code: "'"  # 0x27
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: color_mode_set
    label: Set Color Mode
    kind: action
    command_code: ")"  # 0x29
    params:
      - name: mode
        type: enum
        values:
          - "000"  # normal
          - "001"  # warm
          - "002"  # cold
          - "003"  # personal

  - id: surround_set
    label: Set Surround Sound
    kind: action
    command_code: "-"  # 0x2D
    params:
      - name: state
        type: enum
        values:
          - "000"  # off
          - "001"  # on

  - id: bass_set
    label: Set Bass
    kind: action
    command_code: "."  # 0x2E
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: treble_set
    label: Set Treble
    kind: action
    command_code: "/"  # 0x2F
    params:
      - name: level
        type: integer
        min: 0
        max: 100

  - id: balance_set
    label: Set Balance
    kind: action
    command_code: "0"  # 0x30
    params:
      - name: level
        type: integer
        min: 0
        max: 100
        description: 050 is center

  - id: picture_size_set
    label: Set Picture Size
    kind: action
    command_code: "1"  # 0x31
    params:
      - name: mode
        type: enum
        values:
          - "000"  # FULL (16:9)
          - "001"  # NORMAL (4:3)
          - "002"  # REAL (1:1)

  - id: osd_language_set
    label: Set OSD Language
    kind: action
    command_code: "2"  # 0x32
    params:
      - name: language
        type: enum
        values:
          - "000"  # English
          - "001"  # French
          - "002"  # Spanish

  - id: pip_mode_set
    label: Set PIP Mode
    kind: action
    command_code: "9"  # 0x39
    params:
      - name: mode
        type: enum
        values:
          - "000"  # off
          - "001"  # PIP (POP)
          - "002"  # PBP

  - id: pip_sound_select
    label: Set PIP Sound Select
    kind: action
    command_code: ":"  # 0x3A
    params:
      - name: source
        type: enum
        values:
          - "000"  # main
          - "001"  # PIP (POP)

  - id: pip_position_set
    label: Set PIP Position
    kind: action
    command_code: ";"  # 0x3B
    params:
      - name: position
        type: enum
        values:
          - "000"  # up
          - "001"  # down
          - "002"  # left
          - "003"  # right

  - id: pip_input_select
    label: Set PIP Input
    kind: action
    command_code: "7"  # 0x37
    params:
      - name: source
        type: enum
        values:
          - "000"  # TV
          - "001"  # AV
          - "002"  # S-Video
          - "003"  # YPbPr
          - "004"  # HDMI1
          - "014"  # HDMI2
          - "024"  # HDMI3
          - "034"  # HDMI4
          - "005"  # DVI
          - "006"  # VGA1
          - "016"  # VGA2
          - "026"  # VGA3
          - "007"  # Slot-in PC (OPS/SDM)/HDBT
          - "008"  # Internal memory
          - "009"  # DP
          - "00A"  # Embedded/Main (Android)
        description: Same value range as input_select

  - id: number_set
    label: Set Channel Number
    kind: action
    command_code: "@"  # 0x40
    params:
      - name: number
        type: integer
        min: 0
        max: 9
        description: Three ASCII bytes 000-009

  - id: key_pad
    label: Key Pad Emulation
    kind: action
    command_code: "A"  # 0x41
    params:
      - name: key
        type: enum
        values:
          - "000"  # UP
          - "001"  # DOWN
          - "002"  # LEFT
          - "003"  # RIGHT
          - "004"  # ENTER
          - "005"  # INPUT
          - "006"  # MENU/(EXIT)
          - "007"  # EXIT

  - id: tiling_mode_set
    label: Set Tiling Mode
    kind: action
    command_code: "P"  # 0x50
    params:
      - name: state
        type: enum
        values:
          - "000"  # off
          - "001"  # on
        description: For video wall

  - id: tiling_compensation_set
    label: Set Tiling Compensation
    kind: action
    command_code: "Q"  # 0x51
    params:
      - name: state
        type: enum
        values:
          - "000"  # off
          - "001"  # on
        description: Bezel width compensation for video wall

  - id: tiling_hxv_set
    label: Set Tiling H by V Monitors
    kind: action
    command_code: "R"  # 0x52
    params:
      - name: config
        type: string
        description: "01x-09x for H, 0x1-0x9 for V; 2nd digit=H monitors, 3rd digit=V monitors"

  - id: tiling_position_set
    label: Set Tiling Position
    kind: action
    command_code: "S"  # 0x53
    params:
      - name: position
        type: integer
        min: 1
        max: 25
        description: Position number for video wall

  - id: date_year_set
    label: Set Date Year
    kind: action
    command_code: "V"  # 0x56
    params:
      - name: year
        type: string
        description: "Y17-Y99 (last 2 digits, 2017-2099)"

  - id: date_month_set
    label: Set Date Month
    kind: action
    command_code: "V"  # 0x56
    params:
      - name: month
        type: string
        description: "M01-M12"

  - id: date_day_set
    label: Set Date Day
    kind: action
    command_code: "V"  # 0x56
    params:
      - name: day
        type: string
        description: "D01-D31"

  - id: time_hour_set
    label: Set Time Hour
    kind: action
    command_code: "W"  # 0x57
    params:
      - name: hour
        type: string
        description: "H00-H23 (24-hr format)"

  - id: time_min_set
    label: Set Time Minute
    kind: action
    command_code: "W"  # 0x57
    params:
      - name: minute
        type: string
        description: "M00-M59"

  - id: time_sec_set
    label: Set Time Second
    kind: action
    command_code: "W"  # 0x57
    params:
      - name: second
        type: string
        description: "S00-S59"
```

## Feedbacks
```yaml
feedbacks:
  - id: ack_response
    type: enum
    values: ["+", "-"]
    description: "+ (0x2B) = command accepted, - (0x2D) = command rejected

  - id: contrast_get
    type: integer
    command_code: "a"  # 0x61
    range: [0, 100]

  - id: brightness_get
    type: integer
    command_code: "b"  # 0x62
    range: [0, 100]

  - id: sharpness_get
    type: integer
    command_code: "c"  # 0x63
    range: [0, 100]

  - id: color_get
    type: integer
    command_code: "d"  # 0x64
    range: [0, 100]

  - id: tint_get
    type: integer
    command_code: "e"  # 0x65
    range: [0, 100]

  - id: volume_get
    type: integer
    command_code: "f"  # 0x66
    range: [0, 100]

  - id: mute_get
    type: enum
    command_code: "g"  # 0x67
    values:
      - "000"  # off (unmuted)
      - "001"  # on (muted)

  - id: input_get
    type: enum
    command_code: "j"  # 0x6A
    description: Returns current input; value range same as input_select

  - id: power_status_get
    type: enum
    command_code: "l"  # 0x6C
    values:
      - "000"  # standby
      - "001"  # on

  - id: remote_control_get
    type: enum
    command_code: "n"  # 0x6E
    values:
      - "000"  # disable
      - "001"  # enable
      - "002"  # pass through

  - id: power_lock_get
    type: enum
    command_code: "o"  # 0x6F
    values:
      - "000"  # unlock
      - "001"  # lock

  - id: button_lock_get
    type: enum
    command_code: "p"  # 0x70
    values:
      - "000"  # unlock
      - "001"  # lock

  - id: menu_lock_get
    type: enum
    command_code: "q"  # 0x71
    values:
      - "000"  # unlock
      - "001"  # lock

  - id: pip_mode_get
    type: enum
    command_code: "t"  # 0x74
    values:
      - "000"  # off
      - "001"  # PIP (POP)
      - "002"  # PBP

  - id: pip_input_get
    type: enum
    command_code: "u"  # 0x75
    description: Returns current PIP input; value range same as input_select

  - id: tiling_mode_get
    type: enum
    command_code: "v"  # 0x76
    values:
      - "000"  # off
      - "001"  # on

  - id: tiling_compensation_get
    type: enum
    command_code: "w"  # 0x77
    values:
      - "000"  # off
      - "001"  # on

  - id: tiling_hxv_get
    type: string
    command_code: "x"  # 0x78
    description: "01x-09x=H monitors, 0x1-0x9=V monitors"

  - id: tiling_position_get
    type: integer
    command_code: "y"  # 0x79
    range: [0, 25]

  - id: comm_link_test
    type: fixed
    command_code: "z"  # 0x7A
    description: ACK test; response is always 000

  - id: thermal_get
    type: integer
    command_code: "0"  # 0x30
    description: Temperature in degrees C; 000-100=positive, -01 to -99=negative. Specific models only.

  - id: power_log_get
    type: string
    command_code: "1"  # 0x31
    description: Power on/off log. Specific models only.

  - id: date_get
    type: string
    command_code: "2"  # 0x32
    description: "Returns Y/M/D format. See date set commands."

  - id: time_get
    type: string
    command_code: "3"  # 0x33
    description: "Returns H/M/S format. See time set commands."

  - id: rs232_version_get
    type: string
    command_code: "6"  # 0x36
    description: RS232 protocol version 0.0.1-9.9.9
```

## Variables
```yaml
variables:
  - id: device_id
    type: integer
    min: 1
    max: 255
    default: 1
    description: Monitor ID for RS232C multi-display addressing
```

## Events
```yaml
events:
  - id: ir_passthrough
    description: >-
      When remote control pass-through mode is active (mode 002), the display
      sends a 7-byte packet (command type "p") containing 2-byte RCU code
      when an IR remote key is pressed. Display does not react to RCU itself.
    payload:
      command_type: "p"  # 0x70
      rcu_code_msb: byte
      rcu_code_lsb: byte
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
notes: >-
  Power lock (command "4", value 001) prevents power key response under IR
  pass-through mode. When IR POWER received: if OFF, display turns ON then
  forwards code; if ON, display forwards code then turns OFF.
```

## Notes
- Packet format: 9 bytes ASCII — Length(1) + ID(2) + CommandType(1) + Command(1) + Value(3) + CR(1)
- Set-Function uses command type "s" (0x73); Get-Function uses "g" (0x67)
- Valid reply for Set: "+" (0x2B); invalid reply: "-" (0x2D)
- Valid reply for Get: "r" (0x72) with value bytes; invalid: "-" (0x2D)
- Device ID range 01-98 for individual units, 99 for broadcast (no reply on broadcast)
- Monitor ID adjustable 1-255 (wider range than command ID field); default is 1
- 2.5mm barrel connector variant available (tip=TXD, ring=RXD, sleeve=GND)
- Volume supports relative adjustments: 900=down(-1), 901=up(+1)
- USB input not selectable via RS232 (noted in source)

<!-- UNRESOLVED: flow control not specified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: network control port referenced but protocol not described in source -->
<!-- UNRESOLVED: thermal and power-log commands listed as "specific models only" — applicability to CDX5562 unknown -->
<!-- UNRESOLVED: RS232 version command returns 0.0.1-9.9.9 but current version for CDX5562 not stated -->

## Provenance

```yaml
source_urls:
  - https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
  - https://viewsonic.com/us/cdx5562.html
source_documents:
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T10:13:22.864Z
  - title: "Viewsonic public source"
    url: https://manualslib.com/manual/3900742/Viewsonic-Cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.426Z
  - title: "Viewsonic public source"
    url: https://viewsonic.com/us/cdx5562.html
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-29T10:13:23.540Z
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T10:18:36.499Z
  - title: "Viewsonic public source"
    url: https://viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T10:24:07.729Z
retrieved_at: 2026-04-29T10:24:07.729Z
last_checked_at: 2026-04-29T11:21:31.073Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-29T11:21:31.073Z
matched_actions: 61
action_count: 62
confidence: high
summary: "All 61 verifiable spec commands matched literally in source tables; transport parameters verified verbatim; complete coverage of source command catalogue."
```

## Known Gaps

```yaml
[]
```
