---
schema_version: ai4av-public-spec-v1
device_id: wattbox/wb-800-ipvm-6
entity_id: wattbox_ip_power_controller
spec_id: admin/wattbox-ip-power-controller
revision: 1
author: admin
title: "WattBox IP Power Controller Control Spec"
status: published
manufacturer: WattBox
manufacturer_key: wattbox
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - WattBox
  models:
    - WB-800-IPVM-6
    - WB-150
    - WB-250
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: wattbox_ip_power_controller_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:20.162Z
retrieved_at: 2026-04-27T10:13:20.162Z
last_checked_at: 2026-04-27T10:13:20.162Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:20.162Z
  matched_actions: 31
  action_count: 31
  confidence: high
  summary: "All 31 spec commands and queries match the source protocol exactly; transport parameters verified against source; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# WattBox IP Power Controller Control Spec

## Summary
The WattBox IP Power Controller is a network-controllable power strip with 16 individually switchable outlets. Control is via TCP/Telnet (port 23) or SSH (port 22) using ASCII text command messages. Authentication with username and password is required. Query commands return outlet states, power metrics, and UPS status where supported.

<!-- UNRESOLVED: SSH password character limit (13) only applies to SSH; Telnet auth details not specified in source -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: username_password  # stated: login prompt requires username/password
```

## Traits
```yaml
# UNRESOLVED: traits derived from protocol commands present
# Inferred from command set:
powerable: true    # !OutletSet controls outlet power (ON/OFF/TOGGLE/RESET)
routable: false    # no input/output routing commands present
queryable: true    # multiple ? query commands returning state
levelable: false   # no level/gain/brightness commands
```

## Actions
```yaml
- id: outlet_set
  label: Set Outlet State
  kind: action
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based), or 0 for all outlets
    - name: action
      type: string
      description: "Action: ON, OFF, TOGGLE, or RESET"
    - name: delay
      type: integer
      description: "Optional delay in seconds (1-600) for RESET action"
  notes: "RESET cycles power off then on; accepts optional delay parameter 1-600s"

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
      description: "Mode: 0=Enabled, 1=Disabled, 2=Reset Only"

- id: outlet_reboot_set
  label: Set Outlet Reboot Behavior
  kind: action
  params:
    - name: outlet1
      type: integer
      description: Outlet 1 reboot operation (0=Any times out Or, 1=All time out And)
    - name: outlet2
      type: integer
      description: Outlet 2 reboot operation
    - name: outlet3
      type: integer
      description: Outlet 3 reboot operation
    - name: outlet4
      type: integer
      description: Outlet 4 reboot operation
    - name: outlet5
      type: integer
      description: Outlet 5 reboot operation
    - name: outlet6
      type: integer
      description: Outlet 6 reboot operation
    - name: outlet7
      type: integer
      description: Outlet 7 reboot operation
    - name: outlet8
      type: integer
      description: Outlet 8 reboot operation
    - name: outlet9
      type: integer
      description: Outlet 9 reboot operation
    - name: outlet10
      type: integer
      description: Outlet 10 reboot operation
    - name: outlet11
      type: integer
      description: Outlet 11 reboot operation
    - name: outlet12
      type: integer
      description: Outlet 12 reboot operation
  notes: "12 parameters for 12 outlets; each outlet can be configured independently"

- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  params:
    - name: state
      type: integer
      description: "State: 0=Disabled, 1=Enabled"

- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout Settings
  kind: action
  params:
    - name: timeout
      type: integer
      description: Timeout in seconds (1-60)
    - name: count
      type: integer
      description: Consecutive time-outs before reboot (1-10)
    - name: ping_delay
      type: integer
      description: Ping delay in minutes (1-30)
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
  notes: "Device disconnects during update; reconnect after device returns online"

- id: reboot
  label: Reboot Device
  kind: action
  params: []

- id: account_set
  label: Set Account Credentials
  kind: action
  params:
    - name: username
      type: string
      description: Username
    - name: password
      type: string
      description: Password
  notes: "Device disconnects after credential change; must reconnect with new credentials"

- id: network_set
  label: Set Network Settings
  kind: action
  params:
    - name: host
      type: string
      description: Hostname
    - name: ip
      type: string
      description: "Static IP address (omit for DHCP)"
    - name: subnet
      type: string
      description: Subnet mask
    - name: gateway
      type: string
      description: Gateway address
    - name: dns1
      type: string
      description: Primary DNS server
    - name: dns2
      type: string
      description: Secondary DNS server (optional, auto-filled to 8.8.8.8)
  notes: "Device reboots after network settings change; IP address may change"

- id: schedule_add
  label: Add Schedule
  kind: action
  params:
    - name: name
      type: string
      description: Schedule name
    - name: outlets
      type: array
      description: Array of outlet numbers {1,2,3}
    - name: action
      type: integer
      description: "Action: 0=Off, 1=On, 2=Reset"
    - name: frequency
      type: integer
      description: "Frequency: 0=Once, 1=Recurring"
    - name: days_or_date
      type: string
      description: "Days [s,m,t,w,t,f,s] array or date [yyyy/mm/dd]"
    - name: time
      type: string
      description: "Time in 24-hour format [hh:mm]"
  notes: "Brackets required around values; commas between outlet arrays"

- id: host_add
  label: Add Host to Monitor
  kind: action
  params:
    - name: name
      type: string
      description: Host name
    - name: ip
      type: string
      description: Website or IP address to monitor
    - name: outlets
      type: array
      description: Array of outlet numbers to tie to this host

- id: set_telnet
  label: Set Telnet Service State
  kind: action
  params:
    - name: mode
      type: integer
      description: "Mode: 0=Disabled, 1=Enabled"
  notes: "Requires reboot to take effect"

- id: web_server_set
  label: Set Web Server State
  kind: action
  params:
    - name: mode
      type: integer
      description: "Mode: 0=Disabled, 1=Enabled"
  notes: "Requires reboot to take effect; requires firmware 2.0"

- id: set_sddp
  label: Set SDDP Broadcasting State
  kind: action
  params:
    - name: mode
      type: integer
      description: "Mode: 0=Disabled, 1=Enabled"
  notes: "Requires firmware 2.0"

- id: exit
  label: Close Session
  kind: action
  params: []
  notes: "Gracefully closes the session"
```

## Feedbacks
```yaml
- id: firmware
  label: Firmware Version
  type: string
  description: Returns firmware version string
  example: "?Firmware=1.0.0.0"

- id: hostname
  label: Hostname
  type: string
  example: "?Hostname=Wattbox"

- id: service_tag
  label: Service Tag
  type: string
  example: "?ServiceTag=ST191500681E8422"

- id: model
  label: Model Number
  type: string
  example: "?Model=WB-800-IPVM-6"

- id: outlet_count
  label: Outlet Count
  type: integer
  example: "?OutletCount=16"

- id: outlet_status
  label: All Outlet States
  type: array
  description: "Comma-separated array; index=outlet number, value=0(off) or 1(on)"
  example: "?OutletStatus=0,0,0,0,0,0,0,0,0,0,0,0"

- id: outlet_power_status
  label: Single Outlet Power Status
  type: object
  properties:
    - name: outlet
      type: integer
      description: Outlet number
    - name: power_watts
      type: number
      description: Power in watts
    - name: current_amps
      type: number
      description: Current in amps
    - name: voltage_volts
      type: number
      description: Voltage in volts
  example: "?OutletPowerStatus=1,1.01,0.02,116.50"
  notes: "Not supported on WB-150/WB-250 models"

- id: power_status
  label: System Power Status
  type: object
  properties:
    - name: current_amps
      type: number
      description: Current in amps
    - name: power_watts
      type: number
      description: Power in watts
    - name: voltage_volts
      type: number
      description: Voltage in volts
    - name: safe_voltage_status
      type: integer
      description: "Safe voltage status indicator"
  example: "?PowerStatus=60.00,600.00,110.00,1"
  notes: "Not supported on WB-150/WB-250 models"

- id: auto_reboot
  label: Auto Reboot Status
  type: integer
  values: [0, 1]
  description: "0=Disabled, 1=Enabled"
  example: "?AutoReboot=1"

- id: outlet_name
  label: Outlet Names
  type: array
  description: "Array of outlet names in brackets, comma-delimited"
  example: "?OutletName={Outlet 1},{Outlet 2},..."

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
      values: [Good, Bad]
    - name: power_lost
      type: boolean
    - name: battery_runtime_minutes
      type: integer
    - name: alarm_enabled
      type: boolean
    - name: alarm_muted
      type: boolean
  example: "?UPSStatus=50,0,Good,False,25,True,False"

- id: ups_connection
  label: UPS Connection Status
  type: integer
  values: [0, 1]
  description: "0=Disconnected, 1=Connected"
  example: "?UPSConnection=0"

- id: error
  label: Error
  type: string
  description: "Error message; sent when invalid command or internal device error"
  example: "#Error"
  notes: "See device log page for detailed error messages"
```

## Variables
```yaml
# Variables that are settable but not discrete actions:
- id: outlet_name_individual
  label: Set Individual Outlet Name
  type: string
  writable: true
  params:
    - name: outlet
      type: integer
    - name: name
      type: string

- id: outlet_name_all
  label: Set All Outlet Names
  type: array
  writable: true
  description: "Set names for all outlets simultaneously; 12 names in order"
```

## Events
```yaml
# UNRESOLVED: No unsolicited event messages documented; device sends ~ prefix
# for unsolicited messages but no specific events described in source
```

## Macros
```yaml
# UNRESOLVED: No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: No safety warnings or interlock procedures stated in source
# NOTE: Per-outlet power cycling operations carry inherent risk of disrupting
# connected loads; operator should confirm before issuing RESET commands
```

## Notes
- Connection limit: 10 simultaneous connections maximum
- SSH support added in firmware 1.3.0.4; SSH password limited to 13 characters
- Message format: ASCII text, commands prefixed with ? (!, #, ~), terminated by \n (0x0A)
- WB-150 and WB-250 do not support outlet power status or system power status queries
- Firmware 2.0 required for web server and SDDP configuration
- Network settings changes cause device reboot; device may return at different IP
- Error responses sent with # prefix; check device log for details
<!-- UNRESOLVED: Telnet authentication credentials default not stated -->
<!-- UNRESOLVED: WB-150/WB-250 outlet count not stated in source -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: wattbox_ip_power_controller_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:20.162Z
retrieved_at: 2026-04-27T10:13:20.162Z
last_checked_at: 2026-04-27T10:13:20.162Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:20.162Z
matched_actions: 31
action_count: 31
confidence: high
summary: "All 31 spec commands and queries match the source protocol exactly; transport parameters verified against source; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```
