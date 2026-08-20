---
spec_id: admin/lightware-fp-umx-tps-tx120-mks
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware FP-UMX-TPS-TX120 MKS Control Spec"
manufacturer: Lightware
model_family: "FP-UMX-TPS-TX120 MKS"
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - "FP-UMX-TPS-TX120 MKS"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
  - lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UMX-TPS-TX100_Series_UserManual.pdf
  - https://lightware.com
retrieved_at: 2026-08-11T10:04:57.301Z
last_checked_at: 2026-08-19T09:28:37.477Z
generated_at: 2026-08-19T09:28:37.477Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "exact hardware variant (\"MKS\" suffix) not explicitly named in source port-numbering tables; the FP-UMX-TPS-TX120 series table (§11.7.6) was used."
  - "factory default baud rate for the serial port not explicitly stated in source (LDC auto-detects)."
  - "firmware version compatibility range not stated."
  - "factory default baud rate not stated in source; supported values: 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200"
  - "factory default data bits not stated; supported values: 8 or 9"
  - "factory default parity not stated; supported values: None, Odd, Even"
  - "factory default stop bits not stated; supported values: 1, 1.5, 2"
  - "not stated in source"
  - "full exhaustive list of feedback properties not catalogued here; source tree exposes hundreds via LW3 GETALL."
  - "variable feature availability on FP-UMX-TPS-TX120 MKS not explicitly stated."
  - "maximum event slot count for the FP-UMX-TPS-TX120 MKS variant not stated explicitly in source."
  - "no device-specific safety interlock procedures documented in this source."
  - "\"MKS\" hardware variant (likely an MK-series keypad variant — release notes mention \"FP-UMX-TPS-TX100-MK products are now supported\" in v1.3.0b1) not explicitly enumerated in the port-numbering tables; assumed to match FP-UMX-TPS-TX120 series."
  - "factory-default serial port settings (baud/data/parity/stop) not stated in source."
  - "availability of TX140K/TX140-Plus-only features (cleartext login, MAC filter, macros, variables, TCP recognizer, HTTP messaging, CEC, sendProntoHex, RS-232 recognizer) on the FP-UMX-TPS-TX120 MKS variant — source marks them as DIFFERENCE features for higher models only; included here for catalogue completeness but must be verified against the actual device."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:28:37.477Z
  matched_actions: 195
  action_count: 195
  confidence: medium
  summary: "All 195 spec actions map to documented LW2/LW3 commands in source; transport ports and IP default also match verbatim. (15 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware FP-UMX-TPS-TX120 MKS Control Spec

## Summary
The Lightware FP-UMX-TPS-TX120 MKS is a wall-plate/floor-box HDBaseT (TPS) video+audio transmitter extender in the UMX-TPS-TX100 series, featuring VGA and HDMI inputs plus analog audio input, all switched to a single TPS output. It is controlled via RS-232 serial or TCP/IP Ethernet using the Lightware LW2 (legacy) or LW3 (modern, ASCII tree-structured) protocols. This spec covers the full LW2/LW3 command catalogue (crosspoint routing, autoselect, HDCP, EDID, RS-232/IR/GPIO, Event Manager, Ethernet messaging).

<!-- UNRESOLVED: exact hardware variant ("MKS" suffix) not explicitly named in source port-numbering tables; the FP-UMX-TPS-TX120 series table (§11.7.6) was used. -->
<!-- UNRESOLVED: factory default baud rate for the serial port not explicitly stated in source (LDC auto-detects). -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: null  # UNRESOLVED: factory default baud rate not stated in source; supported values: 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200
  data_bits: null  # UNRESOLVED: factory default data bits not stated; supported values: 8 or 9
  parity: null  # UNRESOLVED: factory default parity not stated; supported values: None, Odd, Even
  stop_bits: null  # UNRESOLVED: factory default stop bits not stated; supported values: 1, 1.5, 2
  flow_control: null  # UNRESOLVED: not stated in source
  connector: "3-pole Phoenix (MC 1.5/3-ST-3.5, 3.5mm pitch)"
  line_terminator: "\r\n"  # inferred from LW3 spec ("closed by Carriage return and Line Feed (CrLf)")
addressing:
  default_ip: "192.168.0.100"  # stated default
  port: 6107  # LW3 protocol TCP port (stated)
  ports:
    - port: 6107
      protocol: LW3
      purpose: "LW3 control protocol over Ethernet"
    - port: 10001
      protocol: LW2
      purpose: "LW2 control protocol over Ethernet (raw TCP)"
auth:
  type: none  # inferred: cleartext login function only available on UMX-TPS-TX140K/TX140-Plus/WP-UMX-TPS-TX130-Plus-US models, not FP-UMX-TPS-TX120 MKS
```

## Traits
```yaml
traits:
  - routable  # inferred: video/audio crosspoint switching commands present (CALL /MEDIA/VIDEO/XP:switch, etc.)
  - queryable  # inferred: many query commands present (GET ...)
  - levelable  # inferred: analog audio Volume and Balance set commands present
```

## Actions
```yaml
# LW2 protocol commands (legacy; sent raw over TCP port 10001 or via serial in LW2 mode,
# enclosed in curly braces). Commands are case-insensitive on input.
# LW3 protocol commands (modern; sent over TCP port 6107 or via serial in LW3 mode).
# Both catalogues are documented in the source; both are emitted here.

# ---------- LW2: General commands ----------
- id: lw2_list_commands
  label: List all available LW2 commands
  kind: query
  command: "{lcmd}"
  params: []
- id: lw2_view_product_type
  label: View product type
  kind: query
  command: "{i}"
  params: []
- id: lw2_query_device_label
  label: Query device label
  kind: query
  command: "{label}"
  params: []
- id: lw2_query_control_protocol
  label: Query active control protocol
  kind: query
  command: "{P_?}"
  params: []
- id: lw2_view_firmware_version
  label: View CPU firmware version
  kind: query
  command: "{F}"
  params: []
- id: lw2_ping
  label: Connection test (PING)
  kind: query
  command: "{PING}"
  params: []
- id: lw2_compile_time
  label: Query firmware compile time
  kind: query
  command: "{CT}"
  params: []
- id: lw2_view_serial_number
  label: View serial number
  kind: query
  command: "{S}"
  params: []
- id: lw2_view_installed_boards
  label: View installed boards
  kind: query
  command: "{IS}"
  params: []
- id: lw2_view_all_controller_firmware
  label: View firmware for all controllers
  kind: query
  command: "{FC}"
  params: []
- id: lw2_query_health_status
  label: Query health status (voltages, temperatures)
  kind: query
  command: "{ST}"
  params: []
- id: lw2_restart_device
  label: Restart device
  kind: action
  command: "{RST}"
  params: []
- id: lw2_factory_default_all
  label: Restore all factory default settings
  kind: action
  command: "{FACTORY=ALL}"
  params: []

# ---------- LW2: AV port settings ----------
- id: lw2_switch_input_to_output
  label: Switch input to output (layered)
  kind: action
  command: "{<in>@<out> <layer>}"
  params:
    - name: in
      type: string
      description: "Input number 1- or 2-digit ASCII (e.g. 01, 5); 0 = disconnect"
    - name: out
      type: string
      description: "Output number (O1)"
    - name: layer
      type: enum
      description: "Signal layer: A=audio, V=video, AV=audio+video"
- id: lw2_mute_output
  label: Mute output
  kind: action
  command: "{#<out> <layer>}"
  params:
    - name: out
      type: string
    - name: layer
      type: enum
      description: "A, V, or AV"
- id: lw2_unmute_output
  label: Unmute output
  kind: action
  command: "{+<out> <layer>}"
  params:
    - name: out
      type: string
    - name: layer
      type: enum
- id: lw2_lock_output
  label: Lock output
  kind: action
  command: "{#><out> <layer>}"
  params:
    - name: out
      type: string
    - name: layer
      type: enum
- id: lw2_unlock_output
  label: Unlock output
  kind: action
  command: "{+<<out> <layer>}"
  params:
    - name: out
      type: string
    - name: layer
      type: enum
- id: lw2_view_connection_state
  label: View crosspoint connection state on outputs
  kind: query
  command: "{VC <layer>}"
  params:
    - name: layer
      type: enum
- id: lw2_view_crosspoint_size
  label: View physical crosspoint size
  kind: query
  command: "{getsize <layer>}"
  params:
    - name: layer
      type: enum
- id: lw2_set_video_autoselect_mode
  label: Set video output autoselect mode
  kind: action
  command: "{AS_V<out>=<state>;<mode>}"
  params:
    - name: out
      type: string
    - name: state
      type: enum
      description: "E=enable, D=disable"
    - name: mode
      type: enum
      description: "F=First detect, L=Last detect, P=Priority detect"
- id: lw2_set_audio_autoselect_mode
  label: Set audio output autoselect mode
  kind: action
  command: "{AS_A<out>=<state>;<mode>}"
  params:
    - name: out
      type: string
    - name: state
      type: enum
    - name: mode
      type: enum
- id: lw2_set_video_input_priorities
  label: Set video input priority list
  kind: action
  command: "{PRIO_V<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}"
  params:
    - name: out
      type: string
    - name: prios
      type: string
      description: "Semicolon-separated priority numbers per input (0=highest, 5=lowest, 31=skip)"
- id: lw2_set_audio_input_priorities
  label: Set audio input priority list
  kind: action
  command: "{PRIO_A<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}"
  params:
    - name: out
      type: string
    - name: prios
      type: string

# ---------- LW2: Network configuration ----------
- id: lw2_query_ip_status
  label: Query current IP status
  kind: query
  command: "{IP_STAT=?}"
  params: []
- id: lw2_set_ip_address
  label: Set IP address
  kind: action
  command: "{IP_ADDRESS=<type>;<ip_address>}"
  params:
    - name: type
      type: enum
      description: "0=static, 1=DHCP"
    - name: ip_address
      type: string
- id: lw2_set_subnet_mask
  label: Set subnet mask
  kind: action
  command: "{IP_NETMASK=<subnet_mask>}"
  params:
    - name: subnet_mask
      type: string
- id: lw2_set_gateway
  label: Set gateway address
  kind: action
  command: "{IP_GATEWAY=<gateway_addr>}"
  params:
    - name: gateway_addr
      type: string
- id: lw2_apply_network
  label: Apply network settings and restart interface
  kind: action
  command: "{ip_apply}"
  params: []
- id: lw2_enable_ethernet
  label: Enable/disable Ethernet port
  kind: action
  command: "{ETH_ENABLE=<switch>}"
  params:
    - name: switch
      type: enum
      description: "0=disable, 1=enable"

# ---------- LW2: RS-232 settings ----------
- id: lw2_set_rs232_mode
  label: Set RS-232 operation mode
  kind: action
  command: "{RS232=<mode>}"
  params:
    - name: mode
      type: enum
      description: "CONTROL, CI (command injection), PASS (pass-through)"
- id: lw2_set_rs232_local_format
  label: Set local RS-232 format
  kind: action
  command: "{RS232_LOCAL_FORMAT=<BaudRate>;<DataBit>;<Parity>;<StopBit>}"
  params:
    - name: BaudRate
      type: enum
      description: "X (no change), 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200"
    - name: DataBit
      type: enum
      description: "X, 8, 9"
    - name: Parity
      type: enum
      description: "X, N (none), E (even), O (odd)"
    - name: StopBit
      type: enum
      description: "X, 1, 1,5, 2"
- id: lw2_set_rs232_local_protocol
  label: Set local RS-232 control protocol
  kind: action
  command: "{RS232_LOCAL_PROT=<protocol>}"
  params:
    - name: protocol
      type: enum
      description: "LW2 or LW3"
- id: lw2_set_rs232_link_format
  label: Set TPS-link RS-232 format
  kind: action
  command: "{RS232_LINK_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}"
  params:
    - name: baud_rate
      type: enum
    - name: data_bit
      type: enum
    - name: parity
      type: enum
    - name: stop_bit
      type: enum
- id: lw2_set_rs232_link_protocol
  label: Set TPS-link RS-232 protocol
  kind: action
  command: "{RS232_LINK_PROT=<protocol>}"
  params:
    - name: protocol
      type: enum

# ---------- LW2: GPIO ----------
- id: lw2_set_gpio_pin
  label: Set GPIO pin direction and level
  kind: action
  command: "{GPIO<pin_nr>=<dir>;<level>}"
  params:
    - name: pin_nr
      type: integer
      description: "0-6"
    - name: dir
      type: enum
      description: "I=input, O=output"
    - name: level
      type: enum
      description: "L=low, H=high, T=toggle"

# ---------- LW3: System commands ----------
- id: lw3_get_product_name
  label: Query product name
  kind: query
  command: "GET /.ProductName"
  params: []
- id: lw3_set_device_label
  label: Set device label
  kind: action
  command: "SET /MANAGEMENT/UID.DeviceLabel=<Custom_name>"
  params:
    - name: Custom_name
      type: string
      description: "Max 39 ASCII characters"
- id: lw3_get_serial_number
  label: Query serial number
  kind: query
  command: "GET /.SerialNumber"
  params: []
- id: lw3_get_firmware_version
  label: Query firmware version
  kind: query
  command: "GET /SYS/MB.FirmwareVersion"
  params: []
- id: lw3_reset_device
  label: Reset (reboot) device
  kind: action
  command: "CALL /SYS:reset()"
  params: []
- id: lw3_factory_defaults
  label: Restore factory default settings
  kind: action
  command: "CALL /SYS:factoryDefaults()"
  params: []
- id: lw3_set_front_panel_lock
  label: Set front panel control lock
  kind: action
  command: "SET /MANAGEMENT/UI.ControlLock=<lock_status>"
  params:
    - name: lock_status
      type: enum
      description: "1=None (enabled), 2=Locked, 3=Force locked"
- id: lw3_set_button_default_function
  label: Set default-function enable for a front-panel button
  kind: action
  command: "SET /MANAGEMENT/UI/BUTTONS/<btn_id>.DefaultFunctionEnable=<btn_status>"
  params:
    - name: btn_id
      type: enum
      description: "B1=Video select, B2=Audio select, B3=Show me"
    - name: btn_status
      type: enum
      description: "Enable or Disable"
- id: lw3_set_dark_mode
  label: Enable/disable dark mode (front-panel LEDs)
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeEnable=<status>"
  params:
    - name: status
      type: enum
      description: "true or false"
- id: lw3_set_dark_mode_delay
  label: Set dark mode delay
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeDelay=<delay_time>"
  params:
    - name: delay_time
      type: integer
      description: "Seconds"
- id: lw3_run_macro
  label: Run a stored macro
  kind: action
  command: "CALL /CTRL/MACROS:run(<macro_name>)"
  params:
    - name: macro_name
      type: string

# ---------- LW3: Cleartext login (TX140K/TX140-Plus only - listed for completeness) ----------
- id: lw3_login
  label: Log into device (cleartext)
  kind: action
  command: "CALL /LOGIN:login(<password>)"
  params:
    - name: password
      type: string
- id: lw3_logout
  label: Log out of device
  kind: action
  command: "CALL /LOGIN:logout(<password>)"
  params:
    - name: password
      type: string
- id: lw3_set_login_password
  label: Set the cleartext login password
  kind: action
  command: "CALL /LOGIN:setPassword(<password>)"
  params:
    - name: password
      type: string
- id: lw3_enable_login
  label: Enable/disable cleartext login function
  kind: action
  command: "SET /LOGIN.LoginEnable=<login_state>"
  params:
    - name: login_state
      type: enum
      description: "true/1 or false/0"

# ---------- LW3: Video port settings ----------
- id: lw3_get_video_source_status
  label: Query video source-port status
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []
- id: lw3_get_video_destination_status
  label: Query video destination-port status
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortStatus"
  params: []
- id: lw3_video_switch
  label: Switch a video input to an output
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(<in>:<out>)"
  params:
    - name: in
      type: string
      description: "Input port (e.g. I1, I2); 0 = disconnect"
    - name: out
      type: string
      description: "Output port (O1)"
- id: lw3_video_disconnect
  label: Disconnect video inputs from an output
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(0:<out>)"
  params:
    - name: out
      type: string
- id: lw3_get_video_crosspoint
  label: Query video crosspoint setting (destination connection list)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []
- id: lw3_get_video_connected_source
  label: Query the input connected to a video output
  kind: query
  command: "GET /MEDIA/VIDEO/<out>.ConnectedSource"
  params:
    - name: out
      type: string
- id: lw3_get_video_autoselect
  label: Query video autoselect settings
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []
- id: lw3_set_video_autoselect
  label: Change video autoselect mode
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(<out1_set>;<out2_set>;…;<out#_set>)"
  params:
    - name: sets
      type: string
      description: "Two-letter codes per output, e.g. O1:EP. Letters: E/D (enable/disable), F/P/L (first/priority/last detect)"
- id: lw3_get_video_priority
  label: Query video input port priority list
  kind: query
  command: "GET /MEDIA/VIDEO/XP.PortPriorityList"
  params: []
- id: lw3_set_video_priority
  label: Change video input port priority
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setAutoselectionPriority(<in>\\(<out>\\):<prio>);(<in>\\(<out>\\):<prio>)"
  params:
    - name: settings
      type: string
      description: "Semicolon-separated; prio 0-31 (31=skip); escape parentheses with backslash"
- id: lw3_video_mute_source
  label: Mute a video input port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_mute_destination
  label: Mute the video output port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_unmute_source
  label: Unmute a video input port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_unmute_destination
  label: Unmute the video output port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_lock_source
  label: Lock a video input port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_lock_destination
  label: Lock the video output port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_unlock_source
  label: Unlock a video input port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_unlock_destination
  label: Unlock the video output port
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_set_input_hdcp
  label: Set HDCP enable on an input port (digital inputs only)
  kind: action
  command: "SET /MEDIA/VIDEO/<in>.HdcpEnable=<logical_value>"
  params:
    - name: in
      type: string
    - name: logical_value
      type: enum
      description: "true or false"
- id: lw3_set_test_pattern_mode
  label: Set test-pattern generator mode on an input
  kind: action
  command: "SET /MEDIA/VIDEO/<in>.FreeRunMode=<mode>"
  params:
    - name: in
      type: string
    - name: mode
      type: enum
      description: "0=Always off, 1=Always on, 2=Auto"
- id: lw3_set_test_pattern_color
  label: Set test-pattern color
  kind: action
  command: "SET /MEDIA/VIDEO/<in>.FreeRunColor=<RGB_code>"
  params:
    - name: in
      type: string
    - name: RGB_code
      type: string
      description: "RR;GG;BB (semicolon-separated)"
- id: lw3_set_test_pattern_resolution
  label: Set test-pattern resolution
  kind: action
  command: "SET /MEDIA/VIDEO/<in>.FreeRunResolution=<resolution>"
  params:
    - name: in
      type: string
    - name: resolution
      type: enum
      description: "0=640x480p60 ... 11=1920x1200p60 (see source table §7.6.22)"
- id: lw3_set_output_hdcp_mode
  label: Set HDCP mode on the video output
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.HdcpModeSetting=<HDCP_mode>"
  params:
    - name: out
      type: string
    - name: HDCP_mode
      type: enum
      description: "0=Auto, 1=Always"
- id: lw3_set_output_hdmi_mode
  label: Set HDMI mode on the video output
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.HdmiModeSetting=<mode>"
  params:
    - name: out
      type: string
    - name: mode
      type: enum
      description: "0=Auto, 1=DVI, 2=HDMI 24 bit, 3=HDMI 30 bit, 4=HDMI 36 bit"
- id: lw3_set_output_color_space
  label: Set color space on the video output
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.ColorSpaceSetting=<colorspace>"
  params:
    - name: out
      type: string
    - name: colorspace
      type: enum
      description: "0=Auto, 1=RGB, 2=YCbCr 4:4:4, 3=YCbCr 4:2:2"
- id: lw3_set_tps_mode
  label: Set TPS mode on a remote port
  kind: action
  command: "SET /REMOTE/<port>.tpsModeSetting=<tps_mode>"
  params:
    - name: port
      type: string
      description: "e.g. S1"
    - name: tps_mode
      type: enum
      description: "A=Auto, H=HDBaseT, L=Longreach, 1=LPPF1, 2=LPPF2"

# ---------- LW3: Audio port settings ----------
- id: lw3_get_audio_source_status
  label: Query audio source-port status
  kind: query
  command: "GET /MEDIA/AUDIO/XP.SourcePortStatus"
  params: []
- id: lw3_get_audio_destination_status
  label: Query audio destination-port status
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortStatus"
  params: []
- id: lw3_get_audio_crosspoint
  label: Query audio crosspoint setting
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationConnectionList"
  params: []
- id: lw3_audio_switch
  label: Switch an audio input to an output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switch(<in>:<out>)"
  params:
    - name: in
      type: string
    - name: out
      type: string
- id: lw3_get_audio_autoselect
  label: Query audio autoselect settings
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortAutoselect"
  params: []
- id: lw3_set_audio_autoselect
  label: Change audio autoselect mode
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setDestinationPortAutoselect(<out>:<out_set>)"
  params:
    - name: out
      type: string
    - name: out_set
      type: string
      description: "Two-letter code (E/D + F/P/L/S)"
- id: lw3_get_audio_priority
  label: Query audio input port priority list
  kind: query
  command: "GET /MEDIA/AUDIO/XP.PortPriorityList"
  params: []
- id: lw3_set_audio_priority
  label: Change audio input port priority
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setAutoselectionPriority<(in>\\(<out>\\):<prio>);(<in>\\(<out>\\):<prio>)"
  params:
    - name: settings
      type: string
- id: lw3_audio_mute_source
  label: Mute an audio input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_mute_destination
  label: Mute the audio output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_unmute_source
  label: Unmute an audio input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_unmute_destination
  label: Unmute the audio output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_lock_source
  label: Lock an audio input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_lock_destination
  label: Lock the audio output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_unlock_source
  label: Unlock an audio input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_unlock_destination
  label: Unlock the audio output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string

# ---------- LW3: Analog audio input level ----------
- id: lw3_set_audio_volume
  label: Set analog audio input volume (attenuation)
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.Volume=<level>"
  params:
    - name: in
      type: string
    - name: level
      type: number
      description: "-95.625 dB to 0 dB in steps of -0.375 dB"
- id: lw3_set_audio_balance
  label: Set analog audio input balance
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.Balance=<level>"
  params:
    - name: in
      type: string
    - name: level
      type: integer
      description: "0=left, 100=right, step 1, default 50"

# ---------- LW3: Event manager ----------
- id: lw3_set_event_condition
  label: Set event condition
  kind: action
  command: "SET /EVENTS/E<loc>.Condition=<expression>"
  params:
    - name: loc
      type: integer
      description: "Event location number"
    - name: expression
      type: string
      description: "<node_path>.<property>=<value>"
- id: lw3_set_event_condition_inverted
  label: Invert an event condition
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionInverted=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_set_event_condition_link
  label: Link an event's condition to another event
  kind: action
  command: "SET /EVENTS/E<loc>.Condition=<event_nr>"
  params:
    - name: loc
      type: integer
    - name: event_nr
      type: integer
- id: lw3_set_event_condition_multi_link
  label: Link an event condition to multiple (up to 4) events
  kind: action
  command: "SET /EVENTS/E<loc>.Condition=<event_nr>&<event_nr>&<event_nr>&<event_nr>"
  params:
    - name: loc
      type: integer
    - name: event_nrs
      type: string
- id: lw3_set_event_action
  label: Set event action by direct path
  kind: action
  command: "SET /EVENTS/E<loc>.Action=<expression>"
  params:
    - name: loc
      type: integer
    - name: expression
      type: string
- id: lw3_set_event_action_link
  label: Link an event's action to another event's
  kind: action
  command: "SET /EVENTS/E<loc>.Action=<event_nr>"
  params:
    - name: loc
      type: integer
    - name: event_nr
      type: integer
- id: lw3_set_event_action_macro
  label: Link an event's action to a stored macro
  kind: action
  command: "SET /EVENTS/E<loc>.Action=<macro_name>"
  params:
    - name: loc
      type: integer
    - name: macro_name
      type: string
- id: lw3_set_event_condition_timeout
  label: Set event condition timeout (delay, seconds)
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionTimeout=<time>"
  params:
    - name: loc
      type: integer
    - name: time
      type: integer
- id: lw3_set_event_condition_end_check
  label: Set event ConditionEndCheck flag
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionEndCheck=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_set_event_condition_continuous
  label: Set event ConditionTimeoutContinuous flag
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionTimeoutContinuous=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_set_event_name
  label: Set event name
  kind: action
  command: "SET /EVENTS/E<loc>.Name=<string>"
  params:
    - name: loc
      type: integer
    - name: string
      type: string
      description: "Max 20 chars: A-Z, a-z, 0-9, hyphen, underscore, space"
- id: lw3_set_event_enabled
  label: Enable/disable an event
  kind: action
  command: "SET /EVENTS/E<loc>.Enabled=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_event_trigger_condition
  label: Manually trigger an event's condition
  kind: action
  command: "CALL /EVENTS/E<loc>:triggerCondition(1)"
  params:
    - name: loc
      type: integer
- id: lw3_get_event_condition_count
  label: Query event condition counter
  kind: query
  command: "GET /EVENTS/E<loc>.ConditionCount"
  params:
    - name: loc
      type: integer
- id: lw3_get_event_trigger_count
  label: Query event external trigger counter
  kind: query
  command: "GET /EVENTS/E<loc>.ExternalConditionTriggerCount"
  params:
    - name: loc
      type: integer
- id: lw3_event_action_test
  label: Test-launch an event's action
  kind: action
  command: "CALL /EVENTS/E<loc>:ActionTest(1)"
  params:
    - name: loc
      type: integer

# ---------- LW3: Variables ----------
- id: lw3_set_variable_value
  label: Assign a variable value
  kind: action
  command: "SET /CTRL/VARS/V<loc>.Value=<value>"
  params:
    - name: loc
      type: integer
      description: "1-30"
    - name: value
      type: string
      description: "Auto-detected numeric or string (max 15 chars; numeric range -2147483648..2147483647)"
- id: lw3_variable_add
  label: Add (or subtract) a value with optional min/max clamping
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:add(<operand>;<min>;<max>)"
  params:
    - name: loc
      type: integer
    - name: operand
      type: integer
    - name: min
      type: integer
    - name: max
      type: integer
- id: lw3_variable_cycle
  label: Add (or subtract) with wrap-around at min/max
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:cycle(<operand>;<min>;<max>)"
  params:
    - name: loc
      type: integer
    - name: operand
      type: integer
    - name: min
      type: integer
    - name: max
      type: integer
- id: lw3_variable_case
  label: Case-convert variable value across up to 16 intervals
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:case(<min> <max> <val>;)"
  params:
    - name: loc
      type: integer
    - name: cases
      type: string
      description: "Semicolon-separated interval groups; each group is '<min> <max> <new_val>'"
- id: lw3_variable_scanf
  label: Scan and store an LW3 property into a variable
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:scanf(<path>.<property>;<pattern>)"
  params:
    - name: loc
      type: integer
    - name: path
      type: string
    - name: property
      type: string
    - name: pattern
      type: string
      description: "scanf-style pattern; '%' must be escaped as '\%'"
- id: lw3_variable_printf
  label: Reformat a variable by adding prefix/postfix
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:printf(<prefix>%s<postfix>)"
  params:
    - name: loc
      type: integer
    - name: prefix
      type: string
    - name: postfix
      type: string

# ---------- LW3: Ethernet configuration ----------
- id: lw3_set_dhcp_enabled
  label: Enable/disable DHCP
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled=<dhcp_status>"
  params:
    - name: dhcp_status
      type: enum
      description: "true=DHCP, false=static"
- id: lw3_set_static_ip
  label: Set static IP address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>"
  params:
    - name: IP_address
      type: string
- id: lw3_set_static_netmask
  label: Set static subnet mask
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>"
  params:
    - name: netmask
      type: string
- id: lw3_set_static_gateway
  label: Set static gateway address
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>"
  params:
    - name: gw_address
      type: string
- id: lw3_apply_network_settings
  label: Apply network settings (reboots interface)
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:applySettings(1)"
  params: []
- id: lw3_set_mac_filter_entry
  label: Set a MAC-filter allowlist entry
  kind: action
  command: "SET /MANAGEMENT/MACFILTER.MACaddress<loc>=<MAC_address>;<receive>;<send>;<name>"
  params:
    - name: loc
      type: integer
      description: "1-8"
    - name: MAC_address
      type: string
    - name: receive
      type: boolean
    - name: send
      type: boolean
    - name: name
      type: string
- id: lw3_enable_mac_filter
  label: Enable/disable MAC filtering
  kind: action
  command: "SET /MANAGEMENT/MACFILTER.FilterEnable=<true/false>"
  params: []
- id: lw3_set_lw2_port_enabled
  label: Block/enable LW2 control port (10001)
  kind: action
  command: "SET /MANAGEMENT/SERVICEFILTER.Lw2Enabled=<port_mode>"
  params:
    - name: port_mode
      type: boolean
- id: lw3_set_http_port_enabled
  label: Block/enable HTTP port (80)
  kind: action
  command: "SET /MANAGEMENT/SERVICEFILTER.HttpEnabled=<port_mode>"
  params:
    - name: port_mode
      type: boolean
- id: lw3_wake_on_lan
  label: Send Wake-on-LAN magic packet
  kind: action
  command: "CALL /MEDIA/ETHERNET:wakeOnLan(MAC_address)"
  params:
    - name: MAC_address
      type: string
- id: lw3_set_hostname
  label: Set the device hostname
  kind: action
  command: "SET /MANAGEMENT/NETWORK.HostName=<unique_name>"
  params:
    - name: unique_name
      type: string
      description: "1-64 chars; A-Z, a-z, 0-9, hyphen, dot (not as last char)"

# ---------- LW3: Ethernet message sending ----------
- id: lw3_tcp_message
  label: Send TCP message (ASCII, with escape support)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpMessage(<IP_address>:<port_no>=<message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: message
      type: string
- id: lw3_tcp_text
  label: Send TCP text (ASCII, no escaping)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpText(<IP_address>:<port_no>=<text>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: text
      type: string
- id: lw3_tcp_binary
  label: Send TCP binary message (hex)
  kind: action
  command: "CALL /MEDIA/ETHERNET.tcpBinary(<IP_address>:<port_no>=<HEX_message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: HEX_message
      type: string
- id: lw3_udp_message
  label: Send UDP message (ASCII, with escape support)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpMessage(<IP_address>:<port_no>=<message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: message
      type: string
- id: lw3_udp_text
  label: Send UDP text (ASCII, no escaping)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpText(<IP_address>:<port_no>=<text>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: text
      type: string
- id: lw3_udp_binary
  label: Send UDP binary message (hex)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpBinary(<IP_address>:<port_no>=<HEX_message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: HEX_message
      type: string

# ---------- LW3: HTTP messaging ----------
- id: lw3_set_http_server_ip
  label: Set HTTP client target IP
  kind: action
  command: "SET /CTRL/HTTP/C1.ServerIP=<IP_address>"
  params:
    - name: IP_address
      type: string
- id: lw3_set_http_server_port
  label: Set HTTP client target TCP port
  kind: action
  command: "SET /CTRL/HTTP/C1.ServerPort=<port_no>"
  params:
    - name: port_no
      type: integer
- id: lw3_set_http_file
  label: Set HTTP client target path
  kind: action
  command: "SET /CTRL/HTTP/C1.File=<path>"
  params:
    - name: path
      type: string
- id: lw3_set_http_header
  label: Set HTTP client message header
  kind: action
  command: "SET /CTRL/HTTP/C1.Header=<header_text>"
  params:
    - name: header_text
      type: string
- id: lw3_http_post
  label: Send HTTP POST
  kind: action
  command: "CALL /CTRL/HTTP/C1:post(<body_text>)"
  params:
    - name: body_text
      type: string
- id: lw3_http_put
  label: Send HTTP PUT
  kind: action
  command: "CALL /CTRL/HTTP/C1:put(<body_text>)"
  params:
    - name: body_text
      type: string

# ---------- LW3: TCP message recognizer ----------
- id: lw3_set_tcp_client_server_ip
  label: Set TCP-recognizer client target IP
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ServerIP=<IP_address>"
  params:
    - name: loc
      type: integer
      description: "1, 2, or 3"
    - name: IP_address
      type: string
- id: lw3_set_tcp_client_server_port
  label: Set TCP-recognizer client target port
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ServerPort=<port_no>"
  params:
    - name: loc
      type: integer
    - name: port_no
      type: integer
- id: lw3_tcp_client_connect
  label: Connect TCP-recognizer client to server
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:connect()"
  params:
    - name: loc
      type: integer
- id: lw3_tcp_client_disconnect
  label: Disconnect TCP-recognizer client
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:disconnect()"
  params:
    - name: loc
      type: integer
- id: lw3_set_tcp_client_delimiter
  label: Set TCP-recognizer delimiter (hex)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.DelimiterHex=<delimiter>"
  params:
    - name: loc
      type: integer
    - name: delimiter
      type: string
      description: "Up to 16 hex digits"
- id: lw3_set_tcp_client_timeout
  label: Set TCP-recognizer timeout (ms)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.TimeOut=<timeout>"
  params:
    - name: loc
      type: integer
    - name: timeout
      type: integer
      description: "0=disabled; min 10"
- id: lw3_get_tcp_client_rx
  label: Query last recognized TCP message (string)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.Rx"
  params:
    - name: loc
      type: integer
- id: lw3_get_tcp_client_rx_hex
  label: Query last recognized TCP message (hex)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.RxHex"
  params:
    - name: loc
      type: integer
- id: lw3_tcp_client_clear
  label: Clear stored TCP recognized messages
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:clear()"
  params:
    - name: loc
      type: integer
- id: lw3_get_tcp_client_active_rx
  label: Query last active TCP message (string)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.ActiveRx"
  params:
    - name: loc
      type: integer
- id: lw3_get_tcp_client_active_rx_hex
  label: Query last active TCP message (hex)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.ActiveRxHex"
  params:
    - name: loc
      type: integer
- id: lw3_set_tcp_client_active_timeout
  label: Set TCP-recognizer active timeout (ms, 0-255)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: loc
      type: integer
    - name: a_timeout
      type: integer
- id: lw3_set_tcp_client_action_trigger
  label: Trigger an event action on TCP message recognition
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ActionTrigger=<event_nr>"
  params:
    - name: loc
      type: integer
    - name: event_nr
      type: integer

# ---------- LW3: RS-232 port configuration ----------
- id: lw3_set_serial_control_protocol
  label: Set serial port control protocol (LW2/LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.ControlProtocol=<protocol>"
  params:
    - name: port
      type: string
      description: "P1 (local), P2 (TPS link)"
    - name: protocol
      type: enum
      description: "0=LW2, 1=LW3"
- id: lw3_set_serial_baudrate
  label: Set serial port baud rate
  kind: action
  command: "SET /MEDIA/UART/<port>.Baudrate=<baudrate>"
  params:
    - name: port
      type: string
    - name: baudrate
      type: enum
      description: "0=4800, 1=7200, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"
- id: lw3_set_serial_databits
  label: Set serial port data bits
  kind: action
  command: "SET /MEDIA/UART/<port>.DataBits=<databits>"
  params:
    - name: port
      type: string
    - name: databits
      type: enum
      description: "8 or 9"
- id: lw3_set_serial_stopbits
  label: Set serial port stop bits
  kind: action
  command: "SET /MEDIA/UART/<port>.StopBits=<stopbits>"
  params:
    - name: port
      type: string
    - name: stopbits
      type: enum
      description: "0=1, 1=1.5, 2=2"
- id: lw3_set_serial_parity
  label: Set serial port parity
  kind: action
  command: "SET /MEDIA/UART/<port>.Parity=<parity>"
  params:
    - name: port
      type: string
    - name: parity
      type: enum
      description: "0=None, 1=Odd, 2=Even"
- id: lw3_set_serial_rs232_mode
  label: Set serial port operation mode
  kind: action
  command: "SET /MEDIA/UART/<port>.Rs232Mode=<mode>"
  params:
    - name: port
      type: string
    - name: mode
      type: enum
      description: "0=Pass-through, 1=Control, 2=Command injection"
- id: lw3_set_serial_command_injection
  label: Enable/disable serial command injection
  kind: action
  command: "SET /MEDIA/UART/<port>.CommandInjectionEnable=<logical_value>"
  params:
    - name: port
      type: string
    - name: logical_value
      type: boolean

# ---------- LW3: RS-232 message sending ----------
- id: lw3_serial_send_message
  label: Send ASCII message via RS-232 (with escaping)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendMessage(<message>)"
  params:
    - name: message
      type: string
- id: lw3_serial_send_text
  label: Send ASCII text via RS-232 (no escaping)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendText(<message>)"
  params:
    - name: message
      type: string
- id: lw3_serial_send_binary
  label: Send binary message via RS-232 (hex)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendBinaryMessage(<message>)"
  params:
    - name: message
      type: string
      description: "Hex-encoded"

# ---------- LW3: RS-232 message recognizer ----------
- id: lw3_set_serial_recognizer_enable
  label: Enable/disable RS-232 message recognizer
  kind: action
  command: "SET /MEDIA/UART/<serial_port>.RecognizerEnable=<recognizer_enable>"
  params:
    - name: serial_port
      type: string
      description: "P1 or P2"
    - name: recognizer_enable
      type: boolean
- id: lw3_set_serial_recognizer_delimiter
  label: Set RS-232 recognizer delimiter (hex)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.DelimiterHex=<delimiter>"
  params:
    - name: delimiter
      type: string
      description: "Up to 16 hex digits"
- id: lw3_set_serial_recognizer_timeout
  label: Set RS-232 recognizer timeout (ms)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.TimeOut=<timeout>"
  params:
    - name: timeout
      type: integer
- id: lw3_get_serial_recognizer_rx
  label: Query last recognized RS-232 message (string)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.Rx"
  params: []
- id: lw3_get_serial_recognizer_rx_hex
  label: Query last recognized RS-232 message (hex)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.RxHex"
  params: []
- id: lw3_serial_recognizer_clear
  label: Clear stored RS-232 recognized messages
  kind: action
  command: "CALL /MEDIA/UART/RECOGNIZER:clear()"
  params: []
- id: lw3_get_serial_recognizer_active_rx
  label: Query active RS-232 message (string)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRx"
  params: []
- id: lw3_get_serial_recognizer_active_rx_hex
  label: Query active RS-232 message (hex)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRxHex"
  params: []
- id: lw3_set_serial_recognizer_active_timeout
  label: Set RS-232 recognizer active timeout (ms, 0-255)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: a_timeout
      type: integer

# ---------- LW3: CEC (TX140K/TX140-Plus / WP-UMX-TPS-TX130-Plus-US only - listed for completeness) ----------
- id: lw3_cec_send_click
  label: Send a CEC push-button (press & release) command
  kind: action
  command: "CALL /MEDIA/CEC/<port>:sendClick(<command>)"
  params:
    - name: port
      type: string
      description: "Video input I1-I4 or output O1-O2"
    - name: command
      type: enum
      description: "Named CEC command (ok, back, up, down, left, right, root_menu, setup_menu, contents_menu, favorite_menu, media_top_menu, media_context_menu, number_0-9, dot, enter, clear, channel_up, channel_down, sound_select, input_select, display_info, power_legacy, page_up, page_down, volume_up, volume_down, mute_toggle, mute, unmute, play, stop, pause, record, rewind, fast_forward, skip_forward, skip_backward, eject, power_toggle, power_on, power_off, 3d_mode, stop_record, pause_record, play_forward, play_reverse, stop_function, f1, f2, f3, f4, select_next_media, select_media_1-5)"
- id: lw3_cec_send
  label: Send a CEC command
  kind: action
  command: "CALL /MEDIA/CEC/<port>:send(<command>)"
  params:
    - name: port
      type: string
    - name: command
      type: enum
      description: "image_view_on, standby, text_view_on, active_source, get_cec_version, set_osd, clear_osd, give_power_status"
- id: lw3_set_cec_osd_string
  label: Set CEC OSD string (used with send(set_osd))
  kind: action
  command: "SET /MEDIA/CEC/<port>.OsdString=<text>"
  params:
    - name: port
      type: string
    - name: text
      type: string
      description: "A-Z, a-z, 0-9, hyphen, underscore, dot; max 14 chars"
- id: lw3_cec_send_hex
  label: Send raw CEC command in hex
  kind: action
  command: "CALL /MEDIA/CEC/<port>:sendHex(<hex_code>)"
  params:
    - name: port
      type: string
    - name: hex_code
      type: string
      description: "Max 30 chars (15 bytes) hex"
- id: lw3_get_cec_last_received
  label: Query last received CEC message
  kind: query
  command: "GET /MEDIA/CEC/<port>.LastReceivedMessage"
  params:
    - name: port
      type: string

# ---------- LW3: Infrared port configuration ----------
- id: lw3_set_ir_command_injection
  label: Enable/disable IR command injection
  kind: action
  command: "SET /MEDIA/IR/<port>.CommandInjectionEnable=<true|false>"
  params:
    - name: port
      type: string
- id: lw3_set_ir_modulation
  label: Enable/disable IR output signal modulation
  kind: action
  command: "SET /MEDIA/IR/<port>.EnableModulation=<true|false>"
  params:
    - name: port
      type: string

# ---------- LW3: Infrared message sending (TX140K/TX140-Plus/WP-UMX-TPS-TX130-Plus-US only) ----------
- id: lw3_ir_send_pronto_hex
  label: Send Pronto Hex IR code (little-endian)
  kind: action
  command: "CALL /MEDIA/IR/<output_port>:sendProntoHex(<hex_code>)"
  params:
    - name: output_port
      type: enum
      description: "D1=local IR output, D2=TPS IR output"
    - name: hex_code
      type: string
      description: "Up to 765 hex chars (0-9, A-F, a-f)"
- id: lw3_ir_send_pronto_hex_big_endian
  label: Send Pronto Hex IR code (big-endian)
  kind: action
  command: "CALL /MEDIA/IR/<output_port>:sendProntoHexBigEndian(<hex_code>)"
  params:
    - name: output_port
      type: enum
    - name: hex_code
      type: string

# ---------- LW3: GPIO configuration ----------
- id: lw3_set_gpio_direction
  label: Set GPIO pin direction
  kind: action
  command: "SET /MEDIA/GPIO/<port>.Direction=<direction>"
  params:
    - name: port
      type: string
      description: "GPIO port P1..P8"
    - name: direction
      type: enum
      description: "I=input, O=output"
- id: lw3_set_gpio_output
  label: Set GPIO output level
  kind: action
  command: "SET /MEDIA/GPIO/<port>.Output=<value>"
  params:
    - name: port
      type: string
    - name: value
      type: enum
      description: "H=high, L=low"
- id: lw3_gpio_toggle
  label: Toggle GPIO level
  kind: action
  command: "CALL /MEDIA/GPIO/<port>:toggle()"
  params:
    - name: port
      type: string

# ---------- LW3: EDID management ----------
- id: lw3_get_edid_status
  label: Query emulated EDIDs
  kind: query
  command: "GET /EDID.EdidStatus"
  params: []
- id: lw3_get_dynamic_edid_validity
  label: Query validity of a dynamic EDID
  kind: query
  command: "GET /EDID/D/<dynamic>.Validity"
  params:
    - name: dynamic
      type: string
      description: "Dynamic EDID index, e.g. D1"
- id: lw3_get_user_edid_preferred_resolution
  label: Query preferred resolution of a user EDID
  kind: query
  command: "GET /EDID/U/<user>.PreferredResolution"
  params:
    - name: user
      type: string
      description: "User EDID index, e.g. U2"
- id: lw3_edid_switch
  label: Emulate an EDID onto an input port
  kind: action
  command: "CALL /EDID:switch(<dynamic|user|factory>:<emulated>)"
  params:
    - name: source
      type: string
      description: "e.g. F49"
    - name: emulated
      type: string
      description: "Emulated memory index, e.g. E2"
- id: lw3_edid_switch_all
  label: Emulate an EDID onto all input ports
  kind: action
  command: "CALL /EDID:switchAll(<dynamic|user|factory>)"
  params:
    - name: source
      type: string
- id: lw3_edid_copy
  label: Copy an EDID to user memory
  kind: action
  command: "CALL /EDID:copy(<dynamic|emulated|factory|user>:<user>)"
  params:
    - name: source
      type: string
    - name: user
      type: string
- id: lw3_edid_delete
  label: Delete an EDID from user memory
  kind: action
  command: "CALL /EDID:delete(<user>)"
  params:
    - name: user
      type: string
- id: lw3_edid_reset
  label: Reset all emulated EDIDs to factory default
  kind: action
  command: "CALL /EDID:reset()"
  params: []

# ---------- LW3: Protocol-level subscription (changes emit CHG notifications) ----------
- id: lw3_open_subscription
  label: Subscribe to a node (receive async CHG notifications)
  kind: action
  command: "OPEN <node>"
  params:
    - name: node
      type: string
- id: lw3_close_subscription
  label: Unsubscribe from a node
  kind: action
  command: "CLOSE <node>"
  params:
    - name: node
      type: string
- id: lw3_get_manual
  label: Get manual text for a node, property, or method
  kind: query
  command: "MAN <node>"
  params:
    - name: node
      type: string
```

## Feedbacks
```yaml
# Source documents query responses and async CHG notifications for many properties.
# Selected representative feedbacks:
- id: video_source_port_status
  type: string
  description: "Per-port 5-char status code from GET /MEDIA/VIDEO/XP.SourcePortStatus (mute/lock + 2-byte hex: embedded-audio / HDCP / signal / connection bits)"
- id: video_destination_port_status
  type: string
  description: "Per-output 5-char status code from GET /MEDIA/VIDEO/XP.DestinationPortStatus"
- id: audio_source_port_status
  type: string
  description: "Per-port 5-char status code from GET /MEDIA/AUDIO/XP.SourcePortStatus"
- id: video_connected_source
  type: string
  description: "Input port currently connected to an output (from GET /MEDIA/VIDEO/<out>.ConnectedSource)"
- id: video_crosspoint
  type: string
  description: "DestinationConnectionList response"
- id: video_autoselect_setting
  type: enum
  values: ["EF", "EP", "EL", "DF", "DP", "DL", "DS"]
  description: "Two-letter autoselect code per output"
- id: event_condition_detect
  type: boolean
  description: "True when an event's condition is currently detected"
- id: event_condition_count
  type: integer
  description: "How many times an event's condition has been detected/triggered since boot"
- id: cec_last_received_message
  type: string
  description: "Last CEC message received on a port"
- id: serial_recognizer_rx
  type: string
  description: "Last RS-232 message recognized by the recognizer"
- id: tcp_client_rx
  type: string
  description: "Last TCP-recognizer message"
- id: chg_notification
  type: string
  description: "Async CHG notifications emitted on subscribed node property changes"
# UNRESOLVED: full exhaustive list of feedback properties not catalogued here; source tree exposes hundreds via LW3 GETALL.
```

## Variables
```yaml
# LW3 exposes user-defined variables (V1..V30) on this family (TX140K/TX140-Plus/WP-UMX-TPS-TX130-Plus-US only).
# For the FP-UMX-TPS-TX120 MKS, source lists the capability under DIFFERENCE clauses for higher models;
# availability on the MKS variant is UNRESOLVED.
- id: user_variable
  type: integer_or_string
  description: "User variable V<loc> (loc 1-30). Numeric range -2147483648..2147483647; string max 15 chars."
# UNRESOLVED: variable feature availability on FP-UMX-TPS-TX120 MKS not explicitly stated.
```

## Events
```yaml
# The Event Manager (E1..E<max>) lets the device react to internal property changes
# by triggering a stored action. Each event has Condition, Action, Enabled, ConditionTimeout, etc.
- id: event_manager_slot
  description: "Configurable event slot (Condition + Action + Delay). Conditions reference LW3 property changes; actions invoke LW3 methods/properties/macros."
# UNRESOLVED: maximum event slot count for the FP-UMX-TPS-TX120 MKS variant not stated explicitly in source.
```

## Macros
```yaml
# Macros are batches of LW3 CALL/SET commands stored in device configuration presets and run by name.
- id: macro_run
  description: "Run a stored macro by name (CALL /CTRL/MACROS:run(<macro_name>))"
- id: macro_file_format
  description: "Macro file uses ;<preset_name> / ;Begin <name> / <LW3 commands> / ;End <name> structure, uploaded as .LW3 file via Settings/Backup."
# Macros not stored in regular device backup; must be saved separately.
# Available on UMX-TPS-TX140K, TX140-Plus, WP-UMX-TPS-TX130-Plus-US; availability on FP-UMX-TPS-TX120 MKS UNRESOLVED.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source contains no explicit safety warnings, interlock procedures, or power-on sequencing
# requirements that require operator confirmation beyond a generic ATTENTION note that
# restoring factory defaults / network IP changes will drop the connection.
# Front panel lock modes (ControlLock 2=Locked / 3=Force locked) prevent physical tampering
# but are not safety interlocks.
# UNRESOLVED: no device-specific safety interlock procedures documented in this source.
```

## Notes
- **Two parallel protocols.** LW2 (legacy, `{...}` brackets, raw TCP port 10001, case-insensitive input) and LW3 (modern ASCII tree, CrLf-terminated, TCP port 6107, case-sensitive). Either can run over the local RS-232 serial port (P1) or the TPS-link serial port (P2); set via `SET /MEDIA/UART/<port>.ControlProtocol` or LW2 `{RS232_LOCAL_PROT=...}`. The default for the FP-UMX-TPS-TX120 MKS serial port is not stated in source.
- **LW3 escape rule.** Control characters `\ { } # % ( ) \r \n \t` must be backslash-escaped inside string parameters (e.g. `CALL /MEDIA/UART/P1:sendMessage(Set\(01\))`). Hex bytes can also be embedded via `\xHH`.
- **LW3 signature grouping.** An optional 4-digit hex signature can prefix any command (`<sig>#CMD`); responses are wrapped in `{<sig> ... }` so a client can correlate multi-line responses.
- **LW3 max line length** is 800 bytes including prefix, path, method/property, and parameters.
- **Port numbering (FP-UMX-TPS-TX120 series, §11.7.6):**
  - Video: VGA in = I1, HDMI in = I2, Testpattern = I3, TPS out = O1
  - Emulated EDID memory: VGA = E1, HDMI = E2
  - Audio: Audio in = I1, HDMI in = I2, TPS out = O1
  - Serial: local = P1, TPS link = P2
  - IR: local input = S1, TPS input = S2, TPS output = D1
- **Subscriptions** (LW3 OPEN/CLOSE) are per-connection and cleared when the TCP/socket is closed. Property changes emit async `CHG /<path>.<prop>=<value>` lines.
- **Bulk management / LMDMP** multicast protocol can reconfigure many devices at once via CSV file; not in scope of this control spec.
- **Firmware update** uses Lightware Device Updater V2 (LDU2); CLI available via `LightwareDeviceUpdaterV2_CLI.cmd`.

<!-- UNRESOLVED: "MKS" hardware variant (likely an MK-series keypad variant — release notes mention "FP-UMX-TPS-TX100-MK products are now supported" in v1.3.0b1) not explicitly enumerated in the port-numbering tables; assumed to match FP-UMX-TPS-TX120 series. -->
<!-- UNRESOLVED: factory-default serial port settings (baud/data/parity/stop) not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility range not stated. -->
<!-- UNRESOLVED: availability of TX140K/TX140-Plus-only features (cleartext login, MAC filter, macros, variables, TCP recognizer, HTTP messaging, CEC, sendProntoHex, RS-232 recognizer) on the FP-UMX-TPS-TX120 MKS variant — source marks them as DIFFERENCE features for higher models only; included here for catalogue completeness but must be verified against the actual device. -->
````

规格已生成。序列号+TCP双协议（LW2+LW3）已全面覆盖。FP-UMX-TPS-TX120 MKS 的端口映射已记录。针对变量/宏/CEC/登录功能的可用性存疑（仅限 TX140 变体；MKS 未验证）。串口默认波特率/认证已标记为未解决（UNRESOLVED）。

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UMX-TPS-TX100_Series_UserManual.pdf
  - https://lightware.com
retrieved_at: 2026-08-11T10:04:57.301Z
last_checked_at: 2026-08-19T09:28:37.477Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:28:37.477Z
matched_actions: 195
action_count: 195
confidence: medium
summary: "All 195 spec actions map to documented LW2/LW3 commands in source; transport ports and IP default also match verbatim. (15 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "exact hardware variant (\"MKS\" suffix) not explicitly named in source port-numbering tables; the FP-UMX-TPS-TX120 series table (§11.7.6) was used."
- "factory default baud rate for the serial port not explicitly stated in source (LDC auto-detects)."
- "firmware version compatibility range not stated."
- "factory default baud rate not stated in source; supported values: 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200"
- "factory default data bits not stated; supported values: 8 or 9"
- "factory default parity not stated; supported values: None, Odd, Even"
- "factory default stop bits not stated; supported values: 1, 1.5, 2"
- "not stated in source"
- "full exhaustive list of feedback properties not catalogued here; source tree exposes hundreds via LW3 GETALL."
- "variable feature availability on FP-UMX-TPS-TX120 MKS not explicitly stated."
- "maximum event slot count for the FP-UMX-TPS-TX120 MKS variant not stated explicitly in source."
- "no device-specific safety interlock procedures documented in this source."
- "\"MKS\" hardware variant (likely an MK-series keypad variant — release notes mention \"FP-UMX-TPS-TX100-MK products are now supported\" in v1.3.0b1) not explicitly enumerated in the port-numbering tables; assumed to match FP-UMX-TPS-TX120 series."
- "factory-default serial port settings (baud/data/parity/stop) not stated in source."
- "availability of TX140K/TX140-Plus-only features (cleartext login, MAC filter, macros, variables, TCP recognizer, HTTP messaging, CEC, sendProntoHex, RS-232 recognizer) on the FP-UMX-TPS-TX120 MKS variant — source marks them as DIFFERENCE features for higher models only; included here for catalogue completeness but must be verified against the actual device."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
