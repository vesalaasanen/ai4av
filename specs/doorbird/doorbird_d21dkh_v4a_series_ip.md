---
spec_id: admin/doorbird-d21dkh-v4a-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D21DKH-V4A Series Control Spec"
manufacturer: Doorbird
model_family: "D21DKH-V4A Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D21DKH-V4A Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T21:36:58.199Z
last_checked_at: 2026-07-21T22:27:54.553Z
generated_at: 2026-07-21T22:27:54.553Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not mentioned in source; this device is IP-only"
  - "HTTPS port 443 stated but not user-configurable"
  - "RTSP ports 554 and 8557 not configurable via HTTP API"
  - "UDP ports 6524 and 35344 not configurable"
  - "credential format not specified beyond \"same as DoorBird App\""
  - "rfid, keypad, fingerprint events documented as \"coming soon\""
  - "no explicit multi-step macros documented; user constructs via schedules"
  - "no explicit interlock procedures in source"
  - "RTSP port 554 and RTSP-over-HTTP port 8557 not configurable via HTTP API"
  - "maximum number of schedules/favorites not specified"
  - "maximum audio transmit duration not specified"
  - "maximum history images bounded at index 1..50 in source"
  - "SIP listen port 5060 stated for incoming P2P but not configurable via API"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:27:54.553Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions matched literal endpoints in source; transport parameters verified verbatim. (13 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D21DKH-V4A Series Control Spec

## Summary
The Doorbird D21DKH-V4A is a video door station supporting IP-based control via HTTP REST API on ports 80 (HTTP) and 443 (HTTPS), RTSP video streaming on port 554 (and RTSP-over-HTTP on 8557), plus UDP event broadcasts on ports 6524 and 35344. Controls include door relay activation, light control, live video/image/audio, SIP calling, and schedule/favorite management. Authentication supports Basic/Digest or plaintext HTTP parameters.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source; this device is IP-only -->

## Transport
```yaml
protocols:
  - http
  - rtsp  # added: RTSP interface documented on port 554
  - udp   # added: UDP event broadcasts on ports 6524 and 35344
addressing:
  base_url: http://<device-ip>/
  port: 80  # HTTP; HTTPS also available on TCP port 443 (self-signed cert)
  rtsp_port: 554
  rtsp_over_http_port: 8557
  udp_event_ports:
    - 6524
    - 35344
  # UNRESOLVED: HTTPS port 443 stated but not user-configurable
  # UNRESOLVED: RTSP ports 554 and 8557 not configurable via HTTP API
  # UNRESOLVED: UDP ports 6524 and 35344 not configurable
auth:
  type: basic_digest  # Basic or Digest auth per RFC 2617
  # Alternatively: plaintext http-user and http-password query parameters
  # RTSP: standard RTSP auth only (no parameter authentication)
  # UNRESOLVED: credential format not specified beyond "same as DoorBird App"
```

## Traits
```yaml
- powerable       # door open relay, light relay, restart
- routable        # doorbell, motion, rfid, fingerprint input events
- queryable       # info.cgi, sip.cgi?action=status, video/image/history/monitor
- levelable       # SIP mic_volume / spk_volume (1..100)
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: relay
      type: string
      description: "Optional relay identifier; default triggers physical relay 1. Format: <doorcontrollerID>@<relay>, e.g. '1' or 'gggaaa@1'"
  request: http://<device-ip>/bha-api/open-door.cgi?r=<relay>

- id: light_on
  label: Light On
  kind: action
  params: []
  request: http://<device-ip>/bha-api/light-on.cgi

- id: restart
  label: Restart Device
  kind: action
  params: []
  request: http://<device-ip>/bha-api/restart.cgi

- id: get_session
  label: Get Session ID
  kind: action
  params: []
  request: http://<device-ip>/bha-api/getsession.cgi
  description: Returns session ID valid for 10 minutes and NOTIFICATION_ENCRYPTION_KEY for UDP event decryption

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: session_id
      type: string
  request: http://<device-ip>/bha-api/getsession.cgi?invalidate=<session_id>

- id: list_favorites
  label: List Favorites
  kind: action
  params: []
  request: http://<device-ip>/bha-api/favorites.cgi

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  params:
    - name: action
      type: string
      const: save
    - name: type
      type: string
      enum: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: Optional; omit for new favorite
  request: http://<device-ip>/bha-api/favorites.cgi

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      enum: [sip, http]
    - name: id
      type: integer

- id: list_schedules
  label: List Schedules
  kind: action
  params: []
  request: http://<device-ip>/bha-api/schedule.cgi

- id: save_schedule
  label: Add or Update Schedule
  kind: action
  params:
    - name: input
      type: string
      enum: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: object
      description: JSON array of output event configurations
  request: POST http://<device-ip>/bha-api/schedule.cgi

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      enum: [doorbell, motion, rfid]
    - name: param
      type: string

- id: sip_registration
  label: SIP Registration
  kind: action
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
  request: http://<device-ip>/bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      description: SIP URL to call
  request: http://<device-ip>/bha-api/sip.cgi?action=makecall&url=<url>

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []
  request: http://<device-ip>/bha-api/sip.cgi?action=hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      range: [0, 1]
    - name: mic_volume
      type: integer
      range: [1, 100]
    - name: spk_volume
      type: integer
      range: [1, 100]
    - name: dtmf
      type: integer
      range: [0, 1]
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED: use schedule.cgi. SIP URL to auto-call on doorbell; 'none' to disable."
    - name: relay1_passcode
      type: integer
      range: [0, 99999999]
    - name: incoming_call_enable
      type: integer
      range: [0, 1]
    - name: incoming_call_user
      type: string
    - name: anc
      type: integer
      range: [0, 1]
    - name: ring_time_limit
      type: integer
      range: [10, 300]
    - name: call_time_limit
      type: integer
      range: [30, 300]
  request: http://<device-ip>/bha-api/sip.cgi?action=settings&<params>

- id: sip_reset
  label: SIP Reset
  kind: action
  params: []
  request: http://<device-ip>/bha-api/sip.cgi?action=reset

- id: sip_status
  label: SIP Status
  kind: query
  params: []
  request: http://<device-ip>/bha-api/sip.cgi?action=status

# --- Added in upgrade pass: media endpoints ---

- id: get_live_video
  label: Live Video Stream (HTTP MJPG)
  kind: query
  params: []
  request: http://<device-ip>/bha-api/video.cgi
  description: Continuous multipart/x-mixed-replace JPEG stream, up to 8 fps. Returns 204 if user lacks permission.

- id: get_live_video_rtsp
  label: Live Video Stream (RTSP H.264)
  kind: query
  params:
    - name: resolution
      type: string
      enum: [default, 720p, 1080p]
      description: "default -> rtsp://<device-ip>:554/mpeg/media.amp; 720p -> /mpeg/720p/media.amp (D10x/D21x fw 000129+); 1080p -> /mpeg/1080p/media.amp (D11x only)."
  request: rtsp://<device-ip>:554/mpeg/media.amp
  description: RTSP H.264 stream up to 12 fps. Standard RTSP auth only (no parameter auth). 8557 used for RTSP-over-HTTP.

- id: get_live_image
  label: Live Image Snapshot
  kind: query
  params: []
  request: http://<device-ip>/bha-api/image.cgi
  description: Single JPEG live image. Returns 204 if user lacks permission (watch-always or ring in past 1 min).

- id: get_history_image
  label: History Image
  kind: query
  params:
    - name: index
      type: integer
      range: [1, 50]
      description: 1 = latest history image
    - name: event
      type: string
      enum: [doorbell, motionsensor]
      description: Optional event filter; default is ring history (DoorBird) or input-trigger history (BirdGuard)
  request: http://<device-ip>/bha-api/history.cgi?index=<index>
  description: JPEG history image from cloud storage. Returns 204 without history/motion permission.

- id: monitor_state
  label: Monitor Doorbell/Motion State
  kind: query
  params:
    - name: ring
      type: string
      description: Comma-separated event types, e.g. "doorbell,motionsensor". rfid/keypad coming soon.
  request: http://<device-ip>/bha-api/monitor.cgi?ring=doorbell,motionsensor
  description: Continuous multipart/x-mixed-replace stream reporting doorbell:motionsensor high/low transitions. Up to 8 concurrent streams (HTTP 509 when full).

- id: audio_receive
  label: Live Audio Receive
  kind: query
  params: []
  request: http://<device-ip>/bha-api/audio-receive.cgi
  description: G.711 μ-law (8000 Hz) raw audio stream from device. Returns 204 if user lacks permission.

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  method: POST
  params:
    - name: audio_data
      type: binary
      description: G.711 μ-law audio, Content-Type: audio/basic, HTTP/1.0 recommended
  request: POST http://<device-ip>/bha-api/audio-transmit.cgi
  description: Transmit G.711 μ-law audio to device speaker. Only one consumer may transmit at a time; second is rejected.
```

## Feedbacks
```yaml
- id: door_open_response
  type: json
  description: JSON response from open-door.cgi

- id: light_on_response
  type: json
  description: JSON response from light-on.cgi

- id: device_info
  type: json
  description: Returns firmware version, build number, MAC address, relay configuration, device type
  request: http://<device-ip>/bha-api/info.cgi

- id: sip_status_response
  type: json
  description: Returns SIP registration status with LASTERRORCODE and LASTERRORTEXT

- id: favorites_list
  type: json
  description: Lists all configured favorites (sip and http types)

- id: schedules_list
  type: json
  description: Lists all configured schedules

- id: session_response
  type: json
  description: Returns SESSIONID and NOTIFICATION_ENCRYPTION_KEY for decrypting UDP events

# --- Added in upgrade pass: media stream feedbacks ---

- id: live_video_stream
  type: multipart
  description: multipart/x-mixed-replace JPEG frames from video.cgi (up to 8 fps)

- id: live_video_rtsp_stream
  type: rtsp
  description: H.264 RTSP stream, up to 12 fps, port 554 (RTSP-over-HTTP 8557)

- id: live_image
  type: binary
  description: Single image/jpeg snapshot from image.cgi

- id: history_image
  type: binary
  description: Single image/jpeg history snapshot from history.cgi (index 1..50)

- id: monitor_state_stream
  type: multipart
  description: multipart/x-mixed-replace text/plain frames; doorbell/motionsensor each H (high) or L (low)

- id: audio_receive_stream
  type: binary
  description: Raw G.711 μ-law audio frames from audio-receive.cgi
```

## Variables
```yaml
# SIP configuration variables (set via sip.cgi?action=settings)
- id: sip_enabled
  type: boolean
  description: Enable/disable SIP registration after reboot

- id: sip_mic_volume
  type: integer
  range: [1, 100]

- id: sip_spk_volume
  type: integer
  range: [1, 100]

- id: sip_dtmf
  type: boolean
  description: Enable/disable DTMF support

- id: sip_autocall_doorbell_url
  type: string
  description: "DEPRECATED: use schedule.cgi. SIP URL auto-called on doorbell; 'none' to disable."

- id: sip_relay1_passcode
  type: integer
  range: [0, 99999999]

- id: sip_incoming_call_enable
  type: boolean

- id: sip_incoming_call_user
  type: string

- id: sip_anc
  type: boolean
  description: Acoustic noise cancellation

- id: sip_ring_time_limit
  type: integer
  range: [10, 300]

- id: sip_call_time_limit
  type: integer
  range: [30, 300]
```

## Events
```yaml
# UDP Broadcasts on ports 6524 and 35344
# v2 (current): ChaCha20-Poly1305, key obtained via getsession.cgi (NOTIFICATION_ENCRYPTION_KEY)
# v1 (deprecated, removable): ChaCha20-Poly1305 with Argon2i key stretching
# Keep-alive broadcasts every 7 seconds on same ports - skip these.
#
# v2 packet layout:
#   IDENT(3) = 0xDE 0xAD 0xBE
#   VERSION(1) = 0x02
#   NONCE(8)
#   CIPHERTEXT(34) - first 16 bytes random, discarded after decrypt
# Decrypted plaintext:
#   INTERCOM_ID(6)  - first 6 chars of username
#   EVENT(8)        - doorbell number or "motion", space-padded
#   TIMESTAMP(4)    - Unix timestamp (long)

- id: doorbell_event
  type: string
  description: Doorbell press event; EVENT field contains doorbell number padded with spaces

- id: motion_event
  type: string
  description: Motion sensor triggered event; EVENT field = "motion"

- id: udp_keepalive
  type: string
  description: Keep-alive packet sent every 7 seconds on ports 6524/35344; not an event - skip.

# UNRESOLVED: rfid, keypad, fingerprint events documented as "coming soon"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros documented; user constructs via schedules
```

## Safety
```yaml
confirmation_required_for:
  - open_door       # Security-relevant; source assumes user watches live image before triggering
  - restart         # Disruptive; no diagnostic sound after restart
  - audio_transmit  # One-way audio to doorstep occupant
interlocks: []
# UNRESOLVED: no explicit interlock procedures in source
```

## Notes
- API rate limit: 1 concurrent connection per second; wrong auth blocks IP/user for 1 minute (HTTP 423)
- HTTP 503 returned when video door station already has a live call in progress (single simultaneous A/V call)
- Video/audio streaming: official DoorBird App has precedence over LAN API users; connections can be interrupted at any time
- Live video: up to 8 fps via HTTP MJPG stream; up to 12 fps via RTSP (port 554, RTSP-over-HTTP 8557)
- RTSP authentication: standard RTSP auth (no parameter authentication)
- RTSP resolution paths: `/mpeg/media.amp` (default), `/mpeg/720p/media.amp` (D10x/D21x fw 000129+), `/mpeg/1080p/media.amp` (D11x only)
- Video/audio over HTTPS not available in LAN; must use session ID parameter instead for video.cgi / audio-receive.cgi
- SIP calls terminate after 180 seconds for security; P2P calls supported from firmware 000099 (SIP listen port 5060)
- Min 3 seconds between SIP requests
- UDP event broadcasts include keep-alive packets every 7 seconds (skip)
- UDP event v2 uses ChaCha20-Poly1305; v1 (Argon2i variant) deprecated and removable
- Audio codec: G.711 μ-law (8000 Hz sampling); client must handle AEC/ANR
- Monitor.cgi: max 8 concurrent streams, HTTP 509 when full
- History images: index 1..50 stored in cloud
- Favorites and schedules require firmware 000110 or higher
- Schedule time units: seconds since epoch (UTC) for from-to; seconds from Sunday 0:00 for weekdays
- Schedule constraint: all weekday start times must be multiples of 1800 seconds
- <!-- UNRESOLVED: RTSP port 554 and RTSP-over-HTTP port 8557 not configurable via HTTP API -->
- <!-- UNRESOLVED: UDP ports 6524 and 35344 not configurable -->
- <!-- UNRESOLVED: maximum number of schedules/favorites not specified -->
- <!-- UNRESOLVED: maximum audio transmit duration not specified -->
- <!-- UNRESOLVED: maximum history images bounded at index 1..50 in source -->
- <!-- UNRESOLVED: SIP listen port 5060 stated for incoming P2P but not configurable via API -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T21:36:58.199Z
last_checked_at: 2026-07-21T22:27:54.553Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:27:54.553Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions matched literal endpoints in source; transport parameters verified verbatim. (13 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not mentioned in source; this device is IP-only"
- "HTTPS port 443 stated but not user-configurable"
- "RTSP ports 554 and 8557 not configurable via HTTP API"
- "UDP ports 6524 and 35344 not configurable"
- "credential format not specified beyond \"same as DoorBird App\""
- "rfid, keypad, fingerprint events documented as \"coming soon\""
- "no explicit multi-step macros documented; user constructs via schedules"
- "no explicit interlock procedures in source"
- "RTSP port 554 and RTSP-over-HTTP port 8557 not configurable via HTTP API"
- "maximum number of schedules/favorites not specified"
- "maximum audio transmit duration not specified"
- "maximum history images bounded at index 1..50 in source"
- "SIP listen port 5060 stated for incoming P2P but not configurable via API"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
