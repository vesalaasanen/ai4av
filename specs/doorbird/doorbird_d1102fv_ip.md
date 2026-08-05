---
spec_id: admin/doorbird-d1102fv
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D1102FV Control Spec"
manufacturer: Doorbird
model_family: D1102FV
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D1102FV
  firmware: "000130 and above"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:34:33.603Z
last_checked_at: 2026-07-21T22:22:18.596Z
generated_at: 2026-07-21T22:22:18.596Z
firmware_coverage: "000130 and above"
protocol_coverage: []
known_gaps:
  - "no explicit multi-step macros described in source"
  - "fault recovery beyond documented HTTP status handling is not stated"
  - "physical serial or RS-232 interface not mentioned in source"
  - "voltage, current, and power specifications not included"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:22:18.596Z
  matched_actions: 27
  action_count: 27
  confidence: medium
  summary: "All 27 spec actions match literal commands in source; transport parameters verified; complete D11x coverage. (4 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D1102FV Control Spec

## Summary
The Doorbird D1102FV belongs to the D11x video door station family and supports IP-based control through an HTTP/HTTPS API. It also provides encrypted UDP event broadcasts, RTSP video, HTTP audio, and SIP intercom functions.

## Transport
```yaml
protocols:
  - tcp
  - http
  - udp
addressing:
  port: 80
  secure_port: 443
  base_url: /bha-api/
  udp_ports:
    - 6524
    - 35344
auth:
  type: basic_or_digest
  standard: RFC 2617
  alternate_parameters:
    username: http-user
    password: http-password
tls:
  certificate: self-signed
```

## Traits
```yaml
- queryable  # inferred from documented status and information queries
- routable  # inferred from event-to-output schedule commands
- levelable  # inferred from SIP microphone and speaker volume controls
```

## Actions
```yaml
- id: get_session
  label: Create Session
  kind: query
  command: "GET /bha-api/getsession.cgi"
  params: []

- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={session_id}"
  params:
    - name: session_id
      type: string
      description: Existing session ID to invalidate

- id: live_video
  label: Request Live MJPEG Video
  kind: query
  command: "GET /bha-api/video.cgi"
  params:
    - name: sessionid
      type: string
      description: Temporary session ID required for credential-free unencrypted streaming

- id: live_image
  label: Request Live Image
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "Optional relay: 1, 2, or <doorcontrollerID>@<relay>; omission triggers physical relay 1"

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: Request History Image
  kind: query
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: History image index from 1 through 50, where 1 is latest
    - name: event
      type: string
      description: "Optional event type: doorbell or motionsensor"

- id: monitor_events
  label: Monitor Doorbell and Motion States
  kind: query
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell and motionsensor"

- id: live_audio_receive
  label: Receive Live Audio
  kind: query
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: live_audio_transmit
  label: Transmit Live Audio
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      description: G.711 mu-law audio/basic stream at 8000 Hz

- id: device_info
  label: Get Device Information
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: save_favorite
  label: Save Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed value "save"
    - name: type
      type: string
      description: "Favorite type: sip or http"
    - name: title
      type: string
      description: Name or title of favorite
    - name: value
      type: string
      description: HTTP(S) URL or SIP target
    - name: id
      type: integer
      description: Optional existing favorite ID

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type={type}&id={id}"
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: type
      type: string
      description: "Favorite type: sip or http"
    - name: id
      type: integer
      description: Favorite ID to delete

- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: save_schedule
  label: Save Schedule
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      description: "Input event type: doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, fingerprint ID, or empty value
    - name: output
      type: object
      description: JSON array of output action configurations

- id: delete_schedule
  label: Delete Schedule
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      description: "Input event type: doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or empty value

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: rtsp_live_video
  label: Request Default RTSP Video
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []

- id: rtsp_live_video_1080p
  label: Request 1080p RTSP Video
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []

- id: rtsp_over_http_live_video
  label: Request RTSP-over-HTTP Video
  kind: query
  command: "rtsp://<device-ip>:8557/mpeg/media.amp"
  params: []

- id: sip_register
  label: SIP Register
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
      description: SIP proxy authentication user
    - name: password
      type: string
      description: SIP proxy authentication password
    - name: url
      type: string
      description: SIP proxy IP address or hostname

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: "SIP URL to call, e.g. sip:108@192.168.123.22"

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&{parameter}={value}"
  params:
    - name: enable
      type: integer
      description: Enable or disable SIP after reboot (0..1)
    - name: mic_volume
      type: integer
      description: Microphone volume (1..100)
    - name: spk_volume
      type: integer
      description: Speaker volume (1..100)
    - name: dtmf
      type: integer
      description: Enable or disable DTMF support (0..1)
    - name: autocall_doorbell_url
      type: string
      description: Deprecated automatic doorbell-call SIP URL or "none"
    - name: relay1_passcode
      type: integer
      description: Pincode for triggering door-open relay (0..99999999)
    - name: incoming_call_enable
      type: integer
      description: Enable or disable incoming calls (0..1)
    - name: incoming_call_user
      type: string
      description: Allowed SIP user
    - name: anc
      type: integer
      description: Enable or disable acoustic noise cancellation (0..1)
    - name: ring_time_limit
      type: integer
      description: Maximum ringing time in seconds (10..300)
    - name: call_time_limit
      type: integer
      description: Maximum call duration in seconds (30..300)

- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []
```

## Feedbacks
```yaml
- id: session_id
  label: Session ID
  type: object
  description: JSON containing RETURNCODE, SESSIONID, and NOTIFICATION_ENCRYPTION_KEY

- id: live_video_stream
  label: Live Video Stream
  type: binary
  description: Multipart JPEG stream using multipart/x-mixed-replace

- id: live_image_response
  label: Live Image
  type: binary
  description: JPEG image response

- id: door_opener_result
  label: Door Opener Result
  type: object
  description: JSON response from open-door.cgi

- id: light_result
  label: Light Result
  type: object
  description: JSON response from light-on.cgi

- id: history_image_response
  label: History Image
  type: binary
  description: JPEG history image response

- id: monitor_state
  label: Monitor State
  type: object
  description: Multipart doorbell and motionsensor states using H for active and L for inactive

- id: live_audio_stream
  label: Live Audio Stream
  type: binary
  description: G.711 mu-law audio at 8000 Hz

- id: info_response
  label: Device Info
  type: object
  description: JSON containing firmware, build number, primary MAC address, relays, and device type

- id: favorite_list
  label: Favorite List
  type: object
  description: JSON object containing SIP and HTTP favorites

- id: schedule_list
  label: Schedule List
  type: object
  description: JSON array containing input, param, and output schedule configurations

- id: sip_status
  label: SIP Status
  type: object
  description: JSON containing LASTERRORCODE and LASTERRORTEXT; LASTERRORCODE 200 means registered

- id: rtsp_video_stream
  label: RTSP Video Stream
  type: binary
  description: MPEG4 H.264 stream
```

## Variables
```yaml
- id: session_id
  type: string
  description: Temporary streaming session ID valid for 10 minutes

- id: notification_encryption_key
  type: string
  description: UDP notification decryption key valid until user password changes

- id: sip_enabled
  type: boolean
  description: SIP enabled after reboot

- id: sip_mic_volume
  type: integer
  description: Microphone volume (1..100)

- id: sip_spk_volume
  type: integer
  description: Speaker volume (1..100)

- id: sip_dtmf
  type: boolean
  description: DTMF support enabled

- id: sip_autocall_doorbell_url
  type: string
  description: Deprecated automatic doorbell-call SIP URL or "none"

- id: sip_relay1_passcode
  type: integer
  description: Pincode for door-open relay

- id: sip_incoming_call_enable
  type: boolean
  description: Incoming calls enabled

- id: sip_incoming_call_user
  type: string
  description: Allowed incoming SIP user

- id: sip_anc
  type: boolean
  description: Acoustic noise cancellation enabled

- id: sip_ring_time_limit
  type: integer
  description: Maximum ringing time in seconds (10..300)

- id: sip_call_time_limit
  type: integer
  description: Maximum call duration in seconds (30..300)
```

## Events
```yaml
- id: doorbell_event
  description: Doorbell press delivered through ChaCha20-Poly1305-encrypted UDP broadcast
  fields:
    - name: event
      type: string
      description: Doorbell number padded with spaces to 8 bytes
    - name: timestamp
      type: long
      description: Unix timestamp
    - name: intercom_id
      type: string
      description: First 6 characters of username

- id: motion_event
  description: Motion event delivered through ChaCha20-Poly1305-encrypted UDP broadcast
  fields:
    - name: event
      type: string
      description: "motion" padded with spaces to 8 bytes
    - name: timestamp
      type: long
      description: Unix timestamp
    - name: intercom_id
      type: string
      description: First 6 characters of username

- id: monitor_state
  description: Continuous multipart state stream from monitor.cgi
  fields:
    - name: doorbell
      type: string
      description: "H for active or L for inactive"
    - name: motionsensor
      type: string
      description: "H for active or L for inactive"
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for:
  - open_door
interlocks:
  - description: Do not fetch video and audio automatically upon receiving a UDP broadcast
    conditions:
      - Wait for user interaction before requesting streams
  - description: Only one simultaneous live audio/video call is supported
    conditions:
      - Handle HTTP 503 as line busy
  - description: Door-open relay can be triggered by DTMF only during a SIP call with DTMF enabled
    conditions:
      - SIP call in progress
      - DTMF support enabled
      - Correct relay passcode entered
  - description: API-Operator permission must be restricted to trusted automation-server users
    conditions:
      - Required for settings-changing API operations
```

## Notes
- D11x devices require firmware 000130 or above according to the compatibility table.
- HTTP is available on TCP port 80; HTTPS is available on TCP port 443 using a preinstalled self-signed certificate.
- HTTPS is unavailable for video and audio streaming; those requests use HTTP with a temporary session ID.
- Session IDs remain valid for 10 minutes.
- `NOTIFICATION_ENCRYPTION_KEY` remains valid until the user password changes; ChaCha20 uses its first 32 bytes.
- UDP event broadcasts use ports 6524 and 35344. Keep-alive packets arrive every 7 seconds and should be skipped.
- RTSP uses port 554; RTSP-over-HTTP uses port 8557.
- The 1080p RTSP endpoint is supported by D11x devices.
- API access permits a maximum of one concurrent connection per second.
- Repeated wrong authentication can block the IP address or user for one minute and returns HTTP 423.
- Video and audio streams may be interrupted when the official DoorBird App takes precedence.
- HTTP API audio uses G.711 mu-law at 8000 Hz.
- SIP requests must be separated by at least 3 seconds.
- Only one simultaneous SIP call is supported, and each SIP call terminates after 180 seconds.
- Favorites and schedules require firmware 000110 or higher and API-Operator permission.
- `autocall_doorbell_url` is deprecated in favor of favorites and schedules.
- Restart returns HTTP 503 while the device is busy, such as during firmware installation.

<!-- UNRESOLVED: fault recovery beyond documented HTTP status handling is not stated -->
<!-- UNRESOLVED: physical serial or RS-232 interface not mentioned in source -->
<!-- UNRESOLVED: voltage, current, and power specifications not included -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T20:34:33.603Z
last_checked_at: 2026-07-21T22:22:18.596Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:22:18.596Z
matched_actions: 27
action_count: 27
confidence: medium
summary: "All 27 spec actions match literal commands in source; transport parameters verified; complete D11x coverage. (4 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no explicit multi-step macros described in source"
- "fault recovery beyond documented HTTP status handling is not stated"
- "physical serial or RS-232 interface not mentioned in source"
- "voltage, current, and power specifications not included"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
