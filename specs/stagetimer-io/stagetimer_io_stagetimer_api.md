---
spec_id: admin/stagetimer_io-stagetimer-api
schema_version: ai4av-public-spec-v1
revision: 1
title: "stagetimer.io Stagetimer API Control Spec"
manufacturer: stagetimer.io
model_family: "Stagetimer API"
aliases: []
compatible_with:
  manufacturers:
    - stagetimer.io
  models:
    - "Stagetimer API"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - stagetimer.io
source_urls:
  - https://stagetimer.io/docs/api-v1/
  - https://stagetimer.io/docs/integration-with-streamdeck-companion/
retrieved_at: 2026-04-30T01:44:44.758Z
last_checked_at: 2026-09-30T01:17:23.750Z
generated_at: 2026-09-30T01:17:23.750Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "WebSocket socket event payload details provided for playback_status, room, message, current_timer/next_timer, flash, timers_changed, messages_changed; connection uses Socket.IO path /v1/socket.io with auth {room_id, api_key}"
  - "no standalone device configuration parameters found in source"
  - "no safety warnings or interlock procedures in source"
  - "WebSocket event documentation incomplete"
  - "create_timer response model not shown in source"
  - "delete_timer response model not shown in source"
  - "show_message/hide_message response model incomplete"
verification:
  verdict: verified
  checked_at: 2026-09-30T01:17:23.750Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 semantic-id actions map to documented endpoints with matching shapes and transport; all documented socket events are also represented. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# stagetimer.io Stagetimer API Control Spec

## Summary
Cloud REST API for controlling Stagetimer stage timer rooms. Controls playback (start/stop/reset/jump), timer management (create/update/delete), room state (blackout/on-air/focus modes), and message overlays. Authentication via room-scoped or team-scoped API keys passed as `api_key` query parameter or `Authorization: Bearer` header; keys are JWT format and legacy 32-character room keys remain supported.

<!-- UNRESOLVED: WebSocket socket event payload details provided for playback_status, room, message, current_timer/next_timer, flash, timers_changed, messages_changed; connection uses Socket.IO path /v1/socket.io with auth {room_id, api_key} -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: https://api.stagetimer.io/v1/
auth:
  type: api_key  # JWT format; room key (single room) or team key (all team rooms); legacy 32-char keys still supported
rate_limit:
  requests: 100
  window: 60  # seconds
```

## Traits
```yaml
- powerable      # start/stop/reset playback commands present
- routable       # timer selection (next/previous/select_timer) present
- queryable      # get_status/get_room/get_logs/get_timer/get_all_timers/get_all_messages/get_message/get_output_links present
- levelable      # add_time/subtract_time/jump commands present
```

## Actions
```yaml
- id: test_connection
  label: Test API Connection
  kind: action
  params: []

- id: test_auth
  label: Test API Authorization
  kind: action
  params:
    - name: room_id
      type: string
      required: true
      description: Room ID to authorize against

- id: get_playback_status
  label: Get Playback Status
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: get_room
  label: Get Room State
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: get_logs
  label: Get Event Logs
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: limit
      type: integer
      required: false
      default: 20
      description: Max 200
    - name: offset
      type: integer
      required: false
      default: 0
      description: Pagination offset, max 200

- id: start
  label: Start/Resume Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: stop
  label: Stop Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: start_or_stop
  label: Toggle Start/Stop Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: reset
  label: Reset Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: autostart
      type: boolean
      required: false
      default: false

- id: next
  label: Highlight Next Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: autostart
      type: boolean
      required: false
      default: false

- id: previous
  label: Reset or Highlight Previous Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: autostart
      type: boolean
      required: false
      default: false

- id: add_time
  label: Add Time to Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: amount
      type: string
      required: false
      description: Time shorthand e.g. "30s", "10m"
    - name: milliseconds
      type: integer
      required: false

- id: subtract_time
  label: Subtract Time from Highlighted Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: amount
      type: string
      required: false
    - name: milliseconds
      type: integer
      required: false

- id: jump
  label: Jump Playhead
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: milliseconds
      type: integer
      required: true
      description: Positive = forward, negative = backward

- id: start_flashing
  label: Flash Screen
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: count
      type: integer
      required: false
      default: 3
      description: 1-999

- id: stop_flashing
  label: Stop Flashing
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: enable_blackout
  label: Enable Blackout Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: disable_blackout
  label: Disable Blackout Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: toggle_blackout
  label: Toggle Blackout Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: enable_on_air
  label: Enable On-Air Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: disable_on_air
  label: Disable On-Air Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: toggle_on_air
  label: Toggle On-Air Mode
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: enable_focus
  label: Enable Focus Mode (Deprecated)
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: disable_focus
  label: Disable Focus Mode (Deprecated)
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: toggle_focus
  label: Toggle Focus Mode (Deprecated)
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: start_timer
  label: Start Specific Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false
      description: "1-based index; use timer_id or index, not both"

- id: stop_timer
  label: Stop Specific Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: start_or_stop_timer
  label: Toggle Specific Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: select_timer
  label: Select (Cue Up) Timer Without Starting
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: reset_timer
  label: Reset Specific Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: get_all_timers
  label: Get All Timers
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: get_timer
  label: Get Single Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: create_timer
  label: Create Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: name
      type: string
      required: false
    - name: speaker
      type: string
      required: false
    - name: notes
      type: string
      required: false
    - name: labels
      type: array
      required: false
      description: "Array of {name, color}; color '#' must be URL-encoded as %23"
    - name: appearance
      type: string
      required: false
      description: "COUNTDOWN | COUNTUP | TOD | COUNTDOWN_TOD | COUNTUP_TOD | HIDDEN"
    - name: type
      type: string
      required: false
      description: "DURATION | FINISH_TIME"
    - name: hours
      type: integer
      required: false
    - name: minutes
      type: integer
      required: false
    - name: seconds
      type: integer
      required: false
    - name: wrap_up_yellow
      type: integer
      required: false
    - name: wrap_up_red
      type: integer
      required: false
    - name: trigger
      type: string
      required: false
      description: "MANUAL | LINKED | SCHEDULED"
    - name: start_time
      type: string
      required: false
    - name: start_time_uses_date
      type: boolean
      required: false
    - name: finish_time
      type: string
      required: false
    - name: finish_time_uses_date
      type: boolean
      required: false

- id: update_timer
  label: Update Timer (Partial)
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false
    - name: name
      type: string
      required: false
    - name: speaker
      type: string
      required: false
    - name: notes
      type: string
      required: false
    - name: labels
      type: array
      required: false
    - name: appearance
      type: string
      required: false
    - name: type
      type: string
      required: false
    - name: hours
      type: integer
      required: false
    - name: minutes
      type: integer
      required: false
    - name: seconds
      type: integer
      required: false
    - name: wrap_up_yellow
      type: integer
      required: false
    - name: wrap_up_red
      type: integer
      required: false
    - name: trigger
      type: string
      required: false
    - name: start_time
      type: string
      required: false
    - name: start_time_uses_date
      type: boolean
      required: false
    - name: finish_time
      type: string
      required: false
    - name: finish_time_uses_date
      type: boolean
      required: false

- id: delete_timer
  label: Delete Timer
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: timer_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: show_message
  label: Show Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false
    - name: focus
      type: boolean
      required: false
      default: false
      description: Show the message in fullscreen focus mode, covering all other output elements.

- id: hide_message
  label: Hide Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: show_or_hide_message
  label: Toggle Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false
    - name: focus
      type: boolean
      required: false
      default: false
      description: Show the message in fullscreen focus mode, covering all other output elements.

- id: get_all_messages
  label: Get All Messages
  kind: action
  params:
    - name: room_id
      type: string
      required: true

- id: get_message
  label: Get Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: create_message
  label: Create Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: text
      type: string
      required: false
    - name: color
      type: string
      required: false
      description: "white | green | red"
    - name: bold
      type: boolean
      required: false
      default: false
    - name: uppercase
      type: boolean
      required: false
      default: false

- id: update_message
  label: Update Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false
    - name: text
      type: string
      required: false
    - name: color
      type: string
      required: false
      description: "white | green | red"
    - name: bold
      type: boolean
      required: false
    - name: uppercase
      type: boolean
      required: false

- id: delete_message
  label: Delete Message
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: message_id
      type: string
      required: false
    - name: index
      type: integer
      required: false

- id: get_output_links
  label: Get Output Links
  kind: action
  params:
    - name: room_id
      type: string
      required: true
    - name: identifier
      type: string
      required: false
      description: Custom device name displayed in the Live Connections list.
    - name: mirror
      type: string
      required: false
      description: "vertical | horizontal | vertical,horizontal | horizontal,vertical"
    - name: delay
      type: integer
      required: false
      description: "Broadcast delay in seconds. Min: 0, Max: 3600"
    - name: tz
      type: string
      required: false
      description: Override the room timezone for this link.
    - name: hide_controls
      type: boolean
      required: false
      default: false
    - name: short_url
      type: boolean
      required: false
      default: false
      description: Return short URLs instead of full signed URLs.
```

## Feedbacks
```yaml
- id: playback_status
  label: Playback Status
  type: object
  fields:
    - name: timer_id
      type: string
    - name: running
      type: boolean
    - name: start
      type: integer
      description: Unix timestamp ms
    - name: finish
      type: integer
      description: Unix timestamp ms
    - name: pause
      type: integer
      description: Unix timestamp ms
    - name: server_time
      type: integer
      description: Unix timestamp ms

- id: room_state
  label: Room State
  type: object
  fields:
    - name: name
      type: string
    - name: blackout
      type: boolean
    - name: focus_message
      type: boolean
    - name: on_air
      type: boolean
    - name: timezone
      type: string

- id: timer_object
  label: Timer Object
  type: object
  fields:
    - name: _id
      type: string
    - name: name
      type: string
    - name: speaker
      type: string
    - name: notes
      type: string
    - name: labels
      type: array
    - name: appearance
      type: string
    - name: type
      type: string
    - name: duration
      type: string
    - name: hours
      type: integer
    - name: minutes
      type: integer
    - name: seconds
      type: integer
    - name: wrap_up_yellow
      type: integer
    - name: wrap_up_red
      type: integer
    - name: trigger
      type: string
    - name: start_time
      type: string
    - name: finish_time
      type: string

- id: message_object
  label: Message Object
  type: object
  fields:
    - name: _id
      type: string
    - name: showing
      type: boolean
    - name: text
      type: string
    - name: color
      type: string
    - name: bold
      type: boolean
    - name: uppercase
      type: boolean

- id: output_link
  label: Output Link
  type: object
  fields:
    - name: id
      type: string
    - name: name
      type: string
    - name: index
      type: integer
    - name: url
      type: string

- id: api_response
  label: Standard API Response
  type: object
  fields:
    - name: ok
      type: boolean
    - name: message
      type: string
    - name: data
      type: object

- id: socket_playback_status
  label: Socket Event: playback_status
  type: object
  source: socket.io
  fields:
    - name: timer_id
      type: string
    - name: running
      type: boolean
    - name: start
      type: integer
      description: Unix timestamp ms
    - name: finish
      type: integer
      description: Unix timestamp ms
    - name: pause
      type: integer
      description: Unix timestamp ms
    - name: server_time
      type: integer
      description: Unix timestamp ms

- id: socket_room
  label: Socket Event: room
  type: object
  source: socket.io
  fields:
    - name: name
      type: string
    - name: blackout
      type: boolean
    - name: focus_message
      type: boolean
      description: Deprecated; no longer live-updated via WebSocket
    - name: on_air
      type: boolean
    - name: timezone
      type: string

- id: socket_message
  label: Socket Event: message
  type: object
  source: socket.io
  fields:
    - name: _id
      type: string
    - name: showing
      type: boolean
    - name: text
      type: string
    - name: color
      type: string
    - name: bold
      type: boolean
    - name: uppercase
      type: boolean

- id: socket_current_timer
  label: Socket Event: current_timer
  type: object
  source: socket.io
  description: Full timer object or null. See timer_object.
  fields:
    - name: _id
      type: string
    - name: name
      type: string
    - name: speaker
      type: string
    - name: notes
      type: string
    - name: labels
      type: array
    - name: appearance
      type: string
    - name: type
      type: string
    - name: duration
      type: string
    - name: hours
      type: integer
    - name: minutes
      type: integer
    - name: seconds
      type: integer
    - name: wrap_up_yellow
      type: integer
    - name: wrap_up_red
      type: integer
    - name: trigger
      type: string
    - name: start_time
      type: string
    - name: finish_time
      type: string

- id: socket_next_timer
  label: Socket Event: next_timer
  type: object
  source: socket.io
  description: Full timer object or null. See timer_object.
  fields:
    - name: _id
      type: string
    - name: name
      type: string
    - name: speaker
      type: string
    - name: notes
      type: string
    - name: labels
      type: array
    - name: appearance
      type: string
    - name: type
      type: string
    - name: duration
      type: string
    - name: hours
      type: integer
    - name: minutes
      type: integer
    - name: seconds
      type: integer
    - name: wrap_up_yellow
      type: integer
    - name: wrap_up_red
      type: integer
    - name: trigger
      type: string
    - name: start_time
      type: string
    - name: finish_time
      type: string

- id: socket_flash
  label: Socket Event: flash
  type: object
  source: socket.io
  description: Emitted for manual flash only (not scheduled flashing on timer 0:00).
  fields:
    - name: count
      type: integer

- id: socket_timers_changed
  label: Socket Event: timers_changed
  type: object
  source: socket.io
  description: Array of {timer_id, change} entries; refresh via /get_all_timers.
  fields:
    - name: timer_id
      type: string
    - name: change
      type: string

- id: socket_messages_changed
  label: Socket Event: messages_changed
  type: object
  source: socket.io
  description: Array of {message_id, change} entries; refresh via /get_all_messages.
  fields:
    - name: message_id
      type: string
    - name: change
      type: string
```

## Variables
```yaml
# No discrete settable parameters outside of timer object fields.
# room_id is a runtime targeting parameter, not a device variable.
# UNRESOLVED: no standalone device configuration parameters found in source
```

## Events
```yaml
# Socket.IO connection: wss/https://api.stagetimer.io path /v1/socket.io, auth {room_id, api_key}.
# Socket is receive-only; does not accept currentState messages from clients.
# On initial connect the server emits current state for: room, playback_status, current_timer, next_timer, message (if any).
- id: playback_status
  description: Time-related changes (start, stop, next, previous). Same data shape as Feedback playback_status.
- id: room
  description: Room/viewer events (blackout, on-air). focus_message is deprecated and no longer live-updated.
- id: message
  description: Message shown/hidden or active message updated.
- id: current_timer
  description: Currently selected timer (full timer object or null).
- id: next_timer
  description: Next timer after the selected one (full timer object or null).
- id: flash
  description: Manual flash triggered; payload {count}. Not sent for scheduled flashing at 0:00.
- id: timers_changed
  description: Array of {timer_id, change} on every timer mutation. Refresh via /get_all_timers.
- id: messages_changed
  description: Array of {message_id, change} on every message mutation. Refresh via /get_all_messages.
```

## Macros
```yaml
# No explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
All endpoints use GET requests with query parameters. Timestamps returned as Unix epoch milliseconds. Client must compute remaining time locally: if `running=true`, use `remaining = finish - Date.now()`; if `running=false`, use `remaining = finish - pause`. Room keys are rate-limited per room; team keys share budget across all team rooms. Legacy 32-character room keys (pre-3.4.0) continue to work. Socket.IO endpoint at path `/v1/socket.io` over `https://api.stagetimer.io`; connect with `auth: {room_id, api_key}`. The socket is receive-only; the server pushes `room`, `playback_status`, `current_timer`, `next_timer`, and active `message` on connect. Standard error envelope: `{ ok: false, message: <human-readable> }` for 400 (invalid/missing parameters), 401 (missing/invalid API key), 404 (timer or room not found), 429 (rate limit exceeded).

<!-- UNRESOLVED: WebSocket event documentation incomplete -->
<!-- UNRESOLVED: create_timer response model not shown in source -->
<!-- UNRESOLVED: delete_timer response model not shown in source -->
<!-- UNRESOLVED: show_message/hide_message response model incomplete -->

## Provenance

```yaml
source_domains:
  - stagetimer.io
source_urls:
  - https://stagetimer.io/docs/api-v1/
  - https://stagetimer.io/docs/integration-with-streamdeck-companion/
retrieved_at: 2026-04-30T01:44:44.758Z
last_checked_at: 2026-09-30T01:17:23.750Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-30T01:17:23.750Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 semantic-id actions map to documented endpoints with matching shapes and transport; all documented socket events are also represented. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "WebSocket socket event payload details provided for playback_status, room, message, current_timer/next_timer, flash, timers_changed, messages_changed; connection uses Socket.IO path /v1/socket.io with auth {room_id, api_key}"
- "no standalone device configuration parameters found in source"
- "no safety warnings or interlock procedures in source"
- "WebSocket event documentation incomplete"
- "create_timer response model not shown in source"
- "delete_timer response model not shown in source"
- "show_message/hide_message response model incomplete"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
