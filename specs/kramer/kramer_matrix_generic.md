---
spec_id: admin/kramer-matrix_generic
schema_version: ai4av-public-spec-v1
revision: 2
title: "Kramer Matrix (Generic) Control Spec"
manufacturer: Kramer
model_family: VS-88H2
aliases: []
compatible_with:
  manufacturers:
    - Kramer
  models:
    - VS-88H2
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/kramer-vs-88h2-protocol-commands-um-1.pdf
retrieved_at: 2026-06-12T02:50:54.653Z
last_checked_at: 2026-06-12T19:22:53.101Z
generated_at: 2026-06-12T19:22:53.101Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "TCP/UDP default port not stated; firmware version not stated; default device ID is 01 but the user is expected to override per device; specific model compatibility beyond VS-88H2 not verified"
  - "TCP/UDP default port not stated in source (ETH-PORT range is 2000-65535)"
  - "all configuration items use action/feedback pairs; no standalone variables"
  - "no unsolicited notifications described in source"
  - "no explicit multi-step macro sequences described in source"
  - "TCP/UDP default port not stated; unsolicited events not described; specific model compatibility beyond VS-88H2 not verified"
verification:
  verdict: verified
  checked_at: 2026-06-12T19:22:53.101Z
  matched_actions: 81
  action_count: 81
  confidence: medium
  summary: "All 81 spec action units have exact wire-literal matches in the source command table; transport parameters (baud 115200, serial, tcp/udp, port range 2000-65535) are confirmed; source catalogue is fully covered by the spec. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Kramer Matrix (Generic) Control Spec

## Summary
Kramer Protocol 3000 matrix switcher supporting 8x8 HDMI inputs/outputs. Controlled via RS-232 serial or TCP/UDP over Ethernet. Protocol uses ASCII command strings with `#` prefix for send, `~NN@` prefix for responses, `<CR>` send terminator and `<CR><LF>` feedback terminator. Commands are ASCII mnemonics (AFV, AV, VID, AUD, BAUD, ETH-PORT, FACTORY, PRST-STO, etc.) with angle-bracket-denoted variable parameters and comma separators.

<!-- UNRESOLVED: TCP/UDP default port not stated; firmware version not stated; default device ID is 01 but the user is expected to override per device; specific model compatibility beyond VS-88H2 not verified -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - udp
serial:
  baud_rate: 115200  # default factory reset value per source; 9600 also supported
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: null  # UNRESOLVED: TCP/UDP default port not stated in source (ETH-PORT range is 2000-65535)
auth:
  type: none  # inferred: no auth procedure required by default (LOGIN/PASS/SECUR commands exist but are optional and disabled by default)
```

## Traits
```yaml
- routable       # inferred from AV, VID, AUD routing commands
- queryable      # inferred from numerous ? query commands returning state
- levelable      # inferred from VMUTE (video mute level on/off per output)
```

## Actions
```yaml
- id: handshake
  label: Protocol Handshake
  kind: action
  command: "#"
  params: []

- id: set_afv_mode
  label: Set Audio Follow Video Mode
  kind: action
  command: "#AFV{afv_mode}"
  params:
    - name: afv_mode
      type: integer
      description: "0=afv (audio follows video), 1=brk (audio breakaway)"

- id: get_afv_mode
  label: Get Audio Follow Video Mode
  kind: query
  command: "#AFV?"
  params: []

- id: route_audio
  label: Switch Embedded Audio
  kind: action
  command: "#AUD{in}>{out_id}"
  params:
    - name: in
      type: integer
      description: Input number (0=disconnect, 1-8=HDMI IN 1-8)
    - name: out_id
      type: string
      description: Output number (1-8=HDMI OUT 1-8, *=all)

- id: get_audio_route
  label: Get Audio Switch State
  kind: query
  command: "#AUD?{out_id}"
  params:
    - name: out_id
      type: string
      description: Output number (1-8, or *=all)

- id: route_av
  label: Switch Audio and Video
  kind: action
  command: "#AV{in}>{out_id}"
  params:
    - name: in
      type: integer
      description: Input number (0=disconnect, 1-8=HDMI IN 1-8)
    - name: out_id
      type: string
      description: Output number (1-8=HDMI OUT 1-8, *=all)

- id: route_video
  label: Switch Video
  kind: action
  command: "#VID{in}>{out_id}"
  params:
    - name: in
      type: integer
      description: Input number (1-n)
    - name: out_id
      type: string
      description: Output number (1-8, or *=all)

- id: get_video_route
  label: Get Video Switch State
  kind: query
  command: "#VID?{out_id}"
  params:
    - name: out_id
      type: string
      description: Output number (1-8)

- id: set_av_sw_mode
  label: Set Input Auto Switch Mode
  kind: action
  command: "#AV-SW-MODE{layer_type},{out_index},{connection_mode}"
  params:
    - name: layer_type
      type: integer
      description: "1=Video"
    - name: out_index
      type: integer
      description: Output number (1-8)
    - name: connection_mode
      type: integer
      description: "0=manual, 1=priority switch, 2=last connected"

- id: get_av_sw_mode
  label: Get Input Auto Switch Mode
  kind: query
  command: "#AV-SW-MODE?{layer_type},{out_index}"
  params:
    - name: layer_type
      type: integer
      description: "1=Video"
    - name: out_index
      type: integer
      description: Output number (1-8)

- id: set_av_sw_timeout
  label: Set Auto Switching Timeout
  kind: action
  command: "#AV-SW-TIMEOUT{switching_mode},{time_out}"
  params:
    - name: switching_mode
      type: integer
      description: "0=Video signal lost, 4=Disable 5V on video output if no input signal detected"
    - name: time_out
      type: integer
      description: Timeout in seconds (0-999)

- id: get_av_sw_timeout
  label: Get Auto Switching Timeout
  kind: query
  command: "#AV-SW-TIMEOUT?{switching_mode}"
  params:
    - name: switching_mode
      type: integer
      description: "0=Video signal lost, 4=Disable 5V on video output if no input signal detected"

- id: set_baud_rate
  label: Set Serial Port Baud Rate
  kind: action
  command: "#BAUD{baud_rate}"
  params:
    - name: baud_rate
      type: integer
      description: "9600 / 115200 / other supported rate"

- id: get_baud_rate
  label: Get Serial Port Baud Rate
  kind: query
  command: "#BAUD?"
  params: []

- id: get_baud_rate_list
  label: Get List of Supported Baud Rates
  kind: query
  command: "#BAUD?{baud_param}"
  params:
    - name: baud_param
      type: integer
      description: "0=get the list of supported baud rates"

- id: get_build_date
  label: Get Device Build Date
  kind: query
  command: "#BUILD-DATE?"
  params: []

- id: copy_edid
  label: Copy EDID Data
  kind: action
  command: "#CPEDID{edid_io},{src_id},{dst_type},{dest_bitmap}"
  params:
    - name: edid_io
      type: integer
      description: "0=Input, 1=Output, 2=Default EDID"
    - name: src_id
      type: integer
      description: Source ID (input or output number, or 0 for Default EDID)
    - name: dst_type
      type: integer
      description: "0=Input (EDID destination type)"
    - name: dest_bitmap
      type: string
      description: Hex bitmap of destination IDs (e.g. 0x1)

- id: list_files
  label: List Files in Device
  kind: query
  command: "#DIR"
  params: []

- id: get_display_status
  label: Get Output HPD Status
  kind: query
  command: "#DISPLAY?{out_index}"
  params:
    - name: out_index
      type: integer
      description: Output number (1-8)

- id: get_dip_switch_status
  label: Get DIP-Switch State
  kind: query
  command: "#DPSW-STATUS?{dip_id}"
  params:
    - name: dip_id
      type: integer
      description: DIP switch number (1-8)

- id: set_eth_port
  label: Set Ethernet Port Protocol
  kind: action
  command: "#ETH-PORT{port_type},{port_id}"
  params:
    - name: port_type
      type: integer
      description: "0=TCP, 1=UDP"
    - name: port_id
      type: integer
      description: TCP/UDP port number (2000-65535)

- id: get_eth_port
  label: Get Ethernet Port Protocol
  kind: query
  command: "#ETH-PORT?{port_type}"
  params:
    - name: port_type
      type: integer
      description: "0=TCP, 1=UDP"

- id: factory_reset
  label: Factory Reset
  kind: action
  command: "#FACTORY"
  params: []

- id: get_fpga_version
  label: Get FPGA Version
  kind: query
  command: "#FPGA-VER?{fpga_id}"
  params:
    - name: fpga_id
      type: integer
      description: FPGA id (e.g. 1)

- id: get_edid_support
  label: Get EDID Support
  kind: query
  command: "#GEDID{io_mode},{in_index}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output, 2=Default EDID"
    - name: in_index
      type: integer
      description: Input number (1-8)

- id: set_hdcp_mode
  label: Set HDCP Mode
  kind: action
  command: "#HDCP-MOD{in_index},{mode}"
  params:
    - name: in_index
      type: integer
      description: Input number (1-8)
    - name: mode
      type: integer
      description: "0=HDCP Off, 1=HDCP On"

- id: get_hdcp_mode
  label: Get HDCP Mode
  kind: query
  command: "#HDCP-MOD?{in_index}"
  params:
    - name: in_index
      type: integer
      description: Input number (1-8)

- id: get_hdcp_status
  label: Get HDCP Signal Status
  kind: query
  command: "#HDCP-STAT?{io_mode},{io_index}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-8)

- id: get_command_list
  label: Get Command List or Command Help
  kind: query
  command: "#HELP"
  params: []

- id: visual_identification
  label: Visual Identification
  kind: action
  command: "#IDV"
  params: []

- id: get_info_io
  label: Get Input/Output Count
  kind: query
  command: "#INFO-IO?"
  params: []

- id: get_info_prst
  label: Get Maximum Preset Count
  kind: query
  command: "#INFO-PRST?"
  params: []

- id: set_label
  label: Set Input/Output Label
  kind: action
  command: "#LABEL{io_mode},{io_index},{switch},{label_txt}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-8)
    - name: switch
      type: integer
      description: "0=off (disable custom label), 1=on (enable custom label)"
    - name: label_txt
      type: string
      description: Custom label string

- id: get_label
  label: Get Input/Output Label
  kind: query
  command: "#LABEL?{io_mode},{io_index}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-8)

- id: load_file
  label: Load File to Device
  kind: action
  command: "#LOAD{file_name},{size}"
  params:
    - name: file_name
      type: string
      description: Name of file to save on device
    - name: size
      type: integer
      description: Size of file data to send (bytes)

- id: set_front_panel_lock
  label: Lock/Unlock Front Panel
  kind: action
  command: "#LOCK-FP{lock}"
  params:
    - name: lock
      type: integer
      description: "0=Unlock, 1=Lock"

- id: get_front_panel_lock
  label: Get Front Panel Lock State
  kind: query
  command: "#LOCK-FP?"
  params: []

- id: login
  label: Set Protocol Permission Level
  kind: action
  command: "#LOGIN{login_level},{password}"
  params:
    - name: login_level
      type: string
      description: "User or Admin"
    - name: password
      type: string
      description: Password string

- id: get_login_level
  label: Get Current Protocol Permission Level
  kind: query
  command: "#LOGIN?"
  params: []

- id: logout
  label: Cancel Permission Level
  kind: action
  command: "#LOGOUT"
  params: []

- id: get_model
  label: Get Device Model
  kind: query
  command: "#MODEL?"
  params: []

- id: set_mtx_mode
  label: Set Auto-Switch Mode (Legacy)
  kind: action
  command: "#MTX-MODE{out_id},{connection_mode}"
  params:
    - name: out_id
      type: string
      description: Output number (1-8, or *=all)
    - name: connection_mode
      type: integer
      description: "0=manual, 1=auto priority, 2=auto last connected"

- id: get_mtx_mode
  label: Get Auto-Switch Mode (Legacy)
  kind: query
  command: "#MTX-MODE?{out_id}"
  params:
    - name: out_id
      type: string
      description: Output number (1-8)

- id: set_machine_name
  label: Set Machine DNS Name
  kind: action
  command: "#NAME{machine_name}"
  params:
    - name: machine_name
      type: string
      description: Up to 14 alphanumeric chars (hyphen allowed, not at start/end)

- id: get_machine_name
  label: Get Machine DNS Name
  kind: query
  command: "#NAME?"
  params: []

- id: machine_name_reset
  label: Reset Machine DNS Name
  kind: action
  command: "#NAME-RST"
  params: []

- id: set_net_dhcp
  label: Set DHCP Mode
  kind: action
  command: "#NET-DHCP{dhcp_state}"
  params:
    - name: dhcp_state
      type: integer
      description: "1=Try DHCP (only 1 is relevant for the mode value)"

- id: get_net_dhcp
  label: Get DHCP Mode
  kind: query
  command: "#NET-DHCP?"
  params: []

- id: set_net_gateway
  label: Set Gateway IP
  kind: action
  command: "#NET-GATE{ip_address}"
  params:
    - name: ip_address
      type: string
      description: Format xxx.xxx.xxx.xxx

- id: get_net_gateway
  label: Get Gateway IP
  kind: query
  command: "#NET-GATE?"
  params: []

- id: set_net_ip
  label: Set IP Address
  kind: action
  command: "#NET-IP{ip_address}"
  params:
    - name: ip_address
      type: string
      description: Format xxx.xxx.xxx.xxx

- id: get_net_ip
  label: Get IP Address
  kind: query
  command: "#NET-IP?"
  params: []

- id: get_net_mac
  label: Get MAC Address
  kind: query
  command: "#NET-MAC?"
  params: []

- id: set_net_mask
  label: Set Subnet Mask
  kind: action
  command: "#NET-MASK{net_mask}"
  params:
    - name: net_mask
      type: string
      description: Format xxx.xxx.xxx.xxx

- id: get_net_mask
  label: Get Subnet Mask
  kind: query
  command: "#NET-MASK?"
  params: []

- id: set_password
  label: Set Password for Login Level
  kind: action
  command: "#PASS{login_level},{password}"
  params:
    - name: login_level
      type: integer
      description: "0=User, 1=Admin"
    - name: password
      type: string
      description: Password up to 15 printable ASCII chars

- id: get_password
  label: Get Password for Login Level
  kind: query
  command: "#PASS?{login_level}"
  params:
    - name: login_level
      type: integer
      description: "0=User, 1=Admin"

- id: get_prog_action
  label: Get Step-In Button Action Bitmap
  kind: query
  command: "#PROG-ACTION?{port_type},{port_id},{button_id}"
  params:
    - name: port_type
      type: integer
      description: "0=Input"
    - name: port_id
      type: integer
      description: Input number (1-8)
    - name: button_id
      type: integer
      description: External programmable button ID

- id: get_prot_ver
  label: Get Device Protocol Version
  kind: query
  command: "#PROT-VER?"
  params: []

- id: get_prst_aud
  label: Get Audio Connections from Saved Preset
  kind: query
  command: "#PRST-AUD?{preset},{out}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)
    - name: out
      type: string
      description: Output number (1-8, or *=all)

- id: get_prst_lst
  label: Get Saved Preset List
  kind: query
  command: "#PRST-LST?"
  params: []

- id: preset_recall
  label: Recall Saved Preset
  kind: action
  command: "#PRST-RCL{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)

- id: preset_store
  label: Store Preset
  kind: action
  command: "#PRST-STO{preset}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)

- id: get_prst_vid
  label: Get Video Connections from Saved Preset
  kind: query
  command: "#PRST-VID?{preset},{out_id}"
  params:
    - name: preset
      type: integer
      description: Preset number (1-16)
    - name: out_id
      type: string
      description: Output number (1-8, or *=all)

- id: get_remote_info
  label: Get Connected Step-In Module Information
  kind: query
  command: "#REMOTE-INFO?{io_mode},{io_index}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-8)

- id: reset_device
  label: Reset Device
  kind: action
  command: "#RESET"
  params: []

- id: set_security
  label: Enable/Disable Security
  kind: action
  command: "#SECUR{security_state}"
  params:
    - name: security_state
      type: integer
      description: "0=OFF, 1=ON"

- id: get_security
  label: Get Current Security State
  kind: query
  command: "#SECUR?"
  params: []

- id: set_in_cap
  label: Set Input EDID Status
  kind: action
  command: "#SET-IN-CAP{stage},{stage_id},{mode}"
  params:
    - name: stage
      type: integer
      description: "0=Input"
    - name: stage_id
      type: integer
      description: "0=Color Space, 1=Color Depth, 2=Two Audio Channels"
    - name: mode
      type: integer
      description: "0=Pass, 1=Set"

- id: get_in_cap
  label: Get Input EDID Status
  kind: query
  command: "#SET-IN-CAP?{stage},{stage_id}"
  params:
    - name: stage
      type: integer
      description: "0=Input"
    - name: stage_id
      type: integer
      description: "0=Color Space, 1=Color Depth, 2=Two Audio Channels"

- id: get_signal_status
  label: Get Input Signal Status
  kind: query
  command: "#SIGNAL?{in_index}"
  params:
    - name: in_index
      type: integer
      description: Input number (1-8)

- id: get_signal_type
  label: Get Signal Type on Input/Output
  kind: query
  command: "#SIG-TYPE?{io_mode},{io_index}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-8)

- id: get_serial_number
  label: Get Device Serial Number
  kind: query
  command: "#SN?"
  params: []

- id: tunnel_ctrl
  label: Send Async Command to Step-In Client (Legacy)
  kind: action
  command: "#TUNNEL-CTRL{io_mode},{io_index},{cmd_name}"
  params:
    - name: io_mode
      type: integer
      description: "0=Input, 1=Output"
    - name: io_index
      type: integer
      description: Port number (1-N, N depends on total ports)
    - name: cmd_name
      type: string
      description: Command to send to the Step-in client

- id: set_uart
  label: Set COM Port Configuration
  kind: action
  command: "#UART{com_id},{baud_rate},{data_bits},{parity},{stop_bits_mode},{serial_type},{term_485}"
  params:
    - name: com_id
      type: integer
      description: COM port ID (1 to n, machine dependent)
    - name: baud_rate
      type: integer
      description: "9600-115200"
    - name: data_bits
      type: integer
      description: "5-8"
    - name: parity
      type: integer
      description: "0=None, 1=Odd, 2=Even, 3=Mark, 4=Space"
    - name: stop_bits_mode
      type: number
      description: "1, 1.5, or 2"
    - name: serial_type
      type: integer
      description: "0=RS-232, 1=RS-485"
    - name: term_485
      type: integer
      description: "0=disable, 1=enable (RS-485 only)"

- id: get_uart
  label: Get COM Port Configuration
  kind: query
  command: "#UART?{com_id}"
  params:
    - name: com_id
      type: integer
      description: COM port ID (1 to n)

- id: get_version
  label: Get Firmware Version
  kind: query
  command: "#VERSION?"
  params: []

- id: set_video_pattern
  label: Set Test Pattern on Output
  kind: action
  command: "#VID-PATTERN{out_index},{pattern_id}"
  params:
    - name: out_index
      type: integer
      description: Output number (1-8)
    - name: pattern_id
      type: integer
      description: "1=Color bars, 2=Ramp, 3=Solid White, 4=Solid Black, 5=Solid Red, 6=Solid Green"

- id: get_video_pattern
  label: Get Test Pattern on Output
  kind: query
  command: "#VID-PATTERN?{out_index}"
  params:
    - name: out_index
      type: integer
      description: Output number (1-8)

- id: set_video_mute
  label: Set Video Mute
  kind: action
  command: "#VMUTE{out_index},{flag}"
  params:
    - name: out_index
      type: integer
      description: Output number (1-8)
    - name: flag
      type: integer
      description: "0=Video enabled, 1=Video disabled, 2=Blank picture (not supported on this device)"

- id: get_video_mute
  label: Get Video Mute Status
  kind: query
  command: "#VMUTE?{out_index}"
  params:
    - name: out_index
      type: integer
      description: Output number (1-8)
```

## Feedbacks
```yaml
- id: handshake_feedback
  type: string
  values: ["~NN@ok"]
  description: Handshake response format

- id: error_response
  type: enum
  values:
    - "~NN@ERR 001"  # Protocol syntax
    - "~NN@ERR 002"  # Command not available
    - "~NN@ERR 003"  # Parameter out of range
    - "~NN@ERR 004"  # Unauthorized access
    - "~NN@ERR 005"  # Internal FW error
    - "~NN@ERR 006"  # Protocol busy
    - "~NN@ERR 007"  # Wrong CRC
    - "~NN@ERR 008"  # Timeout
    - "~NN@ERR 010"  # Not enough space for data (firmware/FPGA)
    - "~NN@ERR 011"  # Not enough space - file system
    - "~NN@ERR 012"  # File does not exist
    - "~NN@ERR 013"  # File can't be created
    - "~NN@ERR 014"  # File can't open
    - "~NN@ERR 015"  # Feature not supported
    - "~NN@ERR 021"  # Packet CRC error
    - "~NN@ERR 022"  # Packet number not expected (missing)
    - "~NN@ERR 023"  # Packet size wrong
    - "~NN@ERR 030"  # EDID corrupted
    - "~NN@ERR 031"  # Device specific errors
    - "~NN@ERR 032"  # File has same CRC - no change
    - "~NN@ERR 033"  # Wrong operation mode
    - "~NN@ERR 034"  # Device/chip not initialized

- id: afv_mode
  type: enum
  values: [0, 1]
  description: "0=afv (audio follows video), 1=brk (audio breakaway)"

- id: routing_state
  type: string
  description: "~NN@AV,<in>out_id" feedback format for routing state queries

- id: baud_rate
  type: integer
  description: Current baud rate (9600 or 115200)

- id: build_date
  type: string
  description: "Format YYYY/MM/DD,hh:mm:ss"

- id: video_signal_status
  type: enum
  values: [0, 1]
  description: "0=Off, 1=On"

- id: display_status
  type: enum
  values: [0, 1, 2]
  description: "0=Signal/sink not valid, 1=Signal/sink valid, 2=Sink and EDID valid"

- id: hdcp_mode
  type: enum
  values: [0, 1]
  description: "0=HDCP Off, 1=HDCP On"

- id: hdcp_signal_status
  type: enum
  values: [0, 1]
  description: "0=HDCP Off, 1=HDCP On"

- id: video_mute_status
  type: enum
  values: [0, 1, 2]
  description: "0=Video enabled, 1=Video disabled, 2=Blank picture"

- id: video_pattern
  type: enum
  values: [1, 2, 3, 4, 5, 6]
  description: "1=Color bars, 2=Ramp, 3=Solid White, 4=Solid Black, 5=Solid Red, 6=Solid Green"

- id: front_panel_lock
  type: enum
  values: [0, 1]
  description: "0=Unlocked, 1=Locked"

- id: login_status
  type: string
  description: Current permission level (User, Admin)

- id: security_status
  type: enum
  values: [0, 1]
  description: "0=Security OFF, 1=Security ON"

- id: machine_name
  type: string
  description: DNS name string (up to 14 alpha-numeric chars, hyphen allowed not at start/end)

- id: ip_address
  type: string
  description: IP address in xxx.xxx.xxx.xxx format

- id: subnet_mask
  type: string
  description: Subnet mask in xxx.xxx.xxx.xxx format

- id: gateway_ip
  type: string
  description: Gateway IP in xxx.xxx.xxx.xxx format

- id: dhcp_mode
  type: enum
  values: [0, 1]
  description: "0=Static IP, 1=DHCP"

- id: mac_address
  type: string
  description: MAC address in XX-XX-XX-XX-XX-XX format

- id: eth_port_protocol
  type: object
  properties:
    port_type: integer
    port_id: integer

- id: uart_config
  type: object
  properties:
    baud_rate: integer
    data_bits: integer
    parity: integer
    stop_bits: number
    serial_type: integer

- id: signal_type
  type: enum
  values: [0, 2]
  description: "0=No signal, 2=HDMI"

- id: label_state
  type: object
  properties:
    switch: integer
    label_txt: string

- id: serial_number
  type: string
  description: 14 decimal digits, factory assigned

- id: model_name
  type: string
  description: Up to 19 printable ASCII chars

- id: firmware_version
  type: string
  description: Format XX.XX.XXXX (major.minor.build)

- id: fpga_version
  type: object
  properties:
    expected_ver: string
    ver: string

- id: protocol_version
  type: string
  description: Format XX.XX (Protocol 3000)

- id: input_output_count
  type: object
  properties:
    in_count: integer
    out_count: integer

- id: preset_info
  type: object
  properties:
    video_preset_count: integer
    audio_preset_count: integer

- id: preset_list
  type: string
  description: Comma-separated preset numbers

- id: preset_video_connections
  type: string
  description: "Video routing state for preset (preset,in>out,...)"

- id: preset_audio_connections
  type: string
  description: "Audio routing state for preset (preset,in>out,...)"

- id: dip_switch_state
  type: enum
  values: [0, 1]
  description: "0=Up, 1=Down"

- id: edid_support
  type: object
  properties:
    size: integer
  description: Size of EDID data; 0 means no EDID support

- id: in_cap
  type: enum
  values: [0, 1]
  description: "0=Pass, 1=Set"

- id: remote_info
  type: object
  description: Step-in module information including connected_state, model_name, in_selected, step-in_state, in_count, cntl_btn_count, in_src1..N

- id: prog_action
  type: string
  description: Bitmap of programmed actions (bit 0=Echo to controller, bits 1-8=Step-in out 1-8)

- id: device_model
  type: string
  description: Device model name

- id: file_list
  type: string
  description: Multi-line file listing with TAB-separated file_name, size, id, free_size

- id: command_list
  type: string
  description: List of available commands from HELP command

- id: auto_switch_mode
  type: enum
  values: [0, 1, 2]
  description: "0=manual, 1=auto priority, 2=auto last connected"
```

## Variables
```yaml
# UNRESOLVED: all configuration items use action/feedback pairs; no standalone variables
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - factory_reset
  - reset_device
interlocks: []
# FACTORY deletes all user data and may require power cycle; RESET may lock USB port on Windows (disconnect USB immediately after to avoid)
```

## Notes
The VS-88H2 is an 8x8 HDMI matrix switcher using Kramer Protocol 3000. Commands are ASCII-based with `#` prefix for send, `~NN@` prefix for responses. Device ID defaults to 01. Serial default is 115200 8N1; Ethernet supports TCP and UDP on ports 2000-65535. Security subsystem (LOGIN/PASS/SECUR) is optional and disabled by default. Factory default baud rate is 115200. Multiple commands can be chained in a single string using `|` as a delimiter. Multiple parameter groupings inside a single command can be wrapped in `[ ]` brackets. The document covers the VS-88H2 as the reference model; other Kramer matrix switchers using Protocol 3000 are likely compatible.
<!-- UNRESOLVED: TCP/UDP default port not stated; unsolicited events not described; specific model compatibility beyond VS-88H2 not verified -->

## Provenance

```yaml
source_domains:
  - cdn.kramerav.com
source_urls:
  - https://cdn.kramerav.com/web/downloads/manuals/kramer-vs-88h2-protocol-commands-um-1.pdf
retrieved_at: 2026-06-12T02:50:54.653Z
last_checked_at: 2026-06-12T19:22:53.101Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-12T19:22:53.101Z
matched_actions: 81
action_count: 81
confidence: medium
summary: "All 81 spec action units have exact wire-literal matches in the source command table; transport parameters (baud 115200, serial, tcp/udp, port range 2000-65535) are confirmed; source catalogue is fully covered by the spec. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "TCP/UDP default port not stated; firmware version not stated; default device ID is 01 but the user is expected to override per device; specific model compatibility beyond VS-88H2 not verified"
- "TCP/UDP default port not stated in source (ETH-PORT range is 2000-65535)"
- "all configuration items use action/feedback pairs; no standalone variables"
- "no unsolicited notifications described in source"
- "no explicit multi-step macro sequences described in source"
- "TCP/UDP default port not stated; unsolicited events not described; specific model compatibility beyond VS-88H2 not verified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
