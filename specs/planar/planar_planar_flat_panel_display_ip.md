---
spec_id: admin/planar-ultrares-p-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes P Series Control Spec"
manufacturer: Planar
model_family: "Planar Flat Panel Display"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar Flat Panel Display"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:00.374Z
last_checked_at: 2026-06-02T17:23:46.730Z
generated_at: 2026-06-02T17:23:46.730Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no firmware version range stated; specific model variants (URP552 etc.) only confirmed via query response"
  - "discrete enums captured in Action params; no separate variable pool required."
  - "source documents notification events (POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED) but does not specify transport-level framing for unsolicited notifications."
  - "no multi-step sequences described in source."
  - "firmware version compatibility, voltage/power specs, fault recovery, and per-port credentials not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:46.730Z
  matched_actions: 106
  action_count: 106
  confidence: medium
  summary: "All 106 spec actions match literal opcodes in source; transport parameters verified; 1:1 coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar UltraRes P Series Control Spec

## Summary
Planar UltraRes P Series flat panel display. Spec covers RS-232 and TCP/SSH control using a shared OPCODE-based command protocol. Power-on requires Power Down Mode set to Networked Standby or Fast Startup.

<!-- UNRESOLVED: no firmware version range stated; specific model variants (URP552 etc.) only confirmed via query response -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet control type; SSH on port 22 also supported
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # Network: default admin/serial-number, user sets new password on first login. Serial: no auth procedure.
```

## Traits
```yaml
- powerable  # inferred from DISPLAY.POWER command
- routable   # inferred from SOURCE.SELECT / SOURCE.NEXT commands
- queryable  # inferred from extensive ? query commands
- levelable  # inferred from volume / brightness / audio controls
```

## Actions
```yaml
- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  command: "OSD.ALLOW.POPUP={value}[CR]"
  params:
    - name: value
      type: enum
      values: [NO, YES]
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ASPECT({zone})={value}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
- id: audio_input_query
  label: Audio Input (query)
  kind: query
  command: "AUDIO.INPUT?[CR]"
  params: []
- id: audio_zone
  label: Audio Select Zone
  kind: action
  command: "AUDIO.ZONE={zone}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
- id: audio_settings
  label: Audio Settings
  kind: action
  command: "AUDIO.SETTINGS={zone} {volume} {treble} {bass} {balance} {mute} {speakers}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
    - name: volume
      type: integer
    - name: treble
      type: integer
    - name: bass
      type: integer
    - name: balance
      type: integer
    - name: mute
      type: enum
      values: [OFF, ON]
    - name: speakers
      type: enum
      values: [OFF, ON]
- id: auto_power_on
  label: Auto Power On
  kind: action
  command: "AUTO.ON={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON, PREVIOUS.STATE]
- id: auto_scan_sources
  label: Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]
- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={level}[CR]"
  params:
    - name: level
      type: integer
- id: audio_balance
  label: Balance
  kind: action
  command: "AUDIO.BALANCE={value}[CR]"
  params:
    - name: value
      type: integer
- id: audio_bass
  label: Bass
  kind: action
  command: "AUDIO.BASS={value}[CR]"
  params:
    - name: value
      type: integer
- id: blank_screen_color
  label: Blank Screen Color
  kind: action
  command: "BLANK.COLOR={value}[CR]"
  params:
    - name: value
      type: enum
      values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]
- id: brightness
  label: Brightness
  kind: action
  command: "BRIGHTNESS({zone})={level}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: level
      type: integer
- id: color
  label: Color
  kind: action
  command: "COLOR({zone})={level}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: level
      type: integer
- id: color_space
  label: Color Space
  kind: action
  command: "COLORSPACE({zone},{type})={value}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: type
      type: enum
      values: [SETTING, ACTUAL]
    - name: value
      type: enum
      values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]
- id: color_subsampling_query
  label: Color Subsampling (query)
  kind: query
  command: "COLOR.SUBSAMPLING({zone})?[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
- id: color_temperature
  label: Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE({zone})={value}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: ["3200K", 5500K, 6500K, 7500K, 9300K, NATIVE]
- id: contrast
  label: Contrast
  kind: action
  command: "CONTRAST({zone})={level}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: level
      type: integer
- id: current_zone
  label: Current Zone
  kind: action
  command: "CURRENT.ZONE={zone}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
- id: current_zone_layout_query
  label: Current Zone Layout (query)
  kind: query
  command: "CURRENT.ZONE.LAYOUT?[CR]"
  params: []
- id: ipv4_gateway
  label: Default Gateway
  kind: action
  command: "IPV4.GATEWAY({mode})=\"{address}\"[CR]"
  params:
    - name: mode
      type: enum
      values: [STATIC]
    - name: address
      type: string
- id: network_dhcp
  label: DHCP
  kind: action
  command: "NETWORK.DHCP={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: display_name
  label: Display Name
  kind: action
  command: "DISPLAY.NAME=\"{name}\"[CR]"
  params:
    - name: name
      type: string
- id: display_power
  label: Display Power
  kind: action
  command: "DISPLAY.POWER={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: dp_type
  label: DisplayPort 1 Type
  kind: action
  command: "DP.TYPE={value}[CR]"
  params:
    - name: value
      type: enum
      values: ["1.2", "1.4", "2.0"]
- id: dp2_type
  label: DisplayPort 2 Type
  kind: action
  command: "DP2.TYPE={value}[CR]"
  params:
    - name: value
      type: enum
      values: ["1.2", "1.4", "2.0"]
- id: network_dns1
  label: DNS Server 1
  kind: action
  command: "NETWORK.DNS1({mode})=\"{address}\"[CR]"
  params:
    - name: mode
      type: enum
      values: [STATIC]
    - name: address
      type: string
- id: network_dns2
  label: DNS Server 2
  kind: action
  command: "NETWORK.DNS2({mode})=\"{address}\"[CR]"
  params:
    - name: mode
      type: enum
      values: [STATIC]
    - name: address
      type: string
- id: edid_timing
  label: EDID Timing
  kind: action
  command: "EDID.TIMING({input},{param}){value}[CR]"
  params:
    - name: input
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
    - name: param
      type: enum
      values: [UPDATE, FACTORY, TYPE]
    - name: value
      type: string
- id: edid_selected_connector
  label: EDID Zone
  kind: action
  command: "EDID.SELECTEDCONNECTOR={input}[CR]"
  params:
    - name: input
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: led_enable
  label: Enable Status LED
  kind: action
  command: "LED.ENABLE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})[CR]"
  params:
    - name: scope
      type: enum
      values: [USER, FACTORY1]
- id: firmware_update
  label: Firmware Update
  kind: action
  command: "FIRMWARE.UPDATE[CR]"
  params: []
- id: gain
  label: Gain
  kind: action
  command: "GAIN({zone},{color})={r} {g} {b}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
- id: gamma
  label: Gamma
  kind: action
  command: "GAMMA({zone})={value}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9"]
- id: cec_enable
  label: HDMI CEC
  kind: action
  command: "CEC.ENABLE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: cec_standby
  label: HDMI CEC Standby
  kind: action
  command: "CEC.STANDBY={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: signal_info_query
  label: Image Information (query)
  kind: query
  command: "SIGNAL.INFO({zone},{param})?[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
    - name: param
      type: enum
      values: [HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS]
- id: ipv4_address
  label: IP Address
  kind: action
  command: "IPV4.ADDRESS({mode})=\"{address}\"[CR]"
  params:
    - name: mode
      type: enum
      values: [STATIC]
    - name: address
      type: string
- id: ir_code
  label: IR Code
  kind: action
  command: "IR.CODE={value}[CR]"
  params:
    - name: value
      type: integer
- id: ir_lock
  label: IR Remote Lock
  kind: action
  command: "IR.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: key
  label: Key
  kind: action
  command: "KEY={key}[CR]"
  params:
    - name: key
      type: string
- id: key_lock
  label: Keypad Lock
  kind: action
  command: "KEY.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: lan_lock
  label: LAN Lock
  kind: action
  command: "LAN.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: language
  label: Language
  kind: action
  command: "LANGUAGE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
- id: layout
  label: Layout
  kind: action
  command: "LAYOUT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]
- id: network_mac_query
  label: MAC Address (query)
  kind: query
  command: "NETWORK.MAC?[CR]"
  params: []
- id: osd_position
  label: Menu Position
  kind: action
  command: "OSD.POSITION={value}[CR]"
  params:
    - name: value
      type: enum
      values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]
- id: model_id_query
  label: Model ID (query)
  kind: query
  command: "MODEL.ID?[CR]"
  params: []
- id: model_series_query
  label: Model Series (query)
  kind: query
  command: "MODEL.SERIES?[CR]"
  params: []
- id: multi_view
  label: Multi-Source View
  kind: action
  command: "MULTI.VIEW={value}[CR]"
  params:
    - name: value
      type: enum
      values: [SINGLE, DUAL, QUAD, PIP]
- id: audio_mute
  label: Mute
  kind: action
  command: "AUDIO.MUTE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: network_commands
  label: Network Commands Enable
  kind: action
  command: "COMMAND.ENABLE(NETWORK)={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: network_ping
  label: Network Ping
  kind: action
  command: "NETWORK.PING=\"{host}\"[CR]"
  params:
    - name: host
      type: string
- id: source_next
  label: Next Source
  kind: action
  command: "SOURCE.NEXT({zone})[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, CURRENT]
- id: notification_email
  label: Notification Event
  kind: action
  command: "NOTIFICATION.EMAIL({event})={enable},\"{recipients}\",\"{message}\"[CR]"
  params:
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
- id: network_ntp_server
  label: NTP Server
  kind: action
  command: "NETWORK.NTPSERVER=\"{server}\"[CR]"
  params:
    - name: server
      type: string
- id: offset
  label: Offset
  kind: action
  command: "OFFSET({zone},{color})={r} {g} {b}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: r
      type: integer
    - name: g
      type: integer
    - name: b
      type: integer
- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE[CR]"
  params: []
- id: orientation
  label: OSD Rotation
  kind: action
  command: "ORIENTATION={value}[CR]"
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]
- id: osd_status_query
  label: OSD Status (query)
  kind: query
  command: "OSD.STATUS?[CR]"
  params: []
- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, 240.SECONDS]
- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={value}[CR]"
  params:
    - name: value
      type: integer
- id: overscan
  label: Overscan
  kind: action
  command: "OVERSCAN({zone})={value}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
- id: pip_size
  label: PIP Size
  kind: action
  command: "PIP.SIZE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [SMALL, MEDIUM, LARGE]
- id: pip_swap
  label: PIP Swap
  kind: action
  command: "PIP.SWAP[CR]"
  params: []
- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: power_down_mode
  label: Power Down Mode
  kind: action
  command: "POWER.DOWN.MODE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]
- id: power_save_delay
  label: Power Saving Delay
  kind: action
  command: "POWER.SAVE.DELAY={value}[CR]"
  params:
    - name: value
      type: enum
      values: ["1.MINUTE", "5.MINUTES", "15.MINUTES", "30.MINUTES", "60.MINUTES"]
- id: power_save_mode
  label: Power Saving Mode
  kind: action
  command: "POWER.SAVE.MODE={value}[CR]"
  params:
    - name: value
      type: enum
      values: [Disable, Power.Down, Wake.On.Signal]
- id: preset_count_query
  label: Preset Count (query)
  kind: query
  command: "PRESET.COUNT?[CR]"
  params: []
- id: preset_delete
  label: Preset Delete
  kind: action
  command: "PRESET.DELETE({slot})[CR]"
  params:
    - name: slot
      type: integer
- id: preset_full_query
  label: Preset Full (query)
  kind: query
  command: "PRESET.FULL({slot})?[CR]"
  params:
    - name: slot
      type: integer
- id: preset_list_query
  label: Preset List (query)
  kind: query
  command: "PRESET.LIST(FIRST)?[CR]"
  params: []
- id: preset_max_query
  label: Preset Max (query)
  kind: query
  command: "PRESET.MAX?[CR]"
  params: []
- id: preset_name
  label: Preset Name
  kind: action
  command: "PRESET.NAME({slot})=\"{name}\"[CR]"
  params:
    - name: slot
      type: integer
    - name: name
      type: string
- id: preset_recall
  label: Preset Recall
  kind: action
  command: "PRESET.RECALL({slot})[CR]"
  params:
    - name: slot
      type: integer
- id: preset_save
  label: Preset Save
  kind: action
  command: "PRESET.SAVE({slot})[CR]"
  params:
    - name: slot
      type: integer
- id: system_reboot
  label: Reboot
  kind: action
  command: "SYSTEM.REBOOT[CR]"
  params: []
- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS({zone})[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
- id: rs232_lock
  label: RS232 Lock
  kind: action
  command: "RS232.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: schedule
  label: Schedule
  kind: action
  command: "SCHEDULE({slot},{param})={value}[CR]"
  params:
    - name: slot
      type: integer
    - name: param
      type: enum
      values: [FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE]
    - name: value
      type: integer
- id: schedule_action
  label: Schedule Action
  kind: action
  command: "SCHEDULE.ACTION({slot})={value}[CR]"
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values: [TURN.ON, TURN.OFF, RECALL, PANEL.BRIGHTNESS]
- id: schedule_day
  label: Schedule Day
  kind: action
  command: "SCHEDULE.DAY({slot})={value}[CR]"
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
- id: schedule_description_query
  label: Schedule Description (query)
  kind: query
  command: "SCHEDULE.DESCRIPTION({slot})?[CR]"
  params:
    - name: slot
      type: integer
- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({slot})={value}[CR]"
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]
- id: serial_number_query
  label: Serial Number (query)
  kind: query
  command: "SERIAL.NUMBER?[CR]"
  params: []
- id: sharpness
  label: Sharpness
  kind: action
  command: "SHARPNESS={value}[CR]"
  params:
    - name: value
      type: integer
- id: source_message_query
  label: Source Message (query)
  kind: query
  command: "SOURCE.MESSAGE({zone})?[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
- id: source_select
  label: Source Select
  kind: action
  command: "SOURCE.SELECT({zone})={input}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ZONE.1.SECONDARY, ALL, CURRENT]
    - name: input
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, NONE, USBC]
- id: splash_screen
  label: Splash Screen
  kind: action
  command: "SPLASH.SCREEN={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  command: "IPV4.NETMASK({mode})=\"{mask}\"[CR]"
  params:
    - name: mode
      type: enum
      values: [STATIC]
    - name: mask
      type: string
- id: system_state_query
  label: System State (query)
  kind: query
  command: "SYSTEM.STATE?[CR]"
  params: []
- id: smtp_test
  label: Test Email
  kind: action
  command: "NETWORK.SMTP.TEST({event})[CR]"
  params:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED]
- id: test_pattern
  label: Test Pattern
  kind: action
  command: "PATTERN({pattern})[CR]"
  params:
    - name: pattern
      type: enum
      values: [NONE, BLACK, WHITE, GRAY, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW]
- id: time
  label: Time
  kind: action
  command: "TIME({param})={value}[CR]"
  params:
    - name: param
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE]
    - name: value
      type: integer
- id: time_day_query
  label: Time - Day (query)
  kind: query
  command: "TIME.DAY?[CR]"
  params: []
- id: time_month
  label: Time - Month
  kind: action
  command: "TIME.MONTH={value}[CR]"
  params:
    - name: value
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
- id: time_string_query
  label: Time - String (query)
  kind: query
  command: "TIME.STRING?[CR]"
  params: []
- id: timezone
  label: Time Zone
  kind: action
  command: "TIMEZONE={value}[CR]"
  params:
    - name: value
      type: string
- id: tint
  label: Tint
  kind: action
  command: "TINT({zone})={level}[CR]"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: level
      type: integer
- id: audio_treble
  label: Treble
  kind: action
  command: "AUDIO.TREBLE={value}[CR]"
  params:
    - name: value
      type: integer
- id: usba_lock
  label: USB-A Lock
  kind: action
  command: "USBA.LOCK={value}[CR]"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: network_ntp
  label: Use Network Time
  kind: action
  command: "NETWORK.NTP={value}[CR]"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: build_info_query
  label: Version Info (query)
  kind: query
  command: "BUILD.INFO({param})?[CR]"
  params:
    - name: param
      type: enum
      values: [VERSION.VP, VERSION.SUBMCU, VERSION.NETUART]
- id: audio_volume
  label: Volume
  kind: action
  command: "AUDIO.VOLUME={value}[CR]"
  params:
    - name: value
      type: integer
```

## Feedbacks
```yaml
- id: ack
  type: enum
  values: [ACK, NAK]
- id: err_code
  type: enum
  values: ["ERR 1", "ERR 2", "ERR 3", "ERR 4", "ERR 5", "ERR 6"]
- id: system_state
  type: enum
  values: [STANDBY, ON]
- id: display_power
  type: enum
  values: [OFF, ON]
- id: network_ping_result
  type: enum
  values: [SUCCESS, FAILED]
```

## Variables
```yaml
# UNRESOLVED: discrete enums captured in Action params; no separate variable pool required.
```

## Events
```yaml
# UNRESOLVED: source documents notification events (POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED) but does not specify transport-level framing for unsolicited notifications.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # FACTORY1 resets network settings, EDID customizations and presets
interlocks: []
# Power Down Mode must be set to Networked Standby or Fast Startup before RS232 commands are accepted.
```

## Notes
RS-232 and TCP/SSH share the same command set; both support all opcodes above. TCP default port 23 (Telnet), SSH port 22. SSH user `root`, password set on first login via Remote Monitoring Software. Terminator: CR (0x0D), LF (0x0A), or `;`. Operators: `=` write, `?` read name, `#` read numeric, `+`/`-` inc/dec, `!` action. Numeric command codes (e.g. 200 = BRIGHTNESS) are aliases for named opcodes.

<!-- UNRESOLVED: firmware version compatibility, voltage/power specs, fault recovery, and per-port credentials not stated in source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:00.374Z
last_checked_at: 2026-06-02T17:23:46.730Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:46.730Z
matched_actions: 106
action_count: 106
confidence: medium
summary: "All 106 spec actions match literal opcodes in source; transport parameters verified; 1:1 coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no firmware version range stated; specific model variants (URP552 etc.) only confirmed via query response"
- "discrete enums captured in Action params; no separate variable pool required."
- "source documents notification events (POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED) but does not specify transport-level framing for unsolicited notifications."
- "no multi-step sequences described in source."
- "firmware version compatibility, voltage/power specs, fault recovery, and per-port credentials not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
