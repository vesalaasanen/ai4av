---
spec_id: admin/tesla-tesla-platform
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tesla Tesla Platform Control Spec"
manufacturer: Tesla
model_family: "Tesla Platform"
aliases: []
compatible_with:
  manufacturers:
    - Tesla
  models:
    - "Tesla Platform"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.tesmart.com
source_urls:
  - https://support.tesmart.com/hc/en-us/article_attachments/10269851509913
retrieved_at: 2026-05-05T02:35:43.321Z
last_checked_at: 2026-05-10T12:18:55.972Z
generated_at: 2026-05-10T12:18:55.972Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-10T12:18:55.972Z
  matched_actions: 66
  action_count: 66
  confidence: high
  summary: "All 66 spec actions matched source endpoints with correct parameters and enum values; transport authenticated via oauth2 virtual key over HTTPS."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Tesla Tesla Platform Control Spec

## Summary
Tesla Fleet API REST interface for vehicle command control. Accepts commands via POST to `/api/1/vehicles/{vin}/command/<endpoint>`. Requires application's virtual key installed on vehicle. Vehicle Command Proxy signs requests with virtual key before forwarding to Fleet API.

<!-- UNRESOLVED: physical vehicle control constraints (voltage, current, power specs) not applicable to cloud API -->
<!-- UNRESOLVED: конкретные ответы/feedback формат не описан в source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://owner-api.teslamotors.com/api/1/vehicles
auth:
  type: oauth2
  note: "Virtual key required; commands rejected without valid signature"
```

## Traits
```yaml
powerable: true
routable: false
queryable: false
levelable: true
```

## Actions
```yaml
- id: actuate_trunk
  label: Actuate Trunk
  kind: action
  params:
    - name: which_trunk
      type: string
      enum: [front, rear]

- id: add_charge_schedule
  label: Add Charge Schedule
  kind: action
  params: []

- id: add_precondition_schedule
  label: Add Precondition Schedule
  kind: action
  params: []

- id: adjust_volume
  label: Adjust Volume
  kind: action
  params:
    - name: volume
      type: integer

- id: auto_conditioning_start
  label: Start Climate Preconditioning
  kind: action
  params: []

- id: auto_conditioning_stop
  label: Stop Climate Preconditioning
  kind: action
  params: []

- id: cancel_software_update
  label: Cancel Software Update
  kind: action
  params: []

- id: charge_max_range
  label: Charge Max Range
  kind: action
  params: []

- id: charge_port_door_close
  label: Close Charge Port Door
  kind: action
  params: []

- id: charge_port_door_open
  label: Open Charge Port Door
  kind: action
  params: []

- id: charge_standard
  label: Charge Standard
  kind: action
  params: []

- id: charge_start
  label: Start Charging
  kind: action
  params: []

- id: charge_stop
  label: Stop Charging
  kind: action
  params: []

- id: clear_pin_to_drive_admin
  label: Clear PIN to Drive Admin
  kind: action
  params: []

- id: door_lock
  label: Lock Doors
  kind: action
  params: []

- id: door_unlock
  label: Unlock Doors
  kind: action
  params: []

- id: erase_user_data
  label: Erase User Data
  kind: action
  params: []

- id: flash_lights
  label: Flash Lights
  kind: action
  params: []

- id: guest_mode
  label: Set Guest Mode
  kind: action
  params:
    - name: enabled
      type: boolean

- id: honk_horn
  label: Honk Horn
  kind: action
  params: []

- id: media_next_fav
  label: Next Favorite Track
  kind: action
  params: []

- id: media_next_track
  label: Next Track
  kind: action
  params: []

- id: media_prev_fav
  label: Previous Favorite Track
  kind: action
  params: []

- id: media_prev_track
  label: Previous Track
  kind: action
  params: []

- id: media_toggle_playback
  label: Toggle Media Playback
  kind: action
  params: []

- id: media_volume_down
  label: Volume Down
  kind: action
  params: []

- id: navigation_gps_request
  label: Navigation GPS Request
  kind: action
  params:
    - name: lat
      type: number
    - name: lon
      type: number

- id: navigation_request
  label: Navigation Request
  kind: action
  params:
    - name: lat
      type: number
    - name: lon
      type: number

- id: navigation_sc_request
  label: Navigation Supercharger Request
  kind: action
  params: []

- id: navigation_waypoints_request
  label: Navigation Waypoints Request
  kind: action
  params:
    - name: waypoints
      type: array

- id: remote_auto_seat_climate_request
  label: Remote Auto Seat Climate
  kind: action
  params:
    - name: auto_seat_climate
      type: boolean

- id: remote_auto_steering_wheel_heat_climate_request
  label: Remote Auto Steering Wheel Heat Climate
  kind: action
  params:
    - name: auto_steering_wheel_heat_climate
      type: boolean

- id: remote_boombox
  label: Remote Boombox
  kind: action
  params:
    - name: sound_id
      type: integer
      enum: [0, 2000]

- id: remote_seat_cooler_request
  label: Remote Seat Cooler
  kind: action
  params:
    - name: seat_cooler
      type: integer

- id: remote_seat_heater_request
  label: Remote Seat Heater
  kind: action
  params:
    - name: seat_heater
      type: integer

- id: remote_start_drive
  label: Remote Start Drive
  kind: action
  params: []

- id: remote_steering_wheel_heat_level_request
  label: Remote Steering Wheel Heat Level
  kind: action
  params:
    - name: level
      type: integer

- id: remote_steering_wheel_heater_request
  label: Remote Steering Wheel Heater
  kind: action
  params:
    - name: on
      type: boolean

- id: remove_charge_schedule
  label: Remove Charge Schedule
  kind: action
  params:
    - name: id
      type: string

- id: remove_precondition_schedule
  label: Remove Precondition Schedule
  kind: action
  params:
    - name: id
      type: string

- id: reset_pin_to_drive_pin
  label: Reset PIN to Drive PIN
  kind: action
  params: []

- id: reset_valet_pin
  label: Reset Valet PIN
  kind: action
  params: []

- id: schedule_software_update
  label: Schedule Software Update
  kind: action
  params:
    - name: offset
      type: integer

- id: set_bioweapon_mode
  label: Set Bioweapon Defense Mode
  kind: action
  params:
    - name: on
      type: boolean

- id: set_cabin_overheat_protection
  label: Set Cabin Overheat Protection
  kind: action
  params:
    - name: on
      type: boolean

- id: set_charge_limit
  label: Set Charge Limit
  kind: action
  params:
    - name: percent
      type: integer

- id: set_charging_amps
  label: Set Charging Amps
  kind: action
  params:
    - name: amps
      type: integer

- id: set_climate_keeper_mode
  label: Set Climate Keeper Mode
  kind: action
  params:
    - name: mode
      type: integer
      enum: [0, 1, 2, 3]

- id: set_cop_temp
  label: Set Cabin Overheat Protection Temperature
  kind: action
  params:
    - name: temp
      type: integer
      enum: [0, 1, 2]

- id: set_pin_to_drive
  label: Set PIN to Drive
  kind: action
  params:
    - name: pin
      type: string

- id: set_preconditioning_max
  label: Set Preconditioning Max
  kind: action
  params: []

- id: set_scheduled_charging
  label: Set Scheduled Charging
  kind: action
  params:
    - name: time
      type: integer
  note: "Deprecated in firmware 2024.26+"

- id: set_scheduled_departure
  label: Set Scheduled Departure
  kind: action
  params:
    - name: departure_time
      type: integer
    - name: end_off_peak_time
      type: integer
  note: "Deprecated in firmware 2024.26+"

- id: set_sentry_mode
  label: Set Sentry Mode
  kind: action
  params:
    - name: on
      type: boolean

- id: set_temps
  label: Set Cabin Temperature
  kind: action
  params:
    - name: driver_temp
      type: number
    - name: passenger_temp
      type: number

- id: set_valet_mode
  label: Set Valet Mode
  kind: action
  params:
    - name: on
      type: boolean
    - name: pin
      type: string

- id: set_vehicle_name
  label: Set Vehicle Name
  kind: action
  params:
    - name: name
      type: string

- id: speed_limit_activate
  label: Activate Speed Limit Mode
  kind: action
  params:
    - name: pin
      type: string

- id: speed_limit_clear_pin
  label: Clear Speed Limit PIN
  kind: action
  params: []

- id: speed_limit_clear_pin_admin
  label: Clear Speed Limit PIN Admin
  kind: action
  params: []

- id: speed_limit_deactivate
  label: Deactivate Speed Limit Mode
  kind: action
  params: []

- id: speed_limit_set_limit
  label: Set Speed Limit
  kind: action
  params:
    - name: limit
      type: integer

- id: sun_roof_control
  label: Sun Roof Control
  kind: action
  params:
    - name: state
      type: string
      enum: [stop, close, vent]

- id: trigger_homelink
  label: Trigger HomeLink
  kind: action
  params: []

- id: upcoming_calendar_entries
  label: Upcoming Calendar Entries
  kind: action
  params: []

- id: window_control
  label: Window Control
  kind: action
  params:
    - name: command
      type: string
      enum: [vent, close]
    - name: lat
      type: number
    - name: lon
      type: number
```

## Feedbacks
```yaml
- id: charge_state_response
  type: object
  description: Response from charge_start includes reason codes (complete, is_charging, disconnected, no_power, requested)

- id: charge_port_door_response
  type: object
  description: Response from charge_port_door_open/close includes reason codes (car_wash, cable_connected, not_allowed, already_closed, non_motorized)

- id: error_response
  type: object
  description: Standard error response with reason codes per endpoint
```

## Variables
```yaml
- id: charge_limit_percent
  type: integer
  range: [0, 100]

- id: charging_amps
  type: integer

- id: cabin_temperature_driver
  type: number

- id: cabin_temperature_passenger
  type: number

- id: climate_keeper_mode
  type: integer
  values: [0, 1, 2, 3]
  labels: [Off, Keep Mode, Dog Mode, Camp Mode]

- id: sentry_mode
  type: boolean

- id: valet_mode
  type: boolean

- id: speed_limit_mph
  type: integer

- id: sun_roof_state
  type: string
  values: [stop, close, vent]
```

## Events
```yaml
# UNRESOLVED: this source describes only command-sending endpoints; vehicle event push notifications not documented here
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - erase_user_data
  - set_valet_mode
  - speed_limit_activate
  - set_pin_to_drive
interlocks:
  - flash_lights: vehicle must be in park
  - honk_horn: vehicle must be in park
  - erase_user_data: vehicle must be parked and in Guest Mode
  - adjust_volume: user must be present and mobile access enabled
  - remote_start_drive: keyless driving must be enabled
  - window_control: vehicle must be parked
  - charge_port_door_open: vehicle must not be in drive or park (except car_wash mode)
```

## Notes
All endpoints use `POST /api/1/vehicles/{vin}/command/<endpoint>` pattern. VIN must be known. Virtual key signature required or vehicle rejects command. Vehicle Command Proxy optional for most business vehicles and pre-2021 S/X vehicles.

Certain commands require specific firmware versions: `clear_pin_to_drive_admin` and `speed_limit_clear_pin_admin` require 2023.44+ and 2023.38+ respectively. Guest Mode QR code requires 2024.14+. `set_scheduled_charging` and `set_scheduled_departure` deprecated in favor of `add_charge_schedule` and `add_precondition_schedule` as of 2024.26.

<!-- UNRESOLVED: response payload schema not documented in source -->
<!-- UNRESOLVED: rate limiting / throttle info not in source -->
<!-- UNRESOLVED: websocket/streaming events not covered in this endpoint doc -->

## Provenance

```yaml
source_domains:
  - support.tesmart.com
source_urls:
  - https://support.tesmart.com/hc/en-us/article_attachments/10269851509913
retrieved_at: 2026-05-05T02:35:43.321Z
last_checked_at: 2026-05-10T12:18:55.972Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-10T12:18:55.972Z
matched_actions: 66
action_count: 66
confidence: high
summary: "All 66 spec actions matched source endpoints with correct parameters and enum values; transport authenticated via oauth2 virtual key over HTTPS."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
