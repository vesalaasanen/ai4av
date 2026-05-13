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
retrieved_at: 2026-05-04T18:02:47.388Z
last_checked_at: 2026-04-23T15:31:37.104Z
generated_at: 2026-04-23T15:31:37.104Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T15:31:37.104Z
  matched_actions: 68
  action_count: 68
  confidence: high
  summary: "All 68 spec actions matched verbatim in source; transport parameters (port 23, baud 19200) verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-16
---

# CYP CS9000 Control Spec

## Summary
CYP CS9000 is an AVoIP (HDMI over IP) transmitter/receiver system supporting video, audio, IR, USB, and serial routing over TCP/IP networks. Control is available via Telnet (TCP port 23) and RS-232 serial. Both control interfaces share the same command set.

<!-- UNRESOLVED: power consumption, thermal specs, and physical dimensions not stated -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23  # default Telnet port; source states "port 23"
auth:
  type: none  # inferred: no auth procedure in source
serial:
  baud_rate: 19200  # default; source states "Baud Rate: 19200"
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
```

## Traits
```yaml
- powerable     # set system reboot, set factory default present
- routable      # video/audio/uart/ir/usb routing commands present
- queryable     # get commands returning state present
```

## Actions
```yaml
- id: help
  label: Show Full Command List
  kind: action
  params: []

- id: help_command
  label: Show Command Details
  kind: action
  params:
    - name: command
      type: string
      description: Command name

- id: get_fw_ver
  label: Get Firmware Version
  kind: action
  params: []

- id: get_command_ver
  label: Get Command Version
  kind: action
  params: []

- id: get_model_name
  label: Get Model Name
  kind: action
  params: []

- id: get_model_type
  label: Get Model Type
  kind: action
  params: []

- id: get_mac
  label: Get MAC Address
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: set_factory_default
  label: Factory Default Reset
  kind: action
  params: []

- id: set_factory_ipconfig_default
  label: Reset Network Settings to Factory Defaults
  kind: action
  params: []

- id: set_system_reboot
  label: Reboot Unit
  kind: action
  params: []

- id: get_lan_ipconfig
  label: Get LAN Port IP Configuration
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: set_lan_ip_mode
  label: Set LAN Port IP Mode
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)
    - name: mode
      type: string
      enum: [Static, DHCP]
      description: IP assignment mode

- id: get_lan_ip_mode
  label: Get LAN Port IP Mode
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: get_lan_ipaddr
  label: Get LAN Port IP Address
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: get_lan_netmask
  label: Get LAN Port Netmask
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: get_lan_gateway
  label: Get LAN Port Gateway
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: set_lan_static_ipaddr
  label: Set LAN Port Static IP Address
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)
    - name: ipaddr
      type: string
      description: IP address (x.x.x.x format)

- id: get_lan_static_ipaddr
  label: Get LAN Port Static IP Address
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: set_lan_static_netmask
  label: Set LAN Port Static Netmask
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)
    - name: netmask
      type: string
      description: Netmask (x.x.x.x format)

- id: get_lan_static_netmask
  label: Get LAN Port Static Netmask
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: set_lan_static_gateway
  label: Set LAN Port Static Gateway
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)
    - name: gateway
      type: string
      description: Gateway address (x.x.x.x format)

- id: get_lan_static_gateway
  label: Get LAN Port Static Gateway
  kind: action
  params:
    - name: lan_port
      type: integer
      description: LAN port number (1 or 2)

- id: get_uart_list
  label: List Available Serial Ports
  kind: action
  params: []

- id: set_uart_reset
  label: Reset Serial Port to Factory Defaults
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)

- id: set_uart_mode
  label: Set Control Output Serial Port Mode
  kind: action
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]
      description: "0=Disabled, 1=RS-232, 2=RS-422, 3=RS-485"

- id: get_uart_mode
  label: Get Control Output Serial Port Mode
  kind: action
  params: []

- id: set_uart_baudrate
  label: Set Serial Port Baud Rate
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)
    - name: baudrate
      type: integer
      enum: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
      description: Baud rate in bps

- id: get_uart_baudrate
  label: Get Serial Port Baud Rate
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)

- id: set_uart_stopbit
  label: Set Serial Port Stop Bits
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)
    - name: stop_bits
      type: integer
      enum: [1, 2]
      description: Number of stop bits

- id: get_uart_stopbit
  label: Get Serial Port Stop Bits
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)

- id: set_uart_databit
  label: Set Serial Port Data Bits
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)
    - name: data_bits
      type: integer
      enum: [7, 8]
      description: Number of data bits

- id: get_uart_databit
  label: Get Serial Port Data Bits
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)

- id: set_uart_parity
  label: Set Serial Port Parity
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)
    - name: parity
      type: integer
      enum: [0, 1, 2]
      description: "0=None, 1=Odd, 2=Even"

- id: get_uart_parity
  label: Get Serial Port Parity
  kind: action
  params:
    - name: uart
      type: integer
      description: Serial port (1=3-pin, 2=5-pin)

- id: set_uart_command
  label: Transmit Command via Control Output Serial Port
  kind: action
  params:
    - name: command_data
      type: string
      description: ASCII command data (use \x prefix for hex bytes)

- id: set_all_system_reboot
  label: Reboot All Detected Devices
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX, DEVICES]
      description: Device type to reboot

- id: get_timing
  label: Get Video Timing
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: get_deep_color
  label: Get Deep Color Status
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: get_color_space
  label: Get Color Space
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: get_hdcp_status
  label: Get HDCP Status
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: get_edid_info
  label: Get EDID Information
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: get_device_status
  label: Get Device Status
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: set_nickname
  label: Set Device Nickname
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)
    - name: nickname
      type: string
      description: ASCII nickname string

- id: get_nickname
  label: Get Device Nickname
  kind: action
  params:
    - name: device_type
      type: string
      enum: [TX, RX]
      description: Device type
    - name: device_id
      type: integer
      description: Device ID (1-256)

- id: set_rx_stop_feature
  label: Set AVoIP Stop Feature on Receiver
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: feature
      type: string
      enum: [video, audio, ir, usb, serial]
      description: Feature type to stop
    - name: state
      type: string
      enum: [ON, OFF]
      description: Enable or disable

- id: get_rx_stop_feature
  label: Get AVoIP Stop Feature Setting
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: feature
      type: string
      enum: [video, audio, ir, usb, serial]
      description: Feature type

- id: set_all_rx_video_route_tx
  label: Route Transmitter to All Receivers (Video)
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_group_video_route_tx
  label: Route Transmitter to Receiver Group (Video)
  kind: action
  params:
    - name: group_id
      type: integer
      description: Group ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_video_route_tx
  label: Route Transmitter to Receiver (Video)
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_video_route_tx
  label: Get Current Video Route
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_all_rx_audio_route_tx
  label: Route Transmitter to All Receivers (Audio)
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_audio_route_tx
  label: Route Transmitter to Receiver (Audio)
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_audio_route_tx
  label: Get Current Audio Route
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_tx_audio_source
  label: Set Transmitter Audio Source
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)
    - name: source
      type: integer
      enum: [1, 2]
      description: "1=HDMI audio input, 2=Analogue audio input"

- id: get_tx_audio_source
  label: Get Transmitter Audio Source
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_all_rx_uart_route_tx
  label: Route Transmitter Serial to All Receivers (UART)
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_uart_route_tx
  label: Route Transmitter Serial to Receiver (UART)
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_uart_route_tx
  label: Get Current UART Route
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_all_rx_ir_route_tx
  label: Route Transmitter IR to All Receivers
  kind: action
  params:
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: set_rx_ir_route_tx
  label: Route Transmitter IR to Receiver
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_ir_route_tx
  label: Get Current IR Route
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)

- id: set_rx_usb_route_tx
  label: Route USB Device to Transmitter Host
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: get_rx_usb_route_tx
  label: Get Current USB Route
  kind: action
  params:
    - name: receiver_id
      type: integer
      description: Receiver device ID (1-256)

- id: get_all_rx_group_info
  label: Get All Receiver Group Information
  kind: action
  params: []

- id: get_all_video_wall_preset_info
  label: Get All Video Wall Preset Information
  kind: action
  params: []

- id: get_all_macro_name
  label: Get All Macro Names
  kind: action
  params: []

- id: set_macro_run
  label: Execute Macro
  kind: action
  params:
    - name: macro_id
      type: integer
      description: Macro ID (1-256)

- id: set_video_wall_preset_route_tx
  label: Execute Video Wall Configuration
  kind: action
  params:
    - name: video_wall_group_id
      type: integer
      description: Video wall group ID (1-256)
    - name: transmitter_id
      type: integer
      description: Transmitter device ID (1-128)

- id: run_roaming_preset
  label: Execute Roaming Preset
  kind: action
  params:
    - name: preset_id
      type: integer
      description: USB control group ID (1-256)
```

## Feedbacks
```yaml
# All get commands return responses. Specific response formats not documented.
# UNRESOLVED: response string formats not stated in source
```

## Variables
```yaml
# Network settings (via set_lan_* and get_lan_* commands):
#   - ip_mode: [Static, DHCP]
#   - ipaddr: string (x.x.x.x)
#   - netmask: string (x.x.x.x)
#   - gateway: string (x.x.x.x)
#
# Serial port settings (via set_uart_* and get_uart_* commands):
#   - baud_rate: [2400, 4800, 9600, 19200, 38400, 57600, 115200]
#   - data_bits: [7, 8]
#   - stop_bits: [1, 2]
#   - parity: [0=None, 1=Odd, 2=Even]
#   - mode: [0=Disabled, 1=RS-232, 2=RS-422, 3=RS-485] (5-pin port only)
```

## Events
```yaml
# UNRESOLVED: no unsolicited event notifications documented in source
```

## Macros
```yaml
# Macros are user-defined; names retrieved via get_all_macro_name
# UNRESOLVED: macro creation/definition commands not in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- Commands are not case-sensitive and must be followed by a carriage return (CR or `\x0D`) to execute.
- Hex data can be transmitted via `set uart 2 command` using `\x` prefix for hex byte pairs.
- Unit defaults to DHCP mode; IP address can be verified via HDMI output or RS-232.
- Default Telnet port is 23; changes with IP address.
- Device supports two LAN ports for AVoIP.
<!-- UNRESOLVED: video wall preset creation commands not stated in source -->
<!-- UNRESOLVED: roaming preset creation/definition commands not stated in source -->
<!-- UNRESOLVED: HDCP encryption/authentication details not stated in source -->

## Provenance

```yaml
source_domains:
  - cypeurope.com
retrieved_at: 2026-05-04T18:02:47.388Z
last_checked_at: 2026-04-23T15:31:37.104Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T15:31:37.104Z
matched_actions: 68
action_count: 68
confidence: high
summary: "All 68 spec actions matched verbatim in source; transport parameters (port 23, baud 19200) verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
