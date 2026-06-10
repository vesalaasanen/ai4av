---
spec_id: admin/planar-psxx4kt-n-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar PS Series 4K (KT-N) Control Spec"
manufacturer: Planar
model_family: PS5074KT-N
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - PS5074KT-N
    - PS5574KT-N
    - PS6574KT-N
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/c1dgmc05/020-1389-00c_ps-series-4k_rs232-manual-wm.pdf
  - https://www.planar.com/media/438421/planar-ps-series-4k-displays-rs232-user-manual.pdf
  - https://www.planar.com/media/239622/ps-series_rs-232_manual_020-1156-00_reva_.pdf
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
  - https://www.planar.com/support/discontinued-products/large-format-lcd-displays/
retrieved_at: 2026-05-19T07:58:13.830Z
last_checked_at: 2026-06-10T00:04:46.096Z
generated_at: 2026-06-10T00:04:46.096Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "wireless / WiFi control not documented in source"
  - "source does not describe unsolicited event notifications"
  - "no explicit multi-step macro sequences described in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "WiFi control details not in source"
  - "SMTP server hostname/credentials not in source"
  - "alarm schedule / timer commands (daily/weekly) not enumerated as discrete macros"
verification:
  verdict: verified
  checked_at: 2026-06-10T00:04:46.096Z
  matched_actions: 94
  action_count: 94
  confidence: medium
  summary: "All 94 actions matched cleanly with correct shapes; source commands fully represented when grouped at spec's granularity (parameterized families). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Planar PS Series 4K (KT-N) Control Spec

## Summary
Planar PS Series 4K commercial displays support RS-232 serial and TCP/IP (Port 23) control. Commands follow parenthesized format with get/set/increment/decrement operands. No authentication required.

<!-- UNRESOLVED: wireless / WiFi control not documented in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # inferred from RS232 over LAN note
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
- id: power_on
  label: Power On
  kind: action
  params: []
- id: power_off
  label: Power Off
  kind: action
  params: []
- id: select_input
  label: Select Input
  kind: action
  params:
    - name: input
      type: integer
      description: Input index (0=VGA, 1=HDMI1, 2=HDMI2, 3=DP1, 4=Android, 5=Web Browser, 7=Android App)
- id: set_backlight
  label: Set Backlight
  kind: action
  params:
    - name: level
      type: integer
      description: Backlight level 15-100
- id: backlight_on
  label: Backlight On
  kind: action
  params: []
- id: backlight_off
  label: Backlight Off
  kind: action
  params: []
- id: set_brightness
  label: Set Brightness
  kind: action
  params:
    - name: level
      type: integer
      description: Brightness 0-100
- id: set_contrast
  label: Set Contrast
  kind: action
  params:
    - name: level
      type: integer
      description: Contrast 0-100
- id: set_sharpness
  label: Set Sharpness
  kind: action
  params:
    - name: level
      type: integer
      description: Sharpness 0-100
- id: set_hue
  label: Set Hue
  kind: action
  params:
    - name: level
      type: integer
      description: Hue 0-100
- id: set_saturation
  label: Set Saturation
  kind: action
  params:
    - name: level
      type: integer
      description: Saturation 0-100
- id: set_color_temp
  label: Set Color Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Color temp index (0=9300K, 1=6500K, 2=5000K, 3=User, 4=7500K, 5=3200K)
- id: set_gamma
  label: Set Gamma
  kind: action
  params:
    - name: gamma
      type: integer
      description: Gamma index 0-16
- id: set_red_gain
  label: Set Red Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Red gain 0-256
- id: set_green_gain
  label: Set Green Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Green gain 0-256
- id: set_blue_gain
  label: Set Blue Gain
  kind: action
  params:
    - name: value
      type: integer
      description: Blue gain 0-256
- id: set_red_offset
  label: Set Red Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Red offset 0-256
- id: set_green_offset
  label: Set Green Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Green offset 0-256
- id: set_blue_offset
  label: Set Blue Offset
  kind: action
  params:
    - name: value
      type: integer
      description: Blue offset 0-256
- id: set_phase
  label: Set Phase
  kind: action
  params:
    - name: value
      type: integer
      description: Phase 0-50
- id: set_clock
  label: Set Clock
  kind: action
  params:
    - name: value
      type: integer
      description: Clock 0-100
- id: set_horz_position
  label: Set Horizontal Position
  kind: action
  params:
    - name: value
      type: integer
      description: Horizontal position 0-100
- id: set_vert_position
  label: Set Vertical Position
  kind: action
  params:
    - name: value
      type: integer
      description: Vertical position 0-100
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []
- id: set_volume
  label: Set Volume
  kind: action
  params:
    - name: level
      type: integer
      description: Volume 0-100
- id: set_bass
  label: Set Bass
  kind: action
  params:
    - name: level
      type: integer
      description: Bass -50-50
- id: set_treble
  label: Set Treble
  kind: action
  params:
    - name: level
      type: integer
      description: Treble -50-50
- id: set_balance
  label: Set Balance
  kind: action
  params:
    - name: level
      type: integer
      description: Balance -50-50
- id: set_audio_source
  label: Set Audio Source
  kind: action
  params:
    - name: source
      type: integer
      description: Audio source index (0=Default, 1=Audio In)
- id: set_speakers
  label: Set Internal Speakers
  kind: action
  params:
    - name: state
      type: integer
      description: Speakers off=0, on=1
- id: set_mute
  label: Set Mute
  kind: action
  params:
    - name: state
      type: integer
      description: Mute off=0, on=1
- id: set_osd_transparency
  label: Set OSD Transparency
  kind: action
  params:
    - name: level
      type: integer
      description: OSD transparency 0-10
- id: set_osd_h_position
  label: Set OSD H Position
  kind: action
  params:
    - name: value
      type: integer
      description: OSD horizontal position 0-100
- id: set_osd_v_position
  label: Set OSD V Position
  kind: action
  params:
    - name: value
      type: integer
      description: OSD vertical position 0-100
- id: set_osd_rotation
  label: Set OSD Rotation
  kind: action
  params:
    - name: rotation
      type: integer
      description: OSD rotation (0=Landscape, 1=Portrait)
- id: set_osd_language
  label: Set OSD Language
  kind: action
  params:
    - name: lang
      type: integer
      description: Language index (0=English, 1=French, 2=German, 3=Spanish, 4=Chinese Traditional, 5=Chinese Simplified, 6=Japanese, 7=Italian, 8=Portuguese)
- id: set_osd_timeout
  label: Set OSD Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: OSD timeout (0=Off, 5, 10, 20, 30, 60 seconds)
- id: set_splash_screen
  label: Set Splash Screen
  kind: action
  params:
    - name: state
      type: integer
      description: Splash screen off=0, on=1
- id: set_message_box
  label: Set Message Box
  kind: action
  params:
    - name: state
      type: integer
      description: Message box off=0, on=1
- id: set_hdmi1_edid
  label: Set HDMI 1 EDID
  kind: action
  params:
    - name: edid
      type: integer
      description: HDMI1 EDID (1=HDMI1.4, 2=HDMI2.0)
- id: set_hdmi2_edid
  label: Set HDMI 2 EDID
  kind: action
  params:
    - name: edid
      type: integer
      description: HDMI2 EDID (1=HDMI1.4, 2=HDMI2.0)
- id: set_dp_edid
  label: Set DP EDID
  kind: action
  params:
    - name: edid
      type: integer
      description: DP EDID (1=4K30Hz, 2=4K60Hz)
- id: set_aspect_ratio
  label: Set Aspect Ratio
  kind: action
  params:
    - name: ratio
      type: integer
      description: Aspect ratio (1=Full Screen, 2=4:3, 8=Letterbox, 9=Native)
- id: set_overscan
  label: Set Overscan
  kind: action
  params:
    - name: level
      type: integer
      description: Overscan 0-10
- id: set_power_saving
  label: Set Power Saving Config
  kind: action
  params:
    - name: mode
      type: integer
      description: Power saving mode (0=Standby Mode, 1=Wake on All, 2=Always On, 3=Network Standby Mode)
- id: set_auto_scan
  label: Set Auto Scan
  kind: action
  params:
    - name: state
      type: integer
      description: Auto scan off=0, on=1
- id: set_pixel_orbit
  label: Set Pixel Orbit
  kind: action
  params:
    - name: state
      type: integer
      description: Pixel orbit off=0, on=1
- id: set_power_led
  label: Set Power LED
  kind: action
  params:
    - name: state
      type: integer
      description: Power LED off=0, on=1
- id: set_rgb_range
  label: Set RGB Color Range
  kind: action
  params:
    - name: range
      type: integer
      description: RGB range (2=0-255, 3=16-235, 4=Auto)
- id: set_touch_control
  label: Set Touch Control
  kind: action
  params:
    - name: mode
      type: integer
      description: Touch control (0=Auto, 1=Internal, 2=External)
- id: send_remote_key
  label: Send Remote Key
  kind: action
  params:
    - name: key
      type: integer
      description: Remote key code (0=Power, 1=Mute, 2-11=0-9, 12=Sleep, 13=Info, 14=Picture Mode, 15=Sound Mode, 16=Input source, 17=Auto, 18-23=Up/Down/Left/Right/Enter/Exit, 24=Menu, 25-26=Volume+/-, 27=Aspect Ratio, 28=Freeze, 29=Root)
- id: reset_all
  label: Reset All
  kind: action
  params: []
- id: set_key_lock
  label: Set Key Lock
  kind: action
  params:
    - name: lock
      type: integer
      description: Key lock (0=Unlock, 1=Lock)
- id: set_network_enable
  label: Set Network Enable
  kind: action
  params:
    - name: state
      type: integer
      description: Network enable off=0, on=1
- id: set_dhcp
  label: Set DHCP
  kind: action
  params:
    - name: state
      type: integer
      description: DHCP disable=0, enable=1
- id: set_power_status_alert
  label: Set Power Status Alert
  kind: action
  params:
    - name: state
      type: integer
      description: Power status alert off=0, on=1
- id: set_source_status_alert
  label: Set Source Status Alert
  kind: action
  params:
    - name: state
      type: integer
      description: Source status alert off=0, on=1
- id: set_signal_lost_alert
  label: Set Signal Lost Alert
  kind: action
  params:
    - name: state
      type: integer
      description: Signal lost alert off=0, on=1
- id: set_static_ip
  label: Set Static IP Address
  kind: action
  params:
    - name: octet
      type: integer
      description: IP octet number (1-4)
    - name: value
      type: integer
      description: IP octet value 0-255
- id: set_subnet_mask
  label: Set Subnet Mask
  kind: action
  params:
    - name: octet
      type: integer
      description: Subnet octet number (1-4)
    - name: value
      type: integer
      description: Subnet octet value 0-255
- id: set_gateway
  label: Set Gateway
  kind: action
  params:
    - name: octet
      type: integer
      description: Gateway octet number (1-4)
    - name: value
      type: integer
      description: Gateway octet value 0-255
- id: set_dns
  label: Set DNS Address
  kind: action
  params:
    - name: octet
      type: integer
      description: DNS octet number (1-4)
    - name: value
      type: integer
      description: DNS octet value 0-255
- id: save_static_ip_settings
  label: Save Static IP Settings
  kind: action
  params: []
- id: read_ethernet_mac
  label: Read Ethernet MAC
  kind: action
  params: []
- id: read_wifi_mac
  label: Read WiFi MAC
  kind: action
  params: []
- id: set_cec_enable
  label: Set CEC Enable
  kind: action
  params:
    - name: state
      type: integer
      description: CEC off=0, on=1
- id: set_auto_standby
  label: Set Auto Standby
  kind: action
  params:
    - name: state
      type: integer
      description: Auto standby off=0, on=1
- id: set_control_over_tcp
  label: Set Control Over TCP
  kind: action
  params:
    - name: state
      type: integer
      description: Control over TCP off=0, on=1
- id: set_24h_format
  label: Set 24-Hour Format
  kind: action
  params:
    - name: state
      type: integer
      description: 24-hour format off=0, on=1
- id: set_noise_reduction
  label: Set Noise Reduction
  kind: action
  params:
    - name: level
      type: integer
      description: Noise reduction (0=Off, 1=Low, 2=Medium, 3=High, 4=Auto)
- id: set_navigation_bar
  label: Set Navigation Bar
  kind: action
  params:
    - name: state
      type: integer
      description: Navigation bar off=0, on=1
- id: set_power_on_input
  label: Set Power On Input
  kind: action
  params:
    - name: input
      type: integer
      description: Power-on input index (0=VGA, 23=HDMI2, 24=HDMI1, 25=DP, 34=Android, 35=Web Browser, 44=Last Input)
- id: set_smart_light
  label: Set Smart Light Control
  kind: action
  params:
    - name: state
      type: integer
      description: Smart light off=0, on=1
- id: set_smtp_enable
  label: Set SMTP Enable
  kind: action
  params:
    - name: state
      type: integer
      description: SMTP enable off=0, on=1
- id: set_server_type
  label: Set Server Type
  kind: action
  params:
    - name: type
      type: integer
      description: Server type (0=Gmail, 1=Other)
- id: set_network_time
  label: Set Use Network Time
  kind: action
  params:
    - name: state
      type: integer
      description: Network time off=0, on=1
- id: set_wifi_hotspot
  label: Set WiFi Hotspot Enable
  kind: action
  params:
    - name: state
      type: integer
      description: WiFi hotspot disable=0, enable=1
- id: save_wifi_static_ip
  label: Save WLAN Static IP Settings
  kind: action
  params: []
- id: set_picture_mode
  label: Set Picture Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Picture mode (1=Standard, 2=Soft, 3=User, 7=Vivid, 8=Natural, 9=Sports)
- id: set_baud_rate
  label: Set Baud Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Baud rate index (0=9600, 1=19200, 2=38400, 3=115200)
- id: set_current_time_year
  label: Set Current Time Year
  kind: action
  params:
    - name: year
      type: integer
      description: Year value (e.g. 2019); range not documented
- id: set_current_time_month
  label: Set Current Time Month
  kind: action
  params:
    - name: month
      type: integer
      description: Month 1-12
- id: set_current_time_day
  label: Set Current Time Day
  kind: action
  params:
    - name: day
      type: integer
      description: Day 1-31
- id: set_current_time_hour
  label: Set Current Time Hour
  kind: action
  params:
    - name: hour
      type: integer
      description: Hour 0-23
- id: set_current_time_minute
  label: Set Current Time Minute
  kind: action
  params:
    - name: minute
      type: integer
      description: Minute 0-59
- id: set_timer_mode
  label: Set Timer Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: Timer mode (0=Everyday, 1=Workday, 2=User)
- id: set_alarm_enable
  label: Set Alarm Enable
  kind: action
  params:
    - name: day
      type: integer
      description: Day bitmask (1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday)
- id: set_alarm_disable
  label: Set Alarm Disable
  kind: action
  params:
    - name: day
      type: integer
      description: Day bitmask (1=Sunday, 2=Monday, 4=Tuesday, 8=Wednesday, 16=Thursday, 32=Friday, 64=Saturday)
- id: set_schedule_on_hour
  label: Set Schedule On Hour
  kind: action
  params:
    - name: day
      type: integer
      description: Day (0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)
    - name: hour
      type: integer
      description: On hour 0-23
- id: set_schedule_on_minute
  label: Set Schedule On Minute
  kind: action
  params:
    - name: day
      type: integer
      description: Day (0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)
    - name: minute
      type: integer
      description: On minute 0-59
- id: set_schedule_off_hour
  label: Set Schedule Off Hour
  kind: action
  params:
    - name: day
      type: integer
      description: Day (0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)
    - name: hour
      type: integer
      description: Off hour 0-23
- id: set_schedule_off_minute
  label: Set Schedule Off Minute
  kind: action
  params:
    - name: day
      type: integer
      description: Day (0=Sunday, 1=Monday, 2=Tuesday, 3=Wednesday, 4=Thursday, 5=Friday, 6=Saturday)
    - name: minute
      type: integer
      description: Off minute 0-59
- id: read_serial_number
  label: Read Serial Number
  kind: query
  params: []
- id: read_model_name
  label: Read Model Name
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  description: Power state via PWR query
- id: input_state
  type: enum
  values: [vga, hdmi1, hdmi2, dp1, android, web_browser, android_app]
  description: Current input source via INS query
- id: backlight_state
  type: enum
  values: [on, off]
  description: Backlight state via BLE query
- id: mute_state
  type: enum
  values: [on, off]
  description: Mute state via MUT query
- id: key_lock_state
  type: enum
  values: [locked, unlocked]
  description: Key lock state via KLO query
- id: error_response
  type: enum
  values: ["0=success", "1=unknown command", "2=invalid operator", "3=dest param not supported", "4=setting not available", "5=setting value not available", "6=setting value not supported", "7=string too long", "8=not supported in standby", "9=invalid parameter", "10=error processing", "11=password not entered"]
  description: Response codes from follower
```

## Variables
```yaml
- id: brightness
  type: integer
  range: [0, 100]
  description: Brightness level
- id: contrast
  type: integer
  range: [0, 100]
  description: Contrast level
- id: sharpness
  type: integer
  range: [0, 100]
  description: Sharpness level
- id: hue
  type: integer
  range: [0, 100]
  description: Hue level
- id: saturation
  type: integer
  range: [0, 100]
  description: Saturation level
- id: volume
  type: integer
  range: [0, 100]
  description: Volume level
- id: bass
  type: integer
  range: [-50, 50]
  description: Bass level
- id: treble
  type: integer
  range: [-50, 50]
  description: Treble level
- id: balance
  type: integer
  range: [-50, 50]
  description: Balance level
- id: backlight_level
  type: integer
  range: [15, 100]
  description: Backlight brightness level
- id: serial_number
  type: string
  description: Device serial number via ISN query
- id: model_name
  type: string
  description: Model name via MDL query
- id: firmware_version
  type: string
  description: Firmware version via IFV query
```

## Events
```yaml
# UNRESOLVED: source does not describe unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
# Note: RS232 and LAN do not work in Standby Mode if Power Saving Config is set to Standby Mode
# Note: LAN only responds to Wake-on-LAN magic packet in Networked Standby mode
```

## Notes
RS-232 commands over LAN achieved via TCP connection on Port 23. Command format: `(CMD Operand Value)` with CR terminator. Response format: `(ResponseCode;CMD=x=z)` with CR LF terminator. Response codes 0–11 defined. Increment/decrement operators available for most numeric params. No password required. Firmware-dependent commands may exist in later versions.
<!-- UNRESOLVED: WiFi control details not in source -->
<!-- UNRESOLVED: SMTP server hostname/credentials not in source -->
<!-- UNRESOLVED: alarm schedule / timer commands (daily/weekly) not enumerated as discrete macros -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/c1dgmc05/020-1389-00c_ps-series-4k_rs232-manual-wm.pdf
  - https://www.planar.com/media/438421/planar-ps-series-4k-displays-rs232-user-manual.pdf
  - https://www.planar.com/media/239622/ps-series_rs-232_manual_020-1156-00_reva_.pdf
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
  - https://www.planar.com/support/discontinued-products/large-format-lcd-displays/
retrieved_at: 2026-05-19T07:58:13.830Z
last_checked_at: 2026-06-10T00:04:46.096Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-10T00:04:46.096Z
matched_actions: 94
action_count: 94
confidence: medium
summary: "All 94 actions matched cleanly with correct shapes; source commands fully represented when grouped at spec's granularity (parameterized families). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "wireless / WiFi control not documented in source"
- "source does not describe unsolicited event notifications"
- "no explicit multi-step macro sequences described in source"
- "no explicit safety warnings or interlock procedures in source"
- "WiFi control details not in source"
- "SMTP server hostname/credentials not in source"
- "alarm schedule / timer commands (daily/weekly) not enumerated as discrete macros"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
