---
spec_id: admin/doorbird-d2202fv-ekey-sline
schema_version: ai4av-public-spec-v1
revision: 1
title: "DoorBird D2202FV EKEY sLine Control Spec"
manufacturer: DoorBird
model_family: "D2202FV EKEY sLine"
aliases: []
compatible_with:
  manufacturers:
    - DoorBird
  models:
    - "D2202FV EKEY sLine"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-08-15T06:07:46.365Z
last_checked_at: 2026-08-19T09:21:15.033Z
generated_at: 2026-08-19T09:21:15.033Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RTSP path suffixes (`720p`, `1080p`) require firmware 129+ / D11x — compatibility with the D2202FV specifically not stated"
  - "720p support requires firmware 129+ on D10x/D21x; D2202FV compatibility not stated"
  - "1080p supported by D11x only per source; D2202FV compatibility not stated"
  - "no multi-step sequences described in source beyond schedule entries"
  - "720p/1080p RTSP support on D2202FV specifically not stated in source."
  - "firmware version compatibility for D2202FV not stated in source."
verification:
  verdict: verified
  checked_at: 2026-08-19T09:21:15.033Z
  matched_actions: 28
  action_count: 28
  confidence: medium
  summary: "All 28 spec actions map one-to-one to HTTP/SIP/RTSP endpoints in source; transport values (ports 80/443/554/8557/5060/6524/35344) confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-08-15
---

# DoorBird D2202FV EKEY sLine Control Spec

## Summary
Video door station exposing a LAN-2-LAN HTTP/RTSP/SIP API for live video, audio, door relay control, light control, schedule/favorite management, and encrypted UDP event broadcasts. This spec covers the third-party integration HTTP endpoints, RTSP streaming, SIP signaling, and v2 UDP event broadcast protocol.

<!-- UNRESOLVED: RTSP path suffixes (`720p`, `1080p`) require firmware 129+ / D11x — compatibility with the D2202FV specifically not stated -->

## Transport
```yaml
protocols:
  - http
  - tcp
  - udp
addressing:
  base_url: "http://<device-ip>/bha-api/"
  http_port: 80
  https_port: 443
  rtsp_port: 554
  rtsp_over_http_port: 8557
  sip_port: 5060
  udp_event_port: 6524
  udp_event_port_alt: 35344
auth:
  type: basic  # Basic or Digest (RFC 2617); plaintext http-user/http-password also supported
```

## Traits
```yaml
- routable        # inferred from open-door.cgi, light-on.cgi, sip.cgi relay trigger
- queryable       # inferred from info.cgi, sip.cgi?action=status, favorites.cgi list
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
  command: "GET /bha-api/getsession.cgi?invalidate=<old_session_id>"
  params:
    - name: old_session_id
      type: string
      description: Session ID to invalidate

- id: live_video_request
  label: Live Video Request (MJPEG)
  kind: action
  command: "GET /bha-api/video.cgi"
  params: []

- id: live_image_request
  label: Live Image Request (JPEG)
  kind: action
  command: "GET /bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r=<relay>"
  params:
    - name: relay
      type: string
      description: Physical relay number (e.g. "1", "2") or paired DoorController ID (e.g. "gggaaa@1"); omit for physical relay 1

- id: open_door_default
  label: Open Door (Default Relay)
  kind: action
  command: "GET /bha-api/open-door.cgi"
  params: []

- id: light_on
  label: Energize Light Relay
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image_request
  label: History Image Request
  kind: action
  command: "GET /bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: History image index (1..50), 1 = latest
    - name: event
      type: string
      description: Event type filter (doorbell|motionsensor), optional

- id: monitor_request
  label: Monitor Request (state stream)
  kind: action
  command: "GET /bha-api/monitor.cgi?ring=doorbell,motionsensor"
  params:
    - name: ring
      type: string
      description: Event types to monitor (comma-separated doorbell,motionsensor)

- id: live_audio_receive
  label: Live Audio Receive (G.711 μ-law)
  kind: action
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: live_audio_transmit
  label: Live Audio Transmit (G.711 μ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi"
  params:
    - name: body
      type: audio/basic
      description: G.711 μ-law 8kHz mono audio stream

- id: info_request
  label: Info Request (version, relays)
  kind: action
  command: "GET /bha-api/info.cgi"
  params: []

- id: list_favorites
  label: List Favorites
  kind: action
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: add_or_change_favorite
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
      description: Name/title of favorite
    - name: value
      type: string
      description: URL/SIP target including credentials if needed
    - name: id
      type: integer
      description: Optional favorite ID to change; omit for new

- id: delete_favorite
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: Favorite ID to delete

- id: list_schedules
  label: List Schedules
  kind: action
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: add_or_update_schedule
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi"
  params:
    - name: body
      type: application/json
      description: Schedule JSON object (input/param/output array with event/param/schedule)

- id: delete_schedule
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid | fingerprint"
    - name: param
      type: string
      description: Doorbell number, transponder ID, or fingerprint ID

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: rtsp_live_video
  label: RTSP Live Video (default res)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params: []

- id: rtsp_live_video_720p
  label: RTSP Live Video (720p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/720p/media.amp"
  params: []
  # UNRESOLVED: 720p support requires firmware 129+ on D10x/D21x; D2202FV compatibility not stated

- id: rtsp_live_video_1080p
  label: RTSP Live Video (1080p)
  kind: action
  command: "rtsp://<device-ip>:554/mpeg/1080p/media.amp"
  params: []
  # UNRESOLVED: 1080p supported by D11x only per source; D2202FV compatibility not stated

- id: sip_registration
  label: SIP Register to Proxy
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
      description: SIP proxy auth user
    - name: password
      type: string
      description: SIP proxy auth password
    - name: url
      type: string
      description: IP/hostname of SIP proxy

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. "sip:108@192.168.123.22")

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Configure Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<key>=<value>"
  params:
    - name: enable
      type: integer
      description: "0|1 - enable SIP registration after reboot (default 0)"
    - name: mic_volume
      type: integer
      description: "1..100 - microphone volume (default 33)"
    - name: spk_volume
      type: integer
      description: "1..100 - speaker volume (default 70)"
    - name: dtmf
      type: integer
      description: "0|1 - DTMF support (default 0)"
    - name: autocall_doorbell_url
      type: string
      description: 'DEPRECATED: SIP URL for auto-call on doorbell; "none" to disable'
    - name: relay1_passcode
      type: integer
      description: "0..99999999 - DTMF pincode to trigger relay 1"
    - name: incoming_call_enable
      type: integer
      description: "0|1 - enable incoming SIP calls (default 0)"
    - name: incoming_call_user
      type: string
      description: Allowed SIP user for incoming auth (e.g. "sip:10.0.0.1:5060")
    - name: anc
      type: integer
      description: "0|1 - acoustic noise cancellation (default 1)"
    - name: ring_time_limit
      type: integer
      description: "10..300 - max ringing time seconds (default 300)"
    - name: call_time_limit
      type: integer
      description: "30..300 - max call duration seconds (default 300)"

- id: sip_status
  label: SIP Status Query
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
- id: monitor_doorbell_state
  type: enum
  values: [H, L]
  description: "H = doorbell pressed, L = idle (monitor.cgi stream)"
- id: monitor_motion_state
  type: enum
  values: [H, L]
  description: "H = motion detected, L = idle (monitor.cgi stream)"
- id: sip_last_error_code
  type: integer
  description: Most recent SIP status code; 200 = successfully registered
- id: sip_last_error_text
  type: string
  description: Most recent SIP error text
- id: session_id
  type: string
  description: 10-minute session ID returned by getsession.cgi
- id: notification_encryption_key
  type: string
  description: 32-64 byte ChaCha20 key returned by getsession.cgi; first 32 bytes used for decryption
```

## Variables
```yaml
# All device configuration is performed via the SIP/favorites/schedule CGI endpoints
# (see Actions). There are no separate settable parameters outside these endpoints.
```

## Events
```yaml
- id: udp_event_broadcast_v2
  description: >
    Encrypted UDP broadcast on ports 6524 and 35344 when a doorbell, motion, rfid,
    or fingerprint event occurs. ChaCha20-Poly1305 (VERSION 0x02) or deprecated
    ChaCha20-Poly1305+Argon2i (VERSION 0x01). Keep-alive packets sent every 7s -
    skip these. Each event packet is duplicated per user and per connected device.
  format:
    ident: "0xDE 0xAD 0xBE (3 bytes)"
    version: "0x02 (1 byte) - 0x01 deprecated"
    nonce: "8 bytes (for v2)"
    ciphertext: "34 bytes ChaCha20-Poly1305; first 16 random bytes discarded on decrypt"
    decrypted_layout:
      intercom_id: "6 bytes string - first 6 chars of user name"
      event: "8 bytes string - e.g. '1        ' (doorbell #1) or 'motion   '"
      timestamp: "4 bytes unsigned long - Unix epoch seconds"
  ports: [6524, 35344]
```

## Macros
```yaml
# UNRESOLVED: no multi-step sequences described in source beyond schedule entries
```

## Safety
```yaml
confirmation_required_for:
  - restart  # restart.cgi
interlocks: []
# 401/204 responses indicate permission denial or absence of recent ring event;
# 423 indicates IP/user blocked for 1 min after excessive wrong credentials.
# Device handles max 1 concurrent API connection per second.
# Only 1 simultaneous SIP call supported.
# SIP calls auto-hangup after 180 seconds.
# Wait min 3 seconds between SIP requests.
```

## Notes
- HTTP API path prefix: `/bha-api/`. All endpoints return HTTP 401 on auth failure unless noted.
- Encryption on the LAN uses a pre-installed self-signed certificate; clients must accept it or use `--no-check-certificate`.
- HTTPS video/audio streaming not supported in LAN; use sessionid parameter for video/audio.
- Rate limit: max 1 concurrent API connection per second; excessive wrong credentials trigger 1-minute IP block (HTTP 423).
- monitor.cgi: max 8 concurrent streams; HTTP 509 when busy.
- Favorites/schedules require firmware 000110+.
- info.cgi relays array appears starting firmware 000108.
- Audio codec: G.711 μ-law, 8000 Hz sampling, mono required for both receive and transmit.
- AEC/ANR must be implemented client-side; DoorBird provides its own but third-party clients must do their own.
- v2 event broadcasts use ChaCha20-Poly1305; key from `NOTIFICATION_ENCRYPTION_KEY` returned by getsession.cgi, valid until user password changes.

<!-- UNRESOLVED: 720p/1080p RTSP support on D2202FV specifically not stated in source. -->
<!-- UNRESOLVED: firmware version compatibility for D2202FV not stated in source. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
  - https://www.doorbird.com/api
retrieved_at: 2026-08-15T06:07:46.365Z
last_checked_at: 2026-08-19T09:21:15.033Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-08-19T09:21:15.033Z
matched_actions: 28
action_count: 28
confidence: medium
summary: "All 28 spec actions map one-to-one to HTTP/SIP/RTSP endpoints in source; transport values (ports 80/443/554/8557/5060/6524/35344) confirmed verbatim. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RTSP path suffixes (`720p`, `1080p`) require firmware 129+ / D11x — compatibility with the D2202FV specifically not stated"
- "720p support requires firmware 129+ on D10x/D21x; D2202FV compatibility not stated"
- "1080p supported by D11x only per source; D2202FV compatibility not stated"
- "no multi-step sequences described in source beyond schedule entries"
- "720p/1080p RTSP support on D2202FV specifically not stated in source."
- "firmware version compatibility for D2202FV not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
