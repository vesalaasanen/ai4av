---
spec_id: admin/christie-e-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie E Series Projector Control Spec"
manufacturer: Christie
model_family: "Christie E Series"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "Christie E Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T18:17:14.922Z
generated_at: 2026-05-14T18:17:14.922Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:14.922Z
  matched_actions: 77
  action_count: 101
  confidence: high
  summary: "All 77 spec actions matched literally in source; transport parameters verified; comprehensive coverage of E-Series command set."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Christie E Series Projector Control Spec

## Summary
Christie E Series projector controlled via RS-232 serial protocol (ASCII text messages) or Ethernet. Messages use a parenthesized format: `(Code Data)`, `(Code ?)` for requests, `(Code !Data)` for replies. Supports power control, input routing, image adjustment, lamp management, PIP/PBP, and network configuration.

<!-- UNRESOLVED: Ethernet TCP port number not stated in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 115200  # default; configurable via BDR command (2400-115200)
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # PWR command present
- routable        # SIN command for input switching present
- queryable       # request/reply pattern (? and !) present
- levelable       # brightness, contrast, color, tint, gain/offset, etc.
```

## Actions
```yaml
- id: power
  label: Power On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Off (standby), 1=On

- id: input_select
  label: Select Input
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV/BNC, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"
    - name: window
      type: enum
      values: [MAIN, PIP]
      description: Which window to apply source to (default MAIN)

- id: size_preset
  label: Size Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"
    - name: modifier
      type: enum
      values: [n, p]
      description: "n=next, p=previous (optional)"

- id: overscan
  label: Over Scan
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Zoom, 2=Crop"
    - name: modifier
      type: enum
      values: [n, p]
      description: "n=next, p=previous (optional)"

- id: pixel_phase
  label: Pixel Phase
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: pixel_track
  label: Pixel Track
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: horz_position
  label: Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: vert_position
  label: Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: horz_keystone
  label: Horizontal Keystone
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: vert_keystone
  label: Vertical Keystone
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: horz_pincushion
  label: Horizontal Pincushion
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: vert_pincushion
  label: Vertical Pincushion
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: digital_zoom
  label: Digital Zoom
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      description: "0=smallest display area, 100=normal"

- id: digital_horz_shift
  label: Digital Horizontal Shift
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: digital_vert_shift
  label: Digital Vertical Shift
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: auto_image
  label: Auto Image
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Force reacquire/lock to input signal"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: color_space
  label: Color Space
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"
    - name: modifier
      type: enum
      values: [n, p]

- id: detail
  label: Detail (Sharpness)
  kind: action
  params:
    - name: level
      type: integer
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"
    - name: modifier
      type: enum
      values: [n, p]

- id: color_saturation
  label: Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: tint
  label: Tint (Red/Green Balance)
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 0

- id: flesh_tone_correction
  label: Flesh Tone Correction
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 0

- id: video_black_level
  label: Video Black Level (IRE)
  kind: action
  params:
    - name: state
      type: integer
      description: "0=IRE off, 1=IRE on"
    - name: modifier
      type: enum
      values: [n, p]

- id: film_mode_detection
  label: Detect Film Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: closed_captions
  label: Closed Captions
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=CC1, 2=CC2"
    - name: modifier
      type: enum
      values: [n, p]

- id: red_gain
  label: Red Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: green_gain
  label: Green Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: blue_gain
  label: Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: red_offset
  label: Red Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: green_offset
  label: Green Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: blue_offset
  label: Blue Offset
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: sync_threshold
  label: Sync Threshold (SOG)
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: rgb_gain_offset_reset
  label: RGB Gain/Offset Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset RGB Gain/Offset settings"

- id: picture_setting
  label: Picture Setting
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"
    - name: modifier
      type: enum
      values: [n, p]

- id: picture_setting_store
  label: Store Picture Settings to User Mode
  kind: action
  params:
    - name: slot
      type: integer
      description: "User slot number (1-based)"

- id: dynamic_black
  label: DynamicBlack
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: gamma_curve
  label: Gamma Curve
  kind: action
  params:
    - name: curve
      type: integer
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"
    - name: modifier
      type: enum
      values: [n, p]

- id: brilliant_color
  label: BrilliantColor
  kind: action
  params:
    - name: value
      type: integer
      description: "0=Normal Look, 1=Bright Look; range 1-10 adjustable via HSG white gain"

- id: white_peaking
  label: White Peaking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: preset
      type: integer
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"
    - name: modifier
      type: enum
      values: [n, p]

- id: edge_enhancement
  label: Edge Enhancement
  kind: action
  params:
    - name: level
      type: integer
      description: "0=Off, 1=Normal, 2=Maximum"
    - name: modifier
      type: enum
      values: [n, p]

- id: color_wheel_speed
  label: Color Wheel Speed
  kind: action
  params:
    - name: speed
      type: integer
      description: "0=2x, 1=3x"
    - name: modifier
      type: enum
      values: [n, p]

- id: language
  label: OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"
    - name: modifier
      type: enum
      values: [n, p]

- id: focus
  label: Lens Focus
  kind: action
  params:
    - name: direction
      type: enum
      values: [n, p, integer]
      description: "n=increase, p=decrease, or integer value"

- id: zoom
  label: Lens Zoom
  kind: action
  params:
    - name: direction
      type: enum
      values: [n, p, integer]
      description: "n=increase, p=decrease, or integer value"

- id: lens_shift_vertical
  label: Lens Shift Vertical
  kind: action
  params:
    - name: direction
      type: enum
      values: [n, p, integer]

- id: lens_shift_horizontal
  label: Lens Shift Horizontal
  kind: action
  params:
    - name: direction
      type: enum
      values: [n, p, integer]

- id: lens_lock
  label: Lock Lens Motors
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Allow, 1=Locked"
    - name: modifier
      type: enum
      values: [n, p]

- id: lens_center
  label: Lens Center (Calibrate and Return to Home)
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Calibrate and return to home"

- id: ceiling_mount
  label: Ceiling Mount
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=On, 2=Auto (G-sensor)"

- id: rear_projection
  label: Rear Projection
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: menu_shift_horizontal
  label: Menu Shift Horizontal
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 0

- id: menu_shift_vertical
  label: Menu Shift Vertical
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 0

- id: menu_transparency
  label: Menu Transparency
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 90]
      default: 0

- id: show_messages
  label: Show OSD Messages
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: screen
      type: integer
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"
    - name: modifier
      type: enum
      values: [n, p]

- id: pin_protect
  label: PIN Protect
  kind: action
  params:
    - name: pin
      type: string
      description: "5-digit PIN number (0-9)"

- id: change_pin
  label: Change PIN
  kind: action
  params:
    - name: old_pin
      type: string
      description: "Old 5-digit PIN"
    - name: new_pin
      type: string
      description: "New 5-digit PIN"

- id: standby_mode
  label: Standby Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=1W Mode, 1=Communication Mode"
    - name: modifier
      type: enum
      values: [n, p]

- id: auto_power_on
  label: Auto Power On
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  params:
    - name: minutes
      type: integer
      description: "0=Off/Never, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"
    - name: modifier
      type: enum
      values: [n, p]

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: hours
      type: integer
      description: "0=Off, 1=2hrs, 2=4hrs, 3=6hrs"
    - name: modifier
      type: enum
      values: [n, p]

- id: high_altitude
  label: High Altitude Mode
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: network_dhcp
  label: Network DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: network_ip
  label: Network IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: "IP address string e.g. '192.168.000.001'"

- id: network_subnet
  label: Network Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: "Subnet mask string e.g. '255.255.255.000'"

- id: network_gateway
  label: Network Default Gateway
  kind: action
  params:
    - name: gateway
      type: string

- id: network_hostname
  label: Network Hostname
  kind: action
  params:
    - name: name
      type: string
      description: "Projector hostname"

- id: network_mac
  label: Network MAC Address
  kind: action
  params:
    - name: mac
      type: string
      description: "MAC address string"

- id: network_show
  label: Network Messages
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"

- id: network_restart
  label: Restart Network
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Restart network"

- id: network_reset
  label: Network Factory Reset
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Reset network to factory defaults"

- id: serial_baud_rate
  label: Serial Port Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200 (default)"
    - name: modifier
      type: enum
      values: [n, p]

- id: serial_echo
  label: Serial Port Echo
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: trigger_12v
  label: 12V Trigger
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=On"
    - name: modifier
      type: enum
      values: [n, p]

- id: hotkey_setting
  label: Hot-Key Function
  kind: action
  params:
    - name: func
      type: integer
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze, 3=Projector Info, 4=Overscan, 5=Closed Captions"
    - name: modifier
      type: enum
      values: [n, p]

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=280W, 1=285W, 2=290W, 3=295W, 4=300W, 5=305W, 6=310W, 7=315W, 8=320W, 9=325W, 10=330W (default)"

- id: lamp_operation
  label: Lamp Operation Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=Lamp1 only, 2=Lamp2 only, 3=Both lamps"
    - name: modifier
      type: enum
      values: [n, p]

- id: whisper_mode
  label: Whisper Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"
    - name: modifier
      type: enum
      values: [n, p]

- id: lamp_auto_switch
  label: Lamp Auto Switch
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Switch on failure only, 1=Switch on every power on, 2=Switch after N hours"
    - name: modifier
      type: enum
      values: [n, p]

- id: lamp_auto_switch_time
  label: Lamp Auto Switch Hours
  kind: action
  params:
    - name: hours
      type: integer
      description: "Number of hours for auto switch"

- id: lamp_life_warning
  label: Lamp Life Warning
  kind: action
  params:
    - name: hours
      type: integer
      description: "Warning threshold in hours (0=off)"

- id: reset_lamp_hours
  label: Reset Lamp Hours
  kind: action
  params:
    - name: lamp
      type: enum
      values: [LMP1, LMP2, BOTH]
      description: "Which lamp(s) to reset"

- id: pip
  label: PIP/PBP Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Disable, 1=Enable"

- id: pip_swap
  label: PIP/PBP Swap
  kind: action
  params:
    - name: value
      type: integer
      description: "1=Swap MAIN and PIP sources"

- id: pip_size
  label: PIP/PBP Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=Small, 1=Medium, 2=Large"

- id: pip_layout
  label: PIP/PBP Layout
  kind: action
  params:
    - name: layout
      type: integer
      description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"

- id: timing_detect_mode
  label: Timing Detect Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Normal, 1=Wide"
    - name: modifier
      type: enum
      values: [n, p]

- id: enabled_hotkey_source
  label: Enabled Main Source Hot Key
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ON, 1=OFF"

- id: main_source_hotkey
  label: Main Source Hot-Key Assignment
  kind: action
  params:
    - name: source
      type: enum
      values: [VGA1, VGA2, BNC1, HDM1, HDM2, CON1, SVDO, COPS]
    - name: key
      type: integer
      description: "Key number 0-9"

- id: source_key_function
  label: Source Key Function
  kind: action
  params:
    - name: func
      type: integer
      description: "0=Change source, 1=List all sources, 2=Change source with Auto"

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "0=Off, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red (svc), 7=Green (svc), 8=Blue (svc), 9=Yellow (svc), 10=Magenta (svc), 11=Cyan (svc)"
    - name: modifier
      type: enum
      values: [n, p]

- id: color_wheel_index
  label: Color Wheel Index Setting
  kind: action
  params:
    - name: speed
      type: enum
      values: [SPX2, SPX3]
    - name: value
      type: integer
      description: "Index value e.g. 26"

- id: factory_defaults
  label: Factory Defaults
  kind: action
  params:
    - name: code
      type: integer
      description: "Must send 111 to confirm"

- id: service_code
  label: Enter Service Code
  kind: action
  params:
    - name: credentials
      type: string
      description: '"username,password" format e.g. "service,service"'

- id: source_name
  label: Source Name Setting
  kind: action
  params:
    - name: source
      type: enum
      values: [SRC0, SRC1, SRC2, SRC3, SRC4, SRC5, SRC6, SRC7]
      description: "VGA1, VGA2, BNC, HDMI1, HDMI2, Component, S-Video, Composite"
    - name: name
      type: string
      description: "New name for the source"

- id: key_code
  label: Key-Code Entry
  kind: action
  params:
    - name: code
      type: integer
      description: "Decimal keycode from IR remote spec (e.g. 17=Menu, 0=Power)"

- id: shutter
  label: Shutter On/Off
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Open/Shutter off, 1=Closed/Shutter on (black screen)"
    - name: modifier
      type: enum
      values: [n, p]

- id: osd
  label: OSD Show/Hide
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Hide, 1=Show"
    - name: modifier
      type: enum
      values: [n, p]
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [0, 1]
  description: "0=Standby, 1=Power On"

- id: input_state
  type: integer
  description: "Current input: 0=VGA1, 1=VGA2, 2=RGBHV/BNC, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"

- id: projector_status
  type: object
  description: "Returns model name, serial number, resolution, input, signal format, pixel clock, sync type, refresh rates, lamp hours, standby mode, lens lock, IP address, DHCP state"

- id: lamp_info
  type: object
  description: "Lamp hours (LP1H, LP2H, LPTH), lamp reset counts (LP1R, LP2R)"

- id: main_source_info
  type: object
  description: "Active source (ACTS), signal format (SGFT), aspect ratio (APRT), resolution (RESL), vert refresh (VREF), horz refresh (HREF), pixel clock (PIXC), sync type (SYNC), color space (CLSP)"

- id: secondary_source_info
  type: object
  description: "Same fields as main source info, for PIP/PBP window"

- id: projector_info
  type: object
  description: "Model name (MDLN), serial number (SNUM), native resolution (NERS), firmware version (FWVS), configuration (CFVS), boot code version (BCVS) - service mode only"

- id: serial_command_version
  type: string
  description: "E Series serial command version (SIV?)"

- id: last_serial_error
  type: string
  description: "Last serial command error description (LCE?)"

- id: last_system_error
  type: enum
  values: [1, 3, 4, 5]
  description: "Lamp fail (1,3), fan fail (4), over temp (5)"
```

## Variables
```yaml
# Network settings (read/write via NET command)
- id: network_dhcp
  type: boolean
- id: network_ip
  type: string
- id: network_subnet
  type: string
- id: network_gateway
  type: string
- id: network_hostname
  type: string
- id: network_mac
  type: string

# Lamp variables
- id: lamp_power_setting
  type: integer
  range: [0, 10]
  description: "10=330W default"
- id: current_lamp_operation
  type: enum
  values: [1, 2, 3]
  description: "1=Lamp1, 2=Lamp2, 3=Both"
- id: lamp1_hours
  type: integer
- id: lamp2_hours
  type: integer
- id: lamp_life_warning_threshold
  type: integer
  description: "0=disabled"
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event/notification messages from projector
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults  # requires sending code 111 to prevent accidental use
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated
```

## Notes
- Message format: all commands wrapped in parentheses, e.g. `(PWR1)` to power on, `(CON?)` to query contrast
- Request modifier: `?` — projector replies with `!` e.g. `(CON!50)`
- Set confirmation: `#` prefix requests echo acknowledgement after processing
- Modifiers: `n` (next value), `p` (previous value) for cycling through enumerated settings
- Subcodes use `+` separator: e.g. `(LIF+LP1H?)` for lamp 1 hours query, `(NET+DHCP0)` to disable DHCP
- Service mode required for: color wheel index, projector info (PIF), factory defaults, service code entry
- Default PIN is `12345`; PIN protects projector use when enabled
- 1W standby mode disables UART/WEB/USB power-on; Communication mode allows it
- Serial port baud rate configurable (BDR) from 2400 to 115200; default 115200
- Network commands (NET+) supported over same RS-232 interface
- Grid/Color Bars test patterns may take up to 18 seconds to switch away from

<!-- UNRESOLVED: Ethernet TCP port number for IP control not stated in source -->
<!-- UNRESOLVED: whether the projector sends unsolicited status messages ( Events section) not confirmed -->
<!-- UNRESOLVED: message timing/command pacing requirements not stated in source -->
<!-- UNRESOLVED: actual numeric lamp hour values at warning threshold not stated -->
<!-- UNRESOLVED: error code enumeration beyond LSE codes 1/3/4/5 not complete in source -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-14T18:17:14.922Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:14.922Z
matched_actions: 77
action_count: 101
confidence: high
summary: "All 77 spec actions matched literally in source; transport parameters verified; comprehensive coverage of E-Series command set."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
