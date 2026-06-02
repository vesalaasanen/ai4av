---
spec_id: admin/atlona-at-pro3hd44m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PRO3HD44M Control Spec"
manufacturer: Atlona
model_family: AT-PRO3HD44M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PRO3HD44M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO3HD44M_V3.pdf
  - https://atlona.com/pdf/data_sheet/AT-PRO3HD-FAMILY-DS.pdf
retrieved_at: 2026-05-31T08:36:58.746Z
last_checked_at: 2026-05-31T20:54:08.579Z
generated_at: 2026-05-31T20:54:08.579Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version stated only as `(Firmware #)` placeholder in source"
  - "TCP port number not stated in source; source mentions default DHCP on"
  - "source does not document unsolicited event notifications"
  - "source does not document multi-step macro sequences"
  - "TCP/IP port number not stated in source"
  - "firmware version compatibility range not stated in source"
  - "list of available internal EDID index values not stated in source"
verification:
  verdict: verified
  checked_at: 2026-05-31T20:54:08.579Z
  matched_actions: 97
  action_count: 97
  confidence: medium
  summary: "All 97 spec actions matched source commands; transport parameters verified (port correctly marked UNRESOLVED); full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-31
---

# Atlona AT-PRO3HD44M Control Spec

## Summary
Atlona 4×4 HDMI matrix switcher with both RS-232 and TCP/IP control interfaces. Supports power management, input-output routing across 4 zones, IR receiver control, per-zone RS-232 passthrough, EDID management, and full IP configuration. Login Mode (username/password) optional; not required for control system use.

<!-- UNRESOLVED: firmware version stated only as `(Firmware #)` placeholder in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  port: null  # UNRESOLVED: TCP port number not stated in source; source mentions default DHCP on
serial:
  baud_rate: 115200
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source states username "root" and password "Atlona" required for IP login
  username: root
  # password: Atlona  # credential stated in source; do not expose in plain spec
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable  # IR receiver on/off
```

## Actions
```yaml
- id: power_on
  label: Power On
  kind: action
  params: []

- id: power_off
  label: Power Off
  kind: action
  params: []

- id: power_status_query
  label: Power Status Query
  kind: query
  params: []

- id: firmware_version_query
  label: Firmware Version Query
  kind: query
  params: []

- id: model_info_query
  label: Model Info Query
  kind: query
  params: []

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  params: []

- id: reset_matrix
  label: Reset Matrix to Default
  kind: action
  params: []

- id: route_all_inputs_to_matching_outputs
  label: Route All Inputs to Matching Outputs
  kind: action
  params: []

- id: route_input_x_to_output_1
  label: Route Input X to Output 1
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: route_input_x_to_output_2
  label: Route Input X to Output 2
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: route_input_x_to_output_3
  label: Route Input X to Output 3
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: route_input_x_to_output_4
  label: Route Input X to Output 4
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-4)

- id: route_input_1_to_all_outputs
  label: Route Input 1 to All Outputs
  kind: action
  params: []

- id: route_input_2_to_all_outputs
  label: Route Input 2 to All Outputs
  kind: action
  params: []

- id: route_input_3_to_all_outputs
  label: Route Input 3 to All Outputs
  kind: action
  params: []

- id: route_input_4_to_all_outputs
  label: Route Input 4 to All Outputs
  kind: action
  params: []

- id: turn_off_output_1
  label: Turn Off Output 1
  kind: action
  params: []

- id: turn_off_output_2
  label: Turn Off Output 2
  kind: action
  params: []

- id: turn_off_output_3
  label: Turn Off Output 3
  kind: action
  params: []

- id: turn_off_output_4
  label: Turn Off Output 4
  kind: action
  params: []

- id: ir_receiver_on
  label: IR Receiver On
  kind: action
  params: []

- id: ir_receiver_off
  label: IR Receiver Off
  kind: action
  params: []

- id: query_output_1_status
  label: Query Output 1 Status
  kind: query
  params: []

- id: query_output_2_status
  label: Query Output 2 Status
  kind: query
  params: []

- id: query_output_3_status
  label: Query Output 3 Status
  kind: query
  params: []

- id: query_output_4_status
  label: Query Output 4 Status
  kind: query
  params: []

- id: query_all_outputs_status
  label: Query All Outputs Status
  kind: query
  params: []

- id: save_preset_0
  label: Save Preset 0
  kind: action
  params: []

- id: save_preset_1
  label: Save Preset 1
  kind: action
  params: []

- id: save_preset_2
  label: Save Preset 2
  kind: action
  params: []

- id: save_preset_3
  label: Save Preset 3
  kind: action
  params: []

- id: save_preset_4
  label: Save Preset 4
  kind: action
  params: []

- id: recall_preset_0
  label: Recall Preset 0
  kind: action
  params: []

- id: recall_preset_1
  label: Recall Preset 1
  kind: action
  params: []

- id: recall_preset_2
  label: Recall Preset 2
  kind: action
  params: []

- id: recall_preset_3
  label: Recall Preset 3
  kind: action
  params: []

- id: recall_preset_4
  label: Recall Preset 4
  kind: action
  params: []

- id: clear_preset_0
  label: Clear Preset 0
  kind: action
  params: []

- id: clear_preset_1
  label: Clear Preset 1
  kind: action
  params: []

- id: clear_preset_2
  label: Clear Preset 2
  kind: action
  params: []

- id: clear_preset_3
  label: Clear Preset 3
  kind: action
  params: []

- id: clear_preset_4
  label: Clear Preset 4
  kind: action
  params: []

- id: rs232_zone1_command
  label: RS-232 Command to Zone 1
  kind: action
  params:
    - name: command
      type: string
      description: Command string to forward to the device in zone 1

- id: rs232_zone2_command
  label: RS-232 Command to Zone 2
  kind: action
  params:
    - name: command
      type: string
      description: Command string to forward to the device in zone 2

- id: rs232_zone3_command
  label: RS-232 Command to Zone 3
  kind: action
  params:
    - name: command
      type: string
      description: Command string to forward to the device in zone 3

- id: rs232_zone4_command
  label: RS-232 Command to Zone 4
  kind: action
  params:
    - name: command
      type: string
      description: Command string to forward to the device in zone 4

- id: query_ip_configuration
  label: Query IP Configuration
  kind: query
  params: []

- id: set_ip_timeout
  label: Set IP Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: Timeout in seconds (01-99)
      range: [1, 99]

- id: logout
  label: Log Out
  kind: action
  params: []

- id: list_tcpip_users
  label: List TCP/IP Users
  kind: query
  params: []

- id: add_tcpip_user
  label: Add TCP/IP User
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: delete_tcpip_user
  label: Delete TCP/IP User
  kind: action
  params:
    - name: username
      type: string

- id: query_dhcp_status
  label: Query DHCP Status
  kind: query
  params: []

- id: set_dhcp_on
  label: Enable DHCP
  kind: action
  params: []

- id: set_dhcp_off
  label: Disable DHCP
  kind: action
  params: []

- id: set_static_ip
  label: Set Static IP Address
  kind: action
  params:
    - name: address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string

- id: set_tcpip_port
  label: Set TCP/IP Port
  kind: action
  params:
    - name: port
      type: integer

- id: query_login_mode_status
  label: Query Login Mode Status
  kind: query
  params: []

- id: set_login_mode_on
  label: Enable Login Mode
  kind: action
  params: []

- id: set_login_mode_off
  label: Disable Login Mode
  kind: action
  params: []

- id: query_broadcast_status
  label: Query Broadcast Status
  kind: query
  params: []

- id: set_broadcast_on
  label: Enable Broadcast Mode
  kind: action
  params: []

- id: set_broadcast_off
  label: Disable Broadcast Mode
  kind: action
  params: []

- id: set_matrix_baud_rate
  label: Set Matrix Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate (2400, 4800, 9600, 19200, 38400, 57600, 115200)
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200

- id: set_output_zone1_baud
  label: Set Output Zone 1 Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate (2400, 4800, 9600, 19200, 38400, 57600, 115200)
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
    - name: data_bits
      type: integer
      description: Data bits (7 or 8)
      enum: [7, 8]
    - name: parity
      type: integer
      description: Parity (0=none, 1=odd, 2=even)
      enum: [0, 1, 2]
    - name: stop_bits
      type: integer
      description: Stop bits (1 or 2)
      enum: [1, 2]

- id: set_output_zone2_baud
  label: Set Output Zone 2 Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
    - name: data_bits
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]
    - name: stop_bits
      type: integer
      enum: [1, 2]

- id: set_output_zone3_baud
  label: Set Output Zone 3 Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
    - name: data_bits
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]
    - name: stop_bits
      type: integer
      enum: [1, 2]

- id: set_output_zone4_baud
  label: Set Output Zone 4 Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate
      enum:
        - 2400
        - 4800
        - 9600
        - 19200
        - 38400
        - 57600
        - 115200
    - name: data_bits
      type: integer
      enum: [7, 8]
    - name: parity
      type: integer
      enum: [0, 1, 2]
    - name: stop_bits
      type: integer
      enum: [1, 2]

- id: set_input_1_edid_default
  label: Set Input 1 EDID to Default
  kind: action
  params: []

- id: set_input_2_edid_default
  label: Set Input 2 EDID to Default
  kind: action
  params: []

- id: set_input_3_edid_default
  label: Set Input 3 EDID to Default
  kind: action
  params: []

- id: set_input_4_edid_default
  label: Set Input 4 EDID to Default
  kind: action
  params: []

- id: set_input_1_edid_memory_0
  label: Set Input 1 EDID to Memory 0
  kind: action
  params: []

- id: set_input_1_edid_memory_1
  label: Set Input 1 EDID to Memory 1
  kind: action
  params: []

- id: set_input_1_edid_memory_2
  label: Set Input 1 EDID to Memory 2
  kind: action
  params: []

- id: set_input_1_edid_memory_3
  label: Set Input 1 EDID to Memory 3
  kind: action
  params: []

- id: set_input_2_edid_memory_0
  label: Set Input 2 EDID to Memory 0
  kind: action
  params: []

- id: set_input_2_edid_memory_1
  label: Set Input 2 EDID to Memory 1
  kind: action
  params: []

- id: set_input_2_edid_memory_2
  label: Set Input 2 EDID to Memory 2
  kind: action
  params: []

- id: set_input_2_edid_memory_3
  label: Set Input 2 EDID to Memory 3
  kind: action
  params: []

- id: set_input_3_edid_memory_0
  label: Set Input 3 EDID to Memory 0
  kind: action
  params: []

- id: set_input_3_edid_memory_1
  label: Set Input 3 EDID to Memory 1
  kind: action
  params: []

- id: set_input_3_edid_memory_2
  label: Set Input 3 EDID to Memory 2
  kind: action
  params: []

- id: set_input_3_edid_memory_3
  label: Set Input 3 EDID to Memory 3
  kind: action
  params: []

- id: set_input_4_edid_memory_0
  label: Set Input 4 EDID to Memory 0
  kind: action
  params: []

- id: set_input_4_edid_memory_1
  label: Set Input 4 EDID to Memory 1
  kind: action
  params: []

- id: set_input_4_edid_memory_2
  label: Set Input 4 EDID to Memory 2
  kind: action
  params: []

- id: set_input_4_edid_memory_3
  label: Set Input 4 EDID to Memory 3
  kind: action
  params: []

- id: set_input_1_edid_internal
  label: Set Input 1 EDID to Internal
  kind: action
  params:
    - name: index
      type: integer
      description: Internal EDID index number

- id: set_input_2_edid_internal
  label: Set Input 2 EDID to Internal
  kind: action
  params:
    - name: index
      type: integer
      description: Internal EDID index number

- id: set_input_3_edid_internal
  label: Set Input 3 EDID to Internal
  kind: action
  params:
    - name: index
      type: integer
      description: Internal EDID index number

- id: set_input_4_edid_internal
  label: Set Input 4 EDID to Internal
  kind: action
  params:
    - name: index
      type: integer
      description: Internal EDID index number

- id: query_output_zone1_rs232_params
  label: Query Output Zone 1 RS-232 Parameters
  kind: query
  params: []

- id: query_output_zone2_rs232_params
  label: Query Output Zone 2 RS-232 Parameters
  kind: query
  params: []

- id: query_output_zone3_rs232_params
  label: Query Output Zone 3 RS-232 Parameters
  kind: query
  params: []

- id: query_output_zone4_rs232_params
  label: Query Output Zone 4 RS-232 Parameters
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: power_state
  type: enum
  values:
    - PWON
    - PWOFF
  description: Power status response

- id: command_failed
  type: string
  values:
    - Command FAILED

- id: lock_state
  type: enum
  values:
    - Lock
    - Unlock

- id: firmware_version_response
  type: string
  description: Firmware version string

- id: model_info_response
  type: string
  description: Model number string

- id: routing_all_response
  type: string
  description: Pattern x1AVx1,x2AVx2,... (input-to-output routing for all zones)

- id: routing_one_output_response
  type: string
  description: Pattern x7AVx1 (input assigned to queried output)

- id: routing_all_outputs_response
  type: string
  description: Pattern x1AVx1,x2AVx2,x3AVx4,... (all outputs status)

- id: preset_save_response
  type: string
  description: Echoes Save Y

- id: preset_recall_response
  type: string
  description: Echoes Recall Y

- id: preset_clear_response
  type: string
  description: Echoes Clear Y

- id: matrix_reset_response
  type: string
  values:
    - Mreset

- id: rs232_zone_feedback
  type: string
  description: Echoes RS232zoneX[command]

- id: ip_config_response
  type: string
  description: IP Addr, Netmask, Gateway, IP Port

- id: ip_timeout_response
  type: string
  description: Returns IPTimeout XX (seconds)

- id: ip_logout_response
  type: string
  values:
    - IPQuit

- id: tcpip_user_list_response
  type: string
  description: Formatted list of users and passwords

- id: tcpip_user_added_response
  type: string
  values:
    - TCP/IP user was added

- id: tcpip_user_deleted_response
  type: string
  values:
    - TCP/IP user was deleted

- id: dhcp_status_response
  type: enum
  values:
    - IPDHCP on
    - IPDHCP off

- id: static_ip_response
  type: string
  description: Returns address netmask gateway

- id: tcpip_port_response
  type: string
  description: Returns IPPort Y

- id: login_mode_status_response
  type: enum
  values:
    - IPLogin on
    - IPLogin off

- id: broadcast_status_response
  type: enum
  values:
    - Broadcast on
    - Broadcast off

- id: edid_response
  type: string
  description: Pattern EDIDMSetX with default/saveY/intZ
```

## Variables
```yaml
- id: broadcast_mode
  type: boolean
  description: Broadcast mode enabled/disabled

- id: login_mode
  type: boolean
  description: IPLogin enabled/disabled

- id: dhcp_enabled
  type: boolean
  description: DHCP enabled/disabled

- id: ip_timeout_seconds
  type: integer
  description: IP inactivity timeout in seconds (01-99)
  range: [1, 99]

- id: ip_address
  type: string

- id: ip_netmask
  type: string

- id: ip_gateway
  type: string

- id: tcpip_port
  type: integer

- id: matrix_baud_rate
  type: integer
  description: Matrix control serial baud rate
  enum:
    - 2400
    - 4800
    - 9600
    - 19200
    - 38400
    - 57600
    - 115200

- id: output_zone1_rs232_params
  type: object
  properties:
    baud_rate: integer
    data_bits: integer
    parity: string
    stop_bits: integer

- id: output_zone2_rs232_params
  type: object
  properties:
    baud_rate: integer
    data_bits: integer
    parity: string
    stop_bits: integer

- id: output_zone3_rs232_params
  type: object
  properties:
    baud_rate: integer
    data_bits: integer
    parity: string
    stop_bits: integer

- id: output_zone4_rs232_params
  type: object
  properties:
    baud_rate: integer
    data_bits: integer
    parity: string
    stop_bits: integer
```

## Events
```yaml
# UNRESOLVED: source does not document unsolicited event notifications
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step macro sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
Commands are case-sensitive and terminated with carriage return (`\r`). If a command fails or is incorrect, feedback returns `Command FAILED`. Login Mode should not be used when using a control system — username is always `root`, only the password can be changed. Default matrix serial: 115200 8N1. Default output zone serial: 9600 8N1. DHCP is on by default; IP address obtained via front panel menu (hold Select Input for 5 seconds).
<!-- UNRESOLVED: TCP/IP port number not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: list of available internal EDID index values not stated in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO3HD44M_V3.pdf
  - https://atlona.com/pdf/data_sheet/AT-PRO3HD-FAMILY-DS.pdf
retrieved_at: 2026-05-31T08:36:58.746Z
last_checked_at: 2026-05-31T20:54:08.579Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T20:54:08.579Z
matched_actions: 97
action_count: 97
confidence: medium
summary: "All 97 spec actions matched source commands; transport parameters verified (port correctly marked UNRESOLVED); full bidirectional coverage. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version stated only as `(Firmware #)` placeholder in source"
- "TCP port number not stated in source; source mentions default DHCP on"
- "source does not document unsolicited event notifications"
- "source does not document multi-step macro sequences"
- "TCP/IP port number not stated in source"
- "firmware version compatibility range not stated in source"
- "list of available internal EDID index values not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
