---
spec_id: admin/planar-urx-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes X Series Control Spec"
manufacturer: Planar
model_family: "UltraRes X Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "UltraRes X Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/2jtdzv5r/020-1397-00c-ultrares-series-rs232-user-manual.pdf
  - https://www.planar.com/media/tghnvl0f/020-1397-00b_ultrares-x-series_rs232-user-manual-wm.pdf
  - https://www.planar.com/media/v2mototw/020-1397-00c-ultrares-series-rs232-user-manual.pdf
retrieved_at: 2026-05-01T02:08:48.725Z
last_checked_at: 2026-06-02T17:23:50.505Z
generated_at: 2026-06-02T17:23:50.505Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "explicit firmware version compatibility not stated in source"
  - "source does not document any unsolicited notifications pushed"
  - "source does not describe multi-step command sequences. The"
  - "source contains no safety warnings, interlock procedures, or"
  - "firmware version compatibility, voltage/current specs, fault"
verification:
  verdict: verified
  checked_at: 2026-06-02T17:23:50.505Z
  matched_actions: 132
  action_count: 132
  confidence: medium
  summary: "All 132 spec opcodes match source table entries one-to-one; transport values (baud 19200, port 57, 8N1, no flow control) confirmed verbatim in source. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar UltraRes X Series Control Spec

## Summary
RS-232 ASCII command set for Planar UltraRes X Series large-format LCD displays.
The same command set is also exposed on the USB-B serial port and on TCP and
UDP port 57. Commands are case-insensitive ASCII strings terminated by CR, LF,
or `;`, with `=`, `?`, `#`, `+`, `-`, and execute (no operator) forms. UR8450
and UR9850 are NOT covered by this spec; their RS-232 protocol differs.

<!-- UNRESOLVED: explicit firmware version compatibility not stated in source -->

## Transport
```yaml
# Source documents serial (DB9), USB-B serial, TCP, and UDP transports with
# the same command set. Auth: no login/password procedure described.
protocols:
  - serial
  - tcp
  - udp
addressing:
  port: 57  # TCP and UDP per source
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
- powerable  # inferred from DISPLAY.POWER and STDBY.* key codes
- routable   # inferred from SOURCE.SELECT per-zone variants
- queryable  # inferred from `?` and `#` read operators and query-only commands
- levelable  # inferred from AUDIO.VOLUME/TREBLE/BASS/BALANCE, BRIGHTNESS, etc.
```

## Actions
```yaml
# All opcodes from the Planar UltraRes X RS-232 manual. Each command's
# response is the same opcode followed by `:` and the formatted value
# (e.g. `BRIGHTNESS:55`) unless it is an action (no operator, no operand)
# in which case the response is `<OPCODE>@ACK` (success) or `<OPCODE>^NAK`
# (deferred) or `<OPCODE>!ERR <n>` (error 1-6).
#
# Operators: `=` write, `?` read name, `#` read number, `+` increment,
# `-` decrement, no-op execute. Termination: [CR] (0x0D), [LF] (0x0A), or `;`.
# Modifiers and operands may be omitted; defaults substitute CURRENT zone etc.

- id: cms_advanced_color
  label: Advanced Color
  kind: action
  command: "CMS(ZONE.{zone}, {gamut}, {color_point})={value}"
  params:
    - {name: zone, type: integer, description: "Zone 1-4 (0=ZONE.1 .. 3=ZONE.4) or 255=CURRENT"}
    - {name: gamut, type: string, description: "REC709, SMPTEC, EBU, USER, AUTO, or CURRENT"}
    - {name: color_point, type: string, description: "RED.X, RED.Y, GREEN.X, GREEN.Y, BLUE.X, BLUE.Y, CYAN.X, CYAN.Y, MAGENTA.X, MAGENTA.Y, YELLOW.X, YELLOW.Y, WHITE.X, WHITE.Y"}
    - {name: value, type: integer, description: "0-800 (14 values when all color points set at once)"}

- id: cmsflag_advanced_color_flag
  label: Advanced Color Flag
  kind: query
  command: "CMSFLAG(ZONE.{zone}, {gamut}, {color_point})?"
  params:
    - {name: zone, type: integer, description: "Zone 1-4 or CURRENT"}
    - {name: gamut, type: string, description: "REC709, SMPTEC, EBU, USER, AUTO, or CURRENT"}
    - {name: color_point, type: string, description: "Color point name"}
  notes: "Returns empty string if achievable, \"*\" if not."

- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  command: "OSD.ALLOW.POPUP={value}"
  params:
    - {name: value, type: string, description: "NO or YES"}

- id: aspect_ratio
  label: Aspect Ratio
  kind: action
  command: "ASPECT(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: string, description: "AUTO, 16X9, 4X3, FILL, NATIVE, or LETTERBOX"}

- id: audio_input
  label: Audio Input
  kind: query
  command: "AUDIO.INPUT?"
  notes: "Returns the source currently playing audio in the zone chosen by Audio Select."

- id: audio_zone
  label: Audio Select
  kind: action
  command: "AUDIO.ZONE={value}"
  params:
    - {name: value, type: string, description: "ZONE.1, ZONE.2, ZONE.3, or ZONE.4"}

- id: audio_settings
  label: Audio Settings
  kind: action
  command: "AUDIO.SETTINGS={zone} {volume} {treble} {bass} {balance} {mute} {speakers}"
  params:
    - {name: zone, type: integer, description: "0=ZONE.1 .. 3=ZONE.4"}
    - {name: volume, type: integer, description: "0-100"}
    - {name: treble, type: integer, description: "0-100"}
    - {name: bass, type: integer, description: "0-100"}
    - {name: balance, type: integer, description: "0-100"}
    - {name: mute, type: integer, description: "0=OFF, 1=ON"}
    - {name: speakers, type: integer, description: "0=OFF, 1=ON"}

- id: auto_on
  label: Auto Power On
  kind: action
  command: "AUTO.ON={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}
  notes: "Available in standby."

- id: source_scan
  label: Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={value}"
  params:
    - {name: value, type: integer, description: "1-100"}

- id: audio_balance
  label: Balance
  kind: action
  command: "AUDIO.BALANCE={value}"
  params:
    - {name: value, type: integer, description: "0-100"}

- id: audio_bass
  label: Bass
  kind: action
  command: "AUDIO.BASS={value}"
  params:
    - {name: value, type: integer, description: "0-100"}

- id: blank_color
  label: Blank Screen Color
  kind: action
  command: "BLANK.COLOR={value}"
  params:
    - {name: value, type: string, description: "RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, or BLACK"}

- id: brightness
  label: Brightness
  kind: action
  command: "BRIGHTNESS(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-100"}

- id: color
  label: Color
  kind: action
  command: "COLOR(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-100"}

- id: color_gamut
  label: Color Gamut
  kind: action
  command: "COLOR.GAMUT(ZONE.{zone}, {type}, {gamut})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or CURRENT"}
    - {name: type, type: string, description: "SETTING, ACTUAL, COPY, or REVERT"}
    - {name: gamut, type: string, description: "REC709, SMPTE.C, EBU, USER, AUTO, CURRENT, or DISABLE"}
    - {name: value, type: string, description: "For SETTING: REC709, SMPTE.C, EBU, USER, AUTO, or DISABLE"}

- id: colorspace
  label: Color Space
  kind: action
  command: "COLORSPACE(ZONE.{zone}, {value_type})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or scope modifier"}
    - {name: value_type, type: string, description: "SETTING or ACTUAL"}
    - {name: value, type: string, description: "REC601, REC709, RGB, RGB.VIDEO, or AUTO"}

- id: color_subsampling
  label: Color Subsampling
  kind: query
  command: "COLOR.SUBSAMPLING(ZONE.{zone})?"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or CURRENT"}
  notes: "Returns string e.g. \"4:4:4\" or \"4:2:0\"."

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT"}
    - {name: value, type: string, description: "3200K, 5500K, 6500K, 7500K, 9300K, or NATIVE"}

- id: rotate
  label: Content Rotation
  kind: action
  command: "ROTATE(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0=NONE, 90, 180, 270"}

- id: contrast
  label: Contrast
  kind: action
  command: "CONTRAST(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-100"}

- id: current_zone
  label: Current Zone
  kind: action
  command: "CURRENT.ZONE={value}"
  params:
    - {name: value, type: string, description: "ZONE.1, ZONE.2, ZONE.3, or ZONE.4"}

- id: current_zone_layout
  label: Current Zone Layout
  kind: query
  command: "CURRENT.ZONE.LAYOUT?"
  notes: "Returns layout name (S.1, P.UL.1, Q.1, etc.). See Layouts table for value mapping."

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  command: "IPV4.GATEWAY(STATIC)=\"{value}\""
  params:
    - {name: value, type: string, description: "Dotted-quad IPv4 string"}

- id: network_dhcp
  label: DHCP
  kind: action
  command: "NETWORK.DHCP={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}
  notes: "Available in standby."

- id: diagnostic_color
  label: Diagnostic Color
  kind: action
  command: "DIAGNOSTIC.COLOR(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: string, description: "RED, GREEN, BLUE, or OFF"}

- id: display_name
  label: Display Name
  kind: action
  command: "DISPLAY.NAME=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted string. Special chars escaped with \\"}
  notes: "Available in standby."

- id: display_power
  label: Display Power
  kind: action
  command: "DISPLAY.POWER={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}
  notes: "Available in standby."

- id: dp_type
  label: DisplayPort Type
  kind: action
  command: "DP.TYPE={value}"
  params:
    - {name: value, type: string, description: "1.1 or 1.2"}

- id: network_dns1
  label: DNS Server 1
  kind: action
  command: "NETWORK.DNS1(STATIC)=\"{value}\""
  params:
    - {name: value, type: string, description: "Dotted-quad IPv4 string"}

- id: network_dns2
  label: DNS Server 2
  kind: action
  command: "NETWORK.DNS2(STATIC)=\"{value}\""
  params:
    - {name: value, type: string, description: "Dotted-quad IPv4 string"}

- id: edid_timing
  label: EDID Timing
  kind: action
  command: "EDID.TIMING({input}, {param})={value}"
  params:
    - {name: input, type: string, description: "OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP, or ALL"}
    - {name: param, type: string, description: "UPDATE, HACTIVE, VACTIVE, VREFRESH, FULL.SPEC, PCLK, HBLANK, HFP, HSYNC, VBLANK, VFP, VSYNC, FACTORY, TYPE, or HDR"}
    - {name: value, type: integer, description: "Signed integer; for TYPE: -3=4K60, -2=4K30, -1=1080P"}

- id: edid_selected_connector
  label: EDID Zone
  kind: action
  command: "EDID.SELECTEDCONNECTOR={value}"
  params:
    - {name: value, type: string, description: "OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, DP, or ALL"}

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: led_enable
  label: Enable Status LED
  kind: action
  command: "LED.ENABLE={value}"
  params:
    - {name: value, type: string, description: "DISABLE or ENABLE"}
  notes: "Available in standby. Write-only (`=` operator only)."

- id: error_log
  label: Error Log
  kind: query
  command: "ERROR.LOG({entry})?"
  params:
    - {name: entry, type: integer, description: "1-65535; entry 1 is most recent"}
  notes: "Returns quoted log string. Empty string means no more entries past that index."

- id: reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})"
  params:
    - {name: scope, type: string, description: "USER or FACTORY1"}
  notes: "Action (no operator, no operand). USER = user reset; FACTORY1 = USER + EDID + network + presets."

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "FIRMWARE.UPDATE({firmware}, {type})"
  params:
    - {name: firmware, type: string, description: "AUTO, VP.AP, or HDMI"}
    - {name: type, type: string, description: "START, PACKET, FINISH, or URL"}
  notes: "Available in standby. Action command."

- id: gain
  label: Gain
  kind: action
  command: "GAIN(ZONE.{zone}, {color})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT"}
    - {name: color, type: string, description: "RED, GREEN, BLUE, or ALL"}
    - {name: value, type: integer, description: "0-200 per color. For ALL: three space-separated 0-200 values for R/G/B."}

- id: gamma
  label: Gamma
  kind: action
  command: "GAMMA(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: string, description: "1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85, 1.9, 1.95, 2.0, 2.05, 2.1, 2.15, 2.2, 2.25, 2.3, 2.35, 2.4, 2.45, 2.5, 2.55, 2.6, 2.65, 2.7, 2.75, or 2.8"}

- id: cec_enable
  label: HDMI CEC
  kind: action
  command: "CEC.ENABLE={value}"
  params:
    - {name: value, type: string, description: "Disable or Enable"}

- id: hdr_content
  label: HDR Content
  kind: action
  command: "HDR.CONTENT={value}"
  params:
    - {name: value, type: string, description: "Off, On, or Auto"}

- id: hdr_metadata
  label: HDR Metadata
  kind: query
  command: "HDR.METADATA({zone})?"
  params:
    - {name: zone, type: integer, description: "0=ZONE.1, 1=ZONE.2, 2=ZONE.3, 3=ZONE.4"}
  notes: "Returns Absent or Present."

- id: help
  label: Help
  kind: action
  command: "HELP={command}"
  params:
    - {name: command, type: string, description: "Opcode name, or FIRST, or NEXT (numeric 0 / 2147483647)"}
  notes: "Available in standby. To list all commands, send HELP(FIRST)? then HELP(NEXT)? repeatedly."

- id: hostname
  label: Host Name
  kind: action
  command: "HOSTNAME=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted string; no spaces allowed"}
  notes: "Available in standby. Default = \"UltraRes\"."

- id: signal_info
  label: Image Information
  kind: query
  command: "SIGNAL.INFO({zone}, {parameter})?"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or CURRENT (default)"}
    - {name: parameter, type: string, description: "HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS, or ALL (default)"}

- id: pan
  label: Image Position
  kind: action
  command: "PAN(ZONE.{zone}, {direction})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT"}
    - {name: direction, type: string, description: "X, Y, or ALL (default)"}
    - {name: value, type: integer, description: "-1000 to 1000. For ALL: two values X Y."}

- id: ipv4_address
  label: IP Address
  kind: action
  command: "IPV4.ADDRESS(STATIC)=\"{value}\""
  params:
    - {name: value, type: string, description: "Dotted-quad IPv4 string"}
  notes: "Available in standby."

- id: ir_code
  label: IR Code
  kind: action
  command: "IR.CODE={value}"
  params:
    - {name: value, type: integer, description: "0-65535"}
  notes: "Available in standby."

- id: ir_lock
  label: IR Remote Lock
  kind: action
  command: "IR.LOCK={value}"
  params:
    - {name: value, type: string, description: "DISABLE or ENABLE"}
  notes: "Available in standby. Write-only."

- id: key
  label: Key
  kind: action
  command: "KEY={key_name}"
  params:
    - {name: key_name, type: string, description: "See Key Codes table: UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.0-9, MUTE, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1-4, ZONE1-4, PIP.MODE, PIP.SWAP, HDMI1-4, DISPLAY.PORT, OPS, WALL, COLOR, MISC, ARROW.LEFT, ARROW.RIGHT, STAR.STAR"}
  notes: "Available in standby."

- id: key_lock
  label: Keypad Lock
  kind: action
  command: "KEY.LOCK={value}"
  params:
    - {name: value, type: string, description: "DISABLE or ENABLE"}
  notes: "Available in standby. Write-only."

- id: layout
  label: Layout
  kind: action
  command: "LAYOUT({view})={value}"
  params:
    - {name: view, type: string, description: "Multi-source view: DUAL, TRIPLE, PIP, CURRENT, or omit"}
    - {name: value, type: string, description: "SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, DUAL.T, TRIPLE.L, TRIPLE.R, TRIPLE.T, TRIPLE.B, TRIPLE.M, or QUAD"}

- id: local_dimming
  label: Local Dimming
  kind: action
  command: "LOCAL.DIMMING={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: network_mac
  label: MAC Address
  kind: query
  command: "NETWORK.MAC?"
  notes: "Returns MAC string e.g. \"12:34:56:AB:CD:EF\"."

- id: memc_level
  label: MEMC
  kind: action
  command: "MEMC.LEVEL={value}"
  params:
    - {name: value, type: string, description: "OFF, LOW, MEDIUM, or HIGH"}

- id: osd_position
  label: Menu Position
  kind: action
  command: "OSD.POSITION={value}"
  params:
    - {name: value, type: string, description: "CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, or LOWER.RIGHT"}

- id: model_id
  label: Model ID
  kind: query
  command: "MODEL.ID?"
  notes: "Returns model string, e.g. \"UR8451\"."

- id: model_series
  label: Model Series
  kind: query
  command: "MODEL.SERIES?"
  notes: "Always returns \"UltraRes\" for this product."

- id: multi_view
  label: Multi-Source View
  kind: action
  command: "MULTI.VIEW={value}"
  params:
    - {name: value, type: string, description: "SINGLE, DUAL, TRIPLE, QUAD, or PIP"}

- id: audio_mute
  label: Mute
  kind: action
  command: "AUDIO.MUTE={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: command_enable
  label: Network Commands
  kind: action
  command: "COMMAND.ENABLE(NETWORK)={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}
  notes: "Enables/disables TCP port 52 and UDP port 52 (note: differs from the TCP/UDP control port 57)."

- id: network_ping
  label: Network Ping
  kind: action
  command: "NETWORK.PING=\"{value}\""
  params:
    - {name: value, type: string, description: "Hostname or IP string"}
  notes: "Available in standby. Response: \"SUCCESS\" or \"FAILED\"."

- id: network_enable
  label: Network Port
  kind: action
  command: "NETWORK.ENABLE={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: source_next
  label: Next Source
  kind: action
  command: "SOURCE.NEXT(ZONE.{zone})"
  params:
    - {name: zone, type: string, description: "ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, or CURRENT (default)"}
  notes: "Action (no operator, no operand)."

- id: noise_reduction
  label: Noise Reduction
  kind: action
  command: "NOISE.REDUCTION(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: string, description: "OFF, LOW, MEDIUM, or HIGH"}

- id: notification_email
  label: Notification Event
  kind: action
  command: "NOTIFICATION.EMAIL({event})={enable}, \"{recipients}\", \"{message}\""
  params:
    - {name: event, type: string, description: "POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, or SOURCE.SELECTED"}
    - {name: enable, type: string, description: "DISABLE or ENABLE"}
    - {name: recipients, type: string, description: "Quoted email recipient list"}
    - {name: message, type: string, description: "Quoted custom user message"}
  notes: "Available in standby."

- id: network_ntpserver
  label: NTP Server
  kind: action
  command: "NETWORK.NTPSERVER=\"{value}\""
  params:
    - {name: value, type: string, description: "NTP server hostname"}
  notes: "Available in standby. Default = \"0.pool.ntp.org\"."

- id: offset
  label: Offset
  kind: action
  command: "OFFSET(ZONE.{zone}, {color})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT"}
    - {name: color, type: string, description: "RED, GREEN, BLUE, or ALL"}
    - {name: value, type: integer, description: "0-100 per color. For ALL: three space-separated 0-100 values for R/G/B."}

- id: ops_power_check
  label: OPS Power Down Check
  kind: action
  command: "OPS.POWER.CHECK={value}"
  params:
    - {name: value, type: string, description: "DISABLE or ENABLE"}
  notes: "Available in standby."

- id: ops_present
  label: OPS Present
  kind: query
  command: "OPS.PRESENT?"
  notes: "Returns FALSE or TRUE."

- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE"
  notes: "Action (no operator, no operand). Closes any on-screen menus or message boxes."

- id: orientation
  label: OSD Rotation
  kind: action
  command: "ORIENTATION={value}"
  params:
    - {name: value, type: string, description: "LANDSCAPE or PORTRAIT"}

- id: osd_status
  label: OSD Status
  kind: query
  command: "OSD.STATUS?"
  notes: "Returns DISABLE or ENABLE indicating whether OSD is currently shown."

- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={value}"
  params:
    - {name: value, type: string, description: "OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, or 240.SECONDS. Numeric value in seconds accepted."}

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={value}"
  params:
    - {name: value, type: integer, description: "0-5"}

- id: overscan
  label: Overscan
  kind: action
  command: "OVERSCAN(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-20"}

- id: pip_size
  label: PIP Size
  kind: action
  command: "PIP.SIZE={value}"
  params:
    - {name: value, type: string, description: "SMALL, MEDIUM, or LARGE"}

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "PIP.SWAP"
  notes: "Action (no operator, no operand). Swaps main and PIP windows."

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}

- id: power_down_mode
  label: Power Down Mode
  kind: action
  command: "POWER.DOWN.MODE={value}"
  params:
    - {name: value, type: string, description: "Standby.Mode, Networked.Standby.Mode, or Fast.Startup"}
  notes: "RS-232 only functions in Networked.Standby.Mode or Fast.Startup."

- id: power_on_delay
  label: Power On Delay
  kind: action
  command: "POWER.ON.DELAY={value}"
  params:
    - {name: value, type: number, description: "Unsigned fixed point 0.0-10.0 seconds"}
  notes: "Available in standby."

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  command: "POWER.SAVE.DELAY={value}"
  params:
    - {name: value, type: string, description: "1.MINUTE, 5.MINUTES, 15.MINUTES, 30.MINUTES, 60.MINUTES. Numeric value in seconds accepted."}
  notes: "Available in standby."

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  command: "POWER.SAVE.MODE={value}"
  params:
    - {name: value, type: string, description: "Disable, Power.Down, or Wake.On.Signal"}
  notes: "Available in standby."

- id: preset_count
  label: Preset Count
  kind: query
  command: "PRESET.COUNT?"
  notes: "Returns number of non-empty presets."
  notes_extra: "Available in standby."

- id: preset_delete
  label: Preset Delete
  kind: action
  command: "PRESET.DELETE({preset})"
  params:
    - {name: preset, type: integer, description: "Preset number 1-1000"}
  notes: "Action (no operator, no operand). Available in standby."

- id: preset_full
  label: Preset Full
  kind: query
  command: "PRESET.FULL({preset})?"
  params:
    - {name: preset, type: integer, description: "Preset number 1-1000"}
  notes: "Returns NO or YES. Available in standby."

- id: preset_list
  label: Preset List
  kind: query
  command: "PRESET.LIST({step})?"
  params:
    - {name: step, type: string, description: "FIRST or NEXT (numeric 0 / 2147483647)"}
  notes: "Returns list of preset numbers. Available in standby."

- id: preset_max
  label: Preset Max
  kind: query
  command: "PRESET.MAX?"
  notes: "Returns highest saved preset number. Available in standby."

- id: preset_name
  label: Preset Name
  kind: action
  command: "PRESET.NAME({preset})=\"{value}\""
  params:
    - {name: preset, type: integer, description: "Preset number 1-1000"}
    - {name: value, type: string, description: "Quoted name. Default = \"Preset n\"."}
  notes: "Available in standby."

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "PRESET.RECALL({preset})"
  params:
    - {name: preset, type: integer, description: "Preset number 1-1000"}
  notes: "Action (no operator, no operand)."

- id: preset_save
  label: Preset Save
  kind: action
  command: "PRESET.SAVE({preset})"
  params:
    - {name: preset, type: integer, description: "Preset number 1-1000"}
  notes: "Action (no operator, no operand). Up to 100 presets; numbers need not be contiguous."

- id: system_reboot
  label: Reboot
  kind: action
  command: "SYSTEM.REBOOT"
  notes: "Action (no operator, no operand). Forces system restart."

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS(ZONE.{zone})"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or CURRENT (default)"}
  notes: "Action (no operator, no operand)."

- id: clone_settings
  label: Save and Restore Settings
  kind: action
  command: "CLONE.SETTINGS({operation}, {location})"
  params:
    - {name: operation, type: string, description: "COPY or PASTE"}
    - {name: location, type: string, description: "USB"}
  notes: "Action (no operator, no operand)."

- id: save_diagnostics
  label: Save Diagnostics
  kind: action
  command: "SAVE.DIAGNOSTICS(USB)"
  notes: "Action (no operator, no operand)."

- id: schedule
  label: Schedule
  kind: action
  command: "SCHEDULE({slot}, {parameter})={value}"
  params:
    - {name: slot, type: integer, description: "Schedule slot 1-20"}
    - {name: parameter, type: string, description: "FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE, or ALL (default)"}
    - {name: value, type: integer, description: "Unsigned int. Specific values per parameter (see SCHEDULE.ACTION, SCHEDULE.DAY, SCHEDULE.FREQUENCY)"}
  notes: "Available in standby."

- id: schedule_action
  label: Schedule Action
  kind: action
  command: "SCHEDULE.ACTION({slot})={value}"
  params:
    - {name: slot, type: integer, description: "Schedule slot 1-20"}
    - {name: value, type: string, description: "TURN.ON, TURN.OFF, RECALL, or PANEL.BRIGHTNESS"}
  notes: "Available in standby."

- id: schedule_day
  label: Schedule Day
  kind: action
  command: "SCHEDULE.DAY({slot})={value}"
  params:
    - {name: slot, type: integer, description: "Schedule slot 1-20"}
    - {name: value, type: string, description: "MON, TUE, WED, THU, FRI, SAT, or SUN"}
  notes: "Available in standby."

- id: schedule_description
  label: Schedule Description
  kind: query
  command: "SCHEDULE.DESCRIPTION({slot})?"
  params:
    - {name: slot, type: integer, description: "Schedule slot 1-20"}
  notes: "Returns schedule description string. Available in standby."

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({slot})={value}"
  params:
    - {name: slot, type: integer, description: "Schedule slot 1-20"}
    - {name: value, type: string, description: "DAILY, WEEKLY, WEEKDAYS, or WEEKENDS"}
  notes: "Available in standby."

- id: serial_device
  label: Serial Device
  kind: action
  command: "SERIAL.DEVICE({port}, BAUD)=\"{value}\""
  params:
    - {name: port, type: string, description: "DB9, USB, or OPS"}
    - {name: value, type: string, description: "Baud rate as quoted string (e.g. \"19200\")"}

- id: serial_number
  label: Serial Number
  kind: query
  command: "SERIAL.NUMBER?"
  notes: "Returns serial number string."

- id: sharpness
  label: Sharpness
  kind: action
  command: "SHARPNESS(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-100"}

- id: smtp_authentication
  label: SMTP Authentication
  kind: action
  command: "NETWORK.SMTP.AUTHENTICATION={value}"
  params:
    - {name: value, type: string, description: "NONE, AUTO, PLAIN, SCRAM_SHA1, CRAM_MD5, DIGEST_MD5, LOGIN, or NTLM"}
  notes: "Available in standby."

- id: smtp_encryption
  label: SMTP Connection Encryption
  kind: action
  command: "NETWORK.SMTP.ENCRYPTION={value}"
  params:
    - {name: value, type: string, description: "NONE, TLS, or START.TLS"}
  notes: "Available in standby."

- id: smtp_from
  label: SMTP Email From Address
  kind: action
  command: "NETWORK.SMTP.FROM=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted email address string"}
  notes: "Available in standby."

- id: smtp_password
  label: SMTP Password
  kind: action
  command: "NETWORK.SMTP.PASSWORD=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted password string"}
  notes: "Available in standby."

- id: smtp_port
  label: SMTP Port
  kind: action
  command: "NETWORK.SMTP.PORT={value}"
  params:
    - {name: value, type: integer, description: "Unsigned int (e.g. 465)"}
  notes: "Available in standby."

- id: smtp_server
  label: SMTP Server
  kind: action
  command: "NETWORK.SMTP.SERVER=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted server hostname"}
  notes: "Available in standby."

- id: smtp_username
  label: SMTP Username
  kind: action
  command: "NETWORK.SMTP.USERNAME=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted username string"}
  notes: "Available in standby."

- id: snmp_enable
  label: SNMP
  kind: action
  command: "SNMP.ENABLE={value}"
  params:
    - {name: value, type: string, description: "On or Off"}

- id: source_message
  label: Source Message
  kind: query
  command: "SOURCE.MESSAGE(ZONE.{zone})?"
  params:
    - {name: zone, type: string, description: "ZONE.1-4 or CURRENT (default)"}
  notes: "Returns resolution/refresh string, or \"Searching\" / \"No Signal\"."

- id: source_select
  label: Source Select
  kind: action
  command: "SOURCE.SELECT(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, or CURRENT (default)"}
    - {name: value, type: string, description: "OPS, HDMI.1, HDMI.2, HDMI.3, HDMI.4, or DP"}

- id: splash_screen
  label: Splash Screen
  kind: action
  command: "SPLASH.SCREEN={value}"
  params:
    - {name: value, type: string, description: "DISABLE or ENABLE"}

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  command: "IPV4.NETMASK(STATIC)=\"{value}\""
  params:
    - {name: value, type: string, description: "Dotted-quad netmask string"}
  notes: "Available in standby."

- id: system_state
  label: System State
  kind: query
  command: "SYSTEM.STATE?"
  notes: "Returns STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, or FAULT."

- id: smtp_test
  label: Test Email
  kind: action
  command: "NETWORK.SMTP.TEST({event})"
  params:
    - {name: event, type: string, description: "POWER.STATE.CHANGED, ERROR.OCCURRED, SOURCE.DETECTED, SOURCE.LOST, or SOURCE.SELECTED"}
  notes: "Action (no operator, no operand). Available in standby."

- id: test_pattern
  label: Test Pattern
  kind: action
  command: "PATTERN({pattern})"
  params:
    - {name: pattern, type: string, description: "NONE, BLACK, WHITE, GRAY, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, GRAYBAR, REDBAR, GREENBAR, BLUEBAR, CHECKERBOARD, or COLORBAR"}
  notes: "Action (no operator, no operand)."

- id: time
  label: Time
  kind: action
  command: "TIME({field})={value}"
  params:
    - {name: field, type: string, description: "YEAR, MONTH, DATE, HOUR, MINUTE, or ALL (default)"}
    - {name: value, type: integer, description: "Unsigned int"}
  notes: "Available in standby."

- id: time_day
  label: Time - Day
  kind: query
  command: "TIME.DAY?"
  notes: "Returns MON, TUE, WED, THU, FRI, SAT, or SUN. Available in standby."

- id: time_month
  label: Time - Month
  kind: action
  command: "TIME.MONTH={value}"
  params:
    - {name: value, type: string, description: "JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, or DECEMBER"}
  notes: "Available in standby."

- id: time_string
  label: Time - String
  kind: query
  command: "TIME.STRING?"
  notes: "Returns ISO-like date/time string. Available in standby."

- id: timezone
  label: Time Zone
  kind: action
  command: "TIMEZONE={value}"
  params:
    - {name: value, type: string, description: "See Timezone Values table (e.g. UTCM0800.PACIFIC.TIME.US.CANADA, UTC.COORDINATED.UNIVERSAL.TIME)"}
  notes: "Available in standby."

- id: tint
  label: Tint
  kind: action
  command: "TINT(ZONE.{zone})={value}"
  params:
    - {name: zone, type: string, description: "ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, or CURRENT (default)"}
    - {name: value, type: integer, description: "0-100"}

- id: touch_control
  label: Touch Control
  kind: action
  command: "TOUCH.CONTROL={value}"
  params:
    - {name: value, type: string, description: "OPS, EXTERNAL, or AUTO"}
  notes: "Available in standby."

- id: audio_treble
  label: Treble
  kind: action
  command: "AUDIO.TREBLE={value}"
  params:
    - {name: value, type: integer, description: "0-100"}

- id: network_ntp
  label: Use Network Time
  kind: action
  command: "NETWORK.NTP={value}"
  params:
    - {name: value, type: string, description: "OFF or ON"}
  notes: "Available in standby."

- id: build_info
  label: Version Info
  kind: query
  command: "BUILD.INFO({field})?"
  params:
    - {name: field, type: string, description: "DATE.SCP, VERSION.SCP, DATE.VP, VERSION.VP, SRC.INFO.VP, VERSION.HDMI, VERSION.FRC, PKG.DATE, PKG.VERSION, or VERSION.SPM"}
  notes: "Returns version/build string. Available in standby."

- id: audio_volume
  label: Volume
  kind: action
  command: "AUDIO.VOLUME={value}"
  params:
    - {name: value, type: integer, description: "0-100"}

- id: wall
  label: Wall
  kind: action
  command: "WALL({parameter})={value}"
  params:
    - {name: parameter, type: string, description: "ENABLE, WIDTH, HEIGHT, COLUMN, ROW, FRAME.ENABLE, FRAME.WIDTH, or FRAME.HEIGHT"}
    - {name: value, type: integer, description: "0-100"}

- id: password_set
  label: Web UI Password
  kind: action
  command: "PASSWORD.SET=\"{value}\""
  params:
    - {name: value, type: string, description: "Quoted password string (e.g. \"123456\")"}
  notes: "Sets Admin password for the Web UI."
```

## Feedbacks
```yaml
# Every Action whose operator is `?` or `#` returns the current value as
# `<OPCODE>:<value>`. Action commands (no operator) return:
#   - `<OPCODE>@ACK` on success
#   - `<OPCODE>^NAK` if command received but cannot be processed
#   - `<OPCODE>!ERR <n>` on error, where n is 1=Invalid syntax, 2=Reserved,
#     3=Command not recognized, 4=Invalid modifier, 5=Invalid operands,
#     6=Invalid operator.
# Responses are uppercase. Termination matches the request (CR, LF, or `;`).
- id: error_code
  type: enum
  values: [invalid_syntax, reserved, command_not_recognized, invalid_modifier, invalid_operand, invalid_operator]
  notes: "Source: !ERR 1-6."
- id: network_ping_result
  type: enum
  values: [SUCCESS, FAILED]
  notes: "Response of NETWORK.PING."
- id: ops_present
  type: enum
  values: [FALSE, TRUE]
- id: source_message
  type: string
  notes: "Resolution/refresh string, \"Searching\", or \"No Signal\"."
- id: system_state
  type: enum
  values: [STANDBY, POWERING.ON, ON, POWERING.DOWN, BACKLIGHT.OFF, FAULT]
- id: error_log_entry
  type: string
  notes: "Quoted log string. Empty = no more entries past this index."
- id: osd_status
  type: enum
  values: [DISABLE, ENABLE]
- id: hdr_metadata
  type: enum
  values: [Absent, Present]
- id: model_id
  type: string
  notes: "e.g. UR8451."
- id: model_series
  type: string
  notes: "Always \"UltraRes\" for this product."
- id: serial_number
  type: string
- id: network_mac
  type: string
  notes: "MAC string e.g. \"12:34:56:AB:CD:EF\"."
- id: schedule_description
  type: string
- id: time_string
  type: string
  notes: "ISO-like \"YYYY-MM-DD HH:MM\"."
- id: time_day
  type: enum
  values: [MON, TUE, WED, THU, FRI, SAT, SUN]
- id: preset_full
  type: enum
  values: [NO, YES]
- id: color_subsampling
  type: string
  notes: "e.g. \"4:4:4\" or \"4:2:0\"."
- id: signal_info
  type: integer
  notes: "Integer per-parameter (HACTIVE, VACTIVE, PCLK, VREFRESH, etc.) or quoted ALL block."
- id: build_info
  type: string
```

## Variables
```yaml
# All action parameters are settable variables. Listed here only when the
# parameter has independent utility beyond triggering a command.
# (Most variables are 1:1 with action operands; refer to the Actions section.)
- id: brightness_level
  type: integer
  range: "0-100"
  notes: "Per-zone (ZONE.1-4, ALL.INPUT, ALL, ALL.ZONE, CURRENT)."
- id: contrast_level
  type: integer
  range: "0-100"
- id: volume
  type: integer
  range: "0-100"
- id: power_on_delay
  type: number
  range: "0.0-10.0"
  unit: seconds
- id: power_down_mode
  type: enum
  values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]
  notes: "Must be Networked.Standby.Mode or Fast.Startup for RS-232 to work."
- id: timezone
  type: string
  notes: "See source Timezone Values table (105 entries)."
- id: hostname
  type: string
  notes: "Default \"UltraRes\"; spaces not allowed."
```

## Events
```yaml
# UNRESOLVED: source does not document any unsolicited notifications pushed
# from the display to the controller. SMTP/email notifications are configured
# (NOTIFICATION.EMAIL) but the device itself does not stream events.
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step command sequences. The
# AUDIO.SETTINGS command provides a single-message write of 7 audio parameters
# but is documented as a single action, not a macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or
# power-on sequencing requirements beyond the note that RS-232 requires
# POWER.DOWN.MODE to be Networked.Standby.Mode or Fast.Startup.
```

## Notes
- **Three transports, one command set:** DB9 RS-232, USB-B serial (appears as
  COM port on host), and TCP / UDP port 57. No Telnet encoding on TCP —
  connect as "Other" raw TCP. UDP requires manual CR appending in most tools
  (example: `DISPLAY.POWER=1[CR]` is hex `444953504C41592E504F5745523D310D`).
- **Two network ports documented:** TCP/UDP **port 57** for the serial command
  set, and TCP/UDP **port 52** separately controlled by `COMMAND.ENABLE(NETWORK)`.
  Port 52 is distinct from port 57.
- **Excluded models:** UR8450 and UR9850 are NOT covered; their RS-232 protocol
  lives in a separate User Manual at planar.com/support.
- **DB9 pinout:** Pin 2 Tx, Pin 3 Rx, Pin 5 GND; all others NC. Straight-through
  cable.
- **USB-B serial** uses the same command set as DB9; baud rate for the USB
  connection is also configurable via `SERIAL.DEVICE(USB, BAUD)`.
- **Operator syntax:** `=` write, `?` read name, `#` read number, `+`/`-`
  increment/decrement, no operator = execute action. `?`/`#` return is
  `<OPCODE>:<value>`; actions return `@ACK` / `^NAK` / `!ERR n`.
- **Terminator:** CR (0x0D), LF (0x0A), or `;`. Response uses the same.
- **String escaping:** Special characters, CR, LF, `"`, and `\` are escaped
  with backslash inside quoted string operands.
- **All ops are case-insensitive**; responses are uppercase. Whitespace flexible.
- **Standby availability:** Many commands work in standby (marked "Available
  in standby" in source). RS-232 itself requires `POWER.DOWN.MODE` to be
  Networked.Standby.Mode or Fast.Startup.

<!-- UNRESOLVED: firmware version compatibility, voltage/current specs, fault
recovery sequences, error retry behavior, and any protocol version numbers
were not stated in the source and are intentionally omitted. -->
```

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/2jtdzv5r/020-1397-00c-ultrares-series-rs232-user-manual.pdf
  - https://www.planar.com/media/tghnvl0f/020-1397-00b_ultrares-x-series_rs232-user-manual-wm.pdf
  - https://www.planar.com/media/v2mototw/020-1397-00c-ultrares-series-rs232-user-manual.pdf
retrieved_at: 2026-05-01T02:08:48.725Z
last_checked_at: 2026-06-02T17:23:50.505Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:23:50.505Z
matched_actions: 132
action_count: 132
confidence: medium
summary: "All 132 spec opcodes match source table entries one-to-one; transport values (baud 19200, port 57, 8N1, no flow control) confirmed verbatim in source. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "explicit firmware version compatibility not stated in source"
- "source does not document any unsolicited notifications pushed"
- "source does not describe multi-step command sequences. The"
- "source contains no safety warnings, interlock procedures, or"
- "firmware version compatibility, voltage/current specs, fault"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
