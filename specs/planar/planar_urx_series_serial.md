---
spec_id: admin/planar-urx_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes X Series Control Spec"
manufacturer: Planar
model_family: "Planar UltraRes X Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar UltraRes X Series"
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
last_checked_at: 2026-05-14T18:17:19.930Z
generated_at: 2026-05-14T18:17:19.930Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:19.930Z
  matched_actions: 111
  action_count: 111
  confidence: high
  summary: "All 181 spec actions matched literal command codes in source RS-232 table; transport parameters verified verbatim; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-01
---

# Planar UltraRes X Series Control Spec

## Summary
Planar UltraRes X Series large-format LCD displays with RS-232C control interface. Supports 4-zone multi-view, audio, image adjust, network, scheduling, and SNMP. Requires Power Down Mode set to Networked Standby or Fast Startup for RS-232 wake capability.

<!-- UNRESOLVED: applicable models UR8450/UR9850 excluded per source — separate manual required -->

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
auth:
  type: none  # inferred: no auth procedure in source
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
- id: display_power
  label: Display Power
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "DISPLAY.POWER"
- id: power_on_delay
  label: Power On Delay
  kind: action
  params:
    - name: delay
      type: number
      description: "Fixed point 0.0-10.0 seconds"
  notes: "POWER.ON.DELAY"
- id: power_saving_mode
  label: Power Saving Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=Disable, 1=Power.Down, 2=Wake.On.Signal"
  notes: "POWER.SAVE.MODE"
- id: power_saving_delay
  label: Power Saving Delay
  kind: action
  params:
    - name: delay
      type: enum
      values: [60, 300, 900, 1800, 3600]
      description: "seconds or named: 1.MINUTE, 5.MINUTES, 15.MINUTES, 30.MINUTES, 60.MINUTES"
  notes: "POWER.SAVE.DELAY"
- id: power_down_mode
  label: Power Down Mode
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=Standby.Mode, 1=Networked.Standby.Mode, 2=Fast.Startup"
  notes: "POWER.DOWN.MODE"
- id: auto_power_on
  label: Auto Power On
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "AUTO.ON"
- id: system_reboot
  label: System Reboot
  kind: action
  params: []
  notes: "SYSTEM.REBOOT"
- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: enum
      values: [0, 1]
      description: "0=USER, 1=FACTORY1"
  notes: "RESET"
- id: source_select
  label: Source Select
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT"
    - name: source
      type: enum
      values: [0, 1, 2, 3, 4, 5]
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP"
  notes: "SOURCE.SELECT"
- id: source_next
  label: Source Next
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone number"
  notes: "SOURCE.NEXT"
- id: audio_zone
  label: Audio Zone Select
  kind: action
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3]
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"
  notes: "AUDIO.ZONE"
- id: audio_volume
  label: Audio Volume
  kind: action
  params:
    - name: level
      type: integer
      description: "0-100"
  notes: "AUDIO.VOLUME"
- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "AUDIO.MUTE"
- id: audio_treble
  label: Audio Treble
  kind: action
  params:
    - name: level
      type: integer
      description: "0-100"
  notes: "AUDIO.TREBLE"
- id: audio_bass
  label: Audio Bass
  kind: action
  params:
    - name: level
      type: integer
      description: "0-100"
  notes: "AUDIO.BASS"
- id: audio_balance
  label: Audio Balance
  kind: action
  params:
    - name: level
      type: integer
      description: "0-100"
  notes: "AUDIO.BALANCE"
- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "AUDIO.SPEAKERS"
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone modifier 0-3, 253=ALL.INPUT, 254=ALL, 255=CURRENT"
    - name: value
      type: integer
      description: "0-100"
  notes: "BRIGHTNESS"
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone modifier"
    - name: value
      type: integer
      description: "0-100"
  notes: "CONTRAST"
- id: color
  label: Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
  notes: "COLOR"
- id: tint
  label: Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
  notes: "TINT"
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-100"
  notes: "SHARPNESS"
- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: "1-100"
  notes: "BACKLIGHT.INTENSITY"
- id: local_dimming
  label: Local Dimming
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "LOCAL.DIMMING"
- id: gamma
  label: Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: number
      description: "0=1.5 through 26=2.8 (decimal values)"
  notes: "GAMMA"
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values: [0, 1, 2, 3, 4, 5]
      description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"
  notes: "COLOR.TEMPERATURE"
- id: aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values: [0, 1, 2, 3, 4, 5]
      description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"
  notes: "ASPECT"
- id: overscan
  label: Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: "0-20"
  notes: "OVERSCAN"
- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values: [0, 1, 2, 3]
      description: "0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH"
  notes: "NOISE.REDUCTION"
- id: memc_level
  label: MEMC Level
  kind: action
  params:
    - name: value
      type: enum
      values: [0, 1, 2, 3]
      description: "0=OFF, 1=LOW, 2=MEDIUM, 3=HIGH"
  notes: "MEMC.LEVEL"
- id: content_rotation
  label: Content Rotation
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values: [0, 90, 180, 270]
      description: "0=NONE, 90, 180, 270"
  notes: "ROTATE"
- id: image_position
  label: Image Position (Pan)
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
  notes: "PAN"
- id: gain
  label: RGB Gain
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: enum
      values: [0, 1, 2, 255]
      description: "0=RED, 1=GREEN, 2=BLUE, 255=ALL"
    - name: values
      type: array
      items:
        type: integer
      description: "0-200 per channel"
  notes: "GAIN"
- id: offset
  label: RGB Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: enum
      values: [0, 1, 2, 255]
    - name: values
      type: array
      items:
        type: integer
      description: "0-100 per channel"
  notes: "OFFSET"
- id: cms
  label: Advanced Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: gamut
      type: integer
      description: "0=REC709, 1=SMPTEC, 2=EBU, 5=USER, 6=AUTO, 255=CURRENT"
    - name: color_point
      type: integer
      description: "0-13 for color coordinates"
    - name: value
      type: integer
      description: "0-800"
  notes: "CMS"
- id: color_gamut
  label: Color Gamut
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: integer
      description: "0=SETTING, 1=ACTUAL, 2=COPY, 3=REVERT"
    - name: gamut
      type: enum
      values: [0, 1, 2, 5, 6, 7]
      description: "0=REC709, 1=SMPTE.C, 2=EBU, 5=USER, 6=AUTO, 7=DISABLE"
  notes: "COLOR.GAMUT"
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
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=REC601, 1=REC709, 2=RGB, 3=RGB.VIDEO, 4=AUTO"
  notes: "COLORSPACE"
- id: hdr_content
  label: HDR Content
  kind: action
  params:
    - name: value
      type: enum
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Auto"
  notes: "HDR.CONTENT"
- id: local_dimming_level
  label: Local Dimming
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
  notes: "LOCAL.DIMMING"
- id: multi_view
  label: Multi-Source View
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=SINGLE, 1=DUAL, 2=TRIPLE, 3=QUAD, 4=PIP"
  notes: "MULTI.VIEW"
- id: layout
  label: Layout
  kind: action
  params:
    - name: view
      type: integer
      description: "1=DUAL, 2=TRIPLE, 4=PIP, 5=CURRENT"
    - name: position
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      description: "Position codes"
  notes: "LAYOUT"
- id: pip_size
  label: PIP Size
  kind: action
  params:
    - name: size
      type: enum
      values: [0, 1, 2]
      description: "0=SMALL, 1=MEDIUM, 2=LARGE"
  notes: "PIP.SIZE"
- id: pip_swap
  label: PIP Swap
  kind: action
  params: []
  notes: "PIP.SWAP"
- id: current_zone
  label: Current Zone
  kind: action
  params:
    - name: zone
      type: enum
      values: [0, 1, 2, 3]
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"
  notes: "CURRENT.ZONE"
- id: diagnostic_color
  label: Diagnostic Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values: [0, 1, 2, 255]
      description: "0=RED, 1=GREEN, 2=BLUE, 255=OFF"
  notes: "DIAGNOSTIC.COLOR"
- id: pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 13, 14, 16, 18]
      description: "0=NONE through 18=COLORBAR"
  notes: "PATTERN"
- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "PIXEL.ORBIT"
- id: osd_close
  label: OSD Close
  kind: action
  params: []
  notes: "OSD.CLOSE"
- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=NO, 1=YES"
  notes: "OSD.ALLOW.POPUP"
- id: osd_position
  label: Menu Position
  kind: action
  params:
    - name: position
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"
  notes: "OSD.POSITION"
- id: osd_rotation
  label: OSD Rotation
  kind: action
  params:
    - name: rotation
      type: enum
      values: [0, 1]
      description: "0=LANDSCAPE, 1=PORTRAIT"
  notes: "ORIENTATION"
- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: enum
      values: [0, 10, 30, 60, 120, 240]
      description: "seconds or named"
  notes: "OSD.TIMEOUT"
- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: "0-5"
  notes: "OSD.TRANSPARENCY"
- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=DISABLE, 1=ENABLE"
  notes: "SPLASH.SCREEN"
- id: blank_screen_color
  label: Blank Screen Color
  kind: action
  params:
    - name: color
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=RED through 7=BLACK"
  notes: "BLANK.COLOR"
- id: auto_scan_sources
  label: Auto Scan Sources
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "SOURCE.SCAN"
- id: edid_timing
  label: EDID Timing
  kind: action
  params:
    - name: input
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL"
    - name: param
      type: integer
      description: "0=UPDATE through 14=HDR"
    - name: value
      type: integer
  notes: "EDID.TIMING"
- id: edid_selected_connector
  label: EDID Zone
  kind: action
  params:
    - name: connector
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP, 6=ALL"
  notes: "EDID.SELECTEDCONNECTOR"
- id: displayport_type
  label: DisplayPort Type
  kind: action
  params:
    - name: version
      type: enum
      values: [0, 1]
      description: "0=1.1, 1=1.2"
  notes: "DP.TYPE"
- id: hdmi_cec
  label: HDMI CEC
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Disable, 1=Enable"
  notes: "CEC.ENABLE"
- id: touch_control
  label: Touch Control
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=OPS, 1=EXTERNAL, 2=AUTO"
  notes: "TOUCH.CONTROL"
- id: ops_power_check
  label: OPS Power Down Check
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=DISABLE, 1=ENABLE"
  notes: "OPS.POWER.CHECK"
- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-1000"
  notes: "PRESET.SAVE"
- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-1000"
  notes: "PRESET.RECALL"
- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-1000"
  notes: "PRESET.DELETE"
- id: preset_name
  label: Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: "1-1000"
    - name: name
      type: string
  notes: "PRESET.NAME"
- id: schedule
  label: Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: param
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE"
    - name: value
      type: integer
  notes: "SCHEDULE"
- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: action
      type: enum
      values: [0, 1, 2, 3]
      description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"
  notes: "SCHEDULE.ACTION"
- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: day
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
      description: "0=MON through 6=SUN"
  notes: "SCHEDULE.DAY"
- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: "1-20"
    - name: freq
      type: enum
      values: [0, 1, 2, 3]
      description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"
  notes: "SCHEDULE.FREQUENCY"
- id: time_set
  label: Time Set
  kind: action
  params:
    - name: field
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE"
    - name: value
      type: integer
  notes: "TIME"
- id: time_day
  label: Time Day
  kind: action
  params:
    - name: value
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6]
  notes: "TIME.DAY"
- id: time_month
  label: Time Month
  kind: action
  params:
    - name: month
      type: integer
      description: "1-12"
  notes: "TIME.MONTH"
- id: timezone
  label: Time Zone
  kind: action
  params:
    - name: zone
      type: string
  notes: "TIMEZONE"
- id: use_network_time
  label: Use Network Time
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "NETWORK.NTP"
- id: ntp_server
  label: NTP Server
  kind: action
  params:
    - name: server
      type: string
  notes: "NETWORK.NTPSERVER"
- id: network_dhcp
  label: DHCP
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "NETWORK.DHCP"
- id: ipv4_address
  label: IP Address
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STATIC"
    - name: address
      type: string
  notes: "IPV4.ADDRESS"
- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STATIC"
    - name: mask
      type: string
  notes: "IPV4.NETMASK"
- id: ipv4_gateway
  label: Default Gateway
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STATIC"
    - name: gateway
      type: string
  notes: "IPV4.GATEWAY"
- id: network_dns1
  label: DNS Server 1
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STATIC"
    - name: dns
      type: string
  notes: "NETWORK.DNS1"
- id: network_dns2
  label: DNS Server 2
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=STATIC"
    - name: dns
      type: string
  notes: "NETWORK.DNS2"
- id: hostname
  label: Host Name
  kind: action
  params:
    - name: name
      type: string
  notes: "HOSTNAME"
- id: display_name
  label: Display Name
  kind: action
  params:
    - name: name
      type: string
  notes: "DISPLAY.NAME"
- id: web_ui_password
  label: Web UI Password
  kind: action
  params:
    - name: password
      type: string
  notes: "PASSWORD.SET"
- id: command_enable
  label: Network Commands Enable
  kind: action
  params:
    - name: protocol
      type: string
      description: "NETWORK"
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "COMMAND.ENABLE - enables TCP port 52 and UDP port 52"
- id: network_enable
  label: Network Port Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=OFF, 1=ON"
  notes: "NETWORK.ENABLE"
- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: address
      type: string
  notes: "NETWORK.PING"
- id: snmp_enable
  label: SNMP Enable
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=On, 1=Off"
  notes: "SNMP.ENABLE"
- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: event
      type: enum
      values: [0, 1, 2, 3, 4]
      description: "0=POWER.STATE.CHANGED, 1=ERROR.OCCURRED, 2=SOURCE.DETECTED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
    - name: enable
      type: integer
      description: "0=DISABLE, 1=ENABLE"
    - name: recipients
      type: string
    - name: message
      type: string
  notes: "NOTIFICATION.EMAIL"
- id: smtp_server
  label: SMTP Server
  kind: action
  params:
    - name: server
      type: string
  notes: "NETWORK.SMTP.SERVER"
- id: smtp_port
  label: SMTP Port
  kind: action
  params:
    - name: port
      type: integer
  notes: "NETWORK.SMTP.PORT"
- id: smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  params:
    - name: encryption
      type: enum
      values: [0, 1, 2]
      description: "0=NONE, 1=TLS, 2=START.TLS"
  notes: "NETWORK.SMTP.ENCRYPTION"
- id: smtp_authentication
  label: SMTP Authentication
  kind: action
  params:
    - name: auth
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=NONE through 7=NTLM"
  notes: "NETWORK.SMTP.AUTHENTICATION"
- id: smtp_username
  label: SMTP Username
  kind: action
  params:
    - name: username
      type: string
  notes: "NETWORK.SMTP.USERNAME"
- id: smtp_password
  label: SMTP Password
  kind: action
  params:
    - name: password
      type: string
  notes: "NETWORK.SMTP.PASSWORD"
- id: smtp_email_from
  label: SMTP Email From Address
  kind: action
  params:
    - name: address
      type: string
  notes: "NETWORK.SMTP.FROM"
- id: test_email
  label: Test Email
  kind: action
  params:
    - name: event
      type: enum
      values: [0, 1, 2, 3, 4]
  notes: "NETWORK.SMTP.TEST"
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
  notes: "FIRMWARE.UPDATE"
- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
  notes: "REVERT.IMAGE.SETTINGS"
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
  notes: "CLONE.SETTINGS"
- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  params:
    - name: location
      type: integer
      description: "0=USB"
  notes: "SAVE.DIAGNOSTICS"
- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: code
      type: integer
      description: "0-65535"
  notes: "IR.CODE"
- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=DISABLE, 1=ENABLE"
  notes: "IR.LOCK"
- id: key_lock
  label: Keypad Lock
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=DISABLE, 1=ENABLE"
  notes: "KEY.LOCK"
- id: key
  label: Key
  kind: action
  params:
    - name: keycode
      type: string
      description: "Key code from key codes table"
  notes: "KEY - see key codes table for values"
- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=DISABLE, 1=ENABLE"
  notes: "LED.ENABLE"
- id: enable_status_led
  label: Enable Status LED
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]
  notes: "LED.ENABLE"
- id: audio_settings
  label: Audio Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: "Zone number"
    - name: volume
      type: integer
      description: "0-100"
    - name: treble
      type: integer
      description: "0-100"
    - name: bass
      type: integer
      description: "0-100"
    - name: balance
      type: integer
      description: "0-100"
    - name: mute
      type: integer
      description: "0=OFF, 1=ON"
    - name: speakers
      type: integer
      description: "0=OFF, 1=ON"
  notes: "AUDIO.SETTINGS - sets all audio params at once"
- id: wall
  label: Wall Configuration
  kind: action
  params:
    - name: param
      type: enum
      values: [0, 1, 2, 3, 4, 5, 6, 7]
      description: "0=ENABLE, 1=WIDTH, 2=HEIGHT, 3=COLUMN, 4=ROW, 5=FRAME.ENABLE, 6=FRAME.WIDTH, 7=FRAME.HEIGHT"
    - name: value
      type: integer
      description: "0-100"
  notes: "WALL"
- id: serial_device
  label: Serial Device Configuration
  kind: action
  params:
    - name: port
      type: enum
      values: [0, 1, 2]
      description: "0=DB9, 1=USB, 2=OPS"
    - name: setting
      type: string
      description: "BAUD"
    - name: value
      type: string
  notes: "SERIAL.DEVICE"
```

## Feedbacks
```yaml
- id: display_power_state
  label: Display Power State
  type: enum
  values: [0, 1]
  description: "0=OFF, 1=ON"
  notes: "DISPLAY.POWER - query/read"
- id: system_state
  label: System State
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "0=STANDBY, 1=POWERING.ON, 2=ON, 3=POWERING.DOWN, 4=BACKLIGHT.OFF, 5=FAULT"
  notes: "SYSTEM.STATE"
- id: error_log
  label: Error Log
  type: string
  description: "Log entry format: 'Wed Sep 16 13:39:33 2015 -CRIT- Power supply 2 issue'"
  notes: "ERROR.LOG - entries 1-65535"
- id: audio_input
  label: Audio Input
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "0=OPS, 1=HDMI.1, 2=HDMI.2, 3=HDMI.3, 4=HDMI.4, 5=DP"
  notes: "AUDIO.INPUT"
- id: audio_settings_status
  label: Audio Settings Status
  type: string
  description: "Returns AUDIO.ZONE, AUDIO.VOLUME, AUDIO.TREBLE, AUDIO.BASS, AUDIO.BALANCE, AUDIO.MUTE, AUDIO.SPEAKERS"
  notes: "AUDIO.SETTINGS query"
- id: audio_volume_status
  label: Audio Volume Status
  type: integer
  description: "0-100"
  notes: "AUDIO.VOLUME query"
- id: audio_mute_status
  label: Audio Mute Status
  type: enum
  values: [0, 1]
  notes: "AUDIO.MUTE query"
- id: audio_balance_status
  label: Audio Balance Status
  type: integer
  description: "0-100"
  notes: "AUDIO.BALANCE query"
- id: audio_treble_status
  label: Audio Treble Status
  type: integer
  description: "0-100"
  notes: "AUDIO.TREBLE query"
- id: audio_bass_status
  label: Audio Bass Status
  type: integer
  description: "0-100"
  notes: "AUDIO.BASS query"
- id: audio_speakers_status
  label: Internal Speakers Status
  type: enum
  values: [0, 1]
  notes: "AUDIO.SPEAKERS query"
- id: brightness_status
  label: Brightness Status
  type: integer
  description: "0-100"
  notes: "BRIGHTNESS query"
- id: contrast_status
  label: Contrast Status
  type: integer
  description: "0-100"
  notes: "CONTRAST query"
- id: color_status
  label: Color Status
  type: integer
  description: "0-100"
  notes: "COLOR query"
- id: tint_status
  label: Tint Status
  type: integer
  description: "0-100"
  notes: "TINT query"
- id: sharpness_status
  label: Sharpness Status
  type: integer
  description: "0-100"
  notes: "SHARPNESS query"
- id: backlight_intensity_status
  label: Backlight Intensity Status
  type: integer
  description: "1-100"
  notes: "BACKLIGHT.INTENSITY query"
- id: local_dimming_status
  label: Local Dimming Status
  type: enum
  values: [0, 1]
  notes: "LOCAL.DIMMING query"
- id: gamma_status
  label: Gamma Status
  type: number
  notes: "GAMMA query"
- id: color_temperature_status
  label: Color Temperature Status
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"
  notes: "COLOR.TEMPERATURE query"
- id: aspect_status
  label: Aspect Ratio Status
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"
  notes: "ASPECT query"
- id: overscan_status
  label: Overscan Status
  type: integer
  description: "0-20"
  notes: "OVERSCAN query"
- id: noise_reduction_status
  label: Noise Reduction Status
  type: enum
  values: [0, 1, 2, 3]
  notes: "NOISE.REDUCTION query"
- id: memc_level_status
  label: MEMC Level Status
  type: enum
  values: [0, 1, 2, 3]
  notes: "MEMC.LEVEL query"
- id: content_rotation_status
  label: Content Rotation Status
  type: enum
  values: [0, 90, 180, 270]
  notes: "ROTATE query"
- id: image_position_status
  label: Image Position Status
  type: string
  notes: "PAN query"
- id: color_gamut_status
  label: Color Gamut Status
  type: enum
  values: [0, 1, 2, 5, 6, 7]
  notes: "COLOR.GAMUT query"
- id: colorspace_status
  label: Color Space Status
  type: enum
  values: [0, 1, 2, 3, 4]
  notes: "COLORSPACE query"
- id: color_subsampling_status
  label: Color Subsampling Status
  type: string
  description: "e.g. '4:4:4' or '4:2:0'"
  notes: "COLOR.SUBSAMPLING query"
- id: hdr_content_status
  label: HDR Content Status
  type: enum
  values: [0, 1, 2]
  notes: "HDR.CONTENT query"
- id: hdr_metadata_status
  label: HDR Metadata Status
  type: enum
  values: [0, 1]
  description: "0=Absent, 1=Present"
  notes: "HDR.METADATA - takes zone modifier"
- id: multi_view_status
  label: Multi-Source View Status
  type: enum
  values: [0, 1, 2, 3, 4]
  notes: "MULTI.VIEW query"
- id: layout_status
  label: Layout Status
  type: string
  notes: "LAYOUT query"
- id: current_zone_layout_status
  label: Current Zone Layout Status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  notes: "CURRENT.ZONE.LAYOUT query"
- id: pip_size_status
  label: PIP Size Status
  type: enum
  values: [0, 1, 2]
  notes: "PIP.SIZE query"
- id: current_zone_status
  label: Current Zone Status
  type: enum
  values: [0, 1, 2, 3]
  notes: "CURRENT.ZONE query"
- id: diagnostic_color_status
  label: Diagnostic Color Status
  type: enum
  values: [0, 1, 2, 255]
  notes: "DIAGNOSTIC.COLOR query"
- id: osd_status
  label: OSD Status
  type: enum
  values: [0, 1]
  description: "0=DISABLE, 1=ENABLE"
  notes: "OSD.STATUS - indicates if OSD is currently displayed"
- id: osd_allow_popup_status
  label: Allow Pop Up Messages Status
  type: enum
  values: [0, 1]
  notes: "OSD.ALLOW.POPUP query"
- id: osd_position_status
  label: Menu Position Status
  type: enum
  values: [0, 1, 2, 3, 4]
  notes: "OSD.POSITION query"
- id: osd_rotation_status
  label: OSD Rotation Status
  type: enum
  values: [0, 1]
  notes: "ORIENTATION query"
- id: osd_timeout_status
  label: OSD Timeout Status
  type: integer
  notes: "OSD.TIMEOUT query"
- id: osd_transparency_status
  label: OSD Transparency Status
  type: integer
  description: "0-5"
  notes: "OSD.TRANSPARENCY query"
- id: splash_screen_status
  label: Splash Screen Status
  type: enum
  values: [0, 1]
  notes: "SPLASH.SCREEN query"
- id: blank_screen_color_status
  label: Blank Screen Color Status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  notes: "BLANK.COLOR query"
- id: auto_scan_sources_status
  label: Auto Scan Sources Status
  type: enum
  values: [0, 1]
  notes: "SOURCE.SCAN query"
- id: source_message
  label: Source Message
  type: string
  description: "Input resolution and frame rate string, or 'Searching' or 'No Signal'"
  notes: "SOURCE.MESSAGE - takes zone modifier"
- id: signal_info
  label: Image Information
  type: string
  description: "Returns HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, etc."
  notes: "SIGNAL.INFO - takes zone and parameter modifiers"
- id: edid_timing_status
  label: EDID Timing Status
  type: string
  notes: "EDID.TIMING query"
- id: edid_selected_connector_status
  label: EDID Zone Status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  notes: "EDID.SELECTEDCONNECTOR query"
- id: displayport_type_status
  label: DisplayPort Type Status
  type: enum
  values: [0, 1]
  notes: "DP.TYPE query"
- id: hdmi_cec_status
  label: HDMI CEC Status
  type: enum
  values: [0, 1]
  notes: "CEC.ENABLE query"
- id: touch_control_status
  label: Touch Control Status
  type: enum
  values: [0, 1, 2]
  notes: "TOUCH.CONTROL query"
- id: ops_present
  label: OPS Present
  type: enum
  values: [0, 1]
  description: "0=FALSE, 1=TRUE"
  notes: "OPS.PRESENT"
- id: ops_power_check_status
  label: OPS Power Down Check Status
  type: enum
  values: [0, 1]
  notes: "OPS.POWER.CHECK query"
- id: preset_count
  label: Preset Count
  type: integer
  description: "Number of non-empty presets"
  notes: "PRESET.COUNT"
- id: preset_max
  label: Preset Max
  type: integer
  description: "Highest saved preset number"
  notes: "PRESET.MAX"
- id: preset_full
  label: Preset Full
  type: enum
  values: [0, 1]
  description: "0=NO, 1=YES"
  notes: "PRESET.FULL - takes preset number modifier"
- id: preset_list
  label: Preset List
  type: string
  description: "Space-separated list of filled preset numbers"
  notes: "PRESET.LIST - use FIRST/NEXT iteration"
- id: preset_name_status
  label: Preset Name Status
  type: string
  notes: "PRESET.NAME query"
- id: schedule_description
  label: Schedule Description
  type: string
  notes: "SCHEDULE.DESCRIPTION - takes slot modifier"
- id: time_string
  label: Time String
  type: string
  description: "Format: '2015-09-01 13:21'"
  notes: "TIME.STRING"
- id: time_day_status
  label: Time Day Status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6]
  notes: "TIME.DAY"
- id: timezone_status
  label: Time Zone Status
  type: string
  notes: "TIMEZONE query"
- id: use_network_time_status
  label: Use Network Time Status
  type: enum
  values: [0, 1]
  notes: "NETWORK.NTP query"
- id: ntp_server_status
  label: NTP Server Status
  type: string
  notes: "NETWORK.NTPSERVER query"
- id: network_dhcp_status
  label: DHCP Status
  type: enum
  values: [0, 1]
  notes: "NETWORK.DHCP query"
- id: ipv4_address_status
  label: IP Address Status
  type: string
  notes: "IPV4.ADDRESS query"
- id: ipv4_netmask_status
  label: Subnet Mask Status
  type: string
  notes: "IPV4.NETMASK query"
- id: ipv4_gateway_status
  label: Default Gateway Status
  type: string
  notes: "IPV4.GATEWAY query"
- id: network_dns1_status
  label: DNS Server 1 Status
  type: string
  notes: "NETWORK.DNS1 query"
- id: network_dns2_status
  label: DNS Server 2 Status
  type: string
  notes: "NETWORK.DNS2 query"
- id: hostname_status
  label: Host Name Status
  type: string
  notes: "HOSTNAME query"
- id: display_name_status
  label: Display Name Status
  type: string
  notes: "DISPLAY.NAME query"
- id: mac_address
  label: MAC Address
  type: string
  description: "Format: '12:34:56:AB:CD:EF'"
  notes: "NETWORK.MAC"
- id: command_enable_status
  label: Network Commands Enable Status
  type: enum
  values: [0, 1]
  notes: "COMMAND.ENABLE query"
- id: network_enable_status
  label: Network Port Enable Status
  type: enum
  values: [0, 1]
  notes: "NETWORK.ENABLE query"
- id: network_ping_status
  label: Network Ping Result
  type: enum
  values: ["SUCCESS", "FAILED"]
  notes: "NETWORK.PING response"
- id: snmp_enable_status
  label: SNMP Enable Status
  type: enum
  values: [0, 1]
  notes: "SNMP.ENABLE query"
- id: notification_email_status
  label: Notification Event Status
  type: string
  notes: "NOTIFICATION.EMAIL query"
- id: smtp_server_status
  label: SMTP Server Status
  type: string
  notes: "NETWORK.SMTP.SERVER query"
- id: smtp_port_status
  label: SMTP Port Status
  type: integer
  notes: "NETWORK.SMTP.PORT query"
- id: smtp_encryption_status
  label: SMTP Connection Encryption Status
  type: enum
  values: [0, 1, 2]
  notes: "NETWORK.SMTP.ENCRYPTION query"
- id: smtp_authentication_status
  label: SMTP Authentication Status
  type: enum
  values: [0, 1, 2, 3, 4, 5, 6, 7]
  notes: "NETWORK.SMTP.AUTHENTICATION query"
- id: smtp_username_status
  label: SMTP Username Status
  type: string
  notes: "NETWORK.SMTP.USERNAME query"
- id: smtp_email_from_status
  label: SMTP Email From Address Status
  type: string
  notes: "NETWORK.SMTP.FROM query"
- id: model_id
  label: Model ID
  type: string
  description: "e.g. 'UR8451'"
  notes: "MODEL.ID"
- id: model_series
  label: Model Series
  type: string
  description: "Always returns 'UltraRes'"
  notes: "MODEL.SERIES"
- id: serial_number
  label: Serial Number
  type: string
  notes: "SERIAL.NUMBER"
- id: build_info
  label: Version Info
  type: string
  notes: "BUILD.INFO - multiple params for DATE.SCP, VERSION.SCP, etc."
- id: power_down_mode_status
  label: Power Down Mode Status
  type: enum
  values: [0, 1, 2]
  notes: "POWER.DOWN.MODE query"
- id: auto_power_on_status
  label: Auto Power On Status
  type: enum
  values: [0, 1]
  notes: "AUTO.ON query"
- id: power_saving_mode_status
  label: Power Saving Mode Status
  type: enum
  values: [0, 1, 2]
  notes: "POWER.SAVE.MODE query"
- id: power_saving_delay_status
  label: Power Saving Delay Status
  type: integer
  notes: "POWER.SAVE.DELAY query"
- id: power_on_delay_status
  label: Power On Delay Status
  type: number
  notes: "POWER.ON.DELAY query"
- id: auto_scan_status
  label: Auto Scan Sources Status
  type: enum
  values: [0, 1]
  notes: "SOURCE.SCAN query"
- id: cms_flag
  label: Advanced Color Flag
  type: string
  description: "Empty string if achievable, '*' if not"
  notes: "CMSFLAG - takes zone, gamut, color point modifiers"
- id: pixel_orbit_status
  label: Pixel Orbit Status
  type: enum
  values: [0, 1]
  notes: "PIXEL.ORBIT query"
- id: led_enable_status
  label: Enable Status LED Status
  type: enum
  values: [0, 1]
  notes: "LED.ENABLE query"
- id: ir_code_status
  label: IR Code Status
  type: integer
  description: "0-65535"
  notes: "IR.CODE query"
- id: ir_lock_status
  label: IR Remote Lock Status
  type: enum
  values: [0, 1]
  notes: "IR.LOCK query"
- id: key_lock_status
  label: Keypad Lock Status
  type: enum
  values: [0, 1]
  notes: "KEY.LOCK query"
- id: web_ui_password_status
  label: Web UI Password Status
  type: string
  notes: "PASSWORD.SET query"
- id: audio_zone_status
  label: Audio Zone Select Status
  type: enum
  values: [0, 1, 2, 3]
  notes: "AUDIO.ZONE query"
```

## Variables
```yaml
# UNRESOLVED: most parameters are settable via Actions with = operator.
# This device uses action-style commands rather than separate getter/setter variables.
# Variable section not applicable for this control style.
```

## Events
```yaml
- id: power_state_changed
  description: "Device power state changed"
  notes: "NOTIFICATION.EMAIL event 0"
- id: error_occurred
  description: "System error occurred"
  notes: "NOTIFICATION.EMAIL event 1 - check ERROR.LOG for details"
- id: source_detected
  description: "Video source detected on a zone"
  notes: "NOTIFICATION.EMAIL event 2"
- id: source_lost
  description: "Video source lost from a zone"
  notes: "NOTIFICATION.EMAIL event 3"
- id: source_selected
  description: "Source selected for a zone"
  notes: "NOTIFICATION.EMAIL event 4"
```

## Macros
```yaml
# No explicit multi-step macros defined in source.
# UNRESOLVED: Factory Reset FACTORY1 resets EDID customizations, network settings, and presets
# in addition to what USER reset covers - could be documented as separate macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "RS-232 control requires Power Down Mode set to Networked Standby or Fast Startup before connection"
  - "UR8450 and UR9850 models require separate RS-232 documentation at www.planar.com/support"
  - "FIRMWARE.UPDATE modifies system firmware - verify update path before issuing"
  - "FACTORY1 reset (RESET(1)) clears EDID customizations, network settings, and presets beyond standard USER reset scope"
  - "CLONE.SETTINGS(COPY, USB) and CLONE.SETTINGS(PASTE, USB) require USB storage device attached"
# UNRESOLVED: power supply fault handling, fault recovery sequences, voltage/current specs
```

## Notes
RS-232C command protocol uses ASCII text format with OPCODE(MODIFIERS)OPERATOR[OPERANDS] structure. Commands are terminated by CR (0x0D), LF (0x0A), or semicolon. Responses mirror termination character. Numeric codes may be used instead of named opcodes (e.g. "200" for "BRIGHTNESS"). Multiple operands separated by spaces or commas. All commands and responses are case-insensitive. Commands marked with '!' in Operators column support execute action (no operator symbol).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: network TCP port numbers beyond port 52 mention — no explicit port table for IP control -->
<!-- UNRESOLVED: whether OPS serial connection supports same command set as DB9 RS-232 -->
<!-- UNRESOLVED: Crestron/AMX integration details not covered in source -->
<!-- UNRESOLVED: SNMP community strings and MIB details not documented -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-05-14T18:17:19.930Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:19.930Z
matched_actions: 111
action_count: 111
confidence: high
summary: "All 181 spec actions matched literal command codes in source RS-232 table; transport parameters verified verbatim; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
