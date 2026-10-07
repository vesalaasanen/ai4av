---
spec_id: admin/lightware-fp-umx-tps-tx120-ges4
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware FP-UMX-TPS-TX120-GES4 Control Spec"
manufacturer: Lightware
model_family: FP-UMX-TPS-TX120-GES4
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - FP-UMX-TPS-TX120-GES4
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://go.lightware.com/umx-tps-tx100-s-pum
  - https://academy.lightware.com/
retrieved_at: 2026-08-11T07:54:49.108Z
last_checked_at: 2026-10-07T22:11:09.783Z
generated_at: 2026-10-07T22:11:09.783Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "CALL·/MEDIA/AUDIO/XP:setAutoselectionPriority"
  - "<IP_address>/protocol.lw3"
  - "firmware version compatibility not stated in source"
  - "no default stated; selectable 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200"
  - "no default stated; selectable 8 or 9"
  - "no default stated; selectable None (N), Odd (O), Even (E)"
  - "no default stated; selectable 1, 1.5, 2"
  - "flow control not stated in source"
  - "LW3 uses TCP port 6107 (per source §7.2); not enumerated above since protocols.port holds one value. See Notes."
  - "source repeats B2\""
  - "source table conflicts with example false\""
  - "§7.7.8 has a malformed audio priority command template and a video-path example."
  - "source example sets true, while the summary specifies ConditionEndCheck for this delay type\""
  - "§7.12.5 uses ApplySettings, while §7.12.1–7.12.4 use applySettings."
  - "source length wording is inconsistent\""
  - "§7.23 says GPIO port number 1..8, conflicting with the seven-pin descriptions."
  - "per source §7 the LW3 protocol tree includes MANY additional sub-systems (Video Port Settings, Audio Port Settings, Analog Audio Input Level Settings, Event Manager, Variable Management, Ethernet Port Config, Ethernet Tool Kit, Ethernet Message Sending, HTTP Messaging, TCP Message Recognizer, RS-232 Port Config, RS-232 Message Sending, RS-232 Message Recognizer, Sending CEC Commands, Infrared Port Config, Infrared Message Sending, GPIO Port Config, EDID Management). The refined source excerpt does not enumerate every node/property/method detail; only the protocol structure and example commands are documented. Implementer should consult the LW3 programmer's reference §7 for full coverage."
  - "source §7.10 Variable-Management detail not in excerpt; refer to LW3 programmer's reference."
  - "FP-UMX-TPS-TX120-GES4 macro availability depends on exact firmware/model variant; this is a Plus-tier feature."
  - "explicit confirmation text not quoted in source, but \"Load factory defaults\" prompts per source §5.11.4"
  - "no explicit confirmation prompt documented for {RST} in source"
  - "source mentions \"Cleartext Login\" protection (§5.12.5) and \"Lock front panel\" (§5.12.3) but no interlock procedure spec."
verification:
  verdict: verified
  checked_at: 2026-10-07T22:11:09.783Z
  matched_actions: 234
  action_count: 234
  confidence: medium
  summary: "All 234 action units map to literal source commands and the port 10001 claim is supported. Many LW3 features are marked in the source as TX140K/Plus-only, so applicability to the TX120-GES4 is a caveat. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# Lightware FP-UMX-TPS-TX120-GES4 Control Spec

## Summary
The Lightware FP-UMX-TPS-TX120-GES4 is a TPS (HDBaseT) transmitter/extender from the UMX-TPS-TX100 series. This spec covers the device's control interfaces: RS-232 (LW2 and LW3 protocols) plus TCP/IP control on ports 10001 (LW2) and 6107 (LW3), as documented in the UMX-TPS-TX100 series user manual.

<!-- UNRESOLVED: firmware version compatibility not stated in source -->

## Transport
```yaml
protocols:
  - serial
  - tcp
addressing:
  port: 10001  # LW2 protocol port, per source §6.2
serial:
  baud_rate: null  # UNRESOLVED: no default stated; selectable 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200
  data_bits: null  # UNRESOLVED: no default stated; selectable 8 or 9
  parity: null  # UNRESOLVED: no default stated; selectable None (N), Odd (O), Even (E)
  stop_bits: null  # UNRESOLVED: no default stated; selectable 1, 1.5, 2
  flow_control: UNRESOLVED  # UNRESOLVED: flow control not stated in source
auth:
  type: UNRESOLVED  # source does not state this (was inferred none: no auth procedure in source)
```

<!-- UNRESOLVED: LW3 uses TCP port 6107 (per source §7.2); not enumerated above since protocols.port holds one value. See Notes. -->

## Traits
```yaml
- powerable  # inferred: factory-reset and reboot commands present, not explicit power on/off
- routable  # inferred: crosspoint switch commands present (LW2 {<in>@<out>·<layer>}; LW3 CALL /MEDIA/VIDEO/XP:switch)
- queryable  # inferred: extensive query commands present (product type, label, firmware, serial, IP status, etc.)
- levelable  # inferred: GPIO pin level setting commands present (LW2 {GPIO<pin_nr>=<dir>;<level>})
```

## Actions
```yaml
# LW2 protocol commands (per source §6) - sent as ASCII strings wrapped in { } over RS-232 (local or TPS link) or TCP port 10001.

- id: lcmd
  label: List All Available LW2 Commands
  kind: query
  command: "{lcmd}"
  params: []

- id: i
  label: Viewing Product Type
  kind: query
  command: "{i}"
  params: []

- id: label_query
  label: Querying the Device Label
  kind: query
  command: "{label}"
  params: []

- id: p_query
  label: Querying the Control Protocol
  kind: query
  command: "{P_?}"
  params: []

- id: firmware_version_query
  label: Viewing Firmware Version of the CPU
  kind: query
  command: "{F}"
  params: []

- id: ping
  label: Connection Test
  kind: query
  command: "{PING}"
  params: []

- id: ct
  label: Compile Time
  kind: query
  command: "{CT}"
  params: []

- id: s_query
  label: Viewing Serial Number
  kind: query
  command: "{S}"
  params: []

- id: is_query
  label: Viewing the Installed Boards
  kind: query
  command: "{IS}"
  params: []

- id: fc_query
  label: Viewing Firmware for All Controllers
  kind: query
  command: "{FC}"
  params: []

- id: st_query
  label: Querying Health Status
  kind: query
  command: "{ST}"
  params: []

- id: rst
  label: Restarting the Device
  kind: action
  command: "{RST}"
  params: []

- id: factory_all
  label: Restoring Factory Default Settings
  kind: action
  command: "{FACTORY=ALL}"
  params: []

- id: switch_in_out
  label: Switching an Input to the Outputs (LW2)
  kind: action
  command: "{<in>@<out> <layer>}"  # <in>: I1..I6 or 0 (disconnect); <out>: O1; <layer>: A | V | AV
  params:
    - name: in
      type: string
      description: Input port (I1..I6 or 0 to disconnect)
    - name: out
      type: string
      description: Output port (e.g. O1)
    - name: layer
      type: string
      description: Signal layer - A (audio), V (video), or AV (both)

- id: mute_output
  label: Muting an Output (LW2)
  kind: action
  command: "{#<out> <layer>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: layer
      type: string
      description: A | V | AV

- id: unmute_output
  label: Unmuting an Output (LW2)
  kind: action
  command: "{+<out> <layer>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: layer
      type: string
      description: A | V | AV

- id: lock_output
  label: Locking an Output (LW2)
  kind: action
  command: "{#><out> <layer>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: layer
      type: string
      description: A | V | AV

- id: unlock_output
  label: Unlocking an Output (LW2)
  kind: action
  command: "{+<<out> <layer>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: layer
      type: string
      description: A | V | AV

- id: vc_query
  label: Viewing Connection State on the Output (LW2)
  kind: query
  command: "{VC <layer>}"
  params:
    - name: layer
      type: string
      description: A | V | AV

- id: getsize_query
  label: Viewing the Crosspoint Size (LW2)
  kind: query
  command: "{getsize <layer>}"
  params:
    - name: layer
      type: string
      description: A | V | AV

- id: as_v_set
  label: Changing the Video Autoselect Mode (LW2)
  kind: action
  command: "{AS_V<out>=<state>;<mode>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: state
      type: string
      description: E (enable) or D (disable)
    - name: mode
      type: string
      description: F (first detect) | L (last detect) | P (priority detect)

- id: as_a_set
  label: Changing the Audio Autoselect Mode (LW2)
  kind: action
  command: "{AS_A<out>=<state>;<mode>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: state
      type: string
      description: E (enable) or D (disable)
    - name: mode
      type: string
      description: F | L | P

- id: prio_v_set
  label: Changing the Video Input Priorities (LW2)
  kind: action
  command: "{PRIO_V<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: priorities
      type: string
      description: Semicolon-separated priority numbers (0=highest, 5=lowest, 31=skip)

- id: prio_a_set
  label: Changing the Audio Input Priorities (LW2)
  kind: action
  command: "{PRIO_A<out>=<in1_prio>;<in2_prio>;…;<inn_prio>}"
  params:
    - name: out
      type: string
      description: Output port
    - name: priorities
      type: string
      description: Semicolon-separated priority numbers (0=highest, 5=lowest, 31=skip)

- id: ip_stat_query
  label: Querying the Current IP Status (LW2)
  kind: query
  command: "{IP_STAT=?}"
  params: []

- id: ip_address_set
  label: Setting the IP Address (LW2)
  kind: action
  command: "{IP_ADDRESS=<type>;<ip_address>}"
  params:
    - name: type
      type: string
      description: 0 (static) or 1 (DHCP)
    - name: ip_address
      type: string
      description: IPv4 address (four decimal octets)

- id: ip_netmask_set
  label: Setting the Subnet Mask (LW2)
  kind: action
  command: "{IP_NETMASK=<subnet_mask>}"
  params:
    - name: subnet_mask
      type: string
      description: Subnet mask

- id: ip_gateway_set
  label: Setting the Gateway Address (LW2)
  kind: action
  command: "{IP_GATEWAY=<gateway_addr>}"
  params:
    - name: gateway_addr
      type: string
      description: Gateway address

- id: ip_apply
  label: Applying Network Settings (LW2)
  kind: action
  command: "{ip_apply}"
  params: []

- id: eth_enable_set
  label: Enabling/Disabling the Ethernet Port (LW2)
  kind: action
  command: "{ETH_ENABLE=<switch>}"
  params:
    - name: switch
      type: string
      description: 0 (disable) or 1 (enable)

- id: rs232_set
  label: Setting the RS-232 Mode (LW2)
  kind: action
  command: "{RS232=<mode>}"
  params:
    - name: mode
      type: string
      description: CONTROL | CI (command injection) | PASS (pass-through)

- id: rs232_local_format_set
  label: Setting the RS-232 Parameters (LW2, local port)
  kind: action
  command: "{RS232_LOCAL_FORMAT=<BaudRate>;<DataBit>;<Parity>;<StopBit>}"
  params:
    - name: BaudRate
      type: string
      description: 4800 | 7200 | 9600 | 14400 | 19200 | 38400 | 57600 | 115200 | X (no change)
    - name: DataBit
      type: string
      description: 8 | 9 | X (no change)
    - name: Parity
      type: string
      description: N | E | O | X (no change)
    - name: StopBit
      type: string
      description: 1 | 1,5 | 2 | X (no change)

- id: rs232_local_prot_set
  label: Setting the Control Protocol of the RS-232 Port (LW2)
  kind: action
  command: "{RS232_LOCAL_PROT=<protocol>}"
  params:
    - name: protocol
      type: string
      description: LW2 | LW3

- id: rs232_link_format_set
  label: Setting the Format of the Serial Port Link (LW2, TPS link)
  kind: action
  command: "{RS232_LINK_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}"
  params:
    - name: baud_rate
      type: string
      description: As above
    - name: data_bit
      type: string
      description: 8 | 9 | X
    - name: parity
      type: string
      description: N | E | O | X
    - name: stop_bit
      type: string
      description: 1 | 1,5 | 2 | X

- id: rs232_link_prot_set
  label: Setting the Protocol of the Serial Port Link (LW2, TPS link)
  kind: action
  command: "{RS232_LINK_PROT=<protocol>}"
  params:
    - name: protocol
      type: string
      description: LW2 | LW3

- id: gpio_set
  label: Setting the Level and Direction for Each GPIO Pin (LW2)
  kind: action
  command: "{GPIO<pin_nr>=<dir>;<level>}"
  params:
    - name: pin_nr
      type: string
      description: 0-6
    - name: dir
      type: string
      description: I (input) | O (output)
    - name: level
      type: string
      description: L (low) | H (high) | T (toggle)

# LW3 protocol commands (per source §7) - ASCII tree-path commands terminated with CrLf (\r\n), over TCP port 6107 or RS-232 with LW3 protocol mode. GET/SET/CALL/MAN/OPEN/CLOSE prefixes.

- id: lw3_get_product_name
  label: Querying the Product Name (LW3)
  kind: query
  command: "GET /.ProductName\r\n"
  params: []

- id: lw3_set_device_label
  label: Setting the Device Label (LW3)
  kind: action
  command: "SET /MANAGEMENT/UID.DeviceLabel=<Custom_name>\r\n"
  params:
    - name: Custom_name
      type: string
      description: Up to 39 ASCII characters

- id: lw3_get_signal_present
  label: Querying Signal Present on Input (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/I2.SignalPresent\r\n"
  params:
    - name: input
      type: string
      description: Input port node (e.g. I1, I2, I3, I4, I5, I6)

- id: lw3_switch
  label: Switch Crosspoint (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(I1:O1)\r\n"
  params:
    - name: connections
      type: string
      description: Semicolon-separated list of I{port}:O{port} pairs

- id: lw3_set_color_space
  label: Set Color Space Mode on Input (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/I1.ColorSpaceMode=0\r\n"
  params:
    - name: input
      type: string
      description: Input port node
    - name: mode
      type: string
      description: ColorSpaceMode value (0=Auto, etc. - see MAN)

- id: lw3_man
  label: Query Property Manual (LW3)
  kind: query
  command: "MAN /MEDIA/VIDEO/O1.Pwr5vMode\r\n"
  params:
    - name: path
      type: string
      description: Property path (e.g. /MEDIA/VIDEO/O1.Pwr5vMode)

- id: lw3_getall_uart
  label: GETALL UART Node (LW3)
  kind: query
  command: "GETALL /MEDIA/UART\r\n"
  params: []

- id: lw3_serial_number_query
  label: Query Serial Number (LW3)
  kind: query
  command: "GET /.SerialNumber\r\n"
  params: []

- id: lw3_open_subscribe
  label: Subscribe to Node (LW3)
  kind: action
  command: "OPEN /MEDIA/VIDEO\r\n"
  params:
    - name: node_path
      type: string
      description: LW3 node path or wildcard (e.g. /MEDIA/VIDEO/*)

- id: lw3_close_unsubscribe
  label: Unsubscribe from Node (LW3)
  kind: action
  command: "CLOSE /MEDIA/VIDEO\r\n"
  params:
    - name: node_path
      type: string
      description: LW3 node path or wildcard

# Additional documented commands. Literal source notation is retained:
# · denotes a space (0x20); LW3 commands require the CrLf terminator described above.
# Template parameters must be substituted; example commands use the params shape of the existing entries.
# Model-specific availability stated below does not establish support on FP-UMX-TPS-TX120-GES4.

- id: as_v_query
  label: Query Video Autoselect Mode (LW2)
  kind: query
  command: "{as_v<out>=?}"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED

- id: as_a_query
  label: Query Audio Autoselect Mode (LW2)
  kind: query
  command: "{as_a<out>=?}"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED

- id: prio_v_query
  label: Query Video Input Priorities (LW2)
  kind: query
  command: "{prio_v<out>=?}"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED

- id: prio_a_query
  label: Query Audio Input Priorities (LW2)
  kind: query
  command: "{prio_a<out>=?}"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED

- id: ip_address_query
  label: Query Stored Static IP Address (LW2)
  kind: query
  command: "{ip_address=?}"
  params: []

- id: ip_gateway_query
  label: Query Stored Static Gateway Address (LW2)
  kind: query
  command: "{ip_gateway=?}"
  params: []

- id: rs232_query
  label: Query RS-232 Mode (LW2)
  kind: query
  command: "{RS232=?}"
  params: []

- id: rs232_local_format_query
  label: Query Local RS-232 Parameters (LW2)
  kind: query
  command: "{RS232_LOCAL_FORMAT=?}"
  params: []

- id: rs232_local_prot_query
  label: Query Local RS-232 Control Protocol (LW2)
  kind: query
  command: "{RS232_LOCAL_PROT=?}"
  params: []

- id: lw3_get_active_subscriptions
  label: Get Active Subscriptions (LW3)
  kind: query
  command: "OPEN"
  params: []

- id: lw3_get_edid_node_signed
  label: Query EDID Node With Signature (LW3)
  kind: query
  command: "1700#GET /EDID.*"
  params:
    - name: signature
      type: string
      description: 4-digit-long hexadecimal value

- id: lw3_get_audio_volume_percent
  label: Query Audio Volume Percent (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/O3.VolumePercent"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED; source example O3

- id: lw3_set_audio_volume_percent
  label: Set Audio Volume Percent (LW3)
  kind: action
  command: "SET /MEDIA/AUDIO/O3.VolumePercent=50.00"
  params:
    - name: out
      type: string
      description: Output port; range UNRESOLVED; source example O3
    - name: value
      type: string
      description: UNRESOLVED; source example 50.00

- id: lw3_get_firmware_version
  label: Query Firmware Version (LW3)
  kind: query
  command: "GET /SYS/MB.FirmwareVersion"
  params: []

- id: lw3_reset
  label: Reset Device (LW3)
  kind: action
  command: "CALL /SYS:reset()"
  params: []

- id: lw3_factory_defaults
  label: Restore Factory Default Settings (LW3)
  kind: action
  command: "CALL /SYS:factoryDefaults()"
  params: []

- id: lw3_set_control_lock
  label: Set Front Panel Control Lock (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI.ControlLock=<lock_status>"
  params:
    - name: lock_status
      type: string
      description: "1: None; 2: Locked; 3: Force locked"

- id: lw3_set_button_default_function
  label: Set Front Panel Button Default Function (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI/BUTTONS/<btn_id>.DefaultFunctionEnable=<btn_status>"
  params:
    - name: btn_id
      type: string
      description: "B1: Video select; B2: Audio select; B2: Show me button; UNRESOLVED: source repeats B2"
    - name: btn_status
      type: string
      description: "Enable | Disable; UNRESOLVED: source table conflicts with example false"

- id: lw3_set_dark_mode
  label: Set Dark Mode (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeEnable=<status>"
  params:
    - name: status
      type: string
      description: true | false

- id: lw3_set_dark_mode_delay
  label: Set Dark Mode Delay (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeDelay=<delay_time>"
  params:
    - name: delay_time
      type: string
      description: Delay time in seconds; range UNRESOLVED

# §7.4.11 and §7.5: TX140K/TX140-Plus from v1.5.0b4;
# WP-UMX-TPS-TX130-Plus-US from v1.5.0b6.
- id: lw3_run_macro
  label: Run Macro (LW3)
  kind: action
  command: "CALL·/CTRL/MACROS:run(<macro_name>)"
  params:
    - name: macro_name
      type: string
      description: Unique macro name; length UNRESOLVED

- id: lw3_set_login_password
  label: Set Login Password (LW3)
  kind: action
  command: "CALL·/LOGIN:setPassword(<password>)"
  params:
    - name: password
      type: string
      description: UNRESOLVED

- id: lw3_login
  label: Log Into Device (LW3)
  kind: action
  command: "CALL·/LOGIN:login(<password>)"
  params:
    - name: password
      type: string
      description: UNRESOLVED

- id: lw3_logout
  label: Log Out of Device (LW3)
  kind: action
  command: "CALL·/LOGIN:logout(<password>)"
  params:
    - name: password
      type: string
      description: UNRESOLVED

- id: lw3_set_login_enable
  label: Enable or Disable Cleartext Login (LW3)
  kind: action
  command: "SET /LOGIN.LoginEnable=true"
  params:
    - name: login_state
      type: string
      description: true (or 1) | false (or 0); LoggedIn must be true

- id: lw3_get_video_source_status
  label: Query Video Source Port Status (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []

- id: lw3_get_video_destination_status
  label: Query Video Destination Port Status (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortStatus"
  params: []

- id: lw3_get_video_connections
  label: Query Video Crosspoint Setting (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []

# Video disconnection is covered by the existing parameterized lw3_switch action.
- id: lw3_get_video_connected_source
  label: Query Connected Video Input Port (LW3)
  kind: query
  command: "GET·/MEDIA/VIDEO/<out>.ConnectedSource"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6); feature from v1.5.0b6 for FP/WP series

- id: lw3_get_video_autoselect
  label: Query Video Autoselect Settings (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []

- id: lw3_set_video_autoselect
  label: Set Video Autoselect Mode (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:setDestinationPortAutoselect(<out1_set>;<out2_set>;<…>;<out#_set>)"
  params:
    - name: settings
      type: string
      description: "Output settings separated by semicolons; E | D; F | P | L; source examples O1:EP and O1:D"

- id: lw3_get_video_priorities
  label: Query Video Input Priorities (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.PortPriorityList"
  params: []

- id: lw3_set_video_priorities
  label: Set Video Input Priorities (LW3)
  kind: action
  command: 'CALL /MEDIA/VIDEO/XP:setAutoselectionPriority(I1\(O1\):4;I2\(O1\):4)'
  params:
    - name: priorities
      type: string
      description: 'Semicolon-separated settings in <in>\(<out>\):<prio> format; Priority number from 0 to 31, equal numbers are allowed (31 means that the port will be skipped from the priority list)'

- id: lw3_mute_video_source
  label: Mute Video Input (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 | I3 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unmute_video_source
  label: Unmute Video Input (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 | I3 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_lock_video_source
  label: Lock Video Input (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 | I3 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unlock_video_source
  label: Unlock Video Input (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 | I3 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_mute_video_destination
  label: Mute Video Output (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unmute_video_destination
  label: Unmute Video Output (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_lock_video_destination
  label: Lock Video Output (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unlock_video_destination
  label: Unlock Video Output (LW3)
  kind: action
  command: "CALL·/MEDIA/VIDEO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_set_input_hdcp
  label: Set Input HDCP Capability (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<in>.HdcpEnable=<logical_value>"
  params:
    - name: in
      type: string
      description: Digital video inputs (I2, I3, I4) only; FP-UMX-TPS-TX120 HDMI input is I2 (§11.7.6)
    - name: logical_value
      type: string
      description: true | false

- id: lw3_set_test_pattern_mode
  label: Set Test Pattern Generator Mode (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<in>.FreeRunMode=<mode>"
  params:
    - name: in
      type: string
      description: Input port; applicable port range UNRESOLVED
    - name: mode
      type: string
      description: "0: Always off; 1: Always on; 2: Auto"

- id: lw3_set_test_pattern_color
  label: Set Test Pattern Color (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<in>.FreeRunColor=<RGB_code>"
  params:
    - name: in
      type: string
      description: Input port; applicable port range UNRESOLVED
    - name: rgb_code
      type: string
      description: RGB color in RR;GG;BB format (separated by semicolons); component ranges UNRESOLVED

- id: lw3_set_test_pattern_resolution
  label: Set Test Pattern Resolution (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<in>.FreeRunResolution=<resolution>"
  params:
    - name: in
      type: string
      description: Input port; applicable port range UNRESOLVED
    - name: resolution
      type: string
      description: "0: 640x480p60; 1: 720x480i60; 2: 720x480p60; 3: 720x576i50; 4: 720x576p50; 5: 800x600p60; 6: 1024x768p60; 7: 1280x720p60; 8: 1280x1024p60; 9: 1280x1080i60; 10: 1920x1080p60; 11: 1920x1200p60"

- id: lw3_set_output_hdcp
  label: Set Output HDCP Mode (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<out>.HdcpModeSetting=<HDCP_mode>"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: hdcp_mode
      type: string
      description: "0: Auto; 1: Always"

- id: lw3_set_output_hdmi_mode
  label: Set Output HDMI Mode (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<out>.HdmiModeSetting=<mode>"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: mode
      type: string
      description: "0: Auto; 1: DVI; 2: HDMI 24 bit; 3: HDMI 30 bit; 4: HDMI 36 bit"

- id: lw3_set_output_color_space
  label: Set Output Color Space (LW3)
  kind: action
  command: "SET·/MEDIA/VIDEO/<out>.ColorSpaceSetting=<colorspace>"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: colorspace
      type: string
      description: "0: Auto; 1: RGB; 2: YCbCr 4:4:4; 3: YCbCr 4:2:2"

- id: lw3_set_tps_mode
  label: Set TPS Mode (LW3)
  kind: action
  command: "SET·/REMOTE/<port>.tpsModeSetting=<tps_mode>"
  params:
    - name: port
      type: string
      description: UNRESOLVED; source example S1
    - name: tps_mode
      type: string
      description: "A: Auto; H: HDBaseT; L: Longreach; 1: LPPF1; 2: LPPF2"

- id: lw3_get_audio_source_status
  label: Query Audio Source Port Status (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.SourcePortStatus"
  params: []

- id: lw3_get_audio_destination_status
  label: Query Audio Destination Port Status (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortStatus"
  params: []

- id: lw3_get_audio_connections
  label: Query Audio Crosspoint Setting (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationConnectionList"
  params: []

- id: lw3_switch_audio
  label: Switch Audio Input (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:switch(<in>:<out>)"
  params:
    - name: in
      type: string
      description: I1 | I2 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_get_audio_autoselect
  label: Query Audio Autoselect Settings (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortAutoselect"
  params: []

- id: lw3_set_audio_autoselect
  label: Set Audio Autoselect Mode (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:setDestinationPortAutoselect(<out>:<out_set>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: out_set
      type: string
      description: "Two-letter code; 1st letter E | D; 2nd letter F | P | L | S; source also documents D to disable without changing other settings"

- id: lw3_get_audio_priorities
  label: Query Audio Input Priorities (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.PortPriorityList"
  params: []

# UNRESOLVED: §7.7.8 has a malformed audio priority command template and a video-path example.
# No corrected audio priority command is inferred.
- id: lw3_mute_audio_source
  label: Mute Audio Input (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
      description: Input port or semicolon-separated inputs; I1 | I2 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unmute_audio_source
  label: Unmute Audio Input (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
      description: Input port or semicolon-separated inputs; I1 | I2 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_lock_audio_source
  label: Lock Audio Input (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unlock_audio_source
  label: Unlock Audio Input (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
      description: I1 | I2 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_mute_audio_destination
  label: Mute Audio Output (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unmute_audio_destination
  label: Unmute Audio Output (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_lock_audio_destination
  label: Lock Audio Output (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_unlock_audio_destination
  label: Unlock Audio Output (LW3)
  kind: action
  command: "CALL·/MEDIA/AUDIO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string
      description: O1 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_set_analog_audio_volume
  label: Set Analog Audio Input Volume (LW3)
  kind: action
  command: "SET·/MEDIA/AUDIO/<in>.Volume=<level>"
  params:
    - name: in
      type: string
      description: I1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: level
      type: string
      description: between -95.625 dB and 0 dB in step of -0.375 dB

- id: lw3_set_analog_audio_balance
  label: Set Analog Audio Input Balance (LW3)
  kind: action
  command: "SET·/MEDIA/AUDIO/<in>.Balance=<level>"
  params:
    - name: in
      type: string
      description: I1 for FP-UMX-TPS-TX120 series (§11.7.6)
    - name: level
      type: string
      description: 0 means left balance, 100 means right balance, step is 1. Center is 50 (default).

- id: lw3_set_event_condition
  label: Set Event Condition (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.Condition=<expression>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: expression
      type: string
      description: "<node_path>.<property>=<value>; property change can use a trailing ?; linked event number without E, or up to four event numbers joined by &; combined links and change-to-anything require the firmware versions stated in §7.9"

- id: lw3_set_event_condition_inverted
  label: Invert Event Condition (LW3)
  kind: action
  command: "SET /EVENTS/E2.ConditionInverted=true"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: value
      type: string
      description: true; other accepted values UNRESOLVED

- id: lw3_set_event_action
  label: Set Event Action (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.Action=<expression>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: expression
      type: string
      description: "<node_path>.<property_or_method>=<value>; use dot for both properties and methods, no method brackets; alternatively linked event number without E, or macro name where supported (§7.9.6)"

- id: lw3_get_macro_name
  label: Query Macro Name (LW3)
  kind: query
  command: "GET /CTRL/MACROS.<id>"
  params:
    - name: id
      type: string
      description: UNRESOLVED; macro feature availability per §7.9.6

- id: lw3_set_event_condition_timeout
  label: Set Event Condition Delay (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.ConditionTimeout=<time>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: time
      type: string
      description: Seconds; 0 means no delay; range UNRESOLVED

- id: lw3_set_event_condition_end_check
  label: Set Event Condition End Check (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.ConditionEndCheck=<true/false>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: value
      type: string
      description: true | false

- id: lw3_set_event_condition_timeout_continuous
  label: Set Continuous Event Condition Delay (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.ConditionTimeoutContinuous=<true/false>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: value
      type: string
      description: true | false

- id: lw3_set_event_condition_timeout_pending
  label: Set Event Condition Timeout Pending (LW3)
  kind: action
  command: "SET /EVENTS/E1.ConditionTimeoutPending=true"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: value
      type: string
      description: "UNRESOLVED: source example sets true, while the summary specifies ConditionEndCheck for this delay type"

- id: lw3_set_event_name
  label: Set Event Name (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.Name=<string>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: string
      type: string
      description: letters (A-Z) and (a-z), numbers (0-9), special characters hyphen ( - ), underscore ( _ ), and space ( ) up to 20 characters

- id: lw3_set_event_enabled
  label: Enable or Disable Event (LW3)
  kind: action
  command: "SET·/EVENTS/E<loc>.Enabled=<true/false>"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED
    - name: value
      type: string
      description: true (or 1) | false (or 0)

# §7.10.4 and §7.10.6: condition triggering is limited to TX140K/TX140-Plus
# from v1.5.0b4 and WP-UMX-TPS-TX130-Plus-US from v1.5.0b6.
- id: lw3_trigger_event_condition
  label: Trigger Event Condition (LW3)
  kind: action
  command: "CALL·/EVENTS/E<loc>:triggerCondition(1)"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED

- id: lw3_get_event_condition_count
  label: Query Event Condition Counter (LW3)
  kind: query
  command: "GET·/EVENTS/E<loc>.ConditionCount"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED

- id: lw3_get_event_trigger_count
  label: Query Event Condition Trigger Counter (LW3)
  kind: query
  command: "GET·/EVENTS/E<loc>.ExternalConditionTriggerCount"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED

- id: lw3_test_event_action
  label: Test Event Action (LW3)
  kind: action
  command: "CALL·/EVENTS/E<loc>:ActionTest(1)"
  params:
    - name: loc
      type: string
      description: Event location; range UNRESOLVED

# §7.11: variables are limited to TX140K/TX140-Plus from v1.5.0b4
# and WP-UMX-TPS-TX130-Plus-US from v1.5.0b6.
- id: lw3_set_variable_value
  label: Assign Variable Value (LW3)
  kind: action
  command: "SET·/CTRL/VARS/V<loc>.Value=<value>"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: value
      type: string
      description: String can be max 15 characters. Numeric variable is defined between -2147483648 and 2147483647.

- id: lw3_get_variable_value
  label: Query Variable Value (LW3)
  kind: query
  command: "GET /CTRL/VARS/V1.Value"
  params:
    - name: loc
      type: string
      description: 1-30

- id: lw3_add_variable
  label: Add to Variable (LW3)
  kind: action
  command: "CALL·/CTRL/VARS/V<loc>:add(<operand>;<min>;<max>)"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: operand
      type: string
      description: Integer; Negative value is also accepted; range UNRESOLVED
    - name: min
      type: string
      description: Integer; optional; Negative value is also accepted; range UNRESOLVED
    - name: max
      type: string
      description: Integer; optional; Negative value is also accepted; range UNRESOLVED

- id: lw3_cycle_variable
  label: Cycle Variable Value (LW3)
  kind: action
  command: "CALL·/CTRL/VARS/V<loc>:cycle(<operand>;<min>;<max>)"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: operand
      type: string
      description: Integer; Negative value is also accepted; range UNRESOLVED
    - name: min
      type: string
      description: Integer; optional; Negative value is also accepted; range UNRESOLVED
    - name: max
      type: string
      description: Integer; optional; Negative value is also accepted; range UNRESOLVED

- id: lw3_case_variable
  label: Convert Variable by Intervals (LW3)
  kind: action
  command: "CALL·/CTRL/VARS/V<loc>:case(<min> <max> <val>;)"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: cases
      type: string
      description: Space-separated Integer min, max, val; interval groups divided by semicolons; Up to 16 cases can be defined; integer ranges UNRESOLVED

- id: lw3_scan_variable
  label: Scan Property Into Variable (LW3)
  kind: action
  command: "CALL·/CTRL/VARS/V<loc>:scanf(<path>.<property>;<pattern>)"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: path
      type: string
      description: LW3 node path; range UNRESOLVED
    - name: property
      type: string
      description: LW3 property; range UNRESOLVED
    - name: pattern
      type: string
      description: '%s | %<number>s | %c | %<number>c | %[<characters>] | %[^<characters>] | %* | <custom_text>; patterns can be combined; escape the % character'

- id: lw3_reformat_variable
  label: Reformat Variable Value (LW3)
  kind: action
  command: "CALL·/CTRL/VARS/V<loc>:printf(<prefix>%s<postfix>)"
  params:
    - name: loc
      type: string
      description: 1-30
    - name: prefix
      type: string
      description: Custom ASCII characters; optional; resulting value limited to 15 characters
    - name: postfix
      type: string
      description: Custom ASCII characters; optional; resulting value limited to 15 characters

- id: lw3_set_dhcp
  label: Set DHCP State (LW3)
  kind: action
  command: "SET·/MANAGEMENT/NETWORK.DhcpEnabled=<dhcp_status>"
  params:
    - name: dhcp_status
      type: string
      description: true | false; applySettings must be called to apply changes

- id: lw3_set_static_ip
  label: Set Static IP Address (LW3)
  kind: action
  command: "SET·/MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>"
  params:
    - name: ip_address
      type: string
      description: IP address; range UNRESOLVED; applySettings must be called to apply changes

- id: lw3_set_static_netmask
  label: Set Static Subnet Mask (LW3)
  kind: action
  command: "SET·/MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>"
  params:
    - name: netmask
      type: string
      description: Subnet mask; range UNRESOLVED; applySettings must be called to apply changes

- id: lw3_set_static_gateway
  label: Set Static Gateway Address (LW3)
  kind: action
  command: "SET·/MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>"
  params:
    - name: gw_address
      type: string
      description: Gateway address; range UNRESOLVED; applySettings must be called to apply changes

- id: lw3_apply_network_settings
  label: Apply Network Settings (LW3)
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:applySettings(1)"
  params: []

# UNRESOLVED: §7.12.5 uses ApplySettings, while §7.12.1–7.12.4 use applySettings.
# These are one entry under the requested case-insensitive comparison rule.
# §7.13.1–7.13.4: MAC/service filters are limited to TX140K/TX140-Plus
# from v1.5.0b4 and WP-UMX-TPS-TX130-Plus-US from v1.5.0b6.
- id: lw3_set_mac_filter_entry
  label: Set MAC Filter Entry (LW3)
  kind: action
  command: "SET·/MANAGEMENT/MACFILTER.MACaddress<loc>=<MAC_address>;<receive>;<send>;<name>"
  params:
    - name: loc
      type: string
      description: 1-8; default values of 1, 2 and 3 ensure access after enabling the MAC filter
    - name: mac_address
      type: string
      description: Hex format, divided by a colon
    - name: receive
      type: string
      description: false (or 0) | true (or 1)
    - name: send
      type: string
      description: false (or 0) | true (or 1)
    - name: name
      type: string
      description: Any string; optional; Up to 5 ASCII characters (longer names are truncated)

- id: lw3_enable_mac_filter
  label: Enable MAC Filter (LW3)
  kind: action
  command: "SET /MANAGEMENT/MACFILTER.FilterEnable=true"
  params:
    - name: value
      type: string
      description: true; other accepted values UNRESOLVED

- id: lw3_set_lw2_service_enabled
  label: Set LW2 Control Port State (LW3)
  kind: action
  command: "SET·/MANAGEMENT/SERVICEFILTER.Lw2Enabled=<port_mode>"
  params:
    - name: port_mode
      type: string
      description: UNRESOLVED; source example false blocks LW2

- id: lw3_set_http_service_enabled
  label: Set HTTP Port State (LW3)
  kind: action
  command: "SET·/MANAGEMENT/SERVICEFILTER.HttpEnabled=<port_mode>"
  params:
    - name: port_mode
      type: string
      description: "UNRESOLVED; source example true; §7.13.4 repeats this same token for HTTP posts"

- id: lw3_wake_on_lan
  label: Wake Computer Over Ethernet (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:wakeOnLan(MAC_address)"
  params:
    - name: mac_address
      type: string
      description: "MAC address; source example AA:BB:CC:22:14:FF; feature from v1.5.0b4 for UMX and v1.5.0b6 for FP/WP"

- id: lw3_set_hostname
  label: Set Hostname (LW3)
  kind: action
  command: "SET·/MANAGEMENT/NETWORK.HostName=<unique_name>"
  params:
    - name: unique_name
      type: string
      description: 1-64 characters; elements of the English alphabet and numbers; Hyphen (-) and dot (.) accepted except as last character; feature from v1.5.0b4 for UMX and v1.5.0b6 for FP/WP

- id: lw3_send_tcp_message
  label: Send TCP Message (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:tcpMessage(<IP_address>:<port_no>=<message>)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: message
      type: string
      description: ASCII-format message; allows escaping control characters; length UNRESOLVED

- id: lw3_send_tcp_text
  label: Send TCP Text (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:tcpText(<IP_address>:<port_no>=<text>)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: text
      type: string
      description: ASCII-format text; does not allow escaping or inserting control characters; length UNRESOLVED

- id: lw3_send_tcp_binary
  label: Send TCP Binary Message (LW3)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpBinary(192.168.0.103:6107=0100000061620000cdcc2c40)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: hex_message
      type: string
      description: Hexadecimal format without spaces or separators; length UNRESOLVED; literal follows the colon-form example in §7.14.3

- id: lw3_send_udp_message
  label: Send UDP Message (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:udpMessage(<IP_address>:<port_no>=<message>)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: message
      type: string
      description: ASCII-format message; allows escaping control characters; length UNRESOLVED

- id: lw3_send_udp_text
  label: Send UDP Text (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:udpText(<IP_address>:<port_no>=<text>)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: text
      type: string
      description: ASCII-format text; does not allow escaping or inserting control characters; length UNRESOLVED

- id: lw3_send_udp_binary
  label: Send UDP Binary Message (LW3)
  kind: action
  command: "CALL·/MEDIA/ETHERNET:udpBinary(<IP_address>:<port_no>=<HEX_message>)"
  params:
    - name: ip_address
      type: string
      description: Target IP address; range UNRESOLVED
    - name: port_no
      type: string
      description: Target port number; range UNRESOLVED
    - name: hex_message
      type: string
      description: Hexadecimal format without spaces or separators; length UNRESOLVED

# §7.15 and §7.16: HTTP clients and TCP recognizer are limited to TX140K/TX140-Plus
# from v1.5.0b4 and WP-UMX-TPS-TX130-Plus-US from v1.5.0b6.
- id: lw3_set_http_server_ip
  label: Set HTTP Target IP Address (LW3)
  kind: action
  command: "SET·/CTRL/HTTP/C1.ServerIP=<IP_address>"
  params:
    - name: ip_address
      type: string
      description: Target server IP address; range UNRESOLVED

- id: lw3_set_http_server_port
  label: Set HTTP Target TCP Port (LW3)
  kind: action
  command: "SET·/CTRL/HTTP/C1.ServerPort=<port_no>"
  params:
    - name: port_no
      type: string
      description: Target TCP port number; range UNRESOLVED

- id: lw3_set_http_target_path
  label: Set HTTP Target Path (LW3)
  kind: action
  command: "SET·/CTRL/HTTP/C1.File=<path>"
  params:
    - name: path
      type: string
      description: Target post/put path; length UNRESOLVED

- id: lw3_set_http_header
  label: Set HTTP Message Header (LW3)
  kind: action
  command: "SET·/CTRL/HTTP/C1.Header=<header_text>"
  params:
    - name: header_text
      type: string
      description: HTTP header text; length UNRESOLVED

- id: lw3_http_post
  label: Send HTTP Post Message (LW3)
  kind: action
  command: "CALL·/CTRL/HTTP/C1:post(<body_text>)"
  params:
    - name: body_text
      type: string
      description: HTTP body text; length UNRESOLVED; HTTPS not supported

- id: lw3_http_put
  label: Send HTTP Put Message (LW3)
  kind: action
  command: "CALL·/CTRL/HTTP/C1:put(<body_text>)"
  params:
    - name: body_text
      type: string
      description: HTTP body text; length UNRESOLVED; HTTPS not supported

- id: lw3_set_tcp_server_ip
  label: Set TCP Server IP Address (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.ServerIP=<IP_address>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: ip_address
      type: string
      description: TCP server IP address; range UNRESOLVED

- id: lw3_set_tcp_server_port
  label: Set TCP Server Port (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.ServerPort=<port_no>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: port_no
      type: string
      description: TCP server port number; range UNRESOLVED

- id: lw3_connect_tcp_server
  label: Connect to TCP Server (LW3)
  kind: action
  command: "CALL·/CTRL/TCP/C<loc>:connect()"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3

- id: lw3_disconnect_tcp_server
  label: Disconnect From TCP Server (LW3)
  kind: action
  command: "CALL·/CTRL/TCP/C<loc>:disconnect()"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3

- id: lw3_set_tcp_delimiter
  label: Set TCP Recognizer Delimiter (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.DelimiterHex=<delimiter>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: delimiter
      type: string
      description: "max. 8 character long (16 hex digits) in hex format; UNRESOLVED: source length wording is inconsistent"

- id: lw3_set_tcp_timeout
  label: Set TCP Recognizer Timeout (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.TimeOut=<timeout>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: timeout
      type: string
      description: milliseconds; 0 means the timeout is disabled, min. value is 10; maximum UNRESOLVED

- id: lw3_get_tcp_rx
  label: Query Last Recognized TCP Message (LW3)
  kind: query
  command: "GET·/CTRL/TCP/C<loc>.Rx"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3; recognized string can be max. 128 bytes long

- id: lw3_get_tcp_rx_hex
  label: Query Last Recognized TCP Message in Hex (LW3)
  kind: query
  command: "GET·/CTRL/TCP/C<loc>.RxHex"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3

- id: lw3_clear_tcp_rx
  label: Clear Stored Recognized TCP Messages (LW3)
  kind: action
  command: "CALL·/CTRL/TCP/C<loc>:clear()"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3; clears Rx, RxHex and Hash

- id: lw3_get_tcp_active_rx
  label: Query Active Recognized TCP Message (LW3)
  kind: query
  command: "GET·/CTRL/TCP/C<loc>.ActiveRx"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3; recognized string is max. 12-byte-long

- id: lw3_get_tcp_active_rx_hex
  label: Query Active Recognized TCP Message in Hex (LW3)
  kind: query
  command: "GET·/CTRL/TCP/C<loc>.ActiveRxHex"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3

- id: lw3_set_tcp_active_timeout
  label: Set TCP Recognizer Active Timeout (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: a_timeout
      type: string
      description: active timeout value (ms) between 0 and 255; default 50ms

- id: lw3_set_tcp_action_trigger
  label: Set TCP Recognizer Event Action (LW3)
  kind: action
  command: "SET·/CTRL/TCP/C<loc>.ActionTrigger=<event_nr>"
  params:
    - name: loc
      type: string
      description: 1, 2 or 3
    - name: event_nr
      type: string
      description: Number (location) of the linked Event Action without letter E; range UNRESOLVED

# §7.19.10 repeats the TCP ActionTrigger token; no UART ActionTrigger path is inferred.
- id: lw3_set_uart_protocol
  label: Set RS-232 Control Protocol (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.ControlProtocol=<protocol>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: protocol
      type: string
      description: "0: LW2 protocol; 1: LW3 protocol"

- id: lw3_set_uart_baudrate
  label: Set RS-232 Baud Rate (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.Baudrate=<baudrate>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: baudrate
      type: string
      description: "0: 4800; 1: 7200; 2: 9600; 3: 14400; 4: 19200; 5: 38400; 6: 57600; 7: 115200"

- id: lw3_set_uart_data_bits
  label: Set RS-232 Data Bits (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.DataBits=<databits>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: databits
      type: string
      description: 8 | 9

- id: lw3_set_uart_stop_bits
  label: Set RS-232 Stop Bits (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.StopBits=<stopbits>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: stopbits
      type: string
      description: "0: 1; 1: 1,5; 2: 2"

- id: lw3_set_uart_parity
  label: Set RS-232 Parity (LW3)
  kind: action
  command: "SET /MEDIA/UART/P1.Parity=0"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: parity
      type: string
      description: "0: None; 1: Odd; 2: Even"

- id: lw3_set_uart_mode
  label: Set RS-232 Operation Mode (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.Rs232Mode=<mode>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6); operation mode is mirrored between ports
    - name: mode
      type: string
      description: "0: Pass-through; 1: Control; 2: Command injection"

- id: lw3_set_uart_command_injection
  label: Enable or Disable RS-232 Command Injection (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<port>.CommandInjectionEnable=<logical_value>"
  params:
    - name: port
      type: string
      description: P1 | P2 (§11.7.6)
    - name: logical_value
      type: string
      description: true | false

- id: lw3_send_uart_message
  label: Send RS-232 Message (LW3)
  kind: action
  command: "CALL·/MEDIA/UART/P1:sendMessage(<message>)"
  params:
    - name: message
      type: string
      description: ASCII-format message; allows escaping control characters; length UNRESOLVED

- id: lw3_send_uart_text
  label: Send RS-232 Text (LW3)
  kind: action
  command: "CALL·/MEDIA/UART/P1:sendText(<message>)"
  params:
    - name: message
      type: string
      description: ASCII-format message; length UNRESOLVED

- id: lw3_send_uart_binary
  label: Send RS-232 Binary Message (LW3)
  kind: action
  command: "CALL·/MEDIA/UART/P1:sendBinaryMessage(<message>)"
  params:
    - name: message
      type: string
      description: Hexadecimal format; does not require escaping control and non-printable characters; length UNRESOLVED

# §7.19: UART recognizer is limited to TX140K/TX140-Plus from v1.3.0b11
# and WP-UMX-TPS-TX130-Plus from v1.4.0b8.
- id: lw3_set_uart_recognizer_enabled
  label: Enable or Disable RS-232 Recognizer (LW3)
  kind: action
  command: "SET·/MEDIA/UART/<serial_port>.RecognizerEnable=<recognizer_enable>"
  params:
    - name: serial_port
      type: string
      description: P1, P2
    - name: recognizer_enable
      type: string
      description: true | false

- id: lw3_set_uart_recognizer_delimiter
  label: Set RS-232 Recognizer Delimiter (LW3)
  kind: action
  command: "SET·/MEDIA/UART/RECOGNIZER.DelimiterHex=<delimiter>"
  params:
    - name: delimiter
      type: string
      description: "max. 8 characters long (or 16 hex digits) in hex format; UNRESOLVED: source length wording is inconsistent"

- id: lw3_set_uart_recognizer_timeout
  label: Set RS-232 Recognizer Timeout (LW3)
  kind: action
  command: "SET·/MEDIA/UART/RECOGNIZER.TimeOut=<timeout>"
  params:
    - name: timeout
      type: string
      description: milliseconds; 0 means the timeout is disabled, min. value is 10; maximum UNRESOLVED

- id: lw3_get_uart_rx
  label: Query Last Recognized RS-232 Message (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.Rx"
  params: []

- id: lw3_get_uart_rx_hex
  label: Query Last Recognized RS-232 Message in Hex (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.RxHex"
  params: []

- id: lw3_clear_uart_rx
  label: Clear Stored Recognized RS-232 Messages (LW3)
  kind: action
  command: "CALL /MEDIA/UART/RECOGNIZER:clear()"
  params: []

- id: lw3_get_uart_active_rx
  label: Query Active Recognized RS-232 Message (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRx"
  params: []

- id: lw3_get_uart_active_rx_hex
  label: Query Active Recognized RS-232 Message in Hex (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRxHex"
  params: []

- id: lw3_set_uart_active_timeout
  label: Set RS-232 Recognizer Active Timeout (LW3)
  kind: action
  command: "SET·/MEDIA/UART/RECOGNIZER.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: a_timeout
      type: string
      description: active timeout value (ms) between 0 and 255; default 50ms

# §7.20: CEC is limited to TX140K/TX140-Plus from v1.3.0b11
# and WP-UMX-TPS-TX130-Plus-US from v1.4.0b8.
# sendClick requires v1.5.0b4 for UMX and v1.5.0b6 for FP/WP.
- id: lw3_send_cec_click
  label: Send CEC Press and Release Command (LW3)
  kind: action
  command: "CALL·/MEDIA/CEC/<port>:sendClick(<command>)"
  params:
    - name: port
      type: string
      description: Video input or output port; applicable range UNRESOLVED in §7.20.1
    - name: command
      type: string
      description: ok | back | up | down | left | right | root_menu | setup_menu | contents_menu | favorite_menu | media_top_menu | media_context_menu | number_0 | number_1 | number_2 | number_3 | number_4 | number_5 | number_6 | number_7 | number_8 | number_9 | dot | enter | clear | channel_up | channel_down | sound_select | input_select | display_info | power_legacy | page_up | page_down | volume_up | volume_down | mute_toggle | mute | unmute | play | stop | pause | record | rewind | fast_forward | eject | skip_forward | skip_backward | 3d_mode | stop_record | pause_record | play_forward | play_reverse | select_next_media | select_media_1 | select_media_2 | select_media_3 | select_media_4 | select_media_5 | power_toggle | power_on | power_off | stop_function | f1 | f2 | f3 | f4

- id: lw3_send_cec_command
  label: Send CEC Command (LW3)
  kind: action
  command: "CALL·/MEDIA/CEC/<port>:send(<command>)"
  params:
    - name: port
      type: string
      description: I1-I4 | O1-O2
    - name: command
      type: string
      description: image_view_on | standby | text_view_on | active_source | get_cec_version | set_osd | clear_osd | give_power_status; set_osd requires setting OsdString first

- id: lw3_set_cec_osd_string
  label: Set CEC OSD String (LW3)
  kind: action
  command: "SET·/MEDIA/CEC/<port>.OsdString=<text>"
  params:
    - name: port
      type: string
      description: I1-I4 | O1-O2
    - name: text
      type: string
      description: Letters (A-Z) and (a-z), hyphen (-), underscore (_), numbers (0-9), and dot (.). Max length 14 characters.

- id: lw3_send_cec_hex
  label: Send CEC Command in Hex (LW3)
  kind: action
  command: "CALL·/MEDIA/CEC/<port>:sendHex(<hex_code>)"
  params:
    - name: port
      type: string
      description: I1-I4 | O1-O2
    - name: hex_code
      type: string
      description: Max. 30 characters (15 bytes) in hexadecimal format.

- id: lw3_get_cec_last_message
  label: Query Last Received CEC Message (LW3)
  kind: query
  command: "GET /MEDIA/CEC/<port>.LastReceivedMessage"
  params:
    - name: port
      type: string
      description: I1-I4 or O1-O2

- id: lw3_set_ir_command_injection
  label: Enable or Disable IR Command Injection (LW3)
  kind: action
  command: "SET·/MEDIA/IR/<port>.CommandInjectionEnable=true|false"
  params:
    - name: port
      type: string
      description: IR port; applicable range UNRESOLVED; source example S1
    - name: value
      type: string
      description: true | false

- id: lw3_set_ir_modulation
  label: Enable or Disable IR Output Modulation (LW3)
  kind: action
  command: "SET·/MEDIA/IR/<port>.EnableModulation=true|false"
  params:
    - name: port
      type: string
      description: IR output port; applicable range UNRESOLVED; source example D1
    - name: value
      type: string
      description: true | false; default true

# §7.22: Pronto sending is limited to TX140K, TX140-Plus and WP-UMX-TPS-TX130-Plus-US.
- id: lw3_send_pronto_hex
  label: Send Little Endian Pronto Hex (LW3)
  kind: action
  command: "CALL·/MEDIA/IR/<output_port>:sendProntoHex(<hex_code>)"
  params:
    - name: output_port
      type: string
      description: "Local Infra output: D1; TPS Infra output: D2"
    - name: hex_code
      type: string
      description: maximum 765-character-long code in hexadecimal format (0-9; A-F; a-f) without space character in little-endian system; exactly one complete pronto hex message

- id: lw3_send_pronto_hex_big_endian
  label: Send Big Endian Pronto Hex (LW3)
  kind: action
  command: "CALL·/MEDIA/IR/<output_port>:sendProntoHexBigEndian(<hex_code>)"
  params:
    - name: output_port
      type: string
      description: "Local Infra output: D1; TPS Infra output: D2"
    - name: hex_code
      type: string
      description: maximum 765-character-long code in hexadecimal format (0-9; A-F; a-f) without space character in big-endian system; exactly one complete pronto hex message

# UNRESOLVED: §7.23 says GPIO port number 1..8, conflicting with the seven-pin descriptions.
# GPIO support on FP-UMX-TPS-TX120-GES4 is not established.
- id: lw3_set_gpio_direction
  label: Set GPIO Pin Direction (LW3)
  kind: action
  command: "SET·/MEDIA/GPIO/<port>.Direction=<direction>"
  params:
    - name: port
      type: string
      description: GPIO port number (1..8). Example P1; model applicability UNRESOLVED
    - name: direction
      type: string
      description: I | O

- id: lw3_set_gpio_output
  label: Set GPIO Pin Output Level (LW3)
  kind: action
  command: "SET·/MEDIA/GPIO/<port>.Output=<value>"
  params:
    - name: port
      type: string
      description: GPIO port number (1..8). Example P1; model applicability UNRESOLVED
    - name: value
      type: string
      description: H | L

- id: lw3_toggle_gpio
  label: Toggle GPIO Pin Level (LW3)
  kind: action
  command: "CALL·/MEDIA/GPIO/<port>:toggle()"
  params:
    - name: port
      type: string
      description: GPIO port number (1..8). Example P1; model applicability UNRESOLVED

- id: lw3_get_edid_status
  label: Query Emulated EDIDs (LW3)
  kind: query
  command: "GET /EDID.EdidStatus"
  params: []

- id: lw3_get_dynamic_edid_validity
  label: Query Dynamic EDID Validity (LW3)
  kind: query
  command: "GET·/EDID/D/<dynamic>.Validity"
  params:
    - name: dynamic
      type: string
      description: Dynamic EDID memory index; example D1; range UNRESOLVED

- id: lw3_get_user_edid_resolution
  label: Query User EDID Preferred Resolution (LW3)
  kind: query
  command: "GET·/EDID/U/<user>.PreferredResolution"
  params:
    - name: user
      type: string
      description: User EDID memory index; example U1; range UNRESOLVED

- id: lw3_switch_edid
  label: Emulate EDID on Input Port (LW3)
  kind: action
  command: "CALL·/EDID:switch(<dynamic|user|factory>:<emulated>)"
  params:
    - name: source
      type: string
      description: dynamic | user | factory; memory index examples D1, U1, F1; complete ranges UNRESOLVED
    - name: emulated
      type: string
      description: E1 | E2 for FP-UMX-TPS-TX120 series (§11.7.6)

- id: lw3_switch_all_edids
  label: Emulate EDID on All Input Ports (LW3)
  kind: action
  command: "CALL·/EDID:switchAll(<dynamic|user|factory>)"
  params:
    - name: source
      type: string
      description: dynamic | user | factory; memory index examples D1, U1, F1; complete ranges UNRESOLVED

- id: lw3_copy_edid
  label: Copy EDID to User Memory (LW3)
  kind: action
  command: "CALL·/EDID:copy(<dynamic|emulated|factory|user>:<user>)"
  params:
    - name: source
      type: string
      description: dynamic | emulated | factory | user; memory index examples D1, E1, F1, U1; complete ranges UNRESOLVED
    - name: user
      type: string
      description: User EDID memory index; example U1; range UNRESOLVED

- id: lw3_delete_user_edid
  label: Delete EDID From User Memory (LW3)
  kind: action
  command: "CALL·/EDID:delete(<user>)"
  params:
    - name: user
      type: string
      description: User EDID memory index; example U1; range UNRESOLVED

- id: lw3_reset_edids
  label: Reset Emulated EDIDs (LW3)
  kind: action
  command: "CALL /EDID:reset()"
  params: []

# Host application commands from §5.2 and §8.6; these are not device wire commands.
# Host execution transport is UNRESOLVED in the Transport schema above.
- id: ldc_connect_ip
  label: Connect LDC by IP Address
  kind: action
  command: "LightwareDeviceController -i <IP_address>:<port>"
  params:
    - name: ip_address
      type: string
      description: Static IP address; range UNRESOLVED
    - name: port
      type: string
      description: If not set, default 10001 (LW2 protocol); LW3 uses 6107; other accepted values UNRESOLVED

- id: ldc_connect_serial
  label: Connect LDC by Serial Port
  kind: action
  command: "LightwareDeviceController -c <COM_port>:<Baud>"
  params:
    - name: com_port
      type: string
      description: Serial port; range UNRESOLVED
    - name: baud
      type: string
      description: If not set, detected automatically; command-specific range UNRESOLVED

- id: ldc_set_zoom
  label: Set LDC Zoom
  kind: action
  command: "LightwareDeviceController -z <magnifying_value>"
  params:
    - name: magnifying_value
      type: string
      description: Default 1 (100%); range UNRESOLVED; last value stored for subsequent starts

- id: ldu2_help
  label: List LDU2 CLI Commands
  kind: query
  command: "LightwareDeviceUpdaterV2_CLI.cmd help"
  params: []

- id: ldu2_version
  label: Query LDU2 and Script API Versions
  kind: query
  command: "LightwareDeviceUpdaterV2_CLI.cmd version"
  params: []

- id: ldu2_check_for_updates
  label: Check for New LDU2 Version
  kind: query
  command: "LightwareDeviceUpdaterV2_CLI.cmd checkForUpdates"
  params: []

- id: ldu2_device_info
  label: Query Device Information With LDU2
  kind: query
  command: "LightwareDeviceUpdaterV2_CLI.cmd deviceInfo [options]"
  params:
    - name: ip
      type: string
      description: -i or --ip; List of IP addresses; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: host_name
      type: string
      description: -n or --hostName; List of hostnames; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: package_version
      type: string
      description: -v or --packageVersion; optional flag; shows installed package version only

- id: ldu2_update
  label: Update Device Firmware With LDU2
  kind: action
  command: "LightwareDeviceUpdaterV2_CLI.cmd update [options]"
  params:
    - name: package
      type: string
      description: -p or --package; firmware package file path; required
    - name: ip
      type: string
      description: -i or --ip; List of IP addresses; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: host_name
      type: string
      description: -n or --hostName; List of hostnames; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: backup_folder
      type: string
      description: -b or --backupFolder; optional; default USER_HOME/.ldu2/backup
    - name: factory_default
      type: string
      description: -f or --factoryDefault; optional flag; Default false
    - name: report_progress
      type: string
      description: -r or --reportProgress; optional flag; Default false
    - name: skip_presets_at_restore
      type: string
      description: --skipPresetsAtRestore; package-specific; if true, device presets will not be restored; Default false
    - name: upload_default_mini_web
      type: string
      description: --uploadDefaultMiniWeb; package-specific; if true and no custom miniweb is present, uploads default built-in miniweb; Default false
    - name: clear_text_login_pw
      type: string
      description: --clearTextLoginPw; package-specific; cleartext login password; Default empty string; length UNRESOLVED
    - name: test
      type: string
      description: --test; package-specific; if true, no update performed and device communication tested; Default false

- id: ldu2_restore
  label: Restore Device Configuration With LDU2
  kind: action
  command: "LightwareDeviceUpdaterV2_CLI.cmd restore [options]"
  params:
    - name: ip
      type: string
      description: -i or --ip; List of IP addresses; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: host_name
      type: string
      description: -n or --hostName; List of hostnames; one of ip or hostName mandatory; list syntax UNRESOLVED
    - name: backup_file
      type: string
      description: -b or --backupFile; configuration backup file path; required
    - name: keep_original_ip
      type: string
      description: -k or --keepOriginalIp; optional flag; preserves device network settings instead of overriding from backup; Default false

- id: ldu2_package_options
  label: Query LDU2 Package Options
  kind: query
  command: "LightwareDeviceUpdaterV2_CLI.cmd packageOptions [options]"
  params:
    - name: package
      type: string
      description: -p or --package; firmware package file path; required
```

<!-- UNRESOLVED: per source §7 the LW3 protocol tree includes MANY additional sub-systems (Video Port Settings, Audio Port Settings, Analog Audio Input Level Settings, Event Manager, Variable Management, Ethernet Port Config, Ethernet Tool Kit, Ethernet Message Sending, HTTP Messaging, TCP Message Recognizer, RS-232 Port Config, RS-232 Message Sending, RS-232 Message Recognizer, Sending CEC Commands, Infrared Port Config, Infrared Message Sending, GPIO Port Config, EDID Management). The refined source excerpt does not enumerate every node/property/method detail; only the protocol structure and example commands are documented. Implementer should consult the LW3 programmer's reference §7 for full coverage. -->

## Feedbacks
```yaml
- id: lcmd_response
  type: string
  description: Multi-line listing of all LW2 commands, terminated with `(LCMD END)CrLf`
  query_command: "{lcmd}"

- id: product_type
  type: string
  description: "(I:<PRODUCT_TYPE>)CrLf"
  query_command: "{i}"

- id: device_label
  type: string
  description: "(LABEL=<device_label>)CrLf"
  query_command: "{label}"

- id: current_protocol
  type: string
  description: "(CURRENT PROTOCOL = #1) - '#1' = LW2"
  query_command: "{P_?}"

- id: firmware_version
  type: string
  description: "(FW:<FW_VER><s>)CrLf - e.g. (FW:1.6.0b13 r99)"
  query_command: "{F}"

- id: pong
  type: string
  description: "(PONG!)CrLf"
  query_command: "{PING}"

- id: compiled_date
  type: string
  description: "(Compiled: <DATE&TIME>)CrLf"
  query_command: "{CT}"

- id: serial_number
  type: string
  description: "(SN:<SERIAL_N>)CrLf - 8-digit serial"
  query_command: "{S}"

- id: installed_boards
  type: string
  description: "(SL# 0 <MB_DESC>)CrLf" followed by `(SL END)`
  query_command: "{IS}"

- id: firmware_controllers
  type: string
  description: "(CF <DESC>)CrLf" lines terminated with `(CF END)CrLf`
  query_command: "{FC}"

- id: health_status
  type: string
  description: "(ST CPU 12.16V 5.03V 3.30V 3.33V 3.37V 1.30V 1.86V 1.00V 53.22C 53.26C)"
  query_command: "{ST}"

- id: switch_ack
  type: string
  description: "(O<out2> I<in2> <layer>)CrLf"

- id: mute_ack
  type: string
  description: "(1MT<out2> <layer>)CrLf - 1 = muted"

- id: unmute_ack
  type: string
  description: "(0MT<out2> <layer>)CrLf - 0 = unmuted"

- id: lock_ack
  type: string
  description: "(1LO<out²> <layer>)CrLf - 1 = locked"

- id: unlock_ack
  type: string
  description: "(0LO<out2> <layer>)CrLf - 0 = unlocked"

- id: crosspoint_state
  type: string
  description: "(ALL<layer> <O01> <O02>…)CrLf - state letters L=locked, M=muted, U=locked+muted"
  query_command: "{VC·<layer>}"

- id: crosspoint_size
  type: string
  description: "(SIZE=<size> <layer>)CrLf - e.g. (SIZE=6x1 V)"
  query_command: "{getsize·<layer>}"

- id: ip_status
  type: string
  description: "(IP_STAT=<type>;<ip_address>;<subnet_mask>;<gateway_addr>)CrLf"
  query_command: "{IP_STAT=?}"

- id: gpio_ack
  type: string
  description: "(GPIO<pin_nr>=<dir>;<level>)CrLf"
  query_command: "{GPIO<pin_nr>=?}"

- id: lw3_property_response
  type: string
  description: LW3 GET response - e.g. `pr /.ProductName=UMX-TPS-TX140-Plus`
  query_command: "GET /.ProductName"
```

## Variables
```yaml
# Source documents settable variables; full LW3 path/property list not enumerated in the excerpt.
# UNRESOLVED: source §7.10 Variable-Management detail not in excerpt; refer to LW3 programmer's reference.
```

## Events
```yaml
# Source documents LW3 subscription notifications.
- id: lw3_chg_notification
  type: string
  description: "Change message format: `CHG /<node_path>=<value>` - emitted asynchronously when subscribed property changes."
```

## Macros
```yaml
# Per source §5.10.6 (only on UMX-TPS-TX140K and TX140-Plus from FW v1.5.0b4; FP/WP-UMX-TPS series from v1.5.0b6).
- id: macro_file_format
  type: string
  description: |
    LW3 macros stored as plain-text files with extension `.LW3`:
    ```
    ;<preset_name>
    ;Begin <macro1_name>
    <LW3_commands>
    ;End <macro1_name>
    ```
    Each macro is a sequence of LW3 SET and CALL commands. Syntax not checked at upload time.
```

<!-- UNRESOLVED: FP-UMX-TPS-TX120-GES4 macro availability depends on exact firmware/model variant; this is a Plus-tier feature. -->

## Safety
```yaml
confirmation_required_for:
  - factory_reset  # UNRESOLVED: explicit confirmation text not quoted in source, but "Load factory defaults" prompts per source §5.11.4
  - reboot  # UNRESOLVED: no explicit confirmation prompt documented for {RST} in source
interlocks: []
# UNRESOLVED: source mentions "Cleartext Login" protection (§5.12.5) and "Lock front panel" (§5.12.3) but no interlock procedure spec.
```

## Notes
- LW2 protocol: ASCII commands wrapped in `{ }`, terminated with CrLf (`\r\n`, `0x0D 0x0A`). All commands converted to uppercase on receive. Responses wrapped in `( )`.
- LW2 over TCP: port `10001`. LW3 over TCP: port `6107`. Default device IP: `192.168.0.100`.
- LW3 protocol: ASCII, CrLf-terminated, case-sensitive tree (`/MEDIA/VIDEO/XP:switch(I1:O1)`). Maximum line length 800 bytes. Commands prefixed with `GET`, `SET`, `CALL`, `MAN`, `OPEN`, `CLOSE`, `GETALL`. Responses prefixed with 2-char code (`pr`, `pw`, `mO`, `mF`, `o-`, `c-`, `CHG`, etc.).
- RS-232 port settings (per source §5.10.1): Baud 4800/7200/9600/14400/19200/38400/57600/115200; Data 8 or 9; Parity None/Odd/Even; Stop 1/1.5/2. RS-232 modes: `CONTROL`, `CI` (Command Injection), `PASS` (Event Manager pass-through).
- Two RS-232 ports: Local and TPS link. RS-232 **operation mode** mirrors between them; other settings can differ per port.
- Cleartext login (LW3) is optional on TX140K/TX140-Plus and WP-UMX-TX130-Plus-US from FW v1.5.0b4/v1.5.0b6. When enabled, login must be the first command on TCP connections.
- Escape character in LW3 is `\`. Control characters to escape: `\ { } # % ( ) \r \n \t`.
- Signature feature: optional 4-hex-digit prefix per command (e.g. `1700#GET /EDID.*`) groups a response between `{` and `}` brackets.
- The `0D0A` (CrLf) is the default delimiter for the RS-232 Message Recognizer (§5.10.2) and matches the LW3 command terminator.
- GPIO port: 7 pins at TTL digital levels; pin direction (Input/Output) configurable. Only `UMX-TPS-TX130, -TX140, TX140K, TX140-Plus` models per source §6.7.

<!-- UNRESOLVED: firmware version compatibility ranges (e.g. HTTP Clients, Macros, Cleartext Login, TCP Message Recognizer availability) gated by firmware package versions per source §5.4, §5.10, §5.12; not exhaustively cross-referenced here. -->
<!-- UNRESOLVED: full LW3 node tree (Video Port Settings §7.6, Audio Port Settings §7.7, EDID Management §7.16, etc.) not enumerated in source excerpt; refer to full LW3 Programmer's Reference. -->

## Provenance

```yaml
source_domains:
  - go.lightware.com
  - academy.lightware.com
source_urls:
  - https://go.lightware.com/umx-tps-tx100-s-pum
  - https://academy.lightware.com/
retrieved_at: 2026-08-11T07:54:49.108Z
last_checked_at: 2026-10-07T22:11:09.783Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:11:09.783Z
matched_actions: 234
action_count: 234
confidence: medium
summary: "All 234 action units map to literal source commands and the port 10001 claim is supported. Many LW3 features are marked in the source as TX140K/Plus-only, so applicability to the TX120-GES4 is a caveat. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "CALL·/MEDIA/AUDIO/XP:setAutoselectionPriority"
- "<IP_address>/protocol.lw3"
- "firmware version compatibility not stated in source"
- "no default stated; selectable 4800, 7200, 9600, 14400, 19200, 38400, 57600, 115200"
- "no default stated; selectable 8 or 9"
- "no default stated; selectable None (N), Odd (O), Even (E)"
- "no default stated; selectable 1, 1.5, 2"
- "flow control not stated in source"
- "LW3 uses TCP port 6107 (per source §7.2); not enumerated above since protocols.port holds one value. See Notes."
- "source repeats B2\""
- "source table conflicts with example false\""
- "§7.7.8 has a malformed audio priority command template and a video-path example."
- "source example sets true, while the summary specifies ConditionEndCheck for this delay type\""
- "§7.12.5 uses ApplySettings, while §7.12.1–7.12.4 use applySettings."
- "source length wording is inconsistent\""
- "§7.23 says GPIO port number 1..8, conflicting with the seven-pin descriptions."
- "per source §7 the LW3 protocol tree includes MANY additional sub-systems (Video Port Settings, Audio Port Settings, Analog Audio Input Level Settings, Event Manager, Variable Management, Ethernet Port Config, Ethernet Tool Kit, Ethernet Message Sending, HTTP Messaging, TCP Message Recognizer, RS-232 Port Config, RS-232 Message Sending, RS-232 Message Recognizer, Sending CEC Commands, Infrared Port Config, Infrared Message Sending, GPIO Port Config, EDID Management). The refined source excerpt does not enumerate every node/property/method detail; only the protocol structure and example commands are documented. Implementer should consult the LW3 programmer's reference §7 for full coverage."
- "source §7.10 Variable-Management detail not in excerpt; refer to LW3 programmer's reference."
- "FP-UMX-TPS-TX120-GES4 macro availability depends on exact firmware/model variant; this is a Plus-tier feature."
- "explicit confirmation text not quoted in source, but \"Load factory defaults\" prompts per source §5.11.4"
- "no explicit confirmation prompt documented for {RST} in source"
- "source mentions \"Cleartext Login\" protection (§5.12.5) and \"Lock front panel\" (§5.12.3) but no interlock procedure spec."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
