---
spec_id: admin/ametek-surgex-vertical-series
schema_version: ai4av-public-spec-v1
revision: 2
title: "Ametek SurgeX Vertical Series+ Control Spec"
manufacturer: Ametek
model_family: SX-VS-1216
aliases: []
compatible_with:
  manufacturers:
    - Ametek
  models:
    - SX-VS-1216
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/vertical-series-plus/api-definition-vertical-series.pdf
retrieved_at: 2026-07-10T13:20:51.890Z
last_checked_at: 2026-10-01T11:17:37.499Z
generated_at: 2026-10-01T11:17:37.499Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-232 serial control not documented in source"
  - "SNMP binary command encodings not in source"
  - "base URL not explicitly stated; only host:port shown in examples (e.g. 10.221.7.73:8080, default HTTP port 80 per httpd.port)"
  - "source does not document unsolicited push notifications from device"
  - "SNMP trap payload schema not detailed in source beyond port"
  - "max sequence steps not specified in source"
  - "max triggers per device is 16 per EventSettings.maxEntries"
  - "explicit power-sequencing warnings or electrical safety limits not in source"
  - "serial/RS-232 protocol not documented"
  - "HTTPS default port (443) inferred by convention not in source"
  - "power rating specifications (voltage, current, wattage limits) not in source beyond nominalVoltage / nominalFrequency per-device settings"
  - "fault behavior and error recovery sequences not documented beyond wiringFault boolean"
  - "binary SNMP command encodings not in source"
verification:
  verdict: verified
  checked_at: 2026-10-01T11:17:37.499Z
  matched_actions: 20
  action_count: 20
  confidence: medium
  summary: "All 20 spec actions match source POST/PUT endpoints verbatim; transport values (port 80, mDNS 5353, Basic auth, session tokens) are supported by source. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-23
---

# Ametek SurgeX Vertical Series+ Control Spec

## Summary
Power distribution unit with IP-based REST API control. Managed via HTTP/HTTPS with Basic Authentication and session token support. Controls individual outlets, groups, and sequences. Supports power monitoring, triggers, and event logging. Model SX-VS-1216 identified in source; other Vertical Series+ models may be compatible.

<!-- UNRESOLVED: RS-232 serial control not documented in source -->
<!-- UNRESOLVED: SNMP binary command encodings not in source -->

## Transport
```yaml
protocols:
  - http
  - udp  # mDNS/Bonjour discovery service per source
addressing:
  base_url: ""  # UNRESOLVED: base URL not explicitly stated; only host:port shown in examples (e.g. 10.221.7.73:8080, default HTTP port 80 per httpd.port)
  port: 80  # default HTTP port per httpd.port description in source
  udp_discovery_port: 5353  # source: mDNS runs on port 5353
auth:
  type: basic  # Basic Authentication stated in source
  session_tokens: true  # x-auth-token header supported per source
```

## Traits
```yaml
- powerable      # PowerOn, PowerOff, Reboot commands present
- routable       # Outlet and group routing via sequences
- queryable      # GET endpoints for status, settings, measurements
- levelable      # Power monitoring (voltage, current, energy, PF)
- discoverable   # mDNS / Bonjour on UDP port 5353 per source
```

## Actions
```yaml
- id: power_on_outlet
  label: Power On Outlet
  kind: action
  params:
    - name: outlet_id
      type: string
      description: Outlet identifier (e.g., "/1/1")
  method: POST
  path: /api/v1/{id}/{outlet_id}/PowerOn
  source: POST /api/v1/1/1/PowerOn documented in source

- id: power_off_outlet
  label: Power Off Outlet
  kind: action
  params:
    - name: outlet_id
      type: string
      description: Outlet identifier (e.g., "/1/1")
  method: POST
  path: /api/v1/{id}/{outlet_id}/PowerOff
  source: POST /api/v1/1/1/PowerOff documented in source

- id: reboot_outlet
  label: Reboot Outlet
  kind: action
  params:
    - name: outlet_id
      type: string
      description: Outlet identifier (e.g., "/1/1")
  method: POST
  path: /api/v1/{id}/{outlet_id}/Reboot
  source: POST /api/v1/1/1/Reboot documented in source

- id: enter_shutdown_state
  label: Enter Shutdown State
  kind: action
  params: []
  method: POST
  path: /api/v1/EnterShutdownState
  source: POST /api/v1/EnterShutdownState documented in source

- id: clear_shutdown_state
  label: Clear Shutdown State
  kind: action
  params: []
  method: POST
  path: /api/v1/ClearShutdownState
  source: POST /api/v1/ClearShutdownState documented in source

- id: reset_energy_usage
  label: Reset Energy Usage Counter
  kind: action
  params: []
  method: POST
  path: /api/v1/1/ResetEnergyUsage
  source: POST /api/v1/ResetEnergyUsage documented in source

- id: run_sequence
  label: Run Sequence
  kind: action
  params:
    - name: sequence_id
      type: integer
      description: ID of the sequence to run (passed as array element, e.g. [1])
  method: POST
  path: /api/v1/RunSequence
  source: POST /api/v1/RunSequence documented in source

- id: add_sequence
  label: Add Sequence
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
      description: Array of step objects with method and delay
  method: POST
  path: /api/v1/AddSequence
  source: POST /api/v1/AddSequence documented in source

- id: change_sequence
  label: Change Sequence
  kind: action
  params:
    - name: id
      type: integer
      description: Sequence ID to modify
    - name: name
      type: string
      description: New sequence name
    - name: steps
      type: array
      description: Updated steps array
  method: POST
  path: /api/v1/ChangeSequence
  source: POST /api/v1/ChangeSequence documented in source

- id: remove_sequence
  label: Remove Sequence
  kind: action
  params:
    - name: id
      type: integer
      description: ID of sequence to delete (passed as array element, e.g. [2])
  method: POST
  path: /api/v1/RemoveSequence
  source: POST /api/v1/RemoveSequence documented in source

- id: add_trigger
  label: Add Trigger
  kind: action
  params:
    - name: trigger_config
      type: object
      description: Full trigger configuration object (array of trigger objects with id, enabled, name, type, expressions.on/off, actions[].on/off.cmd, etc.)
  method: POST
  path: /api/v1/AddTrigger
  source: POST /api/v1/AddTrigger documented in source

- id: change_trigger
  label: Change Trigger
  kind: action
  params:
    - name: trigger_config
      type: object
      description: Trigger configuration with UUID id
  method: POST
  path: /api/v1/ChangeTrigger
  source: POST /api/v1/ChangeTrigger documented in source

- id: update_network_settings
  label: Update Network Settings
  kind: action
  params:
    - name: network_config
      type: object
      description: Network settings object (ethInterfaces, httpd)
  method: PUT
  path: /api/v1/networkSettings
  source: PUT /api/v1/networkSettings documented in source

- id: update_device_settings
  label: Update Device Settings
  kind: action
  params:
    - name: device_config
      type: object
      description: Device settings object (verticalseries name/id, autoLogoutTime, startupProcedure, shutdownClearProcedure, dataLogSchema, eventLogSchema, autoPing, temperatureUnits)
  method: PUT
  path: /api/v1/deviceSettings
  source: PUT /api/v1/deviceSettings documented in source

- id: add_user
  label: Add New User
  kind: action
  params:
    - name: username
      type: string
    - name: name
      type: string
    - name: authmode
      type: string
      enum: [internal, ldap]
    - name: admin
      type: string
      enum: [admin, user]
    - name: passwd
      type: string
    - name: privs
      type: array
      items:
        type: string
        enum: [TriggerConfig, DeviceControl, NetworkSettings, SoftwareUpdate, UserAdmin]
  method: POST
  path: /api/v1/UserAdd
  source: POST /api/v1/UserAdd documented in source

- id: change_user
  label: Change User Settings
  kind: action
  params:
    - name: username
      type: string
      description: Username of user to modify (required, not for creation)
    - name: authmode
      type: string
      enum: [internal, ldap]
    - name: admin
      type: string
      enum: [admin, user]
    - name: passwd
      type: string
    - name: privs
      type: array
  method: POST
  path: /api/v1/UserChange
  source: POST /api/v1/UserChange documented in source

- id: delete_user
  label: Delete User
  kind: action
  params:
    - name: username
      type: string
      description: Username to delete (raw value, not key/value JSON)
  method: POST
  path: /api/v1/UserDel
  source: POST /api/v1/UserDel documented in source

- id: upload_file
  label: Upload File
  kind: action
  params:
    - name: filename
      type: string
      enum: [fwupdate.img, verticalseriesPlus.cfg, snmpd.conf, ssl.crt, ssl.key, cert.ca, wpa_supplicant.conf, wpa_cert.ca, wpa_user.crt, wpa_user.prv, wpa_fast.pac]
    - name: file_data
      type: string
      format: binary
  method: POST
  path: /api/v1/UploadFile
  source: POST /api/v1/UploadFile documented in source

- id: query_time_stamped_events
  label: Query Time Stamped Events
  kind: query
  params:
    - name: start_date
      type: string
      description: Earliest date to include
    - name: end_date
      type: string
      description: Latest date to include
  method: POST
  path: /api/v1/TimeStampedEvents
  source: POST /api/v1/TimeStampedEvents documented in source; body syntax [-1,-1,"startDate","endDate"]

- id: query_log_file_info
  label: Query Historical Data File Info
  kind: query
  params:
    - name: log_type
      type: string
      enum: [VerticalSeriesData]
  method: POST
  path: /api/v1/LogFileInfo
  source: POST /api/v1/LogFileInfo documented in source; returns gzipped CSV file listing
```

## Feedbacks
```yaml
- id: current_status
  type: object
  method: GET
  path: /api/v1/currentStatus
  description: Full device status including outlets, measurements, groups
  source: GET /api/v1/currentStatus documented in source

- id: network_settings
  type: object
  method: GET
  path: /api/v1/networkSettings
  description: Network configuration including ethInterfaces, httpd, snmp, ntp, udpDiscovery, 802_1x
  source: GET /api/v1/networkSettings documented in source

- id: device_settings
  type: object
  method: GET
  path: /api/v1/deviceSettings
  description: Device settings including outlets, groups, sequences, startupProcedure, shutdownClearProcedure, autoPing, eventLogSchema, dataLogSchema
  source: GET /api/v1/deviceSettings documented in source

- id: user_settings
  type: array
  method: GET
  path: /api/v1/users
  description: Array of user objects with privileges
  source: GET /api/v1/users documented in source

- id: sequences
  type: array
  method: GET
  path: /api/v1/sequences
  description: Array of sequence objects with steps (method = /*ID*/*OUTLET*/*COMMAND*, delay in seconds)
  source: GET /api/v1/sequences documented in source

- id: event_settings
  type: object
  method: GET
  path: /api/v1/EventSettings
  description: Trigger configurations including numActive, numEntries, maxEntries (default 16), triggers[]
  source: GET /api/v1/EventSettings documented in source

- id: time_stamped_events
  type: array
  method: POST
  path: /api/v1/TimeStampedEvents
  description: Event log entries between specified dates; body syntax [-1,-1,"startDate","endDate"]
  source: POST /api/v1/TimeStampedEvents documented in source

- id: log_file_info
  type: object
  method: POST
  path: /api/v1/LogFileInfo
  description: Historical data file listing (VerticalSeriesData); returns schema, logDuration, folder, files[]
  source: POST /api/v1/LogFileInfo documented in source

- id: who_are_you
  type: object
  method: GET
  path: /api/v1/WhoAreYou
  description: Device identification including model, serial, firmware (semver), manufacturer ("AMETEK ESP/SurgeX"), deviceType, hostname, httpd
  source: GET /api/v1/WhoAreYou documented in source

- id: outlet_state
  type: enum
  values: [0, 1, 2]
  description: "0=off, 1=on, 2=rebooting"
  source: Outlet state field in currentStatus response

- id: outlet_initial_state
  type: enum
  values: [0, 1, 2, 3, 4, 5]
  description: "0=always on, 1=always off, 2=shutdown, 3=on, 4=off, 5=last state"
  source: initialState field in currentStatus response

- id: active_state
  type: enum
  values: [Start Up, Running, Shutdown]
  description: Device operational state
  source: activeState field in currentStatus response

- id: temperature_units
  type: enum
  values: [F, C]
  description: "F=Fahrenheit, C=Celsius"
  source: temperatureUnits field in currentStatus/deviceSettings response

- id: input_state
  type: integer
  description: "Reports abnormalities on input power: 'No Ground', 'Reverse Polarity', 'Wiring Fault'"
  source: inputState field in currentStatus response

- id: line_voltage
  type: number
  description: Line-to-line voltage in volts
  source: line1Line2 field in currentStatus

- id: line_neutral_voltage
  type: number
  description: Line-to-neutral voltage in volts
  source: voltageLN field in currentStatus

- id: frequency
  type: number
  description: Frequency in Hz
  source: frequency field in currentStatus

- id: current
  type: number
  description: AC current in Amps (measured on neutral line)
  source: current field in currentStatus

- id: power
  type: number
  description: Average power in watts
  source: power field in currentStatus

- id: power_factor
  type: number
  description: Power factor (-1 to 1, but 0 to 1 for this device)
  source: pf field in currentStatus

- id: energy_usage
  type: number
  description: Energy usage in watt-hours since last reset
  source: energyUsage field in currentStatus

- id: temperature
  type: number
  description: Temperature in units specified by temperatureUnits
  source: temperature field in currentStatus

- id: outlet_count
  type: integer
  description: Number of switchable outlets
  source: outletCount field in currentStatus

- id: crest_factor_ln
  type: number
  description: Crest factor for line-to-neutral voltage (min 1, no max)
  source: crestFactor / crestFactorLN field in currentStatus

- id: crest_factor_ng
  type: number
  description: Crest factor for neutral-to-ground voltage (typical 1.414)
  source: crestFactorNG field in currentStatus

- id: crest_factor_current
  type: number
  description: Crest factor for AC current measurement (min 1, no max)
  source: crestFactorNI field in currentStatus

- id: voltage_ng
  type: number
  description: Neutral-to-ground voltage in volts
  source: voltageNG field in currentStatus

- id: line2_ground_voltage
  type: number
  description: Line 2 to ground voltage in volts (same as neutral-to-ground)
  source: line2Ground field in currentStatus

- id: voltage_rating
  type: number
  description: Same as nominalVoltage (software setting for expected electrical service)
  source: voltageRating field in currentStatus

- id: nominal_voltage
  type: number
  description: Typical voltage expected at the input
  source: nominalVoltage field in currentStatus

- id: nominal_frequency
  type: number
  description: Expected electrical service frequency
  source: nominalFrequency field in currentStatus

- id: reboot_time
  type: integer
  description: Seconds between off and on during Reboot command
  source: rebootTime field in currentStatus

- id: data_log_interval
  type: integer
  description: Frequency in seconds for min/max/avg data storage
  source: dataLogInterval field in currentStatus

- id: auto_logout_time
  type: integer
  description: Web session inactivity timeout in minutes
  source: autoLogoutTime field in currentStatus/deviceSettings response

- id: active_users
  type: integer
  description: Number of users logged into web server
  source: activeUsers field in currentStatus response

- id: shutdown_requests
  type: integer
  description: Counter of Enter Shutdown State requests received
  source: shutdownRequests field in currentStatus response

- id: mac_address
  type: string
  description: MAC address of eth0 (OUI AC:A6:67 owned by ESP Inc.)
  source: MAC field in currentStatus response

- id: snmp_port
  type: integer
  description: SNMP client port (default 161)
  source: snmp.port field in networkSettings response

- id: snmp_trap_port
  type: integer
  description: SNMP trap listener port (default 162)
  source: snmp.traps[].port field in networkSettings response

- id: trigger_max_entries
  type: integer
  description: Maximum number of trigger configurations (default 16)
  source: triggers.maxEntries field in EventSettings response
```

## Variables
```yaml
- id: auto_logout_time
  type: integer
  description: Web session inactivity timeout in minutes; settable via PUT /api/v1/deviceSettings
  source: autoLogoutTime field in deviceSettings

- id: temperature_units
  type: enum
  values: [F, C]
  description: Reported temperature unit; settable via PUT /api/v1/deviceSettings
  source: temperatureUnits field in deviceSettings

- id: startup_procedure
  type: object
  description: "Power-up behavior: {sequenceId, type: RunSequence|InitialState, delay}"
  source: startupProcedure field in deviceSettings

- id: shutdown_clear_procedure
  type: object
  description: Method for power up after shutdown: {sequenceId, type: InitialState|RunSequence}
  source: shutdownClearProcedure field in deviceSettings

- id: data_log_schema_active
  type: array
  description: Array of data points (from available schema) that will be logged
  source: dataLogSchema.active field in deviceSettings

- id: event_log_schema_active
  type: array
  description: Array of event fields logged: Timestamp, Object, User, Name, Type, AlertLevel, Message
  source: eventLogSchema.active field in deviceSettings

- id: auto_ping
  type: object
  description: "Auto-ping settings: {pingTimeout, pollFrequency} in seconds"
  source: autoPing field in deviceSettings

- id: hostname
  type: string
  description: Device hostname
  source: hostname field in networkSettings

- id: httpd
  type: object
  description: "Web server config: {enabled, ssl, port, status}"
  source: httpd field in networkSettings

- id: eth_interfaces
  type: array
  description: "Array of ethernet interface configs: {ifname, mac, addr, mask, gw, dns[], dhcp}"
  source: ethInterfaces field in networkSettings

- id: ntp_settings
  type: object
  description: "NTP client config: {enabled, frequency, server, tz{name,dst}}"
  source: ntp field in networkSettings

- id: snmp_settings
  type: object
  description: "SNMPv3 config: {enabled, communities[], v3[], traps[], port, sendAuthTraps, manualControl, systemTriggers}"
  source: snmp field in networkSettings

- id: udp_discovery
  type: object
  description: "mDNS/Bonjour discovery config: {enabled, status}; port 5353"
  source: udpDiscovery field in networkSettings

- id: dot1x
  type: object
  description: "802.1X authentication config: {enabled, ifname, wpa_supplicant{...}}"
  source: 802_1x field in networkSettings
```

## Events
```yaml
- id: device_control_event
  description: Outlet power on/off/reboot actions logged via TimeStampedEvents
  type: DeviceControl
  source: type=DeviceControl entries in TimeStampedEvents response

- id: system_event
  description: System events: login, logout, NTP sync, sequence run
  type: System
  source: type=System entries in TimeStampedEvents response

- id: trigger_on_event
  description: Trigger fired (entered 'on' state)
  type: "Trigger (On)"
  source: type="Trigger (On)" entries in TimeStampedEvents response

# UNRESOLVED: source does not document unsolicited push notifications from device
# UNRESOLVED: SNMP trap payload schema not detailed in source beyond port
```

## Macros
```yaml
- id: start_up_sequence
  description: Example default sequence from source (id=0, "Start Up Sequence"); runs "/1/X/PowerOn" with staggered delays
  steps:
    - method: /1/1/PowerOn
      delay: 0
    - method: /1/2/PowerOn
      delay: 5
    - method: /1/3/PowerOn
      delay: 10
    - method: /1/4/PowerOn
      delay: 15
  source: Example sequence in source under Sequences request

- id: power_off_sensitive
  description: Example sequence from source (id=1, "Power off sensitive")
  steps:
    - method: /1/2/PowerOff
      delay: 5
    - method: /1/4/PowerOff
      delay: 10
  source: Example sequence in source under Sequences request
# UNRESOLVED: max sequence steps not specified in source
# UNRESOLVED: max triggers per device is 16 per EventSettings.maxEntries
```

## Safety
```yaml
confirmation_required_for:
  - EnterShutdownState  # source: requires Admin privileges; blocks manual outlet on
interlocks:
  - ShutdownState: when device is in shutdown state, outlets cannot be turned on by manual control until ClearShutdownState is issued
# UNRESOLVED: explicit power-sequencing warnings or electrical safety limits not in source
```

## Notes
HTTP by default; HTTPS supported via `ssl: true` in httpd settings. Default HTTP port 80 per httpd.port; examples use port 8080 when customized. All responses JSON with `objType` key. Protocol version v1 in URI; future breaking changes will increment the version. Web session timeout managed via `autoLogoutTime`. mDNS (port 5353, UDP) for discovery — recommended to leave enabled when DHCP is on so device IP can be found without USB / factory reset. SNMPv3 supported with MD5 or DES auth; default trap port 162, default client port 161. 802.1X supported via wpa_supplicant (EAP methods: MD5, PEAP, etc.). File upload supports firmware images, config backups, certificates, and WPA supplicant files. `objType` keys in responses: currentStatus, networkSettings, deviceSettings, eventSettings, timeStampedEvents, whoAreYou, sequences (array). Trigger `cmd` options: `/ClearShutdownState`, `/EnterShutdownState`, `/RunSequence`, `/1/X/PowerOn`, `/1/X/PowerOff`, `/1/X/Reboot`, `/1/X/None`. Sequence step `method` syntax: `/*ID*/*OUTLET*/*COMMAND*` where ID=1 for Vertical Series+. Energy usage reset endpoint per source: `POST /api/v1/ResetEnergyUsage` (documented path) vs `POST /api/v1/1/ResetEnergyUsage` (path pattern used elsewhere) — source shows the bare form in the example.
<!-- UNRESOLVED: serial/RS-232 protocol not documented -->
<!-- UNRESOLVED: HTTPS default port (443) inferred by convention not in source -->
<!-- UNRESOLVED: power rating specifications (voltage, current, wattage limits) not in source beyond nominalVoltage / nominalFrequency per-device settings -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented beyond wiringFault boolean -->
<!-- UNRESOLVED: binary SNMP command encodings not in source -->

## Provenance

```yaml
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/vertical-series-plus/api-definition-vertical-series.pdf
retrieved_at: 2026-07-10T13:20:51.890Z
last_checked_at: 2026-10-01T11:17:37.499Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-01T11:17:37.499Z
matched_actions: 20
action_count: 20
confidence: medium
summary: "All 20 spec actions match source POST/PUT endpoints verbatim; transport values (port 80, mDNS 5353, Basic auth, session tokens) are supported by source. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-232 serial control not documented in source"
- "SNMP binary command encodings not in source"
- "base URL not explicitly stated; only host:port shown in examples (e.g. 10.221.7.73:8080, default HTTP port 80 per httpd.port)"
- "source does not document unsolicited push notifications from device"
- "SNMP trap payload schema not detailed in source beyond port"
- "max sequence steps not specified in source"
- "max triggers per device is 16 per EventSettings.maxEntries"
- "explicit power-sequencing warnings or electrical safety limits not in source"
- "serial/RS-232 protocol not documented"
- "HTTPS default port (443) inferred by convention not in source"
- "power rating specifications (voltage, current, wattage limits) not in source beyond nominalVoltage / nominalFrequency per-device settings"
- "fault behavior and error recovery sequences not documented beyond wiringFault boolean"
- "binary SNMP command encodings not in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
