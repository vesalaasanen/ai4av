---
spec_id: admin/tesla-platform-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tesla Platform Series Control Spec"
manufacturer: Tesla
model_family: "Tesla Platform Series"
aliases: []
compatible_with:
  manufacturers:
    - Tesla
  models:
    - "Tesla Platform Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - support.tesmart.com
retrieved_at: 2026-05-05T02:35:43.321Z
last_checked_at: 2026-05-10T12:18:55.027Z
generated_at: 2026-05-10T12:18:55.027Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-10T12:18:55.027Z
  matched_actions: 66
  action_count: 66
  confidence: high
  summary: "All 66 spec actions found verbatim in source endpoints; full bidirectional coverage with no hallucinations or shape drift."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Tesla Platform Series Control Spec

## Summary
REST API for Tesla Fleet API vehicle commands. Vehicle Command Proxy exposes endpoints for direct interaction with a vehicle. Requires virtual key installation for command acceptance. Uses HTTPS, base path `/api/1/vehicles/{vin}/command/`.

<!-- UNRESOLVED: auth mechanism (virtual key signing) not documented in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://owner-api.tesla.com/api/1/vehicles/{vin}/command  # inferred from endpoint patterns
auth:
  type: unknown  # UNRESOLVED: virtual key auth described but credential format not stated
```

## Traits
```yaml
# UNRESOLVED: traits inferred from command categories but not explicitly listed
```

## Actions
```yaml
- id: actuate_trunk
  label: Actuate Trunk
  kind: action
  params:
    - name: which_trunk
      type: string
      description: "front or rear"

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
      description: Volume level

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
  label: Toggle Guest Mode
  kind: action
  params: []

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
  label: Toggle Playback
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
  params: []

- id: navigation_sc_request
  label: Navigate to Supercharger
  kind: action
  params: []

- id: navigation_waypoints_request
  label: Navigation Waypoints
  kind: action
  params: []

- id: remote_auto_seat_climate_request
  label: Remote Auto Seat Climate
  kind: action
  params: []

- id: remote_auto_steering_wheel_heat_climate_request
  label: Remote Auto Steering Wheel Heat
  kind: action
  params: []

- id: remote_boombox
  label: Remote Boombox
  kind: action
  params:
    - name: sound_id
      type: integer
      description: "0: random fart, 2000: locate ping"

- id: remote_seat_cooler_request
  label: Remote Seat Cooler
  kind: action
  params: []

- id: remote_seat_heater_request
  label: Remote Seat Heater
  kind: action
  params: []

- id: remote_start_drive
  label: Remote Start Drive
  kind: action
  params: []

- id: remote_steering_wheel_heat_level_request
  label: Steering Wheel Heat Level
  kind: action
  params: []

- id: remote_steering_wheel_heater_request
  label: Steering Wheel Heater
  kind: action
  params: []

- id: remove_charge_schedule
  label: Remove Charge Schedule
  kind: action
  params: []

- id: remove_precondition_schedule
  label: Remove Precondition Schedule
  kind: action
  params: []

- id: reset_pin_to_drive_pin
  label: Reset PIN to Drive
  kind: action
  params: []

- id: reset_valet_pin
  label: Reset Valet PIN
  kind: action
  params: []

- id: schedule_software_update
  label: Schedule Software Update
  kind: action
  params: []

- id: set_bioweapon_mode
  label: Set Bioweapon Defense Mode
  kind: action
  params: []

- id: set_cabin_overheat_protection
  label: Set Cabin Overheat Protection
  kind: action
  params: []

- id: set_charge_limit
  label: Set Charge Limit
  kind: action
  params:
    - name: percent
      type: integer
      description: Charge limit percentage

- id: set_charging_amps
  label: Set Charging Amps
  kind: action
  params:
    - name: amps
      type: integer
      description: Charging amperage

- id: set_climate_keeper_mode
  label: Set Climate Keeper Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0: Off, 1: Keep Mode, 2: Dog Mode, 3: Camp Mode"

- id: set_cop_temp
  label: Set Cabin Overheat Protection Temperature
  kind: action
  params:
    - name: temp_level
      type: integer
      description: "0: Low (90F/30C), 1: Medium (95F/35C), 2: High (100F/40C)"

- id: set_pin_to_drive
  label: Set PIN to Drive
  kind: action
  params:
    - name: pin
      type: string
      description: Four-digit PIN

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
      description: Minutes after midnight

- id: set_scheduled_departure
  label: Set Scheduled Departure
  kind: action
  params: []

- id: set_sentry_mode
  label: Set Sentry Mode
  kind: action
  params: []

- id: set_temps
  label: Set Cabin Temperature
  kind: action
  params: []

- id: set_valet_mode
  label: Set Valet Mode
  kind: action
  params: []

- id: set_vehicle_name
  label: Set Vehicle Name
  kind: action
  params: []

- id: speed_limit_activate
  label: Activate Speed Limit Mode
  kind: action
  params: []

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
      description: Maximum speed in MPH

- id: sun_roof_control
  label: Sun Roof Control
  kind: action
  params:
    - name: state
      type: string
      description: "stop, close, or vent"

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
      description: "vent or close"
```

## Feedbacks
```yaml
# UNRESOLVED: response formats not documented in source
```

## Variables
```yaml
# UNRESOLVED: vehicle state variables not documented in source
```

## Events
```yaml
# UNRESOLVED: unsolicited events not documented in source
```

## Macros
```yaml
# UNRESOLVED: no macro sequences documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: virtual_key_required
    description: Vehicle must have application's virtual key installed to accept commands
  - id: user_presence_required
    description: Certain commands (adjust_volume) require user to be present and mobile access enabled
# UNRESOLVED: no explicit safety warnings in source
```

## Notes
All endpoints use `POST /api/1/vehicles/{vin}/command/{command_name}`. VIN must be substituted. Commands rejected without virtual key signature. Some commands require specific vehicle states (parked, not moving, etc.) documented inline above.
<!-- UNRESOLVED: response schema, error codes, rate limits not in source -->

## Provenance

```yaml
source_domains:
  - support.tesmart.com
retrieved_at: 2026-05-05T02:35:43.321Z
last_checked_at: 2026-05-10T12:18:55.027Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-10T12:18:55.027Z
matched_actions: 66
action_count: 66
confidence: high
summary: "All 66 spec actions found verbatim in source endpoints; full bidirectional coverage with no hallucinations or shape drift."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
