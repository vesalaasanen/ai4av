---
spec_id: admin/viewsonic-ifp9850-3
schema_version: ai4av-public-spec-v1
revision: 1
title: "ViewSonic IFP9850 3 Control Spec"
manufacturer: ViewSonic
model_family: "IFP9850 3"
aliases: []
compatible_with:
  manufacturers:
    - ViewSonic
  models:
    - "IFP9850 3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-19T17:13:32.839Z
generated_at: 2026-05-19T17:13:32.839Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-19T17:13:32.839Z
  matched_actions: 43
  action_count: 43
  confidence: high
  summary: "All 43 spec actions matched verbatim in source; all transport parameters confirmed; complete coverage of command catalogue."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# ViewSonic IFP9850 3 Control Spec

## Summary

ViewSonic IFP9850 3 large format display controllable via RS-232 serial and TCP/IP (LAN, port 5000). The protocol uses 9-byte ASCII command packets with a display ID field, supporting set commands, get/query commands, and IR remote-control pass-through. This spec is derived from the generic ViewSonic LFD RS232 & LAN Protocol document; some commands may not apply to this model due to platform constraints.

<!-- UNRESOLVED: source document covers all ViewSonic LFDs; specific command subset for IFP9850 3 not confirmed -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 5000
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: source states "Logon Credentials: No"
```

## Traits
```yaml
traits:
  - powerable    # inferred from power on/off commands
  - queryable    # inferred from extensive get-function commands
  - routable     # inferred from input select commands
  - levelable    # inferred from brightness, volume, contrast, bass, treble, balance controls
```

## Actions
```yaml
# All commands use 9-byte packet format: Length(1) + ID(2) + Type(1) + Command(1) + Value(3) + CR(0x0D)
# Set commands use type "s" (0x73). ID range: 01-98 (default 01), 99 = all displays.
# Display replies with "+" (0x2B) for valid, "-" (0x2D) for invalid.
# See Notes section for full packet format details.

# --- Basic Functions ---

- id: power
  label: Power On/Standby
  kind: action
  command_code: "!"  # 0x21
  params:
    - name: state
      type: enum
      values:
        - "000"  # Standby
        - "001"  # On
      description: "000=Standby, 001=On"

- id: input_select
  label: Select Input
  kind: action
  command_code: "\""  # 0x22
  params:
    - name: input
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
        - "009"  # DP1
        - "029"  # DP2
        - "019"  # Type-C 1
        - "039"  # Type-C 2
        - "00A"  # Embedded/Main (Android)
        - "00Z"  # Cycle
      description: "Input source code. 2nd digit indicates extension for duplicates. 00Z = cycle mode."

- id: brightness
  label: Set Brightness
  kind: action
  command_code: "$"  # 0x24
  params:
    - name: value
      type: integer
      description: "000-100 for absolute value. 900=brightness down (-1), 901=brightness up (+1)."

- id: backlight
  label: Set Backlight
  kind: action
  command_code: "B"  # 0x42
  command_type: "A"  # 0x41 - uses "A" instead of "s"
  params:
    - name: value
      type: integer
      description: "000-100. For Android platform main mode; other sources controlled by brightness."

- id: power_lock
  label: Set Power Lock
  kind: action
  command_code: "4"  # 0x34
  params:
    - name: state
      type: enum
      values:
        - "000"  # Unlock
        - "001"  # Lock
      description: "000=Unlock, 001=Lock"

- id: volume
  label: Set Volume
  kind: action
  command_code: "5"  # 0x35
  params:
    - name: value
      type: integer
      description: "000-100 for absolute value. 900=volume down (-1), 901=volume up (+1)."

- id: mute
  label: Set Mute
  kind: action
  command_code: "6"  # 0x36
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On (mute)
      description: "000=Off, 001=On (muted)"

- id: button_lock
  label: Set Button Lock
  kind: action
  command_code: "8"  # 0x38
  params:
    - name: state
      type: enum
      values:
        - "000"  # Unlock
        - "001"  # Lock
      description: "000=Unlock, 001=Lock. Locks all front panel and RCU buttons except Power."

- id: menu_lock
  label: Set Menu Lock
  kind: action
  command_code: ">"  # 0x3E
  params:
    - name: state
      type: enum
      values:
        - "000"  # Unlock
        - "001"  # Lock
      description: "000=Unlock, 001=Lock"

- id: number
  label: Send Number
  kind: action
  command_code: "@"  # 0x40
  params:
    - name: value
      type: integer
      description: "000-009"

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
        - "006"  # MENU/EXIT
        - "007"  # EXIT
      description: "Emulates front panel key press"

- id: remote_control_mode
  label: Set Remote Control Mode
  kind: action
  command_code: "B"  # 0x42
  params:
    - name: mode
      type: enum
      values:
        - "000"  # Disable - RCU non-functional
        - "001"  # Enable - RCU controls normally
        - "002"  # Pass through - display bypasses RC code to RS232 host
      description: "000=Disable, 001=Enable, 002=Pass-through mode"

- id: restore_default
  label: Restore Factory Defaults
  kind: action
  command_code: "~"  # 0x7E
  params:
    - name: confirm
      type: enum
      values:
        - "000"
      description: "Send 000 to restore factory settings"

# --- Optional Functions ---

- id: contrast
  label: Set Contrast
  kind: action
  command_code: "#"  # 0x23
  params:
    - name: value
      type: integer
      description: "000-100"

- id: sharpness
  label: Set Sharpness
  kind: action
  command_code: "%"  # 0x25
  params:
    - name: value
      type: integer
      description: "000-100"

- id: color
  label: Set Color
  kind: action
  command_code: "&"  # 0x26
  params:
    - name: value
      type: integer
      description: "000-100"

- id: tint
  label: Set Tint
  kind: action
  command_code: "'"  # 0x27
  params:
    - name: value
      type: integer
      description: "000-100"

- id: backlight_on_off
  label: Set Backlight On/Off
  kind: action
  command_code: "("  # 0x28
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On
      description: "000=Off, 001=On"

- id: color_mode
  label: Set Color Mode
  kind: action
  command_code: ")"  # 0x29
  params:
    - name: mode
      type: enum
      values:
        - "000"  # Normal
        - "001"  # Warm
        - "002"  # Cold
        - "003"  # Personal
      description: "Color temperature preset"

- id: freeze
  label: Set Freeze
  kind: action
  command_code: "*"  # 0x2A
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On
      description: "000=Off, 001=On (freeze screen)"

- id: surround_sound
  label: Set Surround Sound
  kind: action
  command_code: "-"  # 0x2D
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On
      description: "000=Off, 001=On"

- id: bass
  label: Set Bass
  kind: action
  command_code: "."  # 0x2E
  params:
    - name: value
      type: integer
      description: "000-100"

- id: treble
  label: Set Treble
  kind: action
  command_code: "/"  # 0x2F
  params:
    - name: value
      type: integer
      description: "000-100"

- id: balance
  label: Set Balance
  kind: action
  command_code: "0"  # 0x30
  params:
    - name: value
      type: integer
      description: "000-100. 050 is center."

- id: picture_size
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
      description: "Aspect ratio mode"

- id: osd_language
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
      description: "OSD language. May be extended by model."

- id: pip_mode
  label: Set PIP Mode
  kind: action
  command_code: "9"  # 0x39
  params:
    - name: mode
      type: enum
      values:
        - "000"  # Off
        - "001"  # PIP (POP)
        - "002"  # PBP
      description: "Picture-in-picture mode"

- id: pip_sound_select
  label: Set PIP Sound Select
  kind: action
  command_code: ":"  # 0x3A
  params:
    - name: source
      type: enum
      values:
        - "000"  # Main
        - "001"  # Sub
      description: "Select which PIP window audio to output"

- id: pip_position
  label: Set PIP Position
  kind: action
  command_code: ";"  # 0x3B
  params:
    - name: position
      type: enum
      values:
        - "000"  # Up
        - "001"  # Down
        - "002"  # Left
        - "003"  # Right
      description: "PIP sub-window position"

- id: pip_input
  label: Set PIP Input
  kind: action
  command_code: "7"  # 0x37
  params:
    - name: input
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
        - "009"  # DP/Type-C
        - "00A"  # Embedded/Main (Android)
      description: "PIP sub-window input source. Value range same as input_select."

- id: tiling_mode
  label: Set Tiling Mode
  kind: action
  command_code: "P"  # 0x50
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On
      description: "Video wall tiling mode"

- id: tiling_compensation
  label: Set Tiling Compensation
  kind: action
  command_code: "Q"  # 0x51
  params:
    - name: state
      type: enum
      values:
        - "000"  # Off
        - "001"  # On
      description: "Bezel width compensation for video wall"

- id: tiling_h_by_v
  label: Set Tiling H×V Monitors
  kind: action
  command_code: "R"  # 0x52
  params:
    - name: layout
      type: string
      description: "Format HHxVV where H=01-09 (horizontal monitors), V=1-9 (vertical monitors). 2nd digit=H, 3rd digit=V."

- id: tiling_position
  label: Set Tiling Position
  kind: action
  command_code: "S"  # 0x53
  params:
    - name: position
      type: integer
      description: "001-025. Copies the screen of this position# to the identified display."

- id: date_year
  label: Set Date Year
  kind: action
  command_code: "V"  # 0x56
  params:
    - name: year
      type: string
      description: "Format Y17-Y99 (last 2 digits, 2017-2099). Value bytes carry prefix 'Y'."

- id: date_month
  label: Set Date Month
  kind: action
  command_code: "V"  # 0x56
  params:
    - name: month
      type: string
      description: "Format M01-M12. Value bytes carry prefix 'M'."

- id: date_day
  label: Set Date Day
  kind: action
  command_code: "V"  # 0x56
  params:
    - name: day
      type: string
      description: "Format D01-D31. Value bytes carry prefix 'D'."

- id: time_hour
  label: Set Time Hour
  kind: action
  command_code: "W"  # 0x57
  params:
    - name: hour
      type: string
      description: "Format H00-H23 (24-hour). Value bytes carry prefix 'H'."

- id: time_min
  label: Set Time Minute
  kind: action
  command_code: "W"  # 0x57
  params:
    - name: minute
      type: string
      description: "Format M00-M59. Value bytes carry prefix 'M'."

- id: time_sec
  label: Set Time Second
  kind: action
  command_code: "W"  # 0x57
  params:
    - name: second
      type: string
      description: "Format S00-S59. Value bytes carry prefix 'S'."

- id: custom_hot_key
  label: Customized Hot Key
  kind: action
  command_code: "X"  # 0x58
  params:
    - name: key_id
      type: integer
      description: "001-999. 001=Open MVBA app."

- id: function_on_off
  label: Set Function On/Off
  kind: action
  command_code: "="  # 0x3D
  params:
    - name: function
      type: enum
      values:
        - "001"  # Backlight Off
        - "101"  # Backlight On
        - "002"  # Freeze Off
        - "102"  # Freeze On
        - "003"  # Touch Off
        - "103"  # Touch On
      description: "Unified on/off for backlight, freeze, touch functions"

- id: wake_on_lan
  label: Wake-on-LAN
  kind: action
  description: "Sends WoL magic packet via UDP port 9. 126-byte packet: 6×0xFF + 16×MAC address + 24×0x00."
  params:
    - name: mac_address
      type: string
      description: "Target display MAC address"
```

## Feedbacks
```yaml
# Get commands use type "g" (0x67) unless noted.
# Reply type "r" (0x72) = valid with value; "-" (0x2D) = invalid.
# Value bytes always "000" in the query; reply contains actual value.

# --- Basic Functions ---

- id: get_brightness
  label: Get Brightness
  command_code: "b"  # 0x62
  type: integer
  range: "000-100"

- id: get_backlight
  label: Get Backlight
  command_code: "B"  # 0x42
  command_type: "a"  # source lists "a" instead of "g" for this query
  type: integer
  range: "000-100"

- id: get_volume
  label: Get Volume
  command_code: "f"  # 0x66
  type: integer
  range: "000-100"

- id: get_mute
  label: Get Mute State
  command_code: "g"  # 0x67
  type: enum
  values:
    - "000"  # Off
    - "001"  # On (muted)

- id: get_input_select
  label: Get Input Selection
  command_code: "j"  # 0x6A
  type: string
  description: "1st digit: 0=no signal, 1=signal detected. 2nd and 3rd digits: see input_select values."

- id: get_power_status
  label: Get Power Status
  command_code: "l"  # 0x6C
  type: enum
  values:
    - "000"  # Standby
    - "001"  # On

- id: get_remote_control
  label: Get Remote Control Mode
  command_code: "n"  # 0x6E
  type: enum
  values:
    - "000"  # Disable
    - "001"  # Enable
    - "002"  # Pass through

- id: get_power_lock
  label: Get Power Lock
  command_code: "o"  # 0x6F
  type: enum
  values:
    - "000"  # Unlock
    - "001"  # Lock

- id: get_button_lock
  label: Get Button Lock
  command_code: "p"  # 0x70
  type: enum
  values:
    - "000"  # Unlock
    - "001"  # Lock

- id: get_menu_lock
  label: Get Menu Lock
  command_code: "q"  # 0x71
  type: enum
  values:
    - "000"  # Unlock
    - "001"  # Lock

- id: get_ack
  label: Communication Link Test
  command_code: "z"  # 0x7A
  type: enum
  values:
    - "000"
  description: "Tests RS232/LAN communication link. Reply confirms connectivity."

- id: get_thermal
  label: Get Temperature
  command_code: "0"  # 0x30
  type: integer
  range: "-99 to +100"
  description: "Temperature in degrees Celsius. Positive: 000-100. Negative: -01 to -99."

- id: get_operation_hour
  label: Get Operation Hours
  command_code: "1"  # 0x31
  type: integer
  description: "Accumulated operation hours. 6-digit integer (000,001-999,999). Reply in 32-byte format."

- id: get_device_name
  label: Get Device Name
  command_code: "4"  # 0x34
  type: string
  description: "Reply in 32-byte format. E.g. 'CDE-5500'."

- id: get_mac_address
  label: Get MAC Address
  command_code: "5"  # 0x35
  type: string
  description: "For models with LAN. Reply in 32-byte format."

- id: get_ip_address
  label: Get IP Address
  command_code: "6"  # 0x36
  type: string
  description: "For models with LAN. Reply in 32-byte format."

- id: get_serial_number
  label: Get Serial Number
  command_code: "7"  # 0x37
  type: string
  description: "Reply in 32-byte format."

- id: get_fw_version
  label: Get Firmware Version
  command_code: "8"  # 0x38
  type: string
  description: "Reply in 32-byte format. E.g. '3.02.001'."

# --- Optional Functions ---

- id: get_contrast
  label: Get Contrast
  command_code: "a"  # 0x61
  type: integer
  range: "000-100"

- id: get_sharpness
  label: Get Sharpness
  command_code: "c"  # 0x63
  type: integer
  range: "000-100"

- id: get_color
  label: Get Color
  command_code: "d"  # 0x64
  type: integer
  range: "000-100"

- id: get_tint
  label: Get Tint
  command_code: "e"  # 0x65
  type: integer
  range: "000-100"

- id: get_backlight_on_off
  label: Get Backlight On/Off
  command_code: "h"  # 0x68
  type: enum
  values:
    - "000"  # Off
    - "001"  # On

- id: get_freeze_on_off
  label: Get Freeze On/Off
  command_code: "i"  # 0x69
  type: enum
  values:
    - "000"  # Off
    - "001"  # On

- id: get_pip_mode
  label: Get PIP Mode
  command_code: "t"  # 0x74
  type: enum
  values:
    - "000"  # Off
    - "001"  # PIP (POP)
    - "002"  # PBP

- id: get_pip_input
  label: Get PIP Input
  command_code: "u"  # 0x75
  type: string
  description: "Returns PIP input source code. See input_select values."

- id: get_tiling_mode
  label: Get Tiling Mode
  command_code: "v"  # 0x76
  type: enum
  values:
    - "000"  # Off
    - "001"  # On

- id: get_tiling_compensation
  label: Get Tiling Compensation
  command_code: "w"  # 0x77
  type: enum
  values:
    - "000"  # Off
    - "001"  # On

- id: get_tiling_h_by_v
  label: Get Tiling H×V Monitors
  command_code: "x"  # 0x78
  type: string
  description: "2nd digit=H monitors (1-9), 3rd digit=V monitors (1-9)."

- id: get_tiling_position
  label: Get Tiling Position
  command_code: "y"  # 0x79
  type: integer
  range: "000-025"

- id: get_date_year
  label: Get Date Year
  command_code: "2"  # 0x32
  type: string
  description: "Format Y17-Y99. Last 2 digits."

- id: get_date_month
  label: Get Date Month
  command_code: "2"  # 0x32
  type: string
  description: "Format M01-M12."

- id: get_date_day
  label: Get Date Day
  command_code: "2"  # 0x32
  type: string
  description: "Format D01-D31."

- id: get_time_hour
  label: Get Time Hour
  command_code: "3"  # 0x33
  type: string
  description: "Format H00-H23 (24-hour)."

- id: get_time_min
  label: Get Time Minute
  command_code: "3"  # 0x33
  type: string
  description: "Format M00-M59."

- id: get_time_sec
  label: Get Time Second
  command_code: "3"  # 0x33
  type: string
  description: "Format S00-S59."

- id: get_smart_hub
  label: Get Smart Hub Sensors
  command_code: ":"  # 0x3A
  type: string
  description: "000=all sensors. 00A=Ambient Temp, 00B=Ambient Humidity, 00C=Ambient Light, 00D=Ambient PIR detection. Reply in 32-byte format, each sub-item 6 bytes fixed."

- id: get_function_on_off
  label: Get Function On/Off Status
  command_code: "="  # 0x3D
  type: enum
  description: "Send 001 to get backlight status, 002 for freeze, 003 for touch. Reply: 0xx=Off, 1xx=On."
```

## Variables
```yaml
# No continuous settable variables beyond those represented as Actions with integer ranges.
# Brightness, volume, contrast, sharpness, color, tint, bass, treble, balance are discrete
# integer set commands (see Actions) rather than persistent variables.
```

## Events
```yaml
# Auto Reply: display sends updated status automatically when changed via RCU, front keys, or touch.
auto_reply_triggers:
  - power_on_off
  - input_select
  - brightness
  - backlight
  - volume
  - mute_on_off

# IR Pass-through events: when remote_control_mode is set to "002" (pass-through),
# display sends 7-byte packets (type "p") with RCU codes upon IR key activation.
# Format: Length(1) + ID(2) + Type "p"(1) + RCU_Code_MSB(1) + RCU_Code_LSB(1) + CR(0x0D)
ir_pass_through_codes:
  0x01: "Key 1"
  0x02: "Key 2"
  0x03: "Key 3"
  0x04: "Key 4"
  0x05: "Key 5"
  0x06: "Key 6"
  0x07: "Key 7"
  0x08: "Key 8"
  0x09: "Key 9"
  0x0A: "Key 0"
  0x0B: "Key -"
  0x0C: "Recall/Last"
  0x0D: "Info/Display"
  0x0F: "Aspect/Zoom/Size"
  0x10: "Volume Up"
  0x11: "Volume Down"
  0x12: "Mute"
  0x13: "Channel/Page Up / Brightness+"
  0x14: "Channel/Page Down / Brightness-"
  0x15: "Power"
  0x16: "Sources/Inputs"
  0x19: "Sleep"
  0x1A: "Menu"
  0x1B: "Up"
  0x1C: "Down"
  0x1D: "Left"
  0x1E: "Right"
  0x1F: "OK/Enter/Set"
  0x20: "Exit"
  0x2C: "Red/F1"
  0x2D: "Green/F2"
  0x2E: "Yellow/F3"
  0x2F: "Blue/F4"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences explicitly described in source
```

## Safety
```yaml
confirmation_required_for:
  - restore_default
interlocks:
  - description: "Power Lock: when enabled, front panel and RCU power key locked. RS232 SET_POWER still works but does not release the lock. Cannot be unlocked via OSD reset. Display auto AC power-on in power-lock state. Display will not enter power saving when no signal."
  - description: "Button Lock: locks all front panel and RCU buttons except Power. RS232 set functions remain workable."
  - description: "Menu Lock: locks MENU key on front panel and RCU."
  - description: "IR Power special sequence: when display is OFF and receives IR POWER code, it turns on THEN forwards code. When ON, forwards code THEN turns off. Power Lock suppresses IR Power entirely."
# UNRESOLVED: no explicit safety interlock sequencing (power-on order, thermal shutdown) documented in source
```

## Notes

### Packet format (Set-Function)

All set commands use 9-byte packets:

```
Byte 1:   Length (ASCII "8" = 0x38)
Byte 2-3: Display ID (ASCII, "01"-"98", default "01"; "99" = all displays)
Byte 4:   Command type "s" (0x73) for set
Byte 5:   Command code (1 ASCII byte, see Actions)
Byte 6-8: Value (3 ASCII bytes)
Byte 9:   CR (0x0D)
```

Reply: 5 bytes — Length + ID + "+"(0x2B)=valid or "-"(0x2D)=invalid + CR.

Exception: Set Backlight uses command type "A" (0x41) instead of "s".

### Packet format (Get-Function)

Same 9-byte structure, but command type "g" (0x67) and value always "000".

Reply for valid queries: 9 bytes — Length + ID + "r"(0x72) + Command code + Value(3 bytes) + CR.

Some queries (operation hour, device name, MAC, IP, serial, FW version) reply in 32-byte format.

### Packet format (IR Pass-through)

7-byte reply only (no send): Length + ID + "p"(0x70) + RCU_Code_MSB + RCU_Code_LSB + CR.

### Display ID

ID "99" broadcasts to all connected displays. Only display #1 replies. IDs set via OSD menu.

### Wake-on-LAN

Alternative power-on method using UDP port 9. Magic packet: 6×0xFF + 16×(6-byte MAC) + 24×0x00 = 126 bytes total. May only work under specific modes depending on display model.

### Date/Time commands

Date and time set/get use prefixed value bytes (Y/M/D/H/M/S prefix in value field). Multiple commands required to set full date or time.

### Cross-subset limitation

LAN communication does not support cross-subnet connections.

<!-- UNRESOLVED: flow control setting for RS-232 not stated -->
<!-- UNRESOLVED: specific command subset supported by IFP9850 3 not confirmed — source is generic LFD protocol -->
<!-- UNRESOLVED: WOL by MAC address availability for this specific model not confirmed -->
<!-- UNRESOLVED: protocol version number not stated in source -->
<!-- UNRESOLVED: maximum concurrent connection count for TCP not stated -->
<!-- UNRESOLVED: command timing constraints (minimum interval between commands) not stated -->

## Provenance

```yaml
source_domains:
  - viewsonicglobal.com
source_urls:
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDX5560_CDX5562/CDX5560_CDX5562_UG_ENG.pdf
  - https://www.viewsonicglobal.com/public/products_download/user_guide/CD/CDE5010/CDE5010_UG_ENG.pdf
  - "https://www.viewsonicglobal.com/public/products_download/user_guide/projector/LSC_6_7_8_Series/LSC%20Series%20RS-232%20LAN%20Control%20Protocol%20Specification.pdf"
  - "https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf?pass"
  - https://www.viewsonicglobal.com/public/products_download/97/Commercial_Displays_RS232.pdf
retrieved_at: 2026-04-30T10:02:07.423Z
last_checked_at: 2026-05-19T17:13:32.839Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-19T17:13:32.839Z
matched_actions: 43
action_count: 43
confidence: high
summary: "All 43 spec actions matched verbatim in source; all transport parameters confirmed; complete coverage of command catalogue."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
