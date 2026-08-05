---
spec_id: admin/doorbird-d2104v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2104V Control Spec"
manufacturer: Doorbird
model_family: D2104V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2104V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T21:12:52.929Z
last_checked_at: 2026-07-21T22:27:52.550Z
generated_at: 2026-07-21T22:27:52.550Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "serial/RS-232 not mentioned in source"
  - "power supply specifications not stated"
  - "default credentials not stated; operator must configure via DoorBird App"
  - "rfid and keypad events mentioned as \"coming soon\""
  - "SIP call state events (ringing, connected, ended) not explicitly documented"
  - "emergency door override procedure not documented"
  - "fault/failure recovery sequences not stated"
  - "RTSP-over-HTTP port 8557 not confirmed as user-facing control endpoint"
  - "relay contact ratings (voltage/current) not stated"
verification:
  verdict: verified
  checked_at: 2026-07-21T22:27:52.550Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions matched literally against source endpoints; all transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Doorbird D2104V Control Spec

## Summary
The Doorbird D2104V is a video door station controllable via HTTP LAN API on ports 80 (HTTP) and 443 (HTTPS), with secondary support for RTSP video streaming (port 554), RTSP-over-HTTP (port 8557), SIP calling (port 5060), and UDP event broadcasts (ports 6524/35344). Authentication is Basic/Digest HTTP or via plaintext `http-user`/`http-password` query parameters. Firmware 000110+ required for favorites and schedules.

<!-- UNRESOLVED: serial/RS-232 not mentioned in source -->
<!-- UNRESOLVED: power supply specifications not stated -->

## Transport
```yaml
protocols:
  - http
  - udp
  - tcp  # inferred: RTSP (554), SIP (5060), RTSP-over-HTTP (8557) are TCP
addressing:
  port: 80
  base_url: http://<device-ip>/bha-api
  # Additional ports explicitly stated in source:
  https_port: 443
  rtsp_port: 554
  rtsp_over_http_port: 8557
  sip_port: 5060
  udp_ports:
    - 6524
    - 35344
auth:
  type: http_basic  # source states Basic/Digest auth per RFC 2617
  # UNRESOLVED: default credentials not stated; operator must configure via DoorBird App
```

## Traits
```yaml
- powerable       # light-on.cgi and open-door.cgi (relay control) present
- queryable       # info.cgi, sip.cgi?action=status, monitor.cgi present
- routable        # audio-transmit.cgi, audio-receive.cgi, video.cgi present
- levelable       # mic_volume (1-100), spk_volume (1-100) via sip.cgi settings
```

## Actions
```yaml
- id: open_door
  label: Open Door
  kind: action
  params:
    - name: r
      type: string
      description: "Relay ID (optional). Default: relay 1. Format: [doorcontrollerID]@[relay], e.g. '1' or 'gggaaa@1'"
  source: /bha-api/open-door.cgi

- id: light_on
  label: Light On
  kind: action
  params: []
  source: /bha-api/light-on.cgi

- id: get_info
  label: Get Device Info
  kind: query
  params: []
  source: /bha-api/info.cgi

- id: get_session
  label: Create Session
  kind: query
  params: []
  source: /bha-api/getsession.cgi

- id: invalidate_session
  label: Invalidate Session
  kind: action
  params:
    - name: invalidate
      type: string
      description: Session ID to invalidate
  source: /bha-api/getsession.cgi?invalidate=<session_id>

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
      description: Fixed value "save"
    - name: type
      type: string
      description: "sip or http"
    - name: title
      type: string
      description: Name/title of favorite
    - name: value
      type: string
      description: URL or SIP target
    - name: id
      type: integer
      description: Optional ID to update existing favorite
  source: /bha-api/favorites.cgi

- id: delete_favorite
  label: Delete Favorite
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: type
      type: string
      description: "sip or http"
    - name: id
      type: integer
      description: ID of favorite to delete
  source: /bha-api/favorites.cgi

- id: list_schedules
  label: List Schedules
  kind: query
  params: []
  source: /bha-api/schedule.cgi

- id: save_schedule
  label: Save Schedule
  kind: action
  params:
    - name: input
      type: string
      description: "doorbell, motion, rfid, or fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID
    - name: output
      type: object
      description: JSON output action configuration (event, param, enabled, schedule)
  source: /bha-api/schedule.cgi (POST)

- id: delete_schedule
  label: Delete Schedule
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "remove"
    - name: input
      type: string
      description: "doorbell, motion, or rfid"
    - name: param
      type: string
      description: Doorbell number or transponder ID
  source: /bha-api/schedule.cgi?action=remove

- id: restart
  label: Restart Device
  kind: action
  params: []
  source: /bha-api/restart.cgi

- id: sip_registration
  label: SIP Registration
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "registration"
    - name: user
      type: string
      description: SIP proxy authentication user
    - name: password
      type: string
      description: SIP proxy authentication password
    - name: url
      type: string
      description: SIP proxy IP/hostname
  source: /bha-api/sip.cgi?action=registration

- id: sip_make_call
  label: SIP Make Call
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "makecall"
    - name: url
      type: string
      description: SIP URL to call
  source: /bha-api/sip.cgi?action=makecall

- id: sip_hangup
  label: SIP Hangup
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "hangup"
  source: /bha-api/sip.cgi?action=hangup

- id: sip_settings
  label: SIP Settings
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "settings"
    - name: enable
      type: integer
      description: 0..1, enable SIP after reboot
    - name: mic_volume
      type: integer
      description: 1..100, microphone volume (default 33)
    - name: spk_volume
      type: integer
      description: 1..100, speaker volume (default 70)
    - name: dtmf
      type: integer
      description: 0..1, enable DTMF support
    - name: autocall_doorbell_url
      type: string
      description: "DEPRECATED (use schedule.cgi). SIP URL to auto-call on doorbell event, or 'none' to disable. Default: none"
    - name: relay1_passcode
      type: integer
      description: 0..99999999, pincode for door open relay
    - name: incoming_call_enable
      type: integer
      description: 0..1, enable incoming calls
    - name: incoming_call_user
      type: string
      description: Allowed SIP user (e.g. "sip:10.0.0.1:5060")
    - name: anc
      type: integer
      description: 0..1, acoustic noise cancellation (default 1)
    - name: ring_time_limit
      type: integer
      description: 10..300, ringing time limit in seconds
    - name: call_time_limit
      type: integer
      description: 30..300, call duration limit in seconds
  source: /bha-api/sip.cgi?action=settings

- id: sip_status
  label: SIP Status
  kind: query
  params: []
  source: /bha-api/sip.cgi?action=status

- id: sip_reset
  label: SIP Settings Reset
  kind: action
  params:
    - name: action
      type: string
      description: Fixed value "reset"
  source: /bha-api/sip.cgi?action=reset

- id: get_live_video
  label: Live Video Stream
  kind: action
  params:
    - name: sessionid
      type: string
      description: "Optional session ID; required for streaming over HTTPS to avoid plaintext credentials"
  source: /bha-api/video.cgi

- id: get_live_image
  label: Live Image
  kind: action
  params: []
  source: /bha-api/image.cgi

- id: get_history_image
  label: History Image
  kind: action
  params:
    - name: index
      type: integer
      description: "1..50, index of history image (1 = latest)"
    - name: event
      type: string
      description: "Optional: doorbell or motionsensor. Default: ring history (DoorBird) / input trigger (BirdGuard)"
  source: /bha-api/history.cgi

- id: audio_receive
  label: Live Audio Receive
  kind: action
  params: []
  source: /bha-api/audio-receive.cgi

- id: audio_transmit
  label: Live Audio Transmit
  kind: action
  params: []
  source: /bha-api/audio-transmit.cgi

- id: monitor
  label: Monitor Event Stream
  kind: action
  params:
    - name: ring
      type: string
      description: "Comma-separated event types: doorbell, motionsensor"
  source: /bha-api/monitor.cgi?ring=doorbell,motionsensor

- id: rtsp_live_video
  label: RTSP Live Video
  kind: action
  params: []
  source: rtsp://<device-ip>:554/mpeg/media.amp

- id: rtsp_live_video_720p
  label: RTSP Live Video 720p
  kind: action
  params: []
  source: rtsp://<device-ip>:554/mpeg/720p/media.amp

- id: rtsp_live_video_1080p
  label: RTSP Live Video 1080p
  kind: action
  params: []
  source: rtsp://<device-ip>:554/mpeg/1080p/media.amp

- id: rtsp_over_http_video
  label: RTSP-over-HTTP Video
  kind: action
  params: []
  source: rtsp://<device-ip>:8557/mpeg/media.amp
```

## Feedbacks
```yaml
- id: http_json_response
  label: Generic JSON Response
  type: object
  description: Most API calls return JSON with BHA.RETURNCODE ("1" = success)

- id: info_response
  label: Device Info
  type: object
  properties:
    - firmware
    - build_number
    - primary_mac_addr
    - relays
    - device_type
  source: /bha-api/info.cgi

- id: session_response
  label: Session Response
  type: object
  properties:
    - SESSIONID
    - NOTIFICATION_ENCRYPTION_KEY
  source: /bha-api/getsession.cgi

- id: monitor_event
  label: Monitor Event Stream
  type: enum
  values:
    - doorbell:H  # doorbell pressed (high)
    - doorbell:L  # doorbell idle (low)
    - motionsensor:H  # motion detected (high)
    - motionsensor:L  # motion idle (low)
  source: /bha-api/monitor.cgi

- id: video_mjpeg_stream
  label: Live Video MJPEG Stream
  type: binary
  description: multipart/x-mixed-replace;boundary stream of JPEG frames (~8 fps)
  source: /bha-api/video.cgi

- id: live_image
  label: Live JPEG Image
  type: binary
  description: Single JPEG frame (image/jpeg)
  source: /bha-api/image.cgi

- id: history_image
  label: History JPEG Image
  type: binary
  description: Cloud-stored JPEG history image (image/jpeg)
  source: /bha-api/history.cgi
```

## Variables
```yaml
- id: mic_volume
  label: Microphone Volume
  type: integer
  range: 1..100
  default: 33
  source: sip.cgi?action=settings

- id: spk_volume
  label: Speaker Volume
  type: integer
  range: 1..100
  default: 70
  source: sip.cgi?action=settings

- id: sip_enable
  label: SIP Enable
  type: boolean
  default: false
  source: sip.cgi?action=settings

- id: sip_last_error
  label: SIP Last Error
  type: string
  source: sip.cgi?action=status

- id: sip_registered
  label: SIP Registered
  type: boolean
  description: True when LASTERRORCODE is "200"
  source: sip.cgi?action=status
```

## Events
```yaml
# UDP event broadcasts on ports 6524 and 35344 (ChaCha20-Poly1305 encrypted)
- id: doorbell_event
  label: Doorbell Event
  type: string
  description: Doorbell number or "motion", from UDP broadcast decryption

- id: motion_event
  label: Motion Sensor Event
  type: string
  description: Motion detection event from UDP broadcast

# UNRESOLVED: rfid and keypad events mentioned as "coming soon"
# UNRESOLVED: SIP call state events (ringing, connected, ended) not explicitly documented
```

## Macros
```yaml
# Favorites and schedules together form event-driven automation macros
- id: notification_favorite
  label: HTTP Notification Favorite
  description: HTTP(S) URL saved as favorite, triggered by schedule on events

- id: sip_call_favorite
  label: SIP Call Favorite
  description: SIP target address saved as favorite, triggered by schedule

- id: doorbell_schedule
  label: Doorbell Event Schedule
  description: Configures output actions (notify, http, sip, relay) triggered by doorbell events with time windows

- id: motion_schedule
  label: Motion Event Schedule
  description: Configures output actions triggered by motion events with time windows
```

## Safety
```yaml
confirmation_required_for:
  - open_door  # Permission check required: user must have "watch always" or recent ring event
interlocks:
  - description: "open_door and light_on require the requesting user to have 'watch always' permission or a ring event within the past 5 minutes"
  source: "source explicitly states: 'We assume, that the API user watches the live image in order to open the door or trigger relays'"
# UNRESOLVED: emergency door override procedure not documented
# UNRESOLVED: fault/failure recovery sequences not stated
```

## Notes
The device is a video door station with one simultaneous audio/video call limitation (returns HTTP 503 when busy). Video streaming (MJPEG over HTTP) is unencrypted and available only over HTTP for third-party integrations; video over HTTPS requires a session ID. RTSP video (H.264) is available on port 554 with standard RTSP authentication. SIP runs on port 5060 with peer-to-peer and proxy modes supported. UDP event broadcasts use ChaCha20-Poly1305 encryption (v2, since November 2023; v1 using Argon2i is deprecated). Audio uses G.711 μ-law codec at 8000 Hz sampling; AEC/ANR must be implemented client-side. The device blocks IP addresses for 1 minute after excessive wrong credentials (HTTP 423). Maximum 1 concurrent API connection per second; up to 8 concurrent monitor streams. SIP calls auto-hangup 180 seconds after initiation (security). Min 3 seconds between SIP requests.
<!-- UNRESOLVED: RTSP-over-HTTP port 8557 not confirmed as user-facing control endpoint -->
<!-- UNRESOLVED: relay contact ratings (voltage/current) not stated -->
````

Upgrade done. Added: 9 new actions (video/image/history/audio×2/monitor/RTSP×4), `autocall_doorbell_url` SIP param, 3 new feedbacks, transport ports 443/554/8557/5060/UDP 6524/35344. Existing IDs + shapes preserved.

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - https://www.doorbird.com/downloads/api_lan.pdf
retrieved_at: 2026-07-12T21:12:52.929Z
last_checked_at: 2026-07-21T22:27:52.550Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-07-21T22:27:52.550Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions matched literally against source endpoints; all transport parameters verified verbatim. (9 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "serial/RS-232 not mentioned in source"
- "power supply specifications not stated"
- "default credentials not stated; operator must configure via DoorBird App"
- "rfid and keypad events mentioned as \"coming soon\""
- "SIP call state events (ringing, connected, ended) not explicitly documented"
- "emergency door override procedure not documented"
- "fault/failure recovery sequences not stated"
- "RTSP-over-HTTP port 8557 not confirmed as user-facing control endpoint"
- "relay contact ratings (voltage/current) not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
