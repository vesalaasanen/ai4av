---
spec_id: admin/planar-slm-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar Simplicity M Series Control Spec"
manufacturer: Planar
model_family: "Simplicity M Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "Simplicity M Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/foolqxpw/planar-simplicity-m-series_user-manual_slmxx-models.pdf
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
retrieved_at: 2026-04-29T11:49:31.376Z
last_checked_at: 2026-06-02T04:20:10.760Z
generated_at: 2026-06-02T04:20:10.760Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version ranges, exact electrical specs, and physical connector pinouts beyond what is shown"
  - "firmware version range, exact electrical ratings, factory defaults not enumerated"
verification:
  verdict: verified
  checked_at: 2026-06-02T04:20:10.760Z
  matched_actions: 86
  action_count: 86
  confidence: medium
  summary: "All 86 spec actions matched literally in the source command table; all transport parameters verified in protocol sections; complete bidirectional coverage. (2 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar Simplicity M Series Control Spec

## Summary
RS-232 / TCP / UDP / SSH control spec for Planar Simplicity M Series large-format LCD displays. ASCII command grammar `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` terminated by CR, LF, or `;`. TCP/UDP share the RS-232 command set on port 5000; SSH wraps the same set on port 2222 with password auth.

<!-- UNRESOLVED: firmware version ranges, exact electrical specs, and physical connector pinouts beyond what is shown -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
  - ssh
addressing:
  port: 5000  # TCP and UDP; SSH uses port 2222
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure for serial, TCP, or UDP
  # SSH (port 2222) requires password authentication configured on the device.
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
- id: aspect
  label: Aspect Ratio
  kind: action
  command: "ASPECT={value}"
  params:
    - name: value
      type: enum
      values: [FILL, "4X3", NATIVE, "21X9", CUSTOM]
      # numeric equivalents 1-5 also accepted

- id: audio_volume_line
  label: Audio Out (Line Out) Volume
  kind: action
  command: "AUDIO.VOLUME.LINE={level}"
  params:
    - name: level
      type: integer
      range: 0-100

- id: audio_out_sync
  label: Audio Out Sync
  kind: action
  command: "AUDIO.OUT.SYNC={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1

- id: auto_adjust
  label: Auto Adjust
  kind: action
  command: "AUTO.ADJUST"
  params: []

- id: auto_on
  label: Auto Power On
  kind: action
  command: "AUTO.ON={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON, LAST.STATUS]
      # numeric equivalents 0-2

- id: source_scan
  label: Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]
      # numeric equivalents 0-2

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={level}"
  params:
    - name: level
      type: integer
      range: 1-100

- id: panel_saving_backlight
  label: Backlight Panel Saving
  kind: action
  command: "PANEL.SAVING.BACKLIGHT={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1

- id: audio_balance
  label: Balance
  kind: action
  command: "AUDIO.BALANCE={level}"
  params:
    - name: level
      type: integer
      range: 0-100

- id: audio_bass
  label: Bass
  kind: action
  command: "AUDIO.BASS={level}"
  params:
    - name: level
      type: integer
      range: 0-100

- id: boot_source_input
  label: Boot Source Input
  kind: action
  command: "BOOT.SOURCE.INPUT={source}"
  params:
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]
      # numeric equivalents 1, 2, 7-12, 15

- id: boot_source_last
  label: Boot Source Last Input
  kind: action
  command: "BOOT.SOURCE.LAST={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1

- id: boot_source_playlist
  label: Boot Source Playlist
  kind: action
  command: "BOOT.SOURCE.PLAYLIST={index}"
  params:
    - name: index
      type: integer
      range: 0-7

- id: brightness
  label: Brightness
  kind: action
  command: "BRIGHTNESS={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -  (read with ?, #; increment with +, decrement with -)

- id: color
  label: Color
  kind: action
  command: "COLOR={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: colorspace
  label: Color Space
  kind: action
  command: "COLORSPACE={value}"
  params:
    - name: value
      type: enum
      values: [SETTING, ACTUAL, RGB, RGB.VIDEO, AUTO]
      # Modifiers: SETTING (0) or ACTUAL (1) for value type
  # Operators: = ? + -

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE={value}"
  params:
    - name: value
      type: enum
      values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]
      # numeric equivalents 0-7
  # Operators: = ? + -

- id: contrast
  label: Contrast
  kind: action
  command: "CONTRAST={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: custom_zoom
  label: Custom Zoom
  kind: action
  command: "CUSTOM.ZOOM({axis})={value}"
  params:
    - name: axis
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]
      # numeric equivalents 0-4
    - name: value
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  command: 'IPV4.GATEWAY(STATIC)="{address}"'
  params:
    - name: address
      type: string
  # Modifier STATIC (0) required for write; None (Current) for read.
  # Operators: = ?

- id: network_dhcp
  label: DHCP
  kind: action
  command: "NETWORK.DHCP={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: display_power
  label: Display Power
  kind: action
  command: "DISPLAY.POWER={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?
  # Available in Standby: yes

- id: network_dns1
  label: DNS Server 1
  kind: action
  command: 'NETWORK.DNS1(STATIC)="{address}"'
  params:
    - name: address
      type: string
  # Modifier STATIC (0) required for write.
  # Operators: = ?

- id: network_dns2
  label: DNS Server 2
  kind: action
  command: 'NETWORK.DNS2(STATIC)="{address}"'
  params:
    - name: address
      type: string
  # Modifier STATIC (0) required for write.
  # Operators: = ?

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: led_enable
  label: Enable Status LED
  kind: action
  command: "LED.ENABLE={value}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
      # numeric equivalents 0-1
  # Operators: = ?

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})"
  params:
    - name: scope
      type: enum
      values: [USER, PICTURE, AUDIO, CONFIG1, CONFIG2, ADV.SETTINGS, SCREEN]
      # numeric equivalents 0, 5-10
  # Operator: ! (execute, no operator symbol)

- id: failover_source
  label: Failover Source
  kind: action
  command: "FAILOVER.SOURCE({slot})={source}"
  params:
    - name: slot
      type: integer
      range: 1-9
      # 255 or None = ALL
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
      # numeric equivalents 1, 2, 7-12, 15
  # Operators: = ?

- id: gain
  label: Gain
  kind: action
  command: "GAIN({color})={value}"
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
      # numeric equivalents 0, 1, 2, 255
    - name: value
      type: integer
      range: 0-255
  # For RED/GREEN/BLUE: one operand 0-255. For ALL: three operands red green blue.
  # Operators: = ? + -

- id: gamma
  label: Gamma
  kind: action
  command: "GAMMA={value}"
  params:
    - name: value
      type: enum
      values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", NATIVE, SGAMMA, DIMAGE]
      # numeric equivalents 6, 8, 10, 12, 14, 16, 18, 20, 27, 28, 29
  # Operators: = ? + -

- id: cec_enable
  label: HDMI CEC
  kind: action
  command: "CEC.ENABLE={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: cec_standby
  label: HDMI CEC Standby
  kind: action
  command: "CEC.STANDBY={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: hdmi_version
  label: HDMI Version
  kind: action
  command: "HDMI.VERSION={value}"
  params:
    - name: value
      type: enum
      values: [HDMI14, HDMI20]
      # numeric equivalents 0-1
  # Operators: = ?

- id: pan
  label: Image Position
  kind: action
  command: "PAN({axis})={value}"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]
      # numeric equivalents 0, 1, 255
    - name: value
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: info_timeout
  label: Information OSD Timeout
  kind: action
  command: "INFO.TIMEOUT={seconds}"
  params:
    - name: seconds
      type: integer
      range: 0-60
  # Operators: = ? + -

- id: ipv4_address
  label: IP Address
  kind: action
  command: 'IPV4.ADDRESS(STATIC)="{address}"'
  params:
    - name: address
      type: string
  # Modifier STATIC (0) required for write.
  # Operators: = ?

- id: ir_lock
  label: IR Remote Lock
  kind: action
  command: "IR.LOCK={value}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
      # numeric equivalents 0-4
  # Operators: = ?

- id: key
  label: Key
  kind: action
  command: "KEY={keycode}"
  params:
    - name: keycode
      type: enum
      values: [UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.1, KEY.2, KEY.3, KEY.4, KEY.5, KEY.6, KEY.7, KEY.8, KEY.9, MUTE, KEY.0, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1, PRESET2, PRESET3, PRESET4, ZONE1, ZONE2, ZONE3, ZONE4, PIP.MODE, PIP.SWAP, HDMI1, HDMI2, HDMI3, HDMI4, DISPLAY.PORT, DVI, VGA, OPS, WALL, COLOR, MISC, ARROW.LEFT, ARROW.RIGHT, STAR.STAR]
      # numeric equivalents 0-6, 9, 12-26, 32, 256-285
  # Operator: = (Available in Standby: yes, for power on and power toggle only)

- id: key_lock
  label: Keypad Lock
  kind: action
  command: "KEY.LOCK={value}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
      # numeric equivalents 0-4
  # Operators: = ?

- id: language
  label: Language
  kind: action
  command: "LANGUAGE={value}"
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
      # numeric equivalents 0-8
  # Operators: = ?

- id: network_mac
  label: MAC Address
  kind: query
  command: "NETWORK.MAC?"
  params: []

- id: volume_max
  label: Maximum Volume
  kind: action
  command: "VOLUME.MAX={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: osd_position
  label: Menu Position
  kind: action
  command: "OSD.POSITION({axis})={value}"
  params:
    - name: axis
      type: enum
      values: [X, Y, ALL]
      # numeric equivalents 0, 1, 255
    - name: value
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: volume_min
  label: Minimum Volume
  kind: action
  command: "VOLUME.MIN={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: model_id
  label: Model ID
  kind: query
  command: "MODEL.ID?"
  params: []

- id: model_series
  label: Model Series
  kind: query
  command: "MODEL.SERIES?"
  params: []
  # Always returns "Simplicity" for this product.

- id: monitor_id
  label: Monitor ID
  kind: action
  command: "MONITOR.ID={id}"
  params:
    - name: id
      type: integer
      range: 1-255
  # Operators: = ? + -

- id: audio_mute
  label: Mute
  kind: action
  command: "AUDIO.MUTE={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "NOISE.REDUCTION={value}"
  params:
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]
      # numeric equivalents 0-3
  # Operators: = ?

- id: network_ntpserver
  label: NTP Server
  kind: action
  command: 'NETWORK.NTPSERVER="{server}"'
  params:
    - name: server
      type: string
  # Default = "0.pool.ntp.org"
  # Operators: = ?

- id: off_timer
  label: Off Timer
  kind: action
  command: "OFF.TIMER={hours}"
  params:
    - name: hours
      type: integer
      range: 0-24
  # Operators: = ? + -

- id: uptime
  label: Operation Hours
  kind: query
  command: "UPTIME?"
  params: []

- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE"
  params: []
  # Operator: ! (execute)

- id: orientation
  label: OSD Rotation
  kind: action
  command: "ORIENTATION={value}"
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]
      # numeric equivalents 0-1
  # Operators: = ?

- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={seconds}"
  params:
    - name: seconds
      type: enum
      values: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120]
      # 0 = OFF, 5-120 in increments of 5
  # Operators: = ? + -

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={value}"
  params:
    - name: value
      type: integer
      range: 0-100
      # 0 = OFF, 5-100 in increments of 5
  # Operators: = ? + -

- id: overscan
  label: Overscan
  kind: action
  command: "OVERSCAN={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: phase
  label: Phase
  kind: action
  command: "PHASE={value}"
  params:
    - name: value
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: power_down_mode
  label: Power Down Mode
  kind: action
  command: "POWER.DOWN.MODE={value}"
  params:
    - name: value
      type: enum
      values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]
      # numeric equivalents 0, 1, 3, 4
  # Operators: = ?

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS"
  params: []
  # Operator: ! (execute)

- id: schedule
  label: Schedule
  kind: action
  command: "SCHEDULE({slot},{param})={value}"
  params:
    - name: slot
      type: integer
      range: 1-7
    - name: param
      type: enum
      values: [FREQ, MINUTE, HOUR, ENABLE, END.MINUTE, END.HOUR, INPUT, PLAYLIST, DAY.MON, DAY.TUE, DAY.WED, DAY.THU, DAY.FRI, DAY.SAT, DAY.SUN, END.TIME.NEXT.DAY, ALL]
      # numeric equivalents 0-15, None = ALL
    - name: value
      type: unsigned_integer
  # Operators: = ?

- id: schedule_day
  label: Schedule Day
  kind: action
  command: "SCHEDULE.DAY({slot},{day})={value}"
  params:
    - name: slot
      type: integer
      range: 1-7
    - name: day
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
      # numeric equivalents 0-6
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({slot})={value}"
  params:
    - name: slot
      type: integer
      range: 1-7
    - name: value
      type: enum
      values: [ONCE, EVERY.WEEK]
      # numeric equivalents 0-1
  # Operators: = ?

- id: schedule_input
  label: Schedule Input
  kind: action
  command: "SCHEDULE.INPUT({slot})={source}"
  params:
    - name: slot
      type: integer
      range: 1-7
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
      # numeric equivalents 1, 2, 7-12, 15
  # Operators: = ? + -

- id: serial_number
  label: Serial Number
  kind: query
  command: "SERIAL.NUMBER?"
  params: []

- id: sharpness
  label: Sharpness
  kind: action
  command: "SHARPNESS={level}"
  params:
    - name: level
      type: integer
      range: 0-100
      # increments of 10
  # Operators: = ? + -

- id: smart_power
  label: Smart Power
  kind: action
  command: "SMART.POWER={value}"
  params:
    - name: value
      type: enum
      values: [OFF, MEDIUM, HIGH]
      # numeric equivalents 0-2
  # Operators: = ?

- id: source_message
  label: Source Message
  kind: query
  command: "SOURCE.MESSAGE?"
  params: []
  # Returns resolution and frame rate, or "Searching" / "No Signal".

- id: source_select
  label: Source Select
  kind: action
  command: "SOURCE.SELECT={source}"
  params:
    - name: source
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
      # numeric equivalents 1, 2, 7-12, 15
  # Operators: = ? + -

- id: splash_screen
  label: Splash Screen
  kind: action
  command: "SPLASH.SCREEN={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON, USER]
      # numeric equivalents 0-2
  # Operators: = ? + -

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  command: 'IPV4.NETMASK(STATIC)="{mask}"'
  params:
    - name: mask
      type: string
  # Modifier STATIC (0) required for write.
  # Operators: = ?

- id: system_reboot
  label: System Reboot
  kind: action
  command: "SYSTEM.REBOOT"
  params: []
  # Operator: ! (execute)

- id: system_state
  label: System State
  kind: query
  command: "SYSTEM.STATE?"
  params: []
  # Returns: STANDBY, POWERING.ON, ON, POWERING.DOWN
  # Available in Standby: yes

- id: temperature
  label: Thermal Status
  kind: query
  command: "TEMPERATURE?"
  params: []
  # Returns string like "41.50°C 106.70°F"

- id: time
  label: Time
  kind: action
  command: "TIME({field})={value}"
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE, ALL]
      # numeric equivalents 0-4, None = ALL
    - name: value
      type: unsigned_integer
  # Operators: = ?

- id: time_day
  label: Time Day
  kind: query
  command: "TIME.DAY?"
  params: []
  # Returns: MON, TUE, WED, THU, FRI, SAT, SUN

- id: time_month
  label: Time Month
  kind: action
  command: "TIME.MONTH={value}"
  params:
    - name: value
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
      # numeric equivalents 1-12
  # Operators: = ?

- id: time_string
  label: Time String
  kind: query
  command: "TIME.STRING?"
  params: []
  # Returns string like "2015-09-01 13:21"

- id: timezone
  label: Time Zone
  kind: action
  command: "TIMEZONE={value}"
  params:
    - name: value
      type: enum
      values: [UTCM1100.MIDWAY.ISLAND, UTCM1000.HAWAII, UTCM0900.ALASKA, UTCM0800.PACIFIC.TIME, UTCM0800.TIJUANA, UTCM0700.ARIZONA, UTCM0700.CHIHUAHUA, UTCM0700.MOUNTAIN.TIME, UTCM0600.CENTRAL.AMERICA, UTCM0600.CENTRAL.TIME, UTCM0600.MEXICO.CITY, UTCM0600.SASKATCHEWAN, UTCM0500.BOGOTA, UTCM0500.EASTERN.TIME, UTCM0400.VENEZUELA, UTCM0400.ATLANTIC.TIME.BARBADOS, UTCM0400.ATLANTIC.TIME.CANADA, UTCM0400.MANAUS, UTCM0400.SANTIAGO, UTCM0330.NEWFOUNDLAND, UTCM0300.BRASILIA, UTCM0300.BUENOS.AIRES, UTCM0300.GREENLAND, UTCM0300.MONTEVIDEO, UTCM0200.MID.ATLANTIC, UTCM0100.AZORES, UTCM0100.CAPE.VERDE.ISLANDS, UTCP0000.CASABLANCA, UTCP0000.LONDON.DUBLIN, UTCP0100.AMSTERDAM.BERLIN, UTCP0100.BELGRADE, UTCP0100.BRUSSELS, UTCP0100.SARAJEVO, UTCP0100.WINDHOEK, UTCP0100.W.AFRICA.TIME, UTCP0200.AMMAN.JORDAN, UTCP0200.ATHENS.ISTANBUL, UTCP0200.BEIRUT.LEBANON, UTCP0200.CAIRO, UTCP0200.HELSINKI, UTCP0200.JERUSALEM, UTCP0200.HARARE, UTCP0300.MINSK, UTCP0300.BAGHDAD, UTCP0300.MOSCOW, UTCP0300.KUWAIT, UTCP0300.NAIROBI, UTCP0330.TEHRAN, UTCP0400.BAKU, UTCP0400.TBILISI, UTCP0400.YEREVAN, UTCP0400.DUBAI, UTCP0430.KABUL, UTCP0500.ISLAMABAD.KARACHI, UTCP0500.URALSK, UTCP0500.YEKATERINBURG, UTCP0530.KOLKATA, UTCP0530.SRI.LANKA, UTCP0545.KATHMANDU, UTCP0600.ASTANA, UTCP0630.YANGON, UTCP0700.KRASNOYARSK, UTCP0700.BANGKOK, UTCP0700.JAKARTA, UTCP0800.BEIJING, UTCP0800.HONG.KONG, UTCP0800.IRKUTSK, UTCP0800.KUALA.LUMPUR, UTCP0800.PERTH, UTCP0800.TAIPEI, UTCP0900.SEOUL, UTCP0900.TOKYO.OSAKA, UTCP0900.YAKUTSK, UTCP0930.ADELAIDE, UTCP0930.DARWIN, UTCP1000.BRISBANE, UTCP1000.HOBART, UTCP1000.SYDNEY.CANBERRA, UTCP1000.VLADIVOSTOK, UTCP1000.GUAM, UTCP1100.MAGADAN, UTCP1200.MARSHALL.ISLANDS, UTCP1200.AUCKLAND, UTCP1200.FIJI, UTCP1300.TONGA]
      # numeric equivalents 1-85
  # Operators: = ? + -

- id: tint
  label: Tint
  kind: action
  command: "TINT={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: tracking
  label: Tracking
  kind: action
  command: "TRACKING={value}"
  params:
    - name: value
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: audio_treble
  label: Treble
  kind: action
  command: "AUDIO.TREBLE={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -

- id: network_ntp
  label: Use Network Time
  kind: action
  command: "NETWORK.NTP={value}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      # numeric equivalents 0-1
  # Operators: = ?

- id: build_info
  label: Version Info
  kind: query
  command: "BUILD.INFO?"
  params: []

- id: audio_volume
  label: Volume
  kind: action
  command: "AUDIO.VOLUME={level}"
  params:
    - name: level
      type: integer
      range: 0-100
  # Operators: = ? + -
```

## Notes
- Command grammar is case-insensitive; responses are uppercase.
- Termination: ASCII CR (0x0D), LF (0x0A), or `;`. Response uses same terminator.
- Default modifier for ASPECT is `CURRENT`; for `IPV4.*` reads it's `None = Current`, writes require `STATIC` (0).
- `RESET` modifier values: USER=0, PICTURE=5, AUDIO=6, CONFIG1=7, CONFIG2=8, ADV.SETTINGS=9, SCREEN=10.
- TCP/UDP port 5000; SSH port 2222. RS-232 In DB9 pin 5 = GND, pin 2 = RXD, pin 3 = TXD.
- Error responses: `!ERR 1` invalid syntax, `!ERR 3` unknown opcode, `!ERR 4` invalid modifier, `!ERR 5` invalid operand, `!ERR 6` invalid operator.
- `MODEL.SERIES?` always returns `"Simplicity"` for this product line.

<!-- UNRESOLVED: firmware version range, exact electrical ratings, factory defaults not enumerated -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/evgb35qb/020-1430-00a_planar-simplicity-m-series-rs232-user-manual.pdf
  - https://www.planar.com/media/foolqxpw/planar-simplicity-m-series_user-manual_slmxx-models.pdf
  - https://www.planar.com/products/large-format-lcd-displays/modules-drivers/
retrieved_at: 2026-04-29T11:49:31.376Z
last_checked_at: 2026-06-02T04:20:10.760Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:20:10.760Z
matched_actions: 86
action_count: 86
confidence: medium
summary: "All 86 spec actions matched literally in the source command table; all transport parameters verified in protocol sections; complete bidirectional coverage. (2 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version ranges, exact electrical specs, and physical connector pinouts beyond what is shown"
- "firmware version range, exact electrical ratings, factory defaults not enumerated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
