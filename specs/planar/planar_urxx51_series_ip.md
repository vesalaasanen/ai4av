---
schema_version: ai4av-public-spec-v1
device_id: planar/planar-ultrares-p-series
entity_id: planar_urxx51_series
spec_id: admin/planar-urxx51-series
revision: 1
author: admin
title: "Planar UltraRes P Series Control Spec"
status: published
manufacturer: Planar
manufacturer_key: planar
model_family: "Planar UltraRes P Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Planar UltraRes P Series"
    - URP552
  firmware: ""  # UNRESOLVED: firmware version not stated in source
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
last_checked_at: 2026-04-26T22:32:32.300Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware version not stated in source
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-26T22:32:32.300Z
  matched_actions: 116
  action_count: 116
  confidence: high
  summary: "All 116 spec actions have literal matches in the source command catalogue with consistent shapes and modifiers; transport parameters fully verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# Planar UltraRes P Series Control Spec

## Summary
The Planar UltraRes P Series is a professional-grade LCD display supporting multi-zone video wall configurations (up to 4 zones). Control is available via RS-232 serial and TCP/IP (Telnet port 23, SSH port 22). Authentication via username/password is required for network control. Power Down Mode must be set to Networked Standby or Fast Startup before RS-232 commands are accepted.

<!-- UNRESOLVED: SSH password format and token length not specified beyond "set via Remote Monitoring Software" -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet; SSH on port 22
auth:
  type: password
  username: admin  # default for Remote Monitoring Software
  ssh_username: root
# UNRESOLVED: SSH password not stated in source (set via Remote Monitoring Software)
# UNRESOLVED: port number for SSH is stated as 22; Telnet port 23 stated
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
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
      values:
        - "0"
        - "1"
      description: "0 = OFF, 1 = ON"

- id: reset
  label: Factory Reset
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - "0"
        - "1"
      description: "0 = USER, 1 = FACTORY1"

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
      description: Preset number (1-10)

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-10)

- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (1-10)

- id: system_reboot
  label: System Reboot
  kind: action
  params: []

- id: osd_close
  label: OSD Close
  kind: action
  params: []

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT)

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 255=CURRENT)

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
        - "9"
      description: "0=NONE, 1=BLACK, 2=WHITE, 3=GRAY, 4=RED, 5=GREEN, 6=BLUE, 7=CYAN, 8=MAGENTA, 9=YELLOW"

- id: key
  label: Send IR Key
  kind: action
  params:
    - name: key
      type: string
      description: Key name (e.g. MENU, UP, DOWN, VOLUME.PLUS, MUTE, HDMI1, HDMI2, etc.)

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: Brightness value (0-100)
    - name: zone
      type: integer
      description: Zone modifier (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT)

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: Contrast value (0-100)
    - name: zone
      type: integer
      description: Zone modifier

- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: Color value (0-100)
    - name: zone
      type: integer
      description: Zone modifier

- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: Tint value (0-100)
    - name: zone
      type: integer
      description: Zone modifier

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness value (0-5)

- id: volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume value (0-100)

- id: audio_mute
  label: Audio Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - "0"
        - "1"
      description: "0 = OFF, 1 = ON"

- id: treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: Treble value (0-100)

- id: bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: Bass value (0-100)

- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: Balance value (0-100)

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: source
      type: integer
      description: "Source: 1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC"
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 4=ZONE.1.SECONDARY, 254=ALL, 255=CURRENT)

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: Backlight intensity (1-100)

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "6"
        - "8"
        - "10"
        - "12"
        - "14"
        - "16"
        - "18"
        - "20"
        - "22"
        - "24"
        - "26"
        - "28"
      description: "6=1.8, 8=1.9, 10=2.0, 12=2.1, 14=2.2, 16=2.3, 18=2.4, 20=2.5, 22=2.6, 24=2.7, 26=2.8, 28=2.9"

- id: aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: value
      type: integer
      description: Overscan value (0-20)
    - name: zone
      type: integer
      description: Zone modifier

- id: gain
  label: Gain
  kind: action
  params:
    - name: values
      type: array
      items:
        type: integer
      description: "Red, Green, Blue gain (0-200 each); or single value for ALL"
    - name: zone
      type: integer
      description: Zone modifier
    - name: color
      type: integer
      description: Color modifier (0=RED, 1=GREEN, 2=BLUE, 255=ALL)

- id: offset
  label: Offset
  kind: action
  params:
    - name: values
      type: array
      items:
        type: integer
      description: "Red, Green, Blue offset (0-100 each); or single value for ALL"
    - name: zone
      type: integer
      description: Zone modifier
    - name: color
      type: integer
      description: Color modifier (0=RED, 1=GREEN, 2=BLUE, 255=ALL)

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
      description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"

- id: layout
  label: Layout
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "12"
      description: "0=SINGLE, 1=PIP.UL, 2=PIP.UR, 3=PIP.LL, 4=PIP.LR, 5=DUAL.L, 12=QUAD"

- id: multi_view
  label: Multi-Source View
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "3"
        - "4"
      description: "0=SINGLE, 1=DUAL, 3=QUAD, 4=PIP"

- id: pip_size
  label: PIP Size
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
      description: "0=SMALL, 1=MEDIUM, 2=LARGE"

- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
        - "8"
      description: "0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE"

- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "10"
        - "30"
        - "60"
        - "120"
        - "240"
      description: "0=OFF, 10=10.SECONDS, 30=30.SECONDS, 60=60.SECONDS, 120=120.SECONDS, 240=240.SECONDS"

- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: Transparency value (0-100)

- id: osd_position
  label: OSD Position
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
      description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"

- id: osd_rotation
  label: OSD Rotation
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=LANDSCAPE, 1=PORTRAIT"

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: blank_color
  label: Blank Screen Color
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
        - "7"
      description: "0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK"

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=NO, 1=YES"

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

- id: dp_type
  label: DisplayPort 1 Type
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "1"
        - "2"
        - "3"
      description: "1=1.2, 2=1.4, 3=2.0"

- id: dp2_type
  label: DisplayPort 2 Type
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "1"
        - "2"
        - "3"
      description: "1=1.2, 2=1.4, 3=2.0"

- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: key_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: lan_lock
  label: LAN Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: rs232_lock
  label: RS232 Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: usba_lock
  label: USB-A Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: cec_enable
  label: HDMI CEC Enable
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=DISABLE, 1=ENABLE"

- id: cec_standby
  label: HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: IR code value (0-65535)

- id: auto_power_on
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
      description: "0=OFF, 1=ON, 2=PREVIOUS.STATE"

- id: auto_scan_sources
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
      description: "0=OFF, 1=ON, 2=FAILOVER"

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
      description: "0=Disable, 1=Power.Down, 2=Wake.On.Signal"

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "60"
        - "300"
        - "900"
        - "1800"
        - "3600"
      description: "60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES"

- id: power_down_mode
  label: Power Down Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
      description: "0=Standby.Mode, 1=Networked.Standby.Mode, 2=Fast.Startup"

- id: audio_settings
  label: Audio Settings
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4)
    - name: volume
      type: integer
      description: Volume (0-100)
    - name: treble
      type: integer
      description: Treble (0-100)
    - name: bass
      type: integer
      description: Bass (0-100)
    - name: balance
      type: integer
      description: Balance (0-100)
    - name: mute
      type: integer
      description: Mute (0=OFF, 1=ON)
    - name: speakers
      type: integer
      description: Internal Speakers (0=OFF, 1=ON)

- id: audio_zone
  label: Audio Select
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

- id: current_zone
  label: Current Zone
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
      description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"

- id: edid_timing
  label: EDID Timing
  kind: action
  params:
    - name: input
      type: enum
      values:
        - "1"
        - "2"
        - "5"
        - "13"
        - "15"
      description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"
    - name: param
      type: enum
      values:
        - "0"
        - "12"
        - "13"
      description: "0=UPDATE, 12=FACTORY, 13=TYPE"
    - name: value
      type: integer
      description: "Signed integer: -3=4K60, -2=4K30, -1=1080P"

- id: edid_selected_connector
  label: EDID Zone
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "1"
        - "2"
        - "5"
        - "13"
        - "15"
      description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"

- id: ipv4_address
  label: IP Address
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0"
      description: "0=STATIC (omit for current read)"
    - name: address
      type: string
      description: IPv4 address string

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0"
      description: "0=STATIC (omit for current read)"
    - name: netmask
      type: string
      description: Subnet mask string

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0"
      description: "0=STATIC (omit for current read)"
    - name: gateway
      type: string
      description: Gateway IP string

- id: network_dhcp
  label: DHCP
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

- id: network_dns1
  label: DNS Server 1
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0"
      description: "0=STATIC (omit for current read)"
    - name: server
      type: string
      description: DNS server IP string

- id: network_dns2
  label: DNS Server 2
  kind: action
  params:
    - name: type
      type: enum
      values:
        - "0"
      description: "0=STATIC (omit for current read)"
    - name: server
      type: string
      description: DNS server IP string

- id: network_ntpserver
  label: NTP Server
  kind: action
  params:
    - name: server
      type: string
      description: NTP server hostname

- id: network_ntp
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

- id: timezone
  label: Timezone
  kind: action
  params:
    - name: value
      type: string
      description: Timezone name (e.g. UTCP0100.AMSTERDAM.BERLIN)

- id: time
  label: Time
  kind: action
  params:
    - name: component
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
      description: "0=YEAR, 1=MONTH, 2=DATE, 3=HOUR, 4=MINUTE"
    - name: value
      type: integer
      description: Unsigned integer value

- id: schedule
  label: Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot (1-10)
    - name: param
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
      description: "0=FREQ, 1=MINUTE, 2=HOUR, 3=DAY, 4=ACTION, 5=DATA, 6=ENABLE"
    - name: value
      type: integer
      description: Unsigned integer value

- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot (1-10)
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
      description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"

- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot (1-10)
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
        - "4"
        - "5"
        - "6"
      description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot (1-10)
    - name: value
      type: enum
      values:
        - "0"
        - "1"
        - "2"
        - "3"
      description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"

- id: display_name
  label: Display Name
  kind: action
  params:
    - name: name
      type: string
      description: Display name string

- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: event
      type: enum
      values:
        - "0"
        - "3"
        - "4"
      description: "0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
    - name: enable
      type: integer
      description: "0=DISABLE, 1=ENABLE"
    - name: recipients
      type: string
      description: Email recipients string
    - name: message
      type: string
      description: Custom message string

- id: command_enable
  label: Network Commands
  kind: action
  params:
    - name: service
      type: string
      description: "NETWORK"
    - name: value
      type: enum
      values:
        - "0"
        - "1"
      description: "0=OFF, 1=ON"

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
      type: enum
      values:
        - "0"
        - "3"
        - "4"
      description: "0=POWER.STATE.CHANGED, 3=SOURCE.LOST, 4=SOURCE.SELECTED"
- id: audio_input_query
  label: Query Audio Input Source
  kind: action
  params:
    - name: zone
      type: enum
      values: [ZONE.1, CURRENT]
  description: Returns source (HDMI.1, HDMI.2, DP, DP.2, USBC) for the zone playing audio

- id: colorspace_set
  label: Set/Query Color Space
  kind: action
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, CURRENT]
    - name: value_type
      type: enum
      values: [SETTING, ACTUAL]
    - name: value
      type: enum
      values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]

- id: color_subsampling_query
  label: Query Color Subsampling
  kind: action
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
  description: Returns string e.g. "4:4:4" or "4:2:0"

- id: current_zone_layout_query
  label: Query Current Zone Layout
  kind: action
  params: []
  description: Returns layout code e.g. S.1, P.UL.1, Q.1

- id: model_id_query
  label: Query Model ID
  kind: action
  params: []
  description: Returns model ID string; read-only

- id: model_series_query
  label: Query Model Series
  kind: action
  params: []
  description: Returns model series string; read-only

- id: network_mac_query
  label: Query MAC Address
  kind: action
  params: []
  description: Returns MAC address string e.g. "12:34:56:AB:CD:EF"

- id: osd_status_query
  label: Query OSD Status
  kind: action
  params: []
  description: Returns DISABLE or ENABLE

- id: preset_count_query
  label: Query Number of Non-Empty Presets
  kind: action
  params: []

- id: preset_full_query
  label: Query Whether Preset Slot Is Occupied
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot 1–10

- id: preset_list_query
  label: Query List of Saved Preset Slots
  kind: action
  params:
    - name: modifier
      type: string
      description: FIRST or a preset slot number

- id: preset_max_query
  label: Query Highest Saved Preset Number
  kind: action
  params: []

- id: preset_name_set
  label: Set/Query Preset Name
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot 1–10
    - name: name
      type: string
      description: Up to 12-character preset name string

- id: schedule_description_query
  label: Query Schedule Description String
  kind: action
  params:
    - name: slot
      type: integer
      description: Schedule slot 1–10

- id: serial_number_query
  label: Query Serial Number
  kind: action
  params: []
  description: Read-only

- id: signal_info_query
  label: Query Image/Signal Information
  kind: action
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
    - name: parameter
      type: enum
      values: [HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, COLORDEPTH, TMDS]

- id: source_message_query
  label: Query Source Message (Resolution/Frame Rate)
  kind: action
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]

- id: system_state_query
  label: Query System State
  kind: action
  params: []
  description: Returns STANDBY or ON

- id: time_day_query
  label: Query Current Day of Week
  kind: action
  params: []
  description: Returns MON, TUE, WED, THU, FRI, SAT, or SUN

- id: time_month_set
  label: Set/Query Current Month
  kind: action
  params:
    - name: month
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
```

## Feedbacks
```yaml
- id: system_state
  type: enum
  values:
    - "0"
    - "2"
  description: "0=STANDBY, 2=ON"

- id: display_power
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: brightness
  type: integer
  description: Brightness value (0-100)

- id: contrast
  type: integer
  description: Contrast value (0-100)

- id: color
  type: integer
  description: Color value (0-100)

- id: tint
  type: integer
  description: Tint value (0-100)

- id: sharpness
  type: integer
  description: Sharpness value (0-5)

- id: volume
  type: integer
  description: Volume value (0-100)

- id: audio_mute
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: treble
  type: integer
  description: Treble value (0-100)

- id: bass
  type: integer
  description: Bass value (0-100)

- id: balance
  type: integer
  description: Balance value (0-100)

- id: source_select
  type: enum
  values:
    - "1"
    - "2"
    - "5"
    - "13"
    - "14"
    - "15"
  description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 14=NONE, 15=USBC"

- id: audio_input
  type: enum
  values:
    - "1"
    - "2"
    - "5"
    - "13"
    - "15"
  description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"

- id: aspect
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
  description: "0=AUTO, 1=16X9, 2=4X3, 3=FILL, 4=NATIVE, 5=LETTERBOX"

- id: backlight_intensity
  type: integer
  description: Backlight intensity (1-100)

- id: gamma
  type: integer
  description: Gamma value mapping (6=1.8, 8=1.9, etc.)

- id: color_temperature
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
  description: "0=3200K, 1=5500K, 2=6500K, 3=7500K, 4=9300K, 5=NATIVE"

- id: gain
  type: string
  description: Gain values (Red Green Blue 0-200)

- id: offset
  type: string
  description: Offset values (Red Green Blue 0-100)

- id: colorspace
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
  description: "0=REC601, 1=REC709, 2=RGB, 3=RGB.VIDEO, 4=AUTO"

- id: color_subsampling
  type: string
  description: Color subsampling string (e.g. "4:4:4", "4:2:0")

- id: signal_info
  type: string
  description: Signal information (HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS)

- id: layout
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "12"
  description: "0=SINGLE, 1=PIP.UL, 2=PIP.UR, 3=PIP.LL, 4=PIP.LR, 5=DUAL.L, 12=QUAD"

- id: multi_view
  type: enum
  values:
    - "0"
    - "1"
    - "3"
    - "4"
  description: "0=SINGLE, 1=DUAL, 3=QUAD, 4=PIP"

- id: pip_size
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=SMALL, 1=MEDIUM, 2=LARGE"

- id: current_zone_layout
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
    - "9"
    - "10"
    - "28"
    - "29"
    - "30"
    - "31"
  description: "0=S.1, 1=P.UL.1, 2=P.UL.2, 3=P.UR.1, 4=P.UR.2, 5=P.LL.1, 6=P.LL.2, 7=P.LR.1, 8=P.LR.2, 9=D.L.1, 10=D.L.2, 28=Q.1, 29=Q.2, 30=Q.3, 31=Q.4"

- id: overscan
  type: integer
  description: Overscan value (0-20)

- id: source_message
  type: string
  description: Input resolution and frame rate, or "Searching"/"No Signal"

- id: model_id
  type: string
  description: Model identifier

- id: model_series
  type: string
  description: Always returns "UltraRes P"

- id: serial_number
  type: string
  description: Serial number

- id: build_info
  type: string
  description: Version info (VERSION.VP, VERSION.SUBMCU, VERSION.NETUART)

- id: network_mac
  type: string
  description: MAC address

- id: ipv4_address
  type: string
  description: IP address

- id: ipv4_netmask
  type: string
  description: Subnet mask

- id: ipv4_gateway
  type: string
  description: Default gateway

- id: network_dhcp
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: network_dns1
  type: string
  description: Primary DNS server

- id: network_dns2
  type: string
  description: Secondary DNS server

- id: network_ntpserver
  type: string
  description: NTP server

- id: timezone
  type: string
  description: Timezone name

- id: time
  type: integer
  description: Time component value

- id: time_day
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
  description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"

- id: time_month
  type: enum
  values:
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
    - "9"
    - "10"
    - "11"
    - "12"
  description: "1=JANUARY through 12=DECEMBER"

- id: time_string
  type: string
  description: Time string (e.g. "2015-09-01 13:21")

- id: preset_count
  type: integer
  description: Number of non-empty presets

- id: preset_max
  type: integer
  description: Highest saved preset number

- id: preset_full
  type: enum
  values:
    - "0"
    - "1"
  description: "0=NO, 1=YES"

- id: preset_list
  type: string
  description: List of saved presets

- id: preset_name
  type: string
  description: Preset name

- id: schedule_description
  type: string
  description: Schedule description string

- id: osd_status
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: language
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
    - "8"
  description: "0=ENGLISH, 1=FRENCH, 2=GERMAN, 3=SPANISH, 4=ITALIAN, 5=CHINESE.SIMPLIFIED, 6=CHINESE.TRADITIONAL, 7=PORTUGUESE, 8=JAPANESE"

- id: osd_timeout
  type: integer
  description: OSD timeout in seconds

- id: osd_transparency
  type: integer
  description: Transparency value (0-100)

- id: osd_position
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
  description: "0=CENTER, 1=UPPER.LEFT, 2=UPPER.RIGHT, 3=LOWER.LEFT, 4=LOWER.RIGHT"

- id: osd_rotation
  type: enum
  values:
    - "0"
    - "1"
  description: "0=LANDSCAPE, 1=PORTRAIT"

- id: splash_screen
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: blank_color
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
    - "7"
  description: "0=RED, 1=GREEN, 2=BLUE, 3=CYAN, 4=MAGENTA, 5=YELLOW, 6=WHITE, 7=BLACK"

- id: osd_allow_popup
  type: enum
  values:
    - "0"
    - "1"
  description: "0=NO, 1=YES"

- id: pixel_orbit
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: dp_type
  type: string
  description: "DisplayPort type: 1=1.2, 2=1.4, 3=2.0"

- id: dp2_type
  type: string
  description: "DisplayPort 2 type: 1=1.2, 2=1.4, 3=2.0"

- id: led_enable
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: ir_lock
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: key_lock
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: lan_lock
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: rs232_lock
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: usba_lock
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: cec_enable
  type: enum
  values:
    - "0"
    - "1"
  description: "0=DISABLE, 1=ENABLE"

- id: cec_standby
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: ir_code
  type: integer
  description: IR code value (0-65535)

- id: auto_power_on
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=OFF, 1=ON, 2=PREVIOUS.STATE"

- id: auto_scan_sources
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=OFF, 1=ON, 2=FAILOVER"

- id: power_save_mode
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=Disable, 1=Power.Down, 2=Wake.On.Signal"

- id: power_save_delay
  type: enum
  values:
    - "60"
    - "300"
    - "900"
    - "1800"
    - "3600"
  description: "60=1.MINUTE, 300=5.MINUTES, 900=15.MINUTES, 1800=30.MINUTES, 3600=60.MINUTES"

- id: power_down_mode
  type: enum
  values:
    - "0"
    - "1"
    - "2"
  description: "0=Standby.Mode, 1=Networked.Standby.Mode, 2=Fast.Startup"

- id: audio_zone
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"

- id: audio_speakers
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: current_zone
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"

- id: edid_timing
  type: string
  description: EDID timing type

- id: edid_selected_connector
  type: enum
  values:
    - "1"
    - "2"
    - "5"
    - "13"
    - "15"
  description: "1=HDMI.1, 2=HDMI.2, 5=DP, 13=DP.2, 15=USBC"

- id: network_ntp
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: display_name
  type: string
  description: Display name

- id: command_enable
  type: enum
  values:
    - "0"
    - "1"
  description: "0=OFF, 1=ON"

- id: notification_email
  type: string
  description: Notification email settings

- id: schedule_action
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=TURN.ON, 1=TURN.OFF, 2=RECALL, 3=PANEL.BRIGHTNESS"

- id: schedule_day
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
    - "4"
    - "5"
    - "6"
  description: "0=MON, 1=TUE, 2=WED, 3=THU, 4=FRI, 5=SAT, 6=SUN"

- id: schedule_frequency
  type: enum
  values:
    - "0"
    - "1"
    - "2"
    - "3"
  description: "0=DAILY, 1=WEEKLY, 2=WEEKDAYS, 3=WEEKENDS"
```

## Variables
```yaml
# UNRESOLVED: all settable parameters are represented as Actions with = operator.
# Variables section not separately applicable for this protocol.
```

## Events
```yaml
# UNRESOLVED: device sends no unsolicited notifications documented in source.
# Notifications are configured via NOTIFICATION.EMAIL but device-initiated events not documented.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  - RESET(FACTORY1)  # Factory reset requires power cycle to complete
interlocks:
  - Power Down Mode must be set to "Networked Standby" or "Fast Startup" before RS-232 commands are accepted.
# UNRESOLVED: firmware update safety procedures not documented in source beyond "FIRMWARE.UPDATE" command
```

## Notes

**Command Syntax:** Commands follow `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` format. Operators: `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement. Terminator: CR (0x0D), LF (0x0A), or `;`.

**Response Formats:**
- `:` prefix indicates response to `=?#+-`
- `@ACK` acknowledges action commands
- `^NAK` indicates negative acknowledgment
- `!ERR N` indicates error (ERR 1-6)

**Zones:** Up to 4 independent content zones per display (ZONE.1–ZONE.4), each with independent source, brightness, color, and other image settings.

**Network Control:** Telnet (port 23) and SSH (port 22) accept identical serial command set. IP control is disabled by default and must be enabled via Remote Monitoring Software.

**Error Codes:**
- ERR 1: Invalid syntax
- ERR 3: Command not recognized
- ERR 4: Invalid modifier
- ERR 5: Invalid operands
- ERR 6: Invalid operator

<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: SSH key fingerprint or certificate validation not documented -->
<!-- UNRESOLVED: command timing or latency specifications not stated -->
<!-- UNRESOLVED: EDID custom timing parameters not fully enumerated -->

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
last_checked_at: 2026-04-26T22:32:32.300Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-26T22:32:32.300Z
matched_actions: 116
action_count: 116
confidence: high
summary: "All 116 spec actions have literal matches in the source command catalogue with consistent shapes and modifiers; transport parameters fully verified."
```

## Known Gaps

```yaml
[]
```
