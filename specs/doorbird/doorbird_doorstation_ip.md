---
spec_id: admin/doorbird-doorstation
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird Doorstation Control Spec"
manufacturer: DoorBird
model_family: "DoorBird Doorstation"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "DoorBird Doorstation"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/integrations
  - https://www.doorbird.com/en/api
retrieved_at: 2026-05-20T21:20:32.789Z
last_checked_at: 2026-07-21T22:31:25.164Z
generated_at: 2026-07-21T22:31:25.164Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "device model variants (D101/D21x/D10x/D11x) not enumerated in source — only example mentions"
  - "HTTPS port 443 not enumerated as a separate protocol entry (still HTTP/HTTPS)"
  - "RTSP port 554 and 8557 implied by URL syntax but not enumerated as port= fields"
  - "SIP port 5060 only documented for P2P incoming calls"
  - "no discrete settable parameters independent of CGI actions"
  - "no explicit multi-step sequences defined in source"
  - "physical safety warnings not stated in source"
  - "voltage/current/power specs not stated"
  - "firmware version compatibility range not stated — only example versions mentioned"
  - "port 443 not enumerated as separate transport protocol"
  - "RTSP port 554 not explicitly stated as port number, only in URL syntax"
  - "UDP event port 35344 not explicitly named as configurable"
  - "SIP P2P port 5060 only documented for incoming calls"
  - "monitor.cgi rfid/keypad events \"coming soon\" — not yet implemented"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:31:25.164Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions matched literals in source; transport parameters verified; one-to-one coverage. (14 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-21
---

# DoorBird Doorstation Control Spec

## Summary
DoorBird IP video door station. Controls: door relay, light relay, live video/audio stream, history images, motion/doorbell monitor, SIP calls, schedule/favorite management. HTTP API on ports 80/443, UDP event broadcasts on 6524/35344, RTSP video on 554 (and RTSP-over-HTTP on 8557), SIP P2P on 5060.

<!-- UNRESOLVED: device model variants (D101/D21x/D10x/D11x) not enumerated in source — only example mentions -->

## Transport
```yaml
protocols:
  - http
  - udp
  - rtsp
addressing:
  port: 80  # HTTP port stated in source
  base_url: /bha-api/  # inferred: all CGI endpoints prefixed /bha-api/ in source
auth:
  type: basic_digest  # RFC 2617 Basic or Digest auth stated; also plaintext http-user/http-password params supported
# Additional transport ports observed in source (informational, not separate protocol entries):
# - TCP 443: HTTPS (HTTP interface also available encrypted)
# - TCP 5060: SIP peer-2-peer listener (from firmware 000099)
# - TCP/UDP 554: RTSP video
# - TCP 8557: RTSP-over-HTTP
# - UDP 6524 and UDP 35344: encrypted event broadcasts (v2 ChaCha20-Poly1305)
# UNRESOLVED: HTTPS port 443 not enumerated as a separate protocol entry (still HTTP/HTTPS)
# UNRESOLVED: RTSP port 554 and 8557 implied by URL syntax but not enumerated as port= fields
# UNRESOLVED: SIP port 5060 only documented for P2P incoming calls
```

## Traits
```yaml
# Inferred from command examples:
# - powerable: restart.cgi present
# - queryable: info.cgi, sip.cgi?action=status, monitor.cgi present
# - routable: SIP makecall, door open, light on present
# - streamable: video.cgi, audio-receive.cgi, audio-transmit.cgi, RTSP media.amp present
traits:
  - powerable
  - queryable
  - routable
  - streamable
```

## Actions
```yaml
# Door relay trigger
- id: open_door
  label: Open Door
  kind: action
  command: "GET /bha-api/open-door.cgi?r={r}"
  params:
    - name: r
      type: string
      description: "Relay ID, e.g. '1' or 'gggaaa@1' (DoorController relay); omit for default relay1"
      required: false

# Light relay trigger
- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

# Live video stream (multipart JPEG, ~8 fps avg)
- id: live_video
  label: Live Video Stream
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []

# Live image (single JPEG)
- id: live_image
  label: Live Image
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []

# History image (cloud-stored)
- id: history_image
  label: History Image
  kind: action
  command: "GET /bha-api/history.cgi?index={index}&event={event}"
  params:
    - name: index
      type: integer
      description: "1..50, index of history images (1 = latest)"
    - name: event
      type: string
      enum:
        - doorbell
        - motionsensor
      required: false

# Monitor doorbell/motion state stream
- id: monitor
  label: Monitor Doorbell/Motion
  kind: action
  command: "GET /bha-api/monitor.cgi?ring={ring}"
  params:
    - name: ring
      type: string
      enum:
        - doorbell
        - motionsensor
      description: "Comma-separated list of event types to monitor; rfid and keypad coming soon"

# Live audio receive (G.711 mu-law, 8000 Hz)
- id: audio_receive
  label: Live Audio Receive
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []

# Live audio transmit (G.711 mu-law; single consumer at a time)
- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: binary
      description: "G.711 mu-law audio, Content-Type: audio/basic"

# RTSP live video
- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params:
    - name: path
      type: string
      enum:
        - /mpeg/media.amp
        - /mpeg/720p/media.amp
        - /mpeg/1080p/media.amp
      description: "720p supported on D10x/D21x from firmware 129; 1080p on D11x only"
      required: false
    - name: port
      type: integer
      enum:
        - 554
        - 8557
      description: "554 = RTSP; 8557 = RTSP-over-HTTP"

# Device info query
- id: info
  label: Device Info
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

# Device restart
- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

# SIP make call
- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url={url}"
  params:
    - name: url
      type: string
      description: SIP URL to call, e.g. "sip:108@192.168.123.22"

# SIP hangup
- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

# SIP registration
- id: sip_register
  label: SIP Register
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user={user}&password={password}&url={url}"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: SIP Proxy IP/hostname

# SIP settings
- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings"
  params:
    - name: enable
      type: integer
      description: "0..1, enable SIP registration after reboot"
      required: false
    - name: mic_volume
      type: integer
      description: "1..100, microphone volume"
      required: false
    - name: spk_volume
      type: integer
      description: "1..100, speaker volume"
      required: false
    - name: dtmf
      type: integer
      description: "0..1, enable DTMF support"
      required: false
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED - use schedule.cgi. SIP URL or 'none'"
      required: false
    - name: relay1_passcode
      type: integer
      description: "0..99999999, pincode for door open relay"
      required: false
    - name: incoming_call_enable
      type: integer
      description: "0..1"
      required: false
    - name: incoming_call_user
      type: string
      description: Allowed SIP user, e.g. "sip:10.0.0.1:5060"
      required: false
    - name: anc
      type: integer
      description: "0..1, acoustic noise cancellation"
      required: false
    - name: ring_time_limit
      type: integer
      description: "10..300, max ringing time in seconds"
      required: false
    - name: call_time_limit
      type: integer
      description: "30..300, max call duration in seconds"
      required: false

# SIP status query
- id: sip_status
  label: SIP Status
  kind: query
  command: "GET /bha-api/sip.cgi?action=status"
  params: []

# SIP reset
- id: sip_reset
  label: SIP Reset
  kind: action
  command: "GET /bha-api/sip.cgi?action=reset"
  params: []

# List favorites (query)
- id: list_favorites
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

# Save favorite
- id: save_favorite
  label: Save Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type={type}&title={title}&value={value}&id={id}"
  params:
    - name: action
      type: string
      const: save
    - name: type
      type: string
      enum:
        - sip
        - http
    - name: title
      type: string
    - name: value
      type: string
      description: URL or SIP target
    - name: id
      type: integer
      required: false
      description: ID of favorite to change; omit for new

# Delete favorite
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
      enum:
        - sip
        - http
    - name: id
      type: integer

# List schedules (query)
- id: list_schedules
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

# Add/update schedule
- id: save_schedule
  label: Save Schedule
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: input
      type: string
      enum:
        - doorbell
        - motion
        - rfid
        - fingerprint
    - name: param
      type: string
      description: "doorbell number, transponder ID, or fingerprint ID"
    - name: output
      type: array
      description: JSON array of output action configs
      properties:
        event:
          type: string
          enum:
            - notify
            - sip
            - relay
            - http
        param:
          type: string
          description: "favorite id (sip/http), relay number, or empty"
        enabled:
          type: string
          enum:
            - "0"
            - "1"
        schedule:
          type: object
          description: "once | from-to | weekdays"

# Delete schedule
- id: delete_schedule
  label: Delete Schedule
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input={input}&param={param}"
  params:
    - name: action
      type: string
      const: remove
    - name: input
      type: string
      enum:
        - doorbell
        - motion
        - rfid
    - name: param
      type: string

# Session create
- id: get_session
  label: Get Session
  kind: action
  command: "GET /bha-api/getsession.cgi"
  params: []

# Session invalidate
- id: invalidate_session
  label: Invalidate Session
  kind: action
  command: "GET /bha-api/getsession.cgi?invalidate={invalidate}"
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate
```

## Feedbacks
```yaml
# Door open returns JSON with RETURNCODE
- id: open_door_response
  type: object
  properties:
    RETURNCODE:
      type: string

# Light on returns JSON with RETURNCODE
- id: light_on_response
  type: object
  properties:
    RETURNCODE:
      type: string

# Info request returns JSON with firmware/version/mac/relays/device-type
- id: device_info
  type: object
  properties:
    BHA:
      type: object
      properties:
        RETURNCODE:
          type: string
        VERSION:
          type: array
          items:
            type: object
            properties:
              FIRMWARE:
                type: string
              BUILD_NUMBER:
                type: string
              PRIMARY_MAC_ADDR:
                type: string
              RELAYS:
                type: array
                items:
                  type: string
              DEVICE-TYPE:
                type: string

# SIP status returns JSON with LASTERRORCODE/LASTERRORTEXT
- id: sip_status
  type: object
  properties:
    LASTERRORCODE:
      type: string
    LASTERRORTEXT:
      type: string

# SIP reset response: also returns LASTERRORCODE/LASTERRORTEXT JSON
- id: sip_reset_response
  type: object
  properties:
    LASTERRORCODE:
      type: string
    LASTERRORTEXT:
      type: string

# Favorites list returns JSON with sip/http favorites keyed by id
- id: favorites_list
  type: object
  properties:
    sip:
      type: object
    http:
      type: object

# Schedules list returns JSON array of schedule entries
- id: schedules_list
  type: array
  items:
    type: object
    properties:
      input:
        type: string
      param:
        type: string
      output:
        type: array

# Session create returns JSON with SESSIONID and NOTIFICATION_ENCRYPTION_KEY
- id: session_response
  type: object
  properties:
    SESSIONID:
      type: string
    NOTIFICATION_ENCRYPTION_KEY:
      type: string
      description: "32-64 bytes; first 32 used by ChaCha20"

# Live image returns JPEG
- id: live_image_response
  type: string
  format: binary
  content_type: image/jpeg

# Live video stream returns multipart/x-mixed-replace JPEG (~8 fps)
- id: live_video_stream
  type: string
  format: binary
  content_type: multipart/x-mixed-replace

# Audio receive stream returns G.711 mu-law audio
- id: audio_receive_stream
  type: string
  format: binary
  description: "G.711 mu-law, 8000 Hz sampling"

# History image returns JPEG
- id: history_image_response
  type: string
  format: binary
  content_type: image/jpeg

# Monitor stream returns multipart text doorbell/motion state
- id: monitor_stream
  type: string
  content_type: multipart/x-mixed-replace
  description: "Returns lines like 'doorbell:H', 'doorbell:L', 'motionsensor:H', 'motionsensor:L'"

# RTSP video stream returns MPEG4 H.264 (~12 fps)
- id: rtsp_video_stream
  type: string
  description: "MPEG4 H.264 via RTSP on 554 or RTSP-over-HTTP on 8557"

# Consolidated HTTP status codes across endpoints (200/204/400/401/423/500/503/507/509)
- id: http_status_codes
  type: object
  description: |
    200 OK
    204 No permission / no data
    400 Parameter missing or invalid
    401 Authentication required
    423 Wrong credentials, IP/user blocked for 1 min
    500 Internal error
    503 Busy (e.g. firmware update or call in progress)
    507 Size limit exceeded (too many favorites/schedules)
    509 Monitor stream limit reached (8 concurrent)
```

## Variables
```yaml
# SIP settings fields are sent as parameters to sip.cgi?action=settings (see sip_settings action).
# They are also readable from the device, but no dedicated read endpoint is documented in source.
# UNRESOLVED: no discrete settable parameters independent of CGI actions
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted v2)
# Keep-alive packets every 7 seconds on the same ports - skip for decryption.
# v1 (Argon2i, IDENT 0xDE 0xAD 0xBE, VERSION 0x01) deprecated and removable.
# v2 packet layout:
#   IDENT (3 bytes): 0xDE 0xAD 0xBE
#   VERSION (1 byte): 0x02
#   NONCE (8 bytes): for ChaCha20-Poly1305
#   CIPHERTEXT (34 bytes): ChaCha20-Poly1305 encrypted payload
# After decryption, CIPHERTEXT contains 16 bytes of random padding (stripped) then:
#   INTERCOM_ID (6 chars): first 6 chars of DoorBird user; skip packets that don't match
#   EVENT (8 chars): "doorbell" or "motion" padded with spaces; doorbell events include doorbell number
#   TIMESTAMP (4 bytes): unix timestamp, long

# Monitor CGI streams doorbell/motion state as multipart text
# Format: "doorbell:H" / "doorbell:L" / "motionsensor:H" / "motionsensor:L"
# Note: rfid and keypad events documented as "coming soon" in monitor.cgi

# SIP events: incoming call, call terminated (device closes connection)
# RTSP stream precedence over LAN API when official App requests stream
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step sequences defined in source
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # should confirm via live view before triggering door relay
  - light_on
interlocks:
  - door_open_requires_watch_permission  # 204 returned if user lacks "watch always" and no recent ring event (5 min)
  - live_image_requires_watch_permission  # 204 if no watch-always and no recent ring event (1 min)
  - audio_transmit_requires_watch_permission  # 204 if no watch-always and no recent ring event (5 min)
  - audio_transmit_single_consumer  # second transmit consumer is rejected
  - history_requires_history_or_motion_permission  # 204 without permission
  - sip_call_max_duration_180s  # auto-hangup after 180 seconds
  - sip_call_auto_hangup_on_dtmf_relay_trigger  # DTMF pincode can trigger door relay
  - sip_call_min_request_interval_3s  # min 3 seconds between SIP requests to avoid overload
  - sip_single_simultaneous_call  # device supports only one simultaneous SIP call
  - video_audio_stream_precedence  # official App takes precedence over LAN API streams
  - api_rate_limit_1_per_second  # max 1 concurrent API connection per second
  - wrong_auth_blocks_ip_1min  # HTTP 423 - IP/user blocked for 1 min after excessive wrong credentials
  - sip_settings_require_api_operator_permission
  - favorites_require_api_operator_permission
  - schedules_require_api_operator_permission
  - monitor_max_8_concurrent_streams  # 509 when all busy
# UNRESOLVED: physical safety warnings not stated in source
```

## Notes
Device is IP video door station. HTTP API base path: `/bha-api/`. Alternative auth: `http-user` and `http-password` GET params (insecure). HTTPS uses self-signed certificate — client must accept it. Video streaming HTTPS unavailable; session ID required for video/audio streaming over HTTP to avoid plaintext credentials. Session ID valid 10 minutes. UDP events: keep-alive packets every 7 seconds on 6524 and 35344, skip for decryption. Firmware 000110+ required for favorites/schedules. SIP peer-2-peer calls on port 5060 from firmware 000099. RTSP video on port 554, RTSP-over-HTTP on 8557. Max 1 concurrent API connection/sec; wrong auth blocks IP for 1 min (HTTP 423); 503 when call in progress.

`autocall_doorbell_url` SIP setting is deprecated; migrate to schedule.cgi. Live video returns ~8 fps; RTSP returns ~12 fps. Audio codec G.711 mu-law at 8000 Hz; client must perform AEC/ANR. info.cgi includes RELAYS array (physical + paired DoorBird IP I/O Door Controllers) starting firmware 000108.
<!-- UNRESOLVED: voltage/current/power specs not stated -->
<!-- UNRESOLVED: firmware version compatibility range not stated — only example versions mentioned -->
<!-- UNRESOLVED: port 443 not enumerated as separate transport protocol -->
<!-- UNRESOLVED: RTSP port 554 not explicitly stated as port number, only in URL syntax -->
<!-- UNRESOLVED: UDP event port 35344 not explicitly named as configurable -->
<!-- UNRESOLVED: SIP P2P port 5060 only documented for incoming calls -->
<!-- UNRESOLVED: monitor.cgi rfid/keypad events "coming soon" — not yet implemented -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/en/integrations
  - https://www.doorbird.com/en/api
retrieved_at: 2026-05-20T21:20:32.789Z
last_checked_at: 2026-07-21T22:31:25.164Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:31:25.164Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions matched literals in source; transport parameters verified; one-to-one coverage. (14 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "device model variants (D101/D21x/D10x/D11x) not enumerated in source — only example mentions"
- "HTTPS port 443 not enumerated as a separate protocol entry (still HTTP/HTTPS)"
- "RTSP port 554 and 8557 implied by URL syntax but not enumerated as port= fields"
- "SIP port 5060 only documented for P2P incoming calls"
- "no discrete settable parameters independent of CGI actions"
- "no explicit multi-step sequences defined in source"
- "physical safety warnings not stated in source"
- "voltage/current/power specs not stated"
- "firmware version compatibility range not stated — only example versions mentioned"
- "port 443 not enumerated as separate transport protocol"
- "RTSP port 554 not explicitly stated as port number, only in URL syntax"
- "UDP event port 35344 not explicitly named as configurable"
- "SIP P2P port 5060 only documented for incoming calls"
- "monitor.cgi rfid/keypad events \"coming soon\" — not yet implemented"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
