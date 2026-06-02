---
spec_id: admin/rachio-gen_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Rachio Gen Series Control Spec"
manufacturer: Rachio
model_family: "Rachio Gen Series"
aliases: []
compatible_with:
  manufacturers:
    - Rachio
  models:
    - "Rachio Gen Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - rachio.readme.io
source_urls:
  - https://rachio.readme.io/reference
retrieved_at: 2026-04-30T04:32:52.163Z
last_checked_at: 2026-06-02T22:13:25.486Z
generated_at: 2026-06-02T22:13:25.486Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no safety warnings or interlock procedures in source"
  - "no discrete settable parameters documented outside action params"
  - "no multi-step sequences described in source"
  - "no safety warnings, interlock procedures, or power-on sequencing in source"
  - "specific rate limit values not stated in source"
  - "firmware version compatibility not stated"
  - "request/response body schemas not documented in source"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:13:25.486Z
  matched_actions: 88
  action_count: 88
  confidence: medium
  summary: "All 88 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Rachio Gen Series Control Spec

## Summary
Smart irrigation controller + smart lighting system. REST API cloud control. Two base URLs: `https://api.rach.io/1` for core device/zone/schedule APIs, `https://cloud-rest.rach.io` for additional APIs. Bearer token auth.

<!-- UNRESOLVED: no safety warnings or interlock procedures in source -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://api.rach.io/1
auth:
  type: bearer  # stated: Authorization: Bearer <token>
```

## Traits
```yaml
- powerable       # device on/off commands present
- routable        # zone start/stop + multiple zone start
- queryable       # GET endpoints return device/zone/schedule state
- levelable       # moisture level/percent, dimming levels
```

## Actions
```yaml
# DeviceService
- id: stop_water
  label: Stop Water
  kind: action
  params: []
- id: rain_delay
  label: Apply Rain Delay
  kind: action
  params: []
- id: device_on
  label: Device On
  kind: action
  params: []
- id: device_off
  label: Device Off
  kind: action
  params: []
- id: pause_zone_run
  label: Pause Zone Run
  kind: action
  params: []
- id: resume_zone_run
  label: Resume Zone Run
  kind: action
  params: []

# ZoneService
- id: zone_start
  label: Start Zone
  kind: action
  params: []
- id: zone_start_multiple
  label: Start Multiple Zones
  kind: action
  params: []
- id: set_moisture_level
  label: Set Moisture Level
  kind: action
  params: []
- id: set_moisture_percent
  label: Set Moisture Percent
  kind: action
  params: []
- id: enable_zone
  label: Enable Zone
  kind: action
  params: []
- id: disable_zone
  label: Disable Zone
  kind: action
  params: []

# ScheduleRuleService
- id: skip_schedule
  label: Skip Schedule
  kind: action
  params: []
- id: start_schedule
  label: Start Schedule
  kind: action
  params: []
- id: seasonal_adjustment
  label: Seasonal Adjustment
  kind: action
  params: []
- id: skip_forward_zone_run
  label: Skip Forward Zone Run
  kind: action
  params: []

# ValveService (Smart Hose Timer)
- id: start_watering
  label: Start Watering
  kind: action
  params: []
- id: stop_watering
  label: Stop Watering
  kind: action
  params: []
- id: set_default_runtime
  label: Set Default Runtime
  kind: action
  params: []

# LightingService (Smart Lighting Controller)
- id: update_lighting_controller
  label: Update Lighting Controller
  kind: action
  params: []
- id: update_lighting_zone
  label: Update Lighting Zone
  kind: action
  params: []
- id: set_lighting_zone_states
  label: Set Lighting Zone States
  kind: action
  params: []
- id: set_lighting_zone_dimming_levels
  label: Set Lighting Zone Dimming Levels
  kind: action
  params: []
- id: set_lighting_zone_desired_dimming_settings
  label: Set Lighting Zone Desired Dimming Settings
  kind: action
  params: []
- id: create_lighting_zone_group
  label: Create Lighting Zone Group
  kind: action
  params: []
- id: update_lighting_zone_group
  label: Update Lighting Zone Group
  kind: action
  params: []
- id: delete_lighting_zone_group
  label: Delete Lighting Zone Group
  kind: action
  params: []
- id: create_lighting_scene
  label: Create Lighting Scene
  kind: action
  params: []
- id: update_lighting_scene
  label: Update Lighting Scene
  kind: action
  params: []
- id: delete_lighting_scene
  label: Delete Lighting Scene
  kind: action
  params: []
- id: activate_lighting_scene
  label: Activate Lighting Scene
  kind: action
  params: []
- id: deactivate_lighting_scene
  label: Deactivate Lighting Scene
  kind: action
  params: []
- id: create_lighting_program
  label: Create Lighting Program
  kind: action
  params: []
- id: update_lighting_program
  label: Update Lighting Program
  kind: action
  params: []
- id: delete_lighting_program
  label: Delete Lighting Program
  kind: action
  params: []

# WebhookService
- id: create_webhook
  label: Create Webhook
  kind: action
  params: []
- id: update_webhook
  label: Update Webhook
  kind: action
  params: []
- id: delete_webhook
  label: Delete Webhook
  kind: action
  params: []
- id: delete_all_webhooks
  label: Delete All Webhooks
  kind: action
  params: []

# ProgramService (Smart Hose Timer)
- id: create_program_v2
  label: Create Program V2
  kind: action
  params: []
- id: update_program_v2
  label: Update Program V2
  kind: action
  params: []
- id: delete_program
  label: Delete Program
  kind: action
  params: []
- id: get_device
  label: Get Device
  kind: query
  params: []
- id: get_device_current_schedule
  label: Get Device Current Schedule
  kind: query
  params: []
- id: get_device_events
  label: Get Device Events
  kind: query
  params: []
- id: get_device_forecast
  label: Get Device Forecast
  kind: query
  params: []
- id: get_zone
  label: Get Zone
  kind: query
  params: []
- id: get_schedulerule
  label: Get Schedule Rule
  kind: query
  params: []
- id: get_flexschedulerule
  label: Get Flex Schedule Rule
  kind: query
  params: []
- id: get_webhook_event_types
  label: Get Webhook Event Types
  kind: query
  params: []
- id: get_notification_webhooks
  label: Get Notification Webhooks For Device
  kind: query
  params: []
- id: get_notification_webhook
  label: Get Notification Webhook
  kind: query
  params: []
- id: create_notification_webhook
  label: Create Notification Webhook
  kind: action
  params: []
- id: update_notification_webhook
  label: Update Notification Webhook
  kind: action
  params: []
- id: delete_notification_webhook
  label: Delete Notification Webhook
  kind: action
  params: []
- id: get_person_info
  label: Get Person Info
  kind: query
  params: []
- id: get_person
  label: Get Person
  kind: query
  params: []
- id: get_property
  label: Get Property
  kind: query
  params: []
- id: list_properties
  label: List Properties
  kind: query
  params: []
- id: find_property_by_entity
  label: Find Property By Entity
  kind: query
  params: []
- id: get_base_station
  label: Get Base Station
  kind: query
  params: []
- id: get_valve
  label: Get Valve
  kind: query
  params: []
- id: list_base_stations
  label: List Base Stations
  kind: query
  params: []
- id: list_valves
  label: List Valves
  kind: query
  params: []
- id: get_program
  label: Get Program
  kind: query
  params: []
- id: list_programs
  label: List Programs
  kind: query
  params: []
- id: get_program_v2
  label: Get Program V2
  kind: query
  params: []
- id: list_programs_v2
  label: List Programs V2
  kind: query
  params: []
- id: create_skip_overrides
  label: Create Skip Overrides
  kind: action
  params: []
- id: delete_skip_overrides
  label: Delete Skip Overrides
  kind: action
  params: []
- id: create_planned_run_skip_overrides
  label: Create Planned Run Skip Overrides
  kind: action
  params: []
- id: delete_planned_run_skip_overrides
  label: Delete Planned Run Skip Overrides
  kind: action
  params: []
- id: get_valve_day_views
  label: Get Valve Day Views
  kind: query
  params: []
- id: list_lighting_areas
  label: List Lighting Areas
  kind: query
  params: []
- id: get_lighting_area
  label: Get Lighting Area
  kind: query
  params: []
- id: list_lighting_controllers
  label: List Lighting Controllers
  kind: query
  params: []
- id: get_lighting_controller
  label: Get Lighting Controller
  kind: query
  params: []
- id: list_lighting_zones
  label: List Lighting Zones
  kind: query
  params: []
- id: get_lighting_zone
  label: Get Lighting Zone
  kind: query
  params: []
- id: list_lighting_zone_groups
  label: List Lighting Zone Groups
  kind: query
  params: []
- id: get_lighting_zone_group
  label: Get Lighting Zone Group
  kind: query
  params: []
- id: list_lighting_scenes
  label: List Lighting Scenes
  kind: query
  params: []
- id: get_lighting_scene
  label: Get Lighting Scene
  kind: query
  params: []
- id: list_lighting_programs
  label: List Lighting Programs
  kind: query
  params: []
- id: get_lighting_program
  label: Get Lighting Program
  kind: query
  params: []
- id: get_webhook
  label: Get Webhook
  kind: query
  params: []
- id: list_webhooks
  label: List Webhooks
  kind: query
  params: []
- id: list_webhook_event_types
  label: List Webhook Event Types
  kind: query
  params: []
```

## Feedbacks
```yaml
# GET endpoints return device/zone/schedule/person/property state
# NotificationService webhook events sent as JSON to configured endpoint
# Webhook basic auth supported
# Rate limiting enforced (specific limits UNRESOLVED)
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters documented outside action params
```

## Events
```yaml
# Webhook events: device status changes, zone run events, schedule events, rain delay events
# Event types listed via GET /public/notification/webhook_event_type
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings, interlock procedures, or power-on sequencing in source
```

## Notes
Smart irrigation system supports zones, schedules, rain delays. Smart Hose Timer via ValveService. Smart Lighting Controller via LightingService. Separate base URL `https://cloud-rest.rach.io` for additional APIs. Webhook support with basic auth. Rate limits exist but values not stated.
<!-- UNRESOLVED: specific rate limit values not stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: request/response body schemas not documented in source -->

## Provenance

```yaml
source_domains:
  - rachio.readme.io
source_urls:
  - https://rachio.readme.io/reference
retrieved_at: 2026-04-30T04:32:52.163Z
last_checked_at: 2026-06-02T22:13:25.486Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:13:25.486Z
matched_actions: 88
action_count: 88
confidence: medium
summary: "All 88 spec actions traced to source (dip-safe re-verify). (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no safety warnings or interlock procedures in source"
- "no discrete settable parameters documented outside action params"
- "no multi-step sequences described in source"
- "no safety warnings, interlock procedures, or power-on sequencing in source"
- "specific rate limit values not stated in source"
- "firmware version compatibility not stated"
- "request/response body schemas not documented in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
