---
spec_id: admin/wattbox-wb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "WattBox WB Series IP Control Spec"
manufacturer: WattBox
model_family: "WB Series"
aliases: []
compatible_with:
  manufacturers:
    - WattBox
  models:
    - "WB Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:26:15.169Z
last_checked_at: 2026-06-02T07:06:56.278Z
generated_at: 2026-06-02T07:06:56.278Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WB150/250 omit OutletPowerStatus and PowerStatus (per source notes). Per-outlet outlet count not stated; example response shows 12 outlets but real count is model-dependent."
  - "source does not state a baud_rate for serial"
  - "source does not document multi-step sequences"
  - "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
  - "full set of supported WB Series models and per-model outlet counts not stated."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:56.278Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literally in source; transport parameters verified; no fabrications or shape mismatches. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# WattBox WB Series IP Control Spec

## Summary
IP-controllable power conditioner family from WattBox (SnapAV). Spec covers Telnet/SSH integration protocol v2.4 rev20210527: ASCII command set for outlet control, scheduling, host monitoring, network config, and UPS status.

<!-- UNRESOLVED: WB150/250 omit OutletPowerStatus and PowerStatus (per source notes). Per-outlet outlet count not stated; example response shows 12 outlets but real count is model-dependent. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
serial:
  null  # UNRESOLVED: source does not state a baud_rate for serial
auth:
  type: password  # source: "login prompt... third-party system must provide a valid username and password"
```

## Traits
```yaml
- powerable       # outlet ON/OFF/TOGGLE/RESET
- routable        # !OutletModeSet (Enabled/Disabled/Reset Only) and !OutletRebootSet (Any host timeout / All selected hosts timeout)
- queryable       # extensive ? queries
```

## Actions
```yaml
- id: firmware_query
  label: Firmware Version Query
  kind: query
  command: "?Firmware\n"
  params: []
- id: hostname_query
  label: Hostname Query
  kind: query
  command: "?Hostname\n"
  params: []
- id: service_tag_query
  label: Service Tag Query
  kind: query
  command: "?ServiceTag\n"
  params: []
- id: model_query
  label: Model Number Query
  kind: query
  command: "?Model\n"
  params: []
- id: outlet_count_query
  label: Outlet Count Query
  kind: query
  command: "?OutletCount\n"
  params: []
- id: outlet_status_query
  label: Outlet States Query
  kind: query
  command: "?OutletStatus\n"
  params: []
- id: outlet_power_status_query
  label: Outlet Power Status Query
  kind: query
  command: "?OutletPowerStatus={outlet}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based). Not supported on WB150/250.
- id: power_status_query
  label: System Power Status Query
  kind: query
  command: "?PowerStatus\n"
  params: []
- id: auto_reboot_query
  label: Auto Reboot Status Query
  kind: query
  command: "?AutoReboot\n"
  params: []
- id: outlet_name_query
  label: Outlet Names Query
  kind: query
  command: "?OutletName\n"
  params: []
- id: ups_status_query
  label: UPS Status Query
  kind: query
  command: "?UPSStatus\n"
  params: []
- id: ups_connection_query
  label: UPS Connection Query
  kind: query
  command: "?UPSConnection\n"
  params: []
- id: outlet_name_set
  label: Set Outlet Name
  kind: action
  command: "!OutletNameSet={outlet},{name}\n"
  params:
    - name: outlet
      type: integer
    - name: name
      type: string
- id: outlet_name_set_all
  label: Set All Outlet Names
  kind: action
  command: "!OutletNameSetAll={name1},{name2},{name3},{name4},{name5},{name6},{name7},{name8},{name9},{name10},{name11},{name12}\n"
  params: []
  notes: Source shows 12-slot example; outlet count is model-dependent. Brackets required around every NAME.
- id: outlet_set
  label: Set Outlet State
  kind: action
  command: "!OutletSet={outlet},{action},{delay}\n"
  params:
    - name: outlet
      type: integer
    - name: action
      type: enum
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: Optional, 1-600 seconds. Applies to RESET only. Omit for other actions.
- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  command: "!OutletPowerOnDelaySet={outlet},{delay}\n"
  params:
    - name: outlet
      type: integer
    - name: delay
      type: integer
      description: 1-600 seconds
- id: outlet_mode_set
  label: Set Outlet Operating Mode
  kind: action
  command: "!OutletModeSet={outlet},{mode}\n"
  params:
    - name: outlet
      type: integer
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: 0=Enabled, 1=Disabled, 2=Reset Only
- id: outlet_reboot_set
  label: Set Outlet Reboot Operation
  kind: action
  command: "!OutletRebootSet={op1},{op2},{op3},{op4},{op5},{op6},{op7},{op8},{op9},{op10},{op11},{op12}\n"
  params:
    - name: op_n
      type: enum
      values: [0, 1]
      description: One per outlet; 0=Any selected host timeout, 1=All selected hosts timeout
- id: auto_reboot_set
  label: Set Auto Reboot
  kind: action
  command: "!AutoReboot={state}\n"
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: 0=Disabled, 1=Enabled
- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout Settings
  kind: action
  command: "!AutoRebootTimeoutSet={timeout},{count},{ping_delay},{reboot_attempts}\n"
  params:
    - name: timeout
      type: integer
      description: 1-60 seconds
    - name: count
      type: integer
      description: 1-10
    - name: ping_delay
      type: integer
      description: 1-30 minutes
    - name: reboot_attempts
      type: integer
      description: 0=unlimited, 1-10
- id: firmware_update
  label: Firmware Update
  kind: action
  command: "!FirmwareUpdate={url}\n"
  params:
    - name: url
      type: string
      description: Full path to upgrade file. Device shuts down after OK response.
- id: reboot
  label: Reboot Device
  kind: action
  command: "!Reboot\n"
  params: []
- id: account_set
  label: Set Login Credentials
  kind: action
  command: "!AccountSet={user},{pass}\n"
  params:
    - name: user
      type: string
    - name: pass
      type: string
- id: network_set
  label: Set Network Configuration
  kind: action
  command: "!NetworkSet={host},{ip},{subnet},{gateway},{dns1},{dns2}\n"
  params:
    - name: host
      type: string
      description: Hostname
    - name: ip
      type: string
      description: Omit (with following fields) for DHCP
    - name: subnet
      type: string
    - name: gateway
      type: string
    - name: dns1
      type: string
    - name: dns2
      type: string
      description: Optional; auto-fills 8.8.8.8
- id: schedule_add
  label: Add Schedule
  kind: action
  command: "!ScheduleAdd={name},{outlets},{action},{freq},{days_or_date},{time}\n"
  params:
    - name: name
      type: string
    - name: outlets
      type: string
      description: Bracketed array, e.g. {1,2,3}
    - name: action
      type: enum
      values: [0, 1, 2]
      description: 0=Off, 1=On, 2=Reset
    - name: freq
      type: enum
      values: [0, 1]
      description: 0=Once, 1=Recurring
    - name: days_or_date
      type: string
      description: Recurring: 7-element day array, e.g. {0,1,0,1,0,1,0}. Once: {yyyy/mm/dd}.
    - name: time
      type: string
      description: hh:mm 24-hour, e.g. 13:30
- id: host_add
  label: Add Monitored Host
  kind: action
  command: "!HostAdd={name},{ip},{outlets}\n"
  params:
    - name: name
      type: string
    - name: ip
      type: string
      description: Website or IP address to test
    - name: outlets
      type: string
      description: Bracketed array of outlet numbers, e.g. {1,2}
- id: set_telnet
  label: Enable/Disable Telnet
  kind: action
  command: "!SetTelnet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: 0=Disabled, 1=Enabled. Reboot required.
- id: web_server_set
  label: Enable/Disable Web Server
  kind: action
  command: "!WebServerSet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: 0=Disabled, 1=Enabled. Requires firmware 2.0. Reboot required.
- id: set_sddp
  label: Enable/Disable SDDP Broadcasting
  kind: action
  command: "!SetSDDP={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: 0=Disabled, 1=Enabled. Requires firmware 2.0.
- id: exit
  label: Close Session
  kind: action
  command: "!Exit\n"
  params: []
```

## Feedbacks
```yaml
- id: ok
  type: string
  description: "Success acknowledgement. Literal: OK"
- id: error
  type: string
  description: "Literal: #Error - invalid command or internal device error"
- id: outlet_status_response
  type: array
  description: "Comma-separated outlet states, 0=off/1=on. Index = outlet number."
- id: outlet_power_status_response
  type: object
  description: "1.01 watts, 0.02 amps, 116.50 volts. WB150/250 unsupported."
- id: power_status_response
  type: object
  description: "amps, watts, volts, safe_voltage_status (0/1). WB150/250 unsupported."
- id: ups_status_response
  type: object
  description: "battery_charge%, battery_load%, battery_health, power_lost, battery_runtime_min, alarm_enabled, alarm_muted"
- id: ups_connection_response
  type: enum
  values: [0, 1]
  description: "0=Disconnected, 1=Connected"
- id: auto_reboot_response
  type: enum
  values: [0, 1]
  description: "0=Disabled, 1=Enabled"
- id: outlet_count_response
  type: integer
- id: outlet_name_response
  type: array
  description: "Bracketed comma-delimited outlet names. Source example shows 12 outlets."
- id: firmware_response
  type: string
- id: hostname_response
  type: string
- id: service_tag_response
  type: string
- id: model_response
  type: string
```

## Variables
```yaml
# No settable scalar parameters exist outside Actions. Remove section if not applicable.
```

## Events
```yaml
- id: unsolicited
  type: string
  description: "Messages prefixed with ~ (unsolicited). Source does not document specific event payloads."
```

## Macros
```yaml
# UNRESOLVED: source does not document multi-step sequences
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: source contains no safety warnings, interlock procedures, or power-on sequencing requirements
```

## Notes
- Protocol: Telnet port 23 or SSH port 22. SSH requires firmware 1.3.0.4+ and a 13-character password limit.
- Message format: ASCII, `\n` (0x0A) terminator. Prefixes: `?` request, `!` control, `#` error, `~` unsolicited.
- Max 10 simultaneous connections.
- Web server and SDDP commands require firmware 2.0.
- Network/Reboot/AccountSet/SetTelnet/SetWebServer changes disconnect the client; reconnect required.
- WB150/250 lack per-outlet power and system power status queries.
- Default credentials in source example: `wattbox`/`wattbox`.
<!-- UNRESOLVED: full set of supported WB Series models and per-model outlet counts not stated. -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:26:15.169Z
last_checked_at: 2026-06-02T07:06:56.278Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:56.278Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literally in source; transport parameters verified; no fabrications or shape mismatches. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WB150/250 omit OutletPowerStatus and PowerStatus (per source notes). Per-outlet outlet count not stated; example response shows 12 outlets but real count is model-dependent."
- "source does not state a baud_rate for serial"
- "source does not document multi-step sequences"
- "source contains no safety warnings, interlock procedures, or power-on sequencing requirements"
- "full set of supported WB Series models and per-model outlet counts not stated."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
