---
spec_id: admin/wattbox-wb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "WattBox WB Series Control Spec"
manufacturer: WattBox
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - WattBox
  models:
    - WB-800-IPVM-6
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
retrieved_at: 2026-05-01T01:56:20.723Z
last_checked_at: 2026-04-27T10:13:20.712Z
generated_at: 2026-04-27T10:13:20.712Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:20.712Z
  matched_actions: 18
  action_count: 18
  confidence: high
  summary: "All 18 spec actions match source commands; transport parameters verified; comprehensive coverage achieved."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# WattBox WB Series Control Spec

## Summary
The WattBox WB Series is an IP-controllable power strip with individual outlet control. It supports Telnet (port 23) and SSH (port 22) for TCP/IP control, with username/password authentication required. The device exposes query commands for status monitoring and control commands for outlet management, power scheduling, and network configuration.

<!-- UNRESOLVED: WB-150/250 models do not support per-outlet power status or system power status queries -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # Telnet; SSH available on port 22 (firmware 1.3.0.4+)
auth:
  type: password  # username/password required; SSH password limited to 13 characters
connection_limit: 10  # maximum simultaneous connections stated in source
```

## Traits
```yaml
- powerable       # !OutletSet=OUTLET,ON/OFF/TOGGLE/RESET present
- queryable       # multiple ? commands returning state present
- routable        # scheduling and host monitoring commands present
```

## Actions
```yaml
- id: outlet_set
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based); use 0 to reset all outlets
    - name: action
      type: string
      enum: [ON, OFF, TOGGLE, RESET]
      description: Desired action
    - name: delay
      type: integer
      required: false
      description: Delay in seconds (1-600) for RESET action override

- id: outlet_name_set
  label: Set Outlet Name
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: name
      type: string
      description: New outlet name

- id: outlet_name_set_all
  label: Set All Outlet Names
  kind: action
  params:
    - name: names
      type: array
      items:
        type: string
      description: Array of outlet names in order (Outlet 1 first)

- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: delay
      type: integer
      description: Delay in seconds (1-600)

- id: outlet_mode_set
  label: Set Outlet Mode
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: mode
      type: integer
      enum: [0, 1, 2]
      description: "0=Enabled, 1=Disabled, 2=Reset Only"

- id: outlet_reboot_set
  label: Set Outlet Reboot Behavior
  kind: action
  params:
    - name: behaviors
      type: array
      items:
        type: integer
      description: "Array of 12 outlet behaviors: 0=(Any host timeout) Or, 1=(All hosts timeout) And"

- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  params:
    - name: state
      type: integer
      enum: [0, 1]
      description: "0=Disabled, 1=Enabled"

- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout Settings
  kind: action
  params:
    - name: timeout
      type: integer
      description: Timeout in seconds (1-60)
    - name: count
      type: integer
      description: Consecutive time-outs before auto-reboot (1-10)
    - name: ping_delay
      type: integer
      description: Retry delay in minutes (1-30)
    - name: reboot_attempts
      type: integer
      description: "Reboot attempts (0=unlimited, 1-10)"

- id: firmware_update
  label: Update Firmware
  kind: action
  params:
    - name: url
      type: string
      description: Full URL path to firmware upgrade file

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
      description: Username
    - name: pass
      type: string
      description: Password

- id: network_set
  label: Set Network Settings
  kind: action
  params:
    - name: host
      type: string
      description: Hostname
    - name: ip
      type: string
      required: false
      description: Static IP (omit to use DHCP)
    - name: subnet
      type: string
      required: false
      description: Subnet mask
    - name: gateway
      type: string
      required: false
      description: Gateway
    - name: dns1
      type: string
      required: false
      description: Primary DNS
    - name: dns2
      type: string
      required: false
      description: Secondary DNS

- id: schedule_add
  label: Add Schedule
  kind: action
  params:
    - name: name
      type: string
      description: Schedule name
    - name: outlets
      type: array
      items:
        type: integer
      description: Array of outlet numbers
    - name: action
      type: integer
      enum: [0, 1, 2]
      description: "0=Off, 1=On, 2=Reset"
    - name: frequency
      type: integer
      enum: [0, 1]
      description: "0=Once, 1=Recurring"
    - name: days_or_date
      type: string
      description: "Recurring: 7-char array {s,m,t,w,t,f,s} with 0/1; Once: yyyy/mm/dd"
    - name: time
      type: string
      description: "24-hour time hh:mm"

- id: host_add
  label: Add Host to Monitor
  kind: action
  params:
    - name: name
      type: string
      description: Host name
    - name: ip
      type: string
      description: Website or IP address to test
    - name: outlets
      type: array
      items:
        type: integer
      description: Array of outlet numbers tied to this host

- id: set_telnet
  label: Enable/Disable Telnet Service
  kind: action
  params:
    - name: mode
      type: integer
      enum: [0, 1]
      description: "0=Disabled, 1=Enabled; reboot required"

- id: web_server_set
  label: Enable/Disable Web Server
  kind: action
  params:
    - name: mode
      type: integer
      enum: [0, 1]
      description: "0=Disabled, 1=Enabled; reboot required; requires firmware 2.0+"

- id: set_sddp
  label: Enable/Disable SDDP Broadcasting
  kind: action
  params:
    - name: mode
      type: integer
      enum: [0, 1]
      description: "0=Disabled, 1=Enabled; requires firmware 2.0+"

- id: exit
  label: Close Session
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: firmware
  label: Firmware Version
  type: string

- id: hostname
  label: Hostname
  type: string

- id: service_tag
  label: Service Tag
  type: string

- id: model
  label: Model Number
  type: string

- id: outlet_count
  label: Outlet Count
  type: integer

- id: outlet_status
  label: Outlet States
  type: string
  description: "Comma-separated array of outlet states: 0=off, 1=on; array index = outlet number"

- id: outlet_power_status
  label: Outlet Power Status
  type: object
  description: "Requires firmware 1.3.0.4+; not supported on WB-150/250"
  properties:
    - name: outlet
      type: integer
    - name: watts
      type: number
    - name: amps
      type: number
    - name: volts
      type: number

- id: power_status
  label: Power Status
  type: object
  description: "Not supported on WB-150/250"
  properties:
    - name: amps
      type: number
    - name: watts
      type: number
    - name: volts
      type: number
    - name: safe_voltage_status
      type: integer

- id: auto_reboot
  label: Auto Reboot Status
  type: enum
  values: [0, 1]
  description: "0=Disabled, 1=Enabled"

- id: outlet_names
  label: Outlet Names
  type: array
  items:
    type: string
  description: "Array of outlet names in order"

- id: ups_status
  label: UPS Status
  type: object
  description: "Only if UPS attached"
  properties:
    - name: battery_charge_percent
      type: integer
    - name: battery_load_percent
      type: integer
    - name: battery_health
      type: string
      enum: [Good, Bad]
    - name: power_lost
      type: boolean
    - name: battery_runtime_minutes
      type: integer
    - name: alarm_enabled
      type: boolean
    - name: alarm_muted
      type: boolean

- id: ups_connection
  label: UPS Connection Status
  type: enum
  values: [0, 1]
  description: "0=Disconnected, 1=Connected"

- id: error
  label: Error
  type: string
  description: "Returned when invalid command received or internal device error; see device log for details"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for:
  - "!FirmwareUpdate"  # device goes offline during update
  - "!Reboot"           # device goes offline during reboot
  - "!NetworkSet"      # device may come back at different IP after reboot
  - "!AccountSet"      # client disconnects and must reconnect with new credentials
interlocks: []
# UNRESOLVED: no safety interlock procedures stated in source
```

## Notes
- Message prefix conventions: `?` = request, `!` = control, `#` = error, `~` = unsolicited, `\n` = end of command (0x0A)
- Maximum simultaneous connections: 10
- SSH support requires firmware 1.3.0.4+
- Web server and SDDP commands require firmware 2.0+
- Per-outlet power status and system power status queries not supported on WB-150/250 models
- SSH password has 13-character limit
- Network settings change causes device reboot; device may return at different IP
- Firmware update and reboot commands cause client connection loss until device comes back online
<!-- UNRESOLVED: voltage/current/power specifications not independently verified -->

## Provenance

```yaml
source_domains:
  - snapav.com
retrieved_at: 2026-05-01T01:56:20.723Z
last_checked_at: 2026-04-27T10:13:20.712Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:20.712Z
matched_actions: 18
action_count: 18
confidence: high
summary: "All 18 spec actions match source commands; transport parameters verified; comprehensive coverage achieved."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
