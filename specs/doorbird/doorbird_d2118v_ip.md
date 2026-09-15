---
spec_id: admin/doorbird-d2118v
schema_version: ai4av-public-spec-v1
revision: 1
title: "Doorbird D2118V Control Spec"
manufacturer: Doorbird
model_family: D2118V
aliases: []
compatible_with:
  manufacturers:
    - Doorbird
  models:
    - D2118V
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-09-02T17:07:58.109Z
last_checked_at: 2026-09-04T22:17:34.533Z
generated_at: 2026-09-04T22:17:34.533Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "firmware version not stated in source (info.cgi field name \"FIRMWARE\" present, value varies by device)"
  - "credentials format/length not stated"
  - "source documents settings only as SIP settings action params (mic_volume, spk_volume, dtmf, etc.); no separate persistent variable schema exposed."
  - "no multi-step macro sequences described in source beyond schedule entries, which are server-side config."
  - "firmware compatibility ranges, exact relay count, full D2118V hardware specs not stated in source."
verification:
  verdict: verified
  checked_at: 2026-09-04T22:17:34.533Z
  matched_actions: 25
  action_count: 25
  confidence: medium
  summary: "All 25 spec actions match literal /bha-api CGI endpoints, RTSP URL and SIP actions in the source; transport port 80, base path and Basic/Digest auth all documented. (5 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-09-02
---

# Doorbird D2118V Control Spec

## Summary
Doorbird D2118V is a video door station exposing a LAN HTTP API (`/bha-api/*`) for live video, audio, door control, lighting, schedules, and SIP configuration. Control uses HTTP/HTTPS with Basic/Digest auth on TCP ports 80/443, plus RTSP on 554/8557 for video, and UDP broadcasts (ports 6524, 35344) for event notifications.

<!-- UNRESOLVED: firmware version not stated in source (info.cgi field name "FIRMWARE" present, value varies by device) -->

## Transport
```yaml
protocols:
  - http
  - udp
addressing:
  port: 80
  base_url: "http://<device-ip>/bha-api/"
auth:
  type: basic  # RFC 2617 Basic or Digest; alternatively plaintext http-user/http-password query params
  # UNRESOLVED: credentials format/length not stated
```

## Traits
```yaml
- queryable       # inferred from info.cgi, sip.cgi?action=status
- routable        # inferred from open-door.cgi, light-on.cgi, sip.cgi actions
```

## Actions
```yaml
- id: get_session
  label: Get Session ID
  kind: query
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

- id: live_video
  label: Live Video (MJPEG multipart)
  kind: query
  command: "GET /bha-api/video.cgi"
  params: []

- id: live_image
  label: Live Image (JPEG)
  kind: query
  command: "GET /bha-api/image.cgi"
  params: []

- id: open_door
  label: Open Door / Trigger Relay
  kind: action
  command: "GET /bha-api/open-door.cgi?r=<relay>"
  params:
    - name: relay
      type: string
      description: "Optional. Values: 1, 2, or <doorcontrollerID>@<relay>. Omit for physical relay 1."

- id: light_on
  label: Light On
  kind: action
  command: "GET /bha-api/light-on.cgi"
  params: []

- id: history_image
  label: History Image
  kind: query
  command: "GET /bha-api/history.cgi?index=<index>&event=<event>"
  params:
    - name: index
      type: integer
      description: "1..50, 1 = latest"
    - name: event
      type: string
      description: "doorbell | motionsensor (optional, default ring for DoorBird / input trigger for BirdGuard)"

- id: monitor
  label: Monitor Doorbell/Motion Stream
  kind: query
  command: "GET /bha-api/monitor.cgi?ring=<ring>"
  params:
    - name: ring
      type: string
      description: "doorbell | motionsensor | doorbell,motionsensor"

- id: audio_receive
  label: Live Audio Receive (G.711 µ-law)
  kind: query
  command: "GET /bha-api/audio-receive.cgi"
  params: []

- id: audio_transmit
  label: Live Audio Transmit (G.711 µ-law)
  kind: action
  command: "POST /bha-api/audio-transmit.cgi  Content-Type: audio/basic"
  params: []

- id: info
  label: Device Info / Version
  kind: query
  command: "GET /bha-api/info.cgi"
  params: []

- id: favorites_list
  label: List Favorites
  kind: query
  command: "GET /bha-api/favorites.cgi"
  params: []

- id: favorites_save
  label: Add or Change Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=save&type=<type>&title=<title>&value=<value>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: title
      type: string
      description: Name / title
    - name: value
      type: string
      description: URL / SIP address
    - name: id
      type: integer
      description: Optional ID of existing favorite to change

- id: favorites_delete
  label: Delete Favorite
  kind: action
  command: "GET /bha-api/favorites.cgi?action=remove&type=<type>&id=<id>"
  params:
    - name: type
      type: string
      description: "sip | http"
    - name: id
      type: integer
      description: ID of favorite to delete

- id: schedule_list
  label: List Schedules
  kind: query
  command: "GET /bha-api/schedule.cgi"
  params: []

- id: schedule_save
  label: Add or Update Schedule Entry
  kind: action
  command: "POST /bha-api/schedule.cgi  Content-Type: application/json"
  params:
    - name: body
      type: object
      description: "JSON: input, param, output[] with event/param/enabled/schedule"

- id: schedule_delete
  label: Delete Schedule Entry
  kind: action
  command: "GET /bha-api/schedule.cgi?action=remove&input=<input>&param=<param>"
  params:
    - name: input
      type: string
      description: "doorbell | motion | rfid"
    - name: param
      type: string
      description: Doorbell number / transponder ID / fingerprint ID

- id: restart
  label: Restart Device
  kind: action
  command: "GET /bha-api/restart.cgi"
  params: []

- id: sip_registration
  label: SIP Registration
  kind: action
  command: "GET /bha-api/sip.cgi?action=registration&user=<user>&password=<password>&url=<url>"
  params:
    - name: user
      type: string
    - name: password
      type: string
    - name: url
      type: string
      description: IP/Hostname of SIP Proxy

- id: sip_makecall
  label: SIP Make Call
  kind: action
  command: "GET /bha-api/sip.cgi?action=makecall&url=<url>"
  params:
    - name: url
      type: string
      description: SIP URL to call (e.g. sip:108@192.168.123.22)

- id: sip_hangup
  label: SIP Hangup
  kind: action
  command: "GET /bha-api/sip.cgi?action=hangup"
  params: []

- id: sip_settings
  label: SIP Settings
  kind: action
  command: "GET /bha-api/sip.cgi?action=settings&<parameter>=<value>"
  params:
    - name: enable
      type: integer
      description: "0|1, register on reboot"
    - name: mic_volume
      type: integer
      description: "1..100"
    - name: spk_volume
      type: integer
      description: "1..100"
    - name: dtmf
      type: integer
      description: "0|1"
    - name: autocall_doorbell_url
      type: string
      description: DEPRECATED. SIP URL or "none"
    - name: relay1_passcode
      type: integer
      description: "0..99999999"
    - name: incoming_call_enable
      type: integer
      description: "0|1"
    - name: incoming_call_user
      type: string
      description: SIP user allowed (e.g. sip:10.0.0.1:5060)
    - name: anc
      type: integer
      description: "0|1 acoustic noise cancellation"
    - name: ring_time_limit
      type: integer
      description: "10..300 seconds"
    - name: call_time_limit
      type: integer
      description: "30..300 seconds"

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

- id: rtsp_live_video
  label: RTSP Live Video (H.264)
  kind: query
  command: "rtsp://<device-ip>:554/mpeg/media.amp"
  params:
    - name: resolution
      type: string
      description: "media.amp (default), 720p/media.amp (D10x/D21x FW≥129), 1080p/media.amp (D11x only)"
    - name: rtsp_port
      type: integer
      description: "554 (standard), 8557 (RTSP-over-HTTP)"
```

## Feedbacks
```yaml
- id: doorbell_state
  type: string
  description: "Multipart stream line 'doorbell:H' or 'doorbell:L' from monitor.cgi"
- id: motionsensor_state
  type: string
  description: "Multipart stream line 'motionsensor:H' or 'motionsensor:L' from monitor.cgi"
- id: sip_status
  type: object
  description: "JSON from sip.cgi?action=status; LASTERRORCODE 200 = registered, LASTERRORTEXT recent SIP error"
- id: device_info
  type: object
  description: "JSON from info.cgi: FIRMWARE, BUILD_NUMBER, PRIMARY_MAC_ADDR, RELAYS[], DEVICE-TYPE"
- id: udp_event
  type: object
  description: "UDP broadcast packet on port 6524 or 35344; decrypt with ChaCha20-Poly1305 using NOTIFICATION_ENCRYPTION_KEY from getsession.cgi. Fields: INTERCOM_ID (6 bytes), EVENT (8 bytes, e.g. '1' or 'motion'), TIMESTAMP (4 bytes Unix)"
- id: favorite_list
  type: object
  description: "JSON from favorites.cgi: sip[] and http[] entries with title/value"
- id: schedule_list
  type: array
  description: "JSON array from schedule.cgi; entries with input/param/output[]"
```

## Variables
```yaml
# UNRESOLVED: source documents settings only as SIP settings action params (mic_volume, spk_volume, dtmf, etc.); no separate persistent variable schema exposed.
```

## Events
```yaml
- id: doorbell_event
  description: "UDP broadcast doorbell event on ports 6524 and 35344 (encrypted ChaCha20-Poly1305 v2)"
- id: motion_event
  description: "UDP broadcast motion event on ports 6524 and 35344 (encrypted ChaCha20-Poly1305 v2)"
- id: doorbell_monitor
  description: "Multipart stream notification from monitor.cgi?ring=doorbell"
- id: motion_monitor
  description: "Multipart stream notification from monitor.cgi?ring=motionsensor"
```

## Macros
```yaml
# UNRESOLVED: no multi-step macro sequences described in source beyond schedule entries, which are server-side config.
```

## Safety
```yaml
confirmation_required_for:
  - open_door
  - restart
interlocks: []
# Source notes: SIP calls auto-hangup at 180 s; call_time_limit 30..300 s ring_time_limit 10..300 s; firmware update during restart returns 503.
```

## Notes
HTTP available plain on TCP 80 and TLS on TCP 443 (self-signed cert, IP-based, CA-unsigned). HTTPS not available for video/audio streaming in LAN; use temporary Session ID from getsession.cgi (10 min validity) appended as `?sessionid=<id>` to video.cgi / audio-receive.cgi. Rate limit: 1 concurrent connection/sec for API access. Wrong-auth flood blocks IP/user for 1 min (HTTP 423). Only one simultaneous audio/video call (HTTP 503 "Busy" otherwise). 8 concurrent monitor.cgi streams max (HTTP 509 when busy). D21x RTSP 720p requires firmware ≥129; 1080p is D11x only. UDP keep-alive broadcasts every 7 s on 6524 and 35344 can be skipped. ChaCha20-Poly1305 v2: first 3 bytes IDENT 0xDE 0xAD 0xBE, byte 4 VERSION 0x02, next 8 bytes NONCE, remainder CIPHERTEXT; NOTIFICATION_ENCRYPTION_KEY from getsession.cgi (32..64 bytes, ChaCha20 uses first 32).

<!-- UNRESOLVED: firmware compatibility ranges, exact relay count, full D2118V hardware specs not stated in source. -->

## Provenance

```yaml
source_domains:
  - doorbird.com
source_urls:
  - "https://www.doorbird.com/downloads/api_lan.pdf?rev=0.36"
retrieved_at: 2026-09-02T17:07:58.109Z
last_checked_at: 2026-09-04T22:17:34.533Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-09-04T22:17:34.533Z
matched_actions: 25
action_count: 25
confidence: medium
summary: "All 25 spec actions match literal /bha-api CGI endpoints, RTSP URL and SIP actions in the source; transport port 80, base path and Basic/Digest auth all documented. (5 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "firmware version not stated in source (info.cgi field name \"FIRMWARE\" present, value varies by device)"
- "credentials format/length not stated"
- "source documents settings only as SIP settings action params (mic_volume, spk_volume, dtmf, etc.); no separate persistent variable schema exposed."
- "no multi-step macro sequences described in source beyond schedule entries, which are server-side config."
- "firmware compatibility ranges, exact relay count, full D2118V hardware specs not stated in source."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0
