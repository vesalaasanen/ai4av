---
spec_id: admin/doorbird-d1101v_series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1101V Series Control Spec"
manufacturer: Doorbird
model_family: "D1101V Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D1101V Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:28:35.584Z
last_checked_at: 2026-07-21T22:22:17.882Z
generated_at: 2026-07-21T22:22:17.882Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "physical relay count not specified in source, only paired DoorController relays mentioned in info.cgi response"
  - "Variables section not fully populated - source describes SIP settings as action parameters"
  - "no explicit multi-step sequences described in source"
  - "safety warnings or interlock procedures not explicitly stated in source"
  - "physical specifications (voltage, current, power) not stated in source"
  - "firmware version compatibility range not stated in source"
  - "exact number of physical relays not stated in source"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:22:17.882Z
  matched_actions: 24
  action_count: 24
  confidence: medium
  summary: "All 24 spec actions match source literals; transport (HTTP port 80/443, RTSP 554, UDP 6524/35344, basic_digest auth, /bha-api base) verified. (7 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D1101V Series Control Spec

## Summary
The Doorbird D1101V Series is an IP-based video door station controllable via HTTP LAN API, RTSP for video streaming, SIP for voice calls, and UDP for event monitoring. The device supports Basic/Digest authentication (RFC 2617) or plaintext HTTP parameters, with HTTPS available on port 443 (self-signed certificate) and HTTP on port 80.

<!-- UNRESOLVED: physical relay count not specified in source, only paired DoorController relays mentioned in info.cgi response -->

## Transport
```yaml
protocols:
  - http
  - udp
  - rtsp
addressing:
  base_url: http://<device-ip>/bha-api
auth:
  type: basic_digest  # RFC 2617 Basic or Digest authentication; also supports plaintext http-user/http-password parameters
# HTTP port 80; HTTPS port 443 (self-signed cert, video/audio streaming excluded)
# RTSP port 554 (standard); RTSP-over-HTTP port 8557
# SIP listener port 5060 (firmware 000099+, P2P calls)
# UDP event broadcasts: ports 6524 and 35344 (keepalive every 7s, ignore)
```

## Traits
```yaml
# powerable not applicable - no power on/off commands in source
queryable: true   # inferred from info.cgi / sip.cgi?action=status returning device state
routable: true    # inferred from open-door.cgi and light-on.cgi relay control
levelable: true   # inferred from sip.cgi mic_volume/spk_volume level parameters
```

## Actions
```yaml
- id: live_video
  label: Live Video Request
  kind: action
  command: "GET /bha-api/video.cgi"  # HTTP MJPEG stream; RTSP alt: rtsp://<device-ip>:554/{resolution}
  params:
    - name: resolution
      type: string
      description: Video resolution / RTSP path (optional, defaults to system config)
      values: [mpeg/media.amp, mpeg/720p/media.amp, mpeg/1080p/media.amp]
    - name: sessionid
      type: string
      description: Optional session ID for HTTPS streaming to avoid plaintext credentials

- id: live_image
  label: Live Image Request
  kind: action
  command: "GET /bha-api/image.cgi"
  params:
    - name: sessionid
      type: string
      description: Optional session ID for HTTPS requests
      required: false

- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={relay}"
  params:
    - name: relay
      type: string
      description: "Door controller ID and relay, e.g. '1' or 'gggaaa@1'; omit for physical relay 1"

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History Image Request
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: History image index (1-based, 1 = latest)
    - name: event
      type: string
      description: "Event type: doorbell or motionsensor"
      values: [doorbell, motionsensor]

- id: monitor_events
  label: Monitor Events
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: Event types to monitor
      values: [doorbell, motionsensor]

- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params:
    - name: sessionid
      type: string
      description: Optional session ID for HTTPS streaming
      required: false

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"  # Content-Type: audio/basic, G.711 μ-law 8000Hz
  params:
    - name: sessionid
      type: string
      description: Optional session ID for HTTPS streaming
      required: false

- id: get_session
  label: Create Session ID
  kind: query
  command: "GET /bha-api/getsession.cgi"  # returns SESSIONID (10 min validity) + NOTIFICATION_ENCRYPTION_KEY
  params: []

- id: invalidate_session
  label: Invalidate Session ID
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Session ID to destroy

- id: get_info
  label: Info Request
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      const: save
    - name: type
      type: string
      values: [sip, http]
    - name: title
      type: string
    - name: value
      type: string
    - name: id
      type: integer
      description: Optional; omit for new favorite

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      const: remove
    - name: type
      type: string
      values: [sip, http]
    - name: id
      type: integer

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"  # JSON body: {input, param, output:[{event,param,schedule}]}
  params:
    - name: input
      type: string
      values: [doorbell, motion, rfid, fingerprint]
    - name: param
      type: string
    - name: output
      type: object

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      values: [doorbell, motion, rfid]
    - name: param
      type: string

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: action
      type: string
      const: registration
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
      const: makecall
    - name: url
      type: string

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params:
    - name: action
      type: string
      const: hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: action
      type: string
      const: settings
    - name: enable
      type: integer
    - name: mic_volume
      type: integer
    - name: spk_volume
      type: integer
    - name: dtmf
      type: integer
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi; SIP URL to auto-call on doorbell, 'none' to disable"
    - name: relay1_passcode
      type: integer
    - name: incoming_call_enable
      type: integer
    - name: incoming_call_user
      type: string
    - name: anc
      type: integer
    - name: ring_time_limit
      type: integer
    - name: call_time_limit
      type: integer

- id: sip_status
  label: SIP Status Query
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params:
    - name: action
      type: string
      const: status

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params:
    - name: action
      type: string
      const: reset
```

## Feedbacks
```yaml
- id: info_response
  type: object
  description: Device info including firmware version, build number, MAC address, relays, device type

- id: session_response
  type: object
  description: "getsession.cgi JSON: RETURNCODE, SESSIONID (10 min validity), NOTIFICATION_ENCRYPTION_KEY (32-64 bytes)"

- id: favorites_list
  type: object
  description: JSON containing sip and http favorites

- id: schedule_list
  type: object
  description: JSON array of schedule entries

- id: sip_status_response
  type: object
  description: SIP registration status with LASTERRORCODE and LASTERRORTEXT

- id: monitor_event
  type: string
  description: "Doorbell or motion state changes: 'H' (high/triggered) or 'L' (low/idle)"

- id: video_stream
  type: binary
  description: Multipart JPEG video stream (multipart/x-mixed-replace)

- id: image_response
  type: binary
  description: JPEG image (image/jpeg)

- id: audio_stream
  type: binary
  description: G.711 μ-law audio stream (audio/basic)
```

## Variables
```yaml
# SIP configuration variables settable via sip.cgi?action=settings
# UNRESOLVED: Variables section not fully populated - source describes SIP settings as action parameters
```

## Events
```yaml
# UDP broadcast events on ports 6524 and 35344 (v2: ChaCha20-Poly1305, since Nov 2023; v1 Argon2i deprecated)
- id: doorbell_event
  type: object
  description: Doorbell ring event; ciphertext decrypts to INTERCOM_ID (6 chars), EVENT (doorbell number, 8 chars), TIMESTAMP (Unix long)

- id: motion_event
  type: object
  description: Motion sensor event; same v2 ChaCha20-Poly1305 payload structure as doorbell_event
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: safety warnings or interlock procedures not explicitly stated in source
# Note: door opening assumes user is watching live image
# Note: SIP calls auto-terminate after 180 seconds for security
```

## Notes
The device has a maximum of 1 concurrent API connection per second and will block IP addresses or users for 1 minute after extensive failed authentication attempts (HTTP 423). Video/audio streaming returns HTTP 503 (Busy) when another user has the active call; still images can still be requested. Monitor request allows up to 8 concurrent streams (HTTP 509 when all busy). The device uses self-signed certificates for HTTPS LAN access. Session IDs are valid for 10 minutes and obtained via `getsession.cgi` (also returns the NOTIFICATION_ENCRYPTION_KEY for decrypting UDP event broadcasts). Video/audio streaming over HTTPS requires a session ID to avoid plaintext credential transmission. RTSP standard authentication is required; parameter authentication is not supported for RTSP. SIP: wait min 3 seconds between requests; one simultaneous call; P2P on port 5060 (firmware 000099+). Audio codec fixed G.711 μ-law 8000Hz; AEC/ANR must be done client-side.

<!-- UNRESOLVED: physical specifications (voltage, current, power) not stated in source -->
<!-- UNRESOLVED: firmware version compatibility range not stated in source -->
<!-- UNRESOLVED: exact number of physical relays not stated in source -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-07-12T20:28:35.584Z
last_checked_at: 2026-07-21T22:22:17.882Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:22:17.882Z
matched_actions: 24
action_count: 24
confidence: medium
summary: "All 24 spec actions match source literals; transport (HTTP port 80/443, RTSP 554, UDP 6524/35344, basic_digest auth, /bha-api base) verified. (7 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "physical relay count not specified in source, only paired DoorController relays mentioned in info.cgi response"
- "Variables section not fully populated - source describes SIP settings as action parameters"
- "no explicit multi-step sequences described in source"
- "safety warnings or interlock procedures not explicitly stated in source"
- "physical specifications (voltage, current, power) not stated in source"
- "firmware version compatibility range not stated in source"
- "exact number of physical relays not stated in source"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
