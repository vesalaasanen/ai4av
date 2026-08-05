---
spec_id: admin/doorbird-d2101fv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2101FV Series Control Spec"
manufacturer: Doorbird
model_family: D2101FV
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2101FV
    - "D2101FV Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:48:37.368Z
last_checked_at: 2026-07-21T22:24:51.457Z
generated_at: 2026-07-21T22:24:51.457Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "D2101FV model specifically not mentioned in source — generic D21x series referenced. RTSP 720p stream requires firmware 129+ for D21x models."
  - "no discrete settable parameters found outside of action params"
  - "no explicit multi-step sequences described in source"
  - "no safety warnings or interlock procedures stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:24:51.457Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literally in source; transport parameters verified for HTTP/TCP/UDP with ports 80/443/554/8557/5060/6524/35344; source command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-22
---

# Doorbird D2101FV Series Control Spec

## Summary
Doorbird D2101FV is an IP-connected video door station supporting HTTP/HTTPS control API, RTSP video streaming, SIP VoIP, and UDP event broadcasts. Third-party integration via REST API on ports 80/443, RTSP on 554/8557, SIP on 5060, and event monitoring on UDP 6524/35344. Authentication via Basic/Digest auth (RFC 2617) or plaintext HTTP params.

<!-- UNRESOLVED: D2101FV model specifically not mentioned in source — generic D21x series referenced. RTSP 720p stream requires firmware 129+ for D21x models. -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: http://<device-ip>/bha-api
  port: 80
  https_port: 443  # encrypted HTTP for third-party integrations in LAN
auth:
  type: basic  # Basic or Digest auth per RFC 2617; plaintext http-user/http-password params also supported
rtsp:
  port: 554
  alt_port: 8557  # RTSP-over-HTTP protocol
sip:
  port: 5060
udp_event:
  ports: [6524, 35344]
```

## Traits
```yaml
- powerable       # restart.cgi present
- routable        # input/output event routing via schedules
- queryable       # info.cgi, sip.cgi?action=status, schedule.cgi, favorites.cgi, monitor.cgi
- levelable       # mic_volume, spk_volume params in sip.cgi
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={invalidate}"
  params:
    - name: invalidate
      type: string
      description: "Session ID to invalidate"

- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "Relay to trigger: 1, 2, or <doorcontrollerID>@<relay>. Omit to trigger physical relay1."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: get_info
  label: Get Device Info
  kind: action
  command: "GET /bha-api/info.cgi"
  params: []

- id: live_video
  label: Live Video Stream (MJPG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []

- id: live_image
  label: Live Image (JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []

- id: history_image
  label: History Image Request
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "Index of history image, 1..50, where 1 is the latest"
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor (optional)"

- id: monitor
  label: Monitor Doorbell/Motion State
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor"

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: audio_transmit
  label: Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params: []

- id: rtsp_video
  label: RTSP Live Video (default)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []

- id: rtsp_video_720p
  label: RTSP Live Video (720p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []

- id: rtsp_video_1080p
  label: RTSP Live Video (1080p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []

- id: rtsp_video_http
  label: RTSP-over-HTTP Live Video
  kind: action
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []

- id: list_favorites
  label: List Favorites
  kind: action
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add/Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: "Fixed: save"
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: "optional: existing favorite ID to update"

- id: remove_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: "Fixed: remove"
    - name: type
      type: string
    - name: id
      type: integer

- id: list_schedules
  label: List Schedules
  kind: action
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add/Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
    - name: output
      type: object
      description: "JSON output configuration array"

- id: remove_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: "Fixed: remove"
    - name: input
      type: string
    - name: param
      type: string

- id: sip_register
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: action
      type: string
      description: "Fixed: registration"
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: action
      type: string
      description: "Fixed: makecall"
    - name: url
      type: string

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params:
    - name: action
      type: string
      description: "Fixed: hangup"

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: action
      type: string
      description: "Fixed: settings"
    - name: enable
      type: integer
      description: "0..1, enable/disable SIP registration after reboot, default 0"
    - name: mic_volume
      type: integer
      description: "1..100, default 33"
    - name: spk_volume
      type: integer
      description: "1..100, default 70"
    - name: dtmf
      type: integer
      description: "0..1, default 0"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL to auto-call on doorbell, or 'none'"
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for triggering door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1, default 0"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user authenticated for DoorBird, e.g. sip:10.0.0.1:5060"
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation, default 1"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds, default 300"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds, default 300"

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params:
    - name: action
      type: string
      description: "Fixed: status"

- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params:
    - name: action
      type: string
      description: "Fixed: reset"
```

## Feedbacks
```yaml
- id: session_response
  type: object
  description: JSON with SESSIONID and NOTIFICATION_ENCRYPTION_KEY from getsession.cgi

- id: info_response
  type: object
  description: JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS, DEVICE-TYPE

- id: video_stream
  type: stream
  description: Multipart JPEG stream (multipart/x-mixed-replace), up to 8 fps

- id: image_response
  type: binary
  description: Single JPEG image (image/jpeg)

- id: history_image_response
  type: binary
  description: JPEG history image from cloud storage

- id: audio_receive_stream
  type: stream
  description: G.711 μ-law audio (8000 Hz), raw audio data

- id: favorites_list
  type: object
  description: JSON object with sip and http favorite arrays

- id: schedule_list
  type: array
  description: JSON array of schedule entries with input/output/schedule objects

- id: doorbell_monitor
  type: string
  description: "Continuous multipart stream, doorbell:H/L or motionsensor:H/L"
  values: ["doorbell:H", "doorbell:L", "motionsensor:H", "motionsensor:L"]

- id: sip_status_response
  type: object
  description: JSON with LASTERRORCODE and LASTERRORTEXT

- id: http_status_codes
  type: enum
  description: HTTP status codes returned by API
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
```

## Variables
```yaml
# UNRESOLVED: no discrete settable parameters found outside of action params
# sip.cgi settings are actions, not independent variables
```

## Events
```yaml
- id: doorbell_event
  type: object
  description: UDP broadcast on ports 6524/35344. ChaCha20-Poly1305 encrypted (v2). Fields: INTERCOM_ID, EVENT, TIMESTAMP
  payload:
    - name: INTERCOM_ID
      type: string
      description: "First 6 digits of username"
    - name: EVENT
      type: string
      description: "Doorbell number or 'motion', padded with spaces"
    - name: TIMESTAMP
      type: long
      description: Unix timestamp
  ports: [6524, 35344]
  encryption: "ChaCha20-Poly1305 (v2); v1 Argon2i deprecated"

- id: motionsensor_event
  type: object
  description: Same UDP broadcast format as doorbell_event, EVENT='motion'

- id: udp_keepalive
  type: none
  description: Keep-alive broadcasts every 7 seconds on ports 6524/35344; not relevant for event decryption
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
# Source mentions schedule entries combine input event + output action + time window
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures stated in source
# Note: device performs no safety checks on door open - operator responsible for verifying line of sight
```

## Notes
HTTP API base path: `/bha-api/`. Video/audio streaming requires session ID for HTTPS to avoid plaintext credentials. RTSP requires standard RTSP auth (no parameter auth). UDP event broadcasts v2 use ChaCha20-Poly1305; v1 (Argon2i) deprecated. SIP call terminates at 180s for security. API rate limit: 1 concurrent connection/sec; excessive auth failures block IP for 1 minute (HTTP 423). Video stream interrupted if official DoorBird App connects — app has precedence. Audio codec must be G.711 μ-law (8000 Hz). AEC/ANR required on client side for audio transmission. SIP requires "API operator" permission. Firmware 000110+ required for favorites/schedules. Firmware 000108+ required for relay config in info.cgi. RTSP 720p requires firmware 129+ for D10x/D21x; 1080p supported by D11x only. Monitor.cgi allows up to 8 concurrent streams (HTTP 509 when all busy).

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:48:37.368Z
last_checked_at: 2026-07-21T22:24:51.457Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:24:51.457Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literally in source; transport parameters verified for HTTP/TCP/UDP with ports 80/443/554/8557/5060/6524/35344; source command catalogue fully represented. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "D2101FV model specifically not mentioned in source — generic D21x series referenced. RTSP 720p stream requires firmware 129+ for D21x models."
- "no discrete settable parameters found outside of action params"
- "no explicit multi-step sequences described in source"
- "no safety warnings or interlock procedures stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
