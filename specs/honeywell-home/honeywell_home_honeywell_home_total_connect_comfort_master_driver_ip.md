---
spec_id: admin/honeywell_home-total_connect_comfort_master_driver
schema_version: ai4av-public-spec-v1
revision: 1
title: "Honeywell Home Total Connect Comfort Master Driver Control Spec"
manufacturer: "Honeywell Home"
model_family: "Honeywell Home Total Connect Comfort Master Driver"
aliases: []
compatible_with:
  manufacturers:
    - "Honeywell Home"
  models:
    - "Honeywell Home Total Connect Comfort Master Driver"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developer.honeywellhome.com
  - mytotalconnectcomfort.com
source_urls:
  - https://developer.honeywellhome.com/api-methods
  - https://developer.honeywellhome.com/content/t-series-thermostat-guide
  - https://mytotalconnectcomfort.com/WebApi/Help/Reference
  - https://developer.honeywellhome.com
retrieved_at: 2026-05-27T13:26:25.046Z
last_checked_at: 2026-10-07T13:29:30.811Z
generated_at: 2026-10-07T13:29:30.811Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device firmware versions not stated"
  - "rate limits not stated"
  - "WebSocket/real-time event transport not detailed"
  - "temperature setpoint ranges not stated"
  - "fan speed options not enumerated"
  - "schedule period formats not detailed"
  - "no multi-step sequences described in source"
  - "safety procedures not detailed in source"
  - "TCP port number not stated (uses HTTPS standard port 443)"
  - "command timing / polling interval not specified"
  - "error code catalog not provided in source"
verification:
  verdict: verified
  checked_at: 2026-10-07T13:29:30.811Z
  matched_actions: 41
  action_count: 41
  confidence: medium
  summary: "All 41 spec action units map one-to-one to the 41 source API method rows; base URL and OAuth2 auth supported by the source. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# Honeywell Home Total Connect Comfort Master Driver Control Spec

## Summary
REST API for Honeywell Home / Resideo connected devices including thermostats, cameras, water leak detectors, domestic hot water (DHW) systems, and shutoff valves. Uses OAuth2 for authentication with bearer tokens. Base API URL: `https://developer.honeywellhome.com`.

<!-- UNRESOLVED: device firmware versions not stated -->
<!-- UNRESOLVED: rate limits not stated -->
<!-- UNRESOLVED: WebSocket/real-time event transport not detailed -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://developer.honeywellhome.com
auth:
  type: oauth2  # OAuth2 client credentials + bearer token
```

## Traits
```yaml
- queryable  # GET endpoints return device state
- levelable  # temperature setpoints, fan speed settings
```

## Actions
```yaml
- id: obtain_oauth2_token
  label: Obtain OAuth2 Client Credentials Token
  kind: action
  params:
    - name: client_id
      type: string
    - name: client_secret
      type: string

- id: create_token_from_auth_code
  label: Create Token from Authorization Code
  kind: action
  params:
    - name: code
      type: string

- id: refresh_token
  label: Refresh Token
  kind: action
  params:
    - name: refresh_token
      type: string

- id: set_schedule
  label: Set Schedule
  kind: action
  params:
    - name: deviceId
      type: string
    - name: schedule
      type: object

- id: update_adaptive_recovery
  label: Update Adaptive Recovery
  kind: action
  params:
    - name: deviceId
      type: string
    - name: temperaturemodes
      type: object

- id: pause_schedule
  label: Pause Schedule
  kind: action
  params:
    - name: deviceId
      type: string

- id: enable_schedule
  label: Enable Schedule
  kind: action
  params:
    - name: deviceId
      type: string

- id: change_thermostat_settings
  label: Change Thermostat Settings
  kind: action
  params:
    - name: deviceId
      type: string
    - name: settings
      type: object

- id: change_fan_setting
  label: Change Fan Setting
  kind: action
  params:
    - name: deviceId
      type: string
    - name: fan_settings
      type: object

- id: set_room_priority
  label: Set Room Priority
  kind: action
  params:
    - name: deviceId
      type: string
    - name: priority
      type: object

- id: change_camera_config
  label: Change Camera Config
  kind: action
  params:
    - name: deviceId
      type: string
    - name: config
      type: object

- id: create_partner_receiver
  label: Create Partner Receiver
  kind: action
  params:
    - name: event_config
      type: object

- id: set_events_subscription
  label: Set Events to Subscribe To
  kind: action
  params:
    - name: events
      type: array

- id: unsubscribe_device
  label: Unsubscribe Device from Real-Time Events
  kind: action
  params:
    - name: subsystem
      type: string
    - name: deviceId
      type: string

- id: subscribe_device
  label: Subscribe Device
  kind: action
  params:
    - name: subsystem
      type: string
    - name: deviceId
      type: string

- id: set_dhw_schedule
  label: Set DHW Schedule
  kind: action
  params:
    - name: deviceId
      type: string
    - name: schedule
      type: object

- id: set_dhw_state
  label: Set DHW Operation & Boost State
  kind: action
  params:
    - name: deviceId
      type: string
    - name: state
      type: object

- id: set_dhw_system_switch
  label: Set DHW System Switch
  kind: action
  params:
    - name: deviceId
      type: string
    - name: systemSwitch
      type: object

- id: control_shutoff_valve
  label: Open or Close Valve
  kind: action
  params:
    - name: deviceId
      type: string
    - name: control
      type: object
```

## Feedbacks
```yaml
- id: get_authorization_code
  label: Get Authorization Code
  kind: query
  query_command: GET /authorize
  params:
    - name: client_id
      type: string

- id: get_devices_for_location
  label: Get All Devices for a Location
  kind: query
  query_command: GET /devices
  params:
    - name: location_id
      type: string

- id: get_schedule
  label: Get Schedule
  kind: query
  query_command: GET /devices/schedule/{deviceId}
  params:
    - name: deviceId
      type: string

- id: get_schedule_status
  label: Get Schedule Status
  kind: query
  query_command: GET /devices/schedule/{deviceId}/status
  params:
    - name: deviceId
      type: string

- id: get_thermostat
  label: Get Thermostat
  kind: query
  query_command: GET /devices/thermostats/{deviceId}
  params:
    - name: deviceId
      type: string

- id: get_fan_settings
  label: Get Current Fan Settings
  kind: query
  query_command: GET /devices/thermostats/{deviceId}/fan
  params:
    - name: deviceId
      type: string

- id: get_rooms_in_group
  label: Get Rooms in a Group
  kind: query
  query_command: GET /devices/thermostats/{deviceId}/group/{groupId}/rooms
  params:
    - name: deviceId
      type: string
    - name: groupId
      type: string

- id: get_room_priority
  label: Get Room Priority
  kind: query
  query_command: GET /devices/thermostats/{deviceId}/priority
  params:
    - name: deviceId
      type: string

- id: get_thermostat_configuration
  label: Get Thermostat Configuration
  kind: query
  query_command: GET /devices/thermostats/{deviceId}/thermostatconfiguration
  params:
    - name: deviceId
      type: string

- id: get_all_devices_by_type
  label: Get All Devices by Type
  kind: query
  query_command: GET /devices/{deviceType}
  params:
    - name: deviceType
      type: string

- id: get_device_by_id
  label: Get Specific Device by ID
  kind: query
  query_command: GET /devices/{deviceType}/{deviceId}
  params:
    - name: deviceType
      type: string
    - name: deviceId
      type: string

- id: get_all_locations_and_devices
  label: Get All Locations and Devices
  kind: query
  query_command: GET /locations

- id: get_temperature_humidity_history
  label: Get Temperature and Humidity Sensor History
  kind: query
  query_command: GET /devices/waterLeakDetectors/{deviceId}/history
  params:
    - name: deviceId
      type: string

- id: get_cameras_for_location
  label: Get Cameras for a Location
  kind: query
  query_command: GET /devices/cameras
  params:
    - name: location_id
      type: string

- id: get_camera
  label: Get Specific Camera
  kind: query
  query_command: GET /devices/cameras/{deviceId}
  params:
    - name: deviceId
      type: string

- id: get_camera_configuration
  label: Get Camera Configuration
  kind: query
  query_command: GET /devices/cameras/{deviceId}/config
  params:
    - name: deviceId
      type: string

- id: get_camera_notifications
  label: Get Notifications for Camera
  kind: query
  query_command: GET /devices/cameras/{deviceId}/notifications
  params:
    - name: deviceId
      type: string

- id: get_assigned_events
  label: Get Assigned Events
  kind: query
  query_command: GET /v2/events/partner/events

- id: get_device_subscription_state
  label: Get Device Subscription State
  kind: query
  query_command: GET /v3/events/subscribe/subsystem/{subsystem}/mac/{deviceId}
  params:
    - name: subsystem
      type: string
    - name: deviceId
      type: string

- id: get_dhw_schedule
  label: Get DHW Schedule
  kind: query
  query_command: GET /devices/dhw/{deviceId}/schedule
  params:
    - name: deviceId
      type: string

- id: get_shutoff_valve
  label: Get Shutoff Valve
  kind: query
  query_command: GET /devices/shutoffvalve/{deviceId}
  params:
    - name: deviceId
      type: string

- id: get_acl_entries
  label: Get ACL Entries
  kind: query
  query_command: GET /
```

## Variables
```yaml
# UNRESOLVED: temperature setpoint ranges not stated
# UNRESOLVED: fan speed options not enumerated
# UNRESOLVED: schedule period formats not detailed
```

## Events
```yaml
- id: real_time_device_events
  label: Real-Time Device Events
  description: Device state change notifications via subscription
  params:
    - name: subsystem
      type: string
    - name: deviceId
      type: string
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety procedures not detailed in source
```

## Notes
Device supports: thermostats, cameras, water leak detectors, DHW (domestic hot water) systems, shutoff valves. OAuth2 requires `client_id` and `client_secret` for machine-to-machine authentication. Refresh token flow available for token renewal.
<!-- UNRESOLVED: TCP port number not stated (uses HTTPS standard port 443) -->
<!-- UNRESOLVED: command timing / polling interval not specified -->
<!-- UNRESOLVED: error code catalog not provided in source -->

## Provenance

```yaml
source_domains:
  - developer.honeywellhome.com
  - mytotalconnectcomfort.com
source_urls:
  - https://developer.honeywellhome.com/api-methods
  - https://developer.honeywellhome.com/content/t-series-thermostat-guide
  - https://mytotalconnectcomfort.com/WebApi/Help/Reference
  - https://developer.honeywellhome.com
retrieved_at: 2026-05-27T13:26:25.046Z
last_checked_at: 2026-10-07T13:29:30.811Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-10-07T13:29:30.811Z
matched_actions: 41
action_count: 41
confidence: medium
summary: "All 41 spec action units map one-to-one to the 41 source API method rows; base URL and OAuth2 auth supported by the source. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device firmware versions not stated"
- "rate limits not stated"
- "WebSocket/real-time event transport not detailed"
- "temperature setpoint ranges not stated"
- "fan speed options not enumerated"
- "schedule period formats not detailed"
- "no multi-step sequences described in source"
- "safety procedures not detailed in source"
- "TCP port number not stated (uses HTTPS standard port 443)"
- "command timing / polling interval not specified"
- "error code catalog not provided in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
