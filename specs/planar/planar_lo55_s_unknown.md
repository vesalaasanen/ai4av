---
spec_id: admin/planar-lo55_s
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar LO55 S Control Spec"
manufacturer: Planar
model_family: LO55
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - LO55
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/435900/020-1322-00_lo55-series-rs232-user-manual-9-16.pdf
retrieved_at: 2026-05-27T11:27:37.198Z
last_checked_at: 2026-10-07T12:42:48.773Z
generated_at: 2026-10-07T12:42:48.773Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "populate from source - remove this comment if section is applicable"
  - "the source does not describe unsolicited event notifications from the device"
  - "no explicit multi-step macro sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
  - "USB-B serial config not explicitly stated in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:42:48.773Z
  matched_actions: 114
  action_count: 114
  confidence: medium
  summary: "All 114 spec actions map one-to-one to the 114 rows of the LO55 RS232 command table, and the serial and LAN port 57 transport values are in the source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Planar LO55 S Control Spec

## Summary
Planar LookThru Transparent OLED display with RS232 control interface. Supports serial command-and-response over RS232 and USB-B, and TCP/UDP control over LAN, using named or numeric opcodes, modifiers, and operand values. Covers image adjust, audio, networking, scheduling, presets, and system diagnostics.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
lan:
  tcp_port: 57
  udp_port: 57
auth:
  type: UNRESOLVED
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: cms
  label: Advanced Color
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT"
    - name: gamut
      type: integer
      description: "Gamut: 0=REC709, 1=SMPTEC, 2=EBU, 5=USER, 6=AUTO, 255=CURRENT"
    - name: color_point
      type: integer
      description: "Color Point: 0=RED.X, 1=RED.Y, 2=GREEN.X, 3=GREEN.Y, 4=BLUE.X, 5=BLUE.Y, 6=CYAN.X, 7=CYAN.Y, 8=MAGENTA.X, 9=MAGENTA.Y, 10=YELLOW.X, 11=YELLOW.Y, 12=WHITE.X, 13=WHITE.Y"
    - name: value
      type: integer
      description: "0-800"
- id: cmsflag
  label: Advanced Color Flag
  kind: query
  params:
    - name: zone
      type: integer
    - name: gamut
      type: integer
    - name: color_point
      type: integer
- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=NO, 1=YES"
- id: aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT"
    - name: value
      type: integer
      description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"
- id: audio_input
  label: Audio Input
  kind: query
  params: []
- id: audio_zone
  label: Audio Select
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"
- id: auto_on
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: source_scan
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: blank_color
  label: Blank Screen Color
  kind: action
  params:
    - name: value
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK"
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
- id: color
  label: Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
- id: color_gamut
  label: Color Gamut
  kind: action
  params:
    - name: zone
      type: integer
    - name: type
      type: integer
      description: "0=SETTING, 1=ACTUAL, 2=COPY, 3=REVERT"
    - name: gamut
      type: integer
      description: "0=REC709, 1=SMPTE.C, 2=EBU, 5=USER, 6=AUTO, 7=DISABLE"
- id: colorspace
  label: Color Space
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: integer
      description: "0=SETTING, 1=ACTUAL"
    - name: value
      type: integer
      description: "0=REC601, 1=REC709, 2=RGB, 3=RGB.VIDEO, 4=AUTO"
- id: color_subsampling
  label: Color Subsampling
  kind: query
  params:
    - name: zone
      type: integer
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"
- id: rotate
  label: Content Rotation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=NONE, 90=90, 180=180, 270=270"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
- id: current_zone
  label: Current Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"
- id: current_zone_layout
  label: Current Zone Layout
  kind: query
  params: []
- id: ipv4_gateway
  label: Default Gateway
  kind: query
  params: []
- id: network_dhcp
  label: DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: diagnostic_color
  label: Diagnostic Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 255=OFF"
- id: display_name
  label: Display Name
  kind: action
  params:
    - name: value
      type: string
- id: display_power
  label: Display Power
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: dp_type
  label: DisplayPort Type
  kind: action
  params:
    - name: value
      type: integer
      description: "0=1.1, 1=1.2"
- id: network_dns1
  label: DNS Server 1
  kind: action
  params:
    - name: type
      type: integer
      description: "0=STATIC"
    - name: value
      type: string
- id: network_dns2
  label: DNS Server 2
  kind: action
  params:
    - name: type
      type: integer
      description: "0=STATIC"
    - name: value
      type: string
- id: edid_timing
  label: EDID Timing
  kind: action
  params:
    - name: input
      type: integer
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL"
    - name: param
      type: integer
      description: "0=UPDATE, 1=HACTIVE, 2=VACTIVE, 3=VREFRESH, 4=FULL.SPEC, 5=PCLK, 6=HBLANK, 7=HFP, 8=HSYNC, 9=VBLANK, 10=VFP, 11=VSYNC, 12=FACTORY, 13=TYPE"
    - name: value
      type: integer
- id: edid_selectedconnector
  label: EDID Zone
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL"
- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: integer
      description: "0=DISABLE, 1=ENABLE"
- id: error_log
  label: Error Log
  kind: query
  params:
    - name: entry_number
      type: integer
      description: "1-65535"
- id: reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: integer
      description: "0=USER, 1=FACTORY1"
- id: firmware_update
  label: Firmware Update
  kind: action
  params:
    - name: firmware
      type: integer
      description: "0=AUTO, 1=VP.AP, 2=HDMI"
    - name: type
      type: integer
      description: "0=START, 1=PACKET, 2=FINISH, 3=URL"
    - name: value
      type: string
- id: gain
  label: Gain
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 255=ALL"
    - name: value
      type: integer
      description: "0-200 per channel"
- id: gamma
  label: Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=1.5, 1=1.55, 2=1.6, 3=1.65, 4=1.7, 5=1.75, 6=1.8, 7=1.85, 8=1.9, 9=1.95, 10=2.0, 11=2.05, 12=2.1, 13=2.15, 14=2.2, 15=2.25, 16=2.3, 17=2.35, 18=2.4, 19=2.45, 20=2.5, 21=2.55, 22=2.6, 23=2.65, 24=2.7, 25=2.75, 26=2.8"
- id: help
  label: Help
  kind: action
  params:
    - name: page
      type: integer
      description: "0=FIRST, 2147483647=NEXT"
- id: hostname
  label: Host Name
  kind: action
  params:
    - name: value
      type: string
- id: signal_info
  label: Image Information
  kind: query
  params:
    - name: zone
      type: integer
    - name: parameter
      type: integer
      description: "0=HACTIVE, 1=VACTIVE, 2=PCLK, 3=HTOTAL, 4=VTOTAL, 5=VREFRESH, 6=HREFRESH, 7=INTERLACE, 8=VFIELDRATE, 9=VREFRESH.X.100, 10=COLORDEPTH, 11=TMDS"
- id: pan
  label: Image Position
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: "0=X, 1=Y, 255=ALL"
    - name: value
      type: integer
      description: "-1000 to 1000"
- id: ipv4_address
  label: IP Address
  kind: query
  params: []
- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: "0-65535"
- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: integer
      description: "0=DISABLE, 1=ENABLE"
- id: key
  label: Key
  kind: action
  params:
    - name: key_code
      type: integer
      description: "See Key Code table"
- id: key_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: integer
      description: "0=DISABLE, 1=ENABLE"
- id: layout
  label: Layout
  kind: action
  params:
    - name: view_type
      type: integer
      description: "1=DUAL, 2=TRIPLE, 4=PIP, 5=CURRENT"
    - name: value
      type: integer
      description: "0=SINGLE, 1=PIP.UL, 2=PIP.UR, 3=PIP.LL, 4=PIP.LR, 5=DUAL.L, 6=DUAL.T, 7=TRIPLE.L, 8=TRIPLE.R, 9=TRIPLE.T, 10=TRIPLE.B, 11=TRIPLE.M, 12=QUAD"
- id: network_mac
  label: MAC Address
  kind: query
  params: []
- id: osd_position
  label: Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"
- id: model_id
  label: Model ID
  kind: query
  params: []
- id: model_series
  label: Model Series
  kind: query
  params: []
- id: multi_view
  label: Multi-Source View
  kind: action
  params:
    - name: value
      type: integer
      description: "0=SINGLE, 1=DUAL, 2=TRIPLE, 3=QUAD, 4=PIP"
- id: audio_mute
  label: Mute
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: address
      type: string
- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT"
- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH"
- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: event
      type: integer
      description: "0=POWER.STATE.CHANGED, 1=ERROR.OCCURRED, 2=SOURCE.DETECTED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
    - name: enable
      type: integer
      description: "0=DISABLE, 1=ENABLE"
    - name: recipients
      type: string
    - name: message
      type: string
- id: network_ntpserver
  label: NTP Server
  kind: action
  params:
    - name: value
      type: string
- id: offset
  label: Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
    - name: value
      type: integer
      description: "0-100 per channel"
- id: osd_close
  label: OSD Close
  kind: action
  params: []
- id: orientation
  label: OSD Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: "0=LANDSCAPE, 1=PORTRAIT"
- id: osd_status
  label: OSD Status
  kind: query
  params: []
- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS"
- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "0-5"
- id: overscan
  label: Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-20"
- id: pip_size
  label: PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: "0=SMALL, 1=MEDIUM, 2=LARGE"
- id: pip_swap
  label: PIP Swap
  kind: action
  params: []
- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: power_on_delay
  label: Power On Delay
  kind: action
  params:
    - name: value
      type: number
      description: "0.0-10.0"
- id: power_save_delay
  label: Power Saving Delay
  kind: action
  params:
    - name: value
      type: integer
      description: "60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES"
- id: power_save_mode
  label: Power Saving Mode
  kind: action
  params:
    - name: value
      type: integer
      description: "0=DISABLED, 1=LOW.POWER, 2=WAKE.ON.SIGNAL"
- id: preset_count
  label: Preset Count
  kind: query
  params: []
- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "1-1000"
- id: preset_full
  label: Preset Full
  kind: query
  params:
    - name: preset_number
      type: integer
      description: "1-1000"
- id: preset_list
  label: Preset List
  kind: query
  params:
    - name: page
      type: integer
      description: "0=FIRST, 2147483647=NEXT"
- id: preset_max
  label: Preset Max
  kind: query
  params: []
- id: preset_name
  label: Preset Name
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "1-1000"
    - name: name
      type: string
- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "1-1000"
- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: preset_number
      type: integer
      description: "1-1000"
- id: system_reboot
  label: Reboot
  kind: action
  params: []
- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT"
- id: clone_settings
  label: Save and Restore Settings
  kind: action
  params:
    - name: operation
      type: integer
      description: "0=COPY, 1=PASTE"
    - name: location
      type: integer
      description: "0=USB"
- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  params:
    - name: location
      type: integer
      description: "0=USB"
- id: schedule
  label: Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: parameter
      type: integer
      description: "0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE"
    - name: value
      type: integer
- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: value
      type: integer
      description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"
- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: value
      type: integer
      description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"
- id: schedule_description
  label: Schedule Description
  kind: query
  params:
    - name: slot
      type: integer
      description: "1-20"
- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: value
      type: integer
      description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"
- id: serial_device
  label: Serial Device
  kind: action
  params:
    - name: port
      type: integer
      description: "0=DB9, 1=USB, 2=OPS"
    - name: setting
      type: integer
      description: "0=BAUD"
    - name: value
      type: string
- id: serial_number
  label: Serial Number
  kind: query
  params: []
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
- id: network_smtp_authentication
  label: SMTP Authentication
  kind: action
  params:
    - name: value
      type: integer
      description: "0=NONE, 1=AUTO, 2=PLAIN, 3=SCRAM_SHA1, 4=CRAM_MD5, 5=DIGEST_MD5, 6=LOGIN, 7=NTLM"
- id: network_smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  params:
    - name: value
      type: integer
      description: "0=NONE, 1=TLS, 2=START.TLS"
- id: network_smtp_from
  label: SMTP Email From Address
  kind: action
  params:
    - name: value
      type: string
- id: network_smtp_password
  label: SMTP Password
  kind: action
  params:
    - name: value
      type: string
- id: network_smtp_port
  label: SMTP Port
  kind: action
  params:
    - name: value
      type: integer
- id: network_smtp_server
  label: SMTP Server
  kind: action
  params:
    - name: value
      type: string
- id: network_smtp_username
  label: SMTP Username
  kind: action
  params:
    - name: value
      type: string
- id: source_message
  label: Source Message
  kind: query
  params:
    - name: zone
      type: integer
- id: source_select
  label: Source Select
  kind: action
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT"
    - name: source
      type: integer
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP"
- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: "0=DISABLE, 1=ENABLE"
- id: ipv4_netmask
  label: Subnet Mask
  kind: query
  params: []
- id: system_state
  label: System State
  kind: query
  params: []
- id: network_smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: integer
      description: "0=POWER.STATE.CHANGED, 1=ERROR.OCCURRED, 2=SOURCE.DETECTED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
- id: pattern
  label: Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: "0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW, 11=GRAYBAR, 12=REDBAR, 13=GREENBAR, 14=BLUEBAR, 16=CHECKERBOARD, 18=COLORBAR"
- id: time
  label: Time
  kind: action
  params:
    - name: field
      type: integer
      description: "0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE"
    - name: value
      type: integer
- id: time_day
  label: Time - Day
  kind: query
  params: []
- id: time_month
  label: Time - Month
  kind: action
  params:
    - name: value
      type: integer
      description: "1-12"
- id: time_string
  label: Time - String
  kind: query
  params: []
- id: timezone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: integer
      description: "See timezone table"
- id: tint
  label: Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
- id: network_ntp
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 1=ON"
- id: build_info
  label: Version Info
  kind: query
  params:
    - name: field
      type: integer
      description: "0=DATE.SCP, 1=VERSION.SCP, 3=DATE.VP, 4=VERSION.VP, 5=SRC.INFO.VP, 6=VERSION.HDMI, 7=VERSION.FRC, 8=PKG.DATE, 9=PKG.VERSION"
- id: audio_volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: "0-100"
- id: wall
  label: Wall
  kind: action
  params:
    - name: param
      type: integer
      description: "0=ENABLE, 1=WIDTH, 2=HEIGHT, 3=COLUMN, 4=ROW, 5=FRAME.ENABLE, 6=FRAME.WIDTH, 7=FRAME.HEIGHT"
    - name: value
      type: integer
      description: "0-100"
```

## Feedbacks
```yaml
# UNRESOLVED: populate from source - remove this comment if section is applicable
```

## Variables
```yaml
# UNRESOLVED: populate from source - remove this comment if section is applicable
```

## Events
```yaml
# UNRESOLVED: the source does not describe unsolicited event notifications from the device
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
```

## Notes
Serial communication is available over RS232 and USB-B. LAN control uses TCP or UDP port 57. Case-insensitive protocol; responses always uppercase. Termination: [CR] (0x0D), [LF] (0x0A), or ';'.
<!-- UNRESOLVED: USB-B serial config not explicitly stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/435900/020-1322-00_lo55-series-rs232-user-manual-9-16.pdf
retrieved_at: 2026-05-27T11:27:37.198Z
last_checked_at: 2026-10-07T12:42:48.773Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:42:48.773Z
matched_actions: 114
action_count: 114
confidence: medium
summary: "All 114 spec actions map one-to-one to the 114 rows of the LO55 RS232 command table, and the serial and LAN port 57 transport values are in the source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "populate from source - remove this comment if section is applicable"
- "the source does not describe unsolicited event notifications from the device"
- "no explicit multi-step macro sequences described in source"
- "no safety warnings or interlock procedures stated in source"
- "USB-B serial config not explicitly stated in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
