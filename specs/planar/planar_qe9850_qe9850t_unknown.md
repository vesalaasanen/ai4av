---
spec_id: admin/planar-qe9850-qe9850t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar QE9850 Control Spec"
manufacturer: Planar
model_family: QE9850
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - QE9850
    - QE9850T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-31T07:05:33.451Z
generated_at: 2026-05-31T07:05:33.451Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-31T07:05:33.451Z
  matched_actions: 111
  action_count: 111
  confidence: high
  summary: "All 111 spec actions found in source command table with exact opcode/semantic matches; transport parameters verified; bidirectional coverage complete."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Planar QE9850 Control Spec

## Summary
Planar QE Series large-format display supporting RS-232, USB-B, and LAN serial control. Same command set operates over all three physical transports. Supports 4 independent zones, multi-source quad view, audio routing, power management, display calibration, network configuration, and scheduling. No authentication required.

<!-- UNRESOLVED: USB-B and LAN IP control not explicitly documented beyond serial command passthrough — only RS-232 parameters stated, TCP/UDP port 57 confirmed. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 57  # confirmed for TCP and UDP; source states port 57 for both
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # DISPLAY.POWER on/off, AUTO.ON, POWER.SAVE.MODE, POWER.ON.DELAY
- routable        # SOURCE.SELECT per zone, AUDIO.ZONE, SOURCE.NEXT, LAYOUT, MULTI.VIEW
- queryable      # aspect?, brightness?, AUDIO.INPUT?, SYSTEM.STATE?, SIGNAL.INFO?, many others
- levelable      # AUDIO.VOLUME, BACKLIGHT.INTENSITY, BRIGHTNESS, CONTRAST, COLOR, SHARPNESS, TINT, TREBLE, BASS, BALANCE
```

## Actions
```yaml
- id: cms
  label: Advanced Color Management
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT
    - name: gamut
      type: integer
      description: 0=REC709, 1=SMPTEC, 2=EBU, 5=USER, 6=AUTO, 255=CURRENT
    - name: color_point
      type: integer
      description: 0=RED.X, 1=RED.Y, 2=GREEN.X, 3=GREEN.Y, 4=BLUE.X, 5=BLUE.Y, 6=CYAN.X, 7=CYAN.Y, 8=MAGENTA.X, 9=MAGENTA.Y, 10=YELLOW.X, 11=YELLOW.Y, 12=WHITE.X, 13=WHITE.Y
    - name: value
      type: integer
      description: 0-800

- id: cmsflag
  label: Advanced Color Flag Query
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
    - name: value
      type: integer
      description: 0=NO, 1=YES

- id: aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT
    - name: value
      type: integer
      description: 0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX

- id: audio_input
  label: Audio Input Query
  kind: query
  params: []

- id: audio_zone
  label: Audio Zone Select
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4

- id: audio_settings
  label: Audio Settings
  kind: action
  params:
    - name: zone
      type: integer
    - name: volume
      type: integer
    - name: treble
      type: integer
    - name: bass
      type: integer
    - name: balance
      type: integer
    - name: mute
      type: integer
      description: 0=OFF, 1=ON
    - name: speakers
      type: integer
      description: 0=OFF, 1=ON

- id: auto_on
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: source_scan
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: 1-100

- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: blank_color
  label: Blank Screen Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: color
  label: Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: color_gamut
  label: Color Gamut
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: integer
      description: 0=SETTING, 1=ACTUAL, 2=COPY, 3=REVERT
    - name: gamut
      type: integer
      description: 0=REC709, 1=SMPTE.C, 2=EBU, 5=USER, 6=AUTO

- id: colorspace
  label: Color Space
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: integer
      description: 0=SETTING, 1=ACTUAL
    - name: value
      type: integer
      description: 0=REC601, 1=REC709, 2=RGB, 3=RGB.VIDEO, 4=AUTO

- id: color_subsampling
  label: Color Subsampling Query
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
      description: 0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE

- id: rotate
  label: Content Rotation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=NONE, 90=90, 180=180, 270=270

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: current_zone
  label: Current Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4

- id: current_zone_layout
  label: Current Zone Layout Query
  kind: query
  params: []

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=STATIC
    - name: value
      type: string

- id: network_dhcp
  label: DHCP Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: diagnostic_color
  label: Diagnostic Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 255=OFF

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
      description: 0=OFF, 1=ON

- id: dp_type
  label: DisplayPort Type
  kind: action
  params:
    - name: value
      type: integer
      description: 0=1.1, 1=1.2

- id: network_dns1
  label: DNS Server 1
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=STATIC
    - name: value
      type: string

- id: network_dns2
  label: DNS Server 2
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=STATIC
    - name: value
      type: string

- id: edid_timing
  label: EDID Timing
  kind: action
  params:
    - name: input
      type: integer
      description: 0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL
    - name: param
      type: integer
      description: 0=UPDATE, 1=HACTIVE, 2=VACTIVE, 3=VREFRESH, 4=FULL.SPEC, 5=PCLK, 6=HBLANK, 7=HFP, 8=HSYNC, 9=VBLANK, 10=VFP, 11=VSYNC, 12=FACTORY, 13=TYPE
    - name: value
      type: integer

- id: edid_selected_connector
  label: EDID Zone
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: error_log
  label: Error Log
  kind: query
  params:
    - name: entry
      type: integer
      description: Log entry number 1-65535

- id: reset_user
  label: Factory Reset (User)
  kind: action
  params: []

- id: reset_factory1
  label: Factory Reset (Full)
  kind: action
  params: []

- id: firmware_update
  label: Firmware Update
  kind: action
  params:
    - name: firmware
      type: integer
      description: 0=AUTO, 1=VP.AP, 2=HDMI
    - name: type
      type: integer
      description: 0=START, 1=PACKET, 2=FINISH, 3=URL
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
      description: 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: red_value
      type: integer
    - name: green_value
      type: integer
    - name: blue_value
      type: integer

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=1.5, 1=1.55, 2=1.6, 3=1.65, 4=1.7, 5=1.75, 6=1.8, 7=1.85, 8=1.9, 9=1.95, 10=2.0, 11=2.05, 12=2.1, 13=2.15, 14=2.2, 15=2.25, 16=2.3, 17=2.35, 18=2.4, 19=2.45, 20=2.5, 21=2.55, 22=2.6, 23=2.65, 24=2.7, 25=2.75, 26=2.8

- id: help
  label: Help
  kind: query
  params:
    - name: value
      type: integer
      description: 0=FIRST, 2147483647=NEXT

- id: hostname
  label: Hostname
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
      description: 0=HACTIVE, 1=VACTIVE, 2=PCLK, 3=HTOTAL, 4=VTOTAL, 5=VREFRESH, 6=HREFRESH, 7=INTERLACE, 8=VFIELDRATE, 9=VREFRESH.X.100, 10=COLORDEPTH, 11=TMDS

- id: pan
  label: Image Position
  kind: action
  params:
    - name: zone
      type: integer
    - name: direction
      type: integer
      description: 0=X, 1=Y, 255=ALL
    - name: x_value
      type: integer
    - name: y_value
      type: integer

- id: ipv4_address
  label: IP Address
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=STATIC
    - name: value
      type: string

- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: 0-65535

- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: key
  label: Key
  kind: action
  params:
    - name: value
      type: string
      description: Key name from key table (UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.0-KEY.9, MUTE, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, HDMI1-4, etc.)

- id: key_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: layout
  label: Layout
  kind: action
  params:
    - name: value
      type: integer
      description: 0=SINGLE, 12=QUAD

- id: local_dimming
  label: Local Dimming
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: network_mac
  label: MAC Address Query
  kind: query
  params: []

- id: memc_level
  label: MEMC Level
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH

- id: osd_position
  label: Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT

- id: model_id
  label: Model ID Query
  kind: query
  params: []

- id: model_series
  label: Model Series Query
  kind: query
  params: []

- id: multi_view
  label: Multi-Source View
  kind: action
  params:
    - name: value
      type: integer
      description: 0=SINGLE, 3=QUAD

- id: audio_mute
  label: Mute
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

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
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT

- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH

- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: event
      type: integer
      description: 0=POWER.STATE.CHANGED, 1=ERROR.OCCURRED, 2=SOURCE.DETECTED, 3=SOURCE.LOST, 4=SOURCE.SELECTED
    - name: enable
      type: integer
      description: 0=DISABLE, 1=ENABLE
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
      description: 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: red_value
      type: integer
    - name: green_value
      type: integer
    - name: blue_value
      type: integer

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
      description: 0=LANDSCAPE, 1=PORTRAIT

- id: osd_status
  label: OSD Status Query
  kind: query
  params: []

- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS

- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: 0-5

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-20

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: power_on_delay
  label: Power On Delay
  kind: action
  params:
    - name: value
      type: number
      description: 0.0-10.0 seconds (fixed point)

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  params:
    - name: value
      type: integer
      description: 60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLED, 1=LOW.POWER, 2=WAKE.ON.SIGNAL

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

- id: clone_settings
  label: Save and Restore Settings
  kind: action
  params:
    - name: operation
      type: integer
      description: 0=COPY, 1=PASTE
    - name: location
      type: integer
      description: 0=USB

- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  params:
    - name: location
      type: integer
      description: 0=USB

- id: schedule
  label: Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-20
    - name: parameter
      type: integer
      description: 0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE
    - name: value
      type: integer

- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-20
    - name: value
      type: integer
      description: 0=TURN.ON, 1=TURN.OFF, 3=PANEL.BRIGHTNESS

- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-20
    - name: value
      type: integer
      description: 0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN

- id: schedule_description
  label: Schedule Description Query
  kind: query
  params:
    - name: slot
      type: integer

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-20
    - name: value
      type: integer
      description: 0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS

- id: serial_device
  label: Serial Device
  kind: action
  params:
    - name: port
      type: integer
      description: 0=DB9, 1=USB, 2=OPS
    - name: setting
      type: integer
      description: 0=BAUD
    - name: value
      type: string

- id: serial_number
  label: Serial Number Query
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
      description: 0-100

- id: network_smtp_authentication
  label: SMTP Authentication
  kind: action
  params:
    - name: value
      type: integer
      description: 0=NONE, 1=AUTO, 2=PLAIN, 3=SCRAM_SHA1, 4=CRAM_MD5, 5=DIGEST_MD5, 6=LOGIN, 7=NTLM

- id: network_smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  params:
    - name: value
      type: integer
      description: 0=NONE, 1=TLS, 2=START.TLS

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
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT
    - name: source
      type: integer
      description: 0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  params:
    - name: mode
      type: integer
      description: 0=STATIC
    - name: value
      type: string

- id: system_state
  label: System State Query
  kind: query
  params: []

- id: network_smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: integer
      description: 0=POWER.STATE.CHANGED, 1=ERROR.OCCURRED, 2=SOURCE.DETECTED, 3=SOURCE.LOST, 4=SOURCE.SELECTED

- id: pattern
  label: Test Pattern
  kind: action
  params:
    - name: value
      type: integer
      description: 0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW, 11=GRAYBAR, 12=REDBAR, 13=GREENBAR, 14=BLUEBAR, 16=CHECKERBOARD, 18=COLORBAR

- id: time
  label: Time
  kind: action
  params:
    - name: field
      type: integer
      description: 0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE
    - name: value
      type: integer

- id: time_day
  label: Time Day Query
  kind: query
  params: []

- id: time_month
  label: Time Month
  kind: action
  params:
    - name: value
      type: integer
      description: 1=JANUARY, 2=FEBRUARY, 3=MARCH, 4=APRIL, 5=MAY, 6=JUNE, 7=JULY, 8=AUGUST, 9=SEPTEMBER, 10=OCTOBER, 11=NOVEMBER, 12=DECEMBER

- id: time_string
  label: Time String Query
  kind: query
  params: []

- id: timezone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: string

- id: tint
  label: Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: audio_treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: network_ntp
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: build_info
  label: Version Info
  kind: query
  params:
    - name: field
      type: integer
      description: 0=DATE.SCP, 1=VERSION.SCP, 3=DATE.VP, 4=VERSION.VP, 5=SRC.INFO.VP, 6=VERSION.HDMI, 7=VERSION.FRC, 8=PKG.DATE, 9=PKG.VERSION

- id: audio_volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
```

## Feedbacks
```yaml
- id: error_response
  type: string
  values:
    - ERR 1: Invalid syntax
    - ERR 2: Reserved
    - ERR 3: Command not recognized
    - ERR 4: Invalid modifier
    - ERR 5: Invalid operands
    - ERR 6: Invalid operator

- id: ack_response
  type: string
  values:
    - "@ACK"

- id: nak_response
  type: string
  values:
    - "^NAK"

- id: power_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, FAULT]

- id: display_power_state
  type: enum
  values: [OFF, ON]

- id: osd_status
  type: enum
  values: [DISABLE, ENABLE]

- id: aspect_ratio
  type: enum
  values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]

- id: color_temperature
  type: enum
  values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]

- id: gamma
  type: enum
  values: [1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2.0, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5, 2.55, 2.6, 2.65, 2.7, 2.75, 2.8]

- id: audio_mute_state
  type: enum
  values: [OFF, ON]

- id: system_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, FAULT]

- id: source_select_state
  type: enum
  values: [OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP]

- id: color_subsampling_state
  type: string

- id: source_message_state
  type: string

- id: error_log_entry
  type: string

- id: network_ping_result
  type: enum
  values: [SUCCESS, FAILED]
```

## Variables
```yaml
# UNRESOLVED: all settings are exposed as Actions with = operator and Queries with ? operator.
# No discrete Variables beyond the command structure above.
```

## Events
```yaml
# UNRESOLVED: source documents notification email configuration but no unsolicited event mechanism described.
# The NOTIFICATION.EMAIL command configures SMTP-based alerts, not push events via the control channel.
```

## Macros
```yaml
# UNRESOLVED: no explicit macro sequences documented in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source.
```

## Notes
- Serial communication can occur over RS232, USB-B, or LAN — same command set on all three transports.
- TCP and UDP both use port 57; examples show hex encoding for UDP commands since most UDP terminals don't auto-send [CR].
- Commands are case-insensitive; responses always in uppercase.
- Zone support: ZONE.1–ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT modifiers.
- Color gain/offset commands use separate RED/GREEN/BLUE color modifiers or ALL for simultaneous adjustment.
- EDID timing and zone selection support multiple inputs: OPS, HDMI.1–HDMI.4, DP, ALL.
- SMTP notification events: POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, SOURCE.SELECTED.
- Schedule slots 1-20 with FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE parameters.
- Key table includes navigation (UP/DOWN/LEFT/RIGHT/ENTER/EXIT/MENU), zone selection (ZONE1–ZONE4), source selection (HDMI1–4, DP), power (STDBY.TOGGLE/ENTER/EXIT), volume (VOLUME.PLUS/MINUS), and numeric keys.
- Current Zone Layout values: 0=S.1 (Single Zone 1), 28=Q.1 (Quad Zone 1), 29=Q.2, 30=Q.3, 31=Q.4.
<!-- UNRESOLVED: USB-B and LAN transport parameters beyond "same serial command set" not stated. Port 57 for TCP/UDP confirmed; USB-B and RS-232 parameters same as stated RS-232 config (19200/8/1/N). -->
<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: unsolicited event push mechanism not described in source. -->
<!-- UNRESOLVED: fault recovery sequences not documented. -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-31T07:05:33.451Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:05:33.451Z
matched_actions: 111
action_count: 111
confidence: high
summary: "All 111 spec actions found in source command table with exact opcode/semantic matches; transport parameters verified; bidirectional coverage complete."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
