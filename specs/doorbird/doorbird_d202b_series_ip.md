---
spec_id: admin/doorbird-d202b-series
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D202B Series Control Spec"
manufacturer: Doorbird
model_family: "D202B Series"
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - "D202B Series"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:39:14.384Z
last_checked_at: 2026-07-21T22:24:48.093Z
generated_at: 2026-07-21T22:24:48.093Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "specific D202B model variant not explicitly named in source; spec covers Doorbird/BirdGuard family LAN-2-LAN API"
  - "HTTPS port stated as 443 but certificate is self-signed (not CA-issued)"
  - "discrete settable parameters not clearly separated from actions in source"
  - "explicit multi-step sequences not documented as macros in source"
  - "no explicit safety interlock procedures stated in source"
  - "specific firmware version compatibility for D202B model not stated in source"
  - "voltage/current/power specifications not in source"
  - "fault behavior and error recovery sequences not documented in source"
  - "UDP event broadcast v1 deprecated; removal timeline not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:24:48.093Z
  matched_actions: 26
  action_count: 26
  confidence: medium
  summary: "All 26 spec actions matched verbatim endpoints and parameters in source; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D202B Series Control Spec

## Summary
The Doorbird D202B Series is a video door station controllable over LAN via HTTP REST API (ports 80/443), RTSP video streaming (ports 554/8557), SIP calling (port 5060), and UDP event broadcasts (ports 6524/35344). Authentication uses HTTP Basic/Digest or plaintext credentials passed as URL parameters. This spec covers the full LAN-2-LAN API for device discovery, live video/audio, door relay control, light control, favorites/schedule management, SIP calling, and event monitoring.

<!-- UNRESOLVED: specific D202B model variant not explicitly named in source; spec covers Doorbird/BirdGuard family LAN-2-LAN API -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 80    # HTTP port (unencrypted)
  # UNRESOLVED: HTTPS port stated as 443 but certificate is self-signed (not CA-issued)
base_url: http://<device-ip>/
auth:
  type: basic  # inferred: Basic or Digest auth stated; plaintext http-user/http-password also supported as alternative
```

**TCP ports stated:** 80 (HTTP), 443 (HTTPS), 554 (RTSP), 8557 (RTSP-over-HTTP), 5060 (SIP)

**UDP ports stated:** 6524, 35344 (event broadcasts with ChaCha20-Poly1305 encryption v2; v1 deprecated)

## Traits
```yaml
# Inferred from command examples in source:
powerable: false  # No power on/off command in source
routable: true    # Input/output routing: door relay, light relay, SIP call routing
queryable: true   # info.cgi, sip.cgi?action=status, monitor.cgi return state
levelable: false  # Volume settable via SIP settings (mic_volume, spk_volume)
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Optional relay selector; physical relay number or 'doorcontrollerID@relay' for paired IP I/O DoorController. Default: relay 1"
  source: /bha-api/open-door.cgi?r=<value>

- id: light_on
  label: Light On
  kind: action
  params: []
  source: /bha-api/light-on.cgi

- id: get_session
  label: Get Session ID
  kind: action
  params:
    - name: invalidate
      type: string
      description: "Optional: session ID to invalidate/destroy"
  source: /bha-api/getsession.cgi

- id: live_video_mjpg
  label: Live Video (MJPG)
  kind: query
  params: []
  source: /bha-api/video.cgi
  description: "Multipart JPEG live video stream (multipart/x-mixed-replace); up to 8 fps. Requires watch-always permission or ring event in past 5 minutes. Returns 204 if no permission."

- id: live_image
  label: Live Image (JPEG)
  kind: query
  params: []
  source: /bha-api/image.cgi
  description: "Single JPEG snapshot with default resolution/compression. Requires watch-always permission or ring event in past 1 minute. Returns 204 if no permission."

- id: history_image
  label: History Image
  kind: query
  params:
    - name: index
      type: integer
      description: "1..50, index of history image where 1 is the latest"
    - name: event
      type: string
      description: "Optional: 'doorbell' or 'motionsensor'; default is ring history for DoorBird / input trigger history for BirdGuard"
  source: /bha-api/history.cgi?index=<n>&event=<type>
  description: "Returns JPEG history image from cloud. Requires history permission (motion permission for motion event images). Returns 204 if no permission."

- id: monitor
  label: Monitor (State Stream)
  kind: query
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: 'doorbell', 'motionsensor'. rfid/keypad coming soon."
  source: /bha-api/monitor.cgi?ring=doorbell,motionsensor
  description: "Continuous multipart text stream of doorbell/motionsensor state (H/L). Up to 8 concurrent streams; HTTP 509 when all busy. HTTP codes: 200 OK, 400 param missing/invalid, 401 auth required."

- id: audio_receive
  label: Live Audio Receive
  kind: query
  params: []
  source: /bha-api/audio-receive.cgi
  description: "Real-time G.711 μ-law audio stream (8000 Hz). Requires watch-always permission or ring event in past 5 minutes. Returns 204 if no permission."

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  params: []
  source: POST /bha-api/audio-transmit.cgi
  description: "Transmit G.711 μ-law audio to device. POST with Content-Type: audio/basic. Only one consumer can transmit at a time; second rejected. Requires watch-always permission or ring event in past 5 minutes."

- id: get_device_info
  label: Get Device Info
  kind: query
  params: []
  source: /bha-api/info.cgi
  description: "Returns JSON with FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS array (firmware 000108+), DEVICE-TYPE."

- id: rtsp_video_default
  label: RTSP Live Video (default)
  kind: query
  params: []
  source: rtsp://<device-ip>:<device-rtsp-port>/mpeg/media.amp
  description: "MPEG4 H.264 RTSP stream, up to 12 fps. Standard RTSP auth only (no parameter auth). Port 554 or 8557 (RTSP-over-HTTP). Also reachable at rtsp://<device-ip>/mpeg/media.amp"

- id: rtsp_video_720p
  label: RTSP Live Video (720p)
  kind: query
  params: []
  source: rtsp://<device-ip>:<device-rtsp-port>/mpeg/720p/media.amp
  description: "720p MPEG4 H.264 RTSP stream. Supported by DoorBird D10x/D21x from firmware 000129."

- id: rtsp_video_1080p
  label: RTSP Live Video (1080p)
  kind: query
  params: []
  source: rtsp://<device-ip>:<device-rtsp-port>/mpeg/1080p/media.amp
  description: "1080p MPEG4 H.264 RTSP stream. Supported by DoorBird D11x only."

- id: list_favorites
  label: List Favorites
  kind: query
  params: []
  source: /bha-api/favorites.cgi

- id: save_favorite
  label: Save Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value 'save'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: title
      type: string
      description: "Name/title of favorite"
    - name: value
      type: string
      description: "URL or SIP target"
    - name: id
      type: integer
      description: "Optional: ID of existing favorite to update"
  source: /bha-api/favorites.cgi with POST

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value 'remove'"
    - name: type
      type: string
      description: "'sip' or 'http'"
    - name: id
      type: integer
      description: "ID of favorite to delete"
  source: /bha-api/favorites.cgi with POST

- id: list_schedules
  label: List Schedules
  kind: query
  params: []
  source: /bha-api/schedule.cgi

- id: save_schedule
  label: Save Schedule Entry
  kind: action
  params:
    - name: input
      type: string
      description: "Input event type: 'doorbell', 'motion', 'rfid', 'fingerprint'"
    - name: param
      type: string
      description: "Parameter value for input (doorbell number, transponder ID, fingerprint ID)"
    - name: output
      type: object
      description: "JSON array of output action configurations with event, param, schedule"
  source: /bha-api/schedule.cgi with POST

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  params:
    - name: action
      type: string
      description: "Fixed value 'remove'"
    - name: input
      type: string
      description: "'doorbell', 'motion', or 'rfid'"
    - name: param
      type: string
      description: "Doorbell number or transponder ID"
  source: /bha-api/schedule.cgi?action=remove

- id: restart_device
  label: Restart Device
  kind: action
  params: []
  source: /bha-api/restart.cgi

- id: sip_registration
  label: SIP Registration
  kind: action
  params:
    - name: user
      type: string
      description: "SIP proxy authentication user"
    - name: password
      type: string
      description: "SIP proxy authentication password"
    - name: url
      type: string
      description: "IP/hostname of SIP proxy"
  source: /bha-api/sip.cgi?action=registration

- id: sip_makecall
  label: SIP Make Call
  kind: action
  params:
    - name: url
      type: string
      description: "SIP URL to call (e.g. sip:108@192.168.123.22)"
  source: /bha-api/sip.cgi?action=makecall

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params: []
  source: /bha-api/sip.cgi?action=hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: enable
      type: integer
      description: "0..1 Enable SIP after reboot (default 0)"
    - name: mic_volume
      type: integer
      description: "1..100 Microphone volume (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100 Speaker volume (default 70)"
    - name: dtmf
      type: integer
      description: "0..1 Enable DTMF support (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell event, or 'none' to disable. Default: 'none'"
    - name: relay1_passcode
      type: integer
      description: "0..99999999 Pincode for triggering door open relay"
    - name: incoming_call_enable
      type: integer
      description: "0..1 Enable incoming calls (default 0)"
    - name: incoming_call_user
      type: string
      description: "Allowed SIP user (e.g. sip:10.0.0.1:5060)"
    - name: anc
      type: integer
      description: "0..1 Acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300 Max ringing time in seconds (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300 Max call duration in seconds (default 300)"
  source: /bha-api/sip.cgi?action=settings

- id: sip_status
  label: SIP Status
  kind: query
  params: []
  source: /bha-api/sip.cgi?action=status

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params: []
  source: /bha-api/sip.cgi?action=reset
```

## Feedbacks
```yaml
- id: door_open_response
  type: json
  description: "JSON response from open-door.cgi; RETURNCODE=1 indicates success"

- id: light_on_response
  type: json
  description: "JSON response from light-on.cgi; RETURNCODE=1 indicates success"

- id: session_response
  type: json
  description: "getsession.cgi returns SESSIONID and NOTIFICATION_ENCRYPTION_KEY for decrypting UDP event broadcasts"

- id: favorites_list
  type: json
  description: "JSON object with 'sip' and 'http' arrays containing favorite entries with id, title, value"

- id: schedule_list
  type: json
  description: "JSON array of schedule entries with input, param, and output arrays"

- id: device_info
  type: json
  description: "info.cgi returns FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS array, DEVICE-TYPE"

- id: sip_status_response
  type: json
  description: "SIP status with LASTERRORCODE and LASTERRORTEXT fields; 200 means registered"

- id: http_error_codes
  type: enum
  values: [200, 204, 400, 401, 423, 500, 503, 507, 509]
  description: "HTTP status codes returned by API: 200=OK, 204=no permission/content, 400=invalid params, 401=auth required, 423=blocked (wrong credentials), 500=internal error, 503=busy, 507=size limit exceeded, 509=monitor stream slots full"
```

## Variables
```yaml
# UNRESOLVED: discrete settable parameters not clearly separated from actions in source
# SIP settings are configurable via sip.cgi?action=settings but are treated as actions in this spec
```

## Events
```yaml
- id: doorbell_event
  type: string
  description: "Doorbell press event; sent as UDP broadcast on ports 6524/35344; contains INTERCOM_ID, EVENT (doorbell number padded with spaces), TIMESTAMP"

- id: motion_event
  type: string
  description: "Motion sensor event; sent as UDP broadcast on ports 6524/35344"

- id: rfid_event
  type: string
  description: "RFID transponder event; documented as 'coming soon' at time of doc writing"

- id: keypad_event
  type: string
  description: "Keypad event; documented as 'coming soon' at time of doc writing"

- id: monitor_stream
  type: string
  description: "Continuous multipart stream from monitor.cgi; doorbell:H/L, motionsensor:H/L events"
```

## Macros
```yaml
# UNRESOLVED: explicit multi-step sequences not documented as macros in source
# Schedule entries (schedule.cgi) effectively serve as configurable multi-action sequences tied to events
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # User should watch live image before opening door
interlocks: []
# UNRESOLVED: no explicit safety interlock procedures stated in source
# Note: Each SIP call auto-terminates after 180 seconds for security
# Note: Video/audio stream can be interrupted when official DoorBird App requests it
# Note: Only one simultaneous audio/video call supported; 503 returned when busy
```

## Notes
- Device is a Video Door Station supporting only one simultaneous audio/video call; 503 (Busy) returned when line is occupied
- MJPG live video: up to 8 fps; RTSP H.264 video: up to 12 fps, depending on network and device load
- Session ID validity: 10 minutes; NOTIFICATION_ENCRYPTION_KEY valid until user password changes
- Video/audio streaming over HTTPS not available; must use HTTP with sessionid parameter for encrypted streaming
- Audio codec: G.711 μ-law (8000 Hz sampling); client must implement AEC/ANR on its side
- RTSP authentication: standard RTSP auth only (no parameter authentication)
- SIP: peer-2-peer calls supported from device version 000099 onward; max call duration 30–300 seconds
- SIP: wait min 3 seconds between SIP requests to avoid flooding device
- UDP event broadcasts v1 (Argon2i) deprecated since November 2023; v2 uses ChaCha20-Poly1305 with 32-byte key
- Rate limits: 1 concurrent API connection per second; excessive wrong auth blocks IP/user for 1 minute (HTTP 423)
- Monitor.cgi: up to 8 concurrent streams; HTTP 509 when all slots busy
- Schedule time unit: seconds since Sunday 0:00 (weekdays mode); max 604799; start times must be multiples of 1800
- Favorites/schedules require firmware 000110+ and "API operator" permission

<!-- UNRESOLVED: specific firmware version compatibility for D202B model not stated in source -->
<!-- UNRESOLVED: voltage/current/power specifications not in source -->
<!-- UNRESOLVED: fault behavior and error recovery sequences not documented in source -->
<!-- UNRESOLVED: UDP event broadcast v1 deprecated; removal timeline not stated -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:39:14.384Z
last_checked_at: 2026-07-21T22:24:48.093Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:24:48.093Z
matched_actions: 26
action_count: 26
confidence: medium
summary: "All 26 spec actions matched verbatim endpoints and parameters in source; transport parameters verified; complete bidirectional coverage. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "specific D202B model variant not explicitly named in source; spec covers Doorbird/BirdGuard family LAN-2-LAN API"
- "HTTPS port stated as 443 but certificate is self-signed (not CA-issued)"
- "discrete settable parameters not clearly separated from actions in source"
- "explicit multi-step sequences not documented as macros in source"
- "no explicit safety interlock procedures stated in source"
- "specific firmware version compatibility for D202B model not stated in source"
- "voltage/current/power specifications not in source"
- "fault behavior and error recovery sequences not documented in source"
- "UDP event broadcast v1 deprecated; removal timeline not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
