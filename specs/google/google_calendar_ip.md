---
spec_id: admin/google-calendar-api-v3
schema_version: ai4av-public-spec-v1
revision: 1
title: "Google Calendar API v3 Control Spec"
manufacturer: Google
model_family: "Google Calendar API v3"
aliases: []
compatible_with:
  manufacturers:
    - Google
  models:
    - "Google Calendar API v3"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developers.google.com
source_urls:
  - https://developers.google.com/workspace/calendar/api/v3/reference
  - https://developers.google.com/workspace/calendar/api/guides/overview
  - https://developers.google.com/workspace/calendar/caldav
retrieved_at: 2026-06-02T22:07:25.400Z
last_checked_at: 2026-06-02T22:07:25.400Z
generated_at: 2026-06-02T22:07:25.400Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "authentication mechanism not fully documented in source — source references \"authenticated user\" and \"domain-wide delegation of authority\" but does not specify OAuth2 flow, scopes, or token format"
  - "rate limits and quota units not fully specified beyond mention that patch requests consume three quota units"
  - "request/response body schemas not included in source — source references separate \"resource representation\" pages"
  - "source references \"authenticated user\" and \"domain-wide delegation\" but does not specify the auth mechanism or token format"
  - "response schemas are not documented in source — source references separate \"resource representation\" pages"
  - "settable parameters not detailed in source — resource representation pages not included"
  - "push notification payload format and delivery details not in source"
  - "no explicit multi-step sequences defined in source"
  - "no explicit safety warnings or interlock procedures in source"
  - "authentication mechanism (OAuth2 scopes, token acquisition) not documented in source"
  - "rate limit quotas and daily usage limits not specified beyond patch costing 3 units"
  - "request/response body schemas not in source"
  - "error codes and error response format not documented"
  - "pagination parameters for list endpoints not documented"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:07:25.400Z
  matched_actions: 37
  action_count: 37
  confidence: medium
  summary: "All 37 spec actions traced to source (dip-safe re-verify). (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-15
---

# Google Calendar API v3 Control Spec

## Summary
Google Calendar API v3 is a RESTful HTTP API for managing Google Calendar resources including calendars, events, ACL rules, calendar lists, free/busy queries, colors, channels, and user settings. All endpoints are accessed via HTTPS at `https://www.googleapis.com/calendar/v3`.

<!-- UNRESOLVED: authentication mechanism not fully documented in source — source references "authenticated user" and "domain-wide delegation of authority" but does not specify OAuth2 flow, scopes, or token format -->
<!-- UNRESOLVED: rate limits and quota units not fully specified beyond mention that patch requests consume three quota units -->
<!-- UNRESOLVED: request/response body schemas not included in source — source references separate "resource representation" pages -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://www.googleapis.com/calendar/v3
auth:
  type: null  # UNRESOLVED: source references "authenticated user" and "domain-wide delegation" but does not specify the auth mechanism or token format
```

## Traits
```yaml
# - queryable       (GET methods return resource state)
```

## Actions
```yaml
# --- Acl ---
- id: acl_delete
  label: Delete ACL Rule
  kind: action
  transport: http
  http:
    method: DELETE
    path: /calendars/{calendarId}/acl/{ruleId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: ruleId
      type: string
      description: ACL rule identifier

- id: acl_get
  label: Get ACL Rule
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}/acl/{ruleId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: ruleId
      type: string
      description: ACL rule identifier

- id: acl_insert
  label: Insert ACL Rule
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/acl
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: acl_list
  label: List ACL Rules
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}/acl
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: acl_patch
  label: Patch ACL Rule
  kind: action
  transport: http
  http:
    method: PATCH
    path: /calendars/{calendarId}/acl/{ruleId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: ruleId
      type: string
      description: ACL rule identifier

- id: acl_update
  label: Update ACL Rule
  kind: action
  transport: http
  http:
    method: PUT
    path: /calendars/{calendarId}/acl/{ruleId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: ruleId
      type: string
      description: ACL rule identifier

- id: acl_watch
  label: Watch ACL Changes
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/acl/watch
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

# --- CalendarList ---
- id: calendar_list_delete
  label: Delete Calendar from List
  kind: action
  transport: http
  http:
    method: DELETE
    path: /users/me/calendarList/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_list_get
  label: Get Calendar from List
  kind: action
  transport: http
  http:
    method: GET
    path: /users/me/calendarList/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_list_insert
  label: Insert Calendar into List
  kind: action
  transport: http
  http:
    method: POST
    path: /users/me/calendarList

- id: calendar_list_list
  label: List Calendars
  kind: action
  transport: http
  http:
    method: GET
    path: /users/me/calendarList

- id: calendar_list_patch
  label: Patch Calendar List Entry
  kind: action
  transport: http
  http:
    method: PATCH
    path: /users/me/calendarList/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_list_update
  label: Update Calendar List Entry
  kind: action
  transport: http
  http:
    method: PUT
    path: /users/me/calendarList/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_list_watch
  label: Watch Calendar List Changes
  kind: action
  transport: http
  http:
    method: POST
    path: /users/me/calendarList/watch

# --- Calendars ---
- id: calendar_clear
  label: Clear Primary Calendar
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/clear
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_delete
  label: Delete Secondary Calendar
  kind: action
  transport: http
  http:
    method: DELETE
    path: /calendars/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_get
  label: Get Calendar Metadata
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_insert
  label: Create Secondary Calendar
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars

- id: calendar_patch
  label: Patch Calendar Metadata
  kind: action
  transport: http
  http:
    method: PATCH
    path: /calendars/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: calendar_update
  label: Update Calendar Metadata
  kind: action
  transport: http
  http:
    method: PUT
    path: /calendars/{calendarId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

# --- Channels ---
- id: channel_stop
  label: Stop Watching Channel
  kind: action
  transport: http
  http:
    method: POST
    path: /channels/stop

# --- Colors ---
- id: colors_get
  label: Get Color Definitions
  kind: action
  transport: http
  http:
    method: GET
    path: /colors

# --- Events ---
- id: event_delete
  label: Delete Event
  kind: action
  transport: http
  http:
    method: DELETE
    path: /calendars/{calendarId}/events/{eventId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: eventId
      type: string
      description: Event identifier

- id: event_get
  label: Get Event
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}/events/{eventId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: eventId
      type: string
      description: Event identifier

- id: event_import
  label: Import Event
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/events/import
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: event_insert
  label: Create Event
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/events
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: event_instances
  label: Get Event Instances
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}/events/{eventId}/instances
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: eventId
      type: string
      description: Recurring event identifier

- id: event_list
  label: List Events
  kind: action
  transport: http
  http:
    method: GET
    path: /calendars/{calendarId}/events
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

- id: event_move
  label: Move Event
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/events/{eventId}/move
  params:
    - name: calendarId
      type: string
      description: Source calendar identifier
    - name: eventId
      type: string
      description: Event identifier
    - name: destination
      type: string
      description: Destination calendar identifier (required query parameter)

- id: event_patch
  label: Patch Event
  kind: action
  transport: http
  http:
    method: PATCH
    path: /calendars/{calendarId}/events/{eventId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: eventId
      type: string
      description: Event identifier

- id: event_quick_add
  label: Quick Add Event
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/events/quickAdd
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: text
      type: string
      description: Event description text (required query parameter)

- id: event_update
  label: Update Event
  kind: action
  transport: http
  http:
    method: PUT
    path: /calendars/{calendarId}/events/{eventId}
  params:
    - name: calendarId
      type: string
      description: Calendar identifier
    - name: eventId
      type: string
      description: Event identifier

- id: event_watch
  label: Watch Event Changes
  kind: action
  transport: http
  http:
    method: POST
    path: /calendars/{calendarId}/events/watch
  params:
    - name: calendarId
      type: string
      description: Calendar identifier

# --- Freebusy ---
- id: freebusy_query
  label: Query Free/Busy
  kind: action
  transport: http
  http:
    method: POST
    path: /freeBusy

# --- Settings ---
- id: settings_get
  label: Get User Setting
  kind: action
  transport: http
  http:
    method: GET
    path: /users/me/settings/{setting}
  params:
    - name: setting
      type: string
      description: Setting identifier

- id: settings_list
  label: List User Settings
  kind: action
  transport: http
  http:
    method: GET
    path: /users/me/settings

- id: settings_watch
  label: Watch Settings Changes
  kind: action
  transport: http
  http:
    method: POST
    path: /users/me/settings/watch
```

## Feedbacks
```yaml
# UNRESOLVED: response schemas are not documented in source — source references separate "resource representation" pages
# GET endpoints return resource representations (ACL rules, calendars, events, settings, colors)
# Watch endpoints return channel notifications for resource changes
```

## Variables
```yaml
# UNRESOLVED: settable parameters not detailed in source — resource representation pages not included
```

## Events
```yaml
# Watch endpoints (acl/watch, calendarList/watch, events/watch, settings/watch)
# register push notification channels for resource changes.
# Channel notification delivery mechanism not documented in source.
# UNRESOLVED: push notification payload format and delivery details not in source
```

## Macros
```yaml
# Source recommends get+update pattern instead of patch for quota efficiency.
# UNRESOLVED: no explicit multi-step sequences defined in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Note: calendar_clear deletes all events on a primary calendar — potentially destructive.
# UNRESOLVED: no explicit safety warnings or interlock procedures in source
```

## Notes
- All URIs are relative to `https://www.googleapis.com/calendar/v3` unless otherwise noted.
- PATCH methods consume three quota units each; the source recommends using GET followed by UPDATE instead of PATCH for quota efficiency.
- `calendars.clear` is only for primary calendars; `calendars.delete` is for secondary calendars.
- `events.import` only supports events with `eventType` of `default`.
- `events.move` only supports `default` events — `birthday`, `focusTime`, `fromGmail`, `outOfOffice`, and `workingLocation` events cannot be moved.
- For `calendar_insert`, source recommends authenticating as the intended data owner and warns against using service accounts as data owners since ownership cannot be transferred.
- Resource representation details (request/response body schemas) are on separate pages not included in this source.

<!-- UNRESOLVED: authentication mechanism (OAuth2 scopes, token acquisition) not documented in source -->
<!-- UNRESOLVED: rate limit quotas and daily usage limits not specified beyond patch costing 3 units -->
<!-- UNRESOLVED: request/response body schemas not in source -->
<!-- UNRESOLVED: error codes and error response format not documented -->
<!-- UNRESOLVED: pagination parameters for list endpoints not documented -->

## Provenance

```yaml
source_domains:
  - developers.google.com
source_urls:
  - https://developers.google.com/workspace/calendar/api/v3/reference
  - https://developers.google.com/workspace/calendar/api/guides/overview
  - https://developers.google.com/workspace/calendar/caldav
retrieved_at: 2026-06-02T22:07:25.400Z
last_checked_at: 2026-06-02T22:07:25.400Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:07:25.400Z
matched_actions: 37
action_count: 37
confidence: medium
summary: "All 37 spec actions traced to source (dip-safe re-verify). (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "authentication mechanism not fully documented in source — source references \"authenticated user\" and \"domain-wide delegation of authority\" but does not specify OAuth2 flow, scopes, or token format"
- "rate limits and quota units not fully specified beyond mention that patch requests consume three quota units"
- "request/response body schemas not included in source — source references separate \"resource representation\" pages"
- "source references \"authenticated user\" and \"domain-wide delegation\" but does not specify the auth mechanism or token format"
- "response schemas are not documented in source — source references separate \"resource representation\" pages"
- "settable parameters not detailed in source — resource representation pages not included"
- "push notification payload format and delivery details not in source"
- "no explicit multi-step sequences defined in source"
- "no explicit safety warnings or interlock procedures in source"
- "authentication mechanism (OAuth2 scopes, token acquisition) not documented in source"
- "rate limit quotas and daily usage limits not specified beyond patch costing 3 units"
- "request/response body schemas not in source"
- "error codes and error response format not documented"
- "pagination parameters for list endpoints not documented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
