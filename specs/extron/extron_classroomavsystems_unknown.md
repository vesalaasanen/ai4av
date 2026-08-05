---
spec_id: admin/extron-pvs-407d
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron PVS 407D Control Spec"
manufacturer: Extron
model_family: "PVS 407D"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "PVS 407D"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/PVS_407D_68-2776-01_J.pdf
  - https://www.extron.com/download/files/userman/PVS_407D_68-2776-50_D.pdf
  - https://www.extron.com
retrieved_at: 2026-07-10T19:48:32.457Z
last_checked_at: 2026-07-12T08:59:04.771Z
generated_at: 2026-07-12T08:59:04.771Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility ranges not stated in source beyond feature-specific notes (2.00+ for 4K/UHD, 5.00+ for GVCCS audio streaming)"
  - "firmware version compatibility ranges beyond feature-specific notes (2.00+, 5.00+)"
  - "maximum number of concurrent TCP/IP connections not stated (E26 implies a limit exists)"
  - "RS-232 control port is a 3.5mm captive screw 3-pole connector (Tx, Rx, G) — wiring documented but connector spec not beyond that"
verification:
  verdict: verified
  checked_at: 2026-07-12T08:59:04.771Z
  matched_actions: 153
  action_count: 153
  confidence: medium
  summary: "Every one of the 153 spec action/feedback commands matches a literal SIS command row in the source with correct shape, and every source command-table row is represented in the spec; transport params match exactly. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-10
---

# Extron PVS 407D Control Spec

## Summary
The Extron PVS 407D is a PoleVault Digital Switcher with Ethernet Control designed for classroom AV systems. It provides 7-input video and audio switching with HDMI/HDBaseT outputs, EDID Minder, HDCP management, integrated VoiceLift Pro microphone system support, and audio DSP features including feedback suppression and paging. Control is via Extron Simple Instruction Set (SIS) over RS-232 (9600 baud, 8N1) or Ethernet (Telnet port 23).

<!-- UNRESOLVED: firmware version compatibility ranges not stated in source beyond feature-specific notes (2.00+ for 4K/UHD, 5.00+ for GVCCS audio streaming) -->

## Transport
```yaml
protocols:
  - serial
  - tcp
serial:
  baud_rate: 9600
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
addressing:
  port: 23  # default Telnet port; Pass-Thru port 2003 also documented
auth:
  type: password
  # Source describes Password: prompt requiring administrator or user level password.
  # Factory configured passwords = device serial number. After complete system reset,
  # passwords revert to default = no password. Passwords are case-sensitive.
  # Default admin ID: admin; default user ID: user.
```

## Traits
```yaml
traits:
  - routable    # inferred: input selection commands (X! selects input 1-7)
  - queryable   # inferred: extensive query commands (input, volume, status, EDID, HDCP, etc.)
  - levelable   # inferred: volume control (set/increment/decrement), pixel phase, picture adjustment
```

## Actions
```yaml
- id: select_an_input
  label: "Select an input"
  kind: action
  command: "X!"
  params: []

- id: view_current_input
  label: "View current input"
  kind: action
  command: "!"
  params: []

- id: disable_tmds_clock
  label: "Disable TMDS clock"
  kind: action
  command: "1B"
  params: []

- id: unmute_output_video
  label: "Unmute output video"
  kind: action
  command: "0B"
  params: []

- id: mute_output_audio
  label: "Mute output audio"
  kind: action
  command: "1Z"
  params: []

- id: unmute_output_audio
  label: "Unmute output audio"
  kind: action
  command: "0Z"
  params: []

- id: set_input_audio_mute
  label: "Set input audio mute"
  kind: action
  command: "EX$ * X@ IMUT }"
  params: []

- id: set_specific_volume
  label: "Set specific volume"
  kind: action
  command: "X3% V"
  params: []

- id: increment
  label: "Increment"
  kind: action
  command: "+V"
  params: []

- id: decrement
  label: "Decrement"
  kind: action
  command: "-V"
  params: []

- id: view_volume
  label: "View volume"
  kind: action
  command: "V"
  params: []

- id: enable_locked_mode
  label: "Enable locked mode"
  kind: action
  command: "1X"
  params: []

- id: disable_locked_mode
  label: "Disable locked mode"
  kind: action
  command: "0X"
  params: []

- id: disable_power_save
  label: "Disable power save"
  kind: action
  command: "E 0PSAV }"
  params: []

- id: enable_auto_power_save
  label: "Enable auto power save"
  kind: action
  command: "E 1PSAV }"
  params: []

- id: force_auto_power_save_on
  label: "Force auto power save on"
  kind: action
  command: "E 2PSAV }"
  params: []

- id: force_standby_power_save_on
  label: "Force standby power save on"
  kind: action
  command: "E 3PSAV }"
  params: []

- id: force_network_standby_power_save_on
  label: "Force network standby power save on"
  kind: action
  command: "E 4PSAV }"
  params: []

- id: view_setting
  label: "View setting"
  kind: action
  command: "E PSAV }"
  params: []

- id: view_video_signal_presence
  label: "View video signal presence"
  kind: action
  command: "E LS }"
  params: []

- id: view_detected_audio_format
  label: "View detected audio format"
  kind: action
  command: "E 40STAT }"
  params: []

- id: view_pvs_407_d_serial_number
  label: "View PVS 407D serial number"
  kind: action
  command: "19I"
  params: []

- id: view_pvt_wallplate_type
  label: "View PVT wallplate type"
  kind: action
  command: "35I"
  params: []

- id: view_both_link_statuses
  label: "View both LINK statuses"
  kind: action
  command: "38I"
  params: []

- id: view_audio_mute_to_dsp
  label: "View audio mute to DSP"
  kind: action
  command: "40S"
  params: []

- id: assign_edid_to_input
  label: "Assign EDID to input"
  kind: action
  command: "E A X^ * X1* EDID }"
  params: []

- id: view_assigned_edid
  label: "View assigned EDID"
  kind: action
  command: "E A X^ EDID }"
  params: []

- id: save_display_edid_to_custom_slot
  label: "Save display EDID to custom slot"
  kind: action
  command: "E S X1* EDID }"
  params: []

- id: view_edid_native_resolution
  label: "View EDID native resolution"
  kind: action
  command: "E N X^ EDID }"
  params: []

- id: import_edid_to_user_slot
  label: "Import EDID to user slot"
  kind: action
  command: "E I X1* , < filename >EDID }"
  params: []

- id: upload_file_to_unit
  label: "Upload file to unit"
  kind: action
  command: "E +UF size , < filename > }"
  params: []

- id: export_edid_file
  label: "Export EDID file"
  kind: action
  command: "E E X1* , < filename >EDID }"
  params: []

- id: send_file_from_unit_to_pc
  label: "Send file from unit to PC"
  kind: action
  command: "E < filename >SF }"
  params: []

- id: view_input_hdcp
  label: "View input HDCP"
  kind: action
  command: "E I X^ HDCP }"
  params: []

- id: view_output_hdcp
  label: "View output HDCP"
  kind: action
  command: "E OHDCP }"
  params: []

- id: enable_hdcp_encryption
  label: "Enable HDCP encryption"
  kind: action
  command: "E E X^ *1HDCP }"
  params: []

- id: disable_hdcp_encryption
  label: "Disable HDCP encryption"
  kind: action
  command: "E E X^ *0HDCP }"
  params: []

- id: set_output_sync_mode
  label: "Set output sync mode"
  kind: action
  command: "E M X1% SSAV }"
  params: []

- id: view_output_sync_mode
  label: "View output sync mode"
  kind: action
  command: "E MSSAV }"
  params: []

- id: play_an_audio_file
  label: "Play an audio file"
  kind: action
  command: "EX2% * X3^ * X2^ * X2* PLAY }"
  params: []

- id: stop_abort_playback
  label: "Stop (abort) playback"
  kind: action
  command: "E 0PLAY }"
  params: []

- id: set_pixel_phase_value
  label: "Set pixel phase value"
  kind: action
  command: "EX2( * X3) PHAS }"
  params: []

- id: increment_pixel_phase_value
  label: "Increment pixel phase value"
  kind: action
  command: "EX2( +PHAS }"
  params: []

- id: decrement_pixel_phase_value
  label: "Decrement pixel phase value"
  kind: action
  command: "EX2( -PHAS }"
  params: []

- id: view_pixel_phase_value
  label: "View pixel phase value"
  kind: action
  command: "EX2( PHAS }"
  params: []

- id: set_total_pixel_value
  label: "Set total pixel value"
  kind: action
  command: "EX2( * X3! TPIX }"
  params: []

- id: increment_total_pixel_value
  label: "Increment total pixel value"
  kind: action
  command: "EX2( +TPIX }"
  params: []

- id: decrement_total_pixel_value
  label: "Decrement total pixel value"
  kind: action
  command: "EX2( -TPIX }"
  params: []

- id: view_total_pixel_value
  label: "View total pixel value"
  kind: action
  command: "EX2( TPIX }"
  params: []

- id: set_horizontal_start_value
  label: "Set horizontal start value"
  kind: action
  command: "EX2( * X3@ HSRT }"
  params: []

- id: increment_horizontal_start_value
  label: "Increment horizontal start value"
  kind: action
  command: "EX2( +HSRT }"
  params: []

- id: decrement_horizontal_start_value
  label: "Decrement horizontal start value"
  kind: action
  command: "EX2( -HSRT }"
  params: []

- id: view_horizontal_start_value
  label: "View horizontal start value"
  kind: action
  command: "EX2( HSRT }"
  params: []

- id: set_vertical_start_value
  label: "Set vertical start value"
  kind: action
  command: "EX2( * X3# VSRT }"
  params: []

- id: increment_vertical_start_value
  label: "Increment vertical start value"
  kind: action
  command: "EX2( +VSRT }"
  params: []

- id: decrement_vertical_start_value
  label: "Decrement vertical start value"
  kind: action
  command: "EX2( -VSRT }"
  params: []

- id: view_vertical_start_value
  label: "View vertical start value"
  kind: action
  command: "EX2( VSRT }"
  params: []

- id: view_microphone_usage_hours
  label: "View microphone usage (hours)"
  kind: action
  command: "E USAG }"
  params: []

- id: reset_microphone_usage
  label: "Reset microphone usage"
  kind: action
  command: "E 0USAG }"
  params: []

- id: initiate_pairing
  label: "Initiate pairing"
  kind: action
  command: "E 1PAIR }"
  params: []

- id: clear_pairing
  label: "Clear pairing"
  kind: action
  command: "E 0PAIR }"
  params: []

- id: view_pairing
  label: "View pairing"
  kind: action
  command: "E PAIR }"
  params: []

- id: set_audible_chime
  label: "Set audible chime"
  kind: action
  command: "EX3& CHIM }"
  params: []

- id: view_audible_chime
  label: "View audible chime"
  kind: action
  command: "E CHIM }"
  params: []

- id: absolute_system_reset,_but_retains_microphone_pairing
  label: "Absolute System Reset, but retains microphone pairing"
  kind: action
  command: "E v1*0RSTD }"
  params: []

- id: absolute_system_reset
  label: "Absolute System Reset"
  kind: action
  command: "E v1*1RSTD }"
  params: []

- id: reboot_device
  label: "Reboot Device"
  kind: action
  command: "E v1*9RSTD }"
  params: []

- id: set_feedback_suppressor
  label: "Set feedback suppressor"
  kind: action
  command: "EX4# FSEN }"
  params: []

- id: view_feedback_suppressor
  label: "View feedback suppressor"
  kind: action
  command: "E FSEN }"
  params: []

- id: set_line_output_to_variable
  label: "Set Line output to variable"
  kind: action
  command: "55*1#"
  params: []

- id: set_line_output_to_fixed
  label: "Set Line output to fixed"
  kind: action
  command: "55*2#"
  params: []

- id: view_line_output_mode
  label: "View Line output mode"
  kind: action
  command: "55#"
  params: []

- id: set_voice_lift_output_mode
  label: "Set VoiceLift Output mode"
  kind: action
  command: "EX@ AMOD }"
  params: []

- id: view_voice_lift_output_mode
  label: "View VoiceLift Output mode"
  kind: action
  command: "E AMOD }"
  params: []

- id: set_audio_output_mode_to_dual_mono
  label: "Set audio output mode to dual mono"
  kind: action
  command: "18*1#"
  params: []

- id: set_audio_output_mode_to_stereo
  label: "Set audio output mode to stereo"
  kind: action
  command: "18*2#"
  params: []

- id: view_audio_output_mode
  label: "View audio output mode"
  kind: action
  command: "18#"
  params: []

- id: set_paging_sensor_hold_time
  label: "Set Paging Sensor hold time"
  kind: action
  command: "75*X#"
  params: []

- id: view_paging_sensor_hold_time
  label: "View Paging Sensor hold time"
  kind: action
  command: "75#"
  params: []

- id: set_paging_sensor_sensitivity
  label: "Set Paging Sensor sensitivity"
  kind: action
  command: "83*X#"
  params: []

- id: view_sensitivity
  label: "View sensitivity"
  kind: action
  command: "83#"
  params: []

- id: configure_rs_232_seral_port_parameters
  label: "Configure RS-232 seral port parameters"
  kind: action
  command: "EX10# CP }"
  params: []

- id: view_rs_232_seral_port_parameters
  label: "View RS-232 seral port parameters"
  kind: action
  command: "E CP }"
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

- id: view_system_memory_usage
  label: "View system-memory usage"
  kind: action
  command: "3I"
  params: []

- id: view_user_memory_usage
  label: "View user-memory usage"
  kind: action
  command: "4I"
  params: []

- id: view_firmware_version
  label: "View firmware version"
  kind: action
  command: "Q"
  params: []

- id: view_full_firmware_version
  label: "View full firmware version"
  kind: action
  command: "*Q"
  params: []

- id: view_part_number
  label: "View part number"
  kind: action
  command: "N"
  params: []

- id: view_voice_lift_firmware_version
  label: "View VoiceLift firmware version"
  kind: action
  command: "34Q"
  params: []

- id: view_pvt_wallplate_1_firmware_version
  label: "View PVT wallplate 1 firmware version"
  kind: action
  command: "36Q"
  params: []

- id: view_pvt_wallplate_2_firmware_version
  label: "View PVT wallplate 2 firmware version"
  kind: action
  command: "38Q"
  params: []

- id: view_voice_lift_receiver_part_number
  label: "View VoiceLift Receiver part number"
  kind: action
  command: "34N"
  params: []

- id: view_pvt_wallplate_1_part_number
  label: "View PVT wallplate 1 part number"
  kind: action
  command: "36N"
  params: []

- id: view_pvt_wallplate_2_part_number
  label: "View PVT wallplate 2 part number"
  kind: action
  command: "38N"
  params: []

- id: reset_all_device_settings_to_factory_defaults
  label: "Reset all device settings to factory defaults"
  kind: action
  command: "E ZXXX }"
  params: []

- id: absolute_system_reset,_retain_ip
  label: "Absolute system reset, retain IP"
  kind: action
  command: "E ZY }"
  params: []

- id: erase_all_files_from_flash_user_memory
  label: "Erase all files from flash (user) memory"
  kind: action
  command: "E ZFFF }"
  params: []

- id: absolute_system_reset_2
  label: "Absolute system reset"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: ip_system_reset
  label: "IP system reset"
  kind: action
  command: "E 1ZQQQ }"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "EX10@ CV }"
  params: []

- id: view_verbose_mode
  label: "View verbose mode"
  kind: action
  command: "E CV }"
  params: []

- id: set_unit_name
  label: "Set unit name"
  kind: action
  command: "[24] EX10% CN }"
  params: []

- id: set_unit_name_to_factory_default
  label: "Set unit name to factory default"
  kind: action
  command: "[24] E• CN }"
  params: []

- id: view_unit_name
  label: "View unit name"
  kind: action
  command: "E CN }"
  params: []

- id: set_date_and_time
  label: "Set date and time"
  kind: action
  command: "[24] EX10^ CT }"
  params: []

- id: view_date_and_time
  label: "View date and time"
  kind: action
  command: "E CT }"
  params: []

- id: view_gmt_offset
  label: "View GMT offset"
  kind: action
  command: "E CZ }"
  params: []

- id: set_time_zone
  label: "Set time zone"
  kind: action
  command: "E < zonename > *TZON }"
  params: []

- id: view_time_zone
  label: "View time zone"
  kind: action
  command: "E TZON }"
  params: []

- id: list_time_zones
  label: "List time zones"
  kind: action
  command: "E *TZON }"
  params: []

- id: set_dhcp_on
  label: "Set DHCP on"
  kind: action
  command: "[24] E 1DH }"
  params: []

- id: set_dhcp_off
  label: "Set DHCP off"
  kind: action
  command: "[24] E 0DH }"
  params: []

- id: view_dhcp_mode
  label: "View DHCP mode"
  kind: action
  command: "E DH }"
  params: []

- id: set_ip_address
  label: "Set IP address"
  kind: action
  command: "[24] EX10( CI }"
  params: []

- id: set_subnet_mask
  label: "Set subnet mask"
  kind: action
  command: "[24] EX11) CS }"
  params: []

- id: view_subnet_mask
  label: "View subnet mask"
  kind: action
  command: "E CS }"
  params: []

- id: set_gateway_ip_address
  label: "Set gateway IP address"
  kind: action
  command: "[24] EX11! CG }"
  params: []

- id: view_gateway_ip_address
  label: "View gateway IP address"
  kind: action
  command: "E CG }"
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

- id: set_ip
  label: "Set IP"
  kind: action
  command: "E 1* X10( CISG }"
  params: []

- id: set_ip_subnet
  label: "Set IP/subnet"
  kind: action
  command: "E 1* X10( * X11) CISG }"
  params: []

- id: set_ip_subnet_2
  label: "Set IP/subnet"
  kind: action
  command: "E 1* X10( / X11# CISG }"
  params: []

- id: set_ip_subnet_gateway
  label: "Set IP/subnet/Gateway"
  kind: action
  command: "E 1* X10( * X11) * X11! CISG }"
  params: []

- id: set_ip_subnet_gateway_2
  label: "Set IP/subnet/Gateway"
  kind: action
  command: "E 1* X10( / X11# * X11! CISG }"
  params: []

- id: view_ip_subnet_gateway_all
  label: "View IP/subnet/Gateway (all)"
  kind: action
  command: "E 1CISG }"
  params: []

- id: view_number_of_ethernet_connections
  label: "View number of Ethernet connections"
  kind: action
  command: "E CC }"
  params: []

- id: set_administrator_password
  label: "Set administrator password"
  kind: action
  command: "EX10* CA }"
  params: []

- id: reset_clear_administrator_password
  label: "Reset (clear) administrator password"
  kind: action
  command: "E• CA }"
  params: []

- id: set_user_password
  label: "Set user password"
  kind: action
  command: "EX10* CU }"
  params: []

- id: reset_clear_user_password
  label: "Reset (clear) user password"
  kind: action
  command: "E• CU }"
  params: []
```

## Feedbacks
```yaml
- id: view_output_video_mute_status
  label: "View output video mute status"
  kind: query
  query_command: "B"

- id: view_output_audio_mute_status
  label: "View output audio mute status"
  kind: query
  query_command: "Z"

- id: view_input_audio_mute_status
  label: "View input audio mute status"
  kind: query
  query_command: "EX$ IMUT }"

- id: view_status
  label: "View status"
  kind: query
  query_command: "X"

- id: view_fan_status
  label: "View fan status"
  kind: query
  query_command: "21S"

- id: view_switchable_signal,_normal,_and_peak_status
  label: "View switchable Signal, Normal, and Peak status"
  kind: query
  query_command: "1S"

- id: view_voice_lift_receiver_mic_input_signal,_normal,_and_peak_status
  label: "View VoiceLift receiver Mic input Signal, Normal, and Peak status"
  kind: query
  query_command: "4S"

- id: view_aux_input_signal,_normal,_and_peak_status
  label: "View Aux input Signal, Normal, and Peak status"
  kind: query
  query_command: "5S"

- id: view_paging_sensor_status
  label: "View paging sensor status"
  kind: query
  query_command: "42S"

- id: view_read_edid_in_hex_format
  label: "View/read EDID in Hex format"
  kind: query
  query_command: "E R X^ EDID }"

- id: view_hdcp_status_for_all_hdmi_inputs
  label: "View HDCP status for all HDMI inputs"
  kind: query
  query_command: "E IHDCP }"

- id: view_hdcp_encryption_status
  label: "View HDCP encryption status"
  kind: query
  query_command: "E E X^ HDCP }"

- id: view_play_status
  label: "View play status"
  kind: query
  query_command: "E PLAY }"

- id: request_voice_lift_status_information_vlr_302
  label: "Request VoiceLift status information (VLR 302)"
  kind: query
  query_command: "34I"

- id: view_voice_lift_status_vlr_102
  label: "View VoiceLift status (VLR 102)"
  kind: query
  query_command: "34I"

- id: request_a_v_input_number
  label: "Request A/V input number"
  kind: query
  query_command: "I"

- id: read_ip_address
  label: "Read IP address"
  kind: query
  query_command: "[24] E CI }"

- id: read_mac_address
  label: "Read MAC address"
  kind: query
  query_command: "E CH }"

- id: read_administrator_password
  label: "Read administrator password"
  kind: query
  query_command: "E CA }"

- id: read_user_password
  label: "Read user password"
  kind: query
  query_command: "EX10* CU }"
```

## Variables
```yaml
# Settable parameters (volume, pixel phase, total pixels, horizontal/vertical start,
# paging sensor hold time/sensitivity, verbose mode, etc.) are represented as
# discrete actions in the Actions section per the source's command/response table
# structure. No additional variables beyond those actions.
```

## Events
```yaml
# Unsolicited (switcher-initiated) messages documented in the source:

- id: connection_banner
  description: >
    Copyright and device info banner sent upon connecting via TCP/IP, Telnet,
    or RS-232 after a power cycle. Includes firmware version (Vx.xx) and part
    number (60-nnnn-01), optionally followed by date/time.
  payload: "] © Copyright 20nn, Extron Electronics, PVS 407D, Vx.xx, 60-nnnn-01 ]"
  trigger: connection_established

- id: input_change_notification
  description: >
    Sent when a local event (e.g. front panel selection) changes the active input.
    No response required from the host.
  payload: "Chn X!]"
  trigger: input_switched

- id: audio_playback_complete
  description: >
    Unsolicited response sent after an audio file finishes playing.
  payload: "PLAY99 ]"
  trigger: audio_file_finished

- id: microphone_pairing_result
  description: >
    Unsolicited response sent when a LINK slot pairing succeeds or fails after
    a 30-second timeout. Only one microphone can be paired at a time.
  payload: "Pair X3*X3(]"
  trigger: pairing_complete_or_timeout

- id: voicelift_state_change
  description: >
    Switcher sends unsolicited tagged responses via Ethernet/USB/RS-232 whenever
    there is any state change on the VoiceLift receiver (VLR 302 or VLR 102).
  trigger: voicelift_state_change
```

## Macros
```yaml
# No multi-step command sequences explicitly described in the source.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# NOTE: The source documents several destructive reset commands that should be
# used with caution (not explicitly flagged as safety interlocks in source):
#   - E ZXXX  - resets all video and audio settings to factory defaults
#   - E ZQQQ  - absolute system reset to factory defaults (firmware retained)
#   - E 1ZQQQ - IP system reset (resets IP/network settings to factory defaults)
#   - E ZFFF  - erases all files from flash user memory (EDID, configs, HTML)
#   - E ZY    - absolute system reset, retains IP settings
#   - E v1*1RSTD - VoiceLift receiver factory reset (clears microphone pairing)
# No explicit safety warnings, interlock procedures, or power-on sequencing
# requirements are documented in this source.
```

## Notes
- **SIS command structure**: Commands consist of one or more characters per field. No special characters required to begin or end a command. All responses end with CR/LF (represented as `]` in the source). A space (`•`) marks required spaces only.
- **Verbose mode**: Four modes (0–3). Mode 0 = clear/none (default for IP). Mode 1 = tagged responses for queries. Mode 2 = tagged responses (default for RS-232/USB). Mode 3 = verbose + tagged. When tagged responses are enabled, all read commands return the constant string plus data.
- **Audio mute behavior**: The `1Z` mute command affects embedded HDMI, line out, and amplifier outputs. If output audio mute is on and input is switched or volume changed, the switcher auto-unmutes. Audio file playback is excluded from the Z mute command.
- **Password behavior**: Reading a password via RS-232 or IP returns four asterisks (`****`) if a password exists, empty if none set — never returns the actual password.
- **VoiceLift receiver detection**: Returns E25 (device not present) when VLR 302/VLR 102 is not detected. Returns E14 when VLR 102 is detected but VLR 302 command was sent.
- **Error codes**: E01 (invalid input channel), E10 (invalid command), E12 (invalid port), E13 (invalid parameter), E14 (invalid for configuration), E17 (invalid for signal type), E18 (timeout), E22 (busy), E24 (privilege violation — administrator level required), E25 (device not present), E26 (max connections exceeded), E28 (file not found).
- **Default network settings**: IP 192.168.254.254, subnet 255.255.0.0, gateway 0.0.0.0, DHCP off, Telnet port 23, Pass-Thru port 2003.
- **GVCCS audio streaming**: Requires firmware 5.00+ and Audio Decoding LinkLicense. Default multicast 239.255.255.250, UDP ports 3030 (public), 2020 (priority), 3029 (listen).

<!-- UNRESOLVED: firmware version compatibility ranges beyond feature-specific notes (2.00+, 5.00+) -->
<!-- UNRESOLVED: maximum number of concurrent TCP/IP connections not stated (E26 implies a limit exists) -->
<!-- UNRESOLVED: RS-232 control port is a 3.5mm captive screw 3-pole connector (Tx, Rx, G) — wiring documented but connector spec not beyond that -->

## Provenance

```yaml
source_domains:
  - extron.com
source_urls:
  - https://www.extron.com/download/files/userman/PVS_407D_68-2776-01_J.pdf
  - https://www.extron.com/download/files/userman/PVS_407D_68-2776-50_D.pdf
  - https://www.extron.com
retrieved_at: 2026-07-10T19:48:32.457Z
last_checked_at: 2026-07-12T08:59:04.771Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-12T08:59:04.771Z
matched_actions: 153
action_count: 153
confidence: medium
summary: "Every one of the 153 spec action/feedback commands matches a literal SIS command row in the source with correct shape, and every source command-table row is represented in the spec; transport params match exactly. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility ranges not stated in source beyond feature-specific notes (2.00+ for 4K/UHD, 5.00+ for GVCCS audio streaming)"
- "firmware version compatibility ranges beyond feature-specific notes (2.00+, 5.00+)"
- "maximum number of concurrent TCP/IP connections not stated (E26 implies a limit exists)"
- "RS-232 control port is a 3.5mm captive screw 3-pole connector (Tx, Rx, G) — wiring documented but connector spec not beyond that"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
