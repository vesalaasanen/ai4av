---
spec_id: admin/planar-urxx51-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Planar UltraRes P Series Control Spec"
manufacturer: Planar
model_family: "UltraRes P Series"
aliases: []
compatible_with:
  manufacturers:
    - Planar
  models:
    - "UltraRes P Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:32.293Z
last_checked_at: 2026-06-02T04:20:13.374Z
generated_at: 2026-06-02T04:20:13.374Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated in source"
  - "source documents all parameters as discrete actions with named operators"
  - "source does not document multi-step macro sequences on the device side."
  - "source notes that Power Down Mode must be set to Networked"
  - "error recovery sequences beyond ERR 1-6 codes not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T04:20:13.374Z
  matched_actions: 106
  action_count: 106
  confidence: medium
  summary: "All 106 spec actions have literal matches in the source command table; transport parameters (19200 baud, 8N1, port 23 TCP) are verbatim; spec provides comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Planar UltraRes P Series Control Spec

## Summary
Planar UltraRes P Series large-format displays. Same serial command set exposed over RS-232, TCP/Telnet (port 23), and SSH (port 22). RS-232 is always available; TCP/SSH are disabled by default and must be enabled through Remote Monitoring Software. ASCII command/response protocol with named opcodes, optional modifiers, operators, and operands terminated by CR/LF/semicolon.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  # SSH is also supported on port 22 (user: root) but is not enumerated as a
  # transport protocol in this spec; the command/response wire format is
  # identical to TCP/serial.
addressing:
  port: 23  # TCP/Telnet. SSH uses port 22.
serial:
  baud_rate: 19200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # Network access requires login via Remote Monitoring Software (TCP) or SSH user/password (root). RS-232 itself has no wire-level auth.
  # inferred: source describes explicit login procedure for TCP/SSH paths
```

**Connector pin-out (DB9 female, straight-through):** Pin 2 Tx, Pin 3 Rx, Pin 5 GND. All other pins NC. Power Down Mode must be set to Networked Standby or Fast Startup before RS-232 commands are accepted.

**Wire format (all transports):** `[OPCODE](MODIFIERS)[OPERATOR][OPERANDS][TERM]`
- OPCODE: named (e.g. `GAIN`) or numeric (e.g. `200`)
- MODIFIERS: zero or more in parentheses, e.g. `(ZONE.1, ALL)`
- OPERATOR: `=` write, `?` read name, `#` read numeric, `+` increment, `-` decrement, `:` response, `!ERR` error, `@ACK` ack, `^NAK` nack, none = execute
- OPERAND: enumerated, quoted string, integer, or fixed-point
- TERM: CR (0x0D), LF (0x0A), or `;`

**Error codes:** ERR 1 invalid syntax, ERR 2 reserved, ERR 3 unknown command, ERR 4 invalid modifier, ERR 5 invalid operand, ERR 6 invalid operator.

## Traits
```yaml
# powerable       - DISPLAY.POWER, SYSTEM.STATE, PATTERN, SYSTEM.REBOOT
# routable        - SOURCE.SELECT, MULTI.VIEW, LAYOUT, CURRENT.ZONE
# queryable       - most commands support ?/# read operators
# levelable       - VOLUME, BRIGHTNESS, CONTRAST, COLOR, GAIN, OFFSET, BACKLIGHT, TINT, SHARPNESS, etc.
```

## Actions
```yaml
# OSD / Menus
- id: osd_allow_popup
  label: Allow Pop Up Messages
  kind: action
  command: "OSD.ALLOW.POPUP={0|1}"  # 0=NO, 1=YES
  params:
    - name: value
      type: enum
      values: [NO, YES]
      description: Allow pop-up messages

- id: osd_close
  label: OSD Close
  kind: action
  command: "OSD.CLOSE"  # action operator, no operand
  params: []

- id: osd_position
  label: Menu Position
  kind: action
  command: "OSD.POSITION={0..4}"
  params:
    - name: value
      type: enum
      values: [CENTER, UPPER.LEFT, UPPER.RIGHT, LOWER.LEFT, LOWER.RIGHT]

- id: osd_rotation
  label: OSD Rotation
  kind: action
  command: "ORIENTATION={0|1}"
  params:
    - name: value
      type: enum
      values: [LANDSCAPE, PORTRAIT]

- id: osd_status
  label: OSD Status (query)
  kind: query
  command: "OSD.STATUS?"
  params: []

- id: osd_timeout
  label: OSD Timeout
  kind: action
  command: "OSD.TIMEOUT={0|10|30|60|120|240}"
  params:
    - name: value
      type: enum
      values: [OFF, 10.SECONDS, 30.SECONDS, 60.SECONDS, 120.SECONDS, 240.SECONDS]

- id: osd_transparency
  label: OSD Transparency
  kind: action
  command: "OSD.TRANSPARENCY={0..100}"
  params:
    - name: value
      type: integer
      description: Transparency percentage

- id: blank_color
  label: Blank Screen Color
  kind: action
  command: "BLANK.COLOR={0..7}"
  params:
    - name: value
      type: enum
      values: [RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW, WHITE, BLACK]

- id: splash_screen
  label: Splash Screen
  kind: action
  command: "SPLASH.SCREEN={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: language
  label: Language
  kind: action
  command: "LANGUAGE={0..8}"
  params:
    - name: value
      type: enum
      values: [ENGLISH, FRENCH, GERMAN, SPANISH, ITALIAN, CHINESE.SIMPLIFIED, CHINESE.TRADITIONAL, PORTUGUESE, JAPANESE]

# Image Adjust
- id: aspect
  label: Aspect Ratio
  kind: action
  command: "ASPECT({zone})={0..5}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: [AUTO, 16X9, 4X3, FILL, NATIVE, LETTERBOX]

- id: backlight_intensity
  label: Backlight Intensity
  kind: action
  command: "BACKLIGHT.INTENSITY={1..100}"
  params:
    - name: value
      type: integer
      description: Intensity 1-100

- id: brightness
  label: Brightness
  kind: action
  command: "BRIGHTNESS({zone})={0..100}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
      description: Brightness 0-100

- id: color
  label: Color
  kind: action
  command: "COLOR({zone})={0..100}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
      description: Color 0-100

- id: colorspace
  label: Color Space
  kind: action
  command: "COLORSPACE({zone},{setting_or_actual})={0..4}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: setting_or_actual
      type: enum
      values: [SETTING, ACTUAL]
      description: "SETTING=configured, ACTUAL=applied (cannot return AUTO)"
    - name: value
      type: enum
      values: [REC601, REC709, RGB, RGB.VIDEO, AUTO]

- id: color_subsampling
  label: Color Subsampling (query)
  kind: query
  command: "COLOR.SUBSAMPLING({zone})?"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]

- id: color_temperature
  label: Color Temperature
  kind: action
  command: "COLOR.TEMPERATURE({zone})={0..5}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: ["3200K", "5500K", "6500K", "7500K", "9300K", NATIVE]

- id: contrast
  label: Contrast
  kind: action
  command: "CONTRAST({zone})={0..100}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
      description: Contrast 0-100

- id: gain
  label: Gain (per color)
  kind: action
  command: "GAIN({zone},{color})={0..200}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: value
      type: integer
      description: Gain 0-200 (per channel) or three values (R G B) for ALL

- id: gamma
  label: Gamma
  kind: action
  command: "GAMMA({zone})={6|8|10|12|14|16|18|20|22|24|26|28}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: enum
      values: ["1.8", "1.9", "2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "2.9"]

- id: offset
  label: Offset (per color)
  kind: action
  command: "OFFSET({zone},{color})={0..100}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: color
      type: enum
      values: [RED, GREEN, BLUE, ALL]
    - name: value
      type: integer
      description: Offset 0-100 (per channel) or three values (R G B) for ALL

- id: overscan
  label: Overscan
  kind: action
  command: "OVERSCAN({zone})={0..20}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
      description: Overscan 0-20

- id: revert_image_settings
  label: Revert Image Settings
  kind: action
  command: "REVERT.IMAGE.SETTINGS({zone})"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]

- id: sharpness
  label: Sharpness
  kind: action
  command: "SHARPNESS={0..5}"
  params:
    - name: value
      type: integer
      description: Sharpness 0-5

- id: tint
  label: Tint
  kind: action
  command: "TINT({zone})={0..100}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL.INPUT, ALL, ALL.ZONE, CURRENT]
    - name: value
      type: integer
      description: Tint 0-100

# Routing / Multi-Source View
- id: current_zone
  label: Current Zone
  kind: action
  command: "CURRENT.ZONE={0..3}"
  params:
    - name: value
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]

- id: current_zone_layout
  label: Current Zone Layout (query)
  kind: query
  command: "CURRENT.ZONE.LAYOUT?"
  params: []

- id: layout
  label: Multi-Source View Layout
  kind: action
  command: "LAYOUT={0|1|2|3|4|5|12}"
  params:
    - name: value
      type: enum
      values: [SINGLE, PIP.UL, PIP.UR, PIP.LL, PIP.LR, DUAL.L, QUAD]

- id: multi_view
  label: Multi-Source View Mode
  kind: action
  command: "MULTI.VIEW={0|1|3|4}"
  params:
    - name: value
      type: enum
      values: [SINGLE, DUAL, QUAD, PIP]

- id: pip_size
  label: PIP Size
  kind: action
  command: "PIP.SIZE={0|1|2}"
  params:
    - name: value
      type: enum
      values: [SMALL, MEDIUM, LARGE]

- id: pip_swap
  label: PIP Swap
  kind: action
  command: "PIP.SWAP"
  params: []

- id: source_next
  label: Next Source
  kind: action
  command: "SOURCE.NEXT({zone})"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ALL, CURRENT]

- id: source_select
  label: Source Select
  kind: action
  command: "SOURCE.SELECT({zone})={1|2|5|13|14|15}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, ZONE.1.SECONDARY, ALL, CURRENT]
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, NONE, USBC]
      description: "NONE only valid for ZONE.1.SECONDARY"

- id: source_scan
  label: Auto Scan Sources
  kind: action
  command: "SOURCE.SCAN={0|1|2}"
  params:
    - name: value
      type: enum
      values: [OFF, ON, FAILOVER]

- id: source_message
  label: Source Message (query)
  kind: query
  command: "SOURCE.MESSAGE({zone})?"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]

# Audio
- id: audio_input
  label: Audio Input (query)
  kind: query
  command: "AUDIO.INPUT?"
  params: []

- id: audio_zone
  label: Audio Select (zone)
  kind: action
  command: "AUDIO.ZONE={0..3}"
  params:
    - name: value
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]

- id: audio_settings
  label: Audio Settings (composite)
  kind: action
  command: "AUDIO.SETTINGS={zone} {volume} {treble} {bass} {balance} {mute} {speakers}"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4]
    - name: volume
      type: integer
      description: 0-100
    - name: treble
      type: integer
      description: 0-100
    - name: bass
      type: integer
      description: 0-100
    - name: balance
      type: integer
      description: 0-100
    - name: mute
      type: enum
      values: [OFF, ON]
    - name: speakers
      type: enum
      values: [OFF, ON]

- id: audio_balance
  label: Balance
  kind: action
  command: "AUDIO.BALANCE={0..100}"
  params:
    - name: value
      type: integer
      description: Balance 0-100

- id: audio_bass
  label: Bass
  kind: action
  command: "AUDIO.BASS={0..100}"
  params:
    - name: value
      type: integer
      description: Bass 0-100

- id: audio_mute
  label: Mute
  kind: action
  command: "AUDIO.MUTE={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_speakers
  label: Enable Internal Speakers
  kind: action
  command: "AUDIO.SPEAKERS={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: audio_treble
  label: Treble
  kind: action
  command: "AUDIO.TREBLE={0..100}"
  params:
    - name: value
      type: integer
      description: Treble 0-100

- id: audio_volume
  label: Volume
  kind: action
  command: "AUDIO.VOLUME={0..100}"
  params:
    - name: value
      type: integer
      description: Volume 0-100

# Power
- id: auto_on
  label: Auto Power On
  kind: action
  command: "AUTO.ON={0|1|2}"
  params:
    - name: value
      type: enum
      values: [OFF, ON, PREVIOUS.STATE]

- id: display_power
  label: Display Power
  kind: action
  command: "DISPLAY.POWER={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      description: "See IR remote ON/OFF keys. Power Down Mode must be Networked Standby or Fast Startup for RS-232 to be accepted."

- id: power_down_mode
  label: Power Down Mode
  kind: action
  command: "POWER.DOWN.MODE={0|1|2}"
  params:
    - name: value
      type: enum
      values: [Standby.Mode, Networked.Standby.Mode, Fast.Startup]
      description: Must be Networked.Standby.Mode or Fast.Startup to accept RS-232 commands

- id: power_save_delay
  label: Power Saving Delay
  kind: action
  command: "POWER.SAVE.DELAY={60|300|900|1800|3600}"
  params:
    - name: value
      type: enum
      values: ["1.MINUTE", "5.MINUTES", "15.MINUTES", "30.MINUTES", "60.MINUTES"]

- id: power_save_mode
  label: Power Saving Mode
  kind: action
  command: "POWER.SAVE.MODE={0|1|2}"
  params:
    - name: value
      type: enum
      values: [Disable, Power.Down, Wake.On.Signal]

- id: system_state
  label: System State (query)
  kind: query
  command: "SYSTEM.STATE?"
  params: []

- id: system_reboot
  label: Reboot
  kind: action
  command: "SYSTEM.REBOOT"
  params: []

# EDID
- id: edid_timing
  label: EDID Timing
  kind: action
  command: "EDID.TIMING({input},{param})?={signed_int}"
  params:
    - name: input
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
    - name: param
      type: enum
      values: [UPDATE, FACTORY, TYPE]
      description: "UPDATE supports action operator; FACTORY/TYPE are read-only"
    - name: value
      type: integer
      description: "-3=4K60, -2=4K30, -1=1080P"

- id: edid_selected_connector
  label: EDID Zone (Selected Connector)
  kind: action
  command: "EDID.SELECTEDCONNECTOR={1|2|5|13|15}"
  params:
    - name: value
      type: enum
      values: [HDMI.1, HDMI.2, DP, DP.2, USBC]

# Network
- id: network_dhcp
  label: DHCP
  kind: action
  command: "NETWORK.DHCP={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: network_dns1
  label: DNS Server 1
  kind: action
  command: "NETWORK.DNS1(STATIC)=\"{ip}\""
  params:
    - name: ip
      type: string
      description: IP address string

- id: network_dns2
  label: DNS Server 2
  kind: action
  command: "NETWORK.DNS2(STATIC)=\"{ip}\""
  params:
    - name: ip
      type: string
      description: IP address string

- id: network_mac
  label: MAC Address (query)
  kind: query
  command: "NETWORK.MAC?"
  params: []

- id: network_ntp
  label: Use Network Time
  kind: action
  command: "NETWORK.NTP={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

- id: network_ntpserver
  label: NTP Server
  kind: action
  command: "NETWORK.NTPSERVER=\"{server}\""
  params:
    - name: server
      type: string
      description: NTP server hostname (default "0.pool.ntp.org")

- id: network_ping
  label: Network Ping
  kind: action
  command: "NETWORK.PING=\"{host}\""
  params:
    - name: host
      type: string
      description: Hostname or IP. Response is "SUCCESS" or "FAILED".

- id: network_smtp_test
  label: Test Email
  kind: action
  command: "NETWORK.SMTP.TEST({event})"
  params:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED]

- id: ipv4_address
  label: IP Address
  kind: action
  command: "IPV4.ADDRESS(STATIC)=\"{ip}\""
  params:
    - name: ip
      type: string
      description: IPv4 address string

- id: ipv4_gateway
  label: Default Gateway
  kind: action
  command: "IPV4.GATEWAY(STATIC)=\"{ip}\""
  params:
    - name: ip
      type: string
      description: IPv4 address string

- id: ipv4_netmask
  label: Subnet Mask
  kind: action
  command: "IPV4.NETMASK(STATIC)=\"{mask}\""
  params:
    - name: mask
      type: string
      description: Subnet mask string

- id: command_enable
  label: Network Commands
  kind: action
  command: "COMMAND.ENABLE(NETWORK)={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]
      description: Enable/disable network command ports

- id: lan_lock
  label: LAN Lock
  kind: action
  command: "LAN.LOCK={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

# CEC
- id: cec_enable
  label: HDMI CEC
  kind: action
  command: "CEC.ENABLE={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: cec_standby
  label: HDMI CEC Standby
  kind: action
  command: "CEC.STANDBY={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

# DisplayPort
- id: dp_type
  label: DisplayPort 1 Type
  kind: action
  command: "DP.TYPE={1|2|3}"
  params:
    - name: value
      type: enum
      values: ["1.2", "1.4", "2.0"]

- id: dp2_type
  label: DisplayPort 2 Type
  kind: action
  command: "DP2.TYPE={1|2|3}"
  params:
    - name: value
      type: enum
      values: ["1.2", "1.4", "2.0"]

- id: pixel_orbit
  label: Pixel Orbit
  kind: action
  command: "PIXEL.ORBIT={0|1}"
  params:
    - name: value
      type: enum
      values: [OFF, ON]

# Lock / Security
- id: ir_lock
  label: IR Remote Lock
  kind: action
  command: "IR.LOCK={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: ir_code
  label: IR Code
  kind: action
  command: "IR.CODE={0..65535}"
  params:
    - name: value
      type: integer
      description: IR Remote ID code 0-65535

- id: key_lock
  label: Keypad Lock
  kind: action
  command: "KEY.LOCK={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: rs232_lock
  label: RS232 Lock
  kind: action
  command: "RS232.LOCK={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: usba_lock
  label: USB-A Lock
  kind: action
  command: "USBA.LOCK={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

# Key passthrough
- id: key
  label: Key (IR remote emulation)
  kind: action
  command: "KEY={name}"
  params:
    - name: name
      type: enum
      description: Key code name (UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.0..KEY.9, MUTE, USBC, DISPLAY.PORT2, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1..PRESET4, ZONE1..ZONE4, PIP.MODE, PIP.SWAP, HDMI1, HDMI2, DISPLAY.PORT, DVI, VGA, MISC)
      values: [UP, DOWN, MENU, SOURCE, VOLUME.PLUS, VOLUME.MINUS, EXIT, LEFT, ENTER, PREV, RIGHT, KEY.0, KEY.1, KEY.2, KEY.3, KEY.4, KEY.5, KEY.6, KEY.7, KEY.8, KEY.9, MUTE, USBC, DISPLAY.PORT2, STDBY.TOGGLE, STDBY.ENTER, STDBY.EXIT, MENU.PREV, TOP, PRESETS, PRESET1, PRESET2, PRESET3, PRESET4, ZONE1, ZONE2, ZONE3, ZONE4, PIP.MODE, PIP.SWAP, HDMI1, HDMI2, DISPLAY.PORT, DVI, VGA, MISC]

# System / Maintenance
- id: factory_reset
  label: Factory Reset
  kind: action
  command: "RESET({scope})"
  params:
    - name: scope
      type: enum
      values: [USER, FACTORY1]
      description: "USER = standard factory reset. FACTORY1 also resets EDID customizations, network settings and presets. Power cycle required to complete reset."

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "FIRMWARE.UPDATE"
  params: []

- id: led_enable
  label: Enable Status LED
  kind: action
  command: "LED.ENABLE={0|1}"
  params:
    - name: value
      type: enum
      values: [DISABLE, ENABLE]

- id: pattern
  label: Test Pattern
  kind: action
  command: "PATTERN({pattern})"
  params:
    - name: pattern
      type: enum
      values: [NONE, BLACK, WHITE, GRAY, RED, GREEN, BLUE, CYAN, MAGENTA, YELLOW]

- id: display_name
  label: Display Name
  kind: action
  command: "DISPLAY.NAME=\"{name}\""
  params:
    - name: name
      type: string
      description: Name shown in Remote Monitoring Software title

# Presets
- id: preset_count
  label: Preset Count (query)
  kind: query
  command: "PRESET.COUNT?"
  params: []

- id: preset_delete
  label: Preset Delete
  kind: action
  command: "PRESET.DELETE({slot})"
  params:
    - name: slot
      type: integer
      description: Preset slot 1-10

- id: preset_full
  label: Preset Full (query)
  kind: query
  command: "PRESET.FULL({slot})?"
  params:
    - name: slot
      type: integer
      description: Preset slot 1-10

- id: preset_list
  label: Preset List (query)
  kind: query
  command: "PRESET.LIST(FIRST)?"
  params: []

- id: preset_max
  label: Preset Max (query)
  kind: query
  command: "PRESET.MAX?"
  params: []

- id: preset_name
  label: Preset Name
  kind: action
  command: "PRESET.NAME({slot})=\"{name}\""
  params:
    - name: slot
      type: integer
      description: Preset slot 1-10
    - name: name
      type: string
      description: 'Default "Preset n" where n is slot number'

- id: preset_recall
  label: Preset Recall
  kind: action
  command: "PRESET.RECALL({slot})"
  params:
    - name: slot
      type: integer
      description: Preset slot 1-10

- id: preset_save
  label: Preset Save
  kind: action
  command: "PRESET.SAVE({slot})"
  params:
    - name: slot
      type: integer
      description: Preset slot 1-10 (maximum 10 presets)

# Schedule
- id: schedule
  label: Schedule (composite)
  kind: action
  command: "SCHEDULE({slot},{param})={unsigned_int}"
  params:
    - name: slot
      type: integer
      description: Event slot 1-10
    - name: param
      type: enum
      values: [FREQ, MINUTE, HOUR, DAY, ACTION, DATA, ENABLE]
    - name: value
      type: integer
      description: See SCHEDULE.ACTION/DAY/FREQUENCY for valid value sets

- id: schedule_action
  label: Schedule Action
  kind: action
  command: "SCHEDULE.ACTION({slot})={0|1|2|3}"
  params:
    - name: slot
      type: integer
      description: Event slot 1-10
    - name: value
      type: enum
      values: [TURN.ON, TURN.OFF, RECALL, PANEL.BRIGHTNESS]

- id: schedule_day
  label: Schedule Day
  kind: action
  command: "SCHEDULE.DAY({slot})={0..6}"
  params:
    - name: slot
      type: integer
      description: Event slot 1-10
    - name: value
      type: enum
      values: [MON, TUE, WED, THU, FRI, SAT, SUN]

- id: schedule_description
  label: Schedule Description (query)
  kind: query
  command: "SCHEDULE.DESCRIPTION({slot})?"
  params:
    - name: slot
      type: integer
      description: Event slot 1-10

- id: schedule_frequency
  label: Schedule Frequency
  kind: action
  command: "SCHEDULE.FREQUENCY({slot})={0|1|2|3}"
  params:
    - name: slot
      type: integer
      description: Event slot 1-10
    - name: value
      type: enum
      values: [DAILY, WEEKLY, WEEKDAYS, WEEKENDS]

# Time
- id: time
  label: Time (composite)
  kind: action
  command: "TIME({field})={unsigned_int}"
  params:
    - name: field
      type: enum
      values: [YEAR, MONTH, DATE, HOUR, MINUTE]

- id: time_day
  label: Time - Day (query)
  kind: query
  command: "TIME.DAY?"
  params: []

- id: time_month
  label: Time - Month
  kind: action
  command: "TIME.MONTH={1..12}"
  params:
    - name: value
      type: enum
      values: [JANUARY, FEBRUARY, MARCH, APRIL, MAY, JUNE, JULY, AUGUST, SEPTEMBER, OCTOBER, NOVEMBER, DECEMBER]

- id: time_string
  label: Time - String (query)
  kind: query
  command: "TIME.STRING?"
  params: []

- id: timezone
  label: Time Zone
  kind: action
  command: "TIMEZONE={name}"
  params:
    - name: name
      type: enum
      description: "See timezone table in source. Example: UTCM0800.PACIFIC.TIME.US.CANADA"
      values: [UTCM1100.MIDWAY.ISLAND, UTCM1000.HAWAII, UTCM0900.ALASKA, UTCM0800.PACIFIC.TIME, UTCM0800.TIJUANA, UTCM0700.ARIZONA, UTCM0700.CHIHUAHUA, UTCM0700.MOUNTAIN.TIME, UTCM0600.CENTRAL.AMERICA, UTCM0600.CENTRAL.TIME, UTCM0600.MEXICO.CITY, UTCM0600.SASKATCHEWAN, UTCM0500.BOGOTA, UTCM0500.EASTERN.TIME, UTCM0400.VENEZUELA, UTCM0400.ATLANTIC.TIME.BARBADOS, UTCM0400.ATLANTIC.TIME.CANADA, UTCM0400.MANAUS, UTCM0400.SANTIAGO, UTCM0330.NEWFOUNDLAND, UTCM0300.BRASILIA, UTCM0300.BUENOS.AIRES, UTCM0300.GREENLAND, UTCM0300.MONTEVIDEO, UTCM0200.MID.ATLANTIC, UTCM0100.AZORES, UTCM0100.CAPE.VERDE.ISLANDS, UTCP0000.CASABLANCA, UTCP0000.LONDON.DUBLIN, UTCP0100.AMSTERDAM.BERLIN, UTCP0100.BELGRADE, UTCP0100.BRUSSELS, UTCP0100.SARAJEVO, UTCP0100.WINDHOEK, UTCP0100.W.AFRICA.TIME, UTCP0200.AMMAN.JORDAN, UTCP0200.ATHENS.ISTANBUL, UTCP0200.BEIRUT.LEBANON, UTCP0200.CAIRO, UTCP0200.HELSINKI, UTCP0200.JERUSALEM, UTCP0200.HARARE, UTCP0300.MINSK, UTCP0300.BAGHDAD, UTCP0300.MOSCOW, UTCP0300.KUWAIT, UTCP0300.NAIROBI, UTCP0330.TEHRAN, UTCP0400.BAKU, UTCP0400.TBILISI, UTCP0400.YEREVAN, UTCP0400.DUBAI, UTCP0430.KABUL, UTCP0500.ISLAMABAD.KARACHI, UTCP0500.URALSK, UTCP0500.YEKATERINBURG, UTCP0530.KOLKATA, UTCP0530.SRI.LANKA, UTCP0545.KATHMANDU, UTCP0600.ASTANA, UTCP0630.YANGON, UTCP0700.KRASNOYARSK, UTCP0700.BANGKOK, UTCP0700.JAKARTA, UTCP0800.BEIJING, UTCP0800.HONG.KONG, UTCP0800.IRKUTSK, UTCP0800.KUALA.LUMPUR, UTCP0800.PERTH, UTCP0800.TAIPEI, UTCP0900.SEOUL, UTCP0900.TOKYO.OSAKA, UTCP0900.YAKUTSK, UTCP0930.ADELAIDE, UTCP0930.DARWIN, UTCP1000.BRISBANE, UTCP1000.HOBART, UTCP1000.SYDNEY.CANBERRA, UTCP1000.VLADIVOSTOK, UTCP1000.GUAM, UTCP1100.MAGADAN, UTCP1200.MARSHALL.ISLANDS, UTCP1200.AUCKLAND, UTCP1200.FIJI, UTCP1300.TONGA]

# Email notification
- id: notification_email
  label: Notification Event
  kind: action
  command: 'NOTIFICATION.EMAIL({event})={enable},"{recipients}","{message}"'
  params:
    - name: event
      type: enum
      values: [POWER.STATE.CHANGED, SOURCE.LOST, SOURCE.SELECTED]
    - name: enable
      type: enum
      values: [DISABLE, ENABLE]
    - name: recipients
      type: string
      description: Comma-separated email list
    - name: message
      type: string
      description: Custom user message

# Information queries
- id: build_info
  label: Version Info (query)
  kind: query
  command: "BUILD.INFO({component})?"
  params:
    - name: component
      type: enum
      values: [VERSION.VP, VERSION.SUBMCU, VERSION.NETUART]
      description: "Default (no modifier) = VERSION.VP"

- id: model_id
  label: Model ID (query)
  kind: query
  command: "MODEL.ID?"
  params: []

- id: model_series
  label: Model Series (query)
  kind: query
  command: "MODEL.SERIES?"
  params: []

- id: serial_number
  label: Serial Number (query)
  kind: query
  command: "SERIAL.NUMBER?"
  params: []

- id: signal_info
  label: Image Information (query)
  kind: query
  command: "SIGNAL.INFO({zone},{param})?"
  params:
    - name: zone
      type: enum
      values: [ZONE.1, ZONE.2, ZONE.3, ZONE.4, CURRENT]
    - name: param
      type: enum
      values: [HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS]
      description: "None = ALL"
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values: [on, off]
  source: DISPLAY.POWER?

- id: system_state
  type: enum
  values: [STANDBY, ON]
  source: SYSTEM.STATE?
  notes: "STANDBY is lowest power mode; not all functions available. Use DISPLAY.POWER to check backlight state."

- id: audio_input_source
  type: enum
  values: [HDMI.1, HDMI.2, DP, DP.2, USBC]
  source: AUDIO.INPUT?

- id: current_source_message
  type: string
  source: SOURCE.MESSAGE({zone})?
  notes: 'Returns resolution/refresh e.g. "1920x1080i 60Hz" or "Searching" / "No Signal".'

- id: color_subsampling
  type: string
  source: COLOR.SUBSAMPLING({zone})?
  notes: 'Returns e.g. "4:4:4" or "4:2:0".'

- id: osd_visible
  type: enum
  values: [DISABLE, ENABLE]
  source: OSD.STATUS?

- id: network_ping_result
  type: enum
  values: [SUCCESS, FAILED]
  source: NETWORK.PING=...

- id: preset_count
  type: integer
  source: PRESET.COUNT?

- id: preset_max
  type: integer
  source: PRESET.MAX?

- id: preset_full
  type: enum
  values: [NO, YES]
  source: PRESET.FULL({slot})?

- id: preset_list
  type: string
  source: PRESET.LIST(FIRST)?
  notes: Space-separated list of populated preset slot numbers.

- id: mac_address
  type: string
  source: NETWORK.MAC?
  notes: 'XX:XX:XX:XX:XX:XX format.'

- id: model_id
  type: string
  source: MODEL.ID?

- id: model_series
  type: string
  source: MODEL.SERIES?
  notes: Always returns "UltraRes P" for this family.

- id: serial_number
  type: string
  source: SERIAL.NUMBER?

- id: build_info
  type: string
  source: BUILD.INFO({component})?

- id: time_string
  type: string
  source: TIME.STRING?
  notes: 'Format "YYYY-MM-DD HH:MM".'

- id: schedule_description
  type: string
  source: SCHEDULE.DESCRIPTION({slot})?

- id: current_zone_layout
  type: integer
  source: CURRENT.ZONE.LAYOUT?
  notes: 'Encoded value: 0=S.1, 1=P.UL.1, 2=P.UL.2, 3=P.UR.1, 4=P.UR.2, 5=P.LL.1, 6=P.LL.2, 7=P.LR.1, 8=P.LR.2, 9=D.L.1, 10=D.L.2, 28=Q.1, 29=Q.2, 30=Q.3, 31=Q.4.'

- id: signal_info
  type: integer
  source: SIGNAL.INFO({zone},{param})?
  notes: 'Numeric value for the requested image parameter (HACTIVE, VACTIVE, PCLK, HTOTAL, VTOTAL, VREFRESH, HREFRESH, INTERLACE, VFIELDRATE, VREFRESH.X.100, COLORDEPTH, TMDS).'
```

## Variables
```yaml
# UNRESOLVED: source documents all parameters as discrete actions with named operators
# and operands; no continuous variables outside action parameters.
```

## Events
```yaml
# Source does not document unsolicited device-initiated events over RS-232/TCP/SSH.
# Email notifications (NOTIFICATION.EMAIL) are sent by the device to an SMTP server
# on triggered conditions, not to the control client.
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences on the device side.
# AUDIO.SETTINGS and SCHEDULE are composite commands (multiple operands in one
# command), not device-defined macros.
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # FACTORY1 scope is destructive (EDID, network, presets) and requires power cycle to complete
  - firmware_update  # device may become unresponsive during update
interlocks:
  # UNRESOLVED: source notes that Power Down Mode must be set to Networked
  # Standby or Fast Startup before RS-232 commands are accepted, but does not
  # describe an explicit safety interlock procedure.
  - "RS-232 commands require Power Down Mode = Networked Standby or Fast Startup"
```

## Notes
- **Power Down Mode prerequisite:** RS-232/TCP/SSH commands are ignored unless `POWER.DOWN.MODE` is `Networked.Standby.Mode` (1) or `Fast.Startup` (2). Default Standby mode rejects commands.
- **Network default-off:** TCP (port 23) and SSH (port 22) are disabled by default. Must be enabled through Remote Monitoring Software (default `admin` / serial number). Only one of TCP or SSH can be enabled at a time.
- **SSH credentials:** username `root`, password = the new password set in the Change Password page during first RMS login. SSH2 only.
- **TCP/Telnet port:** 23. SSH port: 22. Same wire format as RS-232.
- **RS-232 settings:** 19200 baud, 8N1, no flow control. DB9 female, straight-through: Pin 2 Tx, Pin 3 Rx, Pin 5 GND.
- **Case insensitive** command parts; **responses always uppercase**.
- **Terminator:** CR (0x0D), LF (0x0A), or `;` — same on response.
- **Aliases per zone:** Zone modifiers 253=ALL.INPUT, 254=ALL/ALL.ZONE, 255=CURRENT. Source lists 254 twice but treats both as the same global target.
- **FACTORY1 reset** is more destructive than USER: also clears EDID customizations, network settings, and presets. Power cycle required.
- **Source model series:** This protocol is shared with other Planar products (`MODEL.SERIES?` returns the model series name); `MODEL.ID?` returns the specific SKU (e.g. `URP552`).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: error recovery sequences beyond ERR 1-6 codes not stated in source -->

## Provenance

```yaml
source_domains:
  - planar.com
source_urls:
  - https://www.planar.com/media/q2zg4yzj/020-1449-00a_ultrares-p-series-urpxx2-serial-commands-user-manual.pdf
retrieved_at: 2026-04-30T04:27:32.293Z
last_checked_at: 2026-06-02T04:20:13.374Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T04:20:13.374Z
matched_actions: 106
action_count: 106
confidence: medium
summary: "All 106 spec actions have literal matches in the source command table; transport parameters (19200 baud, 8N1, port 23 TCP) are verbatim; spec provides comprehensive coverage. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated in source"
- "source documents all parameters as discrete actions with named operators"
- "source does not document multi-step macro sequences on the device side."
- "source notes that Power Down Mode must be set to Networked"
- "error recovery sequences beyond ERR 1-6 codes not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
