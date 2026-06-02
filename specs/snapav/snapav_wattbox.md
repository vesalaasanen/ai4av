---
spec_id: admin/snapav-wattbox
schema_version: ai4av-public-spec-v1
revision: 1
title: "Snapav Wattbox Control Spec"
manufacturer: Snapav
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - Snapav
  models:
    - WB-800-IPVM-6
    - WB-150
    - WB-250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:45:56.854Z
last_checked_at: 2026-06-02T22:14:38.487Z
generated_at: 2026-06-02T22:14:38.487Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WB-150/250 do not support power status queries per source"
  - "no unsolicited notifications documented"
  - "no explicit multi-step sequences documented"
  - "no explicit interlock or sequencing requirements in source"
  - "SSH key-based auth not documented"
  - "actual voltage/current ranges not specified"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:14:38.487Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Snapav Wattbox Control Spec

## Summary
IP-controlled power strip with individual outlet control. Supports Telnet (port 23) and SSH (port 22). Auth required (username/password). Firmware 1.3.0.4+ for SSH. Max 10 simultaneous connections.

<!-- UNRESOLVED: WB-150/250 do not support power status queries per source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # Telnet; SSH on port 22 (firmware 1.3.0.4+)
auth:
  type: username_password  # login required; SSH password max 13 chars
```

## Traits
```yaml
- powerable      # ON/OFF/TOGGLE/RESET per outlet
- routable       # outlet scheduling, host monitoring
- queryable      # ?Firmware, ?OutletStatus, ?PowerStatus, etc.
```

## Actions
```yaml
- id: outlet_set
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based, 0 = all outlets for RESET)
    - name: action
      type: enum
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: "Optional delay in seconds (1-600) for RESET action"
- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: delay
      type: integer
      description: "Delay in seconds (1-600)"
- id: outlet_mode_set
  label: Set Outlet Mode
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
    - name: mode
      type: integer
      description: "Operating mode: 0=Enabled, 1=Disabled, 2=Reset Only"
- id: outlet_reboot_set
  label: Set Outlet Reboot Behavior
  kind: action
  params:
    - name: outlets
      type: array
      items:
        type: integer
      description: Array of 12 outlet reboot operation values (0=Or, 1=And)
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
      description: Array of 12 outlet names
- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Disabled, 1=Enabled"
- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout Settings
  kind: action
  params:
    - name: timeout
      type: integer
      description: "Timeout in seconds (1-60)"
    - name: count
      type: integer
      description: "Consecutive time-outs before reboot (1-10)"
    - name: ping_delay
      type: integer
      description: "Ping delay in minutes (1-30)"
    - name: reboot_attempts
      type: integer
      description: "Reboot attempts (0=unlimited, 1-10)"
- id: firmware_update
  label: Firmware Update
  kind: action
  params:
    - name: url
      type: string
      description: Full path to firmware upgrade file
- id: reboot
  label: Reboot Device
  kind: action
- id: account_set
  label: Set Account Credentials
  kind: action
  params:
    - name: user
      type: string
      description: Username
    - name: pass
      type: string
      description: Password (max 13 chars for SSH)
- id: network_set
  label: Set Network Settings
  kind: action
  params:
    - name: host
      type: string
      description: Hostname
    - name: ip
      type: string
      description: "Static IP (omit for DHCP)"
    - name: subnet
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway
    - name: dns1
      type: string
      description: Primary DNS
    - name: dns2
      type: string
      description: Secondary DNS (optional, defaults to 8.8.8.8)
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
      description: "Action: 0=Off, 1=On, 2=Reset"
    - name: frequency
      type: integer
      description: "0=Once, 1=Recurring"
    - name: days_or_date
      type: string
      description: "Days array [s,m,t,w,t,f,s] or date [yyyy/mm/dd]"
    - name: time
      type: string
      description: "Time in 24-hour format [hh:mm]"
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
  label: Set Telnet State
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Disabled, 1=Enabled (reboot required)"
- id: web_server_set
  label: Set Web Server State
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Disabled, 1=Enabled (reboot required, firmware 2.0+)"
- id: set_sddp
  label: Set SDDP Broadcasting State
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Disabled, 1=Enabled (firmware 2.0+)"
- id: exit
  label: Close Session
  kind: action
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
  type: array
  items:
    type: integer
  description: "Array of outlet states: 0=off, 1=on"
- id: outlet_power_status
  label: Outlet Power Status
  type: object
  properties:
    - name: outlet
      type: integer
    - name: power_watts
      type: number
    - name: current_amps
      type: number
    - name: voltage_volts
      type: number
- id: power_status
  label: Power Status
  type: object
  properties:
    - name: current_amps
      type: number
    - name: power_watts
      type: number
    - name: voltage_volts
      type: number
    - name: safe_voltage_status
      type: integer
- id: auto_reboot
  label: Auto Reboot Status
  type: integer
  description: "0=Disabled, 1=Enabled"
- id: outlet_name
  label: Outlet Names
  type: array
  items:
    type: string
- id: ups_status
  label: UPS Status
  type: object
  properties:
    - name: battery_charge_percent
      type: integer
    - name: battery_load_percent
      type: integer
    - name: battery_health
      type: string
    - name: power_lost
      type: boolean
    - name: battery_runtime_minutes
      type: integer
    - name: alarm_enabled
      type: boolean
    - name: alarm_muted
      type: boolean
- id: ups_connection
  label: UPS Connection
  type: integer
  description: "0=Disconnected, 1=Connected"
- id: error
  label: Error
  type: string
  description: "Sent on invalid command or internal error"
```

## Variables
```yaml
# No standalone settable parameters beyond the action params above.
# All configurable parameters are exposed as action params.
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences documented
```

## Safety
```yaml
confirmation_required_for:
  - reboot           # device disconnects until back online
  - firmware_update  # device disconnects until back online
  - network_set      # device may return at different IP after reboot
  - account_set      # client must reconnect after credential change
interlocks: []
# UNRESOLVED: no explicit interlock or sequencing requirements in source
```

## Notes
WB-150/250 do not support `?OutletPowerStatus` or `?PowerStatus`. SSH requires firmware 1.3.0.4+. Max 10 simultaneous connections. Telnet on port 23, SSH on port 22. Message format: ASCII text, `?` = request, `!` = control, `#` = error, `~` = unsolicited, `\n` = 0x0A.
<!-- UNRESOLVED: SSH key-based auth not documented -->
<!-- UNRESOLVED: actual voltage/current ranges not specified -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:45:56.854Z
last_checked_at: 2026-06-02T22:14:38.487Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:14:38.487Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WB-150/250 do not support power status queries per source"
- "no unsolicited notifications documented"
- "no explicit multi-step sequences documented"
- "no explicit interlock or sequencing requirements in source"
- "SSH key-based auth not documented"
- "actual voltage/current ranges not specified"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
