---
schema_version: ai4av-public-spec-v1
device_id: planar/slm552
entity_id: planar_slm_series
spec_id: admin/planar-slm-series
revision: 1
author: admin
title: "Planar Simplicity M Series Control Spec"
status: published
manufacturer: Planar
manufacturer_key: planar
model_family: SLM552
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - SLM552
    - "Simplicity M Series"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
source_documents:
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:31:39.528Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:32:16.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:17.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:49.173Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:40:21.236Z
retrieved_at: 2026-04-29T11:40:21.236Z
last_checked_at: 2026-04-26T22:23:33.543Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T22:23:33.543Z
  matched_actions: 92
  action_count: 92
  confidence: high
  summary: "All 92 spec actions found verbatim in source command table; transport parameters (baud, bits, port) confirmed; bidirectional coverage verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar Simplicity M Series Control Spec

## Summary
Planar Simplicity M Series LCD displays supporting RS-232C direct serial control and RS-232-over-IP control via TCP, UDP, or SSH. The command protocol uses a structured ASCII format with OPCODE, MODIFIERS, OPERATOR, and OPERANDS terminated by [CR], [LF], or ';'. Approximately 80 commands cover display, audio, network, scheduling, and system functions.

<!-- UNRESOLVED: complete model list not enumerated in source; all Simplicity M Series models assumed -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 5000  # TCP/UDP; SSH uses port 2222
auth:
  type: none  # inferred: no auth procedure in source for RS-232 serial
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
- id: aspect_ratio_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: value
      type: enum
      values: [FILL, 4X3, NATIVE, 21X9, CUSTOM]

- id: audio_volume_line_set
  label: Set Line Out Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: audio_out_sync_set
  label: Set Audio Out Sync
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []

- id: auto_power_on_set
  label: Set Auto Power On
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, LAST.STATUS]

- id: source_scan_set
  label: Set Auto Scan Sources
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]

- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 100]

- id: panel_saving_backlight_set
  label: Set Panel Saving Backlight
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_balance_set
  label: Set Audio Balance
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: audio_bass_set
  label: Set Audio Bass
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: boot_source_input_set
  label: Set Boot Source Input
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: color_set
  label: Set Color
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: colorspace_set
  label: Set Color Space
  kind: action
  params:
    - name: value
      type: enum
      values: [AUTO, RGB, RGB.VIDEO]

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: value
      type: enum
      values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: value
      type: integer
      range: [0, 255]

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: value
      type: enum
      values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", NATIVE, SGAMMA, DIMAGE]

- id: custom_zoom_set
  label: Set Custom Zoom
  kind: action
  params:
    - name: direction
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]
    - name: value
      type: integer
      range: [0, 100]

- id: image_position_set
  label: Set Image Position
  kind: action
  params:
    - name: direction
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      range: [0, 100]

- id: info_timeout_set
  label: Set Information OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 60]

- id: network_dhcp_set
  label: Set DHCP
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: display_power_set
  label: Set Display Power
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_speakers_set
  label: Set Internal Speakers
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: led_enable_set
  label: Set Status LED
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: reset
  label: Factory Reset
  kind: action
  params:
    - name: scope
      type: enum
      values: [USER, PICTURE, AUDIO, CONFIG1, CONFIG2, ADV.SETTINGS, SCREEN]

- id: failover_source_set
  label: Set Failover Source
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 9]
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: image_position_pan
  label: Set Pan
  kind: action
  params:
    - name: direction
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      range: [0, 100]

- id: cec_enable_set
  label: Set HDMI CEC
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: hdmi_version_set
  label: Set HDMI Version
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI14, HDMI20]

- id: keypad_lock_set
  label: Set Keypad Lock
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: ir_lock_set
  label: Set IR Remote Lock
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: key_send
  label: Send Key
  kind: action
  params:
    - name: key
      type: enum
      values: [UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.0-KEY.9, MUTE, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, HDMI1, HDMI2, VGA, DVI, MISC, ZONE1]

- id: language_set
  label: Set Language
  kind: action
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]

- id: osd_position_set
  label: Set OSD Position
  kind: action
  params:
    - name: direction
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      range: [0, 100]

- id: volume_max_set
  label: Set Maximum Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: volume_min_set
  label: Set Minimum Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: monitor_id_set
  label: Set Monitor ID
  kind: action
  params:
    - name: value
      type: integer
      range: [1, 255]

- id: mute_set
  label: Set Mute
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: noise_reduction_set
  label: Set Noise Reduction
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]

- id: off_timer_set
  label: Set Off Timer
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 24]

- id: osd_close
  label: OSD Close
  kind: action
  params: []

- id: orientation_set
  label: Set OSD Rotation
  kind: action
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 120]

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: phase_set
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: power_down_mode_set
  label: Set Power Down Mode
  kind: action
  params:
    - name: value
      type: enum
      values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params: []

- id: schedule_set
  label: Set Schedule
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 7]
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, ENABLE, END.MINUTE, END.HOUR, INPUT, PLAYLIST, DAY.MON, DAY.TUE, DAY.WED, DAY.THU, DAY.FRI, DAY.SAT, DAY.SUN, END.TIME.NEXT.DAY]
    - name: value
      type: integer

- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 7]
    - name: day
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
    - name: value
      type: enum
      values: [OFF, ON]

- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 7]
    - name: value
      type: enum
      values: [ONCE, EVERY.WEEK]

- id: schedule_input_set
  label: Set Schedule Input
  kind: action
  params:
    - name: slot
      type: integer
      range: [1, 7]
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: smart_power_set
  label: Set Smart Power
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, MEDIUM, HIGH]

- id: source_select_set
  label: Set Source Select
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, USER]

- id: system_reboot
  label: System Reboot
  kind: action
  params: []

- id: time_set
  label: Set Time
  kind: action
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE]
    - name: value
      type: integer

- id: timezone_set
  label: Set Time Zone
  kind: action
  params:
    - name: value
      type: string

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: tracking_set
  label: Set Tracking
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]

- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      range: [0, 100]
- id: ipv4_address_set
  label: Set/Query IP Address (IPV4.ADDRESS)
  kind: action
  params:
    - name: address
      type: string
      description: "Static IPv4 address, e.g. 192.168.12.12; omit for read"
- id: network_mac_query
  label: Query MAC Address (NETWORK.MAC)
  kind: query
  params: []
  response: "NETWORK.MAC"
- id: model_id_query
  label: Query Model ID (MODEL.ID)
  kind: query
  params: []
  response: "MODEL.ID"
- id: model_series_query
  label: Query Model Series (MODEL.SERIES)
  kind: query
  params: []
  response: "MODEL.SERIES"
- id: serial_number_query
  label: Query Serial Number (SERIAL.NUMBER)
  kind: query
  params: []
  response: "SERIAL.NUMBER"
- id: source_message_query
  label: Query Source Message (SOURCE.MESSAGE)
  kind: query
  params: []
  response: "SOURCE.MESSAGE"
- id: system_state_query
  label: Query System State (SYSTEM.STATE)
  kind: query
  params: []
  response: "SYSTEM.STATE"
- id: temperature_query
  label: Query Thermal Status (TEMPERATURE)
  kind: query
  params: []
  response: "TEMPERATURE"
- id: time_day_query
  label: Query Time Day (TIME.DAY)
  kind: query
  params: []
  response: "TIME.DAY"
- id: time_month_query
  label: Query/Set Time Month (TIME.MONTH)
  kind: action
  params:
    - name: month
      type: string
      description: "JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER"
- id: time_string_query
  label: Query Time String (TIME.STRING)
  kind: query
  params: []
  response: "TIME.STRING"
- id: build_info_query
  label: Query Build Info (BUILD.INFO)
  kind: query
  params:
    - name: parameter
      type: integer
      description: "4=VERSION.VP, 10=VERSION.SUBMCU, 11=VERSION.NETUART; omit for VERSION.VP"
  response: "BUILD.INFO"
- id: uptime_query
  label: Query Operation Hours (UPTIME)
  kind: query
  params: []
  response: "UPTIME"
- id: boot_source_last_query
  label: Query Boot Source Last Input (BOOT.SOURCE.LAST)
  kind: query
  params: []
  response: "BOOT.SOURCE.LAST"
```

## Feedbacks
```yaml
- id: aspect_ratio
  label: Aspect Ratio
  type: enum
  values: [FILL, 4X3, NATIVE, 21X9, CUSTOM]

- id: audio_volume_line
  label: Line Out Volume
  type: integer
  range: [0, 100]

- id: audio_out_sync
  label: Audio Out Sync
  type: enum
  values: [OFF, ON]

- id: auto_power_on
  label: Auto Power On
  type: enum
  values: [OFF, ON, LAST.STATUS]

- id: source_scan
  label: Auto Scan Sources
  type: enum
  values: [OFF, ON, FAILOVER]

- id: backlight_intensity
  label: Backlight Intensity
  type: integer
  range: [1, 100]

- id: panel_saving_backlight
  label: Panel Saving Backlight
  type: enum
  values: [OFF, ON]

- id: audio_balance
  label: Audio Balance
  type: integer
  range: [0, 100]

- id: audio_bass
  label: Audio Bass
  type: integer
  range: [0, 100]

- id: brightness
  label: Brightness
  type: integer
  range: [0, 100]

- id: color
  label: Color
  type: integer
  range: [0, 100]

- id: colorspace_setting
  label: Color Space Setting
  type: enum
  values: [AUTO, RGB, RGB.VIDEO]

- id: colorspace_actual
  label: Color Space Actual
  type: enum
  values: [RGB, RGB.VIDEO]

- id: color_temperature
  label: Color Temperature
  type: enum
  values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]

- id: contrast
  label: Contrast
  type: integer
  range: [0, 100]

- id: gain
  label: Gain
  type: integer
  range: [0, 255]

- id: gamma
  label: Gamma
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", NATIVE, SGAMMA, DIMAGE]

- id: custom_zoom
  label: Custom Zoom
  type: integer
  range: [0, 100]

- id: ipv4_address
  label: IP Address
  type: string

- id: ipv4_gateway
  label: Default Gateway
  type: string

- id: ipv4_netmask
  label: Subnet Mask
  type: string

- id: network_dhcp
  label: DHCP
  type: enum
  values: [OFF, ON]

- id: network_dns1
  label: DNS Server 1
  type: string

- id: network_dns2
  label: DNS Server 2
  type: string

- id: display_power
  label: Display Power
  type: enum
  values: [OFF, ON]

- id: audio_speakers
  label: Internal Speakers
  type: enum
  values: [OFF, ON]

- id: led_enable
  label: Status LED
  type: enum
  values: [DISABLE, ENABLE]

- id: keypad_lock
  label: Keypad Lock
  type: enum
  values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: ir_lock
  label: IR Remote Lock
  type: enum
  values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]

- id: language
  label: Language
  type: enum
  values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]

- id: network_mac
  label: MAC Address
  type: string

- id: volume_max
  label: Maximum Volume
  type: integer
  range: [0, 100]

- id: volume_min
  label: Minimum Volume
  type: integer
  range: [0, 100]

- id: osd_position
  label: OSD Position
  type: integer
  range: [0, 100]

- id: monitor_id
  label: Monitor ID
  type: integer
  range: [1, 255]

- id: mute
  label: Mute
  type: enum
  values: [OFF, ON]

- id: noise_reduction
  label: Noise Reduction
  type: enum
  values: [OFF, LOW, MEDIUM, HIGH]

- id: network_ntpserver
  label: NTP Server
  type: string

- id: off_timer
  label: Off Timer
  type: integer
  range: [0, 24]

- id: uptime
  label: Operation Hours
  type: unsigned_integer

- id: orientation
  label: OSD Rotation
  type: enum
  values: [LANDSCAPE, PORTRAIT]

- id: osd_timeout
  label: OSD Timeout
  type: integer
  range: [0, 120]

- id: osd_transparency
  label: OSD Transparency
  type: integer
  range: [0, 100]

- id: overscan
  label: Overscan
  type: enum
  values: [OFF, ON]

- id: phase
  label: Phase
  type: integer
  range: [0, 100]

- id: pixel_orbit
  label: Pixel Orbit
  type: enum
  values: [OFF, ON]

- id: power_down_mode
  label: Power Down Mode
  type: enum
  values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]

- id: schedule
  label: Schedule
  type: string

- id: schedule_day
  label: Schedule Day
  type: enum
  values: [OFF, ON]

- id: schedule_frequency
  label: Schedule Frequency
  type: enum
  values: [ONCE, EVERY.WEEK]

- id: schedule_input
  label: Schedule Input
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: serial_number
  label: Serial Number
  type: string

- id: sharpness
  label: Sharpness
  type: integer
  range: [0, 100]

- id: smart_power
  label: Smart Power
  type: enum
  values: [OFF, MEDIUM, HIGH]

- id: source_message
  label: Source Message
  type: string

- id: source_select
  label: Source Select
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]

- id: splash_screen
  label: Splash Screen
  type: enum
  values: [OFF, ON, USER]

- id: system_state
  label: System State
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN]

- id: temperature
  label: Thermal Status
  type: string

- id: time
  label: Time
  type: unsigned_integer

- id: time_day
  label: Time Day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]

- id: time_month
  label: Time Month
  type: enum
  values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]

- id: time_string
  label: Time String
  type: string

- id: timezone
  label: Time Zone
  type: string

- id: tint
  label: Tint
  type: integer
  range: [0, 100]

- id: tracking
  label: Tracking
  type: integer
  range: [0, 100]

- id: treble
  label: Treble
  type: integer
  range: [0, 100]

- id: network_ntp
  label: Use Network Time
  type: enum
  values: [OFF, ON]

- id: build_info
  label: Version Info
  type: string

- id: volume
  label: Volume
  type: integer
  range: [0, 100]

- id: cec_enable
  label: HDMI CEC
  type: enum
  values: [OFF, ON]

- id: cec_standby
  label: HDMI CEC Standby
  type: enum
  values: [OFF, ON]

- id: hdmi_version
  label: HDMI Version
  type: enum
  values: [HDMI14, HDMI20]

- id: failover_source
  label: Failover Source
  type: string

- id: model_id
  label: Model ID
  type: string

- id: model_series
  label: Model Series
  type: string
  notes: Always returns "Simplicity"

- id: info_timeout
  label: Information OSD Timeout
  type: integer
  range: [0, 60]

- id: boot_source_input
  label: Boot Source Input
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]

- id: boot_source_last
  label: Boot Source Last Input
  type: enum
  values: [OFF, ON]

- id: boot_source_playlist
  label: Boot Source Playlist
  type: integer
  range: [0, 7]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside the action/feedback model
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS-232 over network requires Power Down Mode to be set to Wake on Signal or Always On"
    reference: "Section 2"
# UNRESOLVED: power sequencing requirements not explicitly stated beyond Power Down Mode requirement
```

## Notes
Command protocol: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` where TERM is [CR], [LF], or ';'. Operators: `=` (write), `?` (read name), `#` (read numeric), `+` (increment), `-` (decrement), `:` (response prefix), `!ERR N` (error), `@ACK` (acknowledge), `^NAK` (negative ack). Error codes: 1=Invalid syntax, 3=Command not recognized, 4=Invalid modifier, 5=Invalid operands, 6=Invalid operator. Numeric command codes also supported (e.g., 200 for BRIGHTNESS). Enumerated and integer operands support both decimal and hexadecimal notation. The device also supports RS-232 over IP via TCP/UDP port 5000 and SSH port 2222, carrying the same serial command set.

Command code table includes 80 entries covering display, audio, network, input routing, scheduling, and OSD configuration.

<!-- UNRESOLVED: complete list of applicable model numbers not enumerated; source references "all Planar Simplicity M Series models" without specific SKU list -->
<!-- UNRESOLVED: port 5000 is stated for TCP/UDP network control; SSH port 2222 also stated -->
<!-- UNRESOLVED: no safety-critical voltage/power/fault behavior described in source -->

## Provenance

```yaml
source_urls:
  - https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
source_documents:
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:31:39.528Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-29T11:32:16.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:17.729Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: download
    content_type: unknown
    checked_at: 2026-04-29T11:32:49.173Z
  - title: "Planar public source"
    url: https://planar.com/media/m1kna23m/020-1381-00b_lo-series-rs232-user-manual.pdf
    stage: spec
    content_type: unknown
    checked_at: 2026-04-29T11:40:21.236Z
retrieved_at: 2026-04-29T11:40:21.236Z
last_checked_at: 2026-04-26T22:23:33.543Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:23:33.543Z
matched_actions: 92
action_count: 92
confidence: high
summary: "All 92 spec actions found verbatim in source command table; transport parameters (baud, bits, port) confirmed; bidirectional coverage verified."
```

## Known Gaps

```yaml
[]
```
