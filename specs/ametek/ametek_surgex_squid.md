---
spec_id: admin/ametek-surgex-squid
schema_version: ai4av-public-spec-v1
revision: 1
title: "AMETEK SurgeX Squid Control Spec"
manufacturer: AMETEK
model_family: SX-SQUID
aliases: []
compatible_with:
  manufacturers:
    - AMETEK
    - "AMETEK ESP/SurgeX"
  models:
    - SX-SQUID
    - SX-DC-8-1224
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/squid/api-definition-squid-rev-b.pdf
retrieved_at: 2026-07-22T00:08:09.322Z
last_checked_at: 2026-07-22T00:56:38.356Z
generated_at: 2026-07-22T00:56:38.356Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "voltage/current ratings, fault/recovery sequences, and firmware compatibility range not stated in source"
  - "no explicit electrical safety warnings (voltage/current limits, fault recovery) in source"
  - "no electrical ratings (nominal current per outlet, max load, derating), no firmware version compatibility range, no fault behavior or recovery sequences documented in source"
verification:
  verdict: verified
  checked_at: 2026-07-22T00:56:38.356Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions map one-to-one to the source documented endpoint sections plus the None cmd variant; transport port/auth/base_url all literal in source. (3 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-07-22
---

# AMETEK SurgeX Squid Control Spec

## Summary
The SurgeX Squid is a network-attached power controller with switchable AC and DC outlets, providing remote power on/off/reboot, per-outlet state and electrical measurements, programmable sequences, triggers, and event logging. Control is exposed via a JSON REST API over HTTP or HTTPS, with Basic Authentication or x-auth-token session auth required for all features.

<!-- UNRESOLVED: voltage/current ratings, fault/recovery sequences, and firmware compatibility range not stated in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: /api/v1
  port: 8080  # default per source; "Default is port 80, but this can be changed"
auth:
  type: basic
  notes: "Basic Authentication supported; x-auth-token header for web session tokens; authentication required for all API features"
```

## Traits
```yaml
- powerable    # inferred from power on/off/reboot commands
- routable     # inferred from outlet and outlet-group control
- queryable    # inferred from currentStatus / deviceSettings / networkSettings queries
```

## Actions
```yaml
- id: get_current_status
  label: Get Current Status
  kind: query
  command: "GET /api/v1/currentStatus"
  params: []

- id: get_network_settings
  label: Get Network Settings
  kind: query
  command: "GET /api/v1/networkSettings"
  params: []

- id: change_network_settings
  label: Change Network Settings
  kind: action
  command: "PUT /api/v1/networkSettings"
  params: []

- id: get_device_settings
  label: Get Device Settings
  kind: query
  command: "GET /api/v1/deviceSettings"
  params: []

- id: change_device_settings
  label: Change Device Settings
  kind: action
  command: "PUT /api/v1/deviceSettings"
  params: []

- id: get_users
  label: Get Users
  kind: query
  command: "GET /api/v1/users"
  params: []

- id: change_user
  label: Change User Settings
  kind: action
  command: "POST /api/v1/UserChange"
  params: []

- id: add_user
  label: Add New User
  kind: action
  command: "POST /api/v1/UserAdd"
  params: []

- id: delete_user
  label: Delete User
  kind: action
  command: "POST /api/v1/UserDel"
  params:
    - name: username
      type: string

- id: get_sequences
  label: Get Sequences
  kind: query
  command: "GET /api/v1/sequences"
  params: []

- id: add_sequence
  label: Add Sequence
  kind: action
  command: "POST /api/v1/AddSequence"
  params: []

- id: change_sequence
  label: Change Sequence
  kind: action
  command: "POST /api/v1/ChangeSequence"
  params: []

- id: remove_sequence
  label: Remove Sequence
  kind: action
  command: "POST /api/v1/RemoveSequence"
  params:
    - name: id
      type: integer

- id: run_sequence
  label: Run Sequence
  kind: action
  command: "POST /api/v1/RunSequence"
  params:
    - name: id
      type: integer

- id: get_event_settings
  label: Get Event Settings / Triggers
  kind: query
  command: "GET /api/v1/EventSettings"
  params: []

- id: add_trigger
  label: Add Trigger
  kind: action
  command: "POST /api/v1/AddTrigger"
  params: []

- id: change_trigger
  label: Change Trigger
  kind: action
  command: "POST /api/v1/ChangeTrigger"
  params: []

- id: get_time_stamped_events
  label: Get Time Stamped Events
  kind: action
  command: "POST /api/v1/TimeStampedEvents"
  params:
    - name: range
      type: string
      description: 'Syntax: [-1,-1,"startDate","endDate"]'

- id: get_log_file_info
  label: Historical Data Info
  kind: query
  command: "POST /api/v1/logFileInfo"
  params:
    - name: logName
      type: string
      description: 'e.g. "SquidData"'

- id: upload_file
  label: File Upload
  kind: action
  command: "POST /api/v1/UploadFile"
  params:
    - name: fileType
      type: string
      description: 'fwupdate.img | squid.cfg | snmpd.conf | ssl.crt | ssl.key | cert.ca | wpa_supplicant.conf | wpa_cert.ca | wpa_user.crt | wpa_user.prv | wpa_fast.pac'

- id: who_are_you
  label: Who Are You (device info)
  kind: query
  command: "GET /api/v1/WhoAreYou"
  params: []

- id: power_on_outlet
  label: Power On Outlet
  kind: action
  command: "POST /api/v1/{deviceId}/{outletId}/PowerOn"
  params:
    - name: deviceId
      type: integer
      description: 'Always 1 for Squid'
    - name: outletId
      type: integer
      description: Outlet or group id

- id: power_off_outlet
  label: Power Off Outlet
  kind: action
  command: "POST /api/v1/{deviceId}/{outletId}/PowerOff"
  params:
    - name: deviceId
      type: integer
    - name: outletId
      type: integer

- id: reboot_outlet
  label: Reboot Outlet
  kind: action
  command: "POST /api/v1/{deviceId}/{outletId}/Reboot"
  params:
    - name: deviceId
      type: integer
    - name: outletId
      type: integer

- id: outlet_none
  label: Outlet / None (clear action)
  kind: action
  command: "POST /api/v1/{deviceId}/{outletId}/None"
  params:
    - name: deviceId
      type: integer
    - name: outletId
      type: integer

- id: enter_shutdown_state
  label: Enter Shutdown State
  kind: action
  command: "POST /api/v1/EnterShutdownState"
  params: []

- id: clear_shutdown_state
  label: Clear Shutdown State
  kind: action
  command: "POST /api/v1/ClearShutdownState"
  params: []

- id: reset_energy_usage
  label: Reset Energy Usage
  kind: action
  command: "POST /api/v1/1/ResetEnergyUsage"
  params: []
```

## Feedbacks
```yaml
- id: active_state
  type: enum
  values: [start_up, running, shutdown]

- id: outlet_state
  type: enum
  values: [off, on, rebooting]
  # state field: 0=off, 1=on, 2=rebooting

- id: initial_state
  type: enum
  values: [always_on, always_off, shutdown, on, off, last_state]
  # initialState: 0=always on, 1=always off, 2=shutdown, 3=on, 4=off, 5=last state

- id: line_voltage_l1_l2
  type: float
  description: Line 1 to Line 2 voltage (V)

- id: temperature
  type: float
  description: Internal temperature (F or C per temperatureUnits)

- id: frequency
  type: float
  description: Frequency (Hz)

- id: current
  type: float
  description: Total AC current (A), measured on AC side

- id: power_factor
  type: float
  description: Power factor, expected 0..1

- id: surge_good
  type: boolean
  description: Surge protection fuse intact

- id: energy_usage
  type: integer
  description: Energy usage since last reset (Wh)

- id: voltage_neutral_to_ground
  type: float
  description: Neutral to ground voltage (V)

- id: voltage_l_to_n
  type: float
  description: Line to neutral voltage (V)

- id: input_state
  type: enum
  values: [no_ground, reverse_polarity, wiring_fault, normal]
  # array - multiple flags possible

- id: power_avg
  type: float
  description: Average power (W)

- id: crest_factor_ln
  type: float
  description: Line-to-neutral voltage crest factor

- id: crest_factor_ng
  type: float
  description: Neutral-to-ground voltage crest factor

- id: crest_factor_current
  type: float
  description: AC current crest factor

- id: nominal_voltage
  type: integer
  description: Software-configured expected service voltage

- id: nominal_frequency
  type: integer
  description: Software-configured expected service frequency

- id: gpio_status
  type: object
  description: GPIO feedback keys (DCBank1Feedback, DCBank2Feedback, 5VBankFeedback, SurgeGoodFeedback) - values 0/1

- id: outlet_state_per_outlet
  type: integer
  description: Per-outlet state via prop /1/{outletId}/OutletState

- id: sequence_running
  type: boolean
  description: Sequence currently executing

- id: sequence_current_step
  type: integer
  description: Index of current step when running
```

## Variables
```yaml
- name: temperatureUnits
  type: enum
  values: [F, C]

- name: autoLogoutTime
  type: integer
  description: Web session timeout in minutes

- name: dataLogInterval
  type: integer
  description: Frequency (seconds) for storing min/max/avg electrical data

- name: rebootTime
  type: integer
  description: Per-outlet off-then-on delay during reboot (seconds)

- name: outletName
  type: string
  description: User-configurable outlet name

- name: outletInitialState
  type: integer
  description: Per-outlet startup state (0..5)

- name: startupProcedure
  type: object
  description: '{"type":"RunSequence"|"InitialState", "sequenceId":int, "delay":int}'

- name: shutdownClearProcedure
  type: object
  description: '{"type":"RunSequence"|"InitialState", "sequenceId":int}'

- name: httpdPort
  type: integer
  description: HTTP/HTTPS server port (default 80, common 8080)

- name: httpdSSL
  type: boolean

- name: httpdEnabled
  type: boolean

- name: remoteShellPort
  type: integer
  description: Default 23

- name: remoteShellSSL
  type: boolean

- name: dhcp
  type: boolean

- name: staticAddr
  type: string

- name: staticMask
  type: string

- name: staticGateway
  type: string

- name: staticDNS
  type: array

- name: ntpServer
  type: string

- name: ntpEnabled
  type: boolean

- name: ntpFrequency
  type: integer

- name: timezone
  type: string

- name: mDNSEnabled
  type: boolean

- name: snmpEnabled
  type: boolean

- name: snmpPort
  type: integer
  description: Default 161

- name: snmpCommunity
  type: object
  description: '{"name":str, "address":str, "priv":"ro"|"rw"}'

- name: snmpV3User
  type: object
  description: '{"name":str, "passphrase":str, "priv":"ro"|"rw", "auth":"MD5"|"DES"}'

- name: snmpTrap
  type: object
  description: '{"host":str, "name":str, "port":int}'

- name: ieee8021xEnabled
  type: boolean

- name: dataLogSchema
  type: array
  description: Active list of logged data point names from documented set

- name: eventLogSchema
  type: array
  description: Active list of event log column names

- name: maxEntries
  type: integer
  description: Event log max entries (32)
```

## Events
```yaml
- id: outlet_control
  type: control_event
  fields: [time, name, type, alertLevel, user]
  description: Outlet power on/off/reboot success events

- id: trigger_on
  type: trigger_event
  description: Trigger transitioned to active state (alertLevel 2)

- id: trigger_clear
  type: trigger_event
  description: Trigger transitioned to off/clear state (alertLevel 1)

- id: user_login
  type: system_event
  fields: [time, name, user]

- id: user_logout
  type: system_event
  fields: [time, name, user]

- id: user_invalid_login
  type: system_event
  fields: [time, name, user]
```

## Macros
```yaml
- id: power_on_outlet
  command: "POST /api/v1/{deviceId}/{outletId}/PowerOn"

- id: power_off_outlet
  command: "POST /api/v1/{deviceId}/{outletId}/PowerOff"

- id: reboot_outlet
  command: "POST /api/v1/{deviceId}/{outletId}/Reboot"
  # per source: outlet state transitions 1->0, waits rebootTime seconds, returns to 1

- id: run_sequence
  command: "POST /api/v1/RunSequence"
  params:
    - name: id
      type: integer
  # executes pre-defined multi-step sequence with per-step delays
```

## Safety
```yaml
confirmation_required_for:
  - power_off_outlet
  - reboot_outlet
  - enter_shutdown_state
  # source notes EnterShutdownState blocks manual outlet power-on until cleared; requires Admin
interlocks:
  - shutdown_state_blocks_manual_on  # EnterShutdownState prevents outlets from turning on via manual control until cleared
# UNRESOLVED: no explicit electrical safety warnings (voltage/current limits, fault recovery) in source
```

## Notes
- Protocol version is built into the URI (`/api/v1/...`); v1 is the only version currently documented. Multiple protocol versions may be available simultaneously.
- All endpoints under `/api/v1` require authentication (Basic or x-auth-token session header).
- mDNS (Bonjour) runs on UDP port 5353 for dynamic discovery; can be disabled.
- Default HTTP port is 80 per docs, but the running example uses 8080 — port is configurable.
- Remote shell (Telnet-like) runs on TCP port 23, optional SSL.
- Outlet control URIs follow `/{deviceId}/{outletId}/PowerOn|PowerOff|Reboot|None` where `deviceId=1` for Squid and `outletId` may be an outlet or group id.
- `initialState` semantics differ from `state`: initialState 5 = "last state", state 1 = "on" — these are independent enums.
- Per-outlet `rebootTime` is the off-to-on delay during reboot cycles.
- Trigger cmd strings include `/ClearShutdownState`, `/EnterShutdownState`, `/RunSequence`, `/1/X/PowerOn`, `/1/X/PowerOff`, `/1/X/Reboot`, `/1/X/None`.
- File upload accepts: fwupdate.img, squid.cfg, snmpd.conf, ssl.crt, ssl.key, cert.ca, wpa_supplicant.conf, wpa_cert.ca, wpa_user.crt, wpa_user.prv, wpa_fast.pac.
- Historical data files live under `/log/squiddata/` as `.gz` archives containing CSV columns per `dataLogSchema`.

<!-- UNRESOLVED: no electrical ratings (nominal current per outlet, max load, derating), no firmware version compatibility range, no fault behavior or recovery sequences documented in source -->

## Provenance

```yaml
source_domains:
  - ametekesp.com
source_urls:
  - https://www.ametekesp.com/-/media/ametekesp/downloads/manuals/squid/api-definition-squid-rev-b.pdf
retrieved_at: 2026-07-22T00:08:09.322Z
last_checked_at: 2026-07-22T00:56:38.356Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-22T00:56:38.356Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions map one-to-one to the source documented endpoint sections plus the None cmd variant; transport port/auth/base_url all literal in source. (3 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "voltage/current ratings, fault/recovery sequences, and firmware compatibility range not stated in source"
- "no explicit electrical safety warnings (voltage/current limits, fault recovery) in source"
- "no electrical ratings (nominal current per outlet, max load, derating), no firmware version compatibility range, no fault behavior or recovery sequences documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
