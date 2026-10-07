---
spec_id: admin/planar-urp-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes P Series Control Spec"
manufacturer: Planar
model_family: "UltraRes P Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "UltraRes P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
  - https://www.planar.com/products/large-format-lcd-displays/ultrares-p/ultrares-p-downloads/
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
retrieved_at: 2026-10-07T17:48:37.000Z
last_checked_at: 2026-10-07T17:48:37.000Z
generated_at: 2026-10-07T17:48:37.000Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event documentation found in source"
  - "no explicit multi-step macro documentation in source"
  - "event/notification subscription mechanism not documented"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T17:48:37.000Z
  matched_actions: 97
  action_count: 97
  confidence: medium
  summary: "All 97 action units match source command codes with correct enums and ranges, transport values are supported, and unmodelled source commands appear as Variables (97/106 above 0.9). (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar UltraRes P Series Control Spec

## Summary
The Planar UltraRes P Series is a professional-grade display system supporting multi-zone video wall configurations. Control is available via RS-232 serial and TCP/IP (Telnet/SSH) using a structured ASCII command protocol with named or numeric opcodes, modifiers, and operands. The protocol supports querying, setting, incrementing/decrementing, and action commands.

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet; SSH on port 22 (only one may be enabled at a time)
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # default login: admin + serial number; SSH password set on first login
```

## Traits
```yaml
- powerable    # DISPLAY.POWER, STDBY.TOGGLE/ENTER/EXIT, SYSTEM.REBOOT
- queryable    # ? and # operators for reading values
- levelable    # brightness, contrast, volume, gain, etc.
- routable     # SOURCE.SELECT, SOURCE.NEXT, MULTI.VIEW, LAYOUT
```

## Actions
```yaml
- id: display_power
  label: Display Power
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0 = OFF, 1 = ON

- id: reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: enum
      values: [0, 1]
      description: "0 = USER, 1 = FACTORY1 (also resets EDID, network, presets)"

- id: firmware_update
  label: Firmware Update
  kind: action
  params: []

- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1–10

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1–10

- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1–10

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 254, 255]
      description: "Zone: 0–3, 254=ALL, 255=CURRENT"

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

- id: osd_close
  label: OSD Close
  kind: action
  params: []

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 255]
      description: "Zone: 0–3, 255=CURRENT"

- id: system_reboot
  label: System Reboot
  kind: action
  params: []

- id: test_email
  label: Test Email Notification
  kind: action
  params:
    - name: event
      type: enum
      values: [0, 3, 4]
      description: "0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"

- id: pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
      description: "0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0–100
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]
      description: "Zone: 0–3, 253=ALL.INPUT, 254=ALL, 255=CURRENT"

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0–100
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0–100

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0 = OFF, 1 = ON"

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: source
      type: enum
      values: [1, 2, 5, 13, 14, 15]
      description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC"
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 4, 254, 255]
      description: "Zone: 0–3, 4=ZONE.1.SECONDARY, 254=ALL, 255=CURRENT"

- id: key
  label: Send Key
  kind: action
  params:
    - name: key
      type: enum
      values: [0, 1, 2, 3, 5, 6, 9, 12, 13, 14, 15, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 32, 254, 255, 256, 257, 258, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 281, 282, 283, 284, 285]
      description: "See Key Codes table"

- id: edid_timing_update
  label: Update EDID Timing
  kind: action
  params:
    - name: input
      type: enum
      values: [1, 2, 5, 13, 15]
      description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  command: ASPECT
  params:
    - name: value
      type: enum
      values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: audio_input_query
  label: Read Audio Input
  kind: action
  command: AUDIO.INPUT
  params: []

- id: audio_zone_set
  label: Set Audio Zone
  kind: action
  command: AUDIO.ZONE
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3]

- id: audio_settings_set
  label: Set Audio Settings
  kind: action
  command: AUDIO.SETTINGS
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3]
    - name: volume
      type: integer
      description: Unsigned Integers
    - name: treble
      type: integer
      description: Unsigned Integers
    - name: bass
      type: integer
      description: Unsigned Integers
    - name: balance
      type: integer
      description: Unsigned Integers
    - name: mute
      type: integer
      description: Unsigned Integers
    - name: speakers
      type: integer
      description: Unsigned Integers

- id: auto_power_on_set
  label: Set Auto Power On
  kind: action
  command: AUTO.ON
  params:
    - name: state
      type: enum
      values: [OFF, ON, PREVIOUS.STATE]

- id: source_scan_set
  label: Set Auto Scan Sources
  kind: action
  command: SOURCE.SCAN
  params:
    - name: state
      type: enum
      values: [OFF, ON, FAILOVER]

- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  command: BACKLIGHT.INTENSITY
  params:
    - name: value
      type: integer
      description: 1-100

- id: audio_balance_set
  label: Set Balance
  kind: action
  command: AUDIO.BALANCE
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_bass_set
  label: Set Bass
  kind: action
  command: AUDIO.BASS
  params:
    - name: value
      type: integer
      description: 0-100

- id: blank_color_set
  label: Set Blank Screen Color
  kind: action
  command: BLANK.COLOR
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]

- id: color_set
  label: Set Color
  kind: action
  command: COLOR
  params:
    - name: value
      type: integer
      description: 0-100
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: colorspace_set
  label: Set Color Space
  kind: action
  command: COLORSPACE
  params:
    - name: value
      type: enum
      values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]
    - name: value_type
      type: enum
      values: [SETTING, ACTUAL]

- id: colorsubsampling_query
  label: Read Color Subsampling
  kind: action
  command: COLOR.SUBSAMPLING
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 255]

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  command: COLOR.TEMPERATURE
  params:
    - name: value
      type: enum
      values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: current_zone_set
  label: Set Current Zone
  kind: action
  command: CURRENT.ZONE
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3]

- id: current_zone_layout_query
  label: Read Current Zone Layout
  kind: action
  command: CURRENT.ZONE.LAYOUT
  params: []

- id: gateway_set
  label: Set Default Gateway
  kind: action
  command: IPV4.GATEWAY
  params:
    - name: value
      type: string
    - name: mode
      type: enum
      values: [STATIC]

- id: dhcp_set
  label: Set DHCP
  kind: action
  command: NETWORK.DHCP
  params:
    - name: state
      type: enum
      values: [OFF, ON]

- id: display_name_set
  label: Set Display Name
  kind: action
  command: DISPLAY.NAME
  params:
    - name: value
      type: string

- id: dp_type_set
  label: Set DisplayPort 1 Type
  kind: action
  command: DP.TYPE
  params:
    - name: value
      type: enum
      values: [1.2, 1.4, 2.0]

- id: dp2_type_set
  label: Set DisplayPort 2 Type
  kind: action
  command: DP2.TYPE
  params:
    - name: value
      type: enum
      values: [1.2, 1.4, 2.0]

- id: dns1_set
  label: Set DNS Server 1
  kind: action
  command: NETWORK.DNS1
  params:
    - name: value
      type: string
    - name: mode
      type: enum
      values: [STATIC]

- id: dns2_set
  label: Set DNS Server 2
  kind: action
  command: NETWORK.DNS2
  params:
    - name: value
      type: string
    - name: mode
      type: enum
      values: [STATIC]

- id: gain_set
  label: Set Gain
  kind: action
  command: GAIN
  params:
    - name: value
      type: integer
      description: For RED, GREEN, BLUE: 0-200
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]

- id: gamma_set
  label: Set Gamma
  kind: action
  command: GAMMA
  params:
    - name: value
      type: enum
      values: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: cec_enable_set
  label: Set HDMI CEC
  kind: action
  command: CEC.ENABLE
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  command: CEC.STANDBY
  params:
    - name: state
      type: enum
      values: [OFF, ON]

- id: signal_info_query
  label: Read Image Information
  kind: action
  command: SIGNAL.INFO
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 255]
    - name: parameter
      type: enum
      values: [HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS]

- id: ip_address_set
  label: Set IP Address
  kind: action
  command: IPV4.ADDRESS
  params:
    - name: value
      type: string
    - name: mode
      type: enum
      values: [STATIC]

- id: ir_code_set
  label: Set IR Code
  kind: action
  command: IR.CODE
  params:
    - name: value
      type: integer
      description: 0-65535

- id: ir_lock_set
  label: Set IR Remote Lock
  kind: action
  command: IR.LOCK
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: keypad_lock_set
  label: Set Keypad Lock
  kind: action
  command: KEY.LOCK
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: lan_lock_set
  label: Set LAN Lock
  kind: action
  command: LAN.LOCK
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: language_set
  label: Set Language
  kind: action
  command: LANGUAGE
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]

- id: layout_set
  label: Set Layout
  kind: action
  command: LAYOUT
  params:
    - name: value
      type: enum
      values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]

- id: network_ping
  label: Network Ping
  kind: action
  command: NETWORK.PING
  params:
    - name: address
      type: string

- id: ntp_server_set
  label: Set NTP Server
  kind: action
  command: NETWORK.NTPSERVER
  params:
    - name: value
      type: string

- id: offset_set
  label: Set Offset
  kind: action
  command: OFFSET
  params:
    - name: value
      type: integer
      description: For RED, GREEN, BLUE: 0-100
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]

- id: orientation_set
  label: Set OSD Rotation
  kind: action
  command: ORIENTATION
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  command: OSD.TIMEOUT
  params:
    - name: value
      type: enum
      values: [OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, 240.SECONDS]

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  command: OSD.TRANSPARENCY
  params:
    - name: value
      type: integer
      description: 0-100

- id: overscan_set
  label: Set Overscan
  kind: action
  command: OVERSCAN
  params:
    - name: value
      type: integer
      description: 0-20
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: pip_size_set
  label: Set PIP Size
  kind: action
  command: PIP.SIZE
  params:
    - name: value
      type: enum
      values: [SMALL, MEDIUM, LARGE]

- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  command: PIXEL.ORBIT
  params:
    - name: state
      type: enum
      values: [OFF, ON]

- id: power_down_mode_set
  label: Set Power Down Mode
  kind: action
  command: POWER.DOWN.MODE
  params:
    - name: value
      type: enum
      values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]

- id: power_saving_delay_set
  label: Set Power Saving Delay
  kind: action
  command: POWER.SAVE.DELAY
  params:
    - name: value
      type: enum
      values: [1.MINUTE, 5.MINUTES, 15.MINUTES, 30.MINUTES, 60.MINUTES]

- id: power_saving_mode_set
  label: Set Power Saving Mode
  kind: action
  command: POWER.SAVE.MODE
  params:
    - name: value
      type: enum
      values: [Disable, Power.Down, Wake.On.Signal]

- id: preset_name_set
  label: Set Preset Name
  kind: action
  command: PRESET.NAME
  params:
    - name: preset
      type: integer
      description: 1-10
    - name: value
      type: string

- id: schedule_set
  label: Set Schedule
  kind: action
  command: SCHEDULE
  params:
    - name: slot
      type: integer
      description: 1-10
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE]
    - name: value
      type: integer
      description: Unsigned int

- id: schedule_action_set
  label: Set Schedule Action
  kind: action
  command: SCHEDULE.ACTION
  params:
    - name: slot
      type: integer
      description: 1-10
    - name: value
      type: enum
      values: [TURN.ON, TURN.OFF, RECALL, PANEL.BRIGHTNESS]

- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  command: SCHEDULE.DAY
  params:
    - name: slot
      type: integer
      description: 1-10
    - name: value
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]

- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  command: SCHEDULE.FREQUENCY
  params:
    - name: slot
      type: integer
      description: 1-10
    - name: value
      type: enum
      values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]

- id: sharpness_set
  label: Set Sharpness
  kind: action
  command: SHARPNESS
  params:
    - name: value
      type: integer
      description: 0-5

- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  command: SPLASH.SCREEN
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: subnet_mask_set
  label: Set Subnet Mask
  kind: action
  command: IPV4.NETMASK
  params:
    - name: value
      type: string
    - name: mode
      type: enum
      values: [STATIC]

- id: time_set
  label: Set Time
  kind: action
  command: TIME
  params:
    - name: parameter
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE]
    - name: value
      type: integer
      description: Unsigned int

- id: timezone_set
  label: Set Time Zone
  kind: action
  command: TIMEZONE
  params:
    - name: value
      type: string

- id: tint_set
  label: Set Tint
  kind: action
  command: TINT
  params:
    - name: value
      type: integer
      description: 0-100
    - name: zone
      type: enum
      values: [0, 1, 2, 3, 253, 254, 255]

- id: audio_treble_set
  label: Set Treble
  kind: action
  command: AUDIO.TREBLE
  params:
    - name: value
      type: integer
      description: 0-100

- id: usba_lock_set
  label: Set USB-A Lock
  kind: action
  command: USBA.LOCK
  params:
    - name: state
      type: enum
      values: [DISABLE, ENABLE]

- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  command: NETWORK.NTP
  params:
    - name: state
      type: enum
      values: [OFF, ON]

- id: command_enable_set
  label: Set Network Commands
  kind: action
  command: COMMAND.ENABLE
  params:
    - name: network
      type: enum
      values: [NETWORK]
    - name: state
      type: enum
      values: [OFF, ON]

- id: osd_allow_popup_set
  label: Set Allow Pop Up Messages
  kind: action
  command: OSD.ALLOW.POPUP
  params:
    - name: value
      type: enum
      values: [NO, YES]
```

## Feedbacks
```yaml
- id: power_state
  label: Power State
  type: enum
  values: [on, off]
  query_command: DISPLAY.POWER?

- id: system_state
  label: System State
  type: enum
  values: [STANDBY, ON]
  description: "STANDBY = lowest power, ON = system on"
  query_command: SYSTEM.STATE?

- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]
  query_command: BRIGHTNESS?

- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]
  query_command: CONTRAST?

- id: volume
  label: Volume
  type: integer
  range: [0, 100]
  query_command: AUDIO.VOLUME?

- id: mute_state
  label: Mute State
  type: enum
  values: [on, off]
  query_command: AUDIO.MUTE?

- id: current_source
  label: Current Source
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC, NONE, Searching]
  description: Returns current input source or "Searching"/"No Signal" if none
  query_command: SOURCE.SELECT?

- id: model_id
  label: Model ID
  type: string
  query_command: MODEL.ID?

- id: serial_number
  label: Serial Number
  type: string
  query_command: SERIAL.NUMBER?

- id: network_mac
  label: MAC Address
  type: string
  query_command: NETWORK.MAC?

- id: ip_address
  label: IP Address
  type: string
  query_command: IPV4.ADDRESS?

- id: signal_info
  label: Signal Info
  type: object
  properties:
    - name: hactive
      type: integer
    - name: vactive
      type: integer
    - name: pclk
      type: integer
    - name: htotal
      type: integer
    - name: vtotal
      type: integer
    - name: vrefresh
      type: integer
    - name: hrefresh
      type: integer
    - name: interlace
      type: integer
    - name: vfieldrate
      type: integer
    - name: colordepth
      type: integer
    - name: tmds
      type: integer
  query_command: SIGNAL.INFO?

- id: osd_status
  label: OSD Status
  type: enum
  values: [ENABLE, DISABLE]
  description: Whether OSD (menu/message/confirmation) is visible
  query_command: OSD.STATUS?

- id: error_response
  label: Error Response
  type: enum
  values: [ERR 1, ERR 2, ERR 3, ERR 4, ERR 5, ERR 6]
  description: "ERR 1=Invalid syntax, 3=Unknown command, 4=Invalid modifier, 5=Invalid operand, 6=Invalid operator"

- id: source_message
  label: Source Message
  type: string
  description: Returns input resolution and frame rate for the selected zone. If no signal, returns "Searching" or "No Signal".
  query_command: SOURCE.MESSAGE?
```

## Variables
```yaml
- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
  settable: true

- id: color
  label: Color
  type: integer
  range: [0, 100]
  settable: true

- id: color_temperature
  label: Color Temperature
  type: enum
  values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]
  settable: true

- id: gamma
  label: Gamma
  type: enum
  values: [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9]
  settable: true

- id: tint
  label: Tint
  type: integer
  range: [0, 100]
  settable: true

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 5]
  settable: true

- id: backlight_intensity
  label: Backlight Intensity
  type: integer
  range: [1, 100]
  settable: true

- id: overscan
  label: Overscan
  type: integer
  range: [0, 20]
  settable: true

- id: gain
  label: Gain (RGB)
  type: object
  properties:
    - name: red
      type: integer
      range: [0, 200]
    - name: green
      type: integer
      range: [0, 200]
    - name: blue
      type: integer
      range: [0, 200]
  settable: true

- id: offset
  label: Offset (RGB)
  type: object
  properties:
    - name: red
      type: integer
      range: [0, 100]
    - name: green
      type: integer
      range: [0, 100]
    - name: blue
      type: integer
      range: [0, 100]
  settable: true

- id: audio_treble
  label: Treble
  type: integer
  range: [0, 100]
  settable: true

- id: audio_bass
  label: Bass
  type: integer
  range: [0, 100]
  settable: true

- id: audio_balance
  label: Balance
  type: integer
  range: [0, 100]
  settable: true

- id: auto_power_on
  label: Auto Power On
  type: enum
  values: [OFF, ON, PREVIOUS.STATE]
  settable: true

- id: power_down_mode
  label: Power Down Mode
  type: enum
  values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]
  settable: true
  note: Must be Networked.Standby or Fast.Startup for RS232 commands to work

- id: power_saving_mode
  label: Power Saving Mode
  type: enum
  values: [Disable, Power.Down, Wake.On.Signal]
  settable: true

- id: power_saving_delay
  label: Power Saving Delay
  type: enum
  values: [1.MINUTE, 5.MINUTES, 15.MINUTES, 30.MINUTES, 60.MINUTES]
  settable: true

- id: source_scan
  label: Auto Scan Sources
  type: enum
  values: [OFF, ON, FAILOVER]
  settable: true

- id: layout
  label: Layout
  type: enum
  values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]
  settable: true

- id: multi_view
  label: Multi-Source View
  type: enum
  values: [SINGLE, DUAL, QUAD, PIP]
  settable: true

- id: pip_size
  label: PIP Size
  type: enum
  values: [SMALL, MEDIUM, LARGE]
  settable: true

- id: colorspace
  label: Color Space
  type: enum
  values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]
  settable: true

- id: colorsubsampling
  label: Color Subsampling
  type: string
  settable: false

- id: display_name
  label: Display Name
  type: string
  settable: true

- id: language
  label: Language
  type: enum
  values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
  settable: true

- id: osd_timeout
  label: OSD Timeout
  type: enum
  values: [OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, 240.SECONDS]
  settable: true

- id: osd_transparency
  label: OSD Transparency
  type: integer
  range: [0, 100]
  settable: true

- id: osd_position
  label: Menu Position
  type: enum
  values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]
  settable: true

- id: osd_rotation
  label: OSD Rotation
  type: enum
  values: [LANDSCAPE, PORTRAIT]
  settable: true

- id: splash_screen
  label: Splash Screen
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: blank_screen_color
  label: Blank Screen Color
  type: enum
  values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]
  settable: true

- id: pixel_orbit
  label: Pixel Orbit
  type: enum
  values: [OFF, ON]
  settable: true

- id: led_enable
  label: Enable Status LED
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: ir_lock
  label: IR Remote Lock
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: keypad_lock
  label: Keypad Lock
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: lan_lock
  label: LAN Lock
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: rs232_lock
  label: RS232 Lock
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: usba_lock
  label: USB-A Lock
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: cec_enable
  label: HDMI CEC Enable
  type: enum
  values: [DISABLE, ENABLE]
  settable: true

- id: cec_standby
  label: HDMI CEC Standby
  type: enum
  values: [OFF, ON]
  settable: true

- id: dp_type
  label: DisplayPort 1 Type
  type: enum
  values: [1.2, 1.4, 2.0]
  settable: true

- id: dp2_type
  label: DisplayPort 2 Type
  type: enum
  values: [1.2, 1.4, 2.0]
  settable: true

- id: audio_speakers
  label: Enable Internal Speakers
  type: enum
  values: [OFF, ON]
  settable: true

- id: audio_zone
  label: Audio Select (Zone)
  type: enum
  values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
  settable: true

- id: audio_settings
  label: Audio Settings
  type: object
  properties:
    - name: zone
      type: integer
    - name: volume
      type: integer
      range: [0, 100]
    - name: treble
      type: integer
      range: [0, 100]
    - name: bass
      type: integer
      range: [0, 100]
    - name: balance
      type: integer
      range: [0, 100]
    - name: mute
      type: integer
    - name: speakers
      type: integer
  settable: true

- id: current_zone
  label: Current Zone
  type: enum
  values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
  settable: true

- id: current_zone_layout
  label: Current Zone Layout
  type: enum
  values: [S.1, P.UL.1, P.UL.2, P.UR.1, P.UR.2, P.LL.1, P.LL.2, P.LR.1, P.LR.2, D.L.1, D.L.2, Q.1, Q.2, Q.3, Q.4]
  settable: false

- id: network_dhcp
  label: DHCP
  type: enum
  values: [OFF, ON]
  settable: true

- id: ipv4_address
  label: IP Address
  type: string
  settable: true

- id: ipv4_netmask
  label: Subnet Mask
  type: string
  settable: true

- id: ipv4_gateway
  label: Default Gateway
  type: string
  settable: true

- id: network_dns1
  label: DNS Server 1
  type: string
  settable: true

- id: network_dns2
  label: DNS Server 2
  type: string
  settable: true

- id: network_ntp
  label: Use Network Time
  type: enum
  values: [OFF, ON]
  settable: true

- id: network_ntpserver
  label: NTP Server
  type: string
  settable: true

- id: timezone
  label: Timezone
  type: enum
  values: [list of 85 timezone values]
  settable: true

- id: time
  label: Time
  type: object
  properties:
    - name: year
      type: integer
    - name: month
      type: integer
      range: [1, 12]
    - name: date
      type: integer
    - name: hour
      type: integer
    - name: minute
      type: integer
  settable: true

- id: time_day
  label: Time Day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  settable: false

- id: time_month
  label: Time Month
  type: enum
  values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
  settable: true

- id: time_string
  label: Time String
  type: string
  settable: false

- id: schedule
  label: Schedule
  type: object
  properties:
    - name: slot
      type: integer
      range: [1, 10]
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE]
    - name: value
      type: integer
  settable: true

- id: schedule_action
  label: Schedule Action
  type: enum
  values: [TURN.ON, TURN.OFF, RECALL, PANEL.BRIGHTNESS]
  settable: true

- id: schedule_day
  label: Schedule Day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  settable: true

- id: schedule_frequency
  label: Schedule Frequency
  type: enum
  values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]
  settable: true

- id: schedule_description
  label: Schedule Description
  type: string
  settable: false

- id: preset_name
  label: Preset Name
  type: string
  settable: true

- id: preset_max
  label: Preset Max
  type: integer
  settable: false

- id: preset_count
  label: Preset Count
  type: integer
  settable: false

- id: preset_full
  label: Preset Full
  type: enum
  values: [NO, YES]
  settable: false

- id: preset_list
  label: Preset List
  type: string
  settable: false

- id: notification_email
  label: Notification Email
  type: object
  properties:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED]
    - name: enable
      type: enum
      values: [DISABLE, ENABLE]
    - name: recipients
      type: string
    - name: message
      type: string
  settable: true

- id: network_ping
  label: Network Ping
  type: string
  settable: true

- id: ir_code
  label: IR Code
  type: integer
  range: [0, 65535]
  settable: true

- id: build_info
  label: Version Info
  type: string
  settable: false

- id: model_series
  label: Model Series
  type: string
  settable: false

- id: command_enable
  label: Network Commands Enable
  type: enum
  values: [OFF, ON]
  settable: true

- id: osd_allow_popup
  label: Allow Pop Up Messages
  type: enum
  values: [NO, YES]
  settable: true

- id: audio_input
  label: Audio Input
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
  settable: false
  description: Returns input source currently playing audio

- id: edid_timing
  label: EDID Timing
  type: enum
  values: [4K60, 4K30, 1080P]
  settable: true

- id: edid_selected_connector
  label: EDID Zone
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
  settable: true
```

## Events
```yaml
# UNRESOLVED: no unsolicited event documentation found in source
# The device sends error responses (!ERR) and acknowledgements (@ACK) but no spontaneous notifications are documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro documentation in source
```

## Safety
```yaml
confirmation_required_for:
  - FIRMWARE.UPDATE  # requires manual initiation via IR or software
  - RESET(FACTORY1)  # also resets EDID, network settings, and presets
interlocks:
  - POWER.DOWN.MODE must be set to Networked.Standby.Mode or Fast.Startup before RS232 commands are accepted
```

## Notes
Command syntax: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` where TERM is CR, LF, or `;`. Responses use same terminator.

Operators: `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement. Responses prefixed with `:` for reads, `@ACK` for action acknowledgement, `^NAK` for negative ack, `!ERR N` for errors.

Error codes: ERR 1 (invalid syntax), ERR 3 (unknown command), ERR 4 (invalid modifier), ERR 5 (invalid operand), ERR 6 (invalid operator).

Network control (TCP/SSH) uses identical command set as RS232. Telnet (port 23) and SSH (port 22) cannot be enabled simultaneously. Default login: username `admin`, password is the display serial number. SSH uses the password set during first login.

<!-- UNRESOLVED: event/notification subscription mechanism not documented -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
  - https://www.planar.com/products/large-format-lcd-displays/ultrares-p/ultrares-p-downloads/
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
retrieved_at: 2026-10-07T17:48:37.000Z
last_checked_at: 2026-10-07T17:48:37.000Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T17:48:37.000Z
matched_actions: 97
action_count: 97
confidence: medium
summary: "All 97 action units match source command codes with correct enums and ranges, transport values are supported, and unmodelled source commands appear as Variables (97/106 above 0.9). (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event documentation found in source"
- "no explicit multi-step macro documentation in source"
- "event/notification subscription mechanism not documented"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
