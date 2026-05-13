---
spec_id: admin/social-stream-social-stream-ninja
schema_version: ai4av-public-spec-v1
revision: 1
title: "Social Stream Ninja Control Spec"
manufacturer: "Social Stream"
model_family: "Social Stream Ninja"
aliases: []
compatible_with:
  manufacturers:
    - "Social Stream"
  models:
    - "Social Stream Ninja"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - socialstream.ninja
retrieved_at: 2026-04-30T04:45:54.854Z
last_checked_at: 2026-04-23T08:27:21.223Z
generated_at: 2026-04-23T08:27:21.223Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T08:27:21.223Z
  matched_actions: 49
  action_count: 49
  confidence: high
  summary: "All 49 spec actions matched verbatim in source; transport parameters verified; complete coverage of documented API."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Social Stream Ninja Control Spec

## Summary
Browser-based streaming overlay and chat management tool. WebSocket (wss://) and HTTP REST API for real-time bidirectional control of messages, waitlists, polls, timers, and featured content. No authentication required.

<!-- UNRESOLVED: port number not explicitly stated; standard 443 assumed for WSS/HTTPS -->

## Transport
```yaml
protocols:
  - http
  - tcp  # WebSocket over TLS
addressing:
  base_url: https://io.socialstream.ninja
  # port: null  # UNRESOLVED: port number not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: getQueueSize, getChatSources, getUserHistory, getpollpresets, gettimerstate
```

## Actions
```yaml
- id: sendChat
  label: Send Chat Message
  kind: action
  params:
    - name: value
      type: string
      description: Chat message text

- id: sendEncodedChat
  label: Send Encoded Chat Message
  kind: action
  params:
    - name: value
      type: string
      description: URL-encoded chat message

- id: blockUser
  label: Block User
  kind: action
  params:
    - name: value
      type: object
      description: '{"chatname": "username", "type": "twitch"}'

- id: extContent
  label: Send External Content
  kind: action
  params:
    - name: value
      type: string
      description: JSON string with chatname and chatmessage

- id: removefromwaitlist
  label: Remove from Waitlist
  kind: action
  params:
    - name: value
      type: integer
      description: Waitlist entry index

- id: highlightwaitlist
  label: Highlight Waitlist Entry
  kind: action
  params:
    - name: value
      type: integer
      description: Waitlist entry index

- id: resetwaitlist
  label: Reset Waitlist
  kind: action
  params: []

- id: stopentries
  label: Stop Waitlist Entries
  kind: action
  params: []

- id: downloadwaitlist
  label: Download Waitlist
  kind: action
  params: []

- id: selectwinner
  label: Select Waitlist Winner
  kind: action
  params:
    - name: value
      type: integer
      description: Waitlist entry index

- id: clear
  label: Clear Messages
  kind: action
  params: []

- id: clearAll
  label: Clear All Messages
  kind: action
  params: []

- id: clearOverlay
  label: Clear Overlay
  kind: action
  params: []

- id: nextInQueue
  label: Next in Queue
  kind: action
  params: []

- id: getQueueSize
  label: Get Queue Size
  kind: action
  params: []

- id: autoShow
  label: Toggle Auto-Show
  kind: action
  params:
    - name: value
      type: string
      description: '"toggle"'

- id: feature
  label: Feature Next Message
  kind: action
  params: []

- id: getChatSources
  label: Get Chat Sources
  kind: action
  params: []

- id: toggleVIPUser
  label: Toggle VIP User
  kind: action
  params:
    - name: value
      type: object
      description: '{"chatname": "username", "type": "twitch"}'

- id: getUserHistory
  label: Get User History
  kind: action
  params:
    - name: value
      type: object
      description: '{"chatname": "username", "type": "twitch"}'

- id: waitlistmessage
  label: Set Waitlist Message
  kind: action
  params:
    - name: value
      type: string
      description: Custom message text

- id: drawmode
  label: Toggle Draw Mode
  kind: action
  params:
    - name: value
      type: string
      description: 'true, false, or "toggle"'

- id: emoteonly
  label: Toggle Emote-Only Filter
  kind: action
  params:
    - name: value
      type: string
      description: 'true, false, or "toggle"'

- id: resetpoll
  label: Reset Poll
  kind: action
  params: []

- id: closepoll
  label: Close Poll
  kind: action
  params: []

- id: loadpoll
  label: Load Poll Preset
  kind: action
  params:
    - name: value
      type: object
      description: '{"pollId": "poll-123456"}'

- id: getpollpresets
  label: Get Poll Presets
  kind: action
  params: []

- id: setpollsettings
  label: Set Poll Settings
  kind: action
  params:
    - name: value
      type: object
      description: '{"pollQuestion": "...", "pollType": "...", ...}'

- id: createpoll
  label: Create Poll
  kind: action
  params:
    - name: value
      type: object
      description: '{"settings": {"pollQuestion": "...", "pollType": "freeform"}}'

- id: content
  label: Display Content
  kind: action
  params:
    - name: value
      type: object
      description: Content object with chatname, chatmessage, etc.

- id: content2
  label: Display Content Channel 2
  kind: action
  params:
    - name: value
      type: object

- id: content3
  label: Display Content Channel 3
  kind: action
  params:
    - name: value
      type: object

- id: content4
  label: Display Content Channel 4
  kind: action
  params:
    - name: value
      type: object

- id: content5
  label: Display Content Channel 5
  kind: action
  params:
    - name: value
      type: object

- id: content6
  label: Display Content Channel 6
  kind: action
  params:
    - name: value
      type: object

- id: content7
  label: Display Content Channel 7
  kind: action
  params:
    - name: value
      type: object

- id: toggleTTS
  label: Toggle Text-to-Speech
  kind: action
  params:
    - name: value
      type: string
      description: '"toggle" or "on"/"off"'

- id: tts
  label: Text-to-Speech
  kind: action
  params:
    - name: value
      type: string
      description: TTS state

- id: starttimer
  label: Start Timer
  kind: action
  params: []

- id: pausetimer
  label: Pause Timer
  kind: action
  params: []

- id: toggletimer
  label: Toggle Timer
  kind: action
  params: []

- id: resettimer
  label: Reset Timer
  kind: action
  params: []

- id: timeradd
  label: Add Timer Seconds
  kind: action
  params:
    - name: value
      type: integer
      description: Seconds to add

- id: timersubtract
  label: Subtract Timer Seconds
  kind: action
  params:
    - name: value
      type: integer
      description: Seconds to subtract

- id: settimer
  label: Set Timer State
  kind: action
  params:
    - name: value
      type: object
      description: '{"seconds": 300, "label": "...", "mode": "countdown", ...}'

- id: gettimerstate
  label: Get Timer State
  kind: action
  params:
    - name: get
      type: string
      description: Unique identifier for callback response

- id: waitlist
  label: Update Waitlist
  kind: action
  params:
    - name: value
      type: array
      description: Array of waitlist entries

- id: drawPoolSize
  label: Set Draw Pool Size
  kind: action
  params:
    - name: value
      type: integer
      description: Number of entries in draw

- id: startgame
  label: Start Battle Game
  kind: action
  params: []
```

## Feedbacks
```yaml
- id: callback_result
  label: Command Callback Result
  type: object
  fields:
    - name: get
      type: string
      description: Unique identifier from request
    - name: result
      type: string
      description: '"true", "failed", "timeout", or "special"'

- id: queue_size
  label: Queue Size
  type: integer
  description: Current message queue size

- id: poll_presets
  label: Poll Presets
  type: array
  description: List of saved poll presets with IDs and names

- id: timer_state
  label: Timer State
  type: object
  description: Current timer state returned via callback
```

## Variables
```yaml
- id: queue_size
  type: integer
  description: Current queue size (read-only)
```

## Events
```yaml
- id: inbound_donation_stripe
  label: Stripe Donation
  description: checkout.session.completed webhook from Stripe
  fields:
    - name: chatname
      type: string
    - name: chatmessage
      type: string
    - name: hasDonation
      type: string
    - name: type
      type: string
    - name: id
      type: string

- id: inbound_donation_kofi
  label: Ko-Fi Donation
  description: Ko-Fi donation webhook

- id: inbound_donation_bmac
  label: Buy Me A Coffee Donation
  description: bmac donation.created or membership.started events

- id: inbound_donation_fourthwall
  label: Fourthwall Order
  description: Fourthwall ORDER_PLACED event
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
```

## Notes
WebSocket endpoint: wss://io.socialstream.ninja. HTTP base: https://io.socialstream.ninja. Channel system (1-9) routes messages between components (dock, featured, extension, waitlist pages). SSE endpoint: https://io.socialstream.ninja/sse/SESSION_ID. Inbound webhooks normalize donation data into SSN message format. Battle page uses WebRTC direct to extension, not the WebSocket API.

<!-- UNRESOLVED: port number not explicitly stated in source -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: authentication token format not applicable (none required) -->

## Provenance

```yaml
source_domains:
  - socialstream.ninja
retrieved_at: 2026-04-30T04:45:54.854Z
last_checked_at: 2026-04-23T08:27:21.223Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:27:21.223Z
matched_actions: 49
action_count: 49
confidence: high
summary: "All 49 spec actions matched verbatim in source; transport parameters verified; complete coverage of documented API."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
