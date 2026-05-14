---
spec_id: admin/lg-oled-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "LG OLED Series Control Spec"
manufacturer: LG
model_family: "LG OLED Series"
aliases: []
compatible_with:
  manufacturers:
    - LG
  models:
    - "LG OLED Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-14T18:17:17.618Z
generated_at: 2026-05-14T18:17:17.618Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.618Z
  matched_actions: 27
  action_count: 27
  confidence: high
  summary: "All 47 spec actions (27 Actions + 20 Feedbacks) matched literally in source; complete command catalogue coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# LG OLED Series Control Spec

## Summary
LG OLED Series commercial displays supporting RS-232C serial and TCP/IP control. The protocol uses ASCII command strings with a two-character command code, Set ID, and hex data payload terminated by carriage return. Covers power, input routing, picture adjustments, audio, tiling, and diagnostic queries.

<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: specific model numbers not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable    # power on/off commands present
  - routable     # input select commands present
  - queryable    # FF readback queries present
  - levelable    # volume, contrast, brightness, color, tint, sharpness, balance controls
```

## Actions
```yaml
actions:
  - id: power_on
    label: Power On
    kind: action
    command: "ka {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "a {set_id} OK01x"

  - id: power_off
    label: Power Off
    kind: action
    command: "ka {set_id} 00"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "a {set_id} OK00x"

  - id: select_input
    label: Select Input
    kind: action
    command: "kb {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: input
        type: enum
        values:
          - label: AV
            value: "02"
          - label: Component 1
            value: "04"
          - label: Component 2
            value: "05"
          - label: RGB DTV
            value: "06"
          - label: RGB PC
            value: "07"
          - label: HDMI DTV
            value: "08"
          - label: HDMI PC
            value: "09"
        description: "Input source selection (hex code)"
    response: "b {set_id} OK{data}x"

  - id: set_aspect_ratio
    label: Set Aspect Ratio
    kind: action
    command: "kc {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: ratio
        type: enum
        values:
          - label: Normal 4:3
            value: "01"
          - label: Wide 16:9
            value: "02"
          - label: Horizon
            value: "03"
          - label: Zoom1
            value: "04"
          - label: Zoom2
            value: "05"
          - label: Original
            value: "06"
          - label: 14:9
            value: "07"
          - label: Full
            value: "08"
          - label: 1:1 PC
            value: "09"
    response: "c {set_id} OK{data}x"

  - id: screen_mute_on
    label: Screen Mute On
    kind: action
    command: "kd {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "d {set_id} OK01x"

  - id: screen_mute_off
    label: Screen Mute Off
    kind: action
    command: "kd {set_id} 00"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "d {set_id} OK00x"

  - id: volume_mute_on
    label: Volume Mute On
    kind: action
    command: "ke {set_id} 00"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "e {set_id} OK00x"

  - id: volume_mute_off
    label: Volume Mute Off
    kind: action
    command: "ke {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "e {set_id} OK01x"

  - id: set_volume
    label: Set Volume
    kind: action
    command: "kf {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Volume level (0x00-0x64 hex)"
    response: "f {set_id} OK{data}x"

  - id: set_contrast
    label: Set Contrast
    kind: action
    command: "kg {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Contrast level (0x00-0x64 hex)"
    response: "g {set_id} OK{data}x"

  - id: set_brightness
    label: Set Brightness
    kind: action
    command: "kh {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Brightness level (0x00-0x64 hex)"
    response: "h {set_id} OK{data}x"

  - id: set_color
    label: Set Color
    kind: action
    command: "ki {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Color level (0x00-0x64 hex, video only)"
    response: "i {set_id} OK{data}x"

  - id: set_tint
    label: Set Tint
    kind: action
    command: "kj {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: tint
        type: integer
        min: -50
        max: 50
        description: "Tint (0x00=Red -50 to 0x64=Green +50, video only)"
    response: "j {set_id} OK{data}x"

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    command: "kk {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: level
        type: integer
        min: 0
        max: 100
        description: "Sharpness level (0x00-0x64 hex, video only)"
    response: "k {set_id} OK{data}x"

  - id: osd_on
    label: OSD On
    kind: action
    command: "kl {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "l {set_id} OK01x"

  - id: osd_off
    label: OSD Off
    kind: action
    command: "kl {set_id} 00"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "l {set_id} OK00x"

  - id: remote_lock_on
    label: Remote Lock On
    kind: action
    command: "km {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    description: "Locks remote control and local keys when controlling via RS-232C"
    response: "m {set_id} OK01x"

  - id: remote_lock_off
    label: Remote Lock Off
    kind: action
    command: "km {set_id} 00"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    response: "m {set_id} OK00x"

  - id: set_balance
    label: Set Balance
    kind: action
    command: "kt {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: balance
        type: integer
        min: -50
        max: 50
        description: "Balance (0x00=L50 to 0x64=R50)"
    response: "t {set_id} OK{data}x"

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    command: "ku {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: mode
        type: enum
        values:
          - label: Normal
            value: "00"
          - label: Cool
            value: "01"
          - label: Warm
            value: "02"
          - label: User
            value: "03"
    response: "u {set_id} OK{data}x"

  - id: set_ism_mode
    label: Set ISM Mode
    kind: action
    command: "jp {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: mode
        type: enum
        values:
          - label: Inversion
            value: "01"
          - label: Orbiter
            value: "02"
          - label: White Wash
            value: "04"
          - label: Normal
            value: "08"
    description: "Afterimage prevention function"
    response: "p {set_id} OK{data}x"

  - id: auto_configure
    label: Auto Configure
    kind: action
    command: "ju {set_id} 01"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
    description: "Auto-adjust picture position (RGB PC mode only)"
    response: "u {set_id} OK01x"

  - id: send_key
    label: Send IR Key Code
    kind: action
    command: "mc {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: key_code
        type: string
        description: "IR remote key code (hex)"
    response: "c {set_id} OK{data}x"

  - id: set_tile_mode
    label: Set Tile Mode
    kind: action
    command: "dd {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: mode
        type: string
        description: "Tile mode (00=off, 12=1x2, 13=1x3, 14=1x4 ... 44=4x4)"
    response: "d 00 OK{data}x"

  - id: set_tile_h_size
    label: Set Tile H Size
    kind: action
    command: "dg {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: size
        type: integer
        min: 0
        max: 100
        description: "Horizontal size (0x00-0x64)"
    response: "g {set_id} OK{data}x"

  - id: set_tile_v_size
    label: Set Tile V Size
    kind: action
    command: "dh {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: size
        type: integer
        min: 0
        max: 100
        description: "Vertical size (0x00-0x64)"
    response: "h {set_id} OK{data}x"

  - id: set_tile_id
    label: Set Tile ID
    kind: action
    command: "di {set_id} {data}"
    params:
      - name: set_id
        type: integer
        description: "Set ID (1-99, 0 for all)"
      - name: tile_id
        type: integer
        min: 0
        max: 16
        description: "Tile ID (0x00-0x10)"
    response: "i {set_id} OK{data}x"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    command: "ka {set_id} FF"
    type: enum
    values: [off, on]
    mapping:
      "00": off
      "01": on

  - id: input_source
    label: Input Source
    command: "kb {set_id} FF"
    type: enum
    values: [AV, Component_1, Component_2, RGB_DTV, RGB_PC, HDMI_DTV, HDMI_PC]
    mapping:
      "02": AV
      "04": Component_1
      "05": Component_2
      "06": RGB_DTV
      "07": RGB_PC
      "08": HDMI_DTV
      "09": HDMI_PC

  - id: aspect_ratio
    label: Aspect Ratio
    command: "kc {set_id} FF"
    type: enum
    values: [Normal_4_3, Wide_16_9, Horizon, Zoom1, Zoom2, Original, _14_9, Full, _1_1_PC]
    mapping:
      "01": Normal_4_3
      "02": Wide_16_9
      "03": Horizon
      "04": Zoom1
      "05": Zoom2
      "06": Original
      "07": _14_9
      "08": Full
      "09": _1_1_PC

  - id: screen_mute_state
    label: Screen Mute State
    command: "kd {set_id} FF"
    type: enum
    values: [off, on]
    mapping:
      "00": off
      "01": on

  - id: volume_mute_state
    label: Volume Mute State
    command: "ke {set_id} FF"
    type: enum
    values: [muted, unmuted]
    mapping:
      "00": muted
      "01": unmuted

  - id: volume_level
    label: Volume Level
    command: "kf {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: contrast_level
    label: Contrast Level
    command: "kg {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: brightness_level
    label: Brightness Level
    command: "kh {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: color_level
    label: Color Level
    command: "ki {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: tint_level
    label: Tint Level
    command: "kj {set_id} FF"
    type: integer
    min: -50
    max: 50

  - id: sharpness_level
    label: Sharpness Level
    command: "kk {set_id} FF"
    type: integer
    min: 0
    max: 100

  - id: osd_state
    label: OSD State
    command: "kl {set_id} FF"
    type: enum
    values: [off, on]
    mapping:
      "00": off
      "01": on

  - id: remote_lock_state
    label: Remote Lock State
    command: "km {set_id} FF"
    type: enum
    values: [off, on]
    mapping:
      "00": off
      "01": on

  - id: balance_level
    label: Balance Level
    command: "kt {set_id} FF"
    type: integer
    min: -50
    max: 50

  - id: color_temperature
    label: Color Temperature
    command: "ku {set_id} FF"
    type: enum
    values: [Normal, Cool, Warm, User]
    mapping:
      "00": Normal
      "01": Cool
      "02": Warm
      "03": User

  - id: abnormal_state
    label: Abnormal State
    command: "kz {set_id} FF"
    type: enum
    values:
      - normal
      - no_signal
      - off_by_remote
      - off_by_sleep
      - off_by_rs232
      - ac_down
      - off_by_off_timer
      - off_by_auto_off
    mapping:
      "00": normal
      "01": no_signal
      "02": off_by_remote
      "03": off_by_sleep
      "04": off_by_rs232
      "06": ac_down
      "08": off_by_off_timer
      "09": off_by_auto_off

  - id: ism_mode
    label: ISM Mode
    command: "jp {set_id} FF"
    type: enum
    values: [Inversion, Orbiter, White_Wash, Normal]
    mapping:
      "01": Inversion
      "02": Orbiter
      "04": White_Wash
      "08": Normal

  - id: elapsed_time
    label: Elapsed Time
    command: "dl {set_id} FF"
    type: integer
    unit: hours

  - id: temperature_value
    label: Temperature Value
    command: "dn {set_id} FF"
    type: integer
    description: "Internal temperature (1 byte hex)"

  - id: lamp_fault
    label: Lamp Fault Status
    command: "dp {set_id} FF"
    type: enum
    values: [fault, ok]
    mapping:
      "00": fault
      "01": ok
```

## Variables
```yaml
# UNRESOLVED: no settable continuous variables beyond those covered in Actions/Feedbacks
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism described in source
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
- Command format is `[Command1][Command2][ ][Set ID][ ][Data][Cr]` where Cr = 0x0D and space = 0x20.
- Set ID range is 1-99; setting 0 addresses all units simultaneously. When using Set ID 0 with multiple displays, ACK messages from all units cannot be reliably distinguished.
- OK acknowledgement format: `[Command2][ ][Set ID][ ][OK][Data][x]`
- Error acknowledgement format: `[Command2][ ][Set ID][ ][NG][Data][x]`
- Data values are hex-encoded ASCII. Volume/contrast/brightness/color/sharpness use 0x00-0x64 (decimal 0-100). Tint maps 0x00=-50 (Red) to 0x64=+50 (Green). Balance maps 0x00=L50 to 0x64=R50.
- Send data `FF` to any command to query current status (read mode).
- IR remote key codes are listed separately in the source (key command `mc`).
<!-- UNRESOLVED: TCP port number for IP control not documented -->
<!-- UNRESOLVED: specific OLED model numbers not stated -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: maximum command rate / timing constraints not stated -->

## Provenance

```yaml
source_domains:
  - raw.githubusercontent.com
source_urls:
  - https://raw.githubusercontent.com/WesSouza/lgtv-ip-control/main/docs/LG_IP.pdf
retrieved_at: 2026-05-04T18:02:55.956Z
last_checked_at: 2026-05-14T18:17:17.618Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.618Z
matched_actions: 27
action_count: 27
confidence: high
summary: "All 47 spec actions (27 Actions + 20 Feedbacks) matched literally in source; complete command catalogue coverage."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
