---
spec_id: admin/extron-dxp-hd-4k-plus-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DXP HD 4K PLUS Series Control Spec"
manufacturer: Extron
model_family: "DXP 42 HD 4K PLUS (60-1678-01)"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DXP 42 HD 4K PLUS (60-1678-01)"
    - "DXP 44 HD 4K PLUS (60-1493-01)"
    - "DXP 84 HD 4K PLUS (60-1494-01)"
    - "DXP 88 HD 4K PLUS (60-1495-01)"
    - "DXP 168 HD 4K PLUS (60-1496-01)"
    - "DXP 1616 HD 4K PLUS (60-1497-01)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manualslib.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2939-01_revQ.pdf
  - https://www.manualslib.com/manual/1797482/Extron-Electronics-Dxp-Hd-4k-Plus-Series.html
  - https://www.extron.com/download/
  - https://media.extron.com/public/download/files/userman/68-2939-01_A_DXPHD4KPLUS_user_guide.pdf
  - https://www.manua.ls/extron/dxp-hd-4k-plus/manual
retrieved_at: 2026-07-25T08:21:43.629Z
last_checked_at: 2026-10-07T13:30:43.248Z
generated_at: 2026-10-07T13:30:43.248Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source; per-model maximum input/output counts for tie commands are model-dependent and must be resolved per unit"
  - "populate from source, or remove section if not applicable"
  - "the source documents no confirmation interlock or safety procedure."
  - "SSH credential / key exchange details beyond port 22023 not stated in source"
  - "power supply voltage unit, fan RPM ranges, and temperature limits not stated (status query returns raw X2&, X2*, X2( values only)"
  - "CEC command opcode catalog beyond the DCEC/QCEC/PCEC/CCEC primitives not enumerated"
  - "USB Config port VID/PID and driver requirements not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:30:43.248Z
  matched_actions: 174
  action_count: 174
  confidence: medium
  summary: "All 174 action units match source SIS commands literally; transport port 23, 9600 8N1 and SSH 22023 supported; spec covers the source catalogue. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-25
---

# Extron DXP HD 4K PLUS Series Control Spec

## Summary
The Extron DXP HD 4K PLUS Series is a family of HDCP 2.x-compliant HDMI matrix switchers (4×2 through 16×16 with separate analog/S-PDIF audio breakout) controlled via Extron's Simple Instruction Set (SIS), an ASCII command language. This spec covers control over RS-232 (rear Remote port or front-panel USB Config port) and TCP/IP (Telnet on port 23, SSH on port 22023). The series supersedes the earlier DXP HD series and adds 4K UHD support.

<!-- UNRESOLVED: firmware version compatibility not stated in source; per-model maximum input/output counts for tie commands are model-dependent and must be resolved per unit -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: 23
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: UNRESOLVED  # source does not state flow control
auth:
  type: UNRESOLVED
  notes: >-
    The source describes password entry conditionally: a Password prompt appears
    if the switcher is password-protected; otherwise it accepts SIS commands after
    the copyright message. Factory-configured passwords for all accounts are set
    to the device serial number and are case-sensitive. A factory reset sets the
    passwords to no password. Whether a unit is password-protected by default is
    UNRESOLVED. Accepted login responds with "Login Administrator" or "Login User".
    SSH is available on port 22023; Telnet on port 23. Up to 200 simultaneous TCP
    connections permitted. Ethernet link idle timeout defaults to 5 minutes
    (configurable via port timeout SIS commands).
```

Additional transport notes (from source):

- Rear Remote RS-232 port: 3-pole 3.5 mm captive screw connector (Tx, Rx, G). Supported baud rates 300–115200; default 9600.
- Front panel Config port: USB mini-B; carries the same SIS command set plus PCS and firmware upload. Config and Remote ports may be active simultaneously.
- LAN port: RJ-45, 10/100 Mbps, half- or full-duplex.
- Default Ethernet: IP `192.168.254.254`, mask `255.255.0.0`, gateway `0.0.0.0`.
- Telnet local echo is off by default; use `set local_echo` at the Telnet prompt. Telnet must transmit LF only on `<ENTER>` (the `set crlf` command breaks SIS communication).
- Copyright banner is emitted on TCP/Telnet connect and after a power cycle on RS-232; contains model name, firmware version, part number, and date/time.

## Traits
```yaml
traits:
  - routable     # inferred from input/output tie commands
  - queryable    # inferred from extensive query command set
  - levelable    # inferred from volume and attenuation commands
```

## Actions
```yaml
- id: tie_hdmi_input_to_hdmi_and_audio_outputs
  label: "Tie HDMI input to HDMI and audio outputs"
  kind: action
  command: "X!*X@!"
  params: []

- id: tie_hdmi_input_to_hdmi_output
  label: "Tie HDMI input to HDMI output"
  kind: action
  command: "X!*X@%"
  params: []

- id: tie_hdmi_audio_input_to_audio_only_output_audio_output_2_only
  label: "Tie HDMI audio input to audio only output (audio output 2 only)"
  kind: action
  command: "X!*X@$"
  params: []

- id: tie_hdmi_input_to_all_hdmi_and_audio_outputs
  label: "Tie HDMI input to all HDMI and audio outputs"
  kind: action
  command: "X!*!"
  params: []

- id: tie_hdmi_input_to_all_hdmi_outputs
  label: "Tie HDMI input to all HDMI outputs"
  kind: action
  command: "X!*%"
  params: []

- id: tie_hdmi_audio_input_to_all_audio_only_outputs_audio_output_2_only
  label: "Tie HDMI audio input to all audio only outputs (audio output 2 only)"
  kind: action
  command: "X!*$"
  params: []

- id: multiple_ties
  label: "Multiple ties"
  kind: action
  command: "E+QX!*X@%...X!*X@!}"
  params: []

- id: view_hdmi_and_audio_output_tie
  label: "View HDMI and audio output tie"
  kind: action
  command: "X@!"
  params: []

- id: view_hdmi_output_tie
  label: "View HDMI output tie"
  kind: action
  command: "X@%"
  params: []

- id: view_audio_output_tie
  label: "View audio output tie"
  kind: action
  command: "X@$"
  params: []

- id: view_all_video_ties
  label: "View all video ties"
  kind: action
  command: "E0*1*1VC}"
  params: []

- id: view_all_audio_ties
  label: "View all audio ties"
  kind: action
  command: "E0*1*2VC}"
  params: []

- id: set_input_name
  label: "Set input name"
  kind: action
  command: "EX!,X$ NI}"
  params: []

- id: view_input_name
  label: "View input name"
  kind: action
  command: "EX! NI}"
  params: []

- id: set_hdcp_authorized_device_setting
  label: "Set HDCP Authorized device setting"
  kind: action
  command: "EEX!*X^ HDCP}"
  params: []

- id: view_hdcp_authorized_device_setting
  label: "View HDCP Authorized device setting"
  kind: action
  command: "EEX! HDCP}"
  params: []

- id: view_edid_in_hex
  label: "View EDID in Hex"
  kind: action
  command: "ERX! EDID}"
  params: []

- id: view_edid_native_resolution
  label: "View EDID native resolution"
  kind: action
  command: "ENX! EDID}"
  params: []

- id: import_edid
  label: "Import EDID"
  kind: action
  command: "EIX5@,X5# EDID}"
  params: []

- id: export_edid
  label: "Export EDID"
  kind: action
  command: "EEX5@,X5# EDID}"
  params: []

- id: set_output_name
  label: "Set output name"
  kind: action
  command: "EX@,X$ NO}"
  params: []

- id: view_output_name
  label: "View output name"
  kind: action
  command: "EX@ NO}"
  params: []

- id: set_output_format
  label: "Set output format"
  kind: action
  command: "EX@*X* VTPO}"
  params: []

- id: view_output_format
  label: "View output format"
  kind: action
  command: "EX@ VTPO}"
  params: []

- id: set_output_hdcp_mode_to_auto
  label: "Set output HDCP mode to Auto"
  kind: action
  command: "ESX@*0HDCP}"
  params: []

- id: set_output_hdcp_mode_to_on
  label: "Set output HDCP mode to On"
  kind: action
  command: "ESX@*1HDCP}"
  params: []

- id: view_hdcp_mode
  label: "View HDCP mode"
  kind: action
  command: "ESX@ HDCP}"
  params: []

- id: set_color_bit_depth
  label: "Set color bit depth"
  kind: action
  command: "EX@*X( BITD}"
  params: []

- id: view_color_bit_depth_setting
  label: "View color bit depth setting"
  kind: action
  command: "EX@ BITD}"
  params: []

- id: set_hdmi_video_mute
  label: "Set HDMI video mute"
  kind: action
  command: "X@*X1@ B"
  params: []

- id: set_hdmi_video_mute_to_all_outputs
  label: "Set HDMI video mute to all outputs"
  kind: action
  command: "X1@ *B"
  params: []

- id: view_all_output_mutes
  label: "View all output mutes"
  kind: action
  command: "EVM}"
  params: []

- id: pulse_5_v_on_hdmi_output
  label: "Pulse 5 V on HDMI output"
  kind: action
  command: "EPX@ HPLG}"
  params: []

- id: set_attenuation
  label: "Set attenuation"
  kind: action
  command: "X!*-X1% G"
  params: []

- id: decrease_attenuation
  label: "Decrease attenuation"
  kind: action
  command: "X!+G"
  params: []

- id: increase_attenuation
  label: "Increase attenuation"
  kind: action
  command: "X!-G"
  params: []

- id: view_attenuation
  label: "View attenuation"
  kind: action
  command: "X! G"
  params: []

- id: set_volume
  label: "Set volume"
  kind: action
  command: "X@*X1^ V"
  params: []

- id: increase_volume
  label: "Increase volume"
  kind: action
  command: "X@+V"
  params: []

- id: decrease_volume
  label: "Decrease volume"
  kind: action
  command: "X@-V"
  params: []

- id: view_volume_level
  label: "View volume level"
  kind: action
  command: "X@ V"
  params: []

- id: set_audio_mute
  label: "Set audio mute"
  kind: action
  command: "X@*X1# Z"
  params: []

- id: set_audio_mute_to_all
  label: "Set audio mute to all"
  kind: action
  command: "X# *Z"
  params: []

- id: save_global_preset
  label: "Save global preset"
  kind: action
  command: "X1&,"
  params: []

- id: recall_global_preset
  label: "Recall global preset"
  kind: action
  command: "X1&."
  params: []

- id: directly_write_global_preset
  label: "Directly write global preset"
  kind: action
  command: "E+X1& P X!*X@%...X!*X@%}"
  params: []

- id: view_global_hdmi_preset
  label: "View global HDMI preset"
  kind: action
  command: "EX1&*01*1VC}"
  params: []

- id: view_global_audio_preset
  label: "View global audio preset"
  kind: action
  command: "EX1&*01*2VC}"
  params: []

- id: set_global_preset_name
  label: "Set global preset name"
  kind: action
  command: "EX1&,X$ NG}"
  params: []

- id: view_global_preset_name
  label: "View global preset name"
  kind: action
  command: "EX1& NG}"
  params: []

- id: reset_all_global_presets
  label: "Reset all global presets"
  kind: action
  command: "EZG}"
  params: []

- id: reset_individual_preset
  label: "Reset individual preset"
  kind: action
  command: "EX1& ZG}"
  params: []

- id: set_room_outputs
  label: "Set room outputs"
  kind: action
  command: "EX1*,X@[1],X@[2]...X@[n] MR}"
  params: []

- id: view_room_outputs
  label: "View room outputs"
  kind: action
  command: "EX1* MR}"
  params: []

- id: set_room_name
  label: "Set room name"
  kind: action
  command: "EX1*,X$ NR}"
  params: []

- id: view_room_name
  label: "View room name"
  kind: action
  command: "EX1* NR}"
  params: []

- id: reset_room_map
  label: "Reset room map"
  kind: action
  command: "EZR}"
  params: []

- id: reset_individual_room
  label: "Reset individual room"
  kind: action
  command: "EX1* ZR}"
  params: []

- id: reset_all_room_presets
  label: "Reset all room presets"
  kind: action
  command: "EZP}"
  params: []

- id: set_front_panel_lockout_mode
  label: "Set Front Panel Lockout mode"
  kind: action
  command: "X2) X"
  params: []

- id: view_front_panel_lockout_mode
  label: "View Front Panel Lockout mode"
  kind: action
  command: "X"
  params: []

- id: reset_flash_memory_24
  label: "Reset flash memory [24]"
  kind: action
  command: "EZFFF}"
  params: []

- id: reset_all_device_settings_to_factory_default_24
  label: "Reset all device settings to factory default [24]"
  kind: action
  command: "EZXXX}"
  params: []

- id: absolute_system_reset_24
  label: "Absolute system reset [24]"
  kind: action
  command: "EZQQQ}"
  params: []

- id: ip_system_reset_dxp_42
  label: "IP system reset (DXP 42)"
  kind: action
  command: "E1ZQQQ}"
  params: []

- id: set_power_save_mode
  label: "Set power save mode"
  kind: action
  command: "EX2$ PSAV}"
  params: []

- id: set_power_save_mode_2
  label: "Set power save mode 2"
  kind: action
  command: "E2PSAV}"
  params: []

- id: set_power_save_mode_0
  label: "Set power save mode 0"
  kind: action
  command: "E0PSAV}"
  params: []

- id: view_power_save_mode
  label: "View power save mode"
  kind: action
  command: "EPSAV}"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "EX2# CV}"
  params: []

- id: view_verbose_mode
  label: "View verbose mode"
  kind: action
  command: "ECV}"
  params: []

- id: general_information
  label: "General information"
  kind: action
  command: "I"
  params: []

- id: view_model_name
  label: "View model name"
  kind: action
  command: "1I"
  params: []

- id: view_model_description
  label: "View model description"
  kind: action
  command: "2I"
  params: []

- id: view_part_number
  label: "View part number"
  kind: action
  command: "N"
  params: []

- id: view_serial_number
  label: "View serial number"
  kind: action
  command: "19i"
  params: []

- id: view_temperature
  label: "View temperature"
  kind: action
  command: "2S"
  params: []

- id: view_fan_speed
  label: "View fan speed"
  kind: action
  command: "3S"
  params: []

- id: view_detailed_firmware_version
  label: "View detailed firmware version"
  kind: action
  command: "0Q"
  params: []

- id: view_firmware_version
  label: "View firmware version"
  kind: action
  command: "Q"
  params: []

- id: view_firmware_and_build_version
  label: "View firmware and build version"
  kind: action
  command: "*Q"
  params: []

- id: set_dhcp_mode_24
  label: "Set DHCP mode [24]"
  kind: action
  command: "EX# DH}"
  params: []

- id: view_dhcp_mode
  label: "View DHCP mode"
  kind: action
  command: "EDH}"
  params: []

- id: set_ip_address_24
  label: "Set IP address [24]"
  kind: action
  command: "EX3) CI}"
  params: []

- id: view_ip_address
  label: "View IP address"
  kind: action
  command: "ECI}"
  params: []

- id: set_subnet_mask_24
  label: "Set subnet mask [24]"
  kind: action
  command: "EX3! CS}"
  params: []

- id: view_subnet_mask
  label: "View subnet mask"
  kind: action
  command: "ECS}"
  params: []

- id: set_gateway_ip_address_24
  label: "Set gateway IP address [24]"
  kind: action
  command: "EX3@ CG}"
  params: []

- id: view_gateway_ip_address
  label: "View gateway IP address"
  kind: action
  command: "ECG}"
  params: []

- id: view_mac_address
  label: "View MAC address"
  kind: action
  command: "ECH}"
  params: []

- id: view_number_of_open_connections
  label: "View number of open connections"
  kind: action
  command: "ECC}"
  params: []

- id: set_current_port_timeout
  label: "Set current port timeout"
  kind: action
  command: "E0*X3% TC}"
  params: []

- id: view_current_port_timeout
  label: "View current port timeout"
  kind: action
  command: "E0TC}"
  params: []

- id: set_global_ip_port_timeout
  label: "Set global IP port timeout"
  kind: action
  command: "E1*X3% TC}"
  params: []

- id: view_global_ip_port_timeout
  label: "View global IP port timeout"
  kind: action
  command: "E1TC}"
  params: []

- id: set_device_name_24
  label: "Set device name [24]"
  kind: action
  command: "EX3^ CN}"
  params: []

- id: view_device_name
  label: "View device name"
  kind: action
  command: "ECN}"
  params: []

- id: set_date_and_time
  label: "Set date and time"
  kind: action
  command: "EX3& CT}"
  params: []

- id: view_date_and_time
  label: "View date and time"
  kind: action
  command: "ECT}"
  params: []

- id: view_gmt_offset
  label: "View GMT offset"
  kind: action
  command: "ECZ}"
  params: []

- id: set_time_zone
  label: "Set time zone"
  kind: action
  command: "EX4)*TZON}"
  params: []

- id: view_time_zone
  label: "View time zone"
  kind: action
  command: "ETZON}"
  params: []

- id: view_available_time_zones
  label: "View available time zones"
  kind: action
  command: "E*TZON}"
  params: []

- id: set_administrator_password
  label: "Set administrator password"
  kind: action
  command: "EX4@ CA}"
  params: []

- id: clear_administrator_password
  label: "Clear administrator password"
  kind: action
  command: "E• CA}"
  params: []

- id: view_administrator_password
  label: "View administrator password"
  kind: action
  command: "ECA}"
  params: []

- id: set_user_password
  label: "Set user password"
  kind: action
  command: "EX4@ CU}"
  params: []

- id: clear_user_password
  label: "Clear user password"
  kind: action
  command: "E• CU}"
  params: []

- id: view_user_password
  label: "View user password"
  kind: action
  command: "ECU}"
  params: []

- id: set_serial_port_parameters
  label: "Set serial port parameters"
  kind: action
  command: "EX4%*X4^,X4&,X4*,X4( CP}"
  params: []

- id: view_serial_port_parameters
  label: "View serial port parameters"
  kind: action
  command: "EX4% CP}"
  params: []

- id: set_the_mkp_mode
  label: "Set the MKP mode"
  kind: action
  command: "EX5$ SVOL}"
  params: []

- id: view_the_mkp_mode
  label: "View the MKP mode"
  kind: action
  command: "ESVOL}"
  params: []

- id: tie_hdmi_input_to_hdmi_video_and_audio_outputs
  label: "Tie HDMI input to HDMI video and audio outputs"
  kind: action
  command: "X!*X@!"
  params: []

- id: switch_video_only_default
  label: "Switch video only (default)"
  kind: action
  command: "E0AMOD}"
  params: []

- id: switch_video_and_audio
  label: "Switch video and audio"
  kind: action
  command: "E1AMOD}"
  params: []

- id: view_the_front_panel_audio_tie_mode
  label: "View the front panel audio tie mode"
  kind: action
  command: "EAMOD}"
  params: []

- id: set_hdcp_authorization_for_an_input
  label: "Set HDCP authorization for an input"
  kind: action
  command: "EEX!*X^ HDCP}"
  params: []

- id: view_hdcp_authorization_setting_for_an_input
  label: "View HDCP authorization setting for an input"
  kind: action
  command: "EEX! HDCP}"
  params: []

- id: set_hdcp_authorization_for_all_inputs
  label: "Set HDCP authorization for all inputs"
  kind: action
  command: "EEX^ *HDCP}"
  params: []

- id: view_hdcp_authorization_for_all_inputs
  label: "View HDCP authorization for all inputs"
  kind: action
  command: "EEHDCP}"
  params: []

- id: import_edid_to_user_slot
  label: "Import EDID to user slot"
  kind: action
  command: "EIX5@,X5# EDID}"
  params: []

- id: export_edid_in_binary_format
  label: "Export EDID in binary format"
  kind: action
  command: "EEX5@,X5# EDID}"
  params: []

- id: set_output_hdcp_mode_to_none
  label: "Set output HDCP mode to None"
  kind: action
  command: "ESX@*2HDCP}"
  params: []

- id: set_video_color_bit_depth_for_an_output
  label: "Set video color bit depth for an output"
  kind: action
  command: "EX@*X( BITD}"
  params: []

- id: view_color_bit_depth_for_an_output
  label: "View color bit depth for an output"
  kind: action
  command: "EX@ BITD}"
  params: []

- id: view_color_bit_depth_for_all_outputs
  label: "View color bit depth for all outputs"
  kind: action
  command: "EBITD}"
  params: []

- id: mute_video_to_black_on_an_output
  label: "Mute video to black on an output"
  kind: action
  command: "X@*1B"
  params: []

- id: mute_video_and_sync_on_an_output
  label: "Mute video and sync on an output"
  kind: action
  command: "X@*2B"
  params: []

- id: unmute_video_and_sync_on_an_output
  label: "Unmute video and sync on an output"
  kind: action
  command: "X@*0B"
  params: []

- id: set_video_mute_for_all_outputs
  label: "Set video mute for all outputs"
  kind: action
  command: "X1@ *B"
  params: []

- id: unmute_all_video_and_sync
  label: "Unmute all video and sync"
  kind: action
  command: "0*B"
  params: []

- id: view_all_video_output_mutes
  label: "View all video output mutes"
  kind: action
  command: "EVM}"
  params: []

- id: set_audio_mute_of_an_output
  label: "Set audio mute of an output"
  kind: action
  command: "X@*X1# Z"
  params: []

- id: unmute_audio_of_an_output
  label: "Unmute audio of an output"
  kind: action
  command: "X@*0Z"
  params: []

- id: audio_mute_all_outputs_1_and_2
  label: "Audio mute all (outputs 1 and 2)"
  kind: action
  command: "X1# Z"
  params: []

- id: audio_unmute_all_outputs_1_and_2
  label: "Audio unmute all (outputs 1 and 2)"
  kind: action
  command: "0Z"
  params: []

- id: set_volume_of_an_output
  label: "Set volume of an output"
  kind: action
  command: "X@*X1^ V"
  params: []

- id: set_device_name_to_default
  label: "Set device name to default"
  kind: action
  command: "E• CN}"
  params: []

- id: ip_system_reset
  label: "IP system reset"
  kind: action
  command: "E1ZQQQ}"
  params: []

- id: set_dns_server_address
  label: "Set DNS server address"
  kind: action
  command: "EX3) DI}"
  params: []

- id: view_dns_server_address
  label: "View DNS server address"
  kind: action
  command: "EDI}"
  params: []

- id: enable_or_disable_one_input_cec
  label: "Enable or disable one input CEC"
  kind: action
  command: "EIX!*X10! CCEC}"
  params: []

- id: enable_or_disable_all_inputs_cec
  label: "Enable or disable all inputs CEC"
  kind: action
  command: "EIX10! *CCEC}"
  params: []

- id: enable_or_disable_one_output_cec
  label: "Enable or disable one output CEC"
  kind: action
  command: "EOX@*X10! CCEC}"
  params: []

- id: enable_or_disable_all_outputs_cec
  label: "Enable or disable all outputs CEC"
  kind: action
  command: "EOX10! *CCEC}"
  params: []

- id: send_cec_data_to_output_downstream_sink
  label: "Send CEC data to Output (downstream sink)"
  kind: action
  command: "EOX@*X10% DCEC}` or `EOX@*X10( DCEC}"
  params: []

- id: send_cec_data_to_output_downstream_sink_2
  label: "Send CEC data to Output (downstream sink)"
  kind: action
  command: "EOX@*15*X10% DCEC}"
  params: []
  # Alternative documented form: EOX[X@]*15*[X10(] DCEC [}]

- id: list_cec_device_presence
  label: "List CEC device presence"
  kind: action
  command: "ELQCEC}"
  params: []

- id: rediscover_device_on_output
  label: "Rediscover device on output"
  kind: action
  command: "EOX@ QCEC}"
  params: []

- id: report_physical_address_of_output
  label: "Report physical address of output"
  kind: action
  command: "EOX@ PCEC}"
  params: []

- id: save_room_preset
  label: "Save room preset"
  kind: action
  command: "X1**X1(,"
  params: []

- id: recall_room_preset
  label: "Recall room preset"
  kind: action
  command: "X1**X1(."
  params: []

- id: directly_write_room_preset
  label: "Directly write room preset"
  kind: action
  command: "E+X1**X1( P X!*X@%...X!*X@%}"
  params: []

- id: view_room_hdmi_preset
  label: "View room HDMI preset"
  kind: action
  command: "EX1**X1(*01*1VC}"
  params: []

- id: view_room_audio_preset
  label: "View room audio preset"
  kind: action
  command: "EX1**X1(*01*2VC}"
  params: []

- id: set_room_preset_name
  label: "Set room preset name"
  kind: action
  command: "EX1**X1(,X$ NP}"
  params: []

- id: view_room_preset_name
  label: "View room preset name"
  kind: action
  command: "EX1**X1( NP}"
  params: []

- id: reset_individual_room_preset
  label: "Reset individual room preset"
  kind: action
  command: "EX1**X1( ZP}"
  params: []
```

## Feedbacks
```yaml
- id: view_input_hdcp_status
  label: "View input HDCP status"
  kind: query
  query_command: "EIX! HDCP}"

- id: view_all_input_hdcp_status
  label: "View all input HDCP status"
  kind: query
  query_command: "EIHDCP}"

- id: view_output_hdcp_status
  label: "View output HDCP status"
  kind: query
  query_command: "EOX@ HDCP}"

- id: view_all_outputs_hdcp_status
  label: "View all outputs HDCP status"
  kind: query
  query_command: "EOHDCP}"

- id: view_hdmi_video_mute_status
  label: "View HDMI video mute status"
  kind: query
  query_command: "X@ B"

- id: view_audio_mute_status
  label: "View audio mute status"
  kind: query
  query_command: "X@ Z"

- id: view_video_signal_presence_status
  label: "View video signal presence status"
  kind: query
  query_command: "0LS"

- id: view_matrix_status
  label: "View matrix status"
  kind: query
  query_command: "S"

- id: view_power_supply_status
  label: "View power supply status"
  kind: query
  query_command: "1S"

- id: view_signal_status_for_all_inputs_and_outputs
  label: "View signal status for all inputs and outputs"
  kind: query
  query_command: "0LS"

- id: view_video_mute_status_for_an_output
  label: "View video mute status for an output"
  kind: query
  query_command: "X@ B"

- id: view_audio_mute_status_of_an_output
  label: "View audio mute status of an output"
  kind: query
  query_command: "X@*Z"

- id: view_all_audio_mute_status_outputs_1_and_2
  label: "View all audio mute status (outputs 1 and 2)"
  kind: query
  query_command: "Z"

- id: view_input_cec_status
  label: "View input CEC status"
  kind: query
  query_command: "EIX! CCEC}"

- id: view_output_cec_status
  label: "View output CEC status"
  kind: query
  query_command: "EOX@ CCEC}"
```

## Variables
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Events
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Macros
```yaml
# UNRESOLVED: populate from source, or remove section if not applicable
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: the source documents no confirmation interlock or safety procedure.
# Reset effects differ: EZFFF} clears flash memory; EZXXX} resets settings except
# the unit name; EZQQQ} resets all settings, including DHCP and IP settings, and
# removes current passwords. The source does not state that EZFFF} or EZXXX}
# removes passwords or clears IP/DHCP settings.
```

## Notes

**Command framing.** SIS commands are bare ASCII — no start-of-message delimiter. Responses terminate with CR/LF (shown as `]` in the source). Some commands end with `}` (CR only) or `|` (CR, no LF) for streaming/multi-tie entries. The Escape key (shown as `E`) prefixes extended commands. Commands may be concatenated back-to-back with no spaces.

**Symbol substitution.** The source uses placeholder sigils (`X!`, `X@`, `X#`, `X$`, … `X11)`) for parameterized fields. Each sigil maps to a typed value (input number, output number, mute state, IP address, EDID slot, CEC address byte, etc.). Ranges are model-dependent — e.g. `X@` (output number) is 1–2 on DXP 42, 1–4 on DXP 44/84, 1–8 on DXP 88/168, 1–16 on DXP 1616. Verbose modes 2 and 3 add a tag prefix to view responses (e.g. `Vmt X@*X1@]`).

**Verbose modes.**
- `0` — none (default for LAN)
- `1` — verbose: unsolicited change notices emitted (default for RS-232 / USB)
- `2` — tagged responses to queries only
- `3` — verbose + tagged

**Error codes.** `E01` invalid input, `E10` invalid command, `E11` invalid preset, `E12` invalid output, `E13` invalid parameter, `E14` not valid for this configuration, `E17` invalid command for signal type, `E18` timeout, `E21` invalid room, `E22` busy, `E24` privilege violation (admin-only command), `E25` device not present, `E26` max connections exceeded, `E27` invalid event, `E28` bad filename / not found.

**Unsolicited device-initiated messages.** `Qik]` (front-panel tie), `Rpr X1&]` / `Spr X1&]` (preset recall/save), `Vmt X@*X1@]` / `Amt X@*X1#]` (mute toggle), `Exe X2)]` (FP lockout toggle), `HplgO X@]` (output hot-plug), `Reconfig]` (input frequency change), `]Password:` (auth prompt), and CEC async frames `Ceco X@*X11)X10( * X10^]` in bidirectional CEC mode 4.

**EDID memory slots.** Per-model: input slots are user-populated via PCS with default file `EXN_HDMI_1080p60_2Ch.bin`; output slots are auto-populated from the attached sink's EDID. Slot count scales with matrix size (e.g. DXP 1616: slots 1–16 inputs, 17–32 outputs; DXP 42: 4 input slots, 2 output slots).

**Front Panel Lockout (Executive Mode).** `X2)` = 0 unlock, 1 full lockout, 2 tie/preset only (default).

**Power save.** Mode 0 normal (default); mode 1 limited (IP/USB/RS-232 live, fans slowed, recoverable from front panel, SIS `E0PSAV}`, PCS, or power cycle); mode 2 deeper (front panel dead, only view commands and `E0PSAV}` respond, recoverable only via `E0PSAV}`, PCS, or power cycle).

**DXP 42 differences.** The DXP 42 has a distinct command subset: separate output-HDCP "None" mode, audio mute all (outputs 1 and 2 only), an explicit "set device name to default" command, a DNS server SIS pair (`DI`), and no global preset / room commands.

<!-- UNRESOLVED: SSH credential / key exchange details beyond port 22023 not stated in source -->
<!-- UNRESOLVED: power supply voltage unit, fan RPM ranges, and temperature limits not stated (status query returns raw X2&, X2*, X2( values only) -->
<!-- UNRESOLVED: CEC command opcode catalog beyond the DCEC/QCEC/PCEC/CCEC primitives not enumerated -->
<!-- UNRESOLVED: USB Config port VID/PID and driver requirements not stated -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manualslib.com
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2939-01_revQ.pdf
  - https://www.manualslib.com/manual/1797482/Extron-Electronics-Dxp-Hd-4k-Plus-Series.html
  - https://www.extron.com/download/
  - https://media.extron.com/public/download/files/userman/68-2939-01_A_DXPHD4KPLUS_user_guide.pdf
  - https://www.manua.ls/extron/dxp-hd-4k-plus/manual
retrieved_at: 2026-07-25T08:21:43.629Z
last_checked_at: 2026-10-07T13:30:43.248Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:30:43.248Z
matched_actions: 174
action_count: 174
confidence: medium
summary: "All 174 action units match source SIS commands literally; transport port 23, 9600 8N1 and SSH 22023 supported; spec covers the source catalogue. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source; per-model maximum input/output counts for tie commands are model-dependent and must be resolved per unit"
- "populate from source, or remove section if not applicable"
- "the source documents no confirmation interlock or safety procedure."
- "SSH credential / key exchange details beyond port 22023 not stated in source"
- "power supply voltage unit, fan RPM ranges, and temperature limits not stated (status query returns raw X2&, X2*, X2( values only)"
- "CEC command opcode catalog beyond the DCEC/QCEC/PCEC/CCEC primitives not enumerated"
- "USB Config port VID/PID and driver requirements not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
