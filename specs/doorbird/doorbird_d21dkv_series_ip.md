---
spec_id: admin/doorbird-d21dkv-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D21DKV Series Control Spec"
manufacturer: Doorbird
model_family: "Doorbird D21DKV Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "Doorbird D21DKV Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T06:41:19.010Z
generated_at: 2026-04-23T06:41:19.010Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-23T06:41:19.010Z
  matched_actions: 23
  action_count: 23
  confidence: high
  summary: "All 23 spec actions match source endpoints literally; transport parameters verified in RFC 2617 and documented protocol ports."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D21DKV Series Control Spec

## Summary
The Doorbird D21DKV Series is a video door station supporting IP-based control via HTTP/HTTPS REST API on ports 80/443, RTSP video streaming on port 554, SIP voice communication on port 5060, and unsolicited UDP event notifications on ports 6524 and 35344. Authentication uses HTTP Basic/Digest per RFC 2617 or optional plaintext http-user/http-password parameters.

<!-- UNRESOLVED: no power on/off commands documented; UNRESOLVED: no discrete input/output routing beyond relay triggers -->

## Transport
```yaml
protocols:
  - http
  - tcp
addressing:
  port: 80  # HTTP port explicitly stated
auth:
  type: basic  # Basic or Digest per RFC 2617 stated; plaintext http-user/http-password also supported
  plaintext_param_auth: true  # http-user and http-password parameters supported for compatibility
```

**Additional protocol endpoints:**

| Protocol | Port | Notes |
|----------|------|-------|
| HTTPS | 443 | Self-signed certificate; video/audio streaming requires session ID |
| RTSP | 554 | H.264 MPEG4 live video |
| RTSP-over-HTTP | 8557 | Alternative RTSP tunneling |
| SIP | 5060 | Voice calls, peer-to-peer supported |
| UDP | 6524, 35344 | Event broadcasts (v2 encryption with ChaCha20-Poly1305) |

## Traits
```yaml
- queryable  # inferred: info.cgi, sip.cgi?action=status return state
- levelable  # inferred: mic_volume and spk_volume parameters exposed
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
  permission: valid user

- id: get_live_video
  label: Live Video Request
  kind: action
  params: []
  method: GET
  path: /bha-api/video.cgi
  permission: valid user with "watch always" or recent ring event
  returns: multipart/x-mixed-replace JPEG stream

- id: get_live_image
  label: Live Image Request
  kind: action
  params: []
  method: GET
  path: /bha-api/image.cgi
  permission: valid user with "watch always" or recent ring event (1 min)
  returns: image/jpeg

- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Optional: relay to trigger (default: physical relay 1). Format: <doorcontrollerID>@<relay> or relay number"
  method: GET
  path: /bha-api/open-door.cgi
  permission: valid user with "watch always" or recent ring event (5 min)

- id: light_on
  label: Light On
  kind: action
  params: []
  method: GET
  path: /bha-api/light-on.cgi
  permission: valid user with "watch always" or recent ring event (5 min)

- id: get_history_image
  label: History Image Request
  kind: action
  params:
    - name: index
      type: integer
      description: "Index 1..50, where 1 is latest"
    - name: event
      type: string
      description: "doorbell or motionsensor (default: doorbell for DoorBird, input trigger for BirdGuard)"
  method: GET
  path: /bha-api/history.cgi
  permission: valid user with history or motion permission

- id: monitor_events
  label: Monitor Events
  kind: action
  params:
    - name: ring
      type: string
      description: "Event types to monitor: doorbell,motionsensor"
  method: GET
  path: /bha-api/monitor.cgi
  permission: valid user
  returns: "multipart stream with doorbell:H/L and motionsensor:H/L events"

- id: audio_receive
  label: Live Audio Receive
  kind: action
  params: []
  method: GET
  path: /bha-api/audio-receive.cgi
  permission: valid user with "watch always" or recent ring event (5 min)
  returns: G.711 μ-law audio stream

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  params: []
  method: POST
  path: /bha-api/audio-transmit.cgi
  content_type: audio/basic
  permission: valid user with "watch always" or recent ring event (5 min)
  codec: G.711 μ-law (8000 Hz)

- id: get_info
  label: Info Request
  kind: action
  params: []
  method: GET
  path: /bha-api/info.cgi
  permission: valid user
  returns: JSON with firmware, build number, MAC, relays, device type

- id: list_favorites
  label: List Favorites
  kind: action
  params: []
  method: GET
  path: /bha-api/favorites.cgi
  permission: API operator
  returns: JSON with sip and http favorites

- id: save_favorite
  label: Add or Change Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Must be "save"
    - name: type
      type: string
      description: "sip or http"
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
  permission: API operator
  note: Requires firmware 000110+

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Must be "remove"
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of favorite to delete
  method: GET
  path: /bha-api/favorites.cgi
  permission: API operator

- id: list_schedules
  label: List Schedules
  kind: action
  params: []
  method: GET
  path: /bha-api/schedule.cgi
  permission: API operator
  returns: JSON array of schedule entries
  note: Requires firmware 000110+

- id: save_schedule
  label: Add or Update Schedule Entry
  kind: action
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: json
      description: JSON array of output configurations (event, param, schedule)
  method: POST
  path: /bha-api/schedule.cgi
  permission: API operator

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  params:
    - name: action
      type: string
      description: Must be "remove"
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number or transponder ID
  method: GET
  path: /bha-api/schedule.cgi
  permission: API operator

- id: restart
  label: Restart Device
  kind: action
  params: []
  method: GET
  path: /bha-api/restart.cgi
  permission: valid user
  returns: 200 OK or 503 if device busy

- id: sip_registration
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
  path: /bha-api/sip.cgi?action=registration
  permission: API operator

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)
  method: GET
  path: /bha-api/sip.cgi?action=makecall
  permission: API operator

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi?action=hangup
  permission: API operator

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      description: 0..1, enable SIP after reboot (default: 0)
    - name: mic_volume
      type: integer
      description: 1..100, microphone volume (default: 33)
    - name: spk_volume
      type: integer
      description: 1..100, speaker volume (default: 70)
    - name: dtmf
      type: integer
      description: 0..1, enable DTMF support (default: 0)
    - name: relay1_passcode
      type: integer
      description: 0..99999999, pincode for door open relay
    - name: incoming_call_enable
      type: integer
      description: 0..1, enable incoming calls (default: 0)
    - name: incoming_call_user
      type: string
      description: Allowed SIP user (e.g. sip:10.0.0.1:5060)
    - name: anc
      type: integer
      description: 0..1, acoustic noise cancellation (default: 1)
    - name: ring_time_limit
      type: integer
      description: 10..300, max ringing time in seconds (default: 300)
    - name: call_time_limit
      type: integer
      description: 30..300, max call duration in seconds (default: 300)
  method: GET
  path: /bha-api/sip.cgi?action=settings
  permission: API operator

- id: sip_status
  label: SIP Status
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi?action=status
  permission: API operator
  returns: JSON with LASTERRORCODE and LASTERRORTEXT

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params: []
  method: GET
  path: /bha-api/sip.cgi?action=reset
  permission: API operator
```

## Feedbacks
```yaml
- id: return_code
  label: Return Code
  type: enum
  values:
    - "1"  # success
    - "0"  # failure
  description: "JSON RETURNCODE field from BHA API responses"

- id: http_status
  label: HTTP Status Code
  type: enum
  values:
    - "200"  # OK
    - "204"  # No content (permission denied)
    - "400"  # Parameter missing/invalid
    - "401"  # Authentication required
    - "423"  # Locked (wrong auth rate limit)
    - "500"  # Internal error
    - "503"  # Busy / service unavailable
    - "507"  # Size limit exceeded
  description: "HTTP status codes returned by API"

- id: session_id
  label: Session ID
  type: string
  description: "Temporary session ID valid 10 minutes, obtained via getsession.cgi"

- id: notification_encryption_key
  label: Notification Encryption Key
  type: string
  description: "32-64 byte key from getsession.cgi for decrypting UDP event broadcasts"

- id: device_info
  label: Device Information
  type: object
  properties:
    - firmware
    - build_number
    - primary_mac_addr
    - relays
    - device_type
  description: "JSON from info.cgi containing version and configuration data"

- id: sip_status
  label: SIP Status
  type: object
  properties:
    - lasterrorcode
    - lasterrortext
  description: "Current SIP registration and call state"

- id: relay_state
  label: Relay State
  type: array
  description: "List of available relays from info.cgi, including physical relays and paired IP I/O DoorController relays"

- id: doorbell_event
  label: Doorbell Event
  type: string
  description: "doorbell:H (high/ringing) or doorbell:L (low/idle) from monitor.cgi"

- id: motion_event
  label: Motion Sensor Event
  type: string
  description: "motionsensor:H (triggered) or motionsensor:L (idle) from monitor.cgi"

- id: rtsp_stream
  label: RTSP Video Stream
  kind: stream
  protocol: rtsp
  port: 554
  path: /mpeg/media.amp
  description: "MPEG4 H.264 live video stream"
```

## Variables
```yaml
- id: mic_volume
  label: Microphone Volume
  type: integer
  range: 1..100
  default: 33
  set: sip_settings

- id: spk_volume
  label: Speaker Volume
  type: integer
  range: 1..100
  default: 70
  set: sip_settings

- id: sip_enabled
  label: SIP Enabled
  type: boolean
  default: false
  set: sip_settings

- id: dtmf_enabled
  label: DTMF Enabled
  type: boolean
  default: false
  set: sip_settings

- id: anc_enabled
  label: Acoustic Noise Cancellation
  type: boolean
  default: true
  set: sip_settings

- id: ring_time_limit
  label: Ring Time Limit
  type: integer
  range: 10..300
  default: 300
  unit: seconds
  set: sip_settings

- id: call_time_limit
  label: Call Time Limit
  type: integer
  range: 30..300
  default: 300
  unit: seconds
  set: sip_settings
```

## Events
```yaml
# UNRESOLVED: events are received via UDP monitor stream and monitor.cgi,
# but source does not define a structured event schema for automation systems.
# Events observed: doorbell, motion, rfid, fingerprint, keypad

- id: doorbell_ring
  label: Doorbell Ring
  source: monitor.cgi / UDP broadcast
  description: "Doorbell button pressed"

- id: motion_detected
  label: Motion Detected
  source: monitor.cgi / UDP broadcast
  description: "Motion sensor triggered"

- id: rfid_event
  label: RFID Event
  source: UDP broadcast
  description: "RFID transponder detected (documented as coming soon)"

- id: keypad_event
  label: Keypad Event
  source: UDP broadcast
  description: "Keypad code entered (documented as coming soon)"

- id: sip_call_status
  label: SIP Call Status
  source: sip.cgi
  description: "SIP registration state and call progress"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences defined in source.
# Note: schedules and favorites provide compositional automation.
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: door_open_requires_live_view
    description: "open-door.cgi requires the API user to be watching the live image stream; returns 204 if no recent ring event and no 'watch always' permission"
  - id: official_app_precedence
    description: "Official DoorBird App takes precedence over LAN API for audio/video streams; API streams can be interrupted at any time by App requests"
  - id: sip_call_termination
    description: "SIP calls auto-terminate after 180 seconds for security"
  - id: sip_concurrent_limit
    description: "Only one simultaneous SIP call supported"
# UNRESOLVED: no explicit safety warnings or interlock procedures beyond permission-based access controls documented in source
```

## Notes
- **Rate limits:** 1 concurrent connection per second for API access; IP/user blocked for 1 minute after extensive wrong credentials (HTTP 423)
- **Video stream precedence:** Official DoorBird App has priority; video/audio connections may be interrupted
- **Session IDs:** Valid 10 minutes; for video/audio streaming over HTTPS, obtain session ID first to avoid plaintext credential transmission
- **Firmware requirements:** favorites.cgi and schedule.cgi require firmware 000110+; info.cgi relay config requires firmware 000108+
- **Audio codec:** G.711 μ-law at 8000 Hz required for audio transmit/receive; client must implement AEC/ANR
- **RTSP authentication:** Standard RTSP authentication only; no parameter authentication support for RTSP
- **Schedule time windows:** Weekday schedules use 48 half-hour slices (1800 seconds each), must be multiples of 1800; "from-to" schedules use Unix timestamp in UTC
- **UDP event broadcasts:** Sent every 7 seconds as keep-alive; decode using ChaCha20-Poly1305 with NOTIFICATION_ENCRYPTION_KEY from getsession.cgi
- **SIP peer-to-peer:** Supported from firmware 000099; device ready to receive on port 5060 after enable=1

<!-- UNRESOLVED: no voltage, current, or power specifications in source -->
<!-- UNRESOLVED: no firmware version compatibility ranges stated beyond minimums for specific features -->
<!-- UNRESOLVED: no error recovery sequences or fault behavior documented -->
<!-- UNRESOLVED: no binary command byte encoding tables — all commands are HTTP URL-based -->
<!-- UNRESOLVED: specific error codes beyond HTTP status codes not enumerated for all endpoints -->

## Provenance

```yaml
source_domains:
  - doorbird.com
retrieved_at: 2026-04-30T04:32:18.464Z
last_checked_at: 2026-04-23T06:41:19.010Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T06:41:19.010Z
matched_actions: 23
action_count: 23
confidence: high
summary: "All 23 spec actions match source endpoints literally; transport parameters verified in RFC 2617 and documented protocol ports."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
