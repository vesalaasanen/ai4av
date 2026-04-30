---
schema_version: ai4av-public-spec-v1
device_id: google/google-calendar-api-v3
entity_id: google_beta_google_calendar
spec_id: admin/google-calendar-api-v3
revision: 1
author: admin
title: "Google Calendar API v3 Control Spec"
status: published
manufacturer: Google
manufacturer_key: google
model_family: "Google Calendar API v3"
aliases: []
compatible_with:
  manufacturers:
    - Google
  models:
    - "Google Calendar API v3"
  firmware: ""  # UNRESOLVED: firmware not applicable to cloud API
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: google_beta_google_calendar.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T06:41:18.822Z
retrieved_at: 2026-04-23T06:41:18.822Z
last_checked_at: 2026-04-23T06:41:18.822Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: ""  # UNRESOLVED: firmware not applicable to cloud API
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:41:18.822Z
  matched_actions: 37
  action_count: 37
  confidence: high
  summary: "All 37 spec actions matched exactly in source reference; transport parameters verified; complete bidirectional coverage."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Google Calendar API v3 Control Spec

## Summary
REST API for Google Calendar management. HTTP transport, OAuth 2.0 Bearer authentication. Covers calendar CRUD, event management, ACL, free/busy queries, and push notifications via Channels.

<!-- UNRESOLVED: webhook/Channel push notification callback endpoint details not documented here -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://www.googleapis.com/calendar/v3
auth:
  type: oauth2  # stated: OAuth 2.0, Bearer token in Authorization header
  token_url: https://oauth2.googleapis.com/token  # stated in source
```

## Traits
```yaml
# API supports all core operations — infer from resource types present
traits:
  - queryable  # list, get, freebusy query endpoints present
  - routable   # events.move changes event calendar ownership
```

## Actions
```yaml
actions:
  - id: acl_delete
    label: Delete ACL Rule
    kind: action
    params:
      - name: calendarId
        type: string
      - name: ruleId
        type: string

  - id: acl_get
    label: Get ACL Rule
    kind: action
    params:
      - name: calendarId
        type: string
      - name: ruleId
        type: string

  - id: acl_insert
    label: Create ACL Rule
    kind: action
    params:
      - name: calendarId
        type: string

  - id: acl_list
    label: List ACL Rules
    kind: action
    params:
      - name: calendarId
        type: string

  - id: acl_patch
    label: Patch ACL Rule
    kind: action
    params:
      - name: calendarId
        type: string
      - name: ruleId
        type: string

  - id: acl_update
    label: Update ACL Rule
    kind: action
    params:
      - name: calendarId
        type: string
      - name: ruleId
        type: string

  - id: acl_watch
    label: Watch ACL Changes
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendarlist_delete
    label: Remove Calendar from Calendar List
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendarlist_get
    label: Get Calendar from Calendar List
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendarlist_insert
    label: Insert Calendar into Calendar List
    kind: action

  - id: calendarlist_list
    label: List Calendar List
    kind: action

  - id: calendarlist_patch
    label: Patch Calendar in Calendar List
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendarlist_update
    label: Update Calendar in Calendar List
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendarlist_watch
    label: Watch Calendar List Changes
    kind: action

  - id: calendars_clear
    label: Clear Primary Calendar
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendars_delete
    label: Delete Calendar
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendars_get
    label: Get Calendar Metadata
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendars_insert
    label: Create Secondary Calendar
    kind: action

  - id: calendars_patch
    label: Patch Calendar Metadata
    kind: action
    params:
      - name: calendarId
        type: string

  - id: calendars_update
    label: Update Calendar Metadata
    kind: action
    params:
      - name: calendarId
        type: string

  - id: channels_stop
    label: Stop Watch Channel
    kind: action

  - id: colors_get
    label: Get Color Definitions
    kind: action

  - id: events_delete
    label: Delete Event
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string

  - id: events_get
    label: Get Event
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string

  - id: events_import
    label: Import Event
    kind: action
    params:
      - name: calendarId
        type: string

  - id: events_insert
    label: Create Event
    kind: action
    params:
      - name: calendarId
        type: string

  - id: events_instances
    label: Get Recurring Event Instances
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string

  - id: events_list
    label: List Events
    kind: action
    params:
      - name: calendarId
        type: string

  - id: events_move
    label: Move Event to Another Calendar
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string
      - name: destination
        type: string
        description: Destination calendar ID (required query param)

  - id: events_patch
    label: Patch Event
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string

  - id: events_quickAdd
    label: Quick Add Event
    kind: action
    params:
      - name: calendarId
        type: string
      - name: text
        type: string
        description: Event text (required query param)

  - id: events_update
    label: Update Event
    kind: action
    params:
      - name: calendarId
        type: string
      - name: eventId
        type: string

  - id: events_watch
    label: Watch Events Changes
    kind: action
    params:
      - name: calendarId
        type: string

  - id: freebusy_query
    label: Query Free/Busy
    kind: action

  - id: settings_get
    label: Get User Setting
    kind: action
    params:
      - name: setting
        type: string

  - id: settings_list
    label: List All User Settings
    kind: action

  - id: settings_watch
    label: Watch Settings Changes
    kind: action
```

## Feedbacks
```yaml
# All GET/list/Query endpoints return structured JSON responses.
# Each resource type (Calendar, Event, AclRule, etc.) is a feedback type.
feedbacks:
  - id: acl_rule
    type: object
    description: Access control rule resource

  - id: calendar
    type: object
    description: Calendar metadata resource

  - id: calendar_list_entry
    type: object
    description: Calendar list entry resource

  - id: channel
    type: object
    description: Watch channel resource for push notifications

  - id: color_definitions
    type: object
    description: Color definitions for calendars and events

  - id: event
    type: object
    description: Event resource

  - id: freebusy_response
    type: object
    description: Free/busy information response

  - id: user_setting
    type: object
    description: Single user setting resource

  - id: user_settings_list
    type: object
    description: All user settings for authenticated user
```

## Variables
```yaml
# No settable parameters that are not discrete actions in this API.
# All state changes are action-based.
```

## Events
```yaml
# Push notifications via Google Cloud Pub/Sub through Channels.
# UNRESOLVED: Channel resource schema, notification format, expiry behavior
# not detailed in this reference document.
```

## Macros
```yaml
# No explicit multi-step sequences documented.
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings in source
```

## Notes
OAuth 2.0 Bearer token passed in `Authorization` header. Service accounts supported for domain-wide delegation. `PATCH` semantics: unspecified fields unchanged, array fields overwrite entire array. `PUT` (update) replaces entire resource — use `get` + `update` for partial atomic updates. `calendars.clear` deletes all events from primary calendar — irreversible. `events.move` changes organizer; birthday/focusTime/fromGmail/outOfOffice/workingLocation event types cannot be moved.
<!-- UNRESOLVED: Channel push notification callback URL format, Pub/Sub topic setup, notification payload schema -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: google_beta_google_calendar.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T06:41:18.822Z
retrieved_at: 2026-04-23T06:41:18.822Z
last_checked_at: 2026-04-23T06:41:18.822Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:41:18.822Z
matched_actions: 37
action_count: 37
confidence: high
summary: "All 37 spec actions matched exactly in source reference; transport parameters verified; complete bidirectional coverage."
```

## Known Gaps

```yaml
[]
```
