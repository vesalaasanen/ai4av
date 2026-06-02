---
spec_id: admin/wattbox-wattbox-ip-power-controller
schema_version: ai4av-public-spec-v1
revision: 1
title: "WattBox IP Power Controller Control Spec"
manufacturer: WattBox
model_family: "WattBox IP Power Controller"
aliases: []
compatible_with:
  manufacturers:
    - WattBox
  models:
    - "WattBox IP Power Controller"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:26:13.371Z
last_checked_at: 2026-06-02T07:06:54.676Z
generated_at: 2026-06-02T07:06:54.676Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device-specific physical specs (voltage/current ratings, outlet count per SKU) are not stated. Source documents a generic protocol applicable to multiple WattBox models (e.g. WB-800-IPVM-6 in examples; WB150/WB250 explicitly excluded from outlet-power and system-power queries)."
  - "source documents settable values inline (e.g. outlet power-on delay, auto-reboot timeout, outlet mode) rather than as separately queryable variables. Each is set via its own dedicated command in Actions."
  - "source documents the prefix only; no concrete unsolicited message bodies are described.\""
  - "source does not describe multi-step macro sequences. Power-on sequencing is handled per-outlet via OutletPowerOnDelaySet."
  - "no high-voltage safety interlocks or lockout procedures documented in source."
  - "per-SKU physical specifications (outlet count, voltage/current ratings) not stated in source; compatible_with.models left generic."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:54.676Z
  matched_actions: 31
  action_count: 31
  confidence: medium
  summary: "All 31 spec actions matched verbatim in source with correct wire-level tokens, parameter shapes, and transport values. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# WattBox IP Power Controller Control Spec

## Summary
This spec covers the WattBox Integration Protocol (v2.4, rev 20210527) for IP-controllable WattBox power distribution units. Control is provided over TCP port 23 (Telnet) or TCP port 22 (SSH, firmware >= 1.3.0.4) using ASCII line-delimited commands, with username/password authentication. The protocol supports per-outlet on/off/reset, scheduling, host-monitored auto-reboot, UPS telemetry, network configuration, and firmware update.

<!-- UNRESOLVED: device-specific physical specs (voltage/current ratings, outlet count per SKU) are not stated. Source documents a generic protocol applicable to multiple WattBox models (e.g. WB-800-IPVM-6 in examples; WB150/WB250 explicitly excluded from outlet-power and system-power queries). -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23
auth:
  type: password
# Notes from source:
# - Port 23 = Telnet, Port 22 = SSH (firmware >= 1.3.0.4)
# - SSH requires a pre-set WattBox password (13-character limit)
# - Maximum 10 simultaneous connections
# - Default credentials in example: username "wattbox", password "wattbox"
```

## Traits
```yaml
- powerable       # inferred: outlet on/off/reset/toggle commands present
- queryable       # inferred: many ? query commands returning state
- routable        # inferred: outlet-to-host and outlet-to-schedule binding commands present
```

## Actions
```yaml
# All commands from the WattBox Integration Protocol v2.4 rev20210527.
# Messages are ASCII text terminated with newline (\n, 0x0A).
# Prefix: ? = request/query, ! = control, # = error, ~ = unsolicited.

- id: query_firmware
  label: Query Firmware Version
  kind: query
  command: "?Firmware\n"
  params: []
  notes: "Response: ?Firmware=1.0.0.0"

- id: query_hostname
  label: Query Hostname
  kind: query
  command: "?Hostname\n"
  params: []
  notes: "Response: ?Hostname=Wattbox"

- id: query_service_tag
  label: Query Service Tag
  kind: query
  command: "?ServiceTag\n"
  params: []
  notes: "Response: ?ServiceTag=ST191500681E8422"

- id: query_model
  label: Query Model Number
  kind: query
  command: "?Model\n"
  params: []
  notes: "Response: ?Model=WB-800-IPVM-6"

- id: query_outlet_count
  label: Query Outlet Count
  kind: query
  command: "?OutletCount\n"
  params: []
  notes: "Response: ?OutletCount=16"

- id: query_outlet_status
  label: Query Outlet States (all)
  kind: query
  command: "?OutletStatus\n"
  params: []
  notes: "Response: ?OutletStatus=0,0,0,0,0,0,0,0,0,0,0,0 - comma-separated, 0=off 1=on, index = outlet number"

- id: query_outlet_power_status
  label: Query Outlet Power Status (single outlet)
  kind: query
  command: "?OutletPowerStatus={outlet}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
  notes: "Not supported on WB150/250. Response: ?OutletPowerStatus=1,1.01,0.02,116.50 - outlet_index,watts,amps,volts"

- id: query_power_status
  label: Query System Power Status
  kind: query
  command: "?PowerStatus\n"
  params: []
  notes: "Not supported on WB150/250. Response: ?PowerStatus=60.00,600.00,110.00,1 - amps,watts,volts,safe_voltage_status"

- id: query_auto_reboot
  label: Query Auto Reboot Status
  kind: query
  command: "?AutoReboot\n"
  params: []
  notes: "Response: ?AutoReboot=1 - 1=enabled 0=disabled"

- id: query_outlet_names
  label: Query Outlet Names (all)
  kind: query
  command: "?OutletName\n"
  params: []
  notes: "Response: ?OutletName={Outlet 1},{Outlet 2},... - braces around every NAME, comma-delimited"

- id: query_ups_status
  label: Query UPS Status
  kind: query
  command: "?UPSStatus\n"
  params: []
  notes: "Response: ?UPSStatus=50,0,Good,False,25,True,False - charge%,load%,health,power_lost,runtime_min,alarm_enabled,alarm_muted"

- id: query_ups_connection
  label: Query UPS Connection
  kind: query
  command: "?UPSConnection\n"
  params: []
  notes: "Response: ?UPSConnection=0 - 0=disconnected 1=connected"

- id: set_outlet_name
  label: Set Outlet Name
  kind: action
  command: "!OutletNameSet={outlet},{name}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: name
      type: string
      description: New name for the outlet
  notes: "Response: OK"

- id: set_all_outlet_names
  label: Set All Outlet Names
  kind: action
  command: "!OutletNameSetAll={{{name1}}},{{{name2}}},{{{name3}}},{{{name4}}},{{{name5}}},{{{name6}}},{{{name7}}},{{{name8}}},{{{name9}}},{{{name10}}},{{{name11}}},{{{name12}}}\n"
  params:
    - name: names
      type: string-array
      description: "12 names, one per outlet, in order. Each wrapped in braces, comma-delimited."
  notes: "Response: OK. Braces required around every NAME."

- id: set_outlet
  label: Set Outlet State
  kind: action
  command: "!OutletSet={outlet},{action},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (0 = all outlets, only valid with RESET)
    - name: action
      type: enum
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: "Optional delay in seconds for RESET, 1-600. Omit or set 0 to use outlet's power-on delay."
  notes: "Response: OK. RESET obeys per-outlet power-on delay unless overridden."

- id: set_outlet_power_on_delay
  label: Set Outlet Power-On Delay
  kind: action
  command: "!OutletPowerOnDelaySet={outlet},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: delay
      type: integer
      description: Delay in seconds, 1-600
  notes: "Response: OK"

- id: set_outlet_mode
  label: Set Outlet Operating Mode
  kind: action
  command: "!OutletModeSet={outlet},{mode}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=Enabled, 1=Disabled, 2=Reset Only. Out-of-range rejected."
  notes: "Response: OK"

- id: set_outlet_reboot_op
  label: Set Outlet Reboot Operation
  kind: action
  command: "!OutletRebootSet={op1},{op2},{op3},{op4},{op5},{op6},{op7},{op8},{op9},{op10},{op11},{op12}\n"
  params:
    - name: ops
      type: integer-array
      description: "12 values, one per outlet. 0=OR (any selected host times out), 1=AND (all selected hosts time out). Out-of-range rejected."
  notes: "Response: OK"

- id: set_auto_reboot
  label: Set Auto Reboot State
  kind: action
  command: "!AutoReboot={state}\n"
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "1=enabled, 0=disabled"
  notes: "Response: OK"

- id: set_auto_reboot_timeout
  label: Set Auto Reboot Timeout Settings
  kind: action
  command: "!AutoRebootTimeoutSet={timeout},{count},{ping_delay},{reboot_attempts}\n"
  params:
    - name: timeout
      type: integer
      description: Seconds before timing out a host, 1-60
    - name: count
      type: integer
      description: Consecutive timeouts before triggering auto-reboot, 1-10
    - name: ping_delay
      type: integer
      description: Minutes to wait before re-testing connection after auto-reboot, 1-30
    - name: reboot_attempts
      type: integer
      description: "Number of auto-reboot attempts, 0-10 (0 = unlimited)"
  notes: "Response: OK"

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "!FirmwareUpdate={url}\n"
  params:
    - name: url
      type: string
      description: Full path/URL to the upgrade file
  notes: "Response: OK (sent just before shutdown). Client loses connection until device returns online."

- id: reboot_device
  label: Reboot Device
  kind: action
  command: "!Reboot\n"
  params: []
  notes: "Response: OK. Client loses connection until device returns online."

- id: set_account
  label: Change Login Credentials
  kind: action
  command: "!AccountSet={user},{pass}\n"
  params:
    - name: user
      type: string
      description: Username
    - name: pass
      type: string
      description: "Password. SSH user passwords have a 13-character limit."
  notes: "Response: OK. On success, client loses connection and must reconnect to log in again. Invalid usernames/passwords are rejected."

- id: set_network
  label: Set Network Configuration
  kind: action
  command: "!NetworkSet={host},{ip},{subnet},{gateway},{dns1},{dns2}\n"
  params:
    - name: host
      type: string
      description: Hostname
    - name: ip
      type: string
      description: "Static IP address. Omit IP/SUBNET/GATEWAY/DNS1/DNS2 for DHCP."
    - name: subnet
      type: string
      description: "Subnet mask. Required for STATIC."
    - name: gateway
      type: string
      description: "Gateway address. Required for STATIC."
    - name: dns1
      type: string
      description: "Primary DNS server. Required for STATIC."
    - name: dns2
      type: string
      description: "Secondary DNS server. Optional for STATIC; defaults to 8.8.8.8 if omitted."
  notes: "Response: OK. Device reboots after applying valid settings; client loses connection. Device may come back at a different IP."

- id: schedule_add
  label: Add Schedule
  kind: action
  command: "!ScheduleAdd={{{name}}},{{{outlet1},{outlet2},{outlet3}}},{{{action}}},{{{freq}}},{{{days_or_date}}},{{{time}}}\n"
  params:
    - name: name
      type: string
      description: Schedule name
    - name: outlets
      type: integer-array
      description: "Array of outlet numbers, e.g. {1,2,3}"
    - name: action
      type: enum
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Reset"
    - name: frequency
      type: enum
      values: [0, 1]
      description: "0=Once, 1=Recurring"
    - name: days
      type: integer-array
      description: "For Recurring: 7-element array [s,m,t,w,t,f,s], 0=skip 1=include"
    - name: date
      type: string
      description: "For Once: yyyy/mm/dd, e.g. 2018/09/28"
    - name: time
      type: string
      description: "Time in 24h hh:mm, e.g. 13:30"
  notes: "Response: OK. Braces required around every value, comma-delimited. Values out of range rejected."

- id: host_add
  label: Add Monitored Host
  kind: action
  command: "!HostAdd={name},{ip},{{{outlet1},{outlet2}}}\n"
  params:
    - name: name
      type: string
      description: Host name
    - name: ip
      type: string
      description: "Website URL or IP address to test"
    - name: outlets
      type: integer-array
      description: "Outlets to tie to this host, wrapped in braces"
  notes: "Braces required around the outlets array."

- id: set_telnet
  label: Enable/Disable Telnet
  kind: action
  command: "!SetTelnet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=disabled, 1=enabled"
  notes: "Reboot required for changes to take effect."

- id: set_web_server
  label: Enable/Disable Web Server
  kind: action
  command: "!WebServerSet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=disabled, 1=enabled"
  notes: "Reboot required. Requires WattBox firmware 2.0+."

- id: set_sddp
  label: Enable/Disable SDDP Broadcasting
  kind: action
  command: "!SetSDDP={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=disabled, 1=enabled"
  notes: "Requires WattBox firmware 2.0+."

- id: exit_session
  label: Close Session
  kind: action
  command: "!Exit\n"
  params: []
  notes: "Closes the session gracefully."

- id: error_message
  label: Error (unsolicited, from device)
  kind: event
  command: "#Error\n"
  params: []
  notes: "Sent when an invalid command is received or an internal device error occurs. See device log page for details."
```

## Feedbacks
```yaml
- id: firmware_version
  type: string
  notes: "Returned by ?Firmware. Example: 1.0.0.0"
- id: hostname
  type: string
  notes: "Returned by ?Hostname. Example: Wattbox"
- id: service_tag
  type: string
  notes: "Returned by ?ServiceTag. Example: ST191500681E8422"
- id: model_number
  type: string
  notes: "Returned by ?Model. Example: WB-800-IPVM-6"
- id: outlet_count
  type: integer
  notes: "Returned by ?OutletCount. Example: 16"
- id: outlet_states
  type: integer-array
  values: [0, 1]
  notes: "Returned by ?OutletStatus. Comma-separated, 0=off 1=on, index = outlet number."
- id: outlet_power
  type: string
  notes: "Returned by ?OutletPowerStatus. Format: outlet_index,watts,amps,volts. Not supported on WB150/250."
- id: system_power
  type: string
  notes: "Returned by ?PowerStatus. Format: amps,watts,volts,safe_voltage_status. Not supported on WB150/250."
- id: auto_reboot_enabled
  type: enum
  values: [0, 1]
  notes: "Returned by ?AutoReboot. 0=disabled 1=enabled."
- id: outlet_names
  type: string-array
  notes: "Returned by ?OutletName. Brace-wrapped, comma-delimited."
- id: ups_status
  type: string
  notes: "Returned by ?UPSStatus. Format: charge%,load%,health(Good/Bad),power_lost(True/False),runtime_min,alarm_enabled(True/False),alarm_muted(True/False)."
- id: ups_connection
  type: enum
  values: [0, 1]
  notes: "Returned by ?UPSConnection. 0=disconnected 1=connected."
```

## Variables
```yaml
# UNRESOLVED: source documents settable values inline (e.g. outlet power-on delay, auto-reboot timeout, outlet mode) rather than as separately queryable variables. Each is set via its own dedicated command in Actions.
```

## Events
```yaml
- id: error_event
  description: "#Error\n - sent on invalid command or internal device error."
- id: unsolicited_message
  description: "Messages prefixed with ~ are unsolicited. UNRESOLVED: source documents the prefix only; no concrete unsolicited message bodies are described."
```

## Macros
```yaml
# UNRESOLVED: source does not describe multi-step macro sequences. Power-on sequencing is handled per-outlet via OutletPowerOnDelaySet.
```

## Safety
```yaml
confirmation_required_for:
  - firmware_update        # source: response sent right before device shuts down
  - reboot_device          # source: device reboots, client loses connection
  - set_network            # source: device reboots; may come back at a different IP
  - set_account            # source: connection invalidated; reconnect required
interlocks: []
# UNRESOLVED: no high-voltage safety interlocks or lockout procedures documented in source.
```

## Notes
- Protocol version: Integration Protocol v2.4, rev 20210527 (from source document header).
- Connection: TCP/23 (Telnet) or TCP/22 (SSH, firmware >= 1.3.0.4). Source explicitly states both ports.
- Max 10 simultaneous connections.
- Messages are ASCII text terminated by `\n` (0x0A).
- Command prefix semantics: `?` request, `!` control, `#` error, `~` unsolicited.
- SSH passwords are limited to 13 characters.
- WebServer and SDDP commands require WattBox firmware 2.0+.
- `?OutletPowerStatus` and `?PowerStatus` are explicitly not supported on WB150/WB250.
- `!OutletSet` with `OUTLET=0,ACTION=RESET` resets all outlets.
- `!AutoRebootTimeoutSet` field order in source is `TIMEOUT,TIMEOUT,PING_DELAY,REBOOT_ATTEMPTS` — second slot labeled `TIMEOUT` in the source but described as `COUNT` (1-10). Preserved as source writes it; if a client misbehaves, swap the second field per the descriptive text.
- Default credentials in source example: `wattbox` / `wattbox`.

<!-- UNRESOLVED: per-SKU physical specifications (outlet count, voltage/current ratings) not stated in source; compatible_with.models left generic. -->

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:26:13.371Z
last_checked_at: 2026-06-02T07:06:54.676Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:54.676Z
matched_actions: 31
action_count: 31
confidence: medium
summary: "All 31 spec actions matched verbatim in source with correct wire-level tokens, parameter shapes, and transport values. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device-specific physical specs (voltage/current ratings, outlet count per SKU) are not stated. Source documents a generic protocol applicable to multiple WattBox models (e.g. WB-800-IPVM-6 in examples; WB150/WB250 explicitly excluded from outlet-power and system-power queries)."
- "source documents settable values inline (e.g. outlet power-on delay, auto-reboot timeout, outlet mode) rather than as separately queryable variables. Each is set via its own dedicated command in Actions."
- "source documents the prefix only; no concrete unsolicited message bodies are described.\""
- "source does not describe multi-step macro sequences. Power-on sequencing is handled per-outlet via OutletPowerOnDelaySet."
- "no high-voltage safety interlocks or lockout procedures documented in source."
- "per-SKU physical specifications (outlet count, voltage/current ratings) not stated in source; compatible_with.models left generic."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
