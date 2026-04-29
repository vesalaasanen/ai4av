---
schema_version: ai4av-public-spec-v1
device_id: surgex/sx-vs-1216
entity_id: surgex_sx_vs_1_series
spec_id: admin/surgex-sx-vs-1-series
revision: 1
author: admin
title: "SurgeX SX-VS-1 Series Control Spec"
status: published
manufacturer: SurgeX
manufacturer_key: surgex
model_family: SX-VS-1216
aliases: []
compatible_with:
  manufacturers:
    - SurgeX
  models:
    - SX-VS-1216
    - "SX-VS-1 Series"
  firmware: "\"\" # UNRESOLVED: firmware version compatibility not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: surgex_sx_vs_1_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:13.616Z
retrieved_at: 2026-04-27T10:13:13.616Z
last_checked_at: 2026-04-27T10:13:13.616Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version compatibility not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-27T10:13:13.616Z
  matched_actions: 29
  action_count: 29
  confidence: high
  summary: "All 29 spec actions matched to source endpoints; transport parameters verified in source documentation."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# SurgeX SX-VS-1 Series Control Spec

## Summary
The SurgeX SX-VS-1 Series (Vertical Series +) is a networked power distribution unit with individually switchable AC outlets. It exposes a RESTful JSON API over HTTP/HTTPS for outlet power control, sequencing, event triggers, power monitoring, and device configuration. All endpoints require Basic Authentication or a session token via the `x-auth-token` header.

<!-- UNRESOLVED: exact model variants in the SX-VS-1 Series family beyond SX-VS-1216 are not enumerated in source -->
<!-- UNRESOLVED: HTTPS/TLS configuration details beyond ssl boolean flag not documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v1
  port: 80
auth:
  type: basic
  notes: Basic Authentication required for all API endpoints. Session tokens also supported via x-auth-token header.
```

## Traits
```yaml
traits:
  - powerable  # inferred from PowerOn/PowerOff/Reboot outlet commands
  - queryable  # inferred from currentStatus, WhoAreYou query endpoints
```

## Actions
```yaml
actions:
  - id: power_on_outlet
    label: Power On Outlet
    kind: action
    method: POST
    path: /api/v1/{id}/{outlet}/PowerOn
    params:
      - name: id
        type: string
        description: Device ID (always "1" for Vertical Series +)
      - name: outlet
        type: string
        description: Outlet ID or group ID (e.g. "/1/1", "/1/25")
    response:
      type: boolean
      description: "true" for success, "false" for failure
    notes: User must have DeviceControl privilege

  - id: power_off_outlet
    label: Power Off Outlet
    kind: action
    method: POST
    path: /api/v1/{id}/{outlet}/PowerOff
    params:
      - name: id
        type: string
        description: Device ID (always "1" for Vertical Series +)
      - name: outlet
        type: string
        description: Outlet ID or group ID
    response:
      type: boolean
    notes: User must have DeviceControl privilege

  - id: reboot_outlet
    label: Reboot Outlet
    kind: action
    method: POST
    path: /api/v1/{id}/{outlet}/Reboot
    params:
      - name: id
        type: string
        description: Device ID (always "1" for Vertical Series +)
      - name: outlet
        type: string
        description: Outlet ID or group ID
    response:
      type: boolean
    notes: User must have DeviceControl privilege. Reboot time is configurable per outlet (rebootTime field).

  - id: run_sequence
    label: Run Sequence
    kind: action
    method: POST
    path: /api/v1/RunSequence
    params:
      - name: id
        type: integer
        description: Sequence ID to execute
    response:
      type: boolean

  - id: enter_shutdown_state
    label: Enter Shutdown State
    kind: action
    method: POST
    path: /api/v1/EnterShutdownState
    params: []
    response:
      type: boolean
    notes: Prevents any outlet from turning on until cleared. Requires Admin privileges.

  - id: clear_shutdown_state
    label: Clear Shutdown State
    kind: action
    method: POST
    path: /api/v1/ClearShutdownState
    params: []
    response:
      type: boolean
    notes: Returns device to running state. Requires Admin privileges.

  - id: reset_energy_usage
    label: Reset Energy Usage
    kind: action
    method: POST
    path: /api/v1/ResetEnergyUsage
    params: []
    response:
      type: boolean

  - id: add_sequence
    label: Add Sequence
    kind: action
    method: POST
    path: /api/v1/AddSequence
    params:
      - name: id
        type: integer
        description: "null for new sequence"
      - name: name
        type: string
        description: User-friendly sequence name
      - name: steps
        type: array
        description: Array of step objects with "method" and "delay" keys
    response:
      type: integer
      description: ID of the newly created sequence

  - id: change_sequence
    label: Change Sequence
    kind: action
    method: POST
    path: /api/v1/ChangeSequence
    params:
      - name: id
        type: integer
        description: Sequence ID to modify
      - name: name
        type: string
      - name: steps
        type: array
    response:
      type: boolean

  - id: remove_sequence
    label: Remove Sequence
    kind: action
    method: POST
    path: /api/v1/RemoveSequence
    params:
      - name: id
        type: integer
        description: Sequence ID to delete
    response:
      type: boolean

  - id: add_trigger
    label: Add Trigger
    kind: action
    method: POST
    path: /api/v1/AddTrigger
    params:
      - name: id
        type: integer
        description: "0 for new trigger"
      - name: enabled
        type: boolean
      - name: name
        type: string
      - name: type
        type: string
        description: "ThresholdSamples, Schedule, Autoping, or GpioStateChange"
      - name: expressions
        type: object
        description: On/off evaluation criteria
      - name: actions
        type: array
        description: Actions to take on state transitions
    response:
      type: object
      description: The newly created trigger object

  - id: change_trigger
    label: Change Trigger
    kind: action
    method: POST
    path: /api/v1/ChangeTrigger
    params:
      - name: id
        type: string
        description: UUID of the trigger to modify
    response:
      type: string
      description: UUID of the changed trigger

  - id: change_network_settings
    label: Change Network Settings
    kind: action
    method: PUT
    path: /api/v1/networkSettings
    params:
      - name: httpd
        type: object
        description: Web server settings (enabled, ssl, port)
      - name: ethInterfaces
        type: array
        description: Ethernet interface configurations

  - id: change_device_settings
    label: Change Device Settings
    kind: action
    method: PUT
    path: /api/v1/deviceSettings
    params:
      - name: verticalseries
        type: object
        description: Device object including name, outlets, groups, sequences, startup procedure

  - id: change_user
    label: Change User
    kind: action
    method: POST
    path: /api/v1/UserChange
    params:
      - name: username
        type: string
        required: true
      - name: authmode
        type: string
      - name: email
        type: string
      - name: admin
        type: string
        description: "admin" or "user"
      - name: passwd
        type: string
      - name: name
        type: string
      - name: privs
        type: array
        description: "Array of: TriggerConfig, DeviceControl, NetworkSettings, SoftwareUpdate, UserAdmin"

  - id: add_user
    label: Add User
    kind: action
    method: POST
    path: /api/v1/UserAdd
    params:
      - name: username
        type: string
        required: true
      - name: authmode
        type: string
        required: true
        description: "internal" or "ldap"
      - name: name
        type: string
        required: true
      - name: admin
        type: string
        required: true
      - name: privs
        type: array
        required: true
    response:
      type: array
      description: "[index, username]"

  - id: delete_user
    label: Delete User
    kind: action
    method: POST
    path: /api/v1/UserDel
    params:
      - name: username
        type: string
        required: true
    response:
      type: array
      description: "[index, username]"

  - id: upload_file
    label: Upload File
    kind: action
    method: POST
    path: /api/v1/UploadFile
    params:
      - name: file
        type: file
        description: "multipart/form-data. name options: fwupdate.img, verticalseriesPlus.cfg, snmpd.conf, ssl.crt, ssl.key, cert.ca, wpa_supplicant.conf, wpa_cert.ca, wpa_user.crt, wpa_user.prv, wpa_fast.pac"
```

## Feedbacks
```yaml
feedbacks:
  - id: current_status
    label: Current Status
    method: GET
    path: /api/v1/currentStatus
    type: object
    description: Full device status including model, serial, activeState, firmware, devices with measurements, groups, and outlets
    fields:
      - name: activeState
        type: enum
        values: [Startup, Running, Shutdown]
      - name: firmware
        type: string
      - name: model
        type: string
      - name: serial
        type: string

  - id: outlet_state
    label: Outlet State
    type: enum
    values: ["0", "1", "2"]
    description: "0 = off, 1 = on, 2 = rebooting. Found in currentStatus.outlets[].state"

  - id: who_are_you
    label: Device Identity
    method: GET
    path: /api/v1/WhoAreYou
    type: object
    description: Device identity including model, serial, MAC, hostname, firmware, manufacturer, deviceType

  - id: network_settings
    label: Network Settings
    method: GET
    path: /api/v1/networkSettings
    type: object
    description: Network interface config, HTTP server settings, SNMP config, NTP, mDNS

  - id: device_settings
    label: Device Settings
    method: GET
    path: /api/v1/deviceSettings
    type: object
    description: Device configuration including sequences, startup procedure, outlet/group settings

  - id: sequences
    label: Sequences
    method: GET
    path: /api/v1/sequences
    type: array
    description: List of all configured sequences with steps, running state, and current step

  - id: event_settings
    label: Event Settings
    method: GET
    path: /api/v1/EventSettings
    type: object
    description: Trigger configurations including threshold, schedule, autoping, and GPIO state change triggers

  - id: users
    label: Users
    method: GET
    path: /api/v1/users
    type: array
    description: List of configured users with privileges

  - id: time_stamped_events
    label: Time Stamped Events
    method: POST
    path: /api/v1/TimeStampedEvents
    type: object
    params:
      - name: startDate
        type: string
        required: true
      - name: endDate
        type: string
        required: true
    description: Events logged between specified dates. Returns trigger events, system events, control events.

  - id: historical_data_info
    label: Historical Data Info
    method: POST
    path: /api/v1/LogFileInfo
    type: object
    params:
      - name: logType
        type: string
        description: "e.g. \"VerticalSeriesData\""
    description: Schema and file list for historical power measurement data logs

  - id: device_measurements
    label: Device Measurements
    type: object
    description: Power measurements found in currentStatus.devices[].deviceMeasurements
    fields:
      - name: voltageLN
        type: number
        description: Line to neutral voltage (V)
      - name: current
        type: number
        description: Total AC current (A)
      - name: power
        type: number
        description: Average power (W)
      - name: frequency
        type: number
        description: Frequency (Hz)
      - name: temperature
        type: number
        description: Internal temperature (units per temperatureUnits setting)
      - name: pf
        type: number
        description: Power factor (0 to 1)
      - name: energyUsage
        type: number
        description: Energy usage since last reset (Wh)
      - name: crestFactor
        type: number
        description: Line to neutral voltage crest factor
      - name: crestFactorNG
        type: number
        description: Neutral to ground voltage crest factor

  - id: input_state
    label: Input State
    type: enum
    values: [No Ground, Reverse Polarity, Wiring Fault]
    description: Reports input power abnormalities
```

## Variables
```yaml
variables:
  - id: outlet_name
    label: Outlet Name
    path: currentStatus.outlets[].name
    type: string
    description: User-configurable outlet name

  - id: outlet_initial_state
    label: Outlet Initial State
    path: deviceSettings.outlets[].initialState
    type: enum
    values: ["0", "1", "2", "3", "4", "5"]
    description: "Startup behavior: 0=always on, 1=always off, 2=shutdown, 3=on, 4=off, 5=last state"

  - id: outlet_reboot_time
    label: Outlet Reboot Time
    path: currentStatus.outlets[].rebootTime
    type: integer
    description: Delay in seconds between off and on during reboot

  - id: temperature_units
    label: Temperature Units
    type: enum
    values: [F, C]

  - id: auto_logout_time
    label: Auto Logout Time
    type: integer
    description: Minutes before web session auto-logout

  - id: http_port
    label: HTTP Server Port
    type: integer
    description: Configurable web server port (default 80)
```

## Events
```yaml
events:
  - id: trigger_on
    description: Trigger entered active/on state (alertLevel 2)
    fields:
      - name: type
        values: [Trigger (On)]
      - name: message.action.type
        values: [PowerOn, PowerOff, Reboot]

  - id: trigger_off
    description: Trigger returned to off/clear state
    fields:
      - name: type
        values: [Trigger (Off)]

  - id: system_event
    description: System events (login, logout, NTP sync)
    fields:
      - name: type
        values: [System]

  - id: device_control_event
    description: Outlet control confirmation events
    fields:
      - name: type
        values: [DeviceControl]
```

## Macros
```yaml
macros:
  - id: startup_sequence
    label: Startup Sequence
    description: >
      A configured sequence of outlet power-on commands with delays between steps.
      Executed automatically on power-up when startupProcedure is set to RunSequence.
      Steps use syntax /{ID}/{OUTLET}/{COMMAND} where COMMAND is PowerOn, PowerOff, or Reboot.
    params:
      - name: steps
        type: array
        description: Array of {method: string, delay: integer_seconds}
```

## Safety
```yaml
confirmation_required_for:
  - enter_shutdown_state
  - clear_shutdown_state
interlocks:
  - shutdown_state: When device is in shutdown state, no outlets can be turned on via manual control until shutdown is cleared
  - admin_required: EnterShutdownState and ClearShutdownState require Admin privileges
  - privilege_check: Outlet control commands require DeviceControl privilege; user admin requires UserAdmin privilege
# UNRESOLVED: specific power-on sequencing safety requirements not stated in source
# UNRESOLVED: maximum inrush current or simultaneous outlet power-on limits not stated
```

## Notes
- Protocol version is embedded in the URI (currently v1). Firmware updates may introduce new protocol versions; multiple versions may coexist.
- Outlet IDs follow the pattern `/{device_id}/{outlet_number}` where device_id is always "1" for Vertical Series +.
- Groups (e.g. "All Outlets" with id "/1/25") can be used as targets for power commands.
- mDNS discovery is supported on port 5353 for dynamic device discovery on the network.
- Sequence steps support the commands: PowerOn, PowerOff, Reboot. Step delay is in seconds.
- Trigger types: ThresholdSamples (power measurement thresholds), Schedule (date/time), Autoping (IP ping monitoring), GpioStateChange (GPIO feedback).
- Historical data logs are stored as gzipped CSV files accessible via HTTP GET.
- Default HTTP port is 80, but is configurable. Examples in the source use port 8080.
<!-- UNRESOLVED: maximum number of outlets per model variant not explicitly stated (SX-VS-1216 has 16) -->
<!-- UNRESOLVED: SNMP trap payload format not documented -->
<!-- UNRESOLVED: firmware update procedure details beyond file upload not documented -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: surgex_sx_vs_1_series_ip.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-27T10:13:13.616Z
retrieved_at: 2026-04-27T10:13:13.616Z
last_checked_at: 2026-04-27T10:13:13.616Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-27T10:13:13.616Z
matched_actions: 29
action_count: 29
confidence: high
summary: "All 29 spec actions matched to source endpoints; transport parameters verified in source documentation."
```

## Known Gaps

```yaml
[]
```
