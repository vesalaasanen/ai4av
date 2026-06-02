---
spec_id: admin/cyp-cs9000
schema_version: ai4av-public-spec-v1
revision: 1
title: "CYP CS9000 Control Spec"
manufacturer: CYP
model_family: CS9000
aliases: []
compatible_with:
  manufacturers:
    - CYP
  models:
    - CS9000
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cypeurope.com
source_urls:
  - https://cypeurope.com/wp-content/uploads/2024/11/IP-CS9000_PDF-Manual_v1.01.pdf
retrieved_at: 2026-04-30T04:31:10.266Z
last_checked_at: 2026-06-02T17:21:58.203Z
generated_at: 2026-06-02T17:21:58.203Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-class identity (TX vs RX vs controller) not explicit in refined excerpt; AVoIP product role inferred from command syntax."
  - "no volume/gain/brightness commands in refined source"
  - "response payload formats for each query command not detailed in refined source excerpt beyond parameter echo."
  - "not applicable - all settable state is exposed via discrete actions above."
  - "unsolicited device-initiated notifications not described in refined source."
  - "macro storage location and edit commands not in refined source. Only `set macro N run` and `get all macro name` are documented."
  - "no safety warnings, interlocks, or power-sequencing procedures in refined source."
  - "exact response payload schema per query command not in source; firmware version compatibility not stated; specific video wall preset / macro configuration authoring commands not in source."
verification:
  verdict: verified
  checked_at: 2026-06-02T17:21:58.203Z
  matched_actions: 70
  action_count: 70
  confidence: medium
  summary: "All 70 spec actions matched verbatim to source command table; transport parameters (port 23, baud 19200, 8 data bits, no parity, 1 stop bit) verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# CYP CS9000 Control Spec

## Summary
CYP CS9000 AVoIP control endpoint. Spec covers serial (RS-232/RS-422/RS-485) and Telnet (TCP port 23) ASCII command interface for managing transmitters/receivers, video/audio/USB/IR/serial routing, video wall presets, macros, and LAN configuration.

<!-- UNRESOLVED: device-class identity (TX vs RX vs controller) not explicit in refined excerpt; AVoIP product role inferred from command syntax. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 23
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
- powerable       # inferred: set system reboot / set all N1 system reboot
- routable        # inferred: video/audio/uart/ir/usb route commands present
- queryable       # inferred: extensive get command set
- levelable       # UNRESOLVED: no volume/gain/brightness commands in refined source
```

## Actions
```yaml
- id: help
  label: Show Full Command List
  kind: action
  command: "help"
  params: []

- id: help_command
  label: Show Command Help
  kind: action
  command: "help {command}"
  params:
    - name: command
      type: string
      description: Command name to describe

- id: list_commands
  label: List Commands
  kind: action
  command: "?"
  params: []

- id: get_fw_ver
  label: Get Firmware Version
  kind: query
  command: "get fw ver"
  params: []

- id: get_command_ver
  label: Get Command Version
  kind: query
  command: "get command ver"
  params: []

- id: get_model_name
  label: Get Model Name
  kind: query
  command: "get model name"
  params: []

- id: get_model_type
  label: Get Model Type
  kind: query
  command: "get model type"
  params: []

- id: get_mac_addr
  label: Get LAN MAC Address
  kind: query
  command: "get mac {port} addr"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: set_factory_default
  label: Factory Reset
  kind: action
  command: "set factory default"
  params: []

- id: set_factory_ipconfig_default
  label: Reset Network to Factory
  kind: action
  command: "set factory ipconfig default"
  params: []

- id: set_system_reboot
  label: System Reboot
  kind: action
  command: "set system reboot"
  params: []

- id: get_lan_ipconfig
  label: Get LAN IP Config
  kind: query
  command: "get lan {port} ipconfig"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: set_lan_ip_mode
  label: Set LAN IP Mode
  kind: action
  command: "set lan {port} ip mode {mode}"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)
    - name: mode
      type: string
      description: Static or DHCP

- id: get_lan_ip_mode
  label: Get LAN IP Mode
  kind: query
  command: "get lan {port} ip mode"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: get_lan_ipaddr
  label: Get LAN IP Address
  kind: query
  command: "get lan {port} ipaddr"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: get_lan_netmask
  label: Get LAN Netmask
  kind: query
  command: "get lan {port} netmask"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: get_lan_gateway
  label: Get LAN Gateway
  kind: query
  command: "get lan {port} gateway"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: set_lan_static_ipaddr
  label: Set Static IP Address
  kind: action
  command: "set lan {port} static ipaddr {ip}"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)
    - name: ip
      type: string
      description: X.X.X.X (0-255)

- id: get_lan_static_ipaddr
  label: Get Static IP Address
  kind: query
  command: "get lan {port} static ipaddr"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: set_lan_static_netmask
  label: Set Static Netmask
  kind: action
  command: "set lan {port} static netmask {netmask}"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)
    - name: netmask
      type: string
      description: X.X.X.X (0-255)

- id: get_lan_static_netmask
  label: Get Static Netmask
  kind: query
  command: "get lan {port} static netmask"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: set_lan_static_gateway
  label: Set Static Gateway
  kind: action
  command: "set lan {port} static gateway {gateway}"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)
    - name: gateway
      type: string
      description: X.X.X.X (0-255)

- id: get_lan_static_gateway
  label: Get Static Gateway
  kind: query
  command: "get lan {port} static gateway"
  params:
    - name: port
      type: integer
      description: LAN port (1 or 2)

- id: get_uart_list
  label: List Serial Ports
  kind: query
  command: "get uart list"
  params: []

- id: set_uart_reset
  label: Reset Serial Port Settings
  kind: action
  command: "set uart {port} reset"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)

- id: set_uart_2_mode
  label: Set 5-pin Serial Mode
  kind: action
  command: "set uart 2 mode {mode}"
  params:
    - name: mode
      type: integer
      description: 0=Disabled, 1=RS-232, 2=RS-422, 3=RS-485

- id: get_uart_2_mode
  label: Get 5-pin Serial Mode
  kind: query
  command: "get uart 2 mode"
  params: []

- id: set_uart_baudrate
  label: Set Serial Baud Rate
  kind: action
  command: "set uart {port} baudrate {baudrate}"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)
    - name: baudrate
      type: integer
      description: 2400|4800|9600|19200|38400|57600|115200

- id: get_uart_baudrate
  label: Get Serial Baud Rate
  kind: query
  command: "get uart {port} baudrate"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)

- id: set_uart_stop_bit
  label: Set Serial Stop Bits
  kind: action
  command: "set uart {port} stop bit {stop_bit}"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)
    - name: stop_bit
      type: integer
      description: 1 or 2

- id: get_uart_stop_bit
  label: Get Serial Stop Bits
  kind: query
  command: "get uart {port} stop bit"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)

- id: set_uart_data_bit
  label: Set Serial Data Bits
  kind: action
  command: "set uart {port} data bit {data_bit}"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)
    - name: data_bit
      type: integer
      description: 7 or 8

- id: get_uart_data_bit
  label: Get Serial Data Bits
  kind: query
  command: "get uart {port} data bit"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)

- id: set_uart_parity
  label: Set Serial Parity
  kind: action
  command: "set uart {port} parity {parity}"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)
    - name: parity
      type: integer
      description: 0=None, 1=Odd, 2=Even

- id: get_uart_parity
  label: Get Serial Parity
  kind: query
  command: "get uart {port} parity"
  params:
    - name: port
      type: integer
      description: 1 (3-pin) or 2 (5-pin)

- id: set_uart_2_command
  label: Transmit Data via 5-pin Serial
  kind: action
  command: "set uart 2 command [{data}]"
  params:
    - name: data
      type: string
      description: ASCII text; prefix hex octets with \x (e.g. \x0D for CR)

- id: set_all_system_reboot
  label: Reboot All Detected Devices
  kind: action
  command: "set all {type} system reboot"
  params:
    - name: type
      type: string
      description: TX|RX|DEVICES

- id: get_timing
  label: Get Video Timing
  kind: query
  command: "get {type} {id} timing"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: get_deep_color
  label: Get Bit Depth
  kind: query
  command: "get {type} {id} deep color"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: get_color_space
  label: Get Color Space
  kind: query
  command: "get {type} {id} color space"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: get_hdcp_status
  label: Get HDCP Status
  kind: query
  command: "get {type} {id} hdcp status"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: get_edid_info
  label: Get EDID Info
  kind: query
  command: "get {type} {id} edid info"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: get_device_status
  label: Get Device Status
  kind: query
  command: "get {type} {id} device status"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: set_nickname
  label: Set AVoIP Device Nickname
  kind: action
  command: "set {type} {id} nickname {nickname}"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)
    - name: nickname
      type: string
      description: ASCII string

- id: get_nickname
  label: Get AVoIP Device Nickname
  kind: query
  command: "get {type} {id} nickname"
  params:
    - name: type
      type: string
      description: TX or RX
    - name: id
      type: integer
      description: Device ID (1-256)

- id: set_rx_stop_feature
  label: Enable/Disable RX Stop Feature
  kind: action
  command: "set rx {id} stop feature {channel} {state}"
  params:
    - name: id
      type: integer
      description: Receiver device ID (1-256)
    - name: channel
      type: string
      description: video|audio|ir|usb|serial
    - name: state
      type: string
      description: ON or OFF

- id: get_rx_stop_feature
  label: Get RX Stop Feature Setting
  kind: query
  command: "get rx {id} stop feature {channel}"
  params:
    - name: id
      type: integer
      description: Receiver device ID (1-256)
    - name: channel
      type: string
      description: video|audio|ir|usb|serial

- id: set_all_rx_video_route_tx
  label: Route TX to All RX Video
  kind: action
  command: "set all rx video route tx {tx_id}"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_group_video_route_tx
  label: Route TX to RX Group Video
  kind: action
  command: "set rx group {group_id} video route tx {tx_id}"
  params:
    - name: group_id
      type: integer
      description: Group ID (1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_video_route_tx
  label: Route TX to RX Video
  kind: action
  command: "set rx {rx_id} video route tx {tx_id}"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_video_route_tx
  label: Get RX Video Route
  kind: query
  command: "get rx {rx_id} video route tx"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_all_rx_audio_route_tx
  label: Route TX Audio to All RX
  kind: action
  command: "set all rx audio route tx {tx_id}"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_audio_route_tx
  label: Route TX Audio to RX
  kind: action
  command: "set rx {rx_id} audio route tx {tx_id}"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_audio_route_tx
  label: Get RX Audio Route
  kind: query
  command: "get rx {rx_id} audio route tx"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_tx_audio_source
  label: Set TX Audio Source
  kind: action
  command: "set tx {tx_id} audio source {source}"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)
    - name: source
      type: integer
      description: 1=HDMI, 2=Analogue

- id: get_tx_audio_source
  label: Get TX Audio Source
  kind: query
  command: "get tx {tx_id} audio source"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_all_rx_uart_route_tx
  label: Route TX UART to All RX
  kind: action
  command: "set all rx uart route tx {tx_id}"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (Tx pin, 1-128)

- id: set_rx_uart_route_tx
  label: Route RX UART to TX
  kind: action
  command: "set rx {rx_id} uart route tx {tx_id}"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (Rx pin, 1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (Tx pin, 1-128)

- id: get_rx_uart_route_tx
  label: Get RX UART Route
  kind: query
  command: "get rx {rx_id} uart route tx"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_all_rx_ir_route_tx
  label: Route TX IR to All RX
  kind: action
  command: "set all rx ir route tx {tx_id}"
  params:
    - name: tx_id
      type: integer
      description: Transmitter device ID (IR input, 1-128)

- id: set_rx_ir_route_tx
  label: Route TX IR to RX
  kind: action
  command: "set rx {rx_id} ir route tx {tx_id}"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (IR output, 1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (IR input, 1-128)

- id: get_rx_ir_route_tx
  label: Get RX IR Route
  kind: query
  command: "get rx {rx_id} ir route tx"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_rx_usb_route_tx
  label: Route RX USB to TX USB Host
  kind: action
  command: "set rx {rx_id} usb route tx {tx_id}"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (USB device, 1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (USB host, 1-128)

- id: get_rx_usb_route_tx
  label: Get RX USB Route
  kind: query
  command: "get rx {rx_id} usb route tx"
  params:
    - name: rx_id
      type: integer
      description: Receiver device ID (1-256)

- id: get_all_rx_group_info
  label: Get All Group Info
  kind: query
  command: "get all rx group info"
  params: []

- id: get_all_video_wall_preset_info
  label: Get All Video Wall Preset Info
  kind: query
  command: "get all video wall preset info"
  params: []

- id: get_all_macro_name
  label: Get All Macro Names
  kind: query
  command: "get all macro name"
  params: []

- id: set_macro_run
  label: Run Macro
  kind: action
  command: "set macro {macro_id} run"
  params:
    - name: macro_id
      type: integer
      description: Macro ID (1-256)

- id: set_video_wall_preset_route_tx
  label: Apply Video Wall Preset
  kind: action
  command: "set video wall preset {preset_id} route tx {tx_id}"
  params:
    - name: preset_id
      type: integer
      description: Video wall group ID (1-256)
    - name: tx_id
      type: integer
      description: Transmitter device ID (1-128)

- id: run_roaming_preset
  label: Run Roaming Preset
  kind: action
  command: "run roaming preset {preset_id}"
  params:
    - name: preset_id
      type: integer
      description: USB control group ID (1-256)
```

## Feedbacks
```yaml
# UNRESOLVED: response payload formats for each query command not detailed in refined source excerpt beyond parameter echo.
```

## Variables
```yaml
# UNRESOLVED: not applicable - all settable state is exposed via discrete actions above.
```

## Events
```yaml
# UNRESOLVED: unsolicited device-initiated notifications not described in refined source.
```

## Macros
```yaml
# UNRESOLVED: macro storage location and edit commands not in refined source. Only `set macro N run` and `get all macro name` are documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlocks, or power-sequencing procedures in refined source.
```

## Notes
Commands not case-sensitive. Must terminate with carriage return (CR). Default unit IP via DHCP; current IP viewable on HDMI output or via RS-232. Telnet default port 23; changeable. 5-pin serial port mode-switchable between RS-232/RS-422/RS-485 (port 2); 3-pin port is RS-232 only. LAN has 2 ports (1, 2). Two serial ports: 1=3-pin (RS-232), 2=5-pin (multi-mode).

<!-- UNRESOLVED: exact response payload schema per query command not in source; firmware version compatibility not stated; specific video wall preset / macro configuration authoring commands not in source. -->

## Provenance

```yaml
source_domains:
  - cypeurope.com
source_urls:
  - https://cypeurope.com/wp-content/uploads/2024/11/IP-CS9000_PDF-Manual_v1.01.pdf
retrieved_at: 2026-04-30T04:31:10.266Z
last_checked_at: 2026-06-02T17:21:58.203Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T17:21:58.203Z
matched_actions: 70
action_count: 70
confidence: medium
summary: "All 70 spec actions matched verbatim to source command table; transport parameters (port 23, baud 19200, 8 data bits, no parity, 1 stop bit) verified; bidirectional coverage complete. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-class identity (TX vs RX vs controller) not explicit in refined excerpt; AVoIP product role inferred from command syntax."
- "no volume/gain/brightness commands in refined source"
- "response payload formats for each query command not detailed in refined source excerpt beyond parameter echo."
- "not applicable - all settable state is exposed via discrete actions above."
- "unsolicited device-initiated notifications not described in refined source."
- "macro storage location and edit commands not in refined source. Only `set macro N run` and `get all macro name` are documented."
- "no safety warnings, interlocks, or power-sequencing procedures in refined source."
- "exact response payload schema per query command not in source; firmware version compatibility not stated; specific video wall preset / macro configuration authoring commands not in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
