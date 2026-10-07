---
spec_id: admin/planar-urxero-p_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes P Series Control Spec"
manufacturer: Planar
model_family: URP492
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - URP492
    - URP492-ERO-T
    - URP552
    - URP552-ERO-T
    - URP652
    - URP652-ERO-T
    - URP752
    - URP752-ERO-T
    - URP862
    - URP862-ERO-T
    - URP982
    - URP982-ERO-T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-05-25T02:23:02.352Z
last_checked_at: 2026-10-07T21:09:49.968Z
generated_at: 2026-10-07T21:09:49.968Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "Telnet/SSH port enabling process not detailed in source — operator must use Remote Monitoring Software GUI"
  - "source mentions login credentials but does not specify auth type for TCP control"
  - "source does not document unsolicited event notifications from the display."
  - "Telnet/SSH port numbers could not be independently confirmed — source says port 23 for Telnet, port 22 for SSH but these were not stated as explicit defaults"
  - "specific network auth type (none, basic, digest) not stated in source"
  - "command timing requirements (inter-command delay) not documented in source"
  - "firmware version compatibility not stated in source"
  - "unsolicited event/notification mechanism not documented in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T21:09:49.968Z
  matched_actions: 112
  action_count: 112
  confidence: medium
  summary: "All 112 action units map to documented command codes with matching shapes; the serial and port transport values are stated in the source; the spec covers the command table. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-25
---

# Planar UltraRes P Series Control Spec

## Summary
Professional LCD display series supporting multi-zone video wall configurations (up to 4 zones). Control via RS-232 serial or TCP/IP network (Telnet/SSH). Same serial command set is used over both interfaces. Requires Remote Monitoring Software to enable network control ports.

<!-- UNRESOLVED: Telnet/SSH port enabling process not detailed in source — operator must use Remote Monitoring Software GUI -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23  # Telnet; SSH port 22 available separately
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: UNRESOLVED  # UNRESOLVED: source mentions login credentials but does not specify auth type for TCP control
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
        - 0 (OFF)
        - 1 (ON)
  example: "DISPLAY.POWER=ON"
  example_response: "DISPLAY.POWER:ON"
  available_in_standby: true

- id: auto_power_on
  label: Auto Power On
  kind: action
  params:
    - name: mode
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
        - 2 (PREVIOUS.STATE)
  example: "AUTO.ON=ON"
  example_response: "AUTO.ON:ON"
  available_in_standby: true

- id: system_reboot
  label: Reboot
  kind: action
  params: []
  example: "SYSTEM.REBOOT"
  example_response: "SYSTEM.REBOOT@ACK"

- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (USER)
        - 1 (FACTORY1)
  example: "RESET(USER)"
  example_response: "RESET(USER)@ACK"
  note: "Power cycle required to complete reset"

- id: firmware_update
  label: Firmware Update
  kind: action
  params: []
  example: "FIRMWARE.UPDATE"
  example_response: "FIRMWARE.UPDATE@ACK"

- id: source_select
  label: Source Select
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 4=ZONE.1.SECONDARY, 254=ALL, 255=CURRENT)
    - name: source
      type: enum
      values:
        - 1 (HDMI.1)
        - 2 (HDMI.2)
        - 5 (DP)
        - 13 (DP.2)
        - 14 (NONE)
        - 15 (USBC)
  example: "SOURCE.SELECT(ZONE.1)=HDMI.1"
  example_response: "SOURCE.SELECT(ZONE.1):HDMI.1"

- id: source_next
  label: Next Source
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 254=ALL, 255=CURRENT)
  example: "SOURCE.NEXT(ZONE.1)"
  example_response: "SOURCE.NEXT(ZONE.1)@ACK"

- id: preset_recall
  label: Preset Recall
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot number (1-10)
  example: "PRESET.RECALL(4)"
  example_response: "PRESET.RECALL(4)@ACK"

- id: preset_save
  label: Preset Save
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot number (1-10)
  example: "PRESET.SAVE(4)"
  example_response: "PRESET.SAVE(4)@ACK"

- id: preset_delete
  label: Preset Delete
  kind: action
  params:
    - name: slot
      type: integer
      description: Preset slot number (1-10)
  example: "PRESET.DELETE(4)"
  example_response: "PRESET.DELETE(4)@ACK"

- id: brightness
  label: Brightness
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT; default=CURRENT)
    - name: value
      type: integer
      description: Brightness value (0-100)
  example: "BRIGHTNESS=55"
  example_response: "BRIGHTNESS:55"

- id: contrast
  label: Contrast
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT; default=CURRENT)
    - name: value
      type: integer
      description: Contrast value (0-100)
  example: "CONTRAST=50"

- id: color
  label: Color
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: Color value (0-100)
  example: "COLOR=55"

- id: tint
  label: Tint
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: Tint value (0-100)
  example: "TINT=55"

- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: Sharpness value (0-5)
  example: "SHARPNESS=5"

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: Backlight intensity (1-100)
  example: "BACKLIGHT.INTENSITY=75"
  example_response: "BACKLIGHT.INTENSITY:75"

- id: volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume value (0-100)
  example: "AUDIO.VOLUME=50"
  example_response: "AUDIO.VOLUME:50"

- id: mute
  label: Mute
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "AUDIO.MUTE=ON"

- id: bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: Bass value (0-100)
  example: "AUDIO.BASS=50"

- id: treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: Treble value (0-100)
  example: "AUDIO.TREBLE=50"

- id: balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: Balance value (0-100)
  example: "AUDIO.BALANCE=50"

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: state
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "AUDIO.SPEAKERS=ON"

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
  example: "AUDIO.SETTINGS=2 51 52 53 54 0 1"

- id: gain
  label: Gain
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4, 253=ALL.INPUT, 254=ALL, 255=CURRENT)
    - name: color
      type: enum
      values:
        - 0 (RED)
        - 1 (GREEN)
        - 2 (BLUE)
        - 255 (ALL)
    - name: value
      type: integer
      description: Gain value (0-200 per channel)
  example: "GAIN(ZONE.1, RED)=100"

- id: offset
  label: Offset
  kind: action
  params:
    - name: zone
      type: integer
    - name: color
      type: enum
      values:
        - 0 (RED)
        - 1 (GREEN)
        - 2 (BLUE)
        - 255 (ALL)
    - name: value
      type: integer
      description: Offset value (0-100 per channel)
  example: "OFFSET(ZONE.1, RED)=50"

- id: gamma
  label: Gamma
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values:
        - 6 (1.8)
        - 8 (1.9)
        - 10 (2.0)
        - 12 (2.1)
        - 14 (2.2)
        - 16 (2.3)
        - 18 (2.4)
        - 20 (2.5)
        - 22 (2.6)
        - 24 (2.7)
        - 26 (2.8)
        - 28 (2.9)
  example: "GAMMA=2.2"

- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values:
        - 0 (3200K)
        - 1 (5500K)
        - 2 (6500K)
        - 3 (7500K)
        - 4 (9300K)
        - 5 (NATIVE)
  example: "COLOR.TEMPERATURE=6500K"

- id: colorspace
  label: Color Space
  kind: action
  params:
    - name: zone
      type: integer
    - name: value_type
      type: enum
      values:
        - 0 (SETTING)
        - 1 (ACTUAL)
    - name: value
      type: enum
      values:
        - 0 (REC601)
        - 1 (REC709)
        - 2 (RGB)
        - 3 (RGB.VIDEO)
        - 4 (AUTO)
  example: "COLORSPACE(ZONE.1, SETTING)=REC709"

- id: overscan
  label: Overscan
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: integer
      description: Overscan value (0-20)
  example: "OVERSCAN=5"

- id: aspect
  label: Aspect Ratio
  kind: action
  params:
    - name: zone
      type: integer
    - name: value
      type: enum
      values:
        - 0 (AUTO)
        - 1 (16X9)
        - 2 (4X3)
        - 3 (FILL)
        - 4 (NATIVE)
        - 5 (LETTERBOX)
  example: "ASPECT=16X9"

- id: layout
  label: Layout
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (SINGLE)
        - 1 (PIP.UL)
        - 2 (PIP.UR)
        - 3 (PIP.LL)
        - 4 (PIP.LR)
        - 5 (DUAL.L)
        - 12 (QUAD)
  example: "LAYOUT=PIP.UL"

- id: multi_view
  label: Multi-Source View
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (SINGLE)
        - 1 (DUAL)
        - 3 (QUAD)
        - 4 (PIP)
  example: "MULTI.VIEW=QUAD"

- id: pip_size
  label: PIP Size
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (SMALL)
        - 1 (MEDIUM)
        - 2 (LARGE)
  example: "PIP.SIZE=MEDIUM"

- id: pip_swap
  label: PIP Swap
  kind: action
  params: []
  example: "PIP.SWAP"
  example_response: "PIP.SWAP@ACK"

- id: current_zone
  label: Current Zone
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - 0 (ZONE.1)
        - 1 (ZONE.2)
        - 2 (ZONE.3)
        - 3 (ZONE.4)
  example: "CURRENT.ZONE=ZONE.1"

- id: osd_close
  label: OSD Close
  kind: action
  params: []
  example: "OSD.CLOSE"
  example_response: "OSD.CLOSE@ACK"

- id: osd_position
  label: OSD Position
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (CENTER)
        - 1 (UPPER.LEFT)
        - 2 (UPPER.RIGHT)
        - 3 (LOWER.LEFT)
        - 4 (LOWER.RIGHT)
  example: "OSD.POSITION=CENTER"

- id: osd_rotation
  label: OSD Rotation
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (LANDSCAPE)
        - 1 (PORTRAIT)
  example: "ORIENTATION=LANDSCAPE"

- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: Transparency value (0-100)
  example: "OSD.TRANSPARENCY=3"

- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 10 (10.SECONDS)
        - 30 (30.SECONDS)
        - 60 (60.SECONDS)
        - 120 (120.SECONDS)
        - 240 (240.SECONDS)
  example: "OSD.TIMEOUT=60.SECONDS"

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (NO)
        - 1 (YES)
  example: "OSD.ALLOW.POPUP=YES"

- id: blank_color
  label: Blank Screen Color
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (RED)
        - 1 (GREEN)
        - 2 (BLUE)
        - 3 (CYAN)
        - 4 (MAGENTA)
        - 5 (YELLOW)
        - 6 (WHITE)
        - 7 (BLACK)
  example: "BLANK.COLOR=BLUE"

- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "SPLASH.SCREEN=ENABLE"

- id: test_pattern
  label: Test Pattern
  kind: action
  params:
    - name: pattern
      type: enum
      values:
        - 0 (NONE)
        - 1 (BLACK)
        - 2 (WHITE)
        - 3 (GRAY)
        - 4 (RED)
        - 5 (GREEN)
        - 6 (BLUE)
        - 7 (CYAN)
        - 8 (MAGENTA)
        - 9 (YELLOW)
  example: "PATTERN(GRAYBAR)"
  example_response: "PATTERN(GRAYBAR)@ACK"

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "PIXEL.ORBIT=ON"

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params:
    - name: zone
      type: integer
  example: "REVERT.IMAGE.SETTINGS(ZONE.1)"
  example_response: "REVERT.IMAGE.SETTINGS(ZONE.1)@ACK"

- id: key
  label: Key
  kind: action
  params:
    - name: key
      type: enum
      values:
        - UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT
        - KEY.0-KEY.9, MUTE
        - STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT
        - ZONE1-ZONE4, PIP.MODE, PIP.SWAP
        - HDMI1, HDMI2, DISPLAY.PORT, USBC
        - And many others - see Key table (section 4.2)
  example: "KEY=MENU"
  example_response: "KEY:MENU"

- id: display_port_type
  label: DisplayPort 1 Type
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 1 (1.2)
        - 2 (1.4)
        - 3 (2.0)
  example: "DP.TYPE=1.2"

- id: display_port2_type
  label: DisplayPort 2 Type
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 1 (1.2)
        - 2 (1.4)
        - 3 (2.0)
  example: "DP2.TYPE=1.2"

- id: edid_timing
  label: EDID Timing
  kind: action
  params:
    - name: input
      type: enum
      values:
        - 1 (HDMI.1)
        - 2 (HDMI.2)
        - 5 (DP)
        - 13 (DP.2)
        - 15 (USBC)
    - name: param
      type: enum
      values:
        - 0 (UPDATE)
        - 12 (FACTORY)
        - 13 (TYPE)
    - name: value
      type: enum
      values:
        - -3 (4K60)
        - -2 (4K30)
        - -1 (1080P)
  example: "EDID.TIMING(HDMI.1, TYPE)?"
  example_response: "EDID.TIMING(HDMI.1 TYPE):4K60"
  note: "UPDATE modifier supports action operator"

- id: edid_selected_connector
  label: EDID Zone
  kind: action
  params:
    - name: connector
      type: enum
      values:
        - 1 (HDMI.1)
        - 2 (HDMI.2)
        - 5 (DP)
        - 13 (DP.2)
        - 15 (USBC)
  example: "EDID.SELECTEDCONNECTOR=HDMI.1"

- id: hdmi_cec_enable
  label: HDMI CEC
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "CEC.ENABLE=DISABLE"

- id: hdmi_cec_standby
  label: HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "CEC.STANDBY=OFF"

- id: power_down_mode
  label: Power Down Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (Standby.Mode)
        - 1 (Networked.Standby.Mode)
        - 2 (Fast.Startup)
  example: "POWER.DOWN.MODE?"
  note: "RS232 requires Networked Standby or Fast Startup"

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (Disable)
        - 1 (Power.Down)
        - 2 (Wake.On.Signal)
  example: "POWER.SAVE.MODE=Power.Down"

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 60 (1.MINUTE)
        - 300 (5.MINUTES)
        - 900 (15.MINUTES)
        - 1800 (30.MINUTES)
        - 3600 (60.MINUTES)
  example: "POWER.SAVE.DELAY=5.MINUTES"

- id: auto_scan_sources
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
        - 2 (FAILOVER)
  example: "SOURCE.SCAN=ON"

- id: command_enable
  label: Network Commands
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "COMMAND.ENABLE(NETWORK)=OFF"
  note: "Enables/disables network command ports"

- id: network_ping
  label: Network Ping
  kind: action
  params:
    - name: address
      type: string
  example: "NETWORK.PING=\"www.google.com\""
  example_response: "NETWORK.PING:\"SUCCESS\""

- id: network_dhcp
  label: DHCP
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "NETWORK.DHCP=ON"
  available_in_standby: true

- id: ipv4_address
  label: IP Address
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (STATIC)
        - (current for reads, STATIC for writes)
    - name: address
      type: string
  example: "IPV4.ADDRESS(STATIC)=\"192.168.12.12\""
  available_in_standby: true

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (STATIC)
    - name: mask
      type: string
  example: "IPV4.NETMASK(STATIC)=\"255.255.255.0\""
  available_in_standby: true

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (STATIC)
    - name: address
      type: string
  example: "IPV4.GATEWAY(STATIC)=\"192.168.12.1\""
  available_in_standby: true

- id: network_dns1
  label: DNS Server 1
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (STATIC)
    - name: address
      type: string
  example: "NETWORK.DNS1(STATIC)=\"8.8.8.8\""
  available_in_standby: true

- id: network_dns2
  label: DNS Server 2
  kind: action
  params:
    - name: type
      type: enum
      values:
        - 0 (STATIC)
    - name: address
      type: string
  example: "NETWORK.DNS2(STATIC)=\"8.8.4.4\""
  available_in_standby: true

- id: network_ntp_server
  label: NTP Server
  kind: action
  params:
    - name: address
      type: string
  example: "NETWORK.NTPSERVER=\"pool.ntp.org\""
  available_in_standby: true

- id: network_ntp
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (OFF)
        - 1 (ON)
  example: "NETWORK.NTP=ON"
  available_in_standby: true

- id: timezone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: enum
      values:
        - See timezone table (section 4.3) for full list
        - e.g. UTCM0800.PACIFIC.TIME (value 4)
  example: "TIMEZONE=UTCM0800.PACIFIC.TIME.US.CANADA"
  available_in_standby: true

- id: time_set
  label: Time
  kind: action
  params:
    - name: field
      type: enum
      values:
        - 0 (YEAR)
        - 1 (MONTH)
        - 2 (DATE)
        - 3 (HOUR)
        - 4 (MINUTE)
    - name: value
      type: integer
  example: "TIME(MONTH)=3"
  available_in_standby: true

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
        - 0 (FREQ)
        - 1 (MINUTE)
        - 2 (HOUR)
        - 3 (DAY)
        - 4 (ACTION)
        - 5 (DATA)
        - 6 (ENABLE)
    - name: value
      type: integer
  example: "SCHEDULE(3, ACTION)=0"
  available_in_standby: true

- id: schedule_action
  label: Schedule Action
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values:
        - 0 (TURN.ON)
        - 1 (TURN.OFF)
        - 2 (RECALL)
        - 3 (PANEL.BRIGHTNESS)
  example: "SCHEDULE.ACTION(3)=TURN.ON"
  available_in_standby: true

- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values:
        - 0 (MON)
        - 1 (TUE)
        - 2 (WED)
        - 3 (THU)
        - 4 (FRI)
        - 5 (SAT)
        - 6 (SUN)
  example: "SCHEDULE.DAY(3)=MON"
  available_in_standby: true

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
    - name: value
      type: enum
      values:
        - 0 (DAILY)
        - 1 (WEEKLY)
        - 2 (WEEKDAYS)
        - 3 (WEEKENDS)
  example: "SCHEDULE.FREQUENCY(3)=DAILY"
  available_in_standby: true

- id: notification_email
  label: Notification Event
  kind: action
  params:
    - name: event
      type: enum
      values:
        - 0 (POWER.STATE.CHANGED)
        - 3 (SOURCE.LOST)
        - 4 (SOURCE.SELECTED)
    - name: enable
      type: integer
      description: 0=DISABLE, 1=ENABLE
    - name: recipients
      type: string
    - name: message
      type: string
  example: "NOTIFICATION.EMAIL(SOURCE.DETECTED)=ENABLE, \"test@planar.com\", \"message\""
  available_in_standby: true

- id: network_smtp_test
  label: Test Email
  kind: action
  params:
    - name: event
      type: enum
      values:
        - 0 (POWER.STATE.CHANGED)
        - 3 (SOURCE.LOST)
        - 4 (SOURCE.SELECTED)
  example: "NETWORK.SMTP.TEST(SOURCE.LOST)"
  example_response: "NETWORK.SMTP.TEST(SOURCE.LOST)@ACK"
  available_in_standby: true

- id: display_name
  label: Display Name
  kind: action
  params:
    - name: name
      type: string
  example: "DISPLAY.NAME=\"Conference Room 1\""
  available_in_standby: true

- id: ir_code
  label: IR Code
  kind: action
  params:
    - name: value
      type: integer
      description: IR remote ID code (0-65535)
  example: "IR.CODE=12345"
  available_in_standby: true

- id: ir_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "IR.LOCK=ENABLE"
  available_in_standby: true

- id: key_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "KEY.LOCK=ENABLE"
  available_in_standby: true

- id: rs232_lock
  label: RS232 Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "RS232.LOCK=ENABLE"

- id: lan_lock
  label: LAN Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "LAN.LOCK=ENABLE"

- id: usba_lock
  label: USB-A Lock
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "USBA.LOCK=ENABLE"

- id: led_enable
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (DISABLE)
        - 1 (ENABLE)
  example: "LED.ENABLE=ENABLE"
  available_in_standby: true

- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: enum
      values:
        - 0 (ENGLISH)
        - 1 (FRENCH)
        - 2 (GERMAN)
        - 3 (SPANISH)
        - 4 (ITALIAN)
        - 5 (CHINESE.SIMPLIFIED)
        - 6 (CHINESE.TRADITIONAL)
        - 7 (PORTUGUESE)
        - 8 (JAPANESE)
  example: "LANGUAGE=ENGLISH"

- id: audio_zone
  label: Audio Select
  kind: action
  params:
    - name: zone
      type: enum
      values:
        - 0 (ZONE.1)
        - 1 (ZONE.2)
        - 2 (ZONE.3)
        - 3 (ZONE.4)
  example: "AUDIO.ZONE=ZONE.1"
  example_response: "AUDIO.ZONE:ZONE.1"
```

## Feedbacks
```yaml
- id: power_state
  label: Display Power State
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "DISPLAY.POWER?"
  note: "To check if backlight is on, see DISPLAY.POWER"

- id: system_state
  label: System State
  type: enum
  values: [0 (STANDBY), 2 (ON)]
  query: "SYSTEM.STATE?"
  query_command: "SYSTEM.STATE?"
  note: "STANDBY = lowest power mode; ON = system is on"

- id: audio_input
  label: Audio Input
  type: enum
  values: [1 (HDMI.1), 2 (HDMI.2), 5 (DP), 13 (DP.2), 15 (USBC)]
  query: "AUDIO.INPUT?"
  query_command: "AUDIO.INPUT?"

- id: audio_mute
  label: Mute State
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "AUDIO.MUTE?"

- id: audio_volume
  label: Volume
  type: integer
  range: [0, 100]
  query: "AUDIO.VOLUME?"

- id: audio_balance
  label: Balance
  type: integer
  range: [0, 100]
  query: "AUDIO.BALANCE?"

- id: audio_bass
  label: Bass
  type: integer
  range: [0, 100]
  query: "AUDIO.BASS?"

- id: audio_treble
  label: Treble
  type: integer
  range: [0, 100]
  query: "AUDIO.TREBLE?"

- id: audio_speakers
  label: Internal Speakers State
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "AUDIO.SPEAKERS?"

- id: brightness_value
  label: Brightness
  type: integer
  range: [0, 100]
  query: "BRIGHTNESS?"
  note: "Use numeric code 200"

- id: contrast_value
  label: Contrast
  type: integer
  range: [0, 100]
  query: "CONTRAST?"

- id: color_value
  label: Color
  type: integer
  range: [0, 100]
  query: "COLOR?"

- id: tint_value
  label: Tint
  type: integer
  range: [0, 100]
  query: "TINT?"

- id: sharpness_value
  label: Sharpness
  type: integer
  range: [0, 5]
  query: "SHARPNESS?"

- id: backlight_intensity_value
  label: Backlight Intensity
  type: integer
  range: [1, 100]
  query: "BACKLIGHT.INTENSITY?"

- id: gain_value
  label: Gain
  type: integer
  range: [0, 200]
  query: "GAIN?"

- id: offset_value
  label: Offset
  type: integer
  range: [0, 100]
  query: "OFFSET?"

- id: gamma_value
  label: Gamma
  type: enum
  query: "GAMMA?"

- id: color_temperature_value
  label: Color Temperature
  type: enum
  query: "COLOR.TEMPERATURE?"

- id: colorspace_value
  label: Color Space
  type: enum
  query: "COLORSPACE(CURRENT, ACTUAL)?"
  query_command: "COLORSPACE(CURRENT, ACTUAL)?"

- id: color_subsampling
  label: Color Subsampling
  type: string
  query: "COLOR.SUBSAMPLING?"
  query_command: "COLOR.SUBSAMPLING?"

- id: overscan_value
  label: Overscan
  type: integer
  range: [0, 20]
  query: "OVERSCAN?"

- id: aspect_value
  label: Aspect Ratio
  type: enum
  values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]
  query: "ASPECT?"
  query_command: "aspect?"
  note: "? returns name form, # returns numeric form"

- id: layout_value
  label: Layout
  type: enum
  values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]
  query: "LAYOUT?"

- id: multi_view_value
  label: Multi-Source View
  type: enum
  values: [SINGLE, DUAL, QUAD, PIP]
  query: "MULTI.VIEW?"

- id: pip_size_value
  label: PIP Size
  type: enum
  values: [SMALL, MEDIUM, LARGE]
  query: "PIP.SIZE?"

- id: current_zone_value
  label: Current Zone
  type: enum
  values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
  query: "CURRENT.ZONE?"

- id: current_zone_layout
  label: Current Zone Layout
  type: enum
  values: [S.1, P.UL.1, P.UL.2, P.UR.1, P.UR.2, P.LL.1, P.LL.2, P.LR.1, P.LR.2, D.L.1, D.L.2, Q.1, Q.2, Q.3, Q.4]
  query: "CURRENT.ZONE.LAYOUT?"
  query_command: "CURRENT.ZONE.LAYOUT?"
  note: "See layout table (section 4.1)"

- id: source_message
  label: Source Message
  type: string
  query: "SOURCE.MESSAGE?"
  query_command: "SOURCE.MESSAGE?"
  note: "Returns input resolution and frame rate, or 'Searching'/'No Signal'"

- id: source_select_value
  label: Source Select
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, NONE, USBC]
  query: "SOURCE.SELECT?"

- id: signal_info
  label: Signal Info
  type: integer
  query: "SIGNAL.INFO(CURRENT, HACTIVE)?"
  query_command: "SIGNAL.INFO(CURRENT, HACTIVE)?"
  note: "Params: HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS"

- id: auto_power_on_value
  label: Auto Power On
  type: enum
  values: [0 (OFF), 1 (ON), 2 (PREVIOUS.STATE)]
  query: "AUTO.ON?"

- id: auto_scan_sources_value
  label: Auto Scan Sources
  type: enum
  values: [0 (OFF), 1 (ON), 2 (FAILOVER)]
  query: "SOURCE.SCAN?"

- id: power_save_mode_value
  label: Power Saving Mode
  type: enum
  values: [0 (Disable), 1 (Power.Down), 2 (Wake.On.Signal)]
  query: "POWER.SAVE.MODE?"

- id: power_save_delay_value
  label: Power Saving Delay
  type: enum
  values: [60 (1.MINUTE), 300 (5.MINUTES), 900 (15.MINUTES), 1800 (30.MINUTES), 3600 (60.MINUTES)]
  query: "POWER.SAVE.DELAY?"

- id: power_down_mode_value
  label: Power Down Mode
  type: enum
  values: [0 (Standby.Mode), 1 (Networked.Standby.Mode), 2 (Fast.Startup)]
  query: "POWER.DOWN.MODE?"
  query_command: "POWER.DOWN.MODE?"

- id: network_dhcp_value
  label: DHCP
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "NETWORK.DHCP?"

- id: ipv4_address_value
  label: IP Address
  type: string
  query: "IPV4.ADDRESS?"

- id: ipv4_netmask_value
  label: Subnet Mask
  type: string
  query: "IPV4.NETMASK?"
  query_command: "IPV4.NETMASK?"

- id: ipv4_gateway_value
  label: Default Gateway
  type: string
  query: "IPV4.GATEWAY?"
  query_command: "IPV4.GATEWAY?"

- id: network_dns1_value
  label: DNS Server 1
  type: string
  query: "NETWORK.DNS1?"
  query_command: "NETWORK.DNS1?"

- id: network_dns2_value
  label: DNS Server 2
  type: string
  query: "NETWORK.DNS2?"
  query_command: "NETWORK.DNS2?"

- id: network_mac
  label: MAC Address
  type: string
  query: "NETWORK.MAC?"
  query_command: "NETWORK.MAC?"

- id: network_ntp_value
  label: Use Network Time
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "NETWORK.NTP?"

- id: network_ntp_server_value
  label: NTP Server
  type: string
  query: "NETWORK.NTPSERVER?"

- id: timezone_value
  label: Time Zone
  type: enum
  query: "TIMEZONE?"
  note: "See timezone table (section 4.3)"

- id: time_value
  label: Time
  type: integer
  query: "TIME?"
  note: "TIME(YEAR), TIME(MONTH), TIME(DATE), TIME(HOUR), TIME(MINUTE)"

- id: time_day_value
  label: Time Day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  query: "TIME.DAY?"
  query_command: "TIME.DAY?"

- id: time_month_value
  label: Time Month
  type: enum
  values: [JANUARY-DECEMBER]
  query: "TIME.MONTH?"

- id: time_string_value
  label: Time String
  type: string
  query: "TIME.STRING?"
  query_command: "TIME.STRING?"

- id: schedule_description
  label: Schedule Description
  type: string
  query: "SCHEDULE.DESCRIPTION(3)?"
  query_command: "SCHEDULE.DESCRIPTION(3)?"

- id: schedule_action_value
  label: Schedule Action
  type: enum
  values: [TURN.ON, TURN.OFF, RECALL, PANEL.BRIGHTNESS]
  query: "SCHEDULE.ACTION?"

- id: schedule_day_value
  label: Schedule Day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  query: "SCHEDULE.DAY?"

- id: schedule_frequency_value
  label: Schedule Frequency
  type: enum
  values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]
  query: "SCHEDULE.FREQUENCY?"

- id: preset_count
  label: Preset Count
  type: integer
  query: "PRESET.COUNT?"
  query_command: "PRESET.COUNT?"
  note: "Returns number of non-empty presets"

- id: preset_max
  label: Preset Max
  type: integer
  query: "PRESET.MAX?"
  query_command: "PRESET.MAX?"
  note: "Returns highest saved preset number"

- id: preset_full
  label: Preset Full
  type: enum
  values: [0 (NO), 1 (YES)]
  query: "PRESET.FULL(4)?"
  query_command: "PRESET.FULL(4)?"

- id: preset_list
  label: Preset List
  type: string
  query: "PRESET.LIST(FIRST)?"
  query_command: "PRESET.LIST(FIRST)?"

- id: preset_name
  label: Preset Name
  type: string
  query: "PRESET.NAME(4)?"

- id: display_name_value
  label: Display Name
  type: string
  query: "DISPLAY.NAME?"

- id: model_id
  label: Model ID
  type: string
  query: "MODEL.ID?"
  query_command: "MODEL.ID?"

- id: model_series
  label: Model Series
  type: string
  query: "MODEL.SERIES?"
  query_command: "MODEL.SERIES?"
  note: "Always returns 'UltraRes P'"

- id: serial_number
  label: Serial Number
  type: string
  query: "SERIAL.NUMBER?"
  query_command: "SERIAL.NUMBER?"

- id: build_info
  label: Version Info
  type: string
  query: "BUILD.INFO?"
  query_command: "BUILD.INFO?"
  note: "BUILD.INFO(4)=VERSION.VP, BUILD.INFO(10)=VERSION.SUBMCU, BUILD.INFO(11)=VERSION.NETUART"

- id: osd_status
  label: OSD Status
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "OSD.STATUS?"
  query_command: "OSD.STATUS?"
  note: "Indicates whether OSD is currently shown"

- id: osd_position_value
  label: OSD Position
  type: enum
  values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]
  query: "OSD.POSITION?"

- id: osd_rotation_value
  label: OSD Rotation
  type: enum
  values: [LANDSCAPE, PORTRAIT]
  query: "ORIENTATION?"

- id: osd_transparency_value
  label: OSD Transparency
  type: integer
  range: [0, 100]
  query: "OSD.TRANSPARENCY?"

- id: osd_timeout_value
  label: OSD Timeout
  type: enum
  values: [OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, 240.SECONDS]
  query: "OSD.TIMEOUT?"

- id: osd_allow_popup_value
  label: Allow Pop Up Messages
  type: enum
  values: [0 (NO), 1 (YES)]
  query: "OSD.ALLOW.POPUP?"

- id: blank_color_value
  label: Blank Screen Color
  type: enum
  values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]
  query: "BLANK.COLOR?"

- id: splash_screen_value
  label: Splash Screen
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "SPLASH.SCREEN?"

- id: led_enable_value
  label: Enable Status LED
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "LED.ENABLE?"

- id: ir_lock_value
  label: IR Remote Lock
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "IR.LOCK?"

- id: ir_code_value
  label: IR Code
  type: integer
  range: [0, 65535]
  query: "IR.CODE?"

- id: key_lock_value
  label: Keypad Lock
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "KEY.LOCK?"

- id: rs232_lock_value
  label: RS232 Lock
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "RS232.LOCK?"

- id: lan_lock_value
  label: LAN Lock
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "LAN.LOCK?"

- id: usba_lock_value
  label: USB-A Lock
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "USBA.LOCK?"

- id: command_enable_value
  label: Network Commands
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "COMMAND.ENABLE(NETWORK)?"

- id: hdmi_cec_enable_value
  label: HDMI CEC
  type: enum
  values: [0 (DISABLE), 1 (ENABLE)]
  query: "CEC.ENABLE?"

- id: hdmi_cec_standby_value
  label: HDMI CEC Standby
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "CEC.STANDBY?"

- id: dp_type_value
  label: DisplayPort 1 Type
  type: enum
  values: [1 (1.2), 2 (1.4), 3 (2.0)]
  query: "DP.TYPE?"

- id: dp2_type_value
  label: DisplayPort 2 Type
  type: enum
  values: [1 (1.2), 2 (1.4), 3 (2.0)]
  query: "DP2.TYPE?"

- id: pixel_orbit_value
  label: Pixel Orbit
  type: enum
  values: [0 (OFF), 1 (ON)]
  query: "PIXEL.ORBIT?"

- id: edid_timing_value
  label: EDID Timing
  type: enum
  values: [4K60, 4K30, 1080P]
  query: "EDID.TIMING(HDMI.1, TYPE)?"
  query_command: "EDID.TIMING(HDMI.1, TYPE)?"

- id: edid_selected_connector_value
  label: EDID Selected Connector
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
  query: "EDID.SELECTEDCONNECTOR?"

- id: language_value
  label: Language
  type: enum
  values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
  query: "LANGUAGE?"
```

## Variables
```yaml
# All settable/readable parameters are covered in Actions and Feedbacks above.
# No separate Variables section needed.
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications from the display.
# The display may send responses automatically, but no explicit event/async-notification
# mechanism is described.
```

## Macros
```yaml
# No explicit multi-step macros are documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "RS232 control requires Power Down Mode to be set to Networked Standby or Fast Startup"
    reference: "Section 1 - RS232 Port Setup"
  - description: "Factory reset (FACTORY1) requires a power cycle to complete the reset process"
    reference: "RESET command notes"
```

## Notes
Command syntax: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]`
- OPCODE: named (e.g. BRIGHTNESS) or numeric (e.g. 200)
- OPERATOR: `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement, `!` execute action
- TERM: carriage return (0x0D), line feed (0x0A), or semicolon
- Responses use `:` for success, `!ERR N` for errors, `@ACK` for action acknowledgement, `^NAK` for negative acknowledgement
- Error codes: ERR 1 (invalid syntax), ERR 3 (unknown command), ERR 4 (invalid modifier), ERR 5 (invalid operand), ERR 6 (invalid operator)

Network control: Telnet (port 23) and SSH (port 22) both transport the same serial command set. Both disabled by default — must enable via Remote Monitoring Software. Only one port can be enabled at a time.

Default credentials: admin / serial number (for Remote Monitoring Software). SSH default username: root.

<!-- UNRESOLVED: Telnet/SSH port numbers could not be independently confirmed — source says port 23 for Telnet, port 22 for SSH but these were not stated as explicit defaults -->
<!-- UNRESOLVED: specific network auth type (none, basic, digest) not stated in source -->
<!-- UNRESOLVED: command timing requirements (inter-command delay) not documented in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: unsolicited event/notification mechanism not documented in source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-05-25T02:23:02.352Z
last_checked_at: 2026-10-07T21:09:49.968Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T21:09:49.968Z
matched_actions: 112
action_count: 112
confidence: medium
summary: "All 112 action units map to documented command codes with matching shapes; the serial and port transport values are stated in the source; the spec covers the command table. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "Telnet/SSH port enabling process not detailed in source — operator must use Remote Monitoring Software GUI"
- "source mentions login credentials but does not specify auth type for TCP control"
- "source does not document unsolicited event notifications from the display."
- "Telnet/SSH port numbers could not be independently confirmed — source says port 23 for Telnet, port 22 for SSH but these were not stated as explicit defaults"
- "specific network auth type (none, basic, digest) not stated in source"
- "command timing requirements (inter-command delay) not documented in source"
- "firmware version compatibility not stated in source"
- "unsolicited event/notification mechanism not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
