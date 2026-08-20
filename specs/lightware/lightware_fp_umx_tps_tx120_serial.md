---
spec_id: admin/lightware-fp-umx-tps-tx120
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware FP-UMX-TPS-TX120 Control Spec"
manufacturer: Lightware
model_family: FP-UMX-TPS-TX120
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - FP-UMX-TPS-TX120
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
retrieved_at: 2026-08-11T09:46:43.951Z
last_checked_at: 2026-08-19T09:30:07.196Z
generated_at: 2026-08-19T09:30:07.196Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "EVENTS/E<loc>.ConditionEndCheck"
  - "EVENTS/E<loc>.ConditionTimeoutContinuous"
  - "EVENTS/E<loc>.ConditionTimeoutPending"
  - "EVENTS/E<loc>.ConditionDetect"
  - "OPEN /MEDIA/VIDEO"
  - "CLOSE /MEDIA/VIDEO"
  - "/MEDIA/UART/<port>.CommandInjectionStatus"
  - "{GPIO<pin_nr>=<dir>;<level>}"
  - "source is a multi-model family manual; per-variant applicability of some commands (Macros, Variables, GPIO, CEC, HTTP, Cleartext Login, Wake-on-LAN, Message Recognizers, MAC filter, port blocking, hostname) is gated by firmware version, model suffix (-130/-140/-140K/-140-Plus/FP-/WP-) and is not always called out for the FP-UMX-TPS-TX120 specifically. Treat all conditional features as UNRESOLVED for this base spec."
  - "source does not document flow-control explicitly"
  - "source has no dedicated power-on / power-off command for FP-UMX-TPS-TX120; only reboot / factory-reset"
  - "source contains a CE/CEC safety note about ordering transmission but does not"
  - "- Specific applicability of optional features to the FP-UMX-TPS-TX120 sub-model not always stated in source; many are explicitly listed for TX140K / TX140-Plus / WP-130-Plus-US only."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:30:07.196Z
  matched_actions: 184
  action_count: 184
  confidence: medium
  summary: "All 184 spec actions match source verbatim; transport parameters (port 10001/6107, baud 9600 8N1, IP 192.168.0.100) confirmed; coverage ratio well above 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware FP-UMX-TPS-TX120 Control Spec

## Summary
The Lightware FP-UMX-TPS-TX120 is a wall-plate / FP-series HDBaseT-class TPS transmitter in the UMX-TPS-TX100 family. It exposes VGA, HDMI, and Autoselect video inputs; analog + embedded digital audio inputs; and a 3-pole Phoenix RS-232 serial port plus RJ45 Ethernet (TPS + LAN). Control is via two ASCII protocols — the legacy Lightware LW2 command set over TCP port 10001, and the modern tree-structured Lightware LW3 protocol over TCP port 6107 — both also accessible over the local RS-232 port when set to Control mode. This spec covers both LW2 and LW3 command catalogues as documented in the source user manual.

<!-- UNRESOLVED: source is a multi-model family manual; per-variant applicability of some commands (Macros, Variables, GPIO, CEC, HTTP, Cleartext Login, Wake-on-LAN, Message Recognizers, MAC filter, port blocking, hostname) is gated by firmware version, model suffix (-130/-140/-140K/-140-Plus/FP-/WP-) and is not always called out for the FP-UMX-TPS-TX120 specifically. Treat all conditional features as UNRESOLVED for this base spec. -->

## Transport
```yaml
# Two control interfaces are documented in source:
#   - RS-232 (3-pole Phoenix, Control protocol selectable LW2 or LW3)
#   - TCP (LW2 default port 10001, LW3 default port 6107)
# Default static IP per source: 192.168.0.100. Default RS-232 settings per source: 9600, 8N1 (mirrored on LDC example "COM1:57600").
# No login is required by default; Cleartext Login (LOGIN:login) is an OPTIONAL feature gated to TX140K / TX140-Plus / WP-UMX-TPS-TX130-Plus-US models, NOT the FP-UMX-TPS-TX120.
protocols:
  - serial
  - tcp
addressing:
  port: 10001  # LW2 default port per source (LW3 default port 6107 also stated)
serial:
  baud_rate: 9600  # source example shows 9600 as default; 57600, 4800, 7200, 14400, 19200, 38400, 115200 also supported
  data_bits: 8  # source: data bits 8 or 9
  parity: none  # source parity options: none / odd / even
  stop_bits: 1  # source stop bit options: 1, 1.5, 2
  flow_control: none  # UNRESOLVED: source does not document flow-control explicitly
auth:
  type: none  # inferred: no auth procedure in source for FP-UMX-TPS-TX120 (Cleartext Login is a separately gated optional feature)
```

## Traits
```yaml
# Derived from source evidence:
# - powerable       inferred (RST/FACTORY/reset exist; device supports reboot; no explicit "power on/off" command, but SYS:reset / SYS:factoryDefaults restart the unit)
# - routable        inferred from video / audio crosspoint switch commands (XP:switch, mute/unmute, lock/unlock, autoselect, priority)
# - queryable       inferred from extensive GET-style queries (product name, serial, firmware, port status, crosspoint state, IP status, etc.)
# - levelable       inferred from analog audio SET /MEDIA/AUDIO/<in>.Volume (level) and .Balance (level)
# - lockable        inferred from ControlLock, lockSource/lockDestination commands
powerable: false  # UNRESOLVED: source has no dedicated power-on / power-off command for FP-UMX-TPS-TX120; only reboot / factory-reset
routable: true   # inferred from crosspoint / switch commands
queryable: true  # inferred from query commands returning state
levelable: true  # inferred from analog audio Volume/Balance SETs
```

## Actions
```yaml
# Format guide:
#   kind: action  → method-style command
#   kind: query   → GET-style command (returns state)
#   kind: set     → SET-style command (writes property)
#   command:      → literal payload verbatim from source, parameterized parts shown as {name}
#
# Both LW2 ({...} CrLf on TCP 10001) and LW3 (CALL/SET/GET /node.method CrLf on TCP 6107 or RS-232) are documented.
# LW3 actions use the explicit ASCII syntax from §7.

# ───────────────────────── LW2 - General (TCP 10001) ─────────────────────────
- id: lw2_list_commands
  label: LW2 List All Available Commands
  kind: action
  command: "{lcmd}\r\n"  # literal from §6.3.1
  params: []

- id: lw2_view_product_type
  label: LW2 Viewing Product Type
  kind: query
  command: "{i}\r\n"
  params: []

- id: lw2_query_device_label
  label: LW2 Querying the Device Label
  kind: query
  command: "{label}\r\n"
  params: []

- id: lw2_query_control_protocol
  label: LW2 Querying the Control Protocol
  kind: query
  command: "{P_?}\r\n"
  params: []

- id: lw2_view_firmware_version
  label: LW2 Viewing Firmware Version of the CPU
  kind: query
  command: "{F}\r\n"
  params: []

- id: lw2_connection_test
  label: LW2 Connection Test
  kind: action
  command: "{PING}\r\n"
  params: []

- id: lw2_compile_time
  label: LW2 Compile Time
  kind: query
  command: "{CT}\r\n"
  params: []

- id: lw2_view_serial_number
  label: LW2 Viewing Serial Number
  kind: query
  command: "{S}\r\n"
  params: []

- id: lw2_view_installed_boards
  label: LW2 Viewing the Installed Boards
  kind: query
  command: "{IS}\r\n"
  params: []

- id: lw2_view_firmware_controllers
  label: LW2 Viewing Firmware for All Controllers
  kind: query
  command: "{FC}\r\n"
  params: []

- id: lw2_query_health_status
  label: LW2 Querying Health Status
  kind: query
  command: "{ST}\r\n"
  params: []

- id: lw2_restart_device
  label: LW2 Restarting the Device
  kind: action
  command: "{RST}\r\n"
  params: []

- id: lw2_factory_defaults
  label: LW2 Restoring Factory Default Settings
  kind: action
  command: "{FACTORY=ALL}\r\n"
  params: []

# ───────────────────────── LW2 - AV Port Settings ─────────────────────────
- id: lw2_switch_input_to_output
  label: LW2 Switching an Input to the Outputs
  kind: action
  command: "{<in>@<out> <layer>}\r\n"  # <layer> ∈ A / V / AV
  params:
    - {name: in, type: integer, description: Input port number (1- or 2-digit ASCII; 0 = disconnect)}
    - {name: out, type: integer, description: Output port number (1- or 2-digit ASCII)}
    - {name: layer, type: string, description: "A (audio), V (video), AV (both), or omit for legacy"}

- id: lw2_mute_output
  label: LW2 Muting an Output
  kind: action
  command: "{#<out> <layer>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_unmute_output
  label: LW2 Unmuting an Output
  kind: action
  command: "{+<out> <layer>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_lock_output
  label: LW2 Locking an Output
  kind: action
  command: "{#> <out> <layer>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_unlock_output
  label: LW2 Unlocking an Output
  kind: action
  command: "{+< <out> <layer>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_view_connection_state
  label: LW2 Viewing Connection State on the Output
  kind: query
  command: "{VC <layer>}\r\n"
  params:
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_view_crosspoint_size
  label: LW2 Viewing the Crosspoint Size
  kind: query
  command: "{getsize <layer>}\r\n"
  params:
    - {name: layer, type: string, description: "A, V, or AV"}

- id: lw2_change_video_autoselect
  label: LW2 Changing the Video Autoselect Mode
  kind: action
  command: "{AS_V<out>=<state>;<mode>}\r\n"  # state ∈ E/D, mode ∈ F/L/P
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: state, type: string, description: "E (enabled) or D (disabled)"}
    - {name: mode, type: string, description: "F (First detect), L (Last detect), P (Priority detect)"}

- id: lw2_change_audio_autoselect
  label: LW2 Changing the Audio Autoselect Mode
  kind: action
  command: "{AS_A<out>=<state>;<mode>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: state, type: string, description: "E (enabled) or D (disabled)"}
    - {name: mode, type: string, description: "F, L, or P"}

- id: lw2_change_video_input_priorities
  label: LW2 Changing the Video Input Priorities
  kind: action
  command: "{PRIO_V<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}\r\n"  # prio 0-5, 31 (skip)
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: priorities, type: string, description: Semicolon-separated priority list per input (0=highest .. 5=lowest, 31=skip)"}

- id: lw2_change_audio_input_priorities
  label: LW2 Changing the Audio Input Priorities
  kind: action
  command: "{PRIO_A<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}\r\n"
  params:
    - {name: out, type: integer, description: Output port number}
    - {name: priorities, type: string, description: Semicolon-separated priority list per input"}

# ───────────────────────── LW2 - Network Configuration ─────────────────────────
- id: lw2_query_ip_status
  label: LW2 Querying the Current IP Status
  kind: query
  command: "{IP_STAT=?}\r\n"
  params: []

- id: lw2_set_ip_address
  label: LW2 Setting the IP Address
  kind: action
  command: "{IP_ADDRESS=<type>;<ip_address>}\r\n"  # type 0=static, 1=dynamic
  params:
    - {name: type, type: integer, description: "0 (static) or 1 (DHCP)"}
    - {name: ip_address, type: string, description: IPv4 address, dot-separated octets}

- id: lw2_set_subnet_mask
  label: LW2 Setting the Subnet Mask
  kind: action
  command: "{IP_NETMASK=<subnet_mask>}\r\n"
  params:
    - {name: subnet_mask, type: string, description: IPv4 dot-decimal subnet mask}

- id: lw2_set_gateway
  label: LW2 Setting the Gateway Address
  kind: action
  command: "{IP_GATEWAY=<gateway_addr>}\r\n"
  params:
    - {name: gateway_addr, type: string, description: IPv4 dot-decimal gateway address}

- id: lw2_apply_network_settings
  label: LW2 Applying Network Settings
  kind: action
  command: "{ip_apply}\r\n"
  params: []

- id: lw2_ethernet_enable
  label: LW2 Enabling/Disabling the Ethernet Port
  kind: action
  command: "{ETH_ENABLE=<switch>}\r\n"  # 0=disabled, 1=enabled
  params:
    - {name: switch, type: integer, description: "0 (disable) or 1 (enable)"}

# ───────────────────────── LW2 - RS-232 Settings ─────────────────────────
- id: lw2_set_rs232_mode
  label: LW2 Setting the RS-232 Mode
  kind: action
  command: "{RS232=<mode>}\r\n"  # CONTROL / CI / PASS
  params:
    - {name: mode, type: string, description: "CONTROL (Control mode), CI (Command injection), PASS (Pass-through / Event Manager)"}

- id: lw2_set_rs232_local_format
  label: LW2 Setting the RS-232 Local Parameters
  kind: action
  command: "{RS232_LOCAL_FORMAT=<BaudRate>;<DataBit>;<Parity>;<StopBit>}\r\n"
  params:
    - {name: baud, type: integer, description: "4800 / 7200 / 9600 / 14400 / 19200 / 38400 / 57600 / 115200 (X = no change)"}
    - {name: databits, type: integer, description: "8 / 9 (X = no change)"}
    - {name: parity, type: string, description: "N / E / O (X = no change)"}
    - {name: stopbits, type: string, description: "1 / 1,5 / 2 (X = no change)"}

- id: lw2_set_rs232_local_protocol
  label: LW2 Setting the Control Protocol of the RS-232 Port
  kind: action
  command: "{RS232_LOCAL_PROT=<protocol>}\r\n"  # LW2 / LW3
  params:
    - {name: protocol, type: string, description: "LW2 or LW3"}

- id: lw2_set_rs232_link_format
  label: LW2 Setting the Format of the Serial Link Port
  kind: action
  command: "{RS232_LINK_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}\r\n"
  params:
    - {name: baud, type: integer, description: Baud rate or X (no change)"}
    - {name: databits, type: integer, description: Data bits or X (no change)"}
    - {name: parity, type: string, description: Parity (N/E/O) or X (no change)"}
    - {name: stopbits, type: string, description: Stop bits (1/1,5/2) or X (no change)"}

- id: lw2_set_rs232_link_protocol
  label: LW2 Setting the Protocol of the Serial Link Port
  kind: action
  command: "{RS232_LINK_PROT=<protocol>}\r\n"
  params:
    - {name: protocol, type: string, description: "LW2 or LW3"}

# ───────────────────────── LW3 - System Commands ─────────────────────────
- id: lw3_get_product_name
  label: LW3 Querying the Product Name
  kind: query
  command: "GET /.ProductName\r\n"
  params: []

- id: lw3_set_device_label
  label: LW3 Setting the Device Label
  kind: set
  command: "SET /MANAGEMENT/UID.DeviceLabel={label}\r\n"
  params:
    - {name: label, type: string, description: ASCII label, max 39 chars}

- id: lw3_get_serial_number
  label: LW3 Querying the Serial Number
  kind: query
  command: "GET /.SerialNumber\r\n"
  params: []

- id: lw3_get_firmware_version
  label: LW3 Querying the Firmware Version
  kind: query
  command: "GET /SYS/MB.FirmwareVersion\r\n"
  params: []

- id: lw3_reset_device
  label: LW3 Resetting the Device
  kind: action
  command: "CALL /SYS:reset()\r\n"
  params: []

- id: lw3_factory_defaults
  label: LW3 Restoring the Factory Default Settings
  kind: action
  command: "CALL /SYS:factoryDefaults()\r\n"
  params: []

- id: lw3_control_lock
  label: LW3 Locking the Front Panel Buttons
  kind: set
  command: "SET /MANAGEMENT/UI.ControlLock={lock_status}\r\n"  # 1=None, 2=Locked, 3=Force locked
  params:
    - {name: lock_status, type: integer, description: "1 (None), 2 (Locked), 3 (Force locked)"}

- id: lw3_button_default_function
  label: LW3 Setting the Default Function of the Front Panel Buttons
  kind: set
  command: "SET /MANAGEMENT/UI/BUTTONS/{btn_id}.DefaultFunctionEnable={btn_status}\r\n"  # btn_id ∈ B1/B2/B2(Show me), btn_status ∈ Enable/Disable
  params:
    - {name: btn_id, type: string, description: "B1 (Video select), B2 (Audio select), B2 (Show me)"}
    - {name: btn_status, type: string, description: "Enable or Disable"}

- id: lw3_dark_mode
  label: LW3 Dark Mode
  kind: set
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeEnable={status}\r\n"
  params:
    - {name: status, type: string, description: "true (enabled) or false (disabled)"}

- id: lw3_dark_mode_delay
  label: LW3 Dark Mode Delay
  kind: set
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeDelay={delay_time}\r\n"
  params:
    - {name: delay_time, type: integer, description: Delay in seconds}

- id: lw3_run_macro
  label: LW3 Running a Macro
  kind: action
  command: "CALL /CTRL/MACROS:run({macro_name})\r\n"
  params:
    - {name: macro_name, type: string, description: Name of the macro to run"}

# ───────────────────────── LW3 - Video Port Settings ─────────────────────────
- id: lw3_video_source_port_status
  label: LW3 Querying the Status of Source Ports (Video)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus\r\n"
  params: []

- id: lw3_video_destination_port_status
  label: LW3 Querying the Status of Destination Port (Video)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortStatus\r\n"
  params: []

- id: lw3_video_crosspoint
  label: LW3 Querying the Video Crosspoint Setting
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList\r\n"
  params: []

- id: lw3_video_disconnect_input
  label: LW3 Disconnecting the Video Inputs
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(0:{out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_switch_input
  label: LW3 Switching a Video Input
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch({in}:{out})\r\n"
  params:
    - {name: in, type: string, description: Input port (e.g. I1..I6)"}
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_connected_source
  label: LW3 Querying the Connected Input Port Number
  kind: query
  command: "GET /MEDIA/VIDEO/{out}.ConnectedSource\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_autoselect_query
  label: LW3 Querying the Video Autoselect Settings
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect\r\n"
  params: []

- id: lw3_video_autoselect_set
  label: LW3 Changing the Autoselect Mode (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect({out1_set})\r\n"  # 2-letter codes, e.g. O1:EP, O1:D
  params:
    - {name: out1_set, type: string, description: Semicolon-separated O#:XY pairs, where X ∈ {E,D}, Y ∈ {F,P,L}"}

- id: lw3_video_priority_query
  label: LW3 Querying the Input Port Priority (Video)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.PortPriorityList\r\n"
  params: []

- id: lw3_video_priority_set
  label: LW3 Changing the Input Port Priority (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setAutoselectionPriority({pairs})\r\n"  # I1\(O1\):4;I2\(O1\):4
  params:
    - {name: pairs, type: string, description: "Semicolon-separated I#\\(O#\\):<prio> pairs (0..31, 31=skip)"}

- id: lw3_video_mute_source
  label: LW3 Muting an Input Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource({in})\r\n"
  params:
    - {name: in, type: string, description: Input port, multiple inputs separated by ';'}

- id: lw3_video_unmute_source
  label: LW3 Unmuting an Input Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteSource({in})\r\n"
  params:
    - {name: in, type: string, description: Input port, multiple inputs separated by ';'}

- id: lw3_video_lock_source
  label: LW3 Locking an Input Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockSource({in})\r\n"
  params:
    - {name: in, type: string, description: Input port, multiple inputs separated by ';'}

- id: lw3_video_unlock_source
  label: LW3 Unlocking an Input Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockSource({in})\r\n"
  params:
    - {name: in, type: string, description: Input port, multiple inputs separated by ';'}

- id: lw3_video_mute_destination
  label: LW3 Muting an Output Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_unmute_destination
  label: LW3 Unmuting an Output Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_lock_destination
  label: LW3 Locking an Output Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_unlock_destination
  label: LW3 Unlocking an Output Port (Video)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_video_hdcp_input
  label: LW3 Setting the HDCP (Input Port)
  kind: set
  command: "SET /MEDIA/VIDEO/{in}.HdcpEnable={logical_value}\r\n"
  params:
    - {name: in, type: string, description: Digital input (I2/I3/I4); analog (I1, I5) unsupported"}
    - {name: logical_value, type: string, description: "true (enabled) or false (disabled)"}

- id: lw3_video_hdcp_output
  label: LW3 Setting the HDCP (Output Port)
  kind: set
  command: "SET /MEDIA/VIDEO/{out}.HdcpModeSetting={HDCP_mode}\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}
    - {name: HDCP_mode, type: integer, description: "0 (Auto) or 1 (Always)"}

- id: lw3_video_hdmi_mode
  label: LW3 Setting the HDMI Mode (Output Port)
  kind: set
  command: "SET /MEDIA/VIDEO/{out}.HdmiModeSetting={mode}\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}
    - {name: mode, type: integer, description: "0 (Auto), 1 (DVI), 2 (HDMI 24 bit), 3 (HDMI 30 bit), 4 (HDMI 36 bit)"}

- id: lw3_video_color_space
  label: LW3 Setting the Color Space (Output Port)
  kind: set
  command: "SET /MEDIA/VIDEO/{out}.ColorSpaceSetting={colorspace}\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}
    - {name: colorspace, type: integer, description: "0 (Auto), 1 (RGB), 2 (YCbCr 4:4:4), 3 (YCbCr 4:2:2)"}

- id: lw3_video_free_run_mode
  label: LW3 Test Pattern Generator Mode
  kind: set
  command: "SET /MEDIA/VIDEO/{in}.FreeRunMode={mode}\r\n"
  params:
    - {name: in, type: string, description: Input port"}
    - {name: mode, type: integer, description: "0 (Always off), 1 (Always on), 2 (Auto)"}

- id: lw3_video_free_run_color
  label: LW3 Test Pattern Color
  kind: set
  command: "SET /MEDIA/VIDEO/{in}.FreeRunColor={RGB_code}\r\n"  # RR;GG;BB
  params:
    - {name: in, type: string, description: Input port"}
    - {name: RGB_code, type: string, description: "RGB in RR;GG;BB format (decimal, semicolon-separated)"}

- id: lw3_video_free_run_resolution
  label: LW3 Test Pattern Resolution
  kind: set
  command: "SET /MEDIA/VIDEO/{in}.FreeRunResolution={resolution}\r\n"
  params:
    - {name: in, type: string, description: Input port"}
    - {name: resolution, type: integer, description: "0..11 (0=640x480p60, 10=1920x1080p60, 11=1920x1200p60)"}

- id: lw3_video_tps_mode
  label: LW3 Setting the TPS Mode
  kind: set
  command: "SET /REMOTE/{port}.tpsModeSetting={tps_mode}\r\n"
  params:
    - {name: port, type: string, description: Remote port (e.g. S1)"}
    - {name: tps_mode, type: string, description: "A (Auto), H (HDBaseT), L (Longreach), 1 (LPPF1), 2 (LPPF2)"}

# ───────────────────────── LW3 - Audio Port Settings ─────────────────────────
- id: lw3_audio_source_port_status
  label: LW3 Querying the Status of Source Ports (Audio)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.SourcePortStatus\r\n"
  params: []

- id: lw3_audio_destination_port_status
  label: LW3 Querying the Status of Destination Port (Audio)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortStatus\r\n"
  params: []

- id: lw3_audio_crosspoint
  label: LW3 Querying the Audio Crosspoint Setting
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationConnectionList\r\n"
  params: []

- id: lw3_audio_switch_input
  label: LW3 Switching Audio Input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switch({in}:{out})\r\n"
  params:
    - {name: in, type: string, description: Audio input port (e.g. I1..I5)"}
    - {name: out, type: string, description: Audio output port (e.g. O1)"}

- id: lw3_audio_autoselect_query
  label: LW3 Querying the Audio Autoselect Settings
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortAutoselect\r\n"
  params: []

- id: lw3_audio_autoselect_set
  label: LW3 Changing the Autoselect Mode (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setDestinationPortAutoselect({out}:{out_set})\r\n"  # e.g. O1:EL
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}
    - {name: out_set, type: string, description: "2-letter code: 1st ∈ {E,D}, 2nd ∈ {F,P,L,S}"}

- id: lw3_audio_priority_query
  label: LW3 Querying the Input Port Priority (Audio)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.PortPriorityList\r\n"
  params: []

- id: lw3_audio_priority_set
  label: LW3 Changing the Input Port Priority (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setAutoselectionPriority({pairs})\r\n"
  params:
    - {name: pairs, type: string, description: "Semicolon-separated I#\\(O#\\):<prio> pairs (0..31)"}

- id: lw3_audio_mute_source
  label: LW3 Muting an Audio Input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteSource({in})\r\n"
  params:
    - {name: in, type: string, description: Audio input, multiple inputs separated by ';'}

- id: lw3_audio_unmute_source
  label: LW3 Unmuting an Audio Input
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteSource({in})\r\n"
  params:
    - {name: in, type: string, description: Audio input, multiple inputs separated by ';'}

- id: lw3_audio_lock_source
  label: LW3 Locking an Input Port (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockSource({in})\r\n"
  params:
    - {name: in, type: string, description: Audio input, multiple inputs separated by ';'}

- id: lw3_audio_unlock_source
  label: LW3 Unlocking an Input Port (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockSource({in})\r\n"
  params:
    - {name: in, type: string, description: Audio input, multiple inputs separated by ';'}

- id: lw3_audio_mute_destination
  label: LW3 Muting an Audio Output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_audio_unmute_destination
  label: LW3 Unmuting an Audio Output
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_audio_lock_destination
  label: LW3 Locking an Output (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

- id: lw3_audio_unlock_destination
  label: LW3 Unlocking an Output (Audio)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockDestination({out})\r\n"
  params:
    - {name: out, type: string, description: Output port (e.g. O1)"}

# ───────────────────────── LW3 - Analog Audio Input Levels ─────────────────────────
- id: lw3_audio_volume
  label: LW3 Setting Analog Audio Input Volume
  kind: set
  command: "SET /MEDIA/AUDIO/{in}.Volume={level}\r\n"  # dB attenuation, -95.625..0, step -0.375
  params:
    - {name: in, type: string, description: Analog audio input (e.g. I1)"}
    - {name: level, type: number, description: "Attenuation in dB (-95.625 .. 0, step 0.375)"}

- id: lw3_audio_balance
  label: LW3 Setting Analog Audio Input Balance
  kind: set
  command: "SET /MEDIA/AUDIO/{in}.Balance={level}\r\n"  # 0..100 (0=left, 50=centre, 100=right)
  params:
    - {name: in, type: string, description: Analog audio input (e.g. I5)"}
    - {name: level, type: integer, description: "Balance value 0..100 (50 = centre)"}

# ───────────────────────── LW3 - RS-232 Port Configuration ─────────────────────────
- id: lw3_uart_control_protocol
  label: LW3 Setting the RS-232 Control Protocol
  kind: set
  command: "SET /MEDIA/UART/{port}.ControlProtocol={protocol}\r\n"  # 0=LW2, 1=LW3
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: protocol, type: integer, description: "0 (LW2) or 1 (LW3)"}

- id: lw3_uart_baud
  label: LW3 Setting the RS-232 Baud Rate
  kind: set
  command: "SET /MEDIA/UART/{port}.Baudrate={baudrate}\r\n"  # 0..7
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: baudrate, type: integer, description: "0=4800, 1=7200, 2=9600, 3=14400, 4=19200, 5=38400, 6=57600, 7=115200"}

- id: lw3_uart_databits
  label: LW3 Setting the RS-232 Data Bits
  kind: set
  command: "SET /MEDIA/UART/{port}.DataBits={databits}\r\n"
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: databits, type: integer, description: "8 or 9"}

- id: lw3_uart_stopbits
  label: LW3 Setting the RS-232 Stop Bits
  kind: set
  command: "SET /MEDIA/UART/{port}.StopBits={stopbits}\r\n"  # 0=1, 1=1.5, 2=2
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: stopbits, type: integer, description: "0 (1), 1 (1.5), 2 (2)"}

- id: lw3_uart_parity
  label: LW3 Setting the RS-232 Parity
  kind: set
  command: "SET /MEDIA/UART/{port}.Parity={parity}\r\n"  # 0=None, 1=Odd, 2=Even
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: parity, type: integer, description: "0 (None), 1 (Odd), 2 (Even)"}

- id: lw3_uart_rs232_mode
  label: LW3 Setting the RS-232 Operation Mode
  kind: set
  command: "SET /MEDIA/UART/{port}.Rs232Mode={mode}\r\n"  # 0=Pass-through, 1=Control, 2=Command injection
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: mode, type: integer, description: "0 (Pass-through), 1 (Control), 2 (Command injection)"}

- id: lw3_uart_command_injection
  label: LW3 Enabling/Disabling Command Injection
  kind: set
  command: "SET /MEDIA/UART/{port}.CommandInjectionEnable={logical_value}\r\n"
  params:
    - {name: port, type: string, description: Serial port (e.g. P1)"}
    - {name: logical_value, type: string, description: "true (enabled) or false (disabled)"}

# ───────────────────────── LW3 - RS-232 Message Sending ─────────────────────────
- id: lw3_uart_send_message
  label: LW3 Sending an RS-232 Message (ASCII, escapes supported)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendMessage({message})\r\n"
  params:
    - {name: message, type: string, description: ASCII message; control chars escapable via \\xNN (e.g. PWR0\\x0D\\x0A)"}

- id: lw3_uart_send_text
  label: LW3 Sending an RS-232 Text (ASCII, no escapes)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendText({message})\r\n"
  params:
    - {name: message, type: string, description: ASCII text without control characters"}

- id: lw3_uart_send_binary
  label: LW3 Sending an RS-232 Binary Message (HEX)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendBinaryMessage({hex_message})\r\n"
  params:
    - {name: hex_message, type: string, description: HEX bytes concatenated (no separator), e.g. 433030"}

# ───────────────────────── LW3 - EDID Management ─────────────────────────
- id: lw3_edid_status_query
  label: LW3 Querying the Emulated EDIDs
  kind: query
  command: "GET /EDID.EdidStatus\r\n"
  params: []

- id: lw3_edid_validity_query
  label: LW3 Querying the Validity of a Dynamic EDID
  kind: query
  command: "GET /EDID/D/{dynamic}.Validity\r\n"
  params:
    - {name: dynamic, type: string, description: Dynamic EDID index (e.g. D1)"}

- id: lw3_edid_preferred_resolution
  label: LW3 Querying the Preferred Resolution of a User EDID
  kind: query
  command: "GET /EDID/U/{user}.PreferredResolution\r\n"
  params:
    - {name: user, type: string, description: User EDID index (e.g. U2)"}

- id: lw3_edid_switch
  label: LW3 Emulating an EDID to an Input Port
  kind: action
  command: "CALL /EDID:switch({source}:{emulated})\r\n"  # F49:E2
  params:
    - {name: source, type: string, description: "Dynamic / user / factory EDID reference (e.g. F49)"}
    - {name: emulated, type: string, description: Emulated EDID slot for the input (e.g. E2)"}

- id: lw3_edid_switch_all
  label: LW3 Emulating an EDID to All Input Ports
  kind: action
  command: "CALL /EDID:switchAll({source})\r\n"
  params:
    - {name: source, type: string, description: Dynamic / user / factory EDID reference (e.g. F47)"}

- id: lw3_edid_copy
  label: LW3 Copying an EDID to User Memory
  kind: action
  command: "CALL /EDID:copy({source}:{user})\r\n"
  params:
    - {name: source, type: string, description: "dynamic / emulated / factory / user reference (e.g. D1)"}
    - {name: user, type: string, description: User EDID index (e.g. U1)"}

- id: lw3_edid_delete
  label: LW3 Deleting an EDID from User Memory
  kind: action
  command: "CALL /EDID:delete({user})\r\n"
  params:
    - {name: user, type: string, description: User EDID index (e.g. U1)"}

- id: lw3_edid_reset
  label: LW3 Resetting the Emulated EDIDs
  kind: action
  command: "CALL /EDID:reset()\r\n"
  params: []

# ───────────────────────── LW3 - Ethernet Port Configuration ─────────────────────────
- id: lw3_dhcp_enable
  label: LW3 Setting the DHCP State
  kind: set
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled={dhcp_status}\r\n"
  params:
    - {name: dhcp_status, type: string, description: "true (DHCP) or false (static)"}

- id: lw3_set_static_ip
  label: LW3 Changing the IP Address (Static)
  kind: set
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress={ip_address}\r\n"
  params:
    - {name: ip_address, type: string, description: IPv4 address, e.g. 192.168.0.85"}

- id: lw3_set_static_netmask
  label: LW3 Changing the Subnet Mask (Static)
  kind: set
  command: "SET /MANAGEMENT/NETWORK.StaticNetworkMask={netmask}\r\n"
  params:
    - {name: netmask, type: string, description: IPv4 dot-decimal subnet mask"}

- id: lw3_set_static_gateway
  label: LW3 Changing the Gateway Address (Static)
  kind: set
  command: "SET /MANAGEMENT/NETWORK.StaticGatewayAddress={gw_address}\r\n"
  params:
    - {name: gw_address, type: string, description: IPv4 dot-decimal gateway address"}

- id: lw3_apply_network_settings
  label: LW3 Applying Network Settings
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:ApplySettings(1)\r\n"
  params: []

# ───────────────────────── LW3 - Event Manager (general primitives) ─────────────────────────
# NOTE: Many of the following event-related commands are documented in source but are gated to specific models (-TX140K, -TX140-Plus, WP-UMX-TPS-TX130-Plus-US) and firmware versions. Apply per-feature DIFFERENCE notes when using.
- id: lw3_event_condition
  label: LW3 Setting an Event Condition
  kind: set
  command: "SET /EVENTS/E{loc}.Condition={expression}\r\n"  # e.g. /MEDIA/VIDEO/I1.SignalPresent=1
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: expression, type: string, description: "Path.property=value (e.g. /MEDIA/VIDEO/I1.SignalPresent=1)"}

- id: lw3_event_condition_inverted
  label: LW3 Inverting an Event Condition
  kind: set
  command: "SET /EVENTS/E{loc}.ConditionInverted={true|false}\r\n"
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: inverted, type: string, description: "true / false"}

- id: lw3_event_action
  label: LW3 Setting an Event Action by Direct Path
  kind: set
  command: "SET /EVENTS/E{loc}.Action={expression}\r\n"  # e.g. /MEDIA/VIDEO/XP.switch=I4:O1
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: expression, type: string, description: "Path.property_or_method=value (no colons/brackets for methods)"}

- id: lw3_event_name
  label: LW3 Setting the Name of the Event
  kind: set
  command: "SET /EVENTS/E{loc}.Name={string}\r\n"  # max 20 chars; A-Z a-z 0-9 - _ space
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: string, type: string, description: "Event name (max 20 chars, [A-Za-z0-9 _ - ])"}

- id: lw3_event_enabled
  label: LW3 Enabling/Disabling the Event
  kind: set
  command: "SET /EVENTS/E{loc}.Enabled={state}\r\n"
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: state, type: string, description: "true (or 1) / false (or 0)"}

- id: lw3_event_delay_timeout
  label: LW3 Setting the Condition Timeout
  kind: set
  command: "SET /EVENTS/E{loc}.ConditionTimeout={time}\r\n"  # seconds
  params:
    - {name: loc, type: integer, description: Event slot number}
    - {name: time, type: integer, description: Timeout in seconds (0 = no delay)"}

- id: lw3_event_condition_count
  label: LW3 Querying the Condition Counter
  kind: query
  command: "GET /EVENTS/E{loc}.ConditionCount\r\n"
  params:
    - {name: loc, type: integer, description: Event slot number"}

- id: lw3_event_action_test
  label: LW3 Testing an Action
  kind: action
  command: "CALL /EVENTS/E{loc}:ActionTest(1)\r\n"
  params:
    - {name: loc, type: integer, description: Event slot number"}

# ───────────────────────── LW3 - Variables (per-feature DIFFERENCE: TX140K / TX140-Plus / WP-130-Plus-US) ─────────────────────────
- id: lw3_variable_value
  label: LW3 Variable Value Assignment
  kind: set
  command: "SET /CTRL/VARS/V{loc}.Value={value}\r\n"
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: value, type: string, description: Numeric or string value; strings ≤15 chars, numbers -2147483648..2147483647"}

- id: lw3_variable_add
  label: LW3 Variable Add (with optional min/max clamping)
  kind: action
  command: "CALL /CTRL/VARS/V{loc}:add({operand};{min};{max})\r\n"
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: operand, type: integer, description: Value to add (negative allowed)"}
    - {name: min, type: integer, description: Lower limit (optional)"}
    - {name: max, type: integer, description: Upper limit (optional)"}

- id: lw3_variable_cycle
  label: LW3 Variable Cycle (wraps at min/max)
  kind: action
  command: "CALL /CTRL/VARS/V{loc}:cycle({operand};{min};{max})\r\n"
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: operand, type: integer, description: Value to add (negative allowed)"}
    - {name: min, type: integer, description: Lower limit (optional)"}
    - {name: max, type: integer, description: Upper limit (optional)"}

- id: lw3_variable_case
  label: LW3 Variable Case (interval mapping)
  kind: action
  command: "CALL /CTRL/VARS/V{loc}:case({cases})\r\n"  # e.g. 10 20 15; 26 50 20
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: cases, type: string, description: "Semicolon-separated 'min max val' triples (up to 16 cases)"}

- id: lw3_variable_scanf
  label: LW3 Variable Scan and Store from LW3 property
  kind: action
  command: "CALL /CTRL/VARS/V{loc}:scanf({path}.{property};{pattern})\r\n"  # escape % as \%
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: path, type: string, description: LW3 node path"}
    - {name: property, type: string, description: LW3 property name"}
    - {name: pattern, type: string, description: "Pattern using %s, %<n>s, %c, %<n>c, %[...], %[^...], %*, literal text; escape % as \\%"}

- id: lw3_variable_printf
  label: LW3 Variable Reformat (prefix/insert %s/postfix)
  kind: action
  command: "CALL /CTRL/VARS/V{loc}:printf({format})\r\n"  # e.g. PWR%s
  params:
    - {name: loc, type: integer, description: Variable slot (1..30)"}
    - {name: format, type: string, description: "Format string with %s placeholder; ASCII only; result max 15 chars"}

# ───────────────────────── LW3 - GPIO Port Configuration (per-feature DIFFERENCE: TX130/TX140/TX140K/TX140-Plus only) ─────────────────────────
- id: lw3_gpio_direction
  label: LW3 Setting the Direction of a GPIO Pin
  kind: set
  command: "SET /MEDIA/GPIO/{port}.Direction={direction}\r\n"  # I / O
  params:
    - {name: port, type: string, description: GPIO port (e.g. P1)"}
    - {name: direction, type: string, description: "I (Input) or O (Output)"}

- id: lw3_gpio_output
  label: LW3 Setting the Output Level of a GPIO Pin
  kind: set
  command: "SET /MEDIA/GPIO/{port}.Output={value}\r\n"  # H / L
  params:
    - {name: port, type: string, description: GPIO port (e.g. P1)"}
    - {name: value, type: string, description: "H (high) or L (low)"}

- id: lw3_gpio_toggle
  label: LW3 Toggling the Level of a GPIO Pin
  kind: action
  command: "CALL /MEDIA/GPIO/{port}:toggle()\r\n"
  params:
    - {name: port, type: string, description: GPIO port (e.g. P1)"}

# ───────────────────────── LW3 - Ethernet Message Sending ─────────────────────────
- id: lw3_tcp_message
  label: LW3 Sending a TCP Message (ASCII, escapes supported)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpMessage({ip}:{port}={message})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target TCP port"}
    - {name: message, type: string, description: ASCII payload, control chars escapable via \\xNN"}

- id: lw3_tcp_text
  label: LW3 Sending a TCP Text (ASCII, no escapes)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpText({ip}:{port}={text})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target TCP port"}
    - {name: text, type: string, description: ASCII text without control characters"}

- id: lw3_tcp_binary
  label: LW3 Sending a TCP Binary Message (HEX)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpBinary({ip}:{port}={hex_message})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target TCP port"}
    - {name: hex_message, type: string, description: HEX bytes concatenated (no separator required)"}

- id: lw3_udp_message
  label: LW3 Sending a UDP Message (ASCII, escapes supported)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpMessage({ip}:{port}={message})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target UDP port"}
    - {name: message, type: string, description: ASCII payload"}

- id: lw3_udp_text
  label: LW3 Sending a UDP Text (ASCII, no escapes)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpText({ip}:{port}={text})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target UDP port"}
    - {name: text, type: string, description: ASCII text"}

- id: lw3_udp_binary
  label: LW3 Sending a UDP Binary Message (HEX)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpBinary({ip}:{port}={hex_message})\r\n"
  params:
    - {name: ip, type: string, description: Target IPv4 address"}
    - {name: port, type: integer, description: Target UDP port"}
    - {name: hex_message, type: string, description: HEX bytes concatenated"}

- id: lw3_wake_on_lan
  label: LW3 Wake-on-LAN
  kind: action
  command: "CALL /MEDIA/ETHERNET:wakeOnLan({mac_address})\r\n"
  params:
    - {name: mac_address, type: string, description: Target MAC in hex-colon format (e.g. AA:BB:CC:22:14:FF)"}

# ───────────────────────── LW3 - IR (Infrared) Port Configuration ─────────────────────────
- id: lw3_ir_command_injection
  label: LW3 Enabling/Disabling IR Command Injection Mode
  kind: set
  command: "SET /MEDIA/IR/{port}.CommandInjectionEnable={logical_value}\r\n"
  params:
    - {name: port, type: string, description: IR port (e.g. S1)"}
    - {name: logical_value, type: string, description: "true (enabled) or false (disabled)"}

- id: lw3_ir_enable_modulation
  label: LW3 Enabling/Disabling IR Output Signal Modulation
  kind: set
  command: "SET /MEDIA/IR/{port}.EnableModulation={logical_value}\r\n"
  params:
    - {name: port, type: string, description: IR output port (e.g. D1)"}
    - {name: logical_value, type: string, description: "true / false"}

- id: lw3_ir_send_pronto_hex_little_endian
  label: LW3 Sending Pronto Hex Codes (Little-endian)
  kind: action
  command: "CALL /MEDIA/IR/{output_port}:sendProntoHex({hex_code})\r\n"
  params:
    - {name: output_port, type: string, description: "IR output port (D1 = Local Infra, D2 = TPS Infra)"}
    - {name: hex_code, type: string, description: Pronto hex code, max 765 chars (little-endian), no spaces"}

- id: lw3_ir_send_pronto_hex_big_endian
  label: LW3 Sending Pronto Hex Codes (Big-endian)
  kind: action
  command: "CALL /MEDIA/IR/{output_port}:sendProntoHexBigEndian({hex_code})\r\n"
  params:
    - {name: output_port, type: string, description: "IR output port (D1 = Local Infra, D2 = TPS Infra)"}
    - {name: hex_code, type: string, description: Pronto hex code, max 765 chars (big-endian), no spaces"}

# ───────────────────────── LW3 - CEC (per-feature DIFFERENCE: TX140K / TX140-Plus / WP-130-Plus-US) ─────────────────────────
- id: lw3_cec_send_click
  label: LW3 CEC Press&Release (Push-button) Commands
  kind: action
  command: "CALL /MEDIA/CEC/{port}:sendClick({command})\r\n"
  params:
    - {name: port, type: string, description: Video port (e.g. I2, O1)"}
    - {name: command, type: string, description: "CEC command name (e.g. ok, power_on, power_off, volume_up, mute, play, stop, select_media_1, ...)"}

- id: lw3_cec_send
  label: LW3 CEC Send Command
  kind: action
  command: "CALL /MEDIA/CEC/{port}:send({command})\r\n"
  params:
    - {name: port, type: string, description: Video port (I1-I4 or O1-O2)"}
    - {name: command, type: string, description: "CEC command (image_view_on, standby, text_view_on, active_source, get_cec_version, set_osd, clear_osd, give_power_status)"}

- id: lw3_cec_set_osd_string
  label: LW3 CEC Set OSD String
  kind: set
  command: "SET /MEDIA/CEC/{port}.OsdString={text}\r\n"
  params:
    - {name: port, type: string, description: Video port (I1-I4 or O1-O2)"}
    - {name: text, type: string, description: "OSD string; [A-Za-z0-9._-], max 14 chars"}

- id: lw3_cec_send_hex
  label: LW3 CEC Send Command (Hex Format)
  kind: action
  command: "CALL /MEDIA/CEC/{port}:sendHex({hex_code})\r\n"
  params:
    - {name: port, type: string, description: Video port (I1-I4 or O1-O2)"}
    - {name: hex_code, type: string, description: CEC frame in hex, max 30 chars (15 bytes)"}

- id: lw3_cec_last_received
  label: LW3 CEC Query Last Received CEC Message
  kind: query
  command: "GET /MEDIA/CEC/{port}.LastReceivedMessage\r\n"
  params:
    - {name: port, type: string, description: Video port (I1-I4 or O1-O2)"}

# ───────────────────────── LW3 - RS-232 Message Recognizer (per-feature DIFFERENCE: TX140K/TX140-Plus only) ─────────────────────────
- id: lw3_rs232_recognizer_enable
  label: LW3 Enabling/Disabling RS-232 Recognizer
  kind: set
  command: "SET /MEDIA/UART/{serial_port}.RecognizerEnable={recognizer_enable}\r\n"
  params:
    - {name: serial_port, type: string, description: "Serial port (P1 or P2)"}
    - {name: recognizer_enable, type: string, description: "true / false"}

- id: lw3_rs232_recognizer_delimiter
  label: LW3 Setting RS-232 Recognizer Delimiter
  kind: set
  command: "SET /MEDIA/UART/RECOGNIZER.DelimiterHex={delimiter}\r\n"
  params:
    - {name: delimiter, type: string, description: Delimiter in hex, max 8 chars (16 hex digits), e.g. 3a"}

- id: lw3_rs232_recognizer_timeout
  label: LW3 Setting RS-232 Recognizer Timeout
  kind: set
  command: "SET /MEDIA/UART/RECOGNIZER.TimeOut={timeout}\r\n"
  params:
    - {name: timeout, type: integer, description: Timeout in ms (0=disabled, min 10)"}

- id: lw3_rs232_recognizer_active_timeout
  label: LW3 Setting RS-232 Recognizer Active Timeout
  kind: set
  command: "SET /MEDIA/UART/RECOGNIZER.ActivePropertyTimeout={a_timeout}\r\n"
  params:
    - {name: a_timeout, type: integer, description: Active timeout in ms (0..255, default 50)"}

- id: lw3_rs232_recognizer_rx
  label: LW3 Querying Last RS-232 Recognized Message (String)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.Rx\r\n"
  params: []

- id: lw3_rs232_recognizer_rx_hex
  label: LW3 Querying Last RS-232 Recognized Message (Hex)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.RxHex\r\n"
  params: []

- id: lw3_rs232_recognizer_active_rx
  label: LW3 Querying Last RS-232 Active Message (String)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRx\r\n"
  params: []

- id: lw3_rs232_recognizer_active_rx_hex
  label: LW3 Querying Last RS-232 Active Message (Hex)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRxHex\r\n"
  params: []

- id: lw3_rs232_recognizer_clear
  label: LW3 Clearing Last RS-232 Recognized Stored Messages
  kind: action
  command: "CALL /MEDIA/UART/RECOGNIZER:clear()\r\n"
  params: []

# ───────────────────────── LW3 - TCP Clients (per-feature DIFFERENCE: TX140K/TX140-Plus/WP-130-Plus-US) ─────────────────────────
- id: lw3_tcp_server_ip
  label: LW3 Setting the TCP Server IP Address
  kind: set
  command: "SET /CTRL/TCP/C{loc}.ServerIP={ip_address}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: ip_address, type: string, description: Target server IPv4 address"}

- id: lw3_tcp_server_port
  label: LW3 Setting the TCP Server Port
  kind: set
  command: "SET /CTRL/TCP/C{loc}.ServerPort={port_no}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: port_no, type: integer, description: Target server TCP port"}

- id: lw3_tcp_connect
  label: LW3 Connecting to a TCP Server
  kind: action
  command: "CALL /CTRL/TCP/C{loc}:connect()\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_disconnect
  label: LW3 Disconnecting from a TCP Server
  kind: action
  command: "CALL /CTRL/TCP/C{loc}:disconnect()\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_timeout
  label: LW3 Setting the TCP Recognizer Timeout
  kind: set
  command: "SET /CTRL/TCP/C{loc}.TimeOut={timeout}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: timeout, type: integer, description: Timeout in ms (0=disabled, min 10)"}

- id: lw3_tcp_active_timeout
  label: LW3 Setting the TCP Active Property Timeout
  kind: set
  command: "SET /CTRL/TCP/C{loc}.ActivePropertyTimeout={a_timeout}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: a_timeout, type: integer, description: Active timeout in ms (0..255, default 50)"}

- id: lw3_tcp_delimiter
  label: LW3 Setting the TCP Recognizer Delimiter
  kind: set
  command: "SET /CTRL/TCP/C{loc}.DelimiterHex={delimiter}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: delimiter, type: string, description: Delimiter in hex, max 8 chars (16 hex digits), e.g. 00"}

- id: lw3_tcp_rx
  label: LW3 Querying Last TCP Recognized Message (String)
  kind: query
  command: "GET /CTRL/TCP/C{loc}.Rx\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_rx_hex
  label: LW3 Querying Last TCP Recognized Message (Hex)
  kind: query
  command: "GET /CTRL/TCP/C{loc}.RxHex\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_active_rx
  label: LW3 Querying Last TCP Active Message (String)
  kind: query
  command: "GET /CTRL/TCP/C{loc}.ActiveRx\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_active_rx_hex
  label: LW3 Querying Last TCP Active Message (Hex)
  kind: query
  command: "GET /CTRL/TCP/C{loc}.ActiveRxHex\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_clear
  label: LW3 Clearing Last TCP Recognized Stored Message
  kind: action
  command: "CALL /CTRL/TCP/C{loc}:clear()\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}

- id: lw3_tcp_action_trigger
  label: LW3 Running an Immediate Event Action on TCP Recognizer
  kind: set
  command: "SET /CTRL/TCP/C{loc}.ActionTrigger={event_nr}\r\n"
  params:
    - {name: loc, type: integer, description: TCP client slot (1..3)"}
    - {name: event_nr, type: integer, description: Event number (without letter E) to trigger"}

# ───────────────────────── LW3 - HTTP Messaging (per-feature DIFFERENCE: TX140K/TX140-Plus/WP-130-Plus-US) ─────────────────────────
- id: lw3_http_server_ip
  label: LW3 Setting the HTTP Target IP Address
  kind: set
  command: "SET /CTRL/HTTP/C1.ServerIP={ip_address}\r\n"
  params:
    - {name: ip_address, type: string, description: Target IPv4 address"}

- id: lw3_http_server_port
  label: LW3 Setting the HTTP Target Port
  kind: set
  command: "SET /CTRL/HTTP/C1.ServerPort={port_no}\r\n"
  params:
    - {name: port_no, type: integer, description: Target TCP port (typically 80 for HTTP)"}

- id: lw3_http_file
  label: LW3 Setting the HTTP Target Path
  kind: set
  command: "SET /CTRL/HTTP/C1.File={path}\r\n"
  params:
    - {name: path, type: string, description: URL path on target (e.g. /putxml)"}

- id: lw3_http_header
  label: LW3 Setting the HTTP Message Header
  kind: set
  command: "SET /CTRL/HTTP/C1.Header={header_text}\r\n"  # CRLF as \r\n
  params:
    - {name: header_text, type: string, description: HTTP header lines separated by \\r\\n (auto-escaped when typing Enter in LDC)"}

- id: lw3_http_post
  label: LW3 Sending an HTTP Post Message
  kind: action
  command: "CALL /CTRL/HTTP/C1:post({body_text})\r\n"
  params:
    - {name: body_text, type: string, description: HTTP body / payload"}

- id: lw3_http_put
  label: LW3 Sending an HTTP Put Message
  kind: action
  command: "CALL /CTRL/HTTP/C1:put({body_text})\r\n"
  params:
    - {name: body_text, type: string, description: HTTP body / payload"}

# ───────────────────────── LW3 - Cleartext Login Protection (per-feature DIFFERENCE: TX140K/TX140-Plus/WP-130-Plus-US) ─────────────────────────
- id: lw3_login_set_password
  label: LW3 Setting the Login Password
  kind: action
  command: "CALL /LOGIN:setPassword({password})\r\n"
  params:
    - {name: password, type: string, description: New login password (cleartext)"}

- id: lw3_login_login
  label: LW3 Logging into the Device
  kind: action
  command: "CALL /LOGIN:login({password})\r\n"
  params:
    - {name: password, type: string, description: Login password (cleartext)"}

- id: lw3_login_logout
  label: LW3 Logging out of the Device
  kind: action
  command: "CALL /LOGIN:logout({password})\r\n"
  params:
    - {name: password, type: string, description: Login password (cleartext)"}

- id: lw3_login_enable
  label: LW3 Enabling/Disabling the Cleartext Login Function
  kind: set
  command: "SET /LOGIN.LoginEnable={login_state}\r\n"
  params:
    - {name: login_state, type: string, description: "true (1) / false (0)"}

# ───────────────────────── LW3 - Ethernet Tool Kit (per-feature DIFFERENCE: TX140K/TX140-Plus/WP-130-Plus-US) ─────────────────────────
- id: lw3_mac_filter_address
  label: LW3 Setting a MAC Filter Entry
  kind: set
  command: "SET /MANAGEMENT/MACFILTER.MACaddress{loc}={mac};{receive};{send};{name}\r\n"
  params:
    - {name: loc, type: integer, description: Filter entry location (1..8)"}
    - {name: mac, type: string, description: "MAC address in hex:colon format (e.g. 04:D4:C4:4D:01:43)"}
    - {name: receive, type: string, description: "true (allow querying) / false"}
    - {name: send, type: string, description: "true (allow parameter setting) / false"}
    - {name: name, type: string, description: "Optional name, max 5 ASCII chars"}

- id: lw3_mac_filter_enable
  label: LW3 Enabling/Disabling MAC Filter
  kind: set
  command: "SET /MANAGEMENT/MACFILTER.FilterEnable={logical_value}\r\n"
  params:
    - {name: logical_value, type: string, description: "true / false"}

- id: lw3_servicefilter_lw2
  label: LW3 Blocking the LW2 Control Port
  kind: set
  command: "SET /MANAGEMENT/SERVICEFILTER.Lw2Enabled={port_mode}\r\n"
  params:
    - {name: port_mode, type: string, description: "true (port open) / false (port blocked)"}

- id: lw3_servicefilter_http
  label: LW3 Blocking the HTTP Port
  kind: set
  command: "SET /MANAGEMENT/SERVICEFILTER.HttpEnabled={port_mode}\r\n"
  params:
    - {name: port_mode, type: string, description: "true (port open) / false (port blocked)"}

- id: lw3_hostname
  label: LW3 Setting the Hostname
  kind: set
  command: "SET /MANAGEMENT/NETWORK.HostName={unique_name}\r\n"
  params:
    - {name: unique_name, type: string, description: "Hostname 1..64 chars; [A-Za-z0-9.-]; -/. not last char"}

- id: lw3_event_trigger_condition
  label: LW3 Triggering a Condition Manually
  kind: action
  command: "CALL /EVENTS/E{loc}:triggerCondition(1)\r\n"
  params:
    - {name: loc, type: integer, description: Event slot number"}
```

## Feedbacks
```yaml
# LW3 responses the source explicitly documents. LW2 also returns values but is omitted
# here because the spec already exposes those endpoints as queries (Actions with kind: query).
# Use the same GET/SET/CALL commands; the response line carries the value.
- id: video_source_port_status
  type: string
  description: "Per-input 5-char ASCII status: char 1 = Mute/Lock (T/L/M/U), chars 2-5 = 2-byte HEX of audio/HDCP/signal/connection. Example: M00AA;T00AF;T00AA;T00EF;T000A;T002E"

- id: video_destination_port_status
  type: string
  description: "Per-output 5-char ASCII status (Mute/Lock + 2-byte HEX). Example: M00BF"

- id: video_crosspoint_connection
  type: string
  description: "Currently connected input per output (e.g. I1, I5). Returned by /MEDIA/VIDEO/XP.DestinationConnectionList"

- id: video_connected_source
  type: string
  description: "Currently connected input for the given output (e.g. I1). Returned by /MEDIA/VIDEO/<out>.ConnectedSource"

- id: video_autoselect
  type: string
  description: "2-letter code per output: 1st ∈ {E,D}, 2nd ∈ {F,P,L}. Example: EL = Enabled Last-detect"

- id: video_port_priority
  type: string
  description: "Per-output priority order of input ports, e.g. 0,1,2,3,4,5 (0=highest, 31=skip)"

- id: audio_source_port_status
  type: string
  description: "Per-input 5-char ASCII status for audio layer. Example: T000F;M000B;T000A;T000A;T000C"

- id: audio_destination_port_status
  type: string
  description: "Per-output 5-char ASCII status for audio layer. Example: T000F"

- id: audio_crosspoint_connection
  type: string
  description: "Currently connected audio input per output (e.g. I5)"

- id: audio_autoselect
  type: string
  description: "2-letter code per output: 1st ∈ {E,D}, 2nd ∈ {F,P,L,S}"

- id: audio_port_priority
  type: string
  description: "Per-output priority order of audio input ports"

- id: edid_status
  type: string
  description: "Semicolon-separated list of <source>:<emulated> pairs (e.g. D1:E1;D1:E2). Returned by /EDID.EdidStatus"

- id: edid_dynamic_validity
  type: boolean
  description: "true / false. Returned by /EDID/D/<dynamic>.Validity"

- id: edid_user_preferred_resolution
  type: string
  description: "Preferred resolution string for the queried User EDID (e.g. 1920x1080p60.00Hz). Returned by /EDID/U/<user>.PreferredResolution"

- id: ip_status
  type: string
  description: "LW2 IP status: <type>;<ip_address>;<subnet_mask>;<gateway_addr> (type 0=static, 1=dynamic). Example: 0;192.168.0.100;255.255.255.0;192.168.0.1"

- id: control_protocol
  type: string
  description: "LW2 current control protocol (#1=LW2 or #2=LW3 per source). Returned by {P_?}"

- id: product_name
  type: string
  description: "Read-only product name. Example: UMX-TPS-TX140-Plus"

- id: firmware_version
  type: string
  description: "Firmware version string. Example: 1.6.0b13 r99 (LW2), 1.3.2b1 r43 (LW3)"

- id: serial_number
  type: string
  description: "8-digit serial number. Example: 5A004254"

- id: health_status
  type: string
  description: "Voltages and temperatures. Example: CPU 12.16V 5.03V 3.30V 3.33V 3.37V 1.30V 1.86V 1.00V 53.22C 53.26C"

- id: installed_boards
  type: string
  description: "SL# 0 <MB_DESC> lines. Example: SL# 0 UMX-TPS-TX140K"

- id: firmware_controllers
  type: string
  description: "Per-controller firmware (CF <desc>...). Example: CF UMX-TPS-TX140K 1.5.0b1 r53"

- id: device_label
  type: string
  description: "User-editable label, max 39 ASCII chars. Example: UMX-TPS-TX140_ConferenceRoom"

- id: rs232_local_format
  type: string
  description: "Current local RS-232 format (e.g. 9600,8N1). Returned by {RS232_LOCAL_FORMAT=?} or /MEDIA/UART/P1.Rs232Confguration"

- id: cec_last_received_message
  type: string
  description: "Last CEC message received from connected device. Example: give_power_status"

- id: uart_recognizer_rx
  type: string
  description: "Last RS-232 recognized message (string, max 12 bytes). Example: Login:"

- id: uart_recognizer_rx_hex
  type: string
  description: "Last RS-232 recognized message in hex. Example: FF1F4C6F67696E3A"

- id: uart_recognizer_active_rx
  type: string
  description: "Last RS-232 active recognized message (string). Cleared after ActivePropertyTimeout"

- id: uart_recognizer_active_rx_hex
  type: string
  description: "Last RS-232 active recognized message (hex). Cleared after ActivePropertyTimeout"

- id: tcp_recognizer_rx
  type: string
  description: "Last TCP recognized message (string, max 128 bytes). Example: PWR_off"

- id: tcp_recognizer_rx_hex
  type: string
  description: "Last TCP recognized message in hex. Example: 5057525F6F6666"

- id: tcp_recognizer_active_rx
  type: string
  description: "Last TCP active recognized message (string, max 12 bytes). Example: AudOut+"

- id: tcp_recognizer_active_rx_hex
  type: string
  description: "Last TCP active recognized message (hex). Example: 4175644F75742B00"

- id: event_condition_count
  type: integer
  description: "Number of times the event condition has been detected and triggered. Reset at boot"

- id: event_external_condition_trigger_count
  type: integer
  description: "Number of times the event condition has been triggered externally. Reset at boot"
```

## Variables
```yaml
# Source documents user-defined Variables (§7.11) on certain models (TX140K / TX140-Plus / WP-130-Plus-US).
# 30 slots; numeric (-2147483648..2147483647) or string (≤15 chars); non-volatile.
- id: var_value
  type: number_or_string
  description: "Current value of variable slot V<loc>. Numeric (-2147483648..2147483647) or string (max 15 chars)"
  address: "/CTRL/VARS/V{loc}.Value"
- id: var_loc
  type: integer
  description: "Variable slot index (1..30)"
- id: var_operand
  type: integer
  description: "Value added/subtracted in add/cycle methods"
- id: var_min
  type: integer
  description: "Optional minimum clamp value"
- id: var_max
  type: integer
  description: "Optional maximum clamp value"
- id: var_case_min
  type: integer
  description: "Minimum value of an interval in the case() method"
- id: var_case_max
  type: integer
  description: "Maximum value of an interval in the case() method"
- id: var_case_newval
  type: integer
  description: "Replacement value applied when value falls within the interval"
- id: var_scanf_pattern
  type: string
  description: "Printf-style scanf pattern: %s, %<n>s, %c, %<n>c, %[chars], %[^chars], %*, literal text. Escape % as \\%"
- id: var_printf_format
  type: string
  description: "Format string with literal prefix, %s placeholder, and literal postfix"
```

## Events
```yaml
# LW3 unsolicited notifications (CHG) the source documents.
- id: lw3_change_notification
  type: string
  description: "Asynchronous 'change message' notification: 'CHG <node_path>.<property>=<value>'. Sent after subscription (OPEN/OPEN *) when subscribed property changes. Example: 'CHG /MEDIA/AUDIO/O3.VolumePercent=50.00'"
- id: lw3_subscription_open_response
  type: string
  description: "Response prefix 'o-' returned when subscribing (OPEN) to a node. Example: 'o- /MEDIA/VIDEO'"
- id: lw3_subscription_close_response
  type: string
  description: "Response prefix 'c-' returned when unsubscribing (CLOSE) from a node. Example: 'c- /MEDIA/VIDEO'"
```

## Macros
```yaml
# Source documents LW3 macros on certain models (TX140K / TX140-Plus / WP-130-Plus-US). Max 50 macros per device.
# Storage: non-volatile internal preset slot; uploaded as .LW3 file via LDC.
# Format: ';myDeviceMacros' header, ';Begin <macro_name>' / '<LW3 commands>' / ';End <macro_name>' body.
- id: macro_run
  type: string
  description: "Run a stored macro by name. Command: 'CALL /CTRL/MACROS:run(<macro_name>)'. Example macro body (CALL commands with method syntax): 'CALL /MEDIA/VIDEO/XP:unmuteSource(I3)' / 'CALL /MEDIA/VIDEO/XP:switch(I3:O1;I3:O2)'"
- id: macro_name
  type: string
  description: "Unique macro name within the preset"
- id: macro_commands
  type: string
  description: "Semicolon- or newline-separated LW3 SET and CALL commands (syntax not checked at upload; errors not reported)"
```

## Safety
```yaml
confirmation_required_for:
  - factory_defaults_reset  # LW2 {FACTORY=ALL} and LW3 CALL /SYS:factoryDefaults() reset all settings
  - firmware_update         # LW3 firmware update mode forced via front panel (Show Me pressed at power-on)
interlocks: []
# UNRESOLVED: source contains a CE/CEC safety note about ordering transmission but does not
# describe hardware interlocks; Cleartext Login blocks configuration but is itself optional
# (and gated to higher-tier models).
```

## Notes
- Default static IP per source: 192.168.0.100.
- Default RS-232 settings per source example: 9600, 8N1 (LDC CLI example uses COM1:57600 for serial discovery). Both are configurable; baud rate options are 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200; data bits 8 or 9; parity N/O/E; stop bits 1, 1.5, 2.
- LW2 framing: commands wrapped in `{ ... }`, responses in `( ... )`, line-terminated CrLf (0x0D, 0x0A). All inputs are converted to uppercase; responses may mix case.
- LW3 framing: ASCII, all command/response lines terminated with CrLf ("\r\n"). Max line length 800 bytes.
- LW3 response prefixes: `pr` (read-only property), `pw` (read-write property), `ns` (child node), `n-` (node), `nm` (node manual), `pm` (property manual), `m-` (method), `mm` (method manual), `mO` (method OK), `mF` (method failed), `pE` (property error), `mE` (method error), `nE` (node error), `o-` (subscribe ok), `c-` (unsubscribe ok), `CHG` (change notification).
- LW3 escaping: special characters `\ { } # % ( ) \r \n \t` must be backslash-escaped inside parameter values; hex bytes can be inserted as `\xNN` (e.g. `CALL /MEDIA/UART/P1:sendMessage(PWR0\x0D\x0A)`).
- LW3 signature prefix: optional 4-digit hex before a command groups its response lines between `{...}` braces (e.g. `1700#GET /EDID.*`).
- LW3 subscription model: `OPEN <path>` / `OPEN <path>/*` to subscribe; `CLOSE` to unsubscribe; per-connection. Re-subscribing required after socket break.
- The source is a multi-model family manual; some commands are gated to specific variants and firmware versions:
  - **Cleartext Login** (LOGIN:*), **Wake-on-LAN**, **Hostname**, **MAC filter**, **Service filter (LW2/HTTP port blocking)**: TX140K / TX140-Plus / WP-UMX-TPS-TX130-Plus-US from FW v1.5.0b4 (UMX) / v1.5.0b6 (FP/WP).
  - **CEC send/sendClick/sendHex/OsdString**: TX140K / TX140-Plus from v1.3.0b11, WP-130-Plus-US from v1.4.0b8.
  - **HTTP Clients & Salvo HTTP**: TX140K / TX140-Plus from v1.5.0b4, WP-130-Plus-US from v1.5.0b6.
  - **TCP Clients / TCP Message Recognizer**: TX140K / TX140-Plus from v1.5.0b4, WP-130-Plus-US from v1.5.0b6.
  - **Macros / Variables**: TX140K / TX140-Plus from v1.5.0b4, WP-130-Plus-US from v1.5.0b6.
  - **RS-232 Message Recognizer**: TX140K / TX140-Plus from v1.3.0b11, WP-130-Plus-US from v1.4.0b8.
  - **GPIO port**: TX130, TX140, TX140K, TX140-Plus models ONLY (FP-UMX-TPS-TX120 is NOT listed in §3.4.13 as having a GPIO port — section applies to UMX-TPS-TX130/TX140/TX140K/TX140-Plus only).
- SalvoHttp endpoint (per source §5.15): POST to `<IP_address>/protocol.lw3` delivers a batch of LW3 commands to the Lightware device; LW3 responses are not sent back to the poster. If Cleartext Login is enabled, login must be the first command.
- HTTP Clients from the Lightware device to third-party devices: HTTP only (no HTTPS); POST/PUT only — response is just an ACK, not suitable for parameter querying.

<!-- UNRESOLVED:
- Specific applicability of optional features to the FP-UMX-TPS-TX120 sub-model not always stated in source; many are explicitly listed for TX140K / TX140-Plus / WP-130-Plus-US only.
- Voltage / current ratings, firmware-version compatibility ranges, and binary hex tables for the bootload firmware update are not included.
- GPIO pin count and presence for FP-UMX-TPS-TX120 specifically: source §3.4.13 lists TX130/TX140/TX140K/TX140-Plus only as having GPIO.
- Default port-block state for LW2 (10001) and HTTP (80) ports on FP-UMX-TPS-TX120: source notes LW2 should typically be blocked when Cleartext Login is used, but does not state FP-UMX-TPS-TX120 default state.
- Specific protocol version numbers for LW2/LW3: source does not state version numbers; only describes protocol behaviour.
-->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
  - lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/UMX-TPS-TX100_Series_UserManual.pdf
  - https://lightware.com
retrieved_at: 2026-08-11T09:46:43.951Z
last_checked_at: 2026-08-19T09:30:07.196Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:30:07.196Z
matched_actions: 184
action_count: 184
confidence: medium
summary: "All 184 spec actions match source verbatim; transport parameters (port 10001/6107, baud 9600 8N1, IP 192.168.0.100) confirmed; coverage ratio well above 0.9 floor. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EVENTS/E<loc>.ConditionEndCheck"
- "EVENTS/E<loc>.ConditionTimeoutContinuous"
- "EVENTS/E<loc>.ConditionTimeoutPending"
- "EVENTS/E<loc>.ConditionDetect"
- "OPEN /MEDIA/VIDEO"
- "CLOSE /MEDIA/VIDEO"
- "/MEDIA/UART/<port>.CommandInjectionStatus"
- "{GPIO<pin_nr>=<dir>;<level>}"
- "source is a multi-model family manual; per-variant applicability of some commands (Macros, Variables, GPIO, CEC, HTTP, Cleartext Login, Wake-on-LAN, Message Recognizers, MAC filter, port blocking, hostname) is gated by firmware version, model suffix (-130/-140/-140K/-140-Plus/FP-/WP-) and is not always called out for the FP-UMX-TPS-TX120 specifically. Treat all conditional features as UNRESOLVED for this base spec."
- "source does not document flow-control explicitly"
- "source has no dedicated power-on / power-off command for FP-UMX-TPS-TX120; only reboot / factory-reset"
- "source contains a CE/CEC safety note about ordering transmission but does not"
- "- Specific applicability of optional features to the FP-UMX-TPS-TX120 sub-model not always stated in source; many are explicitly listed for TX140K / TX140-Plus / WP-130-Plus-US only."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
