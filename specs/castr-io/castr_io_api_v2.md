---
spec_id: admin/castr-io-embed-player
schema_version: ai4av-public-spec-v1
revision: 1
title: "castr.io Castr Embed Player Control Spec"
manufacturer: castr.io
model_family: "Castr Embed Player"
aliases: []
compatible_with:
  manufacturers:
    - castr.io
  models:
    - "Castr Embed Player"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - developers.castr.com
source_urls:
  - https://developers.castr.com/docs/embed-player-api
retrieved_at: 2026-05-03T15:15:34.477Z
last_checked_at: 2026-06-03T06:28:21.128Z
generated_at: 2026-06-03T06:28:21.128Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "complete iframe postMessage event catalog beyond watch time not documented"
  - "API versioning details beyond title reference to \"v2\" not stated"
  - "no runtime-settable variables beyond embed-time URL parameters"
  - "source mentions postMessage watch-time delivery but no unsolicited event catalog"
  - "no multi-step sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "complete postMessage event schema not documented beyond watch time"
  - "no API versioning info beyond \"v2\" in title"
verification:
  verdict: verified
  checked_at: 2026-06-03T06:28:21.128Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 actions verified against source; exact parameter match (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-03
---

# castr.io Castr Embed Player Control Spec

## Summary
Castr Embed Player is a web-based video player controllable via URL query parameters appended to the embed URL (`https://player.castr.com/{videoId}`). Parameters govern playback behavior (autoplay, loop, seek), audio/multitrack selection, UI visibility, closed captions, external casting, and AirPlay. Optional iframe messaging via `postMessage` provides watch-time feedback.

<!-- UNRESOLVED: complete iframe postMessage event catalog beyond watch time not documented -->
<!-- UNRESOLVED: API versioning details beyond title reference to "v2" not stated -->

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: "https://player.castr.com/{videoId}"
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable  # inferred: iframeMsg returns watch time via postMessage
```

## Actions
```yaml
- id: autoplay
  label: Autoplay
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Controls automatic playback on load

- id: muted
  label: Muted Playback
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enables or disables muted playback

- id: controls
  label: Show Controls
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Controls visibility of player control bar

- id: hideControlbarPlayButton
  label: Hide Control Bar Play Button
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Hides play/pause buttons and disables click-to-pause on video

- id: loop
  label: Loop Playback
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Enables looping for VOD content

- id: pp
  label: Play on Focus Only
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Player starts only when focused

- id: pip
  label: Picture-in-Picture
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Controls PiP option visibility

- id: cast
  label: Google Cast
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Controls Google Cast detection

- id: airplay
  label: AirPlay
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Activates in-player AirPlay on eligible devices

- id: fullscreen
  label: Fullscreen Option
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: Controls fullscreen option visibility

- id: click
  label: Click Interaction
  kind: action
  params:
    - name: state
      type: enum
      values: [on, off]
      description: "off disables click-to-pause and keyboard controls"

- id: h265
  label: H.265 Playback
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enables H.265 playback capability

- id: speed
  label: Playback Speed Control
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enables playback speed control UI

- id: tracks
  label: Set Audio Track Labels
  kind: action
  params:
    - name: labels
      type: string
      description: "Comma-separated track labels, e.g. english,french"

- id: track
  label: Select Audio Tracks
  kind: action
  params:
    - name: selection
      type: string
      description: "Track selector, e.g. v1a1 for single or v1a1a2 for multiple"

- id: defaultTrack
  label: Default Audio Track
  kind: action
  params:
    - name: index
      type: integer
      description: "0-based index into tracks list"

- id: ccTracks
  label: Set Caption Track Labels
  kind: action
  params:
    - name: labels
      type: string
      description: "Comma-separated caption labels, e.g. english,french"

- id: buttons
  label: Show Track Buttons
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enables clickable track-switch buttons beneath player

- id: seekTo
  label: Seek To Position
  kind: action
  params:
    - name: seconds
      type: integer
      description: "Seek position in seconds (VOD only)"

- id: quality
  label: Set Quality
  kind: action
  params:
    - name: level
      type: enum
      values: [highest]
      description: "Force highest resolution (VOD only)"

- id: iframeMsg
  label: Enable Iframe Messaging
  kind: action
  params:
    - name: enabled
      type: boolean
      description: Enables postMessage-based watch-time feedback

- id: ccFontSize
  label: Closed Caption Font Size
  kind: action
  params:
    - name: scale
      type: number
      description: "Font size scale (3, 2, 1.75, 1.5, 1.25, 1, 0.75, 0.5; 1=100%)"

- id: ccFontColor
  label: Closed Caption Font Color
  kind: action
  params:
    - name: color
      type: enum
      values: [white, black, red, green, blue, yellow, magenta, cyan]
      description: "Closed caption font color (default: white)"

- id: offlineText
  label: Offline Message
  kind: action
  params:
    - name: text
      type: string
      description: "Custom offline message (use % for spaces)"
```

## Feedbacks
```yaml
- id: watch_time
  type: number
  description: "Current watch time in seconds, delivered via postMessage when iframeMsg=true"
```

## Variables
```yaml
# UNRESOLVED: no runtime-settable variables beyond embed-time URL parameters
```

## Events
```yaml
# UNRESOLVED: source mentions postMessage watch-time delivery but no unsolicited event catalog
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes
- All parameters are URL query strings set at embed time — not runtime commands to a running player.
- `loop`, `seekTo`, `quality` apply only to VOD; no effect on live streams.
- Invalid parameter values silently ignored — player falls back to defaults.
- Unknown parameters ignored entirely.
<!-- UNRESOLVED: complete postMessage event schema not documented beyond watch time -->
<!-- UNRESOLVED: no API versioning info beyond "v2" in title -->

## Provenance

```yaml
source_domains:
  - developers.castr.com
source_urls:
  - https://developers.castr.com/docs/embed-player-api
retrieved_at: 2026-05-03T15:15:34.477Z
last_checked_at: 2026-06-03T06:28:21.128Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-03T06:28:21.128Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 actions verified against source; exact parameter match (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "complete iframe postMessage event catalog beyond watch time not documented"
- "API versioning details beyond title reference to \"v2\" not stated"
- "no runtime-settable variables beyond embed-time URL parameters"
- "source mentions postMessage watch-time delivery but no unsolicited event catalog"
- "no multi-step sequences described in source"
- "no safety warnings or interlock procedures in source"
- "complete postMessage event schema not documented beyond watch time"
- "no API versioning info beyond \"v2\" in title"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
