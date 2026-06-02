---
spec_id: admin/atlona-at-pro3hd66m
schema_version: ai4av-public-spec-v1
revision: 1
title: "Atlona AT-PRO3HD66M Control Spec"
manufacturer: Atlona
model_family: AT-PRO3HD66M
aliases: []
compatible_with:
  manufacturers:
    - Atlona
  models:
    - AT-PRO3HD66M
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO3HD66M_V2.pdf
  - https://atlona.com/downloads/AMX_AT-PRO3HD66M.zip
  - https://atlona.com/downloads/Neets_AT-PRO3HD66M.zip
retrieved_at: 2026-05-19T19:45:48.289Z
last_checked_at: 2026-06-02T21:47:50.894Z
generated_at: 2026-06-02T21:47:50.894Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/power specs not stated in source"
  - "TCP port number not stated in source - operator must set port after connecting"
  - "no discrete settable parameters outside of action commands in source"
  - "no unsolicited event descriptions in source - device may send spontaneous"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "TCP port number not stated in source — operator must configure"
  - "unsolicited event messages not documented in source"
  - "firmware version compatibility range not stated in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T21:47:50.894Z
  matched_actions: 34
  action_count: 34
  confidence: medium
  summary: "All 34 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-19
---

# Atlona AT-PRO3HD66M Control Spec

## Summary
Atlona AT-PRO3HD66M is a 6×6 HDMI matrix switcher supporting both RS-232 and TCP/IP control. Serial runs at 115200 baud default; IP control supports DHCP, static IP, user management, and broadcast mode. All commands are case-sensitive ASCII terminated with carriage return.

<!-- UNRESOLVED: voltage/power specs not stated in source -->

## Transport
```yaml
protocols:
  - tcp
  - serial
addressing:
  # UNRESOLVED: TCP port number not stated in source - operator must set port after connecting
  port: null
serial:
  baud_rate: 115200  # default per source
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: credential  # source states username/password required for TCP/IP
  username: root
  password: Atlona
```

## Traits
```yaml
- powerable       # PWON/PWOFF commands present
- routable        # x1AVx2 routing commands present
- queryable       # PWSTA, Status, Version, Type commands present
- levelable       # false - no level/gain commands in source
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

- id: route
  label: Route Input to Output
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: output
      type: integer
      description: Output number (1-based)

- id: route_to_all
  label: Route Input to All Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: route_multiple
  label: Route Input to Multiple Outputs
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: outputs
      type: string
      description: Comma-separated output numbers (e.g. "x1,x2,x4")

- id: turn_off_output
  label: Turn Off Output Channel
  kind: action
  params:
    - name: output
      type: integer
      description: Output number (1-based)

- id: reset_all
  label: Reset All Inputs to Corresponding Outputs
  kind: action
  params: []

- id: lock_front_panel
  label: Lock Front Panel
  kind: action
  params: []

- id: unlock_front_panel
  label: Unlock Front Panel
  kind: action
  params: []

- id: ir_on
  label: IR Receiver On
  kind: action
  params: []

- id: ir_off
  label: IR Receiver Off
  kind: action
  params: []

- id: save_preset
  label: Save Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-4)

- id: recall_preset
  label: Recall Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-4)

- id: clear_preset
  label: Clear Preset
  kind: action
  params:
    - name: preset
      type: integer
      description: Preset number (0-4)

- id: master_reset
  label: Master Reset
  kind: action
  params: []

- id: rs232_zone_command
  label: RS-232 Zone Command
  kind: action
  params:
    - name: zone
      type: integer
      description: Zone number (output number)
    - name: command
      type: string
      description: Command to forward to the zone's RS-232 connected device

- id: set_matrix_baud
  label: Set Matrix Baud Rate
  kind: action
  params:
    - name: baud_rate
      type: integer
      description: Baud rate (2400, 4800, 9600, 19200, 38400, 57600, 115200)

- id: set_output_baud
  label: Set Output Baud Rate
  kind: action
  params:
    - name: output
      type: integer
      description: Output/zone number (1-based)
    - name: baud_rate
      type: integer
      description: Baud rate
    - name: data_bits
      type: integer
      description: Data bits (7 or 8)
    - name: parity
      type: integer
      description: "Parity: 0=none, 1=odd, 2=even"
    - name: stop_bits
      type: integer
      description: Stop bits (1 or 2)

- id: edid_set_default
  label: Set EDID Default
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)

- id: edid_save
  label: Save EDID to Memory
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: memory
      type: integer
      description: Memory slot number

- id: edid_set_internal
  label: Set EDID Internal
  kind: action
  params:
    - name: input
      type: integer
      description: Input number (1-based)
    - name: internal
      type: integer
      description: Internal EDID number

# TCP/IP-specific actions
- id: ipcfg
  label: Display IP Configuration
  kind: action
  params: []

- id: ip_set_timeout
  label: Set IP Timeout
  kind: action
  params:
    - name: seconds
      type: integer
      description: Timeout in seconds

- id: ip_logout
  label: IP Logout
  kind: action
  params: []

- id: ip_add_user
  label: Add IP User
  kind: action
  params:
    - name: username
      type: string
    - name: password
      type: string

- id: ip_del_user
  label: Delete IP User
  kind: action
  params:
    - name: username
      type: string

- id: ip_dhcp_on
  label: Enable DHCP
  kind: action
  params: []

- id: ip_dhcp_off
  label: Disable DHCP
  kind: action
  params: []

- id: ip_static
  label: Set Static IP
  kind: action
  params:
    - name: address
      type: string
    - name: netmask
      type: string
    - name: gateway
      type: string

- id: ip_set_port
  label: Set TCP/IP Port
  kind: action
  params:
    - name: port
      type: integer

- id: ip_login_on
  label: Enable IP Login
  kind: action
  params: []

- id: ip_login_off
  label: Disable IP Login
  kind: action
  params: []

- id: broadcast_on
  label: Enable Broadcast Mode
  kind: action
  params: []

- id: broadcast_off
  label: Disable Broadcast Mode
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: command_result
  type: enum
  values:
    - success
    - Command FAILED
  description: Generic command acknowledgement

- id: power_status
  type: enum
  values:
    - PWON
    - PWOFF
  description: Power state response to PWSTA

- id: firmware_version
  type: string
  description: Firmware version response to Version command

- id: model_number
  type: string
  description: Model number response to Type command

- id: lock_status
  type: enum
  values:
    - Lock
    - Unlock

- id: routing_confirmation
  type: string
  description: Echoes routing command (e.g. x1AVx2)

- id: output_off_confirmation
  type: string
  description: Echoes output off command (e.g. x1$)

- id: status_output
  type: string
  description: Status of single output to Statusx1 command (e.g. x7AVx1)

- id: status_all
  type: string
  description: Full routing status to Status command

- id: save_confirm
  type: string
  description: Preset save confirmation (e.g. Save2)

- id: recall_confirm
  type: string
  description: Preset recall confirmation

- id: clear_confirm
  type: string
  description: Preset clear confirmation

- id: rs232_zone_feedback
  type: string
  description: Feedback from RS-232 zone command

- id: ip_config
  type: string
  description: IP configuration response to IPCFG

- id: ip_timeout_feedback
  type: string
  description: IP timeout response (e.g. IPTimout120)

- id: ip_user_list
  type: string
  description: User list from IPAddUser

- id: ip_dhcp_status
  type: string
  description: DHCP status (e.g. IPDHCP on)

- id: ip_static_confirm
  type: string
  description: Static IP confirmation (e.g. IPStatic address netmask gateway)

- id: ip_port_confirm
  type: string
  description: Port confirmation (e.g. IPPort Y)

- id: ip_login_status
  type: string
  description: IPLogin status (e.g. IPLogin on)

- id: broadcast_status
  type: string
  description: Broadcast mode status

- id: rs232para_feedback
  type: string
  description: RS-232 parameter status for outputs

- id: edid_confirm
  type: string
  description: EDID operation confirmation
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters outside of action commands in source
```

## Events
```yaml
# UNRESOLVED: no unsolicited event descriptions in source - device may send spontaneous
# feedbacks but none documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
Commands are case-sensitive ASCII terminated with carriage return (`\r`). Failed commands return `Command FAILED`. Serial default: 115200/8/N/1. Matrix supports DHCP (default on) for TCP/IP. Login credentials: username `root`, password `Atlona`. Output RS-232 ports default to 9600/8/N/1. Preset slots 0–4 for save/recall/clear.
<!-- UNRESOLVED: TCP port number not stated in source — operator must configure -->
<!-- UNRESOLVED: unsolicited event messages not documented in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->

## Provenance

```yaml
source_domains:
  - atlona.com
source_urls:
  - https://atlona.com/pdf/manuals/AT-PRO3HD66M_V2.pdf
  - https://atlona.com/downloads/AMX_AT-PRO3HD66M.zip
  - https://atlona.com/downloads/Neets_AT-PRO3HD66M.zip
retrieved_at: 2026-05-19T19:45:48.289Z
last_checked_at: 2026-06-02T21:47:50.894Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:47:50.894Z
matched_actions: 34
action_count: 34
confidence: medium
summary: "All 34 spec actions traced to source. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/power specs not stated in source"
- "TCP port number not stated in source - operator must set port after connecting"
- "no discrete settable parameters outside of action commands in source"
- "no unsolicited event descriptions in source - device may send spontaneous"
- "no explicit multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "TCP port number not stated in source — operator must configure"
- "unsolicited event messages not documented in source"
- "firmware version compatibility range not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
