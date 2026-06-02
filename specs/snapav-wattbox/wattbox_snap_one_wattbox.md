---
spec_id: admin/wattbox-wb-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "SnapAV WattBox (WB Series) Control Spec"
manufacturer: "SnapAV / WattBox"
model_family: WB-800-IPVM-6
aliases: []
compatible_with:
  manufacturers:
    - "SnapAV / WattBox"
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
retrieved_at: 2026-04-30T04:26:11.547Z
last_checked_at: 2026-06-02T07:06:55.503Z
generated_at: 2026-06-02T07:06:55.503Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "command protocol is identical for all WB models except ?OutletPowerStatus and ?PowerStatus are explicitly NOT supported on WB150/250. Outlet count varies by model (response example shows 12 or 16 outlets). Firmware version not stated in source."
  - "baud rate not applicable / not stated; this is a TCP device. Kept here only as a placeholder. Remove if not needed."
  - "default username not stated; 13-character password limit applies only to SSH"
  - "source mentions ~ prefix for unsolicited messages but no examples provided in the integration protocol doc."
  - "source does not describe device-side macro sequences."
  - "no explicit safety warnings in source. Listed confirmation_required based on commands that drop the connection or change persistent state."
verification:
  verdict: verified
  checked_at: 2026-06-02T07:06:55.503Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions matched verbatim to source protocol table; transport parameters (port 23, TCP, password auth) confirmed; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# SnapAV WattBox (WB Series) Control Spec

## Summary
Networked power distribution unit (PDU) controllable over TCP. Protocol uses ASCII text commands terminated with `\n`, with login authentication required. Source describes both Telnet (port 23) and SSH (port 22) transports; this spec captures the command protocol shared between them.

<!-- UNRESOLVED: command protocol is identical for all WB models except ?OutletPowerStatus and ?PowerStatus are explicitly NOT supported on WB150/250. Outlet count varies by model (response example shows 12 or 16 outlets). Firmware version not stated in source. -->

## Transport
```yaml
protocols:
  - tcp
addressing:
  port: 23  # primary Telnet port; SSH also available on port 22
serial:
  baud_rate: 9600  # UNRESOLVED: baud rate not applicable / not stated; this is a TCP device. Kept here only as a placeholder. Remove if not needed.
  data_bits: 8
  parity: none
  stop_bits: 1
  flow_control: none
auth:
  type: password  # source requires username + password login
  username_required: true
  password_required: true
  # UNRESOLVED: default username not stated; 13-character password limit applies only to SSH
```

## Traits
```yaml
- powerable  # inferred from outlet on/off/reset commands
- queryable  # inferred from extensive ?-prefixed query commands
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
      description: Outlet number (1-based)
  notes: "Not supported on WB150/250. Response: ?OutletPowerStatus=1,1.01,0.02,116.50 (index, watts, amps, volts)"

- id: power_status_query
  label: System Power Status Query
  kind: query
  command: "?PowerStatus\n"
  params: []
  notes: "Not supported on WB150/250. Response: ?PowerStatus=60.00,600.00,110.00,1 (amps, watts, volts, safe_voltage)"

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
  notes: "Only meaningful when UPS attached. Response: charge%,load%,health,power_lost,runtime_min,alarm_enabled,alarm_muted"

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
      description: Outlet number (1-based)
    - name: name
      type: string
      description: New outlet name

- id: outlet_name_set_all
  label: Set All Outlet Names
  kind: action
  command: "!OutletNameSetAll={name1},{name2},...\n"
  params:
    - name: names
      type: string
      description: Bracketed, comma-delimited list of names in outlet order

- id: outlet_set
  label: Set Outlet State
  kind: action
  command: "!OutletSet={outlet},{action},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based); 0 + RESET resets ALL outlets
    - name: action
      type: enum
      values: [ON, OFF, TOGGLE, RESET]
    - name: delay
      type: integer
      description: Optional reset delay in seconds (1-600); only used with RESET

- id: outlet_power_on_delay_set
  label: Set Outlet Power-On Delay
  kind: action
  command: "!OutletPowerOnDelaySet={outlet},{delay}\n"
  params:
    - name: outlet
      type: integer
      description: Outlet number (1-based)
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
      description: Outlet number (1-based)
    - name: mode
      type: enum
      values: [0, 1, 2]
      description: "0=Enabled, 1=Disabled, 2=Reset Only"

- id: outlet_reboot_set
  label: Set Outlet Reboot Operation
  kind: action
  command: "!OutletRebootSet={op1},{op2},...\n"
  params:
    - name: ops
      type: string
      description: Comma-delimited list of 12+ reboot ops (0=OR/any, 1=AND/all)

- id: auto_reboot_set
  label: Set Auto Reboot State
  kind: action
  command: "!AutoReboot={state}\n"
  params:
    - name: state
      type: enum
      values: [0, 1]
      description: "0=Disabled, 1=Enabled"

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
      description: Consecutive timeouts before reboot (1-10)
    - name: ping_delay
      type: integer
      description: Retest delay in minutes (1-30)
    - name: reboot_attempts
      type: integer
      description: "Number of reboot attempts (0=unlimited, 1-10)"

- id: firmware_update
  label: Firmware Update
  kind: action
  command: "!FirmwareUpdate={url}\n"
  params:
    - name: url
      type: string
      description: Full path to upgrade file
  notes: "Device returns OK then drops connection until reboot complete."

- id: reboot
  label: Reboot Device
  kind: action
  command: "!Reboot\n"
  params: []
  notes: "Drops connection until device returns online."

- id: account_set
  label: Change Login Credentials
  kind: action
  command: "!AccountSet={user},{pass}\n"
  params:
    - name: user
      type: string
      description: Username
    - name: pass
      type: string
      description: Password (13-char limit for SSH credentials)
  notes: "Drops connection on success; requires reconnect to log in again."

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
      description: Static IP (omit for DHCP)
    - name: subnet
      type: string
      description: Subnet (omit for DHCP)
    - name: gateway
      type: string
      description: Gateway (omit for DHCP)
    - name: dns1
      type: string
      description: Primary DNS (omit for DHCP)
    - name: dns2
      type: string
      description: Secondary DNS (optional; defaults to 8.8.8.8)
  notes: "Device reboots on apply; may return at different IP."

- id: schedule_add
  label: Add Schedule
  kind: action
  command: "!ScheduleAdd={name},{outlets},{action},{freq},{days_or_date},{time}\n"
  params:
    - name: name
      type: string
      description: Schedule name
    - name: outlets
      type: string
      description: Bracketed array of outlet numbers, e.g. {1,2,3}
    - name: action
      type: enum
      values: [0, 1, 2]
      description: "0=Off, 1=On, 2=Reset"
    - name: freq
      type: enum
      values: [0, 1]
      description: "0=Once, 1=Recurring"
    - name: days_or_date
      type: string
      description: "For recurring: {0,1,0,1,0,1,0} (s,m,t,w,t,f,s). For once: {yyyy/mm/dd}"
    - name: time
      type: string
      description: "24-hour time hh:mm, e.g. 13:30"

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
      description: IP or website URL to test
    - name: outlets
      type: string
      description: Bracketed array of outlet numbers tied to this host

- id: set_telnet
  label: Enable/Disable Telnet
  kind: action
  command: "!SetTelnet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Disabled, 1=Enabled"
  notes: "Reboot required for change to take effect."

- id: web_server_set
  label: Enable/Disable Web Server
  kind: action
  command: "!WebServerSet={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Disabled, 1=Enabled"
  notes: "Reboot required. Requires firmware 2.0+."

- id: set_sddp
  label: Enable/Disable SDDP Broadcast
  kind: action
  command: "!SetSDDP={mode}\n"
  params:
    - name: mode
      type: enum
      values: [0, 1]
      description: "0=Disabled, 1=Enabled"
  notes: "Requires firmware 2.0+."

- id: exit_session
  label: Exit Session
  kind: action
  command: "!Exit\n"
  params: []
  notes: "Closes session gracefully."
```

## Feedbacks
```yaml
- id: firmware_version
  type: string
  description: Response to ?Firmware, e.g. "1.0.0.0"

- id: hostname
  type: string
  description: Response to ?Hostname, e.g. "Wattbox"

- id: service_tag
  type: string
  description: Response to ?ServiceTag, e.g. "ST191500681E8422"

- id: model_number
  type: string
  description: Response to ?Model, e.g. "WB-800-IPVM-6"

- id: outlet_count
  type: integer
  description: Response to ?OutletCount (e.g. 12, 16 depending on model)

- id: outlet_status
  type: string
  description: Response to ?OutletStatus, comma-delimited 0/1 per outlet (0=off, 1=on)

- id: outlet_power_status
  type: string
  description: Response to ?OutletPowerStatus=index,watts,amps,volts. Not supported on WB150/250.

- id: system_power_status
  type: string
  description: Response to ?PowerStatus=amps,watts,volts,safe_voltage_flag. Not supported on WB150/250.

- id: auto_reboot_state
  type: enum
  values: [0, 1]
  description: "0=Disabled, 1=Enabled"

- id: outlet_names
  type: string
  description: Comma-delimited outlet names wrapped in {} per outlet

- id: ups_status
  type: string
  description: Response to ?UPSStatus=charge_pct,load_pct,health,power_lost,runtime_min,alarm_enabled,alarm_muted

- id: ups_connection
  type: enum
  values: [0, 1]
  description: "0=Disconnected, 1=Connected"

- id: command_ack
  type: string
  description: Generic "OK" acknowledgement for control commands

- id: error
  type: string
  description: "#Error message sent for invalid commands or internal errors"
```

## Variables
```yaml
# Per-outlet settings; modeled as actions already. Listed here for completeness as observable/settable state.
- id: outlet_mode
  type: enum
  values: [0, 1, 2]
  description: "Per-outlet operating mode (0=Enabled, 1=Disabled, 2=Reset Only)"

- id: outlet_power_on_delay
  type: integer
  description: "Per-outlet power-on delay in seconds (1-600)"
```

## Events
```yaml
# UNRESOLVED: source mentions ~ prefix for unsolicited messages but no examples provided in the integration protocol doc.
```

## Macros
```yaml
# UNRESOLVED: source does not describe device-side macro sequences.
```

## Safety
```yaml
confirmation_required_for:
  - firmware_update
  - reboot
  - network_set
  - account_set
  - outlet_set  # when action=RESET
interlocks: []
# UNRESOLVED: no explicit safety warnings in source. Listed confirmation_required based on commands that drop the connection or change persistent state.
```

## Notes
- Message framing: ASCII text, `\n` (0x0A) terminates every command. Prefix `?` = request, `!` = control, `#` = error, `~` = unsolicited.
- Telnet: port 23. SSH: port 22 (requires firmware 1.3.0.4+; 13-char password limit for SSH).
- Max 10 simultaneous connections.
- Login required before any other command; failures prompt re-login.
- WB150/250 do NOT support `?OutletPowerStatus` or `?PowerStatus`.
- `!OutletSet=0,RESET` resets all outlets. RESET honors configured power-on delay unless overridden by optional delay param (1-600 s).
- `!Reboot`, `!FirmwareUpdate`, `!NetworkSet`, `!AccountSet` drop the connection on success.
- Model-specific outlet count varies (examples show 12 and 16); query with `?OutletCount`.
```

## Provenance

```yaml
source_domains:
  - snapav.com
source_urls:
  - https://www.snapav.com/wcsstore/ExtendedSitesCatalogAssetStore/attachments/documents/PowerManagement/ProtocolsAndDrivers/SnapAV_Wattbox_API_V2.4.pdf
retrieved_at: 2026-04-30T04:26:11.547Z
last_checked_at: 2026-06-02T07:06:55.503Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T07:06:55.503Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions matched verbatim to source protocol table; transport parameters (port 23, TCP, password auth) confirmed; complete bidirectional coverage. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "command protocol is identical for all WB models except ?OutletPowerStatus and ?PowerStatus are explicitly NOT supported on WB150/250. Outlet count varies by model (response example shows 12 or 16 outlets). Firmware version not stated in source."
- "baud rate not applicable / not stated; this is a TCP device. Kept here only as a placeholder. Remove if not needed."
- "default username not stated; 13-character password limit applies only to SSH"
- "source mentions ~ prefix for unsolicited messages but no examples provided in the integration protocol doc."
- "source does not describe device-side macro sequences."
- "no explicit safety warnings in source. Listed confirmation_required based on commands that drop the connection or change persistent state."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
