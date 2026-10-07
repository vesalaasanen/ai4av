---
spec_id: admin/surgex-squid
schema_version: ai4av-public-spec-v1
revision: 1
title: "SurgeX Squid Control Spec"
manufacturer: SurgeX
model_family: SX-DC-8-1224
aliases: []
compatible_with:
  manufacturers:
    - SurgeX
  models:
    - SX-DC-8-1224
    - SX-SQUID
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/squid/api-definition-squid-rev-b.pdf
  - https://www.ametekesp.com/-/media/ametekesp/downloads/data-sheets/b03-00020-_rev-a_surgex_data-sheet_squid.pdf
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/squid_v10.mib
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/modules/surgex-squid-v10-demo-crestron.zip
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/modules/surgex-squid-v10-demo-control4.zip
retrieved_at: 2026-05-22T20:56:53.306Z
last_checked_at: 2026-10-07T20:47:11.496Z
generated_at: 2026-10-07T20:47:11.496Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version compatibility range not stated"
  - "exact number of outlets varies by hardware configuration"
  - "default HTTP port stated as 80 in docs but examples use 8080; port is user-configurable"
  - "no push/subscribe mechanism documented; events are polled via TimeStampedEvents endpoint"
  - "no explicit safety interlock sequencing documented beyond privilege checks"
  - "exact default HTTP port unclear — docs state default 80 but all examples use 8080"
  - "firmware version compatibility not stated"
verification:
  verdict: verified
  checked_at: 2026-10-07T20:47:11.496Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 action units (19 actions, 8 query feedbacks) match source endpoints; base path and auth are source-supported; the source's 27 endpoints are all represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-22
---

# SurgeX Squid Control Spec

## Summary
SurgeX Squid (SX-DC-8-1224 / SX-SQUID) is a power controller with individually controllable AC and DC outlets, outlet groups, power-on sequences, and event triggers. Control is via a RESTful HTTP/HTTPS API with JSON bodies. Basic Authentication or session tokens (`x-auth-token` header) required for all endpoints. API version is embedded in the URI path (`/api/v1/`).

<!-- UNRESOLVED: firmware version compatibility range not stated -->
<!-- UNRESOLVED: exact number of outlets varies by hardware configuration -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v1
  # UNRESOLVED: default HTTP port stated as 80 in docs but examples use 8080; port is user-configurable
auth:
  type: basic
  notes: HTTP Basic Auth or x-auth-token session header required for all endpoints
```

## Traits
```yaml
- powerable
- queryable
- levelable
```

## Actions
```yaml
- id: power_on_outlet
  label: Power On Outlet
  kind: action
  params:
    - name: device_id
      type: integer
      description: Squid device ID (always 1 for single-unit deployments)
    - name: outlet_id
      type: integer
      description: Outlet or group ID
  transport_hint: POST /api/v1/{device_id}/{outlet_id}/PowerOn

- id: power_off_outlet
  label: Power Off Outlet
  kind: action
  params:
    - name: device_id
      type: integer
      description: Squid device ID (always 1)
    - name: outlet_id
      type: integer
      description: Outlet or group ID
  transport_hint: POST /api/v1/{device_id}/{outlet_id}/PowerOff

- id: reboot_outlet
  label: Reboot Outlet
  kind: action
  params:
    - name: device_id
      type: integer
      description: Squid device ID (always 1)
    - name: outlet_id
      type: integer
      description: Outlet or group ID
  transport_hint: POST /api/v1/{device_id}/{outlet_id}/Reboot

- id: run_sequence
  label: Run Sequence
  kind: action
  params:
    - name: id
      type: integer
      description: Sequence ID to execute
  transport_hint: POST /api/v1/RunSequence body [id]

- id: enter_shutdown_state
  label: Enter Shutdown State
  kind: action
  params: []
  transport_hint: POST /api/v1/EnterShutdownState
  notes: Prevents any outlet from turning on until cleared. Requires Admin privileges.

- id: clear_shutdown_state
  label: Clear Shutdown State
  kind: action
  params: []
  transport_hint: POST /api/v1/ClearShutdownState
  notes: Returns device to running state. Requires Admin privileges.

- id: reset_energy_usage
  label: Reset Energy Usage
  kind: action
  params:
    - name: device_id
      type: integer
      description: Squid device ID (always 1)
  transport_hint: POST /api/v1/{device_id}/ResetEnergyUsage

- id: update_network_settings
  label: Update Network Settings
  kind: action
  params:
    - name: httpd
      type: object
      description: Web server configuration (enabled, ssl, port)
    - name: ethInterfaces
      type: array
      description: Ethernet interface settings (ifname, dns, addr, dhcp, mask, gw, bcast)
    - name: remoteShell
      type: object
      description: Remote shell settings (enabled, ssl, port)
  transport_hint: PUT /api/v1/networkSettings

- id: update_device_settings
  label: Update Device Settings
  kind: action
  params:
    - name: temperatureUnits
      type: string
      description: "F" or "C"
    - name: autoLogoutTime
      type: integer
      description: Auto logout time in minutes
    - name: startupProcedure
      type: object
      description: "type" (RunSequence or InitialState), "sequenceId", "delay"
    - name: shutdownClearProcedure
      type: object
      description: Same shape as startupProcedure
    - name: squid
      type: object
      description: Device name and dataLogInterval
  transport_hint: PUT /api/v1/deviceSettings

- id: add_sequence
  label: Add Sequence
  kind: action
  params:
    - name: name
      type: string
      description: User-friendly sequence name
    - name: steps
      type: array
      description: Array of {method: "/{device_id}/{outlet_id}/{Command}", delay: seconds}
  transport_hint: POST /api/v1/AddSequence

- id: change_sequence
  label: Change Sequence
  kind: action
  params:
    - name: id
      type: integer
      description: Sequence ID
    - name: name
      type: string
      description: Sequence name
    - name: steps
      type: array
      description: Updated steps array
  transport_hint: POST /api/v1/ChangeSequence

- id: remove_sequence
  label: Remove Sequence
  kind: action
  params:
    - name: id
      type: integer
      description: Sequence ID to remove
  transport_hint: POST /api/v1/RemoveSequence

- id: add_trigger
  label: Add Trigger
  kind: action
  params:
    - name: enabled
      type: boolean
    - name: name
      type: string
    - name: type
      type: string
      description: "ThresholdSamples, Schedule, Autoping, or GpioStateChange"
    - name: expressions
      type: object
      description: on/off criteria with {val, oper, prop}
    - name: actions
      type: array
      description: on/off action objects with {cmd, delay, parms}
  transport_hint: POST /api/v1/AddTrigger

- id: change_trigger
  label: Change Trigger
  kind: action
  params:
    - name: id
      type: string
      description: UUID of trigger
    - name: enabled
      type: boolean
    - name: name
      type: string
    - name: type
      type: string
    - name: expressions
      type: object
    - name: actions
      type: array
  transport_hint: POST /api/v1/ChangeTrigger

- id: add_user
  label: Add User
  kind: action
  params:
    - name: username
      type: string
      required: true
    - name: authmode
      type: string
      required: true
      description: "internal" or "ldap"
    - name: admin
      type: string
      required: true
      description: "admin" or "user"
    - name: name
      type: string
      required: true
    - name: privs
      type: array
      required: true
      description: "Subset of: TriggerConfig, DeviceControl, NetworkSettings, SoftwareUpdate, UserAdmin"
  transport_hint: POST /api/v1/UserAdd

- id: change_user
  label: Change User
  kind: action
  params:
    - name: username
      type: string
      required: true
      description: Must match existing username
    - name: authmode
      type: string
      required: false
    - name: email
      type: string
      required: false
    - name: admin
      type: string
      required: false
    - name: passwd
      type: string
      required: false
    - name: name
      type: string
      required: false
    - name: privs
      type: array
      required: false
  transport_hint: POST /api/v1/UserChange

- id: delete_user
  label: Delete User
  kind: action
  params:
    - name: username
      type: string
      required: true
  transport_hint: POST /api/v1/UserDel

- id: upload_file
  label: Upload File
  kind: action
  params:
    - name: name
      type: string
      description: "File type identifier: fwupdate.img, squid.cfg, snmpd.conf, ssl.crt, ssl.key, cert.ca, wpa_supplicant.conf, wpa_cert.ca, wpa_user.crt, wpa_user.prv, wpa_fast.pac"
    - name: file
      type: binary
      description: File content as multipart/form-data
  transport_hint: POST /api/v1/UploadFile

- id: query_timestamped_events
  label: Query Time-Stamped Events
  kind: action
  params:
    - name: startDate
      type: string
      description: Start date for event range
    - name: endDate
      type: string
      description: End date for event range
  transport_hint: POST /api/v1/TimeStampedEvents body [-1,-1,"startDate","endDate"]
```

## Feedbacks
```yaml
- id: current_status
  type: object
  description: Full device status including model, serial, activeState, firmware, outlet states, groups, and device measurements
  transport_hint: GET /api/v1/currentStatus
  query_command: GET /api/v1/currentStatus

- id: network_settings
  type: object
  description: Ethernet interfaces, HTTP, SNMP, NTP, mDNS, remote shell, 802.1x configuration
  transport_hint: GET /api/v1/networkSettings
  query_command: GET /api/v1/networkSettings

- id: device_settings
  type: object
  description: Squid config, outlets, groups, sequences, startup/shutdown procedures, data log schema
  transport_hint: GET /api/v1/deviceSettings
  query_command: GET /api/v1/deviceSettings

- id: sequences
  type: array
  description: All configured sequences with current running state and step details
  transport_hint: GET /api/v1/sequences
  query_command: GET /api/v1/sequences

- id: event_settings
  type: object
  description: Trigger configurations including expressions, actions, stats, and active state
  transport_hint: GET /api/v1/EventSettings
  query_command: GET /api/v1/EventSettings

- id: users
  type: array
  description: User accounts with auth mode, admin status, and privileges
  transport_hint: GET /api/v1/users
  query_command: GET /api/v1/users

- id: who_are_you
  type: object
  description: Device identification (model, serial, manufacturer, firmware, MAC, IP, httpd config)
  transport_hint: GET /api/v1/WhoAreYou
  query_command: GET /api/v1/WhoAreYou

- id: log_file_info
  type: object
  description: Historical data log schema, folder, file listing
  transport_hint: POST /api/v1/logFileInfo body ["SquidData"]
  query_command: POST /api/v1/logFileInfo body ["SquidData"]
```

## Variables
```yaml
- id: outlet_state
  type: enum
  values: [off, on, rebooting]
  description: Per-outlet power state (0=off, 1=on, 2=rebooting)

- id: outlet_initial_state
  type: enum
  values: [always_on, always_off, shutdown, on, off, last_state]
  description: Startup behavior for each outlet (0=always on, 1=always off, 2=shutdown, 3=on, 4=off, 5=last state)

- id: active_state
  type: enum
  values: [Start Up, Running, Shutdown]
  description: Overall device state

- id: temperature_units
  type: enum
  values: [F, C]

- id: auto_logout_time
  type: integer
  description: Auto logout time in minutes

- id: data_log_interval
  type: integer
  description: Data logging interval in seconds

- id: reboot_time
  type: integer
  description: Per-outlet reboot duration in seconds

- id: device_measurements
  type: object
  description: Real-time measurements including voltage, current, power, frequency, temperature, crest factor, power factor, surge status, energy usage
```

## Events
```yaml
- id: timestamped_events
  type: object
  description: Time-stamped event log entries including system events, control actions, and trigger activations
  fields:
    - name: alertLevel
      type: enum
      values: ["1_OK", "2_Alert", "3_Warning"]
    - name: type
      type: enum
      values: [System, Control, "Trigger (On)", "Trigger (Off)"]
    - name: time
      type: string
      description: ISO 8601 timestamp
# UNRESOLVED: no push/subscribe mechanism documented; events are polled via TimeStampedEvents endpoint
```

## Macros
```yaml
- id: startup_procedure
  description: Configurable startup behavior on power-up after outage or hard restart; options are RunSequence (with configurable delay) or InitialState
  params:
    - name: type
      type: enum
      values: [RunSequence, InitialState]
    - name: sequenceId
      type: integer
    - name: delay
      type: integer
      description: Delay in seconds before executing

- id: shutdown_clear_procedure
  description: Configurable behavior when clearing shutdown state; same options as startup_procedure
  params:
    - name: type
      type: enum
      values: [RunSequence, InitialState]
    - name: sequenceId
      type: integer
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "EnterShutdownState prevents any outlet from turning on until ClearShutdownState is called"
  - description: "EnterShutdownState and ClearShutdownState require Admin privileges"
  - description: "Outlet control commands (PowerOn, PowerOff, Reboot) require DeviceControl privilege"
# UNRESOLVED: no explicit safety interlock sequencing documented beyond privilege checks
```

## Notes
- API version is embedded in URI path (`/api/v1/`); firmware updates may add new protocol versions while keeping old ones available.
- All response bodies are JSON with an `objType` key identifying the response type.
- Non-documented key/value pairs should be treated as internal-only.
- Outlet IDs follow pattern `/{device_id}/{outlet_number}`; device_id is always `1` for single Squid units. Group IDs use higher numbers (e.g., `/1/10` for "All Outlets").
- Sequence step commands use format `/{device_id}/{outlet_id}/{Command}` where Command is PowerOn, PowerOff, or Reboot.
- mDNS discovery supported on port 5353 (not part of the REST API).
- HTTP default port is 80 but examples show 8080; port is user-configurable via networkSettings.
- HTTPS/SSL supported but disabled by default.
<!-- UNRESOLVED: exact default HTTP port unclear — docs state default 80 but all examples use 8080 -->
<!-- UNRESOLVED: firmware version compatibility not stated -->

## Provenance

```yaml
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/squid/api-definition-squid-rev-b.pdf
  - https://www.ametekesp.com/-/media/ametekesp/downloads/data-sheets/b03-00020-_rev-a_surgex_data-sheet_squid.pdf
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/squid_v10.mib
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/modules/surgex-squid-v10-demo-crestron.zip
  - https://www.ametekesp.com/-/media/ametekesp/downloads/software/squid/modules/surgex-squid-v10-demo-control4.zip
retrieved_at: 2026-05-22T20:56:53.306Z
last_checked_at: 2026-10-07T20:47:11.496Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T20:47:11.496Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 action units (19 actions, 8 query feedbacks) match source endpoints; base path and auth are source-supported; the source's 27 endpoints are all represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version compatibility range not stated"
- "exact number of outlets varies by hardware configuration"
- "default HTTP port stated as 80 in docs but examples use 8080; port is user-configurable"
- "no push/subscribe mechanism documented; events are polled via TimeStampedEvents endpoint"
- "no explicit safety interlock sequencing documented beyond privilege checks"
- "exact default HTTP port unclear — docs state default 80 but all examples use 8080"
- "firmware version compatibility not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
