---
spec_id: admin/surgex-vertical-series-plus
schema_version: ai4av-public-spec-v1
revision: 1
title: "SurgeX Vertical Series + Control Spec"
manufacturer: SurgeX
model_family: "Vertical Series +"
aliases: []
compatible_with:
  manufacturers:
    - SurgeX
  models:
    - "Vertical Series +"
    - SX-VS-1216
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/surgex/vertical-series-plus/vertical-series-120v
retrieved_at: 2026-04-30T04:31:25.323Z
last_checked_at: 2026-06-02T22:15:20.892Z
generated_at: 2026-06-02T22:15:20.892Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "which specific Vertical Series + models share this API beyond SX-VS-1216"
  - "maximum number of outlets varies by model; only SX-VS-1216 (16 outlets) shown in source"
  - "source does not detail specific power-on sequencing warnings or interlock procedures beyond the shutdown state mechanism"
  - "maximum number of outlets and groups varies by model; only SX-VS-1216 (16 outlets) is shown"
  - "outputConfirmation field values and meaning not fully documented"
  - "protocol version v1 is the only version documented; no deprecation timeline stated"
  - "GPIO feedback signal options beyond DCBank1Feedback, DCBank2Feedback, 5VBankFeedback not enumerated"
  - "DHCP and static IP configuration change may require device restart"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:20.892Z
  matched_actions: 18
  action_count: 18
  confidence: medium
  summary: "All 18 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# SurgeX Vertical Series + Control Spec

## Summary
The SurgeX Vertical Series + (by AMETEK ESP/SurgeX) is a networked power distribution unit with individually switchable AC outlets, outlet grouping, power sequencing, event triggers, and energy monitoring. This spec covers the RESTful HTTP/HTTPS API version 1 (`/api/v1`) used for outlet power control, sequencing, threshold-based triggers, user management, and device configuration. Basic Authentication (or session token) is required for all endpoints. All responses are JSON.

<!-- UNRESOLVED: which specific Vertical Series + models share this API beyond SX-VS-1216 -->
<!-- UNRESOLVED: maximum number of outlets varies by model; only SX-VS-1216 (16 outlets) shown in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v1
  port: 80  # default per source httpd.port; configurable via PUT /api/v1/networkSettings
auth:
  type: basic  # Basic Authentication required; also supports x-auth-token session header
  notes: Authentication is required for all API features. Supports Basic Auth and web session tokens via x-auth-token header.
```

## Traits
```yaml
- powerable    # inferred from PowerOn/PowerOff/Reboot outlet commands
- queryable    # inferred from currentStatus, WhoAreYou, deviceSettings query endpoints
```

## Actions
```yaml
- id: power_on_outlet
  label: Power On Outlet
  kind: action
  transport: http
  method: POST
  path: /api/v1/{device_id}/{outlet_id}/PowerOn
  description: Powers on the specified outlet or group
  params:
    - name: device_id
      type: string
      description: Device ID (always "1" for Vertical Series +)
      required: true
    - name: outlet_id
      type: string
      description: Outlet or group ID (e.g. "1", "2", or group ID like "25")
      required: true
  response: boolean (true = success)
  auth_required: DeviceControl privilege

- id: power_off_outlet
  label: Power Off Outlet
  kind: action
  transport: http
  method: POST
  path: /api/v1/{device_id}/{outlet_id}/PowerOff
  description: Powers off the specified outlet or group
  params:
    - name: device_id
      type: string
      description: Device ID (always "1" for Vertical Series +)
      required: true
    - name: outlet_id
      type: string
      description: Outlet or group ID
      required: true
  response: boolean (true = success)
  auth_required: DeviceControl privilege

- id: reboot_outlet
  label: Reboot Outlet
  kind: action
  transport: http
  method: POST
  path: /api/v1/{device_id}/{outlet_id}/Reboot
  description: Reboots the specified outlet or group (power off then on with configurable delay)
  params:
    - name: device_id
      type: string
      description: Device ID (always "1" for Vertical Series +)
      required: true
    - name: outlet_id
      type: string
      description: Outlet or group ID
      required: true
  response: boolean (true = success)
  auth_required: DeviceControl privilege

- id: enter_shutdown_state
  label: Enter Shutdown State
  kind: action
  transport: http
  method: POST
  path: /api/v1/EnterShutdownState
  description: Puts the device into shutdown state; no outlets can be turned on manually until cleared
  params: []
  response: boolean (true = success)
  auth_required: Admin privilege

- id: clear_shutdown_state
  label: Clear Shutdown State
  kind: action
  transport: http
  method: POST
  path: /api/v1/ClearShutdownState
  description: Takes the device out of shutdown state, returning to running state
  params: []
  response: boolean (true = success)
  auth_required: Admin privilege

- id: reset_energy_usage
  label: Reset Energy Usage
  kind: action
  transport: http
  method: POST
  path: /api/v1/ResetEnergyUsage
  description: Clears the total energy usage counter and resets the date-since-last-reset
  params: []
  response: boolean

- id: run_sequence
  label: Run Sequence
  kind: action
  transport: http
  method: POST
  path: /api/v1/RunSequence
  description: Executes a previously defined power sequence by its ID
  params:
    - name: id
      type: integer
      description: Sequence ID to run
      required: true
  response: boolean (true = success)

- id: add_sequence
  label: Add Sequence
  kind: action
  transport: http
  method: POST
  path: /api/v1/AddSequence
  description: Creates a new power sequence
  params:
    - name: id
      type: integer
      description: Set to null for new sequence
      required: true
    - name: name
      type: string
      description: User-friendly name for the sequence
      required: true
    - name: steps
      type: array
      description: Array of step objects with "method" and "delay" keys
      required: true
  response: integer (new sequence ID)

- id: change_sequence
  label: Change Sequence
  kind: action
  transport: http
  method: POST
  path: /api/v1/ChangeSequence
  description: Modifies an existing power sequence
  params:
    - name: id
      type: integer
      description: Sequence ID to modify
      required: true
    - name: name
      type: string
      description: Updated sequence name
      required: true
    - name: steps
      type: array
      description: Updated array of step objects
      required: true
  response: boolean

- id: remove_sequence
  label: Remove Sequence
  kind: action
  transport: http
  method: POST
  path: /api/v1/RemoveSequence
  description: Deletes a power sequence
  params:
    - name: id
      type: integer
      description: Sequence ID to delete
      required: true
  response: boolean

- id: add_trigger
  label: Add Trigger
  kind: action
  transport: http
  method: POST
  path: /api/v1/AddTrigger
  description: Creates a new event trigger (threshold, schedule, autoping, or GPIO state change)
  params:
    - name: id
      type: integer
      description: Set to 0 for new trigger
      required: true
    - name: enabled
      type: boolean
      required: true
    - name: name
      type: string
      required: true
    - name: type
      type: string
      description: "One of: ThresholdSamples, Schedule, Autoping, GpioStateChange"
      required: true
    - name: expressions
      type: object
      description: On/off evaluation criteria
      required: true
    - name: actions
      type: array
      description: Action objects for on/off state transitions
      required: true
  response: object (newly created trigger)

- id: change_trigger
  label: Change Trigger
  kind: action
  transport: http
  method: POST
  path: /api/v1/ChangeTrigger
  description: Modifies an existing event trigger
  params:
    - name: id
      type: string
      description: UUID of the trigger to modify
      required: true
    - name: enabled
      type: boolean
      required: true
    - name: name
      type: string
      required: true
    - name: type
      type: string
      required: true
    - name: expressions
      type: object
      required: true
    - name: actions
      type: array
      required: true
  response: string (trigger UUID)

- id: change_network_settings
  label: Change Network Settings
  kind: action
  transport: http
  method: PUT
  path: /api/v1/networkSettings
  description: Updates network interface, HTTP server, SNMP, and other network configuration
  params:
    - name: ethInterfaces
      type: array
      description: Array of network interface configuration objects
      required: false
    - name: httpd
      type: object
      description: HTTP server settings (enabled, ssl, port)
      required: false
  response: null

- id: change_device_settings
  label: Change Device Settings
  kind: action
  transport: http
  method: PUT
  path: /api/v1/deviceSettings
  description: Updates device name and other device-level settings
  params:
    - name: verticalseries
      type: object
      description: Device object with name and id keys
      required: true
  response: boolean

- id: add_user
  label: Add User
  kind: action
  transport: http
  method: POST
  path: /api/v1/UserAdd
  description: Creates a new user account
  params:
    - name: username
      type: string
      required: true
    - name: name
      type: string
      required: true
    - name: authmode
      type: string
      description: "internal" or "ldap"
      required: true
    - name: admin
      type: string
      description: "admin" or "user"
      required: true
    - name: privs
      type: array
      description: "Array of: TriggerConfig, DeviceControl, NetworkSettings, SoftwareUpdate, UserAdmin"
      required: true
    - name: passwd
      type: string
      required: false
  response: array [status_code, username]

- id: change_user
  label: Change User
  kind: action
  transport: http
  method: POST
  path: /api/v1/UserChange
  description: Modifies an existing user account
  params:
    - name: username
      type: string
      description: Username to edit (must already exist)
      required: true
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
  response: array [status_code, username]

- id: delete_user
  label: Delete User
  kind: action
  transport: http
  method: POST
  path: /api/v1/UserDel
  description: Deletes a user account
  params:
    - name: username
      type: string
      required: true
  response: array [status_code, username]

- id: upload_file
  label: Upload File
  kind: action
  transport: http
  method: POST
  path: /api/v1/UploadFile
  description: Uploads firmware, config, or certificate files to the device
  params:
    - name: file
      type: file
      description: "Multipart form data. Supported names: fwupdate.img, verticalseriesPlus.cfg, snmpd.conf, ssl.crt, ssl.key, cert.ca, wpa_supplicant.conf, wpa_cert.ca, wpa_user.crt, wpa_user.prv, wpa_fast.pac"
      required: true
  response: integer
```

## Feedbacks
```yaml
- id: current_status
  label: Current Status
  transport: http
  method: GET
  path: /api/v1/currentStatus
  description: Returns full device status including model, serial, active state, firmware, device measurements, outlet states, and outlet groups
  response_fields:
    - key: activeState
      type: enum
      values: [Startup, Running, Shutdown]
    - key: firmware
      type: string
    - key: devices[].deviceMeasurements.voltageLN
      type: number
      description: Line to neutral voltage (V)
    - key: devices[].deviceMeasurements.current
      type: number
      description: Total AC current (A)
    - key: devices[].deviceMeasurements.power
      type: number
      description: Average power (W)
    - key: devices[].deviceMeasurements.frequency
      type: number
      description: Frequency (Hz)
    - key: devices[].deviceMeasurements.temperature
      type: number
      description: Internal temperature
    - key: devices[].deviceMeasurements.energyUsage
      type: number
      description: Energy usage since last reset (Wh)
    - key: devices[].deviceMeasurements.pf
      type: number
      description: Power factor (0 to 1)
    - key: devices[].deviceMeasurements.crestFactor
      type: number
      description: Line to neutral voltage crest factor
    - key: outlets[].state
      type: enum
      values: [0, 1, 2]
      description: "Outlet state: 0=off, 1=on, 2=rebooting"
    - key: groups[].state
      type: integer
      description: Outlet group state

- id: who_are_you
  label: Who Are You
  transport: http
  method: GET
  path: /api/v1/WhoAreYou
  description: Returns device identification including model, serial, MAC, hostname, firmware, manufacturer, and device type
  response_fields:
    - key: model
      type: string
    - key: serial
      type: string
    - key: manufacturer
      type: string
      description: Always "AMETEK ESP/SurgeX"
    - key: deviceType
      type: string
      description: "Power Controller"
    - key: firmware
      type: string

- id: network_settings
  label: Network Settings
  transport: http
  method: GET
  path: /api/v1/networkSettings
  description: Returns network interface, HTTP server, SNMP, NTP, and 802.1x configuration
  response_fields:
    - key: ethInterfaces[].addr
      type: string
      description: IP address
    - key: httpd.port
      type: integer
      description: HTTP server port
    - key: httpd.ssl
      type: boolean
      description: Whether HTTPS is enabled

- id: device_settings
  label: Device Settings
  transport: http
  method: GET
  path: /api/v1/deviceSettings
  description: Returns device configuration including sequences, startup/shutdown procedures, outlet and group settings, data log schema

- id: sequences
  label: Sequences
  transport: http
  method: GET
  path: /api/v1/sequences
  description: Returns all configured power sequences with their steps, running state, and current step
  response_fields:
    - key: [].id
      type: integer
      description: Sequence ID
    - key: [].running
      type: boolean
    - key: [].currentStep
      type: integer
    - key: [].name
      type: string
    - key: [].steps[].method
      type: string
      description: "Command path e.g. /1/1/PowerOn"
    - key: [].steps[].delay
      type: integer
      description: Delay in seconds before executing step

- id: event_settings
  label: Event Settings
  transport: http
  method: GET
  path: /api/v1/EventSettings
  description: Returns trigger configurations including threshold, schedule, autoping, and GPIO state change triggers

- id: users
  label: Users
  transport: http
  method: GET
  path: /api/v1/users
  description: Returns array of user accounts with their privileges
  response_fields:
    - key: [].username
      type: string
    - key: [].admin
      type: string
      description: "admin" or "user"
    - key: [].privs
      type: array
      description: "Privileges: TriggerConfig, DeviceControl, NetworkSettings, SoftwareUpdate, UserAdmin"

- id: time_stamped_events
  label: Time Stamped Events
  transport: http
  method: POST
  path: /api/v1/TimeStampedEvents
  description: Returns event log entries between specified dates
  params:
    - name: date_range
      type: array
      description: "[-1, -1, \"startDate\", \"endDate\"]"
      required: true

- id: historical_data_info
  label: Historical Data Info
  transport: http
  method: POST
  path: /api/v1/LogFileInfo
  description: Returns historical data log file list with schema and retrieval URLs
  params:
    - name: log_type
      type: array
      description: '["VerticalSeriesData"]'
      required: true
```

## Variables
```yaml
- id: outlet_initial_state
  label: Outlet Initial State
  description: "State the outlet will take on startup. 0=always on, 1=always off, 2=shutdown, 3=on, 4=off, 5=last state"
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  set_via: PUT /api/v1/deviceSettings

- id: outlet_reboot_time
  label: Outlet Reboot Time
  description: Time delay in seconds between turning an outlet off and back on during a reboot command
  type: integer
  set_via: PUT /api/v1/deviceSettings

- id: outlet_name
  label: Outlet Name
  description: User-configurable name for an outlet
  type: string
  set_via: PUT /api/v1/deviceSettings

- id: outlet_group_name
  label: Outlet Group Name
  description: User-configurable name for an outlet group
  type: string
  set_via: PUT /api/v1/deviceSettings

- id: auto_logout_time
  label: Auto Logout Time
  description: Minutes a web session stays active before auto logout
  type: integer
  set_via: PUT /api/v1/deviceSettings

- id: temperature_units
  label: Temperature Units
  description: Units for temperature reporting
  type: enum
  values: [F, C]
  set_via: PUT /api/v1/deviceSettings

- id: startup_procedure
  label: Startup Procedure
  description: "Procedure on power-up after outage or restart. type: RunSequence or InitialState"
  type: object
  set_via: PUT /api/v1/deviceSettings

- id: shutdown_clear_procedure
  label: Shutdown Clear Procedure
  description: "Procedure for power-up after a shutdown state. Same options as startup procedure"
  type: object
  set_via: PUT /api/v1/deviceSettings

- id: http_port
  label: HTTP Server Port
  description: Port number for the web server
  type: integer
  set_via: PUT /api/v1/networkSettings

- id: http_ssl
  label: HTTP SSL Enabled
  description: Whether HTTPS is enabled
  type: boolean
  set_via: PUT /api/v1/networkSettings
```

## Events
```yaml
# The device supports event triggers that fire actions on state transitions.
# Triggers are configured via AddTrigger/ChangeTrigger and monitored via EventSettings.
# Types: ThresholdSamples (power measurement thresholds), Schedule (date/time),
# Autoping (IP reachability), GpioStateChange (GPIO feedback signal).
# Trigger actions can call: PowerOn, PowerOff, Reboot, RunSequence,
# EnterShutdownState, ClearShutdownState, or None per outlet/group.
# Time-stamped event log accessible via POST /api/v1/TimeStampedEvents.
# SNMP traps are also supported for auth failures, manual control, and system triggers.
```

## Macros
```yaml
- id: power_sequence
  label: Power Sequence
  description: >
    A sequence of timed outlet commands. Each step has a "method" (e.g. /1/1/PowerOn)
    and a "delay" in seconds before execution. Sequences are created via
    POST /api/v1/AddSequence, modified via POST /api/v1/ChangeSequence,
    and executed via POST /api/v1/RunSequence with the sequence ID.
    Sequences can also be triggered automatically on startup or shutdown clear.
  steps_example:
    - method: /1/1/PowerOn
      delay: 0
    - method: /1/2/PowerOn
      delay: 5
    - method: /1/3/PowerOn
      delay: 10
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Shutdown state prevents any outlet from being turned on via manual control until ClearShutdownState is called (requires Admin privilege)"
# UNRESOLVED: source does not detail specific power-on sequencing warnings or interlock procedures beyond the shutdown state mechanism
```

## Notes
- All API endpoints require authentication (Basic Auth or x-auth-token session header).
- Protocol versioning is embedded in the URI path (`/api/v1`). Breaking changes will iterate the version number. Multiple versions may coexist.
- Outlet IDs follow the pattern `/{device_id}/{outlet_number}` where device_id is always "1" for Vertical Series +.
- Outlet groups have their own IDs (e.g. `/1/25` for "All Outlets") and can be controlled the same as individual outlets.
- `rebootTime` per outlet defines the off-to-on delay during a reboot command (default 3 seconds in example).
- `outputConfirmation` field present on outlets but not fully documented in source.
- mDNS discovery is supported on port 5353 for dynamic device discovery.
- SNMP v1/v2c/v3 is supported with configurable communities, users, and traps.
- Data log files are gzip-compressed CSV accessible via HTTP GET at the folder URI returned by LogFileInfo.
- Files still being written have `__inprocess__` in the filename and should be treated as corrupt.

<!-- UNRESOLVED: maximum number of outlets and groups varies by model; only SX-VS-1216 (16 outlets) is shown -->
<!-- UNRESOLVED: outputConfirmation field values and meaning not fully documented -->
<!-- UNRESOLVED: protocol version v1 is the only version documented; no deprecation timeline stated -->
<!-- UNRESOLVED: GPIO feedback signal options beyond DCBank1Feedback, DCBank2Feedback, 5VBankFeedback not enumerated -->
<!-- UNRESOLVED: DHCP and static IP configuration change may require device restart -->

## Provenance

```yaml
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/surgex/vertical-series-plus/vertical-series-120v
retrieved_at: 2026-04-30T04:31:25.323Z
last_checked_at: 2026-06-02T22:15:20.892Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:20.892Z
matched_actions: 18
action_count: 18
confidence: medium
summary: "All 18 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "which specific Vertical Series + models share this API beyond SX-VS-1216"
- "maximum number of outlets varies by model; only SX-VS-1216 (16 outlets) shown in source"
- "source does not detail specific power-on sequencing warnings or interlock procedures beyond the shutdown state mechanism"
- "maximum number of outlets and groups varies by model; only SX-VS-1216 (16 outlets) is shown"
- "outputConfirmation field values and meaning not fully documented"
- "protocol version v1 is the only version documented; no deprecation timeline stated"
- "GPIO feedback signal options beyond DCBank1Feedback, DCBank2Feedback, 5VBankFeedback not enumerated"
- "DHCP and static IP configuration change may require device restart"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
