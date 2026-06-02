---
spec_id: admin/planar-qe9850-qe9850t
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar QE9850 / QE9850T Control Spec"
manufacturer: Planar
model_family: QE9850
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - QE9850
    - QE9850T
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/e0mf2zl1/020-1321-01a_qe-series-rs232-user-manual-wm.pdf
retrieved_at: 2026-05-27T11:24:36.810Z
last_checked_at: 2026-06-02T17:23:47.472Z
generated_at: 2026-06-02T17:23:47.472Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source. The protocol applies to \"all Planar QE Series models\" per the source; specific firmware gating is not specified."
  - "no unsolicited event/notification frame format documented in the source."
  - "no multi-step sequences documented in the source."
  - "no safety warnings, interlock procedures, or power-on sequencing"
  - "firmware version gating not stated; specific QE9850/QE9850T model-specific behavior beyond the shared protocol is not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:47.472Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec actions have literal wire-opcode matches in the source command table; transport values baud 19200 and TCP/UDP port 57 confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar QE9850 / QE9850T Control Spec

## Summary
The Planar QE9850 and QE9850T are large-format displays in the Planar QE Series. This spec covers the serial command set used to control the displays and read their state over RS-232, USB-B, or LAN. RS-232 uses 19200 baud, 8N1, no flow control. The same ASCII command set is also exposed on TCP and UDP port 57.

<!-- UNRESOLVED: firmware version compatibility not stated in source. The protocol applies to "all Planar QE Series models" per the source; specific firmware gating is not specified. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 57  # TCP and UDP port per source ("TCP and UDP port 57 accept the same serial command set as RS232")
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

**Notes on transport:**
- Source: "Serial communication can occur over RS232, USB-B or LAN."
- Source: "TCP and UDP port 57 accept the same serial command set as RS232."

## Traits
```yaml
- powerable       # inferred from DISPLAY.POWER, POWER.ON.DELAY, POWER.SAVE.MODE commands
- routable        # inferred from SOURCE.SELECT, SOURCE.NEXT, MULTI.VIEW, LAYOUT commands
- queryable       # inferred from extensive read (`?` and `#` operators) command support
- levelable       # inferred from VOLUME, BRIGHTNESS, CONTRAST, COLOR, TINT, GAIN, BACKLIGHT.INTENSITY, GAMMA, SHARPNESS, AUDIO.BALANCE, AUDIO.BASS, AUDIO.TREBLE commands
```

## Actions
```yaml
- id: cms
  label: Advanced Color
  kind: action
  command: "CMS{ZONE},{GAMUT},{COLOR_POINT}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "Zone (ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT)"
    - name: gamut
      type: string
      description: "Color gamut (REC709 / SMPTEC / EBU / USER / AUTO / CURRENT)"
    - name: color_point
      type: string
      description: "Color point (RED.X / RED.Y / GREEN.X / GREEN.Y / BLUE.X / BLUE.Y / CYAN.X / CYAN.Y / MAGENTA.X / MAGENTA.Y / YELLOW.X / YELLOW.Y / WHITE.X / WHITE.Y)"
    - name: value
      type: integer
      description: "Color point value 0-800 (omit modifiers to set all 14 at once)"

- id: cmsflag
  label: Advanced Color Flag
  kind: query
  command: "CMSFLAG{ZONE},{GAMUT},{COLOR_POINT}?[CR]"
  params: []

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  command: "OSD.ALLOW.POPUP={value}[CR]"
  params:
    - name: value
      type: string
      description: "NO / YES"

- id: aspect
  label: Aspect Ratio
  kind: action
  command: "ASPECT{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT"
    - name: value
      type: string
      description: "AUTO / 16X9 / 4X3 / FILL / NATIVE / LETTERBOX"

- id: audio_input
  label: Audio Input
  kind: query
  command: "AUDIO.INPUT?[CR]"
  params: []

- id: audio_zone
  label: Audio Select
  kind: action
  command: "AUDIO.ZONE={zone}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4"

- id: audio_settings
  label: Audio Settings
  kind: action
  command: "AUDIO.SETTINGS={zone} {volume} {treble} {bass} {balance} {mute} {speakers}[CR]"
  params:
    - name: zone
      type: integer
      description: "Zone (0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4)"
    - name: volume
      type: integer
      description: "Volume 0-100"
    - name: treble
      type: integer
      description: "Treble 0-100"
    - name: bass
      type: integer
      description: "Bass 0-100"
    - name: balance
      type: integer
      description: "Balance 0-100"
    - name: mute
      type: integer
      description: "Mute (0=OFF, 1=ON)"
    - name: speakers
      type: integer
      description: "Internal speakers (0=OFF, 1=ON)"

- id: auto_on
  label: Auto Power On
  kind: action
  command: "AUTO.ON={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: source_scan
  label: Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Backlight intensity 1-100"

- id: audio_balance
  label: Balance
  kind: action
  command: "AUDIO.BALANCE={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Balance 0-100"

- id: audio_bass
  label: Bass
  kind: action
  command: "AUDIO.BASS={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Bass 0-100"

- id: blank_color
  label: Blank Screen Color
  kind: action
  command: "BLANK.COLOR={value}[CR]"
  params:
    - name: value
      type: string
      description: "RED / GREEN / BLUE / CYAN / MAGENTA / YELLOW / WHITE / BLACK"

- id: brightness
  label: Brightness
  kind: action
  command: "BRIGHTNESS{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Brightness 0-100"

- id: color
  label: Color
  kind: action
  command: "COLOR{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Color 0-100"

- id: color_gamut
  label: Color Gamut
  kind: action
  command: "COLOR.GAMUT{ZONE},{TYPE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT (default CURRENT)"
    - name: type
      type: string
      description: "SETTING / ACTUAL / COPY / REVERT (default SETTING)"
    - name: value
      type: string
      description: "REC709 / SMPTE.C / EBU / USER / AUTO / DISABLE (and CURRENT for read)"

- id: colorspace
  label: Color Space
  kind: action
  command: "COLORSPACE{ZONE},{TYPE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT"
    - name: type
      type: string
      description: "SETTING / ACTUAL"
    - name: value
      type: string
      description: "REC601 / REC709 / RGB / RGB.VIDEO / AUTO"

- id: color_subsampling
  label: Color Subsampling
  kind: query
  command: "COLOR.SUBSAMPLING{ZONE}?[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT"

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: string
      description: "3200K / 5500K / 6500K / 7500K / 9300K / NATIVE"

- id: rotate
  label: Content Rotation
  kind: action
  command: "ROTATE{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Rotation degrees: 0 / 90 / 180 / 270"

- id: contrast
  label: Contrast
  kind: action
  command: "CONTRAST{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Contrast 0-100"

- id: current_zone
  label: Current Zone
  kind: action
  command: "CURRENT.ZONE={zone}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4"

- id: current_zone_layout
  label: Current Zone Layout
  kind: query
  command: "CURRENT.ZONE.LAYOUT?[CR]"
  params: []

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  command: "IPV4.GATEWAY{STATIC}=\"{address}\"[CR]"
  params:
    - name: address
      type: string
      description: "Dotted-quad gateway address (e.g. \"192.168.12.1\")"

- id: network_dhcp
  label: DHCP
  kind: action
  command: "NETWORK.DHCP={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: diagnostic_color
  label: Diagnostic Color
  kind: action
  command: "DIAGNOSTIC.COLOR{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: string
      description: "RED / GREEN / BLUE / OFF"

- id: display_name
  label: Display Name
  kind: action
  command: "DISPLAY.NAME=\"{name}\"[CR]"
  params:
    - name: name
      type: string
      description: "Quoted string display name (escape \" and \\ with backslash)"

- id: display_power
  label: Display Power
  kind: action
  command: "DISPLAY.POWER={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: dp_type
  label: DisplayPort Type
  kind: action
  command: "DP.TYPE={value}[CR]"
  params:
    - name: value
      type: string
      description: "1.1 / 1.2"

- id: network_dns1
  label: DNS Server 1
  kind: action
  command: "NETWORK.DNS1{STATIC}=\"{address}\"[CR]"
  params:
    - name: address
      type: string
      description: "Dotted-quad DNS address (e.g. \"8.8.8.8\")"

- id: network_dns2
  label: DNS Server 2
  kind: action
  command: "NETWORK.DNS2{STATIC}=\"{address}\"[CR]"
  params:
    - name: address
      type: string
      description: "Dotted-quad DNS address (e.g. \"8.8.4.4\")"

- id: edid_timing
  label: EDID Timing
  kind: action
  command: "EDID.TIMING{INPUT},{PARAM}={value}[CR]"
  params:
    - name: input
      type: string
      description: "OPS / HDMI.1 / HDMI.2 / HDMI.3 / HDMI.4 / DP / ALL"
    - name: param
      type: string
      description: "UPDATE / HACTIVE / VACTIVE / VREFRESH / FULL.SPEC / PCLK / HBLANK / HFP / HSYNC / VBLANK / VFP / VSYNC / FACTORY / TYPE"
    - name: value
      type: string
      description: "Signed integer (UPDATE: 4K60/-3, 4K30/-2, 1080P/-1). TYPE is read-only; UPDATE supports action operator."

- id: edid_selectedconnector
  label: EDID Zone
  kind: action
  command: "EDID.SELECTEDCONNECTOR={value}[CR]"
  params:
    - name: value
      type: string
      description: "OPS / HDMI.1 / HDMI.2 / HDMI.3 / HDMI.4 / DP / ALL"

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: led_enable
  label: Enable Status LED
  kind: action
  command: "LED.ENABLE={value}[CR]"
  params:
    - name: value
      type: string
      description: "DISABLE / ENABLE"

- id: error_log
  label: Error Log
  kind: query
  command: "ERROR.LOG({entry})?[CR]"
  params:
    - name: entry
      type: integer
      description: "Log entry number 1-65535 (1 is most recent). Empty string = no more entries."

- id: reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})[CR]"
  params:
    - name: scope
      type: string
      description: "USER / FACTORY1 (FACTORY1 also clears EDID customizations, network settings and presets)"

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "FIRMWARE.UPDATE{FIRMWARE},{TYPE}=\"{data}\"[CR]"
  params:
    - name: firmware
      type: string
      description: "AUTO / VP.AP / HDMI"
    - name: type
      type: string
      description: "START / PACKET / FINISH / URL"
    - name: data
      type: string
      description: "Update payload (URL when type=URL)"

- id: gain
  label: Gain
  kind: action
  command: "GAIN{ZONE},{COLOR}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: color
      type: string
      description: "RED / GREEN / BLUE / ALL (default ALL). ALL takes three operands: red green blue."
    - name: value
      type: integer
      description: "Gain 0-200 per channel"

- id: gamma
  label: Gamma
  kind: action
  command: "GAMMA{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: string
      description: "Gamma preset 1.5..2.8 in 0.05 steps (e.g. 1.5, 2.2, 2.5)"

- id: help
  label: Help
  kind: action
  command: "HELP={command}[CR]"
  params:
    - name: command
      type: string
      description: "Command name (FIRST / NEXT, or a specific command like OSD.STATUS). For listing all commands: HELP(FIRST)? then HELP(NEXT)? until NAK."

- id: hostname
  label: Hostname
  kind: action
  command: "HOSTNAME=\"{name}\"[CR]"
  params:
    - name: name
      type: string
      description: "Hostname string, 1-65 chars, letters and numbers only (no spaces)"

- id: signal_info
  label: Image Information
  kind: query
  command: "SIGNAL.INFO{ZONE},{PARAM}?[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT (default CURRENT)"
    - name: param
      type: string
      description: "HACTIVE / VACTIVE / PCLK / HTOTAL / VTOTAL / VREFRESH / HREFRESH / INTERLACE / VFIELDRATE / VREFRESH.X.100 / COLORDEPTH / TMDS (default ALL)"

- id: pan
  label: Image Position
  kind: action
  command: "PAN{ZONE},{DIRECTION}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT"
    - name: direction
      type: string
      description: "X / Y / ALL (default ALL)"
    - name: value
      type: integer
      description: "Position -1000 to 1000 (X, Y pair when direction=ALL)"

- id: ipv4_address
  label: IP Address
  kind: action
  command: "IPV4.ADDRESS{STATIC}=\"{address}\"[CR]"
  params:
    - name: address
      type: string
      description: "Dotted-quad IP address (e.g. \"192.168.12.12\")"

- id: ir_code
  label: IR Code
  kind: action
  command: "IR.CODE={value}[CR]"
  params:
    - name: value
      type: integer
      description: "IR remote ID code 0-65535"

- id: ir_lock
  label: IR Remote Lock
  kind: action
  command: "IR.LOCK={value}[CR]"
  params:
    - name: value
      type: string
      description: "DISABLE / ENABLE"

- id: key
  label: Key
  kind: action
  command: "KEY={key}[CR]"
  params:
    - name: key
      type: string
      description: "Remote key name (UP / DOWN / MENU / SOURCE / VOLUME.PLUS / VOLUME.MINUS / EXIT / LEFT / ENTER / PREV / RIGHT / KEY.0-9 / MUTE / STDBY.TOGGLE / STDBY.ENTER / STDBY.EXIT / MENU.PREV / TOP / PRESETS / PRESET1-4 / ZONE1-4 / PIP.MODE / PIP.SWAP / HDMI1-4 / DISPLAY.PORT / DVI / VGA / OPS / WALL / COLOR / MISC / ARROW.LEFT / ARROW.RIGHT / STAR.STAR)"

- id: key_lock
  label: Keypad Lock
  kind: action
  command: "KEY.LOCK={value}[CR]"
  params:
    - name: value
      type: string
      description: "DISABLE / ENABLE"

- id: layout
  label: Layout
  kind: action
  command: "LAYOUT={value}[CR]"
  params:
    - name: value
      type: string
      description: "SINGLE / QUAD"

- id: local_dimming
  label: Local Dimming
  kind: action
  command: "LOCAL.DIMMING={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: network_mac
  label: MAC Address
  kind: query
  command: "NETWORK.MAC?[CR]"
  params: []

- id: memc_level
  label: MEMC
  kind: action
  command: "MEMC.LEVEL={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / LOW / MEDIUM / HIGH"

- id: osd_position
  label: Menu Position
  kind: action
  command: "OSD.POSITION={value}[CR]"
  params:
    - name: value
      type: string
      description: "CENTER / UPPER.LEFT / UPPER.RIGHT / LOWER.LEFT / LOWER.RIGHT"

- id: model_id
  label: Model ID
  kind: query
  command: "MODEL.ID?[CR]"
  params: []

- id: model_series
  label: Model Series
  kind: query
  command: "MODEL.SERIES?[CR]"
  params: []

- id: multi_view
  label: Multi-Source View
  kind: action
  command: "MULTI.VIEW={value}[CR]"
  params:
    - name: value
      type: string
      description: "SINGLE / QUAD"

- id: audio_mute
  label: Mute
  kind: action
  command: "AUDIO.MUTE={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: network_ping
  label: Network Ping
  kind: action
  command: "NETWORK.PING=\"{target}\"[CR]"
  params:
    - name: target
      type: string
      description: "Hostname or IP to ping. Response: \"SUCCESS\" or \"FAILED\""

- id: source_next
  label: Next Source
  kind: action
  command: "SOURCE.NEXT{ZONE}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL / CURRENT"

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "NOISE.REDUCTION{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: string
      description: "OFF / LOW / MEDIUM / HIGH"

- id: notification_email
  label: Notification Event
  kind: action
  command: "NOTIFICATION.EMAIL({EVENT})={ENABLE}, \"{recipients}\", \"{message}\"[CR]"
  params:
    - name: event
      type: string
      description: "POWER.STATE.CHANGED / ERROR.OCCURRED / SOURCE.DETECTED / SOURCE.LOST / SOURCE.SELECTED"
    - name: enable
      type: string
      description: "DISABLE / ENABLE"
    - name: recipients
      type: string
      description: "Comma-separated recipient list string"
    - name: message
      type: string
      description: "Custom user message string"

- id: network_ntpserver
  label: NTP Server
  kind: action
  command: "NETWORK.NTPSERVER=\"{server}\"[CR]"
  params:
    - name: server
      type: string
      description: "NTP server hostname (default \"0.pool.ntp.org\")"

- id: offset
  label: Offset
  kind: action
  command: "OFFSET{ZONE},{COLOR}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: color
      type: string
      description: "RED / GREEN / BLUE / ALL (default ALL). ALL takes three operands: red green blue."
    - name: value
      type: integer
      description: "Offset 0-100 per channel"

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
      type: string
      description: "LANDSCAPE / PORTRAIT"

- id: osd_status
  label: OSD Status
  kind: query
  command: "OSD.STATUS?[CR]"
  params: []

- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / 10.SECONDS / 30.SECONDS / 60.SECONDS / 120.SECONDS / 240.SECONDS (numeric value in seconds also accepted)"

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Transparency 0-5"

- id: overscan
  label: Overscan
  kind: action
  command: "OVERSCAN{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Overscan 0-20"

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "POWER.ON.DELAY={value}[CR]"
  params:
    - name: value
      type: number
      description: "Fixed point delay 0.0-10.0 seconds"

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  command: "POWER.SAVE.DELAY={value}[CR]"
  params:
    - name: value
      type: string
      description: "1.MINUTE / 5.MINUTES / 15.MINUTES / 30.MINUTES / 60.MINUTES (numeric seconds also accepted)"

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  command: "POWER.SAVE.MODE={value}[CR]"
  params:
    - name: value
      type: string
      description: "DISABLED / LOW.POWER / WAKE.ON.SIGNAL"

- id: system_reboot
  label: Reboot
  kind: action
  command: "SYSTEM.REBOOT[CR]"
  params: []

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS{ZONE}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT (default CURRENT)"

- id: clone_settings
  label: Save and Restore Settings
  kind: action
  command: "CLONE.SETTINGS({OPERATION},{LOCATION})[CR]"
  params:
    - name: operation
      type: string
      description: "COPY / PASTE"
    - name: location
      type: string
      description: "USB"

- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  command: "SAVE.DIAGNOSTICS({LOCATION})[CR]"
  params:
    - name: location
      type: string
      description: "USB"

- id: schedule
  label: Schedule
  kind: action
  command: "SCHEDULE({SLOT},{PARAM})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: "Schedule slot 1-20"
    - name: param
      type: string
      description: "FREQ / MINUTE / HOUR / DAY / ACTION / DATA / ENABLE (default ALL)"
    - name: value
      type: integer
      description: "Unsigned integer value (semantics depend on PARAM; see SCHEDULE.ACTION/DAY/FREQUENCY for typed views)"

- id: schedule_action
  label: Schedule Action
  kind: action
  command: "SCHEDULE.ACTION({SLOT})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: "Schedule slot 1-20"
    - name: value
      type: string
      description: "TURN.ON / TURN.OFF / PANEL.BRIGHTNESS"

- id: schedule_day
  label: Schedule Day
  kind: action
  command: "SCHEDULE.DAY({SLOT})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: "Schedule slot 1-20"
    - name: value
      type: string
      description: "MON / TUE / WED / THU / FRI / SAT / SUN"

- id: schedule_description
  label: Schedule Description
  kind: query
  command: "SCHEDULE.DESCRIPTION({SLOT})?[CR]"
  params:
    - name: slot
      type: integer
      description: "Schedule slot 1-20"

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({SLOT})={value}[CR]"
  params:
    - name: slot
      type: integer
      description: "Schedule slot 1-20"
    - name: value
      type: string
      description: "DAILY / WEEKLY / WEEKDAYS / WEEKENDS"

- id: serial_device
  label: Serial Device
  kind: action
  command: "SERIAL.DEVICE({PORT},{SETTING})=\"{value}\"[CR]"
  params:
    - name: port
      type: string
      description: "DB9 (RS232) / USB (USB-B) / OPS"
    - name: setting
      type: string
      description: "BAUD"
    - name: value
      type: string
      description: "Baud rate as quoted string (e.g. \"19200\")"

- id: serial_number
  label: Serial Number
  kind: query
  command: "SERIAL.NUMBER?[CR]"
  params: []

- id: sharpness
  label: Sharpness
  kind: action
  command: "SHARPNESS{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Sharpness 0-100"

- id: network_smtp_authentication
  label: SMTP Authentication
  kind: action
  command: "NETWORK.SMTP.AUTHENTICATION={value}[CR]"
  params:
    - name: value
      type: string
      description: "NONE / AUTO / PLAIN / SCRAM_SHA1 / CRAM_MD5 / DIGEST_MD5 / LOGIN / NTLM"

- id: network_smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  command: "NETWORK.SMTP.ENCRYPTION={value}[CR]"
  params:
    - name: value
      type: string
      description: "NONE / TLS / START.TLS"

- id: network_smtp_from
  label: SMTP Email From Address
  kind: action
  command: "NETWORK.SMTP.FROM=\"{address}\"[CR]"
  params:
    - name: address
      type: string
      description: "From-address string"

- id: network_smtp_password
  label: SMTP Password
  kind: action
  command: "NETWORK.SMTP.PASSWORD=\"{password}\"[CR]"
  params:
    - name: password
      type: string
      description: "SMTP password string"

- id: network_smtp_port
  label: SMTP Port
  kind: action
  command: "NETWORK.SMTP.PORT={value}[CR]"
  params:
    - name: value
      type: integer
      description: "SMTP port (e.g. 465)"

- id: network_smtp_server
  label: SMTP Server
  kind: action
  command: "NETWORK.SMTP.SERVER=\"{server}\"[CR]"
  params:
    - name: server
      type: string
      description: "SMTP server hostname (e.g. \"smtp.comcast.net\")"

- id: network_smtp_username
  label: SMTP Username
  kind: action
  command: "NETWORK.SMTP.USERNAME=\"{username}\"[CR]"
  params:
    - name: username
      type: string
      description: "SMTP username string"

- id: source_message
  label: Source Message
  kind: query
  command: "SOURCE.MESSAGE{ZONE}?[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / CURRENT (default CURRENT). Returns resolution+rate or \"Searching\"/\"No Signal\"."

- id: source_select
  label: Source Select
  kind: action
  command: "SOURCE.SELECT{ZONE}={source}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL / CURRENT (default CURRENT)"
    - name: source
      type: string
      description: "OPS / HDMI.1 / HDMI.2 / HDMI.3 / HDMI.4 / DP"

- id: splash_screen
  label: Splash Screen
  kind: action
  command: "SPLASH.SCREEN={value}[CR]"
  params:
    - name: value
      type: string
      description: "DISABLE / ENABLE"

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  command: "IPV4.NETMASK{STATIC}=\"{mask}\"[CR]"
  params:
    - name: mask
      type: string
      description: "Dotted-quad netmask (e.g. \"255.255.255.0\")"

- id: system_state
  label: System State
  kind: query
  command: "SYSTEM.STATE?[CR]"
  params: []

- id: network_smtp_test
  label: Test Email
  kind: action
  command: "NETWORK.SMTP.TEST({EVENT})[CR]"
  params:
    - name: event
      type: string
      description: "POWER.STATE.CHANGED / ERROR.OCCURRED / SOURCE.DETECTED / SOURCE.LOST / SOURCE.SELECTED"

- id: pattern
  label: Test Pattern
  kind: action
  command: "PATTERN({PATTERN})[CR]"
  params:
    - name: pattern
      type: string
      description: "NONE / BLACK / WHITE / GRAY / RED / GREEN / BLUE / CYAN / MAGENTA / YELLOW / GRAYBAR / REDBAR / GREENBAR / BLUEBAR / CHECKERBOARD / COLORBAR"

- id: time
  label: Time
  kind: action
  command: "TIME({FIELD})={value}[CR]"
  params:
    - name: field
      type: string
      description: "YEAR / MONTH / DATE / HOUR / MINUTE (default ALL)"
    - name: value
      type: integer
      description: "Unsigned integer value for the selected field"

- id: time_day
  label: Time - Day
  kind: query
  command: "TIME.DAY?[CR]"
  params: []

- id: time_month
  label: Time - Month
  kind: action
  command: "TIME.MONTH={value}[CR]"
  params:
    - name: value
      type: string
      description: "JANUARY / FEBRUARY / MARCH / APRIL / MAY / JUNE / JULY / AUGUST / SEPTEMBER / OCTOBER / NOVEMBER / DECEMBER"

- id: time_string
  label: Time - String
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
      description: "Timezone identifier (e.g. UTCM0800.PACIFIC.TIME.US.CANADA). See timezone table for full list."

- id: tint
  label: Tint
  kind: action
  command: "TINT{ZONE}={value}[CR]"
  params:
    - name: zone
      type: string
      description: "ZONE.1 / ZONE.2 / ZONE.3 / ZONE.4 / ALL.INPUT / ALL / ALL.ZONE / CURRENT (default CURRENT)"
    - name: value
      type: integer
      description: "Tint 0-100"

- id: audio_treble
  label: Treble
  kind: action
  command: "AUDIO.TREBLE={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Treble 0-100"

- id: network_ntp
  label: Use Network Time
  kind: action
  command: "NETWORK.NTP={value}[CR]"
  params:
    - name: value
      type: string
      description: "OFF / ON"

- id: build_info
  label: Version Info
  kind: query
  command: "BUILD.INFO({FIELD})?[CR]"
  params:
    - name: field
      type: string
      description: "DATE.SCP / VERSION.SCP / DATE.VP / VERSION.VP / SRC.INFO.VP / VERSION.HDMI / VERSION.FRC / PKG.DATE / PKG.VERSION"

- id: audio_volume
  label: Volume
  kind: action
  command: "AUDIO.VOLUME={value}[CR]"
  params:
    - name: value
      type: integer
      description: "Volume 0-100"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, FAULT]
  description: "Returned by SYSTEM.STATE? - STANDBY is lowest power mode, FAULT indicates a system failure (use ERROR.LOG for details)"

- id: osd_visible
  type: enum
  values: [DISABLE, ENABLE]
  description: "Returned by OSD.STATUS? - whether the OSD (menu/message box/confirmation dialog) is currently shown"

- id: source_message
  type: string
  description: "Returned by SOURCE.MESSAGE? - input resolution+frame rate, or \"Searching\"/\"No Signal\""

- id: model_id
  type: string
  description: "Returned by MODEL.ID? - e.g. \"QE4050\""

- id: model_series
  type: string
  description: "Returned by MODEL.SERIES? - always \"QE Series\" for this product"

- id: serial_number
  type: string
  description: "Returned by SERIAL.NUMBER? - display serial number string"

- id: mac_address
  type: string
  description: "Returned by NETWORK.MAC? - MAC address string in 12:34:56:AB:CD:EF form"

- id: current_zone_layout
  type: enum
  values: [S.1, Q.1, Q.2, Q.3, Q.4]
  description: "Returned by CURRENT.ZONE.LAYOUT? - current multi-source view layout"

- id: time_string
  type: string
  description: "Returned by TIME.STRING? - current date/time as \"YYYY-MM-DD HH:MM\""

- id: time_day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
  description: "Returned by TIME.DAY?"

- id: build_info
  type: string
  description: "Returned by BUILD.INFO(field)? - build metadata (date/version strings)"

- id: ipv4_address
  type: string
  description: "Returned by IPV4.ADDRESS? - current IP address (or static when STATIC modifier used)"

- id: ipv4_netmask
  type: string
  description: "Returned by IPV4.NETMASK? - current subnet mask"

- id: ipv4_gateway
  type: string
  description: "Returned by IPV4.GATEWAY? - current default gateway"

- id: dns1
  type: string
  description: "Returned by NETWORK.DNS1? - primary DNS server"

- id: dns2
  type: string
  description: "Returned by NETWORK.DNS2? - secondary DNS server"

- id: hostname
  type: string
  description: "Returned by HOSTNAME? - current hostname"

- id: audio_input
  type: string
  description: "Returned by AUDIO.INPUT? - current audio source for the active zone"

- id: ping_result
  type: enum
  values: [SUCCESS, FAILED]
  description: "Returned by NETWORK.PING - \"SUCCESS\" or \"FAILED\""

- id: error_log_entry
  type: string
  description: "Returned by ERROR.LOG(n)? - fault log entry string; empty string means no further entries"

- id: color_subsampling
  type: string
  description: "Returned by COLOR.SUBSAMPLING? - e.g. \"4:4:4\" / \"4:2:0\""

- id: schedule_description
  type: string
  description: "Returned by SCHEDULE.DESCRIPTION(slot)? - schedule slot description"

- id: signal_info
  type: integer
  description: "Returned by SIGNAL.INFO? - image timing/codec parameter value (HACTIVE / VACTIVE / PCLK / etc.)"

- id: cmsflag
  type: string
  description: "Returned by CMSFLAG? - empty string if color coordinates achievable, \"*\" otherwise"
```

## Variables
```yaml
# All numeric/enum parameters in this command set are bounded by the command definition
# (e.g. BRIGHTNESS 0-100, VOLUME 0-100, TIMEZONE uses a fixed enum table). There are no
# standalone settable variables outside the Actions list.
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification frame format documented in the source.
# The NOTIFICATION.EMAIL command configures email notifications for events
# (POWER.STATE.CHANGED / ERROR.OCCURRED / SOURCE.DETECTED / SOURCE.LOST / SOURCE.SELECTED),
# but the serial protocol itself does not document an unsolicited push channel.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences documented in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing
# requirements stated in the source.
```

## Notes
- Source document title: "RS232 user manual ... applies to all Planar QE Series models." Specific QE9850/QE9850T differences are not called out — protocol is shared across the QE Series.
- Command structure: `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]` where TERM is CR (0x0D), LF (0x0A), or `;`. Responses use the same terminator. All parts case-insensitive on input; responses are uppercase.
- Numeric command codes are accepted as substitutes for named opcodes (e.g. `200=100` is equivalent to `BRIGHTNESS=100`).
- Execute operator `!` denotes an action command (no operator/operand). Source tables use `!` in the Operators column to indicate support.
- Error responses: `OPCODE!ERR <code> [CR]` (codes 1-6; 2 reserved). Ack responses: `OPCODE@ACK [CR]`. NAK: `OPCODE^NAK [CR]`.
- IP control uses the exact same ASCII command set on TCP/UDP port 57 (per source). Example from source: hex `444953504C41592E504F5745523D310D` = `DISPLAY.POWER=1` + CR.
- Multi-zone displays: many commands take a ZONE.1..ZONE.4 modifier (or ALL/ALL.INPUT/ALL.ZONE/CURRENT). Omitting the modifier defaults to CURRENT for that command.
- For LAN serial, the USB-B and OPS serial connectors are also configurable via SERIAL.DEVICE.
- KEYS (PRESET1-4, DVI, VGA, OPS, WALL, COLOR, PIP.MODE, PIP.SWAP, ARROW.LEFT, ARROW.RIGHT, STAR.STAR) are documented as "Not used" in the source.
<!-- UNRESOLVED: firmware version gating not stated; specific QE9850/QE9850T model-specific behavior beyond the shared protocol is not stated. -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/e0mf2zl1/020-1321-01a_qe-series-rs232-user-manual-wm.pdf
retrieved_at: 2026-05-27T11:24:36.810Z
last_checked_at: 2026-06-02T17:23:47.472Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:47.472Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec actions have literal wire-opcode matches in the source command table; transport values baud 19200 and TCP/UDP port 57 confirmed verbatim. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source. The protocol applies to \"all Planar QE Series models\" per the source; specific firmware gating is not specified."
- "no unsolicited event/notification frame format documented in the source."
- "no multi-step sequences documented in the source."
- "no safety warnings, interlock procedures, or power-on sequencing"
- "firmware version gating not stated; specific QE9850/QE9850T model-specific behavior beyond the shared protocol is not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
