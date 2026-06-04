---
spec_id: admin/snap-one-wattbox-ip
schema_version: ai4av-public-spec-v1
revision: 1
title: "Snap One WattBox Control Spec"
manufacturer: "Snap One"
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - "Snap One"
  models:
    - WB-800-IPVM-6
    - WB150
    - WB250
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-06-01T22:53:36.059Z
last_checked_at: 2026-06-04T06:30:21.013Z
generated_at: 2026-06-04T06:30:21.013Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WB150/WB250 are referenced in source but commands `?OutletPowerStatus` and `?PowerStatus` are explicitly unsupported on those models. Models list should be expanded with operator confirmation."
  - "section removed - all settable parameters are exposed as discrete actions."
  - "unsolicited message catalogue not provided in source."
  - "no multi-step sequences described in source beyond the !ScheduleAdd"
  - "no explicit safety warnings, interlocks, or power-on sequencing"
  - "source URL/protocol revision (v2.4 rev20210527) noted in source header but not all firmware-conditional behaviors are fully cross-referenced. Field-level gaps marked inline above."
verification:
  verdict: verified
  checked_at: 2026-06-04T06:30:21.013Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched literal wire-level tokens in the source protocol reference; transport parameters verified; complete one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Snap One WattBox Control Spec

## Summary
Spec for SnapAV WattBox IP-controlled PDU. Plain-ASCII integration protocol over TCP port 23 (Telnet) and SSH port 22. Exposes outlet control, power metering, UPS telemetry, auto-reboot, scheduling, and network/account configuration via `?`-prefixed query and `!`-prefixed control commands terminated by `\n` (0x0A).

<!-- UNRESOLVED: WB150/WB250 are referenced in source but commands `?OutletPowerStatus` and `?PowerStatus` are explicitly unsupported on those models. Models list should be expanded with operator confirmation. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # Telnet; SSH additionally on port 22
auth:
  type: password  # source: "The protocol requires authentication before proceeding with commands. Once connected, a login prompt will be received and the third-party system must provide a valid username and password."
```

## Traits
```yaml
- powerable       # inferred: !OutletSet, !Reboot, !AutoReboot
- routable        # inferred: outlet indexing implies per-outlet addressing
- queryable       # inferred: ?-prefixed query commands return state
```

## Actions
```yaml
# === Queries (kind: query) ===
- id: query_firmware
  label: Request Firmware Version
  kind: query
  command: "?Firmware\n"
  params: []

- id: query_hostname
  label: Request Hostname
  kind: query
  command: "?Hostname\n"
  params: []

- id: query_service_tag
  label: Request Service Tag
  kind: query
  command: "?ServiceTag\n"
  params: []

- id: query_model
  label: Request Model Number
  kind: query
  command: "?Model\n"
  params: []

- id: query_outlet_count
  label: Request Outlet Count
  kind: query
  command: "?OutletCount\n"
  params: []

- id: query_outlet_status
  label: Request All Outlet States
  kind: query
  command: "?OutletStatus\n"
  params: []

- id: query_outlet_power_status
  label: Request Outlet Power Status (specific outlet)
  kind: query
  command: "?OutletPowerStatus={outlet}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)

- id: query_power_status
  label: Request System Power Status
  kind: query
  command: "?PowerStatus\n"
  params: []

- id: query_auto_reboot
  label: Request Auto Reboot Status
  kind: query
  command: "?AutoReboot\n"
  params: []

- id: query_outlet_name
  label: Request Outlet Names
  kind: query
  command: "?OutletName\n"
  params: []

- id: query_ups_status
  label: Request UPS Status
  kind: query
  command: "?UPSStatus\n"
  params: []

- id: query_ups_connection
  label: Request UPS Connection State
  kind: query
  command: "?UPSConnection\n"
  params: []

# === Control (kind: action) ===
- id: outlet_name_set
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

- id: outlet_name_set_all
  label: Set All Outlet Names
  kind: action
  command: "!OutletNameSetAll={{name1},{name2},...,{nameN}}\n"
  params:
    - name: names
      type: string
      description: Brace-wrapped, comma-delimited list of all outlet names in order starting at Outlet 1

- id: outlet_set
  label: Set Outlet State
  kind: action
  command: "!OutletSet={outlet},{action},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (0 = all outlets, only valid with action=RESET)
    - name: action
      type: enum
      description: ON, OFF, TOGGLE, or RESET
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: Optional delay in seconds (1-600); only valid with action=RESET; overrides power-on delay

- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  command: "!OutletPowerOnDelaySet={outlet},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: delay
      type: integer
      description: Delay in seconds (1-600)

- id: outlet_mode_set
  label: Set Outlet Operating Mode
  kind: action
  command: "!OutletModeSet={outlet},{mode}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number
    - name: mode
      type: enum
      description: "0 = Enabled, 1 = Disabled, 2 = Reset Only"
      values: ["0", "1", "2"]

- id: outlet_reboot_set
  label: Set Outlet Reboot Operation
  kind: action
  command: "!OutletRebootSet={op1},{op2},{op3},{op4},{op5},{op6},{op7},{op8},{op9},{op10},{op11},{op12}\n"
  params:
    - name: ops
      type: string
      description: 12 comma-delimited OP values, one per outlet. 0 = OR (any selected host times out), 1 = AND (all selected hosts time out).

- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  command: "!AutoReboot={state}\n"
  params:
    - name: state
      type: enum
      description: 1 = enabled, 0 = disabled
      values: ["0", "1"]

- id: auto_reboot_timeout_set
  label: Set Auto Reboot Timeout
  kind: action
  command: "!AutoRebootTimeoutSet={timeout},{count},{ping_delay},{reboot_attempts}\n"
  params:
    - name: timeout
      type: integer
      description: Host timeout in seconds (1-60)
    - name: count
      type: integer
      description: Consecutive timeouts before triggering auto-reboot (1-10)
    - name: ping_delay
      type: integer
      description: Minutes to wait before retesting after auto-reboot (1-30)
    - name: reboot_attempts
      type: integer
      description: Number of auto-reboot attempts (0 = unlimited, 1-10)

- id: firmware_update
  label: Update Firmware
  kind: action
  command: "!FirmwareUpdate={url}\n"
  params:
    - name: url
      type: string
      description: Full path to the upgrade file

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
      description: Username
    - name: pass
      type: string
      description: Password (13-character limit when used with SSH)

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
      description: Static IP (omit ip/subnet/gateway/dns1/dns2 for DHCP)
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
      description: Secondary DNS server (optional; auto-filled to 8.8.8.8 if omitted)

- id: schedule_add
  label: Add Scheduled Event
  kind: action
  command: "!ScheduleAdd={{name}},{outlets},{action},{freq},{days_or_date},{time}}\n"
  params:
    - name: name
      type: string
      description: Schedule name
    - name: outlets
      type: string
      description: Brace-wrapped, comma-delimited array of outlet numbers (e.g. {1,2,3})
    - name: action
      type: enum
      description: "0 = Off, 1 = On, 2 = Reset"
      values: ["0", "1", "2"]
    - name: freq
      type: enum
      description: "0 = Once, 1 = Recurring"
      values: ["0", "1"]
    - name: days_or_date
      type: string
      description: If Recurring: 7-element brace-wrapped binary array for [s,m,t,w,t,f,s]. If Once: date in yyyy/mm/dd.
    - name: time
      type: string
      description: 24-hour time in hh:mm (e.g. 13:30)

- id: host_add
  label: Add Monitored Host
  kind: action
  command: "!HostAdd={name},{ip},{outlets}\n"
  params:
    - name: name
      type: string
      description: Host name
    - name: ip
      type: string
      description: Hostname, website, or IP address to be tested
    - name: outlets
      type: string
      description: Brace-wrapped, comma-delimited array of outlet numbers tied to this host

- id: set_telnet
  label: Enable/Disable Telnet
  kind: action
  command: "!SetTelnet={mode}\n"
  params:
    - name: mode
      type: enum
      description: 0 = disabled, 1 = enabled
      values: ["0", "1"]

- id: web_server_set
  label: Enable/Disable Web Server
  kind: action
  command: "!WebServerSet={mode}\n"
  params:
    - name: mode
      type: enum
      description: 0 = disabled, 1 = enabled (requires firmware 2.0)
      values: ["0", "1"]

- id: set_sddp
  label: Enable/Disable SDDP Broadcasting
  kind: action
  command: "!SetSDDP={mode}\n"
  params:
    - name: mode
      type: enum
      description: 0 = disabled, 1 = enabled (requires firmware 2.0)
      values: ["0", "1"]

- id: exit
  label: Close Session
  kind: action
  command: "!Exit\n"
  params: []
```

## Feedbacks
```yaml
- id: error
  type: enum
  values: ["#Error"]
  description: Sent whenever an invalid command was received or an internal device error has occurred. See device log page for detailed error messages.

- id: outlet_state
  type: enum
  values: ["0", "1"]
  description: Per-outlet on/off state (0=off, 1=on). Returned by ?OutletStatus as a comma-delimited array.

- id: power_status
  type: string
  description: Returned by ?PowerStatus as "amps,watts,volts,safe_voltage_status". Safe voltage status: 1 = safe.

- id: auto_reboot_state
  type: enum
  values: ["0", "1"]
  description: Returned by ?AutoReboot. 1 = enabled, 0 = disabled.

- id: ups_status
  type: string
  description: Returned by ?UPSStatus as "battery_charge,battery_load,battery_health,power_lost,battery_runtime_min,alarm_enabled,alarm_muted".

- id: ups_connection
  type: enum
  values: ["0", "1"]
  description: Returned by ?UPSConnection. 0 = disconnected, 1 = connected.
```

## Variables
```yaml
# No persistent settable variables outside the discrete action set above.
# UNRESOLVED: section removed - all settable parameters are exposed as discrete actions.
```

## Events
```yaml
# Source documents `~` as the prefix marker for unsolicited messages but does not
# enumerate any specific unsolicited messages. No events populated.
# UNRESOLVED: unsolicited message catalogue not provided in source.
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source beyond the !ScheduleAdd
# scheduling primitive.
```

## Safety
```yaml
confirmation_required_for:
  - reboot
  - firmware_update
  - account_set
  - network_set
  # inferred: source notes these commands cause the client to "loose the connection"
  # until the device is back online, which is operationally disruptive.
interlocks: []
# UNRESOLVED: no explicit safety warnings, interlocks, or power-on sequencing
# requirements stated in source beyond the device-disruption notes above.
```

## Notes
- Max 10 simultaneous connections (source: "Only 10 simultaneous connections can be made at a time").
- Message terminator is `\n` (ASCII 0x0A). Prefix conventions: `?` query, `!` control, `#` error, `~` unsolicited.
- SSH support requires firmware 1.3.0.4 or later; SSH passwords are limited to 13 characters.
- `!WebServerSet` and `!SetSDDP` require firmware 2.0 or later.
- `?OutletPowerStatus` and `?PowerStatus` are NOT supported on WB150/WB250 models.
- `!Reboot`, `!FirmwareUpdate`, `!AccountSet`, and `!NetworkSet` will drop the active connection; the client must reconnect afterward.
- Telnet can be disabled via `!SetTelnet=0`; a reboot is required for the change to take effect.
- `!NetworkSet` may change the device's IP address, depending on whether DHCP or static is configured.

<!-- UNRESOLVED: source URL/protocol revision (v2.4 rev20210527) noted in source header but not all firmware-conditional behaviors are fully cross-referenced. Field-level gaps marked inline above. -->
</yaml>

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-06-01T22:53:36.059Z
last_checked_at: 2026-06-04T06:30:21.013Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-04T06:30:21.013Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched literal wire-level tokens in the source protocol reference; transport parameters verified; complete one-to-one coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WB150/WB250 are referenced in source but commands `?OutletPowerStatus` and `?PowerStatus` are explicitly unsupported on those models. Models list should be expanded with operator confirmation."
- "section removed - all settable parameters are exposed as discrete actions."
- "unsolicited message catalogue not provided in source."
- "no multi-step sequences described in source beyond the !ScheduleAdd"
- "no explicit safety warnings, interlocks, or power-on sequencing"
- "source URL/protocol revision (v2.4 rev20210527) noted in source header but not all firmware-conditional behaviors are fully cross-referenced. Field-level gaps marked inline above."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
