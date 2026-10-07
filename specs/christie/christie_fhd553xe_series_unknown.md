---
spec_id: admin/christie-fhd553xe-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie FHD553XE Series Control Spec"
manufacturer: Christie
model_family: "FHD553XE Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "FHD553XE Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001659-01-christie-lit-tech-ref-api-fhd553-x.pdf
  - https://www.manualslib.com/manual/1755946/Christie-Fhd553-X.html
retrieved_at: 2026-05-14T13:55:20.115Z
last_checked_at: 2026-10-07T13:24:52.739Z
generated_at: 2026-10-07T13:24:52.739Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Ethernet port number not stated in source — source says \"Telnet protocol\" but no port specified"
  - "RS-485 wiring details not documented beyond mentioning RS-485 alongside RS-232"
  - "DIV command (video wall division) listed in source with no value/reply fields documented"
  - "Telnet port not stated in source"
  - "value/reply fields not documented in source\""
  - "reply format not documented in source\""
  - "no unsolicited notification events described in source"
  - "no multi-step sequences described in source"
  - "source does not describe safety interlocks or power-on sequencing warnings"
  - "Ethernet/Telnet port number not stated"
  - "RS-485 specific wiring/pinout not documented"
  - "DIV command (video wall division) value/reply fields not documented in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:24:52.739Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "All 101 action units match source CMD rows and transport supported; discrete IR table is a separate channel excluded from coverage. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Christie FHD553XE Series Control Spec

## Summary
Christie FHD553XE Series LCD display panels controllable via RS-232/RS-485 serial and Ethernet Telnet. Binary command protocol with fixed-frame format (STX/IDT/TYPE/CMD/VALUE/ETX/CR). Supports power control, input selection, display adjustment, PIP, video wall, IR remote emulation, fan speed control, and self-diagnostics.

<!-- UNRESOLVED: Ethernet port number not stated in source — source says "Telnet protocol" but no port specified -->
<!-- UNRESOLVED: RS-485 wiring details not documented beyond mentioning RS-485 alongside RS-232 -->
<!-- UNRESOLVED: DIV command (video wall division) listed in source with no value/reply fields documented -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: Telnet port not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

## Traits
```yaml
traits:
  - powerable    # POW command: power on/off
  - queryable    # Read-type commands return current values
  - routable     # Input source selection (MIN command)
  - levelable    # Backlight, brightness, contrast, sharpness, hue, saturation, color temp, gains, offsets, fan speed
```

## Actions
```yaml
actions:
  - id: power_off
    label: Power Off
    kind: action
    params: []
    command:
      hex: "50 4F 57"
      type: write
      value: 0

  - id: power_on
    label: Power On
    kind: action
    params: []
    command:
      hex: "50 4F 57"
      type: write
      value: 1

  - id: select_input
    label: Select Input Source
    kind: action
    params:
      - name: input
        type: enum
        values:
          - label: VGA
            value: 0
          - label: Digital DVI
            value: 1
          - label: HDMI 1
            value: 9
          - label: HDMI 2
            value: 10
          - label: DisplayPort
            value: 13
          - label: OPS
            value: 14
    command:
      hex: "4D 49 4E"
      type: write

  - id: set_backlight
    label: Set Backlight
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    command:
      hex: "42 52 49"
      type: write

  - id: set_brightness
    label: Set Brightness
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    command:
      hex: "42 52 4C"
      type: write

  - id: set_backlight_onoff
    label: Set Backlight On/Off
    kind: action
    params:
      - name: state
        type: enum
        values:
          - label: Off
            value: 0
          - label: On
            value: 1
    command:
      hex: "42 4C 43"
      type: write

  - id: set_contrast
    label: Set Contrast
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    command:
      hex: "43 4F 4E"
      type: write

  - id: set_sharpness
    label: Set Sharpness
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 24
    command:
      hex: "53 48 41"
      type: write

  - id: set_hue
    label: Set Hue
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    command:
      hex: "48 55 45"
      type: write

  - id: set_saturation
    label: Set Saturation
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 100
    command:
      hex: "53 41 54"
      type: write

  - id: set_color_temperature
    label: Set Color Temperature
    kind: action
    params:
      - name: level
        type: integer
        min: 0
        max: 64
        description: "Maps to 3200K-9600K range"
    command:
      hex: "43 43 54"
      type: write

  - id: set_gamma
    label: Set Gamma
    kind: action
    params:
      - name: mode
        type: enum
        values:
          - label: Off
            value: 0
          - label: "2.2"
            value: 1
    command:
      hex: "47 41 43"
      type: write

  - id: set_red_gain
    label: Set Red Gain
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 255
        description: "Maps to gain range 128-383"
    command:
      hex: "55 53 52"
      type: write

  - id: set_green_gain
    label: Set Green Gain
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 255
        description: "Maps to gain range 128-383"
    command:
      hex: "55 53 47"
      type: write

  - id: set_blue_gain
    label: Set Blue Gain
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 255
        description: "Maps to gain range 128-383"
    command:
      hex: "55 53 42"
      type: write

  - id: set_red_offset
    label: Set Red Offset
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Maps to offset range -50-50"
    command:
      hex: "55 4F 52"
      type: write

  - id: set_green_offset
    label: Set Green Offset
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Maps to offset range -50-50"
    command:
      hex: "55 4F 47"
      type: write

  - id: set_blue_offset
    label: Set Blue Offset
    kind: action
    params:
      - name: value
        type: integer
        min: 0
        max: 100
        description: "Maps to offset range -50-50"
    command:
      hex: "55 4F 42"
      type: write

  - id: set_pip_mode
    label: Set PIP Mode
    kind: action
    params:
      - name: mode
        type: enum
        values:
          - label: PIP Off
            value: 0
          - label: PIP Small
            value: 1
          - label: PIP Medium
            value: 2
          - label: PIP Large
            value: 3
          - label: Side-by-Side
            value: 4
    command:
      hex: "50 53 43"
      type: write

  - id: set_pip_source
    label: Set PIP Source
    kind: action
    params:
      - name: input
        type: enum
        values:
          - label: VGA
            value: 0
          - label: Digital DVI
            value: 1
          - label: HDMI 1
            value: 9
          - label: HDMI 2
            value: 10
          - label: DisplayPort
            value: 13
          - label: OPS
            value: 14
    command:
      hex: "50 49 4E"
      type: write

  - id: set_pip_position
    label: Set PIP Position
    kind: action
    params:
      - name: position
        type: enum
        values:
          - label: Bottom-Left
            value: 0
          - label: Bottom-Right
            value: 1
          - label: Top-Left
            value: 2
          - label: Top-Right
            value: 3
    command:
      hex: "50 50 4F"
      type: write

  - id: swap_pip_main
    label: Swap PIP and Main
    kind: action
    params: []
    command:
      hex: "53 57 41"
      type: write
      value: 0

  - id: set_scaling
    label: Set Scaling
    kind: action
    params:
      - name: mode
        type: enum
        values:
          - label: Native
            value: 0
          - label: Full Screen
            value: 1
          - label: "4:3"
            value: 2
          - label: Letterbox
            value: 3
    command:
      hex: "41 53 50"
      type: write

  - id: zoom_in
    label: Zoom In
    kind: action
    params: []
    command:
      hex: "5A 4F 4D"
      type: write
      value: 0

  - id: zoom_out
    label: Zoom Out
    kind: action
    params: []
    command:
      hex: "5A 4F 4D"
      type: write
      value: 1

  - id: set_baud_rate
    label: Set Baud Rate
    kind: action
    params:
      - name: rate
        type: enum
        values:
          - label: "115200"
            value: 0
          - label: "38400"
            value: 1
          - label: "19200"
            value: 2
          - label: "9600"
            value: 3
    command:
      hex: "42 52 41"
      type: write

  - id: ir_key
    label: Send IR Emulation Key
    kind: action
    params:
      - name: key
        type: enum
        values:
          - label: MENU
            value: 0
          - label: INFO
            value: 1
          - label: UP
            value: 2
          - label: DOWN
            value: 3
          - label: LEFT
            value: 4
          - label: RIGHT
            value: 5
          - label: ENTER
            value: 6
          - label: EXIT
            value: 7
          - label: VGA
            value: 8
          - label: DVI
            value: 9
          - label: HDMI 1
            value: 10
          - label: HDMI 2
            value: 11
          - label: DisplayPort
            value: 12
          - label: SOURCE
            value: 18
          - label: P-SOURCE
            value: 19
          - label: PIP
            value: 20
          - label: P-POSITION
            value: 21
          - label: SWAP
            value: 22
          - label: SCALING
            value: 23
          - label: BRIGHT
            value: 26
          - label: CONTRAST
            value: 27
          - label: AUTO
            value: 28
    command:
      hex: "52 43 55"
      type: write

  - id: reset_all
    label: Reset All Settings
    kind: action
    params: []
    command:
      hex: "41 4C 4C"
      type: write
      value: 0

  - id: lock_keys
    label: Lock/Unlock Keys
    kind: action
    params:
      - name: state
        type: enum
        values:
          - label: Unlock
            value: 0
          - label: Lock
            value: 1
    command:
      hex: "4B 4C 43"
      type: write

  - id: set_fan1_speed
    label: Set Fan 1 Speed
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 255
        description: "RPM = 30 × value"
    command:
      hex: "52 53 46"
      type: write
      value: 0

  - id: set_fan2_speed
    label: Set Fan 2 Speed
    kind: action
    params:
      - name: speed
        type: integer
        min: 0
        max: 255
        description: "RPM = 30 × value"
    command:
      hex: "52 53 46"
      type: write
      value: 1

  - id: set_wake_from_sleep
    label: Set Wake From Sleep Source
    kind: action
    params:
      - name: mode
        type: enum
        values:
          - label: VGA Only
            value: 0
          - label: "VGA, Digital, RS-232"
            value: 1
          - label: Never Sleep
            value: 2
    command:
      hex: "57 46 53"
      type: write

  - id: set_scheme
    label: Set Picture Scheme
    kind: action
    params:
      - name: scheme
        type: enum
        values:
          - label: User
            value: 0
          - label: Sport
            value: 1
          - label: Game
            value: 2
          - label: Cinema
            value: 3
          - label: Vivid
            value: 4
    command:
      hex: "53 43 4D"
      type: write

  - id: show_monitor_id
    label: Show Monitor ID
    kind: action
    params: []
    command:
      hex: "53 49 44"
      type: write
      value: 0

  - id: change_monitor_id
    label: Change Monitor ID
    kind: action
    params:
      - name: id
        type: integer
        min: 0
        max: 100
    command:
      hex: "43 49 44"
      type: write
      value: 0

  - id: video_wall_switch
    label: Video Wall Switch
    kind: action
    params:
      - name: state
        type: enum
        values:
          - label: Off
            value: 0
          - label: On
            value: 1
    command:
      hex: "56 57 53"
      type: write

  - id: video_wall_frameless
    label: Video Wall Frameless Mode
    kind: action
    params:
      - name: state
        type: enum
        values:
          - label: Off
            value: 0
          - label: On
            value: 1
    command:
      hex: "56 57 46"
      type: write

  - id: set_video_wall_matrix
    label: Set Video Wall Matrix
    kind: action
    params:
      - name: x
        type: integer
        min: 1
        max: 10
      - name: y
        type: integer
        min: 1
        max: 10
    command:
      hex: "4D 41 54"
      type: write
      description: "High nibble = X, low nibble = Y"

  - id: set_video_wall_division
    label: Set Video Wall Division
    kind: action
    params: []
    command:
      hex: "44 49 56"
      type: write
    note: "UNRESOLVED: value/reply fields not documented in source"

  - id: set_anti_tearing
    label: Set Anti-Tearing Mode
    kind: action
    params:
      - name: mode
        type: enum
        values:
          - label: Off
            value: 0
          - label: Auto
            value: 1
          - label: Odd
            value: 2
          - label: Even
            value: 3
    command:
      hex: "41 54 54"
      type: write

  - id: set_power_on_delay_integral
    label: Set Power On Delay (seconds)
    kind: action
    params:
      - name: seconds
        type: integer
        min: 0
        max: 30
    command:
      hex: "50 4F 44"
      type: write

  - id: set_power_on_delay_fractional
    label: Set Power On Delay (fractional)
    kind: action
    params:
      - name: fraction
        type: integer
        min: 0
        max: 19
        description: "0.05s increments (0, 0.05, 0.10 ... 0.95)"
    command:
      hex: "50 4F 45"
      type: write

  - id: set_vga_phase
    label: Set VGA Phase
    kind: action
    params:
      - name: phase
        type: integer
        min: 0
        max: 63
    command:
      hex: "50 48 41"
      type: write

  - id: set_vga_clock
    label: Set VGA Clock
    kind: action
    params:
      - name: clock
        type: integer
        min: 0
        max: 100
    command:
      hex: "43 4C 4F"
      type: write

  - id: vga_auto_adjust
    label: VGA Auto Adjust
    kind: action
    params: []
    command:
      hex: "41 44 4A"
      type: write
      value: 0
```

## Feedbacks
```yaml
feedbacks:
  - id: power_state
    query_command: "POW"
    type: enum
    values: [off, on]
    command:
      hex: "50 4F 57"
      type: read
    response:
      description: "XX = 0 when off, 1 when on"

  - id: backlight_level
    query_command: "BRI"
    type: integer
    range: [0, 100]
    command:
      hex: "42 52 49"
      type: read

  - id: brightness_level
    query_command: "BRL"
    type: integer
    range: [0, 100]
    command:
      hex: "42 52 4C"
      type: read

  - id: backlight_state
    query_command: "BLC"
    type: enum
    values: [off, on]
    command:
      hex: "42 4C 43"
      type: read

  - id: contrast_level
    query_command: "CON"
    type: integer
    range: [0, 100]
    command:
      hex: "43 4F 4E"
      type: read

  - id: sharpness_level
    query_command: "SHA"
    type: integer
    range: [0, 24]
    command:
      hex: "53 48 41"
      type: read

  - id: hue_level
    query_command: "HUE"
    type: integer
    range: [0, 100]
    command:
      hex: "48 55 45"
      type: read

  - id: saturation_level
    query_command: "SAT"
    type: integer
    range: [0, 100]
    command:
      hex: "53 41 54"
      type: read

  - id: color_temperature
    query_command: "CCT"
    type: integer
    range: [0, 64]
    command:
      hex: "43 43 54"
      type: read

  - id: input_source
    query_command: "MIN"
    type: enum
    values: [VGA, DVI, "HDMI 1", "HDMI 2", DisplayPort, OPS]
    command:
      hex: "4D 49 4E"
      type: read

  - id: pip_mode
    query_command: "PSC"
    type: enum
    values: [off, small, medium, large, side_by_side]
    command:
      hex: "50 53 43"
      type: read

  - id: pip_source
    query_command: "PIN"
    type: enum
    values: [VGA, DVI, "HDMI 1", "HDMI 2", DisplayPort, OPS]
    command:
      hex: "50 49 4E"
      type: read

  - id: pip_position
    query_command: "PPO"
    type: enum
    values: [bottom_left, bottom_right, top_left, top_right]
    command:
      hex: "50 50 4F"
      type: read

  - id: scaling_mode
    query_command: "ASP"
    type: enum
    values: [native, full_screen, "4:3", letterbox]
    command:
      hex: "41 53 50"
      type: read

  - id: baud_rate
    query_command: "BRA"
    type: enum
    values: ["115200", "38400", "19200", "9600"]
    command:
      hex: "42 52 41"
      type: read

  - id: serial_number
    query_command: "SER"
    type: string
    command:
      hex: "53 45 52"
      type: read
    response:
      length_bytes: 13

  - id: model_name
    query_command: "MNA"
    type: string
    command:
      hex: "4D 4E 41"
      type: read
    response:
      length_bytes: 13

  - id: firmware_version
    query_command: "GVE"
    type: string
    command:
      hex: "47 56 45"
      type: read
    response:
      length_bytes: 6
      description: "ASCII firmware version"

  - id: rs232_table_version
    query_command: "RTV"
    type: integer
    command:
      hex: "52 54 56"
      type: read

  - id: internal_temperature
    query_command: "RTT"
    type: integer
    range: [-128, 127]
    unit: celsius
    command:
      hex: "52 54 54"
      type: read

  - id: fan1_speed
    query_command: "RSF"
    type: integer
    unit: rpm
    command:
      hex: "52 53 46"
      type: read
      value: 0
    response:
      description: "RPM = 30 × reply value"

  - id: fan2_speed
    query_command: "RSF"
    type: integer
    unit: rpm
    command:
      hex: "52 53 46"
      type: read
      value: 1
    response:
      description: "RPM = 30 × reply value"

  - id: gamma_mode
    query_command: "GAC"
    type: enum
    values: [off, "2.2"]
    command:
      hex: "47 41 43"
      type: read

  - id: red_gain
    query_command: "USR"
    type: integer
    command:
      hex: "55 53 52"
      type: read

  - id: green_gain
    query_command: "USG"
    type: integer
    command:
      hex: "55 53 47"
      type: read

  - id: blue_gain
    query_command: "USB"
    type: integer
    command:
      hex: "55 53 42"
      type: read

  - id: red_offset
    query_command: "UOR"
    type: integer
    command:
      hex: "55 4F 52"
      type: read

  - id: green_offset
    query_command: "UOG"
    type: integer
    command:
      hex: "55 4F 47"
      type: read

  - id: blue_offset
    query_command: "UOB"
    type: integer
    command:
      hex: "55 4F 42"
      type: read

  - id: vga_horizontal_position
    query_command: "HOR"
    type: integer
    command:
      hex: "48 4F 52"
      type: read

  - id: vga_vertical_position
    query_command: "VER"
    type: integer
    command:
      hex: "56 45 52"
      type: read

  - id: luminance_chromaticity_9300k
    query_command: "RXY"
    type: binary
    length_bytes: 25
    command:
      hex: "42 58 59"
      type: read
    response:
      description: "25 bytes: RY/GY/BY/WY luminance, Rx/Ry/Gx/Gy/Bx/By/Wx/Wy chromaticity, checksum"

  - id: accumulated_operation_time
    query_command: "OTT"
    type: integer
    unit: minutes
    command:
      hex: "4F 54 54"
      type: read
    response:
      length_bytes: 4

  - id: operation_time
    query_command: "OTS"
    type: integer
    unit: minutes
    command:
      hex: "4F 54 53"
      type: read
    response:
      length_bytes: 4

  - id: error_code
    query_command: "ERR"
    type: integer
    command:
      hex: "45 52 52"
      type: read
    response:
      length_bytes: 4

  - id: max_temperature_and_time
    query_command: "LMT"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 54"
      type: read
    response:
      description: "Max temperature and accumulated operation time (minutes)"

  - id: error_log_1
    query_command: "LM1"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 31"
      type: read
    response:
      description: "1st error log"

  - id: error_log_2
    query_command: "LM2"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 32"
      type: read
    response:
      description: "2nd error log"

  - id: error_log_3
    query_command: "LM3"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 33"
      type: read
    response:
      description: "3rd error log"

  - id: error_log_4
    query_command: "LM4"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 34"
      type: read
    response:
      description: "4th error log"

  - id: error_log_5
    query_command: "LM5"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 35"
      type: read
    response:
      description: "5th error log"

  - id: error_log_6
    query_command: "LM6"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 36"
      type: read
    response:
      description: "6th error log"

  - id: error_log_7
    query_command: "LM7"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 37"
      type: read
    response:
      description: "7th error log"

  - id: error_log_8
    query_command: "LM8"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 38"
      type: read
    response:
      description: "8th error log"

  - id: error_log_9
    query_command: "LM9"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 39"
      type: read
    response:
      description: "9th error log"

  - id: error_log_10
    query_command: "LMA"
    type: binary
    length_bytes: 8
    command:
      hex: "4C 4D 41"
      type: read
    response:
      description: "10th error log"

  - id: key_lock_state
    query_command: "KLC"
    type: enum
    values: [unlocked, locked]
    command:
      hex: "4B 4C 43"
      type: read

  - id: wake_from_sleep_mode
    query_command: "WFS"
    type: enum
    values: [vga_only, "vga_digital_rs232", never_sleep]
    command:
      hex: "57 46 53"
      type: read

  - id: scheme
    query_command: "SCM"
    type: enum
    values: [user, sport, game, cinema, vivid]
    command:
      hex: "53 43 4D"
      type: read

  - id: video_wall_state
    query_command: "VWS"
    type: enum
    values: [off, on]
    command:
      hex: "56 57 53"
      type: read

  - id: video_wall_frameless
    query_command: "VWF"
    type: enum
    values: [off, on]
    command:
      hex: "56 57 46"
      type: read

  - id: video_wall_matrix
    query_command: "MAT"
    type: string
    command:
      hex: "4D 41 54"
      type: read
    response:
      description: "High nibble = X (1-10), low nibble = Y (1-10)"

  - id: video_wall_division
    query_command: "DIV"
    type: binary
    command:
      hex: "44 49 56"
      type: read
    note: "UNRESOLVED: reply format not documented in source"

  - id: anti_tearing_mode
    query_command: "ATT"
    type: enum
    values: [off, auto, odd, even]
    command:
      hex: "41 54 54"
      type: read

  - id: power_on_delay_integral
    query_command: "POD"
    type: integer
    range: [0, 30]
    unit: seconds
    command:
      hex: "50 4F 44"
      type: read

  - id: power_on_delay_fractional
    query_command: "POE"
    type: integer
    range: [0, 19]
    command:
      hex: "50 4F 45"
      type: read
      description: "0.05s increments"
```

## Variables
```yaml
# All adjustable parameters are represented as actions above.
# The protocol uses the same CMD hex for both write and read (TYPE byte differentiates).
```

## Events
```yaml
# UNRESOLVED: no unsolicited notification events described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source does not describe safety interlocks or power-on sequencing warnings
```

## Notes
- Binary frame format: `[STX=07][IDT=01-19][TYPE=00|01|02][CMD(3 bytes)][VALUE][ETX=08][CR=0x0D]`
- `[IDT]` = 00 for broadcast to all panels in video wall
- `[TYPE]`: 00 = response from panel, 01 = read/action, 02 = write
- IR codes use NEC protocol, custom code 0x40AF, carrier 38 kHz, max rate 9 Hz
- Fan speed conversion: RPM = 30 × reply value
- Color temperature range 3200K–9600K mapped to 0–64 decimal
- Gain values 0–255 map to actual gain range 128–383
- Offset values 0–100 map to actual offset range -50–50
- Auto-sort Monitor ID in broadcast mode: Value = 0x01
- Auto-arrange Division X/Y in broadcast mode: Value = 0x11

<!-- UNRESOLVED: Ethernet/Telnet port number not stated -->
<!-- UNRESOLVED: RS-485 specific wiring/pinout not documented -->
<!-- UNRESOLVED: DIV command (video wall division) value/reply fields not documented in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
  - manualslib.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-001659-01-christie-lit-tech-ref-api-fhd553-x.pdf
  - https://www.manualslib.com/manual/1755946/Christie-Fhd553-X.html
retrieved_at: 2026-05-14T13:55:20.115Z
last_checked_at: 2026-10-07T13:24:52.739Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:24:52.739Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "All 101 action units match source CMD rows and transport supported; discrete IR table is a separate channel excluded from coverage. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Ethernet port number not stated in source — source says \"Telnet protocol\" but no port specified"
- "RS-485 wiring details not documented beyond mentioning RS-485 alongside RS-232"
- "DIV command (video wall division) listed in source with no value/reply fields documented"
- "Telnet port not stated in source"
- "value/reply fields not documented in source\""
- "reply format not documented in source\""
- "no unsolicited notification events described in source"
- "no multi-step sequences described in source"
- "source does not describe safety interlocks or power-on sequencing warnings"
- "Ethernet/Telnet port number not stated"
- "RS-485 specific wiring/pinout not documented"
- "DIV command (video wall division) value/reply fields not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
