---
spec_id: admin/wattbox-wb-800-ipvm-6
schema_version: ai4av-public-spec-v1
revision: 1
title: "Wattbox WB-800-IPVM-6 Control Spec"
manufacturer: Wattbox
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - Wattbox
  models:
    - WB-800-IPVM-6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
retrieved_at: 2026-04-30T04:26:11.547Z
last_checked_at: 2026-04-23T08:29:48.596Z
generated_at: 2026-04-23T08:29:48.596Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:29:48.596Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "Every spec action (29 total) matched verbatim in source; all transport parameters confirmed; no fabrication or drift detected."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-20
---

# Wattbox WB-800-IPVM-6 Control Spec

## Summary
The Wattbox WB-800-IPVM-6 is a 16-outlet IP-controlled power distribution unit supporting both Telnet (port 23) and SSH (port 22) connections. All commands require authentication via username/password login. The device accepts ASCII text commands with `?` prefix for queries, `!` prefix for control actions, and `\n` (0x0A) as command terminator.

<!-- UNRESOLVED: SSH password limit of 13 characters only applies to SSH; Telnet password limit not stated -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: password  # stated: requires username/password login
  note: SSH on port 22 also supported (firmware 1.3.0.4+); 13-char password limit for SSH
```

## Traits
```yaml
# inferred from command examples:
# - powerable: outlet on/off/reset commands present
# - routable: N/A (power switching, not AV routing)
# - queryable: extensive ? query commands present
# - levelable: N/A (discrete outlet control, not continuous levels)
```

## Actions
```yaml
# Control commands (! prefix)

- id: outlet_set
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based); 0 = all outlets (reset only)
    - name: action
      type: enum
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: Optional delay in seconds (1-600) for RESET action

- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  params:
    - name: outlet
      type: integer
    - name: delay
      type: integer
      description: Delay in seconds (1-600)

- id: outlet_mode_set
  label: Set Outlet Mode
  kind: action
  params:
    - name: outlet
      type: integer
    - name: mode
      type: enum
      values:
        - 0  # Enabled
        - 1  # Disabled
        - 2  # Reset Only

- id: outlet_reboot_set
  label: Set Outlet Reboot Behavior
  kind: action
  params:
    - name: outlets
      type: array
      items:
        type: integer
      description: Array of outlet numbers
    - name: op
      type: enum
      values:
        - 0  # (Any selected hosts time-out) Or
        - 1  # (All selected hosts time out) And

- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  params:
    - name: state
      type: enum
      values: [0, 1]  # 0=disabled, 1=enabled

- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout Settings
  kind: action
  params:
    - name: timeout
      type: integer
      description: Seconds (1-60)
    - name: count
      type: integer
      description: Consecutive time-outs (1-10)
    - name: ping_delay
      type: integer
      description: Minutes between retest (1-30)
    - name: reboot_attempts
      type: integer
      description: 0=unlimited, 1-10

- id: firmware_update
  label: Update Firmware
  kind: action
  params:
    - name: url
      type: string
      description: Full path to firmware upgrade file

- id: reboot
  label: Reboot Device
  kind: action
  params: []

- id: account_set
  label: Set Account Credentials
  kind: action
  params:
    - name: user
      type: string
    - name: pass
      type: string

- id: network_set
  label: Set Network Configuration
  kind: action
  params:
    - name: host
      type: string
    - name: ip
      type: string
      description: Static IP address (omit for DHCP)
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: dns1
      type: string
    - name: dns2
      type: string
      description: Optional, defaults to 8.8.8.8

- id: schedule_add
  label: Add Schedule
  kind: action
  params:
    - name: name
      type: string
    - name: outlets
      type: array
      items:
        type: integer
    - name: action
      type: enum
      values: [0, 1, 2]  # Off, On, Reset
    - name: frequency
      type: enum
      values: [0, 1]  # Once, Recurring
    - name: days
      type: array
      items:
        type: integer
      description: "Recurring: [s,m,t,w,t,f,s] binary array; Once: date yyyy/mm/dd"
    - name: time
      type: string
      description: "24-hour format hh:mm"

- id: host_add
  label: Add Monitored Host
  kind: action
  params:
    - name: name
      type: string
    - name: ip
      type: string
    - name: outlets
      type: array
      items:
        type: integer

- id: set_telnet
  label: Enable/Disable Telnet
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]  # 0=disabled, 1=enabled

- id: web_server_set
  label: Enable/Disable Web Server
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
  note: Requires firmware 2.0

- id: set_sddp
  label: Enable/Disable SDDP
  kind: action
  params:
    - name: mode
      type: enum
      values: [0, 1]
  note: Requires firmware 2.0

- id: exit
  label: Close Session
  kind: action
  params: []
```

## Feedbacks
```yaml
# Query commands (? prefix)

- id: firmware
  label: Firmware Version
  kind: feedback
  params: []
  response_type: string
  example: "?Firmware=1.0.0.0"

- id: hostname
  label: Hostname
  kind: feedback
  params: []
  response_type: string
  example: "?Hostname=Wattbox"

- id: service_tag
  label: Service Tag
  kind: feedback
  params: []
  response_type: string

- id: model
  label: Model Number
  kind: feedback
  params: []
  response_type: string

- id: outlet_count
  label: Outlet Count
  kind: feedback
  params: []
  response_type: integer

- id: outlet_status
  label: All Outlet States
  kind: feedback
  params: []
  response_type: string
  description: "Comma-separated binary array, e.g. 0,0,0,0,0,0,0,0,0,0,0,0 (0=off, 1=on)"

- id: outlet_power_status
  label: Specific Outlet Power Status
  kind: feedback
  params:
    - name: outlet
      type: integer
  response_type: string
  description: "Returns: outlet,watts,amps,volts"
  example: "?OutletPowerStatus=1,1.01,0.02,116.50"
  note: Not supported on WB150/250

- id: power_status
  label: System Power Status
  kind: feedback
  params: []
  response_type: string
  description: "Returns: amps,watts,volts,safe_voltage_status"
  example: "?PowerStatus=60.00,600.00,110.00,1"
  note: Not supported on WB150/250

- id: auto_reboot
  label: Auto Reboot Status
  kind: feedback
  params: []
  response_type: enum
  values: [0, 1]

- id: outlet_name
  label: All Outlet Names
  kind: feedback
  params: []
  response_type: string
  description: "Comma-delimited names in brackets: {Outlet 1},{Outlet 2},..."

- id: ups_status
  label: UPS Status
  kind: feedback
  params: []
  response_type: string
  description: "battery_charge,battery_load,health,power_lost,runtime,alarm_enabled,alarm_muted"
  example: "?UPSStatus=50,0,Good,False,25,True,False"

- id: ups_connection
  label: UPS Connection Status
  kind: feedback
  params: []
  response_type: enum
  values: [0, 1]  # 0=disconnected, 1=connected

- id: error
  label: Error
  kind: feedback
  params: []
  response_type: string
  description: "Sent on invalid command or internal device error"
```

## Variables
```yaml
# UNRESOLVED: no settable parameters discovered that are not discrete actions
```

## Events
```yaml
# UNRESOLVED: no unsolicited (~) event messages documented
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: host_reboot_interlock
    description: Outlet reboot behavior (Or/And) determines whether any or all monitored hosts must time out before triggering outlet reset
  - id: auto_reboot_interlock
    description: Auto reboot waits ping_delay minutes after reboot before retesting connection; reboot_attempts (0=unlimited, 1-10) controls retry count
# UNRESOLVED: no safety warnings or interlock procedures explicitly stated in source
```

## Notes
- Maximum 10 simultaneous connections
- SSH support requires firmware 1.3.0.4+
- Web server and SDDP control require firmware 2.0
- SSH password limited to 13 characters; Telnet password limit not stated
- Device reboots after network settings change; IP address may change
- Firmware update and reboot commands cause connection loss until device returns online
- Account change invalidates current session and requires reconnect
- Message structure: ASCII text, `?`=query, `!`=control, `#`=error, `~`=unsolicited, `\n` (0x0A)=EOM

## Provenance

```yaml
source_domains:
  - snapav.com
retrieved_at: 2026-04-30T04:26:11.547Z
last_checked_at: 2026-04-23T08:29:48.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:29:48.596Z
matched_actions: 29
action_count: 29
confidence: high
summary: "Every spec action (29 total) matched verbatim in source; all transport parameters confirmed; no fabrication or drift detected."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
