---
spec_id: admin/planar-slm_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar Simplicity M Series Control Spec"
manufacturer: Planar
model_family: "SLM Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "SLM Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-04-30T09:46:46.044Z
generated_at: 2026-04-30T09:46:46.044Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - MODEL.ID
  - MODEL.SERIES
  - UPTIME
  - SOURCE.MESSAGE
  - SYSTEM.STATE
  - TEMPERATURE
verification:
  verdict: verified
  checked_at: 2026-04-30T09:46:46.044Z
  matched_actions: 75
  action_count: 75
  confidence: high
  summary: "All 75 spec actions match distinct source commands; transport parameters verified; read-only query extras are informational only."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-29
---

# Planar Simplicity M Series Control Spec

## Summary
Planar Simplicity M Series commercial display supports RS-232 serial control and IP-based control via TCP, UDP, or SSH over a network connection. The same command set operates across all transport layers. No authentication procedure is described in the source.

<!-- UNRESOLVED: SSH password credentials not documented in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
  - serial
addressing:
  port: 5000  # TCP/UDP; SSH on port 2222 (SSH not listed as protocol group)
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
- queryable
- routable
- levelable
```

## Actions
```yaml
- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  params:
    - name: value
      type: enum
      description: FILL / 4X3 / NATIVE / 21X9 / CUSTOM
- id: audio_volume_line
  label: Audio Out (Line Out)
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: audio_out_sync
  label: Audio Out Sync
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: auto_adjust
  label: Auto Adjust
  kind: action
  params: []
- id: auto_power_on
  label: Auto Power On
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, LAST.STATUS]
- id: auto_scan_sources
  label: Auto Scan Sources
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]
- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  params:
    - name: value
      type: integer
      description: 1-100
- id: backlight_panel_saving
  label: Backlight Panel Saving
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: audio_balance
  label: Balance
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: audio_bass
  label: Bass
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: boot_source_input
  label: Boot Source Input
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]
- id: boot_source_last
  label: Boot Source Last Input
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: boot_source_playlist
  label: Boot Source Playlist
  kind: action
  params:
    - name: value
      type: integer
      description: 0-7
- id: brightness
  label: Brightness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: color
  label: Color
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: color_space
  label: Color Space
  kind: action
  params:
    - name: value
      type: enum
      values: [SETTING, ACTUAL, RGB, RGB.VIDEO, AUTO]
- id: color_temperature
  label: Color Temperature
  kind: action
  params:
    - name: value
      type: enum
      values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]
- id: contrast
  label: Contrast
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: custom_zoom
  label: Custom Zoom
  kind: action
  params:
    - name: mode
      type: enum
      values: [ZOOM, HZOOM, VZOOM, HPOS, VPOS]
    - name: value
      type: integer
      description: 0-100
- id: default_gateway
  label: Default Gateway
  kind: action
  params:
    - name: value
      type: string
      description: IPv4 address string
- id: dhcp
  label: DHCP
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: display_power
  label: Display Power
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: dns_server_1
  label: DNS Server 1
  kind: action
  params:
    - name: value
      type: string
      description: IPv4 address string
- id: dns_server_2
  label: DNS Server 2
  kind: action
  params:
    - name: value
      type: string
      description: IPv4 address string
- id: enable_internal_speakers
  label: Enable Internal Speakers
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: enable_status_led
  label: Enable Status LED
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]
- id: factory_reset
  label: Factory Reset
  kind: action
  params:
    - name: scope
      type: enum
      values: [USER, PICTURE, AUDIO, CONFIG1, CONFIG2, ADV.SETTINGS, SCREEN]
- id: failover_source
  label: Failover Source
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-9, 255=ALL
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: gain
  label: Gain
  kind: action
  params:
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: red
      type: integer
      description: 0-255 (or three operands for ALL)
    - name: green
      type: integer
      description: 0-255
    - name: blue
      type: integer
      description: 0-255
- id: gamma
  label: Gamma
  kind: action
  params:
    - name: value
      type: enum
      values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", NATIVE, SGAMMA, DIMAGE]
- id: hdmi_cec
  label: HDMI CEC
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: hdmi_cec_standby
  label: HDMI CEC Standby
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: hdmi_version
  label: HDMI Version
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI14, HDMI20]
- id: image_position
  label: Image Position
  kind: action
  params:
    - name: direction
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      description: 0-100
- id: info_osd_timeout
  label: Information OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: 0-60
- id: ip_address
  label: IP Address
  kind: action
  params:
    - name: type
      type: enum
      values: [STATIC]
    - name: value
      type: string
      description: IPv4 address string
- id: ir_remote_lock
  label: IR Remote Lock
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
- id: keypad_lock
  label: Keypad Lock
  kind: action
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
- id: language
  label: Language
  kind: action
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
- id: max_volume
  label: Maximum Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: menu_position
  label: Menu Position
  kind: action
  params:
    - name: direction
      type: enum
      values: [X, Y, ALL]
    - name: value
      type: integer
      description: 0-100
- id: min_volume
  label: Minimum Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: monitor_id
  label: Monitor ID
  kind: action
  params:
    - name: value
      type: integer
      description: 1-255
- id: mute
  label: Mute
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: noise_reduction
  label: Noise Reduction
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, LOW, MEDIUM, HIGH]
- id: ntp_server
  label: NTP Server
  kind: action
  params:
    - name: value
      type: string
      description: NTP server hostname or IP string
- id: off_timer
  label: Off Timer
  kind: action
  params:
    - name: value
      type: integer
      description: 0-24
- id: osd_close
  label: OSD Close
  kind: action
  params: []
- id: osd_rotation
  label: OSD Rotation
  kind: action
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]
- id: osd_timeout
  label: OSD Timeout
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 5-120 in increments of 5"
- id: osd_transparency
  label: OSD Transparency
  kind: action
  params:
    - name: value
      type: integer
      description: "0=OFF, 5-100 in increments of 5"
- id: overscan
  label: Overscan
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: phase
  label: Phase
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: power_down_mode
  label: Power Down Mode
  kind: action
  params:
    - name: value
      type: enum
      values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]
- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  params: []
- id: schedule
  label: Schedule
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: parameter
      type: enum
      values: [FREQ, MINUTE, HOUR, ENABLE, END.MINUTE, END.HOUR, INPUT, PLAYLIST, DAY.MON, DAY.TUE, DAY.WED, DAY.THU, DAY.FRI, DAY.SAT, DAY.SUN, END.TIME.NEXT.DAY]
    - name: value
      type: string
      description: Schedule configuration value
- id: schedule_day
  label: Schedule Day
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: day
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]
    - name: value
      type: enum
      values: [OFF, ON]
- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: value
      type: enum
      values: [ONCE, EVERY.WEEK]
- id: schedule_input
  label: Schedule Input
  kind: action
  params:
    - name: slot
      type: integer
      description: 1-7
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: sharpness
  label: Sharpness
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100 in increments of 10
- id: smart_power
  label: Smart Power
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, MEDIUM, HIGH]
- id: source_select
  label: Source Select
  kind: action
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: splash_screen
  label: Splash Screen
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON, USER]
- id: subnet_mask
  label: Subnet Mask
  kind: action
  params:
    - name: type
      type: enum
      values: [STATIC]
    - name: value
      type: string
      description: IPv4 address string
- id: system_reboot
  label: System Reboot
  kind: action
  params: []
- id: time
  label: Time
  kind: action
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE]
    - name: value
      type: integer
      description: Unsigned integer
- id: time_month
  label: Time - Month
  kind: action
  params:
    - name: value
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
- id: time_zone
  label: Time Zone
  kind: action
  params:
    - name: value
      type: string
      description: Timezone identifier (see timezone table)
- id: tint
  label: Tint
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: tracking
  label: Tracking
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: treble
  label: Treble
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: use_network_time
  label: Use Network Time
  kind: action
  params:
    - name: value
      type: enum
      values: [OFF, ON]
- id: volume
  label: Volume
  kind: action
  params:
    - name: value
      type: integer
      description: 0-100
- id: key
  label: Key
  kind: action
  params:
    - name: value
      type: enum
      values: [UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.1, KEY.2, KEY.3, KEY.4, KEY.5, KEY.6, KEY.7, KEY.8, KEY.9, MUTE, KEY.0, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1, PRESET2, PRESET3, PRESET4, ZONE1, ZONE2, ZONE3, ZONE4, PIP.MODE, PIP.SWAP, HDMI1, HDMI2, HDMI3, HDMI4, DISPLAY.PORT, DVI, VGA, OPS, WALL, COLOR, MISC, ARROW.LEFT, ARROW.RIGHT, STAR.STAR]
```

## Feedbacks
```yaml
- id: brightness
  type: integer
  description: 0-100
- id: contrast
  type: integer
  description: 0-100
- id: aspect_ratio
  type: enum
  values: [FILL, 4X3, NATIVE, 21X9, CUSTOM, 0, 1, 2, 3, 4]
- id: audio_volume_line
  type: integer
  description: 0-100
- id: audio_out_sync
  type: enum
  values: [OFF, ON]
- id: auto_power_on
  type: enum
  values: [OFF, ON, LAST.STATUS]
- id: auto_scan_sources
  type: enum
  values: [OFF, ON, FAILOVER]
- id: backlight_intensity
  type: integer
  description: 1-100
- id: backlight_panel_saving
  type: enum
  values: [OFF, ON]
- id: audio_balance
  type: integer
  description: 0-100
- id: audio_bass
  type: integer
  description: 0-100
- id: boot_source_input
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USB]
- id: boot_source_last
  type: enum
  values: [OFF, ON]
- id: boot_source_playlist
  type: integer
  description: 0-7
- id: color
  type: integer
  description: 0-100
- id: color_space
  type: enum
  values: [SETTING, ACTUAL, RGB, RGB.VIDEO, AUTO]
- id: color_temperature
  type: enum
  values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE, USER1, USER2]
- id: custom_zoom
  type: integer
  description: 0-100
- id: dhcp
  type: enum
  values: [OFF, ON]
- id: display_power
  type: enum
  values: [OFF, ON]
- id: default_gateway
  type: string
  description: IPv4 address string
- id: dns_server_1
  type: string
  description: IPv4 address string
- id: dns_server_2
  type: string
  description: IPv4 address string
- id: enable_internal_speakers
  type: enum
  values: [OFF, ON]
- id: enable_status_led
  type: enum
  values: [DISABLE, ENABLE]
- id: failover_source
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: gain
  type: integer
  description: 0-255 (or three values for ALL)
- id: gamma
  type: enum
  values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", NATIVE, SGAMMA, DIMAGE]
- id: hdmi_cec
  type: enum
  values: [OFF, ON]
- id: hdmi_cec_standby
  type: enum
  values: [OFF, ON]
- id: hdmi_version
  type: enum
  values: [HDMI14, HDMI20]
- id: image_position
  type: integer
  description: 0-100
- id: info_osd_timeout
  type: integer
  description: 0-60
- id: ip_address
  type: string
  description: IPv4 address string
- id: ir_remote_lock
  type: enum
  values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
- id: keypad_lock
  type: enum
  values: [DISABLE, ENABLE, LOCK.ALL.BUT.VOLUME, LOCK.ALL.BUT.POWER, LOCK.ALL.BUT.PWR.VOL]
- id: language
  type: enum
  values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]
- id: mac_address
  type: string
  description: MAC address string e.g. "12:34:56:AB:CD:EF"
- id: max_volume
  type: integer
  description: 0-100
- id: menu_position
  type: integer
  description: 0-100
- id: min_volume
  type: integer
  description: 0-100
- id: model_id
  type: string
  description: Model identifier e.g. "SLM552"
- id: model_series
  type: string
  description: Always returns "Simplicity"
- id: monitor_id
  type: integer
  description: 1-255
- id: mute
  type: enum
  values: [OFF, ON]
- id: noise_reduction
  type: enum
  values: [OFF, LOW, MEDIUM, HIGH]
- id: ntp_server
  type: string
  description: NTP server hostname or IP string
- id: off_timer
  type: integer
  description: 0-24
- id: operation_hours
  type: integer
  description: Unsigned integer (hours of operation)
- id: osd_rotation
  type: enum
  values: [LANDSCAPE, PORTRAIT]
- id: osd_timeout
  type: integer
  description: "0=OFF, 5-120 in increments of 5"
- id: osd_transparency
  type: integer
  description: "0=OFF, 5-100 in increments of 5"
- id: overscan
  type: enum
  values: [OFF, ON]
- id: phase
  type: integer
  description: 0-100
- id: pixel_orbit
  type: enum
  values: [OFF, ON]
- id: power_down_mode
  type: enum
  values: [STANDBY.MODE, NETWORKED.STANDBY.MODE, WAKE.ON.SIGNAL, ALWAYS.ON]
- id: schedule
  type: string
  description: Schedule slot state
- id: schedule_day
  type: enum
  values: [OFF, ON]
- id: schedule_frequency
  type: enum
  values: [ONCE, EVERY.WEEK]
- id: schedule_input
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: serial_number
  type: string
  description: Serial number string
- id: sharpness
  type: integer
  description: 0-100 in increments of 10
- id: smart_power
  type: enum
  values: [OFF, MEDIUM, HIGH]
- id: source_message
  type: string
  description: Input resolution and frame rate string e.g. "3840x2160 @ 60Hz" or "No Signal"
- id: source_select
  type: enum
  values: [HDMI.1, HDMI.2, VGA, MEDIA.PLAYER, BROWSER, CMS, ANDROID, ANDROID.APP, USBC]
- id: splash_screen
  type: enum
  values: [OFF, ON, USER]
- id: subnet_mask
  type: string
  description: IPv4 address string
- id: system_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN]
- id: thermal_status
  type: string
  description: Temperature string e.g. "41.50°C 106.70°F"
- id: time
  type: integer
  description: Unsigned integer
- id: time_day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
- id: time_month
  type: enum
  values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]
- id: time_string
  type: string
  description: Time string e.g. "2015-09-01 13:21"
- id: time_zone
  type: string
  description: Timezone identifier
- id: tint
  type: integer
  description: 0-100
- id: tracking
  type: integer
  description: 0-100
- id: treble
  type: integer
  description: 0-100
- id: use_network_time
  type: enum
  values: [OFF, ON]
- id: volume
  type: integer
  description: 0-100
- id: version_info
  type: string
  description: Software version e.g. "FB01.05"
- id: error_response
  type: enum
  values: ["ERR 1: Invalid syntax", "ERR 2: Reserved", "ERR 3: Command not recognized", "ERR 4: Invalid modifier", "ERR 5: Invalid operands", "ERR 6: Invalid operator"]
- id: ack_response
  type: string
  description: Acknowledgement response e.g. "@ACK"
- id: nak_response
  type: string
  description: Negative acknowledgement e.g. "^NAK"
```

## Variables
```yaml
# All settable parameters with get/set semantics are covered in Actions/Feedbacks above.
# UNRESOLVED: separate Variables section not needed - all params use =?+- operators.
```

## Events
```yaml
# UNRESOLVED: device sends no unsolicited notifications documented in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - Power down mode must be Wake on Signal or Always On when using RS232 over network
# UNRESOLVED: safety-critical voltage/current/power specs not stated in source
```

## Notes

**Command structure:** `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` — TERM is CR (0x0D), LF (0x0A), or semicolon.

**Operators:** `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement. `:` prefixes response. `@ACK` acknowledgement, `^NAK` negative acknowledgement, `!ERR n` error.

**Modifiers:** `(ZONE.N, ALL, CURRENT, RED, GREEN, BLUE, STATIC, X, Y)` — written with dot notation.

**Network port:** TCP/UDP port 5000 for RS232 Network Port; SSH on port 2222 with password authentication (credentials not documented in source). RS232 Network Port must be enabled via Android Settings > Signage Display > Network Application > RS232 Network Port.

**Power behaviour:** DISPLAY.POWER and SYSTEM.STATE are available in standby. Key commands (power on, power toggle) work during standby.

<!-- UNRESOLVED: SSH password configuration credentials not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not stated in source -->
<!-- UNRESOLVED: error recovery sequences not documented in source -->

## Provenance

```yaml
source_domains:
  - planar.com
retrieved_at: 2026-04-30T04:27:27.764Z
last_checked_at: 2026-04-30T09:46:46.044Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T09:46:46.044Z
matched_actions: 75
action_count: 75
confidence: high
summary: "All 75 spec actions match distinct source commands; transport parameters verified; read-only query extras are informational only."
```

## Known Gaps

```yaml
- MODEL.ID
- MODEL.SERIES
- UPTIME
- SOURCE.MESSAGE
- SYSTEM.STATE
- TEMPERATURE
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
