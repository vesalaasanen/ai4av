---
spec_id: admin/lightware-dp-tps-tx220
schema_version: ai4av-public-spec-v1
revision: 1
title: "Lightware DP-TPS-TX220 Control Spec"
manufacturer: Lightware
model_family: DP-TPS-TX220
aliases: []
compatible_with:
  manufacturers:
    - Lightware
  models:
    - DP-TPS-TX220
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - assets.prod.pim.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/HTML/HDMI-TPS-TX200_series/UM.html
retrieved_at: 2026-07-31T11:16:20.042Z
last_checked_at: 2026-10-07T12:45:35.266Z
generated_at: 2026-10-07T12:45:35.266Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - OPEN
  - CLOSE
  - GETALL
  - MAN
  - "exact hardware variant features (Plus-only vs base TX220) for several advanced commands are model-gated; GPIO electrical levels and full FW-compat matrix not in scope of this spec."
  - "not stated in source"
  - "full enum tables for every query response not exhaustively enumerated"
  - "full list of notifiable property paths not exhaustively enumerated in source."
  - "macro authoring syntax / storage commands not detailed in source."
  - "source contains no explicit safety/interlock warnings or power-on"
  - "firmware version compatibility ranges per command not fully stated (some gated to FW v1.2.0b14 / v1.3.0b3 / v1.3.0b6)."
  - "GPIO flow_control-style handshake not documented for RS-232."
  - "exact Plus vs base feature set for DP-TPS-TX220 not disambiguated in source."
verification:
  verdict: verified
  checked_at: 2026-10-07T12:45:35.266Z
  matched_actions: 198
  action_count: 198
  confidence: medium
  summary: "All 198 action units match source commands and transport values are supported. The source names the DP-TPS-TX220 and the spec flags Plus-only commands. Source typos on 3 commands were silently corrected. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-31
---

# Lightware DP-TPS-TX220 Control Spec

## Summary
Lightware DP-TPS-TX220 is a DisplayPort-to-TPS (HDBaseT) transmitter with local HDMI output, part of the HDMI-TPS-TX200 series. It accepts LW2 and LW3 ASCII control protocols over the RS-232 (3-pole Phoenix) serial port and over Ethernet (RJ45). This spec covers serial (RS-232C) control primarily, with Ethernet transports also documented.

<!-- UNRESOLVED: exact hardware variant features (Plus-only vs base TX220) for several advanced commands are model-gated; GPIO electrical levels and full FW-compat matrix not in scope of this spec. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 57600   # default per Factory Default Settings table; range 4800..115200
  data_bits: 8       # default; alt 9
  parity: none       # default; alt odd/even
  stop_bits: 1       # default; alt 1.5 / 2
  flow_control: null  # UNRESOLVED: not stated in source
addressing:
  port: 6107   # LW3 TCP control port (also 10001 LW2, 80 HTTP per Applied Ports table)
auth:
  type: UNRESOLVED  # Source documents cleartext login as Plus-only; base TX220 authentication behavior is not stated.
```

## Traits
```yaml
traits:
  - routable    # inferred: input->output switching commands present (LW2 {<in>@<out>}, LW3 XP:switch)
  - queryable   # inferred: many state/status queries present
  - levelable   # inferred: analog audio volume/balance/gain control present
```

## Actions
```yaml
# ---- LW2: General / System ----
- id: lcmd_list
  label: List Supported Commands (LW2)
  kind: query
  command: "{LCMD}"
  params: []
- id: product_type_query
  label: Product Type (LW2)
  kind: query
  command: "{i}"
  params: []
- id: device_label_query
  label: Device Label (LW2)
  kind: query
  command: "{LABEL}"
  params: []
- id: control_protocol_query
  label: Control Protocol Query (LW2)
  kind: query
  command: "{P_?}"
  params: []
- id: firmware_version_query
  label: CPU Firmware Version (LW2)
  kind: query
  command: "{f}"
  params: []
- id: ping
  label: Connection Test (LW2)
  kind: query
  command: "{PING}"
  params: []
- id: serial_number_query
  label: Serial Number (LW2)
  kind: query
  command: "{S}"
  params: []
- id: compile_time_query
  label: Compile Time (LW2)
  kind: query
  command: "{CT}"
  params: []
- id: installed_board_query
  label: Installed Board (LW2)
  kind: query
  command: "{IS}"
  params: []
- id: firmware_controllers_query
  label: Firmware All Controllers (LW2)
  kind: query
  command: "{FC}"
  params: []
- id: restart_device
  label: Restart Device (LW2)
  kind: action
  command: "{RST}"
  params: []
- id: health_status_query
  label: Health Status (LW2)
  kind: query
  command: "{ST}"
  params: []
- id: factory_default_all
  label: Restore Factory Defaults (LW2)
  kind: action
  command: "{FACTORY=ALL}"
  params: []

# ---- LW2: AV crosspoint ----
- id: lw2_switch_input
  label: Switch Input to Output (LW2)
  kind: action
  command: "{<in>@<out> <layer>}"
  params:
    - name: in
      type: integer
      description: "Input port (I1=DP in; 0=disconnect)"
    - name: out
      type: integer
      description: "Output port (O1=TPS out, O2=HDMI out)"
    - name: layer
      type: string
      description: "A / V / AV"
- id: lw2_mute_output
  label: Mute Output (LW2)
  kind: action
  command: "{#<out> <layer>}"
  params:
    - name: out
      type: integer
    - name: layer
      type: string
- id: lw2_unmute_output
  label: Unmute Output (LW2)
  kind: action
  command: "{+<out> <layer>}"
  params:
    - name: out
      type: integer
    - name: layer
      type: string
- id: lw2_lock_output
  label: Lock Output (LW2)
  kind: action
  command: "{#><out> <layer>}"
  params:
    - name: out
      type: integer
    - name: layer
      type: string
- id: lw2_unlock_output
  label: Unlock Output (LW2)
  kind: action
  command: "{+<<out> <layer>}"
  params:
    - name: out
      type: integer
    - name: layer
      type: string
- id: lw2_connection_state_query
  label: Connection State on Output (LW2)
  kind: query
  command: "{VC <layer>}"
  params:
    - name: layer
      type: string
- id: lw2_crosspoint_size_query
  label: Crosspoint Size (LW2)
  kind: query
  command: "{getsize <layer>}"
  params:
    - name: layer
      type: string
- id: lw2_video_autoselect_mode
  label: Video Autoselect Mode (LW2)
  kind: action
  command: "{AS_V<out>=<state>;<mode>}"
  params:
    - name: out
      type: integer
    - name: state
      type: string
      description: "E=enabled, D=disabled"
    - name: mode
      type: string
      description: "F=first, L=last, P=priority"
- id: lw2_audio_autoselect_mode
  label: Audio Autoselect Mode (LW2)
  kind: action
  command: "{AS_A<out>=<state>;<mode>}"
  params:
    - name: out
      type: integer
    - name: state
      type: string
    - name: mode
      type: string
- id: lw2_video_priority
  label: Video Input Priorities (LW2)
  kind: action
  command: "{PRIO_V<out>=<in1_prio>;<in2_prio>;<in3_prio>;<in4_prio>}"
  params:
    - name: out
      type: integer
    - name: prios
      type: string
      description: "4 priority numbers 0..3 (0=highest)"
- id: lw2_audio_priority
  label: Audio Input Priority (LW2)
  kind: action
  command: "{PRIO_A<out>=<in1_prio>;<in2_prio>;<in3_prio>;<in4_prio>;<in5_prio>}"
  params:
    - name: out
      type: integer
    - name: prios
      type: string

# ---- LW2: GPIO ----
- id: lw2_gpio_set
  label: GPIO Level/Direction (LW2)
  kind: action
  command: "{GPIO<pin>=<dir>;<level>}"
  params:
    - name: pin
      type: integer
      description: "0-7"
    - name: dir
      type: string
      description: "I=input, O=output"
    - name: level
      type: string
      description: "L=low, H=high, T=toggle"

# ---- LW2: Network ----
- id: lw2_ip_stat_query
  label: IP Status Query (LW2)
  kind: query
  command: "{IP_STAT=?}"
  params: []
- id: lw2_set_ip_address
  label: Set IP Address (LW2)
  kind: action
  command: "{IP_ADDRESS=<type>;<ip_address>}"
  params:
    - name: type
      type: integer
      description: "0=static, 1=DHCP"
    - name: ip_address
      type: string
- id: lw2_set_netmask
  label: Set Subnet Mask (LW2)
  kind: action
  command: "{IP_NETMASK=<subnet_mask>}"
  params:
    - name: subnet_mask
      type: string
- id: lw2_set_gateway
  label: Set Gateway (LW2)
  kind: action
  command: "{IP_GATEWAY=<gateway_addr>}"
  params:
    - name: gateway_addr
      type: string
- id: lw2_ip_apply
  label: Apply Network Settings (LW2)
  kind: action
  command: "{ip_apply}"
  params: []
- id: lw2_eth_enable
  label: Enable/Disable Ethernet Port (LW2)
  kind: action
  command: "{ETH_ENABLE=<switch>}"
  params:
    - name: switch
      type: integer
      description: "0=disable, 1=enable"

# ---- LW2: Serial port config ----
- id: lw2_rs232_mode
  label: RS-232 Control Mode (LW2)
  kind: action
  command: "{RS232=<mode>}"
  params:
    - name: mode
      type: string
      description: "PASS / CONTROL / CI"
- id: lw2_rs232_local_format
  label: Local RS-232 Format (LW2)
  kind: action
  command: "{RS232_LOCAL_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}"
  params:
    - name: baud_rate
      type: string
      description: "4800;7200;9600;14400;19200;38400;57600;115200 (X=skip)"
    - name: data_bit
      type: string
      description: "8;9 (X=skip)"
    - name: parity
      type: string
      description: "N;E;O (X=skip)"
    - name: stop_bit
      type: string
      description: "1;1.5;2 (X=skip)"
- id: lw2_rs232_link_format
  label: Link RS-232 Format (LW2)
  kind: action
  command: "{RS232_LINK_FORMAT=<baud_rate>;<data_bit>;<parity>;<stop_bit>}"
  params:
    - name: baud_rate
      type: string
    - name: data_bit
      type: string
    - name: parity
      type: string
    - name: stop_bit
      type: string
- id: lw2_rs232_local_prot
  label: Local RS-232 Protocol (LW2)
  kind: action
  command: "{RS232_LOCAL_PROT=<protocol>}"
  params:
    - name: protocol
      type: string
      description: "LW2 / LW3"
- id: lw2_rs232_link_prot
  label: Link RS-232 Protocol (LW2)
  kind: action
  command: "{RS232_LINK_PROT=<protocol>}"
  params:
    - name: protocol
      type: string
      description: "LW2 / LW3"

# ---- LW3: System ----
- id: lw3_product_name
  label: Product Name (LW3)
  kind: query
  command: "GET /.ProductName"
  params: []
- id: lw3_set_device_label
  label: Set Device Label (LW3)
  kind: action
  command: "SET /MANAGEMENT/UID.DeviceLabel=<device_label>"
  params:
    - name: device_label
      type: string
      description: "max 39 ASCII chars"
- id: lw3_serial_number
  label: Serial Number (LW3)
  kind: query
  command: "GET /.SerialNumber"
  params: []
- id: lw3_cpu_firmware
  label: CPU Firmware Version (LW3)
  kind: query
  command: "GET /SYS/MB.FirmwareVersion"
  params: []
- id: lw3_package_version
  label: Package Version (LW3)
  kind: query
  command: "GET /MANAGEMENT/UID.PackageVersion"
  params: []
- id: lw3_reset
  label: Reset Device (LW3)
  kind: action
  command: "CALL /SYS:reset(1)"
  params: []
- id: lw3_factory_defaults
  label: Factory Defaults (LW3)
  kind: action
  command: "CALL /SYS:factoryDefaults()"
  params: []
- id: lw3_control_lock
  label: Control Lock (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI.ControlLock=<lock_status>"
  params:
    - name: lock_status
      type: integer
      description: "0=none, 1=locked(unlockable), 2=locked"
- id: lw3_identify_me
  label: Identify Device (LW3)
  kind: action
  command: "CALL /MANAGEMENT/UI:identifyMe()"
  params: []
- id: lw3_darkmode_enable
  label: Dark Mode Enable (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeEnable=<mode_state>"
  params:
    - name: mode_state
      type: string
      description: "true/1 or false/0"
- id: lw3_darkmode_delay
  label: Dark Mode Delay (LW3)
  kind: action
  command: "SET /MANAGEMENT/UI/DARKMODE.DarkModeDelay=<delay_time>"
  params:
    - name: delay_time
      type: integer
      description: "seconds; default 60; 0=no delay"
- id: lw3_macro_run
  label: Run Macro (LW3)
  kind: action
  command: "CALL /CTRL/MACROS:run(<macro_name>)"
  params:
    - name: macro_name
      type: string
  notes: Plus-only; FW package v1.3.0b6+

# ---- LW3: Login (Plus-only; documented but not on base TX220) ----
- id: lw3_set_password
  label: Set Login Password (LW3)
  kind: action
  command: "CALL /LOGIN:setPassword(<password>)"
  params:
    - name: password
      type: string
  notes: Plus-only (SW4-TPS-TX240-Plus); not on DP-TPS-TX220 base model
- id: lw3_login
  label: Login (LW3)
  kind: action
  command: "CALL /LOGIN:login(<password>)"
  params:
    - name: password
      type: string
  notes: Plus-only
- id: lw3_logout
  label: Logout (LW3)
  kind: action
  command: "CALL /LOGIN:logout(<password>)"
  params:
    - name: password
      type: string
  notes: Plus-only
- id: lw3_login_enable
  label: Enable/Disable Cleartext Login (LW3)
  kind: action
  command: "SET /LOGIN.LoginEnable=<login_state>"
  params:
    - name: login_state
      type: string
  notes: Plus-only

# ---- LW3: Video port ----
- id: lw3_video_source_status
  label: Video Source Port Status (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.SourcePortStatus"
  params: []
- id: lw3_connected_source
  label: Connected Source (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/<out>.ConnectedSource"
  params:
    - name: out
      type: string
      description: "O1/O2"
  notes: Plus-only; FW v1.3.0b6+
- id: lw3_video_dest_status
  label: Video Destination Port Status (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortStatus"
  params: []
- id: lw3_video_connection_list
  label: Video Crosspoint Setting (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationConnectionList"
  params: []
- id: lw3_video_switch
  label: Switch Video Input (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:switch(<in>:<out>)"
  params:
    - name: in
      type: string
      description: "I1.. ; 0=disconnect"
    - name: out
      type: string
      description: "O1/O2"
- id: lw3_video_autoselect_query
  label: Video Autoselect Settings (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.DestinationPortAutoselect"
  params: []
- id: lw3_video_autoselect_set
  label: Set Video Autoselect Mode (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setDestinationPortAutoselect(<out>:<as_state><as_mode>)"
  params:
    - name: out
      type: string
    - name: as_state
      type: string
      description: "E/D"
    - name: as_mode
      type: string
      description: "F/P/L"
- id: lw3_video_priority_query
  label: Video Input Port Priority (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/XP.PortPriorityList"
  params: []
- id: lw3_video_priority_set
  label: Set Video Input Port Priority (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:setAutoselectionPriority(<in>(<out>):<priority>)"
  params:
    - name: in
      type: string
    - name: out
      type: string
    - name: priority
      type: integer
      description: "0..30 (31=ignore)"
- id: lw3_video_mute_source
  label: Mute Video Input (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_unmute_source
  label: Unmute Video Input (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_lock_source
  label: Lock Video Input (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_unlock_source
  label: Unlock Video Input (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_video_mute_dest
  label: Mute Video Output (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_unmute_dest
  label: Unmute Video Output (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_lock_dest
  label: Lock Video Output (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_video_unlock_dest
  label: Unlock Video Output (LW3)
  kind: action
  command: "CALL /MEDIA/VIDEO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_hdcp_active
  label: Query Incoming HDCP (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/<in>.HdcpActive"
  params:
    - name: in
      type: string
- id: lw3_hdcp_enable_query
  label: Query Input HDCP Setting (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/<in>.HdcpEnable"
  params:
    - name: in
      type: string
- id: lw3_hdcp_enable_set
  label: Set Input HDCP (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<in>.HdcpEnable=<HDCP_setting>"
  params:
    - name: in
      type: string
    - name: HDCP_setting
      type: string
      description: "0/false, 1/true"
- id: lw3_hdcp_mode_query
  label: Query Output HDCP Setting (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/<out>.HdcpModeSetting"
  params:
    - name: out
      type: string
- id: lw3_hdcp_mode_set
  label: Set Output HDCP Mode (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.HdcpModeSetting=<HDCP_setting>"
  params:
    - name: out
      type: string
    - name: HDCP_setting
      type: string
- id: lw3_tpg_mode
  label: Test Pattern Mode (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.TpgMode=<mode_setting>"
  params:
    - name: out
      type: string
    - name: mode_setting
      type: integer
      description: "0=disabled, 1=enabled, 2=no-signal mode"
- id: lw3_tpg_clock
  label: Test Pattern Clock Source (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.TpgClockSource=<clk_freq>"
  params:
    - name: out
      type: string
    - name: clk_freq
      type: string
      description: "480 / 576 / EXT"
- id: lw3_tpg_pattern
  label: Test Pattern (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.TpgPattern=<pattern>"
  params:
    - name: out
      type: string
    - name: pattern
      type: string
      description: "RED/GREEN/BLUE/BLACK/WHITE/RAMP/CHESS/BAR/CYCLE"
- id: lw3_hdmi_mode_query
  label: Query HDMI Mode (LW3)
  kind: query
  command: "GET /MEDIA/VIDEO/<out>.HdmiModeSetting"
  params:
    - name: out
      type: string
- id: lw3_hdmi_mode_set
  label: Set HDMI Mode (LW3)
  kind: action
  command: "SET /MEDIA/VIDEO/<out>.HdmiModeSetting=<HDMI_mode>"
  params:
    - name: out
      type: string
    - name: HDMI_mode
      type: integer
      description: "0=Auto, 1=DVI, 2=HDMI"
- id: lw3_tps_mode_setting_query
  label: Query TPS Mode Setting (LW3)
  kind: query
  command: "GET /REMOTE/D1.tpsModeSetting"
  params: []
- id: lw3_tps_mode_setting_set
  label: Set TPS Mode (LW3)
  kind: action
  command: "SET /REMOTE/D1.tpsModeSetting=<TPS_mode>"
  params:
    - name: TPS_mode
      type: string
      description: "A=Auto, H=HDBaseT, L=Long reach, 1=LPPF1, 2=LPPF2"
- id: lw3_tps_mode_query
  label: Query Established TPS Mode (LW3)
  kind: query
  command: "GET /REMOTE/D1.tpsMode"
  params: []

# ---- LW3: Audio port ----
- id: lw3_audio_source_status
  label: Audio Source Port Status (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.SourcePortStatus"
  params: []
- id: lw3_audio_dest_status
  label: Audio Destination Port Status (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortStatus"
  params: []
- id: lw3_audio_connection_list
  label: Audio Crosspoint Setting (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationConnectionList"
  params: []
- id: lw3_audio_switch
  label: Switch Audio Input (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:switch(<in>:<out>)"
  params:
    - name: in
      type: string
    - name: out
      type: string
- id: lw3_audio_autoselect_query
  label: Audio Autoselect Settings (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.DestinationPortAutoselect"
  params: []
- id: lw3_audio_autoselect_set
  label: Set Audio Autoselect Mode (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setDestinationPortAutoselect(<out>:<as_state><as_mode>)"
  params:
    - name: out
      type: string
    - name: as_state
      type: string
    - name: as_mode
      type: string
      description: "F/P/L/S (S=static follows video)"
- id: lw3_audio_priority_query
  label: Audio Input Port Priority (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/XP.PortPriorityList"
  params: []
- id: lw3_audio_priority_set
  label: Set Audio Input Port Priority (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:setAutoselectionPriority(<in>(<out>):<priority>)"
  params:
    - name: in
      type: string
    - name: out
      type: string
    - name: priority
      type: integer
- id: lw3_audio_mute_source
  label: Mute Audio Input (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_unmute_source
  label: Unmute Audio Input (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_lock_source
  label: Lock Audio Input (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_unlock_source
  label: Unlock Audio Input (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockSource(<in>)"
  params:
    - name: in
      type: string
- id: lw3_audio_mute_dest
  label: Mute Audio Output (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:muteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_unmute_dest
  label: Unmute Audio Output (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unmuteDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_lock_dest
  label: Lock Audio Output (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:lockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_audio_unlock_dest
  label: Unlock Audio Output (LW3)
  kind: action
  command: "CALL /MEDIA/AUDIO/XP:unlockDestination(<out>)"
  params:
    - name: out
      type: string
- id: lw3_vol_db_query
  label: Query Volume dB (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/<in>.VolumedB"
  params:
    - name: in
      type: string
- id: lw3_vol_db_set
  label: Set Volume dB (LW3)
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.VolumedB=<level>"
  params:
    - name: in
      type: string
    - name: level
      type: number
      description: "-95.625 dB .. 0 dB, step -0.375 dB"
- id: lw3_vol_pct_query
  label: Query Volume Percent (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/<in>.VolumePercent"
  params:
    - name: in
      type: string
- id: lw3_vol_pct_set
  label: Set Volume Percent (LW3)
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.VolumePercent=<vol_percent>"
  params:
    - name: in
      type: string
    - name: vol_percent
      type: number
      description: "0..100, step 0.01"
- id: lw3_balance_query
  label: Query Balance (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/<in>.Balance"
  params:
    - name: in
      type: string
- id: lw3_balance_set
  label: Set Balance (LW3)
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.Balance=<level>"
  params:
    - name: in
      type: string
    - name: level
      type: integer
      description: "-100 (left) .. 100 (right); 0=center"
- id: lw3_gain_query
  label: Query Gain (LW3)
  kind: query
  command: "GET /MEDIA/AUDIO/<in>.Gain"
  params:
    - name: in
      type: string
- id: lw3_gain_set
  label: Set Gain (LW3)
  kind: action
  command: "SET /MEDIA/AUDIO/<in>.Gain=<level>"
  params:
    - name: in
      type: string
    - name: level
      type: number
      description: "-12 .. 35.25 dB; default 0"

# ---- LW3: Event manager ----
- id: lw3_event_condition
  label: Set Event Condition (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.Condition=<expression>"
  params:
    - name: loc
      type: integer
      description: event location
    - name: expression
      type: string
- id: lw3_event_condition_inverted
  label: Set Event Condition Inverted (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionInverted=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_event_action
  label: Set Event Action (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.Action=<expression>"
  params:
    - name: loc
      type: integer
    - name: expression
      type: string
- id: lw3_event_timeout
  label: Set Event Condition Timeout (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionTimeout=<time>"
  params:
    - name: loc
      type: integer
    - name: time
      type: integer
      description: seconds
- id: lw3_event_end_check
  label: Set Event Condition End Check (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionEndCheck=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_event_timeout_cont
  label: Set Event Condition Timeout Continuous (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.ConditionTimeoutContinuous=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_event_name
  label: Set Event Name (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.Name=<string>"
  params:
    - name: loc
      type: integer
    - name: string
      type: string
      description: max 20 chars
- id: lw3_event_enabled
  label: Enable/Disable Event (LW3)
  kind: action
  command: "SET /EVENTS/E<loc>.Enabled=<true/false>"
  params:
    - name: loc
      type: integer
- id: lw3_event_trigger_condition
  label: Trigger Condition (LW3)
  kind: action
  command: "CALL /EVENTS/E<loc>:triggerCondition(1)"
  params:
    - name: loc
      type: integer
  notes: Plus-only; FW v1.3.0b6+
- id: lw3_event_condition_count
  label: Condition Counter (LW3)
  kind: query
  command: "GET /EVENTS/E<loc>.ConditionCount"
  params:
    - name: loc
      type: integer
- id: lw3_event_ext_trigger_count
  label: Condition Trigger Counter (LW3)
  kind: query
  command: "GET /EVENTS/E<loc>.ExternalConditionTriggerCount"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_event_action_test
  label: Test Event Action (LW3)
  kind: action
  command: "CALL /EVENTS/E<loc>:ActionTest(1)"
  params:
    - name: loc
      type: integer

# ---- LW3: Variable management (Plus-only) ----
- id: lw3_var_value
  label: Variable Value (LW3)
  kind: action
  command: "SET /CTRL/VARS/V<loc>.Value=<value>"
  params:
    - name: loc
      type: integer
      description: 1-30
    - name: value
      type: string
  notes: Plus-only
- id: lw3_var_add
  label: Variable Add (LW3)
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
  notes: Plus-only
- id: lw3_var_cycle
  label: Variable Cycle (LW3)
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
  notes: Plus-only
- id: lw3_var_case
  label: Variable Case (LW3)
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:case(<min> <max> <val>;)"
  params:
    - name: loc
      type: integer
    - name: cases
      type: string
  notes: Plus-only
- id: lw3_var_scanf
  label: Variable Scan (LW3)
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:scanf(<path>.<property>;<pattern>)"
  params:
    - name: loc
      type: integer
    - name: path
      type: string
    - name: pattern
      type: string
  notes: Plus-only
- id: lw3_var_printf
  label: Variable Printf (LW3)
  kind: action
  command: "CALL /CTRL/VARS/V<loc>:printf(<prefix>%s<postfix>)"
  params:
    - name: loc
      type: integer
    - name: format
      type: string
  notes: Plus-only

# ---- LW3: Network config ----
- id: lw3_dhcp_enable
  label: Set DHCP State (LW3)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.DhcpEnabled=<dhcp_status>"
  params:
    - name: dhcp_status
      type: string
- id: lw3_apply_settings
  label: Apply Network Settings (LW3)
  kind: action
  command: "CALL /MANAGEMENT/NETWORK:applySettings(1)"
  params: []
- id: lw3_static_ip
  label: Set Static IP (LW3)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticIpAddress=<IP_address>"
  params:
    - name: IP_address
      type: string
- id: lw3_static_netmask
  label: Set Static Netmask (LW3)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticNetworkMask=<netmask>"
  params:
    - name: netmask
      type: string
- id: lw3_static_gateway
  label: Set Static Gateway (LW3)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.StaticGatewayAddress=<gw_address>"
  params:
    - name: gw_address
      type: string
- id: lw3_mac_filter_addr
  label: MAC Filter Address (LW3)
  kind: action
  command: "SET /MANAGEMENT/MACFILTER.MACaddress<loc>=<MAC_address>;<receive>;<send>;<name>"
  params:
    - name: loc
      type: integer
      description: 1-8
    - name: MAC_address
      type: string
    - name: receive
      type: string
    - name: send
      type: string
    - name: name
      type: string
  notes: Plus-only
- id: lw3_mac_filter_enable
  label: MAC Filter Enable (LW3)
  kind: action
  command: "SET /MANAGEMENT/MACFILTER.FilterEnable=<bool>"
  params:
    - name: bool
      type: string
  notes: Plus-only
- id: lw3_lw2_port_block
  label: LW2 Control Port Blocking (LW3)
  kind: action
  command: "SET /MANAGEMENT/SERVICEFILTER.Lw2Enabled=<port_mode>"
  params:
    - name: port_mode
      type: string
- id: lw3_http_port_block
  label: HTTP Port Blocking (LW3)
  kind: action
  command: "SET /MANAGEMENT/SERVICEFILTER.HttpEnabled=<port_mode>"
  params:
    - name: port_mode
      type: string
- id: lw3_wake_on_lan
  label: Wake-on-LAN (LW3)
  kind: action
  command: "CALL /MEDIA/ETHERNET:wakeOnLan(MAC_address)"
  params:
    - name: MAC_address
      type: string
  notes: FW v1.3.0b6+
- id: lw3_hostname
  label: Set Host Name (LW3)
  kind: action
  command: "SET /MANAGEMENT/NETWORK.HostName=<unique_name>"
  params:
    - name: unique_name
      type: string
      description: 1-64 chars

# ---- LW3: Ethernet message sending ----
- id: lw3_tcp_message
  label: Send TCP Message ASCII (LW3)
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
  label: Send TCP Text (LW3)
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
  label: Send TCP Binary HEX (LW3)
  kind: action
  command: "CALL /MEDIA/ETHERNET:tcpBinary(<IP_address>:<port_no>=<HEX_message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: HEX_message
      type: string
- id: lw3_udp_message
  label: Send UDP Message ASCII (LW3)
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
  label: Send UDP Text (LW3)
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
  label: Send UDP Binary HEX (LW3)
  kind: action
  command: "CALL /MEDIA/ETHERNET:udpBinary(<IP_address>:<port_no>=<HEX_message>)"
  params:
    - name: IP_address
      type: string
    - name: port_no
      type: integer
    - name: HEX_message
      type: string

# ---- LW3: HTTP messaging (Plus-only) ----
- id: lw3_http_server_ip
  label: HTTP Target IP (LW3)
  kind: action
  command: "SET /CTRL/HTTP/C1.ServerIP=<IP_address>"
  params:
    - name: IP_address
      type: string
  notes: Plus-only
- id: lw3_http_server_port
  label: HTTP Target Port (LW3)
  kind: action
  command: "SET /CTRL/HTTP/C1.ServerPort=<port_no>"
  params:
    - name: port_no
      type: integer
  notes: Plus-only
- id: lw3_http_file
  label: HTTP Target Path (LW3)
  kind: action
  command: "SET /CTRL/HTTP/C1.File=<path>"
  params:
    - name: path
      type: string
  notes: Plus-only
- id: lw3_http_header
  label: HTTP Message Header (LW3)
  kind: action
  command: "SET /CTRL/HTTP/C1.Header=<header_text>"
  params:
    - name: header_text
      type: string
  notes: Plus-only
- id: lw3_http_post
  label: HTTP Post (LW3)
  kind: action
  command: "CALL /CTRL/HTTP/C1:post(<body_text>)"
  params:
    - name: body_text
      type: string
  notes: Plus-only
- id: lw3_http_put
  label: HTTP Put (LW3)
  kind: action
  command: "CALL /CTRL/HTTP/C1:put(<body_text>)"
  params:
    - name: body_text
      type: string
  notes: Plus-only

# ---- LW3: TCP message recognizer (Plus-only) ----
- id: lw3_tcp_rec_server_ip
  label: TCP Recognizer Server IP (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ServerIP(<IP_address>)"
  params:
    - name: loc
      type: integer
      description: 1-3
    - name: IP_address
      type: string
  notes: Plus-only
- id: lw3_tcp_rec_server_port
  label: TCP Recognizer Server Port (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ServerPort(<port_no>)"
  params:
    - name: loc
      type: integer
    - name: port_no
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_connect
  label: TCP Recognizer Connect (LW3)
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:connect()"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_disconnect
  label: TCP Recognizer Disconnect (LW3)
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:disconnect()"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_delimiter
  label: TCP Recognizer Delimiter Hex (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.DelimiterHex=<delimiter>"
  params:
    - name: loc
      type: integer
    - name: delimiter
      type: string
  notes: Plus-only
- id: lw3_tcp_rec_timeout
  label: TCP Recognizer Timeout (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.TimeOut=<timeout>"
  params:
    - name: loc
      type: integer
    - name: timeout
      type: integer
      description: ms, min 10, 0=disabled
  notes: Plus-only
- id: lw3_tcp_rec_rx
  label: TCP Recognizer Rx (LW3)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.Rx"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_rxhex
  label: TCP Recognizer Rx Hex (LW3)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.RxHex"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_clear
  label: TCP Recognizer Clear (LW3)
  kind: action
  command: "CALL /CTRL/TCP/C<loc>:clear()"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_active_rx
  label: TCP Recognizer Active Rx (LW3)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.ActiveRx"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_active_rxhex
  label: TCP Recognizer Active Rx Hex (LW3)
  kind: query
  command: "GET /CTRL/TCP/C<loc>.ActiveRxHex"
  params:
    - name: loc
      type: integer
  notes: Plus-only
- id: lw3_tcp_rec_active_timeout
  label: TCP Recognizer Active Timeout (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: loc
      type: integer
    - name: a_timeout
      type: integer
      description: ms 0-255, default 50
  notes: Plus-only
- id: lw3_tcp_rec_action_trigger
  label: TCP Recognizer Action Trigger (LW3)
  kind: action
  command: "SET /CTRL/TCP/C<loc>.ActionTrigger=<event_nr>"
  params:
    - name: loc
      type: integer
    - name: event_nr
      type: integer
  notes: Plus-only

# ---- LW3: RS-232 port config ----
- id: lw3_uart_control_protocol
  label: UART Control Protocol (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.ControlProtocol=<protocol>"
  params:
    - name: port
      type: string
      description: "P1 (local) / P2 (TPS link)"
    - name: protocol
      type: integer
      description: "0=LW2, 1=LW3"
- id: lw3_uart_baud
  label: UART Baud Rate (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.BaudRate=<baud_rate>"
  params:
    - name: port
      type: string
    - name: baud_rate
      type: integer
      description: "0:4800,1:7200,2:9600,3:14400,4:19200,5:38400,6:57600,7:115200"
- id: lw3_uart_databits
  label: UART Data Bits (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.DataBits=<data_bits>"
  params:
    - name: port
      type: string
    - name: data_bits
      type: integer
      description: "8 or 9"
- id: lw3_uart_stopbits
  label: UART Stop Bits (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.StopBits=<stop_bits>"
  params:
    - name: port
      type: string
    - name: stop_bits
      type: integer
      description: "0:1, 1:1.5, 2:2"
- id: lw3_uart_parity
  label: UART Parity (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.Parity=<parity_value>"
  params:
    - name: port
      type: string
    - name: parity_value
      type: integer
      description: "0:none, 1:odd, 2:even"
- id: lw3_uart_mode
  label: UART RS-232 Operation Mode (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.Rs232Mode=<mode>"
  params:
    - name: port
      type: string
    - name: mode
      type: integer
      description: "0:Pass-through, 1:Control, 2:Command injection"
- id: lw3_uart_ci_enable
  label: UART Command Injection Enable (LW3)
  kind: action
  command: "SET /MEDIA/UART/<port>.CommandInjectionEnable=<CI_set>"
  params:
    - name: port
      type: string
    - name: CI_set
      type: string
      description: "1/true to enable"

# ---- LW3: RS-232 message sending ----
- id: lw3_uart_send_message
  label: Send RS-232 Message ASCII (LW3)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendMessage(<message>)"
  params:
    - name: message
      type: string
- id: lw3_uart_send_text
  label: Send RS-232 Text (LW3)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendText(<message>)"
  params:
    - name: message
      type: string
- id: lw3_uart_send_binary
  label: Send RS-232 Binary HEX (LW3)
  kind: action
  command: "CALL /MEDIA/UART/P1:sendBinaryMessage(<message>)"
  params:
    - name: message
      type: string

# ---- LW3: RS-232 message recognizer (Plus-only) ----
- id: lw3_rs232_rec_enable
  label: RS-232 Recognizer Enable (LW3)
  kind: action
  command: "SET /MEDIA/UART/<serial_port>.RecognizerEnable=<recognizer_enable>"
  params:
    - name: serial_port
      type: string
      description: "P1/P2"
    - name: recognizer_enable
      type: string
  notes: Plus-only
- id: lw3_rs232_rec_delimiter
  label: RS-232 Recognizer Delimiter (LW3)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.DelimiterHex=<delimiter>"
  params:
    - name: delimiter
      type: string
  notes: Plus-only
- id: lw3_rs232_rec_timeout
  label: RS-232 Recognizer Timeout (LW3)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.TimeOut=<timeout>"
  params:
    - name: timeout
      type: integer
      description: ms, min 10
  notes: Plus-only
- id: lw3_rs232_rec_rx
  label: RS-232 Recognizer Rx (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.Rx"
  params: []
  notes: Plus-only
- id: lw3_rs232_rec_rxhex
  label: RS-232 Recognizer Rx Hex (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.RxHex"
  params: []
  notes: Plus-only
- id: lw3_rs232_rec_clear
  label: RS-232 Recognizer Clear (LW3)
  kind: action
  command: "CALL /MEDIA/UART/RECOGNIZER:clear()"
  params: []
  notes: Plus-only
- id: lw3_rs232_rec_active_rx
  label: RS-232 Recognizer Active Rx (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRx"
  params: []
  notes: Plus-only
- id: lw3_rs232_rec_active_rxhex
  label: RS-232 Recognizer Active Rx Hex (LW3)
  kind: query
  command: "GET /MEDIA/UART/RECOGNIZER.ActiveRxHex"
  params: []
  notes: Plus-only
- id: lw3_rs232_rec_active_timeout
  label: RS-232 Recognizer Active Timeout (LW3)
  kind: action
  command: "SET /MEDIA/UART/RECOGNIZER.ActivePropertyTimeout=<a_timeout>"
  params:
    - name: a_timeout
      type: integer
      description: ms 0-255, default 50
  notes: Plus-only

# ---- LW3: CEC (Plus-only) ----
- id: lw3_cec_send_click
  label: CEC Press&Release (LW3)
  kind: action
  command: "CALL /MEDIA/CEC/<port>:sendClick(<command>)"
  params:
    - name: port
      type: string
      description: "I1-I4 / O1-O2"
    - name: command
      type: string
      description: "e.g. ok, up, down, play, power_on, etc."
  notes: Plus-only; FW v1.3.0b6+
- id: lw3_cec_send
  label: CEC Send (LW3)
  kind: action
  command: "CALL /MEDIA/CEC/<port>:send(<command>)"
  params:
    - name: port
      type: string
    - name: command
      type: string
      description: "image_view_on, standby, active_source, give_power_status, etc."
  notes: Plus-only
- id: lw3_cec_osd_string
  label: CEC OSD String (LW3)
  kind: action
  command: "SET /MEDIA/CEC/<port>.OsdString=<text>"
  params:
    - name: port
      type: string
    - name: text
      type: string
      description: max 14 chars
  notes: Plus-only
- id: lw3_cec_send_hex
  label: CEC Send Hex (LW3)
  kind: action
  command: "CALL /MEDIA/CEC/<port>:sendHex(<hex_code>)"
  params:
    - name: port
      type: string
    - name: hex_code
      type: string
      description: max 30 chars (15 bytes)
  notes: Plus-only
- id: lw3_cec_last_received
  label: Last Received CEC Message (LW3)
  kind: query
  command: "GET /MEDIA/CEC/<port>.LastReceivedMessage"
  params:
    - name: port
      type: string
  notes: Plus-only

# ---- LW3: IR ----
- id: lw3_ir_ci_enable
  label: IR Command Injection Enable (LW3)
  kind: action
  command: "SET /MEDIA/IR/<port>.CommandInjectionEnable=<CI_set>"
  params:
    - name: port
      type: string
    - name: CI_set
      type: string
- id: lw3_ir_modulation
  label: IR Output Modulation Enable (LW3)
  kind: action
  command: "SET /MEDIA/IR/<out>.EnableModulation=<mod_set>"
  params:
    - name: out
      type: string
    - name: mod_set
      type: string
- id: lw3_ir_send_pronto
  label: Send Pronto Hex via IR (LW3)
  kind: action
  command: "CALL /MEDIA/IR/D1:sendProntoHex(<hex_code>)"
  params:
    - name: hex_code
      type: string
      description: little-endian pronto hex, max 765 chars

# ---- LW3: GPIO ----
- id: lw3_gpio_direction
  label: GPIO Pin Direction (LW3)
  kind: action
  command: "SET /MEDIA/GPIO/<port>.Direction(<dir>)"
  params:
    - name: port
      type: string
    - name: dir
      type: string
      description: "I=input, O=output"
- id: lw3_gpio_output
  label: GPIO Pin Output Level (LW3)
  kind: action
  command: "SET /MEDIA/GPIO/<port>.Output(<value>)"
  params:
    - name: port
      type: string
    - name: value
      type: string
      description: "H=high, L=low"
- id: lw3_gpio_toggle
  label: GPIO Toggle (LW3)
  kind: action
  command: "CALL /MEDIA/GPIO/<port>:toggle()"
  params:
    - name: port
      type: string

# ---- LW3: EDID management ----
- id: lw3_edid_status
  label: Emulated EDIDs (LW3)
  kind: query
  command: "GET /EDID.EdidStatus"
  params: []
- id: lw3_edid_validity
  label: Dynamic EDID Validity (LW3)
  kind: query
  command: "GET /EDID/D/<loc>.Validity"
  params:
    - name: loc
      type: string
      description: "D1-D#"
- id: lw3_edid_resolution
  label: User EDID Preferred Resolution (LW3)
  kind: query
  command: "GET /EDID/U/<loc>.PreferredResolution"
  params:
    - name: loc
      type: string
      description: "U1-U#"
- id: lw3_edid_switch
  label: Emulate EDID on Input Port (LW3)
  kind: action
  command: "CALL /EDID:switch(<source>:<destination>)"
  params:
    - name: source
      type: string
      description: "D#/U#/F#"
    - name: destination
      type: string
      description: "E1-E#"
- id: lw3_edid_switch_all
  label: Emulate EDID to All Inputs (LW3)
  kind: action
  command: "CALL /EDID:switchAll(<source>)"
  params:
    - name: source
      type: string
- id: lw3_edid_copy
  label: Copy EDID to User Memory (LW3)
  kind: action
  command: "CALL /EDID:copy(<source>:<user_mem>)"
  params:
    - name: source
      type: string
    - name: user_mem
      type: string
      description: "U1-U#"
- id: lw3_edid_delete
  label: Delete EDID from User Memory (LW3)
  kind: action
  command: "CALL /EDID:delete(<user_mem>)"
  params:
    - name: user_mem
      type: string
- id: lw3_edid_reset
  label: Reset Emulated EDIDs (LW3)
  kind: action
  command: "CALL /EDID:reset()"
  params: []
```

## Feedbacks
```yaml
# Port status response codes (5-char ASCII, first char mute/lock state + 2-byte HEX)
- id: video_source_port_status
  type: string
  description: "Per input port: T=unlocked/unmuted, M=muted, L=locked, U=locked+muted + 4-hex (audio/HDCP/signal/connection)"
- id: audio_source_port_status
  type: string
  description: "Per input port: T/M/L/U + 4-hex (signal/connection)"
# UNRESOLVED: full enum tables for every query response not exhaustively enumerated
```

## Variables
```yaml
# Analog audio input adjustable parameters
- id: volume_db
  type: number
  range: "-95.625 .. 0 dB, step -0.375 dB"
- id: volume_percent
  type: number
  range: "0 .. 100 %, step 0.01 %"
- id: balance
  type: integer
  range: "-100 .. 100 (0=center)"
- id: gain
  type: number
  range: "-12 .. 35.25 dB (default 0)"
# Custom user variables (/CTRL/VARS/V1..V30) are Plus-only; omitted from base TX220.
```

## Events
```yaml
# LW3 change notifications (CHG prefix) generated on subscribed node property changes.
# Example: «CHG /EDID.EdidStatus=F48:E1
# Subscriptions via OPEN / CLOSE on node paths; per-connection, cleared on disconnect.
# UNRESOLVED: full list of notifiable property paths not exhaustively enumerated in source.
```

## Macros
```yaml
# Macros stored on device; runnable via LW3 CALL /CTRL/MACROS:run(<name>) (Plus-only).
# LW2/LW3 batch command salvo over HTTP supported: post to <IP>/protocol.lw3.
# UNRESOLVED: macro authoring syntax / storage commands not detailed in source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety/interlock warnings or power-on
# sequencing requirements for this model. GPIO max-total-current note (180 mA) is
# electrical, not a control interlock.
```

## Notes
- Device = DP-TPS-TX220 (DisplayPort in, TPS/HDBaseT out O1 + HDMI out O2). Audio in (analog) = I2.
- Two control protocols: **LW2** (legacy, RAW over TCP 10001, or RS-232; commands in `{}`; responses in `()`) and **LW3** (tree-based, CrLf-terminated, over TCP 6107 or RS-232). RS-232 Control mode default protocol = LW2.
- RS-232 connector: 3-pole Phoenix (local = P1; TPS link serial = P2). RS-232 op-mode (Pass-through / Control / Command Injection) mirrored on local+link ports.
- Default serial config (factory): 57600 8N1, LW2, Pass-through mode, Command Injection enabled (CI ports 8001 local / 8002 TPS).
- Default network: IP 192.168.0.100/24, GW 192.168.0.1, DHCP off.
- Many advanced features (Cleartext Login, Variables, TCP/RS-232 Recognizers, HTTP messaging, CEC, ConnectedSource query, MAC filter, macro run) are documented as **SW4-TPS-TX240-Plus only** — these are tagged `notes: Plus-only` in Actions; they may NOT be available on the base DP-TPS-TX220. Verify against a real device before relying on them.
- TPS modes: Auto / HDBaseT / Long reach / LPPF1 (RS-232 @9600 only) / LPPF2 (RS-232 @9600 + Ethernet).

<!-- UNRESOLVED: firmware version compatibility ranges per command not fully stated (some gated to FW v1.2.0b14 / v1.3.0b3 / v1.3.0b6). -->
<!-- UNRESOLVED: GPIO flow_control-style handshake not documented for RS-232. -->
<!-- UNRESOLVED: exact Plus vs base feature set for DP-TPS-TX220 not disambiguated in source. -->

## Provenance

```yaml
source_domains:
  - assets.prod.pim.lightware.com
source_urls:
  - https://assets.prod.pim.lightware.com/assets/File-Downloads/Guides-and-Manuals/User-Manual/HTML/HDMI-TPS-TX200_series/UM.html
retrieved_at: 2026-07-31T11:16:20.042Z
last_checked_at: 2026-10-07T12:45:35.266Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T12:45:35.266Z
matched_actions: 198
action_count: 198
confidence: medium
summary: "All 198 action units match source commands and transport values are supported. The source names the DP-TPS-TX220 and the spec flags Plus-only commands. Source typos on 3 commands were silently corrected. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- OPEN
- CLOSE
- GETALL
- MAN
- "exact hardware variant features (Plus-only vs base TX220) for several advanced commands are model-gated; GPIO electrical levels and full FW-compat matrix not in scope of this spec."
- "not stated in source"
- "full enum tables for every query response not exhaustively enumerated"
- "full list of notifiable property paths not exhaustively enumerated in source."
- "macro authoring syntax / storage commands not detailed in source."
- "source contains no explicit safety/interlock warnings or power-on"
- "firmware version compatibility ranges per command not fully stated (some gated to FW v1.2.0b14 / v1.3.0b3 / v1.3.0b6)."
- "GPIO flow_control-style handshake not documented for RS-232."
- "exact Plus vs base feature set for DP-TPS-TX220 not disambiguated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
