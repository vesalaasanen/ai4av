---
spec_id: admin/disguise-designer
schema_version: ai4av-public-spec-v1
revision: 3
title: "disguise Designer Transport API Control Spec"
manufacturer: disguise
model_family: Designer
aliases: []
compatible_with:
  manufacturers:
    - disguise
  models:
    - Designer
  firmware: "\"r23.2+\""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains: []
source_urls: []
retrieved_at: 2026-08-31T11:10:14.229Z
last_checked_at: 2026-08-31T11:10:14.229Z
generated_at: 2026-08-31T11:10:14.229Z
firmware_coverage: "\"r23.2+\""
protocol_coverage: []
known_gaps:
  - "source documents only request/response polling; no unsolicited event/notification mechanism described"
  - "source describes individual endpoints, not multi-step sequences"
  - "no safety warnings, interlocks, or power-on sequencing in source"
  - "base URL/port for the Designer HTTP service not stated in source (path prefix `/api/session/transport` documented, host:port left blank); firmware version compatibility not stated; auth (none inferred) not explicitly stated by vendor; playmode string after POST /stop not documented"
  - "model-specific source not located"
verification:
  verdict: verified
  checked_at: 2026-08-31T11:10:14.229Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec action endpoints are present verbatim in the source with matching URLs and ports; no extra source commands remain. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-31
---

# disguise Designer Transport API Control Spec

## Summary
HTTP REST control of disguise Designer's show transport subsystem: load set lists/tracks, control playback (play/stop/loop/return), seek (frame, time, timecode, section, tag, note, track), and adjust per-transport brightness and volume. Base URL path prefix `/api/session/transport`.

The Designer API introduction specifies HTTP port 80. The port is configurable
in d3Manager if it conflicts with another service.

## Transport
```yaml
protocols:
  - http
addressing:
  base_url: http://{designer-host}:80/api/session/transport
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable       # inferred from GET endpoints (activetransport, annotations, setlists, tracks, transports)
- routable        # inferred from per-transport playmode/section/track targeting
- levelable       # inferred from brightness and volume endpoints
```

## Actions
```yaml
- id: get_active_transport
  label: Get Active Transport
  kind: query
  command: "GET /api/session/transport/activetransport"
  params: []

- id: get_annotations
  label: Get Annotations
  kind: query
  command: "GET /api/session/transport/annotations?uid={uid}&name={name}"
  params:
    - name: uid
      type: integer
      description: Track UID (uint64)
    - name: name
      type: string
      description: Track name

- id: set_brightness
  label: Set Brightness
  kind: action
  command: "POST /api/session/transport/brightness"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, brightness: number}

- id: set_engaged
  label: Set Engaged Status
  kind: action
  command: "POST /api/session/transport/engaged"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, engaged: boolean}

- id: goto_frame
  label: Jump to Frame
  kind: action
  command: "POST /api/session/transport/gotoframe"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, frame: integer, playmode: string}

- id: goto_next_section
  label: Jump to Next Section
  kind: action
  command: "POST /api/session/transport/gotonextsection"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, playmode: string}

- id: goto_next_track
  label: Jump to Next Track
  kind: action
  command: "POST /api/session/transport/gotonexttrack"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, playmode: string}

- id: goto_note
  label: Jump to Note
  kind: action
  command: "POST /api/session/transport/gotonote"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, note: string, playmode: string}

- id: goto_prev_section
  label: Jump to Previous Section
  kind: action
  command: "POST /api/session/transport/gotoprevsection"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, playmode: string}

- id: goto_prev_track
  label: Jump to Previous Track
  kind: action
  command: "POST /api/session/transport/gotoprevtrack"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, playmode: string}

- id: goto_section
  label: Jump to Section
  kind: action
  command: "POST /api/session/transport/gotosection"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, section: string, playmode: string}

- id: goto_tag
  label: Jump to Tag
  kind: action
  command: "POST /api/session/transport/gototag"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, type: string, value: string, allowGlobalJump: boolean, playmode: string}

- id: goto_time
  label: Jump to Time
  kind: action
  command: "POST /api/session/transport/gototime"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, time: integer, playmode: string}

- id: goto_timecode
  label: Jump to Timecode
  kind: action
  command: "POST /api/session/transport/gototimecode"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, timecode: string, ignoreTags: boolean, playmode: string}

- id: goto_track
  label: Jump to Track
  kind: action
  command: "POST /api/session/transport/gototrack"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, track: {uid, name}, playmode: string}

- id: play
  label: Play Transport
  kind: action
  command: "POST /api/session/transport/play"
  params:
    - name: transports
      type: array
      description: Array of {uid: string, name: string}

- id: play_loop_section
  label: Loop Section
  kind: action
  command: "POST /api/session/transport/playloopsection"
  params:
    - name: transports
      type: array
      description: Array of {uid: string, name: string}

- id: play_section
  label: Play Section to End
  kind: action
  command: "POST /api/session/transport/playsection"
  params:
    - name: transports
      type: array
      description: Array of {uid: string, name: string}

- id: return_to_start
  label: Return to Start
  kind: action
  command: "POST /api/session/transport/returntostart"
  params:
    - name: transports
      type: array
      description: Array of {uid: string, name: string}

- id: get_setlists
  label: List SetLists
  kind: query
  command: "GET /api/session/transport/setlists"
  params: []

- id: stop
  label: Stop Transport
  kind: action
  command: "POST /api/session/transport/stop"
  params:
    - name: transports
      type: array
      description: Array of {uid: string, name: string}

- id: get_tracks
  label: List Tracks
  kind: query
  command: "GET /api/session/transport/tracks"
  params: []

- id: get_transports
  label: List Transports
  kind: query
  command: "GET /api/session/transport/transports"
  params: []

- id: set_volume
  label: Set Volume
  kind: action
  command: "POST /api/session/transport/volume"
  params:
    - name: transports
      type: array
      description: Array of {transport: {uid, name}, volume: number}
```

## Feedbacks
```yaml
- id: transport_state
  type: object
  description: Returned by GET /activetransport (in `result`) and GET /transports (in top-level `transports` array). Includes engaged (bool), volume (number), brightness (number), playmode (string), currentTrack (object), receivingTimecode (bool), setList (object with tracks array)
- id: multitransport_info
  type: object
  description: Returned by GET /transports in top-level `multitransports` array. Fields: uid, name, engaged (bool), transports (array of member transport references)
- id: playmode
  type: enum
  values: ["play", "loop section", "play to end of section"]
  description: Playmode strings as documented verbatim in source ('play' via POST /play, 'loop section' via POST /playloopsection, 'play to end of section' via POST /playsection)
- id: track_info
  type: object
  description: Returned by /tracks and inside setList. Fields: uid, name, length (number), crossfade (string)
- id: annotations
  type: object
  description: Returned by /annotations. Fields: notes [{time, text}], tags [{time, type, value}], sections [{time, index}]
- id: status
  type: object
  description: All responses include status {code: int, message: string, details: array}. code 0 indicates success per documented examples
```

## Variables
```yaml
```

## Events
```yaml
<!-- UNRESOLVED: source documents only request/response polling; no unsolicited event/notification mechanism described -->
```

## Macros
```yaml
<!-- UNRESOLVED: source describes individual endpoints, not multi-step sequences -->
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
<!-- UNRESOLVED: no safety warnings, interlocks, or power-on sequencing in source -->
```

## Notes
Source is the vendor-documented Transport API only. The wider Designer control surface (timeline composition, render nodes, video routing) is not covered. All endpoints expect JSON bodies wrapped in `transports: []` (most POSTs) or top-level arrays. Status envelope `code: 0` indicates success per documented examples.

GET /activetransport returns the transport selected in the d3State bar; if a multitransport is selected, it returns all sub-transports of that multitransport. GET /transports returns both `transports` and `multitransports` top-level arrays (not under `result`).

<!-- UNRESOLVED: base URL/port for the Designer HTTP service not stated in source (path prefix `/api/session/transport` documented, host:port left blank); firmware version compatibility not stated; auth (none inferred) not explicitly stated by vendor; playmode string after POST /stop not documented -->
````

Upgrade pass done. All 24 source endpoints already in spec — none deleted, IDs preserved. Added: `multitransport_info` feedback, verbatim playmode strings, response-shape notes (activetransport multitransport behavior, /transports top-level keys).

## Provenance

```yaml
source_domains: []
source_urls: []
retrieved_at: 2026-08-31T11:10:14.229Z
last_checked_at: 2026-08-31T11:10:14.229Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-31T11:10:14.229Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec action endpoints are present verbatim in the source with matching URLs and ports; no extra source commands remain. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "source documents only request/response polling; no unsolicited event/notification mechanism described"
- "source describes individual endpoints, not multi-step sequences"
- "no safety warnings, interlocks, or power-on sequencing in source"
- "base URL/port for the Designer HTTP service not stated in source (path prefix `/api/session/transport` documented, host:port left blank); firmware version compatibility not stated; auth (none inferred) not explicitly stated by vendor; playmode string after POST /stop not documented"
- "model-specific source not located"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
