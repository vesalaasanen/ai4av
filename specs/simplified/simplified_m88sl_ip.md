---
spec_id: admin/simplified-m88sl
schema_version: ai4av-public-spec-v1
revision: 1
title: "Simplified M88SL Control Spec"
manufacturer: Simplified
model_family: M88SL
aliases: []
compatible_with:
  manufacturers:
    - Simplified
  models:
    - M88SL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - simplifiedmfg.com
  - grouponenw.com
  - store.midstatedistributing.com
source_urls:
  - https://www.simplifiedmfg.com/simplified-products/m88sl
  - https://grouponenw.com/customcontent/attachment/M88SL-Data-Sheet.pdf
  - https://store.midstatedistributing.com/images/pdf/SMP_M88SL_SS.pdf
retrieved_at: 2026-07-25T03:37:09.123Z
last_checked_at: 2026-08-05T08:43:23.798Z
generated_at: 2026-08-05T08:43:23.798Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated; firmware values occur only in response examples."
  - "authentication procedure for raw TCP and Telnet control channels not stated."
  - "serial flow control not stated."
  - "source gives no explicit confirmation requirements, safety interlocks, or power sequencing procedure."
  - "EDID index 31 appears in both HDMI-copy and HDBaseT-copy ranges in source."
  - "response timing, inter-byte delay, message framing beyond `!`, and concurrency limits not stated."
  - "UART topology behind indices 0~8 and 0~4 is not fully defined in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:43:23.798Z
  matched_actions: 87
  action_count: 87
  confidence: medium
  summary: "All 87 spec actions match literal ASCII commands in the source table; transport parameters (115200 baud, port 8000, telnet 23) all appear verbatim. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Simplified M88SL Control Spec

## Summary

Simplified M88SL is an 8×8 HDMI 2.0b scaling matrix switcher with HDMI and HDBaseT outputs. This spec covers ASCII control over RS-232 and TCP/IP, including routing, output scaling, EDID, CEC, network, UART, preset, and system operations.

<!-- UNRESOLVED: firmware compatibility range not stated; firmware values occur only in response examples. -->
<!-- UNRESOLVED: authentication procedure for raw TCP and Telnet control channels not stated. -->
<!-- UNRESOLVED: serial flow control not stated. -->

## Transport

```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 8000
  telnet_port: 23
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null
auth:
  type: null
```

## Traits

```yaml
traits:
  - powerable
  - routable
  - queryable
  - levelable
```

## Actions

```yaml
actions:
  - id: set_power
    label: Set Power
    kind: action
    command: "s power {z}!"
    params:
      - name: z
        type: integer
        description: "0 = power off, 1 = power on"
  - id: query_power
    label: Query Power State
    kind: query
    command: "r power!"
    params: []
  - id: reboot_device
    label: Reboot Device
    kind: action
    command: "s reboot!"
    params: []
  - id: help
    label: List All Commands
    kind: action
    command: "help!"
    params: []
  - id: query_type
    label: Query Device Model
    kind: query
    command: "r type!"
    params: []
  - id: query_status
    label: Query Device Status
    kind: query
    command: "r status!"
    params: []
  - id: query_fw_version
    label: Query Firmware Version
    kind: query
    command: "r fw version!"
    params: []
  - id: query_link_in
    label: Query Input Port Connection
    kind: query
    command: "r link in {x}!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: query_link_out
    label: Query Output Port Connection
    kind: query
    command: "r link out {y}!"
    params:
      - name: y
        type: integer
        description: "Output port, 0~8; 0 = all"
  - id: factory_reset
    label: Factory Reset
    kind: action
    command: "s reset!"
    params: []
  - id: set_beep
    label: Set Buzzer
    kind: action
    command: "s beep {z}!"
    params:
      - name: z
        type: integer
        description: "0 = off, 1 = on"
  - id: query_beep
    label: Query Buzzer State
    kind: query
    command: "r beep!"
    params: []
  - id: set_panel_lock
    label: Set Front Panel Lock
    kind: action
    command: "s lock {z}!"
    params:
      - name: z
        type: integer
        description: "0 = unlocked, 1 = locked"
  - id: query_panel_lock
    label: Query Front Panel Lock
    kind: query
    command: "r lock!"
    params: []
  - id: set_lcd_on_time
    label: Set LCD On Time
    kind: action
    command: "s lcd on time {z}!"
    params:
      - name: z
        type: integer
        description: "0 = off, 1 = always on, 2 = 15 seconds, 3 = 30 seconds, 4 = 60 seconds"
  - id: query_lcd_mode
    label: Query LCD Backlight Mode
    kind: query
    command: "r lcd mode!"
    params: []
  - id: save_preset
    label: Save Preset
    kind: action
    command: "s save preset {z}!"
    params:
      - name: z
        type: integer
        description: "Preset slot, 1~8"
  - id: recall_preset
    label: Recall Preset
    kind: action
    command: "s recall preset {z}!"
    params:
      - name: z
        type: integer
        description: "Preset slot, 1~8"
  - id: clear_preset
    label: Clear Preset
    kind: action
    command: "s clear preset {z}!"
    params:
      - name: z
        type: integer
        description: "Preset slot, 1~8"
  - id: query_preset
    label: Query Preset
    kind: query
    command: "r preset {z}!"
    params:
      - name: z
        type: integer
        description: "Preset slot, 1~4"
  - id: set_logo1
    label: Set First LCD Logo Line
    kind: action
    command: "s logo1 {text}!"
    params:
      - name: text
        type: string
        description: "Text up to 16 characters"
  - id: set_baud_rate
    label: Set RS-232 Baud Rate
    kind: action
    command: "s baud rate {rate}!"
    params:
      - name: rate
        type: integer
        description: "115200, 57600, 38400, 19200, 9600, or 4800"
  - id: query_baud_rate
    label: Query RS-232 Baud Rate
    kind: query
    command: "r baud rate!"
    params: []
  - id: set_control_id
    label: Set Control ID
    kind: action
    command: "s id {z}!"
    params:
      - name: z
        type: integer
        description: "Control ID, 000~999"
  - id: route_av
    label: Route Input to Output
    kind: action
    command: "s in {x} av out {y}!"
    params:
      - name: x
        type: integer
        description: "Input port, 1~8"
      - name: y
        type: integer
        description: "Output port, 0~8; 0 = all"
  - id: query_av_out
    label: Query Output Signal Status
    kind: query
    command: "r av out {y}!"
    params:
      - name: y
        type: integer
        description: "Output port, 0~8; 0 = all"
  - id: set_hdmi_stream
    label: Set HDMI Output Stream
    kind: action
    command: "s hdmi {y} stream {z}!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
      - name: z
        type: integer
        description: "0 = disable, 1 = enable"
  - id: query_hdmi_stream
    label: Query HDMI Output Stream
    kind: query
    command: "r hdmi {y} stream!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: set_hdbt_stream
    label: Set HDBaseT Output Stream
    kind: action
    command: "s hdbt {y} stream {z}!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
      - name: z
        type: integer
        description: "0 = disable, 1 = enable"
  - id: query_hdbt_stream
    label: Query HDBaseT Output Stream
    kind: query
    command: "r hdbt {y} stream!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: set_hdmi_scaler
    label: Set HDMI Output Scaler Mode
    kind: action
    command: "s hdmi {y} scaler {z}!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
      - name: z
        type: integer
        description: "1 = bypass, 2 = 4K to 1080p, 3 = auto"
  - id: query_hdmi_scaler
    label: Query HDMI Output Scaler Mode
    kind: query
    command: "r hdmi {y} scaler!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: set_hdbt_scaler
    label: Set HDBaseT Output Scaler Mode
    kind: action
    command: "s hdbt {y} scaler {z}!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
      - name: z
        type: integer
        description: "1 = bypass, 2 = 4K to 1080p, 3 = auto"
  - id: query_hdbt_scaler
    label: Query HDBaseT Output Scaler Mode
    kind: query
    command: "r hdbt {y} scaler !"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: set_edid_input
    label: Set Input EDID
    kind: action
    command: "s edid in {x} from {z}!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
      - name: z
        type: integer
        description: "EDID index, 1~39"
  - id: query_edid_data_hdmi
    label: Query HDMI Output EDID Data
    kind: query
    command: "r edid data hdmi {y}!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 1~8"
  - id: query_edid_data_hdbt
    label: Query HDBaseT Output EDID Data
    kind: query
    command: "r edid data hdbt {y}!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 1~8"
  - id: query_edid_input
    label: Query Input EDID Status
    kind: query
    command: "r edid in {x}!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_on
    label: CEC Input Power On
    kind: action
    command: "s cec in {x} on!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_off
    label: CEC Input Power Off
    kind: action
    command: "s cec in {x} off!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_menu
    label: CEC Input Menu
    kind: action
    command: "s cec in {x} menu!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_play
    label: CEC Input Play
    kind: action
    command: "s cec in {x} play!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_pause
    label: CEC Input Pause
    kind: action
    command: "s cec in {x} pause!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_stop
    label: CEC Input Stop
    kind: action
    command: "s cec in {x} stop!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_rewind
    label: CEC Input Rewind
    kind: action
    command: "s cec in {x} rew!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_mute
    label: CEC Input Mute
    kind: action
    command: "s cec in {x} mute!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_vol_down
    label: CEC Input Volume Down
    kind: action
    command: "s cec in {x} vol-!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_vol_up
    label: CEC Input Volume Up
    kind: action
    command: "s cec in {x} vol+!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_fast_forward
    label: CEC Input Fast Forward
    kind: action
    command: "s cec in {x} ff!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_previous
    label: CEC Input Previous
    kind: action
    command: "s cec in {x} previous!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_in_next
    label: CEC Input Next
    kind: action
    command: "s cec in {x} next!"
    params:
      - name: x
        type: integer
        description: "Input port, 0~8; 0 = all"
  - id: cec_hdmi_out_on
    label: CEC HDMI Output Power On
    kind: action
    command: "s cec hdmi out {y} on!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdmi_out_off
    label: CEC HDMI Output Power Off
    kind: action
    command: "s cec hdmi out {y} off!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdmi_out_mute
    label: CEC HDMI Output Mute
    kind: action
    command: "s cec hdmi out {y} mute!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdmi_out_vol_down
    label: CEC HDMI Output Volume Down
    kind: action
    command: "s cec hdmi out {y} vol-!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdmi_out_vol_up
    label: CEC HDMI Output Volume Up
    kind: action
    command: "s cec hdmi out {y} vol+!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdmi_out_active
    label: CEC HDMI Output Active Source
    kind: action
    command: "s cec hdmi out {y} active!"
    params:
      - name: y
        type: integer
        description: "HDMI output, 0~8; 0 = all"
  - id: cec_hdbt_out_on
    label: CEC HDBaseT Output Power On
    kind: action
    command: "s cec hdbt out {y} on!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_hdbt_out_off
    label: CEC HDBaseT Output Power Off
    kind: action
    command: "s cec hdbt out {y} off!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_hdbt_out_mute
    label: CEC HDBaseT Output Mute
    kind: action
    command: "s cec hdbt out {y} mute!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_hdbt_out_vol_down
    label: CEC HDBaseT Output Volume Down
    kind: action
    command: "s cec hdbt out {y} vol-!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_hdbt_out_vol_up
    label: CEC HDBaseT Output Volume Up
    kind: action
    command: "s cec hdbt out {y} vol+!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_hdbt_out_active
    label: CEC HDBaseT Output Active Source
    kind: action
    command: "s cec hdbt out {y} active!"
    params:
      - name: y
        type: integer
        description: "HDBaseT output, 0~8; 0 = all"
  - id: cec_cmd_hdmi
    label: Send Custom CEC Command to HDMI Output
    kind: action
    command: "s cec cmd {x} {y1y2}{y3}{y4}end!"
    params:
      - name: x
        type: string
        description: "HDMI output selector in hex, 01~04"
      - name: y1y2
        type: string
        description: "Initiator and follower logical-address byte in hex"
      - name: y3
        type: string
        description: "CEC opcode in hex"
      - name: y4
        type: string
        description: "Optional CEC opcode parameters in hex"
  - id: cec_cmd_hdbt
    label: Send Custom CEC Command to HDBaseT Output
    kind: action
    command: "s cec cmd {x} {y1y2}{y3}{y4}end!"
    params:
      - name: x
        type: string
        description: "HDBaseT output selector in hex, f1~f4"
      - name: y1y2
        type: string
        description: "Initiator and follower logical-address byte in hex"
      - name: y3
        type: string
        description: "CEC opcode in hex"
      - name: y4
        type: string
        description: "Optional CEC opcode parameters in hex"
  - id: query_ipconfig
    label: Query IP Configuration
    kind: query
    command: "r ipconfig!"
    params: []
  - id: query_mac_addr
    label: Query MAC Address
    kind: query
    command: "r mac addr!"
    params: []
  - id: set_ip_mode
    label: Set IP Mode
    kind: action
    command: "s ip mode {z}!"
    params:
      - name: z
        type: integer
        description: "0 = static, 1 = DHCP"
  - id: query_ip_mode
    label: Query IP Mode
    kind: query
    command: "r ip mode!"
    params: []
  - id: set_ip_addr
    label: Set IP Address
    kind: action
    command: "s ip addr {addr}!"
    params:
      - name: addr
        type: string
        description: "IPv4 address in xxx.xxx.xxx.xxx format"
  - id: query_ip_addr
    label: Query IP Address
    kind: query
    command: "r ip addr!"
    params: []
  - id: set_subnet
    label: Set Subnet Mask
    kind: action
    command: "s subnet {mask}!"
    params:
      - name: mask
        type: string
        description: "Subnet mask in xxx.xxx.xxx.xxx format"
  - id: query_subnet
    label: Query Subnet Mask
    kind: query
    command: "r subnet!"
    params: []
  - id: set_gateway
    label: Set Gateway
    kind: action
    command: "s gateway {gateway}!"
    params:
      - name: gateway
        type: string
        description: "Gateway in xxx.xxx.xxx.xxx format"
  - id: query_gateway
    label: Query Gateway
    kind: query
    command: "r gateway!"
    params: []
  - id: set_tcp_ip_port
    label: Set TCP/IP Port
    kind: action
    command: "s tcp/ip port {x}!"
    params:
      - name: x
        type: integer
        description: "TCP/IP port, 1~65535"
  - id: query_tcp_ip_port
    label: Query TCP/IP Port
    kind: query
    command: "r tcp/ip port!"
    params: []
  - id: set_telnet_port
    label: Set Telnet Port
    kind: action
    command: "s telnet port {x}!"
    params:
      - name: x
        type: integer
        description: "Telnet port, 1~65535"
  - id: query_telnet_port
    label: Query Telnet Port
    kind: query
    command: "r telnet port!"
    params: []
  - id: net_reboot
    label: Reboot Network Modules
    kind: action
    command: "s net reboot!"
    params: []
  - id: set_uart_baudrate
    label: Set Local or HDBaseT UART Baud Rate
    kind: action
    command: "s uart {x} baudrate {y}!"
    params:
      - name: x
        type: integer
        description: "UART index, 0~8"
      - name: y
        type: integer
        description: "1 = 115200, 2 = 57600, 3 = 56000, 4 = 38400, 5 = 19200, 6 = 14400, 7 = 9600, 8 = 4800"
  - id: set_uart_datalen
    label: Set Local or HDBaseT UART Data Length
    kind: action
    command: "s uart {x} datalen {y}!"
    params:
      - name: x
        type: integer
        description: "UART index, 0~8"
      - name: y
        type: integer
        description: "1 = 8 bits, 2 = 7 bits"
  - id: set_uart_parity
    label: Set Local or HDBaseT UART Parity
    kind: action
    command: "s uart {x} parity {y}!"
    params:
      - name: x
        type: integer
        description: "UART index, 0~8"
      - name: y
        type: integer
        description: "1 = none, 2 = odd, 3 = even"
  - id: uart_send_data
    label: Send UART Data
    kind: action
    command: "s uart {x} type {z} senddata {y} end!"
    params:
      - name: x
        type: integer
        description: "Local or HDBaseT UART index, 0~4"
      - name: z
        type: integer
        description: "0 = ASCII, 1 = hex"
      - name: y
        type: string
        description: "Data payload"
  - id: query_uart_status
    label: Query UART Status
    kind: query
    command: "r uart status {x}!"
    params:
      - name: x
        type: integer
        description: "Local or HDBaseT UART index, 0~4"
  - id: set_ir_out_level
    label: Set IR Output Level
    kind: action
    command: "s ir out level {x}!"
    params:
      - name: x
        type: integer
        description: "0 = 5V, 1 = 12V"
  - id: query_ir_out_level
    label: Query IR Output Level
    kind: query
    command: "r ir out level!"
    params: []
```

## Feedbacks

```yaml
feedbacks:
  - id: power_state
    type: enum
    values:
      - "power on"
      - "power off"
  - id: device_model
    type: string
  - id: firmware_versions
    type: string
  - id: device_status
    type: string
  - id: input_connection
    type: enum
    values:
      - "connect"
      - "disconnect"
  - id: output_connection
    type: enum
    values:
      - "connect"
      - "disconnect"
  - id: beep_state
    type: enum
    values:
      - "beep on"
      - "beep off"
  - id: panel_lock_state
    type: enum
    values:
      - "panel button lock on"
      - "panel button lock off"
  - id: lcd_mode
    type: enum
    values:
      - "lcd on always"
      - "lcd on 15 seconds"
      - "lcd on 30 seconds"
      - "lcd on 60 seconds"
      - "lcd off"
  - id: preset_information
    type: string
  - id: rs232_baud_rate
    type: integer
  - id: output_route
    type: string
  - id: hdmi_stream_state
    type: enum
    values:
      - "enable"
      - "disable"
  - id: hdbt_stream_state
    type: enum
    values:
      - "enable"
      - "disable"
  - id: hdmi_scaler_mode
    type: enum
    values:
      - "bypass"
      - "4k->1080p"
      - "Auto"
  - id: hdbt_scaler_mode
    type: enum
    values:
      - "bypass"
      - "4k->1080p"
      - "Auto"
  - id: input_edid
    type: string
  - id: hdmi_output_edid_data
    type: string
  - id: hdbt_output_edid_data
    type: string
  - id: ip_configuration
    type: string
  - id: mac_address
    type: string
  - id: ip_mode
    type: enum
    values:
      - "Static"
      - "DHCP"
  - id: ip_address
    type: string
  - id: subnet_mask
    type: string
  - id: gateway
    type: string
  - id: tcp_ip_port
    type: integer
  - id: telnet_port
    type: integer
  - id: uart_status
    type: string
  - id: uart_received_data
    type: string
  - id: ir_out_level
    type: enum
    values:
      - "5V"
      - "12V"
```

## Variables

```yaml
variables: []
```

## Events

```yaml
events:
  - id: boot_initializing
    description: "Boot or reboot initialization message"
    example: "System Initializing..."
  - id: boot_finished
    description: "Boot or reboot completion message"
    example: "Initialization Finished!"
```

## Macros

```yaml
macros: []
```

## Safety

```yaml
confirmation_required_for: []
interlocks: []
```

<!-- UNRESOLVED: source gives no explicit confirmation requirements, safety interlocks, or power sequencing procedure. -->

## Notes

- `s` introduces set commands, `r` introduces read commands, and `!` terminates commands.
- Default network mode is DHCP.
- Default TCP/IP port is 8000; default Telnet port is 23.
- Static IP address, subnet, and gateway changes require DHCP to be disabled first.
- IP mode, address, subnet, gateway, TCP/IP port, and Telnet-port changes require `s net reboot!` or device power cycling before taking effect.
- EDID indices 1–21 select built-in definitions, 22–23 select user definitions, 24–31 copy HDMI outputs 1–8, and 31–39 copy HDBaseT outputs 1–8 as printed in source.
- Web GUI has `Admin` and `User` login names with lowercase matching passwords. Source does not state that these credentials apply to raw TCP or Telnet control.
- Factory reset requires physical RS-232 cabling; source states all other functions can operate over IP or cable.

<!-- UNRESOLVED: EDID index 31 appears in both HDMI-copy and HDBaseT-copy ranges in source. -->
<!-- UNRESOLVED: response timing, inter-byte delay, message framing beyond `!`, and concurrency limits not stated. -->
<!-- UNRESOLVED: UART topology behind indices 0~8 and 0~4 is not fully defined in source. -->

## Provenance

```yaml
source_domains:
  - simplifiedmfg.com
  - grouponenw.com
  - store.midstatedistributing.com
source_urls:
  - https://www.simplifiedmfg.com/simplified-products/m88sl
  - https://grouponenw.com/customcontent/attachment/M88SL-Data-Sheet.pdf
  - https://store.midstatedistributing.com/images/pdf/SMP_M88SL_SS.pdf
retrieved_at: 2026-07-25T03:37:09.123Z
last_checked_at: 2026-08-05T08:43:23.798Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:43:23.798Z
matched_actions: 87
action_count: 87
confidence: medium
summary: "All 87 spec actions match literal ASCII commands in the source table; transport parameters (115200 baud, port 8000, telnet 23) all appear verbatim. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated; firmware values occur only in response examples."
- "authentication procedure for raw TCP and Telnet control channels not stated."
- "serial flow control not stated."
- "source gives no explicit confirmation requirements, safety interlocks, or power sequencing procedure."
- "EDID index 31 appears in both HDMI-copy and HDBaseT-copy ranges in source."
- "response timing, inter-byte delay, message framing beyond `!`, and concurrency limits not stated."
- "UART topology behind indices 0~8 and 0~4 is not fully defined in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
