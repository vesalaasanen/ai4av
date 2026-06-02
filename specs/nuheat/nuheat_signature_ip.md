---
spec_id: admin/nuheat-signature
schema_version: ai4av-public-spec-v1
revision: 1
title: "Nuheat Signature Control Spec"
manufacturer: Nuheat
model_family: "Nuheat Signature"
aliases: []
compatible_with:
  manufacturers:
    - Nuheat
  models:
    - "Nuheat Signature"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - api.mynuheat.com
source_urls:
  - https://api.mynuheat.com/swagger
retrieved_at: 2026-05-28T08:59:20.919Z
last_checked_at: 2026-05-31T06:54:51.127Z
generated_at: 2026-05-31T06:54:51.127Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no schema details (field names, types, enums) provided in source — only endpoint paths and brief descriptions"
  - "thermostat model fields (current temp, min/max setpoint range, operating modes) not documented"
  - "error codes / HTTP status codes not documented"
  - "rate limits not documented"
  - "cannot confirm traits without schema/enum details"
  - "date format not specified"
  - "year format not specified"
  - "request body schema (GroupUpdateModel) not documented"
  - "request body schema (ScheduleModel) not documented"
  - "request body schema (ThermostatUpdateModel) fields not documented"
  - "eOperatingMode and eScheduleMode enum values not fully documented (Auto=1 noted)"
  - "response schemas (ThermostatModel, GroupModel, ScheduleModel, etc.)"
  - "settable parameters (SetPointTemp, Name, ScheduleMode, awayMode)"
  - "no webhook or push notification system described in source"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "Authorize endpoint referenced (\"see Authorize endpoint\") but not documented"
  - "no schema field definitions — spec cannot detail request/response bodies"
  - "date/year parameter formats unknown"
  - "eOperatingMode enum values (only Auto=1 known)"
verification:
  verdict: verified
  checked_at: 2026-05-31T06:54:51.127Z
  matched_actions: 13
  action_count: 13
  confidence: medium
  summary: "All 13 spec actions matched literally to source endpoints; transport verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-28
---

# Nuheat Signature Control Spec

## Summary
Nuheat Signature is a WiFi-connected floor heating thermostat controlled via a cloud REST API at `api.mynuheat.com`. The API supports thermostat setpoint and mode changes, schedule management, group/away-mode control, energy logging, and account queries. Authentication is API-key/token based.

<!-- UNRESOLVED: no schema details (field names, types, enums) provided in source — only endpoint paths and brief descriptions -->
<!-- UNRESOLVED: thermostat model fields (current temp, min/max setpoint range, operating modes) not documented -->
<!-- UNRESOLVED: error codes / HTTP status codes not documented -->
<!-- UNRESOLVED: rate limits not documented -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://api.mynuheat.com
auth:
  type: token  # source: "Auth: API key / token (see Authorize endpoint)"
```

## Traits
```yaml
# UNRESOLVED: cannot confirm traits without schema/enum details
# Likely: levelable (setpoint temp), queryable (thermostat state, energy logs)
```

## Actions
```yaml
# Account
- id: get_account
  label: Get Account
  kind: query
  method: GET
  path: /api/v1/Account
  description: Get the AccountModel
  params: []

# Energy Log
- id: get_energy_log_day
  label: Get Energy Log (Day)
  kind: query
  method: GET
  path: /api/v1/EnergyLog/Day/{serialNumber}/{date}
  description: Get energy usage data for a specific day
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number
    - name: date
      type: string
      description: Date to query
      # UNRESOLVED: date format not specified

- id: get_energy_log_week
  label: Get Energy Log (Week)
  kind: query
  method: GET
  path: /api/v1/EnergyLog/Week/{serialNumber}/{date}
  description: Get energy usage data for a specific week
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number
    - name: date
      type: string
      description: Date within the target week
      # UNRESOLVED: date format not specified

- id: get_energy_log_month
  label: Get Energy Log (Month)
  kind: query
  method: GET
  path: /api/v1/EnergyLog/Month/{serialNumber}/{year}
  description: Get energy usage data for a specific month
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number
    - name: year
      type: string
      description: Year to query
      # UNRESOLVED: year format not specified

# Group
- id: get_groups
  label: Get Groups
  kind: query
  method: GET
  path: /api/v1/Group
  description: Get the list of GroupModel
  params: []

- id: update_group
  label: Update Group
  kind: action
  method: PUT
  path: /api/v1/Group
  description: Update groupModel awayMode
  params: []
  # UNRESOLVED: request body schema (GroupUpdateModel) not documented

- id: get_group
  label: Get Group
  kind: query
  method: GET
  path: /api/v1/Group/{groupId}
  description: Get a specific GroupModel
  params:
    - name: groupId
      type: string
      description: Group identifier

# Schedule
- id: get_schedules
  label: Get Schedules
  kind: query
  method: GET
  path: /api/v1/Schedule
  description: Get the list of ScheduleModel
  params: []

- id: update_schedule
  label: Update Schedule
  kind: action
  method: PUT
  path: /api/v1/Schedule
  description: Updates the schedule data
  params: []
  # UNRESOLVED: request body schema (ScheduleModel) not documented

- id: get_schedule
  label: Get Schedule
  kind: query
  method: GET
  path: /api/v1/Schedule/{serialNumber}
  description: Get the ScheduleModel for a specific thermostat
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number

# Thermostat
- id: get_thermostats
  label: Get Thermostats
  kind: query
  method: GET
  path: /api/v1/Thermostat
  description: Get the list of ThermostatModel
  params: []

- id: update_thermostat
  label: Update Thermostat
  kind: action
  method: PUT
  path: /api/v1/Thermostat
  description: >-
    Updates thermostat Model. SetPointTemp and Name fields are optional.
    If ScheduleMode is set to Auto (1), SetPointTemp will not be updated.
  params: []
  # UNRESOLVED: request body schema (ThermostatUpdateModel) fields not documented
  # UNRESOLVED: eOperatingMode and eScheduleMode enum values not fully documented (Auto=1 noted)

- id: get_thermostat
  label: Get Thermostat
  kind: query
  method: GET
  path: /api/v1/Thermostat/{serialNumber}
  description: Get the ThermostatModel for a specific thermostat
  params:
    - name: serialNumber
      type: string
      description: Thermostat serial number
```

## Feedbacks
```yaml
# UNRESOLVED: response schemas (ThermostatModel, GroupModel, ScheduleModel, etc.)
# not documented in source - cannot enumerate feedback fields
```

## Variables
```yaml
# UNRESOLVED: settable parameters (SetPointTemp, Name, ScheduleMode, awayMode)
# mentioned in descriptions but types/ranges not documented
```

## Events
```yaml
# UNRESOLVED: no webhook or push notification system described in source
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- API version 1.0 per OAS3 document title.
- ScheduleMode Auto (1) prevents SetPointTemp updates — thermostat follows its schedule.
- Source lists schema names (AccountModel, ThermostatModel, GroupUpdateModel, ThermostatUpdateModel, eOperatingMode, eScheduleMode, eScheduleType, ScheduleDayEventModel, ScheduleDayModel, EnergyUsageEntryModel, EnergyUsageModel) but provides no field definitions.
<!-- UNRESOLVED: Authorize endpoint referenced ("see Authorize endpoint") but not documented -->
<!-- UNRESOLVED: no schema field definitions — spec cannot detail request/response bodies -->
<!-- UNRESOLVED: date/year parameter formats unknown -->
<!-- UNRESOLVED: eOperatingMode enum values (only Auto=1 known) -->

## Provenance

```yaml
source_domains:
  - api.mynuheat.com
source_urls:
  - https://api.mynuheat.com/swagger
retrieved_at: 2026-05-28T08:59:20.919Z
last_checked_at: 2026-05-31T06:54:51.127Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T06:54:51.127Z
matched_actions: 13
action_count: 13
confidence: medium
summary: "All 13 spec actions matched literally to source endpoints; transport verified; complete bidirectional coverage. (20 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no schema details (field names, types, enums) provided in source — only endpoint paths and brief descriptions"
- "thermostat model fields (current temp, min/max setpoint range, operating modes) not documented"
- "error codes / HTTP status codes not documented"
- "rate limits not documented"
- "cannot confirm traits without schema/enum details"
- "date format not specified"
- "year format not specified"
- "request body schema (GroupUpdateModel) not documented"
- "request body schema (ScheduleModel) not documented"
- "request body schema (ThermostatUpdateModel) fields not documented"
- "eOperatingMode and eScheduleMode enum values not fully documented (Auto=1 noted)"
- "response schemas (ThermostatModel, GroupModel, ScheduleModel, etc.)"
- "settable parameters (SetPointTemp, Name, ScheduleMode, awayMode)"
- "no webhook or push notification system described in source"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "Authorize endpoint referenced (\"see Authorize endpoint\") but not documented"
- "no schema field definitions — spec cannot detail request/response bodies"
- "date/year parameter formats unknown"
- "eOperatingMode enum values (only Auto=1 known)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
