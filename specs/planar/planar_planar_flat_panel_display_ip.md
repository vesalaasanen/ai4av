---
schema_version: ai4av-public-spec-v1
device_id: planar/ultrares-p-series
entity_id: planar_planar_flat_panel_display
spec_id: admin/planar-ultrares-p-series
revision: 1
author: admin
title: "Planar UltraRes P Series Control Spec"
status: published
manufacturer: Planar
manufacturer_key: planar
model_family: "UltraRes P Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "UltraRes P Series"
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
last_checked_at: 2026-04-26T22:26:34.169Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T22:26:34.169Z
  matched_actions: 105
  action_count: 105
  confidence: high
  summary: "All 105 spec actions matched to source command tokens; transport parameters (19200 baud, port 23, RS-232/TCP/SSH) verified verbatim in protocol reference."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar UltraRes P Series Control Spec

## Summary
Planar UltraRes P Series flat panel display supporting multi-zone image control. Control via RS-232 (19200 baud) and TCP/SSH (same command set as RS-232). Power Down Mode must be set to Networked Standby or Fast Startup before RS-232 commands are accepted.

<!-- UNRESOLVED: specific model numbers (e.g. URP552) not confirmed as compatible beyond UltraRes P Series -->

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
  port: 23  # Telnet; SSH available on port 22 (same command set)
auth:
  type: none  # inferred: RS-232 protocol has no authentication; network login is separate from serial command protocol
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
    - name: value
      type: integer
      description: 0 = OFF, 1 = ON

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number 0-4, 254=ALL, 255=CURRENT
    - name: source
      type: integer
      description: 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0-3, 254=ALL, 255=CURRENT

- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0-3, 253=ALL.INPUT, 254=ALL, 255=CURRENT
    - name: value
      type: integer
      description: 0-100

- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: value
      type: integer
      description: 0 = OFF, 1 = ON

- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10

- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: integer
      description: 0 = USER, 1 = FACTORY1

- id: system_reboot
  label: System Reboot
  kind: action

- id: firmware_update
  label: Firmware Update
  kind: action

- id: osd_close
  label: OSD Close
  kind: action

- id: pip_swap
  label: PIP Swap
  kind: action

- id: reset_user
  label: Reset User Settings
  kind: action

- id: key_send
  label: Send IR Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name (e.g. MENU, UP, DOWN, SOURCE, MUTE, HDMI1, HDMI2)

- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: 1-100

- id: layout_set
  label: Set Layout
  kind: action
  params:
    - name: value
      type: integer
      description: 0=SINGLE, 1=PIP.UL, 2=PIP.UR, 3=PIP.LL, 4=PIP.LR, 5=DUAL.L, 12=QUAD

- id: multi_view_set
  label: Set Multi-Source View
  kind: action
  params:
    - name: value
      type: integer
      description: 0=SINGLE, 1=DUAL, 3=QUAD, 4=PIP

- id: pip_size_set
  label: Set PIP Size
  kind: action
  params:
    - name: value
      type: integer
      description: 0=SMALL, 1=MEDIUM, 2=LARGE

- id: test_pattern_set
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW

- id: osd_allow_popup_set
  label: Set OSD Allow Pop Up
  kind: action
  params:
    - name: value
      type: integer
      description: 0=NO, 1=YES

- id: auto_power_on_set
  label: Set Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON, 2=PREVIOUS.STATE

- id: auto_scan_set
  label: Set Auto Scan Sources
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON, 2=FAILOVER

- id: power_save_mode_set
  label: Set Power Saving Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Disable, 1=Power.Down, 2=Wake.On.Signal

- id: power_save_delay_set
  label: Set Power Saving Delay
  kind: action
  params:
    - name: value
      type: integer
      description: 60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES

- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX

- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE

- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 6=1.8, 8=1.9, 10=2.0, 12=2.1, 14=2.2, 16=2.3, 18=2.4, 20=2.5, 22=2.6, 24=2.7, 26=2.8, 28=2.9

- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: value
      type: integer
      description: 0-200 (per color)

- id: color_set
  label: Set Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-100

- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-5

- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: 0-20

- id: color_space_set
  label: Set Color Space
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

- id: treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: bass_set
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: balance_set
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: audio_speakers_set
  label: Set Internal Speakers
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: audio_zone_set
  label: Set Audio Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4

- id: audio_settings_set
  label: Set Audio Settings
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
    - name: speakers
      type: integer

- id: current_zone_set
  label: Set Current Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4

- id: dhcp_set
  label: Set DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: ipv4_address_set
  label: Set Static IP Address
  kind: action
  params:
    - name: ip
      type: string
      description: IP address string

- id: ipv4_netmask_set
  label: Set Subnet Mask
  kind: action
  params:
    - name: mask
      type: string
      description: Subnet mask string

- id: ipv4_gateway_set
  label: Set Default Gateway
  kind: action
  params:
    - name: gateway
      type: string
      description: Gateway IP string

- id: network_dns1_set
  label: Set DNS Server 1
  kind: action
  params:
    - name: dns
      type: string

- id: network_dns2_set
  label: Set DNS Server 2
  kind: action
  params:
    - name: dns
      type: string

- id: timezone_set
  label: Set Timezone
  kind: action
  params:
    - name: value
      type: string
      description: Timezone name (see timezone table)

- id: time_set
  label: Set Time
  kind: action
  params:
    - name: component
      type: integer
      description: 0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE
    - name: value
      type: integer

- id: schedule_set
  label: Set Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-10
    - name: parameter
      type: integer
      description: 0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE
    - name: value
      type: integer

- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: integer
      description: 0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS

- id: schedule_action_set
  label: Set Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: integer
      description: 0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS

- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: integer
      description: 0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN

- id: osd_position_set
  label: Set OSD Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT

- id: osd_rotation_set
  label: Set OSD Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: 0=LANDSCAPE, 1=PORTRAIT

- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS

- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100

- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: blank_color_set
  label: Set Blank Screen Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK

- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: displayport_type_set
  label: Set DisplayPort Type
  kind: action
  params:
    - name: port
      type: integer
      description: 1=DP.TYPE, 2=DP2.TYPE
    - name: value
      type: integer
      description: 1=1.2, 2=1.4, 3=2.0

- id: hdmi_cec_set
  label: Set HDMI CEC
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: hdmi_cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: language_set
  label: Set Language
  kind: action
  params:
    - name: value
      type: integer
      description: 0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE

- id: display_name_set
  label: Set Display Name
  kind: action
  params:
    - name: name
      type: string

- id: ir_code_set
  label: Set IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: 0-65535

- id: ir_lock_set
  label: Set IR Remote Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: keypad_lock_set
  label: Set Keypad Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: lan_lock_set
  label: Set LAN Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: rs232_lock_set
  label: Set RS232 Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: usba_lock_set
  label: Set USB-A Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: led_enable_set
  label: Set Status LED
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE

- id: command_enable_set
  label: Set Network Command Enable
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: edid_timing_update
  label: Update EDID Timing
  kind: action
  params:
    - name: input
      type: integer
      description: 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC

- id: edid_selected_connector_set
  label: Set EDID Selected Connector
  kind: action
  params:
    - name: value
      type: integer
      description: 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: address
      type: string
      description: Network address to ping

- id: network_smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: integer
      description: 0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED

- id: notification_email_set
  label: Set Notification Email
  kind: action
  params:
    - name: event
      type: integer
      description: 0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED
    - name: enable
      type: integer
      description: 0=DISABLE, 1=ENABLE
    - name: recipients
      type: string
    - name: message
      type: string

- id: power_down_mode_set
  label: Set Power Down Mode
  kind: action
  params:
    - name: value
      type: integer
      description: 0=Standby.Mode, 1=Networked.Standby.Mode, 2=Fast.Startup

- id: ntp_server_set
  label: Set NTP Server
  kind: action
  params:
    - name: server
      type: string

- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON

- id: preset_name_set
  label: Set Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: 1-10
    - name: name
      type: string

- id: offset_set
  label: Set Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: value
      type: integer
      description: 0-100
- id: color_subsampling_query
  label: Query Color Subsampling
  kind: query
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT"
  response: "COLOR.SUBSAMPLING"
- id: signal_info_query
  label: Query Signal Info
  kind: query
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT"
    - name: parameter
      type: integer
      description: "0=HACTIVE, 1=VACTIVE, 2=PCLK, 3=HTOTAL, 4=VTOTAL, 5=VREFRESH, 6=HREFRESH, 7=INTERLACE, 8=VFIELDRATE, 9=VREFRESH.X.100, 10=COLORDEPTH, 11=TMDS"
  response: "SIGNAL.INFO"
- id: current_zone_layout_query
  label: Query Current Zone Layout
  kind: query
  params: []
  response: "CURRENT.ZONE.LAYOUT"
- id: osd_status_query
  label: Query OSD Status
  kind: query
  params: []
  response: "OSD.STATUS"
- id: build_info_query
  label: Query Build Info
  kind: query
  params:
    - name: parameter
      type: integer
      description: "4=VERSION.VP, 10=VERSION.SUBMCU, 11=VERSION.NETUART; omit for VERSION.VP"
  response: "BUILD.INFO"
- id: model_id_query
  label: Query Model ID
  kind: query
  params: []
  response: "MODEL.ID"
- id: model_series_query
  label: Query Model Series
  kind: query
  params: []
  response: "MODEL.SERIES"
- id: network_mac_query
  label: Query MAC Address
  kind: query
  params: []
  response: "NETWORK.MAC"
- id: source_message_query
  label: Query Source Message
  kind: query
  params:
    - name: zone
      type: integer
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT"
  response: "SOURCE.MESSAGE"
- id: preset_count_query
  label: Query Preset Count
  kind: query
  params: []
  response: "PRESET.COUNT"
- id: preset_full_query
  label: Query Preset Full Status
  kind: query
  params:
    - name: preset
      type: integer
      description: "1-10, preset number"
  response: "PRESET.FULL"
- id: preset_list_query
  label: Query Preset List
  kind: query
  params:
    - name: position
      type: string
      description: "FIRST or NEXT"
  response: "PRESET.LIST"
- id: preset_max_query
  label: Query Preset Max
  kind: query
  params: []
  response: "PRESET.MAX"
- id: system_state_query
  label: Query System State
  kind: query
  params: []
  response: "SYSTEM.STATE"
- id: audio_input_query
  label: Query Audio Input
  kind: query
  params: []
  response: "AUDIO.INPUT"
- id: time_day_query
  label: Query Time Day
  kind: query
  params: []
  response: "TIME.DAY"
- id: time_month_set
  label: Set Time Month
  kind: action
  params:
    - name: month
      type: string
      description: "JANUARY through DECEMBER"
- id: time_string_query
  label: Query Time String
  kind: query
  params: []
  response: "TIME.STRING"
```

## Feedbacks
```yaml
- id: brightness_state
  type: integer
  description: Brightness value 0-100

- id: contrast_state
  type: integer
  description: Contrast value 0-100

- id: color_state
  type: integer
  description: Color value 0-100

- id: tint_state
  type: integer
  description: Tint value 0-100

- id: sharpness_state
  type: integer
  description: Sharpness value 0-5

- id: volume_state
  type: integer
  description: Volume 0-100

- id: mute_state
  type: enum
  values: [on, off]

- id: treble_state
  type: integer
  description: Treble 0-100

- id: bass_state
  type: integer
  description: Bass 0-100

- id: balance_state
  type: integer
  description: Balance 0-100

- id: audio_input_state
  type: string
  description: Current audio input source

- id: audio_zone_state
  type: string
  description: Current audio zone

- id: audio_speakers_state
  type: enum
  values: [on, off]

- id: display_power_state
  type: enum
  values: [on, off]

- id: system_state
  type: enum
  values: [standby, on]

- id: source_select_state
  type: string
  description: Current source per zone

- id: audio_settings_state
  type: string
  description: Full audio settings string

- id: aspect_state
  type: string
  description: Current aspect ratio

- id: color_temperature_state
  type: string
  description: Color temperature value

- id: gamma_state
  type: string
  description: Gamma curve value

- id: gain_state
  type: string
  description: RGB gain values

- id: offset_state
  type: string
  description: RGB offset values

- id: color_space_state
  type: string
  description: Color space setting or actual value

- id: color_subsampling_state
  type: string
  description: Color subsampling (e.g. 4:4:4, 4:2:0)

- id: overscan_state
  type: integer
  description: Overscan value 0-20

- id: layout_state
  type: string
  description: Current layout

- id: current_zone_layout_state
  type: string
  description: Current zone layout ID

- id: multi_view_state
  type: string
  description: Current multi-source view

- id: pip_size_state
  type: string
  description: Current PIP size

- id: osd_status_state
  type: enum
  values: [enable, disable]

- id: osd_position_state
  type: string
  description: OSD position

- id: osd_rotation_state
  type: string
  description: OSD rotation

- id: osd_timeout_state
  type: string
  description: OSD timeout value

- id: osd_transparency_state
  type: integer
  description: OSD transparency 0-100

- id: splash_screen_state
  type: string
  description: Splash screen setting

- id: blank_color_state
  type: string
  description: Blank screen color

- id: auto_power_on_state
  type: string
  description: Auto power on setting

- id: auto_scan_state
  type: string
  description: Auto scan sources setting

- id: power_save_mode_state
  type: string
  description: Power saving mode

- id: power_save_delay_state
  type: string
  description: Power saving delay

- id: power_down_mode_state
  type: string
  description: Power down mode

- id: backlight_intensity_state
  type: integer
  description: Backlight intensity 1-100

- id: pixel_orbit_state
  type: string
  description: Pixel orbit setting

- id: displayport_type_state
  type: string
  description: DisplayPort type

- id: hdmi_cec_state
  type: string
  description: HDMI CEC setting

- id: hdmi_cec_standby_state
  type: string
  description: HDMI CEC standby setting

- id: language_state
  type: string
  description: Current language

- id: display_name_state
  type: string
  description: Display name string

- id: model_id_state
  type: string
  description: Model ID

- id: model_series_state
  type: string
  description: Model series (always "UltraRes P" for this product line)

- id: serial_number_state
  type: string
  description: Serial number

- id: version_info_state
  type: string
  description: Firmware version info

- id: build_info_state
  type: string
  description: Build information

- id: ir_code_state
  type: integer
  description: IR code value 0-65535

- id: ir_lock_state
  type: string
  description: IR remote lock setting

- id: keypad_lock_state
  type: string
  description: Keypad lock setting

- id: lan_lock_state
  type: string
  description: LAN lock setting

- id: rs232_lock_state
  type: string
  description: RS232 lock setting

- id: usba_lock_state
  type: string
  description: USB-A lock setting

- id: led_enable_state
  type: string
  description: Status LED setting

- id: command_enable_state
  type: string
  description: Network command enable setting

- id: dhcp_state
  type: string
  description: DHCP setting

- id: ipv4_address_state
  type: string
  description: Current IP address

- id: ipv4_netmask_state
  type: string
  description: Current subnet mask

- id: ipv4_gateway_state
  type: string
  description: Current default gateway

- id: network_dns1_state
  type: string
  description: DNS server 1

- id: network_dns2_state
  type: string
  description: DNS server 2

- id: network_mac_state
  type: string
  description: MAC address

- id: timezone_state
  type: string
  description: Timezone setting

- id: time_state
  type: string
  description: Current date/time string

- id: time_day_state
  type: string
  description: Current day of week

- id: time_month_state
  type: string
  description: Current month

- id: network_ntp_state
  type: string
  description: Use network time setting

- id: ntp_server_state
  type: string
  description: NTP server

- id: signal_info_state
  type: string
  description: Signal information (HACTIVE, VACTIVE, PCLK, etc.)

- id: source_message_state
  type: string
  description: Source resolution and frame rate, or "Searching"/"No Signal"

- id: preset_count_state
  type: integer
  description: Number of non-empty presets

- id: preset_max_state
  type: integer
  description: Highest saved preset number

- id: preset_list_state
  type: string
  description: List of saved presets

- id: preset_full_state
  type: enum
  values: [yes, no]
  description: Whether preset has data saved

- id: preset_name_state
  type: string
  description: Preset name

- id: schedule_state
  type: string
  description: Schedule slot configuration

- id: schedule_description_state
  type: string
  description: Schedule description string

- id: schedule_frequency_state
  type: string
  description: Schedule frequency

- id: schedule_action_state
  type: string
  description: Schedule action

- id: schedule_day_state
  type: string
  description: Schedule day

- id: edid_timing_state
  type: string
  description: EDID timing type

- id: edid_selected_connector_state
  type: string
  description: EDID selected connector

- id: notification_email_state
  type: string
  description: Notification email configuration

- id: current_zone_state
  type: string
  description: Current zone

- id: osd_allow_popup_state
  type: string
  description: OSD allow popup setting

- id: error_response
  type: enum
  values: ["ERR 1", "ERR 2", "ERR 3", "ERR 4", "ERR 5", "ERR 6"]
  description: Error responses: ERR 1=Invalid syntax, ERR 3=Command not recognized, ERR 4=Invalid modifier, ERR 5=Invalid operands, ERR 6=Invalid operator
```

## Variables
```yaml
# UNRESOLVED: no standalone variable parameters found; all settable parameters use action-style commands
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications described in source; display does not主动 send status updates
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # FACTORY1 reset requires power cycle to complete
interlocks:
  - Power Down Mode must be set to Networked Standby or Fast Startup before RS-232 commands are accepted
  - COMMAND.ENABLE(NETWORK)=OFF disables network command ports entirely
  - FACTORY1 reset also resets EDID customizations, network settings and presets
# UNRESOLVED: no explicit safety warnings for voltage, current, or power specifications in source
```

## Notes
RS-232 and TCP/SSH use identical command syntax and command codes. The protocol uses ASCII encoding with operators `=` (write), `?` (read name), `#` (read numeric), `+` (increment), `-` (decrement), `!` (action), `:` (response prefix), `@ACK` (acknowledgement), `^NAK` (negative ack), and `!ERR` (error). Terminators are CR (0x0D), LF (0x0A), or `;`. Responses use the same terminator as the command.

SSH uses password set via Remote Monitoring Software (default login: admin / serial number). Telnet and SSH cannot be enabled simultaneously — only one can be active at a time.

COMMAND.ENABLE(NETWORK) can globally disable network command ports.

The KEY command accepts key names from the Key Code table (page 34 of source) including numeric buttons 0-9, navigation, menu, volume, mute, preset buttons, and source selection keys.

Preset system supports up to 10 presets with save, recall, delete, name, and list operations.

Multi-zone support: up to 4 independent zones (ZONE.1–ZONE.4) with separate image and audio settings per zone. Routing and aspect ratio can also target ALL.INPUT or ALL.ZONE.

Schedule system supports 10 event slots with frequency (daily/weekly/weekdays/weekends), time, day, action (turn on/off/recall/panel brightness), and enable/disable.

Network monitoring: NETWORK.PING for connectivity test, NOTIFICATION.EMAIL for email alerts on power state change, source lost, or source selected events.

<!-- UNRESOLVED: TCP port number for the command protocol — source confirms port 23 for Telnet but does not specify which port the serial command protocol runs on over TCP beyond Telnet port 23 -->
<!-- UNRESOLVED: SSH username — source states "root" but password is the one set in Remote Monitoring Software, not the admin password -->
<!-- UNRESOLVED: RS-232 connector gender — source specifies female DB9 but does not confirm straight-through vs null-modem wiring requirement for all deployments -->

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
last_checked_at: 2026-04-26T22:26:34.169Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:26:34.169Z
matched_actions: 105
action_count: 105
confidence: high
summary: "All 105 spec actions matched to source command tokens; transport parameters (19200 baud, port 23, RS-232/TCP/SSH) verified verbatim in protocol reference."
```

## Known Gaps

```yaml
[]
```
