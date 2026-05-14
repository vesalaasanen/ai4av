---
spec_id: admin/doorbird-d2101v_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2101V Series Control Spec"
manufacturer: Doorbird
model_family: "D2101V Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D2101V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:36:57.929Z
generated_at: 2026-04-23T05:36:57.929Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T05:36:57.929Z
  matched_actions: 25
  action_count: 25
  confidence: high
  summary: "All 25 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2101V Series Control Spec

## Summary
The Doorbird D2101V Series is a video door station with IP-based control via HTTP CGI endpoints on port 80 (HTTP) and 443 (HTTPS), RTSP video streaming, SIP telephony support, and UDP event broadcasts for monitoring doorbell, motion, and sensor events.
<!-- UNRESOLVED: specific model variants (D2101V, D2101FV, etc.) not enumerated in source -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 80
  base_url: http://<device-ip>/bha-api/
auth:
  type: basic  # stated: Basic or Digest authentication per RFC 2617
```

## Traits
```yaml
queryable: true
levelable: true
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      required: false
      description: "Relay to trigger, e.g. '1' or 'gggaaa@1' (DoorControllerID@relay)"
  http_path: /bha-api/open-door.cgi
  http_method: GET

- id: light_on
  label: Light On
  kind: action
  params: []
  http_path: /bha-api/light-on.cgi
  http_method: GET

- id: restart
  label: Restart Device
  kind: action
  params: []
  http_path: /bha-api/restart.cgi
  http_method: GET

- id: get_session
  label: Get Session ID
  kind: action
  params: []
  http_path: /bha-api/getsession.cgi
  http_method: GET

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
      required: true
      description: Session ID to invalidate
  http_path: /bha-api/getsession.cgi
  http_method: GET

- id: get_video
  label: Live Video Stream (MJPEG)
  kind: action
  params: []
  http_path: /bha-api/video.cgi
  http_method: GET

- id: get_image
  label: Live Image (JPEG)
  kind: action
  params: []
  http_path: /bha-api/image.cgi
  http_method: GET

- id: get_history_image
  label: History Image
  kind: action
  params:
    - name: index
      type: integer
      required: true
      description: Index of history image (1 = latest)
    - name: event
      type: string
      required: false
      description: "Event type: doorbell or motionsensor"
  http_path: /bha-api/history.cgi
  http_method: GET

- id: monitor_events
  label: Monitor Events (Multipart Stream)
  kind: action
  params:
    - name: ring
      type: string
      required: true
      description: "Event types to monitor: doorbell,motionsensor"
  http_path: /bha-api/monitor.cgi
  http_method: GET

- id: audio_receive
  label: Receive Live Audio (G.711 μ-law)
  kind: action
  params: []
  http_path: /bha-api/audio-receive.cgi
  http_method: GET

- id: audio_transmit
  label: Transmit Live Audio (G.711 μ-law)
  kind: action
  params: []
  http_path: /bha-api/audio-transmit.cgi
  http_method: POST

- id: get_info
  label: Device Info
  kind: action
  params: []
  http_path: /bha-api/info.cgi
  http_method: GET

- id: list_favorites
  label: List Favorites
  kind: action
  params: []
  http_path: /bha-api/favorites.cgi
  http_method: GET

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  params:
    - name: action
      type: string
      required: true
      description: Fixed value "save"
    - name: type
      type: string
      required: true
      description: "sip or http"
    - name: title
      type: string
      required: true
      description: Name or short description
    - name: value
      type: string
      required: true
      description: URL or SIP target
    - name: id
      type: integer
      required: false
      description: ID of existing favorite to change
  http_path: /bha-api/favorites.cgi
  http_method: POST

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      required: true
      description: Fixed value "remove"
    - name: type
      type: string
      required: true
      description: "sip or http"
    - name: id
      type: integer
      required: true
      description: ID of favorite to delete
  http_path: /bha-api/favorites.cgi
  http_method: POST

- id: list_schedules
  label: List Schedules
  kind: action
  params: []
  http_path: /bha-api/schedule.cgi
  http_method: GET

- id: add_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      required: true
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      required: false
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: json
      required: true
      description: JSON array of output action configurations
  http_path: /bha-api/schedule.cgi
  http_method: POST

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  params:
    - name: action
      type: string
      required: true
      description: Fixed value "remove"
    - name: input
      type: string
      required: true
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      required: false
      description: Doorbell number or transponder ID
  http_path: /bha-api/schedule.cgi
  http_method: GET

- id: sip_register
  label: SIP Registration
  kind: action
  params:
    - name: user
      type: string
      required: true
      description: SIP proxy authentication user
    - name: password
      type: string
      required: true
      description: SIP proxy authentication password
    - name: url
      type: string
      required: true
      description: SIP proxy IP/hostname
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      required: true
      description: SIP URL to call
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      required: false
      description: "0..1, enable SIP after reboot"
    - name: mic_volume
      type: integer
      required: false
      description: "1..100, microphone volume"
    - name: spk_volume
      type: integer
      required: false
      description: "1..100, speaker volume"
    - name: dtmf
      type: integer
      required: false
      description: "0..1, enable DTMF support"
    - name: relay1_passcode
      type: integer
      required: false
      description: "0..99999999, pincode for door relay"
    - name: incoming_call_enable
      type: integer
      required: false
      description: "0..1, enable incoming calls"
    - name: incoming_call_user
      type: string
      required: false
      description: Allowed SIP user, e.g. "sip:10.0.0.1:5060"
    - name: anc
      type: integer
      required: false
      description: "0..1, acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      required: false
      description: "10..300, max ringing time in seconds"
    - name: call_time_limit
      type: integer
      required: false
      description: "30..300, max call duration in seconds"
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: sip_status
  label: SIP Status
  kind: action
  params: []
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params: []
  http_path: /bha-api/sip.cgi
  http_method: GET

- id: rtsp_video
  label: RTSP Video Stream
  kind: action
  params:
    - name: resolution
      type: string
      required: false
      description: "media.amp (default), /720p/media.amp, or /1080p/media.amp"
  http_path: rtsp://<device-ip>:<port>/mpeg/media.amp
  http_method: GET
```

## Feedbacks
```yaml
- id: return_code
  type: enum
  values:
    - "1"
    - "0"
  description: "JSON return code: 1 = success, 0 = error"

- id: http_status
  type: enum
  values:
    - "200"
    - "204"
    - "400"
    - "401"
    - "423"
    - "500"
    - "503"
    - "507"
  description: HTTP response status codes

- id: sip_error
  type: string
  description: "LASTERRORCODE and LASTERRORTEXT from sip.cgi status response"
```

## Variables
```yaml
- id: mic_volume
  type: integer
  range: 1..100
  default: 33
  description: Microphone volume for SIP calls

- id: spk_volume
  type: integer
  range: 1..100
  default: 70
  description: Speaker volume for SIP calls

- id: sip_enable
  type: boolean
  description: Enable or disable SIP registration after reboot

- id: sip_dtmf
  type: boolean
  description: Enable or disable DTMF support

- id: sip_anc
  type: boolean
  default: true
  description: Enable or disable acoustic noise cancellation

- id: sip_ring_time_limit
  type: integer
  range: 10..300
  default: 300
  description: Maximum ringing time in seconds

- id: sip_call_time_limit
  type: integer
  range: 30..300
  default: 300
  description: Maximum call duration in seconds
```

## Events
```yaml
- id: doorbell_event
  type: string
  description: Doorbell press event, received via UDP broadcast on ports 6524 and 35344

- id: motion_event
  type: string
  description: Motion sensor trigger event

- id: rfid_event
  type: string
  description: RFID transponder event

- id: keypad_event
  type: string
  description: Keypad code event

- id: fingerprint_event
  type: string
  description: Fingerprint scan event
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - description: "Door opening requires user to watch live image; returns HTTP 204 if no 'watch always' permission and no recent ring event"
    requires_permission: watch_always
  - description: "Audio transmission requires AEC/ANR on client side (not provided by device)"
  - description: "SIP call auto-terminates after 180 seconds"
  - description: "RTSP/video stream may be interrupted when official DoorBird App requests the stream"
```

## Notes
- HTTP API base path: `/bha-api/`
- HTTPS available on port 443 with self-signed certificate
- RTSP video on port 554; RTSP-over-HTTP on port 8557
- SIP uses port 5060
- UDP event broadcasts on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted v2 protocol)
- Session ID valid for 10 minutes, obtained via `getsession.cgi`
- Favorites and schedules require firmware 000110 or higher; info.cgi includes relay config from firmware 000108
- Video streaming not available over HTTPS in LAN; must use HTTP with session ID for secure video
- `monitor.cgi` supports up to 8 concurrent streams; returns HTTP 509 when all busy
- API rate limit: 1 concurrent connection per second; excessive auth failures block IP for 1 minute (HTTP 423)
- Audio codec for API: G.711 μ-law at 8000 Hz sampling
<!-- UNRESOLVED: full command table for all CGI endpoints not enumerated in source -->
<!-- UNRESOLVED: relay contact ratings or electrical specifications not stated -->
<!-- UNRESOLVED: specific D2101V model variants (e.g., D2101V, D2101FV) not distinguished -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T05:36:57.929Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T05:36:57.929Z
matched_actions: 25
action_count: 25
confidence: high
summary: "All 25 spec actions matched verbatim in source; transport parameters verified; bidirectional coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
