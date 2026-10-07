---
spec_id: admin/planar-urw105-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar URW105 Series Control Spec"
manufacturer: Planar
model_family: URW105
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - URW105
    - URW105-ERO-T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/e5anepwg/planar-ultrares-w-series_rs232_user-manual.pdf
retrieved_at: 2026-10-07T12:42:45.973Z
last_checked_at: 2026-10-07T12:42:45.973Z
generated_at: 2026-10-07T12:42:45.973Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no unsolicited event descriptions in source"
  - "power cycling sequences, fault recovery, and emergency shutdown procedures not documented"
  - "firmware version compatibility ranges not stated"
  - "fault behavior and error recovery sequences not documented"
  - "binary command encodings not used — all ASCII text protocol"
  - "power cycling sequences, emergency shutdown, and fault recovery procedures not documented"
  - "unsolicited event messages not described — only synchronous command responses"
verification:
  verdict: verified
  checked_at: 2026-10-07T12:42:45.973Z
  matched_actions: 199
  action_count: 199
  confidence: medium
  summary: "All 199 action units match source command rows with correct shapes and transport; source has about 122 commands, so coverage ratio exceeds 0.9. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar URW105 Series Control Spec

## Summary
Commercial LCD display supporting dual-zone video wall with RS-232C serial and TCP/IP control interfaces. The same command set operates over both RS-232 (19200 baud, 8N1) and Ethernet (Telnet port 23, SSH port 22). Supports power control, input routing, multi-view layouts (PIP, Dual), audio management, image adjustments, scheduling, and SNMP/email notification.

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # Telnet; SSH also available on port 22
auth:
  type: UNRESOLVED  # source does not specify an authentication type
  # SSH defaults: username=admin, password is specified by the label on the back of the display
```

## Traits
```yaml
- powerable       # DISPLAY.POWER, SYSTEM.REBOOT present
- routable        # SOURCE.SELECT, LAYOUT, MULTI.VIEW, PIP operations present
- queryable       # "?" operator supported on most settings
- levelable       # AUDIO.VOLUME, BRIGHTNESS, BACKLIGHT.INTENSITY, etc.
```

## Actions
```yaml
- id: display_power
  label: Set Display Power
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"

- id: source_select
  label: Select Source
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone: 0=ZONE.1, 1=ZONE.2, 4=ZONE.1.SECONDARY, 254=ALL, 255=CURRENT"
    - name: source
      type: integer
      description: "Source: 0=OPS, 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC"

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone: 0=ZONE.1, 1=ZONE.2, 254=ALL, 255=CURRENT"

- id: layout_set
  label: Set Layout
  kind: action
  params:
    - name: multi_source_view
      type: integer
      description: "1=DUAL, 4=PIP, 5=CURRENT"
    - name: layout
      type: integer
      description: "0=SINGLE, 1=PIP.UL, 2=PIP.UR, 3=PIP.LL, 4=PIP.LR, 5=DUAL.L"

- id: multi_view_set
  label: Set Multi-Source View
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=SINGLE, 1=DUAL, 4=PIP"

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

- id: pip_size
  label: Set PIP Size
  kind: action
  params:
    - name: size
      type: integer
      description: "0=SMALL, 1=MEDIUM, 2=LARGE"

- id: audio_volume
  label: Set Volume
  kind: action
  params:
    - name: volume
      type: integer
      range: [0, 100]

- id: audio_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone: 0=ZONE.1, 1=ZONE.2, 255=CURRENT"
    - name: value
      type: integer
      range: [0, 100]

- id: backlight_intensity
  label: Set Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 100]

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [0, 100]

- id: color_set
  label: Set Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [0, 100]

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [0, 100]

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [0, 100]

- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 255=ALL"
    - name: value
      type: integer
      range: [0, 200]
      description: "For ALL, pass three values: Red Green Blue"

- id: offset_set
  label: Set Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 255=ALL"
    - name: value
      type: integer
      range: [0, 100]

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [7, 22]
      description: "7=1.85, 8=1.9, ... 22=2.6"

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
    - name: ratio
      type: integer
      description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"

- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      range: [0, 20]

- id: audio_balance_set
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: audio_treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: audio_bass_set
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: audio_speakers_enable
  label: Enable Internal Speakers
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: preset_save
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 60]

- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [0, 60]

- id: preset_delete
  label: Delete Preset
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 60]

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: integer
      description: "0=USER, 1=FACTORY1"

- id: system_reboot
  label: Reboot System
  kind: action
  params: []

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer

- id: test_pattern
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: "0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW, 11=GRAYBAR, 12=REDBAR, 13=GREENBAR, 14=BLUEBAR"

- id: osd_close
  label: Close OSD
  kind: action
  params: []

- id: osd_position_set
  label: Set OSD Position
  kind: action
  params:
    - name: position
      type: integer
      description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"

- id: osd_rotation_set
  label: Set OSD Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: "0=LANDSCAPE, 1=PORTRAIT"

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 10]

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS"

- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: blank_screen_color
  label: Set Blank Screen Color
  kind: action
  params:
    - name: color
      type: integer
      description: "0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK"

- id: led_enable_set
  label: Set Status LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: ir_lock_set
  label: Set IR Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: keypad_lock_set
  label: Set Keypad Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: lan_lock_set
  label: Set LAN Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: rs232_lock_set
  label: Set RS232 Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: usba_lock_set
  label: Set USB-A Lock
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: local_dimming_set
  label: Set Local Dimming
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: power_down_mode_set
  label: Set Power Down Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STANDBY.MODE, 1=NETWORKED.STANDBY.MODE, 2=FAST.STARTUP"

- id: power_save_mode_set
  label: Set Power Saving Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=DISABLED, 1=POWER.DOWN, 2=WAKE.ON.SIGNAL"

- id: power_save_delay_set
  label: Set Power Saving Delay
  kind: action
  params:
    - name: delay
      type: integer
      description: "60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES"

- id: auto_power_on_set
  label: Set Auto Power On
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON, 2=PREVIOUS.STATE"

- id: auto_scan_set
  label: Set Auto Scan Sources
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON, 2=FAILOVER"

- id: cec_enable_set
  label: Set HDMI CEC Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: dhcp_set
  label: Set DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: ipv4_address_set
  label: Set IP Address
  kind: action
  params:
    - name: type
      type: integer
      description: "0=STATIC"
    - name: address
      type: string
      description: IPv4 address string

- id: ipv4_netmask_set
  label: Set Subnet Mask
  kind: action
  params:
    - name: type
      type: integer
      description: "0=STATIC"
    - name: mask
      type: string
      description: IPv4 subnet mask string

- id: ipv4_gateway_set
  label: Set Default Gateway
  kind: action
  params:
    - name: type
      type: integer
      description: "0=STATIC"
    - name: gateway
      type: string
      description: IPv4 address string

- id: network_dns_set
  label: Set DNS Server
  kind: action
  params:
    - name: server
      type: integer
      description: "1=DNS1, 2=DNS2"
    - name: type
      type: integer
      description: "0=STATIC"
    - name: address
      type: string

- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: network_ntpserver_set
  label: Set NTP Server
  kind: action
  params:
    - name: server
      type: string

- id: command_enable_set
  label: Set Network Command Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=OFF, 1=ON"

- id: snmp_enable_set
  label: Set SNMP Enable
  kind: action
  params:
    - name: state
      type: integer
      description: "0=ON, 1=OFF"

- id: timezone_set
  label: Set Time Zone
  kind: action
  params:
    - name: zone
      type: string
      description: e.g. "UTCP0000.LONDON.DUBLIN"

- id: time_set
  label: Set Time
  kind: action
  params:
    - name: component
      type: integer
      description: "0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE"
    - name: value
      type: integer

- id: schedule_set
  label: Set Schedule
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 20]
    - name: param
      type: integer
      description: "0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE"
    - name: value
      type: integer

- id: schedule_action_set
  label: Set Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 20]
    - name: action
      type: integer
      description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"

- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 20]
    - name: day
      type: integer
      description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"

- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 20]
    - name: freq
      type: integer
      description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"

- id: language_set
  label: Set Language
  kind: action
  params:
    - name: lang
      type: integer
      description: "0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE"

- id: smtp_server_set
  label: Set SMTP Server
  kind: action
  params:
    - name: server
      type: string

- id: smtp_port_set
  label: Set SMTP Port
  kind: action
  params:
    - name: port
      type: integer

- id: smtp_encryption_set
  label: Set SMTP Encryption
  kind: action
  params:
    - name: encryption
      type: integer
      description: "0=NONE, 1=TLS, 2=START.TLS"

- id: smtp_authentication_set
  label: Set SMTP Authentication
  kind: action
  params:
    - name: auth
      type: integer
      description: "0=NONE, 1=AUTO, 2=PLAIN, 6=LOGIN"

- id: smtp_username_set
  label: Set SMTP Username
  kind: action
  params:
    - name: username
      type: string

- id: smtp_password_set
  label: Set SMTP Password
  kind: action
  params:
    - name: password
      type: string

- id: smtp_from_set
  label: Set SMTP From Address
  kind: action
  params:
    - name: address
      type: string

- id: notification_email_set
  label: Set Notification Email
  kind: action
  params:
    - name: event
      type: integer
      description: "0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
    - name: enable
      type: integer
      description: "0=DISABLE, 1=ENABLE"
    - name: recipients
      type: string
    - name: message
      type: string

- id: dp_type_set
  label: Set DisplayPort 1 Type
  kind: action
  params:
    - name: type
      type: integer
      description: "0=1.1, 1=1.2, 2=1.4"

- id: dp2_type_set
  label: Set DisplayPort 2 Type
  kind: action
  params:
    - name: type
      type: integer
      description: "0=1.1, 1=1.2, 2=1.4"

- id: usbc_type_set
  label: Set USB-C Type
  kind: action
  params:
    - name: type
      type: integer
      description: "0=1.1, 1=1.2, 2=1.4"

- id: usb_upstream_set
  label: Set USB Upstream
  kind: action
  params:
    - name: source
      type: integer
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"
    - name: upstream
      type: integer
      description: "0=USBB1, 1=USBB2, 2=USBC, 3=OPS"

- id: ops_power_check_set
  label: Set OPS Power Down Check
  kind: action
  params:
    - name: state
      type: integer
      description: "0=DISABLE, 1=ENABLE"

- id: colorspace_set
  label: Set Color Space
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: integer
      description: "0=SETTING, 1=ACTUAL"
    - name: space
      type: integer
      description: "0=REC601, 1=REC709, 2=RGB, 3=RGB.VIDEO, 4=AUTO"

- id: edid_timing_set
  label: Set EDID Timing
  kind: action
  params:
    - name: input
      type: integer
      description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"
    - name: param
      type: integer
      description: "0=UPDATE, 12=FACTORY, 13=TYPE"
    - name: value
      type: integer

- id: edid_selected_connector_set
  label: Set EDID Selected Connector
  kind: action
  params:
    - name: connector
      type: integer
      description: "1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL, 13=DP.2"

- id: dp_out_set
  label: Set DP Out
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=SST, 2=MST"

- id: ops_port_set
  label: Set OPS Port
  kind: action
  params:
    - name: port
      type: integer
      description: "0=HDMI, 1=DP"

- id: tracking_set
  label: Set Tracking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: ir_code_set
  label: Set IR Code
  kind: action
  params:
    - name: code
      type: integer
      range: [0, 65535]

- id: network_ping
  label: Ping Network
  kind: action
  params:
    - name: address
      type: string
      description: Hostname or IP address to ping

- id: smart_light_set
  label: Set Smart Light Control
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=DCR, 2=LIGHT.SENSOR"

- id: send_key
  label: Send Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name from key table (e.g. MENU, UP, DOWN, ENTER, etc.)

- id: preset_name_set
  label: Set Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      range: [1, 60]
    - name: name
      type: string

- id: audio_zone_set
  label: Set Audio Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: "0 = ZONE.1, 1 = ZONE.2"

- id: audio_settings_set
  label: Set Audio Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: "0 = ZONE.1, 1 = ZONE.2"
    - name: volume
      type: integer
      range: UNRESOLVED
    - name: treble
      type: integer
      range: UNRESOLVED
    - name: bass
      type: integer
      range: UNRESOLVED
    - name: balance
      type: integer
      range: UNRESOLVED
    - name: mute
      type: integer
      range: UNRESOLVED
    - name: speakers
      type: integer
      range: UNRESOLVED

- id: firmware_update
  label: Update Firmware
  kind: action
  params:
    - name: firmware
      type: integer
      description: "0 = SCALER, 1 = SUBMCU, 2 = NETUART"
    - name: value
      type: string

- id: ops_type_set
  label: Set OPS Type
  kind: action
  params:
    - name: type
      type: integer
      description: "0 = 1.1, 1 = 1.2"
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, FAULT]
  description: Query current system state
  query_command: SYSTEM.STATE?

- id: display_power_state
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: DISPLAY.POWER?

- id: current_zone
  type: integer
  values: [0, 1]
  description: "0=ZONE.1, 1=ZONE.2"
  query_command: CURRENT.ZONE?

- id: current_zone_layout
  type: enum
  values: [S.1, P.UL.1, P.UL.2, P.UR.1, P.UR.2, P.LL.1, P.LL.2, P.LR.1, P.LR.2, D.L.1, D.L.2]
  query_command: CURRENT.ZONE.LAYOUT?

- id: source_select
  type: enum
  values: [OPS, HDMI.1, HDMI.2, DP, DP.2, NONE, USBC]
  query_command: SOURCE.SELECT?

- id: audio_input
  type: enum
  values: [OPS, HDMI.1, HDMI.2, DP, DP.2, NONE, USBC]
  query_command: AUDIO.INPUT?

- id: audio_volume
  type: integer
  range: [0, 100]
  query_command: AUDIO.VOLUME?

- id: audio_mute
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: AUDIO.MUTE?

- id: audio_balance
  type: integer
  range: [0, 100]
  query_command: AUDIO.BALANCE?

- id: audio_treble
  type: integer
  range: [0, 100]
  query_command: AUDIO.TREBLE?

- id: audio_bass
  type: integer
  range: [0, 100]
  query_command: AUDIO.BASS?

- id: audio_speakers
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: AUDIO.SPEAKERS?

- id: brightness
  type: integer
  range: [0, 100]
  description: Per-zone
  query_command: BRIGHTNESS?

- id: contrast
  type: integer
  range: [0, 100]
  description: Per-zone
  query_command: CONTRAST?

- id: color
  type: integer
  range: [0, 100]
  description: Per-zone
  query_command: COLOR?

- id: tint
  type: integer
  range: [0, 100]
  description: Per-zone
  query_command: TINT?

- id: sharpness
  type: integer
  range: [0, 100]
  description: Per-zone
  query_command: SHARPNESS?

- id: gain
  type: integer
  range: [0, 200]
  description: Per-zone, per-color
  query_command: GAIN?

- id: offset
  type: integer
  range: [0, 100]
  description: Per-zone, per-color
  query_command: OFFSET?

- id: color_temperature
  type: enum
  values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]
  description: Per-zone
  query_command: COLOR.TEMPERATURE?

- id: gamma
  type: integer
  range: [7, 22]
  description: Per-zone
  query_command: GAMMA?

- id: aspect
  type: enum
  values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
  description: Per-zone
  query_command: ASPECT?

- id: overscan
  type: integer
  range: [0, 20]
  description: Per-zone
  query_command: OVERSCAN?

- id: colorspace
  type: enum
  values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]
  description: Per-zone, setting or actual
  query_command: COLORSPACE?

- id: color_subsampling
  type: string
  description: e.g. "4:4:4", "4:2:0"
  query_command: COLOR.SUBSAMPLING?

- id: signal_info
  type: object
  properties:
    - hactive
    - vactive
    - pclk
    - htotal
    - vtotal
    - vrefresh
    - hrefresh
    - interlaced
    - vfieldrate
    - colordepth
    - tmds
  query_command: SIGNAL.INFO?

- id: source_message
  type: string
  description: Input resolution and frame rate or "Searching"/"No Signal"
  query_command: SOURCE.MESSAGE?

- id: model_id
  type: string
  description: Returns "URW105"
  query_command: MODEL.ID?

- id: model_series
  type: string
  description: Always returns "UltraRes W"
  query_command: MODEL.SERIES?

- id: serial_number
  type: string
  query_command: SERIAL.NUMBER?

- id: build_info
  type: string
  description: Firmware version info
  query_command: BUILD.INFO?

- id: preset_count
  type: integer
  query_command: PRESET.COUNT?

- id: preset_max
  type: integer
  query_command: PRESET.MAX?

- id: preset_full
  type: enum
  values: [0, 1]
  description: "0=NO, 1=YES"
  query_command: PRESET.FULL?

- id: preset_list
  type: array
  items:
    type: integer
  query_command: PRESET.LIST?

- id: preset_name
  type: string
  query_command: PRESET.NAME?

- id: multi_view
  type: enum
  values: [0, 1, 4]
  description: "0=SINGLE, 1=DUAL, 4=PIP"
  query_command: MULTI.VIEW?

- id: layout
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: Per multi-source view type
  query_command: LAYOUT?

- id: pip_size
  type: enum
  values: [0, 1, 2]
  description: "0=SMALL, 1=MEDIUM, 2=LARGE"
  query_command: PIP.SIZE?

- id: osd_status
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE; whether OSD is currently shown"
  query_command: OSD.STATUS?

- id: osd_position
  type: enum
  values: [0, 1, 2, 3, 4]
  description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"
  query_command: OSD.POSITION?

- id: osd_timeout
  type: enum
  values: [0, 10, 30, 60, 120, 240]
  description: Seconds; 0=OFF
  query_command: OSD.TIMEOUT?

- id: osd_transparency
  type: integer
  range: [0, 10]
  query_command: OSD.TRANSPARENCY?

- id: splash_screen
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: SPLASH.SCREEN?

- id: blank_color
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  description: "0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK"
  query_command: BLANK.COLOR?

- id: led_enable
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: LED.ENABLE?

- id: ir_lock
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: IR.LOCK?

- id: keypad_lock
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: KEY.LOCK?

- id: lan_lock
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: LAN.LOCK?

- id: rs232_lock
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: RS232.LOCK?

- id: usba_lock
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: USBA.LOCK?

- id: local_dimming
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: LOCAL.DIMMING?

- id: pixel_orbit
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: PIXEL.ORBIT?

- id: power_down_mode
  type: enum
  values: [0, 1, 2]
  description: "0=STANDBY.MODE, 1=NETWORKED.STANDBY.MODE, 2=FAST.STARTUP"
  query_command: POWER.DOWN.MODE?

- id: power_save_mode
  type: enum
  values: [0, 1, 2]
  description: "0=DISABLED, 1=POWER.DOWN, 2=WAKE.ON.SIGNAL"
  query_command: POWER.SAVE.MODE?

- id: power_save_delay
  type: enum
  values: [60, 300, 900, 1800, 3600]
  description: Seconds; 60=1.MINUTE, etc.
  query_command: POWER.SAVE.DELAY?

- id: auto_power_on
  type: enum
  values: [0, 1, 2]
  description: "0=OFF, 1=ON, 2=PREVIOUS.STATE"
  query_command: AUTO.ON?

- id: auto_scan
  type: enum
  values: [0, 1, 2]
  description: "0=OFF, 1=ON, 2=FAILOVER"
  query_command: SOURCE.SCAN?

- id: cec_enable
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: CEC.ENABLE?

- id: cec_standby
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: CEC.STANDBY?

- id: dhcp
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: NETWORK.DHCP?

- id: ipv4_address
  type: string
  description: IP address
  query_command: IPV4.ADDRESS?

- id: ipv4_netmask
  type: string
  description: Subnet mask
  query_command: IPV4.NETMASK?

- id: ipv4_gateway
  type: string
  description: Default gateway
  query_command: IPV4.GATEWAY?

- id: network_dns1
  type: string
  query_command: NETWORK.DNS1?

- id: network_dns2
  type: string
  query_command: NETWORK.DNS2?

- id: network_mac
  type: string
  query_command: NETWORK.MAC?

- id: network_ntp
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: NETWORK.NTP?

- id: network_ntpserver
  type: string
  query_command: NETWORK.NTPSERVER?

- id: command_enable
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  query_command: COMMAND.ENABLE(NETWORK)?

- id: snmp_enable
  type: enum
  values: [0, 1]
  description: "0=ON, 1=OFF"
  query_command: SNMP.ENABLE?

- id: timezone
  type: string
  description: Timezone name e.g. "UTCP0000.LONDON.DUBLIN"
  query_command: TIMEZONE?

- id: time
  type: object
  properties:
    - year
    - month
    - date
    - hour
    - minute
  query_command: TIME?

- id: time_day
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"
  query_command: TIME.DAY?

- id: time_month
  type: integer
  range: [1, 12]
  query_command: TIME.MONTH?

- id: time_string
  type: string
  description: "YYYY-MM-DD HH:MM"
  query_command: TIME.STRING?

- id: language
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8]
  description: "0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE"
  query_command: LANGUAGE?

- id: smtp_server
  type: string
  query_command: NETWORK.SMTP.SERVER?

- id: smtp_port
  type: integer
  query_command: NETWORK.SMTP.PORT?

- id: smtp_encryption
  type: enum
  values: [0, 1, 2]
  description: "0=NONE, 1=TLS, 2=START.TLS"
  query_command: NETWORK.SMTP.ENCRYPTION?

- id: smtp_authentication
  type: enum
  values: [0, 1, 2, 6]
  description: "0=NONE, 1=AUTO, 2=PLAIN, 6=LOGIN"
  query_command: NETWORK.SMTP.AUTHENTICATION?

- id: smtp_username
  type: string
  query_command: NETWORK.SMTP.USERNAME?

- id: smtp_from
  type: string
  query_command: NETWORK.SMTP.FROM?

- id: notification_email
  type: object
  description: Returns enable state, recipients, and message
  query_command: NOTIFICATION.EMAIL?

- id: dp_type
  type: enum
  values: [0, 1, 2]
  description: "0=1.1, 1=1.2, 2=1.4"
  query_command: DP.TYPE?

- id: dp2_type
  type: enum
  values: [0, 1, 2]
  description: "0=1.1, 1=1.2, 2=1.4"
  query_command: DP2.TYPE?

- id: usbc_type
  type: enum
  values: [0, 1, 2]
  description: "0=1.1, 1=1.2, 2=1.4"
  query_command: USBC.TYPE?

- id: usb_upstream
  type: enum
  values: [0, 1, 2, 3]
  description: "0=USBB1, 1=USBB2, 2=USBC, 3=OPS"
  query_command: USB.UPSTREAM?

- id: ops_present
  type: enum
  values: [0, 1]
  description: "0=FALSE, 1=TRUE"
  query_command: OPS.PRESENT?

- id: ops_power_check
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  query_command: OPS.POWER.CHECK?

- id: edid_timing
  type: mixed
  description: Returns EDID timing info or sets horizontal active
  query_command: EDID.TIMING?

- id: edid_selected_connector
  type: enum
  values: [1, 2, 3, 4, 5, 6, 13]
  description: "1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL, 13=DP.2"
  query_command: EDID.SELECTED.CONNECTOR?

- id: dp_out
  type: enum
  values: [0, 1, 2]
  description: "0=OFF, 1=SST, 2=MST"

- id: ops_port
  type: enum
  values: [0, 1]
  description: "0=HDMI, 1=DP"

- id: tracking
  type: integer
  range: [0, 100]
  query_command: TRACKING?

- id: ir_code
  type: integer
  range: [0, 65535]
  query_command: IR.CODE?

- id: smart_light
  type: enum
  values: [0, 1, 2]
  description: "0=OFF, 1=DCR, 2=LIGHT.SENSOR"
  query_command: SMART.LIGHT?

- id: schedule
  type: object
  description: Returns all schedule parameters for a slot
  query_command: SCHEDULE?

- id: schedule_action
  type: enum
  values: [0, 1, 2, 3]
  description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"
  query_command: SCHEDULE.ACTION?

- id: schedule_day
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  description: "0=MON, 1=TUE, ..."
  query_command: SCHEDULE.DAY?

- id: schedule_frequency
  type: enum
  values: [0, 1, 2, 3]
  description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"
  query_command: SCHEDULE.FREQUENCY?

- id: schedule_description
  type: string
  query_command: SCHEDULE.DESCRIPTION?

- id: allow_popup
  type: enum
  values: [0, 1]
  description: "0=NO, 1=YES"
  query_command: OSD.ALLOW.POPUP?
```

## Variables
```yaml
# Most settings exposed via Feedbacks are also settable via Actions.
# This section is N/A — all settable parameters are represented in Actions.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source
# The device sends ACK (@ACK), NAK (^NAK), error (!ERR), and response (:) messages
# but these are synchronous responses to commands, not independent events.
# NOTIFICATION.EMAIL command allows configuring email alerts for:
#   - POWER.STATE.CHANGED
#   - SOURCE.LOST
#   - SOURCE.SELECTED
# These are configured as actions, not unsolicited events.
```

## Macros
```yaml
# No explicit multi-step macros described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS-232 control requires Power Down Mode to be set to Networked Standby or Fast Startup. Writing to RS-232 while in Standby Mode alone will not work."
    source: "Section 3 RS232 Communication prerequisite"
# UNRESOLVED: power cycling sequences, fault recovery, and emergency shutdown procedures not documented
```

## Notes

**Command encoding:** All commands are ASCII text. Structure: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` where TERM is CR (0x0D), LF (0x0A), or semicolon. Case-insensitive, whitespace-tolerant.

**Response operators:** `=` write acknowledgement, `?` read name form, `#` read numeric form, `+` increment, `-` decrement, `:` response, `!ERR N` error, `@ACK` action acknowledged, `^NAK` negative acknowledged.

**Numeric command codes:** Each command also has a numeric code (e.g. BRIGHTNESS=200, DISPLAY.POWER=1408). Can be used interchangeably with named codes.

**Modifiers:** Commands support zone modifiers (ZONE.1=0, ZONE.2=1, CURRENT=255, ALL=254, etc.) and input modifiers. Many settings are per-zone.

**SSH authentication:** The default username is `admin`; the password is the value on the label on the back of the display. The source does not provide the actual password value.

<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented -->
<!-- UNRESOLVED: binary command encodings not used — all ASCII text protocol -->
<!-- UNRESOLVED: power cycling sequences, emergency shutdown, and fault recovery procedures not documented -->
<!-- UNRESOLVED: unsolicited event messages not described — only synchronous command responses -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/e5anepwg/planar-ultrares-w-series_rs232_user-manual.pdf
retrieved_at: 2026-10-07T12:42:45.973Z
last_checked_at: 2026-10-07T12:42:45.973Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:42:45.973Z
matched_actions: 199
action_count: 199
confidence: medium
summary: "All 199 action units match source command rows with correct shapes and transport; source has about 122 commands, so coverage ratio exceeds 0.9. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no unsolicited event descriptions in source"
- "power cycling sequences, fault recovery, and emergency shutdown procedures not documented"
- "firmware version compatibility ranges not stated"
- "fault behavior and error recovery sequences not documented"
- "binary command encodings not used — all ASCII text protocol"
- "power cycling sequences, emergency shutdown, and fault recovery procedures not documented"
- "unsolicited event messages not described — only synchronous command responses"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
