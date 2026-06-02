---
spec_id: admin/radio-thermostat-ct80
schema_version: ai4av-public-spec-v1
revision: 1
title: "Radio Thermostat CT80 Control Spec"
manufacturer: "Radio Thermostat"
model_family: "CT80 Rev A v2.18"
aliases: []
compatible_with:
  manufacturers:
    - "Radio Thermostat"
  models:
    - "CT80 Rev A v2.18"
    - "CT80 Rev B v1.00"
    - "CT-30e v1.75"
    - "3M50 Note v1.09"
  firmware: 1.04.82+
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - github.com
source_urls:
  - https://github.com/brannondorsey/radio-thermostat/raw/master/RTCOAWiFIAPIV1_3.pdf
  - https://github.com/brannondorsey/radio-thermostat
retrieved_at: 2026-05-27T14:58:32.836Z
last_checked_at: 2026-05-31T07:05:35.657Z
generated_at: 2026-05-31T07:05:35.657Z
firmware_coverage: 1.04.82+
protocol_coverage: []
known_gaps:
  - "specific TCP port number not stated; device uses DHCP for IP assignment"
  - "no unsolicited notifications documented; device only responds to HTTP requests"
  - "no explicit multi-step macros documented"
  - "TCP port number not stated in source — device uses DHCP for IP assignment"
  - "unsolicited event notifications not documented — polling model only"
  - "binary protocol encodings not applicable — JSON over HTTP"
verification:
  verdict: verified
  checked_at: 2026-05-31T07:05:35.657Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match source endpoints exactly; transport parameters verified; comprehensive HTTP REST API coverage confirmed. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-27
---

# Radio Thermostat CT80 Control Spec

## Summary
Wi-Fi thermostat with HTTP REST API. Device operates as HTTP server; clients poll GET /tstat for state and POST JSON to update operating mode, temperature setpoints, fan settings, and auxiliary parameters. No authentication required.

<!-- UNRESOLVED: specific TCP port number not stated; device uses DHCP for IP assignment -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{ip_address}/tstat
auth:
  type: none
```

## Traits
```yaml
- powerable
- queryable
- levelable
```

## Actions
```yaml
- id: get_tstat
  label: Get Thermostat State
  kind: query
  params: []

- id: set_tstat
  label: Update Thermostat State
  kind: action
  params:
    - name: tmode
      type: integer
      description: Operating mode (0=OFF, 1=HEAT, 2=COOL, 3=AUTO)
    - name: t_heat
      type: float
      description: Heat setpoint in degrees F (temporary target)
    - name: t_cool
      type: float
      description: Cool setpoint in degrees F (temporary target)
    - name: fmode
      type: integer
      description: Fan mode (0=AUTO, 1=AUTO/CIRCULATE, 2=ON)
    - name: hold
      type: integer
      description: Hold status (0=disabled, 1=enabled)
    - name: override
      type: integer
      description: Temporary override (0=disabled)
    - name: a_mode
      type: integer
      description: Absolute target mode (0=disable, 1=enable)

- id: set_tmode
  label: Set Thermostat Operating Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=OFF, 1=HEAT, 2=COOL, 3=AUTO"

- id: set_fmode
  label: Set Fan Operating Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=AUTO, 1=AUTO/CIRCULATE, 2=ON"

- id: set_hold
  label: Set Hold Status
  kind: action
  params:
    - name: state
      type: integer
      description: "0=disabled, 1=enabled"

- id: set_t_heat
  label: Set Heat Setpoint (Temporary)
  kind: action
  params:
    - name: temperature
      type: float
      description: Target temperature in degrees F

- id: set_t_cool
  label: Set Cool Setpoint (Temporary)
  kind: action
  params:
    - name: temperature
      type: float
      description: Target temperature in degrees F

- id: set_it_heat
  label: Set IT Heat Setpoint
  kind: action
  params:
    - name: temperature
      type: float
      description: Heat setpoint that does not auto-switch mode

- id: set_it_cool
  label: Set IT Cool Setpoint
  kind: action
  params:
    - name: temperature
      type: float
      description: Cool setpoint that does not auto-switch mode

- id: set_a_heat
  label: Set Absolute Heat Setpoint
  kind: action
  params:
    - name: temperature
      type: float
      description: Absolute heat target in degrees F

- id: set_a_cool
  label: Set Absolute Cool Setpoint
  kind: action
  params:
    - name: temperature
      type: float
      description: Absolute cool target in degrees F

- id: set_a_mode
  label: Set Absolute Target Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disable, 1=enable"

- id: set_program_mode
  label: Set Program Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=Program A, 1=Program B, 2=Vacation, 3=Holiday"

- id: set_time
  label: Set Thermostat Time
  kind: action
  params:
    - name: day
      type: integer
      description: Day of week (0=Monday, 6=Sunday)
    - name: hour
      type: integer
      description: Hours since midnight (0-23)
    - name: minutes
      type: integer
      description: Minutes since start of hour (0-59)

- id: get_program_day
  label: Get Program for Day
  kind: query
  params:
    - name: mode
      type: string
      description: "heat or cool"
    - name: day
      type: string
      description: "mon, tue, wed, thu, fri, sat, sun"

- id: get_program_week
  label: Get Week Program
  kind: query
  params:
    - name: mode
      type: string
      description: "heat or cool"

- id: set_program_day
  label: Set Program for Day
  kind: action
  params:
    - name: mode
      type: string
      description: "heat or cool"
    - name: day
      type: string
      description: "mon, tue, wed, thu, fri, sat, sun"
    - name: schedule
      type: object
      description: JSON array of [minutes, temperature] pairs

- id: get_model
  label: Get Thermostat Model
  kind: query
  params: []

- id: set_energy_led
  label: Set Energy LED
  kind: action
  params:
    - name: state
      type: integer
      description: "0=Off, 1=Green, 2=Yellow, 4=Red"

- id: write_uma
  label: Write User Messaging Area
  kind: action
  params:
    - name: line
      type: integer
      description: "0 or 1"
    - name: message
      type: string
      description: Message string to display

- id: write_pma
  label: Write Price Messaging Area
  kind: action
  params:
    - name: line
      type: integer
      description: "0, 1, 2, or 3"
    - name: message
      type: string
      description: Numeric string to display
    - name: mode
      type: integer
      description: "0=Disable, 2=Enable"

- id: set_remote_temp
  label: Set Remote Temperature
  kind: action
  params:
    - name: temp
      type: integer
      description: Temperature value in degrees F (auto-enables remote mode)

- id: disable_remote_temp
  label: Disable Remote Temperature Mode
  kind: action
  params: []

- id: set_lock_mode
  label: Set Lock Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disabled, 1=partial, 2=full, 3=utility"

- id: set_simple_mode
  label: Set Simple Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "1=normal, 2=simple"

- id: set_save_energy
  label: Set Save Energy Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=disable, 1=enable"
    - name: type
      type: integer
      description: "1=Adjust target by delta, 2=Least consuming, 3=Absolute setpoint"
    - name: delta
      type: float
      description: Temperature delta (1-9 degrees F, 0.5 increments)

- id: set_temp_swing
  label: Set Temperature Swing
  kind: action
  params:
    - name: value
      type: float
      description: Swing range 0.5 to 3.0 degrees F (0.5 increments)

- id: set_night_light
  label: Set Night Light Intensity
  kind: action
  params:
    - name: intensity
      type: integer
      description: "0=off, 1=25%, 2=50%, 3=75%, 4=100%"

- id: set_cool_diff
  label: Set Cool Temperature Differential
  kind: action
  params:
    - name: diff
      type: float
      description: Differential 2.0 to 6.0 degrees F (1.0 increments)

- id: set_heat_diff
  label: Set Heat Temperature Differential
  kind: action
  params:
    - name: diff
      type: float
      description: Differential 2.0 to 6.0 degrees F (1.0 increments)

- id: set_stage_delay
  label: Set Stage Delay
  kind: action
  params:
    - name: minutes
      type: integer
      description: Delay in minutes (0-60)

- id: set_fan_ctime
  label: Set Fan Circulation Time
  kind: action
  params:
    - name: minutes
      type: integer
      description: Circulation time in minutes (1-9)

- id: set_thumidity
  label: Set Humidifier Setpoint
  kind: action
  params:
    - name: value
      type: float
      description: Humidity % (0-100)

- id: set_humidifier_mode
  label: Set Humidifier Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=heat only, 2=humidity anytime"

- id: set_dehumidifier
  label: Set Dehumidifier (CT80 only)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=on with fan, 2=on without fan"
    - name: setpoint
      type: integer
      description: Relative humidity 20-90%

- id: set_ext_dehumidifier
  label: Set External Dehumidifier (CT80 only)
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=off, 1=Humidistat, 2=Always with AC"
    - name: setpoint
      type: integer
      description: Relative humidity 20-90%

- id: set_time_format
  label: Set Time Format
  kind: action
  params:
    - name: format
      type: integer
      description: "1=12 hour AM/PM, 2=24 hour"

- id: set_air_baffle
  label: Set Air Baffle Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=closed, 1=temporary open, 2=permanent open (radio only)"

- id: get_sys
  label: Get System Info
  kind: query
  params: []

- id: get_sys_services
  label: Get Services List
  kind: query
  params: []

- id: set_sys_name
  label: Set System Name
  kind: action
  params:
    - name: name
      type: string
      description: Descriptive system name

- id: reboot
  label: Reboot System
  kind: action
  params:
    - name: command
      type: string
      description: Must be "reboot"

- id: set_sys_mode
  label: Set System Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=provisioning, 1=normal"

- id: get_sys_network
  label: Get Network Configuration
  kind: query
  params: []
```

## Feedbacks
```yaml
- id: tstat_response
  type: object
  fields:
    temp: float
    tmode: integer
    fmode: integer
    override: integer
    hold: integer
    t_heat: float
    t_cool: float
    time: object

- id: sys_response
  type: object
  fields:
    uuid: string
    api_version: integer
    fw_version: string
    wlan_fw_version: string

- id: success
  type: enum
  values:
    - 0

- id: error
  type: enum
  values:
    - -1

- id: error_msg
  type: string
  values:
    - "Invalid HTTP API"
```

## Variables
```yaml
- id: temp
  type: float
  description: Current temperature in degrees F

- id: tmode
  type: integer
  description: Operating mode (0=OFF, 1=HEAT, 2=COOL, 3=AUTO)

- id: fmode
  type: integer
  description: Fan mode (0=AUTO, 1=AUTO/CIRCULATE, 2=ON)

- id: hold
  type: integer
  description: Hold status (0=disabled, 1=enabled)

- id: tstate
  type: integer
  description: HVAC operating state (0=OFF, 1=HEAT, 2=COOL)

- id: fstate
  type: integer
  description: Fan operating state (0=OFF, 1=ON) - CT-30 only

- id: humidity
  type: float
  description: Current relative humidity 0-100%

- id: program_mode
  type: integer
  description: "0=Program A, 1=Program B, 2=Vacation, 3=Holiday"

- id: ttarget
  type: integer
  description: Current target operating mode (0=Off, 1=Heat, 2=Cool)

- id: override
  type: integer
  description: Temporary override status (0=disabled)

- id: remote_temp_mode
  type: integer
  description: Remote temperature mode (1=enabled, 0=disabled)

- id: remote_temp_value
  type: integer
  description: Remote temperature value in degrees F

- id: lock_mode
  type: integer
  description: "0=disabled, 1=partial, 2=full, 3=utility"

- id: simple_mode
  type: integer
  description: "1=normal, 2=simple"

- id: energy_led
  type: integer
  description: "0=Off, 1=Green, 2=Yellow, 4=Red"

- id: night_light
  type: integer
  description: "0=off, 1=25%, 2=50%, 3=75%, 4=100%"

- id: temp_swing
  type: float
  description: Temperature swing range (0.5-3.0 degrees F)

- id: cool_differential
  type: float
  description: Cool differential (2.0-6.0 degrees F)

- id: heat_differential
  type: float
  description: Heat differential (2.0-6.0 degrees F)

- id: stage_delay
  type: integer
  description: Stage delay in minutes (0-60)

- id: fan_circulation_time
  type: integer
  description: Fan circulation time in minutes (1-9)

- id: humidifier_setpoint
  type: float
  description: Humidifier setpoint (% RH)

- id: humidifier_mode
  type: integer
  description: "0=off, 1=heat only, 2=humidity anytime"

- id: dehumidifier_mode
  type: integer
  description: "0=off, 1=on with fan, 2=on without fan"

- id: dehumidifier_setpoint
  type: integer
  description: Dehumidifier setpoint (20-90% RH)

- id: ext_dehumidifier_mode
  type: integer
  description: "0=off, 1=Humidistat, 2=Always with AC"

- id: ext_dehumidifier_setpoint
  type: integer
  description: External dehumidifier setpoint (20-90% RH)

- id: time_format
  type: integer
  description: "1=12 hour AM/PM, 2=24 hour"

- id: baffle_mode
  type: integer
  description: "0=closed, 1=temporary open, 2=permanent open"

- id: save_energy_mode
  type: integer
  description: "0=disabled, 1=enabled"

- id: save_energy_type
  type: integer
  description: "1=Adjust target by delta, 2=Least consuming, 3=Absolute setpoint"

- id: save_energy_delta
  type: float
  description: Save energy temperature delta (1-9 degrees F)

- id: hvac_settings
  type: object
  description: HVAC configuration (pump, aux_type, stages)

- id: system_name
  type: string
  description: Descriptive system name

- id: system_mode
  type: integer
  description: "0=provisioning, 1=normal"

- id: network_config
  type: object
  description: Network configuration (ssid, ipaddr, mask, gw, dns, rssi)
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications documented; device only responds to HTTP requests
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
CT80 Rev B supports all features. Rev A lacks humidifier/dehumidifier, program mode, and advanced scheduling features. CT-30 lacks fan state, humidifier, and most advanced features. Override status behavior differs across firmware versions — Rev A reports override as 0 even when active. API version 113, firmware 1.04.82 required. Web server is single-threaded; process connections serially. Chunked encoding not supported.
<!-- UNRESOLVED: TCP port number not stated in source — device uses DHCP for IP assignment -->
<!-- UNRESOLVED: unsolicited event notifications not documented — polling model only -->
<!-- UNRESOLVED: binary protocol encodings not applicable — JSON over HTTP -->

## Provenance

```yaml
source_domains:
  - github.com
source_urls:
  - https://github.com/brannondorsey/radio-thermostat/raw/master/RTCOAWiFIAPIV1_3.pdf
  - https://github.com/brannondorsey/radio-thermostat
retrieved_at: 2026-05-27T14:58:32.836Z
last_checked_at: 2026-05-31T07:05:35.657Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-31T07:05:35.657Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match source endpoints exactly; transport parameters verified; comprehensive HTTP REST API coverage confirmed. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific TCP port number not stated; device uses DHCP for IP assignment"
- "no unsolicited notifications documented; device only responds to HTTP requests"
- "no explicit multi-step macros documented"
- "TCP port number not stated in source — device uses DHCP for IP assignment"
- "unsolicited event notifications not documented — polling model only"
- "binary protocol encodings not applicable — JSON over HTTP"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
