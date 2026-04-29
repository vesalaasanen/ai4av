---
schema_version: ai4av-public-spec-v1
device_id: doorbird/doorbird-d2114v
entity_id: doorbird_d2114v
spec_id: admin/doorbird-d2114v
revision: 1
author: admin
title: "Doorbird D2114V Control Spec"
status: published
manufacturer: Doorbird
manufacturer_key: doorbird
model_family: "Doorbird D2114V"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "Doorbird D2114V"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls:
  - https://doorbird.com/downloads/api_lan.pdf
  - https://doorbird.com/api
  - https://doorbird.com/sip
  - https://doorbird.com/widget
  - https://doorbird.com/en/integrations
source_documents:
  - title: "Doorbird public source"
    url: https://doorbird.com/downloads/api_lan.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:20:34.453Z
  - title: "Doorbird public source"
    url: https://doorbird.com/api
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:34.937Z
  - title: "Doorbird public source"
    url: https://doorbird.com/sip
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.339Z
  - title: "Doorbird public source"
    url: https://doorbird.com/widget
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.696Z
  - title: "Doorbird public source"
    url: https://doorbird.com/en/integrations
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:36.152Z
retrieved_at: 2026-04-26T16:20:36.152Z
last_checked_at: 2026-04-23T06:39:48.080Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T06:39:48.080Z
  matched_actions: 23
  action_count: 24
  confidence: high
  summary: "All 23 distinct action paths match verbatim in source; transport (http/https/udp, base_url, basic_digest auth) confirmed; spec comprehensively represents documented API."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2114V Control Spec

## Summary
Doorbird D2114V is a video door station with IP-based control via HTTP/HTTPS REST API, UDP event broadcasts, RTSP video streaming, and SIP voice intercom. Authentication uses Basic/Digest HTTP auth or plaintext http-user/http-password parameters.

<!-- UNRESOLVED: physical serial/RS-232 not mentioned in source -->

## Transport
```yaml
protocols:
  - http
  - https
  - udp
addressing:
  base_url: http://<device-ip>/
  # UNRESOLVED: port number not stated for SIP (5060 inferred from typical SIP, not from source)
auth:
  type: basic_digest  # Basic or Digest auth per RFC 2617; also supports plaintext http-user/http-password params
```

## Traits
```yaml
# Inferred from command presence:
# - powerable: light-on command present
# - queryable: info.cgi, sip.cgi?action=status, monitor.cgi present
# - routable: not applicable (door station, not a matrix switcher)
# - levelable: mic_volume, spk_volume in SIP settings
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: Optional session ID to invalidate
  method: GET
  path: /bha-api/getsession.cgi

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay to trigger, e.g. '1' or 'gggaaa@1' (DoorController). Default: relay 1"
  method: GET
  path: /bha-api/open-door.cgi

- id: light_on
  label: Light On
  kind: action
  params: []
  method: GET
  path: /bha-api/light-on.cgi

- id: get_live_video
  label: Live Video Request
  kind: action
  params: []
  method: GET
  path: /bha-api/video.cgi
  response: multipart/x-mixed-replace JPEG stream

- id: get_live_image
  label: Live Image Request
  kind: action
  params: []
  method: GET
  path: /bha-api/image.cgi
  response: image/jpeg

- id: get_history_image
  label: History Image Request
  kind: action
  params:
    - name: index
      type: integer
      description: Index of history image (1 = latest, range 1..50)
    - name: event
      type: string
      description: "Event type: 'doorbell' or 'motionsensor'"
  method: GET
  path: /bha-api/history.cgi

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "Event types to monitor: 'doorbell' or 'motionsensor', comma-separated"
  method: GET
  path: /bha-api/monitor.cgi
  response: multipart/x-mixed-replace text/plain stream

- id: get_device_info
  label: Device Info Request
  kind: action
  params: []
  method: GET
  path: /bha-api/info.cgi
  response: JSON (firmware, build number, relays, device type)

- id: list_favorites
  label: List Favorites
  kind: action
  params: []
  method: GET
  path: /bha-api/favorites.cgi

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'save'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: title
      type: string
      description: Name/title of favorite
    - name: value
      type: string
      description: URL or SIP address
    - name: id
      type: integer
      description: Optional ID to change existing favorite
  method: POST
  path: /bha-api/favorites.cgi

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'remove'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: id
      type: integer
      description: ID of favorite to delete
  method: GET
  path: /bha-api/favorites.cgi

- id: list_schedules
  label: List Schedules
  kind: action
  params: []
  method: GET
  path: /bha-api/schedule.cgi

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      description: "'doorbell', 'motion', 'rfid', or 'fingerprint'"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: json
      description: JSON array of output configurations
  method: POST
  path: /bha-api/schedule.cgi

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value: 'remove'"
    - name: input
      type: string
      description: "'doorbell', 'motion', or 'rfid'"
    - name: param
      type: string
      description: Doorbell number or transponder ID
  method: GET
  path: /bha-api/schedule.cgi

- id: restart
  label: Restart Device
  kind: action
  params: []
  method: GET
  path: /bha-api/restart.cgi

- id: sip_register
  label: SIP Registration
  kind: action
  params:
    - name: user
      type: string
      description: SIP proxy authentication user
    - name: password
      type: string
      description: SIP proxy authentication password
    - name: url
      type: string
      description: IP/hostname of SIP proxy
  method: GET
  path: /bha-api/sip.cgi

- id: sip_make_call
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)
  method: GET
  path: /bha-api/sip.cgi

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      description: "0..1, enable SIP registration after reboot"
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume (default: 33)"
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume (default: 70)"
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1, enable incoming calls"
    - name: incoming_call_user
      type: string
      description: Allowed SIP user (e.g. sip:10.0.0.1:5060)
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation (default: 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300, max ringing time in seconds (default: 300)"
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration in seconds (default: 300)"
  method: GET
  path: /bha-api/sip.cgi

- id: sip_status
  label: SIP Status
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi

- id: receive_audio
  label: Live Audio Receive
  kind: action
  params: []
  method: GET
  path: /bha-api/audio-receive.cgi
  response: G.711 μ-law audio stream

- id: transmit_audio
  label: Live Audio Transmit
  kind: action
  params: []
  method: POST
  path: /bha-api/audio-transmit.cgi
  note: "Codec: G.711 μ-law, 8000 Hz sampling. AEC/ANR must be done client-side."

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  params:
    - name: resolution
      type: string
      description: "Optional resolution: '720p' or '1080p' (D11x only)"
  path: rtsp://<device-ip>:<port>/mpeg/media.amp
  note: "Port 554 default, RTSP-over-HTTP on 8557. H.264/MPEG4. Auth: standard RTSP auth (no parameter auth)"
```

## Feedbacks
```yaml
- id: doorbell_event
  type: string
  description: Doorbell trigger notification via UDP broadcast

- id: motion_event
  type: string
  description: Motion sensor trigger notification via UDP broadcast

- id: rfid_event
  type: string
  description: RFID event notification via UDP broadcast (documented as "coming soon" in source)

- id: sip_registration_status
  type: enum
  values: [registered, not_registered]
  description: SIP registration state from sip.cgi?action=status

- id: door_open_state
  type: boolean
  description: Door relay state (triggered via open-door.cgi)

- id: light_state
  type: boolean
  description: Light relay state (triggered via light-on.cgi)
```

## Variables
```yaml
- id: mic_volume
  type: integer
  range: [1, 100]
  default: 33
  description: Microphone volume for SIP calls

- id: spk_volume
  type: integer
  range: [1, 100]
  default: 70
  description: Speaker volume for SIP calls

- id: sip_enable
  type: boolean
  description: Enable/disable SIP registration after reboot

- id: dtmf_enabled
  type: boolean
  description: Enable/disable DTMF support for SIP calls

- id: ring_time_limit
  type: integer
  range: [10, 300]
  default: 300
  description: Maximum ringing time in seconds

- id: call_time_limit
  type: integer
  range: [30, 300]
  default: 300
  description: Maximum call duration in seconds
```

## Events
```yaml
# UDP broadcast events (ports 6524 and 35344)
# ChaCha20-Poly1305 encrypted (v2, as of November 2023)
# Decrypted payload contains:
#   - INTERCOM_ID: first 6 chars of username
#   - EVENT: doorbell or motion, padded to 8 chars
#   - TIMESTAMP: Unix timestamp

- id: doorbell_trigger
  type: string
  description: Doorbell pressed, triggers UDP broadcast

- id: motion_trigger
  type: string
  description: Motion sensor detected, triggers UDP broadcast

- id: keep_alive
  type: notice
  description: UDP keep-alive broadcast every 7 seconds on ports 6524 and 35344 (can be ignored)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
# Note: schedules can combine input events (doorbell, motion) with multiple outputs (HTTP notification, SIP call, relay trigger)
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - "Audio AEC/ANR must be implemented client-side — device does not provide echo cancellation for third-party integration"
  - "Video stream interrupted when official DoorBird App requests stream"
  - "Audio connection interrupted when official DoorBird App requests talk"
  - "SIP call terminates after 180 seconds (security auto-hangup)"
  - "Device allows only 1 concurrent API connection per second"
  - "IP blocked for 1 minute after extensive wrong credentials (HTTP 423)"
# UNRESOLVED: power sequencing, fault recovery — not stated in source
```

## Notes
- Device supports both HTTP (port 80) and HTTPS (port 443) for API access. Self-signed certificate pre-installed.
- Video/audio streaming via HTTPS requires session ID to avoid plaintext credential transmission.
- Session ID valid for 10 minutes; obtained via getsession.cgi.
- RTSP video: port 554 (default), RTSP-over-HTTP on 8557. Requires standard RTSP authentication.
- SIP port 5060 (default, configurable via proxy address with colon port notation).
- Favorites and schedules require firmware 000110 or higher.
- UDP event broadcasts on ports 6524 and 35344 use ChaCha20-Poly1305 encryption (v2).
- Rate limit: 1 concurrent API connection per second; 1-minute IP block after excessive auth failures (HTTP 423).
- Only one simultaneous audio/video call; SIP call limit 180 seconds.
<!-- UNRESOLVED: physical RS-232 serial configuration not present in source -->
<!-- UNRESOLVED: firmware version compatibility ranges not stated -->
<!-- UNRESOLVED: voltage/power specifications not in source -->

## Provenance

```yaml
source_urls:
  - https://doorbird.com/downloads/api_lan.pdf
  - https://doorbird.com/api
  - https://doorbird.com/sip
  - https://doorbird.com/widget
  - https://doorbird.com/en/integrations
source_documents:
  - title: "Doorbird public source"
    url: https://doorbird.com/downloads/api_lan.pdf
    stage: discovery_validation
    content_type: application/pdf
    checked_at: 2026-04-26T16:20:34.453Z
  - title: "Doorbird public source"
    url: https://doorbird.com/api
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:34.937Z
  - title: "Doorbird public source"
    url: https://doorbird.com/sip
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.339Z
  - title: "Doorbird public source"
    url: https://doorbird.com/widget
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:35.696Z
  - title: "Doorbird public source"
    url: https://doorbird.com/en/integrations
    stage: discovery_validation
    content_type: text/html
    checked_at: 2026-04-26T16:20:36.152Z
retrieved_at: 2026-04-26T16:20:36.152Z
last_checked_at: 2026-04-23T06:39:48.080Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:39:48.080Z
matched_actions: 23
action_count: 24
confidence: high
summary: "All 23 distinct action paths match verbatim in source; transport (http/https/udp, base_url, basic_digest auth) confirmed; spec comprehensively represents documented API."
```

## Known Gaps

```yaml
[]
```
