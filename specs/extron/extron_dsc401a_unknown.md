---
spec_id: admin/extron-dsc401a
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DSC 401 A Control Spec"
manufacturer: Extron
model_family: "DSC 401 A"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DSC 401 A"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - manualslib.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3539-01_C_DSC_401.pdf
  - https://www.manualslib.com/manual/2110024/Extron-Electronics-Dsc-401.html
retrieved_at: 2026-05-15T02:04:45.357Z
last_checked_at: 2026-10-07T18:45:01.465Z
generated_at: 2026-10-07T18:45:01.465Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware compatibility range not stated in source; only the placeholder format `V n.nn` is referenced in the copyright banner."
  - "each X# / X! / X$ symbol in the source defines an enumerated"
  - "source does not document any multi-step macro sequences."
  - "source contains no explicit safety warnings, interlock procedures,"
  - "voltage, current, and power-draw specifications are not stated in the SIS command reference and are intentionally not populated. Port numbers above are taken verbatim from the source. No baud-rate is populated because the device is TCP-only per the source."
verification:
  verdict: verified
  checked_at: 2026-10-07T18:45:01.465Z
  matched_actions: 214
  action_count: 214
  confidence: medium
  summary: "All 214 action units match source SIS command tables with correct shapes; transport values (22023, 192.168.254.254, admin, Telnet 23) are supported; coverage is essentially complete. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Extron DSC 401 A Control Spec

## Summary
The Extron DSC 401 A is a digital scaling converter that accepts HDMI (and DVI) input and outputs a scaled HDMI signal, with optional analog audio I/O on the DSC 401 A variant. This spec covers the SIS (Simple Instruction Set) command protocol used to control the device over IP via SSH/Telnet (TCP) — no RS-232 serial interface is described in the source. The protocol uses ASCII command strings terminated by CR/LF, with both set and view (query) variants, plus a rich catalogue of unsolicited status messages.

<!-- UNRESOLVED: firmware compatibility range not stated in source; only the placeholder format `V n.nn` is referenced in the copyright banner. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 22023
  default_ip: 192.168.254.254
auth:
  type: password
  username: admin
  default_password_serial_number: true
  default_password_after_absolute_reset: extron
notes: "SSH on TCP/22023 is the default SIS transport. Telnet on TCP/23 is disabled by default and must be explicitly enabled via SIS. An IP-over-USB path is also exposed on 203.0.113.22:22023 via the front-panel USB Config port."
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: view_detected_format
  label: "View detected format"
  kind: action
  command: "1*\\ X#]"
  params: []

- id: in_verbose_modes_2_and_3
  label: "In verbose modes 2 and 3:"
  kind: action
  command: "Vtyp1* X#]"
  params: []

- id: write_name
  label: "Write name"
  kind: action
  command: "E 1, X1$ NI }"
  params: []

- id: assign_edid_to_input
  label: "Assign EDID to input"
  kind: action
  command: "E A 1* X2! EDID }"
  params: []

- id: view_assigned_edid_data
  label: "View assigned EDID data"
  kind: action
  command: "E A 1 EDID }"
  params: []

- id: save_hdmi_output_edid
  label: "Save HDMI output EDID"
  kind: action
  command: "E S 1 * X2! EDID }"
  params: []

- id: view_edid_native_resolution
  label: "View EDID native resolution"
  kind: action
  command: "E N X2! EDID }"
  params: []

- id: export_edid_file
  label: "Export EDID file"
  kind: action
  command: "E E X2! , filename EDID }"
  params: []

- id: import_edid_file
  label: "Import EDID file"
  kind: action
  command: "E I X2! , filename EDID }"
  params: []

- id: set_to_fill
  label: "Set to Fill"
  kind: action
  command: "E 1*1 ASPR }"
  params: []

- id: set_to_follow
  label: "Set to Follow"
  kind: action
  command: "E 1*2 ASPR }"
  params: []

- id: view_aspect_ratio_setting
  label: "View aspect ratio setting"
  kind: action
  command: "E 1 ASPR }"
  params: []

- id: execute
  label: "Execute"
  kind: action
  command: "1*0A"
  params: []

- id: execute_and_fill
  label: "Execute and Fill"
  kind: action
  command: "1*1A"
  params: []

- id: execute_and_follow
  label: "Execute and Follow"
  kind: action
  command: "1*2A"
  params: []

- id: view
  label: "View"
  kind: action
  command: "E 1 APIX }"
  params: []

- id: view_2
  label: "View"
  kind: action
  command: "E 1 ALIN }"
  params: []

- id: hdcp_authorized
  label: "HDCP authorized"
  kind: action
  command: "E E 1* X1) HDCP }"
  params: []

- id: view_hdcp_authorized
  label: "View HDCP authorized"
  kind: action
  command: "E E 1 HDCP }"
  params: []

- id: enable_freeze
  label: "Enable freeze"
  kind: action
  command: "1*1F"
  params: []

- id: disable_freeze
  label: "Disable freeze"
  kind: action
  command: "1*0F"
  params: []

- id: specific_value
  label: "Specific value"
  kind: action
  command: "E I 1* X1^ HCTR }"
  params: []

- id: increment_value
  label: "Increment value"
  kind: action
  command: "E I 1+ HCTR }"
  params: []

- id: decrement_value
  label: "Decrement value"
  kind: action
  command: "E I 1- HCTR }"
  params: []

- id: view_3
  label: "View"
  kind: action
  command: "E I 1 HCTR }"
  params: []

- id: specific_value_2
  label: "Specific value"
  kind: action
  command: "E I 1* X1^ VCTR }"
  params: []

- id: increment_value_2
  label: "Increment value"
  kind: action
  command: "E I 1+ VCTR }"
  params: []

- id: decrement_value_2
  label: "Decrement value"
  kind: action
  command: "E I 1- VCTR }"
  params: []

- id: view_4
  label: "View"
  kind: action
  command: "E I 1 VCTR }"
  params: []

- id: specific_value_3
  label: "Specific value"
  kind: action
  command: "E I 1* X1& HSIZ }"
  params: []

- id: increase_horizontal_size
  label: "Increase horizontal size"
  kind: action
  command: "E I 1+ HSIZ }"
  params: []

- id: decrease_horizontal_size
  label: "Decrease horizontal size"
  kind: action
  command: "E I 1- HSIZ }"
  params: []

- id: view_5
  label: "View"
  kind: action
  command: "E I 1 HSIZ }"
  params: []

- id: specific_value_4
  label: "Specific value"
  kind: action
  command: "E I 1* X1& VSIZ }"
  params: []

- id: increase_vertical_size
  label: "Increase vertical size"
  kind: action
  command: "E I 1+ VSIZ }"
  params: []

- id: decrease_vertical_size
  label: "Decrease vertical size"
  kind: action
  command: "E I 1- VSIZ }"
  params: []

- id: view_6
  label: "View"
  kind: action
  command: "E I 1 VSIZ }"
  params: []

- id: specific_value_5
  label: "Specific value"
  kind: action
  command: "E 1, X1^ * X1^ * X1& * X1& XIMG }"
  params: []

- id: view_7
  label: "View"
  kind: action
  command: "E 1 XIMG }"
  params: []

- id: mute_output
  label: "Mute output"
  kind: action
  command: "1B"
  params: []

- id: mute_sync_and_video
  label: "Mute sync and video"
  kind: action
  command: "2B"
  params: []

- id: unmute_output_video_and_sync
  label: "Unmute output video and sync"
  kind: action
  command: "0B"
  params: []

- id: set_output_rate
  label: "Set output rate"
  kind: action
  command: "E 1* X2! RATE }"
  params: []

- id: view_output_rate
  label: "View output rate"
  kind: action
  command: "E 1 RATE }"
  params: []

- id: power_save_off
  label: "Power save off"
  kind: action
  command: "E 0 PSAV }"
  params: []

- id: power_save_on
  label: "Power save on"
  kind: action
  command: "E 1 PSAV }"
  params: []

- id: view_power_save_setting
  label: "View power save setting"
  kind: action
  command: "E PSAV }"
  params: []

- id: set_screen_saver_mode
  label: "Set screen saver mode"
  kind: action
  command: "E `M` `1*` X4) `SSAV`}"
  params: []

- id: view_mode
  label: "View mode"
  kind: action
  command: "E `M` `1` `SSAV` }"
  params: []

- id: set_screen_saver_duration_before_output_sync_timeout
  label: "Set screen saver duration before output sync timeout"
  kind: action
  command: "E `T` `1*` X2* `SSAV`}"
  params: []

- id: view_screen_saver_duration_before_output_sync_timeout
  label: "View screen saver duration before output sync timeout."
  kind: action
  command: "E `T` `1` `SSAV` }"
  params: []

- id: set_format
  label: "Set format"
  kind: action
  command: "E `1*` X4* `VTPO`}"
  params: []

- id: view_setting
  label: "View setting"
  kind: action
  command: "E `1` `VTPO`}"
  params: []

- id: view_auto_output_format
  label: "View auto output format"
  kind: action
  command: "E `1*VTPO`}"
  params: []

- id: set_scaler_bypass_mode
  label: "Set scaler bypass mode"
  kind: action
  command: "E 1* X9* VPBP }"
  params: []

- id: view_scaler_bypass_mode
  label: "View scaler bypass mode"
  kind: action
  command: "E 1 VPBP }"
  params: []

- id: set_video_color_bit_depth_mode
  label: "Set video color bit depth mode"
  kind: action
  command: "E V 1* X9( BITD }"
  params: []

- id: view_mode_2
  label: "View mode"
  kind: action
  command: "E V 1 BITD }"
  params: []

- id: select_logo_image_file
  label: "Select logo image file"
  kind: action
  command: "E `A` X4#`,` _filename_ `LOGO`}"
  params: []

- id: view_selected_logo_file
  label: "View selected logo file"
  kind: action
  command: "E `A` X4# `LOGO`}"
  params: []

- id: clear_logo
  label: "Clear logo"
  kind: action
  command: "E `X` `3*` X4# `PRST`}"
  params: []

- id: disable_logo
  label: "Disable logo"
  kind: action
  command: "E `E` `1*0` `LOGO`}"
  params: []

- id: enable_logo
  label: "Enable logo"
  kind: action
  command: "E `E` `1*`X4# `LOGO` }"
  params: []

- id: write_name_2
  label: "Write name"
  kind: action
  command: "E `L`X4#`,`X1$ `UNAM`}"
  params: []

- id: view_logo_name
  label: "View logo name"
  kind: action
  command: "E `L`X4# `UNAM`}"
  params: []

- id: view_logo_availability
  label: "View logo availability"
  kind: action
  command: "E Q LOGO }"
  params: []

- id: specific_value_6
  label: "Specific value"
  kind: action
  command: "E L X4# * X1^ HCTR }"
  params: []

- id: increment_value_3
  label: "Increment value"
  kind: action
  command: "E L X4# + HCTR }"
  params: []

- id: decrement_value_3
  label: "Decrement value"
  kind: action
  command: "E L X4# - HCTR }"
  params: []

- id: view_8
  label: "View"
  kind: action
  command: "E L X4# HCTR }"
  params: []

- id: specific_value_7
  label: "Specific value"
  kind: action
  command: "E L X4# * X1^ VCTR }"
  params: []

- id: increment_value_4
  label: "Increment value"
  kind: action
  command: "E L X4# + VCTR }"
  params: []

- id: decrement_value_4
  label: "Decrement value"
  kind: action
  command: "E L X4# - VCTR }"
  params: []

- id: view_9
  label: "View"
  kind: action
  command: "E L X4# VCTR }"
  params: []

- id: disabled
  label: "Disabled"
  kind: action
  command: "E X4# *0 LKEF }"
  params: []

- id: transparency
  label: "Transparency"
  kind: action
  command: "E X4# *1 LKEF }"
  params: []

- id: rgb_key
  label: "RGB Key"
  kind: action
  command: "E X4# *2 LKEF }"
  params: []

- id: level_key
  label: "Level Key"
  kind: action
  command: "E X4# *3 LKEF }"
  params: []

- id: alpha_key
  label: "Alpha Key"
  kind: action
  command: "E X4# *4 LKEF }"
  params: []

- id: view_setting_2
  label: "View setting"
  kind: action
  command: "E X4# LKEF }"
  params: []

- id: specific_value_8
  label: "Specific value"
  kind: action
  command: "E X4# * X7@ * X7# *LKEY }"
  params: []

- id: view_setting_3
  label: "View setting"
  kind: action
  command: "E X4# * X7@ LKEY }"
  params: []

- id: recall_preset
  label: "Recall preset"
  kind: action
  command: "2* X2^ ."
  params: []

- id: save_preset
  label: "Save preset"
  kind: action
  command: "2* X2^ ,"
  params: []

- id: delete_preset
  label: "Delete preset"
  kind: action
  command: "E X 2* X2^ PRST }"
  params: []

- id: write_preset_name
  label: "Write preset name"
  kind: action
  command: "E 2* X2^ , X1$ PNAM }"
  params: []

- id: view_input_preset_name
  label: "View input preset name"
  kind: action
  command: "E 2* X2^ PNAM }"
  params: []

- id: enable_global_audio_mute
  label: "Enable global audio mute"
  kind: action
  command: "1Z"
  params: []

- id: disable_global_audio_mute
  label: "Disable global audio mute"
  kind: action
  command: "0Z"
  params: []

- id: set_audio_gain
  label: "Set audio gain"
  kind: action
  command: "X5$ G"
  params: []

- id: increment
  label: "Increment"
  kind: action
  command: "+G"
  params: []

- id: decrement
  label: "Decrement"
  kind: action
  command: "-G"
  params: []

- id: view_gain
  label: "View gain"
  kind: action
  command: "G"
  params: []

- id: set_input_audio_format
  label: "Set input audio format"
  kind: action
  command: "E `I` `1` `*`X5*`AFMT`}"
  params: []

- id: view_audio_input_format
  label: "View audio input format"
  kind: action
  command: "E `I` `1` `AFMT`}"
  params: []

- id: set_volume
  label: "Set volume"
  kind: action
  command: "X5)`V"
  params: []

- id: increment_volume
  label: "Increment volume"
  kind: action
  command: "+V"
  params: []

- id: decrement_volume
  label: "Decrement volume"
  kind: action
  command: "-V"
  params: []

- id: view_volume
  label: "View volume"
  kind: action
  command: "V"
  params: []

- id: set_audio_output_format
  label: "Set audio output format"
  kind: action
  command: "E `o1*`X5!`AFMT`}"
  params: []

- id: view_audio_output_format
  label: "View audio output format"
  kind: action
  command: "E `o1` `AFMT`}"
  params: []

- id: set_file_to_slot_association
  label: "Set file to slot association"
  kind: action
  command: "E A X9) , < filename > CPLY }"
  params: []

- id: clear_file_from_slot
  label: "Clear file from slot"
  kind: action
  command: "E A X9) , • CPLY }"
  params: []

- id: view_file_to_slot_association
  label: "View file to slot association"
  kind: action
  command: "E A X9) CPLY }"
  params: []

- id: set_repeat_mode
  label: "Set repeat mode"
  kind: action
  command: "E M X9) * X9@ CPLY }"
  params: []

- id: view_repeat_mode
  label: "View repeat mode"
  kind: action
  command: "E M X9) CPLY }"
  params: []

- id: set_playback_delay
  label: "Set playback delay"
  kind: action
  command: "E D X9) * X9# CPLY }"
  params: []

- id: view_playback_delay
  label: "View playback delay"
  kind: action
  command: "E D X9) CPLY }"
  params: []

- id: write_audio_file_name
  label: "Write audio file name"
  kind: action
  command: "E N X9) * X1$ CPLY }"
  params: []

- id: view_name
  label: "View name"
  kind: action
  command: "E N X9) CPLY }"
  params: []

- id: set_playback_volume
  label: "Set playback volume"
  kind: action
  command: "E V X5) CPLY }"
  params: []

- id: view_playback_volume
  label: "View playback volume"
  kind: action
  command: "E V CPLY }"
  params: []

- id: start_and_stop_playback
  label: "Start and stop playback"
  kind: action
  command: "E X9) * X9! PLAY }"
  params: []

- id: set_test_pattern
  label: "Set test pattern"
  kind: action
  command: "E 1* X2@ TEST }"
  params: []

- id: view_test_pattern
  label: "View test pattern"
  kind: action
  command: "E 1 TEST }"
  params: []

- id: enable
  label: "Enable"
  kind: action
  command: "1*1 F"
  params: []

- id: disable
  label: "Disable"
  kind: action
  command: "1*0 F"
  params: []

- id: view_10
  label: "View"
  kind: action
  command: "1F"
  params: []

- id: set_switch_effect
  label: "Set switch effect"
  kind: action
  command: "E U 1 * X4% SWEF }"
  params: []

- id: view_switch_effect_setting
  label: "View switch effect setting"
  kind: action
  command: "E U 1 SWEF }"
  params: []

- id: set_upstream_switch_masking
  label: "Set upstream switch masking"
  kind: action
  command: "E H 1 *X4( SWEF }"
  params: []

- id: view_upstream_switch_masking
  label: "View upstream switch masking"
  kind: action
  command: "E H 1 * SWEF }"
  params: []

- id: set_hdcp_mode
  label: "Set HDCP mode"
  kind: action
  command: "E S 1* X4^ HDCP }"
  params: []

- id: view_hdcp_mode
  label: "View HDCP mode"
  kind: action
  command: "E S 1 HDCP }"
  params: []

- id: enable_lock_mode
  label: "Enable lock mode"
  kind: action
  command: "1 X"
  params: []

- id: disable_lock_mode
  label: "Disable lock mode"
  kind: action
  command: "0 X"
  params: []

- id: view_signal_presence
  label: "View signal presence"
  kind: action
  command: "E 0LS }"
  params: []

- id: set_hdcp_notification
  label: "Set HDCP notification"
  kind: action
  command: "E N 1* X4& HDCP }"
  params: []

- id: view_notification
  label: "View notification"
  kind: action
  command: "E N 1 HDCP }"
  params: []

- id: disable_input_afl
  label: "Disable input AFL"
  kind: action
  command: "E 1*0 GLOK }"
  params: []

- id: enable_input_afl
  label: "Enable input AFL"
  kind: action
  command: "E 1*1 GLOK }"
  params: []

- id: view_the_afl_setting
  label: "View the AFL setting"
  kind: action
  command: "E 1 GLOK }"
  params: []

- id: system_reset
  label: "System reset"
  kind: action
  command: "E ZXXX }"
  params: []

- id: absolute_system_reset
  label: "Absolute System Reset"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: absolute_system_reset,_retain_ip_settings
  label: "Absolute system reset, retain IP settings"
  kind: action
  command: "E ZY }"
  params: []

- id: general_information
  label: "General information"
  kind: action
  command: "1*I"
  params: []

- id: view_model_name
  label: "View model name"
  kind: action
  command: "1I"
  params: []

- id: view_unit_description
  label: "View unit description"
  kind: action
  command: "2I"
  params: []

- id: view_firmware_version
  label: "View firmware version"
  kind: action
  command: "Q"
  params: []

- id: view_firmware_build_version
  label: "View firmware build version"
  kind: action
  command: "*Q"
  params: []

- id: view_part_number
  label: "View part number"
  kind: action
  command: "N"
  params: []

- id: view_internal_temperature
  label: "View internal temperature"
  kind: action
  command: "E 20STAT }"
  params: []

- id: input_line_count
  label: "Input line count"
  kind: action
  command: "33i"
  params: []

- id: set_unit_name_hostname
  label: "Set unit name (Hostname)"
  kind: action
  command: "E X3@ CN }"
  params: []

- id: view_unit_name_hostname
  label: "View unit name (Hostname)"
  kind: action
  command: "E CN }"
  params: []

- id: set_unit_name_to_factory_default
  label: "Set unit name to factory default"
  kind: action
  command: "E• CN }"
  params: []

- id: view_hardware_mac_address
  label: "View hardware (MAC) address"
  kind: action
  command: "E CH }"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "E X3$ CV }"
  params: []

- id: view_verbose_mode
  label: "View verbose mode"
  kind: action
  command: "E CV }"
  params: []

- id: set_dhcp_to_on
  label: "Set DHCP to On"
  kind: action
  command: "E 1DH }"
  params: []

- id: set_dhcp_to_off
  label: "Set DHCP to Off"
  kind: action
  command: "E 0DH }"
  params: []

- id: view_dhcp_mode
  label: "View DHCP mode"
  kind: action
  command: "E DH }"
  params: []

- id: set_ip_address_14,_24
  label: "Set IP address [14, 24]"
  kind: action
  command: "E X7% CI }"
  params: []

- id: view_ip_address
  label: "View IP address"
  kind: action
  command: "E CI }"
  params: []

- id: set_subnet_mask_14,_24
  label: "Set subnet mask [14, 24]"
  kind: action
  command: "E X7^ CS }"
  params: []

- id: view_subnet_mask_14,_24
  label: "View subnet mask [14, 24]"
  kind: action
  command: "E X7^}"
  params: []

- id: set_gateway_ip_address_14,_24
  label: "Set gateway IP address [14, 24]"
  kind: action
  command: "E X7& CG }"
  params: []

- id: view_gateway_ip_address
  label: "View gateway IP address"
  kind: action
  command: "E CG }"
  params: []

- id: view_connections_listing
  label: "View connections listing"
  kind: action
  command: "E CC }"
  params: []

- id: set_date_and_time
  label: "Set date and time"
  kind: action
  command: "E X8% CT }"
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

- id: view_available_time_zones
  label: "View available time zones"
  kind: action
  command: "E * TZON }"
  params: []

- id: set_time_zone_24
  label: "Set time zone [24]"
  kind: action
  command: "E X8& * TZON }"
  params: []

- id: view_current_time_zone
  label: "View current time zone"
  kind: action
  command: "E TZON }"
  params: []

- id: set_ip_address,_subnet_mask,_and_gateway_ip_address_at_once
  label: "Set IP address, subnet mask, and gateway IP address at once"
  kind: action
  command: "E 1* X7% / X8( * X7& CISG }"
  params: []

- id: view_all_parameters
  label: "View all parameters"
  kind: action
  command: "E 1 CISG }"
  params: []

- id: set_administrator_password_24
  label: "Set administrator password [24]"
  kind: action
  command: "E X7* CA }"
  params: []

- id: reset_administrator_password_24
  label: "Reset administrator password [24]"
  kind: action
  command: "E• CA }"
  params: []

- id: view_administrator_password_24
  label: "View administrator password [24]"
  kind: action
  command: "E CA }"
  params: []

- id: set_user_password_24
  label: "Set user password [24]"
  kind: action
  command: "E X7* CU }"
  params: []

- id: reset_user_password_24
  label: "Reset user password [24]"
  kind: action
  command: "E• CU }"
  params: []

- id: view_user_password_24
  label: "View user password [24]"
  kind: action
  command: "E CU }"
  params: []

- id: create_or_change_directory
  label: "Create or change directory"
  kind: action
  command: "E path / directory / CJ }"
  params: []

- id: move_back_to_root_directory
  label: "Move back to root directory"
  kind: action
  command: "E /CJ }"
  params: []

- id: move_up_one_directory
  label: "Move up one directory"
  kind: action
  command: "E ..CJ }"
  params: []

- id: view_current_directory
  label: "View current directory"
  kind: action
  command: "E CJ }"
  params: []

- id: erase_user_supplied_web_page_or_file
  label: "Erase user-supplied web page or file"
  kind: action
  command: "E filename EF }"
  params: []

- id: erase_current_directory_and_its_files
  label: "Erase current directory and its files"
  kind: action
  command: "E /EF }"
  params: []

- id: erase_current_directory_and_subdirectories_24_,_28
  label: "Erase current directory and subdirectories [24] [,] [28]"
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

- id: set_current_connection_port_timeout_period_13
  label: "Set current connection port timeout period 13"
  kind: action
  command: "E `0*`X8$`TC`}"
  params: []

- id: view_current_connection_port_timeout_period_13
  label: "View current connection port timeout period 13"
  kind: action
  command: "E`0` `TC`}"
  params: []

- id: set_global_ip_port_timeout
  label: "Set global IP port timeout"
  kind: action
  command: "E`1*`X8$`TC`}"
  params: []

- id: view_global_ip_port_timeout
  label: "View global IP port timeout"
  kind: action
  command: "E`1` `TC`}"
  params: []

- id: set_telnet_port_map_24
  label: "Set Telnet port map 24"
  kind: action
  command: "E `{`_port_ _number_`}` `MT`}"
  params: []

- id: disable_telnet_port_24
  label: "Disable Telnet port 24"
  kind: action
  command: "E `0` `MT`}"
  params: []

- id: enable_telnet_port_24
  label: "Enable Telnet port 24"
  kind: action
  command: "E `23` `MT`}"
  params: []

- id: view_telnet_port_map_24
  label: "View Telnet port map 24"
  kind: action
  command: "E `MT`}"
  params: []

- id: set_web_port_map_24
  label: "Set web port map 24"
  kind: action
  command: "E `{`_port_ _number_`}MH`}"
  params: []

- id: reset_web_port_24
  label: "Reset web port 24"
  kind: action
  command: "E `80` `MH`}"
  params: []

- id: disable_web_port_24
  label: "Disable web port 24"
  kind: action
  command: "E `0` `MH`}"
  params: []

- id: view_web_port_map_24
  label: "View web port map 24"
  kind: action
  command: "E `MH`}"
  params: []

- id: set_snmp_port_map_24
  label: "Set SNMP port map 24"
  kind: action
  command: "E `A` `{`_port_ _number_`}` `PMAP`}"
  params: []

- id: reset_snmp_port_map_24
  label: "Reset SNMP port map 24"
  kind: action
  command: "E `A` `161` `PMAP`}"
  params: []

- id: disable_snmp_port_24
  label: "Disable SNMP port 24"
  kind: action
  command: "E `A` `0` `PMAP`}"
  params: []

- id: view_snmp_port_map_24
  label: "View SNMP port map 24"
  kind: action
  command: "E `A` `PMAP`}"
  params: []

- id: enable_or_disable_one_output_cec
  label: "Enable or disable one output CEC"
  kind: action
  command: "E `O1*`X4% `CCEC`}"
  params: []

- id: enable_or_disable_all_outputs_cec
  label: "Enable or disable all outputs CEC"
  kind: action
  command: "E `O` X4%`*CCEC`}"
  params: []

- id: rediscover_device_on_output
  label: "Rediscover device on output"
  kind: action
  command: "E O1QCEC }"
  params: []

- id: report_physical_address_of_output_port
  label: "Report physical address of output port"
  kind: action
  command: "E O1PCEC }"
  params: []

- id: send_cec_data_to_output
  label: "Send CEC data to Output"
  kind: action
  command: "E `O1*`X4( `DCEC`}"
  params: []

- id: broadcast_cec_data_to_all_devices
  label: "Broadcast to all devices: Send CEC data to Output"
  kind: action
  command: "E `O1*15*`X4(`DCEC`}"
  params: []
```

## Feedbacks
```yaml
- id: view_freeze_status
  label: "View freeze status"
  kind: query
  query_command: "1F"

- id: view_mute_status
  label: "View mute status"
  kind: query
  query_command: "B"

- id: view_screen_saver_status
  label: "View screen saver status"
  kind: query
  query_command: "E `S` `1` `SSAV` }"

- id: view_logo_status
  label: "View logo status"
  kind: query
  query_command: "E `E` `1` `LOGO` }"

- id: view_slot_status
  label: "View slot status"
  kind: query
  query_command: "E X9) PLAY }"

- id: view_lock_mode_status
  label: "View lock mode status"
  kind: query
  query_command: "X"

- id: view_input_status
  label: "View input status"
  kind: query
  query_command: "E I 1 HDCP }"

- id: view_output_status
  label: "View output status"
  kind: query
  query_command: "E O 1 HDCP }"

- id: view_afl_status
  label: "View AFL status"
  kind: query
  query_command: "E 41 STAT }"

- id: view_output_cec_status
  label: "View output CEC status"
  kind: query
  query_command: "E `O1CCEC`}"
```

## Variables
```yaml
# UNRESOLVED: each X# / X! / X$ symbol in the source defines an enumerated
# value domain. These are intentionally not duplicated here as variables -
# the deterministic Actions / Feedbacks entries already carry the constraint
# ranges inline. Remove this section if no additional discrete variables
# (e.g. DHCP timeout in tens of seconds) need to be surfaced.
```

## Events
```yaml
# Covered by the Feedbacks section above (DSC-initiated messages, error
# responses, unsolicited CEC messages, playback-finished). No additional
# unsolicited events documented in the source.
```

## Macros
```yaml
# UNRESOLVED: source does not document any multi-step macro sequences.
# The CISG command is a single-line combined IP+subnet+gateway set, not a macro.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety warnings, interlock procedures,
# or power-on sequencing requirements beyond a note that performing an Absolute
# System Reset (`E ZQQQ }`) reverts the administrator password to `extron`.
# Reset commands (`ZXXX`, `ZQQQ`, `ZY`) wipe device state and should require
# operator confirmation at the application layer - but this is an operator
# concern, not documented as a device-side interlock.
```

## Notes
- **Two transports, same SIS protocol.** SSH on TCP/22023 is the default for IP control; Telnet on TCP/23 is disabled at the factory and must be re-enabled via the `MT` command family. An IP-over-USB path on `203.0.113.22:22023` is also exposed through the front-panel USB Config port for direct host connection without a network.
- **Auth model.** SSH auth uses `admin` / `user` usernames (default), with the password defaulting to the unit serial number for a fresh unit and `extron` after an Absolute System Reset (`E ZQQQ }`). The DSC 401 A supports separate administrator and user accounts; if the two passwords match, the unit grants administrator privileges.
- **DSC 401 vs DSC 401 A.** The source covers both part numbers (60-1878-01 = DSC 401, 60-1878-02 = DSC 401 A). Several commands are explicitly marked "DSC 401 A only" — image shift/size, freeze, logos, presets, audio file playback, Accu-Frame Lock (AFL), CEC, scaler bypass, and key effects. Attempting these on the base DSC 401 returns `E14`.
- **Verbose modes.** X3$ = `0` (none, default), `1` (verbose), `2` (tagged query responses), `3` (verbose + tagged). In verbose modes 2/3 the device prepends the command mnemonic (e.g. `Aspr`, `Vmt`, `Rate`) to responses. Verbose mode is also what drives unsolicited event messages on internal state changes.
- **Command termination.** No special begin/end characters are required; the scaler uses bare ASCII commands. Responses end with CR/LF (`]` in the source's notation). The escape character is `E` (or `W`), with `}` or `|` meaning CR without LF.
- **Default IP.** When DHCP is off, the factory IP is `192.168.254.254`. After changing any IP setting (`CN`, `CI`, `CS`, `CG`, `DH`, `CISG`), the network reboot command `E 2BOOT }` must be issued for the change to take effect.
- **Port remapping rules.** Duplicate TCP/UDP port assignments are rejected (`E13`). Remapping is permitted only to defaults (`23`, `80`, `161`) or to ports `>=1024`, or to `0` to disable.
- **HDCP / output format caveats.** DVI mode on the HDMI output is only valid up to a 165 MHz pixel clock; selecting a higher rate in DVI mode auto-falls-back to HDMI RGB 444 Full.
- **File name restrictions.** File names use `[A-Za-z0-9_]` only, must not end with `_`, and start with a letter or digit. Preset names exclude `,`, `*`, `|`.
- **Power-save auto-exit.** Power-save mode can be exited by `E 0 PSAV }`, by any front-panel button press, or by connecting via PCS (Extron configuration software).
- **Reset distinction.** `ZXXX` resets device settings only; `ZQQQ` additionally resets DHCP and IP to factory; `ZY` is identical to `ZQQQ` but preserves IP/subnet/gateway/DHCP/port mapping.
- **Image shift / size restrictions on base model.** `HCTR`, `VCTR`, `HSIZ`, `VSIZ` are view-only on the DSC 401; setting attempts produce `E14`.

<!-- UNRESOLVED: voltage, current, and power-draw specifications are not stated in the SIS command reference and are intentionally not populated. Port numbers above are taken verbatim from the source. No baud-rate is populated because the device is TCP-only per the source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - manualslib.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3539-01_C_DSC_401.pdf
  - https://www.manualslib.com/manual/2110024/Extron-Electronics-Dsc-401.html
retrieved_at: 2026-05-15T02:04:45.357Z
last_checked_at: 2026-10-07T18:45:01.465Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T18:45:01.465Z
matched_actions: 214
action_count: 214
confidence: medium
summary: "All 214 action units match source SIS command tables with correct shapes; transport values (22023, 192.168.254.254, admin, Telnet 23) are supported; coverage is essentially complete. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware compatibility range not stated in source; only the placeholder format `V n.nn` is referenced in the copyright banner."
- "each X# / X! / X$ symbol in the source defines an enumerated"
- "source does not document any multi-step macro sequences."
- "source contains no explicit safety warnings, interlock procedures,"
- "voltage, current, and power-draw specifications are not stated in the SIS command reference and are intentionally not populated. Port numbers above are taken verbatim from the source. No baud-rate is populated because the device is TCP-only per the source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
