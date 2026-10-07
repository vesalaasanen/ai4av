---
spec_id: admin/tvone-cm-dvi-i-mon-2out
schema_version: ai4av-public-spec-v1
revision: 1
title: "tvONE CORIOmatrix DVI-I Monitoring 2 Output Module Control Spec"
manufacturer: tvONE
model_family: "CORIOmatrix Cm DVI-I Mon 2Out (AK64 DVI-I monitoring 2 output module)"
aliases: []
compatible_with:
  manufacturers:
    - tvONE
  models:
    - "CORIOmatrix Cm DVI-I Mon 2Out (AK64 DVI-I monitoring 2 output module)"
  firmware: M405
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tvone.com
  - api.tvone.com
source_urls:
  - "https://tvone.com/filestore/Manuals-CORIO-Products/tvONE%20CORIOmatrix%20Commands-v2.0.8.pdf"
  - https://api.tvone.com/products/c3-series/c3-5xx/index.html
  - https://api.tvone.com/
retrieved_at: 2026-06-30T08:58:05.448Z
last_checked_at: 2026-10-07T22:06:30.004Z
generated_at: 2026-10-07T22:06:30.004Z
firmware_coverage: M405
protocol_coverage: []
known_gaps:
  - "EDID.S<n><X><n>.Width_mm"
  - "EDID.S<n><X><n>.Height_mm"
  - "EDID.S<n><X><n>.HorizBdr_pix"
  - "EDID.S<n><X><n>.VertBdr_pix"
  - "EDID.S<n><X><n>.Extensions"
  - "the source is the system-wide CORIOmax command reference; slot population and exact module placement (which slot number hosts the AK64 card) is device-configuration dependent and not fixed by the source. Commands are presented in parameterized form (Slot<n>, Out<n>) per the source."
  - "full enumeration of per-property echo formats not exhaustively listed."
  - "additional output layout/warp parameters (Layout, HFlip, VFlip,"
  - "no explicit hardware power-on sequencing or external interlock"
  - "exact slot number hosting the AK64 card is installation-dependent; source uses Slot14 as the worked example for DVI output modules."
  - "full value ranges for layout/warp/geometry properties not stated in source."
  - "byte-level framing / line terminator for the serial protocol not specified in the refined source (ASCII line-based; exact terminator character not stated)."
  - "firmware/protocol version compatibility ranges beyond M405/API 4.5 not stated."
verification:
  verdict: verified
  checked_at: 2026-10-07T22:06:30.004Z
  matched_actions: 265
  action_count: 265
  confidence: medium
  summary: "All 265 action units match source commands and transport values are supported; only 5 EDID read-only properties are unrepresented, within the 0.9 coverage floor. (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-30
---

# tvONE CORIOmatrix DVI-I Monitoring 2 Output Module Control Spec

## Summary
tvONE CORIOmatrix is a modular video wall/windowing processor. This spec covers the DVI-I monitoring 2-output module (AK64) within the CORIOmax/CORIOmatrix system, controlled via the system command-line API over RS-232C serial (and Ethernet). The device uses a dot-notation property/method command language (e.g. `Slot14.Out1.Resolution`, `Preset.Take`) with `!Done`/`!Info`/`!Event` style responses. Login with username/password is required before issuing commands.

<!-- UNRESOLVED: the source is the system-wide CORIOmax command reference; slot population and exact module placement (which slot number hosts the AK64 card) is device-configuration dependent and not fixed by the source. Commands are presented in parameterized form (Slot<n>, Out<n>) per the source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
# Source: "Default communications settings" - Serial (RS-232) and Ethernet both
# documented. Constraint: only ONE connection (serial OR ethernet) active at a
# time; concurrent control is not supported.
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 10001  # Ethernet Command_Port (default). Default IP 192.168.0.10 stated.
auth:
  type: login  # Login command documented; account login required before control.
  # Default credentials explicitly stated in source:
  #   admin / adminpw, user1 / user1pw, user2 / user2pw, user3 / user3pw,
  #   user4 / user4pw, test / testpw, guest / guestpw.
  # Token format: Login(<username>,<password>) plaintext.
```

## Traits
```yaml
traits:
  - queryable   # inferred: many read-only Get properties and list/query commands
  - routable    # inferred: S<n>I<n> > S<n>O<n> input-to-output routing command
  - levelable   # inferred: Brightness/Contrast/Gamma*/SCurve/HeadphoneVolume controls
```

## Actions
```yaml
# Command language: dot-notation "path = value" for properties and "path()" for
# methods. Responses are prefixed "!Done ", "!Info ", or "!Failed ". Commands
# are case-sensitive as shown. <n> denotes a 1-based slot/output/input index.
# Per-source examples are shown verbatim in `command`.

# ---- Top level ----
- id: login
  label: Login
  kind: action
  command: "Login(<username>,<password>)"
  params:
    - {name: username, type: string, description: "Account username"}
    - {name: password, type: string, description: "Account password"}
- id: logout
  label: Logout
  kind: action
  command: "Logout"
  params: []
- id: start_batch
  label: Start Batch
  kind: action
  command: "StartBatch"
  params: []
- id: end_batch
  label: End Batch
  kind: action
  command: "EndBatch"
  params: []
- id: namespaces_list
  label: List Namespaces
  kind: query
  command: "Namespaces"
  params: []
- id: root_list
  label: List Root
  kind: query
  command: "Root"
  params: []

# ---- CORIOmax ----
- id: coriomax_list
  label: List CORIOmax
  kind: query
  command: "CORIOmax"
  params: []
- id: coriomax_model_name
  label: Get Model Name
  kind: query
  command: "CORIOmax.Model_Name"
  params: []
- id: coriomax_model_number
  label: Get Model Number
  kind: query
  command: "CORIOmax.Model_Number"
  params: []
- id: coriomax_serial_number
  label: Get Serial Number
  kind: query
  command: "CORIOmax.Serial_Number"
  params: []
- id: coriomax_backplane_number
  label: Get Backplane Number
  kind: query
  command: "CORIOmax.Backplane_Number"
  params: []
- id: coriomax_software_name
  label: Get Software Name
  kind: query
  command: "CORIOmax.Software_Name"
  params: []
- id: coriomax_software_version
  label: Get Software Version
  kind: query
  command: "CORIOmax.Software_Version"
  params: []
- id: coriomax_software_date
  label: Get Software Date
  kind: query
  command: "CORIOmax.Software_Date"
  params: []
- id: coriomax_software_update
  label: Software Update
  kind: action
  command: "CORIOmax.Software_Update()"
  params: []
- id: coriomax_reboot_to_master
  label: Reboot To Master
  kind: action
  command: "CORIOmax.RebootToMaster()"
  params: []

# ---- System ----
- id: system_list
  label: List System
  kind: query
  command: "System"
  params: []
- id: system_config_name
  label: Get/Set Config Name
  kind: action
  command: "System.ConfigName = {name}"
  params:
    - {name: name, type: string, description: "Configuration name (up to 32 chars, no spaces)"}
- id: system_wprst_seqnum
  label: Get Preset Restore SeqNum
  kind: query
  command: "System.WPrstSeqNum"
  params: []
- id: system_hdcp_debug
  label: Get/Set HDCP Debug
  kind: action
  command: "System.HDCP_Debug = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: system_status
  label: Get System Status
  kind: query
  command: "System.Status"
  params: []
- id: system_api_version
  label: Get API Version
  kind: query
  command: "System.API_Version"
  params: []
- id: system_unit_description
  label: Get/Set Unit Description
  kind: action
  command: "System.Unit_Description = \"{desc}\""
  params:
    - {name: desc, type: string, description: "Device name up to 32 ASCII chars (quoted)"}
- id: system_gui_control_first_boot
  label: Get First Boot
  kind: query
  command: "System.GUI_Control.First_Boot"
  params: []
- id: system_synclock_inhibit
  label: Get/Set Synclock Inhibit
  kind: action
  command: "System.Synclock_Inhibit = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: system_reset
  label: System Reset (Reboot)
  kind: action
  command: "System.Reset()"
  params: []
- id: system_save_all_settings
  label: Save All Settings
  kind: action
  command: "System.SaveAllSettings()"
  params: []
- id: system_restore_all
  label: Restore All (Admin)
  kind: action
  command: "System.RestoreAll()"
  params: []
- id: system_clear_saved_settings
  label: Clear Saved Settings (Admin)
  kind: action
  command: "System.ClearSavedSettings()"
  params: []
- id: system_backup_to_sdcard
  label: Backup To SD Card
  kind: action
  command: "System.BackupToSDCard()"
  params: []
- id: system_restore_backup
  label: Restore Backup (Admin)
  kind: action
  command: "System.RestoreBackup()"
  params: []
- id: system_hdcp_print_table
  label: HDCP Print Table
  kind: action
  command: "System.HDCPPrintTable()"
  params: []
- id: system_hdcp_clear_key_file
  label: HDCP Clear Key File
  kind: action
  command: "System.HDCPClearKeyFile()"
  params: []

# ---- System Communications ----
- id: comms_list
  label: List Comms
  kind: query
  command: "System.Comms"
  params: []
- id: comms_rs232_list
  label: List RS232 Settings
  kind: query
  command: "System.Comms.RS232"
  params: []
- id: comms_rs232_baudrate
  label: Get/Set RS232 Baudrate
  kind: action
  command: "System.Comms.RS232.Baudrate = {baud}"
  params:
    - {name: baud, type: integer, description: "Baud rate (changing may drop comms)"}
- id: comms_rs232_rs422_mode
  label: Get/Set RS422 Mode
  kind: action
  command: "System.Comms.RS232.RS422_Mode = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: comms_ethernet_list
  label: List Ethernet Settings
  kind: query
  command: "System.Comms.Ethernet"
  params: []
- id: comms_ethernet_enabled
  label: Get/Set Ethernet Enabled
  kind: action
  command: "System.Comms.Ethernet.Enabled = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: comms_ethernet_mac_address
  label: Get MAC Address
  kind: query
  command: "System.Comms.Ethernet.MAC_Address"
  params: []
- id: comms_ethernet_dhcp_list
  label: List DHCP Settings
  kind: query
  command: "System.Comms.Ethernet.DHCP"
  params: []
- id: comms_ethernet_dhcp_enabled
  label: Get/Set DHCP Enabled
  kind: action
  command: "System.Comms.Ethernet.DHCP.Enabled = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: comms_ethernet_dhcp_ip_address
  label: Get DHCP IP Address
  kind: query
  command: "System.Comms.Ethernet.DHCP.IP_Address"
  params: []
- id: comms_ethernet_dhcp_ip_subnet_mask
  label: Get DHCP Subnet Mask
  kind: query
  command: "System.Comms.Ethernet.DHCP.IP_Subnet_Mask"
  params: []
- id: comms_ethernet_dhcp_ip_gateway
  label: Get DHCP Gateway
  kind: query
  command: "System.Comms.Ethernet.DHCP.IP_Gateway"
  params: []
- id: comms_ethernet_ip_address
  label: Get/Set IP Address
  kind: action
  command: "System.Comms.Ethernet.IP_Address = {ip}"
  params:
    - {name: ip, type: string, description: "IPv4 address"}
- id: comms_ethernet_ip_subnet_mask
  label: Get/Set IP Subnet Mask
  kind: action
  command: "System.Comms.Ethernet.IP_Subnet_Mask = {mask}"
  params:
    - {name: mask, type: string, description: "Subnet mask"}
- id: comms_ethernet_ip_gateway
  label: Get/Set IP Gateway
  kind: action
  command: "System.Comms.Ethernet.IP_Gateway = {gw}"
  params:
    - {name: gw, type: string, description: "Gateway IPv4 address"}
- id: comms_ethernet_command_port
  label: Get/Set Command Port
  kind: action
  command: "System.Comms.Ethernet.Command_Port = {port}"
  params:
    - {name: port, type: integer, description: "TCP command port"}
- id: comms_ethernet_webserver_enabled
  label: Get/Set Webserver Enabled
  kind: action
  command: "System.Comms.Ethernet.Webserver_Enabled = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: comms_usb_msd_enabled
  label: Get/Set USB MSD Enabled
  kind: action
  command: "System.Comms.USB.MSD_Enabled = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: comms_ethernet_restart
  label: Restart Ethernet
  kind: action
  command: "System.Comms.Ethernet.RestartEthernet()"
  params: []

# ---- System Security (per-account: guest, user1-4, admin, test) ----
- id: security_list
  label: List Security
  kind: query
  command: "System.Security"
  params: []
- id: security_account_username
  label: Get/Set Account Username
  kind: action
  command: "System.Security.{Account}_Username = {username}"
  params:
    - {name: Account, type: string, description: "Guest|User1|User2|User3|User4|Admin|Test"}
    - {name: username, type: string, description: "Account username (guest is fixed to 'guest')"}
- id: security_account_password
  label: Set Account Password
  kind: action
  command: "System.Security.{Account}_Password = {password}"
  params:
    - {name: Account, type: string, description: "User1|User2|User3|User4|Admin|Test (guest fixed)"}
    - {name: password, type: string, description: "Account password (write-only, returns <Restricted>)"}
- id: security_account_timeout
  label: Get/Set Account Timeout
  kind: action
  command: "System.Security.{Account}_Timeout = {seconds}"
  params:
    - {name: Account, type: string, description: "Guest|User1|User2|User3|User4|Admin|Test"}
    - {name: seconds, type: integer, description: "Logout timeout seconds; 0 = infinite. Guest fixed to 300"}
- id: security_account_role
  label: Get/Set Account Role
  kind: action
  command: "System.Security.{Account}_Role = {role}"
  params:
    - {name: Account, type: string, description: "Guest|User1|User2|User3|User4|Admin|Test"}
    - {name: role, type: string, description: "Administrator|PowerUser|User|Guest|Test"}

# ---- Temperature Control ----
- id: temperature_control_list
  label: List Temperature Control
  kind: query
  command: "System.Temperature_Control"
  params: []
- id: temperature_readings
  label: Temperature Readings
  kind: query
  command: "System.Temperature_Control.TemperatureReadings()"
  params: []
- id: fan_speed
  label: Get/Set Fan Speed
  kind: action
  command: "System.Temperature_Control.FanSpeed = {rpm}"
  params:
    - {name: rpm, type: integer, description: "Fan speed ~3000-7000 rpm"}

# ---- Events ----
- id: add_events
  label: Add Events
  kind: action
  command: "AddEvents({eventCategory})"
  params:
    - {name: eventCategory, type: string, description: "e.g. HDMI, PRESET, MEDIA_STORAGE"}
- id: remove_events
  label: Remove Events
  kind: action
  command: "RemoveEvents({eventCategory})"
  params:
    - {name: eventCategory, type: string, description: "Event category to unsubscribe"}
- id: list_events
  label: List Subscribed Events
  kind: query
  command: "ListEvents()"
  params: []
- id: list_all_events
  label: List All Events
  kind: query
  command: "ListAllEvents({eventCategory})"
  params:
    - {name: eventCategory, type: string, description: "Optional category filter"}

# ---- Aliases ----
- id: aliases_list
  label: List Aliases
  kind: query
  command: "Aliases"
  params: []

# ---- Resources ----
- id: resources_list
  label: List Resources
  kind: query
  command: "Resources"
  params: []
- id: resources_configs_list
  label: List Configs
  kind: query
  command: "Resources.Configs"
  params: []
- id: resources_edid_list
  label: List EDID
  kind: query
  command: "Resources.EDID"
  params: []
- id: resources_tpg_list
  label: List TPG
  kind: query
  command: "Resources.TPG"
  params: []
- id: resources_resolutions_list
  label: List Resolutions
  kind: query
  command: "Resources.Resolutions"
  params: []
- id: resources_playlists_list
  label: List Playlists
  kind: query
  command: "Resources.Playlists"
  params: []
- id: resources_config_list
  label: Config List
  kind: query
  command: "Resources.ConfigList()"
  params: []

# ---- Resources Configurations (Config1-Config20) ----
- id: configs_list
  label: List All Configs
  kind: query
  command: "Configs"
  params: []
- id: config_get
  label: Get Config
  kind: query
  command: "Configs.Config{n}"
  params:
    - {name: n, type: integer, description: "Configuration number 1-20"}
- id: config_directory
  label: Get Config Directory
  kind: query
  command: "Configs.Config{n}.Directory"
  params:
    - {name: n, type: integer, description: "Configuration number 1-20"}
- id: config_backup
  label: Backup Config
  kind: action
  command: "Configs.Config{n}.Backup()"
  params:
    - {name: n, type: integer, description: "Configuration number 1-20"}
- id: config_restore
  label: Restore Config
  kind: action
  command: "Configs.Config{n}.Restore()"
  params:
    - {name: n, type: integer, description: "Configuration number 1-20"}
- id: config_remove
  label: Remove Config
  kind: action
  command: "Configs.Config{n}.Remove()"
  params:
    - {name: n, type: integer, description: "Configuration number 1-20"}

# ---- Resources EDID ----
- id: edid_connection_list
  label: List EDID For Connection
  kind: query
  command: "EDID.S{slot}{X}{port}"
  params:
    - {name: slot, type: integer, description: "Slot number"}
    - {name: X, type: string, description: "I (input) or O (output)"}
    - {name: port, type: integer, description: "Port number"}
- id: edid_filename
  label: Get EDID Filename
  kind: query
  command: "EDID.S{slot}{X}{port}.Filename"
  params:
    - {name: slot, type: integer, description: "Slot number"}
    - {name: X, type: string, description: "I or O"}
    - {name: port, type: integer, description: "Port number"}
- id: edid_version
  label: Get EDID Version
  kind: query
  command: "EDID.S{slot}{X}{port}.EDIDVersion"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_manufacturer
  label: Get EDID Manufacturer
  kind: query
  command: "EDID.S{slot}{X}{port}.Manufacturer"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_name
  label: Get EDID Name
  kind: query
  command: "EDID.S{slot}{X}{port}.Name"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_serial_number
  label: Get EDID Serial Number
  kind: query
  command: "EDID.S{slot}{X}{port}.SerialNumber"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_manufacture_date
  label: Get EDID Manufacture Date
  kind: query
  command: "EDID.S{slot}{X}{port}.ManufactureDate"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_resolutions
  label: List EDID Resolutions
  kind: query
  command: "EDID.S{slot}{X}{port}.Resolutions()"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}
- id: edid_remove_file
  label: Remove EDID File
  kind: action
  command: "EDID.S{slot}{X}{port}.Remove_File()"
  params:
    - {name: slot, type: integer}
    - {name: X, type: string}
    - {name: port, type: integer}

# ---- Resources Test Pattern Generator (TPG1 only) ----
- id: tpg_list
  label: List TPG
  kind: query
  command: "TPG"
  params: []
- id: tpg1_list
  label: List TPG1 Attributes
  kind: query
  command: "TPG.TPG1"
  params: []
- id: tpg1_resolution
  label: Get/Set TPG Resolution
  kind: action
  command: "TPG.TPG1.Resolution = {resolution}"
  params:
    - {name: resolution, type: string, description: "Resolution name e.g. 1280x720p60"}
- id: tpg1_pattern
  label: Get/Set Test Pattern
  kind: action
  command: "TPG.TPG1.Pattern = {pattern}"
  params:
    - {name: pattern, type: string, description: "Black,RGB_100,8x8_Grid,Dot,8x8_ChqBrd,Vertical_Lines,Horizontal_Lines,Bars_n_Ramps,Blue,Red,Magenta,Green,Cyan,Yellow,White"}
- id: tpg1_moving_bar
  label: Get/Set Moving Bar
  kind: action
  command: "TPG.TPG1.Moving_Bar = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}

# ---- Resources Resolutions ----
- id: resolution_get
  label: Get Resolution
  kind: query
  command: "Resolutions.Resolution{n}"
  params:
    - {name: n, type: integer, description: "System 1+, custom 1000+"}
- id: resolution_name
  label: Get/Set Resolution Name
  kind: action
  command: "Resolutions.Resolution{n}.Name = {name}"
  params:
    - {name: n, type: integer}
    - {name: name, type: string}
- id: resolution_aspect
  label: Get/Set Resolution Aspect
  kind: action
  command: "Resolutions.Resolution{n}.Aspect = {aspect}"
  params:
    - {name: n, type: integer}
    - {name: aspect, type: string, description: "16:9,4:3,5:4,16:10,5:3,1:1,16:6"}
- id: resolution_pixel_clock
  label: Get/Set Pixel Clock
  kind: action
  command: "Resolutions.Resolution{n}.PixelClock = {hz}"
  params:
    - {name: n, type: integer}
    - {name: hz, type: integer}
- id: resolution_scan_type
  label: Get/Set Scan Type
  kind: action
  command: "Resolutions.Resolution{n}.ScanType = {scan}"
  params:
    - {name: n, type: integer}
    - {name: scan, type: string, description: "p (progressive) / i (interlaced)"}
- id: resolution_timing_params
  label: Get/Set Resolution Timing
  kind: action
  command: "Resolutions.Resolution{n}.{Timing} = {value}"
  params:
    - {name: n, type: integer}
    - {name: Timing, type: string, description: "HActive,HFrontPorch,HSyncPulse,HBackPorch,VActive,VFrontPorch,VSyncPulse,VBackPorch,HSyncPolarity,VSyncPolarity,CEAID,Origin"}
    - {name: value, type: string}

# ---- Slots / DVI Output Module (AK64 DVI-I monitoring 2-out) ----
- id: slots_list
  label: List Slots
  kind: query
  command: "Slots"
  params: []
- id: slot_list
  label: List Slot
  kind: query
  command: "Slot{slot}"
  params:
    - {name: slot, type: integer, description: "Slot number"}
- id: slot_cardtype
  label: Get Slot Card Type
  kind: query
  command: "Slot{slot}.Cardtype"
  params:
    - {name: slot, type: integer}
- id: slot_carddata
  label: Get Slot Card Data
  kind: query
  command: "Slot{slot}.Carddata"
  params:
    - {name: slot, type: integer}
- id: slot_out_list
  label: List Output
  kind: query
  command: "Slot{slot}.Out{out}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer, description: "Output 1 or 2"}
- id: slot_out_full_name
  label: Get Output Full Name
  kind: query
  command: "Slot{slot}.Out{out}.FullName"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_status
  label: Get Output Status
  kind: query
  command: "Slot{slot}.Out{out}.Status"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_alias
  label: Get/Set Output Alias
  kind: action
  command: "Slot{slot}.Out{out}.Alias = {alias}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: alias, type: string}
- id: slot_out_aspect_choice
  label: Get/Set Output Aspect
  kind: action
  command: "Slot{slot}.Out{out}.AspectChoice = {aspect}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: aspect, type: string, description: "16:9,4:3,5:4,16:10,5:3,1:1,16:6"}
- id: slot_out_eco_mode
  label: Get/Set Output EcoMode
  kind: action
  command: "Slot{slot}.Out{out}.EcoMode = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off; allows attached monitor standby; non-persistent"}
- id: slot_out_display_type
  label: Get/Set Output Display Type
  kind: action
  command: "Slot{slot}.Out{out}.DisplayType = {type}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: type, type: string, description: "Monitor,Projector,None"}
- id: slot_out_resolution
  label: Get/Set Output Resolution
  kind: action
  command: "Slot{slot}.Out{out}.Resolution = {resolution}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: resolution, type: string, description: "Valid resolution name"}
- id: slot_out_default_lo_res
  label: Get/Set Output DefaultLoRes
  kind: action
  command: "Slot{slot}.Out{out}.DefaultLoRes = {resolution}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: resolution, type: string}
- id: slot_out_width
  label: Get Output Width
  kind: query
  command: "Slot{slot}.Out{out}.Width"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_height
  label: Get Output Height
  kind: query
  command: "Slot{slot}.Out{out}.Height"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_field_rate
  label: Get Output Field Rate
  kind: query
  command: "Slot{slot}.Out{out}.Field_Rate"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_frame_ip
  label: Get Output Frame Type
  kind: query
  command: "Slot{slot}.Out{out}.Frame_ip"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_analog_type
  label: Get/Set Output Analog Type
  kind: action
  command: "Slot{slot}.Out{out}.AnalogType = {type}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: type, type: string, description: "RGBHV,RGBS,RGsB,YUV,CV+YC"}
- id: slot_out_colour_scale
  label: Get/Set Output Colour Scale
  kind: action
  command: "Slot{slot}.Out{out}.ColourScale = {scale}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: scale, type: string, description: "Auto,Black,YUV,RGB,YUV_601,YUV_709"}
- id: slot_out_genlock_source
  label: Get/Set Output Genlock Source
  kind: action
  command: "Slot{slot}.Out{out}.GenlockSource = {source}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: source, type: string, description: "Input path or NULL"}
- id: slot_out_genlock
  label: Get Output Genlock Status
  kind: query
  command: "Slot{slot}.Out{out}.Genlock"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_raw_matrix_switch
  label: Get/Set Output Switch Mode
  kind: action
  command: "Slot{slot}.Out{out}.RawMatrixSwitch = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "Off=fade through black, On=freeze and cut"}
- id: slot_out_audio
  label: Get Output Audio
  kind: query
  command: "Slot{slot}.Out{out}.Audio"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_aud_out
  label: Get Output Audio Channel
  kind: query
  command: "Slot{slot}.Out{out}.AudOut{channel}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: channel, type: string, description: "A|B|C|D"}
- id: slot_out_hdcp_active
  label: Get Output HDCP Active
  kind: query
  command: "Slot{slot}.Out{out}.HDCP_Active"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_hdcp_downstream
  label: Get/Set Output HDCP Downstream
  kind: action
  command: "Slot{slot}.Out{out}.HDCP_Downstream = {mode}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: mode, type: string, description: "HoldOn,KeepOff,FollowSource"}
- id: slot_out_hdmi
  label: Get Output HDMI Status
  kind: query
  command: "Slot{slot}.Out{out}.HDMI"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_gamma
  label: Get/Set Output Gamma
  kind: action
  command: "Slot{slot}.Out{out}.Gamma{Color} = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Color, type: string, description: "Red|Green|Blue"}
    - {name: value, type: number, description: "0.30 to 2.00"}
- id: slot_out_scurve
  label: Get/Set Output SCurve
  kind: action
  command: "Slot{slot}.Out{out}.SCurve = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: number, description: "0.30 to 2.00"}
- id: slot_out_overlap
  label: Get/Set Output Overlap
  kind: action
  command: "Slot{slot}.Out{out}.{Side}Overlap = {pixels}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Side, type: string, description: "Left|Right|Top|Bottom"}
    - {name: pixels, type: integer}
- id: slot_out_eb_pos
  label: Get/Set Output Edge Blend Position
  kind: action
  command: "Slot{slot}.Out{out}.{Side}EBPos = {pos}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Side, type: string, description: "Left|Right|Top|Bottom"}
    - {name: pos, type: integer}
- id: slot_out_black_blend
  label: Get/Set Output Black Blend
  kind: action
  command: "Slot{slot}.Out{out}.{Side}_BB = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Side, type: string, description: "Centre|Left|Right|Top|Bottom"}
    - {name: value, type: integer}
- id: slot_out_edid_filename
  label: Get/Set Output EDID Filename
  kind: action
  command: "Slot{slot}.Out{out}.EDID_Filename = {filename}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: filename, type: string}
- id: slot_out_view
  label: Get/Set Output View (Monitor Card)
  kind: action
  command: "Slot{slot}.Out{out}.View = {view}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: view, type: string, description: "MonitorViews.View<n> (only with Monitor Card)"}
- id: slot_out_view_pos_code
  label: Get/Set Output View Position (Monitor Card)
  kind: action
  command: "Slot{slot}.Out{out}.ViewPosCode = {code}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: code, type: integer}
- id: slot_out_audio_bars
  label: Get/Set Output Audio Bars
  kind: action
  command: "Slot{slot}.Out{out}.AudioBars = {count}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: count, type: integer, description: "0 to number of audio channels"}
- id: slot_out_ins_list
  label: Get Output InsList
  kind: query
  command: "Slot{slot}.Out{out}.InsList"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_out_cut_to_black
  label: Get/Set Output Cut To Black
  kind: action
  command: "Slot{slot}.Out{out}.CutToBlack = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off; use StartBatch/EndBatch to sync multiple outputs"}
- id: slot_out_framelock_source
  label: Get/Set Output Framelock Source
  kind: action
  command: "Slot{slot}.Out{out}.FramelockSource = {source}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: source, type: string}
- id: slot_out_framelock_enable
  label: Get/Set Output Framelock Enable
  kind: action
  command: "Slot{slot}.Out{out}.FramelockEnable = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off"}
- id: slot_out_framelock_status
  label: Get Output Framelock Status
  kind: query
  command: "Slot{slot}.Out{out}.FramelockStatus"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: slot_phase_retrain
  label: Slot Phase Retrain
  kind: action
  command: "Slot{slot}.PhaseRetrain()"
  params:
    - {name: slot, type: integer}
- id: slot_module_resolutions
  label: List Slot Module Resolutions
  kind: query
  command: "Slot{slot}.Module_Resolutions()"
  params:
    - {name: slot, type: integer}
- id: slot_out_force_link_refresh
  label: Output Force Link Refresh
  kind: action
  command: "Slot{slot}.Out{out}.ForceLinkRefresh()"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}

# ---- Audio Module (AK13, CORIOmatrix only) ----
- id: audio_slot_headphone_source
  label: Get/Set Headphone Source
  kind: action
  command: "Slot{slot}.HeadphoneSource = {source}"
  params:
    - {name: slot, type: integer}
    - {name: source, type: string, description: "Output to monitor on headphone socket"}
- id: audio_slot_headphone_volume
  label: Get/Set Headphone Volume
  kind: action
  command: "Slot{slot}.HeadphoneVolume = {volume}"
  params:
    - {name: slot, type: integer}
    - {name: volume, type: integer, description: "0-10"}
- id: audio_slot_headphone_mute
  label: Get/Set Headphone Mute
  kind: action
  command: "Slot{slot}.HeadphoneMute = {value}"
  params:
    - {name: slot, type: integer}
    - {name: value, type: string, description: "On/Off"}

# ---- HDBaseT Sub-Menu (where applicable) ----
- id: hdbaset_list
  label: List HDBaseT Attributes
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_current_mode
  label: Get HDBaseT Current Mode
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.CurrentMode"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_local_link_status
  label: Get HDBaseT Local Link Status
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.LocalLinkStatus"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_local_fw_ver
  label: Get HDBaseT Local Firmware Version
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.LocalFwVer"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_cable_length
  label: Get HDBaseT Cable Length
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.CableLength"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_local_hdmi_status
  label: Get HDBaseT Local HDMI Status
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.LocalHDMIStatus"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_max_error
  label: Get HDBaseT Max Error
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.MaxError"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_remote_fw_ver
  label: Get HDBaseT Remote Firmware Version
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.RemoteFWVer"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_remote_link_status
  label: Get HDBaseT Remote Link Status
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.RemoteLinkStatus"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_remote_hdmi_status
  label: Get HDBaseT Remote HDMI Status
  kind: query
  command: "Slot{slot}.Out{out}.HDBaseT.RemoteHDMIStatus"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_local_link_reset
  label: HDBaseT Local Link Reset
  kind: action
  command: "Slot{slot}.Out{out}.HDBaseT.LocalLinkReset()"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_remote_link_reset
  label: HDBaseT Remote Link Reset
  kind: action
  command: "Slot{slot}.Out{out}.HDBaseT.RemoteLinkReset()"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
- id: hdbaset_set_mode
  label: Get/Set HDBaseT Mode
  kind: action
  command: "Slot{slot}.Out{out}.HDBaseT.SetMode = {mode}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: mode, type: string, description: "Auto,LongReach,Standard"}

# ---- Routing ----
- id: routing_list
  label: List Routing
  kind: query
  command: "Routing"
  params: []
- id: route_input_to_output
  label: Route Input To Output
  kind: action
  command: "S{srcSlot}I{srcIn} > S{dstSlot}O{dstOut}"
  params:
    - {name: srcSlot, type: integer, description: "Source slot"}
    - {name: srcIn, type: integer, description: "Source input"}
    - {name: dstSlot, type: integer, description: "Destination slot"}
    - {name: dstOut, type: integer, description: "Destination output"}
  # Long-hand form avoiding aliases: "slot3.in1 > slot14.out1"

# ---- MonitorViews (CORIOmatrix, Monitor Card only) ----
- id: monitor_views_list
  label: List MonitorViews
  kind: query
  command: "MonitorViews"
  params: []
- id: monitor_view_list
  label: List Monitor View
  kind: query
  command: "View{n}"
  params:
    - {name: n, type: integer, description: "View number"}
- id: monitor_view_full_name
  label: Get/Set View Full Name
  kind: action
  command: "View{n}.FullName = {name}"
  params:
    - {name: n, type: integer}
    - {name: name, type: string}
- id: monitor_view_status
  label: Get View Status
  kind: query
  command: "View{n}.Status"
  params:
    - {name: n, type: integer}
- id: monitor_view_alias
  label: Get/Set View Alias
  kind: action
  command: "View{n}.Alias = {alias}"
  params:
    - {name: n, type: integer}
    - {name: alias, type: string}
- id: monitor_view_canvas
  label: Get/Set View Canvas
  kind: action
  command: "View{n}.Canvas = {canvas}"
  params:
    - {name: n, type: integer}
    - {name: canvas, type: string}
- id: monitor_view_can_width
  label: Get/Set View Canvas Width
  kind: action
  command: "View{n}.CanWidth = {width}"
  params:
    - {name: n, type: integer}
    - {name: width, type: integer}
- id: monitor_view_can_height
  label: Get/Set View Canvas Height
  kind: action
  command: "View{n}.CanHeight = {height}"
  params:
    - {name: n, type: integer}
    - {name: height, type: integer}
- id: monitor_view_can_xcentre
  label: Get/Set View Canvas X Centre
  kind: action
  command: "View{n}.CanXCentre = {x}"
  params:
    - {name: n, type: integer}
    - {name: x, type: integer}
- id: monitor_view_can_ycentre
  label: Get/Set View Canvas Y Centre
  kind: action
  command: "View{n}.CanYCentre = {y}"
  params:
    - {name: n, type: integer}
    - {name: y, type: integer}
- id: monitor_view_zorder
  label: Get/Set View Z Order
  kind: action
  command: "View{n}.Zorder = {z}"
  params:
    - {name: n, type: integer}
    - {name: z, type: integer}
- id: monitor_view_rotate_deg
  label: Get/Set View Rotation
  kind: action
  command: "View{n}.RotateDeg = {degrees}"
  params:
    - {name: n, type: integer}
    - {name: degrees, type: integer}
- id: monitor_view_vnum
  label: Get/Set View Grid Layout
  kind: action
  command: "View{n}.VNum = {vnum}"
  params:
    - {name: n, type: integer}
    - {name: vnum, type: integer, description: "VNum = x*16 + y (e.g. 1x1=17, 2x2=34, 4x4=68)"}
- id: monitor_views_auto_scaling
  label: Get/Set MonitorViews AutoScaling
  kind: action
  command: "MonitorViews.AutoScaling = {value}"
  params:
    - {name: value, type: string, description: "On/Off"}
- id: monitor_views_auto
  label: Get/Set MonitorViews Auto
  kind: action
  command: "MonitorViews.Auto = {value}"
  params:
    - {name: value, type: string, description: "On=auto / Off=manual view config"}

# ---- Preset ----
- id: preset_list_root
  label: List Preset Properties
  kind: query
  command: "Preset"
  params: []
- id: preset_take
  label: Preset Take
  kind: action
  command: "Preset.Take = {id}"
  params:
    - {name: id, type: integer, description: "Preset ID 1-49 (equivalent to Read+RestoreRead)"}
- id: preset_read
  label: Preset Read (Select For Edit)
  kind: action
  command: "Preset.Read = {id}"
  params:
    - {name: id, type: integer, description: "Preset ID 1-49"}
- id: preset_valid
  label: Get Preset Valid
  kind: query
  command: "Preset.Valid"
  params: []
- id: preset_name_read
  label: Get/Set Preset Name
  kind: action
  command: "Preset.NameRead = {name}"
  params:
    - {name: name, type: string, description: "Up to 19 alphanumeric chars, no spaces"}
- id: preset_preset_list
  label: List All Presets
  kind: query
  command: "Preset.PresetList()"
  params: []
- id: preset_save_read
  label: Save Active Preset
  kind: action
  command: "Preset.SaveRead()"
  params: []
- id: preset_restore_read
  label: Restore Active Preset
  kind: action
  command: "Preset.RestoreRead()"
  params: []
- id: preset_rmv_preset_file_read
  label: Clear Active Preset
  kind: action
  command: "Preset.RmvPresetFileRead()"
  params: []
- id: preset_save_all_presets
  label: Save All Presets
  kind: action
  command: "Preset.SaveAllPresets()"
  params: []
- id: preset_restore_all_presets
  label: Restore All Presets
  kind: action
  command: "Preset.RestoreAllPresets()"
  params: []
- id: preset_remove_preset_files
  label: Remove All Preset Files
  kind: action
  command: "Preset.RemovePresetFiles()"
  params: []

# ---- Additional documented input commands ----
- id: slot_in_list
  label: List Input
  kind: query
  command: "Slot{slot}.In{in}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_full_name
  label: Get Input Full Name
  kind: query
  command: "Slot{slot}.In{in}.FullName"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_status
  label: Get Input Status
  kind: query
  command: "Slot{slot}.In{in}.Status"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_alias
  label: Get/Set Input Alias
  kind: action
  command: "Slot{slot}.In{in}.Alias = {alias}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: alias, type: string}
- id: slot_in_window_list
  label: Get Input Window List
  kind: query
  command: "Slot{slot}.In{in}.WindowList"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_type_choice
  label: Get/Set Input Type Choice
  kind: action
  command: "Slot{slot}.In{in}.TypeChoice = {type}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: type, type: string, description: "DVI, RGBHV, RGsB, YUV, CV, YC; SDI"}
- id: slot_in_aspect_choice
  label: Get/Set Input Aspect Choice
  kind: action
  command: "Slot{slot}.In{in}.AspectChoice = {aspect}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: aspect, type: string, description: "16:9,4:3,5:4,16:10,5:3,1:1,16:6"}
- id: slot_in_brightness
  label: Get/Set Input Brightness
  kind: action
  command: "Slot{slot}.In{in}.Brightness = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: integer, description: "Valid range is from -30 to 30"}
- id: slot_in_contrast
  label: Get/Set Input Contrast
  kind: action
  command: "Slot{slot}.In{in}.Contrast = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: percentage, description: "Valid range is from 30% to 130%"}
- id: slot_in_colour_scale
  label: Get/Set Input Colour Scale
  kind: action
  command: "Slot{slot}.In{in}.ColourScale = {scale}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: scale, type: string, description: "Auto,Black,YUV,RGB,YUV_601,YUV_709"}
- id: slot_in_tpg
  label: Get/Set Input TPG
  kind: action
  command: "Slot{slot}.In{in}.TPG = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: string, description: "Off,TPG1"}
- id: slot_in_set_resolution
  label: Get Input Set Resolution
  kind: query
  command: "Slot{slot}.In{in}.Set_Resolution"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_resolution
  label: Get Input Measured Resolution
  kind: query
  command: "Slot{slot}.In{in}.Measured_Resolution"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_width
  label: Get Input Measured Width
  kind: query
  command: "Slot{slot}.In{in}.Measured_Width"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_height
  label: Get Input Measured Height
  kind: query
  command: "Slot{slot}.In{in}.Measured_Height"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_field_rate
  label: Get Input Measured Field Rate
  kind: query
  command: "Slot{slot}.In{in}.Measured_Field_Rate"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_vtotal
  label: Get Input Measured VTotal
  kind: query
  command: "Slot{slot}.In{in}.Measured_VTotal"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_measured_frame_ip
  label: Get Input Measured Frame Type
  kind: query
  command: "Slot{slot}.In{in}.Measured_Frame_ip"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_edid_filename
  label: Get/Set Input EDID Filename
  kind: action
  command: "Slot{slot}.In{in}.EDID_Filename = {filename}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: filename, type: string}
- id: slot_in_crop
  label: Get/Set Input Crop
  kind: action
  command: "Slot{slot}.In{in}.{Side}Crop = {pixels}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: Side, type: string, description: "Left|Right|Top|Bottom"}
    - {name: pixels, type: integer}
- id: slot_in_anh_offset
  label: Get/Set Input Analog Horizontal Offset
  kind: action
  command: "Slot{slot}.In{in}.AnH_Offset = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: integer, description: "Range from -100 to 100"}
- id: slot_in_anv_offset
  label: Get/Set Input Analog Vertical Offset
  kind: action
  command: "Slot{slot}.In{in}.AnV_Offset = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: integer, description: "Range from -100 to 100"}
- id: slot_in_source_loss_color
  label: Get/Set Input Source Loss Color
  kind: action
  command: "Slot{slot}.In{in}.OnSrcLossColor = {color}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: color, type: string, description: "Black,Blue,Red,Green,Yellow,Magenta,Cyan,White"}
- id: slot_in_hdcp_enabled
  label: Get/Set Input HDCP Enabled
  kind: action
  command: "Slot{slot}.In{in}.HDCP_Enabled = {value}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: value, type: string, description: "Supported,Off"}
- id: slot_in_hdcp_required
  label: Get Input HDCP Required
  kind: query
  command: "Slot{slot}.In{in}.HDCP_Required"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_hdmi
  label: Get Input HDMI Status
  kind: query
  command: "Slot{slot}.In{in}.HDMI"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_audio
  label: Get Input Audio Status
  kind: query
  command: "Slot{slot}.In{in}.Audio"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
- id: slot_in_audio_input
  label: Get Input Audio Channel
  kind: query
  command: "Slot{slot}.In{in}.AudIn{channel}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: channel, type: string, description: "A|B|C|D"}
- id: slot_in_afv_choice
  label: Get/Set Input AFV Choice
  kind: action
  command: "Slot{slot}.In{in}.AFVChoice{channel} = {source}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: channel, type: string, description: "A|B|C|D"}
    - {name: source, type: string, description: "Slot<n>.In<n>.AudIn<X>,NULL"}
- id: slot_in_view
  label: Get/Set Input View
  kind: action
  command: "Slot{slot}.In{in}.View = {view}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: view, type: string}
- id: slot_in_view_pos_code
  label: Get/Set Input View Position Code
  kind: action
  command: "Slot{slot}.In{in}.ViewPosCode = {code}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: code, type: integer}
- id: slot_in_audio_bars
  label: Get/Set Input Audio Bars
  kind: action
  command: "Slot{slot}.In{in}.AudioBars = {count}"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}
    - {name: count, type: integer, description: "0 to the number of audio channels"}
- id: slot_in_force_link_refresh
  label: Input Force Link Refresh
  kind: action
  command: "Slot{slot}.In{in}.ForceLinkRefresh()"
  params:
    - {name: slot, type: integer}
    - {name: in, type: integer}

# ---- Additional documented output commands ----
- id: slot_out_edge_blend_mode
  label: Get/Set Output Edge Blend Mode
  kind: action
  command: "Slot{slot}.Out{out}.EdgeBlend_Mode = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: UNRESOLVED}
- id: slot_out_outer_grid
  label: Get/Set Output Outer Grid
  kind: action
  command: "Slot{slot}.Out{out}.OuterGrid = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off"}
- id: slot_out_inner_grid
  label: Get/Set Output Inner Grid
  kind: action
  command: "Slot{slot}.Out{out}.InnerGrid = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off"}
- id: slot_out_layout
  label: Get/Set Output Layout
  kind: action
  command: "Slot{slot}.Out{out}.Layout = {layout}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: layout, type: string, description: UNRESOLVED}
- id: slot_out_width_in_layout
  label: Get/Set Output Width In Layout
  kind: action
  command: "Slot{slot}.Out{out}.WidthInLayout = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: integer, description: UNRESOLVED}
- id: slot_out_height_in_layout
  label: Get/Set Output Height In Layout
  kind: action
  command: "Slot{slot}.Out{out}.HeightInLayout = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: integer, description: UNRESOLVED}
- id: slot_out_layout_x_centre
  label: Get/Set Output Layout X Centre
  kind: action
  command: "Slot{slot}.Out{out}.LayoutXCentre = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: integer, description: UNRESOLVED}
- id: slot_out_layout_y_centre
  label: Get/Set Output Layout Y Centre
  kind: action
  command: "Slot{slot}.Out{out}.LayoutYCentre = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: integer, description: UNRESOLVED}
- id: slot_out_rotate_out_deg
  label: Get/Set Output Rotation
  kind: action
  command: "Slot{slot}.Out{out}.RotateOutDeg = {degrees}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: degrees, type: integer, description: UNRESOLVED}
- id: slot_out_hflip
  label: Get/Set Output Horizontal Flip
  kind: action
  command: "Slot{slot}.Out{out}.HFlip = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off"}
- id: slot_out_vflip
  label: Get/Set Output Vertical Flip
  kind: action
  command: "Slot{slot}.Out{out}.VFlip = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: "On/Off"}
- id: slot_out_projector_geometry
  label: Get/Set Output Projector Geometry
  kind: action
  command: "Slot{slot}.Out{out}.{Property} = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Property, type: string, description: "ProjectorWidthDeg|ProjectorHeightDeg|KeystoneXDeg|KeystoneYDeg"}
    - {name: value, type: number, description: UNRESOLVED}
- id: slot_out_warp_table_filename
  label: Get/Set Output Warp Table Filename
  kind: action
  command: "Slot{slot}.Out{out}.WarpTable_Filename = {filename}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: filename, type: string}
- id: slot_out_warp_table
  label: Get/Set Output Warp Table
  kind: action
  command: "Slot{slot}.Out{out}.WarpTable = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string, description: UNRESOLVED}
- id: slot_out_equipment
  label: Get/Set Output Equipment
  kind: action
  command: "Slot{slot}.Out{out}.Equipment = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: string}
- id: slot_out_physical_geometry
  label: Get/Set Output Physical Geometry
  kind: action
  command: "Slot{slot}.Out{out}.{Property} = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: Property, type: string, description: "PhysicalCenterX|PhysicalCenterY|PhysicalWidth|PhysicalHeight|PhysicalPixelWidth|PhysicalPixelHeight|PhysicalBezelTop|PhysicalBezelBottom|PhysicalBezelLeft|PhysicalBezelRight"}
    - {name: value, type: integer, description: UNRESOLVED}
- id: slot_out_drive_strength_boost
  label: Get/Set Output Drive Strength Boost
  kind: action
  command: "Slot{slot}.Out{out}.DriveStrengthBoost = {value}"
  params:
    - {name: slot, type: integer}
    - {name: out, type: integer}
    - {name: value, type: integer, description: "-127 to +127, defaults to 0"}
- id: slot_resolutions_list
  label: List Slot Resolutions
  kind: query
  command: "Slot{slot}.Resolutions"
  params:
    - {name: slot, type: integer}
- id: slot_resolution_list
  label: List Slot Resolution
  kind: query
  command: "Slot{slot}.Resolutions.Resolution{n}"
  params:
    - {name: slot, type: integer}
    - {name: n, type: integer, description: UNRESOLVED}
- id: slot_resolution_name
  label: Get Slot Resolution Name
  kind: query
  command: "Slot{slot}.Resolutions.Resolution{n}.Name"
  params:
    - {name: slot, type: integer}
    - {name: n, type: integer, description: UNRESOLVED}
- id: slot_resolution_aspect
  label: Get Slot Resolution Aspect
  kind: query
  command: "Slot{slot}.Resolutions.Resolution{n}.Aspect"
  params:
    - {name: slot, type: integer}
    - {name: n, type: integer, description: UNRESOLVED}

# ---- Additional documented system and routing commands ----
- id: coriomax_backplane_type
  label: Get Backplane Type
  kind: query
  command: "CORIOmax.Backplane_Type"
  params: []
- id: system_constraints
  label: Get System Constraints
  kind: query
  command: "System.Constraints"
  params: []
- id: system_menus
  label: List System Menus
  kind: query
  command: "System.Menus"
  params: []
- id: system_hdcp_status
  label: Get HDCP Status
  kind: query
  command: "System.HDCP_Status"
  params: []
- id: test_list
  label: List Test Commands
  kind: query
  command: "Test"
  params: []
- id: routing_windows_list
  label: List Routing Windows
  kind: query
  command: "Routing.Windows"
  params: []
- id: routing_canvases_list
  label: List Routing Canvases
  kind: query
  command: "Routing.Canvases"
  params: []
- id: routing_layouts_list
  label: List Routing Layouts
  kind: query
  command: "Routing.Layouts"
  params: []
- id: routing_monitor_views_list
  label: List Routing MonitorViews
  kind: query
  command: "Routing.MonitorViews"
  params: []
- id: routing_preset_list
  label: List Routing Preset
  kind: query
  command: "Routing.Preset"
  params: []
- id: routing_stbds_list
  label: List Routing Stbds
  kind: query
  command: "Routing.Stbds"
  params: []
- id: preset_canvas_read
  label: Get Preset Canvas
  kind: query
  command: "Preset.CanvasRead"
  params: []
- id: preset_duration_read
  label: Get Preset Duration
  kind: query
  command: "Preset.DurationRead"
  params: []
- id: preset_seqnum_read
  label: Get Preset SeqNum
  kind: query
  command: "Preset.SeqNumRead"
  params: []
- id: preset_flags_read
  label: Get Preset Flags
  kind: query
  command: "Preset.FlagsRead"
  params: []
```

## Feedbacks
```yaml
# Observable states returned by query commands and echoed back from setters.
- id: login_state
  type: string
  values: ["!Info : User {user} Logged In", "!Info : User {user} Logged Out"]
- id: output_status
  type: enum
  values: [UNKNOWN, OK, INVALID]
  query_command: "Slot{slot}.Out{out}.Status"
- id: output_hdmi_status
  type: enum
  values: [Found, Not_Found]
  query_command: "Slot{slot}.Out{out}.HDMI"
- id: output_audio_status
  type: enum
  values: [Found, Off]
  query_command: "Slot{slot}.Out{out}.Audio"
- id: output_hdcp_active
  type: enum
  values: [Active, Off]
  query_command: "Slot{slot}.Out{out}.HDCP_Active"
- id: output_genlock_status
  type: enum
  values: [Off, Locked]
  query_command: "Slot{slot}.Out{out}.Genlock"
- id: output_framelock_status
  type: enum
  values: [Off, Locked, Unlocked]
  query_command: "Slot{slot}.Out{out}.FramelockStatus"
- id: system_status
  type: enum
  values: [Serving, Busy]
  query_command: "System.Status"
- id: preset_valid
  type: enum
  values: ["Yes", "No"]
  query_command: "Preset.Valid"
- id: monitor_view_status
  type: enum
  values: [FREE, ALLOCATED, "IN USE", NULL]
  query_command: "View{n}.Status"
- id: command_ack
  type: string
  values: ["!Done <command>", "!Failed <command>"]
# UNRESOLVED: full enumeration of per-property echo formats not exhaustively listed.
```

## Variables
```yaml
# Settable parameters represented as continuous/ranged values (not discrete actions).
- id: output_brightness
  # Note: present on input modules; range -30 to 30. Documented for reference.
  type: integer
  min: -30
  max: 30
- id: output_contrast
  type: percentage
  min: 30
  max: 130
- id: output_gamma
  type: number
  min: 0.30
  max: 2.00
- id: output_scurve
  type: number
  min: 0.30
  max: 2.00
- id: headphone_volume
  type: integer
  min: 0
  max: 10
- id: fan_speed
  type: integer
  min: 3000
  max: 7000
- id: account_timeout
  type: integer
  min: 0
  max: 32767
# UNRESOLVED: additional output layout/warp parameters (Layout, HFlip, VFlip,
# RotateOutDeg, KeystoneX/YDeg, ProjectorWidthDeg/HeightDeg, WarpTable,
# Physical* geometry) appear in the source property dump but lack dedicated
# range documentation; not enumerated here.
```

## Events
```yaml
# Unsolicited notifications: format "!Event <category>, <event>, <optional text>".
# Subscribe with AddEvents(<category>); unsubscribe with RemoveEvents(<category>).
- id: hdmi_sink_attached
  category: HDMI
  event: SINK_ATTACHED
  example: "!Event HDMI,SINK_ATTACHED,s3.o1"
- id: hdmi_sink_unplugged
  category: HDMI
  event: SINK_UNPLUGGED
  example: "!Event HDMI,SINK_UNPLUGGED,s3.o1"
- id: preset_take_event
  category: PRESET
  event: TAKE
  example: "!Event PRESET,TAKE,1"
- id: preset_complete
  category: PRESET
  event: COMPLETE
  example: "!Event PRESET,COMPLETE,1"
- id: preset_save
  category: PRESET
  event: SAVE
  example: "!Event PRESET,SAVE,1"
- id: preset_remove
  category: PRESET
  event: REMOVE
  example: "!Event PRESET,REMOVE,1"
# Additional categories listed by ListAllEvents(): MEDIA_STORAGE (USB_HOTPLUG_ARRIVED,
# USB_HOTPLUG_REMOVED).
```

## Macros
```yaml
# StartBatch / EndBatch group write commands so their effects apply simultaneously;
# read commands still process immediately. Example:
#   StartBatch
#   Slot14.Out1.CutToBlack = On
#   Slot14.Out2.CutToBlack = On
#   EndBatch
# Preset.Take is itself a macro equivalent to Preset.Read + Preset.RestoreRead.
```

## Safety
```yaml
confirmation_required_for:
  # Commands explicitly flagged as risky / disruptive in the source.
  - System.Reset                    # reboots the device
  - System.RestoreAll               # Administrator only
  - System.ClearSavedSettings       # Administrator only
  - System.RestoreBackup            # Administrator only
  - System.Comms.RS232.Baudrate     # changing may drop comms
  - System.Comms.Ethernet.Enabled   # disabling via ethernet drops comms
  - System.Comms.Ethernet.IP_Address
  - System.Comms.Ethernet.Command_Port
  - System.Comms.Ethernet.RestartEthernet
  - System.Comms.Ethernet.Webserver_Enabled
  - EDID.S*.*.Remove_File
  - Slot*.PhaseRetrain
interlocks:
  - "Only ONE control connection (serial OR ethernet) at a time; concurrent connections are NOT supported."
  - "RestoreAll / ClearSavedSettings / RestoreBackup are Administrator-only."
  - "Account timeouts between 1 and 300 seconds are discouraged (may render system unusable); guest timeout fixed at 300."
  - "Security.Password fields are write-only and return <Restricted>; they cannot be read back."
  - "Ethernet setting changes only take effect after RestartEthernet() or save+reboot."
# UNRESOLVED: no explicit hardware power-on sequencing or external interlock
# procedure is described in the source beyond the warnings above.
```

## Notes
- Source is the system-wide "tvONE CORIOmatrix Commands Command-line Options" reference (document version 2.0.8, System API version 4.5+, firmware M405). The AK64 DVI-I monitoring 2-output module is one of the cards covered under the "DVI Output Module" section; commands are shared across the CORIOmax family.
- Default serial: 115200 8N1, no flow control. Default ethernet: 192.168.0.10:10001, subnet 255.255.255.0, gateway 192.168.0.1.
- Aliases shorten paths: `Slot3.In1` → `s3i1`, `Slot14.Out1` → `s14o1`, `Routing.Preset` → `Preset`. Routing command `S3I1 > S14O1` uses these aliases; long-hand equivalent is `slot3.in1 > slot14.out1`.
- Responses: `!Done <command>` on success, `!Failed <command>` on failure, `!Info`/`//` for progress/log lines, `!Event` for asynchronous notifications.
- DVI output module exposes additional layout/edge-blend/warp/geometry properties in its property dump (Layout, WidthInLayout, HeightInLayout, LayoutXCentre, LayoutYCentre, RotateOutDeg, HFlip, VFlip, EdgeBlend_Mode, OuterGrid, InnerGrid, ProjectorWidthDeg, ProjectorHeightDeg, KeystoneXDeg, KeystoneYDeg, WarpTable_Filename, WarpTable, PhysicalCenter*, PhysicalWidth/Height, PhysicalBezel*, DriveStrengthBoost) that are readable/settable but only partially documented with ranges.

<!-- UNRESOLVED: exact slot number hosting the AK64 card is installation-dependent; source uses Slot14 as the worked example for DVI output modules. -->
<!-- UNRESOLVED: full value ranges for layout/warp/geometry properties not stated in source. -->
<!-- UNRESOLVED: byte-level framing / line terminator for the serial protocol not specified in the refined source (ASCII line-based; exact terminator character not stated). -->
<!-- UNRESOLVED: firmware/protocol version compatibility ranges beyond M405/API 4.5 not stated. -->

## Provenance

```yaml
source_domains:
  - tvone.com
  - api.tvone.com
source_urls:
  - "https://tvone.com/filestore/Manuals-CORIO-Products/tvONE%20CORIOmatrix%20Commands-v2.0.8.pdf"
  - https://api.tvone.com/products/c3-series/c3-5xx/index.html
  - https://api.tvone.com/
retrieved_at: 2026-06-30T08:58:05.448Z
last_checked_at: 2026-10-07T22:06:30.004Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T22:06:30.004Z
matched_actions: 265
action_count: 265
confidence: medium
summary: "All 265 action units match source commands and transport values are supported; only 5 EDID read-only properties are unrepresented, within the 0.9 coverage floor. (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "EDID.S<n><X><n>.Width_mm"
- "EDID.S<n><X><n>.Height_mm"
- "EDID.S<n><X><n>.HorizBdr_pix"
- "EDID.S<n><X><n>.VertBdr_pix"
- "EDID.S<n><X><n>.Extensions"
- "the source is the system-wide CORIOmax command reference; slot population and exact module placement (which slot number hosts the AK64 card) is device-configuration dependent and not fixed by the source. Commands are presented in parameterized form (Slot<n>, Out<n>) per the source."
- "full enumeration of per-property echo formats not exhaustively listed."
- "additional output layout/warp parameters (Layout, HFlip, VFlip,"
- "no explicit hardware power-on sequencing or external interlock"
- "exact slot number hosting the AK64 card is installation-dependent; source uses Slot14 as the worked example for DVI output modules."
- "full value ranges for layout/warp/geometry properties not stated in source."
- "byte-level framing / line terminator for the serial protocol not specified in the refined source (ASCII line-based; exact terminator character not stated)."
- "firmware/protocol version compatibility ranges beyond M405/API 4.5 not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
