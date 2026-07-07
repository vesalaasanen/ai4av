---
spec_id: admin/aurora-hterx2
schema_version: ai4av-public-spec-v1
revision: 1
title: "Aurora HT Series (HTE-TX2 / HTE-RX2 / HTW-2) Control Spec"
manufacturer: Aurora
model_family: HTE-TX2
aliases: []
compatible_with:
  manufacturers:
    - Aurora
  models:
    - HTE-TX2
    - HTE-RX2
    - HTW-2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509411/aurora-multimedia-hdmi-extenders-hte-rx2-manual.pdf
  - https://www.manualslib.com/manual/1678386/Aurora-Hdbt-Ht-Series.html
retrieved_at: 2026-07-03T19:57:48.394Z
last_checked_at: 2026-07-07T11:04:03.523Z
generated_at: 2026-07-07T11:04:03.523Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source"
  - "transport for RPC commands not explicitly named in source (likely HTTP/web server, base_url unknown)"
  - "flow control not stated for local port"
  - "RPC/HTTP base URL not stated in source"
  - "whether serial and ReAX TCP require authentication"
  - "exact unsolicited notification framing not documented; responses above are solicited query replies (~ prefix)"
  - "variable-change push/notification mechanism not documented"
  - "no unsolicited event/notification mechanism documented in source."
  - "power-on sequencing / interlock procedures beyond IR warnings not stated in source."
  - "firmware version compatibility ranges not stated in source"
  - "RPC command transport (HTTP method/path, base_url) not explicitly stated"
  - "flow_control for local serial port not stated"
  - "whether serial/ReAX sessions require authentication (only web default password documented)"
  - "protocol version beyond \"1.0.0\" API version note not stated"
verification:
  verdict: verified
  checked_at: 2026-07-07T11:04:03.523Z
  matched_actions: 185
  action_count: 185
  confidence: medium
  summary: "All 185 spec actions match verbatim against the source; transport parameters verified; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-03
---

# Aurora HT Series (HTE-TX2 / HTE-RX2 / HTW-2) Control Spec

## Summary
Aurora HT Series HDBaseT extender family (HTE-TX2 transmitter, HTE-RX2 receiver, HTW-2 wall-plate) with RS-232 serial control, RPC commands, and a ReAX TCP control server. This spec covers serial (`!`/`?`/`~` framing), RPC (`method=...&param=...`), and ReAX TCP (port 6970) command sets for audio/video routing, IR, button, USB, serial-port-processing, and device configuration.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: transport for RPC commands not explicitly named in source (likely HTTP/web server, base_url unknown) -->

## Transport
```yaml
# `**` in serial command headers is the device address: !20 = TX/HTW, !30 = RX.
# CR = 0x0D, LF = 0x0A per source framing notes.
protocols:
  - serial
  - tcp
  - http  # inferred: RPC commands accessed via device webpage; base_url UNRESOLVED
serial:
  baud_rate: 115200  # source: default local serial port config 115200-8n1
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated for local port
addressing:
  port: 6970  # ReAX TCP server port (stated)
  base_url: ""  # UNRESOLVED: RPC/HTTP base URL not stated in source
auth:
  type: password  # web-server default password "admin" per factory-default config
  # UNRESOLVED: whether serial and ReAX TCP require authentication
```

## Traits
```yaml
# inferred from command evidence in source:
- routable    # audio + video routing commands present (AUD, VID_SRC, set_audio_route)
- queryable   # extensive query command set (?** and Get*/get_* methods)
- levelable   # line in/out volume control present (LINEIN_VOL, LINEOUT_VOL, set_volume)
```

## Actions
```yaml
# === Serial commands (header !** : !20 = TX/HTW, !30 = RX) ===
- id: serial_reboot
  label: Reboot (serial)
  kind: action
  command: "!**REBOOT"
  params: []
- id: serial_bootupdate
  label: Bootloader Update (serial)
  kind: action
  command: "!**BOOTUPDATE"
  params: []
- id: serial_wsupdate
  label: Firmware Update Mode (serial)
  kind: action
  command: "!**WSUPDATE"
  params: []
- id: serial_set_web_ip
  label: Set Web Server IP Address
  kind: action
  command: "!**IPxxx:xxx:xxx:xxx<cr>"
  params:
    - name: ip
      type: string
      description: "IP as xxx:xxx:xxx:xxx, each octet 000-255 (e.g. 192.168.001.150)"
- id: serial_set_web_gw
  label: Set Web Server Gateway
  kind: action
  command: "!**GWxxx:xxx:xxx:xxx<cr>"
  params:
    - name: gateway
      type: string
      description: "Gateway as xxx:xxx:xxx:xxx, each octet 000-255"
- id: serial_set_web_sm
  label: Set Web Server Subnet Mask
  kind: action
  command: "!**SMxxx:xxx:xxx:xxx<cr>"
  params:
    - name: subnet
      type: string
      description: "Subnet mask as xxx:xxx:xxx:xxx, each octet 000-255"
- id: serial_debugws
  label: Debug Web Server Processor
  kind: action
  command: "!**DEBUGWSx<cr>"
  params:
    - name: x
      type: integer
      description: "0 = Off, 1 = On"
- id: serial_debugmp
  label: Debug Web Video Processor
  kind: action
  command: "!**DEBUGMPx<cr>"
  params:
    - name: x
      type: integer
      description: "0 = Off, 1 = On"
- id: serial_set_sp1
  label: Set External Serial Port Settings
  kind: action
  command: "!**SP1,b,d,p,s<cr>"
  params:
    - name: b
      type: integer
      description: "Baud: 1200,2400,4800,9600,19200,38400,57600,115200"
    - name: d
      type: integer
      description: "Data bits: 7 or 8"
    - name: p
      type: string
      description: "Parity: N, E, O"
    - name: s
      type: integer
      description: "Stop bits: 1 or 2"
- id: serial_lock
  label: Front Panel Lock
  kind: action
  command: "!**LOCKx<cr>"
  params:
    - name: x
      type: integer
      description: "0 = lock disabled, 1 = lock enabled"
- id: serial_dhcp
  label: IP Mode Change
  kind: action
  command: "!**DHCPx<cr>"
  params:
    - name: x
      type: integer
      description: "0 = DHCP, 1 = Static, 2 = AutoIP"
- id: serial_ir_carrier_strip
  label: IR Carrier removal
  kind: action
  command: "!**IR_CARRIER_STRIPx<cr>"
  params:
    - name: x
      type: integer
      description: "1 = removes carrier, 0 = disabled"
- id: serial_ir_inverse
  label: IR carrier inverse
  kind: action
  command: "!**IR_INVERSEx<cr>"
  params:
    - name: x
      type: integer
      description: "1 = inverts carrier, 0 = disabled"
- id: serial_vs_carrier_strip
  label: IR carrier removal at transmitter side
  kind: action
  command: "!**VS_CARRIER_STRIPx<cr>"
  params:
    - name: x
      type: integer
      description: "1 = removes carrier, 0 = disabled"
- id: serial_vs_inverse
  label: IR carrier inverse at transmitter side
  kind: action
  command: "!**VS_INVERSEx<cr>"
  params:
    - name: x
      type: integer
      description: "1 = inverts carrier, 0 = disabled (enabled by default)"
- id: serial_aud_route
  label: Audio Routing
  kind: action
  command: "!**AUD<input_from>,<output_to>"
  params:
    - name: input_from
      type: integer
      description: "0=None,1=LineIn,2=Dante,3=HDMI(TX),4=RemoteAudio,5=HDBT-Extracted(RX),6=ARC(RX)"
    - name: output_to
      type: integer
      description: "1=LineOut,2=Dante,3=HDMI,4=RemoteAudio"
- id: serial_vid_src
  label: Video Routing (HTE-TX / HTW only)
  kind: action
  command: "!20VID_SRCx<cr>"
  params:
    - name: x
      type: integer
      description: "0/1 = HDMI, 2 = VGA (HTE wall plate only)"
- id: serial_filesys_dflt
  label: Format the File system
  kind: action
  command: "!**FILESYS_DFLT<cr>"
  params: []
- id: serial_wproc_dflt
  label: Factory default HTE/HTW
  kind: action
  command: "!**WPROC_DFLT<cr>"
  params: []
- id: serial_usb_mode
  label: USB mode change
  kind: action
  command: "!**USBx<cr>"
  params:
    - name: x
      type: integer
      description: "0 = Host, 1 = Device"
- id: serial_linein_vol
  label: Line in volume
  kind: action
  command: "!**LINEIN_VOL<0-100><cr>"
  params:
    - name: level
      type: integer
      description: "0-100"
- id: serial_lineout_vol
  label: Line Out volume
  kind: action
  command: "!**LINEOUT_VOL<0-100><cr>"
  params:
    - name: level
      type: integer
      description: "0-100"
- id: serial_linein_mute
  label: Line in Mute
  kind: action
  command: "!**LINEIN_MUTE<cr>"
  params: []
- id: serial_lineout_mute
  label: Line out Mute
  kind: action
  command: "!**LINEOUT_MUTE<cr>"
  params: []
- id: serial_btn_push
  label: Button Push
  kind: action
  command: "!**BTN_PUSH<button_num><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2 (box); 1,2,3 (wall plate)"
- id: serial_btn_rel
  label: Button release
  kind: action
  command: "!**BTN_REL<button_num><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2 (box); 1,2,3 (wall plate)"
- id: serial_btn_led
  label: Set button led
  kind: action
  command: "!**BTN_LED<button_num>,<press_mode>,<color><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
    - name: color
      type: string
      description: "r,g,b,y,c,m,w,n"
- id: serial_set_btn_mode
  label: Set button mode
  kind: action
  command: "!**SET_BTN_MODE<button_num>,<press_mode>,<button_mode><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
    - name: button_mode
      type: integer
      description: "1=default,2=serial,3=tcp"
- id: serial_clr_btn_mode
  label: Clear button mode
  kind: action
  command: "!**CLR_BTN_MODE<button_num>,<press_mode>,<button_mode><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
    - name: button_mode
      type: integer
      description: "1=default,2=serial,3=tcp"
- id: serial_btn_param
  label: Set Button Parameters
  kind: action
  command: "!**BTN_PARAM<button_num>,<press_mode>,<command_mode>,<command_string>,<port/ip_addr>,<telnet_port><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "p=press or r=release"
    - name: command_mode
      type: string
      description: "t=tcp, s=serial"
    - name: command_string
      type: string
      description: "string sent on button press (500 char max)"
    - name: port_or_ip
      type: string
      description: "serial port (1/2) for serial mode, or ip address for tcp"
    - name: telnet_port
      type: integer
      description: "tcp port (tcp mode only)"
- id: serial_send_ir
  label: Send IR
  kind: action
  command: "!**SEND_IR<filename>,<command name><cr>"
  params:
    - name: filename
      type: string
      description: "name of the ir file"
    - name: command_name
      type: string
      description: "command name inside the ir file"
- id: serial_read
  label: Read Serial (manual mode)
  kind: action
  command: "!**SERIAL_READ<port><cr>"
  params:
    - name: port
      type: integer
      description: "1 or 2"
- id: serial_clr_buffer
  label: Clear serial Buffer (manual mode)
  kind: action
  command: "!**SERIAL_CLR_BUFFER<port><cr>"
  params:
    - name: port
      type: integer
      description: "1 or 2"

# === Serial Query commands (header ?**) ===
- id: q_web_ip
  label: Query Web Server IP Address
  kind: query
  command: "?**IP<cr>"
  params: []
- id: q_web_sm
  label: Query Web Server Subnet Mask
  kind: query
  command: "?**SM<cr>"
  params: []
- id: q_web_gw
  label: Query Web Server Gateway
  kind: query
  command: "?**GW<cr>"
  params: []
- id: q_wsmac
  label: Query Web Server MAC Address
  kind: query
  command: "?**WSMac<cr>"
  params: []
- id: q_sp1
  label: Query Serial Port Settings
  kind: query
  command: "?**SP1<cr>"
  params: []
- id: q_usb
  label: Query USB Mode
  kind: query
  command: "?**USBx<cr>"
  params: []
- id: q_snum
  label: Query Serial Number
  kind: query
  command: "?**SNUM<cr>"
  params: []
- id: q_debugws
  label: Query Debug Web Server Processor
  kind: query
  command: "?**DEBUGWS<cr>"
  params: []
- id: q_dhcp
  label: Query IP mode
  kind: query
  command: "?**DHCP<cr>"
  params: []
- id: q_lock
  label: Query Front panel lock
  kind: query
  command: "?**LOCK<cr>"
  params: []
- id: q_ver1
  label: Query Application version
  kind: query
  command: "?**VER1<cr>"
  params: []
- id: q_ver2
  label: Query Explore version (HTE-RX only)
  kind: query
  command: "?**VER2<cr>"
  params: []
- id: q_ver3
  label: Query Protocol API version
  kind: query
  command: "?**VER3<cr>"
  params: []
- id: q_bootavail
  label: Query Bootloader presence
  kind: query
  command: "?**BOOTAVAIL<cr>"
  params: []
- id: q_ir_inverse
  label: Query IR Inverse
  kind: query
  command: "?**IR_INVERSE<cr>"
  params: []
- id: q_ir_carrier_strip
  label: Query IR Carrier
  kind: query
  command: "?**IR_CARRIER_STRIP<cr>"
  params: []
- id: q_vs_inverse
  label: Query IR Inverse at transmitter side
  kind: query
  command: "?**VS_INVERSE<cr>"
  params: []
- id: q_vs_carrier_strip
  label: Query IR Carrier at transmitter side
  kind: query
  command: "?**VS_CARRIER_STRIP<cr>"
  params: []
- id: q_vid_src
  label: Query Video Source (HTE-TX & HTW-2)
  kind: query
  command: "?20VID_SRC<cr>"
  params: []
- id: q_aud
  label: Query Audio Routing
  kind: query
  command: "?**AUD"
  params: []
- id: q_btn_modes
  label: Query Button Modes
  kind: query
  command: "?**BTN_MODES<button_num>,<press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
- id: q_btn_led
  label: Query Button LED Colour
  kind: query
  command: "?**BTN_LED<button_num>,<press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
- id: q_ir_groups
  label: Query IR filenames
  kind: query
  command: "?**IR_GROUPS<cr>"
  params: []
- id: q_ir_commands
  label: Query IR commands in file
  kind: query
  command: "?**IR_COMMANDS<filename><cr>"
  params:
    - name: filename
      type: string
      description: "ir filename"
- id: q_staticip
  label: Query Static IP
  kind: query
  command: "?**STATICIP<cr>"
  params: []
- id: q_btn_param
  label: Query Button string parameter
  kind: query
  command: "?**BTN_PARAM<button_num>,<press_mode>,<mode><cr>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "p=press, r=release"
    - name: mode
      type: string
      description: "T=tcp, S=serial"
- id: q_serial_count
  label: Query Used Serial buffer (manual mode)
  kind: query
  command: "?**SERIAL_COUNT<port_num><cr>"
  params:
    - name: port_num
      type: integer
      description: "1 or 2"
- id: q_serial_port_count
  label: Query Number of Serial Ports
  kind: query
  command: "?**SERIAL_PORT_COUNT<cr>"
  params: []
- id: q_auto_sense
  label: Query AutoSense (TX only)
  kind: query
  command: "?**AUTO_SENSE<cr>"
  params: []

# === RPC commands (method=...&param=...) ===
- id: rpc_reboot
  label: RPC Reboot
  kind: action
  command: "method=Reboot"
  params: []
- id: rpc_update_bootloader
  label: RPC UpdateBootloader
  kind: action
  command: "method=UpdateBootloader"
  params: []
- id: rpc_net_set_static_ip
  label: RPC Net_SetStaticIP
  kind: action
  command: "method=Net_SetStaticIP&param1=<ip>&param2=<netmask>&param3=<gateway>"
  params:
    - name: ip
      type: string
      description: "static ip"
    - name: netmask
      type: string
      description: "subnet mask"
    - name: gateway
      type: string
      description: "gateway"
- id: rpc_serial_set_settings
  label: RPC Serial_SetSettings
  kind: action
  command: "method=Serial_SetSettings&Param1=<Baud_Rate>,<data_bits>,<parity>,<stop_bits>"
  params:
    - name: baud_rate
      type: integer
      description: "1200,2400,4800,9600,19200,38400,57600,115200"
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
  label: RPC ButtonLock
  kind: action
  command: "method=ButtonLock&Param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_net_set_dhcp
  label: RPC Net_SetDHCP
  kind: action
  command: "method=Net_SetDHCP"
  params: []
- id: rpc_net_set_autoip
  label: RPC Net_SetAutoIP
  kind: action
  command: "method=Net_SetAutoIP"
  params: []
- id: rpc_ir_carrier_strip
  label: RPC IR_CarrierStrip
  kind: action
  command: "method=IR_CarrierStrip&Param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_ir_inverse
  label: RPC IR_Inverse
  kind: action
  command: "method=IR_Inverse&Param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_ir_hdbt_carrier_strip
  label: RPC IR_HDBTCarrierStrip
  kind: action
  command: "method=IR_HDBTCarrierStrip&Param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_ir_hdbt_carrier_inverse
  label: RPC IR_HDBTCarrierInverse
  kind: action
  command: "method=IR_HDBTCarrierInverse&param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_set_audio_route
  label: RPC SetAudioRoute
  kind: action
  command: "method=SetAudioRoute&Param1=<input>&param2=<output>"
  params:
    - name: input
      type: string
      description: "linein, dante, hdmi, remote_audio, arc"
    - name: output
      type: string
      description: "lineout, dante, stream_audio, remote_audio"
- id: rpc_set_video_source
  label: RPC SetVideoSource (TX only)
  kind: action
  command: "method=SetVideoSource&param1=<src>"
  params:
    - name: src
      type: string
      description: "in1, in2, in3 (wall plate)"
- id: rpc_default_file_system
  label: RPC DefaultFileSystem
  kind: action
  command: "method=DefaultFileSystem"
  params: []
- id: rpc_set_default_config
  label: RPC SetDefaultConfig (factory default)
  kind: action
  command: "method=SetDefaultConfig"
  params: []
- id: rpc_set_usb_mode
  label: RPC SetUsbMode
  kind: action
  command: "method=SetUsbMode&Param1=<host/device>"
  params:
    - name: mode
      type: string
      description: "host or device"
- id: rpc_set_audio_volume
  label: RPC SetAudioVolume
  kind: action
  command: "method=SetAudioVolume&Param1=<analog_audio_port>&Param2=<audio_val>"
  params:
    - name: port
      type: string
      description: "linein or lineout"
    - name: value
      type: string
      description: "0-100, mute, or unmute"
- id: rpc_button_press
  label: RPC ButtonPress
  kind: action
  command: "method=ButtonPress&Param1=<button_no>"
  params:
    - name: button_no
      type: integer
      description: "1,2,3 (wall plate)"
- id: rpc_button_release
  label: RPC ButtonRelease
  kind: action
  command: "method=ButtonRelease&Param1=<button_num>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
- id: rpc_set_button_color
  label: RPC SetButtonColor
  kind: action
  command: "method=SetButtonColor&Param1=<button_num>&Param2=<press/release>&Param3=<color>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: color
      type: string
      description: "red,blue,green,yellow,cyan,white,magenta,none"
- id: rpc_set_button_mode
  label: RPC SetButtonMode
  kind: action
  command: "method=SetButtonMode&Param1=<button_num>&Param2=<press/release>&param3=<mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: mode
      type: string
      description: "tcp, serial, default"
- id: rpc_clear_button_mode
  label: RPC ClearButtonMode
  kind: action
  command: "method=ClearButtonMode&Param1=<button_num>&Param2=<press_mode>&Param3=<mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: mode
      type: string
      description: "tcp, serial, default"
- id: rpc_set_button_param
  label: RPC SetButtonParam
  kind: action
  command: "method=SetButtonParam&Param1=<button_number>&Param2=<press_mode>&Param3=<command_mode>&Param4=<command_string>&Param5=<port/ip_addr>&Param6=<telnet_port>"
  params:
    - name: button_number
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: command_mode
      type: string
      description: "tcp, serial, default"
    - name: command_string
      type: string
      description: "string in quotes"
    - name: port_or_ip
      type: string
      description: "serial port num (serial) or ip address (tcp)"
    - name: telnet_port
      type: integer
      description: "tcp port (tcp mode)"
- id: rpc_serial_set_manual_mode
  label: RPC Serial_SetManualMode
  kind: action
  command: "method=Serial_SetManualMode"
  params: []
- id: rpc_serial_set_extender_mode
  label: RPC Serial_SetExtenderMode
  kind: action
  command: "method=Serial_SetExtenderMode&param1=<0/1>"
  params:
    - name: mode
      type: integer
      description: "0 = extender mode, 1 = mirror mode"
- id: rpc_serial_set_push_port_mode
  label: RPC Serial_SetPushPortMode
  kind: action
  command: "method=Serial_SetPushPortMode&Param1=<ip>&Param2=<serial_port>"
  params:
    - name: ip
      type: string
      description: "ip address"
    - name: serial_port
      type: integer
      description: "serial port number"
- id: rpc_serial_set_push_var_mode
  label: RPC Serial_SetPushVarMode
  kind: action
  command: "method=Serial_SetPushVarMode&Param1=<ip>&Param2=<var_name>"
  params:
    - name: ip
      type: string
      description: "ip address"
    - name: var_name
      type: string
      description: "variable name"
- id: rpc_serial_set_telnet_client_mode
  label: RPC Serial_SetTelnetClientMode
  kind: action
  command: "method=Serial_SetTelnetClientMode&param1=<ip>&param2=<port>"
  params:
    - name: ip
      type: string
      description: "tcp server ip address"
    - name: port
      type: integer
      description: "tcp server port number"
- id: rpc_serial_set_telnet_server_mode
  label: RPC Serial_SetTelnetServerMode
  kind: action
  command: "method=Serial_SetTelnetServerMode&param1=<port>"
  params:
    - name: port
      type: integer
      description: "tcp server port number"
- id: rpc_ir_send_ir
  label: RPC IR_SendIR
  kind: action
  command: "method=IR_SendIR&Param1=<filename>&Param2=<command_name>"
  params:
    - name: filename
      type: string
      description: "ir filename"
    - name: command_name
      type: string
      description: "command name"
- id: rpc_ir_list_ir_groups
  label: RPC IR_ListIRGroups
  kind: query
  command: "method=IR_ListIRGroups"
  params: []
- id: rpc_ir_list_ir_commands
  label: RPC IR_ListIRCommands
  kind: query
  command: "method=IR_ListIRCommands&Param1=<filename>"
  params:
    - name: filename
      type: string
      description: "ir filename"
- id: rpc_get_audio_route
  label: RPC GetAudioRoute
  kind: query
  command: "method=GetAudioRoute"
  params: []
- id: rpc_get_audio_volume
  label: RPC GetAudioVolume
  kind: query
  command: "method=GetAudioVolume&param1=<linein/lineout>"
  params:
    - name: port
      type: string
      description: "linein or lineout"
- id: rpc_get_video_source
  label: RPC GetVideoSource (TX only)
  kind: query
  command: "method=GetVideoSource"
  params: []
- id: rpc_get_button_mode
  label: RPC GetButtonMode
  kind: query
  command: "method=GetButtonMode&Param1=<button_num>&Param2=<press_mode>&Param3=<press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: command_mode
      type: string
      description: "tcp or serial"
- id: rpc_net_get_ip_address
  label: RPC Net_GetIPAddress
  kind: query
  command: "method=Net_GetIPAddress"
  params: []
- id: rpc_net_get_subnet_mask
  label: RPC Net_GetSubnetMask
  kind: query
  command: "method=Net_GetSubnetMask"
  params: []
- id: rpc_net_get_gateway
  label: RPC Net_GetGateway
  kind: query
  command: "method=Net_GetGateway"
  params: []
- id: rpc_net_get_static_ip
  label: RPC Net_GetStaticIP
  kind: query
  command: "method=Net_GetStaticIP"
  params: []
- id: rpc_net_get_network_mode
  label: RPC Net_GetNetworkMode
  kind: query
  command: "method=Net_GetNetworkMode"
  params: []
- id: rpc_get_button_param
  label: RPC get_button_param
  kind: query
  command: "method=get_button_param&param1=<button_num>&param2=<press_mode>&param3=<command_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: command_mode
      type: string
      description: "tcp or serial"
- id: rpc_get_button_color
  label: RPC GetButtonColor
  kind: query
  command: "method=GetButtonColor&Param1=<button_num>&Param2=<press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
- id: rpc_net_get_mac
  label: RPC Net_GetMac
  kind: query
  command: "method=Net_GetMac"
  params: []
- id: rpc_serial_get_settings
  label: RPC Serial_GetSettings
  kind: query
  command: "method=Serial_GetSettings"
  params: []
- id: rpc_get_usb_mode
  label: RPC GetUSBMode
  kind: query
  command: "method=GetUSBMode"
  params: []
- id: rpc_get_serial_number
  label: RPC GetSerialNumber
  kind: query
  command: "method=GetSerialNumber"
  params: []
- id: rpc_get_button_lock
  label: RPC GetButtonLock
  kind: query
  command: "method=GetButtonLock"
  params: []
- id: rpc_get_firmware_version
  label: RPC GetFirmwareVersion
  kind: query
  command: "method=GetFirmwareVersion"
  params: []
- id: rpc_get_explore_version
  label: RPC GetExploreVersion
  kind: query
  command: "method=GetExploreVersion"
  params: []
- id: rpc_get_api_version
  label: RPC GetApiVersion
  kind: query
  command: "method=GetApiVersion"
  params: []
- id: rpc_get_sil_fw_version
  label: RPC GetSilFWVersion
  kind: query
  command: "method=GetSilFWVersion"
  params: []
- id: rpc_get_bootloader_presence
  label: RPC GetBootloaderPresence
  kind: query
  command: "method=GetBootloaderPresence"
  params: []
- id: rpc_ir_get_inverse
  label: RPC IR_GetInverse
  kind: query
  command: "method=IR_GetInverse"
  params: []
- id: rpc_ir_get_carrier_strip
  label: RPC IR_GetCarrierStrip
  kind: query
  command: "method=IR_GetCarrierStrip"
  params: []
- id: rpc_ir_get_hdbt_carrier_inverse
  label: RPC IR_GetHDBTCarrierInverse
  kind: query
  command: "method=IR_GetHDBTCarrierInverse"
  params: []
- id: rpc_ir_get_hdbt_carrier_strip
  label: RPC IR_GetHDBTCarrierStrip
  kind: query
  command: "method=IR_GetHDBTCarrierStrip"
  params: []
- id: rpc_serial_send
  label: RPC Serial_Send
  kind: action
  command: "method=Serial_Send&Param1=<port>&param2=<serial_string>&param3=0"
  params:
    - name: port
      type: integer
      description: "serial port"
    - name: serial_string
      type: string
      description: "serial string to send"
- id: rpc_serial_read
  label: RPC Serial_Read (manual mode)
  kind: query
  command: "method=Serial_Read"
  params: []
- id: rpc_serial_clear_read_buffer
  label: RPC Serial_ClearReadBuffer (manual mode)
  kind: action
  command: "method=Serial_ClearReadBuffer"
  params: []
- id: rpc_serial_read_buffer_count
  label: RPC Serial_ReadBufferCount (manual mode)
  kind: query
  command: "method=Serial_ReadBufferCount"
  params: []
- id: rpc_serial_get_port_count
  label: RPC Serial_GetPortCount
  kind: query
  command: "method=Serial_GetPortCount"
  params: []
- id: rpc_get_auto_sense
  label: RPC GetAutoSense (TX only)
  kind: query
  command: "method=GetAutoSense"
  params: []
- id: rpc_set_auto_sense
  label: RPC SetAutoSense (TX only)
  kind: action
  command: "method=SetAutoSense&Param1=<enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: rpc_set_video_source_priority
  label: RPC SetVideoSourcePriority (TX only)
  kind: action
  command: "method=SetVideoSourcePriority&Param1=<vidSource_num>&param2=<priority_val>"
  params:
    - name: vidSource_num
      type: integer
      description: "1,2,3 (source number)"
    - name: priority_val
      type: integer
      description: "1,2,3 (max 3 wall plate, max 2 box)"
- id: rpc_get_video_source_priority
  label: RPC GetVideoSourcePriority (TX only)
  kind: query
  command: "method=GetVideoSourcePriority&Param1=<source_num>"
  params:
    - name: source_num
      type: integer
      description: "source number"

# === ReAX TCP commands (port 6970, JSON response) ===
- id: reax_set_audio_route
  label: ReAX set_audio_route
  kind: action
  command: "set_audio_route <route_from> <route_to>"
  params:
    - name: route_from
      type: string
      description: "none,linein,dante,hdmi,remote_audio,arc"
    - name: route_to
      type: string
      description: "lineout,dante,stream_audio,remote_audio"
- id: reax_set_volume
  label: ReAX set_volume
  kind: action
  command: "set_volume <audio_port> <volume_level>"
  params:
    - name: audio_port
      type: string
      description: "linein or lineout"
    - name: volume_level
      type: string
      description: "0-100, mute, or unmute"
- id: reax_set_ip
  label: ReAX set_ip
  kind: action
  command: "set_ip <ip_mode> <ip_addr> <subnet> <gateway>"
  params:
    - name: ip_mode
      type: string
      description: "DHCP, static, auto_ip"
    - name: ip_addr
      type: string
      description: "ip address (static)"
    - name: subnet
      type: string
      description: "subnet mask (static)"
    - name: gateway
      type: string
      description: "gateway (static)"
- id: reax_send_ir
  label: ReAX send_ir
  kind: action
  command: "send_ir <filename> <command_name>"
  params:
    - name: filename
      type: string
      description: "file containing pronto codes"
    - name: command_name
      type: string
      description: "IR command name"
- id: reax_list_ir_groups
  label: ReAX list_ir_groups
  kind: query
  command: "list_ir_groups"
  params: []
- id: reax_list_ircmds
  label: ReAX list_ircmds
  kind: query
  command: "list_ircmds <file_name>"
  params:
    - name: file_name
      type: string
      description: "ir file name"
- id: reax_get_audio_route
  label: ReAX get_audio_route
  kind: query
  command: "get_audio_route"
  params: []
- id: reax_get_volume
  label: ReAX get_volume
  kind: query
  command: "get_volume <audio_port>"
  params:
    - name: audio_port
      type: string
      description: "linein or lineout"
- id: reax_config_rs232
  label: ReAX config_rs232
  kind: action
  command: "config_rs232 <port_no.> <baud_rate> <data_bit> <stop_bit> <parity> <hand_shaking> <signal_level>"
  params:
    - name: port_no
      type: integer
      description: "port number (1)"
    - name: baud_rate
      type: integer
      description: "1200,2400,4800,9600,19200,38400,57600,115200"
    - name: data_bit
      type: integer
      description: "7 or 8"
    - name: stop_bit
      type: integer
      description: "1 or 2"
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
  label: ReAX set_video_source
  kind: action
  command: "set_video_source <video_port>"
  params:
    - name: video_port
      type: string
      description: "hdmi1, hdmi2, vga"
- id: reax_get_video_source
  label: ReAX get_video_source
  kind: query
  command: "get_video_source"
  params: []
- id: reax_set_button_mode
  label: ReAX set_button_mode
  kind: action
  command: "set_button_mode <button_number> <press_mode> <button_mode>"
  params:
    - name: button_number
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: button_mode
      type: string
      description: "TCP, serial, default"
- id: reax_get_button_mode
  label: ReAX get_button_mode
  kind: query
  command: "get_button_mode <button_num> <press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
- id: reax_clear_button_mode
  label: ReAX clear_button_mode
  kind: action
  command: "clear_button_mode <button_num> <press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
- id: reax_set_button_color
  label: ReAX set_button_color
  kind: action
  command: "set_button_color <button_num> <press_mode> <button_color>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3 (wall plate)"
    - name: press_mode
      type: string
      description: "press or release"
    - name: button_color
      type: string
      description: "red,blue,green,white,yellow,cyan,magenta,none"
- id: reax_set_button_param
  label: ReAX set_button_param
  kind: action
  command: "set_button_param <button_number> <press_mode> <command_mode> <command_string> <port/ip_addr> <telnet_port>"
  params:
    - name: button_number
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
    - name: command_mode
      type: string
      description: "serial or TCP"
    - name: command_string
      type: string
      description: "max 256 chars, escape chars, double-quoted"
    - name: port_or_ip
      type: string
      description: "serial port num (serial) or ip address (TCP)"
    - name: telnet_port
      type: integer
      description: "tcp port (TCP mode)"
- id: reax_get_ip
  label: ReAX get_ip
  kind: query
  command: "get_ip"
  params: []
- id: reax_get_ip_static
  label: ReAX get_ip_static
  kind: query
  command: "get_ip_static"
  params: []
- id: reax_set_remote_session
  label: ReAX set_remote_session
  kind: action
  command: "set_remote_session <mode> <ip_addr> <mode_specific_param>"
  params:
    - name: mode
      type: string
      description: "telnet_client, telnet_server, extender, manual, push_to_port, push_to_var"
    - name: ip_addr
      type: string
      description: "ip address"
    - name: mode_specific_param
      type: string
      description: "port/tcp port/serial port/var name (mode dependent)"
- id: reax_get_button_param
  label: ReAX get_button_param
  kind: query
  command: "get_button_param <button_num> <press_mode> <command_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
    - name: command_mode
      type: string
      description: "TCP or serial"
- id: reax_get_button_color
  label: ReAX get_button_color
  kind: query
  command: "get_button_color <button_num> <press_mode>"
  params:
    - name: button_num
      type: integer
      description: "1,2,3"
    - name: press_mode
      type: string
      description: "press or release"
- id: reax_get_mac
  label: ReAX get_mac
  kind: query
  command: "get_mac"
  params: []
- id: reax_get_rs232
  label: ReAX get_rs232
  kind: query
  command: "get_rs232 <port_num>"
  params:
    - name: port_num
      type: integer
      description: "1 or 2"
- id: reax_serial_read
  label: ReAX serial_read (manual mode)
  kind: query
  command: "serial_read <port_num>"
  params:
    - name: port_num
      type: integer
      description: "1"
- id: reax_serial_clear_buffer
  label: ReAX serial_clear_buffer (manual mode)
  kind: action
  command: "serial_clear_buffer <port_num>"
  params:
    - name: port_num
      type: integer
      description: "1"
- id: reax_get_serial_buffer_count
  label: ReAX get_serial_buffer_count (manual mode)
  kind: query
  command: "get_serial_buffer_count <port_num>"
  params:
    - name: port_num
      type: integer
      description: "1"
- id: reax_get_serial_port_count
  label: ReAX get_serial_port_count
  kind: query
  command: "get_serial_port_count"
  params: []
- id: reax_get_auto_sense
  label: ReAX get_auto_sense
  kind: query
  command: "get_auto_sense"
  params: []
- id: reax_set_auto_sense
  label: ReAX set_auto_sense
  kind: action
  command: "set_auto_sense <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_reboot
  label: ReAX reboot
  kind: action
  command: "reboot"
  params: []
- id: reax_update_bootloader
  label: ReAX update_bootloader
  kind: action
  command: "update_bootloader"
  params: []
- id: reax_update_firmware
  label: ReAX update_firmware
  kind: action
  command: "update_firmware"
  params: []
- id: reax_button_lock
  label: ReAX button_lock
  kind: action
  command: "button_lock <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_set_ip_dhcp
  label: ReAX set_ip DHCP
  kind: action
  command: "set_ip DHCP"
  params: []
- id: reax_set_ip_auto_ip
  label: ReAX set_ip auto_ip
  kind: action
  command: "set_ip auto_ip"
  params: []
- id: reax_ir_carrier_strip
  label: ReAX ir_carrier_strip
  kind: action
  command: "ir_carrier_strip <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_ir_inverse
  label: ReAX ir_inverse
  kind: action
  command: "ir_inverse <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_hdbt_ir_carrier_strip
  label: ReAX hdbt_ir_carrier_strip
  kind: action
  command: "hdbt_ir_carrier_strip <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_hdbt_ir_carrier_inverse
  label: ReAX hdbt_ir_carrier_inverse
  kind: action
  command: "hdbt_ir_carrier_inverse <enable/disable>"
  params:
    - name: state
      type: string
      description: "enable or disable"
- id: reax_filesystem_default
  label: ReAX filesystem_default
  kind: action
  command: "filesystem_default"
  params: []
- id: reax_factory_default
  label: ReAX factory_default
  kind: action
  command: "factory_default"
  params: []
- id: reax_set_usb_mode
  label: ReAX set_usb_mode
  kind: action
  command: "set_usb_mode <host/device>"
  params:
    - name: mode
      type: string
      description: "host or device"
- id: reax_button_press
  label: ReAX button_press
  kind: action
  command: "button_press <button_number>"
  params:
    - name: button_number
      type: integer
      description: "1,2,3 (wall plate)"
- id: reax_button_release
  label: ReAX button_release
  kind: action
  command: "button_release <button_number>"
  params:
    - name: button_number
      type: integer
      description: "1,2,3 (wall plate)"
- id: reax_get_usb_mode
  label: ReAX get_usb_mode
  kind: query
  command: "get_usb_mode"
  params: []
- id: reax_get_serial_number
  label: ReAX get_serial_number
  kind: query
  command: "get_serial_number"
  params: []
- id: reax_get_button_lock
  label: ReAX get_button_lock
  kind: query
  command: "get_button_lock"
  params: []
- id: reax_get_fw_version
  label: ReAX get_fw_version
  kind: query
  command: "get_fw_version"
  params: []
- id: reax_get_explore_version
  label: ReAX get_explore_version
  kind: query
  command: "get_explore_version"
  params: []
- id: reax_get_api_version
  label: ReAX get_api_version
  kind: query
  command: "get_api_version"
  params: []
- id: reax_get_sil8784_fw_version
  label: ReAX get_sil8784_fw_version
  kind: query
  command: "get_sil8784_fw_version"
  params: []
- id: reax_get_bootloader_presence
  label: ReAX get_bootloader_presence
  kind: query
  command: "get_bootloader_presence"
  params: []
- id: reax_get_ir_inverse
  label: ReAX get_ir_inverse
  kind: query
  command: "get_ir_inverse"
  params: []
- id: reax_get_ir_carrier_strip
  label: ReAX get_ir_carrier_strip
  kind: query
  command: "get_ir_carrier_strip"
  params: []
- id: reax_get_hdbt_ir_inverse
  label: ReAX get_hdbt_ir_inverse
  kind: query
  command: "get_hdbt_ir_inverse"
  params: []
- id: reax_get_hdbt_ir_carrier_strip
  label: ReAX get_hdbt_ir_carrier_strip
  kind: query
  command: "get_hdbt_ir_carrier_strip"
  params: []
- id: reax_serial_send
  label: ReAX serial_send
  kind: action
  command: "serial_send <port> <string>"
  params:
    - name: port
      type: integer
      description: "serial port"
    - name: string
      type: string
      description: "string enclosed in quotes"
```

## Feedbacks
```yaml
- id: audio_route_state
  type: string
  values: ["lineout:<src>", "dante:<src>", "stream_audio:<src>", "remote_audio:<src>"]
  # query ?**AUD / GetAudioRoute / get_audio_route; response lists per-output source
- id: linein_volume
  type: integer
  values: [0-100]
- id: lineout_volume
  type: integer
  values: [0-100]
- id: linein_mute
  type: enum
  values: [muted, unmuted]
- id: lineout_mute
  type: enum
  values: [muted, unmuted]
- id: video_source
  type: enum
  values: [hdmi1, hdmi2, vga]
- id: usb_mode
  type: enum
  values: [host, device]
- id: ip_mode
  type: enum
  values: [dhcp, static, autoip]
- id: static_ip
  type: string
  # format ip,netmask
- id: button_lock
  type: enum
  values: [locked, unlocked]
- id: ir_carrier_strip
  type: enum
  values: [enabled, disabled]
- id: ir_inverse
  type: enum
  values: [enabled, disabled]
- id: serial_settings
  type: string
  # format b,d,p,s (e.g. 115200,8,N,1)
- id: firmware_version
  type: string
  # format a.b.c
- id: api_version
  type: string
  # format a.b.c (current doc = 1.0.0)
- id: bootloader_presence
  type: enum
  values: [absent, present]
- id: auto_sense
  type: enum
  values: [enabled, disabled]
- id: serial_number
  type: string
- id: mac_address
  type: string
# UNRESOLVED: exact unsolicited notification framing not documented; responses above are solicited query replies (~ prefix)
```

## Variables
```yaml
- id: linein_volume
  type: integer
  range: [0, 100]
  # set via LINEIN_VOL / SetAudioVolume / set_volume
- id: lineout_volume
  type: integer
  range: [0, 100]
  # set via LINEOUT_VOL / SetAudioVolume / set_volume
- id: external_serial_baud
  type: integer
  values: [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200]
- id: external_serial_data_bits
  type: integer
  values: [7, 8]
- id: external_serial_parity
  type: string
  values: [N, E, O]
- id: external_serial_stop_bits
  type: integer
  values: [1, 2]
# UNRESOLVED: variable-change push/notification mechanism not documented
```

## Events
```yaml
# UNRESOLVED: no unsolicited event/notification mechanism documented in source.
# All responses are solicited replies to commands/queries (~ prefix = response marker).
```

## Macros
```yaml
- id: audio_insert_rx_to_stream
  label: Insert RX line-in/dante audio into HDMI stream video
  steps:
    - "At HTE-RX: route line-in/dante to remote audio - !30AUD1,4 (line-in) or !30AUD2,4 (dante)"
    - "At HTE-TX: insert remote audio into HDMI stream - !20AUD4,3"
  notes: "Required because RX cannot insert audio directly to its own HDMI output."
```

## Safety
```yaml
confirmation_required_for:
  - serial_reboot
  - serial_wsupdate
  - serial_bootupdate
  - serial_wproc_dflt
  - serial_filesys_dflt
  - rpc_set_default_config
  - rpc_update_bootloader
  - reax_factory_default
  - reax_filesystem_default
  - reax_update_firmware
  - reax_update_bootloader
interlocks:
  - "IR carrier removal can be enabled at TX OR RX side, but NOT both - enabling at TX disables at RX and vice versa (IR_CARRIER_STRIP / VS_CARRIER_STRIP / ir_carrier_strip / hdbt_ir_carrier_strip)."
  - "USB mode change momentarily stops any in-progress video stream."
  - "USB mode change emits a 0x00 character on the UART."
warnings:
  - "IR Receiver must be 30K-60KHz inverted 5V signal. Do not exceed 5V signal level (some devices use 12V). Exceeding 5V will damage the port."
  - "IR emitters must be mono, or have ring and sleeve tied to ground. Receivers must be stereo plug (ring = 5V power). Carrier frequency must be present and IR signal inverted; signal cannot exceed 5V or port damage may occur."
  - "Use only approved Aurora branded receiver, otherwise verify the 5V signal limit."
# UNRESOLVED: power-on sequencing / interlock procedures beyond IR warnings not stated in source.
```

## Notes
- Serial command header `!**` / `?**` / `~**`: the `**` is the device address. `!20`/`?20`/`~20` target the TX/HTW device; `!30`/`?30`/`~30` target the RX device. Sending `!30` from the TX forwards the command to the remote RX and returns its response.
- Framing markers: `!` = command, `?` = query, `~` = response. `<CR>` = 0x0D (13 decimal), `<LF>` = 0x0A.
- Default local serial port config: 115200 baud, 8 data bits, no parity, 1 stop bit. External serial port supports 300–115200 bps and is configurable via SP1/Serial_SetSettings/config_rs232.
- Factory-default network config: IP mode = Auto-IP, static IP 192.168.1.10, netmask 255.255.255.0, gateway 192.168.1.1, web password = admin.
- ReAX TCP server listens on port 6970 and responds in JSON.
- RS-232 connector is 3.5mm TRS: TX = TIP, RX = Ring, GND = Sleeve.
- Audio routing matrix differs by unit: TX has inputs LineIn/Dante/HDMI/RemoteAudio (4) and outputs LineOut/Dante/HDMI(stream)/RemoteAudio (4); RX additionally has HDBT-extracted (5) and ARC (6) inputs. `stream_audio` output is TX-only; `arc` input is RX-only.
- Button count: box version = 1,2; wall plate = 1,2,3. Each button has independent press/release modes, each settable to tcp/serial/default.

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source -->
<!-- UNRESOLVED: RPC command transport (HTTP method/path, base_url) not explicitly stated -->
<!-- UNRESOLVED: flow_control for local serial port not stated -->
<!-- UNRESOLVED: whether serial/ReAX sessions require authentication (only web default password documented) -->
<!-- UNRESOLVED: protocol version beyond "1.0.0" API version note not stated -->
```

## Provenance

```yaml
source_domains:
  - files.avprosupply.com
  - manualslib.com
source_urls:
  - https://files.avprosupply.com/files/attachments/509411/aurora-multimedia-hdmi-extenders-hte-rx2-manual.pdf
  - https://www.manualslib.com/manual/1678386/Aurora-Hdbt-Ht-Series.html
retrieved_at: 2026-07-03T19:57:48.394Z
last_checked_at: 2026-07-07T11:04:03.523Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-07T11:04:03.523Z
matched_actions: 185
action_count: 185
confidence: medium
summary: "All 185 spec actions match verbatim against the source; transport parameters verified; bidirectional coverage complete. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source"
- "transport for RPC commands not explicitly named in source (likely HTTP/web server, base_url unknown)"
- "flow control not stated for local port"
- "RPC/HTTP base URL not stated in source"
- "whether serial and ReAX TCP require authentication"
- "exact unsolicited notification framing not documented; responses above are solicited query replies (~ prefix)"
- "variable-change push/notification mechanism not documented"
- "no unsolicited event/notification mechanism documented in source."
- "power-on sequencing / interlock procedures beyond IR warnings not stated in source."
- "firmware version compatibility ranges not stated in source"
- "RPC command transport (HTTP method/path, base_url) not explicitly stated"
- "flow_control for local serial port not stated"
- "whether serial/ReAX sessions require authentication (only web default password documented)"
- "protocol version beyond \"1.0.0\" API version note not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
