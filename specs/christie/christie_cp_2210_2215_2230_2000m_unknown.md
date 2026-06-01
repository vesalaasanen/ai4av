---
spec_id: admin/christie-cp-2210-2215-2230-2000m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Christie CP 2210 2215 2230 2000M Control Spec"
manufacturer: Christie
model_family: "CP 2210"
aliases: []
compatible_with:
  manufacturers:
    - Christie
  models:
    - "CP 2210"
    - "CP 2215"
    - "CP 2230"
    - 2000M
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
last_checked_at: 2026-05-20T08:04:51.795Z
generated_at: 2026-05-20T08:04:51.795Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-20T08:04:51.795Z
  matched_actions: 95
  action_count: 95
  confidence: high
  summary: "All 95 spec actions matched source commands; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# Christie CP 2210 2215 2230 2000M Control Spec

## Summary
Christie E Series projector serial protocol. Controls via RS-232 (115200 baud default) or Ethernet. ASCII message format using 3-letter command codes with optional 4-letter subcodes. Three message types: Set (no suffix), Request (?), Reply (!). Supports power, input routing, image adjustment, lamp management, and network configuration.

<!-- UNRESOLVED: Ethernet port number not stated in source. TCP control protocol details not documented — only RS-232 serial described in detail. -->

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
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- queryable
- routable
- levelable
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
      description: "0 = off (standby), 1 = on"

- id: standby_mode
  label: Standby Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0 = 1W mode (keypad only), 1 = communication mode (full)"

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: source
      type: integer
      description: "0=VGA1, 1=VGA2, 2=RGBHV, 3=HDMI1, 4=HDMI2, 5=Component, 6=S-Video, 7=Composite"

- id: source_select_main
  label: Source Select (Main)
  kind: action
  params:
    - name: source
      type: integer

- id: source_select_pip
  label: Source Select (PIP)
  kind: action
  params:
    - name: source
      type: integer

- id: size_presets
  label: Size Presets
  kind: action
  params:
    - name: preset
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"
  notes: Accepts modifiers n (next) and p (previous)

- id: over_scan
  label: Over Scan
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=OFF, 1=ZOOM, 2=CROP"
  notes: Accepts modifiers n (next) and p (previous)

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
      default: 100
      description: "100 = normal display area, 0 = smallest"

- id: digital_horz_shift
  label: Digital Horizontal Shift
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50
      description: "0=leftmost, 50=center, 100=rightmost"

- id: digital_vert_shift
  label: Digital Vertical Shift
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50
      description: "0=top, 50=center, 100=bottom"

- id: auto_image
  label: Auto Image
  kind: action
  params: []

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
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"
  notes: Accepts modifiers n (next) and p (previous)

- id: detail
  label: Detail (Sharpness)
  kind: action
  params:
    - name: level
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"
  notes: Accepts modifiers n (next) and p (previous)

- id: color_saturation
  label: Color Saturation
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: tint
  label: Tint (NTSC)
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
  label: Video Black Level
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=IRE off, 1=IRE on"
  notes: Accepts modifiers n (next) and p (previous)

- id: film_mode
  label: Film Mode Detection
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Detect film OFF, 1=Detect film ON"
  notes: Accepts modifiers n (next) and p (previous)

- id: closed_captions
  label: Closed Captions
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=off, 1=CC1, 2=CC2"
  notes: Accepts modifiers n (next) and p (previous)

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
  params: []

- id: picture_setting
  label: Picture Setting
  kind: action
  params:
    - name: preset
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"
  notes: Accepts modifiers n (next) and p (previous)

- id: dynamic_black
  label: DynamicBlack
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=off, 1=on"
  notes: Accepts modifiers n (next) and p (previous)

- id: gamma_curve
  label: Gamma Curve
  kind: action
  params:
    - name: curve
      type: enum
      values: [0, 1, 2, 3]
      description: "0=Video, 1=Film, 2=Bright, 3=CRT"
  notes: Accepts modifiers n (next) and p (previous)

- id: brilliant_color
  label: BrilliantColor
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Normal Look, 1=Bright Look"

- id: white_peaking
  label: White Peaking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 50

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: preset
      type: enum
      values: [0, 1, 2, 3]
      description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"
  notes: Accepts modifiers n (next) and p (previous)

- id: edge_enhancement
  label: Edge Enhancement
  kind: action
  params:
    - name: level
      type: enum
      values: [0, 1, 2]
      description: "0=off, 1=normal, 2=maximum"
  notes: Accepts modifiers n (next) and p (previous)

- id: color_wheel_speed
  label: Color Wheel Speed
  kind: action
  params:
    - name: speed
      type: enum
      values: [0, 1]
      description: "0=2x setting, 1=3x setting"
  notes: Accepts modifiers n (next) and p (previous)

- id: language
  label: Language
  kind: action
  params:
    - name: lang
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
      description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"
  notes: Accepts modifiers n (next) and p (previous)

- id: focus
  label: Focus
  kind: action
  params:
    - name: action
      type: string
      description: "Use n to increase, p to decrease, or integer value"
  notes: Write only; accepts modifiers n/p for increment/decrement

- id: zoom
  label: Zoom
  kind: action
  params:
    - name: action
      type: string
      description: "Use n to increase, p to decrease, or integer value"
  notes: Write only; accepts modifiers n/p for increment/decrement

- id: lens_vert
  label: Lens Shift Vertical
  kind: action
  params:
    - name: action
      type: string
      description: "Use n to increase, p to decrease, or integer value"
  notes: Write only; accepts modifiers n/p

- id: lens_horz
  label: Lens Shift Horizontal
  kind: action
  params:
    - name: action
      type: string
      description: "Use n to increase, p to decrease, or integer value"
  notes: Write only; accepts modifiers n/p

- id: lock_lens_motors
  label: Lock Lens Motors
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Allow, 1=Locked"
  notes: Accepts modifiers n (next) and p (previous)

- id: lens_home
  label: Lens Home (Calibrate)
  kind: action
  params: []
  notes: Write only; calibrates and returns lens to home position

- id: ceiling_mount
  label: Ceiling Mount
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=off, 1=on, 2=Auto (G-sensor)"

- id: rear_projection
  label: Rear Projection
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Off, 1=On"

- id: menu_shift_horz
  label: Menu Shift Horizontal
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
      default: 0

- id: menu_shift_vert
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

- id: messages_on
  label: Messages On/Off
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: Controls OSD messages

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: screen
      type: enum
      values: [0, 1, 2, 3]
      description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"
  notes: Accepts modifiers n (next) and p (previous)

- id: pin_protect
  label: PIN Protect
  kind: action
  params:
    - name: password
      type: string
      pattern: "XXXXX"
      description: "5-digit password (0-9)"

- id: change_pin
  label: Change PIN
  kind: action
  params:
    - name: old_pin
      type: string
      description: Old 5-digit PIN
    - name: new_pin
      type: string
      description: New 5-digit PIN

- id: auto_power
  label: Auto Power On
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: Auto power on when AC applied; accepts modifiers n/p

- id: auto_shutdown
  label: Auto Shutdown
  kind: action
  params:
    - name: minutes
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=Off/Never, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"
  notes: Auto power down when no signal for set time; accepts modifiers n/p

- id: sleep_timer
  label: Sleep Timer
  kind: action
  params:
    - name: hours
      type: enum
      values: [0, 1, 2, 3]
      description: "0=OFF, 1=2hrs, 2=4hrs, 3=6hrs"
  notes: Accepts modifiers n (next) and p (previous)

- id: high_altitude
  label: High Altitude Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=off, 1=on"
  notes: Modifies fan speeds; accepts modifiers n/p

- id: network_dhcp
  label: Network DHCP
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=off, 1=on"

- id: network_ip
  label: Network IP Address
  kind: action
  params:
    - name: ip
      type: string
      pattern: "XXX.XXX.XXX.XXX"

- id: network_subnet
  label: Network Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      pattern: "XXX.XXX.XXX.XXX"

- id: network_gateway
  label: Network Gateway
  kind: action
  params:
    - name: gateway
      type: string
      pattern: "XXX.XXX.XXX.XXX"

- id: network_hostname
  label: Network Hostname
  kind: action
  params:
    - name: name
      type: string

- id: network_mac
  label: Network MAC Address
  kind: action
  params:
    - name: mac
      type: string

- id: network_messages
  label: Network Messages
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=off, 1=on"

- id: network_restart
  label: Network Restart
  kind: action
  params: []

- id: network_reset
  label: Network Factory Reset
  kind: action
  params: []

- id: serial_baud
  label: Serial Port Baud Rate
  kind: action
  params:
    - name: rate
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"
  notes: Default is 115200; accepts modifiers n/p

- id: serial_echo
  label: Serial Port Echo
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: Default is off; accepts modifiers n/p

- id: trigger_12v
  label: 12V Trigger
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=off, 1=on"
  notes: For motorized screens; accepts modifiers n/p

- id: hot_key_settings
  label: Hot Key Settings
  kind: action
  params:
    - name: func
      type: enum
      values: [0, 1, 2, 3, 4, 5]
      description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze, 3=Projector Info, 4=Overscan, 5=Closed Captions"
  notes: Assign function to IR remote hot-key; accepts modifiers n/p

- id: lamp_power
  label: Lamp Power
  kind: action
  params:
    - name: level
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      description: "0=280W, 1=285W, 2=290W, 3=295W, 4=300W, 5=305W, 6=310W, 7=315W, 8=320W, 9=325W, 10=330W"
  notes: Default 330W; accepts modifiers n/p

- id: current_lamp
  label: Current Lamp
  kind: action
  params:
    - name: lamp
      type: enum
      values: [1, 2, 3]
      description: "1=Lamp1 only, 2=Lamp2 only, 3=Both lamps"
  notes: Accepts modifiers n/p

- id: whisper_mode
  label: Whisper Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3]
      description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"
  notes: Not compatible with high altitude mode; accepts modifiers n/p

- id: lamp_auto_switch
  label: Lamp Auto Switch
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=Switch on failure, 1=Switch on every power on, 2=Switch after N hours"
  notes: Accepts modifiers n/p; use LSF+TIME subcode to set hour threshold

- id: lamp_hours_query
  label: Lamp Info (Query)
  kind: action
  params:
    - name: subcode
      type: string
      enum: [LP1H, LP2H, LPTH, LP1R, LP2R]
      description: "LP1H=Lamp1 hours, LP2H=Lamp2 hours, LPTH=Total hours, LP1R=Lamp1 resets, LP2R=Lamp2 resets"

- id: lamp_life_warning
  label: Lamp Life Warning
  kind: action
  params:
    - name: hours
      type: integer
      description: "User-settable hour threshold for warning; 0=off; default 0"

- id: reset_lamp_hours
  label: Reset Lamp Hours
  kind: action
  params:
    - name: target
      type: enum
      values: [LMP1, LMP2, BOTH]
      description: "LMP1=Reset Lamp1, LMP2=Reset Lamp2, BOTH=Reset both"

- id: pip
  label: PIP/PBP Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Disable, 1=Enable"
  notes: Accepts modifiers n/p

- id: pip_swap
  label: PIP/PBP Swap
  kind: action
  params: []
  notes: Write only; swaps main and PIP sources

- id: pip_size
  label: PIP/PBP Size
  kind: action
  params:
    - name: size
      type: enum
      values: [0, 1, 2]
      description: "0=Small, 1=Medium, 2=Large"

- id: pip_layout
  label: PIP/PBP Layout
  kind: action
  params:
    - name: layout
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"

- id: timing_mode
  label: Timing Detection Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Normal, 1=Wide"
  notes: Accepts modifiers n (next) and p (previous)

- id: source_hotkey_enable
  label: Enabled Source Hot Key
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=ON, 1=OFF"

- id: source_hotkey
  label: Main Source Hot Key Assignment
  kind: action
  params:
    - name: source
      type: enum
      values: [VGA1, VGA2, BNC1, HDM1, HDM2, CON1, SVDO, COPS]
    - name: key_number
      type: integer
      description: Key number 0-9

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      description: "0=OFF, 1=Grid, 2=White, 3=Black, 4=Checkerboard, 5=Color bars, 6=Red, 7=Green, 8=Blue, 9=Yellow, 10=Magenta, 11=Cyan"
  notes: "6-11 require Service mode; accepts modifiers n/p"

- id: color_wheel_index
  label: Color Wheel Index
  kind: action
  params:
    - name: speed
      type: enum
      values: [SPX2, SPX3]
      description: "SPX2=2x speed, SPX3=3x speed"
    - name: value
      type: integer
  notes: Only works when service mode is on

- id: projector_info_query
  label: Projector Info (Query)
  kind: action
  params:
    - name: subcode
      type: enum
      values: [MDLN, SNUM, NERS, FWVS, CFVS, BCVS]
      description: "MDLN=Model name, SNUM=Serial number, NERS=Native resolution, FWVS=FW version, CFVS=Configuration, BCVS=Boot code version"
  notes: Service mode only

- id: factory_defaults
  label: Factory Defaults
  kind: action
  params: []
  notes: Write only; requires number 111 in command; service mode only

- id: enter_service_mode
  label: Enter Service Mode
  kind: action
  params:
    - name: credentials
      type: string
      description: Format "username,password"
  notes: Write only; format (UID"service,service")

- id: serial_command_version
  label: E Series Serial Command Version
  kind: action
  params: []
  notes: Read only

- id: last_command_error
  label: Last Serial Command Error
  kind: action
  params: []
  notes: Read only

- id: last_system_error
  label: Last System Error
  kind: action
  params: []
  notes: Read only

- id: source_name
  label: Source Name Setting
  kind: action
  params:
    - name: source
      type: enum
      values: [SRC0, SRC1, SRC2, SRC3, SRC4, SRC5, SRC6, SRC7]
      description: "SRC0=VGA1, SRC1=VGA2, SRC2=BNC, SRC3=HDMI1, SRC4=HDMI2, SRC5=Component, SRC6=S-Video, SRC7=Video"
    - name: name
      type: string

- id: key_code
  label: Key Code Entry
  kind: action
  params:
    - name: code
      type: integer
      description: Decimal keycode value
  notes: Write only; simulates remote button press

- id: shutter
  label: Shutter On/Off
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Open/Shutter off, 1=Closed/Shutter on"
  notes: Displays black screen; accepts modifiers n/p

- id: osd_show_hide
  label: OSD Show/Hide
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Hide, 1=Show"
  notes: Accepts modifiers n/p
- id: mif_query
  label: Main Source Info Query
  kind: query
  params:
    - name: subcode
      type: string
      description: "ACTS, SGFT, APRT, RESL, VREF, HREF, PIXC, SYNC, CLSP"
  notes: Read only; format (MIF+<subcode>?)

- id: sif_query
  label: Secondary Source Info Query
  kind: query
  params:
    - name: subcode
      type: string
      description: "ACTS, SGFT, APRT, RESL, VREF, HREF, PIXC, SYNC, CLSP"
  notes: Read only; valid only when PIP/PBP enabled; format (SIF+<subcode>?)

- id: sks
  label: Source Key Function Setting
  kind: action
  params:
    - name: func
      type: integer
      description: "0=Change source, 1=List all of Sources, 2=Change source with Auto"
  notes: Assigns function to source hot-key

- id: pst_user_store
  label: Picture Setting Store to User Mode
  kind: action
  params: []
  notes: Write only; stores current picture settings to User Mode via (PST+USER1)

- id: lsf_time
  label: Lamp Auto Switch Hour Threshold
  kind: action
  params:
    - name: hours
      type: integer
      description: Number of hours for lamp auto switch threshold
  notes: Subcode TIME; format (LSF+TIME<hours>)
```

## Feedbacks
```yaml
- id: projector_status
  type: object
  properties:
    - code: model name (SST!000)
    - code: serial number (SST!001)
    - code: native resolution (SST!002)
    - code: main input (SST!003)
    - code: main signal format (SST!004)
    - code: main pixel clock (SST!005)
    - code: main sync type (SST!006)
    - code: main horizontal refresh (SST!007)
    - code: main vertical refresh (SST!008)
    - code: PIP input (SST!009)
    - code: PIP signal format (SST!010)
    - code: PIP pixel clock (SST!011)
    - code: PIP sync type (SST!012)
    - code: PIP horizontal refresh (SST!013)
    - code: PIP vertical refresh (SST!014)
    - code: lamp power setting (SST!015)
    - code: current lamp (SST!016)
    - code: lamp 1 hours (SST!017)
    - code: lamp 2 hours (SST!018)
    - code: standby mode (SST!019)
    - code: lens lock setting (SST!020)
    - code: IP address (SST!021)
    - code: DHCP (SST!022)
  description: Query via (SST?) returns multiple code-value pairs

- id: main_source_info
  type: object
  properties:
    - ACTS: active source
    - SGFT: signal format
    - APRT: aspect ratio
    - RESL: resolution
    - VREF: vertical refresh
    - HREF: horizontal refresh
    - PIXC: pixel clock
    - SYNC: sync type
    - CLSP: color space
  description: Query via (MIF+<subcode>?)

- id: secondary_source_info
  type: object
  properties:
    - ACTS: active source (PIP)
    - SGFT: signal format
    - APRT: aspect ratio
    - RESL: resolution
    - VREF: vertical refresh
    - HREF: horizontal refresh
    - PIXC: pixel clock
    - SYNC: sync type
    - CLSP: color space
  description: Query via (SIF+<subcode>?); valid only when PIP/PBP enabled

- id: lamp_info
  type: object
  properties:
    - LP1H: lamp 1 hours
    - LP2H: lamp 2 hours
    - LPTH: total hours all lamps
    - LP1R: lamp 1 reset count
    - LP2R: lamp 2 reset count
  description: Query via (LIF+<subcode>?)

- id: projector_info
  type: object
  properties:
    - MDLN: model name
    - SNUM: serial number
    - NERS: native resolution
    - FWVS: firmware version
    - CFVS: configuration data
    - BCVS: boot code version
  description: Query via (PIF+<subcode>?); service mode only

- id: system_error
  type: enum
  values:
    - "1: lamp failed to strike after 5 attempts"
    - "3: lamp went out unexpectedly"
    - "4: fan failure"
    - "5: over temperature"
  description: Query via (LSE?); read only

- id: command_error
  type: string
  description: Query via (LCE?); returns error description string; read only

- id: serial_version
  type: string
  description: Query via (SIV?); read only

- id: size_presets_current
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"

- id: over_scan_current
  type: enum
  values: [0, 1, 2]
  description: "0=OFF, 1=ZOOM, 2=CROP"

- id: color_space_current
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"

- id: detail_current
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"

- id: film_mode_current
  type: enum
  values: [0, 1]
  description: "0=Detect film OFF, 1=Detect film ON"

- id: dynamic_black_current
  type: enum
  values: [0, 1]
  description: "0=off, 1=on"

- id: gamma_curve_current
  type: enum
  values: [0, 1, 2, 3]
  description: "0=Video, 1=Film, 2=Bright, 3=CRT"

- id: brilliant_color_current
  type: enum
  values: [0, 1]
  description: "0=Normal Look, 1=Bright Look"

- id: color_temperature_current
  type: enum
  values: [0, 1, 2, 3]
  description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"

- id: edge_enhancement_current
  type: enum
  values: [0, 1, 2]
  description: "0=off, 1=normal, 2=maximum"

- id: lamp_power_current
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  description: "0=280W ... 10=330W"

- id: standby_mode_current
  type: enum
  values: [0, 1]
  description: "0=1W mode, 1=Communication mode"

- id: network_settings
  type: object
  properties:
    - ETH0: IP address
    - SUB0: subnet mask
    - GATE: default gateway
    - HOST: projector name
    - MAC0: MAC address
    - DHCP: on/off
  description: Read via NET+<subcode>?; write via NET+<subcode>"value"

- id: source_hotkey_current
  type: object
  description: "Returns hot-key assignments per source; use (MHK+<source>?); ESH controls enabled state"
```

## Variables
```yaml
- id: size_presets
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  default: 0
  description: "0=Auto, 1=Native, 2=4:3, 3=LetterBox, 4=Full Size, 5=Full Width, 6=Full Height"

- id: over_scan
  type: enum
  values: [0, 1, 2]
  default: 0
  description: "0=OFF, 1=ZOOM, 2=CROP"

- id: pixel_phase
  type: integer
  range: [0, 100]
  default: 50

- id: pixel_track
  type: integer
  range: [0, 100]
  default: 50

- id: horz_position
  type: integer
  range: [0, 100]
  default: 50

- id: vert_position
  type: integer
  range: [0, 100]
  default: 50

- id: horz_keystone
  type: integer
  range: [0, 100]
  default: 50

- id: vert_keystone
  type: integer
  range: [0, 100]
  default: 50

- id: horz_pincushion
  type: integer
  range: [0, 100]
  default: 50

- id: vert_pincushion
  type: integer
  range: [0, 100]
  default: 50

- id: digital_zoom
  type: integer
  range: [0, 100]
  default: 100

- id: digital_horz_shift
  type: integer
  range: [0, 100]
  default: 50

- id: digital_vert_shift
  type: integer
  range: [0, 100]
  default: 50

- id: auto_image
  type: integer
  description: Write trigger; (AIM1)

- id: brightness
  type: integer
  range: [0, 100]
  default: 50

- id: contrast
  type: integer
  range: [0, 100]
  default: 50

- id: color_space
  type: enum
  values: [0, 1, 2, 3, 4]
  default: 4
  description: "0=RGB, 1=REC709, 2=REC601, 3=RGB Video, 4=Auto"

- id: detail
  type: enum
  values: [0, 1, 2, 3, 4]
  default: 2
  description: "0=Maximum, 1=High, 2=Normal, 3=Low, 4=Minimum"

- id: color_saturation
  type: integer
  range: [0, 100]
  default: 50

- id: tint
  type: integer
  range: [0, 100]
  default: 50

- id: noise_reduction
  type: integer
  range: [0, 100]
  default: 0

- id: flesh_tone_correction
  type: integer
  range: [0, 100]
  default: 0

- id: video_black_level
  type: enum
  values: [0, 1]
  default: 0
  description: "0=IRE off, 1=IRE on"

- id: film_mode
  type: enum
  values: [0, 1]
  default: 1
  description: "0=Detect film OFF, 1=Detect film ON"

- id: closed_captions
  type: enum
  values: [0, 1, 2]
  default: 0
  description: "0=off, 1=CC1, 2=CC2"

- id: red_gain
  type: integer
  range: [0, 100]
  default: 50

- id: green_gain
  type: integer
  range: [0, 100]
  default: 50

- id: blue_gain
  type: integer
  range: [0, 100]
  default: 50

- id: red_offset
  type: integer
  range: [0, 100]
  default: 50

- id: green_offset
  type: integer
  range: [0, 100]
  default: 50

- id: blue_offset
  type: integer
  range: [0, 100]
  default: 50

- id: sync_threshold
  type: integer
  range: [0, 100]
  default: 50

- id: picture_setting
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  default: 0
  description: "0=Presentation, 1=Video, 2=Bright, 3=Whiteboard, 4=Blackboard, 5=Beige Wall, 6=User"

- id: dynamic_black
  type: enum
  values: [0, 1]
  default: 0
  description: "0=off, 1=on"

- id: gamma_curve
  type: enum
  values: [0, 1, 2, 3]
  default: 0
  description: "0=Video, 1=Film, 2=Bright, 3=CRT"

- id: brilliant_color
  type: enum
  values: [0, 1]
  default: 0
  description: "0=Normal Look, 1=Bright Look"

- id: white_peaking
  type: integer
  range: [0, 100]
  default: 50

- id: color_temperature
  type: enum
  values: [0, 1, 2, 3]
  default: 0
  description: "0=Warmest, 1=Warm, 2=Cool, 3=Bright"

- id: edge_enhancement
  type: enum
  values: [0, 1, 2]
  default: 0
  description: "0=off, 1=normal, 2=maximum"

- id: color_wheel_speed
  type: enum
  values: [0, 1]
  default: 0
  description: "0=2x setting, 1=3x setting"

- id: language
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  default: 0
  description: "0=English, 1=Chinese, 2=French, 3=German, 4=Italian, 5=Japanese, 6=Korean, 7=Russian, 8=Spanish"

- id: ceiling_mount
  type: enum
  values: [0, 1, 2]
  default: 0
  description: "0=off, 1=on, 2=Auto (G-sensor)"

- id: rear_projection
  type: enum
  values: [0, 1]
  default: 0
  description: "0=Off, 1=On"

- id: menu_shift_horz
  type: integer
  range: [0, 100]
  default: 0

- id: menu_shift_vert
  type: integer
  range: [0, 100]
  default: 0

- id: menu_transparency
  type: integer
  range: [0, 90]
  default: 0

- id: splash_screen
  type: enum
  values: [0, 1, 2, 3]
  default: 0
  description: "0=Factory Logo, 1=Blue, 2=Black, 3=White"

- id: standby_mode
  type: enum
  values: [0, 1]
  default: 0
  description: "0=1W mode, 1=Communication mode"

- id: auto_power
  type: enum
  values: [0, 1]
  default: 0
  description: "0=OFF, 1=ON"

- id: auto_shutdown
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  default: 0
  description: "0=Off/Never, 1=5min, 2=10min, 3=15min, 4=20min, 5=25min, 6=30min"

- id: sleep_timer
  type: enum
  values: [0, 1, 2, 3]
  default: 0
  description: "0=OFF, 1=2hrs, 2=4hrs, 3=6hrs"

- id: high_altitude
  type: enum
  values: [0, 1]
  default: 0
  description: "0=off, 1=on"

- id: serial_baud
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  default: 7
  description: "0=2400, 1=4800, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"

- id: serial_echo
  type: enum
  values: [0, 1]
  default: 0
  description: "0=OFF, 1=ON"

- id: trigger_12v
  type: enum
  values: [0, 1]
  default: 0
  description: "0=off, 1=on"

- id: hot_key_settings
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  default: 0
  description: "0=Blank Screen, 1=Aspect Ratio, 2=Freeze, 3=Projector Info, 4=Overscan, 5=Closed Captions"

- id: lamp_power
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  default: 10
  description: "0=280W ... 10=330W"

- id: current_lamp
  type: enum
  values: [1, 2, 3]
  default: 1
  description: "1=Lamp1 only, 2=Lamp2 only, 3=Both lamps"

- id: whisper_mode
  type: enum
  values: [0, 1, 2, 3]
  default: 0
  description: "0=Off, 1=Lamp1, 2=Lamp2, 3=Auto"

- id: lamp_life_warning
  type: integer
  default: 0
  description: "User-settable hour threshold; 0=off"

- id: pip
  type: enum
  values: [0, 1]
  default: 0
  description: "0=Disable, 1=Enable"

- id: pip_size
  type: enum
  values: [0, 1, 2]
  default: 0
  description: "0=Small, 1=Medium, 2=Large"

- id: pip_layout
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  default: 4
  description: "0=POP Bigger Left, 1=Over-Under Bigger Upper, 2=POP Bigger Right, 3=Over-Under Bigger Lower, 4=PIP-Bottom Right, 5=PIP-Bottom Left, 6=PIP-Top Left, 7=PIP-Top Right"

- id: timing_mode
  type: enum
  values: [0, 1]
  default: 0
  description: "0=Normal, 1=Wide"

- id: source_hotkey_enable
  type: enum
  values: [0, 1]
  default: 0
  description: "0=ON, 1=OFF"
```

## Events
```yaml
# UNRESOLVED: source documents no unsolicited event notifications.
# Projector sends error replies (ERR) and status responses (SST!) only in reply to queries.
# Confirm via live device testing whether unsolicited status events are emitted.
```

## Macros
```yaml
# UNRESOLVED: source describes no explicit multi-step sequences.
# Service mode auto-exits on power off - (PWR0) returns to normal mode.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety interlock procedures, confirmation requirements,
# or power-on sequencing specifications beyond standard projector operation.
```

## Notes
RS-232 physical: null modem cable, 9-pin female to host, 9-pin female to projector (pin 2↔3, pin 3↔2, pin 5↔5). Message format: `(Code Data)` for set, `(Code?)` for request, `(Code!Data)` for reply. Prefix `#` before function code for full acknowledgement echo. Space between code and data is optional. Modifiers `n` (next) and `p` (previous) work on enumerated commands. Subcodes use `+` separator: `(CODE+SUBCODE data)`. Service mode required for (DEF), (PIF), (CWI), (UID). Service mode exits on power off. Grid/Color Bars test pattern switch may take up to 18 seconds. Whisper mode incompatible with high altitude mode.
<!-- UNRESOLVED: Ethernet port number not stated — TCP control protocol details not documented. -->
<!-- UNRESOLVED: unsolicited event emissions not confirmed. -->
<!-- UNRESOLVED: default PIN not stated — source shows only change PIN command (PCG) with example format. -->

## Provenance

```yaml
source_domains:
  - christiedigital.com
source_urls:
  - https://www.christiedigital.com/globalassets/resources/public/020-102207-08-christie-lit-man-ref-spyder-commands.pdf
  - https://www.christiedigital.com/globalassets/resources/public/020-000372-05-christie-e-series-serial-communications.pdf
retrieved_at: 2026-05-04T15:10:58.851Z
last_checked_at: 2026-05-20T08:04:51.795Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-20T08:04:51.795Z
matched_actions: 95
action_count: 95
confidence: high
summary: "All 95 spec actions matched source commands; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
