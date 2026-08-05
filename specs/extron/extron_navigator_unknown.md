---
spec_id: admin/extron-navigator
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron NAVigator Control Spec"
manufacturer: Extron
model_family: NAVigator
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - NAVigator
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - aca.im
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2740-01_F_NAVigator-UG__.pdf
  - https://aca.im/driver_docs/Extron/PDU_IPL_T_PCS4.pdf
  - https://www.extron.com
  - https://www.manua.ls/extron/navigator/manual
  - https://www.extron.com/product/navigator
retrieved_at: 2026-07-24T19:07:06.245Z
last_checked_at: 2026-08-05T08:22:26.426Z
generated_at: 2026-08-05T08:22:26.426Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "required LinkLicense entitlement and SSH authentication procedure are not fully specified in source."
  - "source identifies secure SSH control and a Third-Party Control LinkLicense but does not specify SSH credentials or authentication procedure"
  - "source does not describe explicit multi-step macros"
  - "source provides no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "firmware compatibility range, SSH authentication details, LinkLicense requirements, alarm variable definitions, and fault recovery procedures are not fully stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:22:26.426Z
  matched_actions: 69
  action_count: 69
  confidence: medium
  summary: "All 69 spec SIS commands appear verbatim in source; transport port 22023 and HTTPS confirmed; no source commands missing from spec. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Extron NAVigator Control Spec

## Summary

Extron NAVigator is a NAV Pro AV over IP system manager. This spec covers remote control, monitoring, configuration, AV and USB routing, WindoWall control, network configuration, and endpoint command encapsulation using SIS over SSH.

<!-- UNRESOLVED: required LinkLicense entitlement and SSH authentication procedure are not fully specified in source. -->

## Transport

```yaml
protocols:
  - tcp
  - http
addressing:
  port: 22023
  base_url: "https://{navigator-address}/"
auth:
  type: null  # UNRESOLVED: source identifies secure SSH control and a Third-Party Control LinkLicense but does not specify SSH credentials or authentication procedure
```

SIS commands use SSH port `22023`. HTTPS defaults to port `443`; both ports can be changed to non-overlapping values from `1024` through `65535`, or disabled with `0`. SIS responses end with carriage return and line feed.

## Traits

```yaml
- routable  # inferred from AV and USB routing commands
- queryable  # inferred from query command examples
```

## Actions

```yaml
- id: tie_video_audio
  label: Tie Video and Audio
  kind: action
  command: "EX!*X@!}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: tie_video
  label: Tie Video
  kind: action
  command: "EX!*X@%}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: tie_audio
  label: Tie Audio
  kind: action
  command: "EX!*X@$}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: tie_usb
  label: Tie USB Host to Device
  kind: action
  command: "EX!X#*X@X#^}"
  params:
    - name: host
      type: string
      description: "X!: host number, case-sensitive device name, or IP address"
    - name: host_type
      type: string
      description: "X#: i for encoder when host is identified by number"
    - name: device
      type: string
      description: "X@: USB device number, case-sensitive device name, or IP address"
    - name: device_type
      type: string
      description: "X#: o for decoder when device is identified by number"

- id: tie_video_audio_all
  label: Tie Video and Audio to All Outputs
  kind: action
  command: "EX!*!}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"

- id: clear_all_av_ties
  label: Clear All AV Ties
  kind: action
  command: "E0*!}"
  params: []

- id: clear_all_usb_ties
  label: Clear All USB Ties
  kind: action
  command: "E0i*^}"
  params: []

- id: tie_video_all
  label: Tie Video to All Outputs
  kind: action
  command: "EX!*%}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"

- id: tie_audio_all
  label: Tie Audio to All Outputs
  kind: action
  command: "EX!*$}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"

- id: untie_av_output
  label: Untie AV Output
  kind: action
  command: "E00*X@!}"
  params:
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: untie_av_input
  label: Untie AV Input
  kind: action
  command: "EX!*00!}"
  params:
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"

- id: quick_multiple_tie
  label: Quick Multiple Tie
  kind: action
  command: "E+QX!*X@!...X!*X@&}"
  params:
    - name: ties
      type: string
      description: "One or more input/output tie expressions using ! for AV, % for video, or $ for audio"

- id: recall_windowall_preset
  label: Recall WindoWall Preset
  kind: action
  command: "ER1*X$*X%PRST}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: preset
      type: integer
      description: "X%: preset number 1 through 8"

- id: view_last_windowall_preset
  label: View Last Recalled WindoWall Preset
  kind: query
  command: "EL1*X$PRST}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"

- id: select_windowall_input
  label: Select WindoWall Input
  kind: action
  command: "EX$*X^*X!!X}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: window
      type: integer
      description: "X^: window number 1 through 64"
    - name: input
      type: string
      description: "X!: input number, case-sensitive device name, or IP address"

- id: view_windowall_input
  label: View Current WindoWall Input
  kind: query
  command: "EX$*X^!X}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: window
      type: integer
      description: "X^: window number 1 through 64"

- id: mute_window
  label: Mute WindoWall Window
  kind: action
  command: "X$*X^*1B}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: window
      type: integer
      description: "X^: window number 1 through 64"

- id: unmute_window
  label: Unmute WindoWall Window
  kind: action
  command: "X$*X^*0B}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: window
      type: integer
      description: "X^: window number 1 through 64"

- id: view_window_mute
  label: View WindoWall Window Mute Status
  kind: query
  command: "X$*X^B}"
  params:
    - name: canvas
      type: integer
      description: "X$: canvas number 1 through 8"
    - name: window
      type: integer
      description: "X^: window number 1 through 64"

- id: recall_workstation_preset
  label: Recall KVM Workstation Preset
  kind: action
  command: "ER3*X**X(PRST}"
  params:
    - name: workstation
      type: integer
      description: "X*: workstation number 1 through 30"
    - name: preset
      type: integer
      description: "X(: workstation preset number 1 through 30"

- id: view_last_workstation_preset
  label: View Last Recalled KVM Workstation Preset
  kind: query
  command: "EL3*X*PRST}"
  params:
    - name: workstation
      type: integer
      description: "X*: workstation number 1 through 30"

- id: view_video_audio_tie
  label: View Video and Audio Tie
  kind: query
  command: "EX@!}"
  params:
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: view_video_tie
  label: View Video Tie
  kind: query
  command: "EX@%}"
  params:
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: view_audio_tie
  label: View Audio Tie
  kind: query
  command: "EX@$}"
  params:
    - name: output
      type: string
      description: "X@: output number, case-sensitive device name, or IP address"

- id: show_nav_system_size
  label: Show NAV System Size
  kind: query
  command: "I}"
  params: []

- id: view_model_name
  label: View Model Name
  kind: query
  command: "1I}"
  params: []

- id: view_model_description
  label: View Model Description
  kind: query
  command: "2I}"
  params: []

- id: view_connected_users
  label: View Number of Connected Users
  kind: query
  command: "10I}"
  params: []

- id: view_igmp_querier
  label: View IGMP Querier
  kind: query
  command: "50I}"
  params: []

- id: view_serial_number
  label: View Device Serial Number
  kind: query
  command: "98I}"
  params: []

- id: view_internal_temperature
  label: View Internal Temperature
  kind: query
  command: "E20STAT}"
  params: []

- id: view_linklicense_status
  label: View LinkLicense Status
  kind: query
  command: "ELELIC}"
  params: []

- id: view_part_number
  label: View Part Number
  kind: query
  command: "N}"
  params: []

- id: read_firmware_version
  label: Read Firmware Version
  kind: query
  command: "Q}"
  params: []

- id: read_full_firmware_version
  label: Read Full Firmware Version
  kind: query
  command: "*Q}"
  params: []

- id: read_advanced_firmware_version
  label: Read Advanced Firmware Version
  kind: query
  command: "20Q}"
  params: []

- id: set_navigator_name
  label: Set NAVigator Name
  kind: action
  command: "EX2)CN}"
  params:
    - name: name
      type: string
      description: "X2): NAVigator name"

- id: read_navigator_name
  label: Read NAVigator Name
  kind: query
  command: "ECN}"
  params: []

- id: reset_navigator_name
  label: Reset NAVigator Name to Factory Default
  kind: action
  command: "E CN}"
  params: []

- id: set_verbose_mode
  label: Set Verbose Mode
  kind: action
  command: "EX2!CV}"
  params:
    - name: mode
      type: integer
      description: "X2!: verbose mode value"

- id: read_verbose_mode
  label: Read Verbose Mode
  kind: query
  command: "ECV}"
  params: []

- id: report_all_av_ties
  label: Report All AV Ties
  kind: query
  command: "ETies*A*RPRT}"
  params: []

- id: report_all_usb_ties
  label: Report All USB Ties
  kind: query
  command: "ETies*U*RPRT}"
  params: []

- id: view_active_alarm_count
  label: View Number of Active Alarms
  kind: query
  command: "55I}"
  params: []

- id: view_active_alarms
  label: View Active Alarms
  kind: query
  command: "EVX2^ALRM}"
  params:
    - name: alarm_count
      type: integer
      description: "X2^: number of active alarms"

- id: view_device_online_status
  label: View Device Online Status
  kind: query
  command: "EP*X2$DEVP}"
  params:
    - name: endpoint
      type: string
      description: "X2$: endpoint identifier"

- id: view_device_connection_status
  label: View Device Connection Status
  kind: query
  command: "EC*X2$DEVP}"
  params:
    - name: endpoint
      type: string
      description: "X2$: endpoint identifier"

- id: view_device_assignment_status
  label: View Device Assignment Status
  kind: query
  command: "EA*X2$DEVP}"
  params:
    - name: endpoint
      type: string
      description: "X2$: endpoint identifier"

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  command: "EZQQQ}"
  params: []

- id: report_input_inventory
  label: Report Input Inventory
  kind: query
  command: "EInventory*I*RPRT}"
  params: []

- id: report_output_inventory
  label: Report Output Inventory
  kind: query
  command: "EInventory*O*RPRT}"
  params: []

- id: set_dhcp_on
  label: Enable DHCP
  kind: action
  command: "EX3!*1DHCP}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"

- id: set_dhcp_off
  label: Disable DHCP
  kind: action
  command: "EX3!*0DHCP}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"

- id: view_dhcp_status
  label: View DHCP Status
  kind: query
  command: "EDHCP}"
  params: []

- id: set_ip_address
  label: Set IP Address
  kind: action
  command: "EX3!*X3$CISG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: ip_address
      type: string
      description: "X3$: IPv4 address"

- id: set_ip_and_subnet_mask
  label: Set IP Address and Subnet Mask
  kind: action
  command: "EX3!*X3$[IP]*X3$[Subnet]CISG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: ip_address
      type: string
      description: "X3$[IP]: IPv4 address"
    - name: subnet_mask
      type: string
      description: "X3$[Subnet]: subnet mask"

- id: set_ip_and_subnet_prefix
  label: Set IP Address and Subnet Prefix
  kind: action
  command: "EX3!*X3$[IP]/X3@[Subnet]CSIG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: ip_address
      type: string
      description: "X3$[IP]: IPv4 address"
    - name: subnet_prefix
      type: integer
      description: "X3@[Subnet]: subnet prefix length"

- id: set_ip_subnet_and_gateway
  label: Set IP Address Subnet Mask and Gateway
  kind: action
  command: "EX3!*X3$[IP]*X3$[Subnet]*X3$[Gateway]CISG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: ip_address
      type: string
      description: "X3$[IP]: IPv4 address"
    - name: subnet_mask
      type: string
      description: "X3$[Subnet]: subnet mask"
    - name: gateway
      type: string
      description: "X3$[Gateway]: gateway IPv4 address"

- id: set_ip_prefix_and_gateway
  label: Set IP Address Subnet Prefix and Gateway
  kind: action
  command: "EX3!*X3$[IP]/X3@[Subnet]*X3$[Gateway]CISG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: ip_address
      type: string
      description: "X3$[IP]: IPv4 address"
    - name: subnet_prefix
      type: integer
      description: "X3@[Subnet]: subnet prefix length"
    - name: gateway
      type: string
      description: "X3$[Gateway]: gateway IPv4 address"

- id: view_ip_subnet_and_gateway
  label: View IP Address Subnet and Gateway
  kind: query
  command: "EX3!*CISG}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"

- id: set_dns_addresses
  label: Set DNS Addresses
  kind: action
  command: "EX3!*X3$[1]*X3$[2]*X3$[3]DNSS}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"
    - name: dns_addresses
      type: string
      description: "Up to three X3$ DNS server IPv4 addresses"

- id: clear_dns_addresses
  label: Clear All DNS Addresses
  kind: action
  command: "EX3!* DNSS}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"

- id: view_dns_address
  label: View DNS Address
  kind: query
  command: "EX3!DNSS}"
  params:
    - name: interface
      type: integer
      description: "X3!: 1 for OOB LAN or 2 for NAV LAN"

- id: view_mac_address
  label: View MAC Address
  kind: query
  command: "ECH}"
  params: []

- id: enable_echo
  label: Enable SIS Echo
  kind: action
  command: "E1ECHO}"
  params: []

- id: disable_echo
  label: Disable SIS Echo
  kind: action
  command: "E0ECHO}"
  params: []

- id: view_echo_status
  label: View SIS Echo Status
  kind: query
  command: "EECHO}"
  params: []

- id: send_command_to_encoder
  label: Send Encapsulated Command to Encoder
  kind: action
  command: "{X4!:< SIS command >}\\r}"
  params:
    - name: encoder
      type: string
      description: "X4!: input number followed by I, case-sensitive endpoint name, or IP address"
    - name: sis_command
      type: string
      description: Valid SIS command for targeted encoder

- id: send_command_to_decoder
  label: Send Encapsulated Command to Decoder
  kind: action
  command: "{X4#:< command >}\\r}"
  params:
    - name: decoder
      type: string
      description: "X4#: output number followed by O, case-sensitive endpoint name, or IP address"
    - name: sis_command
      type: string
      description: Valid SIS command for targeted decoder
```

## Feedbacks

```yaml
- id: command_response
  type: string
  terminator: "CR/LF"
  description: Valid commands produce a response terminated by carriage return and line feed.

- id: power_up_message
  type: string
  pattern: "© Copyright 20_yy_, Extron Electronics, NAVigator, V_x_._xx_, 60-_nnnn_-_nn_]"
  description: Sent when NAVigator completes startup.

- id: endpoint_assignment
  type: enum
  pattern: "DevpA*<endpoint>*<state>]"
  values:
    - unassigned
    - assigned

- id: endpoint_connection
  type: enum
  pattern: "DevpC*<endpoint>*<state>]"
  values:
    - disconnected
    - connected

- id: endpoint_online
  type: enum
  pattern: "DevpP*<endpoint>*<state>]"
  values:
    - offline
    - online

- id: hotkey_detected
  type: string
  pattern: "HkdmP*<endpoint>] or HkdmK*<endpoint>]"

- id: invalid_command
  type: error
  code: E10
  description: Invalid command

- id: invalid_port_number
  type: error
  code: E12
  description: Invalid port number

- id: invalid_parameter
  type: error
  code: E13
  description: Invalid parameter

- id: invalid_port_configuration
  type: error
  code: E14
  description: Invalid for this port configuration

- id: invalid_signal_type
  type: error
  code: E17
  description: Invalid command for signal type

- id: busy
  type: error
  code: E22
  description: Busy

- id: privilege_violation
  type: error
  code: E24
  description: Privilege violation

- id: device_not_present
  type: error
  code: E25
  description: Device not present

- id: bad_file_name
  type: error
  code: E28
  description: Bad file name or file not found

- id: maximum_ties_exceeded
  type: error
  code: E36
  description: Maximum number of ties exceeded

- id: video_audio_tie
  type: string
  pattern: "OutX@ InX! All]"

- id: video_tie
  type: string
  pattern: "OutX@ InX! Vid]"

- id: audio_tie
  type: string
  pattern: "OutX@ InX! Aud]"

- id: usb_tie
  type: string
  pattern: "OutX@X# InX!X# Usb]"

- id: quick_multiple_tie
  type: string
  pattern: "Qik]"

- id: windowall_preset
  type: integer
  range: "1-8"

- id: windowall_input
  type: string

- id: window_mute
  type: enum
  values:
    - unmuted
    - muted

- id: workstation_preset
  type: integer
  range: "1-30"

- id: nav_system_size
  type: string
  pattern: "VX1!XX1@ AX1!XX1@]"

- id: model_name
  type: string
  value: NAVigator

- id: model_description
  type: string
  value: NAV System Manager

- id: connected_users
  type: integer
  range: "0-15"

- id: igmp_querier
  type: string
  description: IPv4 address

- id: serial_number
  type: string

- id: internal_temperature
  type: string
  pattern: "xxxF xxC"

- id: linklicense_status
  type: object
  description: JSON object containing licensed feature name, description, status, serial number, expiration date, data, and part number.

- id: part_number
  type: string
  pattern: "60-nnnn-01"

- id: firmware_version
  type: string
  pattern: "x.xx"

- id: full_firmware_version
  type: string
  pattern: "x.xx.xxxx"

- id: advanced_firmware_version
  type: string

- id: navigator_name
  type: string

- id: verbose_mode
  type: integer

- id: av_tie_report
  type: string
  description: Tab-delimited table of AV ties.

- id: usb_tie_report
  type: string
  description: Tab-delimited table of USB ties.

- id: active_alarm_count
  type: integer

- id: active_alarms
  type: string
  pattern: "I/O: [endpoint],Event: [event],Severity: [severity],Time: yyyy-mm-ddThh:mm:ssZ"

- id: device_online
  type: enum
  values:
    - offline
    - online

- id: device_connected
  type: enum
  values:
    - disconnected
    - connected

- id: device_assigned
  type: enum
  values:
    - unassigned
    - assigned

- id: input_inventory
  type: string
  description: Connection status for all assigned inputs.

- id: output_inventory
  type: string
  description: Connection status for all assigned outputs.

- id: dhcp_status
  type: enum
  values:
    - disabled
    - enabled

- id: network_configuration
  type: string
  pattern: "X3$[IP]/X3@[Subnet]*X3$[Gateway]"

- id: dns_address
  type: string
  description: IPv4 address

- id: mac_address
  type: string

- id: echo_status
  type: enum
  values:
    - disabled
    - enabled

- id: encapsulated_endpoint_response
  type: string
  pattern: "{X}<Response>]"
```

## Variables

```yaml
- id: navigator_name
  type: string
  set_command: "EX2)CN}"
  query_command: "ECN}"

- id: verbose_mode
  type: integer
  set_command: "EX2!CV}"
  query_command: "ECV}"

- id: dhcp_enabled
  type: boolean
  set_commands:
    enabled: "EX3!*1DHCP}"
    disabled: "EX3!*0DHCP}"
  query_command: "EDHCP}"

- id: interface_ip_address
  type: string
  set_command: "EX3!*X3$CISG}"
  query_command: "EX3!*CISG}"

- id: dns_addresses
  type: string
  set_command: "EX3!*X3$[1]*X3$[2]*X3$[3]DNSS}"
  query_command: "EX3!DNSS}"

- id: sis_echo
  type: boolean
  default: true
  set_commands:
    enabled: "E1ECHO}"
    disabled: "E0ECHO}"
  query_command: "EECHO}"
```

## Events

```yaml
- id: startup_complete
  pattern: "© Copyright 20_yy_, Extron Electronics, NAVigator, V_x_._xx_, 60-_nnnn_-_nn_]"
  description: Sent when NAVigator completes startup.

- id: endpoint_assignment_changed
  pattern: "DevpA*<endpoint>*<0|1>]"
  description: Endpoint assigned state changed.

- id: endpoint_connection_changed
  pattern: "DevpC*<endpoint>*<0|1>]"
  description: Assigned endpoint connection state changed.

- id: endpoint_online_changed
  pattern: "DevpP*<endpoint>*<0|1>]"
  description: Assigned endpoint online state changed.

- id: valid_hotkey_detected
  pattern: "HkdmP*<endpoint>] or HkdmK*<endpoint>]"
  description: NAVigator detected a valid Ctrl-Ctrl-letter or Ctrl-Shift-letter hotkey combination.
```

## Macros

```yaml
# UNRESOLVED: source does not describe explicit multi-step macros
```

## Safety

```yaml
confirmation_required_for:
  - absolute_system_reset
interlocks: []
# UNRESOLVED: source provides no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes

`E` represents the Escape key in SIS notation, and `W` can replace it. `}` represents carriage return without line feed, and `|` can replace it. A bullet (`•`) represents a space. Numeric SIS entries may contain one through four digits, with leading zeroes optional. Commands may be concatenated without spaces.

Quick multiple ties and tie-to-all operations apply ties simultaneously. If a quick multiple-tie request contains invalid ties, valid ties are still applied and `Qik]` is returned.

Endpoint SIS commands must be encapsulated because commands cannot be sent directly to endpoints. Numeric endpoint identifiers require `I` for inputs or `O` for outputs.

Default network addresses are `203.0.113.22` for Ethernet over USB and `192.168.253.254/255.255.255.0` for OOB. NAV/PoE uses DHCP by default and self-assigns a `169.254.x.x` link-local address if DHCP fails.

<!-- UNRESOLVED: firmware compatibility range, SSH authentication details, LinkLicense requirements, alarm variable definitions, and fault recovery procedures are not fully stated in source. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - aca.im
  - extron.com
  - manua.ls
source_urls:
  - https://media.extron.com/public/download/files/userman/68-2740-01_F_NAVigator-UG__.pdf
  - https://aca.im/driver_docs/Extron/PDU_IPL_T_PCS4.pdf
  - https://www.extron.com
  - https://www.manua.ls/extron/navigator/manual
  - https://www.extron.com/product/navigator
retrieved_at: 2026-07-24T19:07:06.245Z
last_checked_at: 2026-08-05T08:22:26.426Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:22:26.426Z
matched_actions: 69
action_count: 69
confidence: medium
summary: "All 69 spec SIS commands appear verbatim in source; transport port 22023 and HTTPS confirmed; no source commands missing from spec. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "required LinkLicense entitlement and SSH authentication procedure are not fully specified in source."
- "source identifies secure SSH control and a Third-Party Control LinkLicense but does not specify SSH credentials or authentication procedure"
- "source does not describe explicit multi-step macros"
- "source provides no safety warnings, interlock procedures, or power-on sequencing requirements"
- "firmware compatibility range, SSH authentication details, LinkLicense requirements, alarm variable definitions, and fault recovery procedures are not fully stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
