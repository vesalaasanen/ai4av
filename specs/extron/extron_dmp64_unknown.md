---
spec_id: admin/extron-dmp64
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron DMP 64 Control Spec"
manufacturer: Extron
model_family: "DMP 64"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "DMP 64"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://www.extron.com/download/files/userman/DMP64_68-1790-01_D.pdf
  - "https://aca.im/driver_docs/Extron/Extron%20DMP64%20DSP.pdf"
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicDmp64UsersManual542412.664965910.pdf
  - https://www.extron.com
retrieved_at: 2026-06-14T23:52:53.644Z
last_checked_at: 2026-06-24T22:59:18.763Z
generated_at: 2026-06-24T22:59:18.763Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility not stated in source."
  - "source describes event buffer read/write commands (E, FE) and event logging"
  - "no multi-step SIS sequences described in source (presets are single-command"
  - "source contains no explicit safety interlocks, power-sequencing warnings, or"
  - "firmware version compatibility not stated."
  - "exact event-notification message formats (beyond boot banner) not documented."
  - "factory-installed HTML page set beyond System Status / Configuration / File Management / Control tabs — not enumerated as URLs."
verification:
  verdict: verified
  checked_at: 2026-06-24T22:59:18.763Z
  matched_actions: 101
  action_count: 101
  confidence: medium
  summary: "deterministic presence proof: 101/101 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-25
---

# Extron DMP 64 Control Spec

## Summary
Extron DMP 64 is a 6×4 digital matrix processor / audio mixer with mic/line inputs, virtual returns, and DSP processing blocks. This spec covers SIS (Simple Instruction Set) control over RS-232, Telnet (TCP port 23), and HTTP (web browser, port 80), plus USB front-panel configuration. SIS commands address audio gain/trim/mute, mix-points (input-to-output routing), group masters, presets, device configuration (IP, time, passwords), file management, and a PIN-protected configuration store.

<!-- UNRESOLVED: firmware version compatibility not stated in source. -->

## Transport
```yaml
protocols:
  - serial
  - tcp
  - http
serial:
  baud_rate: 38400
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none  # stated as "no flow control"
addressing:
  port: 23  # Telnet default; web browser default port is 80 (also stated)
auth:
  type: password  # documented administrator/user password system; factory default = device serial number
  # NOTE: auth is per-transport. Ethernet (Telnet + web) is password-protected;
  # RS-232 and USB serial connections are NOT password-protected per source.
```

## Traits
```yaml
traits:
  - levelable  # inferred: per-input gain, pre-mixer gain, mix-point gain, trim, output volume controls documented
  - queryable  # inferred: numerous Q-prefixed and read/view commands returning values
  - routable   # inferred: mix-point gain controls (X6) route signal from input to output / virtual return
```

## Actions
```yaml
- id: firmware_version
  label: "Firmware Version"
  kind: action
  command: "Q"
  params: []

- id: firmware_and_build_version
  label: "Firmware and build version"
  kind: action
  command: "*Q"
  params: []

- id: kernel_firmware_and_build
  label: "Kernel firmware and build"
  kind: action
  command: "Q"
  params: []

- id: verbose_version_info
  label: "Verbose version info"
  kind: action
  command: "0Q"
  params: []

- id: firmware_version_2
  label: "Firmware version"
  kind: action
  command: "1Q"
  params: []

- id: bootstrap_version
  label: "Bootstrap Version"
  kind: action
  command: "2Q"
  params: []

- id: factory_firmware_version
  label: "Factory Firmware Version"
  kind: action
  command: "3Q"
  params: []

- id: updated_firmware_version
  label: "Updated firmware version"
  kind: action
  command: "4Q"
  params: []

- id: set_unit_name
  label: "Set unit name"
  kind: action
  command: "E X1@ CN }"
  params: []

- id: view_unit_name
  label: "View unit name"
  kind: action
  command: "E CN }"
  params: []

- id: set_name_to_factory_default
  label: "Set name to factory default"
  kind: action
  command: "E • CN }"
  params: []

- id: set_time_and_date
  label: "Set time and date"
  kind: action
  command: "E X1# CT }"
  params: []

- id: view_time_and_date
  label: "View time and date"
  kind: action
  command: "E CT }"
  params: []

- id: set_gmt_offset
  label: "Set GMT offset"
  kind: action
  command: "E X# CZ }"
  params: []

- id: view_gmt_offset
  label: "View GMT offset"
  kind: action
  command: "E CZ }"
  params: []

- id: set_daylight_saving_time
  label: "Set Daylight Saving Time"
  kind: action
  command: "E X3$ CX }"
  params: []

- id: set_ip_address
  label: "Set IP address"
  kind: action
  command: "E X1$ CI }"
  params: []

- id: set_subnet_mask
  label: "Set subnet mask"
  kind: action
  command: "E X1( CS }"
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

- id: set_dhcp_on
  label: "Set DHCP on"
  kind: action
  command: "E 1 DH }"
  params: []

- id: set_dhcp_off
  label: "Set DHCP off"
  kind: action
  command: "E 0 DH }"
  params: []

- id: set_verbose_mode
  label: "Set verbose mode"
  kind: action
  command: "E X2@ CV }"
  params: []

- id: view_verbose_mode
  label: "View verbose mode"
  kind: action
  command: "E CV }"
  params: []

- id: set_administrator_password
  label: "Set administrator password"
  kind: action
  command: "E X3# CA }"
  params: []

- id: view_administrator_password
  label: "View administrator password"
  kind: action
  command: "E CA }"
  params: []

- id: reset_clear_administrator_password
  label: "Reset (clear) administrator password"
  kind: action
  command: "E • CA }"
  params: []

- id: set_user_password
  label: "Set user password"
  kind: action
  command: "E X3# CU }"
  params: []

- id: view_user_password
  label: "View user password"
  kind: action
  command: "E CU }"
  params: []

- id: reset_clear_user_password
  label: "Reset (clear) user password"
  kind: action
  command: "E • CU }"
  params: []

- id: set_current_port_timeout
  label: "Set current port timeout"
  kind: action
  command: "E 0* X6( TC }"
  params: []

- id: view_current_port_timeout
  label: "View current port timeout"
  kind: action
  command: "E 0 TC }"
  params: []

- id: set_global_ip_port_timeout
  label: "Set global IP port timeout"
  kind: action
  command: "E 1* X6( TC }"
  params: []

- id: view_global_ip_port_timeout
  label: "View global IP port timeout"
  kind: action
  command: "E 1 TC }"
  params: []

- id: erase_user_supplied_web_page_file
  label: "Erase user-supplied web page file"
  kind: action
  command: "E filename EF }"
  params: []

- id: erase_current_directory
  label: "Erase current directory"
  kind: action
  command: "E / EF }"
  params: []

- id: erase_current_directory_and_sub_directories
  label: "Erase current directory and sub-directories"
  kind: action
  command: "E // EF }"
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

- id: send_data_string
  label: "Send Data String"
  kind: action
  command: "E X! * X1& * X2) * X2! RS }"
  params: []

- id: configure_parameters
  label: "Configure parameters"
  kind: action
  command: "E X! * X2% , X2^ , X2& , X2* CP }"
  params: []

- id: view_serial_port_parameters
  label: "View serial port parameters"
  kind: action
  command: "E X! CP }"
  params: []

- id: configure_rcv_timeout
  label: "Configure rcv timeout"
  kind: action
  command: "E X! * X1& * X2) * X2# * X2! CE }"
  params: []

- id: view_receive_timeout
  label: "View receive timeout"
  kind: action
  command: "E X! CE }"
  params: []

- id: write_event_buffer_memory
  label: "Write event buffer memory"
  kind: action
  command: "E X3% , X3^ , X3( , X3* E }"
  params: []

- id: write_string_to_event_buffer
  label: "Write string to event buffer"
  kind: action
  command: "E {string} * X3% , ... FE }"
  params: []

- id: write_preset_name
  label: "Write preset name"
  kind: action
  command: "E X1) , X1! NG }"
  params: []

- id: recall_a_preset
  label: "Recall a preset"
  kind: action
  command: "X1) . Rpr X1) ]"
  params: []

- id: write_input_name
  label: "Write input name"
  kind: action
  command: "E X# , X1! NI }"
  params: []

- id: write_output_name
  label: "Write output name"
  kind: action
  command: "E X@ , X1! NO }"
  params: []

- id: reset_presets_and_names
  label: "Reset presets and names"
  kind: action
  command: "E ZG }"
  params: []

- id: reset_an_individual_preset
  label: "Reset an individual preset"
  kind: action
  command: "E X1) ZG }"
  params: []

- id: reset_a_group
  label: "Reset a group"
  kind: action
  command: "E Z X2) GRPM }"
  params: []

- id: reset_flash_erase_user_supplied_files
  label: "Reset flash (erase user-supplied files)"
  kind: action
  command: "E ZFFF }"
  params: []

- id: system_reset_factory_defaults
  label: "System Reset (factory defaults)"
  kind: action
  command: "E ZXXX }"
  params: []

- id: reset_all_device_settings_and_delete_files
  label: "Reset all device settings and delete files"
  kind: action
  command: "E ZY }"
  params: []

- id: absolute_reset
  label: "Absolute reset"
  kind: action
  command: "E ZQQQ }"
  params: []

- id: set_a_trim_or_gain_excluding_mic_line_inputs
  label: "Set a trim or gain (excluding mic/line inputs)"
  kind: action
  command: "E G X6) * X6! AU }"
  params: []

- id: example_1_pre_mixer_gain
  label: "Example 1 (pre-mixer gain)"
  kind: action
  command: "E G 40105 * 2040 AU }"
  params: []

- id: example_2_mix_point_gain
  label: "Example 2 (mix-point gain)"
  kind: action
  command: "E G 20001 * 2213 AU }"
  params: []

- id: set_a_mic_line_gain
  label: "Set a mic/line gain"
  kind: action
  command: "E G X6) * X6@ AU }"
  params: []

- id: example
  label: "Example"
  kind: action
  command: "E G 40001 * 2288 AU }"
  params: []

- id: set_output_volume
  label: "Set Output Volume"
  kind: action
  command: "E G X6) * X6# AU }"
  params: []

- id: example_2
  label: "Example"
  kind: action
  command: "E G 60000 * 1548 AU }"
  params: []

- id: set_a_group_fader_control
  label: "Set a group fader control"
  kind: action
  command: "E `D` X6% `*` X6^ `GRPM` }"
  params: []

- id: example_3
  label: "Example"
  kind: action
  command: "E `d2*-293*GRPM` }"
  params: []

- id: raise_a_group_fader_control
  label: "Raise a group fader control"
  kind: action
  command: "E `D` X6% `*` X6& `+GRPM` }"
  params: []

- id: example_4
  label: "Example"
  kind: action
  command: "E `d2*30+GRPM` }"
  params: []

- id: lower_a_group_fader_control
  label: "Lower a group fader control"
  kind: action
  command: "E `D` X6% `*` X6& `-GRPM` }"
  params: []

- id: view_the_group_fader_control_level
  label: "View the group fader control level"
  kind: action
  command: "E `D` X6% `GRPM` }"
  params: []

- id: mute_a_group_mute_control
  label: "Mute a group mute control"
  kind: action
  command: "E D X6% `*1GRPM` }"
  params: []

- id: clear_unmute_a_group_mute_control
  label: "Clear (unmute) a group mute control"
  kind: action
  command: "E D X6% `*0GRPM` }"
  params: []

- id: view_a_group_mute_control
  label: "View a group mute control"
  kind: action
  command: "E D X6% `GRPM` }"
  params: []

- id: set_soft_limits
  label: "Set soft limits"
  kind: action
  command: "E L X6% * X6* upper * X6* lower GRPM }"
  params: []

- id: example_5
  label: "Example"
  kind: action
  command: "E `L2*+60*-60GRPM` }"
  params: []

- id: view_soft_limits
  label: "View soft limits"
  kind: action
  command: "E L X6% `GRPM` }"
  params: []

- id: view_group_type
  label: "View group type"
  kind: action
  command: "E P X6% `GRPM` }"
  params: []

- id: view_group_members
  label: "View group members"
  kind: action
  command: "E `O` X6% `GRPM` }"
  params: []

- id: save_the_configuration
  label: "Save the configuration"
  kind: action
  command: "E S X7) `PCFG` }"
  params: []

- id: recall_the_configuration
  label: "Recall the configuration"
  kind: action
  command: "E `R` `PCFG` }"
  params: []

- id: change_the_pin
  label: "Change the PIN"
  kind: action
  command: "E P X7)old * X7)new `PCFG` }"
  params: []
```

## Feedbacks
```yaml
- id: query_part_number
  label: "Query part number"
  kind: query
  query_command: "N"

- id: query_model_name
  label: "Query model name"
  kind: query
  query_command: "I"

- id: query_model_name_2
  label: "Query model name"
  kind: query
  query_command: "1I"

- id: query_model_description
  label: "Query model description"
  kind: query
  query_command: "2I"

- id: query_system_memory_usage
  label: "Query system memory usage"
  kind: query
  query_command: "3I"

- id: query_user_memory_usage
  label: "Query user-memory usage"
  kind: query
  query_command: "4I"

- id: read_daylight_saving_time
  label: "Read Daylight Saving Time"
  kind: query
  query_command: "E CX }"

- id: read_ip_address
  label: "Read IP address"
  kind: query
  query_command: "E CI }"

- id: read_hardware_address_mac
  label: "Read hardware address (MAC)"
  kind: query
  query_command: "E CH }"

- id: read_subnet_mask
  label: "Read subnet mask"
  kind: query
  query_command: "E CS }"

- id: view_dhcp_status
  label: "View DHCP status"
  kind: query
  query_command: "E DH }"

- id: get_connection_listing
  label: "Get connection listing"
  kind: query
  query_command: "E CC }"

- id: query_session_security_level
  label: "Query session security level"
  kind: query
  query_command: "E CK }"

- id: read_event_buffer_memory
  label: "Read event buffer memory"
  kind: query
  query_command: "E X3% , X3^ , X3& , X3* E }"

- id: read_string_from_event_buffer
  label: "Read string from event buffer"
  kind: query
  query_command: "E X3% , X3^ , X3& , X4$ FE }"

- id: read_preset_name
  label: "Read preset name"
  kind: query
  query_command: "E X1) NG }"

- id: read_input_name
  label: "Read input name"
  kind: query
  query_command: "E X# NI }"

- id: read_output_name
  label: "Read output name"
  kind: query
  query_command: "E X@ NO }"

- id: read_a_trim_or_mix
  label: "Read a trim or mix"
  kind: query
  query_command: "E G X6) AU }"

- id: query_configuration_saved_status
  label: "Query configuration saved status"
  kind: query
  query_command: "E `Q` `PCFG` }"
```

## Variables
```yaml
# Settable parameters already represented as Actions (audio level, IP, time, passwords,
# presets, group masters, PIN). No additional standalone variables required.
```

## Events
```yaml
# UNRESOLVED: source describes event buffer read/write commands (E, FE) and event logging
# toggle (hardware Mode 3), but does not document unsolicited event-notification message
# formats beyond the copyright/boot banner on Telnet connect.
```

## Macros
```yaml
# UNRESOLVED: no multi-step SIS sequences described in source (presets are single-command
# recall: "X1).RprX1)]").
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no explicit safety interlocks, power-sequencing warnings, or
# confirmation requirements tied to SIS commands. Hardware reset modes (1/3/4/5) are
# documented as physical-button procedures, not SIS interlocks. Note: power-cycle note
# recommends issuing "2FF" or DSP Configurator save before disconnecting power to avoid
# losing adjustments - operational guidance, not a safety interlock.
```

## Notes
- **Two RS-232 ports** on rear panel (labeled RS-232 (1) and (2)); both require 38400 baud — higher than many other Extron products. Third serial-style channel via front-panel USB (Extron USB driver required).
- **Command framing:** SIS commands need no special start/end characters. Device responses terminate with CR/LF (hex `0D 0A`). Symbols: `]`=CR/LF, `}`=CR (no LF), `E`=Escape (hex `1B`), `*`=asterisk literal, `•`=space.
- **Web browser access:** URL-encoded form — prefix commands with `http://{ip}/page.html?cmd=`; Escape→`W`, CR→pipe `|`. Non-alphanumeric chars (space, %, +, etc.) must be `%xx` hex-encoded.
- **Copyright/boot banner on Telnet connect:** `© Copyright YYYY, Extron Electronics, DMP 64, Vn.nn, 60–1054-01` followed by date/time, then optional `Password:` prompt.
- **Error codes:** E01 (invalid input #), E12 (invalid port), E13 (param out of range), E14 (not valid for config), E17 (system timeout), E22 (busy), E23 (checksum error on file upload), E24 (privilege violation), E25 (device not present), E26 (max connections exceeded), E27 (invalid event #), E28 (bad filename).
- **DSP control addressing:** level controls use 5-digit `X6)` codes — `40000-40005` (mic/line gain), `40100-40105` (pre-mixer gain), `60000-60003` (output volume), `50000-50003` (virtual return gain), `20000-20507` (main mix-points), `20600-20907` (virtual-return mix-points). Gain values `X6!`/`X6@`/`X6#` encode dB in 0.1 dB steps via offset integer codes (see source Tables 2–6).
- **Group masters:** numbered 1–32; fader level X6^ in 0.1 dB units (e.g. `-293` = −29.3 dB); group type X6( is 6 (gain) or 12 (mute). Soft limits enforced; out-of-range values return E13.
- **Protected config (PCFG):** PIN-protected snapshot of mic mixes/params/variables (excludes IP address); default PIN `0000`.
- **Invalid filename/name chars:** space, `+ ~ , @ = ' [ ] { } < > " ; : \ ?`.

<!-- UNRESOLVED: firmware version compatibility not stated. -->
<!-- UNRESOLVED: exact event-notification message formats (beyond boot banner) not documented. -->
<!-- UNRESOLVED: factory-installed HTML page set beyond System Status / Configuration / File Management / Control tabs — not enumerated as URLs. -->
```

规格说明已完成。已按预扫描（pre-pass）要求清空操作（Actions）/反馈（Feedbacks）主体（确定性合并逻辑会自动添加 81+20 条命令）。已覆盖传输方式：串行 38400/8/N/1、TCP 端口 23、HTTP 端口 80、可选密码验证（带 RS-232 免验证说明）。已包含特征（Traits）：可调级别、可查询、可路由 —— 全部带有推理注释。事件/宏/安全（Safety）部分已留作 UNRESOLVED 占位符。

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - aca.im
  - usermanual.wiki
source_urls:
  - https://media.extron.com/public/download/files/userman/DMP64_68-1790-01_D.pdf
  - https://www.extron.com/download/files/userman/DMP64_68-1790-01_D.pdf
  - "https://aca.im/driver_docs/Extron/Extron%20DMP64%20DSP.pdf"
  - https://usermanual.wiki/Extron-Electronic/ExtronElectronicDmp64UsersManual542412.664965910.pdf
  - https://www.extron.com
retrieved_at: 2026-06-14T23:52:53.644Z
last_checked_at: 2026-06-24T22:59:18.763Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-24T22:59:18.763Z
matched_actions: 101
action_count: 101
confidence: medium
summary: "deterministic presence proof: 101/101 payloads verbatim in source; stratified Sonnet sample corroborated (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility not stated in source."
- "source describes event buffer read/write commands (E, FE) and event logging"
- "no multi-step SIS sequences described in source (presets are single-command"
- "source contains no explicit safety interlocks, power-sequencing warnings, or"
- "firmware version compatibility not stated."
- "exact event-notification message formats (beyond boot banner) not documented."
- "factory-installed HTML page set beyond System Status / Configuration / File Management / Control tabs — not enumerated as URLs."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
