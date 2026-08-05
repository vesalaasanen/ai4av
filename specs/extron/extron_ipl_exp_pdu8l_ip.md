---
spec_id: admin/extron-ipl-exp-pdu8l
schema_version: ai4av-public-spec-v1
revision: 1
title: "Extron IPL EXP PDU8L Control Spec"
manufacturer: Extron
model_family: "IPL EXP PDU8L"
aliases: []
compatible_with:
  manufacturers:
    - Extron
  models:
    - "IPL EXP PDU8L"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - media.extron.com
  - extron.com
  - manualslib.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3495-01_B_IPL_EXP_PwrSer_UG.pdf
  - https://www.extron.com/product/iplexppdu8l
  - https://www.manualslib.com/products/Extron-Electronics-Ipl-Exp-Series-14063750.html
  - https://www.extron.com/download/control-system-drivers
  - https://www.extron.com/download/files/userman/68-3495-50_B_IPL_EXP_PowerSer_SUG_.pdf
retrieved_at: 2026-07-24T19:06:24.848Z
last_checked_at: 2026-08-05T08:20:40.931Z
generated_at: 2026-08-05T08:20:40.931Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "behavior has not been verified against a physical device."
  - "source documents no SIS macro payloads or explicit multi-step control sequences."
  - "exact command framing representation should be checked against original manual typography because extracted text represents Escape as \"E\", carriage return as \"}\", and spaces inconsistently."
verification:
  verdict: verified
  checked_at: 2026-08-05T08:20:40.931Z
  matched_actions: 110
  action_count: 110
  confidence: medium
  summary: "All 110 spec SIS actions match the PDU8L command table verbatim (Escape=E, CR=}); transport values (port 22023, SSH/SIS, password rules) all source-anchored. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-24
---

# Extron IPL EXP PDU8L Control Spec

## Summary

Extron IPL EXP PDU8L is a networked power expansion interface with eight independently switched DC outputs, aggregate power monitoring, and a temperature sensor port. This spec covers Simple Instruction Set (SIS) control over an authenticated SSH connection and the documented device, network, security, and monitoring commands.

<!-- UNRESOLVED: behavior has not been verified against a physical device. -->

## Transport

```yaml
protocols:
  - tcp
addressing:
  port: 22023
auth:
  type: password
  username:
    allowed:
      - admin
      - user
  password:
    initial: device_serial_number
    after_factory_reset: extron
  case_sensitive: true
connection:
  application_protocol: ssh
  command_protocol: SIS
  response_terminator: "CR/LF"
```

## Traits

```yaml
- powerable  # inferred from DC output power commands
- queryable  # inferred from status and information query commands
```

## Actions

```yaml
- id: dc_output_power_on
  label: Turn DC Output Power On
  kind: action
  command: "E P{output}*1DCPP}"
  params:
    - name: output
      type: integer
      range: [0, 8]
      description: "0 selects all outputs; 1-8 select individual outputs."

- id: dc_output_power_off
  label: Turn DC Output Power Off
  kind: action
  command: "E P{output}*0DCPP}"
  params:
    - name: output
      type: integer
      range: [0, 8]
      description: "0 selects all outputs; 1-8 select individual outputs."

- id: dc_output_power_status
  label: View DC Output Power Status
  kind: query
  command: "E P{output}DCPP}"
  params:
    - name: output
      type: integer
      range: [0, 8]
      description: "0 selects all outputs; 1-8 select individual outputs."

- id: dc_load_status
  label: View Combined DC Load Status
  kind: query
  command: "E 33STAT}"
  params: []

- id: combined_dc_power
  label: View Combined DC Power Output
  kind: query
  command: "E 34STAT}"
  params: []

- id: set_output_name
  label: Set Power Output Name
  kind: action
  command: "E {output},{name}NO}"
  params:
    - name: output
      type: integer
      range: [1, 8]
    - name: name
      type: string
      max_length: 17

- id: reset_output_name
  label: Reset Power Output Name
  kind: action
  command: "E {output}, NO}"
  params:
    - name: output
      type: integer
      range: [1, 8]

- id: output_name
  label: View Power Output Name
  kind: query
  command: "E {output}NO}"
  params:
    - name: output
      type: integer
      range: [1, 8]

- id: current_temperature
  label: View Current Temperature
  kind: query
  command: "E T1 TEMP}"
  params: []

- id: temperature_state
  label: View Temperature State
  kind: query
  command: "E S1 TEMP}"
  params: []

- id: set_temperature_limit
  label: Set Temperature Limit Threshold
  kind: action
  command: "E L1*{temperature}TEMP}"
  params:
    - name: temperature
      type: number
      description: "Threshold in degrees Celsius to one decimal place."

- id: temperature_limit
  label: View Temperature Limit Threshold
  kind: query
  command: "E L1 TEMP}"
  params: []

- id: set_temperature_over
  label: Set Temperature Over Threshold
  kind: action
  command: "E O1*{temperature}TEMP}"
  params:
    - name: temperature
      type: number
      description: "Threshold in degrees Celsius to one decimal place."

- id: temperature_over
  label: View Temperature Over Threshold
  kind: query
  command: "E O1 TEMP}"
  params: []

- id: spd_mode
  label: View SPD Mode
  kind: query
  command: "E M ESPD}"
  params: []

- id: model_name
  label: View Model Name
  kind: query
  command: "1I"
  params: []

- id: model_description
  label: View Model Description
  kind: query
  command: "2I"
  params: []

- id: serial_number
  label: View Serial Number
  kind: query
  command: "19I"
  params: []

- id: part_number
  label: View Part Number
  kind: query
  command: "N"
  params: []

- id: firmware_version_advanced
  label: View Firmware Version Advanced
  kind: query
  command: "{firmware_query}Q"
  params:
    - name: firmware_query
      type: string
      values: ["*", "0", "1", "2", "3", "4"]

- id: firmware_version
  label: View Firmware Version
  kind: query
  command: "Q"
  params: []

- id: firmware_build
  label: View Full Firmware Version and Build
  kind: query
  command: "*Q"
  params: []

- id: firmware_library
  label: View Firmware Kernel or Library Version
  kind: query
  command: "**Q"
  params: []

- id: detailed_firmware
  label: View Detailed Firmware Information
  kind: query
  command: "0Q"
  params: []

- id: running_firmware
  label: View Running Firmware Version
  kind: query
  command: "1Q"
  params: []

- id: bootloader_firmware
  label: View Bootloader Firmware Version
  kind: query
  command: "2Q"
  params: []

- id: factory_firmware
  label: View Factory Base Firmware Version
  kind: query
  command: "3Q"
  params: []

- id: updated_firmware
  label: View Updated Firmware Version
  kind: query
  command: "4Q"
  params: []

- id: set_current_ethernet_timeout
  label: Set Current Ethernet Connection Timeout
  kind: action
  command: "E 0*{timeout}TC}"
  params:
    - name: timeout
      type: integer
      range: [1, 65000]
      description: "Timeout value documented in ten-second steps."

- id: current_ethernet_timeout
  label: View Current Ethernet Connection Timeout
  kind: query
  command: "E 0TC}"
  params: []

- id: set_global_ethernet_timeout
  label: Set Global Ethernet Connection Timeout
  kind: action
  command: "E 1*{timeout}TC}"
  params:
    - name: timeout
      type: integer
      range: [1, 65000]
      description: "Timeout value documented in ten-second steps."

- id: global_ethernet_timeout
  label: View Global Ethernet Connection Timeout
  kind: query
  command: "E 1TC}"
  params: []

- id: set_hostname
  label: Set Hostname
  kind: action
  command: "E {hostname}CN}"
  params:
    - name: hostname
      type: string
      max_length: 63

- id: reset_hostname
  label: Reset Hostname
  kind: action
  command: "E  CN}"
  params: []

- id: hostname
  label: View Hostname
  kind: query
  command: "E CN}"
  params: []

- id: enable_dhcp_ipv4
  label: Enable IPv4 DHCP
  kind: action
  command: "E 1DH}"
  params: []

- id: disable_dhcp_ipv4
  label: Disable IPv4 DHCP
  kind: action
  command: "E 0DH}"
  params: []

- id: dhcp_ipv4_status
  label: View IPv4 DHCP Status
  kind: query
  command: "E DH}"
  params: []

- id: mac_address
  label: View MAC Address
  kind: query
  command: "E {nic}CH}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: set_ipv4_address
  label: Set IPv4 Address
  kind: action
  command: "E {address}CI}"
  params:
    - name: address
      type: string

- id: ipv4_address
  label: View IPv4 Address
  kind: query
  command: "E CI}"
  params: []

- id: set_ipv4_network
  label: Set IPv4 Address Prefix and Gateway
  kind: action
  command: "E 1*{address}/{prefix}*{gateway}CISG}"
  params:
    - name: address
      type: string
    - name: prefix
      type: integer
    - name: gateway
      type: string

- id: ipv4_network
  label: View IPv4 Address Prefix and Gateway
  kind: query
  command: "E 1CISG}"
  params: []

- id: set_dns_server
  label: Set DNS Server IPv4 Address
  kind: action
  command: "E {address}DI}"
  params:
    - name: address
      type: string

- id: dns_server
  label: View DNS Server IPv4 Address
  kind: query
  command: "E DI}"
  params: []

- id: set_verbose_mode
  label: Set Verbose Response Mode
  kind: action
  command: "E {mode}CV}"
  params:
    - name: mode
      type: integer
      values: [0, 1, 2, 3]

- id: verbose_mode
  label: View Verbose Response Mode
  kind: query
  command: "E CV}"
  params: []

- id: connection_count
  label: View Connection Count
  kind: query
  command: "E CC}"
  params: []

- id: disable_ipv4
  label: Disable IPv4 Network Access
  kind: action
  command: "E V{nic}*4*0ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: enable_ipv4
  label: Enable IPv4 Network Access
  kind: action
  command: "E V{nic}*4*1ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: ipv4_status
  label: View IPv4 Network Status
  kind: query
  command: "E V{nic}*4ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: disable_ipv6
  label: Disable IPv6 Network Access
  kind: action
  command: "E V{nic}*6*0ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: enable_ipv6
  label: Enable IPv6 Network Access
  kind: action
  command: "E V{nic}*6*1ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: ipv6_status
  label: View IPv6 Network Status
  kind: query
  command: "E V{nic}*6ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: enable_network_access
  label: Enable Network Access
  kind: action
  command: "E E1*1ETHN}"
  params: []

- id: disable_network_access
  label: Disable Network Access
  kind: action
  command: "E E1*0ETHN}"
  params: []

- id: network_access_status
  label: View Network Access Status
  kind: query
  command: "E E1ETHN}"
  params: []

- id: disable_dhcp_ipv6
  label: Disable IPv6 DHCP
  kind: action
  command: "E {nic}*0DHCP6}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: enable_dhcp_ipv6
  label: Enable IPv6 DHCP
  kind: action
  command: "E {nic}*1DHCP6}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: set_dhcp_ipv6_mode
  label: Set IPv6 DHCP Mode
  kind: action
  command: "E {nic}*{mode}DHCP6}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: mode
      type: integer
      values: [0, 1, 2, 3, 4, 5]

- id: dhcp_ipv6_mode
  label: View IPv6 DHCP Mode
  kind: query
  command: "E {nic}DHCP6}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: select_eui64
  label: Select EUI-64 Address Generation
  kind: action
  command: "E A{nic}*0ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: select_stable_privacy
  label: Select Stable Privacy Address Generation
  kind: action
  command: "E A{nic}*1ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: address_generation_mode
  label: View IPv6 Address Generation Mode
  kind: query
  command: "E A{nic}ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: set_ipv6_address
  label: Set IPv6 Address
  kind: action
  command: "E {nic}*{address}CISG6}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: address
      type: string

- id: set_ipv6_address_prefix
  label: Set IPv6 Address and Prefix
  kind: action
  command: "E {nic}*{address}/{prefix}CISG6}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: address
      type: string
    - name: prefix
      type: integer

- id: set_ipv6_network
  label: Set IPv6 Address Prefix and Gateway
  kind: action
  command: "E {nic}*{address}/{prefix}*{gateway}CISG6}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: address
      type: string
    - name: prefix
      type: integer
    - name: gateway
      type: string

- id: ipv6_network
  label: View IPv6 Address Prefix and Gateway
  kind: query
  command: "E {nic}CISG6}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: enable_dad
  label: Enable Duplicate Address Detection
  kind: action
  command: "E D{nic}*1ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: disable_dad
  label: Disable Duplicate Address Detection
  kind: action
  command: "E D{nic}*0ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: dad_status
  label: View Duplicate Address Detection Status
  kind: query
  command: "E D{nic}ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: ping_ipv4
  label: Ping IPv4 Device
  kind: query
  command: "E {address_or_name}*4PING}"
  params:
    - name: address_or_name
      type: string

- id: ping_ipv6
  label: Ping IPv6 Device
  kind: query
  command: "E {address_or_name}*6PING}"
  params:
    - name: address_or_name
      type: string

- id: resolve_hostname_ipv4
  label: Resolve Hostname to IPv4 Address
  kind: query
  command: "E V{nic}*{name}*4HNAM}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: name
      type: string

- id: resolve_hostname_ipv6
  label: Resolve Hostname to IPv6 Address
  kind: query
  command: "E V{nic}*{name}*6HNAM}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: name
      type: string

- id: resolve_hostname
  label: Resolve Hostname to IP Address
  kind: query
  command: "E V{nic}*{name}HNAM}"
  params:
    - name: nic
      type: integer
      values: [1]
    - name: name
      type: string

- id: ethernet_report
  label: View Human-Readable Ethernet Report
  kind: query
  command: "E R{nic}ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: ethernet_json_report
  label: View Ethernet JSON Report
  kind: query
  command: "E J{nic}ETHN}"
  params:
    - name: nic
      type: integer
      values: [1]

- id: set_admin_password
  label: Set Administrator Password
  kind: action
  command: "E {password}CA}"
  params:
    - name: password
      type: string
      min_length: 1
      max_length: 128
      description: "Human-readable ASCII excluding pipe; cannot be one space."

- id: reset_admin_password
  label: Reset Administrator Password
  kind: action
  command: "E  CA}"
  params: []

- id: admin_password_status
  label: View Administrator Password Status
  kind: query
  command: "E CA}"
  params: []

- id: set_user_password
  label: Set User Password
  kind: action
  command: "E {password}CU}"
  params:
    - name: password
      type: string
      min_length: 1
      max_length: 128
      description: "Human-readable ASCII excluding pipe; cannot be one space."

- id: reset_user_password
  label: Reset User Password
  kind: action
  command: "E  CU}"
  params: []

- id: user_password_status
  label: View User Password Status
  kind: query
  command: "E CU}"
  params: []

- id: set_ssh_port_map
  label: Set SIS-over-SSH Port Map
  kind: action
  command: "E B{port}PMAP}"
  params:
    - name: port
      type: integer

- id: reset_ssh_port_map
  label: Reset SIS-over-SSH Port Map
  kind: action
  command: "E B22023PMAP}"
  params: []

- id: disable_ssh_port
  label: Disable SIS-over-SSH Port
  kind: action
  command: "E B0PMAP}"
  params: []

- id: ssh_port_map
  label: View SIS-over-SSH Port Map
  kind: query
  command: "E BPMAP}"
  params: []

- id: set_ssh_port_map_nic
  label: Set SIS-over-SSH Port Map for NIC
  kind: action
  command: "E B1*{port}PMAP}"
  params:
    - name: port
      type: integer

- id: enable_echo
  label: Enable SSH Session Echo
  kind: action
  command: "E 1ECHO}"
  params: []

- id: disable_echo
  label: Disable SSH Session Echo
  kind: action
  command: "E 0ECHO}"
  params: []

- id: echo_status
  label: View SSH Session Echo Status
  kind: query
  command: "E ECHO}"
  params: []

- id: set_snmp_contact
  label: Set SNMP Contact
  kind: action
  command: "E C{contact}SNMP}"
  params:
    - name: contact
      type: string
      min_length: 1
      max_length: 64

- id: reset_snmp_contact
  label: Reset SNMP Contact
  kind: action
  command: "E C SNMP}"
  params: []

- id: snmp_contact
  label: View SNMP Contact
  kind: query
  command: "E CSNMP}"
  params: []

- id: set_snmp_location
  label: Set SNMP Location
  kind: action
  command: "E L{location}SNMP}"
  params:
    - name: location
      type: string
      min_length: 1
      max_length: 64

- id: reset_snmp_location
  label: Reset SNMP Location
  kind: action
  command: "E L SNMP}"
  params: []

- id: snmp_location
  label: View SNMP Location
  kind: query
  command: "E LSNMP}"
  params: []

- id: set_snmp_public_community
  label: Set SNMP Public Community
  kind: action
  command: "E P{community}SNMP}"
  params:
    - name: community
      type: string
      min_length: 1
      max_length: 64

- id: reset_snmp_public_community
  label: Reset SNMP Public Community
  kind: action
  command: "E P SNMP}"
  params: []

- id: snmp_public_community
  label: View SNMP Public Community
  kind: query
  command: "E PSNMP}"
  params: []

- id: enable_snmp
  label: Enable SNMP Access
  kind: action
  command: "E E1SNMP}"
  params: []

- id: disable_snmp
  label: Disable SNMP Access
  kind: action
  command: "E E0SNMP}"
  params: []

- id: snmp_status
  label: View SNMP Access Status
  kind: query
  command: "E ESNMP}"
  params: []

- id: reset_unit_settings
  label: Reset Unit Settings
  kind: action
  command: "E ZXXX}"
  params: []

- id: absolute_reset_retain_ip
  label: Absolute System Reset Retaining IP Settings
  kind: action
  command: "E ZY}"
  params: []

- id: absolute_system_reset
  label: Absolute System Reset
  kind: action
  command: "E ZQQQ}"
  params: []

- id: reset_ip_and_connection
  label: Reset IP Settings and Connection
  kind: action
  command: "E 1ZQQQ}"
  params: []

- id: reboot_system
  label: Reboot System
  kind: action
  command: "E 1BOOT}"
  params: []

- id: restart_network
  label: Restart Network Connection
  kind: action
  command: "E 2BOOT}"
  params: []
```

## Feedbacks

```yaml
- id: dc_output_power_state
  type: enum
  values: [off, on]
  response: "DcppP{output}*{state}"

- id: combined_dc_load_state
  type: enum
  values: [normal, limit, over]
  wire_values:
    normal: 0
    limit: 1
    over: 2
  response: "33Stat {state}"

- id: combined_dc_power_watts
  type: number
  response: "34Stat {watts}"

- id: output_name
  type: string
  max_length: 17

- id: temperature_celsius
  type: number
  precision: 1
  response: "TempT1*{temperature}"

- id: temperature_state
  type: enum
  values: [probe_error, normal, limit, over]
  wire_values:
    probe_error: 0
    normal: 1
    limit: 2
    over: 3
  response: "TempS1*{state}"

- id: temperature_limit_celsius
  type: number
  precision: 1
  response: "TempL1*{temperature}"

- id: temperature_over_celsius
  type: number
  precision: 1
  response: "TempO1*{temperature}"

- id: spd_mode_state
  type: enum
  values: [disabled, enabled]
  wire_values:
    disabled: 0
    enabled: 1
  response: "EspdM{state}"

- id: model_name
  type: string
  response: "Inf01*{model}"

- id: model_description
  type: string
  response: "Inf02*{description}"

- id: serial_number
  type: string
  response: "Inf19*{serial_number}"

- id: part_number
  type: string
  response: "Pno{part_number}"

- id: command_error
  type: enum
  values:
    - E10
    - E12
    - E13
    - E14
    - E18
    - E22
    - E24
    - E26
    - E28
    - E37

- id: power_up_message
  type: string
  response: "Copyright 20{year}, Extron IPL EXP PDU8L, V{firmware}, 60-1928-01"

- id: enabled_state
  type: enum
  values: [disabled, enabled]
  wire_values:
    disabled: 0
    enabled: 1
```

## Variables

```yaml
- id: dc_output_state
  type: enum
  values: [off, on]
  scope: outputs_1_through_8

- id: dc_output_name
  type: string
  max_length: 17
  default_template: "DC Power Output{output}"

- id: temperature_limit_celsius
  type: number
  precision: 1
  default: 24.0

- id: temperature_over_celsius
  type: number
  precision: 1
  default: 30.0

- id: verbose_mode
  type: integer
  values: [0, 1, 2, 3]
  default: 0

- id: ethernet_timeout
  type: integer
  range: [1, 65000]
  default: 30
  step_seconds: 10

- id: ipv6_dhcp_mode
  type: integer
  values: [0, 1, 2, 3, 4, 5]

- id: ssh_port
  type: integer
  default: 22023

- id: echo_enabled
  type: boolean
  default: true

- id: snmp_enabled
  type: boolean
  default: false
```

## Events

```yaml
- id: device_started
  description: Device sends its copyright, model, firmware, part number, date, and time after startup.

- id: verbose_change_notice
  description: SSH sessions in verbose mode 1 or 3 receive device change notices.

- id: network_reconfigured
  response: "Reconfig"

- id: network_restarted
  response: "Boot2"

- id: system_rebooted
  response: "Boot 1"
```

## Macros

```yaml
# UNRESOLVED: source documents no SIS macro payloads or explicit multi-step control sequences.
```

## Safety

```yaml
confirmation_required_for:
  - reset_unit_settings
  - absolute_reset_retain_ip
  - absolute_system_reset
  - reset_ip_and_connection
  - reboot_system
  - restart_network
interlocks:
  - id: sis_spd_exclusion
    description: "SIS-over-SSH and SPD modes are mutually exclusive. In SPD mode, only the SPD-mode query is accepted; other SIS commands return E37."
  - id: overload_shutdown
    description: "When combined DC output power exceeds the overload threshold, the device turns the DC outputs off. Correct excessive power draw before attempting restoration."
  - id: ipv4_ipv6_minimum
    description: "Firmware prevents disabling both IPv4 and IPv6; disabling one causes the other to remain enabled."
```

## Notes

SIS commands accept upper- or lowercase characters unless otherwise specified. Commands can be sent back-to-back without spaces, and numeric fields may contain one, two, or three digits. Unit responses end with carriage return and line feed.

SIS-over-SSH is enabled by default but becomes unavailable when SPD mode is enabled. Port `22023` is configurable and can be disabled. Echo is enabled by default per SSH session; verbose modes `1` and `3` enable change notices.

Administrator-level commands identified by the source may return `E24` for insufficient privilege. Commands can also return `E10` for invalid command, `E12` for unavailable port, `E13` for invalid value, `E14` for invalid configuration, `E18` for timeout, `E22` for busy, `E26` for too many connections, `E28` for missing file, or `E37` in SPD mode.

Firmware older than `v1.01.0000-b026` may lack IPv6 NIC support. This is a feature-specific limitation, not a general firmware compatibility range.

<!-- UNRESOLVED: exact command framing representation should be checked against original manual typography because extracted text represents Escape as "E", carriage return as "}", and spaces inconsistently. -->

## Provenance

```yaml
source_domains:
  - media.extron.com
  - extron.com
  - manualslib.com
source_urls:
  - https://media.extron.com/public/download/files/userman/68-3495-01_B_IPL_EXP_PwrSer_UG.pdf
  - https://www.extron.com/product/iplexppdu8l
  - https://www.manualslib.com/products/Extron-Electronics-Ipl-Exp-Series-14063750.html
  - https://www.extron.com/download/control-system-drivers
  - https://www.extron.com/download/files/userman/68-3495-50_B_IPL_EXP_PowerSer_SUG_.pdf
retrieved_at: 2026-07-24T19:06:24.848Z
last_checked_at: 2026-08-05T08:20:40.931Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-05T08:20:40.931Z
matched_actions: 110
action_count: 110
confidence: medium
summary: "All 110 spec SIS actions match the PDU8L command table verbatim (Escape=E, CR=}); transport values (port 22023, SSH/SIS, password rules) all source-anchored. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "behavior has not been verified against a physical device."
- "source documents no SIS macro payloads or explicit multi-step control sequences."
- "exact command framing representation should be checked against original manual typography because extracted text represents Escape as \"E\", carriage return as \"}\", and spaces inconsistently."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
