---
spec_id: admin/tvone-c7-pro-hdmi-4k4in
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE C7 Pro HDMI 4K 4-In Control Spec"
manufacturer: tvONE
model_family: C7-PRO-2200
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - C7-PRO-2200
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.tvone.com
source_urls:
  - "https://api.tvone.com/products/c7-series/c7-pro-2200/tvONE%20CALICO%20PRO%20C7-PRO-2200%20Commands_current.pdf"
  - https://api.tvone.com/products/c7-series/c7-pro-2200/index.html
  - https://api.tvone.com/products/c7-series/c7-pro-2200/WebsocketAPI_CALICO_C7-PRO_current.pdf
  - https://api.tvone.com
retrieved_at: 2026-08-11T03:46:09.506Z
last_checked_at: 2026-08-19T10:00:54.559Z
generated_at: 2026-08-19T10:00:54.559Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - System.HDCPPrintTable
  - System.Minidump
  - System.Menus
  - System.ConfigName
  - System.Messages
  - System.PhaseTrainTime
  - System.Security.Defaults
  - System.Security.Certificates.Current.TransferPassword
  - "Slot<n>.Cardtype"
  - "Slot<n>.Carddata"
  - "Slot<n>.Resolutions"
  - "Slot<n>.Resolutions.Resolution<n>.Name"
  - "source documents a very large API surface (System, Device, Slots, Routing, Presets, Audio, Canvas, etc.); this spec captures the namespaces explicitly listed in the supplied refined excerpt plus the global connection/login/feedback contract. Namespaces present in the device but absent from the supplied source excerpt (Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows, Profiles, TPG, IPStreams, Playlists) are marked UNRESOLVED and should be added when their source text is supplied."
  - "data bits not stated in source"
  - "parity not stated in source"
  - "stop bits not stated in source"
  - "flow control not stated in source"
  - "Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows,"
  - "no Variables are documented as a separate category in the source;"
  - "no named macros documented in source."
  - "source documents warnings about loss of communication when"
  - "device has an onboard HTTPS webserver (WebserverEnabled) and an HTTPS certificate subsystem, but the supplied source did not document its HTTP/REST surface (paths, methods, JSON shapes)."
  - "source does not state firmware compatibility ranges for this spec."
  - "source documents an asynchronous operation pattern (Copy, Delete, Move, CreateDirectory, FTP sync) whose completion is signalled via the MEDIA_STORAGE OPERATION_DONE event with a 0/non-zero exit code — the API itself does not provide a way to wait synchronously."
verification:
  verdict: verified
  checked_at: 2026-08-19T10:00:54.559Z
  matched_actions: 375
  action_count: 375
  confidence: medium
  summary: "All 375 spec actions match literal commands verbatim in the source; transport (port 10001, baud 115200) confirmed; no fabrication or drift detected. (12 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-11
---

# tvONE C7 Pro HDMI 4K 4-In Control Spec

## Summary
CALICO PRO series multi-window video processor (model C7-PRO-2200) controllable via a TCP/IP text command-line API on port 10001. RS-232 is supported but documented as diagnostic only ("Not all commands will work when using RS232"). Commands are namespace-dot-path strings terminated by CRLF, and the device requires a `Login(username,password)` handshake before any other command is accepted.

<!-- UNRESOLVED: source documents a very large API surface (System, Device, Slots, Routing, Presets, Audio, Canvas, etc.); this spec captures the namespaces explicitly listed in the supplied refined excerpt plus the global connection/login/feedback contract. Namespaces present in the device but absent from the supplied source excerpt (Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows, Profiles, TPG, IPStreams, Playlists) are marked UNRESOLVED and should be added when their source text is supplied. -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 10001
serial:
  baud_rate: 115200
  data_bits: null  # UNRESOLVED: data bits not stated in source
  parity: null  # UNRESOLVED: parity not stated in source
  stop_bits: null  # UNRESOLVED: stop bits not stated in source
  flow_control: null  # UNRESOLVED: flow control not stated in source
auth:
  type: password
  # Source describes a Login(username,password) handshake required before any other command.
  # Defaults documented in source: AdminUsername=admin, AdminPassword=adminpw,
  # User1=user1/user1pw (PowerUser), User2-4=user2-4/user2-4pw (User),
  # Test=test/<Restricted> with 14400s timeout.
```

## Traits
```yaml
- powerable   # inferred: System.Reset() reboot command documented; POWERMODE_CHANGED event documents Standby/Resuming/Resumed power state
- queryable   # inferred: extensive read-only properties (Device.*, System.*, Slot<n>.*) all return values via the same `<prop> = <value> !Done <prop>` response shape
- routable    # inferred: input/output modules expose Slot<n>.In<n>/Out<n> routing, plus HDCP, audio routing, and presets infrastructure
- levelable   # inferred: AudioVolume, FanSpeed, SCurve, LabelTextSize, ResolutionWidth/Height documented
```

## Actions
```yaml
# CRITICAL: every command listed below is taken verbatim from the supplied source
# (CALICO PRO C7-PRO-2200 Commands manual). Each command is one TCP/IP text line
# terminated with CRLF; device responds with `!Done <command>` or `!Failed <command>`.
# Where the source documents a parameterized form, the action carries a
# `command` template with the variable slot in braces.
#
# Namespaces covered in supplied source: TopLevel, Device, System, System.Comms,
# System.Comms.Ethernet (+ DHCP), System.Comms.RS232, System.Constraints,
# System.TemperatureControl, System.Sensors, System.Security (+ Certificates),
# System.Time (+ NTP), System.EdidUtils, System.Clients.Ftp,
# System.Services.SNMP, System.Services.SyslogRemote, Slots, HDMI Input,
# SDI 12G Input, SDI 3G Input, Streaming Media 4K Playback Input (incl. ActiveQueue,
# QueueItems, Label, Storage USB/Local/SyncGroup, Networking, Update), HDBaseT Input,
# HDMI Output, SDI 12G Output. Namespaces mentioned by name only in supplied
# excerpt (Routing, Presets, Audio, Canvas, etc.) are not enumerated here and
# remain UNRESOLVED until their command rows are supplied.

# --- Top-level session commands ---
- id: login
  label: Login
  kind: action
  command: 'Login({username},{password})'
  params:
    - name: username
      type: string
      description: Account username (e.g. admin, user1, test)
    - name: password
      type: string
      description: Account password (default admin/adminpw, user1/user1pw, etc.)
- id: logout
  label: Logout
  kind: action
  command: 'Logout()'
  params: []
- id: start_batch
  label: Start Batch
  kind: action
  command: 'StartBatch()'
  params: []
- id: end_batch
  label: End Batch
  kind: action
  command: 'EndBatch()'
  params: []
- id: namespaces
  label: List Namespaces
  kind: query
  command: 'Namespaces'
  params: []
- id: root
  label: List Root Commands
  kind: query
  command: 'Root'
  params: []

# --- Device ---
- id: device_list
  label: List Device Settings
  kind: query
  command: 'Device'
  params: []
- id: device_model_name
  label: Get Model Name
  kind: query
  command: 'Device.ModelName'
  params: []
- id: device_model_number
  label: Get Model Number
  kind: query
  command: 'Device.ModelNumber'
  params: []
- id: device_serial_number
  label: Get Serial Number
  kind: query
  command: 'Device.SerialNumber'
  params: []
- id: device_backplane_number
  label: Get Backplane Number
  kind: query
  command: 'Device.BackplaneNumber'
  params: []
- id: device_software_version
  label: Get Software Version
  kind: query
  command: 'Device.SoftwareVersion'
  params: []
- id: device_software_date
  label: Get Software Build Date
  kind: query
  command: 'Device.SoftwareDate'
  params: []
- id: device_software_update
  label: Initiate Firmware Update
  kind: action
  command: 'Device.SoftwareUpdate()'
  params: []
- id: device_media_card_update
  label: Initiate Media Card CPU Firmware Update
  kind: action
  command: 'Device.MediaCardUpdate()'
  params: []

# --- System ---
- id: system_list
  label: List System Settings
  kind: query
  command: 'System'
  params: []
- id: system_reset
  label: System Reset (Reboot)
  kind: action
  command: 'System.Reset()'
  params: []
- id: system_save_all_settings
  label: Save All Settings to Persistent Memory
  kind: action
  command: 'System.SaveAllSettings()'
  params: []
- id: system_save_system_settings
  label: Save System Settings
  kind: action
  command: 'System.SaveSystemSettings()'
  params: []
- id: system_save_resources
  label: Save Resources Settings
  kind: action
  command: 'System.SaveResources()'
  params: []
- id: system_save_front_panel
  label: Save Front Panel Settings
  kind: action
  command: 'System.SaveFrontPanel()'
  params: []
- id: system_save_live_config
  label: Save Live Config (Aliases, Routing, Slots)
  kind: action
  command: 'System.SaveLiveConfig()'
  params: []
- id: system_restore_all
  label: Restore All Saved Settings
  kind: action
  command: 'System.RestoreAll()'
  params: []
- id: system_clear_saved_settings
  label: Clear All Saved Settings
  kind: action
  command: 'System.ClearSavedSettings()'
  params: []
- id: system_clear_live_config
  label: Clear Live Config
  kind: action
  command: 'System.ClearLiveConfig()'
  params: []
- id: system_clear_saved_ip_streams
  label: Clear Saved IP Streams
  kind: action
  command: 'System.ClearSavedIPStreams()'
  params: []
- id: system_clear_saved_playlists
  label: Clear Saved Playlists
  kind: action
  command: 'System.ClearSavedPlaylists()'
  params: []
- id: system_backup_to_sd_card
  label: Backup Settings (incl. Presets)
  kind: action
  command: 'System.BackupToSDCard()'
  params: []
- id: system_restore_backup
  label: Restore Backup
  kind: action
  command: 'System.RestoreBackup()'
  params: []
- id: system_hdcp_clear_key_file
  label: Clear HDCP Key Cache
  kind: action
  command: 'System.HDCPClearKeyFile()'
  params: []
- id: system_clear_all_output_maps
  label: Clear All Output Maps
  kind: action
  command: 'System.ClearAllOutputMaps()'
  params: []
- id: system_get_status
  label: Get System Status
  kind: query
  command: 'System.Status'
  params: []
- id: system_get_module_update_status
  label: Get Module Update Status
  kind: query
  command: 'System.ModuleUpdateStatus'
  params: []
- id: system_get_api_version
  label: Get API Version
  kind: query
  command: 'System.APIVersion'
  params: []
- id: system_get_unit_description
  label: Get Device Name
  kind: query
  command: 'System.UnitDescription'
  params: []
- id: system_set_unit_description
  label: Set Device Name
  kind: action
  command: 'System.UnitDescription = "{name}"'
  params:
    - name: name
      type: string
      description: New device name (max 32 ASCII Extended chars; quotes optional; empty string allowed)
- id: system_get_synclock_inhibit
  label: Get Synclock Inhibit
  kind: query
  command: 'System.SynclockInhibit'
  params: []
- id: system_set_synclock_inhibit
  label: Set Synclock Inhibit
  kind: action
  command: 'System.SynclockInhibit = {value}'
  params:
    - name: value
      type: enum
      description: On or Off
- id: system_get_preset_easing
  label: Get Preset Easing
  kind: query
  command: 'System.PresetEasing'
  params: []
- id: system_set_preset_easing
  label: Set Preset Easing
  kind: action
  command: 'System.PresetEasing = {value}'
  params:
    - name: value
      type: enum
      description: On or Off
- id: system_get_alerts
  label: Get System Alerts
  kind: query
  command: 'System.Alerts'
  params: []
- id: system_get_hdcp_debug
  label: Get HDCP Debug Mode
  kind: query
  command: 'System.HDCPDebug'
  params: []
- id: system_set_hdcp_debug
  label: Set HDCP Debug Mode
  kind: action
  command: 'System.HDCPDebug = {value}'
  params:
    - name: value
      type: boolean
      description: Enable/disable HDCP diagnostics
- id: system_get_wprst_seq_num
  label: Get Preset Restore Sequence Number
  kind: query
  command: 'System.WPrstSeqNum'
  params: []

# --- System.Comms (Ethernet + RS232) ---
- id: comms_list
  label: List Comms Settings
  kind: query
  command: 'System.Comms'
  params: []

- id: eth_get_enabled
  label: Get Ethernet Enabled
  kind: query
  command: 'System.Comms.Ethernet.Enabled'
  params: []
- id: eth_set_enabled
  label: Set Ethernet Enabled
  kind: action
  command: 'System.Comms.Ethernet.Enabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off (restart required)
- id: eth_get_mac
  label: Get Ethernet MAC Address
  kind: query
  command: 'System.Comms.Ethernet.MACAddress'
  params: []
- id: eth_get_ip
  label: Get Ethernet IP Address
  kind: query
  command: 'System.Comms.Ethernet.IPAddress'
  params: []
- id: eth_set_ip
  label: Set Ethernet IP Address
  kind: action
  command: 'System.Comms.Ethernet.IPAddress = {ip}'
  params:
    - name: ip
      type: string
      description: Static IPv4 address (ignored if DHCP enabled)
- id: eth_get_subnet
  label: Get Ethernet Subnet Mask
  kind: query
  command: 'System.Comms.Ethernet.IPSubnetMask'
  params: []
- id: eth_set_subnet
  label: Set Ethernet Subnet Mask
  kind: action
  command: 'System.Comms.Ethernet.IPSubnetMask = {mask}'
  params:
    - name: mask
      type: string
      description: IPv4 subnet mask
- id: eth_get_gateway
  label: Get Ethernet Gateway
  kind: query
  command: 'System.Comms.Ethernet.IPGateway'
  params: []
- id: eth_set_gateway
  label: Set Ethernet Gateway
  kind: action
  command: 'System.Comms.Ethernet.IPGateway = {gw}'
  params:
    - name: gw
      type: string
      description: IPv4 gateway
- id: eth_get_command_port
  label: Get Command Port
  kind: query
  command: 'System.Comms.Ethernet.CommandPort'
  params: []
- id: eth_set_command_port
  label: Set Command Port
  kind: action
  command: 'System.Comms.Ethernet.CommandPort = {port}'
  params:
    - name: port
      type: integer
      description: TCP port for the command-line API
- id: eth_get_webserver_enabled
  label: Get Webserver Enabled
  kind: query
  command: 'System.Comms.Ethernet.WebserverEnabled'
  params: []
- id: eth_set_webserver_enabled
  label: Set Webserver Enabled
  kind: action
  command: 'System.Comms.Ethernet.WebserverEnabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off
- id: eth_restart
  label: Restart Ethernet Adaptor
  kind: action
  command: 'System.Comms.Ethernet.RestartEthernet()'
  params: []
- id: eth_save_config
  label: Save Ethernet Config Permanently
  kind: action
  command: 'System.Comms.Ethernet.SaveEthernetConfig()'
  params: []

- id: eth_dhcp_get_enabled
  label: Get DHCP Enabled
  kind: query
  command: 'System.Comms.Ethernet.DHCP.Enabled'
  params: []
- id: eth_dhcp_set_enabled
  label: Set DHCP Enabled
  kind: action
  command: 'System.Comms.Ethernet.DHCP.Enabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off
- id: eth_dhcp_get_ip
  label: Get DHCP-Assigned IP
  kind: query
  command: 'System.Comms.Ethernet.DHCP.IPAddress'
  params: []
- id: eth_dhcp_get_subnet
  label: Get DHCP-Assigned Subnet
  kind: query
  command: 'System.Comms.Ethernet.DHCP.IPSubnetMask'
  params: []
- id: eth_dhcp_get_gateway
  label: Get DHCP-Assigned Gateway
  kind: query
  command: 'System.Comms.Ethernet.DHCP.IPGateway'
  params: []

- id: rs232_get_baud
  label: Get RS-232 Baud Rate
  kind: query
  command: 'System.Comms.RS232.Baudrate'
  params: []
- id: rs232_set_baud
  label: Set RS-232 Baud Rate
  kind: action
  command: 'System.Comms.RS232.Baudrate = {baud}'
  params:
    - name: baud
      type: integer
      description: Baud rate in bits per second

# --- System.Constraints (read-only capability counters) ---
- id: constraints_list
  label: List System Constraints
  kind: query
  command: 'System.Constraints'
  params: []
- id: constraints_max_inputs
  label: Get Max Inputs
  kind: query
  command: 'System.Constraints.MaxInputs'
  params: []
- id: constraints_max_outputs
  label: Get Max Outputs
  kind: query
  command: 'System.Constraints.MaxOutputs'
  params: []
- id: constraints_max_windows
  label: Get Max Windows
  kind: query
  command: 'System.Constraints.MaxWindows'
  params: []
- id: constraints_max_canvases
  label: Get Max Canvases
  kind: query
  command: 'System.Constraints.MaxCanvases'
  params: []
- id: constraints_max_layouts
  label: Get Max Layouts
  kind: query
  command: 'System.Constraints.MaxLayouts'
  params: []
- id: constraints_max_scaler_panes
  label: Get Max Scaler Panes
  kind: query
  command: 'System.Constraints.MaxScalerPanes'
  params: []
- id: constraints_max_pv_windows
  label: Get Max Preview Windows
  kind: query
  command: 'System.Constraints.MaxPVWindows'
  params: []
- id: constraints_max_storyboards
  label: Get Max Storyboards
  kind: query
  command: 'System.Constraints.MaxStoryboards'
  params: []
- id: constraints_max_labels
  label: Get Max Labels
  kind: query
  command: 'System.Constraints.MaxLabels'
  params: []
- id: constraints_max_4k_labels
  label: Get Max 4K Labels
  kind: query
  command: 'System.Constraints.Max4KLabels'
  params: []
- id: constraints_max_maps_per_output
  label: Get Max Maps per Output
  kind: query
  command: 'System.Constraints.MaxMapsPerOutputs'
  params: []

# --- System.TemperatureControl ---
- id: tc_list
  label: List Temperature Control
  kind: query
  command: 'System.TemperatureControl'
  params: []
- id: tc_get_fan_speed
  label: Get Fan Speed %
  kind: query
  command: 'System.TemperatureControl.FanSpeed'
  params: []
- id: tc_set_fan_speed
  label: Set Fan Speed %
  kind: action
  command: 'System.TemperatureControl.FanSpeed = {pct}'
  params:
    - name: pct
      type: integer
      description: Fan speed percent (0-100; recommended 50-85)
- id: tc_get_fan_inlet_0_rpm
  label: Get Fan Inlet 0 RPM
  kind: query
  command: 'System.TemperatureControl.FanInlet0_RPM'
  params: []
- id: tc_get_fan_inlet_1_rpm
  label: Get Fan Inlet 1 RPM
  kind: query
  command: 'System.TemperatureControl.FanInlet1_RPM'
  params: []
- id: tc_get_fan_inlet_2_rpm
  label: Get Fan Inlet 2 RPM
  kind: query
  command: 'System.TemperatureControl.FanInlet2_RPM'
  params: []
- id: tc_get_filename
  label: Get Fan Profile Filename
  kind: query
  command: 'System.TemperatureControl.Filename'
  params: []
- id: tc_set_filename
  label: Set Fan Profile Filename
  kind: action
  command: 'System.TemperatureControl.Filename = {name}'
  params:
    - name: name
      type: string
      description: Fan profile filename (see ListFiles)
- id: tc_list_files
  label: List Fan Profiles
  kind: query
  command: 'System.TemperatureControl.ListFiles()'
  params: []

# --- System.Sensors (all read-only; abbreviated) ---
- id: sensors_list
  label: List System Sensors
  kind: query
  command: 'System.Sensors'
  params: []
- id: sensor_bp0v9_ma
  label: Get Backplane 0.9V Current (mA)
  kind: query
  command: 'System.Sensors.BP0v9_mA'
  params: []
- id: sensor_bp5v0_mv
  label: Get Backplane 5.0V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP5v0_mV'
  params: []
- id: sensor_bp0v9_mv
  label: Get Backplane 0.9V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP0v9_mV'
  params: []
- id: sensor_bp1v03_mv
  label: Get Backplane 1.03V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP1v03_mV'
  params: []
- id: sensor_bp1v5_mv
  label: Get Backplane 1.5V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP1v5_mV'
  params: []
- id: sensor_bp1v8_mv
  label: Get Backplane 1.8V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP1v8_mV'
  params: []
- id: sensor_bp3v0_mv
  label: Get Backplane 3.0V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP3v0_mV'
  params: []
- id: sensor_bp2v5_mv
  label: Get Backplane 2.5V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP2v5_mV'
  params: []
- id: sensor_bp1v2_mv
  label: Get Backplane 1.2V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP1v2_mV'
  params: []
- id: sensor_bp3v3_mv
  label: Get Backplane 3.3V Voltage (mV)
  kind: query
  command: 'System.Sensors.BP3v3_mV'
  params: []
- id: sensor_bp_temperature
  label: Get Backplane Temperature (°C)
  kind: query
  command: 'System.Sensors.BPTemperature_degC'
  params: []
- id: sensor_bp_fpga_core
  label: Get Backplane FPGA Core Temp (°C)
  kind: query
  command: 'System.Sensors.BPFPGACore_degC'
  params: []
- id: sensor_bp_center_low
  label: Get Backplane Center-Low Temp (°C)
  kind: query
  command: 'System.Sensors.BPCenterLow_degC'
  params: []
- id: sensor_psu1_ma
  label: Get PSU1 Current (mA)
  kind: query
  command: 'System.Sensors.PSU1_mA'
  params: []
- id: sensor_psu1_mv
  label: Get PSU1 Voltage (mV)
  kind: query
  command: 'System.Sensors.PSU1_mV'
  params: []
- id: sensor_psu1_degC
  label: Get PSU1 Temperature (°C)
  kind: query
  command: 'System.Sensors.PSU1_degC'
  params: []
- id: sensor_psu1_fan_rpm
  label: Get PSU1 Fan RPM
  kind: query
  command: 'System.Sensors.PSU1Fan_RPM'
  params: []
- id: sensor_psu2_ma
  label: Get PSU2 Current (mA)
  kind: query
  command: 'System.Sensors.PSU2_mA'
  params: []
- id: sensor_psu2_mv
  label: Get PSU2 Voltage (mV)
  kind: query
  command: 'System.Sensors.PSU2_mV'
  params: []
- id: sensor_psu2_degC
  label: Get PSU2 Temperature (°C)
  kind: query
  command: 'System.Sensors.PSU2_degC'
  params: []
- id: sensor_psu2_fan_rpm
  label: Get PSU2 Fan RPM
  kind: query
  command: 'System.Sensors.PSU2Fan_RPM'
  params: []

# --- System.Security ---
- id: security_list
  label: List Security Settings
  kind: query
  command: 'System.Security'
  params: []
- id: security_get_user_role
  label: Get User Role
  kind: query
  command: 'System.Security.{user}Role'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
- id: security_set_user_role
  label: Set User Role
  kind: action
  command: 'System.Security.{user}Role = {role}'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
    - name: role
      type: enum
      description: Role enum (Administrator, PowerUser, User, Test)
- id: security_get_user_username
  label: Get Account Username
  kind: query
  command: 'System.Security.{user}Username'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
- id: security_set_user_username
  label: Set Account Username
  kind: action
  command: 'System.Security.{user}Username = {username}'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
    - name: username
      type: string
      description: New username
- id: security_get_user_timeout
  label: Get User Timeout (s)
  kind: query
  command: 'System.Security.{user}Timeout'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
- id: security_set_user_timeout
  label: Set User Timeout (s)
  kind: action
  command: 'System.Security.{user}Timeout = {seconds}'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
    - name: seconds
      type: integer
      description: Idle timeout in seconds
- id: security_set_user_password
  label: Set Account Password
  kind: action
  command: 'System.Security.{user}Password = {password}'
  params:
    - name: user
      type: enum
      description: One of User1, User2, User3, User4, Admin, Test
    - name: password
      type: string
      description: New password (write-only - read returns <Restricted>)

# --- System.Security.Certificates ---
- id: cert_list
  label: List Certificate Settings
  kind: query
  command: 'System.Security.Certificates'
  params: []
- id: cert_current_name
  label: Get Current Cert Name (CN)
  kind: query
  command: 'System.Security.Certificates.Current.Name'
  params: []
- id: cert_current_start_date
  label: Get Current Cert Start Date
  kind: query
  command: 'System.Security.Certificates.Current.StartDate'
  params: []
- id: cert_current_expiry_date
  label: Get Current Cert Expiry Date
  kind: query
  command: 'System.Security.Certificates.Current.ExpiryDate'
  params: []
- id: cert_user_name
  label: Get User Cert Name (CN)
  kind: query
  command: 'System.Security.Certificates.User.Name'
  params: []
- id: cert_user_start_date
  label: Get User Cert Start Date
  kind: query
  command: 'System.Security.Certificates.User.StartDate'
  params: []
- id: cert_user_expiry_date
  label: Get User Cert Expiry Date
  kind: query
  command: 'System.Security.Certificates.User.ExpiryDate'
  params: []
- id: cert_user_get_enabled
  label: Get User Cert Enabled
  kind: query
  command: 'System.Security.Certificates.User.Enabled'
  params: []
- id: cert_user_set_enabled
  label: Set User Cert Enabled (reboot required)
  kind: action
  command: 'System.Security.Certificates.User.Enabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off
- id: cert_user_update
  label: Update User Certificate (CALICO Studio only)
  kind: action
  command: 'System.Security.Certificates.User.UpdateCert()'
  params: []
- id: cert_user_delete
  label: Delete User Certificate
  kind: action
  command: 'System.Security.Certificates.User.DeleteCert()'
  params: []

# --- System.Time ---
- id: time_list
  label: List System Time
  kind: query
  command: 'System.Time'
  params: []
- id: time_get_current
  label: Get Current System Time
  kind: query
  command: 'System.Time.CurrentTime'
  params: []
- id: time_set_current
  label: Set Current System Time
  kind: action
  command: 'System.Time.CurrentTime = "{yyyy/mm/dd hh:mm:ss}"'
  params:
    - name: yyyy/mm/dd hh:mm:ss
      type: string
      description: Date/time in YYYY/MM/DD hh:mm:ss format
- id: time_get_last_set
  label: Get Last Set Time
  kind: query
  command: 'System.Time.LastSetTime'
  params: []
- id: time_get_current_time_valid
  label: Get Time-Valid Flag
  kind: query
  command: 'System.Time.CurrentTimeValid'
  params: []
- id: time_get_uptime
  label: Get Uptime (s)
  kind: query
  command: 'System.Time.Uptime'
  params: []
- id: time_ntp_list
  label: List NTP Settings
  kind: query
  command: 'System.Time.NTP'
  params: []
- id: time_ntp_get_ip
  label: Get NTP Server IP
  kind: query
  command: 'System.Time.NTP.IPAddress'
  params: []
- id: time_ntp_set_ip
  label: Set NTP Server IP
  kind: action
  command: 'System.Time.NTP.IPAddress = {ip}'
  params:
    - name: ip
      type: string
      description: NTP server IPv4 address (default 216.239.35.8)
- id: time_ntp_get_status
  label: Get NTP Status
  kind: query
  command: 'System.Time.NTP.Status'
  params: []

# --- System.EdidUtils ---
- id: edid_list
  label: List EDID Utils
  kind: query
  command: 'System.EdidUtils'
  params: []
- id: edid_install
  label: Install User EDID (CALICO Studio only)
  kind: action
  command: 'System.EdidUtils.InstallEdid({filename})'
  params:
    - name: filename
      type: string
      description: Filename of EDID previously uploaded to device
- id: edid_remove_user
  label: Remove All User EDIDs
  kind: action
  command: 'System.EdidUtils.RemoveUserEdids()'
  params: []

# --- System.Clients.Ftp ---
- id: ftp_list
  label: List FTP Client Settings
  kind: query
  command: 'System.Clients.Ftp'
  params: []
- id: ftp_get_tls
  label: Get FTP TLS
  kind: query
  command: 'System.Clients.Ftp.Tls'
  params: []
- id: ftp_set_tls
  label: Set FTP TLS
  kind: action
  command: 'System.Clients.Ftp.Tls = {value}'
  params:
    - name: value
      type: enum
      description: Yes or No (default No)
- id: ftp_get_ip
  label: Get FTP Server IP
  kind: query
  command: 'System.Clients.Ftp.IPAddress'
  params: []
- id: ftp_set_ip
  label: Set FTP Server IP
  kind: action
  command: 'System.Clients.Ftp.IPAddress = {ip}'
  params:
    - name: ip
      type: string
      description: FTP server IPv4 address
- id: ftp_get_port
  label: Get FTP Port
  kind: query
  command: 'System.Clients.Ftp.Port'
  params: []
- id: ftp_set_port
  label: Set FTP Port
  kind: action
  command: 'System.Clients.Ftp.Port = {port}'
  params:
    - name: port
      type: integer
      description: FTP server port (default 21)
- id: ftp_get_home
  label: Get FTP Home Path
  kind: query
  command: 'System.Clients.Ftp.Home'
  params: []
- id: ftp_set_home
  label: Set FTP Home Path
  kind: action
  command: 'System.Clients.Ftp.Home = {path}'
  params:
    - name: path
      type: string
      description: FTP home path (empty = root)
- id: ftp_get_user
  label: Get FTP Username
  kind: query
  command: 'System.Clients.Ftp.User'
  params: []
- id: ftp_set_user
  label: Set FTP Username
  kind: action
  command: 'System.Clients.Ftp.User = {username}'
  params:
    - name: username
      type: string
      description: FTP username
- id: ftp_get_password
  label: Get FTP Password
  kind: query
  command: 'System.Clients.Ftp.Password'
  params: []
- id: ftp_set_password
  label: Set FTP Password
  kind: action
  command: 'System.Clients.Ftp.Password = {password}'
  params:
    - name: password
      type: string
      description: FTP password

# --- System.Services.SNMP ---
- id: snmp_list
  label: List SNMP Settings
  kind: query
  command: 'System.Services.SNMP'
  params: []
- id: snmp_get_enabled
  label: Get SNMP Enabled
  kind: query
  command: 'System.Services.SNMP.Enabled'
  params: []
- id: snmp_set_enabled
  label: Set SNMP Enabled
  kind: action
  command: 'System.Services.SNMP.Enabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off (default Off)
- id: snmp_get_community
  label: Get SNMP Community
  kind: query
  command: 'System.Services.SNMP.Community'
  params: []
- id: snmp_set_community
  label: Set SNMP Community
  kind: action
  command: 'System.Services.SNMP.Community = {community}'
  params:
    - name: community
      type: string
      description: SNMP community string (no spaces)
- id: snmp_get_subnet
  label: Get SNMP Subnet (CIDR)
  kind: query
  command: 'System.Services.SNMP.Subnet'
  params: []
- id: snmp_set_subnet
  label: Set SNMP Subnet (CIDR)
  kind: action
  command: 'System.Services.SNMP.Subnet = "{cidr}"'
  params:
    - name: cidr
      type: string
      description: Hosts subnet in CIDR notation (quoted)
- id: snmp_get_manager_ip
  label: Get SNMP Trap Manager IP
  kind: query
  command: 'System.Services.SNMP.ManagerIPAddress'
  params: []
- id: snmp_set_manager_ip
  label: Set SNMP Trap Manager IP
  kind: action
  command: 'System.Services.SNMP.ManagerIPAddress = "{ip}"'
  params:
    - name: ip
      type: string
      description: Trap manager IPv4 address (quoted)
- id: snmp_get_manager_port
  label: Get SNMP Manager Port
  kind: query
  command: 'System.Services.SNMP.ManagerPort'
  params: []
- id: snmp_set_manager_port
  label: Set SNMP Manager Port
  kind: action
  command: 'System.Services.SNMP.ManagerPort = {port}'
  params:
    - name: port
      type: integer
      description: Trap manager UDP port
- id: snmp_get_agent_port
  label: Get SNMP Agent Port
  kind: query
  command: 'System.Services.SNMP.AgentPort'
  params: []
- id: snmp_set_agent_port
  label: Set SNMP Agent Port
  kind: action
  command: 'System.Services.SNMP.AgentPort = {port}'
  params:
    - name: port
      type: integer
      description: Agent UDP port
- id: snmp_get_sys_contact
  label: Get SNMP SysContact
  kind: query
  command: 'System.Services.SNMP.SysContact'
  params: []
- id: snmp_set_sys_contact
  label: Set SNMP SysContact
  kind: action
  command: 'System.Services.SNMP.SysContact = "{contact}"'
  params:
    - name: contact
      type: string
      description: Contact string (quoted, optional)
- id: snmp_get_sys_location
  label: Get SNMP SysLocation
  kind: query
  command: 'System.Services.SNMP.SysLocation'
  params: []
- id: snmp_set_sys_location
  label: Set SNMP SysLocation
  kind: action
  command: 'System.Services.SNMP.SysLocation = "{location}"'
  params:
    - name: location
      type: string
      description: Location string (quoted, optional)

# --- System.Services.SyslogRemote ---
- id: syslog_list
  label: List Rsyslog Settings
  kind: query
  command: 'System.Services.SyslogRemote'
  params: []
- id: syslog_get_enabled
  label: Get Rsyslog Enabled
  kind: query
  command: 'System.Services.SyslogRemote.Enabled'
  params: []
- id: syslog_set_enabled
  label: Set Rsyslog Enabled
  kind: action
  command: 'System.Services.SyslogRemote.Enabled = {value}'
  params:
    - name: value
      type: enum
      description: On or Off (default Off)
- id: syslog_get_server_ip
  label: Get Rsyslog Server IP
  kind: query
  command: 'System.Services.SyslogRemote.ServerIPAddress'
  params: []
- id: syslog_set_server_ip
  label: Set Rsyslog Server IP
  kind: action
  command: 'System.Services.SyslogRemote.ServerIPAddress = {ip}'
  params:
    - name: ip
      type: string
      description: Syslog server IPv4 address
- id: syslog_get_server_port
  label: Get Rsyslog Server Port
  kind: query
  command: 'System.Services.SyslogRemote.ServerPort'
  params: []
- id: syslog_set_server_port
  label: Set Rsyslog Server Port
  kind: action
  command: 'System.Services.SyslogRemote.ServerPort = {port}'
  params:
    - name: port
      type: integer
      description: Syslog server port
- id: syslog_get_protocol
  label: Get Rsyslog Protocol
  kind: query
  command: 'System.Services.SyslogRemote.Protocol'
  params: []
- id: syslog_set_protocol
  label: Set Rsyslog Protocol
  kind: action
  command: 'System.Services.SyslogRemote.Protocol = {value}'
  params:
    - name: value
      type: enum
      description: TCP or UDP (default TCP)
- id: syslog_restart
  label: Restart Rsyslog Service
  kind: action
  command: 'System.Services.SyslogRemote.RestartService()'
  params: []

# --- Slots (module inventory) ---
- id: slots_list
  label: List Slots
  kind: query
  command: 'Slots'
  params: []
- id: slot_query
  label: Query Slot
  kind: query
  command: 'Slot{n}'
  params:
    - name: n
      type: integer
      description: Slot number 1-12 (or use Slots.Slot{n})
- id: slot_phase_retrain
  label: Force Phase Retrain on Module
  kind: action
  command: 'Slot{n}.PhaseRetrain()'
  params:
    - name: n
      type: integer
      description: Slot number (does not apply to onboard modules)
- id: slot_module_resolutions
  label: List Module Resolutions
  kind: query
  command: 'Slot{n}.ModuleResolutions()'
  params:
    - name: n
      type: integer
      description: Slot number

# --- HDMI input module ---
- id: hdmi_in_get_hdmi
  label: Get HDMI Status (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDMI'
  params:
    - name: n
      type: integer
      description: Slot number
    - name: i
      type: integer
      description: Input number
- id: hdmi_in_get_hdcp_enabled
  label: Get HDCP Enabled (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDCPEnabled'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hdmi_in_set_hdcp_enabled
  label: Set HDCP Enabled (Input)
  kind: action
  command: 'Slot{n}.In{i}.HDCPEnabled = {value}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: value
      type: enum
      description: Supported or Off
- id: hdmi_in_get_hdcp_required
  label: Get HDCP Required (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDCPRequired'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hdmi_in_get_hdcp_status
  label: Get HDCP Status (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDCPStatus'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hdmi_in_get_hdcp_adjust
  label: Get HDCP Operating Mode (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDCPAdjust'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hdmi_in_set_hdcp_adjust
  label: Set HDCP Operating Mode (Input)
  kind: action
  command: 'Slot{n}.In{i}.HDCPAdjust = {mode}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: mode
      type: integer
      description: '0 = Normal, 1 = Alternative (helps HDCP 2.x negotiate)'
- id: hdmi_in_get_hdcp_version
  label: Get HDCP Version (Input)
  kind: query
  command: 'Slot{n}.In{i}.HDCPVersion'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hdmi_in_set_hdcp_version
  label: Set HDCP Version (Input)
  kind: action
  command: 'Slot{n}.In{i}.HDCPVersion = {version}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: version
      type: enum
      description: All, v1_4 or v2_2

# --- SDI 12G input module ---
- id: sdi_in_get_diag
  label: Get SDI Diagnostics (Input)
  kind: query
  command: 'Slot{n}.In{i}.SDI'
  params:
    - name: n
      type: integer
    - name: i
      type: integer

# --- Streaming Media / 4K Playback Input module ---
- id: sm_get_status
  label: Get Media Module Status
  kind: query
  command: 'Slot{n}.Status'
  params:
    - name: n
      type: integer
      description: Slot containing the media module
- id: sm_get_op_mode
  label: Get Media Module Operating Mode
  kind: query
  command: 'Slot{n}.OperatingMode'
  params:
    - name: n
      type: integer
- id: sm_set_op_mode
  label: Set Media Module Operating Mode
  kind: action
  command: 'Slot{n}.OperatingMode = {mode}'
  params:
    - name: n
      type: integer
    - name: mode
      type: enum
      description: Standard (default) or Sync_1x8

- id: sm_aq_list
  label: List Active Play Queue
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_get_resolution
  label: Get Play Queue Resolution
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.Resolution'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_set_resolution
  label: Set Play Queue Resolution
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.Resolution = {res}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: res
      type: string
      description: Resolution string (e.g. 1920x1080p60)
- id: sm_aq_list_resolutions
  label: List Supported Play Resolutions
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.ListResolutions()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_get_current_index
  label: Get Current Play Index
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.CurrentIndex'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_get_status
  label: Get Play Queue Status
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.Status'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_get_play_mode
  label: Get Play Mode
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.PlayMode'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_set_play_mode
  label: Set Play Mode
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.PlayMode = {mode}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: mode
      type: enum
      description: Single (play once) or Repeat (loop indefinitely)
- id: sm_aq_get_play_on_startup
  label: Get Play-On-Startup
  kind: query
  command: 'Slot{n}.In{i}.ActiveQueue.PlayOnStartup'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_set_play_on_startup
  label: Set Play-On-Startup
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.PlayOnStartup = {value}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: value
      type: enum
      description: On or Off
- id: sm_aq_play
  label: Play Active Queue
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.Play()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_stop
  label: Stop Active Queue
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.Stop()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_pause
  label: Pause Active Queue
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.Pause()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_skip_forward
  label: Skip Forward
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.SkipForward()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_skip_backward
  label: Skip Backward
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.SkipBackward()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_insert_item
  label: Insert Queue Item
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.InsertItem({index},{type},{friendlyName},{uri},{duration},{protocol},{retries},{low-latency},{metadata})'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: index
      type: integer
      description: 1-based insert index
    - name: type
      type: integer
      description: '1=VideoStream, 2=TextFile, 4=ImageFile, 8=VideoFile, 16=SyncGroup'
    - name: friendlyName
      type: string
      description: URI-encoded, in quotes
    - name: uri
      type: string
      description: File path or stream URI, URI-encoded, in quotes
    - name: duration
      type: integer
      description: Seconds (0 = Infinite)
    - name: protocol
      type: string
      description: 'Auto (or RTSPMulticast for Encoder-100)'
    - name: retries
      type: integer
      description: '0=no retries, 1=always retry'
    - name: low-latency
      type: integer
      description: '0=normal, 1=low-latency (no audio)'
    - name: metadata
      type: string
      description: Reserved for CALICO Studio
- id: sm_aq_remove_item
  label: Remove Queue Item
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.RemoveItem({index})'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: index
      type: integer
- id: sm_aq_move_item
  label: Move Queue Item
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.MoveItem({fromIndex},{toIndex})'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: fromIndex
      type: integer
    - name: toIndex
      type: integer
- id: sm_aq_replace_item
  label: Replace Queue Item
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.ReplaceItem({index},{type},{friendlyName},{uri},{duration},{protocol},{retries},{low-latency},{metadata})'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: index
      type: integer
    - name: type
      type: integer
    - name: friendlyName
      type: string
    - name: uri
      type: string
    - name: duration
      type: integer
    - name: protocol
      type: string
    - name: retries
      type: integer
    - name: low-latency
      type: integer
    - name: metadata
      type: string
- id: sm_aq_clear_all
  label: Clear All Queue Items
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.ClearAll()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_aq_load_playlist
  label: Load Playlist
  kind: action
  command: 'Slot{n}.In{i}.ActiveQueue.LoadPlayList()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer

- id: sm_qi_get
  label: Get Queue Items
  kind: query
  command: 'Slot{n}.In{i}.QueueItems'
  params:
    - name: n
      type: integer
    - name: i
      type: integer

- id: sm_label_list
  label: List Input Label
  kind: query
  command: 'Slot{n}.In{i}.Label'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_get_enabled
  label: Get Label Enabled
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelEnabled'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_enabled
  label: Set Label Enabled
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelEnabled = {value}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: value
      type: enum
      description: On or Off
- id: sm_label_get_format
  label: Get Label Format
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelFormat'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_format
  label: Set Label Format
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelFormat = {n}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: n
      type: integer
      description: '0=Friendly name, 1=Label Text, 2=File title, 3=Filename, 4=Debug'
- id: sm_label_get_text
  label: Get Label Text
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelText'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_text
  label: Set Label Text
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelText = "{text}"'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: text
      type: string
      description: Up to 20 characters
- id: sm_label_get_position
  label: Get Label Position
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelPosition'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_position
  label: Set Label Position
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelPosition = {pos}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: pos
      type: integer
      description: '0-8 = positions, 9 = Custom X,Y'
- id: sm_label_get_size
  label: Get Label Text Size
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelTextSize'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_size
  label: Set Label Text Size
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelTextSize = {px}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: px
      type: integer
      description: Pixels; must match an available font size
- id: sm_label_get_font
  label: Get Label Font
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelTextFont'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_get_border_width
  label: Get Label Border Width
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelBorderWidth'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_border_width
  label: Set Label Border Width (0-16 px)
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelBorderWidth = {px}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: px
      type: integer
- id: sm_label_get_border_rgb
  label: Get Label Border RGB
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelBorderRGB'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_border_rgb
  label: Set Label Border RGB
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelBorderRGB = {rgb}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: rgb
      type: integer
      description: '0xRRGGBB color'
- id: sm_label_get_inverse
  label: Get Label Inverse
  kind: query
  command: 'Slot{n}.In{i}.Label.LabelInverse'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: sm_label_set_inverse
  label: Set Label Inverse
  kind: action
  command: 'Slot{n}.In{i}.Label.LabelInverse = {value}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: value
      type: enum
      description: On (black on white) or Off

- id: sm_storage_list
  label: List Media Storage
  kind: query
  command: 'Slot{n}.Storage'
  params:
    - name: n
      type: integer
- id: sm_usb_list
  label: List USB Storage
  kind: query
  command: 'Slot{n}.Storage.USB'
  params:
    - name: n
      type: integer
- id: sm_usb_get_name
  label: Get USB Storage Name
  kind: query
  command: 'Slot{n}.Storage.USB.Name'
  params:
    - name: n
      type: integer
- id: sm_usb_get_size
  label: Get USB Storage Size (bytes)
  kind: query
  command: 'Slot{n}.Storage.USB.Size'
  params:
    - name: n
      type: integer
- id: sm_usb_get_free
  label: Get USB Storage Free (bytes)
  kind: query
  command: 'Slot{n}.Storage.USB.Free'
  params:
    - name: n
      type: integer
- id: sm_usb_list_dir
  label: List USB Directory
  kind: query
  command: 'Slot{n}.Storage.USB.ListDirectory({path},{typeMask},{offset},{limit})'
  params:
    - name: n
      type: integer
    - name: path
      type: string
    - name: typeMask
      type: integer
      description: 'Bit mask: 1=Dir, 2=Text, 4=Image, 8=Video'
    - name: offset
      type: integer
      description: '0 = start'
    - name: limit
      type: integer
- id: sm_usb_copy
  label: Copy USB to Internal (async)
  kind: action
  command: 'Slot{n}.Storage.USB.Copy({src},{dest})'
  params:
    - name: n
      type: integer
    - name: src
      type: string
    - name: dest
      type: string

- id: sm_local_list
  label: List Internal Storage
  kind: query
  command: 'Slot{n}.Storage.Local'
  params:
    - name: n
      type: integer
- id: sm_local_get_name
  label: Get Internal Storage Name
  kind: query
  command: 'Slot{n}.Storage.Local.Name'
  params:
    - name: n
      type: integer
- id: sm_local_get_size
  label: Get Internal Storage Size (bytes)
  kind: query
  command: 'Slot{n}.Storage.Local.Size'
  params:
    - name: n
      type: integer
- id: sm_local_get_free
  label: Get Internal Storage Free (bytes)
  kind: query
  command: 'Slot{n}.Storage.Local.Free'
  params:
    - name: n
      type: integer
- id: sm_local_get_sync_in_progress
  label: Get FTP Sync In Progress
  kind: query
  command: 'Slot{n}.Storage.Local.IsSyncInProgress'
  params:
    - name: n
      type: integer
- id: sm_local_get_last_error_datetime
  label: Get Last Sync Error Datetime
  kind: query
  command: 'Slot{n}.Storage.Local.LastErrorDatetime'
  params:
    - name: n
      type: integer
- id: sm_local_get_last_error_message
  label: Get Last Sync Error Message
  kind: query
  command: 'Slot{n}.Storage.Local.LastErrorMessage'
  params:
    - name: n
      type: integer
- id: sm_local_get_content_hash
  label: Get Content Hash
  kind: query
  command: 'Slot{n}.Storage.Local.ContentHash'
  params:
    - name: n
      type: integer
- id: sm_local_list_dir
  label: List Internal Directory
  kind: query
  command: 'Slot{n}.Storage.Local.ListDirectory({path},{typeMask},{offset},{limit})'
  params:
    - name: n
      type: integer
    - name: path
      type: string
    - name: typeMask
      type: integer
    - name: offset
      type: integer
    - name: limit
      type: integer
- id: sm_local_start_ftp_sync
  label: Start FTP Sync
  kind: action
  command: 'Slot{n}.Storage.Local.StartFtpSync()'
  params:
    - name: n
      type: integer
- id: sm_local_delete
  label: Delete Internal Path (async)
  kind: action
  command: 'Slot{n}.Storage.Local.Delete({path})'
  params:
    - name: n
      type: integer
    - name: path
      type: string
- id: sm_local_move
  label: Move/Rename Internal Path (async)
  kind: action
  command: 'Slot{n}.Storage.Local.Move({src},{dest})'
  params:
    - name: n
      type: integer
    - name: src
      type: string
    - name: dest
      type: string
- id: sm_local_mkdir
  label: Create Directory (async)
  kind: action
  command: 'Slot{n}.Storage.Local.CreateDirectory({path})'
  params:
    - name: n
      type: integer
    - name: path
      type: string

- id: sm_syncgroup_list
  label: List Sync Group Storage
  kind: query
  command: 'Slot{n}.Storage.SyncGroup'
  params:
    - name: n
      type: integer
- id: sm_syncgroup_replace_item
  label: Replace Sync Group Item
  kind: action
  command: 'Slot{n}.Storage.SyncGroup.ReplaceItem({name},{index},{type},{friendlyName},{uri},{duration},{protocol},{retries},{low-latency})'
  params:
    - name: n
      type: integer
    - name: name
      type: string
      description: Sync group name (max 64 chars)
    - name: index
      type: integer
      description: 1-8 index in group
    - name: type
      type: integer
    - name: friendlyName
      type: string
    - name: uri
      type: string
    - name: duration
      type: integer
    - name: protocol
      type: string
    - name: retries
      type: integer
    - name: low-latency
      type: integer
- id: sm_syncgroup_items
  label: List Sync Group Items
  kind: query
  command: 'Slot{n}.Storage.SyncGroup.Items({name})'
  params:
    - name: n
      type: integer
    - name: name
      type: string
- id: sm_syncgroup_swap
  label: Swap Sync Group Items
  kind: action
  command: 'Slot{n}.Storage.SyncGroup.Swap({name},{index1},{index2})'
  params:
    - name: n
      type: integer
    - name: name
      type: string
    - name: index1
      type: integer
    - name: index2
      type: integer

- id: sm_net_list
  label: List Media Module Networking
  kind: query
  command: 'Slot{n}.Networking'
  params:
    - name: n
      type: integer
- id: sm_net_get_mode
  label: Get Media Networking Mode
  kind: query
  command: 'Slot{n}.Networking.Mode'
  params:
    - name: n
      type: integer
- id: sm_net_set_mode
  label: Set Media Networking Mode
  kind: action
  command: 'Slot{n}.Networking.Mode = {mode}'
  params:
    - name: n
      type: integer
    - name: mode
      type: enum
      description: Off, Static, or DHCP
- id: sm_net_get_link_speed
  label: Get Media Link Speed (Mbps)
  kind: query
  command: 'Slot{n}.Networking.LinkSpeed'
  params:
    - name: n
      type: integer
- id: sm_net_get_ip
  label: Get Media Module Static IP
  kind: query
  command: 'Slot{n}.Networking.IPAddress'
  params:
    - name: n
      type: integer
- id: sm_net_set_ip
  label: Set Media Module Static IP
  kind: action
  command: 'Slot{n}.Networking.IPAddress = {ip}'
  params:
    - name: n
      type: integer
    - name: ip
      type: string
- id: sm_net_get_subnet
  label: Get Media Module Static Subnet
  kind: query
  command: 'Slot{n}.Networking.IPSubnetMask'
  params:
    - name: n
      type: integer
- id: sm_net_set_subnet
  label: Set Media Module Static Subnet
  kind: action
  command: 'Slot{n}.Networking.IPSubnetMask = {mask}'
  params:
    - name: n
      type: integer
    - name: mask
      type: string
- id: sm_net_get_gateway
  label: Get Media Module Static Gateway
  kind: query
  command: 'Slot{n}.Networking.IPGateway'
  params:
    - name: n
      type: integer
- id: sm_net_set_gateway
  label: Set Media Module Static Gateway
  kind: action
  command: 'Slot{n}.Networking.IPGateway = {gw}'
  params:
    - name: n
      type: integer
    - name: gw
      type: string
- id: sm_net_get_dns1
  label: Get Media Module DNS1
  kind: query
  command: 'Slot{n}.Networking.IPDNS1'
  params:
    - name: n
      type: integer
- id: sm_net_set_dns1
  label: Set Media Module DNS1
  kind: action
  command: 'Slot{n}.Networking.IPDNS1 = {ip}'
  params:
    - name: n
      type: integer
    - name: ip
      type: string
- id: sm_net_get_dns2
  label: Get Media Module DNS2
  kind: query
  command: 'Slot{n}.Networking.IPDNS2'
  params:
    - name: n
      type: integer
- id: sm_net_set_dns2
  label: Set Media Module DNS2
  kind: action
  command: 'Slot{n}.Networking.IPDNS2 = {ip}'
  params:
    - name: n
      type: integer
    - name: ip
      type: string
- id: sm_net_restart
  label: Restart Media Module Ethernet
  kind: action
  command: 'Slot{n}.Networking.RestartEthernet()'
  params:
    - name: n
      type: integer

- id: sm_update_list
  label: List Media Module Update
  kind: query
  command: 'Slot{n}.Update'
  params:
    - name: n
      type: integer
- id: sm_update_reboot
  label: Reboot Media Module
  kind: action
  command: 'Slot{n}.Update.Reboot({option})'
  params:
    - name: n
      type: integer
    - name: option
      type: string
      description: 'Optional: "ForceUpdate" to force re-install current version; omit for normal'

# --- HDBaseT input module ---
- id: hbt_list
  label: List HDBaseT Properties
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_current_mode
  label: Get HDBaseT Current Mode
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.CurrentMode'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_local_link_status
  label: Get HDBaseT Local Link Status
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.LocalLinkStatus'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_local_fw
  label: Get HDBaseT Local Firmware Version
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.LocalFwVer'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_cable_length
  label: Get HDBaseT Cable Length (m)
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.CableLength'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_local_hdmi_status
  label: Get HDBaseT Local HDMI Status
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.LocalHDMIStatus'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_max_error
  label: Get HDBaseT Error Stats
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.MaxError'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_remote_fw
  label: Get HDBaseT Remote Firmware Version
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.RemoteFWVer'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_remote_link_status
  label: Get HDBaseT Remote Link Status
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.RemoteLinkStatus'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_remote_hdmi_status
  label: Get HDBaseT Remote HDMI Status
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.RemoteHDMIStatus'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_get_set_mode
  label: Get HDBaseT Set Mode
  kind: query
  command: 'Slot{n}.In{i}.HDBaseT.SetMode'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_set_mode
  label: Set HDBaseT Mode
  kind: action
  command: 'Slot{n}.In{i}.HDBaseT.SetMode = {mode}'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
    - name: mode
      type: enum
      description: Auto, LongReach, or Standard (remote end must be in Auto)
- id: hbt_local_link_reset
  label: Reset HDBaseT Local Link
  kind: action
  command: 'Slot{n}.In{i}.HDBaseT.LocalLinkReset()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer
- id: hbt_remote_link_reset
  label: Reset HDBaseT Remote Link
  kind: action
  command: 'Slot{n}.In{i}.HDBaseT.RemoteLinkReset()'
  params:
    - name: n
      type: integer
    - name: i
      type: integer

# --- HDMI output module ---
- id: hdmi_out_get_hdmi
  label: Get HDMI Status (Output)
  kind: query
  command: 'Slot{n}.Out{o}.HDMI'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: hdmi_out_get_hdcp_active
  label: Get HDCP Active (Output)
  kind: query
  command: 'Slot{n}.Out{o}.HDCPActive'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: hdmi_out_get_hdcp_status
  label: Get HDCP Status (Output)
  kind: query
  command: 'Slot{n}.Out{o}.HDCPStatus'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: hdmi_out_get_hdcp_downstream
  label: Get HDCP Downstream Mode
  kind: query
  command: 'Slot{n}.Out{o}.HDCPDownstream'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: hdmi_out_set_hdcp_downstream
  label: Set HDCP Downstream Mode
  kind: action
  command: 'Slot{n}.Out{o}.HDCPDownstream = {mode}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: mode
      type: enum
      description: HoldOn, KeepOff, or FollowSource

# --- Common output properties (shared across output module types) ---
- id: out_get_full_name
  label: Get Output Full Name
  kind: query
  command: 'Slot{n}.Out{o}.FullName'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_status
  label: Get Output Status
  kind: query
  command: 'Slot{n}.Out{o}.Status'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_alias
  label: Get Output Alias
  kind: query
  command: 'Slot{n}.Out{o}.Alias'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_alias
  label: Set Output Alias
  kind: action
  command: 'Slot{n}.Out{o}.Alias = "{alias}"'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: alias
      type: string
- id: out_get_use_maps
  label: Get UseMaps
  kind: query
  command: 'Slot{n}.Out{o}.UseMaps'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_use_maps
  label: Set UseMaps
  kind: action
  command: 'Slot{n}.Out{o}.UseMaps = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: Yes or No
- id: out_get_show_unused_space
  label: Get ShowUnusedSpace
  kind: query
  command: 'Slot{n}.Out{o}.ShowUnusedSpace'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_show_unused_space
  label: Set ShowUnusedSpace
  kind: action
  command: 'Slot{n}.Out{o}.ShowUnusedSpace = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: Black (default) or CrossHatch
- id: out_get_show_map_color
  label: Get ShowMapColor
  kind: query
  command: 'Slot{n}.Out{o}.ShowMapColor'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_show_map_color
  label: Set ShowMapColor
  kind: action
  command: 'Slot{n}.Out{o}.ShowMapColor = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: Yes or No
- id: out_get_children
  label: Get Output Children
  kind: query
  command: 'Slot{n}.Out{o}.Children'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_display_type
  label: Get Output DisplayType
  kind: query
  command: 'Slot{n}.Out{o}.DisplayType'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_display_type
  label: Set Output DisplayType
  kind: action
  command: 'Slot{n}.Out{o}.DisplayType = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_resolution
  label: Get Output Resolution
  kind: query
  command: 'Slot{n}.Out{o}.Resolution'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_resolution
  label: Set Output Resolution
  kind: action
  command: 'Slot{n}.Out{o}.Resolution = {res}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: res
      type: string
      description: Resolution string from Slot<n>.Resolutions list
- id: out_get_default_lores
  label: Get Output DefaultLoRes
  kind: query
  command: 'Slot{n}.Out{o}.DefaultLoRes'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_default_lores
  label: Set Output DefaultLoRes
  kind: action
  command: 'Slot{n}.Out{o}.DefaultLoRes = {res}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_resolution_width
  label: Get Output Resolution Width
  kind: query
  command: 'Slot{n}.Out{o}.ResolutionWidth'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_resolution_height
  label: Get Output Resolution Height
  kind: query
  command: 'Slot{n}.Out{o}.ResolutionHeight'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_resolution_field_rate
  label: Get Output Resolution Field Rate
  kind: query
  command: 'Slot{n}.Out{o}.ResolutionFieldRate'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_resolution_scan_type
  label: Get Output Resolution Scan Type
  kind: query
  command: 'Slot{n}.Out{o}.ResolutionScanType'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_output_mode
  label: Get Output OutputMode
  kind: query
  command: 'Slot{n}.Out{o}.OutputMode'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_output_mode
  label: Set Output OutputMode
  kind: action
  command: 'Slot{n}.Out{o}.OutputMode = {mode}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: mode
      type: enum
      description: Auto (default) or HDMI
- id: out_get_colour_scale
  label: Get Output ColourScale
  kind: query
  command: 'Slot{n}.Out{o}.ColourScale'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_colour_scale
  label: Set Output ColourScale
  kind: action
  command: 'Slot{n}.Out{o}.ColourScale = {scale}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: scale
      type: enum
      description: SDR_YCCL_601, SDR_YCCL_709, SDR_RGBL_709, SDR_RGBF_709, HLG_YCCL_2020, HDR10_YCCL_2020
- id: out_get_colour_sampling
  label: Get Output ColourSampling
  kind: query
  command: 'Slot{n}.Out{o}.ColourSampling'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_colour_sampling
  label: Set Output ColourSampling
  kind: action
  command: 'Slot{n}.Out{o}.ColourSampling = {sampling}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: sampling
      type: enum
      description: s444_8, s422_10, or S420_8 (reserved)
- id: out_get_width
  label: Get Output Width
  kind: query
  command: 'Slot{n}.Out{o}.Width'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_width
  label: Set Output Width
  kind: action
  command: 'Slot{n}.Out{o}.Width = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: px
      type: integer
- id: out_get_height
  label: Get Output Height
  kind: query
  command: 'Slot{n}.Out{o}.Height'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_height
  label: Set Output Height
  kind: action
  command: 'Slot{n}.Out{o}.Height = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: px
      type: integer
- id: out_get_center_x
  label: Get Output CenterX
  kind: query
  command: 'Slot{n}.Out{o}.CenterX'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_center_x
  label: Set Output CenterX
  kind: action
  command: 'Slot{n}.Out{o}.CenterX = {coord}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: coord
      type: integer
- id: out_get_center_y
  label: Get Output CenterY
  kind: query
  command: 'Slot{n}.Out{o}.CenterY'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_center_y
  label: Set Output CenterY
  kind: action
  command: 'Slot{n}.Out{o}.CenterY = {coord}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: coord
      type: integer
- id: out_get_rotation
  label: Get Output Rotation
  kind: query
  command: 'Slot{n}.Out{o}.Rotation'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_rotation
  label: Set Output Rotation
  kind: action
  command: 'Slot{n}.Out{o}.Rotation = {deg}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: deg
      type: integer
- id: out_get_scurve
  label: Get Output SCurve
  kind: query
  command: 'Slot{n}.Out{o}.SCurve'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_scurve
  label: Set Output SCurve (brightness curve)
  kind: action
  command: 'Slot{n}.Out{o}.SCurve = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: number
      description: Range 0.30 to 2.00
- id: out_get_equipment
  label: Get Output Equipment (CALICO Studio only)
  kind: query
  command: 'Slot{n}.Out{o}.Equipment'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_ins_list
  label: Get Output InsList
  kind: query
  command: 'Slot{n}.Out{o}.InsList'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_cut_to_black
  label: Get Output CutToBlack
  kind: query
  command: 'Slot{n}.Out{o}.CutToBlack'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_cut_to_black
  label: Set Output CutToBlack
  kind: action
  command: 'Slot{n}.Out{o}.CutToBlack = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: On (output black + audio muted) or Off
- id: out_get_eco_mode
  label: Get Output EcoMode
  kind: query
  command: 'Slot{n}.Out{o}.EcoMode'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_eco_mode
  label: Set Output EcoMode (non-persistent)
  kind: action
  command: 'Slot{n}.Out{o}.EcoMode = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: On (allow monitor standby) or Off
- id: out_get_audio_enable
  label: Get Output AudioEnable
  kind: query
  command: 'Slot{n}.Out{o}.AudioEnable'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_audio_enable
  label: Set Output AudioEnable
  kind: action
  command: 'Slot{n}.Out{o}.AudioEnable = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: On or Off
- id: out_get_audio_mute
  label: Get Output AudioMute
  kind: query
  command: 'Slot{n}.Out{o}.AudioMute'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_audio_mute
  label: Set Output AudioMute
  kind: action
  command: 'Slot{n}.Out{o}.AudioMute = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: On or Off
- id: out_get_audio_mode
  label: Get Output AudioMode
  kind: query
  command: 'Slot{n}.Out{o}.AudioMode'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_audio_volume
  label: Get Output AudioVolume
  kind: query
  command: 'Slot{n}.Out{o}.AudioVolume'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_audio_source
  label: Get Output AudioSource
  kind: query
  command: 'Slot{n}.Out{o}.AudioSource'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_audio_follow_window
  label: Get Output AudioFollowWindow
  kind: query
  command: 'Slot{n}.Out{o}.AudioFollowWindow'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_get_edge_blend_mode
  label: Get Output EdgeBlendMode
  kind: query
  command: 'Slot{n}.Out{o}.EdgeBlendMode'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_edge_blend_mode
  label: Set Output EdgeBlendMode
  kind: action
  command: 'Slot{n}.Out{o}.EdgeBlendMode = {mode}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: mode
      type: enum
      description: Off, Normal, or Projector
- id: out_get_outer_grid
  label: Get Output OuterGrid
  kind: query
  command: 'Slot{n}.Out{o}.OuterGrid'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_outer_grid
  label: Set Output OuterGrid
  kind: action
  command: 'Slot{n}.Out{o}.OuterGrid = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: On or Off
- id: out_get_inner_grid
  label: Get Output InnerGrid
  kind: query
  command: 'Slot{n}.Out{o}.InnerGrid'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_inner_grid
  label: Set Output InnerGrid
  kind: action
  command: 'Slot{n}.Out{o}.InnerGrid = {value}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: value
      type: enum
      description: Off, Left, Right, Top, Bottom, or All
- id: out_get_hdr_static_metadata
  label: Get Output HDR Static Metadata
  kind: query
  command: 'Slot{n}.Out{o}.HDRStaticMetadata'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_set_hdr_static_metadata
  label: Set Output HDR Static Metadata
  kind: action
  command: 'Slot{n}.Out{o}.HDRStaticMetadata = "{metadata}"'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: metadata
      type: string
      description: HDR InfoFrame data; run ForceLinkRefresh afterwards

# --- Output Mapper ---
- id: out_maps_list
  label: List Output Maps
  kind: query
  command: 'Slot{n}.Out{o}.Maps'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_maps_clear_all
  label: Clear All Output Maps
  kind: action
  command: 'Slot{n}.Out{o}.Maps.ClearAll()'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
- id: out_map_get_alias
  label: Get Output Map Alias
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.Alias'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_set_alias
  label: Set Output Map Alias
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.Alias = "{alias}"'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: alias
      type: string
- id: out_map_get_children
  label: Get Output Map Children
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.Children'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_get_color
  label: Get Output Map Color
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapColor'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_set_color
  label: Set Output Map Color
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapColor = {rgb}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: rgb
      type: integer
- id: out_map_get_xy
  label: Get Output Map X/Y
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapX'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_set_x
  label: Set Output Map X
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapX = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: px
      type: integer
- id: out_map_set_y
  label: Set Output Map Y
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapY = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: px
      type: integer
- id: out_map_get_width
  label: Get Output Map Width
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapWidth'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_set_width
  label: Set Output Map Width
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapWidth = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: px
      type: integer
- id: out_map_get_height
  label: Get Output Map Height
  kind: query
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapHeight'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
- id: out_map_set_height
  label: Set Output Map Height
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.MapHeight = {px}'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer
    - name: px
      type: integer
- id: out_map_clear
  label: Clear Output Map
  kind: action
  command: 'Slot{n}.Out{o}.Maps.Map{m}.Clear()'
  params:
    - name: n
      type: integer
    - name: o
      type: integer
    - name: m
      type: integer

# UNRESOLVED: Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows,
# Profiles, TPG, Resolutions, IPStreams, Playlists namespaces appear in the
# device manual but were not present in the supplied source excerpt; their
# command rows should be added once the corresponding source pages are
# available.
```

## Feedbacks
```yaml
- id: login_response
  type: string
  values:
    - "!Info : User admin Logged In"
    - "!Done login(admin,********)"
- id: done_response
  type: string
  description: Universal completion acknowledgement - every command returns `!Done <command>` on success.
- id: failed_response
  type: string
  description: Universal failure acknowledgement - every command returns `!Failed <command>` and an `!Error <reason>` line on failure.
- id: power_status
  type: enum
  description: Power mode states raised via POWERMODE_CHANGED event.
  values: [Standby, Resuming, Resumed]
- id: hdmi_input_status
  type: enum
  values: [Found, Not_found]
- id: hdcp_input_required
  type: enum
  values: [Required, Off]
- id: hdcp_input_status
  type: enum
  values: [None, v1_4, v2_2]
- id: hdcp_output_active
  type: enum
  values: [Active, Off]
- id: hdcp_downstream_mode
  type: enum
  values: [HoldOn, KeepOff, FollowSource]
- id: hdcp_output_status
  type: enum
  values: [None, v1_4, v2_2]
- id: colour_sampling
  type: enum
  values: [s444_8, s422_10, s420_8]
- id: colour_range_active
  type: enum
  values: [NotSet, SDR_YCCL_601, SDR_YCCL_709, SDR_RGBL_709, SDR_RGBF_709, HLG_YCCL_2020, HDR10_YCCL_2020]
- id: audio_state
  type: enum
  values: [Found, Off]
- id: resolution_scan_type
  type: enum
  values: [p, i]
- id: edge_blend_mode
  type: enum
  values: [Off, Normal, Projector]
- id: inner_grid
  type: enum
  values: [Off, Left, Right, Top, Bottom, All]
- id: show_unused_space
  type: enum
  values: [Black, CrossHatch]
- id: audio_enable
  type: enum
  values: [On, Off]
- id: audio_mute
  type: enum
  values: [On, Off]
- id: cut_to_black
  type: enum
  values: [On, Off]
- id: eco_mode
  type: enum
  values: [On, Off]
- id: label_enabled
  type: enum
  values: [On, Off]
- id: label_inverse
  type: enum
  values: [On, Off]
- id: label_format
  type: enum
  values: [0, 1, 2, 3, 4]
- id: label_position
  type: enum
  values: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
- id: hdcp_adjust
  type: enum
  values: ["0 (Normal)", "1 (Alternative)"]
- id: hdcp_enabled_input
  type: enum
  values: [Supported, Off]
- id: hdcp_version_input
  type: enum
  values: [All, v1_4, v2_2]
- id: hdbt_current_mode_config
  type: enum
  description: HDBaseT configuration sub-state.
  values: [Unknown, Auto, Manual]
- id: hdbt_current_mode_link
  type: enum
  description: HDBaseT link sub-state.
  values: [Standard, Disconnect, LongReach, EthernetFallback, Reserved, Powerdown1, Powerdown2, HDMIBypass]
- id: hdbt_link_status
  type: enum
  values: [HDBASE_T_LINK_NONE, HDBASE_T_LINK_ON, HDBASE_T_LINK_LOW_POWER, HDBASE_T_LINK_ETHER_ONLY, HDBASE_T_LINK_INDETERMINATE]
- id: hdbt_hdmi_status
  type: enum
  values: [HDBASE_T_HDMI_NONE, HDBASE_T_HDMI_ON, HDBASE_T_HDMI_HDCP_ON, HDBASE_T_HDMI_INDETERMINATE]
- id: hdbt_set_mode
  type: enum
  values: [Auto, LongReach, Standard]
- id: hdbt_cable_length
  type: string
  description: Value 20-100 metres, or "Invalid".
- id: hdbt_max_error
  type: string
  description: "Format: 'Valid: <n> : <n> : <n> : <n>' or 'Caution: <n> : <n> : <n> : <n>' (lower is better)."
- id: media_module_status
  type: enum
  values: [READY, SHUTDOWN, BOOTING, UPDATING, BOOTFAILED, UPDATEFAILED, WAITFORVERSION, CARDFAILED]
- id: media_module_update_status
  type: enum
  values: [Booting, Updating, Ready, UpdateFailed]
- id: media_operating_mode
  type: enum
  values: [Standard, Sync_1x8]
- id: media_play_queue_status
  type: enum
  values: [Idle, Configured, Connecting, Playing, Paused, Disconnecting, Retrying]
- id: media_play_mode
  type: enum
  values: [Single, Repeat]
- id: media_play_on_startup
  type: enum
  values: [On, Off]
- id: media_network_mode
  type: enum
  values: [Off, Static, DHCP]
- id: module_update_progress_result
  type: enum
  values: [NotSet, UpdateComplete, UpdateFailedOnModule, FileNotFound, BPCommsError]
- id: core_temperature_alert
  type: enum
  values: [OK, RunningHot, OverTemperature]
- id: usb_power_alert
  type: enum
  values: [OK, OverCurrent]
- id: network_link_speed
  type: enum
  values: ["0", "100", "1000"]
- id: system_alerts
  type: enum
  values: [OK, Critical_PF, Critical_BF, Critical_MCF, Error_FF, Error_OTF, Critical_FF, Critical_FSRead, Critical_DMA]
- id: system_status
  type: enum
  values: [Serving, Busy]
- id: ntp_status
  type: string
  description: Whether the device can contact the NTP server (e.g. Found).
- id: cert_name
  type: string
  description: Common Name (CN) of the certificate.
- id: cert_start_date
  type: string
  description: Certificate start date string.
- id: cert_expiry_date
  type: string
  description: Certificate expiry date string.
- id: user_role
  type: enum
  values: [Administrator, PowerUser, User, Test]
- id: user_username
  type: string
- id: user_password
  type: string
  description: Always returned as `<Restricted>` when read.
- id: user_timeout
  type: integer
  description: Seconds.
- id: snmp_community
  type: string
- id: snmp_subnet
  type: string
  description: CIDR notation.
- id: snmp_enabled
  type: enum
  values: [On, Off]
- id: syslog_protocol
  type: enum
  values: [TCP, UDP]
- id: syslog_enabled
  type: enum
  values: [On, Off]
- id: use_maps
  type: enum
  values: [Yes, No]
- id: show_map_color
  type: enum
  values: [Yes, No]
- id: output_mode
  type: enum
  values: [Auto, HDMI]
- id: fan_speed_percent
  type: integer
  description: Range 0-100; recommended 50-85.
- id: backplane_temperature_c
  type: integer
- id: backplane_fpga_core_c
  type: integer
- id: psu_voltage_mv
  type: integer
- id: psu_current_ma
  type: integer
- id: psu_temperature_c
  type: integer
- id: psu_fan_rpm
  type: integer
- id: chassis_fan_rpm
  type: integer
- id: uptime_seconds
  type: integer
- id: current_time
  type: string
  description: Format YYYY/MM/DD hh:mm:ss.
- id: last_set_time
  type: string
- id: current_time_valid
  type: enum
  values: [Yes, No]
- id: command_port
  type: integer
- id: ethernet_enabled
  type: enum
  values: [On, Off]
- id: webserver_enabled
  type: enum
  values: [On, Off]
- id: ethernet_dhcp_enabled
  type: enum
  values: [On, Off]
- id: rs232_baud_rate
  type: integer
- id: ethernet_ip
  type: string
- id: ethernet_subnet
  type: string
- id: ethernet_gateway
  type: string
- id: ethernet_mac
  type: string
- id: ethernet_dhcp_ip
  type: string
- id: ethernet_dhcp_subnet
  type: string
- id: ethernet_dhcp_gateway
  type: string
- id: device_model_name
  type: string
  description: e.g. CALICO PRO
- id: device_model_number
  type: string
  description: e.g. C7-PRO-2200
- id: device_serial_number
  type: string
- id: device_backplane_number
  type: string
- id: device_software_version
  type: string
  description: e.g. 1.0.0.11
- id: device_software_date
  type: string
  description: e.g. Sep 11 2024 10:07:15
- id: system_api_version
  type: string
  description: e.g. 1.0.2
- id: unit_description
  type: string
- id: synclock_inhibit
  type: enum
  values: [On, Off]
- id: preset_easing
  type: enum
  values: [On, Off]
- id: hdcp_debug
  type: boolean
- id: wprst_seq_num
  type: integer
  description: Count of Routing.Preset.RestoreRead() invocations since boot.
```

## Variables
```yaml
# Variables are NOT used as a separate concept in this API - every settable
# parameter is exposed as a `.set` action (or assignment `<path> = <value>`)
# rather than as a discrete variable slot. The spec retains this section for
# downstream tool compatibility but it is intentionally empty.
# UNRESOLVED: no Variables are documented as a separate category in the source;
# every parameter is reached via a property assignment on the relevant
# namespace path (e.g. `System.Comms.Ethernet.IPAddress = <ip>`).
```

## Events
```yaml
# Unsolicited notifications. Categories: SECURITY, MEDIA_PLAYER, MEDIA_STORAGE,
# MODULE, MODULE_CORE_TEMPERATURE, SYSTEM, OUTPUT, HDMI.
# Device sends each event with the prefix `!Event <Category>,<Name>,<params>`.

- id: usercert_update_decrypted_group
  category: SECURITY
  syntax: 'USERCERT_UPDATE_DECRYPTED_GROUP,<value>'
  params:
    - name: value
      type: enum
      values: [OK, Fail]
  description: Raised when the decrypt phase of a user certificate completes.

- id: usercert_update_parse
  category: SECURITY
  syntax: 'USERCERT_UPDATE_PARSE,<value>'
  params:
    - name: value
      type: enum
      values: [OK, Fail]
  description: Raised when the parse phase of a user certificate completes.

- id: usercert_update_validation
  category: SECURITY
  syntax: 'USERCERT_UPDATE_VALIDATION,<value>'
  params:
    - name: value
      type: enum
      values: [OK, Fail]
  description: Raised when the validation phase of a user certificate completes.

- id: usercert_update_complete
  category: SECURITY
  syntax: 'USERCERT_UPDATE_COMPLETE,<value>'
  params:
    - name: value
      type: string
      description: 'UPDATECOMPLETE = success; any other value = failure.'
  description: Raised when a user certificate update finishes.

- id: item_status_changed
  category: MEDIA_PLAYER
  syntax: 'ITEM_STATUS_CHANGED,<input>,<itemNumber>,<status>,<resultCode>'
  params:
    - name: input
      type: string
      description: Full name of the slot (e.g. Slot11.In1)
    - name: itemNumber
      type: integer
      description: 1-20
    - name: status
      type: enum
      values: [OK, Failed]
    - name: resultCode
      type: integer
      description: Not used

- id: status_update
  category: MEDIA_PLAYER
  syntax: 'STATUS_UPDATE,<input>,<state>,<index>'
  params:
    - name: input
      type: string
    - name: state
      type: enum
      values: [Idle, Configured, Connecting, Playing, Paused, Disconnecting, Retrying]
    - name: index
      type: integer
      description: 1-20

- id: usb_hotplug_arrived
  category: MEDIA_STORAGE
  syntax: 'USB_HOTPLUG_ARRIVED,<slot>,<name>,<totalsize>,<freespace>'
  params:
    - name: slot
      type: string
    - name: name
      type: string
    - name: totalsize
      type: integer
      description: bytes
    - name: freespace
      type: integer
      description: bytes

- id: usb_hotplug_removed
  category: MEDIA_STORAGE
  syntax: 'USB_HOTPLUG_REMOVED,<slot>'
  params:
    - name: slot
      type: string

- id: operation_done
  category: MEDIA_STORAGE
  syntax: 'OPERATION_DONE,<slot>,<exitCode>'
  params:
    - name: slot
      type: string
    - name: exitCode
      type: integer
      description: 0 = success

- id: usb_power_alert
  category: MODULE
  syntax: 'USB_POWER_ALERT,<slot>,<status>'
  params:
    - name: slot
      type: string
    - name: status
      type: enum
      values: [OK, OverCurrent]

- id: module_status
  category: MODULE
  syntax: 'STATUS,<slot>,"<moduleStatus>"'
  params:
    - name: slot
      type: string
    - name: moduleStatus
      type: enum
      values: [READY, SHUTDOWN, BOOTING, UPDATING, BOOTFAILED, UPDATEFAILED, WAITFORVERSION, CARDFAILED]

- id: update_transfer_started
  category: MODULE
  syntax: 'UPDATE_TRANSFER_STARTED,<slot>'
  params:
    - name: slot
      type: string

- id: update_transfer_progress
  category: MODULE
  syntax: 'UPDATE_TRANSFER_PROGRESS,<slot>,<percentComplete>,<transferredBytes>'
  params:
    - name: slot
      type: string
    - name: percentComplete
      type: integer
    - name: transferredBytes
      type: integer

- id: update_transfer_finished
  category: MODULE
  syntax: 'UPDATE_TRANSFER_FINISHED,<slot>,<updateResult>'
  params:
    - name: slot
      type: string
    - name: updateResult
      type: enum
      values: [NotSet, UpdateComplete, UpdateFailedOnModule, FileNotFound, BPCommsError]

- id: network_link_speed_changed
  category: MODULE
  syntax: 'NETWORK_LINK_SPEED_CHANGED,<slot>,<linkSpeed>'
  params:
    - name: slot
      type: string
    - name: linkSpeed
      type: enum
      values: ["0", "100", "1000"]

- id: network_settings_changed
  category: MODULE
  syntax: 'NETWORK_SETTINGS_CHANGED,<slot>'
  params:
    - name: slot
      type: string

- id: core_temperature_alert
  category: MODULE
  syntax: 'CORE_TEMPERATURE_ALERT,<slot>,<status>,<coreTemp>'
  params:
    - name: slot
      type: string
    - name: status
      type: enum
      values: [OK, RunningHot, OverTemperature]
    - name: coreTemp
      type: integer
      description: Celsius

- id: module_core_temperature_changed
  category: MODULE_CORE_TEMPERATURE
  syntax: 'CHANGED,<slot>,<coreTemp>'
  params:
    - name: slot
      type: string
    - name: coreTemp
      type: integer

- id: update_status
  category: SYSTEM
  syntax: 'UPDATE_STATUS,<status>'
  params:
    - name: status
      type: enum
      values: [Booting, Updating, Ready, UpdateFailed]

- id: powermode_changed
  category: SYSTEM
  syntax: 'POWERMODE_CHANGED,<status>'
  params:
    - name: status
      type: enum
      values: [Standby, Resuming, Resumed]

- id: output_property_changed
  category: OUTPUT
  syntax: 'PROPERTY_CHANGED,<output>,<property>,<value>'
  params:
    - name: output
      type: string
    - name: property
      type: string
      description: 'AudioEnable, AudioMute, CutToBlack, etc.'
    - name: value
      type: string

- id: output_status_group
  category: OUTPUT
  syntax: 'STATUS_GROUP,<output>,<property>,<value>'
  params:
    - name: output
      type: string
    - name: property
      type: enum
      values: [HDCPActive, HDMI, FramelockStatus, Genlock]
    - name: value
      type: string
      description: 'HDCPActive: Active|Off; HDMI: Found|Not_Found; FramelockStatus: Locked|Unlocked; Genlock: Off|Locked'

- id: hdmi_sink_attached
  category: HDMI
  syntax: 'SINK_ATTACHED,<output>'
  params:
    - name: output
      type: string

- id: hdmi_sink_unplugged
  category: HDMI
  syntax: 'SINK_UNPLUGGED,<output>'
  params:
    - name: output
      type: string

- id: input_status_group
  category: INPUT
  syntax: 'STATUS_GROUP,<input>,<property>,<value>'
  params:
    - name: input
      type: string
      description: FullName of the input (e.g. Slot1.In1)
    - name: property
      type: enum
      values: [Status, MeasuredResolution, SetResolution, CanFramelockTo, HDCPRequired, HDCPStatus, HDMI, ColourSampling, ColourRangeActive, Audio]
    - name: value
      type: string
  description: Raised when an input property changes; applies to HDMI, SDI 12G, SDI 3G, and Streaming Media inputs.
```

## Macros
```yaml
# Macros are not a first-class API concept in the supplied source - the
# manual documents StartBatch()/EndBatch() as a write-grouping facility but
# does not document any user-defined named multi-step sequences. Multi-step
# behaviours are implemented client-side.
# UNRESOLVED: no named macros documented in source.
```

## Safety
```yaml
confirmation_required_for:
  # The source explicitly warns that changing Ethernet / IP / Subnet / Gateway
  # settings will result in loss of communication. It also documents a
  # RestoreAll() and ClearSavedSettings() pair that an Administrator can use
  # to revert destructive configuration; some sources flag this category as
  # needing an interactive confirmation.
  - System.Comms.Ethernet.IPAddress
  - System.Comms.Ethernet.IPSubnetMask
  - System.Comms.Ethernet.IPGateway
  - System.Comms.Ethernet.CommandPort
  - System.Comms.Ethernet.Enabled
  - System.Comms.RS232.Baudrate
  - System.SaveAllSettings
  - System.RestoreAll
  - System.ClearSavedSettings
  - System.ClearLiveConfig
  - System.ClearSavedIPStreams
  - System.ClearSavedPlaylists
  - System.BackupToSDCard
  - System.RestoreBackup
  - System.HDCPClearKeyFile
  - System.ClearAllOutputMaps
  - System.Security.User1Password
  - System.Security.User2Password
  - System.Security.User3Password
  - System.Security.User4Password
  - System.Security.AdminPassword
  - System.Security.Certificates.User.UpdateCert
  - System.Security.Certificates.User.DeleteCert
  - Device.SoftwareUpdate
  - Device.MediaCardUpdate
  - System.Reset
  - Slot{n}.Update.Reboot
interlocks: []
# UNRESOLVED: source documents warnings about loss of communication when
# Ethernet settings change, and an eco/warning pattern for temperature fan
# speed outside the recommended 50-85% range; no formal interlock procedures
# (multi-step required sequences) are documented.
```

## Notes
- All TCP commands are text lines terminated by CRLF (`\r\n`). The device responds to each command with a `!Done <command>` line on success or `!Failed <command>` plus `!Error <reason>` on failure. Property reads additionally return a `<prop> = <value>` line.
- The session must start with `Login(username,password)` before any other command is accepted. Only one TCP/Command-Line API connection is supported at a time.
- The device supports command shortcuts — for example `Slots.Slot1` and `Slot1` are interchangeable, and `Slot1.In1` can be shortened to `s1i1`. The supplied source documents both forms.
- RS-232 is documented as diagnostic-only. The source states: "RS232 is only supported for diagnostic purposes. Not all commands will work when using RS232." Operators integrating via RS-232 should expect reduced functionality versus the TCP command-line API.
- The supplied refined source covers Top-level, Device, System, System.Comms (Ethernet + RS232), System.Constraints, System.TemperatureControl, System.Sensors, System.Security (+ Certificates), System.Time (+ NTP), System.EdidUtils, System.Clients.Ftp, System.Services.SNMP, System.Services.SyslogRemote, Slots, HDMI Input, SDI 12G Input, SDI 3G Input, Streaming Media 4K Playback Input (including ActiveQueue, QueueItems, Label, Storage USB/Local/SyncGroup, Networking, Update), HDBaseT Input, HDMI Output, and SDI 12G Output. Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows, Profiles, TPG, Resolutions, IPStreams, and Playlists namespaces are mentioned by name in the device documentation but their full command listings were not present in the supplied excerpt; their actions remain UNRESOLVED.
<!-- UNRESOLVED: device has an onboard HTTPS webserver (WebserverEnabled) and an HTTPS certificate subsystem, but the supplied source did not document its HTTP/REST surface (paths, methods, JSON shapes). -->
<!-- UNRESOLVED: source does not state firmware compatibility ranges for this spec. -->
<!-- UNRESOLVED: source documents an asynchronous operation pattern (Copy, Delete, Move, CreateDirectory, FTP sync) whose completion is signalled via the MEDIA_STORAGE OPERATION_DONE event with a 0/non-zero exit code — the API itself does not provide a way to wait synchronously. -->

## Provenance

```yaml
source_domains:
  - api.tvone.com
source_urls:
  - "https://api.tvone.com/products/c7-series/c7-pro-2200/tvONE%20CALICO%20PRO%20C7-PRO-2200%20Commands_current.pdf"
  - https://api.tvone.com/products/c7-series/c7-pro-2200/index.html
  - https://api.tvone.com/products/c7-series/c7-pro-2200/WebsocketAPI_CALICO_C7-PRO_current.pdf
  - https://api.tvone.com
retrieved_at: 2026-08-11T03:46:09.506Z
last_checked_at: 2026-08-19T10:00:54.559Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T10:00:54.559Z
matched_actions: 375
action_count: 375
confidence: medium
summary: "All 375 spec actions match literal commands verbatim in the source; transport (port 10001, baud 115200) confirmed; no fabrication or drift detected. (12 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- System.HDCPPrintTable
- System.Minidump
- System.Menus
- System.ConfigName
- System.Messages
- System.PhaseTrainTime
- System.Security.Defaults
- System.Security.Certificates.Current.TransferPassword
- "Slot<n>.Cardtype"
- "Slot<n>.Carddata"
- "Slot<n>.Resolutions"
- "Slot<n>.Resolutions.Resolution<n>.Name"
- "source documents a very large API surface (System, Device, Slots, Routing, Presets, Audio, Canvas, etc.); this spec captures the namespaces explicitly listed in the supplied refined excerpt plus the global connection/login/feedback contract. Namespaces present in the device but absent from the supplied source excerpt (Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows, Profiles, TPG, IPStreams, Playlists) are marked UNRESOLVED and should be added when their source text is supplied."
- "data bits not stated in source"
- "parity not stated in source"
- "stop bits not stated in source"
- "flow control not stated in source"
- "Routing, Presets, Audio, Canvas, Canvases, Layouts, Windows,"
- "no Variables are documented as a separate category in the source;"
- "no named macros documented in source."
- "source documents warnings about loss of communication when"
- "device has an onboard HTTPS webserver (WebserverEnabled) and an HTTPS certificate subsystem, but the supplied source did not document its HTTP/REST surface (paths, methods, JSON shapes)."
- "source does not state firmware compatibility ranges for this spec."
- "source documents an asynchronous operation pattern (Copy, Delete, Move, CreateDirectory, FTP sync) whose completion is signalled via the MEDIA_STORAGE OPERATION_DONE event with a 0/non-zero exit code — the API itself does not provide a way to wait synchronously."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
