---
spec_id: admin/planar-ur8651-mx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UR8651-MX Series Control Spec"
manufacturer: Planar
model_family: "UR8651-MX Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "UR8651-MX Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
  - https://www.planar.com/media/vpvn4yrs/020-1408-02b_ultrares-p-series-rs232-user-manual.pdf
retrieved_at: 2026-10-07T20:35:17.057Z
last_checked_at: 2026-10-07T20:35:17.057Z
generated_at: 2026-10-07T20:35:17.057Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "IP address configuration method via serial not described in source"
  - "The source does not describe unsolicited event notifications from the device."
  - "The source describes individual commands but no explicit multi-step macros."
verification:
  verdict: verified
  checked_at: 2026-10-07T20:35:17.057Z
  matched_actions: 160
  action_count: 160
  confidence: medium
  summary: "All 160 action units match source opcodes and operators, transport values are supported, and every source command row is represented in the spec. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar UR8651-MX Series Control Spec

## Summary
The Planar UltraRes P Series (UR8651-MX) is a professional LCD display with multi-zone video wall support. This spec covers the RS-232C serial command protocol (19200 baud, 8N1) and identical command set delivered over TCP (Telnet port 23) or SSH (port 22). Network access to Remote Monitoring Software uses admin/serial-number credentials.

**Power Down Mode must be set to Networked Standby or Fast Startup before RS232 commands are accepted.**

<!-- UNRESOLVED: IP address configuration method via serial not described in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet; SSH also available on port 22
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # source does not state protocol-level auth; RMS uses admin/serial-number login
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
- id: brightness_set
  label: Set Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT
    - name: value
      type: integer
      description: Brightness value 0-100
- id: brightness_inc
  label: Increment Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (same values as brightness_set)
- id: brightness_dec
  label: Decrement Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (same values as brightness_set)
- id: contrast_set
  label: Set Contrast
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: Contrast value 0-100
- id: color_set
  label: Set Color
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: Color value 0-100
- id: tint_set
  label: Set Tint
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: Tint value 0-100
- id: sharpness_set
  label: Set Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness value 0-5
- id: gain_set
  label: Set Gain
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: value
      type: integer
      description: Gain value 0-200 (or three values for ALL)
- id: gain_inc
  label: Increment Gain
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color
- id: gain_dec
  label: Decrement Gain
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color
- id: offset_set
  label: Set Offset
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color 0=RED, 1=GREEN, 2=BLUE, 255=ALL
    - name: value
      type: integer
      description: Offset value 0-100 (or three values for ALL)
- id: offset_inc
  label: Increment Offset
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color
- id: offset_dec
  label: Decrement Offset
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: color
      type: integer
      description: Color
- id: gamma_set
  label: Set Gamma
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: Gamma index 6=1.8, 8=1.9, 10=2.0, 12=2.1, 14=2.2, 16=2.3, 18=2.4, 20=2.5, 22=2.6, 24=2.7, 26=2.8, 28=2.9
- id: color_temperature_set
  label: Set Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: 0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE
- id: overscan_set
  label: Set Overscan
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: Overscan value 0-20
- id: aspect_set
  label: Set Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: integer
      description: 0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX
- id: aspect_set_name
  label: Set Aspect Ratio (by name)
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: value
      type: string
      description: AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX
- id: source_select
  label: Select Source
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 4=ZONE.1.SECONDARY, 254=ALL, 255=CURRENT
    - name: source
      type: integer
      description: Source 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC
- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT
- id: audio_volume_set
  label: Set Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume value 0-100
- id: audio_volume_inc
  label: Increment Volume
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
- id: audio_volume_dec
  label: Decrement Volume
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
- id: audio_mute_set
  label: Set Mute
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: audio_treble_set
  label: Set Treble
  kind: action
  params:
    - name: value
      type: integer
      description: Treble value 0-100
- id: audio_bass_set
  label: Set Bass
  kind: action
  params:
    - name: value
      type: integer
      description: Bass value 0-100
- id: audio_balance_set
  label: Set Balance
  kind: action
  params:
    - name: value
      type: integer
      description: Balance value 0-100
- id: audio_speakers_set
  label: Enable Internal Speakers
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
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4
- id: audio_settings_set
  label: Set Audio Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone
    - name: volume
      type: integer
      description: Volume 0-100
    - name: treble
      type: integer
      description: Treble 0-100
    - name: bass
      type: integer
      description: Bass 0-100
    - name: balance
      type: integer
      description: Balance 0-100
    - name: mute
      type: integer
      description: 0=OFF, 1=ON
    - name: speakers
      type: integer
      description: 0=OFF, 1=ON
- id: display_power_set
  label: Set Display Power
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: auto_power_set
  label: Set Auto Power On
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON, 2=PREVIOUS.STATE
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
- id: backlight_intensity_set
  label: Set Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: Intensity value 1-100
- id: osd_allow_popup_set
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: value
      type: integer
      description: 0=NO, 1=YES
- id: osd_position_set
  label: Set Menu Position
  kind: action
  params:
    - name: value
      type: integer
      description: 0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT
- id: osd_transparency_set
  label: Set OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: Transparency value 0-100
- id: osd_timeout_set
  label: Set OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS
- id: osd_rotation_set
  label: Set OSD Rotation
  kind: action
  params:
    - name: value
      type: integer
      description: 0=LANDSCAPE, 1=PORTRAIT
- id: osd_close
  label: Close OSD
  kind: action
- id: splash_screen_set
  label: Set Splash Screen
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE
- id: blank_screen_color_set
  label: Set Blank Screen Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK
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
- id: pip_swap
  label: PIP Swap
  kind: action
- id: current_zone_set
  label: Set Current Zone
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4
- id: pattern_set
  label: Set Test Pattern
  kind: action
  params:
    - name: pattern
      type: integer
      description: 0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW
- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone 0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT
- id: reset_user
  label: Factory Reset (User)
  kind: action
  params:
    - name: scope
      type: integer
      description: 0=USER, 1=FACTORY1
- id: firmware_update
  label: Firmware Update
  kind: action
- id: system_reboot
  label: System Reboot
  kind: action
- id: preset_recall
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10
- id: preset_save
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10
- id: preset_delete
  label: Delete Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10
- id: preset_name_set
  label: Set Preset Name
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number 1-10
    - name: name
      type: string
      description: Preset name string
- id: key_send
  label: Send Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name (e.g. MENU, UP, DOWN, LEFT, RIGHT, ENTER, EXIT, MUTE, VOLUME.PLUS, VOLUME.MINUS, etc.)
- id: keypad_lock_set
  label: Set Keypad Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE
- id: ir_lock_set
  label: Set IR Remote Lock
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE
- id: ir_code_set
  label: Set IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: IR code value 0-65535
- id: rs232_lock_set
  label: Set RS232 Lock
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
- id: pixel_orbit_set
  label: Set Pixel Orbit
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: dp_type_set
  label: Set DisplayPort 1 Type
  kind: action
  params:
    - name: value
      type: integer
      description: 1=1.2, 2=1.4, 3=2.0
- id: dp2_type_set
  label: Set DisplayPort 2 Type
  kind: action
  params:
    - name: value
      type: integer
      description: 1=1.2, 2=1.4, 3=2.0
- id: edid_timing_update
  label: Update EDID Timing
  kind: action
  params:
    - name: input
      type: integer
      description: Input 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC
    - name: value
      type: integer
      description: -3=4K60, -2=4K30, -1=1080P
- id: edid_selected_connector_set
  label: Set EDID Zone
  kind: action
  params:
    - name: input
      type: integer
      description: 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC
- id: source_scan_set
  label: Set Auto Scan Sources
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON, 2=FAILOVER
- id: cec_enable_set
  label: Set HDMI CEC
  kind: action
  params:
    - name: value
      type: integer
      description: 0=DISABLE, 1=ENABLE
- id: cec_standby_set
  label: Set HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: display_name_set
  label: Set Display Name
  kind: action
  params:
    - name: name
      type: string
      description: Display name string
- id: language_set
  label: Set Language
  kind: action
  params:
    - name: value
      type: integer
      description: 0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE
- id: schedule_set
  label: Set Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot 1-10
    - name: param
      type: integer
      description: Parameter 0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE
    - name: value
      type: integer
      description: Parameter value
- id: schedule_action_set
  label: Set Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot 1-10
    - name: value
      type: integer
      description: 0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS
- id: schedule_day_set
  label: Set Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot 1-10
    - name: value
      type: integer
      description: 0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN
- id: schedule_frequency_set
  label: Set Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot 1-10
    - name: value
      type: integer
      description: 0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS
- id: time_set
  label: Set Time
  kind: action
  params:
    - name: param
      type: integer
      description: 0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE
    - name: value
      type: integer
      description: Time value
- id: timezone_set
  label: Set Time Zone
  kind: action
  params:
    - name: value
      type: string
      description: Timezone name (e.g. UTCP0000.LONDON.DUBLIN)
- id: network_ntp_set
  label: Set Use Network Time
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: ntp_server_set
  label: Set NTP Server
  kind: action
  params:
    - name: server
      type: string
      description: NTP server hostname
- id: dhcp_set
  label: Set DHCP
  kind: action
  params:
    - name: value
      type: integer
      description: 0=OFF, 1=ON
- id: ipv4_address_set
  label: Set IP Address (Static)
  kind: action
  params:
    - name: ip
      type: string
      description: Static IP address
- id: ipv4_gateway_set
  label: Set Default Gateway (Static)
  kind: action
  params:
    - name: gateway
      type: string
      description: Static gateway IP
- id: ipv4_netmask_set
  label: Set Subnet Mask (Static)
  kind: action
  params:
    - name: mask
      type: string
      description: Static subnet mask
- id: dns_server1_set
  label: Set DNS Server 1 (Static)
  kind: action
  params:
    - name: dns
      type: string
      description: Static DNS server
- id: dns_server2_set
  label: Set DNS Server 2 (Static)
  kind: action
  params:
    - name: dns
      type: string
      description: Static DNS server
- id: command_enable_set
  label: Set Network Commands
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
      description: Address or hostname to ping
- id: notification_email_set
  label: Set Notification Email
  kind: action
  params:
    - name: event
      type: integer
      description: Event 0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED
    - name: enable
      type: integer
      description: 0=DISABLE, 1=ENABLE
    - name: recipients
      type: string
      description: Recipients list string
    - name: message
      type: string
      description: Custom message string
- id: smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: integer
      description: Event 0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED
- id: colorspace_set
  label: Set Color Space
  kind: action
  params:
    - name: zone
      type: integer
      description: Mod 1: Zone 0 = ZONE.1, 1 = ZONE.2, 2 = ZONE.3, 3 = ZONE.4, 253 = ALL.INPUT, 254 = ALL, 255 = CURRENT
    - name: value_type
      type: integer
      description: Mod 2: Value Type 0 = SETTING, 1 = ACTUAL
    - name: value
      type: integer
      description: 0 = REC601, 1 = REC709, 2 = RGB, 3 = RGB.VIDEO, 4 = AUTO
```

## Feedbacks
```yaml
- id: brightness_state
  query_command: BRIGHTNESS?
  type: integer
  values: [0-100]
- id: contrast_state
  query_command: CONTRAST?
  type: integer
  values: [0-100]
- id: color_state
  query_command: COLOR?
  type: integer
  values: [0-100]
- id: tint_state
  query_command: TINT?
  type: integer
  values: [0-100]
- id: sharpness_state
  query_command: SHARPNESS?
  type: integer
  values: [0-5]
- id: gain_state
  query_command: GAIN?
  type: integer
  values: [0-200]
- id: offset_state
  query_command: OFFSET?
  type: integer
  values: [0-100]
- id: gamma_state
  query_command: GAMMA?
  type: integer
- id: color_temperature_state
  query_command: COLOR.TEMPERATURE?
  type: string
  values: [3200K, 5500K, 6500K, 7500K, 9300K, NATIVE]
- id: overscan_state
  query_command: OVERSCAN?
  type: integer
  values: [0-20]
- id: aspect_state
  query_command: ASPECT?
  type: string
  values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
- id: aspect_state_numeric
  query_command: ASPECT#
  type: integer
  values: [0-5]
- id: source_state
  query_command: SOURCE.SELECT?
  type: string
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
- id: audio_input_state
  query_command: AUDIO.INPUT?
  type: string
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
- id: audio_volume_state
  query_command: AUDIO.VOLUME?
  type: integer
  values: [0-100]
- id: audio_mute_state
  query_command: AUDIO.MUTE?
  type: integer
  values: [0, 1]
- id: audio_treble_state
  query_command: AUDIO.TREBLE?
  type: integer
  values: [0-100]
- id: audio_bass_state
  query_command: AUDIO.BASS?
  type: integer
  values: [0-100]
- id: audio_balance_state
  query_command: AUDIO.BALANCE?
  type: integer
  values: [0-100]
- id: audio_speakers_state
  query_command: AUDIO.SPEAKERS?
  type: integer
  values: [0, 1]
- id: audio_zone_state
  query_command: AUDIO.ZONE?
  type: string
  values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
- id: display_power_state
  query_command: DISPLAY.POWER?
  type: integer
  values: [0, 1]
- id: auto_power_state
  query_command: AUTO.ON?
  type: string
  values: [OFF, ON, PREVIOUS.STATE]
- id: power_save_mode_state
  query_command: POWER.SAVE.MODE?
  type: string
  values: [Disable, Power.Down, Wake.On.Signal]
- id: power_save_delay_state
  query_command: POWER.SAVE.DELAY?
  type: string
  values: [1.MINUTE, 5.MINUTES, 15.MINUTES, 30.MINUTES, 60.MINUTES]
- id: power_down_mode_state
  query_command: POWER.DOWN.MODE?
  type: string
  values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]
- id: backlight_intensity_state
  query_command: BACKLIGHT.INTENSITY?
  type: integer
  values: [1-100]
- id: system_state
  query_command: SYSTEM.STATE?
  type: string
  values: [STANDBY, ON]
- id: osd_status_state
  query_command: OSD.STATUS?
  type: string
  values: [ENABLE, DISABLE]
- id: osd_allow_popup_state
  query_command: OSD.ALLOW.POPUP?
  type: string
  values: [YES, NO]
- id: osd_position_state
  query_command: OSD.POSITION?
  type: string
  values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]
- id: osd_transparency_state
  query_command: OSD.TRANSPARENCY?
  type: integer
  values: [0-100]
- id: osd_timeout_state
  query_command: OSD.TIMEOUT?
  type: string
- id: osd_rotation_state
  query_command: ORIENTATION?
  type: string
  values: [LANDSCAPE, PORTRAIT]
- id: splash_screen_state
  query_command: SPLASH.SCREEN?
  type: string
  values: [ENABLE, DISABLE]
- id: blank_screen_color_state
  query_command: BLANK.COLOR?
  type: string
  values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]
- id: layout_state
  query_command: LAYOUT?
  type: string
  values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]
- id: multi_view_state
  query_command: MULTI.VIEW?
  type: string
  values: [SINGLE, DUAL, QUAD, PIP]
- id: pip_size_state
  query_command: PIP.SIZE?
  type: string
  values: [SMALL, MEDIUM, LARGE]
- id: current_zone_state
  query_command: CURRENT.ZONE?
  type: string
  values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
- id: current_zone_layout_state
  query_command: CURRENT.ZONE.LAYOUT?
  type: string
  values: [S.1, P.UL.1, P.UL.2, P.UR.1, P.UR.2, P.LL.1, P.LL.2, P.LR.1, P.LR.2, D.L.1, D.L.2, Q.1, Q.2, Q.3, Q.4]
- id: signal_info_state
  query_command: SIGNAL.INFO(CURRENT, HACTIVE)?
  type: string
  description: Returns image signal info (HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS)
- id: color_subsampling_state
  query_command: COLOR.SUBSAMPLING?
  type: string
  description: Returns color subsampling string (e.g. "4:4:4", "4:2:0")
- id: source_message_state
  query_command: SOURCE.MESSAGE?
  type: string
  description: Returns input resolution and frame rate, or "Searching"/"No Signal"
- id: preset_count_state
  query_command: PRESET.COUNT?
  type: integer
  values: [0+]
- id: preset_max_state
  query_command: PRESET.MAX?
  type: integer
- id: preset_full_state
  query_command: PRESET.FULL(4)?
  type: integer
  values: [0, 1]
- id: preset_list_state
  query_command: PRESET.LIST(FIRST)?
  type: string
- id: preset_name_state
  query_command: PRESET.NAME(4)?
  type: string
- id: model_id_state
  query_command: MODEL.ID?
  type: string
- id: model_series_state
  query_command: MODEL.SERIES?
  type: string
  description: Always returns "UltraRes P"
- id: serial_number_state
  query_command: SERIAL.NUMBER?
  type: string
- id: build_info_state
  query_command: BUILD.INFO?
  type: string
- id: network_mac_state
  query_command: NETWORK.MAC?
  type: string
- id: ipv4_address_state
  query_command: IPV4.ADDRESS?
  type: string
- id: ipv4_netmask_state
  query_command: IPV4.NETMASK?
  type: string
- id: ipv4_gateway_state
  query_command: IPV4.GATEWAY?
  type: string
- id: network_dhcp_state
  query_command: NETWORK.DHCP?
  type: string
  values: [ON, OFF]
- id: network_dns1_state
  query_command: NETWORK.DNS1?
  type: string
- id: network_dns2_state
  query_command: NETWORK.DNS2?
  type: string
- id: network_ntp_state
  query_command: NETWORK.NTP?
  type: string
  values: [ON, OFF]
- id: timezone_state
  query_command: TIMEZONE?
  type: string
- id: time_day_state
  query_command: TIME.DAY?
  type: string
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
- id: time_month_state
  query_command: TIME.MONTH?
  type: integer
  values: [1-12]
- id: time_string_state
  query_command: TIME.STRING?
  type: string
- id: schedule_description_state
  query_command: SCHEDULE.DESCRIPTION(3)?
  type: string
- id: network_ping_state
  type: string
  values: [SUCCESS, FAILED]
- id: error_response
  type: string
  values: [ERR 1, ERR 2, ERR 3, ERR 4, ERR 5, ERR 6]
  description: ERR 1=Invalid syntax, ERR 3=Command not recognized, ERR 4=Invalid modifier, ERR 5=Invalid operands, ERR 6=Invalid operator
```

## Variables
```yaml
# All settable/readable parameters are covered in Actions and Feedbacks.
# This section is not applicable for this device.
```

## Events
```yaml
# UNRESOLVED: The source does not describe unsolicited event notifications from the device.
# The device sends command responses but the document does not specify push-style events.
```

## Macros
```yaml
# UNRESOLVED: The source describes individual commands but no explicit multi-step macros.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Power Down Mode must be set to Networked Standby or Fast Startup before RS232 commands are accepted. Display will not respond to serial commands while in Standby.Mode."
    reference: "RS232 Port Setup section"
  - description: "Factory reset (FACTORY1) also resets EDID customizations, network settings and presets. Power cycle required to complete reset."
    reference: "RESET command notes"
```

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
  - https://www.planar.com/media/vpvn4yrs/020-1408-02b_ultrares-p-series-rs232-user-manual.pdf
retrieved_at: 2026-10-07T20:35:17.057Z
last_checked_at: 2026-10-07T20:35:17.057Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:35:17.057Z
matched_actions: 160
action_count: 160
confidence: medium
summary: "All 160 action units match source opcodes and operators, transport values are supported, and every source command row is represented in the spec. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "IP address configuration method via serial not described in source"
- "The source does not describe unsolicited event notifications from the device."
- "The source describes individual commands but no explicit multi-step macros."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
