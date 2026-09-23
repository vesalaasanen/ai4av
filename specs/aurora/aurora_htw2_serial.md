---
spec_id: admin/aurora-htw2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora HTW-2 Control Spec"
manufacturer: Aurora
model_family: HTW-2
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - HTW-2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509414/aurora-multimedia-hdmi-extenders-htw-2-w-manual.pdf
  - https://www.manualslib.com/manual/1678386/Aurora-Hdbt-Ht-Series.html
retrieved_at: 2026-09-22T05:30:40.501Z
last_checked_at: 2026-09-22T11:42:48.194Z
generated_at: 2026-09-22T11:42:48.194Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "transport for RPC commands not explicitly stated in source (issued \"to control the device\"; carrier interface — TCP 6970 vs web/HTTP — not specified). ReAX TCP explicitly documented on port 6970."
  - "firmware version compatibility not stated in source."
  - "flow control not stated in source"
  - "carrier transport for RPC commands not explicitly stated in source."
  - "response string format for source-change notification not specified in source"
  - "no software interlock or confirmation procedures stated in source"
  - "flow control for RS-232 not stated in source"
  - "RPC command transport (TCP 6970 vs HTTP web endpoint) not explicitly stated in source"
  - "source-change notification string format not specified in source"
  - "firmware version compatibility not stated in source"
verification:
  verdict: verified
  checked_at: 2026-09-22T11:42:48.194Z
  matched_actions: 184
  action_count: 184
  confidence: medium
  summary: "All 184 spec actions have literal command-string matches in the source across serial set/query, RPC method=..., and ReAX TCP command families; transport port 6970 and 115200-8N1 confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-22
---

# Aurora HTW-2 Control Spec

## Summary
The Aurora Multimedia HTW-2 is an HDBaseT wall plate transmitter (HT Series, shared manual with HTE-TX2/HTE-RX2) with HDMI/VGA inputs, Dante and analog audio, button control, and IR extension. This spec covers the control protocol as documented in the HT Series protocol excerpts: RS-232 serial commands (default 115200-8N1, `!`/`?`/`~` header protocol, CR-terminated), RPC method-string commands, and ReAX TCP commands served on TCP port 6970.

<!-- UNRESOLVED: transport for RPC commands not explicitly stated in source (issued "to control the device"; carrier interface — TCP 6970 vs web/HTTP — not specified). ReAX TCP explicitly documented on port 6970. -->
<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 115200  # factory default; port supports 300-115kbps
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
addressing:
  port: 6970  # ReAX TCP server port (stated in source)
auth:
  type: none  # inferred: no auth procedure in source for serial/TCP control; web UI has separate password (default 'admin')
```

## Traits
```yaml
# inferred from command evidence in source
traits:
  - routable     # video/audio routing commands (!**VID_SRC, !**AUD, set_audio_route)
  - queryable    # extensive ?** query command set
  - levelable    # LINEIN_VOL / LINEOUT_VOL 0-100, set_volume
```

## Actions
```yaml
# Serial commands. Header convention: '!**' = wildcard device header; use '!20' for TX/HTW
# (HTW-2 local), '!30' to address the remote RX through the link. '?' = query, '~' = response.
# Commands terminated with <CR> = 0x0D where shown. Some query responses end with <LF>.
actions:
  # ---- Serial set/command table ----
  - id: serial_reboot
    label: Reboot (Serial)
    kind: action
    command: "!**REBOOT"
    params: []
  - id: serial_bootupdate
    label: Bootloader Update (Serial)
    kind: action
    command: "!**BOOTUPDATE"
    params: []
  - id: serial_wsupdate
    label: Enter Firmware Update Mode (Serial)
    kind: action
    command: "!**WSUPDATE"
    params: []
  - id: serial_set_web_ip
    label: Set Web Server IP Address (Serial)
    kind: action
    command: "!**IP{ip}<cr>"
    params:
      - name: ip
        type: string
        description: "Dotted IP, zero-padded octets 000-255, e.g. 192.168.001.150"
  - id: serial_set_web_gateway
    label: Set Web Server Gateway (Serial)
    kind: action
    command: "!**GW{gateway}<cr>"
    params:
      - name: gateway
        type: string
        description: "Dotted gateway, zero-padded octets 000-255"
  - id: serial_set_web_subnet
    label: Set Web Server Subnet Mask (Serial)
    kind: action
    command: "!**SM{netmask}<cr>"
    params:
      - name: netmask
        type: string
        description: "Dotted netmask, zero-padded octets 000-255"
  - id: serial_debug_web_server
    label: Debug Web Server Processor (Serial)
    kind: action
    command: "!**DEBUGWS{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 = Off, 1 = On"
  - id: serial_debug_video_processor
    label: Debug Video Processor (Serial)
    kind: action
    command: "!**DEBUGMP{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 = Off, 1 = On"
  - id: serial_set_serial_port_settings
    label: Set External Serial Port Settings (Serial)
    kind: action
    command: "!**SP1,{baud},{data_bits},{parity},{stop_bits}<cr>"
    params:
      - name: baud
        type: integer
        description: "1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200"
      - name: data_bits
        type: integer
        description: "7 or 8"
      - name: parity
        type: string
        description: "N, E, or O (None, Even, Odd)"
      - name: stop_bits
        type: integer
        description: "1 or 2"
  - id: serial_front_panel_lock
    label: Front Panel Lock (Serial)
    kind: action
    command: "!**LOCK{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 = lock disabled, 1 = lock enabled (front buttons do not work)"
  - id: serial_set_ip_mode
    label: IP Mode Change (Serial)
    kind: action
    command: "!**DHCP{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 = DHCP, 1 = Static IP, 2 = AutoIP"
  - id: serial_ir_carrier_strip
    label: IR Carrier Removal (Serial)
    kind: action
    command: "!**IR_CARRIER_STRIP{x}<cr>"
    params:
      - name: x
        type: integer
        description: "1 = remove carrier, 0 = disabled"
  - id: serial_ir_inverse
    label: IR Carrier Inverse (Serial)
    kind: action
    command: "!**IR_INVERSE{x}<cr>"
    params:
      - name: x
        type: integer
        description: "1 = invert carrier, 0 = disabled"
  - id: serial_vs_carrier_strip
    label: IR Carrier Removal at Transmitter Side (Serial)
    kind: action
    command: "!**VS_CARRIER_STRIP{x}<cr>"
    params:
      - name: x
        type: integer
        description: "1 = remove carrier, 0 = disabled. TX/RX strip are mutually exclusive."
  - id: serial_vs_inverse
    label: IR Carrier Inverse at Transmitter Side (Serial)
    kind: action
    command: "!**VS_INVERSE{x}<cr>"
    params:
      - name: x
        type: integer
        description: "1 = invert carrier, 0 = disabled. Enabled by default."
  - id: serial_audio_route
    label: Audio Routing (Serial)
    kind: action
    command: "!**AUD{input},{output}"
    params:
      - name: input
        type: integer
        description: "0 = none, 1 = line in, 2 = Dante, 3 = HDMI (TX only), 4 = remote audio, 5 = HDBT extracted (RX only), 6 = ARC (RX only)"
      - name: output
        type: integer
        description: "1 = line out, 2 = Dante, 3 = HDMI/stream audio (TX only), 4 = remote audio"
  - id: serial_video_source
    label: Video Source Select (Serial)
    kind: action
    command: "!20VID_SRC{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 or 1 = HDMI, 2 = VGA. Only for HTE-TX and HTW board."
  - id: serial_filesys_dflt
    label: Format File System (Serial)
    kind: action
    command: "!**FILESYS_DFLT<cr>"
    params: []
  - id: serial_wproc_dflt
    label: Factory Default HTE/HTW (Serial)
    kind: action
    command: "!**WPROC_DFLT<cr>"
    params: []
  - id: serial_set_usb_mode
    label: USB Mode Change (Serial)
    kind: action
    command: "!**USB{x}<cr>"
    params:
      - name: x
        type: integer
        description: "0 = Host, 1 = Device. Stops in-progress video stream momentarily."
  - id: serial_linein_volume
    label: Line In Volume (Serial)
    kind: action
    command: "!**LINEIN_VOL{level}<cr>"
    params:
      - name: level
        type: integer
        description: "0-100"
  - id: serial_lineout_volume
    label: Line Out Volume (Serial)
    kind: action
    command: "!**LINEOUT_VOL{level}<cr>"
    params:
      - name: level
        type: integer
        description: "0-100"
  - id: serial_linein_mute
    label: Line In Mute (Serial)
    kind: action
    command: "!**LINEIN_MUTE<cr>"
    params: []
  - id: serial_lineout_mute
    label: Line Out Mute (Serial)
    kind: action
    command: "!**LINEOUT_MUTE<cr>"
    params: []
  - id: serial_button_push
    label: Simulate Button Push (Serial)
    kind: action
    command: "!**BTN_PUSH{button}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3 (wall plate)"
  - id: serial_button_release
    label: Simulate Button Release (Serial)
    kind: action
    command: "!**BTN_REL{button}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3 (wall plate)"
  - id: serial_set_button_led
    label: Set Button LED (Serial)
    kind: action
    command: "!**BTN_LED{button},{press_mode},{color}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "press or release (p/r)"
      - name: color
        type: string
        description: "r, g, b, y, c, m, w, n (red, green, blue, yellow, cyan, magenta, white, none)"
  - id: serial_set_button_mode
    label: Set Button Mode (Serial)
    kind: action
    command: "!**SET_BTN_MODE{button},{press_mode},{mode}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "press or release (p/r)"
      - name: mode
        type: integer
        description: "1 = default, 2 = serial, 3 = tcp"
  - id: serial_clear_button_mode
    label: Clear Button Mode (Serial)
    kind: action
    command: "!**CLR_BTN_MODE{button},{press_mode},{mode}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "press or release (p/r)"
      - name: mode
        type: integer
        description: "1 = default, 2 = serial, 3 = tcp"
  - id: serial_set_button_param
    label: Set Button Parameters (Serial)
    kind: action
    command: "!**BTN_PARAM{button},{press_mode},{command_mode},{command_string},{port_ip},{telnet_port}<cr>"
    params:
      - name: button
        type: integer
        description: "1/2/3 (wall plate)"
      - name: press_mode
        type: string
        description: "P (press) or R (release)"
      - name: command_mode
        type: string
        description: "T (tcp) or S (serial)"
      - name: command_string
        type: string
        description: "string sent on button press (500 char max)"
      - name: port_ip
        type: string
        description: "serial port (1/2) in serial mode, or IP address in tcp mode"
      - name: telnet_port
        type: integer
        description: "telnet port in tcp mode"
  - id: serial_send_ir
    label: Send IR (Serial)
    kind: action
    command: "!**SEND_IR{filename},{command_name}<cr>"
    params:
      - name: filename
        type: string
        description: "name of the IR file"
      - name: command_name
        type: string
        description: "name of the command inside the IR file"
  - id: serial_serial_read
    label: Read Serial Buffer (Serial)
    kind: query
    command: "!**SERIAL_READ{port}<cr>"
    params:
      - name: port
        type: integer
        description: "1 or 2; manual port-processing mode only"
  - id: serial_serial_clear_buffer
    label: Clear Serial Buffer (Serial)
    kind: action
    command: "!**SERIAL_CLR_BUFFER{port}<cr>"
    params:
      - name: port
        type: integer
        description: "1 or 2; manual port-processing mode only"

  # ---- Serial query commands ----
  - id: serial_query_ip
    label: Query Web Server IP (Serial)
    kind: query
    command: "?**IP<cr>"
    params: []
  - id: serial_query_subnet
    label: Query Web Server Subnet Mask (Serial)
    kind: query
    command: "?**SM<cr>"
    params: []
  - id: serial_query_gateway
    label: Query Web Server Gateway (Serial)
    kind: query
    command: "?**GW<cr>"
    params: []
  - id: serial_query_mac
    label: Query Web Server MAC Address (Serial)
    kind: query
    command: "?**WSMAC<cr>"
    params: []
  - id: serial_query_sp1
    label: Query Serial Port Settings (Serial)
    kind: query
    command: "?**SP1<cr>"
    params: []
  - id: serial_query_usb
    label: Query USB Mode (Serial)
    kind: query
    command: "?**USB<cr>"
    params: []
  - id: serial_query_snum
    label: Query Serial Number (Serial)
    kind: query
    command: "?**SNUM<cr>"
    params: []
  - id: serial_query_debugws
    label: Query Debug Web Server Processor (Serial)
    kind: query
    command: "?**DEBUGWS<cr>"
    params: []
  - id: serial_query_dhcp
    label: Query IP Mode (Serial)
    kind: query
    command: "?**DHCP<cr>"
    params: []
  - id: serial_query_lock
    label: Query Front Panel Lock (Serial)
    kind: query
    command: "?**LOCK<cr>"
    params: []
  - id: serial_query_ver1
    label: Query Application Version (Serial)
    kind: query
    command: "?**VER1<cr>"
    params: []
  - id: serial_query_ver2
    label: Query Explore Version (Serial)
    kind: query
    command: "?**VER2<cr>"
    params: []
  - id: serial_query_ver3
    label: Query Protocol API Version (Serial)
    kind: query
    command: "?**VER3<cr>"
    params: []
  - id: serial_query_bootavail
    label: Query Bootloader Presence (Serial)
    kind: query
    command: "?**BOOTAVAIL<cr>"
    params: []
  - id: serial_query_ir_inverse
    label: Query IR Inverse (Serial)
    kind: query
    command: "?**IR_INVERSE<cr>"
    params: []
  - id: serial_query_ir_carrier_strip
    label: Query IR Carrier (Serial)
    kind: query
    command: "?**IR_CARRIER_STRIP<cr>"
    params: []
  - id: serial_query_vs_inverse
    label: Query IR Inverse at Transmitter Side (Serial)
    kind: query
    command: "?**VS_INVERSE<cr>"
    params: []
  - id: serial_query_vs_carrier_strip
    label: Query IR Carrier at Transmitter Side (Serial)
    kind: query
    command: "?**VS_CARRIER_STRIP<cr>"
    params: []
  - id: serial_query_video_source
    label: Query Video Source (Serial)
    kind: query
    command: "?20VID_SRC<cr>"
    params: []
  - id: serial_query_audio_routing
    label: Query Audio Routing (Serial)
    kind: query
    command: "?**AUD"
    params: []
  - id: serial_query_btn_modes
    label: Query Button Modes (Serial)
    kind: query
    command: "?**BTN_MODES{button},{press_mode}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "press (p) or release (r)"
  - id: serial_query_btn_led
    label: Query Button LED Colour (Serial)
    kind: query
    command: "?**BTN_LED{button},{press_mode}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "press (p) or release (r)"
  - id: serial_query_ir_groups
    label: Query IR Filenames (Serial)
    kind: query
    command: "?**IR_GROUPS<cr>"
    params: []
  - id: serial_query_ir_commands
    label: Query IR Commands in File (Serial)
    kind: query
    command: "?**IR_COMMANDS{filename}<cr>"
    params:
      - name: filename
        type: string
        description: "IR file name, e.g. sony.wir"
  - id: serial_query_static_ip
    label: Query Static IP (Serial)
    kind: query
    command: "?**STATICIP<cr>"
    params: []
  - id: serial_query_btn_param
    label: Query Button String Parameter (Serial)
    kind: query
    command: "?**BTN_PARAM{button},{press_mode},{mode}<cr>"
    params:
      - name: button
        type: integer
        description: "1, 2, 3"
      - name: press_mode
        type: string
        description: "P (press) or R (release)"
      - name: mode
        type: string
        description: "T (tcp) or S (serial)"
  - id: serial_query_serial_count
    label: Query Used Serial Buffer (Serial)
    kind: query
    command: "?**SERIAL_COUNT{port}<cr>"
    params:
      - name: port
        type: integer
        description: "1 or 2; manual mode only"
  - id: serial_query_serial_port_count
    label: Query Number of Serial Ports (Serial)
    kind: query
    command: "?**SERIAL_PORT_COUNT<cr>"
    params: []
  - id: serial_query_auto_sense
    label: Query Auto Sense (Serial)
    kind: query
    command: "?**AUTO_SENSE<cr>"
    params: []

  # ---- RPC commands (method=... strings) ----
  # UNRESOLVED: carrier transport for RPC commands not explicitly stated in source.
  - id: rpc_reboot
    label: Reboot (RPC)
    kind: action
    command: "method=Reboot"
    params: []
  - id: rpc_update_bootloader
    label: Update Bootloader (RPC)
    kind: action
    command: "method=UpdateBootloader"
    params: []
  - id: rpc_enter_update_mode
    label: Enter Update Mode (RPC)
    kind: action
    command: "method=EnterUpdateMode"
    params: []
  - id: rpc_net_set_static_ip
    label: Set Static IP (RPC)
    kind: action
    command: "method=Net_SetStaticIP&Param1={ip}&Param2={netmask}&Param3={gateway}"
    params:
      - name: ip
        type: string
      - name: netmask
        type: string
      - name: gateway
        type: string
  - id: rpc_serial_set_settings
    label: Set Serial Settings (RPC)
    kind: action
    command: "method=Serial_SetSettings&param1={baud},{data_bits},{parity},{stop_bits}"
    params:
      - name: baud
        type: integer
        description: "1200-115200"
      - name: data_bits
        type: integer
        description: "8 or 7"
      - name: parity
        type: string
        description: "O, E, N"
      - name: stop_bits
        type: integer
        description: "1 or 2"
  - id: rpc_button_lock
    label: Button Lock (RPC)
    kind: action
    command: "method=ButtonLock&Param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
        description: "enable or disable"
  - id: rpc_net_set_dhcp
    label: Enter DHCP Mode (RPC)
    kind: action
    command: "method=Net_SetDHCP"
    params: []
  - id: rpc_net_set_auto_ip
    label: Enter Auto IP Mode (RPC)
    kind: action
    command: "method=Net_SetAutoIP"
    params: []
  - id: rpc_ir_carrier_strip
    label: IR Carrier Strip (RPC)
    kind: action
    command: "method=IR_CarrierStrip&Param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
        description: "enable or disable"
  - id: rpc_ir_inverse
    label: IR Inverse (RPC)
    kind: action
    command: "method=IR_Inverse&Param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: rpc_ir_hdbt_carrier_strip
    label: IR HDBT Carrier Strip (RPC)
    kind: action
    command: "method=IR_HDBTCarrierStrip&Param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: rpc_ir_hdbt_carrier_inverse
    label: IR HDBT Carrier Inverse (RPC)
    kind: action
    command: "method=IR_HDBTCarrierInverse&param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
        description: "enabled by default"
  - id: rpc_set_audio_route
    label: Set Audio Route (RPC)
    kind: action
    command: "method=SetAudioRoute&Param1={input}&param2={output}"
    params:
      - name: input
        type: string
        description: "linein, dante, hdmi, remote_audio, arc"
      - name: output
        type: string
        description: "lineout, dante, stream_audio, remote_audio"
  - id: rpc_set_video_source
    label: Set Video Source (RPC)
    kind: action
    command: "method=SetVideoSource&param1={src}"
    params:
      - name: src
        type: string
        description: "in1, in2, in3 (wall plate); TX only"
  - id: rpc_default_file_system
    label: Default File System (RPC)
    kind: action
    command: "method=DefaultFileSystem"
    params: []
  - id: rpc_set_default_config
    label: Factory Default Config (RPC)
    kind: action
    command: "method=SetDefaultConfig"
    params: []
  - id: rpc_set_usb_mode
    label: Set USB Mode (RPC)
    kind: action
    command: "method=SetUsbMode&Param1={host_device}"
    params:
      - name: host_device
        type: string
        description: "host or device"
  - id: rpc_set_audio_volume
    label: Set Audio Volume (RPC)
    kind: action
    command: "method=SetAudioVolume&Param1={port}&Param2={value}"
    params:
      - name: port
        type: string
        description: "linein or lineout"
      - name: value
        type: string
        description: "0-100, mute, or unmute"
  - id: rpc_button_press
    label: Button Press (RPC)
    kind: action
    command: "method=ButtonPress&Param1={button}"
    params:
      - name: button
        type: integer
        description: "1, 2, 3 (wall plate)"
  - id: rpc_button_release
    label: Button Release (RPC)
    kind: action
    command: "method=ButtonRelease&Param1={button}"
    params:
      - name: button
        type: integer
  - id: rpc_set_button_color
    label: Set Button Color (RPC)
    kind: action
    command: "method=SetButtonColor&Param1={button}&Param2={press_release}&Param3={color}"
    params:
      - name: button
        type: integer
        description: "1, 2, 3 (wall plate only)"
      - name: press_release
        type: string
        description: "press or release"
      - name: color
        type: string
        description: "red, blue, green, yellow, cyan, white, magenta, none"
  - id: rpc_set_button_mode
    label: Set Button Mode (RPC)
    kind: action
    command: "method=SetButtonMode&Param1={button}&Param2={press_release}&param3={mode}"
    params:
      - name: button
        type: integer
      - name: press_release
        type: string
        description: "press or release"
      - name: mode
        type: string
        description: "tcp, serial, default (default only for release; default = video source selection)"
  - id: rpc_clear_button_mode
    label: Clear Button Mode (RPC)
    kind: action
    command: "method=ClearButtonMode&Param1={button}&Param2={press_mode}&Param3={mode}"
    params:
      - name: button
        type: integer
      - name: press_mode
        type: string
      - name: mode
        type: string
        description: "tcp, serial, default"
  - id: rpc_set_button_param
    label: Set Button Param (RPC)
    kind: action
    command: "method=SetButtonParam&Param1={button}&Param2={press_mode}&Param3={command_mode}&Param4={command_string}&Param5={port_ip}&Param6={telnet_port}"
    params:
      - name: button
        type: integer
      - name: press_mode
        type: string
      - name: command_mode
        type: string
        description: "tcp or serial"
      - name: command_string
        type: string
        description: "string in quotes"
      - name: port_ip
        type: string
        description: "serial port number (serial mode) or IP address (tcp mode)"
      - name: telnet_port
        type: integer
        description: "tcp port (tcp mode)"
  - id: rpc_serial_set_manual_mode
    label: Serial Set Manual Mode (RPC)
    kind: action
    command: "method=Serial_SetManualMode"
    params: []
  - id: rpc_serial_set_extender_mode
    label: Serial Set Extender Mode (RPC)
    kind: action
    command: "method=Serial_SetExtenderMode&param1={mode}"
    params:
      - name: mode
        type: integer
        description: "0 = extender mode, 1 = mirror mode"
  - id: rpc_serial_set_push_port_mode
    label: Serial Set Push Port Mode (RPC)
    kind: action
    command: "method=Serial_SetPushPortMode&Param1={ip}&Param2={serial_port}"
    params:
      - name: ip
        type: string
      - name: serial_port
        type: integer
  - id: rpc_serial_set_push_var_mode
    label: Serial Set Push Var Mode (RPC)
    kind: action
    command: "method=Serial_SetPushVarMode&Param1={ip}&Param2={var_name}"
    params:
      - name: ip
        type: string
      - name: var_name
        type: string
  - id: rpc_serial_set_telnet_client_mode
    label: Serial Set Telnet Client Mode (RPC)
    kind: action
    command: "method=Serial_SetTelnetClientMode&param1={ip}&param2={port}"
    params:
      - name: ip
        type: string
        description: "tcp server ip"
      - name: port
        type: integer
        description: "tcp server port"
  - id: rpc_serial_set_telnet_server_mode
    label: Serial Set Telnet Server Mode (RPC)
    kind: action
    command: "method=Serial_SetTelnetServerMode&param1={port}"
    params:
      - name: port
        type: integer
        description: "tcp server port"
  - id: rpc_ir_send_ir
    label: Send IR (RPC)
    kind: action
    command: "method=IR_SendIR&Param1={filename}&Param2={command_name}"
    params:
      - name: filename
        type: string
      - name: command_name
        type: string
  - id: rpc_serial_send
    label: Serial Send (RPC)
    kind: action
    command: "method=Serial_Send&Param1={port}&param2={serial_string}&param3=0"
    params:
      - name: port
        type: integer
      - name: serial_string
        type: string
        description: "string in quotes"
  - id: rpc_serial_clear_read_buffer
    label: Serial Clear Read Buffer (RPC)
    kind: action
    command: "method=Serial_ClearReadBuffer"
    params: []
  - id: rpc_set_auto_sense
    label: Set Auto Sense (RPC)
    kind: action
    command: "method=SetAutoSense&Param1={enable_disable}"
    params:
      - name: enable_disable
        type: string
        description: "enable or disable; HTE TX devices only"
  - id: rpc_set_video_source_priority
    label: Set Video Source Priority (RPC)
    kind: action
    command: "method=SetVideoSourcePriority&Param1={source_num}&param2={priority}"
    params:
      - name: source_num
        type: integer
        description: "1, 2, 3"
      - name: priority
        type: integer
        description: "1-3 (max 3 wall plate, max 2 box); TX only"
  - id: rpc_ir_list_ir_groups
    label: List IR Files (RPC)
    kind: query
    command: "method=IR_ListIRGroups"
    params: []
  - id: rpc_ir_list_ir_commands
    label: List IR Commands (RPC)
    kind: query
    command: "method=IR_ListIRCommands&Param1={filename}"
    params:
      - name: filename
        type: string
  - id: rpc_get_audio_route
    label: Get Audio Route (RPC)
    kind: query
    command: "method=GetAudioRoute"
    params: []
  - id: rpc_get_audio_volume
    label: Get Audio Volume (RPC)
    kind: query
    command: "method=GetAudioVolume&param1={port}"
    params:
      - name: port
        type: string
        description: "linein or lineout"
  - id: rpc_get_video_source
    label: Get Video Source (RPC)
    kind: query
    command: "method=GetVideoSource"
    params: []
  - id: rpc_get_button_mode
    label: Get Button Mode (RPC)
    kind: query
    command: "method=GetButtonMode&Param1={button}&Param2={press_mode}&Param3={mode}"
    params:
      - name: button
        type: integer
      - name: press_mode
        type: string
        description: "press or release"
      - name: mode
        type: string
        description: "tcp or serial"
  - id: rpc_net_get_ip_address
    label: Get IP Address (RPC)
    kind: query
    command: "method=Net_GetIPAddress"
    params: []
  - id: rpc_net_get_subnet_mask
    label: Get Subnet Mask (RPC)
    kind: query
    command: "method=Net_GetSubnetMask"
    params: []
  - id: rpc_net_get_gateway
    label: Get Gateway (RPC)
    kind: query
    command: "method=Net_GetGateway"
    params: []
  - id: rpc_net_get_static_ip
    label: Get Static IP (RPC)
    kind: query
    command: "method=Net_GetStaticIP"
    params: []
  - id: rpc_net_get_network_mode
    label: Get Network Mode (RPC)
    kind: query
    command: "method=Net_GetNetworkMode"
    params: []
  - id: rpc_get_button_param
    label: Get Button Param (RPC)
    kind: query
    command: "method=get_button_param&param1={button}&param2={press_mode}&param3={command_mode}"
    params:
      - name: button
        type: integer
      - name: press_mode
        type: string
      - name: command_mode
        type: string
        description: "tcp or serial"
  - id: rpc_get_button_color
    label: Get Button Color (RPC)
    kind: query
    command: "method=GetButtonColor&Param1={button}&Param2={press_mode}"
    params:
      - name: button
        type: integer
      - name: press_mode
        type: string
  - id: rpc_net_get_mac
    label: Get MAC (RPC)
    kind: query
    command: "method=Net_GetMac"
    params: []
  - id: rpc_serial_get_settings
    label: Get Serial Settings (RPC)
    kind: query
    command: "method=Serial_GetSettings"
    params: []
  - id: rpc_get_usb_mode
    label: Get USB Mode (RPC)
    kind: query
    command: "method=GetUSBMode"
    params: []
  - id: rpc_get_serial_number
    label: Get Serial Number (RPC)
    kind: query
    command: "method=GetSerialNumber"
    params: []
  - id: rpc_get_button_lock
    label: Get Button Lock (RPC)
    kind: query
    command: "method=GetButtonLock"
    params: []
  - id: rpc_get_firmware_version
    label: Get Firmware Version (RPC)
    kind: query
    command: "method=GetFirmwareVersion"
    params: []
  - id: rpc_get_explore_version
    label: Get Explore Version (RPC)
    kind: query
    command: "method=GetExploreVersion"
    params: []
  - id: rpc_get_api_version
    label: Get API Version (RPC)
    kind: query
    command: "method=GetApiVersion"
    params: []
  - id: rpc_get_sil_fw_version
    label: Get Silicon Device FW Version (RPC)
    kind: query
    command: "method=GetSilFWVersion"
    params: []
  - id: rpc_get_bootloader_presence
    label: Get Bootloader Presence (RPC)
    kind: query
    command: "method=GetBootloaderPresence"
    params: []
  - id: rpc_ir_get_inverse
    label: Get IR Inverse (RPC)
    kind: query
    command: "method=IR_GetInverse"
    params: []
  - id: rpc_ir_get_carrier_strip
    label: Get IR Carrier Strip (RPC)
    kind: query
    command: "method=IR_GetCarrierStrip"
    params: []
  - id: rpc_ir_get_hdbt_carrier_inverse
    label: Get IR HDBT Carrier Inverse (RPC)
    kind: query
    command: "method=IR_GetHDBTCarrierInverse"
    params: []
  - id: rpc_ir_get_hdbt_carrier_strip
    label: Get IR HDBT Carrier Strip (RPC)
    kind: query
    command: "method=IR_GetHDBTCarrierStrip"
    params: []
  - id: rpc_serial_read
    label: Serial Read (RPC)
    kind: query
    command: "method=Serial_Read"
    params: []
  - id: rpc_serial_read_buffer_count
    label: Serial Read Buffer Count (RPC)
    kind: query
    command: "method=Serial_ReadBufferCount"
    params: []
  - id: rpc_serial_get_port_count
    label: Serial Get Port Count (RPC)
    kind: query
    command: "method=Serial_GetPortCount"
    params: []
  - id: rpc_get_auto_sense
    label: Get Auto Sense (RPC)
    kind: query
    command: "method=GetAutoSense"
    params: []
  - id: rpc_get_video_source_priority
    label: Get Video Source Priority (RPC)
    kind: query
    command: "method=GetVideoSourcePriority&Param1={source_num}"
    params:
      - name: source_num
        type: integer

  # ---- ReAX TCP commands (TCP server port 6970, responds in JSON) ----
  - id: reax_set_audio_route
    label: Set Audio Route (ReAX)
    kind: action
    command: "set_audio_route {route_from} {route_to}"
    params:
      - name: route_from
        type: string
        description: "none, linein, dante, hdmi, remote_audio, arc"
      - name: route_to
        type: string
        description: "lineout, dante, stream_audio, remote_audio (stream_audio TX only)"
  - id: reax_set_volume
    label: Set Volume (ReAX)
    kind: action
    command: "set_volume {audio_port} {volume_level}"
    params:
      - name: audio_port
        type: string
        description: "linein or lineout"
      - name: volume_level
        type: string
        description: "0-100, mute, unmute"
  - id: reax_set_ip
    label: Set IP (ReAX)
    kind: action
    command: "set_ip {ip_mode} {ip} {subnet} {gateway}"
    params:
      - name: ip_mode
        type: string
        description: "DHCP, static, auto_ip (static takes ip/subnet/gateway args)"
      - name: ip
        type: string
      - name: subnet
        type: string
      - name: gateway
        type: string
  - id: reax_send_ir
    label: Send IR (ReAX)
    kind: action
    command: "send_ir {filename} {command_name}"
    params:
      - name: filename
        type: string
        description: "file containing pronto codes"
      - name: command_name
        type: string
  - id: reax_list_ir_groups
    label: List IR Files (ReAX)
    kind: query
    command: "list_ir_groups"
    params: []
  - id: reax_list_ircmds
    label: List IR Commands (ReAX)
    kind: query
    command: "list_ircmds {file_name}"
    params:
      - name: file_name
        type: string
  - id: reax_get_audio_route
    label: Get Audio Route (ReAX)
    kind: query
    command: "get_audio_route"
    params: []
  - id: reax_get_volume
    label: Get Volume (ReAX)
    kind: query
    command: "get_volume {audio_port}"
    params:
      - name: audio_port
        type: string
        description: "linein or lineout"
  - id: reax_config_rs232
    label: Config RS-232 (ReAX)
    kind: action
    command: "config_rs232 {port} {baud_rate} {data_bit} {stop_bit} {parity} {hand_shaking} {signal_level}"
    params:
      - name: port
        type: integer
        description: "port number 1"
      - name: baud_rate
        type: integer
        description: "1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200"
      - name: data_bit
        type: integer
        description: "7 or 8"
      - name: stop_bit
        type: integer
      - name: parity
        type: string
        description: "n, o, e"
      - name: hand_shaking
        type: string
        description: "none or software"
      - name: signal_level
        type: string
        description: "RS232"
  - id: reax_set_video_source
    label: Set Video Source (ReAX)
    kind: action
    command: "set_video_source {video_port}"
    params:
      - name: video_port
        type: string
        description: "hdmi1, hdmi2, vga"
  - id: reax_get_video_source
    label: Get Video Source (ReAX)
    kind: query
    command: "get_video_source"
    params: []
  - id: reax_set_button_mode
    label: Set Button Mode (ReAX)
    kind: action
    command: "set_button_mode {button_number} {press_mode} {button_mode}"
    params:
      - name: button_number
        type: integer
        description: "1, 2, 3 (wall plate only)"
      - name: press_mode
        type: string
        description: "press or release"
      - name: button_mode
        type: string
        description: "TCP, serial, default"
  - id: reax_get_button_mode
    label: Get Button Mode (ReAX)
    kind: query
    command: "get_button_mode {button_num} {press_mode}"
    params:
      - name: button_num
        type: integer
      - name: press_mode
        type: string
  - id: reax_clear_button_mode
    label: Clear Button Mode (ReAX)
    kind: action
    command: "clear_button_mode {button_num} {press_mode}"
    params:
      - name: button_num
        type: integer
      - name: press_mode
        type: string
  - id: reax_set_button_color
    label: Set Button Color (ReAX)
    kind: action
    command: "set_button_color {button_num} {press_mode} {button_color}"
    params:
      - name: button_num
        type: integer
      - name: press_mode
        type: string
      - name: button_color
        type: string
        description: "red, blue, green, white, yellow, cyan, magenta, none"
  - id: reax_set_button_param
    label: Set Button Param (ReAX)
    kind: action
    command: "set_button_param {button_number} {press_mode} {command_mode} {command_string} {port_ip} {telnet_port}"
    params:
      - name: button_number
        type: integer
      - name: press_mode
        type: string
      - name: command_mode
        type: string
        description: "serial or TCP"
      - name: command_string
        type: string
        description: "max 256 chars, escape chars supported, double quotes"
      - name: port_ip
        type: string
        description: "serial port number or ip address"
      - name: telnet_port
        type: integer
  - id: reax_get_ip
    label: Get IP (ReAX)
    kind: query
    command: "get_ip"
    params: []
  - id: reax_get_ip_static
    label: Get Static IP (ReAX)
    kind: query
    command: "get_ip_static"
    params: []
  - id: reax_set_remote_session
    label: Set Remote Session / Port Processing (ReAX)
    kind: action
    command: "set_remote_session {mode} {ip} {mode_specific_param}"
    params:
      - name: mode
        type: string
        description: "telnet_client, telnet_server, extender, manual, push_to_port, push_to_var"
      - name: ip
        type: string
        description: "ip address (mode dependent)"
      - name: mode_specific_param
        type: string
        description: "tcp port / serial port number / var name (mode dependent)"
  - id: reax_get_button_param
    label: Get Button Param (ReAX)
    kind: query
    command: "get_button_param {button_num} {press_mode} {command_mode}"
    params:
      - name: button_num
        type: integer
      - name: press_mode
        type: string
      - name: command_mode
        type: string
        description: "TCP or serial"
  - id: reax_get_button_color
    label: Get Button Color (ReAX)
    kind: query
    command: "get_button_color {button_num} {press_mode}"
    params:
      - name: button_num
        type: integer
      - name: press_mode
        type: string
  - id: reax_get_mac
    label: Get MAC (ReAX)
    kind: query
    command: "get_mac"
    params: []
  - id: reax_get_rs232
    label: Get RS-232 Config (ReAX)
    kind: query
    command: "get_rs232 {port_num}"
    params:
      - name: port_num
        type: integer
        description: "1 or 2"
  - id: reax_serial_read
    label: Serial Read (ReAX)
    kind: query
    command: "serial_read {port_num}"
    params:
      - name: port_num
        type: integer
  - id: reax_serial_clear_buffer
    label: Serial Clear Buffer (ReAX)
    kind: action
    command: "serial_clear_buffer {port_num}"
    params:
      - name: port_num
        type: integer
  - id: reax_get_serial_buffer_count
    label: Get Serial Buffer Count (ReAX)
    kind: query
    command: "get_serial_buffer_count {port_num}"
    params:
      - name: port_num
        type: integer
  - id: reax_get_serial_port_count
    label: Get Serial Port Count (ReAX)
    kind: query
    command: "get_serial_port_count"
    params: []
  - id: reax_get_auto_sense
    label: Get Auto Sense (ReAX)
    kind: query
    command: "get_auto_sense"
    params: []
  - id: reax_set_auto_sense
    label: Set Auto Sense (ReAX)
    kind: action
    command: "set_auto_sense {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_reboot
    label: Reboot (ReAX)
    kind: action
    command: "reboot"
    params: []
  - id: reax_update_bootloader
    label: Update Bootloader (ReAX)
    kind: action
    command: "update_bootloader"
    params: []
  - id: reax_update_firmware
    label: Update Firmware (ReAX)
    kind: action
    command: "update_firmware"
    params: []
  - id: reax_button_lock
    label: Button Lock (ReAX)
    kind: action
    command: "button_lock {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_ir_carrier_strip
    label: IR Carrier Strip (ReAX)
    kind: action
    command: "ir_carrier_strip {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_ir_inverse
    label: IR Inverse (ReAX)
    kind: action
    command: "ir_inverse {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_hdbt_ir_carrier_strip
    label: HDBT IR Carrier Strip (ReAX)
    kind: action
    command: "hdbt_ir_carrier_strip {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_hdbt_ir_carrier_inverse
    label: HDBT IR Carrier Inverse (ReAX)
    kind: action
    command: "hdbt_ir_carrier_inverse {enable_disable}"
    params:
      - name: enable_disable
        type: string
  - id: reax_filesystem_default
    label: Filesystem Default (ReAX)
    kind: action
    command: "filesystem_default"
    params: []
  - id: reax_factory_default
    label: Factory Default (ReAX)
    kind: action
    command: "factory_default"
    params: []
  - id: reax_set_usb_mode
    label: Set USB Mode (ReAX)
    kind: action
    command: "set_usb_mode {host_device}"
    params:
      - name: host_device
        type: string
        description: "host or device"
  - id: reax_button_press
    label: Button Press (ReAX)
    kind: action
    command: "button_press {button_number}"
    params:
      - name: button_number
        type: integer
        description: "1, 2, 3 (wall plate)"
  - id: reax_button_release
    label: Button Release (ReAX)
    kind: action
    command: "button_release {button_number}"
    params:
      - name: button_number
        type: integer
  - id: reax_get_usb_mode
    label: Get USB Mode (ReAX)
    kind: query
    command: "get_usb_mode"
    params: []
  - id: reax_get_serial_number
    label: Get Serial Number (ReAX)
    kind: query
    command: "get_serial_number"
    params: []
  - id: reax_get_button_lock
    label: Get Button Lock (ReAX)
    kind: query
    command: "get_button_lock"
    params: []
  - id: reax_get_fw_version
    label: Get Firmware Version (ReAX)
    kind: query
    command: "get_fw_version"
    params: []
  - id: reax_get_explore_version
    label: Get Explore Version (ReAX)
    kind: query
    command: "get_explore_version"
    params: []
  - id: reax_get_api_version
    label: Get API Version (ReAX)
    kind: query
    command: "get_api_version"
    params: []
  - id: reax_get_sil8784_fw_version
    label: Get Silicon FW Version (ReAX)
    kind: query
    command: "get_sil8784_fw_version"
    params: []
  - id: reax_get_bootloader_presence
    label: Get Bootloader Presence (ReAX)
    kind: query
    command: "get_bootloader_presence"
    params: []
  - id: reax_get_ir_inverse
    label: Get IR Inverse (ReAX)
    kind: query
    command: "get_ir_inverse"
    params: []
  - id: reax_get_ir_carrier_strip
    label: Get IR Carrier Strip (ReAX)
    kind: query
    command: "get_ir_carrier_strip"
    params: []
  - id: reax_get_hdbt_ir_inverse
    label: Get HDBT IR Inverse (ReAX)
    kind: query
    command: "get_hdbt_ir_inverse"
    params: []
  - id: reax_get_hdbt_ir_carrier_strip
    label: Get HDBT IR Carrier Strip (ReAX)
    kind: query
    command: "get_hdbt_ir_carrier_strip"
    params: []
  - id: reax_serial_send
    label: Serial Send (ReAX)
    kind: action
    command: "serial_send {port} {string}"
    params:
      - name: port
        type: integer
      - name: string
        type: string
        description: "string enclosed in quotes"
```

## Feedbacks
```yaml
feedbacks:
  - id: command_ack
    type: string
    description: "Serial commands acknowledged by echo response with '~' header, e.g. '~**LOCK1' (some with <cr>, query responses with <lf>)"
  - id: serial_read_data
    type: string
    description: "Response '~**SERIAL_READ{port}:{string}' - buffered serial data (manual mode)"
  - id: audio_routing_state
    type: string
    description: "Response to ?**AUD, e.g. '~**AUD-Line_Out-none, Dante-none, Stream_Source-video_src_audio, Remote_Audio-line_in, Line_in_vol-100, Line_out_vol-92, Line_in_mute-0, Line_out_mute-0'"
  - id: video_source
    type: enum
    values: [hdmi, vga]
    description: "Response to ?20VID_SRC - x = 0/1 (HDMI) or 2 (VGA)"
  - id: ip_address
    type: string
    description: "Response '~**IPxxx.xxx.xxx.xxx'"
  - id: ip_mode
    type: enum
    values: [dhcp, static, autoip]
  - id: front_panel_lock
    type: enum
    values: [unlocked, locked]
  - id: usb_mode
    type: enum
    values: [host, device]
  - id: linein_volume
    type: integer
    description: "0-100"
  - id: lineout_volume
    type: integer
    description: "0-100"
  - id: linein_mute
    type: boolean
  - id: lineout_mute
    type: boolean
  - id: auto_sense
    type: enum
    values: [disabled, enabled]
  - id: firmware_version
    type: string
    description: "Response to ?**VER1, format a.b.c"
  - id: api_version
    type: string
    description: "Response to ?**VER3, format a.b.c (1.0.0 for source document revision)"
  - id: bootloader_present
    type: boolean
```

## Variables
```yaml
variables:
  - id: linein_volume
    type: integer
    range: [0, 100]
    description: "Line in volume (!**LINEIN_VOL / set_volume linein)"
  - id: lineout_volume
    type: integer
    range: [0, 100]
    description: "Line out volume (!**LINEOUT_VOL / set_volume lineout)"
  - id: button_led_color
    type: enum
    values: [red, green, blue, yellow, cyan, magenta, white, none]
    description: "Per button (1-3) and per press/release"
  - id: video_source
    type: enum
    values: [hdmi, vga]
    description: "HTW-2 video source; 0/1 = HDMI, 2 = VGA"
```

## Events
```yaml
events:
  - id: source_changed
    description: "Whenever a source is changed (button, RS-232 command, or auto-sense), the RS-232 ports send a response string notifying the remote device of the change."
    payload: null  # UNRESOLVED: response string format for source-change notification not specified in source
```

## Macros
```yaml
macros:
  - id: rx_audio_insertion_into_stream
    description: "Insert RX line-in/Dante audio into the HDMI stream (audio insertion works only at TX)"
    steps:
      - "Route audio to remote stream at RX: !30AUD1,4 (line-in to remote audio) or !30AUD2,4 (Dante to remote audio)"
      - "Insert remote audio into HDMI stream at TX: !20AUD4,3 (or set_audio_route remote_audio stream_audio)"
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains hardware cautions but no explicit confirmation/interlock procedures:
# - IR receiver input must not exceed 5V (12V devices cause damage); must be 30-60kHz inverted 5V signal
# - HTW-2 RS-232 port carries a 5V line to power DXB-8 wall plate
# UNRESOLVED: no software interlock or confirmation procedures stated in source
```

## Notes
- Serial header convention: `!` = command, `?` = query, `~` = response. `!**` is a wildcard device header — `!20` addresses TX/HTW devices (HTW-2 local), `!30` addresses the RX. Sending `!30...` from the TX forwards the command to the remote RX; the RX response is relayed back through the TX. `<CR>` = 0x0D; some query responses terminate with `<LF>`.
- Local serial port factory default: 115200 baud, 8 data bits, no parity, 1 stop bit. Port supports 300–115kbps. RS-232 connector on HTW-2 is 4-pin 3.81mm Euro rear; carries 5V to power DXB-8 wall plate. HTE-TX2/RX2 use 3.5mm TRS (TX tip, RX ring, GND sleeve).
- No flow control setting documented anywhere in source.
- Factory default configuration (via !**WPROC_DFLT / SetDefaultConfig / factory_default): IP mode Auto-IP, static IP 192.168.1.10, netmask 255.255.255.0, gateway 192.168.1.1, serial 115200-8n1, web password `admin`, button lock disabled, IR carrier removal/reversal disabled, port processing = extender mode, USB mode Host (TX/HTW) / Device (RX).
- Auto-sense: factory default enabled on HTW-2; source prose says it can be disabled and saved in non-volatile memory via RS-232 command, but no discrete serial set-opcode is tabulated — auto-sense set exists only as RPC `SetAutoSense` and ReAX `set_auto_sense`. Serial query `?**AUTO_SENSE` exists.
- Audio insertion to stream only works at TX; RX-side insertion requires the two-step remote-audio macro (see Macros).
- IR carrier removal at TX and RX are mutually exclusive — enabling at one side disables the other. VS_INVERSE (TX-side IR inverse) is enabled by default.
- USB mode change momentarily stops an in-progress video stream; UART sees a `0x00` character on USB mode change.
- Firmware update mode entry: hold FUNC button at power-on, `!**WSUPDATE<cr>` over serial, 'Start Update' on web page, or `EnterUpdateMode` RPC. With unknown IP, the IP address prints to serial terminal at 115200 baud on entering update mode.
- ReAX TCP server listens on port 6970 and responds in JSON format.
- Device does not scale video — input format passes through (up to 4K60 4:4:4); source lock typically takes 3-5 seconds after switching.

<!-- UNRESOLVED: flow control for RS-232 not stated in source -->
<!-- UNRESOLVED: RPC command transport (TCP 6970 vs HTTP web endpoint) not explicitly stated in source -->
<!-- UNRESOLVED: source-change notification string format not specified in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509414/aurora-multimedia-hdmi-extenders-htw-2-w-manual.pdf
  - https://www.manualslib.com/manual/1678386/Aurora-Hdbt-Ht-Series.html
retrieved_at: 2026-09-22T05:30:40.501Z
last_checked_at: 2026-09-22T11:42:48.194Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-22T11:42:48.194Z
matched_actions: 184
action_count: 184
confidence: medium
summary: "All 184 spec actions have literal command-string matches in the source across serial set/query, RPC method=..., and ReAX TCP command families; transport port 6970 and 115200-8N1 confirmed verbatim. (10 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "transport for RPC commands not explicitly stated in source (issued \"to control the device\"; carrier interface — TCP 6970 vs web/HTTP — not specified). ReAX TCP explicitly documented on port 6970."
- "firmware version compatibility not stated in source."
- "flow control not stated in source"
- "carrier transport for RPC commands not explicitly stated in source."
- "response string format for source-change notification not specified in source"
- "no software interlock or confirmation procedures stated in source"
- "flow control for RS-232 not stated in source"
- "RPC command transport (TCP 6970 vs HTTP web endpoint) not explicitly stated in source"
- "source-change notification string format not specified in source"
- "firmware version compatibility not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
