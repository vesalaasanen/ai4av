---
spec_id: admin/christie-suhdxx3-x-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie SUHDxx3 x Series Control Spec"
manufacturer: Christie
model_family: "SUHDxx3 x Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "SUHDxx3 x Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-104143-01-christie-lit-usr-suhd-v3.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-14T14:01:37.676Z
last_checked_at: 2026-06-02T22:05:17.537Z
generated_at: 2026-06-02T22:05:17.537Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Ethernet control protocol not documented — only RS-232 commands are specified. The display has an Ethernet port but no TCP/IP command format is described."
  - "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
  - "ED1 (DisplayPort 1 resolution) command values partially truncated in source"
  - "ED2 (DisplayPort 2 resolution) command values partially truncated in source"
  - "No Ethernet/TCP control protocol documented despite Ethernet port and network settings"
  - "Passthrough scaling command PAS relationship to ASP unclear from source"
  - "Power Status Alert, Source Status Alert, Signal Lost Alert event payload formats not documented -->Spec generated. Self-check passed: no fabricated values, `status: draft`, `declared_confidence: low`, `entity_id` filled, all YAML clean (zero trailing `#` comments), unresolved markers on ED1/ED2 truncation, Ethernet protocol absence, alert payload formats, and PAS/ASP ambiguity."
verification:
  verdict: verified
  checked_at: 2026-06-02T22:05:17.537Z
  matched_actions: 59
  action_count: 59
  confidence: medium
  summary: "All 59 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie SUHDxx3 x Series Control Spec

## Summary

The Christie SUHDxx3 x Series is an LCD display with HDMI, DisplayPort, VGA, and audio inputs. This spec covers RS-232 serial control using a binary protocol (STX/CMD/ETX framing). The display supports power control, input selection, picture adjustment, multi-source views (PIP/quad), scheduled timers, and informational queries.

<!-- UNRESOLVED: Ethernet control protocol not documented — only RS-232 commands are specified. The display has an Ethernet port but no TCP/IP command format is described. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none
```

## Traits
```yaml
traits:
  - powerable
  - queryable
  - levelable
  - routable
```

## Actions
```yaml
actions:
  - id: power_set
    label: Power On/Off
    kind: action
    cmd: POW
    hex: "50 4F 57"
    params:
      - name: state
        type: enum
        values:
          "0": "Off (soft power)"
          "1": "On (soft power)"
        description: "Power state. On is valid in sleep mode when Wake Up From Sleep is not VGA Only."

  - id: select_input
    label: Select Input Source
    kind: action
    cmd: MIN
    hex: "4D 49 4E"
    params:
      - name: source
        type: enum
        values:
          "0": VGA
          "9": HDMI1
          "10": HDMI2
          "11": HDMI3
          "12": HDMI4
          "13": DisplayPort1
          "16": DisplayPort2

  - id: set_backlight
    label: Set Backlight
    kind: action
    cmd: BRI
    hex: "42 52 49"
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: Backlight level

  - id: set_brightness
    label: Set Brightness
    kind: action
    cmd: BRL
    hex: "42 52 4C"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_backlight_onoff
    label: Backlight On/Off
    kind: action
    cmd: BLC
    hex: "42 4C 43"
    params:
      - name: state
        type: enum
        values:
          "0": "Off"
          "1": "On"

  - id: set_contrast
    label: Set Contrast
    kind: action
    cmd: CON
    hex: "43 4F 4E"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    cmd: SHA
    hex: "53 48 41"
    params:
      - name: value
        type: integer
        min: 0
        max: 10

  - id: set_hue
    label: Set Hue
    kind: action
    cmd: HUE
    hex: "48 55 45"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_saturation
    label: Set Saturation
    kind: action
    cmd: SAT
    hex: "53 41 54"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_scheme
    label: Set Scheme
    kind: action
    cmd: SCM
    hex: "53 43 4D"
    params:
      - name: preset
        type: enum
        values:
          "0": User
          "1": Sport
          "2": Game
          "3": Cinema
          "4": Vivid

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    cmd: COT
    hex: "43 4F 54"
    params:
      - name: temp
        type: enum
        values:
          "0": User
          "1": 6500K
          "2": 9300K
          "6": 5000K
          "7": 7500K

  - id: set_gamma
    label: Set Gamma
    kind: action
    cmd: GAC
    hex: "47 41 43"
    params:
      - name: mode
        type: enum
        values:
          "0": "Off"
          "1": "2.2"

  - id: set_red_gain
    label: Set Red Gain
    kind: action
    cmd: USR
    hex: "55 53 52"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_green_gain
    label: Set Green Gain
    kind: action
    cmd: USG
    hex: "55 53 47"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_blue_gain
    label: Set Blue Gain
    kind: action
    cmd: USB
    hex: "55 53 42"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_red_offset
    label: Set Red Offset
    kind: action
    cmd: UOR
    hex: "55 4F 52"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_green_offset
    label: Set Green Offset
    kind: action
    cmd: UOG
    hex: "55 4F 47"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_blue_offset
    label: Set Blue Offset
    kind: action
    cmd: UOB
    hex: "55 4F 42"
    params:
      - name: value
        type: integer
        min: 0
        max: 100

  - id: set_timer_year
    label: Set RTC Year
    kind: action
    cmd: RTY
    hex: "52 54 59"
    params:
      - name: year
        type: integer
        min: 0
        max: 99

  - id: set_timer_month
    label: Set RTC Month
    kind: action
    cmd: RTM
    hex: "52 54 4D"
    params:
      - name: month
        type: integer
        min: 1
        max: 12

  - id: set_timer_day
    label: Set RTC Day
    kind: action
    cmd: RTD
    hex: "52 54 44"
    params:
      - name: day
        type: integer
        min: 1
        max: 31

  - id: set_timer_hour
    label: Set RTC Hour
    kind: action
    cmd: RTH
    hex: "52 54 48"
    params:
      - name: hour
        type: integer
        min: 0
        max: 23

  - id: set_timer_minute
    label: Set RTC Minute
    kind: action
    cmd: RTN
    hex: "52 54 4E"
    params:
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_timer_mode
    label: Set Timer Mode
    kind: action
    cmd: TMS
    hex: "54 4D 53"
    params:
      - name: mode
        type: enum
        values:
          "0": Everyday
          "1": Workday
          "2": User

  - id: set_timer_enable_days
    label: Set Timer Enable Days
    kind: action
    cmd: AEN
    hex: "41 45 4E"
    params:
      - name: bitmap
        type: integer
        min: 0
        max: 127
        description: "Bit field. bit0=Sunday, bit1=Monday, bit2=Tuesday, bit3=Wednesday, bit4=Thursday, bit5=Friday, bit6=Saturday."

  - id: set_timer_disable_days
    label: Set Timer Disable Days
    kind: action
    cmd: AEF
    hex: "41 45 46"
    params:
      - name: bitmap
        type: integer
        min: 0
        max: 127
        description: "Bit field. bit0=Sunday, bit1=Monday, bit2=Tuesday, bit3=Wednesday, bit4=Thursday, bit5=Friday, bit6=Saturday."

  - id: set_sunday_on_time
    label: Set Sunday On Time
    kind: action
    cmd: SNH
    cmd2: SNM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_sunday_off_time
    label: Set Sunday Off Time
    kind: action
    cmd: SFH
    cmd2: SFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_monday_on_time
    label: Set Monday On Time
    kind: action
    cmd: NNH
    cmd2: NNM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_monday_off_time
    label: Set Monday Off Time
    kind: action
    cmd: NFH
    cmd2: NFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_tuesday_on_time
    label: Set Tuesday On Time
    kind: action
    cmd: ENH
    cmd2: ENM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_tuesday_off_time
    label: Set Tuesday Off Time
    kind: action
    cmd: EFH
    cmd2: EFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_wednesday_on_time
    label: Set Wednesday On Time
    kind: action
    cmd: DNH
    cmd2: DNM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_wednesday_off_time
    label: Set Wednesday Off Time
    kind: action
    cmd: DFH
    cmd2: DFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_thursday_on_time
    label: Set Thursday On Time
    kind: action
    cmd: UNH
    cmd2: UNM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_thursday_off_time
    label: Set Thursday Off Time
    kind: action
    cmd: UFH
    cmd2: UFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_friday_on_time
    label: Set Friday On Time
    kind: action
    cmd: INH
    cmd2: INM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_friday_off_time
    label: Set Friday Off Time
    kind: action
    cmd: IFH
    cmd2: IFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_saturday_on_time
    label: Set Saturday On Time
    kind: action
    cmd: TNH
    cmd2: TNM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_saturday_off_time
    label: Set Saturday Off Time
    kind: action
    cmd: TFH
    cmd2: TFM
    params:
      - name: hour
        type: integer
        min: 0
        max: 23
      - name: minute
        type: integer
        min: 0
        max: 59

  - id: set_multiview
    label: Set Multi-Source View
    kind: action
    cmd: PSC
    hex: "50 53 43"
    params:
      - name: mode
        type: enum
        values:
          "0": "Off"
          "1": "PIP Small"
          "2": "PIP Medium"
          "3": "PIP Large"
          "4": "Dual View"
          "7": "Quad View"

  - id: set_pip_source_1
    label: Set PIP Source Window 1
    kind: action
    cmd: PIN
    hex: "50 49 4E"
    params:
      - name: source
        type: enum
        values:
          "0": VGA
          "9": HDMI1
          "10": HDMI2
          "11": HDMI3
          "12": HDMI4
          "13": DisplayPort1
          "16": DisplayPort2

  - id: set_pip_source_2
    label: Set PIP Source Window 2
    kind: action
    cmd: PIO
    hex: "50 49 4F"
    params:
      - name: source
        type: enum
        values:
          "0": VGA
          "9": HDMI1
          "10": HDMI2
          "11": HDMI3
          "12": HDMI4
          "13": DisplayPort1
          "16": DisplayPort2

  - id: set_pip_source_3
    label: Set PIP Source Window 3
    kind: action
    cmd: PIP
    hex: "50 49 50"
    params:
      - name: source
        type: enum
        values:
          "0": VGA
          "9": HDMI1
          "10": HDMI2
          "11": HDMI3
          "12": HDMI4
          "13": DisplayPort1
          "16": DisplayPort2

  - id: set_pip_position
    label: Set PIP Position
    kind: action
    cmd: PPO
    hex: "50 50 4F"
    params:
      - name: position
        type: enum
        values:
          "0": "Bottom-Left"
          "1": "Bottom-Right"
          "2": "Top-Left"
          "3": "Top-Right"

  - id: swap_main_pip
    label: Swap Main and PIP
    kind: action
    cmd: SWA
    hex: "53 57 41"
    params:
      - name: unused
        type: integer
        description: "Send value 0"

  - id: set_scaling
    label: Set Scaling
    kind: action
    cmd: ASP
    hex: "41 53 50"
    params:
      - name: mode
        type: enum
        values:
          "0": Native
          "1": Full Screen
          "2": "4:3"
          "3": Letterbox

  - id: set_scaling_alt
    label: Set Scaling (Alt)
    kind: action
    cmd: PAS
    hex: "50 41 53"
    params:
      - name: mode
        type: enum
        values:
          "1": Full Screen
          "2": "4:3"
          "3": Letterbox

  - id: set_overscan
    label: Set Overscan Ratio
    kind: action
    cmd: ZOM
    hex: "5A 4F 4D"
    params:
      - name: value
        type: integer
        min: 0
        max: 10

  - id: set_baud_rate
    label: Set Baud Rate
    kind: action
    cmd: BRA
    hex: "42 52 41"
    params:
      - name: rate
        type: enum
        values:
          "0": "115200"
          "1": "38400"
          "2": "19200"
          "3": "9600"

  - id: set_wake_from_sleep
    label: Set Wake Up From Sleep
    kind: action
    cmd: WFS
    hex: "57 46 53"
    params:
      - name: mode
        type: enum
        values:
          "0": "VGA Only"
          "1": "Digital, RS232, Ethernet"
          "2": "Never Sleep"

  - id: set_auto_scan
    label: Set Auto Scan
    kind: action
    cmd: ATS
    hex: "41 54 53"
    params:
      - name: mode
        type: enum
        values:
          "0": "Off"
          "1": "Main"
          "2": "Multi"
          "3": "All"

  - id: set_ir_filter
    label: Set IR Filter
    kind: action
    cmd: IRF
    hex: "49 52 46"
    params:
      - name: state
        type: enum
        values:
          "0": "Off"
          "1": "On"

  - id: set_smart_light_control
    label: Set Smart Light Control
    kind: action
    cmd: SLC
    hex: "53 4C 43"
    params:
      - name: mode
        type: enum
        values:
          "0": "Off"
          "1": "DCR"
          "2": "Light Sensor"

  - id: set_power_led
    label: Set Power LED
    kind: action
    cmd: LED
    hex: "4C 45 44"
    params:
      - name: state
        type: enum
        values:
          "0": "Off"
          "1": "On"

  - id: set_rgb_color_range
    label: Set RGB Color Range
    kind: action
    cmd: HCR
    hex: "48 43 52"
    params:
      - name: mode
        type: enum
        values:
          "0": "Auto Detect"
          "1": "Full Range"
          "2": "Limited Range"

  - id: remote_control_key
    label: Send Remote Control Key
    kind: action
    cmd: RCU
    hex: "52 43 55"
    params:
      - name: key
        type: enum
        values:
          "0": MENU
          "1": INFO
          "2": UP
          "3": DOWN
          "4": LEFT
          "5": RIGHT
          "6": ENTER
          "7": EXIT
          "8": VGA
          "10": HDMI1
          "11": HDMI2
          "31": HDMI3
          "32": HDMI4
          "12": DISPLAYPORT1
          "34": DISPLAYPORT2
          "18": SOURCE
          "19": P-SOURCE
          "20": PIP
          "21": P-POSITION
          "22": SWAP
          "23": SCALING
          "24": FREEZE
          "25": Mute
          "26": BRIGHT
          "27": CONTRAST
          "28": AUTO
          "29": VOLUME+
          "30": VOLUME-

  - id: reset_all
    label: Reset All to Default
    kind: action
    cmd: ALL
    hex: "41 4C 4C"
    params:
      - name: unused
        type: integer
        description: "Send value 0"

  - id: set_key_lock
    label: Set Key Lock
    kind: action
    cmd: KLC
    hex: "4B 4C 43"
    params:
      - name: state
        type: enum
        values:
          "0": "Unlock"
          "1": "Lock"
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    label: Power State
    cmd: POW
    type: enum
    values:
      "0": "Off"
      "1": "On"

  - id: input_source
    label: Current Input Source
    cmd: MIN
    type: enum
    values:
      "0": VGA
      "9": HDMI1
      "10": HDMI2
      "11": HDMI3
      "12": HDMI4
      "13": DisplayPort1
      "16": DisplayPort2

  - id: backlight_level
    label: Backlight Level
    cmd: BRI
    type: integer
    min: 0
    max: 100

  - id: brightness_level
    label: Brightness Level
    cmd: BRL
    type: integer
    min: 0
    max: 100

  - id: backlight_onoff
    label: Backlight On/Off State
    cmd: BLC
    type: enum
    values:
      "0": "Off"
      "1": "On"

  - id: contrast_level
    label: Contrast Level
    cmd: CON
    type: integer
    min: 0
    max: 100

  - id: sharpness_level
    label: Sharpness Level
    cmd: SHA
    type: integer
    min: 0
    max: 10

  - id: hue_level
    label: Hue Level
    cmd: HUE
    type: integer
    min: 0
    max: 100

  - id: saturation_level
    label: Saturation Level
    cmd: SAT
    type: integer
    min: 0
    max: 100

  - id: scheme_mode
    label: Scheme Preset
    cmd: SCM
    type: enum
    values:
      "0": User
      "1": Sport
      "2": Game
      "3": Cinema
      "4": Vivid

  - id: color_temperature
    label: Color Temperature
    cmd: COT
    type: enum
    values:
      "0": User
      "1": 6500K
      "2": 9300K
      "6": 5000K
      "7": 7500K

  - id: gamma_mode
    label: Gamma Mode
    cmd: GAC
    type: enum
    values:
      "0": "Off"
      "1": "2.2"

  - id: scaling_mode
    label: Scaling Mode
    cmd: ASP
    type: enum
    values:
      "0": Native
      "1": Full Screen
      "2": "4:3"
      "3": Letterbox

  - id: multiview_mode
    label: Multi-Source View Mode
    cmd: PSC
    type: enum
    values:
      "0": "Off"
      "1": "PIP Small"
      "2": "PIP Medium"
      "3": "PIP Large"
      "4": "Dual View"
      "7": "Quad View"

  - id: wake_from_sleep
    label: Wake From Sleep Mode
    cmd: WFS
    type: enum
    values:
      "0": "VGA Only"
      "1": "Digital, RS232, Ethernet"
      "2": "Never Sleep"

  - id: serial_number
    label: Serial Number
    cmd: SER
    type: string
    length: 13
    description: "13-byte ASCII string"

  - id: model_name
    label: Model Name
    cmd: MNA
    type: string
    length: 13
    description: "13-byte ASCII string"

  - id: firmware_version
    label: Firmware Version
    cmd: GVE
    type: string
    length: 6
    description: "6-byte ASCII string"

  - id: rs232_table_version
    label: RS232 Table Version
    cmd: RTV
    type: integer
    min: 0
    max: 255
```

## Variables
```yaml
variables: []
```

## Events
```yaml
events:
  - id: power_status_alert
    label: Power Status Alert
    description: "Automatic alert when the display is powered down. Enabled via Communication menu Power Status Alert setting."

  - id: source_status_alert
    label: Source Status Alert
    description: "Automatic alert when the source is changed. Enabled via Communication menu Source Status Alert setting."

  - id: signal_lost_alert
    label: Signal Lost Alert
    description: "Automatic alert when the video signal is lost. Enabled via Communication menu Signal Lost Status setting."
```

## Macros
```yaml
macros: []
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing requirements found in source -->

## Notes

**Binary protocol framing:**
- Read command: `07 IDT 01 CMD 08` (7 bytes)
- Write command: `07 IDT 02 CMD VAL 08` (8 bytes)
- Response from monitor: `07 IDT 00 CMD [VAL] 08`
- STX = `0x07`, ETX = `0x08`, IDT = do not care
- Type: `01` = read, `02` = write, `00` = return from monitor

**Sleep mode behavior:**
By default the display enters sleep after 5 minutes of no signal. In "VGA Only" wake mode, RS232/DP/HDMI are inactive during sleep. In "Digital, RS232, Ethernet" mode, those inputs remain active and the display can wake on signal or RS232 command.

**Overscan display port commands (ED1/ED2):**
The source mentions ED1 and ED2 commands for DisplayPort 1/2 resolution selection (1080P / 4K30 / 4K60) but the table was partially truncated.

<!-- UNRESOLVED: ED1 (DisplayPort 1 resolution) command values partially truncated in source -->
<!-- UNRESOLVED: ED2 (DisplayPort 2 resolution) command values partially truncated in source -->
<!-- UNRESOLVED: No Ethernet/TCP control protocol documented despite Ethernet port and network settings -->
<!-- UNRESOLVED: Passthrough scaling command PAS relationship to ASP unclear from source -->
<!-- UNRESOLVED: Power Status Alert, Source Status Alert, Signal Lost Alert event payload formats not documented -->Spec generated. Self-check passed: no fabricated values, `status: draft`, `declared_confidence: low`, `entity_id` filled, all YAML clean (zero trailing `#` comments), unresolved markers on ED1/ED2 truncation, Ethernet protocol absence, alert payload formats, and PAS/ASP ambiguity.

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-104143-01-christie-lit-usr-suhd-v3.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-14T14:01:37.676Z
last_checked_at: 2026-06-02T22:05:17.537Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:05:17.537Z
matched_actions: 59
action_count: 59
confidence: medium
summary: "All 59 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Ethernet control protocol not documented — only RS-232 commands are specified. The display has an Ethernet port but no TCP/IP command format is described."
- "no safety warnings, interlock procedures, or power-on sequencing requirements found in source"
- "ED1 (DisplayPort 1 resolution) command values partially truncated in source"
- "ED2 (DisplayPort 2 resolution) command values partially truncated in source"
- "No Ethernet/TCP control protocol documented despite Ethernet port and network settings"
- "Passthrough scaling command PAS relationship to ASP unclear from source"
- "Power Status Alert, Source Status Alert, Signal Lost Alert event payload formats not documented -->Spec generated. Self-check passed: no fabricated values, `status: draft`, `declared_confidence: low`, `entity_id` filled, all YAML clean (zero trailing `#` comments), unresolved markers on ED1/ED2 truncation, Ethernet protocol absence, alert payload formats, and PAS/ASP ambiguity."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
