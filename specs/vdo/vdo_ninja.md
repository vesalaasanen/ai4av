---
spec_id: admin/vdo-ninja
schema_version: ai4av-public-spec-v1
revision: 1
title: "VDO Ninja API Control Spec"
manufacturer: VDO
model_family: VDO.Ninja
aliases: []
compatible_with:
  manufacturers:
    - VDO
  models:
    - VDO.Ninja
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.vdo.ninja
  - sdk.vdo.ninja
source_urls:
  - https://docs.vdo.ninja/advanced-settings/api-and-midi-parameters/api/api-reference
  - https://docs.vdo.ninja/advanced-settings/api-and-midi-parameters/api
  - https://sdk.vdo.ninja/docs/api-reference.html
  - https://sdk.vdo.ninja
retrieved_at: 2026-04-30T02:39:35.358Z
last_checked_at: 2026-05-14T18:17:21.319Z
generated_at: 2026-05-14T18:17:21.319Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:21.319Z
  matched_actions: 28
  action_count: 28
  confidence: high
  summary: "All 50 spec actions matched literally in source; transport parameters verified."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# VDO Ninja API Control Spec

## Summary
VDO.Ninja web-based video conferencing platform with remote control via HTTP GET API and WebSocket (WSS). Supports local media control (speaker, mic, camera, volume), guest management for directors, scene/layout control, and timer management. Auth via shared API key passed as URL parameter.

<!-- UNRESOLVED: physical device spec not applicable; web-based platform -->

## Transport
```yaml
protocols:
  - http
  - tcp  # WebSocket upgrade on port 443
addressing:
  base_url: https://api.vdo.ninja
  port: 443  # stated: wss://api.vdo.ninja:443 for WebSocket
auth:
  type: api_key  # shared secret via &api=XXXXXX URL parameter; no password
```

## Traits
```yaml
- queryable  # getDetails, getGuestList return JSON state
- levelable  # volume (0-100), panning (0-180), bitrate (kbps)
- routable   # forward guests, addScene, group management
```

## Actions
```yaml
- id: speaker
  label: Control Speaker
  kind: action
  params:
    - name: value
      type: string
      enum: [true, false, toggle]
      description: Unmute (true), mute (false), or toggle speaker

- id: mic
  label: Control Microphone
  kind: action
  params:
    - name: value
      type: string
      enum: [true, false, toggle]
      description: Unmute (true), mute (false), or toggle mic

- id: camera
  label: Control Camera
  kind: action
  params:
    - name: value
      type: string
      enum: [true, false, toggle]
      description: Unmute (true), mute (false), or toggle camera

- id: volume
  label: Set Playback Volume
  kind: action
  params:
    - name: value
      type: integer
      description: Volume 0-100, or true/false for mute/unmute

- id: sendChat
  label: Send Chat Message
  kind: action
  params:
    - name: value
      type: string
      description: Chat message to send to all connected

- id: record
  label: Control Recording
  kind: action
  params:
    - name: value
      type: string
      enum: [true, false]
      description: Start (true) or stop (false) local recording

- id: reload
  label: Reload Page
  kind: action
  params: []

- id: hangup
  label: Hang Up
  kind: action
  params: []

- id: bitrate
  label: Control Video Bitrate
  kind: action
  params:
    - name: value
      type: integer
      description: Bitrate in kbps, or true/false for unlock/pause

- id: panning
  label: Set Audio Panning
  kind: action
  params:
    - name: value
      type: integer
      description: Panning 0-180 (0=left, 90=center, 180=right), or true/false to center

- id: togglehand
  label: Toggle Hand Raise
  kind: action
  params: []

- id: togglescreenshare
  label: Toggle Screen Share
  kind: action
  params: []

- id: forceKeyframe
  label: Force Keyframe
  kind: action
  params: []

- id: group
  label: Toggle Group
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: joinGroup
  label: Join Group
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: leaveGroup
  label: Leave Group
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: viewGroup
  label: Toggle Group Preview
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: joinViewGroup
  label: Preview Group
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: leaveViewGroup
  label: Stop Group Preview
  kind: action
  params:
    - name: value
      type: integer
      description: Group ID 1-8

- id: getDetails
  label: Get Room State
  kind: query
  params: []

- id: nextSlide
  label: Next PowerPoint Slide
  kind: action
  params: []

- id: prevSlide
  label: Previous PowerPoint Slide
  kind: action
  params: []

- id: soloVideo
  label: Highlight Video
  kind: action
  params:
    - name: value
      type: string
      enum: [true, false, toggle]
      description: Highlight/unhighlight video for all guests (director only)

- id: stopRoomTimer
  label: Stop Room Timer
  kind: action
  params: []

- id: startRoomTimer
  label: Start Room Timer
  kind: action
  params:
    - name: value
      type: integer
      description: Countdown duration in seconds

- id: pauseRoomTimer
  label: Pause Room Timer
  kind: action
  params: []

- id: getGuestList
  label: Get Guest List
  kind: query
  params: []

- id: layout
  label: Set Layout
  kind: action
  params:
    - name: value
      type: integer
      description: Layout index (0=auto mixer, 1+=custom layouts)
```

## Remote Guest Actions (Director)
```yaml
# Target: guest slot (1-99) or stream ID
- id: forward
  label: Transfer Guest
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: string
      description: Destination room ID

- id: addScene
  label: Toggle Guest in Scene
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: integer
      description: Scene ID 0-8 or custom scene name

- id: muteScene
  label: Toggle Guest Mic in Scene
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: integer
      description: Scene ID 0-8 or custom scene name

- id: guestGroup
  label: Toggle Guest in Group
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: integer
      description: Group ID 1-8

- id: guestMic
  label: Toggle Guest Mic
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: guestHangup
  label: Hang Up Guest
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: soloChat
  label: Solo Chat with Guest
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: soloChatBidirectional
  label: Two-Way Solo Chat
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: guestSpeaker
  label: Toggle Guest Speaker
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: guestDisplay
  label: Toggle Guest Video Display
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: sendDirectorChat
  label: Send Chat Overlay to Guest
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: string
      description: Chat message text

- id: sendPinnedDirectorChat
  label: Send Persistent Chat Overlay
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: string
      description: Chat message text

- id: guestForceKeyframe
  label: Force Guest Keyframe
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: guestSoloVideo
  label: Highlight Guest Video
  params:
    - name: target
      type: string
      description: Guest slot or stream ID

- id: guestVolume
  label: Set Guest Microphone Volume
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: integer
      description: Volume 0-100

- id: ptzZoom
  label: Control Guest Zoom
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: number
      description: Zoom delta or absolute (value2 indicates mode)

- id: ptzPan
  label: Control Guest Pan
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: number
      description: Pan delta or absolute (value2 indicates mode)

- id: ptzTilt
  label: Control Guest Tilt
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: number
      description: Tilt delta or absolute (value2 indicates mode)

- id: ptzFocus
  label: Control Guest Focus
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: number
      description: Focus delta or absolute (value2 indicates mode)

- id: ptzAutofocus
  label: Toggle Guest Autofocus
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: boolean

- id: remoteMirror
  label: Set Guest Mirror State
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: string
      enum: [true, false, toggle]

- id: remoteRotate
  label: Rotate Guest Output
  params:
    - name: target
      type: string
      description: Guest slot or stream ID
    - name: value
      type: string
      description: true=+90 step, false=reset, number=explicit rotation
```

## Feedbacks
```yaml
# HTTP API returns: true, false, null, fail, {value}, timeout
# WebSocket returns JSON with state + original request
# State queries return JSON objects
```

## Variables
```yaml
# Room state via getDetails: guest states, connection status
# Guest list via getGuestList: slot positions, stream IDs, labels
```

## Events
```yaml
# WebSocket callback responses include original request data
# Custom fields (e.g. data.cid) available for request linking
```

## Macros
```yaml
# Layout switching via layout action with array of layout objects
# PowerPoint control via nextSlide/prevSlide
# Timer control for room-wide countdowns
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# No safety-critical procedures in source
```

## Notes
WebSocket connection timeout ~1 minute; need reconnect logic and rejoin after timeout. HTTP API uses GET requests only. Double slashes in URL cause issues. API is draft status and may change. <!-- UNRESOLVED: API version compatibility, production readiness -->

## Provenance

```yaml
source_domains:
  - docs.vdo.ninja
  - sdk.vdo.ninja
source_urls:
  - https://docs.vdo.ninja/advanced-settings/api-and-midi-parameters/api/api-reference
  - https://docs.vdo.ninja/advanced-settings/api-and-midi-parameters/api
  - https://sdk.vdo.ninja/docs/api-reference.html
  - https://sdk.vdo.ninja
retrieved_at: 2026-04-30T02:39:35.358Z
last_checked_at: 2026-05-14T18:17:21.319Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:21.319Z
matched_actions: 28
action_count: 28
confidence: high
summary: "All 50 spec actions matched literally in source; transport parameters verified."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
