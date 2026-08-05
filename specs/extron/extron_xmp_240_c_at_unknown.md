---
spec_id: admin/extron-xmp-240-c-at
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron XMP 240 C AT Control Spec"
manufacturer: Extron
model_family: "XMP 240 C AT"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "XMP 240 C AT"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manuals.plus
  - manualmachine.com
  - manuals.co.uk
source_urls:
  - https://media.extron.com/public/download/files/userman/XMP_240_68-3434-01_revC.pdf
  - https://www.extron.com/download/files/userman/XMP_240_68-3434-01_revC.pdf
  - https://manuals.plus/m/0d209a7084d92ca30f0e6a1b144b5be34ffbecb20656eae7a2a3ca45a35d6e37.pdf
  - https://manualmachine.com/extron/xmp240cat/17898020-user-manual/
  - "https://www.manuals.co.uk/extron/xmp-240/manual?p=1"
retrieved_at: 2026-07-26T13:31:55.891Z
last_checked_at: 2026-08-05T08:23:30.992Z
generated_at: 2026-08-05T08:23:30.992Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated in source."
  - "USB transport is documented as a host control port but no AI4AV protocol enum exists for it; handled in Notes only."
  - "firmware version compatibility not stated in source."
  - "absolute max number of simultaneous Telnet/socket connections not numerically stated (E26 implies a cap exists)."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:23:30.992Z
  matched_actions: 178
  action_count: 178
  confidence: medium
  summary: "All 178 spec actions match source SIS command-table rows verbatim; transport (38400/8/N/1, port 23, password) is supported; coverage is bidirectional. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-26
---

# Extron XMP 240 C AT Control Spec

## Summary
The Extron XMP 240 C AT is a Dante Audio DSP Matrix Processor with AEC (acoustic echo cancellation). This spec covers control of the device via the Extron Simple Instruction Set (SIS) over three host interfaces: a rear-panel RS-232 serial port, a Telnet (TCP) connection over Ethernet, and a front-panel USB mini-B configuration port. SIS command behavior is identical across serial, Telnet, and USB. The unit additionally exposes an internal HTTP web page for monitoring and limited adjustment. DSP functions controllable via SIS include per-block gain and mute (flex inputs, pre/post-mixer, virtual returns, outputs), 64 group masters with soft limits, 64 presets, metering, automixer gate monitoring, signal-level monitoring (SLM), Dante passthrough to remote AXI endpoints, macros, and full IP/network/SNMP/NTP configuration.

<!-- UNRESOLVED: firmware version compatibility range not stated in source. -->
<!-- UNRESOLVED: USB transport is documented as a host control port but no AI4AV protocol enum exists for it; handled in Notes only. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 38400        # stated: 38400 default; higher than most other Extron products
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23                # stated: default Telnet (TCP) port; remappable via SIS (>=1024 or 0 to disable)
  # Web (HTTP) interface default port 80 is also stated in source; remappable via SIS.
auth:
  type: password          # stated: Telnet/web login requires admin or user password
  # Default password = device serial number; after a factory reset the password reverts to "extron".
  # RS-232/USB sessions are not gated by the Telnet/web login prompt per source.
```

**Connection / login notes (from source):**
- RS-232: 3-pole 3.5 mm captive screw connector labeled `REMOTE Tx Rx G`; bidirectional ±5 V. Host must be set to 38400 baud.
- TCP: open a socket to the unit's IP address on port 23. On connect the device emits a copyright banner (model, firmware version `V n.nn`, part number `60-nnnn-nn`, date/time), optionally followed by a `Password` prompt.
- Accepted credentials yield `Login Administrator` or `Login User` (11 = User, 12 = Administrator). If the admin and user passwords match, administrator privilege is granted.
- Default IP: `192.168.254.254`, subnet `255.255.255.0`, gateway `0.0.0.0`, DHCP off (factory).
- Ethernet idle timeout default = 5 minutes (configurable). Extron recommends periodic `Q` (Query) keepalives.
- Verbose/response modes 0–3 control whether query responses are untagged (modes 0/1) or tagged (modes 2/3) and whether change notifications are emitted on Telnet (modes 1/3). Dante passthrough commands require mode 2/3.
- USB mini-B (front panel) is a configuration/control port; once connected the unit responds to SIS identically to serial/Telnet.

## Traits
```yaml
traits:
  - queryable   # inferred: numerous query commands (firmware, part number, gain, mute, meters, macro status, etc.)
  - levelable   # inferred: gain/attenuation, faders, group masters, soft limits, meters in 0.1 dB steps
  - routable    # inferred: mix-point crosspoint gain OIDs form the input->output + virtual-send mix matrices
```

## Actions
```yaml
- id: general_information_advanced
  label: "General Information (Advanced)"
  kind: action
  command: "E X56^ I"
  params: []

- id: verbose_mode_2_3
  label: "Verbose mode 2/3"
  kind: action
  command: "Inf X56^ *"
  params: []

- id: verbose_mode_2_3_2
  label: "Verbose mode 2/3"
  kind: action
  command: "Ver01*"
  params: []

- id: verbose_mode_2_3_3
  label: "Verbose mode 2/3"
  kind: action
  command: "Bld"
  params: []

- id: verbose_mode_2_3_4
  label: "Verbose mode 2/3"
  kind: action
  command: "Ver X4% *"
  params: []

- id: verbose_mode_2_3_5
  label: "Verbose mode 2/3"
  kind: action
  command: "P"
  params: []

- id: set_current_connected_port_timeout
  label: "Set current connected port timeout"
  kind: action
  command: "E 0* X6( TC }"
  params: []

- id: view_current_connected_port_timeout
  label: "View current connected port timeout"
  kind: action
  command: "E 0TC }"
  params: []

- id: set_global_ip_port_timeout
  label: "Set global IP port timeout"
  kind: action
  command: "E 1* X6( TC }"
  params: []

- id: view_global_ip_port_timeout
  label: "View global IP port timeout"
  kind: action
  command: "E 1TC }"
  params: []

- id: configure_parameters
  label: "Configure parameters"
  kind: action
  command: "E 1* X2% , X2^ , X2& , X2* CP }"
  params: []

- id: view_parameters
  label: "View parameters"
  kind: action
  command: "E 1CP }"
  params: []

- id: view_mode
  label: "View mode"
  kind: action
  command: "E 1CY }"
  params: []

- id: configure_flow_control
  label: "Configure flow control"
  kind: action
  command: "E 1* X3) , X3! CF }"
  params: []

- id: view_flow_control
  label: "View flow control"
  kind: action
  command: "E 1CF }"
  params: []

- id: set_unit_name
  label: "Set unit name"
  kind: action
  command: "E X1@ CN }"
  params: []

- id: set_unit_name_to_factory_default
  label: "Set unit name to factory default"
  kind: action
  command: "E• CN }"
  params: []

- id: view_unit_name
  label: "View unit name"
  kind: action
  command: "E CN }"
  params: []

- id: set_date_time
  label: "Set date/time"
  kind: action
  command: "E X1# CT }"
  params: []

- id: view_date_time
  label: "View date/time"
  kind: action
  command: "E CT }"
  params: []

- id: view_date_time_in_hex
  label: "View date/time in hex"
  kind: action
  command: "E *CT }"
  params: []

- id: view_gmt_offset
  label: "View GMT offset"
  kind: action
  command: "E CZ }"
  params: []

- id: set_dhcp_on
  label: "Set DHCP on"
  kind: action
  command: "E 1DH }"
  params: []

- id: set_dhcp_off
  label: "Set DHCP off"
  kind: action
  command: "E 0DH }"
  params: []

- id: view_dhcp_mode
  label: "View DHCP mode"
  kind: action
  command: "E DH }"
  params: []

- id: set_ip_address
  label: "Set IP address"
  kind: action
  command: "E X1$ CI }"
  params: []

- id: view_ip_address
  label: "View IP address"
  kind: action
  command: "E CI }"
  params: []

- id: view_hardware_address_mac
  label: "View hardware address (MAC)"
  kind: action
  command: "E CH }"
  params: []

- id: set_subnet_mask
  label: "Set subnet mask"
  kind: action
  command: "E X33# CS }"
  params: []

- id: view_subnet_mask
  label: "View subnet mask"
  kind: action
  command: "E CS }"
  params: []

- id: set_gateway_ip_address
  label: "Set gateway IP address"
  kind: action
  command: "E X1$ CG }"
  params: []

- id: view_gateway_ip_address
  label: "View gateway IP address"
  kind: action
  command: "E CG }"
  params: []

- id: set_ip
  label: "Set IP"
  kind: action
  command: "E X57^ * X1$ CISG }"
  params: []

- id: set_ip_subnet
  label: "Set IP/subnet"
  kind: action
  command: "E X57^ * X1$ / X57& CISG }"
  params: []

- id: set_ip_subnet_gateway
  label: "Set IP/subnet/gateway"
  kind: action
  command: "E X57^ * X1$ * X33# * X1$ CISG }"
  params: []

- id: set_ip_subnet_gateway_all
  label: "Set IP/subnet/gateway (all)"
  kind: action
  command: "E X57^ * X1$ / X57& * X1$ CISG }"
  params: []

- id: view_ip_subnet_gateway
  label: "View IP/subnet/gateway"
  kind: action
  command: "E X57^ CISG }"
  params: []

- id: set_dns_server_ip_address
  label: "Set DNS server IP address"
  kind: action
  command: "E X1$ DI }"
  params: []

- id: view_dns_server_ip_address
  label: "View DNS server IP address"
  kind: action
  command: "E DI }"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "E X2@ CV }"
  params: []

- id: view_verbose_mode
  label: "View Verbose mode"
  kind: action
  command: "E CV }"
  params: []

- id: set_admin_password
  label: "Set admin password"
  kind: action
  command: "E X3# CA }"
  params: []

- id: clear_admin_password
  label: "Clear admin password"
  kind: action
  command: "E• CA }"
  params: []

- id: view_admin_password
  label: "View admin password"
  kind: action
  command: "E CA }"
  params: []

- id: set_user_password
  label: "Set user password"
  kind: action
  command: "E X3# CU }"
  params: []

- id: clear_user_password
  label: "Clear user password"
  kind: action
  command: "E• CU }"
  params: []

- id: view_user_password
  label: "View user password"
  kind: action
  command: "E CU }"
  params: []

- id: change_create_directory
  label: "Change/Create directory"
  kind: action
  command: "E path/directory/CJ }"
  params: []

- id: back_to_root_directory
  label: "Back to root directory"
  kind: action
  command: "E /CJ }"
  params: []

- id: up_one_directory
  label: "Up one directory"
  kind: action
  command: "E ..CJ }"
  params: []

- id: view_current_directory
  label: "View current directory"
  kind: action
  command: "E CJ }"
  params: []

- id: erase_user_supplied_web_page_file
  label: "Erase user-supplied web page/file"
  kind: action
  command: "E Filename EF }"
  params: []

- id: erase_current_directory_and_contained_files
  label: "Erase current directory and contained files"
  kind: action
  command: "E /EF }"
  params: []

- id: erase_current_directory_and_subdirectories
  label: "Erase current directory and subdirectories"
  kind: action
  command: "E //EF }"
  params: []

- id: list_files_from_current_directory
  label: "List files from current directory"
  kind: action
  command: "E DF }"
  params: []

- id: list_files_from_current_directory_and_below
  label: "List files from current directory and below"
  kind: action
  command: "E LF }"
  params: []

- id: load_file_to_user_flash_memory
  label: "Load file to user flash memory"
  kind: action
  command: "E +UF filesize , filename }"
  params: []

- id: retrieve_file_from_user_flash_memory
  label: "Retrieve file from user flash memory"
  kind: action
  command: "E filename SF }"
  params: []

- id: save_device_configuration_to_file_system
  label: "Save device configuration (to file system)"
  kind: action
  command: "E 1* {config type} XF }"
  params: []

- id: restore_device_configuration
  label: "Restore device configuration"
  kind: action
  command: "E 0* {config type} XF }"
  params: []

- id: enable_ntp_to_set_the_time
  label: "Enable NTP to set the time"
  kind: action
  command: "E 1NTEN }"
  params: []

- id: disable_ntp
  label: "Disable NTP"
  kind: action
  command: "E 0NTEN }"
  params: []

- id: sync_ntp_now
  label: "Sync NTP now"
  kind: action
  command: "E 2NTEN }"
  params: []

- id: set_ntp_ip_address
  label: "Set NTP IP address"
  kind: action
  command: "E X1$ NTIP }"
  params: []

- id: reset_ntp_ip_address
  label: "Reset NTP IP address"
  kind: action
  command: "E• NTIP }"
  params: []

- id: view_ntp_ip_address
  label: "View NTP IP address"
  kind: action
  command: "E NTIP }"
  params: []

- id: set_ntp_port_map
  label: "Set NTP port map"
  kind: action
  command: "E N {port#} PMAP }"
  params: []

- id: reset_ntp_port_map
  label: "Reset NTP port map"
  kind: action
  command: "E N123PMAP }"
  params: []

- id: disable_ntp_port
  label: "Disable NTP port"
  kind: action
  command: "E N0PMAP }"
  params: []

- id: view_ntp_port_map
  label: "View NTP port map"
  kind: action
  command: "E NPMAP }"
  params: []

- id: set_telnet_port_map
  label: "Set telnet port map"
  kind: action
  command: "E X9# MT }"
  params: []

- id: reset_telnet_port_map
  label: "Reset telnet port map"
  kind: action
  command: "E 23MT }"
  params: []

- id: disable_telnet_port
  label: "Disable telnet port"
  kind: action
  command: "E 0MT }"
  params: []

- id: view_telnet_port_map
  label: "View telnet port map"
  kind: action
  command: "E MT }"
  params: []

- id: set_web_port_map
  label: "Set web port map"
  kind: action
  command: "E X9# MH }"
  params: []

- id: reset_web_port_map
  label: "Reset web port map"
  kind: action
  command: "E 80MH }"
  params: []

- id: disable_web_port_map
  label: "Disable web port map"
  kind: action
  command: "E 0MH }"
  params: []

- id: view_web_port_map
  label: "View web port map"
  kind: action
  command: "E MH }"
  params: []

- id: set_snmp_port_map
  label: "Set SNMP port map"
  kind: action
  command: "E A X9# PMAP }"
  params: []

- id: reset_snmp_port_map
  label: "Reset SNMP port map"
  kind: action
  command: "E A161PMAP }"
  params: []

- id: disable_snmp_port
  label: "Disable SNMP port"
  kind: action
  command: "E A0PMAP }"
  params: []

- id: view_snmp_port_map
  label: "View SNMP port map"
  kind: action
  command: "E APMAP }"
  params: []

- id: set_ssh_port_map
  label: "Set SSH port map"
  kind: action
  command: "E B X9# PMAP }"
  params: []

- id: reset_ssh_port_map
  label: "Reset SSH port map"
  kind: action
  command: "E B22023PMAP }"
  params: []

- id: disable_ssh_port
  label: "Disable SSH port"
  kind: action
  command: "E B0PMAP }"
  params: []

- id: view_ssh_port_map
  label: "View SSH port map"
  kind: action
  command: "E BPMAP }"
  params: []

- id: set_ssl_port_map
  label: "Set SSL port map"
  kind: action
  command: "E S X9# PMAP }"
  params: []

- id: reset_ssl_port_map
  label: "Reset SSL port map"
  kind: action
  command: "E S443PMAP }"
  params: []

- id: disable_ssl_port
  label: "Disable SSL port"
  kind: action
  command: "E S0PMAP }"
  params: []

- id: view_ssl_port_map
  label: "View SSL port map"
  kind: action
  command: "E SPMAP }"
  params: []

- id: set_unit_contact
  label: "Set unit contact"
  kind: action
  command: "E C X58! SNMP }"
  params: []

- id: set_unit_contact_to_default
  label: "Set unit contact to default"
  kind: action
  command: "E C • SNMP }"
  params: []

- id: view_unit_contact
  label: "View unit contact"
  kind: action
  command: "E CSNMP }"
  params: []

- id: set_unit_location
  label: "Set unit location"
  kind: action
  command: "E L X58! SNMP }"
  params: []

- id: set_unit_location_to_default
  label: "Set unit location to default"
  kind: action
  command: "E L • SNMP }"
  params: []

- id: view_unit_location
  label: "View unit location"
  kind: action
  command: "E LSNMP }"
  params: []

- id: set_community_public_to_default
  label: "Set community public to default"
  kind: action
  command: "E P • SNMP }"
  params: []

- id: view_community_public
  label: "View community public"
  kind: action
  command: "E PSNMP }"
  params: []

- id: enable_snmp_access_and_traps
  label: "Enable SNMP access and traps"
  kind: action
  command: "E E1SNMP }"
  params: []

- id: disable_snmp_access_and_traps
  label: "Disable SNMP access and traps"
  kind: action
  command: "E E0SNMP }"
  params: []

- id: view_snmp_access_setting
  label: "View SNMP access setting"
  kind: action
  command: "E ESNMP }"
  params: []

- id: reboot_system
  label: "Reboot system"
  kind: action
  command: "E 1BOOT }"
  params: []

- id: reboot_network
  label: "Reboot network"
  kind: action
  command: "E 2BOOT }"
  params: []

- id: execute_test
  label: "Execute test"
  kind: action
  command: "E {address/name} PING }"
  params: []

- id: set_time_zone
  label: "Set time zone"
  kind: action
  command: "E {zone name} *TZON }"
  params: []

- id: view_current_time_zone
  label: "View current time zone"
  kind: action
  command: "E TZON }"
  params: []

- id: list_all_time_zones
  label: "List all time zones"
  kind: action
  command: "E *TZON }"
  params: []

- id: view_eeprom_parameters
  label: "View EEPROM Parameters"
  kind: action
  command: "E NVPR }"
  params: []

- id: write_exp_input_name
  label: "Write EXP input name"
  kind: action
  command: "E X9( , X@ NE }"
  params: []

- id: write_output_name
  label: "Write output name"
  kind: action
  command: "E X9* , X@ NX }"
  params: []

- id: write_preset_name
  label: "Write preset name"
  kind: action
  command: "E X% , X$ NG }"
  params: []

- id: view_exp_input_name
  label: "View EXP input name"
  kind: action
  command: "E X9( NE }"
  params: []

- id: view_output_name
  label: "View output name"
  kind: action
  command: "E X9* NX }"
  params: []

- id: view_preset_name
  label: "View preset name"
  kind: action
  command: "E X% NG }"
  params: []

- id: recall_preset
  label: "Recall Preset"
  kind: action
  command: "X% ."
  params: []

- id: reset_presets_and_names
  label: "Reset presets and names"
  kind: action
  command: "E ZG }"
  params: []

- id: reset_individual_preset
  label: "Reset individual preset"
  kind: action
  command: "E X# ZG }"
  params: []

- id: system_reset_factory_default
  label: "System reset (factory default)"
  kind: action
  command: "E ZXXX }"
  params: []

- id: reset_flash_file_system
  label: "Reset flash file system"
  kind: action
  command: "E ZFFF }"
  params: []

- id: absolute_reset_including_ip_settings
  label: "Absolute reset including IP settings"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: reset_all_device_settings_and_delete_files
  label: "Reset all device settings and delete files"
  kind: action
  command: "E ZY }"
  params: []

- id: run_macro
  label: "Run macro"
  kind: action
  command: "E R X6* MCRO }"
  params: []

- id: kill_macro
  label: "Kill macro"
  kind: action
  command: "E K X6* MCRO }"
  params: []

- id: set_macro_name
  label: "Set macro name"
  kind: action
  command: "E A X6* * X7! MCRO }"
  params: []

- id: set_power_on_macro
  label: "Set power-on macro"
  kind: action
  command: "E P X6* MCRO }"
  params: []

- id: enable_remote_connection_for_listening
  label: "Enable remote connection for listening"
  kind: action
  command: "E C X17& * X22@ EXPR }"
  params: []

- id: send_command_to_remote_device
  label: "Send command to remote device"
  kind: action
  command: "{dante@ X17& : X19* }"
  params: []

- id: set_gain_level
  label: "Set gain level"
  kind: action
  command: "E G X7@ * X7# AU }"
  params: []

- id: example_1_input_1
  label: "Example 1 (input 1)"
  kind: action
  command: "E H40000*120AU }"
  params: []

- id: example_2_pre_mixer_gain_1
  label: "Example 2 (pre-mixer gain 1)"
  kind: action
  command: "E G40100*-8AU }"
  params: []

- id: example_1_input_1_2
  label: "Example 1 (input 1)"
  kind: action
  command: "E H40000AU }"
  params: []

- id: example_2_post_mixer_gain_1
  label: "Example 2 (post-mixer gain 1)"
  kind: action
  command: "E G60100AU }"
  params: []

- id: audio_mute
  label: "Audio mute"
  kind: action
  command: "E M X7@ *1AU }"
  params: []

- id: audio_unmute
  label: "Audio unmute"
  kind: action
  command: "E M X7@ *0AU }"
  params: []

- id: set_a_group_fader_value
  label: "Set a group fader value"
  kind: action
  command: "E D X7% * X7^ GRPM }"
  params: []

- id: example
  label: "Example"
  kind: action
  command: "E D2*-239GRPM }"
  params: []

- id: increment_a_group_fader_value
  label: "Increment a group fader value"
  kind: action
  command: "E D X7% * X7&+GRPM }"
  params: []

- id: example_2
  label: "Example"
  kind: action
  command: "E D2*30+GRPM }"
  params: []

- id: decrement_a_group_fader_value
  label: "Decrement a group fader value"
  kind: action
  command: "E D X7% * X7&-GRPM }"
  params: []

- id: view_the_group_fader_value
  label: "View the group fader value"
  kind: action
  command: "E D X7% GRPM }"
  params: []

- id: mute_a_group
  label: "Mute a group"
  kind: action
  command: "E D X7% *1 GRPM }"
  params: []

- id: unmute_a_group
  label: "Unmute a group"
  kind: action
  command: "E D X7% *0 GRPM }"
  params: []

- id: view_a_group_mute_value
  label: "View a group mute value"
  kind: action
  command: "E D X7% GRPM }"
  params: []

- id: set_soft_limits
  label: "Set soft limits"
  kind: action
  command: "E L X7% * X7*upper * X7*lower GRPM }"
  params: []

- id: example_3
  label: "Example"
  kind: action
  command: "E L2*60*-60GRPM }"
  params: []

- id: view_soft_limits
  label: "View soft limits"
  kind: action
  command: "E L X7% GRPM }"
  params: []

- id: view_group_type
  label: "View group type"
  kind: action
  command: "E P X7% GRPM }"
  params: []

- id: view_group_members
  label: "View group members"
  kind: action
  command: "E O X7% GRPM }"
  params: []

- id: enable_meter_updates
  label: "Enable meter updates"
  kind: action
  command: "E V X7@ * X8* AU }"
  params: []

- id: set_global_unsolicited_meter_response_rate
  label: "Set Global Unsolicited Meter Response Rate"
  kind: action
  command: "E R X17% GRPU }"
  params: []

- id: view_global_unsolicited_meter_response_rate
  label: "View Global Unsolicited Meter Response Rate"
  kind: action
  command: "E R GRPU }"
  params: []

- id: set_unsolicited_meter_group
  label: "Set Unsolicited Meter Group"
  kind: action
  command: "E G X17^ GRPU }"
  params: []

- id: view_unsolicited_meter_group
  label: "View Unsolicited Meter Group"
  kind: action
  command: "E G GRPU }"
  params: []

- id: view_oid_members_in_meter_group
  label: "View OID Members in Meter Group"
  kind: action
  command: "E O X7% GRPM }"
  params: []

- id: enable_meters_in_meter_group
  label: "Enable Meters in Meter Group"
  kind: action
  command: "E D X7% *1 GRPM }"
  params: []

- id: disable_meters_in_meter_group
  label: "Disable Meters in Meter Group"
  kind: action
  command: "E D X7% *0 GRPM }"
  params: []
```

## Feedbacks
```yaml
- id: query_firmware_version
  label: "Query Firmware Version"
  kind: query
  query_command: "Q"

- id: query_firmware_version_with_build
  label: "Query Firmware Version (with build)"
  kind: query
  query_command: "*Q"

- id: query_firmware_version_advanced
  label: "Query Firmware Version (Advanced)"
  kind: query
  query_command: "X4% Q"

- id: query_part_number
  label: "Query Part Number"
  kind: query
  query_command: "N"

- id: get_connection_listing
  label: "Get connection listing"
  kind: query
  query_command: "E CC }"

- id: query_sessions_security_level
  label: "Query session's security level"
  kind: query
  query_command: "E CK }"

- id: view_ntp_status
  label: "View NTP status"
  kind: query
  query_command: "E NTEN }"

- id: set_community_public_read_only
  label: "Set community public (read-only)"
  kind: query
  query_command: "E P X58! SNMP }"

- id: get_temperature
  label: "Get temperature"
  kind: query
  query_command: "E 20STAT }"

- id: get_macro_status
  label: "Get macro status"
  kind: query
  query_command: "E S X6* MCRO }"

- id: get_macro_name
  label: "Get macro name"
  kind: query
  query_command: "E A X6* MCRO }"

- id: get_power_on_macro
  label: "Get power-on macro"
  kind: query
  query_command: "E PMCRO }"

- id: query_available_remote_devices
  label: "Query available remote devices"
  kind: query
  query_command: "E AEXPR }"

- id: read_remote_connection_listening_status
  label: "Read remote connection listening status"
  kind: query
  query_command: "E C X17& EXPR }"

- id: query_remote_devices_being_listened_to
  label: "Query remote devices being listened to"
  kind: query
  query_command: "E LEXPR }"

- id: read_gain_level
  label: "Read gain level"
  kind: query
  query_command: "E G X7@ AU }"

- id: mute_status
  label: "Mute status"
  kind: query
  query_command: "E M X7@ AU }"

- id: read_meter_level
  label: "Read meter level"
  kind: query
  query_command: "E V X7@ AU }"

- id: get_current_automixer_gate_status
  label: "Get current automixer gate status"
  kind: query
  query_command: "E J X7@ AU }"

- id: unsolicited_automixer_gate_status_update
  label: "Unsolicited automixer gate status update"
  kind: query
  query_command: "(enabled by selecting the Automix dialog Monitor Gate checkbox)"

- id: set_slm_status
  label: "Set SLM status"
  kind: query
  query_command: "E J X17@ * X9$ AU }"

- id: get_current_threshold_status
  label: "Get current threshold status"
  kind: query
  query_command: "E J X17@ AU }"
```

## Variables
```yaml
# No discrete settable parameters beyond those represented as Actions/Feedbacks above.
# Gain/fader values, presets, soft limits, group membership, and meter groups are all
# driven by the SIS commands enumerated in the Actions section.
```

## Events
```yaml
# Unsolicited device messages documented in the source (covered by the deterministic
# feedback/event extraction): device-initiated boot/copyright banner, password prompt,
# macro lifecycle (McroSTARTED / FINISHED / FAILED / KILLED), unsolicited automixer
# gate updates, SLM threshold-crossing meter values, and unsolicited meter-group value
# streams (verbose modes 1/3). Verbose mode 1/3 also relays SIS change notices from
# other sockets.
```

## Macros
```yaml
# The device supports up to 64 user macros (run/kill/status/name) and a single power-on
# macro assignment, all addressable via the SIS macro commands in the Actions section.
# No explicit multi-step macro content is enumerated in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No explicit safety interlock or power-sequencing procedures are described for SIS
# control. The source documents only physical RESET-button modes (factory boot code,
# network-settings reset, full factory reset, DHCP toggle) which are maintenance
# operations, not control interlocks. All reset modes close every IP/Telnet/socket
# connection. See Notes.
```

## Notes
- SIS framing: responses terminate with CR/LF (`]`). A soft carriage return (no LF) is `}` or `|`. The Escape key is `E` or `W`. `*` is a command character, not a variable. SIS commands are case-insensitive unless noted. Spaces in command/response tables are for readability; only a `•` denotes a required space.
- Default serial speed is 38400 baud — deliberately higher than most Extron products; the host PC / control system must match.
- Gain encoding: dB in 0.1 dB steps with a 10x multiplier (`+10.0 dB` = `100`, `-3.4 dB` = `-34`). Group-fader responses are always 5 digits. Out-of-range or beyond-soft-limit fader values return `E13`.
- Per-block gain ranges (from source): mic/line digital input `-18..+24 dB`; pre-mixer and virtual return `-100..+12 dB`; post-mixer trim `-12..+12 dB` (cannot be muted); output attenuation `-100..0 dB`. Use the `H` parameter (not `G`) when setting/reading digital input gain.
- Mix-point / matrix OIDs: input gain 40000–40047, pre-mixer 40100–40147, virtual return pre-mixer 53000/50101–50115, output attenuation 60000–60047, output post-mixer trim 60100–60147. Crosspoint mix-points span the 20xxx–26xxx range (flex-input and virtual-return sources into AT outputs and virtual sends).
- Error codes: E10 unrecognized command, E12 invalid port, E13 invalid parameter, E14 not valid for this configuration, E17 invalid command for signal type, E18 timeout, E22 busy, E24 privilege violation, E25 device not present, E26 max connections exceeded, E27 invalid event number, E28 bad filename / not found.
- Dante passthrough: the XMP can listen for and forward SIS commands to Extron AXI 02 AT / AXI 22 AT / AXI 44 AT endpoints. Requires verbose mode 2/3. Command form `{dante@<device>:<SIS> | }`; the XMP tags responses with the remote device name.
- Reset modes (physical, not SIS): hold RESET on power-on = run factory boot code for one cycle; RESET held to 2 blinks + repress = reset network settings (IP/subnet/gateway to defaults, DHCP off); RESET held to 3 blinks + repress = full factory reset (unity gains, unmuted outputs, DSP cleared, preset/group/macro memory cleared); 5 quick RESET presses = toggle DHCP client (firmware >= 1.01.0003). All reset modes tear down IP/Telnet/socket sessions.
- Rejected name/password/filename characters: `~ , @ = ' [ ] { } < > \` " ; : \ ?` (space allowed in names).

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->
<!-- UNRESOLVED: absolute max number of simultaneous Telnet/socket connections not numerically stated (E26 implies a cap exists). -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manuals.plus
  - manualmachine.com
  - manuals.co.uk
source_urls:
  - https://media.extron.com/public/download/files/userman/XMP_240_68-3434-01_revC.pdf
  - https://www.extron.com/download/files/userman/XMP_240_68-3434-01_revC.pdf
  - https://manuals.plus/m/0d209a7084d92ca30f0e6a1b144b5be34ffbecb20656eae7a2a3ca45a35d6e37.pdf
  - https://manualmachine.com/extron/xmp240cat/17898020-user-manual/
  - "https://www.manuals.co.uk/extron/xmp-240/manual?p=1"
retrieved_at: 2026-07-26T13:31:55.891Z
last_checked_at: 2026-08-05T08:23:30.992Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:23:30.992Z
matched_actions: 178
action_count: 178
confidence: medium
summary: "All 178 spec actions match source SIS command-table rows verbatim; transport (38400/8/N/1, port 23, password) is supported; coverage is bidirectional. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated in source."
- "USB transport is documented as a host control port but no AI4AV protocol enum exists for it; handled in Notes only."
- "firmware version compatibility not stated in source."
- "absolute max number of simultaneous Telnet/socket connections not numerically stated (E26 implies a cap exists)."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
